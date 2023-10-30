"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[11],{

/***/ 60011:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var TextMode = (__webpack_require__(98030).Mode);
var VHDLHighlightRules = (__webpack_require__(26352)/* .VHDLHighlightRules */ ._);

var Mode = function() {
    this.HighlightRules = VHDLHighlightRules;
    this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, TextMode);

(function() {

    this.lineCommentStart = "--";

    this.$id = "ace/mode/vhdl";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 26352:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var TextHighlightRules = (__webpack_require__(28053)/* .TextHighlightRules */ .K);

var VHDLHighlightRules = function() {


    
    var keywords = "access|after|alias|all|architecture|assert|attribute|"+
                   "begin|block|body|buffer|bus|case|component|configuration|"+
                   "context|disconnect|downto|else|elsif|end|entity|exit|"+
                   "file|for|force|function|generate|generic|group|guarded|"+
                   "if|impure|in|inertial|inout|is|label|library|linkage|"+
                   "literal|loop|map|new|next|of|on|or|open|others|out|"+
                   "package|parameter|port|postponed|procedure|process|"+
                   "protected|pure|range|record|register|reject|release|"+
                   "report|return|select|severity|shared|signal|subtype|then|"+
                   "to|transport|type|unaffected|units|until|use|variable|"+
                   "wait|when|while|with";
    
    var storageType = "bit|bit_vector|boolean|character|integer|line|natural|"+
                      "positive|real|register|signed|std_logic|"+
                      "std_logic_vector|string||text|time|unsigned";
    
    var storageModifiers = "array|constant";
    
    var keywordOperators = "abs|and|mod|nand|nor|not|rem|rol|ror|sla|sll|sra"+
                           "srl|xnor|xor";
    
    var builtinConstants = (
        "true|false|null"
    );


    var keywordMapper = this.createKeywordMapper({
        "keyword.operator": keywordOperators,
        "keyword": keywords,
        "constant.language": builtinConstants,
        "storage.modifier": storageModifiers,
        "storage.type": storageType
    }, "identifier", true);

    this.$rules = {
        "start" : [ {
            token : "comment",
            regex : "--.*$"
        }, {
            token : "string",           // " string
            regex : '".*?"'
        }, {
            token : "string",           // ' string
            regex : "'.*?'"
        }, {
            token : "constant.numeric", // float
            regex : "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
        }, {
            token : "keyword", // pre-compiler directives
            regex : "\\s*(?:library|package|use)\\b"
        }, {
            token : keywordMapper,
            regex : "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
        }, {
            token : "keyword.operator",
            regex : "&|\\*|\\+|\\-|\\/|<|=|>|\\||=>|\\*\\*|:=|\\/=|>=|<=|<>" 
        }, {
              token : "punctuation.operator",
              regex : "\\'|\\:|\\,|\\;|\\."
        },{
            token : "paren.lparen",
            regex : "[[(]"
        }, {
            token : "paren.rparen",
            regex : "[\\])]"
        }, {
            token : "text",
            regex : "\\s+"
        } ]

       
    };
};

oop.inherits(VHDLHighlightRules, TextHighlightRules);

exports._ = VHDLHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjExLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFhOztBQUViLFVBQVUsbUJBQU8sQ0FBQyxLQUFZO0FBQzlCLGVBQWUsaUNBQXNCO0FBQ3JDLHlCQUF5Qix3REFBb0Q7O0FBRTdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQSxDQUFDOztBQUVELFlBQVk7Ozs7Ozs7O0FDbkJDOztBQUViLFVBQVUsbUJBQU8sQ0FBQyxLQUFZO0FBQzlCLHlCQUF5Qix3REFBb0Q7O0FBRTdFOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLHNDQUFzQztBQUN0QyxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxVQUFVOztBQUVWO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxTQUEwQiIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvdmhkbC5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL3ZoZGxfaGlnaGxpZ2h0X3J1bGVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dE1vZGUgPSByZXF1aXJlKFwiLi90ZXh0XCIpLk1vZGU7XG52YXIgVkhETEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdmhkbF9oaWdobGlnaHRfcnVsZXNcIikuVkhETEhpZ2hsaWdodFJ1bGVzO1xuXG52YXIgTW9kZSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuSGlnaGxpZ2h0UnVsZXMgPSBWSERMSGlnaGxpZ2h0UnVsZXM7XG4gICAgdGhpcy4kYmVoYXZpb3VyID0gdGhpcy4kZGVmYXVsdEJlaGF2aW91cjtcbn07XG5vb3AuaW5oZXJpdHMoTW9kZSwgVGV4dE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG5cbiAgICB0aGlzLmxpbmVDb21tZW50U3RhcnQgPSBcIi0tXCI7XG5cbiAgICB0aGlzLiRpZCA9IFwiYWNlL21vZGUvdmhkbFwiO1xufSkuY2FsbChNb2RlLnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTW9kZSA9IE1vZGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcblxudmFyIFZIRExIaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uKCkge1xuXG5cbiAgICBcbiAgICB2YXIga2V5d29yZHMgPSBcImFjY2Vzc3xhZnRlcnxhbGlhc3xhbGx8YXJjaGl0ZWN0dXJlfGFzc2VydHxhdHRyaWJ1dGV8XCIrXG4gICAgICAgICAgICAgICAgICAgXCJiZWdpbnxibG9ja3xib2R5fGJ1ZmZlcnxidXN8Y2FzZXxjb21wb25lbnR8Y29uZmlndXJhdGlvbnxcIitcbiAgICAgICAgICAgICAgICAgICBcImNvbnRleHR8ZGlzY29ubmVjdHxkb3dudG98ZWxzZXxlbHNpZnxlbmR8ZW50aXR5fGV4aXR8XCIrXG4gICAgICAgICAgICAgICAgICAgXCJmaWxlfGZvcnxmb3JjZXxmdW5jdGlvbnxnZW5lcmF0ZXxnZW5lcmljfGdyb3VwfGd1YXJkZWR8XCIrXG4gICAgICAgICAgICAgICAgICAgXCJpZnxpbXB1cmV8aW58aW5lcnRpYWx8aW5vdXR8aXN8bGFiZWx8bGlicmFyeXxsaW5rYWdlfFwiK1xuICAgICAgICAgICAgICAgICAgIFwibGl0ZXJhbHxsb29wfG1hcHxuZXd8bmV4dHxvZnxvbnxvcnxvcGVufG90aGVyc3xvdXR8XCIrXG4gICAgICAgICAgICAgICAgICAgXCJwYWNrYWdlfHBhcmFtZXRlcnxwb3J0fHBvc3Rwb25lZHxwcm9jZWR1cmV8cHJvY2Vzc3xcIitcbiAgICAgICAgICAgICAgICAgICBcInByb3RlY3RlZHxwdXJlfHJhbmdlfHJlY29yZHxyZWdpc3RlcnxyZWplY3R8cmVsZWFzZXxcIitcbiAgICAgICAgICAgICAgICAgICBcInJlcG9ydHxyZXR1cm58c2VsZWN0fHNldmVyaXR5fHNoYXJlZHxzaWduYWx8c3VidHlwZXx0aGVufFwiK1xuICAgICAgICAgICAgICAgICAgIFwidG98dHJhbnNwb3J0fHR5cGV8dW5hZmZlY3RlZHx1bml0c3x1bnRpbHx1c2V8dmFyaWFibGV8XCIrXG4gICAgICAgICAgICAgICAgICAgXCJ3YWl0fHdoZW58d2hpbGV8d2l0aFwiO1xuICAgIFxuICAgIHZhciBzdG9yYWdlVHlwZSA9IFwiYml0fGJpdF92ZWN0b3J8Ym9vbGVhbnxjaGFyYWN0ZXJ8aW50ZWdlcnxsaW5lfG5hdHVyYWx8XCIrXG4gICAgICAgICAgICAgICAgICAgICAgXCJwb3NpdGl2ZXxyZWFsfHJlZ2lzdGVyfHNpZ25lZHxzdGRfbG9naWN8XCIrXG4gICAgICAgICAgICAgICAgICAgICAgXCJzdGRfbG9naWNfdmVjdG9yfHN0cmluZ3x8dGV4dHx0aW1lfHVuc2lnbmVkXCI7XG4gICAgXG4gICAgdmFyIHN0b3JhZ2VNb2RpZmllcnMgPSBcImFycmF5fGNvbnN0YW50XCI7XG4gICAgXG4gICAgdmFyIGtleXdvcmRPcGVyYXRvcnMgPSBcImFic3xhbmR8bW9kfG5hbmR8bm9yfG5vdHxyZW18cm9sfHJvcnxzbGF8c2xsfHNyYVwiK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJzcmx8eG5vcnx4b3JcIjtcbiAgICBcbiAgICB2YXIgYnVpbHRpbkNvbnN0YW50cyA9IChcbiAgICAgICAgXCJ0cnVlfGZhbHNlfG51bGxcIlxuICAgICk7XG5cblxuICAgIHZhciBrZXl3b3JkTWFwcGVyID0gdGhpcy5jcmVhdGVLZXl3b3JkTWFwcGVyKHtcbiAgICAgICAgXCJrZXl3b3JkLm9wZXJhdG9yXCI6IGtleXdvcmRPcGVyYXRvcnMsXG4gICAgICAgIFwia2V5d29yZFwiOiBrZXl3b3JkcyxcbiAgICAgICAgXCJjb25zdGFudC5sYW5ndWFnZVwiOiBidWlsdGluQ29uc3RhbnRzLFxuICAgICAgICBcInN0b3JhZ2UubW9kaWZpZXJcIjogc3RvcmFnZU1vZGlmaWVycyxcbiAgICAgICAgXCJzdG9yYWdlLnR5cGVcIjogc3RvcmFnZVR5cGVcbiAgICB9LCBcImlkZW50aWZpZXJcIiwgdHJ1ZSk7XG5cbiAgICB0aGlzLiRydWxlcyA9IHtcbiAgICAgICAgXCJzdGFydFwiIDogWyB7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudFwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIi0tLiokXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLCAgICAgICAgICAgLy8gXCIgc3RyaW5nXG4gICAgICAgICAgICByZWdleCA6ICdcIi4qP1wiJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsICAgICAgICAgICAvLyAnIHN0cmluZ1xuICAgICAgICAgICAgcmVnZXggOiBcIicuKj8nXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIiwgLy8gZmxvYXRcbiAgICAgICAgICAgIHJlZ2V4IDogXCJbKy1dP1xcXFxkKyg/Oig/OlxcXFwuXFxcXGQqKT8oPzpbZUVdWystXT9cXFxcZCspPyk/XFxcXGJcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwia2V5d29yZFwiLCAvLyBwcmUtY29tcGlsZXIgZGlyZWN0aXZlc1xuICAgICAgICAgICAgcmVnZXggOiBcIlxcXFxzKig/OmxpYnJhcnl8cGFja2FnZXx1c2UpXFxcXGJcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IGtleXdvcmRNYXBwZXIsXG4gICAgICAgICAgICByZWdleCA6IFwiW2EtekEtWl8kXVthLXpBLVowLTlfJF0qXFxcXGJcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwia2V5d29yZC5vcGVyYXRvclwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIiZ8XFxcXCp8XFxcXCt8XFxcXC18XFxcXC98PHw9fD58XFxcXHx8PT58XFxcXCpcXFxcKnw6PXxcXFxcLz18Pj18PD18PD5cIiBcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgICB0b2tlbiA6IFwicHVuY3R1YXRpb24ub3BlcmF0b3JcIixcbiAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwnfFxcXFw6fFxcXFwsfFxcXFw7fFxcXFwuXCJcbiAgICAgICAgfSx7XG4gICAgICAgICAgICB0b2tlbiA6IFwicGFyZW4ubHBhcmVuXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiW1soXVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJwYXJlbi5ycGFyZW5cIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJbXFxcXF0pXVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJ0ZXh0XCIsXG4gICAgICAgICAgICByZWdleCA6IFwiXFxcXHMrXCJcbiAgICAgICAgfSBdXG5cbiAgICAgICBcbiAgICB9O1xufTtcblxub29wLmluaGVyaXRzKFZIRExIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuZXhwb3J0cy5WSERMSGlnaGxpZ2h0UnVsZXMgPSBWSERMSGlnaGxpZ2h0UnVsZXM7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=