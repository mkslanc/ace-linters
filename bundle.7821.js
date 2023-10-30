"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[7821],{

/***/ 76135:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var XmlBehaviour = (__webpack_require__(67809)/* .XmlBehaviour */ .D);

var HtmlBehaviour = function () {

    XmlBehaviour.call(this);

};

oop.inherits(HtmlBehaviour, XmlBehaviour);

exports.k = HtmlBehaviour;


/***/ }),

/***/ 57821:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* global define */

  

var oop = __webpack_require__(89359);
var HtmlMode = (__webpack_require__(75528).Mode);
var HandlebarsHighlightRules = (__webpack_require__(1335)/* .HandlebarsHighlightRules */ .V);
var HtmlBehaviour = (__webpack_require__(76135)/* .HtmlBehaviour */ .k);
var HtmlFoldMode = (__webpack_require__(74505)/* .FoldMode */ .Z);

var Mode = function() {
    HtmlMode.call(this);
    this.HighlightRules = HandlebarsHighlightRules;
    this.$behaviour = new HtmlBehaviour();
};

oop.inherits(Mode, HtmlMode);

(function() {
    this.blockComment = {start: "{{!--", end: "--}}"};
    this.$id = "ace/mode/handlebars";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 1335:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* global define */



var oop = __webpack_require__(89359);
var HtmlHighlightRules = (__webpack_require__(72843)/* .HtmlHighlightRules */ .V);

function pop2(currentState, stack) {
    stack.splice(0, 3);
    return stack.shift() || "start";
}
var HandlebarsHighlightRules = function() {
    HtmlHighlightRules.call(this);
    var hbs = {
        regex : "(?={{)",
        push : "handlebars"
    };
    for (var key in this.$rules) {
        this.$rules[key].unshift(hbs);
    }
    this.$rules.handlebars = [{
        token : "comment.start",
        regex : "{{!--",
        push : [{
            token : "comment.end",
            regex : "--}}",
            next : pop2
        }, {
            defaultToken : "comment"
        }]
    }, {
        token : "comment.start",
        regex : "{{!",
        push : [{
            token : "comment.end",
            regex : "}}",
            next : pop2
        }, {
            defaultToken : "comment"
        }]
    }, {
        token : "support.function", // unescaped variable
        regex : "{{{",
        push : [{
            token : "support.function",
            regex : "}}}",
            next : pop2
        }, {
            token : "variable.parameter",
            regex : "[a-zA-Z_$][a-zA-Z0-9_$]*"
        }]
    }, {
        token : "storage.type.start", // begin section
        regex : "{{[#\\^/&]?",
        push : [{
            token : "storage.type.end",
            regex : "}}",
            next : pop2
        }, {
            token : "variable.parameter",
            regex : "[a-zA-Z_$][a-zA-Z0-9_$]*"
        }]
    }];

    this.normalizeRules();
};

oop.inherits(HandlebarsHighlightRules, HtmlHighlightRules);

exports.V = HandlebarsHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjc4MjEuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLEtBQWU7QUFDakMsbUJBQW1CLGtEQUF3Qzs7QUFFM0Q7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsU0FBcUI7Ozs7Ozs7O0FDYnJCOztBQUVBLEVBQWU7O0FBRWYsVUFBVSxtQkFBTyxDQUFDLEtBQVk7QUFDOUIsZUFBZSxpQ0FBc0I7QUFDckMsK0JBQStCLDZEQUFnRTtBQUMvRixvQkFBb0IsbURBQXlDO0FBQzdELG1CQUFtQiw4Q0FBa0M7O0FBRXJEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSx5QkFBeUIsVUFBVSxnQkFBZ0I7QUFDbkQ7QUFDQSxDQUFDOztBQUVELFlBQVk7Ozs7Ozs7O0FDdkJaOztBQUVhOztBQUViLFVBQVUsbUJBQU8sQ0FBQyxLQUFZO0FBQzlCLHlCQUF5Qix3REFBb0Q7O0FBRTdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7O0FBRUw7QUFDQTs7QUFFQTs7QUFFQSxTQUFnQyIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvYmVoYXZpb3VyL2h0bWwuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9oYW5kbGViYXJzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvaGFuZGxlYmFyc19oaWdobGlnaHRfcnVsZXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vLi4vbGliL29vcFwiKTtcbnZhciBYbWxCZWhhdmlvdXIgPSByZXF1aXJlKFwiLi4vYmVoYXZpb3VyL3htbFwiKS5YbWxCZWhhdmlvdXI7XG5cbnZhciBIdG1sQmVoYXZpb3VyID0gZnVuY3Rpb24gKCkge1xuXG4gICAgWG1sQmVoYXZpb3VyLmNhbGwodGhpcyk7XG5cbn07XG5cbm9vcC5pbmhlcml0cyhIdG1sQmVoYXZpb3VyLCBYbWxCZWhhdmlvdXIpO1xuXG5leHBvcnRzLkh0bWxCZWhhdmlvdXIgPSBIdG1sQmVoYXZpb3VyO1xuIiwiLyogZ2xvYmFsIGRlZmluZSAqL1xuXG4gIFwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgSHRtbE1vZGUgPSByZXF1aXJlKFwiLi9odG1sXCIpLk1vZGU7XG52YXIgSGFuZGxlYmFyc0hpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vaGFuZGxlYmFyc19oaWdobGlnaHRfcnVsZXNcIikuSGFuZGxlYmFyc0hpZ2hsaWdodFJ1bGVzO1xudmFyIEh0bWxCZWhhdmlvdXIgPSByZXF1aXJlKFwiLi9iZWhhdmlvdXIvaHRtbFwiKS5IdG1sQmVoYXZpb3VyO1xudmFyIEh0bWxGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRpbmcvaHRtbFwiKS5Gb2xkTW9kZTtcblxudmFyIE1vZGUgPSBmdW5jdGlvbigpIHtcbiAgICBIdG1sTW9kZS5jYWxsKHRoaXMpO1xuICAgIHRoaXMuSGlnaGxpZ2h0UnVsZXMgPSBIYW5kbGViYXJzSGlnaGxpZ2h0UnVsZXM7XG4gICAgdGhpcy4kYmVoYXZpb3VyID0gbmV3IEh0bWxCZWhhdmlvdXIoKTtcbn07XG5cbm9vcC5pbmhlcml0cyhNb2RlLCBIdG1sTW9kZSk7XG5cbihmdW5jdGlvbigpIHtcbiAgICB0aGlzLmJsb2NrQ29tbWVudCA9IHtzdGFydDogXCJ7eyEtLVwiLCBlbmQ6IFwiLS19fVwifTtcbiAgICB0aGlzLiRpZCA9IFwiYWNlL21vZGUvaGFuZGxlYmFyc1wiO1xufSkuY2FsbChNb2RlLnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTW9kZSA9IE1vZGU7XG4iLCIvKiBnbG9iYWwgZGVmaW5lICovXG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgSHRtbEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vaHRtbF9oaWdobGlnaHRfcnVsZXNcIikuSHRtbEhpZ2hsaWdodFJ1bGVzO1xuXG5mdW5jdGlvbiBwb3AyKGN1cnJlbnRTdGF0ZSwgc3RhY2spIHtcbiAgICBzdGFjay5zcGxpY2UoMCwgMyk7XG4gICAgcmV0dXJuIHN0YWNrLnNoaWZ0KCkgfHwgXCJzdGFydFwiO1xufVxudmFyIEhhbmRsZWJhcnNIaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uKCkge1xuICAgIEh0bWxIaWdobGlnaHRSdWxlcy5jYWxsKHRoaXMpO1xuICAgIHZhciBoYnMgPSB7XG4gICAgICAgIHJlZ2V4IDogXCIoPz17eylcIixcbiAgICAgICAgcHVzaCA6IFwiaGFuZGxlYmFyc1wiXG4gICAgfTtcbiAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy4kcnVsZXMpIHtcbiAgICAgICAgdGhpcy4kcnVsZXNba2V5XS51bnNoaWZ0KGhicyk7XG4gICAgfVxuICAgIHRoaXMuJHJ1bGVzLmhhbmRsZWJhcnMgPSBbe1xuICAgICAgICB0b2tlbiA6IFwiY29tbWVudC5zdGFydFwiLFxuICAgICAgICByZWdleCA6IFwie3shLS1cIixcbiAgICAgICAgcHVzaCA6IFt7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudC5lbmRcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCItLX19XCIsXG4gICAgICAgICAgICBuZXh0IDogcG9wMlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBkZWZhdWx0VG9rZW4gOiBcImNvbW1lbnRcIlxuICAgICAgICB9XVxuICAgIH0sIHtcbiAgICAgICAgdG9rZW4gOiBcImNvbW1lbnQuc3RhcnRcIixcbiAgICAgICAgcmVnZXggOiBcInt7IVwiLFxuICAgICAgICBwdXNoIDogW3tcbiAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50LmVuZFwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIn19XCIsXG4gICAgICAgICAgICBuZXh0IDogcG9wMlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBkZWZhdWx0VG9rZW4gOiBcImNvbW1lbnRcIlxuICAgICAgICB9XVxuICAgIH0sIHtcbiAgICAgICAgdG9rZW4gOiBcInN1cHBvcnQuZnVuY3Rpb25cIiwgLy8gdW5lc2NhcGVkIHZhcmlhYmxlXG4gICAgICAgIHJlZ2V4IDogXCJ7e3tcIixcbiAgICAgICAgcHVzaCA6IFt7XG4gICAgICAgICAgICB0b2tlbiA6IFwic3VwcG9ydC5mdW5jdGlvblwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIn19fVwiLFxuICAgICAgICAgICAgbmV4dCA6IHBvcDJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInZhcmlhYmxlLnBhcmFtZXRlclwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIlthLXpBLVpfJF1bYS16QS1aMC05XyRdKlwiXG4gICAgICAgIH1dXG4gICAgfSwge1xuICAgICAgICB0b2tlbiA6IFwic3RvcmFnZS50eXBlLnN0YXJ0XCIsIC8vIGJlZ2luIHNlY3Rpb25cbiAgICAgICAgcmVnZXggOiBcInt7WyNcXFxcXi8mXT9cIixcbiAgICAgICAgcHVzaCA6IFt7XG4gICAgICAgICAgICB0b2tlbiA6IFwic3RvcmFnZS50eXBlLmVuZFwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIn19XCIsXG4gICAgICAgICAgICBuZXh0IDogcG9wMlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwidmFyaWFibGUucGFyYW1ldGVyXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiW2EtekEtWl8kXVthLXpBLVowLTlfJF0qXCJcbiAgICAgICAgfV1cbiAgICB9XTtcblxuICAgIHRoaXMubm9ybWFsaXplUnVsZXMoKTtcbn07XG5cbm9vcC5pbmhlcml0cyhIYW5kbGViYXJzSGlnaGxpZ2h0UnVsZXMsIEh0bWxIaWdobGlnaHRSdWxlcyk7XG5cbmV4cG9ydHMuSGFuZGxlYmFyc0hpZ2hsaWdodFJ1bGVzID0gSGFuZGxlYmFyc0hpZ2hsaWdodFJ1bGVzO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9