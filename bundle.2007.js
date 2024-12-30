"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[2007],{

/***/ 37028:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var oop = __webpack_require__(2645);
var Behaviour = (__webpack_require__(75684)/* .Behaviour */ .Q);
var CstyleBehaviour = (__webpack_require__(32589)/* .CstyleBehaviour */ ._);
var TokenIterator = (__webpack_require__(99339).TokenIterator);

/**@type {(new() => Partial<import("../../../ace-internal").Ace.Behaviour>)}*/
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQzNDLHFCQUFxQixxQkFBcUI7O0FBRTFDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQSxTQUFTO0FBQ1Q7QUFDQSx1QkFBdUI7QUFDdkIsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBLFNBQVM7QUFDVDtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBLFNBQVM7QUFDVDtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2IsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSx3QkFBd0I7QUFDeEIsU0FBUztBQUNUO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLCtCQUErQixFQUFFO0FBQ2pDLFNBQVM7QUFDVDtBQUNBLCtCQUErQixFQUFFO0FBQ2pDLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLHVCQUF1QjtBQUN2QixTQUFTO0FBQ1Q7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSwwQkFBMEIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2JlaGF2aW91ci9jc3MuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9jc3NfY29tcGxldGlvbnMuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9jc3NfaGlnaGxpZ2h0X3J1bGVzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvZm9sZGluZy9jc3R5bGUuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9tYXRjaGluZ19icmFjZV9vdXRkZW50LmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvc2Nzcy5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL3Njc3NfaGlnaGxpZ2h0X3J1bGVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi8uLi9saWIvb29wXCIpO1xudmFyIEJlaGF2aW91ciA9IHJlcXVpcmUoXCIuLi9iZWhhdmlvdXJcIikuQmVoYXZpb3VyO1xudmFyIENzdHlsZUJlaGF2aW91ciA9IHJlcXVpcmUoXCIuL2NzdHlsZVwiKS5Dc3R5bGVCZWhhdmlvdXI7XG52YXIgVG9rZW5JdGVyYXRvciA9IHJlcXVpcmUoXCIuLi8uLi90b2tlbl9pdGVyYXRvclwiKS5Ub2tlbkl0ZXJhdG9yO1xuXG4vKipAdHlwZSB7KG5ldygpID0+IFBhcnRpYWw8aW1wb3J0KFwiLi4vLi4vLi4vYWNlLWludGVybmFsXCIpLkFjZS5CZWhhdmlvdXI+KX0qL1xudmFyIENzc0JlaGF2aW91ciA9IGZ1bmN0aW9uICgpIHtcblxuICAgIHRoaXMuaW5oZXJpdChDc3R5bGVCZWhhdmlvdXIpO1xuXG4gICAgdGhpcy5hZGQoXCJjb2xvblwiLCBcImluc2VydGlvblwiLCBmdW5jdGlvbiAoc3RhdGUsIGFjdGlvbiwgZWRpdG9yLCBzZXNzaW9uLCB0ZXh0KSB7XG4gICAgICAgIGlmICh0ZXh0ID09PSAnOicgJiYgZWRpdG9yLnNlbGVjdGlvbi5pc0VtcHR5KCkpIHtcbiAgICAgICAgICAgIHZhciBjdXJzb3IgPSBlZGl0b3IuZ2V0Q3Vyc29yUG9zaXRpb24oKTtcbiAgICAgICAgICAgIHZhciBpdGVyYXRvciA9IG5ldyBUb2tlbkl0ZXJhdG9yKHNlc3Npb24sIGN1cnNvci5yb3csIGN1cnNvci5jb2x1bW4pO1xuICAgICAgICAgICAgdmFyIHRva2VuID0gaXRlcmF0b3IuZ2V0Q3VycmVudFRva2VuKCk7XG4gICAgICAgICAgICBpZiAodG9rZW4gJiYgdG9rZW4udmFsdWUubWF0Y2goL1xccysvKSkge1xuICAgICAgICAgICAgICAgIHRva2VuID0gaXRlcmF0b3Iuc3RlcEJhY2t3YXJkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodG9rZW4gJiYgdG9rZW4udHlwZSA9PT0gJ3N1cHBvcnQudHlwZScpIHtcbiAgICAgICAgICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZG9jLmdldExpbmUoY3Vyc29yLnJvdyk7XG4gICAgICAgICAgICAgICAgdmFyIHJpZ2h0Q2hhciA9IGxpbmUuc3Vic3RyaW5nKGN1cnNvci5jb2x1bW4sIGN1cnNvci5jb2x1bW4gKyAxKTtcbiAgICAgICAgICAgICAgICBpZiAocmlnaHRDaGFyID09PSAnOicpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogJycsXG4gICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogWzEsIDFdXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICgvXihcXHMrW147XXxcXHMqJCkvLnRlc3QobGluZS5zdWJzdHJpbmcoY3Vyc29yLmNvbHVtbikpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgIHRleHQ6ICc6OycsXG4gICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogWzEsIDFdXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLmFkZChcImNvbG9uXCIsIFwiZGVsZXRpb25cIiwgZnVuY3Rpb24gKHN0YXRlLCBhY3Rpb24sIGVkaXRvciwgc2Vzc2lvbiwgcmFuZ2UpIHtcbiAgICAgICAgdmFyIHNlbGVjdGVkID0gc2Vzc2lvbi5kb2MuZ2V0VGV4dFJhbmdlKHJhbmdlKTtcbiAgICAgICAgaWYgKCFyYW5nZS5pc011bHRpTGluZSgpICYmIHNlbGVjdGVkID09PSAnOicpIHtcbiAgICAgICAgICAgIHZhciBjdXJzb3IgPSBlZGl0b3IuZ2V0Q3Vyc29yUG9zaXRpb24oKTtcbiAgICAgICAgICAgIHZhciBpdGVyYXRvciA9IG5ldyBUb2tlbkl0ZXJhdG9yKHNlc3Npb24sIGN1cnNvci5yb3csIGN1cnNvci5jb2x1bW4pO1xuICAgICAgICAgICAgdmFyIHRva2VuID0gaXRlcmF0b3IuZ2V0Q3VycmVudFRva2VuKCk7XG4gICAgICAgICAgICBpZiAodG9rZW4gJiYgdG9rZW4udmFsdWUubWF0Y2goL1xccysvKSkge1xuICAgICAgICAgICAgICAgIHRva2VuID0gaXRlcmF0b3Iuc3RlcEJhY2t3YXJkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodG9rZW4gJiYgdG9rZW4udHlwZSA9PT0gJ3N1cHBvcnQudHlwZScpIHtcbiAgICAgICAgICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZG9jLmdldExpbmUocmFuZ2Uuc3RhcnQucm93KTtcbiAgICAgICAgICAgICAgICB2YXIgcmlnaHRDaGFyID0gbGluZS5zdWJzdHJpbmcocmFuZ2UuZW5kLmNvbHVtbiwgcmFuZ2UuZW5kLmNvbHVtbiArIDEpO1xuICAgICAgICAgICAgICAgIGlmIChyaWdodENoYXIgPT09ICc7Jykge1xuICAgICAgICAgICAgICAgICAgICByYW5nZS5lbmQuY29sdW1uICsrO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmFuZ2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLmFkZChcInNlbWljb2xvblwiLCBcImluc2VydGlvblwiLCBmdW5jdGlvbiAoc3RhdGUsIGFjdGlvbiwgZWRpdG9yLCBzZXNzaW9uLCB0ZXh0KSB7XG4gICAgICAgIGlmICh0ZXh0ID09PSAnOycgJiYgZWRpdG9yLnNlbGVjdGlvbi5pc0VtcHR5KCkpIHtcbiAgICAgICAgICAgIHZhciBjdXJzb3IgPSBlZGl0b3IuZ2V0Q3Vyc29yUG9zaXRpb24oKTtcbiAgICAgICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5kb2MuZ2V0TGluZShjdXJzb3Iucm93KTtcbiAgICAgICAgICAgIHZhciByaWdodENoYXIgPSBsaW5lLnN1YnN0cmluZyhjdXJzb3IuY29sdW1uLCBjdXJzb3IuY29sdW1uICsgMSk7XG4gICAgICAgICAgICBpZiAocmlnaHRDaGFyID09PSAnOycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgIHRleHQ6ICcnLFxuICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogWzEsIDFdXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5hZGQoXCIhaW1wb3J0YW50XCIsIFwiaW5zZXJ0aW9uXCIsIGZ1bmN0aW9uIChzdGF0ZSwgYWN0aW9uLCBlZGl0b3IsIHNlc3Npb24sIHRleHQpIHtcbiAgICAgICAgaWYgKHRleHQgPT09ICchJyAmJiBlZGl0b3Iuc2VsZWN0aW9uLmlzRW1wdHkoKSkge1xuICAgICAgICAgICAgdmFyIGN1cnNvciA9IGVkaXRvci5nZXRDdXJzb3JQb3NpdGlvbigpO1xuICAgICAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmRvYy5nZXRMaW5lKGN1cnNvci5yb3cpO1xuXG4gICAgICAgICAgICBpZiAoL15cXHMqKDt8fXwkKS8udGVzdChsaW5lLnN1YnN0cmluZyhjdXJzb3IuY29sdW1uKSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnIWltcG9ydGFudCcsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogWzEwLCAxMF1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbn07XG5vb3AuaW5oZXJpdHMoQ3NzQmVoYXZpb3VyLCBDc3R5bGVCZWhhdmlvdXIpO1xuXG5leHBvcnRzLkNzc0JlaGF2aW91ciA9IENzc0JlaGF2aW91cjtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgcHJvcGVydHlNYXAgPSB7XG4gICAgXCJiYWNrZ3JvdW5kXCI6IHtcIiMkMFwiOiAxfSxcbiAgICBcImJhY2tncm91bmQtY29sb3JcIjoge1wiIyQwXCI6IDEsIFwidHJhbnNwYXJlbnRcIjogMSwgXCJmaXhlZFwiOiAxfSxcbiAgICBcImJhY2tncm91bmQtaW1hZ2VcIjoge1widXJsKCcvJDAnKVwiOiAxfSxcbiAgICBcImJhY2tncm91bmQtcmVwZWF0XCI6IHtcInJlcGVhdFwiOiAxLCBcInJlcGVhdC14XCI6IDEsIFwicmVwZWF0LXlcIjogMSwgXCJuby1yZXBlYXRcIjogMSwgXCJpbmhlcml0XCI6IDF9LFxuICAgIFwiYmFja2dyb3VuZC1wb3NpdGlvblwiOiB7XCJib3R0b21cIjoyLCBcImNlbnRlclwiOjIsIFwibGVmdFwiOjIsIFwicmlnaHRcIjoyLCBcInRvcFwiOjIsIFwiaW5oZXJpdFwiOjJ9LFxuICAgIFwiYmFja2dyb3VuZC1hdHRhY2htZW50XCI6IHtcInNjcm9sbFwiOiAxLCBcImZpeGVkXCI6IDF9LFxuICAgIFwiYmFja2dyb3VuZC1zaXplXCI6IHtcImNvdmVyXCI6IDEsIFwiY29udGFpblwiOiAxfSxcbiAgICBcImJhY2tncm91bmQtY2xpcFwiOiB7XCJib3JkZXItYm94XCI6IDEsIFwicGFkZGluZy1ib3hcIjogMSwgXCJjb250ZW50LWJveFwiOiAxfSxcbiAgICBcImJhY2tncm91bmQtb3JpZ2luXCI6IHtcImJvcmRlci1ib3hcIjogMSwgXCJwYWRkaW5nLWJveFwiOiAxLCBcImNvbnRlbnQtYm94XCI6IDF9LFxuICAgIFwiYm9yZGVyXCI6IHtcInNvbGlkICQwXCI6IDEsIFwiZGFzaGVkICQwXCI6IDEsIFwiZG90dGVkICQwXCI6IDEsIFwiIyQwXCI6IDF9LFxuICAgIFwiYm9yZGVyLWNvbG9yXCI6IHtcIiMkMFwiOiAxfSxcbiAgICBcImJvcmRlci1zdHlsZVwiOiB7XCJzb2xpZFwiOjIsIFwiZGFzaGVkXCI6MiwgXCJkb3R0ZWRcIjoyLCBcImRvdWJsZVwiOjIsIFwiZ3Jvb3ZlXCI6MiwgXCJoaWRkZW5cIjoyLCBcImluaGVyaXRcIjoyLCBcImluc2V0XCI6MiwgXCJub25lXCI6MiwgXCJvdXRzZXRcIjoyLCBcInJpZGdlZFwiOjJ9LFxuICAgIFwiYm9yZGVyLWNvbGxhcHNlXCI6IHtcImNvbGxhcHNlXCI6IDEsIFwic2VwYXJhdGVcIjogMX0sXG4gICAgXCJib3R0b21cIjoge1wicHhcIjogMSwgXCJlbVwiOiAxLCBcIiVcIjogMX0sXG4gICAgXCJjbGVhclwiOiB7XCJsZWZ0XCI6IDEsIFwicmlnaHRcIjogMSwgXCJib3RoXCI6IDEsIFwibm9uZVwiOiAxfSxcbiAgICBcImNvbG9yXCI6IHtcIiMkMFwiOiAxLCBcInJnYigjJDAwLDAsMClcIjogMX0sXG4gICAgXCJjdXJzb3JcIjoge1wiZGVmYXVsdFwiOiAxLCBcInBvaW50ZXJcIjogMSwgXCJtb3ZlXCI6IDEsIFwidGV4dFwiOiAxLCBcIndhaXRcIjogMSwgXCJoZWxwXCI6IDEsIFwicHJvZ3Jlc3NcIjogMSwgXCJuLXJlc2l6ZVwiOiAxLCBcIm5lLXJlc2l6ZVwiOiAxLCBcImUtcmVzaXplXCI6IDEsIFwic2UtcmVzaXplXCI6IDEsIFwicy1yZXNpemVcIjogMSwgXCJzdy1yZXNpemVcIjogMSwgXCJ3LXJlc2l6ZVwiOiAxLCBcIm53LXJlc2l6ZVwiOiAxfSxcbiAgICBcImRpc3BsYXlcIjoge1wibm9uZVwiOiAxLCBcImJsb2NrXCI6IDEsIFwiaW5saW5lXCI6IDEsIFwiaW5saW5lLWJsb2NrXCI6IDEsIFwidGFibGUtY2VsbFwiOiAxfSxcbiAgICBcImVtcHR5LWNlbGxzXCI6IHtcInNob3dcIjogMSwgXCJoaWRlXCI6IDF9LFxuICAgIFwiZmxvYXRcIjoge1wibGVmdFwiOiAxLCBcInJpZ2h0XCI6IDEsIFwibm9uZVwiOiAxfSxcbiAgICBcImZvbnQtZmFtaWx5XCI6IHtcIkFyaWFsXCI6MixcIkNvbWljIFNhbnMgTVNcIjoyLFwiQ29uc29sYXNcIjoyLFwiQ291cmllciBOZXdcIjoyLFwiQ291cmllclwiOjIsXCJHZW9yZ2lhXCI6MixcIk1vbm9zcGFjZVwiOjIsXCJTYW5zLVNlcmlmXCI6MiwgXCJTZWdvZSBVSVwiOjIsXCJUYWhvbWFcIjoyLFwiVGltZXMgTmV3IFJvbWFuXCI6MixcIlRyZWJ1Y2hldCBNU1wiOjIsXCJWZXJkYW5hXCI6IDF9LFxuICAgIFwiZm9udC1zaXplXCI6IHtcInB4XCI6IDEsIFwiZW1cIjogMSwgXCIlXCI6IDF9LFxuICAgIFwiZm9udC13ZWlnaHRcIjoge1wiYm9sZFwiOiAxLCBcIm5vcm1hbFwiOiAxfSxcbiAgICBcImZvbnQtc3R5bGVcIjoge1wiaXRhbGljXCI6IDEsIFwibm9ybWFsXCI6IDF9LFxuICAgIFwiZm9udC12YXJpYW50XCI6IHtcIm5vcm1hbFwiOiAxLCBcInNtYWxsLWNhcHNcIjogMX0sXG4gICAgXCJoZWlnaHRcIjoge1wicHhcIjogMSwgXCJlbVwiOiAxLCBcIiVcIjogMX0sXG4gICAgXCJsZWZ0XCI6IHtcInB4XCI6IDEsIFwiZW1cIjogMSwgXCIlXCI6IDF9LFxuICAgIFwibGV0dGVyLXNwYWNpbmdcIjoge1wibm9ybWFsXCI6IDF9LFxuICAgIFwibGluZS1oZWlnaHRcIjoge1wibm9ybWFsXCI6IDF9LFxuICAgIFwibGlzdC1zdHlsZS10eXBlXCI6IHtcIm5vbmVcIjogMSwgXCJkaXNjXCI6IDEsIFwiY2lyY2xlXCI6IDEsIFwic3F1YXJlXCI6IDEsIFwiZGVjaW1hbFwiOiAxLCBcImRlY2ltYWwtbGVhZGluZy16ZXJvXCI6IDEsIFwibG93ZXItcm9tYW5cIjogMSwgXCJ1cHBlci1yb21hblwiOiAxLCBcImxvd2VyLWdyZWVrXCI6IDEsIFwibG93ZXItbGF0aW5cIjogMSwgXCJ1cHBlci1sYXRpblwiOiAxLCBcImdlb3JnaWFuXCI6IDEsIFwibG93ZXItYWxwaGFcIjogMSwgXCJ1cHBlci1hbHBoYVwiOiAxfSxcbiAgICBcIm1hcmdpblwiOiB7XCJweFwiOiAxLCBcImVtXCI6IDEsIFwiJVwiOiAxfSxcbiAgICBcIm1hcmdpbi1yaWdodFwiOiB7XCJweFwiOiAxLCBcImVtXCI6IDEsIFwiJVwiOiAxfSxcbiAgICBcIm1hcmdpbi1sZWZ0XCI6IHtcInB4XCI6IDEsIFwiZW1cIjogMSwgXCIlXCI6IDF9LFxuICAgIFwibWFyZ2luLXRvcFwiOiB7XCJweFwiOiAxLCBcImVtXCI6IDEsIFwiJVwiOiAxfSxcbiAgICBcIm1hcmdpbi1ib3R0b21cIjoge1wicHhcIjogMSwgXCJlbVwiOiAxLCBcIiVcIjogMX0sXG4gICAgXCJtYXgtaGVpZ2h0XCI6IHtcInB4XCI6IDEsIFwiZW1cIjogMSwgXCIlXCI6IDF9LFxuICAgIFwibWF4LXdpZHRoXCI6IHtcInB4XCI6IDEsIFwiZW1cIjogMSwgXCIlXCI6IDF9LFxuICAgIFwibWluLWhlaWdodFwiOiB7XCJweFwiOiAxLCBcImVtXCI6IDEsIFwiJVwiOiAxfSxcbiAgICBcIm1pbi13aWR0aFwiOiB7XCJweFwiOiAxLCBcImVtXCI6IDEsIFwiJVwiOiAxfSxcbiAgICBcIm92ZXJmbG93XCI6IHtcImhpZGRlblwiOiAxLCBcInZpc2libGVcIjogMSwgXCJhdXRvXCI6IDEsIFwic2Nyb2xsXCI6IDF9LFxuICAgIFwib3ZlcmZsb3cteFwiOiB7XCJoaWRkZW5cIjogMSwgXCJ2aXNpYmxlXCI6IDEsIFwiYXV0b1wiOiAxLCBcInNjcm9sbFwiOiAxfSxcbiAgICBcIm92ZXJmbG93LXlcIjoge1wiaGlkZGVuXCI6IDEsIFwidmlzaWJsZVwiOiAxLCBcImF1dG9cIjogMSwgXCJzY3JvbGxcIjogMX0sXG4gICAgXCJwYWRkaW5nXCI6IHtcInB4XCI6IDEsIFwiZW1cIjogMSwgXCIlXCI6IDF9LFxuICAgIFwicGFkZGluZy10b3BcIjoge1wicHhcIjogMSwgXCJlbVwiOiAxLCBcIiVcIjogMX0sXG4gICAgXCJwYWRkaW5nLXJpZ2h0XCI6IHtcInB4XCI6IDEsIFwiZW1cIjogMSwgXCIlXCI6IDF9LFxuICAgIFwicGFkZGluZy1ib3R0b21cIjoge1wicHhcIjogMSwgXCJlbVwiOiAxLCBcIiVcIjogMX0sXG4gICAgXCJwYWRkaW5nLWxlZnRcIjoge1wicHhcIjogMSwgXCJlbVwiOiAxLCBcIiVcIjogMX0sXG4gICAgXCJwYWdlLWJyZWFrLWFmdGVyXCI6IHtcImF1dG9cIjogMSwgXCJhbHdheXNcIjogMSwgXCJhdm9pZFwiOiAxLCBcImxlZnRcIjogMSwgXCJyaWdodFwiOiAxfSxcbiAgICBcInBhZ2UtYnJlYWstYmVmb3JlXCI6IHtcImF1dG9cIjogMSwgXCJhbHdheXNcIjogMSwgXCJhdm9pZFwiOiAxLCBcImxlZnRcIjogMSwgXCJyaWdodFwiOiAxfSxcbiAgICBcInBvc2l0aW9uXCI6IHtcImFic29sdXRlXCI6IDEsIFwicmVsYXRpdmVcIjogMSwgXCJmaXhlZFwiOiAxLCBcInN0YXRpY1wiOiAxfSxcbiAgICBcInJpZ2h0XCI6IHtcInB4XCI6IDEsIFwiZW1cIjogMSwgXCIlXCI6IDF9LFxuICAgIFwidGFibGUtbGF5b3V0XCI6IHtcImZpeGVkXCI6IDEsIFwiYXV0b1wiOiAxfSxcbiAgICBcInRleHQtZGVjb3JhdGlvblwiOiB7XCJub25lXCI6IDEsIFwidW5kZXJsaW5lXCI6IDEsIFwibGluZS10aHJvdWdoXCI6IDEsIFwiYmxpbmtcIjogMX0sXG4gICAgXCJ0ZXh0LWFsaWduXCI6IHtcImxlZnRcIjogMSwgXCJyaWdodFwiOiAxLCBcImNlbnRlclwiOiAxLCBcImp1c3RpZnlcIjogMX0sXG4gICAgXCJ0ZXh0LXRyYW5zZm9ybVwiOiB7XCJjYXBpdGFsaXplXCI6IDEsIFwidXBwZXJjYXNlXCI6IDEsIFwibG93ZXJjYXNlXCI6IDEsIFwibm9uZVwiOiAxfSxcbiAgICBcInRvcFwiOiB7XCJweFwiOiAxLCBcImVtXCI6IDEsIFwiJVwiOiAxfSxcbiAgICBcInZlcnRpY2FsLWFsaWduXCI6IHtcInRvcFwiOiAxLCBcImJvdHRvbVwiOiAxfSxcbiAgICBcInZpc2liaWxpdHlcIjoge1wiaGlkZGVuXCI6IDEsIFwidmlzaWJsZVwiOiAxfSxcbiAgICBcIndoaXRlLXNwYWNlXCI6IHtcIm5vd3JhcFwiOiAxLCBcIm5vcm1hbFwiOiAxLCBcInByZVwiOiAxLCBcInByZS1saW5lXCI6IDEsIFwicHJlLXdyYXBcIjogMX0sXG4gICAgXCJ3aWR0aFwiOiB7XCJweFwiOiAxLCBcImVtXCI6IDEsIFwiJVwiOiAxfSxcbiAgICBcIndvcmQtc3BhY2luZ1wiOiB7XCJub3JtYWxcIjogMX0sXG5cbiAgICAvLyBvcGFjaXR5XG4gICAgXCJmaWx0ZXJcIjoge1wiYWxwaGEob3BhY2l0eT0kMDEwMClcIjogMX0sXG5cbiAgICBcInRleHQtc2hhZG93XCI6IHtcIiQwMnB4IDJweCAycHggIzc3N1wiOiAxfSxcbiAgICBcInRleHQtb3ZlcmZsb3dcIjoge1wiZWxsaXBzaXMtd29yZFwiOiAxLCBcImNsaXBcIjogMSwgXCJlbGxpcHNpc1wiOiAxfSxcblxuICAgIC8vIGJvcmRlciByYWRpdXNcbiAgICBcIi1tb3otYm9yZGVyLXJhZGl1c1wiOiAxLFxuICAgIFwiLW1vei1ib3JkZXItcmFkaXVzLXRvcHJpZ2h0XCI6IDEsXG4gICAgXCItbW96LWJvcmRlci1yYWRpdXMtYm90dG9tcmlnaHRcIjogMSxcbiAgICBcIi1tb3otYm9yZGVyLXJhZGl1cy10b3BsZWZ0XCI6IDEsXG4gICAgXCItbW96LWJvcmRlci1yYWRpdXMtYm90dG9tbGVmdFwiOiAxLFxuICAgIFwiLXdlYmtpdC1ib3JkZXItcmFkaXVzXCI6IDEsXG4gICAgXCItd2Via2l0LWJvcmRlci10b3AtcmlnaHQtcmFkaXVzXCI6IDEsXG4gICAgXCItd2Via2l0LWJvcmRlci10b3AtbGVmdC1yYWRpdXNcIjogMSxcbiAgICBcIi13ZWJraXQtYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXNcIjogMSxcbiAgICBcIi13ZWJraXQtYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1c1wiOiAxLFxuXG4gICAgLy8gZHJvcHNoYWRvd3NcbiAgICBcIi1tb3otYm94LXNoYWRvd1wiOiAxLFxuICAgIFwiLXdlYmtpdC1ib3gtc2hhZG93XCI6IDEsXG5cbiAgICAvLyB0cmFuc2Zvcm1hdGlvbnNcbiAgICBcInRyYW5zZm9ybVwiOiB7XCJyb3RhdGUoJDAwZGVnKVwiOiAxLCBcInNrZXcoJDAwZGVnKVwiOiAxfSxcbiAgICBcIi1tb3otdHJhbnNmb3JtXCI6IHtcInJvdGF0ZSgkMDBkZWcpXCI6IDEsIFwic2tldygkMDBkZWcpXCI6IDF9LFxuICAgIFwiLXdlYmtpdC10cmFuc2Zvcm1cIjoge1wicm90YXRlKCQwMGRlZylcIjogMSwgXCJza2V3KCQwMGRlZylcIjogMSB9XG59O1xuXG52YXIgQ3NzQ29tcGxldGlvbnMgPSBmdW5jdGlvbigpIHtcblxufTtcblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5jb21wbGV0aW9uc0RlZmluZWQgPSBmYWxzZTtcblxuICAgIHRoaXMuZGVmaW5lQ29tcGxldGlvbnMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgLy9maWxsIGluIG1pc3NpbmcgcHJvcGVydGllc1xuICAgICAgICBpZiAoZG9jdW1lbnQpIHtcbiAgICAgICAgICAgIHZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2MnKS5zdHlsZTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBzdHlsZSkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygc3R5bGVbaV0gIT09ICdzdHJpbmcnKVxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcblxuICAgICAgICAgICAgICAgIHZhciBuYW1lID0gaS5yZXBsYWNlKC9bQS1aXS9nLCBmdW5jdGlvbih4KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnLScgKyB4LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXByb3BlcnR5TWFwLmhhc093blByb3BlcnR5KG5hbWUpKVxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eU1hcFtuYW1lXSA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNvbXBsZXRpb25zRGVmaW5lZCA9IHRydWU7XG4gICAgfTtcblxuICAgIHRoaXMuZ2V0Q29tcGxldGlvbnMgPSBmdW5jdGlvbihzdGF0ZSwgc2Vzc2lvbiwgcG9zLCBwcmVmaXgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNvbXBsZXRpb25zRGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5kZWZpbmVDb21wbGV0aW9ucygpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN0YXRlPT09J3J1bGVzZXQnIHx8IHNlc3Npb24uJG1vZGUuJGlkID09IFwiYWNlL21vZGUvc2Nzc1wiKSB7XG4gICAgICAgICAgICAvL2NzcyBhdHRyaWJ1dGUgdmFsdWVcbiAgICAgICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHBvcy5yb3cpLnN1YnN0cigwLCBwb3MuY29sdW1uKTtcbiAgICAgICAgICAgIHZhciBpblBhcmVucyA9IC9cXChbXildKiQvLnRlc3QobGluZSk7XG4gICAgICAgICAgICBpZiAoaW5QYXJlbnMpIHtcbiAgICAgICAgICAgICAgICBsaW5lID0gbGluZS5zdWJzdHIobGluZS5sYXN0SW5kZXhPZignKCcpICsgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoLzpbXjtdKyQvLnRlc3QobGluZSkpIHtcbiAgICAgICAgICAgICAgICAvKFtcXHdcXC1dKyk6W146XSokLy50ZXN0KGxpbmUpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UHJvcGVydHlWYWx1ZUNvbXBsZXRpb25zKHN0YXRlLCBzZXNzaW9uLCBwb3MsIHByZWZpeCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFByb3BlcnR5Q29tcGxldGlvbnMoc3RhdGUsIHNlc3Npb24sIHBvcywgcHJlZml4LCBpblBhcmVucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gW107XG4gICAgfTtcblxuICAgIHRoaXMuZ2V0UHJvcGVydHlDb21wbGV0aW9ucyA9IGZ1bmN0aW9uKHN0YXRlLCBzZXNzaW9uLCBwb3MsIHByZWZpeCwgc2tpcFNlbWljb2xvbikge1xuICAgICAgICBza2lwU2VtaWNvbG9uID0gc2tpcFNlbWljb2xvbiB8fCBmYWxzZTtcbiAgICAgICAgdmFyIHByb3BlcnRpZXMgPSBPYmplY3Qua2V5cyhwcm9wZXJ0eU1hcCk7XG4gICAgICAgIHJldHVybiBwcm9wZXJ0aWVzLm1hcChmdW5jdGlvbihwcm9wZXJ0eSl7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGNhcHRpb246IHByb3BlcnR5LFxuICAgICAgICAgICAgICAgIHNuaXBwZXQ6IHByb3BlcnR5ICsgJzogJDAnICsgKHNraXBTZW1pY29sb24gPyAnJyA6ICc7JyksXG4gICAgICAgICAgICAgICAgbWV0YTogXCJwcm9wZXJ0eVwiLFxuICAgICAgICAgICAgICAgIHNjb3JlOiAxMDAwMDAwXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRQcm9wZXJ0eVZhbHVlQ29tcGxldGlvbnMgPSBmdW5jdGlvbihzdGF0ZSwgc2Vzc2lvbiwgcG9zLCBwcmVmaXgpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocG9zLnJvdykuc3Vic3RyKDAsIHBvcy5jb2x1bW4pO1xuICAgICAgICB2YXIgcHJvcGVydHkgPSAoLyhbXFx3XFwtXSspOlteOl0qJC8uZXhlYyhsaW5lKSB8fCB7fSlbMV07XG5cbiAgICAgICAgaWYgKCFwcm9wZXJ0eSlcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgdmFyIHZhbHVlcyA9IFtdO1xuICAgICAgICBpZiAocHJvcGVydHkgaW4gcHJvcGVydHlNYXAgJiYgdHlwZW9mIHByb3BlcnR5TWFwW3Byb3BlcnR5XSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgdmFsdWVzID0gT2JqZWN0LmtleXMocHJvcGVydHlNYXBbcHJvcGVydHldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWVzLm1hcChmdW5jdGlvbih2YWx1ZSl7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGNhcHRpb246IHZhbHVlLFxuICAgICAgICAgICAgICAgIHNuaXBwZXQ6IHZhbHVlLFxuICAgICAgICAgICAgICAgIG1ldGE6IFwicHJvcGVydHkgdmFsdWVcIixcbiAgICAgICAgICAgICAgICBzY29yZTogMTAwMDAwMFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxufSkuY2FsbChDc3NDb21wbGV0aW9ucy5wcm90b3R5cGUpO1xuXG5leHBvcnRzLkNzc0NvbXBsZXRpb25zID0gQ3NzQ29tcGxldGlvbnM7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIGxhbmcgPSByZXF1aXJlKFwiLi4vbGliL2xhbmdcIik7XG52YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xuXG5cbi8qIEV4cG9ydHMgYXJlIGZvciBTdHlsdXMgYW5kIExlc3MgaGlnaGxpZ2h0ZXJzICovXG52YXIgc3VwcG9ydFR5cGUgPSBleHBvcnRzLnN1cHBvcnRUeXBlID0gXCJhbGlnbi1jb250ZW50fGFsaWduLWl0ZW1zfGFsaWduLXNlbGZ8YWxsfGFuaW1hdGlvbnxhbmltYXRpb24tZGVsYXl8YW5pbWF0aW9uLWRpcmVjdGlvbnxhbmltYXRpb24tZHVyYXRpb258YW5pbWF0aW9uLWZpbGwtbW9kZXxhbmltYXRpb24taXRlcmF0aW9uLWNvdW50fGFuaW1hdGlvbi1uYW1lfGFuaW1hdGlvbi1wbGF5LXN0YXRlfGFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb258YmFja2ZhY2UtdmlzaWJpbGl0eXxiYWNrZ3JvdW5kfGJhY2tncm91bmQtYXR0YWNobWVudHxiYWNrZ3JvdW5kLWJsZW5kLW1vZGV8YmFja2dyb3VuZC1jbGlwfGJhY2tncm91bmQtY29sb3J8YmFja2dyb3VuZC1pbWFnZXxiYWNrZ3JvdW5kLW9yaWdpbnxiYWNrZ3JvdW5kLXBvc2l0aW9ufGJhY2tncm91bmQtcmVwZWF0fGJhY2tncm91bmQtc2l6ZXxib3JkZXJ8Ym9yZGVyLWJvdHRvbXxib3JkZXItYm90dG9tLWNvbG9yfGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXN8Ym9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXN8Ym9yZGVyLWJvdHRvbS1zdHlsZXxib3JkZXItYm90dG9tLXdpZHRofGJvcmRlci1jb2xsYXBzZXxib3JkZXItY29sb3J8Ym9yZGVyLWltYWdlfGJvcmRlci1pbWFnZS1vdXRzZXR8Ym9yZGVyLWltYWdlLXJlcGVhdHxib3JkZXItaW1hZ2Utc2xpY2V8Ym9yZGVyLWltYWdlLXNvdXJjZXxib3JkZXItaW1hZ2Utd2lkdGh8Ym9yZGVyLWxlZnR8Ym9yZGVyLWxlZnQtY29sb3J8Ym9yZGVyLWxlZnQtc3R5bGV8Ym9yZGVyLWxlZnQtd2lkdGh8Ym9yZGVyLXJhZGl1c3xib3JkZXItcmlnaHR8Ym9yZGVyLXJpZ2h0LWNvbG9yfGJvcmRlci1yaWdodC1zdHlsZXxib3JkZXItcmlnaHQtd2lkdGh8Ym9yZGVyLXNwYWNpbmd8Ym9yZGVyLXN0eWxlfGJvcmRlci10b3B8Ym9yZGVyLXRvcC1jb2xvcnxib3JkZXItdG9wLWxlZnQtcmFkaXVzfGJvcmRlci10b3AtcmlnaHQtcmFkaXVzfGJvcmRlci10b3Atc3R5bGV8Ym9yZGVyLXRvcC13aWR0aHxib3JkZXItd2lkdGh8Ym90dG9tfGJveC1zaGFkb3d8Ym94LXNpemluZ3xjYXB0aW9uLXNpZGV8Y2xlYXJ8Y2xpcHxjb2xvcnxjb2x1bW4tY291bnR8Y29sdW1uLWZpbGx8Y29sdW1uLWdhcHxjb2x1bW4tcnVsZXxjb2x1bW4tcnVsZS1jb2xvcnxjb2x1bW4tcnVsZS1zdHlsZXxjb2x1bW4tcnVsZS13aWR0aHxjb2x1bW4tc3Bhbnxjb2x1bW4td2lkdGh8Y29sdW1uc3xjb250ZW50fGNvdW50ZXItaW5jcmVtZW50fGNvdW50ZXItcmVzZXR8Y3Vyc29yfGRpcmVjdGlvbnxkaXNwbGF5fGVtcHR5LWNlbGxzfGZpbHRlcnxmbGV4fGZsZXgtYmFzaXN8ZmxleC1kaXJlY3Rpb258ZmxleC1mbG93fGZsZXgtZ3Jvd3xmbGV4LXNocmlua3xmbGV4LXdyYXB8ZmxvYXR8Zm9udHxmb250LWZhbWlseXxmb250LXNpemV8Zm9udC1zaXplLWFkanVzdHxmb250LXN0cmV0Y2h8Zm9udC1zdHlsZXxmb250LXZhcmlhbnR8Zm9udC13ZWlnaHR8aGFuZ2luZy1wdW5jdHVhdGlvbnxoZWlnaHR8anVzdGlmeS1jb250ZW50fGxlZnR8bGV0dGVyLXNwYWNpbmd8bGluZS1oZWlnaHR8bGlzdC1zdHlsZXxsaXN0LXN0eWxlLWltYWdlfGxpc3Qtc3R5bGUtcG9zaXRpb258bGlzdC1zdHlsZS10eXBlfG1hcmdpbnxtYXJnaW4tYm90dG9tfG1hcmdpbi1sZWZ0fG1hcmdpbi1yaWdodHxtYXJnaW4tdG9wfG1heC1oZWlnaHR8bWF4LXdpZHRofG1heC16b29tfG1pbi1oZWlnaHR8bWluLXdpZHRofG1pbi16b29tfG5hdi1kb3dufG5hdi1pbmRleHxuYXYtbGVmdHxuYXYtcmlnaHR8bmF2LXVwfG9wYWNpdHl8b3JkZXJ8b3V0bGluZXxvdXRsaW5lLWNvbG9yfG91dGxpbmUtb2Zmc2V0fG91dGxpbmUtc3R5bGV8b3V0bGluZS13aWR0aHxvdmVyZmxvd3xvdmVyZmxvdy14fG92ZXJmbG93LXl8cGFkZGluZ3xwYWRkaW5nLWJvdHRvbXxwYWRkaW5nLWxlZnR8cGFkZGluZy1yaWdodHxwYWRkaW5nLXRvcHxwYWdlLWJyZWFrLWFmdGVyfHBhZ2UtYnJlYWstYmVmb3JlfHBhZ2UtYnJlYWstaW5zaWRlfHBlcnNwZWN0aXZlfHBlcnNwZWN0aXZlLW9yaWdpbnxwb3NpdGlvbnxxdW90ZXN8cmVzaXplfHJpZ2h0fHRhYi1zaXplfHRhYmxlLWxheW91dHx0ZXh0LWFsaWdufHRleHQtYWxpZ24tbGFzdHx0ZXh0LWRlY29yYXRpb258dGV4dC1kZWNvcmF0aW9uLWNvbG9yfHRleHQtZGVjb3JhdGlvbi1saW5lfHRleHQtZGVjb3JhdGlvbi1zdHlsZXx0ZXh0LWluZGVudHx0ZXh0LWp1c3RpZnl8dGV4dC1vdmVyZmxvd3x0ZXh0LXNoYWRvd3x0ZXh0LXRyYW5zZm9ybXx0b3B8dHJhbnNmb3JtfHRyYW5zZm9ybS1vcmlnaW58dHJhbnNmb3JtLXN0eWxlfHRyYW5zaXRpb258dHJhbnNpdGlvbi1kZWxheXx0cmFuc2l0aW9uLWR1cmF0aW9ufHRyYW5zaXRpb24tcHJvcGVydHl8dHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb258dW5pY29kZS1iaWRpfHVzZXItc2VsZWN0fHVzZXItem9vbXx2ZXJ0aWNhbC1hbGlnbnx2aXNpYmlsaXR5fHdoaXRlLXNwYWNlfHdpZHRofHdvcmQtYnJlYWt8d29yZC1zcGFjaW5nfHdvcmQtd3JhcHx6LWluZGV4XCI7XG52YXIgc3VwcG9ydEZ1bmN0aW9uID0gZXhwb3J0cy5zdXBwb3J0RnVuY3Rpb24gPSBcInJnYnxyZ2JhfHVybHxhdHRyfGNvdW50ZXJ8Y291bnRlcnNcIjtcbnZhciBzdXBwb3J0Q29uc3RhbnQgPSBleHBvcnRzLnN1cHBvcnRDb25zdGFudCA9IFwiYWJzb2x1dGV8YWZ0ZXItZWRnZXxhZnRlcnxhbGwtc2Nyb2xsfGFsbHxhbHBoYWJldGljfGFsd2F5c3xhbnRpYWxpYXNlZHxhcm1lbmlhbnxhdXRvfGF2b2lkLWNvbHVtbnxhdm9pZC1wYWdlfGF2b2lkfGJhbGFuY2V8YmFzZWxpbmV8YmVmb3JlLWVkZ2V8YmVmb3JlfGJlbG93fGJpZGktb3ZlcnJpZGV8YmxvY2stbGluZS1oZWlnaHR8YmxvY2t8Ym9sZHxib2xkZXJ8Ym9yZGVyLWJveHxib3RofGJvdHRvbXxib3h8YnJlYWstYWxsfGJyZWFrLXdvcmR8Y2FwaXRhbGl6ZXxjYXBzLWhlaWdodHxjYXB0aW9ufGNlbnRlcnxjZW50cmFsfGNoYXJ8Y2lyY2xlfGNqay1pZGVvZ3JhcGhpY3xjbG9uZXxjbG9zZS1xdW90ZXxjb2wtcmVzaXplfGNvbGxhcHNlfGNvbHVtbnxjb25zaWRlci1zaGlmdHN8Y29udGFpbnxjb250ZW50LWJveHxjb3Zlcnxjcm9zc2hhaXJ8Y3ViaWMtYmV6aWVyfGRhc2hlZHxkZWNpbWFsLWxlYWRpbmctemVyb3xkZWNpbWFsfGRlZmF1bHR8ZGlzYWJsZWR8ZGlzY3xkaXNyZWdhcmQtc2hpZnRzfGRpc3RyaWJ1dGUtYWxsLWxpbmVzfGRpc3RyaWJ1dGUtbGV0dGVyfGRpc3RyaWJ1dGUtc3BhY2V8ZGlzdHJpYnV0ZXxkb3R0ZWR8ZG91YmxlfGUtcmVzaXplfGVhc2UtaW58ZWFzZS1pbi1vdXR8ZWFzZS1vdXR8ZWFzZXxlbGxpcHNpc3xlbmR8ZXhjbHVkZS1ydWJ5fGZsZXgtZW5kfGZsZXgtc3RhcnR8ZmlsbHxmaXhlZHxnZW9yZ2lhbnxnbHlwaHN8Z3JpZC1oZWlnaHR8Z3Jvb3ZlfGhhbmR8aGFuZ2luZ3xoZWJyZXd8aGVscHxoaWRkZW58aGlyYWdhbmEtaXJvaGF8aGlyYWdhbmF8aG9yaXpvbnRhbHxpY29ufGlkZW9ncmFwaC1hbHBoYXxpZGVvZ3JhcGgtbnVtZXJpY3xpZGVvZ3JhcGgtcGFyZW50aGVzaXN8aWRlb2dyYXBoLXNwYWNlfGlkZW9ncmFwaGljfGluYWN0aXZlfGluY2x1ZGUtcnVieXxpbmhlcml0fGluaXRpYWx8aW5saW5lLWJsb2NrfGlubGluZS1ib3h8aW5saW5lLWxpbmUtaGVpZ2h0fGlubGluZS10YWJsZXxpbmxpbmV8aW5zZXR8aW5zaWRlfGludGVyLWlkZW9ncmFwaHxpbnRlci13b3JkfGludmVydHxpdGFsaWN8anVzdGlmeXxrYXRha2FuYS1pcm9oYXxrYXRha2FuYXxrZWVwLWFsbHxsYXN0fGxlZnR8bGlnaHRlcnxsaW5lLWVkZ2V8bGluZS10aHJvdWdofGxpbmV8bGluZWFyfGxpc3QtaXRlbXxsb2NhbHxsb29zZXxsb3dlci1hbHBoYXxsb3dlci1ncmVla3xsb3dlci1sYXRpbnxsb3dlci1yb21hbnxsb3dlcmNhc2V8bHItdGJ8bHRyfG1hdGhlbWF0aWNhbHxtYXgtaGVpZ2h0fG1heC1zaXplfG1lZGl1bXxtZW51fG1lc3NhZ2UtYm94fG1pZGRsZXxtb3ZlfG4tcmVzaXplfG5lLXJlc2l6ZXxuZXdzcGFwZXJ8bm8tY2hhbmdlfG5vLWNsb3NlLXF1b3RlfG5vLWRyb3B8bm8tb3Blbi1xdW90ZXxuby1yZXBlYXR8bm9uZXxub3JtYWx8bm90LWFsbG93ZWR8bm93cmFwfG53LXJlc2l6ZXxvYmxpcXVlfG9wZW4tcXVvdGV8b3V0c2V0fG91dHNpZGV8b3ZlcmxpbmV8cGFkZGluZy1ib3h8cGFnZXxwb2ludGVyfHByZS1saW5lfHByZS13cmFwfHByZXxwcmVzZXJ2ZS0zZHxwcm9ncmVzc3xyZWxhdGl2ZXxyZXBlYXQteHxyZXBlYXQteXxyZXBlYXR8cmVwbGFjZWR8cmVzZXQtc2l6ZXxyaWRnZXxyaWdodHxyb3VuZHxyb3ctcmVzaXplfHJ0bHxzLXJlc2l6ZXxzY3JvbGx8c2UtcmVzaXplfHNlcGFyYXRlfHNsaWNlfHNtYWxsLWNhcHN8c21hbGwtY2FwdGlvbnxzb2xpZHxzcGFjZXxzcXVhcmV8c3RhcnR8c3RhdGljfHN0YXR1cy1iYXJ8c3RlcC1lbmR8c3RlcC1zdGFydHxzdGVwc3xzdHJldGNofHN0cmljdHxzdWJ8c3VwZXJ8c3ctcmVzaXplfHRhYmxlLWNhcHRpb258dGFibGUtY2VsbHx0YWJsZS1jb2x1bW4tZ3JvdXB8dGFibGUtY29sdW1ufHRhYmxlLWZvb3Rlci1ncm91cHx0YWJsZS1oZWFkZXItZ3JvdXB8dGFibGUtcm93LWdyb3VwfHRhYmxlLXJvd3x0YWJsZXx0Yi1ybHx0ZXh0LWFmdGVyLWVkZ2V8dGV4dC1iZWZvcmUtZWRnZXx0ZXh0LWJvdHRvbXx0ZXh0LXNpemV8dGV4dC10b3B8dGV4dHx0aGlja3x0aGlufHRyYW5zcGFyZW50fHVuZGVybGluZXx1cHBlci1hbHBoYXx1cHBlci1sYXRpbnx1cHBlci1yb21hbnx1cHBlcmNhc2V8dXNlLXNjcmlwdHx2ZXJ0aWNhbC1pZGVvZ3JhcGhpY3x2ZXJ0aWNhbC10ZXh0fHZpc2libGV8dy1yZXNpemV8d2FpdHx3aGl0ZXNwYWNlfHotaW5kZXh8emVyb3x6b29tXCI7XG52YXIgc3VwcG9ydENvbnN0YW50Q29sb3IgPSBleHBvcnRzLnN1cHBvcnRDb25zdGFudENvbG9yID0gXCJhbGljZWJsdWV8YW50aXF1ZXdoaXRlfGFxdWF8YXF1YW1hcmluZXxhenVyZXxiZWlnZXxiaXNxdWV8YmxhY2t8YmxhbmNoZWRhbG1vbmR8Ymx1ZXxibHVldmlvbGV0fGJyb3dufGJ1cmx5d29vZHxjYWRldGJsdWV8Y2hhcnRyZXVzZXxjaG9jb2xhdGV8Y29yYWx8Y29ybmZsb3dlcmJsdWV8Y29ybnNpbGt8Y3JpbXNvbnxjeWFufGRhcmtibHVlfGRhcmtjeWFufGRhcmtnb2xkZW5yb2R8ZGFya2dyYXl8ZGFya2dyZWVufGRhcmtncmV5fGRhcmtraGFraXxkYXJrbWFnZW50YXxkYXJrb2xpdmVncmVlbnxkYXJrb3JhbmdlfGRhcmtvcmNoaWR8ZGFya3JlZHxkYXJrc2FsbW9ufGRhcmtzZWFncmVlbnxkYXJrc2xhdGVibHVlfGRhcmtzbGF0ZWdyYXl8ZGFya3NsYXRlZ3JleXxkYXJrdHVycXVvaXNlfGRhcmt2aW9sZXR8ZGVlcHBpbmt8ZGVlcHNreWJsdWV8ZGltZ3JheXxkaW1ncmV5fGRvZGdlcmJsdWV8ZmlyZWJyaWNrfGZsb3JhbHdoaXRlfGZvcmVzdGdyZWVufGZ1Y2hzaWF8Z2FpbnNib3JvfGdob3N0d2hpdGV8Z29sZHxnb2xkZW5yb2R8Z3JheXxncmVlbnxncmVlbnllbGxvd3xncmV5fGhvbmV5ZGV3fGhvdHBpbmt8aW5kaWFucmVkfGluZGlnb3xpdm9yeXxraGFraXxsYXZlbmRlcnxsYXZlbmRlcmJsdXNofGxhd25ncmVlbnxsZW1vbmNoaWZmb258bGlnaHRibHVlfGxpZ2h0Y29yYWx8bGlnaHRjeWFufGxpZ2h0Z29sZGVucm9keWVsbG93fGxpZ2h0Z3JheXxsaWdodGdyZWVufGxpZ2h0Z3JleXxsaWdodHBpbmt8bGlnaHRzYWxtb258bGlnaHRzZWFncmVlbnxsaWdodHNreWJsdWV8bGlnaHRzbGF0ZWdyYXl8bGlnaHRzbGF0ZWdyZXl8bGlnaHRzdGVlbGJsdWV8bGlnaHR5ZWxsb3d8bGltZXxsaW1lZ3JlZW58bGluZW58bWFnZW50YXxtYXJvb258bWVkaXVtYXF1YW1hcmluZXxtZWRpdW1ibHVlfG1lZGl1bW9yY2hpZHxtZWRpdW1wdXJwbGV8bWVkaXVtc2VhZ3JlZW58bWVkaXVtc2xhdGVibHVlfG1lZGl1bXNwcmluZ2dyZWVufG1lZGl1bXR1cnF1b2lzZXxtZWRpdW12aW9sZXRyZWR8bWlkbmlnaHRibHVlfG1pbnRjcmVhbXxtaXN0eXJvc2V8bW9jY2FzaW58bmF2YWpvd2hpdGV8bmF2eXxvbGRsYWNlfG9saXZlfG9saXZlZHJhYnxvcmFuZ2V8b3JhbmdlcmVkfG9yY2hpZHxwYWxlZ29sZGVucm9kfHBhbGVncmVlbnxwYWxldHVycXVvaXNlfHBhbGV2aW9sZXRyZWR8cGFwYXlhd2hpcHxwZWFjaHB1ZmZ8cGVydXxwaW5rfHBsdW18cG93ZGVyYmx1ZXxwdXJwbGV8cmViZWNjYXB1cnBsZXxyZWR8cm9zeWJyb3dufHJveWFsYmx1ZXxzYWRkbGVicm93bnxzYWxtb258c2FuZHlicm93bnxzZWFncmVlbnxzZWFzaGVsbHxzaWVubmF8c2lsdmVyfHNreWJsdWV8c2xhdGVibHVlfHNsYXRlZ3JheXxzbGF0ZWdyZXl8c25vd3xzcHJpbmdncmVlbnxzdGVlbGJsdWV8dGFufHRlYWx8dGhpc3RsZXx0b21hdG98dHVycXVvaXNlfHZpb2xldHx3aGVhdHx3aGl0ZXx3aGl0ZXNtb2tlfHllbGxvd3x5ZWxsb3dncmVlblwiO1xudmFyIHN1cHBvcnRDb25zdGFudEZvbnRzID0gZXhwb3J0cy5zdXBwb3J0Q29uc3RhbnRGb250cyA9IFwiYXJpYWx8Y2VudHVyeXxjb21pY3xjb3VyaWVyfGN1cnNpdmV8ZmFudGFzeXxnYXJhbW9uZHxnZW9yZ2lhfGhlbHZldGljYXxpbXBhY3R8bHVjaWRhfHN5bWJvbHxzeXN0ZW18dGFob21hfHRpbWVzfHRyZWJ1Y2hldHx1dG9waWF8dmVyZGFuYXx3ZWJkaW5nc3xzYW5zLXNlcmlmfHNlcmlmfG1vbm9zcGFjZVwiO1xuXG52YXIgbnVtUmUgPSBleHBvcnRzLm51bVJlID0gXCJcXFxcLT8oPzooPzpbMC05XSsoPzpcXFxcLlswLTldKyk/KXwoPzpcXFxcLlswLTldKykpXCI7XG52YXIgcHNldWRvRWxlbWVudHMgPSBleHBvcnRzLnBzZXVkb0VsZW1lbnRzID0gXCIoXFxcXDorKVxcXFxiKGFmdGVyfGJlZm9yZXxmaXJzdC1sZXR0ZXJ8Zmlyc3QtbGluZXxtb3otc2VsZWN0aW9ufHNlbGVjdGlvbilcXFxcYlwiO1xudmFyIHBzZXVkb0NsYXNzZXMgID0gZXhwb3J0cy5wc2V1ZG9DbGFzc2VzID0gIFwiKDopXFxcXGIoYWN0aXZlfGNoZWNrZWR8ZGlzYWJsZWR8ZW1wdHl8ZW5hYmxlZHxmaXJzdC1jaGlsZHxmaXJzdC1vZi10eXBlfGZvY3VzfGhvdmVyfGluZGV0ZXJtaW5hdGV8aW52YWxpZHxsYXN0LWNoaWxkfGxhc3Qtb2YtdHlwZXxsaW5rfG5vdHxudGgtY2hpbGR8bnRoLWxhc3QtY2hpbGR8bnRoLWxhc3Qtb2YtdHlwZXxudGgtb2YtdHlwZXxvbmx5LWNoaWxkfG9ubHktb2YtdHlwZXxyZXF1aXJlZHxyb290fHRhcmdldHx2YWxpZHx2aXNpdGVkKVxcXFxiXCI7XG5cbnZhciBDc3NIaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIGtleXdvcmRNYXBwZXIgPSB0aGlzLmNyZWF0ZUtleXdvcmRNYXBwZXIoe1xuICAgICAgICBcInN1cHBvcnQuZnVuY3Rpb25cIjogc3VwcG9ydEZ1bmN0aW9uLFxuICAgICAgICBcInN1cHBvcnQuY29uc3RhbnRcIjogc3VwcG9ydENvbnN0YW50LFxuICAgICAgICBcInN1cHBvcnQudHlwZVwiOiBzdXBwb3J0VHlwZSxcbiAgICAgICAgXCJzdXBwb3J0LmNvbnN0YW50LmNvbG9yXCI6IHN1cHBvcnRDb25zdGFudENvbG9yLFxuICAgICAgICBcInN1cHBvcnQuY29uc3RhbnQuZm9udHNcIjogc3VwcG9ydENvbnN0YW50Rm9udHNcbiAgICB9LCBcInRleHRcIiwgdHJ1ZSk7XG5cbiAgICAvLyByZWdleHAgbXVzdCBub3QgaGF2ZSBjYXB0dXJpbmcgcGFyZW50aGVzZXMuIFVzZSAoPzopIGluc3RlYWQuXG4gICAgLy8gcmVnZXhwcyBhcmUgb3JkZXJlZCAtPiB0aGUgZmlyc3QgbWF0Y2ggaXMgdXNlZFxuXG4gICAgdGhpcy4kcnVsZXMgPSB7XG4gICAgICAgIFwic3RhcnRcIiA6IFt7XG4gICAgICAgICAgICBpbmNsdWRlIDogW1wic3RyaW5nc1wiLCBcInVybFwiLCBcImNvbW1lbnRzXCJdXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInBhcmVuLmxwYXJlblwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiXFxcXHtcIixcbiAgICAgICAgICAgIG5leHQ6ICBcInJ1bGVzZXRcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJwYXJlbi5ycGFyZW5cIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFx9XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nXCIsXG4gICAgICAgICAgICByZWdleDogXCJAKD8hdmlld3BvcnQpXCIsXG4gICAgICAgICAgICBuZXh0OiAgXCJtZWRpYVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcImtleXdvcmRcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIiNbYS16MC05LV9dK1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcImtleXdvcmRcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIiVcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJ2YXJpYWJsZVwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiXFxcXC5bYS16MC05LV9dK1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgcmVnZXg6IFwiOlthLXowLTktX10rXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIixcbiAgICAgICAgICAgIHJlZ2V4IDogbnVtUmVcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnRcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIlthLXowLTktX10rXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgY2FzZUluc2Vuc2l0aXZlOiB0cnVlXG4gICAgICAgIH1dLFxuXG4gICAgICAgIFwibWVkaWFcIjogW3tcbiAgICAgICAgICAgIGluY2x1ZGUgOiBbXCJzdHJpbmdzXCIsIFwidXJsXCIsIFwiY29tbWVudHNcIl1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwicGFyZW4ubHBhcmVuXCIsXG4gICAgICAgICAgICByZWdleDogXCJcXFxce1wiLFxuICAgICAgICAgICAgbmV4dDogIFwic3RhcnRcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJwYXJlbi5ycGFyZW5cIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFx9XCIsXG4gICAgICAgICAgICBuZXh0OiAgXCJzdGFydFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgcmVnZXg6IFwiO1wiLFxuICAgICAgICAgICAgbmV4dDogIFwic3RhcnRcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJrZXl3b3JkXCIsXG4gICAgICAgICAgICByZWdleDogXCIoPzptZWRpYXxzdXBwb3J0c3xkb2N1bWVudHxjaGFyc2V0fGltcG9ydHxuYW1lc3BhY2V8bWVkaWF8c3VwcG9ydHN8ZG9jdW1lbnRcIlxuICAgICAgICAgICAgICAgICsgXCJ8cGFnZXxmb250fGtleWZyYW1lc3x2aWV3cG9ydHxjb3VudGVyLXN0eWxlfGZvbnQtZmVhdHVyZS12YWx1ZXNcIlxuICAgICAgICAgICAgICAgICsgXCJ8c3dhc2h8b3JuYW1lbnRzfGFubm90YXRpb258c3R5bGlzdGljfHN0eWxlc2V0fGNoYXJhY3Rlci12YXJpYW50KVwiXG4gICAgICAgIH1dLFxuXG4gICAgICAgIFwiY29tbWVudHNcIiA6IFt7XG4gICAgICAgICAgICB0b2tlbjogXCJjb21tZW50XCIsIC8vIG11bHRpIGxpbmUgY29tbWVudFxuICAgICAgICAgICAgcmVnZXg6IFwiXFxcXC9cXFxcKlwiLFxuICAgICAgICAgICAgcHVzaDogW3tcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcKlxcXFwvXCIsXG4gICAgICAgICAgICAgICAgbmV4dCA6IFwicG9wXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW4gOiBcImNvbW1lbnRcIlxuICAgICAgICAgICAgfV1cbiAgICAgICAgfV0sXG5cbiAgICAgICAgXCJydWxlc2V0XCIgOiBbe1xuICAgICAgICAgICAgcmVnZXggOiBcIi0od2Via2l0fG1zfG1venxvKS1cIixcbiAgICAgICAgICAgIHRva2VuIDogXCJ0ZXh0XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInB1bmN0dWF0aW9uLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiWzo7XVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJwYXJlbi5ycGFyZW5cIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcfVwiLFxuICAgICAgICAgICAgbmV4dCA6IFwic3RhcnRcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpbmNsdWRlIDogW1wic3RyaW5nc1wiLCBcInVybFwiLCBcImNvbW1lbnRzXCJdXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogW1wiY29uc3RhbnQubnVtZXJpY1wiLCBcImtleXdvcmRcIl0sXG4gICAgICAgICAgICByZWdleCA6IFwiKFwiICsgbnVtUmUgKyBcIikoY2h8Y218ZGVnfGVtfGV4fGZyfGdkfGdyYWR8SHp8aW58a0h6fG1tfG1zfHBjfHB0fHB4fHJhZHxyZW18c3x0dXJufHZofHZtYXh8dm1pbnx2bXx2d3wlKVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5udW1lcmljXCIsXG4gICAgICAgICAgICByZWdleCA6IG51bVJlXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5udW1lcmljXCIsICAvLyBoZXg2IGNvbG9yXG4gICAgICAgICAgICByZWdleCA6IFwiI1thLWYwLTldezZ9XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIiwgLy8gaGV4MyBjb2xvclxuICAgICAgICAgICAgcmVnZXggOiBcIiNbYS1mMC05XXszfVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogW1wicHVuY3R1YXRpb25cIiwgXCJlbnRpdHkub3RoZXIuYXR0cmlidXRlLW5hbWUucHNldWRvLWVsZW1lbnQuY3NzXCJdLFxuICAgICAgICAgICAgcmVnZXggOiBwc2V1ZG9FbGVtZW50c1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFtcInB1bmN0dWF0aW9uXCIsIFwiZW50aXR5Lm90aGVyLmF0dHJpYnV0ZS1uYW1lLnBzZXVkby1jbGFzcy5jc3NcIl0sXG4gICAgICAgICAgICByZWdleCA6IHBzZXVkb0NsYXNzZXNcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaW5jbHVkZTogXCJ1cmxcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IGtleXdvcmRNYXBwZXIsXG4gICAgICAgICAgICByZWdleCA6IFwiXFxcXC0/W2EtekEtWl9dW2EtekEtWjAtOV9cXFxcLV0qXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwicGFyZW4ubHBhcmVuXCIsXG4gICAgICAgICAgICByZWdleDogXCJcXFxce1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNhc2VJbnNlbnNpdGl2ZTogdHJ1ZVxuICAgICAgICB9XSxcblxuICAgICAgICB1cmw6IFt7XG4gICAgICAgICAgICB0b2tlbiA6IFwic3VwcG9ydC5mdW5jdGlvblwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIig/OnVybCg6Py1wcmVmaXgpP3xkb21haW58cmVnZXhwKVxcXFwoXCIsXG4gICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdXBwb3J0LmZ1bmN0aW9uXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwpXCIsXG4gICAgICAgICAgICAgICAgbmV4dCA6IFwicG9wXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwic3RyaW5nXCJcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH1dLFxuXG4gICAgICAgIHN0cmluZ3M6IFt7XG4gICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nLnN0YXJ0XCIsXG4gICAgICAgICAgICByZWdleCA6IFwiJ1wiLFxuICAgICAgICAgICAgcHVzaCA6IFt7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZy5lbmRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiJ3wkXCIsXG4gICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGluY2x1ZGUgOiBcImVzY2FwZXNcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC9cXFxcJC8sXG4gICAgICAgICAgICAgICAgY29uc3VtZUxpbmVFbmQ6IHRydWVcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwic3RyaW5nXCJcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmcuc3RhcnRcIixcbiAgICAgICAgICAgIHJlZ2V4IDogJ1wiJyxcbiAgICAgICAgICAgIHB1c2ggOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmcuZW5kXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAnXCJ8JCcsXG4gICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGluY2x1ZGUgOiBcImVzY2FwZXNcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC9cXFxcJC8sXG4gICAgICAgICAgICAgICAgY29uc3VtZUxpbmVFbmQ6IHRydWVcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwic3RyaW5nXCJcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH1dLFxuICAgICAgICBlc2NhcGVzOiBbe1xuICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLFxuICAgICAgICAgICAgcmVnZXggOiAvXFxcXChbYS1mQS1GXFxkXXsxLDZ9fFteYS1mQS1GXFxkXSkvXG4gICAgICAgIH1dXG5cbiAgICB9O1xuXG4gICAgdGhpcy5ub3JtYWxpemVSdWxlcygpO1xufTtcblxub29wLmluaGVyaXRzKENzc0hpZ2hsaWdodFJ1bGVzLCBUZXh0SGlnaGxpZ2h0UnVsZXMpO1xuXG5leHBvcnRzLkNzc0hpZ2hsaWdodFJ1bGVzID0gQ3NzSGlnaGxpZ2h0UnVsZXM7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi8uLi9saWIvb29wXCIpO1xudmFyIFJhbmdlID0gcmVxdWlyZShcIi4uLy4uL3JhbmdlXCIpLlJhbmdlO1xudmFyIEJhc2VGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRfbW9kZVwiKS5Gb2xkTW9kZTtcblxudmFyIEZvbGRNb2RlID0gZXhwb3J0cy5Gb2xkTW9kZSA9IGZ1bmN0aW9uKGNvbW1lbnRSZWdleCkge1xuICAgIGlmIChjb21tZW50UmVnZXgpIHtcbiAgICAgICAgdGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIgPSBuZXcgUmVnRXhwKFxuICAgICAgICAgICAgdGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIuc291cmNlLnJlcGxhY2UoL1xcfFtefF0qPyQvLCBcInxcIiArIGNvbW1lbnRSZWdleC5zdGFydClcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5mb2xkaW5nU3RvcE1hcmtlciA9IG5ldyBSZWdFeHAoXG4gICAgICAgICAgICB0aGlzLmZvbGRpbmdTdG9wTWFya2VyLnNvdXJjZS5yZXBsYWNlKC9cXHxbXnxdKj8kLywgXCJ8XCIgKyBjb21tZW50UmVnZXguZW5kKVxuICAgICAgICApO1xuICAgIH1cbn07XG5vb3AuaW5oZXJpdHMoRm9sZE1vZGUsIEJhc2VGb2xkTW9kZSk7XG5cbihmdW5jdGlvbigpIHtcbiAgICBcbiAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlciA9IC8oW1xce1xcW1xcKF0pW15cXH1cXF1cXCldKiR8XlxccyooXFwvXFwqKS87XG4gICAgdGhpcy5mb2xkaW5nU3RvcE1hcmtlciA9IC9eW15cXFtcXHtcXChdKihbXFx9XFxdXFwpXSl8XltcXHNcXCpdKihcXCpcXC8pLztcbiAgICB0aGlzLnNpbmdsZUxpbmVCbG9ja0NvbW1lbnRSZT0gL15cXHMqKFxcL1xcKikuKlxcKlxcL1xccyokLztcbiAgICB0aGlzLnRyaXBsZVN0YXJCbG9ja0NvbW1lbnRSZSA9IC9eXFxzKihcXC9cXCpcXCpcXCopLipcXCpcXC9cXHMqJC87XG4gICAgdGhpcy5zdGFydFJlZ2lvblJlID0gL15cXHMqKFxcL1xcKnxcXC9cXC8pIz9yZWdpb25cXGIvO1xuICAgIFxuICAgIC8vcHJldmVudCBuYW1pbmcgY29uZmxpY3Qgd2l0aCBhbnkgbW9kZXMgdGhhdCBpbmhlcml0IGZyb20gY3N0eWxlIGFuZCBvdmVycmlkZSB0aGlzIChsaWtlIGNzaGFycClcbiAgICB0aGlzLl9nZXRGb2xkV2lkZ2V0QmFzZSA9IHRoaXMuZ2V0Rm9sZFdpZGdldDtcbiAgICBcbiAgICAvKipcbiAgICAgKiBHZXRzIGZvbGQgd2lkZ2V0IHdpdGggc29tZSBub24tc3RhbmRhcmQgZXh0cmFzOlxuICAgICAqXG4gICAgICogQGV4YW1wbGUgbGluZUNvbW1lbnRSZWdpb25TdGFydFxuICAgICAqICAgICAgLy8jcmVnaW9uIFtvcHRpb25hbCBkZXNjcmlwdGlvbl1cbiAgICAgKlxuICAgICAqIEBleGFtcGxlIGJsb2NrQ29tbWVudFJlZ2lvblN0YXJ0XG4gICAgICogICAgICAvKiNyZWdpb24gW29wdGlvbmFsIGRlc2NyaXB0aW9uXSAqWy9dXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSB0cmlwbGVTdGFyRm9sZGluZ1NlY3Rpb25cbiAgICAgKiAgICAgIC8qKiogdGhpcyBmb2xkcyBldmVuIHRob3VnaCAxIGxpbmUgYmVjYXVzZSBpdCBoYXMgMyBzdGFycyAqKipbL11cbiAgICAgKiBcbiAgICAgKiBAbm90ZSB0aGUgcG91bmQgc3ltYm9sIGZvciByZWdpb24gdGFncyBpcyBvcHRpb25hbFxuICAgICAqL1xuICAgIHRoaXMuZ2V0Rm9sZFdpZGdldCA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgXG4gICAgICAgIGlmICh0aGlzLnNpbmdsZUxpbmVCbG9ja0NvbW1lbnRSZS50ZXN0KGxpbmUpKSB7XG4gICAgICAgICAgICAvLyBObyB3aWRnZXQgZm9yIHNpbmdsZSBsaW5lIGJsb2NrIGNvbW1lbnQgdW5sZXNzIHJlZ2lvbiBvciB0cmlwbGUgc3RhclxuICAgICAgICAgICAgaWYgKCF0aGlzLnN0YXJ0UmVnaW9uUmUudGVzdChsaW5lKSAmJiAhdGhpcy50cmlwbGVTdGFyQmxvY2tDb21tZW50UmUudGVzdChsaW5lKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICB2YXIgZncgPSB0aGlzLl9nZXRGb2xkV2lkZ2V0QmFzZShzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdyk7XG4gICAgXG4gICAgICAgIGlmICghZncgJiYgdGhpcy5zdGFydFJlZ2lvblJlLnRlc3QobGluZSkpXG4gICAgICAgICAgICByZXR1cm4gXCJzdGFydFwiOyAvLyBsaW5lQ29tbWVudFJlZ2lvblN0YXJ0XG4gICAgXG4gICAgICAgIHJldHVybiBmdztcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0UmFuZ2UgPSBmdW5jdGlvbihzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdywgZm9yY2VNdWx0aWxpbmUpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLnN0YXJ0UmVnaW9uUmUudGVzdChsaW5lKSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldENvbW1lbnRSZWdpb25CbG9jayhzZXNzaW9uLCBsaW5lLCByb3cpO1xuICAgICAgICBcbiAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCh0aGlzLmZvbGRpbmdTdGFydE1hcmtlcik7XG4gICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgdmFyIGkgPSBtYXRjaC5pbmRleDtcblxuICAgICAgICAgICAgaWYgKG1hdGNoWzFdKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm9wZW5pbmdCcmFja2V0QmxvY2soc2Vzc2lvbiwgbWF0Y2hbMV0sIHJvdywgaSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgcmFuZ2UgPSBzZXNzaW9uLmdldENvbW1lbnRGb2xkUmFuZ2Uocm93LCBpICsgbWF0Y2hbMF0ubGVuZ3RoLCAxKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHJhbmdlICYmICFyYW5nZS5pc011bHRpTGluZSgpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZvcmNlTXVsdGlsaW5lKSB7XG4gICAgICAgICAgICAgICAgICAgIHJhbmdlID0gdGhpcy5nZXRTZWN0aW9uUmFuZ2Uoc2Vzc2lvbiwgcm93KTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZvbGRTdHlsZSAhPSBcImFsbFwiKVxuICAgICAgICAgICAgICAgICAgICByYW5nZSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiByYW5nZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmb2xkU3R5bGUgPT09IFwibWFya2JlZ2luXCIpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCh0aGlzLmZvbGRpbmdTdG9wTWFya2VyKTtcbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICB2YXIgaSA9IG1hdGNoLmluZGV4ICsgbWF0Y2hbMF0ubGVuZ3RoO1xuXG4gICAgICAgICAgICBpZiAobWF0Y2hbMV0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2xvc2luZ0JyYWNrZXRCbG9jayhzZXNzaW9uLCBtYXRjaFsxXSwgcm93LCBpKTtcblxuICAgICAgICAgICAgcmV0dXJuIHNlc3Npb24uZ2V0Q29tbWVudEZvbGRSYW5nZShyb3csIGksIC0xKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgXG4gICAgdGhpcy5nZXRTZWN0aW9uUmFuZ2UgPSBmdW5jdGlvbihzZXNzaW9uLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgdmFyIHN0YXJ0SW5kZW50ID0gbGluZS5zZWFyY2goL1xcUy8pO1xuICAgICAgICB2YXIgc3RhcnRSb3cgPSByb3c7XG4gICAgICAgIHZhciBzdGFydENvbHVtbiA9IGxpbmUubGVuZ3RoO1xuICAgICAgICByb3cgPSByb3cgKyAxO1xuICAgICAgICB2YXIgZW5kUm93ID0gcm93O1xuICAgICAgICB2YXIgbWF4Um93ID0gc2Vzc2lvbi5nZXRMZW5ndGgoKTtcbiAgICAgICAgd2hpbGUgKCsrcm93IDwgbWF4Um93KSB7XG4gICAgICAgICAgICBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgICAgICB2YXIgaW5kZW50ID0gbGluZS5zZWFyY2goL1xcUy8pO1xuICAgICAgICAgICAgaWYgKGluZGVudCA9PT0gLTEpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICBpZiAgKHN0YXJ0SW5kZW50ID4gaW5kZW50KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgdmFyIHN1YlJhbmdlID0gdGhpcy5nZXRGb2xkV2lkZ2V0UmFuZ2Uoc2Vzc2lvbiwgXCJhbGxcIiwgcm93KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHN1YlJhbmdlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN1YlJhbmdlLnN0YXJ0LnJvdyA8PSBzdGFydFJvdykge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN1YlJhbmdlLmlzTXVsdGlMaW5lKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcm93ID0gc3ViUmFuZ2UuZW5kLnJvdztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXJ0SW5kZW50ID09IGluZGVudCkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbmRSb3cgPSByb3c7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBuZXcgUmFuZ2Uoc3RhcnRSb3csIHN0YXJ0Q29sdW1uLCBlbmRSb3csIHNlc3Npb24uZ2V0TGluZShlbmRSb3cpLmxlbmd0aCk7XG4gICAgfTtcbiAgICBcbiAgICAvKipcbiAgICAgKiBnZXRzIGNvbW1lbnQgcmVnaW9uIGJsb2NrIHdpdGggZW5kIHJlZ2lvbiBhc3N1bWVkIHRvIGJlIHN0YXJ0IG9mIGNvbW1lbnQgaW4gYW55IGNzdHlsZSBtb2RlIG9yIFNRTCBtb2RlICgtLSkgd2hpY2ggaW5oZXJpdHMgZnJvbSB0aGlzLlxuICAgICAqIFRoZXJlIG1heSBvcHRpb25hbGx5IGJlIGEgcG91bmQgc3ltYm9sIGJlZm9yZSB0aGUgcmVnaW9uL2VuZHJlZ2lvbiBzdGF0ZW1lbnRcbiAgICAgKi9cbiAgICB0aGlzLmdldENvbW1lbnRSZWdpb25CbG9jayA9IGZ1bmN0aW9uKHNlc3Npb24sIGxpbmUsIHJvdykge1xuICAgICAgICB2YXIgc3RhcnRDb2x1bW4gPSBsaW5lLnNlYXJjaCgvXFxzKiQvKTtcbiAgICAgICAgdmFyIG1heFJvdyA9IHNlc3Npb24uZ2V0TGVuZ3RoKCk7XG4gICAgICAgIHZhciBzdGFydFJvdyA9IHJvdztcbiAgICAgICAgXG4gICAgICAgIHZhciByZSA9IC9eXFxzKig/OlxcL1xcKnxcXC9cXC98LS0pIz8oZW5kKT9yZWdpb25cXGIvO1xuICAgICAgICB2YXIgZGVwdGggPSAxO1xuICAgICAgICB3aGlsZSAoKytyb3cgPCBtYXhSb3cpIHtcbiAgICAgICAgICAgIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgICAgIHZhciBtID0gcmUuZXhlYyhsaW5lKTtcbiAgICAgICAgICAgIGlmICghbSkgY29udGludWU7XG4gICAgICAgICAgICBpZiAobVsxXSkgZGVwdGgtLTtcbiAgICAgICAgICAgIGVsc2UgZGVwdGgrKztcblxuICAgICAgICAgICAgaWYgKCFkZXB0aCkgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZW5kUm93ID0gcm93O1xuICAgICAgICBpZiAoZW5kUm93ID4gc3RhcnRSb3cpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmFuZ2Uoc3RhcnRSb3csIHN0YXJ0Q29sdW1uLCBlbmRSb3csIGxpbmUubGVuZ3RoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbn0pLmNhbGwoRm9sZE1vZGUucHJvdG90eXBlKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgUmFuZ2UgPSByZXF1aXJlKFwiLi4vcmFuZ2VcIikuUmFuZ2U7XG5cbnZhciBNYXRjaGluZ0JyYWNlT3V0ZGVudCA9IGZ1bmN0aW9uKCkge307XG5cbihmdW5jdGlvbigpIHtcblxuICAgIHRoaXMuY2hlY2tPdXRkZW50ID0gZnVuY3Rpb24obGluZSwgaW5wdXQpIHtcbiAgICAgICAgaWYgKCEgL15cXHMrJC8udGVzdChsaW5lKSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgICByZXR1cm4gL15cXHMqXFx9Ly50ZXN0KGlucHV0KTtcbiAgICB9O1xuXG4gICAgdGhpcy5hdXRvT3V0ZGVudCA9IGZ1bmN0aW9uKGRvYywgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gZG9jLmdldExpbmUocm93KTtcbiAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCgvXihcXHMqXFx9KS8pO1xuXG4gICAgICAgIGlmICghbWF0Y2gpIHJldHVybiAwO1xuXG4gICAgICAgIHZhciBjb2x1bW4gPSBtYXRjaFsxXS5sZW5ndGg7XG4gICAgICAgIHZhciBvcGVuQnJhY2VQb3MgPSBkb2MuZmluZE1hdGNoaW5nQnJhY2tldCh7cm93OiByb3csIGNvbHVtbjogY29sdW1ufSk7XG5cbiAgICAgICAgaWYgKCFvcGVuQnJhY2VQb3MgfHwgb3BlbkJyYWNlUG9zLnJvdyA9PSByb3cpIHJldHVybiAwO1xuXG4gICAgICAgIHZhciBpbmRlbnQgPSB0aGlzLiRnZXRJbmRlbnQoZG9jLmdldExpbmUob3BlbkJyYWNlUG9zLnJvdykpO1xuICAgICAgICBkb2MucmVwbGFjZShuZXcgUmFuZ2Uocm93LCAwLCByb3csIGNvbHVtbi0xKSwgaW5kZW50KTtcbiAgICB9O1xuXG4gICAgdGhpcy4kZ2V0SW5kZW50ID0gZnVuY3Rpb24obGluZSkge1xuICAgICAgICByZXR1cm4gbGluZS5tYXRjaCgvXlxccyovKVswXTtcbiAgICB9O1xuXG59KS5jYWxsKE1hdGNoaW5nQnJhY2VPdXRkZW50LnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTWF0Y2hpbmdCcmFjZU91dGRlbnQgPSBNYXRjaGluZ0JyYWNlT3V0ZGVudDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dE1vZGUgPSByZXF1aXJlKFwiLi90ZXh0XCIpLk1vZGU7XG52YXIgU2Nzc0hpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vc2Nzc19oaWdobGlnaHRfcnVsZXNcIikuU2Nzc0hpZ2hsaWdodFJ1bGVzO1xudmFyIE1hdGNoaW5nQnJhY2VPdXRkZW50ID0gcmVxdWlyZShcIi4vbWF0Y2hpbmdfYnJhY2Vfb3V0ZGVudFwiKS5NYXRjaGluZ0JyYWNlT3V0ZGVudDtcbnZhciBDc3NCZWhhdmlvdXIgPSByZXF1aXJlKFwiLi9iZWhhdmlvdXIvY3NzXCIpLkNzc0JlaGF2aW91cjtcbnZhciBDU3R5bGVGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRpbmcvY3N0eWxlXCIpLkZvbGRNb2RlO1xudmFyIENzc0NvbXBsZXRpb25zID0gcmVxdWlyZShcIi4vY3NzX2NvbXBsZXRpb25zXCIpLkNzc0NvbXBsZXRpb25zO1xuXG5cbnZhciBNb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5IaWdobGlnaHRSdWxlcyA9IFNjc3NIaWdobGlnaHRSdWxlcztcbiAgICB0aGlzLiRvdXRkZW50ID0gbmV3IE1hdGNoaW5nQnJhY2VPdXRkZW50KCk7XG4gICAgdGhpcy4kYmVoYXZpb3VyID0gbmV3IENzc0JlaGF2aW91cigpO1xuICAgIHRoaXMuJGNvbXBsZXRlciA9IG5ldyBDc3NDb21wbGV0aW9ucygpO1xuICAgIHRoaXMuZm9sZGluZ1J1bGVzID0gbmV3IENTdHlsZUZvbGRNb2RlKCk7XG59O1xub29wLmluaGVyaXRzKE1vZGUsIFRleHRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuICAgXG4gICAgdGhpcy5saW5lQ29tbWVudFN0YXJ0ID0gXCIvL1wiO1xuICAgIHRoaXMuYmxvY2tDb21tZW50ID0ge3N0YXJ0OiBcIi8qXCIsIGVuZDogXCIqL1wifTtcblxuICAgIHRoaXMuZ2V0TmV4dExpbmVJbmRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgbGluZSwgdGFiKSB7XG4gICAgICAgIHZhciBpbmRlbnQgPSB0aGlzLiRnZXRJbmRlbnQobGluZSk7XG5cbiAgICAgICAgLy8gaWdub3JlIGJyYWNlcyBpbiBjb21tZW50c1xuICAgICAgICB2YXIgdG9rZW5zID0gdGhpcy5nZXRUb2tlbml6ZXIoKS5nZXRMaW5lVG9rZW5zKGxpbmUsIHN0YXRlKS50b2tlbnM7XG4gICAgICAgIGlmICh0b2tlbnMubGVuZ3RoICYmIHRva2Vuc1t0b2tlbnMubGVuZ3RoLTFdLnR5cGUgPT0gXCJjb21tZW50XCIpIHtcbiAgICAgICAgICAgIHJldHVybiBpbmRlbnQ7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKC9eLipcXHtcXHMqJC8pO1xuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIGluZGVudCArPSB0YWI7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW5kZW50O1xuICAgIH07XG5cbiAgICB0aGlzLmNoZWNrT3V0ZGVudCA9IGZ1bmN0aW9uKHN0YXRlLCBsaW5lLCBpbnB1dCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kb3V0ZGVudC5jaGVja091dGRlbnQobGluZSwgaW5wdXQpO1xuICAgIH07XG5cbiAgICB0aGlzLmF1dG9PdXRkZW50ID0gZnVuY3Rpb24oc3RhdGUsIGRvYywgcm93KSB7XG4gICAgICAgIHRoaXMuJG91dGRlbnQuYXV0b091dGRlbnQoZG9jLCByb3cpO1xuICAgIH07XG4gICAgXG4gICAgdGhpcy5nZXRDb21wbGV0aW9ucyA9IGZ1bmN0aW9uKHN0YXRlLCBzZXNzaW9uLCBwb3MsIHByZWZpeCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kY29tcGxldGVyLmdldENvbXBsZXRpb25zKHN0YXRlLCBzZXNzaW9uLCBwb3MsIHByZWZpeCk7XG4gICAgfTtcblxuXG4gICAgdGhpcy4kaWQgPSBcImFjZS9tb2RlL3Njc3NcIjtcbn0pLmNhbGwoTW9kZS5wcm90b3R5cGUpO1xuXG5leHBvcnRzLk1vZGUgPSBNb2RlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBsYW5nID0gcmVxdWlyZShcIi4uL2xpYi9sYW5nXCIpO1xudmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcbnZhciBDc3NIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL2Nzc19oaWdobGlnaHRfcnVsZXNcIik7XG5cbnZhciBTY3NzSGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbigpIHtcbiAgICBcbiAgICB2YXIgcHJvcGVydGllcyA9IGxhbmcuYXJyYXlUb01hcChDc3NIaWdobGlnaHRSdWxlcy5zdXBwb3J0VHlwZS5zcGxpdChcInxcIikpO1xuXG4gICAgdmFyIGZ1bmN0aW9ucyA9IGxhbmcuYXJyYXlUb01hcChcbiAgICAgICAgKFwiaHNsfGhzbGF8cmdifHJnYmF8dXJsfGF0dHJ8Y291bnRlcnxjb3VudGVyc3xhYnN8YWRqdXN0X2NvbG9yfGFkanVzdF9odWV8XCIgK1xuICAgICAgICAgXCJhbHBoYXxqb2lufGJsdWV8Y2VpbHxjaGFuZ2VfY29sb3J8Y29tcGFyYWJsZXxjb21wbGVtZW50fGRhcmtlbnxkZXNhdHVyYXRlfFwiICsgXG4gICAgICAgICBcImZsb29yfGdyYXlzY2FsZXxncmVlbnxodWV8aWZ8aW52ZXJ0fGpvaW58bGVuZ3RofGxpZ2h0ZW58bGlnaHRuZXNzfG1peHxcIiArIFxuICAgICAgICAgXCJudGh8b3BhY2lmeXxvcGFjaXR5fHBlcmNlbnRhZ2V8cXVvdGV8cmVkfHJvdW5kfHNhdHVyYXRlfHNhdHVyYXRpb258XCIgK1xuICAgICAgICAgXCJzY2FsZV9jb2xvcnx0cmFuc3BhcmVudGl6ZXx0eXBlX29mfHVuaXR8dW5pdGxlc3N8dW5xdW90ZVwiKS5zcGxpdChcInxcIilcbiAgICApO1xuXG4gICAgdmFyIGNvbnN0YW50cyA9IGxhbmcuYXJyYXlUb01hcChDc3NIaWdobGlnaHRSdWxlcy5zdXBwb3J0Q29uc3RhbnQuc3BsaXQoXCJ8XCIpKTtcblxuICAgIHZhciBjb2xvcnMgPSBsYW5nLmFycmF5VG9NYXAoQ3NzSGlnaGxpZ2h0UnVsZXMuc3VwcG9ydENvbnN0YW50Q29sb3Iuc3BsaXQoXCJ8XCIpKTtcbiAgICBcbiAgICB2YXIga2V5d29yZHMgPSBsYW5nLmFycmF5VG9NYXAoXG4gICAgICAgIChcIkBtaXhpbnxAZXh0ZW5kfEBpbmNsdWRlfEBpbXBvcnR8QG1lZGlhfEBkZWJ1Z3xAd2FybnxAaWZ8QGZvcnxAZWFjaHxAd2hpbGV8QGVsc2V8QGZvbnQtZmFjZXxALXdlYmtpdC1rZXlmcmFtZXN8aWZ8YW5kfCFkZWZhdWx0fG1vZHVsZXxkZWZ8ZW5kfGRlY2xhcmVcIikuc3BsaXQoXCJ8XCIpXG4gICAgKTtcbiAgICBcbiAgICB2YXIgdGFncyA9IGxhbmcuYXJyYXlUb01hcChcbiAgICAgICAgKFwiYXxhYmJyfGFjcm9ueW18YWRkcmVzc3xhcHBsZXR8YXJlYXxhcnRpY2xlfGFzaWRlfGF1ZGlvfGJ8YmFzZXxiYXNlZm9udHxiZG98XCIgKyBcbiAgICAgICAgIFwiYmlnfGJsb2NrcXVvdGV8Ym9keXxicnxidXR0b258Y2FudmFzfGNhcHRpb258Y2VudGVyfGNpdGV8Y29kZXxjb2x8Y29sZ3JvdXB8XCIgKyBcbiAgICAgICAgIFwiY29tbWFuZHxkYXRhbGlzdHxkZHxkZWx8ZGV0YWlsc3xkZm58ZGlyfGRpdnxkbHxkdHxlbXxlbWJlZHxmaWVsZHNldHxcIiArIFxuICAgICAgICAgXCJmaWdjYXB0aW9ufGZpZ3VyZXxmb250fGZvb3Rlcnxmb3JtfGZyYW1lfGZyYW1lc2V0fGgxfGgyfGgzfGg0fGg1fGg2fGhlYWR8XCIgKyBcbiAgICAgICAgIFwiaGVhZGVyfGhncm91cHxocnxodG1sfGl8aWZyYW1lfGltZ3xpbnB1dHxpbnN8a2V5Z2VufGtiZHxsYWJlbHxsZWdlbmR8bGl8XCIgKyBcbiAgICAgICAgIFwibGlua3xtYXB8bWFya3xtZW51fG1ldGF8bWV0ZXJ8bmF2fG5vZnJhbWVzfG5vc2NyaXB0fG9iamVjdHxvbHxvcHRncm91cHxcIiArIFxuICAgICAgICAgXCJvcHRpb258b3V0cHV0fHB8cGFyYW18cHJlfHByb2dyZXNzfHF8cnB8cnR8cnVieXxzfHNhbXB8c2NyaXB0fHNlY3Rpb258c2VsZWN0fFwiICsgXG4gICAgICAgICBcInNtYWxsfHNvdXJjZXxzcGFufHN0cmlrZXxzdHJvbmd8c3R5bGV8c3VifHN1bW1hcnl8c3VwfHRhYmxlfHRib2R5fHRkfFwiICsgXG4gICAgICAgICBcInRleHRhcmVhfHRmb290fHRofHRoZWFkfHRpbWV8dGl0bGV8dHJ8dHR8dXx1bHx2YXJ8dmlkZW98d2JyfHhtcFwiKS5zcGxpdChcInxcIilcbiAgICApO1xuXG4gICAgLy8gcmVnZXhwIG11c3Qgbm90IGhhdmUgY2FwdHVyaW5nIHBhcmVudGhlc2VzLiBVc2UgKD86KSBpbnN0ZWFkLlxuICAgIC8vIHJlZ2V4cHMgYXJlIG9yZGVyZWQgLT4gdGhlIGZpcnN0IG1hdGNoIGlzIHVzZWRcblxuICAgIHZhciBudW1SZSA9IFwiXFxcXC0/KD86KD86WzAtOV0rKXwoPzpbMC05XSpcXFxcLlswLTldKykpXCI7XG5cbiAgICAvLyByZWdleHAgbXVzdCBub3QgaGF2ZSBjYXB0dXJpbmcgcGFyZW50aGVzZXMuIFVzZSAoPzopIGluc3RlYWQuXG4gICAgLy8gcmVnZXhwcyBhcmUgb3JkZXJlZCAtPiB0aGUgZmlyc3QgbWF0Y2ggaXMgdXNlZFxuXG4gICAgdGhpcy4kcnVsZXMgPSB7XG4gICAgICAgIFwic3RhcnRcIiA6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcL1xcXFwvLiokXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIiwgLy8gbXVsdGkgbGluZSBjb21tZW50XG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwvXFxcXCpcIixcbiAgICAgICAgICAgICAgICBuZXh0IDogXCJjb21tZW50XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsIC8vIHNpbmdsZSBsaW5lXG4gICAgICAgICAgICAgICAgcmVnZXggOiAnW1wiXSg/Oig/OlxcXFxcXFxcLil8KD86W15cIlxcXFxcXFxcXSkpKj9bXCJdJ1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIiwgLy8gbXVsdGkgbGluZSBzdHJpbmcgc3RhcnRcbiAgICAgICAgICAgICAgICByZWdleCA6ICdbXCJdLipcXFxcXFxcXCQnLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcInFxc3RyaW5nXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsIC8vIHNpbmdsZSBsaW5lXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlsnXSg/Oig/OlxcXFxcXFxcLil8KD86W14nXFxcXFxcXFxdKSkqP1snXVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLCAvLyBtdWx0aSBsaW5lIHN0cmluZyBzdGFydFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJbJ10uKlxcXFxcXFxcJFwiLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcInFzdHJpbmdcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5udW1lcmljXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBudW1SZSArIFwiKD86Y2h8Y218ZGVnfGVtfGV4fGZyfGdkfGdyYWR8SHp8aW58a0h6fG1tfG1zfHBjfHB0fHB4fHJhZHxyZW18c3x0dXJufHZofHZtYXh8dm1pbnx2bXx2d3wlKVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIiwgLy8gaGV4NiBjb2xvclxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIjW2EtZjAtOV17Nn1cIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5udW1lcmljXCIsIC8vIGhleDMgY29sb3JcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiI1thLWYwLTldezN9XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogbnVtUmVcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFtcInN1cHBvcnQuZnVuY3Rpb25cIiwgXCJzdHJpbmdcIiwgXCJzdXBwb3J0LmZ1bmN0aW9uXCJdLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIodXJsXFxcXCgpKC4qKShcXFxcKSlcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkodmFsdWUudG9Mb3dlckNhc2UoKSkpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJzdXBwb3J0LnR5cGVcIjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGtleXdvcmRzLmhhc093blByb3BlcnR5KHZhbHVlKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcImtleXdvcmRcIjtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoY29uc3RhbnRzLmhhc093blByb3BlcnR5KHZhbHVlKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcImNvbnN0YW50Lmxhbmd1YWdlXCI7XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGZ1bmN0aW9ucy5oYXNPd25Qcm9wZXJ0eSh2YWx1ZSkpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJzdXBwb3J0LmZ1bmN0aW9uXCI7XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNvbG9ycy5oYXNPd25Qcm9wZXJ0eSh2YWx1ZS50b0xvd2VyQ2FzZSgpKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcInN1cHBvcnQuY29uc3RhbnQuY29sb3JcIjtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodGFncy5oYXNPd25Qcm9wZXJ0eSh2YWx1ZS50b0xvd2VyQ2FzZSgpKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcInZhcmlhYmxlLmxhbmd1YWdlXCI7XG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcInRleHRcIjtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcLT9bQGEtel9dW0BhLXowLTlfXFxcXC1dKlwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInZhcmlhYmxlXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlthLXpfXFxcXC0kXVthLXowLTlfXFxcXC0kXSpcXFxcYlwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwidmFyaWFibGUubGFuZ3VhZ2VcIixcbiAgICAgICAgICAgICAgICByZWdleDogXCIjW2EtejAtOS1fXStcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInZhcmlhYmxlLmxhbmd1YWdlXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiXFxcXC5bYS16MC05LV9dK1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwidmFyaWFibGUubGFuZ3VhZ2VcIixcbiAgICAgICAgICAgICAgICByZWdleDogXCI6W2EtejAtOS1fXStcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50XCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiW2EtejAtOS1fXStcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIjx8Pnw8PXw+PXw9PXwhPXwtfCV8I3xcXFxcK3xcXFxcJHxcXFxcK3xcXFxcKlwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInBhcmVuLmxwYXJlblwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJbWyh7XVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInBhcmVuLnJwYXJlblwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJbXFxcXF0pfV1cIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFxzK1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgY2FzZUluc2Vuc2l0aXZlOiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIFwiY29tbWVudFwiIDogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsIC8vIGNsb3NpbmcgY29tbWVudFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcKlxcXFwvXCIsXG4gICAgICAgICAgICAgICAgbmV4dCA6IFwic3RhcnRcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbiA6IFwiY29tbWVudFwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIFwicXFzdHJpbmdcIiA6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAnKD86KD86XFxcXFxcXFwuKXwoPzpbXlwiXFxcXFxcXFxdKSkqP1wiJyxcbiAgICAgICAgICAgICAgICBuZXh0IDogXCJzdGFydFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogJy4rJ1xuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBcInFzdHJpbmdcIiA6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIig/Oig/OlxcXFxcXFxcLil8KD86W14nXFxcXFxcXFxdKSkqPydcIixcbiAgICAgICAgICAgICAgICBuZXh0IDogXCJzdGFydFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogJy4rJ1xuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfTtcbn07XG5cbm9vcC5pbmhlcml0cyhTY3NzSGlnaGxpZ2h0UnVsZXMsIFRleHRIaWdobGlnaHRSdWxlcyk7XG5cbmV4cG9ydHMuU2Nzc0hpZ2hsaWdodFJ1bGVzID0gU2Nzc0hpZ2hsaWdodFJ1bGVzO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9