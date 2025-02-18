const fs = require('fs');
const {generateDtsBundle} = require("dts-bundle-generator");

if (fs.existsSync("./types")) {
    fs.rmSync("./types", {recursive: true});
}

/** @type import('dts-bundle-generator/config-schema').OutputOptions */
const commonOutputParams = {
    inlineDeclareGlobals: false,
    noBanner: true
};

const entries = [
    {
        filePath: './src/index.ts',
        outFile: './types/ace-linters.d.ts',
        output: commonOutputParams
    }, {
        filePath: './src/services/service-manager.ts',
        outFile: './types/service-manager.d.ts',
        output: commonOutputParams
    }, {
        filePath: './src/services/html/html-service.ts',
        outFile: './types/html-service.d.ts',
        output: commonOutputParams,
        libraries: {
            inlinedLibraries: ["vscode-html-languageservice"]
        }
    }, {
        filePath: './src/services/css/css-service.ts',
        outFile: './types/css-service.d.ts',
        output: commonOutputParams,
        libraries: {
            inlinedLibraries: ["vscode-css-languageservice"]
        }
    }, {
        filePath: './src/services/json/json-service.ts',
        outFile: './types/json-service.d.ts',
        output: commonOutputParams,
        libraries: {
            inlinedLibraries: ["vscode-json-languageservice"]
        }
    }, {
        filePath: './src/services/lua/lua-service.ts',
        outFile: './types/lua-service.d.ts',
        output: commonOutputParams
    }, {
        filePath: './src/services/typescript/typescript-service.ts',
        outFile: './types/typescript-service.d.ts',
        output: commonOutputParams
    }, {
        filePath: './src/services/yaml/yaml-service.ts',
        outFile: './types/yaml-service.d.ts',
        output: commonOutputParams
    }, {
        filePath: './src/services/xml/xml-service.ts',
        outFile: './types/xml-service.d.ts',
        output: commonOutputParams
    }, {
        filePath: './src/services/php/php-service.ts',
        outFile: './types/php-service.d.ts',
        output: commonOutputParams
    }, {
        filePath: './src/ace-language-client.ts',
        outFile: './types/ace-language-client.d.ts',
        output: commonOutputParams
    }, {
        filePath: './src/services/javascript/javascript-service.ts',
        outFile: './types/javascript-service.d.ts',
        output: commonOutputParams
    }, {
        filePath: './src/services/base-service.ts',
        outFile: './types/base-service.d.ts',
        output: commonOutputParams
    }, {
        filePath: './src/services/language-client.ts',
        outFile: './types/language-client.d.ts',
        output: commonOutputParams
    }
];

const bundles = generateDtsBundle(entries, {preferredConfigPath: './tsconfig.json'});

fs.mkdirSync("./types");

bundles.forEach((bundle, index) => {
    fs.writeFileSync(entries[index].outFile, bundle);
});

console.log('Prebuild script completed successfully');
