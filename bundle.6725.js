"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[6725],{

/***/ 46725:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var Rules = (__webpack_require__(7678)/* .CoffeeHighlightRules */ .s);
var Outdent = (__webpack_require__(1164).MatchingBraceOutdent);
var FoldMode = (__webpack_require__(35090)/* .FoldMode */ .Z);
var Range = (__webpack_require__(59082)/* .Range */ .e);
var TextMode = (__webpack_require__(98030).Mode);
var WorkerClient = (__webpack_require__(91451).WorkerClient);
var oop = __webpack_require__(89359);

function Mode() {
    this.HighlightRules = Rules;
    this.$outdent = new Outdent();
    this.foldingRules = new FoldMode();
}

oop.inherits(Mode, TextMode);

(function() {
    
    /*:
      [({[=:]        # Opening parentheses or brackets
     |[-=]>          # OR single or double arrow
     |\b(?:          # OR one of these words:
       else          #    else
      |try           # OR try
      |(?:swi|ca)tch # OR catch, optionally followed by:
        (?:\s*[$A-Za-z_\x7f-\uffff][$\w\x7f-\uffff]*)?  # a variable
      |finally       # OR finally
     ))\s*$          # all as the last thing on a line (allowing trailing space)
    |                # ---- OR ---- :
    ^\s*             # a line starting with optional space
    (else\b\s*)?     # followed by an optional "else"
    (?:              # followed by one of the following:
       if            #    if
      |for           # OR for
      |while         # OR while
      |loop          # OR loop
    )\b              #    (as a word)
    (?!.*\bthen\b)   # ... but NOT followed by "then" on the line
    */
    var indenter = /(?:[({[=:]|[-=]>|\b(?:else|try|(?:swi|ca)tch(?:\s+[$A-Za-z_\x7f-\uffff][$\w\x7f-\uffff]*)?|finally))\s*$|^\s*(else\b\s*)?(?:if|for|while|loop)\b(?!.*\bthen\b)/;
    
    this.lineCommentStart = "#";
    this.blockComment = {start: "###", end: "###"};
    
    this.getNextLineIndent = function(state, line, tab) {
        var indent = this.$getIndent(line);
        var tokens = this.getTokenizer().getLineTokens(line, state).tokens;
    
        if (!(tokens.length && tokens[tokens.length - 1].type === 'comment') &&
            state === 'start' && indenter.test(line))
            indent += tab;
        return indent;
    };
    
    this.checkOutdent = function(state, line, input) {
        return this.$outdent.checkOutdent(line, input);
    };
    
    this.autoOutdent = function(state, doc, row) {
        this.$outdent.autoOutdent(doc, row);
    };
    
    this.createWorker = function(session) {
        var worker = new WorkerClient(["ace"], "ace/mode/coffee_worker", "Worker");
        worker.attachToDocument(session.getDocument());
        
        worker.on("annotate", function(e) {
            session.setAnnotations(e.data);
        });
        
        worker.on("terminate", function() {
            session.clearAnnotations();
        });
        
        return worker;
    };

    this.$id = "ace/mode/coffee";
    this.snippetFileId = "ace/snippets/coffee";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 7678:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



    var oop = __webpack_require__(89359);
    var TextHighlightRules = (__webpack_require__(28053)/* .TextHighlightRules */ .K);

    oop.inherits(CoffeeHighlightRules, TextHighlightRules);

    function CoffeeHighlightRules() {
        var identifier = "[$A-Za-z_\\x7f-\\uffff][$\\w\\x7f-\\uffff]*";

        var keywords = (
            "this|throw|then|try|typeof|super|switch|return|break|by|continue|" +
            "catch|class|in|instanceof|is|isnt|if|else|extends|for|own|" +
            "finally|function|while|when|new|no|not|delete|debugger|do|loop|of|off|" +
            "or|on|unless|until|and|yes|yield|export|import|default"
        );

        var langConstant = (
            "true|false|null|undefined|NaN|Infinity"
        );

        var illegal = (
            "case|const|function|var|void|with|enum|implements|" +
            "interface|let|package|private|protected|public|static"
        );

        var supportClass = (
            "Array|Boolean|Date|Function|Number|Object|RegExp|ReferenceError|String|" +
            "Error|EvalError|InternalError|RangeError|ReferenceError|StopIteration|" +
            "SyntaxError|TypeError|URIError|"  +
            "ArrayBuffer|Float32Array|Float64Array|Int16Array|Int32Array|Int8Array|" +
            "Uint16Array|Uint32Array|Uint8Array|Uint8ClampedArray"
        );

        var supportFunction = (
            "Math|JSON|isNaN|isFinite|parseInt|parseFloat|encodeURI|" +
            "encodeURIComponent|decodeURI|decodeURIComponent|String|"
        );

        var variableLanguage = (
            "window|arguments|prototype|document"
        );

        var keywordMapper = this.createKeywordMapper({
            "keyword": keywords,
            "constant.language": langConstant,
            "invalid.illegal": illegal,
            "language.support.class": supportClass,
            "language.support.function": supportFunction,
            "variable.language": variableLanguage
        }, "identifier");

        var functionRule = {
            token: ["paren.lparen", "variable.parameter", "paren.rparen", "text", "storage.type"],
            regex: /(?:(\()((?:"[^")]*?"|'[^')]*?'|\/[^\/)]*?\/|[^()"'\/])*?)(\))(\s*))?([\-=]>)/.source
        };

        var stringEscape = /\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|[0-2][0-7]{0,2}|3[0-6][0-7]?|37[0-7]?|[4-7][0-7]?|.)/;

        this.$rules = {
            start : [
                {
                    token : "constant.numeric",
                    regex : "(?:0x[\\da-fA-F]+|(?:\\d+(?:\\.\\d+)?|\\.\\d+)(?:[eE][+-]?\\d+)?)"
                }, {
                    stateName: "qdoc",
                    token : "string", regex : "'''", next : [
                        {token : "string", regex : "'''", next : "start"},
                        {token : "constant.language.escape", regex : stringEscape},
                        {defaultToken: "string"}
                    ]
                }, {
                    stateName: "qqdoc",
                    token : "string",
                    regex : '"""',
                    next : [
                        {token : "string", regex : '"""', next : "start"},
                        {token : "paren.string", regex : '#{', push : "start"},
                        {token : "constant.language.escape", regex : stringEscape},
                        {defaultToken: "string"}
                    ]
                }, {
                    stateName: "qstring",
                    token : "string", regex : "'", next : [
                        {token : "string", regex : "'", next : "start"},
                        {token : "constant.language.escape", regex : stringEscape},
                        {defaultToken: "string"}
                    ]
                }, {
                    stateName: "qqstring",
                    token : "string.start", regex : '"', next : [
                        {token : "string.end", regex : '"', next : "start"},
                        {token : "paren.string", regex : '#{', push : "start"},
                        {token : "constant.language.escape", regex : stringEscape},
                        {defaultToken: "string"}
                    ]
                }, {
                    stateName: "js",
                    token : "string", regex : "`", next : [
                        {token : "string", regex : "`", next : "start"},
                        {token : "constant.language.escape", regex : stringEscape},
                        {defaultToken: "string"}
                    ]
                }, {
                    regex: "[{}]", onMatch: function(val, state, stack) {
                        this.next = "";
                        if (val == "{" && stack.length) {
                            stack.unshift("start", state);
                            return "paren";
                        }
                        if (val == "}" && stack.length) {
                            stack.shift();
                            this.next = stack.shift() || "";
                            if (this.next.indexOf("string") != -1)
                                return "paren.string";
                        }
                        return "paren";
                    }
                }, {
                    token : "string.regex",
                    regex : "///",
                    next : "heregex"
                }, {
                    token : "string.regex",
                    regex : /(?:\/(?![\s=])[^[\/\n\\]*(?:(?:\\[\s\S]|\[[^\]\n\\]*(?:\\[\s\S][^\]\n\\]*)*])[^[\/\n\\]*)*\/)(?:[imgy]{0,4})(?!\w)/
                }, {
                    token : "comment",
                    regex : "###(?!#)",
                    next : "comment"
                }, {
                    token : "comment",
                    regex : "#.*"
                }, {
                    token : ["punctuation.operator", "text", "identifier"],
                    regex : "(\\.)(\\s*)(" + illegal + ")"
                }, {
                    token : "punctuation.operator",
                    regex : "\\.{1,3}"
                }, {
                    //class A extends B
                    token : ["keyword", "text", "language.support.class",
                     "text", "keyword", "text", "language.support.class"],
                    regex : "(class)(\\s+)(" + identifier + ")(?:(\\s+)(extends)(\\s+)(" + identifier + "))?"
                }, {
                    //play = (...) ->
                    token : ["entity.name.function", "text", "keyword.operator", "text"].concat(functionRule.token),
                    regex : "(" + identifier + ")(\\s*)([=:])(\\s*)" + functionRule.regex
                }, 
                functionRule, 
                {
                    token : "variable",
                    regex : "@(?:" + identifier + ")?"
                }, {
                    token: keywordMapper,
                    regex : identifier
                }, {
                    token : "punctuation.operator",
                    regex : "\\,|\\."
                }, {
                    token : "storage.type",
                    regex : "[\\-=]>"
                }, {
                    token : "keyword.operator",
                    regex : "(?:[-+*/%<>&|^!?=]=|>>>=?|\\-\\-|\\+\\+|::|&&=|\\|\\|=|<<=|>>=|\\?\\.|\\.{2,3}|[!*+-=><])"
                }, {
                    token : "paren.lparen",
                    regex : "[({[]"
                }, {
                    token : "paren.rparen",
                    regex : "[\\]})]"
                }, {
                    token : "text",
                    regex : "\\s+"
                }],


            heregex : [{
                token : "string.regex",
                regex : '.*?///[imgy]{0,4}',
                next : "start"
            }, {
                token : "comment.regex",
                regex : "\\s+(?:#.*)?"
            }, {
                token : "string.regex",
                regex : "\\S+"
            }],

            comment : [{
                token : "comment",
                regex : '###',
                next : "start"
            }, {
                defaultToken : "comment"
            }]
        };
        this.normalizeRules();
    }

    exports.s = CoffeeHighlightRules;


/***/ }),

/***/ 35090:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var BaseFoldMode = (__webpack_require__(15369).FoldMode);
var Range = (__webpack_require__(59082)/* .Range */ .e);

var FoldMode = exports.Z = function() {};
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


/***/ }),

/***/ 1164:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var Range = (__webpack_require__(59082)/* .Range */ .e);

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


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ3RCOztBQUVBO0FBQ0E7QUFDQSx1Q0FBdUM7O0FBRXZDOztBQUVBO0FBQ0Esb0RBQW9ELHlCQUF5Qjs7QUFFN0U7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDOztBQUVELDRCQUE0QiIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvY29mZmVlLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvY29mZmVlX2hpZ2hsaWdodF9ydWxlcy5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2ZvbGRpbmcvY29mZmVlLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvbWF0Y2hpbmdfYnJhY2Vfb3V0ZGVudC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIFJ1bGVzID0gcmVxdWlyZShcIi4vY29mZmVlX2hpZ2hsaWdodF9ydWxlc1wiKS5Db2ZmZWVIaWdobGlnaHRSdWxlcztcbnZhciBPdXRkZW50ID0gcmVxdWlyZShcIi4vbWF0Y2hpbmdfYnJhY2Vfb3V0ZGVudFwiKS5NYXRjaGluZ0JyYWNlT3V0ZGVudDtcbnZhciBGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRpbmcvY29mZmVlXCIpLkZvbGRNb2RlO1xudmFyIFJhbmdlID0gcmVxdWlyZShcIi4uL3JhbmdlXCIpLlJhbmdlO1xudmFyIFRleHRNb2RlID0gcmVxdWlyZShcIi4vdGV4dFwiKS5Nb2RlO1xudmFyIFdvcmtlckNsaWVudCA9IHJlcXVpcmUoXCIuLi93b3JrZXIvd29ya2VyX2NsaWVudFwiKS5Xb3JrZXJDbGllbnQ7XG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG5cbmZ1bmN0aW9uIE1vZGUoKSB7XG4gICAgdGhpcy5IaWdobGlnaHRSdWxlcyA9IFJ1bGVzO1xuICAgIHRoaXMuJG91dGRlbnQgPSBuZXcgT3V0ZGVudCgpO1xuICAgIHRoaXMuZm9sZGluZ1J1bGVzID0gbmV3IEZvbGRNb2RlKCk7XG59XG5cbm9vcC5pbmhlcml0cyhNb2RlLCBUZXh0TW9kZSk7XG5cbihmdW5jdGlvbigpIHtcbiAgICBcbiAgICAvKjpcbiAgICAgIFsoe1s9Ol0gICAgICAgICMgT3BlbmluZyBwYXJlbnRoZXNlcyBvciBicmFja2V0c1xuICAgICB8Wy09XT4gICAgICAgICAgIyBPUiBzaW5nbGUgb3IgZG91YmxlIGFycm93XG4gICAgIHxcXGIoPzogICAgICAgICAgIyBPUiBvbmUgb2YgdGhlc2Ugd29yZHM6XG4gICAgICAgZWxzZSAgICAgICAgICAjICAgIGVsc2VcbiAgICAgIHx0cnkgICAgICAgICAgICMgT1IgdHJ5XG4gICAgICB8KD86c3dpfGNhKXRjaCAjIE9SIGNhdGNoLCBvcHRpb25hbGx5IGZvbGxvd2VkIGJ5OlxuICAgICAgICAoPzpcXHMqWyRBLVphLXpfXFx4N2YtXFx1ZmZmZl1bJFxcd1xceDdmLVxcdWZmZmZdKik/ICAjIGEgdmFyaWFibGVcbiAgICAgIHxmaW5hbGx5ICAgICAgICMgT1IgZmluYWxseVxuICAgICApKVxccyokICAgICAgICAgICMgYWxsIGFzIHRoZSBsYXN0IHRoaW5nIG9uIGEgbGluZSAoYWxsb3dpbmcgdHJhaWxpbmcgc3BhY2UpXG4gICAgfCAgICAgICAgICAgICAgICAjIC0tLS0gT1IgLS0tLSA6XG4gICAgXlxccyogICAgICAgICAgICAgIyBhIGxpbmUgc3RhcnRpbmcgd2l0aCBvcHRpb25hbCBzcGFjZVxuICAgIChlbHNlXFxiXFxzKik/ICAgICAjIGZvbGxvd2VkIGJ5IGFuIG9wdGlvbmFsIFwiZWxzZVwiXG4gICAgKD86ICAgICAgICAgICAgICAjIGZvbGxvd2VkIGJ5IG9uZSBvZiB0aGUgZm9sbG93aW5nOlxuICAgICAgIGlmICAgICAgICAgICAgIyAgICBpZlxuICAgICAgfGZvciAgICAgICAgICAgIyBPUiBmb3JcbiAgICAgIHx3aGlsZSAgICAgICAgICMgT1Igd2hpbGVcbiAgICAgIHxsb29wICAgICAgICAgICMgT1IgbG9vcFxuICAgIClcXGIgICAgICAgICAgICAgICMgICAgKGFzIGEgd29yZClcbiAgICAoPyEuKlxcYnRoZW5cXGIpICAgIyAuLi4gYnV0IE5PVCBmb2xsb3dlZCBieSBcInRoZW5cIiBvbiB0aGUgbGluZVxuICAgICovXG4gICAgdmFyIGluZGVudGVyID0gLyg/Olsoe1s9Ol18Wy09XT58XFxiKD86ZWxzZXx0cnl8KD86c3dpfGNhKXRjaCg/OlxccytbJEEtWmEtel9cXHg3Zi1cXHVmZmZmXVskXFx3XFx4N2YtXFx1ZmZmZl0qKT98ZmluYWxseSkpXFxzKiR8XlxccyooZWxzZVxcYlxccyopPyg/OmlmfGZvcnx3aGlsZXxsb29wKVxcYig/IS4qXFxidGhlblxcYikvO1xuICAgIFxuICAgIHRoaXMubGluZUNvbW1lbnRTdGFydCA9IFwiI1wiO1xuICAgIHRoaXMuYmxvY2tDb21tZW50ID0ge3N0YXJ0OiBcIiMjI1wiLCBlbmQ6IFwiIyMjXCJ9O1xuICAgIFxuICAgIHRoaXMuZ2V0TmV4dExpbmVJbmRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgbGluZSwgdGFiKSB7XG4gICAgICAgIHZhciBpbmRlbnQgPSB0aGlzLiRnZXRJbmRlbnQobGluZSk7XG4gICAgICAgIHZhciB0b2tlbnMgPSB0aGlzLmdldFRva2VuaXplcigpLmdldExpbmVUb2tlbnMobGluZSwgc3RhdGUpLnRva2VucztcbiAgICBcbiAgICAgICAgaWYgKCEodG9rZW5zLmxlbmd0aCAmJiB0b2tlbnNbdG9rZW5zLmxlbmd0aCAtIDFdLnR5cGUgPT09ICdjb21tZW50JykgJiZcbiAgICAgICAgICAgIHN0YXRlID09PSAnc3RhcnQnICYmIGluZGVudGVyLnRlc3QobGluZSkpXG4gICAgICAgICAgICBpbmRlbnQgKz0gdGFiO1xuICAgICAgICByZXR1cm4gaW5kZW50O1xuICAgIH07XG4gICAgXG4gICAgdGhpcy5jaGVja091dGRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgbGluZSwgaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJG91dGRlbnQuY2hlY2tPdXRkZW50KGxpbmUsIGlucHV0KTtcbiAgICB9O1xuICAgIFxuICAgIHRoaXMuYXV0b091dGRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgZG9jLCByb3cpIHtcbiAgICAgICAgdGhpcy4kb3V0ZGVudC5hdXRvT3V0ZGVudChkb2MsIHJvdyk7XG4gICAgfTtcbiAgICBcbiAgICB0aGlzLmNyZWF0ZVdvcmtlciA9IGZ1bmN0aW9uKHNlc3Npb24pIHtcbiAgICAgICAgdmFyIHdvcmtlciA9IG5ldyBXb3JrZXJDbGllbnQoW1wiYWNlXCJdLCBcImFjZS9tb2RlL2NvZmZlZV93b3JrZXJcIiwgXCJXb3JrZXJcIik7XG4gICAgICAgIHdvcmtlci5hdHRhY2hUb0RvY3VtZW50KHNlc3Npb24uZ2V0RG9jdW1lbnQoKSk7XG4gICAgICAgIFxuICAgICAgICB3b3JrZXIub24oXCJhbm5vdGF0ZVwiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBzZXNzaW9uLnNldEFubm90YXRpb25zKGUuZGF0YSk7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgd29ya2VyLm9uKFwidGVybWluYXRlXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2Vzc2lvbi5jbGVhckFubm90YXRpb25zKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHdvcmtlcjtcbiAgICB9O1xuXG4gICAgdGhpcy4kaWQgPSBcImFjZS9tb2RlL2NvZmZlZVwiO1xuICAgIHRoaXMuc25pcHBldEZpbGVJZCA9IFwiYWNlL3NuaXBwZXRzL2NvZmZlZVwiO1xufSkuY2FsbChNb2RlLnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTW9kZSA9IE1vZGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuICAgIHZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbiAgICB2YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xuXG4gICAgb29wLmluaGVyaXRzKENvZmZlZUhpZ2hsaWdodFJ1bGVzLCBUZXh0SGlnaGxpZ2h0UnVsZXMpO1xuXG4gICAgZnVuY3Rpb24gQ29mZmVlSGlnaGxpZ2h0UnVsZXMoKSB7XG4gICAgICAgIHZhciBpZGVudGlmaWVyID0gXCJbJEEtWmEtel9cXFxceDdmLVxcXFx1ZmZmZl1bJFxcXFx3XFxcXHg3Zi1cXFxcdWZmZmZdKlwiO1xuXG4gICAgICAgIHZhciBrZXl3b3JkcyA9IChcbiAgICAgICAgICAgIFwidGhpc3x0aHJvd3x0aGVufHRyeXx0eXBlb2Z8c3VwZXJ8c3dpdGNofHJldHVybnxicmVha3xieXxjb250aW51ZXxcIiArXG4gICAgICAgICAgICBcImNhdGNofGNsYXNzfGlufGluc3RhbmNlb2Z8aXN8aXNudHxpZnxlbHNlfGV4dGVuZHN8Zm9yfG93bnxcIiArXG4gICAgICAgICAgICBcImZpbmFsbHl8ZnVuY3Rpb258d2hpbGV8d2hlbnxuZXd8bm98bm90fGRlbGV0ZXxkZWJ1Z2dlcnxkb3xsb29wfG9mfG9mZnxcIiArXG4gICAgICAgICAgICBcIm9yfG9ufHVubGVzc3x1bnRpbHxhbmR8eWVzfHlpZWxkfGV4cG9ydHxpbXBvcnR8ZGVmYXVsdFwiXG4gICAgICAgICk7XG5cbiAgICAgICAgdmFyIGxhbmdDb25zdGFudCA9IChcbiAgICAgICAgICAgIFwidHJ1ZXxmYWxzZXxudWxsfHVuZGVmaW5lZHxOYU58SW5maW5pdHlcIlxuICAgICAgICApO1xuXG4gICAgICAgIHZhciBpbGxlZ2FsID0gKFxuICAgICAgICAgICAgXCJjYXNlfGNvbnN0fGZ1bmN0aW9ufHZhcnx2b2lkfHdpdGh8ZW51bXxpbXBsZW1lbnRzfFwiICtcbiAgICAgICAgICAgIFwiaW50ZXJmYWNlfGxldHxwYWNrYWdlfHByaXZhdGV8cHJvdGVjdGVkfHB1YmxpY3xzdGF0aWNcIlxuICAgICAgICApO1xuXG4gICAgICAgIHZhciBzdXBwb3J0Q2xhc3MgPSAoXG4gICAgICAgICAgICBcIkFycmF5fEJvb2xlYW58RGF0ZXxGdW5jdGlvbnxOdW1iZXJ8T2JqZWN0fFJlZ0V4cHxSZWZlcmVuY2VFcnJvcnxTdHJpbmd8XCIgK1xuICAgICAgICAgICAgXCJFcnJvcnxFdmFsRXJyb3J8SW50ZXJuYWxFcnJvcnxSYW5nZUVycm9yfFJlZmVyZW5jZUVycm9yfFN0b3BJdGVyYXRpb258XCIgK1xuICAgICAgICAgICAgXCJTeW50YXhFcnJvcnxUeXBlRXJyb3J8VVJJRXJyb3J8XCIgICtcbiAgICAgICAgICAgIFwiQXJyYXlCdWZmZXJ8RmxvYXQzMkFycmF5fEZsb2F0NjRBcnJheXxJbnQxNkFycmF5fEludDMyQXJyYXl8SW50OEFycmF5fFwiICtcbiAgICAgICAgICAgIFwiVWludDE2QXJyYXl8VWludDMyQXJyYXl8VWludDhBcnJheXxVaW50OENsYW1wZWRBcnJheVwiXG4gICAgICAgICk7XG5cbiAgICAgICAgdmFyIHN1cHBvcnRGdW5jdGlvbiA9IChcbiAgICAgICAgICAgIFwiTWF0aHxKU09OfGlzTmFOfGlzRmluaXRlfHBhcnNlSW50fHBhcnNlRmxvYXR8ZW5jb2RlVVJJfFwiICtcbiAgICAgICAgICAgIFwiZW5jb2RlVVJJQ29tcG9uZW50fGRlY29kZVVSSXxkZWNvZGVVUklDb21wb25lbnR8U3RyaW5nfFwiXG4gICAgICAgICk7XG5cbiAgICAgICAgdmFyIHZhcmlhYmxlTGFuZ3VhZ2UgPSAoXG4gICAgICAgICAgICBcIndpbmRvd3xhcmd1bWVudHN8cHJvdG90eXBlfGRvY3VtZW50XCJcbiAgICAgICAgKTtcblxuICAgICAgICB2YXIga2V5d29yZE1hcHBlciA9IHRoaXMuY3JlYXRlS2V5d29yZE1hcHBlcih7XG4gICAgICAgICAgICBcImtleXdvcmRcIjoga2V5d29yZHMsXG4gICAgICAgICAgICBcImNvbnN0YW50Lmxhbmd1YWdlXCI6IGxhbmdDb25zdGFudCxcbiAgICAgICAgICAgIFwiaW52YWxpZC5pbGxlZ2FsXCI6IGlsbGVnYWwsXG4gICAgICAgICAgICBcImxhbmd1YWdlLnN1cHBvcnQuY2xhc3NcIjogc3VwcG9ydENsYXNzLFxuICAgICAgICAgICAgXCJsYW5ndWFnZS5zdXBwb3J0LmZ1bmN0aW9uXCI6IHN1cHBvcnRGdW5jdGlvbixcbiAgICAgICAgICAgIFwidmFyaWFibGUubGFuZ3VhZ2VcIjogdmFyaWFibGVMYW5ndWFnZVxuICAgICAgICB9LCBcImlkZW50aWZpZXJcIik7XG5cbiAgICAgICAgdmFyIGZ1bmN0aW9uUnVsZSA9IHtcbiAgICAgICAgICAgIHRva2VuOiBbXCJwYXJlbi5scGFyZW5cIiwgXCJ2YXJpYWJsZS5wYXJhbWV0ZXJcIiwgXCJwYXJlbi5ycGFyZW5cIiwgXCJ0ZXh0XCIsIFwic3RvcmFnZS50eXBlXCJdLFxuICAgICAgICAgICAgcmVnZXg6IC8oPzooXFwoKSgoPzpcIlteXCIpXSo/XCJ8J1teJyldKj8nfFxcL1teXFwvKV0qP1xcL3xbXigpXCInXFwvXSkqPykoXFwpKShcXHMqKSk/KFtcXC09XT4pLy5zb3VyY2VcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgc3RyaW5nRXNjYXBlID0gL1xcXFwoPzp4WzAtOWEtZkEtRl17Mn18dVswLTlhLWZBLUZdezR9fFswLTJdWzAtN117MCwyfXwzWzAtNl1bMC03XT98MzdbMC03XT98WzQtN11bMC03XT98LikvO1xuXG4gICAgICAgIHRoaXMuJHJ1bGVzID0ge1xuICAgICAgICAgICAgc3RhcnQgOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLFxuICAgICAgICAgICAgICAgICAgICByZWdleCA6IFwiKD86MHhbXFxcXGRhLWZBLUZdK3woPzpcXFxcZCsoPzpcXFxcLlxcXFxkKyk/fFxcXFwuXFxcXGQrKSg/OltlRV1bKy1dP1xcXFxkKyk/KVwiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZU5hbWU6IFwicWRvY1wiLFxuICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsIHJlZ2V4IDogXCInJydcIiwgbmV4dCA6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0b2tlbiA6IFwic3RyaW5nXCIsIHJlZ2V4IDogXCInJydcIiwgbmV4dCA6IFwic3RhcnRcIn0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7dG9rZW4gOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLCByZWdleCA6IHN0cmluZ0VzY2FwZX0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7ZGVmYXVsdFRva2VuOiBcInN0cmluZ1wifVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZU5hbWU6IFwicXFkb2NcIixcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICByZWdleCA6ICdcIlwiXCInLFxuICAgICAgICAgICAgICAgICAgICBuZXh0IDogW1xuICAgICAgICAgICAgICAgICAgICAgICAge3Rva2VuIDogXCJzdHJpbmdcIiwgcmVnZXggOiAnXCJcIlwiJywgbmV4dCA6IFwic3RhcnRcIn0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7dG9rZW4gOiBcInBhcmVuLnN0cmluZ1wiLCByZWdleCA6ICcjeycsIHB1c2ggOiBcInN0YXJ0XCJ9LFxuICAgICAgICAgICAgICAgICAgICAgICAge3Rva2VuIDogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIiwgcmVnZXggOiBzdHJpbmdFc2NhcGV9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2RlZmF1bHRUb2tlbjogXCJzdHJpbmdcIn1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVOYW1lOiBcInFzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLCByZWdleCA6IFwiJ1wiLCBuZXh0IDogW1xuICAgICAgICAgICAgICAgICAgICAgICAge3Rva2VuIDogXCJzdHJpbmdcIiwgcmVnZXggOiBcIidcIiwgbmV4dCA6IFwic3RhcnRcIn0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7dG9rZW4gOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLCByZWdleCA6IHN0cmluZ0VzY2FwZX0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7ZGVmYXVsdFRva2VuOiBcInN0cmluZ1wifVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZU5hbWU6IFwicXFzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZy5zdGFydFwiLCByZWdleCA6ICdcIicsIG5leHQgOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7dG9rZW4gOiBcInN0cmluZy5lbmRcIiwgcmVnZXggOiAnXCInLCBuZXh0IDogXCJzdGFydFwifSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0b2tlbiA6IFwicGFyZW4uc3RyaW5nXCIsIHJlZ2V4IDogJyN7JywgcHVzaCA6IFwic3RhcnRcIn0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7dG9rZW4gOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLCByZWdleCA6IHN0cmluZ0VzY2FwZX0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7ZGVmYXVsdFRva2VuOiBcInN0cmluZ1wifVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZU5hbWU6IFwianNcIixcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLCByZWdleCA6IFwiYFwiLCBuZXh0IDogW1xuICAgICAgICAgICAgICAgICAgICAgICAge3Rva2VuIDogXCJzdHJpbmdcIiwgcmVnZXggOiBcImBcIiwgbmV4dCA6IFwic3RhcnRcIn0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7dG9rZW4gOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLCByZWdleCA6IHN0cmluZ0VzY2FwZX0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7ZGVmYXVsdFRva2VuOiBcInN0cmluZ1wifVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICByZWdleDogXCJbe31dXCIsIG9uTWF0Y2g6IGZ1bmN0aW9uKHZhbCwgc3RhdGUsIHN0YWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHQgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbCA9PSBcIntcIiAmJiBzdGFjay5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFjay51bnNoaWZ0KFwic3RhcnRcIiwgc3RhdGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcInBhcmVuXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsID09IFwifVwiICYmIHN0YWNrLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWNrLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0ID0gc3RhY2suc2hpZnQoKSB8fCBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm5leHQuaW5kZXhPZihcInN0cmluZ1wiKSAhPSAtMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwicGFyZW4uc3RyaW5nXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJwYXJlblwiO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nLnJlZ2V4XCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIvLy9cIixcbiAgICAgICAgICAgICAgICAgICAgbmV4dCA6IFwiaGVyZWdleFwiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nLnJlZ2V4XCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogLyg/OlxcLyg/IVtcXHM9XSlbXltcXC9cXG5cXFxcXSooPzooPzpcXFxcW1xcc1xcU118XFxbW15cXF1cXG5cXFxcXSooPzpcXFxcW1xcc1xcU11bXlxcXVxcblxcXFxdKikqXSlbXltcXC9cXG5cXFxcXSopKlxcLykoPzpbaW1neV17MCw0fSkoPyFcXHcpL1xuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggOiBcIiMjIyg/ISMpXCIsXG4gICAgICAgICAgICAgICAgICAgIG5leHQgOiBcImNvbW1lbnRcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggOiBcIiMuKlwiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IFtcInB1bmN0dWF0aW9uLm9wZXJhdG9yXCIsIFwidGV4dFwiLCBcImlkZW50aWZpZXJcIl0sXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIoXFxcXC4pKFxcXFxzKikoXCIgKyBpbGxlZ2FsICsgXCIpXCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJwdW5jdHVhdGlvbi5vcGVyYXRvclwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXC57MSwzfVwiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAvL2NsYXNzIEEgZXh0ZW5kcyBCXG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogW1wia2V5d29yZFwiLCBcInRleHRcIiwgXCJsYW5ndWFnZS5zdXBwb3J0LmNsYXNzXCIsXG4gICAgICAgICAgICAgICAgICAgICBcInRleHRcIiwgXCJrZXl3b3JkXCIsIFwidGV4dFwiLCBcImxhbmd1YWdlLnN1cHBvcnQuY2xhc3NcIl0sXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIoY2xhc3MpKFxcXFxzKykoXCIgKyBpZGVudGlmaWVyICsgXCIpKD86KFxcXFxzKykoZXh0ZW5kcykoXFxcXHMrKShcIiArIGlkZW50aWZpZXIgKyBcIikpP1wiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAvL3BsYXkgPSAoLi4uKSAtPlxuICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IFtcImVudGl0eS5uYW1lLmZ1bmN0aW9uXCIsIFwidGV4dFwiLCBcImtleXdvcmQub3BlcmF0b3JcIiwgXCJ0ZXh0XCJdLmNvbmNhdChmdW5jdGlvblJ1bGUudG9rZW4pLFxuICAgICAgICAgICAgICAgICAgICByZWdleCA6IFwiKFwiICsgaWRlbnRpZmllciArIFwiKShcXFxccyopKFs9Ol0pKFxcXFxzKilcIiArIGZ1bmN0aW9uUnVsZS5yZWdleFxuICAgICAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uUnVsZSwgXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IFwidmFyaWFibGVcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggOiBcIkAoPzpcIiArIGlkZW50aWZpZXIgKyBcIik/XCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuOiBrZXl3b3JkTWFwcGVyLFxuICAgICAgICAgICAgICAgICAgICByZWdleCA6IGlkZW50aWZpZXJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJwdW5jdHVhdGlvbi5vcGVyYXRvclwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXCx8XFxcXC5cIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0b3JhZ2UudHlwZVwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleCA6IFwiW1xcXFwtPV0+XCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIoPzpbLSsqLyU8PiZ8XiE/PV09fD4+Pj0/fFxcXFwtXFxcXC18XFxcXCtcXFxcK3w6OnwmJj18XFxcXHxcXFxcfD18PDw9fD4+PXxcXFxcP1xcXFwufFxcXFwuezIsM318WyEqKy09PjxdKVwiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IFwicGFyZW4ubHBhcmVuXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJbKHtbXVwiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IFwicGFyZW4ucnBhcmVuXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJbXFxcXF19KV1cIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFxzK1wiXG4gICAgICAgICAgICAgICAgfV0sXG5cblxuICAgICAgICAgICAgaGVyZWdleCA6IFt7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZy5yZWdleFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogJy4qPy8vL1tpbWd5XXswLDR9JyxcbiAgICAgICAgICAgICAgICBuZXh0IDogXCJzdGFydFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnQucmVnZXhcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXHMrKD86Iy4qKT9cIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmcucmVnZXhcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXFMrXCJcbiAgICAgICAgICAgIH1dLFxuXG4gICAgICAgICAgICBjb21tZW50IDogW3tcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogJyMjIycsXG4gICAgICAgICAgICAgICAgbmV4dCA6IFwic3RhcnRcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbiA6IFwiY29tbWVudFwiXG4gICAgICAgICAgICB9XVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLm5vcm1hbGl6ZVJ1bGVzKCk7XG4gICAgfVxuXG4gICAgZXhwb3J0cy5Db2ZmZWVIaWdobGlnaHRSdWxlcyA9IENvZmZlZUhpZ2hsaWdodFJ1bGVzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vLi4vbGliL29vcFwiKTtcbnZhciBCYXNlRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9mb2xkX21vZGVcIikuRm9sZE1vZGU7XG52YXIgUmFuZ2UgPSByZXF1aXJlKFwiLi4vLi4vcmFuZ2VcIikuUmFuZ2U7XG5cbnZhciBGb2xkTW9kZSA9IGV4cG9ydHMuRm9sZE1vZGUgPSBmdW5jdGlvbigpIHt9O1xub29wLmluaGVyaXRzKEZvbGRNb2RlLCBCYXNlRm9sZE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5jb21tZW50QmxvY2sgPSBmdW5jdGlvbihzZXNzaW9uLCByb3cpIHtcbiAgICAgICAgdmFyIHJlID0gL1xcUy87XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgIHZhciBzdGFydExldmVsID0gbGluZS5zZWFyY2gocmUpO1xuICAgICAgICBpZiAoc3RhcnRMZXZlbCA9PSAtMSB8fCBsaW5lW3N0YXJ0TGV2ZWxdICE9IFwiI1wiKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHZhciBzdGFydENvbHVtbiA9IGxpbmUubGVuZ3RoO1xuICAgICAgICB2YXIgbWF4Um93ID0gc2Vzc2lvbi5nZXRMZW5ndGgoKTtcbiAgICAgICAgdmFyIHN0YXJ0Um93ID0gcm93O1xuICAgICAgICB2YXIgZW5kUm93ID0gcm93O1xuXG4gICAgICAgIHdoaWxlICgrK3JvdyA8IG1heFJvdykge1xuICAgICAgICAgICAgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICAgICAgdmFyIGxldmVsID0gbGluZS5zZWFyY2gocmUpO1xuXG4gICAgICAgICAgICBpZiAobGV2ZWwgPT0gLTEpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgICAgIGlmIChsaW5lW2xldmVsXSAhPSBcIiNcIilcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZW5kUm93ID0gcm93O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVuZFJvdyA+IHN0YXJ0Um93KSB7XG4gICAgICAgICAgICB2YXIgZW5kQ29sdW1uID0gc2Vzc2lvbi5nZXRMaW5lKGVuZFJvdykubGVuZ3RoO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShzdGFydFJvdywgc3RhcnRDb2x1bW4sIGVuZFJvdywgZW5kQ29sdW1uKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLmdldEZvbGRXaWRnZXRSYW5nZSA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KSB7XG4gICAgICAgIHZhciByYW5nZSA9IHRoaXMuaW5kZW50YXRpb25CbG9jayhzZXNzaW9uLCByb3cpO1xuICAgICAgICBpZiAocmFuZ2UpXG4gICAgICAgICAgICByZXR1cm4gcmFuZ2U7XG5cbiAgICAgICAgcmFuZ2UgPSB0aGlzLmNvbW1lbnRCbG9jayhzZXNzaW9uLCByb3cpO1xuICAgICAgICBpZiAocmFuZ2UpXG4gICAgICAgICAgICByZXR1cm4gcmFuZ2U7XG4gICAgfTtcblxuICAgIC8vIG11c3QgcmV0dXJuIFwiXCIgaWYgdGhlcmUncyBubyBmb2xkLCB0byBlbmFibGUgY2FjaGluZ1xuICAgIHRoaXMuZ2V0Rm9sZFdpZGdldCA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgIHZhciBpbmRlbnQgPSBsaW5lLnNlYXJjaCgvXFxTLyk7XG4gICAgICAgIHZhciBuZXh0ID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyArIDEpO1xuICAgICAgICB2YXIgcHJldiA9IHNlc3Npb24uZ2V0TGluZShyb3cgLSAxKTtcbiAgICAgICAgdmFyIHByZXZJbmRlbnQgPSBwcmV2LnNlYXJjaCgvXFxTLyk7XG4gICAgICAgIHZhciBuZXh0SW5kZW50ID0gbmV4dC5zZWFyY2goL1xcUy8pO1xuXG4gICAgICAgIGlmIChpbmRlbnQgPT0gLTEpIHtcbiAgICAgICAgICAgIHNlc3Npb24uZm9sZFdpZGdldHNbcm93IC0gMV0gPSBwcmV2SW5kZW50IT0gLTEgJiYgcHJldkluZGVudCA8IG5leHRJbmRlbnQgPyBcInN0YXJ0XCIgOiBcIlwiO1xuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBkb2N1bWVudGF0aW9uIGNvbW1lbnRzXG4gICAgICAgIGlmIChwcmV2SW5kZW50ID09IC0xKSB7XG4gICAgICAgICAgICBpZiAoaW5kZW50ID09IG5leHRJbmRlbnQgJiYgbGluZVtpbmRlbnRdID09IFwiI1wiICYmIG5leHRbaW5kZW50XSA9PSBcIiNcIikge1xuICAgICAgICAgICAgICAgIHNlc3Npb24uZm9sZFdpZGdldHNbcm93IC0gMV0gPSBcIlwiO1xuICAgICAgICAgICAgICAgIHNlc3Npb24uZm9sZFdpZGdldHNbcm93ICsgMV0gPSBcIlwiO1xuICAgICAgICAgICAgICAgIHJldHVybiBcInN0YXJ0XCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAocHJldkluZGVudCA9PSBpbmRlbnQgJiYgbGluZVtpbmRlbnRdID09IFwiI1wiICYmIHByZXZbaW5kZW50XSA9PSBcIiNcIikge1xuICAgICAgICAgICAgaWYgKHNlc3Npb24uZ2V0TGluZShyb3cgLSAyKS5zZWFyY2goL1xcUy8pID09IC0xKSB7XG4gICAgICAgICAgICAgICAgc2Vzc2lvbi5mb2xkV2lkZ2V0c1tyb3cgLSAxXSA9IFwic3RhcnRcIjtcbiAgICAgICAgICAgICAgICBzZXNzaW9uLmZvbGRXaWRnZXRzW3JvdyArIDFdID0gXCJcIjtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcmV2SW5kZW50IT0gLTEgJiYgcHJldkluZGVudCA8IGluZGVudClcbiAgICAgICAgICAgIHNlc3Npb24uZm9sZFdpZGdldHNbcm93IC0gMV0gPSBcInN0YXJ0XCI7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHNlc3Npb24uZm9sZFdpZGdldHNbcm93IC0gMV0gPSBcIlwiO1xuXG4gICAgICAgIGlmIChpbmRlbnQgPCBuZXh0SW5kZW50KVxuICAgICAgICAgICAgcmV0dXJuIFwic3RhcnRcIjtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfTtcblxufSkuY2FsbChGb2xkTW9kZS5wcm90b3R5cGUpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBSYW5nZSA9IHJlcXVpcmUoXCIuLi9yYW5nZVwiKS5SYW5nZTtcblxudmFyIE1hdGNoaW5nQnJhY2VPdXRkZW50ID0gZnVuY3Rpb24oKSB7fTtcblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5jaGVja091dGRlbnQgPSBmdW5jdGlvbihsaW5lLCBpbnB1dCkge1xuICAgICAgICBpZiAoISAvXlxccyskLy50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIHJldHVybiAvXlxccypcXH0vLnRlc3QoaW5wdXQpO1xuICAgIH07XG5cbiAgICB0aGlzLmF1dG9PdXRkZW50ID0gZnVuY3Rpb24oZG9jLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBkb2MuZ2V0TGluZShyb3cpO1xuICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKC9eKFxccypcXH0pLyk7XG5cbiAgICAgICAgaWYgKCFtYXRjaCkgcmV0dXJuIDA7XG5cbiAgICAgICAgdmFyIGNvbHVtbiA9IG1hdGNoWzFdLmxlbmd0aDtcbiAgICAgICAgdmFyIG9wZW5CcmFjZVBvcyA9IGRvYy5maW5kTWF0Y2hpbmdCcmFja2V0KHtyb3c6IHJvdywgY29sdW1uOiBjb2x1bW59KTtcblxuICAgICAgICBpZiAoIW9wZW5CcmFjZVBvcyB8fCBvcGVuQnJhY2VQb3Mucm93ID09IHJvdykgcmV0dXJuIDA7XG5cbiAgICAgICAgdmFyIGluZGVudCA9IHRoaXMuJGdldEluZGVudChkb2MuZ2V0TGluZShvcGVuQnJhY2VQb3Mucm93KSk7XG4gICAgICAgIGRvYy5yZXBsYWNlKG5ldyBSYW5nZShyb3csIDAsIHJvdywgY29sdW1uLTEpLCBpbmRlbnQpO1xuICAgIH07XG5cbiAgICB0aGlzLiRnZXRJbmRlbnQgPSBmdW5jdGlvbihsaW5lKSB7XG4gICAgICAgIHJldHVybiBsaW5lLm1hdGNoKC9eXFxzKi8pWzBdO1xuICAgIH07XG5cbn0pLmNhbGwoTWF0Y2hpbmdCcmFjZU91dGRlbnQucHJvdG90eXBlKTtcblxuZXhwb3J0cy5NYXRjaGluZ0JyYWNlT3V0ZGVudCA9IE1hdGNoaW5nQnJhY2VPdXRkZW50O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9