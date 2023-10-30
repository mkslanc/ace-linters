"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[2299],{

/***/ 22299:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var TextMode = (__webpack_require__(98030).Mode);
var CrystalHighlightRules = (__webpack_require__(55497)/* .CrystalHighlightRules */ .A);
var MatchingBraceOutdent = (__webpack_require__(1164).MatchingBraceOutdent);
var Range = (__webpack_require__(59082)/* .Range */ .e);
var FoldMode = (__webpack_require__(35090)/* .FoldMode */ .Z);

var Mode = function() {
    this.HighlightRules = CrystalHighlightRules;
    this.$outdent = new MatchingBraceOutdent();
    this.$behaviour = this.$defaultBehaviour;
    this.foldingRules = new FoldMode();
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
            var match = line.match(/^.*[\{\(\[]\s*$/);
            var startingClassOrMethod = line.match(/^\s*(class|def|module)\s.*$/);
            var startingDoBlock = line.match(/.*do(\s*|\s+\|.*\|\s*)$/);
            var startingConditional = line.match(/^\s*(if|else|when)\s*/);
            if (match || startingClassOrMethod || startingDoBlock || startingConditional) {
                indent += tab;
            }
        }

        return indent;
    };

    this.checkOutdent = function(state, line, input) {
        return /^\s+(end|else)$/.test(line + input) || this.$outdent.checkOutdent(line, input);
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
                session.remove(new Range(row, indent.length-tab.length, row, indent.length));
        }
    };

    this.$id = "ace/mode/crystal";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 55497:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



    var oop = __webpack_require__(89359);
    var TextHighlightRules = (__webpack_require__(28053)/* .TextHighlightRules */ .K);

    var CrystalHighlightRules = function () {

        var builtinFunctions = (
            "puts|initialize|previous_def|typeof|as|pointerof|sizeof|instance_sizeof"
        );

        var keywords = (
            "if|end|else|elsif|unless|case|when|break|while|next|until|def|return|class|new|getter|setter|property|lib"
            + "|fun|do|struct|private|protected|public|module|super|abstract|include|extend|begin|enum|raise|yield|with"
            + "|alias|rescue|ensure|macro|uninitialized|union|type|require"
        );

        var buildinConstants = (
            "true|TRUE|false|FALSE|nil|NIL|__LINE__|__END_LINE__|__FILE__|__DIR__"
        );

        var builtinVariables = (
            "$DEBUG|$defout|$FILENAME|$LOAD_PATH|$SAFE|$stdin|$stdout|$stderr|$VERBOSE|" +
            "root_url|flash|session|cookies|params|request|response|logger|self"
        );

        var keywordMapper = this.$keywords = this.createKeywordMapper({
            "keyword": keywords,
            "constant.language": buildinConstants,
            "variable.language": builtinVariables,
            "support.function": builtinFunctions
        }, "identifier");

        var hexNumber = "(?:0[xX][\\dA-Fa-f]+)";
        var decNumber = "(?:[0-9][\\d_]*)";
        var octNumber = "(?:0o[0-7][0-7]*)";
        var binNumber = "(?:0[bB][01]+)";
        var intNumber = "(?:[+-]?)(?:" + hexNumber + "|" + decNumber + "|" + octNumber + "|" + binNumber + ")(?:_?[iIuU](?:8|16|32|64))?\\b";
        var escapeExpression = /\\(?:[nsrtvfbae'"\\]|[0-7]{3}|x[\da-fA-F]{2}|u[\da-fA-F]{4}|u{[\da-fA-F]{1,6}})/;
        var extEscapeExspresssion = /\\(?:[nsrtvfbae'"\\]|[0-7]{3}|x[\da-fA-F]{2}|u[\da-fA-F]{4}|u{[\da-fA-F]{1,6}}|u{(:?[\da-fA-F]{2}\s)*[\da-fA-F]{2}})/;
        // regexp must not have capturing parentheses. Use (?:) instead.
        // regexps are ordered -> the first match is used

        this.$rules = {
            "start": [
                {
                    token: "comment",
                    regex: "#.*$"
                }, {
                    token: "string.regexp",
                    regex: "[/]",
                    push: [{
                        token: "constant.language.escape",
                        regex: extEscapeExspresssion
                    }, {
                        token: "string.regexp",
                        regex: "[/][imx]*(?=[).,;\\s]|$)",
                        next: "pop"
                    }, {
                        defaultToken: "string.regexp"
                    }]
                },
                [{
                    regex: "[{}]", onMatch: function (val, state, stack) {
                        this.next = val == "{" ? this.nextState : "";
                        if (val == "{" && stack.length) {
                            stack.unshift("start", state);
                            return "paren.lparen";
                        }
                        if (val == "}" && stack.length) {
                            stack.shift();
                            this.next = stack.shift();
                            if (this.next.indexOf("string") != -1)
                                return "paren.end";
                        }
                        return val == "{" ? "paren.lparen" : "paren.rparen";
                    },
                    nextState: "start"
                }, {
                    token: "string.start",
                    regex: /"/,
                    push: [{
                        token: "constant.language.escape",
                        regex: extEscapeExspresssion
                    }, {
                        token: "string",
                        regex: /\\#{/
                    }, {
                        token: "paren.start",
                        regex: /#{/,
                        push: "start"
                    }, {
                        token: "string.end",
                        regex: /"/,
                        next: "pop"
                    }, {
                        defaultToken: "string"
                    }]
                }, {
                    token: "string.start",
                    regex: /`/,
                    push: [{
                        token: "constant.language.escape",
                        regex: extEscapeExspresssion
                    }, {
                        token: "string",
                        regex: /\\#{/
                    }, {
                        token: "paren.start",
                        regex: /#{/,
                        push: "start"
                    }, {
                        token: "string.end",
                        regex: /`/,
                        next: "pop"
                    }, {
                        defaultToken: "string"
                    }]
                }, {
                    stateName: "rpstring",
                    token: "string.start",
                    regex: /%[Qx]?\(/,
                    push: [{
                        token: "constant.language.escape",
                        regex: extEscapeExspresssion
                    }, {
                        token: "string.start",
                        regex: /\(/,
                        push: "rpstring"
                    }, {
                        token: "string.end",
                        regex: /\)/,
                        next: "pop"
                    }, {
                        token: "paren.start",
                        regex: /#{/,
                        push: "start"
                    }, {
                        defaultToken: "string"
                    }]
                }, {
                    stateName: "spstring",
                    token: "string.start",
                    regex: /%[Qx]?\[/,
                    push: [{
                        token: "constant.language.escape",
                        regex: extEscapeExspresssion
                    }, {
                        token: "string.start",
                        regex: /\[/,
                        push: "spstring"
                    }, {
                        token: "string.end",
                        regex: /]/,
                        next: "pop"
                    }, {
                        token: "paren.start",
                        regex: /#{/,
                        push: "start"
                    }, {
                        defaultToken: "string"
                    }]
                }, {
                    stateName: "fpstring",
                    token: "string.start",
                    regex: /%[Qx]?{/,
                    push: [{
                        token: "constant.language.escape",
                        regex: extEscapeExspresssion
                    }, {
                        token: "string.start",
                        regex: /{/,
                        push: "fpstring"
                    }, {
                        token: "string.end",
                        regex: /}/,
                        next: "pop"
                    }, {
                        token: "paren.start",
                        regex: /#{/,
                        push: "start"
                    }, {
                        defaultToken: "string"
                    }]
                }, {
                    stateName: "tpstring",
                    token: "string.start",
                    regex: /%[Qx]?</,
                    push: [{
                        token: "constant.language.escape",
                        regex: extEscapeExspresssion
                    }, {
                        token: "string.start",
                        regex: /</,
                        push: "tpstring"
                    }, {
                        token: "string.end",
                        regex: />/,
                        next: "pop"
                    }, {
                        token: "paren.start",
                        regex: /#{/,
                        push: "start"
                    }, {
                        defaultToken: "string"
                    }]
                }, {
                    stateName: "ppstring",
                    token: "string.start",
                    regex: /%[Qx]?\|/,
                    push: [{
                        token: "constant.language.escape",
                        regex: extEscapeExspresssion
                    }, {
                        token: "string.end",
                        regex: /\|/,
                        next: "pop"
                    }, {
                        token: "paren.start",
                        regex: /#{/,
                        push: "start"
                    }, {
                        defaultToken: "string"
                    }]
                }, {
                    stateName: "rpqstring",
                    token: "string.start",
                    regex: /%[qwir]\(/,
                    push: [{
                        token: "string.start",
                        regex: /\(/,
                        push: "rpqstring"
                    }, {
                        token: "string.end",
                        regex: /\)/,
                        next: "pop"
                    }, {
                        defaultToken: "string"
                    }]
                }, {
                    stateName: "spqstring",
                    token: "string.start",
                    regex: /%[qwir]\[/,
                    push: [{
                        token: "string.start",
                        regex: /\[/,
                        push: "spqstring"
                    }, {
                        token: "string.end",
                        regex: /]/,
                        next: "pop"
                    }, {
                        defaultToken: "string"
                    }]
                }, {
                    stateName: "fpqstring",
                    token: "string.start",
                    regex: /%[qwir]{/,
                    push: [{
                        token: "string.start",
                        regex: /{/,
                        push: "fpqstring"
                    }, {
                        token: "string.end",
                        regex: /}/,
                        next: "pop"
                    }, {
                        defaultToken: "string"
                    }]
                }, {
                    stateName: "tpqstring",
                    token: "string.start",
                    regex: /%[qwir]</,
                    push: [{
                        token: "string.start",
                        regex: /</,
                        push: "tpqstring"
                    }, {
                        token: "string.end",
                        regex: />/,
                        next: "pop"
                    }, {
                        defaultToken: "string"
                    }]
                }, {
                    stateName: "ppqstring",
                    token: "string.start",
                    regex: /%[qwir]\|/,
                    push: [{
                        token: "string.end",
                        regex: /\|/,
                        next: "pop"
                    }, {
                        defaultToken: "string"
                    }]
                }, {
                    token: "string.start",
                    regex: /'/,
                    push: [{
                        token: "constant.language.escape",
                        regex: escapeExpression
                    }, {
                        token: "string.end",
                        regex: /'|$/,
                        next: "pop"
                    }, {
                        defaultToken: "string"
                    }]
                }], {
                    token: "text", // namespaces aren't symbols
                    regex: "::"
                }, {
                    token: "variable.instance", // instance variable
                    regex: "@{1,2}[a-zA-Z_\\d]+"
                }, {
                    token: "variable.fresh", // fresh variable
                    regex: "%[a-zA-Z_\\d]+"
                }, {
                    token: "support.class", // class name
                    regex: "[A-Z][a-zA-Z_\\d]+"
                }, {
                    token: "constant.other.symbol", // symbol
                    regex: "[:](?:(?:===|<=>|\\[]\\?|\\[]=|\\[]|>>|\\*\\*|<<|==|!=|>=|<=|!~|=~|<|\\+|-|\\*|\\/|%|&|\\||\\^|>|!|~)|(?:(?:[A-Za-z_]|[@$](?=[a-zA-Z0-9_]))[a-zA-Z0-9_]*[!=?]?))"
                }, {
                    token: "constant.numeric", // float
                    regex: "[+-]?\\d(?:\\d|_(?=\\d))*(?:(?:\\.\\d(?:\\d|_(?=\\d))*)?(?:[eE][+-]?\\d+)?)?(?:_?[fF](?:32|64))?\\b"
                }, {
                    token: "constant.numeric",
                    regex: intNumber
                }, {
                    token: "constant.other.symbol",
                    regex: ':"',
                    push: [{
                        token: "constant.language.escape",
                        regex: extEscapeExspresssion
                    }, {
                        token: "constant.other.symbol",
                        regex: '"',
                        next: "pop"
                    }, {
                        defaultToken: "constant.other.symbol"
                    }]
                }, {
                    token: "constant.language.boolean",
                    regex: "(?:true|false)\\b"
                }, {
                    token: "support.function",
                    regex: "(?:is_a\\?|nil\\?|responds_to\\?|as\\?)"
                }, {
                    token: keywordMapper,
                    regex: "[a-zA-Z_$][a-zA-Z0-9_$!?]*\\b"
                }, {
                    token: "variable.system",
                    regex: "\\$\\!|\\$\\?"
                }, {
                    token: "punctuation.separator.key-value",
                    regex: "=>"
                }, {
                    stateName: "heredoc",
                    onMatch: function (value, currentState, stack) {
                        var next = "heredoc";
                        var tokens = value.split(this.splitRegex);
                        stack.push(next, tokens[3]);
                        return [
                            {type: "constant", value: tokens[1]},
                            {type: "string", value: tokens[2]},
                            {type: "support.class", value: tokens[3]},
                            {type: "string", value: tokens[4]}
                        ];
                    },
                    regex: "(<<-)([']?)([\\w]+)([']?)",
                    rules: {
                        heredoc: [{
                            token: "string",
                            regex: "^ +"
                        }, {
                            onMatch: function (value, currentState, stack) {
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
                    regex: "$",
                    token: "empty",
                    next: function (currentState, stack) {
                        if (stack[0] === "heredoc")
                            return stack[0];
                        return currentState;
                    }
                }, {
                    token: "punctuation.operator",
                    regex: /[.]\s*(?![.])/,
                    push: [{
                        token : "punctuation.operator",
                        regex : /[.]\s*(?![.])/
                    }, {
                        token : "support.function",
                        regex : "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
                    }, {
                        regex: "",
                        token: "empty",
                        next: "pop"
                    }]
                }, {
                    token: "keyword.operator",
                    regex: "!|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|\\?|\\:|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^=|\\^|\\|"
                }, {
                    token: "punctuation.operator",
                    regex: /[?:,;.]/
                }, {
                    token: "paren.lparen",
                    regex: "[[({]"
                }, {
                    token: "paren.rparen",
                    regex: "[\\])}]"
                }, {
                    token: "text",
                    regex: "\\s+"
                }
            ]
        };

        this.normalizeRules();
    };

    oop.inherits(CrystalHighlightRules, TextHighlightRules);

    exports.A = CrystalHighlightRules;


/***/ }),

/***/ 35090:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var BaseFoldMode = (__webpack_require__(15369).FoldMode);
var Range = (__webpack_require__(59082)/* .Range */ .e);

var FoldMode = exports.Z = function() {};
oop.inherits(FoldMode, BaseFoldMode);

(function() {

    this.getFoldWidgetRange = function(session, foldStyle, row) {
        var range = this.indentationBlock(session, row);
        if (range)
            return range;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjIyOTkuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLEtBQVk7QUFDOUIsZUFBZSxpQ0FBc0I7QUFDckMsNEJBQTRCLDJEQUEwRDtBQUN0RiwyQkFBMkIsZ0RBQXdEO0FBQ25GLFlBQVksMkNBQXlCO0FBQ3JDLGVBQWUsOENBQW9DOztBQUVuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDBDQUEwQztBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRCxZQUFZOzs7Ozs7OztBQ2xFQzs7QUFFYixjQUFjLG1CQUFPLENBQUMsS0FBWTtBQUNsQyw2QkFBNkIsd0RBQW9EOztBQUVqRjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJEQUEyRCxFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUUsR0FBRyxXQUFXLEtBQUs7QUFDOUcsZ0VBQWdFLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxHQUFHLFdBQVcsS0FBSyxHQUFHLGNBQWMsRUFBRSxlQUFlLEdBQUc7QUFDeEo7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQSxpREFBaUQ7QUFDakQ7QUFDQSxxQkFBcUI7QUFDckI7QUFDQSxxQkFBcUI7QUFDckIsaUJBQWlCO0FBQ2pCO0FBQ0EsK0JBQStCO0FBQy9CLDZDQUE2QztBQUM3QyxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0M7QUFDeEMscUJBQXFCO0FBQ3JCO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQSxvQ0FBb0M7QUFDcEMscUJBQXFCO0FBQ3JCO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBLHFCQUFxQjtBQUNyQixpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBLG9DQUFvQztBQUNwQyxxQkFBcUI7QUFDckI7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0EscUJBQXFCO0FBQ3JCLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBLGtDQUFrQztBQUNsQztBQUNBLHFCQUFxQjtBQUNyQjtBQUNBLHFCQUFxQjtBQUNyQixpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQSxxQkFBcUI7QUFDckI7QUFDQSxxQkFBcUI7QUFDckIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0EscUJBQXFCO0FBQ3JCLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBLGtDQUFrQztBQUNsQztBQUNBLHFCQUFxQjtBQUNyQjtBQUNBLHFCQUFxQjtBQUNyQixpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBLGtDQUFrQztBQUNsQztBQUNBLHFCQUFxQjtBQUNyQjtBQUNBLHFCQUFxQjtBQUNyQixpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0EscUJBQXFCO0FBQ3JCLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQSxxQkFBcUI7QUFDckIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxvQ0FBb0M7QUFDcEM7QUFDQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBLHFCQUFxQjtBQUNyQjtBQUNBLGlDQUFpQztBQUNqQztBQUNBLHFCQUFxQjtBQUNyQjtBQUNBLHFCQUFxQjtBQUNyQixpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0EscUJBQXFCO0FBQ3JCLGlCQUFpQjtBQUNqQjtBQUNBO0FB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L2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvY3J5c3RhbC5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2NyeXN0YWxfaGlnaGxpZ2h0X3J1bGVzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvZm9sZGluZy9jb2ZmZWUuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9tYXRjaGluZ19icmFjZV9vdXRkZW50LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dE1vZGUgPSByZXF1aXJlKFwiLi90ZXh0XCIpLk1vZGU7XG52YXIgQ3J5c3RhbEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vY3J5c3RhbF9oaWdobGlnaHRfcnVsZXNcIikuQ3J5c3RhbEhpZ2hsaWdodFJ1bGVzO1xudmFyIE1hdGNoaW5nQnJhY2VPdXRkZW50ID0gcmVxdWlyZShcIi4vbWF0Y2hpbmdfYnJhY2Vfb3V0ZGVudFwiKS5NYXRjaGluZ0JyYWNlT3V0ZGVudDtcbnZhciBSYW5nZSA9IHJlcXVpcmUoXCIuLi9yYW5nZVwiKS5SYW5nZTtcbnZhciBGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRpbmcvY29mZmVlXCIpLkZvbGRNb2RlO1xuXG52YXIgTW9kZSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuSGlnaGxpZ2h0UnVsZXMgPSBDcnlzdGFsSGlnaGxpZ2h0UnVsZXM7XG4gICAgdGhpcy4kb3V0ZGVudCA9IG5ldyBNYXRjaGluZ0JyYWNlT3V0ZGVudCgpO1xuICAgIHRoaXMuJGJlaGF2aW91ciA9IHRoaXMuJGRlZmF1bHRCZWhhdmlvdXI7XG4gICAgdGhpcy5mb2xkaW5nUnVsZXMgPSBuZXcgRm9sZE1vZGUoKTtcbn07XG5vb3AuaW5oZXJpdHMoTW9kZSwgVGV4dE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG5cblxuICAgIHRoaXMubGluZUNvbW1lbnRTdGFydCA9IFwiI1wiO1xuXG4gICAgdGhpcy5nZXROZXh0TGluZUluZGVudCA9IGZ1bmN0aW9uKHN0YXRlLCBsaW5lLCB0YWIpIHtcbiAgICAgICAgdmFyIGluZGVudCA9IHRoaXMuJGdldEluZGVudChsaW5lKTtcblxuICAgICAgICB2YXIgdG9rZW5pemVkTGluZSA9IHRoaXMuZ2V0VG9rZW5pemVyKCkuZ2V0TGluZVRva2VucyhsaW5lLCBzdGF0ZSk7XG4gICAgICAgIHZhciB0b2tlbnMgPSB0b2tlbml6ZWRMaW5lLnRva2VucztcblxuICAgICAgICBpZiAodG9rZW5zLmxlbmd0aCAmJiB0b2tlbnNbdG9rZW5zLmxlbmd0aC0xXS50eXBlID09IFwiY29tbWVudFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5kZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN0YXRlID09IFwic3RhcnRcIikge1xuICAgICAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCgvXi4qW1xce1xcKFxcW11cXHMqJC8pO1xuICAgICAgICAgICAgdmFyIHN0YXJ0aW5nQ2xhc3NPck1ldGhvZCA9IGxpbmUubWF0Y2goL15cXHMqKGNsYXNzfGRlZnxtb2R1bGUpXFxzLiokLyk7XG4gICAgICAgICAgICB2YXIgc3RhcnRpbmdEb0Jsb2NrID0gbGluZS5tYXRjaCgvLipkbyhcXHMqfFxccytcXHwuKlxcfFxccyopJC8pO1xuICAgICAgICAgICAgdmFyIHN0YXJ0aW5nQ29uZGl0aW9uYWwgPSBsaW5lLm1hdGNoKC9eXFxzKihpZnxlbHNlfHdoZW4pXFxzKi8pO1xuICAgICAgICAgICAgaWYgKG1hdGNoIHx8IHN0YXJ0aW5nQ2xhc3NPck1ldGhvZCB8fCBzdGFydGluZ0RvQmxvY2sgfHwgc3RhcnRpbmdDb25kaXRpb25hbCkge1xuICAgICAgICAgICAgICAgIGluZGVudCArPSB0YWI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW5kZW50O1xuICAgIH07XG5cbiAgICB0aGlzLmNoZWNrT3V0ZGVudCA9IGZ1bmN0aW9uKHN0YXRlLCBsaW5lLCBpbnB1dCkge1xuICAgICAgICByZXR1cm4gL15cXHMrKGVuZHxlbHNlKSQvLnRlc3QobGluZSArIGlucHV0KSB8fCB0aGlzLiRvdXRkZW50LmNoZWNrT3V0ZGVudChsaW5lLCBpbnB1dCk7XG4gICAgfTtcblxuICAgIHRoaXMuYXV0b091dGRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgc2Vzc2lvbiwgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgIGlmICgvfS8udGVzdChsaW5lKSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRvdXRkZW50LmF1dG9PdXRkZW50KHNlc3Npb24sIHJvdyk7XG4gICAgICAgIHZhciBpbmRlbnQgPSB0aGlzLiRnZXRJbmRlbnQobGluZSk7XG4gICAgICAgIHZhciBwcmV2TGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cgLSAxKTtcbiAgICAgICAgdmFyIHByZXZJbmRlbnQgPSB0aGlzLiRnZXRJbmRlbnQocHJldkxpbmUpO1xuICAgICAgICB2YXIgdGFiID0gc2Vzc2lvbi5nZXRUYWJTdHJpbmcoKTtcbiAgICAgICAgaWYgKHByZXZJbmRlbnQubGVuZ3RoIDw9IGluZGVudC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChpbmRlbnQuc2xpY2UoLXRhYi5sZW5ndGgpID09IHRhYilcbiAgICAgICAgICAgICAgICBzZXNzaW9uLnJlbW92ZShuZXcgUmFuZ2Uocm93LCBpbmRlbnQubGVuZ3RoLXRhYi5sZW5ndGgsIHJvdywgaW5kZW50Lmxlbmd0aCkpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMuJGlkID0gXCJhY2UvbW9kZS9jcnlzdGFsXCI7XG59KS5jYWxsKE1vZGUucHJvdG90eXBlKTtcblxuZXhwb3J0cy5Nb2RlID0gTW9kZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4gICAgdmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xuICAgIHZhciBUZXh0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90ZXh0X2hpZ2hsaWdodF9ydWxlc1wiKS5UZXh0SGlnaGxpZ2h0UnVsZXM7XG5cbiAgICB2YXIgQ3J5c3RhbEhpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIHZhciBidWlsdGluRnVuY3Rpb25zID0gKFxuICAgICAgICAgICAgXCJwdXRzfGluaXRpYWxpemV8cHJldmlvdXNfZGVmfHR5cGVvZnxhc3xwb2ludGVyb2Z8c2l6ZW9mfGluc3RhbmNlX3NpemVvZlwiXG4gICAgICAgICk7XG5cbiAgICAgICAgdmFyIGtleXdvcmRzID0gKFxuICAgICAgICAgICAgXCJpZnxlbmR8ZWxzZXxlbHNpZnx1bmxlc3N8Y2FzZXx3aGVufGJyZWFrfHdoaWxlfG5leHR8dW50aWx8ZGVmfHJldHVybnxjbGFzc3xuZXd8Z2V0dGVyfHNldHRlcnxwcm9wZXJ0eXxsaWJcIlxuICAgICAgICAgICAgKyBcInxmdW58ZG98c3RydWN0fHByaXZhdGV8cHJvdGVjdGVkfHB1YmxpY3xtb2R1bGV8c3VwZXJ8YWJzdHJhY3R8aW5jbHVkZXxleHRlbmR8YmVnaW58ZW51bXxyYWlzZXx5aWVsZHx3aXRoXCJcbiAgICAgICAgICAgICsgXCJ8YWxpYXN8cmVzY3VlfGVuc3VyZXxtYWNyb3x1bmluaXRpYWxpemVkfHVuaW9ufHR5cGV8cmVxdWlyZVwiXG4gICAgICAgICk7XG5cbiAgICAgICAgdmFyIGJ1aWxkaW5Db25zdGFudHMgPSAoXG4gICAgICAgICAgICBcInRydWV8VFJVRXxmYWxzZXxGQUxTRXxuaWx8TklMfF9fTElORV9ffF9fRU5EX0xJTkVfX3xfX0ZJTEVfX3xfX0RJUl9fXCJcbiAgICAgICAgKTtcblxuICAgICAgICB2YXIgYnVpbHRpblZhcmlhYmxlcyA9IChcbiAgICAgICAgICAgIFwiJERFQlVHfCRkZWZvdXR8JEZJTEVOQU1FfCRMT0FEX1BBVEh8JFNBRkV8JHN0ZGlufCRzdGRvdXR8JHN0ZGVycnwkVkVSQk9TRXxcIiArXG4gICAgICAgICAgICBcInJvb3RfdXJsfGZsYXNofHNlc3Npb258Y29va2llc3xwYXJhbXN8cmVxdWVzdHxyZXNwb25zZXxsb2dnZXJ8c2VsZlwiXG4gICAgICAgICk7XG5cbiAgICAgICAgdmFyIGtleXdvcmRNYXBwZXIgPSB0aGlzLiRrZXl3b3JkcyA9IHRoaXMuY3JlYXRlS2V5d29yZE1hcHBlcih7XG4gICAgICAgICAgICBcImtleXdvcmRcIjoga2V5d29yZHMsXG4gICAgICAgICAgICBcImNvbnN0YW50Lmxhbmd1YWdlXCI6IGJ1aWxkaW5Db25zdGFudHMsXG4gICAgICAgICAgICBcInZhcmlhYmxlLmxhbmd1YWdlXCI6IGJ1aWx0aW5WYXJpYWJsZXMsXG4gICAgICAgICAgICBcInN1cHBvcnQuZnVuY3Rpb25cIjogYnVpbHRpbkZ1bmN0aW9uc1xuICAgICAgICB9LCBcImlkZW50aWZpZXJcIik7XG5cbiAgICAgICAgdmFyIGhleE51bWJlciA9IFwiKD86MFt4WF1bXFxcXGRBLUZhLWZdKylcIjtcbiAgICAgICAgdmFyIGRlY051bWJlciA9IFwiKD86WzAtOV1bXFxcXGRfXSopXCI7XG4gICAgICAgIHZhciBvY3ROdW1iZXIgPSBcIig/OjBvWzAtN11bMC03XSopXCI7XG4gICAgICAgIHZhciBiaW5OdW1iZXIgPSBcIig/OjBbYkJdWzAxXSspXCI7XG4gICAgICAgIHZhciBpbnROdW1iZXIgPSBcIig/OlsrLV0/KSg/OlwiICsgaGV4TnVtYmVyICsgXCJ8XCIgKyBkZWNOdW1iZXIgKyBcInxcIiArIG9jdE51bWJlciArIFwifFwiICsgYmluTnVtYmVyICsgXCIpKD86Xz9baUl1VV0oPzo4fDE2fDMyfDY0KSk/XFxcXGJcIjtcbiAgICAgICAgdmFyIGVzY2FwZUV4cHJlc3Npb24gPSAvXFxcXCg/Oltuc3J0dmZiYWUnXCJcXFxcXXxbMC03XXszfXx4W1xcZGEtZkEtRl17Mn18dVtcXGRhLWZBLUZdezR9fHV7W1xcZGEtZkEtRl17MSw2fX0pLztcbiAgICAgICAgdmFyIGV4dEVzY2FwZUV4c3ByZXNzc2lvbiA9IC9cXFxcKD86W25zcnR2ZmJhZSdcIlxcXFxdfFswLTddezN9fHhbXFxkYS1mQS1GXXsyfXx1W1xcZGEtZkEtRl17NH18dXtbXFxkYS1mQS1GXXsxLDZ9fXx1eyg6P1tcXGRhLWZBLUZdezJ9XFxzKSpbXFxkYS1mQS1GXXsyfX0pLztcbiAgICAgICAgLy8gcmVnZXhwIG11c3Qgbm90IGhhdmUgY2FwdHVyaW5nIHBhcmVudGhlc2VzLiBVc2UgKD86KSBpbnN0ZWFkLlxuICAgICAgICAvLyByZWdleHBzIGFyZSBvcmRlcmVkIC0+IHRoZSBmaXJzdCBtYXRjaCBpcyB1c2VkXG5cbiAgICAgICAgdGhpcy4kcnVsZXMgPSB7XG4gICAgICAgICAgICBcInN0YXJ0XCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuOiBcImNvbW1lbnRcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXg6IFwiIy4qJFwiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJzdHJpbmcucmVnZXhwXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4OiBcIlsvXVwiLFxuICAgICAgICAgICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWdleDogZXh0RXNjYXBlRXhzcHJlc3NzaW9uXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiBcInN0cmluZy5yZWdleHBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiBcIlsvXVtpbXhdKig/PVspLiw7XFxcXHNdfCQpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzdHJpbmcucmVnZXhwXCJcbiAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIFt7XG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4OiBcIlt7fV1cIiwgb25NYXRjaDogZnVuY3Rpb24gKHZhbCwgc3RhdGUsIHN0YWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHQgPSB2YWwgPT0gXCJ7XCIgPyB0aGlzLm5leHRTdGF0ZSA6IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsID09IFwie1wiICYmIHN0YWNrLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWNrLnVuc2hpZnQoXCJzdGFydFwiLCBzdGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwicGFyZW4ubHBhcmVuXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsID09IFwifVwiICYmIHN0YWNrLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWNrLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0ID0gc3RhY2suc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5uZXh0LmluZGV4T2YoXCJzdHJpbmdcIikgIT0gLTEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcInBhcmVuLmVuZFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbCA9PSBcIntcIiA/IFwicGFyZW4ubHBhcmVuXCIgOiBcInBhcmVuLnJwYXJlblwiO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBuZXh0U3RhdGU6IFwic3RhcnRcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nLnN0YXJ0XCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAvXCIvLFxuICAgICAgICAgICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWdleDogZXh0RXNjYXBlRXhzcHJlc3NzaW9uXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXg6IC9cXFxcI3svXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiBcInBhcmVuLnN0YXJ0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWdleDogLyN7LyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHB1c2g6IFwic3RhcnRcIlxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJzdHJpbmcuZW5kXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWdleDogL1wiLyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInN0cmluZ1wiXG4gICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJzdHJpbmcuc3RhcnRcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXg6IC9gLyxcbiAgICAgICAgICAgICAgICAgICAgcHVzaDogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXg6IGV4dEVzY2FwZUV4c3ByZXNzc2lvblxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAvXFxcXCN7L1xuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJwYXJlbi5zdGFydFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXg6IC8jey8sXG4gICAgICAgICAgICAgICAgICAgICAgICBwdXNoOiBcInN0YXJ0XCJcbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nLmVuZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXg6IC9gLyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInN0cmluZ1wiXG4gICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZU5hbWU6IFwicnBzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nLnN0YXJ0XCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAvJVtReF0/XFwoLyxcbiAgICAgICAgICAgICAgICAgICAgcHVzaDogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXg6IGV4dEVzY2FwZUV4c3ByZXNzc2lvblxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJzdHJpbmcuc3RhcnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAvXFwoLyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHB1c2g6IFwicnBzdHJpbmdcIlxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJzdHJpbmcuZW5kXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWdleDogL1xcKS8sXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiBcInBhcmVuLnN0YXJ0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWdleDogLyN7LyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHB1c2g6IFwic3RhcnRcIlxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwic3RyaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlTmFtZTogXCJzcHN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJzdHJpbmcuc3RhcnRcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXg6IC8lW1F4XT9cXFsvLFxuICAgICAgICAgICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWdleDogZXh0RXNjYXBlRXhzcHJlc3NzaW9uXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiBcInN0cmluZy5zdGFydFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXg6IC9cXFsvLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHVzaDogXCJzcHN0cmluZ1wiXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiBcInN0cmluZy5lbmRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAvXS8sXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiBcInBhcmVuLnN0YXJ0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWdleDogLyN7LyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHB1c2g6IFwic3RhcnRcIlxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwic3RyaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlTmFtZTogXCJmcHN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJzdHJpbmcuc3RhcnRcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXg6IC8lW1F4XT97LyxcbiAgICAgICAgICAgICAgICAgICAgcHVzaDogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXg6IGV4dEVzY2FwZUV4c3ByZXNzc2lvblxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJzdHJpbmcuc3RhcnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAvey8sXG4gICAgICAgICAgICAgICAgICAgICAgICBwdXNoOiBcImZwc3RyaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nLmVuZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXg6IC99LyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwicGFyZW4uc3RhcnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAvI3svLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHVzaDogXCJzdGFydFwiXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzdHJpbmdcIlxuICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVOYW1lOiBcInRwc3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIHRva2VuOiBcInN0cmluZy5zdGFydFwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleDogLyVbUXhdPzwvLFxuICAgICAgICAgICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWdleDogZXh0RXNjYXBlRXhzcHJlc3NzaW9uXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiBcInN0cmluZy5zdGFydFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXg6IC88LyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHB1c2g6IFwidHBzdHJpbmdcIlxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJzdHJpbmcuZW5kXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWdleDogLz4vLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJwYXJlbi5zdGFydFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXg6IC8jey8sXG4gICAgICAgICAgICAgICAgICAgICAgICBwdXNoOiBcInN0YXJ0XCJcbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInN0cmluZ1wiXG4gICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZU5hbWU6IFwicHBzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nLnN0YXJ0XCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAvJVtReF0/XFx8LyxcbiAgICAgICAgICAgICAgICAgICAgcHVzaDogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXg6IGV4dEVzY2FwZUV4c3ByZXNzc2lvblxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJzdHJpbmcuZW5kXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWdleDogL1xcfC8sXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiBcInBhcmVuLnN0YXJ0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWdleDogLyN7LyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHB1c2g6IFwic3RhcnRcIlxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwic3RyaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlTmFtZTogXCJycHFzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nLnN0YXJ0XCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAvJVtxd2lyXVxcKC8sXG4gICAgICAgICAgICAgICAgICAgIHB1c2g6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJzdHJpbmcuc3RhcnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAvXFwoLyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHB1c2g6IFwicnBxc3RyaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nLmVuZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXg6IC9cXCkvLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwic3RyaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlTmFtZTogXCJzcHFzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nLnN0YXJ0XCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAvJVtxd2lyXVxcWy8sXG4gICAgICAgICAgICAgICAgICAgIHB1c2g6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJzdHJpbmcuc3RhcnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAvXFxbLyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHB1c2g6IFwic3Bxc3RyaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nLmVuZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXg6IC9dLyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInN0cmluZ1wiXG4gICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZU5hbWU6IFwiZnBxc3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIHRva2VuOiBcInN0cmluZy5zdGFydFwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleDogLyVbcXdpcl17LyxcbiAgICAgICAgICAgICAgICAgICAgcHVzaDogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiBcInN0cmluZy5zdGFydFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXg6IC97LyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHB1c2g6IFwiZnBxc3RyaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nLmVuZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXg6IC99LyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInN0cmluZ1wiXG4gICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZU5hbWU6IFwidHBxc3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIHRva2VuOiBcInN0cmluZy5zdGFydFwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleDogLyVbcXdpcl08LyxcbiAgICAgICAgICAgICAgICAgICAgcHVzaDogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiBcInN0cmluZy5zdGFydFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXg6IC88LyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHB1c2g6IFwidHBxc3RyaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nLmVuZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXg6IC8+LyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInN0cmluZ1wiXG4gICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZU5hbWU6IFwicHBxc3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIHRva2VuOiBcInN0cmluZy5zdGFydFwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleDogLyVbcXdpcl1cXHwvLFxuICAgICAgICAgICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nLmVuZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXg6IC9cXHwvLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwic3RyaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuOiBcInN0cmluZy5zdGFydFwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleDogLycvLFxuICAgICAgICAgICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWdleDogZXNjYXBlRXhwcmVzc2lvblxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJzdHJpbmcuZW5kXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWdleDogLyd8JC8sXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzdHJpbmdcIlxuICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgIH1dLCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuOiBcInRleHRcIiwgLy8gbmFtZXNwYWNlcyBhcmVuJ3Qgc3ltYm9sc1xuICAgICAgICAgICAgICAgICAgICByZWdleDogXCI6OlwiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJ2YXJpYWJsZS5pbnN0YW5jZVwiLCAvLyBpbnN0YW5jZSB2YXJpYWJsZVxuICAgICAgICAgICAgICAgICAgICByZWdleDogXCJAezEsMn1bYS16QS1aX1xcXFxkXStcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwidmFyaWFibGUuZnJlc2hcIiwgLy8gZnJlc2ggdmFyaWFibGVcbiAgICAgICAgICAgICAgICAgICAgcmVnZXg6IFwiJVthLXpBLVpfXFxcXGRdK1wiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJzdXBwb3J0LmNsYXNzXCIsIC8vIGNsYXNzIG5hbWVcbiAgICAgICAgICAgICAgICAgICAgcmVnZXg6IFwiW0EtWl1bYS16QS1aX1xcXFxkXStcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQub3RoZXIuc3ltYm9sXCIsIC8vIHN5bWJvbFxuICAgICAgICAgICAgICAgICAgICByZWdleDogXCJbOl0oPzooPzo9PT18PD0+fFxcXFxbXVxcXFw/fFxcXFxbXT18XFxcXFtdfD4+fFxcXFwqXFxcXCp8PDx8PT18IT18Pj18PD18IX58PX58PHxcXFxcK3wtfFxcXFwqfFxcXFwvfCV8JnxcXFxcfHxcXFxcXnw+fCF8fil8KD86KD86W0EtWmEtel9dfFtAJF0oPz1bYS16QS1aMC05X10pKVthLXpBLVowLTlfXSpbIT0/XT8pKVwiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5udW1lcmljXCIsIC8vIGZsb2F0XG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4OiBcIlsrLV0/XFxcXGQoPzpcXFxcZHxfKD89XFxcXGQpKSooPzooPzpcXFxcLlxcXFxkKD86XFxcXGR8Xyg/PVxcXFxkKSkqKT8oPzpbZUVdWystXT9cXFxcZCspPyk/KD86Xz9bZkZdKD86MzJ8NjQpKT9cXFxcYlwiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5udW1lcmljXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4OiBpbnROdW1iZXJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lm90aGVyLnN5bWJvbFwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleDogJzpcIicsXG4gICAgICAgICAgICAgICAgICAgIHB1c2g6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiBleHRFc2NhcGVFeHNwcmVzc3Npb25cbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQub3RoZXIuc3ltYm9sXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWdleDogJ1wiJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcImNvbnN0YW50Lm90aGVyLnN5bWJvbFwiXG4gICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5sYW5ndWFnZS5ib29sZWFuXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4OiBcIig/OnRydWV8ZmFsc2UpXFxcXGJcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwic3VwcG9ydC5mdW5jdGlvblwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleDogXCIoPzppc19hXFxcXD98bmlsXFxcXD98cmVzcG9uZHNfdG9cXFxcP3xhc1xcXFw/KVwiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbjoga2V5d29yZE1hcHBlcixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXg6IFwiW2EtekEtWl8kXVthLXpBLVowLTlfJCE/XSpcXFxcYlwiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJ2YXJpYWJsZS5zeXN0ZW1cIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXg6IFwiXFxcXCRcXFxcIXxcXFxcJFxcXFw/XCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuOiBcInB1bmN0dWF0aW9uLnNlcGFyYXRvci5rZXktdmFsdWVcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXg6IFwiPT5cIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVOYW1lOiBcImhlcmVkb2NcIixcbiAgICAgICAgICAgICAgICAgICAgb25NYXRjaDogZnVuY3Rpb24gKHZhbHVlLCBjdXJyZW50U3RhdGUsIHN0YWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV4dCA9IFwiaGVyZWRvY1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRva2VucyA9IHZhbHVlLnNwbGl0KHRoaXMuc3BsaXRSZWdleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFjay5wdXNoKG5leHQsIHRva2Vuc1szXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0eXBlOiBcImNvbnN0YW50XCIsIHZhbHVlOiB0b2tlbnNbMV19LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0eXBlOiBcInN0cmluZ1wiLCB2YWx1ZTogdG9rZW5zWzJdfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dHlwZTogXCJzdXBwb3J0LmNsYXNzXCIsIHZhbHVlOiB0b2tlbnNbM119LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0eXBlOiBcInN0cmluZ1wiLCB2YWx1ZTogdG9rZW5zWzRdfVxuICAgICAgICAgICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgcmVnZXg6IFwiKDw8LSkoWyddPykoW1xcXFx3XSspKFsnXT8pXCIsXG4gICAgICAgICAgICAgICAgICAgIHJ1bGVzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZXJlZG9jOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiBcIl4gK1wiXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25NYXRjaDogZnVuY3Rpb24gKHZhbHVlLCBjdXJyZW50U3RhdGUsIHN0YWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gc3RhY2tbMV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWNrLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFjay5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0ID0gc3RhY2tbMF0gfHwgXCJzdGFydFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwic3VwcG9ydC5jbGFzc1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcInN0cmluZ1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXg6IFwiLiokXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dDogXCJzdGFydFwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICByZWdleDogXCIkXCIsXG4gICAgICAgICAgICAgICAgICAgIHRva2VuOiBcImVtcHR5XCIsXG4gICAgICAgICAgICAgICAgICAgIG5leHQ6IGZ1bmN0aW9uIChjdXJyZW50U3RhdGUsIHN0YWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RhY2tbMF0gPT09IFwiaGVyZWRvY1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzdGFja1swXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjdXJyZW50U3RhdGU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuOiBcInB1bmN0dWF0aW9uLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAvWy5dXFxzKig/IVsuXSkvLFxuICAgICAgICAgICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcInB1bmN0dWF0aW9uLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWdleCA6IC9bLl1cXHMqKD8hWy5dKS9cbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcInN1cHBvcnQuZnVuY3Rpb25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJbYS16QS1aXyRdW2EtekEtWjAtOV8kXSpcXFxcYlwiXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwiZW1wdHlcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuOiBcImtleXdvcmQub3BlcmF0b3JcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXg6IFwiIXxcXFxcJHwlfCZ8XFxcXCp8XFxcXC1cXFxcLXxcXFxcLXxcXFxcK1xcXFwrfFxcXFwrfH58PT09fD09fD18IT18IT09fDw9fD49fDw8PXw+Pj18Pj4+PXw8Pnw8fD58IXxcXFxcP3xcXFxcOnwmJnxcXFxcfFxcXFx8fFxcXFw/XFxcXDp8XFxcXCo9fCU9fFxcXFwrPXxcXFxcLT18Jj18XFxcXF49fFxcXFxefFxcXFx8XCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuOiBcInB1bmN0dWF0aW9uLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAvWz86LDsuXS9cbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuOiBcInBhcmVuLmxwYXJlblwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleDogXCJbWyh7XVwiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJwYXJlbi5ycGFyZW5cIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXg6IFwiW1xcXFxdKX1dXCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXg6IFwiXFxcXHMrXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5ub3JtYWxpemVSdWxlcygpO1xuICAgIH07XG5cbiAgICBvb3AuaW5oZXJpdHMoQ3J5c3RhbEhpZ2hsaWdodFJ1bGVzLCBUZXh0SGlnaGxpZ2h0UnVsZXMpO1xuXG4gICAgZXhwb3J0cy5DcnlzdGFsSGlnaGxpZ2h0UnVsZXMgPSBDcnlzdGFsSGlnaGxpZ2h0UnVsZXM7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi8uLi9saWIvb29wXCIpO1xudmFyIEJhc2VGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRfbW9kZVwiKS5Gb2xkTW9kZTtcbnZhciBSYW5nZSA9IHJlcXVpcmUoXCIuLi8uLi9yYW5nZVwiKS5SYW5nZTtcblxudmFyIEZvbGRNb2RlID0gZXhwb3J0cy5Gb2xkTW9kZSA9IGZ1bmN0aW9uKCkge307XG5vb3AuaW5oZXJpdHMoRm9sZE1vZGUsIEJhc2VGb2xkTW9kZSk7XG5cbihmdW5jdGlvbigpIHtcblxuICAgIHRoaXMuZ2V0Rm9sZFdpZGdldFJhbmdlID0gZnVuY3Rpb24oc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpIHtcbiAgICAgICAgdmFyIHJhbmdlID0gdGhpcy5pbmRlbnRhdGlvbkJsb2NrKHNlc3Npb24sIHJvdyk7XG4gICAgICAgIGlmIChyYW5nZSlcbiAgICAgICAgICAgIHJldHVybiByYW5nZTtcblxuICAgICAgICB2YXIgcmUgPSAvXFxTLztcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgdmFyIHN0YXJ0TGV2ZWwgPSBsaW5lLnNlYXJjaChyZSk7XG4gICAgICAgIGlmIChzdGFydExldmVsID09IC0xIHx8IGxpbmVbc3RhcnRMZXZlbF0gIT0gXCIjXCIpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdmFyIHN0YXJ0Q29sdW1uID0gbGluZS5sZW5ndGg7XG4gICAgICAgIHZhciBtYXhSb3cgPSBzZXNzaW9uLmdldExlbmd0aCgpO1xuICAgICAgICB2YXIgc3RhcnRSb3cgPSByb3c7XG4gICAgICAgIHZhciBlbmRSb3cgPSByb3c7XG5cbiAgICAgICAgd2hpbGUgKCsrcm93IDwgbWF4Um93KSB7XG4gICAgICAgICAgICBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgICAgICB2YXIgbGV2ZWwgPSBsaW5lLnNlYXJjaChyZSk7XG5cbiAgICAgICAgICAgIGlmIChsZXZlbCA9PSAtMSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcblxuICAgICAgICAgICAgaWYgKGxpbmVbbGV2ZWxdICE9IFwiI1wiKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBlbmRSb3cgPSByb3c7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW5kUm93ID4gc3RhcnRSb3cpIHtcbiAgICAgICAgICAgIHZhciBlbmRDb2x1bW4gPSBzZXNzaW9uLmdldExpbmUoZW5kUm93KS5sZW5ndGg7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFJhbmdlKHN0YXJ0Um93LCBzdGFydENvbHVtbiwgZW5kUm93LCBlbmRDb2x1bW4pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8vIG11c3QgcmV0dXJuIFwiXCIgaWYgdGhlcmUncyBubyBmb2xkLCB0byBlbmFibGUgY2FjaGluZ1xuICAgIHRoaXMuZ2V0Rm9sZFdpZGdldCA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgIHZhciBpbmRlbnQgPSBsaW5lLnNlYXJjaCgvXFxTLyk7XG4gICAgICAgIHZhciBuZXh0ID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyArIDEpO1xuICAgICAgICB2YXIgcHJldiA9IHNlc3Npb24uZ2V0TGluZShyb3cgLSAxKTtcbiAgICAgICAgdmFyIHByZXZJbmRlbnQgPSBwcmV2LnNlYXJjaCgvXFxTLyk7XG4gICAgICAgIHZhciBuZXh0SW5kZW50ID0gbmV4dC5zZWFyY2goL1xcUy8pO1xuXG4gICAgICAgIGlmIChpbmRlbnQgPT0gLTEpIHtcbiAgICAgICAgICAgIHNlc3Npb24uZm9sZFdpZGdldHNbcm93IC0gMV0gPSBwcmV2SW5kZW50IT0gLTEgJiYgcHJldkluZGVudCA8IG5leHRJbmRlbnQgPyBcInN0YXJ0XCIgOiBcIlwiO1xuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBkb2N1bWVudGF0aW9uIGNvbW1lbnRzXG4gICAgICAgIGlmIChwcmV2SW5kZW50ID09IC0xKSB7XG4gICAgICAgICAgICBpZiAoaW5kZW50ID09IG5leHRJbmRlbnQgJiYgbGluZVtpbmRlbnRdID09IFwiI1wiICYmIG5leHRbaW5kZW50XSA9PSBcIiNcIikge1xuICAgICAgICAgICAgICAgIHNlc3Npb24uZm9sZFdpZGdldHNbcm93IC0gMV0gPSBcIlwiO1xuICAgICAgICAgICAgICAgIHNlc3Npb24uZm9sZFdpZGdldHNbcm93ICsgMV0gPSBcIlwiO1xuICAgICAgICAgICAgICAgIHJldHVybiBcInN0YXJ0XCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAocHJldkluZGVudCA9PSBpbmRlbnQgJiYgbGluZVtpbmRlbnRdID09IFwiI1wiICYmIHByZXZbaW5kZW50XSA9PSBcIiNcIikge1xuICAgICAgICAgICAgaWYgKHNlc3Npb24uZ2V0TGluZShyb3cgLSAyKS5zZWFyY2goL1xcUy8pID09IC0xKSB7XG4gICAgICAgICAgICAgICAgc2Vzc2lvbi5mb2xkV2lkZ2V0c1tyb3cgLSAxXSA9IFwic3RhcnRcIjtcbiAgICAgICAgICAgICAgICBzZXNzaW9uLmZvbGRXaWRnZXRzW3JvdyArIDFdID0gXCJcIjtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcmV2SW5kZW50IT0gLTEgJiYgcHJldkluZGVudCA8IGluZGVudClcbiAgICAgICAgICAgIHNlc3Npb24uZm9sZFdpZGdldHNbcm93IC0gMV0gPSBcInN0YXJ0XCI7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHNlc3Npb24uZm9sZFdpZGdldHNbcm93IC0gMV0gPSBcIlwiO1xuXG4gICAgICAgIGlmIChpbmRlbnQgPCBuZXh0SW5kZW50KVxuICAgICAgICAgICAgcmV0dXJuIFwic3RhcnRcIjtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfTtcblxufSkuY2FsbChGb2xkTW9kZS5wcm90b3R5cGUpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBSYW5nZSA9IHJlcXVpcmUoXCIuLi9yYW5nZVwiKS5SYW5nZTtcblxudmFyIE1hdGNoaW5nQnJhY2VPdXRkZW50ID0gZnVuY3Rpb24oKSB7fTtcblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5jaGVja091dGRlbnQgPSBmdW5jdGlvbihsaW5lLCBpbnB1dCkge1xuICAgICAgICBpZiAoISAvXlxccyskLy50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIHJldHVybiAvXlxccypcXH0vLnRlc3QoaW5wdXQpO1xuICAgIH07XG5cbiAgICB0aGlzLmF1dG9PdXRkZW50ID0gZnVuY3Rpb24oZG9jLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBkb2MuZ2V0TGluZShyb3cpO1xuICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKC9eKFxccypcXH0pLyk7XG5cbiAgICAgICAgaWYgKCFtYXRjaCkgcmV0dXJuIDA7XG5cbiAgICAgICAgdmFyIGNvbHVtbiA9IG1hdGNoWzFdLmxlbmd0aDtcbiAgICAgICAgdmFyIG9wZW5CcmFjZVBvcyA9IGRvYy5maW5kTWF0Y2hpbmdCcmFja2V0KHtyb3c6IHJvdywgY29sdW1uOiBjb2x1bW59KTtcblxuICAgICAgICBpZiAoIW9wZW5CcmFjZVBvcyB8fCBvcGVuQnJhY2VQb3Mucm93ID09IHJvdykgcmV0dXJuIDA7XG5cbiAgICAgICAgdmFyIGluZGVudCA9IHRoaXMuJGdldEluZGVudChkb2MuZ2V0TGluZShvcGVuQnJhY2VQb3Mucm93KSk7XG4gICAgICAgIGRvYy5yZXBsYWNlKG5ldyBSYW5nZShyb3csIDAsIHJvdywgY29sdW1uLTEpLCBpbmRlbnQpO1xuICAgIH07XG5cbiAgICB0aGlzLiRnZXRJbmRlbnQgPSBmdW5jdGlvbihsaW5lKSB7XG4gICAgICAgIHJldHVybiBsaW5lLm1hdGNoKC9eXFxzKi8pWzBdO1xuICAgIH07XG5cbn0pLmNhbGwoTWF0Y2hpbmdCcmFjZU91dGRlbnQucHJvdG90eXBlKTtcblxuZXhwb3J0cy5NYXRjaGluZ0JyYWNlT3V0ZGVudCA9IE1hdGNoaW5nQnJhY2VPdXRkZW50O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9