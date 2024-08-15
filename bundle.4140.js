"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[4140],{

/***/ 34140:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var FlixHighlightRules = (__webpack_require__(48335)/* .FlixHighlightRules */ .p);

var Mode = function() {
    this.HighlightRules = FlixHighlightRules;
};
oop.inherits(Mode, TextMode);

(function() {
    this.$id = "ace/mode/flix";
}).call(Mode.prototype);

exports.Mode = Mode;

/***/ }),

/***/ 48335:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

var FlixHighlightRules = function() {
    
    var keywords = (
        "use|checked_cast|checked_ecast|unchecked_cast|masked_cast|as|discard|from|" +
        "into|inject|project|solve|query|where|select|force|import|region|red|deref"
    );
    var controlKeywords = (
        "choose|debug|do|for|forA|forM|foreach|yield|if|else|case|" +
        "match|typematch|try|catch|resume|spawn|par|branch|jumpto"
    );
    var operators = "not|and|or|fix";
    var declarations = "eff|def|law|enum|case|type|alias|class|instance|mod|let";
    var modifiers = "with|without|opaque|lazy|lawful|pub|override|sealed|static";
    var primitives = "Unit|Bool|Char|Float32|Float64|Int8|Int16|Int32|Int64|BigInt|String";

    var keywordMapper = this.createKeywordMapper({
        "keyword": keywords,
        "keyword.control": controlKeywords,
        "keyword.operator": operators,
        "storage.type": declarations,
        "storage.modifier": modifiers,
        "support.type": primitives
    }, "identifier");

    this.$rules = {
        "start" : [
            {
                token : "comment.line",
                regex : "\\/\\/.*$"
            }, {
                token : "comment.block",
                regex : "\\/\\*",
                next : "comment"
            }, {
                token : "string",
                regex : '"',
                next : "string"
            }, {
                token : "string.regexp",
                regex : 'regex"',
                next : "regex"
            }, {
                token : "constant.character",
                regex : "'",
                next : "char"
            }, {
                token : "constant.numeric", // hex
                regex : "0x[a-fA-F0-9](_*[a-fA-F0-9])*(i8|i16|i32|i64|ii)?\\b"
            }, {
                token : "constant.numeric", // float
                regex : "[0-9](_*[0-9])*\\.[0-9](_*[0-9])*(f32|f64)?\\b"
            }, {
                token : "constant.numeric", // integer
                regex : "[0-9](_*[0-9])*(i8|i16|i32|i64|ii)?\\b"
            }, {
                token : "constant.language.boolean",
                regex : "(true|false)\\b"
            }, {
                token : "constant.language",
                regex : "null\\b"
            }, {
                token : "keyword.operator",
                regex : "\\->|~>|<\\-|=>"
            }, {
                token : "storage.modifier",
                regex : "@(Deprecated|Experimental|Internal|ParallelWhenPure|Parallel|LazyWhenPure|Lazy|Skip|Test)\\b"
            }, {
                token : "keyword", // hole
                regex : "(\\?\\?\\?|\\?[a-zA-Z0-9]+)"
            }, {
                token : keywordMapper,
                regex : "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
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
                token : "comment.block",
                regex : "\\*\\/",
                next : "start"
            }, {
                defaultToken : "comment.block"
            }
        ],
        "string" : [
            {
                token : "constant.character.escape", // unicode
                regex : "\\\\(u[0-9a-fA-F]{4})"
            }, {
                token : "constant.character.escape",
                regex : '\\\\.'
            }, {
                token : "string",
                regex : '"',
                next : "start"
            }, {
                token : "string",
                regex : '[^"\\\\]+'
            }
        ],
        "regex" : [
            {
                token : "constant.character.escape", // unicode
                regex : "\\\\(u[0-9a-fA-F]{4})"
            }, {
                token : "constant.character.escape",
                regex : '\\\\.'
            }, {
                token : "string.regexp",
                regex : '"',
                next : "start"
            }, {
                token : "string.regexp",
                regex : '[^"\\\\]+'
            }
        ],
        "char" : [
            {
                token : "constant.character.escape", // unicode
                regex : "\\\\(u[0-9a-fA-F]{4})"
            }, {
                token : "constant.character.escape",
                regex : '\\\\.'
            }, {
                token : "constant.character",
                regex : "'",
                next : "start"
            }, {
                token : "constant.character",
                regex : "[^'\\\\]+"
            }
        ]
    };

};

oop.inherits(FlixHighlightRules, TextHighlightRules);

