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
import "./autocomplete-CHTKiwQ7.js";
import "./language_tools-BNL-ks-K.js";
import "./message-types-M_uv5dSK.js";
import { t as jsonContent } from "./json-example-BD4vqWqc.js";
import { n as json5Schema, t as json5Content } from "./json5-example-1EQE8WqL.js";
import { t as AceLanguageClient } from "./ace-language-client-V9lRdLqp.js";
init_esm_resolver();
init_preload_helper();
var modes = [{
	name: "json",
	mode: "ace/mode/json",
	content: jsonContent,
	options: { jsonSchemaUri: "common-form.schema.json" }
}, {
	name: "json5",
	mode: "ace/mode/json5",
	content: json5Content,
	options: { jsonSchemaUri: json5Schema }
}];
var serverData = {
	module: () => __vitePreload(() => import("./language-client-Dyckz_Na.js"), __vite__mapDeps([0,1,2]), import.meta.url),
	modes: "json|json5",
	type: "socket",
	socket: new WebSocket("ws://127.0.0.1:3000/exampleServer")
};
var languageProvider = AceLanguageClient.for(serverData);
var i = 0;
for (let mode of modes) {
	createEditorWithLSP(mode, i, languageProvider);
	i++;
}
addFormatCommand(languageProvider);
