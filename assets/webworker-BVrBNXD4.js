const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./language-client-DoZGfaDK.js","./chunk-BLiWRsM1.js"])))=>i.map(i=>d[i]);
import { a as __toESM } from "./chunk-BLiWRsM1.js";
import { a as __vitePreload, i as init_esm_resolver, n as createEditorWithLSP, o as init_preload_helper, t as addFormatCommand } from "./utils-D49U00ka.js";
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
import { n as jsonSchema, r as jsonSchema2, t as jsonContent } from "./json-example-0EQw_Ilh.js";
import { t as require_ace_language_client } from "./ace-language-client-CYa1OSPS.js";
//#region packages/demo/webworker-json-rpc/demo.ts
init_esm_resolver();
require_language_tools();
var import_ace_language_client = require_ace_language_client();
init_preload_helper();
var modes = [{
	name: "json",
	mode: "ace/mode/json",
	content: jsonContent,
	options: { jsonSchemaUri: "common-form.schema.json" }
}];
var serverData = {
	module: () => __vitePreload(() => import("./language-client-DoZGfaDK.js").then((m) => /* @__PURE__ */ __toESM(m.default)), __vite__mapDeps([0,1]), import.meta.url),
	modes: "json",
	type: "webworker",
	worker: new Worker(new URL(
		/* @vite-ignore */
		"" + new URL("webworker-Clg-4shS.js", import.meta.url).href,
		"" + import.meta.url
	), { type: "module" })
};
var languageProvider = import_ace_language_client.AceLanguageClient.for(serverData);
languageProvider.setGlobalOptions("json", { schemas: [{
	uri: "common-form.schema.json",
	schema: jsonSchema2
}] });
var i = 0;
for (let mode of modes) {
	createEditorWithLSP(mode, i, languageProvider);
	i++;
}
languageProvider.setGlobalOptions("json", { schemas: [{
	uri: "colors.schema.json",
	schema: jsonSchema
}] }, true);
addFormatCommand(languageProvider);
//#endregion
