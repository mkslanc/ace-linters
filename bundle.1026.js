"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[1026],{

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

/***/ 23752:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var BaseFoldMode = (__webpack_require__(51358).FoldMode);
var Range = (__webpack_require__(91902)/* .Range */ .Q);

var FoldMode = exports.l = function() {};
oop.inherits(FoldMode, BaseFoldMode);

(function() {
    this.foldingStartMarker = /^(?:[=-]+\s*$|#{1,6} |`{3})/;

    this.getFoldWidget = function(session, foldStyle, row) {
        var line = session.getLine(row);
        if (!this.foldingStartMarker.test(line))
            return "";

        if (line[0] == "`") {
            if (session.bgTokenizer.getState(row) == "start")
                return "end";
            return "start";
        }

        return "start";
    };

    this.getFoldWidgetRange = function(session, foldStyle, row) {
        var line = session.getLine(row);
        var startColumn = line.length;
        var maxRow = session.getLength();
        var startRow = row;
        var endRow = row;
        if (!line.match(this.foldingStartMarker))
            return;

        if (line[0] == "`") {
            if (session.bgTokenizer.getState(row) !== "start") {
                while (++row < maxRow) {
                    line = session.getLine(row);
                    if (line[0] == "`" & line.substring(0, 3) == "```")
                        break;
                }
                return new Range(startRow, startColumn, row, 0);
            } else {
                while (row -- > 0) {
                    line = session.getLine(row);
                    if (line[0] == "`" & line.substring(0, 3) == "```")
                        break;
                }
                return new Range(row, line.length, startRow, 0);
            }
        }

        var token;
        function isHeading(row) {
            token = session.getTokens(row)[0];
            return token && token.type.lastIndexOf(heading, 0) === 0;
        }

        var heading = "markup.heading";
        function getLevel() {
            var ch = token.value[0];
            if (ch == "=") return 6;
            if (ch == "-") return 5;
            return 7 - token.value.search(/[^#]|$/);
        }

        if (isHeading(row)) {
            var startHeadingLevel = getLevel();
            while (++row < maxRow) {
                if (!isHeading(row))
                    continue;
                var level = getLevel();
                if (level >= startHeadingLevel)
                    break;
            }

            endRow = row - (!token || ["=", "-"].indexOf(token.value[0]) == -1 ? 1 : 2);

            if (endRow > startRow) {
                while (endRow > startRow && /^\s*$/.test(session.getLine(endRow)))
                    endRow--;
            }

            if (endRow > startRow) {
                var endColumn = session.getLine(endRow).length;
                return new Range(startRow, startColumn, endRow, endColumn);
            }
        }
    };

}).call(FoldMode.prototype);


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

/***/ 79686:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var LessHighlightRules = (__webpack_require__(41425).LessHighlightRules);
var MatchingBraceOutdent = (__webpack_require__(28670).MatchingBraceOutdent);
var CssBehaviour = (__webpack_require__(37028)/* .CssBehaviour */ .r);
var CssCompletions = (__webpack_require__(61952)/* .CssCompletions */ .d);

var CStyleFoldMode = (__webpack_require__(93887)/* .FoldMode */ .l);

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

/***/ 75390:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var CstyleBehaviour = (__webpack_require__(32589)/* .CstyleBehaviour */ ._);
var TextMode = (__webpack_require__(49432).Mode);
var MarkdownHighlightRules = (__webpack_require__(98137)/* .MarkdownHighlightRules */ .R);
var MarkdownFoldMode = (__webpack_require__(23752)/* .FoldMode */ .l);

var Mode = function() {
    this.HighlightRules = MarkdownHighlightRules;

    this.createModeDelegates({
        javascript: (__webpack_require__(93388).Mode),
        html: (__webpack_require__(32234).Mode),
        bash: (__webpack_require__(95052).Mode),
        sh: (__webpack_require__(95052).Mode),
        xml: (__webpack_require__(49846).Mode),
        css: (__webpack_require__(41080).Mode)
    });

    this.foldingRules = new MarkdownFoldMode();
    this.$behaviour = new CstyleBehaviour({ braces: true });
};
oop.inherits(Mode, TextMode);

(function() {
    this.type = "text";
    this.blockComment = {start: "<!--", end: "-->"};
    this.$quotes = {'"': '"', "`": "`"};

    this.getNextLineIndent = function(state, line, tab) {
        if (state == "listblock") {
            var match = /^(\s*)(?:([-+*])|(\d+)\.)(\s+)/.exec(line);
            if (!match)
                return "";
            var marker = match[2];
            if (!marker)
                marker = parseInt(match[3], 10) + 1 + ".";
            return match[1] + marker + match[4];
        } else {
            return this.$getIndent(line);
        }
    };
    this.$id = "ace/mode/markdown";
    this.snippetFileId = "ace/snippets/markdown";
}).call(Mode.prototype);

exports.Mode = Mode;


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


/***/ }),

/***/ 31525:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var SassHighlightRules = (__webpack_require__(96930).SassHighlightRules);
var FoldMode = (__webpack_require__(69261)/* .FoldMode */ .l);

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

/***/ 72007:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var ScssHighlightRules = (__webpack_require__(23124).ScssHighlightRules);
var MatchingBraceOutdent = (__webpack_require__(28670).MatchingBraceOutdent);
var CssBehaviour = (__webpack_require__(37028)/* .CssBehaviour */ .r);
var CStyleFoldMode = (__webpack_require__(93887)/* .FoldMode */ .l);
var CssCompletions = (__webpack_require__(61952)/* .CssCompletions */ .d);


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

/***/ 95052:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var ShHighlightRules = (__webpack_require__(55359).ShHighlightRules);
var Range = (__webpack_require__(91902)/* .Range */ .Q);
var CStyleFoldMode = (__webpack_require__(93887)/* .FoldMode */ .l);

var Mode = function() {
    this.HighlightRules = ShHighlightRules;
    this.foldingRules = new CStyleFoldMode();
    this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, TextMode);

(function() {

   
    this.lineCommentStart = "#";

    this.getNextLineIndent = function(state, line, tab) {
        var indent = this.$getIndent(line);

        var tokenizedLine = this.getTokenizer().getLineTokens(line, state);
        var tokens = tokenizedLine.tokens;

        if (tokens.length && tokens[tokens.length-1].type == "comment") {
            return indent;
        }

        if (state == "start") {
            var match = line.match(/^.*[\{\(\[:]\s*$/);
            if (match) {
                indent += tab;
            }
        }

        return indent;
    };

    var outdents = {
        "pass": 1,
        "return": 1,
        "raise": 1,
        "break": 1,
        "continue": 1
    };

    this.checkOutdent = function(state, line, input) {
        if (input !== "\r\n" && input !== "\r" && input !== "\n")
            return false;

        var tokens = this.getTokenizer().getLineTokens(line.trim(), state).tokens;

        if (!tokens)
            return false;

        // ignore trailing comments
        do {
            var last = tokens.pop();
        } while (last && (last.type == "comment" || (last.type == "text" && last.value.match(/^\s+$/))));

        if (!last)
            return false;

        return (last.type == "keyword" && outdents[last.value]);
    };

    this.autoOutdent = function(state, doc, row) {
        // outdenting in sh is slightly different because it always applies
        // to the next line and only of a new line is inserted

        row += 1;
        var indent = this.$getIndent(doc.getLine(row));
        var tab = doc.getTabString();
        if (indent.slice(-tab.length) == tab)
            doc.remove(new Range(row, indent.length-tab.length, row, indent.length));
    };

    this.$id = "ace/mode/sh";
    this.snippetFileId = "ace/snippets/sh";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 55359:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

var reservedKeywords = exports.reservedKeywords = (
        '!|{|}|case|do|done|elif|else|'+
        'esac|fi|for|if|in|then|until|while|'+
        '&|;|export|local|read|typeset|unset|'+
        'elif|select|set|function|declare|readonly'
    );

var languageConstructs = exports.languageConstructs = (
    '[|]|alias|bg|bind|break|builtin|'+
     'cd|command|compgen|complete|continue|'+
     'dirs|disown|echo|enable|eval|exec|'+
     'exit|fc|fg|getopts|hash|help|history|'+
     'jobs|kill|let|logout|popd|printf|pushd|'+
     'pwd|return|set|shift|shopt|source|'+
     'suspend|test|times|trap|type|ulimit|'+
     'umask|unalias|wait'
);

var ShHighlightRules = function() {
    var keywordMapper = this.createKeywordMapper({
        "keyword": reservedKeywords,
        "support.function.builtin": languageConstructs,
        "invalid.deprecated": "debugger"
    }, "identifier");

    var integer = "(?:(?:[1-9]\\d*)|(?:0))";
    // var integer = "(?:" + decimalInteger + ")";

    var fraction = "(?:\\.\\d+)";
    var intPart = "(?:\\d+)";
    var pointFloat = "(?:(?:" + intPart + "?" + fraction + ")|(?:" + intPart + "\\.))";
    var exponentFloat = "(?:(?:" + pointFloat + "|" +  intPart + ")" + ")";
    var floatNumber = "(?:" + exponentFloat + "|" + pointFloat + ")";
    var fileDescriptor = "(?:&" + intPart + ")";

    var variableName = "[a-zA-Z_][a-zA-Z0-9_]*";
    var variable = "(?:" + variableName + "(?==))";

    var builtinVariable = "(?:\\$(?:SHLVL|\\$|\\!|\\?))";

    var func = "(?:" + variableName + "\\s*\\(\\))";

    this.$rules = {
        "start" : [{
            token : "constant",
            regex : /\\./
        }, {
            token : ["text", "comment"],
            regex : /(^|\s)(#.*)$/
        }, {
            token : "string.start",
            regex : '"',
            push : [{
                token : "constant.language.escape",
                regex : /\\(?:[$`"\\]|$)/
            }, {
                include : "variables"
            }, {
                token : "keyword.operator",
                regex : /`/ // TODO highlight `
            }, {
                token : "string.end",
                regex : '"',
                next: "pop"
            }, {
                defaultToken: "string"
            }]
        }, {
            token : "string",
            regex : "\\$'",
            push : [{
                token : "constant.language.escape",
                regex : /\\(?:[abeEfnrtv\\'"]|x[a-fA-F\d]{1,2}|u[a-fA-F\d]{4}([a-fA-F\d]{4})?|c.|\d{1,3})/
            }, {
                token : "string",
                regex : "'",
                next: "pop"
            }, {
                defaultToken: "string"
            }]
        }, {
            regex : "<<<",
            token : "keyword.operator"
        }, {
            stateName: "heredoc",
            regex : "(<<-?)(\\s*)(['\"`]?)([\\w\\-]+)(['\"`]?)",
            onMatch : function(value, currentState, stack) {
                var next = value[2] == '-' ? "indentedHeredoc" : "heredoc";
                var tokens = value.split(this.splitRegex);
                stack.push(next, tokens[4]);
                return [
                    {type:"constant", value: tokens[1]},
                    {type:"text", value: tokens[2]},
                    {type:"string", value: tokens[3]},
                    {type:"support.class", value: tokens[4]},
                    {type:"string", value: tokens[5]}
                ];
            },
            rules: {
                heredoc: [{
                    onMatch:  function(value, currentState, stack) {
                        if (value === stack[1]) {
                            stack.shift();
                            stack.shift();
                            this.next = stack[0] || "start";
                            return "support.class";
                        }
                        this.next = "";
                        return "string";
                    },
                    regex: ".*$",
                    next: "start"
                }],
                indentedHeredoc: [{
                    token: "string",
                    regex: "^\t+"
                }, {
                    onMatch:  function(value, currentState, stack) {
                        if (value === stack[1]) {
                            stack.shift();
                            stack.shift();
                            this.next = stack[0] || "start";
                            return "support.class";
                        }
                        this.next = "";
                        return "string";
                    },
                    regex: ".*$",
                    next: "start"
                }]
            }
        }, {
            regex : "$",
            token : "empty",
            next : function(currentState, stack) {
                if (stack[0] === "heredoc" || stack[0] === "indentedHeredoc")
                    return stack[0];
                return currentState;
            }
        }, {
            token : ["keyword", "text", "text", "text", "variable"],
            regex : /(declare|local|readonly)(\s+)(?:(-[fixar]+)(\s+))?([a-zA-Z_][a-zA-Z0-9_]*\b)/
        }, {
            token : "variable.language",
            regex : builtinVariable
        }, {
            token : "variable",
            regex : variable
        }, {
            include : "variables"
        }, {
            token : "support.function",
            regex : func
        }, {
            token : "support.function",
            regex : fileDescriptor
        }, {
            token : "string",           // ' string
            start : "'", end : "'"
        }, {
            token : "constant.numeric", // float
            regex : floatNumber
        }, {
            token : "constant.numeric", // integer
            regex : integer + "\\b"
        }, {
            token : keywordMapper,
            regex : "[a-zA-Z_][a-zA-Z0-9_]*\\b"
        }, {
            token : "keyword.operator",
            regex : "\\+|\\-|\\*|\\*\\*|\\/|\\/\\/|~|<|>|<=|=>|=|!=|[%&|`]"
        }, {
            token : "punctuation.operator",
            regex : ";"
        }, {
            token : "paren.lparen",
            regex : "[\\[\\(\\{]"
        }, {
            token : "paren.rparen",
            regex : "[\\]]"
        }, {
            token : "paren.rparen",
            regex : "[\\)\\}]",
            next : "pop"
        }],
        variables: [{
            token : "variable",
            regex : /(\$)(\w+)/
        }, {
            token : ["variable", "paren.lparen"],
            regex : /(\$)(\()/,
            push : "start"
        }, {
            token : ["variable", "paren.lparen", "keyword.operator", "variable", "keyword.operator"],
            regex : /(\$)(\{)([#!]?)(\w+|[*@#?\-$!0_])(:[?+\-=]?|##?|%%?|,,?\/|\^\^?)?/,
            push : "start"
        }, {
            token : "variable",
            regex : /\$[*@#?\-$!0_]/
        }, {
            token : ["variable", "paren.lparen"],
            regex : /(\$)(\{)/,
            push : "start"
        }]
    };
    
    this.normalizeRules();
};

oop.inherits(ShHighlightRules, TextHighlightRules);

exports.ShHighlightRules = ShHighlightRules;


/***/ }),

/***/ 41026:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var SlimHighlightRules = (__webpack_require__(95253).SlimHighlightRules);

var Mode = function() {
    TextMode.call(this);
    this.HighlightRules = SlimHighlightRules;
    this.createModeDelegates({
        javascript: (__webpack_require__(93388).Mode),
        markdown: (__webpack_require__(75390).Mode),
        coffee: (__webpack_require__(61079).Mode),
        scss: (__webpack_require__(72007).Mode),
        sass: (__webpack_require__(31525).Mode),
        less: (__webpack_require__(79686).Mode),
        ruby: (__webpack_require__(11067).Mode),
        css: (__webpack_require__(41080).Mode)
    });
};

oop.inherits(Mode, TextMode);

(function() {

    this.$id = "ace/mode/slim";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 49846:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var lang = __webpack_require__(39955);
var TextMode = (__webpack_require__(49432).Mode);
var XmlHighlightRules = (__webpack_require__(54849)/* .XmlHighlightRules */ .l);
var XmlBehaviour = (__webpack_require__(63458).XmlBehaviour);
var XmlFoldMode = (__webpack_require__(79712)/* .FoldMode */ .l);
var WorkerClient = (__webpack_require__(28402).WorkerClient);

var Mode = function() {
   this.HighlightRules = XmlHighlightRules;
   this.$behaviour = new XmlBehaviour();
   this.foldingRules = new XmlFoldMode();
};

oop.inherits(Mode, TextMode);

(function() {

    this.voidElements = lang.arrayToMap([]);

    this.blockComment = {start: "<!--", end: "-->"};

    this.createWorker = function(session) {
        var worker = new WorkerClient(["ace"], "ace/mode/xml_worker", "Worker");
        worker.attachToDocument(session.getDocument());

        worker.on("error", function(e) {
            session.setAnnotations(e.data);
        });

        worker.on("terminate", function() {
            session.clearAnnotations();
        });

        return worker;
    };
    
    this.$id = "ace/mode/xml";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7O0FBRUEsb0lBQW9JO0FBQ3BJLHNEQUFzRDs7QUFFdEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx1REFBdUQ7QUFDdkQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHVEQUF1RDtBQUN2RDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkRBQTZELFFBQVE7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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Q0FBK0M7O0FBRWxFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEseUJBQXlCOztBQUV6QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVELFlBQVkiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2NvZmZlZS5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2ZvbGRpbmcvY29mZmVlLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvZm9sZGluZy9tYXJrZG93bi5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2ZvbGRpbmcvcnVieS5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2xlc3MuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9tYXJrZG93bi5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL3J1YnkuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9zYXNzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvc2Nzcy5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL3NoLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvc2hfaGlnaGxpZ2h0X3J1bGVzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvc2xpbS5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL3htbC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIFJ1bGVzID0gcmVxdWlyZShcIi4vY29mZmVlX2hpZ2hsaWdodF9ydWxlc1wiKS5Db2ZmZWVIaWdobGlnaHRSdWxlcztcbnZhciBPdXRkZW50ID0gcmVxdWlyZShcIi4vbWF0Y2hpbmdfYnJhY2Vfb3V0ZGVudFwiKS5NYXRjaGluZ0JyYWNlT3V0ZGVudDtcbnZhciBGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRpbmcvY29mZmVlXCIpLkZvbGRNb2RlO1xudmFyIFJhbmdlID0gcmVxdWlyZShcIi4uL3JhbmdlXCIpLlJhbmdlO1xudmFyIFRleHRNb2RlID0gcmVxdWlyZShcIi4vdGV4dFwiKS5Nb2RlO1xudmFyIFdvcmtlckNsaWVudCA9IHJlcXVpcmUoXCIuLi93b3JrZXIvd29ya2VyX2NsaWVudFwiKS5Xb3JrZXJDbGllbnQ7XG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG5cbmZ1bmN0aW9uIE1vZGUoKSB7XG4gICAgdGhpcy5IaWdobGlnaHRSdWxlcyA9IFJ1bGVzO1xuICAgIHRoaXMuJG91dGRlbnQgPSBuZXcgT3V0ZGVudCgpO1xuICAgIHRoaXMuZm9sZGluZ1J1bGVzID0gbmV3IEZvbGRNb2RlKCk7XG59XG5cbm9vcC5pbmhlcml0cyhNb2RlLCBUZXh0TW9kZSk7XG5cbihmdW5jdGlvbigpIHtcbiAgICBcbiAgICAvKjpcbiAgICAgIFsoe1s9Ol0gICAgICAgICMgT3BlbmluZyBwYXJlbnRoZXNlcyBvciBicmFja2V0c1xuICAgICB8Wy09XT4gICAgICAgICAgIyBPUiBzaW5nbGUgb3IgZG91YmxlIGFycm93XG4gICAgIHxcXGIoPzogICAgICAgICAgIyBPUiBvbmUgb2YgdGhlc2Ugd29yZHM6XG4gICAgICAgZWxzZSAgICAgICAgICAjICAgIGVsc2VcbiAgICAgIHx0cnkgICAgICAgICAgICMgT1IgdHJ5XG4gICAgICB8KD86c3dpfGNhKXRjaCAjIE9SIGNhdGNoLCBvcHRpb25hbGx5IGZvbGxvd2VkIGJ5OlxuICAgICAgICAoPzpcXHMqWyRBLVphLXpfXFx4N2YtXFx1ZmZmZl1bJFxcd1xceDdmLVxcdWZmZmZdKik/ICAjIGEgdmFyaWFibGVcbiAgICAgIHxmaW5hbGx5ICAgICAgICMgT1IgZmluYWxseVxuICAgICApKVxccyokICAgICAgICAgICMgYWxsIGFzIHRoZSBsYXN0IHRoaW5nIG9uIGEgbGluZSAoYWxsb3dpbmcgdHJhaWxpbmcgc3BhY2UpXG4gICAgfCAgICAgICAgICAgICAgICAjIC0tLS0gT1IgLS0tLSA6XG4gICAgXlxccyogICAgICAgICAgICAgIyBhIGxpbmUgc3RhcnRpbmcgd2l0aCBvcHRpb25hbCBzcGFjZVxuICAgIChlbHNlXFxiXFxzKik/ICAgICAjIGZvbGxvd2VkIGJ5IGFuIG9wdGlvbmFsIFwiZWxzZVwiXG4gICAgKD86ICAgICAgICAgICAgICAjIGZvbGxvd2VkIGJ5IG9uZSBvZiB0aGUgZm9sbG93aW5nOlxuICAgICAgIGlmICAgICAgICAgICAgIyAgICBpZlxuICAgICAgfGZvciAgICAgICAgICAgIyBPUiBmb3JcbiAgICAgIHx3aGlsZSAgICAgICAgICMgT1Igd2hpbGVcbiAgICAgIHxsb29wICAgICAgICAgICMgT1IgbG9vcFxuICAgIClcXGIgICAgICAgICAgICAgICMgICAgKGFzIGEgd29yZClcbiAgICAoPyEuKlxcYnRoZW5cXGIpICAgIyAuLi4gYnV0IE5PVCBmb2xsb3dlZCBieSBcInRoZW5cIiBvbiB0aGUgbGluZVxuICAgICovXG4gICAgdmFyIGluZGVudGVyID0gLyg/Olsoe1s9Ol18Wy09XT58XFxiKD86ZWxzZXx0cnl8KD86c3dpfGNhKXRjaCg/OlxccytbJEEtWmEtel9cXHg3Zi1cXHVmZmZmXVskXFx3XFx4N2YtXFx1ZmZmZl0qKT98ZmluYWxseSkpXFxzKiR8XlxccyooZWxzZVxcYlxccyopPyg/OmlmfGZvcnx3aGlsZXxsb29wKVxcYig/IS4qXFxidGhlblxcYikvO1xuICAgIFxuICAgIHRoaXMubGluZUNvbW1lbnRTdGFydCA9IFwiI1wiO1xuICAgIHRoaXMuYmxvY2tDb21tZW50ID0ge3N0YXJ0OiBcIiMjI1wiLCBlbmQ6IFwiIyMjXCJ9O1xuICAgIFxuICAgIHRoaXMuZ2V0TmV4dExpbmVJbmRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgbGluZSwgdGFiKSB7XG4gICAgICAgIHZhciBpbmRlbnQgPSB0aGlzLiRnZXRJbmRlbnQobGluZSk7XG4gICAgICAgIHZhciB0b2tlbnMgPSB0aGlzLmdldFRva2VuaXplcigpLmdldExpbmVUb2tlbnMobGluZSwgc3RhdGUpLnRva2VucztcbiAgICBcbiAgICAgICAgaWYgKCEodG9rZW5zLmxlbmd0aCAmJiB0b2tlbnNbdG9rZW5zLmxlbmd0aCAtIDFdLnR5cGUgPT09ICdjb21tZW50JykgJiZcbiAgICAgICAgICAgIHN0YXRlID09PSAnc3RhcnQnICYmIGluZGVudGVyLnRlc3QobGluZSkpXG4gICAgICAgICAgICBpbmRlbnQgKz0gdGFiO1xuICAgICAgICByZXR1cm4gaW5kZW50O1xuICAgIH07XG4gICAgXG4gICAgdGhpcy5jaGVja091dGRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgbGluZSwgaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJG91dGRlbnQuY2hlY2tPdXRkZW50KGxpbmUsIGlucHV0KTtcbiAgICB9O1xuICAgIFxuICAgIHRoaXMuYXV0b091dGRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgZG9jLCByb3cpIHtcbiAgICAgICAgdGhpcy4kb3V0ZGVudC5hdXRvT3V0ZGVudChkb2MsIHJvdyk7XG4gICAgfTtcbiAgICBcbiAgICB0aGlzLmNyZWF0ZVdvcmtlciA9IGZ1bmN0aW9uKHNlc3Npb24pIHtcbiAgICAgICAgdmFyIHdvcmtlciA9IG5ldyBXb3JrZXJDbGllbnQoW1wiYWNlXCJdLCBcImFjZS9tb2RlL2NvZmZlZV93b3JrZXJcIiwgXCJXb3JrZXJcIik7XG4gICAgICAgIHdvcmtlci5hdHRhY2hUb0RvY3VtZW50KHNlc3Npb24uZ2V0RG9jdW1lbnQoKSk7XG4gICAgICAgIFxuICAgICAgICB3b3JrZXIub24oXCJhbm5vdGF0ZVwiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBzZXNzaW9uLnNldEFubm90YXRpb25zKGUuZGF0YSk7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgd29ya2VyLm9uKFwidGVybWluYXRlXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2Vzc2lvbi5jbGVhckFubm90YXRpb25zKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHdvcmtlcjtcbiAgICB9O1xuXG4gICAgdGhpcy4kaWQgPSBcImFjZS9tb2RlL2NvZmZlZVwiO1xuICAgIHRoaXMuc25pcHBldEZpbGVJZCA9IFwiYWNlL3NuaXBwZXRzL2NvZmZlZVwiO1xufSkuY2FsbChNb2RlLnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTW9kZSA9IE1vZGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi8uLi9saWIvb29wXCIpO1xudmFyIEJhc2VGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRfbW9kZVwiKS5Gb2xkTW9kZTtcbnZhciBSYW5nZSA9IHJlcXVpcmUoXCIuLi8uLi9yYW5nZVwiKS5SYW5nZTtcblxudmFyIEZvbGRNb2RlID0gZXhwb3J0cy5Gb2xkTW9kZSA9IGZ1bmN0aW9uKCkge307XG5vb3AuaW5oZXJpdHMoRm9sZE1vZGUsIEJhc2VGb2xkTW9kZSk7XG5cbihmdW5jdGlvbigpIHtcbiAgICB0aGlzLmNvbW1lbnRCbG9jayA9IGZ1bmN0aW9uKHNlc3Npb24sIHJvdykge1xuICAgICAgICB2YXIgcmUgPSAvXFxTLztcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgdmFyIHN0YXJ0TGV2ZWwgPSBsaW5lLnNlYXJjaChyZSk7XG4gICAgICAgIGlmIChzdGFydExldmVsID09IC0xIHx8IGxpbmVbc3RhcnRMZXZlbF0gIT0gXCIjXCIpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdmFyIHN0YXJ0Q29sdW1uID0gbGluZS5sZW5ndGg7XG4gICAgICAgIHZhciBtYXhSb3cgPSBzZXNzaW9uLmdldExlbmd0aCgpO1xuICAgICAgICB2YXIgc3RhcnRSb3cgPSByb3c7XG4gICAgICAgIHZhciBlbmRSb3cgPSByb3c7XG5cbiAgICAgICAgd2hpbGUgKCsrcm93IDwgbWF4Um93KSB7XG4gICAgICAgICAgICBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgICAgICB2YXIgbGV2ZWwgPSBsaW5lLnNlYXJjaChyZSk7XG5cbiAgICAgICAgICAgIGlmIChsZXZlbCA9PSAtMSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcblxuICAgICAgICAgICAgaWYgKGxpbmVbbGV2ZWxdICE9IFwiI1wiKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBlbmRSb3cgPSByb3c7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW5kUm93ID4gc3RhcnRSb3cpIHtcbiAgICAgICAgICAgIHZhciBlbmRDb2x1bW4gPSBzZXNzaW9uLmdldExpbmUoZW5kUm93KS5sZW5ndGg7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFJhbmdlKHN0YXJ0Um93LCBzdGFydENvbHVtbiwgZW5kUm93LCBlbmRDb2x1bW4pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMuZ2V0Rm9sZFdpZGdldFJhbmdlID0gZnVuY3Rpb24oc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpIHtcbiAgICAgICAgdmFyIHJhbmdlID0gdGhpcy5pbmRlbnRhdGlvbkJsb2NrKHNlc3Npb24sIHJvdyk7XG4gICAgICAgIGlmIChyYW5nZSlcbiAgICAgICAgICAgIHJldHVybiByYW5nZTtcblxuICAgICAgICByYW5nZSA9IHRoaXMuY29tbWVudEJsb2NrKHNlc3Npb24sIHJvdyk7XG4gICAgICAgIGlmIChyYW5nZSlcbiAgICAgICAgICAgIHJldHVybiByYW5nZTtcbiAgICB9O1xuXG4gICAgLy8gbXVzdCByZXR1cm4gXCJcIiBpZiB0aGVyZSdzIG5vIGZvbGQsIHRvIGVuYWJsZSBjYWNoaW5nXG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0ID0gZnVuY3Rpb24oc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgdmFyIGluZGVudCA9IGxpbmUuc2VhcmNoKC9cXFMvKTtcbiAgICAgICAgdmFyIG5leHQgPSBzZXNzaW9uLmdldExpbmUocm93ICsgMSk7XG4gICAgICAgIHZhciBwcmV2ID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyAtIDEpO1xuICAgICAgICB2YXIgcHJldkluZGVudCA9IHByZXYuc2VhcmNoKC9cXFMvKTtcbiAgICAgICAgdmFyIG5leHRJbmRlbnQgPSBuZXh0LnNlYXJjaCgvXFxTLyk7XG5cbiAgICAgICAgaWYgKGluZGVudCA9PSAtMSkge1xuICAgICAgICAgICAgc2Vzc2lvbi5mb2xkV2lkZ2V0c1tyb3cgLSAxXSA9IHByZXZJbmRlbnQhPSAtMSAmJiBwcmV2SW5kZW50IDwgbmV4dEluZGVudCA/IFwic3RhcnRcIiA6IFwiXCI7XG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGRvY3VtZW50YXRpb24gY29tbWVudHNcbiAgICAgICAgaWYgKHByZXZJbmRlbnQgPT0gLTEpIHtcbiAgICAgICAgICAgIGlmIChpbmRlbnQgPT0gbmV4dEluZGVudCAmJiBsaW5lW2luZGVudF0gPT0gXCIjXCIgJiYgbmV4dFtpbmRlbnRdID09IFwiI1wiKSB7XG4gICAgICAgICAgICAgICAgc2Vzc2lvbi5mb2xkV2lkZ2V0c1tyb3cgLSAxXSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgc2Vzc2lvbi5mb2xkV2lkZ2V0c1tyb3cgKyAxXSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwic3RhcnRcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChwcmV2SW5kZW50ID09IGluZGVudCAmJiBsaW5lW2luZGVudF0gPT0gXCIjXCIgJiYgcHJldltpbmRlbnRdID09IFwiI1wiKSB7XG4gICAgICAgICAgICBpZiAoc2Vzc2lvbi5nZXRMaW5lKHJvdyAtIDIpLnNlYXJjaCgvXFxTLykgPT0gLTEpIHtcbiAgICAgICAgICAgICAgICBzZXNzaW9uLmZvbGRXaWRnZXRzW3JvdyAtIDFdID0gXCJzdGFydFwiO1xuICAgICAgICAgICAgICAgIHNlc3Npb24uZm9sZFdpZGdldHNbcm93ICsgMV0gPSBcIlwiO1xuICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByZXZJbmRlbnQhPSAtMSAmJiBwcmV2SW5kZW50IDwgaW5kZW50KVxuICAgICAgICAgICAgc2Vzc2lvbi5mb2xkV2lkZ2V0c1tyb3cgLSAxXSA9IFwic3RhcnRcIjtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgc2Vzc2lvbi5mb2xkV2lkZ2V0c1tyb3cgLSAxXSA9IFwiXCI7XG5cbiAgICAgICAgaWYgKGluZGVudCA8IG5leHRJbmRlbnQpXG4gICAgICAgICAgICByZXR1cm4gXCJzdGFydFwiO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICB9O1xuXG59KS5jYWxsKEZvbGRNb2RlLnByb3RvdHlwZSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi8uLi9saWIvb29wXCIpO1xudmFyIEJhc2VGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRfbW9kZVwiKS5Gb2xkTW9kZTtcbnZhciBSYW5nZSA9IHJlcXVpcmUoXCIuLi8uLi9yYW5nZVwiKS5SYW5nZTtcblxudmFyIEZvbGRNb2RlID0gZXhwb3J0cy5Gb2xkTW9kZSA9IGZ1bmN0aW9uKCkge307XG5vb3AuaW5oZXJpdHMoRm9sZE1vZGUsIEJhc2VGb2xkTW9kZSk7XG5cbihmdW5jdGlvbigpIHtcbiAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlciA9IC9eKD86Wz0tXStcXHMqJHwjezEsNn0gfGB7M30pLztcblxuICAgIHRoaXMuZ2V0Rm9sZFdpZGdldCA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgIGlmICghdGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIudGVzdChsaW5lKSlcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xuXG4gICAgICAgIGlmIChsaW5lWzBdID09IFwiYFwiKSB7XG4gICAgICAgICAgICBpZiAoc2Vzc2lvbi5iZ1Rva2VuaXplci5nZXRTdGF0ZShyb3cpID09IFwic3RhcnRcIilcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJlbmRcIjtcbiAgICAgICAgICAgIHJldHVybiBcInN0YXJ0XCI7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gXCJzdGFydFwiO1xuICAgIH07XG5cbiAgICB0aGlzLmdldEZvbGRXaWRnZXRSYW5nZSA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgIHZhciBzdGFydENvbHVtbiA9IGxpbmUubGVuZ3RoO1xuICAgICAgICB2YXIgbWF4Um93ID0gc2Vzc2lvbi5nZXRMZW5ndGgoKTtcbiAgICAgICAgdmFyIHN0YXJ0Um93ID0gcm93O1xuICAgICAgICB2YXIgZW5kUm93ID0gcm93O1xuICAgICAgICBpZiAoIWxpbmUubWF0Y2godGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIpKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIGlmIChsaW5lWzBdID09IFwiYFwiKSB7XG4gICAgICAgICAgICBpZiAoc2Vzc2lvbi5iZ1Rva2VuaXplci5nZXRTdGF0ZShyb3cpICE9PSBcInN0YXJ0XCIpIHtcbiAgICAgICAgICAgICAgICB3aGlsZSAoKytyb3cgPCBtYXhSb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobGluZVswXSA9PSBcImBcIiAmIGxpbmUuc3Vic3RyaW5nKDAsIDMpID09IFwiYGBgXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShzdGFydFJvdywgc3RhcnRDb2x1bW4sIHJvdywgMCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHdoaWxlIChyb3cgLS0gPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxpbmVbMF0gPT0gXCJgXCIgJiBsaW5lLnN1YnN0cmluZygwLCAzKSA9PSBcImBgYFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUmFuZ2Uocm93LCBsaW5lLmxlbmd0aCwgc3RhcnRSb3csIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHRva2VuO1xuICAgICAgICBmdW5jdGlvbiBpc0hlYWRpbmcocm93KSB7XG4gICAgICAgICAgICB0b2tlbiA9IHNlc3Npb24uZ2V0VG9rZW5zKHJvdylbMF07XG4gICAgICAgICAgICByZXR1cm4gdG9rZW4gJiYgdG9rZW4udHlwZS5sYXN0SW5kZXhPZihoZWFkaW5nLCAwKSA9PT0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBoZWFkaW5nID0gXCJtYXJrdXAuaGVhZGluZ1wiO1xuICAgICAgICBmdW5jdGlvbiBnZXRMZXZlbCgpIHtcbiAgICAgICAgICAgIHZhciBjaCA9IHRva2VuLnZhbHVlWzBdO1xuICAgICAgICAgICAgaWYgKGNoID09IFwiPVwiKSByZXR1cm4gNjtcbiAgICAgICAgICAgIGlmIChjaCA9PSBcIi1cIikgcmV0dXJuIDU7XG4gICAgICAgICAgICByZXR1cm4gNyAtIHRva2VuLnZhbHVlLnNlYXJjaCgvW14jXXwkLyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNIZWFkaW5nKHJvdykpIHtcbiAgICAgICAgICAgIHZhciBzdGFydEhlYWRpbmdMZXZlbCA9IGdldExldmVsKCk7XG4gICAgICAgICAgICB3aGlsZSAoKytyb3cgPCBtYXhSb3cpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWlzSGVhZGluZyhyb3cpKVxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB2YXIgbGV2ZWwgPSBnZXRMZXZlbCgpO1xuICAgICAgICAgICAgICAgIGlmIChsZXZlbCA+PSBzdGFydEhlYWRpbmdMZXZlbClcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGVuZFJvdyA9IHJvdyAtICghdG9rZW4gfHwgW1wiPVwiLCBcIi1cIl0uaW5kZXhPZih0b2tlbi52YWx1ZVswXSkgPT0gLTEgPyAxIDogMik7XG5cbiAgICAgICAgICAgIGlmIChlbmRSb3cgPiBzdGFydFJvdykge1xuICAgICAgICAgICAgICAgIHdoaWxlIChlbmRSb3cgPiBzdGFydFJvdyAmJiAvXlxccyokLy50ZXN0KHNlc3Npb24uZ2V0TGluZShlbmRSb3cpKSlcbiAgICAgICAgICAgICAgICAgICAgZW5kUm93LS07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChlbmRSb3cgPiBzdGFydFJvdykge1xuICAgICAgICAgICAgICAgIHZhciBlbmRDb2x1bW4gPSBzZXNzaW9uLmdldExpbmUoZW5kUm93KS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShzdGFydFJvdywgc3RhcnRDb2x1bW4sIGVuZFJvdywgZW5kQ29sdW1uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbn0pLmNhbGwoRm9sZE1vZGUucHJvdG90eXBlKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uLy4uL2xpYi9vb3BcIik7XG52YXIgQmFzZUZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZF9tb2RlXCIpLkZvbGRNb2RlO1xudmFyIFJhbmdlID0gcmVxdWlyZShcIi4uLy4uL3JhbmdlXCIpLlJhbmdlO1xudmFyIFRva2VuSXRlcmF0b3IgPSByZXF1aXJlKFwiLi4vLi4vdG9rZW5faXRlcmF0b3JcIikuVG9rZW5JdGVyYXRvcjtcblxuXG52YXIgRm9sZE1vZGUgPSBleHBvcnRzLkZvbGRNb2RlID0gZnVuY3Rpb24gKCkge1xufTtcblxub29wLmluaGVyaXRzKEZvbGRNb2RlLCBCYXNlRm9sZE1vZGUpO1xuXG4oZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuaW5kZW50S2V5d29yZHMgPSB7XG4gICAgICAgIFwiY2xhc3NcIjogMSxcbiAgICAgICAgXCJkZWZcIjogMSxcbiAgICAgICAgXCJtb2R1bGVcIjogMSxcbiAgICAgICAgXCJkb1wiOiAxLFxuICAgICAgICBcInVubGVzc1wiOiAxLFxuICAgICAgICBcImlmXCI6IDEsXG4gICAgICAgIFwid2hpbGVcIjogMSxcbiAgICAgICAgXCJmb3JcIjogMSxcbiAgICAgICAgXCJ1bnRpbFwiOiAxLFxuICAgICAgICBcImJlZ2luXCI6IDEsXG4gICAgICAgIFwiZWxzZVwiOiAwLFxuICAgICAgICBcImVsc2lmXCI6IDAsXG4gICAgICAgIFwicmVzY3VlXCI6IDAsXG4gICAgICAgIFwiZW5zdXJlXCI6IDAsXG4gICAgICAgIFwid2hlblwiOiAwLFxuICAgICAgICBcImVuZFwiOiAtMSxcbiAgICAgICAgXCJjYXNlXCI6IDEsXG4gICAgICAgIFwiPWJlZ2luXCI6IDEsXG4gICAgICAgIFwiPWVuZFwiOiAtMVxuICAgIH07XG5cbiAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlciA9IC8oPzpcXHN8XikoZGVmfGRvfHdoaWxlfGNsYXNzfHVubGVzc3xtb2R1bGV8aWZ8Zm9yfHVudGlsfGJlZ2lufGVsc2V8ZWxzaWZ8Y2FzZXxyZXNjdWV8ZW5zdXJlfHdoZW4pXFxifCh7XFxzKiQpfCg9YmVnaW4pLztcbiAgICB0aGlzLmZvbGRpbmdTdG9wTWFya2VyID0gLyg9ZW5kKD89JHxcXHMuKiQpKXwoXlxccyp9KXxcXGIoZW5kKVxcYi87XG5cbiAgICB0aGlzLmdldEZvbGRXaWRnZXQgPSBmdW5jdGlvbiAoc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgdmFyIGlzU3RhcnQgPSB0aGlzLmZvbGRpbmdTdGFydE1hcmtlci50ZXN0KGxpbmUpO1xuICAgICAgICB2YXIgaXNFbmQgPSB0aGlzLmZvbGRpbmdTdG9wTWFya2VyLnRlc3QobGluZSk7XG5cbiAgICAgICAgaWYgKGlzU3RhcnQgJiYgIWlzRW5kKSB7XG4gICAgICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyKTtcbiAgICAgICAgICAgIGlmIChtYXRjaFsxXSkge1xuICAgICAgICAgICAgICAgIGlmIChtYXRjaFsxXSA9PSBcImlmXCIgfHwgbWF0Y2hbMV0gPT0gXCJlbHNlXCIgfHwgbWF0Y2hbMV0gPT0gXCJ3aGlsZVwiIHx8IG1hdGNoWzFdID09IFwidW50aWxcIiB8fCBtYXRjaFsxXSA9PSBcInVubGVzc1wiKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXRjaFsxXSA9PSBcImVsc2VcIiAmJiAvXlxccyplbHNlXFxzKiQvLnRlc3QobGluZSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKC9eXFxzKig/OmlmfGVsc2V8d2hpbGV8dW50aWx8dW5sZXNzKVxccyovLnRlc3QobGluZSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAobWF0Y2hbMV0gPT0gXCJ3aGVuXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKC9cXHN0aGVuXFxzLy50ZXN0KGxpbmUpID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHNlc3Npb24uZ2V0VG9rZW5BdChyb3csIG1hdGNoLmluZGV4ICsgMikudHlwZSA9PT0gXCJrZXl3b3JkXCIpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcInN0YXJ0XCI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1hdGNoWzNdKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNlc3Npb24uZ2V0VG9rZW5BdChyb3csIG1hdGNoLmluZGV4ICsgMSkudHlwZSA9PT0gXCJjb21tZW50Lm11bHRpbGluZVwiKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJzdGFydFwiO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJzdGFydFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChmb2xkU3R5bGUgIT0gXCJtYXJrYmVnaW5lbmRcIiB8fCAhaXNFbmQgfHwgaXNTdGFydCAmJiBpc0VuZClcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xuXG4gICAgICAgIHZhciBtYXRjaCA9IGxpbmUubWF0Y2godGhpcy5mb2xkaW5nU3RvcE1hcmtlcik7XG4gICAgICAgIGlmIChtYXRjaFszXSA9PT0gXCJlbmRcIikge1xuICAgICAgICAgICAgaWYgKHNlc3Npb24uZ2V0VG9rZW5BdChyb3csIG1hdGNoLmluZGV4ICsgMSkudHlwZSA9PT0gXCJrZXl3b3JkXCIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiZW5kXCI7XG4gICAgICAgIH0gZWxzZSBpZiAobWF0Y2hbMV0pIHtcbiAgICAgICAgICAgIGlmIChzZXNzaW9uLmdldFRva2VuQXQocm93LCBtYXRjaC5pbmRleCArIDEpLnR5cGUgPT09IFwiY29tbWVudC5tdWx0aWxpbmVcIilcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJlbmRcIjtcbiAgICAgICAgfSBlbHNlXG4gICAgICAgICAgICByZXR1cm4gXCJlbmRcIjtcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0UmFuZ2UgPSBmdW5jdGlvbiAoc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmRvYy5nZXRMaW5lKHJvdyk7XG4gICAgICAgIHZhciBtYXRjaCA9IHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyLmV4ZWMobGluZSk7XG4gICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgaWYgKG1hdGNoWzFdIHx8IG1hdGNoWzNdKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJ1YnlCbG9jayhzZXNzaW9uLCByb3csIG1hdGNoLmluZGV4ICsgMik7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9wZW5pbmdCcmFja2V0QmxvY2soc2Vzc2lvbiwgXCJ7XCIsIHJvdywgbWF0Y2guaW5kZXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG1hdGNoID0gdGhpcy5mb2xkaW5nU3RvcE1hcmtlci5leGVjKGxpbmUpO1xuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIGlmIChtYXRjaFszXSA9PT0gXCJlbmRcIikge1xuICAgICAgICAgICAgICAgIGlmIChzZXNzaW9uLmdldFRva2VuQXQocm93LCBtYXRjaC5pbmRleCArIDEpLnR5cGUgPT09IFwia2V5d29yZFwiKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5ydWJ5QmxvY2soc2Vzc2lvbiwgcm93LCBtYXRjaC5pbmRleCArIDEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobWF0Y2hbMV0gPT09IFwiPWVuZFwiKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNlc3Npb24uZ2V0VG9rZW5BdChyb3csIG1hdGNoLmluZGV4ICsgMSkudHlwZSA9PT0gXCJjb21tZW50Lm11bHRpbGluZVwiKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5ydWJ5QmxvY2soc2Vzc2lvbiwgcm93LCBtYXRjaC5pbmRleCArIDEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jbG9zaW5nQnJhY2tldEJsb2NrKHNlc3Npb24sIFwifVwiLCByb3csIG1hdGNoLmluZGV4ICsgbWF0Y2hbMF0ubGVuZ3RoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLnJ1YnlCbG9jayA9IGZ1bmN0aW9uIChzZXNzaW9uLCByb3csIGNvbHVtbiwgdG9rZW5SYW5nZSkge1xuICAgICAgICB2YXIgc3RyZWFtID0gbmV3IFRva2VuSXRlcmF0b3Ioc2Vzc2lvbiwgcm93LCBjb2x1bW4pO1xuXG4gICAgICAgIHZhciB0b2tlbiA9IHN0cmVhbS5nZXRDdXJyZW50VG9rZW4oKTtcbiAgICAgICAgaWYgKCF0b2tlbiB8fCAodG9rZW4udHlwZSAhPSBcImtleXdvcmRcIiAmJiB0b2tlbi50eXBlICE9IFwiY29tbWVudC5tdWx0aWxpbmVcIikpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdmFyIHZhbCA9IHRva2VuLnZhbHVlO1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICBzd2l0Y2ggKHRva2VuLnZhbHVlKSB7XG4gICAgICAgICAgICBjYXNlIFwiaWZcIjpcbiAgICAgICAgICAgIGNhc2UgXCJ1bmxlc3NcIjpcbiAgICAgICAgICAgIGNhc2UgXCJ3aGlsZVwiOlxuICAgICAgICAgICAgY2FzZSBcInVudGlsXCI6XG4gICAgICAgICAgICAgICAgdmFyIGNoZWNrVG9rZW4gPSBuZXcgUmVnRXhwKFwiXlxcXFxzKlwiICsgdG9rZW4udmFsdWUpO1xuICAgICAgICAgICAgICAgIGlmICghY2hlY2tUb2tlbi50ZXN0KGxpbmUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIGRpciA9IHRoaXMuaW5kZW50S2V5d29yZHNbdmFsXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJ3aGVuXCI6XG4gICAgICAgICAgICAgICAgaWYgKC9cXHN0aGVuXFxzLy50ZXN0KGxpbmUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXNlIFwiZWxzaWZcIjpcbiAgICAgICAgICAgIGNhc2UgXCJyZXNjdWVcIjpcbiAgICAgICAgICAgIGNhc2UgXCJlbnN1cmVcIjpcbiAgICAgICAgICAgICAgICB2YXIgZGlyID0gMTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJlbHNlXCI6XG4gICAgICAgICAgICAgICAgdmFyIGNoZWNrVG9rZW4gPSBuZXcgUmVnRXhwKFwiXlxcXFxzKlwiICsgdG9rZW4udmFsdWUgKyBcIlxcXFxzKiRcIik7XG4gICAgICAgICAgICAgICAgaWYgKCFjaGVja1Rva2VuLnRlc3QobGluZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgZGlyID0gMTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdmFyIGRpciA9IHRoaXMuaW5kZW50S2V5d29yZHNbdmFsXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzdGFjayA9IFt2YWxdO1xuICAgICAgICBpZiAoIWRpcilcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB2YXIgc3RhcnRDb2x1bW4gPSBkaXIgPT09IC0xID8gc2Vzc2lvbi5nZXRMaW5lKHJvdyAtIDEpLmxlbmd0aCA6IHNlc3Npb24uZ2V0TGluZShyb3cpLmxlbmd0aDtcbiAgICAgICAgdmFyIHN0YXJ0Um93ID0gcm93O1xuICAgICAgICB2YXIgcmFuZ2VzID0gW107XG4gICAgICAgIHJhbmdlcy5wdXNoKHN0cmVhbS5nZXRDdXJyZW50VG9rZW5SYW5nZSgpKTtcblxuICAgICAgICBzdHJlYW0uc3RlcCA9IGRpciA9PT0gLTEgPyBzdHJlYW0uc3RlcEJhY2t3YXJkIDogc3RyZWFtLnN0ZXBGb3J3YXJkO1xuICAgICAgICBpZiAodG9rZW4udHlwZSA9PSBcImNvbW1lbnQubXVsdGlsaW5lXCIpIHtcbiAgICAgICAgICAgIHdoaWxlICh0b2tlbiA9IHN0cmVhbS5zdGVwKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAodG9rZW4udHlwZSAhPT0gXCJjb21tZW50Lm11bHRpbGluZVwiKVxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBpZiAoZGlyID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRDb2x1bW4gPSA2O1xuICAgICAgICAgICAgICAgICAgICBpZiAodG9rZW4udmFsdWUgPT0gXCI9ZW5kXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRva2VuLnZhbHVlID09IFwiPWJlZ2luXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd2hpbGUgKHRva2VuID0gc3RyZWFtLnN0ZXAoKSkge1xuICAgICAgICAgICAgICAgIHZhciBpZ25vcmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAodG9rZW4udHlwZSAhPT0gXCJrZXl3b3JkXCIpXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIHZhciBsZXZlbCA9IGRpciAqIHRoaXMuaW5kZW50S2V5d29yZHNbdG9rZW4udmFsdWVdO1xuICAgICAgICAgICAgICAgIGxpbmUgPSBzZXNzaW9uLmdldExpbmUoc3RyZWFtLmdldEN1cnJlbnRUb2tlblJvdygpKTtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRva2VuLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJkb1wiOlxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IHN0cmVhbS4kdG9rZW5JbmRleCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByZXZUb2tlbiA9IHN0cmVhbS4kcm93VG9rZW5zW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcmV2VG9rZW4gJiYgKHByZXZUb2tlbi52YWx1ZSA9PSBcIndoaWxlXCIgfHwgcHJldlRva2VuLnZhbHVlID09IFwidW50aWxcIiB8fCBwcmV2VG9rZW4udmFsdWUgPT0gXCJmb3JcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV2ZWwgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImVsc2VcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjaGVja1Rva2VuID0gbmV3IFJlZ0V4cChcIl5cXFxccypcIiArIHRva2VuLnZhbHVlICsgXCJcXFxccyokXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjaGVja1Rva2VuLnRlc3QobGluZSkgfHwgdmFsID09IFwiY2FzZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV2ZWwgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlnbm9yZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImlmXCI6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ1bmxlc3NcIjpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIndoaWxlXCI6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ1bnRpbFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNoZWNrVG9rZW4gPSBuZXcgUmVnRXhwKFwiXlxcXFxzKlwiICsgdG9rZW4udmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjaGVja1Rva2VuLnRlc3QobGluZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXZlbCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWdub3JlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwid2hlblwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKC9cXHN0aGVuXFxzLy50ZXN0KGxpbmUpIHx8IHZhbCA9PSBcImNhc2VcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldmVsID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZ25vcmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGxldmVsID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBzdGFjay51bnNoaWZ0KHRva2VuLnZhbHVlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGxldmVsIDw9IDAgJiYgaWdub3JlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICBzdGFjay5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXN0YWNrLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCh2YWwgPT0gXCJ3aGlsZVwiIHx8IHZhbCA9PSBcInVudGlsXCIgfHwgdmFsID09IFwiZm9yXCIpICYmIHRva2VuLnZhbHVlICE9IFwiZG9cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRva2VuLnZhbHVlID09IFwiZG9cIiAmJiBkaXIgPT0gLTEgJiYgbGV2ZWwgIT0gMClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0b2tlbi52YWx1ZSAhPSBcImRvXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAobGV2ZWwgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YWNrLnVuc2hpZnQodG9rZW4udmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0b2tlbilcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuXG4gICAgICAgIGlmICh0b2tlblJhbmdlKSB7XG4gICAgICAgICAgICByYW5nZXMucHVzaChzdHJlYW0uZ2V0Q3VycmVudFRva2VuUmFuZ2UoKSk7XG4gICAgICAgICAgICByZXR1cm4gcmFuZ2VzO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHJvdyA9IHN0cmVhbS5nZXRDdXJyZW50VG9rZW5Sb3coKTtcbiAgICAgICAgaWYgKGRpciA9PT0gLTEpIHtcbiAgICAgICAgICAgIGlmICh0b2tlbi50eXBlID09PSBcImNvbW1lbnQubXVsdGlsaW5lXCIpIHtcbiAgICAgICAgICAgICAgICB2YXIgZW5kQ29sdW1uID0gNjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIGVuZENvbHVtbiA9IHNlc3Npb24uZ2V0TGluZShyb3cpLmxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuZXcgUmFuZ2Uocm93LCBlbmRDb2x1bW4sIHN0YXJ0Um93IC0gMSwgc3RhcnRDb2x1bW4pO1xuICAgICAgICB9IGVsc2VcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmFuZ2Uoc3RhcnRSb3csIHN0YXJ0Q29sdW1uLCByb3cgLSAxLCBzZXNzaW9uLmdldExpbmUocm93IC0gMSkubGVuZ3RoKTtcbiAgICB9O1xuXG59KS5jYWxsKEZvbGRNb2RlLnByb3RvdHlwZSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRNb2RlID0gcmVxdWlyZShcIi4vdGV4dFwiKS5Nb2RlO1xudmFyIExlc3NIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL2xlc3NfaGlnaGxpZ2h0X3J1bGVzXCIpLkxlc3NIaWdobGlnaHRSdWxlcztcbnZhciBNYXRjaGluZ0JyYWNlT3V0ZGVudCA9IHJlcXVpcmUoXCIuL21hdGNoaW5nX2JyYWNlX291dGRlbnRcIikuTWF0Y2hpbmdCcmFjZU91dGRlbnQ7XG52YXIgQ3NzQmVoYXZpb3VyID0gcmVxdWlyZShcIi4vYmVoYXZpb3VyL2Nzc1wiKS5Dc3NCZWhhdmlvdXI7XG52YXIgQ3NzQ29tcGxldGlvbnMgPSByZXF1aXJlKFwiLi9jc3NfY29tcGxldGlvbnNcIikuQ3NzQ29tcGxldGlvbnM7XG5cbnZhciBDU3R5bGVGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRpbmcvY3N0eWxlXCIpLkZvbGRNb2RlO1xuXG52YXIgTW9kZSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuSGlnaGxpZ2h0UnVsZXMgPSBMZXNzSGlnaGxpZ2h0UnVsZXM7XG4gICAgdGhpcy4kb3V0ZGVudCA9IG5ldyBNYXRjaGluZ0JyYWNlT3V0ZGVudCgpO1xuICAgIHRoaXMuJGJlaGF2aW91ciA9IG5ldyBDc3NCZWhhdmlvdXIoKTtcbiAgICB0aGlzLiRjb21wbGV0ZXIgPSBuZXcgQ3NzQ29tcGxldGlvbnMoKTtcbiAgICB0aGlzLmZvbGRpbmdSdWxlcyA9IG5ldyBDU3R5bGVGb2xkTW9kZSgpO1xufTtcbm9vcC5pbmhlcml0cyhNb2RlLCBUZXh0TW9kZSk7XG5cbihmdW5jdGlvbigpIHtcblxuICAgIHRoaXMubGluZUNvbW1lbnRTdGFydCA9IFwiLy9cIjtcbiAgICB0aGlzLmJsb2NrQ29tbWVudCA9IHtzdGFydDogXCIvKlwiLCBlbmQ6IFwiKi9cIn07XG4gICAgXG4gICAgdGhpcy5nZXROZXh0TGluZUluZGVudCA9IGZ1bmN0aW9uKHN0YXRlLCBsaW5lLCB0YWIpIHtcbiAgICAgICAgdmFyIGluZGVudCA9IHRoaXMuJGdldEluZGVudChsaW5lKTtcblxuICAgICAgICAvLyBpZ25vcmUgYnJhY2VzIGluIGNvbW1lbnRzXG4gICAgICAgIHZhciB0b2tlbnMgPSB0aGlzLmdldFRva2VuaXplcigpLmdldExpbmVUb2tlbnMobGluZSwgc3RhdGUpLnRva2VucztcbiAgICAgICAgaWYgKHRva2Vucy5sZW5ndGggJiYgdG9rZW5zW3Rva2Vucy5sZW5ndGgtMV0udHlwZSA9PSBcImNvbW1lbnRcIikge1xuICAgICAgICAgICAgcmV0dXJuIGluZGVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBtYXRjaCA9IGxpbmUubWF0Y2goL14uKlxce1xccyokLyk7XG4gICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgaW5kZW50ICs9IHRhYjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpbmRlbnQ7XG4gICAgfTtcblxuICAgIHRoaXMuY2hlY2tPdXRkZW50ID0gZnVuY3Rpb24oc3RhdGUsIGxpbmUsIGlucHV0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRvdXRkZW50LmNoZWNrT3V0ZGVudChsaW5lLCBpbnB1dCk7XG4gICAgfTtcblxuICAgIHRoaXMuYXV0b091dGRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgZG9jLCByb3cpIHtcbiAgICAgICAgdGhpcy4kb3V0ZGVudC5hdXRvT3V0ZGVudChkb2MsIHJvdyk7XG4gICAgfTtcblxuICAgIHRoaXMuZ2V0Q29tcGxldGlvbnMgPSBmdW5jdGlvbihzdGF0ZSwgc2Vzc2lvbiwgcG9zLCBwcmVmaXgpIHtcbiAgICAgICAgLy8gQ1NTIGNvbXBsZXRpb25zIG9ubHkgd29yayB3aXRoIHNpbmdsZSAobm90IG5lc3RlZCkgcnVsZXNldHNcbiAgICAgICAgcmV0dXJuIHRoaXMuJGNvbXBsZXRlci5nZXRDb21wbGV0aW9ucyhcInJ1bGVzZXRcIiwgc2Vzc2lvbiwgcG9zLCBwcmVmaXgpO1xuICAgIH07XG5cbiAgICB0aGlzLiRpZCA9IFwiYWNlL21vZGUvbGVzc1wiO1xufSkuY2FsbChNb2RlLnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTW9kZSA9IE1vZGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIENzdHlsZUJlaGF2aW91ciA9IHJlcXVpcmUoXCIuL2JlaGF2aW91ci9jc3R5bGVcIikuQ3N0eWxlQmVoYXZpb3VyO1xudmFyIFRleHRNb2RlID0gcmVxdWlyZShcIi4vdGV4dFwiKS5Nb2RlO1xudmFyIE1hcmtkb3duSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9tYXJrZG93bl9oaWdobGlnaHRfcnVsZXNcIikuTWFya2Rvd25IaWdobGlnaHRSdWxlcztcbnZhciBNYXJrZG93bkZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZGluZy9tYXJrZG93blwiKS5Gb2xkTW9kZTtcblxudmFyIE1vZGUgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLkhpZ2hsaWdodFJ1bGVzID0gTWFya2Rvd25IaWdobGlnaHRSdWxlcztcblxuICAgIHRoaXMuY3JlYXRlTW9kZURlbGVnYXRlcyh7XG4gICAgICAgIGphdmFzY3JpcHQ6IHJlcXVpcmUoXCIuL2phdmFzY3JpcHRcIikuTW9kZSxcbiAgICAgICAgaHRtbDogcmVxdWlyZShcIi4vaHRtbFwiKS5Nb2RlLFxuICAgICAgICBiYXNoOiByZXF1aXJlKFwiLi9zaFwiKS5Nb2RlLFxuICAgICAgICBzaDogcmVxdWlyZShcIi4vc2hcIikuTW9kZSxcbiAgICAgICAgeG1sOiByZXF1aXJlKFwiLi94bWxcIikuTW9kZSxcbiAgICAgICAgY3NzOiByZXF1aXJlKFwiLi9jc3NcIikuTW9kZVxuICAgIH0pO1xuXG4gICAgdGhpcy5mb2xkaW5nUnVsZXMgPSBuZXcgTWFya2Rvd25Gb2xkTW9kZSgpO1xuICAgIHRoaXMuJGJlaGF2aW91ciA9IG5ldyBDc3R5bGVCZWhhdmlvdXIoeyBicmFjZXM6IHRydWUgfSk7XG59O1xub29wLmluaGVyaXRzKE1vZGUsIFRleHRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuICAgIHRoaXMudHlwZSA9IFwidGV4dFwiO1xuICAgIHRoaXMuYmxvY2tDb21tZW50ID0ge3N0YXJ0OiBcIjwhLS1cIiwgZW5kOiBcIi0tPlwifTtcbiAgICB0aGlzLiRxdW90ZXMgPSB7J1wiJzogJ1wiJywgXCJgXCI6IFwiYFwifTtcblxuICAgIHRoaXMuZ2V0TmV4dExpbmVJbmRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgbGluZSwgdGFiKSB7XG4gICAgICAgIGlmIChzdGF0ZSA9PSBcImxpc3RibG9ja1wiKSB7XG4gICAgICAgICAgICB2YXIgbWF0Y2ggPSAvXihcXHMqKSg/OihbLSsqXSl8KFxcZCspXFwuKShcXHMrKS8uZXhlYyhsaW5lKTtcbiAgICAgICAgICAgIGlmICghbWF0Y2gpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgICAgICB2YXIgbWFya2VyID0gbWF0Y2hbMl07XG4gICAgICAgICAgICBpZiAoIW1hcmtlcilcbiAgICAgICAgICAgICAgICBtYXJrZXIgPSBwYXJzZUludChtYXRjaFszXSwgMTApICsgMSArIFwiLlwiO1xuICAgICAgICAgICAgcmV0dXJuIG1hdGNoWzFdICsgbWFya2VyICsgbWF0Y2hbNF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kZ2V0SW5kZW50KGxpbmUpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGlzLiRpZCA9IFwiYWNlL21vZGUvbWFya2Rvd25cIjtcbiAgICB0aGlzLnNuaXBwZXRGaWxlSWQgPSBcImFjZS9zbmlwcGV0cy9tYXJrZG93blwiO1xufSkuY2FsbChNb2RlLnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTW9kZSA9IE1vZGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRNb2RlID0gcmVxdWlyZShcIi4vdGV4dFwiKS5Nb2RlO1xudmFyIFJ1YnlIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3J1YnlfaGlnaGxpZ2h0X3J1bGVzXCIpLlJ1YnlIaWdobGlnaHRSdWxlcztcbnZhciBNYXRjaGluZ0JyYWNlT3V0ZGVudCA9IHJlcXVpcmUoXCIuL21hdGNoaW5nX2JyYWNlX291dGRlbnRcIikuTWF0Y2hpbmdCcmFjZU91dGRlbnQ7XG52YXIgUmFuZ2UgPSByZXF1aXJlKFwiLi4vcmFuZ2VcIikuUmFuZ2U7XG52YXIgRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9mb2xkaW5nL3J1YnlcIikuRm9sZE1vZGU7XG5cbnZhciBNb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5IaWdobGlnaHRSdWxlcyA9IFJ1YnlIaWdobGlnaHRSdWxlcztcbiAgICB0aGlzLiRvdXRkZW50ID0gbmV3IE1hdGNoaW5nQnJhY2VPdXRkZW50KCk7XG4gICAgdGhpcy4kYmVoYXZpb3VyID0gdGhpcy4kZGVmYXVsdEJlaGF2aW91cjtcbiAgICB0aGlzLmZvbGRpbmdSdWxlcyA9IG5ldyBGb2xkTW9kZSgpO1xuICAgIHRoaXMuaW5kZW50S2V5d29yZHMgPSB0aGlzLmZvbGRpbmdSdWxlcy5pbmRlbnRLZXl3b3Jkcztcbn07XG5vb3AuaW5oZXJpdHMoTW9kZSwgVGV4dE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG5cblxuICAgIHRoaXMubGluZUNvbW1lbnRTdGFydCA9IFwiI1wiO1xuXG4gICAgdGhpcy5nZXROZXh0TGluZUluZGVudCA9IGZ1bmN0aW9uKHN0YXRlLCBsaW5lLCB0YWIpIHtcbiAgICAgICAgdmFyIGluZGVudCA9IHRoaXMuJGdldEluZGVudChsaW5lKTtcblxuICAgICAgICB2YXIgdG9rZW5pemVkTGluZSA9IHRoaXMuZ2V0VG9rZW5pemVyKCkuZ2V0TGluZVRva2VucyhsaW5lLCBzdGF0ZSk7XG4gICAgICAgIHZhciB0b2tlbnMgPSB0b2tlbml6ZWRMaW5lLnRva2VucztcblxuICAgICAgICBpZiAodG9rZW5zLmxlbmd0aCAmJiB0b2tlbnNbdG9rZW5zLmxlbmd0aCAtIDFdLnR5cGUgPT0gXCJjb21tZW50XCIpIHtcbiAgICAgICAgICAgIHJldHVybiBpbmRlbnQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RhdGUgPT0gXCJzdGFydFwiKSB7XG4gICAgICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKC9eLipbXFx7XFwoXFxbXVxccyokLyk7XG4gICAgICAgICAgICB2YXIgc3RhcnRpbmdDbGFzc09yTWV0aG9kID0gbGluZS5tYXRjaCgvXlxccyooY2xhc3N8ZGVmfG1vZHVsZSlcXHMuKiQvKTtcbiAgICAgICAgICAgIHZhciBzdGFydGluZ0RvQmxvY2sgPSBsaW5lLm1hdGNoKC8uKmRvKFxccyp8XFxzK1xcfC4qXFx8XFxzKikkLyk7XG4gICAgICAgICAgICB2YXIgc3RhcnRpbmdDb25kaXRpb25hbCA9IGxpbmUubWF0Y2goL15cXHMqKGlmfGVsc2V8d2hlbnxlbHNpZnx1bmxlc3N8d2hpbGV8Zm9yfGJlZ2lufHJlc2N1ZXxlbnN1cmUpXFxzKi8pO1xuICAgICAgICAgICAgaWYgKG1hdGNoIHx8IHN0YXJ0aW5nQ2xhc3NPck1ldGhvZCB8fCBzdGFydGluZ0RvQmxvY2sgfHwgc3RhcnRpbmdDb25kaXRpb25hbCkge1xuICAgICAgICAgICAgICAgIGluZGVudCArPSB0YWI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW5kZW50O1xuICAgIH07XG5cbiAgICB0aGlzLmNoZWNrT3V0ZGVudCA9IGZ1bmN0aW9uKHN0YXRlLCBsaW5lLCBpbnB1dCkge1xuICAgICAgICByZXR1cm4gL15cXHMrKGVuZHxlbHNlfHJlc2N1ZXxlbnN1cmUpJC8udGVzdChsaW5lICsgaW5wdXQpIHx8IHRoaXMuJG91dGRlbnQuY2hlY2tPdXRkZW50KGxpbmUsIGlucHV0KTtcbiAgICB9O1xuXG4gICAgdGhpcy5hdXRvT3V0ZGVudCA9IGZ1bmN0aW9uKHN0YXRlLCBzZXNzaW9uLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgaWYgKC99Ly50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJG91dGRlbnQuYXV0b091dGRlbnQoc2Vzc2lvbiwgcm93KTtcbiAgICAgICAgdmFyIGluZGVudCA9IHRoaXMuJGdldEluZGVudChsaW5lKTtcbiAgICAgICAgdmFyIHByZXZMaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyAtIDEpO1xuICAgICAgICB2YXIgcHJldkluZGVudCA9IHRoaXMuJGdldEluZGVudChwcmV2TGluZSk7XG4gICAgICAgIHZhciB0YWIgPSBzZXNzaW9uLmdldFRhYlN0cmluZygpO1xuICAgICAgICBpZiAocHJldkluZGVudC5sZW5ndGggPD0gaW5kZW50Lmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGluZGVudC5zbGljZSgtdGFiLmxlbmd0aCkgPT0gdGFiKVxuICAgICAgICAgICAgICAgIHNlc3Npb24ucmVtb3ZlKG5ldyBSYW5nZShyb3csIGluZGVudC5sZW5ndGggLSB0YWIubGVuZ3RoLCByb3csIGluZGVudC5sZW5ndGgpKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLmdldE1hdGNoaW5nID0gZnVuY3Rpb24oc2Vzc2lvbiwgcm93LCBjb2x1bW4pIHtcbiAgICAgICAgaWYgKHJvdyA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHZhciBwb3MgPSBzZXNzaW9uLnNlbGVjdGlvbi5sZWFkO1xuICAgICAgICAgICAgY29sdW1uID0gcG9zLmNvbHVtbjtcbiAgICAgICAgICAgIHJvdyA9IHBvcy5yb3c7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc3RhcnRUb2tlbiA9IHNlc3Npb24uZ2V0VG9rZW5BdChyb3csIGNvbHVtbik7XG4gICAgICAgIGlmIChzdGFydFRva2VuICYmIHN0YXJ0VG9rZW4udmFsdWUgaW4gdGhpcy5pbmRlbnRLZXl3b3JkcylcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZvbGRpbmdSdWxlcy5ydWJ5QmxvY2soc2Vzc2lvbiwgcm93LCBjb2x1bW4sIHRydWUpO1xuICAgIH07XG5cbiAgICB0aGlzLiRpZCA9IFwiYWNlL21vZGUvcnVieVwiO1xuICAgIHRoaXMuc25pcHBldEZpbGVJZCA9IFwiYWNlL3NuaXBwZXRzL3J1YnlcIjtcbn0pLmNhbGwoTW9kZS5wcm90b3R5cGUpO1xuXG5leHBvcnRzLk1vZGUgPSBNb2RlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0TW9kZSA9IHJlcXVpcmUoXCIuL3RleHRcIikuTW9kZTtcbnZhciBTYXNzSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9zYXNzX2hpZ2hsaWdodF9ydWxlc1wiKS5TYXNzSGlnaGxpZ2h0UnVsZXM7XG52YXIgRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9mb2xkaW5nL2NvZmZlZVwiKS5Gb2xkTW9kZTtcblxudmFyIE1vZGUgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLkhpZ2hsaWdodFJ1bGVzID0gU2Fzc0hpZ2hsaWdodFJ1bGVzO1xuICAgIHRoaXMuZm9sZGluZ1J1bGVzID0gbmV3IEZvbGRNb2RlKCk7XG4gICAgdGhpcy4kYmVoYXZpb3VyID0gdGhpcy4kZGVmYXVsdEJlaGF2aW91cjtcbn07XG5vb3AuaW5oZXJpdHMoTW9kZSwgVGV4dE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7ICAgXG4gICAgdGhpcy5saW5lQ29tbWVudFN0YXJ0ID0gXCIvL1wiO1xuICAgIHRoaXMuJGlkID0gXCJhY2UvbW9kZS9zYXNzXCI7XG59KS5jYWxsKE1vZGUucHJvdG90eXBlKTtcblxuZXhwb3J0cy5Nb2RlID0gTW9kZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dE1vZGUgPSByZXF1aXJlKFwiLi90ZXh0XCIpLk1vZGU7XG52YXIgU2Nzc0hpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vc2Nzc19oaWdobGlnaHRfcnVsZXNcIikuU2Nzc0hpZ2hsaWdodFJ1bGVzO1xudmFyIE1hdGNoaW5nQnJhY2VPdXRkZW50ID0gcmVxdWlyZShcIi4vbWF0Y2hpbmdfYnJhY2Vfb3V0ZGVudFwiKS5NYXRjaGluZ0JyYWNlT3V0ZGVudDtcbnZhciBDc3NCZWhhdmlvdXIgPSByZXF1aXJlKFwiLi9iZWhhdmlvdXIvY3NzXCIpLkNzc0JlaGF2aW91cjtcbnZhciBDU3R5bGVGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRpbmcvY3N0eWxlXCIpLkZvbGRNb2RlO1xudmFyIENzc0NvbXBsZXRpb25zID0gcmVxdWlyZShcIi4vY3NzX2NvbXBsZXRpb25zXCIpLkNzc0NvbXBsZXRpb25zO1xuXG5cbnZhciBNb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5IaWdobGlnaHRSdWxlcyA9IFNjc3NIaWdobGlnaHRSdWxlcztcbiAgICB0aGlzLiRvdXRkZW50ID0gbmV3IE1hdGNoaW5nQnJhY2VPdXRkZW50KCk7XG4gICAgdGhpcy4kYmVoYXZpb3VyID0gbmV3IENzc0JlaGF2aW91cigpO1xuICAgIHRoaXMuJGNvbXBsZXRlciA9IG5ldyBDc3NDb21wbGV0aW9ucygpO1xuICAgIHRoaXMuZm9sZGluZ1J1bGVzID0gbmV3IENTdHlsZUZvbGRNb2RlKCk7XG59O1xub29wLmluaGVyaXRzKE1vZGUsIFRleHRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuICAgXG4gICAgdGhpcy5saW5lQ29tbWVudFN0YXJ0ID0gXCIvL1wiO1xuICAgIHRoaXMuYmxvY2tDb21tZW50ID0ge3N0YXJ0OiBcIi8qXCIsIGVuZDogXCIqL1wifTtcblxuICAgIHRoaXMuZ2V0TmV4dExpbmVJbmRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgbGluZSwgdGFiKSB7XG4gICAgICAgIHZhciBpbmRlbnQgPSB0aGlzLiRnZXRJbmRlbnQobGluZSk7XG5cbiAgICAgICAgLy8gaWdub3JlIGJyYWNlcyBpbiBjb21tZW50c1xuICAgICAgICB2YXIgdG9rZW5zID0gdGhpcy5nZXRUb2tlbml6ZXIoKS5nZXRMaW5lVG9rZW5zKGxpbmUsIHN0YXRlKS50b2tlbnM7XG4gICAgICAgIGlmICh0b2tlbnMubGVuZ3RoICYmIHRva2Vuc1t0b2tlbnMubGVuZ3RoLTFdLnR5cGUgPT0gXCJjb21tZW50XCIpIHtcbiAgICAgICAgICAgIHJldHVybiBpbmRlbnQ7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKC9eLipcXHtcXHMqJC8pO1xuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIGluZGVudCArPSB0YWI7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW5kZW50O1xuICAgIH07XG5cbiAgICB0aGlzLmNoZWNrT3V0ZGVudCA9IGZ1bmN0aW9uKHN0YXRlLCBsaW5lLCBpbnB1dCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kb3V0ZGVudC5jaGVja091dGRlbnQobGluZSwgaW5wdXQpO1xuICAgIH07XG5cbiAgICB0aGlzLmF1dG9PdXRkZW50ID0gZnVuY3Rpb24oc3RhdGUsIGRvYywgcm93KSB7XG4gICAgICAgIHRoaXMuJG91dGRlbnQuYXV0b091dGRlbnQoZG9jLCByb3cpO1xuICAgIH07XG4gICAgXG4gICAgdGhpcy5nZXRDb21wbGV0aW9ucyA9IGZ1bmN0aW9uKHN0YXRlLCBzZXNzaW9uLCBwb3MsIHByZWZpeCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kY29tcGxldGVyLmdldENvbXBsZXRpb25zKHN0YXRlLCBzZXNzaW9uLCBwb3MsIHByZWZpeCk7XG4gICAgfTtcblxuXG4gICAgdGhpcy4kaWQgPSBcImFjZS9tb2RlL3Njc3NcIjtcbn0pLmNhbGwoTW9kZS5wcm90b3R5cGUpO1xuXG5leHBvcnRzLk1vZGUgPSBNb2RlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0TW9kZSA9IHJlcXVpcmUoXCIuL3RleHRcIikuTW9kZTtcbnZhciBTaEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vc2hfaGlnaGxpZ2h0X3J1bGVzXCIpLlNoSGlnaGxpZ2h0UnVsZXM7XG52YXIgUmFuZ2UgPSByZXF1aXJlKFwiLi4vcmFuZ2VcIikuUmFuZ2U7XG52YXIgQ1N0eWxlRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9mb2xkaW5nL2NzdHlsZVwiKS5Gb2xkTW9kZTtcblxudmFyIE1vZGUgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLkhpZ2hsaWdodFJ1bGVzID0gU2hIaWdobGlnaHRSdWxlcztcbiAgICB0aGlzLmZvbGRpbmdSdWxlcyA9IG5ldyBDU3R5bGVGb2xkTW9kZSgpO1xuICAgIHRoaXMuJGJlaGF2aW91ciA9IHRoaXMuJGRlZmF1bHRCZWhhdmlvdXI7XG59O1xub29wLmluaGVyaXRzKE1vZGUsIFRleHRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuXG4gICBcbiAgICB0aGlzLmxpbmVDb21tZW50U3RhcnQgPSBcIiNcIjtcblxuICAgIHRoaXMuZ2V0TmV4dExpbmVJbmRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgbGluZSwgdGFiKSB7XG4gICAgICAgIHZhciBpbmRlbnQgPSB0aGlzLiRnZXRJbmRlbnQobGluZSk7XG5cbiAgICAgICAgdmFyIHRva2VuaXplZExpbmUgPSB0aGlzLmdldFRva2VuaXplcigpLmdldExpbmVUb2tlbnMobGluZSwgc3RhdGUpO1xuICAgICAgICB2YXIgdG9rZW5zID0gdG9rZW5pemVkTGluZS50b2tlbnM7XG5cbiAgICAgICAgaWYgKHRva2Vucy5sZW5ndGggJiYgdG9rZW5zW3Rva2Vucy5sZW5ndGgtMV0udHlwZSA9PSBcImNvbW1lbnRcIikge1xuICAgICAgICAgICAgcmV0dXJuIGluZGVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdGF0ZSA9PSBcInN0YXJ0XCIpIHtcbiAgICAgICAgICAgIHZhciBtYXRjaCA9IGxpbmUubWF0Y2goL14uKltcXHtcXChcXFs6XVxccyokLyk7XG4gICAgICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgICAgICBpbmRlbnQgKz0gdGFiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGluZGVudDtcbiAgICB9O1xuXG4gICAgdmFyIG91dGRlbnRzID0ge1xuICAgICAgICBcInBhc3NcIjogMSxcbiAgICAgICAgXCJyZXR1cm5cIjogMSxcbiAgICAgICAgXCJyYWlzZVwiOiAxLFxuICAgICAgICBcImJyZWFrXCI6IDEsXG4gICAgICAgIFwiY29udGludWVcIjogMVxuICAgIH07XG5cbiAgICB0aGlzLmNoZWNrT3V0ZGVudCA9IGZ1bmN0aW9uKHN0YXRlLCBsaW5lLCBpbnB1dCkge1xuICAgICAgICBpZiAoaW5wdXQgIT09IFwiXFxyXFxuXCIgJiYgaW5wdXQgIT09IFwiXFxyXCIgJiYgaW5wdXQgIT09IFwiXFxuXCIpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgdmFyIHRva2VucyA9IHRoaXMuZ2V0VG9rZW5pemVyKCkuZ2V0TGluZVRva2VucyhsaW5lLnRyaW0oKSwgc3RhdGUpLnRva2VucztcblxuICAgICAgICBpZiAoIXRva2VucylcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgICAvLyBpZ25vcmUgdHJhaWxpbmcgY29tbWVudHNcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgdmFyIGxhc3QgPSB0b2tlbnMucG9wKCk7XG4gICAgICAgIH0gd2hpbGUgKGxhc3QgJiYgKGxhc3QudHlwZSA9PSBcImNvbW1lbnRcIiB8fCAobGFzdC50eXBlID09IFwidGV4dFwiICYmIGxhc3QudmFsdWUubWF0Y2goL15cXHMrJC8pKSkpO1xuXG4gICAgICAgIGlmICghbGFzdClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgICByZXR1cm4gKGxhc3QudHlwZSA9PSBcImtleXdvcmRcIiAmJiBvdXRkZW50c1tsYXN0LnZhbHVlXSk7XG4gICAgfTtcblxuICAgIHRoaXMuYXV0b091dGRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgZG9jLCByb3cpIHtcbiAgICAgICAgLy8gb3V0ZGVudGluZyBpbiBzaCBpcyBzbGlnaHRseSBkaWZmZXJlbnQgYmVjYXVzZSBpdCBhbHdheXMgYXBwbGllc1xuICAgICAgICAvLyB0byB0aGUgbmV4dCBsaW5lIGFuZCBvbmx5IG9mIGEgbmV3IGxpbmUgaXMgaW5zZXJ0ZWRcblxuICAgICAgICByb3cgKz0gMTtcbiAgICAgICAgdmFyIGluZGVudCA9IHRoaXMuJGdldEluZGVudChkb2MuZ2V0TGluZShyb3cpKTtcbiAgICAgICAgdmFyIHRhYiA9IGRvYy5nZXRUYWJTdHJpbmcoKTtcbiAgICAgICAgaWYgKGluZGVudC5zbGljZSgtdGFiLmxlbmd0aCkgPT0gdGFiKVxuICAgICAgICAgICAgZG9jLnJlbW92ZShuZXcgUmFuZ2Uocm93LCBpbmRlbnQubGVuZ3RoLXRhYi5sZW5ndGgsIHJvdywgaW5kZW50Lmxlbmd0aCkpO1xuICAgIH07XG5cbiAgICB0aGlzLiRpZCA9IFwiYWNlL21vZGUvc2hcIjtcbiAgICB0aGlzLnNuaXBwZXRGaWxlSWQgPSBcImFjZS9zbmlwcGV0cy9zaFwiO1xufSkuY2FsbChNb2RlLnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTW9kZSA9IE1vZGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcblxudmFyIHJlc2VydmVkS2V5d29yZHMgPSBleHBvcnRzLnJlc2VydmVkS2V5d29yZHMgPSAoXG4gICAgICAgICchfHt8fXxjYXNlfGRvfGRvbmV8ZWxpZnxlbHNlfCcrXG4gICAgICAgICdlc2FjfGZpfGZvcnxpZnxpbnx0aGVufHVudGlsfHdoaWxlfCcrXG4gICAgICAgICcmfDt8ZXhwb3J0fGxvY2FsfHJlYWR8dHlwZXNldHx1bnNldHwnK1xuICAgICAgICAnZWxpZnxzZWxlY3R8c2V0fGZ1bmN0aW9ufGRlY2xhcmV8cmVhZG9ubHknXG4gICAgKTtcblxudmFyIGxhbmd1YWdlQ29uc3RydWN0cyA9IGV4cG9ydHMubGFuZ3VhZ2VDb25zdHJ1Y3RzID0gKFxuICAgICdbfF18YWxpYXN8Ymd8YmluZHxicmVha3xidWlsdGlufCcrXG4gICAgICdjZHxjb21tYW5kfGNvbXBnZW58Y29tcGxldGV8Y29udGludWV8JytcbiAgICAgJ2RpcnN8ZGlzb3dufGVjaG98ZW5hYmxlfGV2YWx8ZXhlY3wnK1xuICAgICAnZXhpdHxmY3xmZ3xnZXRvcHRzfGhhc2h8aGVscHxoaXN0b3J5fCcrXG4gICAgICdqb2JzfGtpbGx8bGV0fGxvZ291dHxwb3BkfHByaW50ZnxwdXNoZHwnK1xuICAgICAncHdkfHJldHVybnxzZXR8c2hpZnR8c2hvcHR8c291cmNlfCcrXG4gICAgICdzdXNwZW5kfHRlc3R8dGltZXN8dHJhcHx0eXBlfHVsaW1pdHwnK1xuICAgICAndW1hc2t8dW5hbGlhc3x3YWl0J1xuKTtcblxudmFyIFNoSGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIga2V5d29yZE1hcHBlciA9IHRoaXMuY3JlYXRlS2V5d29yZE1hcHBlcih7XG4gICAgICAgIFwia2V5d29yZFwiOiByZXNlcnZlZEtleXdvcmRzLFxuICAgICAgICBcInN1cHBvcnQuZnVuY3Rpb24uYnVpbHRpblwiOiBsYW5ndWFnZUNvbnN0cnVjdHMsXG4gICAgICAgIFwiaW52YWxpZC5kZXByZWNhdGVkXCI6IFwiZGVidWdnZXJcIlxuICAgIH0sIFwiaWRlbnRpZmllclwiKTtcblxuICAgIHZhciBpbnRlZ2VyID0gXCIoPzooPzpbMS05XVxcXFxkKil8KD86MCkpXCI7XG4gICAgLy8gdmFyIGludGVnZXIgPSBcIig/OlwiICsgZGVjaW1hbEludGVnZXIgKyBcIilcIjtcblxuICAgIHZhciBmcmFjdGlvbiA9IFwiKD86XFxcXC5cXFxcZCspXCI7XG4gICAgdmFyIGludFBhcnQgPSBcIig/OlxcXFxkKylcIjtcbiAgICB2YXIgcG9pbnRGbG9hdCA9IFwiKD86KD86XCIgKyBpbnRQYXJ0ICsgXCI/XCIgKyBmcmFjdGlvbiArIFwiKXwoPzpcIiArIGludFBhcnQgKyBcIlxcXFwuKSlcIjtcbiAgICB2YXIgZXhwb25lbnRGbG9hdCA9IFwiKD86KD86XCIgKyBwb2ludEZsb2F0ICsgXCJ8XCIgKyAgaW50UGFydCArIFwiKVwiICsgXCIpXCI7XG4gICAgdmFyIGZsb2F0TnVtYmVyID0gXCIoPzpcIiArIGV4cG9uZW50RmxvYXQgKyBcInxcIiArIHBvaW50RmxvYXQgKyBcIilcIjtcbiAgICB2YXIgZmlsZURlc2NyaXB0b3IgPSBcIig/OiZcIiArIGludFBhcnQgKyBcIilcIjtcblxuICAgIHZhciB2YXJpYWJsZU5hbWUgPSBcIlthLXpBLVpfXVthLXpBLVowLTlfXSpcIjtcbiAgICB2YXIgdmFyaWFibGUgPSBcIig/OlwiICsgdmFyaWFibGVOYW1lICsgXCIoPz09KSlcIjtcblxuICAgIHZhciBidWlsdGluVmFyaWFibGUgPSBcIig/OlxcXFwkKD86U0hMVkx8XFxcXCR8XFxcXCF8XFxcXD8pKVwiO1xuXG4gICAgdmFyIGZ1bmMgPSBcIig/OlwiICsgdmFyaWFibGVOYW1lICsgXCJcXFxccypcXFxcKFxcXFwpKVwiO1xuXG4gICAgdGhpcy4kcnVsZXMgPSB7XG4gICAgICAgIFwic3RhcnRcIiA6IFt7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnRcIixcbiAgICAgICAgICAgIHJlZ2V4IDogL1xcXFwuL1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFtcInRleHRcIiwgXCJjb21tZW50XCJdLFxuICAgICAgICAgICAgcmVnZXggOiAvKF58XFxzKSgjLiopJC9cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZy5zdGFydFwiLFxuICAgICAgICAgICAgcmVnZXggOiAnXCInLFxuICAgICAgICAgICAgcHVzaCA6IFt7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogL1xcXFwoPzpbJGBcIlxcXFxdfCQpL1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGluY2x1ZGUgOiBcInZhcmlhYmxlc1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImtleXdvcmQub3BlcmF0b3JcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC9gLyAvLyBUT0RPIGhpZ2hsaWdodCBgXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZy5lbmRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6ICdcIicsXG4gICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzdHJpbmdcIlxuICAgICAgICAgICAgfV1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwkJ1wiLFxuICAgICAgICAgICAgcHVzaCA6IFt7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogL1xcXFwoPzpbYWJlRWZucnR2XFxcXCdcIl18eFthLWZBLUZcXGRdezEsMn18dVthLWZBLUZcXGRdezR9KFthLWZBLUZcXGRdezR9KT98Yy58XFxkezEsM30pL1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiJ1wiLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwic3RyaW5nXCJcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHJlZ2V4IDogXCI8PDxcIixcbiAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkLm9wZXJhdG9yXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgc3RhdGVOYW1lOiBcImhlcmVkb2NcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCIoPDwtPykoXFxcXHMqKShbJ1xcXCJgXT8pKFtcXFxcd1xcXFwtXSspKFsnXFxcImBdPylcIixcbiAgICAgICAgICAgIG9uTWF0Y2ggOiBmdW5jdGlvbih2YWx1ZSwgY3VycmVudFN0YXRlLCBzdGFjaykge1xuICAgICAgICAgICAgICAgIHZhciBuZXh0ID0gdmFsdWVbMl0gPT0gJy0nID8gXCJpbmRlbnRlZEhlcmVkb2NcIiA6IFwiaGVyZWRvY1wiO1xuICAgICAgICAgICAgICAgIHZhciB0b2tlbnMgPSB2YWx1ZS5zcGxpdCh0aGlzLnNwbGl0UmVnZXgpO1xuICAgICAgICAgICAgICAgIHN0YWNrLnB1c2gobmV4dCwgdG9rZW5zWzRdKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgICB7dHlwZTpcImNvbnN0YW50XCIsIHZhbHVlOiB0b2tlbnNbMV19LFxuICAgICAgICAgICAgICAgICAgICB7dHlwZTpcInRleHRcIiwgdmFsdWU6IHRva2Vuc1syXX0sXG4gICAgICAgICAgICAgICAgICAgIHt0eXBlOlwic3RyaW5nXCIsIHZhbHVlOiB0b2tlbnNbM119LFxuICAgICAgICAgICAgICAgICAgICB7dHlwZTpcInN1cHBvcnQuY2xhc3NcIiwgdmFsdWU6IHRva2Vuc1s0XX0sXG4gICAgICAgICAgICAgICAgICAgIHt0eXBlOlwic3RyaW5nXCIsIHZhbHVlOiB0b2tlbnNbNV19XG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBydWxlczoge1xuICAgICAgICAgICAgICAgIGhlcmVkb2M6IFt7XG4gICAgICAgICAgICAgICAgICAgIG9uTWF0Y2g6ICBmdW5jdGlvbih2YWx1ZSwgY3VycmVudFN0YXRlLCBzdGFjaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSBzdGFja1sxXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWNrLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhY2suc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHQgPSBzdGFja1swXSB8fCBcInN0YXJ0XCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwic3VwcG9ydC5jbGFzc1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0ID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcInN0cmluZ1wiO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICByZWdleDogXCIuKiRcIixcbiAgICAgICAgICAgICAgICAgICAgbmV4dDogXCJzdGFydFwiXG4gICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgaW5kZW50ZWRIZXJlZG9jOiBbe1xuICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXg6IFwiXlxcdCtcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgb25NYXRjaDogIGZ1bmN0aW9uKHZhbHVlLCBjdXJyZW50U3RhdGUsIHN0YWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IHN0YWNrWzFdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhY2suc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFjay5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dCA9IHN0YWNrWzBdIHx8IFwic3RhcnRcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJzdXBwb3J0LmNsYXNzXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHQgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwic3RyaW5nXCI7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4OiBcIi4qJFwiLFxuICAgICAgICAgICAgICAgICAgICBuZXh0OiBcInN0YXJ0XCJcbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICByZWdleCA6IFwiJFwiLFxuICAgICAgICAgICAgdG9rZW4gOiBcImVtcHR5XCIsXG4gICAgICAgICAgICBuZXh0IDogZnVuY3Rpb24oY3VycmVudFN0YXRlLCBzdGFjaykge1xuICAgICAgICAgICAgICAgIGlmIChzdGFja1swXSA9PT0gXCJoZXJlZG9jXCIgfHwgc3RhY2tbMF0gPT09IFwiaW5kZW50ZWRIZXJlZG9jXCIpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdGFja1swXTtcbiAgICAgICAgICAgICAgICByZXR1cm4gY3VycmVudFN0YXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFtcImtleXdvcmRcIiwgXCJ0ZXh0XCIsIFwidGV4dFwiLCBcInRleHRcIiwgXCJ2YXJpYWJsZVwiXSxcbiAgICAgICAgICAgIHJlZ2V4IDogLyhkZWNsYXJlfGxvY2FsfHJlYWRvbmx5KShcXHMrKSg/OigtW2ZpeGFyXSspKFxccyspKT8oW2EtekEtWl9dW2EtekEtWjAtOV9dKlxcYikvXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJ2YXJpYWJsZS5sYW5ndWFnZVwiLFxuICAgICAgICAgICAgcmVnZXggOiBidWlsdGluVmFyaWFibGVcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInZhcmlhYmxlXCIsXG4gICAgICAgICAgICByZWdleCA6IHZhcmlhYmxlXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGluY2x1ZGUgOiBcInZhcmlhYmxlc1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJzdXBwb3J0LmZ1bmN0aW9uXCIsXG4gICAgICAgICAgICByZWdleCA6IGZ1bmNcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInN1cHBvcnQuZnVuY3Rpb25cIixcbiAgICAgICAgICAgIHJlZ2V4IDogZmlsZURlc2NyaXB0b3JcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLCAgICAgICAgICAgLy8gJyBzdHJpbmdcbiAgICAgICAgICAgIHN0YXJ0IDogXCInXCIsIGVuZCA6IFwiJ1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5udW1lcmljXCIsIC8vIGZsb2F0XG4gICAgICAgICAgICByZWdleCA6IGZsb2F0TnVtYmVyXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5udW1lcmljXCIsIC8vIGludGVnZXJcbiAgICAgICAgICAgIHJlZ2V4IDogaW50ZWdlciArIFwiXFxcXGJcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IGtleXdvcmRNYXBwZXIsXG4gICAgICAgICAgICByZWdleCA6IFwiW2EtekEtWl9dW2EtekEtWjAtOV9dKlxcXFxiXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcImtleXdvcmQub3BlcmF0b3JcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcK3xcXFxcLXxcXFxcKnxcXFxcKlxcXFwqfFxcXFwvfFxcXFwvXFxcXC98fnw8fD58PD18PT58PXwhPXxbJSZ8YF1cIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwicHVuY3R1YXRpb24ub3BlcmF0b3JcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCI7XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInBhcmVuLmxwYXJlblwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIltcXFxcW1xcXFwoXFxcXHtdXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInBhcmVuLnJwYXJlblwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIltcXFxcXV1cIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwicGFyZW4ucnBhcmVuXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiW1xcXFwpXFxcXH1dXCIsXG4gICAgICAgICAgICBuZXh0IDogXCJwb3BcIlxuICAgICAgICB9XSxcbiAgICAgICAgdmFyaWFibGVzOiBbe1xuICAgICAgICAgICAgdG9rZW4gOiBcInZhcmlhYmxlXCIsXG4gICAgICAgICAgICByZWdleCA6IC8oXFwkKShcXHcrKS9cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBbXCJ2YXJpYWJsZVwiLCBcInBhcmVuLmxwYXJlblwiXSxcbiAgICAgICAgICAgIHJlZ2V4IDogLyhcXCQpKFxcKCkvLFxuICAgICAgICAgICAgcHVzaCA6IFwic3RhcnRcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFtcInZhcmlhYmxlXCIsIFwicGFyZW4ubHBhcmVuXCIsIFwia2V5d29yZC5vcGVyYXRvclwiLCBcInZhcmlhYmxlXCIsIFwia2V5d29yZC5vcGVyYXRvclwiXSxcbiAgICAgICAgICAgIHJlZ2V4IDogLyhcXCQpKFxceykoWyMhXT8pKFxcdyt8WypAIz9cXC0kITBfXSkoOls/K1xcLT1dP3wjIz98JSU/fCwsP1xcL3xcXF5cXF4/KT8vLFxuICAgICAgICAgICAgcHVzaCA6IFwic3RhcnRcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwidmFyaWFibGVcIixcbiAgICAgICAgICAgIHJlZ2V4IDogL1xcJFsqQCM/XFwtJCEwX10vXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogW1widmFyaWFibGVcIiwgXCJwYXJlbi5scGFyZW5cIl0sXG4gICAgICAgICAgICByZWdleCA6IC8oXFwkKShcXHspLyxcbiAgICAgICAgICAgIHB1c2ggOiBcInN0YXJ0XCJcbiAgICAgICAgfV1cbiAgICB9O1xuICAgIFxuICAgIHRoaXMubm9ybWFsaXplUnVsZXMoKTtcbn07XG5cbm9vcC5pbmhlcml0cyhTaEhpZ2hsaWdodFJ1bGVzLCBUZXh0SGlnaGxpZ2h0UnVsZXMpO1xuXG5leHBvcnRzLlNoSGlnaGxpZ2h0UnVsZXMgPSBTaEhpZ2hsaWdodFJ1bGVzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0TW9kZSA9IHJlcXVpcmUoXCIuL3RleHRcIikuTW9kZTtcbnZhciBTbGltSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9zbGltX2hpZ2hsaWdodF9ydWxlc1wiKS5TbGltSGlnaGxpZ2h0UnVsZXM7XG5cbnZhciBNb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgVGV4dE1vZGUuY2FsbCh0aGlzKTtcbiAgICB0aGlzLkhpZ2hsaWdodFJ1bGVzID0gU2xpbUhpZ2hsaWdodFJ1bGVzO1xuICAgIHRoaXMuY3JlYXRlTW9kZURlbGVnYXRlcyh7XG4gICAgICAgIGphdmFzY3JpcHQ6IHJlcXVpcmUoXCIuL2phdmFzY3JpcHRcIikuTW9kZSxcbiAgICAgICAgbWFya2Rvd246IHJlcXVpcmUoXCIuL21hcmtkb3duXCIpLk1vZGUsXG4gICAgICAgIGNvZmZlZTogcmVxdWlyZShcIi4vY29mZmVlXCIpLk1vZGUsXG4gICAgICAgIHNjc3M6IHJlcXVpcmUoXCIuL3Njc3NcIikuTW9kZSxcbiAgICAgICAgc2FzczogcmVxdWlyZShcIi4vc2Fzc1wiKS5Nb2RlLFxuICAgICAgICBsZXNzOiByZXF1aXJlKFwiLi9sZXNzXCIpLk1vZGUsXG4gICAgICAgIHJ1Ynk6IHJlcXVpcmUoXCIuL3J1YnlcIikuTW9kZSxcbiAgICAgICAgY3NzOiByZXF1aXJlKFwiLi9jc3NcIikuTW9kZVxuICAgIH0pO1xufTtcblxub29wLmluaGVyaXRzKE1vZGUsIFRleHRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy4kaWQgPSBcImFjZS9tb2RlL3NsaW1cIjtcbn0pLmNhbGwoTW9kZS5wcm90b3R5cGUpO1xuXG5leHBvcnRzLk1vZGUgPSBNb2RlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBsYW5nID0gcmVxdWlyZShcIi4uL2xpYi9sYW5nXCIpO1xudmFyIFRleHRNb2RlID0gcmVxdWlyZShcIi4vdGV4dFwiKS5Nb2RlO1xudmFyIFhtbEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4veG1sX2hpZ2hsaWdodF9ydWxlc1wiKS5YbWxIaWdobGlnaHRSdWxlcztcbnZhciBYbWxCZWhhdmlvdXIgPSByZXF1aXJlKFwiLi9iZWhhdmlvdXIveG1sXCIpLlhtbEJlaGF2aW91cjtcbnZhciBYbWxGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRpbmcveG1sXCIpLkZvbGRNb2RlO1xudmFyIFdvcmtlckNsaWVudCA9IHJlcXVpcmUoXCIuLi93b3JrZXIvd29ya2VyX2NsaWVudFwiKS5Xb3JrZXJDbGllbnQ7XG5cbnZhciBNb2RlID0gZnVuY3Rpb24oKSB7XG4gICB0aGlzLkhpZ2hsaWdodFJ1bGVzID0gWG1sSGlnaGxpZ2h0UnVsZXM7XG4gICB0aGlzLiRiZWhhdmlvdXIgPSBuZXcgWG1sQmVoYXZpb3VyKCk7XG4gICB0aGlzLmZvbGRpbmdSdWxlcyA9IG5ldyBYbWxGb2xkTW9kZSgpO1xufTtcblxub29wLmluaGVyaXRzKE1vZGUsIFRleHRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy52b2lkRWxlbWVudHMgPSBsYW5nLmFycmF5VG9NYXAoW10pO1xuXG4gICAgdGhpcy5ibG9ja0NvbW1lbnQgPSB7c3RhcnQ6IFwiPCEtLVwiLCBlbmQ6IFwiLS0+XCJ9O1xuXG4gICAgdGhpcy5jcmVhdGVXb3JrZXIgPSBmdW5jdGlvbihzZXNzaW9uKSB7XG4gICAgICAgIHZhciB3b3JrZXIgPSBuZXcgV29ya2VyQ2xpZW50KFtcImFjZVwiXSwgXCJhY2UvbW9kZS94bWxfd29ya2VyXCIsIFwiV29ya2VyXCIpO1xuICAgICAgICB3b3JrZXIuYXR0YWNoVG9Eb2N1bWVudChzZXNzaW9uLmdldERvY3VtZW50KCkpO1xuXG4gICAgICAgIHdvcmtlci5vbihcImVycm9yXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIHNlc3Npb24uc2V0QW5ub3RhdGlvbnMoZS5kYXRhKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgd29ya2VyLm9uKFwidGVybWluYXRlXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2Vzc2lvbi5jbGVhckFubm90YXRpb25zKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB3b3JrZXI7XG4gICAgfTtcbiAgICBcbiAgICB0aGlzLiRpZCA9IFwiYWNlL21vZGUveG1sXCI7XG59KS5jYWxsKE1vZGUucHJvdG90eXBlKTtcblxuZXhwb3J0cy5Nb2RlID0gTW9kZTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==