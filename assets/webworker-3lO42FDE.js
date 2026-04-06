const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./language-client-2qyFA8Lw.js","./chunk-Cu_MO8PN.js"])))=>i.map(i=>d[i]);
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
import { a as __vitePreload, i as init_esm_resolver, n as createEditorWithLSP, o as init_preload_helper, t as addFormatCommand } from "./utils-BloruIle.js";
import "./snippets-BNjR0AXO.js";
import "./autocomplete-Yq6Wywy-.js";
import { t as require_language_tools } from "./language_tools-B8HNeNpe.js";
import { n as jsonSchema, r as jsonSchema2, t as jsonContent } from "./json-example-CezQNYSs.js";
import { t as require_ace_language_client } from "./ace-language-client-BXdpRlYb.js";
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
	module: () => __vitePreload(() => import("./language-client-2qyFA8Lw.js").then((m) => /* @__PURE__ */ __toESM(m.default)), __vite__mapDeps([0,1]), import.meta.url),
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
