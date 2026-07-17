import { a as __toESM } from "./modulepreload-polyfill-DxDZhch-.js";
import { t as require_textmate } from "./textmate-Clzsgc4E.js";
import { a as init_esm_resolver, c as require_ace, r as require_language_tools, t as addFormatCommand } from "./utils-B-ki7ewn.js";
import { t as require_ace_linters } from "./ace-linters-BKCO25qA.js";
import { a as phpContent, c as luaContent, d as lessContent, f as cssContent, l as tsxContent, n as pythonContent, o as yamlContent, p as htmlContent, r as xmlContent, t as mysqlContent, u as scssContent } from "./mysql-example-BTghjFcA.js";
import { t as typescriptContent } from "./typescript-example-CTwOxtAu.js";
import { t as jsonContent } from "./json-example-ZlyDYP5Z.js";
import { t as jsContent } from "./javascript-example-B2Z9-Fqx.js";
//#region packages/demo/docs-example/text-example.js
var import_ace = /* @__PURE__ */ __toESM(require_ace());
init_esm_resolver();
require_language_tools();
var textContent = `
Ths is a smal text exmple for spel cheking.
It contans severl typos on purpse.
You shold see quick fix sugestions from cspell.
`;
//#endregion
//#region packages/demo/webworker-change-mode/demo.ts
var import_textmate = /* @__PURE__ */ __toESM(require_textmate());
var import_ace_linters = require_ace_linters();
var modes = [
	{
		name: "text",
		mode: "ace/mode/text",
		content: textContent
	},
	{
		name: "typescript",
		mode: "ace/mode/typescript",
		content: typescriptContent
	},
	{
		name: "json",
		mode: "ace/mode/json",
		content: jsonContent
	},
	{
		name: "html",
		mode: "ace/mode/html",
		content: htmlContent
	},
	{
		name: "css",
		mode: "ace/mode/css",
		content: cssContent
	},
	{
		name: "less",
		mode: "ace/mode/less",
		content: lessContent
	},
	{
		name: "scss",
		mode: "ace/mode/scss",
		content: scssContent
	},
	{
		name: "python",
		mode: "ace/mode/python",
		content: pythonContent
	},
	{
		name: "javascript",
		mode: "ace/mode/javascript",
		content: jsContent
	},
	{
		name: "tsx",
		mode: "ace/mode/tsx",
		content: tsxContent
	},
	{
		name: "lua",
		mode: "ace/mode/lua",
		content: luaContent
	},
	{
		name: "yaml",
		mode: "ace/mode/yaml",
		content: yamlContent
	},
	{
		name: "xml",
		mode: "ace/mode/xml",
		content: xmlContent
	},
	{
		name: "php",
		mode: "ace/mode/php",
		content: phpContent
	},
	{
		name: "mysql",
		mode: "ace/mode/mysql",
		content: mysqlContent
	},
	{
		name: "swift",
		mode: "ace/mode/swift",
		content: "print(\"Hello, Swift\")\n"
	}
];
var worker = new Worker(new URL(
	/* @vite-ignore */
	"" + new URL("webworker-HVJK9CSo.js", import.meta.url).href,
	"" + import.meta.url
), { type: "module" });
var languageProvider = import_ace_linters.LanguageProvider.create(worker);
var el = document.getElementById("ace_modes");
if (el && "value" in el) {
	el.onchange = function() {
		let mode = modes.find((x) => x.name == el["value"]);
		if (mode) {
			editor.setValue(mode.content ?? "", -1);
			editor.session.setMode(mode.mode);
		}
	};
	for (var i = 0; i < modes.length; i++) {
		let option = document.createElement("option");
		option.value = modes[i].name;
		option.innerText = modes[i].name;
		el.appendChild(option);
	}
}
var editorEl = document.createElement("div");
var editorContainer = document.createElement("div");
editorContainer.setAttribute("id", "container");
editorContainer.style.height = "300px";
editorEl.appendChild(editorContainer);
editorEl.style.width = "100%";
editorEl.style.float = "left";
document.getElementById("wrapper")?.appendChild(editorEl);
var currentMode = modes[0];
var editor = import_ace.edit("container", {
	mode: currentMode.mode,
	value: currentMode.content,
	enableBasicAutocompletion: true,
	enableLiveAutocompletion: true,
	enableSnippets: true,
	theme: import_textmate,
	customScrollbar: true
});
languageProvider.registerEditor(editor);
addFormatCommand(languageProvider);
//#endregion
