const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./language-client-CIrflWtH.js","./message-types-M_uv5dSK.js","./chunk-iA-Slpst.js"])))=>i.map(i=>d[i]);
import { a as init_esm_resolver, n as createEditorWithLSP, o as __vitePreload, s as init_preload_helper, t as addFormatCommand } from "./utils-cKgy90LS.js";
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
import { t as jsContent } from "./javascript-example-DSBlUtkm.js";
import { t as AceLanguageClient } from "./ace-language-client-D-sstb9V.js";
import "./command_bar-DijAsnfy.js";
import { t as require_inline_autocomplete } from "./inline_autocomplete-DX8rPxiz.js";
init_esm_resolver();
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
	module: () => __vitePreload(() => import("./language-client-CIrflWtH.js"), __vite__mapDeps([0,1,2]), import.meta.url),
	modes: "javascript",
	type: "socket",
	socket: new WebSocket("ws://localhost:3030/lsp-ai"),
	initializationOptions: defaultServerConfiguration
};
var languageProvider = AceLanguageClient.for(serverData);
var editor = createEditorWithLSP(modes[0], 0, languageProvider);
editor.setOption("enableInlineAutocompletion", true);
editor.setOption("liveAutocompletionDelay", 500);
enableInnerAutocomplete(editor);
function enableInnerAutocomplete(editor$1) {
	let originalAutocompleteCommand = editor$1.commands.byName.startAutocomplete.exec;
	editor$1.commands.byName.startAutocomplete.exec = function(editor$2) {
		var autocomplete = import_autocomplete.Autocomplete.for(editor$2);
		autocomplete.getCompletionProvider()["ignoreCaption"] = true;
		autocomplete.inlineEnabled = true;
		autocomplete["ignoreCaption"] = true;
		originalAutocompleteCommand(...arguments);
	};
}
addFormatCommand(languageProvider);
