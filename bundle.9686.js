"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[9686],{

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

/***/ 79686:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var LessHighlightRules = (__webpack_require__(41425).LessHighlightRules);
var MatchingBraceOutdent = (__webpack_require__(28670).MatchingBraceOutdent);
var CssBehaviour = (__webpack_require__(37028)/* .CssBehaviour */ .r);
var CssCompletions = (__webpack_require__(61952)/* .CssCompletions */ .d);

var CStyleFoldMode = (__webpack_require__(93887)/* .FoldMode */ .l);

var Mode = function() {
    this.HighlightRules = LessHighlightRules;
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
        // CSS completions only work with single (not nested) rulesets
        return this.$completer.getCompletions("ruleset", session, pos, prefix);
    };

    this.$id = "ace/mode/less";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 41425:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);
var CssHighlightRules = __webpack_require__(74275);

var LessHighlightRules = function() {


    var keywordList = "@import|@media|@font-face|@keyframes|@-webkit-keyframes|@supports|" + 
        "@charset|@plugin|@namespace|@document|@page|@viewport|@-ms-viewport|" +
        "or|and|when|not";

    var keywords = keywordList.split('|');

    var properties = CssHighlightRules.supportType.split('|');

    var keywordMapper = this.createKeywordMapper({
        "support.constant": CssHighlightRules.supportConstant,
        "keyword": keywordList,
        "support.constant.color": CssHighlightRules.supportConstantColor,
        "support.constant.fonts": CssHighlightRules.supportConstantFonts
    }, "identifier", true);   

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
                token : "string", // single line
                regex : "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"
            }, {
                token : ["constant.numeric", "keyword"],
                regex : "(" + numRe + ")(ch|cm|deg|em|ex|fr|gd|grad|Hz|in|kHz|mm|ms|pc|pt|px|rad|rem|s|turn|vh|vm|vw|%)"
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
                token : ["support.function", "paren.lparen", "string", "paren.rparen"],
                regex : "(url)(\\()(.*)(\\))"
            }, {
                token : ["support.function", "paren.lparen"],
                regex : "(:extend|[a-z0-9_\\-]+)(\\()"
            }, {
                token : function(value) {
                    if (keywords.indexOf(value.toLowerCase()) > -1)
                        return "keyword";
                    else
                        return "variable";
                },
                regex : "[@\\$][a-z0-9_\\-@\\$]*\\b"
            }, {
                token : "variable",
                regex : "[@\\$]\\{[a-z0-9_\\-@\\$]*\\}"
            }, {
                token : function(first, second) {
                    if(properties.indexOf(first.toLowerCase()) > -1) {
                        return ["support.type.property", "text"];
                    }
                    else {
                        return ["support.type.unknownProperty", "text"];
                    }
                },
                regex : "([a-z0-9-_]+)(\\s*:)"
            }, {
                token : "keyword",
                regex : "&"   // special case - always treat as keyword
            }, {
                token : keywordMapper,
                regex : "\\-?[@a-z_][@a-z0-9_\\-]*"
            }, {
                token: "variable.language",
                regex: "#[a-z0-9-_]+"
            }, {
                token: "variable.language",
                regex: "\\.[a-z0-9-_]+"
            }, {
                token: "variable.language",
                regex: ":[a-z_][a-z0-9-_]*"
            }, {
                token: "constant",
                regex: "[a-z0-9-_]+"
            }, {
                token : "keyword.operator",
                regex : "<|>|<=|>=|=|!=|-|%|\\+|\\*"
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
        ]
    };
    this.normalizeRules();
};

oop.inherits(LessHighlightRules, TextHighlightRules);

