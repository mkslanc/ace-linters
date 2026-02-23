const fs = require("fs");
const path = require("path");
const childProcess = require("child_process");

const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "tests", "ui-smoke", "dist");
const scenariosDir = path.join(rootDir, "tests", "ui-smoke", "scenarios");

const packagesToCopy = [
    {
        name: "ace-linters",
        workspacePath: "packages/ace-linters",
        sourceBuildDir: path.join(rootDir, "packages", "ace-linters", "build"),
        targetBuildDir: path.join(distDir, "build", "ace-linters"),
        requiredFiles: ["ace-linters.js", "service-manager.js"],
    },
    {
        name: "ace-spell-check",
        workspacePath: "packages/ace-spell-check",
        sourceBuildDir: path.join(rootDir, "packages", "ace-spell-check", "build"),
        targetBuildDir: path.join(distDir, "build", "ace-spell-check"),
        requiredFiles: ["ace-spell-check.js"],
    },
    {
        name: "ace-clang-linter",
        workspacePath: "packages/ace-clang-linter",
        sourceBuildDir: path.join(rootDir, "packages", "ace-clang-linter", "build"),
        targetBuildDir: path.join(distDir, "build", "ace-clang-linter"),
        requiredFiles: ["ace-clang-linter.js"],
    },
];
const aceAssetsToCopy = [
    {
        sourceFile: path.join(rootDir, "node_modules", "ace-builds", "src-noconflict", "ace.js"),
        targetFile: path.join(distDir, "vendor", "ace", "ace.js"),
    },
    {
        sourceFile: path.join(rootDir, "node_modules", "ace-builds", "src-noconflict", "ext-language_tools.js"),
        targetFile: path.join(distDir, "vendor", "ace", "ext-language_tools.js"),
    },
];
const aceModeFilesToCopy = [
    "mode-typescript.js",
    "mode-json.js",
    "mode-css.js",
    "mode-html.js",
    "mode-yaml.js",
    "mode-php.js",
    "mode-xml.js",
    "mode-javascript.js",
    "mode-lua.js",
    "mode-less.js",
    "mode-scss.js",
    "mode-c_cpp.js",
];

function assertPathExists(targetPath, message) {
    if (!fs.existsSync(targetPath)) {
        throw new Error(message);
    }
}

function npmCommand() {
    return process.platform === "win32" ? "npm.cmd" : "npm";
}

function hasRequiredBuildArtifacts(pkg) {
    if (!fs.existsSync(pkg.sourceBuildDir)) {
        return false;
    }
    return pkg.requiredFiles.every((file) => {
        return fs.existsSync(path.join(pkg.sourceBuildDir, file));
    });
}

function buildWorkspacePackage(pkg) {
    childProcess.execSync(`${npmCommand()} run build -w ${pkg.workspacePath}`, {
        cwd: rootDir,
        stdio: "inherit",
    });
}

function ensurePackageBuilds() {
    for (const pkg of packagesToCopy) {
        if (!hasRequiredBuildArtifacts(pkg)) {
            console.log(`[ui-smoke] Missing build for ${pkg.name}. Building ${pkg.workspacePath}...`);
            buildWorkspacePackage(pkg);
        }

        if (!hasRequiredBuildArtifacts(pkg)) {
            throw new Error(
                `Build output for ${pkg.name} is incomplete after build step. ` +
                `Expected files: ${pkg.requiredFiles.join(", ")}`
            );
        }
    }
}

function copyPackageBuilds() {
    for (const pkg of packagesToCopy) {
        assertPathExists(
            pkg.sourceBuildDir,
            `Missing build output for ${pkg.name}. Run workspace build before preparing ui-smoke dist.`
        );
        fs.mkdirSync(pkg.targetBuildDir, {recursive: true});
        fs.cpSync(pkg.sourceBuildDir, pkg.targetBuildDir, {recursive: true, force: true});
    }
}

function copyScenarios() {
    assertPathExists(scenariosDir, "Missing tests/ui-smoke/scenarios directory.");
    fs.mkdirSync(distDir, {recursive: true});
    fs.cpSync(scenariosDir, distDir, {recursive: true, force: true});
}

function copyAceAssets() {
    for (const asset of aceAssetsToCopy) {
        assertPathExists(asset.sourceFile, `Missing Ace test asset: ${asset.sourceFile}`);
        fs.mkdirSync(path.dirname(asset.targetFile), {recursive: true});
        fs.copyFileSync(asset.sourceFile, asset.targetFile);
    }

    for (const fileName of aceModeFilesToCopy) {
        const sourceFile = path.join(rootDir, "node_modules", "ace-builds", "src-noconflict", fileName);
        const targetFile = path.join(distDir, "vendor", "ace", fileName);
        assertPathExists(sourceFile, `Missing Ace mode asset: ${sourceFile}`);
        fs.mkdirSync(path.dirname(targetFile), {recursive: true});
        fs.copyFileSync(sourceFile, targetFile);
    }

    const snippetsSourceDir = path.join(rootDir, "node_modules", "ace-builds", "src-noconflict", "snippets");
    const snippetsTargetDir = path.join(distDir, "vendor", "ace", "snippets");
    assertPathExists(snippetsSourceDir, `Missing Ace snippets directory: ${snippetsSourceDir}`);
    fs.mkdirSync(snippetsTargetDir, {recursive: true});
    fs.cpSync(snippetsSourceDir, snippetsTargetDir, {recursive: true, force: true});
}

function prepareDist() {
    ensurePackageBuilds();
    copyPackageBuilds();
    copyScenarios();
    copyAceAssets();
}

prepareDist();
