"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[2843],{

/***/ 99301:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var lang = __webpack_require__(20124);
var TextHighlightRules = (__webpack_require__(28053)/* .TextHighlightRules */ .K);


/* Exports are for Stylus and Less highlighters */
var supportType = exports.supportType = "align-content|align-items|align-self|all|animation|animation-delay|animation-direction|animation-duration|animation-fill-mode|animation-iteration-count|animation-name|animation-play-state|animation-timing-function|backface-visibility|background|background-attachment|background-blend-mode|background-clip|background-color|background-image|background-origin|background-position|background-repeat|background-size|border|border-bottom|border-bottom-color|border-bottom-left-radius|border-bottom-right-radius|border-bottom-style|border-bottom-width|border-collapse|border-color|border-image|border-image-outset|border-image-repeat|border-image-slice|border-image-source|border-image-width|border-left|border-left-color|border-left-style|border-left-width|border-radius|border-right|border-right-color|border-right-style|border-right-width|border-spacing|border-style|border-top|border-top-color|border-top-left-radius|border-top-right-radius|border-top-style|border-top-width|border-width|bottom|box-shadow|box-sizing|caption-side|clear|clip|color|column-count|column-fill|column-gap|column-rule|column-rule-color|column-rule-style|column-rule-width|column-span|column-width|columns|content|counter-increment|counter-reset|cursor|direction|display|empty-cells|filter|flex|flex-basis|flex-direction|flex-flow|flex-grow|flex-shrink|flex-wrap|float|font|font-family|font-size|font-size-adjust|font-stretch|font-style|font-variant|font-weight|hanging-punctuation|height|justify-content|left|letter-spacing|line-height|list-style|list-style-image|list-style-position|list-style-type|margin|margin-bottom|margin-left|margin-right|margin-top|max-height|max-width|max-zoom|min-height|min-width|min-zoom|nav-down|nav-index|nav-left|nav-right|nav-up|opacity|order|outline|outline-color|outline-offset|outline-style|outline-width|overflow|overflow-x|overflow-y|padding|padding-bottom|padding-left|padding-right|padding-top|page-break-after|page-break-before|page-break-inside|perspective|perspective-origin|position|quotes|resize|right|tab-size|table-layout|text-align|text-align-last|text-decoration|text-decoration-color|text-decoration-line|text-decoration-style|text-indent|text-justify|text-overflow|text-shadow|text-transform|top|transform|transform-origin|transform-style|transition|transition-delay|transition-duration|transition-property|transition-timing-function|unicode-bidi|user-select|user-zoom|vertical-align|visibility|white-space|width|word-break|word-spacing|word-wrap|z-index";
var supportFunction = exports.supportFunction = "rgb|rgba|url|attr|counter|counters";
var supportConstant = exports.supportConstant = "absolute|after-edge|after|all-scroll|all|alphabetic|always|antialiased|armenian|auto|avoid-column|avoid-page|avoid|balance|baseline|before-edge|before|below|bidi-override|block-line-height|block|bold|bolder|border-box|both|bottom|box|break-all|break-word|capitalize|caps-height|caption|center|central|char|circle|cjk-ideographic|clone|close-quote|col-resize|collapse|column|consider-shifts|contain|content-box|cover|crosshair|cubic-bezier|dashed|decimal-leading-zero|decimal|default|disabled|disc|disregard-shifts|distribute-all-lines|distribute-letter|distribute-space|distribute|dotted|double|e-resize|ease-in|ease-in-out|ease-out|ease|ellipsis|end|exclude-ruby|flex-end|flex-start|fill|fixed|georgian|glyphs|grid-height|groove|hand|hanging|hebrew|help|hidden|hiragana-iroha|hiragana|horizontal|icon|ideograph-alpha|ideograph-numeric|ideograph-parenthesis|ideograph-space|ideographic|inactive|include-ruby|inherit|initial|inline-block|inline-box|inline-line-height|inline-table|inline|inset|inside|inter-ideograph|inter-word|invert|italic|justify|katakana-iroha|katakana|keep-all|last|left|lighter|line-edge|line-through|line|linear|list-item|local|loose|lower-alpha|lower-greek|lower-latin|lower-roman|lowercase|lr-tb|ltr|mathematical|max-height|max-size|medium|menu|message-box|middle|move|n-resize|ne-resize|newspaper|no-change|no-close-quote|no-drop|no-open-quote|no-repeat|none|normal|not-allowed|nowrap|nw-resize|oblique|open-quote|outset|outside|overline|padding-box|page|pointer|pre-line|pre-wrap|pre|preserve-3d|progress|relative|repeat-x|repeat-y|repeat|replaced|reset-size|ridge|right|round|row-resize|rtl|s-resize|scroll|se-resize|separate|slice|small-caps|small-caption|solid|space|square|start|static|status-bar|step-end|step-start|steps|stretch|strict|sub|super|sw-resize|table-caption|table-cell|table-column-group|table-column|table-footer-group|table-header-group|table-row-group|table-row|table|tb-rl|text-after-edge|text-before-edge|text-bottom|text-size|text-top|text|thick|thin|transparent|underline|upper-alpha|upper-latin|upper-roman|uppercase|use-script|vertical-ideographic|vertical-text|visible|w-resize|wait|whitespace|z-index|zero|zoom";
var supportConstantColor = exports.supportConstantColor = "aliceblue|antiquewhite|aqua|aquamarine|azure|beige|bisque|black|blanchedalmond|blue|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|cyan|darkblue|darkcyan|darkgoldenrod|darkgray|darkgreen|darkgrey|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkslategrey|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dimgrey|dodgerblue|firebrick|floralwhite|forestgreen|fuchsia|gainsboro|ghostwhite|gold|goldenrod|gray|green|greenyellow|grey|honeydew|hotpink|indianred|indigo|ivory|khaki|lavender|lavenderblush|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|lightgray|lightgreen|lightgrey|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|lightslategrey|lightsteelblue|lightyellow|lime|limegreen|linen|magenta|maroon|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|navy|oldlace|olive|olivedrab|orange|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|powderblue|purple|rebeccapurple|red|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|silver|skyblue|slateblue|slategray|slategrey|snow|springgreen|steelblue|tan|teal|thistle|tomato|turquoise|violet|wheat|white|whitesmoke|yellow|yellowgreen";
var supportConstantFonts = exports.supportConstantFonts = "arial|century|comic|courier|cursive|fantasy|garamond|georgia|helvetica|impact|lucida|symbol|system|tahoma|times|trebuchet|utopia|verdana|webdings|sans-serif|serif|monospace";

var numRe = exports.numRe = "\\-?(?:(?:[0-9]+(?:\\.[0-9]+)?)|(?:\\.[0-9]+))";
var pseudoElements = exports.pseudoElements = "(\\:+)\\b(after|before|first-letter|first-line|moz-selection|selection)\\b";
var pseudoClasses  = exports.pseudoClasses =  "(:)\\b(active|checked|disabled|empty|enabled|first-child|first-of-type|focus|hover|indeterminate|invalid|last-child|last-of-type|link|not|nth-child|nth-last-child|nth-last-of-type|nth-of-type|only-child|only-of-type|required|root|target|valid|visited)\\b";

var CssHighlightRules = function() {

    var keywordMapper = this.createKeywordMapper({
        "support.function": supportFunction,
        "support.constant": supportConstant,
        "support.type": supportType,
        "support.constant.color": supportConstantColor,
        "support.constant.fonts": supportConstantFonts
    }, "text", true);

    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used

    this.$rules = {
        "start" : [{
            include : ["strings", "url", "comments"]
        }, {
            token: "paren.lparen",
            regex: "\\{",
            next:  "ruleset"
        }, {
            token: "paren.rparen",
            regex: "\\}"
        }, {
            token: "string",
            regex: "@(?!viewport)",
            next:  "media"
        }, {
            token: "keyword",
            regex: "#[a-z0-9-_]+"
        }, {
            token: "keyword",
            regex: "%"
        }, {
            token: "variable",
            regex: "\\.[a-z0-9-_]+"
        }, {
            token: "string",
            regex: ":[a-z0-9-_]+"
        }, {
            token : "constant.numeric",
            regex : numRe
        }, {
            token: "constant",
            regex: "[a-z0-9-_]+"
        }, {
            caseInsensitive: true
        }],

        "media": [{
            include : ["strings", "url", "comments"]
        }, {
            token: "paren.lparen",
            regex: "\\{",
            next:  "start"
        }, {
            token: "paren.rparen",
            regex: "\\}",
            next:  "start"
        }, {
            token: "string",
            regex: ";",
            next:  "start"
        }, {
            token: "keyword",
            regex: "(?:media|supports|document|charset|import|namespace|media|supports|document"
                + "|page|font|keyframes|viewport|counter-style|font-feature-values"
                + "|swash|ornaments|annotation|stylistic|styleset|character-variant)"
        }],

        "comments" : [{
            token: "comment", // multi line comment
            regex: "\\/\\*",
            push: [{
                token : "comment",
                regex : "\\*\\/",
                next : "pop"
            }, {
                defaultToken : "comment"
            }]
        }],

        "ruleset" : [{
            regex : "-(webkit|ms|moz|o)-",
            token : "text"
        }, {
            token : "punctuation.operator",
            regex : "[:;]"
        }, {
            token : "paren.rparen",
            regex : "\\}",
            next : "start"
        }, {
            include : ["strings", "url", "comments"]
        }, {
            token : ["constant.numeric", "keyword"],
            regex : "(" + numRe + ")(ch|cm|deg|em|ex|fr|gd|grad|Hz|in|kHz|mm|ms|pc|pt|px|rad|rem|s|turn|vh|vmax|vmin|vm|vw|%)"
        }, {
            token : "constant.numeric",
            regex : numRe
        }, {
            token : "constant.numeric",  // hex6 color
            regex : "#[a-f0-9]{6}"
        }, {
            token : "constant.numeric", // hex3 color
            regex : "#[a-f0-9]{3}"
        }, {
            token : ["punctuation", "entity.other.attribute-name.pseudo-element.css"],
            regex : pseudoElements
        }, {
            token : ["punctuation", "entity.other.attribute-name.pseudo-class.css"],
            regex : pseudoClasses
        }, {
            include: "url"
        }, {
            token : keywordMapper,
            regex : "\\-?[a-zA-Z_][a-zA-Z0-9_\\-]*"
        }, {
            caseInsensitive: true
        }],

        url: [{
            token : "support.function",
            regex : "(?:url(:?-prefix)?|domain|regexp)\\(",
            push: [{
                token : "support.function",
                regex : "\\)",
                next : "pop"
            }, {
                defaultToken: "string"
            }]
        }],

        strings: [{
            token : "string.start",
            regex : "'",
            push : [{
                token : "string.end",
                regex : "'|$",
                next: "pop"
            }, {
                include : "escapes"
            }, {
                token : "constant.language.escape",
                regex : /\\$/,
                consumeLineEnd: true
            }, {
                defaultToken: "string"
            }]
        }, {
            token : "string.start",
            regex : '"',
            push : [{
                token : "string.end",
                regex : '"|$',
                next: "pop"
            }, {
                include : "escapes"
            }, {
                token : "constant.language.escape",
                regex : /\\$/,
                consumeLineEnd: true
            }, {
                defaultToken: "string"
            }]
        }],
        escapes: [{
            token : "constant.language.escape",
            regex : /\\([a-fA-F\d]{1,6}|[^a-fA-F\d])/
        }]

    };

    this.normalizeRules();
};

