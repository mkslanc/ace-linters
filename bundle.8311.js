"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[8311],{

/***/ 41577:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var BaseFoldMode = (__webpack_require__(51358).FoldMode);
var Range = (__webpack_require__(91902)/* .Range */ .Q);
var TokenIterator = (__webpack_require__(99339).TokenIterator);
var keywordLevels = {
    "\\subparagraph": 1,
    "\\paragraph": 2,
    "\\subsubsubsection": 3,
    "\\subsubsection": 4,
    "\\subsection": 5,
    "\\section": 6,
    "\\chapter": 7,
    "\\part": 8,
    "\\begin": 9,
    "\\end": 10
};

var FoldMode = exports.l = function() {};

oop.inherits(FoldMode, BaseFoldMode);

(function() {

    this.foldingStartMarker = /^\s*\\(begin)|\s*\\(part|chapter|(?:sub)*(?:section|paragraph))\b|{\s*$/;
    this.foldingStopMarker = /^\s*\\(end)\b|^\s*}/;

    this.getFoldWidgetRange = function(session, foldStyle, row) {
        var line = session.doc.getLine(row);
        var match = this.foldingStartMarker.exec(line);
        if (match) {
            if (match[1])
                return this.latexBlock(session, row, match[0].length - 1);
            if (match[2])
                return this.latexSection(session, row, match[0].length - 1);

            return this.openingBracketBlock(session, "{", row, match.index);
        }

        var match = this.foldingStopMarker.exec(line);
        if (match) {
            if (match[1])
                return this.latexBlock(session, row, match[0].length - 1);

            return this.closingBracketBlock(session, "}", row, match.index + match[0].length);
        }
    };

    this.latexBlock = function(session, row, column, returnRange) {
        var keywords = {
            "\\begin": 1,
            "\\end": -1
        };

        var stream = new TokenIterator(session, row, column);
        var token = stream.getCurrentToken();
        if (!token || !(token.type == "storage.type" || token.type == "constant.character.escape"))
            return;

        var val = token.value;
        var dir = keywords[val];

        var getType = function() {
            var token = stream.stepForward();
            var type = token && token.type == "lparen" ? stream.stepForward().value : "";
            if (dir === -1) {
                stream.stepBackward();
                if (type)
                    stream.stepBackward();
            }
            return type;
        };
        var stack = [getType()];
        var startColumn = dir === -1 ? stream.getCurrentTokenColumn() : session.getLine(row).length;
        var startRow = row;

        stream.step = dir === -1 ? stream.stepBackward : stream.stepForward;
        while(token = stream.step()) {
            if (!token || !(token.type == "storage.type" || token.type == "constant.character.escape"))
                continue;
            var level = keywords[token.value];
            if (!level)
                continue;
            var type = getType();
            if (level === dir)
                stack.unshift(type);
            else if (stack.shift() !== type || !stack.length)
                break;
        }

        if (stack.length)
            return;
        
        if (dir == 1) {
            stream.stepBackward();
            stream.stepBackward();
        }
        
        if (returnRange)
            return stream.getCurrentTokenRange();

        var row = stream.getCurrentTokenRow();
        if (dir === -1)
            return new Range(row, session.getLine(row).length, startRow, startColumn);
        else
            return new Range(startRow, startColumn, row, stream.getCurrentTokenColumn());
    };

    this.latexSection = function(session, row, column) {
        var stream = new TokenIterator(session, row, column);
        var token = stream.getCurrentToken();
        if (!token || token.type != "storage.type")
            return;

        var startLevel = keywordLevels[token.value] || 0;
        var stackDepth = 0;
        var endRow = row;

        while(token = stream.stepForward()) {
            if (token.type !== "storage.type")
                continue;
            var level = keywordLevels[token.value] || 0;

            if (level >= 9) {
                if (!stackDepth)
                    endRow = stream.getCurrentTokenRow() - 1;
                stackDepth += level == 9 ? 1 : - 1;
                if (stackDepth < 0)
                    break;
            } else if (level >= startLevel)
                break;
        }

        if (!stackDepth)
            endRow = stream.getCurrentTokenRow() - 1;

        while (endRow > row && !/\S/.test(session.getLine(endRow)))
            endRow--;

        return new Range(
            row, session.getLine(row).length,
            endRow, session.getLine(endRow).length
        );
    };

}).call(FoldMode.prototype);


