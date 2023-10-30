"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[2420],{

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

/***/ 35090:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var BaseFoldMode = (__webpack_require__(15369).FoldMode);
var Range = (__webpack_require__(59082)/* .Range */ .e);

var FoldMode = exports.Z = function() {};
oop.inherits(FoldMode, BaseFoldMode);

(function() {
    this.commentBlock = function(session, row) {
        var re = /\S/;
        var line = session.getLine(row);
        var startLevel = line.search(re);
        if (startLevel == -1 || line[startLevel] != "#")
            return;

        var startColumn = line.length;
        var maxRow = session.getLength();
        var startRow = row;
        var endRow = row;

        while (++row < maxRow) {
            line = session.getLine(row);
            var level = line.search(re);

            if (level == -1)
                continue;

            if (line[level] != "#")
                break;

            endRow = row;
        }

        if (endRow > startRow) {
            var endColumn = session.getLine(endRow).length;
            return new Range(startRow, startColumn, endRow, endColumn);
        }
    };

    this.getFoldWidgetRange = function(session, foldStyle, row) {
        var range = this.indentationBlock(session, row);
        if (range)
            return range;

        range = this.commentBlock(session, row);
        if (range)
            return range;
    };

    // must return "" if there's no fold, to enable caching
    this.getFoldWidget = function(session, foldStyle, row) {
        var line = session.getLine(row);
        var indent = line.search(/\S/);
        var next = session.getLine(row + 1);
        var prev = session.getLine(row - 1);
        var prevIndent = prev.search(/\S/);
        var nextIndent = next.search(/\S/);

        if (indent == -1) {
            session.foldWidgets[row - 1] = prevIndent!= -1 && prevIndent < nextIndent ? "start" : "";
            return "";
        }

        // documentation comments
        if (prevIndent == -1) {
            if (indent == nextIndent && line[indent] == "#" && next[indent] == "#") {
                session.foldWidgets[row - 1] = "";
                session.foldWidgets[row + 1] = "";
                return "start";
            }
        } else if (prevIndent == indent && line[indent] == "#" && prev[indent] == "#") {
            if (session.getLine(row - 2).search(/\S/) == -1) {
                session.foldWidgets[row - 1] = "start";
                session.foldWidgets[row + 1] = "";
                return "";
            }
        }

        if (prevIndent!= -1 && prevIndent < indent)
            session.foldWidgets[row - 1] = "start";
        else
            session.foldWidgets[row - 1] = "";

        if (indent < nextIndent)
            return "start";
        else
            return "";
    };

}).call(FoldMode.prototype);


/***/ }),

/***/ 52420:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/*
  THIS FILE WAS AUTOGENERATED BY mode.tmpl.js
*/



var oop = __webpack_require__(89359);
var TextMode = (__webpack_require__(98030).Mode);
var StylusHighlightRules = (__webpack_require__(1770)/* .StylusHighlightRules */ .u);
var FoldMode = (__webpack_require__(35090)/* .FoldMode */ .Z);

var Mode = function() {
    this.HighlightRules = StylusHighlightRules;
    this.foldingRules = new FoldMode();
    this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, TextMode);

