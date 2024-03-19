import "ace-code/esm-resolver";
import "ace-code/src/ext/language_tools";
import {LanguageProvider} from "ace-linters";
import {addFormatCommand, createEditorWithLSP} from "../utils";
import {jsContent} from "../docs-example/javascript-example";

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
        target: 99,
        jsx: 1
    }
});

addFormatCommand(languageProvider);
