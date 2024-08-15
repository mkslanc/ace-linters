"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[4186],{

/***/ 64186:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var CuttlefishHighlightRules = (__webpack_require__(21277)/* .CuttlefishHighlightRules */ .h);

var Mode = function() {
    this.HighlightRules = CuttlefishHighlightRules;
    this.foldingRules = null;
    this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, TextMode);

(function() {
    this.lineCommentStart = "#";
    this.blockComment = null;
    this.$id = "ace/mode/cuttlefish";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 21277:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);


var CuttlefishHighlightRules = function () {
    this.$rules = {
        start: [{
            token: ['text', 'comment'],
            regex: /^([ \t]*)(#.*)$/
        }, {
            token: ['text', 'keyword', 'text', 'string', 'text', 'comment'],
            regex: /^([ \t]*)(include)([ \t]*)([A-Za-z0-9-\_\.\*\/]+)([ \t]*)(#.*)?$/
        }, {
            token: ['text', 'keyword', 'text', 'operator', 'text', 'string', 'text', 'comment'],
            regex: /^([ \t]*)([A-Za-z0-9-_]+(?:\.[A-Za-z0-9-_]+)*)([ \t]*)(=)([ \t]*)([^ \t#][^#]*?)([ \t]*)(#.*)?$/
        }, {
            defaultToken: 'invalid'
        }]
    };

    this.normalizeRules();
};

CuttlefishHighlightRules.metaData = {
    fileTypes: ['conf'],
    keyEquivalent: '^~C',
    name: 'Cuttlefish',
    scopeName: 'source.conf'
};


oop.inherits(CuttlefishHighlightRules, TextHighlightRules);

exports.h = CuttlefishHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjQxODYuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLElBQVk7QUFDOUIsZUFBZSxpQ0FBc0I7QUFDckMsK0JBQStCLDhEQUFnRTs7QUFFL0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCxZQUFZOzs7Ozs7OztBQ25CQzs7QUFFYixVQUFVLG1CQUFPLENBQUMsSUFBWTtBQUM5Qix5QkFBeUIsd0RBQW9EOzs7QUFHN0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBLFNBQWdDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9jdXR0bGVmaXNoLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvY3V0dGxlZmlzaF9oaWdobGlnaHRfcnVsZXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0TW9kZSA9IHJlcXVpcmUoXCIuL3RleHRcIikuTW9kZTtcbnZhciBDdXR0bGVmaXNoSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9jdXR0bGVmaXNoX2hpZ2hsaWdodF9ydWxlc1wiKS5DdXR0bGVmaXNoSGlnaGxpZ2h0UnVsZXM7XG5cbnZhciBNb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5IaWdobGlnaHRSdWxlcyA9IEN1dHRsZWZpc2hIaWdobGlnaHRSdWxlcztcbiAgICB0aGlzLmZvbGRpbmdSdWxlcyA9IG51bGw7XG4gICAgdGhpcy4kYmVoYXZpb3VyID0gdGhpcy4kZGVmYXVsdEJlaGF2aW91cjtcbn07XG5vb3AuaW5oZXJpdHMoTW9kZSwgVGV4dE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5saW5lQ29tbWVudFN0YXJ0ID0gXCIjXCI7XG4gICAgdGhpcy5ibG9ja0NvbW1lbnQgPSBudWxsO1xuICAgIHRoaXMuJGlkID0gXCJhY2UvbW9kZS9jdXR0bGVmaXNoXCI7XG59KS5jYWxsKE1vZGUucHJvdG90eXBlKTtcblxuZXhwb3J0cy5Nb2RlID0gTW9kZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xuXG5cbnZhciBDdXR0bGVmaXNoSGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy4kcnVsZXMgPSB7XG4gICAgICAgIHN0YXJ0OiBbe1xuICAgICAgICAgICAgdG9rZW46IFsndGV4dCcsICdjb21tZW50J10sXG4gICAgICAgICAgICByZWdleDogL14oWyBcXHRdKikoIy4qKSQvXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBbJ3RleHQnLCAna2V5d29yZCcsICd0ZXh0JywgJ3N0cmluZycsICd0ZXh0JywgJ2NvbW1lbnQnXSxcbiAgICAgICAgICAgIHJlZ2V4OiAvXihbIFxcdF0qKShpbmNsdWRlKShbIFxcdF0qKShbQS1aYS16MC05LVxcX1xcLlxcKlxcL10rKShbIFxcdF0qKSgjLiopPyQvXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBbJ3RleHQnLCAna2V5d29yZCcsICd0ZXh0JywgJ29wZXJhdG9yJywgJ3RleHQnLCAnc3RyaW5nJywgJ3RleHQnLCAnY29tbWVudCddLFxuICAgICAgICAgICAgcmVnZXg6IC9eKFsgXFx0XSopKFtBLVphLXowLTktX10rKD86XFwuW0EtWmEtejAtOS1fXSspKikoWyBcXHRdKikoPSkoWyBcXHRdKikoW14gXFx0I11bXiNdKj8pKFsgXFx0XSopKCMuKik/JC9cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgZGVmYXVsdFRva2VuOiAnaW52YWxpZCdcbiAgICAgICAgfV1cbiAgICB9O1xuXG4gICAgdGhpcy5ub3JtYWxpemVSdWxlcygpO1xufTtcblxuQ3V0dGxlZmlzaEhpZ2hsaWdodFJ1bGVzLm1ldGFEYXRhID0ge1xuICAgIGZpbGVUeXBlczogWydjb25mJ10sXG4gICAga2V5RXF1aXZhbGVudDogJ15+QycsXG4gICAgbmFtZTogJ0N1dHRsZWZpc2gnLFxuICAgIHNjb3BlTmFtZTogJ3NvdXJjZS5jb25mJ1xufTtcblxuXG5vb3AuaW5oZXJpdHMoQ3V0dGxlZmlzaEhpZ2hsaWdodFJ1bGVzLCBUZXh0SGlnaGxpZ2h0UnVsZXMpO1xuXG5leHBvcnRzLkN1dHRsZWZpc2hIaWdobGlnaHRSdWxlcyA9IEN1dHRsZWZpc2hIaWdobGlnaHRSdWxlcztcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==