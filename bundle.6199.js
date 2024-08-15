"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[6199],{

/***/ 76199:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var AdaHighlightRules = (__webpack_require__(44404)/* .AdaHighlightRules */ .O);
var Range = (__webpack_require__(91902)/* .Range */ .Q);

var Mode = function() {
    this.HighlightRules = AdaHighlightRules;
    this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, TextMode);

(function() {

    this.lineCommentStart = "--";

    this.getNextLineIndent = function(state, line, tab) {
        var indent = this.$getIndent(line);

        var tokenizedLine = this.getTokenizer().getLineTokens(line, state);
        var tokens = tokenizedLine.tokens;

        if (tokens.length && tokens[tokens.length-1].type == "comment") {
            return indent;
        }

        //  Indent when line ends with one of the following keywords
        if (state == "start") {
            var match = line.match(/^.*(begin|loop|then|is|do)\s*$/);
            if (match) {
                indent += tab;
            }
        }

        return indent;
    };

    this.checkOutdent = function(state, line, input) {
        var complete_line = line + input;

        // Outdent when the current line contains begin or end, and nothing
        // else. This ensures that we'll send the signal only once.
        if (complete_line.match(/^\s*(begin|end)$/)) {
            return true;
        }

        return false;
    };

    this.autoOutdent = function(state, session, row) {

        var line = session.getLine(row);
        var prevLine = session.getLine(row - 1);
        var prevIndent = this.$getIndent(prevLine).length;
        var indent = this.$getIndent(line).length;

        // Don't outdent if current line is at the same level as the last one,
        // it means that the user outdented himself
        if (indent <= prevIndent) {
            return;
        }

        session.outdentRows(new Range(row, 0, row + 2, 0));
    };


    this.$id = "ace/mode/ada";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 44404:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

var AdaHighlightRules = function() {
var keywords = "abort|else|new|return|abs|elsif|not|reverse|abstract|end|null|accept|entry|select|" +
"access|exception|of|separate|aliased|exit|or|some|all|others|subtype|and|for|out|synchronized|" +
"array|function|overriding|at|tagged|generic|package|task|begin|goto|pragma|terminate|" +
"body|private|then|if|procedure|type|case|in|protected|constant|interface|until|" +
"|is|raise|use|declare|range|delay|limited|record|when|delta|loop|rem|while|digits|renames|with|do|mod|requeue|xor";

    var builtinConstants = (
        "true|false|null"
    );

    var builtinFunctions = (
        "count|min|max|avg|sum|rank|now|coalesce|main"
    );

    var keywordMapper = this.createKeywordMapper({
        "support.function": builtinFunctions,
        "keyword": keywords,
        "constant.language": builtinConstants
    }, "identifier", true);

    this.$rules = {
        "start" : [ {
            token : "comment",
            regex : "--.*$"
        }, {
            token : "string",           // " string
            regex : '".*?"'
        }, {
            token : "string",           // character
            regex : "'.'"
        }, {
            token : "constant.numeric", // float
            regex : "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
        }, {
            token : keywordMapper,
            regex : "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
        }, {
            token : "keyword.operator",
            regex : "\\+|\\-|\\/|\\/\\/|%|<@>|@>|<@|&|\\^|~|<|>|<=|=>|==|!=|<>|="
        }, {
            token : "paren.lparen",
            regex : "[\\(]"
        }, {
            token : "paren.rparen",
            regex : "[\\)]"
        }, {
            token : "text",
            regex : "\\s+"
        } ]
    };
};

oop.inherits(AdaHighlightRules, TextHighlightRules);

exports.O = AdaHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjYxOTkuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLElBQVk7QUFDOUIsZUFBZSxpQ0FBc0I7QUFDckMsd0JBQXdCLHVEQUFrRDtBQUMxRSxZQUFZLDJDQUF5Qjs7QUFFckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBLENBQUM7O0FBRUQsWUFBWTs7Ozs7Ozs7QUN0RUM7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLElBQVk7QUFDOUIseUJBQXlCLHdEQUFvRDs7QUFFN0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBOztBQUVBOztBQUVBLFNBQXlCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9hZGEuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9hZGFfaGlnaGxpZ2h0X3J1bGVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dE1vZGUgPSByZXF1aXJlKFwiLi90ZXh0XCIpLk1vZGU7XG52YXIgQWRhSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9hZGFfaGlnaGxpZ2h0X3J1bGVzXCIpLkFkYUhpZ2hsaWdodFJ1bGVzO1xudmFyIFJhbmdlID0gcmVxdWlyZShcIi4uL3JhbmdlXCIpLlJhbmdlO1xuXG52YXIgTW9kZSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuSGlnaGxpZ2h0UnVsZXMgPSBBZGFIaWdobGlnaHRSdWxlcztcbiAgICB0aGlzLiRiZWhhdmlvdXIgPSB0aGlzLiRkZWZhdWx0QmVoYXZpb3VyO1xufTtcbm9vcC5pbmhlcml0cyhNb2RlLCBUZXh0TW9kZSk7XG5cbihmdW5jdGlvbigpIHtcblxuICAgIHRoaXMubGluZUNvbW1lbnRTdGFydCA9IFwiLS1cIjtcblxuICAgIHRoaXMuZ2V0TmV4dExpbmVJbmRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgbGluZSwgdGFiKSB7XG4gICAgICAgIHZhciBpbmRlbnQgPSB0aGlzLiRnZXRJbmRlbnQobGluZSk7XG5cbiAgICAgICAgdmFyIHRva2VuaXplZExpbmUgPSB0aGlzLmdldFRva2VuaXplcigpLmdldExpbmVUb2tlbnMobGluZSwgc3RhdGUpO1xuICAgICAgICB2YXIgdG9rZW5zID0gdG9rZW5pemVkTGluZS50b2tlbnM7XG5cbiAgICAgICAgaWYgKHRva2Vucy5sZW5ndGggJiYgdG9rZW5zW3Rva2Vucy5sZW5ndGgtMV0udHlwZSA9PSBcImNvbW1lbnRcIikge1xuICAgICAgICAgICAgcmV0dXJuIGluZGVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vICBJbmRlbnQgd2hlbiBsaW5lIGVuZHMgd2l0aCBvbmUgb2YgdGhlIGZvbGxvd2luZyBrZXl3b3Jkc1xuICAgICAgICBpZiAoc3RhdGUgPT0gXCJzdGFydFwiKSB7XG4gICAgICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKC9eLiooYmVnaW58bG9vcHx0aGVufGlzfGRvKVxccyokLyk7XG4gICAgICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgICAgICBpbmRlbnQgKz0gdGFiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGluZGVudDtcbiAgICB9O1xuXG4gICAgdGhpcy5jaGVja091dGRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgbGluZSwgaW5wdXQpIHtcbiAgICAgICAgdmFyIGNvbXBsZXRlX2xpbmUgPSBsaW5lICsgaW5wdXQ7XG5cbiAgICAgICAgLy8gT3V0ZGVudCB3aGVuIHRoZSBjdXJyZW50IGxpbmUgY29udGFpbnMgYmVnaW4gb3IgZW5kLCBhbmQgbm90aGluZ1xuICAgICAgICAvLyBlbHNlLiBUaGlzIGVuc3VyZXMgdGhhdCB3ZSdsbCBzZW5kIHRoZSBzaWduYWwgb25seSBvbmNlLlxuICAgICAgICBpZiAoY29tcGxldGVfbGluZS5tYXRjaCgvXlxccyooYmVnaW58ZW5kKSQvKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIHRoaXMuYXV0b091dGRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgc2Vzc2lvbiwgcm93KSB7XG5cbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgdmFyIHByZXZMaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyAtIDEpO1xuICAgICAgICB2YXIgcHJldkluZGVudCA9IHRoaXMuJGdldEluZGVudChwcmV2TGluZSkubGVuZ3RoO1xuICAgICAgICB2YXIgaW5kZW50ID0gdGhpcy4kZ2V0SW5kZW50KGxpbmUpLmxlbmd0aDtcblxuICAgICAgICAvLyBEb24ndCBvdXRkZW50IGlmIGN1cnJlbnQgbGluZSBpcyBhdCB0aGUgc2FtZSBsZXZlbCBhcyB0aGUgbGFzdCBvbmUsXG4gICAgICAgIC8vIGl0IG1lYW5zIHRoYXQgdGhlIHVzZXIgb3V0ZGVudGVkIGhpbXNlbGZcbiAgICAgICAgaWYgKGluZGVudCA8PSBwcmV2SW5kZW50KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBzZXNzaW9uLm91dGRlbnRSb3dzKG5ldyBSYW5nZShyb3csIDAsIHJvdyArIDIsIDApKTtcbiAgICB9O1xuXG5cbiAgICB0aGlzLiRpZCA9IFwiYWNlL21vZGUvYWRhXCI7XG59KS5jYWxsKE1vZGUucHJvdG90eXBlKTtcblxuZXhwb3J0cy5Nb2RlID0gTW9kZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xuXG52YXIgQWRhSGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbigpIHtcbnZhciBrZXl3b3JkcyA9IFwiYWJvcnR8ZWxzZXxuZXd8cmV0dXJufGFic3xlbHNpZnxub3R8cmV2ZXJzZXxhYnN0cmFjdHxlbmR8bnVsbHxhY2NlcHR8ZW50cnl8c2VsZWN0fFwiICtcblwiYWNjZXNzfGV4Y2VwdGlvbnxvZnxzZXBhcmF0ZXxhbGlhc2VkfGV4aXR8b3J8c29tZXxhbGx8b3RoZXJzfHN1YnR5cGV8YW5kfGZvcnxvdXR8c3luY2hyb25pemVkfFwiICtcblwiYXJyYXl8ZnVuY3Rpb258b3ZlcnJpZGluZ3xhdHx0YWdnZWR8Z2VuZXJpY3xwYWNrYWdlfHRhc2t8YmVnaW58Z290b3xwcmFnbWF8dGVybWluYXRlfFwiICtcblwiYm9keXxwcml2YXRlfHRoZW58aWZ8cHJvY2VkdXJlfHR5cGV8Y2FzZXxpbnxwcm90ZWN0ZWR8Y29uc3RhbnR8aW50ZXJmYWNlfHVudGlsfFwiICtcblwifGlzfHJhaXNlfHVzZXxkZWNsYXJlfHJhbmdlfGRlbGF5fGxpbWl0ZWR8cmVjb3JkfHdoZW58ZGVsdGF8bG9vcHxyZW18d2hpbGV8ZGlnaXRzfHJlbmFtZXN8d2l0aHxkb3xtb2R8cmVxdWV1ZXx4b3JcIjtcblxuICAgIHZhciBidWlsdGluQ29uc3RhbnRzID0gKFxuICAgICAgICBcInRydWV8ZmFsc2V8bnVsbFwiXG4gICAgKTtcblxuICAgIHZhciBidWlsdGluRnVuY3Rpb25zID0gKFxuICAgICAgICBcImNvdW50fG1pbnxtYXh8YXZnfHN1bXxyYW5rfG5vd3xjb2FsZXNjZXxtYWluXCJcbiAgICApO1xuXG4gICAgdmFyIGtleXdvcmRNYXBwZXIgPSB0aGlzLmNyZWF0ZUtleXdvcmRNYXBwZXIoe1xuICAgICAgICBcInN1cHBvcnQuZnVuY3Rpb25cIjogYnVpbHRpbkZ1bmN0aW9ucyxcbiAgICAgICAgXCJrZXl3b3JkXCI6IGtleXdvcmRzLFxuICAgICAgICBcImNvbnN0YW50Lmxhbmd1YWdlXCI6IGJ1aWx0aW5Db25zdGFudHNcbiAgICB9LCBcImlkZW50aWZpZXJcIiwgdHJ1ZSk7XG5cbiAgICB0aGlzLiRydWxlcyA9IHtcbiAgICAgICAgXCJzdGFydFwiIDogWyB7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudFwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIi0tLiokXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLCAgICAgICAgICAgLy8gXCIgc3RyaW5nXG4gICAgICAgICAgICByZWdleCA6ICdcIi4qP1wiJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsICAgICAgICAgICAvLyBjaGFyYWN0ZXJcbiAgICAgICAgICAgIHJlZ2V4IDogXCInLidcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLCAvLyBmbG9hdFxuICAgICAgICAgICAgcmVnZXggOiBcIlsrLV0/XFxcXGQrKD86KD86XFxcXC5cXFxcZCopPyg/OltlRV1bKy1dP1xcXFxkKyk/KT9cXFxcYlwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDoga2V5d29yZE1hcHBlcixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJbYS16QS1aXyRdW2EtekEtWjAtOV8kXSpcXFxcYlwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiXFxcXCt8XFxcXC18XFxcXC98XFxcXC9cXFxcL3wlfDxAPnxAPnw8QHwmfFxcXFxefH58PHw+fDw9fD0+fD09fCE9fDw+fD1cIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwicGFyZW4ubHBhcmVuXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiW1xcXFwoXVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJwYXJlbi5ycGFyZW5cIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJbXFxcXCldXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInRleHRcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxccytcIlxuICAgICAgICB9IF1cbiAgICB9O1xufTtcblxub29wLmluaGVyaXRzKEFkYUhpZ2hsaWdodFJ1bGVzLCBUZXh0SGlnaGxpZ2h0UnVsZXMpO1xuXG5leHBvcnRzLkFkYUhpZ2hsaWdodFJ1bGVzID0gQWRhSGlnaGxpZ2h0UnVsZXM7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=