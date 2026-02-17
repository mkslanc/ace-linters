import * as lsp from "vscode-languageserver-protocol";
import type {SpellCheckFileResult} from "cspell-lib";

import {TextDocument} from "vscode-languageserver-textdocument/lib/esm/main";
import type {FilterDiagnosticsOptions} from "ace-linters/src/types/language-service";

export function fromSpellCheckResult(result: SpellCheckFileResult, doc: TextDocument, filterErrors?: FilterDiagnosticsOptions): lsp.Diagnostic[] {
  if (!result || !result.issues)
    return [];
  const lspDiagnostics = result.issues.map((el) => {
    let start = el.offset ?? 0;
    let length = el.length ?? 1; //TODO:
    return lsp.Diagnostic.create(lsp.Range.create(doc.positionAt(start), doc.positionAt(start + length)),
      "Typo", 4);
  });
  return lspDiagnostics;
}
