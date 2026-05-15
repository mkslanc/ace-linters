# [Linter Name]

[Linter Name] is an extension for the Ace Linters suite, providing Language Server Protocol (LSP) support for [mode-name]. It integrates seamlessly with Ace Linters, enhancing your Ace editor with linting and analysis capabilities based on the LSP standard.

## Key Features

- **LSP Compatibility**: Implements LSP features supported by the [mode-name] language server.
- **Seamless Integration**: Works effortlessly with Ace Linters and the Ace editor.
- **Easy Setup**: Quick and straightforward integration into your existing environment.

## Installation

To install [Linter Name], run the following commands:

```bash
npm install ace-linters
npm install [linter-name]
```

## Usage

1. Register the service on the web worker's side:

   ```javascript
   import { ServiceManager } from "ace-linters/build/service-manager";
   
   const manager = new ServiceManager(self);

   manager.registerService("[linter-name]", {
       module: () => import("[linter-name]/build/[linter-name]"),
       className: "[LinterClassName]",
       modes: "[mode-name]",
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
        mode: "ace/mode/[mode-name]"
    });

    var services = [{
        name: "[linter-name]",
        className: "[LinterClassName]",
        modes: "[mode-name]",
        script: "build/[linter-name].js",
        // url to your cdn provider
        cdnUrl: "https://www.unpkg.com/[linter-name]"
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

## Supported Versions

- [Language/framework] version X.X and above.

## License

[Linter Name] is released under the [MIT License](https://opensource.org/licenses/MIT).

