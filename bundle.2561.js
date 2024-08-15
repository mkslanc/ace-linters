"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[2561],{

/***/ 28068:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



    var oop = __webpack_require__(2645);
    var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

    oop.inherits(CoffeeHighlightRules, TextHighlightRules);

    function CoffeeHighlightRules() {
        var identifier = "[$A-Za-z_\\x7f-\\uffff][$\\w\\x7f-\\uffff]*";

        var keywords = (
            "this|throw|then|try|typeof|super|switch|return|break|by|continue|" +
            "catch|class|in|instanceof|is|isnt|if|else|extends|for|own|" +
            "finally|function|while|when|new|no|not|delete|debugger|do|loop|of|off|" +
            "or|on|unless|until|and|yes|yield|export|import|default"
        );

        var langConstant = (
            "true|false|null|undefined|NaN|Infinity"
        );

        var illegal = (
            "case|const|function|var|void|with|enum|implements|" +
            "interface|let|package|private|protected|public|static"
        );

        var supportClass = (
            "Array|Boolean|Date|Function|Number|Object|RegExp|ReferenceError|String|" +
            "Error|EvalError|InternalError|RangeError|ReferenceError|StopIteration|" +
            "SyntaxError|TypeError|URIError|"  +
            "ArrayBuffer|Float32Array|Float64Array|Int16Array|Int32Array|Int8Array|" +
            "Uint16Array|Uint32Array|Uint8Array|Uint8ClampedArray"
        );

        var supportFunction = (
            "Math|JSON|isNaN|isFinite|parseInt|parseFloat|encodeURI|" +
            "encodeURIComponent|decodeURI|decodeURIComponent|String|"
        );

        var variableLanguage = (
            "window|arguments|prototype|document"
        );

        var keywordMapper = this.createKeywordMapper({
            "keyword": keywords,
            "constant.language": langConstant,
            "invalid.illegal": illegal,
            "language.support.class": supportClass,
            "language.support.function": supportFunction,
            "variable.language": variableLanguage
        }, "identifier");

        var functionRule = {
            token: ["paren.lparen", "variable.parameter", "paren.rparen", "text", "storage.type"],
            regex: /(?:(\()((?:"[^")]*?"|'[^')]*?'|\/[^\/)]*?\/|[^()"'\/])*?)(\))(\s*))?([\-=]>)/.source
        };

        var stringEscape = /\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|[0-2][0-7]{0,2}|3[0-6][0-7]?|37[0-7]?|[4-7][0-7]?|.)/;

        this.$rules = {
            start : [
                {
                    token : "constant.numeric",
                    regex : "(?:0x[\\da-fA-F]+|(?:\\d+(?:\\.\\d+)?|\\.\\d+)(?:[eE][+-]?\\d+)?)"
                }, {
                    stateName: "qdoc",
                    token : "string", regex : "'''", next : [
                        {token : "string", regex : "'''", next : "start"},
                        {token : "constant.language.escape", regex : stringEscape},
                        {defaultToken: "string"}
                    ]
                }, {
                    stateName: "qqdoc",
                    token : "string",
                    regex : '"""',
                    next : [
                        {token : "string", regex : '"""', next : "start"},
                        {token : "paren.string", regex : '#{', push : "start"},
                        {token : "constant.language.escape", regex : stringEscape},
                        {defaultToken: "string"}
                    ]
                }, {
                    stateName: "qstring",
                    token : "string", regex : "'", next : [
                        {token : "string", regex : "'", next : "start"},
                        {token : "constant.language.escape", regex : stringEscape},
                        {defaultToken: "string"}
                    ]
                }, {
                    stateName: "qqstring",
                    token : "string.start", regex : '"', next : [
                        {token : "string.end", regex : '"', next : "start"},
                        {token : "paren.string", regex : '#{', push : "start"},
                        {token : "constant.language.escape", regex : stringEscape},
                        {defaultToken: "string"}
                    ]
                }, {
                    stateName: "js",
                    token : "string", regex : "`", next : [
                        {token : "string", regex : "`", next : "start"},
                        {token : "constant.language.escape", regex : stringEscape},
                        {defaultToken: "string"}
                    ]
                }, {
                    regex: "[{}]", onMatch: function(val, state, stack) {
                        this.next = "";
                        if (val == "{" && stack.length) {
                            stack.unshift("start", state);
                            return "paren";
                        }
                        if (val == "}" && stack.length) {
                            stack.shift();
                            this.next = stack.shift() || "";
                            if (this.next.indexOf("string") != -1)
                                return "paren.string";
                        }
                        return "paren";
                    }
                }, {
                    token : "string.regex",
                    regex : "///",
                    next : "heregex"
                }, {
                    token : "string.regex",
                    regex : /(?:\/(?![\s=])[^[\/\n\\]*(?:(?:\\[\s\S]|\[[^\]\n\\]*(?:\\[\s\S][^\]\n\\]*)*])[^[\/\n\\]*)*\/)(?:[imgy]{0,4})(?!\w)/
                }, {
                    token : "comment",
                    regex : "###(?!#)",
                    next : "comment"
                }, {
                    token : "comment",
                    regex : "#.*"
                }, {
                    token : ["punctuation.operator", "text", "identifier"],
                    regex : "(\\.)(\\s*)(" + illegal + ")"
                }, {
                    token : "punctuation.operator",
                    regex : "\\.{1,3}"
                }, {
                    //class A extends B
                    token : ["keyword", "text", "language.support.class",
                     "text", "keyword", "text", "language.support.class"],
                    regex : "(class)(\\s+)(" + identifier + ")(?:(\\s+)(extends)(\\s+)(" + identifier + "))?"
                }, {
                    //play = (...) ->
                    token : ["entity.name.function", "text", "keyword.operator", "text"].concat(functionRule.token),
                    regex : "(" + identifier + ")(\\s*)([=:])(\\s*)" + functionRule.regex
                }, 
                functionRule, 
                {
                    token : "variable",
                    regex : "@(?:" + identifier + ")?"
                }, {
                    token: keywordMapper,
                    regex : identifier
                }, {
                    token : "punctuation.operator",
                    regex : "\\,|\\."
                }, {
                    token : "storage.type",
                    regex : "[\\-=]>"
                }, {
                    token : "keyword.operator",
                    regex : "(?:[-+*/%<>&|^!?=]=|>>>=?|\\-\\-|\\+\\+|::|&&=|\\|\\|=|<<=|>>=|\\?\\.|\\.{2,3}|[!*+-=><])"
                }, {
                    token : "paren.lparen",
                    regex : "[({[]"
                }, {
                    token : "paren.rparen",
                    regex : "[\\]})]"
                }, {
                    token : "text",
                    regex : "\\s+"
                }],


            heregex : [{
                token : "string.regex",
                regex : '.*?///[imgy]{0,4}',
                next : "start"
            }, {
                token : "comment.regex",
                regex : "\\s+(?:#.*)?"
            }, {
                token : "string.regex",
                regex : "\\S+"
            }],

            comment : [{
                token : "comment",
                regex : '###',
                next : "start"
            }, {
                defaultToken : "comment"
            }]
        };
        this.normalizeRules();
    }

    exports.CoffeeHighlightRules = CoffeeHighlightRules;


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

/***/ 98137:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var modes = (__webpack_require__(76321).$modes);

var oop = __webpack_require__(2645);
var lang = __webpack_require__(39955);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);
var HtmlHighlightRules = (__webpack_require__(10413).HtmlHighlightRules);

var escaped = function(ch) {
    return "(?:[^" + lang.escapeRegExp(ch) + "\\\\]|\\\\.)*";
};

var MarkdownHighlightRules = function() {
    HtmlHighlightRules.call(this);
    // regexp must not have capturing parentheses
    // regexps are ordered -> the first match is used
    var codeBlockStartRule = {
        token : "support.function",
        regex : /^\s*(```+[^`]*|~~~+[^~]*)$/,
        onMatch: function(value, state, stack, line) {
            var m = value.match(/^(\s*)([`~]+)(.*)/);
            var language = /[\w-]+|$/.exec(m[3])[0];
            // TODO lazy-load modes
            if (!modes[language])
                language = "";
            stack.unshift("githubblock", [], [m[1], m[2], language], state);
            return this.token;
        },
        next  : "githubblock"
    };
    var codeBlockRules = [{
        token : "support.function",
        regex : ".*",
        onMatch: function(value, state, stack, line) {
            var embedState = stack[1];
            var indent = stack[2][0];
            var endMarker = stack[2][1];
            var language = stack[2][2];
            
            var m = /^(\s*)(`+|~+)\s*$/.exec(value);
            if (
                m && m[1].length < indent.length + 3
                && m[2].length >= endMarker.length && m[2][0] == endMarker[0]
            ) {
                stack.splice(0, 3);
                this.next = stack.shift();
                return this.token;
            }
            this.next = "";
            if (language && modes[language]) {
                var data = modes[language].getTokenizer().getLineTokens(value, embedState.slice(0));
                stack[1] = data.state;
                return data.tokens;
            }
            return this.token;
        }
    }];

    this.$rules["start"].unshift({
        token : "empty_line",
        regex : '^$',
        next: "allowBlock"
    }, { // h1
        token: "markup.heading.1",
        regex: "^=+(?=\\s*$)"
    }, { // h2
        token: "markup.heading.2",
        regex: "^\\-+(?=\\s*$)"
    }, {
        token : function(value) {
            return "markup.heading." + value.length;
        },
        regex : /^#{1,6}(?=\s|$)/,
        next : "header"
    },
    codeBlockStartRule,
    { // block quote
        token : "string.blockquote",
        regex : "^\\s*>\\s*(?:[*+-]|\\d+\\.)?\\s+",
        next  : "blockquote"
    }, { // HR * - _
        token : "constant",
        regex : "^ {0,3}(?:(?:\\* ?){3,}|(?:\\- ?){3,}|(?:\\_ ?){3,})\\s*$",
        next: "allowBlock"
    }, { // list
        token : "markup.list",
        regex : "^\\s{0,3}(?:[*+-]|\\d+\\.)\\s+",
        next  : "listblock-start"
    }, {
        include : "basic"
    });

    this.addRules({
        "basic" : [{
            token : "constant.language.escape",
            regex : /\\[\\`*_{}\[\]()#+\-.!]/
        }, { // code span `
            token : "support.function",
            regex : "(`+)(.*?[^`])(\\1)"
        }, { // reference
            token : ["text", "constant", "text", "url", "string", "text"],
            regex : "^([ ]{0,3}\\[)([^\\]]+)(\\]:\\s*)([^ ]+)(\\s*(?:[\"][^\"]+[\"])?(\\s*))$"
        }, { // link by reference
            token : ["text", "string", "text", "constant", "text"],
            regex : "(\\[)(" + escaped("]") + ")(\\]\\s*\\[)("+ escaped("]") + ")(\\])"
        }, { // link by url
            token : ["text", "string", "text", "markup.underline", "string", "text"],
            regex : "(\\!?\\[)(" +                                        // [
                    escaped("]") +                                    // link text or alt text
                    ")(\\]\\()"+                                      // ](
                    '((?:[^\\)\\s\\\\]|\\\\.|\\s(?=[^"]))*)' +        // href or image
                    '(\\s*"' +  escaped('"') + '"\\s*)?' +            // "title"
                    "(\\))"                                           // )
        }, { // strong ** __
            token : "string.strong",
            regex : "([*]{2}|[_]{2}(?=\\S))(.*?\\S[*_]*)(\\1)"
        }, { // emphasis * _
            token : "string.emphasis",
            regex : "([*]|[_](?=\\S))(.*?\\S[*_]*)(\\1)"
        }, { //
            token : ["text", "url", "text"],
            regex : "(<)("+
                      "(?:https?|ftp|dict):[^'\">\\s]+"+
                      "|"+
                      "(?:mailto:)?[-.\\w]+\\@[-a-z0-9]+(?:\\.[-a-z0-9]+)*\\.[a-z]+"+
                    ")(>)"
        }],

        // code block
        "allowBlock": [
            {token : "support.function", regex : "^ {4}.+", next : "allowBlock"},
            {token : "empty_line", regex : '^$', next: "allowBlock"},
            {token : "empty", regex : "", next : "start"}
        ],

        "header" : [{
            regex: "$",
            next : "start"
        }, {
            include: "basic"
        }, {
            defaultToken : "heading"
        } ],

        "listblock-start" : [{
            token : "support.variable",
            regex : /(?:\[[ x]\])?/,
            next  : "listblock"
        }],

        "listblock" : [ { // Lists only escape on completely blank lines.
            token : "empty_line",
            regex : "^$",
            next  : "start"
        }, { // list
            token : "markup.list",
            regex : "^\\s{0,3}(?:[*+-]|\\d+\\.)\\s+",
            next  : "listblock-start"
        }, {
            include : "basic", noEscape: true
        },
        codeBlockStartRule,
        {
            defaultToken : "list" //do not use markup.list to allow stling leading `*` differntly
        } ],

        "blockquote" : [ { // Blockquotes only escape on blank lines.
            token : "empty_line",
            regex : "^\\s*$",
            next  : "start"
        }, { // block quote
            token : "string.blockquote",
            regex : "^\\s*>\\s*(?:[*+-]|\\d+\\.)?\\s+",
            next  : "blockquote"
        }, {
            include : "basic", noEscape: true
        }, {
            defaultToken : "string.blockquote"
        } ],

        "githubblock" : codeBlockRules
    });

    this.normalizeRules();
};
oop.inherits(MarkdownHighlightRules, TextHighlightRules);

exports.R = MarkdownHighlightRules;


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


/***/ }),

