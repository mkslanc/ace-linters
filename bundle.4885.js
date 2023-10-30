"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[4885],{

/***/ 7678:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



    var oop = __webpack_require__(89359);
    var TextHighlightRules = (__webpack_require__(28053)/* .TextHighlightRules */ .K);

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

    exports.s = CoffeeHighlightRules;


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

/***/ 4885:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var TextMode = (__webpack_require__(98030).Mode);
var JadeHighlightRules = (__webpack_require__(80774)/* .JadeHighlightRules */ .J);
var FoldMode = (__webpack_require__(35090)/* .FoldMode */ .Z);

var Mode = function() {
    this.HighlightRules = JadeHighlightRules;
    this.foldingRules = new FoldMode();
    this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, TextMode);

(function() { 
	this.lineCommentStart = "//";
    this.$id = "ace/mode/jade";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 80774:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/*
  THIS FILE WAS AUTOGENERATED BY mode_highlight_rules.tmpl.js (UUID: C5B73B98-5F2A-42E3-9F0E-028A74A9FE4B)
*/



var oop = __webpack_require__(89359);
var TextHighlightRules = (__webpack_require__(28053)/* .TextHighlightRules */ .K);
var MarkdownHighlightRules = (__webpack_require__(92884)/* .MarkdownHighlightRules */ .B);
var SassHighlightRules = (__webpack_require__(71690)/* .ScssHighlightRules */ .m);
var LessHighlightRules = (__webpack_require__(16761)/* .LessHighlightRules */ .q);
var CoffeeHighlightRules = (__webpack_require__(7678)/* .CoffeeHighlightRules */ .s);
var JavaScriptHighlightRules = (__webpack_require__(33801)/* .JavaScriptHighlightRules */ ._);

function mixin_embed(tag, prefix) {
    return { 
        token : "entity.name.function.jade",
        regex : "^\\s*\\:" + tag,
        next  : prefix + "start"
    };
}

var JadeHighlightRules = function() {

    var escapedRe = "\\\\(?:x[0-9a-fA-F]{2}|" + // hex
        "u[0-9a-fA-F]{4}|" + // unicode
        "[0-2][0-7]{0,2}|" + // oct
        "3[0-6][0-7]?|" + // oct
        "37[0-7]?|" + // oct
        "[4-7][0-7]?|" + //oct
        ".)";

    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used

    this.$rules = 
        {
    "start": [
        {
            token: "keyword.control.import.include.jade",
            regex: "\\s*\\binclude\\b"
        },
        {
            token: "keyword.other.doctype.jade",
            regex: "^!!!\\s*(?:[a-zA-Z0-9-_]+)?"
        },
        {
            onMatch: function(value, currentState, stack) {
                stack.unshift(this.next, value.length - 2, currentState);
                return "comment";
            },
            regex: /^\s*\/\//,
            next: "comment_block"
        },
        mixin_embed("markdown", "markdown-"),
        mixin_embed("sass", "sass-"),
        mixin_embed("less", "less-"),
        mixin_embed("coffee", "coffee-"),
        /*
        {
            token: {
                "2": {
                    "name": "entity.name.function.jade"
                }
            },
            regex: "^(\\s*)(\\:cdata)",
            next: "state_9"
        },*/
        // match stuff like: mixin dialog-title-desc(title, desc)
        {
            token: [ "storage.type.function.jade",
                       "entity.name.function.jade",
                       "punctuation.definition.parameters.begin.jade",
                       "variable.parameter.function.jade",
                       "punctuation.definition.parameters.end.jade"
                    ],
            regex: "^(\\s*mixin)( [\\w\\-]+)(\\s*\\()(.*?)(\\))"
        },
        // match stuff like: mixin dialog-title-desc
        {
            token: [ "storage.type.function.jade", "entity.name.function.jade"],
            regex: "^(\\s*mixin)( [\\w\\-]+)"
        },
        {
            token: "source.js.embedded.jade",
            regex: "^\\s*(?:-|=|!=)",
            next: "js-start"
        },
        /*{
            token: "entity.name.tag.script.jade",
            regex: "^\\s*script",
            next: "js_code_tag"
        },*/
        {
            token: "string.interpolated.jade",
            regex: "[#!]\\{[^\\}]+\\}"
        },
        // Match any tag, id or class. skip AST filters
        {
            token: "meta.tag.any.jade",
            regex: /^\s*(?!\w+:)(?:[\w-]+|(?=\.|#)])/,
            next: "tag_single"
        },
        {
            token: "suport.type.attribute.id.jade",
            regex: "#\\w+"
        },
        {
            token: "suport.type.attribute.class.jade",
            regex: "\\.\\w+"
        },
        {
            token: "punctuation",
            regex: "\\s*(?:\\()",
            next: "tag_attributes"
        }
    ],
    "comment_block": [
        {regex: /^\s*(?:\/\/)?/, onMatch: function(value, currentState, stack) {
            if (value.length <= stack[1]) {
                if (value.slice(-1) == "/") {
                    stack[1] = value.length - 2;
                    this.next = "";
                    return "comment";
                }
                stack.shift();
                stack.shift();
                this.next = stack.shift();
                return "text";
            } else {
                this.next = "";
                return "comment";
            }
        }, next: "start"},
        {defaultToken: "comment"}
    ],
    /*
    
    "state_9": [
        {
            token: "TODO",
            regex: "^(?!\\1\\s+)",
            next: "start"
        },
        {
            token: "TODO",
            regex: ".+",
            next: "state_9"
        }
    ],*/
    /*"js_code": [
        {
            token: "keyword.control.js",
            regex: "\\beach\\b"
        },
        {
            token: "text",
            regex: "$",
            next: "start"
        }
    ],*/
    /*"js_code_tag": [
        {
            "include": "source.js"
        },
        {
            token: "TODO",
            regex: "^((?=(\\1)([\\w#\\.]|$\\n?))|^$\\n?)",
            next: "start"
        }
    ],*/
    "tag_single": [
        {
            token: "entity.other.attribute-name.class.jade",
            regex: "\\.[\\w-]+"
        },
        {
            token: "entity.other.attribute-name.id.jade",
            regex: "#[\\w-]+"
        },
        {
            token: ["text", "punctuation"],
            regex: "($)|((?!\\.|#|=|-))",
            next: "start"
        }
    ],
    "tag_attributes": [ 
        {
            token : "string",
            regex : "'(?=.)",
            next  : "qstring"
        }, 
        {
            token : "string",
            regex : '"(?=.)',
            next  : "qqstring"
        },
        {
            token: ["entity.other.attribute-name.jade", "punctuation"],
            regex: "([a-zA-Z:\\.-]+)(=)?",
            next: "attribute_strings"
        },
        {
            token: "punctuation",
            regex: "\\)",
            next: "start"
        }
    ],
    "attribute_strings": [
        {
            token : "string",
            regex : "'(?=.)",
            next  : "qstring"
        }, 
        {
            token : "string",
            regex : '"(?=.)',
            next  : "qqstring"
        },
        {
            token : "string",
            regex : '(?=\\S)',
            next  : "tag_attributes"
        }
    ],
    "qqstring" : [
        {
            token : "constant.language.escape",
            regex : escapedRe
        }, {
            token : "string",
            regex : '[^"\\\\]+'
        }, {
            token : "string",
            regex : "\\\\$",
            next  : "qqstring"
        }, {
            token : "string",
            regex : '"|$',
            next  : "tag_attributes"
        }
    ],
    "qstring" : [
        {
            token : "constant.language.escape",
            regex : escapedRe
        }, {
            token : "string",
            regex : "[^'\\\\]+"
        }, {
            token : "string",
            regex : "\\\\$",
            next  : "qstring"
        }, {
            token : "string",
            regex : "'|$",
            next  : "tag_attributes"
        }
    ]
};

    this.embedRules(JavaScriptHighlightRules, "js-", [{
        token: "text",
        regex: ".$",
        next: "start"
    }]);
/*
    this.embedRules(MarkdownHighlightRules, "markdown-", [{
       token : "support.function",
       regex : "^\\1\\s+",
       captures: "1",
       next  : "start"
    }]);

    this.embedRules(SassHighlightRules, "sass-", [{
       token : "support.function",
       regex : "^(?!\\1\\s+)",
       captures: "1",
       next  : "start"
    }]);

    this.embedRules(LessHighlightRules, "less-", [{
       token : "support.function",
       regex : "^(?!\\1\\s+)",
       captures: "1",
       next  : "start"
    }]);

    this.embedRules(CoffeeHighlightRules, "coffee-", [{
       token : "support.function",
       regex : "^(?!\\1\\s+)",
       captures: "1",
       next  : "start"
    }]);

    this.embedRules(JavaScriptHighlightRules, "js-", [{
       token : "support.function",
       regex : "$",
       captures: "1",
       next  : "start"
    }]); */
};

oop.inherits(JadeHighlightRules, TextHighlightRules);

exports.J = JadeHighlightRules;


/***/ }),

/***/ 16761:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var TextHighlightRules = (__webpack_require__(28053)/* .TextHighlightRules */ .K);
var CssHighlightRules = __webpack_require__(99301);

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

exports.q = LessHighlightRules;


/***/ }),

/***/ 92884:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var modes = (__webpack_require__(13188).$modes);

var oop = __webpack_require__(89359);
var lang = __webpack_require__(20124);
var TextHighlightRules = (__webpack_require__(28053)/* .TextHighlightRules */ .K);
var HtmlHighlightRules = (__webpack_require__(72843)/* .HtmlHighlightRules */ .V);

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

