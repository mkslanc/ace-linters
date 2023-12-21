import * as lsp from "vscode-languageserver-protocol";
import { FilterDiagnosticsOptions } from "ace-linters/src/types/language-service";
import { CaretPosition, Suggestions } from "dt-sql-parser/dist/parser/common/basic-parser-types";
export declare function toDiagnostics(diagnostics: any[], filterErrors: FilterDiagnosticsOptions): lsp.Diagnostic[];
export declare function toPosition(pos: CaretPosition): lsp.Position;
export declare function fromPosition(pos: lsp.Position): CaretPosition;
export declare function toCompletions(completions: Suggestions | null): lsp.CompletionItem[] | null;
