import "ace-code/esm-resolver";
import "ace-code/src/ext/language_tools";
import {AceLanguageClient} from "ace-linters/build/ace-language-client";
import {addFormatCommand, createEditorWithLSP} from "../utils";
import {jsonContent, jsonSchema, jsonSchema2} from "../docs-example/json-example";
import {LanguageClientConfig} from "ace-linters/types/types/language-service";

let modes = [
    {name: "json", mode: "ace/mode/json", content: jsonContent, options: {jsonSchemaUri: "common-form.schema.json"}},

];
let worker = new Worker(new URL('./webworker.ts', import.meta.url));
const serverData: LanguageClientConfig = {
    module: () => import("ace-linters/build/language-client"),
    modes: "json",
    type: "webworker",
    worker: worker,
}

let languageProvider = AceLanguageClient.for(serverData);

languageProvider.setGlobalOptions("json", {
    schemas: [
        {
            uri: "common-form.schema.json",
            schema: jsonSchema2
        }
    ]
});

let i = 0;
for (let mode of modes) {
    createEditorWithLSP(mode, i, languageProvider);
    i++;
}
languageProvider.setGlobalOptions("json", {
    schemas: [{
        uri: "colors.schema.json",
        schema: jsonSchema
    },]
}, true);

addFormatCommand(languageProvider);
