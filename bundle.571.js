"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[571],{

/***/ 3719:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var BaseFoldMode = (__webpack_require__(51358).FoldMode);

var FoldMode = exports.l = function(markers) {
    this.foldingStartMarker = new RegExp("([\\[{])(?:\\s*)$|(" + markers + ")(?:\\s*)(?:#.*)?$");
};
oop.inherits(FoldMode, BaseFoldMode);

(function() {

    this.getFoldWidgetRange = function(session, foldStyle, row) {
        var line = session.getLine(row);
        var match = line.match(this.foldingStartMarker);
        if (match) {
            if (match[1])
                return this.openingBracketBlock(session, match[1], row, match.index);
            if (match[2])
                return this.indentationBlock(session, row, match.index + match[2].length);
            return this.indentationBlock(session, row);
        }
    };

}).call(FoldMode.prototype);


/***/ }),

/***/ 50571:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


  
var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var RobotHighlightRules = (__webpack_require__(37968)/* .RobotHighlightRules */ .O);
var FoldMode = (__webpack_require__(3719)/* .FoldMode */ .l);

var Mode = function() {
  this.HighlightRules = RobotHighlightRules;
  this.foldingRules = new FoldMode();
  this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, TextMode);

(function() {
  this.lineCommentStart = "#";
  this.$id = "ace/mode/robot";
  this.snippetFileId = "ace/snippets/robot";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 37968:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

var RobotHighlightRules = function() {
    var builtinConstantsRegex = new RegExp(
        /\$\{CURDIR\}|\$\{TEMPDIR\}|\$\{EXECDIR\}|\$\{\/\}|\$\{\:\}|\$\{\\n\}|\$\{true\}|\$\{false\}|\$\{none\}|\$\{null\}|\$\{space(?:\s*\*\s+[0-9]+)?\}|\$\{empty\}|&\{empty\}|@\{empty\}|\$\{TEST NAME\}|@\{TEST[\s_]TAGS\}|\$\{TEST[\s_]DOCUMENTATION\}|\$\{TEST[\s_]STATUS\}|\$\{TEST[\s_]MESSAGE\}|\$\{PREV[\s_]TEST[\s_]NAME\}|\$\{PREV[\s_]TEST[\s_]STATUS\}|\$\{PREV[\s_]TEST[\s_]MESSAGE\}|\$\{SUITE[\s_]NAME\}|\$\{SUITE[\s_]SOURCE\}|\$\{SUITE[\s_]DOCUMENTATION\}|&\{SUITE[\s_]METADATA\}|\$\{SUITE[\s_]STATUS\}|\$\{SUITE[\s_]MESSAGE\}|\$\{KEYWORD[\s_]STATUS\}|\$\{KEYWORD[\s_]MESSAGE\}|\$\{LOG[\s_]LEVEL\}|\$\{OUTPUT[\s_]FILE\}|\$\{LOG[\s_]FILE\}|\$\{REPORT[\s_]FILE\}|\$\{DEBUG[\s_]FILE\}|\$\{OUTPUT[\s_]DIR\}/
    );

    this.$rules = {
        "start" : [ {
            token: "string.robot.header",
            regex: /^\*{3}\s+(?:settings?|metadata|(?:user )?keywords?|test ?cases?|tasks?|variables?)/,
            caseInsensitive: true,
            push: [{
                token: "string.robot.header",
                regex: /$/,
                next: "pop"
            }, {
                defaultToken: "string.robot.header"
            }],
            comment: "start of a table"
        }, {
            token: "comment.robot",
            regex: /(?:^|\s{2,}|\t|\|\s{1,})(?=[^\\])#/,
            push: [{
                token: "comment.robot",
                regex: /$/,
                next: "pop"
            }, {
                defaultToken: "comment.robot"
            }]
        }, {
            token: "comment",
            regex: /^\s*\[?Documentation\]?/,
            caseInsensitive: true,
            push: [{
                token: "comment",
                regex: /^(?!\s*\.\.\.)/,
                next: "pop"
            }, {
                defaultToken: "comment"
            }]
        }, {
            token: "storage.type.method.robot",
            regex: /\[(?:Arguments|Setup|Teardown|Precondition|Postcondition|Template|Return|Timeout)\]/,
            caseInsensitive: true,
            comment: "testcase settings"
        }, {
            token: "storage.type.method.robot",
            regex: /\[Tags\]/,
            caseInsensitive: true,
            push: [{
                token: "storage.type.method.robot",
                regex: /^(?!\s*\.\.\.)/,
                next: "pop"
            }, {
                token: "comment",
                regex: /^\s*\.\.\./
            }, {
                defaultToken: "storage.type.method.robot"
            }],
            comment: "test tags"
        }, {
            token: "constant.language",
            regex: builtinConstantsRegex,
            caseInsensitive: true
        }, {
            token: "entity.name.variable.wrapper",
            regex: /[$@&%]\{\{?/,
            push: [{
                token: "entity.name.variable.wrapper",
                regex: /\}\}?(\s?=)?/,
                next: "pop"
            }, {
                include: "$self"
            }, {
                token: "entity.name.variable",
                regex: /./
            }, {
                defaultToken: "entity.name.variable"
            }]
        }, {
            token: "keyword.control.robot",
            regex: /^[^\s\t*$|]+|(?=^\|)\s+[^\s\t*$|]+/,
            push: [{
                token: "keyword.control.robot",
                regex: /(?=\s{2})|\t|$|\s+(?=\|)/,
                next: "pop"
            }, {
                defaultToken: "keyword.control.robot"
            }]
        }, {
            token: "constant.numeric.robot",
            regex: /\b[0-9]+(?:\.[0-9]+)?\b/
        }, {
            token: "keyword",
            regex: /\s{2,}(for|in range|in|end|else if|if|else|with name)(\s{2,}|$)/,
            caseInsensitive: true
        }, {
            token: "storage.type.function",
            regex: /^(?:\s{2,}\s+)[^ \t*$@&%[.|]+/,
            push: [{
                token: "storage.type.function",
                regex: /(?=\s{2})|\t|$|\s+(?=\|)/,
                next: "pop"
            }, {
                defaultToken: "storage.type.function"
            }]
        }]
    };
    this.normalizeRules();
};

RobotHighlightRules.metadata = {
  fileTypes: ['robot'],
  name: 'Robot',
  scopeName: 'source.robot'
};

oop.inherits(RobotHighlightRules, TextHighlightRules);

exports.O = RobotHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjU3MS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBYTs7QUFFYixVQUFVLG1CQUFPLENBQUMsSUFBZTtBQUNqQyxtQkFBbUIscUNBQStCOztBQUVsRCxlQUFlLFNBQWdCO0FBQy9CLGdEQUFnRDtBQUNoRDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQzs7Ozs7Ozs7QUN4Qlk7QUFDYjtBQUNBLFVBQVUsbUJBQU8sQ0FBQyxJQUFZO0FBQzlCLGVBQWUsaUNBQXNCO0FBQ3JDLDBCQUEwQix5REFBc0Q7QUFDaEYsZUFBZSw2Q0FBc0M7O0FBRXJEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQsWUFBWTs7Ozs7Ozs7QUNwQkM7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLElBQVk7QUFDOUIseUJBQXlCLHdEQUFvRDs7QUFFN0U7QUFDQTtBQUNBLGFBQWEsUUFBUSxLQUFLLFNBQVMsS0FBSyxTQUFTLEtBQUssSUFBSSxLQUFLLElBQUksS0FBSyxLQUFLLEtBQUssTUFBTSxLQUFLLE9BQU8sS0FBSyxNQUFNLEtBQUssTUFBTSxLQUFLLDBCQUEwQixLQUFLLE9BQU8sSUFBSSxPQUFPLElBQUksT0FBTyxLQUFLLFdBQVcsSUFBSSxlQUFlLEtBQUssd0JBQXdCLEtBQUssaUJBQWlCLEtBQUssa0JBQWtCLEtBQUssd0JBQXdCLEtBQUssMEJBQTBCLEtBQUssMkJBQTJCLEtBQUssZ0JBQWdCLEtBQUssa0JBQWtCLEtBQUsseUJBQXlCLElBQUksb0JBQW9CLEtBQUssa0JBQWtCLEtBQUssbUJBQW1CLEtBQUssb0JBQW9CLEtBQUsscUJBQXFCLEtBQUssZUFBZSxLQUFLLGlCQUFpQixLQUFLLGNBQWMsS0FBSyxpQkFBaUIsS0FBSyxnQkFBZ0IsS0FBSyxnQkFBZ0I7QUFDcnNCOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixFQUFFO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2I7QUFDQSxTQUFTO0FBQ1Q7QUFDQSw0QkFBNEIsR0FBRyxTQUFTLEdBQUc7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLDRCQUE0QixFQUFFO0FBQzlCO0FBQ0E7QUFDQSwwQkFBMEIsRUFBRTtBQUM1QjtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixFQUFFO0FBQ2hDO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsdUJBQXVCLEdBQUcsbURBQW1ELEdBQUc7QUFDaEY7QUFDQSxTQUFTO0FBQ1Q7QUFDQSwyQkFBMkIsR0FBRztBQUM5QjtBQUNBO0FBQ0EsOEJBQThCLEVBQUU7QUFDaEM7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLFNBQTJCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9mb2xkaW5nL3B5dGhvbmljLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvcm9ib3QuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9yb2JvdF9oaWdobGlnaHRfcnVsZXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vLi4vbGliL29vcFwiKTtcbnZhciBCYXNlRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9mb2xkX21vZGVcIikuRm9sZE1vZGU7XG5cbnZhciBGb2xkTW9kZSA9IGV4cG9ydHMuRm9sZE1vZGUgPSBmdW5jdGlvbihtYXJrZXJzKSB7XG4gICAgdGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIgPSBuZXcgUmVnRXhwKFwiKFtcXFxcW3tdKSg/OlxcXFxzKikkfChcIiArIG1hcmtlcnMgKyBcIikoPzpcXFxccyopKD86Iy4qKT8kXCIpO1xufTtcbm9vcC5pbmhlcml0cyhGb2xkTW9kZSwgQmFzZUZvbGRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0UmFuZ2UgPSBmdW5jdGlvbihzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdykge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyKTtcbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICBpZiAobWF0Y2hbMV0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMub3BlbmluZ0JyYWNrZXRCbG9jayhzZXNzaW9uLCBtYXRjaFsxXSwgcm93LCBtYXRjaC5pbmRleCk7XG4gICAgICAgICAgICBpZiAobWF0Y2hbMl0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5kZW50YXRpb25CbG9jayhzZXNzaW9uLCByb3csIG1hdGNoLmluZGV4ICsgbWF0Y2hbMl0ubGVuZ3RoKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmluZGVudGF0aW9uQmxvY2soc2Vzc2lvbiwgcm93KTtcbiAgICAgICAgfVxuICAgIH07XG5cbn0pLmNhbGwoRm9sZE1vZGUucHJvdG90eXBlKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuICBcbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0TW9kZSA9IHJlcXVpcmUoXCIuL3RleHRcIikuTW9kZTtcbnZhciBSb2JvdEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vcm9ib3RfaGlnaGxpZ2h0X3J1bGVzXCIpLlJvYm90SGlnaGxpZ2h0UnVsZXM7XG52YXIgRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9mb2xkaW5nL3B5dGhvbmljXCIpLkZvbGRNb2RlO1xuXG52YXIgTW9kZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLkhpZ2hsaWdodFJ1bGVzID0gUm9ib3RIaWdobGlnaHRSdWxlcztcbiAgdGhpcy5mb2xkaW5nUnVsZXMgPSBuZXcgRm9sZE1vZGUoKTtcbiAgdGhpcy4kYmVoYXZpb3VyID0gdGhpcy4kZGVmYXVsdEJlaGF2aW91cjtcbn07XG5vb3AuaW5oZXJpdHMoTW9kZSwgVGV4dE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG4gIHRoaXMubGluZUNvbW1lbnRTdGFydCA9IFwiI1wiO1xuICB0aGlzLiRpZCA9IFwiYWNlL21vZGUvcm9ib3RcIjtcbiAgdGhpcy5zbmlwcGV0RmlsZUlkID0gXCJhY2Uvc25pcHBldHMvcm9ib3RcIjtcbn0pLmNhbGwoTW9kZS5wcm90b3R5cGUpO1xuXG5leHBvcnRzLk1vZGUgPSBNb2RlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xuXG52YXIgUm9ib3RIaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBidWlsdGluQ29uc3RhbnRzUmVnZXggPSBuZXcgUmVnRXhwKFxuICAgICAgICAvXFwkXFx7Q1VSRElSXFx9fFxcJFxce1RFTVBESVJcXH18XFwkXFx7RVhFQ0RJUlxcfXxcXCRcXHtcXC9cXH18XFwkXFx7XFw6XFx9fFxcJFxce1xcXFxuXFx9fFxcJFxce3RydWVcXH18XFwkXFx7ZmFsc2VcXH18XFwkXFx7bm9uZVxcfXxcXCRcXHtudWxsXFx9fFxcJFxce3NwYWNlKD86XFxzKlxcKlxccytbMC05XSspP1xcfXxcXCRcXHtlbXB0eVxcfXwmXFx7ZW1wdHlcXH18QFxce2VtcHR5XFx9fFxcJFxce1RFU1QgTkFNRVxcfXxAXFx7VEVTVFtcXHNfXVRBR1NcXH18XFwkXFx7VEVTVFtcXHNfXURPQ1VNRU5UQVRJT05cXH18XFwkXFx7VEVTVFtcXHNfXVNUQVRVU1xcfXxcXCRcXHtURVNUW1xcc19dTUVTU0FHRVxcfXxcXCRcXHtQUkVWW1xcc19dVEVTVFtcXHNfXU5BTUVcXH18XFwkXFx7UFJFVltcXHNfXVRFU1RbXFxzX11TVEFUVVNcXH18XFwkXFx7UFJFVltcXHNfXVRFU1RbXFxzX11NRVNTQUdFXFx9fFxcJFxce1NVSVRFW1xcc19dTkFNRVxcfXxcXCRcXHtTVUlURVtcXHNfXVNPVVJDRVxcfXxcXCRcXHtTVUlURVtcXHNfXURPQ1VNRU5UQVRJT05cXH18Jlxce1NVSVRFW1xcc19dTUVUQURBVEFcXH18XFwkXFx7U1VJVEVbXFxzX11TVEFUVVNcXH18XFwkXFx7U1VJVEVbXFxzX11NRVNTQUdFXFx9fFxcJFxce0tFWVdPUkRbXFxzX11TVEFUVVNcXH18XFwkXFx7S0VZV09SRFtcXHNfXU1FU1NBR0VcXH18XFwkXFx7TE9HW1xcc19dTEVWRUxcXH18XFwkXFx7T1VUUFVUW1xcc19dRklMRVxcfXxcXCRcXHtMT0dbXFxzX11GSUxFXFx9fFxcJFxce1JFUE9SVFtcXHNfXUZJTEVcXH18XFwkXFx7REVCVUdbXFxzX11GSUxFXFx9fFxcJFxce09VVFBVVFtcXHNfXURJUlxcfS9cbiAgICApO1xuXG4gICAgdGhpcy4kcnVsZXMgPSB7XG4gICAgICAgIFwic3RhcnRcIiA6IFsge1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nLnJvYm90LmhlYWRlclwiLFxuICAgICAgICAgICAgcmVnZXg6IC9eXFwqezN9XFxzKyg/OnNldHRpbmdzP3xtZXRhZGF0YXwoPzp1c2VyICk/a2V5d29yZHM/fHRlc3QgP2Nhc2VzP3x0YXNrcz98dmFyaWFibGVzPykvLFxuICAgICAgICAgICAgY2FzZUluc2Vuc2l0aXZlOiB0cnVlLFxuICAgICAgICAgICAgcHVzaDogW3tcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJzdHJpbmcucm9ib3QuaGVhZGVyXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IC8kLyxcbiAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInN0cmluZy5yb2JvdC5oZWFkZXJcIlxuICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICBjb21tZW50OiBcInN0YXJ0IG9mIGEgdGFibGVcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJjb21tZW50LnJvYm90XCIsXG4gICAgICAgICAgICByZWdleDogLyg/Ol58XFxzezIsfXxcXHR8XFx8XFxzezEsfSkoPz1bXlxcXFxdKSMvLFxuICAgICAgICAgICAgcHVzaDogW3tcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJjb21tZW50LnJvYm90XCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IC8kLyxcbiAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcImNvbW1lbnQucm9ib3RcIlxuICAgICAgICAgICAgfV1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwiY29tbWVudFwiLFxuICAgICAgICAgICAgcmVnZXg6IC9eXFxzKlxcWz9Eb2N1bWVudGF0aW9uXFxdPy8sXG4gICAgICAgICAgICBjYXNlSW5zZW5zaXRpdmU6IHRydWUsXG4gICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuOiBcImNvbW1lbnRcIixcbiAgICAgICAgICAgICAgICByZWdleDogL14oPyFcXHMqXFwuXFwuXFwuKS8sXG4gICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJjb21tZW50XCJcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInN0b3JhZ2UudHlwZS5tZXRob2Qucm9ib3RcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXFxbKD86QXJndW1lbnRzfFNldHVwfFRlYXJkb3dufFByZWNvbmRpdGlvbnxQb3N0Y29uZGl0aW9ufFRlbXBsYXRlfFJldHVybnxUaW1lb3V0KVxcXS8sXG4gICAgICAgICAgICBjYXNlSW5zZW5zaXRpdmU6IHRydWUsXG4gICAgICAgICAgICBjb21tZW50OiBcInRlc3RjYXNlIHNldHRpbmdzXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwic3RvcmFnZS50eXBlLm1ldGhvZC5yb2JvdFwiLFxuICAgICAgICAgICAgcmVnZXg6IC9cXFtUYWdzXFxdLyxcbiAgICAgICAgICAgIGNhc2VJbnNlbnNpdGl2ZTogdHJ1ZSxcbiAgICAgICAgICAgIHB1c2g6IFt7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwic3RvcmFnZS50eXBlLm1ldGhvZC5yb2JvdFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvXig/IVxccypcXC5cXC5cXC4pLyxcbiAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwiY29tbWVudFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvXlxccypcXC5cXC5cXC4vXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInN0b3JhZ2UudHlwZS5tZXRob2Qucm9ib3RcIlxuICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICBjb21tZW50OiBcInRlc3QgdGFnc1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lmxhbmd1YWdlXCIsXG4gICAgICAgICAgICByZWdleDogYnVpbHRpbkNvbnN0YW50c1JlZ2V4LFxuICAgICAgICAgICAgY2FzZUluc2Vuc2l0aXZlOiB0cnVlXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcImVudGl0eS5uYW1lLnZhcmlhYmxlLndyYXBwZXJcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvWyRAJiVdXFx7XFx7Py8sXG4gICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuOiBcImVudGl0eS5uYW1lLnZhcmlhYmxlLndyYXBwZXJcIixcbiAgICAgICAgICAgICAgICByZWdleDogL1xcfVxcfT8oXFxzPz0pPy8sXG4gICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFwiJHNlbGZcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcImVudGl0eS5uYW1lLnZhcmlhYmxlXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IC8uL1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJlbnRpdHkubmFtZS52YXJpYWJsZVwiXG4gICAgICAgICAgICB9XVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJrZXl3b3JkLmNvbnRyb2wucm9ib3RcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXlteXFxzXFx0KiR8XSt8KD89XlxcfClcXHMrW15cXHNcXHQqJHxdKy8sXG4gICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuOiBcImtleXdvcmQuY29udHJvbC5yb2JvdFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvKD89XFxzezJ9KXxcXHR8JHxcXHMrKD89XFx8KS8sXG4gICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJrZXl3b3JkLmNvbnRyb2wucm9ib3RcIlxuICAgICAgICAgICAgfV1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQubnVtZXJpYy5yb2JvdFwiLFxuICAgICAgICAgICAgcmVnZXg6IC9cXGJbMC05XSsoPzpcXC5bMC05XSspP1xcYi9cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwia2V5d29yZFwiLFxuICAgICAgICAgICAgcmVnZXg6IC9cXHN7Mix9KGZvcnxpbiByYW5nZXxpbnxlbmR8ZWxzZSBpZnxpZnxlbHNlfHdpdGggbmFtZSkoXFxzezIsfXwkKS8sXG4gICAgICAgICAgICBjYXNlSW5zZW5zaXRpdmU6IHRydWVcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwic3RvcmFnZS50eXBlLmZ1bmN0aW9uXCIsXG4gICAgICAgICAgICByZWdleDogL14oPzpcXHN7Mix9XFxzKylbXiBcXHQqJEAmJVsufF0rLyxcbiAgICAgICAgICAgIHB1c2g6IFt7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwic3RvcmFnZS50eXBlLmZ1bmN0aW9uXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IC8oPz1cXHN7Mn0pfFxcdHwkfFxccysoPz1cXHwpLyxcbiAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInN0b3JhZ2UudHlwZS5mdW5jdGlvblwiXG4gICAgICAgICAgICB9XVxuICAgICAgICB9XVxuICAgIH07XG4gICAgdGhpcy5ub3JtYWxpemVSdWxlcygpO1xufTtcblxuUm9ib3RIaWdobGlnaHRSdWxlcy5tZXRhZGF0YSA9IHtcbiAgZmlsZVR5cGVzOiBbJ3JvYm90J10sXG4gIG5hbWU6ICdSb2JvdCcsXG4gIHNjb3BlTmFtZTogJ3NvdXJjZS5yb2JvdCdcbn07XG5cbm9vcC5pbmhlcml0cyhSb2JvdEhpZ2hsaWdodFJ1bGVzLCBUZXh0SGlnaGxpZ2h0UnVsZXMpO1xuXG5leHBvcnRzLlJvYm90SGlnaGxpZ2h0UnVsZXMgPSBSb2JvdEhpZ2hsaWdodFJ1bGVzO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9