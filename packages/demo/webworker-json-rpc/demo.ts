import "ace-code/esm-resolver";
import "ace-code/src/ext/language_tools";
import {AceLanguageClient} from "ace-linters/build/ace-language-client";
import {createEditorWithLSP} from "../utils";
import {jsonContent, jsonSchema, jsonSchema2} from "../docs-example/json-example";

import event from "ace-code/src/lib/event";

import {HashHandler} from "ace-code/src/keyboard/hash_handler";

import keyUtil from "ace-code/src/lib/keys";

let modes = [
    {name: "json", mode: "ace/mode/json", content: jsonContent, options: {jsonSchemaUri: "common-form.schema.json"}},

];
let worker = new Worker(new URL('./webworker.ts', import.meta.url));

let languageProvider = AceLanguageClient.for(worker);

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
