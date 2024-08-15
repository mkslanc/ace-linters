"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[31],{

/***/ 30031:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var HtmlHighlightRules = (__webpack_require__(10413).HtmlHighlightRules);
var JavaScriptHighlightRules = (__webpack_require__(15903).JavaScriptHighlightRules);

var EjsHighlightRules = function(start, end) {
    HtmlHighlightRules.call(this);
    
    if (!start)
        start = "(?:<%|<\\?|{{)";
    if (!end)
        end = "(?:%>|\\?>|}})";

    for (var i in this.$rules) {
        this.$rules[i].unshift({
            token : "markup.list.meta.tag",
            regex : start + "(?![>}])[-=]?",
            push  : "ejs-start"
        });
    }
    
    this.embedRules(new JavaScriptHighlightRules({jsx: false}).getRules(), "ejs-", [{
        token : "markup.list.meta.tag",
        regex : "-?" + end,
        next  : "pop"
    }, {
        token: "comment",
        regex: "//.*?" + end,
        next: "pop"
    }]);
    
    this.normalizeRules();
};


oop.inherits(EjsHighlightRules, HtmlHighlightRules);

exports.EjsHighlightRules = EjsHighlightRules;


var oop = __webpack_require__(2645);
var HtmlMode = (__webpack_require__(32234).Mode);
var JavaScriptMode = (__webpack_require__(93388).Mode);
var CssMode = (__webpack_require__(41080).Mode);
var RubyMode = (__webpack_require__(11067).Mode);

var Mode = function() {
    HtmlMode.call(this);
    this.HighlightRules = EjsHighlightRules;    
    this.createModeDelegates({
        "js-": JavaScriptMode,
        "css-": CssMode,
        "ejs-": JavaScriptMode
    });
};
oop.inherits(Mode, HtmlMode);

