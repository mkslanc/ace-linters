"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[5390],{

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

/***/ 98137:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var modes = (__webpack_require__(76321).$modes);

var oop = __webpack_require__(2645);
var lang = __webpack_require__(39955);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);
var HtmlHighlightRules = (__webpack_require__(10413).HtmlHighlightRules);

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

exports.R = MarkdownHighlightRules;


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Qix5Q0FBK0M7O0FBRWxFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEseUJBQXlCOztBQUV6QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVELFlBQVkiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2ZvbGRpbmcvbWFya2Rvd24uanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9tYXJrZG93bi5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL21hcmtkb3duX2hpZ2hsaWdodF9ydWxlcy5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL3NoLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvc2hfaGlnaGxpZ2h0X3J1bGVzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUveG1sLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uLy4uL2xpYi9vb3BcIik7XG52YXIgQmFzZUZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZF9tb2RlXCIpLkZvbGRNb2RlO1xudmFyIFJhbmdlID0gcmVxdWlyZShcIi4uLy4uL3JhbmdlXCIpLlJhbmdlO1xuXG52YXIgRm9sZE1vZGUgPSBleHBvcnRzLkZvbGRNb2RlID0gZnVuY3Rpb24oKSB7fTtcbm9vcC5pbmhlcml0cyhGb2xkTW9kZSwgQmFzZUZvbGRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyID0gL14oPzpbPS1dK1xccyokfCN7MSw2fSB8YHszfSkvO1xuXG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0ID0gZnVuY3Rpb24oc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgaWYgKCF0aGlzLmZvbGRpbmdTdGFydE1hcmtlci50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG5cbiAgICAgICAgaWYgKGxpbmVbMF0gPT0gXCJgXCIpIHtcbiAgICAgICAgICAgIGlmIChzZXNzaW9uLmJnVG9rZW5pemVyLmdldFN0YXRlKHJvdykgPT0gXCJzdGFydFwiKVxuICAgICAgICAgICAgICAgIHJldHVybiBcImVuZFwiO1xuICAgICAgICAgICAgcmV0dXJuIFwic3RhcnRcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBcInN0YXJ0XCI7XG4gICAgfTtcblxuICAgIHRoaXMuZ2V0Rm9sZFdpZGdldFJhbmdlID0gZnVuY3Rpb24oc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgdmFyIHN0YXJ0Q29sdW1uID0gbGluZS5sZW5ndGg7XG4gICAgICAgIHZhciBtYXhSb3cgPSBzZXNzaW9uLmdldExlbmd0aCgpO1xuICAgICAgICB2YXIgc3RhcnRSb3cgPSByb3c7XG4gICAgICAgIHZhciBlbmRSb3cgPSByb3c7XG4gICAgICAgIGlmICghbGluZS5tYXRjaCh0aGlzLmZvbGRpbmdTdGFydE1hcmtlcikpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgaWYgKGxpbmVbMF0gPT0gXCJgXCIpIHtcbiAgICAgICAgICAgIGlmIChzZXNzaW9uLmJnVG9rZW5pemVyLmdldFN0YXRlKHJvdykgIT09IFwic3RhcnRcIikge1xuICAgICAgICAgICAgICAgIHdoaWxlICgrK3JvdyA8IG1heFJvdykge1xuICAgICAgICAgICAgICAgICAgICBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsaW5lWzBdID09IFwiYFwiICYgbGluZS5zdWJzdHJpbmcoMCwgMykgPT0gXCJgYGBcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFJhbmdlKHN0YXJ0Um93LCBzdGFydENvbHVtbiwgcm93LCAwKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgd2hpbGUgKHJvdyAtLSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobGluZVswXSA9PSBcImBcIiAmIGxpbmUuc3Vic3RyaW5nKDAsIDMpID09IFwiYGBgXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShyb3csIGxpbmUubGVuZ3RoLCBzdGFydFJvdywgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgdG9rZW47XG4gICAgICAgIGZ1bmN0aW9uIGlzSGVhZGluZyhyb3cpIHtcbiAgICAgICAgICAgIHRva2VuID0gc2Vzc2lvbi5nZXRUb2tlbnMocm93KVswXTtcbiAgICAgICAgICAgIHJldHVybiB0b2tlbiAmJiB0b2tlbi50eXBlLmxhc3RJbmRleE9mKGhlYWRpbmcsIDApID09PSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGhlYWRpbmcgPSBcIm1hcmt1cC5oZWFkaW5nXCI7XG4gICAgICAgIGZ1bmN0aW9uIGdldExldmVsKCkge1xuICAgICAgICAgICAgdmFyIGNoID0gdG9rZW4udmFsdWVbMF07XG4gICAgICAgICAgICBpZiAoY2ggPT0gXCI9XCIpIHJldHVybiA2O1xuICAgICAgICAgICAgaWYgKGNoID09IFwiLVwiKSByZXR1cm4gNTtcbiAgICAgICAgICAgIHJldHVybiA3IC0gdG9rZW4udmFsdWUuc2VhcmNoKC9bXiNdfCQvKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0hlYWRpbmcocm93KSkge1xuICAgICAgICAgICAgdmFyIHN0YXJ0SGVhZGluZ0xldmVsID0gZ2V0TGV2ZWwoKTtcbiAgICAgICAgICAgIHdoaWxlICgrK3JvdyA8IG1heFJvdykge1xuICAgICAgICAgICAgICAgIGlmICghaXNIZWFkaW5nKHJvdykpXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIHZhciBsZXZlbCA9IGdldExldmVsKCk7XG4gICAgICAgICAgICAgICAgaWYgKGxldmVsID49IHN0YXJ0SGVhZGluZ0xldmVsKVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZW5kUm93ID0gcm93IC0gKCF0b2tlbiB8fCBbXCI9XCIsIFwiLVwiXS5pbmRleE9mKHRva2VuLnZhbHVlWzBdKSA9PSAtMSA/IDEgOiAyKTtcblxuICAgICAgICAgICAgaWYgKGVuZFJvdyA+IHN0YXJ0Um93KSB7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGVuZFJvdyA+IHN0YXJ0Um93ICYmIC9eXFxzKiQvLnRlc3Qoc2Vzc2lvbi5nZXRMaW5lKGVuZFJvdykpKVxuICAgICAgICAgICAgICAgICAgICBlbmRSb3ctLTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGVuZFJvdyA+IHN0YXJ0Um93KSB7XG4gICAgICAgICAgICAgICAgdmFyIGVuZENvbHVtbiA9IHNlc3Npb24uZ2V0TGluZShlbmRSb3cpLmxlbmd0aDtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFJhbmdlKHN0YXJ0Um93LCBzdGFydENvbHVtbiwgZW5kUm93LCBlbmRDb2x1bW4pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxufSkuY2FsbChGb2xkTW9kZS5wcm90b3R5cGUpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBDc3R5bGVCZWhhdmlvdXIgPSByZXF1aXJlKFwiLi9iZWhhdmlvdXIvY3N0eWxlXCIpLkNzdHlsZUJlaGF2aW91cjtcbnZhciBUZXh0TW9kZSA9IHJlcXVpcmUoXCIuL3RleHRcIikuTW9kZTtcbnZhciBNYXJrZG93bkhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vbWFya2Rvd25faGlnaGxpZ2h0X3J1bGVzXCIpLk1hcmtkb3duSGlnaGxpZ2h0UnVsZXM7XG52YXIgTWFya2Rvd25Gb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRpbmcvbWFya2Rvd25cIikuRm9sZE1vZGU7XG5cbnZhciBNb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5IaWdobGlnaHRSdWxlcyA9IE1hcmtkb3duSGlnaGxpZ2h0UnVsZXM7XG5cbiAgICB0aGlzLmNyZWF0ZU1vZGVEZWxlZ2F0ZXMoe1xuICAgICAgICBqYXZhc2NyaXB0OiByZXF1aXJlKFwiLi9qYXZhc2NyaXB0XCIpLk1vZGUsXG4gICAgICAgIGh0bWw6IHJlcXVpcmUoXCIuL2h0bWxcIikuTW9kZSxcbiAgICAgICAgYmFzaDogcmVxdWlyZShcIi4vc2hcIikuTW9kZSxcbiAgICAgICAgc2g6IHJlcXVpcmUoXCIuL3NoXCIpLk1vZGUsXG4gICAgICAgIHhtbDogcmVxdWlyZShcIi4veG1sXCIpLk1vZGUsXG4gICAgICAgIGNzczogcmVxdWlyZShcIi4vY3NzXCIpLk1vZGVcbiAgICB9KTtcblxuICAgIHRoaXMuZm9sZGluZ1J1bGVzID0gbmV3IE1hcmtkb3duRm9sZE1vZGUoKTtcbiAgICB0aGlzLiRiZWhhdmlvdXIgPSBuZXcgQ3N0eWxlQmVoYXZpb3VyKHsgYnJhY2VzOiB0cnVlIH0pO1xufTtcbm9vcC5pbmhlcml0cyhNb2RlLCBUZXh0TW9kZSk7XG5cbihmdW5jdGlvbigpIHtcbiAgICB0aGlzLnR5cGUgPSBcInRleHRcIjtcbiAgICB0aGlzLmJsb2NrQ29tbWVudCA9IHtzdGFydDogXCI8IS0tXCIsIGVuZDogXCItLT5cIn07XG4gICAgdGhpcy4kcXVvdGVzID0geydcIic6ICdcIicsIFwiYFwiOiBcImBcIn07XG5cbiAgICB0aGlzLmdldE5leHRMaW5lSW5kZW50ID0gZnVuY3Rpb24oc3RhdGUsIGxpbmUsIHRhYikge1xuICAgICAgICBpZiAoc3RhdGUgPT0gXCJsaXN0YmxvY2tcIikge1xuICAgICAgICAgICAgdmFyIG1hdGNoID0gL14oXFxzKikoPzooWy0rKl0pfChcXGQrKVxcLikoXFxzKykvLmV4ZWMobGluZSk7XG4gICAgICAgICAgICBpZiAoIW1hdGNoKVxuICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICAgICAgdmFyIG1hcmtlciA9IG1hdGNoWzJdO1xuICAgICAgICAgICAgaWYgKCFtYXJrZXIpXG4gICAgICAgICAgICAgICAgbWFya2VyID0gcGFyc2VJbnQobWF0Y2hbM10sIDEwKSArIDEgKyBcIi5cIjtcbiAgICAgICAgICAgIHJldHVybiBtYXRjaFsxXSArIG1hcmtlciArIG1hdGNoWzRdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGdldEluZGVudChsaW5lKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdGhpcy4kaWQgPSBcImFjZS9tb2RlL21hcmtkb3duXCI7XG4gICAgdGhpcy5zbmlwcGV0RmlsZUlkID0gXCJhY2Uvc25pcHBldHMvbWFya2Rvd25cIjtcbn0pLmNhbGwoTW9kZS5wcm90b3R5cGUpO1xuXG5leHBvcnRzLk1vZGUgPSBNb2RlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtb2RlcyA9IHJlcXVpcmUoXCIuLi9jb25maWdcIikuJG1vZGVzO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgbGFuZyA9IHJlcXVpcmUoXCIuLi9saWIvbGFuZ1wiKTtcbnZhciBUZXh0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90ZXh0X2hpZ2hsaWdodF9ydWxlc1wiKS5UZXh0SGlnaGxpZ2h0UnVsZXM7XG52YXIgSHRtbEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vaHRtbF9oaWdobGlnaHRfcnVsZXNcIikuSHRtbEhpZ2hsaWdodFJ1bGVzO1xuXG52YXIgZXNjYXBlZCA9IGZ1bmN0aW9uKGNoKSB7XG4gICAgcmV0dXJuIFwiKD86W15cIiArIGxhbmcuZXNjYXBlUmVnRXhwKGNoKSArIFwiXFxcXFxcXFxdfFxcXFxcXFxcLikqXCI7XG59O1xuXG52YXIgTWFya2Rvd25IaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uKCkge1xuICAgIEh0bWxIaWdobGlnaHRSdWxlcy5jYWxsKHRoaXMpO1xuICAgIC8vIHJlZ2V4cCBtdXN0IG5vdCBoYXZlIGNhcHR1cmluZyBwYXJlbnRoZXNlc1xuICAgIC8vIHJlZ2V4cHMgYXJlIG9yZGVyZWQgLT4gdGhlIGZpcnN0IG1hdGNoIGlzIHVzZWRcbiAgICB2YXIgY29kZUJsb2NrU3RhcnRSdWxlID0ge1xuICAgICAgICB0b2tlbiA6IFwic3VwcG9ydC5mdW5jdGlvblwiLFxuICAgICAgICByZWdleCA6IC9eXFxzKihgYGArW15gXSp8fn5+K1tefl0qKSQvLFxuICAgICAgICBvbk1hdGNoOiBmdW5jdGlvbih2YWx1ZSwgc3RhdGUsIHN0YWNrLCBsaW5lKSB7XG4gICAgICAgICAgICB2YXIgbSA9IHZhbHVlLm1hdGNoKC9eKFxccyopKFtgfl0rKSguKikvKTtcbiAgICAgICAgICAgIHZhciBsYW5ndWFnZSA9IC9bXFx3LV0rfCQvLmV4ZWMobVszXSlbMF07XG4gICAgICAgICAgICAvLyBUT0RPIGxhenktbG9hZCBtb2Rlc1xuICAgICAgICAgICAgaWYgKCFtb2Rlc1tsYW5ndWFnZV0pXG4gICAgICAgICAgICAgICAgbGFuZ3VhZ2UgPSBcIlwiO1xuICAgICAgICAgICAgc3RhY2sudW5zaGlmdChcImdpdGh1YmJsb2NrXCIsIFtdLCBbbVsxXSwgbVsyXSwgbGFuZ3VhZ2VdLCBzdGF0ZSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50b2tlbjtcbiAgICAgICAgfSxcbiAgICAgICAgbmV4dCAgOiBcImdpdGh1YmJsb2NrXCJcbiAgICB9O1xuICAgIHZhciBjb2RlQmxvY2tSdWxlcyA9IFt7XG4gICAgICAgIHRva2VuIDogXCJzdXBwb3J0LmZ1bmN0aW9uXCIsXG4gICAgICAgIHJlZ2V4IDogXCIuKlwiLFxuICAgICAgICBvbk1hdGNoOiBmdW5jdGlvbih2YWx1ZSwgc3RhdGUsIHN0YWNrLCBsaW5lKSB7XG4gICAgICAgICAgICB2YXIgZW1iZWRTdGF0ZSA9IHN0YWNrWzFdO1xuICAgICAgICAgICAgdmFyIGluZGVudCA9IHN0YWNrWzJdWzBdO1xuICAgICAgICAgICAgdmFyIGVuZE1hcmtlciA9IHN0YWNrWzJdWzFdO1xuICAgICAgICAgICAgdmFyIGxhbmd1YWdlID0gc3RhY2tbMl1bMl07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciBtID0gL14oXFxzKikoYCt8fispXFxzKiQvLmV4ZWModmFsdWUpO1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIG0gJiYgbVsxXS5sZW5ndGggPCBpbmRlbnQubGVuZ3RoICsgM1xuICAgICAgICAgICAgICAgICYmIG1bMl0ubGVuZ3RoID49IGVuZE1hcmtlci5sZW5ndGggJiYgbVsyXVswXSA9PSBlbmRNYXJrZXJbMF1cbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHN0YWNrLnNwbGljZSgwLCAzKTtcbiAgICAgICAgICAgICAgICB0aGlzLm5leHQgPSBzdGFjay5zaGlmdCgpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRva2VuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5uZXh0ID0gXCJcIjtcbiAgICAgICAgICAgIGlmIChsYW5ndWFnZSAmJiBtb2Rlc1tsYW5ndWFnZV0pIHtcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IG1vZGVzW2xhbmd1YWdlXS5nZXRUb2tlbml6ZXIoKS5nZXRMaW5lVG9rZW5zKHZhbHVlLCBlbWJlZFN0YXRlLnNsaWNlKDApKTtcbiAgICAgICAgICAgICAgICBzdGFja1sxXSA9IGRhdGEuc3RhdGU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGEudG9rZW5zO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9rZW47XG4gICAgICAgIH1cbiAgICB9XTtcblxuICAgIHRoaXMuJHJ1bGVzW1wic3RhcnRcIl0udW5zaGlmdCh7XG4gICAgICAgIHRva2VuIDogXCJlbXB0eV9saW5lXCIsXG4gICAgICAgIHJlZ2V4IDogJ14kJyxcbiAgICAgICAgbmV4dDogXCJhbGxvd0Jsb2NrXCJcbiAgICB9LCB7IC8vIGgxXG4gICAgICAgIHRva2VuOiBcIm1hcmt1cC5oZWFkaW5nLjFcIixcbiAgICAgICAgcmVnZXg6IFwiXj0rKD89XFxcXHMqJClcIlxuICAgIH0sIHsgLy8gaDJcbiAgICAgICAgdG9rZW46IFwibWFya3VwLmhlYWRpbmcuMlwiLFxuICAgICAgICByZWdleDogXCJeXFxcXC0rKD89XFxcXHMqJClcIlxuICAgIH0sIHtcbiAgICAgICAgdG9rZW4gOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIFwibWFya3VwLmhlYWRpbmcuXCIgKyB2YWx1ZS5sZW5ndGg7XG4gICAgICAgIH0sXG4gICAgICAgIHJlZ2V4IDogL14jezEsNn0oPz1cXHN8JCkvLFxuICAgICAgICBuZXh0IDogXCJoZWFkZXJcIlxuICAgIH0sXG4gICAgY29kZUJsb2NrU3RhcnRSdWxlLFxuICAgIHsgLy8gYmxvY2sgcXVvdGVcbiAgICAgICAgdG9rZW4gOiBcInN0cmluZy5ibG9ja3F1b3RlXCIsXG4gICAgICAgIHJlZ2V4IDogXCJeXFxcXHMqPlxcXFxzKig/OlsqKy1dfFxcXFxkK1xcXFwuKT9cXFxccytcIixcbiAgICAgICAgbmV4dCAgOiBcImJsb2NrcXVvdGVcIlxuICAgIH0sIHsgLy8gSFIgKiAtIF9cbiAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50XCIsXG4gICAgICAgIHJlZ2V4IDogXCJeIHswLDN9KD86KD86XFxcXCogPyl7Myx9fCg/OlxcXFwtID8pezMsfXwoPzpcXFxcXyA/KXszLH0pXFxcXHMqJFwiLFxuICAgICAgICBuZXh0OiBcImFsbG93QmxvY2tcIlxuICAgIH0sIHsgLy8gbGlzdFxuICAgICAgICB0b2tlbiA6IFwibWFya3VwLmxpc3RcIixcbiAgICAgICAgcmVnZXggOiBcIl5cXFxcc3swLDN9KD86WyorLV18XFxcXGQrXFxcXC4pXFxcXHMrXCIsXG4gICAgICAgIG5leHQgIDogXCJsaXN0YmxvY2stc3RhcnRcIlxuICAgIH0sIHtcbiAgICAgICAgaW5jbHVkZSA6IFwiYmFzaWNcIlxuICAgIH0pO1xuXG4gICAgdGhpcy5hZGRSdWxlcyh7XG4gICAgICAgIFwiYmFzaWNcIiA6IFt7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCIsXG4gICAgICAgICAgICByZWdleCA6IC9cXFxcW1xcXFxgKl97fVxcW1xcXSgpIytcXC0uIV0vXG4gICAgICAgIH0sIHsgLy8gY29kZSBzcGFuIGBcbiAgICAgICAgICAgIHRva2VuIDogXCJzdXBwb3J0LmZ1bmN0aW9uXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiKGArKSguKj9bXmBdKShcXFxcMSlcIlxuICAgICAgICB9LCB7IC8vIHJlZmVyZW5jZVxuICAgICAgICAgICAgdG9rZW4gOiBbXCJ0ZXh0XCIsIFwiY29uc3RhbnRcIiwgXCJ0ZXh0XCIsIFwidXJsXCIsIFwic3RyaW5nXCIsIFwidGV4dFwiXSxcbiAgICAgICAgICAgIHJlZ2V4IDogXCJeKFsgXXswLDN9XFxcXFspKFteXFxcXF1dKykoXFxcXF06XFxcXHMqKShbXiBdKykoXFxcXHMqKD86W1xcXCJdW15cXFwiXStbXFxcIl0pPyhcXFxccyopKSRcIlxuICAgICAgICB9LCB7IC8vIGxpbmsgYnkgcmVmZXJlbmNlXG4gICAgICAgICAgICB0b2tlbiA6IFtcInRleHRcIiwgXCJzdHJpbmdcIiwgXCJ0ZXh0XCIsIFwiY29uc3RhbnRcIiwgXCJ0ZXh0XCJdLFxuICAgICAgICAgICAgcmVnZXggOiBcIihcXFxcWykoXCIgKyBlc2NhcGVkKFwiXVwiKSArIFwiKShcXFxcXVxcXFxzKlxcXFxbKShcIisgZXNjYXBlZChcIl1cIikgKyBcIikoXFxcXF0pXCJcbiAgICAgICAgfSwgeyAvLyBsaW5rIGJ5IHVybFxuICAgICAgICAgICAgdG9rZW4gOiBbXCJ0ZXh0XCIsIFwic3RyaW5nXCIsIFwidGV4dFwiLCBcIm1hcmt1cC51bmRlcmxpbmVcIiwgXCJzdHJpbmdcIiwgXCJ0ZXh0XCJdLFxuICAgICAgICAgICAgcmVnZXggOiBcIihcXFxcIT9cXFxcWykoXCIgKyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBbXG4gICAgICAgICAgICAgICAgICAgIGVzY2FwZWQoXCJdXCIpICsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBsaW5rIHRleHQgb3IgYWx0IHRleHRcbiAgICAgICAgICAgICAgICAgICAgXCIpKFxcXFxdXFxcXCgpXCIrICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBdKFxuICAgICAgICAgICAgICAgICAgICAnKCg/OlteXFxcXClcXFxcc1xcXFxcXFxcXXxcXFxcXFxcXC58XFxcXHMoPz1bXlwiXSkpKiknICsgICAgICAgIC8vIGhyZWYgb3IgaW1hZ2VcbiAgICAgICAgICAgICAgICAgICAgJyhcXFxccypcIicgKyAgZXNjYXBlZCgnXCInKSArICdcIlxcXFxzKik/JyArICAgICAgICAgICAgLy8gXCJ0aXRsZVwiXG4gICAgICAgICAgICAgICAgICAgIFwiKFxcXFwpKVwiICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIClcbiAgICAgICAgfSwgeyAvLyBzdHJvbmcgKiogX19cbiAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmcuc3Ryb25nXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiKFsqXXsyfXxbX117Mn0oPz1cXFxcUykpKC4qP1xcXFxTWypfXSopKFxcXFwxKVwiXG4gICAgICAgIH0sIHsgLy8gZW1waGFzaXMgKiBfXG4gICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nLmVtcGhhc2lzXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiKFsqXXxbX10oPz1cXFxcUykpKC4qP1xcXFxTWypfXSopKFxcXFwxKVwiXG4gICAgICAgIH0sIHsgLy9cbiAgICAgICAgICAgIHRva2VuIDogW1widGV4dFwiLCBcInVybFwiLCBcInRleHRcIl0sXG4gICAgICAgICAgICByZWdleCA6IFwiKDwpKFwiK1xuICAgICAgICAgICAgICAgICAgICAgIFwiKD86aHR0cHM/fGZ0cHxkaWN0KTpbXidcXFwiPlxcXFxzXStcIitcbiAgICAgICAgICAgICAgICAgICAgICBcInxcIitcbiAgICAgICAgICAgICAgICAgICAgICBcIig/Om1haWx0bzopP1stLlxcXFx3XStcXFxcQFstYS16MC05XSsoPzpcXFxcLlstYS16MC05XSspKlxcXFwuW2Etel0rXCIrXG4gICAgICAgICAgICAgICAgICAgIFwiKSg+KVwiXG4gICAgICAgIH1dLFxuXG4gICAgICAgIC8vIGNvZGUgYmxvY2tcbiAgICAgICAgXCJhbGxvd0Jsb2NrXCI6IFtcbiAgICAgICAgICAgIHt0b2tlbiA6IFwic3VwcG9ydC5mdW5jdGlvblwiLCByZWdleCA6IFwiXiB7NH0uK1wiLCBuZXh0IDogXCJhbGxvd0Jsb2NrXCJ9LFxuICAgICAgICAgICAge3Rva2VuIDogXCJlbXB0eV9saW5lXCIsIHJlZ2V4IDogJ14kJywgbmV4dDogXCJhbGxvd0Jsb2NrXCJ9LFxuICAgICAgICAgICAge3Rva2VuIDogXCJlbXB0eVwiLCByZWdleCA6IFwiXCIsIG5leHQgOiBcInN0YXJ0XCJ9XG4gICAgICAgIF0sXG5cbiAgICAgICAgXCJoZWFkZXJcIiA6IFt7XG4gICAgICAgICAgICByZWdleDogXCIkXCIsXG4gICAgICAgICAgICBuZXh0IDogXCJzdGFydFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGluY2x1ZGU6IFwiYmFzaWNcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBkZWZhdWx0VG9rZW4gOiBcImhlYWRpbmdcIlxuICAgICAgICB9IF0sXG5cbiAgICAgICAgXCJsaXN0YmxvY2stc3RhcnRcIiA6IFt7XG4gICAgICAgICAgICB0b2tlbiA6IFwic3VwcG9ydC52YXJpYWJsZVwiLFxuICAgICAgICAgICAgcmVnZXggOiAvKD86XFxbWyB4XVxcXSk/LyxcbiAgICAgICAgICAgIG5leHQgIDogXCJsaXN0YmxvY2tcIlxuICAgICAgICB9XSxcblxuICAgICAgICBcImxpc3RibG9ja1wiIDogWyB7IC8vIExpc3RzIG9ubHkgZXNjYXBlIG9uIGNvbXBsZXRlbHkgYmxhbmsgbGluZXMuXG4gICAgICAgICAgICB0b2tlbiA6IFwiZW1wdHlfbGluZVwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIl4kXCIsXG4gICAgICAgICAgICBuZXh0ICA6IFwic3RhcnRcIlxuICAgICAgICB9LCB7IC8vIGxpc3RcbiAgICAgICAgICAgIHRva2VuIDogXCJtYXJrdXAubGlzdFwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIl5cXFxcc3swLDN9KD86WyorLV18XFxcXGQrXFxcXC4pXFxcXHMrXCIsXG4gICAgICAgICAgICBuZXh0ICA6IFwibGlzdGJsb2NrLXN0YXJ0XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaW5jbHVkZSA6IFwiYmFzaWNcIiwgbm9Fc2NhcGU6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgY29kZUJsb2NrU3RhcnRSdWxlLFxuICAgICAgICB7XG4gICAgICAgICAgICBkZWZhdWx0VG9rZW4gOiBcImxpc3RcIiAvL2RvIG5vdCB1c2UgbWFya3VwLmxpc3QgdG8gYWxsb3cgc3RsaW5nIGxlYWRpbmcgYCpgIGRpZmZlcm50bHlcbiAgICAgICAgfSBdLFxuXG4gICAgICAgIFwiYmxvY2txdW90ZVwiIDogWyB7IC8vIEJsb2NrcXVvdGVzIG9ubHkgZXNjYXBlIG9uIGJsYW5rIGxpbmVzLlxuICAgICAgICAgICAgdG9rZW4gOiBcImVtcHR5X2xpbmVcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJeXFxcXHMqJFwiLFxuICAgICAgICAgICAgbmV4dCAgOiBcInN0YXJ0XCJcbiAgICAgICAgfSwgeyAvLyBibG9jayBxdW90ZVxuICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZy5ibG9ja3F1b3RlXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiXlxcXFxzKj5cXFxccyooPzpbKistXXxcXFxcZCtcXFxcLik/XFxcXHMrXCIsXG4gICAgICAgICAgICBuZXh0ICA6IFwiYmxvY2txdW90ZVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGluY2x1ZGUgOiBcImJhc2ljXCIsIG5vRXNjYXBlOiB0cnVlXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGRlZmF1bHRUb2tlbiA6IFwic3RyaW5nLmJsb2NrcXVvdGVcIlxuICAgICAgICB9IF0sXG5cbiAgICAgICAgXCJnaXRodWJibG9ja1wiIDogY29kZUJsb2NrUnVsZXNcbiAgICB9KTtcblxuICAgIHRoaXMubm9ybWFsaXplUnVsZXMoKTtcbn07XG5vb3AuaW5oZXJpdHMoTWFya2Rvd25IaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuZXhwb3J0cy5NYXJrZG93bkhpZ2hsaWdodFJ1bGVzID0gTWFya2Rvd25IaWdobGlnaHRSdWxlcztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dE1vZGUgPSByZXF1aXJlKFwiLi90ZXh0XCIpLk1vZGU7XG52YXIgU2hIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3NoX2hpZ2hsaWdodF9ydWxlc1wiKS5TaEhpZ2hsaWdodFJ1bGVzO1xudmFyIFJhbmdlID0gcmVxdWlyZShcIi4uL3JhbmdlXCIpLlJhbmdlO1xudmFyIENTdHlsZUZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZGluZy9jc3R5bGVcIikuRm9sZE1vZGU7XG5cbnZhciBNb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5IaWdobGlnaHRSdWxlcyA9IFNoSGlnaGxpZ2h0UnVsZXM7XG4gICAgdGhpcy5mb2xkaW5nUnVsZXMgPSBuZXcgQ1N0eWxlRm9sZE1vZGUoKTtcbiAgICB0aGlzLiRiZWhhdmlvdXIgPSB0aGlzLiRkZWZhdWx0QmVoYXZpb3VyO1xufTtcbm9vcC5pbmhlcml0cyhNb2RlLCBUZXh0TW9kZSk7XG5cbihmdW5jdGlvbigpIHtcblxuICAgXG4gICAgdGhpcy5saW5lQ29tbWVudFN0YXJ0ID0gXCIjXCI7XG5cbiAgICB0aGlzLmdldE5leHRMaW5lSW5kZW50ID0gZnVuY3Rpb24oc3RhdGUsIGxpbmUsIHRhYikge1xuICAgICAgICB2YXIgaW5kZW50ID0gdGhpcy4kZ2V0SW5kZW50KGxpbmUpO1xuXG4gICAgICAgIHZhciB0b2tlbml6ZWRMaW5lID0gdGhpcy5nZXRUb2tlbml6ZXIoKS5nZXRMaW5lVG9rZW5zKGxpbmUsIHN0YXRlKTtcbiAgICAgICAgdmFyIHRva2VucyA9IHRva2VuaXplZExpbmUudG9rZW5zO1xuXG4gICAgICAgIGlmICh0b2tlbnMubGVuZ3RoICYmIHRva2Vuc1t0b2tlbnMubGVuZ3RoLTFdLnR5cGUgPT0gXCJjb21tZW50XCIpIHtcbiAgICAgICAgICAgIHJldHVybiBpbmRlbnQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RhdGUgPT0gXCJzdGFydFwiKSB7XG4gICAgICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKC9eLipbXFx7XFwoXFxbOl1cXHMqJC8pO1xuICAgICAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICAgICAgaW5kZW50ICs9IHRhYjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpbmRlbnQ7XG4gICAgfTtcblxuICAgIHZhciBvdXRkZW50cyA9IHtcbiAgICAgICAgXCJwYXNzXCI6IDEsXG4gICAgICAgIFwicmV0dXJuXCI6IDEsXG4gICAgICAgIFwicmFpc2VcIjogMSxcbiAgICAgICAgXCJicmVha1wiOiAxLFxuICAgICAgICBcImNvbnRpbnVlXCI6IDFcbiAgICB9O1xuXG4gICAgdGhpcy5jaGVja091dGRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgbGluZSwgaW5wdXQpIHtcbiAgICAgICAgaWYgKGlucHV0ICE9PSBcIlxcclxcblwiICYmIGlucHV0ICE9PSBcIlxcclwiICYmIGlucHV0ICE9PSBcIlxcblwiKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIHZhciB0b2tlbnMgPSB0aGlzLmdldFRva2VuaXplcigpLmdldExpbmVUb2tlbnMobGluZS50cmltKCksIHN0YXRlKS50b2tlbnM7XG5cbiAgICAgICAgaWYgKCF0b2tlbnMpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgLy8gaWdub3JlIHRyYWlsaW5nIGNvbW1lbnRzXG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIHZhciBsYXN0ID0gdG9rZW5zLnBvcCgpO1xuICAgICAgICB9IHdoaWxlIChsYXN0ICYmIChsYXN0LnR5cGUgPT0gXCJjb21tZW50XCIgfHwgKGxhc3QudHlwZSA9PSBcInRleHRcIiAmJiBsYXN0LnZhbHVlLm1hdGNoKC9eXFxzKyQvKSkpKTtcblxuICAgICAgICBpZiAoIWxhc3QpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgcmV0dXJuIChsYXN0LnR5cGUgPT0gXCJrZXl3b3JkXCIgJiYgb3V0ZGVudHNbbGFzdC52YWx1ZV0pO1xuICAgIH07XG5cbiAgICB0aGlzLmF1dG9PdXRkZW50ID0gZnVuY3Rpb24oc3RhdGUsIGRvYywgcm93KSB7XG4gICAgICAgIC8vIG91dGRlbnRpbmcgaW4gc2ggaXMgc2xpZ2h0bHkgZGlmZmVyZW50IGJlY2F1c2UgaXQgYWx3YXlzIGFwcGxpZXNcbiAgICAgICAgLy8gdG8gdGhlIG5leHQgbGluZSBhbmQgb25seSBvZiBhIG5ldyBsaW5lIGlzIGluc2VydGVkXG5cbiAgICAgICAgcm93ICs9IDE7XG4gICAgICAgIHZhciBpbmRlbnQgPSB0aGlzLiRnZXRJbmRlbnQoZG9jLmdldExpbmUocm93KSk7XG4gICAgICAgIHZhciB0YWIgPSBkb2MuZ2V0VGFiU3RyaW5nKCk7XG4gICAgICAgIGlmIChpbmRlbnQuc2xpY2UoLXRhYi5sZW5ndGgpID09IHRhYilcbiAgICAgICAgICAgIGRvYy5yZW1vdmUobmV3IFJhbmdlKHJvdywgaW5kZW50Lmxlbmd0aC10YWIubGVuZ3RoLCByb3csIGluZGVudC5sZW5ndGgpKTtcbiAgICB9O1xuXG4gICAgdGhpcy4kaWQgPSBcImFjZS9tb2RlL3NoXCI7XG4gICAgdGhpcy5zbmlwcGV0RmlsZUlkID0gXCJhY2Uvc25pcHBldHMvc2hcIjtcbn0pLmNhbGwoTW9kZS5wcm90b3R5cGUpO1xuXG5leHBvcnRzLk1vZGUgPSBNb2RlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90ZXh0X2hpZ2hsaWdodF9ydWxlc1wiKS5UZXh0SGlnaGxpZ2h0UnVsZXM7XG5cbnZhciByZXNlcnZlZEtleXdvcmRzID0gZXhwb3J0cy5yZXNlcnZlZEtleXdvcmRzID0gKFxuICAgICAgICAnIXx7fH18Y2FzZXxkb3xkb25lfGVsaWZ8ZWxzZXwnK1xuICAgICAgICAnZXNhY3xmaXxmb3J8aWZ8aW58dGhlbnx1bnRpbHx3aGlsZXwnK1xuICAgICAgICAnJnw7fGV4cG9ydHxsb2NhbHxyZWFkfHR5cGVzZXR8dW5zZXR8JytcbiAgICAgICAgJ2VsaWZ8c2VsZWN0fHNldHxmdW5jdGlvbnxkZWNsYXJlfHJlYWRvbmx5J1xuICAgICk7XG5cbnZhciBsYW5ndWFnZUNvbnN0cnVjdHMgPSBleHBvcnRzLmxhbmd1YWdlQ29uc3RydWN0cyA9IChcbiAgICAnW3xdfGFsaWFzfGJnfGJpbmR8YnJlYWt8YnVpbHRpbnwnK1xuICAgICAnY2R8Y29tbWFuZHxjb21wZ2VufGNvbXBsZXRlfGNvbnRpbnVlfCcrXG4gICAgICdkaXJzfGRpc293bnxlY2hvfGVuYWJsZXxldmFsfGV4ZWN8JytcbiAgICAgJ2V4aXR8ZmN8Zmd8Z2V0b3B0c3xoYXNofGhlbHB8aGlzdG9yeXwnK1xuICAgICAnam9ic3xraWxsfGxldHxsb2dvdXR8cG9wZHxwcmludGZ8cHVzaGR8JytcbiAgICAgJ3B3ZHxyZXR1cm58c2V0fHNoaWZ0fHNob3B0fHNvdXJjZXwnK1xuICAgICAnc3VzcGVuZHx0ZXN0fHRpbWVzfHRyYXB8dHlwZXx1bGltaXR8JytcbiAgICAgJ3VtYXNrfHVuYWxpYXN8d2FpdCdcbik7XG5cbnZhciBTaEhpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGtleXdvcmRNYXBwZXIgPSB0aGlzLmNyZWF0ZUtleXdvcmRNYXBwZXIoe1xuICAgICAgICBcImtleXdvcmRcIjogcmVzZXJ2ZWRLZXl3b3JkcyxcbiAgICAgICAgXCJzdXBwb3J0LmZ1bmN0aW9uLmJ1aWx0aW5cIjogbGFuZ3VhZ2VDb25zdHJ1Y3RzLFxuICAgICAgICBcImludmFsaWQuZGVwcmVjYXRlZFwiOiBcImRlYnVnZ2VyXCJcbiAgICB9LCBcImlkZW50aWZpZXJcIik7XG5cbiAgICB2YXIgaW50ZWdlciA9IFwiKD86KD86WzEtOV1cXFxcZCopfCg/OjApKVwiO1xuICAgIC8vIHZhciBpbnRlZ2VyID0gXCIoPzpcIiArIGRlY2ltYWxJbnRlZ2VyICsgXCIpXCI7XG5cbiAgICB2YXIgZnJhY3Rpb24gPSBcIig/OlxcXFwuXFxcXGQrKVwiO1xuICAgIHZhciBpbnRQYXJ0ID0gXCIoPzpcXFxcZCspXCI7XG4gICAgdmFyIHBvaW50RmxvYXQgPSBcIig/Oig/OlwiICsgaW50UGFydCArIFwiP1wiICsgZnJhY3Rpb24gKyBcIil8KD86XCIgKyBpbnRQYXJ0ICsgXCJcXFxcLikpXCI7XG4gICAgdmFyIGV4cG9uZW50RmxvYXQgPSBcIig/Oig/OlwiICsgcG9pbnRGbG9hdCArIFwifFwiICsgIGludFBhcnQgKyBcIilcIiArIFwiKVwiO1xuICAgIHZhciBmbG9hdE51bWJlciA9IFwiKD86XCIgKyBleHBvbmVudEZsb2F0ICsgXCJ8XCIgKyBwb2ludEZsb2F0ICsgXCIpXCI7XG4gICAgdmFyIGZpbGVEZXNjcmlwdG9yID0gXCIoPzomXCIgKyBpbnRQYXJ0ICsgXCIpXCI7XG5cbiAgICB2YXIgdmFyaWFibGVOYW1lID0gXCJbYS16QS1aX11bYS16QS1aMC05X10qXCI7XG4gICAgdmFyIHZhcmlhYmxlID0gXCIoPzpcIiArIHZhcmlhYmxlTmFtZSArIFwiKD89PSkpXCI7XG5cbiAgICB2YXIgYnVpbHRpblZhcmlhYmxlID0gXCIoPzpcXFxcJCg/OlNITFZMfFxcXFwkfFxcXFwhfFxcXFw/KSlcIjtcblxuICAgIHZhciBmdW5jID0gXCIoPzpcIiArIHZhcmlhYmxlTmFtZSArIFwiXFxcXHMqXFxcXChcXFxcKSlcIjtcblxuICAgIHRoaXMuJHJ1bGVzID0ge1xuICAgICAgICBcInN0YXJ0XCIgOiBbe1xuICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50XCIsXG4gICAgICAgICAgICByZWdleCA6IC9cXFxcLi9cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBbXCJ0ZXh0XCIsIFwiY29tbWVudFwiXSxcbiAgICAgICAgICAgIHJlZ2V4IDogLyhefFxccykoIy4qKSQvXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmcuc3RhcnRcIixcbiAgICAgICAgICAgIHJlZ2V4IDogJ1wiJyxcbiAgICAgICAgICAgIHB1c2ggOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC9cXFxcKD86WyRgXCJcXFxcXXwkKS9cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpbmNsdWRlIDogXCJ2YXJpYWJsZXNcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvYC8gLy8gVE9ETyBoaWdobGlnaHQgYFxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmcuZW5kXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAnXCInLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwic3RyaW5nXCJcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcJCdcIixcbiAgICAgICAgICAgIHB1c2ggOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC9cXFxcKD86W2FiZUVmbnJ0dlxcXFwnXCJdfHhbYS1mQS1GXFxkXXsxLDJ9fHVbYS1mQS1GXFxkXXs0fShbYS1mQS1GXFxkXXs0fSk/fGMufFxcZHsxLDN9KS9cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIidcIixcbiAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInN0cmluZ1wiXG4gICAgICAgICAgICB9XVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICByZWdleCA6IFwiPDw8XCIsXG4gICAgICAgICAgICB0b2tlbiA6IFwia2V5d29yZC5vcGVyYXRvclwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHN0YXRlTmFtZTogXCJoZXJlZG9jXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiKDw8LT8pKFxcXFxzKikoWydcXFwiYF0/KShbXFxcXHdcXFxcLV0rKShbJ1xcXCJgXT8pXCIsXG4gICAgICAgICAgICBvbk1hdGNoIDogZnVuY3Rpb24odmFsdWUsIGN1cnJlbnRTdGF0ZSwgc3RhY2spIHtcbiAgICAgICAgICAgICAgICB2YXIgbmV4dCA9IHZhbHVlWzJdID09ICctJyA/IFwiaW5kZW50ZWRIZXJlZG9jXCIgOiBcImhlcmVkb2NcIjtcbiAgICAgICAgICAgICAgICB2YXIgdG9rZW5zID0gdmFsdWUuc3BsaXQodGhpcy5zcGxpdFJlZ2V4KTtcbiAgICAgICAgICAgICAgICBzdGFjay5wdXNoKG5leHQsIHRva2Vuc1s0XSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICAgICAge3R5cGU6XCJjb25zdGFudFwiLCB2YWx1ZTogdG9rZW5zWzFdfSxcbiAgICAgICAgICAgICAgICAgICAge3R5cGU6XCJ0ZXh0XCIsIHZhbHVlOiB0b2tlbnNbMl19LFxuICAgICAgICAgICAgICAgICAgICB7dHlwZTpcInN0cmluZ1wiLCB2YWx1ZTogdG9rZW5zWzNdfSxcbiAgICAgICAgICAgICAgICAgICAge3R5cGU6XCJzdXBwb3J0LmNsYXNzXCIsIHZhbHVlOiB0b2tlbnNbNF19LFxuICAgICAgICAgICAgICAgICAgICB7dHlwZTpcInN0cmluZ1wiLCB2YWx1ZTogdG9rZW5zWzVdfVxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcnVsZXM6IHtcbiAgICAgICAgICAgICAgICBoZXJlZG9jOiBbe1xuICAgICAgICAgICAgICAgICAgICBvbk1hdGNoOiAgZnVuY3Rpb24odmFsdWUsIGN1cnJlbnRTdGF0ZSwgc3RhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gc3RhY2tbMV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFjay5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWNrLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0ID0gc3RhY2tbMF0gfHwgXCJzdGFydFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcInN1cHBvcnQuY2xhc3NcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJzdHJpbmdcIjtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgcmVnZXg6IFwiLiokXCIsXG4gICAgICAgICAgICAgICAgICAgIG5leHQ6IFwic3RhcnRcIlxuICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgIGluZGVudGVkSGVyZWRvYzogW3tcbiAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4OiBcIl5cXHQrXCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIG9uTWF0Y2g6ICBmdW5jdGlvbih2YWx1ZSwgY3VycmVudFN0YXRlLCBzdGFjaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSBzdGFja1sxXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWNrLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhY2suc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHQgPSBzdGFja1swXSB8fCBcInN0YXJ0XCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwic3VwcG9ydC5jbGFzc1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0ID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcInN0cmluZ1wiO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICByZWdleDogXCIuKiRcIixcbiAgICAgICAgICAgICAgICAgICAgbmV4dDogXCJzdGFydFwiXG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgcmVnZXggOiBcIiRcIixcbiAgICAgICAgICAgIHRva2VuIDogXCJlbXB0eVwiLFxuICAgICAgICAgICAgbmV4dCA6IGZ1bmN0aW9uKGN1cnJlbnRTdGF0ZSwgc3RhY2spIHtcbiAgICAgICAgICAgICAgICBpZiAoc3RhY2tbMF0gPT09IFwiaGVyZWRvY1wiIHx8IHN0YWNrWzBdID09PSBcImluZGVudGVkSGVyZWRvY1wiKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RhY2tbMF07XG4gICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRTdGF0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBbXCJrZXl3b3JkXCIsIFwidGV4dFwiLCBcInRleHRcIiwgXCJ0ZXh0XCIsIFwidmFyaWFibGVcIl0sXG4gICAgICAgICAgICByZWdleCA6IC8oZGVjbGFyZXxsb2NhbHxyZWFkb25seSkoXFxzKykoPzooLVtmaXhhcl0rKShcXHMrKSk/KFthLXpBLVpfXVthLXpBLVowLTlfXSpcXGIpL1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwidmFyaWFibGUubGFuZ3VhZ2VcIixcbiAgICAgICAgICAgIHJlZ2V4IDogYnVpbHRpblZhcmlhYmxlXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJ2YXJpYWJsZVwiLFxuICAgICAgICAgICAgcmVnZXggOiB2YXJpYWJsZVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpbmNsdWRlIDogXCJ2YXJpYWJsZXNcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwic3VwcG9ydC5mdW5jdGlvblwiLFxuICAgICAgICAgICAgcmVnZXggOiBmdW5jXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJzdXBwb3J0LmZ1bmN0aW9uXCIsXG4gICAgICAgICAgICByZWdleCA6IGZpbGVEZXNjcmlwdG9yXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIiwgICAgICAgICAgIC8vICcgc3RyaW5nXG4gICAgICAgICAgICBzdGFydCA6IFwiJ1wiLCBlbmQgOiBcIidcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLCAvLyBmbG9hdFxuICAgICAgICAgICAgcmVnZXggOiBmbG9hdE51bWJlclxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLCAvLyBpbnRlZ2VyXG4gICAgICAgICAgICByZWdleCA6IGludGVnZXIgKyBcIlxcXFxiXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBrZXl3b3JkTWFwcGVyLFxuICAgICAgICAgICAgcmVnZXggOiBcIlthLXpBLVpfXVthLXpBLVowLTlfXSpcXFxcYlwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiXFxcXCt8XFxcXC18XFxcXCp8XFxcXCpcXFxcKnxcXFxcL3xcXFxcL1xcXFwvfH58PHw+fDw9fD0+fD18IT18WyUmfGBdXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInB1bmN0dWF0aW9uLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiO1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJwYXJlbi5scGFyZW5cIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJbXFxcXFtcXFxcKFxcXFx7XVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJwYXJlbi5ycGFyZW5cIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJbXFxcXF1dXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInBhcmVuLnJwYXJlblwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIltcXFxcKVxcXFx9XVwiLFxuICAgICAgICAgICAgbmV4dCA6IFwicG9wXCJcbiAgICAgICAgfV0sXG4gICAgICAgIHZhcmlhYmxlczogW3tcbiAgICAgICAgICAgIHRva2VuIDogXCJ2YXJpYWJsZVwiLFxuICAgICAgICAgICAgcmVnZXggOiAvKFxcJCkoXFx3KykvXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogW1widmFyaWFibGVcIiwgXCJwYXJlbi5scGFyZW5cIl0sXG4gICAgICAgICAgICByZWdleCA6IC8oXFwkKShcXCgpLyxcbiAgICAgICAgICAgIHB1c2ggOiBcInN0YXJ0XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBbXCJ2YXJpYWJsZVwiLCBcInBhcmVuLmxwYXJlblwiLCBcImtleXdvcmQub3BlcmF0b3JcIiwgXCJ2YXJpYWJsZVwiLCBcImtleXdvcmQub3BlcmF0b3JcIl0sXG4gICAgICAgICAgICByZWdleCA6IC8oXFwkKShcXHspKFsjIV0/KShcXHcrfFsqQCM/XFwtJCEwX10pKDpbPytcXC09XT98IyM/fCUlP3wsLD9cXC98XFxeXFxePyk/LyxcbiAgICAgICAgICAgIHB1c2ggOiBcInN0YXJ0XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInZhcmlhYmxlXCIsXG4gICAgICAgICAgICByZWdleCA6IC9cXCRbKkAjP1xcLSQhMF9dL1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFtcInZhcmlhYmxlXCIsIFwicGFyZW4ubHBhcmVuXCJdLFxuICAgICAgICAgICAgcmVnZXggOiAvKFxcJCkoXFx7KS8sXG4gICAgICAgICAgICBwdXNoIDogXCJzdGFydFwiXG4gICAgICAgIH1dXG4gICAgfTtcbiAgICBcbiAgICB0aGlzLm5vcm1hbGl6ZVJ1bGVzKCk7XG59O1xuXG5vb3AuaW5oZXJpdHMoU2hIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuZXhwb3J0cy5TaEhpZ2hsaWdodFJ1bGVzID0gU2hIaWdobGlnaHRSdWxlcztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgbGFuZyA9IHJlcXVpcmUoXCIuLi9saWIvbGFuZ1wiKTtcbnZhciBUZXh0TW9kZSA9IHJlcXVpcmUoXCIuL3RleHRcIikuTW9kZTtcbnZhciBYbWxIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3htbF9oaWdobGlnaHRfcnVsZXNcIikuWG1sSGlnaGxpZ2h0UnVsZXM7XG52YXIgWG1sQmVoYXZpb3VyID0gcmVxdWlyZShcIi4vYmVoYXZpb3VyL3htbFwiKS5YbWxCZWhhdmlvdXI7XG52YXIgWG1sRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9mb2xkaW5nL3htbFwiKS5Gb2xkTW9kZTtcbnZhciBXb3JrZXJDbGllbnQgPSByZXF1aXJlKFwiLi4vd29ya2VyL3dvcmtlcl9jbGllbnRcIikuV29ya2VyQ2xpZW50O1xuXG52YXIgTW9kZSA9IGZ1bmN0aW9uKCkge1xuICAgdGhpcy5IaWdobGlnaHRSdWxlcyA9IFhtbEhpZ2hsaWdodFJ1bGVzO1xuICAgdGhpcy4kYmVoYXZpb3VyID0gbmV3IFhtbEJlaGF2aW91cigpO1xuICAgdGhpcy5mb2xkaW5nUnVsZXMgPSBuZXcgWG1sRm9sZE1vZGUoKTtcbn07XG5cbm9vcC5pbmhlcml0cyhNb2RlLCBUZXh0TW9kZSk7XG5cbihmdW5jdGlvbigpIHtcblxuICAgIHRoaXMudm9pZEVsZW1lbnRzID0gbGFuZy5hcnJheVRvTWFwKFtdKTtcblxuICAgIHRoaXMuYmxvY2tDb21tZW50ID0ge3N0YXJ0OiBcIjwhLS1cIiwgZW5kOiBcIi0tPlwifTtcblxuICAgIHRoaXMuY3JlYXRlV29ya2VyID0gZnVuY3Rpb24oc2Vzc2lvbikge1xuICAgICAgICB2YXIgd29ya2VyID0gbmV3IFdvcmtlckNsaWVudChbXCJhY2VcIl0sIFwiYWNlL21vZGUveG1sX3dvcmtlclwiLCBcIldvcmtlclwiKTtcbiAgICAgICAgd29ya2VyLmF0dGFjaFRvRG9jdW1lbnQoc2Vzc2lvbi5nZXREb2N1bWVudCgpKTtcblxuICAgICAgICB3b3JrZXIub24oXCJlcnJvclwiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBzZXNzaW9uLnNldEFubm90YXRpb25zKGUuZGF0YSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHdvcmtlci5vbihcInRlcm1pbmF0ZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNlc3Npb24uY2xlYXJBbm5vdGF0aW9ucygpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gd29ya2VyO1xuICAgIH07XG4gICAgXG4gICAgdGhpcy4kaWQgPSBcImFjZS9tb2RlL3htbFwiO1xufSkuY2FsbChNb2RlLnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTW9kZSA9IE1vZGU7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=