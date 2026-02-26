# Ace SpellCheck

Ace SpellCheck is an extension for the Ace Linters suite, providing spell-check diagnostics for text. It integrates
seamlessly with Ace Linters, enhancing your Ace editor with linting capabilities powered by [CSpell](https://cspell.org/) in the browser.

## Key Features

- **Spell-check diagnostics**: Reports typos found by `cspell-lib`.
- **Document-scoped dictionary loading**: Loads only dictionaries relevant to the current document (`languageId` + matching overrides), not the full pack.
- **Automatic dictionary asset resolution**:
  - CDN mode (`LanguageProvider.fromCdn`): defaults to `${service.cdnUrl}/dicts`.
  - Vite/Webpack worker mode: use `ace-spell-check/build/esm-dicts-resolver` to auto-register dictionary URLs.
- **Custom dictionary support**: Add your own dictionary definitions and provide package asset URLs.

## Installation

To install Ace SpellCheck, run the following commands:

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
For the full list of supported fields, see the CSpell configuration reference:
https://cspell.org/docs/Configuration/properties

```javascript
provider.setGlobalOptions("ace-spell-check", {
    spellCheckOptions: {
        language: "en-US",
        words: ["MyCustomWord"]
    }
});
```

Runtime behavior:
- `spellCheckOptions` are merged with bundled default CSpell settings.
- Validation runs with `noConfigSearch: true` (no project config discovery at runtime).
- By default, only baseline global dictionaries are kept, and language/override dictionaries are added per current document.
- If you set `spellCheckOptions.dictionaries`, those are preserved globally and merged with per-document dictionaries.

Available options:
- `spellCheckOptions`: CSpell user settings.
- `enableAllDefaultDictionaries`: if `spellCheckOptions.dictionaries` is not set, include all bundled default dictionaries globally.
- `dictBaseUrl`: optional override for dictionary package JSON base URL.
- `dictAssetUrls`: optional map of package name -> asset URL (useful for custom dictionaries or explicit control).

Examples:

```javascript
// Force full bundled dictionary behavior (larger lazy-load footprint).
provider.setGlobalOptions("ace-spell-check", {
    enableAllDefaultDictionaries: true
});
```

```javascript
// Explicit dictionary package URL mapping.
provider.setGlobalOptions("ace-spell-check", {
    dictAssetUrls: {
        "@cspell/dict-java": "/assets/dicts/cspell-dict-java.json"
    }
});
```

```javascript
// Custom/user dictionary package + definition.
provider.setGlobalOptions("ace-spell-check", {
    dictAssetUrls: {
        "@my/dict-custom": "/assets/dicts/my-dict-custom.json"
    },
    spellCheckOptions: {
        dictionaries: ["user-custom"],
        dictionaryDefinitions: [
            {
                name: "user-custom",
                path: "/__cspell_vfs/@my/dict-custom/dict/custom.txt"
            }
        ],
        languageSettings: [
            {
                languageId: "javascript,typescript",
                dictionaries: ["typescript", "user-custom"]
            }
        ]
    }
});
```

## Vite/Webpack Worker Setup

Inside your worker entry, import resolver once before registering `AceSpellCheck`:

```javascript
import "ace-spell-check/build/esm-dicts-resolver";
```

This pre-registers URLs for bundled dictionary assets. In this setup, `dictBaseUrl` is usually not needed for default dictionaries.

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

In CDN mode, default dictionary asset URL is inferred automatically as `${service.cdnUrl}/dicts`.
Set `dictBaseUrl` only if your dictionary assets are hosted at a different location.

## Supported Features

This linter supports the following features:

- **diagnostics**: Reports errors and warnings.
- **code actions**: Provides typo replacement quick fixes.

## License

Ace SpellCheck is released under the [MIT License](https://opensource.org/licenses/MIT).
