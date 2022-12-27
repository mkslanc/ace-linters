# Ace Linters

Ace linters is a library that brings language-aware features to the Ace editor. It includes a number of language services, each of which provides support for a specific language, such as JSON, HTML, CSS, and Typescript.

## Features

With Ace linters, you can easily add the following language-aware features to your Ace editor:
- Error checking
- Code completion
- Type checking
- Code formatting
- Additional information about token on hover

## Supported languages

Ace linters supports the following languages:
- JSON, JSON5 (with JsonService)
- HTML (with HtmlService)
- CSS, SCSS, LESS (with CssService)
- Typescript, Javascript, JSX, TSX (with TypescriptService)

## Installation

To install Ace linters, you can use the following command:

```bash
npm install ace-linters
```

## Usage

To use Ace linters, you will first need to include it in your project and create an instance of the Ace editor and an instance of LanguageProvider. Then, LanguageProvider will use the appropriate language service based on the mode being used:
```javascript
import * as ace from "ace-code";
import {Mode as TypescriptMode} from "ace-code/src/mode/typescript";
import {registerStyles, LanguageProvider, setLanguageGlobalOptions, AceLinters} from "ace-linters";
import { ScriptTarget, JsxEmit } from "ace-linters/type-converters/typescript-converters";

//provides better styles for hover tooltip
registerStyles();
// set global options for Typescript Service, if haven't called, 
// would use default instead
setLanguageGlobalOptions("typescript", {
    compilerOptions: {
        allowJs: true,
        target: ScriptTarget.ESNext,
        jsx: JsxEmit.Preserve
    }
});

let editor = ace.edit("container");
editor.session.setMode(new TypescriptMode());
// Create Language Provider (you could pass options as second parameter) 
let provider = new LanguageProvider(editor, {});
// init is async, you could wait until it's finished if you need
provider.init();
``` 

Once you have created a language provider, and called `init()` you can use the Ace editor as you normally would, and 
the 
language-aware features provided by the service will be available.

## License
Ace linters is released under the [MIT License](https://opensource.org/licenses/MIT).
