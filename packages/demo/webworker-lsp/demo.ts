import "ace-code/esm-resolver";
import {htmlContent} from "./docs-example/html-example";

let event = require("ace-code/src/lib/event");
let {HashHandler} = require("ace-code/src/keyboard/hash_handler");
let keyUtil = require("ace-code/src/lib/keys");

import {cssContent} from "./docs-example/css-example";
import {lessContent} from "./docs-example/less-example";
import {scssContent} from "./docs-example/scss-example";
import {typescriptContent, typescriptContent1} from "./docs-example/typescript-example";
import {jsonSchema, jsonContent, jsonSchema2} from "./docs-example/json-example";
import {jsContent} from "./docs-example/javascript-example";

import {tsxContent} from "./docs-example/tsx-example";
import {jsxContent} from "./docs-example/jsx-example";
import {json5Content, json5Schema} from "./docs-example/json5-example";

import {LanguageProvider} from "ace-linters/build/ace-linters";
import {ScriptTarget, JsxEmit} from "ace-linters/type-converters/typescript-converters";
import {luaContent} from "./docs-example/lua-example";
import {createEditorWithLSP} from "../utils";
import {yamlContent, yamlSchema} from "./docs-example/yaml-example";
import {phpContent} from "./docs-example/php-example";
import {xmlContent, xmlSchema} from "./docs-example/xml-example";
import {pythonContent} from "./docs-example/python-example";

let modes = [
    {name: "json", mode: "ace/mode/json", content: jsonContent, options: {schemaUri: "common-form.schema.json"}},
    {name: "json5", mode: "ace/mode/json5", content: json5Content, options: {schemaUri: "json5Schema"}},
    {name: "html", mode: "ace/mode/html", content: htmlContent},
    {name: "css", mode: "ace/mode/css", content: cssContent},
    {name: "less", mode: "ace/mode/less", content: lessContent},
    {name: "scss", mode: "ace/mode/scss", content: scssContent},
    {name: "typescript", mode: "ace/mode/typescript", content: typescriptContent},
    {name: "python", mode: "ace/mode/python", content: pythonContent},
    {name: "typescript", mode: "ace/mode/typescript", content: typescriptContent1},
    {name: "javascript", mode: "ace/mode/javascript", content: jsContent},
    {name: "tsx", mode: "ace/mode/tsx", content: tsxContent},
    {name: "jsx", mode: "ace/mode/javascript", content: jsxContent, options: {jsx: true}}, //TODO:
    {name: "lua", mode: "ace/mode/lua", content: luaContent},
    {name: "yaml", mode: "ace/mode/yaml", content: yamlContent, options: {schemaUri: "yamlSchema.json"}},
    {name: "xml", mode: "ace/mode/xml", content: xmlContent, options: {schemaUri: "xmlSchema.json"}},
    {name: "php", mode: "ace/mode/php", content: phpContent}
];
let worker = new Worker(new URL('./webworker.ts', import.meta.url));

let languageProvider = LanguageProvider.create(worker);
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

languageProvider.setGlobalOptions("json5", {
    schemas: [
        {
            uri: "json5Schema",
            schema: json5Schema
        }
    ]
});

languageProvider.setGlobalOptions("yaml", {
    schemas: [
        {
            uri: "yamlSchema.json",
            schema: yamlSchema
        }
    ]
});

languageProvider.setGlobalOptions("xml", {
    schemas: [
        {
            uri: "xmlSchema.json",
            schema: xmlSchema
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
