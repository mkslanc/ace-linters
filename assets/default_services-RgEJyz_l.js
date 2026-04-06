import "./modulepreload-polyfill-BHCAmPhR.js";
import "./useragent-BMYEMUd9.js";
import "./dom-DRNmwCmL.js";
import "./range-BakcZ9jR.js";
import "./lang-Chfjzp5y.js";
import "./keys-CNbBglaM.js";
import "./event-Crda3qyq.js";
import "./config-7GJDZd_b.js";
import "./event_emitter-r-lZpQyf.js";
import "./textmate-CN2VrF7f.js";
import "./editor-ImsyhaOB.js";
import "./edit_session-DAgqly_m.js";
import "./tooltip-BuOUCQpw.js";
import "./tokenizer-B5s1nUwH.js";
import "./text-D8sm5DzM.js";
import "./token_iterator-BNxpI84f.js";
import "./hash_handler-DWXab_Mk.js";
import "./text-CIUeTHSc.js";
import "./virtual_renderer-CgL6zTGT.js";
import "./ace-Dxe3P65B.js";
import "./multi_select-Dohhryzh.js";
import "./fold_mode-D_StAfa6.js";
import "./error_marker-DpPZ5m3m.js";
import { i as init_esm_resolver, n as createEditorWithLSP, t as addFormatCommand } from "./utils-BloruIle.js";
import "./snippets-BNjR0AXO.js";
import "./autocomplete-Yq6Wywy-.js";
import { t as require_language_tools } from "./language_tools-B8HNeNpe.js";
import { t as require_ace_linters } from "./ace-linters-NEkPc2yi.js";
import { a as phpContent, c as luaContent, d as lessContent, f as cssContent, i as xmlSchema, l as tsxContent, n as pythonContent, o as yamlContent, p as htmlContent, r as xmlContent, s as yamlSchema, t as mysqlContent, u as scssContent } from "./mysql-example-OTpWl9wy.js";
import { n as typescriptContent1, t as typescriptContent } from "./typescript-example-BPagcZxQ.js";
import { n as jsonSchema, r as jsonSchema2, t as jsonContent } from "./json-example-CezQNYSs.js";
import { t as jsContent } from "./javascript-example-B39awIjT.js";
import { n as json5Schema, t as json5Content } from "./json5-example--pTUMHTg.js";
//#region packages/demo/docs-example/jsx-example.js
var import_ace_linters = require_ace_linters();
require_language_tools();
init_esm_resolver();
//#endregion
//#region packages/demo/webworker-lsp/demo.ts
var modes = [
	{
		name: "json",
		mode: "ace/mode/json",
		content: jsonContent,
		options: { schemaUri: "common-form.schema.json" }
	},
	{
		name: "json5",
		mode: "ace/mode/json5",
		content: json5Content,
		options: { schemaUri: "json5Schema" }
	},
	{
		name: "html",
		mode: "ace/mode/html",
		content: htmlContent
	},
	{
		name: "css",
		mode: "ace/mode/css",
		content: cssContent
	},
	{
		name: "less",
		mode: "ace/mode/less",
		content: lessContent
	},
	{
		name: "scss",
		mode: "ace/mode/scss",
		content: scssContent
	},
	{
		name: "typescript",
		mode: "ace/mode/typescript",
		content: typescriptContent,
		filePath: "someLibDir/index.ts"
	},
	{
		name: "python",
		mode: "ace/mode/python",
		content: pythonContent
	},
	{
		name: "typescript",
		mode: "ace/mode/typescript",
		content: typescriptContent1,
		filePath: "anotherFile.ts"
	},
	{
		name: "javascript",
		mode: "ace/mode/javascript",
		content: jsContent
	},
	{
		name: "tsx",
		mode: "ace/mode/tsx",
		content: tsxContent
	},
	{
		name: "jsx",
		mode: "ace/mode/javascript",
		content: `
var mode = <div> 
    Javascript + <b> JSX </b> 
</div>;

function test () {
    return <Component/>
}

class Component extends HTMLFrameElement {
    
}
`,
		options: { jsx: true }
	},
	{
		name: "lua",
		mode: "ace/mode/lua",
		content: luaContent
	},
	{
		name: "yaml",
		mode: "ace/mode/yaml",
		content: yamlContent,
		options: { schemaUri: "yamlSchema.json" }
	},
	{
		name: "xml",
		mode: "ace/mode/xml",
		content: xmlContent,
		options: { schemaUri: "xmlSchema.json" }
	},
	{
		name: "php",
		mode: "ace/mode/php",
		content: phpContent
	},
	{
		name: "mysql",
		mode: "ace/mode/mysql",
		content: mysqlContent
	},
	{
		name: "clang",
		mode: "ace/mode/c_cpp",
		content: `
#include <iostream>
using namespace std;
auto main() -> int{
std::cout << "Hello World!" << std::endl;
return 0;}
    `
	},
	{
		name: "zig",
		mode: "ace/mode/zig",
		content: `
const std = @import("std");

pub fn main() !void 
{
  const stdout = std.io.getStdOut().writer();
  var i: usize = 1;
  while (i <= 16) : (i += 1) 
    {
        if (i % 15 == 0) 
      {
        try stdout.writeAll("ZiggZagg\\\\n");
      } else 
        if (i % 3 == 0) 
      {
        try stdout.writeAll("Zigg\\\\n");
      } else 
        if (i % 5 == 0) 
      {
        try stdout.writeAll("Zagg\\\\n");
      }
        else 
      {
        try stdout.print("{d}\\\\n", .{i});
      }
    }
}
    `
	},
	{
		name: "dart",
		mode: "ace/mode/dart",
		content: `void main() { print('Hello, World!'); }`
	},
	{
		name: "golang",
		mode: "ace/mode/golang",
		content: `
package main
import "fmt"
func main(){fmt.Println("Hello, world")
}
    `
	}
];
var worker = new Worker(new URL(
	/* @vite-ignore */
	"" + new URL("webworker-CfIb8p5I.js", import.meta.url).href,
	"" + import.meta.url
), { type: "module" });
var languageProvider = import_ace_linters.LanguageProvider.create(worker, { functionality: { completion: {
	overwriteCompleters: true,
	lspCompleterOptions: { triggerCharacters: {
		add: ["\n", "\r\n"],
		remove: []
	} }
} } });
languageProvider.setGlobalOptions("json", { schemas: [{
	uri: "common-form.schema.json",
	schema: jsonSchema2
}] });
languageProvider.setGlobalOptions("typescript", {
	errorCodesToTreatAsWarning: ["2540"],
	extraLibs: {
		"node_modules/lib-declaration/lib-declaration.d.ts": {
			content: `export class ChainableOne {
    chainableTwo: ChainableTwo;
    setAlpha(value: string): this;
    setBeta(value: number): ChainableTwo;
}

export class ChainableTwo {
    setGamma(value: boolean): this;
    addAlpha(value: string): ChainableOne;
}`,
			version: 1
		},
		"node_modules/lib-declaration/package.json": {
			content: `{
    "name": "lib-declaration",
    "version": "1.3.3",
    "typings": "./lib-declaration.d.ts",
}
`,
			version: 1
		},
		"dir/file.ts": {
			content: "export var data = new ChainableOne();",
			version: 1
		}
	}
});
languageProvider.setGlobalOptions("javascript", { errorMessagesToTreatAsInfo: [/Identifier\sdirectly/] });
languageProvider.setGlobalOptions("html", { errorMessagesToTreatAsInfo: [/Special\scharacters\smust\sbe\sescaped/] });
languageProvider.setGlobalOptions("json5", {
	schemas: [{
		uri: "json5Schema",
		schema: json5Schema
	}],
	errorMessagesToTreatAsInfo: [/Incorrect\stype/]
});
languageProvider.setGlobalOptions("yaml", {
	schemas: [{
		uri: "yamlSchema.json",
		schema: yamlSchema
	}],
	errorMessagesToTreatAsInfo: [/Missing\sproperty/]
});
languageProvider.setGlobalOptions("xml", {
	schemas: [{
		uri: "xmlSchema.json",
		schema: xmlSchema
	}],
	errorMessagesToTreatAsWarning: [/Expecting\sone/]
});
languageProvider.setGlobalOptions("css", { errorMessagesToTreatAsInfo: [/Unknown\sat\srule/] });
languageProvider.setGlobalOptions("php", { errorMessagesToTreatAsInfo: [/unexpected\sT_FUNCTION/] });
languageProvider.setGlobalOptions("lua", { errorMessagesToTreatAsWarning: [/expected\snear/] });
languageProvider.configureServiceFeatures("json", {
	completion: true,
	completionResolve: true,
	diagnostics: false,
	format: true,
	hover: true
});
languageProvider.setGlobalOptions("pythonls", {
	configuration: { "line-length": 120 },
	errorCodesToTreatAsWarning: ["E501", "F401"]
});
var i = 0;
for (let mode of modes) {
	createEditorWithLSP(mode, i, languageProvider);
	i++;
}
languageProvider.setGlobalOptions("json", { schemas: [{
	uri: "colors.schema.json",
	schema: jsonSchema
}] }, true);
addFormatCommand(languageProvider);
//#endregion
