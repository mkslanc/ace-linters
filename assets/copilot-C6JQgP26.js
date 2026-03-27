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
import { t as require_autocomplete } from "./autocomplete-DNfsPPz_.js";
import "./language_tools-D17FoDJM.js";
import { t as jsContent } from "./javascript-example-BNOTIo7I.js";
import { t as require_ace_language_client } from "./ace-language-client-CYa1OSPS.js";
import { t as require_command_bar } from "./command_bar-CHlpf1BA.js";
import { t as require_inline_autocomplete } from "./inline_autocomplete-CCk11Koh.js";
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
	module: () => __vitePreload(() => import("./language-client-DoZGfaDK.js").then((m) => /* @__PURE__ */ __toESM(m.default)), __vite__mapDeps([0,1]), import.meta.url),
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
