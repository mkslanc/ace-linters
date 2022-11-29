import "ace-code/src/ext/language_tools";
import {htmlContent} from "./docs-example/html-example";

var event = require("ace-code/src/lib/event");
var {HashHandler} = require("ace-code/src/keyboard/hash_handler");
var keyUtil = require("ace-code/src/lib/keys");
var {DescriptionTooltip} = require("./components/description-tooltip");
import {HtmlWorker} from "./workers/html-worker";
import {CSSWorker} from "./workers/css-worker";
import {Mode as HTMLMode} from "ace-code/src/mode/html";
import {Mode as CSSMode} from "ace-code/src/mode/css";
import {Mode as LessMode} from "ace-code/src/mode/less";
import {Mode as SCSSMode} from "ace-code/src/mode/scss";
import {Mode as JsonMode} from "ace-code/src/mode/json";

import {Range as AceRange} from "ace-code/src/range";

var theme = require("ace-code/src/theme/textmate");
import * as ace from "ace-code";
import {cssContent} from "./docs-example/css-example";
import {lessContent} from "./docs-example/less-example";
import {scssContent} from "./docs-example/scss-example";
import {jsonSchema, jsonContent} from "./docs-example/json-example";
import {JsonWorker} from "./workers/json-worker";
import {toRange} from "./type-converters";
import {TextEdit} from "vscode-languageserver-types";
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
editor.container = document.getElementById("container");

var htmlworker = new HtmlWorker(editor.session);
var htmlProvider = new LanguageProvider(editor, htmlworker);
window["html"] = {
    worker: htmlworker,
    mode: htmlMode,
    content: htmlContent,
    provider: htmlProvider
};
window["provider"] = htmlProvider;
var cssworker = new CSSWorker(editor.session);
var cssMode = new CSSMode();
var cssProvider = new LanguageProvider(editor, cssworker);
window["css"] = {
    worker: cssworker,
    mode: cssMode,
    content: cssContent,
    provider: cssProvider
};
var lessMode = new LessMode();
window["less"] = {
    worker: cssworker,
    mode: lessMode,
    content: lessContent,
    provider: cssProvider
};
var scssMode = new SCSSMode();
window["scss"] = {
    worker: cssworker,
    mode: scssMode,
    content: scssContent,
    provider: cssProvider
};
var jsonworker = new JsonWorker(editor.session, jsonSchema);
var jsonMode = new JsonMode();
var jsonProvider = new LanguageProvider(editor, jsonworker);
window["json"] = {
    worker: jsonworker,
    mode: jsonMode,
    content: jsonContent,
    provider: jsonProvider
};

var menuKb = new HashHandler([
    {
        bindKey: "Ctrl-`",
        name: "format",
        exec: function () {
            var row = editor.session.getLength();
            var column = editor.session.getLine(row).length - 1;
            var selectionRanges = editor.getSelection().getAllRanges();
            if (selectionRanges.length > 0 && !selectionRanges[0].isEmpty()) {
                for (var range of selectionRanges) {
                    applyEdits(range);
                }
            } else {
                applyEdits(new AceRange(0, 0, row, column));
            }
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

function applyEdits(range: AceRange) {
    var edits: TextEdit[] = window["provider"].worker.format(range);
    for (var edit of edits.reverse()) {
        editor.session.doc.replace(toRange(edit.range), edit.newText);
    }
}