const fs = require("fs");
const path = require("path");
const { build } = require("esbuild");
const stdLibBrowser = require("node-stdlib-browser");
const stdLibBrowserPlugin = require("node-stdlib-browser/helpers/esbuild/plugin");

const pkgRoot = __dirname;
const srcPath = (...parts) => path.resolve(pkgRoot, "src", ...parts);

function findPackageRoot(startDir, packageName) {
  let current = startDir;
  while (current && current !== path.dirname(current)) {
    const candidate = path.resolve(current, "node_modules", packageName);
    if (fs.existsSync(candidate)) {
      return candidate;
    }
    current = path.dirname(current);
  }
  throw new Error(`Unable to locate package "${packageName}" from ${startDir}`);
}

const cspellLibRoot = findPackageRoot(pkgRoot, "cspell-lib");

const cspellSettingsIndexShim = srcPath("shims", "cspell-settings-index-lite.js");
const cspellConfigLibShim = srcPath("shims", "cspell-config-lib-lite.js");
const stdlibOverrides = {
  ...stdLibBrowser,
  fs: srcPath("shims", "node-fs.js"),
  "node:fs": srcPath("shims", "node-fs.js"),
  "fs/promises": srcPath("shims", "node-fs-promises.js"),
  "node:fs/promises": srcPath("shims", "node-fs-promises.js"),
  path: srcPath("shims", "path-browserify-win32.js"),
  "node:path": srcPath("shims", "path-browserify-win32.js"),
  "path/posix": srcPath("shims", "path-browserify-win32.js"),
  "node:path/posix": srcPath("shims", "path-browserify-win32.js"),
  process: srcPath("shims", "process-browser.js"),
  "node:process": srcPath("shims", "process-browser.js"),
  v8: srcPath("shims", "node-v8.js"),
  "node:v8": srcPath("shims", "node-v8.js"),
};

const cspellBrowserLitePlugin = {
  name: "cspell-browser-lite",
  setup(buildApi) {
    buildApi.onResolve({ filter: /^cspell-config-lib$/ }, () => ({
      path: cspellConfigLibShim,
    }));
    buildApi.onResolve({ filter: /^cspell-lib\/dist\/lib\/.+\.js$/ }, (args) => ({
      path: path.resolve(cspellLibRoot, args.path.slice("cspell-lib/".length)),
    }));
    buildApi.onResolve({ filter: /^(\.\/|\.\.\/)+Settings\/index\.js$/ }, (args) => {
      const importer = args.importer.replace(/\\/g, "/");
      if (!importer.includes("/node_modules/cspell-lib/dist/lib/")) {
        return;
      }
      return { path: cspellSettingsIndexShim };
    });
    // Keep cspell-vfs as a shared external module to avoid duplicated VFS maps.
    buildApi.onResolve({ filter: /^\.\.\/lib\/cspell-vfs\.js$/ }, () => ({
      path: "./cspell-vfs.js",
      external: true,
    }));
  },
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
    plugins: [cspellBrowserLitePlugin, stdLibBrowserPlugin(stdlibOverrides)],
  });
  console.log("cspell browser bundle generated");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
