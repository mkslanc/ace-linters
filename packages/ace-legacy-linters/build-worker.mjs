import {build} from "esbuild";
import fs from "node:fs/promises";
import path from "node:path";
import {minify} from "terser";
import {fileURLToPath} from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageDir = __dirname;

const outputTargets = [
    {
        moduleFactory: "define",
        outDir: "build/src",
        minify: false
    },
    {
        moduleFactory: "define",
        outDir: "build/src-min",
        minify: true
    },
    {
        moduleFactory: "ace.define",
        outDir: "build/src-noconflict",
        minify: false
    },
    {
        moduleFactory: "ace.define",
        outDir: "build/src-min-noconflict",
        minify: true
    }
];
const workerConfigs = [
    {
        entry: "src/php-worker.ts",
        exportName: "PhpWorker",
        moduleId: "ace/mode/php_worker",
        fileName: "worker-php.js"
    }
];

const bootstrapFile = path.join(packageDir, "src", "worker.js");
const oopSourceFile = path.join(packageDir, "..", "..", "node_modules", "ace-code", "src", "lib", "oop.js");
const eventEmitterSourceFile = path.join(
    packageDir, "..", "..", "node_modules", "ace-code", "src", "lib", "event_emitter.js");

const PROCESS_SHIM = `
var globalObj = typeof globalThis !== "undefined" ? globalThis : self;
var processShim = globalObj.process = globalObj.process || {};
processShim.arch = processShim.arch || "x64";
`.trim();

function createAceModule(moduleFactory, moduleId, bundleCode, exportName) {
    return `
${moduleFactory}(${JSON.stringify(moduleId)}, [], function(require, exports, module) {
"use strict";
${PROCESS_SHIM}
${bundleCode}
exports.${exportName} = aceLegacyWorkerModule.${exportName};
});
`.trim();
}

function wrapAceCodeModule(moduleFactory, moduleId, source) {
    const normalizedSource = source
        .replace(/^\uFEFF?/, "")
        .replace(/^"use strict";\s*/, "");

    return `
${moduleFactory}(${JSON.stringify(moduleId)}, [], function(require, exports, module) {
"use strict";
${normalizedSource.trim()}
});
`.trim();
}

async function bundleWorkerModule(entryFile) {
    const result = await build({
        absWorkingDir: packageDir,
        entryPoints: [entryFile],
        bundle: true,
        write: false,
        format: "iife",
        globalName: "aceLegacyWorkerModule",
        platform: "browser",
        target: "es2019",
        sourcemap: false,
        minify: false,
        banner: {
            js: `var aceLegacyWorkerModule;`
        },
        footer: {
            js: `aceLegacyWorkerModule = aceLegacyWorkerModule.default || aceLegacyWorkerModule;`
        },
        logLevel: "info"
    });

    return result.outputFiles[0].text;
}

function asciify(text) {
    return text.replace(/[\x00-\x08\x0b\x0c\x0e\x19\x80-\uffff]/g, (char) => {
        const hex = char.charCodeAt(0).toString(16);
        if (hex.length === 1)
            return `\\x0${hex}`;
        if (hex.length === 2)
            return `\\x${hex}`;
        if (hex.length === 3)
            return `\\u0${hex}`;
        return `\\u${hex}`;
    });
}

async function compress(text) {
    const result = await minify(text, {
        compress: true,
        mangle: {
            toplevel: true,
            reserved: ["ACE_NAMESPACE", "requirejs"]
        },
        format: {
            ascii_only: true,
            inline_script: true
        }
    });

    if (!result.code) {
        throw new Error("Terser returned no output");
    }

    return asciify(result.code);
}

async function writeWorkerFile(workerConfig, target, bootstrap, bundleCode, oopModule, eventEmitterModule) {
    const fileContents = [
        bootstrap.trimEnd(), "", wrapAceCodeModule(target.moduleFactory, "ace/lib/oop", oopModule), "",
        wrapAceCodeModule(target.moduleFactory, "ace/lib/event_emitter", eventEmitterModule), "",
        createAceModule(target.moduleFactory, workerConfig.moduleId, bundleCode, workerConfig.exportName), ""
    ].join("\n");
    const finalContents = target.minify ? await compress(fileContents) : fileContents;
    const outfile = path.join(packageDir, target.outDir, workerConfig.fileName);

    await fs.mkdir(path.dirname(outfile), {recursive: true});
    await fs.writeFile(outfile, finalContents);

    return outfile;
}

const [bootstrap, oopModule, eventEmitterModule] = await Promise.all([
    fs.readFile(bootstrapFile, "utf8"), fs.readFile(oopSourceFile, "utf8"), fs.readFile(eventEmitterSourceFile, "utf8")
]);

for (const workerConfig of workerConfigs) {
    const entryFile = path.join(packageDir, workerConfig.entry);
    const bundleCode = await bundleWorkerModule(entryFile);

    for (const target of outputTargets) {
        const outfile = await writeWorkerFile(
            workerConfig, target, bootstrap, bundleCode, oopModule, eventEmitterModule
        );
        console.log(`built ${path.relative(packageDir, outfile).replace(/\\/g, "/")}`);
    }
}
