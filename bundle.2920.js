"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[2920],{

/***/ 2920:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var EiffelHighlightRules = (__webpack_require__(53939)/* .EiffelHighlightRules */ .F);

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

/***/ 53939:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

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

exports.F = EiffelHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjI5MjAuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLElBQVk7QUFDOUIsZUFBZSxpQ0FBc0I7QUFDckMsMkJBQTJCLDBEQUF3RDs7QUFFbkY7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVELFlBQVk7Ozs7Ozs7O0FDakJDOztBQUViLFVBQVUsbUJBQU8sQ0FBQyxJQUFZO0FBQzlCLHlCQUF5Qix3REFBb0Q7O0FBRTdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLDRCQUE0QjtBQUM1QjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSw4QkFBOEI7QUFDOUIsYUFBYTtBQUNiO0FBQ0EsOEJBQThCO0FBQzlCLGFBQWE7QUFDYjtBQUNBLDBDQUEwQztBQUMxQyxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxTQUE0QiIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvZWlmZmVsLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvZWlmZmVsX2hpZ2hsaWdodF9ydWxlcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRNb2RlID0gcmVxdWlyZShcIi4vdGV4dFwiKS5Nb2RlO1xudmFyIEVpZmZlbEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vZWlmZmVsX2hpZ2hsaWdodF9ydWxlc1wiKS5FaWZmZWxIaWdobGlnaHRSdWxlcztcblxudmFyIE1vZGUgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLkhpZ2hsaWdodFJ1bGVzID0gRWlmZmVsSGlnaGxpZ2h0UnVsZXM7XG4gICAgdGhpcy4kYmVoYXZpb3VyID0gdGhpcy4kZGVmYXVsdEJlaGF2aW91cjtcbn07XG5vb3AuaW5oZXJpdHMoTW9kZSwgVGV4dE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5saW5lQ29tbWVudFN0YXJ0ID0gXCItLVwiO1xuICAgIHRoaXMuJGlkID0gXCJhY2UvbW9kZS9laWZmZWxcIjtcbn0pLmNhbGwoTW9kZS5wcm90b3R5cGUpO1xuXG5leHBvcnRzLk1vZGUgPSBNb2RlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90ZXh0X2hpZ2hsaWdodF9ydWxlc1wiKS5UZXh0SGlnaGxpZ2h0UnVsZXM7XG5cbnZhciBFaWZmZWxIaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBrZXl3b3JkcyA9IFwiYWNyb3NzfGFnZW50fGFsaWFzfGFsbHxhdHRhY2hlZHxhc3xhc3NpZ258YXR0cmlidXRlfGNoZWNrfFwiICtcbiAgICAgICAgXCJjbGFzc3xjb252ZXJ0fGNyZWF0ZXxkZWJ1Z3xkZWZlcnJlZHxkZXRhY2hhYmxlfGRvfGVsc2V8ZWxzZWlmfGVuZHxcIiArXG4gICAgICAgIFwiZW5zdXJlfGV4cGFuZGVkfGV4cG9ydHxleHRlcm5hbHxmZWF0dXJlfGZyb218ZnJvemVufGlmfGluaGVyaXR8XCIgK1xuICAgICAgICBcImluc3BlY3R8aW52YXJpYW50fGxpa2V8bG9jYWx8bG9vcHxub3R8bm90ZXxvYnNvbGV0ZXxvbGR8b25jZXxcIiArXG4gICAgICAgIFwiUHJlY3Vyc29yfHJlZGVmaW5lfHJlbmFtZXxyZXF1aXJlfHJlc2N1ZXxyZXRyeXxzZWxlY3R8c2VwYXJhdGV8XCIgK1xuICAgICAgICBcInNvbWV8dGhlbnx1bmRlZmluZXx1bnRpbHx2YXJpYW50fHdoZW5cIjtcblxuICAgIHZhciBvcGVyYXRvcktleXdvcmRzID0gXCJhbmR8aW1wbGllc3xvcnx4b3JcIjtcblxuICAgIHZhciBsYW5ndWFnZUNvbnN0YW50cyA9IFwiVm9pZFwiO1xuXG4gICAgdmFyIGJvb2xlYW5Db25zdGFudHMgPSBcIlRydWV8RmFsc2VcIjtcblxuICAgIHZhciBsYW5ndWFnZVZhcmlhYmxlcyA9IFwiQ3VycmVudHxSZXN1bHRcIjtcblxuICAgIHZhciBrZXl3b3JkTWFwcGVyID0gdGhpcy5jcmVhdGVLZXl3b3JkTWFwcGVyKHtcbiAgICAgICAgXCJjb25zdGFudC5sYW5ndWFnZVwiOiBsYW5ndWFnZUNvbnN0YW50cyxcbiAgICAgICAgXCJjb25zdGFudC5sYW5ndWFnZS5ib29sZWFuXCI6IGJvb2xlYW5Db25zdGFudHMsXG4gICAgICAgIFwidmFyaWFibGUubGFuZ3VhZ2VcIjogbGFuZ3VhZ2VWYXJpYWJsZXMsXG4gICAgICAgIFwia2V5d29yZC5vcGVyYXRvclwiOiBvcGVyYXRvcktleXdvcmRzLFxuICAgICAgICBcImtleXdvcmRcIjoga2V5d29yZHNcbiAgICB9LCBcImlkZW50aWZpZXJcIiwgdHJ1ZSk7XG5cbiAgICB2YXIgc2ltcGxlU3RyaW5nID0gLyg/OlteXCIlXFxiXFxmXFx2XXwlW0EtREZITE5RUi1WJSdcIigpPD5dfCVcXC8oPzowW3hYXVtcXGRhLWZBLUZdKD86XypbXFxkYS1mQS1GXSkqfDBbY0NdWzAtN10oPzpfKlswLTddKSp8MFtiQl1bMDFdKD86XypbMDFdKSp8XFxkKD86XypcXGQpKilcXC8pKz8vO1xuXG4gICAgdGhpcy4kcnVsZXMgPSB7XG4gICAgICAgIFwic3RhcnRcIjogW3tcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nLnF1b3RlZC5vdGhlclwiLCAvLyBBbGlnbmVkLXZlcmJhdGltLXN0cmluZ3MgKHZlcmJhdGltIG9wdGlvbiBub3Qgc3VwcG9ydGVkKVxuICAgICAgICAgICAgICAgIHJlZ2V4IDogL1wiXFxbLyxcbiAgICAgICAgICAgICAgICBuZXh0OiBcImFsaWduZWRfdmVyYmF0aW1fc3RyaW5nXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nLnF1b3RlZC5vdGhlclwiLCAvLyBOb24tYWxpZ25lZC12ZXJiYXRpbS1zdHJpbmdzICh2ZXJiYXRpbSBvcHRpb24gbm90IHN1cHBvcnRlZClcbiAgICAgICAgICAgICAgICByZWdleCA6IC9cIlxcey8sXG4gICAgICAgICAgICAgICAgbmV4dDogXCJub24tYWxpZ25lZF92ZXJiYXRpbV9zdHJpbmdcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmcucXVvdGVkLmRvdWJsZVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogL1wiKD86W14lXFxiXFxmXFxuXFxyXFx2XXwlW0EtREZITE5RUi1WJSdcIigpPD5dfCVcXC8oPzowW3hYXVtcXGRhLWZBLUZdKD86XypbXFxkYS1mQS1GXSkqfDBbY0NdWzAtN10oPzpfKlswLTddKSp8MFtiQl1bMDFdKD86XypbMDFdKSp8XFxkKD86XypcXGQpKilcXC8pKj9cIi9cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudC5saW5lLmRvdWJsZS1kYXNoXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvLS0uKi9cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQuY2hhcmFjdGVyXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvJyg/OlteJVxcYlxcZlxcblxcclxcdFxcdl18JVtBLURGSExOUVItViUnXCIoKTw+XXwlXFwvKD86MFt4WF1bXFxkYS1mQS1GXSg/Ol8qW1xcZGEtZkEtRl0pKnwwW2NDXVswLTddKD86XypbMC03XSkqfDBbYkJdWzAxXSg/Ol8qWzAxXSkqfFxcZCg/Ol8qXFxkKSopXFwvKScvXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIiwgLy8gaGV4YSB8IG9jdGFsIHwgYmluXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvXFxiMCg/Olt4WF1bXFxkYS1mQS1GXSg/Ol8qW1xcZGEtZkEtRl0pKnxbY0NdWzAtN10oPzpfKlswLTddKSp8W2JCXVswMV0oPzpfKlswMV0pKilcXGIvXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC8oPzpcXGQoPzpfKlxcZCkqKT9cXC4oPzooPzpcXGQoPzpfKlxcZCkqKT9bZUVdWystXT8pP1xcZCg/Ol8qXFxkKSp8XFxkKD86XypcXGQpKlxcLj8vXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInBhcmVuLmxwYXJlblwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogL1tcXFsoe118PDx8XFx8XFwoL1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJwYXJlbi5ycGFyZW5cIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC9bXFxdKX1dfD4+fFxcfFxcKS9cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwia2V5d29yZC5vcGVyYXRvclwiLCAvLyBwdW5jdHVhdGlvblxuICAgICAgICAgICAgICAgIHJlZ2V4IDogLzo9fC0+fFxcLig/PVxcdyl8WzssOj9dL1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvXFxcXFxcXFx8XFx8XFwuXFwuXFx8fFxcLlxcLnxcXC9bflxcL10/fFs+PFxcL109P3xbLSsqXj1+XS9cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBrZXl3b3JkTWFwcGVyKHYpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0ID09PSBcImlkZW50aWZpZXJcIiAmJiB2ID09PSB2LnRvVXBwZXJDYXNlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9ICBcImVudGl0eS5uYW1lLnR5cGVcIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvW2EtekEtWl1bYS16QS1aXFxkX10qXFxiL1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvXFxzKy9cbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgXCJhbGlnbmVkX3ZlcmJhdGltX3N0cmluZ1wiIDogW3tcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvXVwiLyxcbiAgICAgICAgICAgICAgICBuZXh0IDogXCJzdGFydFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogc2ltcGxlU3RyaW5nXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIFwibm9uLWFsaWduZWRfdmVyYmF0aW1fc3RyaW5nXCIgOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmcucXVvdGVkLm90aGVyXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvfVwiLyxcbiAgICAgICAgICAgICAgICBuZXh0IDogXCJzdGFydFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZy5xdW90ZWQub3RoZXJcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IHNpbXBsZVN0cmluZ1xuICAgICAgICAgICAgfVxuICAgICAgICBdfTtcbn07XG5cbm9vcC5pbmhlcml0cyhFaWZmZWxIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuZXhwb3J0cy5FaWZmZWxIaWdobGlnaHRSdWxlcyA9IEVpZmZlbEhpZ2hsaWdodFJ1bGVzO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9