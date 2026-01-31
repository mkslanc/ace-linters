const fs = require('fs');
const {generateDtsBundle} = require("dts-bundle-generator");

/** @type import('dts-bundle-generator/config-schema').OutputOptions */
const commonOutputParams = {
    inlineDeclareGlobals: false,
    noBanner: true,
};

const entries = [
    {
        filePath: './src/index.ts',
        outFile: './build/ace-linters.d.ts',
        output: commonOutputParams
    }, {
        filePath: './src/services/service-manager.ts',
        outFile: './build/service-manager.d.ts',
        output: commonOutputParams
    }, {
        filePath: './src/services/html/html-service.ts',
        outFile: './build/html-service.d.ts',
        output: commonOutputParams,
        libraries: {
            inlinedLibraries: ["vscode-html-languageservice"]
        }
    }, {
        filePath: './src/services/css/css-service.ts',
        outFile: './build/css-service.d.ts',
        output: commonOutputParams,
        libraries: {
            inlinedLibraries: ["vscode-css-languageservice"]
        }
    }, {
        filePath: './src/services/json/json-service.ts',
        outFile: './build/json-service.d.ts',
        output: commonOutputParams,
        libraries: {
            inlinedLibraries: ["vscode-json-languageservice"]
        }
    }, {
        filePath: './src/services/lua/lua-service.ts',
        outFile: './build/lua-service.d.ts',
        output: commonOutputParams
    }, {
        filePath: './src/services/typescript/typescript-service.ts',
        outFile: './build/typescript-service.d.ts',
        output: commonOutputParams
    }, {
        filePath: './src/services/yaml/yaml-service.ts',
        outFile: './build/yaml-service.d.ts',
        output: commonOutputParams
    }, {
        filePath: './src/services/xml/xml-service.ts',
        outFile: './build/xml-service.d.ts',
        output: commonOutputParams
    }, {
        filePath: './src/services/php/php-service.ts',
        outFile: './build/php-service.d.ts',
        output: commonOutputParams
    }, {
        filePath: './src/ace-language-client.ts',
        outFile: './build/ace-language-client.d.ts',
        output: commonOutputParams
    }, {
        filePath: './src/services/javascript/javascript-service.ts',
        outFile: './build/javascript-service.d.ts',
        output: commonOutputParams,
        libraries: {
            inlinedLibraries: ["eslint"]
        }
    }, {
        filePath: './src/services/base-service.ts',
        outFile: './build/base-service.d.ts',
        output: commonOutputParams
    }, {
        filePath: './src/services/language-client.ts',
        outFile: './build/language-client.d.ts',
        output: commonOutputParams
    }
];

const bundles = generateDtsBundle(entries, {preferredConfigPath: './tsconfig.json'});


bundles.forEach((bundle, index) => {
    fs.writeFileSync(entries[index].outFile, bundle);
});