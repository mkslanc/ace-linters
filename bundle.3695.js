"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[3695],{

/***/ 83695:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



    var oop = __webpack_require__(2645);
    var TextMode = (__webpack_require__(49432).Mode);
    var GcodeHighlightRules = (__webpack_require__(1388)/* .GcodeHighlightRules */ .a);
    var Range = (__webpack_require__(91902)/* .Range */ .Q);

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

/***/ 1388:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



    var oop = __webpack_require__(2645);
    var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

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

    exports.a = GcodeHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjM2OTUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsY0FBYyxtQkFBTyxDQUFDLElBQVk7QUFDbEMsbUJBQW1CLGlDQUFzQjtBQUN6Qyw4QkFBOEIsd0RBQXNEO0FBQ3BGLGdCQUFnQiwyQ0FBeUI7O0FBRXpDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUwsSUFBSSxZQUFZOzs7Ozs7OztBQ2pCSDs7QUFFYixjQUFjLG1CQUFPLENBQUMsSUFBWTtBQUNsQyw2QkFBNkIsd0RBQW9EOztBQUVqRjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBOztBQUVBOztBQUVBLElBQUksU0FBMkIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2djb2RlLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvZ2NvZGVfaGlnaGxpZ2h0X3J1bGVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG4gICAgdmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xuICAgIHZhciBUZXh0TW9kZSA9IHJlcXVpcmUoXCIuL3RleHRcIikuTW9kZTtcbiAgICB2YXIgR2NvZGVIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL2djb2RlX2hpZ2hsaWdodF9ydWxlc1wiKS5HY29kZUhpZ2hsaWdodFJ1bGVzO1xuICAgIHZhciBSYW5nZSA9IHJlcXVpcmUoXCIuLi9yYW5nZVwiKS5SYW5nZTtcblxuICAgIHZhciBNb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuSGlnaGxpZ2h0UnVsZXMgPSBHY29kZUhpZ2hsaWdodFJ1bGVzO1xuICAgICAgICB0aGlzLiRiZWhhdmlvdXIgPSB0aGlzLiRkZWZhdWx0QmVoYXZpb3VyO1xuICAgIH07XG4gICAgb29wLmluaGVyaXRzKE1vZGUsIFRleHRNb2RlKTtcblxuICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy4kaWQgPSBcImFjZS9tb2RlL2djb2RlXCI7XG4gICAgfSkuY2FsbChNb2RlLnByb3RvdHlwZSk7XG5cbiAgICBleHBvcnRzLk1vZGUgPSBNb2RlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICB2YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG4gICAgdmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcblxuICAgIHZhciBHY29kZUhpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIGtleXdvcmRzID0gKFxuICAgICAgICAgICAgXCJJRnxET3xXSElMRXxFTkRXSElMRXxDQUxMfEVORElGfFNVQnxFTkRTVUJ8R09UT3xSRVBFQVR8RU5EUkVQRUFUfENBTExcIlxuICAgICAgICAgICAgKTtcblxuICAgICAgICB2YXIgYnVpbHRpbkNvbnN0YW50cyA9IChcbiAgICAgICAgICAgIFwiUElcIlxuICAgICAgICAgICAgKTtcblxuICAgICAgICB2YXIgYnVpbHRpbkZ1bmN0aW9ucyA9IChcbiAgICAgICAgICAgIFwiQVRBTnxBQlN8QUNPU3xBU0lOfFNJTnxDT1N8RVhQfEZJWHxGVVB8Uk9VTkR8TE58VEFOXCJcbiAgICAgICAgICAgICk7XG4gICAgICAgIHZhciBrZXl3b3JkTWFwcGVyID0gdGhpcy5jcmVhdGVLZXl3b3JkTWFwcGVyKHtcbiAgICAgICAgICAgIFwic3VwcG9ydC5mdW5jdGlvblwiOiBidWlsdGluRnVuY3Rpb25zLFxuICAgICAgICAgICAgXCJrZXl3b3JkXCI6IGtleXdvcmRzLFxuICAgICAgICAgICAgXCJjb25zdGFudC5sYW5ndWFnZVwiOiBidWlsdGluQ29uc3RhbnRzXG4gICAgICAgIH0sIFwiaWRlbnRpZmllclwiLCB0cnVlKTtcblxuICAgICAgICB0aGlzLiRydWxlcyA9IHtcbiAgICAgICAgICAgIFwic3RhcnRcIiA6IFsge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwoLipcXFxcKVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIiwgICAgICAgICAgIC8vIGJsb2NrIG51bWJlclxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIoW05dKShbMC05XSspXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsICAgICAgICAgICAvLyBcIiBzdHJpbmdcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiKFtHXSkoWzAtOV0rXFxcXC4/WzAtOV0/KVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLCAgICAgICAgICAgLy8gJyBzdHJpbmdcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiKFtNXSkoWzAtOV0rXFxcXC4/WzAtOV0/KVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIiwgLy8gZmxvYXRcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiKFstK10/KFswLTldKlxcXFwuP1swLTldK1xcXFwuPykpfChcXFxcYjBbeFhdW2EtZkEtRjAtOV0rfChcXFxcYlxcXFxkKyhcXFxcLlxcXFxkKik/fFxcXFwuXFxcXGQrKShbZUVdWy0rXT9cXFxcZCspPylcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDoga2V5d29yZE1hcHBlcixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiW0EtWl1cIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIkVRfExUfEdUfE5FfEdFfExFfE9SfFhPUlwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInBhcmVuLmxwYXJlblwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJbXFxcXFtdXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwicGFyZW4ucnBhcmVuXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIltcXFxcXV1cIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFxzK1wiXG4gICAgICAgICAgICB9IF1cbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgb29wLmluaGVyaXRzKEdjb2RlSGlnaGxpZ2h0UnVsZXMsIFRleHRIaWdobGlnaHRSdWxlcyk7XG5cbiAgICBleHBvcnRzLkdjb2RlSGlnaGxpZ2h0UnVsZXMgPSBHY29kZUhpZ2hsaWdodFJ1bGVzO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9