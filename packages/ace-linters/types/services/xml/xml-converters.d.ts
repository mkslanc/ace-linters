import { Diagnostic } from "vscode-languageserver-protocol";
import { TextDocument } from "vscode-languageserver-textdocument";
import { FilterDiagnosticsOptions } from "../../types/language-service";
export declare function lexingErrorsToDiagnostic(errors: any[], document: TextDocument, filterErrors: FilterDiagnosticsOptions): Diagnostic[];
export declare function parsingErrorsToDiagnostic(errors: any[], document: TextDocument, filterErrors: FilterDiagnosticsOptions): Diagnostic[];
export declare function issuesToDiagnostic(errors: any[], document: TextDocument, filterErrors: FilterDiagnosticsOptions): Diagnostic[];
