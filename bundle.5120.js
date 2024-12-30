"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[5120],{

/***/ 15120:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var HtmlMode = (__webpack_require__(32234).Mode);
var AstroHighlightRules = (__webpack_require__(86699)/* .AstroHighlightRules */ .z);
var HtmlBehaviour = (__webpack_require__(13398)/* .HtmlBehaviour */ .D);

var Mode = function() {
  HtmlMode.call(this);
  this.HighlightRules = AstroHighlightRules;
  this.$behaviour = new HtmlBehaviour();
};

oop.inherits(Mode, HtmlMode);

(function() {
  this.$id = "ace/mode/astro";
}).call(Mode.prototype);

exports.Mode = Mode;

/***/ }),

/***/ 86699:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var HtmlHighlightRules = (__webpack_require__(10413).HtmlHighlightRules);
var JavascriptHighlightRules =
  (__webpack_require__(15903).JavaScriptHighlightRules);

var AstroHighlightRules = function () {
  HtmlHighlightRules.call(this);

  var astro = {
    token: "paren.quasi.start",
    regex: /{/,
    next: function (state, stack) {
      if (state !== "start") {
        if (state.indexOf("attribute-equals") !== -1) {
          stack.splice(0);
          stack.unshift("tag_stuff");
        } else {
          stack.unshift(state);
        }
      }
      return "inline-js-start";
    }
  };

  for (var key in this.$rules) {
    if (
      key.startsWith("js") ||
      key.startsWith("css") ||
      key.startsWith("comment")
    )
      continue;
    this.$rules[key].unshift(astro);
  }

  this.$rules.start.unshift({
    token: "comment",
    regex: /^---$/,
    onMatch: function (value, state, stack) {
      stack.splice(0);
      return this.token;
    },
    next: "javascript-start"
  });

  this.embedRules(JavascriptHighlightRules, "javascript-", [
    {
      regex: /^---$/,
      token: "comment",
      next: "start",
      onMatch: function (value, state, stack) {
        stack.splice(0);
        return this.token;
      }
    }
  ]);

  this.embedRules(JavascriptHighlightRules, "inline-js-");

  var astroRules = [
    {
      regex: /}/,
      token: "paren.quasi.end",
      onMatch: function (value, state, stack) {
        if (stack[0] === "inline-js-start") {
          stack.shift();
          this.next = stack.shift();
          if (this.next.indexOf("string") !== -1) 
            return "paren.quasi.end";
          return "paren.rparen";
        } else {
          this.next = stack.shift() || "start";
          return this.token;
        }
      }
    },
    {
      regex: /{/,
      token: "paren.lparen",
      push: "inline-js-start"
    }
  ];

  this.$rules["inline-js-start"].unshift(astroRules);
  this.$rules["inline-js-no_regex"].unshift(astroRules);


  function overwriteJSXendRule(prefix) {
    for (var index in this.$rules[prefix + "jsxAttributes"]) {
      if (
        this.$rules[prefix + "jsxAttributes"][index].token ===
        "meta.tag.punctuation.tag-close.xml"
      ) {
        this.$rules[prefix + "jsxAttributes"][index].onMatch = function (
          value,
          currentState,
          stack
        ) {
          if (currentState == stack[0]) stack.shift();
          if (value.length == 2) {
            if (stack[0] == this.nextState) stack[1]--;
            if (!stack[1] || stack[1] < 0) {
              stack.splice(0, 2);
            }
          }
          this.next = stack[0] || prefix + "start";
          return [{ type: this.token, value: value }];
        };
        break;
      }
    }
  }

  overwriteJSXendRule.call(this, "javascript-");
  overwriteJSXendRule.call(this, "inline-js-");

  this.normalizeRules();
};

oop.inherits(AstroHighlightRules, HtmlHighlightRules);
exports.z = AstroHighlightRules;

/***/ }),

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


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjUxMjAuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLElBQVk7QUFDOUIsZUFBZSxpQ0FBc0I7QUFDckMsMEJBQTBCLHlEQUFzRDtBQUNoRixvQkFBb0IsbURBQXlDOztBQUU3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVELFlBQVk7Ozs7Ozs7QUNuQkM7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLElBQVk7QUFDOUIseUJBQXlCLCtDQUFvRDtBQUM3RTtBQUNBLEVBQUUscURBQWdFOztBQUVsRTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsZ0NBQWdDO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsU0FBMkI7Ozs7Ozs7QUN6SGQ7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLElBQWU7QUFDakMsbUJBQW1CLHlDQUF3Qzs7QUFFM0QsVUFBVSxrRUFBa0U7QUFDNUU7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsU0FBcUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2FzdHJvLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvYXN0cm9faGlnaGxpZ2h0X3J1bGVzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvYmVoYXZpb3VyL2h0bWwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBIdG1sTW9kZSA9IHJlcXVpcmUoXCIuL2h0bWxcIikuTW9kZTtcbnZhciBBc3Ryb0hpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vYXN0cm9faGlnaGxpZ2h0X3J1bGVzXCIpLkFzdHJvSGlnaGxpZ2h0UnVsZXM7XG52YXIgSHRtbEJlaGF2aW91ciA9IHJlcXVpcmUoXCIuL2JlaGF2aW91ci9odG1sXCIpLkh0bWxCZWhhdmlvdXI7XG5cbnZhciBNb2RlID0gZnVuY3Rpb24oKSB7XG4gIEh0bWxNb2RlLmNhbGwodGhpcyk7XG4gIHRoaXMuSGlnaGxpZ2h0UnVsZXMgPSBBc3Ryb0hpZ2hsaWdodFJ1bGVzO1xuICB0aGlzLiRiZWhhdmlvdXIgPSBuZXcgSHRtbEJlaGF2aW91cigpO1xufTtcblxub29wLmluaGVyaXRzKE1vZGUsIEh0bWxNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuICB0aGlzLiRpZCA9IFwiYWNlL21vZGUvYXN0cm9cIjtcbn0pLmNhbGwoTW9kZS5wcm90b3R5cGUpO1xuXG5leHBvcnRzLk1vZGUgPSBNb2RlOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgSHRtbEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vaHRtbF9oaWdobGlnaHRfcnVsZXNcIikuSHRtbEhpZ2hsaWdodFJ1bGVzO1xudmFyIEphdmFzY3JpcHRIaWdobGlnaHRSdWxlcyA9XG4gIHJlcXVpcmUoXCIuL2phdmFzY3JpcHRfaGlnaGxpZ2h0X3J1bGVzXCIpLkphdmFTY3JpcHRIaWdobGlnaHRSdWxlcztcblxudmFyIEFzdHJvSGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbiAoKSB7XG4gIEh0bWxIaWdobGlnaHRSdWxlcy5jYWxsKHRoaXMpO1xuXG4gIHZhciBhc3RybyA9IHtcbiAgICB0b2tlbjogXCJwYXJlbi5xdWFzaS5zdGFydFwiLFxuICAgIHJlZ2V4OiAvey8sXG4gICAgbmV4dDogZnVuY3Rpb24gKHN0YXRlLCBzdGFjaykge1xuICAgICAgaWYgKHN0YXRlICE9PSBcInN0YXJ0XCIpIHtcbiAgICAgICAgaWYgKHN0YXRlLmluZGV4T2YoXCJhdHRyaWJ1dGUtZXF1YWxzXCIpICE9PSAtMSkge1xuICAgICAgICAgIHN0YWNrLnNwbGljZSgwKTtcbiAgICAgICAgICBzdGFjay51bnNoaWZ0KFwidGFnX3N0dWZmXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN0YWNrLnVuc2hpZnQoc3RhdGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gXCJpbmxpbmUtanMtc3RhcnRcIjtcbiAgICB9XG4gIH07XG5cbiAgZm9yICh2YXIga2V5IGluIHRoaXMuJHJ1bGVzKSB7XG4gICAgaWYgKFxuICAgICAga2V5LnN0YXJ0c1dpdGgoXCJqc1wiKSB8fFxuICAgICAga2V5LnN0YXJ0c1dpdGgoXCJjc3NcIikgfHxcbiAgICAgIGtleS5zdGFydHNXaXRoKFwiY29tbWVudFwiKVxuICAgIClcbiAgICAgIGNvbnRpbnVlO1xuICAgIHRoaXMuJHJ1bGVzW2tleV0udW5zaGlmdChhc3Rybyk7XG4gIH1cblxuICB0aGlzLiRydWxlcy5zdGFydC51bnNoaWZ0KHtcbiAgICB0b2tlbjogXCJjb21tZW50XCIsXG4gICAgcmVnZXg6IC9eLS0tJC8sXG4gICAgb25NYXRjaDogZnVuY3Rpb24gKHZhbHVlLCBzdGF0ZSwgc3RhY2spIHtcbiAgICAgIHN0YWNrLnNwbGljZSgwKTtcbiAgICAgIHJldHVybiB0aGlzLnRva2VuO1xuICAgIH0sXG4gICAgbmV4dDogXCJqYXZhc2NyaXB0LXN0YXJ0XCJcbiAgfSk7XG5cbiAgdGhpcy5lbWJlZFJ1bGVzKEphdmFzY3JpcHRIaWdobGlnaHRSdWxlcywgXCJqYXZhc2NyaXB0LVwiLCBbXG4gICAge1xuICAgICAgcmVnZXg6IC9eLS0tJC8sXG4gICAgICB0b2tlbjogXCJjb21tZW50XCIsXG4gICAgICBuZXh0OiBcInN0YXJ0XCIsXG4gICAgICBvbk1hdGNoOiBmdW5jdGlvbiAodmFsdWUsIHN0YXRlLCBzdGFjaykge1xuICAgICAgICBzdGFjay5zcGxpY2UoMCk7XG4gICAgICAgIHJldHVybiB0aGlzLnRva2VuO1xuICAgICAgfVxuICAgIH1cbiAgXSk7XG5cbiAgdGhpcy5lbWJlZFJ1bGVzKEphdmFzY3JpcHRIaWdobGlnaHRSdWxlcywgXCJpbmxpbmUtanMtXCIpO1xuXG4gIHZhciBhc3Ryb1J1bGVzID0gW1xuICAgIHtcbiAgICAgIHJlZ2V4OiAvfS8sXG4gICAgICB0b2tlbjogXCJwYXJlbi5xdWFzaS5lbmRcIixcbiAgICAgIG9uTWF0Y2g6IGZ1bmN0aW9uICh2YWx1ZSwgc3RhdGUsIHN0YWNrKSB7XG4gICAgICAgIGlmIChzdGFja1swXSA9PT0gXCJpbmxpbmUtanMtc3RhcnRcIikge1xuICAgICAgICAgIHN0YWNrLnNoaWZ0KCk7XG4gICAgICAgICAgdGhpcy5uZXh0ID0gc3RhY2suc2hpZnQoKTtcbiAgICAgICAgICBpZiAodGhpcy5uZXh0LmluZGV4T2YoXCJzdHJpbmdcIikgIT09IC0xKSBcbiAgICAgICAgICAgIHJldHVybiBcInBhcmVuLnF1YXNpLmVuZFwiO1xuICAgICAgICAgIHJldHVybiBcInBhcmVuLnJwYXJlblwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMubmV4dCA9IHN0YWNrLnNoaWZ0KCkgfHwgXCJzdGFydFwiO1xuICAgICAgICAgIHJldHVybiB0aGlzLnRva2VuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICByZWdleDogL3svLFxuICAgICAgdG9rZW46IFwicGFyZW4ubHBhcmVuXCIsXG4gICAgICBwdXNoOiBcImlubGluZS1qcy1zdGFydFwiXG4gICAgfVxuICBdO1xuXG4gIHRoaXMuJHJ1bGVzW1wiaW5saW5lLWpzLXN0YXJ0XCJdLnVuc2hpZnQoYXN0cm9SdWxlcyk7XG4gIHRoaXMuJHJ1bGVzW1wiaW5saW5lLWpzLW5vX3JlZ2V4XCJdLnVuc2hpZnQoYXN0cm9SdWxlcyk7XG5cblxuICBmdW5jdGlvbiBvdmVyd3JpdGVKU1hlbmRSdWxlKHByZWZpeCkge1xuICAgIGZvciAodmFyIGluZGV4IGluIHRoaXMuJHJ1bGVzW3ByZWZpeCArIFwianN4QXR0cmlidXRlc1wiXSkge1xuICAgICAgaWYgKFxuICAgICAgICB0aGlzLiRydWxlc1twcmVmaXggKyBcImpzeEF0dHJpYnV0ZXNcIl1baW5kZXhdLnRva2VuID09PVxuICAgICAgICBcIm1ldGEudGFnLnB1bmN0dWF0aW9uLnRhZy1jbG9zZS54bWxcIlxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuJHJ1bGVzW3ByZWZpeCArIFwianN4QXR0cmlidXRlc1wiXVtpbmRleF0ub25NYXRjaCA9IGZ1bmN0aW9uIChcbiAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICBjdXJyZW50U3RhdGUsXG4gICAgICAgICAgc3RhY2tcbiAgICAgICAgKSB7XG4gICAgICAgICAgaWYgKGN1cnJlbnRTdGF0ZSA9PSBzdGFja1swXSkgc3RhY2suc2hpZnQoKTtcbiAgICAgICAgICBpZiAodmFsdWUubGVuZ3RoID09IDIpIHtcbiAgICAgICAgICAgIGlmIChzdGFja1swXSA9PSB0aGlzLm5leHRTdGF0ZSkgc3RhY2tbMV0tLTtcbiAgICAgICAgICAgIGlmICghc3RhY2tbMV0gfHwgc3RhY2tbMV0gPCAwKSB7XG4gICAgICAgICAgICAgIHN0YWNrLnNwbGljZSgwLCAyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5uZXh0ID0gc3RhY2tbMF0gfHwgcHJlZml4ICsgXCJzdGFydFwiO1xuICAgICAgICAgIHJldHVybiBbeyB0eXBlOiB0aGlzLnRva2VuLCB2YWx1ZTogdmFsdWUgfV07XG4gICAgICAgIH07XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG92ZXJ3cml0ZUpTWGVuZFJ1bGUuY2FsbCh0aGlzLCBcImphdmFzY3JpcHQtXCIpO1xuICBvdmVyd3JpdGVKU1hlbmRSdWxlLmNhbGwodGhpcywgXCJpbmxpbmUtanMtXCIpO1xuXG4gIHRoaXMubm9ybWFsaXplUnVsZXMoKTtcbn07XG5cbm9vcC5pbmhlcml0cyhBc3Ryb0hpZ2hsaWdodFJ1bGVzLCBIdG1sSGlnaGxpZ2h0UnVsZXMpO1xuZXhwb3J0cy5Bc3Ryb0hpZ2hsaWdodFJ1bGVzID0gQXN0cm9IaWdobGlnaHRSdWxlczsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi8uLi9saWIvb29wXCIpO1xudmFyIFhtbEJlaGF2aW91ciA9IHJlcXVpcmUoXCIuLi9iZWhhdmlvdXIveG1sXCIpLlhtbEJlaGF2aW91cjtcblxuLyoqQHR5cGUgeyhuZXcoKSA9PiBQYXJ0aWFsPGltcG9ydChcIi4uLy4uLy4uL2FjZS1pbnRlcm5hbFwiKS5BY2UuQmVoYXZpb3VyPil9Ki9cbnZhciBIdG1sQmVoYXZpb3VyID0gZnVuY3Rpb24gKCkge1xuXG4gICAgWG1sQmVoYXZpb3VyLmNhbGwodGhpcyk7XG5cbn07XG5cbm9vcC5pbmhlcml0cyhIdG1sQmVoYXZpb3VyLCBYbWxCZWhhdmlvdXIpO1xuXG5leHBvcnRzLkh0bWxCZWhhdmlvdXIgPSBIdG1sQmVoYXZpb3VyO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9