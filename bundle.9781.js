"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[9781],{

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


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSwrQkFBK0I7QUFDL0IsU0FBUztBQUNUO0FBQ0EsK0JBQStCO0FBQy9CLFNBQVM7QUFDVDtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLFNBQXlCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9mb2xkaW5nL2x1YS5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2x1YS5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2x1YV9oaWdobGlnaHRfcnVsZXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vLi4vbGliL29vcFwiKTtcbnZhciBCYXNlRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9mb2xkX21vZGVcIikuRm9sZE1vZGU7XG52YXIgUmFuZ2UgPSByZXF1aXJlKFwiLi4vLi4vcmFuZ2VcIikuUmFuZ2U7XG52YXIgVG9rZW5JdGVyYXRvciA9IHJlcXVpcmUoXCIuLi8uLi90b2tlbl9pdGVyYXRvclwiKS5Ub2tlbkl0ZXJhdG9yO1xuXG5cbnZhciBGb2xkTW9kZSA9IGV4cG9ydHMuRm9sZE1vZGUgPSBmdW5jdGlvbigpIHt9O1xuXG5vb3AuaW5oZXJpdHMoRm9sZE1vZGUsIEJhc2VGb2xkTW9kZSk7XG5cbihmdW5jdGlvbigpIHtcblxuICAgIHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyID0gL1xcYihmdW5jdGlvbnx0aGVufGRvfHJlcGVhdClcXGJ8e1xccyokfChcXFs9KlxcWykvO1xuICAgIHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIgPSAvXFxiZW5kXFxifF5cXHMqfXxcXF09KlxcXS87XG5cbiAgICB0aGlzLmdldEZvbGRXaWRnZXQgPSBmdW5jdGlvbihzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdykge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICB2YXIgaXNTdGFydCA9IHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyLnRlc3QobGluZSk7XG4gICAgICAgIHZhciBpc0VuZCA9IHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIudGVzdChsaW5lKTtcblxuICAgICAgICBpZiAoaXNTdGFydCAmJiAhaXNFbmQpIHtcbiAgICAgICAgICAgIHZhciBtYXRjaCA9IGxpbmUubWF0Y2godGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIpO1xuICAgICAgICAgICAgaWYgKG1hdGNoWzFdID09IFwidGhlblwiICYmIC9cXGJlbHNlaWZcXGIvLnRlc3QobGluZSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKG1hdGNoWzFdKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNlc3Npb24uZ2V0VG9rZW5BdChyb3csIG1hdGNoLmluZGV4ICsgMSkudHlwZSA9PT0gXCJrZXl3b3JkXCIpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcInN0YXJ0XCI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1hdGNoWzJdKSB7XG4gICAgICAgICAgICAgICAgdmFyIHR5cGUgPSBzZXNzaW9uLmJnVG9rZW5pemVyLmdldFN0YXRlKHJvdykgfHwgXCJcIjtcbiAgICAgICAgICAgICAgICBpZiAodHlwZVswXSA9PSBcImJyYWNrZXRlZENvbW1lbnRcIiB8fCB0eXBlWzBdID09IFwiYnJhY2tldGVkU3RyaW5nXCIpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcInN0YXJ0XCI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBcInN0YXJ0XCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZvbGRTdHlsZSAhPSBcIm1hcmtiZWdpbmVuZFwiIHx8ICFpc0VuZCB8fCBpc1N0YXJ0ICYmIGlzRW5kKVxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG5cbiAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCh0aGlzLmZvbGRpbmdTdG9wTWFya2VyKTtcbiAgICAgICAgaWYgKG1hdGNoWzBdID09PSBcImVuZFwiKSB7XG4gICAgICAgICAgICBpZiAoc2Vzc2lvbi5nZXRUb2tlbkF0KHJvdywgbWF0Y2guaW5kZXggKyAxKS50eXBlID09PSBcImtleXdvcmRcIilcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJlbmRcIjtcbiAgICAgICAgfSBlbHNlIGlmIChtYXRjaFswXVswXSA9PT0gXCJdXCIpIHtcbiAgICAgICAgICAgIHZhciB0eXBlID0gc2Vzc2lvbi5iZ1Rva2VuaXplci5nZXRTdGF0ZShyb3cgLSAxKSB8fCBcIlwiO1xuICAgICAgICAgICAgaWYgKHR5cGVbMF0gPT0gXCJicmFja2V0ZWRDb21tZW50XCIgfHwgdHlwZVswXSA9PSBcImJyYWNrZXRlZFN0cmluZ1wiKVxuICAgICAgICAgICAgICAgIHJldHVybiBcImVuZFwiO1xuICAgICAgICB9IGVsc2VcbiAgICAgICAgICAgIHJldHVybiBcImVuZFwiO1xuICAgIH07XG5cbiAgICB0aGlzLmdldEZvbGRXaWRnZXRSYW5nZSA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5kb2MuZ2V0TGluZShyb3cpO1xuICAgICAgICB2YXIgbWF0Y2ggPSB0aGlzLmZvbGRpbmdTdGFydE1hcmtlci5leGVjKGxpbmUpO1xuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIGlmIChtYXRjaFsxXSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sdWFCbG9jayhzZXNzaW9uLCByb3csIG1hdGNoLmluZGV4ICsgMSk7XG5cbiAgICAgICAgICAgIGlmIChtYXRjaFsyXSlcbiAgICAgICAgICAgICAgICByZXR1cm4gc2Vzc2lvbi5nZXRDb21tZW50Rm9sZFJhbmdlKHJvdywgbWF0Y2guaW5kZXggKyAxKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMub3BlbmluZ0JyYWNrZXRCbG9jayhzZXNzaW9uLCBcIntcIiwgcm93LCBtYXRjaC5pbmRleCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbWF0Y2ggPSB0aGlzLmZvbGRpbmdTdG9wTWFya2VyLmV4ZWMobGluZSk7XG4gICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgaWYgKG1hdGNoWzBdID09PSBcImVuZFwiKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNlc3Npb24uZ2V0VG9rZW5BdChyb3csIG1hdGNoLmluZGV4ICsgMSkudHlwZSA9PT0gXCJrZXl3b3JkXCIpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmx1YUJsb2NrKHNlc3Npb24sIHJvdywgbWF0Y2guaW5kZXggKyAxKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG1hdGNoWzBdWzBdID09PSBcIl1cIilcbiAgICAgICAgICAgICAgICByZXR1cm4gc2Vzc2lvbi5nZXRDb21tZW50Rm9sZFJhbmdlKHJvdywgbWF0Y2guaW5kZXggKyAxKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2xvc2luZ0JyYWNrZXRCbG9jayhzZXNzaW9uLCBcIn1cIiwgcm93LCBtYXRjaC5pbmRleCArIG1hdGNoWzBdLmxlbmd0aCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5sdWFCbG9jayA9IGZ1bmN0aW9uKHNlc3Npb24sIHJvdywgY29sdW1uLCB0b2tlblJhbmdlKSB7XG4gICAgICAgIHZhciBzdHJlYW0gPSBuZXcgVG9rZW5JdGVyYXRvcihzZXNzaW9uLCByb3csIGNvbHVtbik7XG4gICAgICAgIHZhciBpbmRlbnRLZXl3b3JkcyA9IHtcbiAgICAgICAgICAgIFwiZnVuY3Rpb25cIjogMSxcbiAgICAgICAgICAgIFwiZG9cIjogMSxcbiAgICAgICAgICAgIFwidGhlblwiOiAxLFxuICAgICAgICAgICAgXCJlbHNlaWZcIjogLTEsXG4gICAgICAgICAgICBcImVuZFwiOiAtMSxcbiAgICAgICAgICAgIFwicmVwZWF0XCI6IDEsXG4gICAgICAgICAgICBcInVudGlsXCI6IC0xXG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIHRva2VuID0gc3RyZWFtLmdldEN1cnJlbnRUb2tlbigpO1xuICAgICAgICBpZiAoIXRva2VuIHx8IHRva2VuLnR5cGUgIT0gXCJrZXl3b3JkXCIpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdmFyIHZhbCA9IHRva2VuLnZhbHVlO1xuICAgICAgICB2YXIgc3RhY2sgPSBbdmFsXTtcbiAgICAgICAgdmFyIGRpciA9IGluZGVudEtleXdvcmRzW3ZhbF07XG5cbiAgICAgICAgaWYgKCFkaXIpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdmFyIHN0YXJ0Q29sdW1uID0gZGlyID09PSAtMSA/IHN0cmVhbS5nZXRDdXJyZW50VG9rZW5Db2x1bW4oKSA6IHNlc3Npb24uZ2V0TGluZShyb3cpLmxlbmd0aDtcbiAgICAgICAgdmFyIHN0YXJ0Um93ID0gcm93O1xuXG4gICAgICAgIHN0cmVhbS5zdGVwID0gZGlyID09PSAtMSA/IHN0cmVhbS5zdGVwQmFja3dhcmQgOiBzdHJlYW0uc3RlcEZvcndhcmQ7XG4gICAgICAgIHdoaWxlKHRva2VuID0gc3RyZWFtLnN0ZXAoKSkge1xuICAgICAgICAgICAgaWYgKHRva2VuLnR5cGUgIT09IFwia2V5d29yZFwiKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgdmFyIGxldmVsID0gZGlyICogaW5kZW50S2V5d29yZHNbdG9rZW4udmFsdWVdO1xuXG4gICAgICAgICAgICBpZiAobGV2ZWwgPiAwKSB7XG4gICAgICAgICAgICAgICAgc3RhY2sudW5zaGlmdCh0b2tlbi52YWx1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGxldmVsIDw9IDApIHtcbiAgICAgICAgICAgICAgICBzdGFjay5zaGlmdCgpO1xuICAgICAgICAgICAgICAgIGlmICghc3RhY2subGVuZ3RoICYmIHRva2VuLnZhbHVlICE9IFwiZWxzZWlmXCIpXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGlmIChsZXZlbCA9PT0gMClcbiAgICAgICAgICAgICAgICAgICAgc3RhY2sudW5zaGlmdCh0b2tlbi52YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRva2VuKVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgaWYgKHRva2VuUmFuZ2UpXG4gICAgICAgICAgICByZXR1cm4gc3RyZWFtLmdldEN1cnJlbnRUb2tlblJhbmdlKCk7XG5cbiAgICAgICAgdmFyIHJvdyA9IHN0cmVhbS5nZXRDdXJyZW50VG9rZW5Sb3coKTtcbiAgICAgICAgaWYgKGRpciA9PT0gLTEpXG4gICAgICAgICAgICByZXR1cm4gbmV3IFJhbmdlKHJvdywgc2Vzc2lvbi5nZXRMaW5lKHJvdykubGVuZ3RoLCBzdGFydFJvdywgc3RhcnRDb2x1bW4pO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gbmV3IFJhbmdlKHN0YXJ0Um93LCBzdGFydENvbHVtbiwgcm93LCBzdHJlYW0uZ2V0Q3VycmVudFRva2VuQ29sdW1uKCkpO1xuICAgIH07XG5cbn0pLmNhbGwoRm9sZE1vZGUucHJvdG90eXBlKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dE1vZGUgPSByZXF1aXJlKFwiLi90ZXh0XCIpLk1vZGU7XG52YXIgTHVhSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9sdWFfaGlnaGxpZ2h0X3J1bGVzXCIpLkx1YUhpZ2hsaWdodFJ1bGVzO1xudmFyIEx1YUZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZGluZy9sdWFcIikuRm9sZE1vZGU7XG52YXIgUmFuZ2UgPSByZXF1aXJlKFwiLi4vcmFuZ2VcIikuUmFuZ2U7XG52YXIgV29ya2VyQ2xpZW50ID0gcmVxdWlyZShcIi4uL3dvcmtlci93b3JrZXJfY2xpZW50XCIpLldvcmtlckNsaWVudDtcblxudmFyIE1vZGUgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLkhpZ2hsaWdodFJ1bGVzID0gTHVhSGlnaGxpZ2h0UnVsZXM7XG4gICAgXG4gICAgdGhpcy5mb2xkaW5nUnVsZXMgPSBuZXcgTHVhRm9sZE1vZGUoKTtcbiAgICB0aGlzLiRiZWhhdmlvdXIgPSB0aGlzLiRkZWZhdWx0QmVoYXZpb3VyO1xufTtcbm9vcC5pbmhlcml0cyhNb2RlLCBUZXh0TW9kZSk7XG5cbihmdW5jdGlvbigpIHtcbiAgIFxuICAgIHRoaXMubGluZUNvbW1lbnRTdGFydCA9IFwiLS1cIjtcbiAgICB0aGlzLmJsb2NrQ29tbWVudCA9IHtzdGFydDogXCItLVtbXCIsIGVuZDogXCItLV1dXCJ9O1xuICAgIFxuICAgIHZhciBpbmRlbnRLZXl3b3JkcyA9IHtcbiAgICAgICAgXCJmdW5jdGlvblwiOiAxLFxuICAgICAgICBcInRoZW5cIjogMSxcbiAgICAgICAgXCJkb1wiOiAxLFxuICAgICAgICBcImVsc2VcIjogMSxcbiAgICAgICAgXCJlbHNlaWZcIjogMSxcbiAgICAgICAgXCJyZXBlYXRcIjogMSxcbiAgICAgICAgXCJlbmRcIjogLTEsXG4gICAgICAgIFwidW50aWxcIjogLTFcbiAgICB9O1xuICAgIHZhciBvdXRkZW50S2V5d29yZHMgPSBbXG4gICAgICAgIFwiZWxzZVwiLFxuICAgICAgICBcImVsc2VpZlwiLFxuICAgICAgICBcImVuZFwiLFxuICAgICAgICBcInVudGlsXCJcbiAgICBdO1xuXG4gICAgZnVuY3Rpb24gZ2V0TmV0SW5kZW50TGV2ZWwodG9rZW5zKSB7XG4gICAgICAgIHZhciBsZXZlbCA9IDA7XG4gICAgICAgIC8vIFN1cHBvcnQgc2luZ2xlLWxpbmUgYmxvY2tzIGJ5IGRlY3JlbWVudGluZyB0aGUgaW5kZW50IGxldmVsIGlmXG4gICAgICAgIC8vIGFuIGVuZGluZyB0b2tlbiBpcyBmb3VuZFxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHRva2VuID0gdG9rZW5zW2ldO1xuICAgICAgICAgICAgaWYgKHRva2VuLnR5cGUgPT0gXCJrZXl3b3JkXCIpIHtcbiAgICAgICAgICAgICAgICBpZiAodG9rZW4udmFsdWUgaW4gaW5kZW50S2V5d29yZHMpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV2ZWwgKz0gaW5kZW50S2V5d29yZHNbdG9rZW4udmFsdWVdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAodG9rZW4udHlwZSA9PSBcInBhcmVuLmxwYXJlblwiKSB7XG4gICAgICAgICAgICAgICAgbGV2ZWwgKz0gdG9rZW4udmFsdWUubGVuZ3RoO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0b2tlbi50eXBlID09IFwicGFyZW4ucnBhcmVuXCIpIHtcbiAgICAgICAgICAgICAgICBsZXZlbCAtPSB0b2tlbi52YWx1ZS5sZW5ndGg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gTGltaXQgdGhlIGxldmVsIHRvICsvLSAxIHNpbmNlIHVzdWFsbHkgdXNlcnMgb25seSBpbmRlbnQgb25lIGxldmVsXG4gICAgICAgIC8vIGF0IGEgdGltZSByZWdhcmRsZXNzIG9mIHRoZSBsb2dpY2FsIG5lc3RpbmcgbGV2ZWxcbiAgICAgICAgaWYgKGxldmVsIDwgMCkge1xuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9IGVsc2UgaWYgKGxldmVsID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuZ2V0TmV4dExpbmVJbmRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgbGluZSwgdGFiKSB7XG4gICAgICAgIHZhciBpbmRlbnQgPSB0aGlzLiRnZXRJbmRlbnQobGluZSk7XG4gICAgICAgIHZhciBsZXZlbCA9IDA7XG5cbiAgICAgICAgdmFyIHRva2VuaXplZExpbmUgPSB0aGlzLmdldFRva2VuaXplcigpLmdldExpbmVUb2tlbnMobGluZSwgc3RhdGUpO1xuICAgICAgICB2YXIgdG9rZW5zID0gdG9rZW5pemVkTGluZS50b2tlbnM7XG5cbiAgICAgICAgaWYgKHN0YXRlID09IFwic3RhcnRcIikge1xuICAgICAgICAgICAgbGV2ZWwgPSBnZXROZXRJbmRlbnRMZXZlbCh0b2tlbnMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsZXZlbCA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiBpbmRlbnQgKyB0YWI7XG4gICAgICAgIH0gZWxzZSBpZiAobGV2ZWwgPCAwICYmIGluZGVudC5zdWJzdHIoaW5kZW50Lmxlbmd0aCAtIHRhYi5sZW5ndGgpID09IHRhYikge1xuICAgICAgICAgICAgLy8gRG9uJ3QgZG8gYSBuZXh0LWxpbmUgb3V0ZGVudCBpZiB3ZSdyZSBnb2luZyB0byBkbyBhIHJlYWwgb3V0ZGVudCBvZiB0aGlzIGxpbmVcbiAgICAgICAgICAgIGlmICghdGhpcy5jaGVja091dGRlbnQoc3RhdGUsIGxpbmUsIFwiXFxuXCIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGluZGVudC5zdWJzdHIoMCwgaW5kZW50Lmxlbmd0aCAtIHRhYi5sZW5ndGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpbmRlbnQ7XG4gICAgfTtcblxuICAgIHRoaXMuY2hlY2tPdXRkZW50ID0gZnVuY3Rpb24oc3RhdGUsIGxpbmUsIGlucHV0KSB7XG4gICAgICAgIGlmIChpbnB1dCAhPSBcIlxcblwiICYmIGlucHV0ICE9IFwiXFxyXCIgJiYgaW5wdXQgIT0gXCJcXHJcXG5cIilcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgICBpZiAobGluZS5tYXRjaCgvXlxccypbXFwpXFx9XFxdXSQvKSlcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgICAgIHZhciB0b2tlbnMgPSB0aGlzLmdldFRva2VuaXplcigpLmdldExpbmVUb2tlbnMobGluZS50cmltKCksIHN0YXRlKS50b2tlbnM7XG5cbiAgICAgICAgaWYgKCF0b2tlbnMgfHwgIXRva2Vucy5sZW5ndGgpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgcmV0dXJuICh0b2tlbnNbMF0udHlwZSA9PSBcImtleXdvcmRcIiAmJiBvdXRkZW50S2V5d29yZHMuaW5kZXhPZih0b2tlbnNbMF0udmFsdWUpICE9IC0xKTtcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRNYXRjaGluZyA9IGZ1bmN0aW9uKHNlc3Npb24sIHJvdywgY29sdW1uKSB7XG4gICAgICAgIGlmIChyb3cgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB2YXIgcG9zID0gc2Vzc2lvbi5zZWxlY3Rpb24ubGVhZDtcbiAgICAgICAgICAgIGNvbHVtbiA9IHBvcy5jb2x1bW47XG4gICAgICAgICAgICByb3cgPSBwb3Mucm93O1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHN0YXJ0VG9rZW4gPSBzZXNzaW9uLmdldFRva2VuQXQocm93LCBjb2x1bW4pO1xuICAgICAgICBpZiAoc3RhcnRUb2tlbiAmJiBzdGFydFRva2VuLnZhbHVlIGluIGluZGVudEtleXdvcmRzKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZm9sZGluZ1J1bGVzLmx1YUJsb2NrKHNlc3Npb24sIHJvdywgY29sdW1uLCB0cnVlKTtcbiAgICB9O1xuXG4gICAgdGhpcy5hdXRvT3V0ZGVudCA9IGZ1bmN0aW9uKHN0YXRlLCBzZXNzaW9uLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgdmFyIGNvbHVtbiA9IGxpbmUubWF0Y2goL15cXHMqLylbMF0ubGVuZ3RoO1xuICAgICAgICBpZiAoIWNvbHVtbiB8fCAhcm93KSByZXR1cm47XG5cbiAgICAgICAgdmFyIHN0YXJ0UmFuZ2UgPSB0aGlzLmdldE1hdGNoaW5nKHNlc3Npb24sIHJvdywgY29sdW1uICsgMSk7XG4gICAgICAgIGlmICghc3RhcnRSYW5nZSB8fCBzdGFydFJhbmdlLnN0YXJ0LnJvdyA9PSByb3cpXG4gICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB2YXIgaW5kZW50ID0gdGhpcy4kZ2V0SW5kZW50KHNlc3Npb24uZ2V0TGluZShzdGFydFJhbmdlLnN0YXJ0LnJvdykpO1xuICAgICAgICBpZiAoaW5kZW50Lmxlbmd0aCAhPSBjb2x1bW4pIHtcbiAgICAgICAgICAgIHNlc3Npb24ucmVwbGFjZShuZXcgUmFuZ2Uocm93LCAwLCByb3csIGNvbHVtbiksIGluZGVudCk7XG4gICAgICAgICAgICBzZXNzaW9uLm91dGRlbnRSb3dzKG5ldyBSYW5nZShyb3cgKyAxLCAwLCByb3cgKyAxLCAwKSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5jcmVhdGVXb3JrZXIgPSBmdW5jdGlvbihzZXNzaW9uKSB7XG4gICAgICAgIHZhciB3b3JrZXIgPSBuZXcgV29ya2VyQ2xpZW50KFtcImFjZVwiXSwgXCJhY2UvbW9kZS9sdWFfd29ya2VyXCIsIFwiV29ya2VyXCIpO1xuICAgICAgICB3b3JrZXIuYXR0YWNoVG9Eb2N1bWVudChzZXNzaW9uLmdldERvY3VtZW50KCkpO1xuICAgICAgICBcbiAgICAgICAgd29ya2VyLm9uKFwiYW5ub3RhdGVcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgc2Vzc2lvbi5zZXRBbm5vdGF0aW9ucyhlLmRhdGEpO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIHdvcmtlci5vbihcInRlcm1pbmF0ZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNlc3Npb24uY2xlYXJBbm5vdGF0aW9ucygpO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB3b3JrZXI7XG4gICAgfTtcblxuICAgIHRoaXMuJGlkID0gXCJhY2UvbW9kZS9sdWFcIjtcbiAgICB0aGlzLnNuaXBwZXRGaWxlSWQgPSBcImFjZS9zbmlwcGV0cy9sdWFcIjtcbn0pLmNhbGwoTW9kZS5wcm90b3R5cGUpO1xuXG5leHBvcnRzLk1vZGUgPSBNb2RlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90ZXh0X2hpZ2hsaWdodF9ydWxlc1wiKS5UZXh0SGlnaGxpZ2h0UnVsZXM7XG5cbnZhciBMdWFIaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIGtleXdvcmRzID0gKFxuICAgICAgICBcImJyZWFrfGRvfGVsc2V8ZWxzZWlmfGVuZHxmb3J8ZnVuY3Rpb258aWZ8aW58bG9jYWx8cmVwZWF0fFwiK1xuICAgICAgICAgXCJyZXR1cm58dGhlbnx1bnRpbHx3aGlsZXxvcnxhbmR8bm90XCJcbiAgICApO1xuXG4gICAgdmFyIGJ1aWx0aW5Db25zdGFudHMgPSAoXCJ0cnVlfGZhbHNlfG5pbHxfR3xfVkVSU0lPTlwiKTtcblxuICAgIHZhciBmdW5jdGlvbnMgPSAoXG4gICAgICAvLyBidWlsdGluRnVuY3Rpb25zXG4gICAgICAgIFwic3RyaW5nfHhwY2FsbHxwYWNrYWdlfHRvc3RyaW5nfHByaW50fG9zfHVucGFja3xyZXF1aXJlfFwiK1xuICAgICAgICBcImdldGZlbnZ8c2V0bWV0YXRhYmxlfG5leHR8YXNzZXJ0fHRvbnVtYmVyfGlvfHJhd2VxdWFsfFwiK1xuICAgICAgICBcImNvbGxlY3RnYXJiYWdlfGdldG1ldGF0YWJsZXxtb2R1bGV8cmF3c2V0fG1hdGh8ZGVidWd8XCIrXG4gICAgICAgIFwicGNhbGx8dGFibGV8bmV3cHJveHl8dHlwZXxjb3JvdXRpbmV8X0d8c2VsZWN0fGdjaW5mb3xcIitcbiAgICAgICAgXCJwYWlyc3xyYXdnZXR8bG9hZHN0cmluZ3xpcGFpcnN8X1ZFUlNJT058ZG9maWxlfHNldGZlbnZ8XCIrXG4gICAgICAgIFwibG9hZHxlcnJvcnxsb2FkZmlsZXxcIitcblxuICAgICAgICBcInN1Ynx1cHBlcnxsZW58Z2ZpbmR8cmVwfGZpbmR8bWF0Y2h8Y2hhcnxkdW1wfGdtYXRjaHxcIitcbiAgICAgICAgXCJyZXZlcnNlfGJ5dGV8Zm9ybWF0fGdzdWJ8bG93ZXJ8cHJlbG9hZHxsb2FkbGlifGxvYWRlZHxcIitcbiAgICAgICAgXCJsb2FkZXJzfGNwYXRofGNvbmZpZ3xwYXRofHNlZWFsbHxleGl0fHNldGxvY2FsZXxkYXRlfFwiK1xuICAgICAgICBcImdldGVudnxkaWZmdGltZXxyZW1vdmV8dGltZXxjbG9ja3x0bXBuYW1lfHJlbmFtZXxleGVjdXRlfFwiK1xuICAgICAgICBcImxpbmVzfHdyaXRlfGNsb3NlfGZsdXNofG9wZW58b3V0cHV0fHR5cGV8cmVhZHxzdGRlcnJ8XCIrXG4gICAgICAgIFwic3RkaW58aW5wdXR8c3Rkb3V0fHBvcGVufHRtcGZpbGV8bG9nfG1heHxhY29zfGh1Z2V8XCIrXG4gICAgICAgIFwibGRleHB8cGl8Y29zfHRhbmh8cG93fGRlZ3x0YW58Y29zaHxzaW5ofHJhbmRvbXxyYW5kb21zZWVkfFwiK1xuICAgICAgICBcImZyZXhwfGNlaWx8Zmxvb3J8cmFkfGFic3xzcXJ0fG1vZGZ8YXNpbnxtaW58bW9kfGZtb2R8bG9nMTB8XCIrXG4gICAgICAgIFwiYXRhbjJ8ZXhwfHNpbnxhdGFufGdldHVwdmFsdWV8ZGVidWd8c2V0aG9va3xnZXRtZXRhdGFibGV8XCIrXG4gICAgICAgIFwiZ2V0aG9va3xzZXRtZXRhdGFibGV8c2V0bG9jYWx8dHJhY2ViYWNrfHNldGZlbnZ8Z2V0aW5mb3xcIitcbiAgICAgICAgXCJzZXR1cHZhbHVlfGdldGxvY2FsfGdldHJlZ2lzdHJ5fGdldGZlbnZ8c2V0bnxpbnNlcnR8Z2V0bnxcIitcbiAgICAgICAgXCJmb3JlYWNoaXxtYXhufGZvcmVhY2h8Y29uY2F0fHNvcnR8cmVtb3ZlfHJlc3VtZXx5aWVsZHxcIitcbiAgICAgICAgXCJzdGF0dXN8d3JhcHxjcmVhdGV8cnVubmluZ3xcIitcbiAgICAgIC8vIG1ldGF0YWJsZU1ldGhvZHNcbiAgICAgICAgXCJfX2FkZHxfX3N1YnxfX21vZHxfX3VubXxfX2NvbmNhdHxfX2x0fF9faW5kZXh8X19jYWxsfF9fZ2N8X19tZXRhdGFibGV8XCIrXG4gICAgICAgICBcIl9fbXVsfF9fZGl2fF9fcG93fF9fbGVufF9fZXF8X19sZXxfX25ld2luZGV4fF9fdG9zdHJpbmd8X19tb2RlfF9fdG9udW1iZXJcIlxuICAgICk7XG5cbiAgICB2YXIgc3RkTGliYXJpZXMgPSAoXCJzdHJpbmd8cGFja2FnZXxvc3xpb3xtYXRofGRlYnVnfHRhYmxlfGNvcm91dGluZVwiKTtcblxuICAgIHZhciBkZXByZWNhdGVkSW41MTUyID0gKFwic2V0bnxmb3JlYWNofGZvcmVhY2hpfGdjaW5mb3xsb2cxMHxtYXhuXCIpO1xuXG4gICAgdmFyIGtleXdvcmRNYXBwZXIgPSB0aGlzLmNyZWF0ZUtleXdvcmRNYXBwZXIoe1xuICAgICAgICBcImtleXdvcmRcIjoga2V5d29yZHMsXG4gICAgICAgIFwic3VwcG9ydC5mdW5jdGlvblwiOiBmdW5jdGlvbnMsXG4gICAgICAgIFwia2V5d29yZC5kZXByZWNhdGVkXCI6IGRlcHJlY2F0ZWRJbjUxNTIsXG4gICAgICAgIFwiY29uc3RhbnQubGlicmFyeVwiOiBzdGRMaWJhcmllcyxcbiAgICAgICAgXCJjb25zdGFudC5sYW5ndWFnZVwiOiBidWlsdGluQ29uc3RhbnRzLFxuICAgICAgICBcInZhcmlhYmxlLmxhbmd1YWdlXCI6IFwic2VsZlwiXG4gICAgfSwgXCJpZGVudGlmaWVyXCIpO1xuXG4gICAgdmFyIGRlY2ltYWxJbnRlZ2VyID0gXCIoPzooPzpbMS05XVxcXFxkKil8KD86MCkpXCI7XG4gICAgdmFyIGhleEludGVnZXIgPSBcIig/OjBbeFhdW1xcXFxkQS1GYS1mXSspXCI7XG4gICAgdmFyIGludGVnZXIgPSBcIig/OlwiICsgZGVjaW1hbEludGVnZXIgKyBcInxcIiArIGhleEludGVnZXIgKyBcIilcIjtcblxuICAgIHZhciBmcmFjdGlvbiA9IFwiKD86XFxcXC5cXFxcZCspXCI7XG4gICAgdmFyIGludFBhcnQgPSBcIig/OlxcXFxkKylcIjtcbiAgICB2YXIgcG9pbnRGbG9hdCA9IFwiKD86KD86XCIgKyBpbnRQYXJ0ICsgXCI/XCIgKyBmcmFjdGlvbiArIFwiKXwoPzpcIiArIGludFBhcnQgKyBcIlxcXFwuKSlcIjtcbiAgICB2YXIgZmxvYXROdW1iZXIgPSBcIig/OlwiICsgcG9pbnRGbG9hdCArIFwiKVwiO1xuXG4gICAgdGhpcy4kcnVsZXMgPSB7XG4gICAgICAgIFwic3RhcnRcIiA6IFt7XG4gICAgICAgICAgICBzdGF0ZU5hbWU6IFwiYnJhY2tldGVkQ29tbWVudFwiLFxuICAgICAgICAgICAgb25NYXRjaCA6IGZ1bmN0aW9uKHZhbHVlLCBjdXJyZW50U3RhdGUsIHN0YWNrKXtcbiAgICAgICAgICAgICAgICBzdGFjay51bnNoaWZ0KHRoaXMubmV4dCwgdmFsdWUubGVuZ3RoIC0gMiwgY3VycmVudFN0YXRlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJjb21tZW50XCI7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVnZXggOiAvXFwtXFwtXFxbPSpcXFsvLFxuICAgICAgICAgICAgbmV4dCAgOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBvbk1hdGNoIDogZnVuY3Rpb24odmFsdWUsIGN1cnJlbnRTdGF0ZSwgc3RhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5sZW5ndGggPT0gc3RhY2tbMV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFjay5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWNrLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0ID0gc3RhY2suc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0ID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcImNvbW1lbnRcIjtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggOiAvXFxdPSpcXF0vLFxuICAgICAgICAgICAgICAgICAgICBuZXh0ICA6IFwic3RhcnRcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcImNvbW1lbnQuYm9keVwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsXG4gICAgICAgICAgICByZWdleCA6IFwiXFxcXC1cXFxcLS4qJFwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHN0YXRlTmFtZTogXCJicmFja2V0ZWRTdHJpbmdcIixcbiAgICAgICAgICAgIG9uTWF0Y2ggOiBmdW5jdGlvbih2YWx1ZSwgY3VycmVudFN0YXRlLCBzdGFjayl7XG4gICAgICAgICAgICAgICAgc3RhY2sudW5zaGlmdCh0aGlzLm5leHQsIHZhbHVlLmxlbmd0aCwgY3VycmVudFN0YXRlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJzdHJpbmcuc3RhcnRcIjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZWdleCA6IC9cXFs9KlxcWy8sXG4gICAgICAgICAgICBuZXh0ICA6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG9uTWF0Y2ggOiBmdW5jdGlvbih2YWx1ZSwgY3VycmVudFN0YXRlLCBzdGFjaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCA9PSBzdGFja1sxXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWNrLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhY2suc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHQgPSBzdGFjay5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHQgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwic3RyaW5nLmVuZFwiO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggOiAvXFxdPSpcXF0vLFxuICAgICAgICAgICAgICAgICAgICBuZXh0ICA6IFwic3RhcnRcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuIDogXCJzdHJpbmdcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLCAgICAgICAgICAgLy8gXCIgc3RyaW5nXG4gICAgICAgICAgICByZWdleCA6ICdcIig/OlteXFxcXFxcXFxdfFxcXFxcXFxcLikqP1wiJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsICAgICAgICAgICAvLyAnIHN0cmluZ1xuICAgICAgICAgICAgcmVnZXggOiBcIicoPzpbXlxcXFxcXFxcXXxcXFxcXFxcXC4pKj8nXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIiwgLy8gZmxvYXRcbiAgICAgICAgICAgIHJlZ2V4IDogZmxvYXROdW1iZXJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIiwgLy8gaW50ZWdlclxuICAgICAgICAgICAgcmVnZXggOiBpbnRlZ2VyICsgXCJcXFxcYlwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDoga2V5d29yZE1hcHBlcixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJbYS16QS1aXyRdW2EtekEtWjAtOV8kXSpcXFxcYlwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiXFxcXCt8XFxcXC18XFxcXCp8XFxcXC98JXxcXFxcI3xcXFxcXnx+fDx8Pnw8PXw9Pnw9PXx+PXw9fFxcXFw6fFxcXFwuXFxcXC5cXFxcLnxcXFxcLlxcXFwuXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInBhcmVuLmxwYXJlblwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIltcXFxcW1xcXFwoXFxcXHtdXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInBhcmVuLnJwYXJlblwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIltcXFxcXVxcXFwpXFxcXH1dXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInRleHRcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxccyt8XFxcXHcrXCJcbiAgICAgICAgfSBdXG4gICAgfTtcbiAgICBcbiAgICB0aGlzLm5vcm1hbGl6ZVJ1bGVzKCk7XG59O1xuXG5vb3AuaW5oZXJpdHMoTHVhSGlnaGxpZ2h0UnVsZXMsIFRleHRIaWdobGlnaHRSdWxlcyk7XG5cbmV4cG9ydHMuTHVhSGlnaGxpZ2h0UnVsZXMgPSBMdWFIaWdobGlnaHRSdWxlcztcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==