import { BaseService } from "../base-service";
import * as lsp from "vscode-languageserver-protocol";
import { TextDocumentItem } from "vscode-languageserver-protocol";
import { LanguageService, XmlServiceOptions } from "../../types/language-service";
export declare class XmlService extends BaseService<XmlServiceOptions> implements LanguageService {
    $service: any;
    schemas: {
        [schemaUri: string]: string;
    };
    serviceCapabilities: {
        diagnosticProvider: {
            interFileDependencies: boolean;
            workspaceDiagnostics: boolean;
        };
    };
    constructor(mode: string);
    addDocument(document: TextDocumentItem): void;
    private $getXmlSchemaUri;
    private $configureService;
    $getSchema(sessionId: any): any;
    doValidation(document: lsp.TextDocumentIdentifier): Promise<lsp.Diagnostic[]>;
}
