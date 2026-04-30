const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./language-client-BzrMdHxh.js","./chunk-Cu_MO8PN.js"])))=>i.map(i=>d[i]);
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
import { a as __vitePreload, i as init_esm_resolver, n as createEditorWithLSP, o as init_preload_helper, t as addFormatCommand } from "./utils-zrJ4NpFi.js";
import "./snippets-BNjR0AXO.js";
import "./autocomplete-Yq6Wywy-.js";
import "./language_tools-B8HNeNpe.js";
import { t as typescriptContent } from "./typescript-example-BPagcZxQ.js";
import { t as require_ace_language_client } from "./ace-language-client-BvGpS4Pn.js";
//#region packages/demo/websockets-pylsp/client.ts
init_esm_resolver();
var import_ace_language_client = require_ace_language_client();
init_preload_helper();
var modes = [{
	name: "typescript",
	mode: "ace/mode/typescript",
	content: typescriptContent
}];
var serverData = {
	module: () => __vitePreload(() => import("./language-client-BzrMdHxh.js").then((m) => /* @__PURE__ */ __toESM(m.default)), __vite__mapDeps([0,1]), import.meta.url),
	modes: "typescript",
	type: "socket",
	socket: new WebSocket("ws://localhost:3000/typescript")
};
var languageProvider = import_ace_language_client.AceLanguageClient.for(serverData);
languageProvider.setGlobalOptions("", { initializationOptions: { configuration: { svelte: { plugin: { typescript: { enable: false } } } } } });
var i = 0;
for (let mode of modes) {
	createEditorWithLSP(mode, i, languageProvider);
	i++;
}
addFormatCommand(languageProvider);
//#endregion
