"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[8389],{

/***/ 38389:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var BasicHighlightRules = (__webpack_require__(82546)/* .BasicHighlightRules */ .G);
var FoldMode = (__webpack_require__(37531)/* .FoldMode */ .l);

var Mode = function() {
    this.HighlightRules = BasicHighlightRules;
    this.foldingRules = new FoldMode();
    this.$behaviour = this.$defaultBehaviour;
    this.indentKeywords = this.foldingRules.indentKeywords;
};
oop.inherits(Mode, TextMode);

(function() {

    this.lineCommentStart = ["REM"];

    this.getMatching = function(session, row, column, tokenRange) {
        if (row == undefined) {
            var pos = session.selection.lead;
            column = pos.column;
            row = pos.row;
        }
        if (tokenRange == undefined)
            tokenRange = true;

        var startToken = session.getTokenAt(row, column);
        if (startToken) {
            var val = startToken.value.toLowerCase();
            if (val in this.indentKeywords)
                return this.foldingRules.basicBlock(session, row, column, tokenRange);
        }
    };

    this.$id = "ace/mode/basic";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 82546:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

var BasicHighlightRules = function () {

    var keywordMapper = this.createKeywordMapper({
        "keyword.control": "FOR|TO|NEXT|GOSUB|RETURN|IF|THEN|ELSE|GOTO|ON|WHILE|WEND|TRON|TROFF",
        "entity.name": "Auto|Call|Chain|Clear|Close|Common|Cont|Data|MERGE|ALL|Delete|DIM|EDIT|END|ERASE|ERROR|FIELD|"
            + "GET|INPUT|KILL|LET|LIST|LLIST|LOAD|LSET|RSET|MERGE|NEW|NULL|OPEN|OUT|POKE|PRINT|PUT|RANDOMIZE|READ|"
            + "RENUM|RESTORE|RESUME|RUN|SAVE|STOP|SWAP|WAIT|WIDTH",
        "keyword.operator": "Mod|And|Not|Or|Xor|Eqv|Imp",
        "support.function": "ABS|ASC|ATN|CDBL|CINT|COS|CSNG|CVI|CVS|CVD|EOF|EXP|FIX|FRE|INP|INSTR|INT|LEN|LOC|LOG|LPOS|"
            + "PEEK|POS|RND|SGN|SIN|SPC|SQR|TAB|TAN|USR|VAL|VARPTR"
    }, "identifier", true);

    this.$rules = {
        "start": [
            {
                token: "string",
                regex: /"(?:\\.|[^"\\])*"/
            },
            {
                token: "support.function",
                regex: /(HEX|CHR|INPUT|LEFT|MID|MKI|MKS|MKD|OCT|RIGHT|SPACE|STR|STRING)\$/
            }, {
                token: "entity.name",
                regex: /(?:DEF\s(?:SEG|USR|FN[a-zA-Z]+)|LINE\sINPUT|L?PRINT#?(?:\sUSING)?|MID\$|ON\sERROR\sGOTO|OPTION\sBASE|WRITE#?|DATE\$|INKEY\$|TIME\$)/
            }, {
                token: "variable",
                regex: /[a-zA-Z][a-zA-Z0-9_]{0,38}[$%!#]?(?=\s*=)/
            }, {
                token: "keyword.operator",
                regex: /\\|=|\^|\*|\/|\+|\-|<|>|-/
            }, {
                token: "paren.lparen",
                regex: /[([]/
            }, {
                token: "paren.rparen",
                regex: /[\)\]]/
            }, {
                token: "constant.numeric",
                regex: /[+-]?\d+(\.\d+)?([ED][+-]?\d+)?(?:[!#])?/
            }, {
                token: "constant.numeric", //hexal, octal
                regex: /&[HO]?[0-9A-F]+/
            }, {
                token: "comment",
                regex: /REM\s+.*$/
            }, {
                regex: "\\w+",
                token: keywordMapper
            },{
                token: "punctiation",
                regex: /[,;]/

            }
        ]

    };
    this.normalizeRules();
};

oop.inherits(BasicHighlightRules, TextHighlightRules);

exports.G = BasicHighlightRules;


/***/ }),

/***/ 37531:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var BaseFoldMode = (__webpack_require__(51358).FoldMode);
var Range = (__webpack_require__(91902)/* .Range */ .Q);
var TokenIterator = (__webpack_require__(99339).TokenIterator);


var FoldMode = exports.l = function() {};

oop.inherits(FoldMode, BaseFoldMode);

(function() {
    this.indentKeywords = {
        "tron": 1,
        "while": 1,
        "for": 1,
        "troff": -1,
        "wend": -1,
        "next": -1
    };

    this.foldingStartMarker = /(?:\s|^)(tron|while|for)\b/i;
    this.foldingStopMarker = /(?:\b)(troff|next|wend)\b/i;

    this.getFoldWidgetRange = function (session, foldStyle, row) {
        var line = session.getLine(row);
        var isStart = this.foldingStartMarker.test(line);
        var isEnd = this.foldingStopMarker.test(line);
        if (isStart || isEnd) {
            var match = (isEnd) ? this.foldingStopMarker.exec(line) : this.foldingStartMarker.exec(line);
            var keyword = match && match[1].toLowerCase();
            if (keyword) {
                var type = session.getTokenAt(row, match.index + 2).type;
                if (type === "keyword.control")
                    return this.basicBlock(session, row, match.index + 2);
            }
        }
    };


    this.getFoldWidget = function(session, foldStyle, row) {
        var line = session.getLine(row);
        var isStart = this.foldingStartMarker.test(line);
        var isEnd = this.foldingStopMarker.test(line);
        if (isStart && !isEnd) {
            var match = this.foldingStartMarker.exec(line);
            var keyword = match && match[1].toLowerCase();
            if (keyword) {
                var type = session.getTokenAt(row, match.index + 2).type;
                if (type == "keyword.control") {
                    return "start";
                }
            }
        }
        if (foldStyle != "markbeginend" || !isEnd || isStart && isEnd)
            return "";

        var match = line.match(this.foldingStopMarker);
        var keyword = match && match[1].toLowerCase();
        if (this.indentKeywords[keyword]) {
            if (session.getTokenAt(row, match.index + 2).type === "keyword.control")
                return "end";
        }

        return "";
    };

    this.basicBlock = function(session, row, column, tokenRange) {
        var stream = new TokenIterator(session, row, column);

        var token = stream.getCurrentToken();
        if (!token || token.type != "keyword.control")
            return;

        var val = token.value.toLowerCase();
        var stack = [val];
        var dir = this.indentKeywords[val];

        if (!dir)
            return;

        var startColumn = dir === -1 ? stream.getCurrentTokenColumn() : session.getLine(row).length;
        var startRow = row;

        stream.step = dir === -1 ? stream.stepBackward : stream.stepForward;
        while(token = stream.step()) {
            val = token.value.toLowerCase();
            if (token.type !== "keyword.control" || !this.indentKeywords[val])
                continue;
            var level = dir * this.indentKeywords[val];

            if (level > 0) {
                stack.unshift(val);
            } else if (level <= 0) {
                stack.shift();
            }
            if (stack.length === 0) {
                break;
            }
        }

        if (!token)
            return null;

        if (tokenRange)
            return stream.getCurrentTokenRange();

        var row = stream.getCurrentTokenRow();
        if (dir === -1)
            return new Range(row, session.getLine(row).length, startRow, startColumn);
        else
            return new Range(startRow, startColumn, row, stream.getCurrentTokenColumn());
    };

}).call(FoldMode.prototype);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjgzODkuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLElBQVk7QUFDOUIsZUFBZSxpQ0FBc0I7QUFDckMsMEJBQTBCLHlEQUFzRDtBQUNoRixlQUFlLDhDQUFtQzs7QUFFbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQsWUFBWTs7Ozs7Ozs7QUN2Q0M7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLElBQVk7QUFDOUIseUJBQXlCLHdEQUFvRDs7QUFFN0U7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLDZDQUE2QyxLQUFLO0FBQ2xELGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsMkJBQTJCOztBQUUzQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxTQUEyQjs7Ozs7Ozs7QUNsRWQ7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLElBQWU7QUFDakMsbUJBQW1CLHFDQUErQjtBQUNsRCxZQUFZLDJDQUE0QjtBQUN4QyxvQkFBb0IsMENBQTZDOzs7QUFHakUsZUFBZSxTQUFnQjs7QUFFL0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9iYXNpYy5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2Jhc2ljX2hpZ2hsaWdodF9ydWxlcy5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2ZvbGRpbmcvYmFzaWMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0TW9kZSA9IHJlcXVpcmUoXCIuL3RleHRcIikuTW9kZTtcbnZhciBCYXNpY0hpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vYmFzaWNfaGlnaGxpZ2h0X3J1bGVzXCIpLkJhc2ljSGlnaGxpZ2h0UnVsZXM7XG52YXIgRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9mb2xkaW5nL2Jhc2ljXCIpLkZvbGRNb2RlO1xuXG52YXIgTW9kZSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuSGlnaGxpZ2h0UnVsZXMgPSBCYXNpY0hpZ2hsaWdodFJ1bGVzO1xuICAgIHRoaXMuZm9sZGluZ1J1bGVzID0gbmV3IEZvbGRNb2RlKCk7XG4gICAgdGhpcy4kYmVoYXZpb3VyID0gdGhpcy4kZGVmYXVsdEJlaGF2aW91cjtcbiAgICB0aGlzLmluZGVudEtleXdvcmRzID0gdGhpcy5mb2xkaW5nUnVsZXMuaW5kZW50S2V5d29yZHM7XG59O1xub29wLmluaGVyaXRzKE1vZGUsIFRleHRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5saW5lQ29tbWVudFN0YXJ0ID0gW1wiUkVNXCJdO1xuXG4gICAgdGhpcy5nZXRNYXRjaGluZyA9IGZ1bmN0aW9uKHNlc3Npb24sIHJvdywgY29sdW1uLCB0b2tlblJhbmdlKSB7XG4gICAgICAgIGlmIChyb3cgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB2YXIgcG9zID0gc2Vzc2lvbi5zZWxlY3Rpb24ubGVhZDtcbiAgICAgICAgICAgIGNvbHVtbiA9IHBvcy5jb2x1bW47XG4gICAgICAgICAgICByb3cgPSBwb3Mucm93O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0b2tlblJhbmdlID09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHRva2VuUmFuZ2UgPSB0cnVlO1xuXG4gICAgICAgIHZhciBzdGFydFRva2VuID0gc2Vzc2lvbi5nZXRUb2tlbkF0KHJvdywgY29sdW1uKTtcbiAgICAgICAgaWYgKHN0YXJ0VG9rZW4pIHtcbiAgICAgICAgICAgIHZhciB2YWwgPSBzdGFydFRva2VuLnZhbHVlLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBpZiAodmFsIGluIHRoaXMuaW5kZW50S2V5d29yZHMpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZm9sZGluZ1J1bGVzLmJhc2ljQmxvY2soc2Vzc2lvbiwgcm93LCBjb2x1bW4sIHRva2VuUmFuZ2UpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMuJGlkID0gXCJhY2UvbW9kZS9iYXNpY1wiO1xufSkuY2FsbChNb2RlLnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTW9kZSA9IE1vZGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcblxudmFyIEJhc2ljSGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIga2V5d29yZE1hcHBlciA9IHRoaXMuY3JlYXRlS2V5d29yZE1hcHBlcih7XG4gICAgICAgIFwia2V5d29yZC5jb250cm9sXCI6IFwiRk9SfFRPfE5FWFR8R09TVUJ8UkVUVVJOfElGfFRIRU58RUxTRXxHT1RPfE9OfFdISUxFfFdFTkR8VFJPTnxUUk9GRlwiLFxuICAgICAgICBcImVudGl0eS5uYW1lXCI6IFwiQXV0b3xDYWxsfENoYWlufENsZWFyfENsb3NlfENvbW1vbnxDb250fERhdGF8TUVSR0V8QUxMfERlbGV0ZXxESU18RURJVHxFTkR8RVJBU0V8RVJST1J8RklFTER8XCJcbiAgICAgICAgICAgICsgXCJHRVR8SU5QVVR8S0lMTHxMRVR8TElTVHxMTElTVHxMT0FEfExTRVR8UlNFVHxNRVJHRXxORVd8TlVMTHxPUEVOfE9VVHxQT0tFfFBSSU5UfFBVVHxSQU5ET01JWkV8UkVBRHxcIlxuICAgICAgICAgICAgKyBcIlJFTlVNfFJFU1RPUkV8UkVTVU1FfFJVTnxTQVZFfFNUT1B8U1dBUHxXQUlUfFdJRFRIXCIsXG4gICAgICAgIFwia2V5d29yZC5vcGVyYXRvclwiOiBcIk1vZHxBbmR8Tm90fE9yfFhvcnxFcXZ8SW1wXCIsXG4gICAgICAgIFwic3VwcG9ydC5mdW5jdGlvblwiOiBcIkFCU3xBU0N8QVROfENEQkx8Q0lOVHxDT1N8Q1NOR3xDVkl8Q1ZTfENWRHxFT0Z8RVhQfEZJWHxGUkV8SU5QfElOU1RSfElOVHxMRU58TE9DfExPR3xMUE9TfFwiXG4gICAgICAgICAgICArIFwiUEVFS3xQT1N8Uk5EfFNHTnxTSU58U1BDfFNRUnxUQUJ8VEFOfFVTUnxWQUx8VkFSUFRSXCJcbiAgICB9LCBcImlkZW50aWZpZXJcIiwgdHJ1ZSk7XG5cbiAgICB0aGlzLiRydWxlcyA9IHtcbiAgICAgICAgXCJzdGFydFwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IC9cIig/OlxcXFwufFteXCJcXFxcXSkqXCIvXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInN1cHBvcnQuZnVuY3Rpb25cIixcbiAgICAgICAgICAgICAgICByZWdleDogLyhIRVh8Q0hSfElOUFVUfExFRlR8TUlEfE1LSXxNS1N8TUtEfE9DVHxSSUdIVHxTUEFDRXxTVFJ8U1RSSU5HKVxcJC9cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJlbnRpdHkubmFtZVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvKD86REVGXFxzKD86U0VHfFVTUnxGTlthLXpBLVpdKyl8TElORVxcc0lOUFVUfEw/UFJJTlQjPyg/Olxcc1VTSU5HKT98TUlEXFwkfE9OXFxzRVJST1JcXHNHT1RPfE9QVElPTlxcc0JBU0V8V1JJVEUjP3xEQVRFXFwkfElOS0VZXFwkfFRJTUVcXCQpL1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInZhcmlhYmxlXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IC9bYS16QS1aXVthLXpBLVowLTlfXXswLDM4fVskJSEjXT8oPz1cXHMqPSkvXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwia2V5d29yZC5vcGVyYXRvclwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvXFxcXHw9fFxcXnxcXCp8XFwvfFxcK3xcXC18PHw+fC0vXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwicGFyZW4ubHBhcmVuXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IC9bKFtdL1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInBhcmVuLnJwYXJlblwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvW1xcKVxcXV0vXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQubnVtZXJpY1wiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvWystXT9cXGQrKFxcLlxcZCspPyhbRURdWystXT9cXGQrKT8oPzpbISNdKT8vXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQubnVtZXJpY1wiLCAvL2hleGFsLCBvY3RhbFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvJltIT10/WzAtOUEtRl0rL1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcImNvbW1lbnRcIixcbiAgICAgICAgICAgICAgICByZWdleDogL1JFTVxccysuKiQvXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiXFxcXHcrXCIsXG4gICAgICAgICAgICAgICAgdG9rZW46IGtleXdvcmRNYXBwZXJcbiAgICAgICAgICAgIH0se1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInB1bmN0aWF0aW9uXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IC9bLDtdL1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cblxuICAgIH07XG4gICAgdGhpcy5ub3JtYWxpemVSdWxlcygpO1xufTtcblxub29wLmluaGVyaXRzKEJhc2ljSGlnaGxpZ2h0UnVsZXMsIFRleHRIaWdobGlnaHRSdWxlcyk7XG5cbmV4cG9ydHMuQmFzaWNIaWdobGlnaHRSdWxlcyA9IEJhc2ljSGlnaGxpZ2h0UnVsZXM7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi8uLi9saWIvb29wXCIpO1xudmFyIEJhc2VGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRfbW9kZVwiKS5Gb2xkTW9kZTtcbnZhciBSYW5nZSA9IHJlcXVpcmUoXCIuLi8uLi9yYW5nZVwiKS5SYW5nZTtcbnZhciBUb2tlbkl0ZXJhdG9yID0gcmVxdWlyZShcIi4uLy4uL3Rva2VuX2l0ZXJhdG9yXCIpLlRva2VuSXRlcmF0b3I7XG5cblxudmFyIEZvbGRNb2RlID0gZXhwb3J0cy5Gb2xkTW9kZSA9IGZ1bmN0aW9uKCkge307XG5cbm9vcC5pbmhlcml0cyhGb2xkTW9kZSwgQmFzZUZvbGRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuaW5kZW50S2V5d29yZHMgPSB7XG4gICAgICAgIFwidHJvblwiOiAxLFxuICAgICAgICBcIndoaWxlXCI6IDEsXG4gICAgICAgIFwiZm9yXCI6IDEsXG4gICAgICAgIFwidHJvZmZcIjogLTEsXG4gICAgICAgIFwid2VuZFwiOiAtMSxcbiAgICAgICAgXCJuZXh0XCI6IC0xXG4gICAgfTtcblxuICAgIHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyID0gLyg/Olxcc3xeKSh0cm9ufHdoaWxlfGZvcilcXGIvaTtcbiAgICB0aGlzLmZvbGRpbmdTdG9wTWFya2VyID0gLyg/OlxcYikodHJvZmZ8bmV4dHx3ZW5kKVxcYi9pO1xuXG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0UmFuZ2UgPSBmdW5jdGlvbiAoc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgdmFyIGlzU3RhcnQgPSB0aGlzLmZvbGRpbmdTdGFydE1hcmtlci50ZXN0KGxpbmUpO1xuICAgICAgICB2YXIgaXNFbmQgPSB0aGlzLmZvbGRpbmdTdG9wTWFya2VyLnRlc3QobGluZSk7XG4gICAgICAgIGlmIChpc1N0YXJ0IHx8IGlzRW5kKSB7XG4gICAgICAgICAgICB2YXIgbWF0Y2ggPSAoaXNFbmQpID8gdGhpcy5mb2xkaW5nU3RvcE1hcmtlci5leGVjKGxpbmUpIDogdGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIuZXhlYyhsaW5lKTtcbiAgICAgICAgICAgIHZhciBrZXl3b3JkID0gbWF0Y2ggJiYgbWF0Y2hbMV0udG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGlmIChrZXl3b3JkKSB7XG4gICAgICAgICAgICAgICAgdmFyIHR5cGUgPSBzZXNzaW9uLmdldFRva2VuQXQocm93LCBtYXRjaC5pbmRleCArIDIpLnR5cGU7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09IFwia2V5d29yZC5jb250cm9sXCIpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJhc2ljQmxvY2soc2Vzc2lvbiwgcm93LCBtYXRjaC5pbmRleCArIDIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuXG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0ID0gZnVuY3Rpb24oc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgdmFyIGlzU3RhcnQgPSB0aGlzLmZvbGRpbmdTdGFydE1hcmtlci50ZXN0KGxpbmUpO1xuICAgICAgICB2YXIgaXNFbmQgPSB0aGlzLmZvbGRpbmdTdG9wTWFya2VyLnRlc3QobGluZSk7XG4gICAgICAgIGlmIChpc1N0YXJ0ICYmICFpc0VuZCkge1xuICAgICAgICAgICAgdmFyIG1hdGNoID0gdGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIuZXhlYyhsaW5lKTtcbiAgICAgICAgICAgIHZhciBrZXl3b3JkID0gbWF0Y2ggJiYgbWF0Y2hbMV0udG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGlmIChrZXl3b3JkKSB7XG4gICAgICAgICAgICAgICAgdmFyIHR5cGUgPSBzZXNzaW9uLmdldFRva2VuQXQocm93LCBtYXRjaC5pbmRleCArIDIpLnR5cGU7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgPT0gXCJrZXl3b3JkLmNvbnRyb2xcIikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJzdGFydFwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZm9sZFN0eWxlICE9IFwibWFya2JlZ2luZW5kXCIgfHwgIWlzRW5kIHx8IGlzU3RhcnQgJiYgaXNFbmQpXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcblxuICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIpO1xuICAgICAgICB2YXIga2V5d29yZCA9IG1hdGNoICYmIG1hdGNoWzFdLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGlmICh0aGlzLmluZGVudEtleXdvcmRzW2tleXdvcmRdKSB7XG4gICAgICAgICAgICBpZiAoc2Vzc2lvbi5nZXRUb2tlbkF0KHJvdywgbWF0Y2guaW5kZXggKyAyKS50eXBlID09PSBcImtleXdvcmQuY29udHJvbFwiKVxuICAgICAgICAgICAgICAgIHJldHVybiBcImVuZFwiO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfTtcblxuICAgIHRoaXMuYmFzaWNCbG9jayA9IGZ1bmN0aW9uKHNlc3Npb24sIHJvdywgY29sdW1uLCB0b2tlblJhbmdlKSB7XG4gICAgICAgIHZhciBzdHJlYW0gPSBuZXcgVG9rZW5JdGVyYXRvcihzZXNzaW9uLCByb3csIGNvbHVtbik7XG5cbiAgICAgICAgdmFyIHRva2VuID0gc3RyZWFtLmdldEN1cnJlbnRUb2tlbigpO1xuICAgICAgICBpZiAoIXRva2VuIHx8IHRva2VuLnR5cGUgIT0gXCJrZXl3b3JkLmNvbnRyb2xcIilcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB2YXIgdmFsID0gdG9rZW4udmFsdWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgdmFyIHN0YWNrID0gW3ZhbF07XG4gICAgICAgIHZhciBkaXIgPSB0aGlzLmluZGVudEtleXdvcmRzW3ZhbF07XG5cbiAgICAgICAgaWYgKCFkaXIpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdmFyIHN0YXJ0Q29sdW1uID0gZGlyID09PSAtMSA/IHN0cmVhbS5nZXRDdXJyZW50VG9rZW5Db2x1bW4oKSA6IHNlc3Npb24uZ2V0TGluZShyb3cpLmxlbmd0aDtcbiAgICAgICAgdmFyIHN0YXJ0Um93ID0gcm93O1xuXG4gICAgICAgIHN0cmVhbS5zdGVwID0gZGlyID09PSAtMSA/IHN0cmVhbS5zdGVwQmFja3dhcmQgOiBzdHJlYW0uc3RlcEZvcndhcmQ7XG4gICAgICAgIHdoaWxlKHRva2VuID0gc3RyZWFtLnN0ZXAoKSkge1xuICAgICAgICAgICAgdmFsID0gdG9rZW4udmFsdWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGlmICh0b2tlbi50eXBlICE9PSBcImtleXdvcmQuY29udHJvbFwiIHx8ICF0aGlzLmluZGVudEtleXdvcmRzW3ZhbF0pXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB2YXIgbGV2ZWwgPSBkaXIgKiB0aGlzLmluZGVudEtleXdvcmRzW3ZhbF07XG5cbiAgICAgICAgICAgIGlmIChsZXZlbCA+IDApIHtcbiAgICAgICAgICAgICAgICBzdGFjay51bnNoaWZ0KHZhbCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGxldmVsIDw9IDApIHtcbiAgICAgICAgICAgICAgICBzdGFjay5zaGlmdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHN0YWNrLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0b2tlbilcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuXG4gICAgICAgIGlmICh0b2tlblJhbmdlKVxuICAgICAgICAgICAgcmV0dXJuIHN0cmVhbS5nZXRDdXJyZW50VG9rZW5SYW5nZSgpO1xuXG4gICAgICAgIHZhciByb3cgPSBzdHJlYW0uZ2V0Q3VycmVudFRva2VuUm93KCk7XG4gICAgICAgIGlmIChkaXIgPT09IC0xKVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShyb3csIHNlc3Npb24uZ2V0TGluZShyb3cpLmxlbmd0aCwgc3RhcnRSb3csIHN0YXJ0Q29sdW1uKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShzdGFydFJvdywgc3RhcnRDb2x1bW4sIHJvdywgc3RyZWFtLmdldEN1cnJlbnRUb2tlbkNvbHVtbigpKTtcbiAgICB9O1xuXG59KS5jYWxsKEZvbGRNb2RlLnByb3RvdHlwZSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=