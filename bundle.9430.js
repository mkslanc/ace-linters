"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[9430],{

/***/ 39430:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
// defines the parent mode
var HtmlMode = (__webpack_require__(32234).Mode);
var MatchingBraceOutdent = (__webpack_require__(28670).MatchingBraceOutdent);
var HtmlFoldMode = (__webpack_require__(6944).FoldMode);

// defines the language specific highlighters and folding rules
var CurlyHighlightRules = (__webpack_require__(19857)/* .CurlyHighlightRules */ .z);

var Mode = function() {
    HtmlMode.call(this);
    this.HighlightRules = CurlyHighlightRules;
    this.$outdent = new MatchingBraceOutdent();
    this.foldingRules = new HtmlFoldMode();
};
oop.inherits(Mode, HtmlMode);

(function() {
    this.$id = "ace/mode/curly";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 19857:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var HtmlHighlightRules = (__webpack_require__(10413).HtmlHighlightRules);


var CurlyHighlightRules = function() {
    HtmlHighlightRules.call(this);

    this.$rules["start"].unshift({
        token: "variable",
        regex: "{{",
        push: "curly-start"
    });

    this.$rules["curly-start"] = [{
        token: "variable",
        regex: "}}",
        next: "pop"
    }];

    this.normalizeRules();
};

oop.inherits(CurlyHighlightRules, HtmlHighlightRules);

exports.z = CurlyHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjk0MzAuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLElBQVk7QUFDOUI7QUFDQSxlQUFlLGlDQUFzQjtBQUNyQywyQkFBMkIsaURBQXdEO0FBQ25GLG1CQUFtQixvQ0FBa0M7O0FBRXJEO0FBQ0EsMEJBQTBCLHlEQUFzRDs7QUFFaEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQsWUFBWTs7Ozs7Ozs7QUN2QkM7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLElBQVk7QUFDOUIseUJBQXlCLCtDQUFvRDs7O0FBRzdFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTs7QUFFQSxTQUEyQiIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvY3VybHkuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9jdXJseV9oaWdobGlnaHRfcnVsZXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbi8vIGRlZmluZXMgdGhlIHBhcmVudCBtb2RlXG52YXIgSHRtbE1vZGUgPSByZXF1aXJlKFwiLi9odG1sXCIpLk1vZGU7XG52YXIgTWF0Y2hpbmdCcmFjZU91dGRlbnQgPSByZXF1aXJlKFwiLi9tYXRjaGluZ19icmFjZV9vdXRkZW50XCIpLk1hdGNoaW5nQnJhY2VPdXRkZW50O1xudmFyIEh0bWxGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRpbmcvaHRtbFwiKS5Gb2xkTW9kZTtcblxuLy8gZGVmaW5lcyB0aGUgbGFuZ3VhZ2Ugc3BlY2lmaWMgaGlnaGxpZ2h0ZXJzIGFuZCBmb2xkaW5nIHJ1bGVzXG52YXIgQ3VybHlIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL2N1cmx5X2hpZ2hsaWdodF9ydWxlc1wiKS5DdXJseUhpZ2hsaWdodFJ1bGVzO1xuXG52YXIgTW9kZSA9IGZ1bmN0aW9uKCkge1xuICAgIEh0bWxNb2RlLmNhbGwodGhpcyk7XG4gICAgdGhpcy5IaWdobGlnaHRSdWxlcyA9IEN1cmx5SGlnaGxpZ2h0UnVsZXM7XG4gICAgdGhpcy4kb3V0ZGVudCA9IG5ldyBNYXRjaGluZ0JyYWNlT3V0ZGVudCgpO1xuICAgIHRoaXMuZm9sZGluZ1J1bGVzID0gbmV3IEh0bWxGb2xkTW9kZSgpO1xufTtcbm9vcC5pbmhlcml0cyhNb2RlLCBIdG1sTW9kZSk7XG5cbihmdW5jdGlvbigpIHtcbiAgICB0aGlzLiRpZCA9IFwiYWNlL21vZGUvY3VybHlcIjtcbn0pLmNhbGwoTW9kZS5wcm90b3R5cGUpO1xuXG5leHBvcnRzLk1vZGUgPSBNb2RlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBIdG1sSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9odG1sX2hpZ2hsaWdodF9ydWxlc1wiKS5IdG1sSGlnaGxpZ2h0UnVsZXM7XG5cblxudmFyIEN1cmx5SGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbigpIHtcbiAgICBIdG1sSGlnaGxpZ2h0UnVsZXMuY2FsbCh0aGlzKTtcblxuICAgIHRoaXMuJHJ1bGVzW1wic3RhcnRcIl0udW5zaGlmdCh7XG4gICAgICAgIHRva2VuOiBcInZhcmlhYmxlXCIsXG4gICAgICAgIHJlZ2V4OiBcInt7XCIsXG4gICAgICAgIHB1c2g6IFwiY3VybHktc3RhcnRcIlxuICAgIH0pO1xuXG4gICAgdGhpcy4kcnVsZXNbXCJjdXJseS1zdGFydFwiXSA9IFt7XG4gICAgICAgIHRva2VuOiBcInZhcmlhYmxlXCIsXG4gICAgICAgIHJlZ2V4OiBcIn19XCIsXG4gICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICB9XTtcblxuICAgIHRoaXMubm9ybWFsaXplUnVsZXMoKTtcbn07XG5cbm9vcC5pbmhlcml0cyhDdXJseUhpZ2hsaWdodFJ1bGVzLCBIdG1sSGlnaGxpZ2h0UnVsZXMpO1xuXG5leHBvcnRzLkN1cmx5SGlnaGxpZ2h0UnVsZXMgPSBDdXJseUhpZ2hsaWdodFJ1bGVzO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9