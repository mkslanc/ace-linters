"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[6104],{

/***/ 56104:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var HighlightRules = (__webpack_require__(62867)/* .DiffHighlightRules */ .l);
var FoldMode = (__webpack_require__(55606)/* .FoldMode */ .l);

var Mode = function() {
    this.HighlightRules = HighlightRules;
    this.foldingRules = new FoldMode(["diff", "@@|\\*{5}"], "i");
};
oop.inherits(Mode, TextMode);

(function() {

    this.$id = "ace/mode/diff";
    this.snippetFileId = "ace/snippets/diff";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 62867:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

var DiffHighlightRules = function() {
    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used

    this.$rules = {
        "start" : [{
                regex: "^(?:\\*{15}|={67}|-{3}|\\+{3})$",
                token: "punctuation.definition.separator.diff",
                "name": "keyword"
            }, { //diff.range.unified
                regex: "^(@@)(\\s*.+?\\s*)(@@)(.*)$",
                token: [
                    "constant",
                    "constant.numeric",
                    "constant",
                    "comment.doc.tag"
                ]
            }, { //diff.range.normal
                regex: "^(\\d+)([,\\d]+)(a|d|c)(\\d+)([,\\d]+)(.*)$",
                token: [
                    "constant.numeric",
                    "punctuation.definition.range.diff",
                    "constant.function",
                    "constant.numeric",
                    "punctuation.definition.range.diff",
                    "invalid"
                ],
                "name": "meta."
            }, {
                regex: "^(\\-{3}|\\+{3}|\\*{3})( .+)$",
                token: [
                    "constant.numeric",
                    "meta.tag"
                ]
            }, { // added
                regex: "^([!+>])(.*?)(\\s*)$",
                token: [
                    "support.constant",
                    "text",
                    "invalid"
                ]
            }, { // removed
                regex: "^([<\\-])(.*?)(\\s*)$",
                token: [
                    "support.function",
                    "string",
                    "invalid"
                ]
            }, {
                regex: "^(diff)(\\s+--\\w+)?(.+?)( .+)?$",
                token: ["variable", "variable", "keyword", "variable"]
            }, {
                regex: "^Index.+$",
                token: "variable"
            }, {
                regex: "^\\s+$",
                token: "text"
            }, {
                regex: "\\s*$",
                token: "invalid"
            }, {
                defaultToken: "invisible",
                caseInsensitive: true
            }
        ]
    };
};

oop.inherits(DiffHighlightRules, TextHighlightRules);

exports.l = DiffHighlightRules;


/***/ }),

/***/ 55606:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var BaseFoldMode = (__webpack_require__(51358).FoldMode);
var Range = (__webpack_require__(91902)/* .Range */ .Q);

var FoldMode = exports.l = function(levels, flag) {
	this.regExpList = levels;
	this.flag = flag;
	this.foldingStartMarker = RegExp("^(" + levels.join("|") + ")", this.flag);
};
oop.inherits(FoldMode, BaseFoldMode);

