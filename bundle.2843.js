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
var JavaScriptHighlightRules = (__webpack_require__(33801).JavaScriptHighlightRules);
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

exports.HtmlHighlightRules = HtmlHighlightRules;


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QXlCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9jc3NfaGlnaGxpZ2h0X3J1bGVzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvaHRtbF9oaWdobGlnaHRfcnVsZXMuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS94bWxfaGlnaGxpZ2h0X3J1bGVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgbGFuZyA9IHJlcXVpcmUoXCIuLi9saWIvbGFuZ1wiKTtcbnZhciBUZXh0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90ZXh0X2hpZ2hsaWdodF9ydWxlc1wiKS5UZXh0SGlnaGxpZ2h0UnVsZXM7XG5cblxuLyogRXhwb3J0cyBhcmUgZm9yIFN0eWx1cyBhbmQgTGVzcyBoaWdobGlnaHRlcnMgKi9cbnZhciBzdXBwb3J0VHlwZSA9IGV4cG9ydHMuc3VwcG9ydFR5cGUgPSBcImFsaWduLWNvbnRlbnR8YWxpZ24taXRlbXN8YWxpZ24tc2VsZnxhbGx8YW5pbWF0aW9ufGFuaW1hdGlvbi1kZWxheXxhbmltYXRpb24tZGlyZWN0aW9ufGFuaW1hdGlvbi1kdXJhdGlvbnxhbmltYXRpb24tZmlsbC1tb2RlfGFuaW1hdGlvbi1pdGVyYXRpb24tY291bnR8YW5pbWF0aW9uLW5hbWV8YW5pbWF0aW9uLXBsYXktc3RhdGV8YW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbnxiYWNrZmFjZS12aXNpYmlsaXR5fGJhY2tncm91bmR8YmFja2dyb3VuZC1hdHRhY2htZW50fGJhY2tncm91bmQtYmxlbmQtbW9kZXxiYWNrZ3JvdW5kLWNsaXB8YmFja2dyb3VuZC1jb2xvcnxiYWNrZ3JvdW5kLWltYWdlfGJhY2tncm91bmQtb3JpZ2lufGJhY2tncm91bmQtcG9zaXRpb258YmFja2dyb3VuZC1yZXBlYXR8YmFja2dyb3VuZC1zaXplfGJvcmRlcnxib3JkZXItYm90dG9tfGJvcmRlci1ib3R0b20tY29sb3J8Ym9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1c3xib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1c3xib3JkZXItYm90dG9tLXN0eWxlfGJvcmRlci1ib3R0b20td2lkdGh8Ym9yZGVyLWNvbGxhcHNlfGJvcmRlci1jb2xvcnxib3JkZXItaW1hZ2V8Ym9yZGVyLWltYWdlLW91dHNldHxib3JkZXItaW1hZ2UtcmVwZWF0fGJvcmRlci1pbWFnZS1zbGljZXxib3JkZXItaW1hZ2Utc291cmNlfGJvcmRlci1pbWFnZS13aWR0aHxib3JkZXItbGVmdHxib3JkZXItbGVmdC1jb2xvcnxib3JkZXItbGVmdC1zdHlsZXxib3JkZXItbGVmdC13aWR0aHxib3JkZXItcmFkaXVzfGJvcmRlci1yaWdodHxib3JkZXItcmlnaHQtY29sb3J8Ym9yZGVyLXJpZ2h0LXN0eWxlfGJvcmRlci1yaWdodC13aWR0aHxib3JkZXItc3BhY2luZ3xib3JkZXItc3R5bGV8Ym9yZGVyLXRvcHxib3JkZXItdG9wLWNvbG9yfGJvcmRlci10b3AtbGVmdC1yYWRpdXN8Ym9yZGVyLXRvcC1yaWdodC1yYWRpdXN8Ym9yZGVyLXRvcC1zdHlsZXxib3JkZXItdG9wLXdpZHRofGJvcmRlci13aWR0aHxib3R0b218Ym94LXNoYWRvd3xib3gtc2l6aW5nfGNhcHRpb24tc2lkZXxjbGVhcnxjbGlwfGNvbG9yfGNvbHVtbi1jb3VudHxjb2x1bW4tZmlsbHxjb2x1bW4tZ2FwfGNvbHVtbi1ydWxlfGNvbHVtbi1ydWxlLWNvbG9yfGNvbHVtbi1ydWxlLXN0eWxlfGNvbHVtbi1ydWxlLXdpZHRofGNvbHVtbi1zcGFufGNvbHVtbi13aWR0aHxjb2x1bW5zfGNvbnRlbnR8Y291bnRlci1pbmNyZW1lbnR8Y291bnRlci1yZXNldHxjdXJzb3J8ZGlyZWN0aW9ufGRpc3BsYXl8ZW1wdHktY2VsbHN8ZmlsdGVyfGZsZXh8ZmxleC1iYXNpc3xmbGV4LWRpcmVjdGlvbnxmbGV4LWZsb3d8ZmxleC1ncm93fGZsZXgtc2hyaW5rfGZsZXgtd3JhcHxmbG9hdHxmb250fGZvbnQtZmFtaWx5fGZvbnQtc2l6ZXxmb250LXNpemUtYWRqdXN0fGZvbnQtc3RyZXRjaHxmb250LXN0eWxlfGZvbnQtdmFyaWFudHxmb250LXdlaWdodHxoYW5naW5nLXB1bmN0dWF0aW9ufGhlaWdodHxqdXN0aWZ5LWNvbnRlbnR8bGVmdHxsZXR0ZXItc3BhY2luZ3xsaW5lLWhlaWdodHxsaXN0LXN0eWxlfGxpc3Qtc3R5bGUtaW1hZ2V8bGlzdC1zdHlsZS1wb3NpdGlvbnxsaXN0LXN0eWxlLXR5cGV8bWFyZ2lufG1hcmdpbi1ib3R0b218bWFyZ2luLWxlZnR8bWFyZ2luLXJpZ2h0fG1hcmdpbi10b3B8bWF4LWhlaWdodHxtYXgtd2lkdGh8bWF4LXpvb218bWluLWhlaWdodHxtaW4td2lkdGh8bWluLXpvb218bmF2LWRvd258bmF2LWluZGV4fG5hdi1sZWZ0fG5hdi1yaWdodHxuYXYtdXB8b3BhY2l0eXxvcmRlcnxvdXRsaW5lfG91dGxpbmUtY29sb3J8b3V0bGluZS1vZmZzZXR8b3V0bGluZS1zdHlsZXxvdXRsaW5lLXdpZHRofG92ZXJmbG93fG92ZXJmbG93LXh8b3ZlcmZsb3cteXxwYWRkaW5nfHBhZGRpbmctYm90dG9tfHBhZGRpbmctbGVmdHxwYWRkaW5nLXJpZ2h0fHBhZGRpbmctdG9wfHBhZ2UtYnJlYWstYWZ0ZXJ8cGFnZS1icmVhay1iZWZvcmV8cGFnZS1icmVhay1pbnNpZGV8cGVyc3BlY3RpdmV8cGVyc3BlY3RpdmUtb3JpZ2lufHBvc2l0aW9ufHF1b3Rlc3xyZXNpemV8cmlnaHR8dGFiLXNpemV8dGFibGUtbGF5b3V0fHRleHQtYWxpZ258dGV4dC1hbGlnbi1sYXN0fHRleHQtZGVjb3JhdGlvbnx0ZXh0LWRlY29yYXRpb24tY29sb3J8dGV4dC1kZWNvcmF0aW9uLWxpbmV8dGV4dC1kZWNvcmF0aW9uLXN0eWxlfHRleHQtaW5kZW50fHRleHQtanVzdGlmeXx0ZXh0LW92ZXJmbG93fHRleHQtc2hhZG93fHRleHQtdHJhbnNmb3JtfHRvcHx0cmFuc2Zvcm18dHJhbnNmb3JtLW9yaWdpbnx0cmFuc2Zvcm0tc3R5bGV8dHJhbnNpdGlvbnx0cmFuc2l0aW9uLWRlbGF5fHRyYW5zaXRpb24tZHVyYXRpb258dHJhbnNpdGlvbi1wcm9wZXJ0eXx0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbnx1bmljb2RlLWJpZGl8dXNlci1zZWxlY3R8dXNlci16b29tfHZlcnRpY2FsLWFsaWdufHZpc2liaWxpdHl8d2hpdGUtc3BhY2V8d2lkdGh8d29yZC1icmVha3x3b3JkLXNwYWNpbmd8d29yZC13cmFwfHotaW5kZXhcIjtcbnZhciBzdXBwb3J0RnVuY3Rpb24gPSBleHBvcnRzLnN1cHBvcnRGdW5jdGlvbiA9IFwicmdifHJnYmF8dXJsfGF0dHJ8Y291bnRlcnxjb3VudGVyc1wiO1xudmFyIHN1cHBvcnRDb25zdGFudCA9IGV4cG9ydHMuc3VwcG9ydENvbnN0YW50ID0gXCJhYnNvbHV0ZXxhZnRlci1lZGdlfGFmdGVyfGFsbC1zY3JvbGx8YWxsfGFscGhhYmV0aWN8YWx3YXlzfGFudGlhbGlhc2VkfGFybWVuaWFufGF1dG98YXZvaWQtY29sdW1ufGF2b2lkLXBhZ2V8YXZvaWR8YmFsYW5jZXxiYXNlbGluZXxiZWZvcmUtZWRnZXxiZWZvcmV8YmVsb3d8YmlkaS1vdmVycmlkZXxibG9jay1saW5lLWhlaWdodHxibG9ja3xib2xkfGJvbGRlcnxib3JkZXItYm94fGJvdGh8Ym90dG9tfGJveHxicmVhay1hbGx8YnJlYWstd29yZHxjYXBpdGFsaXplfGNhcHMtaGVpZ2h0fGNhcHRpb258Y2VudGVyfGNlbnRyYWx8Y2hhcnxjaXJjbGV8Y2prLWlkZW9ncmFwaGljfGNsb25lfGNsb3NlLXF1b3RlfGNvbC1yZXNpemV8Y29sbGFwc2V8Y29sdW1ufGNvbnNpZGVyLXNoaWZ0c3xjb250YWlufGNvbnRlbnQtYm94fGNvdmVyfGNyb3NzaGFpcnxjdWJpYy1iZXppZXJ8ZGFzaGVkfGRlY2ltYWwtbGVhZGluZy16ZXJvfGRlY2ltYWx8ZGVmYXVsdHxkaXNhYmxlZHxkaXNjfGRpc3JlZ2FyZC1zaGlmdHN8ZGlzdHJpYnV0ZS1hbGwtbGluZXN8ZGlzdHJpYnV0ZS1sZXR0ZXJ8ZGlzdHJpYnV0ZS1zcGFjZXxkaXN0cmlidXRlfGRvdHRlZHxkb3VibGV8ZS1yZXNpemV8ZWFzZS1pbnxlYXNlLWluLW91dHxlYXNlLW91dHxlYXNlfGVsbGlwc2lzfGVuZHxleGNsdWRlLXJ1Ynl8ZmxleC1lbmR8ZmxleC1zdGFydHxmaWxsfGZpeGVkfGdlb3JnaWFufGdseXBoc3xncmlkLWhlaWdodHxncm9vdmV8aGFuZHxoYW5naW5nfGhlYnJld3xoZWxwfGhpZGRlbnxoaXJhZ2FuYS1pcm9oYXxoaXJhZ2FuYXxob3Jpem9udGFsfGljb258aWRlb2dyYXBoLWFscGhhfGlkZW9ncmFwaC1udW1lcmljfGlkZW9ncmFwaC1wYXJlbnRoZXNpc3xpZGVvZ3JhcGgtc3BhY2V8aWRlb2dyYXBoaWN8aW5hY3RpdmV8aW5jbHVkZS1ydWJ5fGluaGVyaXR8aW5pdGlhbHxpbmxpbmUtYmxvY2t8aW5saW5lLWJveHxpbmxpbmUtbGluZS1oZWlnaHR8aW5saW5lLXRhYmxlfGlubGluZXxpbnNldHxpbnNpZGV8aW50ZXItaWRlb2dyYXBofGludGVyLXdvcmR8aW52ZXJ0fGl0YWxpY3xqdXN0aWZ5fGthdGFrYW5hLWlyb2hhfGthdGFrYW5hfGtlZXAtYWxsfGxhc3R8bGVmdHxsaWdodGVyfGxpbmUtZWRnZXxsaW5lLXRocm91Z2h8bGluZXxsaW5lYXJ8bGlzdC1pdGVtfGxvY2FsfGxvb3NlfGxvd2VyLWFscGhhfGxvd2VyLWdyZWVrfGxvd2VyLWxhdGlufGxvd2VyLXJvbWFufGxvd2VyY2FzZXxsci10YnxsdHJ8bWF0aGVtYXRpY2FsfG1heC1oZWlnaHR8bWF4LXNpemV8bWVkaXVtfG1lbnV8bWVzc2FnZS1ib3h8bWlkZGxlfG1vdmV8bi1yZXNpemV8bmUtcmVzaXplfG5ld3NwYXBlcnxuby1jaGFuZ2V8bm8tY2xvc2UtcXVvdGV8bm8tZHJvcHxuby1vcGVuLXF1b3RlfG5vLXJlcGVhdHxub25lfG5vcm1hbHxub3QtYWxsb3dlZHxub3dyYXB8bnctcmVzaXplfG9ibGlxdWV8b3Blbi1xdW90ZXxvdXRzZXR8b3V0c2lkZXxvdmVybGluZXxwYWRkaW5nLWJveHxwYWdlfHBvaW50ZXJ8cHJlLWxpbmV8cHJlLXdyYXB8cHJlfHByZXNlcnZlLTNkfHByb2dyZXNzfHJlbGF0aXZlfHJlcGVhdC14fHJlcGVhdC15fHJlcGVhdHxyZXBsYWNlZHxyZXNldC1zaXplfHJpZGdlfHJpZ2h0fHJvdW5kfHJvdy1yZXNpemV8cnRsfHMtcmVzaXplfHNjcm9sbHxzZS1yZXNpemV8c2VwYXJhdGV8c2xpY2V8c21hbGwtY2Fwc3xzbWFsbC1jYXB0aW9ufHNvbGlkfHNwYWNlfHNxdWFyZXxzdGFydHxzdGF0aWN8c3RhdHVzLWJhcnxzdGVwLWVuZHxzdGVwLXN0YXJ0fHN0ZXBzfHN0cmV0Y2h8c3RyaWN0fHN1YnxzdXBlcnxzdy1yZXNpemV8dGFibGUtY2FwdGlvbnx0YWJsZS1jZWxsfHRhYmxlLWNvbHVtbi1ncm91cHx0YWJsZS1jb2x1bW58dGFibGUtZm9vdGVyLWdyb3VwfHRhYmxlLWhlYWRlci1ncm91cHx0YWJsZS1yb3ctZ3JvdXB8dGFibGUtcm93fHRhYmxlfHRiLXJsfHRleHQtYWZ0ZXItZWRnZXx0ZXh0LWJlZm9yZS1lZGdlfHRleHQtYm90dG9tfHRleHQtc2l6ZXx0ZXh0LXRvcHx0ZXh0fHRoaWNrfHRoaW58dHJhbnNwYXJlbnR8dW5kZXJsaW5lfHVwcGVyLWFscGhhfHVwcGVyLWxhdGlufHVwcGVyLXJvbWFufHVwcGVyY2FzZXx1c2Utc2NyaXB0fHZlcnRpY2FsLWlkZW9ncmFwaGljfHZlcnRpY2FsLXRleHR8dmlzaWJsZXx3LXJlc2l6ZXx3YWl0fHdoaXRlc3BhY2V8ei1pbmRleHx6ZXJvfHpvb21cIjtcbnZhciBzdXBwb3J0Q29uc3RhbnRDb2xvciA9IGV4cG9ydHMuc3VwcG9ydENvbnN0YW50Q29sb3IgPSBcImFsaWNlYmx1ZXxhbnRpcXVld2hpdGV8YXF1YXxhcXVhbWFyaW5lfGF6dXJlfGJlaWdlfGJpc3F1ZXxibGFja3xibGFuY2hlZGFsbW9uZHxibHVlfGJsdWV2aW9sZXR8YnJvd258YnVybHl3b29kfGNhZGV0Ymx1ZXxjaGFydHJldXNlfGNob2NvbGF0ZXxjb3JhbHxjb3JuZmxvd2VyYmx1ZXxjb3Juc2lsa3xjcmltc29ufGN5YW58ZGFya2JsdWV8ZGFya2N5YW58ZGFya2dvbGRlbnJvZHxkYXJrZ3JheXxkYXJrZ3JlZW58ZGFya2dyZXl8ZGFya2toYWtpfGRhcmttYWdlbnRhfGRhcmtvbGl2ZWdyZWVufGRhcmtvcmFuZ2V8ZGFya29yY2hpZHxkYXJrcmVkfGRhcmtzYWxtb258ZGFya3NlYWdyZWVufGRhcmtzbGF0ZWJsdWV8ZGFya3NsYXRlZ3JheXxkYXJrc2xhdGVncmV5fGRhcmt0dXJxdW9pc2V8ZGFya3Zpb2xldHxkZWVwcGlua3xkZWVwc2t5Ymx1ZXxkaW1ncmF5fGRpbWdyZXl8ZG9kZ2VyYmx1ZXxmaXJlYnJpY2t8ZmxvcmFsd2hpdGV8Zm9yZXN0Z3JlZW58ZnVjaHNpYXxnYWluc2Jvcm98Z2hvc3R3aGl0ZXxnb2xkfGdvbGRlbnJvZHxncmF5fGdyZWVufGdyZWVueWVsbG93fGdyZXl8aG9uZXlkZXd8aG90cGlua3xpbmRpYW5yZWR8aW5kaWdvfGl2b3J5fGtoYWtpfGxhdmVuZGVyfGxhdmVuZGVyYmx1c2h8bGF3bmdyZWVufGxlbW9uY2hpZmZvbnxsaWdodGJsdWV8bGlnaHRjb3JhbHxsaWdodGN5YW58bGlnaHRnb2xkZW5yb2R5ZWxsb3d8bGlnaHRncmF5fGxpZ2h0Z3JlZW58bGlnaHRncmV5fGxpZ2h0cGlua3xsaWdodHNhbG1vbnxsaWdodHNlYWdyZWVufGxpZ2h0c2t5Ymx1ZXxsaWdodHNsYXRlZ3JheXxsaWdodHNsYXRlZ3JleXxsaWdodHN0ZWVsYmx1ZXxsaWdodHllbGxvd3xsaW1lfGxpbWVncmVlbnxsaW5lbnxtYWdlbnRhfG1hcm9vbnxtZWRpdW1hcXVhbWFyaW5lfG1lZGl1bWJsdWV8bWVkaXVtb3JjaGlkfG1lZGl1bXB1cnBsZXxtZWRpdW1zZWFncmVlbnxtZWRpdW1zbGF0ZWJsdWV8bWVkaXVtc3ByaW5nZ3JlZW58bWVkaXVtdHVycXVvaXNlfG1lZGl1bXZpb2xldHJlZHxtaWRuaWdodGJsdWV8bWludGNyZWFtfG1pc3R5cm9zZXxtb2NjYXNpbnxuYXZham93aGl0ZXxuYXZ5fG9sZGxhY2V8b2xpdmV8b2xpdmVkcmFifG9yYW5nZXxvcmFuZ2VyZWR8b3JjaGlkfHBhbGVnb2xkZW5yb2R8cGFsZWdyZWVufHBhbGV0dXJxdW9pc2V8cGFsZXZpb2xldHJlZHxwYXBheWF3aGlwfHBlYWNocHVmZnxwZXJ1fHBpbmt8cGx1bXxwb3dkZXJibHVlfHB1cnBsZXxyZWJlY2NhcHVycGxlfHJlZHxyb3N5YnJvd258cm95YWxibHVlfHNhZGRsZWJyb3dufHNhbG1vbnxzYW5keWJyb3dufHNlYWdyZWVufHNlYXNoZWxsfHNpZW5uYXxzaWx2ZXJ8c2t5Ymx1ZXxzbGF0ZWJsdWV8c2xhdGVncmF5fHNsYXRlZ3JleXxzbm93fHNwcmluZ2dyZWVufHN0ZWVsYmx1ZXx0YW58dGVhbHx0aGlzdGxlfHRvbWF0b3x0dXJxdW9pc2V8dmlvbGV0fHdoZWF0fHdoaXRlfHdoaXRlc21va2V8eWVsbG93fHllbGxvd2dyZWVuXCI7XG52YXIgc3VwcG9ydENvbnN0YW50Rm9udHMgPSBleHBvcnRzLnN1cHBvcnRDb25zdGFudEZvbnRzID0gXCJhcmlhbHxjZW50dXJ5fGNvbWljfGNvdXJpZXJ8Y3Vyc2l2ZXxmYW50YXN5fGdhcmFtb25kfGdlb3JnaWF8aGVsdmV0aWNhfGltcGFjdHxsdWNpZGF8c3ltYm9sfHN5c3RlbXx0YWhvbWF8dGltZXN8dHJlYnVjaGV0fHV0b3BpYXx2ZXJkYW5hfHdlYmRpbmdzfHNhbnMtc2VyaWZ8c2VyaWZ8bW9ub3NwYWNlXCI7XG5cbnZhciBudW1SZSA9IGV4cG9ydHMubnVtUmUgPSBcIlxcXFwtPyg/Oig/OlswLTldKyg/OlxcXFwuWzAtOV0rKT8pfCg/OlxcXFwuWzAtOV0rKSlcIjtcbnZhciBwc2V1ZG9FbGVtZW50cyA9IGV4cG9ydHMucHNldWRvRWxlbWVudHMgPSBcIihcXFxcOispXFxcXGIoYWZ0ZXJ8YmVmb3JlfGZpcnN0LWxldHRlcnxmaXJzdC1saW5lfG1vei1zZWxlY3Rpb258c2VsZWN0aW9uKVxcXFxiXCI7XG52YXIgcHNldWRvQ2xhc3NlcyAgPSBleHBvcnRzLnBzZXVkb0NsYXNzZXMgPSAgXCIoOilcXFxcYihhY3RpdmV8Y2hlY2tlZHxkaXNhYmxlZHxlbXB0eXxlbmFibGVkfGZpcnN0LWNoaWxkfGZpcnN0LW9mLXR5cGV8Zm9jdXN8aG92ZXJ8aW5kZXRlcm1pbmF0ZXxpbnZhbGlkfGxhc3QtY2hpbGR8bGFzdC1vZi10eXBlfGxpbmt8bm90fG50aC1jaGlsZHxudGgtbGFzdC1jaGlsZHxudGgtbGFzdC1vZi10eXBlfG50aC1vZi10eXBlfG9ubHktY2hpbGR8b25seS1vZi10eXBlfHJlcXVpcmVkfHJvb3R8dGFyZ2V0fHZhbGlkfHZpc2l0ZWQpXFxcXGJcIjtcblxudmFyIENzc0hpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIga2V5d29yZE1hcHBlciA9IHRoaXMuY3JlYXRlS2V5d29yZE1hcHBlcih7XG4gICAgICAgIFwic3VwcG9ydC5mdW5jdGlvblwiOiBzdXBwb3J0RnVuY3Rpb24sXG4gICAgICAgIFwic3VwcG9ydC5jb25zdGFudFwiOiBzdXBwb3J0Q29uc3RhbnQsXG4gICAgICAgIFwic3VwcG9ydC50eXBlXCI6IHN1cHBvcnRUeXBlLFxuICAgICAgICBcInN1cHBvcnQuY29uc3RhbnQuY29sb3JcIjogc3VwcG9ydENvbnN0YW50Q29sb3IsXG4gICAgICAgIFwic3VwcG9ydC5jb25zdGFudC5mb250c1wiOiBzdXBwb3J0Q29uc3RhbnRGb250c1xuICAgIH0sIFwidGV4dFwiLCB0cnVlKTtcblxuICAgIC8vIHJlZ2V4cCBtdXN0IG5vdCBoYXZlIGNhcHR1cmluZyBwYXJlbnRoZXNlcy4gVXNlICg/OikgaW5zdGVhZC5cbiAgICAvLyByZWdleHBzIGFyZSBvcmRlcmVkIC0+IHRoZSBmaXJzdCBtYXRjaCBpcyB1c2VkXG5cbiAgICB0aGlzLiRydWxlcyA9IHtcbiAgICAgICAgXCJzdGFydFwiIDogW3tcbiAgICAgICAgICAgIGluY2x1ZGUgOiBbXCJzdHJpbmdzXCIsIFwidXJsXCIsIFwiY29tbWVudHNcIl1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwicGFyZW4ubHBhcmVuXCIsXG4gICAgICAgICAgICByZWdleDogXCJcXFxce1wiLFxuICAgICAgICAgICAgbmV4dDogIFwicnVsZXNldFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInBhcmVuLnJwYXJlblwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiXFxcXH1cIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIkAoPyF2aWV3cG9ydClcIixcbiAgICAgICAgICAgIG5leHQ6ICBcIm1lZGlhXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwia2V5d29yZFwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiI1thLXowLTktX10rXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwia2V5d29yZFwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiJVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInZhcmlhYmxlXCIsXG4gICAgICAgICAgICByZWdleDogXCJcXFxcLlthLXowLTktX10rXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nXCIsXG4gICAgICAgICAgICByZWdleDogXCI6W2EtejAtOS1fXStcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLFxuICAgICAgICAgICAgcmVnZXggOiBudW1SZVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudFwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiW2EtejAtOS1fXStcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjYXNlSW5zZW5zaXRpdmU6IHRydWVcbiAgICAgICAgfV0sXG5cbiAgICAgICAgXCJtZWRpYVwiOiBbe1xuICAgICAgICAgICAgaW5jbHVkZSA6IFtcInN0cmluZ3NcIiwgXCJ1cmxcIiwgXCJjb21tZW50c1wiXVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJwYXJlbi5scGFyZW5cIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFx7XCIsXG4gICAgICAgICAgICBuZXh0OiAgXCJzdGFydFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInBhcmVuLnJwYXJlblwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiXFxcXH1cIixcbiAgICAgICAgICAgIG5leHQ6ICBcInN0YXJ0XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nXCIsXG4gICAgICAgICAgICByZWdleDogXCI7XCIsXG4gICAgICAgICAgICBuZXh0OiAgXCJzdGFydFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcImtleXdvcmRcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIig/Om1lZGlhfHN1cHBvcnRzfGRvY3VtZW50fGNoYXJzZXR8aW1wb3J0fG5hbWVzcGFjZXxtZWRpYXxzdXBwb3J0c3xkb2N1bWVudFwiXG4gICAgICAgICAgICAgICAgKyBcInxwYWdlfGZvbnR8a2V5ZnJhbWVzfHZpZXdwb3J0fGNvdW50ZXItc3R5bGV8Zm9udC1mZWF0dXJlLXZhbHVlc1wiXG4gICAgICAgICAgICAgICAgKyBcInxzd2FzaHxvcm5hbWVudHN8YW5ub3RhdGlvbnxzdHlsaXN0aWN8c3R5bGVzZXR8Y2hhcmFjdGVyLXZhcmlhbnQpXCJcbiAgICAgICAgfV0sXG5cbiAgICAgICAgXCJjb21tZW50c1wiIDogW3tcbiAgICAgICAgICAgIHRva2VuOiBcImNvbW1lbnRcIiwgLy8gbXVsdGkgbGluZSBjb21tZW50XG4gICAgICAgICAgICByZWdleDogXCJcXFxcL1xcXFwqXCIsXG4gICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwqXFxcXC9cIixcbiAgICAgICAgICAgICAgICBuZXh0IDogXCJwb3BcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbiA6IFwiY29tbWVudFwiXG4gICAgICAgICAgICB9XVxuICAgICAgICB9XSxcblxuICAgICAgICBcInJ1bGVzZXRcIiA6IFt7XG4gICAgICAgICAgICByZWdleCA6IFwiLSh3ZWJraXR8bXN8bW96fG8pLVwiLFxuICAgICAgICAgICAgdG9rZW4gOiBcInRleHRcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwicHVuY3R1YXRpb24ub3BlcmF0b3JcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJbOjtdXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInBhcmVuLnJwYXJlblwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIlxcXFx9XCIsXG4gICAgICAgICAgICBuZXh0IDogXCJzdGFydFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGluY2x1ZGUgOiBbXCJzdHJpbmdzXCIsIFwidXJsXCIsIFwiY29tbWVudHNcIl1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBbXCJjb25zdGFudC5udW1lcmljXCIsIFwia2V5d29yZFwiXSxcbiAgICAgICAgICAgIHJlZ2V4IDogXCIoXCIgKyBudW1SZSArIFwiKShjaHxjbXxkZWd8ZW18ZXh8ZnJ8Z2R8Z3JhZHxIenxpbnxrSHp8bW18bXN8cGN8cHR8cHh8cmFkfHJlbXxzfHR1cm58dmh8dm1heHx2bWlufHZtfHZ3fCUpXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIixcbiAgICAgICAgICAgIHJlZ2V4IDogbnVtUmVcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIiwgIC8vIGhleDYgY29sb3JcbiAgICAgICAgICAgIHJlZ2V4IDogXCIjW2EtZjAtOV17Nn1cIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLCAvLyBoZXgzIGNvbG9yXG4gICAgICAgICAgICByZWdleCA6IFwiI1thLWYwLTldezN9XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBbXCJwdW5jdHVhdGlvblwiLCBcImVudGl0eS5vdGhlci5hdHRyaWJ1dGUtbmFtZS5wc2V1ZG8tZWxlbWVudC5jc3NcIl0sXG4gICAgICAgICAgICByZWdleCA6IHBzZXVkb0VsZW1lbnRzXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogW1wicHVuY3R1YXRpb25cIiwgXCJlbnRpdHkub3RoZXIuYXR0cmlidXRlLW5hbWUucHNldWRvLWNsYXNzLmNzc1wiXSxcbiAgICAgICAgICAgIHJlZ2V4IDogcHNldWRvQ2xhc3Nlc1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpbmNsdWRlOiBcInVybFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDoga2V5d29yZE1hcHBlcixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcLT9bYS16QS1aX11bYS16QS1aMC05X1xcXFwtXSpcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjYXNlSW5zZW5zaXRpdmU6IHRydWVcbiAgICAgICAgfV0sXG5cbiAgICAgICAgdXJsOiBbe1xuICAgICAgICAgICAgdG9rZW4gOiBcInN1cHBvcnQuZnVuY3Rpb25cIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCIoPzp1cmwoOj8tcHJlZml4KT98ZG9tYWlufHJlZ2V4cClcXFxcKFwiLFxuICAgICAgICAgICAgcHVzaDogW3tcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3VwcG9ydC5mdW5jdGlvblwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcKVwiLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcInBvcFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInN0cmluZ1wiXG4gICAgICAgICAgICB9XVxuICAgICAgICB9XSxcblxuICAgICAgICBzdHJpbmdzOiBbe1xuICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZy5zdGFydFwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIidcIixcbiAgICAgICAgICAgIHB1c2ggOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmcuZW5kXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIid8JFwiLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpbmNsdWRlIDogXCJlc2NhcGVzXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvXFxcXCQvLFxuICAgICAgICAgICAgICAgIGNvbnN1bWVMaW5lRW5kOiB0cnVlXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInN0cmluZ1wiXG4gICAgICAgICAgICB9XVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nLnN0YXJ0XCIsXG4gICAgICAgICAgICByZWdleCA6ICdcIicsXG4gICAgICAgICAgICBwdXNoIDogW3tcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nLmVuZFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogJ1wifCQnLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpbmNsdWRlIDogXCJlc2NhcGVzXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvXFxcXCQvLFxuICAgICAgICAgICAgICAgIGNvbnN1bWVMaW5lRW5kOiB0cnVlXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInN0cmluZ1wiXG4gICAgICAgICAgICB9XVxuICAgICAgICB9XSxcbiAgICAgICAgZXNjYXBlczogW3tcbiAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIixcbiAgICAgICAgICAgIHJlZ2V4IDogL1xcXFwoW2EtZkEtRlxcZF17MSw2fXxbXmEtZkEtRlxcZF0pL1xuICAgICAgICB9XVxuXG4gICAgfTtcblxuICAgIHRoaXMubm9ybWFsaXplUnVsZXMoKTtcbn07XG5cbm9vcC5pbmhlcml0cyhDc3NIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuZXhwb3J0cy5Dc3NIaWdobGlnaHRSdWxlcyA9IENzc0hpZ2hsaWdodFJ1bGVzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBsYW5nID0gcmVxdWlyZShcIi4uL2xpYi9sYW5nXCIpO1xudmFyIENzc0hpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vY3NzX2hpZ2hsaWdodF9ydWxlc1wiKS5Dc3NIaWdobGlnaHRSdWxlcztcbnZhciBKYXZhU2NyaXB0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9qYXZhc2NyaXB0X2hpZ2hsaWdodF9ydWxlc1wiKS5KYXZhU2NyaXB0SGlnaGxpZ2h0UnVsZXM7XG52YXIgWG1sSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi94bWxfaGlnaGxpZ2h0X3J1bGVzXCIpLlhtbEhpZ2hsaWdodFJ1bGVzO1xuXG52YXIgdGFnTWFwID0gbGFuZy5jcmVhdGVNYXAoe1xuICAgIGEgICAgICAgICAgIDogJ2FuY2hvcicsXG4gICAgYnV0dG9uIFx0ICAgIDogJ2Zvcm0nLFxuICAgIGZvcm0gICAgICAgIDogJ2Zvcm0nLFxuICAgIGltZyAgICAgICAgIDogJ2ltYWdlJyxcbiAgICBpbnB1dCAgICAgICA6ICdmb3JtJyxcbiAgICBsYWJlbCAgICAgICA6ICdmb3JtJyxcbiAgICBvcHRpb24gICAgICA6ICdmb3JtJyxcbiAgICBzY3JpcHQgICAgICA6ICdzY3JpcHQnLFxuICAgIHNlbGVjdCAgICAgIDogJ2Zvcm0nLFxuICAgIHRleHRhcmVhICAgIDogJ2Zvcm0nLFxuICAgIHN0eWxlICAgICAgIDogJ3N0eWxlJyxcbiAgICB0YWJsZSAgICAgICA6ICd0YWJsZScsXG4gICAgdGJvZHkgICAgICAgOiAndGFibGUnLFxuICAgIHRkICAgICAgICAgIDogJ3RhYmxlJyxcbiAgICB0Zm9vdCAgICAgICA6ICd0YWJsZScsXG4gICAgdGggICAgICAgICAgOiAndGFibGUnLFxuICAgIHRyICAgICAgICAgIDogJ3RhYmxlJ1xufSk7XG5cbnZhciBIdG1sSGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbigpIHtcbiAgICBYbWxIaWdobGlnaHRSdWxlcy5jYWxsKHRoaXMpO1xuXG4gICAgdGhpcy5hZGRSdWxlcyh7XG4gICAgICAgIGF0dHJpYnV0ZXM6IFt7XG4gICAgICAgICAgICBpbmNsdWRlIDogXCJ0YWdfd2hpdGVzcGFjZVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJlbnRpdHkub3RoZXIuYXR0cmlidXRlLW5hbWUueG1sXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiWy1fYS16QS1aMC05Oi5dK1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkLm9wZXJhdG9yLmF0dHJpYnV0ZS1lcXVhbHMueG1sXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiPVwiLFxuICAgICAgICAgICAgcHVzaCA6IFt7XG4gICAgICAgICAgICAgICAgaW5jbHVkZTogXCJ0YWdfd2hpdGVzcGFjZVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZy51bnF1b3RlZC5hdHRyaWJ1dGUtdmFsdWUuaHRtbFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJbXjw+PSdcXFwiYFxcXFxzXStcIixcbiAgICAgICAgICAgICAgICBuZXh0IDogXCJwb3BcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJlbXB0eVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcIixcbiAgICAgICAgICAgICAgICBuZXh0IDogXCJwb3BcIlxuICAgICAgICAgICAgfV1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaW5jbHVkZSA6IFwiYXR0cmlidXRlX3ZhbHVlXCJcbiAgICAgICAgfV0sXG4gICAgICAgIHRhZzogW3tcbiAgICAgICAgICAgIHRva2VuIDogZnVuY3Rpb24oc3RhcnQsIHRhZykge1xuICAgICAgICAgICAgICAgIHZhciBncm91cCA9IHRhZ01hcFt0YWddO1xuICAgICAgICAgICAgICAgIHJldHVybiBbXCJtZXRhLnRhZy5wdW5jdHVhdGlvbi5cIiArIChzdGFydCA9PSBcIjxcIiA/IFwiXCIgOiBcImVuZC1cIikgKyBcInRhZy1vcGVuLnhtbFwiLFxuICAgICAgICAgICAgICAgICAgICBcIm1ldGEudGFnXCIgKyAoZ3JvdXAgPyBcIi5cIiArIGdyb3VwIDogXCJcIikgKyBcIi50YWctbmFtZS54bWxcIl07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVnZXggOiBcIig8Lz8pKFstX2EtekEtWjAtOTouXSspXCIsXG4gICAgICAgICAgICBuZXh0OiBcInRhZ19zdHVmZlwiXG4gICAgICAgIH1dLFxuICAgICAgICB0YWdfc3R1ZmY6IFtcbiAgICAgICAgICAgIHtpbmNsdWRlIDogXCJhdHRyaWJ1dGVzXCJ9LFxuICAgICAgICAgICAge3Rva2VuIDogXCJtZXRhLnRhZy5wdW5jdHVhdGlvbi50YWctY2xvc2UueG1sXCIsIHJlZ2V4IDogXCIvPz5cIiwgbmV4dCA6IFwic3RhcnRcIn1cbiAgICAgICAgXVxuICAgIH0pO1xuXG4gICAgdGhpcy5lbWJlZFRhZ1J1bGVzKENzc0hpZ2hsaWdodFJ1bGVzLCBcImNzcy1cIiwgXCJzdHlsZVwiKTtcbiAgICB0aGlzLmVtYmVkVGFnUnVsZXMobmV3IEphdmFTY3JpcHRIaWdobGlnaHRSdWxlcyh7anN4OiBmYWxzZX0pLmdldFJ1bGVzKCksIFwianMtXCIsIFwic2NyaXB0XCIpO1xuXG4gICAgaWYgKHRoaXMuY29uc3RydWN0b3IgPT09IEh0bWxIaWdobGlnaHRSdWxlcylcbiAgICAgICAgdGhpcy5ub3JtYWxpemVSdWxlcygpO1xufTtcblxub29wLmluaGVyaXRzKEh0bWxIaWdobGlnaHRSdWxlcywgWG1sSGlnaGxpZ2h0UnVsZXMpO1xuXG5leHBvcnRzLkh0bWxIaWdobGlnaHRSdWxlcyA9IEh0bWxIaWdobGlnaHRSdWxlcztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xuXG52YXIgWG1sSGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbihub3JtYWxpemUpIHtcbiAgICAvLyBodHRwOi8vd3d3LnczLm9yZy9UUi9SRUMteG1sLyNOVC1OYW1lQ2hhclxuICAgIC8vIE5hbWVTdGFydENoYXJcdCAgIDo6PSAgIFx0XCI6XCIgfCBbQS1aXSB8IFwiX1wiIHwgW2Etel0gfCBbI3hDMC0jeEQ2XSB8IFsjeEQ4LSN4RjZdIHwgWyN4RjgtI3gyRkZdIHwgWyN4MzcwLSN4MzdEXSB8IFsjeDM3Ri0jeDFGRkZdIHwgWyN4MjAwQy0jeDIwMERdIHwgWyN4MjA3MC0jeDIxOEZdIHwgWyN4MkMwMC0jeDJGRUZdIHwgWyN4MzAwMS0jeEQ3RkZdIHwgWyN4RjkwMC0jeEZEQ0ZdIHwgWyN4RkRGMC0jeEZGRkRdIHwgWyN4MTAwMDAtI3hFRkZGRl1cbiAgICAvLyBOYW1lQ2hhclx0ICAgOjo9ICAgXHROYW1lU3RhcnRDaGFyIHwgXCItXCIgfCBcIi5cIiB8IFswLTldIHwgI3hCNyB8IFsjeDAzMDAtI3gwMzZGXSB8IFsjeDIwM0YtI3gyMDQwXVxuICAgIHZhciB0YWdSZWdleCA9IFwiW186YS16QS1aXFx4YzAtXFx1ZmZmZl1bLV86LmEtekEtWjAtOVxceGMwLVxcdWZmZmZdKlwiO1xuXG4gICAgdGhpcy4kcnVsZXMgPSB7XG4gICAgICAgIHN0YXJ0IDogW1xuICAgICAgICAgICAge3Rva2VuIDogXCJzdHJpbmcuY2RhdGEueG1sXCIsIHJlZ2V4IDogXCI8XFxcXCFcXFxcW0NEQVRBXFxcXFtcIiwgbmV4dCA6IFwiY2RhdGFcIn0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBbXCJwdW5jdHVhdGlvbi5pbnN0cnVjdGlvbi54bWxcIiwgXCJrZXl3b3JkLmluc3RydWN0aW9uLnhtbFwiXSxcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiKDxcXFxcPykoXCIgKyB0YWdSZWdleCArIFwiKVwiLCBuZXh0IDogXCJwcm9jZXNzaW5nX2luc3RydWN0aW9uXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7dG9rZW4gOiBcImNvbW1lbnQuc3RhcnQueG1sXCIsIHJlZ2V4IDogXCI8XFxcXCEtLVwiLCBuZXh0IDogXCJjb21tZW50XCJ9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogW1wieG1sLXBlLmRvY3R5cGUueG1sXCIsIFwieG1sLXBlLmRvY3R5cGUueG1sXCJdLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIoPFxcXFwhKShET0NUWVBFKSg/PVtcXFxcc10pXCIsIG5leHQgOiBcImRvY3R5cGVcIiwgY2FzZUluc2Vuc2l0aXZlOiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge2luY2x1ZGUgOiBcInRhZ1wifSxcbiAgICAgICAgICAgIHt0b2tlbiA6IFwidGV4dC5lbmQtdGFnLW9wZW4ueG1sXCIsIHJlZ2V4OiBcIjwvXCJ9LFxuICAgICAgICAgICAge3Rva2VuIDogXCJ0ZXh0LnRhZy1vcGVuLnhtbFwiLCByZWdleDogXCI8XCJ9LFxuICAgICAgICAgICAge2luY2x1ZGUgOiBcInJlZmVyZW5jZVwifSxcbiAgICAgICAgICAgIHtkZWZhdWx0VG9rZW4gOiBcInRleHQueG1sXCJ9XG4gICAgICAgIF0sXG5cbiAgICAgICAgcHJvY2Vzc2luZ19pbnN0cnVjdGlvbiA6IFt7XG4gICAgICAgICAgICB0b2tlbiA6IFwiZW50aXR5Lm90aGVyLmF0dHJpYnV0ZS1uYW1lLmRlY2wtYXR0cmlidXRlLW5hbWUueG1sXCIsXG4gICAgICAgICAgICByZWdleCA6IHRhZ1JlZ2V4XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkLm9wZXJhdG9yLmRlY2wtYXR0cmlidXRlLWVxdWFscy54bWxcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCI9XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaW5jbHVkZTogXCJ3aGl0ZXNwYWNlXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaW5jbHVkZTogXCJzdHJpbmdcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwicHVuY3R1YXRpb24ueG1sLWRlY2wueG1sXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiXFxcXD8+XCIsXG4gICAgICAgICAgICBuZXh0IDogXCJzdGFydFwiXG4gICAgICAgIH1dLFxuXG4gICAgICAgIGRvY3R5cGUgOiBbXG4gICAgICAgICAgICB7aW5jbHVkZSA6IFwid2hpdGVzcGFjZVwifSxcbiAgICAgICAgICAgIHtpbmNsdWRlIDogXCJzdHJpbmdcIn0sXG4gICAgICAgICAgICB7dG9rZW4gOiBcInhtbC1wZS5kb2N0eXBlLnhtbFwiLCByZWdleCA6IFwiPlwiLCBuZXh0IDogXCJzdGFydFwifSxcbiAgICAgICAgICAgIHt0b2tlbiA6IFwieG1sLXBlLnhtbFwiLCByZWdleCA6IFwiWy1fYS16QS1aMC05Ol0rXCJ9LFxuICAgICAgICAgICAge3Rva2VuIDogXCJwdW5jdHVhdGlvbi5pbnQtc3Vic2V0XCIsIHJlZ2V4IDogXCJcXFxcW1wiLCBwdXNoIDogXCJpbnRfc3Vic2V0XCJ9XG4gICAgICAgIF0sXG5cbiAgICAgICAgaW50X3N1YnNldCA6IFt7XG4gICAgICAgICAgICB0b2tlbiA6IFwidGV4dC54bWxcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxccytcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJwdW5jdHVhdGlvbi5pbnQtc3Vic2V0LnhtbFwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiXVwiLFxuICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFtcInB1bmN0dWF0aW9uLm1hcmt1cC1kZWNsLnhtbFwiLCBcImtleXdvcmQubWFya3VwLWRlY2wueG1sXCJdLFxuICAgICAgICAgICAgcmVnZXggOiBcIig8XFxcXCEpKFwiICsgdGFnUmVnZXggKyBcIilcIixcbiAgICAgICAgICAgIHB1c2ggOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFxzK1wiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJwdW5jdHVhdGlvbi5tYXJrdXAtZGVjbC54bWxcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiPlwiLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcInBvcFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge2luY2x1ZGUgOiBcInN0cmluZ1wifV1cbiAgICAgICAgfV0sXG5cbiAgICAgICAgY2RhdGEgOiBbXG4gICAgICAgICAgICB7dG9rZW4gOiBcInN0cmluZy5jZGF0YS54bWxcIiwgcmVnZXggOiBcIlxcXFxdXFxcXF0+XCIsIG5leHQgOiBcInN0YXJ0XCJ9LFxuICAgICAgICAgICAge3Rva2VuIDogXCJ0ZXh0LnhtbFwiLCByZWdleCA6IFwiXFxcXHMrXCJ9LFxuICAgICAgICAgICAge3Rva2VuIDogXCJ0ZXh0LnhtbFwiLCByZWdleCA6IFwiKD86W15cXFxcXV18XFxcXF0oPyFcXFxcXT4pKStcIn1cbiAgICAgICAgXSxcblxuICAgICAgICBjb21tZW50IDogW1xuICAgICAgICAgICAge3Rva2VuIDogXCJjb21tZW50LmVuZC54bWxcIiwgcmVnZXggOiBcIi0tPlwiLCBuZXh0IDogXCJzdGFydFwifSxcbiAgICAgICAgICAgIHtkZWZhdWx0VG9rZW4gOiBcImNvbW1lbnQueG1sXCJ9XG4gICAgICAgIF0sXG5cbiAgICAgICAgcmVmZXJlbmNlIDogW3tcbiAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGUucmVmZXJlbmNlLnhtbFwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIig/OiYjWzAtOV0rOyl8KD86JiN4WzAtOWEtZkEtRl0rOyl8KD86JlthLXpBLVowLTlfOlxcXFwuLV0rOylcIlxuICAgICAgICB9XSxcblxuICAgICAgICBhdHRyX3JlZmVyZW5jZSA6IFt7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlLnJlZmVyZW5jZS5hdHRyaWJ1dGUtdmFsdWUueG1sXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiKD86JiNbMC05XSs7KXwoPzomI3hbMC05YS1mQS1GXSs7KXwoPzomW2EtekEtWjAtOV86XFxcXC4tXSs7KVwiXG4gICAgICAgIH1dLFxuXG4gICAgICAgIHRhZyA6IFt7XG4gICAgICAgICAgICB0b2tlbiA6IFtcIm1ldGEudGFnLnB1bmN0dWF0aW9uLnRhZy1vcGVuLnhtbFwiLCBcIm1ldGEudGFnLnB1bmN0dWF0aW9uLmVuZC10YWctb3Blbi54bWxcIiwgXCJtZXRhLnRhZy50YWctbmFtZS54bWxcIl0sXG4gICAgICAgICAgICByZWdleCA6IFwiKD86KDwpfCg8LykpKCg/OlwiICsgdGFnUmVnZXggKyBcIjopP1wiICsgdGFnUmVnZXggKyBcIilcIixcbiAgICAgICAgICAgIG5leHQ6IFtcbiAgICAgICAgICAgICAgICB7aW5jbHVkZSA6IFwiYXR0cmlidXRlc1wifSxcbiAgICAgICAgICAgICAgICB7dG9rZW4gOiBcIm1ldGEudGFnLnB1bmN0dWF0aW9uLnRhZy1jbG9zZS54bWxcIiwgcmVnZXggOiBcIi8/PlwiLCBuZXh0IDogXCJzdGFydFwifVxuICAgICAgICAgICAgXVxuICAgICAgICB9XSxcblxuICAgICAgICB0YWdfd2hpdGVzcGFjZSA6IFtcbiAgICAgICAgICAgIHt0b2tlbiA6IFwidGV4dC50YWctd2hpdGVzcGFjZS54bWxcIiwgcmVnZXggOiBcIlxcXFxzK1wifVxuICAgICAgICBdLFxuICAgICAgICAvLyBmb3IgZG9jdHlwZSBhbmQgcHJvY2Vzc2luZyBpbnN0cnVjdGlvbnNcbiAgICAgICAgd2hpdGVzcGFjZSA6IFtcbiAgICAgICAgICAgIHt0b2tlbiA6IFwidGV4dC53aGl0ZXNwYWNlLnhtbFwiLCByZWdleCA6IFwiXFxcXHMrXCJ9XG4gICAgICAgIF0sXG5cbiAgICAgICAgLy8gZm9yIGRvY3R5cGUgYW5kIHByb2Nlc3NpbmcgaW5zdHJ1Y3Rpb25zXG4gICAgICAgIHN0cmluZzogW3tcbiAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmcueG1sXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiJ1wiLFxuICAgICAgICAgICAgcHVzaCA6IFtcbiAgICAgICAgICAgICAgICB7dG9rZW4gOiBcInN0cmluZy54bWxcIiwgcmVnZXg6IFwiJ1wiLCBuZXh0OiBcInBvcFwifSxcbiAgICAgICAgICAgICAgICB7ZGVmYXVsdFRva2VuIDogXCJzdHJpbmcueG1sXCJ9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmcueG1sXCIsXG4gICAgICAgICAgICByZWdleCA6ICdcIicsXG4gICAgICAgICAgICBwdXNoIDogW1xuICAgICAgICAgICAgICAgIHt0b2tlbiA6IFwic3RyaW5nLnhtbFwiLCByZWdleDogJ1wiJywgbmV4dDogXCJwb3BcIn0sXG4gICAgICAgICAgICAgICAge2RlZmF1bHRUb2tlbiA6IFwic3RyaW5nLnhtbFwifVxuICAgICAgICAgICAgXVxuICAgICAgICB9XSxcblxuICAgICAgICBhdHRyaWJ1dGVzOiBbe1xuICAgICAgICAgICAgdG9rZW4gOiBcImVudGl0eS5vdGhlci5hdHRyaWJ1dGUtbmFtZS54bWxcIixcbiAgICAgICAgICAgIHJlZ2V4IDogdGFnUmVnZXhcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcImtleXdvcmQub3BlcmF0b3IuYXR0cmlidXRlLWVxdWFscy54bWxcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCI9XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaW5jbHVkZTogXCJ0YWdfd2hpdGVzcGFjZVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGluY2x1ZGU6IFwiYXR0cmlidXRlX3ZhbHVlXCJcbiAgICAgICAgfV0sXG5cbiAgICAgICAgYXR0cmlidXRlX3ZhbHVlOiBbe1xuICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZy5hdHRyaWJ1dGUtdmFsdWUueG1sXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiJ1wiLFxuICAgICAgICAgICAgcHVzaCA6IFtcbiAgICAgICAgICAgICAgICB7dG9rZW4gOiBcInN0cmluZy5hdHRyaWJ1dGUtdmFsdWUueG1sXCIsIHJlZ2V4OiBcIidcIiwgbmV4dDogXCJwb3BcIn0sXG4gICAgICAgICAgICAgICAge2luY2x1ZGUgOiBcImF0dHJfcmVmZXJlbmNlXCJ9LFxuICAgICAgICAgICAgICAgIHtkZWZhdWx0VG9rZW4gOiBcInN0cmluZy5hdHRyaWJ1dGUtdmFsdWUueG1sXCJ9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmcuYXR0cmlidXRlLXZhbHVlLnhtbFwiLFxuICAgICAgICAgICAgcmVnZXggOiAnXCInLFxuICAgICAgICAgICAgcHVzaCA6IFtcbiAgICAgICAgICAgICAgICB7dG9rZW4gOiBcInN0cmluZy5hdHRyaWJ1dGUtdmFsdWUueG1sXCIsIHJlZ2V4OiAnXCInLCBuZXh0OiBcInBvcFwifSxcbiAgICAgICAgICAgICAgICB7aW5jbHVkZSA6IFwiYXR0cl9yZWZlcmVuY2VcIn0sXG4gICAgICAgICAgICAgICAge2RlZmF1bHRUb2tlbiA6IFwic3RyaW5nLmF0dHJpYnV0ZS12YWx1ZS54bWxcIn1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfV1cbiAgICB9O1xuXG4gICAgaWYgKHRoaXMuY29uc3RydWN0b3IgPT09IFhtbEhpZ2hsaWdodFJ1bGVzKVxuICAgICAgICB0aGlzLm5vcm1hbGl6ZVJ1bGVzKCk7XG59O1xuXG5cbihmdW5jdGlvbigpIHtcblxuICAgIHRoaXMuZW1iZWRUYWdSdWxlcyA9IGZ1bmN0aW9uKEhpZ2hsaWdodFJ1bGVzLCBwcmVmaXgsIHRhZyl7XG4gICAgICAgIHRoaXMuJHJ1bGVzLnRhZy51bnNoaWZ0KHtcbiAgICAgICAgICAgIHRva2VuIDogW1wibWV0YS50YWcucHVuY3R1YXRpb24udGFnLW9wZW4ueG1sXCIsIFwibWV0YS50YWcuXCIgKyB0YWcgKyBcIi50YWctbmFtZS54bWxcIl0sXG4gICAgICAgICAgICByZWdleCA6IFwiKDwpKFwiICsgdGFnICsgXCIoPz1cXFxcc3w+fCQpKVwiLFxuICAgICAgICAgICAgbmV4dDogW1xuICAgICAgICAgICAgICAgIHtpbmNsdWRlIDogXCJhdHRyaWJ1dGVzXCJ9LFxuICAgICAgICAgICAgICAgIHt0b2tlbiA6IFwibWV0YS50YWcucHVuY3R1YXRpb24udGFnLWNsb3NlLnhtbFwiLCByZWdleCA6IFwiLz8+XCIsIG5leHQgOiBwcmVmaXggKyBcInN0YXJ0XCJ9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuJHJ1bGVzW3RhZyArIFwiLWVuZFwiXSA9IFtcbiAgICAgICAgICAgIHtpbmNsdWRlIDogXCJhdHRyaWJ1dGVzXCJ9LFxuICAgICAgICAgICAge3Rva2VuIDogXCJtZXRhLnRhZy5wdW5jdHVhdGlvbi50YWctY2xvc2UueG1sXCIsIHJlZ2V4IDogXCIvPz5cIiwgIG5leHQ6IFwic3RhcnRcIixcbiAgICAgICAgICAgICAgICBvbk1hdGNoIDogZnVuY3Rpb24odmFsdWUsIGN1cnJlbnRTdGF0ZSwgc3RhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhY2suc3BsaWNlKDApO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50b2tlbjtcbiAgICAgICAgICAgIH19XG4gICAgICAgIF07XG5cbiAgICAgICAgdGhpcy5lbWJlZFJ1bGVzKEhpZ2hsaWdodFJ1bGVzLCBwcmVmaXgsIFt7XG4gICAgICAgICAgICB0b2tlbjogW1wibWV0YS50YWcucHVuY3R1YXRpb24uZW5kLXRhZy1vcGVuLnhtbFwiLCBcIm1ldGEudGFnLlwiICsgdGFnICsgXCIudGFnLW5hbWUueG1sXCJdLFxuICAgICAgICAgICAgcmVnZXggOiBcIig8LykoXCIgKyB0YWcgKyBcIig/PVxcXFxzfD58JCkpXCIsXG4gICAgICAgICAgICBuZXh0OiB0YWcgKyBcIi1lbmRcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJzdHJpbmcuY2RhdGEueG1sXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiPFxcXFwhXFxcXFtDREFUQVxcXFxbXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nLmNkYXRhLnhtbFwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIlxcXFxdXFxcXF0+XCJcbiAgICAgICAgfV0pO1xuICAgIH07XG5cbn0pLmNhbGwoVGV4dEhpZ2hsaWdodFJ1bGVzLnByb3RvdHlwZSk7XG5cbm9vcC5pbmhlcml0cyhYbWxIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuZXhwb3J0cy5YbWxIaWdobGlnaHRSdWxlcyA9IFhtbEhpZ2hsaWdodFJ1bGVzO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9