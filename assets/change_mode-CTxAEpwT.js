import { a as __toESM } from "./chunk-Cu_MO8PN.js";
import "./modulepreload-polyfill-BHCAmPhR.js";
import "./useragent-BMYEMUd9.js";
import "./dom-DRNmwCmL.js";
import "./range-BakcZ9jR.js";
import "./lang-Chfjzp5y.js";
import "./keys-CNbBglaM.js";
import "./event-Crda3qyq.js";
import "./config-7GJDZd_b.js";
import "./event_emitter-r-lZpQyf.js";
import { t as require_textmate } from "./textmate-CN2VrF7f.js";
import "./editor-ImsyhaOB.js";
import "./edit_session-DAgqly_m.js";
import "./tooltip-BuOUCQpw.js";
import "./tokenizer-B5s1nUwH.js";
import "./text-D8sm5DzM.js";
import "./token_iterator-BNxpI84f.js";
import "./hash_handler-DWXab_Mk.js";
import "./text-CIUeTHSc.js";
import "./virtual_renderer-CgL6zTGT.js";
import { t as require_ace } from "./ace-Dxe3P65B.js";
import "./multi_select-Dohhryzh.js";
import "./fold_mode-D_StAfa6.js";
import "./error_marker-DpPZ5m3m.js";
import { i as init_esm_resolver, t as addFormatCommand } from "./utils-BloruIle.js";
import "./snippets-BNjR0AXO.js";
import "./autocomplete-Yq6Wywy-.js";
import { t as require_language_tools } from "./language_tools-B8HNeNpe.js";
import { t as require_ace_linters } from "./ace-linters-Di0e9VKI.js";
import { a as phpContent, c as luaContent, d as lessContent, f as cssContent, l as tsxContent, n as pythonContent, o as yamlContent, p as htmlContent, r as xmlContent, t as mysqlContent, u as scssContent } from "./mysql-example-OTpWl9wy.js";
import { t as typescriptContent } from "./typescript-example-BPagcZxQ.js";
import { t as jsonContent } from "./json-example-CezQNYSs.js";
import { t as jsContent } from "./javascript-example-B39awIjT.js";
import { t as json5Content } from "./json5-example--pTUMHTg.js";
require_language_tools();
init_esm_resolver();
var import_ace = /* @__PURE__ */ __toESM(require_ace());
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
		name: "json5",
		mode: "ace/mode/json5",
		content: json5Content
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
	"" + new URL("webworker-D-aAuX80.js", import.meta.url).href,
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
