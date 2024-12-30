const ts = require('typescript');
const fs = require("fs");

const configFile = ts.readConfigFile('./tsconfig.json', ts.sys.readFile).config;

let { options, fileNames } = ts.parseJsonConfigFileContent(configFile, ts.sys, './');

if (fs.existsSync("./types")) {
    fs.rmSync("./types", {recursive: true});
}

options = { ...options, allowJs: false, declaration: true, emitDeclarationOnly: true };

const program = ts.createProgram(fileNames, options);

const emitResult = program.emit();

const allDiagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);
allDiagnostics.forEach(diagnostic => {
    if (diagnostic.file) {
        const { line, character } = ts.getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start);
        const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
        console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
    } else {
        console.log(ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'));
    }
});

console.log('Prebuild script completed successfully');
