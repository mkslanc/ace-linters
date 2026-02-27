const fs = require("fs");
const path = require("path");
const { pathToFileURL } = require("url");
const { parse: parseJsonc } = require("jsonc-parser");

const pkgRoot = __dirname;
function resolvePackageRoot(packageName) {
  const resolvedEntry = require.resolve(packageName);
  const parts = packageName.split("/");
  const scoped = packageName.startsWith("@") && parts.length >= 2;
  const expectedScope = scoped ? parts[0] : null;
  const expectedName = scoped ? parts[1] : parts[0];

  let current = path.dirname(resolvedEntry);
  while (current && current !== path.dirname(current)) {
    const base = path.basename(current);
    if (scoped) {
      const parent = path.dirname(current);
      if (base === expectedName && path.basename(parent) === expectedScope) {
        return current;
      }
    } else if (base === expectedName) {
      return current;
    }
    current = path.dirname(current);
  }

  throw new Error(`Unable to resolve package root for ${packageName} from ${resolvedEntry}`);
}

const bundledDictsPkgDir = resolvePackageRoot("@cspell/cspell-bundled-dicts");
const cspellScopeDir = path.resolve(bundledDictsPkgDir, "..");
const bundledDictConfigFile = require.resolve("@cspell/cspell-bundled-dicts/cspell-default.config.js");
const outDir = path.resolve(pkgRoot, "src/lib");
const settingsOutFile = path.resolve(outDir, "cspell-settings.generated.js");
const vfsOutFile = path.resolve(outDir, "cspell-vfs.generated.js");
const dictAssetsMetaOutFile = path.resolve(outDir, "cspell-dict-assets.generated.js");
const dictAssetsOutDir = path.resolve(outDir, "dicts");
const DEFAULT_PRELOAD_DICTIONARIES = new Set(["en_us"]);

const isObject = (v) => !!v && typeof v === "object" && !Array.isArray(v);

function stableStringify(value) {
  if (Array.isArray(value)) {
    return `[${value.map(stableStringify).join(",")}]`;
  }
  if (isObject(value)) {
    const keys = Object.keys(value).sort();
    return `{${keys.map((k) => `${JSON.stringify(k)}:${stableStringify(value[k])}`).join(",")}}`;
  }
  return JSON.stringify(value);
}

function toJsLiteral(value, indent = 0) {
  const pad = " ".repeat(indent);
  const padIn = " ".repeat(indent + 2);

  if (value === null) return "null";
  if (value instanceof RegExp) return value.toString();
  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    return `[\n${value.map((v) => `${padIn}${toJsLiteral(v, indent + 2)}`).join(",\n")}\n${pad}]`;
  }
  if (isObject(value)) {
    const entries = Object.entries(value).filter(([, v]) => v !== undefined);
    if (!entries.length) return "{}";
    const props = entries.map(([k, v]) => {
      const key = /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(k) ? k : JSON.stringify(k);
      return `${padIn}${key}: ${toJsLiteral(v, indent + 2)}`;
    });
    return `{\n${props.join(",\n")}\n${pad}}`;
  }
  return JSON.stringify(value);
}

function resolveImportPath(importRef) {
  if (importRef.startsWith("@cspell/")) {
    const parts = importRef.split("/");
    const packageName = parts.length >= 2 ? `${parts[0]}/${parts[1]}` : importRef;
    const packageDir = resolvePackageRoot(packageName);
    const subPath = parts.slice(2).join("/");
    return subPath ? path.resolve(packageDir, subPath) : packageDir;
  }
  return path.resolve(path.dirname(bundledDictConfigFile), importRef);
}

function toVfsPath(packageName, relativeFilePath) {
  const cleaned = relativeFilePath
    .replace(/^[./\\]+/, "")
    .replace(/\\/g, "/");
  return `/__cspell_vfs/${packageName}/${cleaned}`;
}

function packageNameToAssetFile(packageName) {
  return `${packageName.replace(/^@/, "").replace(/\//g, "-")}.json`;
}

function dedupeArray(items) {
  const seen = new Set();
  const out = [];
  for (const item of items) {
    const key = stableStringify(item);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(item);
  }
  return out;
}

async function loadDefaultBundledSettings() {
  const mod = await import(pathToFileURL(bundledDictConfigFile).href);
  return structuredClone(mod.default);
}

function listAllDictionaryExtensionFiles() {
  const dictPackageDirs = fs
    .readdirSync(cspellScopeDir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && d.name.startsWith("dict-"))
    .map((d) => path.resolve(cspellScopeDir, d.name));

  return dictPackageDirs
    .map((pkgDir) => path.resolve(pkgDir, "cspell-ext.json"))
    .filter((extFile) => fs.existsSync(extFile));
}

