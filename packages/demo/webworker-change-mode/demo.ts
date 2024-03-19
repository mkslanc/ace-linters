import "ace-code/esm-resolver";
import "ace-code/src/ext/language_tools";
import {typescriptContent} from "../docs-example/typescript-example";
import * as theme from "ace-code/src/theme/textmate";
import {LanguageProvider} from "ace-linters";
import * as ace from "ace-code";
import {addFormatCommand} from "../utils";

let modes = [
    {name: "typescript", mode: "ace/mode/typescript", content: typescriptContent},
    {name: "json", mode: "ace/mode/json"},
    {name: "json5", mode: "ace/mode/json5"},
    {name: "html", mode: "ace/mode/html"},
    {name: "css", mode: "ace/mode/css"},
    {name: "less", mode: "ace/mode/less"},
    {name: "scss", mode: "ace/mode/scss"},
    {name: "python", mode: "ace/mode/python"},
    {name: "javascript", mode: "ace/mode/javascript"},
    {name: "tsx", mode: "ace/mode/tsx"},
    {name: "lua", mode: "ace/mode/lua"},
    {name: "yaml", mode: "ace/mode/yaml"},
    {name: "xml", mode: "ace/mode/xml"},
    {name: "php", mode: "ace/mode/php"},
    {name: "mysql", mode: "ace/mode/mysql"},
    {name: "swift", mode: "ace/mode/swift"},
];
let worker = new Worker(new URL('./webworker.ts', import.meta.url));
let languageProvider = LanguageProvider.create(worker);

let el = document.getElementById("ace_modes");
el.onchange = function () {
    let mode = modes.find(x => x.name == el["value"]);
    editor.session.setMode(mode.mode);
}
for (var i = 0; i < modes.length; i++) {
    let option = document.createElement("option");
    option.value = modes[i].name;
    option.innerText = modes[i].name;
    el.appendChild(option);
}

let editorEl = document.createElement("div");
let editorContainer = document.createElement("div");
editorContainer.setAttribute("id", "container");
editorContainer.style.height = "300px";
editorEl.appendChild(editorContainer);
editorEl.style.width = "49%";
editorEl.style.float = "left";
document.getElementById("wrapper").appendChild(editorEl);

let currentMode = modes[0];

let editor = ace.edit("container", {
    mode: currentMode.mode,
    value: currentMode.content,
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true,
    enableSnippets: true,
    theme: theme,
    customScrollbar: true
});

languageProvider.registerEditor(editor);

addFormatCommand(languageProvider);
