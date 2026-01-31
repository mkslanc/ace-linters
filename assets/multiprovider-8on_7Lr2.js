import { a as init_esm_resolver, n as createEditorWithLSP, r as LanguageProvider, t as addFormatCommand } from "./utils-DupifF8s.js";
import "./useragent-BODERP_7.js";
import "./dom-BBjJ92-n.js";
import "./range-BUVqNbwc.js";
import "./lang-DcNOSqFo.js";
import "./keys-B8CLTATX.js";
import "./event-BcX-N72I.js";
import "./config-DPm1ug3B.js";
import "./event_emitter-BGfSYA24.js";
import "./textmate-zFNmb5zU.js";
import "./editor-BiOsjB7l.js";
import "./edit_session-CDHRvoey.js";
import "./tooltip-DAauyLxM.js";
import "./tokenizer-C2b-GJMk.js";
import "./text-B9A1mx6l.js";
import "./token_iterator-CbfYmntj.js";
import "./hash_handler-G_6vQiwI.js";
import "./text-DOzSnOss.js";
import "./virtual_renderer-xL5PfPPr.js";
import "./ace-BNoj2zEj.js";
import "./multi_select-B30HHNMb.js";
import "./fold_mode-D1xG2KFM.js";
import "./error_marker-BBMov5iD.js";
import "./snippets-Ct-Wi_HP.js";
import "./autocomplete-CHTKiwQ7.js";
import { t as require_language_tools } from "./language_tools-BNL-ks-K.js";
import "./message-types-M_uv5dSK.js";
import "./src-D7AYzDf6.js";
import { t as jsContent } from "./javascript-example-CusLgu-w.js";
init_esm_resolver();
require_language_tools();
var modes = [{
	name: "javascript validated by EsLint, with hover, autocompletion and format of Typescript",
	mode: "ace/mode/javascript",
	content: jsContent
}];
var worker = new Worker(new URL(
	/* @vite-ignore */
	"" + new URL("webworker-C4CG_zW4.js", import.meta.url).href,
	"" + import.meta.url
), { type: "module" });
var languageProvider = LanguageProvider.create(worker);
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
