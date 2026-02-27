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
var pythonContent = `
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

    `;
var mysqlContent = `selec id,name from user1;`;
export { phpContent as a, luaContent as c, lessContent as d, cssContent as f, xmlSchema as i, tsxContent as l, pythonContent as n, yamlContent as o, htmlContent as p, xmlContent as r, yamlSchema as s, mysqlContent as t, scssContent as u };
