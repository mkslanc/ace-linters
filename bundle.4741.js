"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[4741],{

/***/ 84741:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var VerilogHighlightRules = (__webpack_require__(11458)/* .VerilogHighlightRules */ .k);
var Range = (__webpack_require__(91902)/* .Range */ .Q);

var Mode = function() {
    this.HighlightRules = VerilogHighlightRules;
    this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, TextMode);

(function() {

    this.lineCommentStart = "//";
    this.blockComment = {start: "/*", end: "*/"};
    this.$quotes = { '"': '"' };


    this.$id = "ace/mode/verilog";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 11458:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

var VerilogHighlightRules = function() {
var keywords = "always|and|assign|automatic|begin|buf|bufif0|bufif1|case|casex|casez|cell|cmos|config|" +
    "deassign|default|defparam|design|disable|edge|else|end|endcase|endconfig|endfunction|endgenerate|endmodule|" +
    "endprimitive|endspecify|endtable|endtask|event|for|force|forever|fork|function|generate|genvar|highz0|" +
    "highz1|if|ifnone|incdir|include|initial|inout|input|instance|integer|join|large|liblist|library|localparam|" +
    "macromodule|medium|module|nand|negedge|nmos|nor|noshowcancelled|not|notif0|notif1|or|output|parameter|pmos|" +
    "posedge|primitive|pull0|pull1|pulldown|pullup|pulsestyle_onevent|pulsestyle_ondetect|rcmos|real|realtime|" +
    "reg|release|repeat|rnmos|rpmos|rtran|rtranif0|rtranif1|scalared|showcancelled|signed|small|specify|specparam|" +
    "strong0|strong1|supply0|supply1|table|task|time|tran|tranif0|tranif1|tri|tri0|tri1|triand|trior|trireg|" +
    "unsigned|use|vectored|wait|wand|weak0|weak1|while|wire|wor|xnor|xor" +
    "begin|bufif0|bufif1|case|casex|casez|config|else|end|endcase|endconfig|endfunction|" +
    "endgenerate|endmodule|endprimitive|endspecify|endtable|endtask|for|forever|function|generate|if|ifnone|" +
    "macromodule|module|primitive|repeat|specify|table|task|while";

    var builtinConstants = (
        "true|false|null"
    );

    var builtinFunctions = (
        "count|min|max|avg|sum|rank|now|coalesce|main"
    );

    var keywordMapper = this.createKeywordMapper({
        "support.function": builtinFunctions,
        "keyword": keywords,
        "constant.language": builtinConstants
    }, "identifier", true);

    this.$rules = {
        "start" : [ {
            token : "comment",
            regex : "//.*$"
        }, {
            token : "comment.start",
            regex : "/\\*",
            next : [
                { token : "comment.end", regex : "\\*/", next: "start" },
                { defaultToken : "comment" }
            ]
        }, {
            token : "string.start",
            regex : '"',
            next : [
                { token : "constant.language.escape", regex : /\\(?:[ntvfa\\"]|[0-7]{1,3}|\x[a-fA-F\d]{1,2}|)/, consumeLineEnd : true },
                { token : "string.end", regex : '"|$', next: "start" },
                { defaultToken : "string" }
            ]
        }, {
            token : "string",
            regex : "'^[']'"
        }, {
            token : "constant.numeric", // float
            regex : "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
        }, {
            token : keywordMapper,
            regex : "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
        }, {
            token : "keyword.operator",
            regex : "\\+|\\-|\\/|\\/\\/|%|<@>|@>|<@|&|\\^|~|<|>|<=|=>|==|!=|<>|="
        }, {
            token : "paren.lparen",
            regex : "[\\(]"
        }, {
            token : "paren.rparen",
            regex : "[\\)]"
        }, {
            token : "text",
            regex : "\\s+"
        } ]
    };
    this.normalizeRules();
};

oop.inherits(VerilogHighlightRules, TextHighlightRules);

exports.k = VerilogHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjQ3NDEuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLElBQVk7QUFDOUIsZUFBZSxpQ0FBc0I7QUFDckMsNEJBQTRCLDJEQUEwRDtBQUN0RixZQUFZLDJDQUF5Qjs7QUFFckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLHlCQUF5QjtBQUN6QixxQkFBcUI7OztBQUdyQjtBQUNBLENBQUM7O0FBRUQsWUFBWTs7Ozs7Ozs7QUN2QkM7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLElBQVk7QUFDOUIseUJBQXlCLHdEQUFvRDs7QUFFN0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLHNEQUFzRDtBQUN4RSxrQkFBa0I7QUFDbEI7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLG1FQUFtRSxJQUFJLGNBQWMsSUFBSSw0QkFBNEI7QUFDdkksa0JBQWtCLG9EQUFvRDtBQUN0RSxrQkFBa0I7QUFDbEI7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsU0FBNkIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL3Zlcmlsb2cuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS92ZXJpbG9nX2hpZ2hsaWdodF9ydWxlcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRNb2RlID0gcmVxdWlyZShcIi4vdGV4dFwiKS5Nb2RlO1xudmFyIFZlcmlsb2dIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3Zlcmlsb2dfaGlnaGxpZ2h0X3J1bGVzXCIpLlZlcmlsb2dIaWdobGlnaHRSdWxlcztcbnZhciBSYW5nZSA9IHJlcXVpcmUoXCIuLi9yYW5nZVwiKS5SYW5nZTtcblxudmFyIE1vZGUgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLkhpZ2hsaWdodFJ1bGVzID0gVmVyaWxvZ0hpZ2hsaWdodFJ1bGVzO1xuICAgIHRoaXMuJGJlaGF2aW91ciA9IHRoaXMuJGRlZmF1bHRCZWhhdmlvdXI7XG59O1xub29wLmluaGVyaXRzKE1vZGUsIFRleHRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5saW5lQ29tbWVudFN0YXJ0ID0gXCIvL1wiO1xuICAgIHRoaXMuYmxvY2tDb21tZW50ID0ge3N0YXJ0OiBcIi8qXCIsIGVuZDogXCIqL1wifTtcbiAgICB0aGlzLiRxdW90ZXMgPSB7ICdcIic6ICdcIicgfTtcblxuXG4gICAgdGhpcy4kaWQgPSBcImFjZS9tb2RlL3Zlcmlsb2dcIjtcbn0pLmNhbGwoTW9kZS5wcm90b3R5cGUpO1xuXG5leHBvcnRzLk1vZGUgPSBNb2RlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90ZXh0X2hpZ2hsaWdodF9ydWxlc1wiKS5UZXh0SGlnaGxpZ2h0UnVsZXM7XG5cbnZhciBWZXJpbG9nSGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbigpIHtcbnZhciBrZXl3b3JkcyA9IFwiYWx3YXlzfGFuZHxhc3NpZ258YXV0b21hdGljfGJlZ2lufGJ1ZnxidWZpZjB8YnVmaWYxfGNhc2V8Y2FzZXh8Y2FzZXp8Y2VsbHxjbW9zfGNvbmZpZ3xcIiArXG4gICAgXCJkZWFzc2lnbnxkZWZhdWx0fGRlZnBhcmFtfGRlc2lnbnxkaXNhYmxlfGVkZ2V8ZWxzZXxlbmR8ZW5kY2FzZXxlbmRjb25maWd8ZW5kZnVuY3Rpb258ZW5kZ2VuZXJhdGV8ZW5kbW9kdWxlfFwiICtcbiAgICBcImVuZHByaW1pdGl2ZXxlbmRzcGVjaWZ5fGVuZHRhYmxlfGVuZHRhc2t8ZXZlbnR8Zm9yfGZvcmNlfGZvcmV2ZXJ8Zm9ya3xmdW5jdGlvbnxnZW5lcmF0ZXxnZW52YXJ8aGlnaHowfFwiICtcbiAgICBcImhpZ2h6MXxpZnxpZm5vbmV8aW5jZGlyfGluY2x1ZGV8aW5pdGlhbHxpbm91dHxpbnB1dHxpbnN0YW5jZXxpbnRlZ2VyfGpvaW58bGFyZ2V8bGlibGlzdHxsaWJyYXJ5fGxvY2FscGFyYW18XCIgK1xuICAgIFwibWFjcm9tb2R1bGV8bWVkaXVtfG1vZHVsZXxuYW5kfG5lZ2VkZ2V8bm1vc3xub3J8bm9zaG93Y2FuY2VsbGVkfG5vdHxub3RpZjB8bm90aWYxfG9yfG91dHB1dHxwYXJhbWV0ZXJ8cG1vc3xcIiArXG4gICAgXCJwb3NlZGdlfHByaW1pdGl2ZXxwdWxsMHxwdWxsMXxwdWxsZG93bnxwdWxsdXB8cHVsc2VzdHlsZV9vbmV2ZW50fHB1bHNlc3R5bGVfb25kZXRlY3R8cmNtb3N8cmVhbHxyZWFsdGltZXxcIiArXG4gICAgXCJyZWd8cmVsZWFzZXxyZXBlYXR8cm5tb3N8cnBtb3N8cnRyYW58cnRyYW5pZjB8cnRyYW5pZjF8c2NhbGFyZWR8c2hvd2NhbmNlbGxlZHxzaWduZWR8c21hbGx8c3BlY2lmeXxzcGVjcGFyYW18XCIgK1xuICAgIFwic3Ryb25nMHxzdHJvbmcxfHN1cHBseTB8c3VwcGx5MXx0YWJsZXx0YXNrfHRpbWV8dHJhbnx0cmFuaWYwfHRyYW5pZjF8dHJpfHRyaTB8dHJpMXx0cmlhbmR8dHJpb3J8dHJpcmVnfFwiICtcbiAgICBcInVuc2lnbmVkfHVzZXx2ZWN0b3JlZHx3YWl0fHdhbmR8d2VhazB8d2VhazF8d2hpbGV8d2lyZXx3b3J8eG5vcnx4b3JcIiArXG4gICAgXCJiZWdpbnxidWZpZjB8YnVmaWYxfGNhc2V8Y2FzZXh8Y2FzZXp8Y29uZmlnfGVsc2V8ZW5kfGVuZGNhc2V8ZW5kY29uZmlnfGVuZGZ1bmN0aW9ufFwiICtcbiAgICBcImVuZGdlbmVyYXRlfGVuZG1vZHVsZXxlbmRwcmltaXRpdmV8ZW5kc3BlY2lmeXxlbmR0YWJsZXxlbmR0YXNrfGZvcnxmb3JldmVyfGZ1bmN0aW9ufGdlbmVyYXRlfGlmfGlmbm9uZXxcIiArXG4gICAgXCJtYWNyb21vZHVsZXxtb2R1bGV8cHJpbWl0aXZlfHJlcGVhdHxzcGVjaWZ5fHRhYmxlfHRhc2t8d2hpbGVcIjtcblxuICAgIHZhciBidWlsdGluQ29uc3RhbnRzID0gKFxuICAgICAgICBcInRydWV8ZmFsc2V8bnVsbFwiXG4gICAgKTtcblxuICAgIHZhciBidWlsdGluRnVuY3Rpb25zID0gKFxuICAgICAgICBcImNvdW50fG1pbnxtYXh8YXZnfHN1bXxyYW5rfG5vd3xjb2FsZXNjZXxtYWluXCJcbiAgICApO1xuXG4gICAgdmFyIGtleXdvcmRNYXBwZXIgPSB0aGlzLmNyZWF0ZUtleXdvcmRNYXBwZXIoe1xuICAgICAgICBcInN1cHBvcnQuZnVuY3Rpb25cIjogYnVpbHRpbkZ1bmN0aW9ucyxcbiAgICAgICAgXCJrZXl3b3JkXCI6IGtleXdvcmRzLFxuICAgICAgICBcImNvbnN0YW50Lmxhbmd1YWdlXCI6IGJ1aWx0aW5Db25zdGFudHNcbiAgICB9LCBcImlkZW50aWZpZXJcIiwgdHJ1ZSk7XG5cbiAgICB0aGlzLiRydWxlcyA9IHtcbiAgICAgICAgXCJzdGFydFwiIDogWyB7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudFwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIi8vLiokXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnQuc3RhcnRcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCIvXFxcXCpcIixcbiAgICAgICAgICAgIG5leHQgOiBbXG4gICAgICAgICAgICAgICAgeyB0b2tlbiA6IFwiY29tbWVudC5lbmRcIiwgcmVnZXggOiBcIlxcXFwqL1wiLCBuZXh0OiBcInN0YXJ0XCIgfSxcbiAgICAgICAgICAgICAgICB7IGRlZmF1bHRUb2tlbiA6IFwiY29tbWVudFwiIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZy5zdGFydFwiLFxuICAgICAgICAgICAgcmVnZXggOiAnXCInLFxuICAgICAgICAgICAgbmV4dCA6IFtcbiAgICAgICAgICAgICAgICB7IHRva2VuIDogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIiwgcmVnZXggOiAvXFxcXCg/OltudHZmYVxcXFxcIl18WzAtN117MSwzfXxcXHhbYS1mQS1GXFxkXXsxLDJ9fCkvLCBjb25zdW1lTGluZUVuZCA6IHRydWUgfSxcbiAgICAgICAgICAgICAgICB7IHRva2VuIDogXCJzdHJpbmcuZW5kXCIsIHJlZ2V4IDogJ1wifCQnLCBuZXh0OiBcInN0YXJ0XCIgfSxcbiAgICAgICAgICAgICAgICB7IGRlZmF1bHRUb2tlbiA6IFwic3RyaW5nXCIgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiJ15bJ10nXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIiwgLy8gZmxvYXRcbiAgICAgICAgICAgIHJlZ2V4IDogXCJbKy1dP1xcXFxkKyg/Oig/OlxcXFwuXFxcXGQqKT8oPzpbZUVdWystXT9cXFxcZCspPyk/XFxcXGJcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IGtleXdvcmRNYXBwZXIsXG4gICAgICAgICAgICByZWdleCA6IFwiW2EtekEtWl8kXVthLXpBLVowLTlfJF0qXFxcXGJcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwia2V5d29yZC5vcGVyYXRvclwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwrfFxcXFwtfFxcXFwvfFxcXFwvXFxcXC98JXw8QD58QD58PEB8JnxcXFxcXnx+fDx8Pnw8PXw9Pnw9PXwhPXw8Pnw9XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInBhcmVuLmxwYXJlblwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIltcXFxcKF1cIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwicGFyZW4ucnBhcmVuXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiW1xcXFwpXVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJ0ZXh0XCIsXG4gICAgICAgICAgICByZWdleCA6IFwiXFxcXHMrXCJcbiAgICAgICAgfSBdXG4gICAgfTtcbiAgICB0aGlzLm5vcm1hbGl6ZVJ1bGVzKCk7XG59O1xuXG5vb3AuaW5oZXJpdHMoVmVyaWxvZ0hpZ2hsaWdodFJ1bGVzLCBUZXh0SGlnaGxpZ2h0UnVsZXMpO1xuXG5leHBvcnRzLlZlcmlsb2dIaWdobGlnaHRSdWxlcyA9IFZlcmlsb2dIaWdobGlnaHRSdWxlcztcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==