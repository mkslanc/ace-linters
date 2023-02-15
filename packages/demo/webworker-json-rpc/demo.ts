import "ace-code/src/ext/language_tools";

let event = require("ace-code/src/lib/event");
let {HashHandler} = require("ace-code/src/keyboard/hash_handler");
let keyUtil = require("ace-code/src/lib/keys");

import {Mode as JsonMode} from "ace-code/src/mode/json";

import {AceLanguageClient} from "ace-linters/ace-language-client";
import {ScriptTarget, JsxEmit} from "ace-linters/type-converters/typescript-converters";
import {createEditorWithLSP} from "../utils";
import {jsonContent, jsonSchema, jsonSchema2} from "../webworker-lsp/docs-example/json-example";

let modes = [
    {name: "json", mode: JsonMode, content: jsonContent, options: {jsonSchemaUri: "common-form.schema.json"}},

];
let worker = new Worker(new URL('./webworker.ts', import.meta.url));

let languageProvider = AceLanguageClient.for(worker);
languageProvider.setGlobalOptions("typescript", {
    compilerOptions: {
        allowJs: true,
        target: ScriptTarget.ESNext,
        jsx: JsxEmit.Preserve
    }
});

languageProvider.setGlobalOptions("json", {
    schemas: [
        {
            uri: "common-form.schema.json",
            schema: jsonSchema2
        }
    ]
});

let i = 0;
for (let mode of modes) {
    createEditorWithLSP(mode, i, languageProvider);
    i++;
}
languageProvider.setGlobalOptions("json", {
    schemas: [{
        uri: "colors.schema.json",
        schema: jsonSchema
    },]
}, true);

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