exports.B = MarkdownHighlightRules;


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsMkJBQTJCLEtBQUssS0FBSztBQUNyQyxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBLFNBQVMsZ0JBQWdCO0FBQ3pCLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLDZCQUE2QjtBQUM3QixhQUFhO0FBQ2I7QUFDQSwrQkFBK0I7QUFDL0IsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsU0FBMEIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2NvZmZlZV9oaWdobGlnaHRfcnVsZXMuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9mb2xkaW5nL2NvZmZlZS5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2phZGUuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9qYWRlX2hpZ2hsaWdodF9ydWxlcy5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2xlc3NfaGlnaGxpZ2h0X3J1bGVzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvbWFya2Rvd25faGlnaGxpZ2h0X3J1bGVzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvc2Nzc19oaWdobGlnaHRfcnVsZXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICB2YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG4gICAgdmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcblxuICAgIG9vcC5pbmhlcml0cyhDb2ZmZWVIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuICAgIGZ1bmN0aW9uIENvZmZlZUhpZ2hsaWdodFJ1bGVzKCkge1xuICAgICAgICB2YXIgaWRlbnRpZmllciA9IFwiWyRBLVphLXpfXFxcXHg3Zi1cXFxcdWZmZmZdWyRcXFxcd1xcXFx4N2YtXFxcXHVmZmZmXSpcIjtcblxuICAgICAgICB2YXIga2V5d29yZHMgPSAoXG4gICAgICAgICAgICBcInRoaXN8dGhyb3d8dGhlbnx0cnl8dHlwZW9mfHN1cGVyfHN3aXRjaHxyZXR1cm58YnJlYWt8Ynl8Y29udGludWV8XCIgK1xuICAgICAgICAgICAgXCJjYXRjaHxjbGFzc3xpbnxpbnN0YW5jZW9mfGlzfGlzbnR8aWZ8ZWxzZXxleHRlbmRzfGZvcnxvd258XCIgK1xuICAgICAgICAgICAgXCJmaW5hbGx5fGZ1bmN0aW9ufHdoaWxlfHdoZW58bmV3fG5vfG5vdHxkZWxldGV8ZGVidWdnZXJ8ZG98bG9vcHxvZnxvZmZ8XCIgK1xuICAgICAgICAgICAgXCJvcnxvbnx1bmxlc3N8dW50aWx8YW5kfHllc3x5aWVsZHxleHBvcnR8aW1wb3J0fGRlZmF1bHRcIlxuICAgICAgICApO1xuXG4gICAgICAgIHZhciBsYW5nQ29uc3RhbnQgPSAoXG4gICAgICAgICAgICBcInRydWV8ZmFsc2V8bnVsbHx1bmRlZmluZWR8TmFOfEluZmluaXR5XCJcbiAgICAgICAgKTtcblxuICAgICAgICB2YXIgaWxsZWdhbCA9IChcbiAgICAgICAgICAgIFwiY2FzZXxjb25zdHxmdW5jdGlvbnx2YXJ8dm9pZHx3aXRofGVudW18aW1wbGVtZW50c3xcIiArXG4gICAgICAgICAgICBcImludGVyZmFjZXxsZXR8cGFja2FnZXxwcml2YXRlfHByb3RlY3RlZHxwdWJsaWN8c3RhdGljXCJcbiAgICAgICAgKTtcblxuICAgICAgICB2YXIgc3VwcG9ydENsYXNzID0gKFxuICAgICAgICAgICAgXCJBcnJheXxCb29sZWFufERhdGV8RnVuY3Rpb258TnVtYmVyfE9iamVjdHxSZWdFeHB8UmVmZXJlbmNlRXJyb3J8U3RyaW5nfFwiICtcbiAgICAgICAgICAgIFwiRXJyb3J8RXZhbEVycm9yfEludGVybmFsRXJyb3J8UmFuZ2VFcnJvcnxSZWZlcmVuY2VFcnJvcnxTdG9wSXRlcmF0aW9ufFwiICtcbiAgICAgICAgICAgIFwiU3ludGF4RXJyb3J8VHlwZUVycm9yfFVSSUVycm9yfFwiICArXG4gICAgICAgICAgICBcIkFycmF5QnVmZmVyfEZsb2F0MzJBcnJheXxGbG9hdDY0QXJyYXl8SW50MTZBcnJheXxJbnQzMkFycmF5fEludDhBcnJheXxcIiArXG4gICAgICAgICAgICBcIlVpbnQxNkFycmF5fFVpbnQzMkFycmF5fFVpbnQ4QXJyYXl8VWludDhDbGFtcGVkQXJyYXlcIlxuICAgICAgICApO1xuXG4gICAgICAgIHZhciBzdXBwb3J0RnVuY3Rpb24gPSAoXG4gICAgICAgICAgICBcIk1hdGh8SlNPTnxpc05hTnxpc0Zpbml0ZXxwYXJzZUludHxwYXJzZUZsb2F0fGVuY29kZVVSSXxcIiArXG4gICAgICAgICAgICBcImVuY29kZVVSSUNvbXBvbmVudHxkZWNvZGVVUkl8ZGVjb2RlVVJJQ29tcG9uZW50fFN0cmluZ3xcIlxuICAgICAgICApO1xuXG4gICAgICAgIHZhciB2YXJpYWJsZUxhbmd1YWdlID0gKFxuICAgICAgICAgICAgXCJ3aW5kb3d8YXJndW1lbnRzfHByb3RvdHlwZXxkb2N1bWVudFwiXG4gICAgICAgICk7XG5cbiAgICAgICAgdmFyIGtleXdvcmRNYXBwZXIgPSB0aGlzLmNyZWF0ZUtleXdvcmRNYXBwZXIoe1xuICAgICAgICAgICAgXCJrZXl3b3JkXCI6IGtleXdvcmRzLFxuICAgICAgICAgICAgXCJjb25zdGFudC5sYW5ndWFnZVwiOiBsYW5nQ29uc3RhbnQsXG4gICAgICAgICAgICBcImludmFsaWQuaWxsZWdhbFwiOiBpbGxlZ2FsLFxuICAgICAgICAgICAgXCJsYW5ndWFnZS5zdXBwb3J0LmNsYXNzXCI6IHN1cHBvcnRDbGFzcyxcbiAgICAgICAgICAgIFwibGFuZ3VhZ2Uuc3VwcG9ydC5mdW5jdGlvblwiOiBzdXBwb3J0RnVuY3Rpb24sXG4gICAgICAgICAgICBcInZhcmlhYmxlLmxhbmd1YWdlXCI6IHZhcmlhYmxlTGFuZ3VhZ2VcbiAgICAgICAgfSwgXCJpZGVudGlmaWVyXCIpO1xuXG4gICAgICAgIHZhciBmdW5jdGlvblJ1bGUgPSB7XG4gICAgICAgICAgICB0b2tlbjogW1wicGFyZW4ubHBhcmVuXCIsIFwidmFyaWFibGUucGFyYW1ldGVyXCIsIFwicGFyZW4ucnBhcmVuXCIsIFwidGV4dFwiLCBcInN0b3JhZ2UudHlwZVwiXSxcbiAgICAgICAgICAgIHJlZ2V4OiAvKD86KFxcKCkoKD86XCJbXlwiKV0qP1wifCdbXicpXSo/J3xcXC9bXlxcLyldKj9cXC98W14oKVwiJ1xcL10pKj8pKFxcKSkoXFxzKikpPyhbXFwtPV0+KS8uc291cmNlXG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIHN0cmluZ0VzY2FwZSA9IC9cXFxcKD86eFswLTlhLWZBLUZdezJ9fHVbMC05YS1mQS1GXXs0fXxbMC0yXVswLTddezAsMn18M1swLTZdWzAtN10/fDM3WzAtN10/fFs0LTddWzAtN10/fC4pLztcblxuICAgICAgICB0aGlzLiRydWxlcyA9IHtcbiAgICAgICAgICAgIHN0YXJ0IDogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggOiBcIig/OjB4W1xcXFxkYS1mQS1GXSt8KD86XFxcXGQrKD86XFxcXC5cXFxcZCspP3xcXFxcLlxcXFxkKykoPzpbZUVdWystXT9cXFxcZCspPylcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVOYW1lOiBcInFkb2NcIixcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLCByZWdleCA6IFwiJycnXCIsIG5leHQgOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7dG9rZW4gOiBcInN0cmluZ1wiLCByZWdleCA6IFwiJycnXCIsIG5leHQgOiBcInN0YXJ0XCJ9LFxuICAgICAgICAgICAgICAgICAgICAgICAge3Rva2VuIDogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIiwgcmVnZXggOiBzdHJpbmdFc2NhcGV9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2RlZmF1bHRUb2tlbjogXCJzdHJpbmdcIn1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVOYW1lOiBcInFxZG9jXCIsXG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggOiAnXCJcIlwiJyxcbiAgICAgICAgICAgICAgICAgICAgbmV4dCA6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0b2tlbiA6IFwic3RyaW5nXCIsIHJlZ2V4IDogJ1wiXCJcIicsIG5leHQgOiBcInN0YXJ0XCJ9LFxuICAgICAgICAgICAgICAgICAgICAgICAge3Rva2VuIDogXCJwYXJlbi5zdHJpbmdcIiwgcmVnZXggOiAnI3snLCBwdXNoIDogXCJzdGFydFwifSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0b2tlbiA6IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCIsIHJlZ2V4IDogc3RyaW5nRXNjYXBlfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtkZWZhdWx0VG9rZW46IFwic3RyaW5nXCJ9XG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlTmFtZTogXCJxc3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIiwgcmVnZXggOiBcIidcIiwgbmV4dCA6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0b2tlbiA6IFwic3RyaW5nXCIsIHJlZ2V4IDogXCInXCIsIG5leHQgOiBcInN0YXJ0XCJ9LFxuICAgICAgICAgICAgICAgICAgICAgICAge3Rva2VuIDogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIiwgcmVnZXggOiBzdHJpbmdFc2NhcGV9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2RlZmF1bHRUb2tlbjogXCJzdHJpbmdcIn1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVOYW1lOiBcInFxc3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmcuc3RhcnRcIiwgcmVnZXggOiAnXCInLCBuZXh0IDogW1xuICAgICAgICAgICAgICAgICAgICAgICAge3Rva2VuIDogXCJzdHJpbmcuZW5kXCIsIHJlZ2V4IDogJ1wiJywgbmV4dCA6IFwic3RhcnRcIn0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7dG9rZW4gOiBcInBhcmVuLnN0cmluZ1wiLCByZWdleCA6ICcjeycsIHB1c2ggOiBcInN0YXJ0XCJ9LFxuICAgICAgICAgICAgICAgICAgICAgICAge3Rva2VuIDogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIiwgcmVnZXggOiBzdHJpbmdFc2NhcGV9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2RlZmF1bHRUb2tlbjogXCJzdHJpbmdcIn1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVOYW1lOiBcImpzXCIsXG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIiwgcmVnZXggOiBcImBcIiwgbmV4dCA6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0b2tlbiA6IFwic3RyaW5nXCIsIHJlZ2V4IDogXCJgXCIsIG5leHQgOiBcInN0YXJ0XCJ9LFxuICAgICAgICAgICAgICAgICAgICAgICAge3Rva2VuIDogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIiwgcmVnZXggOiBzdHJpbmdFc2NhcGV9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2RlZmF1bHRUb2tlbjogXCJzdHJpbmdcIn1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgcmVnZXg6IFwiW3t9XVwiLCBvbk1hdGNoOiBmdW5jdGlvbih2YWwsIHN0YXRlLCBzdGFjaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0ID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWwgPT0gXCJ7XCIgJiYgc3RhY2subGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhY2sudW5zaGlmdChcInN0YXJ0XCIsIHN0YXRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJwYXJlblwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbCA9PSBcIn1cIiAmJiBzdGFjay5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFjay5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dCA9IHN0YWNrLnNoaWZ0KCkgfHwgXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5uZXh0LmluZGV4T2YoXCJzdHJpbmdcIikgIT0gLTEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcInBhcmVuLnN0cmluZ1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwicGFyZW5cIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZy5yZWdleFwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleCA6IFwiLy8vXCIsXG4gICAgICAgICAgICAgICAgICAgIG5leHQgOiBcImhlcmVnZXhcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZy5yZWdleFwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleCA6IC8oPzpcXC8oPyFbXFxzPV0pW15bXFwvXFxuXFxcXF0qKD86KD86XFxcXFtcXHNcXFNdfFxcW1teXFxdXFxuXFxcXF0qKD86XFxcXFtcXHNcXFNdW15cXF1cXG5cXFxcXSopKl0pW15bXFwvXFxuXFxcXF0qKSpcXC8pKD86W2ltZ3ldezAsNH0pKD8hXFx3KS9cbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIjIyMoPyEjKVwiLFxuICAgICAgICAgICAgICAgICAgICBuZXh0IDogXCJjb21tZW50XCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIjLipcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBbXCJwdW5jdHVhdGlvbi5vcGVyYXRvclwiLCBcInRleHRcIiwgXCJpZGVudGlmaWVyXCJdLFxuICAgICAgICAgICAgICAgICAgICByZWdleCA6IFwiKFxcXFwuKShcXFxccyopKFwiICsgaWxsZWdhbCArIFwiKVwiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IFwicHVuY3R1YXRpb24ub3BlcmF0b3JcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwuezEsM31cIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgLy9jbGFzcyBBIGV4dGVuZHMgQlxuICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IFtcImtleXdvcmRcIiwgXCJ0ZXh0XCIsIFwibGFuZ3VhZ2Uuc3VwcG9ydC5jbGFzc1wiLFxuICAgICAgICAgICAgICAgICAgICAgXCJ0ZXh0XCIsIFwia2V5d29yZFwiLCBcInRleHRcIiwgXCJsYW5ndWFnZS5zdXBwb3J0LmNsYXNzXCJdLFxuICAgICAgICAgICAgICAgICAgICByZWdleCA6IFwiKGNsYXNzKShcXFxccyspKFwiICsgaWRlbnRpZmllciArIFwiKSg/OihcXFxccyspKGV4dGVuZHMpKFxcXFxzKykoXCIgKyBpZGVudGlmaWVyICsgXCIpKT9cIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgLy9wbGF5ID0gKC4uLikgLT5cbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBbXCJlbnRpdHkubmFtZS5mdW5jdGlvblwiLCBcInRleHRcIiwgXCJrZXl3b3JkLm9wZXJhdG9yXCIsIFwidGV4dFwiXS5jb25jYXQoZnVuY3Rpb25SdWxlLnRva2VuKSxcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggOiBcIihcIiArIGlkZW50aWZpZXIgKyBcIikoXFxcXHMqKShbPTpdKShcXFxccyopXCIgKyBmdW5jdGlvblJ1bGUucmVnZXhcbiAgICAgICAgICAgICAgICB9LCBcbiAgICAgICAgICAgICAgICBmdW5jdGlvblJ1bGUsIFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcInZhcmlhYmxlXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJAKD86XCIgKyBpZGVudGlmaWVyICsgXCIpP1wiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbjoga2V5d29yZE1hcHBlcixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggOiBpZGVudGlmaWVyXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IFwicHVuY3R1YXRpb24ub3BlcmF0b3JcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwsfFxcXFwuXCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdG9yYWdlLnR5cGVcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggOiBcIltcXFxcLT1dPlwiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IFwia2V5d29yZC5vcGVyYXRvclwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleCA6IFwiKD86Wy0rKi8lPD4mfF4hPz1dPXw+Pj49P3xcXFxcLVxcXFwtfFxcXFwrXFxcXCt8Ojp8JiY9fFxcXFx8XFxcXHw9fDw8PXw+Pj18XFxcXD9cXFxcLnxcXFxcLnsyLDN9fFshKistPT48XSlcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcInBhcmVuLmxwYXJlblwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleCA6IFwiWyh7W11cIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcInBhcmVuLnJwYXJlblwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleCA6IFwiW1xcXFxdfSldXCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxccytcIlxuICAgICAgICAgICAgICAgIH1dLFxuXG5cbiAgICAgICAgICAgIGhlcmVnZXggOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmcucmVnZXhcIixcbiAgICAgICAgICAgICAgICByZWdleCA6ICcuKj8vLy9baW1neV17MCw0fScsXG4gICAgICAgICAgICAgICAgbmV4dCA6IFwic3RhcnRcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50LnJlZ2V4XCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFxzKyg/OiMuKik/XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nLnJlZ2V4XCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFxTK1wiXG4gICAgICAgICAgICB9XSxcblxuICAgICAgICAgICAgY29tbWVudCA6IFt7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6ICcjIyMnLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcInN0YXJ0XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW4gOiBcImNvbW1lbnRcIlxuICAgICAgICAgICAgfV1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5ub3JtYWxpemVSdWxlcygpO1xuICAgIH1cblxuICAgIGV4cG9ydHMuQ29mZmVlSGlnaGxpZ2h0UnVsZXMgPSBDb2ZmZWVIaWdobGlnaHRSdWxlcztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uLy4uL2xpYi9vb3BcIik7XG52YXIgQmFzZUZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZF9tb2RlXCIpLkZvbGRNb2RlO1xudmFyIFJhbmdlID0gcmVxdWlyZShcIi4uLy4uL3JhbmdlXCIpLlJhbmdlO1xuXG52YXIgRm9sZE1vZGUgPSBleHBvcnRzLkZvbGRNb2RlID0gZnVuY3Rpb24oKSB7fTtcbm9vcC5pbmhlcml0cyhGb2xkTW9kZSwgQmFzZUZvbGRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuY29tbWVudEJsb2NrID0gZnVuY3Rpb24oc2Vzc2lvbiwgcm93KSB7XG4gICAgICAgIHZhciByZSA9IC9cXFMvO1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICB2YXIgc3RhcnRMZXZlbCA9IGxpbmUuc2VhcmNoKHJlKTtcbiAgICAgICAgaWYgKHN0YXJ0TGV2ZWwgPT0gLTEgfHwgbGluZVtzdGFydExldmVsXSAhPSBcIiNcIilcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB2YXIgc3RhcnRDb2x1bW4gPSBsaW5lLmxlbmd0aDtcbiAgICAgICAgdmFyIG1heFJvdyA9IHNlc3Npb24uZ2V0TGVuZ3RoKCk7XG4gICAgICAgIHZhciBzdGFydFJvdyA9IHJvdztcbiAgICAgICAgdmFyIGVuZFJvdyA9IHJvdztcblxuICAgICAgICB3aGlsZSAoKytyb3cgPCBtYXhSb3cpIHtcbiAgICAgICAgICAgIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgICAgIHZhciBsZXZlbCA9IGxpbmUuc2VhcmNoKHJlKTtcblxuICAgICAgICAgICAgaWYgKGxldmVsID09IC0xKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICBpZiAobGluZVtsZXZlbF0gIT0gXCIjXCIpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGVuZFJvdyA9IHJvdztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbmRSb3cgPiBzdGFydFJvdykge1xuICAgICAgICAgICAgdmFyIGVuZENvbHVtbiA9IHNlc3Npb24uZ2V0TGluZShlbmRSb3cpLmxlbmd0aDtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmFuZ2Uoc3RhcnRSb3csIHN0YXJ0Q29sdW1uLCBlbmRSb3csIGVuZENvbHVtbik7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0UmFuZ2UgPSBmdW5jdGlvbihzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdykge1xuICAgICAgICB2YXIgcmFuZ2UgPSB0aGlzLmluZGVudGF0aW9uQmxvY2soc2Vzc2lvbiwgcm93KTtcbiAgICAgICAgaWYgKHJhbmdlKVxuICAgICAgICAgICAgcmV0dXJuIHJhbmdlO1xuXG4gICAgICAgIHJhbmdlID0gdGhpcy5jb21tZW50QmxvY2soc2Vzc2lvbiwgcm93KTtcbiAgICAgICAgaWYgKHJhbmdlKVxuICAgICAgICAgICAgcmV0dXJuIHJhbmdlO1xuICAgIH07XG5cbiAgICAvLyBtdXN0IHJldHVybiBcIlwiIGlmIHRoZXJlJ3Mgbm8gZm9sZCwgdG8gZW5hYmxlIGNhY2hpbmdcbiAgICB0aGlzLmdldEZvbGRXaWRnZXQgPSBmdW5jdGlvbihzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdykge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICB2YXIgaW5kZW50ID0gbGluZS5zZWFyY2goL1xcUy8pO1xuICAgICAgICB2YXIgbmV4dCA9IHNlc3Npb24uZ2V0TGluZShyb3cgKyAxKTtcbiAgICAgICAgdmFyIHByZXYgPSBzZXNzaW9uLmdldExpbmUocm93IC0gMSk7XG4gICAgICAgIHZhciBwcmV2SW5kZW50ID0gcHJldi5zZWFyY2goL1xcUy8pO1xuICAgICAgICB2YXIgbmV4dEluZGVudCA9IG5leHQuc2VhcmNoKC9cXFMvKTtcblxuICAgICAgICBpZiAoaW5kZW50ID09IC0xKSB7XG4gICAgICAgICAgICBzZXNzaW9uLmZvbGRXaWRnZXRzW3JvdyAtIDFdID0gcHJldkluZGVudCE9IC0xICYmIHByZXZJbmRlbnQgPCBuZXh0SW5kZW50ID8gXCJzdGFydFwiIDogXCJcIjtcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZG9jdW1lbnRhdGlvbiBjb21tZW50c1xuICAgICAgICBpZiAocHJldkluZGVudCA9PSAtMSkge1xuICAgICAgICAgICAgaWYgKGluZGVudCA9PSBuZXh0SW5kZW50ICYmIGxpbmVbaW5kZW50XSA9PSBcIiNcIiAmJiBuZXh0W2luZGVudF0gPT0gXCIjXCIpIHtcbiAgICAgICAgICAgICAgICBzZXNzaW9uLmZvbGRXaWRnZXRzW3JvdyAtIDFdID0gXCJcIjtcbiAgICAgICAgICAgICAgICBzZXNzaW9uLmZvbGRXaWRnZXRzW3JvdyArIDFdID0gXCJcIjtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJzdGFydFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHByZXZJbmRlbnQgPT0gaW5kZW50ICYmIGxpbmVbaW5kZW50XSA9PSBcIiNcIiAmJiBwcmV2W2luZGVudF0gPT0gXCIjXCIpIHtcbiAgICAgICAgICAgIGlmIChzZXNzaW9uLmdldExpbmUocm93IC0gMikuc2VhcmNoKC9cXFMvKSA9PSAtMSkge1xuICAgICAgICAgICAgICAgIHNlc3Npb24uZm9sZFdpZGdldHNbcm93IC0gMV0gPSBcInN0YXJ0XCI7XG4gICAgICAgICAgICAgICAgc2Vzc2lvbi5mb2xkV2lkZ2V0c1tyb3cgKyAxXSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJldkluZGVudCE9IC0xICYmIHByZXZJbmRlbnQgPCBpbmRlbnQpXG4gICAgICAgICAgICBzZXNzaW9uLmZvbGRXaWRnZXRzW3JvdyAtIDFdID0gXCJzdGFydFwiO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBzZXNzaW9uLmZvbGRXaWRnZXRzW3JvdyAtIDFdID0gXCJcIjtcblxuICAgICAgICBpZiAoaW5kZW50IDwgbmV4dEluZGVudClcbiAgICAgICAgICAgIHJldHVybiBcInN0YXJ0XCI7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgIH07XG5cbn0pLmNhbGwoRm9sZE1vZGUucHJvdG90eXBlKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dE1vZGUgPSByZXF1aXJlKFwiLi90ZXh0XCIpLk1vZGU7XG52YXIgSmFkZUhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vamFkZV9oaWdobGlnaHRfcnVsZXNcIikuSmFkZUhpZ2hsaWdodFJ1bGVzO1xudmFyIEZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZGluZy9jb2ZmZWVcIikuRm9sZE1vZGU7XG5cbnZhciBNb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5IaWdobGlnaHRSdWxlcyA9IEphZGVIaWdobGlnaHRSdWxlcztcbiAgICB0aGlzLmZvbGRpbmdSdWxlcyA9IG5ldyBGb2xkTW9kZSgpO1xuICAgIHRoaXMuJGJlaGF2aW91ciA9IHRoaXMuJGRlZmF1bHRCZWhhdmlvdXI7XG59O1xub29wLmluaGVyaXRzKE1vZGUsIFRleHRNb2RlKTtcblxuKGZ1bmN0aW9uKCkgeyBcblx0dGhpcy5saW5lQ29tbWVudFN0YXJ0ID0gXCIvL1wiO1xuICAgIHRoaXMuJGlkID0gXCJhY2UvbW9kZS9qYWRlXCI7XG59KS5jYWxsKE1vZGUucHJvdG90eXBlKTtcblxuZXhwb3J0cy5Nb2RlID0gTW9kZTtcbiIsIi8qXG4gIFRISVMgRklMRSBXQVMgQVVUT0dFTkVSQVRFRCBCWSBtb2RlX2hpZ2hsaWdodF9ydWxlcy50bXBsLmpzIChVVUlEOiBDNUI3M0I5OC01RjJBLTQyRTMtOUYwRS0wMjhBNzRBOUZFNEIpXG4qL1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcbnZhciBNYXJrZG93bkhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vbWFya2Rvd25faGlnaGxpZ2h0X3J1bGVzXCIpLk1hcmtkb3duSGlnaGxpZ2h0UnVsZXM7XG52YXIgU2Fzc0hpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vc2Nzc19oaWdobGlnaHRfcnVsZXNcIikuU2Nzc0hpZ2hsaWdodFJ1bGVzO1xudmFyIExlc3NIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL2xlc3NfaGlnaGxpZ2h0X3J1bGVzXCIpLkxlc3NIaWdobGlnaHRSdWxlcztcbnZhciBDb2ZmZWVIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL2NvZmZlZV9oaWdobGlnaHRfcnVsZXNcIikuQ29mZmVlSGlnaGxpZ2h0UnVsZXM7XG52YXIgSmF2YVNjcmlwdEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vamF2YXNjcmlwdF9oaWdobGlnaHRfcnVsZXNcIikuSmF2YVNjcmlwdEhpZ2hsaWdodFJ1bGVzO1xuXG5mdW5jdGlvbiBtaXhpbl9lbWJlZCh0YWcsIHByZWZpeCkge1xuICAgIHJldHVybiB7IFxuICAgICAgICB0b2tlbiA6IFwiZW50aXR5Lm5hbWUuZnVuY3Rpb24uamFkZVwiLFxuICAgICAgICByZWdleCA6IFwiXlxcXFxzKlxcXFw6XCIgKyB0YWcsXG4gICAgICAgIG5leHQgIDogcHJlZml4ICsgXCJzdGFydFwiXG4gICAgfTtcbn1cblxudmFyIEphZGVIaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIGVzY2FwZWRSZSA9IFwiXFxcXFxcXFwoPzp4WzAtOWEtZkEtRl17Mn18XCIgKyAvLyBoZXhcbiAgICAgICAgXCJ1WzAtOWEtZkEtRl17NH18XCIgKyAvLyB1bmljb2RlXG4gICAgICAgIFwiWzAtMl1bMC03XXswLDJ9fFwiICsgLy8gb2N0XG4gICAgICAgIFwiM1swLTZdWzAtN10/fFwiICsgLy8gb2N0XG4gICAgICAgIFwiMzdbMC03XT98XCIgKyAvLyBvY3RcbiAgICAgICAgXCJbNC03XVswLTddP3xcIiArIC8vb2N0XG4gICAgICAgIFwiLilcIjtcblxuICAgIC8vIHJlZ2V4cCBtdXN0IG5vdCBoYXZlIGNhcHR1cmluZyBwYXJlbnRoZXNlcy4gVXNlICg/OikgaW5zdGVhZC5cbiAgICAvLyByZWdleHBzIGFyZSBvcmRlcmVkIC0+IHRoZSBmaXJzdCBtYXRjaCBpcyB1c2VkXG5cbiAgICB0aGlzLiRydWxlcyA9IFxuICAgICAgICB7XG4gICAgXCJzdGFydFwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuOiBcImtleXdvcmQuY29udHJvbC5pbXBvcnQuaW5jbHVkZS5qYWRlXCIsXG4gICAgICAgICAgICByZWdleDogXCJcXFxccypcXFxcYmluY2x1ZGVcXFxcYlwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuOiBcImtleXdvcmQub3RoZXIuZG9jdHlwZS5qYWRlXCIsXG4gICAgICAgICAgICByZWdleDogXCJeISEhXFxcXHMqKD86W2EtekEtWjAtOS1fXSspP1wiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIG9uTWF0Y2g6IGZ1bmN0aW9uKHZhbHVlLCBjdXJyZW50U3RhdGUsIHN0YWNrKSB7XG4gICAgICAgICAgICAgICAgc3RhY2sudW5zaGlmdCh0aGlzLm5leHQsIHZhbHVlLmxlbmd0aCAtIDIsIGN1cnJlbnRTdGF0ZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiY29tbWVudFwiO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlZ2V4OiAvXlxccypcXC9cXC8vLFxuICAgICAgICAgICAgbmV4dDogXCJjb21tZW50X2Jsb2NrXCJcbiAgICAgICAgfSxcbiAgICAgICAgbWl4aW5fZW1iZWQoXCJtYXJrZG93blwiLCBcIm1hcmtkb3duLVwiKSxcbiAgICAgICAgbWl4aW5fZW1iZWQoXCJzYXNzXCIsIFwic2Fzcy1cIiksXG4gICAgICAgIG1peGluX2VtYmVkKFwibGVzc1wiLCBcImxlc3MtXCIpLFxuICAgICAgICBtaXhpbl9lbWJlZChcImNvZmZlZVwiLCBcImNvZmZlZS1cIiksXG4gICAgICAgIC8qXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuOiB7XG4gICAgICAgICAgICAgICAgXCIyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiZW50aXR5Lm5hbWUuZnVuY3Rpb24uamFkZVwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlZ2V4OiBcIl4oXFxcXHMqKShcXFxcOmNkYXRhKVwiLFxuICAgICAgICAgICAgbmV4dDogXCJzdGF0ZV85XCJcbiAgICAgICAgfSwqL1xuICAgICAgICAvLyBtYXRjaCBzdHVmZiBsaWtlOiBtaXhpbiBkaWFsb2ctdGl0bGUtZGVzYyh0aXRsZSwgZGVzYylcbiAgICAgICAge1xuICAgICAgICAgICAgdG9rZW46IFsgXCJzdG9yYWdlLnR5cGUuZnVuY3Rpb24uamFkZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICBcImVudGl0eS5uYW1lLmZ1bmN0aW9uLmphZGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnBhcmFtZXRlcnMuYmVnaW4uamFkZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICBcInZhcmlhYmxlLnBhcmFtZXRlci5mdW5jdGlvbi5qYWRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgIFwicHVuY3R1YXRpb24uZGVmaW5pdGlvbi5wYXJhbWV0ZXJzLmVuZC5qYWRlXCJcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHJlZ2V4OiBcIl4oXFxcXHMqbWl4aW4pKCBbXFxcXHdcXFxcLV0rKShcXFxccypcXFxcKCkoLio/KShcXFxcKSlcIlxuICAgICAgICB9LFxuICAgICAgICAvLyBtYXRjaCBzdHVmZiBsaWtlOiBtaXhpbiBkaWFsb2ctdGl0bGUtZGVzY1xuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbjogWyBcInN0b3JhZ2UudHlwZS5mdW5jdGlvbi5qYWRlXCIsIFwiZW50aXR5Lm5hbWUuZnVuY3Rpb24uamFkZVwiXSxcbiAgICAgICAgICAgIHJlZ2V4OiBcIl4oXFxcXHMqbWl4aW4pKCBbXFxcXHdcXFxcLV0rKVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuOiBcInNvdXJjZS5qcy5lbWJlZGRlZC5qYWRlXCIsXG4gICAgICAgICAgICByZWdleDogXCJeXFxcXHMqKD86LXw9fCE9KVwiLFxuICAgICAgICAgICAgbmV4dDogXCJqcy1zdGFydFwiXG4gICAgICAgIH0sXG4gICAgICAgIC8qe1xuICAgICAgICAgICAgdG9rZW46IFwiZW50aXR5Lm5hbWUudGFnLnNjcmlwdC5qYWRlXCIsXG4gICAgICAgICAgICByZWdleDogXCJeXFxcXHMqc2NyaXB0XCIsXG4gICAgICAgICAgICBuZXh0OiBcImpzX2NvZGVfdGFnXCJcbiAgICAgICAgfSwqL1xuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbjogXCJzdHJpbmcuaW50ZXJwb2xhdGVkLmphZGVcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIlsjIV1cXFxce1teXFxcXH1dK1xcXFx9XCJcbiAgICAgICAgfSxcbiAgICAgICAgLy8gTWF0Y2ggYW55IHRhZywgaWQgb3IgY2xhc3MuIHNraXAgQVNUIGZpbHRlcnNcbiAgICAgICAge1xuICAgICAgICAgICAgdG9rZW46IFwibWV0YS50YWcuYW55LmphZGVcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXlxccyooPyFcXHcrOikoPzpbXFx3LV0rfCg/PVxcLnwjKV0pLyxcbiAgICAgICAgICAgIG5leHQ6IFwidGFnX3NpbmdsZVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuOiBcInN1cG9ydC50eXBlLmF0dHJpYnV0ZS5pZC5qYWRlXCIsXG4gICAgICAgICAgICByZWdleDogXCIjXFxcXHcrXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdG9rZW46IFwic3Vwb3J0LnR5cGUuYXR0cmlidXRlLmNsYXNzLmphZGVcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFwuXFxcXHcrXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdG9rZW46IFwicHVuY3R1YXRpb25cIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFxzKig/OlxcXFwoKVwiLFxuICAgICAgICAgICAgbmV4dDogXCJ0YWdfYXR0cmlidXRlc1wiXG4gICAgICAgIH1cbiAgICBdLFxuICAgIFwiY29tbWVudF9ibG9ja1wiOiBbXG4gICAgICAgIHtyZWdleDogL15cXHMqKD86XFwvXFwvKT8vLCBvbk1hdGNoOiBmdW5jdGlvbih2YWx1ZSwgY3VycmVudFN0YXRlLCBzdGFjaykge1xuICAgICAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCA8PSBzdGFja1sxXSkge1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5zbGljZSgtMSkgPT0gXCIvXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhY2tbMV0gPSB2YWx1ZS5sZW5ndGggLSAyO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHQgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJjb21tZW50XCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN0YWNrLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgc3RhY2suc2hpZnQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLm5leHQgPSBzdGFjay5zaGlmdCgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBcInRleHRcIjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5uZXh0ID0gXCJcIjtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJjb21tZW50XCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIG5leHQ6IFwic3RhcnRcIn0sXG4gICAgICAgIHtkZWZhdWx0VG9rZW46IFwiY29tbWVudFwifVxuICAgIF0sXG4gICAgLypcbiAgICBcbiAgICBcInN0YXRlXzlcIjogW1xuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbjogXCJUT0RPXCIsXG4gICAgICAgICAgICByZWdleDogXCJeKD8hXFxcXDFcXFxccyspXCIsXG4gICAgICAgICAgICBuZXh0OiBcInN0YXJ0XCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdG9rZW46IFwiVE9ET1wiLFxuICAgICAgICAgICAgcmVnZXg6IFwiLitcIixcbiAgICAgICAgICAgIG5leHQ6IFwic3RhdGVfOVwiXG4gICAgICAgIH1cbiAgICBdLCovXG4gICAgLypcImpzX2NvZGVcIjogW1xuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbjogXCJrZXl3b3JkLmNvbnRyb2wuanNcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFxiZWFjaFxcXFxiXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdG9rZW46IFwidGV4dFwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiJFwiLFxuICAgICAgICAgICAgbmV4dDogXCJzdGFydFwiXG4gICAgICAgIH1cbiAgICBdLCovXG4gICAgLypcImpzX2NvZGVfdGFnXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgXCJpbmNsdWRlXCI6IFwic291cmNlLmpzXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdG9rZW46IFwiVE9ET1wiLFxuICAgICAgICAgICAgcmVnZXg6IFwiXigoPz0oXFxcXDEpKFtcXFxcdyNcXFxcLl18JFxcXFxuPykpfF4kXFxcXG4/KVwiLFxuICAgICAgICAgICAgbmV4dDogXCJzdGFydFwiXG4gICAgICAgIH1cbiAgICBdLCovXG4gICAgXCJ0YWdfc2luZ2xlXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgdG9rZW46IFwiZW50aXR5Lm90aGVyLmF0dHJpYnV0ZS1uYW1lLmNsYXNzLmphZGVcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFwuW1xcXFx3LV0rXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdG9rZW46IFwiZW50aXR5Lm90aGVyLmF0dHJpYnV0ZS1uYW1lLmlkLmphZGVcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIiNbXFxcXHctXStcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbjogW1widGV4dFwiLCBcInB1bmN0dWF0aW9uXCJdLFxuICAgICAgICAgICAgcmVnZXg6IFwiKCQpfCgoPyFcXFxcLnwjfD18LSkpXCIsXG4gICAgICAgICAgICBuZXh0OiBcInN0YXJ0XCJcbiAgICAgICAgfVxuICAgIF0sXG4gICAgXCJ0YWdfYXR0cmlidXRlc1wiOiBbIFxuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiJyg/PS4pXCIsXG4gICAgICAgICAgICBuZXh0ICA6IFwicXN0cmluZ1wiXG4gICAgICAgIH0sIFxuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICByZWdleCA6ICdcIig/PS4pJyxcbiAgICAgICAgICAgIG5leHQgIDogXCJxcXN0cmluZ1wiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuOiBbXCJlbnRpdHkub3RoZXIuYXR0cmlidXRlLW5hbWUuamFkZVwiLCBcInB1bmN0dWF0aW9uXCJdLFxuICAgICAgICAgICAgcmVnZXg6IFwiKFthLXpBLVo6XFxcXC4tXSspKD0pP1wiLFxuICAgICAgICAgICAgbmV4dDogXCJhdHRyaWJ1dGVfc3RyaW5nc1wiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuOiBcInB1bmN0dWF0aW9uXCIsXG4gICAgICAgICAgICByZWdleDogXCJcXFxcKVwiLFxuICAgICAgICAgICAgbmV4dDogXCJzdGFydFwiXG4gICAgICAgIH1cbiAgICBdLFxuICAgIFwiYXR0cmlidXRlX3N0cmluZ3NcIjogW1xuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiJyg/PS4pXCIsXG4gICAgICAgICAgICBuZXh0ICA6IFwicXN0cmluZ1wiXG4gICAgICAgIH0sIFxuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICByZWdleCA6ICdcIig/PS4pJyxcbiAgICAgICAgICAgIG5leHQgIDogXCJxcXN0cmluZ1wiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIHJlZ2V4IDogJyg/PVxcXFxTKScsXG4gICAgICAgICAgICBuZXh0ICA6IFwidGFnX2F0dHJpYnV0ZXNcIlxuICAgICAgICB9XG4gICAgXSxcbiAgICBcInFxc3RyaW5nXCIgOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIixcbiAgICAgICAgICAgIHJlZ2V4IDogZXNjYXBlZFJlXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIHJlZ2V4IDogJ1teXCJcXFxcXFxcXF0rJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiXFxcXFxcXFwkXCIsXG4gICAgICAgICAgICBuZXh0ICA6IFwicXFzdHJpbmdcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICByZWdleCA6ICdcInwkJyxcbiAgICAgICAgICAgIG5leHQgIDogXCJ0YWdfYXR0cmlidXRlc1wiXG4gICAgICAgIH1cbiAgICBdLFxuICAgIFwicXN0cmluZ1wiIDogW1xuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCIsXG4gICAgICAgICAgICByZWdleCA6IGVzY2FwZWRSZVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiW14nXFxcXFxcXFxdK1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcXFxcXCRcIixcbiAgICAgICAgICAgIG5leHQgIDogXCJxc3RyaW5nXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgcmVnZXggOiBcIid8JFwiLFxuICAgICAgICAgICAgbmV4dCAgOiBcInRhZ19hdHRyaWJ1dGVzXCJcbiAgICAgICAgfVxuICAgIF1cbn07XG5cbiAgICB0aGlzLmVtYmVkUnVsZXMoSmF2YVNjcmlwdEhpZ2hsaWdodFJ1bGVzLCBcImpzLVwiLCBbe1xuICAgICAgICB0b2tlbjogXCJ0ZXh0XCIsXG4gICAgICAgIHJlZ2V4OiBcIi4kXCIsXG4gICAgICAgIG5leHQ6IFwic3RhcnRcIlxuICAgIH1dKTtcbi8qXG4gICAgdGhpcy5lbWJlZFJ1bGVzKE1hcmtkb3duSGlnaGxpZ2h0UnVsZXMsIFwibWFya2Rvd24tXCIsIFt7XG4gICAgICAgdG9rZW4gOiBcInN1cHBvcnQuZnVuY3Rpb25cIixcbiAgICAgICByZWdleCA6IFwiXlxcXFwxXFxcXHMrXCIsXG4gICAgICAgY2FwdHVyZXM6IFwiMVwiLFxuICAgICAgIG5leHQgIDogXCJzdGFydFwiXG4gICAgfV0pO1xuXG4gICAgdGhpcy5lbWJlZFJ1bGVzKFNhc3NIaWdobGlnaHRSdWxlcywgXCJzYXNzLVwiLCBbe1xuICAgICAgIHRva2VuIDogXCJzdXBwb3J0LmZ1bmN0aW9uXCIsXG4gICAgICAgcmVnZXggOiBcIl4oPyFcXFxcMVxcXFxzKylcIixcbiAgICAgICBjYXB0dXJlczogXCIxXCIsXG4gICAgICAgbmV4dCAgOiBcInN0YXJ0XCJcbiAgICB9XSk7XG5cbiAgICB0aGlzLmVtYmVkUnVsZXMoTGVzc0hpZ2hsaWdodFJ1bGVzLCBcImxlc3MtXCIsIFt7XG4gICAgICAgdG9rZW4gOiBcInN1cHBvcnQuZnVuY3Rpb25cIixcbiAgICAgICByZWdleCA6IFwiXig/IVxcXFwxXFxcXHMrKVwiLFxuICAgICAgIGNhcHR1cmVzOiBcIjFcIixcbiAgICAgICBuZXh0ICA6IFwic3RhcnRcIlxuICAgIH1dKTtcblxuICAgIHRoaXMuZW1iZWRSdWxlcyhDb2ZmZWVIaWdobGlnaHRSdWxlcywgXCJjb2ZmZWUtXCIsIFt7XG4gICAgICAgdG9rZW4gOiBcInN1cHBvcnQuZnVuY3Rpb25cIixcbiAgICAgICByZWdleCA6IFwiXig/IVxcXFwxXFxcXHMrKVwiLFxuICAgICAgIGNhcHR1cmVzOiBcIjFcIixcbiAgICAgICBuZXh0ICA6IFwic3RhcnRcIlxuICAgIH1dKTtcblxuICAgIHRoaXMuZW1iZWRSdWxlcyhKYXZhU2NyaXB0SGlnaGxpZ2h0UnVsZXMsIFwianMtXCIsIFt7XG4gICAgICAgdG9rZW4gOiBcInN1cHBvcnQuZnVuY3Rpb25cIixcbiAgICAgICByZWdleCA6IFwiJFwiLFxuICAgICAgIGNhcHR1cmVzOiBcIjFcIixcbiAgICAgICBuZXh0ICA6IFwic3RhcnRcIlxuICAgIH1dKTsgKi9cbn07XG5cbm9vcC5pbmhlcml0cyhKYWRlSGlnaGxpZ2h0UnVsZXMsIFRleHRIaWdobGlnaHRSdWxlcyk7XG5cbmV4cG9ydHMuSmFkZUhpZ2hsaWdodFJ1bGVzID0gSmFkZUhpZ2hsaWdodFJ1bGVzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90ZXh0X2hpZ2hsaWdodF9ydWxlc1wiKS5UZXh0SGlnaGxpZ2h0UnVsZXM7XG52YXIgQ3NzSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKCcuL2Nzc19oaWdobGlnaHRfcnVsZXMnKTtcblxudmFyIExlc3NIaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uKCkge1xuXG5cbiAgICB2YXIga2V5d29yZExpc3QgPSBcIkBpbXBvcnR8QG1lZGlhfEBmb250LWZhY2V8QGtleWZyYW1lc3xALXdlYmtpdC1rZXlmcmFtZXN8QHN1cHBvcnRzfFwiICsgXG4gICAgICAgIFwiQGNoYXJzZXR8QHBsdWdpbnxAbmFtZXNwYWNlfEBkb2N1bWVudHxAcGFnZXxAdmlld3BvcnR8QC1tcy12aWV3cG9ydHxcIiArXG4gICAgICAgIFwib3J8YW5kfHdoZW58bm90XCI7XG5cbiAgICB2YXIga2V5d29yZHMgPSBrZXl3b3JkTGlzdC5zcGxpdCgnfCcpO1xuXG4gICAgdmFyIHByb3BlcnRpZXMgPSBDc3NIaWdobGlnaHRSdWxlcy5zdXBwb3J0VHlwZS5zcGxpdCgnfCcpO1xuXG4gICAgdmFyIGtleXdvcmRNYXBwZXIgPSB0aGlzLmNyZWF0ZUtleXdvcmRNYXBwZXIoe1xuICAgICAgICBcInN1cHBvcnQuY29uc3RhbnRcIjogQ3NzSGlnaGxpZ2h0UnVsZXMuc3VwcG9ydENvbnN0YW50LFxuICAgICAgICBcImtleXdvcmRcIjoga2V5d29yZExpc3QsXG4gICAgICAgIFwic3VwcG9ydC5jb25zdGFudC5jb2xvclwiOiBDc3NIaWdobGlnaHRSdWxlcy5zdXBwb3J0Q29uc3RhbnRDb2xvcixcbiAgICAgICAgXCJzdXBwb3J0LmNvbnN0YW50LmZvbnRzXCI6IENzc0hpZ2hsaWdodFJ1bGVzLnN1cHBvcnRDb25zdGFudEZvbnRzXG4gICAgfSwgXCJpZGVudGlmaWVyXCIsIHRydWUpOyAgIFxuXG4gICAgLy8gcmVnZXhwIG11c3Qgbm90IGhhdmUgY2FwdHVyaW5nIHBhcmVudGhlc2VzLiBVc2UgKD86KSBpbnN0ZWFkLlxuICAgIC8vIHJlZ2V4cHMgYXJlIG9yZGVyZWQgLT4gdGhlIGZpcnN0IG1hdGNoIGlzIHVzZWRcblxuICAgIHZhciBudW1SZSA9IFwiXFxcXC0/KD86KD86WzAtOV0rKXwoPzpbMC05XSpcXFxcLlswLTldKykpXCI7XG5cbiAgICAvLyByZWdleHAgbXVzdCBub3QgaGF2ZSBjYXB0dXJpbmcgcGFyZW50aGVzZXMuIFVzZSAoPzopIGluc3RlYWQuXG4gICAgLy8gcmVnZXhwcyBhcmUgb3JkZXJlZCAtPiB0aGUgZmlyc3QgbWF0Y2ggaXMgdXNlZFxuXG4gICAgdGhpcy4kcnVsZXMgPSB7XG4gICAgICAgIFwic3RhcnRcIiA6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcL1xcXFwvLiokXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIiwgLy8gbXVsdGkgbGluZSBjb21tZW50XG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwvXFxcXCpcIixcbiAgICAgICAgICAgICAgICBuZXh0IDogXCJjb21tZW50XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsIC8vIHNpbmdsZSBsaW5lXG4gICAgICAgICAgICAgICAgcmVnZXggOiAnW1wiXSg/Oig/OlxcXFxcXFxcLil8KD86W15cIlxcXFxcXFxcXSkpKj9bXCJdJ1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIiwgLy8gc2luZ2xlIGxpbmVcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiWyddKD86KD86XFxcXFxcXFwuKXwoPzpbXidcXFxcXFxcXF0pKSo/WyddXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFtcImNvbnN0YW50Lm51bWVyaWNcIiwgXCJrZXl3b3JkXCJdLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIoXCIgKyBudW1SZSArIFwiKShjaHxjbXxkZWd8ZW18ZXh8ZnJ8Z2R8Z3JhZHxIenxpbnxrSHp8bW18bXN8cGN8cHR8cHh8cmFkfHJlbXxzfHR1cm58dmh8dm18dnd8JSlcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5udW1lcmljXCIsIC8vIGhleDYgY29sb3JcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiI1thLWYwLTldezZ9XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLCAvLyBoZXgzIGNvbG9yXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIiNbYS1mMC05XXszfVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IG51bVJlXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBbXCJzdXBwb3J0LmZ1bmN0aW9uXCIsIFwicGFyZW4ubHBhcmVuXCIsIFwic3RyaW5nXCIsIFwicGFyZW4ucnBhcmVuXCJdLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIodXJsKShcXFxcKCkoLiopKFxcXFwpKVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBbXCJzdXBwb3J0LmZ1bmN0aW9uXCIsIFwicGFyZW4ubHBhcmVuXCJdLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIoOmV4dGVuZHxbYS16MC05X1xcXFwtXSspKFxcXFwoKVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoa2V5d29yZHMuaW5kZXhPZih2YWx1ZS50b0xvd2VyQ2FzZSgpKSA+IC0xKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwia2V5d29yZFwiO1xuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJ2YXJpYWJsZVwiO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIltAXFxcXCRdW2EtejAtOV9cXFxcLUBcXFxcJF0qXFxcXGJcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJ2YXJpYWJsZVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJbQFxcXFwkXVxcXFx7W2EtejAtOV9cXFxcLUBcXFxcJF0qXFxcXH1cIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogZnVuY3Rpb24oZmlyc3QsIHNlY29uZCkge1xuICAgICAgICAgICAgICAgICAgICBpZihwcm9wZXJ0aWVzLmluZGV4T2YoZmlyc3QudG9Mb3dlckNhc2UoKSkgPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcInN1cHBvcnQudHlwZS5wcm9wZXJ0eVwiLCBcInRleHRcIl07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1wic3VwcG9ydC50eXBlLnVua25vd25Qcm9wZXJ0eVwiLCBcInRleHRcIl07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIoW2EtejAtOS1fXSspKFxcXFxzKjopXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwia2V5d29yZFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCImXCIgICAvLyBzcGVjaWFsIGNhc2UgLSBhbHdheXMgdHJlYXQgYXMga2V5d29yZFxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDoga2V5d29yZE1hcHBlcixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXC0/W0BhLXpfXVtAYS16MC05X1xcXFwtXSpcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInZhcmlhYmxlLmxhbmd1YWdlXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiI1thLXowLTktX10rXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJ2YXJpYWJsZS5sYW5ndWFnZVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFwuW2EtejAtOS1fXStcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInZhcmlhYmxlLmxhbmd1YWdlXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiOlthLXpfXVthLXowLTktX10qXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIlthLXowLTktX10rXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwia2V5d29yZC5vcGVyYXRvclwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCI8fD58PD18Pj18PXwhPXwtfCV8XFxcXCt8XFxcXCpcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJwYXJlbi5scGFyZW5cIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiW1soe11cIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJwYXJlbi5ycGFyZW5cIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiW1xcXFxdKX1dXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxccytcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGNhc2VJbnNlbnNpdGl2ZTogdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBcImNvbW1lbnRcIiA6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudFwiLCAvLyBjbG9zaW5nIGNvbW1lbnRcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXCpcXFxcL1wiLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcInN0YXJ0XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW4gOiBcImNvbW1lbnRcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfTtcbiAgICB0aGlzLm5vcm1hbGl6ZVJ1bGVzKCk7XG59O1xuXG5vb3AuaW5oZXJpdHMoTGVzc0hpZ2hsaWdodFJ1bGVzLCBUZXh0SGlnaGxpZ2h0UnVsZXMpO1xuXG5leHBvcnRzLkxlc3NIaWdobGlnaHRSdWxlcyA9IExlc3NIaWdobGlnaHRSdWxlcztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbW9kZXMgPSByZXF1aXJlKFwiLi4vY29uZmlnXCIpLiRtb2RlcztcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIGxhbmcgPSByZXF1aXJlKFwiLi4vbGliL2xhbmdcIik7XG52YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xudmFyIEh0bWxIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL2h0bWxfaGlnaGxpZ2h0X3J1bGVzXCIpLkh0bWxIaWdobGlnaHRSdWxlcztcblxudmFyIGVzY2FwZWQgPSBmdW5jdGlvbihjaCkge1xuICAgIHJldHVybiBcIig/OlteXCIgKyBsYW5nLmVzY2FwZVJlZ0V4cChjaCkgKyBcIlxcXFxcXFxcXXxcXFxcXFxcXC4pKlwiO1xufTtcblxudmFyIE1hcmtkb3duSGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbigpIHtcbiAgICBIdG1sSGlnaGxpZ2h0UnVsZXMuY2FsbCh0aGlzKTtcbiAgICAvLyByZWdleHAgbXVzdCBub3QgaGF2ZSBjYXB0dXJpbmcgcGFyZW50aGVzZXNcbiAgICAvLyByZWdleHBzIGFyZSBvcmRlcmVkIC0+IHRoZSBmaXJzdCBtYXRjaCBpcyB1c2VkXG4gICAgdmFyIGNvZGVCbG9ja1N0YXJ0UnVsZSA9IHtcbiAgICAgICAgdG9rZW4gOiBcInN1cHBvcnQuZnVuY3Rpb25cIixcbiAgICAgICAgcmVnZXggOiAvXlxccyooYGBgK1teYF0qfH5+fitbXn5dKikkLyxcbiAgICAgICAgb25NYXRjaDogZnVuY3Rpb24odmFsdWUsIHN0YXRlLCBzdGFjaywgbGluZSkge1xuICAgICAgICAgICAgdmFyIG0gPSB2YWx1ZS5tYXRjaCgvXihcXHMqKShbYH5dKykoLiopLyk7XG4gICAgICAgICAgICB2YXIgbGFuZ3VhZ2UgPSAvW1xcdy1dK3wkLy5leGVjKG1bM10pWzBdO1xuICAgICAgICAgICAgLy8gVE9ETyBsYXp5LWxvYWQgbW9kZXNcbiAgICAgICAgICAgIGlmICghbW9kZXNbbGFuZ3VhZ2VdKVxuICAgICAgICAgICAgICAgIGxhbmd1YWdlID0gXCJcIjtcbiAgICAgICAgICAgIHN0YWNrLnVuc2hpZnQoXCJnaXRodWJibG9ja1wiLCBbXSwgW21bMV0sIG1bMl0sIGxhbmd1YWdlXSwgc3RhdGUpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9rZW47XG4gICAgICAgIH0sXG4gICAgICAgIG5leHQgIDogXCJnaXRodWJibG9ja1wiXG4gICAgfTtcbiAgICB2YXIgY29kZUJsb2NrUnVsZXMgPSBbe1xuICAgICAgICB0b2tlbiA6IFwic3VwcG9ydC5mdW5jdGlvblwiLFxuICAgICAgICByZWdleCA6IFwiLipcIixcbiAgICAgICAgb25NYXRjaDogZnVuY3Rpb24odmFsdWUsIHN0YXRlLCBzdGFjaywgbGluZSkge1xuICAgICAgICAgICAgdmFyIGVtYmVkU3RhdGUgPSBzdGFja1sxXTtcbiAgICAgICAgICAgIHZhciBpbmRlbnQgPSBzdGFja1syXVswXTtcbiAgICAgICAgICAgIHZhciBlbmRNYXJrZXIgPSBzdGFja1syXVsxXTtcbiAgICAgICAgICAgIHZhciBsYW5ndWFnZSA9IHN0YWNrWzJdWzJdO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgbSA9IC9eKFxccyopKGArfH4rKVxccyokLy5leGVjKHZhbHVlKTtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBtICYmIG1bMV0ubGVuZ3RoIDwgaW5kZW50Lmxlbmd0aCArIDNcbiAgICAgICAgICAgICAgICAmJiBtWzJdLmxlbmd0aCA+PSBlbmRNYXJrZXIubGVuZ3RoICYmIG1bMl1bMF0gPT0gZW5kTWFya2VyWzBdXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBzdGFjay5zcGxpY2UoMCwgMyk7XG4gICAgICAgICAgICAgICAgdGhpcy5uZXh0ID0gc3RhY2suc2hpZnQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50b2tlbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubmV4dCA9IFwiXCI7XG4gICAgICAgICAgICBpZiAobGFuZ3VhZ2UgJiYgbW9kZXNbbGFuZ3VhZ2VdKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBtb2Rlc1tsYW5ndWFnZV0uZ2V0VG9rZW5pemVyKCkuZ2V0TGluZVRva2Vucyh2YWx1ZSwgZW1iZWRTdGF0ZS5zbGljZSgwKSk7XG4gICAgICAgICAgICAgICAgc3RhY2tbMV0gPSBkYXRhLnN0YXRlO1xuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhLnRva2VucztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRva2VuO1xuICAgICAgICB9XG4gICAgfV07XG5cbiAgICB0aGlzLiRydWxlc1tcInN0YXJ0XCJdLnVuc2hpZnQoe1xuICAgICAgICB0b2tlbiA6IFwiZW1wdHlfbGluZVwiLFxuICAgICAgICByZWdleCA6ICdeJCcsXG4gICAgICAgIG5leHQ6IFwiYWxsb3dCbG9ja1wiXG4gICAgfSwgeyAvLyBoMVxuICAgICAgICB0b2tlbjogXCJtYXJrdXAuaGVhZGluZy4xXCIsXG4gICAgICAgIHJlZ2V4OiBcIl49Kyg/PVxcXFxzKiQpXCJcbiAgICB9LCB7IC8vIGgyXG4gICAgICAgIHRva2VuOiBcIm1hcmt1cC5oZWFkaW5nLjJcIixcbiAgICAgICAgcmVnZXg6IFwiXlxcXFwtKyg/PVxcXFxzKiQpXCJcbiAgICB9LCB7XG4gICAgICAgIHRva2VuIDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiBcIm1hcmt1cC5oZWFkaW5nLlwiICsgdmFsdWUubGVuZ3RoO1xuICAgICAgICB9LFxuICAgICAgICByZWdleCA6IC9eI3sxLDZ9KD89XFxzfCQpLyxcbiAgICAgICAgbmV4dCA6IFwiaGVhZGVyXCJcbiAgICB9LFxuICAgIGNvZGVCbG9ja1N0YXJ0UnVsZSxcbiAgICB7IC8vIGJsb2NrIHF1b3RlXG4gICAgICAgIHRva2VuIDogXCJzdHJpbmcuYmxvY2txdW90ZVwiLFxuICAgICAgICByZWdleCA6IFwiXlxcXFxzKj5cXFxccyooPzpbKistXXxcXFxcZCtcXFxcLik/XFxcXHMrXCIsXG4gICAgICAgIG5leHQgIDogXCJibG9ja3F1b3RlXCJcbiAgICB9LCB7IC8vIEhSICogLSBfXG4gICAgICAgIHRva2VuIDogXCJjb25zdGFudFwiLFxuICAgICAgICByZWdleCA6IFwiXiB7MCwzfSg/Oig/OlxcXFwqID8pezMsfXwoPzpcXFxcLSA/KXszLH18KD86XFxcXF8gPyl7Myx9KVxcXFxzKiRcIixcbiAgICAgICAgbmV4dDogXCJhbGxvd0Jsb2NrXCJcbiAgICB9LCB7IC8vIGxpc3RcbiAgICAgICAgdG9rZW4gOiBcIm1hcmt1cC5saXN0XCIsXG4gICAgICAgIHJlZ2V4IDogXCJeXFxcXHN7MCwzfSg/OlsqKy1dfFxcXFxkK1xcXFwuKVxcXFxzK1wiLFxuICAgICAgICBuZXh0ICA6IFwibGlzdGJsb2NrLXN0YXJ0XCJcbiAgICB9LCB7XG4gICAgICAgIGluY2x1ZGUgOiBcImJhc2ljXCJcbiAgICB9KTtcblxuICAgIHRoaXMuYWRkUnVsZXMoe1xuICAgICAgICBcImJhc2ljXCIgOiBbe1xuICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLFxuICAgICAgICAgICAgcmVnZXggOiAvXFxcXFtcXFxcYCpfe31cXFtcXF0oKSMrXFwtLiFdL1xuICAgICAgICB9LCB7IC8vIGNvZGUgc3BhbiBgXG4gICAgICAgICAgICB0b2tlbiA6IFwic3VwcG9ydC5mdW5jdGlvblwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIihgKykoLio/W15gXSkoXFxcXDEpXCJcbiAgICAgICAgfSwgeyAvLyByZWZlcmVuY2VcbiAgICAgICAgICAgIHRva2VuIDogW1widGV4dFwiLCBcImNvbnN0YW50XCIsIFwidGV4dFwiLCBcInVybFwiLCBcInN0cmluZ1wiLCBcInRleHRcIl0sXG4gICAgICAgICAgICByZWdleCA6IFwiXihbIF17MCwzfVxcXFxbKShbXlxcXFxdXSspKFxcXFxdOlxcXFxzKikoW14gXSspKFxcXFxzKig/OltcXFwiXVteXFxcIl0rW1xcXCJdKT8oXFxcXHMqKSkkXCJcbiAgICAgICAgfSwgeyAvLyBsaW5rIGJ5IHJlZmVyZW5jZVxuICAgICAgICAgICAgdG9rZW4gOiBbXCJ0ZXh0XCIsIFwic3RyaW5nXCIsIFwidGV4dFwiLCBcImNvbnN0YW50XCIsIFwidGV4dFwiXSxcbiAgICAgICAgICAgIHJlZ2V4IDogXCIoXFxcXFspKFwiICsgZXNjYXBlZChcIl1cIikgKyBcIikoXFxcXF1cXFxccypcXFxcWykoXCIrIGVzY2FwZWQoXCJdXCIpICsgXCIpKFxcXFxdKVwiXG4gICAgICAgIH0sIHsgLy8gbGluayBieSB1cmxcbiAgICAgICAgICAgIHRva2VuIDogW1widGV4dFwiLCBcInN0cmluZ1wiLCBcInRleHRcIiwgXCJtYXJrdXAudW5kZXJsaW5lXCIsIFwic3RyaW5nXCIsIFwidGV4dFwiXSxcbiAgICAgICAgICAgIHJlZ2V4IDogXCIoXFxcXCE/XFxcXFspKFwiICsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gW1xuICAgICAgICAgICAgICAgICAgICBlc2NhcGVkKFwiXVwiKSArICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGluayB0ZXh0IG9yIGFsdCB0ZXh0XG4gICAgICAgICAgICAgICAgICAgIFwiKShcXFxcXVxcXFwoKVwiKyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gXShcbiAgICAgICAgICAgICAgICAgICAgJygoPzpbXlxcXFwpXFxcXHNcXFxcXFxcXF18XFxcXFxcXFwufFxcXFxzKD89W15cIl0pKSopJyArICAgICAgICAvLyBocmVmIG9yIGltYWdlXG4gICAgICAgICAgICAgICAgICAgICcoXFxcXHMqXCInICsgIGVzY2FwZWQoJ1wiJykgKyAnXCJcXFxccyopPycgKyAgICAgICAgICAgIC8vIFwidGl0bGVcIlxuICAgICAgICAgICAgICAgICAgICBcIihcXFxcKSlcIiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyApXG4gICAgICAgIH0sIHsgLy8gc3Ryb25nICoqIF9fXG4gICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nLnN0cm9uZ1wiLFxuICAgICAgICAgICAgcmVnZXggOiBcIihbKl17Mn18W19dezJ9KD89XFxcXFMpKSguKj9cXFxcU1sqX10qKShcXFxcMSlcIlxuICAgICAgICB9LCB7IC8vIGVtcGhhc2lzICogX1xuICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZy5lbXBoYXNpc1wiLFxuICAgICAgICAgICAgcmVnZXggOiBcIihbKl18W19dKD89XFxcXFMpKSguKj9cXFxcU1sqX10qKShcXFxcMSlcIlxuICAgICAgICB9LCB7IC8vXG4gICAgICAgICAgICB0b2tlbiA6IFtcInRleHRcIiwgXCJ1cmxcIiwgXCJ0ZXh0XCJdLFxuICAgICAgICAgICAgcmVnZXggOiBcIig8KShcIitcbiAgICAgICAgICAgICAgICAgICAgICBcIig/Omh0dHBzP3xmdHB8ZGljdCk6W14nXFxcIj5cXFxcc10rXCIrXG4gICAgICAgICAgICAgICAgICAgICAgXCJ8XCIrXG4gICAgICAgICAgICAgICAgICAgICAgXCIoPzptYWlsdG86KT9bLS5cXFxcd10rXFxcXEBbLWEtejAtOV0rKD86XFxcXC5bLWEtejAtOV0rKSpcXFxcLlthLXpdK1wiK1xuICAgICAgICAgICAgICAgICAgICBcIikoPilcIlxuICAgICAgICB9XSxcblxuICAgICAgICAvLyBjb2RlIGJsb2NrXG4gICAgICAgIFwiYWxsb3dCbG9ja1wiOiBbXG4gICAgICAgICAgICB7dG9rZW4gOiBcInN1cHBvcnQuZnVuY3Rpb25cIiwgcmVnZXggOiBcIl4gezR9LitcIiwgbmV4dCA6IFwiYWxsb3dCbG9ja1wifSxcbiAgICAgICAgICAgIHt0b2tlbiA6IFwiZW1wdHlfbGluZVwiLCByZWdleCA6ICdeJCcsIG5leHQ6IFwiYWxsb3dCbG9ja1wifSxcbiAgICAgICAgICAgIHt0b2tlbiA6IFwiZW1wdHlcIiwgcmVnZXggOiBcIlwiLCBuZXh0IDogXCJzdGFydFwifVxuICAgICAgICBdLFxuXG4gICAgICAgIFwiaGVhZGVyXCIgOiBbe1xuICAgICAgICAgICAgcmVnZXg6IFwiJFwiLFxuICAgICAgICAgICAgbmV4dCA6IFwic3RhcnRcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpbmNsdWRlOiBcImJhc2ljXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgZGVmYXVsdFRva2VuIDogXCJoZWFkaW5nXCJcbiAgICAgICAgfSBdLFxuXG4gICAgICAgIFwibGlzdGJsb2NrLXN0YXJ0XCIgOiBbe1xuICAgICAgICAgICAgdG9rZW4gOiBcInN1cHBvcnQudmFyaWFibGVcIixcbiAgICAgICAgICAgIHJlZ2V4IDogLyg/OlxcW1sgeF1cXF0pPy8sXG4gICAgICAgICAgICBuZXh0ICA6IFwibGlzdGJsb2NrXCJcbiAgICAgICAgfV0sXG5cbiAgICAgICAgXCJsaXN0YmxvY2tcIiA6IFsgeyAvLyBMaXN0cyBvbmx5IGVzY2FwZSBvbiBjb21wbGV0ZWx5IGJsYW5rIGxpbmVzLlxuICAgICAgICAgICAgdG9rZW4gOiBcImVtcHR5X2xpbmVcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJeJFwiLFxuICAgICAgICAgICAgbmV4dCAgOiBcInN0YXJ0XCJcbiAgICAgICAgfSwgeyAvLyBsaXN0XG4gICAgICAgICAgICB0b2tlbiA6IFwibWFya3VwLmxpc3RcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJeXFxcXHN7MCwzfSg/OlsqKy1dfFxcXFxkK1xcXFwuKVxcXFxzK1wiLFxuICAgICAgICAgICAgbmV4dCAgOiBcImxpc3RibG9jay1zdGFydFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGluY2x1ZGUgOiBcImJhc2ljXCIsIG5vRXNjYXBlOiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIGNvZGVCbG9ja1N0YXJ0UnVsZSxcbiAgICAgICAge1xuICAgICAgICAgICAgZGVmYXVsdFRva2VuIDogXCJsaXN0XCIgLy9kbyBub3QgdXNlIG1hcmt1cC5saXN0IHRvIGFsbG93IHN0bGluZyBsZWFkaW5nIGAqYCBkaWZmZXJudGx5XG4gICAgICAgIH0gXSxcblxuICAgICAgICBcImJsb2NrcXVvdGVcIiA6IFsgeyAvLyBCbG9ja3F1b3RlcyBvbmx5IGVzY2FwZSBvbiBibGFuayBsaW5lcy5cbiAgICAgICAgICAgIHRva2VuIDogXCJlbXB0eV9saW5lXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiXlxcXFxzKiRcIixcbiAgICAgICAgICAgIG5leHQgIDogXCJzdGFydFwiXG4gICAgICAgIH0sIHsgLy8gYmxvY2sgcXVvdGVcbiAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmcuYmxvY2txdW90ZVwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIl5cXFxccyo+XFxcXHMqKD86WyorLV18XFxcXGQrXFxcXC4pP1xcXFxzK1wiLFxuICAgICAgICAgICAgbmV4dCAgOiBcImJsb2NrcXVvdGVcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpbmNsdWRlIDogXCJiYXNpY1wiLCBub0VzY2FwZTogdHJ1ZVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBkZWZhdWx0VG9rZW4gOiBcInN0cmluZy5ibG9ja3F1b3RlXCJcbiAgICAgICAgfSBdLFxuXG4gICAgICAgIFwiZ2l0aHViYmxvY2tcIiA6IGNvZGVCbG9ja1J1bGVzXG4gICAgfSk7XG5cbiAgICB0aGlzLm5vcm1hbGl6ZVJ1bGVzKCk7XG59O1xub29wLmluaGVyaXRzKE1hcmtkb3duSGlnaGxpZ2h0UnVsZXMsIFRleHRIaWdobGlnaHRSdWxlcyk7XG5cbmV4cG9ydHMuTWFya2Rvd25IaWdobGlnaHRSdWxlcyA9IE1hcmtkb3duSGlnaGxpZ2h0UnVsZXM7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIGxhbmcgPSByZXF1aXJlKFwiLi4vbGliL2xhbmdcIik7XG52YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xudmFyIENzc0hpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vY3NzX2hpZ2hsaWdodF9ydWxlc1wiKTtcblxudmFyIFNjc3NIaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uKCkge1xuICAgIFxuICAgIHZhciBwcm9wZXJ0aWVzID0gbGFuZy5hcnJheVRvTWFwKENzc0hpZ2hsaWdodFJ1bGVzLnN1cHBvcnRUeXBlLnNwbGl0KFwifFwiKSk7XG5cbiAgICB2YXIgZnVuY3Rpb25zID0gbGFuZy5hcnJheVRvTWFwKFxuICAgICAgICAoXCJoc2x8aHNsYXxyZ2J8cmdiYXx1cmx8YXR0cnxjb3VudGVyfGNvdW50ZXJzfGFic3xhZGp1c3RfY29sb3J8YWRqdXN0X2h1ZXxcIiArXG4gICAgICAgICBcImFscGhhfGpvaW58Ymx1ZXxjZWlsfGNoYW5nZV9jb2xvcnxjb21wYXJhYmxlfGNvbXBsZW1lbnR8ZGFya2VufGRlc2F0dXJhdGV8XCIgKyBcbiAgICAgICAgIFwiZmxvb3J8Z3JheXNjYWxlfGdyZWVufGh1ZXxpZnxpbnZlcnR8am9pbnxsZW5ndGh8bGlnaHRlbnxsaWdodG5lc3N8bWl4fFwiICsgXG4gICAgICAgICBcIm50aHxvcGFjaWZ5fG9wYWNpdHl8cGVyY2VudGFnZXxxdW90ZXxyZWR8cm91bmR8c2F0dXJhdGV8c2F0dXJhdGlvbnxcIiArXG4gICAgICAgICBcInNjYWxlX2NvbG9yfHRyYW5zcGFyZW50aXplfHR5cGVfb2Z8dW5pdHx1bml0bGVzc3x1bnF1b3RlXCIpLnNwbGl0KFwifFwiKVxuICAgICk7XG5cbiAgICB2YXIgY29uc3RhbnRzID0gbGFuZy5hcnJheVRvTWFwKENzc0hpZ2hsaWdodFJ1bGVzLnN1cHBvcnRDb25zdGFudC5zcGxpdChcInxcIikpO1xuXG4gICAgdmFyIGNvbG9ycyA9IGxhbmcuYXJyYXlUb01hcChDc3NIaWdobGlnaHRSdWxlcy5zdXBwb3J0Q29uc3RhbnRDb2xvci5zcGxpdChcInxcIikpO1xuICAgIFxuICAgIHZhciBrZXl3b3JkcyA9IGxhbmcuYXJyYXlUb01hcChcbiAgICAgICAgKFwiQG1peGlufEBleHRlbmR8QGluY2x1ZGV8QGltcG9ydHxAbWVkaWF8QGRlYnVnfEB3YXJufEBpZnxAZm9yfEBlYWNofEB3aGlsZXxAZWxzZXxAZm9udC1mYWNlfEAtd2Via2l0LWtleWZyYW1lc3xpZnxhbmR8IWRlZmF1bHR8bW9kdWxlfGRlZnxlbmR8ZGVjbGFyZVwiKS5zcGxpdChcInxcIilcbiAgICApO1xuICAgIFxuICAgIHZhciB0YWdzID0gbGFuZy5hcnJheVRvTWFwKFxuICAgICAgICAoXCJhfGFiYnJ8YWNyb255bXxhZGRyZXNzfGFwcGxldHxhcmVhfGFydGljbGV8YXNpZGV8YXVkaW98YnxiYXNlfGJhc2Vmb250fGJkb3xcIiArIFxuICAgICAgICAgXCJiaWd8YmxvY2txdW90ZXxib2R5fGJyfGJ1dHRvbnxjYW52YXN8Y2FwdGlvbnxjZW50ZXJ8Y2l0ZXxjb2RlfGNvbHxjb2xncm91cHxcIiArIFxuICAgICAgICAgXCJjb21tYW5kfGRhdGFsaXN0fGRkfGRlbHxkZXRhaWxzfGRmbnxkaXJ8ZGl2fGRsfGR0fGVtfGVtYmVkfGZpZWxkc2V0fFwiICsgXG4gICAgICAgICBcImZpZ2NhcHRpb258ZmlndXJlfGZvbnR8Zm9vdGVyfGZvcm18ZnJhbWV8ZnJhbWVzZXR8aDF8aDJ8aDN8aDR8aDV8aDZ8aGVhZHxcIiArIFxuICAgICAgICAgXCJoZWFkZXJ8aGdyb3VwfGhyfGh0bWx8aXxpZnJhbWV8aW1nfGlucHV0fGluc3xrZXlnZW58a2JkfGxhYmVsfGxlZ2VuZHxsaXxcIiArIFxuICAgICAgICAgXCJsaW5rfG1hcHxtYXJrfG1lbnV8bWV0YXxtZXRlcnxuYXZ8bm9mcmFtZXN8bm9zY3JpcHR8b2JqZWN0fG9sfG9wdGdyb3VwfFwiICsgXG4gICAgICAgICBcIm9wdGlvbnxvdXRwdXR8cHxwYXJhbXxwcmV8cHJvZ3Jlc3N8cXxycHxydHxydWJ5fHN8c2FtcHxzY3JpcHR8c2VjdGlvbnxzZWxlY3R8XCIgKyBcbiAgICAgICAgIFwic21hbGx8c291cmNlfHNwYW58c3RyaWtlfHN0cm9uZ3xzdHlsZXxzdWJ8c3VtbWFyeXxzdXB8dGFibGV8dGJvZHl8dGR8XCIgKyBcbiAgICAgICAgIFwidGV4dGFyZWF8dGZvb3R8dGh8dGhlYWR8dGltZXx0aXRsZXx0cnx0dHx1fHVsfHZhcnx2aWRlb3x3YnJ8eG1wXCIpLnNwbGl0KFwifFwiKVxuICAgICk7XG5cbiAgICAvLyByZWdleHAgbXVzdCBub3QgaGF2ZSBjYXB0dXJpbmcgcGFyZW50aGVzZXMuIFVzZSAoPzopIGluc3RlYWQuXG4gICAgLy8gcmVnZXhwcyBhcmUgb3JkZXJlZCAtPiB0aGUgZmlyc3QgbWF0Y2ggaXMgdXNlZFxuXG4gICAgdmFyIG51bVJlID0gXCJcXFxcLT8oPzooPzpbMC05XSspfCg/OlswLTldKlxcXFwuWzAtOV0rKSlcIjtcblxuICAgIC8vIHJlZ2V4cCBtdXN0IG5vdCBoYXZlIGNhcHR1cmluZyBwYXJlbnRoZXNlcy4gVXNlICg/OikgaW5zdGVhZC5cbiAgICAvLyByZWdleHBzIGFyZSBvcmRlcmVkIC0+IHRoZSBmaXJzdCBtYXRjaCBpcyB1c2VkXG5cbiAgICB0aGlzLiRydWxlcyA9IHtcbiAgICAgICAgXCJzdGFydFwiIDogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwvXFxcXC8uKiRcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudFwiLCAvLyBtdWx0aSBsaW5lIGNvbW1lbnRcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXC9cXFxcKlwiLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcImNvbW1lbnRcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIiwgLy8gc2luZ2xlIGxpbmVcbiAgICAgICAgICAgICAgICByZWdleCA6ICdbXCJdKD86KD86XFxcXFxcXFwuKXwoPzpbXlwiXFxcXFxcXFxdKSkqP1tcIl0nXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLCAvLyBtdWx0aSBsaW5lIHN0cmluZyBzdGFydFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogJ1tcIl0uKlxcXFxcXFxcJCcsXG4gICAgICAgICAgICAgICAgbmV4dCA6IFwicXFzdHJpbmdcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIiwgLy8gc2luZ2xlIGxpbmVcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiWyddKD86KD86XFxcXFxcXFwuKXwoPzpbXidcXFxcXFxcXF0pKSo/WyddXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsIC8vIG11bHRpIGxpbmUgc3RyaW5nIHN0YXJ0XG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlsnXS4qXFxcXFxcXFwkXCIsXG4gICAgICAgICAgICAgICAgbmV4dCA6IFwicXN0cmluZ1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IG51bVJlICsgXCIoPzpjaHxjbXxkZWd8ZW18ZXh8ZnJ8Z2R8Z3JhZHxIenxpbnxrSHp8bW18bXN8cGN8cHR8cHh8cmFkfHJlbXxzfHR1cm58dmh8dm1heHx2bWlufHZtfHZ3fCUpXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLCAvLyBoZXg2IGNvbG9yXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIiNbYS1mMC05XXs2fVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIiwgLy8gaGV4MyBjb2xvclxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIjW2EtZjAtOV17M31cIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5udW1lcmljXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBudW1SZVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogW1wic3VwcG9ydC5mdW5jdGlvblwiLCBcInN0cmluZ1wiLCBcInN1cHBvcnQuZnVuY3Rpb25cIl0sXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIih1cmxcXFxcKCkoLiopKFxcXFwpKVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eSh2YWx1ZS50b0xvd2VyQ2FzZSgpKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcInN1cHBvcnQudHlwZVwiO1xuICAgICAgICAgICAgICAgICAgICBpZiAoa2V5d29yZHMuaGFzT3duUHJvcGVydHkodmFsdWUpKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwia2V5d29yZFwiO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChjb25zdGFudHMuaGFzT3duUHJvcGVydHkodmFsdWUpKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiY29uc3RhbnQubGFuZ3VhZ2VcIjtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoZnVuY3Rpb25zLmhhc093blByb3BlcnR5KHZhbHVlKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcInN1cHBvcnQuZnVuY3Rpb25cIjtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoY29sb3JzLmhhc093blByb3BlcnR5KHZhbHVlLnRvTG93ZXJDYXNlKCkpKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwic3VwcG9ydC5jb25zdGFudC5jb2xvclwiO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0YWdzLmhhc093blByb3BlcnR5KHZhbHVlLnRvTG93ZXJDYXNlKCkpKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwidmFyaWFibGUubGFuZ3VhZ2VcIjtcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwidGV4dFwiO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwtP1tAYS16X11bQGEtejAtOV9cXFxcLV0qXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwidmFyaWFibGVcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiW2Etel9cXFxcLSRdW2EtejAtOV9cXFxcLSRdKlxcXFxiXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJ2YXJpYWJsZS5sYW5ndWFnZVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIiNbYS16MC05LV9dK1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwidmFyaWFibGUubGFuZ3VhZ2VcIixcbiAgICAgICAgICAgICAgICByZWdleDogXCJcXFxcLlthLXowLTktX10rXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJ2YXJpYWJsZS5sYW5ndWFnZVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIjpbYS16MC05LV9dK1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnRcIixcbiAgICAgICAgICAgICAgICByZWdleDogXCJbYS16MC05LV9dK1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImtleXdvcmQub3BlcmF0b3JcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiPHw+fDw9fD49fD09fCE9fC18JXwjfFxcXFwrfFxcXFwkfFxcXFwrfFxcXFwqXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwicGFyZW4ubHBhcmVuXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIltbKHtdXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwicGFyZW4ucnBhcmVuXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIltcXFxcXSl9XVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXHMrXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBjYXNlSW5zZW5zaXRpdmU6IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgXCJjb21tZW50XCIgOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIiwgLy8gY2xvc2luZyBjb21tZW50XG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwqXFxcXC9cIixcbiAgICAgICAgICAgICAgICBuZXh0IDogXCJzdGFydFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuIDogXCJjb21tZW50XCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgXCJxcXN0cmluZ1wiIDogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICByZWdleCA6ICcoPzooPzpcXFxcXFxcXC4pfCg/OlteXCJcXFxcXFxcXF0pKSo/XCInLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcInN0YXJ0XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAnLisnXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIFwicXN0cmluZ1wiIDogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiKD86KD86XFxcXFxcXFwuKXwoPzpbXidcXFxcXFxcXF0pKSo/J1wiLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcInN0YXJ0XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAnLisnXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9O1xufTtcblxub29wLmluaGVyaXRzKFNjc3NIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuZXhwb3J0cy5TY3NzSGlnaGxpZ2h0UnVsZXMgPSBTY3NzSGlnaGxpZ2h0UnVsZXM7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=