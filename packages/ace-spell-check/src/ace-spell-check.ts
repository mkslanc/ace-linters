import {BaseService} from "ace-linters/src/services/base-service";

import type {LanguageService} from "ace-linters/src/types/language-service";
import type {AceSpellCheckOptions} from "./service";
import {spellCheckDocument} from "./lib/cspell-lib-browser.js";
import cspellDefaultSettings from "./lib/cspell-settings.generated.js";
import * as lsp from "vscode-languageserver-protocol";
import type {SpellCheckFileResult, CSpellUserSettings} from "cspell-lib";
import {fromSpellCheckResult} from "./ace-spell-check-converters";
import {mergeObjects} from "ace-linters/src/utils";

export class AceSpellCheck extends BaseService<AceSpellCheckOptions> implements LanguageService {
    $service;

    serviceCapabilities = {
        diagnosticProvider: {
            interFileDependencies: false,
            workspaceDiagnostics: false
        },
    }

    constructor(mode: string) {
        super(mode);
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
            return [];
        }
        const doc = {
            uri: fullDocument.uri,
            languageId: fullDocument.languageId,
            text: fullDocument.getText()
        }

        const errors = (await spellCheckDocument(doc, {noConfigSearch: true}, this.getSpellCheckConfig())) as SpellCheckFileResult;
        console.log(errors);
        return fromSpellCheckResult(errors, fullDocument);
    }
}
