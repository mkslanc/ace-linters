import {BaseService} from "ace-linters/src/services/base-service";

import type {LanguageService} from "ace-linters/src/types/language-service";
import type {AceSpellCheckOptions} from "./service";
// @ts-ignore
import {spellCheckDocument} from "./lib/cspell-lib-browser.js";
import cspellDefaultSettings from "./lib/cspell-settings.generated.js";
import * as lsp from "vscode-languageserver-protocol";
import type {SpellCheckFileResult} from "cspell-lib";
import {fromSpellCheckResult, SpellCodeActionIssue, toCodeActions} from "./ace-spell-check-converters";
import {mergeObjects} from "ace-linters/src/utils";

export class AceSpellCheck extends BaseService<AceSpellCheckOptions> implements LanguageService {
    $service;
    protected issuesByDocument = new Map<string, SpellCodeActionIssue[]>();

    serviceCapabilities = {
        diagnosticProvider: {
            interFileDependencies: false,
            workspaceDiagnostics: false
        },
        codeActionProvider: true,
    }

    constructor(mode: string) {
        super(mode);
    }

    removeDocument(document: lsp.TextDocumentIdentifier) {
        super.removeDocument(document);
        this.issuesByDocument.delete(document.uri);
    }

    renameDocument(document: lsp.TextDocumentIdentifier, newDocumentUri: string) {
        const previousIssues = this.issuesByDocument.get(document.uri);
        super.renameDocument(document, newDocumentUri);
        this.issuesByDocument.delete(document.uri);
        if (previousIssues) {
            this.issuesByDocument.set(newDocumentUri, previousIssues);
        }
    }

    getSpellCheckConfig() {
        if (this.globalOptions.spellCheckOptions) {
            return mergeObjects(this.globalOptions.spellCheckOptions, cspellDefaultSettings);
        }
        return cspellDefaultSettings;
    }

    async doValidation(document: lsp.TextDocumentIdentifier): Promise<lsp.Diagnostic[]> {
        let fullDocument = this.getDocument(document.uri);
        if (!fullDocument) {
            this.issuesByDocument.delete(document.uri);
            return [];
        }
        const doc = {
            uri: fullDocument.uri,
            languageId: fullDocument.languageId,
            text: fullDocument.getText()
        }

        const errors = (await spellCheckDocument(doc, {noConfigSearch: true, generateSuggestions: true},
            this.getSpellCheckConfig(),
        )) as SpellCheckFileResult;
        const cacheKey = errors.document?.uri || fullDocument.uri;
        this.issuesByDocument.set(cacheKey, errors.issues || []);
        return fromSpellCheckResult(errors, fullDocument);
    }

    protected getDocumentIssues(uri: string) {
        return this.issuesByDocument.get(uri) || [];
    }

    async getCodeActions(
        document: lsp.TextDocumentIdentifier,
        range: lsp.Range,
        context: lsp.CodeActionContext
    ): Promise<(lsp.Command | lsp.CodeAction)[] | null> {
        const fullDocument = this.getDocument(document.uri);
        if (!fullDocument) {
            return null;
        }

        const issues = this.getDocumentIssues(document.uri);
        if (!issues.length) {
            return null;
        }
        const actions = toCodeActions(issues, fullDocument, range, context);
        return actions.length ? actions : null;
    }
}
