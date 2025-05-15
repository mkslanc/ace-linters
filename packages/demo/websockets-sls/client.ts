import "ace-code/esm-resolver";
import {AceLanguageClient, LanguageClientConfig} from "ace-linters/build/ace-language-client";
import {addFormatCommand, createEditorWithLSP} from "../utils";
import {svelteContent} from "../docs-example/svelte-example";

let modes = [
  {name: "svelte", mode: "ace/mode/html", content: svelteContent},
]

const serverData: LanguageClientConfig = {
  module: () => import("ace-linters/build/language-client"),
  modes: "html",
  type: "socket",
  socket: new WebSocket("ws://localhost:3030"),
}
let languageProvider = AceLanguageClient.for(serverData);

let i = 0;
for (let mode of modes) {
  // @ts-expect-error
  createEditorWithLSP(mode, i, languageProvider);
  i++;
}
// @ts-expect-error
addFormatCommand(languageProvider);
