import type {CSpellUserSettings} from "@cspell/cspell-types";
import {cspellDictAssetFileByPackage} from "./cspell-dict-assets.generated.js";

import {
    isVfsPackageLoaded,
    markVfsPackageLoaded,
    packageNameFromVfsPath,
    registerVfsEntries,
} from "./cspell-vfs.js";

type DictionaryDefinitionLike = {
    name?: string;
    path?: string;
};

type LanguageSettingLike = {
    languageId?: string | string[];
    dictionaries?: string[];
};

type OverrideLike = {
    filename?: string | string[];
    dictionaries?: string[];
};

type DictAssetPayload = {
    package?: string;
    entries?: [string, string][];
};

type DictAssetUrlMap = Record<string, string>;

const pendingPackageLoads = new Map<string, Promise<void>>();

const GLOBAL_DICT_ASSET_URLS_KEY = "__aceSpellCheckDictAssetUrls";
const INTERNAL_DICTS_BASE_URL = resolveInternalDictsBaseUrl();
const DEFAULT_BASELINE_DICTIONARIES = new Set(["en_us"]);

function getGlobalScope(): Record<string, any> | undefined {
    if (typeof globalThis === "undefined") return undefined;
    return globalThis as Record<string, any>;
}

function splitLanguageIds(value: string | string[] | undefined): string[] {
    if (!value) return [];
    const raw = Array.isArray(value) ? value : [value];
    return raw
        .flatMap((part) => `${part}`.split(","))
        .map((part) => part.trim().toLowerCase())
        .filter((part) => !!part);
}

function languageSettingMatches(
    setting: LanguageSettingLike,
    documentLanguageIds: string[],
): boolean {
    const settingLanguageIds = splitLanguageIds(setting.languageId);
    if (!settingLanguageIds.length || !documentLanguageIds.length) return false;
    if (settingLanguageIds.includes("*")) return true;
    return settingLanguageIds.some((id) => documentLanguageIds.includes(id));
}

function collectRequiredDictionaryNames(
    settings: CSpellUserSettings,
    languageId: string | string[] | undefined,
    documentUri?: string,
    preserveGlobalDictionaries = true,
): Set<string> {
    const required = new Set<string>();
    const documentLanguageIds = splitLanguageIds(languageId);
    const languageSettings = (settings.languageSettings || []) as LanguageSettingLike[];
    const overrides = (settings.overrides || []) as OverrideLike[];

    const contextualDictionaryNames: string[] = [];

    for (const languageSetting of languageSettings) {
        if (!languageSettingMatches(languageSetting, documentLanguageIds)) continue;
        for (const dictionaryName of languageSetting.dictionaries || []) {
            if (dictionaryName) contextualDictionaryNames.push(dictionaryName);
        }
    }

    for (const override of overrides) {
        if (!overrideMatchesDocument(override, documentUri)) continue;
        for (const dictionaryName of override.dictionaries || []) {
            if (dictionaryName) contextualDictionaryNames.push(dictionaryName);
        }
    }

    if (preserveGlobalDictionaries) {
        for (const dictionaryName of settings.dictionaries || []) {
            if (dictionaryName) required.add(dictionaryName);
        }
    } else {
        for (const dictionaryName of settings.dictionaries || []) {
            if (!dictionaryName) continue;
            if (DEFAULT_BASELINE_DICTIONARIES.has(dictionaryName)) {
                required.add(dictionaryName);
            }
        }
    }

    for (const dictionaryName of contextualDictionaryNames) {
        required.add(dictionaryName);
    }

    return required;
}

function splitBraceAlternatives(pattern: string): string[] {
    const start = pattern.indexOf("{");
    const end = pattern.indexOf("}", start + 1);
    if (start < 0 || end < 0 || end <= start + 1) return [pattern];
    const prefix = pattern.slice(0, start);
    const suffix = pattern.slice(end + 1);
    const inner = pattern.slice(start + 1, end);
    return inner
        .split(",")
        .map((part) => `${prefix}${part.trim()}${suffix}`);
}

function escapeRegexPattern(input: string): string {
    return input.replace(/[.+^${}()|[\]\\]/g, "\\$&");
}

function globToRegex(pattern: string): RegExp {
    let regex = "^";
    for (let i = 0; i < pattern.length; i += 1) {
        const char = pattern[i];
        if (char === "*") {
            const isDouble = pattern[i + 1] === "*";
            if (isDouble) {
                const isSlash = pattern[i + 2] === "/";
                if (isSlash) {
                    regex += "(?:.*/)?";
                    i += 2;
                } else {
                    regex += ".*";
                    i += 1;
                }
            } else {
                regex += "[^/]*";
            }
            continue;
        }
        if (char === "?") {
            regex += "[^/]";
            continue;
        }
        regex += escapeRegexPattern(char);
    }
    regex += "$";
    return new RegExp(regex, "i");
}