function packageNameFromExtFile(extFile) {
  const parts = extFile.split(path.sep);
  const scopeIndex = parts.lastIndexOf("@cspell");
  if (scopeIndex >= 0 && parts[scopeIndex + 1]) {
    return `@cspell/${parts[scopeIndex + 1]}`;
  }
  return "unknown";
}

function mergeExtSettings(baseSettings, extSettings, extFile, dictDefByName, dictPackageByName, vfsByPath, vfsByPackage) {
  const packageName = packageNameFromExtFile(extFile);
  const dictionaries = extSettings.dictionaries || [];
  const dictionaryDefinitions = extSettings.dictionaryDefinitions || [];
  const languageSettings = extSettings.languageSettings || [];
  const overrides = extSettings.overrides || [];
  const words = extSettings.words || [];
  const flagWords = extSettings.flagWords || [];
  const suggestWords = extSettings.suggestWords || [];
  const ignoreWords = extSettings.ignoreWords || [];

  baseSettings.dictionaries.push(...dictionaries);
  baseSettings.languageSettings.push(...languageSettings);
  baseSettings.overrides.push(...overrides);
  baseSettings.words.push(...words);
  baseSettings.flagWords.push(...flagWords);
  baseSettings.suggestWords.push(...suggestWords);
  baseSettings.ignoreWords.push(...ignoreWords);

  for (const definition of dictionaryDefinitions) {
    if (!definition || !definition.name || !definition.path) continue;
    const sourcePath = path.resolve(path.dirname(extFile), definition.path);
    if (!fs.existsSync(sourcePath)) continue;

    const vfsPath = toVfsPath(packageName, definition.path);
    const sourceBytes = fs.readFileSync(sourcePath);
    const sourceBase64 = sourceBytes.toString("base64");
    vfsByPath.set(vfsPath, sourceBase64);

    if (!vfsByPackage.has(packageName)) {
      vfsByPackage.set(packageName, []);
    }
    vfsByPackage.get(packageName).push([vfsPath, sourceBase64]);

    dictDefByName.set(definition.name, {
      ...definition,
      path: vfsPath,
    });
    dictPackageByName.set(definition.name, packageName);
    baseSettings.dictionaries.push(definition.name);
  }
}

function writeGeneratedSettings(settings) {
  const source = `// This file is auto-generated by build-cspell-dicts.js.
// Do not edit by hand.

export const cspellGeneratedSettings = ${toJsLiteral(settings, 0)};

export default cspellGeneratedSettings;
`;
  fs.writeFileSync(settingsOutFile, source, "utf8");
}

