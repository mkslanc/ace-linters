# Ace Linters (Ace Language Client)

Ace linters is lsp client for Ace editor. It comes with large number of preconfigured easy to use in browser servers.

If you're uncertain about integrating ace-linters, consult [our diagram on the GitHub Wiki](https://github.com/mkslanc/ace-linters/wiki/Usage-Scenarios-Overview) for a quick setup guide
tailored to your needs.

### Example client with pre-defined services:
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

## New features in 1.8.1
- add `manualSessionControl` provider option to disable automatic session registration. When enabled, you must manually handle session changes:
```javascript
// Create provider with manual session control
let languageProvider = LanguageProvider.create(worker, {
  manualSessionControl: true
});

// Register sessions manually
languageProvider.registerSession(editor.session, editor, {
  filePath: 'path/to/file.ts',
  joinWorkspaceURI: true
});

// Handle session changes manually
editor.on("changeSession", ({session}) => {
  languageProvider.registerSession(session, editor, session.lspConfig);
});
```
- add `setSessionLspConfig` method to set LSP configuration on Ace sessions:
```javascript
// Set LSP configuration on session
languageProvider.setSessionLspConfig(editor.session, {
    filePath: 'src/components/MyComponent.tsx',
    joinWorkspaceURI: true
});
```
- add `setDocumentOptions` method to replace deprecated `setSessionOptions`:
```javascript
// Configure document-specific options (replaces setSessionOptions)
languageProvider.setDocumentOptions(editor.session, {
    // service-specific options here
});
```

## New Features in 1.2.0
- add `setProviderOptions` method to `LanguageProvider` to set options for client.
- add experimental semantic tokens support (turned off by default). To turn on semantic tokens, set `semanticTokens` to
  `true` in `setProviderOptions` method or use it in `create` or `fromCdn` methods like that
```javascript
LanguageProvider.create(worker, {functionality: {semanticTokens: true}})
```

## New Features in 1.0.0

- `registerServer` method in `ServiceManager` enables management of both services and servers on the web worker's side.
  Just add new servers to your webworker like this:
  ```javascript
  manager.registerServer("astro", {
      module: () => import("ace-linters/build/language-client"),
      modes: "astro",
      type: "socket", // "socket|worker"
      socket: new WebSocket("ws://127.0.0.1:3030/astro"),
      initializationOptions: {
          typescript: {
              tsdk: "node_modules/typescript/lib"
          }
      }
  });
  ```
- Multiple servers management on main thread. Just register servers like this:
  ```javascript
  let servers = [
      {
          module: () => import("ace-linters/build/language-client"),
          modes: "astro",
          type: "socket",
          socket: new WebSocket("ws://127.0.0.1:3030/astro"),
      },
      {
          module: () => import("ace-linters/build/language-client"),
          modes: "svelte",
          type: "socket",
          socket: new WebSocket("ws://127.0.0.1:3030/svelte"),
      }
  ]
  let languageProvider = AceLanguageClient.for(servers);
  ```
- **Breaking change:** `AceLanguageClient.for` interface was changed

## Example using script tag from CDN
```html
<script src="https://www.unpkg.com/ace-builds@latest/src-noconflict/ace.js"></script>
<script src="https://www.unpkg.com/ace-builds@latest/src-noconflict/ext-language_tools.js"></script>
<script src="https://www.unpkg.com/ace-linters@latest/build/ace-linters.js"></script>
<div id="editor" style="height: 100px">some text</div>

<script>
    ace.require("ace/ext/language_tools"); //To allow autocompletion
    var editor = ace.edit("editor", {
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
      mode: "ace/mode/css"
    });

    var provider = LanguageProvider.fromCdn("https://www.unpkg.com/ace-linters@latest/build/");
    provider.registerEditor(editor);
</script>
```


Ace linters client currently supports two modes: **WebSockets** and **WebWorkers**.

## Usage with WebSocket (JSON-RPC)

In WebSockets mode, you need to start a language server on any port and connect to it.

Here's an example client:

```javascript
import * as ace from "ace-code";
import {Mode as JSONMode} from "ace-code/src/mode/json"; //any mode you want
import {AceLanguageClient} from "ace-linters/build/ace-language-client";

// Create a web socket
const serverData = {
    module: () => import("ace-linters/build/language-client"),
    modes: "json|json5",
    type: "socket",
    socket: new WebSocket("ws://127.0.0.1:3000/exampleServer"), // address of your websocket server
}
// Create an Ace editor
let editor = ace.edit("container", {
    mode: new JSONMode() // Set the mode of the editor to JSON
});

// Create a language provider for web socket
let languageProvider = AceLanguageClient.for(serverData);

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
const serverData = {
  module: () => import("ace-linters/build/language-client"),
  modes: "json",
  type: "webworker",
  worker: worker,
}

// Create an Ace editor
let editor = ace.edit("container", {
  mode: new TypescriptMode() // Set the mode of the editor to Typescript
});

// Create a language provider for web worker
let languageProvider = AceLanguageClient.for(serverData);

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
- Signature Help

[Full list of capabilities](https://github.com/mkslanc/ace-linters/wiki/Client-LSP-capabilities)

## Supported languages
Ace linters supports the following languages by default with webworkers approach:

- JSON, JSON5 *powered by* [vscode-json-languageservice](https://github.com/Microsoft/vscode-json-languageservice)
- HTML *powered by* [vscode-html-languageservice](https://github.com/Microsoft/vscode-html-languageservice)
- CSS, SCSS, LESS *powered by* [vscode-css-languageservice](https://github.com/Microsoft/vscode-css-languageservice)
- Typescript, Javascript, JSX, TSX *powered by* [Typescript](https://github.com/Microsoft/TypeScript)
- Lua *powered by* [luaparse](https://github.com/fstirlitz/luaparse)
- YAML *powered by* [Yaml Language Server](https://github.com/redhat-developer/yaml-language-server)
- XML *powered by* [XML-Tools](https://github.com/SAP/xml-tools)
- Javascript, JSX *powered by* [Eslint](https://github.com/eslint/eslint)
- Python *powered by* [Ruff](https://github.com/charliermarsh/ruff)

## Supported languages via extensions
- MySQL, FlinkSQL, SparkSQL, HiveSQL, TrinoSQL, PostgreSQL, Impala SQL, PL/SQL *with* [ace-sql-linter](https://www.npmjs.com/package/ace-sql-linter)

## Installation

To install Ace linters, you can use the following command:

```bash
npm install ace-linters
```

## License

Ace linters is released under the [MIT License](https://opensource.org/licenses/MIT).
