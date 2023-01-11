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

let theme = require("ace-code/src/theme/textmate");
import * as ace from "ace-code";
import {cssContent} from "./docs-example/css-example";
import {lessContent} from "./docs-example/less-example";
import {scssContent} from "./docs-example/scss-example";
import {typescriptContent, typescriptContent1} from "./docs-example/typescript-example";
import {jsonSchema, jsonContent, jsonSchema2} from "./docs-example/json-example";
import {jsContent} from "./docs-example/javascript-example";

import {tsxContent} from "./docs-example/tsx-example";
import {jsxContent} from "./docs-example/jsx-example";
import {json5Content, json5Schema} from "./docs-example/json5-example";

import {registerStyles, LanguageProvider, setLanguageGlobalOptions, AceLinters} from "ace-linters";
import {ScriptTarget, JsxEmit} from "ace-linters/type-converters/typescript-converters";
import {luaContent} from "./docs-example/lua-example";

registerStyles();
setLanguageGlobalOptions("typescript", {
    compilerOptions: {
        allowJs: true,
        target: ScriptTarget.ESNext,
        jsx: JsxEmit.Preserve
    }
});

setLanguageGlobalOptions("json", {
    jsonSchemas: [
        {
            uri: "common-form.schema.json",
            schema: jsonSchema2
        }
    ]
});

setLanguageGlobalOptions("json5", {
    jsonSchemas: [
        {
            uri: "json5Schema",
            schema: json5Schema
        }
    ]
});

let modes = [
    {name: "json", mode: JsonMode, content: jsonContent, options: {jsonSchemaUri: "common-form.schema.json"}},
    {name: "json5", mode: Json5Mode, content: json5Content, options: {jsonSchemaUri: "json5Schema"}},
    {name: "html", mode: HTMLMode, content: htmlContent},
    {name: "css", mode: CSSMode, content: cssContent},
    {name: "less", mode: LessMode, content: lessContent},
    {name: "scss", mode: SCSSMode, content: scssContent},
    {name: "typescript", mode: TypescriptMode, content: typescriptContent},
    {name: "typescript", mode: TypescriptMode, content: typescriptContent1},
    {name: "javascript", mode: JavascriptMode, content: jsContent},
    {name: "tsx", mode: TSXMode, content: tsxContent},
    {name: "jsx", mode: JavascriptMode, content: jsxContent, options: {jsx: true}}, //TODO:
    {name: "lua", mode: LuaMode, content: luaContent}

]
let i = 0;
let activeProvider: LanguageProvider;
for (let mode of modes) {
    let el = document.createElement("div");
    let modeName = createModeNameText(el, mode.name);
    let closeButton = createCloseButton(el);
    let editorContainer = document.createElement("div");
    editorContainer.setAttribute("id", "container" + i);
    editorContainer.style.height = "300px";
    el.appendChild(editorContainer);
    el.style.width = "49%";
    el.style.float = "left";
    document.body.appendChild(el);

    let editor = ace.edit("container" + i);
    editor.setOptions({
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true
    });
    editor.setTheme(theme);
    editor.setOptions({"customScrollbar": true})
    editor.session.setValue(mode.content);
    editor.session.setMode(new mode.mode());
    let options = mode.options ?? {};
    let provider = new LanguageProvider(editor, options);
    provider.init();
    activeProvider ??= provider;
    editor.on("focus", () => {
        activeProvider = provider;
    });

    closeButton.onclick = () => {
        provider.dispose();
        provider = null;
        editor.destroy();
        editor.container.remove();
        modeName.remove();
        closeButton.remove();
    }
    i++;
}

setLanguageGlobalOptions("json", {
    jsonSchemas: [{
        uri: "colors.schema.json",
        schema: jsonSchema
    },]
}, true);

function createCloseButton(el) {
    let closeButton = document.createElement("span");
    closeButton.innerText = "X";
    closeButton.style.cursor = "pointer";
    el.appendChild(closeButton);
    return closeButton;
}

function createModeNameText(el, name) {
    let modeName = document.createElement("p");
    modeName.innerText = name;
    modeName.style.margin = "0";
    modeName.style.paddingRight = "10px";
    modeName.style.float = "left";
    el.appendChild(modeName);
    return modeName;
}

let menuKb = new HashHandler([
    {
        bindKey: "Ctrl-`",
        name: "format",
        exec: function () {
            activeProvider.format();
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