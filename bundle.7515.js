"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[7515],{

/***/ 37515:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var TextMode = (__webpack_require__(98030).Mode);
var CirruHighlightRules = (__webpack_require__(14321)/* .CirruHighlightRules */ .O);
var CoffeeFoldMode = (__webpack_require__(35090)/* .FoldMode */ .Z);

var Mode = function() {
    this.HighlightRules = CirruHighlightRules;
    this.foldingRules = new CoffeeFoldMode();
    this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, TextMode);

(function() {
    this.lineCommentStart = "--";
    this.$id = "ace/mode/cirru";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 14321:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var TextHighlightRules = (__webpack_require__(28053)/* .TextHighlightRules */ .K);

// see http://cirru.org for more about this language
var CirruHighlightRules = function() {
    this.$rules = {
        start: [{
            token: 'constant.numeric',
            regex: /[\d\.]+/
        }, {
            token: 'comment.line.double-dash',
            regex: /--/,
            next: 'comment'
        }, {
            token: 'storage.modifier',
            regex: /\(/
        }, {
            token: 'storage.modifier',
            regex: /,/,
            next: 'line'
        }, {
            token: 'support.function',
            regex: /[^\(\)"\s{}\[\]]+/,
            next: 'line'
        }, {
            token: 'string.quoted.double',
            regex: /"/,
            next: 'string'
        }, {
            token: 'storage.modifier',
            regex: /\)/
        }],
        comment: [{
            token: 'comment.line.double-dash',
            regex: / +[^\n]+/,
            next: 'start'
        }],
        string: [{
            token: 'string.quoted.double',
            regex: /"/,
            next: 'line'
        }, {
            token: 'constant.character.escape',
            regex: /\\/,
            next: 'escape'
        }, {
            token: 'string.quoted.double',
            regex: /[^\\"]+/
        }],
        escape: [{
            token: 'constant.character.escape',
            regex: /./,
            next: 'string'
        }],
        line: [{
            token: 'constant.numeric',
            regex: /[\d\.]+/
        }, {
            token: 'markup.raw',
            regex: /^\s*/,
            next: 'start'
        }, {
            token: 'storage.modifier',
            regex: /\$/,
            next: 'start'
        }, {
            token: 'variable.parameter',
            regex: /[^\(\)"\s{}\[\]]+/
        }, {
            token: 'storage.modifier',
            regex: /\(/,
            next: 'start'
        }, {
            token: 'storage.modifier',
            regex: /\)/
        }, {
            token: 'markup.raw',
            regex: /^ */,
            next: 'start'
        }, {
            token: 'string.quoted.double',
            regex: /"/,
            next: 'string'
        }]
    };

};

oop.inherits(CirruHighlightRules, TextHighlightRules);

exports.O = CirruHighlightRules;


/***/ }),

/***/ 35090:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var BaseFoldMode = (__webpack_require__(15369).FoldMode);
var Range = (__webpack_require__(59082)/* .Range */ .e);

var FoldMode = exports.Z = function() {};
oop.inherits(FoldMode, BaseFoldMode);

(function() {

    this.getFoldWidgetRange = function(session, foldStyle, row) {
        var range = this.indentationBlock(session, row);
        if (range)
            return range;

        var re = /\S/;
        var line = session.getLine(row);
        var startLevel = line.search(re);
        if (startLevel == -1 || line[startLevel] != "#")
            return;

        var startColumn = line.length;
        var maxRow = session.getLength();
        var startRow = row;
        var endRow = row;

        while (++row < maxRow) {
            line = session.getLine(row);
            var level = line.search(re);

            if (level == -1)
                continue;

            if (line[level] != "#")
                break;

            endRow = row;
        }

        if (endRow > startRow) {
            var endColumn = session.getLine(endRow).length;
            return new Range(startRow, startColumn, endRow, endColumn);
        }
    };

    // must return "" if there's no fold, to enable caching
    this.getFoldWidget = function(session, foldStyle, row) {
        var line = session.getLine(row);
        var indent = line.search(/\S/);
        var next = session.getLine(row + 1);
        var prev = session.getLine(row - 1);
        var prevIndent = prev.search(/\S/);
        var nextIndent = next.search(/\S/);

        if (indent == -1) {
            session.foldWidgets[row - 1] = prevIndent!= -1 && prevIndent < nextIndent ? "start" : "";
            return "";
        }

        // documentation comments
        if (prevIndent == -1) {
            if (indent == nextIndent && line[indent] == "#" && next[indent] == "#") {
                session.foldWidgets[row - 1] = "";
                session.foldWidgets[row + 1] = "";
                return "start";
            }
        } else if (prevIndent == indent && line[indent] == "#" && prev[indent] == "#") {
            if (session.getLine(row - 2).search(/\S/) == -1) {
                session.foldWidgets[row - 1] = "start";
                session.foldWidgets[row + 1] = "";
                return "";
            }
        }

        if (prevIndent!= -1 && prevIndent < indent)
            session.foldWidgets[row - 1] = "start";
        else
            session.foldWidgets[row - 1] = "";

        if (indent < nextIndent)
            return "start";
        else
            return "";
    };

}).call(FoldMode.prototype);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjc1MTUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLEtBQVk7QUFDOUIsZUFBZSxpQ0FBc0I7QUFDckMsMEJBQTBCLHlEQUFzRDtBQUNoRixxQkFBcUIsOENBQW9DOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCxZQUFZOzs7Ozs7OztBQ25CQzs7QUFFYixVQUFVLG1CQUFPLENBQUMsS0FBWTtBQUM5Qix5QkFBeUIsd0RBQW9EOztBQUU3RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsK0JBQStCO0FBQy9CLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBOztBQUVBOztBQUVBLFNBQTJCOzs7Ozs7OztBQzVGZDs7QUFFYixVQUFVLG1CQUFPLENBQUMsS0FBZTtBQUNqQyxtQkFBbUIscUNBQStCO0FBQ2xELFlBQVksMkNBQTRCOztBQUV4QyxlQUFlLFNBQWdCO0FBQy9COztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9jaXJydS5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2NpcnJ1X2hpZ2hsaWdodF9ydWxlcy5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2ZvbGRpbmcvY29mZmVlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dE1vZGUgPSByZXF1aXJlKFwiLi90ZXh0XCIpLk1vZGU7XG52YXIgQ2lycnVIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL2NpcnJ1X2hpZ2hsaWdodF9ydWxlc1wiKS5DaXJydUhpZ2hsaWdodFJ1bGVzO1xudmFyIENvZmZlZUZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZGluZy9jb2ZmZWVcIikuRm9sZE1vZGU7XG5cbnZhciBNb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5IaWdobGlnaHRSdWxlcyA9IENpcnJ1SGlnaGxpZ2h0UnVsZXM7XG4gICAgdGhpcy5mb2xkaW5nUnVsZXMgPSBuZXcgQ29mZmVlRm9sZE1vZGUoKTtcbiAgICB0aGlzLiRiZWhhdmlvdXIgPSB0aGlzLiRkZWZhdWx0QmVoYXZpb3VyO1xufTtcbm9vcC5pbmhlcml0cyhNb2RlLCBUZXh0TW9kZSk7XG5cbihmdW5jdGlvbigpIHtcbiAgICB0aGlzLmxpbmVDb21tZW50U3RhcnQgPSBcIi0tXCI7XG4gICAgdGhpcy4kaWQgPSBcImFjZS9tb2RlL2NpcnJ1XCI7XG59KS5jYWxsKE1vZGUucHJvdG90eXBlKTtcblxuZXhwb3J0cy5Nb2RlID0gTW9kZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xuXG4vLyBzZWUgaHR0cDovL2NpcnJ1Lm9yZyBmb3IgbW9yZSBhYm91dCB0aGlzIGxhbmd1YWdlXG52YXIgQ2lycnVIaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuJHJ1bGVzID0ge1xuICAgICAgICBzdGFydDogW3tcbiAgICAgICAgICAgIHRva2VuOiAnY29uc3RhbnQubnVtZXJpYycsXG4gICAgICAgICAgICByZWdleDogL1tcXGRcXC5dKy9cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46ICdjb21tZW50LmxpbmUuZG91YmxlLWRhc2gnLFxuICAgICAgICAgICAgcmVnZXg6IC8tLS8sXG4gICAgICAgICAgICBuZXh0OiAnY29tbWVudCdcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46ICdzdG9yYWdlLm1vZGlmaWVyJyxcbiAgICAgICAgICAgIHJlZ2V4OiAvXFwoL1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogJ3N0b3JhZ2UubW9kaWZpZXInLFxuICAgICAgICAgICAgcmVnZXg6IC8sLyxcbiAgICAgICAgICAgIG5leHQ6ICdsaW5lJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogJ3N1cHBvcnQuZnVuY3Rpb24nLFxuICAgICAgICAgICAgcmVnZXg6IC9bXlxcKFxcKVwiXFxze31cXFtcXF1dKy8sXG4gICAgICAgICAgICBuZXh0OiAnbGluZSdcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46ICdzdHJpbmcucXVvdGVkLmRvdWJsZScsXG4gICAgICAgICAgICByZWdleDogL1wiLyxcbiAgICAgICAgICAgIG5leHQ6ICdzdHJpbmcnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiAnc3RvcmFnZS5tb2RpZmllcicsXG4gICAgICAgICAgICByZWdleDogL1xcKS9cbiAgICAgICAgfV0sXG4gICAgICAgIGNvbW1lbnQ6IFt7XG4gICAgICAgICAgICB0b2tlbjogJ2NvbW1lbnQubGluZS5kb3VibGUtZGFzaCcsXG4gICAgICAgICAgICByZWdleDogLyArW15cXG5dKy8sXG4gICAgICAgICAgICBuZXh0OiAnc3RhcnQnXG4gICAgICAgIH1dLFxuICAgICAgICBzdHJpbmc6IFt7XG4gICAgICAgICAgICB0b2tlbjogJ3N0cmluZy5xdW90ZWQuZG91YmxlJyxcbiAgICAgICAgICAgIHJlZ2V4OiAvXCIvLFxuICAgICAgICAgICAgbmV4dDogJ2xpbmUnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiAnY29uc3RhbnQuY2hhcmFjdGVyLmVzY2FwZScsXG4gICAgICAgICAgICByZWdleDogL1xcXFwvLFxuICAgICAgICAgICAgbmV4dDogJ2VzY2FwZSdcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46ICdzdHJpbmcucXVvdGVkLmRvdWJsZScsXG4gICAgICAgICAgICByZWdleDogL1teXFxcXFwiXSsvXG4gICAgICAgIH1dLFxuICAgICAgICBlc2NhcGU6IFt7XG4gICAgICAgICAgICB0b2tlbjogJ2NvbnN0YW50LmNoYXJhY3Rlci5lc2NhcGUnLFxuICAgICAgICAgICAgcmVnZXg6IC8uLyxcbiAgICAgICAgICAgIG5leHQ6ICdzdHJpbmcnXG4gICAgICAgIH1dLFxuICAgICAgICBsaW5lOiBbe1xuICAgICAgICAgICAgdG9rZW46ICdjb25zdGFudC5udW1lcmljJyxcbiAgICAgICAgICAgIHJlZ2V4OiAvW1xcZFxcLl0rL1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogJ21hcmt1cC5yYXcnLFxuICAgICAgICAgICAgcmVnZXg6IC9eXFxzKi8sXG4gICAgICAgICAgICBuZXh0OiAnc3RhcnQnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiAnc3RvcmFnZS5tb2RpZmllcicsXG4gICAgICAgICAgICByZWdleDogL1xcJC8sXG4gICAgICAgICAgICBuZXh0OiAnc3RhcnQnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiAndmFyaWFibGUucGFyYW1ldGVyJyxcbiAgICAgICAgICAgIHJlZ2V4OiAvW15cXChcXClcIlxcc3t9XFxbXFxdXSsvXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiAnc3RvcmFnZS5tb2RpZmllcicsXG4gICAgICAgICAgICByZWdleDogL1xcKC8sXG4gICAgICAgICAgICBuZXh0OiAnc3RhcnQnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiAnc3RvcmFnZS5tb2RpZmllcicsXG4gICAgICAgICAgICByZWdleDogL1xcKS9cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46ICdtYXJrdXAucmF3JyxcbiAgICAgICAgICAgIHJlZ2V4OiAvXiAqLyxcbiAgICAgICAgICAgIG5leHQ6ICdzdGFydCdcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46ICdzdHJpbmcucXVvdGVkLmRvdWJsZScsXG4gICAgICAgICAgICByZWdleDogL1wiLyxcbiAgICAgICAgICAgIG5leHQ6ICdzdHJpbmcnXG4gICAgICAgIH1dXG4gICAgfTtcblxufTtcblxub29wLmluaGVyaXRzKENpcnJ1SGlnaGxpZ2h0UnVsZXMsIFRleHRIaWdobGlnaHRSdWxlcyk7XG5cbmV4cG9ydHMuQ2lycnVIaWdobGlnaHRSdWxlcyA9IENpcnJ1SGlnaGxpZ2h0UnVsZXM7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi8uLi9saWIvb29wXCIpO1xudmFyIEJhc2VGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRfbW9kZVwiKS5Gb2xkTW9kZTtcbnZhciBSYW5nZSA9IHJlcXVpcmUoXCIuLi8uLi9yYW5nZVwiKS5SYW5nZTtcblxudmFyIEZvbGRNb2RlID0gZXhwb3J0cy5Gb2xkTW9kZSA9IGZ1bmN0aW9uKCkge307XG5vb3AuaW5oZXJpdHMoRm9sZE1vZGUsIEJhc2VGb2xkTW9kZSk7XG5cbihmdW5jdGlvbigpIHtcblxuICAgIHRoaXMuZ2V0Rm9sZFdpZGdldFJhbmdlID0gZnVuY3Rpb24oc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpIHtcbiAgICAgICAgdmFyIHJhbmdlID0gdGhpcy5pbmRlbnRhdGlvbkJsb2NrKHNlc3Npb24sIHJvdyk7XG4gICAgICAgIGlmIChyYW5nZSlcbiAgICAgICAgICAgIHJldHVybiByYW5nZTtcblxuICAgICAgICB2YXIgcmUgPSAvXFxTLztcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgdmFyIHN0YXJ0TGV2ZWwgPSBsaW5lLnNlYXJjaChyZSk7XG4gICAgICAgIGlmIChzdGFydExldmVsID09IC0xIHx8IGxpbmVbc3RhcnRMZXZlbF0gIT0gXCIjXCIpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdmFyIHN0YXJ0Q29sdW1uID0gbGluZS5sZW5ndGg7XG4gICAgICAgIHZhciBtYXhSb3cgPSBzZXNzaW9uLmdldExlbmd0aCgpO1xuICAgICAgICB2YXIgc3RhcnRSb3cgPSByb3c7XG4gICAgICAgIHZhciBlbmRSb3cgPSByb3c7XG5cbiAgICAgICAgd2hpbGUgKCsrcm93IDwgbWF4Um93KSB7XG4gICAgICAgICAgICBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgICAgICB2YXIgbGV2ZWwgPSBsaW5lLnNlYXJjaChyZSk7XG5cbiAgICAgICAgICAgIGlmIChsZXZlbCA9PSAtMSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcblxuICAgICAgICAgICAgaWYgKGxpbmVbbGV2ZWxdICE9IFwiI1wiKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBlbmRSb3cgPSByb3c7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW5kUm93ID4gc3RhcnRSb3cpIHtcbiAgICAgICAgICAgIHZhciBlbmRDb2x1bW4gPSBzZXNzaW9uLmdldExpbmUoZW5kUm93KS5sZW5ndGg7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFJhbmdlKHN0YXJ0Um93LCBzdGFydENvbHVtbiwgZW5kUm93LCBlbmRDb2x1bW4pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8vIG11c3QgcmV0dXJuIFwiXCIgaWYgdGhlcmUncyBubyBmb2xkLCB0byBlbmFibGUgY2FjaGluZ1xuICAgIHRoaXMuZ2V0Rm9sZFdpZGdldCA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgIHZhciBpbmRlbnQgPSBsaW5lLnNlYXJjaCgvXFxTLyk7XG4gICAgICAgIHZhciBuZXh0ID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyArIDEpO1xuICAgICAgICB2YXIgcHJldiA9IHNlc3Npb24uZ2V0TGluZShyb3cgLSAxKTtcbiAgICAgICAgdmFyIHByZXZJbmRlbnQgPSBwcmV2LnNlYXJjaCgvXFxTLyk7XG4gICAgICAgIHZhciBuZXh0SW5kZW50ID0gbmV4dC5zZWFyY2goL1xcUy8pO1xuXG4gICAgICAgIGlmIChpbmRlbnQgPT0gLTEpIHtcbiAgICAgICAgICAgIHNlc3Npb24uZm9sZFdpZGdldHNbcm93IC0gMV0gPSBwcmV2SW5kZW50IT0gLTEgJiYgcHJldkluZGVudCA8IG5leHRJbmRlbnQgPyBcInN0YXJ0XCIgOiBcIlwiO1xuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBkb2N1bWVudGF0aW9uIGNvbW1lbnRzXG4gICAgICAgIGlmIChwcmV2SW5kZW50ID09IC0xKSB7XG4gICAgICAgICAgICBpZiAoaW5kZW50ID09IG5leHRJbmRlbnQgJiYgbGluZVtpbmRlbnRdID09IFwiI1wiICYmIG5leHRbaW5kZW50XSA9PSBcIiNcIikge1xuICAgICAgICAgICAgICAgIHNlc3Npb24uZm9sZFdpZGdldHNbcm93IC0gMV0gPSBcIlwiO1xuICAgICAgICAgICAgICAgIHNlc3Npb24uZm9sZFdpZGdldHNbcm93ICsgMV0gPSBcIlwiO1xuICAgICAgICAgICAgICAgIHJldHVybiBcInN0YXJ0XCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAocHJldkluZGVudCA9PSBpbmRlbnQgJiYgbGluZVtpbmRlbnRdID09IFwiI1wiICYmIHByZXZbaW5kZW50XSA9PSBcIiNcIikge1xuICAgICAgICAgICAgaWYgKHNlc3Npb24uZ2V0TGluZShyb3cgLSAyKS5zZWFyY2goL1xcUy8pID09IC0xKSB7XG4gICAgICAgICAgICAgICAgc2Vzc2lvbi5mb2xkV2lkZ2V0c1tyb3cgLSAxXSA9IFwic3RhcnRcIjtcbiAgICAgICAgICAgICAgICBzZXNzaW9uLmZvbGRXaWRnZXRzW3JvdyArIDFdID0gXCJcIjtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcmV2SW5kZW50IT0gLTEgJiYgcHJldkluZGVudCA8IGluZGVudClcbiAgICAgICAgICAgIHNlc3Npb24uZm9sZFdpZGdldHNbcm93IC0gMV0gPSBcInN0YXJ0XCI7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHNlc3Npb24uZm9sZFdpZGdldHNbcm93IC0gMV0gPSBcIlwiO1xuXG4gICAgICAgIGlmIChpbmRlbnQgPCBuZXh0SW5kZW50KVxuICAgICAgICAgICAgcmV0dXJuIFwic3RhcnRcIjtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfTtcblxufSkuY2FsbChGb2xkTW9kZS5wcm90b3R5cGUpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9