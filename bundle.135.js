"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[135],{

/***/ 135:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var TextMode = (__webpack_require__(98030).Mode);
var EiffelHighlightRules = (__webpack_require__(78208)/* .EiffelHighlightRules */ .m);

var Mode = function() {
    this.HighlightRules = EiffelHighlightRules;
    this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, TextMode);

(function() {
    this.lineCommentStart = "--";
    this.$id = "ace/mode/eiffel";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 78208:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var TextHighlightRules = (__webpack_require__(28053)/* .TextHighlightRules */ .K);

var EiffelHighlightRules = function() {
    var keywords = "across|agent|alias|all|attached|as|assign|attribute|check|" +
        "class|convert|create|debug|deferred|detachable|do|else|elseif|end|" +
        "ensure|expanded|export|external|feature|from|frozen|if|inherit|" +
        "inspect|invariant|like|local|loop|not|note|obsolete|old|once|" +
        "Precursor|redefine|rename|require|rescue|retry|select|separate|" +
        "some|then|undefine|until|variant|when";

    var operatorKeywords = "and|implies|or|xor";

    var languageConstants = "Void";

    var booleanConstants = "True|False";

    var languageVariables = "Current|Result";

    var keywordMapper = this.createKeywordMapper({
        "constant.language": languageConstants,
        "constant.language.boolean": booleanConstants,
        "variable.language": languageVariables,
        "keyword.operator": operatorKeywords,
        "keyword": keywords
    }, "identifier", true);

    var simpleString = /(?:[^"%\b\f\v]|%[A-DFHLNQR-V%'"()<>]|%\/(?:0[xX][\da-fA-F](?:_*[\da-fA-F])*|0[cC][0-7](?:_*[0-7])*|0[bB][01](?:_*[01])*|\d(?:_*\d)*)\/)+?/;

    this.$rules = {
        "start": [{
                token : "string.quoted.other", // Aligned-verbatim-strings (verbatim option not supported)
                regex : /"\[/,
                next: "aligned_verbatim_string"
            }, {
                token : "string.quoted.other", // Non-aligned-verbatim-strings (verbatim option not supported)
                regex : /"\{/,
                next: "non-aligned_verbatim_string"
            }, {
                token : "string.quoted.double",
                regex : /"(?:[^%\b\f\n\r\v]|%[A-DFHLNQR-V%'"()<>]|%\/(?:0[xX][\da-fA-F](?:_*[\da-fA-F])*|0[cC][0-7](?:_*[0-7])*|0[bB][01](?:_*[01])*|\d(?:_*\d)*)\/)*?"/
            }, {
                token : "comment.line.double-dash",
                regex : /--.*/
            }, {
                token : "constant.character",
                regex : /'(?:[^%\b\f\n\r\t\v]|%[A-DFHLNQR-V%'"()<>]|%\/(?:0[xX][\da-fA-F](?:_*[\da-fA-F])*|0[cC][0-7](?:_*[0-7])*|0[bB][01](?:_*[01])*|\d(?:_*\d)*)\/)'/
            }, {
                token : "constant.numeric", // hexa | octal | bin
                regex : /\b0(?:[xX][\da-fA-F](?:_*[\da-fA-F])*|[cC][0-7](?:_*[0-7])*|[bB][01](?:_*[01])*)\b/
            }, {
                token : "constant.numeric",
                regex : /(?:\d(?:_*\d)*)?\.(?:(?:\d(?:_*\d)*)?[eE][+-]?)?\d(?:_*\d)*|\d(?:_*\d)*\.?/
            }, {
                token : "paren.lparen",
                regex : /[\[({]|<<|\|\(/
            }, {
                token : "paren.rparen",
                regex : /[\])}]|>>|\|\)/
            }, {
                token : "keyword.operator", // punctuation
                regex : /:=|->|\.(?=\w)|[;,:?]/
            }, {
                token : "keyword.operator",
                regex : /\\\\|\|\.\.\||\.\.|\/[~\/]?|[><\/]=?|[-+*^=~]/
            }, {
                token : function (v) {
                    var result = keywordMapper(v);
                    if (result === "identifier" && v === v.toUpperCase()) {
                        result =  "entity.name.type";
                    }
                    return result;
                },
                regex : /[a-zA-Z][a-zA-Z\d_]*\b/
            }, {
                token : "text",
                regex : /\s+/
            }
        ],
        "aligned_verbatim_string" : [{
                token : "string",
                regex : /]"/,
                next : "start"
            }, {
                token : "string",
                regex : simpleString
            }
        ],
        "non-aligned_verbatim_string" : [{
                token : "string.quoted.other",
                regex : /}"/,
                next : "start"
            }, {
                token : "string.quoted.other",
                regex : simpleString
            }
        ]};
};

