import { o as __toESM } from "./chunk-iA-Slpst.js";
import { a as init_esm_resolver, r as LanguageProvider, t as addFormatCommand } from "./utils-DupifF8s.js";
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
import { t as typescriptContent } from "./typescript-example-Dj0c1wPM.js";
init_esm_resolver();
require_language_tools();
var import_textmate = /* @__PURE__ */ __toESM(require_textmate());
var import_ace = /* @__PURE__ */ __toESM(require_ace());
var modes = [
	{
		name: "typescript",
		mode: "ace/mode/typescript",
		content: typescriptContent
	},
	{
		name: "json",
		mode: "ace/mode/json"
	},
	{
		name: "json5",
		mode: "ace/mode/json5"
	},
	{
		name: "html",
		mode: "ace/mode/html"
	},
	{
		name: "css",
		mode: "ace/mode/css"
	},
	{
		name: "less",
		mode: "ace/mode/less"
	},
	{
		name: "scss",
		mode: "ace/mode/scss"
	},
	{
		name: "python",
		mode: "ace/mode/python"
	},
	{
		name: "javascript",
		mode: "ace/mode/javascript"
	},
	{
		name: "tsx",
		mode: "ace/mode/tsx"
	},
	{
		name: "lua",
		mode: "ace/mode/lua"
	},
	{
		name: "yaml",
		mode: "ace/mode/yaml"
	},
	{
		name: "xml",
		mode: "ace/mode/xml"
	},
	{
		name: "php",
		mode: "ace/mode/php"
	},
	{
		name: "mysql",
		mode: "ace/mode/mysql"
	},
	{
		name: "swift",
		mode: "ace/mode/swift"
	}
];
var worker = new Worker(new URL(
	/* @vite-ignore */
	"" + new URL("webworker-CFwJXhOX.js", import.meta.url).href,
	"" + import.meta.url
), { type: "module" });
var languageProvider = LanguageProvider.create(worker);
var el = document.getElementById("ace_modes");
if (el && "value" in el) {
	el.onchange = function() {
		let mode = modes.find((x) => x.name == el["value"]);
		if (mode) editor.session.setMode(mode.mode);
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
editorEl.style.width = "49%";
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
