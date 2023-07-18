const ts = require('typescript');
const fs = require('fs');
const path = require('path');

const srcPaths = [
    path.join(__dirname, 'src/services/typescript/lib/', 'typescriptServices.d.ts'),
    path.join(__dirname, 'src/services/python/pkg/', 'ruff_wasm.d.ts')
];

const destDirs = [
    path.join(__dirname, 'types/services/typescript/lib/'), path.join(__dirname, 'types/services/python/pkg/')
];

const destPaths = [
    path.join(destDirs[0], 'typescriptServices.d.ts'), path.join(destDirs[1], 'ruff_wasm.d.ts')
];

const configFile = ts.readConfigFile('./tsconfig.json', ts.sys.readFile).config;

let { options, fileNames } = ts.parseJsonConfigFileContent(configFile, ts.sys, './');

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

destDirs.forEach((destDir, index) => {
    fs.mkdirSync(destDir, {recursive: true});
    fs.copyFileSync(srcPaths[index], destPaths[index]);
});

console.log('Prebuild script completed successfully');
