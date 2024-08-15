"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[6679],{

/***/ 66679:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var C9SearchHighlightRules = (__webpack_require__(37220)/* .C9SearchHighlightRules */ .c);
var MatchingBraceOutdent = (__webpack_require__(28670).MatchingBraceOutdent);
var C9StyleFoldMode = (__webpack_require__(56749)/* .FoldMode */ .l);

var Mode = function() {
    this.HighlightRules = C9SearchHighlightRules;
    this.$outdent = new MatchingBraceOutdent();
    this.foldingRules = new C9StyleFoldMode();
};
oop.inherits(Mode, TextMode);

(function() {
    
    this.getNextLineIndent = function(state, line, tab) {
        var indent = this.$getIndent(line);
        return indent;
    };

    this.checkOutdent = function(state, line, input) {
        return this.$outdent.checkOutdent(line, input);
    };

    this.autoOutdent = function(state, doc, row) {
        this.$outdent.autoOutdent(doc, row);
    };

    this.$id = "ace/mode/c9search";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 37220:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var lang = __webpack_require__(39955);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

function safeCreateRegexp(source, flag) {
    try {
        return new RegExp(source, flag);
    } catch(e) {}
}

var C9SearchHighlightRules = function() {

    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used
    this.$rules = {
        "start" : [
            {
                tokenNames : ["c9searchresults.constant.numeric", "c9searchresults.text", "c9searchresults.text", "c9searchresults.keyword"],
                regex : /(^\s+[0-9]+)(:)(\d*\s?)([^\r\n]+)/,
                onMatch : function(val, state, stack) {
                    var values = this.splitRegex.exec(val);
                    var types = this.tokenNames;
                    var tokens = [{
                        type: types[0],
                        value: values[1]
                    }, {
                        type: types[1],
                        value: values[2]
                    }];
                    
                    if (values[3]) {
                        if (values[3] == " ")
                            tokens[1] = { type: types[1], value: values[2] + " " };
                        else
                            tokens.push({ type: types[1], value: values[3] });
                    }
                    var regex = stack[1];
                    var str = values[4];
                    
                    var m;
                    var last = 0;
                    if (regex && regex.exec) {
                        regex.lastIndex = 0;
                        while (m = regex.exec(str)) {
                            var skipped = str.substring(last, m.index);
                            last = regex.lastIndex;
                            if (skipped)
                                tokens.push({type: types[2], value: skipped});
                            if (m[0])
                                tokens.push({type: types[3], value: m[0]});
                            else if (!skipped)
                                break;
                        }
                    }
                    if (last < str.length)
                        tokens.push({type: types[2], value: str.substr(last)});
                    return tokens;
                }
            },
            {
                regex : "^Searching for [^\\r\\n]*$",
                onMatch: function(val, state, stack) {
                    var parts = val.split("\x01");
                    if (parts.length < 3)
                        return "text";

                    var options, search;
                    
                    var i = 0;
                    var tokens = [{
                        value: parts[i++] + "'",
                        type: "text"
                    }, {
                        value: search = parts[i++],
                        type: "text" // "c9searchresults.keyword"
                    }, {
                        value: "'" + parts[i++],
                        type: "text"
                    }];
                    
                    // replaced
                    if (parts[2] !== " in") {
                        tokens.push({
                            value: "'" + parts[i++] + "'",
                            type: "text"
                        }, {
                            value: parts[i++],
                            type: "text"
                        });
                    }
                    // path
                    tokens.push({
                        value: " " + parts[i++] + " ",
                        type: "text"
                    });
                    // options
                    if (parts[i+1]) {
                        options = parts[i+1];
                        tokens.push({
                            value: "(" + parts[i+1] + ")",
                            type: "text"
                        });
                        i += 1;
                    } else {
                        i -= 1;
                    }
                    while (i++ < parts.length) {
                        parts[i] && tokens.push({
                            value: parts[i],
                            type: "text"
                        });
                    }
                    
                    if (search) {
                        if (!/regex/.test(options))
                            search = lang.escapeRegExp(search);
                        if (/whole/.test(options))
                            search = "\\b" + search + "\\b";
                    }
                    
                    var regex = search && safeCreateRegexp(
                        "(" + search + ")",
                        / sensitive/.test(options) ? "g" : "ig"
                    );
                    if (regex) {
                        stack[0] = state;
                        stack[1] = regex;
                    }
                    
                    return tokens;
                }
            },
            {
                regex : "^(?=Found \\d+ matches)",
                token : "text",
                next : "numbers"
            },
            {
                token : "string", // single line
                regex : "^\\S:?[^:]+",
                next : "numbers"
            }
        ],
        numbers:[{
            regex : "\\d+",
            token : "constant.numeric"
        }, {
            regex : "$",
            token : "text",
            next : "start"
        }]
    };
    this.normalizeRules();
};

oop.inherits(C9SearchHighlightRules, TextHighlightRules);

exports.c = C9SearchHighlightRules;


/***/ }),