function writeGeneratedVfs(vfsByPath) {
  const entries = Array.from(vfsByPath.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  const source = `// This file is auto-generated by build-cspell-dicts.js.
// Do not edit by hand.

export const cspellVfsEntries = ${JSON.stringify(entries)};
export const cspellVfsMap = new Map(cspellVfsEntries);

export default cspellVfsMap;
`;
  fs.writeFileSync(vfsOutFile, source, "utf8");
}

function writeGeneratedDictionaryAssets(vfsByPackage) {
  fs.mkdirSync(dictAssetsOutDir, { recursive: true });
  for (const entry of fs.readdirSync(dictAssetsOutDir, { withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.endsWith(".json")) continue;
    try {
      fs.unlinkSync(path.resolve(dictAssetsOutDir, entry.name));
    } catch (error) {
      if (!error || error.code !== "EPERM") {
        throw error;
      }
    }
  }

  for (const [packageName, rawEntries] of Array.from(vfsByPackage.entries()).sort((a, b) => a[0].localeCompare(b[0]))) {
    const entries = [...rawEntries].sort((a, b) => a[0].localeCompare(b[0]));
    const outFile = path.resolve(dictAssetsOutDir, packageNameToAssetFile(packageName));
    const payload = {
      package: packageName,
      entries,
    };
    fs.writeFileSync(outFile, JSON.stringify(payload), "utf8");
  }
}

function writeGeneratedDictionaryAssetsMeta(vfsByPackage, allDefaultDictionaries) {
  const packageToAssetFile = Object.fromEntries(
    Array.from(vfsByPackage.keys())
      .sort((a, b) => a.localeCompare(b))
      .map((packageName) => [packageName, packageNameToAssetFile(packageName)])
  );

  const payload = {
    packageToAssetFile,
    allDefaultDictionaries: [...allDefaultDictionaries],
  };

  const jsSource = `// This file is auto-generated by build-cspell-dicts.js.
// Do not edit by hand.

export const cspellDictAssetFileByPackage = ${toJsLiteral(payload.packageToAssetFile, 0)};
export const cspellAllDefaultDictionaries = ${toJsLiteral(payload.allDefaultDictionaries, 0)};

export default {
  cspellDictAssetFileByPackage,
  cspellAllDefaultDictionaries,
};
`;

  fs.writeFileSync(dictAssetsMetaOutFile, jsSource, "utf8");
}

async function run() {
  fs.mkdirSync(outDir, { recursive: true });

  const defaultSettings = await loadDefaultBundledSettings();

  const settings = {
    ...defaultSettings,
    import: [],
    noConfigSearch: true,
    loadDefaultConfiguration: false,
    dictionaries: [...(defaultSettings.dictionaries || [])],
    dictionaryDefinitions: [...(defaultSettings.dictionaryDefinitions || [])],
    languageSettings: [...(defaultSettings.languageSettings || [])],
    overrides: [...(defaultSettings.overrides || [])],
    words: [...(defaultSettings.words || [])],
    flagWords: [...(defaultSettings.flagWords || [])],
    suggestWords: [...(defaultSettings.suggestWords || [])],
    ignoreWords: [...(defaultSettings.ignoreWords || [])],
  };

  const dictDefByName = new Map(
    settings.dictionaryDefinitions
      .filter((d) => d && d.name)
      .map((d) => [d.name, d])
  );
  const dictPackageByName = new Map();
  const vfsByPath = new Map();
  const vfsByPackage = new Map();

  const importRefs = new Set(defaultSettings.import || []);
  for (const extFile of listAllDictionaryExtensionFiles()) {
    const pkgName = packageNameFromExtFile(extFile);
    importRefs.add(`${pkgName}/cspell-ext.json`);
  }

  for (const importRef of importRefs) {
    const importPath = resolveImportPath(importRef);
    if (!fs.existsSync(importPath)) continue;
    const extSettings = parseJsonc(fs.readFileSync(importPath, "utf8"));
    mergeExtSettings(settings, extSettings, importPath, dictDefByName, dictPackageByName, vfsByPath, vfsByPackage);
  }

  settings.dictionaryDefinitions = Array.from(dictDefByName.values()).sort((a, b) => a.name.localeCompare(b.name));
  settings.dictionaries = Array.from(new Set(settings.dictionaries)).sort((a, b) => a.localeCompare(b));
  settings.languageSettings = dedupeArray(settings.languageSettings);
  settings.overrides = dedupeArray(settings.overrides || []);
  settings.words = Array.from(new Set(settings.words));
  settings.flagWords = Array.from(new Set(settings.flagWords));
  settings.suggestWords = Array.from(new Set(settings.suggestWords));
  settings.ignoreWords = Array.from(new Set(settings.ignoreWords));
  const allDefaultDictionaries = [...settings.dictionaries];

  const preloadedDictionaries = settings.dictionaries.filter((name) => DEFAULT_PRELOAD_DICTIONARIES.has(name));
  if (!preloadedDictionaries.length && settings.dictionaries.length) {
    preloadedDictionaries.push(settings.dictionaries[0]);
  }
  settings.dictionaries = preloadedDictionaries;

  const preloadedPackages = new Set(
    preloadedDictionaries
      .map((name) => dictPackageByName.get(name))
      .filter((name) => !!name)
  );
  const preloadVfsByPath = new Map();
  for (const packageName of preloadedPackages) {
    const entries = vfsByPackage.get(packageName) || [];
    for (const [key, value] of entries) {
      preloadVfsByPath.set(key, value);
    }
  }

  writeGeneratedSettings(settings);
  writeGeneratedVfs(preloadVfsByPath);
  writeGeneratedDictionaryAssets(vfsByPackage);
  writeGeneratedDictionaryAssetsMeta(vfsByPackage, allDefaultDictionaries);

  console.log(
    `Generated ${path.relative(pkgRoot, settingsOutFile)}, ${path.relative(pkgRoot, vfsOutFile)}, ${path.relative(pkgRoot, dictAssetsMetaOutFile)}, and ${path.relative(pkgRoot, dictAssetsOutDir)} ` +
    `(${settings.dictionaryDefinitions.length} dictionary definitions, ${vfsByPath.size} dictionary files, ${preloadVfsByPath.size} preloaded files, ${vfsByPackage.size} asset packages).`
  );
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