/***/ }),

/***/ 88311:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var LatexHighlightRules = (__webpack_require__(72644).LatexHighlightRules);
var CstyleBehaviour = (__webpack_require__(32589)/* .CstyleBehaviour */ ._);
var LatexFoldMode = (__webpack_require__(41577)/* .FoldMode */ .l);

var Mode = function() {
    this.HighlightRules = LatexHighlightRules;
    this.foldingRules = new LatexFoldMode();
    this.$behaviour = new CstyleBehaviour({ braces: true });
};
oop.inherits(Mode, TextMode);

(function() {
    this.type = "text";
    
    this.lineCommentStart = "%";

    this.$id = "ace/mode/latex";
    
    this.getMatching = function(session, row, column) {
        if (row == undefined)
            row = session.selection.lead;
        if (typeof row == "object") {
            column = row.column;
            row = row.row;
        }

        var startToken = session.getTokenAt(row, column);
        if (!startToken)
            return;
        if (startToken.value == "\\begin" || startToken.value == "\\end") {
            return this.foldingRules.latexBlock(session, row, column, true);
        }
    };
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 72644:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

var LatexHighlightRules = function() {  

    this.$rules = {
        "start" : [{
            // A comment. Tex comments start with % and go to 
            // the end of the line
            token : "comment",
            regex : "%.*$"
        }, {
            // Documentclass and usepackage
            token : ["keyword", "lparen", "variable.parameter", "rparen", "lparen", "storage.type", "rparen"],
            regex : "(\\\\(?:documentclass|usepackage|input))(?:(\\[)([^\\]]*)(\\]))?({)([^}]*)(})"
        }, {
            // A label
            token : ["keyword","lparen", "variable.parameter", "rparen"],
            regex : "(\\\\(?:label|v?ref|cite(?:[^{]*)))(?:({)([^}]*)(}))?"
        }, {
            // A Verbatim block
            token : ["storage.type", "lparen", "variable.parameter", "rparen"],
            regex : "(\\\\begin)({)(verbatim)(})",
            next : "verbatim"
        },  {
            token : ["storage.type", "lparen", "variable.parameter", "rparen"],
            regex : "(\\\\begin)({)(lstlisting)(})",
            next : "lstlisting"
        },  {
            // A block
            token : ["storage.type", "lparen", "variable.parameter", "rparen"],
            regex : "(\\\\(?:begin|end))({)([\\w*]*)(})"
        }, {
            token : "storage.type",
            regex : /\\verb\b\*?/,
            next : [{
                token : ["keyword.operator", "string", "keyword.operator"],
                regex : "(.)(.*?)(\\1|$)|",
                next : "start"
            }]
        }, {
            // A tex command e.g. \foo
            token : "storage.type",
            regex : "\\\\[a-zA-Z]+"
        }, {
            // Curly and square braces
            token : "lparen",
            regex : "[[({]"
        }, {
            // Curly and square braces
            token : "rparen",
            regex : "[\\])}]"
        }, {
            // Escaped character (including new line)
            token : "constant.character.escape",
            regex : "\\\\[^a-zA-Z]?"
        }, {
            // An equation
            token : "string",
            regex : "\\${1,2}",
            next  : "equation"
        }],
        "equation" : [{
            token : "comment",
            regex : "%.*$"
        }, {
            token : "string",
            regex : "\\${1,2}",
            next  : "start"
        }, {
            token : "constant.character.escape",
            regex : "\\\\(?:[^a-zA-Z]|[a-zA-Z]+)"
        }, {
            token : "error", 
            regex : "^\\s*$", 
            next : "start" 
        }, {
            defaultToken : "string"
        }],
        "verbatim": [{
            token : ["storage.type", "lparen", "variable.parameter", "rparen"],
            regex : "(\\\\end)({)(verbatim)(})",
            next : "start"
        }, {
            defaultToken : "text"
        }],
        "lstlisting": [{
            token : ["storage.type", "lparen", "variable.parameter", "rparen"],
            regex : "(\\\\end)({)(lstlisting)(})",
            next : "start"
        }, {
            defaultToken : "text"
        }]
    };
    
    this.normalizeRules();
};
oop.inherits(LatexHighlightRules, TextHighlightRules);

exports.LatexHighlightRules = LatexHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxnQ0FBZ0MsZUFBZTtBQUMvQztBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDJCQUEyQiIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvZm9sZGluZy9sYXRleC5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2xhdGV4LmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvbGF0ZXhfaGlnaGxpZ2h0X3J1bGVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uLy4uL2xpYi9vb3BcIik7XG52YXIgQmFzZUZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZF9tb2RlXCIpLkZvbGRNb2RlO1xudmFyIFJhbmdlID0gcmVxdWlyZShcIi4uLy4uL3JhbmdlXCIpLlJhbmdlO1xudmFyIFRva2VuSXRlcmF0b3IgPSByZXF1aXJlKFwiLi4vLi4vdG9rZW5faXRlcmF0b3JcIikuVG9rZW5JdGVyYXRvcjtcbnZhciBrZXl3b3JkTGV2ZWxzID0ge1xuICAgIFwiXFxcXHN1YnBhcmFncmFwaFwiOiAxLFxuICAgIFwiXFxcXHBhcmFncmFwaFwiOiAyLFxuICAgIFwiXFxcXHN1YnN1YnN1YnNlY3Rpb25cIjogMyxcbiAgICBcIlxcXFxzdWJzdWJzZWN0aW9uXCI6IDQsXG4gICAgXCJcXFxcc3Vic2VjdGlvblwiOiA1LFxuICAgIFwiXFxcXHNlY3Rpb25cIjogNixcbiAgICBcIlxcXFxjaGFwdGVyXCI6IDcsXG4gICAgXCJcXFxccGFydFwiOiA4LFxuICAgIFwiXFxcXGJlZ2luXCI6IDksXG4gICAgXCJcXFxcZW5kXCI6IDEwXG59O1xuXG52YXIgRm9sZE1vZGUgPSBleHBvcnRzLkZvbGRNb2RlID0gZnVuY3Rpb24oKSB7fTtcblxub29wLmluaGVyaXRzKEZvbGRNb2RlLCBCYXNlRm9sZE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG5cbiAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlciA9IC9eXFxzKlxcXFwoYmVnaW4pfFxccypcXFxcKHBhcnR8Y2hhcHRlcnwoPzpzdWIpKig/OnNlY3Rpb258cGFyYWdyYXBoKSlcXGJ8e1xccyokLztcbiAgICB0aGlzLmZvbGRpbmdTdG9wTWFya2VyID0gL15cXHMqXFxcXChlbmQpXFxifF5cXHMqfS87XG5cbiAgICB0aGlzLmdldEZvbGRXaWRnZXRSYW5nZSA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5kb2MuZ2V0TGluZShyb3cpO1xuICAgICAgICB2YXIgbWF0Y2ggPSB0aGlzLmZvbGRpbmdTdGFydE1hcmtlci5leGVjKGxpbmUpO1xuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIGlmIChtYXRjaFsxXSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sYXRleEJsb2NrKHNlc3Npb24sIHJvdywgbWF0Y2hbMF0ubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICBpZiAobWF0Y2hbMl0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubGF0ZXhTZWN0aW9uKHNlc3Npb24sIHJvdywgbWF0Y2hbMF0ubGVuZ3RoIC0gMSk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLm9wZW5pbmdCcmFja2V0QmxvY2soc2Vzc2lvbiwgXCJ7XCIsIHJvdywgbWF0Y2guaW5kZXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG1hdGNoID0gdGhpcy5mb2xkaW5nU3RvcE1hcmtlci5leGVjKGxpbmUpO1xuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIGlmIChtYXRjaFsxXSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5sYXRleEJsb2NrKHNlc3Npb24sIHJvdywgbWF0Y2hbMF0ubGVuZ3RoIC0gMSk7XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNsb3NpbmdCcmFja2V0QmxvY2soc2Vzc2lvbiwgXCJ9XCIsIHJvdywgbWF0Y2guaW5kZXggKyBtYXRjaFswXS5sZW5ndGgpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMubGF0ZXhCbG9jayA9IGZ1bmN0aW9uKHNlc3Npb24sIHJvdywgY29sdW1uLCByZXR1cm5SYW5nZSkge1xuICAgICAgICB2YXIga2V5d29yZHMgPSB7XG4gICAgICAgICAgICBcIlxcXFxiZWdpblwiOiAxLFxuICAgICAgICAgICAgXCJcXFxcZW5kXCI6IC0xXG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIHN0cmVhbSA9IG5ldyBUb2tlbkl0ZXJhdG9yKHNlc3Npb24sIHJvdywgY29sdW1uKTtcbiAgICAgICAgdmFyIHRva2VuID0gc3RyZWFtLmdldEN1cnJlbnRUb2tlbigpO1xuICAgICAgICBpZiAoIXRva2VuIHx8ICEodG9rZW4udHlwZSA9PSBcInN0b3JhZ2UudHlwZVwiIHx8IHRva2VuLnR5cGUgPT0gXCJjb25zdGFudC5jaGFyYWN0ZXIuZXNjYXBlXCIpKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHZhciB2YWwgPSB0b2tlbi52YWx1ZTtcbiAgICAgICAgdmFyIGRpciA9IGtleXdvcmRzW3ZhbF07XG5cbiAgICAgICAgdmFyIGdldFR5cGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciB0b2tlbiA9IHN0cmVhbS5zdGVwRm9yd2FyZCgpO1xuICAgICAgICAgICAgdmFyIHR5cGUgPSB0b2tlbiAmJiB0b2tlbi50eXBlID09IFwibHBhcmVuXCIgPyBzdHJlYW0uc3RlcEZvcndhcmQoKS52YWx1ZSA6IFwiXCI7XG4gICAgICAgICAgICBpZiAoZGlyID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHN0cmVhbS5zdGVwQmFja3dhcmQoKTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZSlcbiAgICAgICAgICAgICAgICAgICAgc3RyZWFtLnN0ZXBCYWNrd2FyZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHR5cGU7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBzdGFjayA9IFtnZXRUeXBlKCldO1xuICAgICAgICB2YXIgc3RhcnRDb2x1bW4gPSBkaXIgPT09IC0xID8gc3RyZWFtLmdldEN1cnJlbnRUb2tlbkNvbHVtbigpIDogc2Vzc2lvbi5nZXRMaW5lKHJvdykubGVuZ3RoO1xuICAgICAgICB2YXIgc3RhcnRSb3cgPSByb3c7XG5cbiAgICAgICAgc3RyZWFtLnN0ZXAgPSBkaXIgPT09IC0xID8gc3RyZWFtLnN0ZXBCYWNrd2FyZCA6IHN0cmVhbS5zdGVwRm9yd2FyZDtcbiAgICAgICAgd2hpbGUodG9rZW4gPSBzdHJlYW0uc3RlcCgpKSB7XG4gICAgICAgICAgICBpZiAoIXRva2VuIHx8ICEodG9rZW4udHlwZSA9PSBcInN0b3JhZ2UudHlwZVwiIHx8IHRva2VuLnR5cGUgPT0gXCJjb25zdGFudC5jaGFyYWN0ZXIuZXNjYXBlXCIpKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgdmFyIGxldmVsID0ga2V5d29yZHNbdG9rZW4udmFsdWVdO1xuICAgICAgICAgICAgaWYgKCFsZXZlbClcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIHZhciB0eXBlID0gZ2V0VHlwZSgpO1xuICAgICAgICAgICAgaWYgKGxldmVsID09PSBkaXIpXG4gICAgICAgICAgICAgICAgc3RhY2sudW5zaGlmdCh0eXBlKTtcbiAgICAgICAgICAgIGVsc2UgaWYgKHN0YWNrLnNoaWZ0KCkgIT09IHR5cGUgfHwgIXN0YWNrLmxlbmd0aClcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdGFjay5sZW5ndGgpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIFxuICAgICAgICBpZiAoZGlyID09IDEpIHtcbiAgICAgICAgICAgIHN0cmVhbS5zdGVwQmFja3dhcmQoKTtcbiAgICAgICAgICAgIHN0cmVhbS5zdGVwQmFja3dhcmQoKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKHJldHVyblJhbmdlKVxuICAgICAgICAgICAgcmV0dXJuIHN0cmVhbS5nZXRDdXJyZW50VG9rZW5SYW5nZSgpO1xuXG4gICAgICAgIHZhciByb3cgPSBzdHJlYW0uZ2V0Q3VycmVudFRva2VuUm93KCk7XG4gICAgICAgIGlmIChkaXIgPT09IC0xKVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShyb3csIHNlc3Npb24uZ2V0TGluZShyb3cpLmxlbmd0aCwgc3RhcnRSb3csIHN0YXJ0Q29sdW1uKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShzdGFydFJvdywgc3RhcnRDb2x1bW4sIHJvdywgc3RyZWFtLmdldEN1cnJlbnRUb2tlbkNvbHVtbigpKTtcbiAgICB9O1xuXG4gICAgdGhpcy5sYXRleFNlY3Rpb24gPSBmdW5jdGlvbihzZXNzaW9uLCByb3csIGNvbHVtbikge1xuICAgICAgICB2YXIgc3RyZWFtID0gbmV3IFRva2VuSXRlcmF0b3Ioc2Vzc2lvbiwgcm93LCBjb2x1bW4pO1xuICAgICAgICB2YXIgdG9rZW4gPSBzdHJlYW0uZ2V0Q3VycmVudFRva2VuKCk7XG4gICAgICAgIGlmICghdG9rZW4gfHwgdG9rZW4udHlwZSAhPSBcInN0b3JhZ2UudHlwZVwiKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHZhciBzdGFydExldmVsID0ga2V5d29yZExldmVsc1t0b2tlbi52YWx1ZV0gfHwgMDtcbiAgICAgICAgdmFyIHN0YWNrRGVwdGggPSAwO1xuICAgICAgICB2YXIgZW5kUm93ID0gcm93O1xuXG4gICAgICAgIHdoaWxlKHRva2VuID0gc3RyZWFtLnN0ZXBGb3J3YXJkKCkpIHtcbiAgICAgICAgICAgIGlmICh0b2tlbi50eXBlICE9PSBcInN0b3JhZ2UudHlwZVwiKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgdmFyIGxldmVsID0ga2V5d29yZExldmVsc1t0b2tlbi52YWx1ZV0gfHwgMDtcblxuICAgICAgICAgICAgaWYgKGxldmVsID49IDkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXN0YWNrRGVwdGgpXG4gICAgICAgICAgICAgICAgICAgIGVuZFJvdyA9IHN0cmVhbS5nZXRDdXJyZW50VG9rZW5Sb3coKSAtIDE7XG4gICAgICAgICAgICAgICAgc3RhY2tEZXB0aCArPSBsZXZlbCA9PSA5ID8gMSA6IC0gMTtcbiAgICAgICAgICAgICAgICBpZiAoc3RhY2tEZXB0aCA8IDApXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChsZXZlbCA+PSBzdGFydExldmVsKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFzdGFja0RlcHRoKVxuICAgICAgICAgICAgZW5kUm93ID0gc3RyZWFtLmdldEN1cnJlbnRUb2tlblJvdygpIC0gMTtcblxuICAgICAgICB3aGlsZSAoZW5kUm93ID4gcm93ICYmICEvXFxTLy50ZXN0KHNlc3Npb24uZ2V0TGluZShlbmRSb3cpKSlcbiAgICAgICAgICAgIGVuZFJvdy0tO1xuXG4gICAgICAgIHJldHVybiBuZXcgUmFuZ2UoXG4gICAgICAgICAgICByb3csIHNlc3Npb24uZ2V0TGluZShyb3cpLmxlbmd0aCxcbiAgICAgICAgICAgIGVuZFJvdywgc2Vzc2lvbi5nZXRMaW5lKGVuZFJvdykubGVuZ3RoXG4gICAgICAgICk7XG4gICAgfTtcblxufSkuY2FsbChGb2xkTW9kZS5wcm90b3R5cGUpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0TW9kZSA9IHJlcXVpcmUoXCIuL3RleHRcIikuTW9kZTtcbnZhciBMYXRleEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vbGF0ZXhfaGlnaGxpZ2h0X3J1bGVzXCIpLkxhdGV4SGlnaGxpZ2h0UnVsZXM7XG52YXIgQ3N0eWxlQmVoYXZpb3VyID0gcmVxdWlyZShcIi4vYmVoYXZpb3VyL2NzdHlsZVwiKS5Dc3R5bGVCZWhhdmlvdXI7XG52YXIgTGF0ZXhGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRpbmcvbGF0ZXhcIikuRm9sZE1vZGU7XG5cbnZhciBNb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5IaWdobGlnaHRSdWxlcyA9IExhdGV4SGlnaGxpZ2h0UnVsZXM7XG4gICAgdGhpcy5mb2xkaW5nUnVsZXMgPSBuZXcgTGF0ZXhGb2xkTW9kZSgpO1xuICAgIHRoaXMuJGJlaGF2aW91ciA9IG5ldyBDc3R5bGVCZWhhdmlvdXIoeyBicmFjZXM6IHRydWUgfSk7XG59O1xub29wLmluaGVyaXRzKE1vZGUsIFRleHRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuICAgIHRoaXMudHlwZSA9IFwidGV4dFwiO1xuICAgIFxuICAgIHRoaXMubGluZUNvbW1lbnRTdGFydCA9IFwiJVwiO1xuXG4gICAgdGhpcy4kaWQgPSBcImFjZS9tb2RlL2xhdGV4XCI7XG4gICAgXG4gICAgdGhpcy5nZXRNYXRjaGluZyA9IGZ1bmN0aW9uKHNlc3Npb24sIHJvdywgY29sdW1uKSB7XG4gICAgICAgIGlmIChyb3cgPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgcm93ID0gc2Vzc2lvbi5zZWxlY3Rpb24ubGVhZDtcbiAgICAgICAgaWYgKHR5cGVvZiByb3cgPT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgY29sdW1uID0gcm93LmNvbHVtbjtcbiAgICAgICAgICAgIHJvdyA9IHJvdy5yb3c7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc3RhcnRUb2tlbiA9IHNlc3Npb24uZ2V0VG9rZW5BdChyb3csIGNvbHVtbik7XG4gICAgICAgIGlmICghc3RhcnRUb2tlbilcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgaWYgKHN0YXJ0VG9rZW4udmFsdWUgPT0gXCJcXFxcYmVnaW5cIiB8fCBzdGFydFRva2VuLnZhbHVlID09IFwiXFxcXGVuZFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mb2xkaW5nUnVsZXMubGF0ZXhCbG9jayhzZXNzaW9uLCByb3csIGNvbHVtbiwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9O1xufSkuY2FsbChNb2RlLnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTW9kZSA9IE1vZGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcblxudmFyIExhdGV4SGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbigpIHsgIFxuXG4gICAgdGhpcy4kcnVsZXMgPSB7XG4gICAgICAgIFwic3RhcnRcIiA6IFt7XG4gICAgICAgICAgICAvLyBBIGNvbW1lbnQuIFRleCBjb21tZW50cyBzdGFydCB3aXRoICUgYW5kIGdvIHRvIFxuICAgICAgICAgICAgLy8gdGhlIGVuZCBvZiB0aGUgbGluZVxuICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCIlLiokXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgLy8gRG9jdW1lbnRjbGFzcyBhbmQgdXNlcGFja2FnZVxuICAgICAgICAgICAgdG9rZW4gOiBbXCJrZXl3b3JkXCIsIFwibHBhcmVuXCIsIFwidmFyaWFibGUucGFyYW1ldGVyXCIsIFwicnBhcmVuXCIsIFwibHBhcmVuXCIsIFwic3RvcmFnZS50eXBlXCIsIFwicnBhcmVuXCJdLFxuICAgICAgICAgICAgcmVnZXggOiBcIihcXFxcXFxcXCg/OmRvY3VtZW50Y2xhc3N8dXNlcGFja2FnZXxpbnB1dCkpKD86KFxcXFxbKShbXlxcXFxdXSopKFxcXFxdKSk/KHspKFtefV0qKSh9KVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIC8vIEEgbGFiZWxcbiAgICAgICAgICAgIHRva2VuIDogW1wia2V5d29yZFwiLFwibHBhcmVuXCIsIFwidmFyaWFibGUucGFyYW1ldGVyXCIsIFwicnBhcmVuXCJdLFxuICAgICAgICAgICAgcmVnZXggOiBcIihcXFxcXFxcXCg/OmxhYmVsfHY/cmVmfGNpdGUoPzpbXntdKikpKSg/Oih7KShbXn1dKikofSkpP1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIC8vIEEgVmVyYmF0aW0gYmxvY2tcbiAgICAgICAgICAgIHRva2VuIDogW1wic3RvcmFnZS50eXBlXCIsIFwibHBhcmVuXCIsIFwidmFyaWFibGUucGFyYW1ldGVyXCIsIFwicnBhcmVuXCJdLFxuICAgICAgICAgICAgcmVnZXggOiBcIihcXFxcXFxcXGJlZ2luKSh7KSh2ZXJiYXRpbSkofSlcIixcbiAgICAgICAgICAgIG5leHQgOiBcInZlcmJhdGltXCJcbiAgICAgICAgfSwgIHtcbiAgICAgICAgICAgIHRva2VuIDogW1wic3RvcmFnZS50eXBlXCIsIFwibHBhcmVuXCIsIFwidmFyaWFibGUucGFyYW1ldGVyXCIsIFwicnBhcmVuXCJdLFxuICAgICAgICAgICAgcmVnZXggOiBcIihcXFxcXFxcXGJlZ2luKSh7KShsc3RsaXN0aW5nKSh9KVwiLFxuICAgICAgICAgICAgbmV4dCA6IFwibHN0bGlzdGluZ1wiXG4gICAgICAgIH0sICB7XG4gICAgICAgICAgICAvLyBBIGJsb2NrXG4gICAgICAgICAgICB0b2tlbiA6IFtcInN0b3JhZ2UudHlwZVwiLCBcImxwYXJlblwiLCBcInZhcmlhYmxlLnBhcmFtZXRlclwiLCBcInJwYXJlblwiXSxcbiAgICAgICAgICAgIHJlZ2V4IDogXCIoXFxcXFxcXFwoPzpiZWdpbnxlbmQpKSh7KShbXFxcXHcqXSopKH0pXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInN0b3JhZ2UudHlwZVwiLFxuICAgICAgICAgICAgcmVnZXggOiAvXFxcXHZlcmJcXGJcXCo/LyxcbiAgICAgICAgICAgIG5leHQgOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuIDogW1wia2V5d29yZC5vcGVyYXRvclwiLCBcInN0cmluZ1wiLCBcImtleXdvcmQub3BlcmF0b3JcIl0sXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIiguKSguKj8pKFxcXFwxfCQpfFwiLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcInN0YXJ0XCJcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIC8vIEEgdGV4IGNvbW1hbmQgZS5nLiBcXGZvb1xuICAgICAgICAgICAgdG9rZW4gOiBcInN0b3JhZ2UudHlwZVwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIlxcXFxcXFxcW2EtekEtWl0rXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgLy8gQ3VybHkgYW5kIHNxdWFyZSBicmFjZXNcbiAgICAgICAgICAgIHRva2VuIDogXCJscGFyZW5cIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJbWyh7XVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIC8vIEN1cmx5IGFuZCBzcXVhcmUgYnJhY2VzXG4gICAgICAgICAgICB0b2tlbiA6IFwicnBhcmVuXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiW1xcXFxdKX1dXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgLy8gRXNjYXBlZCBjaGFyYWN0ZXIgKGluY2x1ZGluZyBuZXcgbGluZSlcbiAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5jaGFyYWN0ZXIuZXNjYXBlXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiXFxcXFxcXFxbXmEtekEtWl0/XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgLy8gQW4gZXF1YXRpb25cbiAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcJHsxLDJ9XCIsXG4gICAgICAgICAgICBuZXh0ICA6IFwiZXF1YXRpb25cIlxuICAgICAgICB9XSxcbiAgICAgICAgXCJlcXVhdGlvblwiIDogW3tcbiAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsXG4gICAgICAgICAgICByZWdleCA6IFwiJS4qJFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcJHsxLDJ9XCIsXG4gICAgICAgICAgICBuZXh0ICA6IFwic3RhcnRcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQuY2hhcmFjdGVyLmVzY2FwZVwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIlxcXFxcXFxcKD86W15hLXpBLVpdfFthLXpBLVpdKylcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwiZXJyb3JcIiwgXG4gICAgICAgICAgICByZWdleCA6IFwiXlxcXFxzKiRcIiwgXG4gICAgICAgICAgICBuZXh0IDogXCJzdGFydFwiIFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBkZWZhdWx0VG9rZW4gOiBcInN0cmluZ1wiXG4gICAgICAgIH1dLFxuICAgICAgICBcInZlcmJhdGltXCI6IFt7XG4gICAgICAgICAgICB0b2tlbiA6IFtcInN0b3JhZ2UudHlwZVwiLCBcImxwYXJlblwiLCBcInZhcmlhYmxlLnBhcmFtZXRlclwiLCBcInJwYXJlblwiXSxcbiAgICAgICAgICAgIHJlZ2V4IDogXCIoXFxcXFxcXFxlbmQpKHspKHZlcmJhdGltKSh9KVwiLFxuICAgICAgICAgICAgbmV4dCA6IFwic3RhcnRcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBkZWZhdWx0VG9rZW4gOiBcInRleHRcIlxuICAgICAgICB9XSxcbiAgICAgICAgXCJsc3RsaXN0aW5nXCI6IFt7XG4gICAgICAgICAgICB0b2tlbiA6IFtcInN0b3JhZ2UudHlwZVwiLCBcImxwYXJlblwiLCBcInZhcmlhYmxlLnBhcmFtZXRlclwiLCBcInJwYXJlblwiXSxcbiAgICAgICAgICAgIHJlZ2V4IDogXCIoXFxcXFxcXFxlbmQpKHspKGxzdGxpc3RpbmcpKH0pXCIsXG4gICAgICAgICAgICBuZXh0IDogXCJzdGFydFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGRlZmF1bHRUb2tlbiA6IFwidGV4dFwiXG4gICAgICAgIH1dXG4gICAgfTtcbiAgICBcbiAgICB0aGlzLm5vcm1hbGl6ZVJ1bGVzKCk7XG59O1xub29wLmluaGVyaXRzKExhdGV4SGlnaGxpZ2h0UnVsZXMsIFRleHRIaWdobGlnaHRSdWxlcyk7XG5cbmV4cG9ydHMuTGF0ZXhIaWdobGlnaHRSdWxlcyA9IExhdGV4SGlnaGxpZ2h0UnVsZXM7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=