oop.inherits(CssHighlightRules, TextHighlightRules);

exports.CssHighlightRules = CssHighlightRules;


/***/ }),

/***/ 72843:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var lang = __webpack_require__(20124);
var CssHighlightRules = (__webpack_require__(99301).CssHighlightRules);
var JavaScriptHighlightRules = (__webpack_require__(33801)/* .JavaScriptHighlightRules */ ._);
var XmlHighlightRules = (__webpack_require__(75239)/* .XmlHighlightRules */ .U);

var tagMap = lang.createMap({
    a           : 'anchor',
    button 	    : 'form',
    form        : 'form',
    img         : 'image',
    input       : 'form',
    label       : 'form',
    option      : 'form',
    script      : 'script',
    select      : 'form',
    textarea    : 'form',
    style       : 'style',
    table       : 'table',
    tbody       : 'table',
    td          : 'table',
    tfoot       : 'table',
    th          : 'table',
    tr          : 'table'
});

var HtmlHighlightRules = function() {
    XmlHighlightRules.call(this);

    this.addRules({
        attributes: [{
            include : "tag_whitespace"
        }, {
            token : "entity.other.attribute-name.xml",
            regex : "[-_a-zA-Z0-9:.]+"
        }, {
            token : "keyword.operator.attribute-equals.xml",
            regex : "=",
            push : [{
                include: "tag_whitespace"
            }, {
                token : "string.unquoted.attribute-value.html",
                regex : "[^<>='\"`\\s]+",
                next : "pop"
            }, {
                token : "empty",
                regex : "",
                next : "pop"
            }]
        }, {
            include : "attribute_value"
        }],
        tag: [{
            token : function(start, tag) {
                var group = tagMap[tag];
                return ["meta.tag.punctuation." + (start == "<" ? "" : "end-") + "tag-open.xml",
                    "meta.tag" + (group ? "." + group : "") + ".tag-name.xml"];
            },
            regex : "(</?)([-_a-zA-Z0-9:.]+)",
            next: "tag_stuff"
        }],
        tag_stuff: [
            {include : "attributes"},
            {token : "meta.tag.punctuation.tag-close.xml", regex : "/?>", next : "start"}
        ]
    });

    this.embedTagRules(CssHighlightRules, "css-", "style");
    this.embedTagRules(new JavaScriptHighlightRules({jsx: false}).getRules(), "js-", "script");

    if (this.constructor === HtmlHighlightRules)
        this.normalizeRules();
};

oop.inherits(HtmlHighlightRules, XmlHighlightRules);

exports.V = HtmlHighlightRules;


/***/ }),

/***/ 75239:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var TextHighlightRules = (__webpack_require__(28053)/* .TextHighlightRules */ .K);

var XmlHighlightRules = function(normalize) {
    // http://www.w3.org/TR/REC-xml/#NT-NameChar
    // NameStartChar	   ::=   	":" | [A-Z] | "_" | [a-z] | [#xC0-#xD6] | [#xD8-#xF6] | [#xF8-#x2FF] | [#x370-#x37D] | [#x37F-#x1FFF] | [#x200C-#x200D] | [#x2070-#x218F] | [#x2C00-#x2FEF] | [#x3001-#xD7FF] | [#xF900-#xFDCF] | [#xFDF0-#xFFFD] | [#x10000-#xEFFFF]
    // NameChar	   ::=   	NameStartChar | "-" | "." | [0-9] | #xB7 | [#x0300-#x036F] | [#x203F-#x2040]
    var tagRegex = "[_:a-zA-Z\xc0-\uffff][-_:.a-zA-Z0-9\xc0-\uffff]*";

    this.$rules = {
        start : [
            {token : "string.cdata.xml", regex : "<\\!\\[CDATA\\[", next : "cdata"},
            {
                token : ["punctuation.instruction.xml", "keyword.instruction.xml"],
                regex : "(<\\?)(" + tagRegex + ")", next : "processing_instruction"
            },
            {token : "comment.start.xml", regex : "<\\!--", next : "comment"},
            {
                token : ["xml-pe.doctype.xml", "xml-pe.doctype.xml"],
                regex : "(<\\!)(DOCTYPE)(?=[\\s])", next : "doctype", caseInsensitive: true
            },
            {include : "tag"},
            {token : "text.end-tag-open.xml", regex: "</"},
            {token : "text.tag-open.xml", regex: "<"},
            {include : "reference"},
            {defaultToken : "text.xml"}
        ],

        processing_instruction : [{
            token : "entity.other.attribute-name.decl-attribute-name.xml",
            regex : tagRegex
        }, {
            token : "keyword.operator.decl-attribute-equals.xml",
            regex : "="
        }, {
            include: "whitespace"
        }, {
            include: "string"
        }, {
            token : "punctuation.xml-decl.xml",
            regex : "\\?>",
            next : "start"
        }],

        doctype : [
            {include : "whitespace"},
            {include : "string"},
            {token : "xml-pe.doctype.xml", regex : ">", next : "start"},
            {token : "xml-pe.xml", regex : "[-_a-zA-Z0-9:]+"},
            {token : "punctuation.int-subset", regex : "\\[", push : "int_subset"}
        ],

        int_subset : [{
            token : "text.xml",
            regex : "\\s+"
        }, {
            token: "punctuation.int-subset.xml",
            regex: "]",
            next: "pop"
        }, {
            token : ["punctuation.markup-decl.xml", "keyword.markup-decl.xml"],
            regex : "(<\\!)(" + tagRegex + ")",
            push : [{
                token : "text",
                regex : "\\s+"
            },
            {
                token : "punctuation.markup-decl.xml",
                regex : ">",
                next : "pop"
            },
            {include : "string"}]
        }],

        cdata : [
            {token : "string.cdata.xml", regex : "\\]\\]>", next : "start"},
            {token : "text.xml", regex : "\\s+"},
            {token : "text.xml", regex : "(?:[^\\]]|\\](?!\\]>))+"}
        ],

        comment : [
            {token : "comment.end.xml", regex : "-->", next : "start"},
            {defaultToken : "comment.xml"}
        ],

        reference : [{
            token : "constant.language.escape.reference.xml",
            regex : "(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)"
        }],

        attr_reference : [{
            token : "constant.language.escape.reference.attribute-value.xml",
            regex : "(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)"
        }],

        tag : [{
            token : ["meta.tag.punctuation.tag-open.xml", "meta.tag.punctuation.end-tag-open.xml", "meta.tag.tag-name.xml"],
            regex : "(?:(<)|(</))((?:" + tagRegex + ":)?" + tagRegex + ")",
            next: [
                {include : "attributes"},
                {token : "meta.tag.punctuation.tag-close.xml", regex : "/?>", next : "start"}
            ]
        }],

        tag_whitespace : [
            {token : "text.tag-whitespace.xml", regex : "\\s+"}
        ],
        // for doctype and processing instructions
        whitespace : [
            {token : "text.whitespace.xml", regex : "\\s+"}
        ],

        // for doctype and processing instructions
        string: [{
            token : "string.xml",
            regex : "'",
            push : [
                {token : "string.xml", regex: "'", next: "pop"},
                {defaultToken : "string.xml"}
            ]
        }, {
            token : "string.xml",
            regex : '"',
            push : [
                {token : "string.xml", regex: '"', next: "pop"},
                {defaultToken : "string.xml"}
            ]
        }],

        attributes: [{
            token : "entity.other.attribute-name.xml",
            regex : tagRegex
        }, {
            token : "keyword.operator.attribute-equals.xml",
            regex : "="
        }, {
            include: "tag_whitespace"
        }, {
            include: "attribute_value"
        }],

        attribute_value: [{
            token : "string.attribute-value.xml",
            regex : "'",
            push : [
                {token : "string.attribute-value.xml", regex: "'", next: "pop"},
                {include : "attr_reference"},
                {defaultToken : "string.attribute-value.xml"}
            ]
        }, {
            token : "string.attribute-value.xml",
            regex : '"',
            push : [
                {token : "string.attribute-value.xml", regex: '"', next: "pop"},
                {include : "attr_reference"},
                {defaultToken : "string.attribute-value.xml"}
            ]
        }]
    };

    if (this.constructor === XmlHighlightRules)
        this.normalizeRules();
};


