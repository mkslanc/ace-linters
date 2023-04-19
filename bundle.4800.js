"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[4800],{

/***/ 54800:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



    var oop = __webpack_require__(89359);
    var TextMode = (__webpack_require__(98030).Mode);
    var GcodeHighlightRules = (__webpack_require__(7551)/* .GcodeHighlightRules */ .p);
    var Range = (__webpack_require__(59082)/* .Range */ .e);

    var Mode = function() {
        this.HighlightRules = GcodeHighlightRules;
        this.$behaviour = this.$defaultBehaviour;
    };
    oop.inherits(Mode, TextMode);

    (function() {
        this.$id = "ace/mode/gcode";
    }).call(Mode.prototype);

    exports.Mode = Mode;


/***/ }),

/***/ 7551:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



    var oop = __webpack_require__(89359);
    var TextHighlightRules = (__webpack_require__(28053)/* .TextHighlightRules */ .K);

    var GcodeHighlightRules = function() {

        var keywords = (
            "IF|DO|WHILE|ENDWHILE|CALL|ENDIF|SUB|ENDSUB|GOTO|REPEAT|ENDREPEAT|CALL"
            );

        var builtinConstants = (
            "PI"
            );

        var builtinFunctions = (
            "ATAN|ABS|ACOS|ASIN|SIN|COS|EXP|FIX|FUP|ROUND|LN|TAN"
            );
        var keywordMapper = this.createKeywordMapper({
            "support.function": builtinFunctions,
            "keyword": keywords,
            "constant.language": builtinConstants
        }, "identifier", true);

        this.$rules = {
            "start" : [ {
                token : "comment",
                regex : "\\(.*\\)"
            }, {
                token : "comment",           // block number
                regex : "([N])([0-9]+)"
            }, {
                token : "string",           // " string
                regex : "([G])([0-9]+\\.?[0-9]?)"
            }, {
                token : "string",           // ' string
                regex : "([M])([0-9]+\\.?[0-9]?)"
            }, {
                token : "constant.numeric", // float
                regex : "([-+]?([0-9]*\\.?[0-9]+\\.?))|(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)"
            }, {
                token : keywordMapper,
                regex : "[A-Z]"
            }, {
                token : "keyword.operator",
                regex : "EQ|LT|GT|NE|GE|LE|OR|XOR"
            }, {
                token : "paren.lparen",
                regex : "[\\[]"
            }, {
                token : "paren.rparen",
                regex : "[\\]]"
            }, {
                token : "text",
                regex : "\\s+"
            } ]
        };
    };

    oop.inherits(GcodeHighlightRules, TextHighlightRules);

    exports.p = GcodeHighlightRules;


/***/ })

}]);
//# sourceMappingURL=bundle.4800.js.map