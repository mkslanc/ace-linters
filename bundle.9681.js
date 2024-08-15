"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[9681],{

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

/***/ 29681:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var JadeHighlightRules = (__webpack_require__(94726).JadeHighlightRules);
var FoldMode = (__webpack_require__(69261)/* .FoldMode */ .l);

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

/***/ 94726:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/*
  THIS FILE WAS AUTOGENERATED BY mode_highlight_rules.tmpl.js (UUID: C5B73B98-5F2A-42E3-9F0E-028A74A9FE4B)
*/



var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);
var MarkdownHighlightRules = (__webpack_require__(98137)/* .MarkdownHighlightRules */ .R);
var SassHighlightRules = (__webpack_require__(23124).ScssHighlightRules);
var LessHighlightRules = (__webpack_require__(41425).LessHighlightRules);
var CoffeeHighlightRules = (__webpack_require__(28068).CoffeeHighlightRules);
var JavaScriptHighlightRules = (__webpack_require__(15903).JavaScriptHighlightRules);

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

exports.JadeHighlightRules = JadeHighlightRules;


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLDJCQUEyQixLQUFLLEtBQUs7QUFDckMsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQSxTQUFTLGdCQUFnQjtBQUN6QixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLDZCQUE2QjtBQUM3QixhQUFhO0FBQ2I7QUFDQSwrQkFBK0I7QUFDL0IsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsMEJBQTBCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9jb2ZmZWVfaGlnaGxpZ2h0X3J1bGVzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvZm9sZGluZy9jb2ZmZWUuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9qYWRlLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvamFkZV9oaWdobGlnaHRfcnVsZXMuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9sZXNzX2hpZ2hsaWdodF9ydWxlcy5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL21hcmtkb3duX2hpZ2hsaWdodF9ydWxlcy5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL3Njc3NfaGlnaGxpZ2h0X3J1bGVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG4gICAgdmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xuICAgIHZhciBUZXh0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90ZXh0X2hpZ2hsaWdodF9ydWxlc1wiKS5UZXh0SGlnaGxpZ2h0UnVsZXM7XG5cbiAgICBvb3AuaW5oZXJpdHMoQ29mZmVlSGlnaGxpZ2h0UnVsZXMsIFRleHRIaWdobGlnaHRSdWxlcyk7XG5cbiAgICBmdW5jdGlvbiBDb2ZmZWVIaWdobGlnaHRSdWxlcygpIHtcbiAgICAgICAgdmFyIGlkZW50aWZpZXIgPSBcIlskQS1aYS16X1xcXFx4N2YtXFxcXHVmZmZmXVskXFxcXHdcXFxceDdmLVxcXFx1ZmZmZl0qXCI7XG5cbiAgICAgICAgdmFyIGtleXdvcmRzID0gKFxuICAgICAgICAgICAgXCJ0aGlzfHRocm93fHRoZW58dHJ5fHR5cGVvZnxzdXBlcnxzd2l0Y2h8cmV0dXJufGJyZWFrfGJ5fGNvbnRpbnVlfFwiICtcbiAgICAgICAgICAgIFwiY2F0Y2h8Y2xhc3N8aW58aW5zdGFuY2VvZnxpc3xpc250fGlmfGVsc2V8ZXh0ZW5kc3xmb3J8b3dufFwiICtcbiAgICAgICAgICAgIFwiZmluYWxseXxmdW5jdGlvbnx3aGlsZXx3aGVufG5ld3xub3xub3R8ZGVsZXRlfGRlYnVnZ2VyfGRvfGxvb3B8b2Z8b2ZmfFwiICtcbiAgICAgICAgICAgIFwib3J8b258dW5sZXNzfHVudGlsfGFuZHx5ZXN8eWllbGR8ZXhwb3J0fGltcG9ydHxkZWZhdWx0XCJcbiAgICAgICAgKTtcblxuICAgICAgICB2YXIgbGFuZ0NvbnN0YW50ID0gKFxuICAgICAgICAgICAgXCJ0cnVlfGZhbHNlfG51bGx8dW5kZWZpbmVkfE5hTnxJbmZpbml0eVwiXG4gICAgICAgICk7XG5cbiAgICAgICAgdmFyIGlsbGVnYWwgPSAoXG4gICAgICAgICAgICBcImNhc2V8Y29uc3R8ZnVuY3Rpb258dmFyfHZvaWR8d2l0aHxlbnVtfGltcGxlbWVudHN8XCIgK1xuICAgICAgICAgICAgXCJpbnRlcmZhY2V8bGV0fHBhY2thZ2V8cHJpdmF0ZXxwcm90ZWN0ZWR8cHVibGljfHN0YXRpY1wiXG4gICAgICAgICk7XG5cbiAgICAgICAgdmFyIHN1cHBvcnRDbGFzcyA9IChcbiAgICAgICAgICAgIFwiQXJyYXl8Qm9vbGVhbnxEYXRlfEZ1bmN0aW9ufE51bWJlcnxPYmplY3R8UmVnRXhwfFJlZmVyZW5jZUVycm9yfFN0cmluZ3xcIiArXG4gICAgICAgICAgICBcIkVycm9yfEV2YWxFcnJvcnxJbnRlcm5hbEVycm9yfFJhbmdlRXJyb3J8UmVmZXJlbmNlRXJyb3J8U3RvcEl0ZXJhdGlvbnxcIiArXG4gICAgICAgICAgICBcIlN5bnRheEVycm9yfFR5cGVFcnJvcnxVUklFcnJvcnxcIiAgK1xuICAgICAgICAgICAgXCJBcnJheUJ1ZmZlcnxGbG9hdDMyQXJyYXl8RmxvYXQ2NEFycmF5fEludDE2QXJyYXl8SW50MzJBcnJheXxJbnQ4QXJyYXl8XCIgK1xuICAgICAgICAgICAgXCJVaW50MTZBcnJheXxVaW50MzJBcnJheXxVaW50OEFycmF5fFVpbnQ4Q2xhbXBlZEFycmF5XCJcbiAgICAgICAgKTtcblxuICAgICAgICB2YXIgc3VwcG9ydEZ1bmN0aW9uID0gKFxuICAgICAgICAgICAgXCJNYXRofEpTT058aXNOYU58aXNGaW5pdGV8cGFyc2VJbnR8cGFyc2VGbG9hdHxlbmNvZGVVUkl8XCIgK1xuICAgICAgICAgICAgXCJlbmNvZGVVUklDb21wb25lbnR8ZGVjb2RlVVJJfGRlY29kZVVSSUNvbXBvbmVudHxTdHJpbmd8XCJcbiAgICAgICAgKTtcblxuICAgICAgICB2YXIgdmFyaWFibGVMYW5ndWFnZSA9IChcbiAgICAgICAgICAgIFwid2luZG93fGFyZ3VtZW50c3xwcm90b3R5cGV8ZG9jdW1lbnRcIlxuICAgICAgICApO1xuXG4gICAgICAgIHZhciBrZXl3b3JkTWFwcGVyID0gdGhpcy5jcmVhdGVLZXl3b3JkTWFwcGVyKHtcbiAgICAgICAgICAgIFwia2V5d29yZFwiOiBrZXl3b3JkcyxcbiAgICAgICAgICAgIFwiY29uc3RhbnQubGFuZ3VhZ2VcIjogbGFuZ0NvbnN0YW50LFxuICAgICAgICAgICAgXCJpbnZhbGlkLmlsbGVnYWxcIjogaWxsZWdhbCxcbiAgICAgICAgICAgIFwibGFuZ3VhZ2Uuc3VwcG9ydC5jbGFzc1wiOiBzdXBwb3J0Q2xhc3MsXG4gICAgICAgICAgICBcImxhbmd1YWdlLnN1cHBvcnQuZnVuY3Rpb25cIjogc3VwcG9ydEZ1bmN0aW9uLFxuICAgICAgICAgICAgXCJ2YXJpYWJsZS5sYW5ndWFnZVwiOiB2YXJpYWJsZUxhbmd1YWdlXG4gICAgICAgIH0sIFwiaWRlbnRpZmllclwiKTtcblxuICAgICAgICB2YXIgZnVuY3Rpb25SdWxlID0ge1xuICAgICAgICAgICAgdG9rZW46IFtcInBhcmVuLmxwYXJlblwiLCBcInZhcmlhYmxlLnBhcmFtZXRlclwiLCBcInBhcmVuLnJwYXJlblwiLCBcInRleHRcIiwgXCJzdG9yYWdlLnR5cGVcIl0sXG4gICAgICAgICAgICByZWdleDogLyg/OihcXCgpKCg/OlwiW15cIildKj9cInwnW14nKV0qPyd8XFwvW15cXC8pXSo/XFwvfFteKClcIidcXC9dKSo/KShcXCkpKFxccyopKT8oW1xcLT1dPikvLnNvdXJjZVxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBzdHJpbmdFc2NhcGUgPSAvXFxcXCg/OnhbMC05YS1mQS1GXXsyfXx1WzAtOWEtZkEtRl17NH18WzAtMl1bMC03XXswLDJ9fDNbMC02XVswLTddP3wzN1swLTddP3xbNC03XVswLTddP3wuKS87XG5cbiAgICAgICAgdGhpcy4kcnVsZXMgPSB7XG4gICAgICAgICAgICBzdGFydCA6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5udW1lcmljXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIoPzoweFtcXFxcZGEtZkEtRl0rfCg/OlxcXFxkKyg/OlxcXFwuXFxcXGQrKT98XFxcXC5cXFxcZCspKD86W2VFXVsrLV0/XFxcXGQrKT8pXCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlTmFtZTogXCJxZG9jXCIsXG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIiwgcmVnZXggOiBcIicnJ1wiLCBuZXh0IDogW1xuICAgICAgICAgICAgICAgICAgICAgICAge3Rva2VuIDogXCJzdHJpbmdcIiwgcmVnZXggOiBcIicnJ1wiLCBuZXh0IDogXCJzdGFydFwifSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0b2tlbiA6IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCIsIHJlZ2V4IDogc3RyaW5nRXNjYXBlfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtkZWZhdWx0VG9rZW46IFwic3RyaW5nXCJ9XG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlTmFtZTogXCJxcWRvY1wiLFxuICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogJ1wiXCJcIicsXG4gICAgICAgICAgICAgICAgICAgIG5leHQgOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7dG9rZW4gOiBcInN0cmluZ1wiLCByZWdleCA6ICdcIlwiXCInLCBuZXh0IDogXCJzdGFydFwifSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0b2tlbiA6IFwicGFyZW4uc3RyaW5nXCIsIHJlZ2V4IDogJyN7JywgcHVzaCA6IFwic3RhcnRcIn0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7dG9rZW4gOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLCByZWdleCA6IHN0cmluZ0VzY2FwZX0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7ZGVmYXVsdFRva2VuOiBcInN0cmluZ1wifVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZU5hbWU6IFwicXN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsIHJlZ2V4IDogXCInXCIsIG5leHQgOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7dG9rZW4gOiBcInN0cmluZ1wiLCByZWdleCA6IFwiJ1wiLCBuZXh0IDogXCJzdGFydFwifSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0b2tlbiA6IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCIsIHJlZ2V4IDogc3RyaW5nRXNjYXBlfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtkZWZhdWx0VG9rZW46IFwic3RyaW5nXCJ9XG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlTmFtZTogXCJxcXN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nLnN0YXJ0XCIsIHJlZ2V4IDogJ1wiJywgbmV4dCA6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0b2tlbiA6IFwic3RyaW5nLmVuZFwiLCByZWdleCA6ICdcIicsIG5leHQgOiBcInN0YXJ0XCJ9LFxuICAgICAgICAgICAgICAgICAgICAgICAge3Rva2VuIDogXCJwYXJlbi5zdHJpbmdcIiwgcmVnZXggOiAnI3snLCBwdXNoIDogXCJzdGFydFwifSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0b2tlbiA6IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCIsIHJlZ2V4IDogc3RyaW5nRXNjYXBlfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtkZWZhdWx0VG9rZW46IFwic3RyaW5nXCJ9XG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlTmFtZTogXCJqc1wiLFxuICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsIHJlZ2V4IDogXCJgXCIsIG5leHQgOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7dG9rZW4gOiBcInN0cmluZ1wiLCByZWdleCA6IFwiYFwiLCBuZXh0IDogXCJzdGFydFwifSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0b2tlbiA6IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCIsIHJlZ2V4IDogc3RyaW5nRXNjYXBlfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtkZWZhdWx0VG9rZW46IFwic3RyaW5nXCJ9XG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4OiBcIlt7fV1cIiwgb25NYXRjaDogZnVuY3Rpb24odmFsLCBzdGF0ZSwgc3RhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsID09IFwie1wiICYmIHN0YWNrLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWNrLnVuc2hpZnQoXCJzdGFydFwiLCBzdGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwicGFyZW5cIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWwgPT0gXCJ9XCIgJiYgc3RhY2subGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhY2suc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHQgPSBzdGFjay5zaGlmdCgpIHx8IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubmV4dC5pbmRleE9mKFwic3RyaW5nXCIpICE9IC0xKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJwYXJlbi5zdHJpbmdcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcInBhcmVuXCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmcucmVnZXhcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggOiBcIi8vL1wiLFxuICAgICAgICAgICAgICAgICAgICBuZXh0IDogXCJoZXJlZ2V4XCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmcucmVnZXhcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggOiAvKD86XFwvKD8hW1xccz1dKVteW1xcL1xcblxcXFxdKig/Oig/OlxcXFxbXFxzXFxTXXxcXFtbXlxcXVxcblxcXFxdKig/OlxcXFxbXFxzXFxTXVteXFxdXFxuXFxcXF0qKSpdKVteW1xcL1xcblxcXFxdKikqXFwvKSg/OltpbWd5XXswLDR9KSg/IVxcdykvXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudFwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleCA6IFwiIyMjKD8hIylcIixcbiAgICAgICAgICAgICAgICAgICAgbmV4dCA6IFwiY29tbWVudFwiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudFwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleCA6IFwiIy4qXCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogW1wicHVuY3R1YXRpb24ub3BlcmF0b3JcIiwgXCJ0ZXh0XCIsIFwiaWRlbnRpZmllclwiXSxcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggOiBcIihcXFxcLikoXFxcXHMqKShcIiArIGlsbGVnYWwgKyBcIilcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcInB1bmN0dWF0aW9uLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcLnsxLDN9XCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIC8vY2xhc3MgQSBleHRlbmRzIEJcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBbXCJrZXl3b3JkXCIsIFwidGV4dFwiLCBcImxhbmd1YWdlLnN1cHBvcnQuY2xhc3NcIixcbiAgICAgICAgICAgICAgICAgICAgIFwidGV4dFwiLCBcImtleXdvcmRcIiwgXCJ0ZXh0XCIsIFwibGFuZ3VhZ2Uuc3VwcG9ydC5jbGFzc1wiXSxcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggOiBcIihjbGFzcykoXFxcXHMrKShcIiArIGlkZW50aWZpZXIgKyBcIikoPzooXFxcXHMrKShleHRlbmRzKShcXFxccyspKFwiICsgaWRlbnRpZmllciArIFwiKSk/XCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIC8vcGxheSA9ICguLi4pIC0+XG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogW1wiZW50aXR5Lm5hbWUuZnVuY3Rpb25cIiwgXCJ0ZXh0XCIsIFwia2V5d29yZC5vcGVyYXRvclwiLCBcInRleHRcIl0uY29uY2F0KGZ1bmN0aW9uUnVsZS50b2tlbiksXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIoXCIgKyBpZGVudGlmaWVyICsgXCIpKFxcXFxzKikoWz06XSkoXFxcXHMqKVwiICsgZnVuY3Rpb25SdWxlLnJlZ2V4XG4gICAgICAgICAgICAgICAgfSwgXG4gICAgICAgICAgICAgICAgZnVuY3Rpb25SdWxlLCBcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJ2YXJpYWJsZVwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleCA6IFwiQCg/OlwiICsgaWRlbnRpZmllciArIFwiKT9cIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW46IGtleXdvcmRNYXBwZXIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogaWRlbnRpZmllclxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcInB1bmN0dWF0aW9uLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcLHxcXFxcLlwiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RvcmFnZS50eXBlXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJbXFxcXC09XT5cIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcImtleXdvcmQub3BlcmF0b3JcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggOiBcIig/OlstKyovJTw+JnxeIT89XT18Pj4+PT98XFxcXC1cXFxcLXxcXFxcK1xcXFwrfDo6fCYmPXxcXFxcfFxcXFx8PXw8PD18Pj49fFxcXFw/XFxcXC58XFxcXC57MiwzfXxbISorLT0+PF0pXCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJwYXJlbi5scGFyZW5cIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggOiBcIlsoe1tdXCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJwYXJlbi5ycGFyZW5cIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggOiBcIltcXFxcXX0pXVwiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXHMrXCJcbiAgICAgICAgICAgICAgICB9XSxcblxuXG4gICAgICAgICAgICBoZXJlZ2V4IDogW3tcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nLnJlZ2V4XCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAnLio/Ly8vW2ltZ3ldezAsNH0nLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcInN0YXJ0XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudC5yZWdleFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxccysoPzojLiopP1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZy5yZWdleFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcUytcIlxuICAgICAgICAgICAgfV0sXG5cbiAgICAgICAgICAgIGNvbW1lbnQgOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAnIyMjJyxcbiAgICAgICAgICAgICAgICBuZXh0IDogXCJzdGFydFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuIDogXCJjb21tZW50XCJcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMubm9ybWFsaXplUnVsZXMoKTtcbiAgICB9XG5cbiAgICBleHBvcnRzLkNvZmZlZUhpZ2hsaWdodFJ1bGVzID0gQ29mZmVlSGlnaGxpZ2h0UnVsZXM7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi8uLi9saWIvb29wXCIpO1xudmFyIEJhc2VGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRfbW9kZVwiKS5Gb2xkTW9kZTtcbnZhciBSYW5nZSA9IHJlcXVpcmUoXCIuLi8uLi9yYW5nZVwiKS5SYW5nZTtcblxudmFyIEZvbGRNb2RlID0gZXhwb3J0cy5Gb2xkTW9kZSA9IGZ1bmN0aW9uKCkge307XG5vb3AuaW5oZXJpdHMoRm9sZE1vZGUsIEJhc2VGb2xkTW9kZSk7XG5cbihmdW5jdGlvbigpIHtcbiAgICB0aGlzLmNvbW1lbnRCbG9jayA9IGZ1bmN0aW9uKHNlc3Npb24sIHJvdykge1xuICAgICAgICB2YXIgcmUgPSAvXFxTLztcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgdmFyIHN0YXJ0TGV2ZWwgPSBsaW5lLnNlYXJjaChyZSk7XG4gICAgICAgIGlmIChzdGFydExldmVsID09IC0xIHx8IGxpbmVbc3RhcnRMZXZlbF0gIT0gXCIjXCIpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdmFyIHN0YXJ0Q29sdW1uID0gbGluZS5sZW5ndGg7XG4gICAgICAgIHZhciBtYXhSb3cgPSBzZXNzaW9uLmdldExlbmd0aCgpO1xuICAgICAgICB2YXIgc3RhcnRSb3cgPSByb3c7XG4gICAgICAgIHZhciBlbmRSb3cgPSByb3c7XG5cbiAgICAgICAgd2hpbGUgKCsrcm93IDwgbWF4Um93KSB7XG4gICAgICAgICAgICBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgICAgICB2YXIgbGV2ZWwgPSBsaW5lLnNlYXJjaChyZSk7XG5cbiAgICAgICAgICAgIGlmIChsZXZlbCA9PSAtMSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcblxuICAgICAgICAgICAgaWYgKGxpbmVbbGV2ZWxdICE9IFwiI1wiKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBlbmRSb3cgPSByb3c7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW5kUm93ID4gc3RhcnRSb3cpIHtcbiAgICAgICAgICAgIHZhciBlbmRDb2x1bW4gPSBzZXNzaW9uLmdldExpbmUoZW5kUm93KS5sZW5ndGg7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFJhbmdlKHN0YXJ0Um93LCBzdGFydENvbHVtbiwgZW5kUm93LCBlbmRDb2x1bW4pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMuZ2V0Rm9sZFdpZGdldFJhbmdlID0gZnVuY3Rpb24oc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpIHtcbiAgICAgICAgdmFyIHJhbmdlID0gdGhpcy5pbmRlbnRhdGlvbkJsb2NrKHNlc3Npb24sIHJvdyk7XG4gICAgICAgIGlmIChyYW5nZSlcbiAgICAgICAgICAgIHJldHVybiByYW5nZTtcblxuICAgICAgICByYW5nZSA9IHRoaXMuY29tbWVudEJsb2NrKHNlc3Npb24sIHJvdyk7XG4gICAgICAgIGlmIChyYW5nZSlcbiAgICAgICAgICAgIHJldHVybiByYW5nZTtcbiAgICB9O1xuXG4gICAgLy8gbXVzdCByZXR1cm4gXCJcIiBpZiB0aGVyZSdzIG5vIGZvbGQsIHRvIGVuYWJsZSBjYWNoaW5nXG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0ID0gZnVuY3Rpb24oc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgdmFyIGluZGVudCA9IGxpbmUuc2VhcmNoKC9cXFMvKTtcbiAgICAgICAgdmFyIG5leHQgPSBzZXNzaW9uLmdldExpbmUocm93ICsgMSk7XG4gICAgICAgIHZhciBwcmV2ID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyAtIDEpO1xuICAgICAgICB2YXIgcHJldkluZGVudCA9IHByZXYuc2VhcmNoKC9cXFMvKTtcbiAgICAgICAgdmFyIG5leHRJbmRlbnQgPSBuZXh0LnNlYXJjaCgvXFxTLyk7XG5cbiAgICAgICAgaWYgKGluZGVudCA9PSAtMSkge1xuICAgICAgICAgICAgc2Vzc2lvbi5mb2xkV2lkZ2V0c1tyb3cgLSAxXSA9IHByZXZJbmRlbnQhPSAtMSAmJiBwcmV2SW5kZW50IDwgbmV4dEluZGVudCA/IFwic3RhcnRcIiA6IFwiXCI7XG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGRvY3VtZW50YXRpb24gY29tbWVudHNcbiAgICAgICAgaWYgKHByZXZJbmRlbnQgPT0gLTEpIHtcbiAgICAgICAgICAgIGlmIChpbmRlbnQgPT0gbmV4dEluZGVudCAmJiBsaW5lW2luZGVudF0gPT0gXCIjXCIgJiYgbmV4dFtpbmRlbnRdID09IFwiI1wiKSB7XG4gICAgICAgICAgICAgICAgc2Vzc2lvbi5mb2xkV2lkZ2V0c1tyb3cgLSAxXSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgc2Vzc2lvbi5mb2xkV2lkZ2V0c1tyb3cgKyAxXSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwic3RhcnRcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChwcmV2SW5kZW50ID09IGluZGVudCAmJiBsaW5lW2luZGVudF0gPT0gXCIjXCIgJiYgcHJldltpbmRlbnRdID09IFwiI1wiKSB7XG4gICAgICAgICAgICBpZiAoc2Vzc2lvbi5nZXRMaW5lKHJvdyAtIDIpLnNlYXJjaCgvXFxTLykgPT0gLTEpIHtcbiAgICAgICAgICAgICAgICBzZXNzaW9uLmZvbGRXaWRnZXRzW3JvdyAtIDFdID0gXCJzdGFydFwiO1xuICAgICAgICAgICAgICAgIHNlc3Npb24uZm9sZFdpZGdldHNbcm93ICsgMV0gPSBcIlwiO1xuICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByZXZJbmRlbnQhPSAtMSAmJiBwcmV2SW5kZW50IDwgaW5kZW50KVxuICAgICAgICAgICAgc2Vzc2lvbi5mb2xkV2lkZ2V0c1tyb3cgLSAxXSA9IFwic3RhcnRcIjtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgc2Vzc2lvbi5mb2xkV2lkZ2V0c1tyb3cgLSAxXSA9IFwiXCI7XG5cbiAgICAgICAgaWYgKGluZGVudCA8IG5leHRJbmRlbnQpXG4gICAgICAgICAgICByZXR1cm4gXCJzdGFydFwiO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICB9O1xuXG59KS5jYWxsKEZvbGRNb2RlLnByb3RvdHlwZSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRNb2RlID0gcmVxdWlyZShcIi4vdGV4dFwiKS5Nb2RlO1xudmFyIEphZGVIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL2phZGVfaGlnaGxpZ2h0X3J1bGVzXCIpLkphZGVIaWdobGlnaHRSdWxlcztcbnZhciBGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRpbmcvY29mZmVlXCIpLkZvbGRNb2RlO1xuXG52YXIgTW9kZSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuSGlnaGxpZ2h0UnVsZXMgPSBKYWRlSGlnaGxpZ2h0UnVsZXM7XG4gICAgdGhpcy5mb2xkaW5nUnVsZXMgPSBuZXcgRm9sZE1vZGUoKTtcbiAgICB0aGlzLiRiZWhhdmlvdXIgPSB0aGlzLiRkZWZhdWx0QmVoYXZpb3VyO1xufTtcbm9vcC5pbmhlcml0cyhNb2RlLCBUZXh0TW9kZSk7XG5cbihmdW5jdGlvbigpIHsgXG5cdHRoaXMubGluZUNvbW1lbnRTdGFydCA9IFwiLy9cIjtcbiAgICB0aGlzLiRpZCA9IFwiYWNlL21vZGUvamFkZVwiO1xufSkuY2FsbChNb2RlLnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTW9kZSA9IE1vZGU7XG4iLCIvKlxuICBUSElTIEZJTEUgV0FTIEFVVE9HRU5FUkFURUQgQlkgbW9kZV9oaWdobGlnaHRfcnVsZXMudG1wbC5qcyAoVVVJRDogQzVCNzNCOTgtNUYyQS00MkUzLTlGMEUtMDI4QTc0QTlGRTRCKVxuKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90ZXh0X2hpZ2hsaWdodF9ydWxlc1wiKS5UZXh0SGlnaGxpZ2h0UnVsZXM7XG52YXIgTWFya2Rvd25IaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL21hcmtkb3duX2hpZ2hsaWdodF9ydWxlc1wiKS5NYXJrZG93bkhpZ2hsaWdodFJ1bGVzO1xudmFyIFNhc3NIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3Njc3NfaGlnaGxpZ2h0X3J1bGVzXCIpLlNjc3NIaWdobGlnaHRSdWxlcztcbnZhciBMZXNzSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9sZXNzX2hpZ2hsaWdodF9ydWxlc1wiKS5MZXNzSGlnaGxpZ2h0UnVsZXM7XG52YXIgQ29mZmVlSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9jb2ZmZWVfaGlnaGxpZ2h0X3J1bGVzXCIpLkNvZmZlZUhpZ2hsaWdodFJ1bGVzO1xudmFyIEphdmFTY3JpcHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL2phdmFzY3JpcHRfaGlnaGxpZ2h0X3J1bGVzXCIpLkphdmFTY3JpcHRIaWdobGlnaHRSdWxlcztcblxuZnVuY3Rpb24gbWl4aW5fZW1iZWQodGFnLCBwcmVmaXgpIHtcbiAgICByZXR1cm4geyBcbiAgICAgICAgdG9rZW4gOiBcImVudGl0eS5uYW1lLmZ1bmN0aW9uLmphZGVcIixcbiAgICAgICAgcmVnZXggOiBcIl5cXFxccypcXFxcOlwiICsgdGFnLFxuICAgICAgICBuZXh0ICA6IHByZWZpeCArIFwic3RhcnRcIlxuICAgIH07XG59XG5cbnZhciBKYWRlSGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbigpIHtcblxuICAgIHZhciBlc2NhcGVkUmUgPSBcIlxcXFxcXFxcKD86eFswLTlhLWZBLUZdezJ9fFwiICsgLy8gaGV4XG4gICAgICAgIFwidVswLTlhLWZBLUZdezR9fFwiICsgLy8gdW5pY29kZVxuICAgICAgICBcIlswLTJdWzAtN117MCwyfXxcIiArIC8vIG9jdFxuICAgICAgICBcIjNbMC02XVswLTddP3xcIiArIC8vIG9jdFxuICAgICAgICBcIjM3WzAtN10/fFwiICsgLy8gb2N0XG4gICAgICAgIFwiWzQtN11bMC03XT98XCIgKyAvL29jdFxuICAgICAgICBcIi4pXCI7XG5cbiAgICAvLyByZWdleHAgbXVzdCBub3QgaGF2ZSBjYXB0dXJpbmcgcGFyZW50aGVzZXMuIFVzZSAoPzopIGluc3RlYWQuXG4gICAgLy8gcmVnZXhwcyBhcmUgb3JkZXJlZCAtPiB0aGUgZmlyc3QgbWF0Y2ggaXMgdXNlZFxuXG4gICAgdGhpcy4kcnVsZXMgPSBcbiAgICAgICAge1xuICAgIFwic3RhcnRcIjogW1xuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbjogXCJrZXl3b3JkLmNvbnRyb2wuaW1wb3J0LmluY2x1ZGUuamFkZVwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiXFxcXHMqXFxcXGJpbmNsdWRlXFxcXGJcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbjogXCJrZXl3b3JkLm90aGVyLmRvY3R5cGUuamFkZVwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiXiEhIVxcXFxzKig/OlthLXpBLVowLTktX10rKT9cIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBvbk1hdGNoOiBmdW5jdGlvbih2YWx1ZSwgY3VycmVudFN0YXRlLCBzdGFjaykge1xuICAgICAgICAgICAgICAgIHN0YWNrLnVuc2hpZnQodGhpcy5uZXh0LCB2YWx1ZS5sZW5ndGggLSAyLCBjdXJyZW50U3RhdGUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBcImNvbW1lbnRcIjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZWdleDogL15cXHMqXFwvXFwvLyxcbiAgICAgICAgICAgIG5leHQ6IFwiY29tbWVudF9ibG9ja1wiXG4gICAgICAgIH0sXG4gICAgICAgIG1peGluX2VtYmVkKFwibWFya2Rvd25cIiwgXCJtYXJrZG93bi1cIiksXG4gICAgICAgIG1peGluX2VtYmVkKFwic2Fzc1wiLCBcInNhc3MtXCIpLFxuICAgICAgICBtaXhpbl9lbWJlZChcImxlc3NcIiwgXCJsZXNzLVwiKSxcbiAgICAgICAgbWl4aW5fZW1iZWQoXCJjb2ZmZWVcIiwgXCJjb2ZmZWUtXCIpLFxuICAgICAgICAvKlxuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbjoge1xuICAgICAgICAgICAgICAgIFwiMlwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcImVudGl0eS5uYW1lLmZ1bmN0aW9uLmphZGVcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZWdleDogXCJeKFxcXFxzKikoXFxcXDpjZGF0YSlcIixcbiAgICAgICAgICAgIG5leHQ6IFwic3RhdGVfOVwiXG4gICAgICAgIH0sKi9cbiAgICAgICAgLy8gbWF0Y2ggc3R1ZmYgbGlrZTogbWl4aW4gZGlhbG9nLXRpdGxlLWRlc2ModGl0bGUsIGRlc2MpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuOiBbIFwic3RvcmFnZS50eXBlLmZ1bmN0aW9uLmphZGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgXCJlbnRpdHkubmFtZS5mdW5jdGlvbi5qYWRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgIFwicHVuY3R1YXRpb24uZGVmaW5pdGlvbi5wYXJhbWV0ZXJzLmJlZ2luLmphZGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgXCJ2YXJpYWJsZS5wYXJhbWV0ZXIuZnVuY3Rpb24uamFkZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24ucGFyYW1ldGVycy5lbmQuamFkZVwiXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICByZWdleDogXCJeKFxcXFxzKm1peGluKSggW1xcXFx3XFxcXC1dKykoXFxcXHMqXFxcXCgpKC4qPykoXFxcXCkpXCJcbiAgICAgICAgfSxcbiAgICAgICAgLy8gbWF0Y2ggc3R1ZmYgbGlrZTogbWl4aW4gZGlhbG9nLXRpdGxlLWRlc2NcbiAgICAgICAge1xuICAgICAgICAgICAgdG9rZW46IFsgXCJzdG9yYWdlLnR5cGUuZnVuY3Rpb24uamFkZVwiLCBcImVudGl0eS5uYW1lLmZ1bmN0aW9uLmphZGVcIl0sXG4gICAgICAgICAgICByZWdleDogXCJeKFxcXFxzKm1peGluKSggW1xcXFx3XFxcXC1dKylcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbjogXCJzb3VyY2UuanMuZW1iZWRkZWQuamFkZVwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiXlxcXFxzKig/Oi18PXwhPSlcIixcbiAgICAgICAgICAgIG5leHQ6IFwianMtc3RhcnRcIlxuICAgICAgICB9LFxuICAgICAgICAvKntcbiAgICAgICAgICAgIHRva2VuOiBcImVudGl0eS5uYW1lLnRhZy5zY3JpcHQuamFkZVwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiXlxcXFxzKnNjcmlwdFwiLFxuICAgICAgICAgICAgbmV4dDogXCJqc19jb2RlX3RhZ1wiXG4gICAgICAgIH0sKi9cbiAgICAgICAge1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nLmludGVycG9sYXRlZC5qYWRlXCIsXG4gICAgICAgICAgICByZWdleDogXCJbIyFdXFxcXHtbXlxcXFx9XStcXFxcfVwiXG4gICAgICAgIH0sXG4gICAgICAgIC8vIE1hdGNoIGFueSB0YWcsIGlkIG9yIGNsYXNzLiBza2lwIEFTVCBmaWx0ZXJzXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuOiBcIm1ldGEudGFnLmFueS5qYWRlXCIsXG4gICAgICAgICAgICByZWdleDogL15cXHMqKD8hXFx3KzopKD86W1xcdy1dK3woPz1cXC58IyldKS8sXG4gICAgICAgICAgICBuZXh0OiBcInRhZ19zaW5nbGVcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbjogXCJzdXBvcnQudHlwZS5hdHRyaWJ1dGUuaWQuamFkZVwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiI1xcXFx3K1wiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuOiBcInN1cG9ydC50eXBlLmF0dHJpYnV0ZS5jbGFzcy5qYWRlXCIsXG4gICAgICAgICAgICByZWdleDogXCJcXFxcLlxcXFx3K1wiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuOiBcInB1bmN0dWF0aW9uXCIsXG4gICAgICAgICAgICByZWdleDogXCJcXFxccyooPzpcXFxcKClcIixcbiAgICAgICAgICAgIG5leHQ6IFwidGFnX2F0dHJpYnV0ZXNcIlxuICAgICAgICB9XG4gICAgXSxcbiAgICBcImNvbW1lbnRfYmxvY2tcIjogW1xuICAgICAgICB7cmVnZXg6IC9eXFxzKig/OlxcL1xcLyk/Lywgb25NYXRjaDogZnVuY3Rpb24odmFsdWUsIGN1cnJlbnRTdGF0ZSwgc3RhY2spIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZS5sZW5ndGggPD0gc3RhY2tbMV0pIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUuc2xpY2UoLTEpID09IFwiL1wiKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YWNrWzFdID0gdmFsdWUubGVuZ3RoIC0gMjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0ID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiY29tbWVudFwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzdGFjay5zaGlmdCgpO1xuICAgICAgICAgICAgICAgIHN0YWNrLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5uZXh0ID0gc3RhY2suc2hpZnQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJ0ZXh0XCI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubmV4dCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiY29tbWVudFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBuZXh0OiBcInN0YXJ0XCJ9LFxuICAgICAgICB7ZGVmYXVsdFRva2VuOiBcImNvbW1lbnRcIn1cbiAgICBdLFxuICAgIC8qXG4gICAgXG4gICAgXCJzdGF0ZV85XCI6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgdG9rZW46IFwiVE9ET1wiLFxuICAgICAgICAgICAgcmVnZXg6IFwiXig/IVxcXFwxXFxcXHMrKVwiLFxuICAgICAgICAgICAgbmV4dDogXCJzdGFydFwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuOiBcIlRPRE9cIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIi4rXCIsXG4gICAgICAgICAgICBuZXh0OiBcInN0YXRlXzlcIlxuICAgICAgICB9XG4gICAgXSwqL1xuICAgIC8qXCJqc19jb2RlXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgdG9rZW46IFwia2V5d29yZC5jb250cm9sLmpzXCIsXG4gICAgICAgICAgICByZWdleDogXCJcXFxcYmVhY2hcXFxcYlwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuOiBcInRleHRcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIiRcIixcbiAgICAgICAgICAgIG5leHQ6IFwic3RhcnRcIlxuICAgICAgICB9XG4gICAgXSwqL1xuICAgIC8qXCJqc19jb2RlX3RhZ1wiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIFwiaW5jbHVkZVwiOiBcInNvdXJjZS5qc1wiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuOiBcIlRPRE9cIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIl4oKD89KFxcXFwxKShbXFxcXHcjXFxcXC5dfCRcXFxcbj8pKXxeJFxcXFxuPylcIixcbiAgICAgICAgICAgIG5leHQ6IFwic3RhcnRcIlxuICAgICAgICB9XG4gICAgXSwqL1xuICAgIFwidGFnX3NpbmdsZVwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuOiBcImVudGl0eS5vdGhlci5hdHRyaWJ1dGUtbmFtZS5jbGFzcy5qYWRlXCIsXG4gICAgICAgICAgICByZWdleDogXCJcXFxcLltcXFxcdy1dK1wiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuOiBcImVudGl0eS5vdGhlci5hdHRyaWJ1dGUtbmFtZS5pZC5qYWRlXCIsXG4gICAgICAgICAgICByZWdleDogXCIjW1xcXFx3LV0rXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdG9rZW46IFtcInRleHRcIiwgXCJwdW5jdHVhdGlvblwiXSxcbiAgICAgICAgICAgIHJlZ2V4OiBcIigkKXwoKD8hXFxcXC58I3w9fC0pKVwiLFxuICAgICAgICAgICAgbmV4dDogXCJzdGFydFwiXG4gICAgICAgIH1cbiAgICBdLFxuICAgIFwidGFnX2F0dHJpYnV0ZXNcIjogWyBcbiAgICAgICAge1xuICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgcmVnZXggOiBcIicoPz0uKVwiLFxuICAgICAgICAgICAgbmV4dCAgOiBcInFzdHJpbmdcIlxuICAgICAgICB9LCBcbiAgICAgICAge1xuICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgcmVnZXggOiAnXCIoPz0uKScsXG4gICAgICAgICAgICBuZXh0ICA6IFwicXFzdHJpbmdcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbjogW1wiZW50aXR5Lm90aGVyLmF0dHJpYnV0ZS1uYW1lLmphZGVcIiwgXCJwdW5jdHVhdGlvblwiXSxcbiAgICAgICAgICAgIHJlZ2V4OiBcIihbYS16QS1aOlxcXFwuLV0rKSg9KT9cIixcbiAgICAgICAgICAgIG5leHQ6IFwiYXR0cmlidXRlX3N0cmluZ3NcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbjogXCJwdW5jdHVhdGlvblwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiXFxcXClcIixcbiAgICAgICAgICAgIG5leHQ6IFwic3RhcnRcIlxuICAgICAgICB9XG4gICAgXSxcbiAgICBcImF0dHJpYnV0ZV9zdHJpbmdzXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgcmVnZXggOiBcIicoPz0uKVwiLFxuICAgICAgICAgICAgbmV4dCAgOiBcInFzdHJpbmdcIlxuICAgICAgICB9LCBcbiAgICAgICAge1xuICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgcmVnZXggOiAnXCIoPz0uKScsXG4gICAgICAgICAgICBuZXh0ICA6IFwicXFzdHJpbmdcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICByZWdleCA6ICcoPz1cXFxcUyknLFxuICAgICAgICAgICAgbmV4dCAgOiBcInRhZ19hdHRyaWJ1dGVzXCJcbiAgICAgICAgfVxuICAgIF0sXG4gICAgXCJxcXN0cmluZ1wiIDogW1xuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCIsXG4gICAgICAgICAgICByZWdleCA6IGVzY2FwZWRSZVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICByZWdleCA6ICdbXlwiXFxcXFxcXFxdKydcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgcmVnZXggOiBcIlxcXFxcXFxcJFwiLFxuICAgICAgICAgICAgbmV4dCAgOiBcInFxc3RyaW5nXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgcmVnZXggOiAnXCJ8JCcsXG4gICAgICAgICAgICBuZXh0ICA6IFwidGFnX2F0dHJpYnV0ZXNcIlxuICAgICAgICB9XG4gICAgXSxcbiAgICBcInFzdHJpbmdcIiA6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLFxuICAgICAgICAgICAgcmVnZXggOiBlc2NhcGVkUmVcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgcmVnZXggOiBcIlteJ1xcXFxcXFxcXStcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiXFxcXFxcXFwkXCIsXG4gICAgICAgICAgICBuZXh0ICA6IFwicXN0cmluZ1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCInfCRcIixcbiAgICAgICAgICAgIG5leHQgIDogXCJ0YWdfYXR0cmlidXRlc1wiXG4gICAgICAgIH1cbiAgICBdXG59O1xuXG4gICAgdGhpcy5lbWJlZFJ1bGVzKEphdmFTY3JpcHRIaWdobGlnaHRSdWxlcywgXCJqcy1cIiwgW3tcbiAgICAgICAgdG9rZW46IFwidGV4dFwiLFxuICAgICAgICByZWdleDogXCIuJFwiLFxuICAgICAgICBuZXh0OiBcInN0YXJ0XCJcbiAgICB9XSk7XG4vKlxuICAgIHRoaXMuZW1iZWRSdWxlcyhNYXJrZG93bkhpZ2hsaWdodFJ1bGVzLCBcIm1hcmtkb3duLVwiLCBbe1xuICAgICAgIHRva2VuIDogXCJzdXBwb3J0LmZ1bmN0aW9uXCIsXG4gICAgICAgcmVnZXggOiBcIl5cXFxcMVxcXFxzK1wiLFxuICAgICAgIGNhcHR1cmVzOiBcIjFcIixcbiAgICAgICBuZXh0ICA6IFwic3RhcnRcIlxuICAgIH1dKTtcblxuICAgIHRoaXMuZW1iZWRSdWxlcyhTYXNzSGlnaGxpZ2h0UnVsZXMsIFwic2Fzcy1cIiwgW3tcbiAgICAgICB0b2tlbiA6IFwic3VwcG9ydC5mdW5jdGlvblwiLFxuICAgICAgIHJlZ2V4IDogXCJeKD8hXFxcXDFcXFxccyspXCIsXG4gICAgICAgY2FwdHVyZXM6IFwiMVwiLFxuICAgICAgIG5leHQgIDogXCJzdGFydFwiXG4gICAgfV0pO1xuXG4gICAgdGhpcy5lbWJlZFJ1bGVzKExlc3NIaWdobGlnaHRSdWxlcywgXCJsZXNzLVwiLCBbe1xuICAgICAgIHRva2VuIDogXCJzdXBwb3J0LmZ1bmN0aW9uXCIsXG4gICAgICAgcmVnZXggOiBcIl4oPyFcXFxcMVxcXFxzKylcIixcbiAgICAgICBjYXB0dXJlczogXCIxXCIsXG4gICAgICAgbmV4dCAgOiBcInN0YXJ0XCJcbiAgICB9XSk7XG5cbiAgICB0aGlzLmVtYmVkUnVsZXMoQ29mZmVlSGlnaGxpZ2h0UnVsZXMsIFwiY29mZmVlLVwiLCBbe1xuICAgICAgIHRva2VuIDogXCJzdXBwb3J0LmZ1bmN0aW9uXCIsXG4gICAgICAgcmVnZXggOiBcIl4oPyFcXFxcMVxcXFxzKylcIixcbiAgICAgICBjYXB0dXJlczogXCIxXCIsXG4gICAgICAgbmV4dCAgOiBcInN0YXJ0XCJcbiAgICB9XSk7XG5cbiAgICB0aGlzLmVtYmVkUnVsZXMoSmF2YVNjcmlwdEhpZ2hsaWdodFJ1bGVzLCBcImpzLVwiLCBbe1xuICAgICAgIHRva2VuIDogXCJzdXBwb3J0LmZ1bmN0aW9uXCIsXG4gICAgICAgcmVnZXggOiBcIiRcIixcbiAgICAgICBjYXB0dXJlczogXCIxXCIsXG4gICAgICAgbmV4dCAgOiBcInN0YXJ0XCJcbiAgICB9XSk7ICovXG59O1xuXG5vb3AuaW5oZXJpdHMoSmFkZUhpZ2hsaWdodFJ1bGVzLCBUZXh0SGlnaGxpZ2h0UnVsZXMpO1xuXG5leHBvcnRzLkphZGVIaWdobGlnaHRSdWxlcyA9IEphZGVIaWdobGlnaHRSdWxlcztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xudmFyIENzc0hpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZSgnLi9jc3NfaGlnaGxpZ2h0X3J1bGVzJyk7XG5cbnZhciBMZXNzSGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbigpIHtcblxuXG4gICAgdmFyIGtleXdvcmRMaXN0ID0gXCJAaW1wb3J0fEBtZWRpYXxAZm9udC1mYWNlfEBrZXlmcmFtZXN8QC13ZWJraXQta2V5ZnJhbWVzfEBzdXBwb3J0c3xcIiArIFxuICAgICAgICBcIkBjaGFyc2V0fEBwbHVnaW58QG5hbWVzcGFjZXxAZG9jdW1lbnR8QHBhZ2V8QHZpZXdwb3J0fEAtbXMtdmlld3BvcnR8XCIgK1xuICAgICAgICBcIm9yfGFuZHx3aGVufG5vdFwiO1xuXG4gICAgdmFyIGtleXdvcmRzID0ga2V5d29yZExpc3Quc3BsaXQoJ3wnKTtcblxuICAgIHZhciBwcm9wZXJ0aWVzID0gQ3NzSGlnaGxpZ2h0UnVsZXMuc3VwcG9ydFR5cGUuc3BsaXQoJ3wnKTtcblxuICAgIHZhciBrZXl3b3JkTWFwcGVyID0gdGhpcy5jcmVhdGVLZXl3b3JkTWFwcGVyKHtcbiAgICAgICAgXCJzdXBwb3J0LmNvbnN0YW50XCI6IENzc0hpZ2hsaWdodFJ1bGVzLnN1cHBvcnRDb25zdGFudCxcbiAgICAgICAgXCJrZXl3b3JkXCI6IGtleXdvcmRMaXN0LFxuICAgICAgICBcInN1cHBvcnQuY29uc3RhbnQuY29sb3JcIjogQ3NzSGlnaGxpZ2h0UnVsZXMuc3VwcG9ydENvbnN0YW50Q29sb3IsXG4gICAgICAgIFwic3VwcG9ydC5jb25zdGFudC5mb250c1wiOiBDc3NIaWdobGlnaHRSdWxlcy5zdXBwb3J0Q29uc3RhbnRGb250c1xuICAgIH0sIFwiaWRlbnRpZmllclwiLCB0cnVlKTsgICBcblxuICAgIC8vIHJlZ2V4cCBtdXN0IG5vdCBoYXZlIGNhcHR1cmluZyBwYXJlbnRoZXNlcy4gVXNlICg/OikgaW5zdGVhZC5cbiAgICAvLyByZWdleHBzIGFyZSBvcmRlcmVkIC0+IHRoZSBmaXJzdCBtYXRjaCBpcyB1c2VkXG5cbiAgICB2YXIgbnVtUmUgPSBcIlxcXFwtPyg/Oig/OlswLTldKyl8KD86WzAtOV0qXFxcXC5bMC05XSspKVwiO1xuXG4gICAgLy8gcmVnZXhwIG11c3Qgbm90IGhhdmUgY2FwdHVyaW5nIHBhcmVudGhlc2VzLiBVc2UgKD86KSBpbnN0ZWFkLlxuICAgIC8vIHJlZ2V4cHMgYXJlIG9yZGVyZWQgLT4gdGhlIGZpcnN0IG1hdGNoIGlzIHVzZWRcblxuICAgIHRoaXMuJHJ1bGVzID0ge1xuICAgICAgICBcInN0YXJ0XCIgOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXC9cXFxcLy4qJFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsIC8vIG11bHRpIGxpbmUgY29tbWVudFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcL1xcXFwqXCIsXG4gICAgICAgICAgICAgICAgbmV4dCA6IFwiY29tbWVudFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLCAvLyBzaW5nbGUgbGluZVxuICAgICAgICAgICAgICAgIHJlZ2V4IDogJ1tcIl0oPzooPzpcXFxcXFxcXC4pfCg/OlteXCJcXFxcXFxcXF0pKSo/W1wiXSdcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsIC8vIHNpbmdsZSBsaW5lXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlsnXSg/Oig/OlxcXFxcXFxcLil8KD86W14nXFxcXFxcXFxdKSkqP1snXVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBbXCJjb25zdGFudC5udW1lcmljXCIsIFwia2V5d29yZFwiXSxcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiKFwiICsgbnVtUmUgKyBcIikoY2h8Y218ZGVnfGVtfGV4fGZyfGdkfGdyYWR8SHp8aW58a0h6fG1tfG1zfHBjfHB0fHB4fHJhZHxyZW18c3x0dXJufHZofHZtfHZ3fCUpXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLCAvLyBoZXg2IGNvbG9yXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIiNbYS1mMC05XXs2fVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIiwgLy8gaGV4MyBjb2xvclxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIjW2EtZjAtOV17M31cIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5udW1lcmljXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBudW1SZVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogW1wic3VwcG9ydC5mdW5jdGlvblwiLCBcInBhcmVuLmxwYXJlblwiLCBcInN0cmluZ1wiLCBcInBhcmVuLnJwYXJlblwiXSxcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiKHVybCkoXFxcXCgpKC4qKShcXFxcKSlcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogW1wic3VwcG9ydC5mdW5jdGlvblwiLCBcInBhcmVuLmxwYXJlblwiXSxcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiKDpleHRlbmR8W2EtejAtOV9cXFxcLV0rKShcXFxcKClcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGtleXdvcmRzLmluZGV4T2YodmFsdWUudG9Mb3dlckNhc2UoKSkgPiAtMSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcImtleXdvcmRcIjtcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwidmFyaWFibGVcIjtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJbQFxcXFwkXVthLXowLTlfXFxcXC1AXFxcXCRdKlxcXFxiXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwidmFyaWFibGVcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiW0BcXFxcJF1cXFxce1thLXowLTlfXFxcXC1AXFxcXCRdKlxcXFx9XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IGZ1bmN0aW9uKGZpcnN0LCBzZWNvbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYocHJvcGVydGllcy5pbmRleE9mKGZpcnN0LnRvTG93ZXJDYXNlKCkpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbXCJzdXBwb3J0LnR5cGUucHJvcGVydHlcIiwgXCJ0ZXh0XCJdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcInN1cHBvcnQudHlwZS51bmtub3duUHJvcGVydHlcIiwgXCJ0ZXh0XCJdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiKFthLXowLTktX10rKShcXFxccyo6KVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImtleXdvcmRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiJlwiICAgLy8gc3BlY2lhbCBjYXNlIC0gYWx3YXlzIHRyZWF0IGFzIGtleXdvcmRcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IGtleXdvcmRNYXBwZXIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwtP1tAYS16X11bQGEtejAtOV9cXFxcLV0qXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJ2YXJpYWJsZS5sYW5ndWFnZVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIiNbYS16MC05LV9dK1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwidmFyaWFibGUubGFuZ3VhZ2VcIixcbiAgICAgICAgICAgICAgICByZWdleDogXCJcXFxcLlthLXowLTktX10rXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJ2YXJpYWJsZS5sYW5ndWFnZVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIjpbYS16X11bYS16MC05LV9dKlwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnRcIixcbiAgICAgICAgICAgICAgICByZWdleDogXCJbYS16MC05LV9dK1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImtleXdvcmQub3BlcmF0b3JcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiPHw+fDw9fD49fD18IT18LXwlfFxcXFwrfFxcXFwqXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwicGFyZW4ubHBhcmVuXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIltbKHtdXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwicGFyZW4ucnBhcmVuXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIltcXFxcXSl9XVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXHMrXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBjYXNlSW5zZW5zaXRpdmU6IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgXCJjb21tZW50XCIgOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIiwgLy8gY2xvc2luZyBjb21tZW50XG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwqXFxcXC9cIixcbiAgICAgICAgICAgICAgICBuZXh0IDogXCJzdGFydFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuIDogXCJjb21tZW50XCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH07XG4gICAgdGhpcy5ub3JtYWxpemVSdWxlcygpO1xufTtcblxub29wLmluaGVyaXRzKExlc3NIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuZXhwb3J0cy5MZXNzSGlnaGxpZ2h0UnVsZXMgPSBMZXNzSGlnaGxpZ2h0UnVsZXM7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1vZGVzID0gcmVxdWlyZShcIi4uL2NvbmZpZ1wiKS4kbW9kZXM7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBsYW5nID0gcmVxdWlyZShcIi4uL2xpYi9sYW5nXCIpO1xudmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcbnZhciBIdG1sSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9odG1sX2hpZ2hsaWdodF9ydWxlc1wiKS5IdG1sSGlnaGxpZ2h0UnVsZXM7XG5cbnZhciBlc2NhcGVkID0gZnVuY3Rpb24oY2gpIHtcbiAgICByZXR1cm4gXCIoPzpbXlwiICsgbGFuZy5lc2NhcGVSZWdFeHAoY2gpICsgXCJcXFxcXFxcXF18XFxcXFxcXFwuKSpcIjtcbn07XG5cbnZhciBNYXJrZG93bkhpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24oKSB7XG4gICAgSHRtbEhpZ2hsaWdodFJ1bGVzLmNhbGwodGhpcyk7XG4gICAgLy8gcmVnZXhwIG11c3Qgbm90IGhhdmUgY2FwdHVyaW5nIHBhcmVudGhlc2VzXG4gICAgLy8gcmVnZXhwcyBhcmUgb3JkZXJlZCAtPiB0aGUgZmlyc3QgbWF0Y2ggaXMgdXNlZFxuICAgIHZhciBjb2RlQmxvY2tTdGFydFJ1bGUgPSB7XG4gICAgICAgIHRva2VuIDogXCJzdXBwb3J0LmZ1bmN0aW9uXCIsXG4gICAgICAgIHJlZ2V4IDogL15cXHMqKGBgYCtbXmBdKnx+fn4rW15+XSopJC8sXG4gICAgICAgIG9uTWF0Y2g6IGZ1bmN0aW9uKHZhbHVlLCBzdGF0ZSwgc3RhY2ssIGxpbmUpIHtcbiAgICAgICAgICAgIHZhciBtID0gdmFsdWUubWF0Y2goL14oXFxzKikoW2B+XSspKC4qKS8pO1xuICAgICAgICAgICAgdmFyIGxhbmd1YWdlID0gL1tcXHctXSt8JC8uZXhlYyhtWzNdKVswXTtcbiAgICAgICAgICAgIC8vIFRPRE8gbGF6eS1sb2FkIG1vZGVzXG4gICAgICAgICAgICBpZiAoIW1vZGVzW2xhbmd1YWdlXSlcbiAgICAgICAgICAgICAgICBsYW5ndWFnZSA9IFwiXCI7XG4gICAgICAgICAgICBzdGFjay51bnNoaWZ0KFwiZ2l0aHViYmxvY2tcIiwgW10sIFttWzFdLCBtWzJdLCBsYW5ndWFnZV0sIHN0YXRlKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRva2VuO1xuICAgICAgICB9LFxuICAgICAgICBuZXh0ICA6IFwiZ2l0aHViYmxvY2tcIlxuICAgIH07XG4gICAgdmFyIGNvZGVCbG9ja1J1bGVzID0gW3tcbiAgICAgICAgdG9rZW4gOiBcInN1cHBvcnQuZnVuY3Rpb25cIixcbiAgICAgICAgcmVnZXggOiBcIi4qXCIsXG4gICAgICAgIG9uTWF0Y2g6IGZ1bmN0aW9uKHZhbHVlLCBzdGF0ZSwgc3RhY2ssIGxpbmUpIHtcbiAgICAgICAgICAgIHZhciBlbWJlZFN0YXRlID0gc3RhY2tbMV07XG4gICAgICAgICAgICB2YXIgaW5kZW50ID0gc3RhY2tbMl1bMF07XG4gICAgICAgICAgICB2YXIgZW5kTWFya2VyID0gc3RhY2tbMl1bMV07XG4gICAgICAgICAgICB2YXIgbGFuZ3VhZ2UgPSBzdGFja1syXVsyXTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIG0gPSAvXihcXHMqKShgK3x+KylcXHMqJC8uZXhlYyh2YWx1ZSk7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgbSAmJiBtWzFdLmxlbmd0aCA8IGluZGVudC5sZW5ndGggKyAzXG4gICAgICAgICAgICAgICAgJiYgbVsyXS5sZW5ndGggPj0gZW5kTWFya2VyLmxlbmd0aCAmJiBtWzJdWzBdID09IGVuZE1hcmtlclswXVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgc3RhY2suc3BsaWNlKDAsIDMpO1xuICAgICAgICAgICAgICAgIHRoaXMubmV4dCA9IHN0YWNrLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9rZW47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm5leHQgPSBcIlwiO1xuICAgICAgICAgICAgaWYgKGxhbmd1YWdlICYmIG1vZGVzW2xhbmd1YWdlXSkge1xuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gbW9kZXNbbGFuZ3VhZ2VdLmdldFRva2VuaXplcigpLmdldExpbmVUb2tlbnModmFsdWUsIGVtYmVkU3RhdGUuc2xpY2UoMCkpO1xuICAgICAgICAgICAgICAgIHN0YWNrWzFdID0gZGF0YS5zdGF0ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YS50b2tlbnM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50b2tlbjtcbiAgICAgICAgfVxuICAgIH1dO1xuXG4gICAgdGhpcy4kcnVsZXNbXCJzdGFydFwiXS51bnNoaWZ0KHtcbiAgICAgICAgdG9rZW4gOiBcImVtcHR5X2xpbmVcIixcbiAgICAgICAgcmVnZXggOiAnXiQnLFxuICAgICAgICBuZXh0OiBcImFsbG93QmxvY2tcIlxuICAgIH0sIHsgLy8gaDFcbiAgICAgICAgdG9rZW46IFwibWFya3VwLmhlYWRpbmcuMVwiLFxuICAgICAgICByZWdleDogXCJePSsoPz1cXFxccyokKVwiXG4gICAgfSwgeyAvLyBoMlxuICAgICAgICB0b2tlbjogXCJtYXJrdXAuaGVhZGluZy4yXCIsXG4gICAgICAgIHJlZ2V4OiBcIl5cXFxcLSsoPz1cXFxccyokKVwiXG4gICAgfSwge1xuICAgICAgICB0b2tlbiA6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJtYXJrdXAuaGVhZGluZy5cIiArIHZhbHVlLmxlbmd0aDtcbiAgICAgICAgfSxcbiAgICAgICAgcmVnZXggOiAvXiN7MSw2fSg/PVxcc3wkKS8sXG4gICAgICAgIG5leHQgOiBcImhlYWRlclwiXG4gICAgfSxcbiAgICBjb2RlQmxvY2tTdGFydFJ1bGUsXG4gICAgeyAvLyBibG9jayBxdW90ZVxuICAgICAgICB0b2tlbiA6IFwic3RyaW5nLmJsb2NrcXVvdGVcIixcbiAgICAgICAgcmVnZXggOiBcIl5cXFxccyo+XFxcXHMqKD86WyorLV18XFxcXGQrXFxcXC4pP1xcXFxzK1wiLFxuICAgICAgICBuZXh0ICA6IFwiYmxvY2txdW90ZVwiXG4gICAgfSwgeyAvLyBIUiAqIC0gX1xuICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnRcIixcbiAgICAgICAgcmVnZXggOiBcIl4gezAsM30oPzooPzpcXFxcKiA/KXszLH18KD86XFxcXC0gPyl7Myx9fCg/OlxcXFxfID8pezMsfSlcXFxccyokXCIsXG4gICAgICAgIG5leHQ6IFwiYWxsb3dCbG9ja1wiXG4gICAgfSwgeyAvLyBsaXN0XG4gICAgICAgIHRva2VuIDogXCJtYXJrdXAubGlzdFwiLFxuICAgICAgICByZWdleCA6IFwiXlxcXFxzezAsM30oPzpbKistXXxcXFxcZCtcXFxcLilcXFxccytcIixcbiAgICAgICAgbmV4dCAgOiBcImxpc3RibG9jay1zdGFydFwiXG4gICAgfSwge1xuICAgICAgICBpbmNsdWRlIDogXCJiYXNpY1wiXG4gICAgfSk7XG5cbiAgICB0aGlzLmFkZFJ1bGVzKHtcbiAgICAgICAgXCJiYXNpY1wiIDogW3tcbiAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIixcbiAgICAgICAgICAgIHJlZ2V4IDogL1xcXFxbXFxcXGAqX3t9XFxbXFxdKCkjK1xcLS4hXS9cbiAgICAgICAgfSwgeyAvLyBjb2RlIHNwYW4gYFxuICAgICAgICAgICAgdG9rZW4gOiBcInN1cHBvcnQuZnVuY3Rpb25cIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCIoYCspKC4qP1teYF0pKFxcXFwxKVwiXG4gICAgICAgIH0sIHsgLy8gcmVmZXJlbmNlXG4gICAgICAgICAgICB0b2tlbiA6IFtcInRleHRcIiwgXCJjb25zdGFudFwiLCBcInRleHRcIiwgXCJ1cmxcIiwgXCJzdHJpbmdcIiwgXCJ0ZXh0XCJdLFxuICAgICAgICAgICAgcmVnZXggOiBcIl4oWyBdezAsM31cXFxcWykoW15cXFxcXV0rKShcXFxcXTpcXFxccyopKFteIF0rKShcXFxccyooPzpbXFxcIl1bXlxcXCJdK1tcXFwiXSk/KFxcXFxzKikpJFwiXG4gICAgICAgIH0sIHsgLy8gbGluayBieSByZWZlcmVuY2VcbiAgICAgICAgICAgIHRva2VuIDogW1widGV4dFwiLCBcInN0cmluZ1wiLCBcInRleHRcIiwgXCJjb25zdGFudFwiLCBcInRleHRcIl0sXG4gICAgICAgICAgICByZWdleCA6IFwiKFxcXFxbKShcIiArIGVzY2FwZWQoXCJdXCIpICsgXCIpKFxcXFxdXFxcXHMqXFxcXFspKFwiKyBlc2NhcGVkKFwiXVwiKSArIFwiKShcXFxcXSlcIlxuICAgICAgICB9LCB7IC8vIGxpbmsgYnkgdXJsXG4gICAgICAgICAgICB0b2tlbiA6IFtcInRleHRcIiwgXCJzdHJpbmdcIiwgXCJ0ZXh0XCIsIFwibWFya3VwLnVuZGVybGluZVwiLCBcInN0cmluZ1wiLCBcInRleHRcIl0sXG4gICAgICAgICAgICByZWdleCA6IFwiKFxcXFwhP1xcXFxbKShcIiArICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFtcbiAgICAgICAgICAgICAgICAgICAgZXNjYXBlZChcIl1cIikgKyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxpbmsgdGV4dCBvciBhbHQgdGV4dFxuICAgICAgICAgICAgICAgICAgICBcIikoXFxcXF1cXFxcKClcIisgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIF0oXG4gICAgICAgICAgICAgICAgICAgICcoKD86W15cXFxcKVxcXFxzXFxcXFxcXFxdfFxcXFxcXFxcLnxcXFxccyg/PVteXCJdKSkqKScgKyAgICAgICAgLy8gaHJlZiBvciBpbWFnZVxuICAgICAgICAgICAgICAgICAgICAnKFxcXFxzKlwiJyArICBlc2NhcGVkKCdcIicpICsgJ1wiXFxcXHMqKT8nICsgICAgICAgICAgICAvLyBcInRpdGxlXCJcbiAgICAgICAgICAgICAgICAgICAgXCIoXFxcXCkpXCIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gKVxuICAgICAgICB9LCB7IC8vIHN0cm9uZyAqKiBfX1xuICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZy5zdHJvbmdcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCIoWypdezJ9fFtfXXsyfSg/PVxcXFxTKSkoLio/XFxcXFNbKl9dKikoXFxcXDEpXCJcbiAgICAgICAgfSwgeyAvLyBlbXBoYXNpcyAqIF9cbiAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmcuZW1waGFzaXNcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCIoWypdfFtfXSg/PVxcXFxTKSkoLio/XFxcXFNbKl9dKikoXFxcXDEpXCJcbiAgICAgICAgfSwgeyAvL1xuICAgICAgICAgICAgdG9rZW4gOiBbXCJ0ZXh0XCIsIFwidXJsXCIsIFwidGV4dFwiXSxcbiAgICAgICAgICAgIHJlZ2V4IDogXCIoPCkoXCIrXG4gICAgICAgICAgICAgICAgICAgICAgXCIoPzpodHRwcz98ZnRwfGRpY3QpOlteJ1xcXCI+XFxcXHNdK1wiK1xuICAgICAgICAgICAgICAgICAgICAgIFwifFwiK1xuICAgICAgICAgICAgICAgICAgICAgIFwiKD86bWFpbHRvOik/Wy0uXFxcXHddK1xcXFxAWy1hLXowLTldKyg/OlxcXFwuWy1hLXowLTldKykqXFxcXC5bYS16XStcIitcbiAgICAgICAgICAgICAgICAgICAgXCIpKD4pXCJcbiAgICAgICAgfV0sXG5cbiAgICAgICAgLy8gY29kZSBibG9ja1xuICAgICAgICBcImFsbG93QmxvY2tcIjogW1xuICAgICAgICAgICAge3Rva2VuIDogXCJzdXBwb3J0LmZ1bmN0aW9uXCIsIHJlZ2V4IDogXCJeIHs0fS4rXCIsIG5leHQgOiBcImFsbG93QmxvY2tcIn0sXG4gICAgICAgICAgICB7dG9rZW4gOiBcImVtcHR5X2xpbmVcIiwgcmVnZXggOiAnXiQnLCBuZXh0OiBcImFsbG93QmxvY2tcIn0sXG4gICAgICAgICAgICB7dG9rZW4gOiBcImVtcHR5XCIsIHJlZ2V4IDogXCJcIiwgbmV4dCA6IFwic3RhcnRcIn1cbiAgICAgICAgXSxcblxuICAgICAgICBcImhlYWRlclwiIDogW3tcbiAgICAgICAgICAgIHJlZ2V4OiBcIiRcIixcbiAgICAgICAgICAgIG5leHQgOiBcInN0YXJ0XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaW5jbHVkZTogXCJiYXNpY1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGRlZmF1bHRUb2tlbiA6IFwiaGVhZGluZ1wiXG4gICAgICAgIH0gXSxcblxuICAgICAgICBcImxpc3RibG9jay1zdGFydFwiIDogW3tcbiAgICAgICAgICAgIHRva2VuIDogXCJzdXBwb3J0LnZhcmlhYmxlXCIsXG4gICAgICAgICAgICByZWdleCA6IC8oPzpcXFtbIHhdXFxdKT8vLFxuICAgICAgICAgICAgbmV4dCAgOiBcImxpc3RibG9ja1wiXG4gICAgICAgIH1dLFxuXG4gICAgICAgIFwibGlzdGJsb2NrXCIgOiBbIHsgLy8gTGlzdHMgb25seSBlc2NhcGUgb24gY29tcGxldGVseSBibGFuayBsaW5lcy5cbiAgICAgICAgICAgIHRva2VuIDogXCJlbXB0eV9saW5lXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiXiRcIixcbiAgICAgICAgICAgIG5leHQgIDogXCJzdGFydFwiXG4gICAgICAgIH0sIHsgLy8gbGlzdFxuICAgICAgICAgICAgdG9rZW4gOiBcIm1hcmt1cC5saXN0XCIsXG4gICAgICAgICAgICByZWdleCA6IFwiXlxcXFxzezAsM30oPzpbKistXXxcXFxcZCtcXFxcLilcXFxccytcIixcbiAgICAgICAgICAgIG5leHQgIDogXCJsaXN0YmxvY2stc3RhcnRcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpbmNsdWRlIDogXCJiYXNpY1wiLCBub0VzY2FwZTogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICBjb2RlQmxvY2tTdGFydFJ1bGUsXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRlZmF1bHRUb2tlbiA6IFwibGlzdFwiIC8vZG8gbm90IHVzZSBtYXJrdXAubGlzdCB0byBhbGxvdyBzdGxpbmcgbGVhZGluZyBgKmAgZGlmZmVybnRseVxuICAgICAgICB9IF0sXG5cbiAgICAgICAgXCJibG9ja3F1b3RlXCIgOiBbIHsgLy8gQmxvY2txdW90ZXMgb25seSBlc2NhcGUgb24gYmxhbmsgbGluZXMuXG4gICAgICAgICAgICB0b2tlbiA6IFwiZW1wdHlfbGluZVwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIl5cXFxccyokXCIsXG4gICAgICAgICAgICBuZXh0ICA6IFwic3RhcnRcIlxuICAgICAgICB9LCB7IC8vIGJsb2NrIHF1b3RlXG4gICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nLmJsb2NrcXVvdGVcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJeXFxcXHMqPlxcXFxzKig/OlsqKy1dfFxcXFxkK1xcXFwuKT9cXFxccytcIixcbiAgICAgICAgICAgIG5leHQgIDogXCJibG9ja3F1b3RlXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaW5jbHVkZSA6IFwiYmFzaWNcIiwgbm9Fc2NhcGU6IHRydWVcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgZGVmYXVsdFRva2VuIDogXCJzdHJpbmcuYmxvY2txdW90ZVwiXG4gICAgICAgIH0gXSxcblxuICAgICAgICBcImdpdGh1YmJsb2NrXCIgOiBjb2RlQmxvY2tSdWxlc1xuICAgIH0pO1xuXG4gICAgdGhpcy5ub3JtYWxpemVSdWxlcygpO1xufTtcbm9vcC5pbmhlcml0cyhNYXJrZG93bkhpZ2hsaWdodFJ1bGVzLCBUZXh0SGlnaGxpZ2h0UnVsZXMpO1xuXG5leHBvcnRzLk1hcmtkb3duSGlnaGxpZ2h0UnVsZXMgPSBNYXJrZG93bkhpZ2hsaWdodFJ1bGVzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBsYW5nID0gcmVxdWlyZShcIi4uL2xpYi9sYW5nXCIpO1xudmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcbnZhciBDc3NIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL2Nzc19oaWdobGlnaHRfcnVsZXNcIik7XG5cbnZhciBTY3NzSGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbigpIHtcbiAgICBcbiAgICB2YXIgcHJvcGVydGllcyA9IGxhbmcuYXJyYXlUb01hcChDc3NIaWdobGlnaHRSdWxlcy5zdXBwb3J0VHlwZS5zcGxpdChcInxcIikpO1xuXG4gICAgdmFyIGZ1bmN0aW9ucyA9IGxhbmcuYXJyYXlUb01hcChcbiAgICAgICAgKFwiaHNsfGhzbGF8cmdifHJnYmF8dXJsfGF0dHJ8Y291bnRlcnxjb3VudGVyc3xhYnN8YWRqdXN0X2NvbG9yfGFkanVzdF9odWV8XCIgK1xuICAgICAgICAgXCJhbHBoYXxqb2lufGJsdWV8Y2VpbHxjaGFuZ2VfY29sb3J8Y29tcGFyYWJsZXxjb21wbGVtZW50fGRhcmtlbnxkZXNhdHVyYXRlfFwiICsgXG4gICAgICAgICBcImZsb29yfGdyYXlzY2FsZXxncmVlbnxodWV8aWZ8aW52ZXJ0fGpvaW58bGVuZ3RofGxpZ2h0ZW58bGlnaHRuZXNzfG1peHxcIiArIFxuICAgICAgICAgXCJudGh8b3BhY2lmeXxvcGFjaXR5fHBlcmNlbnRhZ2V8cXVvdGV8cmVkfHJvdW5kfHNhdHVyYXRlfHNhdHVyYXRpb258XCIgK1xuICAgICAgICAgXCJzY2FsZV9jb2xvcnx0cmFuc3BhcmVudGl6ZXx0eXBlX29mfHVuaXR8dW5pdGxlc3N8dW5xdW90ZVwiKS5zcGxpdChcInxcIilcbiAgICApO1xuXG4gICAgdmFyIGNvbnN0YW50cyA9IGxhbmcuYXJyYXlUb01hcChDc3NIaWdobGlnaHRSdWxlcy5zdXBwb3J0Q29uc3RhbnQuc3BsaXQoXCJ8XCIpKTtcblxuICAgIHZhciBjb2xvcnMgPSBsYW5nLmFycmF5VG9NYXAoQ3NzSGlnaGxpZ2h0UnVsZXMuc3VwcG9ydENvbnN0YW50Q29sb3Iuc3BsaXQoXCJ8XCIpKTtcbiAgICBcbiAgICB2YXIga2V5d29yZHMgPSBsYW5nLmFycmF5VG9NYXAoXG4gICAgICAgIChcIkBtaXhpbnxAZXh0ZW5kfEBpbmNsdWRlfEBpbXBvcnR8QG1lZGlhfEBkZWJ1Z3xAd2FybnxAaWZ8QGZvcnxAZWFjaHxAd2hpbGV8QGVsc2V8QGZvbnQtZmFjZXxALXdlYmtpdC1rZXlmcmFtZXN8aWZ8YW5kfCFkZWZhdWx0fG1vZHVsZXxkZWZ8ZW5kfGRlY2xhcmVcIikuc3BsaXQoXCJ8XCIpXG4gICAgKTtcbiAgICBcbiAgICB2YXIgdGFncyA9IGxhbmcuYXJyYXlUb01hcChcbiAgICAgICAgKFwiYXxhYmJyfGFjcm9ueW18YWRkcmVzc3xhcHBsZXR8YXJlYXxhcnRpY2xlfGFzaWRlfGF1ZGlvfGJ8YmFzZXxiYXNlZm9udHxiZG98XCIgKyBcbiAgICAgICAgIFwiYmlnfGJsb2NrcXVvdGV8Ym9keXxicnxidXR0b258Y2FudmFzfGNhcHRpb258Y2VudGVyfGNpdGV8Y29kZXxjb2x8Y29sZ3JvdXB8XCIgKyBcbiAgICAgICAgIFwiY29tbWFuZHxkYXRhbGlzdHxkZHxkZWx8ZGV0YWlsc3xkZm58ZGlyfGRpdnxkbHxkdHxlbXxlbWJlZHxmaWVsZHNldHxcIiArIFxuICAgICAgICAgXCJmaWdjYXB0aW9ufGZpZ3VyZXxmb250fGZvb3Rlcnxmb3JtfGZyYW1lfGZyYW1lc2V0fGgxfGgyfGgzfGg0fGg1fGg2fGhlYWR8XCIgKyBcbiAgICAgICAgIFwiaGVhZGVyfGhncm91cHxocnxodG1sfGl8aWZyYW1lfGltZ3xpbnB1dHxpbnN8a2V5Z2VufGtiZHxsYWJlbHxsZWdlbmR8bGl8XCIgKyBcbiAgICAgICAgIFwibGlua3xtYXB8bWFya3xtZW51fG1ldGF8bWV0ZXJ8bmF2fG5vZnJhbWVzfG5vc2NyaXB0fG9iamVjdHxvbHxvcHRncm91cHxcIiArIFxuICAgICAgICAgXCJvcHRpb258b3V0cHV0fHB8cGFyYW18cHJlfHByb2dyZXNzfHF8cnB8cnR8cnVieXxzfHNhbXB8c2NyaXB0fHNlY3Rpb258c2VsZWN0fFwiICsgXG4gICAgICAgICBcInNtYWxsfHNvdXJjZXxzcGFufHN0cmlrZXxzdHJvbmd8c3R5bGV8c3VifHN1bW1hcnl8c3VwfHRhYmxlfHRib2R5fHRkfFwiICsgXG4gICAgICAgICBcInRleHRhcmVhfHRmb290fHRofHRoZWFkfHRpbWV8dGl0bGV8dHJ8dHR8dXx1bHx2YXJ8dmlkZW98d2JyfHhtcFwiKS5zcGxpdChcInxcIilcbiAgICApO1xuXG4gICAgLy8gcmVnZXhwIG11c3Qgbm90IGhhdmUgY2FwdHVyaW5nIHBhcmVudGhlc2VzLiBVc2UgKD86KSBpbnN0ZWFkLlxuICAgIC8vIHJlZ2V4cHMgYXJlIG9yZGVyZWQgLT4gdGhlIGZpcnN0IG1hdGNoIGlzIHVzZWRcblxuICAgIHZhciBudW1SZSA9IFwiXFxcXC0/KD86KD86WzAtOV0rKXwoPzpbMC05XSpcXFxcLlswLTldKykpXCI7XG5cbiAgICAvLyByZWdleHAgbXVzdCBub3QgaGF2ZSBjYXB0dXJpbmcgcGFyZW50aGVzZXMuIFVzZSAoPzopIGluc3RlYWQuXG4gICAgLy8gcmVnZXhwcyBhcmUgb3JkZXJlZCAtPiB0aGUgZmlyc3QgbWF0Y2ggaXMgdXNlZFxuXG4gICAgdGhpcy4kcnVsZXMgPSB7XG4gICAgICAgIFwic3RhcnRcIiA6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcL1xcXFwvLiokXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIiwgLy8gbXVsdGkgbGluZSBjb21tZW50XG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwvXFxcXCpcIixcbiAgICAgICAgICAgICAgICBuZXh0IDogXCJjb21tZW50XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsIC8vIHNpbmdsZSBsaW5lXG4gICAgICAgICAgICAgICAgcmVnZXggOiAnW1wiXSg/Oig/OlxcXFxcXFxcLil8KD86W15cIlxcXFxcXFxcXSkpKj9bXCJdJ1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIiwgLy8gbXVsdGkgbGluZSBzdHJpbmcgc3RhcnRcbiAgICAgICAgICAgICAgICByZWdleCA6ICdbXCJdLipcXFxcXFxcXCQnLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcInFxc3RyaW5nXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsIC8vIHNpbmdsZSBsaW5lXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlsnXSg/Oig/OlxcXFxcXFxcLil8KD86W14nXFxcXFxcXFxdKSkqP1snXVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLCAvLyBtdWx0aSBsaW5lIHN0cmluZyBzdGFydFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJbJ10uKlxcXFxcXFxcJFwiLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcInFzdHJpbmdcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5udW1lcmljXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBudW1SZSArIFwiKD86Y2h8Y218ZGVnfGVtfGV4fGZyfGdkfGdyYWR8SHp8aW58a0h6fG1tfG1zfHBjfHB0fHB4fHJhZHxyZW18c3x0dXJufHZofHZtYXh8dm1pbnx2bXx2d3wlKVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIiwgLy8gaGV4NiBjb2xvclxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIjW2EtZjAtOV17Nn1cIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5udW1lcmljXCIsIC8vIGhleDMgY29sb3JcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiI1thLWYwLTldezN9XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogbnVtUmVcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFtcInN1cHBvcnQuZnVuY3Rpb25cIiwgXCJzdHJpbmdcIiwgXCJzdXBwb3J0LmZ1bmN0aW9uXCJdLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIodXJsXFxcXCgpKC4qKShcXFxcKSlcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BlcnRpZXMuaGFzT3duUHJvcGVydHkodmFsdWUudG9Mb3dlckNhc2UoKSkpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJzdXBwb3J0LnR5cGVcIjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGtleXdvcmRzLmhhc093blByb3BlcnR5KHZhbHVlKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcImtleXdvcmRcIjtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoY29uc3RhbnRzLmhhc093blByb3BlcnR5KHZhbHVlKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcImNvbnN0YW50Lmxhbmd1YWdlXCI7XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGZ1bmN0aW9ucy5oYXNPd25Qcm9wZXJ0eSh2YWx1ZSkpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJzdXBwb3J0LmZ1bmN0aW9uXCI7XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNvbG9ycy5oYXNPd25Qcm9wZXJ0eSh2YWx1ZS50b0xvd2VyQ2FzZSgpKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcInN1cHBvcnQuY29uc3RhbnQuY29sb3JcIjtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodGFncy5oYXNPd25Qcm9wZXJ0eSh2YWx1ZS50b0xvd2VyQ2FzZSgpKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcInZhcmlhYmxlLmxhbmd1YWdlXCI7XG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcInRleHRcIjtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcLT9bQGEtel9dW0BhLXowLTlfXFxcXC1dKlwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInZhcmlhYmxlXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlthLXpfXFxcXC0kXVthLXowLTlfXFxcXC0kXSpcXFxcYlwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwidmFyaWFibGUubGFuZ3VhZ2VcIixcbiAgICAgICAgICAgICAgICByZWdleDogXCIjW2EtejAtOS1fXStcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInZhcmlhYmxlLmxhbmd1YWdlXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiXFxcXC5bYS16MC05LV9dK1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwidmFyaWFibGUubGFuZ3VhZ2VcIixcbiAgICAgICAgICAgICAgICByZWdleDogXCI6W2EtejAtOS1fXStcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50XCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiW2EtejAtOS1fXStcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIjx8Pnw8PXw+PXw9PXwhPXwtfCV8I3xcXFxcK3xcXFxcJHxcXFxcK3xcXFxcKlwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInBhcmVuLmxwYXJlblwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJbWyh7XVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInBhcmVuLnJwYXJlblwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJbXFxcXF0pfV1cIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFxzK1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgY2FzZUluc2Vuc2l0aXZlOiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIFwiY29tbWVudFwiIDogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsIC8vIGNsb3NpbmcgY29tbWVudFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcKlxcXFwvXCIsXG4gICAgICAgICAgICAgICAgbmV4dCA6IFwic3RhcnRcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbiA6IFwiY29tbWVudFwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIFwicXFzdHJpbmdcIiA6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAnKD86KD86XFxcXFxcXFwuKXwoPzpbXlwiXFxcXFxcXFxdKSkqP1wiJyxcbiAgICAgICAgICAgICAgICBuZXh0IDogXCJzdGFydFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogJy4rJ1xuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBcInFzdHJpbmdcIiA6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIig/Oig/OlxcXFxcXFxcLil8KD86W14nXFxcXFxcXFxdKSkqPydcIixcbiAgICAgICAgICAgICAgICBuZXh0IDogXCJzdGFydFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogJy4rJ1xuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfTtcbn07XG5cbm9vcC5pbmhlcml0cyhTY3NzSGlnaGxpZ2h0UnVsZXMsIFRleHRIaWdobGlnaHRSdWxlcyk7XG5cbmV4cG9ydHMuU2Nzc0hpZ2hsaWdodFJ1bGVzID0gU2Nzc0hpZ2hsaWdodFJ1bGVzO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9