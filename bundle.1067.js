"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[1067],{

/***/ 50625:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var BaseFoldMode = (__webpack_require__(51358).FoldMode);
var Range = (__webpack_require__(91902)/* .Range */ .Q);
var TokenIterator = (__webpack_require__(99339).TokenIterator);


var FoldMode = exports.l = function () {
};

oop.inherits(FoldMode, BaseFoldMode);

(function () {
    this.indentKeywords = {
        "class": 1,
        "def": 1,
        "module": 1,
        "do": 1,
        "unless": 1,
        "if": 1,
        "while": 1,
        "for": 1,
        "until": 1,
        "begin": 1,
        "else": 0,
        "elsif": 0,
        "rescue": 0,
        "ensure": 0,
        "when": 0,
        "end": -1,
        "case": 1,
        "=begin": 1,
        "=end": -1
    };

    this.foldingStartMarker = /(?:\s|^)(def|do|while|class|unless|module|if|for|until|begin|else|elsif|case|rescue|ensure|when)\b|({\s*$)|(=begin)/;
    this.foldingStopMarker = /(=end(?=$|\s.*$))|(^\s*})|\b(end)\b/;

    this.getFoldWidget = function (session, foldStyle, row) {
        var line = session.getLine(row);
        var isStart = this.foldingStartMarker.test(line);
        var isEnd = this.foldingStopMarker.test(line);

        if (isStart && !isEnd) {
            var match = line.match(this.foldingStartMarker);
            if (match[1]) {
                if (match[1] == "if" || match[1] == "else" || match[1] == "while" || match[1] == "until" || match[1] == "unless") {
                    if (match[1] == "else" && /^\s*else\s*$/.test(line) === false) {
                        return;
                    }
                    if (/^\s*(?:if|else|while|until|unless)\s*/.test(line) === false) {
                        return;
                    }
                }

                if (match[1] == "when") {
                    if (/\sthen\s/.test(line) === true) {
                        return;
                    }
                }
                if (session.getTokenAt(row, match.index + 2).type === "keyword")
                    return "start";
            } else if (match[3]) {
                if (session.getTokenAt(row, match.index + 1).type === "comment.multiline")
                    return "start";
            } else {
                return "start";
            }
        }
        if (foldStyle != "markbeginend" || !isEnd || isStart && isEnd)
            return "";

        var match = line.match(this.foldingStopMarker);
        if (match[3] === "end") {
            if (session.getTokenAt(row, match.index + 1).type === "keyword")
                return "end";
        } else if (match[1]) {
            if (session.getTokenAt(row, match.index + 1).type === "comment.multiline")
                return "end";
        } else
            return "end";
    };

    this.getFoldWidgetRange = function (session, foldStyle, row) {
        var line = session.doc.getLine(row);
        var match = this.foldingStartMarker.exec(line);
        if (match) {
            if (match[1] || match[3])
                return this.rubyBlock(session, row, match.index + 2);

            return this.openingBracketBlock(session, "{", row, match.index);
        }

        var match = this.foldingStopMarker.exec(line);
        if (match) {
            if (match[3] === "end") {
                if (session.getTokenAt(row, match.index + 1).type === "keyword")
                    return this.rubyBlock(session, row, match.index + 1);
            }

            if (match[1] === "=end") {
                if (session.getTokenAt(row, match.index + 1).type === "comment.multiline")
                    return this.rubyBlock(session, row, match.index + 1);
            }

            return this.closingBracketBlock(session, "}", row, match.index + match[0].length);
        }
    };

    this.rubyBlock = function (session, row, column, tokenRange) {
        var stream = new TokenIterator(session, row, column);

        var token = stream.getCurrentToken();
        if (!token || (token.type != "keyword" && token.type != "comment.multiline"))
            return;

        var val = token.value;
        var line = session.getLine(row);
        switch (token.value) {
            case "if":
            case "unless":
            case "while":
            case "until":
                var checkToken = new RegExp("^\\s*" + token.value);
                if (!checkToken.test(line)) {
                    return;
                }
                var dir = this.indentKeywords[val];
                break;
            case "when":
                if (/\sthen\s/.test(line)) {
                    return;
                }
            case "elsif":
            case "rescue":
            case "ensure":
                var dir = 1;
                break;
            case "else":
                var checkToken = new RegExp("^\\s*" + token.value + "\\s*$");
                if (!checkToken.test(line)) {
                    return;
                }
                var dir = 1;
                break;
            default:
                var dir = this.indentKeywords[val];
                break;
        }

        var stack = [val];
        if (!dir)
            return;

        var startColumn = dir === -1 ? session.getLine(row - 1).length : session.getLine(row).length;
        var startRow = row;
        var ranges = [];
        ranges.push(stream.getCurrentTokenRange());

        stream.step = dir === -1 ? stream.stepBackward : stream.stepForward;
        if (token.type == "comment.multiline") {
            while (token = stream.step()) {
                if (token.type !== "comment.multiline")
                    continue;
                if (dir == 1) {
                    startColumn = 6;
                    if (token.value == "=end") {
                        break;
                    }
                } else {
                    if (token.value == "=begin") {
                        break;
                    }
                }
            }
        } else {
            while (token = stream.step()) {
                var ignore = false;
                if (token.type !== "keyword")
                    continue;
                var level = dir * this.indentKeywords[token.value];
                line = session.getLine(stream.getCurrentTokenRow());
                switch (token.value) {
                    case "do":
                        for (var i = stream.$tokenIndex - 1; i >= 0; i--) {
                            var prevToken = stream.$rowTokens[i];
                            if (prevToken && (prevToken.value == "while" || prevToken.value == "until" || prevToken.value == "for")) {
                                level = 0;
                                break;
                            }
                        }
                        break;
                    case "else":
                        var checkToken = new RegExp("^\\s*" + token.value + "\\s*$");
                        if (!checkToken.test(line) || val == "case") {
                            level = 0;
                            ignore = true;
                        }
                        break;
                    case "if":
                    case "unless":
                    case "while":
                    case "until":
                        var checkToken = new RegExp("^\\s*" + token.value);
                        if (!checkToken.test(line)) {
                            level = 0;
                            ignore = true;
                        }
                        break;
                    case "when":
                        if (/\sthen\s/.test(line) || val == "case") {
                            level = 0;
                            ignore = true;
                        }
                        break;
                }

                if (level > 0) {
                    stack.unshift(token.value);
                } else if (level <= 0 && ignore === false) {
                    stack.shift();
                    if (!stack.length) {
                        if ((val == "while" || val == "until" || val == "for") && token.value != "do") {
                            break;
                        }
                        if (token.value == "do" && dir == -1 && level != 0)
                            break;
                        if (token.value != "do")
                            break;
                    }

                    if (level === 0) {
                        stack.unshift(token.value);
                    }
                }
            }
        }

        if (!token)
            return null;

        if (tokenRange) {
            ranges.push(stream.getCurrentTokenRange());
            return ranges;
        }

        var row = stream.getCurrentTokenRow();
        if (dir === -1) {
            if (token.type === "comment.multiline") {
                var endColumn = 6;
            } else {
                var endColumn = session.getLine(row).length;
            }
            return new Range(row, endColumn, startRow - 1, startColumn);
        } else
            return new Range(startRow, startColumn, row - 1, session.getLine(row - 1).length);
    };

}).call(FoldMode.prototype);


