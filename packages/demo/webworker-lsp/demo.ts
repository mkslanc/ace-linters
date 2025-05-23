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
import {clangContent} from "../docs-example/clang-example";
import {zigContent} from "../docs-example/zig-example";
import {dartContent} from "../docs-example/dart-example";
import {goContent} from "../docs-example/go-example";

let modes = [
    {name: "json", mode: "ace/mode/json", content: jsonContent, options: {schemaUri: "common-form.schema.json"}},
    {name: "json5", mode: "ace/mode/json5", content: json5Content, options: {schemaUri: "json5Schema"}},
    {name: "html", mode: "ace/mode/html", content: htmlContent},
    {name: "css", mode: "ace/mode/css", content: cssContent},
    {name: "less", mode: "ace/mode/less", content: lessContent},
    {name: "scss", mode: "ace/mode/scss", content: scssContent},
    {name: "typescript", mode: "ace/mode/typescript", content: typescriptContent, filePath: "someLibDir/index.ts"},
    {name: "python", mode: "ace/mode/python", content: pythonContent},
    /*    {name: "svelte", mode: "ace/mode/html", content: svelteContent},
        {name: "astro", mode: "ace/mode/astro", content: svelteContent},
        {name: "golang", mode: "ace/mode/golang", content: svelteContent},*/
    {name: "typescript", mode: "ace/mode/typescript", content: typescriptContent1, filePath: "anotherFile.ts"},
    {name: "javascript", mode: "ace/mode/javascript", content: jsContent},
    {name: "tsx", mode: "ace/mode/tsx", content: tsxContent},
    {name: "jsx", mode: "ace/mode/javascript", content: jsxContent, options: {jsx: true}}, //TODO:
    {name: "lua", mode: "ace/mode/lua", content: luaContent},
    {name: "yaml", mode: "ace/mode/yaml", content: yamlContent, options: {schemaUri: "yamlSchema.json"}},
    {name: "xml", mode: "ace/mode/xml", content: xmlContent, options: {schemaUri: "xmlSchema.json"}},
    {name: "php", mode: "ace/mode/php", content: phpContent},
    {name: "mysql", mode: "ace/mode/mysql", content: mysqlContent},
    {name: "clang", mode: "ace/mode/c_cpp", content: clangContent},
    {name: "zig", mode: "ace/mode/zig", content: zigContent},
    {name: "dart", mode: "ace/mode/dart", content: dartContent},
    {name: "golang", mode: "ace/mode/golang", content: goContent}
];
let worker = new Worker(new URL('./webworker.ts', import.meta.url));

let languageProvider = LanguageProvider.create(worker, {
    functionality: {
        completion: {
            overwriteCompleters: true,
            lspCompleterOptions: {
                triggerCharacters: {
                    add: ["\n", "\r\n"],
                    remove: [],
                }
            }
        }
    }
});

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
    ],
    extraLibs: {
        "node_modules/lib-declaration/lib-declaration.d.ts": {
            content:
                `export class ChainableOne {
    chainableTwo: ChainableTwo;
    setAlpha(value: string): this;
    setBeta(value: number): ChainableTwo;
}

export class ChainableTwo {
    setGamma(value: boolean): this;
    addAlpha(value: string): ChainableOne;
}`,
            version: 1
        },
        // you don't need this config if declaration named `node_modules/lib-declaration/index.d.ts` (for
        // `lib-declaration` module)
        "node_modules/lib-declaration/package.json": {
            content:
                `{
    "name": "lib-declaration",
    "version": "1.3.3",
    "typings": "./lib-declaration.d.ts",
}
`,
            version: 1
        },
        "dir/file.ts": {
            content: "export var data = new ChainableOne();",
            version: 1
        }
    }
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
