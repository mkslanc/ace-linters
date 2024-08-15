"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[8259],{

/***/ 42124:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

var DocCommentHighlightRules = function () {
    this.$rules = {
        "start": [
            {
                token: "comment.doc.tag",
                regex: "@\\w+(?=\\s|$)"
            }, DocCommentHighlightRules.getTagRule(), {
                defaultToken: "comment.doc.body",
                caseInsensitive: true
            }
        ]
    };
};

oop.inherits(DocCommentHighlightRules, TextHighlightRules);

DocCommentHighlightRules.getTagRule = function(start) {
    return {
        token : "comment.doc.tag.storage.type",
        regex : "\\b(?:TODO|FIXME|XXX|HACK)\\b"
    };
};

DocCommentHighlightRules.getStartRule = function(start) {
    return {
        token : "comment.doc", // doc comment
        regex: /\/\*\*(?!\/)/,
        next  : start
    };
};

DocCommentHighlightRules.getEndRule = function (start) {
    return {
        token : "comment.doc", // closing comment
        regex : "\\*\\/",
        next  : start
    };
};


exports.l = DocCommentHighlightRules;


/***/ }),

/***/ 52649:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var CStyleFoldMode = (__webpack_require__(93887)/* .FoldMode */ .l);
var Range = (__webpack_require__(91902)/* .Range */ .Q);

var FoldMode = exports.l = function() {};
oop.inherits(FoldMode, CStyleFoldMode);

(function() {
    this.importRegex = /^import /;
    this.getCStyleFoldWidget = this.getFoldWidget;
    this.getFoldWidget = function(session, foldStyle, row) {
        if (foldStyle === "markbegin") {
            var line = session.getLine(row);
            if (this.importRegex.test(line)) {
                if (row == 0 || !this.importRegex.test(session.getLine(row - 1)))
                    return "start";
            }
        }

        return this.getCStyleFoldWidget(session, foldStyle, row);
    };
    
    this.getCstyleFoldWidgetRange = this.getFoldWidgetRange;
    this.getFoldWidgetRange = function(session, foldStyle, row, forceMultiline) {
        var line = session.getLine(row);
        var match = line.match(this.importRegex);
        if (!match || foldStyle !== "markbegin")
            return this.getCstyleFoldWidgetRange(session, foldStyle, row, forceMultiline);

        var startColumn = match[0].length;
        var maxRow = session.getLength();
        var startRow = row;
        var endRow = row;

        while (++row < maxRow) {
            var line = session.getLine(row);
            if (line.match(/^\s*$/))
                continue;

            if (!line.match(this.importRegex))
                break;

            endRow = row;
        }

        if (endRow > startRow) {
            var endColumn = session.getLine(endRow).length;
            return new Range(startRow, startColumn, endRow, endColumn);
        }
    };

}).call(FoldMode.prototype);


/***/ }),

/***/ 38259:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var JavaScriptMode = (__webpack_require__(93388).Mode);
var JavaHighlightRules = (__webpack_require__(12712)/* .JavaHighlightRules */ .m);
var JavaFoldMode = (__webpack_require__(52649)/* .FoldMode */ .l);

var Mode = function() {
    JavaScriptMode.call(this);
    this.HighlightRules = JavaHighlightRules;
    this.foldingRules = new JavaFoldMode();
};
oop.inherits(Mode, JavaScriptMode);

