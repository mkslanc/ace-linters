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
import { t as require_autocomplete } from "./autocomplete-Yq6Wywy-.js";
import "./language_tools-B8HNeNpe.js";
import { t as jsContent } from "./javascript-example-B39awIjT.js";
import { t as require_ace_language_client } from "./ace-language-client-BXdpRlYb.js";
import { t as require_command_bar } from "./command_bar-D9DESsE0.js";
import { t as require_inline_autocomplete } from "./inline_autocomplete-BD6zzG2z.js";
//#region packages/demo/websockets-copilot/client.ts
init_esm_resolver();
var import_ace_language_client = require_ace_language_client();
var import_inline_autocomplete = require_inline_autocomplete();
var import_command_bar = require_command_bar();
var import_autocomplete = require_autocomplete();
init_preload_helper();
var modes = [{
	name: "javascript",
	mode: "ace/mode/javascript",
	content: jsContent
}];
var serverData = {
	serviceName: "copilot",
	module: () => __vitePreload(() => import("./language-client-2qyFA8Lw.js").then((m) => /* @__PURE__ */ __toESM(m.default)), __vite__mapDeps([0,1]), import.meta.url),
	modes: "javascript",
	type: "socket",
	socket: new WebSocket("ws://localhost:3080/copilot"),
	initializationOptions: {
		"editorInfo": {
			"name": "Ace Editor",
			"version": "latest"
		},
		"editorPluginInfo": {
			"name": "GitHub Copilot for Ace Linters",
			"version": "1.0.0"
		}
	}
};
var languageProvider = import_ace_language_client.AceLanguageClient.for(serverData, {
	functionality: {
		inlineCompletion: { overwriteCompleters: false },
		completion: { overwriteCompleters: false }
	},
	aceComponents: {
		InlineAutocomplete: import_inline_autocomplete.InlineAutocomplete,
		CommandBarTooltip: import_command_bar.CommandBarTooltip,
		CompletionProvider: import_autocomplete.CompletionProvider
	}
});
createEditorWithLSP(modes[0], 0, languageProvider, "100%").setOption("liveAutocompletionDelay", 500);
addFormatCommand(languageProvider);
setTimeout(() => {
	languageProvider.sendRequest("copilot", "signIn", {}, async (response) => {
		const signIn = await response;
		if (signIn?.status === "AlreadySignedIn") return;
		if (signIn.userCode) {
			window.focus();
			await navigator.clipboard.writeText(signIn.userCode);
		}
		languageProvider.executeCommand(signIn.command.command, "copilot", signIn.command.arguments, async (response) => {
			console.log(await response);
		});
		console.log(signIn);
	});
}, 2e3);
//#endregion
