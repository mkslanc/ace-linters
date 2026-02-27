import { calcOverrideSettings } from "cspell-lib/dist/lib/Settings/calcOverrideSettings.js";
import {
  finalizeSettings,
  getSources,
  mergeSettings,
} from "cspell-lib/dist/lib/Settings/CSpellSettingsServer.js";
import {
  calcDictionaryDefsToLoad,
  isDictionaryDefinitionInlineInternal,
  isDictionaryFileDefinitionInternal,
} from "cspell-lib/dist/lib/Settings/internal/index.js";

const EMPTY_SETTINGS = Object.freeze({});

export {
  calcDictionaryDefsToLoad,
  calcOverrideSettings,
  finalizeSettings,
  getSources,
  isDictionaryDefinitionInlineInternal,
  isDictionaryFileDefinitionInternal,
  mergeSettings,
};

export function extractImportErrors() {
  return [];
}

export async function getDefaultSettings() {
  return EMPTY_SETTINGS;
}

export async function getGlobalSettingsAsync() {
  return EMPTY_SETTINGS;
}

export async function loadConfig() {
  return EMPTY_SETTINGS;
}

export async function resolveConfigFileImports(configFile) {
  return configFile?.settings || EMPTY_SETTINGS;
}

export async function resolveSettingsImports(settings) {
  return settings;
}

export async function searchForConfig() {
  return undefined;
}
