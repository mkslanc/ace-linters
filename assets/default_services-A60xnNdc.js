import { a as init_esm_resolver, n as createEditorWithLSP, r as LanguageProvider, t as addFormatCommand } from "./utils-DupifF8s.js";
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
import { n as typescriptContent1, t as typescriptContent } from "./typescript-example-Dj0c1wPM.js";
import { n as jsonSchema, r as jsonSchema2, t as jsonContent } from "./json-example-BD4vqWqc.js";
import { t as jsContent } from "./javascript-example-CusLgu-w.js";
import { n as json5Schema, t as json5Content } from "./json5-example-1EQE8WqL.js";
require_language_tools();
init_esm_resolver();
var htmlContent = `
    <!DOCTYPE html>
<html>
    <head>

    <style type="text/css">
        .text-layer {
            font-family: Monaco, "Courier New", monospace;
            font-size: 12px;
            cursor: text;
        }
    </style>

    </head>
    <body>
        <h1 style="color:red">Juhu Kinners</h1>
    </body>
</html>
    `;
var cssContent = `.text-layer {
    font: 12px Monaco, "Courier New", monospace;
    font-size: 3vmin;
    cursor: text;
}

.blinker {
    animation: blink 1s linear infinite alternate;
}

@keyframes blink {
    0%, 40% {
        opacity: 0; /*
        */
        opacity: 1
    }

    40.5%, 100% {
        opacity: 1
    }
}

@document url(http://c9.io/), url-prefix(http://ace.c9.io/build/),
domain(c9.io), regexp("https:.*") /**/
{
    /**/
    img[title]:before
    {
        content: attr(title) "\AImage \
            retrieved from"
        attr(src); /*
            */
        white-space: pre;
        display: block;
        background: url(asdasd); "err
    }
}

@viewport {
    min-zoom: 1;
max-zoom: 200%;
user-zoom: fixed;
}
`;
var lessContent = `/* styles.less */

@base: #f938ab;

.box-shadow(@style, @c) when (iscolor(@c)) {
    box-shadow:         @style @c;
    -webkit-box-shadow: @style @c;
    -moz-box-shadow:    @style @c;
}
.box-shadow(@style, @alpha: 50%) when (isnumber(@alpha)) {
    .box-shadow(@style, rgba(0, 0, 0, @alpha));
}

// Box styles
.box { 
    color: saturate(@base, 5%);
    border-color: lighten(@base, 30%);
    
    div { .box-shadow(0 0 5px, 30%) }
  
    a {
        color: @base;
        
        &:hover {
            color: lighten(@base, 50%);
        }
    }
}

`;
var scssContent = `/* style.scss */

#navbar {
    $navbar-width: 800px;
    $items: 5;
    $navbar-color: #ce4dd6;

    width: $navbar-width;
    border-bottom: 2px solid $navbar-color;

    li {
        float: left;
        width: $navbar-width/$items - 10px;

          background-color: lighten($navbar-color, 20%);
        &:hover {
            background-color: lighten($navbar-color, 10%);
        }
    }
}
`;
var tsxContent = `
var mode: HTMLElement = <div> 
    Typescript + <b> JSX </b> 
</div>;

function test () {
    return <Component/>
}

class Component extends HTMLFrameElement {
    
}
`;
var jsxContent = `
var mode = <div> 
    Javascript + <b> JSX </b> 
</div>;

function test () {
    return <Component/>
}

class Component extends HTMLFrameElement {
    
}
`;
var luaContent = `--[[--
num_args takes in 5.1 byte code and extracts the number of arguments
from its function header.
--]]--

function int(t)
\treturn t:byte(1)+t:byte(2)*0x100+t:byte(3)*0x10000+t:byte(4)*0x1000000
end

function num_args(func)
\tlocal dump = string.dump(func)
\tlocal offset, cursor = int(dump:sub(13)), offset + 26
\t--Get the params and var flag (whether there's a ... in the param)
\treturn dump:sub(cursor):byte(), dump:sub(cursor+1):byte()
end

-- Usage:
num_args(function(a,b,c,d, ...) end) -- return 4, 7

-- Python styled string format operator
local gm = debug.getmetatable("")

gm.__mod=function(self, other)
    if type(other) ~= "table" then other = {other} end
    for i,v in ipairs(other) do other[i] = tostring(v) end
    return self:format(unpack(other))
end

print([===[
    blah blah %s, (%d %d)
]===]%{"blah", num_args(int)})

--[=[--
table.maxn is deprecated, use # instead.
--]=]--
print(table.maxn{1,2,[4]=4,[8]=8) -- outputs 8 instead of 2

print(5 --[[ blah ]])
`;
var yamlContent = `
---
product_name: Super Mobile Phone
manufacturer: Somewhere
price: 1
color: 
camera:
  resolution: 12MP
  zoom: 3x optical
    features: [Dual SIM, Night mode, Deep Fusion]
display:
  size: 6.1 inches
  resolution: 2778 x 1284
  technology: OLED
battery:
  capacity: 2815mAh
  fast_charge: Yes
operating_system: Perpertum 14
`;
var yamlSchema = `{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "product_name": {
      "type": "string",
      "description": "The name of the product"
    },
    "manufacturer": {
      "type": "string",
      "description": "The company that manufactures the product"
    },
    "price": {
      "type": "number",
      "description": "The price of the product in USD"
    },
    "color": {
      "type": "string",
      "description": "The color of the product",
      "enum": [
        "Gold",
        "Silver",
        "Space Gray",
        "Pacific Blue",
        "Graphite"
      ]
    },
    "storage": {
      "type": "string",
      "description": "The storage capacity of the product",
      "enum": [
        "64GB",
        "128GB",
        "256GB",
        "512GB",
        "1TB"
      ]
    },
    "camera": {
      "type": "object",
      "properties": {
        "resolution": {
          "type": "string",
          "description": "The camera resolution in megapixels"
        },
        "zoom": {
          "type": "string",
          "description": "The camera zoom capabilities"
        },
        "features": {
          "type": "array",
          "items": {
            "type": "string"
          },
          "description": "Additional camera features"
        }
      },
      "required": [
        "resolution",
        "zoom",
        "features"
      ],
      "description": "Details about the camera"
    },
    "display": {
      "type": "object",
      "properties": {
        "size": {
          "type": "string",
          "description": "The size of the display in inches"
        },
        "resolution": {
          "type": "string",
          "description": "The resolution of the display"
        },
        "technology": {
          "type": "string",
          "description": "The display technology used",
          "enum": [
            "OLED",
            "LCD",
            "AMOLED"
          ]
        }
      },
      "required": [
        "size",
        "resolution",
        "technology"
      ],
      "description": "Details about the display"
    },
    "battery": {
      "type": "object",
      "properties": {
        "capacity": {
          "type": "string",
          "description": "The battery capacity in mAh"
        },
        "fast_charge": {
          "type": "string",
          "description": "Whether the device supports fast charging or not",
          "enum": [
            "Yes",
            "No"
          ]
        }
      },
      "required": [
        "capacity",
        "fast_charge"
      ],
      "description": "Details about the battery"
    },
    "operating_system": {
      "type": "string",
      "description": "The operating system of the device",
      "enum": [
        "iOS",
        "Android",
        "Windows"
      ]
    }
  },
  "required": [
    "product_name",
    "manufacturer",
    "price",
    "color",
    "storage",
    "camera",
    "display",
    "battery",
    "operating_system"
  ],
  "description": "A product listing object"
}
`;
var phpContent = `
<?php
e
function nfact($n) {
    if ($n == 0) {
        return 1;
    }
    else {
        return $n * nfact($n - 1);
    }
}

echo "\\n\\nPlease enter a whole number ... ";
$num = trim(fgets(STDIN));

// ===== PROCESS - Determing the factorial of the input number =====
$output = "\\n\\nFactorial " . $num . " = " . nfact($num) . "\\n\\n";
echo $output;

?>
    `;
