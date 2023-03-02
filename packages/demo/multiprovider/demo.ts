import "ace-code/src/ext/language_tools";

let event = require("ace-code/src/lib/event");
let {HashHandler} = require("ace-code/src/keyboard/hash_handler");
let keyUtil = require("ace-code/src/lib/keys");

import {Mode as JavascriptMode} from "ace-code/src/mode/javascript";

import {LanguageProvider} from "ace-linters/build/ace-linters";
import {ScriptTarget, JsxEmit} from "ace-linters/type-converters/typescript-converters";
import {createEditorWithLSP} from "../utils";
import {jsContent} from "../webworker-lsp/docs-example/javascript-example";

let modes = [
    {name: "javascript validated by Typescript Services and EsLint", mode: JavascriptMode, content: jsContent},
];

let worker = new Worker(new URL('./webworker.ts', import.meta.url));

let languageProvider = LanguageProvider.create(worker);
let i = 0;
for (let mode of modes) {
    createEditorWithLSP(mode, i, languageProvider);
    i++;
}
languageProvider.setGlobalOptions("typescript", {
    compilerOptions: {
        allowJs: true,
        checkJs: true,
        target: ScriptTarget.ESNext,
        jsx: JsxEmit.Preserve
    }
});
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
