"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[2295],{

/***/ 74676:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var CirruHighlightRules = (__webpack_require__(83959)/* .CirruHighlightRules */ .H);
var CoffeeFoldMode = (__webpack_require__(69261)/* .FoldMode */ .l);

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

/***/ 83959:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

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

exports.H = CirruHighlightRules;


/***/ }),

/***/ 69261:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var BaseFoldMode = (__webpack_require__(51358).FoldMode);
var Range = (__webpack_require__(91902)/* .Range */ .Q);

var FoldMode = exports.l = function() {};
oop.inherits(FoldMode, BaseFoldMode);

(function() {
    this.commentBlock = function(session, row) {
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

    this.getFoldWidgetRange = function(session, foldStyle, row) {
        var range = this.indentationBlock(session, row);
        if (range)
            return range;

        range = this.commentBlock(session, row);
        if (range)
            return range;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjIyOTUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLElBQVk7QUFDOUIsZUFBZSxpQ0FBc0I7QUFDckMsMEJBQTBCLHlEQUFzRDtBQUNoRixxQkFBcUIsOENBQW9DOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCxZQUFZOzs7Ozs7OztBQ25CQzs7QUFFYixVQUFVLG1CQUFPLENBQUMsSUFBWTtBQUM5Qix5QkFBeUIsd0RBQW9EOztBQUU3RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsK0JBQStCO0FBQy9CLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBOztBQUVBOztBQUVBLFNBQTJCOzs7Ozs7OztBQzVGZDs7QUFFYixVQUFVLG1CQUFPLENBQUMsSUFBZTtBQUNqQyxtQkFBbUIscUNBQStCO0FBQ2xELFlBQVksMkNBQTRCOztBQUV4QyxlQUFlLFNBQWdCO0FBQy9COztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvY2lycnUuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9jaXJydV9oaWdobGlnaHRfcnVsZXMuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9mb2xkaW5nL2NvZmZlZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRNb2RlID0gcmVxdWlyZShcIi4vdGV4dFwiKS5Nb2RlO1xudmFyIENpcnJ1SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9jaXJydV9oaWdobGlnaHRfcnVsZXNcIikuQ2lycnVIaWdobGlnaHRSdWxlcztcbnZhciBDb2ZmZWVGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRpbmcvY29mZmVlXCIpLkZvbGRNb2RlO1xuXG52YXIgTW9kZSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuSGlnaGxpZ2h0UnVsZXMgPSBDaXJydUhpZ2hsaWdodFJ1bGVzO1xuICAgIHRoaXMuZm9sZGluZ1J1bGVzID0gbmV3IENvZmZlZUZvbGRNb2RlKCk7XG4gICAgdGhpcy4kYmVoYXZpb3VyID0gdGhpcy4kZGVmYXVsdEJlaGF2aW91cjtcbn07XG5vb3AuaW5oZXJpdHMoTW9kZSwgVGV4dE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5saW5lQ29tbWVudFN0YXJ0ID0gXCItLVwiO1xuICAgIHRoaXMuJGlkID0gXCJhY2UvbW9kZS9jaXJydVwiO1xufSkuY2FsbChNb2RlLnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTW9kZSA9IE1vZGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcblxuLy8gc2VlIGh0dHA6Ly9jaXJydS5vcmcgZm9yIG1vcmUgYWJvdXQgdGhpcyBsYW5ndWFnZVxudmFyIENpcnJ1SGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLiRydWxlcyA9IHtcbiAgICAgICAgc3RhcnQ6IFt7XG4gICAgICAgICAgICB0b2tlbjogJ2NvbnN0YW50Lm51bWVyaWMnLFxuICAgICAgICAgICAgcmVnZXg6IC9bXFxkXFwuXSsvXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiAnY29tbWVudC5saW5lLmRvdWJsZS1kYXNoJyxcbiAgICAgICAgICAgIHJlZ2V4OiAvLS0vLFxuICAgICAgICAgICAgbmV4dDogJ2NvbW1lbnQnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiAnc3RvcmFnZS5tb2RpZmllcicsXG4gICAgICAgICAgICByZWdleDogL1xcKC9cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46ICdzdG9yYWdlLm1vZGlmaWVyJyxcbiAgICAgICAgICAgIHJlZ2V4OiAvLC8sXG4gICAgICAgICAgICBuZXh0OiAnbGluZSdcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46ICdzdXBwb3J0LmZ1bmN0aW9uJyxcbiAgICAgICAgICAgIHJlZ2V4OiAvW15cXChcXClcIlxcc3t9XFxbXFxdXSsvLFxuICAgICAgICAgICAgbmV4dDogJ2xpbmUnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiAnc3RyaW5nLnF1b3RlZC5kb3VibGUnLFxuICAgICAgICAgICAgcmVnZXg6IC9cIi8sXG4gICAgICAgICAgICBuZXh0OiAnc3RyaW5nJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogJ3N0b3JhZ2UubW9kaWZpZXInLFxuICAgICAgICAgICAgcmVnZXg6IC9cXCkvXG4gICAgICAgIH1dLFxuICAgICAgICBjb21tZW50OiBbe1xuICAgICAgICAgICAgdG9rZW46ICdjb21tZW50LmxpbmUuZG91YmxlLWRhc2gnLFxuICAgICAgICAgICAgcmVnZXg6IC8gK1teXFxuXSsvLFxuICAgICAgICAgICAgbmV4dDogJ3N0YXJ0J1xuICAgICAgICB9XSxcbiAgICAgICAgc3RyaW5nOiBbe1xuICAgICAgICAgICAgdG9rZW46ICdzdHJpbmcucXVvdGVkLmRvdWJsZScsXG4gICAgICAgICAgICByZWdleDogL1wiLyxcbiAgICAgICAgICAgIG5leHQ6ICdsaW5lJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogJ2NvbnN0YW50LmNoYXJhY3Rlci5lc2NhcGUnLFxuICAgICAgICAgICAgcmVnZXg6IC9cXFxcLyxcbiAgICAgICAgICAgIG5leHQ6ICdlc2NhcGUnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiAnc3RyaW5nLnF1b3RlZC5kb3VibGUnLFxuICAgICAgICAgICAgcmVnZXg6IC9bXlxcXFxcIl0rL1xuICAgICAgICB9XSxcbiAgICAgICAgZXNjYXBlOiBbe1xuICAgICAgICAgICAgdG9rZW46ICdjb25zdGFudC5jaGFyYWN0ZXIuZXNjYXBlJyxcbiAgICAgICAgICAgIHJlZ2V4OiAvLi8sXG4gICAgICAgICAgICBuZXh0OiAnc3RyaW5nJ1xuICAgICAgICB9XSxcbiAgICAgICAgbGluZTogW3tcbiAgICAgICAgICAgIHRva2VuOiAnY29uc3RhbnQubnVtZXJpYycsXG4gICAgICAgICAgICByZWdleDogL1tcXGRcXC5dKy9cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46ICdtYXJrdXAucmF3JyxcbiAgICAgICAgICAgIHJlZ2V4OiAvXlxccyovLFxuICAgICAgICAgICAgbmV4dDogJ3N0YXJ0J1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogJ3N0b3JhZ2UubW9kaWZpZXInLFxuICAgICAgICAgICAgcmVnZXg6IC9cXCQvLFxuICAgICAgICAgICAgbmV4dDogJ3N0YXJ0J1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogJ3ZhcmlhYmxlLnBhcmFtZXRlcicsXG4gICAgICAgICAgICByZWdleDogL1teXFwoXFwpXCJcXHN7fVxcW1xcXV0rL1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogJ3N0b3JhZ2UubW9kaWZpZXInLFxuICAgICAgICAgICAgcmVnZXg6IC9cXCgvLFxuICAgICAgICAgICAgbmV4dDogJ3N0YXJ0J1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogJ3N0b3JhZ2UubW9kaWZpZXInLFxuICAgICAgICAgICAgcmVnZXg6IC9cXCkvXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiAnbWFya3VwLnJhdycsXG4gICAgICAgICAgICByZWdleDogL14gKi8sXG4gICAgICAgICAgICBuZXh0OiAnc3RhcnQnXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiAnc3RyaW5nLnF1b3RlZC5kb3VibGUnLFxuICAgICAgICAgICAgcmVnZXg6IC9cIi8sXG4gICAgICAgICAgICBuZXh0OiAnc3RyaW5nJ1xuICAgICAgICB9XVxuICAgIH07XG5cbn07XG5cbm9vcC5pbmhlcml0cyhDaXJydUhpZ2hsaWdodFJ1bGVzLCBUZXh0SGlnaGxpZ2h0UnVsZXMpO1xuXG5leHBvcnRzLkNpcnJ1SGlnaGxpZ2h0UnVsZXMgPSBDaXJydUhpZ2hsaWdodFJ1bGVzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vLi4vbGliL29vcFwiKTtcbnZhciBCYXNlRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9mb2xkX21vZGVcIikuRm9sZE1vZGU7XG52YXIgUmFuZ2UgPSByZXF1aXJlKFwiLi4vLi4vcmFuZ2VcIikuUmFuZ2U7XG5cbnZhciBGb2xkTW9kZSA9IGV4cG9ydHMuRm9sZE1vZGUgPSBmdW5jdGlvbigpIHt9O1xub29wLmluaGVyaXRzKEZvbGRNb2RlLCBCYXNlRm9sZE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5jb21tZW50QmxvY2sgPSBmdW5jdGlvbihzZXNzaW9uLCByb3cpIHtcbiAgICAgICAgdmFyIHJlID0gL1xcUy87XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgIHZhciBzdGFydExldmVsID0gbGluZS5zZWFyY2gocmUpO1xuICAgICAgICBpZiAoc3RhcnRMZXZlbCA9PSAtMSB8fCBsaW5lW3N0YXJ0TGV2ZWxdICE9IFwiI1wiKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHZhciBzdGFydENvbHVtbiA9IGxpbmUubGVuZ3RoO1xuICAgICAgICB2YXIgbWF4Um93ID0gc2Vzc2lvbi5nZXRMZW5ndGgoKTtcbiAgICAgICAgdmFyIHN0YXJ0Um93ID0gcm93O1xuICAgICAgICB2YXIgZW5kUm93ID0gcm93O1xuXG4gICAgICAgIHdoaWxlICgrK3JvdyA8IG1heFJvdykge1xuICAgICAgICAgICAgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICAgICAgdmFyIGxldmVsID0gbGluZS5zZWFyY2gocmUpO1xuXG4gICAgICAgICAgICBpZiAobGV2ZWwgPT0gLTEpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgICAgIGlmIChsaW5lW2xldmVsXSAhPSBcIiNcIilcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZW5kUm93ID0gcm93O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVuZFJvdyA+IHN0YXJ0Um93KSB7XG4gICAgICAgICAgICB2YXIgZW5kQ29sdW1uID0gc2Vzc2lvbi5nZXRMaW5lKGVuZFJvdykubGVuZ3RoO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShzdGFydFJvdywgc3RhcnRDb2x1bW4sIGVuZFJvdywgZW5kQ29sdW1uKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLmdldEZvbGRXaWRnZXRSYW5nZSA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KSB7XG4gICAgICAgIHZhciByYW5nZSA9IHRoaXMuaW5kZW50YXRpb25CbG9jayhzZXNzaW9uLCByb3cpO1xuICAgICAgICBpZiAocmFuZ2UpXG4gICAgICAgICAgICByZXR1cm4gcmFuZ2U7XG5cbiAgICAgICAgcmFuZ2UgPSB0aGlzLmNvbW1lbnRCbG9jayhzZXNzaW9uLCByb3cpO1xuICAgICAgICBpZiAocmFuZ2UpXG4gICAgICAgICAgICByZXR1cm4gcmFuZ2U7XG4gICAgfTtcblxuICAgIC8vIG11c3QgcmV0dXJuIFwiXCIgaWYgdGhlcmUncyBubyBmb2xkLCB0byBlbmFibGUgY2FjaGluZ1xuICAgIHRoaXMuZ2V0Rm9sZFdpZGdldCA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgIHZhciBpbmRlbnQgPSBsaW5lLnNlYXJjaCgvXFxTLyk7XG4gICAgICAgIHZhciBuZXh0ID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyArIDEpO1xuICAgICAgICB2YXIgcHJldiA9IHNlc3Npb24uZ2V0TGluZShyb3cgLSAxKTtcbiAgICAgICAgdmFyIHByZXZJbmRlbnQgPSBwcmV2LnNlYXJjaCgvXFxTLyk7XG4gICAgICAgIHZhciBuZXh0SW5kZW50ID0gbmV4dC5zZWFyY2goL1xcUy8pO1xuXG4gICAgICAgIGlmIChpbmRlbnQgPT0gLTEpIHtcbiAgICAgICAgICAgIHNlc3Npb24uZm9sZFdpZGdldHNbcm93IC0gMV0gPSBwcmV2SW5kZW50IT0gLTEgJiYgcHJldkluZGVudCA8IG5leHRJbmRlbnQgPyBcInN0YXJ0XCIgOiBcIlwiO1xuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBkb2N1bWVudGF0aW9uIGNvbW1lbnRzXG4gICAgICAgIGlmIChwcmV2SW5kZW50ID09IC0xKSB7XG4gICAgICAgICAgICBpZiAoaW5kZW50ID09IG5leHRJbmRlbnQgJiYgbGluZVtpbmRlbnRdID09IFwiI1wiICYmIG5leHRbaW5kZW50XSA9PSBcIiNcIikge1xuICAgICAgICAgICAgICAgIHNlc3Npb24uZm9sZFdpZGdldHNbcm93IC0gMV0gPSBcIlwiO1xuICAgICAgICAgICAgICAgIHNlc3Npb24uZm9sZFdpZGdldHNbcm93ICsgMV0gPSBcIlwiO1xuICAgICAgICAgICAgICAgIHJldHVybiBcInN0YXJ0XCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAocHJldkluZGVudCA9PSBpbmRlbnQgJiYgbGluZVtpbmRlbnRdID09IFwiI1wiICYmIHByZXZbaW5kZW50XSA9PSBcIiNcIikge1xuICAgICAgICAgICAgaWYgKHNlc3Npb24uZ2V0TGluZShyb3cgLSAyKS5zZWFyY2goL1xcUy8pID09IC0xKSB7XG4gICAgICAgICAgICAgICAgc2Vzc2lvbi5mb2xkV2lkZ2V0c1tyb3cgLSAxXSA9IFwic3RhcnRcIjtcbiAgICAgICAgICAgICAgICBzZXNzaW9uLmZvbGRXaWRnZXRzW3JvdyArIDFdID0gXCJcIjtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcmV2SW5kZW50IT0gLTEgJiYgcHJldkluZGVudCA8IGluZGVudClcbiAgICAgICAgICAgIHNlc3Npb24uZm9sZFdpZGdldHNbcm93IC0gMV0gPSBcInN0YXJ0XCI7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHNlc3Npb24uZm9sZFdpZGdldHNbcm93IC0gMV0gPSBcIlwiO1xuXG4gICAgICAgIGlmIChpbmRlbnQgPCBuZXh0SW5kZW50KVxuICAgICAgICAgICAgcmV0dXJuIFwic3RhcnRcIjtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfTtcblxufSkuY2FsbChGb2xkTW9kZS5wcm90b3R5cGUpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9