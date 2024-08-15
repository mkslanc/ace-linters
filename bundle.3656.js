"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[3656],{

/***/ 8240:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var Range = (__webpack_require__(91902)/* .Range */ .Q);

var MatchingParensOutdent = function() {};

(function() {

    this.checkOutdent = function(line, input) {
        if (! /^\s+$/.test(line))
            return false;

        return /^\s*\)/.test(input);
    };

    this.autoOutdent = function(doc, row) {
        var line = doc.getLine(row);
        var match = line.match(/^(\s*\))/);

        if (!match) return 0;

        var column = match[1].length;
        var openBracePos = doc.findMatchingBracket({row: row, column: column});

        if (!openBracePos || openBracePos.row == row) return 0;

        var indent = this.$getIndent(doc.getLine(openBracePos.row));
        doc.replace(new Range(row, 0, row, column-1), indent);
    };

    this.$getIndent = function(line) {
        var match = line.match(/^(\s+)/);
        if (match) {
            return match[1];
        }

        return "";
    };

}).call(MatchingParensOutdent.prototype);

exports.K = MatchingParensOutdent;


/***/ }),

/***/ 53656:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var SchemeHighlightRules = (__webpack_require__(14243)/* .SchemeHighlightRules */ .X);
var MatchingParensOutdent = (__webpack_require__(8240)/* .MatchingParensOutdent */ .K);

var Mode = function() {
    this.HighlightRules = SchemeHighlightRules;
	this.$outdent = new MatchingParensOutdent();
    this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, TextMode);

