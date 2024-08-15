"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[2007],{

/***/ 37028:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var Behaviour = (__webpack_require__(75684)/* .Behaviour */ .Q);
var CstyleBehaviour = (__webpack_require__(32589)/* .CstyleBehaviour */ ._);
var TokenIterator = (__webpack_require__(99339).TokenIterator);

var CssBehaviour = function () {

    this.inherit(CstyleBehaviour);

    this.add("colon", "insertion", function (state, action, editor, session, text) {
        if (text === ':' && editor.selection.isEmpty()) {
            var cursor = editor.getCursorPosition();
            var iterator = new TokenIterator(session, cursor.row, cursor.column);
            var token = iterator.getCurrentToken();
            if (token && token.value.match(/\s+/)) {
                token = iterator.stepBackward();
            }
            if (token && token.type === 'support.type') {
                var line = session.doc.getLine(cursor.row);
                var rightChar = line.substring(cursor.column, cursor.column + 1);
                if (rightChar === ':') {
                    return {
                       text: '',
                       selection: [1, 1]
                    };
                }
                if (/^(\s+[^;]|\s*$)/.test(line.substring(cursor.column))) {
                    return {
                       text: ':;',
                       selection: [1, 1]
                    };
                }
            }
        }
    });

    this.add("colon", "deletion", function (state, action, editor, session, range) {
        var selected = session.doc.getTextRange(range);
        if (!range.isMultiLine() && selected === ':') {
            var cursor = editor.getCursorPosition();
            var iterator = new TokenIterator(session, cursor.row, cursor.column);
            var token = iterator.getCurrentToken();
            if (token && token.value.match(/\s+/)) {
                token = iterator.stepBackward();
            }
            if (token && token.type === 'support.type') {
                var line = session.doc.getLine(range.start.row);
                var rightChar = line.substring(range.end.column, range.end.column + 1);
                if (rightChar === ';') {
                    range.end.column ++;
                    return range;
                }
            }
        }
    });

    this.add("semicolon", "insertion", function (state, action, editor, session, text) {
        if (text === ';' && editor.selection.isEmpty()) {
            var cursor = editor.getCursorPosition();
            var line = session.doc.getLine(cursor.row);
            var rightChar = line.substring(cursor.column, cursor.column + 1);
            if (rightChar === ';') {
                return {
                   text: '',
                   selection: [1, 1]
                };
            }
        }
    });

    this.add("!important", "insertion", function (state, action, editor, session, text) {
        if (text === '!' && editor.selection.isEmpty()) {
            var cursor = editor.getCursorPosition();
            var line = session.doc.getLine(cursor.row);

            if (/^\s*(;|}|$)/.test(line.substring(cursor.column))) {
                return {
                    text: '!important',
                    selection: [10, 10]
                };
            }
        }
    });

};
oop.inherits(CssBehaviour, CstyleBehaviour);

exports.r = CssBehaviour;


/***/ }),

/***/ 61952:
/***/ ((__unused_webpack_module, exports) => {



var propertyMap = {
    "background": {"#$0": 1},
    "background-color": {"#$0": 1, "transparent": 1, "fixed": 1},
    "background-image": {"url('/$0')": 1},
    "background-repeat": {"repeat": 1, "repeat-x": 1, "repeat-y": 1, "no-repeat": 1, "inherit": 1},
    "background-position": {"bottom":2, "center":2, "left":2, "right":2, "top":2, "inherit":2},
    "background-attachment": {"scroll": 1, "fixed": 1},
    "background-size": {"cover": 1, "contain": 1},
    "background-clip": {"border-box": 1, "padding-box": 1, "content-box": 1},
    "background-origin": {"border-box": 1, "padding-box": 1, "content-box": 1},
    "border": {"solid $0": 1, "dashed $0": 1, "dotted $0": 1, "#$0": 1},
    "border-color": {"#$0": 1},
    "border-style": {"solid":2, "dashed":2, "dotted":2, "double":2, "groove":2, "hidden":2, "inherit":2, "inset":2, "none":2, "outset":2, "ridged":2},
    "border-collapse": {"collapse": 1, "separate": 1},
    "bottom": {"px": 1, "em": 1, "%": 1},
    "clear": {"left": 1, "right": 1, "both": 1, "none": 1},
    "color": {"#$0": 1, "rgb(#$00,0,0)": 1},
    "cursor": {"default": 1, "pointer": 1, "move": 1, "text": 1, "wait": 1, "help": 1, "progress": 1, "n-resize": 1, "ne-resize": 1, "e-resize": 1, "se-resize": 1, "s-resize": 1, "sw-resize": 1, "w-resize": 1, "nw-resize": 1},
    "display": {"none": 1, "block": 1, "inline": 1, "inline-block": 1, "table-cell": 1},
    "empty-cells": {"show": 1, "hide": 1},
    "float": {"left": 1, "right": 1, "none": 1},
    "font-family": {"Arial":2,"Comic Sans MS":2,"Consolas":2,"Courier New":2,"Courier":2,"Georgia":2,"Monospace":2,"Sans-Serif":2, "Segoe UI":2,"Tahoma":2,"Times New Roman":2,"Trebuchet MS":2,"Verdana": 1},
    "font-size": {"px": 1, "em": 1, "%": 1},
    "font-weight": {"bold": 1, "normal": 1},
    "font-style": {"italic": 1, "normal": 1},
    "font-variant": {"normal": 1, "small-caps": 1},
    "height": {"px": 1, "em": 1, "%": 1},
    "left": {"px": 1, "em": 1, "%": 1},
    "letter-spacing": {"normal": 1},
    "line-height": {"normal": 1},
    "list-style-type": {"none": 1, "disc": 1, "circle": 1, "square": 1, "decimal": 1, "decimal-leading-zero": 1, "lower-roman": 1, "upper-roman": 1, "lower-greek": 1, "lower-latin": 1, "upper-latin": 1, "georgian": 1, "lower-alpha": 1, "upper-alpha": 1},
    "margin": {"px": 1, "em": 1, "%": 1},
    "margin-right": {"px": 1, "em": 1, "%": 1},
    "margin-left": {"px": 1, "em": 1, "%": 1},
    "margin-top": {"px": 1, "em": 1, "%": 1},
    "margin-bottom": {"px": 1, "em": 1, "%": 1},
    "max-height": {"px": 1, "em": 1, "%": 1},
    "max-width": {"px": 1, "em": 1, "%": 1},
    "min-height": {"px": 1, "em": 1, "%": 1},
    "min-width": {"px": 1, "em": 1, "%": 1},
    "overflow": {"hidden": 1, "visible": 1, "auto": 1, "scroll": 1},
    "overflow-x": {"hidden": 1, "visible": 1, "auto": 1, "scroll": 1},
    "overflow-y": {"hidden": 1, "visible": 1, "auto": 1, "scroll": 1},
    "padding": {"px": 1, "em": 1, "%": 1},
    "padding-top": {"px": 1, "em": 1, "%": 1},
    "padding-right": {"px": 1, "em": 1, "%": 1},
    "padding-bottom": {"px": 1, "em": 1, "%": 1},
    "padding-left": {"px": 1, "em": 1, "%": 1},
    "page-break-after": {"auto": 1, "always": 1, "avoid": 1, "left": 1, "right": 1},
    "page-break-before": {"auto": 1, "always": 1, "avoid": 1, "left": 1, "right": 1},
    "position": {"absolute": 1, "relative": 1, "fixed": 1, "static": 1},
    "right": {"px": 1, "em": 1, "%": 1},
    "table-layout": {"fixed": 1, "auto": 1},
    "text-decoration": {"none": 1, "underline": 1, "line-through": 1, "blink": 1},
    "text-align": {"left": 1, "right": 1, "center": 1, "justify": 1},
    "text-transform": {"capitalize": 1, "uppercase": 1, "lowercase": 1, "none": 1},
    "top": {"px": 1, "em": 1, "%": 1},
    "vertical-align": {"top": 1, "bottom": 1},
    "visibility": {"hidden": 1, "visible": 1},
    "white-space": {"nowrap": 1, "normal": 1, "pre": 1, "pre-line": 1, "pre-wrap": 1},
    "width": {"px": 1, "em": 1, "%": 1},
    "word-spacing": {"normal": 1},

    // opacity
    "filter": {"alpha(opacity=$0100)": 1},

    "text-shadow": {"$02px 2px 2px #777": 1},
    "text-overflow": {"ellipsis-word": 1, "clip": 1, "ellipsis": 1},

    // border radius
    "-moz-border-radius": 1,
    "-moz-border-radius-topright": 1,
    "-moz-border-radius-bottomright": 1,
    "-moz-border-radius-topleft": 1,
    "-moz-border-radius-bottomleft": 1,
    "-webkit-border-radius": 1,
    "-webkit-border-top-right-radius": 1,
    "-webkit-border-top-left-radius": 1,
    "-webkit-border-bottom-right-radius": 1,
    "-webkit-border-bottom-left-radius": 1,

    // dropshadows
    "-moz-box-shadow": 1,
    "-webkit-box-shadow": 1,

    // transformations
    "transform": {"rotate($00deg)": 1, "skew($00deg)": 1},
    "-moz-transform": {"rotate($00deg)": 1, "skew($00deg)": 1},
    "-webkit-transform": {"rotate($00deg)": 1, "skew($00deg)": 1 }
};

var CssCompletions = function() {

};

(function() {

    this.completionsDefined = false;

    this.defineCompletions = function() {
        //fill in missing properties
        if (document) {
            var style = document.createElement('c').style;

            for (var i in style) {
                if (typeof style[i] !== 'string')
                    continue;

                var name = i.replace(/[A-Z]/g, function(x) {
                    return '-' + x.toLowerCase();
                });

                if (!propertyMap.hasOwnProperty(name))
                    propertyMap[name] = 1;
            }
        }

        this.completionsDefined = true;
    };

    this.getCompletions = function(state, session, pos, prefix) {
        if (!this.completionsDefined) {
            this.defineCompletions();
        }

        if (state==='ruleset' || session.$mode.$id == "ace/mode/scss") {
            //css attribute value
            var line = session.getLine(pos.row).substr(0, pos.column);
            var inParens = /\([^)]*$/.test(line);
            if (inParens) {
                line = line.substr(line.lastIndexOf('(') + 1);
            }
            if (/:[^;]+$/.test(line)) {
                /([\w\-]+):[^:]*$/.test(line);

                return this.getPropertyValueCompletions(state, session, pos, prefix);
            } else {
                return this.getPropertyCompletions(state, session, pos, prefix, inParens);
            }
        }

        return [];
    };

    this.getPropertyCompletions = function(state, session, pos, prefix, skipSemicolon) {
        skipSemicolon = skipSemicolon || false;
        var properties = Object.keys(propertyMap);
        return properties.map(function(property){
            return {
                caption: property,
                snippet: property + ': $0' + (skipSemicolon ? '' : ';'),
                meta: "property",
                score: 1000000
            };
        });
    };

    this.getPropertyValueCompletions = function(state, session, pos, prefix) {
        var line = session.getLine(pos.row).substr(0, pos.column);
        var property = (/([\w\-]+):[^:]*$/.exec(line) || {})[1];

        if (!property)
            return [];
        var values = [];
        if (property in propertyMap && typeof propertyMap[property] === "object") {
            values = Object.keys(propertyMap[property]);
        }
        return values.map(function(value){
            return {
                caption: value,
                snippet: value,
                meta: "property value",
                score: 1000000
            };
        });
    };

}).call(CssCompletions.prototype);

exports.d = CssCompletions;


/***/ }),

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

/***/ 93887:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var Range = (__webpack_require__(91902)/* .Range */ .Q);
var BaseFoldMode = (__webpack_require__(51358).FoldMode);

var FoldMode = exports.l = function(commentRegex) {
    if (commentRegex) {
        this.foldingStartMarker = new RegExp(
            this.foldingStartMarker.source.replace(/\|[^|]*?$/, "|" + commentRegex.start)
        );
        this.foldingStopMarker = new RegExp(
            this.foldingStopMarker.source.replace(/\|[^|]*?$/, "|" + commentRegex.end)
        );
    }
};
oop.inherits(FoldMode, BaseFoldMode);

(function() {
    
    this.foldingStartMarker = /([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/;
    this.foldingStopMarker = /^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/;
    this.singleLineBlockCommentRe= /^\s*(\/\*).*\*\/\s*$/;
    this.tripleStarBlockCommentRe = /^\s*(\/\*\*\*).*\*\/\s*$/;
    this.startRegionRe = /^\s*(\/\*|\/\/)#?region\b/;
    
    //prevent naming conflict with any modes that inherit from cstyle and override this (like csharp)
    this._getFoldWidgetBase = this.getFoldWidget;
    
    /**
     * Gets fold widget with some non-standard extras:
     *
     * @example lineCommentRegionStart
     *      //#region [optional description]
     *
     * @example blockCommentRegionStart
     *      /*#region [optional description] *[/]
     *
     * @example tripleStarFoldingSection
     *      /*** this folds even though 1 line because it has 3 stars ***[/]
     * 
     * @note the pound symbol for region tags is optional
     */
    this.getFoldWidget = function(session, foldStyle, row) {
        var line = session.getLine(row);
    
        if (this.singleLineBlockCommentRe.test(line)) {
            // No widget for single line block comment unless region or triple star
            if (!this.startRegionRe.test(line) && !this.tripleStarBlockCommentRe.test(line))
                return "";
        }
    
        var fw = this._getFoldWidgetBase(session, foldStyle, row);
    
        if (!fw && this.startRegionRe.test(line))
            return "start"; // lineCommentRegionStart
    
        return fw;
    };

    this.getFoldWidgetRange = function(session, foldStyle, row, forceMultiline) {
        var line = session.getLine(row);
        
        if (this.startRegionRe.test(line))
            return this.getCommentRegionBlock(session, line, row);
        
        var match = line.match(this.foldingStartMarker);
        if (match) {
            var i = match.index;

            if (match[1])
                return this.openingBracketBlock(session, match[1], row, i);
                
            var range = session.getCommentFoldRange(row, i + match[0].length, 1);
            
            if (range && !range.isMultiLine()) {
                if (forceMultiline) {
                    range = this.getSectionRange(session, row);
                } else if (foldStyle != "all")
                    range = null;
            }
            
            return range;
        }

        if (foldStyle === "markbegin")
            return;

        var match = line.match(this.foldingStopMarker);
        if (match) {
            var i = match.index + match[0].length;

            if (match[1])
                return this.closingBracketBlock(session, match[1], row, i);

            return session.getCommentFoldRange(row, i, -1);
        }
    };
    
    this.getSectionRange = function(session, row) {
        var line = session.getLine(row);
        var startIndent = line.search(/\S/);
        var startRow = row;
        var startColumn = line.length;
        row = row + 1;
        var endRow = row;
        var maxRow = session.getLength();
        while (++row < maxRow) {
            line = session.getLine(row);
            var indent = line.search(/\S/);
            if (indent === -1)
                continue;
            if  (startIndent > indent)
                break;
            var subRange = this.getFoldWidgetRange(session, "all", row);
            
            if (subRange) {
                if (subRange.start.row <= startRow) {
                    break;
                } else if (subRange.isMultiLine()) {
                    row = subRange.end.row;
                } else if (startIndent == indent) {
                    break;
                }
            }
            endRow = row;
        }
        
        return new Range(startRow, startColumn, endRow, session.getLine(endRow).length);
    };
    
    /**
     * gets comment region block with end region assumed to be start of comment in any cstyle mode or SQL mode (--) which inherits from this.
     * There may optionally be a pound symbol before the region/endregion statement
     */
    this.getCommentRegionBlock = function(session, line, row) {
        var startColumn = line.search(/\s*$/);
        var maxRow = session.getLength();
        var startRow = row;
        
        var re = /^\s*(?:\/\*|\/\/|--)#?(end)?region\b/;
        var depth = 1;
        while (++row < maxRow) {
            line = session.getLine(row);
            var m = re.exec(line);
            if (!m) continue;
            if (m[1]) depth--;
            else depth++;

            if (!depth) break;
        }

        var endRow = row;
        if (endRow > startRow) {
            return new Range(startRow, startColumn, endRow, line.length);
        }
    };

}).call(FoldMode.prototype);


/***/ }),

