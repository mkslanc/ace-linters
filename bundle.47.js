"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[47],{

/***/ 20047:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var TextMode = (__webpack_require__(98030).Mode);
var HighlightRules = (__webpack_require__(31802)/* .DiffHighlightRules */ .w);
var FoldMode = (__webpack_require__(97528)/* .FoldMode */ .Z);

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

/***/ 31802:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var TextHighlightRules = (__webpack_require__(28053)/* .TextHighlightRules */ .K);

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

exports.w = DiffHighlightRules;


/***/ }),

/***/ 97528:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var BaseFoldMode = (__webpack_require__(15369).FoldMode);
var Range = (__webpack_require__(59082)/* .Range */ .e);

var FoldMode = exports.Z = function(levels, flag) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjQ3LmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFhOztBQUViLFVBQVUsbUJBQU8sQ0FBQyxLQUFZO0FBQzlCLGVBQWUsaUNBQXNCO0FBQ3JDLHFCQUFxQix3REFBb0Q7QUFDekUsZUFBZSw4Q0FBa0M7O0FBRWpEO0FBQ0E7QUFDQSxzREFBc0QsRUFBRTtBQUN4RDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVELFlBQVk7Ozs7Ozs7O0FDbkJDOztBQUViLFVBQVUsbUJBQU8sQ0FBQyxLQUFZO0FBQzlCLHlCQUF5Qix3REFBb0Q7O0FBRTdFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZ0NBQWdDLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxLQUFLLEVBQUU7QUFDckQ7QUFDQTtBQUNBLGFBQWEsSUFBSTtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsSUFBSTtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYiw4QkFBOEIsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxJQUFJO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsSUFBSTtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsU0FBMEI7Ozs7Ozs7O0FDM0ViOztBQUViLFVBQVUsbUJBQU8sQ0FBQyxLQUFlO0FBQ2pDLG1CQUFtQixxQ0FBK0I7QUFDbEQsWUFBWSwyQ0FBNEI7O0FBRXhDLGVBQWUsU0FBZ0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7O0FBRXJCO0FBQ0Esd0JBQXdCLHFCQUFxQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTs7QUFFQSwwQ0FBMEMsV0FBVztBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2RpZmYuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9kaWZmX2hpZ2hsaWdodF9ydWxlcy5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2ZvbGRpbmcvZGlmZi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRNb2RlID0gcmVxdWlyZShcIi4vdGV4dFwiKS5Nb2RlO1xudmFyIEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vZGlmZl9oaWdobGlnaHRfcnVsZXNcIikuRGlmZkhpZ2hsaWdodFJ1bGVzO1xudmFyIEZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZGluZy9kaWZmXCIpLkZvbGRNb2RlO1xuXG52YXIgTW9kZSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuSGlnaGxpZ2h0UnVsZXMgPSBIaWdobGlnaHRSdWxlcztcbiAgICB0aGlzLmZvbGRpbmdSdWxlcyA9IG5ldyBGb2xkTW9kZShbXCJkaWZmXCIsIFwiQEB8XFxcXCp7NX1cIl0sIFwiaVwiKTtcbn07XG5vb3AuaW5oZXJpdHMoTW9kZSwgVGV4dE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG5cbiAgICB0aGlzLiRpZCA9IFwiYWNlL21vZGUvZGlmZlwiO1xuICAgIHRoaXMuc25pcHBldEZpbGVJZCA9IFwiYWNlL3NuaXBwZXRzL2RpZmZcIjtcbn0pLmNhbGwoTW9kZS5wcm90b3R5cGUpO1xuXG5leHBvcnRzLk1vZGUgPSBNb2RlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90ZXh0X2hpZ2hsaWdodF9ydWxlc1wiKS5UZXh0SGlnaGxpZ2h0UnVsZXM7XG5cbnZhciBEaWZmSGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbigpIHtcbiAgICAvLyByZWdleHAgbXVzdCBub3QgaGF2ZSBjYXB0dXJpbmcgcGFyZW50aGVzZXMuIFVzZSAoPzopIGluc3RlYWQuXG4gICAgLy8gcmVnZXhwcyBhcmUgb3JkZXJlZCAtPiB0aGUgZmlyc3QgbWF0Y2ggaXMgdXNlZFxuXG4gICAgdGhpcy4kcnVsZXMgPSB7XG4gICAgICAgIFwic3RhcnRcIiA6IFt7XG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiXig/OlxcXFwqezE1fXw9ezY3fXwtezN9fFxcXFwrezN9KSRcIixcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnNlcGFyYXRvci5kaWZmXCIsXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwia2V5d29yZFwiXG4gICAgICAgICAgICB9LCB7IC8vZGlmZi5yYW5nZS51bmlmaWVkXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiXihAQCkoXFxcXHMqLis/XFxcXHMqKShAQCkoLiopJFwiLFxuICAgICAgICAgICAgICAgIHRva2VuOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiY29uc3RhbnRcIixcbiAgICAgICAgICAgICAgICAgICAgXCJjb25zdGFudC5udW1lcmljXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiY29uc3RhbnRcIixcbiAgICAgICAgICAgICAgICAgICAgXCJjb21tZW50LmRvYy50YWdcIlxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sIHsgLy9kaWZmLnJhbmdlLm5vcm1hbFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIl4oXFxcXGQrKShbLFxcXFxkXSspKGF8ZHxjKShcXFxcZCspKFssXFxcXGRdKykoLiopJFwiLFxuICAgICAgICAgICAgICAgIHRva2VuOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiY29uc3RhbnQubnVtZXJpY1wiLFxuICAgICAgICAgICAgICAgICAgICBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24ucmFuZ2UuZGlmZlwiLFxuICAgICAgICAgICAgICAgICAgICBcImNvbnN0YW50LmZ1bmN0aW9uXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiY29uc3RhbnQubnVtZXJpY1wiLFxuICAgICAgICAgICAgICAgICAgICBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24ucmFuZ2UuZGlmZlwiLFxuICAgICAgICAgICAgICAgICAgICBcImludmFsaWRcIlxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwibWV0YS5cIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIl4oXFxcXC17M318XFxcXCt7M318XFxcXCp7M30pKCAuKykkXCIsXG4gICAgICAgICAgICAgICAgdG9rZW46IFtcbiAgICAgICAgICAgICAgICAgICAgXCJjb25zdGFudC5udW1lcmljXCIsXG4gICAgICAgICAgICAgICAgICAgIFwibWV0YS50YWdcIlxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sIHsgLy8gYWRkZWRcbiAgICAgICAgICAgICAgICByZWdleDogXCJeKFshKz5dKSguKj8pKFxcXFxzKikkXCIsXG4gICAgICAgICAgICAgICAgdG9rZW46IFtcbiAgICAgICAgICAgICAgICAgICAgXCJzdXBwb3J0LmNvbnN0YW50XCIsXG4gICAgICAgICAgICAgICAgICAgIFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBcImludmFsaWRcIlxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sIHsgLy8gcmVtb3ZlZFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIl4oWzxcXFxcLV0pKC4qPykoXFxcXHMqKSRcIixcbiAgICAgICAgICAgICAgICB0b2tlbjogW1xuICAgICAgICAgICAgICAgICAgICBcInN1cHBvcnQuZnVuY3Rpb25cIixcbiAgICAgICAgICAgICAgICAgICAgXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgXCJpbnZhbGlkXCJcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiXihkaWZmKShcXFxccystLVxcXFx3Kyk/KC4rPykoIC4rKT8kXCIsXG4gICAgICAgICAgICAgICAgdG9rZW46IFtcInZhcmlhYmxlXCIsIFwidmFyaWFibGVcIiwgXCJrZXl3b3JkXCIsIFwidmFyaWFibGVcIl1cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICByZWdleDogXCJeSW5kZXguKyRcIixcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJ2YXJpYWJsZVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiXlxcXFxzKyRcIixcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJ0ZXh0XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICByZWdleDogXCJcXFxccyokXCIsXG4gICAgICAgICAgICAgICAgdG9rZW46IFwiaW52YWxpZFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcImludmlzaWJsZVwiLFxuICAgICAgICAgICAgICAgIGNhc2VJbnNlbnNpdGl2ZTogdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfTtcbn07XG5cbm9vcC5pbmhlcml0cyhEaWZmSGlnaGxpZ2h0UnVsZXMsIFRleHRIaWdobGlnaHRSdWxlcyk7XG5cbmV4cG9ydHMuRGlmZkhpZ2hsaWdodFJ1bGVzID0gRGlmZkhpZ2hsaWdodFJ1bGVzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vLi4vbGliL29vcFwiKTtcbnZhciBCYXNlRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9mb2xkX21vZGVcIikuRm9sZE1vZGU7XG52YXIgUmFuZ2UgPSByZXF1aXJlKFwiLi4vLi4vcmFuZ2VcIikuUmFuZ2U7XG5cbnZhciBGb2xkTW9kZSA9IGV4cG9ydHMuRm9sZE1vZGUgPSBmdW5jdGlvbihsZXZlbHMsIGZsYWcpIHtcblx0dGhpcy5yZWdFeHBMaXN0ID0gbGV2ZWxzO1xuXHR0aGlzLmZsYWcgPSBmbGFnO1xuXHR0aGlzLmZvbGRpbmdTdGFydE1hcmtlciA9IFJlZ0V4cChcIl4oXCIgKyBsZXZlbHMuam9pbihcInxcIikgKyBcIilcIiwgdGhpcy5mbGFnKTtcbn07XG5vb3AuaW5oZXJpdHMoRm9sZE1vZGUsIEJhc2VGb2xkTW9kZSk7XG5cbihmdW5jdGlvbigpIHtcbiAgICB0aGlzLmdldEZvbGRXaWRnZXRSYW5nZSA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgIHZhciBzdGFydCA9IHtyb3c6IHJvdywgY29sdW1uOiBsaW5lLmxlbmd0aH07XG5cbiAgICAgICAgdmFyIHJlZ0xpc3QgPSB0aGlzLnJlZ0V4cExpc3Q7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDw9IHJlZ0xpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciByZSA9IFJlZ0V4cChcIl4oXCIgKyByZWdMaXN0LnNsaWNlKDAsIGkpLmpvaW4oXCJ8XCIpICsgXCIpXCIsIHRoaXMuZmxhZyk7XG4gICAgICAgICAgICBpZiAocmUudGVzdChsaW5lKSlcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIGwgPSBzZXNzaW9uLmdldExlbmd0aCgpOyArK3JvdyA8IGw7ICkge1xuICAgICAgICAgICAgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICAgICAgaWYgKHJlLnRlc3QobGluZSkpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJvdyA9PSBzdGFydC5yb3cgKyAxKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICByZXR1cm4gbmV3IFJhbmdlKHN0YXJ0LnJvdywgc3RhcnQuY29sdW1uLCByb3cgLSAxLCBsaW5lLmxlbmd0aCk7XG4gICAgfTtcblxufSkuY2FsbChGb2xkTW9kZS5wcm90b3R5cGUpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9