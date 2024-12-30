"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[2527],{

/***/ 13398:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var XmlBehaviour = (__webpack_require__(63458).XmlBehaviour);

/**@type {(new() => Partial<import("../../../ace-internal").Ace.Behaviour>)}*/
var HtmlBehaviour = function () {

    XmlBehaviour.call(this);

};

oop.inherits(HtmlBehaviour, XmlBehaviour);

exports.D = HtmlBehaviour;


/***/ }),

/***/ 52527:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* global define */

  

var oop = __webpack_require__(2645);
var HtmlMode = (__webpack_require__(32234).Mode);
var HandlebarsHighlightRules = (__webpack_require__(83628)/* .HandlebarsHighlightRules */ ._);
var HtmlBehaviour = (__webpack_require__(13398)/* .HtmlBehaviour */ .D);
var HtmlFoldMode = (__webpack_require__(6944).FoldMode);

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

/***/ 83628:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* global define */



var oop = __webpack_require__(2645);
var HtmlHighlightRules = (__webpack_require__(10413).HtmlHighlightRules);

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

exports._ = HandlebarsHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjI1MjcuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLElBQWU7QUFDakMsbUJBQW1CLHlDQUF3Qzs7QUFFM0QsVUFBVSxrRUFBa0U7QUFDNUU7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsU0FBcUI7Ozs7Ozs7O0FDZHJCOztBQUVBLEVBQWU7O0FBRWYsVUFBVSxtQkFBTyxDQUFDLElBQVk7QUFDOUIsZUFBZSxpQ0FBc0I7QUFDckMsK0JBQStCLDhEQUFnRTtBQUMvRixvQkFBb0IsbURBQXlDO0FBQzdELG1CQUFtQixvQ0FBa0M7O0FBRXJEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSx5QkFBeUIsVUFBVSxnQkFBZ0I7QUFDbkQ7QUFDQSxDQUFDOztBQUVELFlBQVk7Ozs7Ozs7O0FDdkJaOztBQUVhOztBQUViLFVBQVUsbUJBQU8sQ0FBQyxJQUFZO0FBQzlCLHlCQUF5QiwrQ0FBb0Q7O0FBRTdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7O0FBRUw7QUFDQTs7QUFFQTs7QUFFQSxTQUFnQyIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvYmVoYXZpb3VyL2h0bWwuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9oYW5kbGViYXJzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvaGFuZGxlYmFyc19oaWdobGlnaHRfcnVsZXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vLi4vbGliL29vcFwiKTtcbnZhciBYbWxCZWhhdmlvdXIgPSByZXF1aXJlKFwiLi4vYmVoYXZpb3VyL3htbFwiKS5YbWxCZWhhdmlvdXI7XG5cbi8qKkB0eXBlIHsobmV3KCkgPT4gUGFydGlhbDxpbXBvcnQoXCIuLi8uLi8uLi9hY2UtaW50ZXJuYWxcIikuQWNlLkJlaGF2aW91cj4pfSovXG52YXIgSHRtbEJlaGF2aW91ciA9IGZ1bmN0aW9uICgpIHtcblxuICAgIFhtbEJlaGF2aW91ci5jYWxsKHRoaXMpO1xuXG59O1xuXG5vb3AuaW5oZXJpdHMoSHRtbEJlaGF2aW91ciwgWG1sQmVoYXZpb3VyKTtcblxuZXhwb3J0cy5IdG1sQmVoYXZpb3VyID0gSHRtbEJlaGF2aW91cjtcbiIsIi8qIGdsb2JhbCBkZWZpbmUgKi9cblxuICBcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIEh0bWxNb2RlID0gcmVxdWlyZShcIi4vaHRtbFwiKS5Nb2RlO1xudmFyIEhhbmRsZWJhcnNIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL2hhbmRsZWJhcnNfaGlnaGxpZ2h0X3J1bGVzXCIpLkhhbmRsZWJhcnNIaWdobGlnaHRSdWxlcztcbnZhciBIdG1sQmVoYXZpb3VyID0gcmVxdWlyZShcIi4vYmVoYXZpb3VyL2h0bWxcIikuSHRtbEJlaGF2aW91cjtcbnZhciBIdG1sRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9mb2xkaW5nL2h0bWxcIikuRm9sZE1vZGU7XG5cbnZhciBNb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgSHRtbE1vZGUuY2FsbCh0aGlzKTtcbiAgICB0aGlzLkhpZ2hsaWdodFJ1bGVzID0gSGFuZGxlYmFyc0hpZ2hsaWdodFJ1bGVzO1xuICAgIHRoaXMuJGJlaGF2aW91ciA9IG5ldyBIdG1sQmVoYXZpb3VyKCk7XG59O1xuXG5vb3AuaW5oZXJpdHMoTW9kZSwgSHRtbE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5ibG9ja0NvbW1lbnQgPSB7c3RhcnQ6IFwie3shLS1cIiwgZW5kOiBcIi0tfX1cIn07XG4gICAgdGhpcy4kaWQgPSBcImFjZS9tb2RlL2hhbmRsZWJhcnNcIjtcbn0pLmNhbGwoTW9kZS5wcm90b3R5cGUpO1xuXG5leHBvcnRzLk1vZGUgPSBNb2RlO1xuIiwiLyogZ2xvYmFsIGRlZmluZSAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIEh0bWxIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL2h0bWxfaGlnaGxpZ2h0X3J1bGVzXCIpLkh0bWxIaWdobGlnaHRSdWxlcztcblxuZnVuY3Rpb24gcG9wMihjdXJyZW50U3RhdGUsIHN0YWNrKSB7XG4gICAgc3RhY2suc3BsaWNlKDAsIDMpO1xuICAgIHJldHVybiBzdGFjay5zaGlmdCgpIHx8IFwic3RhcnRcIjtcbn1cbnZhciBIYW5kbGViYXJzSGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbigpIHtcbiAgICBIdG1sSGlnaGxpZ2h0UnVsZXMuY2FsbCh0aGlzKTtcbiAgICB2YXIgaGJzID0ge1xuICAgICAgICByZWdleCA6IFwiKD89e3spXCIsXG4gICAgICAgIHB1c2ggOiBcImhhbmRsZWJhcnNcIlxuICAgIH07XG4gICAgZm9yICh2YXIga2V5IGluIHRoaXMuJHJ1bGVzKSB7XG4gICAgICAgIHRoaXMuJHJ1bGVzW2tleV0udW5zaGlmdChoYnMpO1xuICAgIH1cbiAgICB0aGlzLiRydWxlcy5oYW5kbGViYXJzID0gW3tcbiAgICAgICAgdG9rZW4gOiBcImNvbW1lbnQuc3RhcnRcIixcbiAgICAgICAgcmVnZXggOiBcInt7IS0tXCIsXG4gICAgICAgIHB1c2ggOiBbe1xuICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnQuZW5kXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiLS19fVwiLFxuICAgICAgICAgICAgbmV4dCA6IHBvcDJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgZGVmYXVsdFRva2VuIDogXCJjb21tZW50XCJcbiAgICAgICAgfV1cbiAgICB9LCB7XG4gICAgICAgIHRva2VuIDogXCJjb21tZW50LnN0YXJ0XCIsXG4gICAgICAgIHJlZ2V4IDogXCJ7eyFcIixcbiAgICAgICAgcHVzaCA6IFt7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudC5lbmRcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJ9fVwiLFxuICAgICAgICAgICAgbmV4dCA6IHBvcDJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgZGVmYXVsdFRva2VuIDogXCJjb21tZW50XCJcbiAgICAgICAgfV1cbiAgICB9LCB7XG4gICAgICAgIHRva2VuIDogXCJzdXBwb3J0LmZ1bmN0aW9uXCIsIC8vIHVuZXNjYXBlZCB2YXJpYWJsZVxuICAgICAgICByZWdleCA6IFwie3t7XCIsXG4gICAgICAgIHB1c2ggOiBbe1xuICAgICAgICAgICAgdG9rZW4gOiBcInN1cHBvcnQuZnVuY3Rpb25cIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJ9fX1cIixcbiAgICAgICAgICAgIG5leHQgOiBwb3AyXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJ2YXJpYWJsZS5wYXJhbWV0ZXJcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJbYS16QS1aXyRdW2EtekEtWjAtOV8kXSpcIlxuICAgICAgICB9XVxuICAgIH0sIHtcbiAgICAgICAgdG9rZW4gOiBcInN0b3JhZ2UudHlwZS5zdGFydFwiLCAvLyBiZWdpbiBzZWN0aW9uXG4gICAgICAgIHJlZ2V4IDogXCJ7e1sjXFxcXF4vJl0/XCIsXG4gICAgICAgIHB1c2ggOiBbe1xuICAgICAgICAgICAgdG9rZW4gOiBcInN0b3JhZ2UudHlwZS5lbmRcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJ9fVwiLFxuICAgICAgICAgICAgbmV4dCA6IHBvcDJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInZhcmlhYmxlLnBhcmFtZXRlclwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIlthLXpBLVpfJF1bYS16QS1aMC05XyRdKlwiXG4gICAgICAgIH1dXG4gICAgfV07XG5cbiAgICB0aGlzLm5vcm1hbGl6ZVJ1bGVzKCk7XG59O1xuXG5vb3AuaW5oZXJpdHMoSGFuZGxlYmFyc0hpZ2hsaWdodFJ1bGVzLCBIdG1sSGlnaGxpZ2h0UnVsZXMpO1xuXG5leHBvcnRzLkhhbmRsZWJhcnNIaWdobGlnaHRSdWxlcyA9IEhhbmRsZWJhcnNIaWdobGlnaHRSdWxlcztcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==