"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[9793],{

/***/ 74958:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var BaseFoldMode = (__webpack_require__(15369).FoldMode);

var FoldMode = exports.Z = function(markers) {
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

/***/ 29793:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


  
var oop = __webpack_require__(89359);
var TextMode = (__webpack_require__(98030).Mode);
var RobotHighlightRules = (__webpack_require__(26090)/* .RobotHighlightRules */ .B);
var FoldMode = (__webpack_require__(74958)/* .FoldMode */ .Z);

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

/***/ 26090:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var TextHighlightRules = (__webpack_require__(28053)/* .TextHighlightRules */ .K);

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

exports.B = RobotHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjk3OTMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLEtBQWU7QUFDakMsbUJBQW1CLHFDQUErQjs7QUFFbEQsZUFBZSxTQUFnQjtBQUMvQixnREFBZ0Q7QUFDaEQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUM7Ozs7Ozs7O0FDeEJZO0FBQ2I7QUFDQSxVQUFVLG1CQUFPLENBQUMsS0FBWTtBQUM5QixlQUFlLGlDQUFzQjtBQUNyQywwQkFBMEIseURBQXNEO0FBQ2hGLGVBQWUsOENBQXNDOztBQUVyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVELFlBQVk7Ozs7Ozs7O0FDcEJDOztBQUViLFVBQVUsbUJBQU8sQ0FBQyxLQUFZO0FBQzlCLHlCQUF5Qix3REFBb0Q7O0FBRTdFO0FBQ0E7QUFDQSxhQUFhLFFBQVEsS0FBSyxTQUFTLEtBQUssU0FBUyxLQUFLLElBQUksS0FBSyxJQUFJLEtBQUssS0FBSyxLQUFLLE1BQU0sS0FBSyxPQUFPLEtBQUssTUFBTSxLQUFLLE1BQU0sS0FBSywwQkFBMEIsS0FBSyxPQUFPLElBQUksT0FBTyxJQUFJLE9BQU8sS0FBSyxXQUFXLElBQUksZUFBZSxLQUFLLHdCQUF3QixLQUFLLGlCQUFpQixLQUFLLGtCQUFrQixLQUFLLHdCQUF3QixLQUFLLDBCQUEwQixLQUFLLDJCQUEyQixLQUFLLGdCQUFnQixLQUFLLGtCQUFrQixLQUFLLHlCQUF5QixJQUFJLG9CQUFvQixLQUFLLGtCQUFrQixLQUFLLG1CQUFtQixLQUFLLG9CQUFvQixLQUFLLHFCQUFxQixLQUFLLGVBQWUsS0FBSyxpQkFBaUIsS0FBSyxjQUFjLEtBQUssaUJBQWlCLEtBQUssZ0JBQWdCLEtBQUssZ0JBQWdCO0FBQ3JzQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsRUFBRTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsU0FBUztBQUNUO0FBQ0EsNEJBQTRCLEdBQUcsU0FBUyxHQUFHO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSw0QkFBNEIsRUFBRTtBQUM5QjtBQUNBO0FBQ0EsMEJBQTBCLEVBQUU7QUFDNUI7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsRUFBRTtBQUNoQztBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLHVCQUF1QixHQUFHLG1EQUFtRCxHQUFHO0FBQ2hGO0FBQ0EsU0FBUztBQUNUO0FBQ0EsMkJBQTJCLEdBQUc7QUFDOUI7QUFDQTtBQUNBLDhCQUE4QixFQUFFO0FBQ2hDO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxTQUEyQiIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvZm9sZGluZy9weXRob25pYy5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL3JvYm90LmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvcm9ib3RfaGlnaGxpZ2h0X3J1bGVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uLy4uL2xpYi9vb3BcIik7XG52YXIgQmFzZUZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZF9tb2RlXCIpLkZvbGRNb2RlO1xuXG52YXIgRm9sZE1vZGUgPSBleHBvcnRzLkZvbGRNb2RlID0gZnVuY3Rpb24obWFya2Vycykge1xuICAgIHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyID0gbmV3IFJlZ0V4cChcIihbXFxcXFt7XSkoPzpcXFxccyopJHwoXCIgKyBtYXJrZXJzICsgXCIpKD86XFxcXHMqKSg/OiMuKik/JFwiKTtcbn07XG5vb3AuaW5oZXJpdHMoRm9sZE1vZGUsIEJhc2VGb2xkTW9kZSk7XG5cbihmdW5jdGlvbigpIHtcblxuICAgIHRoaXMuZ2V0Rm9sZFdpZGdldFJhbmdlID0gZnVuY3Rpb24oc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCh0aGlzLmZvbGRpbmdTdGFydE1hcmtlcik7XG4gICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgaWYgKG1hdGNoWzFdKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm9wZW5pbmdCcmFja2V0QmxvY2soc2Vzc2lvbiwgbWF0Y2hbMV0sIHJvdywgbWF0Y2guaW5kZXgpO1xuICAgICAgICAgICAgaWYgKG1hdGNoWzJdKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmluZGVudGF0aW9uQmxvY2soc2Vzc2lvbiwgcm93LCBtYXRjaC5pbmRleCArIG1hdGNoWzJdLmxlbmd0aCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pbmRlbnRhdGlvbkJsb2NrKHNlc3Npb24sIHJvdyk7XG4gICAgICAgIH1cbiAgICB9O1xuXG59KS5jYWxsKEZvbGRNb2RlLnByb3RvdHlwZSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbiAgXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dE1vZGUgPSByZXF1aXJlKFwiLi90ZXh0XCIpLk1vZGU7XG52YXIgUm9ib3RIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3JvYm90X2hpZ2hsaWdodF9ydWxlc1wiKS5Sb2JvdEhpZ2hsaWdodFJ1bGVzO1xudmFyIEZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZGluZy9weXRob25pY1wiKS5Gb2xkTW9kZTtcblxudmFyIE1vZGUgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5IaWdobGlnaHRSdWxlcyA9IFJvYm90SGlnaGxpZ2h0UnVsZXM7XG4gIHRoaXMuZm9sZGluZ1J1bGVzID0gbmV3IEZvbGRNb2RlKCk7XG4gIHRoaXMuJGJlaGF2aW91ciA9IHRoaXMuJGRlZmF1bHRCZWhhdmlvdXI7XG59O1xub29wLmluaGVyaXRzKE1vZGUsIFRleHRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuICB0aGlzLmxpbmVDb21tZW50U3RhcnQgPSBcIiNcIjtcbiAgdGhpcy4kaWQgPSBcImFjZS9tb2RlL3JvYm90XCI7XG4gIHRoaXMuc25pcHBldEZpbGVJZCA9IFwiYWNlL3NuaXBwZXRzL3JvYm90XCI7XG59KS5jYWxsKE1vZGUucHJvdG90eXBlKTtcblxuZXhwb3J0cy5Nb2RlID0gTW9kZTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcblxudmFyIFJvYm90SGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgYnVpbHRpbkNvbnN0YW50c1JlZ2V4ID0gbmV3IFJlZ0V4cChcbiAgICAgICAgL1xcJFxce0NVUkRJUlxcfXxcXCRcXHtURU1QRElSXFx9fFxcJFxce0VYRUNESVJcXH18XFwkXFx7XFwvXFx9fFxcJFxce1xcOlxcfXxcXCRcXHtcXFxcblxcfXxcXCRcXHt0cnVlXFx9fFxcJFxce2ZhbHNlXFx9fFxcJFxce25vbmVcXH18XFwkXFx7bnVsbFxcfXxcXCRcXHtzcGFjZSg/OlxccypcXCpcXHMrWzAtOV0rKT9cXH18XFwkXFx7ZW1wdHlcXH18Jlxce2VtcHR5XFx9fEBcXHtlbXB0eVxcfXxcXCRcXHtURVNUIE5BTUVcXH18QFxce1RFU1RbXFxzX11UQUdTXFx9fFxcJFxce1RFU1RbXFxzX11ET0NVTUVOVEFUSU9OXFx9fFxcJFxce1RFU1RbXFxzX11TVEFUVVNcXH18XFwkXFx7VEVTVFtcXHNfXU1FU1NBR0VcXH18XFwkXFx7UFJFVltcXHNfXVRFU1RbXFxzX11OQU1FXFx9fFxcJFxce1BSRVZbXFxzX11URVNUW1xcc19dU1RBVFVTXFx9fFxcJFxce1BSRVZbXFxzX11URVNUW1xcc19dTUVTU0FHRVxcfXxcXCRcXHtTVUlURVtcXHNfXU5BTUVcXH18XFwkXFx7U1VJVEVbXFxzX11TT1VSQ0VcXH18XFwkXFx7U1VJVEVbXFxzX11ET0NVTUVOVEFUSU9OXFx9fCZcXHtTVUlURVtcXHNfXU1FVEFEQVRBXFx9fFxcJFxce1NVSVRFW1xcc19dU1RBVFVTXFx9fFxcJFxce1NVSVRFW1xcc19dTUVTU0FHRVxcfXxcXCRcXHtLRVlXT1JEW1xcc19dU1RBVFVTXFx9fFxcJFxce0tFWVdPUkRbXFxzX11NRVNTQUdFXFx9fFxcJFxce0xPR1tcXHNfXUxFVkVMXFx9fFxcJFxce09VVFBVVFtcXHNfXUZJTEVcXH18XFwkXFx7TE9HW1xcc19dRklMRVxcfXxcXCRcXHtSRVBPUlRbXFxzX11GSUxFXFx9fFxcJFxce0RFQlVHW1xcc19dRklMRVxcfXxcXCRcXHtPVVRQVVRbXFxzX11ESVJcXH0vXG4gICAgKTtcblxuICAgIHRoaXMuJHJ1bGVzID0ge1xuICAgICAgICBcInN0YXJ0XCIgOiBbIHtcbiAgICAgICAgICAgIHRva2VuOiBcInN0cmluZy5yb2JvdC5oZWFkZXJcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXlxcKnszfVxccysoPzpzZXR0aW5ncz98bWV0YWRhdGF8KD86dXNlciApP2tleXdvcmRzP3x0ZXN0ID9jYXNlcz98dGFza3M/fHZhcmlhYmxlcz8pLyxcbiAgICAgICAgICAgIGNhc2VJbnNlbnNpdGl2ZTogdHJ1ZSxcbiAgICAgICAgICAgIHB1c2g6IFt7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nLnJvYm90LmhlYWRlclwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvJC8sXG4gICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzdHJpbmcucm9ib3QuaGVhZGVyXCJcbiAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgY29tbWVudDogXCJzdGFydCBvZiBhIHRhYmxlXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwiY29tbWVudC5yb2JvdFwiLFxuICAgICAgICAgICAgcmVnZXg6IC8oPzpefFxcc3syLH18XFx0fFxcfFxcc3sxLH0pKD89W15cXFxcXSkjLyxcbiAgICAgICAgICAgIHB1c2g6IFt7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwiY29tbWVudC5yb2JvdFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvJC8sXG4gICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJjb21tZW50LnJvYm90XCJcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcImNvbW1lbnRcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXlxccypcXFs/RG9jdW1lbnRhdGlvblxcXT8vLFxuICAgICAgICAgICAgY2FzZUluc2Vuc2l0aXZlOiB0cnVlLFxuICAgICAgICAgICAgcHVzaDogW3tcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJjb21tZW50XCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IC9eKD8hXFxzKlxcLlxcLlxcLikvLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwiY29tbWVudFwiXG4gICAgICAgICAgICB9XVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJzdG9yYWdlLnR5cGUubWV0aG9kLnJvYm90XCIsXG4gICAgICAgICAgICByZWdleDogL1xcWyg/OkFyZ3VtZW50c3xTZXR1cHxUZWFyZG93bnxQcmVjb25kaXRpb258UG9zdGNvbmRpdGlvbnxUZW1wbGF0ZXxSZXR1cm58VGltZW91dClcXF0vLFxuICAgICAgICAgICAgY2FzZUluc2Vuc2l0aXZlOiB0cnVlLFxuICAgICAgICAgICAgY29tbWVudDogXCJ0ZXN0Y2FzZSBzZXR0aW5nc1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInN0b3JhZ2UudHlwZS5tZXRob2Qucm9ib3RcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXFxbVGFnc1xcXS8sXG4gICAgICAgICAgICBjYXNlSW5zZW5zaXRpdmU6IHRydWUsXG4gICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInN0b3JhZ2UudHlwZS5tZXRob2Qucm9ib3RcIixcbiAgICAgICAgICAgICAgICByZWdleDogL14oPyFcXHMqXFwuXFwuXFwuKS8sXG4gICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcImNvbW1lbnRcIixcbiAgICAgICAgICAgICAgICByZWdleDogL15cXHMqXFwuXFwuXFwuL1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzdG9yYWdlLnR5cGUubWV0aG9kLnJvYm90XCJcbiAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgY29tbWVudDogXCJ0ZXN0IHRhZ3NcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5sYW5ndWFnZVwiLFxuICAgICAgICAgICAgcmVnZXg6IGJ1aWx0aW5Db25zdGFudHNSZWdleCxcbiAgICAgICAgICAgIGNhc2VJbnNlbnNpdGl2ZTogdHJ1ZVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJlbnRpdHkubmFtZS52YXJpYWJsZS53cmFwcGVyXCIsXG4gICAgICAgICAgICByZWdleDogL1skQCYlXVxce1xcez8vLFxuICAgICAgICAgICAgcHVzaDogW3tcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJlbnRpdHkubmFtZS52YXJpYWJsZS53cmFwcGVyXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IC9cXH1cXH0/KFxccz89KT8vLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiBcIiRzZWxmXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJlbnRpdHkubmFtZS52YXJpYWJsZVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvLi9cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwiZW50aXR5Lm5hbWUudmFyaWFibGVcIlxuICAgICAgICAgICAgfV1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwia2V5d29yZC5jb250cm9sLnJvYm90XCIsXG4gICAgICAgICAgICByZWdleDogL15bXlxcc1xcdCokfF0rfCg/PV5cXHwpXFxzK1teXFxzXFx0KiR8XSsvLFxuICAgICAgICAgICAgcHVzaDogW3tcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJrZXl3b3JkLmNvbnRyb2wucm9ib3RcIixcbiAgICAgICAgICAgICAgICByZWdleDogLyg/PVxcc3syfSl8XFx0fCR8XFxzKyg/PVxcfCkvLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwia2V5d29yZC5jb250cm9sLnJvYm90XCJcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lm51bWVyaWMucm9ib3RcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXFxiWzAtOV0rKD86XFwuWzAtOV0rKT9cXGIvXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcImtleXdvcmRcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXFxzezIsfShmb3J8aW4gcmFuZ2V8aW58ZW5kfGVsc2UgaWZ8aWZ8ZWxzZXx3aXRoIG5hbWUpKFxcc3syLH18JCkvLFxuICAgICAgICAgICAgY2FzZUluc2Vuc2l0aXZlOiB0cnVlXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInN0b3JhZ2UudHlwZS5mdW5jdGlvblwiLFxuICAgICAgICAgICAgcmVnZXg6IC9eKD86XFxzezIsfVxccyspW14gXFx0KiRAJiVbLnxdKy8sXG4gICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInN0b3JhZ2UudHlwZS5mdW5jdGlvblwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvKD89XFxzezJ9KXxcXHR8JHxcXHMrKD89XFx8KS8sXG4gICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzdG9yYWdlLnR5cGUuZnVuY3Rpb25cIlxuICAgICAgICAgICAgfV1cbiAgICAgICAgfV1cbiAgICB9O1xuICAgIHRoaXMubm9ybWFsaXplUnVsZXMoKTtcbn07XG5cblJvYm90SGlnaGxpZ2h0UnVsZXMubWV0YWRhdGEgPSB7XG4gIGZpbGVUeXBlczogWydyb2JvdCddLFxuICBuYW1lOiAnUm9ib3QnLFxuICBzY29wZU5hbWU6ICdzb3VyY2Uucm9ib3QnXG59O1xuXG5vb3AuaW5oZXJpdHMoUm9ib3RIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuZXhwb3J0cy5Sb2JvdEhpZ2hsaWdodFJ1bGVzID0gUm9ib3RIaWdobGlnaHRSdWxlcztcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==