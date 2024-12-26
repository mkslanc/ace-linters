# Ace Python Ruff Linter

Ace Python Ruff Linter is a powerful extension for the Ace Linters suite, designed to provide comprehensive Language Server Protocol (LSP) support for Python code using the [Ruff](https://github.com/astral-sh/ruff) linter. This extension integrates seamlessly with Ace Linters, enhancing your Ace editor with fast and efficient Python linting capabilities.

## Key Features

- **Blazing Fast Linting**: Powered by Ruff, a highly optimized Python linter and formatter.
- **Seamless Integration with Ace Linters**: Works effortlessly within the Ace Linters suite.
- **Easy Setup**: Quick and straightforward integration into your existing Ace editor setup.
- **Modern Python Support**: Compatible with the latest Python syntax and best practices.

## Installation

To install Ace Python Ruff Linter, run the following command:

```bash
npm install ace-linters
npm install ace-python-ruff-linter
```

## Usage

1. Register the service on the web worker's side:

   ```javascript
   import { ServiceManager } from "ace-linters/build/service-manager";

   manager.registerService("python", {
       module: () => import("ace-python-ruff-linter/build/python-service"),
       className: "PythonService",
       modes: "python",
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
      mode: "ace/mode/python"
    });

    var services = [{
       name: "python-service",
       className: "PythonService",
       modes: "python",
       script: "build/python-service.js",
       // url to your cdn provider
       cdnUrl: "https://www.unpkg.com/ace-python-ruff-linter"
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

- **Syntax Checking**: Detects syntax errors in Python code.
- **Style Enforcement**: Ensures code adheres to PEP 8 standards.

## Supported Python Versions

- Python 3.6+

## License

Ace linters is released under the [MIT License](https://opensource.org/licenses/MIT).