var xmlContent = `
<people>
   <person eyeColor="violet">
     <name>Daenerys Targaryen</name>
   </person>
</people>
`;
var xmlSchema = `{
  "name": "people",
  "required": true,
  "cardinality": "single",
  "attributes": {},
  "elements": {
    "person": {
      "name": "person",
      "required": false,
      "cardinality": "many",
      "attributes": {
        "eyeColor": {
          "key": "eyeColor",
          "required": false,
          "value": ["grey", "blue", "green", "red"]
        }
      },
      "elements": {
        "name": {
          "cardinality": "single",
          "required": true,
          "name": "name",
          "attributes": {},
          "elements": {}
        }
      }
    }
  }
}
`;
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
		content: `
import os

# Define a function that takes an integer n and returns the nth number in the Fibonacci
# sequence.
def fibonacci(n):
    """Compute the nth number in the Fibonacci sequence."""
    x = 1
    if n == 0:
        return 0
    elif n == 1:
        return 1
    else:
        return fibonacci(n - 1) + fibonacci(n - 2)


# Use a for loop to generate and print the first 10 numbers in the Fibonacci sequence.
for i in range(10):
    print(fibonacci(i))

# Output:
# 0
# 1
# 1
# 2
# 3
# 5
# 8
# 13
# 21
# 34

    `
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
		content: jsxContent,
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
		content: `selec id,name from user1;`
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
	"" + new URL("webworker-Dp8mZl3h.js", import.meta.url).href,
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
