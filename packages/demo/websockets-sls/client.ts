import "ace-code/esm-resolver";
import * as event from "ace-code/src/lib/event";
import {HashHandler} from "ace-code/src/keyboard/hash_handler";
import * as keyUtil from "ace-code/src/lib/keys";
import {AceLanguageClient} from "ace-linters/build/ace-language-client";
import {createEditorWithLSP} from "../utils";
import {svelteContent} from "../docs-example/svelte-example";
import {LanguageClientConfig} from "ace-linters/types/types/language-service";


let modes = [
  {name: "svelte", mode: "ace/mode/html", content: svelteContent},
]

const serverData: LanguageClientConfig = {
  module: () => import("ace-linters/build/language-client"),
  modes: "html",
  type: "socket",
  socketUrl: "ws://localhost:3030",
}
let languageProvider = AceLanguageClient.for(serverData);

let i = 0;
for (let mode of modes) {
  createEditorWithLSP(mode, i, languageProvider);
  i++;
}

let menuKb = new HashHandler([
  {
    bindKey: "Ctrl-Shift-B",
    name: "format",
    exec: function () {
      languageProvider.format();
    }
  }
]);

event.addCommandKeyListener(window, function (e, hashId, keyCode) {
  let keyString = keyUtil.keyCodeToString(keyCode);
  let command = menuKb.findKeyCommand(hashId, keyString);
  if (command) {
    command.exec();
    e.preventDefault();
  }
});
