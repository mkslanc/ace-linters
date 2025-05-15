import "ace-code/esm-resolver";
import {AceLanguageClient, LanguageClientConfig} from "ace-linters/build/ace-language-client";
import {addFormatCommand, createEditorWithLSP} from "../utils";
import {typescriptContent} from "../docs-example/typescript-example";

let modes = [
    {name: "typescript", mode: "ace/mode/typescript", content: typescriptContent},
]
const serverData: LanguageClientConfig = {
    module: () => import("ace-linters/build/language-client"),
    modes: "typescript",
    type: "socket",
    socket: new WebSocket("ws://localhost:3000/typescript"),
}

let languageProvider = AceLanguageClient.for(serverData);
languageProvider.setGlobalOptions("", {
    initializationOptions: {
        configuration: {
            svelte: {
                plugin: {
                    typescript: {enable: false}
                }
            },
        }
    }
});
let i = 0;
for (let mode of modes) {
  // @ts-expect-error
    createEditorWithLSP(mode, i, languageProvider);
    i++;
}
// @ts-expect-error
addFormatCommand(languageProvider);