/***/ 56749:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var Range = (__webpack_require__(91902)/* .Range */ .Q);
var BaseFoldMode = (__webpack_require__(51358).FoldMode);

var FoldMode = exports.l = function() {};
oop.inherits(FoldMode, BaseFoldMode);

(function() {

    this.foldingStartMarker = /^(\S.*:|Searching for.*)$/;
    this.foldingStopMarker = /^(\s+|Found.*)$/;
    
    this.getFoldWidgetRange = function(session, foldStyle, row) {
        var lines = session.doc.getAllLines(row);
        var line = lines[row];
        var level1 = /^(Found.*|Searching for.*)$/;
        var level2 = /^(\S.*:|\s*)$/;
        var re = level1.test(line) ? level1 : level2;
        
        var startRow = row;
        var endRow = row;

        if (this.foldingStartMarker.test(line)) {
            for (var i = row + 1, l = session.getLength(); i < l; i++) {
                if (re.test(lines[i]))
                    break;
            }
            endRow = i;
        }
        else if (this.foldingStopMarker.test(line)) {
            for (var i = row - 1; i >= 0; i--) {
                line = lines[i];
                if (re.test(line))
                    break;
            }
            startRow = i;
        }
        if (startRow != endRow) {
            var col = line.length;
            if (re === level1)
                col = line.search(/\(Found[^)]+\)$|$/);
            return new Range(startRow, col, endRow, 0);
        }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUE7QUFDQTtBQUNBOztBQUVBLENBQUM7O0FBRUQsNEJBQTRCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9jOXNlYXJjaC5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2M5c2VhcmNoX2hpZ2hsaWdodF9ydWxlcy5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2ZvbGRpbmcvYzlzZWFyY2guanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9tYXRjaGluZ19icmFjZV9vdXRkZW50LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dE1vZGUgPSByZXF1aXJlKFwiLi90ZXh0XCIpLk1vZGU7XG52YXIgQzlTZWFyY2hIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL2M5c2VhcmNoX2hpZ2hsaWdodF9ydWxlc1wiKS5DOVNlYXJjaEhpZ2hsaWdodFJ1bGVzO1xudmFyIE1hdGNoaW5nQnJhY2VPdXRkZW50ID0gcmVxdWlyZShcIi4vbWF0Y2hpbmdfYnJhY2Vfb3V0ZGVudFwiKS5NYXRjaGluZ0JyYWNlT3V0ZGVudDtcbnZhciBDOVN0eWxlRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9mb2xkaW5nL2M5c2VhcmNoXCIpLkZvbGRNb2RlO1xuXG52YXIgTW9kZSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuSGlnaGxpZ2h0UnVsZXMgPSBDOVNlYXJjaEhpZ2hsaWdodFJ1bGVzO1xuICAgIHRoaXMuJG91dGRlbnQgPSBuZXcgTWF0Y2hpbmdCcmFjZU91dGRlbnQoKTtcbiAgICB0aGlzLmZvbGRpbmdSdWxlcyA9IG5ldyBDOVN0eWxlRm9sZE1vZGUoKTtcbn07XG5vb3AuaW5oZXJpdHMoTW9kZSwgVGV4dE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgXG4gICAgdGhpcy5nZXROZXh0TGluZUluZGVudCA9IGZ1bmN0aW9uKHN0YXRlLCBsaW5lLCB0YWIpIHtcbiAgICAgICAgdmFyIGluZGVudCA9IHRoaXMuJGdldEluZGVudChsaW5lKTtcbiAgICAgICAgcmV0dXJuIGluZGVudDtcbiAgICB9O1xuXG4gICAgdGhpcy5jaGVja091dGRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgbGluZSwgaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJG91dGRlbnQuY2hlY2tPdXRkZW50KGxpbmUsIGlucHV0KTtcbiAgICB9O1xuXG4gICAgdGhpcy5hdXRvT3V0ZGVudCA9IGZ1bmN0aW9uKHN0YXRlLCBkb2MsIHJvdykge1xuICAgICAgICB0aGlzLiRvdXRkZW50LmF1dG9PdXRkZW50KGRvYywgcm93KTtcbiAgICB9O1xuXG4gICAgdGhpcy4kaWQgPSBcImFjZS9tb2RlL2M5c2VhcmNoXCI7XG59KS5jYWxsKE1vZGUucHJvdG90eXBlKTtcblxuZXhwb3J0cy5Nb2RlID0gTW9kZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgbGFuZyA9IHJlcXVpcmUoXCIuLi9saWIvbGFuZ1wiKTtcbnZhciBUZXh0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90ZXh0X2hpZ2hsaWdodF9ydWxlc1wiKS5UZXh0SGlnaGxpZ2h0UnVsZXM7XG5cbmZ1bmN0aW9uIHNhZmVDcmVhdGVSZWdleHAoc291cmNlLCBmbGFnKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIG5ldyBSZWdFeHAoc291cmNlLCBmbGFnKTtcbiAgICB9IGNhdGNoKGUpIHt9XG59XG5cbnZhciBDOVNlYXJjaEhpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24oKSB7XG5cbiAgICAvLyByZWdleHAgbXVzdCBub3QgaGF2ZSBjYXB0dXJpbmcgcGFyZW50aGVzZXMuIFVzZSAoPzopIGluc3RlYWQuXG4gICAgLy8gcmVnZXhwcyBhcmUgb3JkZXJlZCAtPiB0aGUgZmlyc3QgbWF0Y2ggaXMgdXNlZFxuICAgIHRoaXMuJHJ1bGVzID0ge1xuICAgICAgICBcInN0YXJ0XCIgOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW5OYW1lcyA6IFtcImM5c2VhcmNocmVzdWx0cy5jb25zdGFudC5udW1lcmljXCIsIFwiYzlzZWFyY2hyZXN1bHRzLnRleHRcIiwgXCJjOXNlYXJjaHJlc3VsdHMudGV4dFwiLCBcImM5c2VhcmNocmVzdWx0cy5rZXl3b3JkXCJdLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogLyheXFxzK1swLTldKykoOikoXFxkKlxccz8pKFteXFxyXFxuXSspLyxcbiAgICAgICAgICAgICAgICBvbk1hdGNoIDogZnVuY3Rpb24odmFsLCBzdGF0ZSwgc3RhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlcyA9IHRoaXMuc3BsaXRSZWdleC5leGVjKHZhbCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0eXBlcyA9IHRoaXMudG9rZW5OYW1lcztcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRva2VucyA9IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiB0eXBlc1swXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZXNbMV1cbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogdHlwZXNbMV0sXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWVzWzJdXG4gICAgICAgICAgICAgICAgICAgIH1dO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlc1szXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlc1szXSA9PSBcIiBcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2tlbnNbMV0gPSB7IHR5cGU6IHR5cGVzWzFdLCB2YWx1ZTogdmFsdWVzWzJdICsgXCIgXCIgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2tlbnMucHVzaCh7IHR5cGU6IHR5cGVzWzFdLCB2YWx1ZTogdmFsdWVzWzNdIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHZhciByZWdleCA9IHN0YWNrWzFdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3RyID0gdmFsdWVzWzRdO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgdmFyIG07XG4gICAgICAgICAgICAgICAgICAgIHZhciBsYXN0ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlZ2V4ICYmIHJlZ2V4LmV4ZWMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4Lmxhc3RJbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAobSA9IHJlZ2V4LmV4ZWMoc3RyKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBza2lwcGVkID0gc3RyLnN1YnN0cmluZyhsYXN0LCBtLmluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0ID0gcmVnZXgubGFzdEluZGV4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChza2lwcGVkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2tlbnMucHVzaCh7dHlwZTogdHlwZXNbMl0sIHZhbHVlOiBza2lwcGVkfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG1bMF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRva2Vucy5wdXNoKHt0eXBlOiB0eXBlc1szXSwgdmFsdWU6IG1bMF19KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICghc2tpcHBlZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3QgPCBzdHIubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW5zLnB1c2goe3R5cGU6IHR5cGVzWzJdLCB2YWx1ZTogc3RyLnN1YnN0cihsYXN0KX0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW5zO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIl5TZWFyY2hpbmcgZm9yIFteXFxcXHJcXFxcbl0qJFwiLFxuICAgICAgICAgICAgICAgIG9uTWF0Y2g6IGZ1bmN0aW9uKHZhbCwgc3RhdGUsIHN0YWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXJ0cyA9IHZhbC5zcGxpdChcIlxceDAxXCIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocGFydHMubGVuZ3RoIDwgMylcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcInRleHRcIjtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgb3B0aW9ucywgc2VhcmNoO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICAgICAgICAgICAgICB2YXIgdG9rZW5zID0gW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBwYXJ0c1tpKytdICsgXCInXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInRleHRcIlxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogc2VhcmNoID0gcGFydHNbaSsrXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwidGV4dFwiIC8vIFwiYzlzZWFyY2hyZXN1bHRzLmtleXdvcmRcIlxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCInXCIgKyBwYXJ0c1tpKytdLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgfV07XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAvLyByZXBsYWNlZFxuICAgICAgICAgICAgICAgICAgICBpZiAocGFydHNbMl0gIT09IFwiIGluXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2Vucy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCInXCIgKyBwYXJ0c1tpKytdICsgXCInXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogcGFydHNbaSsrXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gcGF0aFxuICAgICAgICAgICAgICAgICAgICB0b2tlbnMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCIgXCIgKyBwYXJ0c1tpKytdICsgXCIgXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInRleHRcIlxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgLy8gb3B0aW9uc1xuICAgICAgICAgICAgICAgICAgICBpZiAocGFydHNbaSsxXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucyA9IHBhcnRzW2krMV07XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbnMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwiKFwiICsgcGFydHNbaSsxXSArIFwiKVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgLT0gMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoaSsrIDwgcGFydHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0c1tpXSAmJiB0b2tlbnMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHBhcnRzW2ldLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlYXJjaCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEvcmVnZXgvLnRlc3Qob3B0aW9ucykpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoID0gbGFuZy5lc2NhcGVSZWdFeHAoc2VhcmNoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgvd2hvbGUvLnRlc3Qob3B0aW9ucykpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoID0gXCJcXFxcYlwiICsgc2VhcmNoICsgXCJcXFxcYlwiO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVnZXggPSBzZWFyY2ggJiYgc2FmZUNyZWF0ZVJlZ2V4cChcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiKFwiICsgc2VhcmNoICsgXCIpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAvIHNlbnNpdGl2ZS8udGVzdChvcHRpb25zKSA/IFwiZ1wiIDogXCJpZ1wiXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZWdleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhY2tbMF0gPSBzdGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YWNrWzFdID0gcmVnZXg7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbnM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXig/PUZvdW5kIFxcXFxkKyBtYXRjaGVzKVwiLFxuICAgICAgICAgICAgICAgIHRva2VuIDogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgbmV4dCA6IFwibnVtYmVyc1wiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIiwgLy8gc2luZ2xlIGxpbmVcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXlxcXFxTOj9bXjpdK1wiLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcIm51bWJlcnNcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBudW1iZXJzOlt7XG4gICAgICAgICAgICByZWdleCA6IFwiXFxcXGQrXCIsXG4gICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHJlZ2V4IDogXCIkXCIsXG4gICAgICAgICAgICB0b2tlbiA6IFwidGV4dFwiLFxuICAgICAgICAgICAgbmV4dCA6IFwic3RhcnRcIlxuICAgICAgICB9XVxuICAgIH07XG4gICAgdGhpcy5ub3JtYWxpemVSdWxlcygpO1xufTtcblxub29wLmluaGVyaXRzKEM5U2VhcmNoSGlnaGxpZ2h0UnVsZXMsIFRleHRIaWdobGlnaHRSdWxlcyk7XG5cbmV4cG9ydHMuQzlTZWFyY2hIaWdobGlnaHRSdWxlcyA9IEM5U2VhcmNoSGlnaGxpZ2h0UnVsZXM7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi8uLi9saWIvb29wXCIpO1xudmFyIFJhbmdlID0gcmVxdWlyZShcIi4uLy4uL3JhbmdlXCIpLlJhbmdlO1xudmFyIEJhc2VGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRfbW9kZVwiKS5Gb2xkTW9kZTtcblxudmFyIEZvbGRNb2RlID0gZXhwb3J0cy5Gb2xkTW9kZSA9IGZ1bmN0aW9uKCkge307XG5vb3AuaW5oZXJpdHMoRm9sZE1vZGUsIEJhc2VGb2xkTW9kZSk7XG5cbihmdW5jdGlvbigpIHtcblxuICAgIHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyID0gL14oXFxTLio6fFNlYXJjaGluZyBmb3IuKikkLztcbiAgICB0aGlzLmZvbGRpbmdTdG9wTWFya2VyID0gL14oXFxzK3xGb3VuZC4qKSQvO1xuICAgIFxuICAgIHRoaXMuZ2V0Rm9sZFdpZGdldFJhbmdlID0gZnVuY3Rpb24oc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmVzID0gc2Vzc2lvbi5kb2MuZ2V0QWxsTGluZXMocm93KTtcbiAgICAgICAgdmFyIGxpbmUgPSBsaW5lc1tyb3ddO1xuICAgICAgICB2YXIgbGV2ZWwxID0gL14oRm91bmQuKnxTZWFyY2hpbmcgZm9yLiopJC87XG4gICAgICAgIHZhciBsZXZlbDIgPSAvXihcXFMuKjp8XFxzKikkLztcbiAgICAgICAgdmFyIHJlID0gbGV2ZWwxLnRlc3QobGluZSkgPyBsZXZlbDEgOiBsZXZlbDI7XG4gICAgICAgIFxuICAgICAgICB2YXIgc3RhcnRSb3cgPSByb3c7XG4gICAgICAgIHZhciBlbmRSb3cgPSByb3c7XG5cbiAgICAgICAgaWYgKHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyLnRlc3QobGluZSkpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSByb3cgKyAxLCBsID0gc2Vzc2lvbi5nZXRMZW5ndGgoKTsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChyZS50ZXN0KGxpbmVzW2ldKSlcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbmRSb3cgPSBpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIudGVzdChsaW5lKSkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IHJvdyAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgbGluZSA9IGxpbmVzW2ldO1xuICAgICAgICAgICAgICAgIGlmIChyZS50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0YXJ0Um93ID0gaTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RhcnRSb3cgIT0gZW5kUm93KSB7XG4gICAgICAgICAgICB2YXIgY29sID0gbGluZS5sZW5ndGg7XG4gICAgICAgICAgICBpZiAocmUgPT09IGxldmVsMSlcbiAgICAgICAgICAgICAgICBjb2wgPSBsaW5lLnNlYXJjaCgvXFwoRm91bmRbXildK1xcKSR8JC8pO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShzdGFydFJvdywgY29sLCBlbmRSb3csIDApO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBcbn0pLmNhbGwoRm9sZE1vZGUucHJvdG90eXBlKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgUmFuZ2UgPSByZXF1aXJlKFwiLi4vcmFuZ2VcIikuUmFuZ2U7XG5cbnZhciBNYXRjaGluZ0JyYWNlT3V0ZGVudCA9IGZ1bmN0aW9uKCkge307XG5cbihmdW5jdGlvbigpIHtcblxuICAgIHRoaXMuY2hlY2tPdXRkZW50ID0gZnVuY3Rpb24obGluZSwgaW5wdXQpIHtcbiAgICAgICAgaWYgKCEgL15cXHMrJC8udGVzdChsaW5lKSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgICByZXR1cm4gL15cXHMqXFx9Ly50ZXN0KGlucHV0KTtcbiAgICB9O1xuXG4gICAgdGhpcy5hdXRvT3V0ZGVudCA9IGZ1bmN0aW9uKGRvYywgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gZG9jLmdldExpbmUocm93KTtcbiAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCgvXihcXHMqXFx9KS8pO1xuXG4gICAgICAgIGlmICghbWF0Y2gpIHJldHVybiAwO1xuXG4gICAgICAgIHZhciBjb2x1bW4gPSBtYXRjaFsxXS5sZW5ndGg7XG4gICAgICAgIHZhciBvcGVuQnJhY2VQb3MgPSBkb2MuZmluZE1hdGNoaW5nQnJhY2tldCh7cm93OiByb3csIGNvbHVtbjogY29sdW1ufSk7XG5cbiAgICAgICAgaWYgKCFvcGVuQnJhY2VQb3MgfHwgb3BlbkJyYWNlUG9zLnJvdyA9PSByb3cpIHJldHVybiAwO1xuXG4gICAgICAgIHZhciBpbmRlbnQgPSB0aGlzLiRnZXRJbmRlbnQoZG9jLmdldExpbmUob3BlbkJyYWNlUG9zLnJvdykpO1xuICAgICAgICBkb2MucmVwbGFjZShuZXcgUmFuZ2Uocm93LCAwLCByb3csIGNvbHVtbi0xKSwgaW5kZW50KTtcbiAgICB9O1xuXG4gICAgdGhpcy4kZ2V0SW5kZW50ID0gZnVuY3Rpb24obGluZSkge1xuICAgICAgICByZXR1cm4gbGluZS5tYXRjaCgvXlxccyovKVswXTtcbiAgICB9O1xuXG59KS5jYWxsKE1hdGNoaW5nQnJhY2VPdXRkZW50LnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTWF0Y2hpbmdCcmFjZU91dGRlbnQgPSBNYXRjaGluZ0JyYWNlT3V0ZGVudDtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==