function normalizeDocumentPath(documentUri: string | undefined): string | undefined {
    if (!documentUri) return undefined;
    try {
        const url = new URL(documentUri);
        if (url.protocol === "file:") {
            return decodeURIComponent(url.pathname || "").replace(/\\/g, "/");
        }
    } catch {
        // ignore and fallback to raw value
    }
    return `${documentUri}`.replace(/\\/g, "/");
}

function overrideMatchesDocument(override: OverrideLike, documentUri: string | undefined): boolean {
    const filename = override.filename;
    if (!filename) return true;
    const documentPath = normalizeDocumentPath(documentUri);
    if (!documentPath) return false;
    const documentBasename = documentPath.split("/").pop() || documentPath;
    const patterns = Array.isArray(filename) ? filename : [filename];

    for (const rawPattern of patterns) {
        const normalizedPattern = `${rawPattern}`.trim().replace(/\\/g, "/");
        if (!normalizedPattern) continue;
        const expandedPatterns = splitBraceAlternatives(normalizedPattern);
        for (const expandedPattern of expandedPatterns) {
            const matcher = globToRegex(expandedPattern);
            const target = expandedPattern.includes("/") ? documentPath : documentBasename;
            if (matcher.test(target)) return true;
        }
    }
    return false;
}

function filterDictionaryDefinitions(
    settings: CSpellUserSettings,
    dictionaryNames: Set<string>,
): DictionaryDefinitionLike[] {
    const defs = (settings.dictionaryDefinitions || []) as DictionaryDefinitionLike[];
    return defs.filter((def) => {
        if (!def?.name) return false;
        return dictionaryNames.has(def.name);
    });
}

function filterDictionaryList(
    dictionaries: string[] | undefined,
    dictionaryNames: Set<string>,
): string[] | undefined {
    if (!Array.isArray(dictionaries)) return undefined;
    return dictionaries.filter((name) => !!name && dictionaryNames.has(name));
}

export function createSpellCheckConfigForDocument(
    settings: CSpellUserSettings,
    languageId: string | string[] | undefined,
    documentUri: string | undefined,
    options?: { preserveGlobalDictionaries?: boolean },
): CSpellUserSettings {
    const preserveGlobalDictionaries = options?.preserveGlobalDictionaries ?? true;
    const dictionaryNames = collectRequiredDictionaryNames(
        settings,
        languageId,
        documentUri,
        preserveGlobalDictionaries,
    );

    const dictionaries = filterDictionaryList(settings.dictionaries, dictionaryNames) || [];
    const dictionaryDefinitions = filterDictionaryDefinitions(settings, dictionaryNames);
    const noSuggestDictionaries = filterDictionaryList(settings.noSuggestDictionaries, dictionaryNames);

    return {
        ...settings,
        dictionaries,
        dictionaryDefinitions: dictionaryDefinitions as CSpellUserSettings["dictionaryDefinitions"],
        ...(Array.isArray(settings.noSuggestDictionaries) ? { noSuggestDictionaries } : {}),
    };
}

function packageNameToAssetFileName(packageName: string): string | undefined {
    const mapped = cspellDictAssetFileByPackage[packageName as keyof typeof cspellDictAssetFileByPackage];
    if (mapped) return mapped;
    return `${packageName.replace(/^@/, "").replace(/\//g, "-")}.json`;
}

function normalizeBaseUrl(dictBaseUrl: string): string {
    return dictBaseUrl.replace(/\/+$/, "");
}

function dictionaryDefinitionsByName(settings: CSpellUserSettings): Map<string, DictionaryDefinitionLike> {
    const defs = (settings.dictionaryDefinitions || []) as DictionaryDefinitionLike[];
    const map = new Map<string, DictionaryDefinitionLike>();
    for (const def of defs) {
        if (def?.name) {
            map.set(def.name, def);
        }
    }
    return map;
}

function getGlobalDictionaryAssetUrl(packageName: string): string | undefined {
    const globalScope = getGlobalScope();
    if (!globalScope) return undefined;

    const globalMap = globalScope[GLOBAL_DICT_ASSET_URLS_KEY] as DictAssetUrlMap | undefined;
    const mapped = globalMap?.[packageName];
    if (typeof mapped === "string" && mapped.trim()) {
        return mapped.trim();
    }

    return undefined;
}

function resolveInternalDictsBaseUrl(): string | undefined {
    try {
        const moduleUrl = (0, eval)("import.meta.url");
        if (typeof moduleUrl === "string" && moduleUrl) {
            return new URL("./dicts/", moduleUrl).href;
        }
    } catch {
        // no-op
    }
    return undefined;
}

