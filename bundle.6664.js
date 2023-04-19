"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[6664],{

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

/***/ 26664:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var TextMode = (__webpack_require__(98030).Mode);
var LogiQLHighlightRules = (__webpack_require__(57975)/* .LogiQLHighlightRules */ .j);
var FoldMode = (__webpack_require__(35090)/* .FoldMode */ .Z);
var TokenIterator = (__webpack_require__(39216)/* .TokenIterator */ .N);
var Range = (__webpack_require__(59082)/* .Range */ .e);
var CstyleBehaviour = (__webpack_require__(19414)/* .CstyleBehaviour */ .B);
var MatchingBraceOutdent = (__webpack_require__(1164).MatchingBraceOutdent);

var Mode = function() {
    this.HighlightRules = LogiQLHighlightRules;
    this.foldingRules = new FoldMode();
    this.$outdent = new MatchingBraceOutdent();
    this.$behaviour = new CstyleBehaviour();
};
oop.inherits(Mode, TextMode);

(function() {
    this.lineCommentStart = "//";
    this.blockComment = {start: "/*", end: "*/"};

    this.getNextLineIndent = function(state, line, tab) {
        var indent = this.$getIndent(line);

        var tokenizedLine = this.getTokenizer().getLineTokens(line, state);
        var tokens = tokenizedLine.tokens;
        var endState = tokenizedLine.state;
        if (/comment|string/.test(endState))  
            return indent;
        if (tokens.length && tokens[tokens.length - 1].type == "comment.single")
            return indent;

        var match = line.match();
        if (/(-->|<--|<-|->|{)\s*$/.test(line))
            indent += tab;
        return indent;
    };

    this.checkOutdent = function(state, line, input) {
        if (this.$outdent.checkOutdent(line, input))
            return true;

        if (input !== "\n" && input !== "\r\n")
            return false;
            
        if (!/^\s+/.test(line))
            return false;

        return true;
    };

    this.autoOutdent = function(state, doc, row) {
        if (this.$outdent.autoOutdent(doc, row))
            return;
        var prevLine = doc.getLine(row);
        var match = prevLine.match(/^\s+/);
        var column = prevLine.lastIndexOf(".") + 1;
        if (!match || !row || !column) return 0;

        var line = doc.getLine(row + 1);
        var startRange = this.getMatching(doc, {row: row, column: column});
        if (!startRange || startRange.start.row == row) return 0;

        column = match[0].length;
        var indent = this.$getIndent(doc.getLine(startRange.start.row));
        doc.replace(new Range(row + 1, 0, row + 1, column), indent);
    };

    this.getMatching = function(session, row, column) {
        if (row == undefined)
            row = session.selection.lead;
        if (typeof row == "object") {
            column = row.column;
            row = row.row;
        }

        var startToken = session.getTokenAt(row, column);
        var KW_START = "keyword.start", KW_END = "keyword.end";
        var tok;
        if (!startToken)
            return;
        if (startToken.type == KW_START) {
            var it = new TokenIterator(session, row, column);
            it.step = it.stepForward;
        } else if (startToken.type == KW_END) {
            var it = new TokenIterator(session, row, column);
            it.step = it.stepBackward;
        } else
            return;

        while (tok = it.step()) {
            if (tok.type == KW_START || tok.type == KW_END)
                break;
        }
        if (!tok || tok.type == startToken.type)
            return;

        var col = it.getCurrentTokenColumn();
        var row = it.getCurrentTokenRow();
        return new Range(row, col, row, col + tok.value.length);
    };
    this.$id = "ace/mode/logiql";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 57975:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* THIS FILE WAS AUTOGENERATED FROM tool\LogicBlox.tmbundle\Syntaxes\LogicBlox.tmLanguage (UUID: 59bf5022-e261-453f-b1cb-9f9fa0712413) */



var oop = __webpack_require__(89359);
var TextHighlightRules = (__webpack_require__(28053)/* .TextHighlightRules */ .K);

var LogiQLHighlightRules = function() {
    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used

    this.$rules = { start: 
       [ { token: 'comment.block',
           regex: '/\\*',
           push: 
            [ { token: 'comment.block', regex: '\\*/', next: 'pop' },
              { defaultToken: 'comment.block' } ]
           //A block comment.
            },
         { token: 'comment.single',
           regex: '//.*'
           //A single line comment.
            },
         { token: 'constant.numeric',
           regex: '\\d+(?:\\.\\d+)?(?:[eE][+-]?\\d+)?[fd]?'
           //An integer constant.
           //Or a Real number.
            },
         { token: 'string',
           regex: '"',
           push: 
            [ { token: 'string', regex: '"', next: 'pop' },
              { defaultToken: 'string' } ]
           //Strings
            },
         { token: 'constant.language',
           regex: '\\b(true|false)\\b'
           //Boolean values.
            },
         { token: 'entity.name.type.logicblox',
           regex: '`[a-zA-Z_:]+(\\d|\\a)*\\b'
           //LogicBlox Symbol
            },
         { token: 'keyword.start', regex: '->',  comment: 'Constraint' },
         { token: 'keyword.start', regex: '-->', comment: 'Level 1 Constraint'},
         { token: 'keyword.start', regex: '<-',  comment: 'Rule' },
         { token: 'keyword.start', regex: '<--', comment: 'Level 1 Rule' },
         { token: 'keyword.end',   regex: '\\.', comment: 'Terminator' },
         { token: 'keyword.other', regex: '!',   comment: 'Negation' },
         { token: 'keyword.other', regex: ',',   comment: 'Conjunction' },
         { token: 'keyword.other', regex: ';',   comment: 'Disjunction' },
         { token: 'keyword.operator', regex: '<=|>=|!=|<|>', comment: 'Equality'},
         { token: 'keyword.other', regex: '@', comment: 'Equality' },
         { token: 'keyword.operator', regex: '\\+|-|\\*|/', comment: 'Arithmetic operations'},
         { token: 'keyword', regex: '::', comment: 'Colon colon' },
         { token: 'support.function',
           regex: '\\b(agg\\s*<<)',
           push: 
            [ { include: '$self' },
              { token: 'support.function',
                regex: '>>',
                next: 'pop' } ]
            //Aggregations
            },
         { token: 'storage.modifier',
           regex: '\\b(lang:[\\w:]*)'
           //All the lang system predicates
            },
         { token: [ 'storage.type', 'text' ],
           regex: '(export|sealed|clauses|block|alias|alias_all)(\\s*\\()(?=`)'
           //Module keywords
            },
         { token: 'entity.name',
           regex: '[a-zA-Z_][a-zA-Z_0-9:]*(@prev|@init|@final)?(?=(\\(|\\[))'
           //A predicate name.
            },
         { token: 'variable.parameter',
           regex: '([a-zA-Z][a-zA-Z_0-9]*|_)\\s*(?=(,|\\.|<-|->|\\)|\\]|=))'
           //A variable to a functional predicate.
            } ] };
    
    this.normalizeRules();
};

oop.inherits(LogiQLHighlightRules, TextHighlightRules);

exports.j = LogiQLHighlightRules;


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
//# sourceMappingURL=bundle.6664.js.map