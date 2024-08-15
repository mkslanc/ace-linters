"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[1079],{

/***/ 61079:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var Rules = (__webpack_require__(28068).CoffeeHighlightRules);
var Outdent = (__webpack_require__(28670).MatchingBraceOutdent);
var FoldMode = (__webpack_require__(69261)/* .FoldMode */ .l);
var Range = (__webpack_require__(91902)/* .Range */ .Q);
var TextMode = (__webpack_require__(49432).Mode);
var WorkerClient = (__webpack_require__(28402).WorkerClient);
var oop = __webpack_require__(2645);

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

/***/ 28068:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



    var oop = __webpack_require__(2645);
    var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

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

    exports.CoffeeHighlightRules = CoffeeHighlightRules;


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


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QjtBQUN0Qjs7QUFFQTtBQUNBO0FBQ0EsdUNBQXVDOztBQUV2Qzs7QUFFQTtBQUNBLG9EQUFvRCx5QkFBeUI7O0FBRTdFOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQzs7QUFFRCw0QkFBNEIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2NvZmZlZS5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2NvZmZlZV9oaWdobGlnaHRfcnVsZXMuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9mb2xkaW5nL2NvZmZlZS5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL21hdGNoaW5nX2JyYWNlX291dGRlbnQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBSdWxlcyA9IHJlcXVpcmUoXCIuL2NvZmZlZV9oaWdobGlnaHRfcnVsZXNcIikuQ29mZmVlSGlnaGxpZ2h0UnVsZXM7XG52YXIgT3V0ZGVudCA9IHJlcXVpcmUoXCIuL21hdGNoaW5nX2JyYWNlX291dGRlbnRcIikuTWF0Y2hpbmdCcmFjZU91dGRlbnQ7XG52YXIgRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9mb2xkaW5nL2NvZmZlZVwiKS5Gb2xkTW9kZTtcbnZhciBSYW5nZSA9IHJlcXVpcmUoXCIuLi9yYW5nZVwiKS5SYW5nZTtcbnZhciBUZXh0TW9kZSA9IHJlcXVpcmUoXCIuL3RleHRcIikuTW9kZTtcbnZhciBXb3JrZXJDbGllbnQgPSByZXF1aXJlKFwiLi4vd29ya2VyL3dvcmtlcl9jbGllbnRcIikuV29ya2VyQ2xpZW50O1xudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xuXG5mdW5jdGlvbiBNb2RlKCkge1xuICAgIHRoaXMuSGlnaGxpZ2h0UnVsZXMgPSBSdWxlcztcbiAgICB0aGlzLiRvdXRkZW50ID0gbmV3IE91dGRlbnQoKTtcbiAgICB0aGlzLmZvbGRpbmdSdWxlcyA9IG5ldyBGb2xkTW9kZSgpO1xufVxuXG5vb3AuaW5oZXJpdHMoTW9kZSwgVGV4dE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgXG4gICAgLyo6XG4gICAgICBbKHtbPTpdICAgICAgICAjIE9wZW5pbmcgcGFyZW50aGVzZXMgb3IgYnJhY2tldHNcbiAgICAgfFstPV0+ICAgICAgICAgICMgT1Igc2luZ2xlIG9yIGRvdWJsZSBhcnJvd1xuICAgICB8XFxiKD86ICAgICAgICAgICMgT1Igb25lIG9mIHRoZXNlIHdvcmRzOlxuICAgICAgIGVsc2UgICAgICAgICAgIyAgICBlbHNlXG4gICAgICB8dHJ5ICAgICAgICAgICAjIE9SIHRyeVxuICAgICAgfCg/OnN3aXxjYSl0Y2ggIyBPUiBjYXRjaCwgb3B0aW9uYWxseSBmb2xsb3dlZCBieTpcbiAgICAgICAgKD86XFxzKlskQS1aYS16X1xceDdmLVxcdWZmZmZdWyRcXHdcXHg3Zi1cXHVmZmZmXSopPyAgIyBhIHZhcmlhYmxlXG4gICAgICB8ZmluYWxseSAgICAgICAjIE9SIGZpbmFsbHlcbiAgICAgKSlcXHMqJCAgICAgICAgICAjIGFsbCBhcyB0aGUgbGFzdCB0aGluZyBvbiBhIGxpbmUgKGFsbG93aW5nIHRyYWlsaW5nIHNwYWNlKVxuICAgIHwgICAgICAgICAgICAgICAgIyAtLS0tIE9SIC0tLS0gOlxuICAgIF5cXHMqICAgICAgICAgICAgICMgYSBsaW5lIHN0YXJ0aW5nIHdpdGggb3B0aW9uYWwgc3BhY2VcbiAgICAoZWxzZVxcYlxccyopPyAgICAgIyBmb2xsb3dlZCBieSBhbiBvcHRpb25hbCBcImVsc2VcIlxuICAgICg/OiAgICAgICAgICAgICAgIyBmb2xsb3dlZCBieSBvbmUgb2YgdGhlIGZvbGxvd2luZzpcbiAgICAgICBpZiAgICAgICAgICAgICMgICAgaWZcbiAgICAgIHxmb3IgICAgICAgICAgICMgT1IgZm9yXG4gICAgICB8d2hpbGUgICAgICAgICAjIE9SIHdoaWxlXG4gICAgICB8bG9vcCAgICAgICAgICAjIE9SIGxvb3BcbiAgICApXFxiICAgICAgICAgICAgICAjICAgIChhcyBhIHdvcmQpXG4gICAgKD8hLipcXGJ0aGVuXFxiKSAgICMgLi4uIGJ1dCBOT1QgZm9sbG93ZWQgYnkgXCJ0aGVuXCIgb24gdGhlIGxpbmVcbiAgICAqL1xuICAgIHZhciBpbmRlbnRlciA9IC8oPzpbKHtbPTpdfFstPV0+fFxcYig/OmVsc2V8dHJ5fCg/OnN3aXxjYSl0Y2goPzpcXHMrWyRBLVphLXpfXFx4N2YtXFx1ZmZmZl1bJFxcd1xceDdmLVxcdWZmZmZdKik/fGZpbmFsbHkpKVxccyokfF5cXHMqKGVsc2VcXGJcXHMqKT8oPzppZnxmb3J8d2hpbGV8bG9vcClcXGIoPyEuKlxcYnRoZW5cXGIpLztcbiAgICBcbiAgICB0aGlzLmxpbmVDb21tZW50U3RhcnQgPSBcIiNcIjtcbiAgICB0aGlzLmJsb2NrQ29tbWVudCA9IHtzdGFydDogXCIjIyNcIiwgZW5kOiBcIiMjI1wifTtcbiAgICBcbiAgICB0aGlzLmdldE5leHRMaW5lSW5kZW50ID0gZnVuY3Rpb24oc3RhdGUsIGxpbmUsIHRhYikge1xuICAgICAgICB2YXIgaW5kZW50ID0gdGhpcy4kZ2V0SW5kZW50KGxpbmUpO1xuICAgICAgICB2YXIgdG9rZW5zID0gdGhpcy5nZXRUb2tlbml6ZXIoKS5nZXRMaW5lVG9rZW5zKGxpbmUsIHN0YXRlKS50b2tlbnM7XG4gICAgXG4gICAgICAgIGlmICghKHRva2Vucy5sZW5ndGggJiYgdG9rZW5zW3Rva2Vucy5sZW5ndGggLSAxXS50eXBlID09PSAnY29tbWVudCcpICYmXG4gICAgICAgICAgICBzdGF0ZSA9PT0gJ3N0YXJ0JyAmJiBpbmRlbnRlci50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgaW5kZW50ICs9IHRhYjtcbiAgICAgICAgcmV0dXJuIGluZGVudDtcbiAgICB9O1xuICAgIFxuICAgIHRoaXMuY2hlY2tPdXRkZW50ID0gZnVuY3Rpb24oc3RhdGUsIGxpbmUsIGlucHV0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRvdXRkZW50LmNoZWNrT3V0ZGVudChsaW5lLCBpbnB1dCk7XG4gICAgfTtcbiAgICBcbiAgICB0aGlzLmF1dG9PdXRkZW50ID0gZnVuY3Rpb24oc3RhdGUsIGRvYywgcm93KSB7XG4gICAgICAgIHRoaXMuJG91dGRlbnQuYXV0b091dGRlbnQoZG9jLCByb3cpO1xuICAgIH07XG4gICAgXG4gICAgdGhpcy5jcmVhdGVXb3JrZXIgPSBmdW5jdGlvbihzZXNzaW9uKSB7XG4gICAgICAgIHZhciB3b3JrZXIgPSBuZXcgV29ya2VyQ2xpZW50KFtcImFjZVwiXSwgXCJhY2UvbW9kZS9jb2ZmZWVfd29ya2VyXCIsIFwiV29ya2VyXCIpO1xuICAgICAgICB3b3JrZXIuYXR0YWNoVG9Eb2N1bWVudChzZXNzaW9uLmdldERvY3VtZW50KCkpO1xuICAgICAgICBcbiAgICAgICAgd29ya2VyLm9uKFwiYW5ub3RhdGVcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgc2Vzc2lvbi5zZXRBbm5vdGF0aW9ucyhlLmRhdGEpO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIHdvcmtlci5vbihcInRlcm1pbmF0ZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNlc3Npb24uY2xlYXJBbm5vdGF0aW9ucygpO1xuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB3b3JrZXI7XG4gICAgfTtcblxuICAgIHRoaXMuJGlkID0gXCJhY2UvbW9kZS9jb2ZmZWVcIjtcbiAgICB0aGlzLnNuaXBwZXRGaWxlSWQgPSBcImFjZS9zbmlwcGV0cy9jb2ZmZWVcIjtcbn0pLmNhbGwoTW9kZS5wcm90b3R5cGUpO1xuXG5leHBvcnRzLk1vZGUgPSBNb2RlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICB2YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG4gICAgdmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcblxuICAgIG9vcC5pbmhlcml0cyhDb2ZmZWVIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuICAgIGZ1bmN0aW9uIENvZmZlZUhpZ2hsaWdodFJ1bGVzKCkge1xuICAgICAgICB2YXIgaWRlbnRpZmllciA9IFwiWyRBLVphLXpfXFxcXHg3Zi1cXFxcdWZmZmZdWyRcXFxcd1xcXFx4N2YtXFxcXHVmZmZmXSpcIjtcblxuICAgICAgICB2YXIga2V5d29yZHMgPSAoXG4gICAgICAgICAgICBcInRoaXN8dGhyb3d8dGhlbnx0cnl8dHlwZW9mfHN1cGVyfHN3aXRjaHxyZXR1cm58YnJlYWt8Ynl8Y29udGludWV8XCIgK1xuICAgICAgICAgICAgXCJjYXRjaHxjbGFzc3xpbnxpbnN0YW5jZW9mfGlzfGlzbnR8aWZ8ZWxzZXxleHRlbmRzfGZvcnxvd258XCIgK1xuICAgICAgICAgICAgXCJmaW5hbGx5fGZ1bmN0aW9ufHdoaWxlfHdoZW58bmV3fG5vfG5vdHxkZWxldGV8ZGVidWdnZXJ8ZG98bG9vcHxvZnxvZmZ8XCIgK1xuICAgICAgICAgICAgXCJvcnxvbnx1bmxlc3N8dW50aWx8YW5kfHllc3x5aWVsZHxleHBvcnR8aW1wb3J0fGRlZmF1bHRcIlxuICAgICAgICApO1xuXG4gICAgICAgIHZhciBsYW5nQ29uc3RhbnQgPSAoXG4gICAgICAgICAgICBcInRydWV8ZmFsc2V8bnVsbHx1bmRlZmluZWR8TmFOfEluZmluaXR5XCJcbiAgICAgICAgKTtcblxuICAgICAgICB2YXIgaWxsZWdhbCA9IChcbiAgICAgICAgICAgIFwiY2FzZXxjb25zdHxmdW5jdGlvbnx2YXJ8dm9pZHx3aXRofGVudW18aW1wbGVtZW50c3xcIiArXG4gICAgICAgICAgICBcImludGVyZmFjZXxsZXR8cGFja2FnZXxwcml2YXRlfHByb3RlY3RlZHxwdWJsaWN8c3RhdGljXCJcbiAgICAgICAgKTtcblxuICAgICAgICB2YXIgc3VwcG9ydENsYXNzID0gKFxuICAgICAgICAgICAgXCJBcnJheXxCb29sZWFufERhdGV8RnVuY3Rpb258TnVtYmVyfE9iamVjdHxSZWdFeHB8UmVmZXJlbmNlRXJyb3J8U3RyaW5nfFwiICtcbiAgICAgICAgICAgIFwiRXJyb3J8RXZhbEVycm9yfEludGVybmFsRXJyb3J8UmFuZ2VFcnJvcnxSZWZlcmVuY2VFcnJvcnxTdG9wSXRlcmF0aW9ufFwiICtcbiAgICAgICAgICAgIFwiU3ludGF4RXJyb3J8VHlwZUVycm9yfFVSSUVycm9yfFwiICArXG4gICAgICAgICAgICBcIkFycmF5QnVmZmVyfEZsb2F0MzJBcnJheXxGbG9hdDY0QXJyYXl8SW50MTZBcnJheXxJbnQzMkFycmF5fEludDhBcnJheXxcIiArXG4gICAgICAgICAgICBcIlVpbnQxNkFycmF5fFVpbnQzMkFycmF5fFVpbnQ4QXJyYXl8VWludDhDbGFtcGVkQXJyYXlcIlxuICAgICAgICApO1xuXG4gICAgICAgIHZhciBzdXBwb3J0RnVuY3Rpb24gPSAoXG4gICAgICAgICAgICBcIk1hdGh8SlNPTnxpc05hTnxpc0Zpbml0ZXxwYXJzZUludHxwYXJzZUZsb2F0fGVuY29kZVVSSXxcIiArXG4gICAgICAgICAgICBcImVuY29kZVVSSUNvbXBvbmVudHxkZWNvZGVVUkl8ZGVjb2RlVVJJQ29tcG9uZW50fFN0cmluZ3xcIlxuICAgICAgICApO1xuXG4gICAgICAgIHZhciB2YXJpYWJsZUxhbmd1YWdlID0gKFxuICAgICAgICAgICAgXCJ3aW5kb3d8YXJndW1lbnRzfHByb3RvdHlwZXxkb2N1bWVudFwiXG4gICAgICAgICk7XG5cbiAgICAgICAgdmFyIGtleXdvcmRNYXBwZXIgPSB0aGlzLmNyZWF0ZUtleXdvcmRNYXBwZXIoe1xuICAgICAgICAgICAgXCJrZXl3b3JkXCI6IGtleXdvcmRzLFxuICAgICAgICAgICAgXCJjb25zdGFudC5sYW5ndWFnZVwiOiBsYW5nQ29uc3RhbnQsXG4gICAgICAgICAgICBcImludmFsaWQuaWxsZWdhbFwiOiBpbGxlZ2FsLFxuICAgICAgICAgICAgXCJsYW5ndWFnZS5zdXBwb3J0LmNsYXNzXCI6IHN1cHBvcnRDbGFzcyxcbiAgICAgICAgICAgIFwibGFuZ3VhZ2Uuc3VwcG9ydC5mdW5jdGlvblwiOiBzdXBwb3J0RnVuY3Rpb24sXG4gICAgICAgICAgICBcInZhcmlhYmxlLmxhbmd1YWdlXCI6IHZhcmlhYmxlTGFuZ3VhZ2VcbiAgICAgICAgfSwgXCJpZGVudGlmaWVyXCIpO1xuXG4gICAgICAgIHZhciBmdW5jdGlvblJ1bGUgPSB7XG4gICAgICAgICAgICB0b2tlbjogW1wicGFyZW4ubHBhcmVuXCIsIFwidmFyaWFibGUucGFyYW1ldGVyXCIsIFwicGFyZW4ucnBhcmVuXCIsIFwidGV4dFwiLCBcInN0b3JhZ2UudHlwZVwiXSxcbiAgICAgICAgICAgIHJlZ2V4OiAvKD86KFxcKCkoKD86XCJbXlwiKV0qP1wifCdbXicpXSo/J3xcXC9bXlxcLyldKj9cXC98W14oKVwiJ1xcL10pKj8pKFxcKSkoXFxzKikpPyhbXFwtPV0+KS8uc291cmNlXG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIHN0cmluZ0VzY2FwZSA9IC9cXFxcKD86eFswLTlhLWZBLUZdezJ9fHVbMC05YS1mQS1GXXs0fXxbMC0yXVswLTddezAsMn18M1swLTZdWzAtN10/fDM3WzAtN10/fFs0LTddWzAtN10/fC4pLztcblxuICAgICAgICB0aGlzLiRydWxlcyA9IHtcbiAgICAgICAgICAgIHN0YXJ0IDogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggOiBcIig/OjB4W1xcXFxkYS1mQS1GXSt8KD86XFxcXGQrKD86XFxcXC5cXFxcZCspP3xcXFxcLlxcXFxkKykoPzpbZUVdWystXT9cXFxcZCspPylcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVOYW1lOiBcInFkb2NcIixcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLCByZWdleCA6IFwiJycnXCIsIG5leHQgOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7dG9rZW4gOiBcInN0cmluZ1wiLCByZWdleCA6IFwiJycnXCIsIG5leHQgOiBcInN0YXJ0XCJ9LFxuICAgICAgICAgICAgICAgICAgICAgICAge3Rva2VuIDogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIiwgcmVnZXggOiBzdHJpbmdFc2NhcGV9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2RlZmF1bHRUb2tlbjogXCJzdHJpbmdcIn1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVOYW1lOiBcInFxZG9jXCIsXG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggOiAnXCJcIlwiJyxcbiAgICAgICAgICAgICAgICAgICAgbmV4dCA6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0b2tlbiA6IFwic3RyaW5nXCIsIHJlZ2V4IDogJ1wiXCJcIicsIG5leHQgOiBcInN0YXJ0XCJ9LFxuICAgICAgICAgICAgICAgICAgICAgICAge3Rva2VuIDogXCJwYXJlbi5zdHJpbmdcIiwgcmVnZXggOiAnI3snLCBwdXNoIDogXCJzdGFydFwifSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0b2tlbiA6IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCIsIHJlZ2V4IDogc3RyaW5nRXNjYXBlfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtkZWZhdWx0VG9rZW46IFwic3RyaW5nXCJ9XG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlTmFtZTogXCJxc3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIiwgcmVnZXggOiBcIidcIiwgbmV4dCA6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0b2tlbiA6IFwic3RyaW5nXCIsIHJlZ2V4IDogXCInXCIsIG5leHQgOiBcInN0YXJ0XCJ9LFxuICAgICAgICAgICAgICAgICAgICAgICAge3Rva2VuIDogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIiwgcmVnZXggOiBzdHJpbmdFc2NhcGV9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2RlZmF1bHRUb2tlbjogXCJzdHJpbmdcIn1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVOYW1lOiBcInFxc3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmcuc3RhcnRcIiwgcmVnZXggOiAnXCInLCBuZXh0IDogW1xuICAgICAgICAgICAgICAgICAgICAgICAge3Rva2VuIDogXCJzdHJpbmcuZW5kXCIsIHJlZ2V4IDogJ1wiJywgbmV4dCA6IFwic3RhcnRcIn0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7dG9rZW4gOiBcInBhcmVuLnN0cmluZ1wiLCByZWdleCA6ICcjeycsIHB1c2ggOiBcInN0YXJ0XCJ9LFxuICAgICAgICAgICAgICAgICAgICAgICAge3Rva2VuIDogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIiwgcmVnZXggOiBzdHJpbmdFc2NhcGV9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2RlZmF1bHRUb2tlbjogXCJzdHJpbmdcIn1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVOYW1lOiBcImpzXCIsXG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIiwgcmVnZXggOiBcImBcIiwgbmV4dCA6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0b2tlbiA6IFwic3RyaW5nXCIsIHJlZ2V4IDogXCJgXCIsIG5leHQgOiBcInN0YXJ0XCJ9LFxuICAgICAgICAgICAgICAgICAgICAgICAge3Rva2VuIDogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIiwgcmVnZXggOiBzdHJpbmdFc2NhcGV9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2RlZmF1bHRUb2tlbjogXCJzdHJpbmdcIn1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgcmVnZXg6IFwiW3t9XVwiLCBvbk1hdGNoOiBmdW5jdGlvbih2YWwsIHN0YXRlLCBzdGFjaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0ID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWwgPT0gXCJ7XCIgJiYgc3RhY2subGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhY2sudW5zaGlmdChcInN0YXJ0XCIsIHN0YXRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJwYXJlblwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbCA9PSBcIn1cIiAmJiBzdGFjay5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFjay5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dCA9IHN0YWNrLnNoaWZ0KCkgfHwgXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5uZXh0LmluZGV4T2YoXCJzdHJpbmdcIikgIT0gLTEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcInBhcmVuLnN0cmluZ1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwicGFyZW5cIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZy5yZWdleFwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleCA6IFwiLy8vXCIsXG4gICAgICAgICAgICAgICAgICAgIG5leHQgOiBcImhlcmVnZXhcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZy5yZWdleFwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleCA6IC8oPzpcXC8oPyFbXFxzPV0pW15bXFwvXFxuXFxcXF0qKD86KD86XFxcXFtcXHNcXFNdfFxcW1teXFxdXFxuXFxcXF0qKD86XFxcXFtcXHNcXFNdW15cXF1cXG5cXFxcXSopKl0pW15bXFwvXFxuXFxcXF0qKSpcXC8pKD86W2ltZ3ldezAsNH0pKD8hXFx3KS9cbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIjIyMoPyEjKVwiLFxuICAgICAgICAgICAgICAgICAgICBuZXh0IDogXCJjb21tZW50XCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIjLipcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBbXCJwdW5jdHVhdGlvbi5vcGVyYXRvclwiLCBcInRleHRcIiwgXCJpZGVudGlmaWVyXCJdLFxuICAgICAgICAgICAgICAgICAgICByZWdleCA6IFwiKFxcXFwuKShcXFxccyopKFwiICsgaWxsZWdhbCArIFwiKVwiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IFwicHVuY3R1YXRpb24ub3BlcmF0b3JcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwuezEsM31cIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgLy9jbGFzcyBBIGV4dGVuZHMgQlxuICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IFtcImtleXdvcmRcIiwgXCJ0ZXh0XCIsIFwibGFuZ3VhZ2Uuc3VwcG9ydC5jbGFzc1wiLFxuICAgICAgICAgICAgICAgICAgICAgXCJ0ZXh0XCIsIFwia2V5d29yZFwiLCBcInRleHRcIiwgXCJsYW5ndWFnZS5zdXBwb3J0LmNsYXNzXCJdLFxuICAgICAgICAgICAgICAgICAgICByZWdleCA6IFwiKGNsYXNzKShcXFxccyspKFwiICsgaWRlbnRpZmllciArIFwiKSg/OihcXFxccyspKGV4dGVuZHMpKFxcXFxzKykoXCIgKyBpZGVudGlmaWVyICsgXCIpKT9cIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgLy9wbGF5ID0gKC4uLikgLT5cbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBbXCJlbnRpdHkubmFtZS5mdW5jdGlvblwiLCBcInRleHRcIiwgXCJrZXl3b3JkLm9wZXJhdG9yXCIsIFwidGV4dFwiXS5jb25jYXQoZnVuY3Rpb25SdWxlLnRva2VuKSxcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggOiBcIihcIiArIGlkZW50aWZpZXIgKyBcIikoXFxcXHMqKShbPTpdKShcXFxccyopXCIgKyBmdW5jdGlvblJ1bGUucmVnZXhcbiAgICAgICAgICAgICAgICB9LCBcbiAgICAgICAgICAgICAgICBmdW5jdGlvblJ1bGUsIFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcInZhcmlhYmxlXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJAKD86XCIgKyBpZGVudGlmaWVyICsgXCIpP1wiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbjoga2V5d29yZE1hcHBlcixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggOiBpZGVudGlmaWVyXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IFwicHVuY3R1YXRpb24ub3BlcmF0b3JcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwsfFxcXFwuXCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdG9yYWdlLnR5cGVcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggOiBcIltcXFxcLT1dPlwiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IFwia2V5d29yZC5vcGVyYXRvclwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleCA6IFwiKD86Wy0rKi8lPD4mfF4hPz1dPXw+Pj49P3xcXFxcLVxcXFwtfFxcXFwrXFxcXCt8Ojp8JiY9fFxcXFx8XFxcXHw9fDw8PXw+Pj18XFxcXD9cXFxcLnxcXFxcLnsyLDN9fFshKistPT48XSlcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcInBhcmVuLmxwYXJlblwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleCA6IFwiWyh7W11cIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcInBhcmVuLnJwYXJlblwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleCA6IFwiW1xcXFxdfSldXCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxccytcIlxuICAgICAgICAgICAgICAgIH1dLFxuXG5cbiAgICAgICAgICAgIGhlcmVnZXggOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmcucmVnZXhcIixcbiAgICAgICAgICAgICAgICByZWdleCA6ICcuKj8vLy9baW1neV17MCw0fScsXG4gICAgICAgICAgICAgICAgbmV4dCA6IFwic3RhcnRcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50LnJlZ2V4XCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFxzKyg/OiMuKik/XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nLnJlZ2V4XCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFxTK1wiXG4gICAgICAgICAgICB9XSxcblxuICAgICAgICAgICAgY29tbWVudCA6IFt7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6ICcjIyMnLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcInN0YXJ0XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW4gOiBcImNvbW1lbnRcIlxuICAgICAgICAgICAgfV1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5ub3JtYWxpemVSdWxlcygpO1xuICAgIH1cblxuICAgIGV4cG9ydHMuQ29mZmVlSGlnaGxpZ2h0UnVsZXMgPSBDb2ZmZWVIaWdobGlnaHRSdWxlcztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uLy4uL2xpYi9vb3BcIik7XG52YXIgQmFzZUZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZF9tb2RlXCIpLkZvbGRNb2RlO1xudmFyIFJhbmdlID0gcmVxdWlyZShcIi4uLy4uL3JhbmdlXCIpLlJhbmdlO1xuXG52YXIgRm9sZE1vZGUgPSBleHBvcnRzLkZvbGRNb2RlID0gZnVuY3Rpb24oKSB7fTtcbm9vcC5pbmhlcml0cyhGb2xkTW9kZSwgQmFzZUZvbGRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuY29tbWVudEJsb2NrID0gZnVuY3Rpb24oc2Vzc2lvbiwgcm93KSB7XG4gICAgICAgIHZhciByZSA9IC9cXFMvO1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICB2YXIgc3RhcnRMZXZlbCA9IGxpbmUuc2VhcmNoKHJlKTtcbiAgICAgICAgaWYgKHN0YXJ0TGV2ZWwgPT0gLTEgfHwgbGluZVtzdGFydExldmVsXSAhPSBcIiNcIilcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB2YXIgc3RhcnRDb2x1bW4gPSBsaW5lLmxlbmd0aDtcbiAgICAgICAgdmFyIG1heFJvdyA9IHNlc3Npb24uZ2V0TGVuZ3RoKCk7XG4gICAgICAgIHZhciBzdGFydFJvdyA9IHJvdztcbiAgICAgICAgdmFyIGVuZFJvdyA9IHJvdztcblxuICAgICAgICB3aGlsZSAoKytyb3cgPCBtYXhSb3cpIHtcbiAgICAgICAgICAgIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgICAgIHZhciBsZXZlbCA9IGxpbmUuc2VhcmNoKHJlKTtcblxuICAgICAgICAgICAgaWYgKGxldmVsID09IC0xKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICBpZiAobGluZVtsZXZlbF0gIT0gXCIjXCIpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGVuZFJvdyA9IHJvdztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbmRSb3cgPiBzdGFydFJvdykge1xuICAgICAgICAgICAgdmFyIGVuZENvbHVtbiA9IHNlc3Npb24uZ2V0TGluZShlbmRSb3cpLmxlbmd0aDtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmFuZ2Uoc3RhcnRSb3csIHN0YXJ0Q29sdW1uLCBlbmRSb3csIGVuZENvbHVtbik7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0UmFuZ2UgPSBmdW5jdGlvbihzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdykge1xuICAgICAgICB2YXIgcmFuZ2UgPSB0aGlzLmluZGVudGF0aW9uQmxvY2soc2Vzc2lvbiwgcm93KTtcbiAgICAgICAgaWYgKHJhbmdlKVxuICAgICAgICAgICAgcmV0dXJuIHJhbmdlO1xuXG4gICAgICAgIHJhbmdlID0gdGhpcy5jb21tZW50QmxvY2soc2Vzc2lvbiwgcm93KTtcbiAgICAgICAgaWYgKHJhbmdlKVxuICAgICAgICAgICAgcmV0dXJuIHJhbmdlO1xuICAgIH07XG5cbiAgICAvLyBtdXN0IHJldHVybiBcIlwiIGlmIHRoZXJlJ3Mgbm8gZm9sZCwgdG8gZW5hYmxlIGNhY2hpbmdcbiAgICB0aGlzLmdldEZvbGRXaWRnZXQgPSBmdW5jdGlvbihzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdykge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICB2YXIgaW5kZW50ID0gbGluZS5zZWFyY2goL1xcUy8pO1xuICAgICAgICB2YXIgbmV4dCA9IHNlc3Npb24uZ2V0TGluZShyb3cgKyAxKTtcbiAgICAgICAgdmFyIHByZXYgPSBzZXNzaW9uLmdldExpbmUocm93IC0gMSk7XG4gICAgICAgIHZhciBwcmV2SW5kZW50ID0gcHJldi5zZWFyY2goL1xcUy8pO1xuICAgICAgICB2YXIgbmV4dEluZGVudCA9IG5leHQuc2VhcmNoKC9cXFMvKTtcblxuICAgICAgICBpZiAoaW5kZW50ID09IC0xKSB7XG4gICAgICAgICAgICBzZXNzaW9uLmZvbGRXaWRnZXRzW3JvdyAtIDFdID0gcHJldkluZGVudCE9IC0xICYmIHByZXZJbmRlbnQgPCBuZXh0SW5kZW50ID8gXCJzdGFydFwiIDogXCJcIjtcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZG9jdW1lbnRhdGlvbiBjb21tZW50c1xuICAgICAgICBpZiAocHJldkluZGVudCA9PSAtMSkge1xuICAgICAgICAgICAgaWYgKGluZGVudCA9PSBuZXh0SW5kZW50ICYmIGxpbmVbaW5kZW50XSA9PSBcIiNcIiAmJiBuZXh0W2luZGVudF0gPT0gXCIjXCIpIHtcbiAgICAgICAgICAgICAgICBzZXNzaW9uLmZvbGRXaWRnZXRzW3JvdyAtIDFdID0gXCJcIjtcbiAgICAgICAgICAgICAgICBzZXNzaW9uLmZvbGRXaWRnZXRzW3JvdyArIDFdID0gXCJcIjtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJzdGFydFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHByZXZJbmRlbnQgPT0gaW5kZW50ICYmIGxpbmVbaW5kZW50XSA9PSBcIiNcIiAmJiBwcmV2W2luZGVudF0gPT0gXCIjXCIpIHtcbiAgICAgICAgICAgIGlmIChzZXNzaW9uLmdldExpbmUocm93IC0gMikuc2VhcmNoKC9cXFMvKSA9PSAtMSkge1xuICAgICAgICAgICAgICAgIHNlc3Npb24uZm9sZFdpZGdldHNbcm93IC0gMV0gPSBcInN0YXJ0XCI7XG4gICAgICAgICAgICAgICAgc2Vzc2lvbi5mb2xkV2lkZ2V0c1tyb3cgKyAxXSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJldkluZGVudCE9IC0xICYmIHByZXZJbmRlbnQgPCBpbmRlbnQpXG4gICAgICAgICAgICBzZXNzaW9uLmZvbGRXaWRnZXRzW3JvdyAtIDFdID0gXCJzdGFydFwiO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBzZXNzaW9uLmZvbGRXaWRnZXRzW3JvdyAtIDFdID0gXCJcIjtcblxuICAgICAgICBpZiAoaW5kZW50IDwgbmV4dEluZGVudClcbiAgICAgICAgICAgIHJldHVybiBcInN0YXJ0XCI7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgIH07XG5cbn0pLmNhbGwoRm9sZE1vZGUucHJvdG90eXBlKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgUmFuZ2UgPSByZXF1aXJlKFwiLi4vcmFuZ2VcIikuUmFuZ2U7XG5cbnZhciBNYXRjaGluZ0JyYWNlT3V0ZGVudCA9IGZ1bmN0aW9uKCkge307XG5cbihmdW5jdGlvbigpIHtcblxuICAgIHRoaXMuY2hlY2tPdXRkZW50ID0gZnVuY3Rpb24obGluZSwgaW5wdXQpIHtcbiAgICAgICAgaWYgKCEgL15cXHMrJC8udGVzdChsaW5lKSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgICByZXR1cm4gL15cXHMqXFx9Ly50ZXN0KGlucHV0KTtcbiAgICB9O1xuXG4gICAgdGhpcy5hdXRvT3V0ZGVudCA9IGZ1bmN0aW9uKGRvYywgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gZG9jLmdldExpbmUocm93KTtcbiAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCgvXihcXHMqXFx9KS8pO1xuXG4gICAgICAgIGlmICghbWF0Y2gpIHJldHVybiAwO1xuXG4gICAgICAgIHZhciBjb2x1bW4gPSBtYXRjaFsxXS5sZW5ndGg7XG4gICAgICAgIHZhciBvcGVuQnJhY2VQb3MgPSBkb2MuZmluZE1hdGNoaW5nQnJhY2tldCh7cm93OiByb3csIGNvbHVtbjogY29sdW1ufSk7XG5cbiAgICAgICAgaWYgKCFvcGVuQnJhY2VQb3MgfHwgb3BlbkJyYWNlUG9zLnJvdyA9PSByb3cpIHJldHVybiAwO1xuXG4gICAgICAgIHZhciBpbmRlbnQgPSB0aGlzLiRnZXRJbmRlbnQoZG9jLmdldExpbmUob3BlbkJyYWNlUG9zLnJvdykpO1xuICAgICAgICBkb2MucmVwbGFjZShuZXcgUmFuZ2Uocm93LCAwLCByb3csIGNvbHVtbi0xKSwgaW5kZW50KTtcbiAgICB9O1xuXG4gICAgdGhpcy4kZ2V0SW5kZW50ID0gZnVuY3Rpb24obGluZSkge1xuICAgICAgICByZXR1cm4gbGluZS5tYXRjaCgvXlxccyovKVswXTtcbiAgICB9O1xuXG59KS5jYWxsKE1hdGNoaW5nQnJhY2VPdXRkZW50LnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTWF0Y2hpbmdCcmFjZU91dGRlbnQgPSBNYXRjaGluZ0JyYWNlT3V0ZGVudDtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==