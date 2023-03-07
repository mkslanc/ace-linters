# Ace Linters (Ace Language Client)

Ace linters is lsp client for Ace editor. It comes with large number of preconfigured easy to use in browser servers.

Example client with pre-defined services:
```javascript
import * as ace from "ace-code";
import {Mode as TypescriptMode} from "ace-code/src/mode/typescript";
import {LanguageProvider} from "ace-linters/build/ace-linters";

// Create a web worker
let worker = new Worker(new URL('./webworker.js', import.meta.url));

// Create an Ace editor
let editor = ace.edit("container", {
    mode: new TypescriptMode() // Set the mode of the editor to Typescript
});

// Create a language provider for web worker (
let languageProvider = LanguageProvider.create(worker);

// Register the editor with the language provider
languageProvider.registerEditor(editor);

``` 

[Example webworker.js with all services](https://github.com/mkslanc/ace-linters/blob/main/packages/demo/webworker-lsp/webworker.ts)


Ace linters works in two modes: **WebSockets** and **WebWorkers**.

## Usage with WebSocket (JSON-RPC)

In WebSockets mode, you need to start a language server on any port and connect to it.

Here's an example client:

```javascript
import * as ace from "ace-code";
import {Mode as JSONMode} from "ace-code/src/mode/json"; //any mode you want
import {AceLanguageClient} from "ace-linters/build/ace-language-client";

// Create a web socket
const webSocket = new WebSocket("ws://localhost:3000/exampleServer"); // address of your websocket server

// Create an Ace editor
let editor = ace.edit("container", {
    mode: new JSONMode() // Set the mode of the editor to JSON
});

// Create a language provider for web socket
let languageProvider = AceLanguageClient.for(webSocket);

// Register the editor with the language provider
languageProvider.registerEditor(editor);
```

[Full Example client](https://github.com/mkslanc/ace-linters/blob/main/packages/demo/websockets-lsp/client.ts)

[Full Example server](https://github.com/mkslanc/ace-linters/tree/main/packages/demo/websockets-lsp/server)

## Usage with WebWorker (JSON-RPC)

*client.js*:

```javascript
import * as ace from "ace-code";
import {Mode as TypescriptMode} from "ace-code/src/mode/typescript";
import {AceLanguageClient} from "ace-linters/build/ace-language-client";

// Create a web worker
let worker = new Worker(new URL('./webworker.js', import.meta.url));

// Create an Ace editor
let editor = ace.edit("container", {
    mode: new TypescriptMode() // Set the mode of the editor to Typescript
});

// Create a language provider for web worker (
let languageProvider = AceLanguageClient.for(worker);

// Register the editor with the language provider
languageProvider.registerEditor(editor);

```

[Example client](https://github.com/mkslanc/ace-linters/blob/main/packages/demo/webworker-json-rpc/demo.ts)

**[!]** You need to describe server similar to that example:
[Example server](https://github.com/mkslanc/ace-linters/blob/main/packages/demo/webworker-json-rpc/webworker.ts)

## Supported LSP capabilities:
 - Text Document Synchronization (with incremental changes)
 - Hover
 - Diagnostics
 - Formatting
 - Completions

[Full list of capabilities](https://github.com/mkslanc/ace-linters/blob/main/Capabilities.md)

## Supported languages
[List of implemented language services](https://github.com/mkslanc/ace-linters/blob/main/SupportedLanguages.md)

## Installation

To install Ace linters, you can use the following command:

```bash
npm install ace-linters
```

## License

Ace linters is released under the [MIT License](https://opensource.org/licenses/MIT).
