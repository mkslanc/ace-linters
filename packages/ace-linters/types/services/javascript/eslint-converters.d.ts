import { Diagnostic } from "vscode-languageserver-protocol";
import { FilterDiagnosticsOptions } from "../../types/language-service";
export declare function toDiagnostic(error: any, filterErrors: FilterDiagnosticsOptions): Diagnostic;
export declare function toDiagnostics(diagnostics: Diagnostic[], filterErrors: FilterDiagnosticsOptions): Diagnostic[];
