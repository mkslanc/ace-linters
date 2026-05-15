import "ace-code/esm-resolver";


import {AceLanguageClient} from "ace-linters/build/ace-language-client";
//import {addFormatCommand, createEditorWithLSP} from "../utils-ace-builds";
import {addFormatCommand, createEditorWithLSP} from "../utils";
import {jsContent} from "../docs-example/javascript-example";
import {LanguageClientConfig} from "ace-linters/src/types/language-service";

import {InlineAutocomplete} from "ace-code/src/ext/inline_autocomplete";
import {CommandBarTooltip} from "ace-code/src/ext/command_bar";
import {CompletionProvider} from "ace-code/src/autocomplete";
/*import * as ace from "ace-builds";
const InlineAutocomplete = ace.require("ace/ext/inline_autocomplete").InlineAutocomplete;
const CommandBarTooltip = ace.require("ace/ext/command_bar").CommandBarTooltip;
const CompletionProvider = ace.require("ace/autocomplete").CompletionProvider;*/

let modes = [
    {name: "javascript", mode: "ace/mode/javascript", content: jsContent},
]

const serverData: LanguageClientConfig = {
    serviceName: "copilot",
    module: () => import("ace-linters/build/language-client"),
    modes: "javascript",
    type: "socket",
    socket: new WebSocket("ws://localhost:3080/copilot"),
    initializationOptions: {
        "editorInfo": {
            "name": "Ace Editor",
            "version": "latest"
        },
        "editorPluginInfo": {
            "name": "GitHub Copilot for Ace Linters",
            "version": "1.0.0"
        }
    }
}


let languageProvider = AceLanguageClient.for(serverData, {
    functionality: {
        inlineCompletion: {
            overwriteCompleters: false,
        },
        completion: {
            overwriteCompleters: false,
        }
    },
    aceComponents: {
        InlineAutocomplete,
        CommandBarTooltip,
        CompletionProvider
    }
});
// @ts-expect-error
let editor = createEditorWithLSP(modes[0], 0, languageProvider, "100%",);
editor.setOption("liveAutocompletionDelay", 500);
// @ts-expect-error
addFormatCommand(languageProvider);

setTimeout(() => {
    languageProvider.sendRequest("copilot", "signIn", {}, async (response) => {
        const signIn = await response;
        if (signIn?.status === "AlreadySignedIn") {
            return;
        }
        if (signIn.userCode) {
            window.focus();
            await navigator.clipboard.writeText(signIn.userCode);
        }
        languageProvider.executeCommand(signIn.command.command, "copilot", signIn.command.arguments, async (response) => {
            console.log(await response);
        });
        console.log(signIn);
    });
}, 2000);