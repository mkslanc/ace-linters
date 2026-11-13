const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./language-client-C5Rkpof0.js","./rolldown-runtime-DQp2zzRu.js"])))=>i.map(i=>d[i]);
import { a as __toESM } from "./rolldown-runtime-DQp2zzRu.js";
import "./modulepreload-polyfill-DIeKMq_K.js";
import { a as init_esm_resolver, n as createEditorWithLSP, o as __vitePreload, r as require_language_tools, s as init_preload_helper, t as addFormatCommand } from "./utils-D25r59wl.js";
import { t as require_ace_language_client } from "./ace-language-client-Cp435YIa.js";
import { n as jsonSchema, r as jsonSchema2, t as jsonContent } from "./json-example-Cp3lIRpp.js";
// packages/demo/webworker-json-rpc/demo.ts
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
	module: () => __vitePreload(() => import("./language-client-C5Rkpof0.js").then((m) => /* @__PURE__ */ __toESM(m.default)), __vite__mapDeps([0,1]), import.meta.url),
	modes: "json",
	type: "webworker",
	worker: new Worker(new URL(
		/* @vite-ignore */
		new URL("webworker-BBDk1ZAL.js", import.meta.url).href,
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
