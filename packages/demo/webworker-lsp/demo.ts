import "ace-code/src/ext/language_tools";
import {htmlContent} from "./docs-example/html-example";

let event = require("ace-code/src/lib/event");
let {HashHandler} = require("ace-code/src/keyboard/hash_handler");
let keyUtil = require("ace-code/src/lib/keys");
import {Mode as HTMLMode} from "ace-code/src/mode/html";
import {Mode as CSSMode} from "ace-code/src/mode/css";
import {Mode as LessMode} from "ace-code/src/mode/less";
import {Mode as SCSSMode} from "ace-code/src/mode/scss";
import {Mode as JsonMode} from "ace-code/src/mode/json";
import {Mode as Json5Mode} from "ace-code/src/mode/json5";
import {Mode as TypescriptMode} from "ace-code/src/mode/typescript";
import {Mode as JavascriptMode} from "ace-code/src/mode/javascript";
import {Mode as TSXMode} from "ace-code/src/mode/tsx";
import {Mode as LuaMode} from "ace-code/src/mode/lua";
import {Mode as YamlMode} from "ace-code/src/mode/yaml";

import {cssContent} from "./docs-example/css-example";
import {lessContent} from "./docs-example/less-example";
import {scssContent} from "./docs-example/scss-example";
import {typescriptContent, typescriptContent1} from "./docs-example/typescript-example";
import {jsonSchema, jsonContent, jsonSchema2} from "./docs-example/json-example";
import {jsContent} from "./docs-example/javascript-example";

import {tsxContent} from "./docs-example/tsx-example";
import {jsxContent} from "./docs-example/jsx-example";
import {json5Content, json5Schema} from "./docs-example/json5-example";

import {LanguageProvider} from "ace-linters";
import {ScriptTarget, JsxEmit} from "ace-linters/type-converters/typescript-converters";
import {luaContent} from "./docs-example/lua-example";
import {createEditorWithLSP} from "../utils";
import {yamlContent, yamlSchema} from "./docs-example/yaml-example";

let modes = [
    {name: "json", mode: JsonMode, content: jsonContent, options: {schemaUri: "common-form.schema.json"}},
    {name: "json5", mode: Json5Mode, content: json5Content, options: {schemaUri: "json5Schema"}},
    {name: "html", mode: HTMLMode, content: htmlContent},
    {name: "css", mode: CSSMode, content: cssContent},
    {name: "less", mode: LessMode, content: lessContent},
    {name: "scss", mode: SCSSMode, content: scssContent},
    {name: "typescript", mode: TypescriptMode, content: typescriptContent},
    {name: "typescript", mode: TypescriptMode, content: typescriptContent1},
    {name: "javascript", mode: JavascriptMode, content: jsContent},
    {name: "tsx", mode: TSXMode, content: tsxContent},
    {name: "jsx", mode: JavascriptMode, content: jsxContent, options: {jsx: true}}, //TODO:
    {name: "lua", mode: LuaMode, content: luaContent},
    {name: "yaml", mode: YamlMode, content: yamlContent, options: {schemaUri: "yamlSchema.json"}}
];
let worker = new Worker(new URL('./webworker.ts', import.meta.url));

let languageProvider = LanguageProvider.default(worker);
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
