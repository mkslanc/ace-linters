const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./language-client-Dyckz_Na.js","./message-types-M_uv5dSK.js","./chunk-iA-Slpst.js"])))=>i.map(i=>d[i]);
import { a as init_esm_resolver, n as createEditorWithLSP, o as __vitePreload, s as init_preload_helper, t as addFormatCommand } from "./utils-DupifF8s.js";
import "./useragent-BODERP_7.js";
import "./dom-BBjJ92-n.js";
import "./range-BUVqNbwc.js";
import "./lang-DcNOSqFo.js";
import "./keys-B8CLTATX.js";
import "./event-BcX-N72I.js";
import "./config-DPm1ug3B.js";
import "./event_emitter-BGfSYA24.js";
import "./textmate-zFNmb5zU.js";
import "./editor-BiOsjB7l.js";
import "./edit_session-CDHRvoey.js";
import "./tooltip-DAauyLxM.js";
import "./tokenizer-C2b-GJMk.js";
import "./text-B9A1mx6l.js";
import "./token_iterator-CbfYmntj.js";
import "./hash_handler-G_6vQiwI.js";
import "./text-DOzSnOss.js";
import "./virtual_renderer-xL5PfPPr.js";
import "./ace-BNoj2zEj.js";
import "./multi_select-B30HHNMb.js";
import "./fold_mode-D1xG2KFM.js";
import "./error_marker-BBMov5iD.js";
import "./snippets-Ct-Wi_HP.js";
import { t as require_autocomplete } from "./autocomplete-CHTKiwQ7.js";
import "./language_tools-BNL-ks-K.js";
import "./message-types-M_uv5dSK.js";
import { t as jsContent } from "./javascript-example-CusLgu-w.js";
import { t as AceLanguageClient } from "./ace-language-client-V9lRdLqp.js";
import { t as require_command_bar } from "./command_bar-WHY-TVZq.js";
import { t as require_inline_autocomplete } from "./inline_autocomplete-DwwZBApt.js";
init_esm_resolver();
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
	module: () => __vitePreload(() => import("./language-client-Dyckz_Na.js"), __vite__mapDeps([0,1,2]), import.meta.url),
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
var languageProvider = AceLanguageClient.for(serverData, {
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
		languageProvider.executeCommand(signIn.command.command, "copilot", signIn.command.arguments, async (response$1) => {
			console.log(await response$1);
		});
		console.log(signIn);
	});
}, 2e3);
