import "ace-code/esm-resolver";
import {AceLanguageClient} from "ace-linters/build/ace-language-client";
import {addFormatCommand, createEditorWithLSP} from "../utils";
import {pythonContent} from "../docs-example/python-example";
import {LanguageClientConfig} from "ace-linters/types/types/language-service";


let modes = [
    {name: "python", mode: "ace/mode/python", content: pythonContent},
]
const serverData: LanguageClientConfig = {
    module: () => import("ace-linters/build/language-client"),
    modes: "python",
    type: "socket",
    socket: new WebSocket("ws://localhost:3000"),
}

let languageProvider = AceLanguageClient.for(serverData);
languageProvider.setGlobalOptions("", {
    "pylsp": {
        "configurationSources": [
            "pycodestyle"
        ],
        "plugins": {
            "pycodestyle": {
                enabled: true,
                ignore: ["E501"],
                maxLineLength: 10
            },
            "pyflakes": {
                enabled: false
            }
        },

    },
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
    createEditorWithLSP(mode, i, languageProvider);
    i++;
}

addFormatCommand(languageProvider);
