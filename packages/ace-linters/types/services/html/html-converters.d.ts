import { FilterDiagnosticsOptions } from "../../types/language-service";
import * as lsp from "vscode-languageserver-protocol";
export declare function toDiagnostics(diagnostics: any[], filterErrors: FilterDiagnosticsOptions): lsp.Diagnostic[];
