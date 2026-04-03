import * as ace from "ace-builds";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-textmate";

const javascriptWorkerUrl = import.meta.env.DEV
    ? "/@ace-legacy-linters/worker-javascript.js"
    : "./ace-legacy-linters/src-noconflict/worker-javascript.js";

ace.config.setModuleUrl("ace/mode/javascript_worker", javascriptWorkerUrl);
ace.require("ace/ext/language_tools");

document.body.innerHTML = `
    <div style="padding: 16px; font-family: sans-serif;">
        <h1 style="margin: 0 0 8px;">ace-legacy-linters JavaScript worker</h1>
        <p style="margin: 0 0 16px;">
            JavaScript mode is active. The worker comes from <code>ace-legacy-linters</code>.
            The sample starts with a syntax error so annotations are visible.
        </p>
        <div id="editor" style="height: 320px; border: 1px solid #d0d7de;"></div>
    </div>
`;

const editor = ace.edit("editor", {
    mode: "ace/mode/javascript",
    theme: "ace/theme/textmate",
    value: [
        "function demo(name) {",
        "  const greeting = `Hello ${name}`;",
        "  console.log(greeting",
        "}",
    ].join("\n"),
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true,
    enableSnippets: true,
});

editor.clearSelection();
editor.focus();
