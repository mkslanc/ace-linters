//taken from monaco-editor repo with minor changes

const {transformEnumProperties} = require("./transform-ts-enums");

const path = require('path');
const fs = require('fs');
const REPO_ROOT = path.join(__dirname, '../');
const MONO_REPO_ROOT = path.join(__dirname, '../../../');

const generatedNote = `//
// **NOTE**: Do not edit directly! This file is generated using \`npm run generate-typescript-service\`
//
`;

const TYPESCRIPT_LIB_SOURCE = path.join(MONO_REPO_ROOT, 'node_modules/typescript/lib');
const TYPESCRIPT_LIB_DESTINATION = path.join(REPO_ROOT, 'src/services/typescript/lib');

(function () {
    try {
        fs.statSync(TYPESCRIPT_LIB_DESTINATION);
    } catch (err) {
        fs.mkdirSync(TYPESCRIPT_LIB_DESTINATION);
    }
    importLibs();

    let tsServices = fs.readFileSync(path.join(TYPESCRIPT_LIB_SOURCE, 'typescript.js')).toString();

    tsServices = tsServices
        .replace(
            'const path = matchedStar ? subst.replace("*", matchedStar) : subst;',
            'const path = matchedStar ? subst.replace("*", matchedStar) : subst; // CodeQL [SM02383] This is a false positive, the code is from the TypeScript compiler'
        )
        .replace(
            'return key.replace("*", matchedStar);',
            'return key.replace("*", matchedStar); // CodeQL [SM02383] This is a false positive, the code is from the TypeScript compiler'
        );

    // The output from this build will only be accessible via ESM; rather than removing
    // references to require/module, define them as dummy variables that bundlers will ignore.
    // The TS code can figure out that it's not running under Node even with these defined.
    tsServices = `
/* changed */
var require = undefined;
var module = { exports: {} };
/* END  */
` + tsServices;

    const tsServices_esm = generatedNote + tsServices + `
// changed
export var createClassifier = ts.createClassifier;
export var createLanguageService = ts.createLanguageService;
export var displayPartsToString = ts.displayPartsToString;
export var parseJsonConfigFileContent = ts.parseJsonConfigFileContent;
export var EndOfLineState = ts.EndOfLineState;
export var flattenDiagnosticMessageText = ts.flattenDiagnosticMessageText;
export var IndentStyle = ts.IndentStyle;
export var ScriptKind = ts.ScriptKind;
export var ScriptTarget = ts.ScriptTarget;
export var TokenClass = ts.TokenClass;
export var typescript = ts;
// END
`;
    fs.writeFileSync(path.join(TYPESCRIPT_LIB_DESTINATION, 'typescriptServices.js'), stripSourceMaps(tsServices_esm));

    let dtsServices = fs.readFileSync(path.join(TYPESCRIPT_LIB_SOURCE, 'typescript.d.ts')).toString();
    let anotherCompilerOptions = transformEnumProperties(dtsServices);
    fs.writeFileSync(path.join(TYPESCRIPT_LIB_DESTINATION, 'typescriptServices.d.ts'), generatedNote + dtsServices + "\n" + anotherCompilerOptions);
})();

function importLibs() {
    function readLibFile(name) {
        const srcPath = path.join(TYPESCRIPT_LIB_SOURCE, name);
        return fs.readFileSync(srcPath).toString();
    }

    let strLibResult = `/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
${generatedNote}

/** Contains all the lib files */
export const libFileMap: Record<string, string> = {}
`;

    const dtsFiles = fs.readdirSync(TYPESCRIPT_LIB_SOURCE).filter((f) => f.includes('lib.'));
    while (dtsFiles.length > 0) {
        const name = dtsFiles.shift();
        const output = readLibFile(name).replace(/\r\n/g, '\n');
        strLibResult += `libFileMap['${name}'] = "${escapeText(output)}";\n`;
    }

    fs.writeFileSync(path.join(TYPESCRIPT_LIB_DESTINATION, 'lib.ts'), strLibResult);
}

/**
 * Escape text such that it can be used in a javascript string enclosed by double quotes (")
 */
function escapeText(text) {
    // See http://www.javascriptkit.com/jsref/escapesequence.shtml
    const _backspace = '\b'.charCodeAt(0);
    const _formFeed = '\f'.charCodeAt(0);
    const _newLine = '\n'.charCodeAt(0);
    const _nullChar = 0;
    const _carriageReturn = '\r'.charCodeAt(0);
    const _tab = '\t'.charCodeAt(0);
    const _verticalTab = '\v'.charCodeAt(0);
    const _backslash = '\\'.charCodeAt(0);
    const _doubleQuote = '"'.charCodeAt(0);

    const len = text.length;
    let startPos = 0;
    let chrCode;
    let replaceWith = null;
    let resultPieces = [];

    for (let i = 0; i < len; i++) {
        chrCode = text.charCodeAt(i);
        switch (chrCode) {
            case _backspace:
                replaceWith = '\\b';
                break;
            case _formFeed:
                replaceWith = '\\f';
                break;
            case _newLine:
                replaceWith = '\\n';
                break;
            case _nullChar:
                replaceWith = '\\0';
                break;
            case _carriageReturn:
                replaceWith = '\\r';
                break;
            case _tab:
                replaceWith = '\\t';
                break;
            case _verticalTab:
                replaceWith = '\\v';
                break;
            case _backslash:
                replaceWith = '\\\\';
                break;
            case _doubleQuote:
                replaceWith = '\\"';
                break;
        }
        if (replaceWith !== null) {
            resultPieces.push(text.substring(startPos, i));
            resultPieces.push(replaceWith);
            startPos = i + 1;
            replaceWith = null;
        }
    }
    resultPieces.push(text.substring(startPos, len));
    return resultPieces.join('');
}

function stripSourceMaps(str) {
    return str.replace(/\/\/# sourceMappingURL[^\n]+/gm, '');
}
