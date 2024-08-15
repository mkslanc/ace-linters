"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[8176],{

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

/***/ 84926:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var CoffeeFoldMode = (__webpack_require__(69261)/* .FoldMode */ .l);
var Range = (__webpack_require__(91902)/* .Range */ .Q);

var FoldMode = exports.l = function() {};
oop.inherits(FoldMode, CoffeeFoldMode);

(function() {
    this.getFoldWidgetRange = function(session, foldStyle, row) {
        var re = /\S/;
        var line = session.getLine(row);
        var startLevel = line.search(re);
        var isCommentFold = line[startLevel] === "#";
        var isDashFold = line[startLevel] === "-";
        
        if (startLevel == -1)
            return;

        var startColumn = line.length;
        var maxRow = session.getLength();
        var startRow = row;
        var endRow = row;

        // Comment folding
        if (isCommentFold) {
            var range = this.commentBlock(session, row);
            if (range)
                return range;
        // Indentation folding (used for indentations that start with a '-').
        } else if (isDashFold) {
            var range = this.indentationBlock(session, row);
            if (range)
                return range;
        // List folding (used for indentations that don't start with a '-')..
        } else {
            while (++row < maxRow) {
                var line = session.getLine(row);
                var level = line.search(re);

                if (level == -1)
                    continue;

                if (level <= startLevel && line[startLevel] !== '-') {
                    var token = session.getTokenAt(row, 0);
                    if (!token || token.type !== "string")
                        break;
                }

                endRow = row;
            }
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

        var lineStartsWithDash = line[indent] === '-';

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

        // Indentation fold
        if (prevIndent!= -1 && prevIndent < indent) {
            session.foldWidgets[row - 1] = "start";
        // Fold non-indented list
        } else if (prevIndent!= -1 &&  (prevIndent == indent && lineStartsWithDash)) {
            session.foldWidgets[row - 1] = "start";
        } else {
            session.foldWidgets[row - 1] = "";
        }

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


/***/ }),

/***/ 48176:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var YamlHighlightRules = (__webpack_require__(15115)/* .YamlHighlightRules */ .H);
var MatchingBraceOutdent = (__webpack_require__(28670).MatchingBraceOutdent);
var FoldMode = (__webpack_require__(84926)/* .FoldMode */ .l);
var WorkerClient = (__webpack_require__(28402).WorkerClient);

var Mode = function() {
    this.HighlightRules = YamlHighlightRules;
    this.$outdent = new MatchingBraceOutdent();
    this.foldingRules = new FoldMode();
    this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, TextMode);

(function() {

    this.lineCommentStart = ["#"];
    
    this.getNextLineIndent = function(state, line, tab) {
        var indent = this.$getIndent(line);

        if (state == "start") {
            var match = line.match(/^.*[\{\(\[]\s*$/);
            if (match) {
                indent += tab;
            }
        }

        return indent;
    };

    this.checkOutdent = function(state, line, input) {
        return this.$outdent.checkOutdent(line, input);
    };

    this.autoOutdent = function(state, doc, row) {
        this.$outdent.autoOutdent(doc, row);
    };

    this.createWorker = function(session) {
        var worker = new WorkerClient(["ace"], "ace/mode/yaml_worker", "YamlWorker");
        worker.attachToDocument(session.getDocument());

        worker.on("annotate", function(results) {
            session.setAnnotations(results.data);
        });

        worker.on("terminate", function() {
            session.clearAnnotations();
        });

        return worker;
    };


    this.$id = "ace/mode/yaml";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 15115:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

var YamlHighlightRules = function() {

    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used
    this.$rules = {
        "start" : [
            {
                token : "comment",
                regex : "#.*$"
            }, {
                token : "list.markup",
                regex : /^(?:-{3}|\.{3})\s*(?=#|$)/
            },  {
                token : "list.markup",
                regex : /^\s*[\-?](?:$|\s)/
            }, {
                token: "constant",
                regex: "!![\\w//]+"
            }, {
                token: "constant.language",
                regex: "[&\\*][a-zA-Z0-9-_]+"
            }, {
                token: ["meta.tag", "keyword"],
                regex: /^(\s*\w[^\s:]*?)(:(?=\s|$))/
            },{
                token: ["meta.tag", "keyword"],
                regex: /(\w[^\s:]*?)(\s*:(?=\s|$))/
            }, {
                token : "keyword.operator",
                regex : "<<\\w*:\\w*"
            }, {
                token : "keyword.operator",
                regex : "-\\s*(?=[{])"
            }, {
                token : "string", // single line
                regex : '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'
            }, {
                token : "string", // multi line string start
                regex : /[|>][-+\d]*(?:$|\s+(?:$|#))/,
                onMatch: function(val, state, stack, line) {
                    line = line.replace(/ #.*/, "");
                    var indent = /^ *((:\s*)?-(\s*[^|>])?)?/.exec(line)[0]
                        .replace(/\S\s*$/, "").length;
                    var indentationIndicator = parseInt(/\d+[\s+-]*$/.exec(line));
                    
                    if (indentationIndicator) {
                        indent += indentationIndicator - 1;
                        this.next = "mlString";
                    } else {
                        this.next = "mlStringPre";
                    }
                    if (!stack.length) {
                        stack.push(this.next);
                        stack.push(indent);
                    } else {
                        stack[0] = this.next;
                        stack[1] = indent;
                    }
                    return this.token;
                },
                next : "mlString"
            }, {
                token : "string", // single quoted string
                regex : "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"
            }, {
                token : "constant.numeric", // float
                regex : /(\b|[+\-\.])[\d_]+(?:(?:\.[\d_]*)?(?:[eE][+\-]?[\d_]+)?)(?=[^\d-\w]|$)$/
            }, {
                token : "constant.numeric", // other number
                regex : /[+\-]?\.inf\b|NaN\b|0x[\dA-Fa-f_]+|0b[10_]+/
            }, {
                token : "constant.language.boolean",
                regex : "\\b(?:true|false|TRUE|FALSE|True|False|yes|no)\\b"
            }, {
                token : "paren.lparen",
                regex : "[[({]"
            }, {
                token : "paren.rparen",
                regex : "[\\])}]"
            }, {
                token : "text",
                regex : /[^\s,:\[\]\{\}]+/
            }
        ],
        "mlStringPre" : [
            {
                token : "indent",
                regex : /^ *$/
            }, {
                token : "indent",
                regex : /^ */,
                onMatch: function(val, state, stack) {
                    var curIndent = stack[1];

                    if (curIndent >= val.length) {
                        this.next = "start";
                        stack.shift();
                        stack.shift();
                    }
                    else {
                        stack[1] = val.length - 1;
                        this.next = stack[0] = "mlString";
                    }
                    return this.token;
                },
                next : "mlString"
            }, {
                defaultToken : "string"
            }
        ],
        "mlString" : [
            {
                token : "indent",
                regex : /^ *$/
            }, {
                token : "indent",
                regex : /^ */,
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
                next : "mlString"
            }, {
                token : "string",
                regex : '.+'
            }
        ]};
    this.normalizeRules();

};

oop.inherits(YamlHighlightRules, TextHighlightRules);

exports.H = YamlHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEVBQUUsSUFBSSxFQUFFO0FBQ3ZDLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLG1DQUFtQztBQUNuQyxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLDZCQUE2QjtBQUM3QixhQUFhO0FBQ2I7QUFDQSwrQkFBK0I7QUFDL0IsYUFBYTtBQUNiO0FBQ0EscUNBQXFDLEVBQUU7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxTQUEwQiIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvZm9sZGluZy9jb2ZmZWUuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9mb2xkaW5nL3lhbWwuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9tYXRjaGluZ19icmFjZV9vdXRkZW50LmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUveWFtbC5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL3lhbWxfaGlnaGxpZ2h0X3J1bGVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uLy4uL2xpYi9vb3BcIik7XG52YXIgQmFzZUZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZF9tb2RlXCIpLkZvbGRNb2RlO1xudmFyIFJhbmdlID0gcmVxdWlyZShcIi4uLy4uL3JhbmdlXCIpLlJhbmdlO1xuXG52YXIgRm9sZE1vZGUgPSBleHBvcnRzLkZvbGRNb2RlID0gZnVuY3Rpb24oKSB7fTtcbm9vcC5pbmhlcml0cyhGb2xkTW9kZSwgQmFzZUZvbGRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuY29tbWVudEJsb2NrID0gZnVuY3Rpb24oc2Vzc2lvbiwgcm93KSB7XG4gICAgICAgIHZhciByZSA9IC9cXFMvO1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICB2YXIgc3RhcnRMZXZlbCA9IGxpbmUuc2VhcmNoKHJlKTtcbiAgICAgICAgaWYgKHN0YXJ0TGV2ZWwgPT0gLTEgfHwgbGluZVtzdGFydExldmVsXSAhPSBcIiNcIilcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB2YXIgc3RhcnRDb2x1bW4gPSBsaW5lLmxlbmd0aDtcbiAgICAgICAgdmFyIG1heFJvdyA9IHNlc3Npb24uZ2V0TGVuZ3RoKCk7XG4gICAgICAgIHZhciBzdGFydFJvdyA9IHJvdztcbiAgICAgICAgdmFyIGVuZFJvdyA9IHJvdztcblxuICAgICAgICB3aGlsZSAoKytyb3cgPCBtYXhSb3cpIHtcbiAgICAgICAgICAgIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgICAgIHZhciBsZXZlbCA9IGxpbmUuc2VhcmNoKHJlKTtcblxuICAgICAgICAgICAgaWYgKGxldmVsID09IC0xKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICBpZiAobGluZVtsZXZlbF0gIT0gXCIjXCIpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGVuZFJvdyA9IHJvdztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbmRSb3cgPiBzdGFydFJvdykge1xuICAgICAgICAgICAgdmFyIGVuZENvbHVtbiA9IHNlc3Npb24uZ2V0TGluZShlbmRSb3cpLmxlbmd0aDtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmFuZ2Uoc3RhcnRSb3csIHN0YXJ0Q29sdW1uLCBlbmRSb3csIGVuZENvbHVtbik7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0UmFuZ2UgPSBmdW5jdGlvbihzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdykge1xuICAgICAgICB2YXIgcmFuZ2UgPSB0aGlzLmluZGVudGF0aW9uQmxvY2soc2Vzc2lvbiwgcm93KTtcbiAgICAgICAgaWYgKHJhbmdlKVxuICAgICAgICAgICAgcmV0dXJuIHJhbmdlO1xuXG4gICAgICAgIHJhbmdlID0gdGhpcy5jb21tZW50QmxvY2soc2Vzc2lvbiwgcm93KTtcbiAgICAgICAgaWYgKHJhbmdlKVxuICAgICAgICAgICAgcmV0dXJuIHJhbmdlO1xuICAgIH07XG5cbiAgICAvLyBtdXN0IHJldHVybiBcIlwiIGlmIHRoZXJlJ3Mgbm8gZm9sZCwgdG8gZW5hYmxlIGNhY2hpbmdcbiAgICB0aGlzLmdldEZvbGRXaWRnZXQgPSBmdW5jdGlvbihzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdykge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICB2YXIgaW5kZW50ID0gbGluZS5zZWFyY2goL1xcUy8pO1xuICAgICAgICB2YXIgbmV4dCA9IHNlc3Npb24uZ2V0TGluZShyb3cgKyAxKTtcbiAgICAgICAgdmFyIHByZXYgPSBzZXNzaW9uLmdldExpbmUocm93IC0gMSk7XG4gICAgICAgIHZhciBwcmV2SW5kZW50ID0gcHJldi5zZWFyY2goL1xcUy8pO1xuICAgICAgICB2YXIgbmV4dEluZGVudCA9IG5leHQuc2VhcmNoKC9cXFMvKTtcblxuICAgICAgICBpZiAoaW5kZW50ID09IC0xKSB7XG4gICAgICAgICAgICBzZXNzaW9uLmZvbGRXaWRnZXRzW3JvdyAtIDFdID0gcHJldkluZGVudCE9IC0xICYmIHByZXZJbmRlbnQgPCBuZXh0SW5kZW50ID8gXCJzdGFydFwiIDogXCJcIjtcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZG9jdW1lbnRhdGlvbiBjb21tZW50c1xuICAgICAgICBpZiAocHJldkluZGVudCA9PSAtMSkge1xuICAgICAgICAgICAgaWYgKGluZGVudCA9PSBuZXh0SW5kZW50ICYmIGxpbmVbaW5kZW50XSA9PSBcIiNcIiAmJiBuZXh0W2luZGVudF0gPT0gXCIjXCIpIHtcbiAgICAgICAgICAgICAgICBzZXNzaW9uLmZvbGRXaWRnZXRzW3JvdyAtIDFdID0gXCJcIjtcbiAgICAgICAgICAgICAgICBzZXNzaW9uLmZvbGRXaWRnZXRzW3JvdyArIDFdID0gXCJcIjtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJzdGFydFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHByZXZJbmRlbnQgPT0gaW5kZW50ICYmIGxpbmVbaW5kZW50XSA9PSBcIiNcIiAmJiBwcmV2W2luZGVudF0gPT0gXCIjXCIpIHtcbiAgICAgICAgICAgIGlmIChzZXNzaW9uLmdldExpbmUocm93IC0gMikuc2VhcmNoKC9cXFMvKSA9PSAtMSkge1xuICAgICAgICAgICAgICAgIHNlc3Npb24uZm9sZFdpZGdldHNbcm93IC0gMV0gPSBcInN0YXJ0XCI7XG4gICAgICAgICAgICAgICAgc2Vzc2lvbi5mb2xkV2lkZ2V0c1tyb3cgKyAxXSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJldkluZGVudCE9IC0xICYmIHByZXZJbmRlbnQgPCBpbmRlbnQpXG4gICAgICAgICAgICBzZXNzaW9uLmZvbGRXaWRnZXRzW3JvdyAtIDFdID0gXCJzdGFydFwiO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBzZXNzaW9uLmZvbGRXaWRnZXRzW3JvdyAtIDFdID0gXCJcIjtcblxuICAgICAgICBpZiAoaW5kZW50IDwgbmV4dEluZGVudClcbiAgICAgICAgICAgIHJldHVybiBcInN0YXJ0XCI7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgIH07XG5cbn0pLmNhbGwoRm9sZE1vZGUucHJvdG90eXBlKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uLy4uL2xpYi9vb3BcIik7XG52YXIgQ29mZmVlRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9jb2ZmZWVcIikuRm9sZE1vZGU7XG52YXIgUmFuZ2UgPSByZXF1aXJlKFwiLi4vLi4vcmFuZ2VcIikuUmFuZ2U7XG5cbnZhciBGb2xkTW9kZSA9IGV4cG9ydHMuRm9sZE1vZGUgPSBmdW5jdGlvbigpIHt9O1xub29wLmluaGVyaXRzKEZvbGRNb2RlLCBDb2ZmZWVGb2xkTW9kZSk7XG5cbihmdW5jdGlvbigpIHtcbiAgICB0aGlzLmdldEZvbGRXaWRnZXRSYW5nZSA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KSB7XG4gICAgICAgIHZhciByZSA9IC9cXFMvO1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICB2YXIgc3RhcnRMZXZlbCA9IGxpbmUuc2VhcmNoKHJlKTtcbiAgICAgICAgdmFyIGlzQ29tbWVudEZvbGQgPSBsaW5lW3N0YXJ0TGV2ZWxdID09PSBcIiNcIjtcbiAgICAgICAgdmFyIGlzRGFzaEZvbGQgPSBsaW5lW3N0YXJ0TGV2ZWxdID09PSBcIi1cIjtcbiAgICAgICAgXG4gICAgICAgIGlmIChzdGFydExldmVsID09IC0xKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHZhciBzdGFydENvbHVtbiA9IGxpbmUubGVuZ3RoO1xuICAgICAgICB2YXIgbWF4Um93ID0gc2Vzc2lvbi5nZXRMZW5ndGgoKTtcbiAgICAgICAgdmFyIHN0YXJ0Um93ID0gcm93O1xuICAgICAgICB2YXIgZW5kUm93ID0gcm93O1xuXG4gICAgICAgIC8vIENvbW1lbnQgZm9sZGluZ1xuICAgICAgICBpZiAoaXNDb21tZW50Rm9sZCkge1xuICAgICAgICAgICAgdmFyIHJhbmdlID0gdGhpcy5jb21tZW50QmxvY2soc2Vzc2lvbiwgcm93KTtcbiAgICAgICAgICAgIGlmIChyYW5nZSlcbiAgICAgICAgICAgICAgICByZXR1cm4gcmFuZ2U7XG4gICAgICAgIC8vIEluZGVudGF0aW9uIGZvbGRpbmcgKHVzZWQgZm9yIGluZGVudGF0aW9ucyB0aGF0IHN0YXJ0IHdpdGggYSAnLScpLlxuICAgICAgICB9IGVsc2UgaWYgKGlzRGFzaEZvbGQpIHtcbiAgICAgICAgICAgIHZhciByYW5nZSA9IHRoaXMuaW5kZW50YXRpb25CbG9jayhzZXNzaW9uLCByb3cpO1xuICAgICAgICAgICAgaWYgKHJhbmdlKVxuICAgICAgICAgICAgICAgIHJldHVybiByYW5nZTtcbiAgICAgICAgLy8gTGlzdCBmb2xkaW5nICh1c2VkIGZvciBpbmRlbnRhdGlvbnMgdGhhdCBkb24ndCBzdGFydCB3aXRoIGEgJy0nKS4uXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3aGlsZSAoKytyb3cgPCBtYXhSb3cpIHtcbiAgICAgICAgICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICAgICAgICAgIHZhciBsZXZlbCA9IGxpbmUuc2VhcmNoKHJlKTtcblxuICAgICAgICAgICAgICAgIGlmIChsZXZlbCA9PSAtMSlcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgICAgICAgICBpZiAobGV2ZWwgPD0gc3RhcnRMZXZlbCAmJiBsaW5lW3N0YXJ0TGV2ZWxdICE9PSAnLScpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRva2VuID0gc2Vzc2lvbi5nZXRUb2tlbkF0KHJvdywgMCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdG9rZW4gfHwgdG9rZW4udHlwZSAhPT0gXCJzdHJpbmdcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGVuZFJvdyA9IHJvdztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbmRSb3cgPiBzdGFydFJvdykge1xuICAgICAgICAgICAgdmFyIGVuZENvbHVtbiA9IHNlc3Npb24uZ2V0TGluZShlbmRSb3cpLmxlbmd0aDtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmFuZ2Uoc3RhcnRSb3csIHN0YXJ0Q29sdW1uLCBlbmRSb3csIGVuZENvbHVtbik7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gbXVzdCByZXR1cm4gXCJcIiBpZiB0aGVyZSdzIG5vIGZvbGQsIHRvIGVuYWJsZSBjYWNoaW5nXG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0ID0gZnVuY3Rpb24oc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgdmFyIGluZGVudCA9IGxpbmUuc2VhcmNoKC9cXFMvKTtcbiAgICAgICAgdmFyIG5leHQgPSBzZXNzaW9uLmdldExpbmUocm93ICsgMSk7XG4gICAgICAgIHZhciBwcmV2ID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyAtIDEpO1xuICAgICAgICB2YXIgcHJldkluZGVudCA9IHByZXYuc2VhcmNoKC9cXFMvKTtcbiAgICAgICAgdmFyIG5leHRJbmRlbnQgPSBuZXh0LnNlYXJjaCgvXFxTLyk7XG5cbiAgICAgICAgdmFyIGxpbmVTdGFydHNXaXRoRGFzaCA9IGxpbmVbaW5kZW50XSA9PT0gJy0nO1xuXG4gICAgICAgIGlmIChpbmRlbnQgPT0gLTEpIHtcbiAgICAgICAgICAgIHNlc3Npb24uZm9sZFdpZGdldHNbcm93IC0gMV0gPSBwcmV2SW5kZW50IT0gLTEgJiYgcHJldkluZGVudCA8IG5leHRJbmRlbnQgPyBcInN0YXJ0XCIgOiBcIlwiO1xuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBkb2N1bWVudGF0aW9uIGNvbW1lbnRzXG4gICAgICAgIGlmIChwcmV2SW5kZW50ID09IC0xKSB7XG4gICAgICAgICAgICBpZiAoaW5kZW50ID09IG5leHRJbmRlbnQgJiYgbGluZVtpbmRlbnRdID09IFwiI1wiICYmIG5leHRbaW5kZW50XSA9PSBcIiNcIikge1xuICAgICAgICAgICAgICAgIHNlc3Npb24uZm9sZFdpZGdldHNbcm93IC0gMV0gPSBcIlwiO1xuICAgICAgICAgICAgICAgIHNlc3Npb24uZm9sZFdpZGdldHNbcm93ICsgMV0gPSBcIlwiO1xuICAgICAgICAgICAgICAgIHJldHVybiBcInN0YXJ0XCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAocHJldkluZGVudCA9PSBpbmRlbnQgJiYgbGluZVtpbmRlbnRdID09IFwiI1wiICYmIHByZXZbaW5kZW50XSA9PSBcIiNcIikge1xuICAgICAgICAgICAgaWYgKHNlc3Npb24uZ2V0TGluZShyb3cgLSAyKS5zZWFyY2goL1xcUy8pID09IC0xKSB7XG4gICAgICAgICAgICAgICAgc2Vzc2lvbi5mb2xkV2lkZ2V0c1tyb3cgLSAxXSA9IFwic3RhcnRcIjtcbiAgICAgICAgICAgICAgICBzZXNzaW9uLmZvbGRXaWRnZXRzW3JvdyArIDFdID0gXCJcIjtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEluZGVudGF0aW9uIGZvbGRcbiAgICAgICAgaWYgKHByZXZJbmRlbnQhPSAtMSAmJiBwcmV2SW5kZW50IDwgaW5kZW50KSB7XG4gICAgICAgICAgICBzZXNzaW9uLmZvbGRXaWRnZXRzW3JvdyAtIDFdID0gXCJzdGFydFwiO1xuICAgICAgICAvLyBGb2xkIG5vbi1pbmRlbnRlZCBsaXN0XG4gICAgICAgIH0gZWxzZSBpZiAocHJldkluZGVudCE9IC0xICYmICAocHJldkluZGVudCA9PSBpbmRlbnQgJiYgbGluZVN0YXJ0c1dpdGhEYXNoKSkge1xuICAgICAgICAgICAgc2Vzc2lvbi5mb2xkV2lkZ2V0c1tyb3cgLSAxXSA9IFwic3RhcnRcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlc3Npb24uZm9sZFdpZGdldHNbcm93IC0gMV0gPSBcIlwiO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGluZGVudCA8IG5leHRJbmRlbnQpXG4gICAgICAgICAgICByZXR1cm4gXCJzdGFydFwiO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICB9O1xuXG59KS5jYWxsKEZvbGRNb2RlLnByb3RvdHlwZSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIFJhbmdlID0gcmVxdWlyZShcIi4uL3JhbmdlXCIpLlJhbmdlO1xuXG52YXIgTWF0Y2hpbmdCcmFjZU91dGRlbnQgPSBmdW5jdGlvbigpIHt9O1xuXG4oZnVuY3Rpb24oKSB7XG5cbiAgICB0aGlzLmNoZWNrT3V0ZGVudCA9IGZ1bmN0aW9uKGxpbmUsIGlucHV0KSB7XG4gICAgICAgIGlmICghIC9eXFxzKyQvLnRlc3QobGluZSkpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgcmV0dXJuIC9eXFxzKlxcfS8udGVzdChpbnB1dCk7XG4gICAgfTtcblxuICAgIHRoaXMuYXV0b091dGRlbnQgPSBmdW5jdGlvbihkb2MsIHJvdykge1xuICAgICAgICB2YXIgbGluZSA9IGRvYy5nZXRMaW5lKHJvdyk7XG4gICAgICAgIHZhciBtYXRjaCA9IGxpbmUubWF0Y2goL14oXFxzKlxcfSkvKTtcblxuICAgICAgICBpZiAoIW1hdGNoKSByZXR1cm4gMDtcblxuICAgICAgICB2YXIgY29sdW1uID0gbWF0Y2hbMV0ubGVuZ3RoO1xuICAgICAgICB2YXIgb3BlbkJyYWNlUG9zID0gZG9jLmZpbmRNYXRjaGluZ0JyYWNrZXQoe3Jvdzogcm93LCBjb2x1bW46IGNvbHVtbn0pO1xuXG4gICAgICAgIGlmICghb3BlbkJyYWNlUG9zIHx8IG9wZW5CcmFjZVBvcy5yb3cgPT0gcm93KSByZXR1cm4gMDtcblxuICAgICAgICB2YXIgaW5kZW50ID0gdGhpcy4kZ2V0SW5kZW50KGRvYy5nZXRMaW5lKG9wZW5CcmFjZVBvcy5yb3cpKTtcbiAgICAgICAgZG9jLnJlcGxhY2UobmV3IFJhbmdlKHJvdywgMCwgcm93LCBjb2x1bW4tMSksIGluZGVudCk7XG4gICAgfTtcblxuICAgIHRoaXMuJGdldEluZGVudCA9IGZ1bmN0aW9uKGxpbmUpIHtcbiAgICAgICAgcmV0dXJuIGxpbmUubWF0Y2goL15cXHMqLylbMF07XG4gICAgfTtcblxufSkuY2FsbChNYXRjaGluZ0JyYWNlT3V0ZGVudC5wcm90b3R5cGUpO1xuXG5leHBvcnRzLk1hdGNoaW5nQnJhY2VPdXRkZW50ID0gTWF0Y2hpbmdCcmFjZU91dGRlbnQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRNb2RlID0gcmVxdWlyZShcIi4vdGV4dFwiKS5Nb2RlO1xudmFyIFlhbWxIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3lhbWxfaGlnaGxpZ2h0X3J1bGVzXCIpLllhbWxIaWdobGlnaHRSdWxlcztcbnZhciBNYXRjaGluZ0JyYWNlT3V0ZGVudCA9IHJlcXVpcmUoXCIuL21hdGNoaW5nX2JyYWNlX291dGRlbnRcIikuTWF0Y2hpbmdCcmFjZU91dGRlbnQ7XG52YXIgRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9mb2xkaW5nL3lhbWxcIikuRm9sZE1vZGU7XG52YXIgV29ya2VyQ2xpZW50ID0gcmVxdWlyZShcIi4uL3dvcmtlci93b3JrZXJfY2xpZW50XCIpLldvcmtlckNsaWVudDtcblxudmFyIE1vZGUgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLkhpZ2hsaWdodFJ1bGVzID0gWWFtbEhpZ2hsaWdodFJ1bGVzO1xuICAgIHRoaXMuJG91dGRlbnQgPSBuZXcgTWF0Y2hpbmdCcmFjZU91dGRlbnQoKTtcbiAgICB0aGlzLmZvbGRpbmdSdWxlcyA9IG5ldyBGb2xkTW9kZSgpO1xuICAgIHRoaXMuJGJlaGF2aW91ciA9IHRoaXMuJGRlZmF1bHRCZWhhdmlvdXI7XG59O1xub29wLmluaGVyaXRzKE1vZGUsIFRleHRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5saW5lQ29tbWVudFN0YXJ0ID0gW1wiI1wiXTtcbiAgICBcbiAgICB0aGlzLmdldE5leHRMaW5lSW5kZW50ID0gZnVuY3Rpb24oc3RhdGUsIGxpbmUsIHRhYikge1xuICAgICAgICB2YXIgaW5kZW50ID0gdGhpcy4kZ2V0SW5kZW50KGxpbmUpO1xuXG4gICAgICAgIGlmIChzdGF0ZSA9PSBcInN0YXJ0XCIpIHtcbiAgICAgICAgICAgIHZhciBtYXRjaCA9IGxpbmUubWF0Y2goL14uKltcXHtcXChcXFtdXFxzKiQvKTtcbiAgICAgICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgICAgIGluZGVudCArPSB0YWI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW5kZW50O1xuICAgIH07XG5cbiAgICB0aGlzLmNoZWNrT3V0ZGVudCA9IGZ1bmN0aW9uKHN0YXRlLCBsaW5lLCBpbnB1dCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kb3V0ZGVudC5jaGVja091dGRlbnQobGluZSwgaW5wdXQpO1xuICAgIH07XG5cbiAgICB0aGlzLmF1dG9PdXRkZW50ID0gZnVuY3Rpb24oc3RhdGUsIGRvYywgcm93KSB7XG4gICAgICAgIHRoaXMuJG91dGRlbnQuYXV0b091dGRlbnQoZG9jLCByb3cpO1xuICAgIH07XG5cbiAgICB0aGlzLmNyZWF0ZVdvcmtlciA9IGZ1bmN0aW9uKHNlc3Npb24pIHtcbiAgICAgICAgdmFyIHdvcmtlciA9IG5ldyBXb3JrZXJDbGllbnQoW1wiYWNlXCJdLCBcImFjZS9tb2RlL3lhbWxfd29ya2VyXCIsIFwiWWFtbFdvcmtlclwiKTtcbiAgICAgICAgd29ya2VyLmF0dGFjaFRvRG9jdW1lbnQoc2Vzc2lvbi5nZXREb2N1bWVudCgpKTtcblxuICAgICAgICB3b3JrZXIub24oXCJhbm5vdGF0ZVwiLCBmdW5jdGlvbihyZXN1bHRzKSB7XG4gICAgICAgICAgICBzZXNzaW9uLnNldEFubm90YXRpb25zKHJlc3VsdHMuZGF0YSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHdvcmtlci5vbihcInRlcm1pbmF0ZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNlc3Npb24uY2xlYXJBbm5vdGF0aW9ucygpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gd29ya2VyO1xuICAgIH07XG5cblxuICAgIHRoaXMuJGlkID0gXCJhY2UvbW9kZS95YW1sXCI7XG59KS5jYWxsKE1vZGUucHJvdG90eXBlKTtcblxuZXhwb3J0cy5Nb2RlID0gTW9kZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xuXG52YXIgWWFtbEhpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24oKSB7XG5cbiAgICAvLyByZWdleHAgbXVzdCBub3QgaGF2ZSBjYXB0dXJpbmcgcGFyZW50aGVzZXMuIFVzZSAoPzopIGluc3RlYWQuXG4gICAgLy8gcmVnZXhwcyBhcmUgb3JkZXJlZCAtPiB0aGUgZmlyc3QgbWF0Y2ggaXMgdXNlZFxuICAgIHRoaXMuJHJ1bGVzID0ge1xuICAgICAgICBcInN0YXJ0XCIgOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiIy4qJFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImxpc3QubWFya3VwXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvXig/Oi17M318XFwuezN9KVxccyooPz0jfCQpL1xuICAgICAgICAgICAgfSwgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwibGlzdC5tYXJrdXBcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC9eXFxzKltcXC0/XSg/OiR8XFxzKS9cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIiEhW1xcXFx3Ly9dK1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQubGFuZ3VhZ2VcIixcbiAgICAgICAgICAgICAgICByZWdleDogXCJbJlxcXFwqXVthLXpBLVowLTktX10rXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogW1wibWV0YS50YWdcIiwgXCJrZXl3b3JkXCJdLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvXihcXHMqXFx3W15cXHM6XSo/KSg6KD89XFxzfCQpKS9cbiAgICAgICAgICAgIH0se1xuICAgICAgICAgICAgICAgIHRva2VuOiBbXCJtZXRhLnRhZ1wiLCBcImtleXdvcmRcIl0sXG4gICAgICAgICAgICAgICAgcmVnZXg6IC8oXFx3W15cXHM6XSo/KShcXHMqOig/PVxcc3wkKSkvXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImtleXdvcmQub3BlcmF0b3JcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiPDxcXFxcdyo6XFxcXHcqXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwia2V5d29yZC5vcGVyYXRvclwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCItXFxcXHMqKD89W3tdKVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLCAvLyBzaW5nbGUgbGluZVxuICAgICAgICAgICAgICAgIHJlZ2V4IDogJ1tcIl0oPzooPzpcXFxcXFxcXC4pfCg/OlteXCJcXFxcXFxcXF0pKSo/W1wiXSdcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsIC8vIG11bHRpIGxpbmUgc3RyaW5nIHN0YXJ0XG4gICAgICAgICAgICAgICAgcmVnZXggOiAvW3w+XVstK1xcZF0qKD86JHxcXHMrKD86JHwjKSkvLFxuICAgICAgICAgICAgICAgIG9uTWF0Y2g6IGZ1bmN0aW9uKHZhbCwgc3RhdGUsIHN0YWNrLCBsaW5lKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpbmUgPSBsaW5lLnJlcGxhY2UoLyAjLiovLCBcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluZGVudCA9IC9eICooKDpcXHMqKT8tKFxccypbXnw+XSk/KT8vLmV4ZWMobGluZSlbMF1cbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXFNcXHMqJC8sIFwiXCIpLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluZGVudGF0aW9uSW5kaWNhdG9yID0gcGFyc2VJbnQoL1xcZCtbXFxzKy1dKiQvLmV4ZWMobGluZSkpO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZGVudGF0aW9uSW5kaWNhdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRlbnQgKz0gaW5kZW50YXRpb25JbmRpY2F0b3IgLSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0ID0gXCJtbFN0cmluZ1wiO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0ID0gXCJtbFN0cmluZ1ByZVwiO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICghc3RhY2subGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFjay5wdXNoKHRoaXMubmV4dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFjay5wdXNoKGluZGVudCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFja1swXSA9IHRoaXMubmV4dDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YWNrWzFdID0gaW5kZW50O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRva2VuO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbmV4dCA6IFwibWxTdHJpbmdcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIiwgLy8gc2luZ2xlIHF1b3RlZCBzdHJpbmdcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiWyddKD86KD86XFxcXFxcXFwuKXwoPzpbXidcXFxcXFxcXF0pKSo/WyddXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLCAvLyBmbG9hdFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogLyhcXGJ8WytcXC1cXC5dKVtcXGRfXSsoPzooPzpcXC5bXFxkX10qKT8oPzpbZUVdWytcXC1dP1tcXGRfXSspPykoPz1bXlxcZC1cXHddfCQpJC9cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLCAvLyBvdGhlciBudW1iZXJcbiAgICAgICAgICAgICAgICByZWdleCA6IC9bK1xcLV0/XFwuaW5mXFxifE5hTlxcYnwweFtcXGRBLUZhLWZfXSt8MGJbMTBfXSsvXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lmxhbmd1YWdlLmJvb2xlYW5cIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXGIoPzp0cnVlfGZhbHNlfFRSVUV8RkFMU0V8VHJ1ZXxGYWxzZXx5ZXN8bm8pXFxcXGJcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJwYXJlbi5scGFyZW5cIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiW1soe11cIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJwYXJlbi5ycGFyZW5cIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiW1xcXFxdKX1dXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogL1teXFxzLDpcXFtcXF1cXHtcXH1dKy9cbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgXCJtbFN0cmluZ1ByZVwiIDogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJpbmRlbnRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC9eICokL1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJpbmRlbnRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC9eICovLFxuICAgICAgICAgICAgICAgIG9uTWF0Y2g6IGZ1bmN0aW9uKHZhbCwgc3RhdGUsIHN0YWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjdXJJbmRlbnQgPSBzdGFja1sxXTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoY3VySW5kZW50ID49IHZhbC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dCA9IFwic3RhcnRcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YWNrLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFjay5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhY2tbMV0gPSB2YWwubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dCA9IHN0YWNrWzBdID0gXCJtbFN0cmluZ1wiO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRva2VuO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgbmV4dCA6IFwibWxTdHJpbmdcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbiA6IFwic3RyaW5nXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgXCJtbFN0cmluZ1wiIDogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJpbmRlbnRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC9eICokL1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJpbmRlbnRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC9eICovLFxuICAgICAgICAgICAgICAgIG9uTWF0Y2g6IGZ1bmN0aW9uKHZhbCwgc3RhdGUsIHN0YWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjdXJJbmRlbnQgPSBzdGFja1sxXTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoY3VySW5kZW50ID49IHZhbC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dCA9IFwic3RhcnRcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YWNrLnNwbGljZSgwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dCA9IFwibWxTdHJpbmdcIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50b2tlbjtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG5leHQgOiBcIm1sU3RyaW5nXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAnLisnXG4gICAgICAgICAgICB9XG4gICAgICAgIF19O1xuICAgIHRoaXMubm9ybWFsaXplUnVsZXMoKTtcblxufTtcblxub29wLmluaGVyaXRzKFlhbWxIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuZXhwb3J0cy5ZYW1sSGlnaGxpZ2h0UnVsZXMgPSBZYW1sSGlnaGxpZ2h0UnVsZXM7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=