/***/ 95253:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var modes = (__webpack_require__(76321).$modes);

var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);
var SlimHighlightRules = function() {

    this.$rules = {
        "start": [
            {
                token: "keyword",
                regex: /^(\s*)(\w+):\s*/,
                onMatch: function(value, state, stack, line) {
                    var indent = /^\s*/.exec(line)[0];
                    var m = value.match(/^(\s*)(\w+):/);
                    var language = m[2];
                    if (!/^(javascript|ruby|coffee|markdown|css|scss|sass|less)$/.test(language))
                        language = "";
                    stack.unshift("language-embed", [], [indent, language], state);
                    return this.token;
                },
                stateName: "language-embed",
                next: [{
                    token: "string",
                    regex: /^(\s*)/,
                    onMatch: function(value, state, stack, line) {
                        var indent = stack[2][0];
                        if (indent.length >= value.length) {
                            stack.splice(0, 3);
                            this.next = stack.shift();
                            return this.token;
                        }
                        this.next = "";
                        return [{type: "text", value: indent}];
                    },
                    next: ""
                }, {
                    token: "string",
                    regex: /.+/,
                    onMatch: function(value, state, stack, line) {
                        var indent = stack[2][0];
                        var language = stack[2][1];
                        var embedState = stack[1];
                        
                        if (modes[language]) {
                            var data = modes[language].getTokenizer().getLineTokens(line.slice(indent.length), embedState.slice(0));
                            stack[1] = data.state;
                            return data.tokens;
                        }
                        return this.token;
                    }
                }]
            },
            {
                token: 'constant.begin.javascript.filter.slim',
                regex: '^(\\s*)():$'
            }, {
                token: 'constant.begin..filter.slim',
                regex: '^(\\s*)(ruby):$'
            }, {
                token: 'constant.begin.coffeescript.filter.slim',
                regex: '^(\\s*)():$'
            }, {
                token: 'constant.begin..filter.slim',
                regex: '^(\\s*)(markdown):$'
            }, {
                token: 'constant.begin.css.filter.slim',
                regex: '^(\\s*)():$'
            }, {
                token: 'constant.begin.scss.filter.slim',
                regex: '^(\\s*)():$'
            }, {
                token: 'constant.begin..filter.slim',
                regex: '^(\\s*)(sass):$'
            }, {
                token: 'constant.begin..filter.slim',
                regex: '^(\\s*)(less):$'
            }, {
                token: 'constant.begin..filter.slim',
                regex: '^(\\s*)(erb):$'
            }, {
                token: 'keyword.html.tags.slim',
                regex: '^(\\s*)((:?\\*(\\w)+)|doctype html|abbr|acronym|address|applet|area|article|aside|audio|base|basefont|bdo|big|blockquote|body|br|button|canvas|caption|center|cite|code|col|colgroup|command|datalist|dd|del|details|dialog|dfn|dir|div|dl|dt|embed|fieldset|figure|font|footer|form|frame|frameset|h1|h2|h3|h4|h5|h6|head|header|hgroup|hr|html|i|iframe|img|input|ins|keygen|kbd|label|legend|link|li|map|mark|menu|meta|meter|nav|noframes|noscript|object|ol|optgroup|option|output|p|param|pre|progress|q|rp|rt|ruby|samp|script|section|select|small|source|span|strike|strong|style|sub|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|tt|ul|var|video|xmp|b|u|s|em|a)(?:([.#](\\w|\\.)+)+\\s?)?\\b'

            }, {
                token: 'keyword.slim',
                regex: '^(\\s*)(?:([.#](\\w|\\.)+)+\\s?)'
            }, {
                token: "string",
                regex: /^(\s*)('|\||\/|(\/!))\s*/,
                onMatch: function(val, state, stack, line) {
                    var indent = /^\s*/.exec(line)[0];
                    if (stack.length < 1) {
                        stack.push(this.next);
                    }
                    else {
                        stack[0] = "mlString";
                    }

                    if (stack.length < 2) {
                        stack.push(indent.length);
                    }
                    else {
                        stack[1] = indent.length;
                    }
                    return this.token;
                },
                next: "mlString"
            }, {
                token: 'keyword.control.slim',
                regex: '^(\\s*)(\\-|==|=)',
                push: [{
                    token: 'control.end.slim',
                    regex: '$',
                    next: "pop"
                }, {
                    include: "rubyline"
                }, {
                    include: "misc"
                }]

            }, {
                token: 'paren',
                regex: '\\(',
                push: [{
                    token: 'paren',
                    regex: '\\)',
                    next: "pop"
                }, {
                    include: "misc"
                }]

            }, {
                token: 'paren',
                regex: '\\[',
                push: [{
                    token: 'paren',
                    regex: '\\]',
                    next: "pop"
                }, {
                    include: "misc"
                }]
            }, {
                include: "misc"
            }
        ],
        "mlString": [{
            token: "indent",
            regex: /^\s*/,
            onMatch: function(val, state, stack) {
                var curIndent = stack[1];

                if (curIndent >= val.length) {
                    this.next = "start";
                    stack.splice(0);
                }
                else {
                    this.next = "mlString";
                }
                return this.token;
            },
            next: "start"
        }, {
            defaultToken: "string"
        }],
        "rubyline": [{
            token: "keyword.operator.ruby.embedded.slim",
            regex: "(==|=)(<>|><|<'|'<|<|>)?|-"
        }, {
            token: "list.ruby.operators.slim",
            regex: "(\\b)(for|in|do|if|else|elsif|unless|while|yield|not|and|or)\\b"
        }, {
            token: "string",
            regex: "['](.)*?[']"
        }, {
            token: "string",
            regex: "[\"](.)*?[\"]"
        }],
        "misc": [{
            token: 'class.variable.slim',
            regex: '\\@([a-zA-Z_][a-zA-Z0-9_]*)\\b'
        }, {
            token: "list.meta.slim",
            regex: "(\\b)(true|false|nil)(\\b)"
        }, {
            token: 'keyword.operator.equals.slim',
            regex: '='
        }, {
            token: "string",
            regex: "['](.)*?[']"
        }, {
            token: "string",
            regex: "[\"](.)*?[\"]"
        }]
    };
    this.normalizeRules();
};


oop.inherits(SlimHighlightRules, TextHighlightRules);

exports.SlimHighlightRules = SlimHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUEsMEJBQTBCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9jb2ZmZWVfaGlnaGxpZ2h0X3J1bGVzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvbGVzc19oaWdobGlnaHRfcnVsZXMuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9tYXJrZG93bl9oaWdobGlnaHRfcnVsZXMuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9zYXNzX2hpZ2hsaWdodF9ydWxlcy5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL3Njc3NfaGlnaGxpZ2h0X3J1bGVzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvc2xpbV9oaWdobGlnaHRfcnVsZXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICB2YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG4gICAgdmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcblxuICAgIG9vcC5pbmhlcml0cyhDb2ZmZWVIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuICAgIGZ1bmN0aW9uIENvZmZlZUhpZ2hsaWdodFJ1bGVzKCkge1xuICAgICAgICB2YXIgaWRlbnRpZmllciA9IFwiWyRBLVphLXpfXFxcXHg3Zi1cXFxcdWZmZmZdWyRcXFxcd1xcXFx4N2YtXFxcXHVmZmZmXSpcIjtcblxuICAgICAgICB2YXIga2V5d29yZHMgPSAoXG4gICAgICAgICAgICBcInRoaXN8dGhyb3d8dGhlbnx0cnl8dHlwZW9mfHN1cGVyfHN3aXRjaHxyZXR1cm58YnJlYWt8Ynl8Y29udGludWV8XCIgK1xuICAgICAgICAgICAgXCJjYXRjaHxjbGFzc3xpbnxpbnN0YW5jZW9mfGlzfGlzbnR8aWZ8ZWxzZXxleHRlbmRzfGZvcnxvd258XCIgK1xuICAgICAgICAgICAgXCJmaW5hbGx5fGZ1bmN0aW9ufHdoaWxlfHdoZW58bmV3fG5vfG5vdHxkZWxldGV8ZGVidWdnZXJ8ZG98bG9vcHxvZnxvZmZ8XCIgK1xuICAgICAgICAgICAgXCJvcnxvbnx1bmxlc3N8dW50aWx8YW5kfHllc3x5aWVsZHxleHBvcnR8aW1wb3J0fGRlZmF1bHRcIlxuICAgICAgICApO1xuXG4gICAgICAgIHZhciBsYW5nQ29uc3RhbnQgPSAoXG4gICAgICAgICAgICBcInRydWV8ZmFsc2V8bnVsbHx1bmRlZmluZWR8TmFOfEluZmluaXR5XCJcbiAgICAgICAgKTtcblxuICAgICAgICB2YXIgaWxsZWdhbCA9IChcbiAgICAgICAgICAgIFwiY2FzZXxjb25zdHxmdW5jdGlvbnx2YXJ8dm9pZHx3aXRofGVudW18aW1wbGVtZW50c3xcIiArXG4gICAgICAgICAgICBcImludGVyZmFjZXxsZXR8cGFja2FnZXxwcml2YXRlfHByb3RlY3RlZHxwdWJsaWN8c3RhdGljXCJcbiAgICAgICAgKTtcblxuICAgICAgICB2YXIgc3VwcG9ydENsYXNzID0gKFxuICAgICAgICAgICAgXCJBcnJheXxCb29sZWFufERhdGV8RnVuY3Rpb258TnVtYmVyfE9iamVjdHxSZWdFeHB8UmVmZXJlbmNlRXJyb3J8U3RyaW5nfFwiICtcbiAgICAgICAgICAgIFwiRXJyb3J8RXZhbEVycm9yfEludGVybmFsRXJyb3J8UmFuZ2VFcnJvcnxSZWZlcmVuY2VFcnJvcnxTdG9wSXRlcmF0aW9ufFwiICtcbiAgICAgICAgICAgIFwiU3ludGF4RXJyb3J8VHlwZUVycm9yfFVSSUVycm9yfFwiICArXG4gICAgICAgICAgICBcIkFycmF5QnVmZmVyfEZsb2F0MzJBcnJheXxGbG9hdDY0QXJyYXl8SW50MTZBcnJheXxJbnQzMkFycmF5fEludDhBcnJheXxcIiArXG4gICAgICAgICAgICBcIlVpbnQxNkFycmF5fFVpbnQzMkFycmF5fFVpbnQ4QXJyYXl8VWludDhDbGFtcGVkQXJyYXlcIlxuICAgICAgICApO1xuXG4gICAgICAgIHZhciBzdXBwb3J0RnVuY3Rpb24gPSAoXG4gICAgICAgICAgICBcIk1hdGh8SlNPTnxpc05hTnxpc0Zpbml0ZXxwYXJzZUludHxwYXJzZUZsb2F0fGVuY29kZVVSSXxcIiArXG4gICAgICAgICAgICBcImVuY29kZVVSSUNvbXBvbmVudHxkZWNvZGVVUkl8ZGVjb2RlVVJJQ29tcG9uZW50fFN0cmluZ3xcIlxuICAgICAgICApO1xuXG4gICAgICAgIHZhciB2YXJpYWJsZUxhbmd1YWdlID0gKFxuICAgICAgICAgICAgXCJ3aW5kb3d8YXJndW1lbnRzfHByb3RvdHlwZXxkb2N1bWVudFwiXG4gICAgICAgICk7XG5cbiAgICAgICAgdmFyIGtleXdvcmRNYXBwZXIgPSB0aGlzLmNyZWF0ZUtleXdvcmRNYXBwZXIoe1xuICAgICAgICAgICAgXCJrZXl3b3JkXCI6IGtleXdvcmRzLFxuICAgICAgICAgICAgXCJjb25zdGFudC5sYW5ndWFnZVwiOiBsYW5nQ29uc3RhbnQsXG4gICAgICAgICAgICBcImludmFsaWQuaWxsZWdhbFwiOiBpbGxlZ2FsLFxuICAgICAgICAgICAgXCJsYW5ndWFnZS5zdXBwb3J0LmNsYXNzXCI6IHN1cHBvcnRDbGFzcyxcbiAgICAgICAgICAgIFwibGFuZ3VhZ2Uuc3VwcG9ydC5mdW5jdGlvblwiOiBzdXBwb3J0RnVuY3Rpb24sXG4gICAgICAgICAgICBcInZhcmlhYmxlLmxhbmd1YWdlXCI6IHZhcmlhYmxlTGFuZ3VhZ2VcbiAgICAgICAgfSwgXCJpZGVudGlmaWVyXCIpO1xuXG4gICAgICAgIHZhciBmdW5jdGlvblJ1bGUgPSB7XG4gICAgICAgICAgICB0b2tlbjogW1wicGFyZW4ubHBhcmVuXCIsIFwidmFyaWFibGUucGFyYW1ldGVyXCIsIFwicGFyZW4ucnBhcmVuXCIsIFwidGV4dFwiLCBcInN0b3JhZ2UudHlwZVwiXSxcbiAgICAgICAgICAgIHJlZ2V4OiAvKD86KFxcKCkoKD86XCJbXlwiKV0qP1wifCdbXicpXSo/J3xcXC9bXlxcLyldKj9cXC98W14oKVwiJ1xcL10pKj8pKFxcKSkoXFxzKikpPyhbXFwtPV0+KS8uc291cmNlXG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIHN0cmluZ0VzY2FwZSA9IC9cXFxcKD86eFswLTlhLWZBLUZdezJ9fHVbMC05YS1mQS1GXXs0fXxbMC0yXVswLTddezAsMn18M1swLTZdWzAtN10/fDM3WzAtN10/fFs0LTddWzAtN10/fC4pLztcblxuICAgICAgICB0aGlzLiRydWxlcyA9IHtcbiAgICAgICAgICAgIHN0YXJ0IDogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggOiBcIig/OjB4W1xcXFxkYS1mQS1GXSt8KD86XFxcXGQrKD86XFxcXC5cXFxcZCspP3xcXFxcLlxcXFxkKykoPzpbZUVdWystXT9cXFxcZCspPylcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVOYW1lOiBcInFkb2NcIixcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLCByZWdleCA6IFwiJycnXCIsIG5leHQgOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7dG9rZW4gOiBcInN0cmluZ1wiLCByZWdleCA6IFwiJycnXCIsIG5leHQgOiBcInN0YXJ0XCJ9LFxuICAgICAgICAgICAgICAgICAgICAgICAge3Rva2VuIDogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIiwgcmVnZXggOiBzdHJpbmdFc2NhcGV9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2RlZmF1bHRUb2tlbjogXCJzdHJpbmdcIn1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVOYW1lOiBcInFxZG9jXCIsXG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggOiAnXCJcIlwiJyxcbiAgICAgICAgICAgICAgICAgICAgbmV4dCA6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0b2tlbiA6IFwic3RyaW5nXCIsIHJlZ2V4IDogJ1wiXCJcIicsIG5leHQgOiBcInN0YXJ0XCJ9LFxuICAgICAgICAgICAgICAgICAgICAgICAge3Rva2VuIDogXCJwYXJlbi5zdHJpbmdcIiwgcmVnZXggOiAnI3snLCBwdXNoIDogXCJzdGFydFwifSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0b2tlbiA6IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCIsIHJlZ2V4IDogc3RyaW5nRXNjYXBlfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtkZWZhdWx0VG9rZW46IFwic3RyaW5nXCJ9XG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlTmFtZTogXCJxc3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIiwgcmVnZXggOiBcIidcIiwgbmV4dCA6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0b2tlbiA6IFwic3RyaW5nXCIsIHJlZ2V4IDogXCInXCIsIG5leHQgOiBcInN0YXJ0XCJ9LFxuICAgICAgICAgICAgICAgICAgICAgICAge3Rva2VuIDogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIiwgcmVnZXggOiBzdHJpbmdFc2NhcGV9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2RlZmF1bHRUb2tlbjogXCJzdHJpbmdcIn1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVOYW1lOiBcInFxc3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmcuc3RhcnRcIiwgcmVnZXggOiAnXCInLCBuZXh0IDogW1xuICAgICAgICAgICAgICAgICAgICAgICAge3Rva2VuIDogXCJzdHJpbmcuZW5kXCIsIHJlZ2V4IDogJ1wiJywgbmV4dCA6IFwic3RhcnRcIn0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7dG9rZW4gOiBcInBhcmVuLnN0cmluZ1wiLCByZWdleCA6ICcjeycsIHB1c2ggOiBcInN0YXJ0XCJ9LFxuICAgICAgICAgICAgICAgICAgICAgICAge3Rva2VuIDogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIiwgcmVnZXggOiBzdHJpbmdFc2NhcGV9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2RlZmF1bHRUb2tlbjogXCJzdHJpbmdcIn1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVOYW1lOiBcImpzXCIsXG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIiwgcmVnZXggOiBcImBcIiwgbmV4dCA6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0b2tlbiA6IFwic3RyaW5nXCIsIHJlZ2V4IDogXCJgXCIsIG5leHQgOiBcInN0YXJ0XCJ9LFxuICAgICAgICAgICAgICAgICAgICAgICAge3Rva2VuIDogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIiwgcmVnZXggOiBzdHJpbmdFc2NhcGV9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2RlZmF1bHRUb2tlbjogXCJzdHJpbmdcIn1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgcmVnZXg6IFwiW3t9XVwiLCBvbk1hdGNoOiBmdW5jdGlvbih2YWwsIHN0YXRlLCBzdGFjaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0ID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWwgPT0gXCJ7XCIgJiYgc3RhY2subGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhY2sudW5zaGlmdChcInN0YXJ0XCIsIHN0YXRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJwYXJlblwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbCA9PSBcIn1cIiAmJiBzdGFjay5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFjay5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dCA9IHN0YWNrLnNoaWZ0KCkgfHwgXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5uZXh0LmluZGV4T2YoXCJzdHJpbmdcIikgIT0gLTEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcInBhcmVuLnN0cmluZ1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwicGFyZW5cIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZy5yZWdleFwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleCA6IFwiLy8vXCIsXG4gICAgICAgICAgICAgICAgICAgIG5leHQgOiBcImhlcmVnZXhcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZy5yZWdleFwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleCA6IC8oPzpcXC8oPyFbXFxzPV0pW15bXFwvXFxuXFxcXF0qKD86KD86XFxcXFtcXHNcXFNdfFxcW1teXFxdXFxuXFxcXF0qKD86XFxcXFtcXHNcXFNdW15cXF1cXG5cXFxcXSopKl0pW15bXFwvXFxuXFxcXF0qKSpcXC8pKD86W2ltZ3ldezAsNH0pKD8hXFx3KS9cbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIjIyMoPyEjKVwiLFxuICAgICAgICAgICAgICAgICAgICBuZXh0IDogXCJjb21tZW50XCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIjLipcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBbXCJwdW5jdHVhdGlvbi5vcGVyYXRvclwiLCBcInRleHRcIiwgXCJpZGVudGlmaWVyXCJdLFxuICAgICAgICAgICAgICAgICAgICByZWdleCA6IFwiKFxcXFwuKShcXFxccyopKFwiICsgaWxsZWdhbCArIFwiKVwiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IFwicHVuY3R1YXRpb24ub3BlcmF0b3JcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwuezEsM31cIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgLy9jbGFzcyBBIGV4dGVuZHMgQlxuICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IFtcImtleXdvcmRcIiwgXCJ0ZXh0XCIsIFwibGFuZ3VhZ2Uuc3VwcG9ydC5jbGFzc1wiLFxuICAgICAgICAgICAgICAgICAgICAgXCJ0ZXh0XCIsIFwia2V5d29yZFwiLCBcInRleHRcIiwgXCJsYW5ndWFnZS5zdXBwb3J0LmNsYXNzXCJdLFxuICAgICAgICAgICAgICAgICAgICByZWdleCA6IFwiKGNsYXNzKShcXFxccyspKFwiICsgaWRlbnRpZmllciArIFwiKSg/OihcXFxccyspKGV4dGVuZHMpKFxcXFxzKykoXCIgKyBpZGVudGlmaWVyICsgXCIpKT9cIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgLy9wbGF5ID0gKC4uLikgLT5cbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBbXCJlbnRpdHkubmFtZS5mdW5jdGlvblwiLCBcInRleHRcIiwgXCJrZXl3b3JkLm9wZXJhdG9yXCIsIFwidGV4dFwiXS5jb25jYXQoZnVuY3Rpb25SdWxlLnRva2VuKSxcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggOiBcIihcIiArIGlkZW50aWZpZXIgKyBcIikoXFxcXHMqKShbPTpdKShcXFxccyopXCIgKyBmdW5jdGlvblJ1bGUucmVnZXhcbiAgICAgICAgICAgICAgICB9LCBcbiAgICAgICAgICAgICAgICBmdW5jdGlvblJ1bGUsIFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcInZhcmlhYmxlXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJAKD86XCIgKyBpZGVudGlmaWVyICsgXCIpP1wiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbjoga2V5d29yZE1hcHBlcixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggOiBpZGVudGlmaWVyXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IFwicHVuY3R1YXRpb24ub3BlcmF0b3JcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwsfFxcXFwuXCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdG9yYWdlLnR5cGVcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggOiBcIltcXFxcLT1dPlwiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IFwia2V5d29yZC5vcGVyYXRvclwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleCA6IFwiKD86Wy0rKi8lPD4mfF4hPz1dPXw+Pj49P3xcXFxcLVxcXFwtfFxcXFwrXFxcXCt8Ojp8JiY9fFxcXFx8XFxcXHw9fDw8PXw+Pj18XFxcXD9cXFxcLnxcXFxcLnsyLDN9fFshKistPT48XSlcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcInBhcmVuLmxwYXJlblwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleCA6IFwiWyh7W11cIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcInBhcmVuLnJwYXJlblwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleCA6IFwiW1xcXFxdfSldXCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxccytcIlxuICAgICAgICAgICAgICAgIH1dLFxuXG5cbiAgICAgICAgICAgIGhlcmVnZXggOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmcucmVnZXhcIixcbiAgICAgICAgICAgICAgICByZWdleCA6ICcuKj8vLy9baW1neV17MCw0fScsXG4gICAgICAgICAgICAgICAgbmV4dCA6IFwic3RhcnRcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50LnJlZ2V4XCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFxzKyg/OiMuKik/XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nLnJlZ2V4XCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFxTK1wiXG4gICAgICAgICAgICB9XSxcblxuICAgICAgICAgICAgY29tbWVudCA6IFt7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6ICcjIyMnLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcInN0YXJ0XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW4gOiBcImNvbW1lbnRcIlxuICAgICAgICAgICAgfV1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5ub3JtYWxpemVSdWxlcygpO1xuICAgIH1cblxuICAgIGV4cG9ydHMuQ29mZmVlSGlnaGxpZ2h0UnVsZXMgPSBDb2ZmZWVIaWdobGlnaHRSdWxlcztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xudmFyIENzc0hpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZSgnLi9jc3NfaGlnaGxpZ2h0X3J1bGVzJyk7XG5cbnZhciBMZXNzSGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbigpIHtcblxuXG4gICAgdmFyIGtleXdvcmRMaXN0ID0gXCJAaW1wb3J0fEBtZWRpYXxAZm9udC1mYWNlfEBrZXlmcmFtZXN8QC13ZWJraXQta2V5ZnJhbWVzfEBzdXBwb3J0c3xcIiArIFxuICAgICAgICBcIkBjaGFyc2V0fEBwbHVnaW58QG5hbWVzcGFjZXxAZG9jdW1lbnR8QHBhZ2V8QHZpZXdwb3J0fEAtbXMtdmlld3BvcnR8XCIgK1xuICAgICAgICBcIm9yfGFuZHx3aGVufG5vdFwiO1xuXG4gICAgdmFyIGtleXdvcmRzID0ga2V5d29yZExpc3Quc3BsaXQoJ3wnKTtcblxuICAgIHZhciBwcm9wZXJ0aWVzID0gQ3NzSGlnaGxpZ2h0UnVsZXMuc3VwcG9ydFR5cGUuc3BsaXQoJ3wnKTtcblxuICAgIHZhciBrZXl3b3JkTWFwcGVyID0gdGhpcy5jcmVhdGVLZXl3b3JkTWFwcGVyKHtcbiAgICAgICAgXCJzdXBwb3J0LmNvbnN0YW50XCI6IENzc0hpZ2hsaWdodFJ1bGVzLnN1cHBvcnRDb25zdGFudCxcbiAgICAgICAgXCJrZXl3b3JkXCI6IGtleXdvcmRMaXN0LFxuICAgICAgICBcInN1cHBvcnQuY29uc3RhbnQuY29sb3JcIjogQ3NzSGlnaGxpZ2h0UnVsZXMuc3VwcG9ydENvbnN0YW50Q29sb3IsXG4gICAgICAgIFwic3VwcG9ydC5jb25zdGFudC5mb250c1wiOiBDc3NIaWdobGlnaHRSdWxlcy5zdXBwb3J0Q29uc3RhbnRGb250c1xuICAgIH0sIFwiaWRlbnRpZmllclwiLCB0cnVlKTsgICBcblxuICAgIC8vIHJlZ2V4cCBtdXN0IG5vdCBoYXZlIGNhcHR1cmluZyBwYXJlbnRoZXNlcy4gVXNlICg/OikgaW5zdGVhZC5cbiAgICAvLyByZWdleHBzIGFyZSBvcmRlcmVkIC0+IHRoZSBmaXJzdCBtYXRjaCBpcyB1c2VkXG5cbiAgICB2YXIgbnVtUmUgPSBcIlxcXFwtPyg/Oig/OlswLTldKyl8KD86WzAtOV0qXFxcXC5bMC05XSspKVwiO1xuXG4gICAgLy8gcmVnZXhwIG11c3Qgbm90IGhhdmUgY2FwdHVyaW5nIHBhcmVudGhlc2VzLiBVc2UgKD86KSBpbnN0ZWFkLlxuICAgIC8vIHJlZ2V4cHMgYXJlIG9yZGVyZWQgLT4gdGhlIGZpcnN0IG1hdGNoIGlzIHVzZWRcblxuICAgIHRoaXMuJHJ1bGVzID0ge1xuICAgICAgICBcInN0YXJ0XCIgOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXC9cXFxcLy4qJFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsIC8vIG11bHRpIGxpbmUgY29tbWVudFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcL1xcXFwqXCIsXG4gICAgICAgICAgICAgICAgbmV4dCA6IFwiY29tbWVudFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLCAvLyBzaW5nbGUgbGluZVxuICAgICAgICAgICAgICAgIHJlZ2V4IDogJ1tcIl0oPzooPzpcXFxcXFxcXC4pfCg/OlteXCJcXFxcXFxcXF0pKSo/W1wiXSdcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsIC8vIHNpbmdsZSBsaW5lXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlsnXSg/Oig/OlxcXFxcXFxcLil8KD86W14nXFxcXFxcXFxdKSkqP1snXVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBbXCJjb25zdGFudC5udW1lcmljXCIsIFwia2V5d29yZFwiXSxcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiKFwiICsgbnVtUmUgKyBcIikoY2h8Y218ZGVnfGVtfGV4fGZyfGdkfGdyYWR8SHp8aW58a0h6fG1tfG1zfHBjfHB0fHB4fHJhZHxyZW18c3x0dXJufHZofHZtfHZ3fCUpXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLCAvLyBoZXg2IGNvbG9yXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIiNbYS1mMC05XXs2fVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIiwgLy8gaGV4MyBjb2xvclxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIjW2EtZjAtOV17M31cIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5udW1lcmljXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBudW1SZVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogW1wic3VwcG9ydC5mdW5jdGlvblwiLCBcInBhcmVuLmxwYXJlblwiLCBcInN0cmluZ1wiLCBcInBhcmVuLnJwYXJlblwiXSxcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiKHVybCkoXFxcXCgpKC4qKShcXFxcKSlcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogW1wic3VwcG9ydC5mdW5jdGlvblwiLCBcInBhcmVuLmxwYXJlblwiXSxcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiKDpleHRlbmR8W2EtejAtOV9cXFxcLV0rKShcXFxcKClcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGtleXdvcmRzLmluZGV4T2YodmFsdWUudG9Mb3dlckNhc2UoKSkgPiAtMSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcImtleXdvcmRcIjtcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwidmFyaWFibGVcIjtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJbQFxcXFwkXVthLXowLTlfXFxcXC1AXFxcXCRdKlxcXFxiXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwidmFyaWFibGVcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiW0BcXFxcJF1cXFxce1thLXowLTlfXFxcXC1AXFxcXCRdKlxcXFx9XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IGZ1bmN0aW9uKGZpcnN0LCBzZWNvbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYocHJvcGVydGllcy5pbmRleE9mKGZpcnN0LnRvTG93ZXJDYXNlKCkpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbXCJzdXBwb3J0LnR5cGUucHJvcGVydHlcIiwgXCJ0ZXh0XCJdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcInN1cHBvcnQudHlwZS51bmtub3duUHJvcGVydHlcIiwgXCJ0ZXh0XCJdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiKFthLXowLTktX10rKShcXFxccyo6KVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImtleXdvcmRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiJlwiICAgLy8gc3BlY2lhbCBjYXNlIC0gYWx3YXlzIHRyZWF0IGFzIGtleXdvcmRcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IGtleXdvcmRNYXBwZXIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwtP1tAYS16X11bQGEtejAtOV9cXFxcLV0qXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJ2YXJpYWJsZS5sYW5ndWFnZVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIiNbYS16MC05LV9dK1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwidmFyaWFibGUubGFuZ3VhZ2VcIixcbiAgICAgICAgICAgICAgICByZWdleDogXCJcXFxcLlthLXowLTktX10rXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJ2YXJpYWJsZS5sYW5ndWFnZVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIjpbYS16X11bYS16MC05LV9dKlwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnRcIixcbiAgICAgICAgICAgICAgICByZWdleDogXCJbYS16MC05LV9dK1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImtleXdvcmQub3BlcmF0b3JcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiPHw+fDw9fD49fD18IT18LXwlfFxcXFwrfFxcXFwqXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwicGFyZW4ubHBhcmVuXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIltbKHtdXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwicGFyZW4ucnBhcmVuXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIltcXFxcXSl9XVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXHMrXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBjYXNlSW5zZW5zaXRpdmU6IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgXCJjb21tZW50XCIgOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIiwgLy8gY2xvc2luZyBjb21tZW50XG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwqXFxcXC9cIixcbiAgICAgICAgICAgICAgICBuZXh0IDogXCJzdGFydFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuIDogXCJjb21tZW50XCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH07XG4gICAgdGhpcy5ub3JtYWxpemVSdWxlcygpO1xufTtcblxub29wLmluaGVyaXRzKExlc3NIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuZXhwb3J0cy5MZXNzSGlnaGxpZ2h0UnVsZXMgPSBMZXNzSGlnaGxpZ2h0UnVsZXM7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1vZGVzID0gcmVxdWlyZShcIi4uL2NvbmZpZ1wiKS4kbW9kZXM7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBsYW5nID0gcmVxdWlyZShcIi4uL2xpYi9sYW5nXCIpO1xudmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcbnZhciBIdG1sSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9odG1sX2hpZ2hsaWdodF9ydWxlc1wiKS5IdG1sSGlnaGxpZ2h0UnVsZXM7XG5cbnZhciBlc2NhcGVkID0gZnVuY3Rpb24oY2gpIHtcbiAgICByZXR1cm4gXCIoPzpbXlwiICsgbGFuZy5lc2NhcGVSZWdFeHAoY2gpICsgXCJcXFxcXFxcXF18XFxcXFxcXFwuKSpcIjtcbn07XG5cbnZhciBNYXJrZG93bkhpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24oKSB7XG4gICAgSHRtbEhpZ2hsaWdodFJ1bGVzLmNhbGwodGhpcyk7XG4gICAgLy8gcmVnZXhwIG11c3Qgbm90IGhhdmUgY2FwdHVyaW5nIHBhcmVudGhlc2VzXG4gICAgLy8gcmVnZXhwcyBhcmUgb3JkZXJlZCAtPiB0aGUgZmlyc3QgbWF0Y2ggaXMgdXNlZFxuICAgIHZhciBjb2RlQmxvY2tTdGFydFJ1bGUgPSB7XG4gICAgICAgIHRva2VuIDogXCJzdXBwb3J0LmZ1bmN0aW9uXCIsXG4gICAgICAgIHJlZ2V4IDogL15cXHMqKGBgYCtbXmBdKnx+fn4rW15+XSopJC8sXG4gICAgICAgIG9uTWF0Y2g6IGZ1bmN0aW9uKHZhbHVlLCBzdGF0ZSwgc3RhY2ssIGxpbmUpIHtcbiAgICAgICAgICAgIHZhciBtID0gdmFsdWUubWF0Y2goL14oXFxzKikoW2B+XSspKC4qKS8pO1xuICAgICAgICAgICAgdmFyIGxhbmd1YWdlID0gL1tcXHctXSt8JC8uZXhlYyhtWzNdKVswXTtcbiAgICAgICAgICAgIC8vIFRPRE8gbGF6eS1sb2FkIG1vZGVzXG4gICAgICAgICAgICBpZiAoIW1vZGVzW2xhbmd1YWdlXSlcbiAgICAgICAgICAgICAgICBsYW5ndWFnZSA9IFwiXCI7XG4gICAgICAgICAgICBzdGFjay51bnNoaWZ0KFwiZ2l0aHViYmxvY2tcIiwgW10sIFttWzFdLCBtWzJdLCBsYW5ndWFnZV0sIHN0YXRlKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRva2VuO1xuICAgICAgICB9LFxuICAgICAgICBuZXh0ICA6IFwiZ2l0aHViYmxvY2tcIlxuICAgIH07XG4gICAgdmFyIGNvZGVCbG9ja1J1bGVzID0gW3tcbiAgICAgICAgdG9rZW4gOiBcInN1cHBvcnQuZnVuY3Rpb25cIixcbiAgICAgICAgcmVnZXggOiBcIi4qXCIsXG4gICAgICAgIG9uTWF0Y2g6IGZ1bmN0aW9uKHZhbHVlLCBzdGF0ZSwgc3RhY2ssIGxpbmUpIHtcbiAgICAgICAgICAgIHZhciBlbWJlZFN0YXRlID0gc3RhY2tbMV07XG4gICAgICAgICAgICB2YXIgaW5kZW50ID0gc3RhY2tbMl1bMF07XG4gICAgICAgICAgICB2YXIgZW5kTWFya2VyID0gc3RhY2tbMl1bMV07XG4gICAgICAgICAgICB2YXIgbGFuZ3VhZ2UgPSBzdGFja1syXVsyXTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIG0gPSAvXihcXHMqKShgK3x+KylcXHMqJC8uZXhlYyh2YWx1ZSk7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgbSAmJiBtWzFdLmxlbmd0aCA8IGluZGVudC5sZW5ndGggKyAzXG4gICAgICAgICAgICAgICAgJiYgbVsyXS5sZW5ndGggPj0gZW5kTWFya2VyLmxlbmd0aCAmJiBtWzJdWzBdID09IGVuZE1hcmtlclswXVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgc3RhY2suc3BsaWNlKDAsIDMpO1xuICAgICAgICAgICAgICAgIHRoaXMubmV4dCA9IHN0YWNrLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9rZW47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm5leHQgPSBcIlwiO1xuICAgICAgICAgICAgaWYgKGxhbmd1YWdlICYmIG1vZGVzW2xhbmd1YWdlXSkge1xuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gbW9kZXNbbGFuZ3VhZ2VdLmdldFRva2VuaXplcigpLmdldExpbmVUb2tlbnModmFsdWUsIGVtYmVkU3RhdGUuc2xpY2UoMCkpO1xuICAgICAgICAgICAgICAgIHN0YWNrWzFdID0gZGF0YS5zdGF0ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YS50b2tlbnM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50b2tlbjtcbiAgICAgICAgfVxuICAgIH1dO1xuXG4gICAgdGhpcy4kcnVsZXNbXCJzdGFydFwiXS51bnNoaWZ0KHtcbiAgICAgICAgdG9rZW4gOiBcImVtcHR5X2xpbmVcIixcbiAgICAgICAgcmVnZXggOiAnXiQnLFxuICAgICAgICBuZXh0OiBcImFsbG93QmxvY2tcIlxuICAgIH0sIHsgLy8gaDFcbiAgICAgICAgdG9rZW46IFwibWFya3VwLmhlYWRpbmcuMVwiLFxuICAgICAgICByZWdleDogXCJePSsoPz1cXFxccyokKVwiXG4gICAgfSwgeyAvLyBoMlxuICAgICAgICB0b2tlbjogXCJtYXJrdXAuaGVhZGluZy4yXCIsXG4gICAgICAgIHJlZ2V4OiBcIl5cXFxcLSsoPz1cXFxccyokKVwiXG4gICAgfSwge1xuICAgICAgICB0b2tlbiA6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJtYXJrdXAuaGVhZGluZy5cIiArIHZhbHVlLmxlbmd0aDtcbiAgICAgICAgfSxcbiAgICAgICAgcmVnZXggOiAvXiN7MSw2fSg/PVxcc3wkKS8sXG4gICAgICAgIG5leHQgOiBcImhlYWRlclwiXG4gICAgfSxcbiAgICBjb2RlQmxvY2tTdGFydFJ1bGUsXG4gICAgeyAvLyBibG9jayBxdW90ZVxuICAgICAgICB0b2tlbiA6IFwic3RyaW5nLmJsb2NrcXVvdGVcIixcbiAgICAgICAgcmVnZXggOiBcIl5cXFxccyo+XFxcXHMqKD86WyorLV18XFxcXGQrXFxcXC4pP1xcXFxzK1wiLFxuICAgICAgICBuZXh0ICA6IFwiYmxvY2txdW90ZVwiXG4gICAgfSwgeyAvLyBIUiAqIC0gX1xuICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnRcIixcbiAgICAgICAgcmVnZXggOiBcIl4gezAsM30oPzooPzpcXFxcKiA/KXszLH18KD86XFxcXC0gPyl7Myx9fCg/OlxcXFxfID8pezMsfSlcXFxccyokXCIsXG4gICAgICAgIG5leHQ6IFwiYWxsb3dCbG9ja1wiXG4gICAgfSwgeyAvLyBsaXN0XG4gICAgICAgIHRva2VuIDogXCJtYXJrdXAubGlzdFwiLFxuICAgICAgICByZWdleCA6IFwiXlxcXFxzezAsM30oPzpbKistXXxcXFxcZCtcXFxcLilcXFxccytcIixcbiAgICAgICAgbmV4dCAgOiBcImxpc3RibG9jay1zdGFydFwiXG4gICAgfSwge1xuICAgICAgICBpbmNsdWRlIDogXCJiYXNpY1wiXG4gICAgfSk7XG5cbiAgICB0aGlzLmFkZFJ1bGVzKHtcbiAgICAgICAgXCJiYXNpY1wiIDogW3tcbiAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIixcbiAgICAgICAgICAgIHJlZ2V4IDogL1xcXFxbXFxcXGAqX3t9XFxbXFxdKCkjK1xcLS4hXS9cbiAgICAgICAgfSwgeyAvLyBjb2RlIHNwYW4gYFxuICAgICAgICAgICAgdG9rZW4gOiBcInN1cHBvcnQuZnVuY3Rpb25cIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCIoYCspKC4qP1teYF0pKFxcXFwxKVwiXG4gICAgICAgIH0sIHsgLy8gcmVmZXJlbmNlXG4gICAgICAgICAgICB0b2tlbiA6IFtcInRleHRcIiwgXCJjb25zdGFudFwiLCBcInRleHRcIiwgXCJ1cmxcIiwgXCJzdHJpbmdcIiwgXCJ0ZXh0XCJdLFxuICAgICAgICAgICAgcmVnZXggOiBcIl4oWyBdezAsM31cXFxcWykoW15cXFxcXV0rKShcXFxcXTpcXFxccyopKFteIF0rKShcXFxccyooPzpbXFxcIl1bXlxcXCJdK1tcXFwiXSk/KFxcXFxzKikpJFwiXG4gICAgICAgIH0sIHsgLy8gbGluayBieSByZWZlcmVuY2VcbiAgICAgICAgICAgIHRva2VuIDogW1widGV4dFwiLCBcInN0cmluZ1wiLCBcInRleHRcIiwgXCJjb25zdGFudFwiLCBcInRleHRcIl0sXG4gICAgICAgICAgICByZWdleCA6IFwiKFxcXFxbKShcIiArIGVzY2FwZWQoXCJdXCIpICsgXCIpKFxcXFxdXFxcXHMqXFxcXFspKFwiKyBlc2NhcGVkKFwiXVwiKSArIFwiKShcXFxcXSlcIlxuICAgICAgICB9LCB7IC8vIGxpbmsgYnkgdXJsXG4gICAgICAgICAgICB0b2tlbiA6IFtcInRleHRcIiwgXCJzdHJpbmdcIiwgXCJ0ZXh0XCIsIFwibWFya3VwLnVuZGVybGluZVwiLCBcInN0cmluZ1wiLCBcInRleHRcIl0sXG4gICAgICAgICAgICByZWdleCA6IFwiKFxcXFwhP1xcXFxbKShcIiArICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFtcbiAgICAgICAgICAgICAgICAgICAgZXNjYXBlZChcIl1cIikgKyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxpbmsgdGV4dCBvciBhbHQgdGV4dFxuICAgICAgICAgICAgICAgICAgICBcIikoXFxcXF1cXFxcKClcIisgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIF0oXG4gICAgICAgICAgICAgICAgICAgICcoKD86W15cXFxcKVxcXFxzXFxcXFxcXFxdfFxcXFxcXFxcLnxcXFxccyg/PVteXCJdKSkqKScgKyAgICAgICAgLy8gaHJlZiBvciBpbWFnZVxuICAgICAgICAgICAgICAgICAgICAnKFxcXFxzKlwiJyArICBlc2NhcGVkKCdcIicpICsgJ1wiXFxcXHMqKT8nICsgICAgICAgICAgICAvLyBcInRpdGxlXCJcbiAgICAgICAgICAgICAgICAgICAgXCIoXFxcXCkpXCIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gKVxuICAgICAgICB9LCB7IC8vIHN0cm9uZyAqKiBfX1xuICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZy5zdHJvbmdcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCIoWypdezJ9fFtfXXsyfSg/PVxcXFxTKSkoLio/XFxcXFNbKl9dKikoXFxcXDEpXCJcbiAgICAgICAgfSwgeyAvLyBlbXBoYXNpcyAqIF9cbiAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmcuZW1waGFzaXNcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCIoWypdfFtfXSg/PVxcXFxTKSkoLio/XFxcXFNbKl9dKikoXFxcXDEpXCJcbiAgICAgICAgfSwgeyAvL1xuICAgICAgICAgICAgdG9rZW4gOiBbXCJ0ZXh0XCIsIFwidXJsXCIsIFwidGV4dFwiXSxcbiAgICAgICAgICAgIHJlZ2V4IDogXCIoPCkoXCIrXG4gICAgICAgICAgICAgICAgICAgICAgXCIoPzpodHRwcz98ZnRwfGRpY3QpOlteJ1xcXCI+XFxcXHNdK1wiK1xuICAgICAgICAgICAgICAgICAgICAgIFwifFwiK1xuICAgICAgICAgICAgICAgICAgICAgIFwiKD86bWFpbHRvOik/Wy0uXFxcXHddK1xcXFxAWy1hLXowLTldKyg/OlxcXFwuWy1hLXowLTldKykqXFxcXC5bYS16XStcIitcbiAgICAgICAgICAgICAgICAgICAgXCIpKD4pXCJcbiAgICAgICAgfV0sXG5cbiAgICAgICAgLy8gY29kZSBibG9ja1xuICAgICAgICBcImFsbG93QmxvY2tcIjogW1xuICAgICAgICAgICAge3Rva2VuIDogXCJzdXBwb3J0LmZ1bmN0aW9uXCIsIHJlZ2V4IDogXCJeIHs0fS4rXCIsIG5leHQgOiBcImFsbG93QmxvY2tcIn0sXG4gICAgICAgICAgICB7dG9rZW4gOiBcImVtcHR5X2xpbmVcIiwgcmVnZXggOiAnXiQnLCBuZXh0OiBcImFsbG93QmxvY2tcIn0sXG4gICAgICAgICAgICB7dG9rZW4gOiBcImVtcHR5XCIsIHJlZ2V4IDogXCJcIiwgbmV4dCA6IFwic3RhcnRcIn1cbiAgICAgICAgXSxcblxuICAgICAgICBcImhlYWRlclwiIDogW3tcbiAgICAgICAgICAgIHJlZ2V4OiBcIiRcIixcbiAgICAgICAgICAgIG5leHQgOiBcInN0YXJ0XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaW5jbHVkZTogXCJiYXNpY1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGRlZmF1bHRUb2tlbiA6IFwiaGVhZGluZ1wiXG4gICAgICAgIH0gXSxcblxuICAgICAgICBcImxpc3RibG9jay1zdGFydFwiIDogW3tcbiAgICAgICAgICAgIHRva2VuIDogXCJzdXBwb3J0LnZhcmlhYmxlXCIsXG4gICAgICAgICAgICByZWdleCA6IC8oPzpcXFtbIHhdXFxdKT8vLFxuICAgICAgICAgICAgbmV4dCAgOiBcImxpc3RibG9ja1wiXG4gICAgICAgIH1dLFxuXG4gICAgICAgIFwibGlzdGJsb2NrXCIgOiBbIHsgLy8gTGlzdHMgb25seSBlc2NhcGUgb24gY29tcGxldGVseSBibGFuayBsaW5lcy5cbiAgICAgICAgICAgIHRva2VuIDogXCJlbXB0eV9saW5lXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiXiRcIixcbiAgICAgICAgICAgIG5leHQgIDogXCJzdGFydFwiXG4gICAgICAgIH0sIHsgLy8gbGlzdFxuICAgICAgICAgICAgdG9rZW4gOiBcIm1hcmt1cC5saXN0XCIsXG4gICAgICAgICAgICByZWdleCA6IFwiXlxcXFxzezAsM30oPzpbKistXXxcXFxcZCtcXFxcLilcXFxccytcIixcbiAgICAgICAgICAgIG5leHQgIDogXCJsaXN0YmxvY2stc3RhcnRcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpbmNsdWRlIDogXCJiYXNpY1wiLCBub0VzY2FwZTogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICBjb2RlQmxvY2tTdGFydFJ1bGUsXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRlZmF1bHRUb2tlbiA6IFwibGlzdFwiIC8vZG8gbm90IHVzZSBtYXJrdXAubGlzdCB0byBhbGxvdyBzdGxpbmcgbGVhZGluZyBgKmAgZGlmZmVybnRseVxuICAgICAgICB9IF0sXG5cbiAgICAgICAgXCJibG9ja3F1b3RlXCIgOiBbIHsgLy8gQmxvY2txdW90ZXMgb25seSBlc2NhcGUgb24gYmxhbmsgbGluZXMuXG4gICAgICAgICAgICB0b2tlbiA6IFwiZW1wdHlfbGluZVwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIl5cXFxccyokXCIsXG4gICAgICAgICAgICBuZXh0ICA6IFwic3RhcnRcIlxuICAgICAgICB9LCB7IC8vIGJsb2NrIHF1b3RlXG4gICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nLmJsb2NrcXVvdGVcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJeXFxcXHMqPlxcXFxzKig/OlsqKy1dfFxcXFxkK1xcXFwuKT9cXFxccytcIixcbiAgICAgICAgICAgIG5leHQgIDogXCJibG9ja3F1b3RlXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaW5jbHVkZSA6IFwiYmFzaWNcIiwgbm9Fc2NhcGU6IHRydWVcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgZGVmYXVsdFRva2VuIDogXCJzdHJpbmcuYmxvY2txdW90ZVwiXG4gICAgICAgIH0gXSxcblxuICAgICAgICBcImdpdGh1YmJsb2NrXCIgOiBjb2RlQmxvY2tSdWxlc1xuICAgIH0pO1xuXG4gICAgdGhpcy5ub3JtYWxpemVSdWxlcygpO1xufTtcbm9vcC5pbmhlcml0cyhNYXJrZG93bkhpZ2hsaWdodFJ1bGVzLCBUZXh0SGlnaGxpZ2h0UnVsZXMpO1xuXG5leHBvcnRzLk1hcmtkb3duSGlnaGxpZ2h0UnVsZXMgPSBNYXJrZG93bkhpZ2hsaWdodFJ1bGVzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBsYW5nID0gcmVxdWlyZShcIi4uL2xpYi9sYW5nXCIpO1xudmFyIFNjc3NIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3Njc3NfaGlnaGxpZ2h0X3J1bGVzXCIpLlNjc3NIaWdobGlnaHRSdWxlcztcblxudmFyIFNhc3NIaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uKCkge1xuICAgIFNjc3NIaWdobGlnaHRSdWxlcy5jYWxsKHRoaXMpO1xuICAgIHZhciBzdGFydCA9IHRoaXMuJHJ1bGVzLnN0YXJ0O1xuICAgIGlmIChzdGFydFsxXS50b2tlbiA9PSBcImNvbW1lbnRcIikge1xuICAgICAgICBzdGFydC5zcGxpY2UoMSwgMSwge1xuICAgICAgICAgICAgb25NYXRjaDogZnVuY3Rpb24odmFsdWUsIGN1cnJlbnRTdGF0ZSwgc3RhY2spIHtcbiAgICAgICAgICAgICAgICBzdGFjay51bnNoaWZ0KHRoaXMubmV4dCwgLTEsIHZhbHVlLmxlbmd0aCAtIDIsIGN1cnJlbnRTdGF0ZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiY29tbWVudFwiO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlZ2V4OiAvXlxccypcXC9cXCovLFxuICAgICAgICAgICAgbmV4dDogXCJjb21tZW50XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwiZXJyb3IuaW52YWxpZFwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiL1xcXFwqfFt7O31dXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwic3VwcG9ydC50eXBlXCIsXG4gICAgICAgICAgICByZWdleDogL15cXHMqOltcXHdcXC1dK1xccy9cbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLiRydWxlcy5jb21tZW50ID0gW1xuICAgICAgICAgICAge3JlZ2V4OiAvXlxccyovLCBvbk1hdGNoOiBmdW5jdGlvbih2YWx1ZSwgY3VycmVudFN0YXRlLCBzdGFjaykge1xuICAgICAgICAgICAgICAgIGlmIChzdGFja1sxXSA9PT0gLTEpXG4gICAgICAgICAgICAgICAgICAgIHN0YWNrWzFdID0gTWF0aC5tYXgoc3RhY2tbMl0sIHZhbHVlLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5sZW5ndGggPD0gc3RhY2tbMV0pIHtcbiAgICAgICAgICAgICAgICAgICAgLypzaGlmdDN4Ki9zdGFjay5zaGlmdCgpO3N0YWNrLnNoaWZ0KCk7c3RhY2suc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0ID0gc3RhY2suc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwidGV4dFwiO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcImNvbW1lbnRcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBuZXh0OiBcInN0YXJ0XCJ9LFxuICAgICAgICAgICAge2RlZmF1bHRUb2tlbjogXCJjb21tZW50XCJ9XG4gICAgICAgIF07XG4gICAgfVxufTtcblxub29wLmluaGVyaXRzKFNhc3NIaWdobGlnaHRSdWxlcywgU2Nzc0hpZ2hsaWdodFJ1bGVzKTtcblxuZXhwb3J0cy5TYXNzSGlnaGxpZ2h0UnVsZXMgPSBTYXNzSGlnaGxpZ2h0UnVsZXM7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIGxhbmcgPSByZXF1aXJlKFwiLi4vbGliL2xhbmdcIik7XG52YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xudmFyIENzc0hpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vY3NzX2hpZ2hsaWdodF9ydWxlc1wiKTtcblxudmFyIFNjc3NIaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uKCkge1xuICAgIFxuICAgIHZhciBwcm9wZXJ0aWVzID0gbGFuZy5hcnJheVRvTWFwKENzc0hpZ2hsaWdodFJ1bGVzLnN1cHBvcnRUeXBlLnNwbGl0KFwifFwiKSk7XG5cbiAgICB2YXIgZnVuY3Rpb25zID0gbGFuZy5hcnJheVRvTWFwKFxuICAgICAgICAoXCJoc2x8aHNsYXxyZ2J8cmdiYXx1cmx8YXR0cnxjb3VudGVyfGNvdW50ZXJzfGFic3xhZGp1c3RfY29sb3J8YWRqdXN0X2h1ZXxcIiArXG4gICAgICAgICBcImFscGhhfGpvaW58Ymx1ZXxjZWlsfGNoYW5nZV9jb2xvcnxjb21wYXJhYmxlfGNvbXBsZW1lbnR8ZGFya2VufGRlc2F0dXJhdGV8XCIgKyBcbiAgICAgICAgIFwiZmxvb3J8Z3JheXNjYWxlfGdyZWVufGh1ZXxpZnxpbnZlcnR8am9pbnxsZW5ndGh8bGlnaHRlbnxsaWdodG5lc3N8bWl4fFwiICsgXG4gICAgICAgICBcIm50aHxvcGFjaWZ5fG9wYWNpdHl8cGVyY2VudGFnZXxxdW90ZXxyZWR8cm91bmR8c2F0dXJhdGV8c2F0dXJhdGlvbnxcIiArXG4gICAgICAgICBcInNjYWxlX2NvbG9yfHRyYW5zcGFyZW50aXplfHR5cGVfb2Z8dW5pdHx1bml0bGVzc3x1bnF1b3RlXCIpLnNwbGl0KFwifFwiKVxuICAgICk7XG5cbiAgICB2YXIgY29uc3RhbnRzID0gbGFuZy5hcnJheVRvTWFwKENzc0hpZ2hsaWdodFJ1bGVzLnN1cHBvcnRDb25zdGFudC5zcGxpdChcInxcIikpO1xuXG4gICAgdmFyIGNvbG9ycyA9IGxhbmcuYXJyYXlUb01hcChDc3NIaWdobGlnaHRSdWxlcy5zdXBwb3J0Q29uc3RhbnRDb2xvci5zcGxpdChcInxcIikpO1xuICAgIFxuICAgIHZhciBrZXl3b3JkcyA9IGxhbmcuYXJyYXlUb01hcChcbiAgICAgICAgKFwiQG1peGlufEBleHRlbmR8QGluY2x1ZGV8QGltcG9ydHxAbWVkaWF8QGRlYnVnfEB3YXJufEBpZnxAZm9yfEBlYWNofEB3aGlsZXxAZWxzZXxAZm9udC1mYWNlfEAtd2Via2l0LWtleWZyYW1lc3xpZnxhbmR8IWRlZmF1bHR8bW9kdWxlfGRlZnxlbmR8ZGVjbGFyZVwiKS5zcGxpdChcInxcIilcbiAgICApO1xuICAgIFxuICAgIHZhciB0YWdzID0gbGFuZy5hcnJheVRvTWFwKFxuICAgICAgICAoXCJhfGFiYnJ8YWNyb255bXxhZGRyZXNzfGFwcGxldHxhcmVhfGFydGljbGV8YXNpZGV8YXVkaW98YnxiYXNlfGJhc2Vmb250fGJkb3xcIiArIFxuICAgICAgICAgXCJiaWd8YmxvY2txdW90ZXxib2R5fGJyfGJ1dHRvbnxjYW52YXN8Y2FwdGlvbnxjZW50ZXJ8Y2l0ZXxjb2RlfGNvbHxjb2xncm91cHxcIiArIFxuICAgICAgICAgXCJjb21tYW5kfGRhdGFsaXN0fGRkfGRlbHxkZXRhaWxzfGRmbnxkaXJ8ZGl2fGRsfGR0fGVtfGVtYmVkfGZpZWxkc2V0fFwiICsgXG4gICAgICAgICBcImZpZ2NhcHRpb258ZmlndXJlfGZvbnR8Zm9vdGVyfGZvcm18ZnJhbWV8ZnJhbWVzZXR8aDF8aDJ8aDN8aDR8aDV8aDZ8aGVhZHxcIiArIFxuICAgICAgICAgXCJoZWFkZXJ8aGdyb3VwfGhyfGh0bWx8aXxpZnJhbWV8aW1nfGlucHV0fGluc3xrZXlnZW58a2JkfGxhYmVsfGxlZ2VuZHxsaXxcIiArIFxuICAgICAgICAgXCJsaW5rfG1hcHxtYXJrfG1lbnV8bWV0YXxtZXRlcnxuYXZ8bm9mcmFtZXN8bm9zY3JpcHR8b2JqZWN0fG9sfG9wdGdyb3VwfFwiICsgXG4gICAgICAgICBcIm9wdGlvbnxvdXRwdXR8cHxwYXJhbXxwcmV8cHJvZ3Jlc3N8cXxycHxydHxydWJ5fHN8c2FtcHxzY3JpcHR8c2VjdGlvbnxzZWxlY3R8XCIgKyBcbiAgICAgICAgIFwic21hbGx8c291cmNlfHNwYW58c3RyaWtlfHN0cm9uZ3xzdHlsZXxzdWJ8c3VtbWFyeXxzdXB8dGFibGV8dGJvZHl8dGR8XCIgKyBcbiAgICAgICAgIFwidGV4dGFyZWF8dGZvb3R8dGh8dGhlYWR8dGltZXx0aXRsZXx0cnx0dHx1fHVsfHZhcnx2aWRlb3x3YnJ8eG1wXCIpLnNwbGl0KFwifFwiKVxuICAgICk7XG5cbiAgICAvLyByZWdleHAgbXVzdCBub3QgaGF2ZSBjYXB0dXJpbmcgcGFyZW50aGVzZXMuIFVzZSAoPzopIGluc3RlYWQuXG4gICAgLy8gcmVnZXhwcyBhcmUgb3JkZXJlZCAtPiB0aGUgZmlyc3QgbWF0Y2ggaXMgdXNlZFxuXG4gICAgdmFyIG51bVJlID0gXCJcXFxcLT8oPzooPzpbMC05XSspfCg/OlswLTldKlxcXFwuWzAtOV0rKSlcIjtcblxuICAgIC8vIHJlZ2V4cCBtdXN0IG5vdCBoYXZlIGNhcHR1cmluZyBwYXJlbnRoZXNlcy4gVXNlICg/OikgaW5zdGVhZC5cbiAgICAvLyByZWdleHBzIGFyZSBvcmRlcmVkIC0+IHRoZSBmaXJzdCBtYXRjaCBpcyB1c2VkXG5cbiAgICB0aGlzLiRydWxlcyA9IHtcbiAgICAgICAgXCJzdGFydFwiIDogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwvXFxcXC8uKiRcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudFwiLCAvLyBtdWx0aSBsaW5lIGNvbW1lbnRcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXC9cXFxcKlwiLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcImNvbW1lbnRcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIiwgLy8gc2luZ2xlIGxpbmVcbiAgICAgICAgICAgICAgICByZWdleCA6ICdbXCJdKD86KD86XFxcXFxcXFwuKXwoPzpbXlwiXFxcXFxcXFxdKSkqP1tcIl0nXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLCAvLyBtdWx0aSBsaW5lIHN0cmluZyBzdGFydFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogJ1tcIl0uKlxcXFxcXFxcJCcsXG4gICAgICAgICAgICAgICAgbmV4dCA6IFwicXFzdHJpbmdcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIiwgLy8gc2luZ2xlIGxpbmVcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiWyddKD86KD86XFxcXFxcXFwuKXwoPzpbXidcXFxcXFxcXF0pKSo/WyddXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsIC8vIG11bHRpIGxpbmUgc3RyaW5nIHN0YXJ0XG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlsnXS4qXFxcXFxcXFwkXCIsXG4gICAgICAgICAgICAgICAgbmV4dCA6IFwicXN0cmluZ1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IG51bVJlICsgXCIoPzpjaHxjbXxkZWd8ZW18ZXh8ZnJ8Z2R8Z3JhZHxIenxpbnxrSHp8bW18bXN8cGN8cHR8cHh8cmFkfHJlbXxzfHR1cm58dmh8dm1heHx2bWlufHZtfHZ3fCUpXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLCAvLyBoZXg2IGNvbG9yXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIiNbYS1mMC05XXs2fVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIiwgLy8gaGV4MyBjb2xvclxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIjW2EtZjAtOV17M31cIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5udW1lcmljXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBudW1SZVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogW1wic3VwcG9ydC5mdW5jdGlvblwiLCBcInN0cmluZ1wiLCBcInN1cHBvcnQuZnVuY3Rpb25cIl0sXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIih1cmxcXFxcKCkoLiopKFxcXFwpKVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eSh2YWx1ZS50b0xvd2VyQ2FzZSgpKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcInN1cHBvcnQudHlwZVwiO1xuICAgICAgICAgICAgICAgICAgICBpZiAoa2V5d29yZHMuaGFzT3duUHJvcGVydHkodmFsdWUpKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwia2V5d29yZFwiO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChjb25zdGFudHMuaGFzT3duUHJvcGVydHkodmFsdWUpKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiY29uc3RhbnQubGFuZ3VhZ2VcIjtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoZnVuY3Rpb25zLmhhc093blByb3BlcnR5KHZhbHVlKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcInN1cHBvcnQuZnVuY3Rpb25cIjtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoY29sb3JzLmhhc093blByb3BlcnR5KHZhbHVlLnRvTG93ZXJDYXNlKCkpKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwic3VwcG9ydC5jb25zdGFudC5jb2xvclwiO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0YWdzLmhhc093blByb3BlcnR5KHZhbHVlLnRvTG93ZXJDYXNlKCkpKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwidmFyaWFibGUubGFuZ3VhZ2VcIjtcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwidGV4dFwiO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwtP1tAYS16X11bQGEtejAtOV9cXFxcLV0qXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwidmFyaWFibGVcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiW2Etel9cXFxcLSRdW2EtejAtOV9cXFxcLSRdKlxcXFxiXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJ2YXJpYWJsZS5sYW5ndWFnZVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIiNbYS16MC05LV9dK1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwidmFyaWFibGUubGFuZ3VhZ2VcIixcbiAgICAgICAgICAgICAgICByZWdleDogXCJcXFxcLlthLXowLTktX10rXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJ2YXJpYWJsZS5sYW5ndWFnZVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIjpbYS16MC05LV9dK1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnRcIixcbiAgICAgICAgICAgICAgICByZWdleDogXCJbYS16MC05LV9dK1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImtleXdvcmQub3BlcmF0b3JcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiPHw+fDw9fD49fD09fCE9fC18JXwjfFxcXFwrfFxcXFwkfFxcXFwrfFxcXFwqXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwicGFyZW4ubHBhcmVuXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIltbKHtdXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwicGFyZW4ucnBhcmVuXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIltcXFxcXSl9XVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXHMrXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBjYXNlSW5zZW5zaXRpdmU6IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgXCJjb21tZW50XCIgOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIiwgLy8gY2xvc2luZyBjb21tZW50XG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwqXFxcXC9cIixcbiAgICAgICAgICAgICAgICBuZXh0IDogXCJzdGFydFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuIDogXCJjb21tZW50XCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgXCJxcXN0cmluZ1wiIDogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICByZWdleCA6ICcoPzooPzpcXFxcXFxcXC4pfCg/OlteXCJcXFxcXFxcXF0pKSo/XCInLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcInN0YXJ0XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAnLisnXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIFwicXN0cmluZ1wiIDogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiKD86KD86XFxcXFxcXFwuKXwoPzpbXidcXFxcXFxcXF0pKSo/J1wiLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcInN0YXJ0XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAnLisnXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9O1xufTtcblxub29wLmluaGVyaXRzKFNjc3NIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuZXhwb3J0cy5TY3NzSGlnaGxpZ2h0UnVsZXMgPSBTY3NzSGlnaGxpZ2h0UnVsZXM7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1vZGVzID0gcmVxdWlyZShcIi4uL2NvbmZpZ1wiKS4kbW9kZXM7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90ZXh0X2hpZ2hsaWdodF9ydWxlc1wiKS5UZXh0SGlnaGxpZ2h0UnVsZXM7XG52YXIgU2xpbUhpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24oKSB7XG5cbiAgICB0aGlzLiRydWxlcyA9IHtcbiAgICAgICAgXCJzdGFydFwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwia2V5d29yZFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvXihcXHMqKShcXHcrKTpcXHMqLyxcbiAgICAgICAgICAgICAgICBvbk1hdGNoOiBmdW5jdGlvbih2YWx1ZSwgc3RhdGUsIHN0YWNrLCBsaW5lKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpbmRlbnQgPSAvXlxccyovLmV4ZWMobGluZSlbMF07XG4gICAgICAgICAgICAgICAgICAgIHZhciBtID0gdmFsdWUubWF0Y2goL14oXFxzKikoXFx3Kyk6Lyk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBsYW5ndWFnZSA9IG1bMl07XG4gICAgICAgICAgICAgICAgICAgIGlmICghL14oamF2YXNjcmlwdHxydWJ5fGNvZmZlZXxtYXJrZG93bnxjc3N8c2Nzc3xzYXNzfGxlc3MpJC8udGVzdChsYW5ndWFnZSkpXG4gICAgICAgICAgICAgICAgICAgICAgICBsYW5ndWFnZSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgIHN0YWNrLnVuc2hpZnQoXCJsYW5ndWFnZS1lbWJlZFwiLCBbXSwgW2luZGVudCwgbGFuZ3VhZ2VdLCBzdGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRva2VuO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc3RhdGVOYW1lOiBcImxhbmd1YWdlLWVtYmVkXCIsXG4gICAgICAgICAgICAgICAgbmV4dDogW3tcbiAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAvXihcXHMqKS8sXG4gICAgICAgICAgICAgICAgICAgIG9uTWF0Y2g6IGZ1bmN0aW9uKHZhbHVlLCBzdGF0ZSwgc3RhY2ssIGxpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRlbnQgPSBzdGFja1syXVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmRlbnQubGVuZ3RoID49IHZhbHVlLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWNrLnNwbGljZSgwLCAzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHQgPSBzdGFjay5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRva2VuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0ID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbe3R5cGU6IFwidGV4dFwiLCB2YWx1ZTogaW5kZW50fV07XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG5leHQ6IFwiXCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICByZWdleDogLy4rLyxcbiAgICAgICAgICAgICAgICAgICAgb25NYXRjaDogZnVuY3Rpb24odmFsdWUsIHN0YXRlLCBzdGFjaywgbGluZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZGVudCA9IHN0YWNrWzJdWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxhbmd1YWdlID0gc3RhY2tbMl1bMV07XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZW1iZWRTdGF0ZSA9IHN0YWNrWzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobW9kZXNbbGFuZ3VhZ2VdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBtb2Rlc1tsYW5ndWFnZV0uZ2V0VG9rZW5pemVyKCkuZ2V0TGluZVRva2VucyhsaW5lLnNsaWNlKGluZGVudC5sZW5ndGgpLCBlbWJlZFN0YXRlLnNsaWNlKDApKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFja1sxXSA9IGRhdGEuc3RhdGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGEudG9rZW5zO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9rZW47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogJ2NvbnN0YW50LmJlZ2luLmphdmFzY3JpcHQuZmlsdGVyLnNsaW0nLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAnXihcXFxccyopKCk6JCdcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogJ2NvbnN0YW50LmJlZ2luLi5maWx0ZXIuc2xpbScsXG4gICAgICAgICAgICAgICAgcmVnZXg6ICdeKFxcXFxzKikocnVieSk6JCdcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogJ2NvbnN0YW50LmJlZ2luLmNvZmZlZXNjcmlwdC5maWx0ZXIuc2xpbScsXG4gICAgICAgICAgICAgICAgcmVnZXg6ICdeKFxcXFxzKikoKTokJ1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiAnY29uc3RhbnQuYmVnaW4uLmZpbHRlci5zbGltJyxcbiAgICAgICAgICAgICAgICByZWdleDogJ14oXFxcXHMqKShtYXJrZG93bik6JCdcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogJ2NvbnN0YW50LmJlZ2luLmNzcy5maWx0ZXIuc2xpbScsXG4gICAgICAgICAgICAgICAgcmVnZXg6ICdeKFxcXFxzKikoKTokJ1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiAnY29uc3RhbnQuYmVnaW4uc2Nzcy5maWx0ZXIuc2xpbScsXG4gICAgICAgICAgICAgICAgcmVnZXg6ICdeKFxcXFxzKikoKTokJ1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiAnY29uc3RhbnQuYmVnaW4uLmZpbHRlci5zbGltJyxcbiAgICAgICAgICAgICAgICByZWdleDogJ14oXFxcXHMqKShzYXNzKTokJ1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiAnY29uc3RhbnQuYmVnaW4uLmZpbHRlci5zbGltJyxcbiAgICAgICAgICAgICAgICByZWdleDogJ14oXFxcXHMqKShsZXNzKTokJ1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiAnY29uc3RhbnQuYmVnaW4uLmZpbHRlci5zbGltJyxcbiAgICAgICAgICAgICAgICByZWdleDogJ14oXFxcXHMqKShlcmIpOiQnXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46ICdrZXl3b3JkLmh0bWwudGFncy5zbGltJyxcbiAgICAgICAgICAgICAgICByZWdleDogJ14oXFxcXHMqKSgoOj9cXFxcKihcXFxcdykrKXxkb2N0eXBlIGh0bWx8YWJicnxhY3JvbnltfGFkZHJlc3N8YXBwbGV0fGFyZWF8YXJ0aWNsZXxhc2lkZXxhdWRpb3xiYXNlfGJhc2Vmb250fGJkb3xiaWd8YmxvY2txdW90ZXxib2R5fGJyfGJ1dHRvbnxjYW52YXN8Y2FwdGlvbnxjZW50ZXJ8Y2l0ZXxjb2RlfGNvbHxjb2xncm91cHxjb21tYW5kfGRhdGFsaXN0fGRkfGRlbHxkZXRhaWxzfGRpYWxvZ3xkZm58ZGlyfGRpdnxkbHxkdHxlbWJlZHxmaWVsZHNldHxmaWd1cmV8Zm9udHxmb290ZXJ8Zm9ybXxmcmFtZXxmcmFtZXNldHxoMXxoMnxoM3xoNHxoNXxoNnxoZWFkfGhlYWRlcnxoZ3JvdXB8aHJ8aHRtbHxpfGlmcmFtZXxpbWd8aW5wdXR8aW5zfGtleWdlbnxrYmR8bGFiZWx8bGVnZW5kfGxpbmt8bGl8bWFwfG1hcmt8bWVudXxtZXRhfG1ldGVyfG5hdnxub2ZyYW1lc3xub3NjcmlwdHxvYmplY3R8b2x8b3B0Z3JvdXB8b3B0aW9ufG91dHB1dHxwfHBhcmFtfHByZXxwcm9ncmVzc3xxfHJwfHJ0fHJ1Ynl8c2FtcHxzY3JpcHR8c2VjdGlvbnxzZWxlY3R8c21hbGx8c291cmNlfHNwYW58c3RyaWtlfHN0cm9uZ3xzdHlsZXxzdWJ8c3VwfHRhYmxlfHRib2R5fHRkfHRleHRhcmVhfHRmb290fHRofHRoZWFkfHRpbWV8dGl0bGV8dHJ8dHR8dWx8dmFyfHZpZGVvfHhtcHxifHV8c3xlbXxhKSg/OihbLiNdKFxcXFx3fFxcXFwuKSspK1xcXFxzPyk/XFxcXGInXG5cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogJ2tleXdvcmQuc2xpbScsXG4gICAgICAgICAgICAgICAgcmVnZXg6ICdeKFxcXFxzKikoPzooWy4jXShcXFxcd3xcXFxcLikrKStcXFxccz8pJ1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvXihcXHMqKSgnfFxcfHxcXC98KFxcLyEpKVxccyovLFxuICAgICAgICAgICAgICAgIG9uTWF0Y2g6IGZ1bmN0aW9uKHZhbCwgc3RhdGUsIHN0YWNrLCBsaW5lKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpbmRlbnQgPSAvXlxccyovLmV4ZWMobGluZSlbMF07XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGFjay5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFjay5wdXNoKHRoaXMubmV4dCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFja1swXSA9IFwibWxTdHJpbmdcIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGFjay5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFjay5wdXNoKGluZGVudC5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhY2tbMV0gPSBpbmRlbnQubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRva2VuO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbmV4dDogXCJtbFN0cmluZ1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46ICdrZXl3b3JkLmNvbnRyb2wuc2xpbScsXG4gICAgICAgICAgICAgICAgcmVnZXg6ICdeKFxcXFxzKikoXFxcXC18PT18PSknLFxuICAgICAgICAgICAgICAgIHB1c2g6IFt7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuOiAnY29udHJvbC5lbmQuc2xpbScsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAnJCcsXG4gICAgICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGluY2x1ZGU6IFwicnVieWxpbmVcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgaW5jbHVkZTogXCJtaXNjXCJcbiAgICAgICAgICAgICAgICB9XVxuXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46ICdwYXJlbicsXG4gICAgICAgICAgICAgICAgcmVnZXg6ICdcXFxcKCcsXG4gICAgICAgICAgICAgICAgcHVzaDogW3tcbiAgICAgICAgICAgICAgICAgICAgdG9rZW46ICdwYXJlbicsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAnXFxcXCknLFxuICAgICAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBpbmNsdWRlOiBcIm1pc2NcIlxuICAgICAgICAgICAgICAgIH1dXG5cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogJ3BhcmVuJyxcbiAgICAgICAgICAgICAgICByZWdleDogJ1xcXFxbJyxcbiAgICAgICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgICAgICB0b2tlbjogJ3BhcmVuJyxcbiAgICAgICAgICAgICAgICAgICAgcmVnZXg6ICdcXFxcXScsXG4gICAgICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGluY2x1ZGU6IFwibWlzY1wiXG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiBcIm1pc2NcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBcIm1sU3RyaW5nXCI6IFt7XG4gICAgICAgICAgICB0b2tlbjogXCJpbmRlbnRcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXlxccyovLFxuICAgICAgICAgICAgb25NYXRjaDogZnVuY3Rpb24odmFsLCBzdGF0ZSwgc3RhY2spIHtcbiAgICAgICAgICAgICAgICB2YXIgY3VySW5kZW50ID0gc3RhY2tbMV07XG5cbiAgICAgICAgICAgICAgICBpZiAoY3VySW5kZW50ID49IHZhbC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0ID0gXCJzdGFydFwiO1xuICAgICAgICAgICAgICAgICAgICBzdGFjay5zcGxpY2UoMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHQgPSBcIm1sU3RyaW5nXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRva2VuO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5leHQ6IFwic3RhcnRcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwic3RyaW5nXCJcbiAgICAgICAgfV0sXG4gICAgICAgIFwicnVieWxpbmVcIjogW3tcbiAgICAgICAgICAgIHRva2VuOiBcImtleXdvcmQub3BlcmF0b3IucnVieS5lbWJlZGRlZC5zbGltXCIsXG4gICAgICAgICAgICByZWdleDogXCIoPT18PSkoPD58Pjx8PCd8Jzx8PHw+KT98LVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcImxpc3QucnVieS5vcGVyYXRvcnMuc2xpbVwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiKFxcXFxiKShmb3J8aW58ZG98aWZ8ZWxzZXxlbHNpZnx1bmxlc3N8d2hpbGV8eWllbGR8bm90fGFuZHxvcilcXFxcYlwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgcmVnZXg6IFwiWyddKC4pKj9bJ11cIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIltcXFwiXSguKSo/W1xcXCJdXCJcbiAgICAgICAgfV0sXG4gICAgICAgIFwibWlzY1wiOiBbe1xuICAgICAgICAgICAgdG9rZW46ICdjbGFzcy52YXJpYWJsZS5zbGltJyxcbiAgICAgICAgICAgIHJlZ2V4OiAnXFxcXEAoW2EtekEtWl9dW2EtekEtWjAtOV9dKilcXFxcYidcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwibGlzdC5tZXRhLnNsaW1cIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIihcXFxcYikodHJ1ZXxmYWxzZXxuaWwpKFxcXFxiKVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiAna2V5d29yZC5vcGVyYXRvci5lcXVhbHMuc2xpbScsXG4gICAgICAgICAgICByZWdleDogJz0nXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgcmVnZXg6IFwiWyddKC4pKj9bJ11cIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIltcXFwiXSguKSo/W1xcXCJdXCJcbiAgICAgICAgfV1cbiAgICB9O1xuICAgIHRoaXMubm9ybWFsaXplUnVsZXMoKTtcbn07XG5cblxub29wLmluaGVyaXRzKFNsaW1IaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuZXhwb3J0cy5TbGltSGlnaGxpZ2h0UnVsZXMgPSBTbGltSGlnaGxpZ2h0UnVsZXM7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=