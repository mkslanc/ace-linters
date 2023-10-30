"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[134],{

/***/ 62718:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var TextHighlightRules = (__webpack_require__(28053)/* .TextHighlightRules */ .K);

var DocCommentHighlightRules = function () {
    this.$rules = {
        "start": [
            {
                token: "comment.doc.tag",
                regex: "@\\w+(?=\\s|$)"
            }, DocCommentHighlightRules.getTagRule(), {
                defaultToken: "comment.doc",
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
        regex : "\\/\\*(?=\\*)",
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


exports.c = DocCommentHighlightRules;


/***/ }),

/***/ 50134:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var TextMode = (__webpack_require__(98030).Mode);
var DroolsHighlightRules = (__webpack_require__(42716)/* .DroolsHighlightRules */ .c);
var DroolsFoldMode = (__webpack_require__(87982)/* .FoldMode */ .Z);

var Mode = function() {
    this.HighlightRules = DroolsHighlightRules;
    this.foldingRules = new DroolsFoldMode();
    this.$behaviour = this.$defaultBehaviour;

};
oop.inherits(Mode, TextMode);

(function() {
    this.lineCommentStart = "//";
    this.$id = "ace/mode/drools";
    this.snippetFileId = "ace/snippets/drools";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 42716:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var TextHighlightRules = (__webpack_require__(28053)/* .TextHighlightRules */ .K);
var JavaHighlightRules = (__webpack_require__(24194)/* .JavaHighlightRules */ .x);
var DocCommentHighlightRules = (__webpack_require__(62718)/* .DocCommentHighlightRules */ .c);

var identifierRe = "[a-zA-Z\\$_\u00a1-\uffff][a-zA-Z\\d\\$_\u00a1-\uffff]*";
var packageIdentifierRe = "[a-zA-Z\\$_\u00a1-\uffff][\\.a-zA-Z\\d\\$_\u00a1-\uffff]*";

var DroolsHighlightRules = function() {

    var keywords = ("date|effective|expires|lock|on|active|no|loop|auto|focus" +
        "|activation|group|agenda|ruleflow|duration|timer|calendars|refract|direct" +
        "|dialect|salience|enabled|attributes|extends|template" +
        "|function|contains|matches|eval|excludes|soundslike" +
        "|memberof|not|in|or|and|exists|forall|over|from|entry|point|accumulate|acc|collect" +
        "|action|reverse|result|end|init|instanceof|extends|super|boolean|char|byte|short" +
        "|int|long|float|double|this|void|class|new|case|final|if|else|for|while|do" +
        "|default|try|catch|finally|switch|synchronized|return|throw|break|continue|assert" +
        "|modify|static|public|protected|private|abstract|native|transient|volatile" +
        "|strictfp|throws|interface|enum|implements|type|window|trait|no-loop|str"
      );

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
        "keyword": keywords,
        "constant.language": "null",
        "support.class" : langClasses,
        "support.function" : "retract|update|modify|insert"
    }, "identifier");

    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used

    var stringRules = function() {
      return [{
        token : "string", // single line
        regex : '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'
      }, {
        token : "string", // single line
        regex : "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"
      }];
    };


      var basicPreRules = function(blockCommentRules) {
        return [{
            token : "comment",
            regex : "\\/\\/.*$"
        },
        DocCommentHighlightRules.getStartRule("doc-start"),
        {
            token : "comment", // multi line comment
            regex : "\\/\\*",
            next : blockCommentRules
        }, {
            token : "constant.numeric", // hex
            regex : "0[xX][0-9a-fA-F]+\\b"
        }, {
            token : "constant.numeric", // float
            regex : "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
        }, {
            token : "constant.language.boolean",
            regex : "(?:true|false)\\b"
          }];
      };

      var blockCommentRules = function(returnRule) {
        return [
            {
                token : "comment.block", // closing comment
                regex : "\\*\\/",
                next : returnRule
            }, {
                defaultToken : "comment.block"
            }
        ];
      };

      var basicPostRules = function() {
        return [{
            token : keywordMapper,
            // TODO: Unicode escape sequences
            // TODO: Unicode identifiers
            regex : "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
        }, {
            token : "keyword.operator",
            regex : "!|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^=|\\b(?:in|instanceof|new|delete|typeof|void)"
        }, {
            token : "lparen",
            regex : "[[({]"
        }, {
            token : "rparen",
            regex : "[\\])}]"
        }, {
            token : "text",
            regex : "\\s+"
        }];
      };


    this.$rules = {
        "start" : [].concat(basicPreRules("block.comment"), [
              {
                token : "entity.name.type",
                regex : "@[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
              }, {
                // package com.example
                token : ["keyword","text","entity.name.type"],
                regex : "(package)(\\s+)(" + packageIdentifierRe +")"
              }, {
                // import function com.Util.staticMethod
                token : ["keyword","text","keyword","text","entity.name.type"],
                regex : "(import)(\\s+)(function)(\\s+)(" + packageIdentifierRe +")"
              }, {
                // import function com.Util.staticMethod
                token : ["keyword","text","entity.name.type"],
                regex : "(import)(\\s+)(" + packageIdentifierRe +")"
              }, {
                // global com.example.Type identifier
                token : ["keyword","text","entity.name.type","text","variable"],
                regex : "(global)(\\s+)(" + packageIdentifierRe +")(\\s+)(" + identifierRe +")"
              }, {
                // declare trait DeclaredType
                token : ["keyword","text","keyword","text","entity.name.type"],
                regex : "(declare)(\\s+)(trait)(\\s+)(" + identifierRe +")"
              }, {
                // declare trait DeclaredType
                token : ["keyword","text","entity.name.type"],
                regex : "(declare)(\\s+)(" + identifierRe +")"
              }, {
                // declare trait DeclaredType
                token : ["keyword","text","entity.name.type"],
                regex : "(extends)(\\s+)(" + packageIdentifierRe +")"
              }, {
                // rule ...
                token : ["keyword","text"],
                regex : "(rule)(\\s+)",
                next :  "asset.name"
              }],
              stringRules(),
              [{
                // variable :
                token : ["variable.other","text","text"],
                regex : "(" + identifierRe + ")(\\s*)(:)"
              }, {
                // query ...
                token : ["keyword","text"],
                regex : "(query)(\\s+)",
                next :  "asset.name"
              }, {
                // when ...
                token : ["keyword","text"],
                regex : "(when)(\\s*)"
              }, {
                // then <java/mvel code> end
                token : ["keyword","text"],
                regex : "(then)(\\s*)",
                next :  "java-start"
              }, {
                  token : "paren.lparen",
                  regex : /[\[({]/
              }, {
                  token : "paren.rparen",
                  regex : /[\])}]/
              }], basicPostRules()),
        "block.comment" : blockCommentRules("start"),
        "asset.name" : [
            {
                token : "entity.name",
                regex : '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'
            }, {
                token : "entity.name",
                regex : "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"
            }, {
                token : "entity.name",
                regex : identifierRe
            }, {
                regex: "",
                token: "empty",
                next: "start"
            }]
    };
    this.embedRules(DocCommentHighlightRules, "doc-",
        [ DocCommentHighlightRules.getEndRule("start") ]);

    this.embedRules(JavaHighlightRules, "java-", [
      {
       token : "support.function",
       regex: "\\b(insert|modify|retract|update)\\b"
     }, {
       token : "keyword",
       regex: "\\bend\\b",
       next  : "start"
    }]);

};

oop.inherits(DroolsHighlightRules, TextHighlightRules);

exports.c = DroolsHighlightRules;


/***/ }),

