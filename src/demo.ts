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


var editor = ace.edit("container");
window["editor"] = editor;

var htmlMode = new HTMLMode();
editor.setTheme(theme);
editor.setOptions({"customScrollbar": true})
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
window["css"] = {
    worker: cssworker,
    mode: cssMode,
    content: cssContent
};
var lessMode = new LessMode();
window["less"] = {
    worker: cssworker,
    mode: lessMode,
    content: lessContent
};
var scssMode = new SCSSMode();
window["scss"] = {
    worker: cssworker,
    mode: scssMode,
    content: scssContent
};

var menuKb = new HashHandler([
    {
        bindKey: "Ctrl-`",
        name: "format",
        exec: function () {
            var row = editor.session.getLength();
            var column = editor.session.getLine(row).length - 1;
            var newContent = window["worker"].format(new AceRange(0, 0, row, column));
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