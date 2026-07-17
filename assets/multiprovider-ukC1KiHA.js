import "./modulepreload-polyfill-DxDZhch-.js";
import { a as init_esm_resolver, n as createEditorWithLSP, r as require_language_tools, t as addFormatCommand } from "./utils-B-ki7ewn.js";
import { t as require_ace_linters } from "./ace-linters-BKCO25qA.js";
import { t as jsContent } from "./javascript-example-B2Z9-Fqx.js";
//#region packages/demo/multiprovider/demo.ts
init_esm_resolver();
require_language_tools();
var import_ace_linters = require_ace_linters();
var modes = [{
	name: "javascript validated by EsLint, with hover, autocompletion and format of Typescript",
	mode: "ace/mode/javascript",
	content: jsContent
}];
var worker = new Worker(new URL(
	/* @vite-ignore */
	"" + new URL("webworker-CarDVFZx.js", import.meta.url).href,
	"" + import.meta.url
), { type: "module" });
var languageProvider = import_ace_linters.LanguageProvider.create(worker);
var i = 0;
for (let mode of modes) {
	createEditorWithLSP(mode, i, languageProvider);
	i++;
}
languageProvider.setGlobalOptions("typescript", { compilerOptions: {
	allowJs: true,
	checkJs: true,
	target: 99,
	jsx: 1
} });
addFormatCommand(languageProvider);
//#endregion
