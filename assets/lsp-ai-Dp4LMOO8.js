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
import "./command_bar-D9DESsE0.js";
import { t as require_inline_autocomplete } from "./inline_autocomplete-BD6zzG2z.js";
//#region packages/demo/websockets-lsp-ai/client.ts
init_esm_resolver();
var import_ace_language_client = require_ace_language_client();
var import_autocomplete = require_autocomplete();
require_inline_autocomplete();
init_preload_helper();
var modes = [{
	name: "javascript",
	mode: "ace/mode/javascript",
	content: jsContent
}];
var defaultGenerationConfiguration = {
	"model": "model1",
	"parameters": {
		"max_tokens": 128,
		"max_context": 1024,
		"messages": [
			{
				"role": "system",
				"content": "Instructions:\n- You are an AI programming assistant.\n- Given a piece of code with the cursor location marked by \"<CURSOR>\", replace \"<CURSOR>\" with the correct code or comment.\n- First, think step-by-step.\n- Describe your plan for what to build in pseudocode, written out in great detail.\n- Then output the code replacing the \"<CURSOR>\".\n- Ensure that your completion fits within the language context of the provided code snippet.\n\nRules:\n- Only respond with code or comments.\n- Only replace \"<CURSOR>\"; do not include any previously written code.\n- Never include \"<CURSOR>\" in your response.\n- If the cursor is within a comment, complete the comment meaningfully.\n- Handle ambiguous cases by providing the most contextually appropriate completion.\n- Be consistent with your responses."
			},
			{
				"role": "user",
				"content": "def greet(name):\n    print(f\"Hello, {<CURSOR>}\")"
			},
			{
				"role": "assistant",
				"content": "name"
			},
			{
				"role": "user",
				"content": "function sum(a, b) {\n    return a + <CURSOR>;\n}"
			},
			{
				"role": "assistant",
				"content": "b"
			},
			{
				"role": "user",
				"content": "fn multiply(a: i32, b: i32) -> i32 {\n    a * <CURSOR>\n}"
			},
			{
				"role": "assistant",
				"content": "b"
			},
			{
				"role": "user",
				"content": "# <CURSOR>\ndef add(a, b):\n    return a + b"
			},
			{
				"role": "assistant",
				"content": "Adds two numbers"
			},
			{
				"role": "user",
				"content": "# This function checks if a number is even\n<CURSOR>"
			},
			{
				"role": "assistant",
				"content": "def is_even(n):\n    return n % 2 == 0"
			},
			{
				"role": "user",
				"content": "public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, <CURSOR>\");\n    }\n}"
			},
			{
				"role": "assistant",
				"content": "world"
			},
			{
				"role": "user",
				"content": "try:\n    # Trying to open a file\n    file = open(\"example.txt\", \"r\")\n    # <CURSOR>\nfinally:\n    file.close()"
			},
			{
				"role": "assistant",
				"content": "content = file.read()"
			},
			{
				"role": "user",
				"content": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a = 5, b = 10;\n    cout << \"Sum: \" << (a + <CURSOR>) << endl;\n    return 0;\n}"
			},
			{
				"role": "assistant",
				"content": "b"
			},
			{
				"role": "user",
				"content": "<!DOCTYPE html>\n<html>\n<head>\n    <title>My Page</title>\n</head>\n<body>\n    <h1>Welcome to My Page</h1>\n    <p>This is a sample page with a list of items:</p>\n    <ul>\n        <li>Item 1</li>\n        <li>Item 2</li>\n        <li><CURSOR></li>\n    </ul>\n</body>\n</html>"
			},
			{
				"role": "assistant",
				"content": "Item 3"
			},
			{
				"role": "user",
				"content": "{CODE}"
			}
		]
	}
};
var defaultServerConfiguration = {
	"memory": { "file_store": {} },
	"models": { "model1": {
		"type": "open_ai",
		"chat_endpoint": "https://api.openai.com/v1/chat/completions",
		"model": "gpt-3.5-turbo-0125",
		"auth_token_env_var_name": "OPENAI_API_KEY"
	} },
	"completion": { ...defaultGenerationConfiguration }
};
var serverData = {
	module: () => __vitePreload(() => import("./language-client-2qyFA8Lw.js").then((m) => /* @__PURE__ */ __toESM(m.default)), __vite__mapDeps([0,1]), import.meta.url),
	modes: "javascript",
	type: "socket",
	socket: new WebSocket("ws://localhost:3030/lsp-ai"),
	initializationOptions: defaultServerConfiguration
};
var languageProvider = import_ace_language_client.AceLanguageClient.for(serverData);
var editor = createEditorWithLSP(modes[0], 0, languageProvider);
editor.setOption("enableInlineAutocompletion", true);
editor.setOption("liveAutocompletionDelay", 500);
enableInnerAutocomplete(editor);
function enableInnerAutocomplete(editor) {
	let originalAutocompleteCommand = editor.commands.byName.startAutocomplete.exec;
	editor.commands.byName.startAutocomplete.exec = function(editor) {
		var autocomplete = import_autocomplete.Autocomplete.for(editor);
		autocomplete.getCompletionProvider()["ignoreCaption"] = true;
		autocomplete.inlineEnabled = true;
		autocomplete["ignoreCaption"] = true;
		originalAutocompleteCommand(...arguments);
	};
}
addFormatCommand(languageProvider);
//#endregion
