import "ace-code/src/ext/language_tools";
import {htmlContent} from "./docs-example/html-example";

var event = require("ace-code/src/lib/event");
var {HashHandler} = require("ace-code/src/keyboard/hash_handler");
var keyUtil = require("ace-code/src/lib/keys");
import {Mode as HTMLMode} from "ace-code/src/mode/html";
import {Mode as CSSMode} from "ace-code/src/mode/css";
import {Mode as LessMode} from "ace-code/src/mode/less";
import {Mode as SCSSMode} from "ace-code/src/mode/scss";
import {Mode as JsonMode} from "ace-code/src/mode/json";

var theme = require("ace-code/src/theme/textmate");
import * as ace from "ace-code";
import {cssContent} from "./docs-example/css-example";
import {lessContent} from "./docs-example/less-example";
import {scssContent} from "./docs-example/scss-example";
import {jsonSchema, jsonContent} from "./docs-example/json-example";
import {LanguageProvider} from "./language-provider";

//TODO:
import * as lintersCSS from "../css/linters.css";
import * as dom from "ace-code/src/lib/dom";

dom.importCssString(lintersCSS, "linters.css");

let modes = [
    {name: "json", mode: JsonMode, content: jsonContent, options: {other: {jsonSchema: jsonSchema}}},
    {name: "html", mode: HTMLMode, content: htmlContent},
    {name: "css", mode: CSSMode, content: cssContent},
    {name: "less", mode: LessMode, content: lessContent},
    {name: "scss", mode: SCSSMode, content: scssContent},
]
let i = 0;
var activeProvider: LanguageProvider;
for (let mode of modes) {
    let el = document.createElement("div");
    let modeName = document.createElement("p");
    modeName.innerText = mode.name;
    modeName.style.margin = "0";
    el.appendChild(modeName);

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
    activeProvider ??= provider;
    editor.on("focus", () => {
        activeProvider = provider;
    });
    i++;
}

var menuKb = new HashHandler([
    {
        bindKey: "Ctrl-`",
        name: "format",
        exec: function () {
            activeProvider.format();
        }
    }
]);

event.addCommandKeyListener(window, function (e, hashId, keyCode) {

    var keyString = keyUtil.keyCodeToString(keyCode);
    var command = menuKb.findKeyCommand(hashId, keyString);
    if (command) {
        command.exec();
    }
});