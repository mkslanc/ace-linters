import "ace-code/esm-resolver";
import {AceLanguageClient} from "ace-linters/build/ace-language-client";
import {addFormatCommand, createEditorWithLSP} from "../utils";
import {jsContent} from "../docs-example/javascript-example";
import {Ace} from "ace-code";
import {Autocomplete} from "ace-code/src/autocomplete";
import "ace-code/src/ext/inline_autocomplete";

let modes = [
    {name: "javascript", mode: "ace/mode/javascript", content: jsContent},
]

const defaultGenerationConfiguration = {
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
}
// you will need OPENAI_API_KEY in env or use "auth_token" instead of "auth_token_env_var_name"
const defaultServerConfiguration =
    {
        "memory": {
            "file_store": {}
        },
        "models": {
            "model1": {
                "type": "open_ai",
                "chat_endpoint": "https://api.openai.com/v1/chat/completions",
                "model": "gpt-3.5-turbo-0125",
                "auth_token_env_var_name": "OPENAI_API_KEY"
            }
        },
        "completion": {
            ...defaultGenerationConfiguration
        }
    }
const serverData: LanguageClientConfig = {
    module: () => import("ace-linters/build/language-client"),
    modes: "javascript",
    type: "socket",
    socket: new WebSocket("ws://localhost:3030/lsp-ai"),
    initializationOptions: defaultServerConfiguration
}


let languageProvider = AceLanguageClient.for(serverData);

let editor = createEditorWithLSP(modes[0], 0, languageProvider);
//@ts-expect-error this should be added to ace declaration
editor.setOption("enableInlineAutocompletion", true);
editor.setOption("liveAutocompletionDelay", 500);

enableInnerAutocomplete(editor);

function enableInnerAutocomplete(editor: Ace.Editor) {
    let originalAutocompleteCommand = editor.commands.byName.startAutocomplete.exec;
    editor.commands.byName.startAutocomplete.exec = function (editor) {
        var autocomplete = Autocomplete.for(editor);
        autocomplete.getCompletionProvider().ignoreCaption = true;
        autocomplete.inlineEnabled = true;
        autocomplete.ignoreCaption = true;
        // @ts-ignore
        originalAutocompleteCommand(...arguments);
    }
}

addFormatCommand(languageProvider);
