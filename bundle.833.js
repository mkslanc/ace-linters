"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[833],{

/***/ 66449:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var Range = (__webpack_require__(59082)/* .Range */ .e);

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

exports.z = MatchingParensOutdent;


/***/ }),

/***/ 10833:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var TextMode = (__webpack_require__(98030).Mode);
var SchemeHighlightRules = (__webpack_require__(21045)/* .SchemeHighlightRules */ .k);
var MatchingParensOutdent = (__webpack_require__(66449)/* .MatchingParensOutdent */ .z);

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

/***/ 21045:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var TextHighlightRules = (__webpack_require__(28053)/* .TextHighlightRules */ .K);

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

exports.k = SchemeHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjgzMy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBYTs7QUFFYixZQUFZLDJDQUF5Qjs7QUFFckM7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0Esb0RBQW9ELHlCQUF5Qjs7QUFFN0U7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxDQUFDOztBQUVELFNBQTZCOzs7Ozs7OztBQ3pDaEI7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLEtBQVk7QUFDOUIsZUFBZSxpQ0FBc0I7QUFDckMsMkJBQTJCLDBEQUF3RDtBQUNuRiw0QkFBNEIsMkRBQTBEOztBQUV0RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDhCQUE4QjtBQUM5Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsUUFBUTtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsOENBQThDO0FBQzVEO0FBQ0E7QUFDQSxjQUFjLDhDQUE4QztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCxZQUFZOzs7Ozs7OztBQ2hHQzs7QUFFYixVQUFVLG1CQUFPLENBQUMsS0FBWTtBQUM5Qix5QkFBeUIsd0RBQW9EOztBQUU3RTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsU0FBNEIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL21hdGNoaW5nX3BhcmVuc19vdXRkZW50LmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvc2NoZW1lLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvc2NoZW1lX2hpZ2hsaWdodF9ydWxlcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIFJhbmdlID0gcmVxdWlyZShcIi4uL3JhbmdlXCIpLlJhbmdlO1xuXG52YXIgTWF0Y2hpbmdQYXJlbnNPdXRkZW50ID0gZnVuY3Rpb24oKSB7fTtcblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5jaGVja091dGRlbnQgPSBmdW5jdGlvbihsaW5lLCBpbnB1dCkge1xuICAgICAgICBpZiAoISAvXlxccyskLy50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIHJldHVybiAvXlxccypcXCkvLnRlc3QoaW5wdXQpO1xuICAgIH07XG5cbiAgICB0aGlzLmF1dG9PdXRkZW50ID0gZnVuY3Rpb24oZG9jLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBkb2MuZ2V0TGluZShyb3cpO1xuICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKC9eKFxccypcXCkpLyk7XG5cbiAgICAgICAgaWYgKCFtYXRjaCkgcmV0dXJuIDA7XG5cbiAgICAgICAgdmFyIGNvbHVtbiA9IG1hdGNoWzFdLmxlbmd0aDtcbiAgICAgICAgdmFyIG9wZW5CcmFjZVBvcyA9IGRvYy5maW5kTWF0Y2hpbmdCcmFja2V0KHtyb3c6IHJvdywgY29sdW1uOiBjb2x1bW59KTtcblxuICAgICAgICBpZiAoIW9wZW5CcmFjZVBvcyB8fCBvcGVuQnJhY2VQb3Mucm93ID09IHJvdykgcmV0dXJuIDA7XG5cbiAgICAgICAgdmFyIGluZGVudCA9IHRoaXMuJGdldEluZGVudChkb2MuZ2V0TGluZShvcGVuQnJhY2VQb3Mucm93KSk7XG4gICAgICAgIGRvYy5yZXBsYWNlKG5ldyBSYW5nZShyb3csIDAsIHJvdywgY29sdW1uLTEpLCBpbmRlbnQpO1xuICAgIH07XG5cbiAgICB0aGlzLiRnZXRJbmRlbnQgPSBmdW5jdGlvbihsaW5lKSB7XG4gICAgICAgIHZhciBtYXRjaCA9IGxpbmUubWF0Y2goL14oXFxzKykvKTtcbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICByZXR1cm4gbWF0Y2hbMV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gXCJcIjtcbiAgICB9O1xuXG59KS5jYWxsKE1hdGNoaW5nUGFyZW5zT3V0ZGVudC5wcm90b3R5cGUpO1xuXG5leHBvcnRzLk1hdGNoaW5nUGFyZW5zT3V0ZGVudCA9IE1hdGNoaW5nUGFyZW5zT3V0ZGVudDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dE1vZGUgPSByZXF1aXJlKFwiLi90ZXh0XCIpLk1vZGU7XG52YXIgU2NoZW1lSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9zY2hlbWVfaGlnaGxpZ2h0X3J1bGVzXCIpLlNjaGVtZUhpZ2hsaWdodFJ1bGVzO1xudmFyIE1hdGNoaW5nUGFyZW5zT3V0ZGVudCA9IHJlcXVpcmUoXCIuL21hdGNoaW5nX3BhcmVuc19vdXRkZW50XCIpLk1hdGNoaW5nUGFyZW5zT3V0ZGVudDtcblxudmFyIE1vZGUgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLkhpZ2hsaWdodFJ1bGVzID0gU2NoZW1lSGlnaGxpZ2h0UnVsZXM7XG5cdHRoaXMuJG91dGRlbnQgPSBuZXcgTWF0Y2hpbmdQYXJlbnNPdXRkZW50KCk7XG4gICAgdGhpcy4kYmVoYXZpb3VyID0gdGhpcy4kZGVmYXVsdEJlaGF2aW91cjtcbn07XG5vb3AuaW5oZXJpdHMoTW9kZSwgVGV4dE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgICAgXG4gICAgdGhpcy5saW5lQ29tbWVudFN0YXJ0ID0gXCI7XCI7XG4gICAgdGhpcy5taW5vckluZGVudEZ1bmN0aW9ucyA9IFtcImRlZmluZVwiLCBcImxhbWJkYVwiLCBcImRlZmluZS1tYWNyb1wiLCBcImRlZmluZS1zeW50YXhcIiwgXCJzeW50YXgtcnVsZXNcIiwgXCJkZWZpbmUtcmVjb3JkLXR5cGVcIiwgXCJkZWZpbmUtc3RydWN0dXJlXCJdO1xuXG4gICAgdGhpcy4kdG9JbmRlbnQgPSBmdW5jdGlvbihzdHIpIHtcbiAgICAgICAgcmV0dXJuIHN0ci5zcGxpdCgnJykubWFwKGZ1bmN0aW9uKGNoKSB7XG4gICAgICAgICAgICBpZiAoL1xccy8uZXhlYyhjaCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2g7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiAnICc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLmpvaW4oJycpO1xuICAgIH07XG5cbiAgICB0aGlzLiRjYWxjdWxhdGVJbmRlbnQgPSBmdW5jdGlvbihsaW5lLCB0YWIpIHtcbiAgICAgICAgdmFyIGJhc2VJbmRlbnQgPSB0aGlzLiRnZXRJbmRlbnQobGluZSk7XG4gICAgICAgIHZhciBkZWx0YSA9IDA7XG4gICAgICAgIHZhciBpc1BhcmVuLCBjaDtcbiAgICAgICAgLy8gV2FsayBiYWNrIGZyb20gZW5kIG9mIGxpbmUsIGZpbmQgbWF0Y2hpbmcgYnJhY2VzXG4gICAgICAgIGZvciAodmFyIGkgPSBsaW5lLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICBjaCA9IGxpbmVbaV07XG4gICAgICAgICAgICBpZiAoY2ggPT09ICcoJykge1xuICAgICAgICAgICAgICAgIGRlbHRhLS07XG4gICAgICAgICAgICAgICAgaXNQYXJlbiA9IHRydWU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNoID09PSAnKCcgfHwgY2ggPT09ICdbJyB8fCBjaCA9PT0gJ3snKSB7XG4gICAgICAgICAgICAgICAgZGVsdGEtLTtcbiAgICAgICAgICAgICAgICBpc1BhcmVuID0gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNoID09PSAnKScgfHwgY2ggPT09ICddJyB8fCBjaCA9PT0gJ30nKSB7XG4gICAgICAgICAgICAgICAgZGVsdGErKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkZWx0YSA8IDApIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZGVsdGEgPCAwICYmIGlzUGFyZW4pIHtcbiAgICAgICAgICAgIC8vIFdlcmUgbW9yZSBicmFja2V0cyBvcGVuZWQgdGhhbiBjbG9zZWQgYW5kIHdhcyBhICggbGVmdCBvcGVuP1xuICAgICAgICAgICAgaSArPSAxO1xuICAgICAgICAgICAgdmFyIGlCZWZvcmUgPSBpO1xuICAgICAgICAgICAgdmFyIGZuID0gJyc7XG4gICAgICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgICAgIGNoID0gbGluZVtpXTtcbiAgICAgICAgICAgICAgICBpZiAoY2ggPT09ICcgJyB8fCBjaCA9PT0gJ1xcdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5taW5vckluZGVudEZ1bmN0aW9ucy5pbmRleE9mKGZuKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiR0b0luZGVudChsaW5lLnN1YnN0cmluZygwLCBpQmVmb3JlIC0gMSkgKyB0YWIpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHRvSW5kZW50KGxpbmUuc3Vic3RyaW5nKDAsIGkgKyAxKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNoID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHRvSW5kZW50KGxpbmUuc3Vic3RyaW5nKDAsIGlCZWZvcmUgLSAxKSArIHRhYik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZuICs9IGxpbmVbaV07XG4gICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYoZGVsdGEgPCAwICYmICFpc1BhcmVuKSB7XG4gICAgICAgICAgICAvLyBXZXJlIG1vcmUgYnJhY2tldHMgb3BlbmVuZCB0aGFuIGNsb3NlZCBhbmQgd2FzIGl0IG5vdCBhICg/XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kdG9JbmRlbnQobGluZS5zdWJzdHJpbmcoMCwgaSsxKSk7XG4gICAgICAgIH0gZWxzZSBpZihkZWx0YSA+IDApIHtcbiAgICAgICAgICAgIC8vIE1lcmUgbW9yZSBicmFja2V0cyBjbG9zZWQgdGhhbiBvcGVuZWQ/IE91dGRlbnQuXG4gICAgICAgICAgICBiYXNlSW5kZW50ID0gYmFzZUluZGVudC5zdWJzdHJpbmcoMCwgYmFzZUluZGVudC5sZW5ndGggLSB0YWIubGVuZ3RoKTtcbiAgICAgICAgICAgIHJldHVybiBiYXNlSW5kZW50O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gV2VyZSB0aGV5IG5pY2VseSBtYXRjaGVkPyBKdXN0IGluZGVudCBsaWtlIGxpbmUgYmVmb3JlLlxuICAgICAgICAgICAgcmV0dXJuIGJhc2VJbmRlbnQ7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5nZXROZXh0TGluZUluZGVudCA9IGZ1bmN0aW9uKHN0YXRlLCBsaW5lLCB0YWIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGNhbGN1bGF0ZUluZGVudChsaW5lLCB0YWIpO1xuICAgIH07XG5cbiAgICB0aGlzLmNoZWNrT3V0ZGVudCA9IGZ1bmN0aW9uKHN0YXRlLCBsaW5lLCBpbnB1dCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kb3V0ZGVudC5jaGVja091dGRlbnQobGluZSwgaW5wdXQpO1xuICAgIH07XG5cbiAgICB0aGlzLmF1dG9PdXRkZW50ID0gZnVuY3Rpb24oc3RhdGUsIGRvYywgcm93KSB7XG4gICAgICAgIHRoaXMuJG91dGRlbnQuYXV0b091dGRlbnQoZG9jLCByb3cpO1xuICAgIH07XG4gICAgXG4gICAgdGhpcy4kaWQgPSBcImFjZS9tb2RlL3NjaGVtZVwiO1xufSkuY2FsbChNb2RlLnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTW9kZSA9IE1vZGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcblxudmFyIFNjaGVtZUhpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGtleXdvcmRDb250cm9sID0gXCJjYXNlfGRvfGxldHxsb29wfGlmfGVsc2V8d2hlblwiO1xuICAgIHZhciBrZXl3b3JkT3BlcmF0b3IgPSBcImVxP3xlcXY/fGVxdWFsP3xhbmR8b3J8bm90fG51bGw/XCI7XG4gICAgdmFyIGNvbnN0YW50TGFuZ3VhZ2UgPSBcIiN0fCNmXCI7XG4gICAgdmFyIHN1cHBvcnRGdW5jdGlvbnMgPSBcImNvbnN8Y2FyfGNkcnxjb25kfGxhbWJkYXxsYW1iZGEqfHN5bnRheC1ydWxlc3xmb3JtYXR8c2V0IXxxdW90ZXxldmFsfGFwcGVuZHxsaXN0fGxpc3Q/fG1lbWJlcj98bG9hZFwiO1xuXG4gICAgdmFyIGtleXdvcmRNYXBwZXIgPSB0aGlzLmNyZWF0ZUtleXdvcmRNYXBwZXIoe1xuICAgICAgICBcImtleXdvcmQuY29udHJvbFwiOiBrZXl3b3JkQ29udHJvbCxcbiAgICAgICAgXCJrZXl3b3JkLm9wZXJhdG9yXCI6IGtleXdvcmRPcGVyYXRvcixcbiAgICAgICAgXCJjb25zdGFudC5sYW5ndWFnZVwiOiBjb25zdGFudExhbmd1YWdlLFxuICAgICAgICBcInN1cHBvcnQuZnVuY3Rpb25cIjogc3VwcG9ydEZ1bmN0aW9uc1xuICAgIH0sIFwiaWRlbnRpZmllclwiLCB0cnVlKTtcblxuICAgIC8vIHJlZ2V4cCBtdXN0IG5vdCBoYXZlIGNhcHR1cmluZyBwYXJlbnRoZXNlcy4gVXNlICg/OikgaW5zdGVhZC5cbiAgICAvLyByZWdleHBzIGFyZSBvcmRlcmVkIC0+IHRoZSBmaXJzdCBtYXRjaCBpcyB1c2VkXG5cbiAgICB0aGlzLiRydWxlcyA9IFxuICAgICAgICB7XG4gICAgXCJzdGFydFwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsXG4gICAgICAgICAgICByZWdleCA6IFwiOy4qJFwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIFwidG9rZW5cIjogW1wic3RvcmFnZS50eXBlLmZ1bmN0aW9uLXR5cGUuc2NoZW1lXCIsIFwidGV4dFwiLCBcImVudGl0eS5uYW1lLmZ1bmN0aW9uLnNjaGVtZVwiXSxcbiAgICAgICAgICAgIFwicmVnZXhcIjogXCIoPzpcXFxcYig/OihkZWZpbmV8ZGVmaW5lLXN5bnRheHxkZWZpbmUtbWFjcm8pKVxcXFxiKShcXFxccyspKCg/OlxcXFx3fFxcXFwtfFxcXFwhfFxcXFw/KSopXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgXCJ0b2tlblwiOiBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24uY29uc3RhbnQuY2hhcmFjdGVyLnNjaGVtZVwiLFxuICAgICAgICAgICAgXCJyZWdleFwiOiBcIiM6XFxcXFMrXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgXCJ0b2tlblwiOiBbXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnZhcmlhYmxlLnNjaGVtZVwiLCBcInZhcmlhYmxlLm90aGVyLmdsb2JhbC5zY2hlbWVcIiwgXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnZhcmlhYmxlLnNjaGVtZVwiXSxcbiAgICAgICAgICAgIFwicmVnZXhcIjogXCIoXFxcXCopKFxcXFxTKikoXFxcXCopXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgXCJ0b2tlblwiIDogXCJjb25zdGFudC5udW1lcmljXCIsIC8vIGhleFxuICAgICAgICAgICAgXCJyZWdleFwiIDogXCIjW3hYb09iQl1bMC05YS1mQS1GXStcIlxuICAgICAgICB9LCBcbiAgICAgICAge1xuICAgICAgICAgICAgXCJ0b2tlblwiIDogXCJjb25zdGFudC5udW1lcmljXCIsIC8vIGZsb2F0XG4gICAgICAgICAgICBcInJlZ2V4XCIgOiBcIlsrLV0/XFxcXGQrKD86KD86XFxcXC5cXFxcZCopPyg/OltlRV1bKy1dP1xcXFxkKyk/KT9cIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJ0b2tlblwiIDoga2V5d29yZE1hcHBlcixcbiAgICAgICAgICAgICAgICBcInJlZ2V4XCIgOiBcIlthLXpBLVpfI11bYS16QS1aMC05X1xcXFwtXFxcXD9cXFxcIVxcXFwqXSpcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBcInRva2VuXCIgOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgXCJyZWdleFwiIDogJ1wiKD89LiknLFxuICAgICAgICAgICAgXCJuZXh0XCIgIDogXCJxcXN0cmluZ1wiXG4gICAgICAgIH1cbiAgICBdLFxuICAgIFwicXFzdHJpbmdcIjogW1xuICAgICAgICB7XG4gICAgICAgICAgICBcInRva2VuXCI6IFwiY29uc3RhbnQuY2hhcmFjdGVyLmVzY2FwZS5zY2hlbWVcIixcbiAgICAgICAgICAgIFwicmVnZXhcIjogXCJcXFxcXFxcXC5cIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBcInRva2VuXCIgOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgXCJyZWdleFwiIDogJ1teXCJcXFxcXFxcXF0rJyxcbiAgICAgICAgICAgIFwibWVyZ2VcIiA6IHRydWVcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgXCJ0b2tlblwiIDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIFwicmVnZXhcIiA6IFwiXFxcXFxcXFwkXCIsXG4gICAgICAgICAgICBcIm5leHRcIiAgOiBcInFxc3RyaW5nXCIsXG4gICAgICAgICAgICBcIm1lcmdlXCIgOiB0cnVlXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIFwidG9rZW5cIiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICBcInJlZ2V4XCIgOiAnXCJ8JCcsXG4gICAgICAgICAgICBcIm5leHRcIiAgOiBcInN0YXJ0XCIsXG4gICAgICAgICAgICBcIm1lcmdlXCIgOiB0cnVlXG4gICAgICAgIH1cbiAgICBdXG59O1xuXG59O1xuXG5vb3AuaW5oZXJpdHMoU2NoZW1lSGlnaGxpZ2h0UnVsZXMsIFRleHRIaWdobGlnaHRSdWxlcyk7XG5cbmV4cG9ydHMuU2NoZW1lSGlnaGxpZ2h0UnVsZXMgPSBTY2hlbWVIaWdobGlnaHRSdWxlcztcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==