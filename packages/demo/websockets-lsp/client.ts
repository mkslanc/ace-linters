import "ace-code/esm-resolver";
import {jsonContent} from "../docs-example/json-example";

import {json5Content, json5Schema} from "../docs-example/json5-example";

import {addFormatCommand, createEditorWithLSP} from "../utils";
import {AceLanguageClient, LanguageClientConfig} from "ace-linters/build/ace-language-client";


let modes = [
    {name: "json", mode: "ace/mode/json", content: jsonContent, options: {jsonSchemaUri: "common-form.schema.json"}},
    {name: "json5", mode: "ace/mode/json5", content: json5Content, options: {jsonSchemaUri: json5Schema}},
]

const serverData: LanguageClientConfig = {
    module: () => import("ace-linters/build/language-client"),
    modes: "json|json5",
    type: "socket",
    socket: new WebSocket("ws://127.0.0.1:3000/exampleServer"),
}

let languageProvider = AceLanguageClient.for(serverData);
let i = 0;
for (let mode of modes) {
  // @ts-expect-error
    createEditorWithLSP(mode, i, languageProvider);
    i++;
}
// @ts-expect-error
addFormatCommand(languageProvider);
