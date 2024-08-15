"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[5941],{

/***/ 95941:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var VHDLHighlightRules = (__webpack_require__(49730)/* .VHDLHighlightRules */ .K);

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

/***/ 49730:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

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

exports.K = VHDLHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjU5NDEuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLElBQVk7QUFDOUIsZUFBZSxpQ0FBc0I7QUFDckMseUJBQXlCLHdEQUFvRDs7QUFFN0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQsWUFBWTs7Ozs7Ozs7QUNuQkM7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLElBQVk7QUFDOUIseUJBQXlCLHdEQUFvRDs7QUFFN0U7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0Esc0NBQXNDO0FBQ3RDLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFVBQVU7O0FBRVY7QUFDQTtBQUNBOztBQUVBOztBQUVBLFNBQTBCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS92aGRsLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvdmhkbF9oaWdobGlnaHRfcnVsZXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0TW9kZSA9IHJlcXVpcmUoXCIuL3RleHRcIikuTW9kZTtcbnZhciBWSERMSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi92aGRsX2hpZ2hsaWdodF9ydWxlc1wiKS5WSERMSGlnaGxpZ2h0UnVsZXM7XG5cbnZhciBNb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5IaWdobGlnaHRSdWxlcyA9IFZIRExIaWdobGlnaHRSdWxlcztcbiAgICB0aGlzLiRiZWhhdmlvdXIgPSB0aGlzLiRkZWZhdWx0QmVoYXZpb3VyO1xufTtcbm9vcC5pbmhlcml0cyhNb2RlLCBUZXh0TW9kZSk7XG5cbihmdW5jdGlvbigpIHtcblxuICAgIHRoaXMubGluZUNvbW1lbnRTdGFydCA9IFwiLS1cIjtcblxuICAgIHRoaXMuJGlkID0gXCJhY2UvbW9kZS92aGRsXCI7XG59KS5jYWxsKE1vZGUucHJvdG90eXBlKTtcblxuZXhwb3J0cy5Nb2RlID0gTW9kZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xuXG52YXIgVkhETEhpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24oKSB7XG5cblxuICAgIFxuICAgIHZhciBrZXl3b3JkcyA9IFwiYWNjZXNzfGFmdGVyfGFsaWFzfGFsbHxhcmNoaXRlY3R1cmV8YXNzZXJ0fGF0dHJpYnV0ZXxcIitcbiAgICAgICAgICAgICAgICAgICBcImJlZ2lufGJsb2NrfGJvZHl8YnVmZmVyfGJ1c3xjYXNlfGNvbXBvbmVudHxjb25maWd1cmF0aW9ufFwiK1xuICAgICAgICAgICAgICAgICAgIFwiY29udGV4dHxkaXNjb25uZWN0fGRvd250b3xlbHNlfGVsc2lmfGVuZHxlbnRpdHl8ZXhpdHxcIitcbiAgICAgICAgICAgICAgICAgICBcImZpbGV8Zm9yfGZvcmNlfGZ1bmN0aW9ufGdlbmVyYXRlfGdlbmVyaWN8Z3JvdXB8Z3VhcmRlZHxcIitcbiAgICAgICAgICAgICAgICAgICBcImlmfGltcHVyZXxpbnxpbmVydGlhbHxpbm91dHxpc3xsYWJlbHxsaWJyYXJ5fGxpbmthZ2V8XCIrXG4gICAgICAgICAgICAgICAgICAgXCJsaXRlcmFsfGxvb3B8bWFwfG5ld3xuZXh0fG9mfG9ufG9yfG9wZW58b3RoZXJzfG91dHxcIitcbiAgICAgICAgICAgICAgICAgICBcInBhY2thZ2V8cGFyYW1ldGVyfHBvcnR8cG9zdHBvbmVkfHByb2NlZHVyZXxwcm9jZXNzfFwiK1xuICAgICAgICAgICAgICAgICAgIFwicHJvdGVjdGVkfHB1cmV8cmFuZ2V8cmVjb3JkfHJlZ2lzdGVyfHJlamVjdHxyZWxlYXNlfFwiK1xuICAgICAgICAgICAgICAgICAgIFwicmVwb3J0fHJldHVybnxzZWxlY3R8c2V2ZXJpdHl8c2hhcmVkfHNpZ25hbHxzdWJ0eXBlfHRoZW58XCIrXG4gICAgICAgICAgICAgICAgICAgXCJ0b3x0cmFuc3BvcnR8dHlwZXx1bmFmZmVjdGVkfHVuaXRzfHVudGlsfHVzZXx2YXJpYWJsZXxcIitcbiAgICAgICAgICAgICAgICAgICBcIndhaXR8d2hlbnx3aGlsZXx3aXRoXCI7XG4gICAgXG4gICAgdmFyIHN0b3JhZ2VUeXBlID0gXCJiaXR8Yml0X3ZlY3Rvcnxib29sZWFufGNoYXJhY3RlcnxpbnRlZ2VyfGxpbmV8bmF0dXJhbHxcIitcbiAgICAgICAgICAgICAgICAgICAgICBcInBvc2l0aXZlfHJlYWx8cmVnaXN0ZXJ8c2lnbmVkfHN0ZF9sb2dpY3xcIitcbiAgICAgICAgICAgICAgICAgICAgICBcInN0ZF9sb2dpY192ZWN0b3J8c3RyaW5nfHx0ZXh0fHRpbWV8dW5zaWduZWRcIjtcbiAgICBcbiAgICB2YXIgc3RvcmFnZU1vZGlmaWVycyA9IFwiYXJyYXl8Y29uc3RhbnRcIjtcbiAgICBcbiAgICB2YXIga2V5d29yZE9wZXJhdG9ycyA9IFwiYWJzfGFuZHxtb2R8bmFuZHxub3J8bm90fHJlbXxyb2x8cm9yfHNsYXxzbGx8c3JhXCIrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBcInNybHx4bm9yfHhvclwiO1xuICAgIFxuICAgIHZhciBidWlsdGluQ29uc3RhbnRzID0gKFxuICAgICAgICBcInRydWV8ZmFsc2V8bnVsbFwiXG4gICAgKTtcblxuXG4gICAgdmFyIGtleXdvcmRNYXBwZXIgPSB0aGlzLmNyZWF0ZUtleXdvcmRNYXBwZXIoe1xuICAgICAgICBcImtleXdvcmQub3BlcmF0b3JcIjoga2V5d29yZE9wZXJhdG9ycyxcbiAgICAgICAgXCJrZXl3b3JkXCI6IGtleXdvcmRzLFxuICAgICAgICBcImNvbnN0YW50Lmxhbmd1YWdlXCI6IGJ1aWx0aW5Db25zdGFudHMsXG4gICAgICAgIFwic3RvcmFnZS5tb2RpZmllclwiOiBzdG9yYWdlTW9kaWZpZXJzLFxuICAgICAgICBcInN0b3JhZ2UudHlwZVwiOiBzdG9yYWdlVHlwZVxuICAgIH0sIFwiaWRlbnRpZmllclwiLCB0cnVlKTtcblxuICAgIHRoaXMuJHJ1bGVzID0ge1xuICAgICAgICBcInN0YXJ0XCIgOiBbIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsXG4gICAgICAgICAgICByZWdleCA6IFwiLS0uKiRcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsICAgICAgICAgICAvLyBcIiBzdHJpbmdcbiAgICAgICAgICAgIHJlZ2V4IDogJ1wiLio/XCInXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIiwgICAgICAgICAgIC8vICcgc3RyaW5nXG4gICAgICAgICAgICByZWdleCA6IFwiJy4qPydcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLCAvLyBmbG9hdFxuICAgICAgICAgICAgcmVnZXggOiBcIlsrLV0/XFxcXGQrKD86KD86XFxcXC5cXFxcZCopPyg/OltlRV1bKy1dP1xcXFxkKyk/KT9cXFxcYlwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkXCIsIC8vIHByZS1jb21waWxlciBkaXJlY3RpdmVzXG4gICAgICAgICAgICByZWdleCA6IFwiXFxcXHMqKD86bGlicmFyeXxwYWNrYWdlfHVzZSlcXFxcYlwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDoga2V5d29yZE1hcHBlcixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJbYS16QS1aXyRdW2EtekEtWjAtOV8kXSpcXFxcYlwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiJnxcXFxcKnxcXFxcK3xcXFxcLXxcXFxcL3w8fD18PnxcXFxcfHw9PnxcXFxcKlxcXFwqfDo9fFxcXFwvPXw+PXw8PXw8PlwiIFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICAgIHRva2VuIDogXCJwdW5jdHVhdGlvbi5vcGVyYXRvclwiLFxuICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXCd8XFxcXDp8XFxcXCx8XFxcXDt8XFxcXC5cIlxuICAgICAgICB9LHtcbiAgICAgICAgICAgIHRva2VuIDogXCJwYXJlbi5scGFyZW5cIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJbWyhdXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInBhcmVuLnJwYXJlblwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIltcXFxcXSldXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInRleHRcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxccytcIlxuICAgICAgICB9IF1cblxuICAgICAgIFxuICAgIH07XG59O1xuXG5vb3AuaW5oZXJpdHMoVkhETEhpZ2hsaWdodFJ1bGVzLCBUZXh0SGlnaGxpZ2h0UnVsZXMpO1xuXG5leHBvcnRzLlZIRExIaWdobGlnaHRSdWxlcyA9IFZIRExIaWdobGlnaHRSdWxlcztcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==