/***/ 28670:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var Range = (__webpack_require__(91902)/* .Range */ .Q);

var MatchingBraceOutdent = function() {};

(function() {

    this.checkOutdent = function(line, input) {
        if (! /^\s+$/.test(line))
            return false;

        return /^\s*\}/.test(input);
    };

    this.autoOutdent = function(doc, row) {
        var line = doc.getLine(row);
        var match = line.match(/^(\s*\})/);

        if (!match) return 0;

        var column = match[1].length;
        var openBracePos = doc.findMatchingBracket({row: row, column: column});

        if (!openBracePos || openBracePos.row == row) return 0;

        var indent = this.$getIndent(doc.getLine(openBracePos.row));
        doc.replace(new Range(row, 0, row, column-1), indent);
    };

    this.$getIndent = function(line) {
        return line.match(/^\s*/)[0];
    };

}).call(MatchingBraceOutdent.prototype);

exports.MatchingBraceOutdent = MatchingBraceOutdent;


/***/ }),

/***/ 72007:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var ScssHighlightRules = (__webpack_require__(23124).ScssHighlightRules);
var MatchingBraceOutdent = (__webpack_require__(28670).MatchingBraceOutdent);
var CssBehaviour = (__webpack_require__(37028)/* .CssBehaviour */ .r);
var CStyleFoldMode = (__webpack_require__(93887)/* .FoldMode */ .l);
var CssCompletions = (__webpack_require__(61952)/* .CssCompletions */ .d);


var Mode = function() {
    this.HighlightRules = ScssHighlightRules;
    this.$outdent = new MatchingBraceOutdent();
    this.$behaviour = new CssBehaviour();
    this.$completer = new CssCompletions();
    this.foldingRules = new CStyleFoldMode();
};
oop.inherits(Mode, TextMode);

