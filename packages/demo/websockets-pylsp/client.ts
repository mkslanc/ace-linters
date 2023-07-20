import "ace-code/esm-resolver";
import * as event from "ace-code/src/lib/event";
import {HashHandler} from "ace-code/src/keyboard/hash_handler";
import * as keyUtil from "ace-code/src/lib/keys";
import {AceLanguageClient} from "ace-linters/build/ace-language-client";
import {createEditorWithLSP} from "../utils";
import {pythonContent} from "../webworker-lsp/docs-example/python-example";

const webSocket = new WebSocket("ws://localhost:3000");

let modes = [
    {name: "python", mode: "ace/mode/python", content: pythonContent},
]

let languageProvider = AceLanguageClient.for(webSocket);
languageProvider.setGlobalOptions("", {
    "pylsp": {
        "configurationSources": [
            "pycodestyle"
        ],
        "plugins": {
            "pycodestyle": {
                enabled: true,
                ignore: ["E501"],
                maxLineLength: 10
            },
            "pyflakes": {
                enabled: false
            }
        },

    }
});
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
