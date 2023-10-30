"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[1442],{

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

/***/ 48636:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var BaseFoldMode = (__webpack_require__(15369).FoldMode);
var Range = (__webpack_require__(59082)/* .Range */ .e);
var TokenIterator = (__webpack_require__(39216)/* .TokenIterator */ .N);


var FoldMode = exports.Z = function () {
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

/***/ 94629:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var TextMode = (__webpack_require__(98030).Mode);
var LessHighlightRules = (__webpack_require__(16761)/* .LessHighlightRules */ .q);
var MatchingBraceOutdent = (__webpack_require__(1164).MatchingBraceOutdent);
var CssBehaviour = (__webpack_require__(47853)/* .CssBehaviour */ .K);
var CssCompletions = (__webpack_require__(37237)/* .CssCompletions */ .A);

var CStyleFoldMode = (__webpack_require__(12764)/* .FoldMode */ .Z);

var Mode = function() {
    this.HighlightRules = LessHighlightRules;
    this.$outdent = new MatchingBraceOutdent();
    this.$behaviour = new CssBehaviour();
    this.$completer = new CssCompletions();
    this.foldingRules = new CStyleFoldMode();
};
oop.inherits(Mode, TextMode);

(function() {

    this.lineCommentStart = "//";
    this.blockComment = {start: "/*", end: "*/"};
    
    this.getNextLineIndent = function(state, line, tab) {
        var indent = this.$getIndent(line);

        // ignore braces in comments
        var tokens = this.getTokenizer().getLineTokens(line, state).tokens;
        if (tokens.length && tokens[tokens.length-1].type == "comment") {
            return indent;
        }

        var match = line.match(/^.*\{\s*$/);
        if (match) {
            indent += tab;
        }

        return indent;
    };

    this.checkOutdent = function(state, line, input) {
        return this.$outdent.checkOutdent(line, input);
    };

    this.autoOutdent = function(state, doc, row) {
        this.$outdent.autoOutdent(doc, row);
    };

    this.getCompletions = function(state, session, pos, prefix) {
        // CSS completions only work with single (not nested) rulesets
        return this.$completer.getCompletions("ruleset", session, pos, prefix);
    };

    this.$id = "ace/mode/less";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 16761:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var TextHighlightRules = (__webpack_require__(28053)/* .TextHighlightRules */ .K);
var CssHighlightRules = __webpack_require__(99301);

var LessHighlightRules = function() {


    var keywordList = "@import|@media|@font-face|@keyframes|@-webkit-keyframes|@supports|" + 
        "@charset|@plugin|@namespace|@document|@page|@viewport|@-ms-viewport|" +
        "or|and|when|not";

    var keywords = keywordList.split('|');

    var properties = CssHighlightRules.supportType.split('|');

    var keywordMapper = this.createKeywordMapper({
        "support.constant": CssHighlightRules.supportConstant,
        "keyword": keywordList,
        "support.constant.color": CssHighlightRules.supportConstantColor,
        "support.constant.fonts": CssHighlightRules.supportConstantFonts
    }, "identifier", true);   

    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used

    var numRe = "\\-?(?:(?:[0-9]+)|(?:[0-9]*\\.[0-9]+))";

    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used

    this.$rules = {
        "start" : [
            {
                token : "comment",
                regex : "\\/\\/.*$"
            },
            {
                token : "comment", // multi line comment
                regex : "\\/\\*",
                next : "comment"
            }, {
                token : "string", // single line
                regex : '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'
            }, {
                token : "string", // single line
                regex : "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"
            }, {
                token : ["constant.numeric", "keyword"],
                regex : "(" + numRe + ")(ch|cm|deg|em|ex|fr|gd|grad|Hz|in|kHz|mm|ms|pc|pt|px|rad|rem|s|turn|vh|vm|vw|%)"
            }, {
                token : "constant.numeric", // hex6 color
                regex : "#[a-f0-9]{6}"
            }, {
                token : "constant.numeric", // hex3 color
                regex : "#[a-f0-9]{3}"
            }, {
                token : "constant.numeric",
                regex : numRe
            }, {
                token : ["support.function", "paren.lparen", "string", "paren.rparen"],
                regex : "(url)(\\()(.*)(\\))"
            }, {
                token : ["support.function", "paren.lparen"],
                regex : "(:extend|[a-z0-9_\\-]+)(\\()"
            }, {
                token : function(value) {
                    if (keywords.indexOf(value.toLowerCase()) > -1)
                        return "keyword";
                    else
                        return "variable";
                },
                regex : "[@\\$][a-z0-9_\\-@\\$]*\\b"
            }, {
                token : "variable",
                regex : "[@\\$]\\{[a-z0-9_\\-@\\$]*\\}"
            }, {
                token : function(first, second) {
                    if(properties.indexOf(first.toLowerCase()) > -1) {
                        return ["support.type.property", "text"];
                    }
                    else {
                        return ["support.type.unknownProperty", "text"];
                    }
                },
                regex : "([a-z0-9-_]+)(\\s*:)"
            }, {
                token : "keyword",
                regex : "&"   // special case - always treat as keyword
            }, {
                token : keywordMapper,
                regex : "\\-?[@a-z_][@a-z0-9_\\-]*"
            }, {
                token: "variable.language",
                regex: "#[a-z0-9-_]+"
            }, {
                token: "variable.language",
                regex: "\\.[a-z0-9-_]+"
            }, {
                token: "variable.language",
                regex: ":[a-z_][a-z0-9-_]*"
            }, {
                token: "constant",
                regex: "[a-z0-9-_]+"
            }, {
                token : "keyword.operator",
                regex : "<|>|<=|>=|=|!=|-|%|\\+|\\*"
            }, {
                token : "paren.lparen",
                regex : "[[({]"
            }, {
                token : "paren.rparen",
                regex : "[\\])}]"
            }, {
                token : "text",
                regex : "\\s+"
            }, {
                caseInsensitive: true
            }
        ],
        "comment" : [
            {
                token : "comment", // closing comment
                regex : "\\*\\/",
                next : "start"
            }, {
                defaultToken : "comment"
            }
        ]
    };
    this.normalizeRules();
};

oop.inherits(LessHighlightRules, TextHighlightRules);

exports.q = LessHighlightRules;


/***/ }),

/***/ 45433:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var TextMode = (__webpack_require__(98030).Mode);
var RubyHighlightRules = (__webpack_require__(35772).RubyHighlightRules);
var MatchingBraceOutdent = (__webpack_require__(1164).MatchingBraceOutdent);
var Range = (__webpack_require__(59082)/* .Range */ .e);
var FoldMode = (__webpack_require__(48636)/* .FoldMode */ .Z);

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


/***/ }),

/***/ 79736:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var TextMode = (__webpack_require__(98030).Mode);
var SassHighlightRules = (__webpack_require__(32475)/* .SassHighlightRules */ .o);
var FoldMode = (__webpack_require__(35090)/* .FoldMode */ .Z);

var Mode = function() {
    this.HighlightRules = SassHighlightRules;
    this.foldingRules = new FoldMode();
    this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, TextMode);

(function() {   
    this.lineCommentStart = "//";
    this.$id = "ace/mode/sass";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 32475:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var lang = __webpack_require__(20124);
var ScssHighlightRules = (__webpack_require__(71690)/* .ScssHighlightRules */ .m);

var SassHighlightRules = function() {
    ScssHighlightRules.call(this);
    var start = this.$rules.start;
    if (start[1].token == "comment") {
        start.splice(1, 1, {
            onMatch: function(value, currentState, stack) {
                stack.unshift(this.next, -1, value.length - 2, currentState);
                return "comment";
            },
            regex: /^\s*\/\*/,
            next: "comment"
        }, {
            token: "error.invalid",
            regex: "/\\*|[{;}]"
        }, {
            token: "support.type",
            regex: /^\s*:[\w\-]+\s/
        });
        
        this.$rules.comment = [
            {regex: /^\s*/, onMatch: function(value, currentState, stack) {
                if (stack[1] === -1)
                    stack[1] = Math.max(stack[2], value.length - 1);
                if (value.length <= stack[1]) {
                    /*shift3x*/stack.shift();stack.shift();stack.shift();
                    this.next = stack.shift();
                    return "text";
                } else {
                    this.next = "";
                    return "comment";
                }
            }, next: "start"},
            {defaultToken: "comment"}
        ];
    }
};

oop.inherits(SassHighlightRules, ScssHighlightRules);

exports.o = SassHighlightRules;


/***/ }),

/***/ 36852:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var TextMode = (__webpack_require__(98030).Mode);
var ScssHighlightRules = (__webpack_require__(71690)/* .ScssHighlightRules */ .m);
var MatchingBraceOutdent = (__webpack_require__(1164).MatchingBraceOutdent);
var CssBehaviour = (__webpack_require__(47853)/* .CssBehaviour */ .K);
var CStyleFoldMode = (__webpack_require__(12764)/* .FoldMode */ .Z);
var CssCompletions = (__webpack_require__(37237)/* .CssCompletions */ .A);


var Mode = function() {
    this.HighlightRules = ScssHighlightRules;
    this.$outdent = new MatchingBraceOutdent();
    this.$behaviour = new CssBehaviour();
    this.$completer = new CssCompletions();
    this.foldingRules = new CStyleFoldMode();
};
oop.inherits(Mode, TextMode);

