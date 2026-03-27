import { i as init_esm_resolver, n as createEditorWithLSP, t as addFormatCommand } from "./utils-D49U00ka.js";
import "./useragent-Cm8O_vvb.js";
import "./dom-BmR1mTSl.js";
import "./range-D2fBS63W.js";
import "./lang-B3gWVpaj.js";
import "./keys-BcZo005C.js";
import "./event-Dotkamqq.js";
import "./config-D-BhsSyn.js";
import "./event_emitter-DQJDHkGW.js";
import "./textmate-7M3qxGeS.js";
import "./editor-IG7gAR87.js";
import "./edit_session-BlcJnX8K.js";
import "./tooltip-CZS68mop.js";
import "./tokenizer-BFeMc3TI.js";
import "./text-x9TxHOMd.js";
import "./token_iterator-B0gzmLw-.js";
import "./hash_handler-qEoapM91.js";
import "./text-N_UsxJUz.js";
import "./virtual_renderer-CFYU0u0C.js";
import "./ace-CwaQ19rM.js";
import "./multi_select-NPpC6jeg.js";
import "./fold_mode-DLWDk-fx.js";
import "./error_marker-CM8od4Mk.js";
import "./snippets-WSFIKT-5.js";
import "./autocomplete-DNfsPPz_.js";
import { t as require_language_tools } from "./language_tools-D17FoDJM.js";
import { t as require_ace_linters } from "./ace-linters-BAy_zK7w.js";
import { t as jsContent } from "./javascript-example-BNOTIo7I.js";
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
	"" + new URL("webworker-OL0Yj0pb.js", import.meta.url).href,
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