/***/ 87982:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var Range = (__webpack_require__(59082)/* .Range */ .e);
var BaseFoldMode = (__webpack_require__(15369).FoldMode);
var TokenIterator = (__webpack_require__(39216)/* .TokenIterator */ .N);

var FoldMode = exports.Z = function() {};
oop.inherits(FoldMode, BaseFoldMode);

(function() {

    // regular expressions that identify starting and stopping points
    this.foldingStartMarker = /\b(rule|declare|query|when|then)\b/; 
    this.foldingStopMarker = /\bend\b/;

    this.getFoldWidgetRange = function(session, foldStyle, row) {
        var line = session.getLine(row);
        var match = line.match(this.foldingStartMarker);
        if (match) {
            var i = match.index;

            if (match[1]) {
                var position = {row: row, column: line.length};
                var iterator = new TokenIterator(session, position.row, position.column);
                var seek = "end";
                var token = iterator.getCurrentToken();
                if (token.value == "when") {
                    seek = "then";
                }
                while (token) {
                    if (token.value == seek) { 
                        return Range.fromPoints(position ,{
                            row: iterator.getCurrentTokenRow(),
                            column: iterator.getCurrentTokenColumn()
                        });
                    }
                    token = iterator.stepForward();
                }
            }

        }
        // test each line, and return a range of segments to collapse
    };

}).call(FoldMode.prototype);


/***/ }),

/***/ 24194:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var DocCommentHighlightRules = (__webpack_require__(62718)/* .DocCommentHighlightRules */ .c);
var TextHighlightRules = (__webpack_require__(28053)/* .TextHighlightRules */ .K);

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

