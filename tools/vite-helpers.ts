import { Plugin } from "vite";

export function umd2Plugin(): Plugin {
  const emptyImportMetaUrlPattern = /(?:import\.meta\.url|""\s*\+\s*\{\}\.url)/g;
  const umdImportMetaUrlRuntime = [
    "var __umdDocumentCurrentScript = typeof document !== \"undefined\" ? document.currentScript : null;",
    "var __umdImportMetaUrl = typeof document === \"undefined\" && typeof location === \"undefined\" ? require(\"url\").pathToFileURL(__filename).href : typeof document === \"undefined\" ? location.href : __umdDocumentCurrentScript && __umdDocumentCurrentScript.tagName.toUpperCase() === \"SCRIPT\" && __umdDocumentCurrentScript.src || document.baseURI;",
  ].join("\n");

  return {
    name: "umd2-global-exports",
    generateBundle(_options, bundle) {
      for (const chunk of Object.values(bundle)) {
        if (chunk.type === "chunk" && chunk.code) {
          const hasEmptyImportMetaUrl = emptyImportMetaUrlPattern.test(chunk.code);
          emptyImportMetaUrlPattern.lastIndex = 0;

          chunk.code = chunk.code.replace(
            /factory\((global\d*)\.[\w]+ = \{\}\)/g,
            "factory($1)",
          );

          if (hasEmptyImportMetaUrl) {
            chunk.code = chunk.code.replace(emptyImportMetaUrlPattern, "__umdImportMetaUrl");
            chunk.code = chunk.code.replace(
              /Object\.defineProperty\(exports, Symbol\.toStringTag, \{ value: "Module" \}\);\n/,
              `Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });\n${umdImportMetaUrlRuntime}\n`,
            );
          }
        }
      }
    },
  };
}

export function suppressMetaWarningPlugin(): Plugin {
    return {
        name: "suppress-meta-warning",
        apply: "build",
        onLog(level, log: any) {
            if (
                level === "warn" &&
                log?.code === "EMPTY_IMPORT_META" &&
                typeof log?.id === "string"
            ) {
                return false;
            }
        },
    };
}