(function() {

    this.embedTagRules = function(HighlightRules, prefix, tag){
        this.$rules.tag.unshift({
            token : ["meta.tag.punctuation.tag-open.xml", "meta.tag." + tag + ".tag-name.xml"],
            regex : "(<)(" + tag + "(?=\\s|>|$))",
            next: [
                {include : "attributes"},
                {token : "meta.tag.punctuation.tag-close.xml", regex : "/?>", next : prefix + "start"}
            ]
        });

        this.$rules[tag + "-end"] = [
            {include : "attributes"},
            {token : "meta.tag.punctuation.tag-close.xml", regex : "/?>",  next: "start",
                onMatch : function(value, currentState, stack) {
                    stack.splice(0);
                    return this.token;
            }}
        ];

        this.embedRules(HighlightRules, prefix, [{
            token: ["meta.tag.punctuation.end-tag-open.xml", "meta.tag." + tag + ".tag-name.xml"],
            regex : "(</)(" + tag + "(?=\\s|>|$))",
            next: tag + "-end"
        }, {
            token: "string.cdata.xml",
            regex : "<\\!\\[CDATA\\["
        }, {
            token: "string.cdata.xml",
            regex : "\\]\\]>"
        }]);
    };

}).call(TextHighlightRules.prototype);

oop.inherits(XmlHighlightRules, TextHighlightRules);