exports.LessHighlightRules = LessHighlightRules;


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


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQzNDLHFCQUFxQixxQkFBcUI7O0FBRTFDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQSxTQUFTO0FBQ1Q7QUFDQSx1QkFBdUI7QUFDdkIsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBLFNBQVM7QUFDVDtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBLFNBQVM7QUFDVDtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2IsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSx3QkFBd0I7QUFDeEIsU0FBUztBQUNUO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLCtCQUErQixFQUFFO0FBQ2pDLFNBQVM7QUFDVDtBQUNBLCtCQUErQixFQUFFO0FBQ2pDLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLHVCQUF1QjtBQUN2QixTQUFTO0FBQ1Q7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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NEJBQTRCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9iZWhhdmlvdXIvY3NzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvY3NzX2NvbXBsZXRpb25zLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvY3NzX2hpZ2hsaWdodF9ydWxlcy5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2ZvbGRpbmcvY3N0eWxlLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvbGVzcy5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2xlc3NfaGlnaGxpZ2h0X3J1bGVzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvbWF0Y2hpbmdfYnJhY2Vfb3V0ZGVudC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vLi4vbGliL29vcFwiKTtcbnZhciBCZWhhdmlvdXIgPSByZXF1aXJlKFwiLi4vYmVoYXZpb3VyXCIpLkJlaGF2aW91cjtcbnZhciBDc3R5bGVCZWhhdmlvdXIgPSByZXF1aXJlKFwiLi9jc3R5bGVcIikuQ3N0eWxlQmVoYXZpb3VyO1xudmFyIFRva2VuSXRlcmF0b3IgPSByZXF1aXJlKFwiLi4vLi4vdG9rZW5faXRlcmF0b3JcIikuVG9rZW5JdGVyYXRvcjtcblxuLyoqQHR5cGUgeyhuZXcoKSA9PiBQYXJ0aWFsPGltcG9ydChcIi4uLy4uLy4uL2FjZS1pbnRlcm5hbFwiKS5BY2UuQmVoYXZpb3VyPil9Ki9cbnZhciBDc3NCZWhhdmlvdXIgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICB0aGlzLmluaGVyaXQoQ3N0eWxlQmVoYXZpb3VyKTtcblxuICAgIHRoaXMuYWRkKFwiY29sb25cIiwgXCJpbnNlcnRpb25cIiwgZnVuY3Rpb24gKHN0YXRlLCBhY3Rpb24sIGVkaXRvciwgc2Vzc2lvbiwgdGV4dCkge1xuICAgICAgICBpZiAodGV4dCA9PT0gJzonICYmIGVkaXRvci5zZWxlY3Rpb24uaXNFbXB0eSgpKSB7XG4gICAgICAgICAgICB2YXIgY3Vyc29yID0gZWRpdG9yLmdldEN1cnNvclBvc2l0aW9uKCk7XG4gICAgICAgICAgICB2YXIgaXRlcmF0b3IgPSBuZXcgVG9rZW5JdGVyYXRvcihzZXNzaW9uLCBjdXJzb3Iucm93LCBjdXJzb3IuY29sdW1uKTtcbiAgICAgICAgICAgIHZhciB0b2tlbiA9IGl0ZXJhdG9yLmdldEN1cnJlbnRUb2tlbigpO1xuICAgICAgICAgICAgaWYgKHRva2VuICYmIHRva2VuLnZhbHVlLm1hdGNoKC9cXHMrLykpIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA9IGl0ZXJhdG9yLnN0ZXBCYWNrd2FyZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRva2VuICYmIHRva2VuLnR5cGUgPT09ICdzdXBwb3J0LnR5cGUnKSB7XG4gICAgICAgICAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmRvYy5nZXRMaW5lKGN1cnNvci5yb3cpO1xuICAgICAgICAgICAgICAgIHZhciByaWdodENoYXIgPSBsaW5lLnN1YnN0cmluZyhjdXJzb3IuY29sdW1uLCBjdXJzb3IuY29sdW1uICsgMSk7XG4gICAgICAgICAgICAgICAgaWYgKHJpZ2h0Q2hhciA9PT0gJzonKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgIHRleHQ6ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb246IFsxLCAxXVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoL14oXFxzK1teO118XFxzKiQpLy50ZXN0KGxpbmUuc3Vic3RyaW5nKGN1cnNvci5jb2x1bW4pKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnOjsnLFxuICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb246IFsxLCAxXVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5hZGQoXCJjb2xvblwiLCBcImRlbGV0aW9uXCIsIGZ1bmN0aW9uIChzdGF0ZSwgYWN0aW9uLCBlZGl0b3IsIHNlc3Npb24sIHJhbmdlKSB7XG4gICAgICAgIHZhciBzZWxlY3RlZCA9IHNlc3Npb24uZG9jLmdldFRleHRSYW5nZShyYW5nZSk7XG4gICAgICAgIGlmICghcmFuZ2UuaXNNdWx0aUxpbmUoKSAmJiBzZWxlY3RlZCA9PT0gJzonKSB7XG4gICAgICAgICAgICB2YXIgY3Vyc29yID0gZWRpdG9yLmdldEN1cnNvclBvc2l0aW9uKCk7XG4gICAgICAgICAgICB2YXIgaXRlcmF0b3IgPSBuZXcgVG9rZW5JdGVyYXRvcihzZXNzaW9uLCBjdXJzb3Iucm93LCBjdXJzb3IuY29sdW1uKTtcbiAgICAgICAgICAgIHZhciB0b2tlbiA9IGl0ZXJhdG9yLmdldEN1cnJlbnRUb2tlbigpO1xuICAgICAgICAgICAgaWYgKHRva2VuICYmIHRva2VuLnZhbHVlLm1hdGNoKC9cXHMrLykpIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA9IGl0ZXJhdG9yLnN0ZXBCYWNrd2FyZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRva2VuICYmIHRva2VuLnR5cGUgPT09ICdzdXBwb3J0LnR5cGUnKSB7XG4gICAgICAgICAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmRvYy5nZXRMaW5lKHJhbmdlLnN0YXJ0LnJvdyk7XG4gICAgICAgICAgICAgICAgdmFyIHJpZ2h0Q2hhciA9IGxpbmUuc3Vic3RyaW5nKHJhbmdlLmVuZC5jb2x1bW4sIHJhbmdlLmVuZC5jb2x1bW4gKyAxKTtcbiAgICAgICAgICAgICAgICBpZiAocmlnaHRDaGFyID09PSAnOycpIHtcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2UuZW5kLmNvbHVtbiArKztcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJhbmdlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5hZGQoXCJzZW1pY29sb25cIiwgXCJpbnNlcnRpb25cIiwgZnVuY3Rpb24gKHN0YXRlLCBhY3Rpb24sIGVkaXRvciwgc2Vzc2lvbiwgdGV4dCkge1xuICAgICAgICBpZiAodGV4dCA9PT0gJzsnICYmIGVkaXRvci5zZWxlY3Rpb24uaXNFbXB0eSgpKSB7XG4gICAgICAgICAgICB2YXIgY3Vyc29yID0gZWRpdG9yLmdldEN1cnNvclBvc2l0aW9uKCk7XG4gICAgICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZG9jLmdldExpbmUoY3Vyc29yLnJvdyk7XG4gICAgICAgICAgICB2YXIgcmlnaHRDaGFyID0gbGluZS5zdWJzdHJpbmcoY3Vyc29yLmNvbHVtbiwgY3Vyc29yLmNvbHVtbiArIDEpO1xuICAgICAgICAgICAgaWYgKHJpZ2h0Q2hhciA9PT0gJzsnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICB0ZXh0OiAnJyxcbiAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb246IFsxLCAxXVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuYWRkKFwiIWltcG9ydGFudFwiLCBcImluc2VydGlvblwiLCBmdW5jdGlvbiAoc3RhdGUsIGFjdGlvbiwgZWRpdG9yLCBzZXNzaW9uLCB0ZXh0KSB7XG4gICAgICAgIGlmICh0ZXh0ID09PSAnIScgJiYgZWRpdG9yLnNlbGVjdGlvbi5pc0VtcHR5KCkpIHtcbiAgICAgICAgICAgIHZhciBjdXJzb3IgPSBlZGl0b3IuZ2V0Q3Vyc29yUG9zaXRpb24oKTtcbiAgICAgICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5kb2MuZ2V0TGluZShjdXJzb3Iucm93KTtcblxuICAgICAgICAgICAgaWYgKC9eXFxzKig7fH18JCkvLnRlc3QobGluZS5zdWJzdHJpbmcoY3Vyc29yLmNvbHVtbikpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJyFpbXBvcnRhbnQnLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb246IFsxMCwgMTBdXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG59O1xub29wLmluaGVyaXRzKENzc0JlaGF2aW91ciwgQ3N0eWxlQmVoYXZpb3VyKTtcblxuZXhwb3J0cy5Dc3NCZWhhdmlvdXIgPSBDc3NCZWhhdmlvdXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHByb3BlcnR5TWFwID0ge1xuICAgIFwiYmFja2dyb3VuZFwiOiB7XCIjJDBcIjogMX0sXG4gICAgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6IHtcIiMkMFwiOiAxLCBcInRyYW5zcGFyZW50XCI6IDEsIFwiZml4ZWRcIjogMX0sXG4gICAgXCJiYWNrZ3JvdW5kLWltYWdlXCI6IHtcInVybCgnLyQwJylcIjogMX0sXG4gICAgXCJiYWNrZ3JvdW5kLXJlcGVhdFwiOiB7XCJyZXBlYXRcIjogMSwgXCJyZXBlYXQteFwiOiAxLCBcInJlcGVhdC15XCI6IDEsIFwibm8tcmVwZWF0XCI6IDEsIFwiaW5oZXJpdFwiOiAxfSxcbiAgICBcImJhY2tncm91bmQtcG9zaXRpb25cIjoge1wiYm90dG9tXCI6MiwgXCJjZW50ZXJcIjoyLCBcImxlZnRcIjoyLCBcInJpZ2h0XCI6MiwgXCJ0b3BcIjoyLCBcImluaGVyaXRcIjoyfSxcbiAgICBcImJhY2tncm91bmQtYXR0YWNobWVudFwiOiB7XCJzY3JvbGxcIjogMSwgXCJmaXhlZFwiOiAxfSxcbiAgICBcImJhY2tncm91bmQtc2l6ZVwiOiB7XCJjb3ZlclwiOiAxLCBcImNvbnRhaW5cIjogMX0sXG4gICAgXCJiYWNrZ3JvdW5kLWNsaXBcIjoge1wiYm9yZGVyLWJveFwiOiAxLCBcInBhZGRpbmctYm94XCI6IDEsIFwiY29udGVudC1ib3hcIjogMX0sXG4gICAgXCJiYWNrZ3JvdW5kLW9yaWdpblwiOiB7XCJib3JkZXItYm94XCI6IDEsIFwicGFkZGluZy1ib3hcIjogMSwgXCJjb250ZW50LWJveFwiOiAxfSxcbiAgICBcImJvcmRlclwiOiB7XCJzb2xpZCAkMFwiOiAxLCBcImRhc2hlZCAkMFwiOiAxLCBcImRvdHRlZCAkMFwiOiAxLCBcIiMkMFwiOiAxfSxcbiAgICBcImJvcmRlci1jb2xvclwiOiB7XCIjJDBcIjogMX0sXG4gICAgXCJib3JkZXItc3R5bGVcIjoge1wic29saWRcIjoyLCBcImRhc2hlZFwiOjIsIFwiZG90dGVkXCI6MiwgXCJkb3VibGVcIjoyLCBcImdyb292ZVwiOjIsIFwiaGlkZGVuXCI6MiwgXCJpbmhlcml0XCI6MiwgXCJpbnNldFwiOjIsIFwibm9uZVwiOjIsIFwib3V0c2V0XCI6MiwgXCJyaWRnZWRcIjoyfSxcbiAgICBcImJvcmRlci1jb2xsYXBzZVwiOiB7XCJjb2xsYXBzZVwiOiAxLCBcInNlcGFyYXRlXCI6IDF9LFxuICAgIFwiYm90dG9tXCI6IHtcInB4XCI6IDEsIFwiZW1cIjogMSwgXCIlXCI6IDF9LFxuICAgIFwiY2xlYXJcIjoge1wibGVmdFwiOiAxLCBcInJpZ2h0XCI6IDEsIFwiYm90aFwiOiAxLCBcIm5vbmVcIjogMX0sXG4gICAgXCJjb2xvclwiOiB7XCIjJDBcIjogMSwgXCJyZ2IoIyQwMCwwLDApXCI6IDF9LFxuICAgIFwiY3Vyc29yXCI6IHtcImRlZmF1bHRcIjogMSwgXCJwb2ludGVyXCI6IDEsIFwibW92ZVwiOiAxLCBcInRleHRcIjogMSwgXCJ3YWl0XCI6IDEsIFwiaGVscFwiOiAxLCBcInByb2dyZXNzXCI6IDEsIFwibi1yZXNpemVcIjogMSwgXCJuZS1yZXNpemVcIjogMSwgXCJlLXJlc2l6ZVwiOiAxLCBcInNlLXJlc2l6ZVwiOiAxLCBcInMtcmVzaXplXCI6IDEsIFwic3ctcmVzaXplXCI6IDEsIFwidy1yZXNpemVcIjogMSwgXCJudy1yZXNpemVcIjogMX0sXG4gICAgXCJkaXNwbGF5XCI6IHtcIm5vbmVcIjogMSwgXCJibG9ja1wiOiAxLCBcImlubGluZVwiOiAxLCBcImlubGluZS1ibG9ja1wiOiAxLCBcInRhYmxlLWNlbGxcIjogMX0sXG4gICAgXCJlbXB0eS1jZWxsc1wiOiB7XCJzaG93XCI6IDEsIFwiaGlkZVwiOiAxfSxcbiAgICBcImZsb2F0XCI6IHtcImxlZnRcIjogMSwgXCJyaWdodFwiOiAxLCBcIm5vbmVcIjogMX0sXG4gICAgXCJmb250LWZhbWlseVwiOiB7XCJBcmlhbFwiOjIsXCJDb21pYyBTYW5zIE1TXCI6MixcIkNvbnNvbGFzXCI6MixcIkNvdXJpZXIgTmV3XCI6MixcIkNvdXJpZXJcIjoyLFwiR2VvcmdpYVwiOjIsXCJNb25vc3BhY2VcIjoyLFwiU2Fucy1TZXJpZlwiOjIsIFwiU2Vnb2UgVUlcIjoyLFwiVGFob21hXCI6MixcIlRpbWVzIE5ldyBSb21hblwiOjIsXCJUcmVidWNoZXQgTVNcIjoyLFwiVmVyZGFuYVwiOiAxfSxcbiAgICBcImZvbnQtc2l6ZVwiOiB7XCJweFwiOiAxLCBcImVtXCI6IDEsIFwiJVwiOiAxfSxcbiAgICBcImZvbnQtd2VpZ2h0XCI6IHtcImJvbGRcIjogMSwgXCJub3JtYWxcIjogMX0sXG4gICAgXCJmb250LXN0eWxlXCI6IHtcIml0YWxpY1wiOiAxLCBcIm5vcm1hbFwiOiAxfSxcbiAgICBcImZvbnQtdmFyaWFudFwiOiB7XCJub3JtYWxcIjogMSwgXCJzbWFsbC1jYXBzXCI6IDF9LFxuICAgIFwiaGVpZ2h0XCI6IHtcInB4XCI6IDEsIFwiZW1cIjogMSwgXCIlXCI6IDF9LFxuICAgIFwibGVmdFwiOiB7XCJweFwiOiAxLCBcImVtXCI6IDEsIFwiJVwiOiAxfSxcbiAgICBcImxldHRlci1zcGFjaW5nXCI6IHtcIm5vcm1hbFwiOiAxfSxcbiAgICBcImxpbmUtaGVpZ2h0XCI6IHtcIm5vcm1hbFwiOiAxfSxcbiAgICBcImxpc3Qtc3R5bGUtdHlwZVwiOiB7XCJub25lXCI6IDEsIFwiZGlzY1wiOiAxLCBcImNpcmNsZVwiOiAxLCBcInNxdWFyZVwiOiAxLCBcImRlY2ltYWxcIjogMSwgXCJkZWNpbWFsLWxlYWRpbmctemVyb1wiOiAxLCBcImxvd2VyLXJvbWFuXCI6IDEsIFwidXBwZXItcm9tYW5cIjogMSwgXCJsb3dlci1ncmVla1wiOiAxLCBcImxvd2VyLWxhdGluXCI6IDEsIFwidXBwZXItbGF0aW5cIjogMSwgXCJnZW9yZ2lhblwiOiAxLCBcImxvd2VyLWFscGhhXCI6IDEsIFwidXBwZXItYWxwaGFcIjogMX0sXG4gICAgXCJtYXJnaW5cIjoge1wicHhcIjogMSwgXCJlbVwiOiAxLCBcIiVcIjogMX0sXG4gICAgXCJtYXJnaW4tcmlnaHRcIjoge1wicHhcIjogMSwgXCJlbVwiOiAxLCBcIiVcIjogMX0sXG4gICAgXCJtYXJnaW4tbGVmdFwiOiB7XCJweFwiOiAxLCBcImVtXCI6IDEsIFwiJVwiOiAxfSxcbiAgICBcIm1hcmdpbi10b3BcIjoge1wicHhcIjogMSwgXCJlbVwiOiAxLCBcIiVcIjogMX0sXG4gICAgXCJtYXJnaW4tYm90dG9tXCI6IHtcInB4XCI6IDEsIFwiZW1cIjogMSwgXCIlXCI6IDF9LFxuICAgIFwibWF4LWhlaWdodFwiOiB7XCJweFwiOiAxLCBcImVtXCI6IDEsIFwiJVwiOiAxfSxcbiAgICBcIm1heC13aWR0aFwiOiB7XCJweFwiOiAxLCBcImVtXCI6IDEsIFwiJVwiOiAxfSxcbiAgICBcIm1pbi1oZWlnaHRcIjoge1wicHhcIjogMSwgXCJlbVwiOiAxLCBcIiVcIjogMX0sXG4gICAgXCJtaW4td2lkdGhcIjoge1wicHhcIjogMSwgXCJlbVwiOiAxLCBcIiVcIjogMX0sXG4gICAgXCJvdmVyZmxvd1wiOiB7XCJoaWRkZW5cIjogMSwgXCJ2aXNpYmxlXCI6IDEsIFwiYXV0b1wiOiAxLCBcInNjcm9sbFwiOiAxfSxcbiAgICBcIm92ZXJmbG93LXhcIjoge1wiaGlkZGVuXCI6IDEsIFwidmlzaWJsZVwiOiAxLCBcImF1dG9cIjogMSwgXCJzY3JvbGxcIjogMX0sXG4gICAgXCJvdmVyZmxvdy15XCI6IHtcImhpZGRlblwiOiAxLCBcInZpc2libGVcIjogMSwgXCJhdXRvXCI6IDEsIFwic2Nyb2xsXCI6IDF9LFxuICAgIFwicGFkZGluZ1wiOiB7XCJweFwiOiAxLCBcImVtXCI6IDEsIFwiJVwiOiAxfSxcbiAgICBcInBhZGRpbmctdG9wXCI6IHtcInB4XCI6IDEsIFwiZW1cIjogMSwgXCIlXCI6IDF9LFxuICAgIFwicGFkZGluZy1yaWdodFwiOiB7XCJweFwiOiAxLCBcImVtXCI6IDEsIFwiJVwiOiAxfSxcbiAgICBcInBhZGRpbmctYm90dG9tXCI6IHtcInB4XCI6IDEsIFwiZW1cIjogMSwgXCIlXCI6IDF9LFxuICAgIFwicGFkZGluZy1sZWZ0XCI6IHtcInB4XCI6IDEsIFwiZW1cIjogMSwgXCIlXCI6IDF9LFxuICAgIFwicGFnZS1icmVhay1hZnRlclwiOiB7XCJhdXRvXCI6IDEsIFwiYWx3YXlzXCI6IDEsIFwiYXZvaWRcIjogMSwgXCJsZWZ0XCI6IDEsIFwicmlnaHRcIjogMX0sXG4gICAgXCJwYWdlLWJyZWFrLWJlZm9yZVwiOiB7XCJhdXRvXCI6IDEsIFwiYWx3YXlzXCI6IDEsIFwiYXZvaWRcIjogMSwgXCJsZWZ0XCI6IDEsIFwicmlnaHRcIjogMX0sXG4gICAgXCJwb3NpdGlvblwiOiB7XCJhYnNvbHV0ZVwiOiAxLCBcInJlbGF0aXZlXCI6IDEsIFwiZml4ZWRcIjogMSwgXCJzdGF0aWNcIjogMX0sXG4gICAgXCJyaWdodFwiOiB7XCJweFwiOiAxLCBcImVtXCI6IDEsIFwiJVwiOiAxfSxcbiAgICBcInRhYmxlLWxheW91dFwiOiB7XCJmaXhlZFwiOiAxLCBcImF1dG9cIjogMX0sXG4gICAgXCJ0ZXh0LWRlY29yYXRpb25cIjoge1wibm9uZVwiOiAxLCBcInVuZGVybGluZVwiOiAxLCBcImxpbmUtdGhyb3VnaFwiOiAxLCBcImJsaW5rXCI6IDF9LFxuICAgIFwidGV4dC1hbGlnblwiOiB7XCJsZWZ0XCI6IDEsIFwicmlnaHRcIjogMSwgXCJjZW50ZXJcIjogMSwgXCJqdXN0aWZ5XCI6IDF9LFxuICAgIFwidGV4dC10cmFuc2Zvcm1cIjoge1wiY2FwaXRhbGl6ZVwiOiAxLCBcInVwcGVyY2FzZVwiOiAxLCBcImxvd2VyY2FzZVwiOiAxLCBcIm5vbmVcIjogMX0sXG4gICAgXCJ0b3BcIjoge1wicHhcIjogMSwgXCJlbVwiOiAxLCBcIiVcIjogMX0sXG4gICAgXCJ2ZXJ0aWNhbC1hbGlnblwiOiB7XCJ0b3BcIjogMSwgXCJib3R0b21cIjogMX0sXG4gICAgXCJ2aXNpYmlsaXR5XCI6IHtcImhpZGRlblwiOiAxLCBcInZpc2libGVcIjogMX0sXG4gICAgXCJ3aGl0ZS1zcGFjZVwiOiB7XCJub3dyYXBcIjogMSwgXCJub3JtYWxcIjogMSwgXCJwcmVcIjogMSwgXCJwcmUtbGluZVwiOiAxLCBcInByZS13cmFwXCI6IDF9LFxuICAgIFwid2lkdGhcIjoge1wicHhcIjogMSwgXCJlbVwiOiAxLCBcIiVcIjogMX0sXG4gICAgXCJ3b3JkLXNwYWNpbmdcIjoge1wibm9ybWFsXCI6IDF9LFxuXG4gICAgLy8gb3BhY2l0eVxuICAgIFwiZmlsdGVyXCI6IHtcImFscGhhKG9wYWNpdHk9JDAxMDApXCI6IDF9LFxuXG4gICAgXCJ0ZXh0LXNoYWRvd1wiOiB7XCIkMDJweCAycHggMnB4ICM3NzdcIjogMX0sXG4gICAgXCJ0ZXh0LW92ZXJmbG93XCI6IHtcImVsbGlwc2lzLXdvcmRcIjogMSwgXCJjbGlwXCI6IDEsIFwiZWxsaXBzaXNcIjogMX0sXG5cbiAgICAvLyBib3JkZXIgcmFkaXVzXG4gICAgXCItbW96LWJvcmRlci1yYWRpdXNcIjogMSxcbiAgICBcIi1tb3otYm9yZGVyLXJhZGl1cy10b3ByaWdodFwiOiAxLFxuICAgIFwiLW1vei1ib3JkZXItcmFkaXVzLWJvdHRvbXJpZ2h0XCI6IDEsXG4gICAgXCItbW96LWJvcmRlci1yYWRpdXMtdG9wbGVmdFwiOiAxLFxuICAgIFwiLW1vei1ib3JkZXItcmFkaXVzLWJvdHRvbWxlZnRcIjogMSxcbiAgICBcIi13ZWJraXQtYm9yZGVyLXJhZGl1c1wiOiAxLFxuICAgIFwiLXdlYmtpdC1ib3JkZXItdG9wLXJpZ2h0LXJhZGl1c1wiOiAxLFxuICAgIFwiLXdlYmtpdC1ib3JkZXItdG9wLWxlZnQtcmFkaXVzXCI6IDEsXG4gICAgXCItd2Via2l0LWJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzXCI6IDEsXG4gICAgXCItd2Via2l0LWJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXNcIjogMSxcblxuICAgIC8vIGRyb3BzaGFkb3dzXG4gICAgXCItbW96LWJveC1zaGFkb3dcIjogMSxcbiAgICBcIi13ZWJraXQtYm94LXNoYWRvd1wiOiAxLFxuXG4gICAgLy8gdHJhbnNmb3JtYXRpb25zXG4gICAgXCJ0cmFuc2Zvcm1cIjoge1wicm90YXRlKCQwMGRlZylcIjogMSwgXCJza2V3KCQwMGRlZylcIjogMX0sXG4gICAgXCItbW96LXRyYW5zZm9ybVwiOiB7XCJyb3RhdGUoJDAwZGVnKVwiOiAxLCBcInNrZXcoJDAwZGVnKVwiOiAxfSxcbiAgICBcIi13ZWJraXQtdHJhbnNmb3JtXCI6IHtcInJvdGF0ZSgkMDBkZWcpXCI6IDEsIFwic2tldygkMDBkZWcpXCI6IDEgfVxufTtcblxudmFyIENzc0NvbXBsZXRpb25zID0gZnVuY3Rpb24oKSB7XG5cbn07XG5cbihmdW5jdGlvbigpIHtcblxuICAgIHRoaXMuY29tcGxldGlvbnNEZWZpbmVkID0gZmFsc2U7XG5cbiAgICB0aGlzLmRlZmluZUNvbXBsZXRpb25zID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vZmlsbCBpbiBtaXNzaW5nIHByb3BlcnRpZXNcbiAgICAgICAgaWYgKGRvY3VtZW50KSB7XG4gICAgICAgICAgICB2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjJykuc3R5bGU7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4gc3R5bGUpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHN0eWxlW2ldICE9PSAnc3RyaW5nJylcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgICAgICAgICB2YXIgbmFtZSA9IGkucmVwbGFjZSgvW0EtWl0vZywgZnVuY3Rpb24oeCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJy0nICsgeC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFwcm9wZXJ0eU1hcC5oYXNPd25Qcm9wZXJ0eShuYW1lKSlcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydHlNYXBbbmFtZV0gPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb21wbGV0aW9uc0RlZmluZWQgPSB0cnVlO1xuICAgIH07XG5cbiAgICB0aGlzLmdldENvbXBsZXRpb25zID0gZnVuY3Rpb24oc3RhdGUsIHNlc3Npb24sIHBvcywgcHJlZml4KSB7XG4gICAgICAgIGlmICghdGhpcy5jb21wbGV0aW9uc0RlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZGVmaW5lQ29tcGxldGlvbnMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdGF0ZT09PSdydWxlc2V0JyB8fCBzZXNzaW9uLiRtb2RlLiRpZCA9PSBcImFjZS9tb2RlL3Njc3NcIikge1xuICAgICAgICAgICAgLy9jc3MgYXR0cmlidXRlIHZhbHVlXG4gICAgICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShwb3Mucm93KS5zdWJzdHIoMCwgcG9zLmNvbHVtbik7XG4gICAgICAgICAgICB2YXIgaW5QYXJlbnMgPSAvXFwoW14pXSokLy50ZXN0KGxpbmUpO1xuICAgICAgICAgICAgaWYgKGluUGFyZW5zKSB7XG4gICAgICAgICAgICAgICAgbGluZSA9IGxpbmUuc3Vic3RyKGxpbmUubGFzdEluZGV4T2YoJygnKSArIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKC86W147XSskLy50ZXN0KGxpbmUpKSB7XG4gICAgICAgICAgICAgICAgLyhbXFx3XFwtXSspOlteOl0qJC8udGVzdChsaW5lKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFByb3BlcnR5VmFsdWVDb21wbGV0aW9ucyhzdGF0ZSwgc2Vzc2lvbiwgcG9zLCBwcmVmaXgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRQcm9wZXJ0eUNvbXBsZXRpb25zKHN0YXRlLCBzZXNzaW9uLCBwb3MsIHByZWZpeCwgaW5QYXJlbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIH07XG5cbiAgICB0aGlzLmdldFByb3BlcnR5Q29tcGxldGlvbnMgPSBmdW5jdGlvbihzdGF0ZSwgc2Vzc2lvbiwgcG9zLCBwcmVmaXgsIHNraXBTZW1pY29sb24pIHtcbiAgICAgICAgc2tpcFNlbWljb2xvbiA9IHNraXBTZW1pY29sb24gfHwgZmFsc2U7XG4gICAgICAgIHZhciBwcm9wZXJ0aWVzID0gT2JqZWN0LmtleXMocHJvcGVydHlNYXApO1xuICAgICAgICByZXR1cm4gcHJvcGVydGllcy5tYXAoZnVuY3Rpb24ocHJvcGVydHkpe1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBwcm9wZXJ0eSxcbiAgICAgICAgICAgICAgICBzbmlwcGV0OiBwcm9wZXJ0eSArICc6ICQwJyArIChza2lwU2VtaWNvbG9uID8gJycgOiAnOycpLFxuICAgICAgICAgICAgICAgIG1ldGE6IFwicHJvcGVydHlcIixcbiAgICAgICAgICAgICAgICBzY29yZTogMTAwMDAwMFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMuZ2V0UHJvcGVydHlWYWx1ZUNvbXBsZXRpb25zID0gZnVuY3Rpb24oc3RhdGUsIHNlc3Npb24sIHBvcywgcHJlZml4KSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHBvcy5yb3cpLnN1YnN0cigwLCBwb3MuY29sdW1uKTtcbiAgICAgICAgdmFyIHByb3BlcnR5ID0gKC8oW1xcd1xcLV0rKTpbXjpdKiQvLmV4ZWMobGluZSkgfHwge30pWzFdO1xuXG4gICAgICAgIGlmICghcHJvcGVydHkpXG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIHZhciB2YWx1ZXMgPSBbXTtcbiAgICAgICAgaWYgKHByb3BlcnR5IGluIHByb3BlcnR5TWFwICYmIHR5cGVvZiBwcm9wZXJ0eU1hcFtwcm9wZXJ0eV0gPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgIHZhbHVlcyA9IE9iamVjdC5rZXlzKHByb3BlcnR5TWFwW3Byb3BlcnR5XSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlcy5tYXAoZnVuY3Rpb24odmFsdWUpe1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiB2YWx1ZSxcbiAgICAgICAgICAgICAgICBzbmlwcGV0OiB2YWx1ZSxcbiAgICAgICAgICAgICAgICBtZXRhOiBcInByb3BlcnR5IHZhbHVlXCIsXG4gICAgICAgICAgICAgICAgc2NvcmU6IDEwMDAwMDBcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH07XG5cbn0pLmNhbGwoQ3NzQ29tcGxldGlvbnMucHJvdG90eXBlKTtcblxuZXhwb3J0cy5Dc3NDb21wbGV0aW9ucyA9IENzc0NvbXBsZXRpb25zO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBsYW5nID0gcmVxdWlyZShcIi4uL2xpYi9sYW5nXCIpO1xudmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcblxuXG4vKiBFeHBvcnRzIGFyZSBmb3IgU3R5bHVzIGFuZCBMZXNzIGhpZ2hsaWdodGVycyAqL1xudmFyIHN1cHBvcnRUeXBlID0gZXhwb3J0cy5zdXBwb3J0VHlwZSA9IFwiYWxpZ24tY29udGVudHxhbGlnbi1pdGVtc3xhbGlnbi1zZWxmfGFsbHxhbmltYXRpb258YW5pbWF0aW9uLWRlbGF5fGFuaW1hdGlvbi1kaXJlY3Rpb258YW5pbWF0aW9uLWR1cmF0aW9ufGFuaW1hdGlvbi1maWxsLW1vZGV8YW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudHxhbmltYXRpb24tbmFtZXxhbmltYXRpb24tcGxheS1zdGF0ZXxhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9ufGJhY2tmYWNlLXZpc2liaWxpdHl8YmFja2dyb3VuZHxiYWNrZ3JvdW5kLWF0dGFjaG1lbnR8YmFja2dyb3VuZC1ibGVuZC1tb2RlfGJhY2tncm91bmQtY2xpcHxiYWNrZ3JvdW5kLWNvbG9yfGJhY2tncm91bmQtaW1hZ2V8YmFja2dyb3VuZC1vcmlnaW58YmFja2dyb3VuZC1wb3NpdGlvbnxiYWNrZ3JvdW5kLXJlcGVhdHxiYWNrZ3JvdW5kLXNpemV8Ym9yZGVyfGJvcmRlci1ib3R0b218Ym9yZGVyLWJvdHRvbS1jb2xvcnxib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzfGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzfGJvcmRlci1ib3R0b20tc3R5bGV8Ym9yZGVyLWJvdHRvbS13aWR0aHxib3JkZXItY29sbGFwc2V8Ym9yZGVyLWNvbG9yfGJvcmRlci1pbWFnZXxib3JkZXItaW1hZ2Utb3V0c2V0fGJvcmRlci1pbWFnZS1yZXBlYXR8Ym9yZGVyLWltYWdlLXNsaWNlfGJvcmRlci1pbWFnZS1zb3VyY2V8Ym9yZGVyLWltYWdlLXdpZHRofGJvcmRlci1sZWZ0fGJvcmRlci1sZWZ0LWNvbG9yfGJvcmRlci1sZWZ0LXN0eWxlfGJvcmRlci1sZWZ0LXdpZHRofGJvcmRlci1yYWRpdXN8Ym9yZGVyLXJpZ2h0fGJvcmRlci1yaWdodC1jb2xvcnxib3JkZXItcmlnaHQtc3R5bGV8Ym9yZGVyLXJpZ2h0LXdpZHRofGJvcmRlci1zcGFjaW5nfGJvcmRlci1zdHlsZXxib3JkZXItdG9wfGJvcmRlci10b3AtY29sb3J8Ym9yZGVyLXRvcC1sZWZ0LXJhZGl1c3xib3JkZXItdG9wLXJpZ2h0LXJhZGl1c3xib3JkZXItdG9wLXN0eWxlfGJvcmRlci10b3Atd2lkdGh8Ym9yZGVyLXdpZHRofGJvdHRvbXxib3gtc2hhZG93fGJveC1zaXppbmd8Y2FwdGlvbi1zaWRlfGNsZWFyfGNsaXB8Y29sb3J8Y29sdW1uLWNvdW50fGNvbHVtbi1maWxsfGNvbHVtbi1nYXB8Y29sdW1uLXJ1bGV8Y29sdW1uLXJ1bGUtY29sb3J8Y29sdW1uLXJ1bGUtc3R5bGV8Y29sdW1uLXJ1bGUtd2lkdGh8Y29sdW1uLXNwYW58Y29sdW1uLXdpZHRofGNvbHVtbnN8Y29udGVudHxjb3VudGVyLWluY3JlbWVudHxjb3VudGVyLXJlc2V0fGN1cnNvcnxkaXJlY3Rpb258ZGlzcGxheXxlbXB0eS1jZWxsc3xmaWx0ZXJ8ZmxleHxmbGV4LWJhc2lzfGZsZXgtZGlyZWN0aW9ufGZsZXgtZmxvd3xmbGV4LWdyb3d8ZmxleC1zaHJpbmt8ZmxleC13cmFwfGZsb2F0fGZvbnR8Zm9udC1mYW1pbHl8Zm9udC1zaXplfGZvbnQtc2l6ZS1hZGp1c3R8Zm9udC1zdHJldGNofGZvbnQtc3R5bGV8Zm9udC12YXJpYW50fGZvbnQtd2VpZ2h0fGhhbmdpbmctcHVuY3R1YXRpb258aGVpZ2h0fGp1c3RpZnktY29udGVudHxsZWZ0fGxldHRlci1zcGFjaW5nfGxpbmUtaGVpZ2h0fGxpc3Qtc3R5bGV8bGlzdC1zdHlsZS1pbWFnZXxsaXN0LXN0eWxlLXBvc2l0aW9ufGxpc3Qtc3R5bGUtdHlwZXxtYXJnaW58bWFyZ2luLWJvdHRvbXxtYXJnaW4tbGVmdHxtYXJnaW4tcmlnaHR8bWFyZ2luLXRvcHxtYXgtaGVpZ2h0fG1heC13aWR0aHxtYXgtem9vbXxtaW4taGVpZ2h0fG1pbi13aWR0aHxtaW4tem9vbXxuYXYtZG93bnxuYXYtaW5kZXh8bmF2LWxlZnR8bmF2LXJpZ2h0fG5hdi11cHxvcGFjaXR5fG9yZGVyfG91dGxpbmV8b3V0bGluZS1jb2xvcnxvdXRsaW5lLW9mZnNldHxvdXRsaW5lLXN0eWxlfG91dGxpbmUtd2lkdGh8b3ZlcmZsb3d8b3ZlcmZsb3cteHxvdmVyZmxvdy15fHBhZGRpbmd8cGFkZGluZy1ib3R0b218cGFkZGluZy1sZWZ0fHBhZGRpbmctcmlnaHR8cGFkZGluZy10b3B8cGFnZS1icmVhay1hZnRlcnxwYWdlLWJyZWFrLWJlZm9yZXxwYWdlLWJyZWFrLWluc2lkZXxwZXJzcGVjdGl2ZXxwZXJzcGVjdGl2ZS1vcmlnaW58cG9zaXRpb258cXVvdGVzfHJlc2l6ZXxyaWdodHx0YWItc2l6ZXx0YWJsZS1sYXlvdXR8dGV4dC1hbGlnbnx0ZXh0LWFsaWduLWxhc3R8dGV4dC1kZWNvcmF0aW9ufHRleHQtZGVjb3JhdGlvbi1jb2xvcnx0ZXh0LWRlY29yYXRpb24tbGluZXx0ZXh0LWRlY29yYXRpb24tc3R5bGV8dGV4dC1pbmRlbnR8dGV4dC1qdXN0aWZ5fHRleHQtb3ZlcmZsb3d8dGV4dC1zaGFkb3d8dGV4dC10cmFuc2Zvcm18dG9wfHRyYW5zZm9ybXx0cmFuc2Zvcm0tb3JpZ2lufHRyYW5zZm9ybS1zdHlsZXx0cmFuc2l0aW9ufHRyYW5zaXRpb24tZGVsYXl8dHJhbnNpdGlvbi1kdXJhdGlvbnx0cmFuc2l0aW9uLXByb3BlcnR5fHRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9ufHVuaWNvZGUtYmlkaXx1c2VyLXNlbGVjdHx1c2VyLXpvb218dmVydGljYWwtYWxpZ258dmlzaWJpbGl0eXx3aGl0ZS1zcGFjZXx3aWR0aHx3b3JkLWJyZWFrfHdvcmQtc3BhY2luZ3x3b3JkLXdyYXB8ei1pbmRleFwiO1xudmFyIHN1cHBvcnRGdW5jdGlvbiA9IGV4cG9ydHMuc3VwcG9ydEZ1bmN0aW9uID0gXCJyZ2J8cmdiYXx1cmx8YXR0cnxjb3VudGVyfGNvdW50ZXJzXCI7XG52YXIgc3VwcG9ydENvbnN0YW50ID0gZXhwb3J0cy5zdXBwb3J0Q29uc3RhbnQgPSBcImFic29sdXRlfGFmdGVyLWVkZ2V8YWZ0ZXJ8YWxsLXNjcm9sbHxhbGx8YWxwaGFiZXRpY3xhbHdheXN8YW50aWFsaWFzZWR8YXJtZW5pYW58YXV0b3xhdm9pZC1jb2x1bW58YXZvaWQtcGFnZXxhdm9pZHxiYWxhbmNlfGJhc2VsaW5lfGJlZm9yZS1lZGdlfGJlZm9yZXxiZWxvd3xiaWRpLW92ZXJyaWRlfGJsb2NrLWxpbmUtaGVpZ2h0fGJsb2NrfGJvbGR8Ym9sZGVyfGJvcmRlci1ib3h8Ym90aHxib3R0b218Ym94fGJyZWFrLWFsbHxicmVhay13b3JkfGNhcGl0YWxpemV8Y2Fwcy1oZWlnaHR8Y2FwdGlvbnxjZW50ZXJ8Y2VudHJhbHxjaGFyfGNpcmNsZXxjamstaWRlb2dyYXBoaWN8Y2xvbmV8Y2xvc2UtcXVvdGV8Y29sLXJlc2l6ZXxjb2xsYXBzZXxjb2x1bW58Y29uc2lkZXItc2hpZnRzfGNvbnRhaW58Y29udGVudC1ib3h8Y292ZXJ8Y3Jvc3NoYWlyfGN1YmljLWJlemllcnxkYXNoZWR8ZGVjaW1hbC1sZWFkaW5nLXplcm98ZGVjaW1hbHxkZWZhdWx0fGRpc2FibGVkfGRpc2N8ZGlzcmVnYXJkLXNoaWZ0c3xkaXN0cmlidXRlLWFsbC1saW5lc3xkaXN0cmlidXRlLWxldHRlcnxkaXN0cmlidXRlLXNwYWNlfGRpc3RyaWJ1dGV8ZG90dGVkfGRvdWJsZXxlLXJlc2l6ZXxlYXNlLWlufGVhc2UtaW4tb3V0fGVhc2Utb3V0fGVhc2V8ZWxsaXBzaXN8ZW5kfGV4Y2x1ZGUtcnVieXxmbGV4LWVuZHxmbGV4LXN0YXJ0fGZpbGx8Zml4ZWR8Z2VvcmdpYW58Z2x5cGhzfGdyaWQtaGVpZ2h0fGdyb292ZXxoYW5kfGhhbmdpbmd8aGVicmV3fGhlbHB8aGlkZGVufGhpcmFnYW5hLWlyb2hhfGhpcmFnYW5hfGhvcml6b250YWx8aWNvbnxpZGVvZ3JhcGgtYWxwaGF8aWRlb2dyYXBoLW51bWVyaWN8aWRlb2dyYXBoLXBhcmVudGhlc2lzfGlkZW9ncmFwaC1zcGFjZXxpZGVvZ3JhcGhpY3xpbmFjdGl2ZXxpbmNsdWRlLXJ1Ynl8aW5oZXJpdHxpbml0aWFsfGlubGluZS1ibG9ja3xpbmxpbmUtYm94fGlubGluZS1saW5lLWhlaWdodHxpbmxpbmUtdGFibGV8aW5saW5lfGluc2V0fGluc2lkZXxpbnRlci1pZGVvZ3JhcGh8aW50ZXItd29yZHxpbnZlcnR8aXRhbGljfGp1c3RpZnl8a2F0YWthbmEtaXJvaGF8a2F0YWthbmF8a2VlcC1hbGx8bGFzdHxsZWZ0fGxpZ2h0ZXJ8bGluZS1lZGdlfGxpbmUtdGhyb3VnaHxsaW5lfGxpbmVhcnxsaXN0LWl0ZW18bG9jYWx8bG9vc2V8bG93ZXItYWxwaGF8bG93ZXItZ3JlZWt8bG93ZXItbGF0aW58bG93ZXItcm9tYW58bG93ZXJjYXNlfGxyLXRifGx0cnxtYXRoZW1hdGljYWx8bWF4LWhlaWdodHxtYXgtc2l6ZXxtZWRpdW18bWVudXxtZXNzYWdlLWJveHxtaWRkbGV8bW92ZXxuLXJlc2l6ZXxuZS1yZXNpemV8bmV3c3BhcGVyfG5vLWNoYW5nZXxuby1jbG9zZS1xdW90ZXxuby1kcm9wfG5vLW9wZW4tcXVvdGV8bm8tcmVwZWF0fG5vbmV8bm9ybWFsfG5vdC1hbGxvd2VkfG5vd3JhcHxudy1yZXNpemV8b2JsaXF1ZXxvcGVuLXF1b3RlfG91dHNldHxvdXRzaWRlfG92ZXJsaW5lfHBhZGRpbmctYm94fHBhZ2V8cG9pbnRlcnxwcmUtbGluZXxwcmUtd3JhcHxwcmV8cHJlc2VydmUtM2R8cHJvZ3Jlc3N8cmVsYXRpdmV8cmVwZWF0LXh8cmVwZWF0LXl8cmVwZWF0fHJlcGxhY2VkfHJlc2V0LXNpemV8cmlkZ2V8cmlnaHR8cm91bmR8cm93LXJlc2l6ZXxydGx8cy1yZXNpemV8c2Nyb2xsfHNlLXJlc2l6ZXxzZXBhcmF0ZXxzbGljZXxzbWFsbC1jYXBzfHNtYWxsLWNhcHRpb258c29saWR8c3BhY2V8c3F1YXJlfHN0YXJ0fHN0YXRpY3xzdGF0dXMtYmFyfHN0ZXAtZW5kfHN0ZXAtc3RhcnR8c3RlcHN8c3RyZXRjaHxzdHJpY3R8c3VifHN1cGVyfHN3LXJlc2l6ZXx0YWJsZS1jYXB0aW9ufHRhYmxlLWNlbGx8dGFibGUtY29sdW1uLWdyb3VwfHRhYmxlLWNvbHVtbnx0YWJsZS1mb290ZXItZ3JvdXB8dGFibGUtaGVhZGVyLWdyb3VwfHRhYmxlLXJvdy1ncm91cHx0YWJsZS1yb3d8dGFibGV8dGItcmx8dGV4dC1hZnRlci1lZGdlfHRleHQtYmVmb3JlLWVkZ2V8dGV4dC1ib3R0b218dGV4dC1zaXplfHRleHQtdG9wfHRleHR8dGhpY2t8dGhpbnx0cmFuc3BhcmVudHx1bmRlcmxpbmV8dXBwZXItYWxwaGF8dXBwZXItbGF0aW58dXBwZXItcm9tYW58dXBwZXJjYXNlfHVzZS1zY3JpcHR8dmVydGljYWwtaWRlb2dyYXBoaWN8dmVydGljYWwtdGV4dHx2aXNpYmxlfHctcmVzaXplfHdhaXR8d2hpdGVzcGFjZXx6LWluZGV4fHplcm98em9vbVwiO1xudmFyIHN1cHBvcnRDb25zdGFudENvbG9yID0gZXhwb3J0cy5zdXBwb3J0Q29uc3RhbnRDb2xvciA9IFwiYWxpY2VibHVlfGFudGlxdWV3aGl0ZXxhcXVhfGFxdWFtYXJpbmV8YXp1cmV8YmVpZ2V8YmlzcXVlfGJsYWNrfGJsYW5jaGVkYWxtb25kfGJsdWV8Ymx1ZXZpb2xldHxicm93bnxidXJseXdvb2R8Y2FkZXRibHVlfGNoYXJ0cmV1c2V8Y2hvY29sYXRlfGNvcmFsfGNvcm5mbG93ZXJibHVlfGNvcm5zaWxrfGNyaW1zb258Y3lhbnxkYXJrYmx1ZXxkYXJrY3lhbnxkYXJrZ29sZGVucm9kfGRhcmtncmF5fGRhcmtncmVlbnxkYXJrZ3JleXxkYXJra2hha2l8ZGFya21hZ2VudGF8ZGFya29saXZlZ3JlZW58ZGFya29yYW5nZXxkYXJrb3JjaGlkfGRhcmtyZWR8ZGFya3NhbG1vbnxkYXJrc2VhZ3JlZW58ZGFya3NsYXRlYmx1ZXxkYXJrc2xhdGVncmF5fGRhcmtzbGF0ZWdyZXl8ZGFya3R1cnF1b2lzZXxkYXJrdmlvbGV0fGRlZXBwaW5rfGRlZXBza3libHVlfGRpbWdyYXl8ZGltZ3JleXxkb2RnZXJibHVlfGZpcmVicmlja3xmbG9yYWx3aGl0ZXxmb3Jlc3RncmVlbnxmdWNoc2lhfGdhaW5zYm9yb3xnaG9zdHdoaXRlfGdvbGR8Z29sZGVucm9kfGdyYXl8Z3JlZW58Z3JlZW55ZWxsb3d8Z3JleXxob25leWRld3xob3RwaW5rfGluZGlhbnJlZHxpbmRpZ298aXZvcnl8a2hha2l8bGF2ZW5kZXJ8bGF2ZW5kZXJibHVzaHxsYXduZ3JlZW58bGVtb25jaGlmZm9ufGxpZ2h0Ymx1ZXxsaWdodGNvcmFsfGxpZ2h0Y3lhbnxsaWdodGdvbGRlbnJvZHllbGxvd3xsaWdodGdyYXl8bGlnaHRncmVlbnxsaWdodGdyZXl8bGlnaHRwaW5rfGxpZ2h0c2FsbW9ufGxpZ2h0c2VhZ3JlZW58bGlnaHRza3libHVlfGxpZ2h0c2xhdGVncmF5fGxpZ2h0c2xhdGVncmV5fGxpZ2h0c3RlZWxibHVlfGxpZ2h0eWVsbG93fGxpbWV8bGltZWdyZWVufGxpbmVufG1hZ2VudGF8bWFyb29ufG1lZGl1bWFxdWFtYXJpbmV8bWVkaXVtYmx1ZXxtZWRpdW1vcmNoaWR8bWVkaXVtcHVycGxlfG1lZGl1bXNlYWdyZWVufG1lZGl1bXNsYXRlYmx1ZXxtZWRpdW1zcHJpbmdncmVlbnxtZWRpdW10dXJxdW9pc2V8bWVkaXVtdmlvbGV0cmVkfG1pZG5pZ2h0Ymx1ZXxtaW50Y3JlYW18bWlzdHlyb3NlfG1vY2Nhc2lufG5hdmFqb3doaXRlfG5hdnl8b2xkbGFjZXxvbGl2ZXxvbGl2ZWRyYWJ8b3JhbmdlfG9yYW5nZXJlZHxvcmNoaWR8cGFsZWdvbGRlbnJvZHxwYWxlZ3JlZW58cGFsZXR1cnF1b2lzZXxwYWxldmlvbGV0cmVkfHBhcGF5YXdoaXB8cGVhY2hwdWZmfHBlcnV8cGlua3xwbHVtfHBvd2RlcmJsdWV8cHVycGxlfHJlYmVjY2FwdXJwbGV8cmVkfHJvc3licm93bnxyb3lhbGJsdWV8c2FkZGxlYnJvd258c2FsbW9ufHNhbmR5YnJvd258c2VhZ3JlZW58c2Vhc2hlbGx8c2llbm5hfHNpbHZlcnxza3libHVlfHNsYXRlYmx1ZXxzbGF0ZWdyYXl8c2xhdGVncmV5fHNub3d8c3ByaW5nZ3JlZW58c3RlZWxibHVlfHRhbnx0ZWFsfHRoaXN0bGV8dG9tYXRvfHR1cnF1b2lzZXx2aW9sZXR8d2hlYXR8d2hpdGV8d2hpdGVzbW9rZXx5ZWxsb3d8eWVsbG93Z3JlZW5cIjtcbnZhciBzdXBwb3J0Q29uc3RhbnRGb250cyA9IGV4cG9ydHMuc3VwcG9ydENvbnN0YW50Rm9udHMgPSBcImFyaWFsfGNlbnR1cnl8Y29taWN8Y291cmllcnxjdXJzaXZlfGZhbnRhc3l8Z2FyYW1vbmR8Z2VvcmdpYXxoZWx2ZXRpY2F8aW1wYWN0fGx1Y2lkYXxzeW1ib2x8c3lzdGVtfHRhaG9tYXx0aW1lc3x0cmVidWNoZXR8dXRvcGlhfHZlcmRhbmF8d2ViZGluZ3N8c2Fucy1zZXJpZnxzZXJpZnxtb25vc3BhY2VcIjtcblxudmFyIG51bVJlID0gZXhwb3J0cy5udW1SZSA9IFwiXFxcXC0/KD86KD86WzAtOV0rKD86XFxcXC5bMC05XSspPyl8KD86XFxcXC5bMC05XSspKVwiO1xudmFyIHBzZXVkb0VsZW1lbnRzID0gZXhwb3J0cy5wc2V1ZG9FbGVtZW50cyA9IFwiKFxcXFw6KylcXFxcYihhZnRlcnxiZWZvcmV8Zmlyc3QtbGV0dGVyfGZpcnN0LWxpbmV8bW96LXNlbGVjdGlvbnxzZWxlY3Rpb24pXFxcXGJcIjtcbnZhciBwc2V1ZG9DbGFzc2VzICA9IGV4cG9ydHMucHNldWRvQ2xhc3NlcyA9ICBcIig6KVxcXFxiKGFjdGl2ZXxjaGVja2VkfGRpc2FibGVkfGVtcHR5fGVuYWJsZWR8Zmlyc3QtY2hpbGR8Zmlyc3Qtb2YtdHlwZXxmb2N1c3xob3ZlcnxpbmRldGVybWluYXRlfGludmFsaWR8bGFzdC1jaGlsZHxsYXN0LW9mLXR5cGV8bGlua3xub3R8bnRoLWNoaWxkfG50aC1sYXN0LWNoaWxkfG50aC1sYXN0LW9mLXR5cGV8bnRoLW9mLXR5cGV8b25seS1jaGlsZHxvbmx5LW9mLXR5cGV8cmVxdWlyZWR8cm9vdHx0YXJnZXR8dmFsaWR8dmlzaXRlZClcXFxcYlwiO1xuXG52YXIgQ3NzSGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbigpIHtcblxuICAgIHZhciBrZXl3b3JkTWFwcGVyID0gdGhpcy5jcmVhdGVLZXl3b3JkTWFwcGVyKHtcbiAgICAgICAgXCJzdXBwb3J0LmZ1bmN0aW9uXCI6IHN1cHBvcnRGdW5jdGlvbixcbiAgICAgICAgXCJzdXBwb3J0LmNvbnN0YW50XCI6IHN1cHBvcnRDb25zdGFudCxcbiAgICAgICAgXCJzdXBwb3J0LnR5cGVcIjogc3VwcG9ydFR5cGUsXG4gICAgICAgIFwic3VwcG9ydC5jb25zdGFudC5jb2xvclwiOiBzdXBwb3J0Q29uc3RhbnRDb2xvcixcbiAgICAgICAgXCJzdXBwb3J0LmNvbnN0YW50LmZvbnRzXCI6IHN1cHBvcnRDb25zdGFudEZvbnRzXG4gICAgfSwgXCJ0ZXh0XCIsIHRydWUpO1xuXG4gICAgLy8gcmVnZXhwIG11c3Qgbm90IGhhdmUgY2FwdHVyaW5nIHBhcmVudGhlc2VzLiBVc2UgKD86KSBpbnN0ZWFkLlxuICAgIC8vIHJlZ2V4cHMgYXJlIG9yZGVyZWQgLT4gdGhlIGZpcnN0IG1hdGNoIGlzIHVzZWRcblxuICAgIHRoaXMuJHJ1bGVzID0ge1xuICAgICAgICBcInN0YXJ0XCIgOiBbe1xuICAgICAgICAgICAgaW5jbHVkZSA6IFtcInN0cmluZ3NcIiwgXCJ1cmxcIiwgXCJjb21tZW50c1wiXVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJwYXJlbi5scGFyZW5cIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFx7XCIsXG4gICAgICAgICAgICBuZXh0OiAgXCJydWxlc2V0XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwicGFyZW4ucnBhcmVuXCIsXG4gICAgICAgICAgICByZWdleDogXCJcXFxcfVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgcmVnZXg6IFwiQCg/IXZpZXdwb3J0KVwiLFxuICAgICAgICAgICAgbmV4dDogIFwibWVkaWFcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJrZXl3b3JkXCIsXG4gICAgICAgICAgICByZWdleDogXCIjW2EtejAtOS1fXStcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJrZXl3b3JkXCIsXG4gICAgICAgICAgICByZWdleDogXCIlXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwidmFyaWFibGVcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFwuW2EtejAtOS1fXStcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIjpbYS16MC05LV9dK1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5udW1lcmljXCIsXG4gICAgICAgICAgICByZWdleCA6IG51bVJlXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50XCIsXG4gICAgICAgICAgICByZWdleDogXCJbYS16MC05LV9dK1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGNhc2VJbnNlbnNpdGl2ZTogdHJ1ZVxuICAgICAgICB9XSxcblxuICAgICAgICBcIm1lZGlhXCI6IFt7XG4gICAgICAgICAgICBpbmNsdWRlIDogW1wic3RyaW5nc1wiLCBcInVybFwiLCBcImNvbW1lbnRzXCJdXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInBhcmVuLmxwYXJlblwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiXFxcXHtcIixcbiAgICAgICAgICAgIG5leHQ6ICBcInN0YXJ0XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwicGFyZW4ucnBhcmVuXCIsXG4gICAgICAgICAgICByZWdleDogXCJcXFxcfVwiLFxuICAgICAgICAgICAgbmV4dDogIFwic3RhcnRcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIjtcIixcbiAgICAgICAgICAgIG5leHQ6ICBcInN0YXJ0XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwia2V5d29yZFwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiKD86bWVkaWF8c3VwcG9ydHN8ZG9jdW1lbnR8Y2hhcnNldHxpbXBvcnR8bmFtZXNwYWNlfG1lZGlhfHN1cHBvcnRzfGRvY3VtZW50XCJcbiAgICAgICAgICAgICAgICArIFwifHBhZ2V8Zm9udHxrZXlmcmFtZXN8dmlld3BvcnR8Y291bnRlci1zdHlsZXxmb250LWZlYXR1cmUtdmFsdWVzXCJcbiAgICAgICAgICAgICAgICArIFwifHN3YXNofG9ybmFtZW50c3xhbm5vdGF0aW9ufHN0eWxpc3RpY3xzdHlsZXNldHxjaGFyYWN0ZXItdmFyaWFudClcIlxuICAgICAgICB9XSxcblxuICAgICAgICBcImNvbW1lbnRzXCIgOiBbe1xuICAgICAgICAgICAgdG9rZW46IFwiY29tbWVudFwiLCAvLyBtdWx0aSBsaW5lIGNvbW1lbnRcbiAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFwvXFxcXCpcIixcbiAgICAgICAgICAgIHB1c2g6IFt7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXCpcXFxcL1wiLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcInBvcFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuIDogXCJjb21tZW50XCJcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH1dLFxuXG4gICAgICAgIFwicnVsZXNldFwiIDogW3tcbiAgICAgICAgICAgIHJlZ2V4IDogXCItKHdlYmtpdHxtc3xtb3p8byktXCIsXG4gICAgICAgICAgICB0b2tlbiA6IFwidGV4dFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJwdW5jdHVhdGlvbi5vcGVyYXRvclwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIls6O11cIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwicGFyZW4ucnBhcmVuXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiXFxcXH1cIixcbiAgICAgICAgICAgIG5leHQgOiBcInN0YXJ0XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaW5jbHVkZSA6IFtcInN0cmluZ3NcIiwgXCJ1cmxcIiwgXCJjb21tZW50c1wiXVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFtcImNvbnN0YW50Lm51bWVyaWNcIiwgXCJrZXl3b3JkXCJdLFxuICAgICAgICAgICAgcmVnZXggOiBcIihcIiArIG51bVJlICsgXCIpKGNofGNtfGRlZ3xlbXxleHxmcnxnZHxncmFkfEh6fGlufGtIenxtbXxtc3xwY3xwdHxweHxyYWR8cmVtfHN8dHVybnx2aHx2bWF4fHZtaW58dm18dnd8JSlcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLFxuICAgICAgICAgICAgcmVnZXggOiBudW1SZVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLCAgLy8gaGV4NiBjb2xvclxuICAgICAgICAgICAgcmVnZXggOiBcIiNbYS1mMC05XXs2fVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5udW1lcmljXCIsIC8vIGhleDMgY29sb3JcbiAgICAgICAgICAgIHJlZ2V4IDogXCIjW2EtZjAtOV17M31cIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFtcInB1bmN0dWF0aW9uXCIsIFwiZW50aXR5Lm90aGVyLmF0dHJpYnV0ZS1uYW1lLnBzZXVkby1lbGVtZW50LmNzc1wiXSxcbiAgICAgICAgICAgIHJlZ2V4IDogcHNldWRvRWxlbWVudHNcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBbXCJwdW5jdHVhdGlvblwiLCBcImVudGl0eS5vdGhlci5hdHRyaWJ1dGUtbmFtZS5wc2V1ZG8tY2xhc3MuY3NzXCJdLFxuICAgICAgICAgICAgcmVnZXggOiBwc2V1ZG9DbGFzc2VzXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGluY2x1ZGU6IFwidXJsXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBrZXl3b3JkTWFwcGVyLFxuICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwtP1thLXpBLVpfXVthLXpBLVowLTlfXFxcXC1dKlwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInBhcmVuLmxwYXJlblwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiXFxcXHtcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBjYXNlSW5zZW5zaXRpdmU6IHRydWVcbiAgICAgICAgfV0sXG5cbiAgICAgICAgdXJsOiBbe1xuICAgICAgICAgICAgdG9rZW4gOiBcInN1cHBvcnQuZnVuY3Rpb25cIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCIoPzp1cmwoOj8tcHJlZml4KT98ZG9tYWlufHJlZ2V4cClcXFxcKFwiLFxuICAgICAgICAgICAgcHVzaDogW3tcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3VwcG9ydC5mdW5jdGlvblwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcKVwiLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcInBvcFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInN0cmluZ1wiXG4gICAgICAgICAgICB9XVxuICAgICAgICB9XSxcblxuICAgICAgICBzdHJpbmdzOiBbe1xuICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZy5zdGFydFwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIidcIixcbiAgICAgICAgICAgIHB1c2ggOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmcuZW5kXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIid8JFwiLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpbmNsdWRlIDogXCJlc2NhcGVzXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvXFxcXCQvLFxuICAgICAgICAgICAgICAgIGNvbnN1bWVMaW5lRW5kOiB0cnVlXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInN0cmluZ1wiXG4gICAgICAgICAgICB9XVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nLnN0YXJ0XCIsXG4gICAgICAgICAgICByZWdleCA6ICdcIicsXG4gICAgICAgICAgICBwdXNoIDogW3tcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nLmVuZFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogJ1wifCQnLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpbmNsdWRlIDogXCJlc2NhcGVzXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvXFxcXCQvLFxuICAgICAgICAgICAgICAgIGNvbnN1bWVMaW5lRW5kOiB0cnVlXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInN0cmluZ1wiXG4gICAgICAgICAgICB9XVxuICAgICAgICB9XSxcbiAgICAgICAgZXNjYXBlczogW3tcbiAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIixcbiAgICAgICAgICAgIHJlZ2V4IDogL1xcXFwoW2EtZkEtRlxcZF17MSw2fXxbXmEtZkEtRlxcZF0pL1xuICAgICAgICB9XVxuXG4gICAgfTtcblxuICAgIHRoaXMubm9ybWFsaXplUnVsZXMoKTtcbn07XG5cbm9vcC5pbmhlcml0cyhDc3NIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuZXhwb3J0cy5Dc3NIaWdobGlnaHRSdWxlcyA9IENzc0hpZ2hsaWdodFJ1bGVzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vLi4vbGliL29vcFwiKTtcbnZhciBSYW5nZSA9IHJlcXVpcmUoXCIuLi8uLi9yYW5nZVwiKS5SYW5nZTtcbnZhciBCYXNlRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9mb2xkX21vZGVcIikuRm9sZE1vZGU7XG5cbnZhciBGb2xkTW9kZSA9IGV4cG9ydHMuRm9sZE1vZGUgPSBmdW5jdGlvbihjb21tZW50UmVnZXgpIHtcbiAgICBpZiAoY29tbWVudFJlZ2V4KSB7XG4gICAgICAgIHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyID0gbmV3IFJlZ0V4cChcbiAgICAgICAgICAgIHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyLnNvdXJjZS5yZXBsYWNlKC9cXHxbXnxdKj8kLywgXCJ8XCIgKyBjb21tZW50UmVnZXguc3RhcnQpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIgPSBuZXcgUmVnRXhwKFxuICAgICAgICAgICAgdGhpcy5mb2xkaW5nU3RvcE1hcmtlci5zb3VyY2UucmVwbGFjZSgvXFx8W158XSo/JC8sIFwifFwiICsgY29tbWVudFJlZ2V4LmVuZClcbiAgICAgICAgKTtcbiAgICB9XG59O1xub29wLmluaGVyaXRzKEZvbGRNb2RlLCBCYXNlRm9sZE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgXG4gICAgdGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIgPSAvKFtcXHtcXFtcXChdKVteXFx9XFxdXFwpXSokfF5cXHMqKFxcL1xcKikvO1xuICAgIHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIgPSAvXlteXFxbXFx7XFwoXSooW1xcfVxcXVxcKV0pfF5bXFxzXFwqXSooXFwqXFwvKS87XG4gICAgdGhpcy5zaW5nbGVMaW5lQmxvY2tDb21tZW50UmU9IC9eXFxzKihcXC9cXCopLipcXCpcXC9cXHMqJC87XG4gICAgdGhpcy50cmlwbGVTdGFyQmxvY2tDb21tZW50UmUgPSAvXlxccyooXFwvXFwqXFwqXFwqKS4qXFwqXFwvXFxzKiQvO1xuICAgIHRoaXMuc3RhcnRSZWdpb25SZSA9IC9eXFxzKihcXC9cXCp8XFwvXFwvKSM/cmVnaW9uXFxiLztcbiAgICBcbiAgICAvL3ByZXZlbnQgbmFtaW5nIGNvbmZsaWN0IHdpdGggYW55IG1vZGVzIHRoYXQgaW5oZXJpdCBmcm9tIGNzdHlsZSBhbmQgb3ZlcnJpZGUgdGhpcyAobGlrZSBjc2hhcnApXG4gICAgdGhpcy5fZ2V0Rm9sZFdpZGdldEJhc2UgPSB0aGlzLmdldEZvbGRXaWRnZXQ7XG4gICAgXG4gICAgLyoqXG4gICAgICogR2V0cyBmb2xkIHdpZGdldCB3aXRoIHNvbWUgbm9uLXN0YW5kYXJkIGV4dHJhczpcbiAgICAgKlxuICAgICAqIEBleGFtcGxlIGxpbmVDb21tZW50UmVnaW9uU3RhcnRcbiAgICAgKiAgICAgIC8vI3JlZ2lvbiBbb3B0aW9uYWwgZGVzY3JpcHRpb25dXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSBibG9ja0NvbW1lbnRSZWdpb25TdGFydFxuICAgICAqICAgICAgLyojcmVnaW9uIFtvcHRpb25hbCBkZXNjcmlwdGlvbl0gKlsvXVxuICAgICAqXG4gICAgICogQGV4YW1wbGUgdHJpcGxlU3RhckZvbGRpbmdTZWN0aW9uXG4gICAgICogICAgICAvKioqIHRoaXMgZm9sZHMgZXZlbiB0aG91Z2ggMSBsaW5lIGJlY2F1c2UgaXQgaGFzIDMgc3RhcnMgKioqWy9dXG4gICAgICogXG4gICAgICogQG5vdGUgdGhlIHBvdW5kIHN5bWJvbCBmb3IgcmVnaW9uIHRhZ3MgaXMgb3B0aW9uYWxcbiAgICAgKi9cbiAgICB0aGlzLmdldEZvbGRXaWRnZXQgPSBmdW5jdGlvbihzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdykge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgIFxuICAgICAgICBpZiAodGhpcy5zaW5nbGVMaW5lQmxvY2tDb21tZW50UmUudGVzdChsaW5lKSkge1xuICAgICAgICAgICAgLy8gTm8gd2lkZ2V0IGZvciBzaW5nbGUgbGluZSBibG9jayBjb21tZW50IHVubGVzcyByZWdpb24gb3IgdHJpcGxlIHN0YXJcbiAgICAgICAgICAgIGlmICghdGhpcy5zdGFydFJlZ2lvblJlLnRlc3QobGluZSkgJiYgIXRoaXMudHJpcGxlU3RhckJsb2NrQ29tbWVudFJlLnRlc3QobGluZSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgdmFyIGZ3ID0gdGhpcy5fZ2V0Rm9sZFdpZGdldEJhc2Uoc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpO1xuICAgIFxuICAgICAgICBpZiAoIWZ3ICYmIHRoaXMuc3RhcnRSZWdpb25SZS50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgcmV0dXJuIFwic3RhcnRcIjsgLy8gbGluZUNvbW1lbnRSZWdpb25TdGFydFxuICAgIFxuICAgICAgICByZXR1cm4gZnc7XG4gICAgfTtcblxuICAgIHRoaXMuZ2V0Rm9sZFdpZGdldFJhbmdlID0gZnVuY3Rpb24oc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3csIGZvcmNlTXVsdGlsaW5lKSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5zdGFydFJlZ2lvblJlLnRlc3QobGluZSkpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRDb21tZW50UmVnaW9uQmxvY2soc2Vzc2lvbiwgbGluZSwgcm93KTtcbiAgICAgICAgXG4gICAgICAgIHZhciBtYXRjaCA9IGxpbmUubWF0Y2godGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIpO1xuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIHZhciBpID0gbWF0Y2guaW5kZXg7XG5cbiAgICAgICAgICAgIGlmIChtYXRjaFsxXSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5vcGVuaW5nQnJhY2tldEJsb2NrKHNlc3Npb24sIG1hdGNoWzFdLCByb3csIGkpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIHJhbmdlID0gc2Vzc2lvbi5nZXRDb21tZW50Rm9sZFJhbmdlKHJvdywgaSArIG1hdGNoWzBdLmxlbmd0aCwgMSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChyYW5nZSAmJiAhcmFuZ2UuaXNNdWx0aUxpbmUoKSkge1xuICAgICAgICAgICAgICAgIGlmIChmb3JjZU11bHRpbGluZSkge1xuICAgICAgICAgICAgICAgICAgICByYW5nZSA9IHRoaXMuZ2V0U2VjdGlvblJhbmdlKHNlc3Npb24sIHJvdyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChmb2xkU3R5bGUgIT0gXCJhbGxcIilcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2UgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gcmFuZ2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZm9sZFN0eWxlID09PSBcIm1hcmtiZWdpblwiKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHZhciBtYXRjaCA9IGxpbmUubWF0Y2godGhpcy5mb2xkaW5nU3RvcE1hcmtlcik7XG4gICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgdmFyIGkgPSBtYXRjaC5pbmRleCArIG1hdGNoWzBdLmxlbmd0aDtcblxuICAgICAgICAgICAgaWYgKG1hdGNoWzFdKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNsb3NpbmdCcmFja2V0QmxvY2soc2Vzc2lvbiwgbWF0Y2hbMV0sIHJvdywgaSk7XG5cbiAgICAgICAgICAgIHJldHVybiBzZXNzaW9uLmdldENvbW1lbnRGb2xkUmFuZ2Uocm93LCBpLCAtMSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFxuICAgIHRoaXMuZ2V0U2VjdGlvblJhbmdlID0gZnVuY3Rpb24oc2Vzc2lvbiwgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgIHZhciBzdGFydEluZGVudCA9IGxpbmUuc2VhcmNoKC9cXFMvKTtcbiAgICAgICAgdmFyIHN0YXJ0Um93ID0gcm93O1xuICAgICAgICB2YXIgc3RhcnRDb2x1bW4gPSBsaW5lLmxlbmd0aDtcbiAgICAgICAgcm93ID0gcm93ICsgMTtcbiAgICAgICAgdmFyIGVuZFJvdyA9IHJvdztcbiAgICAgICAgdmFyIG1heFJvdyA9IHNlc3Npb24uZ2V0TGVuZ3RoKCk7XG4gICAgICAgIHdoaWxlICgrK3JvdyA8IG1heFJvdykge1xuICAgICAgICAgICAgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICAgICAgdmFyIGluZGVudCA9IGxpbmUuc2VhcmNoKC9cXFMvKTtcbiAgICAgICAgICAgIGlmIChpbmRlbnQgPT09IC0xKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgaWYgIChzdGFydEluZGVudCA+IGluZGVudClcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIHZhciBzdWJSYW5nZSA9IHRoaXMuZ2V0Rm9sZFdpZGdldFJhbmdlKHNlc3Npb24sIFwiYWxsXCIsIHJvdyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChzdWJSYW5nZSkge1xuICAgICAgICAgICAgICAgIGlmIChzdWJSYW5nZS5zdGFydC5yb3cgPD0gc3RhcnRSb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzdWJSYW5nZS5pc011bHRpTGluZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJvdyA9IHN1YlJhbmdlLmVuZC5yb3c7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzdGFydEluZGVudCA9PSBpbmRlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZW5kUm93ID0gcm93O1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gbmV3IFJhbmdlKHN0YXJ0Um93LCBzdGFydENvbHVtbiwgZW5kUm93LCBzZXNzaW9uLmdldExpbmUoZW5kUm93KS5sZW5ndGgpO1xuICAgIH07XG4gICAgXG4gICAgLyoqXG4gICAgICogZ2V0cyBjb21tZW50IHJlZ2lvbiBibG9jayB3aXRoIGVuZCByZWdpb24gYXNzdW1lZCB0byBiZSBzdGFydCBvZiBjb21tZW50IGluIGFueSBjc3R5bGUgbW9kZSBvciBTUUwgbW9kZSAoLS0pIHdoaWNoIGluaGVyaXRzIGZyb20gdGhpcy5cbiAgICAgKiBUaGVyZSBtYXkgb3B0aW9uYWxseSBiZSBhIHBvdW5kIHN5bWJvbCBiZWZvcmUgdGhlIHJlZ2lvbi9lbmRyZWdpb24gc3RhdGVtZW50XG4gICAgICovXG4gICAgdGhpcy5nZXRDb21tZW50UmVnaW9uQmxvY2sgPSBmdW5jdGlvbihzZXNzaW9uLCBsaW5lLCByb3cpIHtcbiAgICAgICAgdmFyIHN0YXJ0Q29sdW1uID0gbGluZS5zZWFyY2goL1xccyokLyk7XG4gICAgICAgIHZhciBtYXhSb3cgPSBzZXNzaW9uLmdldExlbmd0aCgpO1xuICAgICAgICB2YXIgc3RhcnRSb3cgPSByb3c7XG4gICAgICAgIFxuICAgICAgICB2YXIgcmUgPSAvXlxccyooPzpcXC9cXCp8XFwvXFwvfC0tKSM/KGVuZCk/cmVnaW9uXFxiLztcbiAgICAgICAgdmFyIGRlcHRoID0gMTtcbiAgICAgICAgd2hpbGUgKCsrcm93IDwgbWF4Um93KSB7XG4gICAgICAgICAgICBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgICAgICB2YXIgbSA9IHJlLmV4ZWMobGluZSk7XG4gICAgICAgICAgICBpZiAoIW0pIGNvbnRpbnVlO1xuICAgICAgICAgICAgaWYgKG1bMV0pIGRlcHRoLS07XG4gICAgICAgICAgICBlbHNlIGRlcHRoKys7XG5cbiAgICAgICAgICAgIGlmICghZGVwdGgpIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGVuZFJvdyA9IHJvdztcbiAgICAgICAgaWYgKGVuZFJvdyA+IHN0YXJ0Um93KSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFJhbmdlKHN0YXJ0Um93LCBzdGFydENvbHVtbiwgZW5kUm93LCBsaW5lLmxlbmd0aCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG59KS5jYWxsKEZvbGRNb2RlLnByb3RvdHlwZSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRNb2RlID0gcmVxdWlyZShcIi4vdGV4dFwiKS5Nb2RlO1xudmFyIExlc3NIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL2xlc3NfaGlnaGxpZ2h0X3J1bGVzXCIpLkxlc3NIaWdobGlnaHRSdWxlcztcbnZhciBNYXRjaGluZ0JyYWNlT3V0ZGVudCA9IHJlcXVpcmUoXCIuL21hdGNoaW5nX2JyYWNlX291dGRlbnRcIikuTWF0Y2hpbmdCcmFjZU91dGRlbnQ7XG52YXIgQ3NzQmVoYXZpb3VyID0gcmVxdWlyZShcIi4vYmVoYXZpb3VyL2Nzc1wiKS5Dc3NCZWhhdmlvdXI7XG52YXIgQ3NzQ29tcGxldGlvbnMgPSByZXF1aXJlKFwiLi9jc3NfY29tcGxldGlvbnNcIikuQ3NzQ29tcGxldGlvbnM7XG5cbnZhciBDU3R5bGVGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRpbmcvY3N0eWxlXCIpLkZvbGRNb2RlO1xuXG52YXIgTW9kZSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuSGlnaGxpZ2h0UnVsZXMgPSBMZXNzSGlnaGxpZ2h0UnVsZXM7XG4gICAgdGhpcy4kb3V0ZGVudCA9IG5ldyBNYXRjaGluZ0JyYWNlT3V0ZGVudCgpO1xuICAgIHRoaXMuJGJlaGF2aW91ciA9IG5ldyBDc3NCZWhhdmlvdXIoKTtcbiAgICB0aGlzLiRjb21wbGV0ZXIgPSBuZXcgQ3NzQ29tcGxldGlvbnMoKTtcbiAgICB0aGlzLmZvbGRpbmdSdWxlcyA9IG5ldyBDU3R5bGVGb2xkTW9kZSgpO1xufTtcbm9vcC5pbmhlcml0cyhNb2RlLCBUZXh0TW9kZSk7XG5cbihmdW5jdGlvbigpIHtcblxuICAgIHRoaXMubGluZUNvbW1lbnRTdGFydCA9IFwiLy9cIjtcbiAgICB0aGlzLmJsb2NrQ29tbWVudCA9IHtzdGFydDogXCIvKlwiLCBlbmQ6IFwiKi9cIn07XG4gICAgXG4gICAgdGhpcy5nZXROZXh0TGluZUluZGVudCA9IGZ1bmN0aW9uKHN0YXRlLCBsaW5lLCB0YWIpIHtcbiAgICAgICAgdmFyIGluZGVudCA9IHRoaXMuJGdldEluZGVudChsaW5lKTtcblxuICAgICAgICAvLyBpZ25vcmUgYnJhY2VzIGluIGNvbW1lbnRzXG4gICAgICAgIHZhciB0b2tlbnMgPSB0aGlzLmdldFRva2VuaXplcigpLmdldExpbmVUb2tlbnMobGluZSwgc3RhdGUpLnRva2VucztcbiAgICAgICAgaWYgKHRva2Vucy5sZW5ndGggJiYgdG9rZW5zW3Rva2Vucy5sZW5ndGgtMV0udHlwZSA9PSBcImNvbW1lbnRcIikge1xuICAgICAgICAgICAgcmV0dXJuIGluZGVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBtYXRjaCA9IGxpbmUubWF0Y2goL14uKlxce1xccyokLyk7XG4gICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgaW5kZW50ICs9IHRhYjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpbmRlbnQ7XG4gICAgfTtcblxuICAgIHRoaXMuY2hlY2tPdXRkZW50ID0gZnVuY3Rpb24oc3RhdGUsIGxpbmUsIGlucHV0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRvdXRkZW50LmNoZWNrT3V0ZGVudChsaW5lLCBpbnB1dCk7XG4gICAgfTtcblxuICAgIHRoaXMuYXV0b091dGRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgZG9jLCByb3cpIHtcbiAgICAgICAgdGhpcy4kb3V0ZGVudC5hdXRvT3V0ZGVudChkb2MsIHJvdyk7XG4gICAgfTtcblxuICAgIHRoaXMuZ2V0Q29tcGxldGlvbnMgPSBmdW5jdGlvbihzdGF0ZSwgc2Vzc2lvbiwgcG9zLCBwcmVmaXgpIHtcbiAgICAgICAgLy8gQ1NTIGNvbXBsZXRpb25zIG9ubHkgd29yayB3aXRoIHNpbmdsZSAobm90IG5lc3RlZCkgcnVsZXNldHNcbiAgICAgICAgcmV0dXJuIHRoaXMuJGNvbXBsZXRlci5nZXRDb21wbGV0aW9ucyhcInJ1bGVzZXRcIiwgc2Vzc2lvbiwgcG9zLCBwcmVmaXgpO1xuICAgIH07XG5cbiAgICB0aGlzLiRpZCA9IFwiYWNlL21vZGUvbGVzc1wiO1xufSkuY2FsbChNb2RlLnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTW9kZSA9IE1vZGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcbnZhciBDc3NIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoJy4vY3NzX2hpZ2hsaWdodF9ydWxlcycpO1xuXG52YXIgTGVzc0hpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24oKSB7XG5cblxuICAgIHZhciBrZXl3b3JkTGlzdCA9IFwiQGltcG9ydHxAbWVkaWF8QGZvbnQtZmFjZXxAa2V5ZnJhbWVzfEAtd2Via2l0LWtleWZyYW1lc3xAc3VwcG9ydHN8XCIgKyBcbiAgICAgICAgXCJAY2hhcnNldHxAcGx1Z2lufEBuYW1lc3BhY2V8QGRvY3VtZW50fEBwYWdlfEB2aWV3cG9ydHxALW1zLXZpZXdwb3J0fFwiICtcbiAgICAgICAgXCJvcnxhbmR8d2hlbnxub3RcIjtcblxuICAgIHZhciBrZXl3b3JkcyA9IGtleXdvcmRMaXN0LnNwbGl0KCd8Jyk7XG5cbiAgICB2YXIgcHJvcGVydGllcyA9IENzc0hpZ2hsaWdodFJ1bGVzLnN1cHBvcnRUeXBlLnNwbGl0KCd8Jyk7XG5cbiAgICB2YXIga2V5d29yZE1hcHBlciA9IHRoaXMuY3JlYXRlS2V5d29yZE1hcHBlcih7XG4gICAgICAgIFwic3VwcG9ydC5jb25zdGFudFwiOiBDc3NIaWdobGlnaHRSdWxlcy5zdXBwb3J0Q29uc3RhbnQsXG4gICAgICAgIFwia2V5d29yZFwiOiBrZXl3b3JkTGlzdCxcbiAgICAgICAgXCJzdXBwb3J0LmNvbnN0YW50LmNvbG9yXCI6IENzc0hpZ2hsaWdodFJ1bGVzLnN1cHBvcnRDb25zdGFudENvbG9yLFxuICAgICAgICBcInN1cHBvcnQuY29uc3RhbnQuZm9udHNcIjogQ3NzSGlnaGxpZ2h0UnVsZXMuc3VwcG9ydENvbnN0YW50Rm9udHNcbiAgICB9LCBcImlkZW50aWZpZXJcIiwgdHJ1ZSk7ICAgXG5cbiAgICAvLyByZWdleHAgbXVzdCBub3QgaGF2ZSBjYXB0dXJpbmcgcGFyZW50aGVzZXMuIFVzZSAoPzopIGluc3RlYWQuXG4gICAgLy8gcmVnZXhwcyBhcmUgb3JkZXJlZCAtPiB0aGUgZmlyc3QgbWF0Y2ggaXMgdXNlZFxuXG4gICAgdmFyIG51bVJlID0gXCJcXFxcLT8oPzooPzpbMC05XSspfCg/OlswLTldKlxcXFwuWzAtOV0rKSlcIjtcblxuICAgIC8vIHJlZ2V4cCBtdXN0IG5vdCBoYXZlIGNhcHR1cmluZyBwYXJlbnRoZXNlcy4gVXNlICg/OikgaW5zdGVhZC5cbiAgICAvLyByZWdleHBzIGFyZSBvcmRlcmVkIC0+IHRoZSBmaXJzdCBtYXRjaCBpcyB1c2VkXG5cbiAgICB0aGlzLiRydWxlcyA9IHtcbiAgICAgICAgXCJzdGFydFwiIDogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwvXFxcXC8uKiRcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudFwiLCAvLyBtdWx0aSBsaW5lIGNvbW1lbnRcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXC9cXFxcKlwiLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcImNvbW1lbnRcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIiwgLy8gc2luZ2xlIGxpbmVcbiAgICAgICAgICAgICAgICByZWdleCA6ICdbXCJdKD86KD86XFxcXFxcXFwuKXwoPzpbXlwiXFxcXFxcXFxdKSkqP1tcIl0nXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLCAvLyBzaW5nbGUgbGluZVxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJbJ10oPzooPzpcXFxcXFxcXC4pfCg/OlteJ1xcXFxcXFxcXSkpKj9bJ11cIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogW1wiY29uc3RhbnQubnVtZXJpY1wiLCBcImtleXdvcmRcIl0sXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIihcIiArIG51bVJlICsgXCIpKGNofGNtfGRlZ3xlbXxleHxmcnxnZHxncmFkfEh6fGlufGtIenxtbXxtc3xwY3xwdHxweHxyYWR8cmVtfHN8dHVybnx2aHx2bXx2d3wlKVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIiwgLy8gaGV4NiBjb2xvclxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIjW2EtZjAtOV17Nn1cIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5udW1lcmljXCIsIC8vIGhleDMgY29sb3JcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiI1thLWYwLTldezN9XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogbnVtUmVcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFtcInN1cHBvcnQuZnVuY3Rpb25cIiwgXCJwYXJlbi5scGFyZW5cIiwgXCJzdHJpbmdcIiwgXCJwYXJlbi5ycGFyZW5cIl0sXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIih1cmwpKFxcXFwoKSguKikoXFxcXCkpXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFtcInN1cHBvcnQuZnVuY3Rpb25cIiwgXCJwYXJlbi5scGFyZW5cIl0sXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIig6ZXh0ZW5kfFthLXowLTlfXFxcXC1dKykoXFxcXCgpXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChrZXl3b3Jkcy5pbmRleE9mKHZhbHVlLnRvTG93ZXJDYXNlKCkpID4gLTEpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJrZXl3b3JkXCI7XG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcInZhcmlhYmxlXCI7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiW0BcXFxcJF1bYS16MC05X1xcXFwtQFxcXFwkXSpcXFxcYlwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInZhcmlhYmxlXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIltAXFxcXCRdXFxcXHtbYS16MC05X1xcXFwtQFxcXFwkXSpcXFxcfVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBmdW5jdGlvbihmaXJzdCwgc2Vjb25kKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKHByb3BlcnRpZXMuaW5kZXhPZihmaXJzdC50b0xvd2VyQ2FzZSgpKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1wic3VwcG9ydC50eXBlLnByb3BlcnR5XCIsIFwidGV4dFwiXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbXCJzdXBwb3J0LnR5cGUudW5rbm93blByb3BlcnR5XCIsIFwidGV4dFwiXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIihbYS16MC05LV9dKykoXFxcXHMqOilcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIiZcIiAgIC8vIHNwZWNpYWwgY2FzZSAtIGFsd2F5cyB0cmVhdCBhcyBrZXl3b3JkXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBrZXl3b3JkTWFwcGVyLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcLT9bQGEtel9dW0BhLXowLTlfXFxcXC1dKlwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwidmFyaWFibGUubGFuZ3VhZ2VcIixcbiAgICAgICAgICAgICAgICByZWdleDogXCIjW2EtejAtOS1fXStcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInZhcmlhYmxlLmxhbmd1YWdlXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiXFxcXC5bYS16MC05LV9dK1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwidmFyaWFibGUubGFuZ3VhZ2VcIixcbiAgICAgICAgICAgICAgICByZWdleDogXCI6W2Etel9dW2EtejAtOS1fXSpcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50XCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiW2EtejAtOS1fXStcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIjx8Pnw8PXw+PXw9fCE9fC18JXxcXFxcK3xcXFxcKlwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInBhcmVuLmxwYXJlblwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJbWyh7XVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInBhcmVuLnJwYXJlblwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJbXFxcXF0pfV1cIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFxzK1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgY2FzZUluc2Vuc2l0aXZlOiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIFwiY29tbWVudFwiIDogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsIC8vIGNsb3NpbmcgY29tbWVudFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcKlxcXFwvXCIsXG4gICAgICAgICAgICAgICAgbmV4dCA6IFwic3RhcnRcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbiA6IFwiY29tbWVudFwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9O1xuICAgIHRoaXMubm9ybWFsaXplUnVsZXMoKTtcbn07XG5cbm9vcC5pbmhlcml0cyhMZXNzSGlnaGxpZ2h0UnVsZXMsIFRleHRIaWdobGlnaHRSdWxlcyk7XG5cbmV4cG9ydHMuTGVzc0hpZ2hsaWdodFJ1bGVzID0gTGVzc0hpZ2hsaWdodFJ1bGVzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBSYW5nZSA9IHJlcXVpcmUoXCIuLi9yYW5nZVwiKS5SYW5nZTtcblxudmFyIE1hdGNoaW5nQnJhY2VPdXRkZW50ID0gZnVuY3Rpb24oKSB7fTtcblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5jaGVja091dGRlbnQgPSBmdW5jdGlvbihsaW5lLCBpbnB1dCkge1xuICAgICAgICBpZiAoISAvXlxccyskLy50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIHJldHVybiAvXlxccypcXH0vLnRlc3QoaW5wdXQpO1xuICAgIH07XG5cbiAgICB0aGlzLmF1dG9PdXRkZW50ID0gZnVuY3Rpb24oZG9jLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBkb2MuZ2V0TGluZShyb3cpO1xuICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKC9eKFxccypcXH0pLyk7XG5cbiAgICAgICAgaWYgKCFtYXRjaCkgcmV0dXJuIDA7XG5cbiAgICAgICAgdmFyIGNvbHVtbiA9IG1hdGNoWzFdLmxlbmd0aDtcbiAgICAgICAgdmFyIG9wZW5CcmFjZVBvcyA9IGRvYy5maW5kTWF0Y2hpbmdCcmFja2V0KHtyb3c6IHJvdywgY29sdW1uOiBjb2x1bW59KTtcblxuICAgICAgICBpZiAoIW9wZW5CcmFjZVBvcyB8fCBvcGVuQnJhY2VQb3Mucm93ID09IHJvdykgcmV0dXJuIDA7XG5cbiAgICAgICAgdmFyIGluZGVudCA9IHRoaXMuJGdldEluZGVudChkb2MuZ2V0TGluZShvcGVuQnJhY2VQb3Mucm93KSk7XG4gICAgICAgIGRvYy5yZXBsYWNlKG5ldyBSYW5nZShyb3csIDAsIHJvdywgY29sdW1uLTEpLCBpbmRlbnQpO1xuICAgIH07XG5cbiAgICB0aGlzLiRnZXRJbmRlbnQgPSBmdW5jdGlvbihsaW5lKSB7XG4gICAgICAgIHJldHVybiBsaW5lLm1hdGNoKC9eXFxzKi8pWzBdO1xuICAgIH07XG5cbn0pLmNhbGwoTWF0Y2hpbmdCcmFjZU91dGRlbnQucHJvdG90eXBlKTtcblxuZXhwb3J0cy5NYXRjaGluZ0JyYWNlT3V0ZGVudCA9IE1hdGNoaW5nQnJhY2VPdXRkZW50O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9