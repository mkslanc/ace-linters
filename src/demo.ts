import "ace-code/src/ext/language_tools";
import {htmlContent} from "./docs-example/html-example";

var event = require("ace-code/src/lib/event");
var {HashHandler} = require("ace-code/src/keyboard/hash_handler");
var keyUtil = require("ace-code/src/lib/keys");
var {DescriptionTooltip} = require("./components/description-tooltip");
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

var editor = ace.edit("container");
editor.setOptions({
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true
});

window["editor"] = editor;

var htmlMode = new HTMLMode();
editor.setTheme(theme);
editor.setOptions({"customScrollbar": true})
editor.session.setValue(htmlContent);
editor.session.setMode(htmlMode);
var provider = window["provider"] = new LanguageProvider(editor, {});
editor.provider = provider;

var secondEditor = ace.edit("newcontainer");
secondEditor.setOptions({
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true
});
secondEditor.setTheme(theme);
secondEditor.setOptions({"customScrollbar": true});
var jsonMode = new JsonMode();
secondEditor.setValue(jsonContent);
secondEditor.session.setMode(jsonMode);
var jsonProvider = new LanguageProvider(secondEditor, {other: {jsonSchema: jsonSchema}});
jsonProvider.registerCompleters();
secondEditor.provider = jsonProvider;

var activeEditor = editor;
editor.on("focus", () => {
    activeEditor = editor;
});
secondEditor.on("focus", () => {
    activeEditor = secondEditor;
});

var menuKb = new HashHandler([
    {
        bindKey: "Ctrl-`",
        name: "format",
        exec: function () {
            activeEditor.provider.format();
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
new DescriptionTooltip(editor);
new DescriptionTooltip(secondEditor);