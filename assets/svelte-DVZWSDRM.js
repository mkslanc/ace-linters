const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./language-client-w80P8oSG.js","./modulepreload-polyfill-DxDZhch-.js"])))=>i.map(i=>d[i]);
import { a as __toESM } from "./modulepreload-polyfill-DxDZhch-.js";
import { a as init_esm_resolver, n as createEditorWithLSP, o as __vitePreload, s as init_preload_helper, t as addFormatCommand } from "./utils-B-ki7ewn.js";
import { t as require_ace_language_client } from "./ace-language-client-DZXtePH9.js";
//#region packages/demo/docs-example/svelte-example.js
init_preload_helper();
init_esm_resolver();
var import_ace_language_client = require_ace_language_client();
//#endregion
//#region packages/demo/websockets-sls/client.ts
var modes = [{
	name: "svelte",
	mode: "ace/mode/html",
	content: `
    <script>
        let src = '/image.gif';
        let name = 'Ricketu';
<\/script>

<!-- {src} is short for src={src} -->
<img {src} alt="{name} dancing" />`
}];
var serverData = {
	module: () => __vitePreload(() => import("./language-client-w80P8oSG.js").then((m) => /* @__PURE__ */ __toESM(m.default)), __vite__mapDeps([0,1]), import.meta.url),
	modes: "html",
	type: "socket",
	socket: new WebSocket("ws://localhost:3030")
};
var languageProvider = import_ace_language_client.AceLanguageClient.for(serverData);
var i = 0;
for (let mode of modes) {
	createEditorWithLSP(mode, i, languageProvider);
	i++;
}
addFormatCommand(languageProvider);
//#endregion
