# Ace Linters

Ace linters is a library that brings language-aware features to the Ace editor. It includes a number of language services, each of which provides support for a specific language, such as JSON, HTML, CSS, and Typescript.

With Ace linters, you can easily add language-aware features to your Ace editor, such as:
- Error checking
- Code completion
- Type checking
- Code formating
- Additional information about token on hover

## Supported languages

- JSON, JSON5 (with JsonService)
- HTML (with HtmlService)
- CSS, SCSS, LESS (with CssService)
- Typescript, Javascript, JSX, TSX (with TypescriptService)

## Usage

To use Ace linters, you will first need to include it in your project and create an instance of the Ace editor and an instance of `LanguageProvider`. Then, `LanguageProvider` will use language service based on used mode:

```javascript
import * as ace from "ace-code";
import {Mode as TypescriptMode} from "ace-code/src/mode/typescript";
import {LanguageProvider} from "@ace-linters/core/language-provider";

let editor = ace.edit("container");
editor.session.setMode(new TypescriptMode());
// Create LanguageProvider, you could pass options to second parameter 
let provider = new LanguageProvider(editor, {});
``` 

Once you have created a language provider, you can use the Ace editor as you normally would, and the language-aware features provided by the service will be available.

## License
Ace linters is released under the [MIT License](https://opensource.org/licenses/MIT).
