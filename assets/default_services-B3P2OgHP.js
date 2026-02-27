import { a as init_esm_resolver, n as createEditorWithLSP, r as LanguageProvider, t as addFormatCommand } from "./utils-cKgy90LS.js";
import "./useragent-BODERP_7.js";
import "./dom-BBjJ92-n.js";
import "./range-BUVqNbwc.js";
import "./lang-DcNOSqFo.js";
import "./keys-B8CLTATX.js";
import "./event-BcX-N72I.js";
import "./config-DPm1ug3B.js";
import "./event_emitter-BGfSYA24.js";
import "./textmate-zFNmb5zU.js";
import "./editor-BiOsjB7l.js";
import "./edit_session-CDHRvoey.js";
import "./tooltip-DAauyLxM.js";
import "./tokenizer-C2b-GJMk.js";
import "./text-B9A1mx6l.js";
import "./token_iterator-CbfYmntj.js";
import "./hash_handler-G_6vQiwI.js";
import "./text-DOzSnOss.js";
import "./virtual_renderer-xL5PfPPr.js";
import "./ace-BNoj2zEj.js";
import "./multi_select-B30HHNMb.js";
import "./fold_mode-D1xG2KFM.js";
import "./error_marker-BBMov5iD.js";
import "./snippets-Ct-Wi_HP.js";
import "./autocomplete-CHTKiwQ7.js";
import { t as require_language_tools } from "./language_tools-BNL-ks-K.js";
import "./message-types-M_uv5dSK.js";
import "./src-D7AYzDf6.js";
import { a as phpContent, c as luaContent, d as lessContent, f as cssContent, i as xmlSchema, l as tsxContent, n as pythonContent, o as yamlContent, p as htmlContent, r as xmlContent, s as yamlSchema, t as mysqlContent, u as scssContent } from "./mysql-example-Ofom_MuX.js";
import { n as typescriptContent1, t as typescriptContent } from "./typescript-example-BPHpOvDB.js";
import { n as jsonSchema, r as jsonSchema2, t as jsonContent } from "./json-example-DEkq114O.js";
import { t as jsContent } from "./javascript-example-DSBlUtkm.js";
import { n as json5Schema, t as json5Content } from "./json5-example-C88wPCQx.js";
require_language_tools();
init_esm_resolver();
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
	"" + new URL("webworker-DnRGAxRn.js", import.meta.url).href,
	"" + import.meta.url
), { type: "module" });
var languageProvider = LanguageProvider.create(worker, { functionality: { completion: {
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
