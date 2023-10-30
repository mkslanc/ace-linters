"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[9736],{

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

/***/ 79736:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var TextMode = (__webpack_require__(98030).Mode);
var SassHighlightRules = (__webpack_require__(32475)/* .SassHighlightRules */ .o);
var FoldMode = (__webpack_require__(35090)/* .FoldMode */ .Z);

var Mode = function() {
    this.HighlightRules = SassHighlightRules;
    this.foldingRules = new FoldMode();
    this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, TextMode);

(function() {   
    this.lineCommentStart = "//";
    this.$id = "ace/mode/sass";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 32475:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var lang = __webpack_require__(20124);
var ScssHighlightRules = (__webpack_require__(71690)/* .ScssHighlightRules */ .m);

var SassHighlightRules = function() {
    ScssHighlightRules.call(this);
    var start = this.$rules.start;
    if (start[1].token == "comment") {
        start.splice(1, 1, {
            onMatch: function(value, currentState, stack) {
                stack.unshift(this.next, -1, value.length - 2, currentState);
                return "comment";
            },
            regex: /^\s*\/\*/,
            next: "comment"
        }, {
            token: "error.invalid",
            regex: "/\\*|[{;}]"
        }, {
            token: "support.type",
            regex: /^\s*:[\w\-]+\s/
        });
        
        this.$rules.comment = [
            {regex: /^\s*/, onMatch: function(value, currentState, stack) {
                if (stack[1] === -1)
                    stack[1] = Math.max(stack[2], value.length - 1);
                if (value.length <= stack[1]) {
                    /*shift3x*/stack.shift();stack.shift();stack.shift();
                    this.next = stack.shift();
                    return "text";
                } else {
                    this.next = "";
                    return "comment";
                }
            }, next: "start"},
            {defaultToken: "comment"}
        ];
    }
};

oop.inherits(SassHighlightRules, ScssHighlightRules);

exports.o = SassHighlightRules;


/***/ }),

/***/ 71690:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var lang = __webpack_require__(20124);
var TextHighlightRules = (__webpack_require__(28053)/* .TextHighlightRules */ .K);
var CssHighlightRules = __webpack_require__(99301);

var ScssHighlightRules = function() {
    
    var properties = lang.arrayToMap(CssHighlightRules.supportType.split("|"));

    var functions = lang.arrayToMap(
        ("hsl|hsla|rgb|rgba|url|attr|counter|counters|abs|adjust_color|adjust_hue|" +
         "alpha|join|blue|ceil|change_color|comparable|complement|darken|desaturate|" + 
         "floor|grayscale|green|hue|if|invert|join|length|lighten|lightness|mix|" + 
         "nth|opacify|opacity|percentage|quote|red|round|saturate|saturation|" +
         "scale_color|transparentize|type_of|unit|unitless|unquote").split("|")
    );

    var constants = lang.arrayToMap(CssHighlightRules.supportConstant.split("|"));

    var colors = lang.arrayToMap(CssHighlightRules.supportConstantColor.split("|"));
    
    var keywords = lang.arrayToMap(
        ("@mixin|@extend|@include|@import|@media|@debug|@warn|@if|@for|@each|@while|@else|@font-face|@-webkit-keyframes|if|and|!default|module|def|end|declare").split("|")
    );
    
    var tags = lang.arrayToMap(
        ("a|abbr|acronym|address|applet|area|article|aside|audio|b|base|basefont|bdo|" + 
         "big|blockquote|body|br|button|canvas|caption|center|cite|code|col|colgroup|" + 
         "command|datalist|dd|del|details|dfn|dir|div|dl|dt|em|embed|fieldset|" + 
         "figcaption|figure|font|footer|form|frame|frameset|h1|h2|h3|h4|h5|h6|head|" + 
         "header|hgroup|hr|html|i|iframe|img|input|ins|keygen|kbd|label|legend|li|" + 
         "link|map|mark|menu|meta|meter|nav|noframes|noscript|object|ol|optgroup|" + 
         "option|output|p|param|pre|progress|q|rp|rt|ruby|s|samp|script|section|select|" + 
         "small|source|span|strike|strong|style|sub|summary|sup|table|tbody|td|" + 
         "textarea|tfoot|th|thead|time|title|tr|tt|u|ul|var|video|wbr|xmp").split("|")
    );

    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used

    var numRe = "\\-?(?:(?:[0-9]+)|(?:[0-9]*\\.[0-9]+))";

    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used

    this.$rules = {
        "start" : [
            {
                token : "comment",
                regex : "\\/\\/.*$"
            },
            {
                token : "comment", // multi line comment
                regex : "\\/\\*",
                next : "comment"
            }, {
                token : "string", // single line
                regex : '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'
            }, {
                token : "string", // multi line string start
                regex : '["].*\\\\$',
                next : "qqstring"
            }, {
                token : "string", // single line
                regex : "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"
            }, {
                token : "string", // multi line string start
                regex : "['].*\\\\$",
                next : "qstring"
            }, {
                token : "constant.numeric",
                regex : numRe + "(?:ch|cm|deg|em|ex|fr|gd|grad|Hz|in|kHz|mm|ms|pc|pt|px|rad|rem|s|turn|vh|vmax|vmin|vm|vw|%)"
            }, {
                token : "constant.numeric", // hex6 color
                regex : "#[a-f0-9]{6}"
            }, {
                token : "constant.numeric", // hex3 color
                regex : "#[a-f0-9]{3}"
            }, {
                token : "constant.numeric",
                regex : numRe
            }, {
                token : ["support.function", "string", "support.function"],
                regex : "(url\\()(.*)(\\))"
            }, {
                token : function(value) {
                    if (properties.hasOwnProperty(value.toLowerCase()))
                        return "support.type";
                    if (keywords.hasOwnProperty(value))
                        return "keyword";
                    else if (constants.hasOwnProperty(value))
                        return "constant.language";
                    else if (functions.hasOwnProperty(value))
                        return "support.function";
                    else if (colors.hasOwnProperty(value.toLowerCase()))
                        return "support.constant.color";
                    else if (tags.hasOwnProperty(value.toLowerCase()))
                        return "variable.language";
                    else
                        return "text";
                },
                regex : "\\-?[@a-z_][@a-z0-9_\\-]*"
            }, {
                token : "variable",
                regex : "[a-z_\\-$][a-z0-9_\\-$]*\\b"
            }, {
                token: "variable.language",
                regex: "#[a-z0-9-_]+"
            }, {
                token: "variable.language",
                regex: "\\.[a-z0-9-_]+"
            }, {
                token: "variable.language",
                regex: ":[a-z0-9-_]+"
            }, {
                token: "constant",
                regex: "[a-z0-9-_]+"
            }, {
                token : "keyword.operator",
                regex : "<|>|<=|>=|==|!=|-|%|#|\\+|\\$|\\+|\\*"
            }, {
                token : "paren.lparen",
                regex : "[[({]"
            }, {
                token : "paren.rparen",
                regex : "[\\])}]"
            }, {
                token : "text",
                regex : "\\s+"
            }, {
                caseInsensitive: true
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
                regex : '(?:(?:\\\\.)|(?:[^"\\\\]))*?"',
                next : "start"
            }, {
                token : "string",
                regex : '.+'
            }
        ],
        "qstring" : [
            {
                token : "string",
                regex : "(?:(?:\\\\.)|(?:[^'\\\\]))*?'",
                next : "start"
            }, {
                token : "string",
                regex : '.+'
            }
        ]
    };
};

oop.inherits(ScssHighlightRules, TextHighlightRules);