(function() {

    this.$id = "ace/mode/ejs";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjMxLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFhOztBQUViLFVBQVUsbUJBQU8sQ0FBQyxJQUFZO0FBQzlCLHlCQUF5QiwrQ0FBb0Q7QUFDN0UsK0JBQStCLHFEQUFnRTs7QUFFL0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEI7QUFDOUI7QUFDQSw0QkFBNEI7O0FBRTVCO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQztBQUNuQztBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0Esa0RBQWtELFdBQVc7QUFDN0Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7OztBQUdBOztBQUVBLHlCQUF5Qjs7O0FBR3pCLFVBQVUsbUJBQU8sQ0FBQyxJQUFZO0FBQzlCLGVBQWUsaUNBQXNCO0FBQ3JDLHFCQUFxQixpQ0FBNEI7QUFDakQsY0FBYyxpQ0FBcUI7QUFDbkMsZUFBZSxpQ0FBc0I7O0FBRXJDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxDQUFDOztBQUVELFlBQVk7Ozs7Ozs7O0FDL0RDOztBQUViLFVBQVUsbUJBQU8sQ0FBQyxJQUFlO0FBQ2pDLG1CQUFtQixxQ0FBK0I7QUFDbEQsWUFBWSwyQ0FBNEI7QUFDeEMsb0JBQW9CLDBDQUE2Qzs7O0FBR2pFLGVBQWUsU0FBZ0I7QUFDL0I7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0lBQW9JO0FBQ3BJLHNEQUFzRDs7QUFFdEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx1REFBdUQ7QUFDdkQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHVEQUF1RDtBQUN2RDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkRBQTZELFFBQVE7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTs7QUFFQSxDQUFDOzs7Ozs7OztBQ25RWTs7QUFFYixVQUFVLG1CQUFPLENBQUMsSUFBWTtBQUM5QixlQUFlLGlDQUFzQjtBQUNyQyx5QkFBeUIsK0NBQW9EO0FBQzdFLDJCQUEyQixpREFBd0Q7QUFDbkYsWUFBWSwyQ0FBeUI7QUFDckMsZUFBZSw4Q0FBa0M7O0FBRWpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwQ0FBMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQsWUFBWSIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvZWpzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvZm9sZGluZy9ydWJ5LmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvcnVieS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIEh0bWxIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL2h0bWxfaGlnaGxpZ2h0X3J1bGVzXCIpLkh0bWxIaWdobGlnaHRSdWxlcztcbnZhciBKYXZhU2NyaXB0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9qYXZhc2NyaXB0X2hpZ2hsaWdodF9ydWxlc1wiKS5KYXZhU2NyaXB0SGlnaGxpZ2h0UnVsZXM7XG5cbnZhciBFanNIaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uKHN0YXJ0LCBlbmQpIHtcbiAgICBIdG1sSGlnaGxpZ2h0UnVsZXMuY2FsbCh0aGlzKTtcbiAgICBcbiAgICBpZiAoIXN0YXJ0KVxuICAgICAgICBzdGFydCA9IFwiKD86PCV8PFxcXFw/fHt7KVwiO1xuICAgIGlmICghZW5kKVxuICAgICAgICBlbmQgPSBcIig/OiU+fFxcXFw/Pnx9fSlcIjtcblxuICAgIGZvciAodmFyIGkgaW4gdGhpcy4kcnVsZXMpIHtcbiAgICAgICAgdGhpcy4kcnVsZXNbaV0udW5zaGlmdCh7XG4gICAgICAgICAgICB0b2tlbiA6IFwibWFya3VwLmxpc3QubWV0YS50YWdcIixcbiAgICAgICAgICAgIHJlZ2V4IDogc3RhcnQgKyBcIig/IVs+fV0pWy09XT9cIixcbiAgICAgICAgICAgIHB1c2ggIDogXCJlanMtc3RhcnRcIlxuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgdGhpcy5lbWJlZFJ1bGVzKG5ldyBKYXZhU2NyaXB0SGlnaGxpZ2h0UnVsZXMoe2pzeDogZmFsc2V9KS5nZXRSdWxlcygpLCBcImVqcy1cIiwgW3tcbiAgICAgICAgdG9rZW4gOiBcIm1hcmt1cC5saXN0Lm1ldGEudGFnXCIsXG4gICAgICAgIHJlZ2V4IDogXCItP1wiICsgZW5kLFxuICAgICAgICBuZXh0ICA6IFwicG9wXCJcbiAgICB9LCB7XG4gICAgICAgIHRva2VuOiBcImNvbW1lbnRcIixcbiAgICAgICAgcmVnZXg6IFwiLy8uKj9cIiArIGVuZCxcbiAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgIH1dKTtcbiAgICBcbiAgICB0aGlzLm5vcm1hbGl6ZVJ1bGVzKCk7XG59O1xuXG5cbm9vcC5pbmhlcml0cyhFanNIaWdobGlnaHRSdWxlcywgSHRtbEhpZ2hsaWdodFJ1bGVzKTtcblxuZXhwb3J0cy5FanNIaWdobGlnaHRSdWxlcyA9IEVqc0hpZ2hsaWdodFJ1bGVzO1xuXG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBIdG1sTW9kZSA9IHJlcXVpcmUoXCIuL2h0bWxcIikuTW9kZTtcbnZhciBKYXZhU2NyaXB0TW9kZSA9IHJlcXVpcmUoXCIuL2phdmFzY3JpcHRcIikuTW9kZTtcbnZhciBDc3NNb2RlID0gcmVxdWlyZShcIi4vY3NzXCIpLk1vZGU7XG52YXIgUnVieU1vZGUgPSByZXF1aXJlKFwiLi9ydWJ5XCIpLk1vZGU7XG5cbnZhciBNb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgSHRtbE1vZGUuY2FsbCh0aGlzKTtcbiAgICB0aGlzLkhpZ2hsaWdodFJ1bGVzID0gRWpzSGlnaGxpZ2h0UnVsZXM7ICAgIFxuICAgIHRoaXMuY3JlYXRlTW9kZURlbGVnYXRlcyh7XG4gICAgICAgIFwianMtXCI6IEphdmFTY3JpcHRNb2RlLFxuICAgICAgICBcImNzcy1cIjogQ3NzTW9kZSxcbiAgICAgICAgXCJlanMtXCI6IEphdmFTY3JpcHRNb2RlXG4gICAgfSk7XG59O1xub29wLmluaGVyaXRzKE1vZGUsIEh0bWxNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy4kaWQgPSBcImFjZS9tb2RlL2Vqc1wiO1xufSkuY2FsbChNb2RlLnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTW9kZSA9IE1vZGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi8uLi9saWIvb29wXCIpO1xudmFyIEJhc2VGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRfbW9kZVwiKS5Gb2xkTW9kZTtcbnZhciBSYW5nZSA9IHJlcXVpcmUoXCIuLi8uLi9yYW5nZVwiKS5SYW5nZTtcbnZhciBUb2tlbkl0ZXJhdG9yID0gcmVxdWlyZShcIi4uLy4uL3Rva2VuX2l0ZXJhdG9yXCIpLlRva2VuSXRlcmF0b3I7XG5cblxudmFyIEZvbGRNb2RlID0gZXhwb3J0cy5Gb2xkTW9kZSA9IGZ1bmN0aW9uICgpIHtcbn07XG5cbm9vcC5pbmhlcml0cyhGb2xkTW9kZSwgQmFzZUZvbGRNb2RlKTtcblxuKGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmluZGVudEtleXdvcmRzID0ge1xuICAgICAgICBcImNsYXNzXCI6IDEsXG4gICAgICAgIFwiZGVmXCI6IDEsXG4gICAgICAgIFwibW9kdWxlXCI6IDEsXG4gICAgICAgIFwiZG9cIjogMSxcbiAgICAgICAgXCJ1bmxlc3NcIjogMSxcbiAgICAgICAgXCJpZlwiOiAxLFxuICAgICAgICBcIndoaWxlXCI6IDEsXG4gICAgICAgIFwiZm9yXCI6IDEsXG4gICAgICAgIFwidW50aWxcIjogMSxcbiAgICAgICAgXCJiZWdpblwiOiAxLFxuICAgICAgICBcImVsc2VcIjogMCxcbiAgICAgICAgXCJlbHNpZlwiOiAwLFxuICAgICAgICBcInJlc2N1ZVwiOiAwLFxuICAgICAgICBcImVuc3VyZVwiOiAwLFxuICAgICAgICBcIndoZW5cIjogMCxcbiAgICAgICAgXCJlbmRcIjogLTEsXG4gICAgICAgIFwiY2FzZVwiOiAxLFxuICAgICAgICBcIj1iZWdpblwiOiAxLFxuICAgICAgICBcIj1lbmRcIjogLTFcbiAgICB9O1xuXG4gICAgdGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIgPSAvKD86XFxzfF4pKGRlZnxkb3x3aGlsZXxjbGFzc3x1bmxlc3N8bW9kdWxlfGlmfGZvcnx1bnRpbHxiZWdpbnxlbHNlfGVsc2lmfGNhc2V8cmVzY3VlfGVuc3VyZXx3aGVuKVxcYnwoe1xccyokKXwoPWJlZ2luKS87XG4gICAgdGhpcy5mb2xkaW5nU3RvcE1hcmtlciA9IC8oPWVuZCg/PSR8XFxzLiokKSl8KF5cXHMqfSl8XFxiKGVuZClcXGIvO1xuXG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0ID0gZnVuY3Rpb24gKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgIHZhciBpc1N0YXJ0ID0gdGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIudGVzdChsaW5lKTtcbiAgICAgICAgdmFyIGlzRW5kID0gdGhpcy5mb2xkaW5nU3RvcE1hcmtlci50ZXN0KGxpbmUpO1xuXG4gICAgICAgIGlmIChpc1N0YXJ0ICYmICFpc0VuZCkge1xuICAgICAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCh0aGlzLmZvbGRpbmdTdGFydE1hcmtlcik7XG4gICAgICAgICAgICBpZiAobWF0Y2hbMV0pIHtcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2hbMV0gPT0gXCJpZlwiIHx8IG1hdGNoWzFdID09IFwiZWxzZVwiIHx8IG1hdGNoWzFdID09IFwid2hpbGVcIiB8fCBtYXRjaFsxXSA9PSBcInVudGlsXCIgfHwgbWF0Y2hbMV0gPT0gXCJ1bmxlc3NcIikge1xuICAgICAgICAgICAgICAgICAgICBpZiAobWF0Y2hbMV0gPT0gXCJlbHNlXCIgJiYgL15cXHMqZWxzZVxccyokLy50ZXN0KGxpbmUpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICgvXlxccyooPzppZnxlbHNlfHdoaWxlfHVudGlsfHVubGVzcylcXHMqLy50ZXN0KGxpbmUpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoWzFdID09IFwid2hlblwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgvXFxzdGhlblxccy8udGVzdChsaW5lKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzZXNzaW9uLmdldFRva2VuQXQocm93LCBtYXRjaC5pbmRleCArIDIpLnR5cGUgPT09IFwia2V5d29yZFwiKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJzdGFydFwiO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChtYXRjaFszXSkge1xuICAgICAgICAgICAgICAgIGlmIChzZXNzaW9uLmdldFRva2VuQXQocm93LCBtYXRjaC5pbmRleCArIDEpLnR5cGUgPT09IFwiY29tbWVudC5tdWx0aWxpbmVcIilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwic3RhcnRcIjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwic3RhcnRcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZm9sZFN0eWxlICE9IFwibWFya2JlZ2luZW5kXCIgfHwgIWlzRW5kIHx8IGlzU3RhcnQgJiYgaXNFbmQpXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcblxuICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIpO1xuICAgICAgICBpZiAobWF0Y2hbM10gPT09IFwiZW5kXCIpIHtcbiAgICAgICAgICAgIGlmIChzZXNzaW9uLmdldFRva2VuQXQocm93LCBtYXRjaC5pbmRleCArIDEpLnR5cGUgPT09IFwia2V5d29yZFwiKVxuICAgICAgICAgICAgICAgIHJldHVybiBcImVuZFwiO1xuICAgICAgICB9IGVsc2UgaWYgKG1hdGNoWzFdKSB7XG4gICAgICAgICAgICBpZiAoc2Vzc2lvbi5nZXRUb2tlbkF0KHJvdywgbWF0Y2guaW5kZXggKyAxKS50eXBlID09PSBcImNvbW1lbnQubXVsdGlsaW5lXCIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiZW5kXCI7XG4gICAgICAgIH0gZWxzZVxuICAgICAgICAgICAgcmV0dXJuIFwiZW5kXCI7XG4gICAgfTtcblxuICAgIHRoaXMuZ2V0Rm9sZFdpZGdldFJhbmdlID0gZnVuY3Rpb24gKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5kb2MuZ2V0TGluZShyb3cpO1xuICAgICAgICB2YXIgbWF0Y2ggPSB0aGlzLmZvbGRpbmdTdGFydE1hcmtlci5leGVjKGxpbmUpO1xuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIGlmIChtYXRjaFsxXSB8fCBtYXRjaFszXSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5ydWJ5QmxvY2soc2Vzc2lvbiwgcm93LCBtYXRjaC5pbmRleCArIDIpO1xuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5vcGVuaW5nQnJhY2tldEJsb2NrKHNlc3Npb24sIFwie1wiLCByb3csIG1hdGNoLmluZGV4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBtYXRjaCA9IHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIuZXhlYyhsaW5lKTtcbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICBpZiAobWF0Y2hbM10gPT09IFwiZW5kXCIpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2Vzc2lvbi5nZXRUb2tlbkF0KHJvdywgbWF0Y2guaW5kZXggKyAxKS50eXBlID09PSBcImtleXdvcmRcIilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucnVieUJsb2NrKHNlc3Npb24sIHJvdywgbWF0Y2guaW5kZXggKyAxKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG1hdGNoWzFdID09PSBcIj1lbmRcIikge1xuICAgICAgICAgICAgICAgIGlmIChzZXNzaW9uLmdldFRva2VuQXQocm93LCBtYXRjaC5pbmRleCArIDEpLnR5cGUgPT09IFwiY29tbWVudC5tdWx0aWxpbmVcIilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucnVieUJsb2NrKHNlc3Npb24sIHJvdywgbWF0Y2guaW5kZXggKyAxKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2xvc2luZ0JyYWNrZXRCbG9jayhzZXNzaW9uLCBcIn1cIiwgcm93LCBtYXRjaC5pbmRleCArIG1hdGNoWzBdLmxlbmd0aCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5ydWJ5QmxvY2sgPSBmdW5jdGlvbiAoc2Vzc2lvbiwgcm93LCBjb2x1bW4sIHRva2VuUmFuZ2UpIHtcbiAgICAgICAgdmFyIHN0cmVhbSA9IG5ldyBUb2tlbkl0ZXJhdG9yKHNlc3Npb24sIHJvdywgY29sdW1uKTtcblxuICAgICAgICB2YXIgdG9rZW4gPSBzdHJlYW0uZ2V0Q3VycmVudFRva2VuKCk7XG4gICAgICAgIGlmICghdG9rZW4gfHwgKHRva2VuLnR5cGUgIT0gXCJrZXl3b3JkXCIgJiYgdG9rZW4udHlwZSAhPSBcImNvbW1lbnQubXVsdGlsaW5lXCIpKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHZhciB2YWwgPSB0b2tlbi52YWx1ZTtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgc3dpdGNoICh0b2tlbi52YWx1ZSkge1xuICAgICAgICAgICAgY2FzZSBcImlmXCI6XG4gICAgICAgICAgICBjYXNlIFwidW5sZXNzXCI6XG4gICAgICAgICAgICBjYXNlIFwid2hpbGVcIjpcbiAgICAgICAgICAgIGNhc2UgXCJ1bnRpbFwiOlxuICAgICAgICAgICAgICAgIHZhciBjaGVja1Rva2VuID0gbmV3IFJlZ0V4cChcIl5cXFxccypcIiArIHRva2VuLnZhbHVlKTtcbiAgICAgICAgICAgICAgICBpZiAoIWNoZWNrVG9rZW4udGVzdChsaW5lKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBkaXIgPSB0aGlzLmluZGVudEtleXdvcmRzW3ZhbF07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwid2hlblwiOlxuICAgICAgICAgICAgICAgIGlmICgvXFxzdGhlblxccy8udGVzdChsaW5lKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSBcImVsc2lmXCI6XG4gICAgICAgICAgICBjYXNlIFwicmVzY3VlXCI6XG4gICAgICAgICAgICBjYXNlIFwiZW5zdXJlXCI6XG4gICAgICAgICAgICAgICAgdmFyIGRpciA9IDE7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiZWxzZVwiOlxuICAgICAgICAgICAgICAgIHZhciBjaGVja1Rva2VuID0gbmV3IFJlZ0V4cChcIl5cXFxccypcIiArIHRva2VuLnZhbHVlICsgXCJcXFxccyokXCIpO1xuICAgICAgICAgICAgICAgIGlmICghY2hlY2tUb2tlbi50ZXN0KGxpbmUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIGRpciA9IDE7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHZhciBkaXIgPSB0aGlzLmluZGVudEtleXdvcmRzW3ZhbF07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc3RhY2sgPSBbdmFsXTtcbiAgICAgICAgaWYgKCFkaXIpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdmFyIHN0YXJ0Q29sdW1uID0gZGlyID09PSAtMSA/IHNlc3Npb24uZ2V0TGluZShyb3cgLSAxKS5sZW5ndGggOiBzZXNzaW9uLmdldExpbmUocm93KS5sZW5ndGg7XG4gICAgICAgIHZhciBzdGFydFJvdyA9IHJvdztcbiAgICAgICAgdmFyIHJhbmdlcyA9IFtdO1xuICAgICAgICByYW5nZXMucHVzaChzdHJlYW0uZ2V0Q3VycmVudFRva2VuUmFuZ2UoKSk7XG5cbiAgICAgICAgc3RyZWFtLnN0ZXAgPSBkaXIgPT09IC0xID8gc3RyZWFtLnN0ZXBCYWNrd2FyZCA6IHN0cmVhbS5zdGVwRm9yd2FyZDtcbiAgICAgICAgaWYgKHRva2VuLnR5cGUgPT0gXCJjb21tZW50Lm11bHRpbGluZVwiKSB7XG4gICAgICAgICAgICB3aGlsZSAodG9rZW4gPSBzdHJlYW0uc3RlcCgpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRva2VuLnR5cGUgIT09IFwiY29tbWVudC5tdWx0aWxpbmVcIilcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgaWYgKGRpciA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0Q29sdW1uID0gNjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRva2VuLnZhbHVlID09IFwiPWVuZFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0b2tlbi52YWx1ZSA9PSBcIj1iZWdpblwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdoaWxlICh0b2tlbiA9IHN0cmVhbS5zdGVwKCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgaWdub3JlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYgKHRva2VuLnR5cGUgIT09IFwia2V5d29yZFwiKVxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB2YXIgbGV2ZWwgPSBkaXIgKiB0aGlzLmluZGVudEtleXdvcmRzW3Rva2VuLnZhbHVlXTtcbiAgICAgICAgICAgICAgICBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHN0cmVhbS5nZXRDdXJyZW50VG9rZW5Sb3coKSk7XG4gICAgICAgICAgICAgICAgc3dpdGNoICh0b2tlbi52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZG9cIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSBzdHJlYW0uJHRva2VuSW5kZXggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcmV2VG9rZW4gPSBzdHJlYW0uJHJvd1Rva2Vuc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJldlRva2VuICYmIChwcmV2VG9rZW4udmFsdWUgPT0gXCJ3aGlsZVwiIHx8IHByZXZUb2tlbi52YWx1ZSA9PSBcInVudGlsXCIgfHwgcHJldlRva2VuLnZhbHVlID09IFwiZm9yXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldmVsID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJlbHNlXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2hlY2tUb2tlbiA9IG5ldyBSZWdFeHAoXCJeXFxcXHMqXCIgKyB0b2tlbi52YWx1ZSArIFwiXFxcXHMqJFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY2hlY2tUb2tlbi50ZXN0KGxpbmUpIHx8IHZhbCA9PSBcImNhc2VcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldmVsID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZ25vcmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJpZlwiOlxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwidW5sZXNzXCI6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ3aGlsZVwiOlxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwidW50aWxcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjaGVja1Rva2VuID0gbmV3IFJlZ0V4cChcIl5cXFxccypcIiArIHRva2VuLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY2hlY2tUb2tlbi50ZXN0KGxpbmUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV2ZWwgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlnbm9yZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIndoZW5cIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgvXFxzdGhlblxccy8udGVzdChsaW5lKSB8fCB2YWwgPT0gXCJjYXNlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXZlbCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWdub3JlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChsZXZlbCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhY2sudW5zaGlmdCh0b2tlbi52YWx1ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChsZXZlbCA8PSAwICYmIGlnbm9yZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhY2suc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzdGFjay5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgodmFsID09IFwid2hpbGVcIiB8fCB2YWwgPT0gXCJ1bnRpbFwiIHx8IHZhbCA9PSBcImZvclwiKSAmJiB0b2tlbi52YWx1ZSAhPSBcImRvXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0b2tlbi52YWx1ZSA9PSBcImRvXCIgJiYgZGlyID09IC0xICYmIGxldmVsICE9IDApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodG9rZW4udmFsdWUgIT0gXCJkb1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGxldmVsID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFjay51bnNoaWZ0KHRva2VuLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdG9rZW4pXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcblxuICAgICAgICBpZiAodG9rZW5SYW5nZSkge1xuICAgICAgICAgICAgcmFuZ2VzLnB1c2goc3RyZWFtLmdldEN1cnJlbnRUb2tlblJhbmdlKCkpO1xuICAgICAgICAgICAgcmV0dXJuIHJhbmdlcztcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciByb3cgPSBzdHJlYW0uZ2V0Q3VycmVudFRva2VuUm93KCk7XG4gICAgICAgIGlmIChkaXIgPT09IC0xKSB7XG4gICAgICAgICAgICBpZiAodG9rZW4udHlwZSA9PT0gXCJjb21tZW50Lm11bHRpbGluZVwiKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVuZENvbHVtbiA9IDY7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBlbmRDb2x1bW4gPSBzZXNzaW9uLmdldExpbmUocm93KS5sZW5ndGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbmV3IFJhbmdlKHJvdywgZW5kQ29sdW1uLCBzdGFydFJvdyAtIDEsIHN0YXJ0Q29sdW1uKTtcbiAgICAgICAgfSBlbHNlXG4gICAgICAgICAgICByZXR1cm4gbmV3IFJhbmdlKHN0YXJ0Um93LCBzdGFydENvbHVtbiwgcm93IC0gMSwgc2Vzc2lvbi5nZXRMaW5lKHJvdyAtIDEpLmxlbmd0aCk7XG4gICAgfTtcblxufSkuY2FsbChGb2xkTW9kZS5wcm90b3R5cGUpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0TW9kZSA9IHJlcXVpcmUoXCIuL3RleHRcIikuTW9kZTtcbnZhciBSdWJ5SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9ydWJ5X2hpZ2hsaWdodF9ydWxlc1wiKS5SdWJ5SGlnaGxpZ2h0UnVsZXM7XG52YXIgTWF0Y2hpbmdCcmFjZU91dGRlbnQgPSByZXF1aXJlKFwiLi9tYXRjaGluZ19icmFjZV9vdXRkZW50XCIpLk1hdGNoaW5nQnJhY2VPdXRkZW50O1xudmFyIFJhbmdlID0gcmVxdWlyZShcIi4uL3JhbmdlXCIpLlJhbmdlO1xudmFyIEZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZGluZy9ydWJ5XCIpLkZvbGRNb2RlO1xuXG52YXIgTW9kZSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuSGlnaGxpZ2h0UnVsZXMgPSBSdWJ5SGlnaGxpZ2h0UnVsZXM7XG4gICAgdGhpcy4kb3V0ZGVudCA9IG5ldyBNYXRjaGluZ0JyYWNlT3V0ZGVudCgpO1xuICAgIHRoaXMuJGJlaGF2aW91ciA9IHRoaXMuJGRlZmF1bHRCZWhhdmlvdXI7XG4gICAgdGhpcy5mb2xkaW5nUnVsZXMgPSBuZXcgRm9sZE1vZGUoKTtcbiAgICB0aGlzLmluZGVudEtleXdvcmRzID0gdGhpcy5mb2xkaW5nUnVsZXMuaW5kZW50S2V5d29yZHM7XG59O1xub29wLmluaGVyaXRzKE1vZGUsIFRleHRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuXG5cbiAgICB0aGlzLmxpbmVDb21tZW50U3RhcnQgPSBcIiNcIjtcblxuICAgIHRoaXMuZ2V0TmV4dExpbmVJbmRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgbGluZSwgdGFiKSB7XG4gICAgICAgIHZhciBpbmRlbnQgPSB0aGlzLiRnZXRJbmRlbnQobGluZSk7XG5cbiAgICAgICAgdmFyIHRva2VuaXplZExpbmUgPSB0aGlzLmdldFRva2VuaXplcigpLmdldExpbmVUb2tlbnMobGluZSwgc3RhdGUpO1xuICAgICAgICB2YXIgdG9rZW5zID0gdG9rZW5pemVkTGluZS50b2tlbnM7XG5cbiAgICAgICAgaWYgKHRva2Vucy5sZW5ndGggJiYgdG9rZW5zW3Rva2Vucy5sZW5ndGggLSAxXS50eXBlID09IFwiY29tbWVudFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5kZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN0YXRlID09IFwic3RhcnRcIikge1xuICAgICAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCgvXi4qW1xce1xcKFxcW11cXHMqJC8pO1xuICAgICAgICAgICAgdmFyIHN0YXJ0aW5nQ2xhc3NPck1ldGhvZCA9IGxpbmUubWF0Y2goL15cXHMqKGNsYXNzfGRlZnxtb2R1bGUpXFxzLiokLyk7XG4gICAgICAgICAgICB2YXIgc3RhcnRpbmdEb0Jsb2NrID0gbGluZS5tYXRjaCgvLipkbyhcXHMqfFxccytcXHwuKlxcfFxccyopJC8pO1xuICAgICAgICAgICAgdmFyIHN0YXJ0aW5nQ29uZGl0aW9uYWwgPSBsaW5lLm1hdGNoKC9eXFxzKihpZnxlbHNlfHdoZW58ZWxzaWZ8dW5sZXNzfHdoaWxlfGZvcnxiZWdpbnxyZXNjdWV8ZW5zdXJlKVxccyovKTtcbiAgICAgICAgICAgIGlmIChtYXRjaCB8fCBzdGFydGluZ0NsYXNzT3JNZXRob2QgfHwgc3RhcnRpbmdEb0Jsb2NrIHx8IHN0YXJ0aW5nQ29uZGl0aW9uYWwpIHtcbiAgICAgICAgICAgICAgICBpbmRlbnQgKz0gdGFiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGluZGVudDtcbiAgICB9O1xuXG4gICAgdGhpcy5jaGVja091dGRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgbGluZSwgaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIC9eXFxzKyhlbmR8ZWxzZXxyZXNjdWV8ZW5zdXJlKSQvLnRlc3QobGluZSArIGlucHV0KSB8fCB0aGlzLiRvdXRkZW50LmNoZWNrT3V0ZGVudChsaW5lLCBpbnB1dCk7XG4gICAgfTtcblxuICAgIHRoaXMuYXV0b091dGRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgc2Vzc2lvbiwgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgIGlmICgvfS8udGVzdChsaW5lKSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRvdXRkZW50LmF1dG9PdXRkZW50KHNlc3Npb24sIHJvdyk7XG4gICAgICAgIHZhciBpbmRlbnQgPSB0aGlzLiRnZXRJbmRlbnQobGluZSk7XG4gICAgICAgIHZhciBwcmV2TGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cgLSAxKTtcbiAgICAgICAgdmFyIHByZXZJbmRlbnQgPSB0aGlzLiRnZXRJbmRlbnQocHJldkxpbmUpO1xuICAgICAgICB2YXIgdGFiID0gc2Vzc2lvbi5nZXRUYWJTdHJpbmcoKTtcbiAgICAgICAgaWYgKHByZXZJbmRlbnQubGVuZ3RoIDw9IGluZGVudC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChpbmRlbnQuc2xpY2UoLXRhYi5sZW5ndGgpID09IHRhYilcbiAgICAgICAgICAgICAgICBzZXNzaW9uLnJlbW92ZShuZXcgUmFuZ2Uocm93LCBpbmRlbnQubGVuZ3RoIC0gdGFiLmxlbmd0aCwgcm93LCBpbmRlbnQubGVuZ3RoKSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5nZXRNYXRjaGluZyA9IGZ1bmN0aW9uKHNlc3Npb24sIHJvdywgY29sdW1uKSB7XG4gICAgICAgIGlmIChyb3cgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB2YXIgcG9zID0gc2Vzc2lvbi5zZWxlY3Rpb24ubGVhZDtcbiAgICAgICAgICAgIGNvbHVtbiA9IHBvcy5jb2x1bW47XG4gICAgICAgICAgICByb3cgPSBwb3Mucm93O1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHN0YXJ0VG9rZW4gPSBzZXNzaW9uLmdldFRva2VuQXQocm93LCBjb2x1bW4pO1xuICAgICAgICBpZiAoc3RhcnRUb2tlbiAmJiBzdGFydFRva2VuLnZhbHVlIGluIHRoaXMuaW5kZW50S2V5d29yZHMpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mb2xkaW5nUnVsZXMucnVieUJsb2NrKHNlc3Npb24sIHJvdywgY29sdW1uLCB0cnVlKTtcbiAgICB9O1xuXG4gICAgdGhpcy4kaWQgPSBcImFjZS9tb2RlL3J1YnlcIjtcbiAgICB0aGlzLnNuaXBwZXRGaWxlSWQgPSBcImFjZS9zbmlwcGV0cy9ydWJ5XCI7XG59KS5jYWxsKE1vZGUucHJvdG90eXBlKTtcblxuZXhwb3J0cy5Nb2RlID0gTW9kZTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==