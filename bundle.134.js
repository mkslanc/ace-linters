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
var TokenIterator = (__webpack_require__(39216).TokenIterator);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjEzNC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBYTs7QUFFYixVQUFVLG1CQUFPLENBQUMsS0FBWTtBQUM5Qix5QkFBeUIsd0RBQW9EOztBQUU3RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0EsU0FBZ0M7Ozs7Ozs7O0FDN0NuQjs7QUFFYixVQUFVLG1CQUFPLENBQUMsS0FBWTtBQUM5QixlQUFlLGlDQUFzQjtBQUNyQywyQkFBMkIsMERBQXdEO0FBQ25GLHFCQUFxQiw4Q0FBb0M7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVELFlBQVk7Ozs7Ozs7O0FDckJDOztBQUViLFVBQVUsbUJBQU8sQ0FBQyxLQUFZO0FBQzlCLHlCQUF5Qix3REFBb0Q7QUFDN0UseUJBQXlCLHdEQUFvRDtBQUM3RSwrQkFBK0IsOERBQWlFOztBQUVoRztBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87QUFDUDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFdBQVc7QUFDWDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSx5QkFBeUI7QUFDekIsU0FBUztBQUNUO0FBQ0EsMkJBQTJCO0FBQzNCLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBLGdDQUFnQztBQUNoQyxlQUFlO0FBQ2Y7QUFDQSxnQ0FBZ0M7QUFDaEMsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTs7QUFFQSxTQUE0Qjs7Ozs7Ozs7QUNwT2Y7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLEtBQWU7QUFDakMsWUFBWSwyQ0FBNEI7QUFDeEMsbUJBQW1CLHFDQUErQjtBQUNsRCxvQkFBb0IsMENBQTZDOztBQUVqRSxlQUFlLFNBQWdCO0FBQy9COztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZ0NBQWdDO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLENBQUM7Ozs7Ozs7O0FDN0NZOztBQUViLFVBQVUsbUJBQU8sQ0FBQyxLQUFZO0FBQzlCLCtCQUErQiw4REFBaUU7QUFDaEcseUJBQXlCLHdEQUFvRDs7QUFFN0U7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixhQUFhLDZCQUE2QjtBQUMxQyxhQUFhLG1CQUFtQjtBQUNoQyxhQUFhLHFCQUFxQjtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0M7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBLHlDQUF5QztBQUN6QztBQUNBLDZCQUE2QjtBQUM3QjtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0Esb0NBQW9DO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWEsR0FBRztBQUNoQjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSw0QkFBNEI7QUFDNUIsYUFBYTtBQUNiO0FBQ0EsOEJBQThCO0FBQzlCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsU0FBMEIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2RvY19jb21tZW50X2hpZ2hsaWdodF9ydWxlcy5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2Ryb29scy5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2Ryb29sc19oaWdobGlnaHRfcnVsZXMuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9mb2xkaW5nL2Ryb29scy5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2phdmFfaGlnaGxpZ2h0X3J1bGVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xuXG52YXIgRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuJHJ1bGVzID0ge1xuICAgICAgICBcInN0YXJ0XCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJjb21tZW50LmRvYy50YWdcIixcbiAgICAgICAgICAgICAgICByZWdleDogXCJAXFxcXHcrKD89XFxcXHN8JClcIlxuICAgICAgICAgICAgfSwgRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLmdldFRhZ1J1bGUoKSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJjb21tZW50LmRvYy5ib2R5XCIsXG4gICAgICAgICAgICAgICAgY2FzZUluc2Vuc2l0aXZlOiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9O1xufTtcblxub29wLmluaGVyaXRzKERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLmdldFRhZ1J1bGUgPSBmdW5jdGlvbihzdGFydCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHRva2VuIDogXCJjb21tZW50LmRvYy50YWcuc3RvcmFnZS50eXBlXCIsXG4gICAgICAgIHJlZ2V4IDogXCJcXFxcYig/OlRPRE98RklYTUV8WFhYfEhBQ0spXFxcXGJcIlxuICAgIH07XG59O1xuXG5Eb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMuZ2V0U3RhcnRSdWxlID0gZnVuY3Rpb24oc3RhcnQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0b2tlbiA6IFwiY29tbWVudC5kb2NcIiwgLy8gZG9jIGNvbW1lbnRcbiAgICAgICAgcmVnZXg6IC9cXC9cXCpcXCooPyFcXC8pLyxcbiAgICAgICAgbmV4dCAgOiBzdGFydFxuICAgIH07XG59O1xuXG5Eb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMuZ2V0RW5kUnVsZSA9IGZ1bmN0aW9uIChzdGFydCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHRva2VuIDogXCJjb21tZW50LmRvY1wiLCAvLyBjbG9zaW5nIGNvbW1lbnRcbiAgICAgICAgcmVnZXggOiBcIlxcXFwqXFxcXC9cIixcbiAgICAgICAgbmV4dCAgOiBzdGFydFxuICAgIH07XG59O1xuXG5cbmV4cG9ydHMuRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzID0gRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0TW9kZSA9IHJlcXVpcmUoXCIuL3RleHRcIikuTW9kZTtcbnZhciBEcm9vbHNIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL2Ryb29sc19oaWdobGlnaHRfcnVsZXNcIikuRHJvb2xzSGlnaGxpZ2h0UnVsZXM7XG52YXIgRHJvb2xzRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9mb2xkaW5nL2Ryb29sc1wiKS5Gb2xkTW9kZTtcblxudmFyIE1vZGUgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLkhpZ2hsaWdodFJ1bGVzID0gRHJvb2xzSGlnaGxpZ2h0UnVsZXM7XG4gICAgdGhpcy5mb2xkaW5nUnVsZXMgPSBuZXcgRHJvb2xzRm9sZE1vZGUoKTtcbiAgICB0aGlzLiRiZWhhdmlvdXIgPSB0aGlzLiRkZWZhdWx0QmVoYXZpb3VyO1xuXG59O1xub29wLmluaGVyaXRzKE1vZGUsIFRleHRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuICAgIHRoaXMubGluZUNvbW1lbnRTdGFydCA9IFwiLy9cIjtcbiAgICB0aGlzLiRpZCA9IFwiYWNlL21vZGUvZHJvb2xzXCI7XG4gICAgdGhpcy5zbmlwcGV0RmlsZUlkID0gXCJhY2Uvc25pcHBldHMvZHJvb2xzXCI7XG59KS5jYWxsKE1vZGUucHJvdG90eXBlKTtcblxuZXhwb3J0cy5Nb2RlID0gTW9kZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xudmFyIEphdmFIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL2phdmFfaGlnaGxpZ2h0X3J1bGVzXCIpLkphdmFIaWdobGlnaHRSdWxlcztcbnZhciBEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9kb2NfY29tbWVudF9oaWdobGlnaHRfcnVsZXNcIikuRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzO1xuXG52YXIgaWRlbnRpZmllclJlID0gXCJbYS16QS1aXFxcXCRfXFx1MDBhMS1cXHVmZmZmXVthLXpBLVpcXFxcZFxcXFwkX1xcdTAwYTEtXFx1ZmZmZl0qXCI7XG52YXIgcGFja2FnZUlkZW50aWZpZXJSZSA9IFwiW2EtekEtWlxcXFwkX1xcdTAwYTEtXFx1ZmZmZl1bXFxcXC5hLXpBLVpcXFxcZFxcXFwkX1xcdTAwYTEtXFx1ZmZmZl0qXCI7XG5cbnZhciBEcm9vbHNIaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIGtleXdvcmRzID0gKFwiZGF0ZXxlZmZlY3RpdmV8ZXhwaXJlc3xsb2NrfG9ufGFjdGl2ZXxub3xsb29wfGF1dG98Zm9jdXNcIiArXG4gICAgICAgIFwifGFjdGl2YXRpb258Z3JvdXB8YWdlbmRhfHJ1bGVmbG93fGR1cmF0aW9ufHRpbWVyfGNhbGVuZGFyc3xyZWZyYWN0fGRpcmVjdFwiICtcbiAgICAgICAgXCJ8ZGlhbGVjdHxzYWxpZW5jZXxlbmFibGVkfGF0dHJpYnV0ZXN8ZXh0ZW5kc3x0ZW1wbGF0ZVwiICtcbiAgICAgICAgXCJ8ZnVuY3Rpb258Y29udGFpbnN8bWF0Y2hlc3xldmFsfGV4Y2x1ZGVzfHNvdW5kc2xpa2VcIiArXG4gICAgICAgIFwifG1lbWJlcm9mfG5vdHxpbnxvcnxhbmR8ZXhpc3RzfGZvcmFsbHxvdmVyfGZyb218ZW50cnl8cG9pbnR8YWNjdW11bGF0ZXxhY2N8Y29sbGVjdFwiICtcbiAgICAgICAgXCJ8YWN0aW9ufHJldmVyc2V8cmVzdWx0fGVuZHxpbml0fGluc3RhbmNlb2Z8ZXh0ZW5kc3xzdXBlcnxib29sZWFufGNoYXJ8Ynl0ZXxzaG9ydFwiICtcbiAgICAgICAgXCJ8aW50fGxvbmd8ZmxvYXR8ZG91YmxlfHRoaXN8dm9pZHxjbGFzc3xuZXd8Y2FzZXxmaW5hbHxpZnxlbHNlfGZvcnx3aGlsZXxkb1wiICtcbiAgICAgICAgXCJ8ZGVmYXVsdHx0cnl8Y2F0Y2h8ZmluYWxseXxzd2l0Y2h8c3luY2hyb25pemVkfHJldHVybnx0aHJvd3xicmVha3xjb250aW51ZXxhc3NlcnRcIiArXG4gICAgICAgIFwifG1vZGlmeXxzdGF0aWN8cHVibGljfHByb3RlY3RlZHxwcml2YXRlfGFic3RyYWN0fG5hdGl2ZXx0cmFuc2llbnR8dm9sYXRpbGVcIiArXG4gICAgICAgIFwifHN0cmljdGZwfHRocm93c3xpbnRlcmZhY2V8ZW51bXxpbXBsZW1lbnRzfHR5cGV8d2luZG93fHRyYWl0fG5vLWxvb3B8c3RyXCJcbiAgICAgICk7XG5cbiAgICAgIHZhciBsYW5nQ2xhc3NlcyA9IChcbiAgICAgICAgICBcIkFic3RyYWN0TWV0aG9kRXJyb3J8QXNzZXJ0aW9uRXJyb3J8Q2xhc3NDaXJjdWxhcml0eUVycm9yfFwiK1xuICAgICAgICAgIFwiQ2xhc3NGb3JtYXRFcnJvcnxEZXByZWNhdGVkfEVudW1Db25zdGFudE5vdFByZXNlbnRFeGNlcHRpb258XCIrXG4gICAgICAgICAgXCJFeGNlcHRpb25JbkluaXRpYWxpemVyRXJyb3J8SWxsZWdhbEFjY2Vzc0Vycm9yfFwiK1xuICAgICAgICAgIFwiSWxsZWdhbFRocmVhZFN0YXRlRXhjZXB0aW9ufEluc3RhbnRpYXRpb25FcnJvcnxJbnRlcm5hbEVycm9yfFwiK1xuICAgICAgICAgIFwiTmVnYXRpdmVBcnJheVNpemVFeGNlcHRpb258Tm9TdWNoRmllbGRFcnJvcnxPdmVycmlkZXxQcm9jZXNzfFwiK1xuICAgICAgICAgIFwiUHJvY2Vzc0J1aWxkZXJ8U2VjdXJpdHlNYW5hZ2VyfFN0cmluZ0luZGV4T3V0T2ZCb3VuZHNFeGNlcHRpb258XCIrXG4gICAgICAgICAgXCJTdXBwcmVzc1dhcm5pbmdzfFR5cGVOb3RQcmVzZW50RXhjZXB0aW9ufFVua25vd25FcnJvcnxcIitcbiAgICAgICAgICBcIlVuc2F0aXNmaWVkTGlua0Vycm9yfFVuc3VwcG9ydGVkQ2xhc3NWZXJzaW9uRXJyb3J8VmVyaWZ5RXJyb3J8XCIrXG4gICAgICAgICAgXCJJbnN0YW50aWF0aW9uRXhjZXB0aW9ufEluZGV4T3V0T2ZCb3VuZHNFeGNlcHRpb258XCIrXG4gICAgICAgICAgXCJBcnJheUluZGV4T3V0T2ZCb3VuZHNFeGNlcHRpb258Q2xvbmVOb3RTdXBwb3J0ZWRFeGNlcHRpb258XCIrXG4gICAgICAgICAgXCJOb1N1Y2hGaWVsZEV4Y2VwdGlvbnxJbGxlZ2FsQXJndW1lbnRFeGNlcHRpb258TnVtYmVyRm9ybWF0RXhjZXB0aW9ufFwiK1xuICAgICAgICAgIFwiU2VjdXJpdHlFeGNlcHRpb258Vm9pZHxJbmhlcml0YWJsZVRocmVhZExvY2FsfElsbGVnYWxTdGF0ZUV4Y2VwdGlvbnxcIitcbiAgICAgICAgICBcIkludGVycnVwdGVkRXhjZXB0aW9ufE5vU3VjaE1ldGhvZEV4Y2VwdGlvbnxJbGxlZ2FsQWNjZXNzRXhjZXB0aW9ufFwiK1xuICAgICAgICAgIFwiVW5zdXBwb3J0ZWRPcGVyYXRpb25FeGNlcHRpb258RW51bXxTdHJpY3RNYXRofFBhY2thZ2V8Q29tcGlsZXJ8XCIrXG4gICAgICAgICAgXCJSZWFkYWJsZXxSdW50aW1lfFN0cmluZ0J1aWxkZXJ8TWF0aHxJbmNvbXBhdGlibGVDbGFzc0NoYW5nZUVycm9yfFwiK1xuICAgICAgICAgIFwiTm9TdWNoTWV0aG9kRXJyb3J8VGhyZWFkTG9jYWx8UnVudGltZVBlcm1pc3Npb258QXJpdGhtZXRpY0V4Y2VwdGlvbnxcIitcbiAgICAgICAgICBcIk51bGxQb2ludGVyRXhjZXB0aW9ufExvbmd8SW50ZWdlcnxTaG9ydHxCeXRlfERvdWJsZXxOdW1iZXJ8RmxvYXR8XCIrXG4gICAgICAgICAgXCJDaGFyYWN0ZXJ8Qm9vbGVhbnxTdGFja1RyYWNlRWxlbWVudHxBcHBlbmRhYmxlfFN0cmluZ0J1ZmZlcnxcIitcbiAgICAgICAgICBcIkl0ZXJhYmxlfFRocmVhZEdyb3VwfFJ1bm5hYmxlfFRocmVhZHxJbGxlZ2FsTW9uaXRvclN0YXRlRXhjZXB0aW9ufFwiK1xuICAgICAgICAgIFwiU3RhY2tPdmVyZmxvd0Vycm9yfE91dE9mTWVtb3J5RXJyb3J8VmlydHVhbE1hY2hpbmVFcnJvcnxcIitcbiAgICAgICAgICBcIkFycmF5U3RvcmVFeGNlcHRpb258Q2xhc3NDYXN0RXhjZXB0aW9ufExpbmthZ2VFcnJvcnxcIitcbiAgICAgICAgICBcIk5vQ2xhc3NEZWZGb3VuZEVycm9yfENsYXNzTm90Rm91bmRFeGNlcHRpb258UnVudGltZUV4Y2VwdGlvbnxcIitcbiAgICAgICAgICBcIkV4Y2VwdGlvbnxUaHJlYWREZWF0aHxFcnJvcnxUaHJvd2FibGV8U3lzdGVtfENsYXNzTG9hZGVyfFwiK1xuICAgICAgICAgIFwiQ2xvbmVhYmxlfENsYXNzfENoYXJTZXF1ZW5jZXxDb21wYXJhYmxlfFN0cmluZ3xPYmplY3RcIlxuICAgICAgKTtcblxuICAgIHZhciBrZXl3b3JkTWFwcGVyID0gdGhpcy5jcmVhdGVLZXl3b3JkTWFwcGVyKHtcbiAgICAgICAgXCJ2YXJpYWJsZS5sYW5ndWFnZVwiOiBcInRoaXNcIixcbiAgICAgICAgXCJrZXl3b3JkXCI6IGtleXdvcmRzLFxuICAgICAgICBcImNvbnN0YW50Lmxhbmd1YWdlXCI6IFwibnVsbFwiLFxuICAgICAgICBcInN1cHBvcnQuY2xhc3NcIiA6IGxhbmdDbGFzc2VzLFxuICAgICAgICBcInN1cHBvcnQuZnVuY3Rpb25cIiA6IFwicmV0cmFjdHx1cGRhdGV8bW9kaWZ5fGluc2VydFwiXG4gICAgfSwgXCJpZGVudGlmaWVyXCIpO1xuXG4gICAgLy8gcmVnZXhwIG11c3Qgbm90IGhhdmUgY2FwdHVyaW5nIHBhcmVudGhlc2VzLiBVc2UgKD86KSBpbnN0ZWFkLlxuICAgIC8vIHJlZ2V4cHMgYXJlIG9yZGVyZWQgLT4gdGhlIGZpcnN0IG1hdGNoIGlzIHVzZWRcblxuICAgIHZhciBzdHJpbmdSdWxlcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIFt7XG4gICAgICAgIHRva2VuIDogXCJzdHJpbmdcIiwgLy8gc2luZ2xlIGxpbmVcbiAgICAgICAgcmVnZXggOiAnW1wiXSg/Oig/OlxcXFxcXFxcLil8KD86W15cIlxcXFxcXFxcXSkpKj9bXCJdJ1xuICAgICAgfSwge1xuICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsIC8vIHNpbmdsZSBsaW5lXG4gICAgICAgIHJlZ2V4IDogXCJbJ10oPzooPzpcXFxcXFxcXC4pfCg/OlteJ1xcXFxcXFxcXSkpKj9bJ11cIlxuICAgICAgfV07XG4gICAgfTtcblxuXG4gICAgICB2YXIgYmFzaWNQcmVSdWxlcyA9IGZ1bmN0aW9uKGJsb2NrQ29tbWVudFJ1bGVzKSB7XG4gICAgICAgIHJldHVybiBbe1xuICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcL1xcXFwvLiokXCJcbiAgICAgICAgfSxcbiAgICAgICAgRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLmdldFN0YXJ0UnVsZShcImRvYy1zdGFydFwiKSxcbiAgICAgICAge1xuICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIiwgLy8gbXVsdGkgbGluZSBjb21tZW50XG4gICAgICAgICAgICByZWdleCA6IFwiXFxcXC9cXFxcKlwiLFxuICAgICAgICAgICAgbmV4dCA6IGJsb2NrQ29tbWVudFJ1bGVzXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5udW1lcmljXCIsIC8vIGhleFxuICAgICAgICAgICAgcmVnZXggOiBcIjBbeFhdWzAtOWEtZkEtRl0rXFxcXGJcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLCAvLyBmbG9hdFxuICAgICAgICAgICAgcmVnZXggOiBcIlsrLV0/XFxcXGQrKD86KD86XFxcXC5cXFxcZCopPyg/OltlRV1bKy1dP1xcXFxkKyk/KT9cXFxcYlwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5sYW5ndWFnZS5ib29sZWFuXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiKD86dHJ1ZXxmYWxzZSlcXFxcYlwiXG4gICAgICAgICAgfV07XG4gICAgICB9O1xuXG4gICAgICB2YXIgYmxvY2tDb21tZW50UnVsZXMgPSBmdW5jdGlvbihyZXR1cm5SdWxlKSB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnQuYmxvY2tcIiwgLy8gY2xvc2luZyBjb21tZW50XG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwqXFxcXC9cIixcbiAgICAgICAgICAgICAgICBuZXh0IDogcmV0dXJuUnVsZVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbiA6IFwiY29tbWVudC5ibG9ja1wiXG4gICAgICAgICAgICB9XG4gICAgICAgIF07XG4gICAgICB9O1xuXG4gICAgICB2YXIgYmFzaWNQb3N0UnVsZXMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFt7XG4gICAgICAgICAgICB0b2tlbiA6IGtleXdvcmRNYXBwZXIsXG4gICAgICAgICAgICAvLyBUT0RPOiBVbmljb2RlIGVzY2FwZSBzZXF1ZW5jZXNcbiAgICAgICAgICAgIC8vIFRPRE86IFVuaWNvZGUgaWRlbnRpZmllcnNcbiAgICAgICAgICAgIHJlZ2V4IDogXCJbYS16QS1aXyRdW2EtekEtWjAtOV8kXSpcXFxcYlwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiIXxcXFxcJHwlfCZ8XFxcXCp8XFxcXC1cXFxcLXxcXFxcLXxcXFxcK1xcXFwrfFxcXFwrfH58PT09fD09fD18IT18IT09fDw9fD49fDw8PXw+Pj18Pj4+PXw8Pnw8fD58IXwmJnxcXFxcfFxcXFx8fFxcXFw/XFxcXDp8XFxcXCo9fCU9fFxcXFwrPXxcXFxcLT18Jj18XFxcXF49fFxcXFxiKD86aW58aW5zdGFuY2VvZnxuZXd8ZGVsZXRlfHR5cGVvZnx2b2lkKVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJscGFyZW5cIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJbWyh7XVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJycGFyZW5cIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJbXFxcXF0pfV1cIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwidGV4dFwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIlxcXFxzK1wiXG4gICAgICAgIH1dO1xuICAgICAgfTtcblxuXG4gICAgdGhpcy4kcnVsZXMgPSB7XG4gICAgICAgIFwic3RhcnRcIiA6IFtdLmNvbmNhdChiYXNpY1ByZVJ1bGVzKFwiYmxvY2suY29tbWVudFwiKSwgW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImVudGl0eS5uYW1lLnR5cGVcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiQFthLXpBLVpfJF1bYS16QS1aMC05XyRdKlxcXFxiXCJcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIC8vIHBhY2thZ2UgY29tLmV4YW1wbGVcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFtcImtleXdvcmRcIixcInRleHRcIixcImVudGl0eS5uYW1lLnR5cGVcIl0sXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIihwYWNrYWdlKShcXFxccyspKFwiICsgcGFja2FnZUlkZW50aWZpZXJSZSArXCIpXCJcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIC8vIGltcG9ydCBmdW5jdGlvbiBjb20uVXRpbC5zdGF0aWNNZXRob2RcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFtcImtleXdvcmRcIixcInRleHRcIixcImtleXdvcmRcIixcInRleHRcIixcImVudGl0eS5uYW1lLnR5cGVcIl0sXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIihpbXBvcnQpKFxcXFxzKykoZnVuY3Rpb24pKFxcXFxzKykoXCIgKyBwYWNrYWdlSWRlbnRpZmllclJlICtcIilcIlxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgLy8gaW1wb3J0IGZ1bmN0aW9uIGNvbS5VdGlsLnN0YXRpY01ldGhvZFxuICAgICAgICAgICAgICAgIHRva2VuIDogW1wia2V5d29yZFwiLFwidGV4dFwiLFwiZW50aXR5Lm5hbWUudHlwZVwiXSxcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiKGltcG9ydCkoXFxcXHMrKShcIiArIHBhY2thZ2VJZGVudGlmaWVyUmUgK1wiKVwiXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAvLyBnbG9iYWwgY29tLmV4YW1wbGUuVHlwZSBpZGVudGlmaWVyXG4gICAgICAgICAgICAgICAgdG9rZW4gOiBbXCJrZXl3b3JkXCIsXCJ0ZXh0XCIsXCJlbnRpdHkubmFtZS50eXBlXCIsXCJ0ZXh0XCIsXCJ2YXJpYWJsZVwiXSxcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiKGdsb2JhbCkoXFxcXHMrKShcIiArIHBhY2thZ2VJZGVudGlmaWVyUmUgK1wiKShcXFxccyspKFwiICsgaWRlbnRpZmllclJlICtcIilcIlxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgLy8gZGVjbGFyZSB0cmFpdCBEZWNsYXJlZFR5cGVcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFtcImtleXdvcmRcIixcInRleHRcIixcImtleXdvcmRcIixcInRleHRcIixcImVudGl0eS5uYW1lLnR5cGVcIl0sXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIihkZWNsYXJlKShcXFxccyspKHRyYWl0KShcXFxccyspKFwiICsgaWRlbnRpZmllclJlICtcIilcIlxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgLy8gZGVjbGFyZSB0cmFpdCBEZWNsYXJlZFR5cGVcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFtcImtleXdvcmRcIixcInRleHRcIixcImVudGl0eS5uYW1lLnR5cGVcIl0sXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIihkZWNsYXJlKShcXFxccyspKFwiICsgaWRlbnRpZmllclJlICtcIilcIlxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgLy8gZGVjbGFyZSB0cmFpdCBEZWNsYXJlZFR5cGVcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFtcImtleXdvcmRcIixcInRleHRcIixcImVudGl0eS5uYW1lLnR5cGVcIl0sXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIihleHRlbmRzKShcXFxccyspKFwiICsgcGFja2FnZUlkZW50aWZpZXJSZSArXCIpXCJcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIC8vIHJ1bGUgLi4uXG4gICAgICAgICAgICAgICAgdG9rZW4gOiBbXCJrZXl3b3JkXCIsXCJ0ZXh0XCJdLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIocnVsZSkoXFxcXHMrKVwiLFxuICAgICAgICAgICAgICAgIG5leHQgOiAgXCJhc3NldC5uYW1lXCJcbiAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgIHN0cmluZ1J1bGVzKCksXG4gICAgICAgICAgICAgIFt7XG4gICAgICAgICAgICAgICAgLy8gdmFyaWFibGUgOlxuICAgICAgICAgICAgICAgIHRva2VuIDogW1widmFyaWFibGUub3RoZXJcIixcInRleHRcIixcInRleHRcIl0sXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIihcIiArIGlkZW50aWZpZXJSZSArIFwiKShcXFxccyopKDopXCJcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIC8vIHF1ZXJ5IC4uLlxuICAgICAgICAgICAgICAgIHRva2VuIDogW1wia2V5d29yZFwiLFwidGV4dFwiXSxcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiKHF1ZXJ5KShcXFxccyspXCIsXG4gICAgICAgICAgICAgICAgbmV4dCA6ICBcImFzc2V0Lm5hbWVcIlxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgLy8gd2hlbiAuLi5cbiAgICAgICAgICAgICAgICB0b2tlbiA6IFtcImtleXdvcmRcIixcInRleHRcIl0sXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIih3aGVuKShcXFxccyopXCJcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIC8vIHRoZW4gPGphdmEvbXZlbCBjb2RlPiBlbmRcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFtcImtleXdvcmRcIixcInRleHRcIl0sXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIih0aGVuKShcXFxccyopXCIsXG4gICAgICAgICAgICAgICAgbmV4dCA6ICBcImphdmEtc3RhcnRcIlxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICB0b2tlbiA6IFwicGFyZW4ubHBhcmVuXCIsXG4gICAgICAgICAgICAgICAgICByZWdleCA6IC9bXFxbKHtdL1xuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICB0b2tlbiA6IFwicGFyZW4ucnBhcmVuXCIsXG4gICAgICAgICAgICAgICAgICByZWdleCA6IC9bXFxdKX1dL1xuICAgICAgICAgICAgICB9XSwgYmFzaWNQb3N0UnVsZXMoKSksXG4gICAgICAgIFwiYmxvY2suY29tbWVudFwiIDogYmxvY2tDb21tZW50UnVsZXMoXCJzdGFydFwiKSxcbiAgICAgICAgXCJhc3NldC5uYW1lXCIgOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImVudGl0eS5uYW1lXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAnW1wiXSg/Oig/OlxcXFxcXFxcLil8KD86W15cIlxcXFxcXFxcXSkpKj9bXCJdJ1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJlbnRpdHkubmFtZVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJbJ10oPzooPzpcXFxcXFxcXC4pfCg/OlteJ1xcXFxcXFxcXSkpKj9bJ11cIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJlbnRpdHkubmFtZVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogaWRlbnRpZmllclJlXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiXCIsXG4gICAgICAgICAgICAgICAgdG9rZW46IFwiZW1wdHlcIixcbiAgICAgICAgICAgICAgICBuZXh0OiBcInN0YXJ0XCJcbiAgICAgICAgICAgIH1dXG4gICAgfTtcbiAgICB0aGlzLmVtYmVkUnVsZXMoRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLCBcImRvYy1cIixcbiAgICAgICAgWyBEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMuZ2V0RW5kUnVsZShcInN0YXJ0XCIpIF0pO1xuXG4gICAgdGhpcy5lbWJlZFJ1bGVzKEphdmFIaWdobGlnaHRSdWxlcywgXCJqYXZhLVwiLCBbXG4gICAgICB7XG4gICAgICAgdG9rZW4gOiBcInN1cHBvcnQuZnVuY3Rpb25cIixcbiAgICAgICByZWdleDogXCJcXFxcYihpbnNlcnR8bW9kaWZ5fHJldHJhY3R8dXBkYXRlKVxcXFxiXCJcbiAgICAgfSwge1xuICAgICAgIHRva2VuIDogXCJrZXl3b3JkXCIsXG4gICAgICAgcmVnZXg6IFwiXFxcXGJlbmRcXFxcYlwiLFxuICAgICAgIG5leHQgIDogXCJzdGFydFwiXG4gICAgfV0pO1xuXG59O1xuXG5vb3AuaW5oZXJpdHMoRHJvb2xzSGlnaGxpZ2h0UnVsZXMsIFRleHRIaWdobGlnaHRSdWxlcyk7XG5cbmV4cG9ydHMuRHJvb2xzSGlnaGxpZ2h0UnVsZXMgPSBEcm9vbHNIaWdobGlnaHRSdWxlcztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uLy4uL2xpYi9vb3BcIik7XG52YXIgUmFuZ2UgPSByZXF1aXJlKFwiLi4vLi4vcmFuZ2VcIikuUmFuZ2U7XG52YXIgQmFzZUZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZF9tb2RlXCIpLkZvbGRNb2RlO1xudmFyIFRva2VuSXRlcmF0b3IgPSByZXF1aXJlKFwiLi4vLi4vdG9rZW5faXRlcmF0b3JcIikuVG9rZW5JdGVyYXRvcjtcblxudmFyIEZvbGRNb2RlID0gZXhwb3J0cy5Gb2xkTW9kZSA9IGZ1bmN0aW9uKCkge307XG5vb3AuaW5oZXJpdHMoRm9sZE1vZGUsIEJhc2VGb2xkTW9kZSk7XG5cbihmdW5jdGlvbigpIHtcblxuICAgIC8vIHJlZ3VsYXIgZXhwcmVzc2lvbnMgdGhhdCBpZGVudGlmeSBzdGFydGluZyBhbmQgc3RvcHBpbmcgcG9pbnRzXG4gICAgdGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIgPSAvXFxiKHJ1bGV8ZGVjbGFyZXxxdWVyeXx3aGVufHRoZW4pXFxiLzsgXG4gICAgdGhpcy5mb2xkaW5nU3RvcE1hcmtlciA9IC9cXGJlbmRcXGIvO1xuXG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0UmFuZ2UgPSBmdW5jdGlvbihzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdykge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyKTtcbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICB2YXIgaSA9IG1hdGNoLmluZGV4O1xuXG4gICAgICAgICAgICBpZiAobWF0Y2hbMV0pIHtcbiAgICAgICAgICAgICAgICB2YXIgcG9zaXRpb24gPSB7cm93OiByb3csIGNvbHVtbjogbGluZS5sZW5ndGh9O1xuICAgICAgICAgICAgICAgIHZhciBpdGVyYXRvciA9IG5ldyBUb2tlbkl0ZXJhdG9yKHNlc3Npb24sIHBvc2l0aW9uLnJvdywgcG9zaXRpb24uY29sdW1uKTtcbiAgICAgICAgICAgICAgICB2YXIgc2VlayA9IFwiZW5kXCI7XG4gICAgICAgICAgICAgICAgdmFyIHRva2VuID0gaXRlcmF0b3IuZ2V0Q3VycmVudFRva2VuKCk7XG4gICAgICAgICAgICAgICAgaWYgKHRva2VuLnZhbHVlID09IFwid2hlblwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlZWsgPSBcInRoZW5cIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgd2hpbGUgKHRva2VuKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0b2tlbi52YWx1ZSA9PSBzZWVrKSB7IFxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFJhbmdlLmZyb21Qb2ludHMocG9zaXRpb24gLHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3c6IGl0ZXJhdG9yLmdldEN1cnJlbnRUb2tlblJvdygpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbjogaXRlcmF0b3IuZ2V0Q3VycmVudFRva2VuQ29sdW1uKClcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRva2VuID0gaXRlcmF0b3Iuc3RlcEZvcndhcmQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgICAgICAvLyB0ZXN0IGVhY2ggbGluZSwgYW5kIHJldHVybiBhIHJhbmdlIG9mIHNlZ21lbnRzIHRvIGNvbGxhcHNlXG4gICAgfTtcblxufSkuY2FsbChGb2xkTW9kZS5wcm90b3R5cGUpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9kb2NfY29tbWVudF9oaWdobGlnaHRfcnVsZXNcIikuRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzO1xudmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcblxudmFyIEphdmFIaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpZGVudGlmaWVyUmUgPSBcIlthLXpBLVpfJF1bYS16QS1aMC05XyRdKlwiO1xuXG4gICAgLy8gdGFrZW4gZnJvbSBodHRwOi8vZG93bmxvYWQub3JhY2xlLmNvbS9qYXZhc2UvdHV0b3JpYWwvamF2YS9udXRzYW5kYm9sdHMvX2tleXdvcmRzLmh0bWxcbiAgICB2YXIga2V5d29yZHMgPSAoXG4gICAgXCJhYnN0cmFjdHxjb250aW51ZXxmb3J8bmV3fHN3aXRjaHxcIiArXG4gICAgXCJhc3NlcnR8ZGVmYXVsdHxnb3RvfHBhY2thZ2V8c3luY2hyb25pemVkfFwiICtcbiAgICBcImJvb2xlYW58ZG98aWZ8cHJpdmF0ZXx0aGlzfFwiICtcbiAgICBcImJyZWFrfGRvdWJsZXxpbXBsZW1lbnRzfHByb3RlY3RlZHx0aHJvd3xcIiArXG4gICAgXCJieXRlfGVsc2V8aW1wb3J0fHB1YmxpY3x0aHJvd3N8XCIgK1xuICAgIFwiY2FzZXxlbnVtfGluc3RhbmNlb2Z8cmV0dXJufHRyYW5zaWVudHxcIiArXG4gICAgXCJjYXRjaHxleHRlbmRzfGludHxzaG9ydHx0cnl8XCIgK1xuICAgIFwiY2hhcnxmaW5hbHxpbnRlcmZhY2V8c3RhdGljfHZvaWR8XCIgK1xuICAgIFwiY2xhc3N8ZmluYWxseXxsb25nfHN0cmljdGZwfHZvbGF0aWxlfFwiICtcbiAgICBcImNvbnN0fGZsb2F0fG5hdGl2ZXxzdXBlcnx3aGlsZXxcIiArXG4gICAgXCJ2YXJ8ZXhwb3J0c3xvcGVuc3xyZXF1aXJlc3x1c2VzfHlpZWxkfFwiICtcbiAgICBcIm1vZHVsZXxwZXJtaXRzfCg/Om5vblxcXFwtKT9zZWFsZWR8dmFyfFwiICtcbiAgICBcInByb3ZpZGVzfHRvfHdoZW58XCIgK1xuICAgIFwib3BlbnxyZWNvcmR8dHJhbnNpdGl2ZXx3aXRoXCIgICAgXG4gICAgKTtcblxuICAgIHZhciBidWlsZGluQ29uc3RhbnRzID0gKFwibnVsbHxJbmZpbml0eXxOYU58dW5kZWZpbmVkXCIpO1xuXG5cbiAgICB2YXIgbGFuZ0NsYXNzZXMgPSAoXG4gICAgICAgIFwiQWJzdHJhY3RNZXRob2RFcnJvcnxBc3NlcnRpb25FcnJvcnxDbGFzc0NpcmN1bGFyaXR5RXJyb3J8XCIrXG4gICAgICAgIFwiQ2xhc3NGb3JtYXRFcnJvcnxEZXByZWNhdGVkfEVudW1Db25zdGFudE5vdFByZXNlbnRFeGNlcHRpb258XCIrXG4gICAgICAgIFwiRXhjZXB0aW9uSW5Jbml0aWFsaXplckVycm9yfElsbGVnYWxBY2Nlc3NFcnJvcnxcIitcbiAgICAgICAgXCJJbGxlZ2FsVGhyZWFkU3RhdGVFeGNlcHRpb258SW5zdGFudGlhdGlvbkVycm9yfEludGVybmFsRXJyb3J8XCIrXG4gICAgICAgIFwiTmVnYXRpdmVBcnJheVNpemVFeGNlcHRpb258Tm9TdWNoRmllbGRFcnJvcnxPdmVycmlkZXxQcm9jZXNzfFwiK1xuICAgICAgICBcIlByb2Nlc3NCdWlsZGVyfFNlY3VyaXR5TWFuYWdlcnxTdHJpbmdJbmRleE91dE9mQm91bmRzRXhjZXB0aW9ufFwiK1xuICAgICAgICBcIlN1cHByZXNzV2FybmluZ3N8VHlwZU5vdFByZXNlbnRFeGNlcHRpb258VW5rbm93bkVycm9yfFwiK1xuICAgICAgICBcIlVuc2F0aXNmaWVkTGlua0Vycm9yfFVuc3VwcG9ydGVkQ2xhc3NWZXJzaW9uRXJyb3J8VmVyaWZ5RXJyb3J8XCIrXG4gICAgICAgIFwiSW5zdGFudGlhdGlvbkV4Y2VwdGlvbnxJbmRleE91dE9mQm91bmRzRXhjZXB0aW9ufFwiK1xuICAgICAgICBcIkFycmF5SW5kZXhPdXRPZkJvdW5kc0V4Y2VwdGlvbnxDbG9uZU5vdFN1cHBvcnRlZEV4Y2VwdGlvbnxcIitcbiAgICAgICAgXCJOb1N1Y2hGaWVsZEV4Y2VwdGlvbnxJbGxlZ2FsQXJndW1lbnRFeGNlcHRpb258TnVtYmVyRm9ybWF0RXhjZXB0aW9ufFwiK1xuICAgICAgICBcIlNlY3VyaXR5RXhjZXB0aW9ufFZvaWR8SW5oZXJpdGFibGVUaHJlYWRMb2NhbHxJbGxlZ2FsU3RhdGVFeGNlcHRpb258XCIrXG4gICAgICAgIFwiSW50ZXJydXB0ZWRFeGNlcHRpb258Tm9TdWNoTWV0aG9kRXhjZXB0aW9ufElsbGVnYWxBY2Nlc3NFeGNlcHRpb258XCIrXG4gICAgICAgIFwiVW5zdXBwb3J0ZWRPcGVyYXRpb25FeGNlcHRpb258RW51bXxTdHJpY3RNYXRofFBhY2thZ2V8Q29tcGlsZXJ8XCIrXG4gICAgICAgIFwiUmVhZGFibGV8UnVudGltZXxTdHJpbmdCdWlsZGVyfE1hdGh8SW5jb21wYXRpYmxlQ2xhc3NDaGFuZ2VFcnJvcnxcIitcbiAgICAgICAgXCJOb1N1Y2hNZXRob2RFcnJvcnxUaHJlYWRMb2NhbHxSdW50aW1lUGVybWlzc2lvbnxBcml0aG1ldGljRXhjZXB0aW9ufFwiK1xuICAgICAgICBcIk51bGxQb2ludGVyRXhjZXB0aW9ufExvbmd8SW50ZWdlcnxTaG9ydHxCeXRlfERvdWJsZXxOdW1iZXJ8RmxvYXR8XCIrXG4gICAgICAgIFwiQ2hhcmFjdGVyfEJvb2xlYW58U3RhY2tUcmFjZUVsZW1lbnR8QXBwZW5kYWJsZXxTdHJpbmdCdWZmZXJ8XCIrXG4gICAgICAgIFwiSXRlcmFibGV8VGhyZWFkR3JvdXB8UnVubmFibGV8VGhyZWFkfElsbGVnYWxNb25pdG9yU3RhdGVFeGNlcHRpb258XCIrXG4gICAgICAgIFwiU3RhY2tPdmVyZmxvd0Vycm9yfE91dE9mTWVtb3J5RXJyb3J8VmlydHVhbE1hY2hpbmVFcnJvcnxcIitcbiAgICAgICAgXCJBcnJheVN0b3JlRXhjZXB0aW9ufENsYXNzQ2FzdEV4Y2VwdGlvbnxMaW5rYWdlRXJyb3J8XCIrXG4gICAgICAgIFwiTm9DbGFzc0RlZkZvdW5kRXJyb3J8Q2xhc3NOb3RGb3VuZEV4Y2VwdGlvbnxSdW50aW1lRXhjZXB0aW9ufFwiK1xuICAgICAgICBcIkV4Y2VwdGlvbnxUaHJlYWREZWF0aHxFcnJvcnxUaHJvd2FibGV8U3lzdGVtfENsYXNzTG9hZGVyfFwiK1xuICAgICAgICBcIkNsb25lYWJsZXxDbGFzc3xDaGFyU2VxdWVuY2V8Q29tcGFyYWJsZXxTdHJpbmd8T2JqZWN0XCJcbiAgICApO1xuXG4gICAgdmFyIGtleXdvcmRNYXBwZXIgPSB0aGlzLmNyZWF0ZUtleXdvcmRNYXBwZXIoe1xuICAgICAgICBcInZhcmlhYmxlLmxhbmd1YWdlXCI6IFwidGhpc1wiLFxuICAgICAgICBcImNvbnN0YW50Lmxhbmd1YWdlXCI6IGJ1aWxkaW5Db25zdGFudHMsXG4gICAgICAgIFwic3VwcG9ydC5mdW5jdGlvblwiOiBsYW5nQ2xhc3Nlc1xuICAgIH0sIFwiaWRlbnRpZmllclwiKTtcblxuICAgIC8vIHJlZ2V4cCBtdXN0IG5vdCBoYXZlIGNhcHR1cmluZyBwYXJlbnRoZXNlcy4gVXNlICg/OikgaW5zdGVhZC5cbiAgICAvLyByZWdleHBzIGFyZSBvcmRlcmVkIC0+IHRoZSBmaXJzdCBtYXRjaCBpcyB1c2VkXG5cbiAgICB0aGlzLiRydWxlcyA9IHtcbiAgICAgICAgXCJzdGFydFwiIDogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwvXFxcXC8uKiRcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcy5nZXRTdGFydFJ1bGUoXCJkb2Mtc3RhcnRcIiksXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIiwgLy8gbXVsdGkgbGluZSBjb21tZW50XG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwvXFxcXCpcIixcbiAgICAgICAgICAgICAgICBuZXh0IDogXCJjb21tZW50XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7aW5jbHVkZTogXCJtdWx0aWxpbmUtc3RyaW5nc1wifSxcbiAgICAgICAgICAgIHtpbmNsdWRlOiBcInN0cmluZ3NcIn0sXG4gICAgICAgICAgICB7aW5jbHVkZTogXCJjb25zdGFudHNcIn0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiKG9wZW4oPzpcXFxccyspKT9tb2R1bGUoPz1cXFxccypcXFxcdylcIixcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJrZXl3b3JkXCIsXG4gICAgICAgICAgICAgICAgbmV4dDogW3tcbiAgICAgICAgICAgICAgICAgICAgcmVnZXg6IFwie1wiLFxuICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJwYXJlbi5scGFyZW5cIixcbiAgICAgICAgICAgICAgICAgICAgbmV4dDogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiBcIn1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiBcInBhcmVuLnJwYXJlblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dDogXCJzdGFydFwiXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZyb20gU2VjdGlvbiAzLjkgb2YgaHR0cDovL2NyLm9wZW5qZGsuamF2YS5uZXQvfm1yL2ppZ3Nhdy9zcGVjL2phdmEtc2UtOS1qbHMtZGlmZnMucGRmXG4gICAgICAgICAgICAgICAgICAgICAgICByZWdleDogXCJcXFxcYihyZXF1aXJlc3x0cmFuc2l0aXZlfGV4cG9ydHN8b3BlbnN8dG98dXNlc3xwcm92aWRlc3x3aXRoKVxcXFxiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJrZXl3b3JkXCIgXG4gICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXHMrXCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJpZGVudGlmaWVyXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcdytcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcInB1bmN0dWF0aW9uLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIuXCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxccytcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgcmVnZXg6IFwiXCIsIC8vIGV4aXQgaWYgdGhlcmUgaXMgYW55dGhpbmcgZWxzZVxuICAgICAgICAgICAgICAgICAgICBuZXh0OiBcInN0YXJ0XCJcbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtpbmNsdWRlOiBcInN0YXRlbWVudHNcIn1cbiAgICAgICAgXSxcbiAgICAgICAgXCJjb21tZW50XCIgOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIiwgLy8gY2xvc2luZyBjb21tZW50XG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwqXFxcXC9cIixcbiAgICAgICAgICAgICAgICBuZXh0IDogXCJzdGFydFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuIDogXCJjb21tZW50XCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgXCJzdHJpbmdzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogW1wicHVuY3R1YXRpb25cIiwgXCJzdHJpbmdcIl0sXG4gICAgICAgICAgICAgICAgcmVnZXg6IC8oXFwuKShcIikvLFxuICAgICAgICAgICAgICAgIHB1c2g6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwibHBhcmVuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWdleDogL1xcXFxcXHsvLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHVzaDogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWdleDogLyQvLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0OiBcInN0YXJ0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiBcInJwYXJlblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWdleDogL30vLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmNsdWRlOiBcInN0cmluZ3NcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5jbHVkZTogXCJjb25zdGFudHNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5jbHVkZTogXCJzdGF0ZW1lbnRzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXg6IC9cIi8sXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzdHJpbmdcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSwgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsIC8vIHNpbmdsZSBsaW5lXG4gICAgICAgICAgICAgICAgcmVnZXggOiAnW1wiXSg/Oig/OlxcXFxcXFxcLil8KD86W15cIlxcXFxcXFxcXSkpKj9bXCJdJ1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIiwgLy8gc2luZ2xlIGxpbmVcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiWyddKD86KD86XFxcXFxcXFwuKXwoPzpbXidcXFxcXFxcXF0pKSo/WyddXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgXCJtdWx0aWxpbmUtc3RyaW5nc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFtcInB1bmN0dWF0aW9uXCIsIFwic3RyaW5nXCJdLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvKFxcLikoXCJcIlwiKS8sXG4gICAgICAgICAgICAgICAgcHVzaDogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAnXCJcIlwiJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwibHBhcmVuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWdleDogL1xcXFxcXHsvLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHVzaDogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWdleDogLyQvLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0OiBcInN0YXJ0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiBcInJwYXJlblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWdleDogL30vLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmNsdWRlOiBcIm11bHRpbGluZS1zdHJpbmdzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluY2x1ZGU6IFwic3RyaW5nc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmNsdWRlOiBcImNvbnN0YW50c1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmNsdWRlOiBcInN0YXRlbWVudHNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWdleDogL1xcXFwuL1xuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwic3RyaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6ICdcIlwiXCInLFxuICAgICAgICAgICAgICAgIHB1c2g6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWdleDogJ1wiXCJcIicsXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogL1xcXFwuL1xuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwic3RyaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgXCJjb25zdGFudHNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lm51bWVyaWNcIiwgLy8gaGV4XG4gICAgICAgICAgICAgICAgcmVnZXg6IC8wKD86W3hYXVswLTlhLWZBLUZdWzAtOWEtZkEtRl9dKnxbYkJdWzAxXVswMV9dKilbTGxTc0RkRmZZeV0/XFxiL1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lm51bWVyaWNcIiwgLy8gZmxvYXRcbiAgICAgICAgICAgICAgICByZWdleDogL1srLV0/XFxkW1xcZF9dKig/Oig/OlxcLltcXGRfXSopPyg/OltlRV1bKy1dP1tcXGRfXSspPyk/W0xsU3NEZEZmWXldP1xcYi9cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5sYW5ndWFnZS5ib29sZWFuXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiKD86dHJ1ZXxmYWxzZSlcXFxcYlwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIFwic3RhdGVtZW50c1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFtcImtleXdvcmRcIiwgXCJ0ZXh0XCIsIFwiaWRlbnRpZmllclwiXSxcbiAgICAgICAgICAgICAgICByZWdleDogXCIocmVjb3JkKShcXFxccyspKFwiK2lkZW50aWZpZXJSZStcIilcXFxcYlwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcImtleXdvcmRcIixcbiAgICAgICAgICAgICAgICByZWdleDogXCIoPzpcIiArIGtleXdvcmRzICsgXCIpXFxcXGJcIlxuICAgICAgICAgICAgfSwgey8vYW5ub3RhdGlvbnNcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJzdG9yYWdlLnR5cGUuYW5ub3RhdGlvblwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIkBcIiArIGlkZW50aWZpZXJSZSArIFwiXFxcXGJcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcImVudGl0eS5uYW1lLmZ1bmN0aW9uXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IGlkZW50aWZpZXJSZSArIFwiKD89XFxcXCgpXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjoga2V5d29yZE1hcHBlciwgLy8gVE9ETzogVW5pY29kZSBlc2NhcGUgc2VxdWVuY2VzXG4gICAgICAgICAgICAgICAgLy8gVE9ETzogVW5pY29kZSBpZGVudGlmaWVyc1xuICAgICAgICAgICAgICAgIHJlZ2V4OiBpZGVudGlmaWVyUmUgKyBcIlxcXFxiXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJrZXl3b3JkLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiIXxcXFxcJHwlfCZ8XFxcXHx8XFxcXF58XFxcXCp8XFxcXC98XFxcXC1cXFxcLXxcXFxcLXxcXFxcK1xcXFwrfFxcXFwrfH58PT09fD09fD18IT18IT09fDw9fD49fDw8PXw+Pj18Pj4+PXw8Pnw8fD58IXwmJnxcXFxcfFxcXFx8fFxcXFw/fFxcXFw6fFxcXFwqPXxcXFxcLz18JT18XFxcXCs9fFxcXFwtPXwmPXxcXFxcfD18XFxcXF49fFxcXFxiKD86aW58aW5zdGFuY2VvZnxuZXd8ZGVsZXRlfHR5cGVvZnx2b2lkKVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwibHBhcmVuXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiW1soe11cIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInJwYXJlblwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIltcXFxcXSl9XVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFxzK1wiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9O1xuXG4gICAgXG4gICAgdGhpcy5lbWJlZFJ1bGVzKERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcywgXCJkb2MtXCIsXG4gICAgICAgIFsgRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLmdldEVuZFJ1bGUoXCJzdGFydFwiKSBdKTtcbiAgICB0aGlzLm5vcm1hbGl6ZVJ1bGVzKCk7XG59O1xuXG5vb3AuaW5oZXJpdHMoSmF2YUhpZ2hsaWdodFJ1bGVzLCBUZXh0SGlnaGxpZ2h0UnVsZXMpO1xuXG5leHBvcnRzLkphdmFIaWdobGlnaHRSdWxlcyA9IEphdmFIaWdobGlnaHRSdWxlcztcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==