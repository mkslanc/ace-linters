import {htmlContent} from "./docs-example/html-example";

var event = require("ace-code/src/lib/event");
var {HashHandler} = require("ace-code/src/keyboard/hash_handler");
var keyUtil = require("ace-code/src/lib/keys");
var {DescriptionTooltip} = require("./components/description-tooltip");
import {HtmlWorker} from "./workers/html-worker";
import {CSSWorker} from "./workers/css-worker";
import {Mode as HTMLMode} from "ace-code/src/mode/html";
import {Mode as CSSMode} from "ace-code/src/mode/css";
import {Mode as JsonMode} from "ace-code/src/mode/json";

import {Range as AceRange} from "ace-code/src/range";

var theme = require("ace-code/src/theme/textmate");
import * as ace from "ace-code";
import {cssContent} from "./docs-example/css-example";


var editor = ace.edit("container");
window["editor"] = editor;

var htmlMode = new HTMLMode();
editor.setTheme(theme);
editor.session.setValue(htmlContent);
editor.session.setMode(htmlMode);
editor.container = document.getElementById("container");

var htmlworker = new HtmlWorker(editor.session);
window["html"] = {
    worker: htmlworker,
    mode: htmlMode,
    content: htmlContent
};
window["worker"] = htmlworker;
var cssworker = new CSSWorker(editor.session);
var cssMode = new CSSMode();
window["css"] = cssworker;
window["css"] = {
    worker: cssworker,
    mode: cssMode,
    content: cssContent
};

var menuKb = new HashHandler([
    {
        bindKey: "Ctrl-`",
        name: "FormatHtml",
        exec: function () {
            var row = editor.session.getLength();
            var column = editor.session.getLine(row).length - 1;
            var newContent = htmlworker.format(new AceRange(0, 0, row, column));
            editor.session.setValue(newContent[0].newText);
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