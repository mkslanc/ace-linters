# Ace Linters (Ace Language Client)

Ace linters is a library that brings language-aware features to the Ace editor. It includes a number of language
services, each of which provides support for a specific language, such as JSON, HTML, CSS, and Typescript.

Ace linters works in two modes: **WebSockets** and **WebWorkers**.

## Features

With Ace linters, you can easily add the following language-aware features to your Ace editor:

- Error checking
- Code completion
- Type checking
- Code formatting
- Additional information about token on hover

## Supported languages

Ace linters supports the following languages by default with webworkers approach:

- JSON, JSON5 (with JsonService)
- HTML (with HtmlService)
- CSS, SCSS, LESS (with CssService)
- Typescript, Javascript, JSX, TSX (with TypescriptService)
- Lua (with LuaService)

For WebSockets you could connect any of your Language Server folowing LSP

## Installation

To install Ace linters, you can use the following command:

```bash
npm install ace-linters
```

## Usage with WebWorker (JSON-RPC)

To use Ace linters with WebWorker, you will first need to include it in your project and create an instance of the Ace
editor and an instance of LanguageProvider. 

*client.js*:

```javascript
import * as ace from "ace-code";
import {Mode as TypescriptMode} from "ace-code/src/mode/typescript";
import {registerStyles, LanguageProvider} from "ace-linters";
import {ScriptTarget, JsxEmit} from "ace-linters/type-converters/typescript-converters";

// Create a web worker
let worker = new Worker(new URL('./webworker.js', import.meta.url));

// Create an Ace editor
let editor = ace.edit("container", {
    mode: new TypescriptMode() // Set the mode of the editor to Typescript
});

// Create a language provider for web worker
let languageProvider = LanguageProvider.for(worker);

// Set global options for the Typescript service
languageProvider.setGlobalOptions("typescript", {
    compilerOptions: {
        allowJs: true,
        target: ScriptTarget.ESNext,
        jsx: JsxEmit.Preserve
    }
});

// Register the editor with the language provider
languageProvider.registerEditor(editor);

``` 

In WebWorkers mode, you need to register
services on the webworker side. Like this:

*webworker.js*

```javascript
import {ServiceManager} from "ace-linters/services/service-manager";

let manager = new ServiceManager(self);
manager.registerService("typescript", {
    module: () => import("ace-linters/services/typescript/typescript-service"),
    className: "TypescriptService",
    modes: "typescript|javascript|tsx|jsx",
});
```

[Example client](https://github.com/mkslanc/ace-linters/blob/main/packages/demo/webworker-json-rpc/demo.ts)

[Example web worker](https://github.com/mkslanc/ace-linters/blob/main/packages/demo/webworker-json-rpc/webworker.ts)

## Usage with WebSocket (JSON-RPC)

In WebSockets mode, you need to start a language server on any port and connect to it.

Here's an example client:

```javascript
import * as ace from "ace-code";
import {Mode as JSONMode} from "ace-code/src/mode/json"; //any mode you want
import {LanguageProvider} from "ace-linters";

// Create a web socket
const webSocket = new WebSocket("ws://localhost:3000/exampleServer"); // adress of your websocket server

// Create an Ace editor
let editor = ace.edit("container", {
    mode: new JSONMode() // Set the mode of the editor to JSON
});

// Create a language provider for web socket
let languageProvider = LanguageProvider.for(webSocket);

// Register the editor with the language provider
languageProvider.registerEditor(editor);
```

[Example client](https://github.com/mkslanc/ace-linters/blob/main/packages/demo/websockets-lsp/client.ts)

[Example server](https://github.com/mkslanc/ace-linters/tree/main/packages/demo/websockets-lsp/server)

## Usage with WebWorker (other format)

You can use Ace linters with pre-defined services by looking at the "Ace linters with WebWorker demo (with default services)" example on GitHub:
[Example](https://github.com/mkslanc/ace-linters/blob/main/packages/demo/webworker-lsp/)
## License

Ace linters is released under the [MIT License](https://opensource.org/licenses/MIT).