oop.inherits(EiffelHighlightRules, TextHighlightRules);

exports.m = EiffelHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjEzNS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBYTs7QUFFYixVQUFVLG1CQUFPLENBQUMsS0FBWTtBQUM5QixlQUFlLGlDQUFzQjtBQUNyQywyQkFBMkIsMERBQXdEOztBQUVuRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQsWUFBWTs7Ozs7Ozs7QUNqQkM7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLEtBQVk7QUFDOUIseUJBQXlCLHdEQUFvRDs7QUFFN0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLDhCQUE4QjtBQUM5QixhQUFhO0FBQ2I7QUFDQSw4QkFBOEI7QUFDOUIsYUFBYTtBQUNiO0FBQ0EsMENBQTBDO0FBQzFDLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLFNBQTRCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9laWZmZWwuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9laWZmZWxfaGlnaGxpZ2h0X3J1bGVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dE1vZGUgPSByZXF1aXJlKFwiLi90ZXh0XCIpLk1vZGU7XG52YXIgRWlmZmVsSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9laWZmZWxfaGlnaGxpZ2h0X3J1bGVzXCIpLkVpZmZlbEhpZ2hsaWdodFJ1bGVzO1xuXG52YXIgTW9kZSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuSGlnaGxpZ2h0UnVsZXMgPSBFaWZmZWxIaWdobGlnaHRSdWxlcztcbiAgICB0aGlzLiRiZWhhdmlvdXIgPSB0aGlzLiRkZWZhdWx0QmVoYXZpb3VyO1xufTtcbm9vcC5pbmhlcml0cyhNb2RlLCBUZXh0TW9kZSk7XG5cbihmdW5jdGlvbigpIHtcbiAgICB0aGlzLmxpbmVDb21tZW50U3RhcnQgPSBcIi0tXCI7XG4gICAgdGhpcy4kaWQgPSBcImFjZS9tb2RlL2VpZmZlbFwiO1xufSkuY2FsbChNb2RlLnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTW9kZSA9IE1vZGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcblxudmFyIEVpZmZlbEhpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGtleXdvcmRzID0gXCJhY3Jvc3N8YWdlbnR8YWxpYXN8YWxsfGF0dGFjaGVkfGFzfGFzc2lnbnxhdHRyaWJ1dGV8Y2hlY2t8XCIgK1xuICAgICAgICBcImNsYXNzfGNvbnZlcnR8Y3JlYXRlfGRlYnVnfGRlZmVycmVkfGRldGFjaGFibGV8ZG98ZWxzZXxlbHNlaWZ8ZW5kfFwiICtcbiAgICAgICAgXCJlbnN1cmV8ZXhwYW5kZWR8ZXhwb3J0fGV4dGVybmFsfGZlYXR1cmV8ZnJvbXxmcm96ZW58aWZ8aW5oZXJpdHxcIiArXG4gICAgICAgIFwiaW5zcGVjdHxpbnZhcmlhbnR8bGlrZXxsb2NhbHxsb29wfG5vdHxub3RlfG9ic29sZXRlfG9sZHxvbmNlfFwiICtcbiAgICAgICAgXCJQcmVjdXJzb3J8cmVkZWZpbmV8cmVuYW1lfHJlcXVpcmV8cmVzY3VlfHJldHJ5fHNlbGVjdHxzZXBhcmF0ZXxcIiArXG4gICAgICAgIFwic29tZXx0aGVufHVuZGVmaW5lfHVudGlsfHZhcmlhbnR8d2hlblwiO1xuXG4gICAgdmFyIG9wZXJhdG9yS2V5d29yZHMgPSBcImFuZHxpbXBsaWVzfG9yfHhvclwiO1xuXG4gICAgdmFyIGxhbmd1YWdlQ29uc3RhbnRzID0gXCJWb2lkXCI7XG5cbiAgICB2YXIgYm9vbGVhbkNvbnN0YW50cyA9IFwiVHJ1ZXxGYWxzZVwiO1xuXG4gICAgdmFyIGxhbmd1YWdlVmFyaWFibGVzID0gXCJDdXJyZW50fFJlc3VsdFwiO1xuXG4gICAgdmFyIGtleXdvcmRNYXBwZXIgPSB0aGlzLmNyZWF0ZUtleXdvcmRNYXBwZXIoe1xuICAgICAgICBcImNvbnN0YW50Lmxhbmd1YWdlXCI6IGxhbmd1YWdlQ29uc3RhbnRzLFxuICAgICAgICBcImNvbnN0YW50Lmxhbmd1YWdlLmJvb2xlYW5cIjogYm9vbGVhbkNvbnN0YW50cyxcbiAgICAgICAgXCJ2YXJpYWJsZS5sYW5ndWFnZVwiOiBsYW5ndWFnZVZhcmlhYmxlcyxcbiAgICAgICAgXCJrZXl3b3JkLm9wZXJhdG9yXCI6IG9wZXJhdG9yS2V5d29yZHMsXG4gICAgICAgIFwia2V5d29yZFwiOiBrZXl3b3Jkc1xuICAgIH0sIFwiaWRlbnRpZmllclwiLCB0cnVlKTtcblxuICAgIHZhciBzaW1wbGVTdHJpbmcgPSAvKD86W15cIiVcXGJcXGZcXHZdfCVbQS1ERkhMTlFSLVYlJ1wiKCk8Pl18JVxcLyg/OjBbeFhdW1xcZGEtZkEtRl0oPzpfKltcXGRhLWZBLUZdKSp8MFtjQ11bMC03XSg/Ol8qWzAtN10pKnwwW2JCXVswMV0oPzpfKlswMV0pKnxcXGQoPzpfKlxcZCkqKVxcLykrPy87XG5cbiAgICB0aGlzLiRydWxlcyA9IHtcbiAgICAgICAgXCJzdGFydFwiOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmcucXVvdGVkLm90aGVyXCIsIC8vIEFsaWduZWQtdmVyYmF0aW0tc3RyaW5ncyAodmVyYmF0aW0gb3B0aW9uIG5vdCBzdXBwb3J0ZWQpXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvXCJcXFsvLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwiYWxpZ25lZF92ZXJiYXRpbV9zdHJpbmdcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmcucXVvdGVkLm90aGVyXCIsIC8vIE5vbi1hbGlnbmVkLXZlcmJhdGltLXN0cmluZ3MgKHZlcmJhdGltIG9wdGlvbiBub3Qgc3VwcG9ydGVkKVxuICAgICAgICAgICAgICAgIHJlZ2V4IDogL1wiXFx7LyxcbiAgICAgICAgICAgICAgICBuZXh0OiBcIm5vbi1hbGlnbmVkX3ZlcmJhdGltX3N0cmluZ1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZy5xdW90ZWQuZG91YmxlXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvXCIoPzpbXiVcXGJcXGZcXG5cXHJcXHZdfCVbQS1ERkhMTlFSLVYlJ1wiKCk8Pl18JVxcLyg/OjBbeFhdW1xcZGEtZkEtRl0oPzpfKltcXGRhLWZBLUZdKSp8MFtjQ11bMC03XSg/Ol8qWzAtN10pKnwwW2JCXVswMV0oPzpfKlswMV0pKnxcXGQoPzpfKlxcZCkqKVxcLykqP1wiL1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50LmxpbmUuZG91YmxlLWRhc2hcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC8tLS4qL1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5jaGFyYWN0ZXJcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC8nKD86W14lXFxiXFxmXFxuXFxyXFx0XFx2XXwlW0EtREZITE5RUi1WJSdcIigpPD5dfCVcXC8oPzowW3hYXVtcXGRhLWZBLUZdKD86XypbXFxkYS1mQS1GXSkqfDBbY0NdWzAtN10oPzpfKlswLTddKSp8MFtiQl1bMDFdKD86XypbMDFdKSp8XFxkKD86XypcXGQpKilcXC8pJy9cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLCAvLyBoZXhhIHwgb2N0YWwgfCBiaW5cbiAgICAgICAgICAgICAgICByZWdleCA6IC9cXGIwKD86W3hYXVtcXGRhLWZBLUZdKD86XypbXFxkYS1mQS1GXSkqfFtjQ11bMC03XSg/Ol8qWzAtN10pKnxbYkJdWzAxXSg/Ol8qWzAxXSkqKVxcYi9cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogLyg/OlxcZCg/Ol8qXFxkKSopP1xcLig/Oig/OlxcZCg/Ol8qXFxkKSopP1tlRV1bKy1dPyk/XFxkKD86XypcXGQpKnxcXGQoPzpfKlxcZCkqXFwuPy9cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwicGFyZW4ubHBhcmVuXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvW1xcWyh7XXw8PHxcXHxcXCgvXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInBhcmVuLnJwYXJlblwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogL1tcXF0pfV18Pj58XFx8XFwpL1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkLm9wZXJhdG9yXCIsIC8vIHB1bmN0dWF0aW9uXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvOj18LT58XFwuKD89XFx3KXxbOyw6P10vXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImtleXdvcmQub3BlcmF0b3JcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC9cXFxcXFxcXHxcXHxcXC5cXC5cXHx8XFwuXFwufFxcL1t+XFwvXT98Wz48XFwvXT0/fFstKypePX5dL1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGtleXdvcmRNYXBwZXIodik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IFwiaWRlbnRpZmllclwiICYmIHYgPT09IHYudG9VcHBlckNhc2UoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gIFwiZW50aXR5Lm5hbWUudHlwZVwiO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICByZWdleCA6IC9bYS16QS1aXVthLXpBLVpcXGRfXSpcXGIvXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC9cXHMrL1xuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBcImFsaWduZWRfdmVyYmF0aW1fc3RyaW5nXCIgOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC9dXCIvLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcInN0YXJ0XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBzaW1wbGVTdHJpbmdcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgXCJub24tYWxpZ25lZF92ZXJiYXRpbV9zdHJpbmdcIiA6IFt7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZy5xdW90ZWQub3RoZXJcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC99XCIvLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcInN0YXJ0XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nLnF1b3RlZC5vdGhlclwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogc2ltcGxlU3RyaW5nXG4gICAgICAgICAgICB9XG4gICAgICAgIF19O1xufTtcblxub29wLmluaGVyaXRzKEVpZmZlbEhpZ2hsaWdodFJ1bGVzLCBUZXh0SGlnaGxpZ2h0UnVsZXMpO1xuXG5leHBvcnRzLkVpZmZlbEhpZ2hsaWdodFJ1bGVzID0gRWlmZmVsSGlnaGxpZ2h0UnVsZXM7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=