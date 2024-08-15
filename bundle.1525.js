"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[1525],{

/***/ 74275:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var lang = __webpack_require__(39955);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);


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
            token: "paren.lparen",
            regex: "\\{"
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

/***/ 69261:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var BaseFoldMode = (__webpack_require__(51358).FoldMode);
var Range = (__webpack_require__(91902)/* .Range */ .Q);

var FoldMode = exports.l = function() {};
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

/***/ 31525:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var SassHighlightRules = (__webpack_require__(96930).SassHighlightRules);
var FoldMode = (__webpack_require__(69261)/* .FoldMode */ .l);

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

/***/ 96930:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var lang = __webpack_require__(39955);
var ScssHighlightRules = (__webpack_require__(23124).ScssHighlightRules);

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

exports.SassHighlightRules = SassHighlightRules;


/***/ }),

/***/ 23124:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var lang = __webpack_require__(39955);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);
var CssHighlightRules = __webpack_require__(74275);

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

exports.ScssHighlightRules = ScssHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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cGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvY3NzX2hpZ2hsaWdodF9ydWxlcy5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2ZvbGRpbmcvY29mZmVlLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvc2Fzcy5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL3Nhc3NfaGlnaGxpZ2h0X3J1bGVzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvc2Nzc19oaWdobGlnaHRfcnVsZXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBsYW5nID0gcmVxdWlyZShcIi4uL2xpYi9sYW5nXCIpO1xudmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcblxuXG4vKiBFeHBvcnRzIGFyZSBmb3IgU3R5bHVzIGFuZCBMZXNzIGhpZ2hsaWdodGVycyAqL1xudmFyIHN1cHBvcnRUeXBlID0gZXhwb3J0cy5zdXBwb3J0VHlwZSA9IFwiYWxpZ24tY29udGVudHxhbGlnbi1pdGVtc3xhbGlnbi1zZWxmfGFsbHxhbmltYXRpb258YW5pbWF0aW9uLWRlbGF5fGFuaW1hdGlvbi1kaXJlY3Rpb258YW5pbWF0aW9uLWR1cmF0aW9ufGFuaW1hdGlvbi1maWxsLW1vZGV8YW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudHxhbmltYXRpb24tbmFtZXxhbmltYXRpb24tcGxheS1zdGF0ZXxhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9ufGJhY2tmYWNlLXZpc2liaWxpdHl8YmFja2dyb3VuZHxiYWNrZ3JvdW5kLWF0dGFjaG1lbnR8YmFja2dyb3VuZC1ibGVuZC1tb2RlfGJhY2tncm91bmQtY2xpcHxiYWNrZ3JvdW5kLWNvbG9yfGJhY2tncm91bmQtaW1hZ2V8YmFja2dyb3VuZC1vcmlnaW58YmFja2dyb3VuZC1wb3NpdGlvbnxiYWNrZ3JvdW5kLXJlcGVhdHxiYWNrZ3JvdW5kLXNpemV8Ym9yZGVyfGJvcmRlci1ib3R0b218Ym9yZGVyLWJvdHRvbS1jb2xvcnxib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzfGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzfGJvcmRlci1ib3R0b20tc3R5bGV8Ym9yZGVyLWJvdHRvbS13aWR0aHxib3JkZXItY29sbGFwc2V8Ym9yZGVyLWNvbG9yfGJvcmRlci1pbWFnZXxib3JkZXItaW1hZ2Utb3V0c2V0fGJvcmRlci1pbWFnZS1yZXBlYXR8Ym9yZGVyLWltYWdlLXNsaWNlfGJvcmRlci1pbWFnZS1zb3VyY2V8Ym9yZGVyLWltYWdlLXdpZHRofGJvcmRlci1sZWZ0fGJvcmRlci1sZWZ0LWNvbG9yfGJvcmRlci1sZWZ0LXN0eWxlfGJvcmRlci1sZWZ0LXdpZHRofGJvcmRlci1yYWRpdXN8Ym9yZGVyLXJpZ2h0fGJvcmRlci1yaWdodC1jb2xvcnxib3JkZXItcmlnaHQtc3R5bGV8Ym9yZGVyLXJpZ2h0LXdpZHRofGJvcmRlci1zcGFjaW5nfGJvcmRlci1zdHlsZXxib3JkZXItdG9wfGJvcmRlci10b3AtY29sb3J8Ym9yZGVyLXRvcC1sZWZ0LXJhZGl1c3xib3JkZXItdG9wLXJpZ2h0LXJhZGl1c3xib3JkZXItdG9wLXN0eWxlfGJvcmRlci10b3Atd2lkdGh8Ym9yZGVyLXdpZHRofGJvdHRvbXxib3gtc2hhZG93fGJveC1zaXppbmd8Y2FwdGlvbi1zaWRlfGNsZWFyfGNsaXB8Y29sb3J8Y29sdW1uLWNvdW50fGNvbHVtbi1maWxsfGNvbHVtbi1nYXB8Y29sdW1uLXJ1bGV8Y29sdW1uLXJ1bGUtY29sb3J8Y29sdW1uLXJ1bGUtc3R5bGV8Y29sdW1uLXJ1bGUtd2lkdGh8Y29sdW1uLXNwYW58Y29sdW1uLXdpZHRofGNvbHVtbnN8Y29udGVudHxjb3VudGVyLWluY3JlbWVudHxjb3VudGVyLXJlc2V0fGN1cnNvcnxkaXJlY3Rpb258ZGlzcGxheXxlbXB0eS1jZWxsc3xmaWx0ZXJ8ZmxleHxmbGV4LWJhc2lzfGZsZXgtZGlyZWN0aW9ufGZsZXgtZmxvd3xmbGV4LWdyb3d8ZmxleC1zaHJpbmt8ZmxleC13cmFwfGZsb2F0fGZvbnR8Zm9udC1mYW1pbHl8Zm9udC1zaXplfGZvbnQtc2l6ZS1hZGp1c3R8Zm9udC1zdHJldGNofGZvbnQtc3R5bGV8Zm9udC12YXJpYW50fGZvbnQtd2VpZ2h0fGhhbmdpbmctcHVuY3R1YXRpb258aGVpZ2h0fGp1c3RpZnktY29udGVudHxsZWZ0fGxldHRlci1zcGFjaW5nfGxpbmUtaGVpZ2h0fGxpc3Qtc3R5bGV8bGlzdC1zdHlsZS1pbWFnZXxsaXN0LXN0eWxlLXBvc2l0aW9ufGxpc3Qtc3R5bGUtdHlwZXxtYXJnaW58bWFyZ2luLWJvdHRvbXxtYXJnaW4tbGVmdHxtYXJnaW4tcmlnaHR8bWFyZ2luLXRvcHxtYXgtaGVpZ2h0fG1heC13aWR0aHxtYXgtem9vbXxtaW4taGVpZ2h0fG1pbi13aWR0aHxtaW4tem9vbXxuYXYtZG93bnxuYXYtaW5kZXh8bmF2LWxlZnR8bmF2LXJpZ2h0fG5hdi11cHxvcGFjaXR5fG9yZGVyfG91dGxpbmV8b3V0bGluZS1jb2xvcnxvdXRsaW5lLW9mZnNldHxvdXRsaW5lLXN0eWxlfG91dGxpbmUtd2lkdGh8b3ZlcmZsb3d8b3ZlcmZsb3cteHxvdmVyZmxvdy15fHBhZGRpbmd8cGFkZGluZy1ib3R0b218cGFkZGluZy1sZWZ0fHBhZGRpbmctcmlnaHR8cGFkZGluZy10b3B8cGFnZS1icmVhay1hZnRlcnxwYWdlLWJyZWFrLWJlZm9yZXxwYWdlLWJyZWFrLWluc2lkZXxwZXJzcGVjdGl2ZXxwZXJzcGVjdGl2ZS1vcmlnaW58cG9zaXRpb258cXVvdGVzfHJlc2l6ZXxyaWdodHx0YWItc2l6ZXx0YWJsZS1sYXlvdXR8dGV4dC1hbGlnbnx0ZXh0LWFsaWduLWxhc3R8dGV4dC1kZWNvcmF0aW9ufHRleHQtZGVjb3JhdGlvbi1jb2xvcnx0ZXh0LWRlY29yYXRpb24tbGluZXx0ZXh0LWRlY29yYXRpb24tc3R5bGV8dGV4dC1pbmRlbnR8dGV4dC1qdXN0aWZ5fHRleHQtb3ZlcmZsb3d8dGV4dC1zaGFkb3d8dGV4dC10cmFuc2Zvcm18dG9wfHRyYW5zZm9ybXx0cmFuc2Zvcm0tb3JpZ2lufHRyYW5zZm9ybS1zdHlsZXx0cmFuc2l0aW9ufHRyYW5zaXRpb24tZGVsYXl8dHJhbnNpdGlvbi1kdXJhdGlvbnx0cmFuc2l0aW9uLXByb3BlcnR5fHRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9ufHVuaWNvZGUtYmlkaXx1c2VyLXNlbGVjdHx1c2VyLXpvb218dmVydGljYWwtYWxpZ258dmlzaWJpbGl0eXx3aGl0ZS1zcGFjZXx3aWR0aHx3b3JkLWJyZWFrfHdvcmQtc3BhY2luZ3x3b3JkLXdyYXB8ei1pbmRleFwiO1xudmFyIHN1cHBvcnRGdW5jdGlvbiA9IGV4cG9ydHMuc3VwcG9ydEZ1bmN0aW9uID0gXCJyZ2J8cmdiYXx1cmx8YXR0cnxjb3VudGVyfGNvdW50ZXJzXCI7XG52YXIgc3VwcG9ydENvbnN0YW50ID0gZXhwb3J0cy5zdXBwb3J0Q29uc3RhbnQgPSBcImFic29sdXRlfGFmdGVyLWVkZ2V8YWZ0ZXJ8YWxsLXNjcm9sbHxhbGx8YWxwaGFiZXRpY3xhbHdheXN8YW50aWFsaWFzZWR8YXJtZW5pYW58YXV0b3xhdm9pZC1jb2x1bW58YXZvaWQtcGFnZXxhdm9pZHxiYWxhbmNlfGJhc2VsaW5lfGJlZm9yZS1lZGdlfGJlZm9yZXxiZWxvd3xiaWRpLW92ZXJyaWRlfGJsb2NrLWxpbmUtaGVpZ2h0fGJsb2NrfGJvbGR8Ym9sZGVyfGJvcmRlci1ib3h8Ym90aHxib3R0b218Ym94fGJyZWFrLWFsbHxicmVhay13b3JkfGNhcGl0YWxpemV8Y2Fwcy1oZWlnaHR8Y2FwdGlvbnxjZW50ZXJ8Y2VudHJhbHxjaGFyfGNpcmNsZXxjamstaWRlb2dyYXBoaWN8Y2xvbmV8Y2xvc2UtcXVvdGV8Y29sLXJlc2l6ZXxjb2xsYXBzZXxjb2x1bW58Y29uc2lkZXItc2hpZnRzfGNvbnRhaW58Y29udGVudC1ib3h8Y292ZXJ8Y3Jvc3NoYWlyfGN1YmljLWJlemllcnxkYXNoZWR8ZGVjaW1hbC1sZWFkaW5nLXplcm98ZGVjaW1hbHxkZWZhdWx0fGRpc2FibGVkfGRpc2N8ZGlzcmVnYXJkLXNoaWZ0c3xkaXN0cmlidXRlLWFsbC1saW5lc3xkaXN0cmlidXRlLWxldHRlcnxkaXN0cmlidXRlLXNwYWNlfGRpc3RyaWJ1dGV8ZG90dGVkfGRvdWJsZXxlLXJlc2l6ZXxlYXNlLWlufGVhc2UtaW4tb3V0fGVhc2Utb3V0fGVhc2V8ZWxsaXBzaXN8ZW5kfGV4Y2x1ZGUtcnVieXxmbGV4LWVuZHxmbGV4LXN0YXJ0fGZpbGx8Zml4ZWR8Z2VvcmdpYW58Z2x5cGhzfGdyaWQtaGVpZ2h0fGdyb292ZXxoYW5kfGhhbmdpbmd8aGVicmV3fGhlbHB8aGlkZGVufGhpcmFnYW5hLWlyb2hhfGhpcmFnYW5hfGhvcml6b250YWx8aWNvbnxpZGVvZ3JhcGgtYWxwaGF8aWRlb2dyYXBoLW51bWVyaWN8aWRlb2dyYXBoLXBhcmVudGhlc2lzfGlkZW9ncmFwaC1zcGFjZXxpZGVvZ3JhcGhpY3xpbmFjdGl2ZXxpbmNsdWRlLXJ1Ynl8aW5oZXJpdHxpbml0aWFsfGlubGluZS1ibG9ja3xpbmxpbmUtYm94fGlubGluZS1saW5lLWhlaWdodHxpbmxpbmUtdGFibGV8aW5saW5lfGluc2V0fGluc2lkZXxpbnRlci1pZGVvZ3JhcGh8aW50ZXItd29yZHxpbnZlcnR8aXRhbGljfGp1c3RpZnl8a2F0YWthbmEtaXJvaGF8a2F0YWthbmF8a2VlcC1hbGx8bGFzdHxsZWZ0fGxpZ2h0ZXJ8bGluZS1lZGdlfGxpbmUtdGhyb3VnaHxsaW5lfGxpbmVhcnxsaXN0LWl0ZW18bG9jYWx8bG9vc2V8bG93ZXItYWxwaGF8bG93ZXItZ3JlZWt8bG93ZXItbGF0aW58bG93ZXItcm9tYW58bG93ZXJjYXNlfGxyLXRifGx0cnxtYXRoZW1hdGljYWx8bWF4LWhlaWdodHxtYXgtc2l6ZXxtZWRpdW18bWVudXxtZXNzYWdlLWJveHxtaWRkbGV8bW92ZXxuLXJlc2l6ZXxuZS1yZXNpemV8bmV3c3BhcGVyfG5vLWNoYW5nZXxuby1jbG9zZS1xdW90ZXxuby1kcm9wfG5vLW9wZW4tcXVvdGV8bm8tcmVwZWF0fG5vbmV8bm9ybWFsfG5vdC1hbGxvd2VkfG5vd3JhcHxudy1yZXNpemV8b2JsaXF1ZXxvcGVuLXF1b3RlfG91dHNldHxvdXRzaWRlfG92ZXJsaW5lfHBhZGRpbmctYm94fHBhZ2V8cG9pbnRlcnxwcmUtbGluZXxwcmUtd3JhcHxwcmV8cHJlc2VydmUtM2R8cHJvZ3Jlc3N8cmVsYXRpdmV8cmVwZWF0LXh8cmVwZWF0LXl8cmVwZWF0fHJlcGxhY2VkfHJlc2V0LXNpemV8cmlkZ2V8cmlnaHR8cm91bmR8cm93LXJlc2l6ZXxydGx8cy1yZXNpemV8c2Nyb2xsfHNlLXJlc2l6ZXxzZXBhcmF0ZXxzbGljZXxzbWFsbC1jYXBzfHNtYWxsLWNhcHRpb258c29saWR8c3BhY2V8c3F1YXJlfHN0YXJ0fHN0YXRpY3xzdGF0dXMtYmFyfHN0ZXAtZW5kfHN0ZXAtc3RhcnR8c3RlcHN8c3RyZXRjaHxzdHJpY3R8c3VifHN1cGVyfHN3LXJlc2l6ZXx0YWJsZS1jYXB0aW9ufHRhYmxlLWNlbGx8dGFibGUtY29sdW1uLWdyb3VwfHRhYmxlLWNvbHVtbnx0YWJsZS1mb290ZXItZ3JvdXB8dGFibGUtaGVhZGVyLWdyb3VwfHRhYmxlLXJvdy1ncm91cHx0YWJsZS1yb3d8dGFibGV8dGItcmx8dGV4dC1hZnRlci1lZGdlfHRleHQtYmVmb3JlLWVkZ2V8dGV4dC1ib3R0b218dGV4dC1zaXplfHRleHQtdG9wfHRleHR8dGhpY2t8dGhpbnx0cmFuc3BhcmVudHx1bmRlcmxpbmV8dXBwZXItYWxwaGF8dXBwZXItbGF0aW58dXBwZXItcm9tYW58dXBwZXJjYXNlfHVzZS1zY3JpcHR8dmVydGljYWwtaWRlb2dyYXBoaWN8dmVydGljYWwtdGV4dHx2aXNpYmxlfHctcmVzaXplfHdhaXR8d2hpdGVzcGFjZXx6LWluZGV4fHplcm98em9vbVwiO1xudmFyIHN1cHBvcnRDb25zdGFudENvbG9yID0gZXhwb3J0cy5zdXBwb3J0Q29uc3RhbnRDb2xvciA9IFwiYWxpY2VibHVlfGFudGlxdWV3aGl0ZXxhcXVhfGFxdWFtYXJpbmV8YXp1cmV8YmVpZ2V8YmlzcXVlfGJsYWNrfGJsYW5jaGVkYWxtb25kfGJsdWV8Ymx1ZXZpb2xldHxicm93bnxidXJseXdvb2R8Y2FkZXRibHVlfGNoYXJ0cmV1c2V8Y2hvY29sYXRlfGNvcmFsfGNvcm5mbG93ZXJibHVlfGNvcm5zaWxrfGNyaW1zb258Y3lhbnxkYXJrYmx1ZXxkYXJrY3lhbnxkYXJrZ29sZGVucm9kfGRhcmtncmF5fGRhcmtncmVlbnxkYXJrZ3JleXxkYXJra2hha2l8ZGFya21hZ2VudGF8ZGFya29saXZlZ3JlZW58ZGFya29yYW5nZXxkYXJrb3JjaGlkfGRhcmtyZWR8ZGFya3NhbG1vbnxkYXJrc2VhZ3JlZW58ZGFya3NsYXRlYmx1ZXxkYXJrc2xhdGVncmF5fGRhcmtzbGF0ZWdyZXl8ZGFya3R1cnF1b2lzZXxkYXJrdmlvbGV0fGRlZXBwaW5rfGRlZXBza3libHVlfGRpbWdyYXl8ZGltZ3JleXxkb2RnZXJibHVlfGZpcmVicmlja3xmbG9yYWx3aGl0ZXxmb3Jlc3RncmVlbnxmdWNoc2lhfGdhaW5zYm9yb3xnaG9zdHdoaXRlfGdvbGR8Z29sZGVucm9kfGdyYXl8Z3JlZW58Z3JlZW55ZWxsb3d8Z3JleXxob25leWRld3xob3RwaW5rfGluZGlhbnJlZHxpbmRpZ298aXZvcnl8a2hha2l8bGF2ZW5kZXJ8bGF2ZW5kZXJibHVzaHxsYXduZ3JlZW58bGVtb25jaGlmZm9ufGxpZ2h0Ymx1ZXxsaWdodGNvcmFsfGxpZ2h0Y3lhbnxsaWdodGdvbGRlbnJvZHllbGxvd3xsaWdodGdyYXl8bGlnaHRncmVlbnxsaWdodGdyZXl8bGlnaHRwaW5rfGxpZ2h0c2FsbW9ufGxpZ2h0c2VhZ3JlZW58bGlnaHRza3libHVlfGxpZ2h0c2xhdGVncmF5fGxpZ2h0c2xhdGVncmV5fGxpZ2h0c3RlZWxibHVlfGxpZ2h0eWVsbG93fGxpbWV8bGltZWdyZWVufGxpbmVufG1hZ2VudGF8bWFyb29ufG1lZGl1bWFxdWFtYXJpbmV8bWVkaXVtYmx1ZXxtZWRpdW1vcmNoaWR8bWVkaXVtcHVycGxlfG1lZGl1bXNlYWdyZWVufG1lZGl1bXNsYXRlYmx1ZXxtZWRpdW1zcHJpbmdncmVlbnxtZWRpdW10dXJxdW9pc2V8bWVkaXVtdmlvbGV0cmVkfG1pZG5pZ2h0Ymx1ZXxtaW50Y3JlYW18bWlzdHlyb3NlfG1vY2Nhc2lufG5hdmFqb3doaXRlfG5hdnl8b2xkbGFjZXxvbGl2ZXxvbGl2ZWRyYWJ8b3JhbmdlfG9yYW5nZXJlZHxvcmNoaWR8cGFsZWdvbGRlbnJvZHxwYWxlZ3JlZW58cGFsZXR1cnF1b2lzZXxwYWxldmlvbGV0cmVkfHBhcGF5YXdoaXB8cGVhY2hwdWZmfHBlcnV8cGlua3xwbHVtfHBvd2RlcmJsdWV8cHVycGxlfHJlYmVjY2FwdXJwbGV8cmVkfHJvc3licm93bnxyb3lhbGJsdWV8c2FkZGxlYnJvd258c2FsbW9ufHNhbmR5YnJvd258c2VhZ3JlZW58c2Vhc2hlbGx8c2llbm5hfHNpbHZlcnxza3libHVlfHNsYXRlYmx1ZXxzbGF0ZWdyYXl8c2xhdGVncmV5fHNub3d8c3ByaW5nZ3JlZW58c3RlZWxibHVlfHRhbnx0ZWFsfHRoaXN0bGV8dG9tYXRvfHR1cnF1b2lzZXx2aW9sZXR8d2hlYXR8d2hpdGV8d2hpdGVzbW9rZXx5ZWxsb3d8eWVsbG93Z3JlZW5cIjtcbnZhciBzdXBwb3J0Q29uc3RhbnRGb250cyA9IGV4cG9ydHMuc3VwcG9ydENvbnN0YW50Rm9udHMgPSBcImFyaWFsfGNlbnR1cnl8Y29taWN8Y291cmllcnxjdXJzaXZlfGZhbnRhc3l8Z2FyYW1vbmR8Z2VvcmdpYXxoZWx2ZXRpY2F8aW1wYWN0fGx1Y2lkYXxzeW1ib2x8c3lzdGVtfHRhaG9tYXx0aW1lc3x0cmVidWNoZXR8dXRvcGlhfHZlcmRhbmF8d2ViZGluZ3N8c2Fucy1zZXJpZnxzZXJpZnxtb25vc3BhY2VcIjtcblxudmFyIG51bVJlID0gZXhwb3J0cy5udW1SZSA9IFwiXFxcXC0/KD86KD86WzAtOV0rKD86XFxcXC5bMC05XSspPyl8KD86XFxcXC5bMC05XSspKVwiO1xudmFyIHBzZXVkb0VsZW1lbnRzID0gZXhwb3J0cy5wc2V1ZG9FbGVtZW50cyA9IFwiKFxcXFw6KylcXFxcYihhZnRlcnxiZWZvcmV8Zmlyc3QtbGV0dGVyfGZpcnN0LWxpbmV8bW96LXNlbGVjdGlvbnxzZWxlY3Rpb24pXFxcXGJcIjtcbnZhciBwc2V1ZG9DbGFzc2VzICA9IGV4cG9ydHMucHNldWRvQ2xhc3NlcyA9ICBcIig6KVxcXFxiKGFjdGl2ZXxjaGVja2VkfGRpc2FibGVkfGVtcHR5fGVuYWJsZWR8Zmlyc3QtY2hpbGR8Zmlyc3Qtb2YtdHlwZXxmb2N1c3xob3ZlcnxpbmRldGVybWluYXRlfGludmFsaWR8bGFzdC1jaGlsZHxsYXN0LW9mLXR5cGV8bGlua3xub3R8bnRoLWNoaWxkfG50aC1sYXN0LWNoaWxkfG50aC1sYXN0LW9mLXR5cGV8bnRoLW9mLXR5cGV8b25seS1jaGlsZHxvbmx5LW9mLXR5cGV8cmVxdWlyZWR8cm9vdHx0YXJnZXR8dmFsaWR8dmlzaXRlZClcXFxcYlwiO1xuXG52YXIgQ3NzSGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbigpIHtcblxuICAgIHZhciBrZXl3b3JkTWFwcGVyID0gdGhpcy5jcmVhdGVLZXl3b3JkTWFwcGVyKHtcbiAgICAgICAgXCJzdXBwb3J0LmZ1bmN0aW9uXCI6IHN1cHBvcnRGdW5jdGlvbixcbiAgICAgICAgXCJzdXBwb3J0LmNvbnN0YW50XCI6IHN1cHBvcnRDb25zdGFudCxcbiAgICAgICAgXCJzdXBwb3J0LnR5cGVcIjogc3VwcG9ydFR5cGUsXG4gICAgICAgIFwic3VwcG9ydC5jb25zdGFudC5jb2xvclwiOiBzdXBwb3J0Q29uc3RhbnRDb2xvcixcbiAgICAgICAgXCJzdXBwb3J0LmNvbnN0YW50LmZvbnRzXCI6IHN1cHBvcnRDb25zdGFudEZvbnRzXG4gICAgfSwgXCJ0ZXh0XCIsIHRydWUpO1xuXG4gICAgLy8gcmVnZXhwIG11c3Qgbm90IGhhdmUgY2FwdHVyaW5nIHBhcmVudGhlc2VzLiBVc2UgKD86KSBpbnN0ZWFkLlxuICAgIC8vIHJlZ2V4cHMgYXJlIG9yZGVyZWQgLT4gdGhlIGZpcnN0IG1hdGNoIGlzIHVzZWRcblxuICAgIHRoaXMuJHJ1bGVzID0ge1xuICAgICAgICBcInN0YXJ0XCIgOiBbe1xuICAgICAgICAgICAgaW5jbHVkZSA6IFtcInN0cmluZ3NcIiwgXCJ1cmxcIiwgXCJjb21tZW50c1wiXVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJwYXJlbi5scGFyZW5cIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFx7XCIsXG4gICAgICAgICAgICBuZXh0OiAgXCJydWxlc2V0XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwicGFyZW4ucnBhcmVuXCIsXG4gICAgICAgICAgICByZWdleDogXCJcXFxcfVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgcmVnZXg6IFwiQCg/IXZpZXdwb3J0KVwiLFxuICAgICAgICAgICAgbmV4dDogIFwibWVkaWFcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJrZXl3b3JkXCIsXG4gICAgICAgICAgICByZWdleDogXCIjW2EtejAtOS1fXStcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJrZXl3b3JkXCIsXG4gICAgICAgICAgICByZWdleDogXCIlXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwidmFyaWFibGVcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFwuW2EtejAtOS1fXStcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIjpbYS16MC05LV9dK1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5udW1lcmljXCIsXG4gICAgICAgICAgICByZWdleCA6IG51bVJlXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50XCIsXG4gICAgICAgICAgICByZWdleDogXCJbYS16MC05LV9dK1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNhc2VJbnNlbnNpdGl2ZTogdHJ1ZVxuICAgICAgICB9XSxcblxuICAgICAgICBcIm1lZGlhXCI6IFt7XG4gICAgICAgICAgICBpbmNsdWRlIDogW1wic3RyaW5nc1wiLCBcInVybFwiLCBcImNvbW1lbnRzXCJdXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInBhcmVuLmxwYXJlblwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiXFxcXHtcIixcbiAgICAgICAgICAgIG5leHQ6ICBcInN0YXJ0XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwicGFyZW4ucnBhcmVuXCIsXG4gICAgICAgICAgICByZWdleDogXCJcXFxcfVwiLFxuICAgICAgICAgICAgbmV4dDogIFwic3RhcnRcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIjtcIixcbiAgICAgICAgICAgIG5leHQ6ICBcInN0YXJ0XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwia2V5d29yZFwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiKD86bWVkaWF8c3VwcG9ydHN8ZG9jdW1lbnR8Y2hhcnNldHxpbXBvcnR8bmFtZXNwYWNlfG1lZGlhfHN1cHBvcnRzfGRvY3VtZW50XCJcbiAgICAgICAgICAgICAgICArIFwifHBhZ2V8Zm9udHxrZXlmcmFtZXN8dmlld3BvcnR8Y291bnRlci1zdHlsZXxmb250LWZlYXR1cmUtdmFsdWVzXCJcbiAgICAgICAgICAgICAgICArIFwifHN3YXNofG9ybmFtZW50c3xhbm5vdGF0aW9ufHN0eWxpc3RpY3xzdHlsZXNldHxjaGFyYWN0ZXItdmFyaWFudClcIlxuICAgICAgICB9XSxcblxuICAgICAgICBcImNvbW1lbnRzXCIgOiBbe1xuICAgICAgICAgICAgdG9rZW46IFwiY29tbWVudFwiLCAvLyBtdWx0aSBsaW5lIGNvbW1lbnRcbiAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFwvXFxcXCpcIixcbiAgICAgICAgICAgIHB1c2g6IFt7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXCpcXFxcL1wiLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcInBvcFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuIDogXCJjb21tZW50XCJcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH1dLFxuXG4gICAgICAgIFwicnVsZXNldFwiIDogW3tcbiAgICAgICAgICAgIHJlZ2V4IDogXCItKHdlYmtpdHxtc3xtb3p8byktXCIsXG4gICAgICAgICAgICB0b2tlbiA6IFwidGV4dFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJwdW5jdHVhdGlvbi5vcGVyYXRvclwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIls6O11cIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwicGFyZW4ucnBhcmVuXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiXFxcXH1cIixcbiAgICAgICAgICAgIG5leHQgOiBcInN0YXJ0XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaW5jbHVkZSA6IFtcInN0cmluZ3NcIiwgXCJ1cmxcIiwgXCJjb21tZW50c1wiXVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFtcImNvbnN0YW50Lm51bWVyaWNcIiwgXCJrZXl3b3JkXCJdLFxuICAgICAgICAgICAgcmVnZXggOiBcIihcIiArIG51bVJlICsgXCIpKGNofGNtfGRlZ3xlbXxleHxmcnxnZHxncmFkfEh6fGlufGtIenxtbXxtc3xwY3xwdHxweHxyYWR8cmVtfHN8dHVybnx2aHx2bWF4fHZtaW58dm18dnd8JSlcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLFxuICAgICAgICAgICAgcmVnZXggOiBudW1SZVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLCAgLy8gaGV4NiBjb2xvclxuICAgICAgICAgICAgcmVnZXggOiBcIiNbYS1mMC05XXs2fVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5udW1lcmljXCIsIC8vIGhleDMgY29sb3JcbiAgICAgICAgICAgIHJlZ2V4IDogXCIjW2EtZjAtOV17M31cIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFtcInB1bmN0dWF0aW9uXCIsIFwiZW50aXR5Lm90aGVyLmF0dHJpYnV0ZS1uYW1lLnBzZXVkby1lbGVtZW50LmNzc1wiXSxcbiAgICAgICAgICAgIHJlZ2V4IDogcHNldWRvRWxlbWVudHNcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBbXCJwdW5jdHVhdGlvblwiLCBcImVudGl0eS5vdGhlci5hdHRyaWJ1dGUtbmFtZS5wc2V1ZG8tY2xhc3MuY3NzXCJdLFxuICAgICAgICAgICAgcmVnZXggOiBwc2V1ZG9DbGFzc2VzXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGluY2x1ZGU6IFwidXJsXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBrZXl3b3JkTWFwcGVyLFxuICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwtP1thLXpBLVpfXVthLXpBLVowLTlfXFxcXC1dKlwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInBhcmVuLmxwYXJlblwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiXFxcXHtcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjYXNlSW5zZW5zaXRpdmU6IHRydWVcbiAgICAgICAgfV0sXG5cbiAgICAgICAgdXJsOiBbe1xuICAgICAgICAgICAgdG9rZW4gOiBcInN1cHBvcnQuZnVuY3Rpb25cIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCIoPzp1cmwoOj8tcHJlZml4KT98ZG9tYWlufHJlZ2V4cClcXFxcKFwiLFxuICAgICAgICAgICAgcHVzaDogW3tcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3VwcG9ydC5mdW5jdGlvblwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcKVwiLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcInBvcFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInN0cmluZ1wiXG4gICAgICAgICAgICB9XVxuICAgICAgICB9XSxcblxuICAgICAgICBzdHJpbmdzOiBbe1xuICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZy5zdGFydFwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIidcIixcbiAgICAgICAgICAgIHB1c2ggOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmcuZW5kXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIid8JFwiLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpbmNsdWRlIDogXCJlc2NhcGVzXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvXFxcXCQvLFxuICAgICAgICAgICAgICAgIGNvbnN1bWVMaW5lRW5kOiB0cnVlXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInN0cmluZ1wiXG4gICAgICAgICAgICB9XVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nLnN0YXJ0XCIsXG4gICAgICAgICAgICByZWdleCA6ICdcIicsXG4gICAgICAgICAgICBwdXNoIDogW3tcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nLmVuZFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogJ1wifCQnLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpbmNsdWRlIDogXCJlc2NhcGVzXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvXFxcXCQvLFxuICAgICAgICAgICAgICAgIGNvbnN1bWVMaW5lRW5kOiB0cnVlXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInN0cmluZ1wiXG4gICAgICAgICAgICB9XVxuICAgICAgICB9XSxcbiAgICAgICAgZXNjYXBlczogW3tcbiAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIixcbiAgICAgICAgICAgIHJlZ2V4IDogL1xcXFwoW2EtZkEtRlxcZF17MSw2fXxbXmEtZkEtRlxcZF0pL1xuICAgICAgICB9XVxuXG4gICAgfTtcblxuICAgIHRoaXMubm9ybWFsaXplUnVsZXMoKTtcbn07XG5cbm9vcC5pbmhlcml0cyhDc3NIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuZXhwb3J0cy5Dc3NIaWdobGlnaHRSdWxlcyA9IENzc0hpZ2hsaWdodFJ1bGVzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vLi4vbGliL29vcFwiKTtcbnZhciBCYXNlRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9mb2xkX21vZGVcIikuRm9sZE1vZGU7XG52YXIgUmFuZ2UgPSByZXF1aXJlKFwiLi4vLi4vcmFuZ2VcIikuUmFuZ2U7XG5cbnZhciBGb2xkTW9kZSA9IGV4cG9ydHMuRm9sZE1vZGUgPSBmdW5jdGlvbigpIHt9O1xub29wLmluaGVyaXRzKEZvbGRNb2RlLCBCYXNlRm9sZE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5jb21tZW50QmxvY2sgPSBmdW5jdGlvbihzZXNzaW9uLCByb3cpIHtcbiAgICAgICAgdmFyIHJlID0gL1xcUy87XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgIHZhciBzdGFydExldmVsID0gbGluZS5zZWFyY2gocmUpO1xuICAgICAgICBpZiAoc3RhcnRMZXZlbCA9PSAtMSB8fCBsaW5lW3N0YXJ0TGV2ZWxdICE9IFwiI1wiKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHZhciBzdGFydENvbHVtbiA9IGxpbmUubGVuZ3RoO1xuICAgICAgICB2YXIgbWF4Um93ID0gc2Vzc2lvbi5nZXRMZW5ndGgoKTtcbiAgICAgICAgdmFyIHN0YXJ0Um93ID0gcm93O1xuICAgICAgICB2YXIgZW5kUm93ID0gcm93O1xuXG4gICAgICAgIHdoaWxlICgrK3JvdyA8IG1heFJvdykge1xuICAgICAgICAgICAgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICAgICAgdmFyIGxldmVsID0gbGluZS5zZWFyY2gocmUpO1xuXG4gICAgICAgICAgICBpZiAobGV2ZWwgPT0gLTEpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgICAgIGlmIChsaW5lW2xldmVsXSAhPSBcIiNcIilcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZW5kUm93ID0gcm93O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVuZFJvdyA+IHN0YXJ0Um93KSB7XG4gICAgICAgICAgICB2YXIgZW5kQ29sdW1uID0gc2Vzc2lvbi5nZXRMaW5lKGVuZFJvdykubGVuZ3RoO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShzdGFydFJvdywgc3RhcnRDb2x1bW4sIGVuZFJvdywgZW5kQ29sdW1uKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLmdldEZvbGRXaWRnZXRSYW5nZSA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KSB7XG4gICAgICAgIHZhciByYW5nZSA9IHRoaXMuaW5kZW50YXRpb25CbG9jayhzZXNzaW9uLCByb3cpO1xuICAgICAgICBpZiAocmFuZ2UpXG4gICAgICAgICAgICByZXR1cm4gcmFuZ2U7XG5cbiAgICAgICAgcmFuZ2UgPSB0aGlzLmNvbW1lbnRCbG9jayhzZXNzaW9uLCByb3cpO1xuICAgICAgICBpZiAocmFuZ2UpXG4gICAgICAgICAgICByZXR1cm4gcmFuZ2U7XG4gICAgfTtcblxuICAgIC8vIG11c3QgcmV0dXJuIFwiXCIgaWYgdGhlcmUncyBubyBmb2xkLCB0byBlbmFibGUgY2FjaGluZ1xuICAgIHRoaXMuZ2V0Rm9sZFdpZGdldCA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgIHZhciBpbmRlbnQgPSBsaW5lLnNlYXJjaCgvXFxTLyk7XG4gICAgICAgIHZhciBuZXh0ID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyArIDEpO1xuICAgICAgICB2YXIgcHJldiA9IHNlc3Npb24uZ2V0TGluZShyb3cgLSAxKTtcbiAgICAgICAgdmFyIHByZXZJbmRlbnQgPSBwcmV2LnNlYXJjaCgvXFxTLyk7XG4gICAgICAgIHZhciBuZXh0SW5kZW50ID0gbmV4dC5zZWFyY2goL1xcUy8pO1xuXG4gICAgICAgIGlmIChpbmRlbnQgPT0gLTEpIHtcbiAgICAgICAgICAgIHNlc3Npb24uZm9sZFdpZGdldHNbcm93IC0gMV0gPSBwcmV2SW5kZW50IT0gLTEgJiYgcHJldkluZGVudCA8IG5leHRJbmRlbnQgPyBcInN0YXJ0XCIgOiBcIlwiO1xuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBkb2N1bWVudGF0aW9uIGNvbW1lbnRzXG4gICAgICAgIGlmIChwcmV2SW5kZW50ID09IC0xKSB7XG4gICAgICAgICAgICBpZiAoaW5kZW50ID09IG5leHRJbmRlbnQgJiYgbGluZVtpbmRlbnRdID09IFwiI1wiICYmIG5leHRbaW5kZW50XSA9PSBcIiNcIikge1xuICAgICAgICAgICAgICAgIHNlc3Npb24uZm9sZFdpZGdldHNbcm93IC0gMV0gPSBcIlwiO1xuICAgICAgICAgICAgICAgIHNlc3Npb24uZm9sZFdpZGdldHNbcm93ICsgMV0gPSBcIlwiO1xuICAgICAgICAgICAgICAgIHJldHVybiBcInN0YXJ0XCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAocHJldkluZGVudCA9PSBpbmRlbnQgJiYgbGluZVtpbmRlbnRdID09IFwiI1wiICYmIHByZXZbaW5kZW50XSA9PSBcIiNcIikge1xuICAgICAgICAgICAgaWYgKHNlc3Npb24uZ2V0TGluZShyb3cgLSAyKS5zZWFyY2goL1xcUy8pID09IC0xKSB7XG4gICAgICAgICAgICAgICAgc2Vzc2lvbi5mb2xkV2lkZ2V0c1tyb3cgLSAxXSA9IFwic3RhcnRcIjtcbiAgICAgICAgICAgICAgICBzZXNzaW9uLmZvbGRXaWRnZXRzW3JvdyArIDFdID0gXCJcIjtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcmV2SW5kZW50IT0gLTEgJiYgcHJldkluZGVudCA8IGluZGVudClcbiAgICAgICAgICAgIHNlc3Npb24uZm9sZFdpZGdldHNbcm93IC0gMV0gPSBcInN0YXJ0XCI7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHNlc3Npb24uZm9sZFdpZGdldHNbcm93IC0gMV0gPSBcIlwiO1xuXG4gICAgICAgIGlmIChpbmRlbnQgPCBuZXh0SW5kZW50KVxuICAgICAgICAgICAgcmV0dXJuIFwic3RhcnRcIjtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfTtcblxufSkuY2FsbChGb2xkTW9kZS5wcm90b3R5cGUpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0TW9kZSA9IHJlcXVpcmUoXCIuL3RleHRcIikuTW9kZTtcbnZhciBTYXNzSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9zYXNzX2hpZ2hsaWdodF9ydWxlc1wiKS5TYXNzSGlnaGxpZ2h0UnVsZXM7XG52YXIgRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9mb2xkaW5nL2NvZmZlZVwiKS5Gb2xkTW9kZTtcblxudmFyIE1vZGUgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLkhpZ2hsaWdodFJ1bGVzID0gU2Fzc0hpZ2hsaWdodFJ1bGVzO1xuICAgIHRoaXMuZm9sZGluZ1J1bGVzID0gbmV3IEZvbGRNb2RlKCk7XG4gICAgdGhpcy4kYmVoYXZpb3VyID0gdGhpcy4kZGVmYXVsdEJlaGF2aW91cjtcbn07XG5vb3AuaW5oZXJpdHMoTW9kZSwgVGV4dE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7ICAgXG4gICAgdGhpcy5saW5lQ29tbWVudFN0YXJ0ID0gXCIvL1wiO1xuICAgIHRoaXMuJGlkID0gXCJhY2UvbW9kZS9zYXNzXCI7XG59KS5jYWxsKE1vZGUucHJvdG90eXBlKTtcblxuZXhwb3J0cy5Nb2RlID0gTW9kZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgbGFuZyA9IHJlcXVpcmUoXCIuLi9saWIvbGFuZ1wiKTtcbnZhciBTY3NzSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9zY3NzX2hpZ2hsaWdodF9ydWxlc1wiKS5TY3NzSGlnaGxpZ2h0UnVsZXM7XG5cbnZhciBTYXNzSGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbigpIHtcbiAgICBTY3NzSGlnaGxpZ2h0UnVsZXMuY2FsbCh0aGlzKTtcbiAgICB2YXIgc3RhcnQgPSB0aGlzLiRydWxlcy5zdGFydDtcbiAgICBpZiAoc3RhcnRbMV0udG9rZW4gPT0gXCJjb21tZW50XCIpIHtcbiAgICAgICAgc3RhcnQuc3BsaWNlKDEsIDEsIHtcbiAgICAgICAgICAgIG9uTWF0Y2g6IGZ1bmN0aW9uKHZhbHVlLCBjdXJyZW50U3RhdGUsIHN0YWNrKSB7XG4gICAgICAgICAgICAgICAgc3RhY2sudW5zaGlmdCh0aGlzLm5leHQsIC0xLCB2YWx1ZS5sZW5ndGggLSAyLCBjdXJyZW50U3RhdGUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBcImNvbW1lbnRcIjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZWdleDogL15cXHMqXFwvXFwqLyxcbiAgICAgICAgICAgIG5leHQ6IFwiY29tbWVudFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcImVycm9yLmludmFsaWRcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIi9cXFxcKnxbezt9XVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInN1cHBvcnQudHlwZVwiLFxuICAgICAgICAgICAgcmVnZXg6IC9eXFxzKjpbXFx3XFwtXStcXHMvXG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgdGhpcy4kcnVsZXMuY29tbWVudCA9IFtcbiAgICAgICAgICAgIHtyZWdleDogL15cXHMqLywgb25NYXRjaDogZnVuY3Rpb24odmFsdWUsIGN1cnJlbnRTdGF0ZSwgc3RhY2spIHtcbiAgICAgICAgICAgICAgICBpZiAoc3RhY2tbMV0gPT09IC0xKVxuICAgICAgICAgICAgICAgICAgICBzdGFja1sxXSA9IE1hdGgubWF4KHN0YWNrWzJdLCB2YWx1ZS5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUubGVuZ3RoIDw9IHN0YWNrWzFdKSB7XG4gICAgICAgICAgICAgICAgICAgIC8qc2hpZnQzeCovc3RhY2suc2hpZnQoKTtzdGFjay5zaGlmdCgpO3N0YWNrLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dCA9IHN0YWNrLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcInRleHRcIjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHQgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJjb21tZW50XCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgbmV4dDogXCJzdGFydFwifSxcbiAgICAgICAgICAgIHtkZWZhdWx0VG9rZW46IFwiY29tbWVudFwifVxuICAgICAgICBdO1xuICAgIH1cbn07XG5cbm9vcC5pbmhlcml0cyhTYXNzSGlnaGxpZ2h0UnVsZXMsIFNjc3NIaWdobGlnaHRSdWxlcyk7XG5cbmV4cG9ydHMuU2Fzc0hpZ2hsaWdodFJ1bGVzID0gU2Fzc0hpZ2hsaWdodFJ1bGVzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBsYW5nID0gcmVxdWlyZShcIi4uL2xpYi9sYW5nXCIpO1xudmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcbnZhciBDc3NIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL2Nzc19oaWdobGlnaHRfcnVsZXNcIik7XG5cbnZhciBTY3NzSGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbigpIHtcbiAgICBcbiAgICB2YXIgcHJvcGVydGllcyA9IGxhbmcuYXJyYXlUb01hcChDc3NIaWdobGlnaHRSdWxlcy5zdXBwb3J0VHlwZS5zcGxpdChcInxcIikpO1xuXG4gICAgdmFyIGZ1bmN0aW9ucyA9IGxhbmcuYXJyYXlUb01hcChcbiAgICAgICAgKFwiaHNsfGhzbGF8cmdifHJnYmF8dXJsfGF0dHJ8Y291bnRlcnxjb3VudGVyc3xhYnN8YWRqdXN0X2NvbG9yfGFkanVzdF9odWV8XCIgK1xuICAgICAgICAgXCJhbHBoYXxqb2lufGJsdWV8Y2VpbHxjaGFuZ2VfY29sb3J8Y29tcGFyYWJsZXxjb21wbGVtZW50fGRhcmtlbnxkZXNhdHVyYXRlfFwiICsgXG4gICAgICAgICBcImZsb29yfGdyYXlzY2FsZXxncmVlbnxodWV8aWZ8aW52ZXJ0fGpvaW58bGVuZ3RofGxpZ2h0ZW58bGlnaHRuZXNzfG1peHxcIiArIFxuICAgICAgICAgXCJudGh8b3BhY2lmeXxvcGFjaXR5fHBlcmNlbnRhZ2V8cXVvdGV8cmVkfHJvdW5kfHNhdHVyYXRlfHNhdHVyYXRpb258XCIgK1xuICAgICAgICAgXCJzY2FsZV9jb2xvcnx0cmFuc3BhcmVudGl6ZXx0eXBlX29mfHVuaXR8dW5pdGxlc3N8dW5xdW90ZVwiKS5zcGxpdChcInxcIilcbiAgICApO1xuXG4gICAgdmFyIGNvbnN0YW50cyA9IGxhbmcuYXJyYXlUb01hcChDc3NIaWdobGlnaHRSdWxlcy5zdXBwb3J0Q29uc3RhbnQuc3BsaXQoXCJ8XCIpKTtcblxuICAgIHZhciBjb2xvcnMgPSBsYW5nLmFycmF5VG9NYXAoQ3NzSGlnaGxpZ2h0UnVsZXMuc3VwcG9ydENvbnN0YW50Q29sb3Iuc3BsaXQoXCJ8XCIpKTtcbiAgICBcbiAgICB2YXIga2V5d29yZHMgPSBsYW5nLmFycmF5VG9NYXAoXG4gICAgICAgIChcIkBtaXhpbnxAZXh0ZW5kfEBpbmNsdWRlfEBpbXBvcnR8QG1lZGlhfEBkZWJ1Z3xAd2FybnxAaWZ8QGZvcnxAZWFjaHxAd2hpbGV8QGVsc2V8QGZvbnQtZmFjZXxALXdlYmtpdC1rZXlmcmFtZXN8aWZ8YW5kfCFkZWZhdWx0fG1vZHVsZXxkZWZ8ZW5kfGRlY2xhcmVcIikuc3BsaXQoXCJ8XCIpXG4gICAgKTtcbiAgICBcbiAgICB2YXIgdGFncyA9IGxhbmcuYXJyYXlUb01hcChcbiAgICAgICAgKFwiYXxhYmJyfGFjcm9ueW18YWRkcmVzc3xhcHBsZXR8YXJlYXxhcnRpY2xlfGFzaWRlfGF1ZGlvfGJ8YmFzZXxiYXNlZm9udHxiZG98XCIgKyBcbiAgICAgICAgIFwiYmlnfGJsb2NrcXVvdGV8Ym9keXxicnxidXR0b258Y2FudmFzfGNhcHRpb258Y2VudGVyfGNpdGV8Y29kZXxjb2x8Y29sZ3JvdXB8XCIgKyBcbiAgICAgICAgIFwiY29tbWFuZHxkYXRhbGlzdHxkZHxkZWx8ZGV0YWlsc3xkZm58ZGlyfGRpdnxkbHxkdHxlbXxlbWJlZHxmaWVsZHNldHxcIiArIFxuICAgICAgICAgXCJmaWdjYXB0aW9ufGZpZ3VyZXxmb250fGZvb3Rlcnxmb3JtfGZyYW1lfGZyYW1lc2V0fGgxfGgyfGgzfGg0fGg1fGg2fGhlYWR8XCIgKyBcbiAgICAgICAgIFwiaGVhZGVyfGhncm91cHxocnxodG1sfGl8aWZyYW1lfGltZ3xpbnB1dHxpbnN8a2V5Z2VufGtiZHxsYWJlbHxsZWdlbmR8bGl8XCIgKyBcbiAgICAgICAgIFwibGlua3xtYXB8bWFya3xtZW51fG1ldGF8bWV0ZXJ8bmF2fG5vZnJhbWVzfG5vc2NyaXB0fG9iamVjdHxvbHxvcHRncm91cHxcIiArIFxuICAgICAgICAgXCJvcHRpb258b3V0cHV0fHB8cGFyYW18cHJlfHByb2dyZXNzfHF8cnB8cnR8cnVieXxzfHNhbXB8c2NyaXB0fHNlY3Rpb258c2VsZWN0fFwiICsgXG4gICAgICAgICBcInNtYWxsfHNvdXJjZXxzcGFufHN0cmlrZXxzdHJvbmd8c3R5bGV8c3VifHN1bW1hcnl8c3VwfHRhYmxlfHRib2R5fHRkfFwiICsgXG4gICAgICAgICBcInRleHRhcmVhfHRmb290fHRofHRoZWFkfHRpbWV8dGl0bGV8dHJ8dHR8dXx1bHx2YXJ8dmlkZW98d2JyfHhtcFwiKS5zcGxpdChcInxcIilcbiAgICApO1xuXG4gICAgLy8gcmVnZXhwIG11c3Qgbm90IGhhdmUgY2FwdHVyaW5nIHBhcmVudGhlc2VzLiBVc2UgKD86KSBpbnN0ZWFkLlxuICAgIC8vIHJlZ2V4cHMgYXJlIG9yZGVyZWQgLT4gdGhlIGZpcnN0IG1hdGNoIGlzIHVzZWRcblxuICAgIHZhciBudW1SZSA9IFwiXFxcXC0/KD86KD86WzAtOV0rKXwoPzpbMC05XSpcXFxcLlswLTldKykpXCI7XG5cbiAgICAvLyByZWdleHAgbXVzdCBub3QgaGF2ZSBjYXB0dXJpbmcgcGFyZW50aGVzZXMuIFVzZSAoPzopIGluc3RlYWQuXG4gICAgLy8gcmVnZXhwcyBhcmUgb3JkZXJlZCAtPiB0aGUgZmlyc3QgbWF0Y2ggaXMgdXNlZFxuXG4gICAgdGhpcy4kcnVsZXMgPSB7XG4gICAgICAgIFwic3RhcnRcIiA6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcL1xcXFwvLiokXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIiwgLy8gbXVsdGkgbGluZSBjb21tZW50XG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwvXFxcXCpcIixcbiAgICAgICAgICAgICAgICBuZXh0IDogXCJjb21tZW50XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsIC8vIHNpbmdsZSBsaW5lXG4gICAgICAgICAgICAgICAgcmVnZXggOiAnW1wiXSg/Oig/OlxcXFxcXFxcLil8KD86W15cIlxcXFxcXFxcXSkpKj9bXCJdJ1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIiwgLy8gbXVsdGkgbGluZSBzdHJpbmcgc3RhcnRcbiAgICAgICAgICAgICAgICByZWdleCA6ICdbXCJdLipcXFxcXFxcXCQnLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcInFxc3RyaW5nXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsIC8vIHNpbmdsZSBsaW5lXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlsnXSg/Oig/OlxcXFxcXFxcLil8KD86W14nXFxcXFxcXFxdKSkqP1snXVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLCAvLyBtdWx0aSBsaW5lIHN0cmluZyBzdGFydFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJbJ10uKlxcXFxcXFxcJFwiLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcInFzdHJpbmdcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5udW1lcmljXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBudW1SZSArIFwiKD86Y2h8Y218ZGVnfGVtfGV4fGZyfGdkfGdyYWR8SHp8aW58a0h6fG1tfG1zfHBjfHB0fHB4fHJhZHxyZW18c3x0dXJufHZofHZtYXh8dm1pbnx2bXx2d3wlKVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIiwgLy8gaGV4NiBjb2xvclxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIjW2EtZjAtOV17Nn1cIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5udW1lcmljXCIsIC8vIGhleDMgY29sb3JcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiI1thLWYwLTldezN9XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogbnVtUmVcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFtcInN1cHBvcnQuZnVuY3Rpb25cIiwgXCJzdHJpbmdcIiwgXCJzdXBwb3J0LmZ1bmN0aW9uXCJdLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIodXJsXFxcXCgpKC4qKShcXFxcKSlcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkodmFsdWUudG9Mb3dlckNhc2UoKSkpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJzdXBwb3J0LnR5cGVcIjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGtleXdvcmRzLmhhc093blByb3BlcnR5KHZhbHVlKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcImtleXdvcmRcIjtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoY29uc3RhbnRzLmhhc093blByb3BlcnR5KHZhbHVlKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcImNvbnN0YW50Lmxhbmd1YWdlXCI7XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGZ1bmN0aW9ucy5oYXNPd25Qcm9wZXJ0eSh2YWx1ZSkpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJzdXBwb3J0LmZ1bmN0aW9uXCI7XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNvbG9ycy5oYXNPd25Qcm9wZXJ0eSh2YWx1ZS50b0xvd2VyQ2FzZSgpKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcInN1cHBvcnQuY29uc3RhbnQuY29sb3JcIjtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodGFncy5oYXNPd25Qcm9wZXJ0eSh2YWx1ZS50b0xvd2VyQ2FzZSgpKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcInZhcmlhYmxlLmxhbmd1YWdlXCI7XG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcInRleHRcIjtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcLT9bQGEtel9dW0BhLXowLTlfXFxcXC1dKlwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInZhcmlhYmxlXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlthLXpfXFxcXC0kXVthLXowLTlfXFxcXC0kXSpcXFxcYlwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwidmFyaWFibGUubGFuZ3VhZ2VcIixcbiAgICAgICAgICAgICAgICByZWdleDogXCIjW2EtejAtOS1fXStcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInZhcmlhYmxlLmxhbmd1YWdlXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiXFxcXC5bYS16MC05LV9dK1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwidmFyaWFibGUubGFuZ3VhZ2VcIixcbiAgICAgICAgICAgICAgICByZWdleDogXCI6W2EtejAtOS1fXStcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50XCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiW2EtejAtOS1fXStcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIjx8Pnw8PXw+PXw9PXwhPXwtfCV8I3xcXFxcK3xcXFxcJHxcXFxcK3xcXFxcKlwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInBhcmVuLmxwYXJlblwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJbWyh7XVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInBhcmVuLnJwYXJlblwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJbXFxcXF0pfV1cIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFxzK1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgY2FzZUluc2Vuc2l0aXZlOiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIFwiY29tbWVudFwiIDogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsIC8vIGNsb3NpbmcgY29tbWVudFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcKlxcXFwvXCIsXG4gICAgICAgICAgICAgICAgbmV4dCA6IFwic3RhcnRcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbiA6IFwiY29tbWVudFwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIFwicXFzdHJpbmdcIiA6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAnKD86KD86XFxcXFxcXFwuKXwoPzpbXlwiXFxcXFxcXFxdKSkqP1wiJyxcbiAgICAgICAgICAgICAgICBuZXh0IDogXCJzdGFydFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogJy4rJ1xuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBcInFzdHJpbmdcIiA6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIig/Oig/OlxcXFxcXFxcLil8KD86W14nXFxcXFxcXFxdKSkqPydcIixcbiAgICAgICAgICAgICAgICBuZXh0IDogXCJzdGFydFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogJy4rJ1xuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfTtcbn07XG5cbm9vcC5pbmhlcml0cyhTY3NzSGlnaGxpZ2h0UnVsZXMsIFRleHRIaWdobGlnaHRSdWxlcyk7XG5cbmV4cG9ydHMuU2Nzc0hpZ2hsaWdodFJ1bGVzID0gU2Nzc0hpZ2hsaWdodFJ1bGVzO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9