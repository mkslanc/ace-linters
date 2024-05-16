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
var SassHighlightRules = (__webpack_require__(32475).SassHighlightRules);
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
var ScssHighlightRules = (__webpack_require__(71690).ScssHighlightRules);

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

exports.ScssHighlightRules = ScssHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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ZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9jc3NfaGlnaGxpZ2h0X3J1bGVzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvZm9sZGluZy9jb2ZmZWUuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9zYXNzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvc2Fzc19oaWdobGlnaHRfcnVsZXMuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9zY3NzX2hpZ2hsaWdodF9ydWxlcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIGxhbmcgPSByZXF1aXJlKFwiLi4vbGliL2xhbmdcIik7XG52YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xuXG5cbi8qIEV4cG9ydHMgYXJlIGZvciBTdHlsdXMgYW5kIExlc3MgaGlnaGxpZ2h0ZXJzICovXG52YXIgc3VwcG9ydFR5cGUgPSBleHBvcnRzLnN1cHBvcnRUeXBlID0gXCJhbGlnbi1jb250ZW50fGFsaWduLWl0ZW1zfGFsaWduLXNlbGZ8YWxsfGFuaW1hdGlvbnxhbmltYXRpb24tZGVsYXl8YW5pbWF0aW9uLWRpcmVjdGlvbnxhbmltYXRpb24tZHVyYXRpb258YW5pbWF0aW9uLWZpbGwtbW9kZXxhbmltYXRpb24taXRlcmF0aW9uLWNvdW50fGFuaW1hdGlvbi1uYW1lfGFuaW1hdGlvbi1wbGF5LXN0YXRlfGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb258YmFja2ZhY2UtdmlzaWJpbGl0eXxiYWNrZ3JvdW5kfGJhY2tncm91bmQtYXR0YWNobWVudHxiYWNrZ3JvdW5kLWJsZW5kLW1vZGV8YmFja2dyb3VuZC1jbGlwfGJhY2tncm91bmQtY29sb3J8YmFja2dyb3VuZC1pbWFnZXxiYWNrZ3JvdW5kLW9yaWdpbnxiYWNrZ3JvdW5kLXBvc2l0aW9ufGJhY2tncm91bmQtcmVwZWF0fGJhY2tncm91bmQtc2l6ZXxib3JkZXJ8Ym9yZGVyLWJvdHRvbXxib3JkZXItYm90dG9tLWNvbG9yfGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXN8Ym9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXN8Ym9yZGVyLWJvdHRvbS1zdHlsZXxib3JkZXItYm90dG9tLXdpZHRofGJvcmRlci1jb2xsYXBzZXxib3JkZXItY29sb3J8Ym9yZGVyLWltYWdlfGJvcmRlci1pbWFnZS1vdXRzZXR8Ym9yZGVyLWltYWdlLXJlcGVhdHxib3JkZXItaW1hZ2Utc2xpY2V8Ym9yZGVyLWltYWdlLXNvdXJjZXxib3JkZXItaW1hZ2Utd2lkdGh8Ym9yZGVyLWxlZnR8Ym9yZGVyLWxlZnQtY29sb3J8Ym9yZGVyLWxlZnQtc3R5bGV8Ym9yZGVyLWxlZnQtd2lkdGh8Ym9yZGVyLXJhZGl1c3xib3JkZXItcmlnaHR8Ym9yZGVyLXJpZ2h0LWNvbG9yfGJvcmRlci1yaWdodC1zdHlsZXxib3JkZXItcmlnaHQtd2lkdGh8Ym9yZGVyLXNwYWNpbmd8Ym9yZGVyLXN0eWxlfGJvcmRlci10b3B8Ym9yZGVyLXRvcC1jb2xvcnxib3JkZXItdG9wLWxlZnQtcmFkaXVzfGJvcmRlci10b3AtcmlnaHQtcmFkaXVzfGJvcmRlci10b3Atc3R5bGV8Ym9yZGVyLXRvcC13aWR0aHxib3JkZXItd2lkdGh8Ym90dG9tfGJveC1zaGFkb3d8Ym94LXNpemluZ3xjYXB0aW9uLXNpZGV8Y2xlYXJ8Y2xpcHxjb2xvcnxjb2x1bW4tY291bnR8Y29sdW1uLWZpbGx8Y29sdW1uLWdhcHxjb2x1bW4tcnVsZXxjb2x1bW4tcnVsZS1jb2xvcnxjb2x1bW4tcnVsZS1zdHlsZXxjb2x1bW4tcnVsZS13aWR0aHxjb2x1bW4tc3Bhbnxjb2x1bW4td2lkdGh8Y29sdW1uc3xjb250ZW50fGNvdW50ZXItaW5jcmVtZW50fGNvdW50ZXItcmVzZXR8Y3Vyc29yfGRpcmVjdGlvbnxkaXNwbGF5fGVtcHR5LWNlbGxzfGZpbHRlcnxmbGV4fGZsZXgtYmFzaXN8ZmxleC1kaXJlY3Rpb258ZmxleC1mbG93fGZsZXgtZ3Jvd3xmbGV4LXNocmlua3xmbGV4LXdyYXB8ZmxvYXR8Zm9udHxmb250LWZhbWlseXxmb250LXNpemV8Zm9udC1zaXplLWFkanVzdHxmb250LXN0cmV0Y2h8Zm9udC1zdHlsZXxmb250LXZhcmlhbnR8Zm9udC13ZWlnaHR8aGFuZ2luZy1wdW5jdHVhdGlvbnxoZWlnaHR8anVzdGlmeS1jb250ZW50fGxlZnR8bGV0dGVyLXNwYWNpbmd8bGluZS1oZWlnaHR8bGlzdC1zdHlsZXxsaXN0LXN0eWxlLWltYWdlfGxpc3Qtc3R5bGUtcG9zaXRpb258bGlzdC1zdHlsZS10eXBlfG1hcmdpbnxtYXJnaW4tYm90dG9tfG1hcmdpbi1sZWZ0fG1hcmdpbi1yaWdodHxtYXJnaW4tdG9wfG1heC1oZWlnaHR8bWF4LXdpZHRofG1heC16b29tfG1pbi1oZWlnaHR8bWluLXdpZHRofG1pbi16b29tfG5hdi1kb3dufG5hdi1pbmRleHxuYXYtbGVmdHxuYXYtcmlnaHR8bmF2LXVwfG9wYWNpdHl8b3JkZXJ8b3V0bGluZXxvdXRsaW5lLWNvbG9yfG91dGxpbmUtb2Zmc2V0fG91dGxpbmUtc3R5bGV8b3V0bGluZS13aWR0aHxvdmVyZmxvd3xvdmVyZmxvdy14fG92ZXJmbG93LXl8cGFkZGluZ3xwYWRkaW5nLWJvdHRvbXxwYWRkaW5nLWxlZnR8cGFkZGluZy1yaWdodHxwYWRkaW5nLXRvcHxwYWdlLWJyZWFrLWFmdGVyfHBhZ2UtYnJlYWstYmVmb3JlfHBhZ2UtYnJlYWstaW5zaWRlfHBlcnNwZWN0aXZlfHBlcnNwZWN0aXZlLW9yaWdpbnxwb3NpdGlvbnxxdW90ZXN8cmVzaXplfHJpZ2h0fHRhYi1zaXplfHRhYmxlLWxheW91dHx0ZXh0LWFsaWdufHRleHQtYWxpZ24tbGFzdHx0ZXh0LWRlY29yYXRpb258dGV4dC1kZWNvcmF0aW9uLWNvbG9yfHRleHQtZGVjb3JhdGlvbi1saW5lfHRleHQtZGVjb3JhdGlvbi1zdHlsZXx0ZXh0LWluZGVudHx0ZXh0LWp1c3RpZnl8dGV4dC1vdmVyZmxvd3x0ZXh0LXNoYWRvd3x0ZXh0LXRyYW5zZm9ybXx0b3B8dHJhbnNmb3JtfHRyYW5zZm9ybS1vcmlnaW58dHJhbnNmb3JtLXN0eWxlfHRyYW5zaXRpb258dHJhbnNpdGlvbi1kZWxheXx0cmFuc2l0aW9uLWR1cmF0aW9ufHRyYW5zaXRpb24tcHJvcGVydHl8dHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb258dW5pY29kZS1iaWRpfHVzZXItc2VsZWN0fHVzZXItem9vbXx2ZXJ0aWNhbC1hbGlnbnx2aXNpYmlsaXR5fHdoaXRlLXNwYWNlfHdpZHRofHdvcmQtYnJlYWt8d29yZC1zcGFjaW5nfHdvcmQtd3JhcHx6LWluZGV4XCI7XG52YXIgc3VwcG9ydEZ1bmN0aW9uID0gZXhwb3J0cy5zdXBwb3J0RnVuY3Rpb24gPSBcInJnYnxyZ2JhfHVybHxhdHRyfGNvdW50ZXJ8Y291bnRlcnNcIjtcbnZhciBzdXBwb3J0Q29uc3RhbnQgPSBleHBvcnRzLnN1cHBvcnRDb25zdGFudCA9IFwiYWJzb2x1dGV8YWZ0ZXItZWRnZXxhZnRlcnxhbGwtc2Nyb2xsfGFsbHxhbHBoYWJldGljfGFsd2F5c3xhbnRpYWxpYXNlZHxhcm1lbmlhbnxhdXRvfGF2b2lkLWNvbHVtbnxhdm9pZC1wYWdlfGF2b2lkfGJhbGFuY2V8YmFzZWxpbmV8YmVmb3JlLWVkZ2V8YmVmb3JlfGJlbG93fGJpZGktb3ZlcnJpZGV8YmxvY2stbGluZS1oZWlnaHR8YmxvY2t8Ym9sZHxib2xkZXJ8Ym9yZGVyLWJveHxib3RofGJvdHRvbXxib3h8YnJlYWstYWxsfGJyZWFrLXdvcmR8Y2FwaXRhbGl6ZXxjYXBzLWhlaWdodHxjYXB0aW9ufGNlbnRlcnxjZW50cmFsfGNoYXJ8Y2lyY2xlfGNqay1pZGVvZ3JhcGhpY3xjbG9uZXxjbG9zZS1xdW90ZXxjb2wtcmVzaXplfGNvbGxhcHNlfGNvbHVtbnxjb25zaWRlci1zaGlmdHN8Y29udGFpbnxjb250ZW50LWJveHxjb3Zlcnxjcm9zc2hhaXJ8Y3ViaWMtYmV6aWVyfGRhc2hlZHxkZWNpbWFsLWxlYWRpbmctemVyb3xkZWNpbWFsfGRlZmF1bHR8ZGlzYWJsZWR8ZGlzY3xkaXNyZWdhcmQtc2hpZnRzfGRpc3RyaWJ1dGUtYWxsLWxpbmVzfGRpc3RyaWJ1dGUtbGV0dGVyfGRpc3RyaWJ1dGUtc3BhY2V8ZGlzdHJpYnV0ZXxkb3R0ZWR8ZG91YmxlfGUtcmVzaXplfGVhc2UtaW58ZWFzZS1pbi1vdXR8ZWFzZS1vdXR8ZWFzZXxlbGxpcHNpc3xlbmR8ZXhjbHVkZS1ydWJ5fGZsZXgtZW5kfGZsZXgtc3RhcnR8ZmlsbHxmaXhlZHxnZW9yZ2lhbnxnbHlwaHN8Z3JpZC1oZWlnaHR8Z3Jvb3ZlfGhhbmR8aGFuZ2luZ3xoZWJyZXd8aGVscHxoaWRkZW58aGlyYWdhbmEtaXJvaGF8aGlyYWdhbmF8aG9yaXpvbnRhbHxpY29ufGlkZW9ncmFwaC1hbHBoYXxpZGVvZ3JhcGgtbnVtZXJpY3xpZGVvZ3JhcGgtcGFyZW50aGVzaXN8aWRlb2dyYXBoLXNwYWNlfGlkZW9ncmFwaGljfGluYWN0aXZlfGluY2x1ZGUtcnVieXxpbmhlcml0fGluaXRpYWx8aW5saW5lLWJsb2NrfGlubGluZS1ib3h8aW5saW5lLWxpbmUtaGVpZ2h0fGlubGluZS10YWJsZXxpbmxpbmV8aW5zZXR8aW5zaWRlfGludGVyLWlkZW9ncmFwaHxpbnRlci13b3JkfGludmVydHxpdGFsaWN8anVzdGlmeXxrYXRha2FuYS1pcm9oYXxrYXRha2FuYXxrZWVwLWFsbHxsYXN0fGxlZnR8bGlnaHRlcnxsaW5lLWVkZ2V8bGluZS10aHJvdWdofGxpbmV8bGluZWFyfGxpc3QtaXRlbXxsb2NhbHxsb29zZXxsb3dlci1hbHBoYXxsb3dlci1ncmVla3xsb3dlci1sYXRpbnxsb3dlci1yb21hbnxsb3dlcmNhc2V8bHItdGJ8bHRyfG1hdGhlbWF0aWNhbHxtYXgtaGVpZ2h0fG1heC1zaXplfG1lZGl1bXxtZW51fG1lc3NhZ2UtYm94fG1pZGRsZXxtb3ZlfG4tcmVzaXplfG5lLXJlc2l6ZXxuZXdzcGFwZXJ8bm8tY2hhbmdlfG5vLWNsb3NlLXF1b3RlfG5vLWRyb3B8bm8tb3Blbi1xdW90ZXxuby1yZXBlYXR8bm9uZXxub3JtYWx8bm90LWFsbG93ZWR8bm93cmFwfG53LXJlc2l6ZXxvYmxpcXVlfG9wZW4tcXVvdGV8b3V0c2V0fG91dHNpZGV8b3ZlcmxpbmV8cGFkZGluZy1ib3h8cGFnZXxwb2ludGVyfHByZS1saW5lfHByZS13cmFwfHByZXxwcmVzZXJ2ZS0zZHxwcm9ncmVzc3xyZWxhdGl2ZXxyZXBlYXQteHxyZXBlYXQteXxyZXBlYXR8cmVwbGFjZWR8cmVzZXQtc2l6ZXxyaWRnZXxyaWdodHxyb3VuZHxyb3ctcmVzaXplfHJ0bHxzLXJlc2l6ZXxzY3JvbGx8c2UtcmVzaXplfHNlcGFyYXRlfHNsaWNlfHNtYWxsLWNhcHN8c21hbGwtY2FwdGlvbnxzb2xpZHxzcGFjZXxzcXVhcmV8c3RhcnR8c3RhdGljfHN0YXR1cy1iYXJ8c3RlcC1lbmR8c3RlcC1zdGFydHxzdGVwc3xzdHJldGNofHN0cmljdHxzdWJ8c3VwZXJ8c3ctcmVzaXplfHRhYmxlLWNhcHRpb258dGFibGUtY2VsbHx0YWJsZS1jb2x1bW4tZ3JvdXB8dGFibGUtY29sdW1ufHRhYmxlLWZvb3Rlci1ncm91cHx0YWJsZS1oZWFkZXItZ3JvdXB8dGFibGUtcm93LWdyb3VwfHRhYmxlLXJvd3x0YWJsZXx0Yi1ybHx0ZXh0LWFmdGVyLWVkZ2V8dGV4dC1iZWZvcmUtZWRnZXx0ZXh0LWJvdHRvbXx0ZXh0LXNpemV8dGV4dC10b3B8dGV4dHx0aGlja3x0aGlufHRyYW5zcGFyZW50fHVuZGVybGluZXx1cHBlci1hbHBoYXx1cHBlci1sYXRpbnx1cHBlci1yb21hbnx1cHBlcmNhc2V8dXNlLXNjcmlwdHx2ZXJ0aWNhbC1pZGVvZ3JhcGhpY3x2ZXJ0aWNhbC10ZXh0fHZpc2libGV8dy1yZXNpemV8d2FpdHx3aGl0ZXNwYWNlfHotaW5kZXh8emVyb3x6b29tXCI7XG52YXIgc3VwcG9ydENvbnN0YW50Q29sb3IgPSBleHBvcnRzLnN1cHBvcnRDb25zdGFudENvbG9yID0gXCJhbGljZWJsdWV8YW50aXF1ZXdoaXRlfGFxdWF8YXF1YW1hcmluZXxhenVyZXxiZWlnZXxiaXNxdWV8YmxhY2t8YmxhbmNoZWRhbG1vbmR8Ymx1ZXxibHVldmlvbGV0fGJyb3dufGJ1cmx5d29vZHxjYWRldGJsdWV8Y2hhcnRyZXVzZXxjaG9jb2xhdGV8Y29yYWx8Y29ybmZsb3dlcmJsdWV8Y29ybnNpbGt8Y3JpbXNvbnxjeWFufGRhcmtibHVlfGRhcmtjeWFufGRhcmtnb2xkZW5yb2R8ZGFya2dyYXl8ZGFya2dyZWVufGRhcmtncmV5fGRhcmtraGFraXxkYXJrbWFnZW50YXxkYXJrb2xpdmVncmVlbnxkYXJrb3JhbmdlfGRhcmtvcmNoaWR8ZGFya3JlZHxkYXJrc2FsbW9ufGRhcmtzZWFncmVlbnxkYXJrc2xhdGVibHVlfGRhcmtzbGF0ZWdyYXl8ZGFya3NsYXRlZ3JleXxkYXJrdHVycXVvaXNlfGRhcmt2aW9sZXR8ZGVlcHBpbmt8ZGVlcHNreWJsdWV8ZGltZ3JheXxkaW1ncmV5fGRvZGdlcmJsdWV8ZmlyZWJyaWNrfGZsb3JhbHdoaXRlfGZvcmVzdGdyZWVufGZ1Y2hzaWF8Z2FpbnNib3JvfGdob3N0d2hpdGV8Z29sZHxnb2xkZW5yb2R8Z3JheXxncmVlbnxncmVlbnllbGxvd3xncmV5fGhvbmV5ZGV3fGhvdHBpbmt8aW5kaWFucmVkfGluZGlnb3xpdm9yeXxraGFraXxsYXZlbmRlcnxsYXZlbmRlcmJsdXNofGxhd25ncmVlbnxsZW1vbmNoaWZmb258bGlnaHRibHVlfGxpZ2h0Y29yYWx8bGlnaHRjeWFufGxpZ2h0Z29sZGVucm9keWVsbG93fGxpZ2h0Z3JheXxsaWdodGdyZWVufGxpZ2h0Z3JleXxsaWdodHBpbmt8bGlnaHRzYWxtb258bGlnaHRzZWFncmVlbnxsaWdodHNreWJsdWV8bGlnaHRzbGF0ZWdyYXl8bGlnaHRzbGF0ZWdyZXl8bGlnaHRzdGVlbGJsdWV8bGlnaHR5ZWxsb3d8bGltZXxsaW1lZ3JlZW58bGluZW58bWFnZW50YXxtYXJvb258bWVkaXVtYXF1YW1hcmluZXxtZWRpdW1ibHVlfG1lZGl1bW9yY2hpZHxtZWRpdW1wdXJwbGV8bWVkaXVtc2VhZ3JlZW58bWVkaXVtc2xhdGVibHVlfG1lZGl1bXNwcmluZ2dyZWVufG1lZGl1bXR1cnF1b2lzZXxtZWRpdW12aW9sZXRyZWR8bWlkbmlnaHRibHVlfG1pbnRjcmVhbXxtaXN0eXJvc2V8bW9jY2FzaW58bmF2YWpvd2hpdGV8bmF2eXxvbGRsYWNlfG9saXZlfG9saXZlZHJhYnxvcmFuZ2V8b3JhbmdlcmVkfG9yY2hpZHxwYWxlZ29sZGVucm9kfHBhbGVncmVlbnxwYWxldHVycXVvaXNlfHBhbGV2aW9sZXRyZWR8cGFwYXlhd2hpcHxwZWFjaHB1ZmZ8cGVydXxwaW5rfHBsdW18cG93ZGVyYmx1ZXxwdXJwbGV8cmViZWNjYXB1cnBsZXxyZWR8cm9zeWJyb3dufHJveWFsYmx1ZXxzYWRkbGVicm93bnxzYWxtb258c2FuZHlicm93bnxzZWFncmVlbnxzZWFzaGVsbHxzaWVubmF8c2lsdmVyfHNreWJsdWV8c2xhdGVibHVlfHNsYXRlZ3JheXxzbGF0ZWdyZXl8c25vd3xzcHJpbmdncmVlbnxzdGVlbGJsdWV8dGFufHRlYWx8dGhpc3RsZXx0b21hdG98dHVycXVvaXNlfHZpb2xldHx3aGVhdHx3aGl0ZXx3aGl0ZXNtb2tlfHllbGxvd3x5ZWxsb3dncmVlblwiO1xudmFyIHN1cHBvcnRDb25zdGFudEZvbnRzID0gZXhwb3J0cy5zdXBwb3J0Q29uc3RhbnRGb250cyA9IFwiYXJpYWx8Y2VudHVyeXxjb21pY3xjb3VyaWVyfGN1cnNpdmV8ZmFudGFzeXxnYXJhbW9uZHxnZW9yZ2lhfGhlbHZldGljYXxpbXBhY3R8bHVjaWRhfHN5bWJvbHxzeXN0ZW18dGFob21hfHRpbWVzfHRyZWJ1Y2hldHx1dG9waWF8dmVyZGFuYXx3ZWJkaW5nc3xzYW5zLXNlcmlmfHNlcmlmfG1vbm9zcGFjZVwiO1xuXG52YXIgbnVtUmUgPSBleHBvcnRzLm51bVJlID0gXCJcXFxcLT8oPzooPzpbMC05XSsoPzpcXFxcLlswLTldKyk/KXwoPzpcXFxcLlswLTldKykpXCI7XG52YXIgcHNldWRvRWxlbWVudHMgPSBleHBvcnRzLnBzZXVkb0VsZW1lbnRzID0gXCIoXFxcXDorKVxcXFxiKGFmdGVyfGJlZm9yZXxmaXJzdC1sZXR0ZXJ8Zmlyc3QtbGluZXxtb3otc2VsZWN0aW9ufHNlbGVjdGlvbilcXFxcYlwiO1xudmFyIHBzZXVkb0NsYXNzZXMgID0gZXhwb3J0cy5wc2V1ZG9DbGFzc2VzID0gIFwiKDopXFxcXGIoYWN0aXZlfGNoZWNrZWR8ZGlzYWJsZWR8ZW1wdHl8ZW5hYmxlZHxmaXJzdC1jaGlsZHxmaXJzdC1vZi10eXBlfGZvY3VzfGhvdmVyfGluZGV0ZXJtaW5hdGV8aW52YWxpZHxsYXN0LWNoaWxkfGxhc3Qtb2YtdHlwZXxsaW5rfG5vdHxudGgtY2hpbGR8bnRoLWxhc3QtY2hpbGR8bnRoLWxhc3Qtb2YtdHlwZXxudGgtb2YtdHlwZXxvbmx5LWNoaWxkfG9ubHktb2YtdHlwZXxyZXF1aXJlZHxyb290fHRhcmdldHx2YWxpZHx2aXNpdGVkKVxcXFxiXCI7XG5cbnZhciBDc3NIaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIGtleXdvcmRNYXBwZXIgPSB0aGlzLmNyZWF0ZUtleXdvcmRNYXBwZXIoe1xuICAgICAgICBcInN1cHBvcnQuZnVuY3Rpb25cIjogc3VwcG9ydEZ1bmN0aW9uLFxuICAgICAgICBcInN1cHBvcnQuY29uc3RhbnRcIjogc3VwcG9ydENvbnN0YW50LFxuICAgICAgICBcInN1cHBvcnQudHlwZVwiOiBzdXBwb3J0VHlwZSxcbiAgICAgICAgXCJzdXBwb3J0LmNvbnN0YW50LmNvbG9yXCI6IHN1cHBvcnRDb25zdGFudENvbG9yLFxuICAgICAgICBcInN1cHBvcnQuY29uc3RhbnQuZm9udHNcIjogc3VwcG9ydENvbnN0YW50Rm9udHNcbiAgICB9LCBcInRleHRcIiwgdHJ1ZSk7XG5cbiAgICAvLyByZWdleHAgbXVzdCBub3QgaGF2ZSBjYXB0dXJpbmcgcGFyZW50aGVzZXMuIFVzZSAoPzopIGluc3RlYWQuXG4gICAgLy8gcmVnZXhwcyBhcmUgb3JkZXJlZCAtPiB0aGUgZmlyc3QgbWF0Y2ggaXMgdXNlZFxuXG4gICAgdGhpcy4kcnVsZXMgPSB7XG4gICAgICAgIFwic3RhcnRcIiA6IFt7XG4gICAgICAgICAgICBpbmNsdWRlIDogW1wic3RyaW5nc1wiLCBcInVybFwiLCBcImNvbW1lbnRzXCJdXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInBhcmVuLmxwYXJlblwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiXFxcXHtcIixcbiAgICAgICAgICAgIG5leHQ6ICBcInJ1bGVzZXRcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJwYXJlbi5ycGFyZW5cIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFx9XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nXCIsXG4gICAgICAgICAgICByZWdleDogXCJAKD8hdmlld3BvcnQpXCIsXG4gICAgICAgICAgICBuZXh0OiAgXCJtZWRpYVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcImtleXdvcmRcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIiNbYS16MC05LV9dK1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcImtleXdvcmRcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIiVcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJ2YXJpYWJsZVwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiXFxcXC5bYS16MC05LV9dK1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgcmVnZXg6IFwiOlthLXowLTktX10rXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIixcbiAgICAgICAgICAgIHJlZ2V4IDogbnVtUmVcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnRcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIlthLXowLTktX10rXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2FzZUluc2Vuc2l0aXZlOiB0cnVlXG4gICAgICAgIH1dLFxuXG4gICAgICAgIFwibWVkaWFcIjogW3tcbiAgICAgICAgICAgIGluY2x1ZGUgOiBbXCJzdHJpbmdzXCIsIFwidXJsXCIsIFwiY29tbWVudHNcIl1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwicGFyZW4ubHBhcmVuXCIsXG4gICAgICAgICAgICByZWdleDogXCJcXFxce1wiLFxuICAgICAgICAgICAgbmV4dDogIFwic3RhcnRcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJwYXJlbi5ycGFyZW5cIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFx9XCIsXG4gICAgICAgICAgICBuZXh0OiAgXCJzdGFydFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgcmVnZXg6IFwiO1wiLFxuICAgICAgICAgICAgbmV4dDogIFwic3RhcnRcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJrZXl3b3JkXCIsXG4gICAgICAgICAgICByZWdleDogXCIoPzptZWRpYXxzdXBwb3J0c3xkb2N1bWVudHxjaGFyc2V0fGltcG9ydHxuYW1lc3BhY2V8bWVkaWF8c3VwcG9ydHN8ZG9jdW1lbnRcIlxuICAgICAgICAgICAgICAgICsgXCJ8cGFnZXxmb250fGtleWZyYW1lc3x2aWV3cG9ydHxjb3VudGVyLXN0eWxlfGZvbnQtZmVhdHVyZS12YWx1ZXNcIlxuICAgICAgICAgICAgICAgICsgXCJ8c3dhc2h8b3JuYW1lbnRzfGFubm90YXRpb258c3R5bGlzdGljfHN0eWxlc2V0fGNoYXJhY3Rlci12YXJpYW50KVwiXG4gICAgICAgIH1dLFxuXG4gICAgICAgIFwiY29tbWVudHNcIiA6IFt7XG4gICAgICAgICAgICB0b2tlbjogXCJjb21tZW50XCIsIC8vIG11bHRpIGxpbmUgY29tbWVudFxuICAgICAgICAgICAgcmVnZXg6IFwiXFxcXC9cXFxcKlwiLFxuICAgICAgICAgICAgcHVzaDogW3tcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcKlxcXFwvXCIsXG4gICAgICAgICAgICAgICAgbmV4dCA6IFwicG9wXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW4gOiBcImNvbW1lbnRcIlxuICAgICAgICAgICAgfV1cbiAgICAgICAgfV0sXG5cbiAgICAgICAgXCJydWxlc2V0XCIgOiBbe1xuICAgICAgICAgICAgcmVnZXggOiBcIi0od2Via2l0fG1zfG1venxvKS1cIixcbiAgICAgICAgICAgIHRva2VuIDogXCJ0ZXh0XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInB1bmN0dWF0aW9uLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiWzo7XVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJwYXJlbi5ycGFyZW5cIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcfVwiLFxuICAgICAgICAgICAgbmV4dCA6IFwic3RhcnRcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpbmNsdWRlIDogW1wic3RyaW5nc1wiLCBcInVybFwiLCBcImNvbW1lbnRzXCJdXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogW1wiY29uc3RhbnQubnVtZXJpY1wiLCBcImtleXdvcmRcIl0sXG4gICAgICAgICAgICByZWdleCA6IFwiKFwiICsgbnVtUmUgKyBcIikoY2h8Y218ZGVnfGVtfGV4fGZyfGdkfGdyYWR8SHp8aW58a0h6fG1tfG1zfHBjfHB0fHB4fHJhZHxyZW18c3x0dXJufHZofHZtYXh8dm1pbnx2bXx2d3wlKVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5udW1lcmljXCIsXG4gICAgICAgICAgICByZWdleCA6IG51bVJlXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5udW1lcmljXCIsICAvLyBoZXg2IGNvbG9yXG4gICAgICAgICAgICByZWdleCA6IFwiI1thLWYwLTldezZ9XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIiwgLy8gaGV4MyBjb2xvclxuICAgICAgICAgICAgcmVnZXggOiBcIiNbYS1mMC05XXszfVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogW1wicHVuY3R1YXRpb25cIiwgXCJlbnRpdHkub3RoZXIuYXR0cmlidXRlLW5hbWUucHNldWRvLWVsZW1lbnQuY3NzXCJdLFxuICAgICAgICAgICAgcmVnZXggOiBwc2V1ZG9FbGVtZW50c1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFtcInB1bmN0dWF0aW9uXCIsIFwiZW50aXR5Lm90aGVyLmF0dHJpYnV0ZS1uYW1lLnBzZXVkby1jbGFzcy5jc3NcIl0sXG4gICAgICAgICAgICByZWdleCA6IHBzZXVkb0NsYXNzZXNcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaW5jbHVkZTogXCJ1cmxcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IGtleXdvcmRNYXBwZXIsXG4gICAgICAgICAgICByZWdleCA6IFwiXFxcXC0/W2EtekEtWl9dW2EtekEtWjAtOV9cXFxcLV0qXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2FzZUluc2Vuc2l0aXZlOiB0cnVlXG4gICAgICAgIH1dLFxuXG4gICAgICAgIHVybDogW3tcbiAgICAgICAgICAgIHRva2VuIDogXCJzdXBwb3J0LmZ1bmN0aW9uXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiKD86dXJsKDo/LXByZWZpeCk/fGRvbWFpbnxyZWdleHApXFxcXChcIixcbiAgICAgICAgICAgIHB1c2g6IFt7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN1cHBvcnQuZnVuY3Rpb25cIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXClcIixcbiAgICAgICAgICAgICAgICBuZXh0IDogXCJwb3BcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzdHJpbmdcIlxuICAgICAgICAgICAgfV1cbiAgICAgICAgfV0sXG5cbiAgICAgICAgc3RyaW5nczogW3tcbiAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmcuc3RhcnRcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCInXCIsXG4gICAgICAgICAgICBwdXNoIDogW3tcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nLmVuZFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCInfCRcIixcbiAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaW5jbHVkZSA6IFwiZXNjYXBlc1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogL1xcXFwkLyxcbiAgICAgICAgICAgICAgICBjb25zdW1lTGluZUVuZDogdHJ1ZVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzdHJpbmdcIlxuICAgICAgICAgICAgfV1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZy5zdGFydFwiLFxuICAgICAgICAgICAgcmVnZXggOiAnXCInLFxuICAgICAgICAgICAgcHVzaCA6IFt7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZy5lbmRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6ICdcInwkJyxcbiAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaW5jbHVkZSA6IFwiZXNjYXBlc1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogL1xcXFwkLyxcbiAgICAgICAgICAgICAgICBjb25zdW1lTGluZUVuZDogdHJ1ZVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzdHJpbmdcIlxuICAgICAgICAgICAgfV1cbiAgICAgICAgfV0sXG4gICAgICAgIGVzY2FwZXM6IFt7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCIsXG4gICAgICAgICAgICByZWdleCA6IC9cXFxcKFthLWZBLUZcXGRdezEsNn18W15hLWZBLUZcXGRdKS9cbiAgICAgICAgfV1cblxuICAgIH07XG5cbiAgICB0aGlzLm5vcm1hbGl6ZVJ1bGVzKCk7XG59O1xuXG5vb3AuaW5oZXJpdHMoQ3NzSGlnaGxpZ2h0UnVsZXMsIFRleHRIaWdobGlnaHRSdWxlcyk7XG5cbmV4cG9ydHMuQ3NzSGlnaGxpZ2h0UnVsZXMgPSBDc3NIaWdobGlnaHRSdWxlcztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uLy4uL2xpYi9vb3BcIik7XG52YXIgQmFzZUZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZF9tb2RlXCIpLkZvbGRNb2RlO1xudmFyIFJhbmdlID0gcmVxdWlyZShcIi4uLy4uL3JhbmdlXCIpLlJhbmdlO1xuXG52YXIgRm9sZE1vZGUgPSBleHBvcnRzLkZvbGRNb2RlID0gZnVuY3Rpb24oKSB7fTtcbm9vcC5pbmhlcml0cyhGb2xkTW9kZSwgQmFzZUZvbGRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuY29tbWVudEJsb2NrID0gZnVuY3Rpb24oc2Vzc2lvbiwgcm93KSB7XG4gICAgICAgIHZhciByZSA9IC9cXFMvO1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICB2YXIgc3RhcnRMZXZlbCA9IGxpbmUuc2VhcmNoKHJlKTtcbiAgICAgICAgaWYgKHN0YXJ0TGV2ZWwgPT0gLTEgfHwgbGluZVtzdGFydExldmVsXSAhPSBcIiNcIilcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB2YXIgc3RhcnRDb2x1bW4gPSBsaW5lLmxlbmd0aDtcbiAgICAgICAgdmFyIG1heFJvdyA9IHNlc3Npb24uZ2V0TGVuZ3RoKCk7XG4gICAgICAgIHZhciBzdGFydFJvdyA9IHJvdztcbiAgICAgICAgdmFyIGVuZFJvdyA9IHJvdztcblxuICAgICAgICB3aGlsZSAoKytyb3cgPCBtYXhSb3cpIHtcbiAgICAgICAgICAgIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgICAgIHZhciBsZXZlbCA9IGxpbmUuc2VhcmNoKHJlKTtcblxuICAgICAgICAgICAgaWYgKGxldmVsID09IC0xKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICBpZiAobGluZVtsZXZlbF0gIT0gXCIjXCIpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGVuZFJvdyA9IHJvdztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbmRSb3cgPiBzdGFydFJvdykge1xuICAgICAgICAgICAgdmFyIGVuZENvbHVtbiA9IHNlc3Npb24uZ2V0TGluZShlbmRSb3cpLmxlbmd0aDtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmFuZ2Uoc3RhcnRSb3csIHN0YXJ0Q29sdW1uLCBlbmRSb3csIGVuZENvbHVtbik7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0UmFuZ2UgPSBmdW5jdGlvbihzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdykge1xuICAgICAgICB2YXIgcmFuZ2UgPSB0aGlzLmluZGVudGF0aW9uQmxvY2soc2Vzc2lvbiwgcm93KTtcbiAgICAgICAgaWYgKHJhbmdlKVxuICAgICAgICAgICAgcmV0dXJuIHJhbmdlO1xuXG4gICAgICAgIHJhbmdlID0gdGhpcy5jb21tZW50QmxvY2soc2Vzc2lvbiwgcm93KTtcbiAgICAgICAgaWYgKHJhbmdlKVxuICAgICAgICAgICAgcmV0dXJuIHJhbmdlO1xuICAgIH07XG5cbiAgICAvLyBtdXN0IHJldHVybiBcIlwiIGlmIHRoZXJlJ3Mgbm8gZm9sZCwgdG8gZW5hYmxlIGNhY2hpbmdcbiAgICB0aGlzLmdldEZvbGRXaWRnZXQgPSBmdW5jdGlvbihzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdykge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICB2YXIgaW5kZW50ID0gbGluZS5zZWFyY2goL1xcUy8pO1xuICAgICAgICB2YXIgbmV4dCA9IHNlc3Npb24uZ2V0TGluZShyb3cgKyAxKTtcbiAgICAgICAgdmFyIHByZXYgPSBzZXNzaW9uLmdldExpbmUocm93IC0gMSk7XG4gICAgICAgIHZhciBwcmV2SW5kZW50ID0gcHJldi5zZWFyY2goL1xcUy8pO1xuICAgICAgICB2YXIgbmV4dEluZGVudCA9IG5leHQuc2VhcmNoKC9cXFMvKTtcblxuICAgICAgICBpZiAoaW5kZW50ID09IC0xKSB7XG4gICAgICAgICAgICBzZXNzaW9uLmZvbGRXaWRnZXRzW3JvdyAtIDFdID0gcHJldkluZGVudCE9IC0xICYmIHByZXZJbmRlbnQgPCBuZXh0SW5kZW50ID8gXCJzdGFydFwiIDogXCJcIjtcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZG9jdW1lbnRhdGlvbiBjb21tZW50c1xuICAgICAgICBpZiAocHJldkluZGVudCA9PSAtMSkge1xuICAgICAgICAgICAgaWYgKGluZGVudCA9PSBuZXh0SW5kZW50ICYmIGxpbmVbaW5kZW50XSA9PSBcIiNcIiAmJiBuZXh0W2luZGVudF0gPT0gXCIjXCIpIHtcbiAgICAgICAgICAgICAgICBzZXNzaW9uLmZvbGRXaWRnZXRzW3JvdyAtIDFdID0gXCJcIjtcbiAgICAgICAgICAgICAgICBzZXNzaW9uLmZvbGRXaWRnZXRzW3JvdyArIDFdID0gXCJcIjtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJzdGFydFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHByZXZJbmRlbnQgPT0gaW5kZW50ICYmIGxpbmVbaW5kZW50XSA9PSBcIiNcIiAmJiBwcmV2W2luZGVudF0gPT0gXCIjXCIpIHtcbiAgICAgICAgICAgIGlmIChzZXNzaW9uLmdldExpbmUocm93IC0gMikuc2VhcmNoKC9cXFMvKSA9PSAtMSkge1xuICAgICAgICAgICAgICAgIHNlc3Npb24uZm9sZFdpZGdldHNbcm93IC0gMV0gPSBcInN0YXJ0XCI7XG4gICAgICAgICAgICAgICAgc2Vzc2lvbi5mb2xkV2lkZ2V0c1tyb3cgKyAxXSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJldkluZGVudCE9IC0xICYmIHByZXZJbmRlbnQgPCBpbmRlbnQpXG4gICAgICAgICAgICBzZXNzaW9uLmZvbGRXaWRnZXRzW3JvdyAtIDFdID0gXCJzdGFydFwiO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBzZXNzaW9uLmZvbGRXaWRnZXRzW3JvdyAtIDFdID0gXCJcIjtcblxuICAgICAgICBpZiAoaW5kZW50IDwgbmV4dEluZGVudClcbiAgICAgICAgICAgIHJldHVybiBcInN0YXJ0XCI7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgIH07XG5cbn0pLmNhbGwoRm9sZE1vZGUucHJvdG90eXBlKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dE1vZGUgPSByZXF1aXJlKFwiLi90ZXh0XCIpLk1vZGU7XG52YXIgU2Fzc0hpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vc2Fzc19oaWdobGlnaHRfcnVsZXNcIikuU2Fzc0hpZ2hsaWdodFJ1bGVzO1xudmFyIEZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZGluZy9jb2ZmZWVcIikuRm9sZE1vZGU7XG5cbnZhciBNb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5IaWdobGlnaHRSdWxlcyA9IFNhc3NIaWdobGlnaHRSdWxlcztcbiAgICB0aGlzLmZvbGRpbmdSdWxlcyA9IG5ldyBGb2xkTW9kZSgpO1xuICAgIHRoaXMuJGJlaGF2aW91ciA9IHRoaXMuJGRlZmF1bHRCZWhhdmlvdXI7XG59O1xub29wLmluaGVyaXRzKE1vZGUsIFRleHRNb2RlKTtcblxuKGZ1bmN0aW9uKCkgeyAgIFxuICAgIHRoaXMubGluZUNvbW1lbnRTdGFydCA9IFwiLy9cIjtcbiAgICB0aGlzLiRpZCA9IFwiYWNlL21vZGUvc2Fzc1wiO1xufSkuY2FsbChNb2RlLnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTW9kZSA9IE1vZGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIGxhbmcgPSByZXF1aXJlKFwiLi4vbGliL2xhbmdcIik7XG52YXIgU2Nzc0hpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vc2Nzc19oaWdobGlnaHRfcnVsZXNcIikuU2Nzc0hpZ2hsaWdodFJ1bGVzO1xuXG52YXIgU2Fzc0hpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24oKSB7XG4gICAgU2Nzc0hpZ2hsaWdodFJ1bGVzLmNhbGwodGhpcyk7XG4gICAgdmFyIHN0YXJ0ID0gdGhpcy4kcnVsZXMuc3RhcnQ7XG4gICAgaWYgKHN0YXJ0WzFdLnRva2VuID09IFwiY29tbWVudFwiKSB7XG4gICAgICAgIHN0YXJ0LnNwbGljZSgxLCAxLCB7XG4gICAgICAgICAgICBvbk1hdGNoOiBmdW5jdGlvbih2YWx1ZSwgY3VycmVudFN0YXRlLCBzdGFjaykge1xuICAgICAgICAgICAgICAgIHN0YWNrLnVuc2hpZnQodGhpcy5uZXh0LCAtMSwgdmFsdWUubGVuZ3RoIC0gMiwgY3VycmVudFN0YXRlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJjb21tZW50XCI7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVnZXg6IC9eXFxzKlxcL1xcKi8sXG4gICAgICAgICAgICBuZXh0OiBcImNvbW1lbnRcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJlcnJvci5pbnZhbGlkXCIsXG4gICAgICAgICAgICByZWdleDogXCIvXFxcXCp8W3s7fV1cIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJzdXBwb3J0LnR5cGVcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXlxccyo6W1xcd1xcLV0rXFxzL1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuJHJ1bGVzLmNvbW1lbnQgPSBbXG4gICAgICAgICAgICB7cmVnZXg6IC9eXFxzKi8sIG9uTWF0Y2g6IGZ1bmN0aW9uKHZhbHVlLCBjdXJyZW50U3RhdGUsIHN0YWNrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN0YWNrWzFdID09PSAtMSlcbiAgICAgICAgICAgICAgICAgICAgc3RhY2tbMV0gPSBNYXRoLm1heChzdGFja1syXSwgdmFsdWUubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCA8PSBzdGFja1sxXSkge1xuICAgICAgICAgICAgICAgICAgICAvKnNoaWZ0M3gqL3N0YWNrLnNoaWZ0KCk7c3RhY2suc2hpZnQoKTtzdGFjay5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHQgPSBzdGFjay5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJ0ZXh0XCI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0ID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiY29tbWVudFwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIG5leHQ6IFwic3RhcnRcIn0sXG4gICAgICAgICAgICB7ZGVmYXVsdFRva2VuOiBcImNvbW1lbnRcIn1cbiAgICAgICAgXTtcbiAgICB9XG59O1xuXG5vb3AuaW5oZXJpdHMoU2Fzc0hpZ2hsaWdodFJ1bGVzLCBTY3NzSGlnaGxpZ2h0UnVsZXMpO1xuXG5leHBvcnRzLlNhc3NIaWdobGlnaHRSdWxlcyA9IFNhc3NIaWdobGlnaHRSdWxlcztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgbGFuZyA9IHJlcXVpcmUoXCIuLi9saWIvbGFuZ1wiKTtcbnZhciBUZXh0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90ZXh0X2hpZ2hsaWdodF9ydWxlc1wiKS5UZXh0SGlnaGxpZ2h0UnVsZXM7XG52YXIgQ3NzSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9jc3NfaGlnaGxpZ2h0X3J1bGVzXCIpO1xuXG52YXIgU2Nzc0hpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24oKSB7XG4gICAgXG4gICAgdmFyIHByb3BlcnRpZXMgPSBsYW5nLmFycmF5VG9NYXAoQ3NzSGlnaGxpZ2h0UnVsZXMuc3VwcG9ydFR5cGUuc3BsaXQoXCJ8XCIpKTtcblxuICAgIHZhciBmdW5jdGlvbnMgPSBsYW5nLmFycmF5VG9NYXAoXG4gICAgICAgIChcImhzbHxoc2xhfHJnYnxyZ2JhfHVybHxhdHRyfGNvdW50ZXJ8Y291bnRlcnN8YWJzfGFkanVzdF9jb2xvcnxhZGp1c3RfaHVlfFwiICtcbiAgICAgICAgIFwiYWxwaGF8am9pbnxibHVlfGNlaWx8Y2hhbmdlX2NvbG9yfGNvbXBhcmFibGV8Y29tcGxlbWVudHxkYXJrZW58ZGVzYXR1cmF0ZXxcIiArIFxuICAgICAgICAgXCJmbG9vcnxncmF5c2NhbGV8Z3JlZW58aHVlfGlmfGludmVydHxqb2lufGxlbmd0aHxsaWdodGVufGxpZ2h0bmVzc3xtaXh8XCIgKyBcbiAgICAgICAgIFwibnRofG9wYWNpZnl8b3BhY2l0eXxwZXJjZW50YWdlfHF1b3RlfHJlZHxyb3VuZHxzYXR1cmF0ZXxzYXR1cmF0aW9ufFwiICtcbiAgICAgICAgIFwic2NhbGVfY29sb3J8dHJhbnNwYXJlbnRpemV8dHlwZV9vZnx1bml0fHVuaXRsZXNzfHVucXVvdGVcIikuc3BsaXQoXCJ8XCIpXG4gICAgKTtcblxuICAgIHZhciBjb25zdGFudHMgPSBsYW5nLmFycmF5VG9NYXAoQ3NzSGlnaGxpZ2h0UnVsZXMuc3VwcG9ydENvbnN0YW50LnNwbGl0KFwifFwiKSk7XG5cbiAgICB2YXIgY29sb3JzID0gbGFuZy5hcnJheVRvTWFwKENzc0hpZ2hsaWdodFJ1bGVzLnN1cHBvcnRDb25zdGFudENvbG9yLnNwbGl0KFwifFwiKSk7XG4gICAgXG4gICAgdmFyIGtleXdvcmRzID0gbGFuZy5hcnJheVRvTWFwKFxuICAgICAgICAoXCJAbWl4aW58QGV4dGVuZHxAaW5jbHVkZXxAaW1wb3J0fEBtZWRpYXxAZGVidWd8QHdhcm58QGlmfEBmb3J8QGVhY2h8QHdoaWxlfEBlbHNlfEBmb250LWZhY2V8QC13ZWJraXQta2V5ZnJhbWVzfGlmfGFuZHwhZGVmYXVsdHxtb2R1bGV8ZGVmfGVuZHxkZWNsYXJlXCIpLnNwbGl0KFwifFwiKVxuICAgICk7XG4gICAgXG4gICAgdmFyIHRhZ3MgPSBsYW5nLmFycmF5VG9NYXAoXG4gICAgICAgIChcImF8YWJicnxhY3JvbnltfGFkZHJlc3N8YXBwbGV0fGFyZWF8YXJ0aWNsZXxhc2lkZXxhdWRpb3xifGJhc2V8YmFzZWZvbnR8YmRvfFwiICsgXG4gICAgICAgICBcImJpZ3xibG9ja3F1b3RlfGJvZHl8YnJ8YnV0dG9ufGNhbnZhc3xjYXB0aW9ufGNlbnRlcnxjaXRlfGNvZGV8Y29sfGNvbGdyb3VwfFwiICsgXG4gICAgICAgICBcImNvbW1hbmR8ZGF0YWxpc3R8ZGR8ZGVsfGRldGFpbHN8ZGZufGRpcnxkaXZ8ZGx8ZHR8ZW18ZW1iZWR8ZmllbGRzZXR8XCIgKyBcbiAgICAgICAgIFwiZmlnY2FwdGlvbnxmaWd1cmV8Zm9udHxmb290ZXJ8Zm9ybXxmcmFtZXxmcmFtZXNldHxoMXxoMnxoM3xoNHxoNXxoNnxoZWFkfFwiICsgXG4gICAgICAgICBcImhlYWRlcnxoZ3JvdXB8aHJ8aHRtbHxpfGlmcmFtZXxpbWd8aW5wdXR8aW5zfGtleWdlbnxrYmR8bGFiZWx8bGVnZW5kfGxpfFwiICsgXG4gICAgICAgICBcImxpbmt8bWFwfG1hcmt8bWVudXxtZXRhfG1ldGVyfG5hdnxub2ZyYW1lc3xub3NjcmlwdHxvYmplY3R8b2x8b3B0Z3JvdXB8XCIgKyBcbiAgICAgICAgIFwib3B0aW9ufG91dHB1dHxwfHBhcmFtfHByZXxwcm9ncmVzc3xxfHJwfHJ0fHJ1Ynl8c3xzYW1wfHNjcmlwdHxzZWN0aW9ufHNlbGVjdHxcIiArIFxuICAgICAgICAgXCJzbWFsbHxzb3VyY2V8c3BhbnxzdHJpa2V8c3Ryb25nfHN0eWxlfHN1YnxzdW1tYXJ5fHN1cHx0YWJsZXx0Ym9keXx0ZHxcIiArIFxuICAgICAgICAgXCJ0ZXh0YXJlYXx0Zm9vdHx0aHx0aGVhZHx0aW1lfHRpdGxlfHRyfHR0fHV8dWx8dmFyfHZpZGVvfHdicnx4bXBcIikuc3BsaXQoXCJ8XCIpXG4gICAgKTtcblxuICAgIC8vIHJlZ2V4cCBtdXN0IG5vdCBoYXZlIGNhcHR1cmluZyBwYXJlbnRoZXNlcy4gVXNlICg/OikgaW5zdGVhZC5cbiAgICAvLyByZWdleHBzIGFyZSBvcmRlcmVkIC0+IHRoZSBmaXJzdCBtYXRjaCBpcyB1c2VkXG5cbiAgICB2YXIgbnVtUmUgPSBcIlxcXFwtPyg/Oig/OlswLTldKyl8KD86WzAtOV0qXFxcXC5bMC05XSspKVwiO1xuXG4gICAgLy8gcmVnZXhwIG11c3Qgbm90IGhhdmUgY2FwdHVyaW5nIHBhcmVudGhlc2VzLiBVc2UgKD86KSBpbnN0ZWFkLlxuICAgIC8vIHJlZ2V4cHMgYXJlIG9yZGVyZWQgLT4gdGhlIGZpcnN0IG1hdGNoIGlzIHVzZWRcblxuICAgIHRoaXMuJHJ1bGVzID0ge1xuICAgICAgICBcInN0YXJ0XCIgOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXC9cXFxcLy4qJFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsIC8vIG11bHRpIGxpbmUgY29tbWVudFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcL1xcXFwqXCIsXG4gICAgICAgICAgICAgICAgbmV4dCA6IFwiY29tbWVudFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLCAvLyBzaW5nbGUgbGluZVxuICAgICAgICAgICAgICAgIHJlZ2V4IDogJ1tcIl0oPzooPzpcXFxcXFxcXC4pfCg/OlteXCJcXFxcXFxcXF0pKSo/W1wiXSdcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsIC8vIG11bHRpIGxpbmUgc3RyaW5nIHN0YXJ0XG4gICAgICAgICAgICAgICAgcmVnZXggOiAnW1wiXS4qXFxcXFxcXFwkJyxcbiAgICAgICAgICAgICAgICBuZXh0IDogXCJxcXN0cmluZ1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLCAvLyBzaW5nbGUgbGluZVxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJbJ10oPzooPzpcXFxcXFxcXC4pfCg/OlteJ1xcXFxcXFxcXSkpKj9bJ11cIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIiwgLy8gbXVsdGkgbGluZSBzdHJpbmcgc3RhcnRcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiWyddLipcXFxcXFxcXCRcIixcbiAgICAgICAgICAgICAgICBuZXh0IDogXCJxc3RyaW5nXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogbnVtUmUgKyBcIig/OmNofGNtfGRlZ3xlbXxleHxmcnxnZHxncmFkfEh6fGlufGtIenxtbXxtc3xwY3xwdHxweHxyYWR8cmVtfHN8dHVybnx2aHx2bWF4fHZtaW58dm18dnd8JSlcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5udW1lcmljXCIsIC8vIGhleDYgY29sb3JcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiI1thLWYwLTldezZ9XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLCAvLyBoZXgzIGNvbG9yXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIiNbYS1mMC05XXszfVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IG51bVJlXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBbXCJzdXBwb3J0LmZ1bmN0aW9uXCIsIFwic3RyaW5nXCIsIFwic3VwcG9ydC5mdW5jdGlvblwiXSxcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiKHVybFxcXFwoKSguKikoXFxcXCkpXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KHZhbHVlLnRvTG93ZXJDYXNlKCkpKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwic3VwcG9ydC50eXBlXCI7XG4gICAgICAgICAgICAgICAgICAgIGlmIChrZXl3b3Jkcy5oYXNPd25Qcm9wZXJ0eSh2YWx1ZSkpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJrZXl3b3JkXCI7XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNvbnN0YW50cy5oYXNPd25Qcm9wZXJ0eSh2YWx1ZSkpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJjb25zdGFudC5sYW5ndWFnZVwiO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChmdW5jdGlvbnMuaGFzT3duUHJvcGVydHkodmFsdWUpKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwic3VwcG9ydC5mdW5jdGlvblwiO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChjb2xvcnMuaGFzT3duUHJvcGVydHkodmFsdWUudG9Mb3dlckNhc2UoKSkpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJzdXBwb3J0LmNvbnN0YW50LmNvbG9yXCI7XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRhZ3MuaGFzT3duUHJvcGVydHkodmFsdWUudG9Mb3dlckNhc2UoKSkpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJ2YXJpYWJsZS5sYW5ndWFnZVwiO1xuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJ0ZXh0XCI7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXC0/W0BhLXpfXVtAYS16MC05X1xcXFwtXSpcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJ2YXJpYWJsZVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJbYS16X1xcXFwtJF1bYS16MC05X1xcXFwtJF0qXFxcXGJcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInZhcmlhYmxlLmxhbmd1YWdlXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiI1thLXowLTktX10rXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJ2YXJpYWJsZS5sYW5ndWFnZVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFwuW2EtejAtOS1fXStcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInZhcmlhYmxlLmxhbmd1YWdlXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiOlthLXowLTktX10rXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIlthLXowLTktX10rXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwia2V5d29yZC5vcGVyYXRvclwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCI8fD58PD18Pj18PT18IT18LXwlfCN8XFxcXCt8XFxcXCR8XFxcXCt8XFxcXCpcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJwYXJlbi5scGFyZW5cIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiW1soe11cIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJwYXJlbi5ycGFyZW5cIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiW1xcXFxdKX1dXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxccytcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGNhc2VJbnNlbnNpdGl2ZTogdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBcImNvbW1lbnRcIiA6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudFwiLCAvLyBjbG9zaW5nIGNvbW1lbnRcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXCpcXFxcL1wiLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcInN0YXJ0XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW4gOiBcImNvbW1lbnRcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBcInFxc3RyaW5nXCIgOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogJyg/Oig/OlxcXFxcXFxcLil8KD86W15cIlxcXFxcXFxcXSkpKj9cIicsXG4gICAgICAgICAgICAgICAgbmV4dCA6IFwic3RhcnRcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICByZWdleCA6ICcuKydcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgXCJxc3RyaW5nXCIgOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIoPzooPzpcXFxcXFxcXC4pfCg/OlteJ1xcXFxcXFxcXSkpKj8nXCIsXG4gICAgICAgICAgICAgICAgbmV4dCA6IFwic3RhcnRcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICByZWdleCA6ICcuKydcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH07XG59O1xuXG5vb3AuaW5oZXJpdHMoU2Nzc0hpZ2hsaWdodFJ1bGVzLCBUZXh0SGlnaGxpZ2h0UnVsZXMpO1xuXG5leHBvcnRzLlNjc3NIaWdobGlnaHRSdWxlcyA9IFNjc3NIaWdobGlnaHRSdWxlcztcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==