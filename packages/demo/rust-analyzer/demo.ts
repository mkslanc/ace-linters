import * as event from "ace-code/src/lib/event";
import {HashHandler} from "ace-code/src/keyboard/hash_handler";
import * as keyUtil from "ace-code/src/lib/keys";
import {Mode as RustMode} from "ace-code/src/mode/rust"

import {LanguageProvider} from "ace-linters";
import {createEditorWithLSP} from "../utils";
import {rustContent} from "../webworker-lsp/docs-example/rust-example";

let worker = new Worker(new URL('./webworker.ts', import.meta.url));
let mode = {name: "rust", mode: RustMode, content: rustContent};

let languageProvider = LanguageProvider.for(worker);
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