(function() {
   
    this.lineCommentStart = "//";
    this.blockComment = {start: "/*", end: "*/"};

    this.getNextLineIndent = function(state, line, tab) {
        var indent = this.$getIndent(line);

        // ignore braces in comments
        var tokens = this.getTokenizer().getLineTokens(line, state).tokens;
        if (tokens.length && tokens[tokens.length-1].type == "comment") {
            return indent;
        }

        var match = line.match(/^.*\{\s*$/);
        if (match) {
            indent += tab;
        }

        return indent;
    };

    this.checkOutdent = function(state, line, input) {
        return this.$outdent.checkOutdent(line, input);
    };

    this.autoOutdent = function(state, doc, row) {
        this.$outdent.autoOutdent(doc, row);
    };
    
    this.getCompletions = function(state, session, pos, prefix) {
        return this.$completer.getCompletions(state, session, pos, prefix);
    };


    this.$id = "ace/mode/scss";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 71690:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var lang = __webpack_require__(20124);
var TextHighlightRules = (__webpack_require__(28053)/* .TextHighlightRules */ .K);
var CssHighlightRules = __webpack_require__(99301);

var ScssHighlightRules = function() {
    
    var properties = lang.arrayToMap(CssHighlightRules.supportType.split("|"));

    var functions = lang.arrayToMap(
        ("hsl|hsla|rgb|rgba|url|attr|counter|counters|abs|adjust_color|adjust_hue|" +
         "alpha|join|blue|ceil|change_color|comparable|complement|darken|desaturate|" + 
         "floor|grayscale|green|hue|if|invert|join|length|lighten|lightness|mix|" + 
         "nth|opacify|opacity|percentage|quote|red|round|saturate|saturation|" +
         "scale_color|transparentize|type_of|unit|unitless|unquote").split("|")
    );

    var constants = lang.arrayToMap(CssHighlightRules.supportConstant.split("|"));

    var colors = lang.arrayToMap(CssHighlightRules.supportConstantColor.split("|"));
    
    var keywords = lang.arrayToMap(
        ("@mixin|@extend|@include|@import|@media|@debug|@warn|@if|@for|@each|@while|@else|@font-face|@-webkit-keyframes|if|and|!default|module|def|end|declare").split("|")
    );
    
    var tags = lang.arrayToMap(
        ("a|abbr|acronym|address|applet|area|article|aside|audio|b|base|basefont|bdo|" + 
         "big|blockquote|body|br|button|canvas|caption|center|cite|code|col|colgroup|" + 
         "command|datalist|dd|del|details|dfn|dir|div|dl|dt|em|embed|fieldset|" + 
         "figcaption|figure|font|footer|form|frame|frameset|h1|h2|h3|h4|h5|h6|head|" + 
         "header|hgroup|hr|html|i|iframe|img|input|ins|keygen|kbd|label|legend|li|" + 
         "link|map|mark|menu|meta|meter|nav|noframes|noscript|object|ol|optgroup|" + 
         "option|output|p|param|pre|progress|q|rp|rt|ruby|s|samp|script|section|select|" + 
         "small|source|span|strike|strong|style|sub|summary|sup|table|tbody|td|" + 
         "textarea|tfoot|th|thead|time|title|tr|tt|u|ul|var|video|wbr|xmp").split("|")
    );

    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used

    var numRe = "\\-?(?:(?:[0-9]+)|(?:[0-9]*\\.[0-9]+))";

    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used

    this.$rules = {
        "start" : [
            {
                token : "comment",
                regex : "\\/\\/.*$"
            },
            {
                token : "comment", // multi line comment
                regex : "\\/\\*",
                next : "comment"
            }, {
                token : "string", // single line
                regex : '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'
            }, {
                token : "string", // multi line string start
                regex : '["].*\\\\$',
                next : "qqstring"
            }, {
                token : "string", // single line
                regex : "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"
            }, {
                token : "string", // multi line string start
                regex : "['].*\\\\$",
                next : "qstring"
            }, {
                token : "constant.numeric",
                regex : numRe + "(?:ch|cm|deg|em|ex|fr|gd|grad|Hz|in|kHz|mm|ms|pc|pt|px|rad|rem|s|turn|vh|vmax|vmin|vm|vw|%)"
            }, {
                token : "constant.numeric", // hex6 color
                regex : "#[a-f0-9]{6}"
            }, {
                token : "constant.numeric", // hex3 color
                regex : "#[a-f0-9]{3}"
            }, {
                token : "constant.numeric",
                regex : numRe
            }, {
                token : ["support.function", "string", "support.function"],
                regex : "(url\\()(.*)(\\))"
            }, {
                token : function(value) {
                    if (properties.hasOwnProperty(value.toLowerCase()))
                        return "support.type";
                    if (keywords.hasOwnProperty(value))
                        return "keyword";
                    else if (constants.hasOwnProperty(value))
                        return "constant.language";
                    else if (functions.hasOwnProperty(value))
                        return "support.function";
                    else if (colors.hasOwnProperty(value.toLowerCase()))
                        return "support.constant.color";
                    else if (tags.hasOwnProperty(value.toLowerCase()))
                        return "variable.language";
                    else
                        return "text";
                },
                regex : "\\-?[@a-z_][@a-z0-9_\\-]*"
            }, {
                token : "variable",
                regex : "[a-z_\\-$][a-z0-9_\\-$]*\\b"
            }, {
                token: "variable.language",
                regex: "#[a-z0-9-_]+"
            }, {
                token: "variable.language",
                regex: "\\.[a-z0-9-_]+"
            }, {
                token: "variable.language",
                regex: ":[a-z0-9-_]+"
            }, {
                token: "constant",
                regex: "[a-z0-9-_]+"
            }, {
                token : "keyword.operator",
                regex : "<|>|<=|>=|==|!=|-|%|#|\\+|\\$|\\+|\\*"
            }, {
                token : "paren.lparen",
                regex : "[[({]"
            }, {
                token : "paren.rparen",
                regex : "[\\])}]"
            }, {
                token : "text",
                regex : "\\s+"
            }, {
                caseInsensitive: true
            }
        ],
        "comment" : [
            {
                token : "comment", // closing comment
                regex : "\\*\\/",
                next : "start"
            }, {
                defaultToken : "comment"
            }
        ],
        "qqstring" : [
            {
                token : "string",
                regex : '(?:(?:\\\\.)|(?:[^"\\\\]))*?"',
                next : "start"
            }, {
                token : "string",
                regex : '.+'
            }
        ],
        "qstring" : [
            {
                token : "string",
                regex : "(?:(?:\\\\.)|(?:[^'\\\\]))*?'",
                next : "start"
            }, {
                token : "string",
                regex : '.+'
            }
        ]
    };
};

oop.inherits(ScssHighlightRules, TextHighlightRules);

exports.m = ScssHighlightRules;


/***/ }),

/***/ 81442:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var TextMode = (__webpack_require__(98030).Mode);
var SlimHighlightRules = (__webpack_require__(36862)/* .SlimHighlightRules */ .T);

var Mode = function() {
    TextMode.call(this);
    this.HighlightRules = SlimHighlightRules;
    this.createModeDelegates({
        javascript: (__webpack_require__(88057).Mode),
        markdown: (__webpack_require__(80259).Mode),
        coffee: (__webpack_require__(46725).Mode),
        scss: (__webpack_require__(36852).Mode),
        sass: (__webpack_require__(79736).Mode),
        less: (__webpack_require__(94629).Mode),
        ruby: (__webpack_require__(45433).Mode),
        css: (__webpack_require__(98771).Mode)
    });
};

oop.inherits(Mode, TextMode);

(function() {

    this.$id = "ace/mode/slim";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 36862:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var modes = (__webpack_require__(13188).$modes);

var oop = __webpack_require__(89359);
var TextHighlightRules = (__webpack_require__(28053)/* .TextHighlightRules */ .K);
var SlimHighlightRules = function() {

    this.$rules = {
        "start": [
            {
                token: "keyword",
                regex: /^(\s*)(\w+):\s*/,
                onMatch: function(value, state, stack, line) {
                    var indent = /^\s*/.exec(line)[0];
                    var m = value.match(/^(\s*)(\w+):/);
                    var language = m[2];
                    if (!/^(javascript|ruby|coffee|markdown|css|scss|sass|less)$/.test(language))
                        language = "";
                    stack.unshift("language-embed", [], [indent, language], state);
                    return this.token;
                },
                stateName: "language-embed",
                next: [{
                    token: "string",
                    regex: /^(\s*)/,
                    onMatch: function(value, state, stack, line) {
                        var indent = stack[2][0];
                        if (indent.length >= value.length) {
                            stack.splice(0, 3);
                            this.next = stack.shift();
                            return this.token;
                        }
                        this.next = "";
                        return [{type: "text", value: indent}];
                    },
                    next: ""
                }, {
                    token: "string",
                    regex: /.+/,
                    onMatch: function(value, state, stack, line) {
                        var indent = stack[2][0];
                        var language = stack[2][1];
                        var embedState = stack[1];
                        
                        if (modes[language]) {
                            var data = modes[language].getTokenizer().getLineTokens(line.slice(indent.length), embedState.slice(0));
                            stack[1] = data.state;
                            return data.tokens;
                        }
                        return this.token;
                    }
                }]
            },
            {
                token: 'constant.begin.javascript.filter.slim',
                regex: '^(\\s*)():$'
            }, {
                token: 'constant.begin..filter.slim',
                regex: '^(\\s*)(ruby):$'
            }, {
                token: 'constant.begin.coffeescript.filter.slim',
                regex: '^(\\s*)():$'
            }, {
                token: 'constant.begin..filter.slim',
                regex: '^(\\s*)(markdown):$'
            }, {
                token: 'constant.begin.css.filter.slim',
                regex: '^(\\s*)():$'
            }, {
                token: 'constant.begin.scss.filter.slim',
                regex: '^(\\s*)():$'
            }, {
                token: 'constant.begin..filter.slim',
                regex: '^(\\s*)(sass):$'
            }, {
                token: 'constant.begin..filter.slim',
                regex: '^(\\s*)(less):$'
            }, {
                token: 'constant.begin..filter.slim',
                regex: '^(\\s*)(erb):$'
            }, {
                token: 'keyword.html.tags.slim',
                regex: '^(\\s*)((:?\\*(\\w)+)|doctype html|abbr|acronym|address|applet|area|article|aside|audio|base|basefont|bdo|big|blockquote|body|br|button|canvas|caption|center|cite|code|col|colgroup|command|datalist|dd|del|details|dialog|dfn|dir|div|dl|dt|embed|fieldset|figure|font|footer|form|frame|frameset|h1|h2|h3|h4|h5|h6|head|header|hgroup|hr|html|i|iframe|img|input|ins|keygen|kbd|label|legend|link|li|map|mark|menu|meta|meter|nav|noframes|noscript|object|ol|optgroup|option|output|p|param|pre|progress|q|rp|rt|ruby|samp|script|section|select|small|source|span|strike|strong|style|sub|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|tt|ul|var|video|xmp|b|u|s|em|a)(?:([.#](\\w|\\.)+)+\\s?)?\\b'

            }, {
                token: 'keyword.slim',
                regex: '^(\\s*)(?:([.#](\\w|\\.)+)+\\s?)'
            }, {
                token: "string",
                regex: /^(\s*)('|\||\/|(\/!))\s*/,
                onMatch: function(val, state, stack, line) {
                    var indent = /^\s*/.exec(line)[0];
                    if (stack.length < 1) {
                        stack.push(this.next);
                    }
                    else {
                        stack[0] = "mlString";
                    }

                    if (stack.length < 2) {
                        stack.push(indent.length);
                    }
                    else {
                        stack[1] = indent.length;
                    }
                    return this.token;
                },
                next: "mlString"
            }, {
                token: 'keyword.control.slim',
                regex: '^(\\s*)(\\-|==|=)',
                push: [{
                    token: 'control.end.slim',
                    regex: '$',
                    next: "pop"
                }, {
                    include: "rubyline"
                }, {
                    include: "misc"
                }]

            }, {
                token: 'paren',
                regex: '\\(',
                push: [{
                    token: 'paren',
                    regex: '\\)',
                    next: "pop"
                }, {
                    include: "misc"
                }]

            }, {
                token: 'paren',
                regex: '\\[',
                push: [{
                    token: 'paren',
                    regex: '\\]',
                    next: "pop"
                }, {
                    include: "misc"
                }]
            }, {
                include: "misc"
            }
        ],
        "mlString": [{
            token: "indent",
            regex: /^\s*/,
            onMatch: function(val, state, stack) {
                var curIndent = stack[1];

                if (curIndent >= val.length) {
                    this.next = "start";
                    stack.splice(0);
                }
                else {
                    this.next = "mlString";
                }
                return this.token;
            },
            next: "start"
        }, {
            defaultToken: "string"
        }],
        "rubyline": [{
            token: "keyword.operator.ruby.embedded.slim",
            regex: "(==|=)(<>|><|<'|'<|<|>)?|-"
        }, {
            token: "list.ruby.operators.slim",
            regex: "(\\b)(for|in|do|if|else|elsif|unless|while|yield|not|and|or)\\b"
        }, {
            token: "string",
            regex: "['](.)*?[']"
        }, {
            token: "string",
            regex: "[\"](.)*?[\"]"
        }],
        "misc": [{
            token: 'class.variable.slim',
            regex: '\\@([a-zA-Z_][a-zA-Z0-9_]*)\\b'
        }, {
            token: "list.meta.slim",
            regex: "(\\b)(true|false|nil)(\\b)"
        }, {
            token: 'keyword.operator.equals.slim',
            regex: '='
        }, {
            token: "string",
            regex: "['](.)*?[']"
        }, {
            token: "string",
            regex: "[\"](.)*?[\"]"
        }]
    };
    this.normalizeRules();
};


oop.inherits(SlimHighlightRules, TextHighlightRules);

exports.T = SlimHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQSxTQUEwQiIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvY29mZmVlLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvY29mZmVlX2hpZ2hsaWdodF9ydWxlcy5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2ZvbGRpbmcvY29mZmVlLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvZm9sZGluZy9ydWJ5LmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvbGVzcy5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2xlc3NfaGlnaGxpZ2h0X3J1bGVzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvcnVieS5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL3Nhc3MuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9zYXNzX2hpZ2hsaWdodF9ydWxlcy5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL3Njc3MuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9zY3NzX2hpZ2hsaWdodF9ydWxlcy5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL3NsaW0uanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9zbGltX2hpZ2hsaWdodF9ydWxlcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIFJ1bGVzID0gcmVxdWlyZShcIi4vY29mZmVlX2hpZ2hsaWdodF9ydWxlc1wiKS5Db2ZmZWVIaWdobGlnaHRSdWxlcztcbnZhciBPdXRkZW50ID0gcmVxdWlyZShcIi4vbWF0Y2hpbmdfYnJhY2Vfb3V0ZGVudFwiKS5NYXRjaGluZ0JyYWNlT3V0ZGVudDtcbnZhciBGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRpbmcvY29mZmVlXCIpLkZvbGRNb2RlO1xudmFyIFJhbmdlID0gcmVxdWlyZShcIi4uL3JhbmdlXCIpLlJhbmdlO1xudmFyIFRleHRNb2RlID0gcmVxdWlyZShcIi4vdGV4dFwiKS5Nb2RlO1xudmFyIFdvcmtlckNsaWVudCA9IHJlcXVpcmUoXCIuLi93b3JrZXIvd29ya2VyX2NsaWVudFwiKS5Xb3JrZXJDbGllbnQ7XG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG5cbmZ1bmN0aW9uIE1vZGUoKSB7XG4gICAgdGhpcy5IaWdobGlnaHRSdWxlcyA9IFJ1bGVzO1xuICAgIHRoaXMuJG91dGRlbnQgPSBuZXcgT3V0ZGVudCgpO1xuICAgIHRoaXMuZm9sZGluZ1J1bGVzID0gbmV3IEZvbGRNb2RlKCk7XG59XG5cbm9vcC5pbmhlcml0cyhNb2RlLCBUZXh0TW9kZSk7XG5cbihmdW5jdGlvbigpIHtcbiAgICBcbiAgICAvKjpcbiAgICAgIFsoe1s9Ol0gICAgICAgICMgT3BlbmluZyBwYXJlbnRoZXNlcyBvciBicmFja2V0c1xuICAgICB8Wy09XT4gICAgICAgICAgIyBPUiBzaW5nbGUgb3IgZG91YmxlIGFycm93XG4gICAgIHxcXGIoPzogICAgICAgICAgIyBPUiBvbmUgb2YgdGhlc2Ugd29yZHM6XG4gICAgICAgZWxzZSAgICAgICAgICAjICAgIGVsc2VcbiAgICAgIHx0cnkgICAgICAgICAgICMgT1IgdHJ5XG4gICAgICB8KD86c3dpfGNhKXRjaCAjIE9SIGNhdGNoLCBvcHRpb25hbGx5IGZvbGxvd2VkIGJ5OlxuICAgICAgICAoPzpcXHMqWyRBLVphLXpfXFx4N2YtXFx1ZmZmZl1bJFxcd1xceDdmLVxcdWZmZmZdKik/ICAjIGEgdmFyaWFibGVcbiAgICAgIHxmaW5hbGx5ICAgICAgICMgT1IgZmluYWxseVxuICAgICApKVxccyokICAgICAgICAgICMgYWxsIGFzIHRoZSBsYXN0IHRoaW5nIG9uIGEgbGluZSAoYWxsb3dpbmcgdHJhaWxpbmcgc3BhY2UpXG4gICAgfCAgICAgICAgICAgICAgICAjIC0tLS0gT1IgLS0tLSA6XG4gICAgXlxccyogICAgICAgICAgICAgIyBhIGxpbmUgc3RhcnRpbmcgd2l0aCBvcHRpb25hbCBzcGFjZVxuICAgIChlbHNlXFxiXFxzKik/ICAgICAjIGZvbGxvd2VkIGJ5IGFuIG9wdGlvbmFsIFwiZWxzZVwiXG4gICAgKD86ICAgICAgICAgICAgICAjIGZvbGxvd2VkIGJ5IG9uZSBvZiB0aGUgZm9sbG93aW5nOlxuICAgICAgIGlmICAgICAgICAgICAgIyAgICBpZlxuICAgICAgfGZvciAgICAgICAgICAgIyBPUiBmb3JcbiAgICAgIHx3aGlsZSAgICAgICAgICMgT1Igd2hpbGVcbiAgICAgIHxsb29wICAgICAgICAgICMgT1IgbG9vcFxuICAgIClcXGIgICAgICAgICAgICAgICMgICAgKGFzIGEgd29yZClcbiAgICAoPyEuKlxcYnRoZW5cXGIpICAgIyAuLi4gYnV0IE5PVCBmb2xsb3dlZCBieSBcInRoZW5cIiBvbiB0aGUgbGluZVxuICAgICovXG4gICAgdmFyIGluZGVudGVyID0gLyg/Olsoe1s9Ol18Wy09XT58XFxiKD86ZWxzZXx0cnl8KD86c3dpfGNhKXRjaCg/OlxccytbJEEtWmEtel9cXHg3Zi1cXHVmZmZmXVskXFx3XFx4N2YtXFx1ZmZmZl0qKT98ZmluYWxseSkpXFxzKiR8XlxccyooZWxzZVxcYlxccyopPyg/OmlmfGZvcnx3aGlsZXxsb29wKVxcYig/IS4qXFxidGhlblxcYikvO1xuICAgIFxuICAgIHRoaXMubGluZUNvbW1lbnRTdGFydCA9IFwiI1wiO1xuICAgIHRoaXMuYmxvY2tDb21tZW50ID0ge3N0YXJ0OiBcIiMjI1wiLCBlbmQ6IFwiIyMjXCJ9O1xuICAgIFxuICAgIHRoaXMuZ2V0TmV4dExpbmVJbmRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgbGluZSwgdGFiKSB7XG4gICAgICAgIHZhciBpbmRlbnQgPSB0aGlzLiRnZXRJbmRlbnQobGluZSk7XG4gICAgICAgIHZhciB0b2tlbnMgPSB0aGlzLmdldFRva2VuaXplcigpLmdldExpbmVUb2tlbnMobGluZSwgc3RhdGUpLnRva2VucztcbiAgICBcbiAgICAgICAgaWYgKCEodG9rZW5zLmxlbmd0aCAmJiB0b2tlbnNbdG9rZW5zLmxlbmd0aCAtIDFdLnR5cGUgPT09ICdjb21tZW50JykgJiZcbiAgICAgICAgICAgIHN0YXRlID09PSAnc3RhcnQnICYmIGluZGVudGVyLnRlc3QobGluZSkpXG4gICAgICAgICAgICBpbmRlbnQgKz0gdGFiO1xuICAgICAgICByZXR1cm4gaW5kZW50O1xuICAgIH07XG4gICAgXG4gICAgdGhpcy5jaGVja091dGRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgbGluZSwgaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJG91dGRlbnQuY2hlY2tPdXRkZW50KGxpbmUsIGlucHV0KTtcbiAgICB9O1xuICAgIFxuICAgIHRoaXMuYXV0b091dGRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgZG9jLCByb3cpIHtcbiAgICAgICAgdGhpcy4kb3V0ZGVudC5hdXRvT3V0ZGVudChkb2MsIHJvdyk7XG4gICAgfTtcbiAgICBcbiAgICB0aGlzLmNyZWF0ZVdvcmtlciA9IGZ1bmN0aW9uKHNlc3Npb24pIHtcbiAgICAgICAgdmFyIHdvcmtlciA9IG5ldyBXb3JrZXJDbGllbnQoW1wiYWNlXCJdLCBcImFjZS9tb2RlL2NvZmZlZV93b3JrZXJcIiwgXCJXb3JrZXJcIik7XG4gICAgICAgIHdvcmtlci5hdHRhY2hUb0RvY3VtZW50KHNlc3Npb24uZ2V0RG9jdW1lbnQoKSk7XG4gICAgICAgIFxuICAgICAgICB3b3JrZXIub24oXCJhbm5vdGF0ZVwiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBzZXNzaW9uLnNldEFubm90YXRpb25zKGUuZGF0YSk7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgd29ya2VyLm9uKFwidGVybWluYXRlXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2Vzc2lvbi5jbGVhckFubm90YXRpb25zKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHdvcmtlcjtcbiAgICB9O1xuXG4gICAgdGhpcy4kaWQgPSBcImFjZS9tb2RlL2NvZmZlZVwiO1xuICAgIHRoaXMuc25pcHBldEZpbGVJZCA9IFwiYWNlL3NuaXBwZXRzL2NvZmZlZVwiO1xufSkuY2FsbChNb2RlLnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTW9kZSA9IE1vZGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuICAgIHZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbiAgICB2YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xuXG4gICAgb29wLmluaGVyaXRzKENvZmZlZUhpZ2hsaWdodFJ1bGVzLCBUZXh0SGlnaGxpZ2h0UnVsZXMpO1xuXG4gICAgZnVuY3Rpb24gQ29mZmVlSGlnaGxpZ2h0UnVsZXMoKSB7XG4gICAgICAgIHZhciBpZGVudGlmaWVyID0gXCJbJEEtWmEtel9cXFxceDdmLVxcXFx1ZmZmZl1bJFxcXFx3XFxcXHg3Zi1cXFxcdWZmZmZdKlwiO1xuXG4gICAgICAgIHZhciBrZXl3b3JkcyA9IChcbiAgICAgICAgICAgIFwidGhpc3x0aHJvd3x0aGVufHRyeXx0eXBlb2Z8c3VwZXJ8c3dpdGNofHJldHVybnxicmVha3xieXxjb250aW51ZXxcIiArXG4gICAgICAgICAgICBcImNhdGNofGNsYXNzfGlufGluc3RhbmNlb2Z8aXN8aXNudHxpZnxlbHNlfGV4dGVuZHN8Zm9yfG93bnxcIiArXG4gICAgICAgICAgICBcImZpbmFsbHl8ZnVuY3Rpb258d2hpbGV8d2hlbnxuZXd8bm98bm90fGRlbGV0ZXxkZWJ1Z2dlcnxkb3xsb29wfG9mfG9mZnxcIiArXG4gICAgICAgICAgICBcIm9yfG9ufHVubGVzc3x1bnRpbHxhbmR8eWVzfHlpZWxkfGV4cG9ydHxpbXBvcnR8ZGVmYXVsdFwiXG4gICAgICAgICk7XG5cbiAgICAgICAgdmFyIGxhbmdDb25zdGFudCA9IChcbiAgICAgICAgICAgIFwidHJ1ZXxmYWxzZXxudWxsfHVuZGVmaW5lZHxOYU58SW5maW5pdHlcIlxuICAgICAgICApO1xuXG4gICAgICAgIHZhciBpbGxlZ2FsID0gKFxuICAgICAgICAgICAgXCJjYXNlfGNvbnN0fGZ1bmN0aW9ufHZhcnx2b2lkfHdpdGh8ZW51bXxpbXBsZW1lbnRzfFwiICtcbiAgICAgICAgICAgIFwiaW50ZXJmYWNlfGxldHxwYWNrYWdlfHByaXZhdGV8cHJvdGVjdGVkfHB1YmxpY3xzdGF0aWNcIlxuICAgICAgICApO1xuXG4gICAgICAgIHZhciBzdXBwb3J0Q2xhc3MgPSAoXG4gICAgICAgICAgICBcIkFycmF5fEJvb2xlYW58RGF0ZXxGdW5jdGlvbnxOdW1iZXJ8T2JqZWN0fFJlZ0V4cHxSZWZlcmVuY2VFcnJvcnxTdHJpbmd8XCIgK1xuICAgICAgICAgICAgXCJFcnJvcnxFdmFsRXJyb3J8SW50ZXJuYWxFcnJvcnxSYW5nZUVycm9yfFJlZmVyZW5jZUVycm9yfFN0b3BJdGVyYXRpb258XCIgK1xuICAgICAgICAgICAgXCJTeW50YXhFcnJvcnxUeXBlRXJyb3J8VVJJRXJyb3J8XCIgICtcbiAgICAgICAgICAgIFwiQXJyYXlCdWZmZXJ8RmxvYXQzMkFycmF5fEZsb2F0NjRBcnJheXxJbnQxNkFycmF5fEludDMyQXJyYXl8SW50OEFycmF5fFwiICtcbiAgICAgICAgICAgIFwiVWludDE2QXJyYXl8VWludDMyQXJyYXl8VWludDhBcnJheXxVaW50OENsYW1wZWRBcnJheVwiXG4gICAgICAgICk7XG5cbiAgICAgICAgdmFyIHN1cHBvcnRGdW5jdGlvbiA9IChcbiAgICAgICAgICAgIFwiTWF0aHxKU09OfGlzTmFOfGlzRmluaXRlfHBhcnNlSW50fHBhcnNlRmxvYXR8ZW5jb2RlVVJJfFwiICtcbiAgICAgICAgICAgIFwiZW5jb2RlVVJJQ29tcG9uZW50fGRlY29kZVVSSXxkZWNvZGVVUklDb21wb25lbnR8U3RyaW5nfFwiXG4gICAgICAgICk7XG5cbiAgICAgICAgdmFyIHZhcmlhYmxlTGFuZ3VhZ2UgPSAoXG4gICAgICAgICAgICBcIndpbmRvd3xhcmd1bWVudHN8cHJvdG90eXBlfGRvY3VtZW50XCJcbiAgICAgICAgKTtcblxuICAgICAgICB2YXIga2V5d29yZE1hcHBlciA9IHRoaXMuY3JlYXRlS2V5d29yZE1hcHBlcih7XG4gICAgICAgICAgICBcImtleXdvcmRcIjoga2V5d29yZHMsXG4gICAgICAgICAgICBcImNvbnN0YW50Lmxhbmd1YWdlXCI6IGxhbmdDb25zdGFudCxcbiAgICAgICAgICAgIFwiaW52YWxpZC5pbGxlZ2FsXCI6IGlsbGVnYWwsXG4gICAgICAgICAgICBcImxhbmd1YWdlLnN1cHBvcnQuY2xhc3NcIjogc3VwcG9ydENsYXNzLFxuICAgICAgICAgICAgXCJsYW5ndWFnZS5zdXBwb3J0LmZ1bmN0aW9uXCI6IHN1cHBvcnRGdW5jdGlvbixcbiAgICAgICAgICAgIFwidmFyaWFibGUubGFuZ3VhZ2VcIjogdmFyaWFibGVMYW5ndWFnZVxuICAgICAgICB9LCBcImlkZW50aWZpZXJcIik7XG5cbiAgICAgICAgdmFyIGZ1bmN0aW9uUnVsZSA9IHtcbiAgICAgICAgICAgIHRva2VuOiBbXCJwYXJlbi5scGFyZW5cIiwgXCJ2YXJpYWJsZS5wYXJhbWV0ZXJcIiwgXCJwYXJlbi5ycGFyZW5cIiwgXCJ0ZXh0XCIsIFwic3RvcmFnZS50eXBlXCJdLFxuICAgICAgICAgICAgcmVnZXg6IC8oPzooXFwoKSgoPzpcIlteXCIpXSo/XCJ8J1teJyldKj8nfFxcL1teXFwvKV0qP1xcL3xbXigpXCInXFwvXSkqPykoXFwpKShcXHMqKSk/KFtcXC09XT4pLy5zb3VyY2VcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgc3RyaW5nRXNjYXBlID0gL1xcXFwoPzp4WzAtOWEtZkEtRl17Mn18dVswLTlhLWZBLUZdezR9fFswLTJdWzAtN117MCwyfXwzWzAtNl1bMC03XT98MzdbMC03XT98WzQtN11bMC03XT98LikvO1xuXG4gICAgICAgIHRoaXMuJHJ1bGVzID0ge1xuICAgICAgICAgICAgc3RhcnQgOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLFxuICAgICAgICAgICAgICAgICAgICByZWdleCA6IFwiKD86MHhbXFxcXGRhLWZBLUZdK3woPzpcXFxcZCsoPzpcXFxcLlxcXFxkKyk/fFxcXFwuXFxcXGQrKSg/OltlRV1bKy1dP1xcXFxkKyk/KVwiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZU5hbWU6IFwicWRvY1wiLFxuICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsIHJlZ2V4IDogXCInJydcIiwgbmV4dCA6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0b2tlbiA6IFwic3RyaW5nXCIsIHJlZ2V4IDogXCInJydcIiwgbmV4dCA6IFwic3RhcnRcIn0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7dG9rZW4gOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLCByZWdleCA6IHN0cmluZ0VzY2FwZX0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7ZGVmYXVsdFRva2VuOiBcInN0cmluZ1wifVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZU5hbWU6IFwicXFkb2NcIixcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICByZWdleCA6ICdcIlwiXCInLFxuICAgICAgICAgICAgICAgICAgICBuZXh0IDogW1xuICAgICAgICAgICAgICAgICAgICAgICAge3Rva2VuIDogXCJzdHJpbmdcIiwgcmVnZXggOiAnXCJcIlwiJywgbmV4dCA6IFwic3RhcnRcIn0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7dG9rZW4gOiBcInBhcmVuLnN0cmluZ1wiLCByZWdleCA6ICcjeycsIHB1c2ggOiBcInN0YXJ0XCJ9LFxuICAgICAgICAgICAgICAgICAgICAgICAge3Rva2VuIDogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIiwgcmVnZXggOiBzdHJpbmdFc2NhcGV9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2RlZmF1bHRUb2tlbjogXCJzdHJpbmdcIn1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVOYW1lOiBcInFzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLCByZWdleCA6IFwiJ1wiLCBuZXh0IDogW1xuICAgICAgICAgICAgICAgICAgICAgICAge3Rva2VuIDogXCJzdHJpbmdcIiwgcmVnZXggOiBcIidcIiwgbmV4dCA6IFwic3RhcnRcIn0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7dG9rZW4gOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLCByZWdleCA6IHN0cmluZ0VzY2FwZX0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7ZGVmYXVsdFRva2VuOiBcInN0cmluZ1wifVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZU5hbWU6IFwicXFzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZy5zdGFydFwiLCByZWdleCA6ICdcIicsIG5leHQgOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7dG9rZW4gOiBcInN0cmluZy5lbmRcIiwgcmVnZXggOiAnXCInLCBuZXh0IDogXCJzdGFydFwifSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0b2tlbiA6IFwicGFyZW4uc3RyaW5nXCIsIHJlZ2V4IDogJyN7JywgcHVzaCA6IFwic3RhcnRcIn0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7dG9rZW4gOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLCByZWdleCA6IHN0cmluZ0VzY2FwZX0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7ZGVmYXVsdFRva2VuOiBcInN0cmluZ1wifVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZU5hbWU6IFwianNcIixcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLCByZWdleCA6IFwiYFwiLCBuZXh0IDogW1xuICAgICAgICAgICAgICAgICAgICAgICAge3Rva2VuIDogXCJzdHJpbmdcIiwgcmVnZXggOiBcImBcIiwgbmV4dCA6IFwic3RhcnRcIn0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7dG9rZW4gOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLCByZWdleCA6IHN0cmluZ0VzY2FwZX0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7ZGVmYXVsdFRva2VuOiBcInN0cmluZ1wifVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICByZWdleDogXCJbe31dXCIsIG9uTWF0Y2g6IGZ1bmN0aW9uKHZhbCwgc3RhdGUsIHN0YWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHQgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbCA9PSBcIntcIiAmJiBzdGFjay5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFjay51bnNoaWZ0KFwic3RhcnRcIiwgc3RhdGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcInBhcmVuXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsID09IFwifVwiICYmIHN0YWNrLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWNrLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0ID0gc3RhY2suc2hpZnQoKSB8fCBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm5leHQuaW5kZXhPZihcInN0cmluZ1wiKSAhPSAtMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwicGFyZW4uc3RyaW5nXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJwYXJlblwiO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nLnJlZ2V4XCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIvLy9cIixcbiAgICAgICAgICAgICAgICAgICAgbmV4dCA6IFwiaGVyZWdleFwiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nLnJlZ2V4XCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogLyg/OlxcLyg/IVtcXHM9XSlbXltcXC9cXG5cXFxcXSooPzooPzpcXFxcW1xcc1xcU118XFxbW15cXF1cXG5cXFxcXSooPzpcXFxcW1xcc1xcU11bXlxcXVxcblxcXFxdKikqXSlbXltcXC9cXG5cXFxcXSopKlxcLykoPzpbaW1neV17MCw0fSkoPyFcXHcpL1xuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggOiBcIiMjIyg/ISMpXCIsXG4gICAgICAgICAgICAgICAgICAgIG5leHQgOiBcImNvbW1lbnRcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggOiBcIiMuKlwiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IFtcInB1bmN0dWF0aW9uLm9wZXJhdG9yXCIsIFwidGV4dFwiLCBcImlkZW50aWZpZXJcIl0sXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIoXFxcXC4pKFxcXFxzKikoXCIgKyBpbGxlZ2FsICsgXCIpXCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJwdW5jdHVhdGlvbi5vcGVyYXRvclwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXC57MSwzfVwiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAvL2NsYXNzIEEgZXh0ZW5kcyBCXG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogW1wia2V5d29yZFwiLCBcInRleHRcIiwgXCJsYW5ndWFnZS5zdXBwb3J0LmNsYXNzXCIsXG4gICAgICAgICAgICAgICAgICAgICBcInRleHRcIiwgXCJrZXl3b3JkXCIsIFwidGV4dFwiLCBcImxhbmd1YWdlLnN1cHBvcnQuY2xhc3NcIl0sXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIoY2xhc3MpKFxcXFxzKykoXCIgKyBpZGVudGlmaWVyICsgXCIpKD86KFxcXFxzKykoZXh0ZW5kcykoXFxcXHMrKShcIiArIGlkZW50aWZpZXIgKyBcIikpP1wiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAvL3BsYXkgPSAoLi4uKSAtPlxuICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IFtcImVudGl0eS5uYW1lLmZ1bmN0aW9uXCIsIFwidGV4dFwiLCBcImtleXdvcmQub3BlcmF0b3JcIiwgXCJ0ZXh0XCJdLmNvbmNhdChmdW5jdGlvblJ1bGUudG9rZW4pLFxuICAgICAgICAgICAgICAgICAgICByZWdleCA6IFwiKFwiICsgaWRlbnRpZmllciArIFwiKShcXFxccyopKFs9Ol0pKFxcXFxzKilcIiArIGZ1bmN0aW9uUnVsZS5yZWdleFxuICAgICAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uUnVsZSwgXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IFwidmFyaWFibGVcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggOiBcIkAoPzpcIiArIGlkZW50aWZpZXIgKyBcIik/XCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuOiBrZXl3b3JkTWFwcGVyLFxuICAgICAgICAgICAgICAgICAgICByZWdleCA6IGlkZW50aWZpZXJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJwdW5jdHVhdGlvbi5vcGVyYXRvclwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXCx8XFxcXC5cIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0b3JhZ2UudHlwZVwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleCA6IFwiW1xcXFwtPV0+XCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIoPzpbLSsqLyU8PiZ8XiE/PV09fD4+Pj0/fFxcXFwtXFxcXC18XFxcXCtcXFxcK3w6OnwmJj18XFxcXHxcXFxcfD18PDw9fD4+PXxcXFxcP1xcXFwufFxcXFwuezIsM318WyEqKy09PjxdKVwiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IFwicGFyZW4ubHBhcmVuXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJbKHtbXVwiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IFwicGFyZW4ucnBhcmVuXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJbXFxcXF19KV1cIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFxzK1wiXG4gICAgICAgICAgICAgICAgfV0sXG5cblxuICAgICAgICAgICAgaGVyZWdleCA6IFt7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZy5yZWdleFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogJy4qPy8vL1tpbWd5XXswLDR9JyxcbiAgICAgICAgICAgICAgICBuZXh0IDogXCJzdGFydFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnQucmVnZXhcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXHMrKD86Iy4qKT9cIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmcucmVnZXhcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXFMrXCJcbiAgICAgICAgICAgIH1dLFxuXG4gICAgICAgICAgICBjb21tZW50IDogW3tcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogJyMjIycsXG4gICAgICAgICAgICAgICAgbmV4dCA6IFwic3RhcnRcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbiA6IFwiY29tbWVudFwiXG4gICAgICAgICAgICB9XVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLm5vcm1hbGl6ZVJ1bGVzKCk7XG4gICAgfVxuXG4gICAgZXhwb3J0cy5Db2ZmZWVIaWdobGlnaHRSdWxlcyA9IENvZmZlZUhpZ2hsaWdodFJ1bGVzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vLi4vbGliL29vcFwiKTtcbnZhciBCYXNlRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9mb2xkX21vZGVcIikuRm9sZE1vZGU7XG52YXIgUmFuZ2UgPSByZXF1aXJlKFwiLi4vLi4vcmFuZ2VcIikuUmFuZ2U7XG5cbnZhciBGb2xkTW9kZSA9IGV4cG9ydHMuRm9sZE1vZGUgPSBmdW5jdGlvbigpIHt9O1xub29wLmluaGVyaXRzKEZvbGRNb2RlLCBCYXNlRm9sZE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5jb21tZW50QmxvY2sgPSBmdW5jdGlvbihzZXNzaW9uLCByb3cpIHtcbiAgICAgICAgdmFyIHJlID0gL1xcUy87XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgIHZhciBzdGFydExldmVsID0gbGluZS5zZWFyY2gocmUpO1xuICAgICAgICBpZiAoc3RhcnRMZXZlbCA9PSAtMSB8fCBsaW5lW3N0YXJ0TGV2ZWxdICE9IFwiI1wiKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHZhciBzdGFydENvbHVtbiA9IGxpbmUubGVuZ3RoO1xuICAgICAgICB2YXIgbWF4Um93ID0gc2Vzc2lvbi5nZXRMZW5ndGgoKTtcbiAgICAgICAgdmFyIHN0YXJ0Um93ID0gcm93O1xuICAgICAgICB2YXIgZW5kUm93ID0gcm93O1xuXG4gICAgICAgIHdoaWxlICgrK3JvdyA8IG1heFJvdykge1xuICAgICAgICAgICAgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICAgICAgdmFyIGxldmVsID0gbGluZS5zZWFyY2gocmUpO1xuXG4gICAgICAgICAgICBpZiAobGV2ZWwgPT0gLTEpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgICAgIGlmIChsaW5lW2xldmVsXSAhPSBcIiNcIilcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZW5kUm93ID0gcm93O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVuZFJvdyA+IHN0YXJ0Um93KSB7XG4gICAgICAgICAgICB2YXIgZW5kQ29sdW1uID0gc2Vzc2lvbi5nZXRMaW5lKGVuZFJvdykubGVuZ3RoO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShzdGFydFJvdywgc3RhcnRDb2x1bW4sIGVuZFJvdywgZW5kQ29sdW1uKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLmdldEZvbGRXaWRnZXRSYW5nZSA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KSB7XG4gICAgICAgIHZhciByYW5nZSA9IHRoaXMuaW5kZW50YXRpb25CbG9jayhzZXNzaW9uLCByb3cpO1xuICAgICAgICBpZiAocmFuZ2UpXG4gICAgICAgICAgICByZXR1cm4gcmFuZ2U7XG5cbiAgICAgICAgcmFuZ2UgPSB0aGlzLmNvbW1lbnRCbG9jayhzZXNzaW9uLCByb3cpO1xuICAgICAgICBpZiAocmFuZ2UpXG4gICAgICAgICAgICByZXR1cm4gcmFuZ2U7XG4gICAgfTtcblxuICAgIC8vIG11c3QgcmV0dXJuIFwiXCIgaWYgdGhlcmUncyBubyBmb2xkLCB0byBlbmFibGUgY2FjaGluZ1xuICAgIHRoaXMuZ2V0Rm9sZFdpZGdldCA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgIHZhciBpbmRlbnQgPSBsaW5lLnNlYXJjaCgvXFxTLyk7XG4gICAgICAgIHZhciBuZXh0ID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyArIDEpO1xuICAgICAgICB2YXIgcHJldiA9IHNlc3Npb24uZ2V0TGluZShyb3cgLSAxKTtcbiAgICAgICAgdmFyIHByZXZJbmRlbnQgPSBwcmV2LnNlYXJjaCgvXFxTLyk7XG4gICAgICAgIHZhciBuZXh0SW5kZW50ID0gbmV4dC5zZWFyY2goL1xcUy8pO1xuXG4gICAgICAgIGlmIChpbmRlbnQgPT0gLTEpIHtcbiAgICAgICAgICAgIHNlc3Npb24uZm9sZFdpZGdldHNbcm93IC0gMV0gPSBwcmV2SW5kZW50IT0gLTEgJiYgcHJldkluZGVudCA8IG5leHRJbmRlbnQgPyBcInN0YXJ0XCIgOiBcIlwiO1xuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBkb2N1bWVudGF0aW9uIGNvbW1lbnRzXG4gICAgICAgIGlmIChwcmV2SW5kZW50ID09IC0xKSB7XG4gICAgICAgICAgICBpZiAoaW5kZW50ID09IG5leHRJbmRlbnQgJiYgbGluZVtpbmRlbnRdID09IFwiI1wiICYmIG5leHRbaW5kZW50XSA9PSBcIiNcIikge1xuICAgICAgICAgICAgICAgIHNlc3Npb24uZm9sZFdpZGdldHNbcm93IC0gMV0gPSBcIlwiO1xuICAgICAgICAgICAgICAgIHNlc3Npb24uZm9sZFdpZGdldHNbcm93ICsgMV0gPSBcIlwiO1xuICAgICAgICAgICAgICAgIHJldHVybiBcInN0YXJ0XCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAocHJldkluZGVudCA9PSBpbmRlbnQgJiYgbGluZVtpbmRlbnRdID09IFwiI1wiICYmIHByZXZbaW5kZW50XSA9PSBcIiNcIikge1xuICAgICAgICAgICAgaWYgKHNlc3Npb24uZ2V0TGluZShyb3cgLSAyKS5zZWFyY2goL1xcUy8pID09IC0xKSB7XG4gICAgICAgICAgICAgICAgc2Vzc2lvbi5mb2xkV2lkZ2V0c1tyb3cgLSAxXSA9IFwic3RhcnRcIjtcbiAgICAgICAgICAgICAgICBzZXNzaW9uLmZvbGRXaWRnZXRzW3JvdyArIDFdID0gXCJcIjtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcmV2SW5kZW50IT0gLTEgJiYgcHJldkluZGVudCA8IGluZGVudClcbiAgICAgICAgICAgIHNlc3Npb24uZm9sZFdpZGdldHNbcm93IC0gMV0gPSBcInN0YXJ0XCI7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHNlc3Npb24uZm9sZFdpZGdldHNbcm93IC0gMV0gPSBcIlwiO1xuXG4gICAgICAgIGlmIChpbmRlbnQgPCBuZXh0SW5kZW50KVxuICAgICAgICAgICAgcmV0dXJuIFwic3RhcnRcIjtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfTtcblxufSkuY2FsbChGb2xkTW9kZS5wcm90b3R5cGUpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vLi4vbGliL29vcFwiKTtcbnZhciBCYXNlRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9mb2xkX21vZGVcIikuRm9sZE1vZGU7XG52YXIgUmFuZ2UgPSByZXF1aXJlKFwiLi4vLi4vcmFuZ2VcIikuUmFuZ2U7XG52YXIgVG9rZW5JdGVyYXRvciA9IHJlcXVpcmUoXCIuLi8uLi90b2tlbl9pdGVyYXRvclwiKS5Ub2tlbkl0ZXJhdG9yO1xuXG5cbnZhciBGb2xkTW9kZSA9IGV4cG9ydHMuRm9sZE1vZGUgPSBmdW5jdGlvbiAoKSB7XG59O1xuXG5vb3AuaW5oZXJpdHMoRm9sZE1vZGUsIEJhc2VGb2xkTW9kZSk7XG5cbihmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5pbmRlbnRLZXl3b3JkcyA9IHtcbiAgICAgICAgXCJjbGFzc1wiOiAxLFxuICAgICAgICBcImRlZlwiOiAxLFxuICAgICAgICBcIm1vZHVsZVwiOiAxLFxuICAgICAgICBcImRvXCI6IDEsXG4gICAgICAgIFwidW5sZXNzXCI6IDEsXG4gICAgICAgIFwiaWZcIjogMSxcbiAgICAgICAgXCJ3aGlsZVwiOiAxLFxuICAgICAgICBcImZvclwiOiAxLFxuICAgICAgICBcInVudGlsXCI6IDEsXG4gICAgICAgIFwiYmVnaW5cIjogMSxcbiAgICAgICAgXCJlbHNlXCI6IDAsXG4gICAgICAgIFwiZWxzaWZcIjogMCxcbiAgICAgICAgXCJyZXNjdWVcIjogMCxcbiAgICAgICAgXCJlbnN1cmVcIjogMCxcbiAgICAgICAgXCJ3aGVuXCI6IDAsXG4gICAgICAgIFwiZW5kXCI6IC0xLFxuICAgICAgICBcImNhc2VcIjogMSxcbiAgICAgICAgXCI9YmVnaW5cIjogMSxcbiAgICAgICAgXCI9ZW5kXCI6IC0xXG4gICAgfTtcblxuICAgIHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyID0gLyg/Olxcc3xeKShkZWZ8ZG98d2hpbGV8Y2xhc3N8dW5sZXNzfG1vZHVsZXxpZnxmb3J8dW50aWx8YmVnaW58ZWxzZXxlbHNpZnxjYXNlfHJlc2N1ZXxlbnN1cmV8d2hlbilcXGJ8KHtcXHMqJCl8KD1iZWdpbikvO1xuICAgIHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIgPSAvKD1lbmQoPz0kfFxccy4qJCkpfCheXFxzKn0pfFxcYihlbmQpXFxiLztcblxuICAgIHRoaXMuZ2V0Rm9sZFdpZGdldCA9IGZ1bmN0aW9uIChzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdykge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICB2YXIgaXNTdGFydCA9IHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyLnRlc3QobGluZSk7XG4gICAgICAgIHZhciBpc0VuZCA9IHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIudGVzdChsaW5lKTtcblxuICAgICAgICBpZiAoaXNTdGFydCAmJiAhaXNFbmQpIHtcbiAgICAgICAgICAgIHZhciBtYXRjaCA9IGxpbmUubWF0Y2godGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIpO1xuICAgICAgICAgICAgaWYgKG1hdGNoWzFdKSB7XG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoWzFdID09IFwiaWZcIiB8fCBtYXRjaFsxXSA9PSBcImVsc2VcIiB8fCBtYXRjaFsxXSA9PSBcIndoaWxlXCIgfHwgbWF0Y2hbMV0gPT0gXCJ1bnRpbFwiIHx8IG1hdGNoWzFdID09IFwidW5sZXNzXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hdGNoWzFdID09IFwiZWxzZVwiICYmIC9eXFxzKmVsc2VcXHMqJC8udGVzdChsaW5lKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoL15cXHMqKD86aWZ8ZWxzZXx3aGlsZXx1bnRpbHx1bmxlc3MpXFxzKi8udGVzdChsaW5lKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChtYXRjaFsxXSA9PSBcIndoZW5cIikge1xuICAgICAgICAgICAgICAgICAgICBpZiAoL1xcc3RoZW5cXHMvLnRlc3QobGluZSkgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc2Vzc2lvbi5nZXRUb2tlbkF0KHJvdywgbWF0Y2guaW5kZXggKyAyKS50eXBlID09PSBcImtleXdvcmRcIilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwic3RhcnRcIjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWF0Y2hbM10pIHtcbiAgICAgICAgICAgICAgICBpZiAoc2Vzc2lvbi5nZXRUb2tlbkF0KHJvdywgbWF0Y2guaW5kZXggKyAxKS50eXBlID09PSBcImNvbW1lbnQubXVsdGlsaW5lXCIpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcInN0YXJ0XCI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBcInN0YXJ0XCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZvbGRTdHlsZSAhPSBcIm1hcmtiZWdpbmVuZFwiIHx8ICFpc0VuZCB8fCBpc1N0YXJ0ICYmIGlzRW5kKVxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG5cbiAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCh0aGlzLmZvbGRpbmdTdG9wTWFya2VyKTtcbiAgICAgICAgaWYgKG1hdGNoWzNdID09PSBcImVuZFwiKSB7XG4gICAgICAgICAgICBpZiAoc2Vzc2lvbi5nZXRUb2tlbkF0KHJvdywgbWF0Y2guaW5kZXggKyAxKS50eXBlID09PSBcImtleXdvcmRcIilcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJlbmRcIjtcbiAgICAgICAgfSBlbHNlIGlmIChtYXRjaFsxXSkge1xuICAgICAgICAgICAgaWYgKHNlc3Npb24uZ2V0VG9rZW5BdChyb3csIG1hdGNoLmluZGV4ICsgMSkudHlwZSA9PT0gXCJjb21tZW50Lm11bHRpbGluZVwiKVxuICAgICAgICAgICAgICAgIHJldHVybiBcImVuZFwiO1xuICAgICAgICB9IGVsc2VcbiAgICAgICAgICAgIHJldHVybiBcImVuZFwiO1xuICAgIH07XG5cbiAgICB0aGlzLmdldEZvbGRXaWRnZXRSYW5nZSA9IGZ1bmN0aW9uIChzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdykge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZG9jLmdldExpbmUocm93KTtcbiAgICAgICAgdmFyIG1hdGNoID0gdGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIuZXhlYyhsaW5lKTtcbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICBpZiAobWF0Y2hbMV0gfHwgbWF0Y2hbM10pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucnVieUJsb2NrKHNlc3Npb24sIHJvdywgbWF0Y2guaW5kZXggKyAyKTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMub3BlbmluZ0JyYWNrZXRCbG9jayhzZXNzaW9uLCBcIntcIiwgcm93LCBtYXRjaC5pbmRleCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbWF0Y2ggPSB0aGlzLmZvbGRpbmdTdG9wTWFya2VyLmV4ZWMobGluZSk7XG4gICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgaWYgKG1hdGNoWzNdID09PSBcImVuZFwiKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNlc3Npb24uZ2V0VG9rZW5BdChyb3csIG1hdGNoLmluZGV4ICsgMSkudHlwZSA9PT0gXCJrZXl3b3JkXCIpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJ1YnlCbG9jayhzZXNzaW9uLCByb3csIG1hdGNoLmluZGV4ICsgMSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChtYXRjaFsxXSA9PT0gXCI9ZW5kXCIpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2Vzc2lvbi5nZXRUb2tlbkF0KHJvdywgbWF0Y2guaW5kZXggKyAxKS50eXBlID09PSBcImNvbW1lbnQubXVsdGlsaW5lXCIpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJ1YnlCbG9jayhzZXNzaW9uLCByb3csIG1hdGNoLmluZGV4ICsgMSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNsb3NpbmdCcmFja2V0QmxvY2soc2Vzc2lvbiwgXCJ9XCIsIHJvdywgbWF0Y2guaW5kZXggKyBtYXRjaFswXS5sZW5ndGgpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMucnVieUJsb2NrID0gZnVuY3Rpb24gKHNlc3Npb24sIHJvdywgY29sdW1uLCB0b2tlblJhbmdlKSB7XG4gICAgICAgIHZhciBzdHJlYW0gPSBuZXcgVG9rZW5JdGVyYXRvcihzZXNzaW9uLCByb3csIGNvbHVtbik7XG5cbiAgICAgICAgdmFyIHRva2VuID0gc3RyZWFtLmdldEN1cnJlbnRUb2tlbigpO1xuICAgICAgICBpZiAoIXRva2VuIHx8ICh0b2tlbi50eXBlICE9IFwia2V5d29yZFwiICYmIHRva2VuLnR5cGUgIT0gXCJjb21tZW50Lm11bHRpbGluZVwiKSlcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB2YXIgdmFsID0gdG9rZW4udmFsdWU7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgIHN3aXRjaCAodG9rZW4udmFsdWUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJpZlwiOlxuICAgICAgICAgICAgY2FzZSBcInVubGVzc1wiOlxuICAgICAgICAgICAgY2FzZSBcIndoaWxlXCI6XG4gICAgICAgICAgICBjYXNlIFwidW50aWxcIjpcbiAgICAgICAgICAgICAgICB2YXIgY2hlY2tUb2tlbiA9IG5ldyBSZWdFeHAoXCJeXFxcXHMqXCIgKyB0b2tlbi52YWx1ZSk7XG4gICAgICAgICAgICAgICAgaWYgKCFjaGVja1Rva2VuLnRlc3QobGluZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgZGlyID0gdGhpcy5pbmRlbnRLZXl3b3Jkc1t2YWxdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIndoZW5cIjpcbiAgICAgICAgICAgICAgICBpZiAoL1xcc3RoZW5cXHMvLnRlc3QobGluZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhc2UgXCJlbHNpZlwiOlxuICAgICAgICAgICAgY2FzZSBcInJlc2N1ZVwiOlxuICAgICAgICAgICAgY2FzZSBcImVuc3VyZVwiOlxuICAgICAgICAgICAgICAgIHZhciBkaXIgPSAxO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImVsc2VcIjpcbiAgICAgICAgICAgICAgICB2YXIgY2hlY2tUb2tlbiA9IG5ldyBSZWdFeHAoXCJeXFxcXHMqXCIgKyB0b2tlbi52YWx1ZSArIFwiXFxcXHMqJFwiKTtcbiAgICAgICAgICAgICAgICBpZiAoIWNoZWNrVG9rZW4udGVzdChsaW5lKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBkaXIgPSAxO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB2YXIgZGlyID0gdGhpcy5pbmRlbnRLZXl3b3Jkc1t2YWxdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHN0YWNrID0gW3ZhbF07XG4gICAgICAgIGlmICghZGlyKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHZhciBzdGFydENvbHVtbiA9IGRpciA9PT0gLTEgPyBzZXNzaW9uLmdldExpbmUocm93IC0gMSkubGVuZ3RoIDogc2Vzc2lvbi5nZXRMaW5lKHJvdykubGVuZ3RoO1xuICAgICAgICB2YXIgc3RhcnRSb3cgPSByb3c7XG4gICAgICAgIHZhciByYW5nZXMgPSBbXTtcbiAgICAgICAgcmFuZ2VzLnB1c2goc3RyZWFtLmdldEN1cnJlbnRUb2tlblJhbmdlKCkpO1xuXG4gICAgICAgIHN0cmVhbS5zdGVwID0gZGlyID09PSAtMSA/IHN0cmVhbS5zdGVwQmFja3dhcmQgOiBzdHJlYW0uc3RlcEZvcndhcmQ7XG4gICAgICAgIGlmICh0b2tlbi50eXBlID09IFwiY29tbWVudC5tdWx0aWxpbmVcIikge1xuICAgICAgICAgICAgd2hpbGUgKHRva2VuID0gc3RyZWFtLnN0ZXAoKSkge1xuICAgICAgICAgICAgICAgIGlmICh0b2tlbi50eXBlICE9PSBcImNvbW1lbnQubXVsdGlsaW5lXCIpXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGlmIChkaXIgPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBzdGFydENvbHVtbiA9IDY7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0b2tlbi52YWx1ZSA9PSBcIj1lbmRcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAodG9rZW4udmFsdWUgPT0gXCI9YmVnaW5cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3aGlsZSAodG9rZW4gPSBzdHJlYW0uc3RlcCgpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGlnbm9yZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmICh0b2tlbi50eXBlICE9PSBcImtleXdvcmRcIilcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgdmFyIGxldmVsID0gZGlyICogdGhpcy5pbmRlbnRLZXl3b3Jkc1t0b2tlbi52YWx1ZV07XG4gICAgICAgICAgICAgICAgbGluZSA9IHNlc3Npb24uZ2V0TGluZShzdHJlYW0uZ2V0Q3VycmVudFRva2VuUm93KCkpO1xuICAgICAgICAgICAgICAgIHN3aXRjaCAodG9rZW4udmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImRvXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gc3RyZWFtLiR0b2tlbkluZGV4IC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJldlRva2VuID0gc3RyZWFtLiRyb3dUb2tlbnNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByZXZUb2tlbiAmJiAocHJldlRva2VuLnZhbHVlID09IFwid2hpbGVcIiB8fCBwcmV2VG9rZW4udmFsdWUgPT0gXCJ1bnRpbFwiIHx8IHByZXZUb2tlbi52YWx1ZSA9PSBcImZvclwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXZlbCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZWxzZVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNoZWNrVG9rZW4gPSBuZXcgUmVnRXhwKFwiXlxcXFxzKlwiICsgdG9rZW4udmFsdWUgKyBcIlxcXFxzKiRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWNoZWNrVG9rZW4udGVzdChsaW5lKSB8fCB2YWwgPT0gXCJjYXNlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXZlbCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWdub3JlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiaWZcIjpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInVubGVzc1wiOlxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwid2hpbGVcIjpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInVudGlsXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2hlY2tUb2tlbiA9IG5ldyBSZWdFeHAoXCJeXFxcXHMqXCIgKyB0b2tlbi52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWNoZWNrVG9rZW4udGVzdChsaW5lKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldmVsID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZ25vcmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ3aGVuXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoL1xcc3RoZW5cXHMvLnRlc3QobGluZSkgfHwgdmFsID09IFwiY2FzZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV2ZWwgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlnbm9yZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAobGV2ZWwgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YWNrLnVuc2hpZnQodG9rZW4udmFsdWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobGV2ZWwgPD0gMCAmJiBpZ25vcmUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YWNrLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghc3RhY2subGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKHZhbCA9PSBcIndoaWxlXCIgfHwgdmFsID09IFwidW50aWxcIiB8fCB2YWwgPT0gXCJmb3JcIikgJiYgdG9rZW4udmFsdWUgIT0gXCJkb1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodG9rZW4udmFsdWUgPT0gXCJkb1wiICYmIGRpciA9PSAtMSAmJiBsZXZlbCAhPSAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRva2VuLnZhbHVlICE9IFwiZG9cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChsZXZlbCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhY2sudW5zaGlmdCh0b2tlbi52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRva2VuKVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgaWYgKHRva2VuUmFuZ2UpIHtcbiAgICAgICAgICAgIHJhbmdlcy5wdXNoKHN0cmVhbS5nZXRDdXJyZW50VG9rZW5SYW5nZSgpKTtcbiAgICAgICAgICAgIHJldHVybiByYW5nZXM7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcm93ID0gc3RyZWFtLmdldEN1cnJlbnRUb2tlblJvdygpO1xuICAgICAgICBpZiAoZGlyID09PSAtMSkge1xuICAgICAgICAgICAgaWYgKHRva2VuLnR5cGUgPT09IFwiY29tbWVudC5tdWx0aWxpbmVcIikge1xuICAgICAgICAgICAgICAgIHZhciBlbmRDb2x1bW4gPSA2O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgZW5kQ29sdW1uID0gc2Vzc2lvbi5nZXRMaW5lKHJvdykubGVuZ3RoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShyb3csIGVuZENvbHVtbiwgc3RhcnRSb3cgLSAxLCBzdGFydENvbHVtbik7XG4gICAgICAgIH0gZWxzZVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShzdGFydFJvdywgc3RhcnRDb2x1bW4sIHJvdyAtIDEsIHNlc3Npb24uZ2V0TGluZShyb3cgLSAxKS5sZW5ndGgpO1xuICAgIH07XG5cbn0pLmNhbGwoRm9sZE1vZGUucHJvdG90eXBlKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dE1vZGUgPSByZXF1aXJlKFwiLi90ZXh0XCIpLk1vZGU7XG52YXIgTGVzc0hpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vbGVzc19oaWdobGlnaHRfcnVsZXNcIikuTGVzc0hpZ2hsaWdodFJ1bGVzO1xudmFyIE1hdGNoaW5nQnJhY2VPdXRkZW50ID0gcmVxdWlyZShcIi4vbWF0Y2hpbmdfYnJhY2Vfb3V0ZGVudFwiKS5NYXRjaGluZ0JyYWNlT3V0ZGVudDtcbnZhciBDc3NCZWhhdmlvdXIgPSByZXF1aXJlKFwiLi9iZWhhdmlvdXIvY3NzXCIpLkNzc0JlaGF2aW91cjtcbnZhciBDc3NDb21wbGV0aW9ucyA9IHJlcXVpcmUoXCIuL2Nzc19jb21wbGV0aW9uc1wiKS5Dc3NDb21wbGV0aW9ucztcblxudmFyIENTdHlsZUZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZGluZy9jc3R5bGVcIikuRm9sZE1vZGU7XG5cbnZhciBNb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5IaWdobGlnaHRSdWxlcyA9IExlc3NIaWdobGlnaHRSdWxlcztcbiAgICB0aGlzLiRvdXRkZW50ID0gbmV3IE1hdGNoaW5nQnJhY2VPdXRkZW50KCk7XG4gICAgdGhpcy4kYmVoYXZpb3VyID0gbmV3IENzc0JlaGF2aW91cigpO1xuICAgIHRoaXMuJGNvbXBsZXRlciA9IG5ldyBDc3NDb21wbGV0aW9ucygpO1xuICAgIHRoaXMuZm9sZGluZ1J1bGVzID0gbmV3IENTdHlsZUZvbGRNb2RlKCk7XG59O1xub29wLmluaGVyaXRzKE1vZGUsIFRleHRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5saW5lQ29tbWVudFN0YXJ0ID0gXCIvL1wiO1xuICAgIHRoaXMuYmxvY2tDb21tZW50ID0ge3N0YXJ0OiBcIi8qXCIsIGVuZDogXCIqL1wifTtcbiAgICBcbiAgICB0aGlzLmdldE5leHRMaW5lSW5kZW50ID0gZnVuY3Rpb24oc3RhdGUsIGxpbmUsIHRhYikge1xuICAgICAgICB2YXIgaW5kZW50ID0gdGhpcy4kZ2V0SW5kZW50KGxpbmUpO1xuXG4gICAgICAgIC8vIGlnbm9yZSBicmFjZXMgaW4gY29tbWVudHNcbiAgICAgICAgdmFyIHRva2VucyA9IHRoaXMuZ2V0VG9rZW5pemVyKCkuZ2V0TGluZVRva2VucyhsaW5lLCBzdGF0ZSkudG9rZW5zO1xuICAgICAgICBpZiAodG9rZW5zLmxlbmd0aCAmJiB0b2tlbnNbdG9rZW5zLmxlbmd0aC0xXS50eXBlID09IFwiY29tbWVudFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5kZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCgvXi4qXFx7XFxzKiQvKTtcbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICBpbmRlbnQgKz0gdGFiO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGluZGVudDtcbiAgICB9O1xuXG4gICAgdGhpcy5jaGVja091dGRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgbGluZSwgaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJG91dGRlbnQuY2hlY2tPdXRkZW50KGxpbmUsIGlucHV0KTtcbiAgICB9O1xuXG4gICAgdGhpcy5hdXRvT3V0ZGVudCA9IGZ1bmN0aW9uKHN0YXRlLCBkb2MsIHJvdykge1xuICAgICAgICB0aGlzLiRvdXRkZW50LmF1dG9PdXRkZW50KGRvYywgcm93KTtcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRDb21wbGV0aW9ucyA9IGZ1bmN0aW9uKHN0YXRlLCBzZXNzaW9uLCBwb3MsIHByZWZpeCkge1xuICAgICAgICAvLyBDU1MgY29tcGxldGlvbnMgb25seSB3b3JrIHdpdGggc2luZ2xlIChub3QgbmVzdGVkKSBydWxlc2V0c1xuICAgICAgICByZXR1cm4gdGhpcy4kY29tcGxldGVyLmdldENvbXBsZXRpb25zKFwicnVsZXNldFwiLCBzZXNzaW9uLCBwb3MsIHByZWZpeCk7XG4gICAgfTtcblxuICAgIHRoaXMuJGlkID0gXCJhY2UvbW9kZS9sZXNzXCI7XG59KS5jYWxsKE1vZGUucHJvdG90eXBlKTtcblxuZXhwb3J0cy5Nb2RlID0gTW9kZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xudmFyIENzc0hpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZSgnLi9jc3NfaGlnaGxpZ2h0X3J1bGVzJyk7XG5cbnZhciBMZXNzSGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbigpIHtcblxuXG4gICAgdmFyIGtleXdvcmRMaXN0ID0gXCJAaW1wb3J0fEBtZWRpYXxAZm9udC1mYWNlfEBrZXlmcmFtZXN8QC13ZWJraXQta2V5ZnJhbWVzfEBzdXBwb3J0c3xcIiArIFxuICAgICAgICBcIkBjaGFyc2V0fEBwbHVnaW58QG5hbWVzcGFjZXxAZG9jdW1lbnR8QHBhZ2V8QHZpZXdwb3J0fEAtbXMtdmlld3BvcnR8XCIgK1xuICAgICAgICBcIm9yfGFuZHx3aGVufG5vdFwiO1xuXG4gICAgdmFyIGtleXdvcmRzID0ga2V5d29yZExpc3Quc3BsaXQoJ3wnKTtcblxuICAgIHZhciBwcm9wZXJ0aWVzID0gQ3NzSGlnaGxpZ2h0UnVsZXMuc3VwcG9ydFR5cGUuc3BsaXQoJ3wnKTtcblxuICAgIHZhciBrZXl3b3JkTWFwcGVyID0gdGhpcy5jcmVhdGVLZXl3b3JkTWFwcGVyKHtcbiAgICAgICAgXCJzdXBwb3J0LmNvbnN0YW50XCI6IENzc0hpZ2hsaWdodFJ1bGVzLnN1cHBvcnRDb25zdGFudCxcbiAgICAgICAgXCJrZXl3b3JkXCI6IGtleXdvcmRMaXN0LFxuICAgICAgICBcInN1cHBvcnQuY29uc3RhbnQuY29sb3JcIjogQ3NzSGlnaGxpZ2h0UnVsZXMuc3VwcG9ydENvbnN0YW50Q29sb3IsXG4gICAgICAgIFwic3VwcG9ydC5jb25zdGFudC5mb250c1wiOiBDc3NIaWdobGlnaHRSdWxlcy5zdXBwb3J0Q29uc3RhbnRGb250c1xuICAgIH0sIFwiaWRlbnRpZmllclwiLCB0cnVlKTsgICBcblxuICAgIC8vIHJlZ2V4cCBtdXN0IG5vdCBoYXZlIGNhcHR1cmluZyBwYXJlbnRoZXNlcy4gVXNlICg/OikgaW5zdGVhZC5cbiAgICAvLyByZWdleHBzIGFyZSBvcmRlcmVkIC0+IHRoZSBmaXJzdCBtYXRjaCBpcyB1c2VkXG5cbiAgICB2YXIgbnVtUmUgPSBcIlxcXFwtPyg/Oig/OlswLTldKyl8KD86WzAtOV0qXFxcXC5bMC05XSspKVwiO1xuXG4gICAgLy8gcmVnZXhwIG11c3Qgbm90IGhhdmUgY2FwdHVyaW5nIHBhcmVudGhlc2VzLiBVc2UgKD86KSBpbnN0ZWFkLlxuICAgIC8vIHJlZ2V4cHMgYXJlIG9yZGVyZWQgLT4gdGhlIGZpcnN0IG1hdGNoIGlzIHVzZWRcblxuICAgIHRoaXMuJHJ1bGVzID0ge1xuICAgICAgICBcInN0YXJ0XCIgOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXC9cXFxcLy4qJFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsIC8vIG11bHRpIGxpbmUgY29tbWVudFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcL1xcXFwqXCIsXG4gICAgICAgICAgICAgICAgbmV4dCA6IFwiY29tbWVudFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLCAvLyBzaW5nbGUgbGluZVxuICAgICAgICAgICAgICAgIHJlZ2V4IDogJ1tcIl0oPzooPzpcXFxcXFxcXC4pfCg/OlteXCJcXFxcXFxcXF0pKSo/W1wiXSdcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsIC8vIHNpbmdsZSBsaW5lXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlsnXSg/Oig/OlxcXFxcXFxcLil8KD86W14nXFxcXFxcXFxdKSkqP1snXVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBbXCJjb25zdGFudC5udW1lcmljXCIsIFwia2V5d29yZFwiXSxcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiKFwiICsgbnVtUmUgKyBcIikoY2h8Y218ZGVnfGVtfGV4fGZyfGdkfGdyYWR8SHp8aW58a0h6fG1tfG1zfHBjfHB0fHB4fHJhZHxyZW18c3x0dXJufHZofHZtfHZ3fCUpXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLCAvLyBoZXg2IGNvbG9yXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIiNbYS1mMC05XXs2fVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIiwgLy8gaGV4MyBjb2xvclxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIjW2EtZjAtOV17M31cIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5udW1lcmljXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBudW1SZVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogW1wic3VwcG9ydC5mdW5jdGlvblwiLCBcInBhcmVuLmxwYXJlblwiLCBcInN0cmluZ1wiLCBcInBhcmVuLnJwYXJlblwiXSxcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiKHVybCkoXFxcXCgpKC4qKShcXFxcKSlcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogW1wic3VwcG9ydC5mdW5jdGlvblwiLCBcInBhcmVuLmxwYXJlblwiXSxcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiKDpleHRlbmR8W2EtejAtOV9cXFxcLV0rKShcXFxcKClcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGtleXdvcmRzLmluZGV4T2YodmFsdWUudG9Mb3dlckNhc2UoKSkgPiAtMSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcImtleXdvcmRcIjtcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwidmFyaWFibGVcIjtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJbQFxcXFwkXVthLXowLTlfXFxcXC1AXFxcXCRdKlxcXFxiXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwidmFyaWFibGVcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiW0BcXFxcJF1cXFxce1thLXowLTlfXFxcXC1AXFxcXCRdKlxcXFx9XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IGZ1bmN0aW9uKGZpcnN0LCBzZWNvbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYocHJvcGVydGllcy5pbmRleE9mKGZpcnN0LnRvTG93ZXJDYXNlKCkpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbXCJzdXBwb3J0LnR5cGUucHJvcGVydHlcIiwgXCJ0ZXh0XCJdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcInN1cHBvcnQudHlwZS51bmtub3duUHJvcGVydHlcIiwgXCJ0ZXh0XCJdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiKFthLXowLTktX10rKShcXFxccyo6KVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImtleXdvcmRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiJlwiICAgLy8gc3BlY2lhbCBjYXNlIC0gYWx3YXlzIHRyZWF0IGFzIGtleXdvcmRcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IGtleXdvcmRNYXBwZXIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwtP1tAYS16X11bQGEtejAtOV9cXFxcLV0qXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJ2YXJpYWJsZS5sYW5ndWFnZVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIiNbYS16MC05LV9dK1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwidmFyaWFibGUubGFuZ3VhZ2VcIixcbiAgICAgICAgICAgICAgICByZWdleDogXCJcXFxcLlthLXowLTktX10rXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJ2YXJpYWJsZS5sYW5ndWFnZVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIjpbYS16X11bYS16MC05LV9dKlwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnRcIixcbiAgICAgICAgICAgICAgICByZWdleDogXCJbYS16MC05LV9dK1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImtleXdvcmQub3BlcmF0b3JcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiPHw+fDw9fD49fD18IT18LXwlfFxcXFwrfFxcXFwqXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwicGFyZW4ubHBhcmVuXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIltbKHtdXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwicGFyZW4ucnBhcmVuXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIltcXFxcXSl9XVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXHMrXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBjYXNlSW5zZW5zaXRpdmU6IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgXCJjb21tZW50XCIgOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIiwgLy8gY2xvc2luZyBjb21tZW50XG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwqXFxcXC9cIixcbiAgICAgICAgICAgICAgICBuZXh0IDogXCJzdGFydFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuIDogXCJjb21tZW50XCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH07XG4gICAgdGhpcy5ub3JtYWxpemVSdWxlcygpO1xufTtcblxub29wLmluaGVyaXRzKExlc3NIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuZXhwb3J0cy5MZXNzSGlnaGxpZ2h0UnVsZXMgPSBMZXNzSGlnaGxpZ2h0UnVsZXM7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRNb2RlID0gcmVxdWlyZShcIi4vdGV4dFwiKS5Nb2RlO1xudmFyIFJ1YnlIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3J1YnlfaGlnaGxpZ2h0X3J1bGVzXCIpLlJ1YnlIaWdobGlnaHRSdWxlcztcbnZhciBNYXRjaGluZ0JyYWNlT3V0ZGVudCA9IHJlcXVpcmUoXCIuL21hdGNoaW5nX2JyYWNlX291dGRlbnRcIikuTWF0Y2hpbmdCcmFjZU91dGRlbnQ7XG52YXIgUmFuZ2UgPSByZXF1aXJlKFwiLi4vcmFuZ2VcIikuUmFuZ2U7XG52YXIgRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9mb2xkaW5nL3J1YnlcIikuRm9sZE1vZGU7XG5cbnZhciBNb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5IaWdobGlnaHRSdWxlcyA9IFJ1YnlIaWdobGlnaHRSdWxlcztcbiAgICB0aGlzLiRvdXRkZW50ID0gbmV3IE1hdGNoaW5nQnJhY2VPdXRkZW50KCk7XG4gICAgdGhpcy4kYmVoYXZpb3VyID0gdGhpcy4kZGVmYXVsdEJlaGF2aW91cjtcbiAgICB0aGlzLmZvbGRpbmdSdWxlcyA9IG5ldyBGb2xkTW9kZSgpO1xuICAgIHRoaXMuaW5kZW50S2V5d29yZHMgPSB0aGlzLmZvbGRpbmdSdWxlcy5pbmRlbnRLZXl3b3Jkcztcbn07XG5vb3AuaW5oZXJpdHMoTW9kZSwgVGV4dE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG5cblxuICAgIHRoaXMubGluZUNvbW1lbnRTdGFydCA9IFwiI1wiO1xuXG4gICAgdGhpcy5nZXROZXh0TGluZUluZGVudCA9IGZ1bmN0aW9uKHN0YXRlLCBsaW5lLCB0YWIpIHtcbiAgICAgICAgdmFyIGluZGVudCA9IHRoaXMuJGdldEluZGVudChsaW5lKTtcblxuICAgICAgICB2YXIgdG9rZW5pemVkTGluZSA9IHRoaXMuZ2V0VG9rZW5pemVyKCkuZ2V0TGluZVRva2VucyhsaW5lLCBzdGF0ZSk7XG4gICAgICAgIHZhciB0b2tlbnMgPSB0b2tlbml6ZWRMaW5lLnRva2VucztcblxuICAgICAgICBpZiAodG9rZW5zLmxlbmd0aCAmJiB0b2tlbnNbdG9rZW5zLmxlbmd0aCAtIDFdLnR5cGUgPT0gXCJjb21tZW50XCIpIHtcbiAgICAgICAgICAgIHJldHVybiBpbmRlbnQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RhdGUgPT0gXCJzdGFydFwiKSB7XG4gICAgICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKC9eLipbXFx7XFwoXFxbXVxccyokLyk7XG4gICAgICAgICAgICB2YXIgc3RhcnRpbmdDbGFzc09yTWV0aG9kID0gbGluZS5tYXRjaCgvXlxccyooY2xhc3N8ZGVmfG1vZHVsZSlcXHMuKiQvKTtcbiAgICAgICAgICAgIHZhciBzdGFydGluZ0RvQmxvY2sgPSBsaW5lLm1hdGNoKC8uKmRvKFxccyp8XFxzK1xcfC4qXFx8XFxzKikkLyk7XG4gICAgICAgICAgICB2YXIgc3RhcnRpbmdDb25kaXRpb25hbCA9IGxpbmUubWF0Y2goL15cXHMqKGlmfGVsc2V8d2hlbnxlbHNpZnx1bmxlc3N8d2hpbGV8Zm9yfGJlZ2lufHJlc2N1ZXxlbnN1cmUpXFxzKi8pO1xuICAgICAgICAgICAgaWYgKG1hdGNoIHx8IHN0YXJ0aW5nQ2xhc3NPck1ldGhvZCB8fCBzdGFydGluZ0RvQmxvY2sgfHwgc3RhcnRpbmdDb25kaXRpb25hbCkge1xuICAgICAgICAgICAgICAgIGluZGVudCArPSB0YWI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW5kZW50O1xuICAgIH07XG5cbiAgICB0aGlzLmNoZWNrT3V0ZGVudCA9IGZ1bmN0aW9uKHN0YXRlLCBsaW5lLCBpbnB1dCkge1xuICAgICAgICByZXR1cm4gL15cXHMrKGVuZHxlbHNlfHJlc2N1ZXxlbnN1cmUpJC8udGVzdChsaW5lICsgaW5wdXQpIHx8IHRoaXMuJG91dGRlbnQuY2hlY2tPdXRkZW50KGxpbmUsIGlucHV0KTtcbiAgICB9O1xuXG4gICAgdGhpcy5hdXRvT3V0ZGVudCA9IGZ1bmN0aW9uKHN0YXRlLCBzZXNzaW9uLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgaWYgKC99Ly50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJG91dGRlbnQuYXV0b091dGRlbnQoc2Vzc2lvbiwgcm93KTtcbiAgICAgICAgdmFyIGluZGVudCA9IHRoaXMuJGdldEluZGVudChsaW5lKTtcbiAgICAgICAgdmFyIHByZXZMaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyAtIDEpO1xuICAgICAgICB2YXIgcHJldkluZGVudCA9IHRoaXMuJGdldEluZGVudChwcmV2TGluZSk7XG4gICAgICAgIHZhciB0YWIgPSBzZXNzaW9uLmdldFRhYlN0cmluZygpO1xuICAgICAgICBpZiAocHJldkluZGVudC5sZW5ndGggPD0gaW5kZW50Lmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGluZGVudC5zbGljZSgtdGFiLmxlbmd0aCkgPT0gdGFiKVxuICAgICAgICAgICAgICAgIHNlc3Npb24ucmVtb3ZlKG5ldyBSYW5nZShyb3csIGluZGVudC5sZW5ndGggLSB0YWIubGVuZ3RoLCByb3csIGluZGVudC5sZW5ndGgpKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLmdldE1hdGNoaW5nID0gZnVuY3Rpb24oc2Vzc2lvbiwgcm93LCBjb2x1bW4pIHtcbiAgICAgICAgaWYgKHJvdyA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHZhciBwb3MgPSBzZXNzaW9uLnNlbGVjdGlvbi5sZWFkO1xuICAgICAgICAgICAgY29sdW1uID0gcG9zLmNvbHVtbjtcbiAgICAgICAgICAgIHJvdyA9IHBvcy5yb3c7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc3RhcnRUb2tlbiA9IHNlc3Npb24uZ2V0VG9rZW5BdChyb3csIGNvbHVtbik7XG4gICAgICAgIGlmIChzdGFydFRva2VuICYmIHN0YXJ0VG9rZW4udmFsdWUgaW4gdGhpcy5pbmRlbnRLZXl3b3JkcylcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZvbGRpbmdSdWxlcy5ydWJ5QmxvY2soc2Vzc2lvbiwgcm93LCBjb2x1bW4sIHRydWUpO1xuICAgIH07XG5cbiAgICB0aGlzLiRpZCA9IFwiYWNlL21vZGUvcnVieVwiO1xuICAgIHRoaXMuc25pcHBldEZpbGVJZCA9IFwiYWNlL3NuaXBwZXRzL3J1YnlcIjtcbn0pLmNhbGwoTW9kZS5wcm90b3R5cGUpO1xuXG5leHBvcnRzLk1vZGUgPSBNb2RlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0TW9kZSA9IHJlcXVpcmUoXCIuL3RleHRcIikuTW9kZTtcbnZhciBTYXNzSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9zYXNzX2hpZ2hsaWdodF9ydWxlc1wiKS5TYXNzSGlnaGxpZ2h0UnVsZXM7XG52YXIgRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9mb2xkaW5nL2NvZmZlZVwiKS5Gb2xkTW9kZTtcblxudmFyIE1vZGUgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLkhpZ2hsaWdodFJ1bGVzID0gU2Fzc0hpZ2hsaWdodFJ1bGVzO1xuICAgIHRoaXMuZm9sZGluZ1J1bGVzID0gbmV3IEZvbGRNb2RlKCk7XG4gICAgdGhpcy4kYmVoYXZpb3VyID0gdGhpcy4kZGVmYXVsdEJlaGF2aW91cjtcbn07XG5vb3AuaW5oZXJpdHMoTW9kZSwgVGV4dE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7ICAgXG4gICAgdGhpcy5saW5lQ29tbWVudFN0YXJ0ID0gXCIvL1wiO1xuICAgIHRoaXMuJGlkID0gXCJhY2UvbW9kZS9zYXNzXCI7XG59KS5jYWxsKE1vZGUucHJvdG90eXBlKTtcblxuZXhwb3J0cy5Nb2RlID0gTW9kZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgbGFuZyA9IHJlcXVpcmUoXCIuLi9saWIvbGFuZ1wiKTtcbnZhciBTY3NzSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9zY3NzX2hpZ2hsaWdodF9ydWxlc1wiKS5TY3NzSGlnaGxpZ2h0UnVsZXM7XG5cbnZhciBTYXNzSGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbigpIHtcbiAgICBTY3NzSGlnaGxpZ2h0UnVsZXMuY2FsbCh0aGlzKTtcbiAgICB2YXIgc3RhcnQgPSB0aGlzLiRydWxlcy5zdGFydDtcbiAgICBpZiAoc3RhcnRbMV0udG9rZW4gPT0gXCJjb21tZW50XCIpIHtcbiAgICAgICAgc3RhcnQuc3BsaWNlKDEsIDEsIHtcbiAgICAgICAgICAgIG9uTWF0Y2g6IGZ1bmN0aW9uKHZhbHVlLCBjdXJyZW50U3RhdGUsIHN0YWNrKSB7XG4gICAgICAgICAgICAgICAgc3RhY2sudW5zaGlmdCh0aGlzLm5leHQsIC0xLCB2YWx1ZS5sZW5ndGggLSAyLCBjdXJyZW50U3RhdGUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBcImNvbW1lbnRcIjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZWdleDogL15cXHMqXFwvXFwqLyxcbiAgICAgICAgICAgIG5leHQ6IFwiY29tbWVudFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcImVycm9yLmludmFsaWRcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIi9cXFxcKnxbezt9XVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInN1cHBvcnQudHlwZVwiLFxuICAgICAgICAgICAgcmVnZXg6IC9eXFxzKjpbXFx3XFwtXStcXHMvXG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgdGhpcy4kcnVsZXMuY29tbWVudCA9IFtcbiAgICAgICAgICAgIHtyZWdleDogL15cXHMqLywgb25NYXRjaDogZnVuY3Rpb24odmFsdWUsIGN1cnJlbnRTdGF0ZSwgc3RhY2spIHtcbiAgICAgICAgICAgICAgICBpZiAoc3RhY2tbMV0gPT09IC0xKVxuICAgICAgICAgICAgICAgICAgICBzdGFja1sxXSA9IE1hdGgubWF4KHN0YWNrWzJdLCB2YWx1ZS5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUubGVuZ3RoIDw9IHN0YWNrWzFdKSB7XG4gICAgICAgICAgICAgICAgICAgIC8qc2hpZnQzeCovc3RhY2suc2hpZnQoKTtzdGFjay5zaGlmdCgpO3N0YWNrLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dCA9IHN0YWNrLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcInRleHRcIjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHQgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJjb21tZW50XCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgbmV4dDogXCJzdGFydFwifSxcbiAgICAgICAgICAgIHtkZWZhdWx0VG9rZW46IFwiY29tbWVudFwifVxuICAgICAgICBdO1xuICAgIH1cbn07XG5cbm9vcC5pbmhlcml0cyhTYXNzSGlnaGxpZ2h0UnVsZXMsIFNjc3NIaWdobGlnaHRSdWxlcyk7XG5cbmV4cG9ydHMuU2Fzc0hpZ2hsaWdodFJ1bGVzID0gU2Fzc0hpZ2hsaWdodFJ1bGVzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0TW9kZSA9IHJlcXVpcmUoXCIuL3RleHRcIikuTW9kZTtcbnZhciBTY3NzSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9zY3NzX2hpZ2hsaWdodF9ydWxlc1wiKS5TY3NzSGlnaGxpZ2h0UnVsZXM7XG52YXIgTWF0Y2hpbmdCcmFjZU91dGRlbnQgPSByZXF1aXJlKFwiLi9tYXRjaGluZ19icmFjZV9vdXRkZW50XCIpLk1hdGNoaW5nQnJhY2VPdXRkZW50O1xudmFyIENzc0JlaGF2aW91ciA9IHJlcXVpcmUoXCIuL2JlaGF2aW91ci9jc3NcIikuQ3NzQmVoYXZpb3VyO1xudmFyIENTdHlsZUZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZGluZy9jc3R5bGVcIikuRm9sZE1vZGU7XG52YXIgQ3NzQ29tcGxldGlvbnMgPSByZXF1aXJlKFwiLi9jc3NfY29tcGxldGlvbnNcIikuQ3NzQ29tcGxldGlvbnM7XG5cblxudmFyIE1vZGUgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLkhpZ2hsaWdodFJ1bGVzID0gU2Nzc0hpZ2hsaWdodFJ1bGVzO1xuICAgIHRoaXMuJG91dGRlbnQgPSBuZXcgTWF0Y2hpbmdCcmFjZU91dGRlbnQoKTtcbiAgICB0aGlzLiRiZWhhdmlvdXIgPSBuZXcgQ3NzQmVoYXZpb3VyKCk7XG4gICAgdGhpcy4kY29tcGxldGVyID0gbmV3IENzc0NvbXBsZXRpb25zKCk7XG4gICAgdGhpcy5mb2xkaW5nUnVsZXMgPSBuZXcgQ1N0eWxlRm9sZE1vZGUoKTtcbn07XG5vb3AuaW5oZXJpdHMoTW9kZSwgVGV4dE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG4gICBcbiAgICB0aGlzLmxpbmVDb21tZW50U3RhcnQgPSBcIi8vXCI7XG4gICAgdGhpcy5ibG9ja0NvbW1lbnQgPSB7c3RhcnQ6IFwiLypcIiwgZW5kOiBcIiovXCJ9O1xuXG4gICAgdGhpcy5nZXROZXh0TGluZUluZGVudCA9IGZ1bmN0aW9uKHN0YXRlLCBsaW5lLCB0YWIpIHtcbiAgICAgICAgdmFyIGluZGVudCA9IHRoaXMuJGdldEluZGVudChsaW5lKTtcblxuICAgICAgICAvLyBpZ25vcmUgYnJhY2VzIGluIGNvbW1lbnRzXG4gICAgICAgIHZhciB0b2tlbnMgPSB0aGlzLmdldFRva2VuaXplcigpLmdldExpbmVUb2tlbnMobGluZSwgc3RhdGUpLnRva2VucztcbiAgICAgICAgaWYgKHRva2Vucy5sZW5ndGggJiYgdG9rZW5zW3Rva2Vucy5sZW5ndGgtMV0udHlwZSA9PSBcImNvbW1lbnRcIikge1xuICAgICAgICAgICAgcmV0dXJuIGluZGVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBtYXRjaCA9IGxpbmUubWF0Y2goL14uKlxce1xccyokLyk7XG4gICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgaW5kZW50ICs9IHRhYjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpbmRlbnQ7XG4gICAgfTtcblxuICAgIHRoaXMuY2hlY2tPdXRkZW50ID0gZnVuY3Rpb24oc3RhdGUsIGxpbmUsIGlucHV0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRvdXRkZW50LmNoZWNrT3V0ZGVudChsaW5lLCBpbnB1dCk7XG4gICAgfTtcblxuICAgIHRoaXMuYXV0b091dGRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgZG9jLCByb3cpIHtcbiAgICAgICAgdGhpcy4kb3V0ZGVudC5hdXRvT3V0ZGVudChkb2MsIHJvdyk7XG4gICAgfTtcbiAgICBcbiAgICB0aGlzLmdldENvbXBsZXRpb25zID0gZnVuY3Rpb24oc3RhdGUsIHNlc3Npb24sIHBvcywgcHJlZml4KSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRjb21wbGV0ZXIuZ2V0Q29tcGxldGlvbnMoc3RhdGUsIHNlc3Npb24sIHBvcywgcHJlZml4KTtcbiAgICB9O1xuXG5cbiAgICB0aGlzLiRpZCA9IFwiYWNlL21vZGUvc2Nzc1wiO1xufSkuY2FsbChNb2RlLnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTW9kZSA9IE1vZGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIGxhbmcgPSByZXF1aXJlKFwiLi4vbGliL2xhbmdcIik7XG52YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xudmFyIENzc0hpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vY3NzX2hpZ2hsaWdodF9ydWxlc1wiKTtcblxudmFyIFNjc3NIaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uKCkge1xuICAgIFxuICAgIHZhciBwcm9wZXJ0aWVzID0gbGFuZy5hcnJheVRvTWFwKENzc0hpZ2hsaWdodFJ1bGVzLnN1cHBvcnRUeXBlLnNwbGl0KFwifFwiKSk7XG5cbiAgICB2YXIgZnVuY3Rpb25zID0gbGFuZy5hcnJheVRvTWFwKFxuICAgICAgICAoXCJoc2x8aHNsYXxyZ2J8cmdiYXx1cmx8YXR0cnxjb3VudGVyfGNvdW50ZXJzfGFic3xhZGp1c3RfY29sb3J8YWRqdXN0X2h1ZXxcIiArXG4gICAgICAgICBcImFscGhhfGpvaW58Ymx1ZXxjZWlsfGNoYW5nZV9jb2xvcnxjb21wYXJhYmxlfGNvbXBsZW1lbnR8ZGFya2VufGRlc2F0dXJhdGV8XCIgKyBcbiAgICAgICAgIFwiZmxvb3J8Z3JheXNjYWxlfGdyZWVufGh1ZXxpZnxpbnZlcnR8am9pbnxsZW5ndGh8bGlnaHRlbnxsaWdodG5lc3N8bWl4fFwiICsgXG4gICAgICAgICBcIm50aHxvcGFjaWZ5fG9wYWNpdHl8cGVyY2VudGFnZXxxdW90ZXxyZWR8cm91bmR8c2F0dXJhdGV8c2F0dXJhdGlvbnxcIiArXG4gICAgICAgICBcInNjYWxlX2NvbG9yfHRyYW5zcGFyZW50aXplfHR5cGVfb2Z8dW5pdHx1bml0bGVzc3x1bnF1b3RlXCIpLnNwbGl0KFwifFwiKVxuICAgICk7XG5cbiAgICB2YXIgY29uc3RhbnRzID0gbGFuZy5hcnJheVRvTWFwKENzc0hpZ2hsaWdodFJ1bGVzLnN1cHBvcnRDb25zdGFudC5zcGxpdChcInxcIikpO1xuXG4gICAgdmFyIGNvbG9ycyA9IGxhbmcuYXJyYXlUb01hcChDc3NIaWdobGlnaHRSdWxlcy5zdXBwb3J0Q29uc3RhbnRDb2xvci5zcGxpdChcInxcIikpO1xuICAgIFxuICAgIHZhciBrZXl3b3JkcyA9IGxhbmcuYXJyYXlUb01hcChcbiAgICAgICAgKFwiQG1peGlufEBleHRlbmR8QGluY2x1ZGV8QGltcG9ydHxAbWVkaWF8QGRlYnVnfEB3YXJufEBpZnxAZm9yfEBlYWNofEB3aGlsZXxAZWxzZXxAZm9udC1mYWNlfEAtd2Via2l0LWtleWZyYW1lc3xpZnxhbmR8IWRlZmF1bHR8bW9kdWxlfGRlZnxlbmR8ZGVjbGFyZVwiKS5zcGxpdChcInxcIilcbiAgICApO1xuICAgIFxuICAgIHZhciB0YWdzID0gbGFuZy5hcnJheVRvTWFwKFxuICAgICAgICAoXCJhfGFiYnJ8YWNyb255bXxhZGRyZXNzfGFwcGxldHxhcmVhfGFydGljbGV8YXNpZGV8YXVkaW98YnxiYXNlfGJhc2Vmb250fGJkb3xcIiArIFxuICAgICAgICAgXCJiaWd8YmxvY2txdW90ZXxib2R5fGJyfGJ1dHRvbnxjYW52YXN8Y2FwdGlvbnxjZW50ZXJ8Y2l0ZXxjb2RlfGNvbHxjb2xncm91cHxcIiArIFxuICAgICAgICAgXCJjb21tYW5kfGRhdGFsaXN0fGRkfGRlbHxkZXRhaWxzfGRmbnxkaXJ8ZGl2fGRsfGR0fGVtfGVtYmVkfGZpZWxkc2V0fFwiICsgXG4gICAgICAgICBcImZpZ2NhcHRpb258ZmlndXJlfGZvbnR8Zm9vdGVyfGZvcm18ZnJhbWV8ZnJhbWVzZXR8aDF8aDJ8aDN8aDR8aDV8aDZ8aGVhZHxcIiArIFxuICAgICAgICAgXCJoZWFkZXJ8aGdyb3VwfGhyfGh0bWx8aXxpZnJhbWV8aW1nfGlucHV0fGluc3xrZXlnZW58a2JkfGxhYmVsfGxlZ2VuZHxsaXxcIiArIFxuICAgICAgICAgXCJsaW5rfG1hcHxtYXJrfG1lbnV8bWV0YXxtZXRlcnxuYXZ8bm9mcmFtZXN8bm9zY3JpcHR8b2JqZWN0fG9sfG9wdGdyb3VwfFwiICsgXG4gICAgICAgICBcIm9wdGlvbnxvdXRwdXR8cHxwYXJhbXxwcmV8cHJvZ3Jlc3N8cXxycHxydHxydWJ5fHN8c2FtcHxzY3JpcHR8c2VjdGlvbnxzZWxlY3R8XCIgKyBcbiAgICAgICAgIFwic21hbGx8c291cmNlfHNwYW58c3RyaWtlfHN0cm9uZ3xzdHlsZXxzdWJ8c3VtbWFyeXxzdXB8dGFibGV8dGJvZHl8dGR8XCIgKyBcbiAgICAgICAgIFwidGV4dGFyZWF8dGZvb3R8dGh8dGhlYWR8dGltZXx0aXRsZXx0cnx0dHx1fHVsfHZhcnx2aWRlb3x3YnJ8eG1wXCIpLnNwbGl0KFwifFwiKVxuICAgICk7XG5cbiAgICAvLyByZWdleHAgbXVzdCBub3QgaGF2ZSBjYXB0dXJpbmcgcGFyZW50aGVzZXMuIFVzZSAoPzopIGluc3RlYWQuXG4gICAgLy8gcmVnZXhwcyBhcmUgb3JkZXJlZCAtPiB0aGUgZmlyc3QgbWF0Y2ggaXMgdXNlZFxuXG4gICAgdmFyIG51bVJlID0gXCJcXFxcLT8oPzooPzpbMC05XSspfCg/OlswLTldKlxcXFwuWzAtOV0rKSlcIjtcblxuICAgIC8vIHJlZ2V4cCBtdXN0IG5vdCBoYXZlIGNhcHR1cmluZyBwYXJlbnRoZXNlcy4gVXNlICg/OikgaW5zdGVhZC5cbiAgICAvLyByZWdleHBzIGFyZSBvcmRlcmVkIC0+IHRoZSBmaXJzdCBtYXRjaCBpcyB1c2VkXG5cbiAgICB0aGlzLiRydWxlcyA9IHtcbiAgICAgICAgXCJzdGFydFwiIDogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwvXFxcXC8uKiRcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudFwiLCAvLyBtdWx0aSBsaW5lIGNvbW1lbnRcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXC9cXFxcKlwiLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcImNvbW1lbnRcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIiwgLy8gc2luZ2xlIGxpbmVcbiAgICAgICAgICAgICAgICByZWdleCA6ICdbXCJdKD86KD86XFxcXFxcXFwuKXwoPzpbXlwiXFxcXFxcXFxdKSkqP1tcIl0nXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLCAvLyBtdWx0aSBsaW5lIHN0cmluZyBzdGFydFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogJ1tcIl0uKlxcXFxcXFxcJCcsXG4gICAgICAgICAgICAgICAgbmV4dCA6IFwicXFzdHJpbmdcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIiwgLy8gc2luZ2xlIGxpbmVcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiWyddKD86KD86XFxcXFxcXFwuKXwoPzpbXidcXFxcXFxcXF0pKSo/WyddXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsIC8vIG11bHRpIGxpbmUgc3RyaW5nIHN0YXJ0XG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlsnXS4qXFxcXFxcXFwkXCIsXG4gICAgICAgICAgICAgICAgbmV4dCA6IFwicXN0cmluZ1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IG51bVJlICsgXCIoPzpjaHxjbXxkZWd8ZW18ZXh8ZnJ8Z2R8Z3JhZHxIenxpbnxrSHp8bW18bXN8cGN8cHR8cHh8cmFkfHJlbXxzfHR1cm58dmh8dm1heHx2bWlufHZtfHZ3fCUpXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLCAvLyBoZXg2IGNvbG9yXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIiNbYS1mMC05XXs2fVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIiwgLy8gaGV4MyBjb2xvclxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIjW2EtZjAtOV17M31cIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5udW1lcmljXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBudW1SZVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogW1wic3VwcG9ydC5mdW5jdGlvblwiLCBcInN0cmluZ1wiLCBcInN1cHBvcnQuZnVuY3Rpb25cIl0sXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIih1cmxcXFxcKCkoLiopKFxcXFwpKVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJvcGVydGllcy5oYXNPd25Qcm9wZXJ0eSh2YWx1ZS50b0xvd2VyQ2FzZSgpKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcInN1cHBvcnQudHlwZVwiO1xuICAgICAgICAgICAgICAgICAgICBpZiAoa2V5d29yZHMuaGFzT3duUHJvcGVydHkodmFsdWUpKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwia2V5d29yZFwiO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChjb25zdGFudHMuaGFzT3duUHJvcGVydHkodmFsdWUpKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiY29uc3RhbnQubGFuZ3VhZ2VcIjtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoZnVuY3Rpb25zLmhhc093blByb3BlcnR5KHZhbHVlKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcInN1cHBvcnQuZnVuY3Rpb25cIjtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoY29sb3JzLmhhc093blByb3BlcnR5KHZhbHVlLnRvTG93ZXJDYXNlKCkpKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwic3VwcG9ydC5jb25zdGFudC5jb2xvclwiO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0YWdzLmhhc093blByb3BlcnR5KHZhbHVlLnRvTG93ZXJDYXNlKCkpKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwidmFyaWFibGUubGFuZ3VhZ2VcIjtcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwidGV4dFwiO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwtP1tAYS16X11bQGEtejAtOV9cXFxcLV0qXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwidmFyaWFibGVcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiW2Etel9cXFxcLSRdW2EtejAtOV9cXFxcLSRdKlxcXFxiXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJ2YXJpYWJsZS5sYW5ndWFnZVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIiNbYS16MC05LV9dK1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwidmFyaWFibGUubGFuZ3VhZ2VcIixcbiAgICAgICAgICAgICAgICByZWdleDogXCJcXFxcLlthLXowLTktX10rXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJ2YXJpYWJsZS5sYW5ndWFnZVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIjpbYS16MC05LV9dK1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnRcIixcbiAgICAgICAgICAgICAgICByZWdleDogXCJbYS16MC05LV9dK1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImtleXdvcmQub3BlcmF0b3JcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiPHw+fDw9fD49fD09fCE9fC18JXwjfFxcXFwrfFxcXFwkfFxcXFwrfFxcXFwqXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwicGFyZW4ubHBhcmVuXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIltbKHtdXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwicGFyZW4ucnBhcmVuXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIltcXFxcXSl9XVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXHMrXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBjYXNlSW5zZW5zaXRpdmU6IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgXCJjb21tZW50XCIgOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIiwgLy8gY2xvc2luZyBjb21tZW50XG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwqXFxcXC9cIixcbiAgICAgICAgICAgICAgICBuZXh0IDogXCJzdGFydFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuIDogXCJjb21tZW50XCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgXCJxcXN0cmluZ1wiIDogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICByZWdleCA6ICcoPzooPzpcXFxcXFxcXC4pfCg/OlteXCJcXFxcXFxcXF0pKSo/XCInLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcInN0YXJ0XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAnLisnXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIFwicXN0cmluZ1wiIDogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiKD86KD86XFxcXFxcXFwuKXwoPzpbXidcXFxcXFxcXF0pKSo/J1wiLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcInN0YXJ0XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAnLisnXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9O1xufTtcblxub29wLmluaGVyaXRzKFNjc3NIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuZXhwb3J0cy5TY3NzSGlnaGxpZ2h0UnVsZXMgPSBTY3NzSGlnaGxpZ2h0UnVsZXM7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRNb2RlID0gcmVxdWlyZShcIi4vdGV4dFwiKS5Nb2RlO1xudmFyIFNsaW1IaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3NsaW1faGlnaGxpZ2h0X3J1bGVzXCIpLlNsaW1IaWdobGlnaHRSdWxlcztcblxudmFyIE1vZGUgPSBmdW5jdGlvbigpIHtcbiAgICBUZXh0TW9kZS5jYWxsKHRoaXMpO1xuICAgIHRoaXMuSGlnaGxpZ2h0UnVsZXMgPSBTbGltSGlnaGxpZ2h0UnVsZXM7XG4gICAgdGhpcy5jcmVhdGVNb2RlRGVsZWdhdGVzKHtcbiAgICAgICAgamF2YXNjcmlwdDogcmVxdWlyZShcIi4vamF2YXNjcmlwdFwiKS5Nb2RlLFxuICAgICAgICBtYXJrZG93bjogcmVxdWlyZShcIi4vbWFya2Rvd25cIikuTW9kZSxcbiAgICAgICAgY29mZmVlOiByZXF1aXJlKFwiLi9jb2ZmZWVcIikuTW9kZSxcbiAgICAgICAgc2NzczogcmVxdWlyZShcIi4vc2Nzc1wiKS5Nb2RlLFxuICAgICAgICBzYXNzOiByZXF1aXJlKFwiLi9zYXNzXCIpLk1vZGUsXG4gICAgICAgIGxlc3M6IHJlcXVpcmUoXCIuL2xlc3NcIikuTW9kZSxcbiAgICAgICAgcnVieTogcmVxdWlyZShcIi4vcnVieVwiKS5Nb2RlLFxuICAgICAgICBjc3M6IHJlcXVpcmUoXCIuL2Nzc1wiKS5Nb2RlXG4gICAgfSk7XG59O1xuXG5vb3AuaW5oZXJpdHMoTW9kZSwgVGV4dE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG5cbiAgICB0aGlzLiRpZCA9IFwiYWNlL21vZGUvc2xpbVwiO1xufSkuY2FsbChNb2RlLnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTW9kZSA9IE1vZGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1vZGVzID0gcmVxdWlyZShcIi4uL2NvbmZpZ1wiKS4kbW9kZXM7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90ZXh0X2hpZ2hsaWdodF9ydWxlc1wiKS5UZXh0SGlnaGxpZ2h0UnVsZXM7XG52YXIgU2xpbUhpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24oKSB7XG5cbiAgICB0aGlzLiRydWxlcyA9IHtcbiAgICAgICAgXCJzdGFydFwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwia2V5d29yZFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvXihcXHMqKShcXHcrKTpcXHMqLyxcbiAgICAgICAgICAgICAgICBvbk1hdGNoOiBmdW5jdGlvbih2YWx1ZSwgc3RhdGUsIHN0YWNrLCBsaW5lKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpbmRlbnQgPSAvXlxccyovLmV4ZWMobGluZSlbMF07XG4gICAgICAgICAgICAgICAgICAgIHZhciBtID0gdmFsdWUubWF0Y2goL14oXFxzKikoXFx3Kyk6Lyk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBsYW5ndWFnZSA9IG1bMl07XG4gICAgICAgICAgICAgICAgICAgIGlmICghL14oamF2YXNjcmlwdHxydWJ5fGNvZmZlZXxtYXJrZG93bnxjc3N8c2Nzc3xzYXNzfGxlc3MpJC8udGVzdChsYW5ndWFnZSkpXG4gICAgICAgICAgICAgICAgICAgICAgICBsYW5ndWFnZSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgIHN0YWNrLnVuc2hpZnQoXCJsYW5ndWFnZS1lbWJlZFwiLCBbXSwgW2luZGVudCwgbGFuZ3VhZ2VdLCBzdGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRva2VuO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc3RhdGVOYW1lOiBcImxhbmd1YWdlLWVtYmVkXCIsXG4gICAgICAgICAgICAgICAgbmV4dDogW3tcbiAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAvXihcXHMqKS8sXG4gICAgICAgICAgICAgICAgICAgIG9uTWF0Y2g6IGZ1bmN0aW9uKHZhbHVlLCBzdGF0ZSwgc3RhY2ssIGxpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRlbnQgPSBzdGFja1syXVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbmRlbnQubGVuZ3RoID49IHZhbHVlLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWNrLnNwbGljZSgwLCAzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHQgPSBzdGFjay5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRva2VuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0ID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbe3R5cGU6IFwidGV4dFwiLCB2YWx1ZTogaW5kZW50fV07XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG5leHQ6IFwiXCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICByZWdleDogLy4rLyxcbiAgICAgICAgICAgICAgICAgICAgb25NYXRjaDogZnVuY3Rpb24odmFsdWUsIHN0YXRlLCBzdGFjaywgbGluZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZGVudCA9IHN0YWNrWzJdWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxhbmd1YWdlID0gc3RhY2tbMl1bMV07XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZW1iZWRTdGF0ZSA9IHN0YWNrWzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobW9kZXNbbGFuZ3VhZ2VdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBtb2Rlc1tsYW5ndWFnZV0uZ2V0VG9rZW5pemVyKCkuZ2V0TGluZVRva2VucyhsaW5lLnNsaWNlKGluZGVudC5sZW5ndGgpLCBlbWJlZFN0YXRlLnNsaWNlKDApKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFja1sxXSA9IGRhdGEuc3RhdGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGEudG9rZW5zO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9rZW47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogJ2NvbnN0YW50LmJlZ2luLmphdmFzY3JpcHQuZmlsdGVyLnNsaW0nLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAnXihcXFxccyopKCk6JCdcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogJ2NvbnN0YW50LmJlZ2luLi5maWx0ZXIuc2xpbScsXG4gICAgICAgICAgICAgICAgcmVnZXg6ICdeKFxcXFxzKikocnVieSk6JCdcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogJ2NvbnN0YW50LmJlZ2luLmNvZmZlZXNjcmlwdC5maWx0ZXIuc2xpbScsXG4gICAgICAgICAgICAgICAgcmVnZXg6ICdeKFxcXFxzKikoKTokJ1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiAnY29uc3RhbnQuYmVnaW4uLmZpbHRlci5zbGltJyxcbiAgICAgICAgICAgICAgICByZWdleDogJ14oXFxcXHMqKShtYXJrZG93bik6JCdcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogJ2NvbnN0YW50LmJlZ2luLmNzcy5maWx0ZXIuc2xpbScsXG4gICAgICAgICAgICAgICAgcmVnZXg6ICdeKFxcXFxzKikoKTokJ1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiAnY29uc3RhbnQuYmVnaW4uc2Nzcy5maWx0ZXIuc2xpbScsXG4gICAgICAgICAgICAgICAgcmVnZXg6ICdeKFxcXFxzKikoKTokJ1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiAnY29uc3RhbnQuYmVnaW4uLmZpbHRlci5zbGltJyxcbiAgICAgICAgICAgICAgICByZWdleDogJ14oXFxcXHMqKShzYXNzKTokJ1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiAnY29uc3RhbnQuYmVnaW4uLmZpbHRlci5zbGltJyxcbiAgICAgICAgICAgICAgICByZWdleDogJ14oXFxcXHMqKShsZXNzKTokJ1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiAnY29uc3RhbnQuYmVnaW4uLmZpbHRlci5zbGltJyxcbiAgICAgICAgICAgICAgICByZWdleDogJ14oXFxcXHMqKShlcmIpOiQnXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46ICdrZXl3b3JkLmh0bWwudGFncy5zbGltJyxcbiAgICAgICAgICAgICAgICByZWdleDogJ14oXFxcXHMqKSgoOj9cXFxcKihcXFxcdykrKXxkb2N0eXBlIGh0bWx8YWJicnxhY3JvbnltfGFkZHJlc3N8YXBwbGV0fGFyZWF8YXJ0aWNsZXxhc2lkZXxhdWRpb3xiYXNlfGJhc2Vmb250fGJkb3xiaWd8YmxvY2txdW90ZXxib2R5fGJyfGJ1dHRvbnxjYW52YXN8Y2FwdGlvbnxjZW50ZXJ8Y2l0ZXxjb2RlfGNvbHxjb2xncm91cHxjb21tYW5kfGRhdGFsaXN0fGRkfGRlbHxkZXRhaWxzfGRpYWxvZ3xkZm58ZGlyfGRpdnxkbHxkdHxlbWJlZHxmaWVsZHNldHxmaWd1cmV8Zm9udHxmb290ZXJ8Zm9ybXxmcmFtZXxmcmFtZXNldHxoMXxoMnxoM3xoNHxoNXxoNnxoZWFkfGhlYWRlcnxoZ3JvdXB8aHJ8aHRtbHxpfGlmcmFtZXxpbWd8aW5wdXR8aW5zfGtleWdlbnxrYmR8bGFiZWx8bGVnZW5kfGxpbmt8bGl8bWFwfG1hcmt8bWVudXxtZXRhfG1ldGVyfG5hdnxub2ZyYW1lc3xub3NjcmlwdHxvYmplY3R8b2x8b3B0Z3JvdXB8b3B0aW9ufG91dHB1dHxwfHBhcmFtfHByZXxwcm9ncmVzc3xxfHJwfHJ0fHJ1Ynl8c2FtcHxzY3JpcHR8c2VjdGlvbnxzZWxlY3R8c21hbGx8c291cmNlfHNwYW58c3RyaWtlfHN0cm9uZ3xzdHlsZXxzdWJ8c3VwfHRhYmxlfHRib2R5fHRkfHRleHRhcmVhfHRmb290fHRofHRoZWFkfHRpbWV8dGl0bGV8dHJ8dHR8dWx8dmFyfHZpZGVvfHhtcHxifHV8c3xlbXxhKSg/OihbLiNdKFxcXFx3fFxcXFwuKSspK1xcXFxzPyk/XFxcXGInXG5cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogJ2tleXdvcmQuc2xpbScsXG4gICAgICAgICAgICAgICAgcmVnZXg6ICdeKFxcXFxzKikoPzooWy4jXShcXFxcd3xcXFxcLikrKStcXFxccz8pJ1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvXihcXHMqKSgnfFxcfHxcXC98KFxcLyEpKVxccyovLFxuICAgICAgICAgICAgICAgIG9uTWF0Y2g6IGZ1bmN0aW9uKHZhbCwgc3RhdGUsIHN0YWNrLCBsaW5lKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpbmRlbnQgPSAvXlxccyovLmV4ZWMobGluZSlbMF07XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGFjay5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFjay5wdXNoKHRoaXMubmV4dCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFja1swXSA9IFwibWxTdHJpbmdcIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGFjay5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFjay5wdXNoKGluZGVudC5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhY2tbMV0gPSBpbmRlbnQubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRva2VuO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbmV4dDogXCJtbFN0cmluZ1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46ICdrZXl3b3JkLmNvbnRyb2wuc2xpbScsXG4gICAgICAgICAgICAgICAgcmVnZXg6ICdeKFxcXFxzKikoXFxcXC18PT18PSknLFxuICAgICAgICAgICAgICAgIHB1c2g6IFt7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuOiAnY29udHJvbC5lbmQuc2xpbScsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAnJCcsXG4gICAgICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGluY2x1ZGU6IFwicnVieWxpbmVcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgaW5jbHVkZTogXCJtaXNjXCJcbiAgICAgICAgICAgICAgICB9XVxuXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46ICdwYXJlbicsXG4gICAgICAgICAgICAgICAgcmVnZXg6ICdcXFxcKCcsXG4gICAgICAgICAgICAgICAgcHVzaDogW3tcbiAgICAgICAgICAgICAgICAgICAgdG9rZW46ICdwYXJlbicsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAnXFxcXCknLFxuICAgICAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBpbmNsdWRlOiBcIm1pc2NcIlxuICAgICAgICAgICAgICAgIH1dXG5cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogJ3BhcmVuJyxcbiAgICAgICAgICAgICAgICByZWdleDogJ1xcXFxbJyxcbiAgICAgICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgICAgICB0b2tlbjogJ3BhcmVuJyxcbiAgICAgICAgICAgICAgICAgICAgcmVnZXg6ICdcXFxcXScsXG4gICAgICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGluY2x1ZGU6IFwibWlzY1wiXG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiBcIm1pc2NcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBcIm1sU3RyaW5nXCI6IFt7XG4gICAgICAgICAgICB0b2tlbjogXCJpbmRlbnRcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXlxccyovLFxuICAgICAgICAgICAgb25NYXRjaDogZnVuY3Rpb24odmFsLCBzdGF0ZSwgc3RhY2spIHtcbiAgICAgICAgICAgICAgICB2YXIgY3VySW5kZW50ID0gc3RhY2tbMV07XG5cbiAgICAgICAgICAgICAgICBpZiAoY3VySW5kZW50ID49IHZhbC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0ID0gXCJzdGFydFwiO1xuICAgICAgICAgICAgICAgICAgICBzdGFjay5zcGxpY2UoMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHQgPSBcIm1sU3RyaW5nXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRva2VuO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5leHQ6IFwic3RhcnRcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwic3RyaW5nXCJcbiAgICAgICAgfV0sXG4gICAgICAgIFwicnVieWxpbmVcIjogW3tcbiAgICAgICAgICAgIHRva2VuOiBcImtleXdvcmQub3BlcmF0b3IucnVieS5lbWJlZGRlZC5zbGltXCIsXG4gICAgICAgICAgICByZWdleDogXCIoPT18PSkoPD58Pjx8PCd8Jzx8PHw+KT98LVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcImxpc3QucnVieS5vcGVyYXRvcnMuc2xpbVwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiKFxcXFxiKShmb3J8aW58ZG98aWZ8ZWxzZXxlbHNpZnx1bmxlc3N8d2hpbGV8eWllbGR8bm90fGFuZHxvcilcXFxcYlwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgcmVnZXg6IFwiWyddKC4pKj9bJ11cIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIltcXFwiXSguKSo/W1xcXCJdXCJcbiAgICAgICAgfV0sXG4gICAgICAgIFwibWlzY1wiOiBbe1xuICAgICAgICAgICAgdG9rZW46ICdjbGFzcy52YXJpYWJsZS5zbGltJyxcbiAgICAgICAgICAgIHJlZ2V4OiAnXFxcXEAoW2EtekEtWl9dW2EtekEtWjAtOV9dKilcXFxcYidcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwibGlzdC5tZXRhLnNsaW1cIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIihcXFxcYikodHJ1ZXxmYWxzZXxuaWwpKFxcXFxiKVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiAna2V5d29yZC5vcGVyYXRvci5lcXVhbHMuc2xpbScsXG4gICAgICAgICAgICByZWdleDogJz0nXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgcmVnZXg6IFwiWyddKC4pKj9bJ11cIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIltcXFwiXSguKSo/W1xcXCJdXCJcbiAgICAgICAgfV1cbiAgICB9O1xuICAgIHRoaXMubm9ybWFsaXplUnVsZXMoKTtcbn07XG5cblxub29wLmluaGVyaXRzKFNsaW1IaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuZXhwb3J0cy5TbGltSGlnaGxpZ2h0UnVsZXMgPSBTbGltSGlnaGxpZ2h0UnVsZXM7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=