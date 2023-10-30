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
    "var"
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
        "keyword": keywords,
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
            }, {
                token : "string", // single line
                regex : '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'
            }, {
                token : "string", // single line
                regex : "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"
            }, {
                token : "constant.numeric", // hex
                regex : /0(?:[xX][0-9a-fA-F][0-9a-fA-F_]*|[bB][01][01_]*)[LlSsDdFfYy]?\b/
            }, {
                token : "constant.numeric", // float
                regex : /[+-]?\d[\d_]*(?:(?:\.[\d_]*)?(?:[eE][+-]?[\d_]+)?)?[LlSsDdFfYy]?\b/
            }, {
                token : "constant.language.boolean",
                regex : "(?:true|false)\\b"
            }, {
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
            }, {
                token : keywordMapper,
                // TODO: Unicode escape sequences
                // TODO: Unicode identifiers
                regex : "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
            }, {
                token : "keyword.operator",
                regex : "!|\\$|%|&|\\||\\^|\\*|\\/|\\-\\-|\\-|\\+\\+|\\+|~|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\\|\\||\\?|\\:|\\*=|\\/=|%=|\\+=|\\-=|&=|\\|=|\\^=|\\b(?:in|instanceof|new|delete|typeof|void)"
            }, {
                token : "lparen",
                regex : "[[({]"
            }, {
                token : "rparen",
                regex : "[\\])}]"
            }, {
                token : "text",
                regex : "\\s+"
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

    
    this.embedRules(DocCommentHighlightRules, "doc-",
        [ DocCommentHighlightRules.getEndRule("start") ]);
    this.normalizeRules();
};

oop.inherits(JavaHighlightRules, TextHighlightRules);

