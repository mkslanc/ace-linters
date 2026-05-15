#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const {pathToFileURL} = require("url");

const packageDir = __dirname;
const rootDir = path.resolve(packageDir, "..", "..");
const defaultInput = path.join(
    rootDir, "node_modules", "vscode-css-languageservice", "lib", "esm", "data",
    "webCustomData.js"
);
const defaultOutput = path.join(packageDir, "src", "workers", "css-diagnostics-data.generated.js");

function sortByName(entries) {
    return entries.slice().sort((left, right) => left.name.localeCompare(right.name));
}

function stripProperties(properties) {
    return sortByName(properties.map((property) => {
        const next = {name: property.name};
        if (property.status) {
            next.status = property.status;
        }
        return next;
    }));
}

function stripNamedEntries(entries) {
    return sortByName(entries.map((entry) => ({name: entry.name})));
}

function buildDiagnosticsData(cssData, keepPseudos) {
    return {
        version: cssData.version,
        properties: stripProperties(cssData.properties || []),
        atDirectives: stripNamedEntries(cssData.atDirectives || []),
        pseudoClasses: keepPseudos ? stripNamedEntries(cssData.pseudoClasses || []) : [],
        pseudoElements: keepPseudos ? stripNamedEntries(cssData.pseudoElements || []) : []
    };
}

async function loadCssData(inputPath) {
    const moduleUrl = pathToFileURL(inputPath).href;
    const imported = await import(moduleUrl);
    if (!imported.cssData) {
        throw new Error(`No cssData export found in ${inputPath}`);
    }
    return imported.cssData;
}

function writeOutput(outputPath, diagnosticsData) {
    fs.mkdirSync(path.dirname(outputPath), {recursive: true});
    fs.writeFileSync(outputPath, `export const cssData = ${JSON.stringify(diagnosticsData, null, 2)};\n`);
}

async function main() {
    const cssData = await loadCssData(defaultInput);
    const diagnosticsData = buildDiagnosticsData(cssData, false);
    writeOutput(defaultOutput, diagnosticsData);
}

main().catch((error) => {
    console.error(error.message || error);
    process.exit(1);
});