/***/ }),

/***/ 28670:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var Range = (__webpack_require__(91902)/* .Range */ .Q);

var MatchingBraceOutdent = function() {};

(function() {

    this.checkOutdent = function(line, input) {
        if (! /^\s+$/.test(line))
            return false;

        return /^\s*\}/.test(input);
    };

    this.autoOutdent = function(doc, row) {
        var line = doc.getLine(row);
        var match = line.match(/^(\s*\})/);

        if (!match) return 0;

        var column = match[1].length;
        var openBracePos = doc.findMatchingBracket({row: row, column: column});

        if (!openBracePos || openBracePos.row == row) return 0;

        var indent = this.$getIndent(doc.getLine(openBracePos.row));
        doc.replace(new Range(row, 0, row, column-1), indent);
    };

    this.$getIndent = function(line) {
        return line.match(/^\s*/)[0];
    };

}).call(MatchingBraceOutdent.prototype);

exports.MatchingBraceOutdent = MatchingBraceOutdent;


/***/ }),

/***/ 11067:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var RubyHighlightRules = (__webpack_require__(54848).RubyHighlightRules);
var MatchingBraceOutdent = (__webpack_require__(28670).MatchingBraceOutdent);
var Range = (__webpack_require__(91902)/* .Range */ .Q);
var FoldMode = (__webpack_require__(50625)/* .FoldMode */ .l);

var Mode = function() {
    this.HighlightRules = RubyHighlightRules;
    this.$outdent = new MatchingBraceOutdent();
    this.$behaviour = this.$defaultBehaviour;
    this.foldingRules = new FoldMode();
    this.indentKeywords = this.foldingRules.indentKeywords;
};
oop.inherits(Mode, TextMode);