(function() {
   
    this.lineCommentStart = "//";
    this.blockComment = {start: "/*", end: "*/"};

    this.getNextLineIndent = function(state, line, tab) {
        var indent = this.$getIndent(line);

        // ignore braces in comments
        var tokens = this.getTokenizer().getLineTokens(line, state).tokens;
        if (tokens.length && tokens[tokens.length-1].type == "comment") {
            return indent;
        }

        var match = line.match(/^.*\{\s*$/);
        if (match) {
            indent += tab;
        }

        return indent;
    };

    this.checkOutdent = function(state, line, input) {
        return this.$outdent.checkOutdent(line, input);
    };

    this.autoOutdent = function(state, doc, row) {
        this.$outdent.autoOutdent(doc, row);
    };
    
    this.getCompletions = function(state, session, pos, prefix) {
        return this.$completer.getCompletions(state, session, pos, prefix);
    };


    this.$id = "ace/mode/scss";
}).call(Mode.prototype);

exports.Mode = Mode;


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsMEJBQTBCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9iZWhhdmlvdXIvY3NzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvY3NzX2NvbXBsZXRpb25zLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvY3NzX2hpZ2hsaWdodF9ydWxlcy5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2ZvbGRpbmcvY3N0eWxlLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvbWF0Y2hpbmdfYnJhY2Vfb3V0ZGVudC5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL3Njc3MuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9zY3NzX2hpZ2hsaWdodF9ydWxlcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi8uLi9saWIvb29wXCIpO1xudmFyIEJlaGF2aW91ciA9IHJlcXVpcmUoXCIuLi9iZWhhdmlvdXJcIikuQmVoYXZpb3VyO1xudmFyIENzdHlsZUJlaGF2aW91ciA9IHJlcXVpcmUoXCIuL2NzdHlsZVwiKS5Dc3R5bGVCZWhhdmlvdXI7XG52YXIgVG9rZW5JdGVyYXRvciA9IHJlcXVpcmUoXCIuLi8uLi90b2tlbl9pdGVyYXRvclwiKS5Ub2tlbkl0ZXJhdG9yO1xuXG52YXIgQ3NzQmVoYXZpb3VyID0gZnVuY3Rpb24gKCkge1xuXG4gICAgdGhpcy5pbmhlcml0KENzdHlsZUJlaGF2aW91cik7XG5cbiAgICB0aGlzLmFkZChcImNvbG9uXCIsIFwiaW5zZXJ0aW9uXCIsIGZ1bmN0aW9uIChzdGF0ZSwgYWN0aW9uLCBlZGl0b3IsIHNlc3Npb24sIHRleHQpIHtcbiAgICAgICAgaWYgKHRleHQgPT09ICc6JyAmJiBlZGl0b3Iuc2VsZWN0aW9uLmlzRW1wdHkoKSkge1xuICAgICAgICAgICAgdmFyIGN1cnNvciA9IGVkaXRvci5nZXRDdXJzb3JQb3NpdGlvbigpO1xuICAgICAgICAgICAgdmFyIGl0ZXJhdG9yID0gbmV3IFRva2VuSXRlcmF0b3Ioc2Vzc2lvbiwgY3Vyc29yLnJvdywgY3Vyc29yLmNvbHVtbik7XG4gICAgICAgICAgICB2YXIgdG9rZW4gPSBpdGVyYXRvci5nZXRDdXJyZW50VG9rZW4oKTtcbiAgICAgICAgICAgIGlmICh0b2tlbiAmJiB0b2tlbi52YWx1ZS5tYXRjaCgvXFxzKy8pKSB7XG4gICAgICAgICAgICAgICAgdG9rZW4gPSBpdGVyYXRvci5zdGVwQmFja3dhcmQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0b2tlbiAmJiB0b2tlbi50eXBlID09PSAnc3VwcG9ydC50eXBlJykge1xuICAgICAgICAgICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5kb2MuZ2V0TGluZShjdXJzb3Iucm93KTtcbiAgICAgICAgICAgICAgICB2YXIgcmlnaHRDaGFyID0gbGluZS5zdWJzdHJpbmcoY3Vyc29yLmNvbHVtbiwgY3Vyc29yLmNvbHVtbiArIDEpO1xuICAgICAgICAgICAgICAgIGlmIChyaWdodENoYXIgPT09ICc6Jykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uOiBbMSwgMV1cbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKC9eKFxccytbXjtdfFxccyokKS8udGVzdChsaW5lLnN1YnN0cmluZyhjdXJzb3IuY29sdW1uKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogJzo7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uOiBbMSwgMV1cbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuYWRkKFwiY29sb25cIiwgXCJkZWxldGlvblwiLCBmdW5jdGlvbiAoc3RhdGUsIGFjdGlvbiwgZWRpdG9yLCBzZXNzaW9uLCByYW5nZSkge1xuICAgICAgICB2YXIgc2VsZWN0ZWQgPSBzZXNzaW9uLmRvYy5nZXRUZXh0UmFuZ2UocmFuZ2UpO1xuICAgICAgICBpZiAoIXJhbmdlLmlzTXVsdGlMaW5lKCkgJiYgc2VsZWN0ZWQgPT09ICc6Jykge1xuICAgICAgICAgICAgdmFyIGN1cnNvciA9IGVkaXRvci5nZXRDdXJzb3JQb3NpdGlvbigpO1xuICAgICAgICAgICAgdmFyIGl0ZXJhdG9yID0gbmV3IFRva2VuSXRlcmF0b3Ioc2Vzc2lvbiwgY3Vyc29yLnJvdywgY3Vyc29yLmNvbHVtbik7XG4gICAgICAgICAgICB2YXIgdG9rZW4gPSBpdGVyYXRvci5nZXRDdXJyZW50VG9rZW4oKTtcbiAgICAgICAgICAgIGlmICh0b2tlbiAmJiB0b2tlbi52YWx1ZS5tYXRjaCgvXFxzKy8pKSB7XG4gICAgICAgICAgICAgICAgdG9rZW4gPSBpdGVyYXRvci5zdGVwQmFja3dhcmQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0b2tlbiAmJiB0b2tlbi50eXBlID09PSAnc3VwcG9ydC50eXBlJykge1xuICAgICAgICAgICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5kb2MuZ2V0TGluZShyYW5nZS5zdGFydC5yb3cpO1xuICAgICAgICAgICAgICAgIHZhciByaWdodENoYXIgPSBsaW5lLnN1YnN0cmluZyhyYW5nZS5lbmQuY29sdW1uLCByYW5nZS5lbmQuY29sdW1uICsgMSk7XG4gICAgICAgICAgICAgICAgaWYgKHJpZ2h0Q2hhciA9PT0gJzsnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJhbmdlLmVuZC5jb2x1bW4gKys7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByYW5nZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuYWRkKFwic2VtaWNvbG9uXCIsIFwiaW5zZXJ0aW9uXCIsIGZ1bmN0aW9uIChzdGF0ZSwgYWN0aW9uLCBlZGl0b3IsIHNlc3Npb24sIHRleHQpIHtcbiAgICAgICAgaWYgKHRleHQgPT09ICc7JyAmJiBlZGl0b3Iuc2VsZWN0aW9uLmlzRW1wdHkoKSkge1xuICAgICAgICAgICAgdmFyIGN1cnNvciA9IGVkaXRvci5nZXRDdXJzb3JQb3NpdGlvbigpO1xuICAgICAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmRvYy5nZXRMaW5lKGN1cnNvci5yb3cpO1xuICAgICAgICAgICAgdmFyIHJpZ2h0Q2hhciA9IGxpbmUuc3Vic3RyaW5nKGN1cnNvci5jb2x1bW4sIGN1cnNvci5jb2x1bW4gKyAxKTtcbiAgICAgICAgICAgIGlmIChyaWdodENoYXIgPT09ICc7Jykge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgdGV4dDogJycsXG4gICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uOiBbMSwgMV1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLmFkZChcIiFpbXBvcnRhbnRcIiwgXCJpbnNlcnRpb25cIiwgZnVuY3Rpb24gKHN0YXRlLCBhY3Rpb24sIGVkaXRvciwgc2Vzc2lvbiwgdGV4dCkge1xuICAgICAgICBpZiAodGV4dCA9PT0gJyEnICYmIGVkaXRvci5zZWxlY3Rpb24uaXNFbXB0eSgpKSB7XG4gICAgICAgICAgICB2YXIgY3Vyc29yID0gZWRpdG9yLmdldEN1cnNvclBvc2l0aW9uKCk7XG4gICAgICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZG9jLmdldExpbmUoY3Vyc29yLnJvdyk7XG5cbiAgICAgICAgICAgIGlmICgvXlxccyooO3x9fCQpLy50ZXN0KGxpbmUuc3Vic3RyaW5nKGN1cnNvci5jb2x1bW4pKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICchaW1wb3J0YW50JyxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uOiBbMTAsIDEwXVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxufTtcbm9vcC5pbmhlcml0cyhDc3NCZWhhdmlvdXIsIENzdHlsZUJlaGF2aW91cik7XG5cbmV4cG9ydHMuQ3NzQmVoYXZpb3VyID0gQ3NzQmVoYXZpb3VyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBwcm9wZXJ0eU1hcCA9IHtcbiAgICBcImJhY2tncm91bmRcIjoge1wiIyQwXCI6IDF9LFxuICAgIFwiYmFja2dyb3VuZC1jb2xvclwiOiB7XCIjJDBcIjogMSwgXCJ0cmFuc3BhcmVudFwiOiAxLCBcImZpeGVkXCI6IDF9LFxuICAgIFwiYmFja2dyb3VuZC1pbWFnZVwiOiB7XCJ1cmwoJy8kMCcpXCI6IDF9LFxuICAgIFwiYmFja2dyb3VuZC1yZXBlYXRcIjoge1wicmVwZWF0XCI6IDEsIFwicmVwZWF0LXhcIjogMSwgXCJyZXBlYXQteVwiOiAxLCBcIm5vLXJlcGVhdFwiOiAxLCBcImluaGVyaXRcIjogMX0sXG4gICAgXCJiYWNrZ3JvdW5kLXBvc2l0aW9uXCI6IHtcImJvdHRvbVwiOjIsIFwiY2VudGVyXCI6MiwgXCJsZWZ0XCI6MiwgXCJyaWdodFwiOjIsIFwidG9wXCI6MiwgXCJpbmhlcml0XCI6Mn0sXG4gICAgXCJiYWNrZ3JvdW5kLWF0dGFjaG1lbnRcIjoge1wic2Nyb2xsXCI6IDEsIFwiZml4ZWRcIjogMX0sXG4gICAgXCJiYWNrZ3JvdW5kLXNpemVcIjoge1wiY292ZXJcIjogMSwgXCJjb250YWluXCI6IDF9LFxuICAgIFwiYmFja2dyb3VuZC1jbGlwXCI6IHtcImJvcmRlci1ib3hcIjogMSwgXCJwYWRkaW5nLWJveFwiOiAxLCBcImNvbnRlbnQtYm94XCI6IDF9LFxuICAgIFwiYmFja2dyb3VuZC1vcmlnaW5cIjoge1wiYm9yZGVyLWJveFwiOiAxLCBcInBhZGRpbmctYm94XCI6IDEsIFwiY29udGVudC1ib3hcIjogMX0sXG4gICAgXCJib3JkZXJcIjoge1wic29saWQgJDBcIjogMSwgXCJkYXNoZWQgJDBcIjogMSwgXCJkb3R0ZWQgJDBcIjogMSwgXCIjJDBcIjogMX0sXG4gICAgXCJib3JkZXItY29sb3JcIjoge1wiIyQwXCI6IDF9LFxuICAgIFwiYm9yZGVyLXN0eWxlXCI6IHtcInNvbGlkXCI6MiwgXCJkYXNoZWRcIjoyLCBcImRvdHRlZFwiOjIsIFwiZG91YmxlXCI6MiwgXCJncm9vdmVcIjoyLCBcImhpZGRlblwiOjIsIFwiaW5oZXJpdFwiOjIsIFwiaW5zZXRcIjoyLCBcIm5vbmVcIjoyLCBcIm91dHNldFwiOjIsIFwicmlkZ2VkXCI6Mn0sXG4gICAgXCJib3JkZXItY29sbGFwc2VcIjoge1wiY29sbGFwc2VcIjogMSwgXCJzZXBhcmF0ZVwiOiAxfSxcbiAgICBcImJvdHRvbVwiOiB7XCJweFwiOiAxLCBcImVtXCI6IDEsIFwiJVwiOiAxfSxcbiAgICBcImNsZWFyXCI6IHtcImxlZnRcIjogMSwgXCJyaWdodFwiOiAxLCBcImJvdGhcIjogMSwgXCJub25lXCI6IDF9LFxuICAgIFwiY29sb3JcIjoge1wiIyQwXCI6IDEsIFwicmdiKCMkMDAsMCwwKVwiOiAxfSxcbiAgICBcImN1cnNvclwiOiB7XCJkZWZhdWx0XCI6IDEsIFwicG9pbnRlclwiOiAxLCBcIm1vdmVcIjogMSwgXCJ0ZXh0XCI6IDEsIFwid2FpdFwiOiAxLCBcImhlbHBcIjogMSwgXCJwcm9ncmVzc1wiOiAxLCBcIm4tcmVzaXplXCI6IDEsIFwibmUtcmVzaXplXCI6IDEsIFwiZS1yZXNpemVcIjogMSwgXCJzZS1yZXNpemVcIjogMSwgXCJzLXJlc2l6ZVwiOiAxLCBcInN3LXJlc2l6ZVwiOiAxLCBcInctcmVzaXplXCI6IDEsIFwibnctcmVzaXplXCI6IDF9LFxuICAgIFwiZGlzcGxheVwiOiB7XCJub25lXCI6IDEsIFwiYmxvY2tcIjogMSwgXCJpbmxpbmVcIjogMSwgXCJpbmxpbmUtYmxvY2tcIjogMSwgXCJ0YWJsZS1jZWxsXCI6IDF9LFxuICAgIFwiZW1wdHktY2VsbHNcIjoge1wic2hvd1wiOiAxLCBcImhpZGVcIjogMX0sXG4gICAgXCJmbG9hdFwiOiB7XCJsZWZ0XCI6IDEsIFwicmlnaHRcIjogMSwgXCJub25lXCI6IDF9LFxuICAgIFwiZm9udC1mYW1pbHlcIjoge1wiQXJpYWxcIjoyLFwiQ29taWMgU2FucyBNU1wiOjIsXCJDb25zb2xhc1wiOjIsXCJDb3VyaWVyIE5ld1wiOjIsXCJDb3VyaWVyXCI6MixcIkdlb3JnaWFcIjoyLFwiTW9ub3NwYWNlXCI6MixcIlNhbnMtU2VyaWZcIjoyLCBcIlNlZ29lIFVJXCI6MixcIlRhaG9tYVwiOjIsXCJUaW1lcyBOZXcgUm9tYW5cIjoyLFwiVHJlYnVjaGV0IE1TXCI6MixcIlZlcmRhbmFcIjogMX0sXG4gICAgXCJmb250LXNpemVcIjoge1wicHhcIjogMSwgXCJlbVwiOiAxLCBcIiVcIjogMX0sXG4gICAgXCJmb250LXdlaWdodFwiOiB7XCJib2xkXCI6IDEsIFwibm9ybWFsXCI6IDF9LFxuICAgIFwiZm9udC1zdHlsZVwiOiB7XCJpdGFsaWNcIjogMSwgXCJub3JtYWxcIjogMX0sXG4gICAgXCJmb250LXZhcmlhbnRcIjoge1wibm9ybWFsXCI6IDEsIFwic21hbGwtY2Fwc1wiOiAxfSxcbiAgICBcImhlaWdodFwiOiB7XCJweFwiOiAxLCBcImVtXCI6IDEsIFwiJVwiOiAxfSxcbiAgICBcImxlZnRcIjoge1wicHhcIjogMSwgXCJlbVwiOiAxLCBcIiVcIjogMX0sXG4gICAgXCJsZXR0ZXItc3BhY2luZ1wiOiB7XCJub3JtYWxcIjogMX0sXG4gICAgXCJsaW5lLWhlaWdodFwiOiB7XCJub3JtYWxcIjogMX0sXG4gICAgXCJsaXN0LXN0eWxlLXR5cGVcIjoge1wibm9uZVwiOiAxLCBcImRpc2NcIjogMSwgXCJjaXJjbGVcIjogMSwgXCJzcXVhcmVcIjogMSwgXCJkZWNpbWFsXCI6IDEsIFwiZGVjaW1hbC1sZWFkaW5nLXplcm9cIjogMSwgXCJsb3dlci1yb21hblwiOiAxLCBcInVwcGVyLXJvbWFuXCI6IDEsIFwibG93ZXItZ3JlZWtcIjogMSwgXCJsb3dlci1sYXRpblwiOiAxLCBcInVwcGVyLWxhdGluXCI6IDEsIFwiZ2VvcmdpYW5cIjogMSwgXCJsb3dlci1hbHBoYVwiOiAxLCBcInVwcGVyLWFscGhhXCI6IDF9LFxuICAgIFwibWFyZ2luXCI6IHtcInB4XCI6IDEsIFwiZW1cIjogMSwgXCIlXCI6IDF9LFxuICAgIFwibWFyZ2luLXJpZ2h0XCI6IHtcInB4XCI6IDEsIFwiZW1cIjogMSwgXCIlXCI6IDF9LFxuICAgIFwibWFyZ2luLWxlZnRcIjoge1wicHhcIjogMSwgXCJlbVwiOiAxLCBcIiVcIjogMX0sXG4gICAgXCJtYXJnaW4tdG9wXCI6IHtcInB4XCI6IDEsIFwiZW1cIjogMSwgXCIlXCI6IDF9LFxuICAgIFwibWFyZ2luLWJvdHRvbVwiOiB7XCJweFwiOiAxLCBcImVtXCI6IDEsIFwiJVwiOiAxfSxcbiAgICBcIm1heC1oZWlnaHRcIjoge1wicHhcIjogMSwgXCJlbVwiOiAxLCBcIiVcIjogMX0sXG4gICAgXCJtYXgtd2lkdGhcIjoge1wicHhcIjogMSwgXCJlbVwiOiAxLCBcIiVcIjogMX0sXG4gICAgXCJtaW4taGVpZ2h0XCI6IHtcInB4XCI6IDEsIFwiZW1cIjogMSwgXCIlXCI6IDF9LFxuICAgIFwibWluLXdpZHRoXCI6IHtcInB4XCI6IDEsIFwiZW1cIjogMSwgXCIlXCI6IDF9LFxuICAgIFwib3ZlcmZsb3dcIjoge1wiaGlkZGVuXCI6IDEsIFwidmlzaWJsZVwiOiAxLCBcImF1dG9cIjogMSwgXCJzY3JvbGxcIjogMX0sXG4gICAgXCJvdmVyZmxvdy14XCI6IHtcImhpZGRlblwiOiAxLCBcInZpc2libGVcIjogMSwgXCJhdXRvXCI6IDEsIFwic2Nyb2xsXCI6IDF9LFxuICAgIFwib3ZlcmZsb3cteVwiOiB7XCJoaWRkZW5cIjogMSwgXCJ2aXNpYmxlXCI6IDEsIFwiYXV0b1wiOiAxLCBcInNjcm9sbFwiOiAxfSxcbiAgICBcInBhZGRpbmdcIjoge1wicHhcIjogMSwgXCJlbVwiOiAxLCBcIiVcIjogMX0sXG4gICAgXCJwYWRkaW5nLXRvcFwiOiB7XCJweFwiOiAxLCBcImVtXCI6IDEsIFwiJVwiOiAxfSxcbiAgICBcInBhZGRpbmctcmlnaHRcIjoge1wicHhcIjogMSwgXCJlbVwiOiAxLCBcIiVcIjogMX0sXG4gICAgXCJwYWRkaW5nLWJvdHRvbVwiOiB7XCJweFwiOiAxLCBcImVtXCI6IDEsIFwiJVwiOiAxfSxcbiAgICBcInBhZGRpbmctbGVmdFwiOiB7XCJweFwiOiAxLCBcImVtXCI6IDEsIFwiJVwiOiAxfSxcbiAgICBcInBhZ2UtYnJlYWstYWZ0ZXJcIjoge1wiYXV0b1wiOiAxLCBcImFsd2F5c1wiOiAxLCBcImF2b2lkXCI6IDEsIFwibGVmdFwiOiAxLCBcInJpZ2h0XCI6IDF9LFxuICAgIFwicGFnZS1icmVhay1iZWZvcmVcIjoge1wiYXV0b1wiOiAxLCBcImFsd2F5c1wiOiAxLCBcImF2b2lkXCI6IDEsIFwibGVmdFwiOiAxLCBcInJpZ2h0XCI6IDF9LFxuICAgIFwicG9zaXRpb25cIjoge1wiYWJzb2x1dGVcIjogMSwgXCJyZWxhdGl2ZVwiOiAxLCBcImZpeGVkXCI6IDEsIFwic3RhdGljXCI6IDF9LFxuICAgIFwicmlnaHRcIjoge1wicHhcIjogMSwgXCJlbVwiOiAxLCBcIiVcIjogMX0sXG4gICAgXCJ0YWJsZS1sYXlvdXRcIjoge1wiZml4ZWRcIjogMSwgXCJhdXRvXCI6IDF9LFxuICAgIFwidGV4dC1kZWNvcmF0aW9uXCI6IHtcIm5vbmVcIjogMSwgXCJ1bmRlcmxpbmVcIjogMSwgXCJsaW5lLXRocm91Z2hcIjogMSwgXCJibGlua1wiOiAxfSxcbiAgICBcInRleHQtYWxpZ25cIjoge1wibGVmdFwiOiAxLCBcInJpZ2h0XCI6IDEsIFwiY2VudGVyXCI6IDEsIFwianVzdGlmeVwiOiAxfSxcbiAgICBcInRleHQtdHJhbnNmb3JtXCI6IHtcImNhcGl0YWxpemVcIjogMSwgXCJ1cHBlcmNhc2VcIjogMSwgXCJsb3dlcmNhc2VcIjogMSwgXCJub25lXCI6IDF9LFxuICAgIFwidG9wXCI6IHtcInB4XCI6IDEsIFwiZW1cIjogMSwgXCIlXCI6IDF9LFxuICAgIFwidmVydGljYWwtYWxpZ25cIjoge1widG9wXCI6IDEsIFwiYm90dG9tXCI6IDF9LFxuICAgIFwidmlzaWJpbGl0eVwiOiB7XCJoaWRkZW5cIjogMSwgXCJ2aXNpYmxlXCI6IDF9LFxuICAgIFwid2hpdGUtc3BhY2VcIjoge1wibm93cmFwXCI6IDEsIFwibm9ybWFsXCI6IDEsIFwicHJlXCI6IDEsIFwicHJlLWxpbmVcIjogMSwgXCJwcmUtd3JhcFwiOiAxfSxcbiAgICBcIndpZHRoXCI6IHtcInB4XCI6IDEsIFwiZW1cIjogMSwgXCIlXCI6IDF9LFxuICAgIFwid29yZC1zcGFjaW5nXCI6IHtcIm5vcm1hbFwiOiAxfSxcblxuICAgIC8vIG9wYWNpdHlcbiAgICBcImZpbHRlclwiOiB7XCJhbHBoYShvcGFjaXR5PSQwMTAwKVwiOiAxfSxcblxuICAgIFwidGV4dC1zaGFkb3dcIjoge1wiJDAycHggMnB4IDJweCAjNzc3XCI6IDF9LFxuICAgIFwidGV4dC1vdmVyZmxvd1wiOiB7XCJlbGxpcHNpcy13b3JkXCI6IDEsIFwiY2xpcFwiOiAxLCBcImVsbGlwc2lzXCI6IDF9LFxuXG4gICAgLy8gYm9yZGVyIHJhZGl1c1xuICAgIFwiLW1vei1ib3JkZXItcmFkaXVzXCI6IDEsXG4gICAgXCItbW96LWJvcmRlci1yYWRpdXMtdG9wcmlnaHRcIjogMSxcbiAgICBcIi1tb3otYm9yZGVyLXJhZGl1cy1ib3R0b21yaWdodFwiOiAxLFxuICAgIFwiLW1vei1ib3JkZXItcmFkaXVzLXRvcGxlZnRcIjogMSxcbiAgICBcIi1tb3otYm9yZGVyLXJhZGl1cy1ib3R0b21sZWZ0XCI6IDEsXG4gICAgXCItd2Via2l0LWJvcmRlci1yYWRpdXNcIjogMSxcbiAgICBcIi13ZWJraXQtYm9yZGVyLXRvcC1yaWdodC1yYWRpdXNcIjogMSxcbiAgICBcIi13ZWJraXQtYm9yZGVyLXRvcC1sZWZ0LXJhZGl1c1wiOiAxLFxuICAgIFwiLXdlYmtpdC1ib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1c1wiOiAxLFxuICAgIFwiLXdlYmtpdC1ib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzXCI6IDEsXG5cbiAgICAvLyBkcm9wc2hhZG93c1xuICAgIFwiLW1vei1ib3gtc2hhZG93XCI6IDEsXG4gICAgXCItd2Via2l0LWJveC1zaGFkb3dcIjogMSxcblxuICAgIC8vIHRyYW5zZm9ybWF0aW9uc1xuICAgIFwidHJhbnNmb3JtXCI6IHtcInJvdGF0ZSgkMDBkZWcpXCI6IDEsIFwic2tldygkMDBkZWcpXCI6IDF9LFxuICAgIFwiLW1vei10cmFuc2Zvcm1cIjoge1wicm90YXRlKCQwMGRlZylcIjogMSwgXCJza2V3KCQwMGRlZylcIjogMX0sXG4gICAgXCItd2Via2l0LXRyYW5zZm9ybVwiOiB7XCJyb3RhdGUoJDAwZGVnKVwiOiAxLCBcInNrZXcoJDAwZGVnKVwiOiAxIH1cbn07XG5cbnZhciBDc3NDb21wbGV0aW9ucyA9IGZ1bmN0aW9uKCkge1xuXG59O1xuXG4oZnVuY3Rpb24oKSB7XG5cbiAgICB0aGlzLmNvbXBsZXRpb25zRGVmaW5lZCA9IGZhbHNlO1xuXG4gICAgdGhpcy5kZWZpbmVDb21wbGV0aW9ucyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAvL2ZpbGwgaW4gbWlzc2luZyBwcm9wZXJ0aWVzXG4gICAgICAgIGlmIChkb2N1bWVudCkge1xuICAgICAgICAgICAgdmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYycpLnN0eWxlO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIHN0eWxlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzdHlsZVtpXSAhPT0gJ3N0cmluZycpXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICAgICAgdmFyIG5hbWUgPSBpLnJlcGxhY2UoL1tBLVpdL2csIGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICctJyArIHgudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGlmICghcHJvcGVydHlNYXAuaGFzT3duUHJvcGVydHkobmFtZSkpXG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnR5TWFwW25hbWVdID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY29tcGxldGlvbnNEZWZpbmVkID0gdHJ1ZTtcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRDb21wbGV0aW9ucyA9IGZ1bmN0aW9uKHN0YXRlLCBzZXNzaW9uLCBwb3MsIHByZWZpeCkge1xuICAgICAgICBpZiAoIXRoaXMuY29tcGxldGlvbnNEZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmRlZmluZUNvbXBsZXRpb25zKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RhdGU9PT0ncnVsZXNldCcgfHwgc2Vzc2lvbi4kbW9kZS4kaWQgPT0gXCJhY2UvbW9kZS9zY3NzXCIpIHtcbiAgICAgICAgICAgIC8vY3NzIGF0dHJpYnV0ZSB2YWx1ZVxuICAgICAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocG9zLnJvdykuc3Vic3RyKDAsIHBvcy5jb2x1bW4pO1xuICAgICAgICAgICAgdmFyIGluUGFyZW5zID0gL1xcKFteKV0qJC8udGVzdChsaW5lKTtcbiAgICAgICAgICAgIGlmIChpblBhcmVucykge1xuICAgICAgICAgICAgICAgIGxpbmUgPSBsaW5lLnN1YnN0cihsaW5lLmxhc3RJbmRleE9mKCcoJykgKyAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgvOlteO10rJC8udGVzdChsaW5lKSkge1xuICAgICAgICAgICAgICAgIC8oW1xcd1xcLV0rKTpbXjpdKiQvLnRlc3QobGluZSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRQcm9wZXJ0eVZhbHVlQ29tcGxldGlvbnMoc3RhdGUsIHNlc3Npb24sIHBvcywgcHJlZml4KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UHJvcGVydHlDb21wbGV0aW9ucyhzdGF0ZSwgc2Vzc2lvbiwgcG9zLCBwcmVmaXgsIGluUGFyZW5zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBbXTtcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRQcm9wZXJ0eUNvbXBsZXRpb25zID0gZnVuY3Rpb24oc3RhdGUsIHNlc3Npb24sIHBvcywgcHJlZml4LCBza2lwU2VtaWNvbG9uKSB7XG4gICAgICAgIHNraXBTZW1pY29sb24gPSBza2lwU2VtaWNvbG9uIHx8IGZhbHNlO1xuICAgICAgICB2YXIgcHJvcGVydGllcyA9IE9iamVjdC5rZXlzKHByb3BlcnR5TWFwKTtcbiAgICAgICAgcmV0dXJuIHByb3BlcnRpZXMubWFwKGZ1bmN0aW9uKHByb3BlcnR5KXtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgY2FwdGlvbjogcHJvcGVydHksXG4gICAgICAgICAgICAgICAgc25pcHBldDogcHJvcGVydHkgKyAnOiAkMCcgKyAoc2tpcFNlbWljb2xvbiA/ICcnIDogJzsnKSxcbiAgICAgICAgICAgICAgICBtZXRhOiBcInByb3BlcnR5XCIsXG4gICAgICAgICAgICAgICAgc2NvcmU6IDEwMDAwMDBcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLmdldFByb3BlcnR5VmFsdWVDb21wbGV0aW9ucyA9IGZ1bmN0aW9uKHN0YXRlLCBzZXNzaW9uLCBwb3MsIHByZWZpeCkge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShwb3Mucm93KS5zdWJzdHIoMCwgcG9zLmNvbHVtbik7XG4gICAgICAgIHZhciBwcm9wZXJ0eSA9ICgvKFtcXHdcXC1dKyk6W146XSokLy5leGVjKGxpbmUpIHx8IHt9KVsxXTtcblxuICAgICAgICBpZiAoIXByb3BlcnR5KVxuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB2YXIgdmFsdWVzID0gW107XG4gICAgICAgIGlmIChwcm9wZXJ0eSBpbiBwcm9wZXJ0eU1hcCAmJiB0eXBlb2YgcHJvcGVydHlNYXBbcHJvcGVydHldID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICB2YWx1ZXMgPSBPYmplY3Qua2V5cyhwcm9wZXJ0eU1hcFtwcm9wZXJ0eV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZXMubWFwKGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgY2FwdGlvbjogdmFsdWUsXG4gICAgICAgICAgICAgICAgc25pcHBldDogdmFsdWUsXG4gICAgICAgICAgICAgICAgbWV0YTogXCJwcm9wZXJ0eSB2YWx1ZVwiLFxuICAgICAgICAgICAgICAgIHNjb3JlOiAxMDAwMDAwXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9O1xuXG59KS5jYWxsKENzc0NvbXBsZXRpb25zLnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuQ3NzQ29tcGxldGlvbnMgPSBDc3NDb21wbGV0aW9ucztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgbGFuZyA9IHJlcXVpcmUoXCIuLi9saWIvbGFuZ1wiKTtcbnZhciBUZXh0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90ZXh0X2hpZ2hsaWdodF9ydWxlc1wiKS5UZXh0SGlnaGxpZ2h0UnVsZXM7XG5cblxuLyogRXhwb3J0cyBhcmUgZm9yIFN0eWx1cyBhbmQgTGVzcyBoaWdobGlnaHRlcnMgKi9cbnZhciBzdXBwb3J0VHlwZSA9IGV4cG9ydHMuc3VwcG9ydFR5cGUgPSBcImFsaWduLWNvbnRlbnR8YWxpZ24taXRlbXN8YWxpZ24tc2VsZnxhbGx8YW5pbWF0aW9ufGFuaW1hdGlvbi1kZWxheXxhbmltYXRpb24tZGlyZWN0aW9ufGFuaW1hdGlvbi1kdXJhdGlvbnxhbmltYXRpb24tZmlsbC1tb2RlfGFuaW1hdGlvbi1pdGVyYXRpb24tY291bnR8YW5pbWF0aW9uLW5hbWV8YW5pbWF0aW9uLXBsYXktc3RhdGV8YW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbnxiYWNrZmFjZS12aXNpYmlsaXR5fGJhY2tncm91bmR8YmFja2dyb3VuZC1hdHRhY2htZW50fGJhY2tncm91bmQtYmxlbmQtbW9kZXxiYWNrZ3JvdW5kLWNsaXB8YmFja2dyb3VuZC1jb2xvcnxiYWNrZ3JvdW5kLWltYWdlfGJhY2tncm91bmQtb3JpZ2lufGJhY2tncm91bmQtcG9zaXRpb258YmFja2dyb3VuZC1yZXBlYXR8YmFja2dyb3VuZC1zaXplfGJvcmRlcnxib3JkZXItYm90dG9tfGJvcmRlci1ib3R0b20tY29sb3J8Ym9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1c3xib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1c3xib3JkZXItYm90dG9tLXN0eWxlfGJvcmRlci1ib3R0b20td2lkdGh8Ym9yZGVyLWNvbGxhcHNlfGJvcmRlci1jb2xvcnxib3JkZXItaW1hZ2V8Ym9yZGVyLWltYWdlLW91dHNldHxib3JkZXItaW1hZ2UtcmVwZWF0fGJvcmRlci1pbWFnZS1zbGljZXxib3JkZXItaW1hZ2Utc291cmNlfGJvcmRlci1pbWFnZS13aWR0aHxib3JkZXItbGVmdHxib3JkZXItbGVmdC1jb2xvcnxib3JkZXItbGVmdC1zdHlsZXxib3JkZXItbGVmdC13aWR0aHxib3JkZXItcmFkaXVzfGJvcmRlci1yaWdodHxib3JkZXItcmlnaHQtY29sb3J8Ym9yZGVyLXJpZ2h0LXN0eWxlfGJvcmRlci1yaWdodC13aWR0aHxib3JkZXItc3BhY2luZ3xib3JkZXItc3R5bGV8Ym9yZGVyLXRvcHxib3JkZXItdG9wLWNvbG9yfGJvcmRlci10b3AtbGVmdC1yYWRpdXN8Ym9yZGVyLXRvcC1yaWdodC1yYWRpdXN8Ym9yZGVyLXRvcC1zdHlsZXxib3JkZXItdG9wLXdpZHRofGJvcmRlci13aWR0aHxib3R0b218Ym94LXNoYWRvd3xib3gtc2l6aW5nfGNhcHRpb24tc2lkZXxjbGVhcnxjbGlwfGNvbG9yfGNvbHVtbi1jb3VudHxjb2x1bW4tZmlsbHxjb2x1bW4tZ2FwfGNvbHVtbi1ydWxlfGNvbHVtbi1ydWxlLWNvbG9yfGNvbHVtbi1ydWxlLXN0eWxlfGNvbHVtbi1ydWxlLXdpZHRofGNvbHVtbi1zcGFufGNvbHVtbi13aWR0aHxjb2x1bW5zfGNvbnRlbnR8Y291bnRlci1pbmNyZW1lbnR8Y291bnRlci1yZXNldHxjdXJzb3J8ZGlyZWN0aW9ufGRpc3BsYXl8ZW1wdHktY2VsbHN8ZmlsdGVyfGZsZXh8ZmxleC1iYXNpc3xmbGV4LWRpcmVjdGlvbnxmbGV4LWZsb3d8ZmxleC1ncm93fGZsZXgtc2hyaW5rfGZsZXgtd3JhcHxmbG9hdHxmb250fGZvbnQtZmFtaWx5fGZvbnQtc2l6ZXxmb250LXNpemUtYWRqdXN0fGZvbnQtc3RyZXRjaHxmb250LXN0eWxlfGZvbnQtdmFyaWFudHxmb250LXdlaWdodHxoYW5naW5nLXB1bmN0dWF0aW9ufGhlaWdodHxqdXN0aWZ5LWNvbnRlbnR8bGVmdHxsZXR0ZXItc3BhY2luZ3xsaW5lLWhlaWdodHxsaXN0LXN0eWxlfGxpc3Qtc3R5bGUtaW1hZ2V8bGlzdC1zdHlsZS1wb3NpdGlvbnxsaXN0LXN0eWxlLXR5cGV8bWFyZ2lufG1hcmdpbi1ib3R0b218bWFyZ2luLWxlZnR8bWFyZ2luLXJpZ2h0fG1hcmdpbi10b3B8bWF4LWhlaWdodHxtYXgtd2lkdGh8bWF4LXpvb218bWluLWhlaWdodHxtaW4td2lkdGh8bWluLXpvb218bmF2LWRvd258bmF2LWluZGV4fG5hdi1sZWZ0fG5hdi1yaWdodHxuYXYtdXB8b3BhY2l0eXxvcmRlcnxvdXRsaW5lfG91dGxpbmUtY29sb3J8b3V0bGluZS1vZmZzZXR8b3V0bGluZS1zdHlsZXxvdXRsaW5lLXdpZHRofG92ZXJmbG93fG92ZXJmbG93LXh8b3ZlcmZsb3cteXxwYWRkaW5nfHBhZGRpbmctYm90dG9tfHBhZGRpbmctbGVmdHxwYWRkaW5nLXJpZ2h0fHBhZGRpbmctdG9wfHBhZ2UtYnJlYWstYWZ0ZXJ8cGFnZS1icmVhay1iZWZvcmV8cGFnZS1icmVhay1pbnNpZGV8cGVyc3BlY3RpdmV8cGVyc3BlY3RpdmUtb3JpZ2lufHBvc2l0aW9ufHF1b3Rlc3xyZXNpemV8cmlnaHR8dGFiLXNpemV8dGFibGUtbGF5b3V0fHRleHQtYWxpZ258dGV4dC1hbGlnbi1sYXN0fHRleHQtZGVjb3JhdGlvbnx0ZXh0LWRlY29yYXRpb24tY29sb3J8dGV4dC1kZWNvcmF0aW9uLWxpbmV8dGV4dC1kZWNvcmF0aW9uLXN0eWxlfHRleHQtaW5kZW50fHRleHQtanVzdGlmeXx0ZXh0LW92ZXJmbG93fHRleHQtc2hhZG93fHRleHQtdHJhbnNmb3JtfHRvcHx0cmFuc2Zvcm18dHJhbnNmb3JtLW9yaWdpbnx0cmFuc2Zvcm0tc3R5bGV8dHJhbnNpdGlvbnx0cmFuc2l0aW9uLWRlbGF5fHRyYW5zaXRpb24tZHVyYXRpb258dHJhbnNpdGlvbi1wcm9wZXJ0eXx0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbnx1bmljb2RlLWJpZGl8dXNlci1zZWxlY3R8dXNlci16b29tfHZlcnRpY2FsLWFsaWdufHZpc2liaWxpdHl8d2hpdGUtc3BhY2V8d2lkdGh8d29yZC1icmVha3x3b3JkLXNwYWNpbmd8d29yZC13cmFwfHotaW5kZXhcIjtcbnZhciBzdXBwb3J0RnVuY3Rpb24gPSBleHBvcnRzLnN1cHBvcnRGdW5jdGlvbiA9IFwicmdifHJnYmF8dXJsfGF0dHJ8Y291bnRlcnxjb3VudGVyc1wiO1xudmFyIHN1cHBvcnRDb25zdGFudCA9IGV4cG9ydHMuc3VwcG9ydENvbnN0YW50ID0gXCJhYnNvbHV0ZXxhZnRlci1lZGdlfGFmdGVyfGFsbC1zY3JvbGx8YWxsfGFscGhhYmV0aWN8YWx3YXlzfGFudGlhbGlhc2VkfGFybWVuaWFufGF1dG98YXZvaWQtY29sdW1ufGF2b2lkLXBhZ2V8YXZvaWR8YmFsYW5jZXxiYXNlbGluZXxiZWZvcmUtZWRnZXxiZWZvcmV8YmVsb3d8YmlkaS1vdmVycmlkZXxibG9jay1saW5lLWhlaWdodHxibG9ja3xib2xkfGJvbGRlcnxib3JkZXItYm94fGJvdGh8Ym90dG9tfGJveHxicmVhay1hbGx8YnJlYWstd29yZHxjYXBpdGFsaXplfGNhcHMtaGVpZ2h0fGNhcHRpb258Y2VudGVyfGNlbnRyYWx8Y2hhcnxjaXJjbGV8Y2prLWlkZW9ncmFwaGljfGNsb25lfGNsb3NlLXF1b3RlfGNvbC1yZXNpemV8Y29sbGFwc2V8Y29sdW1ufGNvbnNpZGVyLXNoaWZ0c3xjb250YWlufGNvbnRlbnQtYm94fGNvdmVyfGNyb3NzaGFpcnxjdWJpYy1iZXppZXJ8ZGFzaGVkfGRlY2ltYWwtbGVhZGluZy16ZXJvfGRlY2ltYWx8ZGVmYXVsdHxkaXNhYmxlZHxkaXNjfGRpc3JlZ2FyZC1zaGlmdHN8ZGlzdHJpYnV0ZS1hbGwtbGluZXN8ZGlzdHJpYnV0ZS1sZXR0ZXJ8ZGlzdHJpYnV0ZS1zcGFjZXxkaXN0cmlidXRlfGRvdHRlZHxkb3VibGV8ZS1yZXNpemV8ZWFzZS1pbnxlYXNlLWluLW91dHxlYXNlLW91dHxlYXNlfGVsbGlwc2lzfGVuZHxleGNsdWRlLXJ1Ynl8ZmxleC1lbmR8ZmxleC1zdGFydHxmaWxsfGZpeGVkfGdlb3JnaWFufGdseXBoc3xncmlkLWhlaWdodHxncm9vdmV8aGFuZHxoYW5naW5nfGhlYnJld3xoZWxwfGhpZGRlbnxoaXJhZ2FuYS1pcm9oYXxoaXJhZ2FuYXxob3Jpem9udGFsfGljb258aWRlb2dyYXBoLWFscGhhfGlkZW9ncmFwaC1udW1lcmljfGlkZW9ncmFwaC1wYXJlbnRoZXNpc3xpZGVvZ3JhcGgtc3BhY2V8aWRlb2dyYXBoaWN8aW5hY3RpdmV8aW5jbHVkZS1ydWJ5fGluaGVyaXR8aW5pdGlhbHxpbmxpbmUtYmxvY2t8aW5saW5lLWJveHxpbmxpbmUtbGluZS1oZWlnaHR8aW5saW5lLXRhYmxlfGlubGluZXxpbnNldHxpbnNpZGV8aW50ZXItaWRlb2dyYXBofGludGVyLXdvcmR8aW52ZXJ0fGl0YWxpY3xqdXN0aWZ5fGthdGFrYW5hLWlyb2hhfGthdGFrYW5hfGtlZXAtYWxsfGxhc3R8bGVmdHxsaWdodGVyfGxpbmUtZWRnZXxsaW5lLXRocm91Z2h8bGluZXxsaW5lYXJ8bGlzdC1pdGVtfGxvY2FsfGxvb3NlfGxvd2VyLWFscGhhfGxvd2VyLWdyZWVrfGxvd2VyLWxhdGlufGxvd2VyLXJvbWFufGxvd2VyY2FzZXxsci10YnxsdHJ8bWF0aGVtYXRpY2FsfG1heC1oZWlnaHR8bWF4LXNpemV8bWVkaXVtfG1lbnV8bWVzc2FnZS1ib3h8bWlkZGxlfG1vdmV8bi1yZXNpemV8bmUtcmVzaXplfG5ld3NwYXBlcnxuby1jaGFuZ2V8bm8tY2xvc2UtcXVvdGV8bm8tZHJvcHxuby1vcGVuLXF1b3RlfG5vLXJlcGVhdHxub25lfG5vcm1hbHxub3QtYWxsb3dlZHxub3dyYXB8bnctcmVzaXplfG9ibGlxdWV8b3Blbi1xdW90ZXxvdXRzZXR8b3V0c2lkZXxvdmVybGluZXxwYWRkaW5nLWJveHxwYWdlfHBvaW50ZXJ8cHJlLWxpbmV8cHJlLXdyYXB8cHJlfHByZXNlcnZlLTNkfHByb2dyZXNzfHJlbGF0aXZlfHJlcGVhdC14fHJlcGVhdC15fHJlcGVhdHxyZXBsYWNlZHxyZXNldC1zaXplfHJpZGdlfHJpZ2h0fHJvdW5kfHJvdy1yZXNpemV8cnRsfHMtcmVzaXplfHNjcm9sbHxzZS1yZXNpemV8c2VwYXJhdGV8c2xpY2V8c21hbGwtY2Fwc3xzbWFsbC1jYXB0aW9ufHNvbGlkfHNwYWNlfHNxdWFyZXxzdGFydHxzdGF0aWN8c3RhdHVzLWJhcnxzdGVwLWVuZHxzdGVwLXN0YXJ0fHN0ZXBzfHN0cmV0Y2h8c3RyaWN0fHN1YnxzdXBlcnxzdy1yZXNpemV8dGFibGUtY2FwdGlvbnx0YWJsZS1jZWxsfHRhYmxlLWNvbHVtbi1ncm91cHx0YWJsZS1jb2x1bW58dGFibGUtZm9vdGVyLWdyb3VwfHRhYmxlLWhlYWRlci1ncm91cHx0YWJsZS1yb3ctZ3JvdXB8dGFibGUtcm93fHRhYmxlfHRiLXJsfHRleHQtYWZ0ZXItZWRnZXx0ZXh0LWJlZm9yZS1lZGdlfHRleHQtYm90dG9tfHRleHQtc2l6ZXx0ZXh0LXRvcHx0ZXh0fHRoaWNrfHRoaW58dHJhbnNwYXJlbnR8dW5kZXJsaW5lfHVwcGVyLWFscGhhfHVwcGVyLWxhdGlufHVwcGVyLXJvbWFufHVwcGVyY2FzZXx1c2Utc2NyaXB0fHZlcnRpY2FsLWlkZW9ncmFwaGljfHZlcnRpY2FsLXRleHR8dmlzaWJsZXx3LXJlc2l6ZXx3YWl0fHdoaXRlc3BhY2V8ei1pbmRleHx6ZXJvfHpvb21cIjtcbnZhciBzdXBwb3J0Q29uc3RhbnRDb2xvciA9IGV4cG9ydHMuc3VwcG9ydENvbnN0YW50Q29sb3IgPSBcImFsaWNlYmx1ZXxhbnRpcXVld2hpdGV8YXF1YXxhcXVhbWFyaW5lfGF6dXJlfGJlaWdlfGJpc3F1ZXxibGFja3xibGFuY2hlZGFsbW9uZHxibHVlfGJsdWV2aW9sZXR8YnJvd258YnVybHl3b29kfGNhZGV0Ymx1ZXxjaGFydHJldXNlfGNob2NvbGF0ZXxjb3JhbHxjb3JuZmxvd2VyYmx1ZXxjb3Juc2lsa3xjcmltc29ufGN5YW58ZGFya2JsdWV8ZGFya2N5YW58ZGFya2dvbGRlbnJvZHxkYXJrZ3JheXxkYXJrZ3JlZW58ZGFya2dyZXl8ZGFya2toYWtpfGRhcmttYWdlbnRhfGRhcmtvbGl2ZWdyZWVufGRhcmtvcmFuZ2V8ZGFya29yY2hpZHxkYXJrcmVkfGRhcmtzYWxtb258ZGFya3NlYWdyZWVufGRhcmtzbGF0ZWJsdWV8ZGFya3NsYXRlZ3JheXxkYXJrc2xhdGVncmV5fGRhcmt0dXJxdW9pc2V8ZGFya3Zpb2xldHxkZWVwcGlua3xkZWVwc2t5Ymx1ZXxkaW1ncmF5fGRpbWdyZXl8ZG9kZ2VyYmx1ZXxmaXJlYnJpY2t8ZmxvcmFsd2hpdGV8Zm9yZXN0Z3JlZW58ZnVjaHNpYXxnYWluc2Jvcm98Z2hvc3R3aGl0ZXxnb2xkfGdvbGRlbnJvZHxncmF5fGdyZWVufGdyZWVueWVsbG93fGdyZXl8aG9uZXlkZXd8aG90cGlua3xpbmRpYW5yZWR8aW5kaWdvfGl2b3J5fGtoYWtpfGxhdmVuZGVyfGxhdmVuZGVyYmx1c2h8bGF3bmdyZWVufGxlbW9uY2hpZmZvbnxsaWdodGJsdWV8bGlnaHRjb3JhbHxsaWdodGN5YW58bGlnaHRnb2xkZW5yb2R5ZWxsb3d8bGlnaHRncmF5fGxpZ2h0Z3JlZW58bGlnaHRncmV5fGxpZ2h0cGlua3xsaWdodHNhbG1vbnxsaWdodHNlYWdyZWVufGxpZ2h0c2t5Ymx1ZXxsaWdodHNsYXRlZ3JheXxsaWdodHNsYXRlZ3JleXxsaWdodHN0ZWVsYmx1ZXxsaWdodHllbGxvd3xsaW1lfGxpbWVncmVlbnxsaW5lbnxtYWdlbnRhfG1hcm9vbnxtZWRpdW1hcXVhbWFyaW5lfG1lZGl1bWJsdWV8bWVkaXVtb3JjaGlkfG1lZGl1bXB1cnBsZXxtZWRpdW1zZWFncmVlbnxtZWRpdW1zbGF0ZWJsdWV8bWVkaXVtc3ByaW5nZ3JlZW58bWVkaXVtdHVycXVvaXNlfG1lZGl1bXZpb2xldHJlZHxtaWRuaWdodGJsdWV8bWludGNyZWFtfG1pc3R5cm9zZXxtb2NjYXNpbnxuYXZham93aGl0ZXxuYXZ5fG9sZGxhY2V8b2xpdmV8b2xpdmVkcmFifG9yYW5nZXxvcmFuZ2VyZWR8b3JjaGlkfHBhbGVnb2xkZW5yb2R8cGFsZWdyZWVufHBhbGV0dXJxdW9pc2V8cGFsZXZpb2xldHJlZHxwYXBheWF3aGlwfHBlYWNocHVmZnxwZXJ1fHBpbmt8cGx1bXxwb3dkZXJibHVlfHB1cnBsZXxyZWJlY2NhcHVycGxlfHJlZHxyb3N5YnJvd258cm95YWxibHVlfHNhZGRsZWJyb3dufHNhbG1vbnxzYW5keWJyb3dufHNlYWdyZWVufHNlYXNoZWxsfHNpZW5uYXxzaWx2ZXJ8c2t5Ymx1ZXxzbGF0ZWJsdWV8c2xhdGVncmF5fHNsYXRlZ3JleXxzbm93fHNwcmluZ2dyZWVufHN0ZWVsYmx1ZXx0YW58dGVhbHx0aGlzdGxlfHRvbWF0b3x0dXJxdW9pc2V8dmlvbGV0fHdoZWF0fHdoaXRlfHdoaXRlc21va2V8eWVsbG93fHllbGxvd2dyZWVuXCI7XG52YXIgc3VwcG9ydENvbnN0YW50Rm9udHMgPSBleHBvcnRzLnN1cHBvcnRDb25zdGFudEZvbnRzID0gXCJhcmlhbHxjZW50dXJ5fGNvbWljfGNvdXJpZXJ8Y3Vyc2l2ZXxmYW50YXN5fGdhcmFtb25kfGdlb3JnaWF8aGVsdmV0aWNhfGltcGFjdHxsdWNpZGF8c3ltYm9sfHN5c3RlbXx0YWhvbWF8dGltZXN8dHJlYnVjaGV0fHV0b3BpYXx2ZXJkYW5hfHdlYmRpbmdzfHNhbnMtc2VyaWZ8c2VyaWZ8bW9ub3NwYWNlXCI7XG5cbnZhciBudW1SZSA9IGV4cG9ydHMubnVtUmUgPSBcIlxcXFwtPyg/Oig/OlswLTldKyg/OlxcXFwuWzAtOV0rKT8pfCg/OlxcXFwuWzAtOV0rKSlcIjtcbnZhciBwc2V1ZG9FbGVtZW50cyA9IGV4cG9ydHMucHNldWRvRWxlbWVudHMgPSBcIihcXFxcOispXFxcXGIoYWZ0ZXJ8YmVmb3JlfGZpcnN0LWxldHRlcnxmaXJzdC1saW5lfG1vei1zZWxlY3Rpb258c2VsZWN0aW9uKVxcXFxiXCI7XG52YXIgcHNldWRvQ2xhc3NlcyAgPSBleHBvcnRzLnBzZXVkb0NsYXNzZXMgPSAgXCIoOilcXFxcYihhY3RpdmV8Y2hlY2tlZHxkaXNhYmxlZHxlbXB0eXxlbmFibGVkfGZpcnN0LWNoaWxkfGZpcnN0LW9mLXR5cGV8Zm9jdXN8aG92ZXJ8aW5kZXRlcm1pbmF0ZXxpbnZhbGlkfGxhc3QtY2hpbGR8bGFzdC1vZi10eXBlfGxpbmt8bm90fG50aC1jaGlsZHxudGgtbGFzdC1jaGlsZHxudGgtbGFzdC1vZi10eXBlfG50aC1vZi10eXBlfG9ubHktY2hpbGR8b25seS1vZi10eXBlfHJlcXVpcmVkfHJvb3R8dGFyZ2V0fHZhbGlkfHZpc2l0ZWQpXFxcXGJcIjtcblxudmFyIENzc0hpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIga2V5d29yZE1hcHBlciA9IHRoaXMuY3JlYXRlS2V5d29yZE1hcHBlcih7XG4gICAgICAgIFwic3VwcG9ydC5mdW5jdGlvblwiOiBzdXBwb3J0RnVuY3Rpb24sXG4gICAgICAgIFwic3VwcG9ydC5jb25zdGFudFwiOiBzdXBwb3J0Q29uc3RhbnQsXG4gICAgICAgIFwic3VwcG9ydC50eXBlXCI6IHN1cHBvcnRUeXBlLFxuICAgICAgICBcInN1cHBvcnQuY29uc3RhbnQuY29sb3JcIjogc3VwcG9ydENvbnN0YW50Q29sb3IsXG4gICAgICAgIFwic3VwcG9ydC5jb25zdGFudC5mb250c1wiOiBzdXBwb3J0Q29uc3RhbnRGb250c1xuICAgIH0sIFwidGV4dFwiLCB0cnVlKTtcblxuICAgIC8vIHJlZ2V4cCBtdXN0IG5vdCBoYXZlIGNhcHR1cmluZyBwYXJlbnRoZXNlcy4gVXNlICg/OikgaW5zdGVhZC5cbiAgICAvLyByZWdleHBzIGFyZSBvcmRlcmVkIC0+IHRoZSBmaXJzdCBtYXRjaCBpcyB1c2VkXG5cbiAgICB0aGlzLiRydWxlcyA9IHtcbiAgICAgICAgXCJzdGFydFwiIDogW3tcbiAgICAgICAgICAgIGluY2x1ZGUgOiBbXCJzdHJpbmdzXCIsIFwidXJsXCIsIFwiY29tbWVudHNcIl1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwicGFyZW4ubHBhcmVuXCIsXG4gICAgICAgICAgICByZWdleDogXCJcXFxce1wiLFxuICAgICAgICAgICAgbmV4dDogIFwicnVsZXNldFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInBhcmVuLnJwYXJlblwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiXFxcXH1cIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIkAoPyF2aWV3cG9ydClcIixcbiAgICAgICAgICAgIG5leHQ6ICBcIm1lZGlhXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwia2V5d29yZFwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiI1thLXowLTktX10rXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwia2V5d29yZFwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiJVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInZhcmlhYmxlXCIsXG4gICAgICAgICAgICByZWdleDogXCJcXFxcLlthLXowLTktX10rXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nXCIsXG4gICAgICAgICAgICByZWdleDogXCI6W2EtejAtOS1fXStcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLFxuICAgICAgICAgICAgcmVnZXggOiBudW1SZVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudFwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiW2EtejAtOS1fXStcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjYXNlSW5zZW5zaXRpdmU6IHRydWVcbiAgICAgICAgfV0sXG5cbiAgICAgICAgXCJtZWRpYVwiOiBbe1xuICAgICAgICAgICAgaW5jbHVkZSA6IFtcInN0cmluZ3NcIiwgXCJ1cmxcIiwgXCJjb21tZW50c1wiXVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJwYXJlbi5scGFyZW5cIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFx7XCIsXG4gICAgICAgICAgICBuZXh0OiAgXCJzdGFydFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInBhcmVuLnJwYXJlblwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiXFxcXH1cIixcbiAgICAgICAgICAgIG5leHQ6ICBcInN0YXJ0XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nXCIsXG4gICAgICAgICAgICByZWdleDogXCI7XCIsXG4gICAgICAgICAgICBuZXh0OiAgXCJzdGFydFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcImtleXdvcmRcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIig/Om1lZGlhfHN1cHBvcnRzfGRvY3VtZW50fGNoYXJzZXR8aW1wb3J0fG5hbWVzcGFjZXxtZWRpYXxzdXBwb3J0c3xkb2N1bWVudFwiXG4gICAgICAgICAgICAgICAgKyBcInxwYWdlfGZvbnR8a2V5ZnJhbWVzfHZpZXdwb3J0fGNvdW50ZXItc3R5bGV8Zm9udC1mZWF0dXJlLXZhbHVlc1wiXG4gICAgICAgICAgICAgICAgKyBcInxzd2FzaHxvcm5hbWVudHN8YW5ub3RhdGlvbnxzdHlsaXN0aWN8c3R5bGVzZXR8Y2hhcmFjdGVyLXZhcmlhbnQpXCJcbiAgICAgICAgfV0sXG5cbiAgICAgICAgXCJjb21tZW50c1wiIDogW3tcbiAgICAgICAgICAgIHRva2VuOiBcImNvbW1lbnRcIiwgLy8gbXVsdGkgbGluZSBjb21tZW50XG4gICAgICAgICAgICByZWdleDogXCJcXFxcL1xcXFwqXCIsXG4gICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwqXFxcXC9cIixcbiAgICAgICAgICAgICAgICBuZXh0IDogXCJwb3BcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbiA6IFwiY29tbWVudFwiXG4gICAgICAgICAgICB9XVxuICAgICAgICB9XSxcblxuICAgICAgICBcInJ1bGVzZXRcIiA6IFt7XG4gICAgICAgICAgICByZWdleCA6IFwiLSh3ZWJraXR8bXN8bW96fG8pLVwiLFxuICAgICAgICAgICAgdG9rZW4gOiBcInRleHRcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwicHVuY3R1YXRpb24ub3BlcmF0b3JcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJbOjtdXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInBhcmVuLnJwYXJlblwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIlxcXFx9XCIsXG4gICAgICAgICAgICBuZXh0IDogXCJzdGFydFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGluY2x1ZGUgOiBbXCJzdHJpbmdzXCIsIFwidXJsXCIsIFwiY29tbWVudHNcIl1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBbXCJjb25zdGFudC5udW1lcmljXCIsIFwia2V5d29yZFwiXSxcbiAgICAgICAgICAgIHJlZ2V4IDogXCIoXCIgKyBudW1SZSArIFwiKShjaHxjbXxkZWd8ZW18ZXh8ZnJ8Z2R8Z3JhZHxIenxpbnxrSHp8bW18bXN8cGN8cHR8cHh8cmFkfHJlbXxzfHR1cm58dmh8dm1heHx2bWlufHZtfHZ3fCUpXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIixcbiAgICAgICAgICAgIHJlZ2V4IDogbnVtUmVcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIiwgIC8vIGhleDYgY29sb3JcbiAgICAgICAgICAgIHJlZ2V4IDogXCIjW2EtZjAtOV17Nn1cIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLCAvLyBoZXgzIGNvbG9yXG4gICAgICAgICAgICByZWdleCA6IFwiI1thLWYwLTldezN9XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBbXCJwdW5jdHVhdGlvblwiLCBcImVudGl0eS5vdGhlci5hdHRyaWJ1dGUtbmFtZS5wc2V1ZG8tZWxlbWVudC5jc3NcIl0sXG4gICAgICAgICAgICByZWdleCA6IHBzZXVkb0VsZW1lbnRzXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogW1wicHVuY3R1YXRpb25cIiwgXCJlbnRpdHkub3RoZXIuYXR0cmlidXRlLW5hbWUucHNldWRvLWNsYXNzLmNzc1wiXSxcbiAgICAgICAgICAgIHJlZ2V4IDogcHNldWRvQ2xhc3Nlc1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpbmNsdWRlOiBcInVybFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDoga2V5d29yZE1hcHBlcixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcLT9bYS16QS1aX11bYS16QS1aMC05X1xcXFwtXSpcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJwYXJlbi5scGFyZW5cIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFx7XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2FzZUluc2Vuc2l0aXZlOiB0cnVlXG4gICAgICAgIH1dLFxuXG4gICAgICAgIHVybDogW3tcbiAgICAgICAgICAgIHRva2VuIDogXCJzdXBwb3J0LmZ1bmN0aW9uXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiKD86dXJsKDo/LXByZWZpeCk/fGRvbWFpbnxyZWdleHApXFxcXChcIixcbiAgICAgICAgICAgIHB1c2g6IFt7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN1cHBvcnQuZnVuY3Rpb25cIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXClcIixcbiAgICAgICAgICAgICAgICBuZXh0IDogXCJwb3BcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzdHJpbmdcIlxuICAgICAgICAgICAgfV1cbiAgICAgICAgfV0sXG5cbiAgICAgICAgc3RyaW5nczogW3tcbiAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmcuc3RhcnRcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCInXCIsXG4gICAgICAgICAgICBwdXNoIDogW3tcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nLmVuZFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCInfCRcIixcbiAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaW5jbHVkZSA6IFwiZXNjYXBlc1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogL1xcXFwkLyxcbiAgICAgICAgICAgICAgICBjb25zdW1lTGluZUVuZDogdHJ1ZVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzdHJpbmdcIlxuICAgICAgICAgICAgfV1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZy5zdGFydFwiLFxuICAgICAgICAgICAgcmVnZXggOiAnXCInLFxuICAgICAgICAgICAgcHVzaCA6IFt7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZy5lbmRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6ICdcInwkJyxcbiAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaW5jbHVkZSA6IFwiZXNjYXBlc1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogL1xcXFwkLyxcbiAgICAgICAgICAgICAgICBjb25zdW1lTGluZUVuZDogdHJ1ZVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzdHJpbmdcIlxuICAgICAgICAgICAgfV1cbiAgICAgICAgfV0sXG4gICAgICAgIGVzY2FwZXM6IFt7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCIsXG4gICAgICAgICAgICByZWdleCA6IC9cXFxcKFthLWZBLUZcXGRdezEsNn18W15hLWZBLUZcXGRdKS9cbiAgICAgICAgfV1cblxuICAgIH07XG5cbiAgICB0aGlzLm5vcm1hbGl6ZVJ1bGVzKCk7XG59O1xuXG5vb3AuaW5oZXJpdHMoQ3NzSGlnaGxpZ2h0UnVsZXMsIFRleHRIaWdobGlnaHRSdWxlcyk7XG5cbmV4cG9ydHMuQ3NzSGlnaGxpZ2h0UnVsZXMgPSBDc3NIaWdobGlnaHRSdWxlcztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uLy4uL2xpYi9vb3BcIik7XG52YXIgUmFuZ2UgPSByZXF1aXJlKFwiLi4vLi4vcmFuZ2VcIikuUmFuZ2U7XG52YXIgQmFzZUZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZF9tb2RlXCIpLkZvbGRNb2RlO1xuXG52YXIgRm9sZE1vZGUgPSBleHBvcnRzLkZvbGRNb2RlID0gZnVuY3Rpb24oY29tbWVudFJlZ2V4KSB7XG4gICAgaWYgKGNvbW1lbnRSZWdleCkge1xuICAgICAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlciA9IG5ldyBSZWdFeHAoXG4gICAgICAgICAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlci5zb3VyY2UucmVwbGFjZSgvXFx8W158XSo/JC8sIFwifFwiICsgY29tbWVudFJlZ2V4LnN0YXJ0KVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmZvbGRpbmdTdG9wTWFya2VyID0gbmV3IFJlZ0V4cChcbiAgICAgICAgICAgIHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIuc291cmNlLnJlcGxhY2UoL1xcfFtefF0qPyQvLCBcInxcIiArIGNvbW1lbnRSZWdleC5lbmQpXG4gICAgICAgICk7XG4gICAgfVxufTtcbm9vcC5pbmhlcml0cyhGb2xkTW9kZSwgQmFzZUZvbGRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuICAgIFxuICAgIHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyID0gLyhbXFx7XFxbXFwoXSlbXlxcfVxcXVxcKV0qJHxeXFxzKihcXC9cXCopLztcbiAgICB0aGlzLmZvbGRpbmdTdG9wTWFya2VyID0gL15bXlxcW1xce1xcKF0qKFtcXH1cXF1cXCldKXxeW1xcc1xcKl0qKFxcKlxcLykvO1xuICAgIHRoaXMuc2luZ2xlTGluZUJsb2NrQ29tbWVudFJlPSAvXlxccyooXFwvXFwqKS4qXFwqXFwvXFxzKiQvO1xuICAgIHRoaXMudHJpcGxlU3RhckJsb2NrQ29tbWVudFJlID0gL15cXHMqKFxcL1xcKlxcKlxcKikuKlxcKlxcL1xccyokLztcbiAgICB0aGlzLnN0YXJ0UmVnaW9uUmUgPSAvXlxccyooXFwvXFwqfFxcL1xcLykjP3JlZ2lvblxcYi87XG4gICAgXG4gICAgLy9wcmV2ZW50IG5hbWluZyBjb25mbGljdCB3aXRoIGFueSBtb2RlcyB0aGF0IGluaGVyaXQgZnJvbSBjc3R5bGUgYW5kIG92ZXJyaWRlIHRoaXMgKGxpa2UgY3NoYXJwKVxuICAgIHRoaXMuX2dldEZvbGRXaWRnZXRCYXNlID0gdGhpcy5nZXRGb2xkV2lkZ2V0O1xuICAgIFxuICAgIC8qKlxuICAgICAqIEdldHMgZm9sZCB3aWRnZXQgd2l0aCBzb21lIG5vbi1zdGFuZGFyZCBleHRyYXM6XG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSBsaW5lQ29tbWVudFJlZ2lvblN0YXJ0XG4gICAgICogICAgICAvLyNyZWdpb24gW29wdGlvbmFsIGRlc2NyaXB0aW9uXVxuICAgICAqXG4gICAgICogQGV4YW1wbGUgYmxvY2tDb21tZW50UmVnaW9uU3RhcnRcbiAgICAgKiAgICAgIC8qI3JlZ2lvbiBbb3B0aW9uYWwgZGVzY3JpcHRpb25dICpbL11cbiAgICAgKlxuICAgICAqIEBleGFtcGxlIHRyaXBsZVN0YXJGb2xkaW5nU2VjdGlvblxuICAgICAqICAgICAgLyoqKiB0aGlzIGZvbGRzIGV2ZW4gdGhvdWdoIDEgbGluZSBiZWNhdXNlIGl0IGhhcyAzIHN0YXJzICoqKlsvXVxuICAgICAqIFxuICAgICAqIEBub3RlIHRoZSBwb3VuZCBzeW1ib2wgZm9yIHJlZ2lvbiB0YWdzIGlzIG9wdGlvbmFsXG4gICAgICovXG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0ID0gZnVuY3Rpb24oc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICBcbiAgICAgICAgaWYgKHRoaXMuc2luZ2xlTGluZUJsb2NrQ29tbWVudFJlLnRlc3QobGluZSkpIHtcbiAgICAgICAgICAgIC8vIE5vIHdpZGdldCBmb3Igc2luZ2xlIGxpbmUgYmxvY2sgY29tbWVudCB1bmxlc3MgcmVnaW9uIG9yIHRyaXBsZSBzdGFyXG4gICAgICAgICAgICBpZiAoIXRoaXMuc3RhcnRSZWdpb25SZS50ZXN0KGxpbmUpICYmICF0aGlzLnRyaXBsZVN0YXJCbG9ja0NvbW1lbnRSZS50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIHZhciBmdyA9IHRoaXMuX2dldEZvbGRXaWRnZXRCYXNlKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KTtcbiAgICBcbiAgICAgICAgaWYgKCFmdyAmJiB0aGlzLnN0YXJ0UmVnaW9uUmUudGVzdChsaW5lKSlcbiAgICAgICAgICAgIHJldHVybiBcInN0YXJ0XCI7IC8vIGxpbmVDb21tZW50UmVnaW9uU3RhcnRcbiAgICBcbiAgICAgICAgcmV0dXJuIGZ3O1xuICAgIH07XG5cbiAgICB0aGlzLmdldEZvbGRXaWRnZXRSYW5nZSA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93LCBmb3JjZU11bHRpbGluZSkge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuc3RhcnRSZWdpb25SZS50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q29tbWVudFJlZ2lvbkJsb2NrKHNlc3Npb24sIGxpbmUsIHJvdyk7XG4gICAgICAgIFxuICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyKTtcbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICB2YXIgaSA9IG1hdGNoLmluZGV4O1xuXG4gICAgICAgICAgICBpZiAobWF0Y2hbMV0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMub3BlbmluZ0JyYWNrZXRCbG9jayhzZXNzaW9uLCBtYXRjaFsxXSwgcm93LCBpKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciByYW5nZSA9IHNlc3Npb24uZ2V0Q29tbWVudEZvbGRSYW5nZShyb3csIGkgKyBtYXRjaFswXS5sZW5ndGgsIDEpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAocmFuZ2UgJiYgIXJhbmdlLmlzTXVsdGlMaW5lKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoZm9yY2VNdWx0aWxpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2UgPSB0aGlzLmdldFNlY3Rpb25SYW5nZShzZXNzaW9uLCByb3cpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZm9sZFN0eWxlICE9IFwiYWxsXCIpXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIHJhbmdlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZvbGRTdHlsZSA9PT0gXCJtYXJrYmVnaW5cIilcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIpO1xuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIHZhciBpID0gbWF0Y2guaW5kZXggKyBtYXRjaFswXS5sZW5ndGg7XG5cbiAgICAgICAgICAgIGlmIChtYXRjaFsxXSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jbG9zaW5nQnJhY2tldEJsb2NrKHNlc3Npb24sIG1hdGNoWzFdLCByb3csIGkpO1xuXG4gICAgICAgICAgICByZXR1cm4gc2Vzc2lvbi5nZXRDb21tZW50Rm9sZFJhbmdlKHJvdywgaSwgLTEpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBcbiAgICB0aGlzLmdldFNlY3Rpb25SYW5nZSA9IGZ1bmN0aW9uKHNlc3Npb24sIHJvdykge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICB2YXIgc3RhcnRJbmRlbnQgPSBsaW5lLnNlYXJjaCgvXFxTLyk7XG4gICAgICAgIHZhciBzdGFydFJvdyA9IHJvdztcbiAgICAgICAgdmFyIHN0YXJ0Q29sdW1uID0gbGluZS5sZW5ndGg7XG4gICAgICAgIHJvdyA9IHJvdyArIDE7XG4gICAgICAgIHZhciBlbmRSb3cgPSByb3c7XG4gICAgICAgIHZhciBtYXhSb3cgPSBzZXNzaW9uLmdldExlbmd0aCgpO1xuICAgICAgICB3aGlsZSAoKytyb3cgPCBtYXhSb3cpIHtcbiAgICAgICAgICAgIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgICAgIHZhciBpbmRlbnQgPSBsaW5lLnNlYXJjaCgvXFxTLyk7XG4gICAgICAgICAgICBpZiAoaW5kZW50ID09PSAtMSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIGlmICAoc3RhcnRJbmRlbnQgPiBpbmRlbnQpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB2YXIgc3ViUmFuZ2UgPSB0aGlzLmdldEZvbGRXaWRnZXRSYW5nZShzZXNzaW9uLCBcImFsbFwiLCByb3cpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoc3ViUmFuZ2UpIHtcbiAgICAgICAgICAgICAgICBpZiAoc3ViUmFuZ2Uuc3RhcnQucm93IDw9IHN0YXJ0Um93KSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3ViUmFuZ2UuaXNNdWx0aUxpbmUoKSkge1xuICAgICAgICAgICAgICAgICAgICByb3cgPSBzdWJSYW5nZS5lbmQucm93O1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhcnRJbmRlbnQgPT0gaW5kZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVuZFJvdyA9IHJvdztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShzdGFydFJvdywgc3RhcnRDb2x1bW4sIGVuZFJvdywgc2Vzc2lvbi5nZXRMaW5lKGVuZFJvdykubGVuZ3RoKTtcbiAgICB9O1xuICAgIFxuICAgIC8qKlxuICAgICAqIGdldHMgY29tbWVudCByZWdpb24gYmxvY2sgd2l0aCBlbmQgcmVnaW9uIGFzc3VtZWQgdG8gYmUgc3RhcnQgb2YgY29tbWVudCBpbiBhbnkgY3N0eWxlIG1vZGUgb3IgU1FMIG1vZGUgKC0tKSB3aGljaCBpbmhlcml0cyBmcm9tIHRoaXMuXG4gICAgICogVGhlcmUgbWF5IG9wdGlvbmFsbHkgYmUgYSBwb3VuZCBzeW1ib2wgYmVmb3JlIHRoZSByZWdpb24vZW5kcmVnaW9uIHN0YXRlbWVudFxuICAgICAqL1xuICAgIHRoaXMuZ2V0Q29tbWVudFJlZ2lvbkJsb2NrID0gZnVuY3Rpb24oc2Vzc2lvbiwgbGluZSwgcm93KSB7XG4gICAgICAgIHZhciBzdGFydENvbHVtbiA9IGxpbmUuc2VhcmNoKC9cXHMqJC8pO1xuICAgICAgICB2YXIgbWF4Um93ID0gc2Vzc2lvbi5nZXRMZW5ndGgoKTtcbiAgICAgICAgdmFyIHN0YXJ0Um93ID0gcm93O1xuICAgICAgICBcbiAgICAgICAgdmFyIHJlID0gL15cXHMqKD86XFwvXFwqfFxcL1xcL3wtLSkjPyhlbmQpP3JlZ2lvblxcYi87XG4gICAgICAgIHZhciBkZXB0aCA9IDE7XG4gICAgICAgIHdoaWxlICgrK3JvdyA8IG1heFJvdykge1xuICAgICAgICAgICAgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICAgICAgdmFyIG0gPSByZS5leGVjKGxpbmUpO1xuICAgICAgICAgICAgaWYgKCFtKSBjb250aW51ZTtcbiAgICAgICAgICAgIGlmIChtWzFdKSBkZXB0aC0tO1xuICAgICAgICAgICAgZWxzZSBkZXB0aCsrO1xuXG4gICAgICAgICAgICBpZiAoIWRlcHRoKSBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBlbmRSb3cgPSByb3c7XG4gICAgICAgIGlmIChlbmRSb3cgPiBzdGFydFJvdykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShzdGFydFJvdywgc3RhcnRDb2x1bW4sIGVuZFJvdywgbGluZS5sZW5ndGgpO1xuICAgICAgICB9XG4gICAgfTtcblxufSkuY2FsbChGb2xkTW9kZS5wcm90b3R5cGUpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBSYW5nZSA9IHJlcXVpcmUoXCIuLi9yYW5nZVwiKS5SYW5nZTtcblxudmFyIE1hdGNoaW5nQnJhY2VPdXRkZW50ID0gZnVuY3Rpb24oKSB7fTtcblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5jaGVja091dGRlbnQgPSBmdW5jdGlvbihsaW5lLCBpbnB1dCkge1xuICAgICAgICBpZiAoISAvXlxccyskLy50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIHJldHVybiAvXlxccypcXH0vLnRlc3QoaW5wdXQpO1xuICAgIH07XG5cbiAgICB0aGlzLmF1dG9PdXRkZW50ID0gZnVuY3Rpb24oZG9jLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBkb2MuZ2V0TGluZShyb3cpO1xuICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKC9eKFxccypcXH0pLyk7XG5cbiAgICAgICAgaWYgKCFtYXRjaCkgcmV0dXJuIDA7XG5cbiAgICAgICAgdmFyIGNvbHVtbiA9IG1hdGNoWzFdLmxlbmd0aDtcbiAgICAgICAgdmFyIG9wZW5CcmFjZVBvcyA9IGRvYy5maW5kTWF0Y2hpbmdCcmFja2V0KHtyb3c6IHJvdywgY29sdW1uOiBjb2x1bW59KTtcblxuICAgICAgICBpZiAoIW9wZW5CcmFjZVBvcyB8fCBvcGVuQnJhY2VQb3Mucm93ID09IHJvdykgcmV0dXJuIDA7XG5cbiAgICAgICAgdmFyIGluZGVudCA9IHRoaXMuJGdldEluZGVudChkb2MuZ2V0TGluZShvcGVuQnJhY2VQb3Mucm93KSk7XG4gICAgICAgIGRvYy5yZXBsYWNlKG5ldyBSYW5nZShyb3csIDAsIHJvdywgY29sdW1uLTEpLCBpbmRlbnQpO1xuICAgIH07XG5cbiAgICB0aGlzLiRnZXRJbmRlbnQgPSBmdW5jdGlvbihsaW5lKSB7XG4gICAgICAgIHJldHVybiBsaW5lLm1hdGNoKC9eXFxzKi8pWzBdO1xuICAgIH07XG5cbn0pLmNhbGwoTWF0Y2hpbmdCcmFjZU91dGRlbnQucHJvdG90eXBlKTtcblxuZXhwb3J0cy5NYXRjaGluZ0JyYWNlT3V0ZGVudCA9IE1hdGNoaW5nQnJhY2VPdXRkZW50O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0TW9kZSA9IHJlcXVpcmUoXCIuL3RleHRcIikuTW9kZTtcbnZhciBTY3NzSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9zY3NzX2hpZ2hsaWdodF9ydWxlc1wiKS5TY3NzSGlnaGxpZ2h0UnVsZXM7XG52YXIgTWF0Y2hpbmdCcmFjZU91dGRlbnQgPSByZXF1aXJlKFwiLi9tYXRjaGluZ19icmFjZV9vdXRkZW50XCIpLk1hdGNoaW5nQnJhY2VPdXRkZW50O1xudmFyIENzc0JlaGF2aW91ciA9IHJlcXVpcmUoXCIuL2JlaGF2aW91ci9jc3NcIikuQ3NzQmVoYXZpb3VyO1xudmFyIENTdHlsZUZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZGluZy9jc3R5bGVcIikuRm9sZE1vZGU7XG52YXIgQ3NzQ29tcGxldGlvbnMgPSByZXF1aXJlKFwiLi9jc3NfY29tcGxldGlvbnNcIikuQ3NzQ29tcGxldGlvbnM7XG5cblxudmFyIE1vZGUgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLkhpZ2hsaWdodFJ1bGVzID0gU2Nzc0hpZ2hsaWdodFJ1bGVzO1xuICAgIHRoaXMuJG91dGRlbnQgPSBuZXcgTWF0Y2hpbmdCcmFjZU91dGRlbnQoKTtcbiAgICB0aGlzLiRiZWhhdmlvdXIgPSBuZXcgQ3NzQmVoYXZpb3VyKCk7XG4gICAgdGhpcy4kY29tcGxldGVyID0gbmV3IENzc0NvbXBsZXRpb25zKCk7XG4gICAgdGhpcy5mb2xkaW5nUnVsZXMgPSBuZXcgQ1N0eWxlRm9sZE1vZGUoKTtcbn07XG5vb3AuaW5oZXJpdHMoTW9kZSwgVGV4dE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG4gICBcbiAgICB0aGlzLmxpbmVDb21tZW50U3RhcnQgPSBcIi8vXCI7XG4gICAgdGhpcy5ibG9ja0NvbW1lbnQgPSB7c3RhcnQ6IFwiLypcIiwgZW5kOiBcIiovXCJ9O1xuXG4gICAgdGhpcy5nZXROZXh0TGluZUluZGVudCA9IGZ1bmN0aW9uKHN0YXRlLCBsaW5lLCB0YWIpIHtcbiAgICAgICAgdmFyIGluZGVudCA9IHRoaXMuJGdldEluZGVudChsaW5lKTtcblxuICAgICAgICAvLyBpZ25vcmUgYnJhY2VzIGluIGNvbW1lbnRzXG4gICAgICAgIHZhciB0b2tlbnMgPSB0aGlzLmdldFRva2VuaXplcigpLmdldExpbmVUb2tlbnMobGluZSwgc3RhdGUpLnRva2VucztcbiAgICAgICAgaWYgKHRva2Vucy5sZW5ndGggJiYgdG9rZW5zW3Rva2Vucy5sZW5ndGgtMV0udHlwZSA9PSBcImNvbW1lbnRcIikge1xuICAgICAgICAgICAgcmV0dXJuIGluZGVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBtYXRjaCA9IGxpbmUubWF0Y2goL14uKlxce1xccyokLyk7XG4gICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgaW5kZW50ICs9IHRhYjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpbmRlbnQ7XG4gICAgfTtcblxuICAgIHRoaXMuY2hlY2tPdXRkZW50ID0gZnVuY3Rpb24oc3RhdGUsIGxpbmUsIGlucHV0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRvdXRkZW50LmNoZWNrT3V0ZGVudChsaW5lLCBpbnB1dCk7XG4gICAgfTtcblxuICAgIHRoaXMuYXV0b091dGRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgZG9jLCByb3cpIHtcbiAgICAgICAgdGhpcy4kb3V0ZGVudC5hdXRvT3V0ZGVudChkb2MsIHJvdyk7XG4gICAgfTtcbiAgICBcbiAgICB0aGlzLmdldENvbXBsZXRpb25zID0gZnVuY3Rpb24oc3RhdGUsIHNlc3Npb24sIHBvcywgcHJlZml4KSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRjb21wbGV0ZXIuZ2V0Q29tcGxldGlvbnMoc3RhdGUsIHNlc3Npb24sIHBvcywgcHJlZml4KTtcbiAgICB9O1xuXG5cbiAgICB0aGlzLiRpZCA9IFwiYWNlL21vZGUvc2Nzc1wiO1xufSkuY2FsbChNb2RlLnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTW9kZSA9IE1vZGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIGxhbmcgPSByZXF1aXJlKFwiLi4vbGliL2xhbmdcIik7XG52YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xudmFyIENzc0hpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vY3NzX2hpZ2hsaWdodF9ydWxlc1wiKTtcblxudmFyIFNjc3NIaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uKCkge1xuICAgIFxuICAgIHZhciBwcm9wZXJ0aWVzID0gbGFuZy5hcnJheVRvTWFwKENzc0hpZ2hsaWdodFJ1bGVzLnN1cHBvcnRUeXBlLnNwbGl0KFwifFwiKSk7XG5cbiAgICB2YXIgZnVuY3Rpb25zID0gbGFuZy5hcnJheVRvTWFwKFxuICAgICAgICAoXCJoc2x8aHNsYXxyZ2J8cmdiYXx1cmx8YXR0cnxjb3VudGVyfGNvdW50ZXJzfGFic3xhZGp1c3RfY29sb3J8YWRqdXN0X2h1ZXxcIiArXG4gICAgICAgICBcImFscGhhfGpvaW58Ymx1ZXxjZWlsfGNoYW5nZV9jb2xvcnxjb21wYXJhYmxlfGNvbXBsZW1lbnR8ZGFya2VufGRlc2F0dXJhdGV8XCIgKyBcbiAgICAgICAgIFwiZmxvb3J8Z3JheXNjYWxlfGdyZWVufGh1ZXxpZnxpbnZlcnR8am9pbnxsZW5ndGh8bGlnaHRlbnxsaWdodG5lc3N8bWl4fFwiICsgXG4gICAgICAgICBcIm50aHxvcGFjaWZ5fG9wYWNpdHl8cGVyY2VudGFnZXxxdW90ZXxyZWR8cm91bmR8c2F0dXJhdGV8c2F0dXJhdGlvbnxcIiArXG4gICAgICAgICBcInNjYWxlX2NvbG9yfHRyYW5zcGFyZW50aXplfHR5cGVfb2Z8dW5pdHx1bml0bGVzc3x1bnF1b3RlXCIpLnNwbGl0KFwifFwiKVxuICAgICk7XG5cbiAgICB2YXIgY29uc3RhbnRzID0gbGFuZy5hcnJheVRvTWFwKENzc0hpZ2hsaWdodFJ1bGVzLnN1cHBvcnRDb25zdGFudC5zcGxpdChcInxcIikpO1xuXG4gICAgdmFyIGNvbG9ycyA9IGxhbmcuYXJyYXlUb01hcChDc3NIaWdobGlnaHRSdWxlcy5zdXBwb3J0Q29uc3RhbnRDb2xvci5zcGxpdChcInxcIikpO1xuICAgIFxuICAgIHZhciBrZXl3b3JkcyA9IGxhbmcuYXJyYXlUb01hcChcbiAgICAgICAgKFwiQG1peGlufEBleHRlbmR8QGluY2x1ZGV8QGltcG9ydHxAbWVkaWF8QGRlYnVnfEB3YXJufEBpZnxAZm9yfEBlYWNofEB3aGlsZXxAZWxzZXxAZm9udC1mYWNlfEAtd2Via2l0LWtleWZyYW1lc3xpZnxhbmR8IWRlZmF1bHR8bW9kdWxlfGRlZnxlbmR8ZGVjbGFyZVwiKS5zcGxpdChcInxcIilcbiAgICApO1xuICAgIFxuICAgIHZhciB0YWdzID0gbGFuZy5hcnJheVRvTWFwKFxuICAgICAgICAoXCJhfGFiYnJ8YWNyb255bXxhZGRyZXNzfGFwcGxldHxhcmVhfGFydGljbGV8YXNpZGV8YXVkaW98YnxiYXNlfGJhc2Vmb250fGJkb3xcIiArIFxuICAgICAgICAgXCJiaWd8YmxvY2txdW90ZXxib2R5fGJyfGJ1dHRvbnxjYW52YXN8Y2FwdGlvbnxjZW50ZXJ8Y2l0ZXxjb2RlfGNvbHxjb2xncm91cHxcIiArIFxuICAgICAgICAgXCJjb21tYW5kfGRhdGFsaXN0fGRkfGRlbHxkZXRhaWxzfGRmbnxkaXJ8ZGl2fGRsfGR0fGVtfGVtYmVkfGZpZWxkc2V0fFwiICsgXG4gICAgICAgICBcImZpZ2NhcHRpb258ZmlndXJlfGZvbnR8Zm9vdGVyfGZvcm18ZnJhbWV8ZnJhbWVzZXR8aDF8aDJ8aDN8aDR8aDV8aDZ8aGVhZHxcIiArIFxuICAgICAgICAgXCJoZWFkZXJ8aGdyb3VwfGhyfGh0bWx8aXxpZnJhbWV8aW1nfGlucHV0fGluc3xrZXlnZW58a2JkfGxhYmVsfGxlZ2VuZHxsaXxcIiArIFxuICAgICAgICAgXCJsaW5rfG1hcHxtYXJrfG1lbnV8bWV0YXxtZXRlcnxuYXZ8bm9mcmFtZXN8bm9zY3JpcHR8b2JqZWN0fG9sfG9wdGdyb3VwfFwiICsgXG4gICAgICAgICBcIm9wdGlvbnxvdXRwdXR8cHxwYXJhbXxwcmV8cHJvZ3Jlc3N8cXxycHxydHxydWJ5fHN8c2FtcHxzY3JpcHR8c2VjdGlvbnxzZWxlY3R8XCIgKyBcbiAgICAgICAgIFwic21hbGx8c291cmNlfHNwYW58c3RyaWtlfHN0cm9uZ3xzdHlsZXxzdWJ8c3VtbWFyeXxzdXB8dGFibGV8dGJvZHl8dGR8XCIgKyBcbiAgICAgICAgIFwidGV4dGFyZWF8dGZvb3R8dGh8dGhlYWR8dGltZXx0aXRsZXx0cnx0dHx1fHVsfHZhcnx2aWRlb3x3YnJ8eG1wXCIpLnNwbGl0KFwifFwiKVxuICAgICk7XG5cbiAgICAvLyByZWdleHAgbXVzdCBub3QgaGF2ZSBjYXB0dXJpbmcgcGFyZW50aGVzZXMuIFVzZSAoPzopIGluc3RlYWQuXG4gICAgLy8gcmVnZXhwcyBhcmUgb3JkZXJlZCAtPiB0aGUgZmlyc3QgbWF0Y2ggaXMgdXNlZFxuXG4gICAgdmFyIG51bVJlID0gXCJcXFxcLT8oPzooPzpbMC05XSspfCg/OlswLTldKlxcXFwuWzAtOV0rKSlcIjtcblxuICAgIC8vIHJlZ2V4cCBtdXN0IG5vdCBoYXZlIGNhcHR1cmluZyBwYXJlbnRoZXNlcy4gVXNlICg/OikgaW5zdGVhZC5cbiAgICAvLyByZWdleHBzIGFyZSBvcmRlcmVkIC0+IHRoZSBmaXJzdCBtYXRjaCBpcyB1c2VkXG5cbiAgICB0aGlzLiRydWxlcyA9IHtcbiAgICAgICAgXCJzdGFydFwiIDogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwvXFxcXC8uKiRcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudFwiLCAvLyBtdWx0aSBsaW5lIGNvbW1lbnRcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXC9cXFxcKlwiLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcImNvbW1lbnRcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIiwgLy8gc2luZ2xlIGxpbmVcbiAgICAgICAgICAgICAgICByZWdleCA6ICdbXCJdKD86KD86XFxcXFxcXFwuKXwoPzpbXlwiXFxcXFxcXFxdKSkqP1tcIl0nXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLCAvLyBtdWx0aSBsaW5lIHN0cmluZyBzdGFydFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogJ1tcIl0uKlxcXFxcXFxcJCcsXG4gICAgICAgICAgICAgICAgbmV4dCA6IFwicXFzdHJpbmdcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIiwgLy8gc2luZ2xlIGxpbmVcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiWyddKD86KD86XFxcXFxcXFwuKXwoPzpbXidcXFxcXFxcXF0pKSo/WyddXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsIC8vIG11bHRpIGxpbmUgc3RyaW5nIHN0YXJ0XG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlsnXS4qXFxcXFxcXFwkXCIsXG4gICAgICAgICAgICAgICAgbmV4dCA6IFwicXN0cmluZ1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IG51bVJlICsgXCIoPzpjaHxjbXxkZWd8ZW18ZXh8ZnJ8Z2R8Z3JhZHxIenxpbnxrSHp8bW18bXN8cGN8cHR8cHh8cmFkfHJlbXxzfHR1cm58dmh8dm1heHx2bWlufHZtfHZ3fCUpXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLCAvLyBoZXg2IGNvbG9yXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIiNbYS1mMC05XXs2fVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIiwgLy8gaGV4MyBjb2xvclxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIjW2EtZjAtOV17M31cIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5udW1lcmljXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBudW1SZVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogW1wic3VwcG9ydC5mdW5jdGlvblwiLCBcInN0cmluZ1wiLCBcInN1cHBvcnQuZnVuY3Rpb25cIl0sXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIih1cmxcXFxcKCkoLiopKFxcXFwpKVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eSh2YWx1ZS50b0xvd2VyQ2FzZSgpKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcInN1cHBvcnQudHlwZVwiO1xuICAgICAgICAgICAgICAgICAgICBpZiAoa2V5d29yZHMuaGFzT3duUHJvcGVydHkodmFsdWUpKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwia2V5d29yZFwiO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChjb25zdGFudHMuaGFzT3duUHJvcGVydHkodmFsdWUpKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiY29uc3RhbnQubGFuZ3VhZ2VcIjtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoZnVuY3Rpb25zLmhhc093blByb3BlcnR5KHZhbHVlKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcInN1cHBvcnQuZnVuY3Rpb25cIjtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoY29sb3JzLmhhc093blByb3BlcnR5KHZhbHVlLnRvTG93ZXJDYXNlKCkpKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwic3VwcG9ydC5jb25zdGFudC5jb2xvclwiO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0YWdzLmhhc093blByb3BlcnR5KHZhbHVlLnRvTG93ZXJDYXNlKCkpKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwidmFyaWFibGUubGFuZ3VhZ2VcIjtcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwidGV4dFwiO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwtP1tAYS16X11bQGEtejAtOV9cXFxcLV0qXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwidmFyaWFibGVcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiW2Etel9cXFxcLSRdW2EtejAtOV9cXFxcLSRdKlxcXFxiXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJ2YXJpYWJsZS5sYW5ndWFnZVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIiNbYS16MC05LV9dK1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwidmFyaWFibGUubGFuZ3VhZ2VcIixcbiAgICAgICAgICAgICAgICByZWdleDogXCJcXFxcLlthLXowLTktX10rXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJ2YXJpYWJsZS5sYW5ndWFnZVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIjpbYS16MC05LV9dK1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnRcIixcbiAgICAgICAgICAgICAgICByZWdleDogXCJbYS16MC05LV9dK1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImtleXdvcmQub3BlcmF0b3JcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiPHw+fDw9fD49fD09fCE9fC18JXwjfFxcXFwrfFxcXFwkfFxcXFwrfFxcXFwqXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwicGFyZW4ubHBhcmVuXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIltbKHtdXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwicGFyZW4ucnBhcmVuXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIltcXFxcXSl9XVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXHMrXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBjYXNlSW5zZW5zaXRpdmU6IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgXCJjb21tZW50XCIgOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIiwgLy8gY2xvc2luZyBjb21tZW50XG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwqXFxcXC9cIixcbiAgICAgICAgICAgICAgICBuZXh0IDogXCJzdGFydFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuIDogXCJjb21tZW50XCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgXCJxcXN0cmluZ1wiIDogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICByZWdleCA6ICcoPzooPzpcXFxcXFxcXC4pfCg/OlteXCJcXFxcXFxcXF0pKSo/XCInLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcInN0YXJ0XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAnLisnXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIFwicXN0cmluZ1wiIDogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiKD86KD86XFxcXFxcXFwuKXwoPzpbXidcXFxcXFxcXF0pKSo/J1wiLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcInN0YXJ0XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAnLisnXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9O1xufTtcblxub29wLmluaGVyaXRzKFNjc3NIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuZXhwb3J0cy5TY3NzSGlnaGxpZ2h0UnVsZXMgPSBTY3NzSGlnaGxpZ2h0UnVsZXM7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=