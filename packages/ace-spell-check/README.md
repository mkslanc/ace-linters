# Ace SpellCheck

Ace SpellCheck is an extension for the Ace Linters suite, providing spell-check diagnostics for text. It integrates 
seamlessly with Ace Linters, enhancing your Ace editor with linting capabilities powered by [cspell-lib](https://github.com/streetsidesoftware/cspell) in the browser.

## Key Features

- **Spell-check diagnostics**: Reports typos found by `cspell-lib`.
- **Seamless Integration**: Works effortlessly with Ace Linters and the Ace editor.
- **Easy Setup**: Quick and straightforward integration into your existing environment.

## Installation

To install AceSpellCheck, run the following commands:

```bash
npm install ace-linters
npm install ace-spell-check
```

## Usage

1. Register the service on the web worker's side:

   ```javascript
   import { ServiceManager } from "ace-linters/build/service-manager";
   
   const manager = new ServiceManager(self);
   
   manager.registerService("ace-spell-check", {
       module: () => import("ace-spell-check/build/ace-spell-check"),
       className: "AceSpellCheck",
       modes: "*",
   });
   ```

2. Use in conjunction with the `ace-linters` main package [similar to predefined services example](https://github.com/mkslanc/ace-linters?tab=readme-ov-file#example-client-with-pre-defined-services)

## Configuration

You can pass CSpell settings through `spellCheckOptions` in service options.

```javascript
provider.setGlobalOptions("ace-spell-check", {
    spellCheckOptions: {
        language: "en-US",
        words: ["MyCustomWord"]
    }
});
```

Notes:
- `spellCheckOptions` are merged with bundled default settings.
- Spell-check runs with `noConfigSearch: true`, so project config discovery is disabled at runtime.

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
        mode: "ace/mode/text"
    });

    var services = [{
        name: "ace-spell-check",
        className: "AceSpellCheck",
        modes: "text",
        script: "build/ace-spell-check.js",
        // url to your cdn provider
        cdnUrl: "https://www.unpkg.com/ace-spell-check"
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

- **diagnostics**: Reports errors and warnings.

## License

Ace SpellCheck is released under the [MIT License](https://opensource.org/licenses/MIT).
