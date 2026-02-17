const path = require("path");
const { build } = require("esbuild");
const stdLibBrowser = require("node-stdlib-browser");
const stdLibBrowserPlugin = require("node-stdlib-browser/helpers/esbuild/plugin");

const pkgRoot = __dirname;
const srcPath = (...parts) => path.resolve(pkgRoot, "src", ...parts);
const stdlibOverrides = {
  ...stdLibBrowser,
  fs: srcPath("shims", "node-fs.js"),
  "node:fs": srcPath("shims", "node-fs.js"),
  "fs/promises": srcPath("shims", "node-fs-promises.ts"),
  "node:fs/promises": srcPath("shims", "node-fs-promises.ts"),
  path: srcPath("shims", "path-browserify-win32.js"),
  "node:path": srcPath("shims", "path-browserify-win32.js"),
  "path/posix": srcPath("shims", "path-browserify-win32.js"),
  "node:path/posix": srcPath("shims", "path-browserify-win32.js"),
  process: srcPath("shims", "process-browser.js"),
  "node:process": srcPath("shims", "process-browser.js"),
  v8: srcPath("shims", "node-v8.js"),
  "node:v8": srcPath("shims", "node-v8.js"),
};

async function run() {
  await build({
    entryPoints: [srcPath("cspell-bundle-entry.js")],
    bundle: true,
    logLevel: "info",
    outfile: srcPath("lib", "cspell-lib-browser.js"),
    sourcemap: false,
    format: "esm",
    target: ["es2019"],
    platform: "browser",
    inject: [require.resolve("node-stdlib-browser/helpers/esbuild/shim")],
    plugins: [stdLibBrowserPlugin(stdlibOverrides)],
  });
  console.log("cspell browser bundle generated");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