exports.U = XmlHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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eUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2Nzc19oaWdobGlnaHRfcnVsZXMuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9odG1sX2hpZ2hsaWdodF9ydWxlcy5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL3htbF9oaWdobGlnaHRfcnVsZXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBsYW5nID0gcmVxdWlyZShcIi4uL2xpYi9sYW5nXCIpO1xudmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcblxuXG4vKiBFeHBvcnRzIGFyZSBmb3IgU3R5bHVzIGFuZCBMZXNzIGhpZ2hsaWdodGVycyAqL1xudmFyIHN1cHBvcnRUeXBlID0gZXhwb3J0cy5zdXBwb3J0VHlwZSA9IFwiYWxpZ24tY29udGVudHxhbGlnbi1pdGVtc3xhbGlnbi1zZWxmfGFsbHxhbmltYXRpb258YW5pbWF0aW9uLWRlbGF5fGFuaW1hdGlvbi1kaXJlY3Rpb258YW5pbWF0aW9uLWR1cmF0aW9ufGFuaW1hdGlvbi1maWxsLW1vZGV8YW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudHxhbmltYXRpb24tbmFtZXxhbmltYXRpb24tcGxheS1zdGF0ZXxhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9ufGJhY2tmYWNlLXZpc2liaWxpdHl8YmFja2dyb3VuZHxiYWNrZ3JvdW5kLWF0dGFjaG1lbnR8YmFja2dyb3VuZC1ibGVuZC1tb2RlfGJhY2tncm91bmQtY2xpcHxiYWNrZ3JvdW5kLWNvbG9yfGJhY2tncm91bmQtaW1hZ2V8YmFja2dyb3VuZC1vcmlnaW58YmFja2dyb3VuZC1wb3NpdGlvbnxiYWNrZ3JvdW5kLXJlcGVhdHxiYWNrZ3JvdW5kLXNpemV8Ym9yZGVyfGJvcmRlci1ib3R0b218Ym9yZGVyLWJvdHRvbS1jb2xvcnxib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzfGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzfGJvcmRlci1ib3R0b20tc3R5bGV8Ym9yZGVyLWJvdHRvbS13aWR0aHxib3JkZXItY29sbGFwc2V8Ym9yZGVyLWNvbG9yfGJvcmRlci1pbWFnZXxib3JkZXItaW1hZ2Utb3V0c2V0fGJvcmRlci1pbWFnZS1yZXBlYXR8Ym9yZGVyLWltYWdlLXNsaWNlfGJvcmRlci1pbWFnZS1zb3VyY2V8Ym9yZGVyLWltYWdlLXdpZHRofGJvcmRlci1sZWZ0fGJvcmRlci1sZWZ0LWNvbG9yfGJvcmRlci1sZWZ0LXN0eWxlfGJvcmRlci1sZWZ0LXdpZHRofGJvcmRlci1yYWRpdXN8Ym9yZGVyLXJpZ2h0fGJvcmRlci1yaWdodC1jb2xvcnxib3JkZXItcmlnaHQtc3R5bGV8Ym9yZGVyLXJpZ2h0LXdpZHRofGJvcmRlci1zcGFjaW5nfGJvcmRlci1zdHlsZXxib3JkZXItdG9wfGJvcmRlci10b3AtY29sb3J8Ym9yZGVyLXRvcC1sZWZ0LXJhZGl1c3xib3JkZXItdG9wLXJpZ2h0LXJhZGl1c3xib3JkZXItdG9wLXN0eWxlfGJvcmRlci10b3Atd2lkdGh8Ym9yZGVyLXdpZHRofGJvdHRvbXxib3gtc2hhZG93fGJveC1zaXppbmd8Y2FwdGlvbi1zaWRlfGNsZWFyfGNsaXB8Y29sb3J8Y29sdW1uLWNvdW50fGNvbHVtbi1maWxsfGNvbHVtbi1nYXB8Y29sdW1uLXJ1bGV8Y29sdW1uLXJ1bGUtY29sb3J8Y29sdW1uLXJ1bGUtc3R5bGV8Y29sdW1uLXJ1bGUtd2lkdGh8Y29sdW1uLXNwYW58Y29sdW1uLXdpZHRofGNvbHVtbnN8Y29udGVudHxjb3VudGVyLWluY3JlbWVudHxjb3VudGVyLXJlc2V0fGN1cnNvcnxkaXJlY3Rpb258ZGlzcGxheXxlbXB0eS1jZWxsc3xmaWx0ZXJ8ZmxleHxmbGV4LWJhc2lzfGZsZXgtZGlyZWN0aW9ufGZsZXgtZmxvd3xmbGV4LWdyb3d8ZmxleC1zaHJpbmt8ZmxleC13cmFwfGZsb2F0fGZvbnR8Zm9udC1mYW1pbHl8Zm9udC1zaXplfGZvbnQtc2l6ZS1hZGp1c3R8Zm9udC1zdHJldGNofGZvbnQtc3R5bGV8Zm9udC12YXJpYW50fGZvbnQtd2VpZ2h0fGhhbmdpbmctcHVuY3R1YXRpb258aGVpZ2h0fGp1c3RpZnktY29udGVudHxsZWZ0fGxldHRlci1zcGFjaW5nfGxpbmUtaGVpZ2h0fGxpc3Qtc3R5bGV8bGlzdC1zdHlsZS1pbWFnZXxsaXN0LXN0eWxlLXBvc2l0aW9ufGxpc3Qtc3R5bGUtdHlwZXxtYXJnaW58bWFyZ2luLWJvdHRvbXxtYXJnaW4tbGVmdHxtYXJnaW4tcmlnaHR8bWFyZ2luLXRvcHxtYXgtaGVpZ2h0fG1heC13aWR0aHxtYXgtem9vbXxtaW4taGVpZ2h0fG1pbi13aWR0aHxtaW4tem9vbXxuYXYtZG93bnxuYXYtaW5kZXh8bmF2LWxlZnR8bmF2LXJpZ2h0fG5hdi11cHxvcGFjaXR5fG9yZGVyfG91dGxpbmV8b3V0bGluZS1jb2xvcnxvdXRsaW5lLW9mZnNldHxvdXRsaW5lLXN0eWxlfG91dGxpbmUtd2lkdGh8b3ZlcmZsb3d8b3ZlcmZsb3cteHxvdmVyZmxvdy15fHBhZGRpbmd8cGFkZGluZy1ib3R0b218cGFkZGluZy1sZWZ0fHBhZGRpbmctcmlnaHR8cGFkZGluZy10b3B8cGFnZS1icmVhay1hZnRlcnxwYWdlLWJyZWFrLWJlZm9yZXxwYWdlLWJyZWFrLWluc2lkZXxwZXJzcGVjdGl2ZXxwZXJzcGVjdGl2ZS1vcmlnaW58cG9zaXRpb258cXVvdGVzfHJlc2l6ZXxyaWdodHx0YWItc2l6ZXx0YWJsZS1sYXlvdXR8dGV4dC1hbGlnbnx0ZXh0LWFsaWduLWxhc3R8dGV4dC1kZWNvcmF0aW9ufHRleHQtZGVjb3JhdGlvbi1jb2xvcnx0ZXh0LWRlY29yYXRpb24tbGluZXx0ZXh0LWRlY29yYXRpb24tc3R5bGV8dGV4dC1pbmRlbnR8dGV4dC1qdXN0aWZ5fHRleHQtb3ZlcmZsb3d8dGV4dC1zaGFkb3d8dGV4dC10cmFuc2Zvcm18dG9wfHRyYW5zZm9ybXx0cmFuc2Zvcm0tb3JpZ2lufHRyYW5zZm9ybS1zdHlsZXx0cmFuc2l0aW9ufHRyYW5zaXRpb24tZGVsYXl8dHJhbnNpdGlvbi1kdXJhdGlvbnx0cmFuc2l0aW9uLXByb3BlcnR5fHRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9ufHVuaWNvZGUtYmlkaXx1c2VyLXNlbGVjdHx1c2VyLXpvb218dmVydGljYWwtYWxpZ258dmlzaWJpbGl0eXx3aGl0ZS1zcGFjZXx3aWR0aHx3b3JkLWJyZWFrfHdvcmQtc3BhY2luZ3x3b3JkLXdyYXB8ei1pbmRleFwiO1xudmFyIHN1cHBvcnRGdW5jdGlvbiA9IGV4cG9ydHMuc3VwcG9ydEZ1bmN0aW9uID0gXCJyZ2J8cmdiYXx1cmx8YXR0cnxjb3VudGVyfGNvdW50ZXJzXCI7XG52YXIgc3VwcG9ydENvbnN0YW50ID0gZXhwb3J0cy5zdXBwb3J0Q29uc3RhbnQgPSBcImFic29sdXRlfGFmdGVyLWVkZ2V8YWZ0ZXJ8YWxsLXNjcm9sbHxhbGx8YWxwaGFiZXRpY3xhbHdheXN8YW50aWFsaWFzZWR8YXJtZW5pYW58YXV0b3xhdm9pZC1jb2x1bW58YXZvaWQtcGFnZXxhdm9pZHxiYWxhbmNlfGJhc2VsaW5lfGJlZm9yZS1lZGdlfGJlZm9yZXxiZWxvd3xiaWRpLW92ZXJyaWRlfGJsb2NrLWxpbmUtaGVpZ2h0fGJsb2NrfGJvbGR8Ym9sZGVyfGJvcmRlci1ib3h8Ym90aHxib3R0b218Ym94fGJyZWFrLWFsbHxicmVhay13b3JkfGNhcGl0YWxpemV8Y2Fwcy1oZWlnaHR8Y2FwdGlvbnxjZW50ZXJ8Y2VudHJhbHxjaGFyfGNpcmNsZXxjamstaWRlb2dyYXBoaWN8Y2xvbmV8Y2xvc2UtcXVvdGV8Y29sLXJlc2l6ZXxjb2xsYXBzZXxjb2x1bW58Y29uc2lkZXItc2hpZnRzfGNvbnRhaW58Y29udGVudC1ib3h8Y292ZXJ8Y3Jvc3NoYWlyfGN1YmljLWJlemllcnxkYXNoZWR8ZGVjaW1hbC1sZWFkaW5nLXplcm98ZGVjaW1hbHxkZWZhdWx0fGRpc2FibGVkfGRpc2N8ZGlzcmVnYXJkLXNoaWZ0c3xkaXN0cmlidXRlLWFsbC1saW5lc3xkaXN0cmlidXRlLWxldHRlcnxkaXN0cmlidXRlLXNwYWNlfGRpc3RyaWJ1dGV8ZG90dGVkfGRvdWJsZXxlLXJlc2l6ZXxlYXNlLWlufGVhc2UtaW4tb3V0fGVhc2Utb3V0fGVhc2V8ZWxsaXBzaXN8ZW5kfGV4Y2x1ZGUtcnVieXxmbGV4LWVuZHxmbGV4LXN0YXJ0fGZpbGx8Zml4ZWR8Z2VvcmdpYW58Z2x5cGhzfGdyaWQtaGVpZ2h0fGdyb292ZXxoYW5kfGhhbmdpbmd8aGVicmV3fGhlbHB8aGlkZGVufGhpcmFnYW5hLWlyb2hhfGhpcmFnYW5hfGhvcml6b250YWx8aWNvbnxpZGVvZ3JhcGgtYWxwaGF8aWRlb2dyYXBoLW51bWVyaWN8aWRlb2dyYXBoLXBhcmVudGhlc2lzfGlkZW9ncmFwaC1zcGFjZXxpZGVvZ3JhcGhpY3xpbmFjdGl2ZXxpbmNsdWRlLXJ1Ynl8aW5oZXJpdHxpbml0aWFsfGlubGluZS1ibG9ja3xpbmxpbmUtYm94fGlubGluZS1saW5lLWhlaWdodHxpbmxpbmUtdGFibGV8aW5saW5lfGluc2V0fGluc2lkZXxpbnRlci1pZGVvZ3JhcGh8aW50ZXItd29yZHxpbnZlcnR8aXRhbGljfGp1c3RpZnl8a2F0YWthbmEtaXJvaGF8a2F0YWthbmF8a2VlcC1hbGx8bGFzdHxsZWZ0fGxpZ2h0ZXJ8bGluZS1lZGdlfGxpbmUtdGhyb3VnaHxsaW5lfGxpbmVhcnxsaXN0LWl0ZW18bG9jYWx8bG9vc2V8bG93ZXItYWxwaGF8bG93ZXItZ3JlZWt8bG93ZXItbGF0aW58bG93ZXItcm9tYW58bG93ZXJjYXNlfGxyLXRifGx0cnxtYXRoZW1hdGljYWx8bWF4LWhlaWdodHxtYXgtc2l6ZXxtZWRpdW18bWVudXxtZXNzYWdlLWJveHxtaWRkbGV8bW92ZXxuLXJlc2l6ZXxuZS1yZXNpemV8bmV3c3BhcGVyfG5vLWNoYW5nZXxuby1jbG9zZS1xdW90ZXxuby1kcm9wfG5vLW9wZW4tcXVvdGV8bm8tcmVwZWF0fG5vbmV8bm9ybWFsfG5vdC1hbGxvd2VkfG5vd3JhcHxudy1yZXNpemV8b2JsaXF1ZXxvcGVuLXF1b3RlfG91dHNldHxvdXRzaWRlfG92ZXJsaW5lfHBhZGRpbmctYm94fHBhZ2V8cG9pbnRlcnxwcmUtbGluZXxwcmUtd3JhcHxwcmV8cHJlc2VydmUtM2R8cHJvZ3Jlc3N8cmVsYXRpdmV8cmVwZWF0LXh8cmVwZWF0LXl8cmVwZWF0fHJlcGxhY2VkfHJlc2V0LXNpemV8cmlkZ2V8cmlnaHR8cm91bmR8cm93LXJlc2l6ZXxydGx8cy1yZXNpemV8c2Nyb2xsfHNlLXJlc2l6ZXxzZXBhcmF0ZXxzbGljZXxzbWFsbC1jYXBzfHNtYWxsLWNhcHRpb258c29saWR8c3BhY2V8c3F1YXJlfHN0YXJ0fHN0YXRpY3xzdGF0dXMtYmFyfHN0ZXAtZW5kfHN0ZXAtc3RhcnR8c3RlcHN8c3RyZXRjaHxzdHJpY3R8c3VifHN1cGVyfHN3LXJlc2l6ZXx0YWJsZS1jYXB0aW9ufHRhYmxlLWNlbGx8dGFibGUtY29sdW1uLWdyb3VwfHRhYmxlLWNvbHVtbnx0YWJsZS1mb290ZXItZ3JvdXB8dGFibGUtaGVhZGVyLWdyb3VwfHRhYmxlLXJvdy1ncm91cHx0YWJsZS1yb3d8dGFibGV8dGItcmx8dGV4dC1hZnRlci1lZGdlfHRleHQtYmVmb3JlLWVkZ2V8dGV4dC1ib3R0b218dGV4dC1zaXplfHRleHQtdG9wfHRleHR8dGhpY2t8dGhpbnx0cmFuc3BhcmVudHx1bmRlcmxpbmV8dXBwZXItYWxwaGF8dXBwZXItbGF0aW58dXBwZXItcm9tYW58dXBwZXJjYXNlfHVzZS1zY3JpcHR8dmVydGljYWwtaWRlb2dyYXBoaWN8dmVydGljYWwtdGV4dHx2aXNpYmxlfHctcmVzaXplfHdhaXR8d2hpdGVzcGFjZXx6LWluZGV4fHplcm98em9vbVwiO1xudmFyIHN1cHBvcnRDb25zdGFudENvbG9yID0gZXhwb3J0cy5zdXBwb3J0Q29uc3RhbnRDb2xvciA9IFwiYWxpY2VibHVlfGFudGlxdWV3aGl0ZXxhcXVhfGFxdWFtYXJpbmV8YXp1cmV8YmVpZ2V8YmlzcXVlfGJsYWNrfGJsYW5jaGVkYWxtb25kfGJsdWV8Ymx1ZXZpb2xldHxicm93bnxidXJseXdvb2R8Y2FkZXRibHVlfGNoYXJ0cmV1c2V8Y2hvY29sYXRlfGNvcmFsfGNvcm5mbG93ZXJibHVlfGNvcm5zaWxrfGNyaW1zb258Y3lhbnxkYXJrYmx1ZXxkYXJrY3lhbnxkYXJrZ29sZGVucm9kfGRhcmtncmF5fGRhcmtncmVlbnxkYXJrZ3JleXxkYXJra2hha2l8ZGFya21hZ2VudGF8ZGFya29saXZlZ3JlZW58ZGFya29yYW5nZXxkYXJrb3JjaGlkfGRhcmtyZWR8ZGFya3NhbG1vbnxkYXJrc2VhZ3JlZW58ZGFya3NsYXRlYmx1ZXxkYXJrc2xhdGVncmF5fGRhcmtzbGF0ZWdyZXl8ZGFya3R1cnF1b2lzZXxkYXJrdmlvbGV0fGRlZXBwaW5rfGRlZXBza3libHVlfGRpbWdyYXl8ZGltZ3JleXxkb2RnZXJibHVlfGZpcmVicmlja3xmbG9yYWx3aGl0ZXxmb3Jlc3RncmVlbnxmdWNoc2lhfGdhaW5zYm9yb3xnaG9zdHdoaXRlfGdvbGR8Z29sZGVucm9kfGdyYXl8Z3JlZW58Z3JlZW55ZWxsb3d8Z3JleXxob25leWRld3xob3RwaW5rfGluZGlhbnJlZHxpbmRpZ298aXZvcnl8a2hha2l8bGF2ZW5kZXJ8bGF2ZW5kZXJibHVzaHxsYXduZ3JlZW58bGVtb25jaGlmZm9ufGxpZ2h0Ymx1ZXxsaWdodGNvcmFsfGxpZ2h0Y3lhbnxsaWdodGdvbGRlbnJvZHllbGxvd3xsaWdodGdyYXl8bGlnaHRncmVlbnxsaWdodGdyZXl8bGlnaHRwaW5rfGxpZ2h0c2FsbW9ufGxpZ2h0c2VhZ3JlZW58bGlnaHRza3libHVlfGxpZ2h0c2xhdGVncmF5fGxpZ2h0c2xhdGVncmV5fGxpZ2h0c3RlZWxibHVlfGxpZ2h0eWVsbG93fGxpbWV8bGltZWdyZWVufGxpbmVufG1hZ2VudGF8bWFyb29ufG1lZGl1bWFxdWFtYXJpbmV8bWVkaXVtYmx1ZXxtZWRpdW1vcmNoaWR8bWVkaXVtcHVycGxlfG1lZGl1bXNlYWdyZWVufG1lZGl1bXNsYXRlYmx1ZXxtZWRpdW1zcHJpbmdncmVlbnxtZWRpdW10dXJxdW9pc2V8bWVkaXVtdmlvbGV0cmVkfG1pZG5pZ2h0Ymx1ZXxtaW50Y3JlYW18bWlzdHlyb3NlfG1vY2Nhc2lufG5hdmFqb3doaXRlfG5hdnl8b2xkbGFjZXxvbGl2ZXxvbGl2ZWRyYWJ8b3JhbmdlfG9yYW5nZXJlZHxvcmNoaWR8cGFsZWdvbGRlbnJvZHxwYWxlZ3JlZW58cGFsZXR1cnF1b2lzZXxwYWxldmlvbGV0cmVkfHBhcGF5YXdoaXB8cGVhY2hwdWZmfHBlcnV8cGlua3xwbHVtfHBvd2RlcmJsdWV8cHVycGxlfHJlYmVjY2FwdXJwbGV8cmVkfHJvc3licm93bnxyb3lhbGJsdWV8c2FkZGxlYnJvd258c2FsbW9ufHNhbmR5YnJvd258c2VhZ3JlZW58c2Vhc2hlbGx8c2llbm5hfHNpbHZlcnxza3libHVlfHNsYXRlYmx1ZXxzbGF0ZWdyYXl8c2xhdGVncmV5fHNub3d8c3ByaW5nZ3JlZW58c3RlZWxibHVlfHRhbnx0ZWFsfHRoaXN0bGV8dG9tYXRvfHR1cnF1b2lzZXx2aW9sZXR8d2hlYXR8d2hpdGV8d2hpdGVzbW9rZXx5ZWxsb3d8eWVsbG93Z3JlZW5cIjtcbnZhciBzdXBwb3J0Q29uc3RhbnRGb250cyA9IGV4cG9ydHMuc3VwcG9ydENvbnN0YW50Rm9udHMgPSBcImFyaWFsfGNlbnR1cnl8Y29taWN8Y291cmllcnxjdXJzaXZlfGZhbnRhc3l8Z2FyYW1vbmR8Z2VvcmdpYXxoZWx2ZXRpY2F8aW1wYWN0fGx1Y2lkYXxzeW1ib2x8c3lzdGVtfHRhaG9tYXx0aW1lc3x0cmVidWNoZXR8dXRvcGlhfHZlcmRhbmF8d2ViZGluZ3N8c2Fucy1zZXJpZnxzZXJpZnxtb25vc3BhY2VcIjtcblxudmFyIG51bVJlID0gZXhwb3J0cy5udW1SZSA9IFwiXFxcXC0/KD86KD86WzAtOV0rKD86XFxcXC5bMC05XSspPyl8KD86XFxcXC5bMC05XSspKVwiO1xudmFyIHBzZXVkb0VsZW1lbnRzID0gZXhwb3J0cy5wc2V1ZG9FbGVtZW50cyA9IFwiKFxcXFw6KylcXFxcYihhZnRlcnxiZWZvcmV8Zmlyc3QtbGV0dGVyfGZpcnN0LWxpbmV8bW96LXNlbGVjdGlvbnxzZWxlY3Rpb24pXFxcXGJcIjtcbnZhciBwc2V1ZG9DbGFzc2VzICA9IGV4cG9ydHMucHNldWRvQ2xhc3NlcyA9ICBcIig6KVxcXFxiKGFjdGl2ZXxjaGVja2VkfGRpc2FibGVkfGVtcHR5fGVuYWJsZWR8Zmlyc3QtY2hpbGR8Zmlyc3Qtb2YtdHlwZXxmb2N1c3xob3ZlcnxpbmRldGVybWluYXRlfGludmFsaWR8bGFzdC1jaGlsZHxsYXN0LW9mLXR5cGV8bGlua3xub3R8bnRoLWNoaWxkfG50aC1sYXN0LWNoaWxkfG50aC1sYXN0LW9mLXR5cGV8bnRoLW9mLXR5cGV8b25seS1jaGlsZHxvbmx5LW9mLXR5cGV8cmVxdWlyZWR8cm9vdHx0YXJnZXR8dmFsaWR8dmlzaXRlZClcXFxcYlwiO1xuXG52YXIgQ3NzSGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbigpIHtcblxuICAgIHZhciBrZXl3b3JkTWFwcGVyID0gdGhpcy5jcmVhdGVLZXl3b3JkTWFwcGVyKHtcbiAgICAgICAgXCJzdXBwb3J0LmZ1bmN0aW9uXCI6IHN1cHBvcnRGdW5jdGlvbixcbiAgICAgICAgXCJzdXBwb3J0LmNvbnN0YW50XCI6IHN1cHBvcnRDb25zdGFudCxcbiAgICAgICAgXCJzdXBwb3J0LnR5cGVcIjogc3VwcG9ydFR5cGUsXG4gICAgICAgIFwic3VwcG9ydC5jb25zdGFudC5jb2xvclwiOiBzdXBwb3J0Q29uc3RhbnRDb2xvcixcbiAgICAgICAgXCJzdXBwb3J0LmNvbnN0YW50LmZvbnRzXCI6IHN1cHBvcnRDb25zdGFudEZvbnRzXG4gICAgfSwgXCJ0ZXh0XCIsIHRydWUpO1xuXG4gICAgLy8gcmVnZXhwIG11c3Qgbm90IGhhdmUgY2FwdHVyaW5nIHBhcmVudGhlc2VzLiBVc2UgKD86KSBpbnN0ZWFkLlxuICAgIC8vIHJlZ2V4cHMgYXJlIG9yZGVyZWQgLT4gdGhlIGZpcnN0IG1hdGNoIGlzIHVzZWRcblxuICAgIHRoaXMuJHJ1bGVzID0ge1xuICAgICAgICBcInN0YXJ0XCIgOiBbe1xuICAgICAgICAgICAgaW5jbHVkZSA6IFtcInN0cmluZ3NcIiwgXCJ1cmxcIiwgXCJjb21tZW50c1wiXVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJwYXJlbi5scGFyZW5cIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFx7XCIsXG4gICAgICAgICAgICBuZXh0OiAgXCJydWxlc2V0XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwicGFyZW4ucnBhcmVuXCIsXG4gICAgICAgICAgICByZWdleDogXCJcXFxcfVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgcmVnZXg6IFwiQCg/IXZpZXdwb3J0KVwiLFxuICAgICAgICAgICAgbmV4dDogIFwibWVkaWFcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJrZXl3b3JkXCIsXG4gICAgICAgICAgICByZWdleDogXCIjW2EtejAtOS1fXStcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJrZXl3b3JkXCIsXG4gICAgICAgICAgICByZWdleDogXCIlXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwidmFyaWFibGVcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFwuW2EtejAtOS1fXStcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIjpbYS16MC05LV9dK1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5udW1lcmljXCIsXG4gICAgICAgICAgICByZWdleCA6IG51bVJlXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50XCIsXG4gICAgICAgICAgICByZWdleDogXCJbYS16MC05LV9dK1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNhc2VJbnNlbnNpdGl2ZTogdHJ1ZVxuICAgICAgICB9XSxcblxuICAgICAgICBcIm1lZGlhXCI6IFt7XG4gICAgICAgICAgICBpbmNsdWRlIDogW1wic3RyaW5nc1wiLCBcInVybFwiLCBcImNvbW1lbnRzXCJdXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInBhcmVuLmxwYXJlblwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiXFxcXHtcIixcbiAgICAgICAgICAgIG5leHQ6ICBcInN0YXJ0XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwicGFyZW4ucnBhcmVuXCIsXG4gICAgICAgICAgICByZWdleDogXCJcXFxcfVwiLFxuICAgICAgICAgICAgbmV4dDogIFwic3RhcnRcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIjtcIixcbiAgICAgICAgICAgIG5leHQ6ICBcInN0YXJ0XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwia2V5d29yZFwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiKD86bWVkaWF8c3VwcG9ydHN8ZG9jdW1lbnR8Y2hhcnNldHxpbXBvcnR8bmFtZXNwYWNlfG1lZGlhfHN1cHBvcnRzfGRvY3VtZW50XCJcbiAgICAgICAgICAgICAgICArIFwifHBhZ2V8Zm9udHxrZXlmcmFtZXN8dmlld3BvcnR8Y291bnRlci1zdHlsZXxmb250LWZlYXR1cmUtdmFsdWVzXCJcbiAgICAgICAgICAgICAgICArIFwifHN3YXNofG9ybmFtZW50c3xhbm5vdGF0aW9ufHN0eWxpc3RpY3xzdHlsZXNldHxjaGFyYWN0ZXItdmFyaWFudClcIlxuICAgICAgICB9XSxcblxuICAgICAgICBcImNvbW1lbnRzXCIgOiBbe1xuICAgICAgICAgICAgdG9rZW46IFwiY29tbWVudFwiLCAvLyBtdWx0aSBsaW5lIGNvbW1lbnRcbiAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFwvXFxcXCpcIixcbiAgICAgICAgICAgIHB1c2g6IFt7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXCpcXFxcL1wiLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcInBvcFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuIDogXCJjb21tZW50XCJcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH1dLFxuXG4gICAgICAgIFwicnVsZXNldFwiIDogW3tcbiAgICAgICAgICAgIHJlZ2V4IDogXCItKHdlYmtpdHxtc3xtb3p8byktXCIsXG4gICAgICAgICAgICB0b2tlbiA6IFwidGV4dFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJwdW5jdHVhdGlvbi5vcGVyYXRvclwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIls6O11cIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwicGFyZW4ucnBhcmVuXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiXFxcXH1cIixcbiAgICAgICAgICAgIG5leHQgOiBcInN0YXJ0XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaW5jbHVkZSA6IFtcInN0cmluZ3NcIiwgXCJ1cmxcIiwgXCJjb21tZW50c1wiXVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFtcImNvbnN0YW50Lm51bWVyaWNcIiwgXCJrZXl3b3JkXCJdLFxuICAgICAgICAgICAgcmVnZXggOiBcIihcIiArIG51bVJlICsgXCIpKGNofGNtfGRlZ3xlbXxleHxmcnxnZHxncmFkfEh6fGlufGtIenxtbXxtc3xwY3xwdHxweHxyYWR8cmVtfHN8dHVybnx2aHx2bWF4fHZtaW58dm18dnd8JSlcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLFxuICAgICAgICAgICAgcmVnZXggOiBudW1SZVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLCAgLy8gaGV4NiBjb2xvclxuICAgICAgICAgICAgcmVnZXggOiBcIiNbYS1mMC05XXs2fVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5udW1lcmljXCIsIC8vIGhleDMgY29sb3JcbiAgICAgICAgICAgIHJlZ2V4IDogXCIjW2EtZjAtOV17M31cIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFtcInB1bmN0dWF0aW9uXCIsIFwiZW50aXR5Lm90aGVyLmF0dHJpYnV0ZS1uYW1lLnBzZXVkby1lbGVtZW50LmNzc1wiXSxcbiAgICAgICAgICAgIHJlZ2V4IDogcHNldWRvRWxlbWVudHNcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBbXCJwdW5jdHVhdGlvblwiLCBcImVudGl0eS5vdGhlci5hdHRyaWJ1dGUtbmFtZS5wc2V1ZG8tY2xhc3MuY3NzXCJdLFxuICAgICAgICAgICAgcmVnZXggOiBwc2V1ZG9DbGFzc2VzXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGluY2x1ZGU6IFwidXJsXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBrZXl3b3JkTWFwcGVyLFxuICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwtP1thLXpBLVpfXVthLXpBLVowLTlfXFxcXC1dKlwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNhc2VJbnNlbnNpdGl2ZTogdHJ1ZVxuICAgICAgICB9XSxcblxuICAgICAgICB1cmw6IFt7XG4gICAgICAgICAgICB0b2tlbiA6IFwic3VwcG9ydC5mdW5jdGlvblwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIig/OnVybCg6Py1wcmVmaXgpP3xkb21haW58cmVnZXhwKVxcXFwoXCIsXG4gICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdXBwb3J0LmZ1bmN0aW9uXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwpXCIsXG4gICAgICAgICAgICAgICAgbmV4dCA6IFwicG9wXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwic3RyaW5nXCJcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH1dLFxuXG4gICAgICAgIHN0cmluZ3M6IFt7XG4gICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nLnN0YXJ0XCIsXG4gICAgICAgICAgICByZWdleCA6IFwiJ1wiLFxuICAgICAgICAgICAgcHVzaCA6IFt7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZy5lbmRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiJ3wkXCIsXG4gICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGluY2x1ZGUgOiBcImVzY2FwZXNcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC9cXFxcJC8sXG4gICAgICAgICAgICAgICAgY29uc3VtZUxpbmVFbmQ6IHRydWVcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwic3RyaW5nXCJcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmcuc3RhcnRcIixcbiAgICAgICAgICAgIHJlZ2V4IDogJ1wiJyxcbiAgICAgICAgICAgIHB1c2ggOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmcuZW5kXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAnXCJ8JCcsXG4gICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGluY2x1ZGUgOiBcImVzY2FwZXNcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC9cXFxcJC8sXG4gICAgICAgICAgICAgICAgY29uc3VtZUxpbmVFbmQ6IHRydWVcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwic3RyaW5nXCJcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH1dLFxuICAgICAgICBlc2NhcGVzOiBbe1xuICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLFxuICAgICAgICAgICAgcmVnZXggOiAvXFxcXChbYS1mQS1GXFxkXXsxLDZ9fFteYS1mQS1GXFxkXSkvXG4gICAgICAgIH1dXG5cbiAgICB9O1xuXG4gICAgdGhpcy5ub3JtYWxpemVSdWxlcygpO1xufTtcblxub29wLmluaGVyaXRzKENzc0hpZ2hsaWdodFJ1bGVzLCBUZXh0SGlnaGxpZ2h0UnVsZXMpO1xuXG5leHBvcnRzLkNzc0hpZ2hsaWdodFJ1bGVzID0gQ3NzSGlnaGxpZ2h0UnVsZXM7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIGxhbmcgPSByZXF1aXJlKFwiLi4vbGliL2xhbmdcIik7XG52YXIgQ3NzSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9jc3NfaGlnaGxpZ2h0X3J1bGVzXCIpLkNzc0hpZ2hsaWdodFJ1bGVzO1xudmFyIEphdmFTY3JpcHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL2phdmFzY3JpcHRfaGlnaGxpZ2h0X3J1bGVzXCIpLkphdmFTY3JpcHRIaWdobGlnaHRSdWxlcztcbnZhciBYbWxIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3htbF9oaWdobGlnaHRfcnVsZXNcIikuWG1sSGlnaGxpZ2h0UnVsZXM7XG5cbnZhciB0YWdNYXAgPSBsYW5nLmNyZWF0ZU1hcCh7XG4gICAgYSAgICAgICAgICAgOiAnYW5jaG9yJyxcbiAgICBidXR0b24gXHQgICAgOiAnZm9ybScsXG4gICAgZm9ybSAgICAgICAgOiAnZm9ybScsXG4gICAgaW1nICAgICAgICAgOiAnaW1hZ2UnLFxuICAgIGlucHV0ICAgICAgIDogJ2Zvcm0nLFxuICAgIGxhYmVsICAgICAgIDogJ2Zvcm0nLFxuICAgIG9wdGlvbiAgICAgIDogJ2Zvcm0nLFxuICAgIHNjcmlwdCAgICAgIDogJ3NjcmlwdCcsXG4gICAgc2VsZWN0ICAgICAgOiAnZm9ybScsXG4gICAgdGV4dGFyZWEgICAgOiAnZm9ybScsXG4gICAgc3R5bGUgICAgICAgOiAnc3R5bGUnLFxuICAgIHRhYmxlICAgICAgIDogJ3RhYmxlJyxcbiAgICB0Ym9keSAgICAgICA6ICd0YWJsZScsXG4gICAgdGQgICAgICAgICAgOiAndGFibGUnLFxuICAgIHRmb290ICAgICAgIDogJ3RhYmxlJyxcbiAgICB0aCAgICAgICAgICA6ICd0YWJsZScsXG4gICAgdHIgICAgICAgICAgOiAndGFibGUnXG59KTtcblxudmFyIEh0bWxIaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uKCkge1xuICAgIFhtbEhpZ2hsaWdodFJ1bGVzLmNhbGwodGhpcyk7XG5cbiAgICB0aGlzLmFkZFJ1bGVzKHtcbiAgICAgICAgYXR0cmlidXRlczogW3tcbiAgICAgICAgICAgIGluY2x1ZGUgOiBcInRhZ193aGl0ZXNwYWNlXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcImVudGl0eS5vdGhlci5hdHRyaWJ1dGUtbmFtZS54bWxcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJbLV9hLXpBLVowLTk6Ll0rXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcImtleXdvcmQub3BlcmF0b3IuYXR0cmlidXRlLWVxdWFscy54bWxcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCI9XCIsXG4gICAgICAgICAgICBwdXNoIDogW3tcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiBcInRhZ193aGl0ZXNwYWNlXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nLnVucXVvdGVkLmF0dHJpYnV0ZS12YWx1ZS5odG1sXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIltePD49J1xcXCJgXFxcXHNdK1wiLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcInBvcFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImVtcHR5XCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlwiLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcInBvcFwiXG4gICAgICAgICAgICB9XVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpbmNsdWRlIDogXCJhdHRyaWJ1dGVfdmFsdWVcIlxuICAgICAgICB9XSxcbiAgICAgICAgdGFnOiBbe1xuICAgICAgICAgICAgdG9rZW4gOiBmdW5jdGlvbihzdGFydCwgdGFnKSB7XG4gICAgICAgICAgICAgICAgdmFyIGdyb3VwID0gdGFnTWFwW3RhZ107XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtcIm1ldGEudGFnLnB1bmN0dWF0aW9uLlwiICsgKHN0YXJ0ID09IFwiPFwiID8gXCJcIiA6IFwiZW5kLVwiKSArIFwidGFnLW9wZW4ueG1sXCIsXG4gICAgICAgICAgICAgICAgICAgIFwibWV0YS50YWdcIiArIChncm91cCA/IFwiLlwiICsgZ3JvdXAgOiBcIlwiKSArIFwiLnRhZy1uYW1lLnhtbFwiXTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZWdleCA6IFwiKDwvPykoWy1fYS16QS1aMC05Oi5dKylcIixcbiAgICAgICAgICAgIG5leHQ6IFwidGFnX3N0dWZmXCJcbiAgICAgICAgfV0sXG4gICAgICAgIHRhZ19zdHVmZjogW1xuICAgICAgICAgICAge2luY2x1ZGUgOiBcImF0dHJpYnV0ZXNcIn0sXG4gICAgICAgICAgICB7dG9rZW4gOiBcIm1ldGEudGFnLnB1bmN0dWF0aW9uLnRhZy1jbG9zZS54bWxcIiwgcmVnZXggOiBcIi8/PlwiLCBuZXh0IDogXCJzdGFydFwifVxuICAgICAgICBdXG4gICAgfSk7XG5cbiAgICB0aGlzLmVtYmVkVGFnUnVsZXMoQ3NzSGlnaGxpZ2h0UnVsZXMsIFwiY3NzLVwiLCBcInN0eWxlXCIpO1xuICAgIHRoaXMuZW1iZWRUYWdSdWxlcyhuZXcgSmF2YVNjcmlwdEhpZ2hsaWdodFJ1bGVzKHtqc3g6IGZhbHNlfSkuZ2V0UnVsZXMoKSwgXCJqcy1cIiwgXCJzY3JpcHRcIik7XG5cbiAgICBpZiAodGhpcy5jb25zdHJ1Y3RvciA9PT0gSHRtbEhpZ2hsaWdodFJ1bGVzKVxuICAgICAgICB0aGlzLm5vcm1hbGl6ZVJ1bGVzKCk7XG59O1xuXG5vb3AuaW5oZXJpdHMoSHRtbEhpZ2hsaWdodFJ1bGVzLCBYbWxIaWdobGlnaHRSdWxlcyk7XG5cbmV4cG9ydHMuSHRtbEhpZ2hsaWdodFJ1bGVzID0gSHRtbEhpZ2hsaWdodFJ1bGVzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90ZXh0X2hpZ2hsaWdodF9ydWxlc1wiKS5UZXh0SGlnaGxpZ2h0UnVsZXM7XG5cbnZhciBYbWxIaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uKG5vcm1hbGl6ZSkge1xuICAgIC8vIGh0dHA6Ly93d3cudzMub3JnL1RSL1JFQy14bWwvI05ULU5hbWVDaGFyXG4gICAgLy8gTmFtZVN0YXJ0Q2hhclx0ICAgOjo9ICAgXHRcIjpcIiB8IFtBLVpdIHwgXCJfXCIgfCBbYS16XSB8IFsjeEMwLSN4RDZdIHwgWyN4RDgtI3hGNl0gfCBbI3hGOC0jeDJGRl0gfCBbI3gzNzAtI3gzN0RdIHwgWyN4MzdGLSN4MUZGRl0gfCBbI3gyMDBDLSN4MjAwRF0gfCBbI3gyMDcwLSN4MjE4Rl0gfCBbI3gyQzAwLSN4MkZFRl0gfCBbI3gzMDAxLSN4RDdGRl0gfCBbI3hGOTAwLSN4RkRDRl0gfCBbI3hGREYwLSN4RkZGRF0gfCBbI3gxMDAwMC0jeEVGRkZGXVxuICAgIC8vIE5hbWVDaGFyXHQgICA6Oj0gICBcdE5hbWVTdGFydENoYXIgfCBcIi1cIiB8IFwiLlwiIHwgWzAtOV0gfCAjeEI3IHwgWyN4MDMwMC0jeDAzNkZdIHwgWyN4MjAzRi0jeDIwNDBdXG4gICAgdmFyIHRhZ1JlZ2V4ID0gXCJbXzphLXpBLVpcXHhjMC1cXHVmZmZmXVstXzouYS16QS1aMC05XFx4YzAtXFx1ZmZmZl0qXCI7XG5cbiAgICB0aGlzLiRydWxlcyA9IHtcbiAgICAgICAgc3RhcnQgOiBbXG4gICAgICAgICAgICB7dG9rZW4gOiBcInN0cmluZy5jZGF0YS54bWxcIiwgcmVnZXggOiBcIjxcXFxcIVxcXFxbQ0RBVEFcXFxcW1wiLCBuZXh0IDogXCJjZGF0YVwifSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFtcInB1bmN0dWF0aW9uLmluc3RydWN0aW9uLnhtbFwiLCBcImtleXdvcmQuaW5zdHJ1Y3Rpb24ueG1sXCJdLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIoPFxcXFw/KShcIiArIHRhZ1JlZ2V4ICsgXCIpXCIsIG5leHQgOiBcInByb2Nlc3NpbmdfaW5zdHJ1Y3Rpb25cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHt0b2tlbiA6IFwiY29tbWVudC5zdGFydC54bWxcIiwgcmVnZXggOiBcIjxcXFxcIS0tXCIsIG5leHQgOiBcImNvbW1lbnRcIn0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBbXCJ4bWwtcGUuZG9jdHlwZS54bWxcIiwgXCJ4bWwtcGUuZG9jdHlwZS54bWxcIl0sXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIig8XFxcXCEpKERPQ1RZUEUpKD89W1xcXFxzXSlcIiwgbmV4dCA6IFwiZG9jdHlwZVwiLCBjYXNlSW5zZW5zaXRpdmU6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7aW5jbHVkZSA6IFwidGFnXCJ9LFxuICAgICAgICAgICAge3Rva2VuIDogXCJ0ZXh0LmVuZC10YWctb3Blbi54bWxcIiwgcmVnZXg6IFwiPC9cIn0sXG4gICAgICAgICAgICB7dG9rZW4gOiBcInRleHQudGFnLW9wZW4ueG1sXCIsIHJlZ2V4OiBcIjxcIn0sXG4gICAgICAgICAgICB7aW5jbHVkZSA6IFwicmVmZXJlbmNlXCJ9LFxuICAgICAgICAgICAge2RlZmF1bHRUb2tlbiA6IFwidGV4dC54bWxcIn1cbiAgICAgICAgXSxcblxuICAgICAgICBwcm9jZXNzaW5nX2luc3RydWN0aW9uIDogW3tcbiAgICAgICAgICAgIHRva2VuIDogXCJlbnRpdHkub3RoZXIuYXR0cmlidXRlLW5hbWUuZGVjbC1hdHRyaWJ1dGUtbmFtZS54bWxcIixcbiAgICAgICAgICAgIHJlZ2V4IDogdGFnUmVnZXhcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcImtleXdvcmQub3BlcmF0b3IuZGVjbC1hdHRyaWJ1dGUtZXF1YWxzLnhtbFwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIj1cIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpbmNsdWRlOiBcIndoaXRlc3BhY2VcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpbmNsdWRlOiBcInN0cmluZ1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJwdW5jdHVhdGlvbi54bWwtZGVjbC54bWxcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcPz5cIixcbiAgICAgICAgICAgIG5leHQgOiBcInN0YXJ0XCJcbiAgICAgICAgfV0sXG5cbiAgICAgICAgZG9jdHlwZSA6IFtcbiAgICAgICAgICAgIHtpbmNsdWRlIDogXCJ3aGl0ZXNwYWNlXCJ9LFxuICAgICAgICAgICAge2luY2x1ZGUgOiBcInN0cmluZ1wifSxcbiAgICAgICAgICAgIHt0b2tlbiA6IFwieG1sLXBlLmRvY3R5cGUueG1sXCIsIHJlZ2V4IDogXCI+XCIsIG5leHQgOiBcInN0YXJ0XCJ9LFxuICAgICAgICAgICAge3Rva2VuIDogXCJ4bWwtcGUueG1sXCIsIHJlZ2V4IDogXCJbLV9hLXpBLVowLTk6XStcIn0sXG4gICAgICAgICAgICB7dG9rZW4gOiBcInB1bmN0dWF0aW9uLmludC1zdWJzZXRcIiwgcmVnZXggOiBcIlxcXFxbXCIsIHB1c2ggOiBcImludF9zdWJzZXRcIn1cbiAgICAgICAgXSxcblxuICAgICAgICBpbnRfc3Vic2V0IDogW3tcbiAgICAgICAgICAgIHRva2VuIDogXCJ0ZXh0LnhtbFwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIlxcXFxzK1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInB1bmN0dWF0aW9uLmludC1zdWJzZXQueG1sXCIsXG4gICAgICAgICAgICByZWdleDogXCJdXCIsXG4gICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogW1wicHVuY3R1YXRpb24ubWFya3VwLWRlY2wueG1sXCIsIFwia2V5d29yZC5tYXJrdXAtZGVjbC54bWxcIl0sXG4gICAgICAgICAgICByZWdleCA6IFwiKDxcXFxcISkoXCIgKyB0YWdSZWdleCArIFwiKVwiLFxuICAgICAgICAgICAgcHVzaCA6IFt7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXHMrXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInB1bmN0dWF0aW9uLm1hcmt1cC1kZWNsLnhtbFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCI+XCIsXG4gICAgICAgICAgICAgICAgbmV4dCA6IFwicG9wXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7aW5jbHVkZSA6IFwic3RyaW5nXCJ9XVxuICAgICAgICB9XSxcblxuICAgICAgICBjZGF0YSA6IFtcbiAgICAgICAgICAgIHt0b2tlbiA6IFwic3RyaW5nLmNkYXRhLnhtbFwiLCByZWdleCA6IFwiXFxcXF1cXFxcXT5cIiwgbmV4dCA6IFwic3RhcnRcIn0sXG4gICAgICAgICAgICB7dG9rZW4gOiBcInRleHQueG1sXCIsIHJlZ2V4IDogXCJcXFxccytcIn0sXG4gICAgICAgICAgICB7dG9rZW4gOiBcInRleHQueG1sXCIsIHJlZ2V4IDogXCIoPzpbXlxcXFxdXXxcXFxcXSg/IVxcXFxdPikpK1wifVxuICAgICAgICBdLFxuXG4gICAgICAgIGNvbW1lbnQgOiBbXG4gICAgICAgICAgICB7dG9rZW4gOiBcImNvbW1lbnQuZW5kLnhtbFwiLCByZWdleCA6IFwiLS0+XCIsIG5leHQgOiBcInN0YXJ0XCJ9LFxuICAgICAgICAgICAge2RlZmF1bHRUb2tlbiA6IFwiY29tbWVudC54bWxcIn1cbiAgICAgICAgXSxcblxuICAgICAgICByZWZlcmVuY2UgOiBbe1xuICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZS5yZWZlcmVuY2UueG1sXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiKD86JiNbMC05XSs7KXwoPzomI3hbMC05YS1mQS1GXSs7KXwoPzomW2EtekEtWjAtOV86XFxcXC4tXSs7KVwiXG4gICAgICAgIH1dLFxuXG4gICAgICAgIGF0dHJfcmVmZXJlbmNlIDogW3tcbiAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGUucmVmZXJlbmNlLmF0dHJpYnV0ZS12YWx1ZS54bWxcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCIoPzomI1swLTldKzspfCg/OiYjeFswLTlhLWZBLUZdKzspfCg/OiZbYS16QS1aMC05XzpcXFxcLi1dKzspXCJcbiAgICAgICAgfV0sXG5cbiAgICAgICAgdGFnIDogW3tcbiAgICAgICAgICAgIHRva2VuIDogW1wibWV0YS50YWcucHVuY3R1YXRpb24udGFnLW9wZW4ueG1sXCIsIFwibWV0YS50YWcucHVuY3R1YXRpb24uZW5kLXRhZy1vcGVuLnhtbFwiLCBcIm1ldGEudGFnLnRhZy1uYW1lLnhtbFwiXSxcbiAgICAgICAgICAgIHJlZ2V4IDogXCIoPzooPCl8KDwvKSkoKD86XCIgKyB0YWdSZWdleCArIFwiOik/XCIgKyB0YWdSZWdleCArIFwiKVwiLFxuICAgICAgICAgICAgbmV4dDogW1xuICAgICAgICAgICAgICAgIHtpbmNsdWRlIDogXCJhdHRyaWJ1dGVzXCJ9LFxuICAgICAgICAgICAgICAgIHt0b2tlbiA6IFwibWV0YS50YWcucHVuY3R1YXRpb24udGFnLWNsb3NlLnhtbFwiLCByZWdleCA6IFwiLz8+XCIsIG5leHQgOiBcInN0YXJ0XCJ9XG4gICAgICAgICAgICBdXG4gICAgICAgIH1dLFxuXG4gICAgICAgIHRhZ193aGl0ZXNwYWNlIDogW1xuICAgICAgICAgICAge3Rva2VuIDogXCJ0ZXh0LnRhZy13aGl0ZXNwYWNlLnhtbFwiLCByZWdleCA6IFwiXFxcXHMrXCJ9XG4gICAgICAgIF0sXG4gICAgICAgIC8vIGZvciBkb2N0eXBlIGFuZCBwcm9jZXNzaW5nIGluc3RydWN0aW9uc1xuICAgICAgICB3aGl0ZXNwYWNlIDogW1xuICAgICAgICAgICAge3Rva2VuIDogXCJ0ZXh0LndoaXRlc3BhY2UueG1sXCIsIHJlZ2V4IDogXCJcXFxccytcIn1cbiAgICAgICAgXSxcblxuICAgICAgICAvLyBmb3IgZG9jdHlwZSBhbmQgcHJvY2Vzc2luZyBpbnN0cnVjdGlvbnNcbiAgICAgICAgc3RyaW5nOiBbe1xuICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZy54bWxcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCInXCIsXG4gICAgICAgICAgICBwdXNoIDogW1xuICAgICAgICAgICAgICAgIHt0b2tlbiA6IFwic3RyaW5nLnhtbFwiLCByZWdleDogXCInXCIsIG5leHQ6IFwicG9wXCJ9LFxuICAgICAgICAgICAgICAgIHtkZWZhdWx0VG9rZW4gOiBcInN0cmluZy54bWxcIn1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZy54bWxcIixcbiAgICAgICAgICAgIHJlZ2V4IDogJ1wiJyxcbiAgICAgICAgICAgIHB1c2ggOiBbXG4gICAgICAgICAgICAgICAge3Rva2VuIDogXCJzdHJpbmcueG1sXCIsIHJlZ2V4OiAnXCInLCBuZXh0OiBcInBvcFwifSxcbiAgICAgICAgICAgICAgICB7ZGVmYXVsdFRva2VuIDogXCJzdHJpbmcueG1sXCJ9XG4gICAgICAgICAgICBdXG4gICAgICAgIH1dLFxuXG4gICAgICAgIGF0dHJpYnV0ZXM6IFt7XG4gICAgICAgICAgICB0b2tlbiA6IFwiZW50aXR5Lm90aGVyLmF0dHJpYnV0ZS1uYW1lLnhtbFwiLFxuICAgICAgICAgICAgcmVnZXggOiB0YWdSZWdleFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwia2V5d29yZC5vcGVyYXRvci5hdHRyaWJ1dGUtZXF1YWxzLnhtbFwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIj1cIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpbmNsdWRlOiBcInRhZ193aGl0ZXNwYWNlXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaW5jbHVkZTogXCJhdHRyaWJ1dGVfdmFsdWVcIlxuICAgICAgICB9XSxcblxuICAgICAgICBhdHRyaWJ1dGVfdmFsdWU6IFt7XG4gICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nLmF0dHJpYnV0ZS12YWx1ZS54bWxcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCInXCIsXG4gICAgICAgICAgICBwdXNoIDogW1xuICAgICAgICAgICAgICAgIHt0b2tlbiA6IFwic3RyaW5nLmF0dHJpYnV0ZS12YWx1ZS54bWxcIiwgcmVnZXg6IFwiJ1wiLCBuZXh0OiBcInBvcFwifSxcbiAgICAgICAgICAgICAgICB7aW5jbHVkZSA6IFwiYXR0cl9yZWZlcmVuY2VcIn0sXG4gICAgICAgICAgICAgICAge2RlZmF1bHRUb2tlbiA6IFwic3RyaW5nLmF0dHJpYnV0ZS12YWx1ZS54bWxcIn1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZy5hdHRyaWJ1dGUtdmFsdWUueG1sXCIsXG4gICAgICAgICAgICByZWdleCA6ICdcIicsXG4gICAgICAgICAgICBwdXNoIDogW1xuICAgICAgICAgICAgICAgIHt0b2tlbiA6IFwic3RyaW5nLmF0dHJpYnV0ZS12YWx1ZS54bWxcIiwgcmVnZXg6ICdcIicsIG5leHQ6IFwicG9wXCJ9LFxuICAgICAgICAgICAgICAgIHtpbmNsdWRlIDogXCJhdHRyX3JlZmVyZW5jZVwifSxcbiAgICAgICAgICAgICAgICB7ZGVmYXVsdFRva2VuIDogXCJzdHJpbmcuYXR0cmlidXRlLXZhbHVlLnhtbFwifVxuICAgICAgICAgICAgXVxuICAgICAgICB9XVxuICAgIH07XG5cbiAgICBpZiAodGhpcy5jb25zdHJ1Y3RvciA9PT0gWG1sSGlnaGxpZ2h0UnVsZXMpXG4gICAgICAgIHRoaXMubm9ybWFsaXplUnVsZXMoKTtcbn07XG5cblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5lbWJlZFRhZ1J1bGVzID0gZnVuY3Rpb24oSGlnaGxpZ2h0UnVsZXMsIHByZWZpeCwgdGFnKXtcbiAgICAgICAgdGhpcy4kcnVsZXMudGFnLnVuc2hpZnQoe1xuICAgICAgICAgICAgdG9rZW4gOiBbXCJtZXRhLnRhZy5wdW5jdHVhdGlvbi50YWctb3Blbi54bWxcIiwgXCJtZXRhLnRhZy5cIiArIHRhZyArIFwiLnRhZy1uYW1lLnhtbFwiXSxcbiAgICAgICAgICAgIHJlZ2V4IDogXCIoPCkoXCIgKyB0YWcgKyBcIig/PVxcXFxzfD58JCkpXCIsXG4gICAgICAgICAgICBuZXh0OiBbXG4gICAgICAgICAgICAgICAge2luY2x1ZGUgOiBcImF0dHJpYnV0ZXNcIn0sXG4gICAgICAgICAgICAgICAge3Rva2VuIDogXCJtZXRhLnRhZy5wdW5jdHVhdGlvbi50YWctY2xvc2UueG1sXCIsIHJlZ2V4IDogXCIvPz5cIiwgbmV4dCA6IHByZWZpeCArIFwic3RhcnRcIn1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy4kcnVsZXNbdGFnICsgXCItZW5kXCJdID0gW1xuICAgICAgICAgICAge2luY2x1ZGUgOiBcImF0dHJpYnV0ZXNcIn0sXG4gICAgICAgICAgICB7dG9rZW4gOiBcIm1ldGEudGFnLnB1bmN0dWF0aW9uLnRhZy1jbG9zZS54bWxcIiwgcmVnZXggOiBcIi8/PlwiLCAgbmV4dDogXCJzdGFydFwiLFxuICAgICAgICAgICAgICAgIG9uTWF0Y2ggOiBmdW5jdGlvbih2YWx1ZSwgY3VycmVudFN0YXRlLCBzdGFjaykge1xuICAgICAgICAgICAgICAgICAgICBzdGFjay5zcGxpY2UoMCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRva2VuO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgXTtcblxuICAgICAgICB0aGlzLmVtYmVkUnVsZXMoSGlnaGxpZ2h0UnVsZXMsIHByZWZpeCwgW3tcbiAgICAgICAgICAgIHRva2VuOiBbXCJtZXRhLnRhZy5wdW5jdHVhdGlvbi5lbmQtdGFnLW9wZW4ueG1sXCIsIFwibWV0YS50YWcuXCIgKyB0YWcgKyBcIi50YWctbmFtZS54bWxcIl0sXG4gICAgICAgICAgICByZWdleCA6IFwiKDwvKShcIiArIHRhZyArIFwiKD89XFxcXHN8PnwkKSlcIixcbiAgICAgICAgICAgIG5leHQ6IHRhZyArIFwiLWVuZFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInN0cmluZy5jZGF0YS54bWxcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCI8XFxcXCFcXFxcW0NEQVRBXFxcXFtcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJzdHJpbmcuY2RhdGEueG1sXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiXFxcXF1cXFxcXT5cIlxuICAgICAgICB9XSk7XG4gICAgfTtcblxufSkuY2FsbChUZXh0SGlnaGxpZ2h0UnVsZXMucHJvdG90eXBlKTtcblxub29wLmluaGVyaXRzKFhtbEhpZ2hsaWdodFJ1bGVzLCBUZXh0SGlnaGxpZ2h0UnVsZXMpO1xuXG5leHBvcnRzLlhtbEhpZ2hsaWdodFJ1bGVzID0gWG1sSGlnaGxpZ2h0UnVsZXM7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=