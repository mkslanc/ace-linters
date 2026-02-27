import { o as __toESM } from "./chunk-iA-Slpst.js";
import { a as init_esm_resolver, r as LanguageProvider, t as addFormatCommand } from "./utils-cKgy90LS.js";
import "./useragent-BODERP_7.js";
import "./dom-BBjJ92-n.js";
import "./range-BUVqNbwc.js";
import "./lang-DcNOSqFo.js";
import "./keys-B8CLTATX.js";
import "./event-BcX-N72I.js";
import "./config-DPm1ug3B.js";
import "./event_emitter-BGfSYA24.js";
import { t as require_textmate } from "./textmate-zFNmb5zU.js";
import "./editor-BiOsjB7l.js";
import "./edit_session-CDHRvoey.js";
import "./tooltip-DAauyLxM.js";
import "./tokenizer-C2b-GJMk.js";
import "./text-B9A1mx6l.js";
import "./token_iterator-CbfYmntj.js";
import "./hash_handler-G_6vQiwI.js";
import "./text-DOzSnOss.js";
import "./virtual_renderer-xL5PfPPr.js";
import { t as require_ace } from "./ace-BNoj2zEj.js";
import "./multi_select-B30HHNMb.js";
import "./fold_mode-D1xG2KFM.js";
import "./error_marker-BBMov5iD.js";
import "./snippets-Ct-Wi_HP.js";
import "./autocomplete-CHTKiwQ7.js";
import { t as require_language_tools } from "./language_tools-BNL-ks-K.js";
import "./message-types-M_uv5dSK.js";
import "./src-D7AYzDf6.js";
import { a as phpContent, c as luaContent, d as lessContent, f as cssContent, l as tsxContent, n as pythonContent, o as yamlContent, p as htmlContent, r as xmlContent, t as mysqlContent, u as scssContent } from "./mysql-example-Ofom_MuX.js";
import { t as typescriptContent } from "./typescript-example-BPHpOvDB.js";
import { t as jsonContent } from "./json-example-DEkq114O.js";
import { t as jsContent } from "./javascript-example-DSBlUtkm.js";
import { t as json5Content } from "./json5-example-C88wPCQx.js";
require_language_tools();
init_esm_resolver();
var import_ace = /* @__PURE__ */ __toESM(require_ace());
var textContent = `
Ths is a smal text exmple for spel cheking.
It contans severl typos on purpse.
You shold see quick fix sugestions from cspell.
`;
var import_textmate = /* @__PURE__ */ __toESM(require_textmate());
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
	"" + new URL("webworker-CbjDA12w.js", import.meta.url).href,
	"" + import.meta.url
), { type: "module" });
var languageProvider = LanguageProvider.create(worker);
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