(function() {
    
    this.createWorker = function(session) {
        return null;
    };

    this.$id = "ace/mode/java";
    this.snippetFileId = "ace/snippets/java";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 12712:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var DocCommentHighlightRules = (__webpack_require__(42124)/* .DocCommentHighlightRules */ .l);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

var JavaHighlightRules = function() {
    var identifierRe = "[a-zA-Z_$][a-zA-Z0-9_$]*";

    // taken from http://download.oracle.com/javase/tutorial/java/nutsandbolts/_keywords.html
    var keywords = (
    "abstract|continue|for|new|switch|" +
    "assert|default|goto|package|synchronized|" +
    "boolean|do|if|private|this|" +
    "break|double|implements|protected|throw|" +
    "byte|else|import|public|throws|" +
    "case|enum|instanceof|return|transient|" +
    "catch|extends|int|short|try|" +
    "char|final|interface|static|void|" +
    "class|finally|long|strictfp|volatile|" +
    "const|float|native|super|while|" +
    "var|exports|opens|requires|uses|yield|" +
    "module|permits|(?:non\\-)?sealed|var|" +
    "provides|to|when|" +
    "open|record|transitive|with"    
    );

    var buildinConstants = ("null|Infinity|NaN|undefined");


    var langClasses = (
        "AbstractMethodError|AssertionError|ClassCircularityError|"+
        "ClassFormatError|Deprecated|EnumConstantNotPresentException|"+
        "ExceptionInInitializerError|IllegalAccessError|"+
        "IllegalThreadStateException|InstantiationError|InternalError|"+
        "NegativeArraySizeException|NoSuchFieldError|Override|Process|"+
        "ProcessBuilder|SecurityManager|StringIndexOutOfBoundsException|"+
        "SuppressWarnings|TypeNotPresentException|UnknownError|"+
        "UnsatisfiedLinkError|UnsupportedClassVersionError|VerifyError|"+
        "InstantiationException|IndexOutOfBoundsException|"+
        "ArrayIndexOutOfBoundsException|CloneNotSupportedException|"+
        "NoSuchFieldException|IllegalArgumentException|NumberFormatException|"+
        "SecurityException|Void|InheritableThreadLocal|IllegalStateException|"+
        "InterruptedException|NoSuchMethodException|IllegalAccessException|"+
        "UnsupportedOperationException|Enum|StrictMath|Package|Compiler|"+
        "Readable|Runtime|StringBuilder|Math|IncompatibleClassChangeError|"+
        "NoSuchMethodError|ThreadLocal|RuntimePermission|ArithmeticException|"+
        "NullPointerException|Long|Integer|Short|Byte|Double|Number|Float|"+
        "Character|Boolean|StackTraceElement|Appendable|StringBuffer|"+
        "Iterable|ThreadGroup|Runnable|Thread|IllegalMonitorStateException|"+
        "StackOverflowError|OutOfMemoryError|VirtualMachineError|"+
        "ArrayStoreException|ClassCastException|LinkageError|"+
        "NoClassDefFoundError|ClassNotFoundException|RuntimeException|"+
        "Exception|ThreadDeath|Error|Throwable|System|ClassLoader|"+
        "Cloneable|Class|CharSequence|Comparable|String|Object"
    );

    var keywordMapper = this.createKeywordMapper({
        "variable.language": "this",
        "constant.language": buildinConstants,
        "support.function": langClasses
    }, "identifier");

    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used

    this.$rules = {
        "start" : [
            {
                token : "comment",
                regex : "\\/\\/.*$"
            },
            DocCommentHighlightRules.getStartRule("doc-start"),
            {
                token : "comment", // multi line comment
                regex : "\\/\\*",
                next : "comment"
            },
            {include: "multiline-strings"},
            {include: "strings"},
            {include: "constants"},
            {
                regex: "(open(?:\\s+))?module(?=\\s*\\w)",
                token: "keyword",
                next: [{
                    regex: "{",
                    token: "paren.lparen",
                    next: [{
                        regex: "}",
                        token: "paren.rparen",
                        next: "start"
                    }, {
                        // From Section 3.9 of http://cr.openjdk.java.net/~mr/jigsaw/spec/java-se-9-jls-diffs.pdf
                        regex: "\\b(requires|transitive|exports|opens|to|uses|provides|with)\\b",
                        token: "keyword" 
                    }]
                }, {
                    token : "text",
                    regex : "\\s+"
                }, {
                    token : "identifier",
                    regex : "\\w+"
                }, {
                    token : "punctuation.operator",
                    regex : "."
                }, {
                    token : "text",
                    regex : "\\s+"
                }, {
                    regex: "", // exit if there is anything else
                    next: "start"
                }]
            },
            {include: "statements"}
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
        "strings": [
            {
                token: ["punctuation", "string"],
                regex: /(\.)(")/,
                push: [
                    {
                        token: "lparen",
                        regex: /\\\{/,
                        push: [
                            {
                                token: "text",
                                regex: /$/,
                                next: "start"
                            }, {
                                token: "rparen",
                                regex: /}/,
                                next: "pop"
                            }, {
                                include: "strings"
                            }, {
                                include: "constants"
                            }, {
                                include: "statements"
                            }
                        ]
                    }, {
                        token: "string",
                        regex: /"/,
                        next: "pop"
                    }, {
                        defaultToken: "string"
                    }
                ]
            },  {
                token : "string", // single line
                regex : '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'
            }, {
                token : "string", // single line
                regex : "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"
            }
        ],
        "multiline-strings": [
            {
                token: ["punctuation", "string"],
                regex: /(\.)(""")/,
                push: [
                    {
                        token: "string",
                        regex: '"""',
                        next: "pop"
                    }, {
                        token: "lparen",
                        regex: /\\\{/,
                        push: [
                            {
                                token: "text",
                                regex: /$/,
                                next: "start"
                            }, {
                                token: "rparen",
                                regex: /}/,
                                next: "pop"
                            }, {
                                include: "multiline-strings"
                            }, {
                                include: "strings"
                            }, {
                                include: "constants"
                            }, {
                                include: "statements"
                            }
                        ]
                    }, {
                        token: "constant.language.escape",
                        regex: /\\./
                    }, {
                        defaultToken: "string"
                    }
                ]
            },
            {
                token: "string",
                regex: '"""',
                push: [
                    {
                        token: "string",
                        regex: '"""',
                        next: "pop"
                    }, {
                        token : "constant.language.escape",
                        regex : /\\./
                    }, {
                        defaultToken: "string"
                    }
                ]
            }
        ],
        "constants": [
            {
                token: "constant.numeric", // hex
                regex: /0(?:[xX][0-9a-fA-F][0-9a-fA-F_]*|[bB][01][01_]*)[LlSsDdFfYy]?\b/
            }, {
                token: "constant.numeric", // float
                regex: /[+-]?\d[\d_]*(?:(?:\.[\d_]*)?(?:[eE][+-]?[\d_]+)?)?[LlSsDdFfYy]?\b/
            }, {
                token: "constant.language.boolean",
                regex: "(?:true|false)\\b"
            }
        ],
        "statements": [
            {
                token: ["keyword", "text", "identifier"],
                regex: "(record)(\\s+)("+identifierRe+")\\b"
            },
            {
                token: "keyword",
                regex: "(?:" + keywords + ")\\b"
            }, {//annotations
                token: "storage.type.annotation",
                regex: "@" + identifierRe + "\\b"
            }, {
                token: "entity.name.function",
                regex: identifierRe + "(?=\\()"
            }, {
                token: keywordMapper, // TODO: Unicode escape sequences
                // TODO: Unicode identifiers
                regex: identifierRe + "\\b"
            }, {
                token: "keyword.operator",
                regex: "!|\\$|%|&|\\||\\^|\\*|\\/|\\-\\-|\\-|\\+\\+|\\+|~|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\\|\\||\\?|\\:|\\*=|\\/=|%=|\\+=|\\-=|&=|\\|=|\\^=|\\b(?:in|instanceof|new|delete|typeof|void)"
            }, {
                token: "lparen",
                regex: "[[({]"
            }, {
                token: "rparen",
                regex: "[\\])}]"
            }, {
                token: "text",
                regex: "\\s+"
            }
        ]
    };

    
    this.embedRules(DocCommentHighlightRules, "doc-",
        [ DocCommentHighlightRules.getEndRule("start") ]);
    this.normalizeRules();
};

oop.inherits(JavaHighlightRules, TextHighlightRules);

exports.m = JavaHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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cUI7QUFDckI7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQSxvQ0FBb0M7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBLHlDQUF5QztBQUN6QztBQUNBLDZCQUE2QjtBQUM3QjtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYSxHQUFHO0FBQ2hCO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLDRCQUE0QjtBQUM1QixhQUFhO0FBQ2I7QUFDQSw4QkFBOEI7QUFDOUIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxTQUEwQiIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvZG9jX2NvbW1lbnRfaGlnaGxpZ2h0X3J1bGVzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvZm9sZGluZy9qYXZhLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvamF2YS5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2phdmFfaGlnaGxpZ2h0X3J1bGVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xuXG52YXIgRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuJHJ1bGVzID0ge1xuICAgICAgICBcInN0YXJ0XCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJjb21tZW50LmRvYy50YWdcIixcbiAgICAgICAgICAgICAgICByZWdleDogXCJAXFxcXHcrKD89XFxcXHN8JClcIlxuICAgICAgICAgICAgfSwgRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLmdldFRhZ1J1bGUoKSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJjb21tZW50LmRvYy5ib2R5XCIsXG4gICAgICAgICAgICAgICAgY2FzZUluc2Vuc2l0aXZlOiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9O1xufTtcblxub29wLmluaGVyaXRzKERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLmdldFRhZ1J1bGUgPSBmdW5jdGlvbihzdGFydCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHRva2VuIDogXCJjb21tZW50LmRvYy50YWcuc3RvcmFnZS50eXBlXCIsXG4gICAgICAgIHJlZ2V4IDogXCJcXFxcYig/OlRPRE98RklYTUV8WFhYfEhBQ0spXFxcXGJcIlxuICAgIH07XG59O1xuXG5Eb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMuZ2V0U3RhcnRSdWxlID0gZnVuY3Rpb24oc3RhcnQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0b2tlbiA6IFwiY29tbWVudC5kb2NcIiwgLy8gZG9jIGNvbW1lbnRcbiAgICAgICAgcmVnZXg6IC9cXC9cXCpcXCooPyFcXC8pLyxcbiAgICAgICAgbmV4dCAgOiBzdGFydFxuICAgIH07XG59O1xuXG5Eb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMuZ2V0RW5kUnVsZSA9IGZ1bmN0aW9uIChzdGFydCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHRva2VuIDogXCJjb21tZW50LmRvY1wiLCAvLyBjbG9zaW5nIGNvbW1lbnRcbiAgICAgICAgcmVnZXggOiBcIlxcXFwqXFxcXC9cIixcbiAgICAgICAgbmV4dCAgOiBzdGFydFxuICAgIH07XG59O1xuXG5cbmV4cG9ydHMuRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzID0gRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vLi4vbGliL29vcFwiKTtcbnZhciBDU3R5bGVGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2NzdHlsZVwiKS5Gb2xkTW9kZTtcbnZhciBSYW5nZSA9IHJlcXVpcmUoXCIuLi8uLi9yYW5nZVwiKS5SYW5nZTtcblxudmFyIEZvbGRNb2RlID0gZXhwb3J0cy5Gb2xkTW9kZSA9IGZ1bmN0aW9uKCkge307XG5vb3AuaW5oZXJpdHMoRm9sZE1vZGUsIENTdHlsZUZvbGRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuaW1wb3J0UmVnZXggPSAvXmltcG9ydCAvO1xuICAgIHRoaXMuZ2V0Q1N0eWxlRm9sZFdpZGdldCA9IHRoaXMuZ2V0Rm9sZFdpZGdldDtcbiAgICB0aGlzLmdldEZvbGRXaWRnZXQgPSBmdW5jdGlvbihzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdykge1xuICAgICAgICBpZiAoZm9sZFN0eWxlID09PSBcIm1hcmtiZWdpblwiKSB7XG4gICAgICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICAgICAgaWYgKHRoaXMuaW1wb3J0UmVnZXgudGVzdChsaW5lKSkge1xuICAgICAgICAgICAgICAgIGlmIChyb3cgPT0gMCB8fCAhdGhpcy5pbXBvcnRSZWdleC50ZXN0KHNlc3Npb24uZ2V0TGluZShyb3cgLSAxKSkpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcInN0YXJ0XCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5nZXRDU3R5bGVGb2xkV2lkZ2V0KHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KTtcbiAgICB9O1xuICAgIFxuICAgIHRoaXMuZ2V0Q3N0eWxlRm9sZFdpZGdldFJhbmdlID0gdGhpcy5nZXRGb2xkV2lkZ2V0UmFuZ2U7XG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0UmFuZ2UgPSBmdW5jdGlvbihzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdywgZm9yY2VNdWx0aWxpbmUpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCh0aGlzLmltcG9ydFJlZ2V4KTtcbiAgICAgICAgaWYgKCFtYXRjaCB8fCBmb2xkU3R5bGUgIT09IFwibWFya2JlZ2luXCIpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRDc3R5bGVGb2xkV2lkZ2V0UmFuZ2Uoc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3csIGZvcmNlTXVsdGlsaW5lKTtcblxuICAgICAgICB2YXIgc3RhcnRDb2x1bW4gPSBtYXRjaFswXS5sZW5ndGg7XG4gICAgICAgIHZhciBtYXhSb3cgPSBzZXNzaW9uLmdldExlbmd0aCgpO1xuICAgICAgICB2YXIgc3RhcnRSb3cgPSByb3c7XG4gICAgICAgIHZhciBlbmRSb3cgPSByb3c7XG5cbiAgICAgICAgd2hpbGUgKCsrcm93IDwgbWF4Um93KSB7XG4gICAgICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICAgICAgaWYgKGxpbmUubWF0Y2goL15cXHMqJC8pKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICBpZiAoIWxpbmUubWF0Y2godGhpcy5pbXBvcnRSZWdleCkpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGVuZFJvdyA9IHJvdztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbmRSb3cgPiBzdGFydFJvdykge1xuICAgICAgICAgICAgdmFyIGVuZENvbHVtbiA9IHNlc3Npb24uZ2V0TGluZShlbmRSb3cpLmxlbmd0aDtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmFuZ2Uoc3RhcnRSb3csIHN0YXJ0Q29sdW1uLCBlbmRSb3csIGVuZENvbHVtbik7XG4gICAgICAgIH1cbiAgICB9O1xuXG59KS5jYWxsKEZvbGRNb2RlLnByb3RvdHlwZSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIEphdmFTY3JpcHRNb2RlID0gcmVxdWlyZShcIi4vamF2YXNjcmlwdFwiKS5Nb2RlO1xudmFyIEphdmFIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL2phdmFfaGlnaGxpZ2h0X3J1bGVzXCIpLkphdmFIaWdobGlnaHRSdWxlcztcbnZhciBKYXZhRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9mb2xkaW5nL2phdmFcIikuRm9sZE1vZGU7XG5cbnZhciBNb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgSmF2YVNjcmlwdE1vZGUuY2FsbCh0aGlzKTtcbiAgICB0aGlzLkhpZ2hsaWdodFJ1bGVzID0gSmF2YUhpZ2hsaWdodFJ1bGVzO1xuICAgIHRoaXMuZm9sZGluZ1J1bGVzID0gbmV3IEphdmFGb2xkTW9kZSgpO1xufTtcbm9vcC5pbmhlcml0cyhNb2RlLCBKYXZhU2NyaXB0TW9kZSk7XG5cbihmdW5jdGlvbigpIHtcbiAgICBcbiAgICB0aGlzLmNyZWF0ZVdvcmtlciA9IGZ1bmN0aW9uKHNlc3Npb24pIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcblxuICAgIHRoaXMuJGlkID0gXCJhY2UvbW9kZS9qYXZhXCI7XG4gICAgdGhpcy5zbmlwcGV0RmlsZUlkID0gXCJhY2Uvc25pcHBldHMvamF2YVwiO1xufSkuY2FsbChNb2RlLnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTW9kZSA9IE1vZGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL2RvY19jb21tZW50X2hpZ2hsaWdodF9ydWxlc1wiKS5Eb2NDb21tZW50SGlnaGxpZ2h0UnVsZXM7XG52YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xuXG52YXIgSmF2YUhpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGlkZW50aWZpZXJSZSA9IFwiW2EtekEtWl8kXVthLXpBLVowLTlfJF0qXCI7XG5cbiAgICAvLyB0YWtlbiBmcm9tIGh0dHA6Ly9kb3dubG9hZC5vcmFjbGUuY29tL2phdmFzZS90dXRvcmlhbC9qYXZhL251dHNhbmRib2x0cy9fa2V5d29yZHMuaHRtbFxuICAgIHZhciBrZXl3b3JkcyA9IChcbiAgICBcImFic3RyYWN0fGNvbnRpbnVlfGZvcnxuZXd8c3dpdGNofFwiICtcbiAgICBcImFzc2VydHxkZWZhdWx0fGdvdG98cGFja2FnZXxzeW5jaHJvbml6ZWR8XCIgK1xuICAgIFwiYm9vbGVhbnxkb3xpZnxwcml2YXRlfHRoaXN8XCIgK1xuICAgIFwiYnJlYWt8ZG91YmxlfGltcGxlbWVudHN8cHJvdGVjdGVkfHRocm93fFwiICtcbiAgICBcImJ5dGV8ZWxzZXxpbXBvcnR8cHVibGljfHRocm93c3xcIiArXG4gICAgXCJjYXNlfGVudW18aW5zdGFuY2VvZnxyZXR1cm58dHJhbnNpZW50fFwiICtcbiAgICBcImNhdGNofGV4dGVuZHN8aW50fHNob3J0fHRyeXxcIiArXG4gICAgXCJjaGFyfGZpbmFsfGludGVyZmFjZXxzdGF0aWN8dm9pZHxcIiArXG4gICAgXCJjbGFzc3xmaW5hbGx5fGxvbmd8c3RyaWN0ZnB8dm9sYXRpbGV8XCIgK1xuICAgIFwiY29uc3R8ZmxvYXR8bmF0aXZlfHN1cGVyfHdoaWxlfFwiICtcbiAgICBcInZhcnxleHBvcnRzfG9wZW5zfHJlcXVpcmVzfHVzZXN8eWllbGR8XCIgK1xuICAgIFwibW9kdWxlfHBlcm1pdHN8KD86bm9uXFxcXC0pP3NlYWxlZHx2YXJ8XCIgK1xuICAgIFwicHJvdmlkZXN8dG98d2hlbnxcIiArXG4gICAgXCJvcGVufHJlY29yZHx0cmFuc2l0aXZlfHdpdGhcIiAgICBcbiAgICApO1xuXG4gICAgdmFyIGJ1aWxkaW5Db25zdGFudHMgPSAoXCJudWxsfEluZmluaXR5fE5hTnx1bmRlZmluZWRcIik7XG5cblxuICAgIHZhciBsYW5nQ2xhc3NlcyA9IChcbiAgICAgICAgXCJBYnN0cmFjdE1ldGhvZEVycm9yfEFzc2VydGlvbkVycm9yfENsYXNzQ2lyY3VsYXJpdHlFcnJvcnxcIitcbiAgICAgICAgXCJDbGFzc0Zvcm1hdEVycm9yfERlcHJlY2F0ZWR8RW51bUNvbnN0YW50Tm90UHJlc2VudEV4Y2VwdGlvbnxcIitcbiAgICAgICAgXCJFeGNlcHRpb25JbkluaXRpYWxpemVyRXJyb3J8SWxsZWdhbEFjY2Vzc0Vycm9yfFwiK1xuICAgICAgICBcIklsbGVnYWxUaHJlYWRTdGF0ZUV4Y2VwdGlvbnxJbnN0YW50aWF0aW9uRXJyb3J8SW50ZXJuYWxFcnJvcnxcIitcbiAgICAgICAgXCJOZWdhdGl2ZUFycmF5U2l6ZUV4Y2VwdGlvbnxOb1N1Y2hGaWVsZEVycm9yfE92ZXJyaWRlfFByb2Nlc3N8XCIrXG4gICAgICAgIFwiUHJvY2Vzc0J1aWxkZXJ8U2VjdXJpdHlNYW5hZ2VyfFN0cmluZ0luZGV4T3V0T2ZCb3VuZHNFeGNlcHRpb258XCIrXG4gICAgICAgIFwiU3VwcHJlc3NXYXJuaW5nc3xUeXBlTm90UHJlc2VudEV4Y2VwdGlvbnxVbmtub3duRXJyb3J8XCIrXG4gICAgICAgIFwiVW5zYXRpc2ZpZWRMaW5rRXJyb3J8VW5zdXBwb3J0ZWRDbGFzc1ZlcnNpb25FcnJvcnxWZXJpZnlFcnJvcnxcIitcbiAgICAgICAgXCJJbnN0YW50aWF0aW9uRXhjZXB0aW9ufEluZGV4T3V0T2ZCb3VuZHNFeGNlcHRpb258XCIrXG4gICAgICAgIFwiQXJyYXlJbmRleE91dE9mQm91bmRzRXhjZXB0aW9ufENsb25lTm90U3VwcG9ydGVkRXhjZXB0aW9ufFwiK1xuICAgICAgICBcIk5vU3VjaEZpZWxkRXhjZXB0aW9ufElsbGVnYWxBcmd1bWVudEV4Y2VwdGlvbnxOdW1iZXJGb3JtYXRFeGNlcHRpb258XCIrXG4gICAgICAgIFwiU2VjdXJpdHlFeGNlcHRpb258Vm9pZHxJbmhlcml0YWJsZVRocmVhZExvY2FsfElsbGVnYWxTdGF0ZUV4Y2VwdGlvbnxcIitcbiAgICAgICAgXCJJbnRlcnJ1cHRlZEV4Y2VwdGlvbnxOb1N1Y2hNZXRob2RFeGNlcHRpb258SWxsZWdhbEFjY2Vzc0V4Y2VwdGlvbnxcIitcbiAgICAgICAgXCJVbnN1cHBvcnRlZE9wZXJhdGlvbkV4Y2VwdGlvbnxFbnVtfFN0cmljdE1hdGh8UGFja2FnZXxDb21waWxlcnxcIitcbiAgICAgICAgXCJSZWFkYWJsZXxSdW50aW1lfFN0cmluZ0J1aWxkZXJ8TWF0aHxJbmNvbXBhdGlibGVDbGFzc0NoYW5nZUVycm9yfFwiK1xuICAgICAgICBcIk5vU3VjaE1ldGhvZEVycm9yfFRocmVhZExvY2FsfFJ1bnRpbWVQZXJtaXNzaW9ufEFyaXRobWV0aWNFeGNlcHRpb258XCIrXG4gICAgICAgIFwiTnVsbFBvaW50ZXJFeGNlcHRpb258TG9uZ3xJbnRlZ2VyfFNob3J0fEJ5dGV8RG91YmxlfE51bWJlcnxGbG9hdHxcIitcbiAgICAgICAgXCJDaGFyYWN0ZXJ8Qm9vbGVhbnxTdGFja1RyYWNlRWxlbWVudHxBcHBlbmRhYmxlfFN0cmluZ0J1ZmZlcnxcIitcbiAgICAgICAgXCJJdGVyYWJsZXxUaHJlYWRHcm91cHxSdW5uYWJsZXxUaHJlYWR8SWxsZWdhbE1vbml0b3JTdGF0ZUV4Y2VwdGlvbnxcIitcbiAgICAgICAgXCJTdGFja092ZXJmbG93RXJyb3J8T3V0T2ZNZW1vcnlFcnJvcnxWaXJ0dWFsTWFjaGluZUVycm9yfFwiK1xuICAgICAgICBcIkFycmF5U3RvcmVFeGNlcHRpb258Q2xhc3NDYXN0RXhjZXB0aW9ufExpbmthZ2VFcnJvcnxcIitcbiAgICAgICAgXCJOb0NsYXNzRGVmRm91bmRFcnJvcnxDbGFzc05vdEZvdW5kRXhjZXB0aW9ufFJ1bnRpbWVFeGNlcHRpb258XCIrXG4gICAgICAgIFwiRXhjZXB0aW9ufFRocmVhZERlYXRofEVycm9yfFRocm93YWJsZXxTeXN0ZW18Q2xhc3NMb2FkZXJ8XCIrXG4gICAgICAgIFwiQ2xvbmVhYmxlfENsYXNzfENoYXJTZXF1ZW5jZXxDb21wYXJhYmxlfFN0cmluZ3xPYmplY3RcIlxuICAgICk7XG5cbiAgICB2YXIga2V5d29yZE1hcHBlciA9IHRoaXMuY3JlYXRlS2V5d29yZE1hcHBlcih7XG4gICAgICAgIFwidmFyaWFibGUubGFuZ3VhZ2VcIjogXCJ0aGlzXCIsXG4gICAgICAgIFwiY29uc3RhbnQubGFuZ3VhZ2VcIjogYnVpbGRpbkNvbnN0YW50cyxcbiAgICAgICAgXCJzdXBwb3J0LmZ1bmN0aW9uXCI6IGxhbmdDbGFzc2VzXG4gICAgfSwgXCJpZGVudGlmaWVyXCIpO1xuXG4gICAgLy8gcmVnZXhwIG11c3Qgbm90IGhhdmUgY2FwdHVyaW5nIHBhcmVudGhlc2VzLiBVc2UgKD86KSBpbnN0ZWFkLlxuICAgIC8vIHJlZ2V4cHMgYXJlIG9yZGVyZWQgLT4gdGhlIGZpcnN0IG1hdGNoIGlzIHVzZWRcblxuICAgIHRoaXMuJHJ1bGVzID0ge1xuICAgICAgICBcInN0YXJ0XCIgOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXC9cXFxcLy4qJFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLmdldFN0YXJ0UnVsZShcImRvYy1zdGFydFwiKSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudFwiLCAvLyBtdWx0aSBsaW5lIGNvbW1lbnRcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXC9cXFxcKlwiLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcImNvbW1lbnRcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtpbmNsdWRlOiBcIm11bHRpbGluZS1zdHJpbmdzXCJ9LFxuICAgICAgICAgICAge2luY2x1ZGU6IFwic3RyaW5nc1wifSxcbiAgICAgICAgICAgIHtpbmNsdWRlOiBcImNvbnN0YW50c1wifSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZWdleDogXCIob3Blbig/OlxcXFxzKykpP21vZHVsZSg/PVxcXFxzKlxcXFx3KVwiLFxuICAgICAgICAgICAgICAgIHRva2VuOiBcImtleXdvcmRcIixcbiAgICAgICAgICAgICAgICBuZXh0OiBbe1xuICAgICAgICAgICAgICAgICAgICByZWdleDogXCJ7XCIsXG4gICAgICAgICAgICAgICAgICAgIHRva2VuOiBcInBhcmVuLmxwYXJlblwiLFxuICAgICAgICAgICAgICAgICAgICBuZXh0OiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXg6IFwifVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwicGFyZW4ucnBhcmVuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0OiBcInN0YXJ0XCJcbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRnJvbSBTZWN0aW9uIDMuOSBvZiBodHRwOi8vY3Iub3Blbmpkay5qYXZhLm5ldC9+bXIvamlnc2F3L3NwZWMvamF2YS1zZS05LWpscy1kaWZmcy5wZGZcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFxiKHJlcXVpcmVzfHRyYW5zaXRpdmV8ZXhwb3J0c3xvcGVuc3x0b3x1c2VzfHByb3ZpZGVzfHdpdGgpXFxcXGJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiBcImtleXdvcmRcIiBcbiAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxccytcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcImlkZW50aWZpZXJcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFx3K1wiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IFwicHVuY3R1YXRpb24ub3BlcmF0b3JcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggOiBcIi5cIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFxzK1wiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICByZWdleDogXCJcIiwgLy8gZXhpdCBpZiB0aGVyZSBpcyBhbnl0aGluZyBlbHNlXG4gICAgICAgICAgICAgICAgICAgIG5leHQ6IFwic3RhcnRcIlxuICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge2luY2x1ZGU6IFwic3RhdGVtZW50c1wifVxuICAgICAgICBdLFxuICAgICAgICBcImNvbW1lbnRcIiA6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudFwiLCAvLyBjbG9zaW5nIGNvbW1lbnRcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXCpcXFxcL1wiLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcInN0YXJ0XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW4gOiBcImNvbW1lbnRcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBcInN0cmluZ3NcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuOiBbXCJwdW5jdHVhdGlvblwiLCBcInN0cmluZ1wiXSxcbiAgICAgICAgICAgICAgICByZWdleDogLyhcXC4pKFwiKS8sXG4gICAgICAgICAgICAgICAgcHVzaDogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJscGFyZW5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAvXFxcXFxcey8sXG4gICAgICAgICAgICAgICAgICAgICAgICBwdXNoOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAvJC8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHQ6IFwic3RhcnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwicnBhcmVuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAvfS8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluY2x1ZGU6IFwic3RyaW5nc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmNsdWRlOiBcImNvbnN0YW50c1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmNsdWRlOiBcInN0YXRlbWVudHNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWdleDogL1wiLyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInN0cmluZ1wiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LCAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIiwgLy8gc2luZ2xlIGxpbmVcbiAgICAgICAgICAgICAgICByZWdleCA6ICdbXCJdKD86KD86XFxcXFxcXFwuKXwoPzpbXlwiXFxcXFxcXFxdKSkqP1tcIl0nXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLCAvLyBzaW5nbGUgbGluZVxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJbJ10oPzooPzpcXFxcXFxcXC4pfCg/OlteJ1xcXFxcXFxcXSkpKj9bJ11cIlxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBcIm11bHRpbGluZS1zdHJpbmdzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogW1wicHVuY3R1YXRpb25cIiwgXCJzdHJpbmdcIl0sXG4gICAgICAgICAgICAgICAgcmVnZXg6IC8oXFwuKShcIlwiXCIpLyxcbiAgICAgICAgICAgICAgICBwdXNoOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXg6ICdcIlwiXCInLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJscGFyZW5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAvXFxcXFxcey8sXG4gICAgICAgICAgICAgICAgICAgICAgICBwdXNoOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAvJC8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHQ6IFwic3RhcnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwicnBhcmVuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAvfS8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluY2x1ZGU6IFwibXVsdGlsaW5lLXN0cmluZ3NcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5jbHVkZTogXCJzdHJpbmdzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluY2x1ZGU6IFwiY29uc3RhbnRzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluY2x1ZGU6IFwic3RhdGVtZW50c1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAvXFxcXC4vXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzdHJpbmdcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICByZWdleDogJ1wiXCJcIicsXG4gICAgICAgICAgICAgICAgcHVzaDogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAnXCJcIlwiJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXggOiAvXFxcXC4vXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzdHJpbmdcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBcImNvbnN0YW50c1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQubnVtZXJpY1wiLCAvLyBoZXhcbiAgICAgICAgICAgICAgICByZWdleDogLzAoPzpbeFhdWzAtOWEtZkEtRl1bMC05YS1mQS1GX10qfFtiQl1bMDFdWzAxX10qKVtMbFNzRGRGZll5XT9cXGIvXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQubnVtZXJpY1wiLCAvLyBmbG9hdFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvWystXT9cXGRbXFxkX10qKD86KD86XFwuW1xcZF9dKik/KD86W2VFXVsrLV0/W1xcZF9dKyk/KT9bTGxTc0RkRmZZeV0/XFxiL1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lmxhbmd1YWdlLmJvb2xlYW5cIixcbiAgICAgICAgICAgICAgICByZWdleDogXCIoPzp0cnVlfGZhbHNlKVxcXFxiXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgXCJzdGF0ZW1lbnRzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogW1wia2V5d29yZFwiLCBcInRleHRcIiwgXCJpZGVudGlmaWVyXCJdLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIihyZWNvcmQpKFxcXFxzKykoXCIraWRlbnRpZmllclJlK1wiKVxcXFxiXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwia2V5d29yZFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIig/OlwiICsga2V5d29yZHMgKyBcIilcXFxcYlwiXG4gICAgICAgICAgICB9LCB7Ly9hbm5vdGF0aW9uc1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInN0b3JhZ2UudHlwZS5hbm5vdGF0aW9uXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiQFwiICsgaWRlbnRpZmllclJlICsgXCJcXFxcYlwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwiZW50aXR5Lm5hbWUuZnVuY3Rpb25cIixcbiAgICAgICAgICAgICAgICByZWdleDogaWRlbnRpZmllclJlICsgXCIoPz1cXFxcKClcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBrZXl3b3JkTWFwcGVyLCAvLyBUT0RPOiBVbmljb2RlIGVzY2FwZSBzZXF1ZW5jZXNcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBVbmljb2RlIGlkZW50aWZpZXJzXG4gICAgICAgICAgICAgICAgcmVnZXg6IGlkZW50aWZpZXJSZSArIFwiXFxcXGJcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcImtleXdvcmQub3BlcmF0b3JcIixcbiAgICAgICAgICAgICAgICByZWdleDogXCIhfFxcXFwkfCV8JnxcXFxcfHxcXFxcXnxcXFxcKnxcXFxcL3xcXFxcLVxcXFwtfFxcXFwtfFxcXFwrXFxcXCt8XFxcXCt8fnw9PT18PT18PXwhPXwhPT18PD18Pj18PDw9fD4+PXw+Pj49fDw+fDx8PnwhfCYmfFxcXFx8XFxcXHx8XFxcXD98XFxcXDp8XFxcXCo9fFxcXFwvPXwlPXxcXFxcKz18XFxcXC09fCY9fFxcXFx8PXxcXFxcXj18XFxcXGIoPzppbnxpbnN0YW5jZW9mfG5ld3xkZWxldGV8dHlwZW9mfHZvaWQpXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJscGFyZW5cIixcbiAgICAgICAgICAgICAgICByZWdleDogXCJbWyh7XVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwicnBhcmVuXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiW1xcXFxdKX1dXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiXFxcXHMrXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH07XG5cbiAgICBcbiAgICB0aGlzLmVtYmVkUnVsZXMoRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLCBcImRvYy1cIixcbiAgICAgICAgWyBEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMuZ2V0RW5kUnVsZShcInN0YXJ0XCIpIF0pO1xuICAgIHRoaXMubm9ybWFsaXplUnVsZXMoKTtcbn07XG5cbm9vcC5pbmhlcml0cyhKYXZhSGlnaGxpZ2h0UnVsZXMsIFRleHRIaWdobGlnaHRSdWxlcyk7XG5cbmV4cG9ydHMuSmF2YUhpZ2hsaWdodFJ1bGVzID0gSmF2YUhpZ2hsaWdodFJ1bGVzO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9