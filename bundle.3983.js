"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[3983],{

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

/***/ 13983:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var LogiQLHighlightRules = (__webpack_require__(74172)/* .LogiQLHighlightRules */ .Q);
var FoldMode = (__webpack_require__(69261)/* .FoldMode */ .l);
var TokenIterator = (__webpack_require__(99339).TokenIterator);
var Range = (__webpack_require__(91902)/* .Range */ .Q);
var MatchingBraceOutdent = (__webpack_require__(28670).MatchingBraceOutdent);

var Mode = function() {
    this.HighlightRules = LogiQLHighlightRules;
    this.foldingRules = new FoldMode();
    this.$outdent = new MatchingBraceOutdent();
    this.$behaviour = this.$defaultBehaviour;
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

/***/ 74172:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* THIS FILE WAS AUTOGENERATED FROM tool\LogicBlox.tmbundle\Syntaxes\LogicBlox.tmLanguage (UUID: 59bf5022-e261-453f-b1cb-9f9fa0712413) */



var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

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

exports.Q = LogiQLHighlightRules;


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBLDhCQUE4QjtBQUM5QjtBQUNBLGFBQWE7QUFDYixXQUFXO0FBQ1g7QUFDQTtBQUNBLGFBQWE7QUFDYixXQUFXO0FBQ1g7QUFDQTtBQUNBLGFBQWE7QUFDYixXQUFXO0FBQ1g7QUFDQTtBQUNBLGFBQWE7QUFDYixXQUFXO0FBQ1g7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsU0FBNEI7Ozs7Ozs7O0FDdEZmOztBQUViLFlBQVksMkNBQXlCOztBQUVyQzs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsc0JBQXNCO0FBQ3RCOztBQUVBO0FBQ0E7QUFDQSx1Q0FBdUM7O0FBRXZDOztBQUVBO0FBQ0Esb0RBQW9ELHlCQUF5Qjs7QUFFN0U7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDOztBQUVELDRCQUE0QiIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvZm9sZGluZy9jb2ZmZWUuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9sb2dpcWwuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9sb2dpcWxfaGlnaGxpZ2h0X3J1bGVzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvbWF0Y2hpbmdfYnJhY2Vfb3V0ZGVudC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi8uLi9saWIvb29wXCIpO1xudmFyIEJhc2VGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRfbW9kZVwiKS5Gb2xkTW9kZTtcbnZhciBSYW5nZSA9IHJlcXVpcmUoXCIuLi8uLi9yYW5nZVwiKS5SYW5nZTtcblxudmFyIEZvbGRNb2RlID0gZXhwb3J0cy5Gb2xkTW9kZSA9IGZ1bmN0aW9uKCkge307XG5vb3AuaW5oZXJpdHMoRm9sZE1vZGUsIEJhc2VGb2xkTW9kZSk7XG5cbihmdW5jdGlvbigpIHtcbiAgICB0aGlzLmNvbW1lbnRCbG9jayA9IGZ1bmN0aW9uKHNlc3Npb24sIHJvdykge1xuICAgICAgICB2YXIgcmUgPSAvXFxTLztcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgdmFyIHN0YXJ0TGV2ZWwgPSBsaW5lLnNlYXJjaChyZSk7XG4gICAgICAgIGlmIChzdGFydExldmVsID09IC0xIHx8IGxpbmVbc3RhcnRMZXZlbF0gIT0gXCIjXCIpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdmFyIHN0YXJ0Q29sdW1uID0gbGluZS5sZW5ndGg7XG4gICAgICAgIHZhciBtYXhSb3cgPSBzZXNzaW9uLmdldExlbmd0aCgpO1xuICAgICAgICB2YXIgc3RhcnRSb3cgPSByb3c7XG4gICAgICAgIHZhciBlbmRSb3cgPSByb3c7XG5cbiAgICAgICAgd2hpbGUgKCsrcm93IDwgbWF4Um93KSB7XG4gICAgICAgICAgICBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgICAgICB2YXIgbGV2ZWwgPSBsaW5lLnNlYXJjaChyZSk7XG5cbiAgICAgICAgICAgIGlmIChsZXZlbCA9PSAtMSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcblxuICAgICAgICAgICAgaWYgKGxpbmVbbGV2ZWxdICE9IFwiI1wiKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBlbmRSb3cgPSByb3c7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW5kUm93ID4gc3RhcnRSb3cpIHtcbiAgICAgICAgICAgIHZhciBlbmRDb2x1bW4gPSBzZXNzaW9uLmdldExpbmUoZW5kUm93KS5sZW5ndGg7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFJhbmdlKHN0YXJ0Um93LCBzdGFydENvbHVtbiwgZW5kUm93LCBlbmRDb2x1bW4pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMuZ2V0Rm9sZFdpZGdldFJhbmdlID0gZnVuY3Rpb24oc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpIHtcbiAgICAgICAgdmFyIHJhbmdlID0gdGhpcy5pbmRlbnRhdGlvbkJsb2NrKHNlc3Npb24sIHJvdyk7XG4gICAgICAgIGlmIChyYW5nZSlcbiAgICAgICAgICAgIHJldHVybiByYW5nZTtcblxuICAgICAgICByYW5nZSA9IHRoaXMuY29tbWVudEJsb2NrKHNlc3Npb24sIHJvdyk7XG4gICAgICAgIGlmIChyYW5nZSlcbiAgICAgICAgICAgIHJldHVybiByYW5nZTtcbiAgICB9O1xuXG4gICAgLy8gbXVzdCByZXR1cm4gXCJcIiBpZiB0aGVyZSdzIG5vIGZvbGQsIHRvIGVuYWJsZSBjYWNoaW5nXG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0ID0gZnVuY3Rpb24oc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgdmFyIGluZGVudCA9IGxpbmUuc2VhcmNoKC9cXFMvKTtcbiAgICAgICAgdmFyIG5leHQgPSBzZXNzaW9uLmdldExpbmUocm93ICsgMSk7XG4gICAgICAgIHZhciBwcmV2ID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyAtIDEpO1xuICAgICAgICB2YXIgcHJldkluZGVudCA9IHByZXYuc2VhcmNoKC9cXFMvKTtcbiAgICAgICAgdmFyIG5leHRJbmRlbnQgPSBuZXh0LnNlYXJjaCgvXFxTLyk7XG5cbiAgICAgICAgaWYgKGluZGVudCA9PSAtMSkge1xuICAgICAgICAgICAgc2Vzc2lvbi5mb2xkV2lkZ2V0c1tyb3cgLSAxXSA9IHByZXZJbmRlbnQhPSAtMSAmJiBwcmV2SW5kZW50IDwgbmV4dEluZGVudCA/IFwic3RhcnRcIiA6IFwiXCI7XG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGRvY3VtZW50YXRpb24gY29tbWVudHNcbiAgICAgICAgaWYgKHByZXZJbmRlbnQgPT0gLTEpIHtcbiAgICAgICAgICAgIGlmIChpbmRlbnQgPT0gbmV4dEluZGVudCAmJiBsaW5lW2luZGVudF0gPT0gXCIjXCIgJiYgbmV4dFtpbmRlbnRdID09IFwiI1wiKSB7XG4gICAgICAgICAgICAgICAgc2Vzc2lvbi5mb2xkV2lkZ2V0c1tyb3cgLSAxXSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgc2Vzc2lvbi5mb2xkV2lkZ2V0c1tyb3cgKyAxXSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwic3RhcnRcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChwcmV2SW5kZW50ID09IGluZGVudCAmJiBsaW5lW2luZGVudF0gPT0gXCIjXCIgJiYgcHJldltpbmRlbnRdID09IFwiI1wiKSB7XG4gICAgICAgICAgICBpZiAoc2Vzc2lvbi5nZXRMaW5lKHJvdyAtIDIpLnNlYXJjaCgvXFxTLykgPT0gLTEpIHtcbiAgICAgICAgICAgICAgICBzZXNzaW9uLmZvbGRXaWRnZXRzW3JvdyAtIDFdID0gXCJzdGFydFwiO1xuICAgICAgICAgICAgICAgIHNlc3Npb24uZm9sZFdpZGdldHNbcm93ICsgMV0gPSBcIlwiO1xuICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByZXZJbmRlbnQhPSAtMSAmJiBwcmV2SW5kZW50IDwgaW5kZW50KVxuICAgICAgICAgICAgc2Vzc2lvbi5mb2xkV2lkZ2V0c1tyb3cgLSAxXSA9IFwic3RhcnRcIjtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgc2Vzc2lvbi5mb2xkV2lkZ2V0c1tyb3cgLSAxXSA9IFwiXCI7XG5cbiAgICAgICAgaWYgKGluZGVudCA8IG5leHRJbmRlbnQpXG4gICAgICAgICAgICByZXR1cm4gXCJzdGFydFwiO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICB9O1xuXG59KS5jYWxsKEZvbGRNb2RlLnByb3RvdHlwZSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRNb2RlID0gcmVxdWlyZShcIi4vdGV4dFwiKS5Nb2RlO1xudmFyIExvZ2lRTEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vbG9naXFsX2hpZ2hsaWdodF9ydWxlc1wiKS5Mb2dpUUxIaWdobGlnaHRSdWxlcztcbnZhciBGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRpbmcvY29mZmVlXCIpLkZvbGRNb2RlO1xudmFyIFRva2VuSXRlcmF0b3IgPSByZXF1aXJlKFwiLi4vdG9rZW5faXRlcmF0b3JcIikuVG9rZW5JdGVyYXRvcjtcbnZhciBSYW5nZSA9IHJlcXVpcmUoXCIuLi9yYW5nZVwiKS5SYW5nZTtcbnZhciBNYXRjaGluZ0JyYWNlT3V0ZGVudCA9IHJlcXVpcmUoXCIuL21hdGNoaW5nX2JyYWNlX291dGRlbnRcIikuTWF0Y2hpbmdCcmFjZU91dGRlbnQ7XG5cbnZhciBNb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5IaWdobGlnaHRSdWxlcyA9IExvZ2lRTEhpZ2hsaWdodFJ1bGVzO1xuICAgIHRoaXMuZm9sZGluZ1J1bGVzID0gbmV3IEZvbGRNb2RlKCk7XG4gICAgdGhpcy4kb3V0ZGVudCA9IG5ldyBNYXRjaGluZ0JyYWNlT3V0ZGVudCgpO1xuICAgIHRoaXMuJGJlaGF2aW91ciA9IHRoaXMuJGRlZmF1bHRCZWhhdmlvdXI7XG59O1xub29wLmluaGVyaXRzKE1vZGUsIFRleHRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuICAgIHRoaXMubGluZUNvbW1lbnRTdGFydCA9IFwiLy9cIjtcbiAgICB0aGlzLmJsb2NrQ29tbWVudCA9IHtzdGFydDogXCIvKlwiLCBlbmQ6IFwiKi9cIn07XG5cbiAgICB0aGlzLmdldE5leHRMaW5lSW5kZW50ID0gZnVuY3Rpb24oc3RhdGUsIGxpbmUsIHRhYikge1xuICAgICAgICB2YXIgaW5kZW50ID0gdGhpcy4kZ2V0SW5kZW50KGxpbmUpO1xuXG4gICAgICAgIHZhciB0b2tlbml6ZWRMaW5lID0gdGhpcy5nZXRUb2tlbml6ZXIoKS5nZXRMaW5lVG9rZW5zKGxpbmUsIHN0YXRlKTtcbiAgICAgICAgdmFyIHRva2VucyA9IHRva2VuaXplZExpbmUudG9rZW5zO1xuICAgICAgICB2YXIgZW5kU3RhdGUgPSB0b2tlbml6ZWRMaW5lLnN0YXRlO1xuICAgICAgICBpZiAoL2NvbW1lbnR8c3RyaW5nLy50ZXN0KGVuZFN0YXRlKSkgIFxuICAgICAgICAgICAgcmV0dXJuIGluZGVudDtcbiAgICAgICAgaWYgKHRva2Vucy5sZW5ndGggJiYgdG9rZW5zW3Rva2Vucy5sZW5ndGggLSAxXS50eXBlID09IFwiY29tbWVudC5zaW5nbGVcIilcbiAgICAgICAgICAgIHJldHVybiBpbmRlbnQ7XG5cbiAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCgpO1xuICAgICAgICBpZiAoLygtLT58PC0tfDwtfC0+fHspXFxzKiQvLnRlc3QobGluZSkpXG4gICAgICAgICAgICBpbmRlbnQgKz0gdGFiO1xuICAgICAgICByZXR1cm4gaW5kZW50O1xuICAgIH07XG5cbiAgICB0aGlzLmNoZWNrT3V0ZGVudCA9IGZ1bmN0aW9uKHN0YXRlLCBsaW5lLCBpbnB1dCkge1xuICAgICAgICBpZiAodGhpcy4kb3V0ZGVudC5jaGVja091dGRlbnQobGluZSwgaW5wdXQpKVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICAgICAgaWYgKGlucHV0ICE9PSBcIlxcblwiICYmIGlucHV0ICE9PSBcIlxcclxcblwiKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgXG4gICAgICAgIGlmICghL15cXHMrLy50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICB0aGlzLmF1dG9PdXRkZW50ID0gZnVuY3Rpb24oc3RhdGUsIGRvYywgcm93KSB7XG4gICAgICAgIGlmICh0aGlzLiRvdXRkZW50LmF1dG9PdXRkZW50KGRvYywgcm93KSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdmFyIHByZXZMaW5lID0gZG9jLmdldExpbmUocm93KTtcbiAgICAgICAgdmFyIG1hdGNoID0gcHJldkxpbmUubWF0Y2goL15cXHMrLyk7XG4gICAgICAgIHZhciBjb2x1bW4gPSBwcmV2TGluZS5sYXN0SW5kZXhPZihcIi5cIikgKyAxO1xuICAgICAgICBpZiAoIW1hdGNoIHx8ICFyb3cgfHwgIWNvbHVtbikgcmV0dXJuIDA7XG5cbiAgICAgICAgdmFyIGxpbmUgPSBkb2MuZ2V0TGluZShyb3cgKyAxKTtcbiAgICAgICAgdmFyIHN0YXJ0UmFuZ2UgPSB0aGlzLmdldE1hdGNoaW5nKGRvYywge3Jvdzogcm93LCBjb2x1bW46IGNvbHVtbn0pO1xuICAgICAgICBpZiAoIXN0YXJ0UmFuZ2UgfHwgc3RhcnRSYW5nZS5zdGFydC5yb3cgPT0gcm93KSByZXR1cm4gMDtcblxuICAgICAgICBjb2x1bW4gPSBtYXRjaFswXS5sZW5ndGg7XG4gICAgICAgIHZhciBpbmRlbnQgPSB0aGlzLiRnZXRJbmRlbnQoZG9jLmdldExpbmUoc3RhcnRSYW5nZS5zdGFydC5yb3cpKTtcbiAgICAgICAgZG9jLnJlcGxhY2UobmV3IFJhbmdlKHJvdyArIDEsIDAsIHJvdyArIDEsIGNvbHVtbiksIGluZGVudCk7XG4gICAgfTtcblxuICAgIHRoaXMuZ2V0TWF0Y2hpbmcgPSBmdW5jdGlvbihzZXNzaW9uLCByb3csIGNvbHVtbikge1xuICAgICAgICBpZiAocm93ID09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJvdyA9IHNlc3Npb24uc2VsZWN0aW9uLmxlYWQ7XG4gICAgICAgIGlmICh0eXBlb2Ygcm93ID09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgIGNvbHVtbiA9IHJvdy5jb2x1bW47XG4gICAgICAgICAgICByb3cgPSByb3cucm93O1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHN0YXJ0VG9rZW4gPSBzZXNzaW9uLmdldFRva2VuQXQocm93LCBjb2x1bW4pO1xuICAgICAgICB2YXIgS1dfU1RBUlQgPSBcImtleXdvcmQuc3RhcnRcIiwgS1dfRU5EID0gXCJrZXl3b3JkLmVuZFwiO1xuICAgICAgICB2YXIgdG9rO1xuICAgICAgICBpZiAoIXN0YXJ0VG9rZW4pXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGlmIChzdGFydFRva2VuLnR5cGUgPT0gS1dfU1RBUlQpIHtcbiAgICAgICAgICAgIHZhciBpdCA9IG5ldyBUb2tlbkl0ZXJhdG9yKHNlc3Npb24sIHJvdywgY29sdW1uKTtcbiAgICAgICAgICAgIGl0LnN0ZXAgPSBpdC5zdGVwRm9yd2FyZDtcbiAgICAgICAgfSBlbHNlIGlmIChzdGFydFRva2VuLnR5cGUgPT0gS1dfRU5EKSB7XG4gICAgICAgICAgICB2YXIgaXQgPSBuZXcgVG9rZW5JdGVyYXRvcihzZXNzaW9uLCByb3csIGNvbHVtbik7XG4gICAgICAgICAgICBpdC5zdGVwID0gaXQuc3RlcEJhY2t3YXJkO1xuICAgICAgICB9IGVsc2VcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB3aGlsZSAodG9rID0gaXQuc3RlcCgpKSB7XG4gICAgICAgICAgICBpZiAodG9rLnR5cGUgPT0gS1dfU1RBUlQgfHwgdG9rLnR5cGUgPT0gS1dfRU5EKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdG9rIHx8IHRvay50eXBlID09IHN0YXJ0VG9rZW4udHlwZSlcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB2YXIgY29sID0gaXQuZ2V0Q3VycmVudFRva2VuQ29sdW1uKCk7XG4gICAgICAgIHZhciByb3cgPSBpdC5nZXRDdXJyZW50VG9rZW5Sb3coKTtcbiAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShyb3csIGNvbCwgcm93LCBjb2wgKyB0b2sudmFsdWUubGVuZ3RoKTtcbiAgICB9O1xuICAgIHRoaXMuJGlkID0gXCJhY2UvbW9kZS9sb2dpcWxcIjtcbn0pLmNhbGwoTW9kZS5wcm90b3R5cGUpO1xuXG5leHBvcnRzLk1vZGUgPSBNb2RlO1xuIiwiLyogVEhJUyBGSUxFIFdBUyBBVVRPR0VORVJBVEVEIEZST00gdG9vbFxcTG9naWNCbG94LnRtYnVuZGxlXFxTeW50YXhlc1xcTG9naWNCbG94LnRtTGFuZ3VhZ2UgKFVVSUQ6IDU5YmY1MDIyLWUyNjEtNDUzZi1iMWNiLTlmOWZhMDcxMjQxMykgKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90ZXh0X2hpZ2hsaWdodF9ydWxlc1wiKS5UZXh0SGlnaGxpZ2h0UnVsZXM7XG5cbnZhciBMb2dpUUxIaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uKCkge1xuICAgIC8vIHJlZ2V4cCBtdXN0IG5vdCBoYXZlIGNhcHR1cmluZyBwYXJlbnRoZXNlcy4gVXNlICg/OikgaW5zdGVhZC5cbiAgICAvLyByZWdleHBzIGFyZSBvcmRlcmVkIC0+IHRoZSBmaXJzdCBtYXRjaCBpcyB1c2VkXG5cbiAgICB0aGlzLiRydWxlcyA9IHsgc3RhcnQ6IFxuICAgICAgIFsgeyB0b2tlbjogJ2NvbW1lbnQuYmxvY2snLFxuICAgICAgICAgICByZWdleDogJy9cXFxcKicsXG4gICAgICAgICAgIHB1c2g6IFxuICAgICAgICAgICAgWyB7IHRva2VuOiAnY29tbWVudC5ibG9jaycsIHJlZ2V4OiAnXFxcXCovJywgbmV4dDogJ3BvcCcgfSxcbiAgICAgICAgICAgICAgeyBkZWZhdWx0VG9rZW46ICdjb21tZW50LmJsb2NrJyB9IF1cbiAgICAgICAgICAgLy9BIGJsb2NrIGNvbW1lbnQuXG4gICAgICAgICAgICB9LFxuICAgICAgICAgeyB0b2tlbjogJ2NvbW1lbnQuc2luZ2xlJyxcbiAgICAgICAgICAgcmVnZXg6ICcvLy4qJ1xuICAgICAgICAgICAvL0Egc2luZ2xlIGxpbmUgY29tbWVudC5cbiAgICAgICAgICAgIH0sXG4gICAgICAgICB7IHRva2VuOiAnY29uc3RhbnQubnVtZXJpYycsXG4gICAgICAgICAgIHJlZ2V4OiAnXFxcXGQrKD86XFxcXC5cXFxcZCspPyg/OltlRV1bKy1dP1xcXFxkKyk/W2ZkXT8nXG4gICAgICAgICAgIC8vQW4gaW50ZWdlciBjb25zdGFudC5cbiAgICAgICAgICAgLy9PciBhIFJlYWwgbnVtYmVyLlxuICAgICAgICAgICAgfSxcbiAgICAgICAgIHsgdG9rZW46ICdzdHJpbmcnLFxuICAgICAgICAgICByZWdleDogJ1wiJyxcbiAgICAgICAgICAgcHVzaDogXG4gICAgICAgICAgICBbIHsgdG9rZW46ICdzdHJpbmcnLCByZWdleDogJ1wiJywgbmV4dDogJ3BvcCcgfSxcbiAgICAgICAgICAgICAgeyBkZWZhdWx0VG9rZW46ICdzdHJpbmcnIH0gXVxuICAgICAgICAgICAvL1N0cmluZ3NcbiAgICAgICAgICAgIH0sXG4gICAgICAgICB7IHRva2VuOiAnY29uc3RhbnQubGFuZ3VhZ2UnLFxuICAgICAgICAgICByZWdleDogJ1xcXFxiKHRydWV8ZmFsc2UpXFxcXGInXG4gICAgICAgICAgIC8vQm9vbGVhbiB2YWx1ZXMuXG4gICAgICAgICAgICB9LFxuICAgICAgICAgeyB0b2tlbjogJ2VudGl0eS5uYW1lLnR5cGUubG9naWNibG94JyxcbiAgICAgICAgICAgcmVnZXg6ICdgW2EtekEtWl86XSsoXFxcXGR8XFxcXGEpKlxcXFxiJ1xuICAgICAgICAgICAvL0xvZ2ljQmxveCBTeW1ib2xcbiAgICAgICAgICAgIH0sXG4gICAgICAgICB7IHRva2VuOiAna2V5d29yZC5zdGFydCcsIHJlZ2V4OiAnLT4nLCAgY29tbWVudDogJ0NvbnN0cmFpbnQnIH0sXG4gICAgICAgICB7IHRva2VuOiAna2V5d29yZC5zdGFydCcsIHJlZ2V4OiAnLS0+JywgY29tbWVudDogJ0xldmVsIDEgQ29uc3RyYWludCd9LFxuICAgICAgICAgeyB0b2tlbjogJ2tleXdvcmQuc3RhcnQnLCByZWdleDogJzwtJywgIGNvbW1lbnQ6ICdSdWxlJyB9LFxuICAgICAgICAgeyB0b2tlbjogJ2tleXdvcmQuc3RhcnQnLCByZWdleDogJzwtLScsIGNvbW1lbnQ6ICdMZXZlbCAxIFJ1bGUnIH0sXG4gICAgICAgICB7IHRva2VuOiAna2V5d29yZC5lbmQnLCAgIHJlZ2V4OiAnXFxcXC4nLCBjb21tZW50OiAnVGVybWluYXRvcicgfSxcbiAgICAgICAgIHsgdG9rZW46ICdrZXl3b3JkLm90aGVyJywgcmVnZXg6ICchJywgICBjb21tZW50OiAnTmVnYXRpb24nIH0sXG4gICAgICAgICB7IHRva2VuOiAna2V5d29yZC5vdGhlcicsIHJlZ2V4OiAnLCcsICAgY29tbWVudDogJ0Nvbmp1bmN0aW9uJyB9LFxuICAgICAgICAgeyB0b2tlbjogJ2tleXdvcmQub3RoZXInLCByZWdleDogJzsnLCAgIGNvbW1lbnQ6ICdEaXNqdW5jdGlvbicgfSxcbiAgICAgICAgIHsgdG9rZW46ICdrZXl3b3JkLm9wZXJhdG9yJywgcmVnZXg6ICc8PXw+PXwhPXw8fD4nLCBjb21tZW50OiAnRXF1YWxpdHknfSxcbiAgICAgICAgIHsgdG9rZW46ICdrZXl3b3JkLm90aGVyJywgcmVnZXg6ICdAJywgY29tbWVudDogJ0VxdWFsaXR5JyB9LFxuICAgICAgICAgeyB0b2tlbjogJ2tleXdvcmQub3BlcmF0b3InLCByZWdleDogJ1xcXFwrfC18XFxcXCp8LycsIGNvbW1lbnQ6ICdBcml0aG1ldGljIG9wZXJhdGlvbnMnfSxcbiAgICAgICAgIHsgdG9rZW46ICdrZXl3b3JkJywgcmVnZXg6ICc6OicsIGNvbW1lbnQ6ICdDb2xvbiBjb2xvbicgfSxcbiAgICAgICAgIHsgdG9rZW46ICdzdXBwb3J0LmZ1bmN0aW9uJyxcbiAgICAgICAgICAgcmVnZXg6ICdcXFxcYihhZ2dcXFxccyo8PCknLFxuICAgICAgICAgICBwdXNoOiBcbiAgICAgICAgICAgIFsgeyBpbmNsdWRlOiAnJHNlbGYnIH0sXG4gICAgICAgICAgICAgIHsgdG9rZW46ICdzdXBwb3J0LmZ1bmN0aW9uJyxcbiAgICAgICAgICAgICAgICByZWdleDogJz4+JyxcbiAgICAgICAgICAgICAgICBuZXh0OiAncG9wJyB9IF1cbiAgICAgICAgICAgIC8vQWdncmVnYXRpb25zXG4gICAgICAgICAgICB9LFxuICAgICAgICAgeyB0b2tlbjogJ3N0b3JhZ2UubW9kaWZpZXInLFxuICAgICAgICAgICByZWdleDogJ1xcXFxiKGxhbmc6W1xcXFx3Ol0qKSdcbiAgICAgICAgICAgLy9BbGwgdGhlIGxhbmcgc3lzdGVtIHByZWRpY2F0ZXNcbiAgICAgICAgICAgIH0sXG4gICAgICAgICB7IHRva2VuOiBbICdzdG9yYWdlLnR5cGUnLCAndGV4dCcgXSxcbiAgICAgICAgICAgcmVnZXg6ICcoZXhwb3J0fHNlYWxlZHxjbGF1c2VzfGJsb2NrfGFsaWFzfGFsaWFzX2FsbCkoXFxcXHMqXFxcXCgpKD89YCknXG4gICAgICAgICAgIC8vTW9kdWxlIGtleXdvcmRzXG4gICAgICAgICAgICB9LFxuICAgICAgICAgeyB0b2tlbjogJ2VudGl0eS5uYW1lJyxcbiAgICAgICAgICAgcmVnZXg6ICdbYS16QS1aX11bYS16QS1aXzAtOTpdKihAcHJldnxAaW5pdHxAZmluYWwpPyg/PShcXFxcKHxcXFxcWykpJ1xuICAgICAgICAgICAvL0EgcHJlZGljYXRlIG5hbWUuXG4gICAgICAgICAgICB9LFxuICAgICAgICAgeyB0b2tlbjogJ3ZhcmlhYmxlLnBhcmFtZXRlcicsXG4gICAgICAgICAgIHJlZ2V4OiAnKFthLXpBLVpdW2EtekEtWl8wLTldKnxfKVxcXFxzKig/PSgsfFxcXFwufDwtfC0+fFxcXFwpfFxcXFxdfD0pKSdcbiAgICAgICAgICAgLy9BIHZhcmlhYmxlIHRvIGEgZnVuY3Rpb25hbCBwcmVkaWNhdGUuXG4gICAgICAgICAgICB9IF0gfTtcbiAgICBcbiAgICB0aGlzLm5vcm1hbGl6ZVJ1bGVzKCk7XG59O1xuXG5vb3AuaW5oZXJpdHMoTG9naVFMSGlnaGxpZ2h0UnVsZXMsIFRleHRIaWdobGlnaHRSdWxlcyk7XG5cbmV4cG9ydHMuTG9naVFMSGlnaGxpZ2h0UnVsZXMgPSBMb2dpUUxIaWdobGlnaHRSdWxlcztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgUmFuZ2UgPSByZXF1aXJlKFwiLi4vcmFuZ2VcIikuUmFuZ2U7XG5cbnZhciBNYXRjaGluZ0JyYWNlT3V0ZGVudCA9IGZ1bmN0aW9uKCkge307XG5cbihmdW5jdGlvbigpIHtcblxuICAgIHRoaXMuY2hlY2tPdXRkZW50ID0gZnVuY3Rpb24obGluZSwgaW5wdXQpIHtcbiAgICAgICAgaWYgKCEgL15cXHMrJC8udGVzdChsaW5lKSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgICByZXR1cm4gL15cXHMqXFx9Ly50ZXN0KGlucHV0KTtcbiAgICB9O1xuXG4gICAgdGhpcy5hdXRvT3V0ZGVudCA9IGZ1bmN0aW9uKGRvYywgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gZG9jLmdldExpbmUocm93KTtcbiAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCgvXihcXHMqXFx9KS8pO1xuXG4gICAgICAgIGlmICghbWF0Y2gpIHJldHVybiAwO1xuXG4gICAgICAgIHZhciBjb2x1bW4gPSBtYXRjaFsxXS5sZW5ndGg7XG4gICAgICAgIHZhciBvcGVuQnJhY2VQb3MgPSBkb2MuZmluZE1hdGNoaW5nQnJhY2tldCh7cm93OiByb3csIGNvbHVtbjogY29sdW1ufSk7XG5cbiAgICAgICAgaWYgKCFvcGVuQnJhY2VQb3MgfHwgb3BlbkJyYWNlUG9zLnJvdyA9PSByb3cpIHJldHVybiAwO1xuXG4gICAgICAgIHZhciBpbmRlbnQgPSB0aGlzLiRnZXRJbmRlbnQoZG9jLmdldExpbmUob3BlbkJyYWNlUG9zLnJvdykpO1xuICAgICAgICBkb2MucmVwbGFjZShuZXcgUmFuZ2Uocm93LCAwLCByb3csIGNvbHVtbi0xKSwgaW5kZW50KTtcbiAgICB9O1xuXG4gICAgdGhpcy4kZ2V0SW5kZW50ID0gZnVuY3Rpb24obGluZSkge1xuICAgICAgICByZXR1cm4gbGluZS5tYXRjaCgvXlxccyovKVswXTtcbiAgICB9O1xuXG59KS5jYWxsKE1hdGNoaW5nQnJhY2VPdXRkZW50LnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTWF0Y2hpbmdCcmFjZU91dGRlbnQgPSBNYXRjaGluZ0JyYWNlT3V0ZGVudDtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==