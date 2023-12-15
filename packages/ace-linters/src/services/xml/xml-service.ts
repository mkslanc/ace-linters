import {BaseService} from "../base-service";
import * as lsp from "vscode-languageserver-protocol";
import {DocumentCstNode, parse} from "@xml-tools/parser";
import {buildAst} from "@xml-tools/ast";
import {checkConstraints} from "@xml-tools/constraints";
import {getSchemaValidators} from "@xml-tools/simple-schema";
import {validate, ValidationIssue} from "@xml-tools/validation";

import {
    issuesToDiagnostic,
    lexingErrorsToDiagnostic,
    parsingErrorsToDiagnostic
} from "./xml-converters";
import {TextDocumentItem} from "vscode-languageserver-protocol";
import {LanguageService, XmlServiceOptions} from "../../types/language-service";

export class XmlService extends BaseService<XmlServiceOptions> implements LanguageService {
    $service;
    schemas: { [schemaUri: string]: string } = {};

    serviceCapabilities = {
        diagnosticProvider: {
            interFileDependencies: true,
            workspaceDiagnostics: true
        }
    }

    constructor(mode: string) {
        super(mode);
    }

    addDocument(document: TextDocumentItem) {
        super.addDocument(document);
        this.$configureService(document.uri);
    }

    private $getXmlSchemaUri(sessionID): string | undefined {
        return this.getOption(sessionID, "schemaUri");
    }

    private $configureService(sessionID: string) {
        let schemas = this.getOption(sessionID, "schemas");
        schemas?.forEach((el) => {
            if (el.uri === this.$getXmlSchemaUri(sessionID)) {
                el.fileMatch ??= [];
                el.fileMatch.push(sessionID);
            }
            let schema = el.schema ?? this.schemas[el.uri];
            if (schema)
                this.schemas[el.uri] = schema;
            el.schema = undefined;
        });
    }

    $getSchema(sessionId) {
        let schemaId = this.$getXmlSchemaUri(sessionId);
        if (schemaId && this.schemas[schemaId]) {
            return JSON.parse(this.schemas[schemaId])
        }
    }

    async doValidation(document: lsp.TextDocumentIdentifier): Promise<lsp.Diagnostic[]> {
        let fullDocument = this.getDocument(document.uri);
        if (!fullDocument)
            return [];

        const {cst, tokenVector, lexErrors, parseErrors} = parse(
            fullDocument.getText()
        );
        const xmlDoc = buildAst(cst as DocumentCstNode, tokenVector);
        const constraintsIssues = checkConstraints(xmlDoc as any);

        let schema = this.$getSchema(document.uri);
        let schemaIssues: ValidationIssue[] = [];
        if (schema) {
            const schemaValidators = getSchemaValidators(schema);
            schemaIssues = validate({
                doc: xmlDoc,
                validators: {
                    attribute: [schemaValidators.attribute],
                    element: [schemaValidators.element],
                },
            });
        }

        return [
            ...lexingErrorsToDiagnostic(lexErrors, fullDocument, this.optionsToFilterDiagnostics),
            ...parsingErrorsToDiagnostic(parseErrors, fullDocument, this.optionsToFilterDiagnostics),
            ...issuesToDiagnostic(constraintsIssues, fullDocument, this.optionsToFilterDiagnostics),
            ...issuesToDiagnostic(schemaIssues, fullDocument, this.optionsToFilterDiagnostics)
        ];
    }
}
