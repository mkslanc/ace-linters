"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[7465],{

/***/ 7465:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var CrystalHighlightRules = (__webpack_require__(90830)/* .CrystalHighlightRules */ .I);
var MatchingBraceOutdent = (__webpack_require__(28670).MatchingBraceOutdent);
var Range = (__webpack_require__(91902)/* .Range */ .Q);
var FoldMode = (__webpack_require__(69261)/* .FoldMode */ .l);

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

/***/ 90830:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



    var oop = __webpack_require__(2645);
    var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

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

    exports.I = CrystalHighlightRules;


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0EsaUNBQWlDO0FBQ2pDO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0EscUJBQXFCO0FBQ3JCLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBLGtDQUFrQztBQUNsQztBQUNBLHFCQUFxQjtBQUNyQjtBQUNBLHFCQUFxQjtBQUNyQixpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBLGtDQUFrQztBQUNsQztBQUNBLHFCQUFxQjtBQUNyQjtBQUNBLHFCQUFxQjtBQUNyQixpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0EscUJBQXFCO0FBQ3JCLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQSxxQkFBcUI7QUFDckIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxvQ0FBb0M7QUFDcEM7QUFDQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBLHFCQUFxQjtBQUNyQjtBQUNBLGlDQUFpQztBQUNqQztBQUNBLHFCQUFxQjtBQUNyQjtBQUNBLHFCQUFxQjtBQUNyQixpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0EscUJBQXFCO0FBQ3JCLGlCQUFpQjtBQUNqQjtBQUNBO0FB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NEIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2NyeXN0YWwuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9jcnlzdGFsX2hpZ2hsaWdodF9ydWxlcy5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2ZvbGRpbmcvY29mZmVlLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvbWF0Y2hpbmdfYnJhY2Vfb3V0ZGVudC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRNb2RlID0gcmVxdWlyZShcIi4vdGV4dFwiKS5Nb2RlO1xudmFyIENyeXN0YWxIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL2NyeXN0YWxfaGlnaGxpZ2h0X3J1bGVzXCIpLkNyeXN0YWxIaWdobGlnaHRSdWxlcztcbnZhciBNYXRjaGluZ0JyYWNlT3V0ZGVudCA9IHJlcXVpcmUoXCIuL21hdGNoaW5nX2JyYWNlX291dGRlbnRcIikuTWF0Y2hpbmdCcmFjZU91dGRlbnQ7XG52YXIgUmFuZ2UgPSByZXF1aXJlKFwiLi4vcmFuZ2VcIikuUmFuZ2U7XG52YXIgRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9mb2xkaW5nL2NvZmZlZVwiKS5Gb2xkTW9kZTtcblxudmFyIE1vZGUgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLkhpZ2hsaWdodFJ1bGVzID0gQ3J5c3RhbEhpZ2hsaWdodFJ1bGVzO1xuICAgIHRoaXMuJG91dGRlbnQgPSBuZXcgTWF0Y2hpbmdCcmFjZU91dGRlbnQoKTtcbiAgICB0aGlzLiRiZWhhdmlvdXIgPSB0aGlzLiRkZWZhdWx0QmVoYXZpb3VyO1xuICAgIHRoaXMuZm9sZGluZ1J1bGVzID0gbmV3IEZvbGRNb2RlKCk7XG59O1xub29wLmluaGVyaXRzKE1vZGUsIFRleHRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuXG5cbiAgICB0aGlzLmxpbmVDb21tZW50U3RhcnQgPSBcIiNcIjtcblxuICAgIHRoaXMuZ2V0TmV4dExpbmVJbmRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgbGluZSwgdGFiKSB7XG4gICAgICAgIHZhciBpbmRlbnQgPSB0aGlzLiRnZXRJbmRlbnQobGluZSk7XG5cbiAgICAgICAgdmFyIHRva2VuaXplZExpbmUgPSB0aGlzLmdldFRva2VuaXplcigpLmdldExpbmVUb2tlbnMobGluZSwgc3RhdGUpO1xuICAgICAgICB2YXIgdG9rZW5zID0gdG9rZW5pemVkTGluZS50b2tlbnM7XG5cbiAgICAgICAgaWYgKHRva2Vucy5sZW5ndGggJiYgdG9rZW5zW3Rva2Vucy5sZW5ndGgtMV0udHlwZSA9PSBcImNvbW1lbnRcIikge1xuICAgICAgICAgICAgcmV0dXJuIGluZGVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdGF0ZSA9PSBcInN0YXJ0XCIpIHtcbiAgICAgICAgICAgIHZhciBtYXRjaCA9IGxpbmUubWF0Y2goL14uKltcXHtcXChcXFtdXFxzKiQvKTtcbiAgICAgICAgICAgIHZhciBzdGFydGluZ0NsYXNzT3JNZXRob2QgPSBsaW5lLm1hdGNoKC9eXFxzKihjbGFzc3xkZWZ8bW9kdWxlKVxccy4qJC8pO1xuICAgICAgICAgICAgdmFyIHN0YXJ0aW5nRG9CbG9jayA9IGxpbmUubWF0Y2goLy4qZG8oXFxzKnxcXHMrXFx8LipcXHxcXHMqKSQvKTtcbiAgICAgICAgICAgIHZhciBzdGFydGluZ0NvbmRpdGlvbmFsID0gbGluZS5tYXRjaCgvXlxccyooaWZ8ZWxzZXx3aGVuKVxccyovKTtcbiAgICAgICAgICAgIGlmIChtYXRjaCB8fCBzdGFydGluZ0NsYXNzT3JNZXRob2QgfHwgc3RhcnRpbmdEb0Jsb2NrIHx8IHN0YXJ0aW5nQ29uZGl0aW9uYWwpIHtcbiAgICAgICAgICAgICAgICBpbmRlbnQgKz0gdGFiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGluZGVudDtcbiAgICB9O1xuXG4gICAgdGhpcy5jaGVja091dGRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgbGluZSwgaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIC9eXFxzKyhlbmR8ZWxzZSkkLy50ZXN0KGxpbmUgKyBpbnB1dCkgfHwgdGhpcy4kb3V0ZGVudC5jaGVja091dGRlbnQobGluZSwgaW5wdXQpO1xuICAgIH07XG5cbiAgICB0aGlzLmF1dG9PdXRkZW50ID0gZnVuY3Rpb24oc3RhdGUsIHNlc3Npb24sIHJvdykge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICBpZiAoL30vLnRlc3QobGluZSkpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kb3V0ZGVudC5hdXRvT3V0ZGVudChzZXNzaW9uLCByb3cpO1xuICAgICAgICB2YXIgaW5kZW50ID0gdGhpcy4kZ2V0SW5kZW50KGxpbmUpO1xuICAgICAgICB2YXIgcHJldkxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93IC0gMSk7XG4gICAgICAgIHZhciBwcmV2SW5kZW50ID0gdGhpcy4kZ2V0SW5kZW50KHByZXZMaW5lKTtcbiAgICAgICAgdmFyIHRhYiA9IHNlc3Npb24uZ2V0VGFiU3RyaW5nKCk7XG4gICAgICAgIGlmIChwcmV2SW5kZW50Lmxlbmd0aCA8PSBpbmRlbnQubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoaW5kZW50LnNsaWNlKC10YWIubGVuZ3RoKSA9PSB0YWIpXG4gICAgICAgICAgICAgICAgc2Vzc2lvbi5yZW1vdmUobmV3IFJhbmdlKHJvdywgaW5kZW50Lmxlbmd0aC10YWIubGVuZ3RoLCByb3csIGluZGVudC5sZW5ndGgpKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLiRpZCA9IFwiYWNlL21vZGUvY3J5c3RhbFwiO1xufSkuY2FsbChNb2RlLnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTW9kZSA9IE1vZGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuICAgIHZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbiAgICB2YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xuXG4gICAgdmFyIENyeXN0YWxIaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICB2YXIgYnVpbHRpbkZ1bmN0aW9ucyA9IChcbiAgICAgICAgICAgIFwicHV0c3xpbml0aWFsaXplfHByZXZpb3VzX2RlZnx0eXBlb2Z8YXN8cG9pbnRlcm9mfHNpemVvZnxpbnN0YW5jZV9zaXplb2ZcIlxuICAgICAgICApO1xuXG4gICAgICAgIHZhciBrZXl3b3JkcyA9IChcbiAgICAgICAgICAgIFwiaWZ8ZW5kfGVsc2V8ZWxzaWZ8dW5sZXNzfGNhc2V8d2hlbnxicmVha3x3aGlsZXxuZXh0fHVudGlsfGRlZnxyZXR1cm58Y2xhc3N8bmV3fGdldHRlcnxzZXR0ZXJ8cHJvcGVydHl8bGliXCJcbiAgICAgICAgICAgICsgXCJ8ZnVufGRvfHN0cnVjdHxwcml2YXRlfHByb3RlY3RlZHxwdWJsaWN8bW9kdWxlfHN1cGVyfGFic3RyYWN0fGluY2x1ZGV8ZXh0ZW5kfGJlZ2lufGVudW18cmFpc2V8eWllbGR8d2l0aFwiXG4gICAgICAgICAgICArIFwifGFsaWFzfHJlc2N1ZXxlbnN1cmV8bWFjcm98dW5pbml0aWFsaXplZHx1bmlvbnx0eXBlfHJlcXVpcmVcIlxuICAgICAgICApO1xuXG4gICAgICAgIHZhciBidWlsZGluQ29uc3RhbnRzID0gKFxuICAgICAgICAgICAgXCJ0cnVlfFRSVUV8ZmFsc2V8RkFMU0V8bmlsfE5JTHxfX0xJTkVfX3xfX0VORF9MSU5FX198X19GSUxFX198X19ESVJfX1wiXG4gICAgICAgICk7XG5cbiAgICAgICAgdmFyIGJ1aWx0aW5WYXJpYWJsZXMgPSAoXG4gICAgICAgICAgICBcIiRERUJVR3wkZGVmb3V0fCRGSUxFTkFNRXwkTE9BRF9QQVRIfCRTQUZFfCRzdGRpbnwkc3Rkb3V0fCRzdGRlcnJ8JFZFUkJPU0V8XCIgK1xuICAgICAgICAgICAgXCJyb290X3VybHxmbGFzaHxzZXNzaW9ufGNvb2tpZXN8cGFyYW1zfHJlcXVlc3R8cmVzcG9uc2V8bG9nZ2VyfHNlbGZcIlxuICAgICAgICApO1xuXG4gICAgICAgIHZhciBrZXl3b3JkTWFwcGVyID0gdGhpcy4ka2V5d29yZHMgPSB0aGlzLmNyZWF0ZUtleXdvcmRNYXBwZXIoe1xuICAgICAgICAgICAgXCJrZXl3b3JkXCI6IGtleXdvcmRzLFxuICAgICAgICAgICAgXCJjb25zdGFudC5sYW5ndWFnZVwiOiBidWlsZGluQ29uc3RhbnRzLFxuICAgICAgICAgICAgXCJ2YXJpYWJsZS5sYW5ndWFnZVwiOiBidWlsdGluVmFyaWFibGVzLFxuICAgICAgICAgICAgXCJzdXBwb3J0LmZ1bmN0aW9uXCI6IGJ1aWx0aW5GdW5jdGlvbnNcbiAgICAgICAgfSwgXCJpZGVudGlmaWVyXCIpO1xuXG4gICAgICAgIHZhciBoZXhOdW1iZXIgPSBcIig/OjBbeFhdW1xcXFxkQS1GYS1mXSspXCI7XG4gICAgICAgIHZhciBkZWNOdW1iZXIgPSBcIig/OlswLTldW1xcXFxkX10qKVwiO1xuICAgICAgICB2YXIgb2N0TnVtYmVyID0gXCIoPzowb1swLTddWzAtN10qKVwiO1xuICAgICAgICB2YXIgYmluTnVtYmVyID0gXCIoPzowW2JCXVswMV0rKVwiO1xuICAgICAgICB2YXIgaW50TnVtYmVyID0gXCIoPzpbKy1dPykoPzpcIiArIGhleE51bWJlciArIFwifFwiICsgZGVjTnVtYmVyICsgXCJ8XCIgKyBvY3ROdW1iZXIgKyBcInxcIiArIGJpbk51bWJlciArIFwiKSg/Ol8/W2lJdVVdKD86OHwxNnwzMnw2NCkpP1xcXFxiXCI7XG4gICAgICAgIHZhciBlc2NhcGVFeHByZXNzaW9uID0gL1xcXFwoPzpbbnNydHZmYmFlJ1wiXFxcXF18WzAtN117M318eFtcXGRhLWZBLUZdezJ9fHVbXFxkYS1mQS1GXXs0fXx1e1tcXGRhLWZBLUZdezEsNn19KS87XG4gICAgICAgIHZhciBleHRFc2NhcGVFeHNwcmVzc3Npb24gPSAvXFxcXCg/Oltuc3J0dmZiYWUnXCJcXFxcXXxbMC03XXszfXx4W1xcZGEtZkEtRl17Mn18dVtcXGRhLWZBLUZdezR9fHV7W1xcZGEtZkEtRl17MSw2fX18dXsoOj9bXFxkYS1mQS1GXXsyfVxccykqW1xcZGEtZkEtRl17Mn19KS87XG4gICAgICAgIC8vIHJlZ2V4cCBtdXN0IG5vdCBoYXZlIGNhcHR1cmluZyBwYXJlbnRoZXNlcy4gVXNlICg/OikgaW5zdGVhZC5cbiAgICAgICAgLy8gcmVnZXhwcyBhcmUgb3JkZXJlZCAtPiB0aGUgZmlyc3QgbWF0Y2ggaXMgdXNlZFxuXG4gICAgICAgIHRoaXMuJHJ1bGVzID0ge1xuICAgICAgICAgICAgXCJzdGFydFwiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJjb21tZW50XCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4OiBcIiMuKiRcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nLnJlZ2V4cFwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleDogXCJbL11cIixcbiAgICAgICAgICAgICAgICAgICAgcHVzaDogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXg6IGV4dEVzY2FwZUV4c3ByZXNzc2lvblxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJzdHJpbmcucmVnZXhwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWdleDogXCJbL11baW14XSooPz1bKS4sO1xcXFxzXXwkKVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwic3RyaW5nLnJlZ2V4cFwiXG4gICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBbe1xuICAgICAgICAgICAgICAgICAgICByZWdleDogXCJbe31dXCIsIG9uTWF0Y2g6IGZ1bmN0aW9uICh2YWwsIHN0YXRlLCBzdGFjaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0ID0gdmFsID09IFwie1wiID8gdGhpcy5uZXh0U3RhdGUgOiBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbCA9PSBcIntcIiAmJiBzdGFjay5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFjay51bnNoaWZ0KFwic3RhcnRcIiwgc3RhdGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcInBhcmVuLmxwYXJlblwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbCA9PSBcIn1cIiAmJiBzdGFjay5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFjay5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dCA9IHN0YWNrLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubmV4dC5pbmRleE9mKFwic3RyaW5nXCIpICE9IC0xKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJwYXJlbi5lbmRcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWwgPT0gXCJ7XCIgPyBcInBhcmVuLmxwYXJlblwiIDogXCJwYXJlbi5ycGFyZW5cIjtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgbmV4dFN0YXRlOiBcInN0YXJ0XCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuOiBcInN0cmluZy5zdGFydFwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleDogL1wiLyxcbiAgICAgICAgICAgICAgICAgICAgcHVzaDogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXg6IGV4dEVzY2FwZUV4c3ByZXNzc2lvblxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAvXFxcXCN7L1xuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJwYXJlbi5zdGFydFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXg6IC8jey8sXG4gICAgICAgICAgICAgICAgICAgICAgICBwdXNoOiBcInN0YXJ0XCJcbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nLmVuZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXg6IC9cIi8sXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzdHJpbmdcIlxuICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nLnN0YXJ0XCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAvYC8sXG4gICAgICAgICAgICAgICAgICAgIHB1c2g6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiBleHRFc2NhcGVFeHNwcmVzc3Npb25cbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWdleDogL1xcXFwjey9cbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwicGFyZW4uc3RhcnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAvI3svLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHVzaDogXCJzdGFydFwiXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiBcInN0cmluZy5lbmRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAvYC8sXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzdHJpbmdcIlxuICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVOYW1lOiBcInJwc3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIHRva2VuOiBcInN0cmluZy5zdGFydFwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleDogLyVbUXhdP1xcKC8sXG4gICAgICAgICAgICAgICAgICAgIHB1c2g6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiBleHRFc2NhcGVFeHNwcmVzc3Npb25cbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nLnN0YXJ0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWdleDogL1xcKC8sXG4gICAgICAgICAgICAgICAgICAgICAgICBwdXNoOiBcInJwc3RyaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nLmVuZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXg6IC9cXCkvLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJwYXJlbi5zdGFydFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXg6IC8jey8sXG4gICAgICAgICAgICAgICAgICAgICAgICBwdXNoOiBcInN0YXJ0XCJcbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInN0cmluZ1wiXG4gICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZU5hbWU6IFwic3BzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nLnN0YXJ0XCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAvJVtReF0/XFxbLyxcbiAgICAgICAgICAgICAgICAgICAgcHVzaDogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXg6IGV4dEVzY2FwZUV4c3ByZXNzc2lvblxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJzdHJpbmcuc3RhcnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAvXFxbLyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHB1c2g6IFwic3BzdHJpbmdcIlxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJzdHJpbmcuZW5kXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWdleDogL10vLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJwYXJlbi5zdGFydFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXg6IC8jey8sXG4gICAgICAgICAgICAgICAgICAgICAgICBwdXNoOiBcInN0YXJ0XCJcbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInN0cmluZ1wiXG4gICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZU5hbWU6IFwiZnBzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nLnN0YXJ0XCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAvJVtReF0/ey8sXG4gICAgICAgICAgICAgICAgICAgIHB1c2g6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiBleHRFc2NhcGVFeHNwcmVzc3Npb25cbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nLnN0YXJ0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWdleDogL3svLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHVzaDogXCJmcHN0cmluZ1wiXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiBcInN0cmluZy5lbmRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAvfS8sXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiBcInBhcmVuLnN0YXJ0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWdleDogLyN7LyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHB1c2g6IFwic3RhcnRcIlxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwic3RyaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlTmFtZTogXCJ0cHN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJzdHJpbmcuc3RhcnRcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXg6IC8lW1F4XT88LyxcbiAgICAgICAgICAgICAgICAgICAgcHVzaDogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXg6IGV4dEVzY2FwZUV4c3ByZXNzc2lvblxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJzdHJpbmcuc3RhcnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAvPC8sXG4gICAgICAgICAgICAgICAgICAgICAgICBwdXNoOiBcInRwc3RyaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nLmVuZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXg6IC8+LyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwicGFyZW4uc3RhcnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAvI3svLFxuICAgICAgICAgICAgICAgICAgICAgICAgcHVzaDogXCJzdGFydFwiXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzdHJpbmdcIlxuICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVOYW1lOiBcInBwc3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIHRva2VuOiBcInN0cmluZy5zdGFydFwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleDogLyVbUXhdP1xcfC8sXG4gICAgICAgICAgICAgICAgICAgIHB1c2g6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiBleHRFc2NhcGVFeHNwcmVzc3Npb25cbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nLmVuZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXg6IC9cXHwvLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJwYXJlbi5zdGFydFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXg6IC8jey8sXG4gICAgICAgICAgICAgICAgICAgICAgICBwdXNoOiBcInN0YXJ0XCJcbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInN0cmluZ1wiXG4gICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZU5hbWU6IFwicnBxc3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIHRva2VuOiBcInN0cmluZy5zdGFydFwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleDogLyVbcXdpcl1cXCgvLFxuICAgICAgICAgICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nLnN0YXJ0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWdleDogL1xcKC8sXG4gICAgICAgICAgICAgICAgICAgICAgICBwdXNoOiBcInJwcXN0cmluZ1wiXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiBcInN0cmluZy5lbmRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAvXFwpLyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInN0cmluZ1wiXG4gICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZU5hbWU6IFwic3Bxc3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIHRva2VuOiBcInN0cmluZy5zdGFydFwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleDogLyVbcXdpcl1cXFsvLFxuICAgICAgICAgICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nLnN0YXJ0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWdleDogL1xcWy8sXG4gICAgICAgICAgICAgICAgICAgICAgICBwdXNoOiBcInNwcXN0cmluZ1wiXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiBcInN0cmluZy5lbmRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAvXS8sXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzdHJpbmdcIlxuICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVOYW1lOiBcImZwcXN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJzdHJpbmcuc3RhcnRcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXg6IC8lW3F3aXJdey8sXG4gICAgICAgICAgICAgICAgICAgIHB1c2g6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJzdHJpbmcuc3RhcnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAvey8sXG4gICAgICAgICAgICAgICAgICAgICAgICBwdXNoOiBcImZwcXN0cmluZ1wiXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiBcInN0cmluZy5lbmRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAvfS8sXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzdHJpbmdcIlxuICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVOYW1lOiBcInRwcXN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJzdHJpbmcuc3RhcnRcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXg6IC8lW3F3aXJdPC8sXG4gICAgICAgICAgICAgICAgICAgIHB1c2g6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJzdHJpbmcuc3RhcnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAvPC8sXG4gICAgICAgICAgICAgICAgICAgICAgICBwdXNoOiBcInRwcXN0cmluZ1wiXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiBcInN0cmluZy5lbmRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAvPi8sXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzdHJpbmdcIlxuICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVOYW1lOiBcInBwcXN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJzdHJpbmcuc3RhcnRcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXg6IC8lW3F3aXJdXFx8LyxcbiAgICAgICAgICAgICAgICAgICAgcHVzaDogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiBcInN0cmluZy5lbmRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAvXFx8LyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInN0cmluZ1wiXG4gICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJzdHJpbmcuc3RhcnRcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXg6IC8nLyxcbiAgICAgICAgICAgICAgICAgICAgcHVzaDogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXg6IGVzY2FwZUV4cHJlc3Npb25cbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nLmVuZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXg6IC8nfCQvLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwic3RyaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICB9XSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJ0ZXh0XCIsIC8vIG5hbWVzcGFjZXMgYXJlbid0IHN5bWJvbHNcbiAgICAgICAgICAgICAgICAgICAgcmVnZXg6IFwiOjpcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwidmFyaWFibGUuaW5zdGFuY2VcIiwgLy8gaW5zdGFuY2UgdmFyaWFibGVcbiAgICAgICAgICAgICAgICAgICAgcmVnZXg6IFwiQHsxLDJ9W2EtekEtWl9cXFxcZF0rXCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuOiBcInZhcmlhYmxlLmZyZXNoXCIsIC8vIGZyZXNoIHZhcmlhYmxlXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4OiBcIiVbYS16QS1aX1xcXFxkXStcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwic3VwcG9ydC5jbGFzc1wiLCAvLyBjbGFzcyBuYW1lXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4OiBcIltBLVpdW2EtekEtWl9cXFxcZF0rXCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lm90aGVyLnN5bWJvbFwiLCAvLyBzeW1ib2xcbiAgICAgICAgICAgICAgICAgICAgcmVnZXg6IFwiWzpdKD86KD86PT09fDw9PnxcXFxcW11cXFxcP3xcXFxcW109fFxcXFxbXXw+PnxcXFxcKlxcXFwqfDw8fD09fCE9fD49fDw9fCF+fD1+fDx8XFxcXCt8LXxcXFxcKnxcXFxcL3wlfCZ8XFxcXHx8XFxcXF58PnwhfH4pfCg/Oig/OltBLVphLXpfXXxbQCRdKD89W2EtekEtWjAtOV9dKSlbYS16QS1aMC05X10qWyE9P10/KSlcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQubnVtZXJpY1wiLCAvLyBmbG9hdFxuICAgICAgICAgICAgICAgICAgICByZWdleDogXCJbKy1dP1xcXFxkKD86XFxcXGR8Xyg/PVxcXFxkKSkqKD86KD86XFxcXC5cXFxcZCg/OlxcXFxkfF8oPz1cXFxcZCkpKik/KD86W2VFXVsrLV0/XFxcXGQrKT8pPyg/Ol8/W2ZGXSg/OjMyfDY0KSk/XFxcXGJcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQubnVtZXJpY1wiLFxuICAgICAgICAgICAgICAgICAgICByZWdleDogaW50TnVtYmVyXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5vdGhlci5zeW1ib2xcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXg6ICc6XCInLFxuICAgICAgICAgICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWdleDogZXh0RXNjYXBlRXhzcHJlc3NzaW9uXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lm90aGVyLnN5bWJvbFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXg6ICdcIicsXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJjb25zdGFudC5vdGhlci5zeW1ib2xcIlxuICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQubGFuZ3VhZ2UuYm9vbGVhblwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleDogXCIoPzp0cnVlfGZhbHNlKVxcXFxiXCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuOiBcInN1cHBvcnQuZnVuY3Rpb25cIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXg6IFwiKD86aXNfYVxcXFw/fG5pbFxcXFw/fHJlc3BvbmRzX3RvXFxcXD98YXNcXFxcPylcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW46IGtleXdvcmRNYXBwZXIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4OiBcIlthLXpBLVpfJF1bYS16QS1aMC05XyQhP10qXFxcXGJcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwidmFyaWFibGUuc3lzdGVtXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFwkXFxcXCF8XFxcXCRcXFxcP1wiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJwdW5jdHVhdGlvbi5zZXBhcmF0b3Iua2V5LXZhbHVlXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4OiBcIj0+XCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlTmFtZTogXCJoZXJlZG9jXCIsXG4gICAgICAgICAgICAgICAgICAgIG9uTWF0Y2g6IGZ1bmN0aW9uICh2YWx1ZSwgY3VycmVudFN0YXRlLCBzdGFjaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5leHQgPSBcImhlcmVkb2NcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0b2tlbnMgPSB2YWx1ZS5zcGxpdCh0aGlzLnNwbGl0UmVnZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhY2sucHVzaChuZXh0LCB0b2tlbnNbM10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dHlwZTogXCJjb25zdGFudFwiLCB2YWx1ZTogdG9rZW5zWzFdfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dHlwZTogXCJzdHJpbmdcIiwgdmFsdWU6IHRva2Vuc1syXX0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3R5cGU6IFwic3VwcG9ydC5jbGFzc1wiLCB2YWx1ZTogdG9rZW5zWzNdfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dHlwZTogXCJzdHJpbmdcIiwgdmFsdWU6IHRva2Vuc1s0XX1cbiAgICAgICAgICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4OiBcIig8PC0pKFsnXT8pKFtcXFxcd10rKShbJ10/KVwiLFxuICAgICAgICAgICAgICAgICAgICBydWxlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGVyZWRvYzogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWdleDogXCJeICtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uTWF0Y2g6IGZ1bmN0aW9uICh2YWx1ZSwgY3VycmVudFN0YXRlLCBzdGFjaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IHN0YWNrWzFdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFjay5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhY2suc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dCA9IHN0YWNrWzBdIHx8IFwic3RhcnRcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcInN1cHBvcnQuY2xhc3NcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHQgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJzdHJpbmdcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiBcIi4qJFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHQ6IFwic3RhcnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgcmVnZXg6IFwiJFwiLFxuICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJlbXB0eVwiLFxuICAgICAgICAgICAgICAgICAgICBuZXh0OiBmdW5jdGlvbiAoY3VycmVudFN0YXRlLCBzdGFjaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0YWNrWzBdID09PSBcImhlcmVkb2NcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RhY2tbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY3VycmVudFN0YXRlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJwdW5jdHVhdGlvbi5vcGVyYXRvclwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleDogL1suXVxccyooPyFbLl0pLyxcbiAgICAgICAgICAgICAgICAgICAgcHVzaDogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJwdW5jdHVhdGlvbi5vcGVyYXRvclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXggOiAvWy5dXFxzKig/IVsuXSkvXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdXBwb3J0LmZ1bmN0aW9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWdleCA6IFwiW2EtekEtWl8kXVthLXpBLVowLTlfJF0qXFxcXGJcIlxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWdleDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiBcImVtcHR5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJrZXl3b3JkLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4OiBcIiF8XFxcXCR8JXwmfFxcXFwqfFxcXFwtXFxcXC18XFxcXC18XFxcXCtcXFxcK3xcXFxcK3x+fD09PXw9PXw9fCE9fCE9PXw8PXw+PXw8PD18Pj49fD4+Pj18PD58PHw+fCF8XFxcXD98XFxcXDp8JiZ8XFxcXHxcXFxcfHxcXFxcP1xcXFw6fFxcXFwqPXwlPXxcXFxcKz18XFxcXC09fCY9fFxcXFxePXxcXFxcXnxcXFxcfFwiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJwdW5jdHVhdGlvbi5vcGVyYXRvclwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleDogL1s/Oiw7Ll0vXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJwYXJlbi5scGFyZW5cIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXg6IFwiW1soe11cIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwicGFyZW4ucnBhcmVuXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4OiBcIltcXFxcXSl9XVwiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFxzK1wiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMubm9ybWFsaXplUnVsZXMoKTtcbiAgICB9O1xuXG4gICAgb29wLmluaGVyaXRzKENyeXN0YWxIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuICAgIGV4cG9ydHMuQ3J5c3RhbEhpZ2hsaWdodFJ1bGVzID0gQ3J5c3RhbEhpZ2hsaWdodFJ1bGVzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vLi4vbGliL29vcFwiKTtcbnZhciBCYXNlRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9mb2xkX21vZGVcIikuRm9sZE1vZGU7XG52YXIgUmFuZ2UgPSByZXF1aXJlKFwiLi4vLi4vcmFuZ2VcIikuUmFuZ2U7XG5cbnZhciBGb2xkTW9kZSA9IGV4cG9ydHMuRm9sZE1vZGUgPSBmdW5jdGlvbigpIHt9O1xub29wLmluaGVyaXRzKEZvbGRNb2RlLCBCYXNlRm9sZE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5jb21tZW50QmxvY2sgPSBmdW5jdGlvbihzZXNzaW9uLCByb3cpIHtcbiAgICAgICAgdmFyIHJlID0gL1xcUy87XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgIHZhciBzdGFydExldmVsID0gbGluZS5zZWFyY2gocmUpO1xuICAgICAgICBpZiAoc3RhcnRMZXZlbCA9PSAtMSB8fCBsaW5lW3N0YXJ0TGV2ZWxdICE9IFwiI1wiKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHZhciBzdGFydENvbHVtbiA9IGxpbmUubGVuZ3RoO1xuICAgICAgICB2YXIgbWF4Um93ID0gc2Vzc2lvbi5nZXRMZW5ndGgoKTtcbiAgICAgICAgdmFyIHN0YXJ0Um93ID0gcm93O1xuICAgICAgICB2YXIgZW5kUm93ID0gcm93O1xuXG4gICAgICAgIHdoaWxlICgrK3JvdyA8IG1heFJvdykge1xuICAgICAgICAgICAgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICAgICAgdmFyIGxldmVsID0gbGluZS5zZWFyY2gocmUpO1xuXG4gICAgICAgICAgICBpZiAobGV2ZWwgPT0gLTEpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgICAgIGlmIChsaW5lW2xldmVsXSAhPSBcIiNcIilcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZW5kUm93ID0gcm93O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVuZFJvdyA+IHN0YXJ0Um93KSB7XG4gICAgICAgICAgICB2YXIgZW5kQ29sdW1uID0gc2Vzc2lvbi5nZXRMaW5lKGVuZFJvdykubGVuZ3RoO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShzdGFydFJvdywgc3RhcnRDb2x1bW4sIGVuZFJvdywgZW5kQ29sdW1uKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLmdldEZvbGRXaWRnZXRSYW5nZSA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KSB7XG4gICAgICAgIHZhciByYW5nZSA9IHRoaXMuaW5kZW50YXRpb25CbG9jayhzZXNzaW9uLCByb3cpO1xuICAgICAgICBpZiAocmFuZ2UpXG4gICAgICAgICAgICByZXR1cm4gcmFuZ2U7XG5cbiAgICAgICAgcmFuZ2UgPSB0aGlzLmNvbW1lbnRCbG9jayhzZXNzaW9uLCByb3cpO1xuICAgICAgICBpZiAocmFuZ2UpXG4gICAgICAgICAgICByZXR1cm4gcmFuZ2U7XG4gICAgfTtcblxuICAgIC8vIG11c3QgcmV0dXJuIFwiXCIgaWYgdGhlcmUncyBubyBmb2xkLCB0byBlbmFibGUgY2FjaGluZ1xuICAgIHRoaXMuZ2V0Rm9sZFdpZGdldCA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgIHZhciBpbmRlbnQgPSBsaW5lLnNlYXJjaCgvXFxTLyk7XG4gICAgICAgIHZhciBuZXh0ID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyArIDEpO1xuICAgICAgICB2YXIgcHJldiA9IHNlc3Npb24uZ2V0TGluZShyb3cgLSAxKTtcbiAgICAgICAgdmFyIHByZXZJbmRlbnQgPSBwcmV2LnNlYXJjaCgvXFxTLyk7XG4gICAgICAgIHZhciBuZXh0SW5kZW50ID0gbmV4dC5zZWFyY2goL1xcUy8pO1xuXG4gICAgICAgIGlmIChpbmRlbnQgPT0gLTEpIHtcbiAgICAgICAgICAgIHNlc3Npb24uZm9sZFdpZGdldHNbcm93IC0gMV0gPSBwcmV2SW5kZW50IT0gLTEgJiYgcHJldkluZGVudCA8IG5leHRJbmRlbnQgPyBcInN0YXJ0XCIgOiBcIlwiO1xuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBkb2N1bWVudGF0aW9uIGNvbW1lbnRzXG4gICAgICAgIGlmIChwcmV2SW5kZW50ID09IC0xKSB7XG4gICAgICAgICAgICBpZiAoaW5kZW50ID09IG5leHRJbmRlbnQgJiYgbGluZVtpbmRlbnRdID09IFwiI1wiICYmIG5leHRbaW5kZW50XSA9PSBcIiNcIikge1xuICAgICAgICAgICAgICAgIHNlc3Npb24uZm9sZFdpZGdldHNbcm93IC0gMV0gPSBcIlwiO1xuICAgICAgICAgICAgICAgIHNlc3Npb24uZm9sZFdpZGdldHNbcm93ICsgMV0gPSBcIlwiO1xuICAgICAgICAgICAgICAgIHJldHVybiBcInN0YXJ0XCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAocHJldkluZGVudCA9PSBpbmRlbnQgJiYgbGluZVtpbmRlbnRdID09IFwiI1wiICYmIHByZXZbaW5kZW50XSA9PSBcIiNcIikge1xuICAgICAgICAgICAgaWYgKHNlc3Npb24uZ2V0TGluZShyb3cgLSAyKS5zZWFyY2goL1xcUy8pID09IC0xKSB7XG4gICAgICAgICAgICAgICAgc2Vzc2lvbi5mb2xkV2lkZ2V0c1tyb3cgLSAxXSA9IFwic3RhcnRcIjtcbiAgICAgICAgICAgICAgICBzZXNzaW9uLmZvbGRXaWRnZXRzW3JvdyArIDFdID0gXCJcIjtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcmV2SW5kZW50IT0gLTEgJiYgcHJldkluZGVudCA8IGluZGVudClcbiAgICAgICAgICAgIHNlc3Npb24uZm9sZFdpZGdldHNbcm93IC0gMV0gPSBcInN0YXJ0XCI7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHNlc3Npb24uZm9sZFdpZGdldHNbcm93IC0gMV0gPSBcIlwiO1xuXG4gICAgICAgIGlmIChpbmRlbnQgPCBuZXh0SW5kZW50KVxuICAgICAgICAgICAgcmV0dXJuIFwic3RhcnRcIjtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfTtcblxufSkuY2FsbChGb2xkTW9kZS5wcm90b3R5cGUpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBSYW5nZSA9IHJlcXVpcmUoXCIuLi9yYW5nZVwiKS5SYW5nZTtcblxudmFyIE1hdGNoaW5nQnJhY2VPdXRkZW50ID0gZnVuY3Rpb24oKSB7fTtcblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5jaGVja091dGRlbnQgPSBmdW5jdGlvbihsaW5lLCBpbnB1dCkge1xuICAgICAgICBpZiAoISAvXlxccyskLy50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIHJldHVybiAvXlxccypcXH0vLnRlc3QoaW5wdXQpO1xuICAgIH07XG5cbiAgICB0aGlzLmF1dG9PdXRkZW50ID0gZnVuY3Rpb24oZG9jLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBkb2MuZ2V0TGluZShyb3cpO1xuICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKC9eKFxccypcXH0pLyk7XG5cbiAgICAgICAgaWYgKCFtYXRjaCkgcmV0dXJuIDA7XG5cbiAgICAgICAgdmFyIGNvbHVtbiA9IG1hdGNoWzFdLmxlbmd0aDtcbiAgICAgICAgdmFyIG9wZW5CcmFjZVBvcyA9IGRvYy5maW5kTWF0Y2hpbmdCcmFja2V0KHtyb3c6IHJvdywgY29sdW1uOiBjb2x1bW59KTtcblxuICAgICAgICBpZiAoIW9wZW5CcmFjZVBvcyB8fCBvcGVuQnJhY2VQb3Mucm93ID09IHJvdykgcmV0dXJuIDA7XG5cbiAgICAgICAgdmFyIGluZGVudCA9IHRoaXMuJGdldEluZGVudChkb2MuZ2V0TGluZShvcGVuQnJhY2VQb3Mucm93KSk7XG4gICAgICAgIGRvYy5yZXBsYWNlKG5ldyBSYW5nZShyb3csIDAsIHJvdywgY29sdW1uLTEpLCBpbmRlbnQpO1xuICAgIH07XG5cbiAgICB0aGlzLiRnZXRJbmRlbnQgPSBmdW5jdGlvbihsaW5lKSB7XG4gICAgICAgIHJldHVybiBsaW5lLm1hdGNoKC9eXFxzKi8pWzBdO1xuICAgIH07XG5cbn0pLmNhbGwoTWF0Y2hpbmdCcmFjZU91dGRlbnQucHJvdG90eXBlKTtcblxuZXhwb3J0cy5NYXRjaGluZ0JyYWNlT3V0ZGVudCA9IE1hdGNoaW5nQnJhY2VPdXRkZW50O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9