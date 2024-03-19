import "ace-code/esm-resolver";

import {AceLanguageClient} from "ace-linters/build/ace-language-client";
import {addFormatCommand, createEditorWithLSP} from "../utils";
import {rustContent} from "../docs-example/rust-example";
import {LanguageClientConfig} from "ace-linters/types/types/language-service";

let worker = new Worker(new URL('./webworker.ts', import.meta.url));
let mode = {name: "rust", mode: "ace/mode/rust", content: rustContent};

const serverData: LanguageClientConfig = {
    module: () => import("ace-linters/build/language-client"),
    modes: "rust",
    type: "webworker",
    worker: worker,
}

let languageProvider = AceLanguageClient.for(serverData);
createEditorWithLSP(mode, 0, languageProvider);

addFormatCommand(languageProvider);
