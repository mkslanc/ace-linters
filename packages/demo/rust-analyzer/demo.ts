import "ace-code/esm-resolver";
import * as event from "ace-code/src/lib/event";
import {HashHandler} from "ace-code/src/keyboard/hash_handler";
import * as keyUtil from "ace-code/src/lib/keys";

import {AceLanguageClient} from "ace-linters/build/ace-language-client";
import {createEditorWithLSP} from "../utils";
import {rustContent} from "../docs-example/rust-example";

let worker = new Worker(new URL('./webworker.ts', import.meta.url));
let mode = {name: "rust", mode: "ace/mode/rust", content: rustContent};

let languageProvider = AceLanguageClient.for(worker);
createEditorWithLSP(mode, 0, languageProvider);

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
