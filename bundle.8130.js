"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[8130,9781],{

/***/ 99231:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var BaseFoldMode = (__webpack_require__(51358).FoldMode);
var Range = (__webpack_require__(91902)/* .Range */ .Q);
var TokenIterator = (__webpack_require__(99339).TokenIterator);


var FoldMode = exports.l = function() {};

oop.inherits(FoldMode, BaseFoldMode);

(function() {

    this.foldingStartMarker = /\b(function|then|do|repeat)\b|{\s*$|(\[=*\[)/;
    this.foldingStopMarker = /\bend\b|^\s*}|\]=*\]/;

    this.getFoldWidget = function(session, foldStyle, row) {
        var line = session.getLine(row);
        var isStart = this.foldingStartMarker.test(line);
        var isEnd = this.foldingStopMarker.test(line);

        if (isStart && !isEnd) {
            var match = line.match(this.foldingStartMarker);
            if (match[1] == "then" && /\belseif\b/.test(line))
                return;
            if (match[1]) {
                if (session.getTokenAt(row, match.index + 1).type === "keyword")
                    return "start";
            } else if (match[2]) {
                var type = session.bgTokenizer.getState(row) || "";
                if (type[0] == "bracketedComment" || type[0] == "bracketedString")
                    return "start";
            } else {
                return "start";
            }
        }
        if (foldStyle != "markbeginend" || !isEnd || isStart && isEnd)
            return "";

        var match = line.match(this.foldingStopMarker);
        if (match[0] === "end") {
            if (session.getTokenAt(row, match.index + 1).type === "keyword")
                return "end";
        } else if (match[0][0] === "]") {
            var type = session.bgTokenizer.getState(row - 1) || "";
            if (type[0] == "bracketedComment" || type[0] == "bracketedString")
                return "end";
        } else
            return "end";
    };

    this.getFoldWidgetRange = function(session, foldStyle, row) {
        var line = session.doc.getLine(row);
        var match = this.foldingStartMarker.exec(line);
        if (match) {
            if (match[1])
                return this.luaBlock(session, row, match.index + 1);

            if (match[2])
                return session.getCommentFoldRange(row, match.index + 1);

            return this.openingBracketBlock(session, "{", row, match.index);
        }

        var match = this.foldingStopMarker.exec(line);
        if (match) {
            if (match[0] === "end") {
                if (session.getTokenAt(row, match.index + 1).type === "keyword")
                    return this.luaBlock(session, row, match.index + 1);
            }

            if (match[0][0] === "]")
                return session.getCommentFoldRange(row, match.index + 1);

            return this.closingBracketBlock(session, "}", row, match.index + match[0].length);
        }
    };

    this.luaBlock = function(session, row, column, tokenRange) {
        var stream = new TokenIterator(session, row, column);
        var indentKeywords = {
            "function": 1,
            "do": 1,
            "then": 1,
            "elseif": -1,
            "end": -1,
            "repeat": 1,
            "until": -1
        };

        var token = stream.getCurrentToken();
        if (!token || token.type != "keyword")
            return;

        var val = token.value;
        var stack = [val];
        var dir = indentKeywords[val];

        if (!dir)
            return;

        var startColumn = dir === -1 ? stream.getCurrentTokenColumn() : session.getLine(row).length;
        var startRow = row;

        stream.step = dir === -1 ? stream.stepBackward : stream.stepForward;
        while(token = stream.step()) {
            if (token.type !== "keyword")
                continue;
            var level = dir * indentKeywords[token.value];

            if (level > 0) {
                stack.unshift(token.value);
            } else if (level <= 0) {
                stack.shift();
                if (!stack.length && token.value != "elseif")
                    break;
                if (level === 0)
                    stack.unshift(token.value);
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


/***/ }),

/***/ 39781:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var LuaHighlightRules = (__webpack_require__(49858)/* .LuaHighlightRules */ .W);
var LuaFoldMode = (__webpack_require__(99231)/* .FoldMode */ .l);
var Range = (__webpack_require__(91902)/* .Range */ .Q);
var WorkerClient = (__webpack_require__(28402).WorkerClient);

var Mode = function() {
    this.HighlightRules = LuaHighlightRules;
    
    this.foldingRules = new LuaFoldMode();
    this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, TextMode);

(function() {
   
    this.lineCommentStart = "--";
    this.blockComment = {start: "--[[", end: "--]]"};
    
    var indentKeywords = {
        "function": 1,
        "then": 1,
        "do": 1,
        "else": 1,
        "elseif": 1,
        "repeat": 1,
        "end": -1,
        "until": -1
    };
    var outdentKeywords = [
        "else",
        "elseif",
        "end",
        "until"
    ];

    function getNetIndentLevel(tokens) {
        var level = 0;
        // Support single-line blocks by decrementing the indent level if
        // an ending token is found
        for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            if (token.type == "keyword") {
                if (token.value in indentKeywords) {
                    level += indentKeywords[token.value];
                }
            } else if (token.type == "paren.lparen") {
                level += token.value.length;
            } else if (token.type == "paren.rparen") {
                level -= token.value.length;
            }
        }
        // Limit the level to +/- 1 since usually users only indent one level
        // at a time regardless of the logical nesting level
        if (level < 0) {
            return -1;
        } else if (level > 0) {
            return 1;
        } else {
            return 0;
        }
    }

    this.getNextLineIndent = function(state, line, tab) {
        var indent = this.$getIndent(line);
        var level = 0;

        var tokenizedLine = this.getTokenizer().getLineTokens(line, state);
        var tokens = tokenizedLine.tokens;

        if (state == "start") {
            level = getNetIndentLevel(tokens);
        }
        if (level > 0) {
            return indent + tab;
        } else if (level < 0 && indent.substr(indent.length - tab.length) == tab) {
            // Don't do a next-line outdent if we're going to do a real outdent of this line
            if (!this.checkOutdent(state, line, "\n")) {
                return indent.substr(0, indent.length - tab.length);
            }
        }
        return indent;
    };

    this.checkOutdent = function(state, line, input) {
        if (input != "\n" && input != "\r" && input != "\r\n")
            return false;

        if (line.match(/^\s*[\)\}\]]$/))
            return true;

        var tokens = this.getTokenizer().getLineTokens(line.trim(), state).tokens;

        if (!tokens || !tokens.length)
            return false;

        return (tokens[0].type == "keyword" && outdentKeywords.indexOf(tokens[0].value) != -1);
    };

    this.getMatching = function(session, row, column) {
        if (row == undefined) {
            var pos = session.selection.lead;
            column = pos.column;
            row = pos.row;
        }

        var startToken = session.getTokenAt(row, column);
        if (startToken && startToken.value in indentKeywords)
            return this.foldingRules.luaBlock(session, row, column, true);
    };

    this.autoOutdent = function(state, session, row) {
        var line = session.getLine(row);
        var column = line.match(/^\s*/)[0].length;
        if (!column || !row) return;

        var startRange = this.getMatching(session, row, column + 1);
        if (!startRange || startRange.start.row == row)
             return;
        var indent = this.$getIndent(session.getLine(startRange.start.row));
        if (indent.length != column) {
            session.replace(new Range(row, 0, row, column), indent);
            session.outdentRows(new Range(row + 1, 0, row + 1, 0));
        }
    };

    this.createWorker = function(session) {
        var worker = new WorkerClient(["ace"], "ace/mode/lua_worker", "Worker");
        worker.attachToDocument(session.getDocument());
        
        worker.on("annotate", function(e) {
            session.setAnnotations(e.data);
        });
        
        worker.on("terminate", function() {
            session.clearAnnotations();
        });
        
        return worker;
    };

    this.$id = "ace/mode/lua";
    this.snippetFileId = "ace/snippets/lua";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 49858:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

var LuaHighlightRules = function() {

    var keywords = (
        "break|do|else|elseif|end|for|function|if|in|local|repeat|"+
         "return|then|until|while|or|and|not"
    );

    var builtinConstants = ("true|false|nil|_G|_VERSION");

    var functions = (
      // builtinFunctions
        "string|xpcall|package|tostring|print|os|unpack|require|"+
        "getfenv|setmetatable|next|assert|tonumber|io|rawequal|"+
        "collectgarbage|getmetatable|module|rawset|math|debug|"+
        "pcall|table|newproxy|type|coroutine|_G|select|gcinfo|"+
        "pairs|rawget|loadstring|ipairs|_VERSION|dofile|setfenv|"+
        "load|error|loadfile|"+

        "sub|upper|len|gfind|rep|find|match|char|dump|gmatch|"+
        "reverse|byte|format|gsub|lower|preload|loadlib|loaded|"+
        "loaders|cpath|config|path|seeall|exit|setlocale|date|"+
        "getenv|difftime|remove|time|clock|tmpname|rename|execute|"+
        "lines|write|close|flush|open|output|type|read|stderr|"+
        "stdin|input|stdout|popen|tmpfile|log|max|acos|huge|"+
        "ldexp|pi|cos|tanh|pow|deg|tan|cosh|sinh|random|randomseed|"+
        "frexp|ceil|floor|rad|abs|sqrt|modf|asin|min|mod|fmod|log10|"+
        "atan2|exp|sin|atan|getupvalue|debug|sethook|getmetatable|"+
        "gethook|setmetatable|setlocal|traceback|setfenv|getinfo|"+
        "setupvalue|getlocal|getregistry|getfenv|setn|insert|getn|"+
        "foreachi|maxn|foreach|concat|sort|remove|resume|yield|"+
        "status|wrap|create|running|"+
      // metatableMethods
        "__add|__sub|__mod|__unm|__concat|__lt|__index|__call|__gc|__metatable|"+
         "__mul|__div|__pow|__len|__eq|__le|__newindex|__tostring|__mode|__tonumber"
    );

    var stdLibaries = ("string|package|os|io|math|debug|table|coroutine");

    var deprecatedIn5152 = ("setn|foreach|foreachi|gcinfo|log10|maxn");

    var keywordMapper = this.createKeywordMapper({
        "keyword": keywords,
        "support.function": functions,
        "keyword.deprecated": deprecatedIn5152,
        "constant.library": stdLibaries,
        "constant.language": builtinConstants,
        "variable.language": "self"
    }, "identifier");

    var decimalInteger = "(?:(?:[1-9]\\d*)|(?:0))";
    var hexInteger = "(?:0[xX][\\dA-Fa-f]+)";
    var integer = "(?:" + decimalInteger + "|" + hexInteger + ")";

    var fraction = "(?:\\.\\d+)";
    var intPart = "(?:\\d+)";
    var pointFloat = "(?:(?:" + intPart + "?" + fraction + ")|(?:" + intPart + "\\.))";
    var floatNumber = "(?:" + pointFloat + ")";

    this.$rules = {
        "start" : [{
            stateName: "bracketedComment",
            onMatch : function(value, currentState, stack){
                stack.unshift(this.next, value.length - 2, currentState);
                return "comment";
            },
            regex : /\-\-\[=*\[/,
            next  : [
                {
                    onMatch : function(value, currentState, stack) {
                        if (value.length == stack[1]) {
                            stack.shift();
                            stack.shift();
                            this.next = stack.shift();
                        } else {
                            this.next = "";
                        }
                        return "comment";
                    },
                    regex : /\]=*\]/,
                    next  : "start"
                }, {
                    defaultToken: "comment.body"
                }
            ]
        },

        {
            token : "comment",
            regex : "\\-\\-.*$"
        },
        {
            stateName: "bracketedString",
            onMatch : function(value, currentState, stack){
                stack.unshift(this.next, value.length, currentState);
                return "string.start";
            },
            regex : /\[=*\[/,
            next  : [
                {
                    onMatch : function(value, currentState, stack) {
                        if (value.length == stack[1]) {
                            stack.shift();
                            stack.shift();
                            this.next = stack.shift();
                        } else {
                            this.next = "";
                        }
                        return "string.end";
                    },
                    
                    regex : /\]=*\]/,
                    next  : "start"
                }, {
                    defaultToken : "string"
                }
            ]
        },
        {
            token : "string",           // " string
            regex : '"(?:[^\\\\]|\\\\.)*?"'
        }, {
            token : "string",           // ' string
            regex : "'(?:[^\\\\]|\\\\.)*?'"
        }, {
            token : "constant.numeric", // float
            regex : floatNumber
        }, {
            token : "constant.numeric", // integer
            regex : integer + "\\b"
        }, {
            token : keywordMapper,
            regex : "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
        }, {
            token : "keyword.operator",
            regex : "\\+|\\-|\\*|\\/|%|\\#|\\^|~|<|>|<=|=>|==|~=|=|\\:|\\.\\.\\.|\\.\\."
        }, {
            token : "paren.lparen",
            regex : "[\\[\\(\\{]"
        }, {
            token : "paren.rparen",
            regex : "[\\]\\)\\}]"
        }, {
            token : "text",
            regex : "\\s+|\\w+"
        } ]
    };
    
    this.normalizeRules();
};

oop.inherits(LuaHighlightRules, TextHighlightRules);

exports.W = LuaHighlightRules;


/***/ }),