(function() {
    this.getFoldWidgetRange = function(session, foldStyle, row) {
        var line = session.getLine(row);
        var start = {row: row, column: line.length};

        var regList = this.regExpList;
        for (var i = 1; i <= regList.length; i++) {
            var re = RegExp("^(" + regList.slice(0, i).join("|") + ")", this.flag);
            if (re.test(line))
                break;
        }

        for (var l = session.getLength(); ++row < l; ) {
            line = session.getLine(row);
            if (re.test(line))
                break;
        }
        if (row == start.row + 1)
            return;
        return new Range(start.row, start.column, row - 1, line.length);
    };

}).call(FoldMode.prototype);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjYxMDQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLElBQVk7QUFDOUIsZUFBZSxpQ0FBc0I7QUFDckMscUJBQXFCLHdEQUFvRDtBQUN6RSxlQUFlLDhDQUFrQzs7QUFFakQ7QUFDQTtBQUNBLHNEQUFzRCxFQUFFO0FBQ3hEO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQsWUFBWTs7Ozs7Ozs7QUNuQkM7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLElBQVk7QUFDOUIseUJBQXlCLHdEQUFvRDs7QUFFN0U7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxnQ0FBZ0MsR0FBRyxHQUFHLEdBQUcsR0FBRyxFQUFFLEtBQUssRUFBRTtBQUNyRDtBQUNBO0FBQ0EsYUFBYSxJQUFJO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxJQUFJO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLDhCQUE4QixFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUU7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLElBQUk7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxJQUFJO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxTQUEwQjs7Ozs7Ozs7QUMzRWI7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLElBQWU7QUFDakMsbUJBQW1CLHFDQUErQjtBQUNsRCxZQUFZLDJDQUE0Qjs7QUFFeEMsZUFBZSxTQUFnQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjs7QUFFckI7QUFDQSx3QkFBd0IscUJBQXFCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDBDQUEwQyxXQUFXO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvZGlmZi5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2RpZmZfaGlnaGxpZ2h0X3J1bGVzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvZm9sZGluZy9kaWZmLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dE1vZGUgPSByZXF1aXJlKFwiLi90ZXh0XCIpLk1vZGU7XG52YXIgSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9kaWZmX2hpZ2hsaWdodF9ydWxlc1wiKS5EaWZmSGlnaGxpZ2h0UnVsZXM7XG52YXIgRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9mb2xkaW5nL2RpZmZcIikuRm9sZE1vZGU7XG5cbnZhciBNb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5IaWdobGlnaHRSdWxlcyA9IEhpZ2hsaWdodFJ1bGVzO1xuICAgIHRoaXMuZm9sZGluZ1J1bGVzID0gbmV3IEZvbGRNb2RlKFtcImRpZmZcIiwgXCJAQHxcXFxcKns1fVwiXSwgXCJpXCIpO1xufTtcbm9vcC5pbmhlcml0cyhNb2RlLCBUZXh0TW9kZSk7XG5cbihmdW5jdGlvbigpIHtcblxuICAgIHRoaXMuJGlkID0gXCJhY2UvbW9kZS9kaWZmXCI7XG4gICAgdGhpcy5zbmlwcGV0RmlsZUlkID0gXCJhY2Uvc25pcHBldHMvZGlmZlwiO1xufSkuY2FsbChNb2RlLnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTW9kZSA9IE1vZGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcblxudmFyIERpZmZIaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uKCkge1xuICAgIC8vIHJlZ2V4cCBtdXN0IG5vdCBoYXZlIGNhcHR1cmluZyBwYXJlbnRoZXNlcy4gVXNlICg/OikgaW5zdGVhZC5cbiAgICAvLyByZWdleHBzIGFyZSBvcmRlcmVkIC0+IHRoZSBmaXJzdCBtYXRjaCBpcyB1c2VkXG5cbiAgICB0aGlzLiRydWxlcyA9IHtcbiAgICAgICAgXCJzdGFydFwiIDogW3tcbiAgICAgICAgICAgICAgICByZWdleDogXCJeKD86XFxcXCp7MTV9fD17Njd9fC17M318XFxcXCt7M30pJFwiLFxuICAgICAgICAgICAgICAgIHRva2VuOiBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24uc2VwYXJhdG9yLmRpZmZcIixcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJrZXl3b3JkXCJcbiAgICAgICAgICAgIH0sIHsgLy9kaWZmLnJhbmdlLnVuaWZpZWRcbiAgICAgICAgICAgICAgICByZWdleDogXCJeKEBAKShcXFxccyouKz9cXFxccyopKEBAKSguKikkXCIsXG4gICAgICAgICAgICAgICAgdG9rZW46IFtcbiAgICAgICAgICAgICAgICAgICAgXCJjb25zdGFudFwiLFxuICAgICAgICAgICAgICAgICAgICBcImNvbnN0YW50Lm51bWVyaWNcIixcbiAgICAgICAgICAgICAgICAgICAgXCJjb25zdGFudFwiLFxuICAgICAgICAgICAgICAgICAgICBcImNvbW1lbnQuZG9jLnRhZ1wiXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSwgeyAvL2RpZmYucmFuZ2Uubm9ybWFsXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiXihcXFxcZCspKFssXFxcXGRdKykoYXxkfGMpKFxcXFxkKykoWyxcXFxcZF0rKSguKikkXCIsXG4gICAgICAgICAgICAgICAgdG9rZW46IFtcbiAgICAgICAgICAgICAgICAgICAgXCJjb25zdGFudC5udW1lcmljXCIsXG4gICAgICAgICAgICAgICAgICAgIFwicHVuY3R1YXRpb24uZGVmaW5pdGlvbi5yYW5nZS5kaWZmXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiY29uc3RhbnQuZnVuY3Rpb25cIixcbiAgICAgICAgICAgICAgICAgICAgXCJjb25zdGFudC5udW1lcmljXCIsXG4gICAgICAgICAgICAgICAgICAgIFwicHVuY3R1YXRpb24uZGVmaW5pdGlvbi5yYW5nZS5kaWZmXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiaW52YWxpZFwiXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJtZXRhLlwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiXihcXFxcLXszfXxcXFxcK3szfXxcXFxcKnszfSkoIC4rKSRcIixcbiAgICAgICAgICAgICAgICB0b2tlbjogW1xuICAgICAgICAgICAgICAgICAgICBcImNvbnN0YW50Lm51bWVyaWNcIixcbiAgICAgICAgICAgICAgICAgICAgXCJtZXRhLnRhZ1wiXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSwgeyAvLyBhZGRlZFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIl4oWyErPl0pKC4qPykoXFxcXHMqKSRcIixcbiAgICAgICAgICAgICAgICB0b2tlbjogW1xuICAgICAgICAgICAgICAgICAgICBcInN1cHBvcnQuY29uc3RhbnRcIixcbiAgICAgICAgICAgICAgICAgICAgXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIFwiaW52YWxpZFwiXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSwgeyAvLyByZW1vdmVkXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiXihbPFxcXFwtXSkoLio/KShcXFxccyopJFwiLFxuICAgICAgICAgICAgICAgIHRva2VuOiBbXG4gICAgICAgICAgICAgICAgICAgIFwic3VwcG9ydC5mdW5jdGlvblwiLFxuICAgICAgICAgICAgICAgICAgICBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICBcImludmFsaWRcIlxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICByZWdleDogXCJeKGRpZmYpKFxcXFxzKy0tXFxcXHcrKT8oLis/KSggLispPyRcIixcbiAgICAgICAgICAgICAgICB0b2tlbjogW1widmFyaWFibGVcIiwgXCJ2YXJpYWJsZVwiLCBcImtleXdvcmRcIiwgXCJ2YXJpYWJsZVwiXVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIl5JbmRleC4rJFwiLFxuICAgICAgICAgICAgICAgIHRva2VuOiBcInZhcmlhYmxlXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICByZWdleDogXCJeXFxcXHMrJFwiLFxuICAgICAgICAgICAgICAgIHRva2VuOiBcInRleHRcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFxzKiRcIixcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJpbnZhbGlkXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwiaW52aXNpYmxlXCIsXG4gICAgICAgICAgICAgICAgY2FzZUluc2Vuc2l0aXZlOiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9O1xufTtcblxub29wLmluaGVyaXRzKERpZmZIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuZXhwb3J0cy5EaWZmSGlnaGxpZ2h0UnVsZXMgPSBEaWZmSGlnaGxpZ2h0UnVsZXM7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi8uLi9saWIvb29wXCIpO1xudmFyIEJhc2VGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRfbW9kZVwiKS5Gb2xkTW9kZTtcbnZhciBSYW5nZSA9IHJlcXVpcmUoXCIuLi8uLi9yYW5nZVwiKS5SYW5nZTtcblxudmFyIEZvbGRNb2RlID0gZXhwb3J0cy5Gb2xkTW9kZSA9IGZ1bmN0aW9uKGxldmVscywgZmxhZykge1xuXHR0aGlzLnJlZ0V4cExpc3QgPSBsZXZlbHM7XG5cdHRoaXMuZmxhZyA9IGZsYWc7XG5cdHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyID0gUmVnRXhwKFwiXihcIiArIGxldmVscy5qb2luKFwifFwiKSArIFwiKVwiLCB0aGlzLmZsYWcpO1xufTtcbm9vcC5pbmhlcml0cyhGb2xkTW9kZSwgQmFzZUZvbGRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuZ2V0Rm9sZFdpZGdldFJhbmdlID0gZnVuY3Rpb24oc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgdmFyIHN0YXJ0ID0ge3Jvdzogcm93LCBjb2x1bW46IGxpbmUubGVuZ3RofTtcblxuICAgICAgICB2YXIgcmVnTGlzdCA9IHRoaXMucmVnRXhwTGlzdDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPD0gcmVnTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHJlID0gUmVnRXhwKFwiXihcIiArIHJlZ0xpc3Quc2xpY2UoMCwgaSkuam9pbihcInxcIikgKyBcIilcIiwgdGhpcy5mbGFnKTtcbiAgICAgICAgICAgIGlmIChyZS50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgbCA9IHNlc3Npb24uZ2V0TGVuZ3RoKCk7ICsrcm93IDwgbDsgKSB7XG4gICAgICAgICAgICBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgICAgICBpZiAocmUudGVzdChsaW5lKSlcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAocm93ID09IHN0YXJ0LnJvdyArIDEpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHJldHVybiBuZXcgUmFuZ2Uoc3RhcnQucm93LCBzdGFydC5jb2x1bW4sIHJvdyAtIDEsIGxpbmUubGVuZ3RoKTtcbiAgICB9O1xuXG59KS5jYWxsKEZvbGRNb2RlLnByb3RvdHlwZSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=