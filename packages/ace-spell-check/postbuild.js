const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const { generateDtsBundle } = require("dts-bundle-generator");

/** @type import('dts-bundle-generator/config-schema').OutputOptions */
const commonOutputParams = {
    inlineDeclareGlobals: false,
    noBanner: true
};

const pkgRoot = __dirname;
const buildDir = path.resolve(pkgRoot, "build");
const tempDir = path.resolve(buildDir, ".dts-tmp");
const emittedDeclDir = path.resolve(tempDir, "emitted");
const declarationFiles = ["ace-spell-check.d.ts", "service.d.ts", "ace-spell-check-converters.d.ts"];

function rewriteForBundling(source, sourceFileName) {
    let rewritten = source.replace(
        /from "ace-linters\/src\/services\/base-service"/g,
        'from "ace-linters/build/base-service"'
    );

    if (sourceFileName === "service.d.ts") {
        rewritten = rewritten.replace(
            /from "ace-linters\/src\/types\/language-service"/g,
            'from "ace-linters/build/ace-language-client"'
        );
    } else {
        rewritten = rewritten.replace(
            /from "ace-linters\/src\/types\/language-service"/g,
            'from "ace-linters/build/base-service"'
        );
    }

    return rewritten;
}

function emitDeclarations() {
    fs.mkdirSync(emittedDeclDir, { recursive: true });
    execFileSync(
        process.execPath,
        [
            require.resolve("typescript/bin/tsc"),
            "--project",
            path.resolve(pkgRoot, "tsconfig.json"),
            "--emitDeclarationOnly",
            "--declaration",
            "--declarationDir",
            emittedDeclDir
        ],
        { cwd: pkgRoot, stdio: "inherit" }
    );
}

function findDeclarationFile(typesDir, fileName) {
    const direct = path.resolve(typesDir, fileName);
    if (fs.existsSync(direct)) {
        return direct;
    }

    const stack = [typesDir];
    while (stack.length > 0) {
        const current = stack.pop();
        const entries = fs.readdirSync(current, { withFileTypes: true });
        for (const entry of entries) {
            const fullPath = path.resolve(current, entry.name);
            if (entry.isDirectory()) {
                stack.push(fullPath);
                continue;
            }
            if (entry.isFile() && entry.name === fileName) {
                return fullPath;
            }
        }
    }

    throw new Error(`Declaration file not found after emit: ${fileName}`);
}

function copyAndRewriteTypes(typesDir) {
    fs.mkdirSync(tempDir, { recursive: true });
    declarationFiles.forEach((fileName) => {
        const input = fs.readFileSync(findDeclarationFile(typesDir, fileName), "utf8");
        fs.writeFileSync(path.resolve(tempDir, fileName), rewriteForBundling(input, fileName), "utf8");
    });
}

function cleanupTempDir() {
    if (!fs.existsSync(tempDir)) {
        return;
    }
    try {
        fs.rmSync(tempDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    } catch (error) {
        if (!error || error.code !== "EPERM") {
            throw error;
        }
    }
}

function bundleDeclarations() {
    const entries = [
        {
            filePath: path.resolve(tempDir, "ace-spell-check.d.ts"),
            outFile: path.resolve(buildDir, "ace-spell-check.d.ts"),
            output: commonOutputParams,
            libraries: {
                inlinedLibraries: ["@cspell/cspell-types"],
                importedLibraries: [
                    "ace-linters",
                    "vscode-languageserver-protocol",
                    "vscode-languageserver-textdocument"
                ]
            }
        }
    ];

    const bundles = generateDtsBundle(entries, {
        preferredConfigPath: path.resolve(pkgRoot, "tsconfig.json"),
        followSymlinks: false
    });

    fs.mkdirSync(buildDir, { recursive: true });
    bundles.forEach((bundle, index) => {
        fs.writeFileSync(entries[index].outFile, bundle);
    });
}

try {
    emitDeclarations();
    copyAndRewriteTypes(emittedDeclDir);
    bundleDeclarations();
} finally {
    cleanupTempDir();
}