exports.p = FlixHighlightRules;

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjQxNDAuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLElBQVk7QUFDOUIsZUFBZSxpQ0FBc0I7QUFDckMseUJBQXlCLHdEQUFvRDs7QUFFN0U7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQsWUFBWTs7Ozs7OztBQ2ZDOztBQUViLFVBQVUsbUJBQU8sQ0FBQyxJQUFZO0FBQzlCLHlCQUF5Qix3REFBb0Q7O0FBRTdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsNkJBQTZCO0FBQzdCLGFBQWE7QUFDYjtBQUNBLCtCQUErQjtBQUMvQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxFQUFFO0FBQzdDLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxFQUFFO0FBQzdDLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxFQUFFO0FBQzdDLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLFNBQTBCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9mbGl4LmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvZmxpeF9oaWdobGlnaHRfcnVsZXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0TW9kZSA9IHJlcXVpcmUoXCIuL3RleHRcIikuTW9kZTtcbnZhciBGbGl4SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9mbGl4X2hpZ2hsaWdodF9ydWxlc1wiKS5GbGl4SGlnaGxpZ2h0UnVsZXM7XG5cbnZhciBNb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5IaWdobGlnaHRSdWxlcyA9IEZsaXhIaWdobGlnaHRSdWxlcztcbn07XG5vb3AuaW5oZXJpdHMoTW9kZSwgVGV4dE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgdGhpcy4kaWQgPSBcImFjZS9tb2RlL2ZsaXhcIjtcbn0pLmNhbGwoTW9kZS5wcm90b3R5cGUpO1xuXG5leHBvcnRzLk1vZGUgPSBNb2RlOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xuXG52YXIgRmxpeEhpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24oKSB7XG4gICAgXG4gICAgdmFyIGtleXdvcmRzID0gKFxuICAgICAgICBcInVzZXxjaGVja2VkX2Nhc3R8Y2hlY2tlZF9lY2FzdHx1bmNoZWNrZWRfY2FzdHxtYXNrZWRfY2FzdHxhc3xkaXNjYXJkfGZyb218XCIgK1xuICAgICAgICBcImludG98aW5qZWN0fHByb2plY3R8c29sdmV8cXVlcnl8d2hlcmV8c2VsZWN0fGZvcmNlfGltcG9ydHxyZWdpb258cmVkfGRlcmVmXCJcbiAgICApO1xuICAgIHZhciBjb250cm9sS2V5d29yZHMgPSAoXG4gICAgICAgIFwiY2hvb3NlfGRlYnVnfGRvfGZvcnxmb3JBfGZvck18Zm9yZWFjaHx5aWVsZHxpZnxlbHNlfGNhc2V8XCIgK1xuICAgICAgICBcIm1hdGNofHR5cGVtYXRjaHx0cnl8Y2F0Y2h8cmVzdW1lfHNwYXdufHBhcnxicmFuY2h8anVtcHRvXCJcbiAgICApO1xuICAgIHZhciBvcGVyYXRvcnMgPSBcIm5vdHxhbmR8b3J8Zml4XCI7XG4gICAgdmFyIGRlY2xhcmF0aW9ucyA9IFwiZWZmfGRlZnxsYXd8ZW51bXxjYXNlfHR5cGV8YWxpYXN8Y2xhc3N8aW5zdGFuY2V8bW9kfGxldFwiO1xuICAgIHZhciBtb2RpZmllcnMgPSBcIndpdGh8d2l0aG91dHxvcGFxdWV8bGF6eXxsYXdmdWx8cHVifG92ZXJyaWRlfHNlYWxlZHxzdGF0aWNcIjtcbiAgICB2YXIgcHJpbWl0aXZlcyA9IFwiVW5pdHxCb29sfENoYXJ8RmxvYXQzMnxGbG9hdDY0fEludDh8SW50MTZ8SW50MzJ8SW50NjR8QmlnSW50fFN0cmluZ1wiO1xuXG4gICAgdmFyIGtleXdvcmRNYXBwZXIgPSB0aGlzLmNyZWF0ZUtleXdvcmRNYXBwZXIoe1xuICAgICAgICBcImtleXdvcmRcIjoga2V5d29yZHMsXG4gICAgICAgIFwia2V5d29yZC5jb250cm9sXCI6IGNvbnRyb2xLZXl3b3JkcyxcbiAgICAgICAgXCJrZXl3b3JkLm9wZXJhdG9yXCI6IG9wZXJhdG9ycyxcbiAgICAgICAgXCJzdG9yYWdlLnR5cGVcIjogZGVjbGFyYXRpb25zLFxuICAgICAgICBcInN0b3JhZ2UubW9kaWZpZXJcIjogbW9kaWZpZXJzLFxuICAgICAgICBcInN1cHBvcnQudHlwZVwiOiBwcmltaXRpdmVzXG4gICAgfSwgXCJpZGVudGlmaWVyXCIpO1xuXG4gICAgdGhpcy4kcnVsZXMgPSB7XG4gICAgICAgIFwic3RhcnRcIiA6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudC5saW5lXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwvXFxcXC8uKiRcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50LmJsb2NrXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwvXFxcXCpcIixcbiAgICAgICAgICAgICAgICBuZXh0IDogXCJjb21tZW50XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAnXCInLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcInN0cmluZ1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZy5yZWdleHBcIixcbiAgICAgICAgICAgICAgICByZWdleCA6ICdyZWdleFwiJyxcbiAgICAgICAgICAgICAgICBuZXh0IDogXCJyZWdleFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50LmNoYXJhY3RlclwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCInXCIsXG4gICAgICAgICAgICAgICAgbmV4dCA6IFwiY2hhclwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIiwgLy8gaGV4XG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIjB4W2EtZkEtRjAtOV0oXypbYS1mQS1GMC05XSkqKGk4fGkxNnxpMzJ8aTY0fGlpKT9cXFxcYlwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIiwgLy8gZmxvYXRcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiWzAtOV0oXypbMC05XSkqXFxcXC5bMC05XShfKlswLTldKSooZjMyfGY2NCk/XFxcXGJcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5udW1lcmljXCIsIC8vIGludGVnZXJcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiWzAtOV0oXypbMC05XSkqKGk4fGkxNnxpMzJ8aTY0fGlpKT9cXFxcYlwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lmxhbmd1YWdlLmJvb2xlYW5cIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiKHRydWV8ZmFsc2UpXFxcXGJcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5sYW5ndWFnZVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJudWxsXFxcXGJcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwtPnx+Pnw8XFxcXC18PT5cIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdG9yYWdlLm1vZGlmaWVyXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIkAoRGVwcmVjYXRlZHxFeHBlcmltZW50YWx8SW50ZXJuYWx8UGFyYWxsZWxXaGVuUHVyZXxQYXJhbGxlbHxMYXp5V2hlblB1cmV8TGF6eXxTa2lwfFRlc3QpXFxcXGJcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkXCIsIC8vIGhvbGVcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiKFxcXFw/XFxcXD9cXFxcP3xcXFxcP1thLXpBLVowLTldKylcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDoga2V5d29yZE1hcHBlcixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiW2EtekEtWl8kXVthLXpBLVowLTlfJF0qXFxcXGJcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJwYXJlbi5scGFyZW5cIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiW1soe11cIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJwYXJlbi5ycGFyZW5cIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiW1xcXFxdKX1dXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxccytcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBcImNvbW1lbnRcIiA6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudC5ibG9ja1wiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcKlxcXFwvXCIsXG4gICAgICAgICAgICAgICAgbmV4dCA6IFwic3RhcnRcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbiA6IFwiY29tbWVudC5ibG9ja1wiXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIFwic3RyaW5nXCIgOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50LmNoYXJhY3Rlci5lc2NhcGVcIiwgLy8gdW5pY29kZVxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcXFxcXCh1WzAtOWEtZkEtRl17NH0pXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQuY2hhcmFjdGVyLmVzY2FwZVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogJ1xcXFxcXFxcLidcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAnXCInLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcInN0YXJ0XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAnW15cIlxcXFxcXFxcXSsnXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIFwicmVnZXhcIiA6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQuY2hhcmFjdGVyLmVzY2FwZVwiLCAvLyB1bmljb2RlXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFxcXFxcKHVbMC05YS1mQS1GXXs0fSlcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5jaGFyYWN0ZXIuZXNjYXBlXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAnXFxcXFxcXFwuJ1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmcucmVnZXhwXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAnXCInLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcInN0YXJ0XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nLnJlZ2V4cFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogJ1teXCJcXFxcXFxcXF0rJ1xuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBcImNoYXJcIiA6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQuY2hhcmFjdGVyLmVzY2FwZVwiLCAvLyB1bmljb2RlXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFxcXFxcKHVbMC05YS1mQS1GXXs0fSlcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5jaGFyYWN0ZXIuZXNjYXBlXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAnXFxcXFxcXFwuJ1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5jaGFyYWN0ZXJcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiJ1wiLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcInN0YXJ0XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQuY2hhcmFjdGVyXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlteJ1xcXFxcXFxcXStcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfTtcblxufTtcblxub29wLmluaGVyaXRzKEZsaXhIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuZXhwb3J0cy5GbGl4SGlnaGxpZ2h0UnVsZXMgPSBGbGl4SGlnaGxpZ2h0UnVsZXM7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9