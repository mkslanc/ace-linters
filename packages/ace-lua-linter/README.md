# Ace Lua Linter

Ace Lua Linter is an extension for the Ace Linters suite, providing Language Server Protocol (LSP) support for lua. 
It integrates seamlessly with Ace Linters, enhancing your Ace editor with linting and analysis capabilities based on the LSP standard.

## Key Features

- **LSP Compatibility**: Implements LSP features supported by the lua language server.
- **Seamless Integration**: Works effortlessly with Ace Linters and the Ace editor.
- **Easy Setup**: Quick and straightforward integration into your existing environment.

## Installation

To install Ace Lua Linter, run the following commands:

```bash
npm install ace-linters
npm install ace-lua-linter
```

## Usage

1. Register the service on the web worker's side:

   ```javascript
   import { ServiceManager } from "ace-linters/build/service-manager";

   manager.registerService("ace-lua-linter", {
       module: () => import("ace-lua-linter/build/ace-lua-linter"),
       className: "AceLuaLinter",
       modes: "lua",
   });
   ```

2. Use in conjunction with the `ace-linters` main package [similar to predefined services example](https://github.com/mkslanc/ace-linters?tab=readme-ov-file#example-client-with-pre-defined-services)

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
        mode: "ace/mode/lua"
    });

    var services = [{
        name: "ace-lua-linter",
        className: "AceLuaLinter",
        modes: "lua",
        script: "build/ace-lua-linter.js",
        // url to your cdn provider
        cdnUrl: "https://www.unpkg.com/ace-lua-linter"
    }]

    let provider = LanguageProvider.fromCdn({
        services: services,
        serviceManagerCdn: "https://www.unpkg.com/ace-linters@latest/build/",
        //optional, if you want to use default linters
        includeDefaultLinters: true
    });

    provider.registerEditor(editor);
</script>
```

## Supported Features

This linter supports the following features:

- **format**: Provides code formatting.
- **diagnostics**: Reports errors and warnings.

## Powered by

- [lua_fmt](https://github.com/wasm-fmt/lua_fmt) A WASM Based Lua Formatter\
- [luaparse](https://github.com/fstirlitz/luaparse) A Lua parser written in JavaScript

## License

Ace linters is released under the [MIT License](https://opensource.org/licenses/MIT).