/***/ 88130:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var HtmlMode = (__webpack_require__(32234).Mode);
var LuaMode = (__webpack_require__(39781).Mode);
var LuaPageHighlightRules = (__webpack_require__(7957)/* .LuaPageHighlightRules */ .v);

var Mode = function() {
    HtmlMode.call(this);
    
    this.HighlightRules = LuaPageHighlightRules;
    this.createModeDelegates({
        "lua-": LuaMode
    });
};
oop.inherits(Mode, HtmlMode);

(function() {
    this.$id = "ace/mode/luapage";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 7957:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

// LuaPage implements the LuaPage markup as described by the Kepler Project's CGILua
// documentation: http://keplerproject.github.com/cgilua/manual.html#templates



var oop = __webpack_require__(2645);
var HtmlHighlightRules = (__webpack_require__(10413).HtmlHighlightRules);
var LuaHighlightRules = (__webpack_require__(49858)/* .LuaHighlightRules */ .W);

var LuaPageHighlightRules = function() {
    HtmlHighlightRules.call(this);

    var startRules = [
        {
            token: "keyword",
            regex: "<\\%\\=?",
            push: "lua-start"
        }, {
            token: "keyword",
            regex: "<\\?lua\\=?",
            push: "lua-start"
        }
    ];

    var endRules = [
        {
            token: "keyword",
            regex: "\\%>",
            next: "pop"
        }, {
            token: "keyword",
            regex: "\\?>",
            next: "pop"
        }
    ];

    this.embedRules(LuaHighlightRules, "lua-", endRules, ["start"]);

    for (var key in this.$rules)
        this.$rules[key].unshift.apply(this.$rules[key], startRules);

    this.normalizeRules();
};

oop.inherits(LuaPageHighlightRules, HtmlHighlightRules);

exports.v = LuaPageHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQzs7QUFFRCxZQUFZOzs7Ozs7OztBQ3JCWjtBQUNBOztBQUVhOztBQUViLFVBQVUsbUJBQU8sQ0FBQyxJQUFZO0FBQzlCLHlCQUF5QiwrQ0FBb0Q7QUFDN0Usd0JBQXdCLHVEQUFrRDs7QUFFMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQSxTQUE2QiIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvZm9sZGluZy9sdWEuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9sdWEuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9sdWFfaGlnaGxpZ2h0X3J1bGVzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvbHVhcGFnZS5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2x1YXBhZ2VfaGlnaGxpZ2h0X3J1bGVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uLy4uL2xpYi9vb3BcIik7XG52YXIgQmFzZUZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZF9tb2RlXCIpLkZvbGRNb2RlO1xudmFyIFJhbmdlID0gcmVxdWlyZShcIi4uLy4uL3JhbmdlXCIpLlJhbmdlO1xudmFyIFRva2VuSXRlcmF0b3IgPSByZXF1aXJlKFwiLi4vLi4vdG9rZW5faXRlcmF0b3JcIikuVG9rZW5JdGVyYXRvcjtcblxuXG52YXIgRm9sZE1vZGUgPSBleHBvcnRzLkZvbGRNb2RlID0gZnVuY3Rpb24oKSB7fTtcblxub29wLmluaGVyaXRzKEZvbGRNb2RlLCBCYXNlRm9sZE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG5cbiAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlciA9IC9cXGIoZnVuY3Rpb258dGhlbnxkb3xyZXBlYXQpXFxifHtcXHMqJHwoXFxbPSpcXFspLztcbiAgICB0aGlzLmZvbGRpbmdTdG9wTWFya2VyID0gL1xcYmVuZFxcYnxeXFxzKn18XFxdPSpcXF0vO1xuXG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0ID0gZnVuY3Rpb24oc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgdmFyIGlzU3RhcnQgPSB0aGlzLmZvbGRpbmdTdGFydE1hcmtlci50ZXN0KGxpbmUpO1xuICAgICAgICB2YXIgaXNFbmQgPSB0aGlzLmZvbGRpbmdTdG9wTWFya2VyLnRlc3QobGluZSk7XG5cbiAgICAgICAgaWYgKGlzU3RhcnQgJiYgIWlzRW5kKSB7XG4gICAgICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyKTtcbiAgICAgICAgICAgIGlmIChtYXRjaFsxXSA9PSBcInRoZW5cIiAmJiAvXFxiZWxzZWlmXFxiLy50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGlmIChtYXRjaFsxXSkge1xuICAgICAgICAgICAgICAgIGlmIChzZXNzaW9uLmdldFRva2VuQXQocm93LCBtYXRjaC5pbmRleCArIDEpLnR5cGUgPT09IFwia2V5d29yZFwiKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJzdGFydFwiO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChtYXRjaFsyXSkge1xuICAgICAgICAgICAgICAgIHZhciB0eXBlID0gc2Vzc2lvbi5iZ1Rva2VuaXplci5nZXRTdGF0ZShyb3cpIHx8IFwiXCI7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVbMF0gPT0gXCJicmFja2V0ZWRDb21tZW50XCIgfHwgdHlwZVswXSA9PSBcImJyYWNrZXRlZFN0cmluZ1wiKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJzdGFydFwiO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJzdGFydFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChmb2xkU3R5bGUgIT0gXCJtYXJrYmVnaW5lbmRcIiB8fCAhaXNFbmQgfHwgaXNTdGFydCAmJiBpc0VuZClcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xuXG4gICAgICAgIHZhciBtYXRjaCA9IGxpbmUubWF0Y2godGhpcy5mb2xkaW5nU3RvcE1hcmtlcik7XG4gICAgICAgIGlmIChtYXRjaFswXSA9PT0gXCJlbmRcIikge1xuICAgICAgICAgICAgaWYgKHNlc3Npb24uZ2V0VG9rZW5BdChyb3csIG1hdGNoLmluZGV4ICsgMSkudHlwZSA9PT0gXCJrZXl3b3JkXCIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiZW5kXCI7XG4gICAgICAgIH0gZWxzZSBpZiAobWF0Y2hbMF1bMF0gPT09IFwiXVwiKSB7XG4gICAgICAgICAgICB2YXIgdHlwZSA9IHNlc3Npb24uYmdUb2tlbml6ZXIuZ2V0U3RhdGUocm93IC0gMSkgfHwgXCJcIjtcbiAgICAgICAgICAgIGlmICh0eXBlWzBdID09IFwiYnJhY2tldGVkQ29tbWVudFwiIHx8IHR5cGVbMF0gPT0gXCJicmFja2V0ZWRTdHJpbmdcIilcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJlbmRcIjtcbiAgICAgICAgfSBlbHNlXG4gICAgICAgICAgICByZXR1cm4gXCJlbmRcIjtcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0UmFuZ2UgPSBmdW5jdGlvbihzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdykge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZG9jLmdldExpbmUocm93KTtcbiAgICAgICAgdmFyIG1hdGNoID0gdGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIuZXhlYyhsaW5lKTtcbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICBpZiAobWF0Y2hbMV0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubHVhQmxvY2soc2Vzc2lvbiwgcm93LCBtYXRjaC5pbmRleCArIDEpO1xuXG4gICAgICAgICAgICBpZiAobWF0Y2hbMl0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlc3Npb24uZ2V0Q29tbWVudEZvbGRSYW5nZShyb3csIG1hdGNoLmluZGV4ICsgMSk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9wZW5pbmdCcmFja2V0QmxvY2soc2Vzc2lvbiwgXCJ7XCIsIHJvdywgbWF0Y2guaW5kZXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG1hdGNoID0gdGhpcy5mb2xkaW5nU3RvcE1hcmtlci5leGVjKGxpbmUpO1xuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIGlmIChtYXRjaFswXSA9PT0gXCJlbmRcIikge1xuICAgICAgICAgICAgICAgIGlmIChzZXNzaW9uLmdldFRva2VuQXQocm93LCBtYXRjaC5pbmRleCArIDEpLnR5cGUgPT09IFwia2V5d29yZFwiKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sdWFCbG9jayhzZXNzaW9uLCByb3csIG1hdGNoLmluZGV4ICsgMSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChtYXRjaFswXVswXSA9PT0gXCJdXCIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlc3Npb24uZ2V0Q29tbWVudEZvbGRSYW5nZShyb3csIG1hdGNoLmluZGV4ICsgMSk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNsb3NpbmdCcmFja2V0QmxvY2soc2Vzc2lvbiwgXCJ9XCIsIHJvdywgbWF0Y2guaW5kZXggKyBtYXRjaFswXS5sZW5ndGgpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMubHVhQmxvY2sgPSBmdW5jdGlvbihzZXNzaW9uLCByb3csIGNvbHVtbiwgdG9rZW5SYW5nZSkge1xuICAgICAgICB2YXIgc3RyZWFtID0gbmV3IFRva2VuSXRlcmF0b3Ioc2Vzc2lvbiwgcm93LCBjb2x1bW4pO1xuICAgICAgICB2YXIgaW5kZW50S2V5d29yZHMgPSB7XG4gICAgICAgICAgICBcImZ1bmN0aW9uXCI6IDEsXG4gICAgICAgICAgICBcImRvXCI6IDEsXG4gICAgICAgICAgICBcInRoZW5cIjogMSxcbiAgICAgICAgICAgIFwiZWxzZWlmXCI6IC0xLFxuICAgICAgICAgICAgXCJlbmRcIjogLTEsXG4gICAgICAgICAgICBcInJlcGVhdFwiOiAxLFxuICAgICAgICAgICAgXCJ1bnRpbFwiOiAtMVxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciB0b2tlbiA9IHN0cmVhbS5nZXRDdXJyZW50VG9rZW4oKTtcbiAgICAgICAgaWYgKCF0b2tlbiB8fCB0b2tlbi50eXBlICE9IFwia2V5d29yZFwiKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHZhciB2YWwgPSB0b2tlbi52YWx1ZTtcbiAgICAgICAgdmFyIHN0YWNrID0gW3ZhbF07XG4gICAgICAgIHZhciBkaXIgPSBpbmRlbnRLZXl3b3Jkc1t2YWxdO1xuXG4gICAgICAgIGlmICghZGlyKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHZhciBzdGFydENvbHVtbiA9IGRpciA9PT0gLTEgPyBzdHJlYW0uZ2V0Q3VycmVudFRva2VuQ29sdW1uKCkgOiBzZXNzaW9uLmdldExpbmUocm93KS5sZW5ndGg7XG4gICAgICAgIHZhciBzdGFydFJvdyA9IHJvdztcblxuICAgICAgICBzdHJlYW0uc3RlcCA9IGRpciA9PT0gLTEgPyBzdHJlYW0uc3RlcEJhY2t3YXJkIDogc3RyZWFtLnN0ZXBGb3J3YXJkO1xuICAgICAgICB3aGlsZSh0b2tlbiA9IHN0cmVhbS5zdGVwKCkpIHtcbiAgICAgICAgICAgIGlmICh0b2tlbi50eXBlICE9PSBcImtleXdvcmRcIilcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIHZhciBsZXZlbCA9IGRpciAqIGluZGVudEtleXdvcmRzW3Rva2VuLnZhbHVlXTtcblxuICAgICAgICAgICAgaWYgKGxldmVsID4gMCkge1xuICAgICAgICAgICAgICAgIHN0YWNrLnVuc2hpZnQodG9rZW4udmFsdWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChsZXZlbCA8PSAwKSB7XG4gICAgICAgICAgICAgICAgc3RhY2suc2hpZnQoKTtcbiAgICAgICAgICAgICAgICBpZiAoIXN0YWNrLmxlbmd0aCAmJiB0b2tlbi52YWx1ZSAhPSBcImVsc2VpZlwiKVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBpZiAobGV2ZWwgPT09IDApXG4gICAgICAgICAgICAgICAgICAgIHN0YWNrLnVuc2hpZnQodG9rZW4udmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0b2tlbilcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuXG4gICAgICAgIGlmICh0b2tlblJhbmdlKVxuICAgICAgICAgICAgcmV0dXJuIHN0cmVhbS5nZXRDdXJyZW50VG9rZW5SYW5nZSgpO1xuXG4gICAgICAgIHZhciByb3cgPSBzdHJlYW0uZ2V0Q3VycmVudFRva2VuUm93KCk7XG4gICAgICAgIGlmIChkaXIgPT09IC0xKVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShyb3csIHNlc3Npb24uZ2V0TGluZShyb3cpLmxlbmd0aCwgc3RhcnRSb3csIHN0YXJ0Q29sdW1uKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShzdGFydFJvdywgc3RhcnRDb2x1bW4sIHJvdywgc3RyZWFtLmdldEN1cnJlbnRUb2tlbkNvbHVtbigpKTtcbiAgICB9O1xuXG59KS5jYWxsKEZvbGRNb2RlLnByb3RvdHlwZSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRNb2RlID0gcmVxdWlyZShcIi4vdGV4dFwiKS5Nb2RlO1xudmFyIEx1YUhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vbHVhX2hpZ2hsaWdodF9ydWxlc1wiKS5MdWFIaWdobGlnaHRSdWxlcztcbnZhciBMdWFGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRpbmcvbHVhXCIpLkZvbGRNb2RlO1xudmFyIFJhbmdlID0gcmVxdWlyZShcIi4uL3JhbmdlXCIpLlJhbmdlO1xudmFyIFdvcmtlckNsaWVudCA9IHJlcXVpcmUoXCIuLi93b3JrZXIvd29ya2VyX2NsaWVudFwiKS5Xb3JrZXJDbGllbnQ7XG5cbnZhciBNb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5IaWdobGlnaHRSdWxlcyA9IEx1YUhpZ2hsaWdodFJ1bGVzO1xuICAgIFxuICAgIHRoaXMuZm9sZGluZ1J1bGVzID0gbmV3IEx1YUZvbGRNb2RlKCk7XG4gICAgdGhpcy4kYmVoYXZpb3VyID0gdGhpcy4kZGVmYXVsdEJlaGF2aW91cjtcbn07XG5vb3AuaW5oZXJpdHMoTW9kZSwgVGV4dE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG4gICBcbiAgICB0aGlzLmxpbmVDb21tZW50U3RhcnQgPSBcIi0tXCI7XG4gICAgdGhpcy5ibG9ja0NvbW1lbnQgPSB7c3RhcnQ6IFwiLS1bW1wiLCBlbmQ6IFwiLS1dXVwifTtcbiAgICBcbiAgICB2YXIgaW5kZW50S2V5d29yZHMgPSB7XG4gICAgICAgIFwiZnVuY3Rpb25cIjogMSxcbiAgICAgICAgXCJ0aGVuXCI6IDEsXG4gICAgICAgIFwiZG9cIjogMSxcbiAgICAgICAgXCJlbHNlXCI6IDEsXG4gICAgICAgIFwiZWxzZWlmXCI6IDEsXG4gICAgICAgIFwicmVwZWF0XCI6IDEsXG4gICAgICAgIFwiZW5kXCI6IC0xLFxuICAgICAgICBcInVudGlsXCI6IC0xXG4gICAgfTtcbiAgICB2YXIgb3V0ZGVudEtleXdvcmRzID0gW1xuICAgICAgICBcImVsc2VcIixcbiAgICAgICAgXCJlbHNlaWZcIixcbiAgICAgICAgXCJlbmRcIixcbiAgICAgICAgXCJ1bnRpbFwiXG4gICAgXTtcblxuICAgIGZ1bmN0aW9uIGdldE5ldEluZGVudExldmVsKHRva2Vucykge1xuICAgICAgICB2YXIgbGV2ZWwgPSAwO1xuICAgICAgICAvLyBTdXBwb3J0IHNpbmdsZS1saW5lIGJsb2NrcyBieSBkZWNyZW1lbnRpbmcgdGhlIGluZGVudCBsZXZlbCBpZlxuICAgICAgICAvLyBhbiBlbmRpbmcgdG9rZW4gaXMgZm91bmRcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciB0b2tlbiA9IHRva2Vuc1tpXTtcbiAgICAgICAgICAgIGlmICh0b2tlbi50eXBlID09IFwia2V5d29yZFwiKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRva2VuLnZhbHVlIGluIGluZGVudEtleXdvcmRzKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldmVsICs9IGluZGVudEtleXdvcmRzW3Rva2VuLnZhbHVlXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRva2VuLnR5cGUgPT0gXCJwYXJlbi5scGFyZW5cIikge1xuICAgICAgICAgICAgICAgIGxldmVsICs9IHRva2VuLnZhbHVlLmxlbmd0aDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodG9rZW4udHlwZSA9PSBcInBhcmVuLnJwYXJlblwiKSB7XG4gICAgICAgICAgICAgICAgbGV2ZWwgLT0gdG9rZW4udmFsdWUubGVuZ3RoO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIExpbWl0IHRoZSBsZXZlbCB0byArLy0gMSBzaW5jZSB1c3VhbGx5IHVzZXJzIG9ubHkgaW5kZW50IG9uZSBsZXZlbFxuICAgICAgICAvLyBhdCBhIHRpbWUgcmVnYXJkbGVzcyBvZiB0aGUgbG9naWNhbCBuZXN0aW5nIGxldmVsXG4gICAgICAgIGlmIChsZXZlbCA8IDApIHtcbiAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfSBlbHNlIGlmIChsZXZlbCA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmdldE5leHRMaW5lSW5kZW50ID0gZnVuY3Rpb24oc3RhdGUsIGxpbmUsIHRhYikge1xuICAgICAgICB2YXIgaW5kZW50ID0gdGhpcy4kZ2V0SW5kZW50KGxpbmUpO1xuICAgICAgICB2YXIgbGV2ZWwgPSAwO1xuXG4gICAgICAgIHZhciB0b2tlbml6ZWRMaW5lID0gdGhpcy5nZXRUb2tlbml6ZXIoKS5nZXRMaW5lVG9rZW5zKGxpbmUsIHN0YXRlKTtcbiAgICAgICAgdmFyIHRva2VucyA9IHRva2VuaXplZExpbmUudG9rZW5zO1xuXG4gICAgICAgIGlmIChzdGF0ZSA9PSBcInN0YXJ0XCIpIHtcbiAgICAgICAgICAgIGxldmVsID0gZ2V0TmV0SW5kZW50TGV2ZWwodG9rZW5zKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGV2ZWwgPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5kZW50ICsgdGFiO1xuICAgICAgICB9IGVsc2UgaWYgKGxldmVsIDwgMCAmJiBpbmRlbnQuc3Vic3RyKGluZGVudC5sZW5ndGggLSB0YWIubGVuZ3RoKSA9PSB0YWIpIHtcbiAgICAgICAgICAgIC8vIERvbid0IGRvIGEgbmV4dC1saW5lIG91dGRlbnQgaWYgd2UncmUgZ29pbmcgdG8gZG8gYSByZWFsIG91dGRlbnQgb2YgdGhpcyBsaW5lXG4gICAgICAgICAgICBpZiAoIXRoaXMuY2hlY2tPdXRkZW50KHN0YXRlLCBsaW5lLCBcIlxcblwiKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpbmRlbnQuc3Vic3RyKDAsIGluZGVudC5sZW5ndGggLSB0YWIubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaW5kZW50O1xuICAgIH07XG5cbiAgICB0aGlzLmNoZWNrT3V0ZGVudCA9IGZ1bmN0aW9uKHN0YXRlLCBsaW5lLCBpbnB1dCkge1xuICAgICAgICBpZiAoaW5wdXQgIT0gXCJcXG5cIiAmJiBpbnB1dCAhPSBcIlxcclwiICYmIGlucHV0ICE9IFwiXFxyXFxuXCIpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgaWYgKGxpbmUubWF0Y2goL15cXHMqW1xcKVxcfVxcXV0kLykpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgICAgICB2YXIgdG9rZW5zID0gdGhpcy5nZXRUb2tlbml6ZXIoKS5nZXRMaW5lVG9rZW5zKGxpbmUudHJpbSgpLCBzdGF0ZSkudG9rZW5zO1xuXG4gICAgICAgIGlmICghdG9rZW5zIHx8ICF0b2tlbnMubGVuZ3RoKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIHJldHVybiAodG9rZW5zWzBdLnR5cGUgPT0gXCJrZXl3b3JkXCIgJiYgb3V0ZGVudEtleXdvcmRzLmluZGV4T2YodG9rZW5zWzBdLnZhbHVlKSAhPSAtMSk7XG4gICAgfTtcblxuICAgIHRoaXMuZ2V0TWF0Y2hpbmcgPSBmdW5jdGlvbihzZXNzaW9uLCByb3csIGNvbHVtbikge1xuICAgICAgICBpZiAocm93ID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdmFyIHBvcyA9IHNlc3Npb24uc2VsZWN0aW9uLmxlYWQ7XG4gICAgICAgICAgICBjb2x1bW4gPSBwb3MuY29sdW1uO1xuICAgICAgICAgICAgcm93ID0gcG9zLnJvdztcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzdGFydFRva2VuID0gc2Vzc2lvbi5nZXRUb2tlbkF0KHJvdywgY29sdW1uKTtcbiAgICAgICAgaWYgKHN0YXJ0VG9rZW4gJiYgc3RhcnRUb2tlbi52YWx1ZSBpbiBpbmRlbnRLZXl3b3JkcylcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZvbGRpbmdSdWxlcy5sdWFCbG9jayhzZXNzaW9uLCByb3csIGNvbHVtbiwgdHJ1ZSk7XG4gICAgfTtcblxuICAgIHRoaXMuYXV0b091dGRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgc2Vzc2lvbiwgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgIHZhciBjb2x1bW4gPSBsaW5lLm1hdGNoKC9eXFxzKi8pWzBdLmxlbmd0aDtcbiAgICAgICAgaWYgKCFjb2x1bW4gfHwgIXJvdykgcmV0dXJuO1xuXG4gICAgICAgIHZhciBzdGFydFJhbmdlID0gdGhpcy5nZXRNYXRjaGluZyhzZXNzaW9uLCByb3csIGNvbHVtbiArIDEpO1xuICAgICAgICBpZiAoIXN0YXJ0UmFuZ2UgfHwgc3RhcnRSYW5nZS5zdGFydC5yb3cgPT0gcm93KVxuICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdmFyIGluZGVudCA9IHRoaXMuJGdldEluZGVudChzZXNzaW9uLmdldExpbmUoc3RhcnRSYW5nZS5zdGFydC5yb3cpKTtcbiAgICAgICAgaWYgKGluZGVudC5sZW5ndGggIT0gY29sdW1uKSB7XG4gICAgICAgICAgICBzZXNzaW9uLnJlcGxhY2UobmV3IFJhbmdlKHJvdywgMCwgcm93LCBjb2x1bW4pLCBpbmRlbnQpO1xuICAgICAgICAgICAgc2Vzc2lvbi5vdXRkZW50Um93cyhuZXcgUmFuZ2Uocm93ICsgMSwgMCwgcm93ICsgMSwgMCkpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMuY3JlYXRlV29ya2VyID0gZnVuY3Rpb24oc2Vzc2lvbikge1xuICAgICAgICB2YXIgd29ya2VyID0gbmV3IFdvcmtlckNsaWVudChbXCJhY2VcIl0sIFwiYWNlL21vZGUvbHVhX3dvcmtlclwiLCBcIldvcmtlclwiKTtcbiAgICAgICAgd29ya2VyLmF0dGFjaFRvRG9jdW1lbnQoc2Vzc2lvbi5nZXREb2N1bWVudCgpKTtcbiAgICAgICAgXG4gICAgICAgIHdvcmtlci5vbihcImFubm90YXRlXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIHNlc3Npb24uc2V0QW5ub3RhdGlvbnMoZS5kYXRhKTtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICB3b3JrZXIub24oXCJ0ZXJtaW5hdGVcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzZXNzaW9uLmNsZWFyQW5ub3RhdGlvbnMoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gd29ya2VyO1xuICAgIH07XG5cbiAgICB0aGlzLiRpZCA9IFwiYWNlL21vZGUvbHVhXCI7XG4gICAgdGhpcy5zbmlwcGV0RmlsZUlkID0gXCJhY2Uvc25pcHBldHMvbHVhXCI7XG59KS5jYWxsKE1vZGUucHJvdG90eXBlKTtcblxuZXhwb3J0cy5Nb2RlID0gTW9kZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xuXG52YXIgTHVhSGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbigpIHtcblxuICAgIHZhciBrZXl3b3JkcyA9IChcbiAgICAgICAgXCJicmVha3xkb3xlbHNlfGVsc2VpZnxlbmR8Zm9yfGZ1bmN0aW9ufGlmfGlufGxvY2FsfHJlcGVhdHxcIitcbiAgICAgICAgIFwicmV0dXJufHRoZW58dW50aWx8d2hpbGV8b3J8YW5kfG5vdFwiXG4gICAgKTtcblxuICAgIHZhciBidWlsdGluQ29uc3RhbnRzID0gKFwidHJ1ZXxmYWxzZXxuaWx8X0d8X1ZFUlNJT05cIik7XG5cbiAgICB2YXIgZnVuY3Rpb25zID0gKFxuICAgICAgLy8gYnVpbHRpbkZ1bmN0aW9uc1xuICAgICAgICBcInN0cmluZ3x4cGNhbGx8cGFja2FnZXx0b3N0cmluZ3xwcmludHxvc3x1bnBhY2t8cmVxdWlyZXxcIitcbiAgICAgICAgXCJnZXRmZW52fHNldG1ldGF0YWJsZXxuZXh0fGFzc2VydHx0b251bWJlcnxpb3xyYXdlcXVhbHxcIitcbiAgICAgICAgXCJjb2xsZWN0Z2FyYmFnZXxnZXRtZXRhdGFibGV8bW9kdWxlfHJhd3NldHxtYXRofGRlYnVnfFwiK1xuICAgICAgICBcInBjYWxsfHRhYmxlfG5ld3Byb3h5fHR5cGV8Y29yb3V0aW5lfF9HfHNlbGVjdHxnY2luZm98XCIrXG4gICAgICAgIFwicGFpcnN8cmF3Z2V0fGxvYWRzdHJpbmd8aXBhaXJzfF9WRVJTSU9OfGRvZmlsZXxzZXRmZW52fFwiK1xuICAgICAgICBcImxvYWR8ZXJyb3J8bG9hZGZpbGV8XCIrXG5cbiAgICAgICAgXCJzdWJ8dXBwZXJ8bGVufGdmaW5kfHJlcHxmaW5kfG1hdGNofGNoYXJ8ZHVtcHxnbWF0Y2h8XCIrXG4gICAgICAgIFwicmV2ZXJzZXxieXRlfGZvcm1hdHxnc3VifGxvd2VyfHByZWxvYWR8bG9hZGxpYnxsb2FkZWR8XCIrXG4gICAgICAgIFwibG9hZGVyc3xjcGF0aHxjb25maWd8cGF0aHxzZWVhbGx8ZXhpdHxzZXRsb2NhbGV8ZGF0ZXxcIitcbiAgICAgICAgXCJnZXRlbnZ8ZGlmZnRpbWV8cmVtb3ZlfHRpbWV8Y2xvY2t8dG1wbmFtZXxyZW5hbWV8ZXhlY3V0ZXxcIitcbiAgICAgICAgXCJsaW5lc3x3cml0ZXxjbG9zZXxmbHVzaHxvcGVufG91dHB1dHx0eXBlfHJlYWR8c3RkZXJyfFwiK1xuICAgICAgICBcInN0ZGlufGlucHV0fHN0ZG91dHxwb3Blbnx0bXBmaWxlfGxvZ3xtYXh8YWNvc3xodWdlfFwiK1xuICAgICAgICBcImxkZXhwfHBpfGNvc3x0YW5ofHBvd3xkZWd8dGFufGNvc2h8c2luaHxyYW5kb218cmFuZG9tc2VlZHxcIitcbiAgICAgICAgXCJmcmV4cHxjZWlsfGZsb29yfHJhZHxhYnN8c3FydHxtb2RmfGFzaW58bWlufG1vZHxmbW9kfGxvZzEwfFwiK1xuICAgICAgICBcImF0YW4yfGV4cHxzaW58YXRhbnxnZXR1cHZhbHVlfGRlYnVnfHNldGhvb2t8Z2V0bWV0YXRhYmxlfFwiK1xuICAgICAgICBcImdldGhvb2t8c2V0bWV0YXRhYmxlfHNldGxvY2FsfHRyYWNlYmFja3xzZXRmZW52fGdldGluZm98XCIrXG4gICAgICAgIFwic2V0dXB2YWx1ZXxnZXRsb2NhbHxnZXRyZWdpc3RyeXxnZXRmZW52fHNldG58aW5zZXJ0fGdldG58XCIrXG4gICAgICAgIFwiZm9yZWFjaGl8bWF4bnxmb3JlYWNofGNvbmNhdHxzb3J0fHJlbW92ZXxyZXN1bWV8eWllbGR8XCIrXG4gICAgICAgIFwic3RhdHVzfHdyYXB8Y3JlYXRlfHJ1bm5pbmd8XCIrXG4gICAgICAvLyBtZXRhdGFibGVNZXRob2RzXG4gICAgICAgIFwiX19hZGR8X19zdWJ8X19tb2R8X191bm18X19jb25jYXR8X19sdHxfX2luZGV4fF9fY2FsbHxfX2djfF9fbWV0YXRhYmxlfFwiK1xuICAgICAgICAgXCJfX211bHxfX2RpdnxfX3Bvd3xfX2xlbnxfX2VxfF9fbGV8X19uZXdpbmRleHxfX3Rvc3RyaW5nfF9fbW9kZXxfX3RvbnVtYmVyXCJcbiAgICApO1xuXG4gICAgdmFyIHN0ZExpYmFyaWVzID0gKFwic3RyaW5nfHBhY2thZ2V8b3N8aW98bWF0aHxkZWJ1Z3x0YWJsZXxjb3JvdXRpbmVcIik7XG5cbiAgICB2YXIgZGVwcmVjYXRlZEluNTE1MiA9IChcInNldG58Zm9yZWFjaHxmb3JlYWNoaXxnY2luZm98bG9nMTB8bWF4blwiKTtcblxuICAgIHZhciBrZXl3b3JkTWFwcGVyID0gdGhpcy5jcmVhdGVLZXl3b3JkTWFwcGVyKHtcbiAgICAgICAgXCJrZXl3b3JkXCI6IGtleXdvcmRzLFxuICAgICAgICBcInN1cHBvcnQuZnVuY3Rpb25cIjogZnVuY3Rpb25zLFxuICAgICAgICBcImtleXdvcmQuZGVwcmVjYXRlZFwiOiBkZXByZWNhdGVkSW41MTUyLFxuICAgICAgICBcImNvbnN0YW50LmxpYnJhcnlcIjogc3RkTGliYXJpZXMsXG4gICAgICAgIFwiY29uc3RhbnQubGFuZ3VhZ2VcIjogYnVpbHRpbkNvbnN0YW50cyxcbiAgICAgICAgXCJ2YXJpYWJsZS5sYW5ndWFnZVwiOiBcInNlbGZcIlxuICAgIH0sIFwiaWRlbnRpZmllclwiKTtcblxuICAgIHZhciBkZWNpbWFsSW50ZWdlciA9IFwiKD86KD86WzEtOV1cXFxcZCopfCg/OjApKVwiO1xuICAgIHZhciBoZXhJbnRlZ2VyID0gXCIoPzowW3hYXVtcXFxcZEEtRmEtZl0rKVwiO1xuICAgIHZhciBpbnRlZ2VyID0gXCIoPzpcIiArIGRlY2ltYWxJbnRlZ2VyICsgXCJ8XCIgKyBoZXhJbnRlZ2VyICsgXCIpXCI7XG5cbiAgICB2YXIgZnJhY3Rpb24gPSBcIig/OlxcXFwuXFxcXGQrKVwiO1xuICAgIHZhciBpbnRQYXJ0ID0gXCIoPzpcXFxcZCspXCI7XG4gICAgdmFyIHBvaW50RmxvYXQgPSBcIig/Oig/OlwiICsgaW50UGFydCArIFwiP1wiICsgZnJhY3Rpb24gKyBcIil8KD86XCIgKyBpbnRQYXJ0ICsgXCJcXFxcLikpXCI7XG4gICAgdmFyIGZsb2F0TnVtYmVyID0gXCIoPzpcIiArIHBvaW50RmxvYXQgKyBcIilcIjtcblxuICAgIHRoaXMuJHJ1bGVzID0ge1xuICAgICAgICBcInN0YXJ0XCIgOiBbe1xuICAgICAgICAgICAgc3RhdGVOYW1lOiBcImJyYWNrZXRlZENvbW1lbnRcIixcbiAgICAgICAgICAgIG9uTWF0Y2ggOiBmdW5jdGlvbih2YWx1ZSwgY3VycmVudFN0YXRlLCBzdGFjayl7XG4gICAgICAgICAgICAgICAgc3RhY2sudW5zaGlmdCh0aGlzLm5leHQsIHZhbHVlLmxlbmd0aCAtIDIsIGN1cnJlbnRTdGF0ZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiY29tbWVudFwiO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlZ2V4IDogL1xcLVxcLVxcWz0qXFxbLyxcbiAgICAgICAgICAgIG5leHQgIDogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgb25NYXRjaCA6IGZ1bmN0aW9uKHZhbHVlLCBjdXJyZW50U3RhdGUsIHN0YWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUubGVuZ3RoID09IHN0YWNrWzFdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhY2suc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFjay5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dCA9IHN0YWNrLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJjb21tZW50XCI7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogL1xcXT0qXFxdLyxcbiAgICAgICAgICAgICAgICAgICAgbmV4dCAgOiBcInN0YXJ0XCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJjb21tZW50LmJvZHlcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcblxuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudFwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwtXFxcXC0uKiRcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBzdGF0ZU5hbWU6IFwiYnJhY2tldGVkU3RyaW5nXCIsXG4gICAgICAgICAgICBvbk1hdGNoIDogZnVuY3Rpb24odmFsdWUsIGN1cnJlbnRTdGF0ZSwgc3RhY2spe1xuICAgICAgICAgICAgICAgIHN0YWNrLnVuc2hpZnQodGhpcy5uZXh0LCB2YWx1ZS5sZW5ndGgsIGN1cnJlbnRTdGF0ZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwic3RyaW5nLnN0YXJ0XCI7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVnZXggOiAvXFxbPSpcXFsvLFxuICAgICAgICAgICAgbmV4dCAgOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBvbk1hdGNoIDogZnVuY3Rpb24odmFsdWUsIGN1cnJlbnRTdGF0ZSwgc3RhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5sZW5ndGggPT0gc3RhY2tbMV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFjay5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWNrLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0ID0gc3RhY2suc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0ID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcInN0cmluZy5lbmRcIjtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogL1xcXT0qXFxdLyxcbiAgICAgICAgICAgICAgICAgICAgbmV4dCAgOiBcInN0YXJ0XCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbiA6IFwic3RyaW5nXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIiwgICAgICAgICAgIC8vIFwiIHN0cmluZ1xuICAgICAgICAgICAgcmVnZXggOiAnXCIoPzpbXlxcXFxcXFxcXXxcXFxcXFxcXC4pKj9cIidcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLCAgICAgICAgICAgLy8gJyBzdHJpbmdcbiAgICAgICAgICAgIHJlZ2V4IDogXCInKD86W15cXFxcXFxcXF18XFxcXFxcXFwuKSo/J1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5udW1lcmljXCIsIC8vIGZsb2F0XG4gICAgICAgICAgICByZWdleCA6IGZsb2F0TnVtYmVyXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5udW1lcmljXCIsIC8vIGludGVnZXJcbiAgICAgICAgICAgIHJlZ2V4IDogaW50ZWdlciArIFwiXFxcXGJcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IGtleXdvcmRNYXBwZXIsXG4gICAgICAgICAgICByZWdleCA6IFwiW2EtekEtWl8kXVthLXpBLVowLTlfJF0qXFxcXGJcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwia2V5d29yZC5vcGVyYXRvclwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwrfFxcXFwtfFxcXFwqfFxcXFwvfCV8XFxcXCN8XFxcXF58fnw8fD58PD18PT58PT18fj18PXxcXFxcOnxcXFxcLlxcXFwuXFxcXC58XFxcXC5cXFxcLlwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJwYXJlbi5scGFyZW5cIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJbXFxcXFtcXFxcKFxcXFx7XVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJwYXJlbi5ycGFyZW5cIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJbXFxcXF1cXFxcKVxcXFx9XVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJ0ZXh0XCIsXG4gICAgICAgICAgICByZWdleCA6IFwiXFxcXHMrfFxcXFx3K1wiXG4gICAgICAgIH0gXVxuICAgIH07XG4gICAgXG4gICAgdGhpcy5ub3JtYWxpemVSdWxlcygpO1xufTtcblxub29wLmluaGVyaXRzKEx1YUhpZ2hsaWdodFJ1bGVzLCBUZXh0SGlnaGxpZ2h0UnVsZXMpO1xuXG5leHBvcnRzLkx1YUhpZ2hsaWdodFJ1bGVzID0gTHVhSGlnaGxpZ2h0UnVsZXM7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIEh0bWxNb2RlID0gcmVxdWlyZShcIi4vaHRtbFwiKS5Nb2RlO1xudmFyIEx1YU1vZGUgPSByZXF1aXJlKFwiLi9sdWFcIikuTW9kZTtcbnZhciBMdWFQYWdlSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9sdWFwYWdlX2hpZ2hsaWdodF9ydWxlc1wiKS5MdWFQYWdlSGlnaGxpZ2h0UnVsZXM7XG5cbnZhciBNb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgSHRtbE1vZGUuY2FsbCh0aGlzKTtcbiAgICBcbiAgICB0aGlzLkhpZ2hsaWdodFJ1bGVzID0gTHVhUGFnZUhpZ2hsaWdodFJ1bGVzO1xuICAgIHRoaXMuY3JlYXRlTW9kZURlbGVnYXRlcyh7XG4gICAgICAgIFwibHVhLVwiOiBMdWFNb2RlXG4gICAgfSk7XG59O1xub29wLmluaGVyaXRzKE1vZGUsIEh0bWxNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuJGlkID0gXCJhY2UvbW9kZS9sdWFwYWdlXCI7XG59KS5jYWxsKE1vZGUucHJvdG90eXBlKTtcblxuZXhwb3J0cy5Nb2RlID0gTW9kZTtcbiIsIi8vIEx1YVBhZ2UgaW1wbGVtZW50cyB0aGUgTHVhUGFnZSBtYXJrdXAgYXMgZGVzY3JpYmVkIGJ5IHRoZSBLZXBsZXIgUHJvamVjdCdzIENHSUx1YVxuLy8gZG9jdW1lbnRhdGlvbjogaHR0cDovL2tlcGxlcnByb2plY3QuZ2l0aHViLmNvbS9jZ2lsdWEvbWFudWFsLmh0bWwjdGVtcGxhdGVzXG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgSHRtbEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vaHRtbF9oaWdobGlnaHRfcnVsZXNcIikuSHRtbEhpZ2hsaWdodFJ1bGVzO1xudmFyIEx1YUhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vbHVhX2hpZ2hsaWdodF9ydWxlc1wiKS5MdWFIaWdobGlnaHRSdWxlcztcblxudmFyIEx1YVBhZ2VIaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uKCkge1xuICAgIEh0bWxIaWdobGlnaHRSdWxlcy5jYWxsKHRoaXMpO1xuXG4gICAgdmFyIHN0YXJ0UnVsZXMgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuOiBcImtleXdvcmRcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIjxcXFxcJVxcXFw9P1wiLFxuICAgICAgICAgICAgcHVzaDogXCJsdWEtc3RhcnRcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJrZXl3b3JkXCIsXG4gICAgICAgICAgICByZWdleDogXCI8XFxcXD9sdWFcXFxcPT9cIixcbiAgICAgICAgICAgIHB1c2g6IFwibHVhLXN0YXJ0XCJcbiAgICAgICAgfVxuICAgIF07XG5cbiAgICB2YXIgZW5kUnVsZXMgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuOiBcImtleXdvcmRcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFwlPlwiLFxuICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJrZXl3b3JkXCIsXG4gICAgICAgICAgICByZWdleDogXCJcXFxcPz5cIixcbiAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgfVxuICAgIF07XG5cbiAgICB0aGlzLmVtYmVkUnVsZXMoTHVhSGlnaGxpZ2h0UnVsZXMsIFwibHVhLVwiLCBlbmRSdWxlcywgW1wic3RhcnRcIl0pO1xuXG4gICAgZm9yICh2YXIga2V5IGluIHRoaXMuJHJ1bGVzKVxuICAgICAgICB0aGlzLiRydWxlc1trZXldLnVuc2hpZnQuYXBwbHkodGhpcy4kcnVsZXNba2V5XSwgc3RhcnRSdWxlcyk7XG5cbiAgICB0aGlzLm5vcm1hbGl6ZVJ1bGVzKCk7XG59O1xuXG5vb3AuaW5oZXJpdHMoTHVhUGFnZUhpZ2hsaWdodFJ1bGVzLCBIdG1sSGlnaGxpZ2h0UnVsZXMpO1xuXG5leHBvcnRzLkx1YVBhZ2VIaWdobGlnaHRSdWxlcyA9IEx1YVBhZ2VIaWdobGlnaHRSdWxlcztcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==