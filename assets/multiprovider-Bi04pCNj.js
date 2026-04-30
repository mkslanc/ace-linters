import "./modulepreload-polyfill-BHCAmPhR.js";
import "./useragent-BMYEMUd9.js";
import "./dom-DRNmwCmL.js";
import "./range-BakcZ9jR.js";
import "./lang-Chfjzp5y.js";
import "./keys-CNbBglaM.js";
import "./event-Crda3qyq.js";
import "./config-7GJDZd_b.js";
import "./event_emitter-r-lZpQyf.js";
import "./textmate-CN2VrF7f.js";
import "./editor-ImsyhaOB.js";
import "./edit_session-DAgqly_m.js";
import "./tooltip-BuOUCQpw.js";
import "./tokenizer-B5s1nUwH.js";
import "./text-D8sm5DzM.js";
import "./token_iterator-BNxpI84f.js";
import "./hash_handler-DWXab_Mk.js";
import "./text-CIUeTHSc.js";
import "./virtual_renderer-CgL6zTGT.js";
import "./ace-Dxe3P65B.js";
import "./multi_select-Dohhryzh.js";
import "./fold_mode-D_StAfa6.js";
import "./error_marker-DpPZ5m3m.js";
import { i as init_esm_resolver, n as createEditorWithLSP, t as addFormatCommand } from "./utils-zrJ4NpFi.js";
import "./snippets-BNjR0AXO.js";
import "./autocomplete-Yq6Wywy-.js";
import { t as require_language_tools } from "./language_tools-B8HNeNpe.js";
import { t as require_ace_linters } from "./ace-linters-BKh-nWmP.js";
import { t as jsContent } from "./javascript-example-B39awIjT.js";
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