exports.x = JavaHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjEzNC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBYTs7QUFFYixVQUFVLG1CQUFPLENBQUMsS0FBWTtBQUM5Qix5QkFBeUIsd0RBQW9EOztBQUU3RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0EsU0FBZ0M7Ozs7Ozs7O0FDN0NuQjs7QUFFYixVQUFVLG1CQUFPLENBQUMsS0FBWTtBQUM5QixlQUFlLGlDQUFzQjtBQUNyQywyQkFBMkIsMERBQXdEO0FBQ25GLHFCQUFxQiw4Q0FBb0M7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVELFlBQVk7Ozs7Ozs7O0FDckJDOztBQUViLFVBQVUsbUJBQU8sQ0FBQyxLQUFZO0FBQzlCLHlCQUF5Qix3REFBb0Q7QUFDN0UseUJBQXlCLHdEQUFvRDtBQUM3RSwrQkFBK0IsOERBQWlFOztBQUVoRztBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87QUFDUDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFdBQVc7QUFDWDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSx5QkFBeUI7QUFDekIsU0FBUztBQUNUO0FBQ0EsMkJBQTJCO0FBQzNCLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBLGdDQUFnQztBQUNoQyxlQUFlO0FBQ2Y7QUFDQSxnQ0FBZ0M7QUFDaEMsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTs7QUFFQSxTQUE0Qjs7Ozs7Ozs7QUNwT2Y7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLEtBQWU7QUFDakMsWUFBWSwyQ0FBNEI7QUFDeEMsbUJBQW1CLHFDQUErQjtBQUNsRCxvQkFBb0IsbURBQTZDOztBQUVqRSxlQUFlLFNBQWdCO0FBQy9COztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZ0NBQWdDO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLENBQUM7Ozs7Ozs7O0FDN0NZOztBQUViLFVBQVUsbUJBQU8sQ0FBQyxLQUFZO0FBQzlCLCtCQUErQiw4REFBaUU7QUFDaEcseUJBQXlCLHdEQUFvRDs7QUFFN0U7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLDZCQUE2QjtBQUM3QixhQUFhO0FBQ2I7QUFDQSwrQkFBK0I7QUFDL0IsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLFNBQTBCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9kb2NfY29tbWVudF9oaWdobGlnaHRfcnVsZXMuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9kcm9vbHMuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9kcm9vbHNfaGlnaGxpZ2h0X3J1bGVzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvZm9sZGluZy9kcm9vbHMuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9qYXZhX2hpZ2hsaWdodF9ydWxlcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcblxudmFyIERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLiRydWxlcyA9IHtcbiAgICAgICAgXCJzdGFydFwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwiY29tbWVudC5kb2MudGFnXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiQFxcXFx3Kyg/PVxcXFxzfCQpXCJcbiAgICAgICAgICAgIH0sIERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcy5nZXRUYWdSdWxlKCksIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwiY29tbWVudC5kb2NcIixcbiAgICAgICAgICAgICAgICBjYXNlSW5zZW5zaXRpdmU6IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH07XG59O1xuXG5vb3AuaW5oZXJpdHMoRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLCBUZXh0SGlnaGxpZ2h0UnVsZXMpO1xuXG5Eb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMuZ2V0VGFnUnVsZSA9IGZ1bmN0aW9uKHN0YXJ0KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdG9rZW4gOiBcImNvbW1lbnQuZG9jLnRhZy5zdG9yYWdlLnR5cGVcIixcbiAgICAgICAgcmVnZXggOiBcIlxcXFxiKD86VE9ET3xGSVhNRXxYWFh8SEFDSylcXFxcYlwiXG4gICAgfTtcbn07XG5cbkRvY0NvbW1lbnRIaWdobGlnaHRSdWxlcy5nZXRTdGFydFJ1bGUgPSBmdW5jdGlvbihzdGFydCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHRva2VuIDogXCJjb21tZW50LmRvY1wiLCAvLyBkb2MgY29tbWVudFxuICAgICAgICByZWdleCA6IFwiXFxcXC9cXFxcKig/PVxcXFwqKVwiLFxuICAgICAgICBuZXh0ICA6IHN0YXJ0XG4gICAgfTtcbn07XG5cbkRvY0NvbW1lbnRIaWdobGlnaHRSdWxlcy5nZXRFbmRSdWxlID0gZnVuY3Rpb24gKHN0YXJ0KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdG9rZW4gOiBcImNvbW1lbnQuZG9jXCIsIC8vIGNsb3NpbmcgY29tbWVudFxuICAgICAgICByZWdleCA6IFwiXFxcXCpcXFxcL1wiLFxuICAgICAgICBuZXh0ICA6IHN0YXJ0XG4gICAgfTtcbn07XG5cblxuZXhwb3J0cy5Eb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMgPSBEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXM7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRNb2RlID0gcmVxdWlyZShcIi4vdGV4dFwiKS5Nb2RlO1xudmFyIERyb29sc0hpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vZHJvb2xzX2hpZ2hsaWdodF9ydWxlc1wiKS5Ecm9vbHNIaWdobGlnaHRSdWxlcztcbnZhciBEcm9vbHNGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRpbmcvZHJvb2xzXCIpLkZvbGRNb2RlO1xuXG52YXIgTW9kZSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuSGlnaGxpZ2h0UnVsZXMgPSBEcm9vbHNIaWdobGlnaHRSdWxlcztcbiAgICB0aGlzLmZvbGRpbmdSdWxlcyA9IG5ldyBEcm9vbHNGb2xkTW9kZSgpO1xuICAgIHRoaXMuJGJlaGF2aW91ciA9IHRoaXMuJGRlZmF1bHRCZWhhdmlvdXI7XG5cbn07XG5vb3AuaW5oZXJpdHMoTW9kZSwgVGV4dE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5saW5lQ29tbWVudFN0YXJ0ID0gXCIvL1wiO1xuICAgIHRoaXMuJGlkID0gXCJhY2UvbW9kZS9kcm9vbHNcIjtcbiAgICB0aGlzLnNuaXBwZXRGaWxlSWQgPSBcImFjZS9zbmlwcGV0cy9kcm9vbHNcIjtcbn0pLmNhbGwoTW9kZS5wcm90b3R5cGUpO1xuXG5leHBvcnRzLk1vZGUgPSBNb2RlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90ZXh0X2hpZ2hsaWdodF9ydWxlc1wiKS5UZXh0SGlnaGxpZ2h0UnVsZXM7XG52YXIgSmF2YUhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vamF2YV9oaWdobGlnaHRfcnVsZXNcIikuSmF2YUhpZ2hsaWdodFJ1bGVzO1xudmFyIERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL2RvY19jb21tZW50X2hpZ2hsaWdodF9ydWxlc1wiKS5Eb2NDb21tZW50SGlnaGxpZ2h0UnVsZXM7XG5cbnZhciBpZGVudGlmaWVyUmUgPSBcIlthLXpBLVpcXFxcJF9cXHUwMGExLVxcdWZmZmZdW2EtekEtWlxcXFxkXFxcXCRfXFx1MDBhMS1cXHVmZmZmXSpcIjtcbnZhciBwYWNrYWdlSWRlbnRpZmllclJlID0gXCJbYS16QS1aXFxcXCRfXFx1MDBhMS1cXHVmZmZmXVtcXFxcLmEtekEtWlxcXFxkXFxcXCRfXFx1MDBhMS1cXHVmZmZmXSpcIjtcblxudmFyIERyb29sc0hpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIga2V5d29yZHMgPSAoXCJkYXRlfGVmZmVjdGl2ZXxleHBpcmVzfGxvY2t8b258YWN0aXZlfG5vfGxvb3B8YXV0b3xmb2N1c1wiICtcbiAgICAgICAgXCJ8YWN0aXZhdGlvbnxncm91cHxhZ2VuZGF8cnVsZWZsb3d8ZHVyYXRpb258dGltZXJ8Y2FsZW5kYXJzfHJlZnJhY3R8ZGlyZWN0XCIgK1xuICAgICAgICBcInxkaWFsZWN0fHNhbGllbmNlfGVuYWJsZWR8YXR0cmlidXRlc3xleHRlbmRzfHRlbXBsYXRlXCIgK1xuICAgICAgICBcInxmdW5jdGlvbnxjb250YWluc3xtYXRjaGVzfGV2YWx8ZXhjbHVkZXN8c291bmRzbGlrZVwiICtcbiAgICAgICAgXCJ8bWVtYmVyb2Z8bm90fGlufG9yfGFuZHxleGlzdHN8Zm9yYWxsfG92ZXJ8ZnJvbXxlbnRyeXxwb2ludHxhY2N1bXVsYXRlfGFjY3xjb2xsZWN0XCIgK1xuICAgICAgICBcInxhY3Rpb258cmV2ZXJzZXxyZXN1bHR8ZW5kfGluaXR8aW5zdGFuY2VvZnxleHRlbmRzfHN1cGVyfGJvb2xlYW58Y2hhcnxieXRlfHNob3J0XCIgK1xuICAgICAgICBcInxpbnR8bG9uZ3xmbG9hdHxkb3VibGV8dGhpc3x2b2lkfGNsYXNzfG5ld3xjYXNlfGZpbmFsfGlmfGVsc2V8Zm9yfHdoaWxlfGRvXCIgK1xuICAgICAgICBcInxkZWZhdWx0fHRyeXxjYXRjaHxmaW5hbGx5fHN3aXRjaHxzeW5jaHJvbml6ZWR8cmV0dXJufHRocm93fGJyZWFrfGNvbnRpbnVlfGFzc2VydFwiICtcbiAgICAgICAgXCJ8bW9kaWZ5fHN0YXRpY3xwdWJsaWN8cHJvdGVjdGVkfHByaXZhdGV8YWJzdHJhY3R8bmF0aXZlfHRyYW5zaWVudHx2b2xhdGlsZVwiICtcbiAgICAgICAgXCJ8c3RyaWN0ZnB8dGhyb3dzfGludGVyZmFjZXxlbnVtfGltcGxlbWVudHN8dHlwZXx3aW5kb3d8dHJhaXR8bm8tbG9vcHxzdHJcIlxuICAgICAgKTtcblxuICAgICAgdmFyIGxhbmdDbGFzc2VzID0gKFxuICAgICAgICAgIFwiQWJzdHJhY3RNZXRob2RFcnJvcnxBc3NlcnRpb25FcnJvcnxDbGFzc0NpcmN1bGFyaXR5RXJyb3J8XCIrXG4gICAgICAgICAgXCJDbGFzc0Zvcm1hdEVycm9yfERlcHJlY2F0ZWR8RW51bUNvbnN0YW50Tm90UHJlc2VudEV4Y2VwdGlvbnxcIitcbiAgICAgICAgICBcIkV4Y2VwdGlvbkluSW5pdGlhbGl6ZXJFcnJvcnxJbGxlZ2FsQWNjZXNzRXJyb3J8XCIrXG4gICAgICAgICAgXCJJbGxlZ2FsVGhyZWFkU3RhdGVFeGNlcHRpb258SW5zdGFudGlhdGlvbkVycm9yfEludGVybmFsRXJyb3J8XCIrXG4gICAgICAgICAgXCJOZWdhdGl2ZUFycmF5U2l6ZUV4Y2VwdGlvbnxOb1N1Y2hGaWVsZEVycm9yfE92ZXJyaWRlfFByb2Nlc3N8XCIrXG4gICAgICAgICAgXCJQcm9jZXNzQnVpbGRlcnxTZWN1cml0eU1hbmFnZXJ8U3RyaW5nSW5kZXhPdXRPZkJvdW5kc0V4Y2VwdGlvbnxcIitcbiAgICAgICAgICBcIlN1cHByZXNzV2FybmluZ3N8VHlwZU5vdFByZXNlbnRFeGNlcHRpb258VW5rbm93bkVycm9yfFwiK1xuICAgICAgICAgIFwiVW5zYXRpc2ZpZWRMaW5rRXJyb3J8VW5zdXBwb3J0ZWRDbGFzc1ZlcnNpb25FcnJvcnxWZXJpZnlFcnJvcnxcIitcbiAgICAgICAgICBcIkluc3RhbnRpYXRpb25FeGNlcHRpb258SW5kZXhPdXRPZkJvdW5kc0V4Y2VwdGlvbnxcIitcbiAgICAgICAgICBcIkFycmF5SW5kZXhPdXRPZkJvdW5kc0V4Y2VwdGlvbnxDbG9uZU5vdFN1cHBvcnRlZEV4Y2VwdGlvbnxcIitcbiAgICAgICAgICBcIk5vU3VjaEZpZWxkRXhjZXB0aW9ufElsbGVnYWxBcmd1bWVudEV4Y2VwdGlvbnxOdW1iZXJGb3JtYXRFeGNlcHRpb258XCIrXG4gICAgICAgICAgXCJTZWN1cml0eUV4Y2VwdGlvbnxWb2lkfEluaGVyaXRhYmxlVGhyZWFkTG9jYWx8SWxsZWdhbFN0YXRlRXhjZXB0aW9ufFwiK1xuICAgICAgICAgIFwiSW50ZXJydXB0ZWRFeGNlcHRpb258Tm9TdWNoTWV0aG9kRXhjZXB0aW9ufElsbGVnYWxBY2Nlc3NFeGNlcHRpb258XCIrXG4gICAgICAgICAgXCJVbnN1cHBvcnRlZE9wZXJhdGlvbkV4Y2VwdGlvbnxFbnVtfFN0cmljdE1hdGh8UGFja2FnZXxDb21waWxlcnxcIitcbiAgICAgICAgICBcIlJlYWRhYmxlfFJ1bnRpbWV8U3RyaW5nQnVpbGRlcnxNYXRofEluY29tcGF0aWJsZUNsYXNzQ2hhbmdlRXJyb3J8XCIrXG4gICAgICAgICAgXCJOb1N1Y2hNZXRob2RFcnJvcnxUaHJlYWRMb2NhbHxSdW50aW1lUGVybWlzc2lvbnxBcml0aG1ldGljRXhjZXB0aW9ufFwiK1xuICAgICAgICAgIFwiTnVsbFBvaW50ZXJFeGNlcHRpb258TG9uZ3xJbnRlZ2VyfFNob3J0fEJ5dGV8RG91YmxlfE51bWJlcnxGbG9hdHxcIitcbiAgICAgICAgICBcIkNoYXJhY3RlcnxCb29sZWFufFN0YWNrVHJhY2VFbGVtZW50fEFwcGVuZGFibGV8U3RyaW5nQnVmZmVyfFwiK1xuICAgICAgICAgIFwiSXRlcmFibGV8VGhyZWFkR3JvdXB8UnVubmFibGV8VGhyZWFkfElsbGVnYWxNb25pdG9yU3RhdGVFeGNlcHRpb258XCIrXG4gICAgICAgICAgXCJTdGFja092ZXJmbG93RXJyb3J8T3V0T2ZNZW1vcnlFcnJvcnxWaXJ0dWFsTWFjaGluZUVycm9yfFwiK1xuICAgICAgICAgIFwiQXJyYXlTdG9yZUV4Y2VwdGlvbnxDbGFzc0Nhc3RFeGNlcHRpb258TGlua2FnZUVycm9yfFwiK1xuICAgICAgICAgIFwiTm9DbGFzc0RlZkZvdW5kRXJyb3J8Q2xhc3NOb3RGb3VuZEV4Y2VwdGlvbnxSdW50aW1lRXhjZXB0aW9ufFwiK1xuICAgICAgICAgIFwiRXhjZXB0aW9ufFRocmVhZERlYXRofEVycm9yfFRocm93YWJsZXxTeXN0ZW18Q2xhc3NMb2FkZXJ8XCIrXG4gICAgICAgICAgXCJDbG9uZWFibGV8Q2xhc3N8Q2hhclNlcXVlbmNlfENvbXBhcmFibGV8U3RyaW5nfE9iamVjdFwiXG4gICAgICApO1xuXG4gICAgdmFyIGtleXdvcmRNYXBwZXIgPSB0aGlzLmNyZWF0ZUtleXdvcmRNYXBwZXIoe1xuICAgICAgICBcInZhcmlhYmxlLmxhbmd1YWdlXCI6IFwidGhpc1wiLFxuICAgICAgICBcImtleXdvcmRcIjoga2V5d29yZHMsXG4gICAgICAgIFwiY29uc3RhbnQubGFuZ3VhZ2VcIjogXCJudWxsXCIsXG4gICAgICAgIFwic3VwcG9ydC5jbGFzc1wiIDogbGFuZ0NsYXNzZXMsXG4gICAgICAgIFwic3VwcG9ydC5mdW5jdGlvblwiIDogXCJyZXRyYWN0fHVwZGF0ZXxtb2RpZnl8aW5zZXJ0XCJcbiAgICB9LCBcImlkZW50aWZpZXJcIik7XG5cbiAgICAvLyByZWdleHAgbXVzdCBub3QgaGF2ZSBjYXB0dXJpbmcgcGFyZW50aGVzZXMuIFVzZSAoPzopIGluc3RlYWQuXG4gICAgLy8gcmVnZXhwcyBhcmUgb3JkZXJlZCAtPiB0aGUgZmlyc3QgbWF0Y2ggaXMgdXNlZFxuXG4gICAgdmFyIHN0cmluZ1J1bGVzID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gW3tcbiAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLCAvLyBzaW5nbGUgbGluZVxuICAgICAgICByZWdleCA6ICdbXCJdKD86KD86XFxcXFxcXFwuKXwoPzpbXlwiXFxcXFxcXFxdKSkqP1tcIl0nXG4gICAgICB9LCB7XG4gICAgICAgIHRva2VuIDogXCJzdHJpbmdcIiwgLy8gc2luZ2xlIGxpbmVcbiAgICAgICAgcmVnZXggOiBcIlsnXSg/Oig/OlxcXFxcXFxcLil8KD86W14nXFxcXFxcXFxdKSkqP1snXVwiXG4gICAgICB9XTtcbiAgICB9O1xuXG5cbiAgICAgIHZhciBiYXNpY1ByZVJ1bGVzID0gZnVuY3Rpb24oYmxvY2tDb21tZW50UnVsZXMpIHtcbiAgICAgICAgcmV0dXJuIFt7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudFwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwvXFxcXC8uKiRcIlxuICAgICAgICB9LFxuICAgICAgICBEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMuZ2V0U3RhcnRSdWxlKFwiZG9jLXN0YXJ0XCIpLFxuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudFwiLCAvLyBtdWx0aSBsaW5lIGNvbW1lbnRcbiAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcL1xcXFwqXCIsXG4gICAgICAgICAgICBuZXh0IDogYmxvY2tDb21tZW50UnVsZXNcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIiwgLy8gaGV4XG4gICAgICAgICAgICByZWdleCA6IFwiMFt4WF1bMC05YS1mQS1GXStcXFxcYlwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5udW1lcmljXCIsIC8vIGZsb2F0XG4gICAgICAgICAgICByZWdleCA6IFwiWystXT9cXFxcZCsoPzooPzpcXFxcLlxcXFxkKik/KD86W2VFXVsrLV0/XFxcXGQrKT8pP1xcXFxiXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lmxhbmd1YWdlLmJvb2xlYW5cIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCIoPzp0cnVlfGZhbHNlKVxcXFxiXCJcbiAgICAgICAgICB9XTtcbiAgICAgIH07XG5cbiAgICAgIHZhciBibG9ja0NvbW1lbnRSdWxlcyA9IGZ1bmN0aW9uKHJldHVyblJ1bGUpIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudC5ibG9ja1wiLCAvLyBjbG9zaW5nIGNvbW1lbnRcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXCpcXFxcL1wiLFxuICAgICAgICAgICAgICAgIG5leHQgOiByZXR1cm5SdWxlXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuIDogXCJjb21tZW50LmJsb2NrXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXTtcbiAgICAgIH07XG5cbiAgICAgIHZhciBiYXNpY1Bvc3RSdWxlcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gW3tcbiAgICAgICAgICAgIHRva2VuIDoga2V5d29yZE1hcHBlcixcbiAgICAgICAgICAgIC8vIFRPRE86IFVuaWNvZGUgZXNjYXBlIHNlcXVlbmNlc1xuICAgICAgICAgICAgLy8gVE9ETzogVW5pY29kZSBpZGVudGlmaWVyc1xuICAgICAgICAgICAgcmVnZXggOiBcIlthLXpBLVpfJF1bYS16QS1aMC05XyRdKlxcXFxiXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcImtleXdvcmQub3BlcmF0b3JcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCIhfFxcXFwkfCV8JnxcXFxcKnxcXFxcLVxcXFwtfFxcXFwtfFxcXFwrXFxcXCt8XFxcXCt8fnw9PT18PT18PXwhPXwhPT18PD18Pj18PDw9fD4+PXw+Pj49fDw+fDx8PnwhfCYmfFxcXFx8XFxcXHx8XFxcXD9cXFxcOnxcXFxcKj18JT18XFxcXCs9fFxcXFwtPXwmPXxcXFxcXj18XFxcXGIoPzppbnxpbnN0YW5jZW9mfG5ld3xkZWxldGV8dHlwZW9mfHZvaWQpXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcImxwYXJlblwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIltbKHtdXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInJwYXJlblwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIltcXFxcXSl9XVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJ0ZXh0XCIsXG4gICAgICAgICAgICByZWdleCA6IFwiXFxcXHMrXCJcbiAgICAgICAgfV07XG4gICAgICB9O1xuXG5cbiAgICB0aGlzLiRydWxlcyA9IHtcbiAgICAgICAgXCJzdGFydFwiIDogW10uY29uY2F0KGJhc2ljUHJlUnVsZXMoXCJibG9jay5jb21tZW50XCIpLCBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiZW50aXR5Lm5hbWUudHlwZVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJAW2EtekEtWl8kXVthLXpBLVowLTlfJF0qXFxcXGJcIlxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgLy8gcGFja2FnZSBjb20uZXhhbXBsZVxuICAgICAgICAgICAgICAgIHRva2VuIDogW1wia2V5d29yZFwiLFwidGV4dFwiLFwiZW50aXR5Lm5hbWUudHlwZVwiXSxcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiKHBhY2thZ2UpKFxcXFxzKykoXCIgKyBwYWNrYWdlSWRlbnRpZmllclJlICtcIilcIlxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgLy8gaW1wb3J0IGZ1bmN0aW9uIGNvbS5VdGlsLnN0YXRpY01ldGhvZFxuICAgICAgICAgICAgICAgIHRva2VuIDogW1wia2V5d29yZFwiLFwidGV4dFwiLFwia2V5d29yZFwiLFwidGV4dFwiLFwiZW50aXR5Lm5hbWUudHlwZVwiXSxcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiKGltcG9ydCkoXFxcXHMrKShmdW5jdGlvbikoXFxcXHMrKShcIiArIHBhY2thZ2VJZGVudGlmaWVyUmUgK1wiKVwiXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAvLyBpbXBvcnQgZnVuY3Rpb24gY29tLlV0aWwuc3RhdGljTWV0aG9kXG4gICAgICAgICAgICAgICAgdG9rZW4gOiBbXCJrZXl3b3JkXCIsXCJ0ZXh0XCIsXCJlbnRpdHkubmFtZS50eXBlXCJdLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIoaW1wb3J0KShcXFxccyspKFwiICsgcGFja2FnZUlkZW50aWZpZXJSZSArXCIpXCJcbiAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIC8vIGdsb2JhbCBjb20uZXhhbXBsZS5UeXBlIGlkZW50aWZpZXJcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFtcImtleXdvcmRcIixcInRleHRcIixcImVudGl0eS5uYW1lLnR5cGVcIixcInRleHRcIixcInZhcmlhYmxlXCJdLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIoZ2xvYmFsKShcXFxccyspKFwiICsgcGFja2FnZUlkZW50aWZpZXJSZSArXCIpKFxcXFxzKykoXCIgKyBpZGVudGlmaWVyUmUgK1wiKVwiXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAvLyBkZWNsYXJlIHRyYWl0IERlY2xhcmVkVHlwZVxuICAgICAgICAgICAgICAgIHRva2VuIDogW1wia2V5d29yZFwiLFwidGV4dFwiLFwia2V5d29yZFwiLFwidGV4dFwiLFwiZW50aXR5Lm5hbWUudHlwZVwiXSxcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiKGRlY2xhcmUpKFxcXFxzKykodHJhaXQpKFxcXFxzKykoXCIgKyBpZGVudGlmaWVyUmUgK1wiKVwiXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAvLyBkZWNsYXJlIHRyYWl0IERlY2xhcmVkVHlwZVxuICAgICAgICAgICAgICAgIHRva2VuIDogW1wia2V5d29yZFwiLFwidGV4dFwiLFwiZW50aXR5Lm5hbWUudHlwZVwiXSxcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiKGRlY2xhcmUpKFxcXFxzKykoXCIgKyBpZGVudGlmaWVyUmUgK1wiKVwiXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAvLyBkZWNsYXJlIHRyYWl0IERlY2xhcmVkVHlwZVxuICAgICAgICAgICAgICAgIHRva2VuIDogW1wia2V5d29yZFwiLFwidGV4dFwiLFwiZW50aXR5Lm5hbWUudHlwZVwiXSxcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiKGV4dGVuZHMpKFxcXFxzKykoXCIgKyBwYWNrYWdlSWRlbnRpZmllclJlICtcIilcIlxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgLy8gcnVsZSAuLi5cbiAgICAgICAgICAgICAgICB0b2tlbiA6IFtcImtleXdvcmRcIixcInRleHRcIl0sXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIihydWxlKShcXFxccyspXCIsXG4gICAgICAgICAgICAgICAgbmV4dCA6ICBcImFzc2V0Lm5hbWVcIlxuICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgc3RyaW5nUnVsZXMoKSxcbiAgICAgICAgICAgICAgW3tcbiAgICAgICAgICAgICAgICAvLyB2YXJpYWJsZSA6XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBbXCJ2YXJpYWJsZS5vdGhlclwiLFwidGV4dFwiLFwidGV4dFwiXSxcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiKFwiICsgaWRlbnRpZmllclJlICsgXCIpKFxcXFxzKikoOilcIlxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgLy8gcXVlcnkgLi4uXG4gICAgICAgICAgICAgICAgdG9rZW4gOiBbXCJrZXl3b3JkXCIsXCJ0ZXh0XCJdLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIocXVlcnkpKFxcXFxzKylcIixcbiAgICAgICAgICAgICAgICBuZXh0IDogIFwiYXNzZXQubmFtZVwiXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAvLyB3aGVuIC4uLlxuICAgICAgICAgICAgICAgIHRva2VuIDogW1wia2V5d29yZFwiLFwidGV4dFwiXSxcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiKHdoZW4pKFxcXFxzKilcIlxuICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgLy8gdGhlbiA8amF2YS9tdmVsIGNvZGU+IGVuZFxuICAgICAgICAgICAgICAgIHRva2VuIDogW1wia2V5d29yZFwiLFwidGV4dFwiXSxcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiKHRoZW4pKFxcXFxzKilcIixcbiAgICAgICAgICAgICAgICBuZXh0IDogIFwiamF2YS1zdGFydFwiXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJwYXJlbi5scGFyZW5cIixcbiAgICAgICAgICAgICAgICAgIHJlZ2V4IDogL1tcXFsoe10vXG4gICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJwYXJlbi5ycGFyZW5cIixcbiAgICAgICAgICAgICAgICAgIHJlZ2V4IDogL1tcXF0pfV0vXG4gICAgICAgICAgICAgIH1dLCBiYXNpY1Bvc3RSdWxlcygpKSxcbiAgICAgICAgXCJibG9jay5jb21tZW50XCIgOiBibG9ja0NvbW1lbnRSdWxlcyhcInN0YXJ0XCIpLFxuICAgICAgICBcImFzc2V0Lm5hbWVcIiA6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiZW50aXR5Lm5hbWVcIixcbiAgICAgICAgICAgICAgICByZWdleCA6ICdbXCJdKD86KD86XFxcXFxcXFwuKXwoPzpbXlwiXFxcXFxcXFxdKSkqP1tcIl0nXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImVudGl0eS5uYW1lXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlsnXSg/Oig/OlxcXFxcXFxcLil8KD86W14nXFxcXFxcXFxdKSkqP1snXVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImVudGl0eS5uYW1lXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBpZGVudGlmaWVyUmVcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICByZWdleDogXCJcIixcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJlbXB0eVwiLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwic3RhcnRcIlxuICAgICAgICAgICAgfV1cbiAgICB9O1xuICAgIHRoaXMuZW1iZWRSdWxlcyhEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMsIFwiZG9jLVwiLFxuICAgICAgICBbIERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcy5nZXRFbmRSdWxlKFwic3RhcnRcIikgXSk7XG5cbiAgICB0aGlzLmVtYmVkUnVsZXMoSmF2YUhpZ2hsaWdodFJ1bGVzLCBcImphdmEtXCIsIFtcbiAgICAgIHtcbiAgICAgICB0b2tlbiA6IFwic3VwcG9ydC5mdW5jdGlvblwiLFxuICAgICAgIHJlZ2V4OiBcIlxcXFxiKGluc2VydHxtb2RpZnl8cmV0cmFjdHx1cGRhdGUpXFxcXGJcIlxuICAgICB9LCB7XG4gICAgICAgdG9rZW4gOiBcImtleXdvcmRcIixcbiAgICAgICByZWdleDogXCJcXFxcYmVuZFxcXFxiXCIsXG4gICAgICAgbmV4dCAgOiBcInN0YXJ0XCJcbiAgICB9XSk7XG5cbn07XG5cbm9vcC5pbmhlcml0cyhEcm9vbHNIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuZXhwb3J0cy5Ecm9vbHNIaWdobGlnaHRSdWxlcyA9IERyb29sc0hpZ2hsaWdodFJ1bGVzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vLi4vbGliL29vcFwiKTtcbnZhciBSYW5nZSA9IHJlcXVpcmUoXCIuLi8uLi9yYW5nZVwiKS5SYW5nZTtcbnZhciBCYXNlRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9mb2xkX21vZGVcIikuRm9sZE1vZGU7XG52YXIgVG9rZW5JdGVyYXRvciA9IHJlcXVpcmUoXCIuLi8uLi90b2tlbl9pdGVyYXRvclwiKS5Ub2tlbkl0ZXJhdG9yO1xuXG52YXIgRm9sZE1vZGUgPSBleHBvcnRzLkZvbGRNb2RlID0gZnVuY3Rpb24oKSB7fTtcbm9vcC5pbmhlcml0cyhGb2xkTW9kZSwgQmFzZUZvbGRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgLy8gcmVndWxhciBleHByZXNzaW9ucyB0aGF0IGlkZW50aWZ5IHN0YXJ0aW5nIGFuZCBzdG9wcGluZyBwb2ludHNcbiAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlciA9IC9cXGIocnVsZXxkZWNsYXJlfHF1ZXJ5fHdoZW58dGhlbilcXGIvOyBcbiAgICB0aGlzLmZvbGRpbmdTdG9wTWFya2VyID0gL1xcYmVuZFxcYi87XG5cbiAgICB0aGlzLmdldEZvbGRXaWRnZXRSYW5nZSA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgIHZhciBtYXRjaCA9IGxpbmUubWF0Y2godGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIpO1xuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIHZhciBpID0gbWF0Y2guaW5kZXg7XG5cbiAgICAgICAgICAgIGlmIChtYXRjaFsxXSkge1xuICAgICAgICAgICAgICAgIHZhciBwb3NpdGlvbiA9IHtyb3c6IHJvdywgY29sdW1uOiBsaW5lLmxlbmd0aH07XG4gICAgICAgICAgICAgICAgdmFyIGl0ZXJhdG9yID0gbmV3IFRva2VuSXRlcmF0b3Ioc2Vzc2lvbiwgcG9zaXRpb24ucm93LCBwb3NpdGlvbi5jb2x1bW4pO1xuICAgICAgICAgICAgICAgIHZhciBzZWVrID0gXCJlbmRcIjtcbiAgICAgICAgICAgICAgICB2YXIgdG9rZW4gPSBpdGVyYXRvci5nZXRDdXJyZW50VG9rZW4oKTtcbiAgICAgICAgICAgICAgICBpZiAodG9rZW4udmFsdWUgPT0gXCJ3aGVuXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VlayA9IFwidGhlblwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB3aGlsZSAodG9rZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRva2VuLnZhbHVlID09IHNlZWspIHsgXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUmFuZ2UuZnJvbVBvaW50cyhwb3NpdGlvbiAse1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdzogaXRlcmF0b3IuZ2V0Q3VycmVudFRva2VuUm93KCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uOiBpdGVyYXRvci5nZXRDdXJyZW50VG9rZW5Db2x1bW4oKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gPSBpdGVyYXRvci5zdGVwRm9yd2FyZCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgICAgIC8vIHRlc3QgZWFjaCBsaW5lLCBhbmQgcmV0dXJuIGEgcmFuZ2Ugb2Ygc2VnbWVudHMgdG8gY29sbGFwc2VcbiAgICB9O1xuXG59KS5jYWxsKEZvbGRNb2RlLnByb3RvdHlwZSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL2RvY19jb21tZW50X2hpZ2hsaWdodF9ydWxlc1wiKS5Eb2NDb21tZW50SGlnaGxpZ2h0UnVsZXM7XG52YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xuXG52YXIgSmF2YUhpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24oKSB7XG5cbiAgICAvLyB0YWtlbiBmcm9tIGh0dHA6Ly9kb3dubG9hZC5vcmFjbGUuY29tL2phdmFzZS90dXRvcmlhbC9qYXZhL251dHNhbmRib2x0cy9fa2V5d29yZHMuaHRtbFxuICAgIHZhciBrZXl3b3JkcyA9IChcbiAgICBcImFic3RyYWN0fGNvbnRpbnVlfGZvcnxuZXd8c3dpdGNofFwiICtcbiAgICBcImFzc2VydHxkZWZhdWx0fGdvdG98cGFja2FnZXxzeW5jaHJvbml6ZWR8XCIgK1xuICAgIFwiYm9vbGVhbnxkb3xpZnxwcml2YXRlfHRoaXN8XCIgK1xuICAgIFwiYnJlYWt8ZG91YmxlfGltcGxlbWVudHN8cHJvdGVjdGVkfHRocm93fFwiICtcbiAgICBcImJ5dGV8ZWxzZXxpbXBvcnR8cHVibGljfHRocm93c3xcIiArXG4gICAgXCJjYXNlfGVudW18aW5zdGFuY2VvZnxyZXR1cm58dHJhbnNpZW50fFwiICtcbiAgICBcImNhdGNofGV4dGVuZHN8aW50fHNob3J0fHRyeXxcIiArXG4gICAgXCJjaGFyfGZpbmFsfGludGVyZmFjZXxzdGF0aWN8dm9pZHxcIiArXG4gICAgXCJjbGFzc3xmaW5hbGx5fGxvbmd8c3RyaWN0ZnB8dm9sYXRpbGV8XCIgK1xuICAgIFwiY29uc3R8ZmxvYXR8bmF0aXZlfHN1cGVyfHdoaWxlfFwiICtcbiAgICBcInZhclwiXG4gICAgKTtcblxuICAgIHZhciBidWlsZGluQ29uc3RhbnRzID0gKFwibnVsbHxJbmZpbml0eXxOYU58dW5kZWZpbmVkXCIpO1xuXG5cbiAgICB2YXIgbGFuZ0NsYXNzZXMgPSAoXG4gICAgICAgIFwiQWJzdHJhY3RNZXRob2RFcnJvcnxBc3NlcnRpb25FcnJvcnxDbGFzc0NpcmN1bGFyaXR5RXJyb3J8XCIrXG4gICAgICAgIFwiQ2xhc3NGb3JtYXRFcnJvcnxEZXByZWNhdGVkfEVudW1Db25zdGFudE5vdFByZXNlbnRFeGNlcHRpb258XCIrXG4gICAgICAgIFwiRXhjZXB0aW9uSW5Jbml0aWFsaXplckVycm9yfElsbGVnYWxBY2Nlc3NFcnJvcnxcIitcbiAgICAgICAgXCJJbGxlZ2FsVGhyZWFkU3RhdGVFeGNlcHRpb258SW5zdGFudGlhdGlvbkVycm9yfEludGVybmFsRXJyb3J8XCIrXG4gICAgICAgIFwiTmVnYXRpdmVBcnJheVNpemVFeGNlcHRpb258Tm9TdWNoRmllbGRFcnJvcnxPdmVycmlkZXxQcm9jZXNzfFwiK1xuICAgICAgICBcIlByb2Nlc3NCdWlsZGVyfFNlY3VyaXR5TWFuYWdlcnxTdHJpbmdJbmRleE91dE9mQm91bmRzRXhjZXB0aW9ufFwiK1xuICAgICAgICBcIlN1cHByZXNzV2FybmluZ3N8VHlwZU5vdFByZXNlbnRFeGNlcHRpb258VW5rbm93bkVycm9yfFwiK1xuICAgICAgICBcIlVuc2F0aXNmaWVkTGlua0Vycm9yfFVuc3VwcG9ydGVkQ2xhc3NWZXJzaW9uRXJyb3J8VmVyaWZ5RXJyb3J8XCIrXG4gICAgICAgIFwiSW5zdGFudGlhdGlvbkV4Y2VwdGlvbnxJbmRleE91dE9mQm91bmRzRXhjZXB0aW9ufFwiK1xuICAgICAgICBcIkFycmF5SW5kZXhPdXRPZkJvdW5kc0V4Y2VwdGlvbnxDbG9uZU5vdFN1cHBvcnRlZEV4Y2VwdGlvbnxcIitcbiAgICAgICAgXCJOb1N1Y2hGaWVsZEV4Y2VwdGlvbnxJbGxlZ2FsQXJndW1lbnRFeGNlcHRpb258TnVtYmVyRm9ybWF0RXhjZXB0aW9ufFwiK1xuICAgICAgICBcIlNlY3VyaXR5RXhjZXB0aW9ufFZvaWR8SW5oZXJpdGFibGVUaHJlYWRMb2NhbHxJbGxlZ2FsU3RhdGVFeGNlcHRpb258XCIrXG4gICAgICAgIFwiSW50ZXJydXB0ZWRFeGNlcHRpb258Tm9TdWNoTWV0aG9kRXhjZXB0aW9ufElsbGVnYWxBY2Nlc3NFeGNlcHRpb258XCIrXG4gICAgICAgIFwiVW5zdXBwb3J0ZWRPcGVyYXRpb25FeGNlcHRpb258RW51bXxTdHJpY3RNYXRofFBhY2thZ2V8Q29tcGlsZXJ8XCIrXG4gICAgICAgIFwiUmVhZGFibGV8UnVudGltZXxTdHJpbmdCdWlsZGVyfE1hdGh8SW5jb21wYXRpYmxlQ2xhc3NDaGFuZ2VFcnJvcnxcIitcbiAgICAgICAgXCJOb1N1Y2hNZXRob2RFcnJvcnxUaHJlYWRMb2NhbHxSdW50aW1lUGVybWlzc2lvbnxBcml0aG1ldGljRXhjZXB0aW9ufFwiK1xuICAgICAgICBcIk51bGxQb2ludGVyRXhjZXB0aW9ufExvbmd8SW50ZWdlcnxTaG9ydHxCeXRlfERvdWJsZXxOdW1iZXJ8RmxvYXR8XCIrXG4gICAgICAgIFwiQ2hhcmFjdGVyfEJvb2xlYW58U3RhY2tUcmFjZUVsZW1lbnR8QXBwZW5kYWJsZXxTdHJpbmdCdWZmZXJ8XCIrXG4gICAgICAgIFwiSXRlcmFibGV8VGhyZWFkR3JvdXB8UnVubmFibGV8VGhyZWFkfElsbGVnYWxNb25pdG9yU3RhdGVFeGNlcHRpb258XCIrXG4gICAgICAgIFwiU3RhY2tPdmVyZmxvd0Vycm9yfE91dE9mTWVtb3J5RXJyb3J8VmlydHVhbE1hY2hpbmVFcnJvcnxcIitcbiAgICAgICAgXCJBcnJheVN0b3JlRXhjZXB0aW9ufENsYXNzQ2FzdEV4Y2VwdGlvbnxMaW5rYWdlRXJyb3J8XCIrXG4gICAgICAgIFwiTm9DbGFzc0RlZkZvdW5kRXJyb3J8Q2xhc3NOb3RGb3VuZEV4Y2VwdGlvbnxSdW50aW1lRXhjZXB0aW9ufFwiK1xuICAgICAgICBcIkV4Y2VwdGlvbnxUaHJlYWREZWF0aHxFcnJvcnxUaHJvd2FibGV8U3lzdGVtfENsYXNzTG9hZGVyfFwiK1xuICAgICAgICBcIkNsb25lYWJsZXxDbGFzc3xDaGFyU2VxdWVuY2V8Q29tcGFyYWJsZXxTdHJpbmd8T2JqZWN0XCJcbiAgICApO1xuXG4gICAgdmFyIGtleXdvcmRNYXBwZXIgPSB0aGlzLmNyZWF0ZUtleXdvcmRNYXBwZXIoe1xuICAgICAgICBcInZhcmlhYmxlLmxhbmd1YWdlXCI6IFwidGhpc1wiLFxuICAgICAgICBcImtleXdvcmRcIjoga2V5d29yZHMsXG4gICAgICAgIFwiY29uc3RhbnQubGFuZ3VhZ2VcIjogYnVpbGRpbkNvbnN0YW50cyxcbiAgICAgICAgXCJzdXBwb3J0LmZ1bmN0aW9uXCI6IGxhbmdDbGFzc2VzXG4gICAgfSwgXCJpZGVudGlmaWVyXCIpO1xuXG4gICAgLy8gcmVnZXhwIG11c3Qgbm90IGhhdmUgY2FwdHVyaW5nIHBhcmVudGhlc2VzLiBVc2UgKD86KSBpbnN0ZWFkLlxuICAgIC8vIHJlZ2V4cHMgYXJlIG9yZGVyZWQgLT4gdGhlIGZpcnN0IG1hdGNoIGlzIHVzZWRcblxuICAgIHRoaXMuJHJ1bGVzID0ge1xuICAgICAgICBcInN0YXJ0XCIgOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXC9cXFxcLy4qJFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLmdldFN0YXJ0UnVsZShcImRvYy1zdGFydFwiKSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudFwiLCAvLyBtdWx0aSBsaW5lIGNvbW1lbnRcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXC9cXFxcKlwiLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcImNvbW1lbnRcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIiwgLy8gc2luZ2xlIGxpbmVcbiAgICAgICAgICAgICAgICByZWdleCA6ICdbXCJdKD86KD86XFxcXFxcXFwuKXwoPzpbXlwiXFxcXFxcXFxdKSkqP1tcIl0nXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLCAvLyBzaW5nbGUgbGluZVxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJbJ10oPzooPzpcXFxcXFxcXC4pfCg/OlteJ1xcXFxcXFxcXSkpKj9bJ11cIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5udW1lcmljXCIsIC8vIGhleFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogLzAoPzpbeFhdWzAtOWEtZkEtRl1bMC05YS1mQS1GX10qfFtiQl1bMDFdWzAxX10qKVtMbFNzRGRGZll5XT9cXGIvXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIiwgLy8gZmxvYXRcbiAgICAgICAgICAgICAgICByZWdleCA6IC9bKy1dP1xcZFtcXGRfXSooPzooPzpcXC5bXFxkX10qKT8oPzpbZUVdWystXT9bXFxkX10rKT8pP1tMbFNzRGRGZll5XT9cXGIvXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lmxhbmd1YWdlLmJvb2xlYW5cIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiKD86dHJ1ZXxmYWxzZSlcXFxcYlwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiKG9wZW4oPzpcXFxccyspKT9tb2R1bGUoPz1cXFxccypcXFxcdylcIixcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJrZXl3b3JkXCIsXG4gICAgICAgICAgICAgICAgbmV4dDogW3tcbiAgICAgICAgICAgICAgICAgICAgcmVnZXg6IFwie1wiLFxuICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJwYXJlbi5scGFyZW5cIixcbiAgICAgICAgICAgICAgICAgICAgbmV4dDogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiBcIn1cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiBcInBhcmVuLnJwYXJlblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dDogXCJzdGFydFwiXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZyb20gU2VjdGlvbiAzLjkgb2YgaHR0cDovL2NyLm9wZW5qZGsuamF2YS5uZXQvfm1yL2ppZ3Nhdy9zcGVjL2phdmEtc2UtOS1qbHMtZGlmZnMucGRmXG4gICAgICAgICAgICAgICAgICAgICAgICByZWdleDogXCJcXFxcYihyZXF1aXJlc3x0cmFuc2l0aXZlfGV4cG9ydHN8b3BlbnN8dG98dXNlc3xwcm92aWRlc3x3aXRoKVxcXFxiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJrZXl3b3JkXCIgXG4gICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXHMrXCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJpZGVudGlmaWVyXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcdytcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcInB1bmN0dWF0aW9uLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIuXCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxccytcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgcmVnZXg6IFwiXCIsIC8vIGV4aXQgaWYgdGhlcmUgaXMgYW55dGhpbmcgZWxzZVxuICAgICAgICAgICAgICAgICAgICBuZXh0OiBcInN0YXJ0XCJcbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDoga2V5d29yZE1hcHBlcixcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBVbmljb2RlIGVzY2FwZSBzZXF1ZW5jZXNcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBVbmljb2RlIGlkZW50aWZpZXJzXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlthLXpBLVpfJF1bYS16QS1aMC05XyRdKlxcXFxiXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwia2V5d29yZC5vcGVyYXRvclwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIhfFxcXFwkfCV8JnxcXFxcfHxcXFxcXnxcXFxcKnxcXFxcL3xcXFxcLVxcXFwtfFxcXFwtfFxcXFwrXFxcXCt8XFxcXCt8fnw9PT18PT18PXwhPXwhPT18PD18Pj18PDw9fD4+PXw+Pj49fDw+fDx8PnwhfCYmfFxcXFx8XFxcXHx8XFxcXD98XFxcXDp8XFxcXCo9fFxcXFwvPXwlPXxcXFxcKz18XFxcXC09fCY9fFxcXFx8PXxcXFxcXj18XFxcXGIoPzppbnxpbnN0YW5jZW9mfG5ld3xkZWxldGV8dHlwZW9mfHZvaWQpXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwibHBhcmVuXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIltbKHtdXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwicnBhcmVuXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIltcXFxcXSl9XVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXHMrXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgXCJjb21tZW50XCIgOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIiwgLy8gY2xvc2luZyBjb21tZW50XG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwqXFxcXC9cIixcbiAgICAgICAgICAgICAgICBuZXh0IDogXCJzdGFydFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuIDogXCJjb21tZW50XCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH07XG5cbiAgICBcbiAgICB0aGlzLmVtYmVkUnVsZXMoRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLCBcImRvYy1cIixcbiAgICAgICAgWyBEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMuZ2V0RW5kUnVsZShcInN0YXJ0XCIpIF0pO1xuICAgIHRoaXMubm9ybWFsaXplUnVsZXMoKTtcbn07XG5cbm9vcC5pbmhlcml0cyhKYXZhSGlnaGxpZ2h0UnVsZXMsIFRleHRIaWdobGlnaHRSdWxlcyk7XG5cbmV4cG9ydHMuSmF2YUhpZ2hsaWdodFJ1bGVzID0gSmF2YUhpZ2hsaWdodFJ1bGVzO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9