(function() {
       
    this.lineCommentStart = ";";
    this.minorIndentFunctions = ["define", "lambda", "define-macro", "define-syntax", "syntax-rules", "define-record-type", "define-structure"];

    this.$toIndent = function(str) {
        return str.split('').map(function(ch) {
            if (/\s/.exec(ch)) {
                return ch;
            } else {
                return ' ';
            }
        }).join('');
    };

    this.$calculateIndent = function(line, tab) {
        var baseIndent = this.$getIndent(line);
        var delta = 0;
        var isParen, ch;
        // Walk back from end of line, find matching braces
        for (var i = line.length - 1; i >= 0; i--) {
            ch = line[i];
            if (ch === '(') {
                delta--;
                isParen = true;
            } else if (ch === '(' || ch === '[' || ch === '{') {
                delta--;
                isParen = false;
            } else if (ch === ')' || ch === ']' || ch === '}') {
                delta++;
            }
            if (delta < 0) {
                break;
            }
        }
        if (delta < 0 && isParen) {
            // Were more brackets opened than closed and was a ( left open?
            i += 1;
            var iBefore = i;
            var fn = '';
            while (true) {
                ch = line[i];
                if (ch === ' ' || ch === '\t') {
                    if(this.minorIndentFunctions.indexOf(fn) !== -1) {
                        return this.$toIndent(line.substring(0, iBefore - 1) + tab);
                    } else {
                        return this.$toIndent(line.substring(0, i + 1));
                    }
                } else if (ch === undefined) {
                    return this.$toIndent(line.substring(0, iBefore - 1) + tab);
                }
                fn += line[i];
                i++;
            }
        } else if(delta < 0 && !isParen) {
            // Were more brackets openend than closed and was it not a (?
            return this.$toIndent(line.substring(0, i+1));
        } else if(delta > 0) {
            // Mere more brackets closed than opened? Outdent.
            baseIndent = baseIndent.substring(0, baseIndent.length - tab.length);
            return baseIndent;
        } else {
            // Were they nicely matched? Just indent like line before.
            return baseIndent;
        }
    };

    this.getNextLineIndent = function(state, line, tab) {
        return this.$calculateIndent(line, tab);
    };

    this.checkOutdent = function(state, line, input) {
        return this.$outdent.checkOutdent(line, input);
    };

    this.autoOutdent = function(state, doc, row) {
        this.$outdent.autoOutdent(doc, row);
    };
    
    this.$id = "ace/mode/scheme";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 14243:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

var SchemeHighlightRules = function() {
    var keywordControl = "case|do|let|loop|if|else|when";
    var keywordOperator = "eq?|eqv?|equal?|and|or|not|null?";
    var constantLanguage = "#t|#f";
    var supportFunctions = "cons|car|cdr|cond|lambda|lambda*|syntax-rules|format|set!|quote|eval|append|list|list?|member?|load";

    var keywordMapper = this.createKeywordMapper({
        "keyword.control": keywordControl,
        "keyword.operator": keywordOperator,
        "constant.language": constantLanguage,
        "support.function": supportFunctions
    }, "identifier", true);

    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used

    this.$rules = 
        {
    "start": [
        {
            token : "comment",
            regex : ";.*$"
        },
        {
            "token": ["storage.type.function-type.scheme", "text", "entity.name.function.scheme"],
            "regex": "(?:\\b(?:(define|define-syntax|define-macro))\\b)(\\s+)((?:\\w|\\-|\\!|\\?)*)"
        },
        {
            "token": "punctuation.definition.constant.character.scheme",
            "regex": "#:\\S+"
        },
        {
            "token": ["punctuation.definition.variable.scheme", "variable.other.global.scheme", "punctuation.definition.variable.scheme"],
            "regex": "(\\*)(\\S*)(\\*)"
        },
        {
            "token" : "constant.numeric", // hex
            "regex" : "#[xXoObB][0-9a-fA-F]+"
        }, 
        {
            "token" : "constant.numeric", // float
            "regex" : "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?"
        },
        {
                "token" : keywordMapper,
                "regex" : "[a-zA-Z_#][a-zA-Z0-9_\\-\\?\\!\\*]*"
        },
        {
            "token" : "string",
            "regex" : '"(?=.)',
            "next"  : "qqstring"
        }
    ],
    "qqstring": [
        {
            "token": "constant.character.escape.scheme",
            "regex": "\\\\."
        },
        {
            "token" : "string",
            "regex" : '[^"\\\\]+',
            "merge" : true
        }, {
            "token" : "string",
            "regex" : "\\\\$",
            "next"  : "qqstring",
            "merge" : true
        }, {
            "token" : "string",
            "regex" : '"|$',
            "next"  : "start",
            "merge" : true
        }
    ]
};

};

oop.inherits(SchemeHighlightRules, TextHighlightRules);

exports.X = SchemeHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjM2NTYuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsWUFBWSwyQ0FBeUI7O0FBRXJDOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLG9EQUFvRCx5QkFBeUI7O0FBRTdFOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsQ0FBQzs7QUFFRCxTQUE2Qjs7Ozs7Ozs7QUN6Q2hCOztBQUViLFVBQVUsbUJBQU8sQ0FBQyxJQUFZO0FBQzlCLGVBQWUsaUNBQXNCO0FBQ3JDLDJCQUEyQiwwREFBd0Q7QUFDbkYsNEJBQTRCLDBEQUEwRDs7QUFFdEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw4QkFBOEI7QUFDOUI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLFFBQVE7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLDhDQUE4QztBQUM1RDtBQUNBO0FBQ0EsY0FBYyw4Q0FBOEM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQsWUFBWTs7Ozs7Ozs7QUNoR0M7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLElBQVk7QUFDOUIseUJBQXlCLHdEQUFvRDs7QUFFN0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEIsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLFNBQTRCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9tYXRjaGluZ19wYXJlbnNfb3V0ZGVudC5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL3NjaGVtZS5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL3NjaGVtZV9oaWdobGlnaHRfcnVsZXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBSYW5nZSA9IHJlcXVpcmUoXCIuLi9yYW5nZVwiKS5SYW5nZTtcblxudmFyIE1hdGNoaW5nUGFyZW5zT3V0ZGVudCA9IGZ1bmN0aW9uKCkge307XG5cbihmdW5jdGlvbigpIHtcblxuICAgIHRoaXMuY2hlY2tPdXRkZW50ID0gZnVuY3Rpb24obGluZSwgaW5wdXQpIHtcbiAgICAgICAgaWYgKCEgL15cXHMrJC8udGVzdChsaW5lKSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgICByZXR1cm4gL15cXHMqXFwpLy50ZXN0KGlucHV0KTtcbiAgICB9O1xuXG4gICAgdGhpcy5hdXRvT3V0ZGVudCA9IGZ1bmN0aW9uKGRvYywgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gZG9jLmdldExpbmUocm93KTtcbiAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCgvXihcXHMqXFwpKS8pO1xuXG4gICAgICAgIGlmICghbWF0Y2gpIHJldHVybiAwO1xuXG4gICAgICAgIHZhciBjb2x1bW4gPSBtYXRjaFsxXS5sZW5ndGg7XG4gICAgICAgIHZhciBvcGVuQnJhY2VQb3MgPSBkb2MuZmluZE1hdGNoaW5nQnJhY2tldCh7cm93OiByb3csIGNvbHVtbjogY29sdW1ufSk7XG5cbiAgICAgICAgaWYgKCFvcGVuQnJhY2VQb3MgfHwgb3BlbkJyYWNlUG9zLnJvdyA9PSByb3cpIHJldHVybiAwO1xuXG4gICAgICAgIHZhciBpbmRlbnQgPSB0aGlzLiRnZXRJbmRlbnQoZG9jLmdldExpbmUob3BlbkJyYWNlUG9zLnJvdykpO1xuICAgICAgICBkb2MucmVwbGFjZShuZXcgUmFuZ2Uocm93LCAwLCByb3csIGNvbHVtbi0xKSwgaW5kZW50KTtcbiAgICB9O1xuXG4gICAgdGhpcy4kZ2V0SW5kZW50ID0gZnVuY3Rpb24obGluZSkge1xuICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKC9eKFxccyspLyk7XG4gICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgcmV0dXJuIG1hdGNoWzFdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfTtcblxufSkuY2FsbChNYXRjaGluZ1BhcmVuc091dGRlbnQucHJvdG90eXBlKTtcblxuZXhwb3J0cy5NYXRjaGluZ1BhcmVuc091dGRlbnQgPSBNYXRjaGluZ1BhcmVuc091dGRlbnQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRNb2RlID0gcmVxdWlyZShcIi4vdGV4dFwiKS5Nb2RlO1xudmFyIFNjaGVtZUhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vc2NoZW1lX2hpZ2hsaWdodF9ydWxlc1wiKS5TY2hlbWVIaWdobGlnaHRSdWxlcztcbnZhciBNYXRjaGluZ1BhcmVuc091dGRlbnQgPSByZXF1aXJlKFwiLi9tYXRjaGluZ19wYXJlbnNfb3V0ZGVudFwiKS5NYXRjaGluZ1BhcmVuc091dGRlbnQ7XG5cbnZhciBNb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5IaWdobGlnaHRSdWxlcyA9IFNjaGVtZUhpZ2hsaWdodFJ1bGVzO1xuXHR0aGlzLiRvdXRkZW50ID0gbmV3IE1hdGNoaW5nUGFyZW5zT3V0ZGVudCgpO1xuICAgIHRoaXMuJGJlaGF2aW91ciA9IHRoaXMuJGRlZmF1bHRCZWhhdmlvdXI7XG59O1xub29wLmluaGVyaXRzKE1vZGUsIFRleHRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuICAgICAgIFxuICAgIHRoaXMubGluZUNvbW1lbnRTdGFydCA9IFwiO1wiO1xuICAgIHRoaXMubWlub3JJbmRlbnRGdW5jdGlvbnMgPSBbXCJkZWZpbmVcIiwgXCJsYW1iZGFcIiwgXCJkZWZpbmUtbWFjcm9cIiwgXCJkZWZpbmUtc3ludGF4XCIsIFwic3ludGF4LXJ1bGVzXCIsIFwiZGVmaW5lLXJlY29yZC10eXBlXCIsIFwiZGVmaW5lLXN0cnVjdHVyZVwiXTtcblxuICAgIHRoaXMuJHRvSW5kZW50ID0gZnVuY3Rpb24oc3RyKSB7XG4gICAgICAgIHJldHVybiBzdHIuc3BsaXQoJycpLm1hcChmdW5jdGlvbihjaCkge1xuICAgICAgICAgICAgaWYgKC9cXHMvLmV4ZWMoY2gpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNoO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJyAnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KS5qb2luKCcnKTtcbiAgICB9O1xuXG4gICAgdGhpcy4kY2FsY3VsYXRlSW5kZW50ID0gZnVuY3Rpb24obGluZSwgdGFiKSB7XG4gICAgICAgIHZhciBiYXNlSW5kZW50ID0gdGhpcy4kZ2V0SW5kZW50KGxpbmUpO1xuICAgICAgICB2YXIgZGVsdGEgPSAwO1xuICAgICAgICB2YXIgaXNQYXJlbiwgY2g7XG4gICAgICAgIC8vIFdhbGsgYmFjayBmcm9tIGVuZCBvZiBsaW5lLCBmaW5kIG1hdGNoaW5nIGJyYWNlc1xuICAgICAgICBmb3IgKHZhciBpID0gbGluZS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgY2ggPSBsaW5lW2ldO1xuICAgICAgICAgICAgaWYgKGNoID09PSAnKCcpIHtcbiAgICAgICAgICAgICAgICBkZWx0YS0tO1xuICAgICAgICAgICAgICAgIGlzUGFyZW4gPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjaCA9PT0gJygnIHx8IGNoID09PSAnWycgfHwgY2ggPT09ICd7Jykge1xuICAgICAgICAgICAgICAgIGRlbHRhLS07XG4gICAgICAgICAgICAgICAgaXNQYXJlbiA9IGZhbHNlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjaCA9PT0gJyknIHx8IGNoID09PSAnXScgfHwgY2ggPT09ICd9Jykge1xuICAgICAgICAgICAgICAgIGRlbHRhKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGVsdGEgPCAwKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRlbHRhIDwgMCAmJiBpc1BhcmVuKSB7XG4gICAgICAgICAgICAvLyBXZXJlIG1vcmUgYnJhY2tldHMgb3BlbmVkIHRoYW4gY2xvc2VkIGFuZCB3YXMgYSAoIGxlZnQgb3Blbj9cbiAgICAgICAgICAgIGkgKz0gMTtcbiAgICAgICAgICAgIHZhciBpQmVmb3JlID0gaTtcbiAgICAgICAgICAgIHZhciBmbiA9ICcnO1xuICAgICAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgICAgICBjaCA9IGxpbmVbaV07XG4gICAgICAgICAgICAgICAgaWYgKGNoID09PSAnICcgfHwgY2ggPT09ICdcXHQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMubWlub3JJbmRlbnRGdW5jdGlvbnMuaW5kZXhPZihmbikgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kdG9JbmRlbnQobGluZS5zdWJzdHJpbmcoMCwgaUJlZm9yZSAtIDEpICsgdGFiKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiR0b0luZGVudChsaW5lLnN1YnN0cmluZygwLCBpICsgMSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjaCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiR0b0luZGVudChsaW5lLnN1YnN0cmluZygwLCBpQmVmb3JlIC0gMSkgKyB0YWIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmbiArPSBsaW5lW2ldO1xuICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmKGRlbHRhIDwgMCAmJiAhaXNQYXJlbikge1xuICAgICAgICAgICAgLy8gV2VyZSBtb3JlIGJyYWNrZXRzIG9wZW5lbmQgdGhhbiBjbG9zZWQgYW5kIHdhcyBpdCBub3QgYSAoP1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHRvSW5kZW50KGxpbmUuc3Vic3RyaW5nKDAsIGkrMSkpO1xuICAgICAgICB9IGVsc2UgaWYoZGVsdGEgPiAwKSB7XG4gICAgICAgICAgICAvLyBNZXJlIG1vcmUgYnJhY2tldHMgY2xvc2VkIHRoYW4gb3BlbmVkPyBPdXRkZW50LlxuICAgICAgICAgICAgYmFzZUluZGVudCA9IGJhc2VJbmRlbnQuc3Vic3RyaW5nKDAsIGJhc2VJbmRlbnQubGVuZ3RoIC0gdGFiLmxlbmd0aCk7XG4gICAgICAgICAgICByZXR1cm4gYmFzZUluZGVudDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFdlcmUgdGhleSBuaWNlbHkgbWF0Y2hlZD8gSnVzdCBpbmRlbnQgbGlrZSBsaW5lIGJlZm9yZS5cbiAgICAgICAgICAgIHJldHVybiBiYXNlSW5kZW50O1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMuZ2V0TmV4dExpbmVJbmRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgbGluZSwgdGFiKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRjYWxjdWxhdGVJbmRlbnQobGluZSwgdGFiKTtcbiAgICB9O1xuXG4gICAgdGhpcy5jaGVja091dGRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgbGluZSwgaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJG91dGRlbnQuY2hlY2tPdXRkZW50KGxpbmUsIGlucHV0KTtcbiAgICB9O1xuXG4gICAgdGhpcy5hdXRvT3V0ZGVudCA9IGZ1bmN0aW9uKHN0YXRlLCBkb2MsIHJvdykge1xuICAgICAgICB0aGlzLiRvdXRkZW50LmF1dG9PdXRkZW50KGRvYywgcm93KTtcbiAgICB9O1xuICAgIFxuICAgIHRoaXMuJGlkID0gXCJhY2UvbW9kZS9zY2hlbWVcIjtcbn0pLmNhbGwoTW9kZS5wcm90b3R5cGUpO1xuXG5leHBvcnRzLk1vZGUgPSBNb2RlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90ZXh0X2hpZ2hsaWdodF9ydWxlc1wiKS5UZXh0SGlnaGxpZ2h0UnVsZXM7XG5cbnZhciBTY2hlbWVIaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBrZXl3b3JkQ29udHJvbCA9IFwiY2FzZXxkb3xsZXR8bG9vcHxpZnxlbHNlfHdoZW5cIjtcbiAgICB2YXIga2V5d29yZE9wZXJhdG9yID0gXCJlcT98ZXF2P3xlcXVhbD98YW5kfG9yfG5vdHxudWxsP1wiO1xuICAgIHZhciBjb25zdGFudExhbmd1YWdlID0gXCIjdHwjZlwiO1xuICAgIHZhciBzdXBwb3J0RnVuY3Rpb25zID0gXCJjb25zfGNhcnxjZHJ8Y29uZHxsYW1iZGF8bGFtYmRhKnxzeW50YXgtcnVsZXN8Zm9ybWF0fHNldCF8cXVvdGV8ZXZhbHxhcHBlbmR8bGlzdHxsaXN0P3xtZW1iZXI/fGxvYWRcIjtcblxuICAgIHZhciBrZXl3b3JkTWFwcGVyID0gdGhpcy5jcmVhdGVLZXl3b3JkTWFwcGVyKHtcbiAgICAgICAgXCJrZXl3b3JkLmNvbnRyb2xcIjoga2V5d29yZENvbnRyb2wsXG4gICAgICAgIFwia2V5d29yZC5vcGVyYXRvclwiOiBrZXl3b3JkT3BlcmF0b3IsXG4gICAgICAgIFwiY29uc3RhbnQubGFuZ3VhZ2VcIjogY29uc3RhbnRMYW5ndWFnZSxcbiAgICAgICAgXCJzdXBwb3J0LmZ1bmN0aW9uXCI6IHN1cHBvcnRGdW5jdGlvbnNcbiAgICB9LCBcImlkZW50aWZpZXJcIiwgdHJ1ZSk7XG5cbiAgICAvLyByZWdleHAgbXVzdCBub3QgaGF2ZSBjYXB0dXJpbmcgcGFyZW50aGVzZXMuIFVzZSAoPzopIGluc3RlYWQuXG4gICAgLy8gcmVnZXhwcyBhcmUgb3JkZXJlZCAtPiB0aGUgZmlyc3QgbWF0Y2ggaXMgdXNlZFxuXG4gICAgdGhpcy4kcnVsZXMgPSBcbiAgICAgICAge1xuICAgIFwic3RhcnRcIjogW1xuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudFwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIjsuKiRcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBcInRva2VuXCI6IFtcInN0b3JhZ2UudHlwZS5mdW5jdGlvbi10eXBlLnNjaGVtZVwiLCBcInRleHRcIiwgXCJlbnRpdHkubmFtZS5mdW5jdGlvbi5zY2hlbWVcIl0sXG4gICAgICAgICAgICBcInJlZ2V4XCI6IFwiKD86XFxcXGIoPzooZGVmaW5lfGRlZmluZS1zeW50YXh8ZGVmaW5lLW1hY3JvKSlcXFxcYikoXFxcXHMrKSgoPzpcXFxcd3xcXFxcLXxcXFxcIXxcXFxcPykqKVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIFwidG9rZW5cIjogXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLmNvbnN0YW50LmNoYXJhY3Rlci5zY2hlbWVcIixcbiAgICAgICAgICAgIFwicmVnZXhcIjogXCIjOlxcXFxTK1wiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIFwidG9rZW5cIjogW1wicHVuY3R1YXRpb24uZGVmaW5pdGlvbi52YXJpYWJsZS5zY2hlbWVcIiwgXCJ2YXJpYWJsZS5vdGhlci5nbG9iYWwuc2NoZW1lXCIsIFwicHVuY3R1YXRpb24uZGVmaW5pdGlvbi52YXJpYWJsZS5zY2hlbWVcIl0sXG4gICAgICAgICAgICBcInJlZ2V4XCI6IFwiKFxcXFwqKShcXFxcUyopKFxcXFwqKVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIFwidG9rZW5cIiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLCAvLyBoZXhcbiAgICAgICAgICAgIFwicmVnZXhcIiA6IFwiI1t4WG9PYkJdWzAtOWEtZkEtRl0rXCJcbiAgICAgICAgfSwgXG4gICAgICAgIHtcbiAgICAgICAgICAgIFwidG9rZW5cIiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLCAvLyBmbG9hdFxuICAgICAgICAgICAgXCJyZWdleFwiIDogXCJbKy1dP1xcXFxkKyg/Oig/OlxcXFwuXFxcXGQqKT8oPzpbZUVdWystXT9cXFxcZCspPyk/XCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgICAgIFwidG9rZW5cIiA6IGtleXdvcmRNYXBwZXIsXG4gICAgICAgICAgICAgICAgXCJyZWdleFwiIDogXCJbYS16QS1aXyNdW2EtekEtWjAtOV9cXFxcLVxcXFw/XFxcXCFcXFxcKl0qXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgXCJ0b2tlblwiIDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIFwicmVnZXhcIiA6ICdcIig/PS4pJyxcbiAgICAgICAgICAgIFwibmV4dFwiICA6IFwicXFzdHJpbmdcIlxuICAgICAgICB9XG4gICAgXSxcbiAgICBcInFxc3RyaW5nXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgXCJ0b2tlblwiOiBcImNvbnN0YW50LmNoYXJhY3Rlci5lc2NhcGUuc2NoZW1lXCIsXG4gICAgICAgICAgICBcInJlZ2V4XCI6IFwiXFxcXFxcXFwuXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgXCJ0b2tlblwiIDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIFwicmVnZXhcIiA6ICdbXlwiXFxcXFxcXFxdKycsXG4gICAgICAgICAgICBcIm1lcmdlXCIgOiB0cnVlXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIFwidG9rZW5cIiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICBcInJlZ2V4XCIgOiBcIlxcXFxcXFxcJFwiLFxuICAgICAgICAgICAgXCJuZXh0XCIgIDogXCJxcXN0cmluZ1wiLFxuICAgICAgICAgICAgXCJtZXJnZVwiIDogdHJ1ZVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBcInRva2VuXCIgOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgXCJyZWdleFwiIDogJ1wifCQnLFxuICAgICAgICAgICAgXCJuZXh0XCIgIDogXCJzdGFydFwiLFxuICAgICAgICAgICAgXCJtZXJnZVwiIDogdHJ1ZVxuICAgICAgICB9XG4gICAgXVxufTtcblxufTtcblxub29wLmluaGVyaXRzKFNjaGVtZUhpZ2hsaWdodFJ1bGVzLCBUZXh0SGlnaGxpZ2h0UnVsZXMpO1xuXG5leHBvcnRzLlNjaGVtZUhpZ2hsaWdodFJ1bGVzID0gU2NoZW1lSGlnaGxpZ2h0UnVsZXM7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=