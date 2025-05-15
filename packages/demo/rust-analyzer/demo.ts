import "ace-code/esm-resolver";

import {AceLanguageClient, LanguageClientConfig} from "ace-linters/build/ace-language-client";
import {addFormatCommand, createEditorWithLSP} from "../utils";
import {rustContent} from "../docs-example/rust-example";

let worker = new Worker(new URL('./webworker.ts', import.meta.url));
let mode = {name: "rust", mode: "ace/mode/rust", content: rustContent};

const serverData: LanguageClientConfig = {
    module: () => import("ace-linters/build/language-client"),
    modes: "rust",
    type: "webworker",
    worker: worker,
}

let languageProvider = AceLanguageClient.for(serverData);
// @ts-expect-error
createEditorWithLSP(mode, 0, languageProvider);
// @ts-expect-error
addFormatCommand(languageProvider);