(function() {


    this.lineCommentStart = "#";

    this.getNextLineIndent = function(state, line, tab) {
        var indent = this.$getIndent(line);

        var tokenizedLine = this.getTokenizer().getLineTokens(line, state);
        var tokens = tokenizedLine.tokens;

        if (tokens.length && tokens[tokens.length - 1].type == "comment") {
            return indent;
        }

        if (state == "start") {
            var match = line.match(/^.*[\{\(\[]\s*$/);
            var startingClassOrMethod = line.match(/^\s*(class|def|module)\s.*$/);
            var startingDoBlock = line.match(/.*do(\s*|\s+\|.*\|\s*)$/);
            var startingConditional = line.match(/^\s*(if|else|when|elsif|unless|while|for|begin|rescue|ensure)\s*/);
            if (match || startingClassOrMethod || startingDoBlock || startingConditional) {
                indent += tab;
            }
        }

        return indent;
    };

    this.checkOutdent = function(state, line, input) {
        return /^\s+(end|else|rescue|ensure)$/.test(line + input) || this.$outdent.checkOutdent(line, input);
    };

    this.autoOutdent = function(state, session, row) {
        var line = session.getLine(row);
        if (/}/.test(line))
            return this.$outdent.autoOutdent(session, row);
        var indent = this.$getIndent(line);
        var prevLine = session.getLine(row - 1);
        var prevIndent = this.$getIndent(prevLine);
        var tab = session.getTabString();
        if (prevIndent.length <= indent.length) {
            if (indent.slice(-tab.length) == tab)
                session.remove(new Range(row, indent.length - tab.length, row, indent.length));
        }
    };

    this.getMatching = function(session, row, column) {
        if (row == undefined) {
            var pos = session.selection.lead;
            column = pos.column;
            row = pos.row;
        }

        var startToken = session.getTokenAt(row, column);
        if (startToken && startToken.value in this.indentKeywords)
            return this.foldingRules.rubyBlock(session, row, column, true);
    };

    this.$id = "ace/mode/ruby";
    this.snippetFileId = "ace/snippets/ruby";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjEwNjcuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLElBQWU7QUFDakMsbUJBQW1CLHFDQUErQjtBQUNsRCxZQUFZLDJDQUE0QjtBQUN4QyxvQkFBb0IsMENBQTZDOzs7QUFHakUsZUFBZSxTQUFnQjtBQUMvQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxvSUFBb0k7QUFDcEksc0RBQXNEOztBQUV0RDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHVEQUF1RDtBQUN2RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsdURBQXVEO0FBQ3ZEO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2REFBNkQsUUFBUTtBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBOztBQUVBLENBQUM7Ozs7Ozs7O0FDblFZOztBQUViLFlBQVksMkNBQXlCOztBQUVyQzs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsc0JBQXNCO0FBQ3RCOztBQUVBO0FBQ0E7QUFDQSx1Q0FBdUM7O0FBRXZDOztBQUVBO0FBQ0Esb0RBQW9ELHlCQUF5Qjs7QUFFN0U7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDOztBQUVELDRCQUE0Qjs7Ozs7Ozs7QUNwQ2Y7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLElBQVk7QUFDOUIsZUFBZSxpQ0FBc0I7QUFDckMseUJBQXlCLCtDQUFvRDtBQUM3RSwyQkFBMkIsaURBQXdEO0FBQ25GLFlBQVksMkNBQXlCO0FBQ3JDLGVBQWUsOENBQWtDOztBQUVqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7QUFHQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMENBQTBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVELFlBQVkiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2ZvbGRpbmcvcnVieS5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL21hdGNoaW5nX2JyYWNlX291dGRlbnQuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9ydWJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uLy4uL2xpYi9vb3BcIik7XG52YXIgQmFzZUZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZF9tb2RlXCIpLkZvbGRNb2RlO1xudmFyIFJhbmdlID0gcmVxdWlyZShcIi4uLy4uL3JhbmdlXCIpLlJhbmdlO1xudmFyIFRva2VuSXRlcmF0b3IgPSByZXF1aXJlKFwiLi4vLi4vdG9rZW5faXRlcmF0b3JcIikuVG9rZW5JdGVyYXRvcjtcblxuXG52YXIgRm9sZE1vZGUgPSBleHBvcnRzLkZvbGRNb2RlID0gZnVuY3Rpb24gKCkge1xufTtcblxub29wLmluaGVyaXRzKEZvbGRNb2RlLCBCYXNlRm9sZE1vZGUpO1xuXG4oZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuaW5kZW50S2V5d29yZHMgPSB7XG4gICAgICAgIFwiY2xhc3NcIjogMSxcbiAgICAgICAgXCJkZWZcIjogMSxcbiAgICAgICAgXCJtb2R1bGVcIjogMSxcbiAgICAgICAgXCJkb1wiOiAxLFxuICAgICAgICBcInVubGVzc1wiOiAxLFxuICAgICAgICBcImlmXCI6IDEsXG4gICAgICAgIFwid2hpbGVcIjogMSxcbiAgICAgICAgXCJmb3JcIjogMSxcbiAgICAgICAgXCJ1bnRpbFwiOiAxLFxuICAgICAgICBcImJlZ2luXCI6IDEsXG4gICAgICAgIFwiZWxzZVwiOiAwLFxuICAgICAgICBcImVsc2lmXCI6IDAsXG4gICAgICAgIFwicmVzY3VlXCI6IDAsXG4gICAgICAgIFwiZW5zdXJlXCI6IDAsXG4gICAgICAgIFwid2hlblwiOiAwLFxuICAgICAgICBcImVuZFwiOiAtMSxcbiAgICAgICAgXCJjYXNlXCI6IDEsXG4gICAgICAgIFwiPWJlZ2luXCI6IDEsXG4gICAgICAgIFwiPWVuZFwiOiAtMVxuICAgIH07XG5cbiAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlciA9IC8oPzpcXHN8XikoZGVmfGRvfHdoaWxlfGNsYXNzfHVubGVzc3xtb2R1bGV8aWZ8Zm9yfHVudGlsfGJlZ2lufGVsc2V8ZWxzaWZ8Y2FzZXxyZXNjdWV8ZW5zdXJlfHdoZW4pXFxifCh7XFxzKiQpfCg9YmVnaW4pLztcbiAgICB0aGlzLmZvbGRpbmdTdG9wTWFya2VyID0gLyg9ZW5kKD89JHxcXHMuKiQpKXwoXlxccyp9KXxcXGIoZW5kKVxcYi87XG5cbiAgICB0aGlzLmdldEZvbGRXaWRnZXQgPSBmdW5jdGlvbiAoc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgdmFyIGlzU3RhcnQgPSB0aGlzLmZvbGRpbmdTdGFydE1hcmtlci50ZXN0KGxpbmUpO1xuICAgICAgICB2YXIgaXNFbmQgPSB0aGlzLmZvbGRpbmdTdG9wTWFya2VyLnRlc3QobGluZSk7XG5cbiAgICAgICAgaWYgKGlzU3RhcnQgJiYgIWlzRW5kKSB7XG4gICAgICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyKTtcbiAgICAgICAgICAgIGlmIChtYXRjaFsxXSkge1xuICAgICAgICAgICAgICAgIGlmIChtYXRjaFsxXSA9PSBcImlmXCIgfHwgbWF0Y2hbMV0gPT0gXCJlbHNlXCIgfHwgbWF0Y2hbMV0gPT0gXCJ3aGlsZVwiIHx8IG1hdGNoWzFdID09IFwidW50aWxcIiB8fCBtYXRjaFsxXSA9PSBcInVubGVzc1wiKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXRjaFsxXSA9PSBcImVsc2VcIiAmJiAvXlxccyplbHNlXFxzKiQvLnRlc3QobGluZSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKC9eXFxzKig/OmlmfGVsc2V8d2hpbGV8dW50aWx8dW5sZXNzKVxccyovLnRlc3QobGluZSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAobWF0Y2hbMV0gPT0gXCJ3aGVuXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKC9cXHN0aGVuXFxzLy50ZXN0KGxpbmUpID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHNlc3Npb24uZ2V0VG9rZW5BdChyb3csIG1hdGNoLmluZGV4ICsgMikudHlwZSA9PT0gXCJrZXl3b3JkXCIpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcInN0YXJ0XCI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1hdGNoWzNdKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNlc3Npb24uZ2V0VG9rZW5BdChyb3csIG1hdGNoLmluZGV4ICsgMSkudHlwZSA9PT0gXCJjb21tZW50Lm11bHRpbGluZVwiKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJzdGFydFwiO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJzdGFydFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChmb2xkU3R5bGUgIT0gXCJtYXJrYmVnaW5lbmRcIiB8fCAhaXNFbmQgfHwgaXNTdGFydCAmJiBpc0VuZClcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xuXG4gICAgICAgIHZhciBtYXRjaCA9IGxpbmUubWF0Y2godGhpcy5mb2xkaW5nU3RvcE1hcmtlcik7XG4gICAgICAgIGlmIChtYXRjaFszXSA9PT0gXCJlbmRcIikge1xuICAgICAgICAgICAgaWYgKHNlc3Npb24uZ2V0VG9rZW5BdChyb3csIG1hdGNoLmluZGV4ICsgMSkudHlwZSA9PT0gXCJrZXl3b3JkXCIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiZW5kXCI7XG4gICAgICAgIH0gZWxzZSBpZiAobWF0Y2hbMV0pIHtcbiAgICAgICAgICAgIGlmIChzZXNzaW9uLmdldFRva2VuQXQocm93LCBtYXRjaC5pbmRleCArIDEpLnR5cGUgPT09IFwiY29tbWVudC5tdWx0aWxpbmVcIilcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJlbmRcIjtcbiAgICAgICAgfSBlbHNlXG4gICAgICAgICAgICByZXR1cm4gXCJlbmRcIjtcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0UmFuZ2UgPSBmdW5jdGlvbiAoc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmRvYy5nZXRMaW5lKHJvdyk7XG4gICAgICAgIHZhciBtYXRjaCA9IHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyLmV4ZWMobGluZSk7XG4gICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgaWYgKG1hdGNoWzFdIHx8IG1hdGNoWzNdKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJ1YnlCbG9jayhzZXNzaW9uLCByb3csIG1hdGNoLmluZGV4ICsgMik7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9wZW5pbmdCcmFja2V0QmxvY2soc2Vzc2lvbiwgXCJ7XCIsIHJvdywgbWF0Y2guaW5kZXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG1hdGNoID0gdGhpcy5mb2xkaW5nU3RvcE1hcmtlci5leGVjKGxpbmUpO1xuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIGlmIChtYXRjaFszXSA9PT0gXCJlbmRcIikge1xuICAgICAgICAgICAgICAgIGlmIChzZXNzaW9uLmdldFRva2VuQXQocm93LCBtYXRjaC5pbmRleCArIDEpLnR5cGUgPT09IFwia2V5d29yZFwiKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5ydWJ5QmxvY2soc2Vzc2lvbiwgcm93LCBtYXRjaC5pbmRleCArIDEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobWF0Y2hbMV0gPT09IFwiPWVuZFwiKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNlc3Npb24uZ2V0VG9rZW5BdChyb3csIG1hdGNoLmluZGV4ICsgMSkudHlwZSA9PT0gXCJjb21tZW50Lm11bHRpbGluZVwiKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5ydWJ5QmxvY2soc2Vzc2lvbiwgcm93LCBtYXRjaC5pbmRleCArIDEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jbG9zaW5nQnJhY2tldEJsb2NrKHNlc3Npb24sIFwifVwiLCByb3csIG1hdGNoLmluZGV4ICsgbWF0Y2hbMF0ubGVuZ3RoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLnJ1YnlCbG9jayA9IGZ1bmN0aW9uIChzZXNzaW9uLCByb3csIGNvbHVtbiwgdG9rZW5SYW5nZSkge1xuICAgICAgICB2YXIgc3RyZWFtID0gbmV3IFRva2VuSXRlcmF0b3Ioc2Vzc2lvbiwgcm93LCBjb2x1bW4pO1xuXG4gICAgICAgIHZhciB0b2tlbiA9IHN0cmVhbS5nZXRDdXJyZW50VG9rZW4oKTtcbiAgICAgICAgaWYgKCF0b2tlbiB8fCAodG9rZW4udHlwZSAhPSBcImtleXdvcmRcIiAmJiB0b2tlbi50eXBlICE9IFwiY29tbWVudC5tdWx0aWxpbmVcIikpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdmFyIHZhbCA9IHRva2VuLnZhbHVlO1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICBzd2l0Y2ggKHRva2VuLnZhbHVlKSB7XG4gICAgICAgICAgICBjYXNlIFwiaWZcIjpcbiAgICAgICAgICAgIGNhc2UgXCJ1bmxlc3NcIjpcbiAgICAgICAgICAgIGNhc2UgXCJ3aGlsZVwiOlxuICAgICAgICAgICAgY2FzZSBcInVudGlsXCI6XG4gICAgICAgICAgICAgICAgdmFyIGNoZWNrVG9rZW4gPSBuZXcgUmVnRXhwKFwiXlxcXFxzKlwiICsgdG9rZW4udmFsdWUpO1xuICAgICAgICAgICAgICAgIGlmICghY2hlY2tUb2tlbi50ZXN0KGxpbmUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIGRpciA9IHRoaXMuaW5kZW50S2V5d29yZHNbdmFsXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJ3aGVuXCI6XG4gICAgICAgICAgICAgICAgaWYgKC9cXHN0aGVuXFxzLy50ZXN0KGxpbmUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlIFwiZWxzaWZcIjpcbiAgICAgICAgICAgIGNhc2UgXCJyZXNjdWVcIjpcbiAgICAgICAgICAgIGNhc2UgXCJlbnN1cmVcIjpcbiAgICAgICAgICAgICAgICB2YXIgZGlyID0gMTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJlbHNlXCI6XG4gICAgICAgICAgICAgICAgdmFyIGNoZWNrVG9rZW4gPSBuZXcgUmVnRXhwKFwiXlxcXFxzKlwiICsgdG9rZW4udmFsdWUgKyBcIlxcXFxzKiRcIik7XG4gICAgICAgICAgICAgICAgaWYgKCFjaGVja1Rva2VuLnRlc3QobGluZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgZGlyID0gMTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdmFyIGRpciA9IHRoaXMuaW5kZW50S2V5d29yZHNbdmFsXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzdGFjayA9IFt2YWxdO1xuICAgICAgICBpZiAoIWRpcilcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB2YXIgc3RhcnRDb2x1bW4gPSBkaXIgPT09IC0xID8gc2Vzc2lvbi5nZXRMaW5lKHJvdyAtIDEpLmxlbmd0aCA6IHNlc3Npb24uZ2V0TGluZShyb3cpLmxlbmd0aDtcbiAgICAgICAgdmFyIHN0YXJ0Um93ID0gcm93O1xuICAgICAgICB2YXIgcmFuZ2VzID0gW107XG4gICAgICAgIHJhbmdlcy5wdXNoKHN0cmVhbS5nZXRDdXJyZW50VG9rZW5SYW5nZSgpKTtcblxuICAgICAgICBzdHJlYW0uc3RlcCA9IGRpciA9PT0gLTEgPyBzdHJlYW0uc3RlcEJhY2t3YXJkIDogc3RyZWFtLnN0ZXBGb3J3YXJkO1xuICAgICAgICBpZiAodG9rZW4udHlwZSA9PSBcImNvbW1lbnQubXVsdGlsaW5lXCIpIHtcbiAgICAgICAgICAgIHdoaWxlICh0b2tlbiA9IHN0cmVhbS5zdGVwKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAodG9rZW4udHlwZSAhPT0gXCJjb21tZW50Lm11bHRpbGluZVwiKVxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBpZiAoZGlyID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRDb2x1bW4gPSA2O1xuICAgICAgICAgICAgICAgICAgICBpZiAodG9rZW4udmFsdWUgPT0gXCI9ZW5kXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRva2VuLnZhbHVlID09IFwiPWJlZ2luXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd2hpbGUgKHRva2VuID0gc3RyZWFtLnN0ZXAoKSkge1xuICAgICAgICAgICAgICAgIHZhciBpZ25vcmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAodG9rZW4udHlwZSAhPT0gXCJrZXl3b3JkXCIpXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIHZhciBsZXZlbCA9IGRpciAqIHRoaXMuaW5kZW50S2V5d29yZHNbdG9rZW4udmFsdWVdO1xuICAgICAgICAgICAgICAgIGxpbmUgPSBzZXNzaW9uLmdldExpbmUoc3RyZWFtLmdldEN1cnJlbnRUb2tlblJvdygpKTtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRva2VuLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJkb1wiOlxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IHN0cmVhbS4kdG9rZW5JbmRleCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByZXZUb2tlbiA9IHN0cmVhbS4kcm93VG9rZW5zW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcmV2VG9rZW4gJiYgKHByZXZUb2tlbi52YWx1ZSA9PSBcIndoaWxlXCIgfHwgcHJldlRva2VuLnZhbHVlID09IFwidW50aWxcIiB8fCBwcmV2VG9rZW4udmFsdWUgPT0gXCJmb3JcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV2ZWwgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImVsc2VcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjaGVja1Rva2VuID0gbmV3IFJlZ0V4cChcIl5cXFxccypcIiArIHRva2VuLnZhbHVlICsgXCJcXFxccyokXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjaGVja1Rva2VuLnRlc3QobGluZSkgfHwgdmFsID09IFwiY2FzZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV2ZWwgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlnbm9yZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImlmXCI6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ1bmxlc3NcIjpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIndoaWxlXCI6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ1bnRpbFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNoZWNrVG9rZW4gPSBuZXcgUmVnRXhwKFwiXlxcXFxzKlwiICsgdG9rZW4udmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjaGVja1Rva2VuLnRlc3QobGluZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXZlbCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWdub3JlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwid2hlblwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKC9cXHN0aGVuXFxzLy50ZXN0KGxpbmUpIHx8IHZhbCA9PSBcImNhc2VcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldmVsID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZ25vcmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGxldmVsID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBzdGFjay51bnNoaWZ0KHRva2VuLnZhbHVlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGxldmVsIDw9IDAgJiYgaWdub3JlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICBzdGFjay5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXN0YWNrLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCh2YWwgPT0gXCJ3aGlsZVwiIHx8IHZhbCA9PSBcInVudGlsXCIgfHwgdmFsID09IFwiZm9yXCIpICYmIHRva2VuLnZhbHVlICE9IFwiZG9cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRva2VuLnZhbHVlID09IFwiZG9cIiAmJiBkaXIgPT0gLTEgJiYgbGV2ZWwgIT0gMClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0b2tlbi52YWx1ZSAhPSBcImRvXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAobGV2ZWwgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YWNrLnVuc2hpZnQodG9rZW4udmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0b2tlbilcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuXG4gICAgICAgIGlmICh0b2tlblJhbmdlKSB7XG4gICAgICAgICAgICByYW5nZXMucHVzaChzdHJlYW0uZ2V0Q3VycmVudFRva2VuUmFuZ2UoKSk7XG4gICAgICAgICAgICByZXR1cm4gcmFuZ2VzO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHJvdyA9IHN0cmVhbS5nZXRDdXJyZW50VG9rZW5Sb3coKTtcbiAgICAgICAgaWYgKGRpciA9PT0gLTEpIHtcbiAgICAgICAgICAgIGlmICh0b2tlbi50eXBlID09PSBcImNvbW1lbnQubXVsdGlsaW5lXCIpIHtcbiAgICAgICAgICAgICAgICB2YXIgZW5kQ29sdW1uID0gNjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIGVuZENvbHVtbiA9IHNlc3Npb24uZ2V0TGluZShyb3cpLmxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuZXcgUmFuZ2Uocm93LCBlbmRDb2x1bW4sIHN0YXJ0Um93IC0gMSwgc3RhcnRDb2x1bW4pO1xuICAgICAgICB9IGVsc2VcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmFuZ2Uoc3RhcnRSb3csIHN0YXJ0Q29sdW1uLCByb3cgLSAxLCBzZXNzaW9uLmdldExpbmUocm93IC0gMSkubGVuZ3RoKTtcbiAgICB9O1xuXG59KS5jYWxsKEZvbGRNb2RlLnByb3RvdHlwZSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIFJhbmdlID0gcmVxdWlyZShcIi4uL3JhbmdlXCIpLlJhbmdlO1xuXG52YXIgTWF0Y2hpbmdCcmFjZU91dGRlbnQgPSBmdW5jdGlvbigpIHt9O1xuXG4oZnVuY3Rpb24oKSB7XG5cbiAgICB0aGlzLmNoZWNrT3V0ZGVudCA9IGZ1bmN0aW9uKGxpbmUsIGlucHV0KSB7XG4gICAgICAgIGlmICghIC9eXFxzKyQvLnRlc3QobGluZSkpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgcmV0dXJuIC9eXFxzKlxcfS8udGVzdChpbnB1dCk7XG4gICAgfTtcblxuICAgIHRoaXMuYXV0b091dGRlbnQgPSBmdW5jdGlvbihkb2MsIHJvdykge1xuICAgICAgICB2YXIgbGluZSA9IGRvYy5nZXRMaW5lKHJvdyk7XG4gICAgICAgIHZhciBtYXRjaCA9IGxpbmUubWF0Y2goL14oXFxzKlxcfSkvKTtcblxuICAgICAgICBpZiAoIW1hdGNoKSByZXR1cm4gMDtcblxuICAgICAgICB2YXIgY29sdW1uID0gbWF0Y2hbMV0ubGVuZ3RoO1xuICAgICAgICB2YXIgb3BlbkJyYWNlUG9zID0gZG9jLmZpbmRNYXRjaGluZ0JyYWNrZXQoe3Jvdzogcm93LCBjb2x1bW46IGNvbHVtbn0pO1xuXG4gICAgICAgIGlmICghb3BlbkJyYWNlUG9zIHx8IG9wZW5CcmFjZVBvcy5yb3cgPT0gcm93KSByZXR1cm4gMDtcblxuICAgICAgICB2YXIgaW5kZW50ID0gdGhpcy4kZ2V0SW5kZW50KGRvYy5nZXRMaW5lKG9wZW5CcmFjZVBvcy5yb3cpKTtcbiAgICAgICAgZG9jLnJlcGxhY2UobmV3IFJhbmdlKHJvdywgMCwgcm93LCBjb2x1bW4tMSksIGluZGVudCk7XG4gICAgfTtcblxuICAgIHRoaXMuJGdldEluZGVudCA9IGZ1bmN0aW9uKGxpbmUpIHtcbiAgICAgICAgcmV0dXJuIGxpbmUubWF0Y2goL15cXHMqLylbMF07XG4gICAgfTtcblxufSkuY2FsbChNYXRjaGluZ0JyYWNlT3V0ZGVudC5wcm90b3R5cGUpO1xuXG5leHBvcnRzLk1hdGNoaW5nQnJhY2VPdXRkZW50ID0gTWF0Y2hpbmdCcmFjZU91dGRlbnQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRNb2RlID0gcmVxdWlyZShcIi4vdGV4dFwiKS5Nb2RlO1xudmFyIFJ1YnlIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3J1YnlfaGlnaGxpZ2h0X3J1bGVzXCIpLlJ1YnlIaWdobGlnaHRSdWxlcztcbnZhciBNYXRjaGluZ0JyYWNlT3V0ZGVudCA9IHJlcXVpcmUoXCIuL21hdGNoaW5nX2JyYWNlX291dGRlbnRcIikuTWF0Y2hpbmdCcmFjZU91dGRlbnQ7XG52YXIgUmFuZ2UgPSByZXF1aXJlKFwiLi4vcmFuZ2VcIikuUmFuZ2U7XG52YXIgRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9mb2xkaW5nL3J1YnlcIikuRm9sZE1vZGU7XG5cbnZhciBNb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5IaWdobGlnaHRSdWxlcyA9IFJ1YnlIaWdobGlnaHRSdWxlcztcbiAgICB0aGlzLiRvdXRkZW50ID0gbmV3IE1hdGNoaW5nQnJhY2VPdXRkZW50KCk7XG4gICAgdGhpcy4kYmVoYXZpb3VyID0gdGhpcy4kZGVmYXVsdEJlaGF2aW91cjtcbiAgICB0aGlzLmZvbGRpbmdSdWxlcyA9IG5ldyBGb2xkTW9kZSgpO1xuICAgIHRoaXMuaW5kZW50S2V5d29yZHMgPSB0aGlzLmZvbGRpbmdSdWxlcy5pbmRlbnRLZXl3b3Jkcztcbn07XG5vb3AuaW5oZXJpdHMoTW9kZSwgVGV4dE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG5cblxuICAgIHRoaXMubGluZUNvbW1lbnRTdGFydCA9IFwiI1wiO1xuXG4gICAgdGhpcy5nZXROZXh0TGluZUluZGVudCA9IGZ1bmN0aW9uKHN0YXRlLCBsaW5lLCB0YWIpIHtcbiAgICAgICAgdmFyIGluZGVudCA9IHRoaXMuJGdldEluZGVudChsaW5lKTtcblxuICAgICAgICB2YXIgdG9rZW5pemVkTGluZSA9IHRoaXMuZ2V0VG9rZW5pemVyKCkuZ2V0TGluZVRva2VucyhsaW5lLCBzdGF0ZSk7XG4gICAgICAgIHZhciB0b2tlbnMgPSB0b2tlbml6ZWRMaW5lLnRva2VucztcblxuICAgICAgICBpZiAodG9rZW5zLmxlbmd0aCAmJiB0b2tlbnNbdG9rZW5zLmxlbmd0aCAtIDFdLnR5cGUgPT0gXCJjb21tZW50XCIpIHtcbiAgICAgICAgICAgIHJldHVybiBpbmRlbnQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RhdGUgPT0gXCJzdGFydFwiKSB7XG4gICAgICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKC9eLipbXFx7XFwoXFxbXVxccyokLyk7XG4gICAgICAgICAgICB2YXIgc3RhcnRpbmdDbGFzc09yTWV0aG9kID0gbGluZS5tYXRjaCgvXlxccyooY2xhc3N8ZGVmfG1vZHVsZSlcXHMuKiQvKTtcbiAgICAgICAgICAgIHZhciBzdGFydGluZ0RvQmxvY2sgPSBsaW5lLm1hdGNoKC8uKmRvKFxccyp8XFxzK1xcfC4qXFx8XFxzKikkLyk7XG4gICAgICAgICAgICB2YXIgc3RhcnRpbmdDb25kaXRpb25hbCA9IGxpbmUubWF0Y2goL15cXHMqKGlmfGVsc2V8d2hlbnxlbHNpZnx1bmxlc3N8d2hpbGV8Zm9yfGJlZ2lufHJlc2N1ZXxlbnN1cmUpXFxzKi8pO1xuICAgICAgICAgICAgaWYgKG1hdGNoIHx8IHN0YXJ0aW5nQ2xhc3NPck1ldGhvZCB8fCBzdGFydGluZ0RvQmxvY2sgfHwgc3RhcnRpbmdDb25kaXRpb25hbCkge1xuICAgICAgICAgICAgICAgIGluZGVudCArPSB0YWI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW5kZW50O1xuICAgIH07XG5cbiAgICB0aGlzLmNoZWNrT3V0ZGVudCA9IGZ1bmN0aW9uKHN0YXRlLCBsaW5lLCBpbnB1dCkge1xuICAgICAgICByZXR1cm4gL15cXHMrKGVuZHxlbHNlfHJlc2N1ZXxlbnN1cmUpJC8udGVzdChsaW5lICsgaW5wdXQpIHx8IHRoaXMuJG91dGRlbnQuY2hlY2tPdXRkZW50KGxpbmUsIGlucHV0KTtcbiAgICB9O1xuXG4gICAgdGhpcy5hdXRvT3V0ZGVudCA9IGZ1bmN0aW9uKHN0YXRlLCBzZXNzaW9uLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgaWYgKC99Ly50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJG91dGRlbnQuYXV0b091dGRlbnQoc2Vzc2lvbiwgcm93KTtcbiAgICAgICAgdmFyIGluZGVudCA9IHRoaXMuJGdldEluZGVudChsaW5lKTtcbiAgICAgICAgdmFyIHByZXZMaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyAtIDEpO1xuICAgICAgICB2YXIgcHJldkluZGVudCA9IHRoaXMuJGdldEluZGVudChwcmV2TGluZSk7XG4gICAgICAgIHZhciB0YWIgPSBzZXNzaW9uLmdldFRhYlN0cmluZygpO1xuICAgICAgICBpZiAocHJldkluZGVudC5sZW5ndGggPD0gaW5kZW50Lmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGluZGVudC5zbGljZSgtdGFiLmxlbmd0aCkgPT0gdGFiKVxuICAgICAgICAgICAgICAgIHNlc3Npb24ucmVtb3ZlKG5ldyBSYW5nZShyb3csIGluZGVudC5sZW5ndGggLSB0YWIubGVuZ3RoLCByb3csIGluZGVudC5sZW5ndGgpKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLmdldE1hdGNoaW5nID0gZnVuY3Rpb24oc2Vzc2lvbiwgcm93LCBjb2x1bW4pIHtcbiAgICAgICAgaWYgKHJvdyA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHZhciBwb3MgPSBzZXNzaW9uLnNlbGVjdGlvbi5sZWFkO1xuICAgICAgICAgICAgY29sdW1uID0gcG9zLmNvbHVtbjtcbiAgICAgICAgICAgIHJvdyA9IHBvcy5yb3c7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc3RhcnRUb2tlbiA9IHNlc3Npb24uZ2V0VG9rZW5BdChyb3csIGNvbHVtbik7XG4gICAgICAgIGlmIChzdGFydFRva2VuICYmIHN0YXJ0VG9rZW4udmFsdWUgaW4gdGhpcy5pbmRlbnRLZXl3b3JkcylcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZvbGRpbmdSdWxlcy5ydWJ5QmxvY2soc2Vzc2lvbiwgcm93LCBjb2x1bW4sIHRydWUpO1xuICAgIH07XG5cbiAgICB0aGlzLiRpZCA9IFwiYWNlL21vZGUvcnVieVwiO1xuICAgIHRoaXMuc25pcHBldEZpbGVJZCA9IFwiYWNlL3NuaXBwZXRzL3J1YnlcIjtcbn0pLmNhbGwoTW9kZS5wcm90b3R5cGUpO1xuXG5leHBvcnRzLk1vZGUgPSBNb2RlO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9