function hasGlobalDictionaryAssetSource(): boolean {
    const globalScope = getGlobalScope();
    if (!globalScope) return false;

    const globalMap = globalScope[GLOBAL_DICT_ASSET_URLS_KEY] as DictAssetUrlMap | undefined;
    return !!globalMap && Object.keys(globalMap).length > 0;
}

function hasDictionaryAssetSource(dictBaseUrl: string | undefined): boolean {
    if (typeof dictBaseUrl === "string" && dictBaseUrl.trim()) return true;
    if (typeof INTERNAL_DICTS_BASE_URL === "string" && INTERNAL_DICTS_BASE_URL) return true;
    return hasGlobalDictionaryAssetSource();
}

function resolveDictionaryAssetUrls(packageName: string, dictBaseUrl: string | undefined): string[] {
    const urls: string[] = [];

    const globalResolved = getGlobalDictionaryAssetUrl(packageName);
    if (globalResolved) {
        urls.push(globalResolved);
    }

    const fileName = packageNameToAssetFileName(packageName);
    if (!fileName) return urls;

    if (dictBaseUrl) {
        const baseUrl = normalizeBaseUrl(dictBaseUrl);
        urls.push(`${baseUrl}/${fileName}`);
    }

    if (INTERNAL_DICTS_BASE_URL) {
        urls.push(new URL(fileName, INTERNAL_DICTS_BASE_URL).href);
    }

    return [...new Set(urls.filter((url) => !!url))];
}

export function setDictionaryAssetUrls(urls: DictAssetUrlMap): void {
    const globalScope = getGlobalScope();
    if (!globalScope || !urls || typeof urls !== "object") return;
    const previous = (globalScope[GLOBAL_DICT_ASSET_URLS_KEY] as DictAssetUrlMap | undefined) || {};
    globalScope[GLOBAL_DICT_ASSET_URLS_KEY] = { ...previous, ...urls };
}

async function fetchDictionaryAsset(packageName: string, dictBaseUrl: string | undefined): Promise<void> {
    const assetUrls = resolveDictionaryAssetUrls(packageName, dictBaseUrl);
    if (!assetUrls.length) {
        throw new Error(`[ace-spell-check] Dictionary asset URL is not configured for package: ${packageName}`);
    }

    let lastError: unknown;
    for (const assetUrl of assetUrls) {
        try {
            const response = await fetch(assetUrl);
            if (!response.ok) {
                lastError = new Error(`[ace-spell-check] Failed to load dictionary asset: ${assetUrl}`);
                continue;
            }

            const payload = (await response.json()) as DictAssetPayload;
            if (!payload || !Array.isArray(payload.entries)) {
                lastError = new Error(`[ace-spell-check] Invalid dictionary asset payload: ${assetUrl}`);
                continue;
            }

            registerVfsEntries(payload.entries);
            markVfsPackageLoaded(payload.package || packageName);
            return;
        } catch (error) {
            lastError = error;
        }
    }

    throw lastError instanceof Error
        ? lastError
        : new Error(`[ace-spell-check] Failed to load dictionary asset package: ${packageName}`);
}

function ensureDictionaryPackageLoaded(packageName: string, dictBaseUrl: string | undefined): Promise<void> {
    if (isVfsPackageLoaded(packageName)) {
        return Promise.resolve();
    }

    const inFlight = pendingPackageLoads.get(packageName);
    if (inFlight) {
        return inFlight;
    }

    const pending = fetchDictionaryAsset(packageName, dictBaseUrl)
        .finally(() => pendingPackageLoads.delete(packageName));
    pendingPackageLoads.set(packageName, pending);
    return pending;
}

export async function ensureDictionariesForDocument(
    settings: CSpellUserSettings,
    languageId: string | string[] | undefined,
    dictBaseUrl: string | undefined,
    documentUri?: string,
): Promise<void> {
    if (!hasDictionaryAssetSource(dictBaseUrl)) return;

    const requiredDictionaryNames = collectRequiredDictionaryNames(settings, languageId, documentUri, true);
    if (!requiredDictionaryNames.size) return;

    const definitions = dictionaryDefinitionsByName(settings);
    const requiredPackages = new Set<string>();

    for (const dictionaryName of requiredDictionaryNames) {
        const definition = definitions.get(dictionaryName);
        if (!definition?.path) continue;
        const packageName = packageNameFromVfsPath(definition.path);
        if (!packageName || isVfsPackageLoaded(packageName)) continue;
        requiredPackages.add(packageName);
    }

    if (!requiredPackages.size) return;

    await Promise.all(
        [...requiredPackages].map((packageName) =>
            ensureDictionaryPackageLoaded(packageName, dictBaseUrl),
        ),
    );
}
