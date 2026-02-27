import { cspellDictAssetFileByPackage } from "./lib/cspell-dict-assets.generated.js";

// @ts-ignore TS1343 in this package tsconfig (module is CommonJS for declaration tooling)
const moduleUrl = import.meta.url as string;

export const dictAssetUrlsByPackage = Object.fromEntries(
    Object.entries(cspellDictAssetFileByPackage).map(([packageName, fileName]) => [
        packageName,
        new URL(`./lib/dicts/${fileName}`, moduleUrl).href,
    ]),
) as Record<string, string>;

const globalScope = typeof globalThis === "undefined" ? undefined : (globalThis as Record<string, unknown>);
if (globalScope) {
    const previous = (globalScope.__aceSpellCheckDictAssetUrls as Record<string, string> | undefined) || {};
    globalScope.__aceSpellCheckDictAssetUrls = { ...previous, ...dictAssetUrlsByPackage };
}

export default dictAssetUrlsByPackage;
