const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./language-client-w80P8oSG.js","./modulepreload-polyfill-DxDZhch-.js"])))=>i.map(i=>d[i]);
import { a as __toESM } from "./modulepreload-polyfill-DxDZhch-.js";
import { a as init_esm_resolver, n as createEditorWithLSP, o as __vitePreload, s as init_preload_helper, t as addFormatCommand } from "./utils-B-ki7ewn.js";
import { t as require_autocomplete } from "./autocomplete-DWTwaDC-.js";
import { t as jsContent } from "./javascript-example-B2Z9-Fqx.js";
import { t as require_ace_language_client } from "./ace-language-client-DZXtePH9.js";
import { t as require_command_bar } from "./command_bar-Y8ABi_NC.js";
import { t as require_inline_autocomplete } from "./inline_autocomplete-Ie1mKBsX.js";
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
	module: () => __vitePreload(() => import("./language-client-w80P8oSG.js").then((m) => /* @__PURE__ */ __toESM(m.default)), __vite__mapDeps([0,1]), import.meta.url),
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