(function() {
    this.lineCommentStart = "//";
    this.blockComment = {start: "/*", end: "*/"};
    
    this.$id = "ace/mode/stylus";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 1770:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/*
  THIS FILE WAS AUTOGENERATED BY Stylus.tmlanguage (UUID: 60519324-6A3A-4382-9E0B-546993A3869A) */



var oop = __webpack_require__(89359);
var TextHighlightRules = (__webpack_require__(28053)/* .TextHighlightRules */ .K);
var CssHighlightRules = __webpack_require__(99301);

var StylusHighlightRules = function() {

    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used

    var keywordMapper = this.createKeywordMapper({
        "support.type": CssHighlightRules.supportType,
        "support.function": CssHighlightRules.supportFunction,
        "support.constant": CssHighlightRules.supportConstant,
        "support.constant.color": CssHighlightRules.supportConstantColor,
        "support.constant.fonts": CssHighlightRules.supportConstantFonts
    }, "text", true);

    this.$rules = {
    start: [
        {
            token : "comment",
            regex : /\/\/.*$/
        },
        {
            token : "comment", // multi line comment
            regex : /\/\*/,
            next : "comment"
        },
        {
            token: ["entity.name.function.stylus", "text"],
            regex: "^([-a-zA-Z_][-\\w]*)?(\\()"
        },
        {
            token: ["entity.other.attribute-name.class.stylus"],
            regex: "\\.-?[_a-zA-Z]+[_a-zA-Z0-9-]*"
        },
        {
            token: ["entity.language.stylus"],
            regex: "^ *&"
        },
        {
            token: ["variable.language.stylus"],
            regex: "(arguments)"
        },
        {
            token: ["keyword.stylus"],
            regex: "@[-\\w]+"
        },
        {
            token : ["punctuation", "entity.other.attribute-name.pseudo-element.css"],
            regex : CssHighlightRules.pseudoElements
        }, {
            token : ["punctuation", "entity.other.attribute-name.pseudo-class.css"],
            regex : CssHighlightRules.pseudoClasses
        }, 
        {
            token: ["entity.name.tag.stylus"],
            regex: "(?:\\b)(a|abbr|acronym|address|area|article|aside|audio|b|base|big|blockquote|body|br|button|canvas|caption|cite|code|col|colgroup|datalist|dd|del|details|dfn|dialog|div|dl|dt|em|eventsource|fieldset|figure|figcaption|footer|form|frame|frameset|(?:h[1-6])|head|header|hgroup|hr|html|i|iframe|img|input|ins|kbd|label|legend|li|link|map|mark|menu|meta|meter|nav|noframes|noscript|object|ol|optgroup|option|output|p|param|pre|progress|q|samp|script|section|select|small|span|strike|strong|style|sub|summary|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|tt|ul|var|video)(?:\\b)"
        },
        {
            token: "constant.numeric",  // hex6 color
            regex: "#[a-fA-F0-9]{6}"
        }, 
        {
            token: "constant.numeric", // hex3 color
            regex: "#[a-fA-F0-9]{3}"
        }, 
        {
            token: ["punctuation.definition.entity.stylus", "entity.other.attribute-name.id.stylus"],
            regex: "(#)([a-zA-Z][a-zA-Z0-9_-]*)"
        },
        {
            token: "meta.vendor-prefix.stylus",
            regex: "-webkit-|-moz\\-|-ms-|-o-"
        },
        {
            token: "keyword.control.stylus",
            regex: "(?:!important|for|in|return|true|false|null|if|else|unless|return)\\b"
        },
        {
            token: "keyword.operator.stylus",
            regex: "!|~|\\+|-|(?:\\*)?\\*|\\/|%|(?:\\.)\\.\\.|<|>|(?:=|:|\\?|\\+|-|\\*|\\/|%|<|>)?=|!="
        },
        {
            token: "keyword.operator.stylus",
            regex: "(?:in|is(?:nt)?|not)\\b"
        },
        {
            token : "string",
            regex : "'(?=.)",
            next  : "qstring"
        }, {
            token : "string",
            regex : '"(?=.)',
            next  : "qqstring"
        }, 
        {
            token : "constant.numeric",
            regex : CssHighlightRules.numRe
        }, 
        {
            token : "keyword",
            regex : "(?:ch|cm|deg|em|ex|fr|gd|grad|Hz|in|kHz|mm|ms|pc|pt|px|rad|rem|s|turn|vh|vm|vw|%)\\b"
        }, 
        {
            token : keywordMapper,
            regex : "\\-?[a-zA-Z_][a-zA-Z0-9_\\-]*"
        }
    ],
    "comment" : [
        {
            token : "comment", // closing comment
            regex : "\\*\\/",
            next : "start"
        }, {
            defaultToken : "comment"
        }
    ],
    "qqstring" : [
        {
            token : "string",
            regex : '[^"\\\\]+'
        }, 
        {
            token : "string",
            regex : "\\\\$",
            next  : "qqstring"
        }, 
        {
            token : "string",
            regex : '"|$',
            next  : "start"
        }
    ],
    "qstring" : [
        {
            token : "string",
            regex : "[^'\\\\]+"
        }, 
        {
            token : "string",
            regex : "\\\\$",
            next  : "qstring"
        }, 
        {
            token : "string",
            regex : "'|$",
            next  : "start"
        }
    ]
};

};

oop.inherits(StylusHighlightRules, TextHighlightRules);

exports.u = StylusHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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UztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLFNBQTRCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9jc3NfaGlnaGxpZ2h0X3J1bGVzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvZm9sZGluZy9jb2ZmZWUuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9zdHlsdXMuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9zdHlsdXNfaGlnaGxpZ2h0X3J1bGVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgbGFuZyA9IHJlcXVpcmUoXCIuLi9saWIvbGFuZ1wiKTtcbnZhciBUZXh0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90ZXh0X2hpZ2hsaWdodF9ydWxlc1wiKS5UZXh0SGlnaGxpZ2h0UnVsZXM7XG5cblxuLyogRXhwb3J0cyBhcmUgZm9yIFN0eWx1cyBhbmQgTGVzcyBoaWdobGlnaHRlcnMgKi9cbnZhciBzdXBwb3J0VHlwZSA9IGV4cG9ydHMuc3VwcG9ydFR5cGUgPSBcImFsaWduLWNvbnRlbnR8YWxpZ24taXRlbXN8YWxpZ24tc2VsZnxhbGx8YW5pbWF0aW9ufGFuaW1hdGlvbi1kZWxheXxhbmltYXRpb24tZGlyZWN0aW9ufGFuaW1hdGlvbi1kdXJhdGlvbnxhbmltYXRpb24tZmlsbC1tb2RlfGFuaW1hdGlvbi1pdGVyYXRpb24tY291bnR8YW5pbWF0aW9uLW5hbWV8YW5pbWF0aW9uLXBsYXktc3RhdGV8YW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbnxiYWNrZmFjZS12aXNpYmlsaXR5fGJhY2tncm91bmR8YmFja2dyb3VuZC1hdHRhY2htZW50fGJhY2tncm91bmQtYmxlbmQtbW9kZXxiYWNrZ3JvdW5kLWNsaXB8YmFja2dyb3VuZC1jb2xvcnxiYWNrZ3JvdW5kLWltYWdlfGJhY2tncm91bmQtb3JpZ2lufGJhY2tncm91bmQtcG9zaXRpb258YmFja2dyb3VuZC1yZXBlYXR8YmFja2dyb3VuZC1zaXplfGJvcmRlcnxib3JkZXItYm90dG9tfGJvcmRlci1ib3R0b20tY29sb3J8Ym9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1c3xib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1c3xib3JkZXItYm90dG9tLXN0eWxlfGJvcmRlci1ib3R0b20td2lkdGh8Ym9yZGVyLWNvbGxhcHNlfGJvcmRlci1jb2xvcnxib3JkZXItaW1hZ2V8Ym9yZGVyLWltYWdlLW91dHNldHxib3JkZXItaW1hZ2UtcmVwZWF0fGJvcmRlci1pbWFnZS1zbGljZXxib3JkZXItaW1hZ2Utc291cmNlfGJvcmRlci1pbWFnZS13aWR0aHxib3JkZXItbGVmdHxib3JkZXItbGVmdC1jb2xvcnxib3JkZXItbGVmdC1zdHlsZXxib3JkZXItbGVmdC13aWR0aHxib3JkZXItcmFkaXVzfGJvcmRlci1yaWdodHxib3JkZXItcmlnaHQtY29sb3J8Ym9yZGVyLXJpZ2h0LXN0eWxlfGJvcmRlci1yaWdodC13aWR0aHxib3JkZXItc3BhY2luZ3xib3JkZXItc3R5bGV8Ym9yZGVyLXRvcHxib3JkZXItdG9wLWNvbG9yfGJvcmRlci10b3AtbGVmdC1yYWRpdXN8Ym9yZGVyLXRvcC1yaWdodC1yYWRpdXN8Ym9yZGVyLXRvcC1zdHlsZXxib3JkZXItdG9wLXdpZHRofGJvcmRlci13aWR0aHxib3R0b218Ym94LXNoYWRvd3xib3gtc2l6aW5nfGNhcHRpb24tc2lkZXxjbGVhcnxjbGlwfGNvbG9yfGNvbHVtbi1jb3VudHxjb2x1bW4tZmlsbHxjb2x1bW4tZ2FwfGNvbHVtbi1ydWxlfGNvbHVtbi1ydWxlLWNvbG9yfGNvbHVtbi1ydWxlLXN0eWxlfGNvbHVtbi1ydWxlLXdpZHRofGNvbHVtbi1zcGFufGNvbHVtbi13aWR0aHxjb2x1bW5zfGNvbnRlbnR8Y291bnRlci1pbmNyZW1lbnR8Y291bnRlci1yZXNldHxjdXJzb3J8ZGlyZWN0aW9ufGRpc3BsYXl8ZW1wdHktY2VsbHN8ZmlsdGVyfGZsZXh8ZmxleC1iYXNpc3xmbGV4LWRpcmVjdGlvbnxmbGV4LWZsb3d8ZmxleC1ncm93fGZsZXgtc2hyaW5rfGZsZXgtd3JhcHxmbG9hdHxmb250fGZvbnQtZmFtaWx5fGZvbnQtc2l6ZXxmb250LXNpemUtYWRqdXN0fGZvbnQtc3RyZXRjaHxmb250LXN0eWxlfGZvbnQtdmFyaWFudHxmb250LXdlaWdodHxoYW5naW5nLXB1bmN0dWF0aW9ufGhlaWdodHxqdXN0aWZ5LWNvbnRlbnR8bGVmdHxsZXR0ZXItc3BhY2luZ3xsaW5lLWhlaWdodHxsaXN0LXN0eWxlfGxpc3Qtc3R5bGUtaW1hZ2V8bGlzdC1zdHlsZS1wb3NpdGlvbnxsaXN0LXN0eWxlLXR5cGV8bWFyZ2lufG1hcmdpbi1ib3R0b218bWFyZ2luLWxlZnR8bWFyZ2luLXJpZ2h0fG1hcmdpbi10b3B8bWF4LWhlaWdodHxtYXgtd2lkdGh8bWF4LXpvb218bWluLWhlaWdodHxtaW4td2lkdGh8bWluLXpvb218bmF2LWRvd258bmF2LWluZGV4fG5hdi1sZWZ0fG5hdi1yaWdodHxuYXYtdXB8b3BhY2l0eXxvcmRlcnxvdXRsaW5lfG91dGxpbmUtY29sb3J8b3V0bGluZS1vZmZzZXR8b3V0bGluZS1zdHlsZXxvdXRsaW5lLXdpZHRofG92ZXJmbG93fG92ZXJmbG93LXh8b3ZlcmZsb3cteXxwYWRkaW5nfHBhZGRpbmctYm90dG9tfHBhZGRpbmctbGVmdHxwYWRkaW5nLXJpZ2h0fHBhZGRpbmctdG9wfHBhZ2UtYnJlYWstYWZ0ZXJ8cGFnZS1icmVhay1iZWZvcmV8cGFnZS1icmVhay1pbnNpZGV8cGVyc3BlY3RpdmV8cGVyc3BlY3RpdmUtb3JpZ2lufHBvc2l0aW9ufHF1b3Rlc3xyZXNpemV8cmlnaHR8dGFiLXNpemV8dGFibGUtbGF5b3V0fHRleHQtYWxpZ258dGV4dC1hbGlnbi1sYXN0fHRleHQtZGVjb3JhdGlvbnx0ZXh0LWRlY29yYXRpb24tY29sb3J8dGV4dC1kZWNvcmF0aW9uLWxpbmV8dGV4dC1kZWNvcmF0aW9uLXN0eWxlfHRleHQtaW5kZW50fHRleHQtanVzdGlmeXx0ZXh0LW92ZXJmbG93fHRleHQtc2hhZG93fHRleHQtdHJhbnNmb3JtfHRvcHx0cmFuc2Zvcm18dHJhbnNmb3JtLW9yaWdpbnx0cmFuc2Zvcm0tc3R5bGV8dHJhbnNpdGlvbnx0cmFuc2l0aW9uLWRlbGF5fHRyYW5zaXRpb24tZHVyYXRpb258dHJhbnNpdGlvbi1wcm9wZXJ0eXx0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbnx1bmljb2RlLWJpZGl8dXNlci1zZWxlY3R8dXNlci16b29tfHZlcnRpY2FsLWFsaWdufHZpc2liaWxpdHl8d2hpdGUtc3BhY2V8d2lkdGh8d29yZC1icmVha3x3b3JkLXNwYWNpbmd8d29yZC13cmFwfHotaW5kZXhcIjtcbnZhciBzdXBwb3J0RnVuY3Rpb24gPSBleHBvcnRzLnN1cHBvcnRGdW5jdGlvbiA9IFwicmdifHJnYmF8dXJsfGF0dHJ8Y291bnRlcnxjb3VudGVyc1wiO1xudmFyIHN1cHBvcnRDb25zdGFudCA9IGV4cG9ydHMuc3VwcG9ydENvbnN0YW50ID0gXCJhYnNvbHV0ZXxhZnRlci1lZGdlfGFmdGVyfGFsbC1zY3JvbGx8YWxsfGFscGhhYmV0aWN8YWx3YXlzfGFudGlhbGlhc2VkfGFybWVuaWFufGF1dG98YXZvaWQtY29sdW1ufGF2b2lkLXBhZ2V8YXZvaWR8YmFsYW5jZXxiYXNlbGluZXxiZWZvcmUtZWRnZXxiZWZvcmV8YmVsb3d8YmlkaS1vdmVycmlkZXxibG9jay1saW5lLWhlaWdodHxibG9ja3xib2xkfGJvbGRlcnxib3JkZXItYm94fGJvdGh8Ym90dG9tfGJveHxicmVhay1hbGx8YnJlYWstd29yZHxjYXBpdGFsaXplfGNhcHMtaGVpZ2h0fGNhcHRpb258Y2VudGVyfGNlbnRyYWx8Y2hhcnxjaXJjbGV8Y2prLWlkZW9ncmFwaGljfGNsb25lfGNsb3NlLXF1b3RlfGNvbC1yZXNpemV8Y29sbGFwc2V8Y29sdW1ufGNvbnNpZGVyLXNoaWZ0c3xjb250YWlufGNvbnRlbnQtYm94fGNvdmVyfGNyb3NzaGFpcnxjdWJpYy1iZXppZXJ8ZGFzaGVkfGRlY2ltYWwtbGVhZGluZy16ZXJvfGRlY2ltYWx8ZGVmYXVsdHxkaXNhYmxlZHxkaXNjfGRpc3JlZ2FyZC1zaGlmdHN8ZGlzdHJpYnV0ZS1hbGwtbGluZXN8ZGlzdHJpYnV0ZS1sZXR0ZXJ8ZGlzdHJpYnV0ZS1zcGFjZXxkaXN0cmlidXRlfGRvdHRlZHxkb3VibGV8ZS1yZXNpemV8ZWFzZS1pbnxlYXNlLWluLW91dHxlYXNlLW91dHxlYXNlfGVsbGlwc2lzfGVuZHxleGNsdWRlLXJ1Ynl8ZmxleC1lbmR8ZmxleC1zdGFydHxmaWxsfGZpeGVkfGdlb3JnaWFufGdseXBoc3xncmlkLWhlaWdodHxncm9vdmV8aGFuZHxoYW5naW5nfGhlYnJld3xoZWxwfGhpZGRlbnxoaXJhZ2FuYS1pcm9oYXxoaXJhZ2FuYXxob3Jpem9udGFsfGljb258aWRlb2dyYXBoLWFscGhhfGlkZW9ncmFwaC1udW1lcmljfGlkZW9ncmFwaC1wYXJlbnRoZXNpc3xpZGVvZ3JhcGgtc3BhY2V8aWRlb2dyYXBoaWN8aW5hY3RpdmV8aW5jbHVkZS1ydWJ5fGluaGVyaXR8aW5pdGlhbHxpbmxpbmUtYmxvY2t8aW5saW5lLWJveHxpbmxpbmUtbGluZS1oZWlnaHR8aW5saW5lLXRhYmxlfGlubGluZXxpbnNldHxpbnNpZGV8aW50ZXItaWRlb2dyYXBofGludGVyLXdvcmR8aW52ZXJ0fGl0YWxpY3xqdXN0aWZ5fGthdGFrYW5hLWlyb2hhfGthdGFrYW5hfGtlZXAtYWxsfGxhc3R8bGVmdHxsaWdodGVyfGxpbmUtZWRnZXxsaW5lLXRocm91Z2h8bGluZXxsaW5lYXJ8bGlzdC1pdGVtfGxvY2FsfGxvb3NlfGxvd2VyLWFscGhhfGxvd2VyLWdyZWVrfGxvd2VyLWxhdGlufGxvd2VyLXJvbWFufGxvd2VyY2FzZXxsci10YnxsdHJ8bWF0aGVtYXRpY2FsfG1heC1oZWlnaHR8bWF4LXNpemV8bWVkaXVtfG1lbnV8bWVzc2FnZS1ib3h8bWlkZGxlfG1vdmV8bi1yZXNpemV8bmUtcmVzaXplfG5ld3NwYXBlcnxuby1jaGFuZ2V8bm8tY2xvc2UtcXVvdGV8bm8tZHJvcHxuby1vcGVuLXF1b3RlfG5vLXJlcGVhdHxub25lfG5vcm1hbHxub3QtYWxsb3dlZHxub3dyYXB8bnctcmVzaXplfG9ibGlxdWV8b3Blbi1xdW90ZXxvdXRzZXR8b3V0c2lkZXxvdmVybGluZXxwYWRkaW5nLWJveHxwYWdlfHBvaW50ZXJ8cHJlLWxpbmV8cHJlLXdyYXB8cHJlfHByZXNlcnZlLTNkfHByb2dyZXNzfHJlbGF0aXZlfHJlcGVhdC14fHJlcGVhdC15fHJlcGVhdHxyZXBsYWNlZHxyZXNldC1zaXplfHJpZGdlfHJpZ2h0fHJvdW5kfHJvdy1yZXNpemV8cnRsfHMtcmVzaXplfHNjcm9sbHxzZS1yZXNpemV8c2VwYXJhdGV8c2xpY2V8c21hbGwtY2Fwc3xzbWFsbC1jYXB0aW9ufHNvbGlkfHNwYWNlfHNxdWFyZXxzdGFydHxzdGF0aWN8c3RhdHVzLWJhcnxzdGVwLWVuZHxzdGVwLXN0YXJ0fHN0ZXBzfHN0cmV0Y2h8c3RyaWN0fHN1YnxzdXBlcnxzdy1yZXNpemV8dGFibGUtY2FwdGlvbnx0YWJsZS1jZWxsfHRhYmxlLWNvbHVtbi1ncm91cHx0YWJsZS1jb2x1bW58dGFibGUtZm9vdGVyLWdyb3VwfHRhYmxlLWhlYWRlci1ncm91cHx0YWJsZS1yb3ctZ3JvdXB8dGFibGUtcm93fHRhYmxlfHRiLXJsfHRleHQtYWZ0ZXItZWRnZXx0ZXh0LWJlZm9yZS1lZGdlfHRleHQtYm90dG9tfHRleHQtc2l6ZXx0ZXh0LXRvcHx0ZXh0fHRoaWNrfHRoaW58dHJhbnNwYXJlbnR8dW5kZXJsaW5lfHVwcGVyLWFscGhhfHVwcGVyLWxhdGlufHVwcGVyLXJvbWFufHVwcGVyY2FzZXx1c2Utc2NyaXB0fHZlcnRpY2FsLWlkZW9ncmFwaGljfHZlcnRpY2FsLXRleHR8dmlzaWJsZXx3LXJlc2l6ZXx3YWl0fHdoaXRlc3BhY2V8ei1pbmRleHx6ZXJvfHpvb21cIjtcbnZhciBzdXBwb3J0Q29uc3RhbnRDb2xvciA9IGV4cG9ydHMuc3VwcG9ydENvbnN0YW50Q29sb3IgPSBcImFsaWNlYmx1ZXxhbnRpcXVld2hpdGV8YXF1YXxhcXVhbWFyaW5lfGF6dXJlfGJlaWdlfGJpc3F1ZXxibGFja3xibGFuY2hlZGFsbW9uZHxibHVlfGJsdWV2aW9sZXR8YnJvd258YnVybHl3b29kfGNhZGV0Ymx1ZXxjaGFydHJldXNlfGNob2NvbGF0ZXxjb3JhbHxjb3JuZmxvd2VyYmx1ZXxjb3Juc2lsa3xjcmltc29ufGN5YW58ZGFya2JsdWV8ZGFya2N5YW58ZGFya2dvbGRlbnJvZHxkYXJrZ3JheXxkYXJrZ3JlZW58ZGFya2dyZXl8ZGFya2toYWtpfGRhcmttYWdlbnRhfGRhcmtvbGl2ZWdyZWVufGRhcmtvcmFuZ2V8ZGFya29yY2hpZHxkYXJrcmVkfGRhcmtzYWxtb258ZGFya3NlYWdyZWVufGRhcmtzbGF0ZWJsdWV8ZGFya3NsYXRlZ3JheXxkYXJrc2xhdGVncmV5fGRhcmt0dXJxdW9pc2V8ZGFya3Zpb2xldHxkZWVwcGlua3xkZWVwc2t5Ymx1ZXxkaW1ncmF5fGRpbWdyZXl8ZG9kZ2VyYmx1ZXxmaXJlYnJpY2t8ZmxvcmFsd2hpdGV8Zm9yZXN0Z3JlZW58ZnVjaHNpYXxnYWluc2Jvcm98Z2hvc3R3aGl0ZXxnb2xkfGdvbGRlbnJvZHxncmF5fGdyZWVufGdyZWVueWVsbG93fGdyZXl8aG9uZXlkZXd8aG90cGlua3xpbmRpYW5yZWR8aW5kaWdvfGl2b3J5fGtoYWtpfGxhdmVuZGVyfGxhdmVuZGVyYmx1c2h8bGF3bmdyZWVufGxlbW9uY2hpZmZvbnxsaWdodGJsdWV8bGlnaHRjb3JhbHxsaWdodGN5YW58bGlnaHRnb2xkZW5yb2R5ZWxsb3d8bGlnaHRncmF5fGxpZ2h0Z3JlZW58bGlnaHRncmV5fGxpZ2h0cGlua3xsaWdodHNhbG1vbnxsaWdodHNlYWdyZWVufGxpZ2h0c2t5Ymx1ZXxsaWdodHNsYXRlZ3JheXxsaWdodHNsYXRlZ3JleXxsaWdodHN0ZWVsYmx1ZXxsaWdodHllbGxvd3xsaW1lfGxpbWVncmVlbnxsaW5lbnxtYWdlbnRhfG1hcm9vbnxtZWRpdW1hcXVhbWFyaW5lfG1lZGl1bWJsdWV8bWVkaXVtb3JjaGlkfG1lZGl1bXB1cnBsZXxtZWRpdW1zZWFncmVlbnxtZWRpdW1zbGF0ZWJsdWV8bWVkaXVtc3ByaW5nZ3JlZW58bWVkaXVtdHVycXVvaXNlfG1lZGl1bXZpb2xldHJlZHxtaWRuaWdodGJsdWV8bWludGNyZWFtfG1pc3R5cm9zZXxtb2NjYXNpbnxuYXZham93aGl0ZXxuYXZ5fG9sZGxhY2V8b2xpdmV8b2xpdmVkcmFifG9yYW5nZXxvcmFuZ2VyZWR8b3JjaGlkfHBhbGVnb2xkZW5yb2R8cGFsZWdyZWVufHBhbGV0dXJxdW9pc2V8cGFsZXZpb2xldHJlZHxwYXBheWF3aGlwfHBlYWNocHVmZnxwZXJ1fHBpbmt8cGx1bXxwb3dkZXJibHVlfHB1cnBsZXxyZWJlY2NhcHVycGxlfHJlZHxyb3N5YnJvd258cm95YWxibHVlfHNhZGRsZWJyb3dufHNhbG1vbnxzYW5keWJyb3dufHNlYWdyZWVufHNlYXNoZWxsfHNpZW5uYXxzaWx2ZXJ8c2t5Ymx1ZXxzbGF0ZWJsdWV8c2xhdGVncmF5fHNsYXRlZ3JleXxzbm93fHNwcmluZ2dyZWVufHN0ZWVsYmx1ZXx0YW58dGVhbHx0aGlzdGxlfHRvbWF0b3x0dXJxdW9pc2V8dmlvbGV0fHdoZWF0fHdoaXRlfHdoaXRlc21va2V8eWVsbG93fHllbGxvd2dyZWVuXCI7XG52YXIgc3VwcG9ydENvbnN0YW50Rm9udHMgPSBleHBvcnRzLnN1cHBvcnRDb25zdGFudEZvbnRzID0gXCJhcmlhbHxjZW50dXJ5fGNvbWljfGNvdXJpZXJ8Y3Vyc2l2ZXxmYW50YXN5fGdhcmFtb25kfGdlb3JnaWF8aGVsdmV0aWNhfGltcGFjdHxsdWNpZGF8c3ltYm9sfHN5c3RlbXx0YWhvbWF8dGltZXN8dHJlYnVjaGV0fHV0b3BpYXx2ZXJkYW5hfHdlYmRpbmdzfHNhbnMtc2VyaWZ8c2VyaWZ8bW9ub3NwYWNlXCI7XG5cbnZhciBudW1SZSA9IGV4cG9ydHMubnVtUmUgPSBcIlxcXFwtPyg/Oig/OlswLTldKyg/OlxcXFwuWzAtOV0rKT8pfCg/OlxcXFwuWzAtOV0rKSlcIjtcbnZhciBwc2V1ZG9FbGVtZW50cyA9IGV4cG9ydHMucHNldWRvRWxlbWVudHMgPSBcIihcXFxcOispXFxcXGIoYWZ0ZXJ8YmVmb3JlfGZpcnN0LWxldHRlcnxmaXJzdC1saW5lfG1vei1zZWxlY3Rpb258c2VsZWN0aW9uKVxcXFxiXCI7XG52YXIgcHNldWRvQ2xhc3NlcyAgPSBleHBvcnRzLnBzZXVkb0NsYXNzZXMgPSAgXCIoOilcXFxcYihhY3RpdmV8Y2hlY2tlZHxkaXNhYmxlZHxlbXB0eXxlbmFibGVkfGZpcnN0LWNoaWxkfGZpcnN0LW9mLXR5cGV8Zm9jdXN8aG92ZXJ8aW5kZXRlcm1pbmF0ZXxpbnZhbGlkfGxhc3QtY2hpbGR8bGFzdC1vZi10eXBlfGxpbmt8bm90fG50aC1jaGlsZHxudGgtbGFzdC1jaGlsZHxudGgtbGFzdC1vZi10eXBlfG50aC1vZi10eXBlfG9ubHktY2hpbGR8b25seS1vZi10eXBlfHJlcXVpcmVkfHJvb3R8dGFyZ2V0fHZhbGlkfHZpc2l0ZWQpXFxcXGJcIjtcblxudmFyIENzc0hpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIga2V5d29yZE1hcHBlciA9IHRoaXMuY3JlYXRlS2V5d29yZE1hcHBlcih7XG4gICAgICAgIFwic3VwcG9ydC5mdW5jdGlvblwiOiBzdXBwb3J0RnVuY3Rpb24sXG4gICAgICAgIFwic3VwcG9ydC5jb25zdGFudFwiOiBzdXBwb3J0Q29uc3RhbnQsXG4gICAgICAgIFwic3VwcG9ydC50eXBlXCI6IHN1cHBvcnRUeXBlLFxuICAgICAgICBcInN1cHBvcnQuY29uc3RhbnQuY29sb3JcIjogc3VwcG9ydENvbnN0YW50Q29sb3IsXG4gICAgICAgIFwic3VwcG9ydC5jb25zdGFudC5mb250c1wiOiBzdXBwb3J0Q29uc3RhbnRGb250c1xuICAgIH0sIFwidGV4dFwiLCB0cnVlKTtcblxuICAgIC8vIHJlZ2V4cCBtdXN0IG5vdCBoYXZlIGNhcHR1cmluZyBwYXJlbnRoZXNlcy4gVXNlICg/OikgaW5zdGVhZC5cbiAgICAvLyByZWdleHBzIGFyZSBvcmRlcmVkIC0+IHRoZSBmaXJzdCBtYXRjaCBpcyB1c2VkXG5cbiAgICB0aGlzLiRydWxlcyA9IHtcbiAgICAgICAgXCJzdGFydFwiIDogW3tcbiAgICAgICAgICAgIGluY2x1ZGUgOiBbXCJzdHJpbmdzXCIsIFwidXJsXCIsIFwiY29tbWVudHNcIl1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwicGFyZW4ubHBhcmVuXCIsXG4gICAgICAgICAgICByZWdleDogXCJcXFxce1wiLFxuICAgICAgICAgICAgbmV4dDogIFwicnVsZXNldFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInBhcmVuLnJwYXJlblwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiXFxcXH1cIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIkAoPyF2aWV3cG9ydClcIixcbiAgICAgICAgICAgIG5leHQ6ICBcIm1lZGlhXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwia2V5d29yZFwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiI1thLXowLTktX10rXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwia2V5d29yZFwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiJVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInZhcmlhYmxlXCIsXG4gICAgICAgICAgICByZWdleDogXCJcXFxcLlthLXowLTktX10rXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nXCIsXG4gICAgICAgICAgICByZWdleDogXCI6W2EtejAtOS1fXStcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLFxuICAgICAgICAgICAgcmVnZXggOiBudW1SZVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudFwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiW2EtejAtOS1fXStcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjYXNlSW5zZW5zaXRpdmU6IHRydWVcbiAgICAgICAgfV0sXG5cbiAgICAgICAgXCJtZWRpYVwiOiBbe1xuICAgICAgICAgICAgaW5jbHVkZSA6IFtcInN0cmluZ3NcIiwgXCJ1cmxcIiwgXCJjb21tZW50c1wiXVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJwYXJlbi5scGFyZW5cIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFx7XCIsXG4gICAgICAgICAgICBuZXh0OiAgXCJzdGFydFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInBhcmVuLnJwYXJlblwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiXFxcXH1cIixcbiAgICAgICAgICAgIG5leHQ6ICBcInN0YXJ0XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nXCIsXG4gICAgICAgICAgICByZWdleDogXCI7XCIsXG4gICAgICAgICAgICBuZXh0OiAgXCJzdGFydFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcImtleXdvcmRcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIig/Om1lZGlhfHN1cHBvcnRzfGRvY3VtZW50fGNoYXJzZXR8aW1wb3J0fG5hbWVzcGFjZXxtZWRpYXxzdXBwb3J0c3xkb2N1bWVudFwiXG4gICAgICAgICAgICAgICAgKyBcInxwYWdlfGZvbnR8a2V5ZnJhbWVzfHZpZXdwb3J0fGNvdW50ZXItc3R5bGV8Zm9udC1mZWF0dXJlLXZhbHVlc1wiXG4gICAgICAgICAgICAgICAgKyBcInxzd2FzaHxvcm5hbWVudHN8YW5ub3RhdGlvbnxzdHlsaXN0aWN8c3R5bGVzZXR8Y2hhcmFjdGVyLXZhcmlhbnQpXCJcbiAgICAgICAgfV0sXG5cbiAgICAgICAgXCJjb21tZW50c1wiIDogW3tcbiAgICAgICAgICAgIHRva2VuOiBcImNvbW1lbnRcIiwgLy8gbXVsdGkgbGluZSBjb21tZW50XG4gICAgICAgICAgICByZWdleDogXCJcXFxcL1xcXFwqXCIsXG4gICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwqXFxcXC9cIixcbiAgICAgICAgICAgICAgICBuZXh0IDogXCJwb3BcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbiA6IFwiY29tbWVudFwiXG4gICAgICAgICAgICB9XVxuICAgICAgICB9XSxcblxuICAgICAgICBcInJ1bGVzZXRcIiA6IFt7XG4gICAgICAgICAgICByZWdleCA6IFwiLSh3ZWJraXR8bXN8bW96fG8pLVwiLFxuICAgICAgICAgICAgdG9rZW4gOiBcInRleHRcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwicHVuY3R1YXRpb24ub3BlcmF0b3JcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJbOjtdXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInBhcmVuLnJwYXJlblwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIlxcXFx9XCIsXG4gICAgICAgICAgICBuZXh0IDogXCJzdGFydFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGluY2x1ZGUgOiBbXCJzdHJpbmdzXCIsIFwidXJsXCIsIFwiY29tbWVudHNcIl1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBbXCJjb25zdGFudC5udW1lcmljXCIsIFwia2V5d29yZFwiXSxcbiAgICAgICAgICAgIHJlZ2V4IDogXCIoXCIgKyBudW1SZSArIFwiKShjaHxjbXxkZWd8ZW18ZXh8ZnJ8Z2R8Z3JhZHxIenxpbnxrSHp8bW18bXN8cGN8cHR8cHh8cmFkfHJlbXxzfHR1cm58dmh8dm1heHx2bWlufHZtfHZ3fCUpXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIixcbiAgICAgICAgICAgIHJlZ2V4IDogbnVtUmVcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIiwgIC8vIGhleDYgY29sb3JcbiAgICAgICAgICAgIHJlZ2V4IDogXCIjW2EtZjAtOV17Nn1cIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLCAvLyBoZXgzIGNvbG9yXG4gICAgICAgICAgICByZWdleCA6IFwiI1thLWYwLTldezN9XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBbXCJwdW5jdHVhdGlvblwiLCBcImVudGl0eS5vdGhlci5hdHRyaWJ1dGUtbmFtZS5wc2V1ZG8tZWxlbWVudC5jc3NcIl0sXG4gICAgICAgICAgICByZWdleCA6IHBzZXVkb0VsZW1lbnRzXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogW1wicHVuY3R1YXRpb25cIiwgXCJlbnRpdHkub3RoZXIuYXR0cmlidXRlLW5hbWUucHNldWRvLWNsYXNzLmNzc1wiXSxcbiAgICAgICAgICAgIHJlZ2V4IDogcHNldWRvQ2xhc3Nlc1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpbmNsdWRlOiBcInVybFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDoga2V5d29yZE1hcHBlcixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcLT9bYS16QS1aX11bYS16QS1aMC05X1xcXFwtXSpcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjYXNlSW5zZW5zaXRpdmU6IHRydWVcbiAgICAgICAgfV0sXG5cbiAgICAgICAgdXJsOiBbe1xuICAgICAgICAgICAgdG9rZW4gOiBcInN1cHBvcnQuZnVuY3Rpb25cIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCIoPzp1cmwoOj8tcHJlZml4KT98ZG9tYWlufHJlZ2V4cClcXFxcKFwiLFxuICAgICAgICAgICAgcHVzaDogW3tcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3VwcG9ydC5mdW5jdGlvblwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcKVwiLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcInBvcFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInN0cmluZ1wiXG4gICAgICAgICAgICB9XVxuICAgICAgICB9XSxcblxuICAgICAgICBzdHJpbmdzOiBbe1xuICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZy5zdGFydFwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIidcIixcbiAgICAgICAgICAgIHB1c2ggOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmcuZW5kXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIid8JFwiLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpbmNsdWRlIDogXCJlc2NhcGVzXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvXFxcXCQvLFxuICAgICAgICAgICAgICAgIGNvbnN1bWVMaW5lRW5kOiB0cnVlXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInN0cmluZ1wiXG4gICAgICAgICAgICB9XVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nLnN0YXJ0XCIsXG4gICAgICAgICAgICByZWdleCA6ICdcIicsXG4gICAgICAgICAgICBwdXNoIDogW3tcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nLmVuZFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogJ1wifCQnLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpbmNsdWRlIDogXCJlc2NhcGVzXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvXFxcXCQvLFxuICAgICAgICAgICAgICAgIGNvbnN1bWVMaW5lRW5kOiB0cnVlXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInN0cmluZ1wiXG4gICAgICAgICAgICB9XVxuICAgICAgICB9XSxcbiAgICAgICAgZXNjYXBlczogW3tcbiAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIixcbiAgICAgICAgICAgIHJlZ2V4IDogL1xcXFwoW2EtZkEtRlxcZF17MSw2fXxbXmEtZkEtRlxcZF0pL1xuICAgICAgICB9XVxuXG4gICAgfTtcblxuICAgIHRoaXMubm9ybWFsaXplUnVsZXMoKTtcbn07XG5cbm9vcC5pbmhlcml0cyhDc3NIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuZXhwb3J0cy5Dc3NIaWdobGlnaHRSdWxlcyA9IENzc0hpZ2hsaWdodFJ1bGVzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vLi4vbGliL29vcFwiKTtcbnZhciBCYXNlRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9mb2xkX21vZGVcIikuRm9sZE1vZGU7XG52YXIgUmFuZ2UgPSByZXF1aXJlKFwiLi4vLi4vcmFuZ2VcIikuUmFuZ2U7XG5cbnZhciBGb2xkTW9kZSA9IGV4cG9ydHMuRm9sZE1vZGUgPSBmdW5jdGlvbigpIHt9O1xub29wLmluaGVyaXRzKEZvbGRNb2RlLCBCYXNlRm9sZE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5jb21tZW50QmxvY2sgPSBmdW5jdGlvbihzZXNzaW9uLCByb3cpIHtcbiAgICAgICAgdmFyIHJlID0gL1xcUy87XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgIHZhciBzdGFydExldmVsID0gbGluZS5zZWFyY2gocmUpO1xuICAgICAgICBpZiAoc3RhcnRMZXZlbCA9PSAtMSB8fCBsaW5lW3N0YXJ0TGV2ZWxdICE9IFwiI1wiKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHZhciBzdGFydENvbHVtbiA9IGxpbmUubGVuZ3RoO1xuICAgICAgICB2YXIgbWF4Um93ID0gc2Vzc2lvbi5nZXRMZW5ndGgoKTtcbiAgICAgICAgdmFyIHN0YXJ0Um93ID0gcm93O1xuICAgICAgICB2YXIgZW5kUm93ID0gcm93O1xuXG4gICAgICAgIHdoaWxlICgrK3JvdyA8IG1heFJvdykge1xuICAgICAgICAgICAgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICAgICAgdmFyIGxldmVsID0gbGluZS5zZWFyY2gocmUpO1xuXG4gICAgICAgICAgICBpZiAobGV2ZWwgPT0gLTEpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgICAgIGlmIChsaW5lW2xldmVsXSAhPSBcIiNcIilcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZW5kUm93ID0gcm93O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVuZFJvdyA+IHN0YXJ0Um93KSB7XG4gICAgICAgICAgICB2YXIgZW5kQ29sdW1uID0gc2Vzc2lvbi5nZXRMaW5lKGVuZFJvdykubGVuZ3RoO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShzdGFydFJvdywgc3RhcnRDb2x1bW4sIGVuZFJvdywgZW5kQ29sdW1uKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLmdldEZvbGRXaWRnZXRSYW5nZSA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KSB7XG4gICAgICAgIHZhciByYW5nZSA9IHRoaXMuaW5kZW50YXRpb25CbG9jayhzZXNzaW9uLCByb3cpO1xuICAgICAgICBpZiAocmFuZ2UpXG4gICAgICAgICAgICByZXR1cm4gcmFuZ2U7XG5cbiAgICAgICAgcmFuZ2UgPSB0aGlzLmNvbW1lbnRCbG9jayhzZXNzaW9uLCByb3cpO1xuICAgICAgICBpZiAocmFuZ2UpXG4gICAgICAgICAgICByZXR1cm4gcmFuZ2U7XG4gICAgfTtcblxuICAgIC8vIG11c3QgcmV0dXJuIFwiXCIgaWYgdGhlcmUncyBubyBmb2xkLCB0byBlbmFibGUgY2FjaGluZ1xuICAgIHRoaXMuZ2V0Rm9sZFdpZGdldCA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgIHZhciBpbmRlbnQgPSBsaW5lLnNlYXJjaCgvXFxTLyk7XG4gICAgICAgIHZhciBuZXh0ID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyArIDEpO1xuICAgICAgICB2YXIgcHJldiA9IHNlc3Npb24uZ2V0TGluZShyb3cgLSAxKTtcbiAgICAgICAgdmFyIHByZXZJbmRlbnQgPSBwcmV2LnNlYXJjaCgvXFxTLyk7XG4gICAgICAgIHZhciBuZXh0SW5kZW50ID0gbmV4dC5zZWFyY2goL1xcUy8pO1xuXG4gICAgICAgIGlmIChpbmRlbnQgPT0gLTEpIHtcbiAgICAgICAgICAgIHNlc3Npb24uZm9sZFdpZGdldHNbcm93IC0gMV0gPSBwcmV2SW5kZW50IT0gLTEgJiYgcHJldkluZGVudCA8IG5leHRJbmRlbnQgPyBcInN0YXJ0XCIgOiBcIlwiO1xuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBkb2N1bWVudGF0aW9uIGNvbW1lbnRzXG4gICAgICAgIGlmIChwcmV2SW5kZW50ID09IC0xKSB7XG4gICAgICAgICAgICBpZiAoaW5kZW50ID09IG5leHRJbmRlbnQgJiYgbGluZVtpbmRlbnRdID09IFwiI1wiICYmIG5leHRbaW5kZW50XSA9PSBcIiNcIikge1xuICAgICAgICAgICAgICAgIHNlc3Npb24uZm9sZFdpZGdldHNbcm93IC0gMV0gPSBcIlwiO1xuICAgICAgICAgICAgICAgIHNlc3Npb24uZm9sZFdpZGdldHNbcm93ICsgMV0gPSBcIlwiO1xuICAgICAgICAgICAgICAgIHJldHVybiBcInN0YXJ0XCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAocHJldkluZGVudCA9PSBpbmRlbnQgJiYgbGluZVtpbmRlbnRdID09IFwiI1wiICYmIHByZXZbaW5kZW50XSA9PSBcIiNcIikge1xuICAgICAgICAgICAgaWYgKHNlc3Npb24uZ2V0TGluZShyb3cgLSAyKS5zZWFyY2goL1xcUy8pID09IC0xKSB7XG4gICAgICAgICAgICAgICAgc2Vzc2lvbi5mb2xkV2lkZ2V0c1tyb3cgLSAxXSA9IFwic3RhcnRcIjtcbiAgICAgICAgICAgICAgICBzZXNzaW9uLmZvbGRXaWRnZXRzW3JvdyArIDFdID0gXCJcIjtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcmV2SW5kZW50IT0gLTEgJiYgcHJldkluZGVudCA8IGluZGVudClcbiAgICAgICAgICAgIHNlc3Npb24uZm9sZFdpZGdldHNbcm93IC0gMV0gPSBcInN0YXJ0XCI7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHNlc3Npb24uZm9sZFdpZGdldHNbcm93IC0gMV0gPSBcIlwiO1xuXG4gICAgICAgIGlmIChpbmRlbnQgPCBuZXh0SW5kZW50KVxuICAgICAgICAgICAgcmV0dXJuIFwic3RhcnRcIjtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfTtcblxufSkuY2FsbChGb2xkTW9kZS5wcm90b3R5cGUpO1xuIiwiLypcbiAgVEhJUyBGSUxFIFdBUyBBVVRPR0VORVJBVEVEIEJZIG1vZGUudG1wbC5qc1xuKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0TW9kZSA9IHJlcXVpcmUoXCIuL3RleHRcIikuTW9kZTtcbnZhciBTdHlsdXNIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3N0eWx1c19oaWdobGlnaHRfcnVsZXNcIikuU3R5bHVzSGlnaGxpZ2h0UnVsZXM7XG52YXIgRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9mb2xkaW5nL2NvZmZlZVwiKS5Gb2xkTW9kZTtcblxudmFyIE1vZGUgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLkhpZ2hsaWdodFJ1bGVzID0gU3R5bHVzSGlnaGxpZ2h0UnVsZXM7XG4gICAgdGhpcy5mb2xkaW5nUnVsZXMgPSBuZXcgRm9sZE1vZGUoKTtcbiAgICB0aGlzLiRiZWhhdmlvdXIgPSB0aGlzLiRkZWZhdWx0QmVoYXZpb3VyO1xufTtcbm9vcC5pbmhlcml0cyhNb2RlLCBUZXh0TW9kZSk7XG5cbihmdW5jdGlvbigpIHtcbiAgICB0aGlzLmxpbmVDb21tZW50U3RhcnQgPSBcIi8vXCI7XG4gICAgdGhpcy5ibG9ja0NvbW1lbnQgPSB7c3RhcnQ6IFwiLypcIiwgZW5kOiBcIiovXCJ9O1xuICAgIFxuICAgIHRoaXMuJGlkID0gXCJhY2UvbW9kZS9zdHlsdXNcIjtcbn0pLmNhbGwoTW9kZS5wcm90b3R5cGUpO1xuXG5leHBvcnRzLk1vZGUgPSBNb2RlO1xuIiwiLypcbiAgVEhJUyBGSUxFIFdBUyBBVVRPR0VORVJBVEVEIEJZIFN0eWx1cy50bWxhbmd1YWdlIChVVUlEOiA2MDUxOTMyNC02QTNBLTQzODItOUUwQi01NDY5OTNBMzg2OUEpICovXG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xudmFyIENzc0hpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vY3NzX2hpZ2hsaWdodF9ydWxlc1wiKTtcblxudmFyIFN0eWx1c0hpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24oKSB7XG5cbiAgICAvLyByZWdleHAgbXVzdCBub3QgaGF2ZSBjYXB0dXJpbmcgcGFyZW50aGVzZXMuIFVzZSAoPzopIGluc3RlYWQuXG4gICAgLy8gcmVnZXhwcyBhcmUgb3JkZXJlZCAtPiB0aGUgZmlyc3QgbWF0Y2ggaXMgdXNlZFxuXG4gICAgdmFyIGtleXdvcmRNYXBwZXIgPSB0aGlzLmNyZWF0ZUtleXdvcmRNYXBwZXIoe1xuICAgICAgICBcInN1cHBvcnQudHlwZVwiOiBDc3NIaWdobGlnaHRSdWxlcy5zdXBwb3J0VHlwZSxcbiAgICAgICAgXCJzdXBwb3J0LmZ1bmN0aW9uXCI6IENzc0hpZ2hsaWdodFJ1bGVzLnN1cHBvcnRGdW5jdGlvbixcbiAgICAgICAgXCJzdXBwb3J0LmNvbnN0YW50XCI6IENzc0hpZ2hsaWdodFJ1bGVzLnN1cHBvcnRDb25zdGFudCxcbiAgICAgICAgXCJzdXBwb3J0LmNvbnN0YW50LmNvbG9yXCI6IENzc0hpZ2hsaWdodFJ1bGVzLnN1cHBvcnRDb25zdGFudENvbG9yLFxuICAgICAgICBcInN1cHBvcnQuY29uc3RhbnQuZm9udHNcIjogQ3NzSGlnaGxpZ2h0UnVsZXMuc3VwcG9ydENvbnN0YW50Rm9udHNcbiAgICB9LCBcInRleHRcIiwgdHJ1ZSk7XG5cbiAgICB0aGlzLiRydWxlcyA9IHtcbiAgICBzdGFydDogW1xuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudFwiLFxuICAgICAgICAgICAgcmVnZXggOiAvXFwvXFwvLiokL1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudFwiLCAvLyBtdWx0aSBsaW5lIGNvbW1lbnRcbiAgICAgICAgICAgIHJlZ2V4IDogL1xcL1xcKi8sXG4gICAgICAgICAgICBuZXh0IDogXCJjb21tZW50XCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdG9rZW46IFtcImVudGl0eS5uYW1lLmZ1bmN0aW9uLnN0eWx1c1wiLCBcInRleHRcIl0sXG4gICAgICAgICAgICByZWdleDogXCJeKFstYS16QS1aX11bLVxcXFx3XSopPyhcXFxcKClcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbjogW1wiZW50aXR5Lm90aGVyLmF0dHJpYnV0ZS1uYW1lLmNsYXNzLnN0eWx1c1wiXSxcbiAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFwuLT9bX2EtekEtWl0rW19hLXpBLVowLTktXSpcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbjogW1wiZW50aXR5Lmxhbmd1YWdlLnN0eWx1c1wiXSxcbiAgICAgICAgICAgIHJlZ2V4OiBcIl4gKiZcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbjogW1widmFyaWFibGUubGFuZ3VhZ2Uuc3R5bHVzXCJdLFxuICAgICAgICAgICAgcmVnZXg6IFwiKGFyZ3VtZW50cylcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbjogW1wia2V5d29yZC5zdHlsdXNcIl0sXG4gICAgICAgICAgICByZWdleDogXCJAWy1cXFxcd10rXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdG9rZW4gOiBbXCJwdW5jdHVhdGlvblwiLCBcImVudGl0eS5vdGhlci5hdHRyaWJ1dGUtbmFtZS5wc2V1ZG8tZWxlbWVudC5jc3NcIl0sXG4gICAgICAgICAgICByZWdleCA6IENzc0hpZ2hsaWdodFJ1bGVzLnBzZXVkb0VsZW1lbnRzXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogW1wicHVuY3R1YXRpb25cIiwgXCJlbnRpdHkub3RoZXIuYXR0cmlidXRlLW5hbWUucHNldWRvLWNsYXNzLmNzc1wiXSxcbiAgICAgICAgICAgIHJlZ2V4IDogQ3NzSGlnaGxpZ2h0UnVsZXMucHNldWRvQ2xhc3Nlc1xuICAgICAgICB9LCBcbiAgICAgICAge1xuICAgICAgICAgICAgdG9rZW46IFtcImVudGl0eS5uYW1lLnRhZy5zdHlsdXNcIl0sXG4gICAgICAgICAgICByZWdleDogXCIoPzpcXFxcYikoYXxhYmJyfGFjcm9ueW18YWRkcmVzc3xhcmVhfGFydGljbGV8YXNpZGV8YXVkaW98YnxiYXNlfGJpZ3xibG9ja3F1b3RlfGJvZHl8YnJ8YnV0dG9ufGNhbnZhc3xjYXB0aW9ufGNpdGV8Y29kZXxjb2x8Y29sZ3JvdXB8ZGF0YWxpc3R8ZGR8ZGVsfGRldGFpbHN8ZGZufGRpYWxvZ3xkaXZ8ZGx8ZHR8ZW18ZXZlbnRzb3VyY2V8ZmllbGRzZXR8ZmlndXJlfGZpZ2NhcHRpb258Zm9vdGVyfGZvcm18ZnJhbWV8ZnJhbWVzZXR8KD86aFsxLTZdKXxoZWFkfGhlYWRlcnxoZ3JvdXB8aHJ8aHRtbHxpfGlmcmFtZXxpbWd8aW5wdXR8aW5zfGtiZHxsYWJlbHxsZWdlbmR8bGl8bGlua3xtYXB8bWFya3xtZW51fG1ldGF8bWV0ZXJ8bmF2fG5vZnJhbWVzfG5vc2NyaXB0fG9iamVjdHxvbHxvcHRncm91cHxvcHRpb258b3V0cHV0fHB8cGFyYW18cHJlfHByb2dyZXNzfHF8c2FtcHxzY3JpcHR8c2VjdGlvbnxzZWxlY3R8c21hbGx8c3BhbnxzdHJpa2V8c3Ryb25nfHN0eWxlfHN1YnxzdW1tYXJ5fHN1cHx0YWJsZXx0Ym9keXx0ZHx0ZXh0YXJlYXx0Zm9vdHx0aHx0aGVhZHx0aW1lfHRpdGxlfHRyfHR0fHVsfHZhcnx2aWRlbykoPzpcXFxcYilcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5udW1lcmljXCIsICAvLyBoZXg2IGNvbG9yXG4gICAgICAgICAgICByZWdleDogXCIjW2EtZkEtRjAtOV17Nn1cIlxuICAgICAgICB9LCBcbiAgICAgICAge1xuICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQubnVtZXJpY1wiLCAvLyBoZXgzIGNvbG9yXG4gICAgICAgICAgICByZWdleDogXCIjW2EtZkEtRjAtOV17M31cIlxuICAgICAgICB9LCBcbiAgICAgICAge1xuICAgICAgICAgICAgdG9rZW46IFtcInB1bmN0dWF0aW9uLmRlZmluaXRpb24uZW50aXR5LnN0eWx1c1wiLCBcImVudGl0eS5vdGhlci5hdHRyaWJ1dGUtbmFtZS5pZC5zdHlsdXNcIl0sXG4gICAgICAgICAgICByZWdleDogXCIoIykoW2EtekEtWl1bYS16QS1aMC05Xy1dKilcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbjogXCJtZXRhLnZlbmRvci1wcmVmaXguc3R5bHVzXCIsXG4gICAgICAgICAgICByZWdleDogXCItd2Via2l0LXwtbW96XFxcXC18LW1zLXwtby1cIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbjogXCJrZXl3b3JkLmNvbnRyb2wuc3R5bHVzXCIsXG4gICAgICAgICAgICByZWdleDogXCIoPzohaW1wb3J0YW50fGZvcnxpbnxyZXR1cm58dHJ1ZXxmYWxzZXxudWxsfGlmfGVsc2V8dW5sZXNzfHJldHVybilcXFxcYlwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuOiBcImtleXdvcmQub3BlcmF0b3Iuc3R5bHVzXCIsXG4gICAgICAgICAgICByZWdleDogXCIhfH58XFxcXCt8LXwoPzpcXFxcKik/XFxcXCp8XFxcXC98JXwoPzpcXFxcLilcXFxcLlxcXFwufDx8PnwoPzo9fDp8XFxcXD98XFxcXCt8LXxcXFxcKnxcXFxcL3wlfDx8Pik/PXwhPVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuOiBcImtleXdvcmQub3BlcmF0b3Iuc3R5bHVzXCIsXG4gICAgICAgICAgICByZWdleDogXCIoPzppbnxpcyg/Om50KT98bm90KVxcXFxiXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgcmVnZXggOiBcIicoPz0uKVwiLFxuICAgICAgICAgICAgbmV4dCAgOiBcInFzdHJpbmdcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICByZWdleCA6ICdcIig/PS4pJyxcbiAgICAgICAgICAgIG5leHQgIDogXCJxcXN0cmluZ1wiXG4gICAgICAgIH0sIFxuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLFxuICAgICAgICAgICAgcmVnZXggOiBDc3NIaWdobGlnaHRSdWxlcy5udW1SZVxuICAgICAgICB9LCBcbiAgICAgICAge1xuICAgICAgICAgICAgdG9rZW4gOiBcImtleXdvcmRcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCIoPzpjaHxjbXxkZWd8ZW18ZXh8ZnJ8Z2R8Z3JhZHxIenxpbnxrSHp8bW18bXN8cGN8cHR8cHh8cmFkfHJlbXxzfHR1cm58dmh8dm18dnd8JSlcXFxcYlwiXG4gICAgICAgIH0sIFxuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbiA6IGtleXdvcmRNYXBwZXIsXG4gICAgICAgICAgICByZWdleCA6IFwiXFxcXC0/W2EtekEtWl9dW2EtekEtWjAtOV9cXFxcLV0qXCJcbiAgICAgICAgfVxuICAgIF0sXG4gICAgXCJjb21tZW50XCIgOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsIC8vIGNsb3NpbmcgY29tbWVudFxuICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwqXFxcXC9cIixcbiAgICAgICAgICAgIG5leHQgOiBcInN0YXJ0XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgZGVmYXVsdFRva2VuIDogXCJjb21tZW50XCJcbiAgICAgICAgfVxuICAgIF0sXG4gICAgXCJxcXN0cmluZ1wiIDogW1xuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICByZWdleCA6ICdbXlwiXFxcXFxcXFxdKydcbiAgICAgICAgfSwgXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcXFxcXCRcIixcbiAgICAgICAgICAgIG5leHQgIDogXCJxcXN0cmluZ1wiXG4gICAgICAgIH0sIFxuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICByZWdleCA6ICdcInwkJyxcbiAgICAgICAgICAgIG5leHQgIDogXCJzdGFydFwiXG4gICAgICAgIH1cbiAgICBdLFxuICAgIFwicXN0cmluZ1wiIDogW1xuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiW14nXFxcXFxcXFxdK1wiXG4gICAgICAgIH0sIFxuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiXFxcXFxcXFwkXCIsXG4gICAgICAgICAgICBuZXh0ICA6IFwicXN0cmluZ1wiXG4gICAgICAgIH0sIFxuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiJ3wkXCIsXG4gICAgICAgICAgICBuZXh0ICA6IFwic3RhcnRcIlxuICAgICAgICB9XG4gICAgXVxufTtcblxufTtcblxub29wLmluaGVyaXRzKFN0eWx1c0hpZ2hsaWdodFJ1bGVzLCBUZXh0SGlnaGxpZ2h0UnVsZXMpO1xuXG5leHBvcnRzLlN0eWx1c0hpZ2hsaWdodFJ1bGVzID0gU3R5bHVzSGlnaGxpZ2h0UnVsZXM7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=