"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[8789],{

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

/***/ 68789:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var JavaScriptMode = (__webpack_require__(93388).Mode);
var ScalaHighlightRules = (__webpack_require__(49682)/* .ScalaHighlightRules */ .U);

var Mode = function() {
    JavaScriptMode.call(this);
    this.HighlightRules = ScalaHighlightRules;
    this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, JavaScriptMode);

(function() {

    this.createWorker = function(session) {
        return null;
    };

    this.$id = "ace/mode/scala";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 49682:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var DocCommentHighlightRules = (__webpack_require__(42124)/* .DocCommentHighlightRules */ .l);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

var ScalaHighlightRules = function() {

    var keywords = (
            "case|default|do|else|for|if|match|while|throw|return|try|trye|catch|finally|yield|" +
            "abstract|class|def|extends|final|forSome|implicit|implicits|import|lazy|new|object|null|" +
            "override|package|private|protected|sealed|super|this|trait|type|val|var|with|" +
            "assert|assume|require|print|println|printf|readLine|readBoolean|readByte|readShort|" + // package scala
            "readChar|readInt|readLong|readFloat|readDouble" // package scala
    );

    var buildinConstants = ("true|false");

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
        "Cloneable|Class|CharSequence|Comparable|String|Object|" +
        "Unit|Any|AnyVal|AnyRef|Null|ScalaObject|Singleton|Seq|Iterable|List|" +
        "Option|Array|Char|Byte|Int|Long|Nothing|" +

        "App|Application|BufferedIterator|BigDecimal|BigInt|Console|Either|" +
        "Enumeration|Equiv|Fractional|Function|IndexedSeq|Integral|Iterator|" +
        "Map|Numeric|Nil|NotNull|Ordered|Ordering|PartialFunction|PartialOrdering|" +
        "Product|Proxy|Range|Responder|Seq|Serializable|Set|Specializable|Stream|" +
        "StringContext|Symbol|Traversable|TraversableOnce|Tuple|Vector|Pair|Triple"


    );

    var keywordMapper = this.createKeywordMapper({
        "variable.language": "this",
        "keyword": keywords,
        "support.function": langClasses,
        "constant.language": buildinConstants
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
                token : "string.regexp",
                regex : "[/](?:(?:\\[(?:\\\\]|[^\\]])+\\])|(?:\\\\/|[^\\]/]))*[/]\\w*\\s*(?=[).,;]|$)"
            }, {
                token : "string",
                regex : '"""',
                next : "tstring"
            }, {
                token : "string",
                regex : '"(?=.)', // " strings can't span multiple lines
                next : "string"
            }, {
                token : "symbol.constant", // single line
                regex : "'[\\w\\d_]+"
            }, {
                token : "constant.numeric", // hex
                regex : "0[xX][0-9a-fA-F]+\\b"
            }, {
                token : "constant.numeric", // float
                regex : "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
            }, {
                token : "constant.language.boolean",
                regex : "(?:true|false)\\b"
            }, {
                token : keywordMapper,
                // TODO: Unicode escape sequences
                // TODO: Unicode identifiers
                regex : "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
            }, {
                token : "keyword.operator",
                regex : "!|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^=|\\b(?:in|instanceof|new|delete|typeof|void)"
            }, {
                token : "paren.lparen",
                regex : "[[({]"
            }, {
                token : "paren.rparen",
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
        ],
        "string" : [
            {
                token : "escape",
                regex : '\\\\"'
            }, {
                token : "string",
                regex : '"',
                next : "start"
            }, {
                token : "string.invalid",
                regex : '[^"\\\\]*$',
                next : "start"
            }, {
                token : "string",
                regex : '[^"\\\\]+'
            }
        ],
        "tstring" : [
            {
                token : "string",
                regex : '"{3,5}',
                next : "start"
            }, {
                defaultToken : "string"
            }
        ]
    };

    this.embedRules(DocCommentHighlightRules, "doc-",
        [ DocCommentHighlightRules.getEndRule("start") ]);
};

oop.inherits(ScalaHighlightRules, TextHighlightRules);

exports.U = ScalaHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjg3ODkuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLElBQVk7QUFDOUIseUJBQXlCLHdEQUFvRDs7QUFFN0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBLFNBQWdDOzs7Ozs7OztBQzdDbkI7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLElBQVk7QUFDOUIscUJBQXFCLGlDQUE0QjtBQUNqRCwwQkFBMEIseURBQXNEOztBQUVoRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRCxZQUFZOzs7Ozs7OztBQ3RCQzs7QUFFYixVQUFVLG1CQUFPLENBQUMsSUFBWTtBQUM5QiwrQkFBK0IsOERBQWlFO0FBQ2hHLHlCQUF5Qix3REFBb0Q7O0FBRTdFOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxpR0FBaUc7QUFDakcsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsNkJBQTZCO0FBQzdCLGFBQWE7QUFDYjtBQUNBLCtCQUErQjtBQUMvQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsSUFBSTtBQUMvQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsU0FBMkIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2RvY19jb21tZW50X2hpZ2hsaWdodF9ydWxlcy5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL3NjYWxhLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvc2NhbGFfaGlnaGxpZ2h0X3J1bGVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xuXG52YXIgRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuJHJ1bGVzID0ge1xuICAgICAgICBcInN0YXJ0XCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJjb21tZW50LmRvYy50YWdcIixcbiAgICAgICAgICAgICAgICByZWdleDogXCJAXFxcXHcrKD89XFxcXHN8JClcIlxuICAgICAgICAgICAgfSwgRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLmdldFRhZ1J1bGUoKSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJjb21tZW50LmRvYy5ib2R5XCIsXG4gICAgICAgICAgICAgICAgY2FzZUluc2Vuc2l0aXZlOiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9O1xufTtcblxub29wLmluaGVyaXRzKERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLmdldFRhZ1J1bGUgPSBmdW5jdGlvbihzdGFydCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHRva2VuIDogXCJjb21tZW50LmRvYy50YWcuc3RvcmFnZS50eXBlXCIsXG4gICAgICAgIHJlZ2V4IDogXCJcXFxcYig/OlRPRE98RklYTUV8WFhYfEhBQ0spXFxcXGJcIlxuICAgIH07XG59O1xuXG5Eb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMuZ2V0U3RhcnRSdWxlID0gZnVuY3Rpb24oc3RhcnQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0b2tlbiA6IFwiY29tbWVudC5kb2NcIiwgLy8gZG9jIGNvbW1lbnRcbiAgICAgICAgcmVnZXg6IC9cXC9cXCpcXCooPyFcXC8pLyxcbiAgICAgICAgbmV4dCAgOiBzdGFydFxuICAgIH07XG59O1xuXG5Eb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMuZ2V0RW5kUnVsZSA9IGZ1bmN0aW9uIChzdGFydCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHRva2VuIDogXCJjb21tZW50LmRvY1wiLCAvLyBjbG9zaW5nIGNvbW1lbnRcbiAgICAgICAgcmVnZXggOiBcIlxcXFwqXFxcXC9cIixcbiAgICAgICAgbmV4dCAgOiBzdGFydFxuICAgIH07XG59O1xuXG5cbmV4cG9ydHMuRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzID0gRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBKYXZhU2NyaXB0TW9kZSA9IHJlcXVpcmUoXCIuL2phdmFzY3JpcHRcIikuTW9kZTtcbnZhciBTY2FsYUhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vc2NhbGFfaGlnaGxpZ2h0X3J1bGVzXCIpLlNjYWxhSGlnaGxpZ2h0UnVsZXM7XG5cbnZhciBNb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgSmF2YVNjcmlwdE1vZGUuY2FsbCh0aGlzKTtcbiAgICB0aGlzLkhpZ2hsaWdodFJ1bGVzID0gU2NhbGFIaWdobGlnaHRSdWxlcztcbiAgICB0aGlzLiRiZWhhdmlvdXIgPSB0aGlzLiRkZWZhdWx0QmVoYXZpb3VyO1xufTtcbm9vcC5pbmhlcml0cyhNb2RlLCBKYXZhU2NyaXB0TW9kZSk7XG5cbihmdW5jdGlvbigpIHtcblxuICAgIHRoaXMuY3JlYXRlV29ya2VyID0gZnVuY3Rpb24oc2Vzc2lvbikge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuXG4gICAgdGhpcy4kaWQgPSBcImFjZS9tb2RlL3NjYWxhXCI7XG59KS5jYWxsKE1vZGUucHJvdG90eXBlKTtcblxuZXhwb3J0cy5Nb2RlID0gTW9kZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vZG9jX2NvbW1lbnRfaGlnaGxpZ2h0X3J1bGVzXCIpLkRvY0NvbW1lbnRIaWdobGlnaHRSdWxlcztcbnZhciBUZXh0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90ZXh0X2hpZ2hsaWdodF9ydWxlc1wiKS5UZXh0SGlnaGxpZ2h0UnVsZXM7XG5cbnZhciBTY2FsYUhpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIga2V5d29yZHMgPSAoXG4gICAgICAgICAgICBcImNhc2V8ZGVmYXVsdHxkb3xlbHNlfGZvcnxpZnxtYXRjaHx3aGlsZXx0aHJvd3xyZXR1cm58dHJ5fHRyeWV8Y2F0Y2h8ZmluYWxseXx5aWVsZHxcIiArXG4gICAgICAgICAgICBcImFic3RyYWN0fGNsYXNzfGRlZnxleHRlbmRzfGZpbmFsfGZvclNvbWV8aW1wbGljaXR8aW1wbGljaXRzfGltcG9ydHxsYXp5fG5ld3xvYmplY3R8bnVsbHxcIiArXG4gICAgICAgICAgICBcIm92ZXJyaWRlfHBhY2thZ2V8cHJpdmF0ZXxwcm90ZWN0ZWR8c2VhbGVkfHN1cGVyfHRoaXN8dHJhaXR8dHlwZXx2YWx8dmFyfHdpdGh8XCIgK1xuICAgICAgICAgICAgXCJhc3NlcnR8YXNzdW1lfHJlcXVpcmV8cHJpbnR8cHJpbnRsbnxwcmludGZ8cmVhZExpbmV8cmVhZEJvb2xlYW58cmVhZEJ5dGV8cmVhZFNob3J0fFwiICsgLy8gcGFja2FnZSBzY2FsYVxuICAgICAgICAgICAgXCJyZWFkQ2hhcnxyZWFkSW50fHJlYWRMb25nfHJlYWRGbG9hdHxyZWFkRG91YmxlXCIgLy8gcGFja2FnZSBzY2FsYVxuICAgICk7XG5cbiAgICB2YXIgYnVpbGRpbkNvbnN0YW50cyA9IChcInRydWV8ZmFsc2VcIik7XG5cbiAgICB2YXIgbGFuZ0NsYXNzZXMgPSAoXG4gICAgICAgIFwiQWJzdHJhY3RNZXRob2RFcnJvcnxBc3NlcnRpb25FcnJvcnxDbGFzc0NpcmN1bGFyaXR5RXJyb3J8XCIrXG4gICAgICAgIFwiQ2xhc3NGb3JtYXRFcnJvcnxEZXByZWNhdGVkfEVudW1Db25zdGFudE5vdFByZXNlbnRFeGNlcHRpb258XCIrXG4gICAgICAgIFwiRXhjZXB0aW9uSW5Jbml0aWFsaXplckVycm9yfElsbGVnYWxBY2Nlc3NFcnJvcnxcIitcbiAgICAgICAgXCJJbGxlZ2FsVGhyZWFkU3RhdGVFeGNlcHRpb258SW5zdGFudGlhdGlvbkVycm9yfEludGVybmFsRXJyb3J8XCIrXG5cbiAgICAgICAgXCJOZWdhdGl2ZUFycmF5U2l6ZUV4Y2VwdGlvbnxOb1N1Y2hGaWVsZEVycm9yfE92ZXJyaWRlfFByb2Nlc3N8XCIrXG4gICAgICAgIFwiUHJvY2Vzc0J1aWxkZXJ8U2VjdXJpdHlNYW5hZ2VyfFN0cmluZ0luZGV4T3V0T2ZCb3VuZHNFeGNlcHRpb258XCIrXG4gICAgICAgIFwiU3VwcHJlc3NXYXJuaW5nc3xUeXBlTm90UHJlc2VudEV4Y2VwdGlvbnxVbmtub3duRXJyb3J8XCIrXG4gICAgICAgIFwiVW5zYXRpc2ZpZWRMaW5rRXJyb3J8VW5zdXBwb3J0ZWRDbGFzc1ZlcnNpb25FcnJvcnxWZXJpZnlFcnJvcnxcIitcbiAgICAgICAgXCJJbnN0YW50aWF0aW9uRXhjZXB0aW9ufEluZGV4T3V0T2ZCb3VuZHNFeGNlcHRpb258XCIrXG4gICAgICAgIFwiQXJyYXlJbmRleE91dE9mQm91bmRzRXhjZXB0aW9ufENsb25lTm90U3VwcG9ydGVkRXhjZXB0aW9ufFwiK1xuICAgICAgICBcIk5vU3VjaEZpZWxkRXhjZXB0aW9ufElsbGVnYWxBcmd1bWVudEV4Y2VwdGlvbnxOdW1iZXJGb3JtYXRFeGNlcHRpb258XCIrXG4gICAgICAgIFwiU2VjdXJpdHlFeGNlcHRpb258Vm9pZHxJbmhlcml0YWJsZVRocmVhZExvY2FsfElsbGVnYWxTdGF0ZUV4Y2VwdGlvbnxcIitcbiAgICAgICAgXCJJbnRlcnJ1cHRlZEV4Y2VwdGlvbnxOb1N1Y2hNZXRob2RFeGNlcHRpb258SWxsZWdhbEFjY2Vzc0V4Y2VwdGlvbnxcIitcbiAgICAgICAgXCJVbnN1cHBvcnRlZE9wZXJhdGlvbkV4Y2VwdGlvbnxFbnVtfFN0cmljdE1hdGh8UGFja2FnZXxDb21waWxlcnxcIitcbiAgICAgICAgXCJSZWFkYWJsZXxSdW50aW1lfFN0cmluZ0J1aWxkZXJ8TWF0aHxJbmNvbXBhdGlibGVDbGFzc0NoYW5nZUVycm9yfFwiK1xuICAgICAgICBcIk5vU3VjaE1ldGhvZEVycm9yfFRocmVhZExvY2FsfFJ1bnRpbWVQZXJtaXNzaW9ufEFyaXRobWV0aWNFeGNlcHRpb258XCIrXG4gICAgICAgIFwiTnVsbFBvaW50ZXJFeGNlcHRpb258TG9uZ3xJbnRlZ2VyfFNob3J0fEJ5dGV8RG91YmxlfE51bWJlcnxGbG9hdHxcIitcbiAgICAgICAgXCJDaGFyYWN0ZXJ8Qm9vbGVhbnxTdGFja1RyYWNlRWxlbWVudHxBcHBlbmRhYmxlfFN0cmluZ0J1ZmZlcnxcIitcbiAgICAgICAgXCJJdGVyYWJsZXxUaHJlYWRHcm91cHxSdW5uYWJsZXxUaHJlYWR8SWxsZWdhbE1vbml0b3JTdGF0ZUV4Y2VwdGlvbnxcIitcbiAgICAgICAgXCJTdGFja092ZXJmbG93RXJyb3J8T3V0T2ZNZW1vcnlFcnJvcnxWaXJ0dWFsTWFjaGluZUVycm9yfFwiK1xuICAgICAgICBcIkFycmF5U3RvcmVFeGNlcHRpb258Q2xhc3NDYXN0RXhjZXB0aW9ufExpbmthZ2VFcnJvcnxcIitcbiAgICAgICAgXCJOb0NsYXNzRGVmRm91bmRFcnJvcnxDbGFzc05vdEZvdW5kRXhjZXB0aW9ufFJ1bnRpbWVFeGNlcHRpb258XCIrXG4gICAgICAgIFwiRXhjZXB0aW9ufFRocmVhZERlYXRofEVycm9yfFRocm93YWJsZXxTeXN0ZW18Q2xhc3NMb2FkZXJ8XCIrXG4gICAgICAgIFwiQ2xvbmVhYmxlfENsYXNzfENoYXJTZXF1ZW5jZXxDb21wYXJhYmxlfFN0cmluZ3xPYmplY3R8XCIgK1xuICAgICAgICBcIlVuaXR8QW55fEFueVZhbHxBbnlSZWZ8TnVsbHxTY2FsYU9iamVjdHxTaW5nbGV0b258U2VxfEl0ZXJhYmxlfExpc3R8XCIgK1xuICAgICAgICBcIk9wdGlvbnxBcnJheXxDaGFyfEJ5dGV8SW50fExvbmd8Tm90aGluZ3xcIiArXG5cbiAgICAgICAgXCJBcHB8QXBwbGljYXRpb258QnVmZmVyZWRJdGVyYXRvcnxCaWdEZWNpbWFsfEJpZ0ludHxDb25zb2xlfEVpdGhlcnxcIiArXG4gICAgICAgIFwiRW51bWVyYXRpb258RXF1aXZ8RnJhY3Rpb25hbHxGdW5jdGlvbnxJbmRleGVkU2VxfEludGVncmFsfEl0ZXJhdG9yfFwiICtcbiAgICAgICAgXCJNYXB8TnVtZXJpY3xOaWx8Tm90TnVsbHxPcmRlcmVkfE9yZGVyaW5nfFBhcnRpYWxGdW5jdGlvbnxQYXJ0aWFsT3JkZXJpbmd8XCIgK1xuICAgICAgICBcIlByb2R1Y3R8UHJveHl8UmFuZ2V8UmVzcG9uZGVyfFNlcXxTZXJpYWxpemFibGV8U2V0fFNwZWNpYWxpemFibGV8U3RyZWFtfFwiICtcbiAgICAgICAgXCJTdHJpbmdDb250ZXh0fFN5bWJvbHxUcmF2ZXJzYWJsZXxUcmF2ZXJzYWJsZU9uY2V8VHVwbGV8VmVjdG9yfFBhaXJ8VHJpcGxlXCJcblxuXG4gICAgKTtcblxuICAgIHZhciBrZXl3b3JkTWFwcGVyID0gdGhpcy5jcmVhdGVLZXl3b3JkTWFwcGVyKHtcbiAgICAgICAgXCJ2YXJpYWJsZS5sYW5ndWFnZVwiOiBcInRoaXNcIixcbiAgICAgICAgXCJrZXl3b3JkXCI6IGtleXdvcmRzLFxuICAgICAgICBcInN1cHBvcnQuZnVuY3Rpb25cIjogbGFuZ0NsYXNzZXMsXG4gICAgICAgIFwiY29uc3RhbnQubGFuZ3VhZ2VcIjogYnVpbGRpbkNvbnN0YW50c1xuICAgIH0sIFwiaWRlbnRpZmllclwiKTtcblxuICAgIC8vIHJlZ2V4cCBtdXN0IG5vdCBoYXZlIGNhcHR1cmluZyBwYXJlbnRoZXNlcy4gVXNlICg/OikgaW5zdGVhZC5cbiAgICAvLyByZWdleHBzIGFyZSBvcmRlcmVkIC0+IHRoZSBmaXJzdCBtYXRjaCBpcyB1c2VkXG5cbiAgICB0aGlzLiRydWxlcyA9IHtcbiAgICAgICAgXCJzdGFydFwiIDogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwvXFxcXC8uKiRcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcy5nZXRTdGFydFJ1bGUoXCJkb2Mtc3RhcnRcIiksXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIiwgLy8gbXVsdGkgbGluZSBjb21tZW50XG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwvXFxcXCpcIixcbiAgICAgICAgICAgICAgICBuZXh0IDogXCJjb21tZW50XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nLnJlZ2V4cFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJbL10oPzooPzpcXFxcWyg/OlxcXFxcXFxcXXxbXlxcXFxdXSkrXFxcXF0pfCg/OlxcXFxcXFxcL3xbXlxcXFxdL10pKSpbL11cXFxcdypcXFxccyooPz1bKS4sO118JClcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICByZWdleCA6ICdcIlwiXCInLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcInRzdHJpbmdcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICByZWdleCA6ICdcIig/PS4pJywgLy8gXCIgc3RyaW5ncyBjYW4ndCBzcGFuIG11bHRpcGxlIGxpbmVzXG4gICAgICAgICAgICAgICAgbmV4dCA6IFwic3RyaW5nXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3ltYm9sLmNvbnN0YW50XCIsIC8vIHNpbmdsZSBsaW5lXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIidbXFxcXHdcXFxcZF9dK1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIiwgLy8gaGV4XG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIjBbeFhdWzAtOWEtZkEtRl0rXFxcXGJcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5udW1lcmljXCIsIC8vIGZsb2F0XG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlsrLV0/XFxcXGQrKD86KD86XFxcXC5cXFxcZCopPyg/OltlRV1bKy1dP1xcXFxkKyk/KT9cXFxcYlwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lmxhbmd1YWdlLmJvb2xlYW5cIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiKD86dHJ1ZXxmYWxzZSlcXFxcYlwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBrZXl3b3JkTWFwcGVyLFxuICAgICAgICAgICAgICAgIC8vIFRPRE86IFVuaWNvZGUgZXNjYXBlIHNlcXVlbmNlc1xuICAgICAgICAgICAgICAgIC8vIFRPRE86IFVuaWNvZGUgaWRlbnRpZmllcnNcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiW2EtekEtWl8kXVthLXpBLVowLTlfJF0qXFxcXGJcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIiF8XFxcXCR8JXwmfFxcXFwqfFxcXFwtXFxcXC18XFxcXC18XFxcXCtcXFxcK3xcXFxcK3x+fD09PXw9PXw9fCE9fCE9PXw8PXw+PXw8PD18Pj49fD4+Pj18PD58PHw+fCF8JiZ8XFxcXHxcXFxcfHxcXFxcP1xcXFw6fFxcXFwqPXwlPXxcXFxcKz18XFxcXC09fCY9fFxcXFxePXxcXFxcYig/OmlufGluc3RhbmNlb2Z8bmV3fGRlbGV0ZXx0eXBlb2Z8dm9pZClcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJwYXJlbi5scGFyZW5cIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiW1soe11cIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJwYXJlbi5ycGFyZW5cIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiW1xcXFxdKX1dXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxccytcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBcImNvbW1lbnRcIiA6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudFwiLCAvLyBjbG9zaW5nIGNvbW1lbnRcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXCpcXFxcL1wiLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcInN0YXJ0XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW4gOiBcImNvbW1lbnRcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBcInN0cmluZ1wiIDogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJlc2NhcGVcIixcbiAgICAgICAgICAgICAgICByZWdleCA6ICdcXFxcXFxcXFwiJ1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICByZWdleCA6ICdcIicsXG4gICAgICAgICAgICAgICAgbmV4dCA6IFwic3RhcnRcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmcuaW52YWxpZFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogJ1teXCJcXFxcXFxcXF0qJCcsXG4gICAgICAgICAgICAgICAgbmV4dCA6IFwic3RhcnRcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICByZWdleCA6ICdbXlwiXFxcXFxcXFxdKydcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgXCJ0c3RyaW5nXCIgOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogJ1wiezMsNX0nLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcInN0YXJ0XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW4gOiBcInN0cmluZ1wiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9O1xuXG4gICAgdGhpcy5lbWJlZFJ1bGVzKERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcywgXCJkb2MtXCIsXG4gICAgICAgIFsgRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLmdldEVuZFJ1bGUoXCJzdGFydFwiKSBdKTtcbn07XG5cbm9vcC5pbmhlcml0cyhTY2FsYUhpZ2hsaWdodFJ1bGVzLCBUZXh0SGlnaGxpZ2h0UnVsZXMpO1xuXG5leHBvcnRzLlNjYWxhSGlnaGxpZ2h0UnVsZXMgPSBTY2FsYUhpZ2hsaWdodFJ1bGVzO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9