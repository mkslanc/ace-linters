import "ace-code/esm-resolver";
import "ace-code/src/ext/language_tools";
import {LanguageProvider} from "ace-linters";
import {addFormatCommand, createEditorWithLSP} from "../utils";
import {htmlContent} from "../docs-example/html-example";
import {cssContent} from "../docs-example/css-example";
import {lessContent} from "../docs-example/less-example";
import {scssContent} from "../docs-example/scss-example";
import {typescriptContent, typescriptContent1} from "../docs-example/typescript-example";
import {jsonSchema, jsonContent, jsonSchema2} from "../docs-example/json-example";
import {jsContent} from "../docs-example/javascript-example";
import {tsxContent} from "../docs-example/tsx-example";
import {jsxContent} from "../docs-example/jsx-example";
import {json5Content, json5Schema} from "../docs-example/json5-example";
import {luaContent} from "../docs-example/lua-example";
import {yamlContent, yamlSchema} from "../docs-example/yaml-example";
import {phpContent} from "../docs-example/php-example";
import {xmlContent, xmlSchema} from "../docs-example/xml-example";
import {pythonContent} from "../docs-example/python-example";
import {mysqlContent} from "../docs-example/mysql-example";

let modes = [
    {name: "json", mode: "ace/mode/json", content: jsonContent, options: {schemaUri: "common-form.schema.json"}},
    {name: "json5", mode: "ace/mode/json5", content: json5Content, options: {schemaUri: "json5Schema"}},
    {name: "html", mode: "ace/mode/html", content: htmlContent},
    {name: "css", mode: "ace/mode/css", content: cssContent},
    {name: "less", mode: "ace/mode/less", content: lessContent},
    {name: "scss", mode: "ace/mode/scss", content: scssContent},
    {name: "typescript", mode: "ace/mode/typescript", content: typescriptContent},
    {name: "python", mode: "ace/mode/python", content: pythonContent},
    /*{name: "svelte", mode: "ace/mode/html", content: svelteContent},
    {name: "astro", mode: "ace/mode/astro", content: svelteContent},
    {name: "golang", mode: "ace/mode/golang", content: svelteContent},*/
    {name: "typescript", mode: "ace/mode/typescript", content: typescriptContent1},
    {name: "javascript", mode: "ace/mode/javascript", content: jsContent},
    {name: "tsx", mode: "ace/mode/tsx", content: tsxContent},
    {name: "jsx", mode: "ace/mode/javascript", content: jsxContent, options: {jsx: true}}, //TODO:
    {name: "lua", mode: "ace/mode/lua", content: luaContent},
    {name: "yaml", mode: "ace/mode/yaml", content: yamlContent, options: {schemaUri: "yamlSchema.json"}},
    {name: "xml", mode: "ace/mode/xml", content: xmlContent, options: {schemaUri: "xmlSchema.json"}},
    {name: "php", mode: "ace/mode/php", content: phpContent},
    {name: "mysql", mode: "ace/mode/mysql", content: mysqlContent},
];
let worker = new Worker(new URL('./webworker.ts', import.meta.url));

let languageProvider = LanguageProvider.create(worker);

languageProvider.setGlobalOptions("json", {
    schemas: [
        {
            uri: "common-form.schema.json",
            schema: jsonSchema2
        }
    ]
});

languageProvider.setGlobalOptions("typescript", {
    errorCodesToTreatAsWarning: [
        "2540"
    ]
});

languageProvider.setGlobalOptions("javascript", {
    errorMessagesToTreatAsInfo: [
        /Identifier\sdirectly/
    ]
});

languageProvider.setGlobalOptions("html", {
    errorMessagesToTreatAsInfo: [
        /Special\scharacters\smust\sbe\sescaped/
    ]
});

languageProvider.setGlobalOptions("json5", {
    schemas: [
        {
            uri: "json5Schema",
            schema: json5Schema
        }
    ],
    errorMessagesToTreatAsInfo: [
        /Incorrect\stype/
    ]
});

languageProvider.setGlobalOptions("yaml", {
    schemas: [
        {
            uri: "yamlSchema.json",
            schema: yamlSchema
        }
    ],
    errorMessagesToTreatAsInfo: [
        /Missing\sproperty/
    ]
});

languageProvider.setGlobalOptions("xml", {
    schemas: [
        {
            uri: "xmlSchema.json",
            schema: xmlSchema
        }
    ],
    errorMessagesToTreatAsWarning: [
        /Expecting\sone/
    ]
});

languageProvider.setGlobalOptions("css", {
    errorMessagesToTreatAsInfo: [
        /Unknown\sat\srule/
    ]
});

languageProvider.setGlobalOptions("php", {
    errorMessagesToTreatAsInfo: [
        /unexpected\sT_FUNCTION/
    ]
});

languageProvider.setGlobalOptions("lua", {
    errorMessagesToTreatAsWarning: [
        /expected\snear/
    ]
});

languageProvider.configureServiceFeatures("json", {
    completion: true, completionResolve: true, diagnostics: false, format: true, hover: true
})

languageProvider.setGlobalOptions("pythonls", {
    configuration: {
        "line-length": 120,
    },
    errorCodesToTreatAsWarning: [
        "E501",
        "F401"
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
