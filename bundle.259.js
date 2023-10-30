"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[259],{

/***/ 59449:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var BaseFoldMode = (__webpack_require__(15369).FoldMode);
var Range = (__webpack_require__(59082)/* .Range */ .e);

var FoldMode = exports.Z = function() {};
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

/***/ 80259:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var CstyleBehaviour = (__webpack_require__(19414)/* .CstyleBehaviour */ .B);
var TextMode = (__webpack_require__(98030).Mode);
var MarkdownHighlightRules = (__webpack_require__(92884)/* .MarkdownHighlightRules */ .B);
var MarkdownFoldMode = (__webpack_require__(59449)/* .FoldMode */ .Z);

var Mode = function() {
    this.HighlightRules = MarkdownHighlightRules;

    this.createModeDelegates({
        javascript: (__webpack_require__(88057).Mode),
        html: (__webpack_require__(75528).Mode),
        bash: (__webpack_require__(88887).Mode),
        sh: (__webpack_require__(88887).Mode),
        xml: (__webpack_require__(94268).Mode),
        css: (__webpack_require__(98771).Mode)
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

/***/ 92884:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var modes = (__webpack_require__(13188).$modes);

var oop = __webpack_require__(89359);
var lang = __webpack_require__(20124);
var TextHighlightRules = (__webpack_require__(28053)/* .TextHighlightRules */ .K);
var HtmlHighlightRules = (__webpack_require__(72843)/* .HtmlHighlightRules */ .V);

var escaped = function(ch) {
    return "(?:[^" + lang.escapeRegExp(ch) + "\\\\]|\\\\.)*";
};

var MarkdownHighlightRules = function() {
    HtmlHighlightRules.call(this);
    // regexp must not have capturing parentheses
    // regexps are ordered -> the first match is used
    var codeBlockStartRule = {
        token : "support.function",
        regex : /^\s*(```+[^`]*|~~~+[^~]*)$/,
        onMatch: function(value, state, stack, line) {
            var m = value.match(/^(\s*)([`~]+)(.*)/);
            var language = /[\w-]+|$/.exec(m[3])[0];
            // TODO lazy-load modes
            if (!modes[language])
                language = "";
            stack.unshift("githubblock", [], [m[1], m[2], language], state);
            return this.token;
        },
        next  : "githubblock"
    };
    var codeBlockRules = [{
        token : "support.function",
        regex : ".*",
        onMatch: function(value, state, stack, line) {
            var embedState = stack[1];
            var indent = stack[2][0];
            var endMarker = stack[2][1];
            var language = stack[2][2];
            
            var m = /^(\s*)(`+|~+)\s*$/.exec(value);
            if (
                m && m[1].length < indent.length + 3
                && m[2].length >= endMarker.length && m[2][0] == endMarker[0]
            ) {
                stack.splice(0, 3);
                this.next = stack.shift();
                return this.token;
            }
            this.next = "";
            if (language && modes[language]) {
                var data = modes[language].getTokenizer().getLineTokens(value, embedState.slice(0));
                stack[1] = data.state;
                return data.tokens;
            }
            return this.token;
        }
    }];

    this.$rules["start"].unshift({
        token : "empty_line",
        regex : '^$',
        next: "allowBlock"
    }, { // h1
        token: "markup.heading.1",
        regex: "^=+(?=\\s*$)"
    }, { // h2
        token: "markup.heading.2",
        regex: "^\\-+(?=\\s*$)"
    }, {
        token : function(value) {
            return "markup.heading." + value.length;
        },
        regex : /^#{1,6}(?=\s|$)/,
        next : "header"
    },
    codeBlockStartRule,
    { // block quote
        token : "string.blockquote",
        regex : "^\\s*>\\s*(?:[*+-]|\\d+\\.)?\\s+",
        next  : "blockquote"
    }, { // HR * - _
        token : "constant",
        regex : "^ {0,3}(?:(?:\\* ?){3,}|(?:\\- ?){3,}|(?:\\_ ?){3,})\\s*$",
        next: "allowBlock"
    }, { // list
        token : "markup.list",
        regex : "^\\s{0,3}(?:[*+-]|\\d+\\.)\\s+",
        next  : "listblock-start"
    }, {
        include : "basic"
    });

    this.addRules({
        "basic" : [{
            token : "constant.language.escape",
            regex : /\\[\\`*_{}\[\]()#+\-.!]/
        }, { // code span `
            token : "support.function",
            regex : "(`+)(.*?[^`])(\\1)"
        }, { // reference
            token : ["text", "constant", "text", "url", "string", "text"],
            regex : "^([ ]{0,3}\\[)([^\\]]+)(\\]:\\s*)([^ ]+)(\\s*(?:[\"][^\"]+[\"])?(\\s*))$"
        }, { // link by reference
            token : ["text", "string", "text", "constant", "text"],
            regex : "(\\[)(" + escaped("]") + ")(\\]\\s*\\[)("+ escaped("]") + ")(\\])"
        }, { // link by url
            token : ["text", "string", "text", "markup.underline", "string", "text"],
            regex : "(\\!?\\[)(" +                                        // [
                    escaped("]") +                                    // link text or alt text
                    ")(\\]\\()"+                                      // ](
                    '((?:[^\\)\\s\\\\]|\\\\.|\\s(?=[^"]))*)' +        // href or image
                    '(\\s*"' +  escaped('"') + '"\\s*)?' +            // "title"
                    "(\\))"                                           // )
        }, { // strong ** __
            token : "string.strong",
            regex : "([*]{2}|[_]{2}(?=\\S))(.*?\\S[*_]*)(\\1)"
        }, { // emphasis * _
            token : "string.emphasis",
            regex : "([*]|[_](?=\\S))(.*?\\S[*_]*)(\\1)"
        }, { //
            token : ["text", "url", "text"],
            regex : "(<)("+
                      "(?:https?|ftp|dict):[^'\">\\s]+"+
                      "|"+
                      "(?:mailto:)?[-.\\w]+\\@[-a-z0-9]+(?:\\.[-a-z0-9]+)*\\.[a-z]+"+
                    ")(>)"
        }],

        // code block
        "allowBlock": [
            {token : "support.function", regex : "^ {4}.+", next : "allowBlock"},
            {token : "empty_line", regex : '^$', next: "allowBlock"},
            {token : "empty", regex : "", next : "start"}
        ],

        "header" : [{
            regex: "$",
            next : "start"
        }, {
            include: "basic"
        }, {
            defaultToken : "heading"
        } ],

        "listblock-start" : [{
            token : "support.variable",
            regex : /(?:\[[ x]\])?/,
            next  : "listblock"
        }],

        "listblock" : [ { // Lists only escape on completely blank lines.
            token : "empty_line",
            regex : "^$",
            next  : "start"
        }, { // list
            token : "markup.list",
            regex : "^\\s{0,3}(?:[*+-]|\\d+\\.)\\s+",
            next  : "listblock-start"
        }, {
            include : "basic", noEscape: true
        },
        codeBlockStartRule,
        {
            defaultToken : "list" //do not use markup.list to allow stling leading `*` differntly
        } ],

        "blockquote" : [ { // Blockquotes only escape on blank lines.
            token : "empty_line",
            regex : "^\\s*$",
            next  : "start"
        }, { // block quote
            token : "string.blockquote",
            regex : "^\\s*>\\s*(?:[*+-]|\\d+\\.)?\\s+",
            next  : "blockquote"
        }, {
            include : "basic", noEscape: true
        }, {
            defaultToken : "string.blockquote"
        } ],

        "githubblock" : codeBlockRules
    });

    this.normalizeRules();
};
oop.inherits(MarkdownHighlightRules, TextHighlightRules);

exports.B = MarkdownHighlightRules;


/***/ }),

/***/ 88887:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var TextMode = (__webpack_require__(98030).Mode);
var ShHighlightRules = (__webpack_require__(87808).ShHighlightRules);
var Range = (__webpack_require__(59082)/* .Range */ .e);
var CStyleFoldMode = (__webpack_require__(12764)/* .FoldMode */ .Z);

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

/***/ 87808:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var TextHighlightRules = (__webpack_require__(28053)/* .TextHighlightRules */ .K);

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

/***/ 94268:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var lang = __webpack_require__(20124);
var TextMode = (__webpack_require__(98030).Mode);
var XmlHighlightRules = (__webpack_require__(75239)/* .XmlHighlightRules */ .U);
var XmlBehaviour = (__webpack_require__(67809)/* .XmlBehaviour */ .D);
var XmlFoldMode = (__webpack_require__(64631)/* .FoldMode */ .Z);
var WorkerClient = (__webpack_require__(91451).WorkerClient);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LHlDQUErQzs7QUFFbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSx5QkFBeUI7O0FBRXpCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQsWUFBWSIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvZm9sZGluZy9tYXJrZG93bi5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL21hcmtkb3duLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvbWFya2Rvd25faGlnaGxpZ2h0X3J1bGVzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvc2guanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9zaF9oaWdobGlnaHRfcnVsZXMuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS94bWwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vLi4vbGliL29vcFwiKTtcbnZhciBCYXNlRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9mb2xkX21vZGVcIikuRm9sZE1vZGU7XG52YXIgUmFuZ2UgPSByZXF1aXJlKFwiLi4vLi4vcmFuZ2VcIikuUmFuZ2U7XG5cbnZhciBGb2xkTW9kZSA9IGV4cG9ydHMuRm9sZE1vZGUgPSBmdW5jdGlvbigpIHt9O1xub29wLmluaGVyaXRzKEZvbGRNb2RlLCBCYXNlRm9sZE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIgPSAvXig/Ols9LV0rXFxzKiR8I3sxLDZ9IHxgezN9KS87XG5cbiAgICB0aGlzLmdldEZvbGRXaWRnZXQgPSBmdW5jdGlvbihzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdykge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICBpZiAoIXRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyLnRlc3QobGluZSkpXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcblxuICAgICAgICBpZiAobGluZVswXSA9PSBcImBcIikge1xuICAgICAgICAgICAgaWYgKHNlc3Npb24uYmdUb2tlbml6ZXIuZ2V0U3RhdGUocm93KSA9PSBcInN0YXJ0XCIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiZW5kXCI7XG4gICAgICAgICAgICByZXR1cm4gXCJzdGFydFwiO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFwic3RhcnRcIjtcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0UmFuZ2UgPSBmdW5jdGlvbihzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdykge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICB2YXIgc3RhcnRDb2x1bW4gPSBsaW5lLmxlbmd0aDtcbiAgICAgICAgdmFyIG1heFJvdyA9IHNlc3Npb24uZ2V0TGVuZ3RoKCk7XG4gICAgICAgIHZhciBzdGFydFJvdyA9IHJvdztcbiAgICAgICAgdmFyIGVuZFJvdyA9IHJvdztcbiAgICAgICAgaWYgKCFsaW5lLm1hdGNoKHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyKSlcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICBpZiAobGluZVswXSA9PSBcImBcIikge1xuICAgICAgICAgICAgaWYgKHNlc3Npb24uYmdUb2tlbml6ZXIuZ2V0U3RhdGUocm93KSAhPT0gXCJzdGFydFwiKSB7XG4gICAgICAgICAgICAgICAgd2hpbGUgKCsrcm93IDwgbWF4Um93KSB7XG4gICAgICAgICAgICAgICAgICAgIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxpbmVbMF0gPT0gXCJgXCIgJiBsaW5lLnN1YnN0cmluZygwLCAzKSA9PSBcImBgYFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUmFuZ2Uoc3RhcnRSb3csIHN0YXJ0Q29sdW1uLCByb3csIDApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB3aGlsZSAocm93IC0tID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsaW5lWzBdID09IFwiYFwiICYgbGluZS5zdWJzdHJpbmcoMCwgMykgPT0gXCJgYGBcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFJhbmdlKHJvdywgbGluZS5sZW5ndGgsIHN0YXJ0Um93LCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB0b2tlbjtcbiAgICAgICAgZnVuY3Rpb24gaXNIZWFkaW5nKHJvdykge1xuICAgICAgICAgICAgdG9rZW4gPSBzZXNzaW9uLmdldFRva2Vucyhyb3cpWzBdO1xuICAgICAgICAgICAgcmV0dXJuIHRva2VuICYmIHRva2VuLnR5cGUubGFzdEluZGV4T2YoaGVhZGluZywgMCkgPT09IDA7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaGVhZGluZyA9IFwibWFya3VwLmhlYWRpbmdcIjtcbiAgICAgICAgZnVuY3Rpb24gZ2V0TGV2ZWwoKSB7XG4gICAgICAgICAgICB2YXIgY2ggPSB0b2tlbi52YWx1ZVswXTtcbiAgICAgICAgICAgIGlmIChjaCA9PSBcIj1cIikgcmV0dXJuIDY7XG4gICAgICAgICAgICBpZiAoY2ggPT0gXCItXCIpIHJldHVybiA1O1xuICAgICAgICAgICAgcmV0dXJuIDcgLSB0b2tlbi52YWx1ZS5zZWFyY2goL1teI118JC8pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzSGVhZGluZyhyb3cpKSB7XG4gICAgICAgICAgICB2YXIgc3RhcnRIZWFkaW5nTGV2ZWwgPSBnZXRMZXZlbCgpO1xuICAgICAgICAgICAgd2hpbGUgKCsrcm93IDwgbWF4Um93KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFpc0hlYWRpbmcocm93KSlcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgdmFyIGxldmVsID0gZ2V0TGV2ZWwoKTtcbiAgICAgICAgICAgICAgICBpZiAobGV2ZWwgPj0gc3RhcnRIZWFkaW5nTGV2ZWwpXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBlbmRSb3cgPSByb3cgLSAoIXRva2VuIHx8IFtcIj1cIiwgXCItXCJdLmluZGV4T2YodG9rZW4udmFsdWVbMF0pID09IC0xID8gMSA6IDIpO1xuXG4gICAgICAgICAgICBpZiAoZW5kUm93ID4gc3RhcnRSb3cpIHtcbiAgICAgICAgICAgICAgICB3aGlsZSAoZW5kUm93ID4gc3RhcnRSb3cgJiYgL15cXHMqJC8udGVzdChzZXNzaW9uLmdldExpbmUoZW5kUm93KSkpXG4gICAgICAgICAgICAgICAgICAgIGVuZFJvdy0tO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZW5kUm93ID4gc3RhcnRSb3cpIHtcbiAgICAgICAgICAgICAgICB2YXIgZW5kQ29sdW1uID0gc2Vzc2lvbi5nZXRMaW5lKGVuZFJvdykubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUmFuZ2Uoc3RhcnRSb3csIHN0YXJ0Q29sdW1uLCBlbmRSb3csIGVuZENvbHVtbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG59KS5jYWxsKEZvbGRNb2RlLnByb3RvdHlwZSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIENzdHlsZUJlaGF2aW91ciA9IHJlcXVpcmUoXCIuL2JlaGF2aW91ci9jc3R5bGVcIikuQ3N0eWxlQmVoYXZpb3VyO1xudmFyIFRleHRNb2RlID0gcmVxdWlyZShcIi4vdGV4dFwiKS5Nb2RlO1xudmFyIE1hcmtkb3duSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9tYXJrZG93bl9oaWdobGlnaHRfcnVsZXNcIikuTWFya2Rvd25IaWdobGlnaHRSdWxlcztcbnZhciBNYXJrZG93bkZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZGluZy9tYXJrZG93blwiKS5Gb2xkTW9kZTtcblxudmFyIE1vZGUgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLkhpZ2hsaWdodFJ1bGVzID0gTWFya2Rvd25IaWdobGlnaHRSdWxlcztcblxuICAgIHRoaXMuY3JlYXRlTW9kZURlbGVnYXRlcyh7XG4gICAgICAgIGphdmFzY3JpcHQ6IHJlcXVpcmUoXCIuL2phdmFzY3JpcHRcIikuTW9kZSxcbiAgICAgICAgaHRtbDogcmVxdWlyZShcIi4vaHRtbFwiKS5Nb2RlLFxuICAgICAgICBiYXNoOiByZXF1aXJlKFwiLi9zaFwiKS5Nb2RlLFxuICAgICAgICBzaDogcmVxdWlyZShcIi4vc2hcIikuTW9kZSxcbiAgICAgICAgeG1sOiByZXF1aXJlKFwiLi94bWxcIikuTW9kZSxcbiAgICAgICAgY3NzOiByZXF1aXJlKFwiLi9jc3NcIikuTW9kZVxuICAgIH0pO1xuXG4gICAgdGhpcy5mb2xkaW5nUnVsZXMgPSBuZXcgTWFya2Rvd25Gb2xkTW9kZSgpO1xuICAgIHRoaXMuJGJlaGF2aW91ciA9IG5ldyBDc3R5bGVCZWhhdmlvdXIoeyBicmFjZXM6IHRydWUgfSk7XG59O1xub29wLmluaGVyaXRzKE1vZGUsIFRleHRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuICAgIHRoaXMudHlwZSA9IFwidGV4dFwiO1xuICAgIHRoaXMuYmxvY2tDb21tZW50ID0ge3N0YXJ0OiBcIjwhLS1cIiwgZW5kOiBcIi0tPlwifTtcbiAgICB0aGlzLiRxdW90ZXMgPSB7J1wiJzogJ1wiJywgXCJgXCI6IFwiYFwifTtcblxuICAgIHRoaXMuZ2V0TmV4dExpbmVJbmRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgbGluZSwgdGFiKSB7XG4gICAgICAgIGlmIChzdGF0ZSA9PSBcImxpc3RibG9ja1wiKSB7XG4gICAgICAgICAgICB2YXIgbWF0Y2ggPSAvXihcXHMqKSg/OihbLSsqXSl8KFxcZCspXFwuKShcXHMrKS8uZXhlYyhsaW5lKTtcbiAgICAgICAgICAgIGlmICghbWF0Y2gpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgICAgICB2YXIgbWFya2VyID0gbWF0Y2hbMl07XG4gICAgICAgICAgICBpZiAoIW1hcmtlcilcbiAgICAgICAgICAgICAgICBtYXJrZXIgPSBwYXJzZUludChtYXRjaFszXSwgMTApICsgMSArIFwiLlwiO1xuICAgICAgICAgICAgcmV0dXJuIG1hdGNoWzFdICsgbWFya2VyICsgbWF0Y2hbNF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kZ2V0SW5kZW50KGxpbmUpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGlzLiRpZCA9IFwiYWNlL21vZGUvbWFya2Rvd25cIjtcbiAgICB0aGlzLnNuaXBwZXRGaWxlSWQgPSBcImFjZS9zbmlwcGV0cy9tYXJrZG93blwiO1xufSkuY2FsbChNb2RlLnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTW9kZSA9IE1vZGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1vZGVzID0gcmVxdWlyZShcIi4uL2NvbmZpZ1wiKS4kbW9kZXM7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBsYW5nID0gcmVxdWlyZShcIi4uL2xpYi9sYW5nXCIpO1xudmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcbnZhciBIdG1sSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9odG1sX2hpZ2hsaWdodF9ydWxlc1wiKS5IdG1sSGlnaGxpZ2h0UnVsZXM7XG5cbnZhciBlc2NhcGVkID0gZnVuY3Rpb24oY2gpIHtcbiAgICByZXR1cm4gXCIoPzpbXlwiICsgbGFuZy5lc2NhcGVSZWdFeHAoY2gpICsgXCJcXFxcXFxcXF18XFxcXFxcXFwuKSpcIjtcbn07XG5cbnZhciBNYXJrZG93bkhpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24oKSB7XG4gICAgSHRtbEhpZ2hsaWdodFJ1bGVzLmNhbGwodGhpcyk7XG4gICAgLy8gcmVnZXhwIG11c3Qgbm90IGhhdmUgY2FwdHVyaW5nIHBhcmVudGhlc2VzXG4gICAgLy8gcmVnZXhwcyBhcmUgb3JkZXJlZCAtPiB0aGUgZmlyc3QgbWF0Y2ggaXMgdXNlZFxuICAgIHZhciBjb2RlQmxvY2tTdGFydFJ1bGUgPSB7XG4gICAgICAgIHRva2VuIDogXCJzdXBwb3J0LmZ1bmN0aW9uXCIsXG4gICAgICAgIHJlZ2V4IDogL15cXHMqKGBgYCtbXmBdKnx+fn4rW15+XSopJC8sXG4gICAgICAgIG9uTWF0Y2g6IGZ1bmN0aW9uKHZhbHVlLCBzdGF0ZSwgc3RhY2ssIGxpbmUpIHtcbiAgICAgICAgICAgIHZhciBtID0gdmFsdWUubWF0Y2goL14oXFxzKikoW2B+XSspKC4qKS8pO1xuICAgICAgICAgICAgdmFyIGxhbmd1YWdlID0gL1tcXHctXSt8JC8uZXhlYyhtWzNdKVswXTtcbiAgICAgICAgICAgIC8vIFRPRE8gbGF6eS1sb2FkIG1vZGVzXG4gICAgICAgICAgICBpZiAoIW1vZGVzW2xhbmd1YWdlXSlcbiAgICAgICAgICAgICAgICBsYW5ndWFnZSA9IFwiXCI7XG4gICAgICAgICAgICBzdGFjay51bnNoaWZ0KFwiZ2l0aHViYmxvY2tcIiwgW10sIFttWzFdLCBtWzJdLCBsYW5ndWFnZV0sIHN0YXRlKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRva2VuO1xuICAgICAgICB9LFxuICAgICAgICBuZXh0ICA6IFwiZ2l0aHViYmxvY2tcIlxuICAgIH07XG4gICAgdmFyIGNvZGVCbG9ja1J1bGVzID0gW3tcbiAgICAgICAgdG9rZW4gOiBcInN1cHBvcnQuZnVuY3Rpb25cIixcbiAgICAgICAgcmVnZXggOiBcIi4qXCIsXG4gICAgICAgIG9uTWF0Y2g6IGZ1bmN0aW9uKHZhbHVlLCBzdGF0ZSwgc3RhY2ssIGxpbmUpIHtcbiAgICAgICAgICAgIHZhciBlbWJlZFN0YXRlID0gc3RhY2tbMV07XG4gICAgICAgICAgICB2YXIgaW5kZW50ID0gc3RhY2tbMl1bMF07XG4gICAgICAgICAgICB2YXIgZW5kTWFya2VyID0gc3RhY2tbMl1bMV07XG4gICAgICAgICAgICB2YXIgbGFuZ3VhZ2UgPSBzdGFja1syXVsyXTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIG0gPSAvXihcXHMqKShgK3x+KylcXHMqJC8uZXhlYyh2YWx1ZSk7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgbSAmJiBtWzFdLmxlbmd0aCA8IGluZGVudC5sZW5ndGggKyAzXG4gICAgICAgICAgICAgICAgJiYgbVsyXS5sZW5ndGggPj0gZW5kTWFya2VyLmxlbmd0aCAmJiBtWzJdWzBdID09IGVuZE1hcmtlclswXVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgc3RhY2suc3BsaWNlKDAsIDMpO1xuICAgICAgICAgICAgICAgIHRoaXMubmV4dCA9IHN0YWNrLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9rZW47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm5leHQgPSBcIlwiO1xuICAgICAgICAgICAgaWYgKGxhbmd1YWdlICYmIG1vZGVzW2xhbmd1YWdlXSkge1xuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gbW9kZXNbbGFuZ3VhZ2VdLmdldFRva2VuaXplcigpLmdldExpbmVUb2tlbnModmFsdWUsIGVtYmVkU3RhdGUuc2xpY2UoMCkpO1xuICAgICAgICAgICAgICAgIHN0YWNrWzFdID0gZGF0YS5zdGF0ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YS50b2tlbnM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50b2tlbjtcbiAgICAgICAgfVxuICAgIH1dO1xuXG4gICAgdGhpcy4kcnVsZXNbXCJzdGFydFwiXS51bnNoaWZ0KHtcbiAgICAgICAgdG9rZW4gOiBcImVtcHR5X2xpbmVcIixcbiAgICAgICAgcmVnZXggOiAnXiQnLFxuICAgICAgICBuZXh0OiBcImFsbG93QmxvY2tcIlxuICAgIH0sIHsgLy8gaDFcbiAgICAgICAgdG9rZW46IFwibWFya3VwLmhlYWRpbmcuMVwiLFxuICAgICAgICByZWdleDogXCJePSsoPz1cXFxccyokKVwiXG4gICAgfSwgeyAvLyBoMlxuICAgICAgICB0b2tlbjogXCJtYXJrdXAuaGVhZGluZy4yXCIsXG4gICAgICAgIHJlZ2V4OiBcIl5cXFxcLSsoPz1cXFxccyokKVwiXG4gICAgfSwge1xuICAgICAgICB0b2tlbiA6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJtYXJrdXAuaGVhZGluZy5cIiArIHZhbHVlLmxlbmd0aDtcbiAgICAgICAgfSxcbiAgICAgICAgcmVnZXggOiAvXiN7MSw2fSg/PVxcc3wkKS8sXG4gICAgICAgIG5leHQgOiBcImhlYWRlclwiXG4gICAgfSxcbiAgICBjb2RlQmxvY2tTdGFydFJ1bGUsXG4gICAgeyAvLyBibG9jayBxdW90ZVxuICAgICAgICB0b2tlbiA6IFwic3RyaW5nLmJsb2NrcXVvdGVcIixcbiAgICAgICAgcmVnZXggOiBcIl5cXFxccyo+XFxcXHMqKD86WyorLV18XFxcXGQrXFxcXC4pP1xcXFxzK1wiLFxuICAgICAgICBuZXh0ICA6IFwiYmxvY2txdW90ZVwiXG4gICAgfSwgeyAvLyBIUiAqIC0gX1xuICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnRcIixcbiAgICAgICAgcmVnZXggOiBcIl4gezAsM30oPzooPzpcXFxcKiA/KXszLH18KD86XFxcXC0gPyl7Myx9fCg/OlxcXFxfID8pezMsfSlcXFxccyokXCIsXG4gICAgICAgIG5leHQ6IFwiYWxsb3dCbG9ja1wiXG4gICAgfSwgeyAvLyBsaXN0XG4gICAgICAgIHRva2VuIDogXCJtYXJrdXAubGlzdFwiLFxuICAgICAgICByZWdleCA6IFwiXlxcXFxzezAsM30oPzpbKistXXxcXFxcZCtcXFxcLilcXFxccytcIixcbiAgICAgICAgbmV4dCAgOiBcImxpc3RibG9jay1zdGFydFwiXG4gICAgfSwge1xuICAgICAgICBpbmNsdWRlIDogXCJiYXNpY1wiXG4gICAgfSk7XG5cbiAgICB0aGlzLmFkZFJ1bGVzKHtcbiAgICAgICAgXCJiYXNpY1wiIDogW3tcbiAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIixcbiAgICAgICAgICAgIHJlZ2V4IDogL1xcXFxbXFxcXGAqX3t9XFxbXFxdKCkjK1xcLS4hXS9cbiAgICAgICAgfSwgeyAvLyBjb2RlIHNwYW4gYFxuICAgICAgICAgICAgdG9rZW4gOiBcInN1cHBvcnQuZnVuY3Rpb25cIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCIoYCspKC4qP1teYF0pKFxcXFwxKVwiXG4gICAgICAgIH0sIHsgLy8gcmVmZXJlbmNlXG4gICAgICAgICAgICB0b2tlbiA6IFtcInRleHRcIiwgXCJjb25zdGFudFwiLCBcInRleHRcIiwgXCJ1cmxcIiwgXCJzdHJpbmdcIiwgXCJ0ZXh0XCJdLFxuICAgICAgICAgICAgcmVnZXggOiBcIl4oWyBdezAsM31cXFxcWykoW15cXFxcXV0rKShcXFxcXTpcXFxccyopKFteIF0rKShcXFxccyooPzpbXFxcIl1bXlxcXCJdK1tcXFwiXSk/KFxcXFxzKikpJFwiXG4gICAgICAgIH0sIHsgLy8gbGluayBieSByZWZlcmVuY2VcbiAgICAgICAgICAgIHRva2VuIDogW1widGV4dFwiLCBcInN0cmluZ1wiLCBcInRleHRcIiwgXCJjb25zdGFudFwiLCBcInRleHRcIl0sXG4gICAgICAgICAgICByZWdleCA6IFwiKFxcXFxbKShcIiArIGVzY2FwZWQoXCJdXCIpICsgXCIpKFxcXFxdXFxcXHMqXFxcXFspKFwiKyBlc2NhcGVkKFwiXVwiKSArIFwiKShcXFxcXSlcIlxuICAgICAgICB9LCB7IC8vIGxpbmsgYnkgdXJsXG4gICAgICAgICAgICB0b2tlbiA6IFtcInRleHRcIiwgXCJzdHJpbmdcIiwgXCJ0ZXh0XCIsIFwibWFya3VwLnVuZGVybGluZVwiLCBcInN0cmluZ1wiLCBcInRleHRcIl0sXG4gICAgICAgICAgICByZWdleCA6IFwiKFxcXFwhP1xcXFxbKShcIiArICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFtcbiAgICAgICAgICAgICAgICAgICAgZXNjYXBlZChcIl1cIikgKyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxpbmsgdGV4dCBvciBhbHQgdGV4dFxuICAgICAgICAgICAgICAgICAgICBcIikoXFxcXF1cXFxcKClcIisgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIF0oXG4gICAgICAgICAgICAgICAgICAgICcoKD86W15cXFxcKVxcXFxzXFxcXFxcXFxdfFxcXFxcXFxcLnxcXFxccyg/PVteXCJdKSkqKScgKyAgICAgICAgLy8gaHJlZiBvciBpbWFnZVxuICAgICAgICAgICAgICAgICAgICAnKFxcXFxzKlwiJyArICBlc2NhcGVkKCdcIicpICsgJ1wiXFxcXHMqKT8nICsgICAgICAgICAgICAvLyBcInRpdGxlXCJcbiAgICAgICAgICAgICAgICAgICAgXCIoXFxcXCkpXCIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gKVxuICAgICAgICB9LCB7IC8vIHN0cm9uZyAqKiBfX1xuICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZy5zdHJvbmdcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCIoWypdezJ9fFtfXXsyfSg/PVxcXFxTKSkoLio/XFxcXFNbKl9dKikoXFxcXDEpXCJcbiAgICAgICAgfSwgeyAvLyBlbXBoYXNpcyAqIF9cbiAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmcuZW1waGFzaXNcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCIoWypdfFtfXSg/PVxcXFxTKSkoLio/XFxcXFNbKl9dKikoXFxcXDEpXCJcbiAgICAgICAgfSwgeyAvL1xuICAgICAgICAgICAgdG9rZW4gOiBbXCJ0ZXh0XCIsIFwidXJsXCIsIFwidGV4dFwiXSxcbiAgICAgICAgICAgIHJlZ2V4IDogXCIoPCkoXCIrXG4gICAgICAgICAgICAgICAgICAgICAgXCIoPzpodHRwcz98ZnRwfGRpY3QpOlteJ1xcXCI+XFxcXHNdK1wiK1xuICAgICAgICAgICAgICAgICAgICAgIFwifFwiK1xuICAgICAgICAgICAgICAgICAgICAgIFwiKD86bWFpbHRvOik/Wy0uXFxcXHddK1xcXFxAWy1hLXowLTldKyg/OlxcXFwuWy1hLXowLTldKykqXFxcXC5bYS16XStcIitcbiAgICAgICAgICAgICAgICAgICAgXCIpKD4pXCJcbiAgICAgICAgfV0sXG5cbiAgICAgICAgLy8gY29kZSBibG9ja1xuICAgICAgICBcImFsbG93QmxvY2tcIjogW1xuICAgICAgICAgICAge3Rva2VuIDogXCJzdXBwb3J0LmZ1bmN0aW9uXCIsIHJlZ2V4IDogXCJeIHs0fS4rXCIsIG5leHQgOiBcImFsbG93QmxvY2tcIn0sXG4gICAgICAgICAgICB7dG9rZW4gOiBcImVtcHR5X2xpbmVcIiwgcmVnZXggOiAnXiQnLCBuZXh0OiBcImFsbG93QmxvY2tcIn0sXG4gICAgICAgICAgICB7dG9rZW4gOiBcImVtcHR5XCIsIHJlZ2V4IDogXCJcIiwgbmV4dCA6IFwic3RhcnRcIn1cbiAgICAgICAgXSxcblxuICAgICAgICBcImhlYWRlclwiIDogW3tcbiAgICAgICAgICAgIHJlZ2V4OiBcIiRcIixcbiAgICAgICAgICAgIG5leHQgOiBcInN0YXJ0XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaW5jbHVkZTogXCJiYXNpY1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGRlZmF1bHRUb2tlbiA6IFwiaGVhZGluZ1wiXG4gICAgICAgIH0gXSxcblxuICAgICAgICBcImxpc3RibG9jay1zdGFydFwiIDogW3tcbiAgICAgICAgICAgIHRva2VuIDogXCJzdXBwb3J0LnZhcmlhYmxlXCIsXG4gICAgICAgICAgICByZWdleCA6IC8oPzpcXFtbIHhdXFxdKT8vLFxuICAgICAgICAgICAgbmV4dCAgOiBcImxpc3RibG9ja1wiXG4gICAgICAgIH1dLFxuXG4gICAgICAgIFwibGlzdGJsb2NrXCIgOiBbIHsgLy8gTGlzdHMgb25seSBlc2NhcGUgb24gY29tcGxldGVseSBibGFuayBsaW5lcy5cbiAgICAgICAgICAgIHRva2VuIDogXCJlbXB0eV9saW5lXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiXiRcIixcbiAgICAgICAgICAgIG5leHQgIDogXCJzdGFydFwiXG4gICAgICAgIH0sIHsgLy8gbGlzdFxuICAgICAgICAgICAgdG9rZW4gOiBcIm1hcmt1cC5saXN0XCIsXG4gICAgICAgICAgICByZWdleCA6IFwiXlxcXFxzezAsM30oPzpbKistXXxcXFxcZCtcXFxcLilcXFxccytcIixcbiAgICAgICAgICAgIG5leHQgIDogXCJsaXN0YmxvY2stc3RhcnRcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpbmNsdWRlIDogXCJiYXNpY1wiLCBub0VzY2FwZTogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICBjb2RlQmxvY2tTdGFydFJ1bGUsXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRlZmF1bHRUb2tlbiA6IFwibGlzdFwiIC8vZG8gbm90IHVzZSBtYXJrdXAubGlzdCB0byBhbGxvdyBzdGxpbmcgbGVhZGluZyBgKmAgZGlmZmVybnRseVxuICAgICAgICB9IF0sXG5cbiAgICAgICAgXCJibG9ja3F1b3RlXCIgOiBbIHsgLy8gQmxvY2txdW90ZXMgb25seSBlc2NhcGUgb24gYmxhbmsgbGluZXMuXG4gICAgICAgICAgICB0b2tlbiA6IFwiZW1wdHlfbGluZVwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIl5cXFxccyokXCIsXG4gICAgICAgICAgICBuZXh0ICA6IFwic3RhcnRcIlxuICAgICAgICB9LCB7IC8vIGJsb2NrIHF1b3RlXG4gICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nLmJsb2NrcXVvdGVcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJeXFxcXHMqPlxcXFxzKig/OlsqKy1dfFxcXFxkK1xcXFwuKT9cXFxccytcIixcbiAgICAgICAgICAgIG5leHQgIDogXCJibG9ja3F1b3RlXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaW5jbHVkZSA6IFwiYmFzaWNcIiwgbm9Fc2NhcGU6IHRydWVcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgZGVmYXVsdFRva2VuIDogXCJzdHJpbmcuYmxvY2txdW90ZVwiXG4gICAgICAgIH0gXSxcblxuICAgICAgICBcImdpdGh1YmJsb2NrXCIgOiBjb2RlQmxvY2tSdWxlc1xuICAgIH0pO1xuXG4gICAgdGhpcy5ub3JtYWxpemVSdWxlcygpO1xufTtcbm9vcC5pbmhlcml0cyhNYXJrZG93bkhpZ2hsaWdodFJ1bGVzLCBUZXh0SGlnaGxpZ2h0UnVsZXMpO1xuXG5leHBvcnRzLk1hcmtkb3duSGlnaGxpZ2h0UnVsZXMgPSBNYXJrZG93bkhpZ2hsaWdodFJ1bGVzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0TW9kZSA9IHJlcXVpcmUoXCIuL3RleHRcIikuTW9kZTtcbnZhciBTaEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vc2hfaGlnaGxpZ2h0X3J1bGVzXCIpLlNoSGlnaGxpZ2h0UnVsZXM7XG52YXIgUmFuZ2UgPSByZXF1aXJlKFwiLi4vcmFuZ2VcIikuUmFuZ2U7XG52YXIgQ1N0eWxlRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9mb2xkaW5nL2NzdHlsZVwiKS5Gb2xkTW9kZTtcblxudmFyIE1vZGUgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLkhpZ2hsaWdodFJ1bGVzID0gU2hIaWdobGlnaHRSdWxlcztcbiAgICB0aGlzLmZvbGRpbmdSdWxlcyA9IG5ldyBDU3R5bGVGb2xkTW9kZSgpO1xuICAgIHRoaXMuJGJlaGF2aW91ciA9IHRoaXMuJGRlZmF1bHRCZWhhdmlvdXI7XG59O1xub29wLmluaGVyaXRzKE1vZGUsIFRleHRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuXG4gICBcbiAgICB0aGlzLmxpbmVDb21tZW50U3RhcnQgPSBcIiNcIjtcblxuICAgIHRoaXMuZ2V0TmV4dExpbmVJbmRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgbGluZSwgdGFiKSB7XG4gICAgICAgIHZhciBpbmRlbnQgPSB0aGlzLiRnZXRJbmRlbnQobGluZSk7XG5cbiAgICAgICAgdmFyIHRva2VuaXplZExpbmUgPSB0aGlzLmdldFRva2VuaXplcigpLmdldExpbmVUb2tlbnMobGluZSwgc3RhdGUpO1xuICAgICAgICB2YXIgdG9rZW5zID0gdG9rZW5pemVkTGluZS50b2tlbnM7XG5cbiAgICAgICAgaWYgKHRva2Vucy5sZW5ndGggJiYgdG9rZW5zW3Rva2Vucy5sZW5ndGgtMV0udHlwZSA9PSBcImNvbW1lbnRcIikge1xuICAgICAgICAgICAgcmV0dXJuIGluZGVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdGF0ZSA9PSBcInN0YXJ0XCIpIHtcbiAgICAgICAgICAgIHZhciBtYXRjaCA9IGxpbmUubWF0Y2goL14uKltcXHtcXChcXFs6XVxccyokLyk7XG4gICAgICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgICAgICBpbmRlbnQgKz0gdGFiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGluZGVudDtcbiAgICB9O1xuXG4gICAgdmFyIG91dGRlbnRzID0ge1xuICAgICAgICBcInBhc3NcIjogMSxcbiAgICAgICAgXCJyZXR1cm5cIjogMSxcbiAgICAgICAgXCJyYWlzZVwiOiAxLFxuICAgICAgICBcImJyZWFrXCI6IDEsXG4gICAgICAgIFwiY29udGludWVcIjogMVxuICAgIH07XG5cbiAgICB0aGlzLmNoZWNrT3V0ZGVudCA9IGZ1bmN0aW9uKHN0YXRlLCBsaW5lLCBpbnB1dCkge1xuICAgICAgICBpZiAoaW5wdXQgIT09IFwiXFxyXFxuXCIgJiYgaW5wdXQgIT09IFwiXFxyXCIgJiYgaW5wdXQgIT09IFwiXFxuXCIpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgdmFyIHRva2VucyA9IHRoaXMuZ2V0VG9rZW5pemVyKCkuZ2V0TGluZVRva2VucyhsaW5lLnRyaW0oKSwgc3RhdGUpLnRva2VucztcblxuICAgICAgICBpZiAoIXRva2VucylcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgICAvLyBpZ25vcmUgdHJhaWxpbmcgY29tbWVudHNcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgdmFyIGxhc3QgPSB0b2tlbnMucG9wKCk7XG4gICAgICAgIH0gd2hpbGUgKGxhc3QgJiYgKGxhc3QudHlwZSA9PSBcImNvbW1lbnRcIiB8fCAobGFzdC50eXBlID09IFwidGV4dFwiICYmIGxhc3QudmFsdWUubWF0Y2goL15cXHMrJC8pKSkpO1xuXG4gICAgICAgIGlmICghbGFzdClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgICByZXR1cm4gKGxhc3QudHlwZSA9PSBcImtleXdvcmRcIiAmJiBvdXRkZW50c1tsYXN0LnZhbHVlXSk7XG4gICAgfTtcblxuICAgIHRoaXMuYXV0b091dGRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgZG9jLCByb3cpIHtcbiAgICAgICAgLy8gb3V0ZGVudGluZyBpbiBzaCBpcyBzbGlnaHRseSBkaWZmZXJlbnQgYmVjYXVzZSBpdCBhbHdheXMgYXBwbGllc1xuICAgICAgICAvLyB0byB0aGUgbmV4dCBsaW5lIGFuZCBvbmx5IG9mIGEgbmV3IGxpbmUgaXMgaW5zZXJ0ZWRcblxuICAgICAgICByb3cgKz0gMTtcbiAgICAgICAgdmFyIGluZGVudCA9IHRoaXMuJGdldEluZGVudChkb2MuZ2V0TGluZShyb3cpKTtcbiAgICAgICAgdmFyIHRhYiA9IGRvYy5nZXRUYWJTdHJpbmcoKTtcbiAgICAgICAgaWYgKGluZGVudC5zbGljZSgtdGFiLmxlbmd0aCkgPT0gdGFiKVxuICAgICAgICAgICAgZG9jLnJlbW92ZShuZXcgUmFuZ2Uocm93LCBpbmRlbnQubGVuZ3RoLXRhYi5sZW5ndGgsIHJvdywgaW5kZW50Lmxlbmd0aCkpO1xuICAgIH07XG5cbiAgICB0aGlzLiRpZCA9IFwiYWNlL21vZGUvc2hcIjtcbiAgICB0aGlzLnNuaXBwZXRGaWxlSWQgPSBcImFjZS9zbmlwcGV0cy9zaFwiO1xufSkuY2FsbChNb2RlLnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTW9kZSA9IE1vZGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcblxudmFyIHJlc2VydmVkS2V5d29yZHMgPSBleHBvcnRzLnJlc2VydmVkS2V5d29yZHMgPSAoXG4gICAgICAgICchfHt8fXxjYXNlfGRvfGRvbmV8ZWxpZnxlbHNlfCcrXG4gICAgICAgICdlc2FjfGZpfGZvcnxpZnxpbnx0aGVufHVudGlsfHdoaWxlfCcrXG4gICAgICAgICcmfDt8ZXhwb3J0fGxvY2FsfHJlYWR8dHlwZXNldHx1bnNldHwnK1xuICAgICAgICAnZWxpZnxzZWxlY3R8c2V0fGZ1bmN0aW9ufGRlY2xhcmV8cmVhZG9ubHknXG4gICAgKTtcblxudmFyIGxhbmd1YWdlQ29uc3RydWN0cyA9IGV4cG9ydHMubGFuZ3VhZ2VDb25zdHJ1Y3RzID0gKFxuICAgICdbfF18YWxpYXN8Ymd8YmluZHxicmVha3xidWlsdGlufCcrXG4gICAgICdjZHxjb21tYW5kfGNvbXBnZW58Y29tcGxldGV8Y29udGludWV8JytcbiAgICAgJ2RpcnN8ZGlzb3dufGVjaG98ZW5hYmxlfGV2YWx8ZXhlY3wnK1xuICAgICAnZXhpdHxmY3xmZ3xnZXRvcHRzfGhhc2h8aGVscHxoaXN0b3J5fCcrXG4gICAgICdqb2JzfGtpbGx8bGV0fGxvZ291dHxwb3BkfHByaW50ZnxwdXNoZHwnK1xuICAgICAncHdkfHJldHVybnxzZXR8c2hpZnR8c2hvcHR8c291cmNlfCcrXG4gICAgICdzdXNwZW5kfHRlc3R8dGltZXN8dHJhcHx0eXBlfHVsaW1pdHwnK1xuICAgICAndW1hc2t8dW5hbGlhc3x3YWl0J1xuKTtcblxudmFyIFNoSGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIga2V5d29yZE1hcHBlciA9IHRoaXMuY3JlYXRlS2V5d29yZE1hcHBlcih7XG4gICAgICAgIFwia2V5d29yZFwiOiByZXNlcnZlZEtleXdvcmRzLFxuICAgICAgICBcInN1cHBvcnQuZnVuY3Rpb24uYnVpbHRpblwiOiBsYW5ndWFnZUNvbnN0cnVjdHMsXG4gICAgICAgIFwiaW52YWxpZC5kZXByZWNhdGVkXCI6IFwiZGVidWdnZXJcIlxuICAgIH0sIFwiaWRlbnRpZmllclwiKTtcblxuICAgIHZhciBpbnRlZ2VyID0gXCIoPzooPzpbMS05XVxcXFxkKil8KD86MCkpXCI7XG4gICAgLy8gdmFyIGludGVnZXIgPSBcIig/OlwiICsgZGVjaW1hbEludGVnZXIgKyBcIilcIjtcblxuICAgIHZhciBmcmFjdGlvbiA9IFwiKD86XFxcXC5cXFxcZCspXCI7XG4gICAgdmFyIGludFBhcnQgPSBcIig/OlxcXFxkKylcIjtcbiAgICB2YXIgcG9pbnRGbG9hdCA9IFwiKD86KD86XCIgKyBpbnRQYXJ0ICsgXCI/XCIgKyBmcmFjdGlvbiArIFwiKXwoPzpcIiArIGludFBhcnQgKyBcIlxcXFwuKSlcIjtcbiAgICB2YXIgZXhwb25lbnRGbG9hdCA9IFwiKD86KD86XCIgKyBwb2ludEZsb2F0ICsgXCJ8XCIgKyAgaW50UGFydCArIFwiKVwiICsgXCIpXCI7XG4gICAgdmFyIGZsb2F0TnVtYmVyID0gXCIoPzpcIiArIGV4cG9uZW50RmxvYXQgKyBcInxcIiArIHBvaW50RmxvYXQgKyBcIilcIjtcbiAgICB2YXIgZmlsZURlc2NyaXB0b3IgPSBcIig/OiZcIiArIGludFBhcnQgKyBcIilcIjtcblxuICAgIHZhciB2YXJpYWJsZU5hbWUgPSBcIlthLXpBLVpfXVthLXpBLVowLTlfXSpcIjtcbiAgICB2YXIgdmFyaWFibGUgPSBcIig/OlwiICsgdmFyaWFibGVOYW1lICsgXCIoPz09KSlcIjtcblxuICAgIHZhciBidWlsdGluVmFyaWFibGUgPSBcIig/OlxcXFwkKD86U0hMVkx8XFxcXCR8XFxcXCF8XFxcXD8pKVwiO1xuXG4gICAgdmFyIGZ1bmMgPSBcIig/OlwiICsgdmFyaWFibGVOYW1lICsgXCJcXFxccypcXFxcKFxcXFwpKVwiO1xuXG4gICAgdGhpcy4kcnVsZXMgPSB7XG4gICAgICAgIFwic3RhcnRcIiA6IFt7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnRcIixcbiAgICAgICAgICAgIHJlZ2V4IDogL1xcXFwuL1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFtcInRleHRcIiwgXCJjb21tZW50XCJdLFxuICAgICAgICAgICAgcmVnZXggOiAvKF58XFxzKSgjLiopJC9cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZy5zdGFydFwiLFxuICAgICAgICAgICAgcmVnZXggOiAnXCInLFxuICAgICAgICAgICAgcHVzaCA6IFt7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogL1xcXFwoPzpbJGBcIlxcXFxdfCQpL1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGluY2x1ZGUgOiBcInZhcmlhYmxlc1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImtleXdvcmQub3BlcmF0b3JcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC9gLyAvLyBUT0RPIGhpZ2hsaWdodCBgXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZy5lbmRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6ICdcIicsXG4gICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzdHJpbmdcIlxuICAgICAgICAgICAgfV1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwkJ1wiLFxuICAgICAgICAgICAgcHVzaCA6IFt7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogL1xcXFwoPzpbYWJlRWZucnR2XFxcXCdcIl18eFthLWZBLUZcXGRdezEsMn18dVthLWZBLUZcXGRdezR9KFthLWZBLUZcXGRdezR9KT98Yy58XFxkezEsM30pL1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiJ1wiLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwic3RyaW5nXCJcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHJlZ2V4IDogXCI8PDxcIixcbiAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkLm9wZXJhdG9yXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgc3RhdGVOYW1lOiBcImhlcmVkb2NcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCIoPDwtPykoXFxcXHMqKShbJ1xcXCJgXT8pKFtcXFxcd1xcXFwtXSspKFsnXFxcImBdPylcIixcbiAgICAgICAgICAgIG9uTWF0Y2ggOiBmdW5jdGlvbih2YWx1ZSwgY3VycmVudFN0YXRlLCBzdGFjaykge1xuICAgICAgICAgICAgICAgIHZhciBuZXh0ID0gdmFsdWVbMl0gPT0gJy0nID8gXCJpbmRlbnRlZEhlcmVkb2NcIiA6IFwiaGVyZWRvY1wiO1xuICAgICAgICAgICAgICAgIHZhciB0b2tlbnMgPSB2YWx1ZS5zcGxpdCh0aGlzLnNwbGl0UmVnZXgpO1xuICAgICAgICAgICAgICAgIHN0YWNrLnB1c2gobmV4dCwgdG9rZW5zWzRdKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgICB7dHlwZTpcImNvbnN0YW50XCIsIHZhbHVlOiB0b2tlbnNbMV19LFxuICAgICAgICAgICAgICAgICAgICB7dHlwZTpcInRleHRcIiwgdmFsdWU6IHRva2Vuc1syXX0sXG4gICAgICAgICAgICAgICAgICAgIHt0eXBlOlwic3RyaW5nXCIsIHZhbHVlOiB0b2tlbnNbM119LFxuICAgICAgICAgICAgICAgICAgICB7dHlwZTpcInN1cHBvcnQuY2xhc3NcIiwgdmFsdWU6IHRva2Vuc1s0XX0sXG4gICAgICAgICAgICAgICAgICAgIHt0eXBlOlwic3RyaW5nXCIsIHZhbHVlOiB0b2tlbnNbNV19XG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBydWxlczoge1xuICAgICAgICAgICAgICAgIGhlcmVkb2M6IFt7XG4gICAgICAgICAgICAgICAgICAgIG9uTWF0Y2g6ICBmdW5jdGlvbih2YWx1ZSwgY3VycmVudFN0YXRlLCBzdGFjaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSBzdGFja1sxXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWNrLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhY2suc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHQgPSBzdGFja1swXSB8fCBcInN0YXJ0XCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwic3VwcG9ydC5jbGFzc1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0ID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcInN0cmluZ1wiO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICByZWdleDogXCIuKiRcIixcbiAgICAgICAgICAgICAgICAgICAgbmV4dDogXCJzdGFydFwiXG4gICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgaW5kZW50ZWRIZXJlZG9jOiBbe1xuICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXg6IFwiXlxcdCtcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgb25NYXRjaDogIGZ1bmN0aW9uKHZhbHVlLCBjdXJyZW50U3RhdGUsIHN0YWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IHN0YWNrWzFdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhY2suc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFjay5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dCA9IHN0YWNrWzBdIHx8IFwic3RhcnRcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJzdXBwb3J0LmNsYXNzXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHQgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwic3RyaW5nXCI7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4OiBcIi4qJFwiLFxuICAgICAgICAgICAgICAgICAgICBuZXh0OiBcInN0YXJ0XCJcbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICByZWdleCA6IFwiJFwiLFxuICAgICAgICAgICAgdG9rZW4gOiBcImVtcHR5XCIsXG4gICAgICAgICAgICBuZXh0IDogZnVuY3Rpb24oY3VycmVudFN0YXRlLCBzdGFjaykge1xuICAgICAgICAgICAgICAgIGlmIChzdGFja1swXSA9PT0gXCJoZXJlZG9jXCIgfHwgc3RhY2tbMF0gPT09IFwiaW5kZW50ZWRIZXJlZG9jXCIpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdGFja1swXTtcbiAgICAgICAgICAgICAgICByZXR1cm4gY3VycmVudFN0YXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFtcImtleXdvcmRcIiwgXCJ0ZXh0XCIsIFwidGV4dFwiLCBcInRleHRcIiwgXCJ2YXJpYWJsZVwiXSxcbiAgICAgICAgICAgIHJlZ2V4IDogLyhkZWNsYXJlfGxvY2FsfHJlYWRvbmx5KShcXHMrKSg/OigtW2ZpeGFyXSspKFxccyspKT8oW2EtekEtWl9dW2EtekEtWjAtOV9dKlxcYikvXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJ2YXJpYWJsZS5sYW5ndWFnZVwiLFxuICAgICAgICAgICAgcmVnZXggOiBidWlsdGluVmFyaWFibGVcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInZhcmlhYmxlXCIsXG4gICAgICAgICAgICByZWdleCA6IHZhcmlhYmxlXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGluY2x1ZGUgOiBcInZhcmlhYmxlc1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJzdXBwb3J0LmZ1bmN0aW9uXCIsXG4gICAgICAgICAgICByZWdleCA6IGZ1bmNcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInN1cHBvcnQuZnVuY3Rpb25cIixcbiAgICAgICAgICAgIHJlZ2V4IDogZmlsZURlc2NyaXB0b3JcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLCAgICAgICAgICAgLy8gJyBzdHJpbmdcbiAgICAgICAgICAgIHN0YXJ0IDogXCInXCIsIGVuZCA6IFwiJ1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5udW1lcmljXCIsIC8vIGZsb2F0XG4gICAgICAgICAgICByZWdleCA6IGZsb2F0TnVtYmVyXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5udW1lcmljXCIsIC8vIGludGVnZXJcbiAgICAgICAgICAgIHJlZ2V4IDogaW50ZWdlciArIFwiXFxcXGJcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IGtleXdvcmRNYXBwZXIsXG4gICAgICAgICAgICByZWdleCA6IFwiW2EtekEtWl9dW2EtekEtWjAtOV9dKlxcXFxiXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcImtleXdvcmQub3BlcmF0b3JcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcK3xcXFxcLXxcXFxcKnxcXFxcKlxcXFwqfFxcXFwvfFxcXFwvXFxcXC98fnw8fD58PD18PT58PXwhPXxbJSZ8YF1cIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwicHVuY3R1YXRpb24ub3BlcmF0b3JcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCI7XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInBhcmVuLmxwYXJlblwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIltcXFxcW1xcXFwoXFxcXHtdXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInBhcmVuLnJwYXJlblwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIltcXFxcXV1cIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwicGFyZW4ucnBhcmVuXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiW1xcXFwpXFxcXH1dXCIsXG4gICAgICAgICAgICBuZXh0IDogXCJwb3BcIlxuICAgICAgICB9XSxcbiAgICAgICAgdmFyaWFibGVzOiBbe1xuICAgICAgICAgICAgdG9rZW4gOiBcInZhcmlhYmxlXCIsXG4gICAgICAgICAgICByZWdleCA6IC8oXFwkKShcXHcrKS9cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBbXCJ2YXJpYWJsZVwiLCBcInBhcmVuLmxwYXJlblwiXSxcbiAgICAgICAgICAgIHJlZ2V4IDogLyhcXCQpKFxcKCkvLFxuICAgICAgICAgICAgcHVzaCA6IFwic3RhcnRcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFtcInZhcmlhYmxlXCIsIFwicGFyZW4ubHBhcmVuXCIsIFwia2V5d29yZC5vcGVyYXRvclwiLCBcInZhcmlhYmxlXCIsIFwia2V5d29yZC5vcGVyYXRvclwiXSxcbiAgICAgICAgICAgIHJlZ2V4IDogLyhcXCQpKFxceykoWyMhXT8pKFxcdyt8WypAIz9cXC0kITBfXSkoOls/K1xcLT1dP3wjIz98JSU/fCwsP1xcL3xcXF5cXF4/KT8vLFxuICAgICAgICAgICAgcHVzaCA6IFwic3RhcnRcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwidmFyaWFibGVcIixcbiAgICAgICAgICAgIHJlZ2V4IDogL1xcJFsqQCM/XFwtJCEwX10vXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogW1widmFyaWFibGVcIiwgXCJwYXJlbi5scGFyZW5cIl0sXG4gICAgICAgICAgICByZWdleCA6IC8oXFwkKShcXHspLyxcbiAgICAgICAgICAgIHB1c2ggOiBcInN0YXJ0XCJcbiAgICAgICAgfV1cbiAgICB9O1xuICAgIFxuICAgIHRoaXMubm9ybWFsaXplUnVsZXMoKTtcbn07XG5cbm9vcC5pbmhlcml0cyhTaEhpZ2hsaWdodFJ1bGVzLCBUZXh0SGlnaGxpZ2h0UnVsZXMpO1xuXG5leHBvcnRzLlNoSGlnaGxpZ2h0UnVsZXMgPSBTaEhpZ2hsaWdodFJ1bGVzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBsYW5nID0gcmVxdWlyZShcIi4uL2xpYi9sYW5nXCIpO1xudmFyIFRleHRNb2RlID0gcmVxdWlyZShcIi4vdGV4dFwiKS5Nb2RlO1xudmFyIFhtbEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4veG1sX2hpZ2hsaWdodF9ydWxlc1wiKS5YbWxIaWdobGlnaHRSdWxlcztcbnZhciBYbWxCZWhhdmlvdXIgPSByZXF1aXJlKFwiLi9iZWhhdmlvdXIveG1sXCIpLlhtbEJlaGF2aW91cjtcbnZhciBYbWxGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRpbmcveG1sXCIpLkZvbGRNb2RlO1xudmFyIFdvcmtlckNsaWVudCA9IHJlcXVpcmUoXCIuLi93b3JrZXIvd29ya2VyX2NsaWVudFwiKS5Xb3JrZXJDbGllbnQ7XG5cbnZhciBNb2RlID0gZnVuY3Rpb24oKSB7XG4gICB0aGlzLkhpZ2hsaWdodFJ1bGVzID0gWG1sSGlnaGxpZ2h0UnVsZXM7XG4gICB0aGlzLiRiZWhhdmlvdXIgPSBuZXcgWG1sQmVoYXZpb3VyKCk7XG4gICB0aGlzLmZvbGRpbmdSdWxlcyA9IG5ldyBYbWxGb2xkTW9kZSgpO1xufTtcblxub29wLmluaGVyaXRzKE1vZGUsIFRleHRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy52b2lkRWxlbWVudHMgPSBsYW5nLmFycmF5VG9NYXAoW10pO1xuXG4gICAgdGhpcy5ibG9ja0NvbW1lbnQgPSB7c3RhcnQ6IFwiPCEtLVwiLCBlbmQ6IFwiLS0+XCJ9O1xuXG4gICAgdGhpcy5jcmVhdGVXb3JrZXIgPSBmdW5jdGlvbihzZXNzaW9uKSB7XG4gICAgICAgIHZhciB3b3JrZXIgPSBuZXcgV29ya2VyQ2xpZW50KFtcImFjZVwiXSwgXCJhY2UvbW9kZS94bWxfd29ya2VyXCIsIFwiV29ya2VyXCIpO1xuICAgICAgICB3b3JrZXIuYXR0YWNoVG9Eb2N1bWVudChzZXNzaW9uLmdldERvY3VtZW50KCkpO1xuXG4gICAgICAgIHdvcmtlci5vbihcImVycm9yXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIHNlc3Npb24uc2V0QW5ub3RhdGlvbnMoZS5kYXRhKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgd29ya2VyLm9uKFwidGVybWluYXRlXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2Vzc2lvbi5jbGVhckFubm90YXRpb25zKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB3b3JrZXI7XG4gICAgfTtcbiAgICBcbiAgICB0aGlzLiRpZCA9IFwiYWNlL21vZGUveG1sXCI7XG59KS5jYWxsKE1vZGUucHJvdG90eXBlKTtcblxuZXhwb3J0cy5Nb2RlID0gTW9kZTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==