exports.m = ScssHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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X21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvY3NzX2hpZ2hsaWdodF9ydWxlcy5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2ZvbGRpbmcvY29mZmVlLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvc2Fzcy5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL3Nhc3NfaGlnaGxpZ2h0X3J1bGVzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvc2Nzc19oaWdobGlnaHRfcnVsZXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBsYW5nID0gcmVxdWlyZShcIi4uL2xpYi9sYW5nXCIpO1xudmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcblxuXG4vKiBFeHBvcnRzIGFyZSBmb3IgU3R5bHVzIGFuZCBMZXNzIGhpZ2hsaWdodGVycyAqL1xudmFyIHN1cHBvcnRUeXBlID0gZXhwb3J0cy5zdXBwb3J0VHlwZSA9IFwiYWxpZ24tY29udGVudHxhbGlnbi1pdGVtc3xhbGlnbi1zZWxmfGFsbHxhbmltYXRpb258YW5pbWF0aW9uLWRlbGF5fGFuaW1hdGlvbi1kaXJlY3Rpb258YW5pbWF0aW9uLWR1cmF0aW9ufGFuaW1hdGlvbi1maWxsLW1vZGV8YW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudHxhbmltYXRpb24tbmFtZXxhbmltYXRpb24tcGxheS1zdGF0ZXxhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9ufGJhY2tmYWNlLXZpc2liaWxpdHl8YmFja2dyb3VuZHxiYWNrZ3JvdW5kLWF0dGFjaG1lbnR8YmFja2dyb3VuZC1ibGVuZC1tb2RlfGJhY2tncm91bmQtY2xpcHxiYWNrZ3JvdW5kLWNvbG9yfGJhY2tncm91bmQtaW1hZ2V8YmFja2dyb3VuZC1vcmlnaW58YmFja2dyb3VuZC1wb3NpdGlvbnxiYWNrZ3JvdW5kLXJlcGVhdHxiYWNrZ3JvdW5kLXNpemV8Ym9yZGVyfGJvcmRlci1ib3R0b218Ym9yZGVyLWJvdHRvbS1jb2xvcnxib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzfGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzfGJvcmRlci1ib3R0b20tc3R5bGV8Ym9yZGVyLWJvdHRvbS13aWR0aHxib3JkZXItY29sbGFwc2V8Ym9yZGVyLWNvbG9yfGJvcmRlci1pbWFnZXxib3JkZXItaW1hZ2Utb3V0c2V0fGJvcmRlci1pbWFnZS1yZXBlYXR8Ym9yZGVyLWltYWdlLXNsaWNlfGJvcmRlci1pbWFnZS1zb3VyY2V8Ym9yZGVyLWltYWdlLXdpZHRofGJvcmRlci1sZWZ0fGJvcmRlci1sZWZ0LWNvbG9yfGJvcmRlci1sZWZ0LXN0eWxlfGJvcmRlci1sZWZ0LXdpZHRofGJvcmRlci1yYWRpdXN8Ym9yZGVyLXJpZ2h0fGJvcmRlci1yaWdodC1jb2xvcnxib3JkZXItcmlnaHQtc3R5bGV8Ym9yZGVyLXJpZ2h0LXdpZHRofGJvcmRlci1zcGFjaW5nfGJvcmRlci1zdHlsZXxib3JkZXItdG9wfGJvcmRlci10b3AtY29sb3J8Ym9yZGVyLXRvcC1sZWZ0LXJhZGl1c3xib3JkZXItdG9wLXJpZ2h0LXJhZGl1c3xib3JkZXItdG9wLXN0eWxlfGJvcmRlci10b3Atd2lkdGh8Ym9yZGVyLXdpZHRofGJvdHRvbXxib3gtc2hhZG93fGJveC1zaXppbmd8Y2FwdGlvbi1zaWRlfGNsZWFyfGNsaXB8Y29sb3J8Y29sdW1uLWNvdW50fGNvbHVtbi1maWxsfGNvbHVtbi1nYXB8Y29sdW1uLXJ1bGV8Y29sdW1uLXJ1bGUtY29sb3J8Y29sdW1uLXJ1bGUtc3R5bGV8Y29sdW1uLXJ1bGUtd2lkdGh8Y29sdW1uLXNwYW58Y29sdW1uLXdpZHRofGNvbHVtbnN8Y29udGVudHxjb3VudGVyLWluY3JlbWVudHxjb3VudGVyLXJlc2V0fGN1cnNvcnxkaXJlY3Rpb258ZGlzcGxheXxlbXB0eS1jZWxsc3xmaWx0ZXJ8ZmxleHxmbGV4LWJhc2lzfGZsZXgtZGlyZWN0aW9ufGZsZXgtZmxvd3xmbGV4LWdyb3d8ZmxleC1zaHJpbmt8ZmxleC13cmFwfGZsb2F0fGZvbnR8Zm9udC1mYW1pbHl8Zm9udC1zaXplfGZvbnQtc2l6ZS1hZGp1c3R8Zm9udC1zdHJldGNofGZvbnQtc3R5bGV8Zm9udC12YXJpYW50fGZvbnQtd2VpZ2h0fGhhbmdpbmctcHVuY3R1YXRpb258aGVpZ2h0fGp1c3RpZnktY29udGVudHxsZWZ0fGxldHRlci1zcGFjaW5nfGxpbmUtaGVpZ2h0fGxpc3Qtc3R5bGV8bGlzdC1zdHlsZS1pbWFnZXxsaXN0LXN0eWxlLXBvc2l0aW9ufGxpc3Qtc3R5bGUtdHlwZXxtYXJnaW58bWFyZ2luLWJvdHRvbXxtYXJnaW4tbGVmdHxtYXJnaW4tcmlnaHR8bWFyZ2luLXRvcHxtYXgtaGVpZ2h0fG1heC13aWR0aHxtYXgtem9vbXxtaW4taGVpZ2h0fG1pbi13aWR0aHxtaW4tem9vbXxuYXYtZG93bnxuYXYtaW5kZXh8bmF2LWxlZnR8bmF2LXJpZ2h0fG5hdi11cHxvcGFjaXR5fG9yZGVyfG91dGxpbmV8b3V0bGluZS1jb2xvcnxvdXRsaW5lLW9mZnNldHxvdXRsaW5lLXN0eWxlfG91dGxpbmUtd2lkdGh8b3ZlcmZsb3d8b3ZlcmZsb3cteHxvdmVyZmxvdy15fHBhZGRpbmd8cGFkZGluZy1ib3R0b218cGFkZGluZy1sZWZ0fHBhZGRpbmctcmlnaHR8cGFkZGluZy10b3B8cGFnZS1icmVhay1hZnRlcnxwYWdlLWJyZWFrLWJlZm9yZXxwYWdlLWJyZWFrLWluc2lkZXxwZXJzcGVjdGl2ZXxwZXJzcGVjdGl2ZS1vcmlnaW58cG9zaXRpb258cXVvdGVzfHJlc2l6ZXxyaWdodHx0YWItc2l6ZXx0YWJsZS1sYXlvdXR8dGV4dC1hbGlnbnx0ZXh0LWFsaWduLWxhc3R8dGV4dC1kZWNvcmF0aW9ufHRleHQtZGVjb3JhdGlvbi1jb2xvcnx0ZXh0LWRlY29yYXRpb24tbGluZXx0ZXh0LWRlY29yYXRpb24tc3R5bGV8dGV4dC1pbmRlbnR8dGV4dC1qdXN0aWZ5fHRleHQtb3ZlcmZsb3d8dGV4dC1zaGFkb3d8dGV4dC10cmFuc2Zvcm18dG9wfHRyYW5zZm9ybXx0cmFuc2Zvcm0tb3JpZ2lufHRyYW5zZm9ybS1zdHlsZXx0cmFuc2l0aW9ufHRyYW5zaXRpb24tZGVsYXl8dHJhbnNpdGlvbi1kdXJhdGlvbnx0cmFuc2l0aW9uLXByb3BlcnR5fHRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9ufHVuaWNvZGUtYmlkaXx1c2VyLXNlbGVjdHx1c2VyLXpvb218dmVydGljYWwtYWxpZ258dmlzaWJpbGl0eXx3aGl0ZS1zcGFjZXx3aWR0aHx3b3JkLWJyZWFrfHdvcmQtc3BhY2luZ3x3b3JkLXdyYXB8ei1pbmRleFwiO1xudmFyIHN1cHBvcnRGdW5jdGlvbiA9IGV4cG9ydHMuc3VwcG9ydEZ1bmN0aW9uID0gXCJyZ2J8cmdiYXx1cmx8YXR0cnxjb3VudGVyfGNvdW50ZXJzXCI7XG52YXIgc3VwcG9ydENvbnN0YW50ID0gZXhwb3J0cy5zdXBwb3J0Q29uc3RhbnQgPSBcImFic29sdXRlfGFmdGVyLWVkZ2V8YWZ0ZXJ8YWxsLXNjcm9sbHxhbGx8YWxwaGFiZXRpY3xhbHdheXN8YW50aWFsaWFzZWR8YXJtZW5pYW58YXV0b3xhdm9pZC1jb2x1bW58YXZvaWQtcGFnZXxhdm9pZHxiYWxhbmNlfGJhc2VsaW5lfGJlZm9yZS1lZGdlfGJlZm9yZXxiZWxvd3xiaWRpLW92ZXJyaWRlfGJsb2NrLWxpbmUtaGVpZ2h0fGJsb2NrfGJvbGR8Ym9sZGVyfGJvcmRlci1ib3h8Ym90aHxib3R0b218Ym94fGJyZWFrLWFsbHxicmVhay13b3JkfGNhcGl0YWxpemV8Y2Fwcy1oZWlnaHR8Y2FwdGlvbnxjZW50ZXJ8Y2VudHJhbHxjaGFyfGNpcmNsZXxjamstaWRlb2dyYXBoaWN8Y2xvbmV8Y2xvc2UtcXVvdGV8Y29sLXJlc2l6ZXxjb2xsYXBzZXxjb2x1bW58Y29uc2lkZXItc2hpZnRzfGNvbnRhaW58Y29udGVudC1ib3h8Y292ZXJ8Y3Jvc3NoYWlyfGN1YmljLWJlemllcnxkYXNoZWR8ZGVjaW1hbC1sZWFkaW5nLXplcm98ZGVjaW1hbHxkZWZhdWx0fGRpc2FibGVkfGRpc2N8ZGlzcmVnYXJkLXNoaWZ0c3xkaXN0cmlidXRlLWFsbC1saW5lc3xkaXN0cmlidXRlLWxldHRlcnxkaXN0cmlidXRlLXNwYWNlfGRpc3RyaWJ1dGV8ZG90dGVkfGRvdWJsZXxlLXJlc2l6ZXxlYXNlLWlufGVhc2UtaW4tb3V0fGVhc2Utb3V0fGVhc2V8ZWxsaXBzaXN8ZW5kfGV4Y2x1ZGUtcnVieXxmbGV4LWVuZHxmbGV4LXN0YXJ0fGZpbGx8Zml4ZWR8Z2VvcmdpYW58Z2x5cGhzfGdyaWQtaGVpZ2h0fGdyb292ZXxoYW5kfGhhbmdpbmd8aGVicmV3fGhlbHB8aGlkZGVufGhpcmFnYW5hLWlyb2hhfGhpcmFnYW5hfGhvcml6b250YWx8aWNvbnxpZGVvZ3JhcGgtYWxwaGF8aWRlb2dyYXBoLW51bWVyaWN8aWRlb2dyYXBoLXBhcmVudGhlc2lzfGlkZW9ncmFwaC1zcGFjZXxpZGVvZ3JhcGhpY3xpbmFjdGl2ZXxpbmNsdWRlLXJ1Ynl8aW5oZXJpdHxpbml0aWFsfGlubGluZS1ibG9ja3xpbmxpbmUtYm94fGlubGluZS1saW5lLWhlaWdodHxpbmxpbmUtdGFibGV8aW5saW5lfGluc2V0fGluc2lkZXxpbnRlci1pZGVvZ3JhcGh8aW50ZXItd29yZHxpbnZlcnR8aXRhbGljfGp1c3RpZnl8a2F0YWthbmEtaXJvaGF8a2F0YWthbmF8a2VlcC1hbGx8bGFzdHxsZWZ0fGxpZ2h0ZXJ8bGluZS1lZGdlfGxpbmUtdGhyb3VnaHxsaW5lfGxpbmVhcnxsaXN0LWl0ZW18bG9jYWx8bG9vc2V8bG93ZXItYWxwaGF8bG93ZXItZ3JlZWt8bG93ZXItbGF0aW58bG93ZXItcm9tYW58bG93ZXJjYXNlfGxyLXRifGx0cnxtYXRoZW1hdGljYWx8bWF4LWhlaWdodHxtYXgtc2l6ZXxtZWRpdW18bWVudXxtZXNzYWdlLWJveHxtaWRkbGV8bW92ZXxuLXJlc2l6ZXxuZS1yZXNpemV8bmV3c3BhcGVyfG5vLWNoYW5nZXxuby1jbG9zZS1xdW90ZXxuby1kcm9wfG5vLW9wZW4tcXVvdGV8bm8tcmVwZWF0fG5vbmV8bm9ybWFsfG5vdC1hbGxvd2VkfG5vd3JhcHxudy1yZXNpemV8b2JsaXF1ZXxvcGVuLXF1b3RlfG91dHNldHxvdXRzaWRlfG92ZXJsaW5lfHBhZGRpbmctYm94fHBhZ2V8cG9pbnRlcnxwcmUtbGluZXxwcmUtd3JhcHxwcmV8cHJlc2VydmUtM2R8cHJvZ3Jlc3N8cmVsYXRpdmV8cmVwZWF0LXh8cmVwZWF0LXl8cmVwZWF0fHJlcGxhY2VkfHJlc2V0LXNpemV8cmlkZ2V8cmlnaHR8cm91bmR8cm93LXJlc2l6ZXxydGx8cy1yZXNpemV8c2Nyb2xsfHNlLXJlc2l6ZXxzZXBhcmF0ZXxzbGljZXxzbWFsbC1jYXBzfHNtYWxsLWNhcHRpb258c29saWR8c3BhY2V8c3F1YXJlfHN0YXJ0fHN0YXRpY3xzdGF0dXMtYmFyfHN0ZXAtZW5kfHN0ZXAtc3RhcnR8c3RlcHN8c3RyZXRjaHxzdHJpY3R8c3VifHN1cGVyfHN3LXJlc2l6ZXx0YWJsZS1jYXB0aW9ufHRhYmxlLWNlbGx8dGFibGUtY29sdW1uLWdyb3VwfHRhYmxlLWNvbHVtbnx0YWJsZS1mb290ZXItZ3JvdXB8dGFibGUtaGVhZGVyLWdyb3VwfHRhYmxlLXJvdy1ncm91cHx0YWJsZS1yb3d8dGFibGV8dGItcmx8dGV4dC1hZnRlci1lZGdlfHRleHQtYmVmb3JlLWVkZ2V8dGV4dC1ib3R0b218dGV4dC1zaXplfHRleHQtdG9wfHRleHR8dGhpY2t8dGhpbnx0cmFuc3BhcmVudHx1bmRlcmxpbmV8dXBwZXItYWxwaGF8dXBwZXItbGF0aW58dXBwZXItcm9tYW58dXBwZXJjYXNlfHVzZS1zY3JpcHR8dmVydGljYWwtaWRlb2dyYXBoaWN8dmVydGljYWwtdGV4dHx2aXNpYmxlfHctcmVzaXplfHdhaXR8d2hpdGVzcGFjZXx6LWluZGV4fHplcm98em9vbVwiO1xudmFyIHN1cHBvcnRDb25zdGFudENvbG9yID0gZXhwb3J0cy5zdXBwb3J0Q29uc3RhbnRDb2xvciA9IFwiYWxpY2VibHVlfGFudGlxdWV3aGl0ZXxhcXVhfGFxdWFtYXJpbmV8YXp1cmV8YmVpZ2V8YmlzcXVlfGJsYWNrfGJsYW5jaGVkYWxtb25kfGJsdWV8Ymx1ZXZpb2xldHxicm93bnxidXJseXdvb2R8Y2FkZXRibHVlfGNoYXJ0cmV1c2V8Y2hvY29sYXRlfGNvcmFsfGNvcm5mbG93ZXJibHVlfGNvcm5zaWxrfGNyaW1zb258Y3lhbnxkYXJrYmx1ZXxkYXJrY3lhbnxkYXJrZ29sZGVucm9kfGRhcmtncmF5fGRhcmtncmVlbnxkYXJrZ3JleXxkYXJra2hha2l8ZGFya21hZ2VudGF8ZGFya29saXZlZ3JlZW58ZGFya29yYW5nZXxkYXJrb3JjaGlkfGRhcmtyZWR8ZGFya3NhbG1vbnxkYXJrc2VhZ3JlZW58ZGFya3NsYXRlYmx1ZXxkYXJrc2xhdGVncmF5fGRhcmtzbGF0ZWdyZXl8ZGFya3R1cnF1b2lzZXxkYXJrdmlvbGV0fGRlZXBwaW5rfGRlZXBza3libHVlfGRpbWdyYXl8ZGltZ3JleXxkb2RnZXJibHVlfGZpcmVicmlja3xmbG9yYWx3aGl0ZXxmb3Jlc3RncmVlbnxmdWNoc2lhfGdhaW5zYm9yb3xnaG9zdHdoaXRlfGdvbGR8Z29sZGVucm9kfGdyYXl8Z3JlZW58Z3JlZW55ZWxsb3d8Z3JleXxob25leWRld3xob3RwaW5rfGluZGlhbnJlZHxpbmRpZ298aXZvcnl8a2hha2l8bGF2ZW5kZXJ8bGF2ZW5kZXJibHVzaHxsYXduZ3JlZW58bGVtb25jaGlmZm9ufGxpZ2h0Ymx1ZXxsaWdodGNvcmFsfGxpZ2h0Y3lhbnxsaWdodGdvbGRlbnJvZHllbGxvd3xsaWdodGdyYXl8bGlnaHRncmVlbnxsaWdodGdyZXl8bGlnaHRwaW5rfGxpZ2h0c2FsbW9ufGxpZ2h0c2VhZ3JlZW58bGlnaHRza3libHVlfGxpZ2h0c2xhdGVncmF5fGxpZ2h0c2xhdGVncmV5fGxpZ2h0c3RlZWxibHVlfGxpZ2h0eWVsbG93fGxpbWV8bGltZWdyZWVufGxpbmVufG1hZ2VudGF8bWFyb29ufG1lZGl1bWFxdWFtYXJpbmV8bWVkaXVtYmx1ZXxtZWRpdW1vcmNoaWR8bWVkaXVtcHVycGxlfG1lZGl1bXNlYWdyZWVufG1lZGl1bXNsYXRlYmx1ZXxtZWRpdW1zcHJpbmdncmVlbnxtZWRpdW10dXJxdW9pc2V8bWVkaXVtdmlvbGV0cmVkfG1pZG5pZ2h0Ymx1ZXxtaW50Y3JlYW18bWlzdHlyb3NlfG1vY2Nhc2lufG5hdmFqb3doaXRlfG5hdnl8b2xkbGFjZXxvbGl2ZXxvbGl2ZWRyYWJ8b3JhbmdlfG9yYW5nZXJlZHxvcmNoaWR8cGFsZWdvbGRlbnJvZHxwYWxlZ3JlZW58cGFsZXR1cnF1b2lzZXxwYWxldmlvbGV0cmVkfHBhcGF5YXdoaXB8cGVhY2hwdWZmfHBlcnV8cGlua3xwbHVtfHBvd2RlcmJsdWV8cHVycGxlfHJlYmVjY2FwdXJwbGV8cmVkfHJvc3licm93bnxyb3lhbGJsdWV8c2FkZGxlYnJvd258c2FsbW9ufHNhbmR5YnJvd258c2VhZ3JlZW58c2Vhc2hlbGx8c2llbm5hfHNpbHZlcnxza3libHVlfHNsYXRlYmx1ZXxzbGF0ZWdyYXl8c2xhdGVncmV5fHNub3d8c3ByaW5nZ3JlZW58c3RlZWxibHVlfHRhbnx0ZWFsfHRoaXN0bGV8dG9tYXRvfHR1cnF1b2lzZXx2aW9sZXR8d2hlYXR8d2hpdGV8d2hpdGVzbW9rZXx5ZWxsb3d8eWVsbG93Z3JlZW5cIjtcbnZhciBzdXBwb3J0Q29uc3RhbnRGb250cyA9IGV4cG9ydHMuc3VwcG9ydENvbnN0YW50Rm9udHMgPSBcImFyaWFsfGNlbnR1cnl8Y29taWN8Y291cmllcnxjdXJzaXZlfGZhbnRhc3l8Z2FyYW1vbmR8Z2VvcmdpYXxoZWx2ZXRpY2F8aW1wYWN0fGx1Y2lkYXxzeW1ib2x8c3lzdGVtfHRhaG9tYXx0aW1lc3x0cmVidWNoZXR8dXRvcGlhfHZlcmRhbmF8d2ViZGluZ3N8c2Fucy1zZXJpZnxzZXJpZnxtb25vc3BhY2VcIjtcblxudmFyIG51bVJlID0gZXhwb3J0cy5udW1SZSA9IFwiXFxcXC0/KD86KD86WzAtOV0rKD86XFxcXC5bMC05XSspPyl8KD86XFxcXC5bMC05XSspKVwiO1xudmFyIHBzZXVkb0VsZW1lbnRzID0gZXhwb3J0cy5wc2V1ZG9FbGVtZW50cyA9IFwiKFxcXFw6KylcXFxcYihhZnRlcnxiZWZvcmV8Zmlyc3QtbGV0dGVyfGZpcnN0LWxpbmV8bW96LXNlbGVjdGlvbnxzZWxlY3Rpb24pXFxcXGJcIjtcbnZhciBwc2V1ZG9DbGFzc2VzICA9IGV4cG9ydHMucHNldWRvQ2xhc3NlcyA9ICBcIig6KVxcXFxiKGFjdGl2ZXxjaGVja2VkfGRpc2FibGVkfGVtcHR5fGVuYWJsZWR8Zmlyc3QtY2hpbGR8Zmlyc3Qtb2YtdHlwZXxmb2N1c3xob3ZlcnxpbmRldGVybWluYXRlfGludmFsaWR8bGFzdC1jaGlsZHxsYXN0LW9mLXR5cGV8bGlua3xub3R8bnRoLWNoaWxkfG50aC1sYXN0LWNoaWxkfG50aC1sYXN0LW9mLXR5cGV8bnRoLW9mLXR5cGV8b25seS1jaGlsZHxvbmx5LW9mLXR5cGV8cmVxdWlyZWR8cm9vdHx0YXJnZXR8dmFsaWR8dmlzaXRlZClcXFxcYlwiO1xuXG52YXIgQ3NzSGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbigpIHtcblxuICAgIHZhciBrZXl3b3JkTWFwcGVyID0gdGhpcy5jcmVhdGVLZXl3b3JkTWFwcGVyKHtcbiAgICAgICAgXCJzdXBwb3J0LmZ1bmN0aW9uXCI6IHN1cHBvcnRGdW5jdGlvbixcbiAgICAgICAgXCJzdXBwb3J0LmNvbnN0YW50XCI6IHN1cHBvcnRDb25zdGFudCxcbiAgICAgICAgXCJzdXBwb3J0LnR5cGVcIjogc3VwcG9ydFR5cGUsXG4gICAgICAgIFwic3VwcG9ydC5jb25zdGFudC5jb2xvclwiOiBzdXBwb3J0Q29uc3RhbnRDb2xvcixcbiAgICAgICAgXCJzdXBwb3J0LmNvbnN0YW50LmZvbnRzXCI6IHN1cHBvcnRDb25zdGFudEZvbnRzXG4gICAgfSwgXCJ0ZXh0XCIsIHRydWUpO1xuXG4gICAgLy8gcmVnZXhwIG11c3Qgbm90IGhhdmUgY2FwdHVyaW5nIHBhcmVudGhlc2VzLiBVc2UgKD86KSBpbnN0ZWFkLlxuICAgIC8vIHJlZ2V4cHMgYXJlIG9yZGVyZWQgLT4gdGhlIGZpcnN0IG1hdGNoIGlzIHVzZWRcblxuICAgIHRoaXMuJHJ1bGVzID0ge1xuICAgICAgICBcInN0YXJ0XCIgOiBbe1xuICAgICAgICAgICAgaW5jbHVkZSA6IFtcInN0cmluZ3NcIiwgXCJ1cmxcIiwgXCJjb21tZW50c1wiXVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJwYXJlbi5scGFyZW5cIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFx7XCIsXG4gICAgICAgICAgICBuZXh0OiAgXCJydWxlc2V0XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwicGFyZW4ucnBhcmVuXCIsXG4gICAgICAgICAgICByZWdleDogXCJcXFxcfVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgcmVnZXg6IFwiQCg/IXZpZXdwb3J0KVwiLFxuICAgICAgICAgICAgbmV4dDogIFwibWVkaWFcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJrZXl3b3JkXCIsXG4gICAgICAgICAgICByZWdleDogXCIjW2EtejAtOS1fXStcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJrZXl3b3JkXCIsXG4gICAgICAgICAgICByZWdleDogXCIlXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwidmFyaWFibGVcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFwuW2EtejAtOS1fXStcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIjpbYS16MC05LV9dK1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5udW1lcmljXCIsXG4gICAgICAgICAgICByZWdleCA6IG51bVJlXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50XCIsXG4gICAgICAgICAgICByZWdleDogXCJbYS16MC05LV9dK1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNhc2VJbnNlbnNpdGl2ZTogdHJ1ZVxuICAgICAgICB9XSxcblxuICAgICAgICBcIm1lZGlhXCI6IFt7XG4gICAgICAgICAgICBpbmNsdWRlIDogW1wic3RyaW5nc1wiLCBcInVybFwiLCBcImNvbW1lbnRzXCJdXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInBhcmVuLmxwYXJlblwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiXFxcXHtcIixcbiAgICAgICAgICAgIG5leHQ6ICBcInN0YXJ0XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwicGFyZW4ucnBhcmVuXCIsXG4gICAgICAgICAgICByZWdleDogXCJcXFxcfVwiLFxuICAgICAgICAgICAgbmV4dDogIFwic3RhcnRcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIjtcIixcbiAgICAgICAgICAgIG5leHQ6ICBcInN0YXJ0XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwia2V5d29yZFwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiKD86bWVkaWF8c3VwcG9ydHN8ZG9jdW1lbnR8Y2hhcnNldHxpbXBvcnR8bmFtZXNwYWNlfG1lZGlhfHN1cHBvcnRzfGRvY3VtZW50XCJcbiAgICAgICAgICAgICAgICArIFwifHBhZ2V8Zm9udHxrZXlmcmFtZXN8dmlld3BvcnR8Y291bnRlci1zdHlsZXxmb250LWZlYXR1cmUtdmFsdWVzXCJcbiAgICAgICAgICAgICAgICArIFwifHN3YXNofG9ybmFtZW50c3xhbm5vdGF0aW9ufHN0eWxpc3RpY3xzdHlsZXNldHxjaGFyYWN0ZXItdmFyaWFudClcIlxuICAgICAgICB9XSxcblxuICAgICAgICBcImNvbW1lbnRzXCIgOiBbe1xuICAgICAgICAgICAgdG9rZW46IFwiY29tbWVudFwiLCAvLyBtdWx0aSBsaW5lIGNvbW1lbnRcbiAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFwvXFxcXCpcIixcbiAgICAgICAgICAgIHB1c2g6IFt7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXCpcXFxcL1wiLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcInBvcFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuIDogXCJjb21tZW50XCJcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH1dLFxuXG4gICAgICAgIFwicnVsZXNldFwiIDogW3tcbiAgICAgICAgICAgIHJlZ2V4IDogXCItKHdlYmtpdHxtc3xtb3p8byktXCIsXG4gICAgICAgICAgICB0b2tlbiA6IFwidGV4dFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJwdW5jdHVhdGlvbi5vcGVyYXRvclwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIls6O11cIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwicGFyZW4ucnBhcmVuXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiXFxcXH1cIixcbiAgICAgICAgICAgIG5leHQgOiBcInN0YXJ0XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaW5jbHVkZSA6IFtcInN0cmluZ3NcIiwgXCJ1cmxcIiwgXCJjb21tZW50c1wiXVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFtcImNvbnN0YW50Lm51bWVyaWNcIiwgXCJrZXl3b3JkXCJdLFxuICAgICAgICAgICAgcmVnZXggOiBcIihcIiArIG51bVJlICsgXCIpKGNofGNtfGRlZ3xlbXxleHxmcnxnZHxncmFkfEh6fGlufGtIenxtbXxtc3xwY3xwdHxweHxyYWR8cmVtfHN8dHVybnx2aHx2bWF4fHZtaW58dm18dnd8JSlcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLFxuICAgICAgICAgICAgcmVnZXggOiBudW1SZVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLCAgLy8gaGV4NiBjb2xvclxuICAgICAgICAgICAgcmVnZXggOiBcIiNbYS1mMC05XXs2fVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5udW1lcmljXCIsIC8vIGhleDMgY29sb3JcbiAgICAgICAgICAgIHJlZ2V4IDogXCIjW2EtZjAtOV17M31cIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFtcInB1bmN0dWF0aW9uXCIsIFwiZW50aXR5Lm90aGVyLmF0dHJpYnV0ZS1uYW1lLnBzZXVkby1lbGVtZW50LmNzc1wiXSxcbiAgICAgICAgICAgIHJlZ2V4IDogcHNldWRvRWxlbWVudHNcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBbXCJwdW5jdHVhdGlvblwiLCBcImVudGl0eS5vdGhlci5hdHRyaWJ1dGUtbmFtZS5wc2V1ZG8tY2xhc3MuY3NzXCJdLFxuICAgICAgICAgICAgcmVnZXggOiBwc2V1ZG9DbGFzc2VzXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGluY2x1ZGU6IFwidXJsXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBrZXl3b3JkTWFwcGVyLFxuICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwtP1thLXpBLVpfXVthLXpBLVowLTlfXFxcXC1dKlwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNhc2VJbnNlbnNpdGl2ZTogdHJ1ZVxuICAgICAgICB9XSxcblxuICAgICAgICB1cmw6IFt7XG4gICAgICAgICAgICB0b2tlbiA6IFwic3VwcG9ydC5mdW5jdGlvblwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIig/OnVybCg6Py1wcmVmaXgpP3xkb21haW58cmVnZXhwKVxcXFwoXCIsXG4gICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdXBwb3J0LmZ1bmN0aW9uXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwpXCIsXG4gICAgICAgICAgICAgICAgbmV4dCA6IFwicG9wXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwic3RyaW5nXCJcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH1dLFxuXG4gICAgICAgIHN0cmluZ3M6IFt7XG4gICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nLnN0YXJ0XCIsXG4gICAgICAgICAgICByZWdleCA6IFwiJ1wiLFxuICAgICAgICAgICAgcHVzaCA6IFt7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZy5lbmRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiJ3wkXCIsXG4gICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGluY2x1ZGUgOiBcImVzY2FwZXNcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC9cXFxcJC8sXG4gICAgICAgICAgICAgICAgY29uc3VtZUxpbmVFbmQ6IHRydWVcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwic3RyaW5nXCJcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmcuc3RhcnRcIixcbiAgICAgICAgICAgIHJlZ2V4IDogJ1wiJyxcbiAgICAgICAgICAgIHB1c2ggOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmcuZW5kXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAnXCJ8JCcsXG4gICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGluY2x1ZGUgOiBcImVzY2FwZXNcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC9cXFxcJC8sXG4gICAgICAgICAgICAgICAgY29uc3VtZUxpbmVFbmQ6IHRydWVcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwic3RyaW5nXCJcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH1dLFxuICAgICAgICBlc2NhcGVzOiBbe1xuICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLFxuICAgICAgICAgICAgcmVnZXggOiAvXFxcXChbYS1mQS1GXFxkXXsxLDZ9fFteYS1mQS1GXFxkXSkvXG4gICAgICAgIH1dXG5cbiAgICB9O1xuXG4gICAgdGhpcy5ub3JtYWxpemVSdWxlcygpO1xufTtcblxub29wLmluaGVyaXRzKENzc0hpZ2hsaWdodFJ1bGVzLCBUZXh0SGlnaGxpZ2h0UnVsZXMpO1xuXG5leHBvcnRzLkNzc0hpZ2hsaWdodFJ1bGVzID0gQ3NzSGlnaGxpZ2h0UnVsZXM7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi8uLi9saWIvb29wXCIpO1xudmFyIEJhc2VGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRfbW9kZVwiKS5Gb2xkTW9kZTtcbnZhciBSYW5nZSA9IHJlcXVpcmUoXCIuLi8uLi9yYW5nZVwiKS5SYW5nZTtcblxudmFyIEZvbGRNb2RlID0gZXhwb3J0cy5Gb2xkTW9kZSA9IGZ1bmN0aW9uKCkge307XG5vb3AuaW5oZXJpdHMoRm9sZE1vZGUsIEJhc2VGb2xkTW9kZSk7XG5cbihmdW5jdGlvbigpIHtcbiAgICB0aGlzLmNvbW1lbnRCbG9jayA9IGZ1bmN0aW9uKHNlc3Npb24sIHJvdykge1xuICAgICAgICB2YXIgcmUgPSAvXFxTLztcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgdmFyIHN0YXJ0TGV2ZWwgPSBsaW5lLnNlYXJjaChyZSk7XG4gICAgICAgIGlmIChzdGFydExldmVsID09IC0xIHx8IGxpbmVbc3RhcnRMZXZlbF0gIT0gXCIjXCIpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdmFyIHN0YXJ0Q29sdW1uID0gbGluZS5sZW5ndGg7XG4gICAgICAgIHZhciBtYXhSb3cgPSBzZXNzaW9uLmdldExlbmd0aCgpO1xuICAgICAgICB2YXIgc3RhcnRSb3cgPSByb3c7XG4gICAgICAgIHZhciBlbmRSb3cgPSByb3c7XG5cbiAgICAgICAgd2hpbGUgKCsrcm93IDwgbWF4Um93KSB7XG4gICAgICAgICAgICBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgICAgICB2YXIgbGV2ZWwgPSBsaW5lLnNlYXJjaChyZSk7XG5cbiAgICAgICAgICAgIGlmIChsZXZlbCA9PSAtMSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcblxuICAgICAgICAgICAgaWYgKGxpbmVbbGV2ZWxdICE9IFwiI1wiKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBlbmRSb3cgPSByb3c7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW5kUm93ID4gc3RhcnRSb3cpIHtcbiAgICAgICAgICAgIHZhciBlbmRDb2x1bW4gPSBzZXNzaW9uLmdldExpbmUoZW5kUm93KS5sZW5ndGg7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFJhbmdlKHN0YXJ0Um93LCBzdGFydENvbHVtbiwgZW5kUm93LCBlbmRDb2x1bW4pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMuZ2V0Rm9sZFdpZGdldFJhbmdlID0gZnVuY3Rpb24oc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpIHtcbiAgICAgICAgdmFyIHJhbmdlID0gdGhpcy5pbmRlbnRhdGlvbkJsb2NrKHNlc3Npb24sIHJvdyk7XG4gICAgICAgIGlmIChyYW5nZSlcbiAgICAgICAgICAgIHJldHVybiByYW5nZTtcblxuICAgICAgICByYW5nZSA9IHRoaXMuY29tbWVudEJsb2NrKHNlc3Npb24sIHJvdyk7XG4gICAgICAgIGlmIChyYW5nZSlcbiAgICAgICAgICAgIHJldHVybiByYW5nZTtcbiAgICB9O1xuXG4gICAgLy8gbXVzdCByZXR1cm4gXCJcIiBpZiB0aGVyZSdzIG5vIGZvbGQsIHRvIGVuYWJsZSBjYWNoaW5nXG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0ID0gZnVuY3Rpb24oc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgdmFyIGluZGVudCA9IGxpbmUuc2VhcmNoKC9cXFMvKTtcbiAgICAgICAgdmFyIG5leHQgPSBzZXNzaW9uLmdldExpbmUocm93ICsgMSk7XG4gICAgICAgIHZhciBwcmV2ID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyAtIDEpO1xuICAgICAgICB2YXIgcHJldkluZGVudCA9IHByZXYuc2VhcmNoKC9cXFMvKTtcbiAgICAgICAgdmFyIG5leHRJbmRlbnQgPSBuZXh0LnNlYXJjaCgvXFxTLyk7XG5cbiAgICAgICAgaWYgKGluZGVudCA9PSAtMSkge1xuICAgICAgICAgICAgc2Vzc2lvbi5mb2xkV2lkZ2V0c1tyb3cgLSAxXSA9IHByZXZJbmRlbnQhPSAtMSAmJiBwcmV2SW5kZW50IDwgbmV4dEluZGVudCA/IFwic3RhcnRcIiA6IFwiXCI7XG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGRvY3VtZW50YXRpb24gY29tbWVudHNcbiAgICAgICAgaWYgKHByZXZJbmRlbnQgPT0gLTEpIHtcbiAgICAgICAgICAgIGlmIChpbmRlbnQgPT0gbmV4dEluZGVudCAmJiBsaW5lW2luZGVudF0gPT0gXCIjXCIgJiYgbmV4dFtpbmRlbnRdID09IFwiI1wiKSB7XG4gICAgICAgICAgICAgICAgc2Vzc2lvbi5mb2xkV2lkZ2V0c1tyb3cgLSAxXSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgc2Vzc2lvbi5mb2xkV2lkZ2V0c1tyb3cgKyAxXSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwic3RhcnRcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChwcmV2SW5kZW50ID09IGluZGVudCAmJiBsaW5lW2luZGVudF0gPT0gXCIjXCIgJiYgcHJldltpbmRlbnRdID09IFwiI1wiKSB7XG4gICAgICAgICAgICBpZiAoc2Vzc2lvbi5nZXRMaW5lKHJvdyAtIDIpLnNlYXJjaCgvXFxTLykgPT0gLTEpIHtcbiAgICAgICAgICAgICAgICBzZXNzaW9uLmZvbGRXaWRnZXRzW3JvdyAtIDFdID0gXCJzdGFydFwiO1xuICAgICAgICAgICAgICAgIHNlc3Npb24uZm9sZFdpZGdldHNbcm93ICsgMV0gPSBcIlwiO1xuICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByZXZJbmRlbnQhPSAtMSAmJiBwcmV2SW5kZW50IDwgaW5kZW50KVxuICAgICAgICAgICAgc2Vzc2lvbi5mb2xkV2lkZ2V0c1tyb3cgLSAxXSA9IFwic3RhcnRcIjtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgc2Vzc2lvbi5mb2xkV2lkZ2V0c1tyb3cgLSAxXSA9IFwiXCI7XG5cbiAgICAgICAgaWYgKGluZGVudCA8IG5leHRJbmRlbnQpXG4gICAgICAgICAgICByZXR1cm4gXCJzdGFydFwiO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICB9O1xuXG59KS5jYWxsKEZvbGRNb2RlLnByb3RvdHlwZSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRNb2RlID0gcmVxdWlyZShcIi4vdGV4dFwiKS5Nb2RlO1xudmFyIFNhc3NIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3Nhc3NfaGlnaGxpZ2h0X3J1bGVzXCIpLlNhc3NIaWdobGlnaHRSdWxlcztcbnZhciBGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRpbmcvY29mZmVlXCIpLkZvbGRNb2RlO1xuXG52YXIgTW9kZSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuSGlnaGxpZ2h0UnVsZXMgPSBTYXNzSGlnaGxpZ2h0UnVsZXM7XG4gICAgdGhpcy5mb2xkaW5nUnVsZXMgPSBuZXcgRm9sZE1vZGUoKTtcbiAgICB0aGlzLiRiZWhhdmlvdXIgPSB0aGlzLiRkZWZhdWx0QmVoYXZpb3VyO1xufTtcbm9vcC5pbmhlcml0cyhNb2RlLCBUZXh0TW9kZSk7XG5cbihmdW5jdGlvbigpIHsgICBcbiAgICB0aGlzLmxpbmVDb21tZW50U3RhcnQgPSBcIi8vXCI7XG4gICAgdGhpcy4kaWQgPSBcImFjZS9tb2RlL3Nhc3NcIjtcbn0pLmNhbGwoTW9kZS5wcm90b3R5cGUpO1xuXG5leHBvcnRzLk1vZGUgPSBNb2RlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBsYW5nID0gcmVxdWlyZShcIi4uL2xpYi9sYW5nXCIpO1xudmFyIFNjc3NIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3Njc3NfaGlnaGxpZ2h0X3J1bGVzXCIpLlNjc3NIaWdobGlnaHRSdWxlcztcblxudmFyIFNhc3NIaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uKCkge1xuICAgIFNjc3NIaWdobGlnaHRSdWxlcy5jYWxsKHRoaXMpO1xuICAgIHZhciBzdGFydCA9IHRoaXMuJHJ1bGVzLnN0YXJ0O1xuICAgIGlmIChzdGFydFsxXS50b2tlbiA9PSBcImNvbW1lbnRcIikge1xuICAgICAgICBzdGFydC5zcGxpY2UoMSwgMSwge1xuICAgICAgICAgICAgb25NYXRjaDogZnVuY3Rpb24odmFsdWUsIGN1cnJlbnRTdGF0ZSwgc3RhY2spIHtcbiAgICAgICAgICAgICAgICBzdGFjay51bnNoaWZ0KHRoaXMubmV4dCwgLTEsIHZhbHVlLmxlbmd0aCAtIDIsIGN1cnJlbnRTdGF0ZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiY29tbWVudFwiO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlZ2V4OiAvXlxccypcXC9cXCovLFxuICAgICAgICAgICAgbmV4dDogXCJjb21tZW50XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwiZXJyb3IuaW52YWxpZFwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiL1xcXFwqfFt7O31dXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwic3VwcG9ydC50eXBlXCIsXG4gICAgICAgICAgICByZWdleDogL15cXHMqOltcXHdcXC1dK1xccy9cbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLiRydWxlcy5jb21tZW50ID0gW1xuICAgICAgICAgICAge3JlZ2V4OiAvXlxccyovLCBvbk1hdGNoOiBmdW5jdGlvbih2YWx1ZSwgY3VycmVudFN0YXRlLCBzdGFjaykge1xuICAgICAgICAgICAgICAgIGlmIChzdGFja1sxXSA9PT0gLTEpXG4gICAgICAgICAgICAgICAgICAgIHN0YWNrWzFdID0gTWF0aC5tYXgoc3RhY2tbMl0sIHZhbHVlLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5sZW5ndGggPD0gc3RhY2tbMV0pIHtcbiAgICAgICAgICAgICAgICAgICAgLypzaGlmdDN4Ki9zdGFjay5zaGlmdCgpO3N0YWNrLnNoaWZ0KCk7c3RhY2suc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0ID0gc3RhY2suc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwidGV4dFwiO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcImNvbW1lbnRcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBuZXh0OiBcInN0YXJ0XCJ9LFxuICAgICAgICAgICAge2RlZmF1bHRUb2tlbjogXCJjb21tZW50XCJ9XG4gICAgICAgIF07XG4gICAgfVxufTtcblxub29wLmluaGVyaXRzKFNhc3NIaWdobGlnaHRSdWxlcywgU2Nzc0hpZ2hsaWdodFJ1bGVzKTtcblxuZXhwb3J0cy5TYXNzSGlnaGxpZ2h0UnVsZXMgPSBTYXNzSGlnaGxpZ2h0UnVsZXM7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIGxhbmcgPSByZXF1aXJlKFwiLi4vbGliL2xhbmdcIik7XG52YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xudmFyIENzc0hpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vY3NzX2hpZ2hsaWdodF9ydWxlc1wiKTtcblxudmFyIFNjc3NIaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uKCkge1xuICAgIFxuICAgIHZhciBwcm9wZXJ0aWVzID0gbGFuZy5hcnJheVRvTWFwKENzc0hpZ2hsaWdodFJ1bGVzLnN1cHBvcnRUeXBlLnNwbGl0KFwifFwiKSk7XG5cbiAgICB2YXIgZnVuY3Rpb25zID0gbGFuZy5hcnJheVRvTWFwKFxuICAgICAgICAoXCJoc2x8aHNsYXxyZ2J8cmdiYXx1cmx8YXR0cnxjb3VudGVyfGNvdW50ZXJzfGFic3xhZGp1c3RfY29sb3J8YWRqdXN0X2h1ZXxcIiArXG4gICAgICAgICBcImFscGhhfGpvaW58Ymx1ZXxjZWlsfGNoYW5nZV9jb2xvcnxjb21wYXJhYmxlfGNvbXBsZW1lbnR8ZGFya2VufGRlc2F0dXJhdGV8XCIgKyBcbiAgICAgICAgIFwiZmxvb3J8Z3JheXNjYWxlfGdyZWVufGh1ZXxpZnxpbnZlcnR8am9pbnxsZW5ndGh8bGlnaHRlbnxsaWdodG5lc3N8bWl4fFwiICsgXG4gICAgICAgICBcIm50aHxvcGFjaWZ5fG9wYWNpdHl8cGVyY2VudGFnZXxxdW90ZXxyZWR8cm91bmR8c2F0dXJhdGV8c2F0dXJhdGlvbnxcIiArXG4gICAgICAgICBcInNjYWxlX2NvbG9yfHRyYW5zcGFyZW50aXplfHR5cGVfb2Z8dW5pdHx1bml0bGVzc3x1bnF1b3RlXCIpLnNwbGl0KFwifFwiKVxuICAgICk7XG5cbiAgICB2YXIgY29uc3RhbnRzID0gbGFuZy5hcnJheVRvTWFwKENzc0hpZ2hsaWdodFJ1bGVzLnN1cHBvcnRDb25zdGFudC5zcGxpdChcInxcIikpO1xuXG4gICAgdmFyIGNvbG9ycyA9IGxhbmcuYXJyYXlUb01hcChDc3NIaWdobGlnaHRSdWxlcy5zdXBwb3J0Q29uc3RhbnRDb2xvci5zcGxpdChcInxcIikpO1xuICAgIFxuICAgIHZhciBrZXl3b3JkcyA9IGxhbmcuYXJyYXlUb01hcChcbiAgICAgICAgKFwiQG1peGlufEBleHRlbmR8QGluY2x1ZGV8QGltcG9ydHxAbWVkaWF8QGRlYnVnfEB3YXJufEBpZnxAZm9yfEBlYWNofEB3aGlsZXxAZWxzZXxAZm9udC1mYWNlfEAtd2Via2l0LWtleWZyYW1lc3xpZnxhbmR8IWRlZmF1bHR8bW9kdWxlfGRlZnxlbmR8ZGVjbGFyZVwiKS5zcGxpdChcInxcIilcbiAgICApO1xuICAgIFxuICAgIHZhciB0YWdzID0gbGFuZy5hcnJheVRvTWFwKFxuICAgICAgICAoXCJhfGFiYnJ8YWNyb255bXxhZGRyZXNzfGFwcGxldHxhcmVhfGFydGljbGV8YXNpZGV8YXVkaW98YnxiYXNlfGJhc2Vmb250fGJkb3xcIiArIFxuICAgICAgICAgXCJiaWd8YmxvY2txdW90ZXxib2R5fGJyfGJ1dHRvbnxjYW52YXN8Y2FwdGlvbnxjZW50ZXJ8Y2l0ZXxjb2RlfGNvbHxjb2xncm91cHxcIiArIFxuICAgICAgICAgXCJjb21tYW5kfGRhdGFsaXN0fGRkfGRlbHxkZXRhaWxzfGRmbnxkaXJ8ZGl2fGRsfGR0fGVtfGVtYmVkfGZpZWxkc2V0fFwiICsgXG4gICAgICAgICBcImZpZ2NhcHRpb258ZmlndXJlfGZvbnR8Zm9vdGVyfGZvcm18ZnJhbWV8ZnJhbWVzZXR8aDF8aDJ8aDN8aDR8aDV8aDZ8aGVhZHxcIiArIFxuICAgICAgICAgXCJoZWFkZXJ8aGdyb3VwfGhyfGh0bWx8aXxpZnJhbWV8aW1nfGlucHV0fGluc3xrZXlnZW58a2JkfGxhYmVsfGxlZ2VuZHxsaXxcIiArIFxuICAgICAgICAgXCJsaW5rfG1hcHxtYXJrfG1lbnV8bWV0YXxtZXRlcnxuYXZ8bm9mcmFtZXN8bm9zY3JpcHR8b2JqZWN0fG9sfG9wdGdyb3VwfFwiICsgXG4gICAgICAgICBcIm9wdGlvbnxvdXRwdXR8cHxwYXJhbXxwcmV8cHJvZ3Jlc3N8cXxycHxydHxydWJ5fHN8c2FtcHxzY3JpcHR8c2VjdGlvbnxzZWxlY3R8XCIgKyBcbiAgICAgICAgIFwic21hbGx8c291cmNlfHNwYW58c3RyaWtlfHN0cm9uZ3xzdHlsZXxzdWJ8c3VtbWFyeXxzdXB8dGFibGV8dGJvZHl8dGR8XCIgKyBcbiAgICAgICAgIFwidGV4dGFyZWF8dGZvb3R8dGh8dGhlYWR8dGltZXx0aXRsZXx0cnx0dHx1fHVsfHZhcnx2aWRlb3x3YnJ8eG1wXCIpLnNwbGl0KFwifFwiKVxuICAgICk7XG5cbiAgICAvLyByZWdleHAgbXVzdCBub3QgaGF2ZSBjYXB0dXJpbmcgcGFyZW50aGVzZXMuIFVzZSAoPzopIGluc3RlYWQuXG4gICAgLy8gcmVnZXhwcyBhcmUgb3JkZXJlZCAtPiB0aGUgZmlyc3QgbWF0Y2ggaXMgdXNlZFxuXG4gICAgdmFyIG51bVJlID0gXCJcXFxcLT8oPzooPzpbMC05XSspfCg/OlswLTldKlxcXFwuWzAtOV0rKSlcIjtcblxuICAgIC8vIHJlZ2V4cCBtdXN0IG5vdCBoYXZlIGNhcHR1cmluZyBwYXJlbnRoZXNlcy4gVXNlICg/OikgaW5zdGVhZC5cbiAgICAvLyByZWdleHBzIGFyZSBvcmRlcmVkIC0+IHRoZSBmaXJzdCBtYXRjaCBpcyB1c2VkXG5cbiAgICB0aGlzLiRydWxlcyA9IHtcbiAgICAgICAgXCJzdGFydFwiIDogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwvXFxcXC8uKiRcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudFwiLCAvLyBtdWx0aSBsaW5lIGNvbW1lbnRcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXC9cXFxcKlwiLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcImNvbW1lbnRcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIiwgLy8gc2luZ2xlIGxpbmVcbiAgICAgICAgICAgICAgICByZWdleCA6ICdbXCJdKD86KD86XFxcXFxcXFwuKXwoPzpbXlwiXFxcXFxcXFxdKSkqP1tcIl0nXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLCAvLyBtdWx0aSBsaW5lIHN0cmluZyBzdGFydFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogJ1tcIl0uKlxcXFxcXFxcJCcsXG4gICAgICAgICAgICAgICAgbmV4dCA6IFwicXFzdHJpbmdcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIiwgLy8gc2luZ2xlIGxpbmVcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiWyddKD86KD86XFxcXFxcXFwuKXwoPzpbXidcXFxcXFxcXF0pKSo/WyddXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsIC8vIG11bHRpIGxpbmUgc3RyaW5nIHN0YXJ0XG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlsnXS4qXFxcXFxcXFwkXCIsXG4gICAgICAgICAgICAgICAgbmV4dCA6IFwicXN0cmluZ1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IG51bVJlICsgXCIoPzpjaHxjbXxkZWd8ZW18ZXh8ZnJ8Z2R8Z3JhZHxIenxpbnxrSHp8bW18bXN8cGN8cHR8cHh8cmFkfHJlbXxzfHR1cm58dmh8dm1heHx2bWlufHZtfHZ3fCUpXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLCAvLyBoZXg2IGNvbG9yXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIiNbYS1mMC05XXs2fVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIiwgLy8gaGV4MyBjb2xvclxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIjW2EtZjAtOV17M31cIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5udW1lcmljXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBudW1SZVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogW1wic3VwcG9ydC5mdW5jdGlvblwiLCBcInN0cmluZ1wiLCBcInN1cHBvcnQuZnVuY3Rpb25cIl0sXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIih1cmxcXFxcKCkoLiopKFxcXFwpKVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eSh2YWx1ZS50b0xvd2VyQ2FzZSgpKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcInN1cHBvcnQudHlwZVwiO1xuICAgICAgICAgICAgICAgICAgICBpZiAoa2V5d29yZHMuaGFzT3duUHJvcGVydHkodmFsdWUpKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwia2V5d29yZFwiO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChjb25zdGFudHMuaGFzT3duUHJvcGVydHkodmFsdWUpKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiY29uc3RhbnQubGFuZ3VhZ2VcIjtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoZnVuY3Rpb25zLmhhc093blByb3BlcnR5KHZhbHVlKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcInN1cHBvcnQuZnVuY3Rpb25cIjtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoY29sb3JzLmhhc093blByb3BlcnR5KHZhbHVlLnRvTG93ZXJDYXNlKCkpKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwic3VwcG9ydC5jb25zdGFudC5jb2xvclwiO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0YWdzLmhhc093blByb3BlcnR5KHZhbHVlLnRvTG93ZXJDYXNlKCkpKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwidmFyaWFibGUubGFuZ3VhZ2VcIjtcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwidGV4dFwiO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwtP1tAYS16X11bQGEtejAtOV9cXFxcLV0qXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwidmFyaWFibGVcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiW2Etel9cXFxcLSRdW2EtejAtOV9cXFxcLSRdKlxcXFxiXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJ2YXJpYWJsZS5sYW5ndWFnZVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIiNbYS16MC05LV9dK1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwidmFyaWFibGUubGFuZ3VhZ2VcIixcbiAgICAgICAgICAgICAgICByZWdleDogXCJcXFxcLlthLXowLTktX10rXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJ2YXJpYWJsZS5sYW5ndWFnZVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIjpbYS16MC05LV9dK1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnRcIixcbiAgICAgICAgICAgICAgICByZWdleDogXCJbYS16MC05LV9dK1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImtleXdvcmQub3BlcmF0b3JcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiPHw+fDw9fD49fD09fCE9fC18JXwjfFxcXFwrfFxcXFwkfFxcXFwrfFxcXFwqXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwicGFyZW4ubHBhcmVuXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIltbKHtdXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwicGFyZW4ucnBhcmVuXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIltcXFxcXSl9XVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXHMrXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBjYXNlSW5zZW5zaXRpdmU6IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgXCJjb21tZW50XCIgOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIiwgLy8gY2xvc2luZyBjb21tZW50XG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwqXFxcXC9cIixcbiAgICAgICAgICAgICAgICBuZXh0IDogXCJzdGFydFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuIDogXCJjb21tZW50XCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgXCJxcXN0cmluZ1wiIDogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICByZWdleCA6ICcoPzooPzpcXFxcXFxcXC4pfCg/OlteXCJcXFxcXFxcXF0pKSo/XCInLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcInN0YXJ0XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAnLisnXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIFwicXN0cmluZ1wiIDogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiKD86KD86XFxcXFxcXFwuKXwoPzpbXidcXFxcXFxcXF0pKSo/J1wiLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcInN0YXJ0XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAnLisnXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9O1xufTtcblxub29wLmluaGVyaXRzKFNjc3NIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuZXhwb3J0cy5TY3NzSGlnaGxpZ2h0UnVsZXMgPSBTY3NzSGlnaGxpZ2h0UnVsZXM7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=