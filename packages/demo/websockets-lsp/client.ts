import * as event from "ace-code/src/lib/event";
import {HashHandler} from "ace-code/src/keyboard/hash_handler";
import * as keyUtil from "ace-code/src/lib/keys";
import {Mode as JsonMode} from "ace-code/src/mode/json";
import {Mode as Json5Mode} from "ace-code/src/mode/json5";
import {jsonSchema, jsonContent, jsonSchema2} from "../webworker-lsp/docs-example/json-example";

import {json5Content, json5Schema} from "../webworker-lsp/docs-example/json5-example";

import {registerStyles} from "ace-linters";
import {MessageControllerWS} from "ace-linters/message-controller-ws";
import {createEditorWithLSP} from "../utils";

const webSocket = new WebSocket("ws://localhost:3000/exampleServer");
let messageController = new MessageControllerWS(webSocket);

registerStyles();

let modes = [
    {name: "json", mode: JsonMode, content: jsonContent, options: {jsonSchemaUri: "common-form.schema.json"}},
    {name: "json5", mode: Json5Mode, content: json5Content, options: {jsonSchemaUri: "json5Schema"}},
]

let i = 0;
for (let mode of modes) {
    createEditorWithLSP(mode, i, messageController);
    i++;
}

let menuKb = new HashHandler([
    {
        bindKey: "Ctrl-`",
        name: "format",
        exec: function () {
            window["provider"].format();
        }
    }
]);

event.addCommandKeyListener(window, function (e, hashId, keyCode) {
    let keyString = keyUtil.keyCodeToString(keyCode);
    let command = menuKb.findKeyCommand(hashId, keyString);
    if (command) {
        command.exec();
    }
});