exports.x = JavaHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWEsR0FBRztBQUNoQjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSw0QkFBNEI7QUFDNUIsYUFBYTtBQUNiO0FBQ0EsOEJBQThCO0FBQzlCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsU0FBMEIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2RvY19jb21tZW50X2hpZ2hsaWdodF9ydWxlcy5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2Ryb29scy5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2Ryb29sc19oaWdobGlnaHRfcnVsZXMuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9mb2xkaW5nL2Ryb29scy5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2phdmFfaGlnaGxpZ2h0X3J1bGVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xuXG52YXIgRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuJHJ1bGVzID0ge1xuICAgICAgICBcInN0YXJ0XCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJjb21tZW50LmRvYy50YWdcIixcbiAgICAgICAgICAgICAgICByZWdleDogXCJAXFxcXHcrKD89XFxcXHN8JClcIlxuICAgICAgICAgICAgfSwgRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLmdldFRhZ1J1bGUoKSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJjb21tZW50LmRvY1wiLFxuICAgICAgICAgICAgICAgIGNhc2VJbnNlbnNpdGl2ZTogdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfTtcbn07XG5cbm9vcC5pbmhlcml0cyhEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMsIFRleHRIaWdobGlnaHRSdWxlcyk7XG5cbkRvY0NvbW1lbnRIaWdobGlnaHRSdWxlcy5nZXRUYWdSdWxlID0gZnVuY3Rpb24oc3RhcnQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0b2tlbiA6IFwiY29tbWVudC5kb2MudGFnLnN0b3JhZ2UudHlwZVwiLFxuICAgICAgICByZWdleCA6IFwiXFxcXGIoPzpUT0RPfEZJWE1FfFhYWHxIQUNLKVxcXFxiXCJcbiAgICB9O1xufTtcblxuRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLmdldFN0YXJ0UnVsZSA9IGZ1bmN0aW9uKHN0YXJ0KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdG9rZW4gOiBcImNvbW1lbnQuZG9jXCIsIC8vIGRvYyBjb21tZW50XG4gICAgICAgIHJlZ2V4IDogXCJcXFxcL1xcXFwqKD89XFxcXCopXCIsXG4gICAgICAgIG5leHQgIDogc3RhcnRcbiAgICB9O1xufTtcblxuRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLmdldEVuZFJ1bGUgPSBmdW5jdGlvbiAoc3RhcnQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0b2tlbiA6IFwiY29tbWVudC5kb2NcIiwgLy8gY2xvc2luZyBjb21tZW50XG4gICAgICAgIHJlZ2V4IDogXCJcXFxcKlxcXFwvXCIsXG4gICAgICAgIG5leHQgIDogc3RhcnRcbiAgICB9O1xufTtcblxuXG5leHBvcnRzLkRvY0NvbW1lbnRIaWdobGlnaHRSdWxlcyA9IERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dE1vZGUgPSByZXF1aXJlKFwiLi90ZXh0XCIpLk1vZGU7XG52YXIgRHJvb2xzSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9kcm9vbHNfaGlnaGxpZ2h0X3J1bGVzXCIpLkRyb29sc0hpZ2hsaWdodFJ1bGVzO1xudmFyIERyb29sc0ZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZGluZy9kcm9vbHNcIikuRm9sZE1vZGU7XG5cbnZhciBNb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5IaWdobGlnaHRSdWxlcyA9IERyb29sc0hpZ2hsaWdodFJ1bGVzO1xuICAgIHRoaXMuZm9sZGluZ1J1bGVzID0gbmV3IERyb29sc0ZvbGRNb2RlKCk7XG4gICAgdGhpcy4kYmVoYXZpb3VyID0gdGhpcy4kZGVmYXVsdEJlaGF2aW91cjtcblxufTtcbm9vcC5pbmhlcml0cyhNb2RlLCBUZXh0TW9kZSk7XG5cbihmdW5jdGlvbigpIHtcbiAgICB0aGlzLmxpbmVDb21tZW50U3RhcnQgPSBcIi8vXCI7XG4gICAgdGhpcy4kaWQgPSBcImFjZS9tb2RlL2Ryb29sc1wiO1xuICAgIHRoaXMuc25pcHBldEZpbGVJZCA9IFwiYWNlL3NuaXBwZXRzL2Ryb29sc1wiO1xufSkuY2FsbChNb2RlLnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTW9kZSA9IE1vZGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcbnZhciBKYXZhSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9qYXZhX2hpZ2hsaWdodF9ydWxlc1wiKS5KYXZhSGlnaGxpZ2h0UnVsZXM7XG52YXIgRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vZG9jX2NvbW1lbnRfaGlnaGxpZ2h0X3J1bGVzXCIpLkRvY0NvbW1lbnRIaWdobGlnaHRSdWxlcztcblxudmFyIGlkZW50aWZpZXJSZSA9IFwiW2EtekEtWlxcXFwkX1xcdTAwYTEtXFx1ZmZmZl1bYS16QS1aXFxcXGRcXFxcJF9cXHUwMGExLVxcdWZmZmZdKlwiO1xudmFyIHBhY2thZ2VJZGVudGlmaWVyUmUgPSBcIlthLXpBLVpcXFxcJF9cXHUwMGExLVxcdWZmZmZdW1xcXFwuYS16QS1aXFxcXGRcXFxcJF9cXHUwMGExLVxcdWZmZmZdKlwiO1xuXG52YXIgRHJvb2xzSGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbigpIHtcblxuICAgIHZhciBrZXl3b3JkcyA9IChcImRhdGV8ZWZmZWN0aXZlfGV4cGlyZXN8bG9ja3xvbnxhY3RpdmV8bm98bG9vcHxhdXRvfGZvY3VzXCIgK1xuICAgICAgICBcInxhY3RpdmF0aW9ufGdyb3VwfGFnZW5kYXxydWxlZmxvd3xkdXJhdGlvbnx0aW1lcnxjYWxlbmRhcnN8cmVmcmFjdHxkaXJlY3RcIiArXG4gICAgICAgIFwifGRpYWxlY3R8c2FsaWVuY2V8ZW5hYmxlZHxhdHRyaWJ1dGVzfGV4dGVuZHN8dGVtcGxhdGVcIiArXG4gICAgICAgIFwifGZ1bmN0aW9ufGNvbnRhaW5zfG1hdGNoZXN8ZXZhbHxleGNsdWRlc3xzb3VuZHNsaWtlXCIgK1xuICAgICAgICBcInxtZW1iZXJvZnxub3R8aW58b3J8YW5kfGV4aXN0c3xmb3JhbGx8b3Zlcnxmcm9tfGVudHJ5fHBvaW50fGFjY3VtdWxhdGV8YWNjfGNvbGxlY3RcIiArXG4gICAgICAgIFwifGFjdGlvbnxyZXZlcnNlfHJlc3VsdHxlbmR8aW5pdHxpbnN0YW5jZW9mfGV4dGVuZHN8c3VwZXJ8Ym9vbGVhbnxjaGFyfGJ5dGV8c2hvcnRcIiArXG4gICAgICAgIFwifGludHxsb25nfGZsb2F0fGRvdWJsZXx0aGlzfHZvaWR8Y2xhc3N8bmV3fGNhc2V8ZmluYWx8aWZ8ZWxzZXxmb3J8d2hpbGV8ZG9cIiArXG4gICAgICAgIFwifGRlZmF1bHR8dHJ5fGNhdGNofGZpbmFsbHl8c3dpdGNofHN5bmNocm9uaXplZHxyZXR1cm58dGhyb3d8YnJlYWt8Y29udGludWV8YXNzZXJ0XCIgK1xuICAgICAgICBcInxtb2RpZnl8c3RhdGljfHB1YmxpY3xwcm90ZWN0ZWR8cHJpdmF0ZXxhYnN0cmFjdHxuYXRpdmV8dHJhbnNpZW50fHZvbGF0aWxlXCIgK1xuICAgICAgICBcInxzdHJpY3RmcHx0aHJvd3N8aW50ZXJmYWNlfGVudW18aW1wbGVtZW50c3x0eXBlfHdpbmRvd3x0cmFpdHxuby1sb29wfHN0clwiXG4gICAgICApO1xuXG4gICAgICB2YXIgbGFuZ0NsYXNzZXMgPSAoXG4gICAgICAgICAgXCJBYnN0cmFjdE1ldGhvZEVycm9yfEFzc2VydGlvbkVycm9yfENsYXNzQ2lyY3VsYXJpdHlFcnJvcnxcIitcbiAgICAgICAgICBcIkNsYXNzRm9ybWF0RXJyb3J8RGVwcmVjYXRlZHxFbnVtQ29uc3RhbnROb3RQcmVzZW50RXhjZXB0aW9ufFwiK1xuICAgICAgICAgIFwiRXhjZXB0aW9uSW5Jbml0aWFsaXplckVycm9yfElsbGVnYWxBY2Nlc3NFcnJvcnxcIitcbiAgICAgICAgICBcIklsbGVnYWxUaHJlYWRTdGF0ZUV4Y2VwdGlvbnxJbnN0YW50aWF0aW9uRXJyb3J8SW50ZXJuYWxFcnJvcnxcIitcbiAgICAgICAgICBcIk5lZ2F0aXZlQXJyYXlTaXplRXhjZXB0aW9ufE5vU3VjaEZpZWxkRXJyb3J8T3ZlcnJpZGV8UHJvY2Vzc3xcIitcbiAgICAgICAgICBcIlByb2Nlc3NCdWlsZGVyfFNlY3VyaXR5TWFuYWdlcnxTdHJpbmdJbmRleE91dE9mQm91bmRzRXhjZXB0aW9ufFwiK1xuICAgICAgICAgIFwiU3VwcHJlc3NXYXJuaW5nc3xUeXBlTm90UHJlc2VudEV4Y2VwdGlvbnxVbmtub3duRXJyb3J8XCIrXG4gICAgICAgICAgXCJVbnNhdGlzZmllZExpbmtFcnJvcnxVbnN1cHBvcnRlZENsYXNzVmVyc2lvbkVycm9yfFZlcmlmeUVycm9yfFwiK1xuICAgICAgICAgIFwiSW5zdGFudGlhdGlvbkV4Y2VwdGlvbnxJbmRleE91dE9mQm91bmRzRXhjZXB0aW9ufFwiK1xuICAgICAgICAgIFwiQXJyYXlJbmRleE91dE9mQm91bmRzRXhjZXB0aW9ufENsb25lTm90U3VwcG9ydGVkRXhjZXB0aW9ufFwiK1xuICAgICAgICAgIFwiTm9TdWNoRmllbGRFeGNlcHRpb258SWxsZWdhbEFyZ3VtZW50RXhjZXB0aW9ufE51bWJlckZvcm1hdEV4Y2VwdGlvbnxcIitcbiAgICAgICAgICBcIlNlY3VyaXR5RXhjZXB0aW9ufFZvaWR8SW5oZXJpdGFibGVUaHJlYWRMb2NhbHxJbGxlZ2FsU3RhdGVFeGNlcHRpb258XCIrXG4gICAgICAgICAgXCJJbnRlcnJ1cHRlZEV4Y2VwdGlvbnxOb1N1Y2hNZXRob2RFeGNlcHRpb258SWxsZWdhbEFjY2Vzc0V4Y2VwdGlvbnxcIitcbiAgICAgICAgICBcIlVuc3VwcG9ydGVkT3BlcmF0aW9uRXhjZXB0aW9ufEVudW18U3RyaWN0TWF0aHxQYWNrYWdlfENvbXBpbGVyfFwiK1xuICAgICAgICAgIFwiUmVhZGFibGV8UnVudGltZXxTdHJpbmdCdWlsZGVyfE1hdGh8SW5jb21wYXRpYmxlQ2xhc3NDaGFuZ2VFcnJvcnxcIitcbiAgICAgICAgICBcIk5vU3VjaE1ldGhvZEVycm9yfFRocmVhZExvY2FsfFJ1bnRpbWVQZXJtaXNzaW9ufEFyaXRobWV0aWNFeGNlcHRpb258XCIrXG4gICAgICAgICAgXCJOdWxsUG9pbnRlckV4Y2VwdGlvbnxMb25nfEludGVnZXJ8U2hvcnR8Qnl0ZXxEb3VibGV8TnVtYmVyfEZsb2F0fFwiK1xuICAgICAgICAgIFwiQ2hhcmFjdGVyfEJvb2xlYW58U3RhY2tUcmFjZUVsZW1lbnR8QXBwZW5kYWJsZXxTdHJpbmdCdWZmZXJ8XCIrXG4gICAgICAgICAgXCJJdGVyYWJsZXxUaHJlYWRHcm91cHxSdW5uYWJsZXxUaHJlYWR8SWxsZWdhbE1vbml0b3JTdGF0ZUV4Y2VwdGlvbnxcIitcbiAgICAgICAgICBcIlN0YWNrT3ZlcmZsb3dFcnJvcnxPdXRPZk1lbW9yeUVycm9yfFZpcnR1YWxNYWNoaW5lRXJyb3J8XCIrXG4gICAgICAgICAgXCJBcnJheVN0b3JlRXhjZXB0aW9ufENsYXNzQ2FzdEV4Y2VwdGlvbnxMaW5rYWdlRXJyb3J8XCIrXG4gICAgICAgICAgXCJOb0NsYXNzRGVmRm91bmRFcnJvcnxDbGFzc05vdEZvdW5kRXhjZXB0aW9ufFJ1bnRpbWVFeGNlcHRpb258XCIrXG4gICAgICAgICAgXCJFeGNlcHRpb258VGhyZWFkRGVhdGh8RXJyb3J8VGhyb3dhYmxlfFN5c3RlbXxDbGFzc0xvYWRlcnxcIitcbiAgICAgICAgICBcIkNsb25lYWJsZXxDbGFzc3xDaGFyU2VxdWVuY2V8Q29tcGFyYWJsZXxTdHJpbmd8T2JqZWN0XCJcbiAgICAgICk7XG5cbiAgICB2YXIga2V5d29yZE1hcHBlciA9IHRoaXMuY3JlYXRlS2V5d29yZE1hcHBlcih7XG4gICAgICAgIFwidmFyaWFibGUubGFuZ3VhZ2VcIjogXCJ0aGlzXCIsXG4gICAgICAgIFwia2V5d29yZFwiOiBrZXl3b3JkcyxcbiAgICAgICAgXCJjb25zdGFudC5sYW5ndWFnZVwiOiBcIm51bGxcIixcbiAgICAgICAgXCJzdXBwb3J0LmNsYXNzXCIgOiBsYW5nQ2xhc3NlcyxcbiAgICAgICAgXCJzdXBwb3J0LmZ1bmN0aW9uXCIgOiBcInJldHJhY3R8dXBkYXRlfG1vZGlmeXxpbnNlcnRcIlxuICAgIH0sIFwiaWRlbnRpZmllclwiKTtcblxuICAgIC8vIHJlZ2V4cCBtdXN0IG5vdCBoYXZlIGNhcHR1cmluZyBwYXJlbnRoZXNlcy4gVXNlICg/OikgaW5zdGVhZC5cbiAgICAvLyByZWdleHBzIGFyZSBvcmRlcmVkIC0+IHRoZSBmaXJzdCBtYXRjaCBpcyB1c2VkXG5cbiAgICB2YXIgc3RyaW5nUnVsZXMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBbe1xuICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsIC8vIHNpbmdsZSBsaW5lXG4gICAgICAgIHJlZ2V4IDogJ1tcIl0oPzooPzpcXFxcXFxcXC4pfCg/OlteXCJcXFxcXFxcXF0pKSo/W1wiXSdcbiAgICAgIH0sIHtcbiAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLCAvLyBzaW5nbGUgbGluZVxuICAgICAgICByZWdleCA6IFwiWyddKD86KD86XFxcXFxcXFwuKXwoPzpbXidcXFxcXFxcXF0pKSo/WyddXCJcbiAgICAgIH1dO1xuICAgIH07XG5cblxuICAgICAgdmFyIGJhc2ljUHJlUnVsZXMgPSBmdW5jdGlvbihibG9ja0NvbW1lbnRSdWxlcykge1xuICAgICAgICByZXR1cm4gW3tcbiAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsXG4gICAgICAgICAgICByZWdleCA6IFwiXFxcXC9cXFxcLy4qJFwiXG4gICAgICAgIH0sXG4gICAgICAgIERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcy5nZXRTdGFydFJ1bGUoXCJkb2Mtc3RhcnRcIiksXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsIC8vIG11bHRpIGxpbmUgY29tbWVudFxuICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwvXFxcXCpcIixcbiAgICAgICAgICAgIG5leHQgOiBibG9ja0NvbW1lbnRSdWxlc1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLCAvLyBoZXhcbiAgICAgICAgICAgIHJlZ2V4IDogXCIwW3hYXVswLTlhLWZBLUZdK1xcXFxiXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIiwgLy8gZmxvYXRcbiAgICAgICAgICAgIHJlZ2V4IDogXCJbKy1dP1xcXFxkKyg/Oig/OlxcXFwuXFxcXGQqKT8oPzpbZUVdWystXT9cXFxcZCspPyk/XFxcXGJcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubGFuZ3VhZ2UuYm9vbGVhblwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIig/OnRydWV8ZmFsc2UpXFxcXGJcIlxuICAgICAgICAgIH1dO1xuICAgICAgfTtcblxuICAgICAgdmFyIGJsb2NrQ29tbWVudFJ1bGVzID0gZnVuY3Rpb24ocmV0dXJuUnVsZSkge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50LmJsb2NrXCIsIC8vIGNsb3NpbmcgY29tbWVudFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcKlxcXFwvXCIsXG4gICAgICAgICAgICAgICAgbmV4dCA6IHJldHVyblJ1bGVcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW4gOiBcImNvbW1lbnQuYmxvY2tcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdO1xuICAgICAgfTtcblxuICAgICAgdmFyIGJhc2ljUG9zdFJ1bGVzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBbe1xuICAgICAgICAgICAgdG9rZW4gOiBrZXl3b3JkTWFwcGVyLFxuICAgICAgICAgICAgLy8gVE9ETzogVW5pY29kZSBlc2NhcGUgc2VxdWVuY2VzXG4gICAgICAgICAgICAvLyBUT0RPOiBVbmljb2RlIGlkZW50aWZpZXJzXG4gICAgICAgICAgICByZWdleCA6IFwiW2EtekEtWl8kXVthLXpBLVowLTlfJF0qXFxcXGJcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwia2V5d29yZC5vcGVyYXRvclwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIiF8XFxcXCR8JXwmfFxcXFwqfFxcXFwtXFxcXC18XFxcXC18XFxcXCtcXFxcK3xcXFxcK3x+fD09PXw9PXw9fCE9fCE9PXw8PXw+PXw8PD18Pj49fD4+Pj18PD58PHw+fCF8JiZ8XFxcXHxcXFxcfHxcXFxcP1xcXFw6fFxcXFwqPXwlPXxcXFxcKz18XFxcXC09fCY9fFxcXFxePXxcXFxcYig/OmlufGluc3RhbmNlb2Z8bmV3fGRlbGV0ZXx0eXBlb2Z8dm9pZClcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwibHBhcmVuXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiW1soe11cIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwicnBhcmVuXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiW1xcXFxdKX1dXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInRleHRcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxccytcIlxuICAgICAgICB9XTtcbiAgICAgIH07XG5cblxuICAgIHRoaXMuJHJ1bGVzID0ge1xuICAgICAgICBcInN0YXJ0XCIgOiBbXS5jb25jYXQoYmFzaWNQcmVSdWxlcyhcImJsb2NrLmNvbW1lbnRcIiksIFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJlbnRpdHkubmFtZS50eXBlXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIkBbYS16QS1aXyRdW2EtekEtWjAtOV8kXSpcXFxcYlwiXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAvLyBwYWNrYWdlIGNvbS5leGFtcGxlXG4gICAgICAgICAgICAgICAgdG9rZW4gOiBbXCJrZXl3b3JkXCIsXCJ0ZXh0XCIsXCJlbnRpdHkubmFtZS50eXBlXCJdLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIocGFja2FnZSkoXFxcXHMrKShcIiArIHBhY2thZ2VJZGVudGlmaWVyUmUgK1wiKVwiXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAvLyBpbXBvcnQgZnVuY3Rpb24gY29tLlV0aWwuc3RhdGljTWV0aG9kXG4gICAgICAgICAgICAgICAgdG9rZW4gOiBbXCJrZXl3b3JkXCIsXCJ0ZXh0XCIsXCJrZXl3b3JkXCIsXCJ0ZXh0XCIsXCJlbnRpdHkubmFtZS50eXBlXCJdLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIoaW1wb3J0KShcXFxccyspKGZ1bmN0aW9uKShcXFxccyspKFwiICsgcGFja2FnZUlkZW50aWZpZXJSZSArXCIpXCJcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIC8vIGltcG9ydCBmdW5jdGlvbiBjb20uVXRpbC5zdGF0aWNNZXRob2RcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFtcImtleXdvcmRcIixcInRleHRcIixcImVudGl0eS5uYW1lLnR5cGVcIl0sXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIihpbXBvcnQpKFxcXFxzKykoXCIgKyBwYWNrYWdlSWRlbnRpZmllclJlICtcIilcIlxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgLy8gZ2xvYmFsIGNvbS5leGFtcGxlLlR5cGUgaWRlbnRpZmllclxuICAgICAgICAgICAgICAgIHRva2VuIDogW1wia2V5d29yZFwiLFwidGV4dFwiLFwiZW50aXR5Lm5hbWUudHlwZVwiLFwidGV4dFwiLFwidmFyaWFibGVcIl0sXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIihnbG9iYWwpKFxcXFxzKykoXCIgKyBwYWNrYWdlSWRlbnRpZmllclJlICtcIikoXFxcXHMrKShcIiArIGlkZW50aWZpZXJSZSArXCIpXCJcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIC8vIGRlY2xhcmUgdHJhaXQgRGVjbGFyZWRUeXBlXG4gICAgICAgICAgICAgICAgdG9rZW4gOiBbXCJrZXl3b3JkXCIsXCJ0ZXh0XCIsXCJrZXl3b3JkXCIsXCJ0ZXh0XCIsXCJlbnRpdHkubmFtZS50eXBlXCJdLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIoZGVjbGFyZSkoXFxcXHMrKSh0cmFpdCkoXFxcXHMrKShcIiArIGlkZW50aWZpZXJSZSArXCIpXCJcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIC8vIGRlY2xhcmUgdHJhaXQgRGVjbGFyZWRUeXBlXG4gICAgICAgICAgICAgICAgdG9rZW4gOiBbXCJrZXl3b3JkXCIsXCJ0ZXh0XCIsXCJlbnRpdHkubmFtZS50eXBlXCJdLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIoZGVjbGFyZSkoXFxcXHMrKShcIiArIGlkZW50aWZpZXJSZSArXCIpXCJcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIC8vIGRlY2xhcmUgdHJhaXQgRGVjbGFyZWRUeXBlXG4gICAgICAgICAgICAgICAgdG9rZW4gOiBbXCJrZXl3b3JkXCIsXCJ0ZXh0XCIsXCJlbnRpdHkubmFtZS50eXBlXCJdLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIoZXh0ZW5kcykoXFxcXHMrKShcIiArIHBhY2thZ2VJZGVudGlmaWVyUmUgK1wiKVwiXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAvLyBydWxlIC4uLlxuICAgICAgICAgICAgICAgIHRva2VuIDogW1wia2V5d29yZFwiLFwidGV4dFwiXSxcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiKHJ1bGUpKFxcXFxzKylcIixcbiAgICAgICAgICAgICAgICBuZXh0IDogIFwiYXNzZXQubmFtZVwiXG4gICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICBzdHJpbmdSdWxlcygpLFxuICAgICAgICAgICAgICBbe1xuICAgICAgICAgICAgICAgIC8vIHZhcmlhYmxlIDpcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFtcInZhcmlhYmxlLm90aGVyXCIsXCJ0ZXh0XCIsXCJ0ZXh0XCJdLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIoXCIgKyBpZGVudGlmaWVyUmUgKyBcIikoXFxcXHMqKSg6KVwiXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAvLyBxdWVyeSAuLi5cbiAgICAgICAgICAgICAgICB0b2tlbiA6IFtcImtleXdvcmRcIixcInRleHRcIl0sXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIihxdWVyeSkoXFxcXHMrKVwiLFxuICAgICAgICAgICAgICAgIG5leHQgOiAgXCJhc3NldC5uYW1lXCJcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIC8vIHdoZW4gLi4uXG4gICAgICAgICAgICAgICAgdG9rZW4gOiBbXCJrZXl3b3JkXCIsXCJ0ZXh0XCJdLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIod2hlbikoXFxcXHMqKVwiXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAvLyB0aGVuIDxqYXZhL212ZWwgY29kZT4gZW5kXG4gICAgICAgICAgICAgICAgdG9rZW4gOiBbXCJrZXl3b3JkXCIsXCJ0ZXh0XCJdLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIodGhlbikoXFxcXHMqKVwiLFxuICAgICAgICAgICAgICAgIG5leHQgOiAgXCJqYXZhLXN0YXJ0XCJcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcInBhcmVuLmxwYXJlblwiLFxuICAgICAgICAgICAgICAgICAgcmVnZXggOiAvW1xcWyh7XS9cbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcInBhcmVuLnJwYXJlblwiLFxuICAgICAgICAgICAgICAgICAgcmVnZXggOiAvW1xcXSl9XS9cbiAgICAgICAgICAgICAgfV0sIGJhc2ljUG9zdFJ1bGVzKCkpLFxuICAgICAgICBcImJsb2NrLmNvbW1lbnRcIiA6IGJsb2NrQ29tbWVudFJ1bGVzKFwic3RhcnRcIiksXG4gICAgICAgIFwiYXNzZXQubmFtZVwiIDogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJlbnRpdHkubmFtZVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogJ1tcIl0oPzooPzpcXFxcXFxcXC4pfCg/OlteXCJcXFxcXFxcXF0pKSo/W1wiXSdcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiZW50aXR5Lm5hbWVcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiWyddKD86KD86XFxcXFxcXFwuKXwoPzpbXidcXFxcXFxcXF0pKSo/WyddXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiZW50aXR5Lm5hbWVcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IGlkZW50aWZpZXJSZVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIlwiLFxuICAgICAgICAgICAgICAgIHRva2VuOiBcImVtcHR5XCIsXG4gICAgICAgICAgICAgICAgbmV4dDogXCJzdGFydFwiXG4gICAgICAgICAgICB9XVxuICAgIH07XG4gICAgdGhpcy5lbWJlZFJ1bGVzKERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcywgXCJkb2MtXCIsXG4gICAgICAgIFsgRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLmdldEVuZFJ1bGUoXCJzdGFydFwiKSBdKTtcblxuICAgIHRoaXMuZW1iZWRSdWxlcyhKYXZhSGlnaGxpZ2h0UnVsZXMsIFwiamF2YS1cIiwgW1xuICAgICAge1xuICAgICAgIHRva2VuIDogXCJzdXBwb3J0LmZ1bmN0aW9uXCIsXG4gICAgICAgcmVnZXg6IFwiXFxcXGIoaW5zZXJ0fG1vZGlmeXxyZXRyYWN0fHVwZGF0ZSlcXFxcYlwiXG4gICAgIH0sIHtcbiAgICAgICB0b2tlbiA6IFwia2V5d29yZFwiLFxuICAgICAgIHJlZ2V4OiBcIlxcXFxiZW5kXFxcXGJcIixcbiAgICAgICBuZXh0ICA6IFwic3RhcnRcIlxuICAgIH1dKTtcblxufTtcblxub29wLmluaGVyaXRzKERyb29sc0hpZ2hsaWdodFJ1bGVzLCBUZXh0SGlnaGxpZ2h0UnVsZXMpO1xuXG5leHBvcnRzLkRyb29sc0hpZ2hsaWdodFJ1bGVzID0gRHJvb2xzSGlnaGxpZ2h0UnVsZXM7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi8uLi9saWIvb29wXCIpO1xudmFyIFJhbmdlID0gcmVxdWlyZShcIi4uLy4uL3JhbmdlXCIpLlJhbmdlO1xudmFyIEJhc2VGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRfbW9kZVwiKS5Gb2xkTW9kZTtcbnZhciBUb2tlbkl0ZXJhdG9yID0gcmVxdWlyZShcIi4uLy4uL3Rva2VuX2l0ZXJhdG9yXCIpLlRva2VuSXRlcmF0b3I7XG5cbnZhciBGb2xkTW9kZSA9IGV4cG9ydHMuRm9sZE1vZGUgPSBmdW5jdGlvbigpIHt9O1xub29wLmluaGVyaXRzKEZvbGRNb2RlLCBCYXNlRm9sZE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG5cbiAgICAvLyByZWd1bGFyIGV4cHJlc3Npb25zIHRoYXQgaWRlbnRpZnkgc3RhcnRpbmcgYW5kIHN0b3BwaW5nIHBvaW50c1xuICAgIHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyID0gL1xcYihydWxlfGRlY2xhcmV8cXVlcnl8d2hlbnx0aGVuKVxcYi87IFxuICAgIHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIgPSAvXFxiZW5kXFxiLztcblxuICAgIHRoaXMuZ2V0Rm9sZFdpZGdldFJhbmdlID0gZnVuY3Rpb24oc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCh0aGlzLmZvbGRpbmdTdGFydE1hcmtlcik7XG4gICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgdmFyIGkgPSBtYXRjaC5pbmRleDtcblxuICAgICAgICAgICAgaWYgKG1hdGNoWzFdKSB7XG4gICAgICAgICAgICAgICAgdmFyIHBvc2l0aW9uID0ge3Jvdzogcm93LCBjb2x1bW46IGxpbmUubGVuZ3RofTtcbiAgICAgICAgICAgICAgICB2YXIgaXRlcmF0b3IgPSBuZXcgVG9rZW5JdGVyYXRvcihzZXNzaW9uLCBwb3NpdGlvbi5yb3csIHBvc2l0aW9uLmNvbHVtbik7XG4gICAgICAgICAgICAgICAgdmFyIHNlZWsgPSBcImVuZFwiO1xuICAgICAgICAgICAgICAgIHZhciB0b2tlbiA9IGl0ZXJhdG9yLmdldEN1cnJlbnRUb2tlbigpO1xuICAgICAgICAgICAgICAgIGlmICh0b2tlbi52YWx1ZSA9PSBcIndoZW5cIikge1xuICAgICAgICAgICAgICAgICAgICBzZWVrID0gXCJ0aGVuXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHdoaWxlICh0b2tlbikge1xuICAgICAgICAgICAgICAgICAgICBpZiAodG9rZW4udmFsdWUgPT0gc2VlaykgeyBcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBSYW5nZS5mcm9tUG9pbnRzKHBvc2l0aW9uICx7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93OiBpdGVyYXRvci5nZXRDdXJyZW50VG9rZW5Sb3coKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW46IGl0ZXJhdG9yLmdldEN1cnJlbnRUb2tlbkNvbHVtbigpXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0b2tlbiA9IGl0ZXJhdG9yLnN0ZXBGb3J3YXJkKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICAgICAgLy8gdGVzdCBlYWNoIGxpbmUsIGFuZCByZXR1cm4gYSByYW5nZSBvZiBzZWdtZW50cyB0byBjb2xsYXBzZVxuICAgIH07XG5cbn0pLmNhbGwoRm9sZE1vZGUucHJvdG90eXBlKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vZG9jX2NvbW1lbnRfaGlnaGxpZ2h0X3J1bGVzXCIpLkRvY0NvbW1lbnRIaWdobGlnaHRSdWxlcztcbnZhciBUZXh0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90ZXh0X2hpZ2hsaWdodF9ydWxlc1wiKS5UZXh0SGlnaGxpZ2h0UnVsZXM7XG5cbnZhciBKYXZhSGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaWRlbnRpZmllclJlID0gXCJbYS16QS1aXyRdW2EtekEtWjAtOV8kXSpcIjtcblxuICAgIC8vIHRha2VuIGZyb20gaHR0cDovL2Rvd25sb2FkLm9yYWNsZS5jb20vamF2YXNlL3R1dG9yaWFsL2phdmEvbnV0c2FuZGJvbHRzL19rZXl3b3Jkcy5odG1sXG4gICAgdmFyIGtleXdvcmRzID0gKFxuICAgIFwiYWJzdHJhY3R8Y29udGludWV8Zm9yfG5ld3xzd2l0Y2h8XCIgK1xuICAgIFwiYXNzZXJ0fGRlZmF1bHR8Z290b3xwYWNrYWdlfHN5bmNocm9uaXplZHxcIiArXG4gICAgXCJib29sZWFufGRvfGlmfHByaXZhdGV8dGhpc3xcIiArXG4gICAgXCJicmVha3xkb3VibGV8aW1wbGVtZW50c3xwcm90ZWN0ZWR8dGhyb3d8XCIgK1xuICAgIFwiYnl0ZXxlbHNlfGltcG9ydHxwdWJsaWN8dGhyb3dzfFwiICtcbiAgICBcImNhc2V8ZW51bXxpbnN0YW5jZW9mfHJldHVybnx0cmFuc2llbnR8XCIgK1xuICAgIFwiY2F0Y2h8ZXh0ZW5kc3xpbnR8c2hvcnR8dHJ5fFwiICtcbiAgICBcImNoYXJ8ZmluYWx8aW50ZXJmYWNlfHN0YXRpY3x2b2lkfFwiICtcbiAgICBcImNsYXNzfGZpbmFsbHl8bG9uZ3xzdHJpY3RmcHx2b2xhdGlsZXxcIiArXG4gICAgXCJjb25zdHxmbG9hdHxuYXRpdmV8c3VwZXJ8d2hpbGV8XCIgK1xuICAgIFwidmFyfGV4cG9ydHN8b3BlbnN8cmVxdWlyZXN8dXNlc3x5aWVsZHxcIiArXG4gICAgXCJtb2R1bGV8cGVybWl0c3woPzpub25cXFxcLSk/c2VhbGVkfHZhcnxcIiArXG4gICAgXCJwcm92aWRlc3x0b3x3aGVufFwiICtcbiAgICBcIm9wZW58cmVjb3JkfHRyYW5zaXRpdmV8d2l0aFwiICAgIFxuICAgICk7XG5cbiAgICB2YXIgYnVpbGRpbkNvbnN0YW50cyA9IChcIm51bGx8SW5maW5pdHl8TmFOfHVuZGVmaW5lZFwiKTtcblxuXG4gICAgdmFyIGxhbmdDbGFzc2VzID0gKFxuICAgICAgICBcIkFic3RyYWN0TWV0aG9kRXJyb3J8QXNzZXJ0aW9uRXJyb3J8Q2xhc3NDaXJjdWxhcml0eUVycm9yfFwiK1xuICAgICAgICBcIkNsYXNzRm9ybWF0RXJyb3J8RGVwcmVjYXRlZHxFbnVtQ29uc3RhbnROb3RQcmVzZW50RXhjZXB0aW9ufFwiK1xuICAgICAgICBcIkV4Y2VwdGlvbkluSW5pdGlhbGl6ZXJFcnJvcnxJbGxlZ2FsQWNjZXNzRXJyb3J8XCIrXG4gICAgICAgIFwiSWxsZWdhbFRocmVhZFN0YXRlRXhjZXB0aW9ufEluc3RhbnRpYXRpb25FcnJvcnxJbnRlcm5hbEVycm9yfFwiK1xuICAgICAgICBcIk5lZ2F0aXZlQXJyYXlTaXplRXhjZXB0aW9ufE5vU3VjaEZpZWxkRXJyb3J8T3ZlcnJpZGV8UHJvY2Vzc3xcIitcbiAgICAgICAgXCJQcm9jZXNzQnVpbGRlcnxTZWN1cml0eU1hbmFnZXJ8U3RyaW5nSW5kZXhPdXRPZkJvdW5kc0V4Y2VwdGlvbnxcIitcbiAgICAgICAgXCJTdXBwcmVzc1dhcm5pbmdzfFR5cGVOb3RQcmVzZW50RXhjZXB0aW9ufFVua25vd25FcnJvcnxcIitcbiAgICAgICAgXCJVbnNhdGlzZmllZExpbmtFcnJvcnxVbnN1cHBvcnRlZENsYXNzVmVyc2lvbkVycm9yfFZlcmlmeUVycm9yfFwiK1xuICAgICAgICBcIkluc3RhbnRpYXRpb25FeGNlcHRpb258SW5kZXhPdXRPZkJvdW5kc0V4Y2VwdGlvbnxcIitcbiAgICAgICAgXCJBcnJheUluZGV4T3V0T2ZCb3VuZHNFeGNlcHRpb258Q2xvbmVOb3RTdXBwb3J0ZWRFeGNlcHRpb258XCIrXG4gICAgICAgIFwiTm9TdWNoRmllbGRFeGNlcHRpb258SWxsZWdhbEFyZ3VtZW50RXhjZXB0aW9ufE51bWJlckZvcm1hdEV4Y2VwdGlvbnxcIitcbiAgICAgICAgXCJTZWN1cml0eUV4Y2VwdGlvbnxWb2lkfEluaGVyaXRhYmxlVGhyZWFkTG9jYWx8SWxsZWdhbFN0YXRlRXhjZXB0aW9ufFwiK1xuICAgICAgICBcIkludGVycnVwdGVkRXhjZXB0aW9ufE5vU3VjaE1ldGhvZEV4Y2VwdGlvbnxJbGxlZ2FsQWNjZXNzRXhjZXB0aW9ufFwiK1xuICAgICAgICBcIlVuc3VwcG9ydGVkT3BlcmF0aW9uRXhjZXB0aW9ufEVudW18U3RyaWN0TWF0aHxQYWNrYWdlfENvbXBpbGVyfFwiK1xuICAgICAgICBcIlJlYWRhYmxlfFJ1bnRpbWV8U3RyaW5nQnVpbGRlcnxNYXRofEluY29tcGF0aWJsZUNsYXNzQ2hhbmdlRXJyb3J8XCIrXG4gICAgICAgIFwiTm9TdWNoTWV0aG9kRXJyb3J8VGhyZWFkTG9jYWx8UnVudGltZVBlcm1pc3Npb258QXJpdGhtZXRpY0V4Y2VwdGlvbnxcIitcbiAgICAgICAgXCJOdWxsUG9pbnRlckV4Y2VwdGlvbnxMb25nfEludGVnZXJ8U2hvcnR8Qnl0ZXxEb3VibGV8TnVtYmVyfEZsb2F0fFwiK1xuICAgICAgICBcIkNoYXJhY3RlcnxCb29sZWFufFN0YWNrVHJhY2VFbGVtZW50fEFwcGVuZGFibGV8U3RyaW5nQnVmZmVyfFwiK1xuICAgICAgICBcIkl0ZXJhYmxlfFRocmVhZEdyb3VwfFJ1bm5hYmxlfFRocmVhZHxJbGxlZ2FsTW9uaXRvclN0YXRlRXhjZXB0aW9ufFwiK1xuICAgICAgICBcIlN0YWNrT3ZlcmZsb3dFcnJvcnxPdXRPZk1lbW9yeUVycm9yfFZpcnR1YWxNYWNoaW5lRXJyb3J8XCIrXG4gICAgICAgIFwiQXJyYXlTdG9yZUV4Y2VwdGlvbnxDbGFzc0Nhc3RFeGNlcHRpb258TGlua2FnZUVycm9yfFwiK1xuICAgICAgICBcIk5vQ2xhc3NEZWZGb3VuZEVycm9yfENsYXNzTm90Rm91bmRFeGNlcHRpb258UnVudGltZUV4Y2VwdGlvbnxcIitcbiAgICAgICAgXCJFeGNlcHRpb258VGhyZWFkRGVhdGh8RXJyb3J8VGhyb3dhYmxlfFN5c3RlbXxDbGFzc0xvYWRlcnxcIitcbiAgICAgICAgXCJDbG9uZWFibGV8Q2xhc3N8Q2hhclNlcXVlbmNlfENvbXBhcmFibGV8U3RyaW5nfE9iamVjdFwiXG4gICAgKTtcblxuICAgIHZhciBrZXl3b3JkTWFwcGVyID0gdGhpcy5jcmVhdGVLZXl3b3JkTWFwcGVyKHtcbiAgICAgICAgXCJ2YXJpYWJsZS5sYW5ndWFnZVwiOiBcInRoaXNcIixcbiAgICAgICAgXCJjb25zdGFudC5sYW5ndWFnZVwiOiBidWlsZGluQ29uc3RhbnRzLFxuICAgICAgICBcInN1cHBvcnQuZnVuY3Rpb25cIjogbGFuZ0NsYXNzZXNcbiAgICB9LCBcImlkZW50aWZpZXJcIik7XG5cbiAgICAvLyByZWdleHAgbXVzdCBub3QgaGF2ZSBjYXB0dXJpbmcgcGFyZW50aGVzZXMuIFVzZSAoPzopIGluc3RlYWQuXG4gICAgLy8gcmVnZXhwcyBhcmUgb3JkZXJlZCAtPiB0aGUgZmlyc3QgbWF0Y2ggaXMgdXNlZFxuXG4gICAgdGhpcy4kcnVsZXMgPSB7XG4gICAgICAgIFwic3RhcnRcIiA6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcL1xcXFwvLiokXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMuZ2V0U3RhcnRSdWxlKFwiZG9jLXN0YXJ0XCIpLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsIC8vIG11bHRpIGxpbmUgY29tbWVudFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcL1xcXFwqXCIsXG4gICAgICAgICAgICAgICAgbmV4dCA6IFwiY29tbWVudFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge2luY2x1ZGU6IFwibXVsdGlsaW5lLXN0cmluZ3NcIn0sXG4gICAgICAgICAgICB7aW5jbHVkZTogXCJzdHJpbmdzXCJ9LFxuICAgICAgICAgICAge2luY2x1ZGU6IFwiY29uc3RhbnRzXCJ9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIihvcGVuKD86XFxcXHMrKSk/bW9kdWxlKD89XFxcXHMqXFxcXHcpXCIsXG4gICAgICAgICAgICAgICAgdG9rZW46IFwia2V5d29yZFwiLFxuICAgICAgICAgICAgICAgIG5leHQ6IFt7XG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4OiBcIntcIixcbiAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwicGFyZW4ubHBhcmVuXCIsXG4gICAgICAgICAgICAgICAgICAgIG5leHQ6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWdleDogXCJ9XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJwYXJlbi5ycGFyZW5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHQ6IFwic3RhcnRcIlxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBGcm9tIFNlY3Rpb24gMy45IG9mIGh0dHA6Ly9jci5vcGVuamRrLmphdmEubmV0L35tci9qaWdzYXcvc3BlYy9qYXZhLXNlLTktamxzLWRpZmZzLnBkZlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXg6IFwiXFxcXGIocmVxdWlyZXN8dHJhbnNpdGl2ZXxleHBvcnRzfG9wZW5zfHRvfHVzZXN8cHJvdmlkZXN8d2l0aClcXFxcYlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwia2V5d29yZFwiIFxuICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFxzK1wiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IFwiaWRlbnRpZmllclwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXHcrXCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJwdW5jdHVhdGlvbi5vcGVyYXRvclwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleCA6IFwiLlwiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXHMrXCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4OiBcIlwiLCAvLyBleGl0IGlmIHRoZXJlIGlzIGFueXRoaW5nIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgbmV4dDogXCJzdGFydFwiXG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7aW5jbHVkZTogXCJzdGF0ZW1lbnRzXCJ9XG4gICAgICAgIF0sXG4gICAgICAgIFwiY29tbWVudFwiIDogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsIC8vIGNsb3NpbmcgY29tbWVudFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcKlxcXFwvXCIsXG4gICAgICAgICAgICAgICAgbmV4dCA6IFwic3RhcnRcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbiA6IFwiY29tbWVudFwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIFwic3RyaW5nc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFtcInB1bmN0dWF0aW9uXCIsIFwic3RyaW5nXCJdLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvKFxcLikoXCIpLyxcbiAgICAgICAgICAgICAgICBwdXNoOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiBcImxwYXJlblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXg6IC9cXFxcXFx7LyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHB1c2g6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXg6IC8kLyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dDogXCJzdGFydFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJycGFyZW5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXg6IC99LyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5jbHVkZTogXCJzdHJpbmdzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluY2x1ZGU6IFwiY29uc3RhbnRzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluY2x1ZGU6IFwic3RhdGVtZW50c1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAvXCIvLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwic3RyaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLCAvLyBzaW5nbGUgbGluZVxuICAgICAgICAgICAgICAgIHJlZ2V4IDogJ1tcIl0oPzooPzpcXFxcXFxcXC4pfCg/OlteXCJcXFxcXFxcXF0pKSo/W1wiXSdcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsIC8vIHNpbmdsZSBsaW5lXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlsnXSg/Oig/OlxcXFxcXFxcLil8KD86W14nXFxcXFxcXFxdKSkqP1snXVwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIFwibXVsdGlsaW5lLXN0cmluZ3NcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuOiBbXCJwdW5jdHVhdGlvblwiLCBcInN0cmluZ1wiXSxcbiAgICAgICAgICAgICAgICByZWdleDogLyhcXC4pKFwiXCJcIikvLFxuICAgICAgICAgICAgICAgIHB1c2g6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWdleDogJ1wiXCJcIicsXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiBcImxwYXJlblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXg6IC9cXFxcXFx7LyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHB1c2g6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXg6IC8kLyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dDogXCJzdGFydFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJycGFyZW5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXg6IC99LyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5jbHVkZTogXCJtdWx0aWxpbmUtc3RyaW5nc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmNsdWRlOiBcInN0cmluZ3NcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5jbHVkZTogXCJjb25zdGFudHNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5jbHVkZTogXCJzdGF0ZW1lbnRzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXg6IC9cXFxcLi9cbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInN0cmluZ1wiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAnXCJcIlwiJyxcbiAgICAgICAgICAgICAgICBwdXNoOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXg6ICdcIlwiXCInLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWdleCA6IC9cXFxcLi9cbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInN0cmluZ1wiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIFwiY29uc3RhbnRzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5udW1lcmljXCIsIC8vIGhleFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvMCg/Olt4WF1bMC05YS1mQS1GXVswLTlhLWZBLUZfXSp8W2JCXVswMV1bMDFfXSopW0xsU3NEZEZmWXldP1xcYi9cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5udW1lcmljXCIsIC8vIGZsb2F0XG4gICAgICAgICAgICAgICAgcmVnZXg6IC9bKy1dP1xcZFtcXGRfXSooPzooPzpcXC5bXFxkX10qKT8oPzpbZUVdWystXT9bXFxkX10rKT8pP1tMbFNzRGRGZll5XT9cXGIvXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQubGFuZ3VhZ2UuYm9vbGVhblwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIig/OnRydWV8ZmFsc2UpXFxcXGJcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBcInN0YXRlbWVudHNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuOiBbXCJrZXl3b3JkXCIsIFwidGV4dFwiLCBcImlkZW50aWZpZXJcIl0sXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiKHJlY29yZCkoXFxcXHMrKShcIitpZGVudGlmaWVyUmUrXCIpXFxcXGJcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJrZXl3b3JkXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiKD86XCIgKyBrZXl3b3JkcyArIFwiKVxcXFxiXCJcbiAgICAgICAgICAgIH0sIHsvL2Fubm90YXRpb25zXG4gICAgICAgICAgICAgICAgdG9rZW46IFwic3RvcmFnZS50eXBlLmFubm90YXRpb25cIixcbiAgICAgICAgICAgICAgICByZWdleDogXCJAXCIgKyBpZGVudGlmaWVyUmUgKyBcIlxcXFxiXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJlbnRpdHkubmFtZS5mdW5jdGlvblwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBpZGVudGlmaWVyUmUgKyBcIig/PVxcXFwoKVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IGtleXdvcmRNYXBwZXIsIC8vIFRPRE86IFVuaWNvZGUgZXNjYXBlIHNlcXVlbmNlc1xuICAgICAgICAgICAgICAgIC8vIFRPRE86IFVuaWNvZGUgaWRlbnRpZmllcnNcbiAgICAgICAgICAgICAgICByZWdleDogaWRlbnRpZmllclJlICsgXCJcXFxcYlwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwia2V5d29yZC5vcGVyYXRvclwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIiF8XFxcXCR8JXwmfFxcXFx8fFxcXFxefFxcXFwqfFxcXFwvfFxcXFwtXFxcXC18XFxcXC18XFxcXCtcXFxcK3xcXFxcK3x+fD09PXw9PXw9fCE9fCE9PXw8PXw+PXw8PD18Pj49fD4+Pj18PD58PHw+fCF8JiZ8XFxcXHxcXFxcfHxcXFxcP3xcXFxcOnxcXFxcKj18XFxcXC89fCU9fFxcXFwrPXxcXFxcLT18Jj18XFxcXHw9fFxcXFxePXxcXFxcYig/OmlufGluc3RhbmNlb2Z8bmV3fGRlbGV0ZXx0eXBlb2Z8dm9pZClcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcImxwYXJlblwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIltbKHtdXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJycGFyZW5cIixcbiAgICAgICAgICAgICAgICByZWdleDogXCJbXFxcXF0pfV1cIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICByZWdleDogXCJcXFxccytcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfTtcblxuICAgIFxuICAgIHRoaXMuZW1iZWRSdWxlcyhEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMsIFwiZG9jLVwiLFxuICAgICAgICBbIERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcy5nZXRFbmRSdWxlKFwic3RhcnRcIikgXSk7XG4gICAgdGhpcy5ub3JtYWxpemVSdWxlcygpO1xufTtcblxub29wLmluaGVyaXRzKEphdmFIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuZXhwb3J0cy5KYXZhSGlnaGxpZ2h0UnVsZXMgPSBKYXZhSGlnaGxpZ2h0UnVsZXM7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=