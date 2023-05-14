import "ace-code/esm-resolver";
import "ace-code/src/ext/language_tools";
import {LanguageProvider} from "ace-linters/build/ace-linters";
import {ScriptTarget, JsxEmit} from "ace-linters/services/typescript/typescript-converters";
import {createEditorWithLSP} from "../utils";
import {jsContent} from "../webworker-lsp/docs-example/javascript-example";

import event from "ace-code/src/lib/event";

import {HashHandler} from "ace-code/src/keyboard/hash_handler";

import keyUtil from "ace-code/src/lib/keys";

let modes = [
    {name: "javascript validated by EsLint, with hover, autocompletion and format of Typescript", mode: "ace/mode/javascript", content: jsContent},
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
