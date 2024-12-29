# Ace Zig Linter

Ace Zig Linter is an extension for the Ace Linters suite, providing Language Server Protocol (LSP) support for zig. 
It integrates seamlessly with Ace Linters, enhancing your Ace editor with linting and analysis capabilities based on the LSP standard.

## Key Features

- **LSP Compatibility**: Implements LSP features supported by the zig language server.
- **Seamless Integration**: Works effortlessly with Ace Linters and the Ace editor.
- **Easy Setup**: Quick and straightforward integration into your existing environment.

## Installation

To install Ace Zig Linter, run the following commands:

```bash
npm install ace-linters
npm install ace-zig-linter
```

## Usage

1. Register the service on the web worker's side:

   ```javascript
   import { ServiceManager } from "ace-linters/build/service-manager";

   manager.registerService("ace-zig-linter", {
       module: () => import("ace-zig-linter/build/ace-zig-linter"),
       className: "AceZigLinter",
       modes: "zig",
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
        mode: "ace/mode/zig"
    });

    var services = [{
        name: "ace-zig-linter",
        className: "AceZigLinter",
        modes: "zig",
        script: "build/ace-zig-linter.js",
        // url to your cdn provider
        cdnUrl: "https://www.unpkg.com/ace-zig-linter"
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

## Powered by

- [zig-fmt](https://github.com/wasm-fmt/zig_fmt/pkgs/npm/zig_fmt) A wasm based zig formatter

## License

Ace linters is released under the [MIT License](https://opensource.org/licenses/MIT).

