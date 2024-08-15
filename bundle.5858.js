"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[5858],{

/***/ 45858:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var HtmlMode = (__webpack_require__(32234).Mode);
var TwigHighlightRules = (__webpack_require__(99605)/* .TwigHighlightRules */ .N);
var MatchingBraceOutdent = (__webpack_require__(28670).MatchingBraceOutdent);

var Mode = function() {
    HtmlMode.call(this);
    this.HighlightRules = TwigHighlightRules;
    this.$outdent = new MatchingBraceOutdent();
};
oop.inherits(Mode, HtmlMode);

(function() {
    this.blockComment = {start: "{#", end: "#}"};

    this.getNextLineIndent = function(state, line, tab) {
        var indent = this.$getIndent(line);

        var tokenizedLine = this.getTokenizer().getLineTokens(line, state);
        var tokens = tokenizedLine.tokens;
        var endState = tokenizedLine.state;

        if (tokens.length && tokens[tokens.length-1].type == "comment") {
            return indent;
        }

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
    this.$id = "ace/mode/twig";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 99605:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var lang = __webpack_require__(39955);
var HtmlHighlightRules = (__webpack_require__(10413).HtmlHighlightRules);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

var TwigHighlightRules = function() {
    // inherit from html
    HtmlHighlightRules.call(this);

    var tags = "autoescape|block|do|embed|extends|filter|flush|for|from|if|import|include|macro|sandbox|set|spaceless|use|verbatim";
    tags = tags + "|end" + tags.replace(/\|/g, "|end");
    var filters = "abs|batch|capitalize|convert_encoding|date|date_modify|default|e|escape|first|format|join|json_encode|keys|last|length|lower|merge|nl2br|number_format|raw|replace|reverse|slice|sort|split|striptags|title|trim|upper|url_encode";
    var functions = "attribute|constant|cycle|date|dump|parent|random|range|template_from_string";
    var tests = "constant|divisibleby|sameas|defined|empty|even|iterable|odd";
    var constants = "null|none|true|false";
    var operators = "b-and|b-xor|b-or|in|is|and|or|not";

    var keywordMapper = this.createKeywordMapper({
        "keyword.control.twig": tags,
        "support.function.twig": [filters, functions, tests].join("|"),
        "keyword.operator.twig":  operators,
        "constant.language.twig": constants
    }, "identifier");

    // add twig start tags to the HTML start tags
    for (var rule in this.$rules) {
        this.$rules[rule].unshift({
            token : "variable.other.readwrite.local.twig",
            regex : "\\{\\{-?",
            push : "twig-start"
        }, {
            token : "meta.tag.twig",
            regex : "\\{%-?",
            push : "twig-start"
        }, {
            token : "comment.block.twig",
            regex : "\\{#-?",
            push : "twig-comment"
        });
    }

    // add twig closing comment to HTML comments
    this.$rules["twig-comment"] = [{
        token : "comment.block.twig",
        regex : ".*-?#\\}",
        next : "pop"
    }];

    this.$rules["twig-start"] = [{
        token : "variable.other.readwrite.local.twig",
        regex : "-?\\}\\}",
        next : "pop"
    }, {
        token : "meta.tag.twig",
        regex : "-?%\\}",
        next : "pop"
    }, {
        token : "string",
        regex : "'",
        next  : "twig-qstring"
    }, {
        token : "string",
        regex : '"',
        next  : "twig-qqstring"
    }, {
        token : "constant.numeric", // hex
        regex : "0[xX][0-9a-fA-F]+\\b"
    }, {
        token : "constant.numeric", // float
        regex : "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
    }, {
        token : "constant.language.boolean",
        regex : "(?:true|false)\\b"
    }, {
        token : keywordMapper,
        regex : "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
    }, {
        token : "keyword.operator.assignment",
        regex : "=|~"
    }, {
        token : "keyword.operator.comparison",
        regex : "==|!=|<|>|>=|<=|==="
    }, {
        token : "keyword.operator.arithmetic",
        regex : "\\+|-|/|%|//|\\*|\\*\\*"
    }, {
        token : "keyword.operator.other",
        regex : "\\.\\.|\\|"
    }, {
        token : "punctuation.operator",
        regex : /\?|:|,|;|\./
    }, {
        token : "paren.lparen",
        regex : /[\[\({]/
    }, {
        token : "paren.rparen",
        regex : /[\])}]/
    }, {
        token : "text",
        regex : "\\s+"
    } ];

    this.$rules["twig-qqstring"] = [{
            token : "constant.language.escape",
            regex : /\\[\\"$#ntr]|#{[^"}]*}/
        }, {
            token : "string",
            regex : '"',
            next  : "twig-start"
        }, {
            defaultToken : "string"
        }
    ];

    this.$rules["twig-qstring"] = [{
            token : "constant.language.escape",
            regex : /\\[\\'ntr]}/
        }, {
            token : "string",
            regex : "'",
            next  : "twig-start"
        }, {
            defaultToken : "string"
        }
    ];

    this.normalizeRules();
};

oop.inherits(TwigHighlightRules, TextHighlightRules);

exports.N = TwigHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjU4NTguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLElBQVk7QUFDOUIsZUFBZSxpQ0FBc0I7QUFDckMseUJBQXlCLHdEQUFvRDtBQUM3RSwyQkFBMkIsaURBQXdEOztBQUVuRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx5QkFBeUIsU0FBUyxZQUFZOztBQUU5QztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwQ0FBMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVELFlBQVk7Ozs7Ozs7O0FDaERDOztBQUViLFVBQVUsbUJBQU8sQ0FBQyxJQUFZO0FBQzlCLFdBQVcsbUJBQU8sQ0FBQyxLQUFhO0FBQ2hDLHlCQUF5QiwrQ0FBb0Q7QUFDN0UseUJBQXlCLHdEQUFvRDs7QUFFN0U7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLEdBQUc7QUFDM0I7QUFDQSxTQUFTO0FBQ1Q7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQSxTQUFTO0FBQ1Q7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0Esc0JBQXNCLEdBQUc7QUFDekI7QUFDQSxLQUFLO0FBQ0w7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSx5QkFBeUI7QUFDekIsS0FBSztBQUNMO0FBQ0EsdUJBQXVCO0FBQ3ZCLEtBQUs7QUFDTDtBQUNBLHNCQUFzQjtBQUN0QixLQUFLO0FBQ0w7QUFDQTtBQUNBLE1BQU07O0FBRU47QUFDQTtBQUNBLG9DQUFvQyxJQUFJLEdBQUc7QUFDM0MsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGdDQUFnQztBQUNoQyxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBLFNBQTBCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS90d2lnLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvdHdpZ19oaWdobGlnaHRfcnVsZXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBIdG1sTW9kZSA9IHJlcXVpcmUoXCIuL2h0bWxcIikuTW9kZTtcbnZhciBUd2lnSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90d2lnX2hpZ2hsaWdodF9ydWxlc1wiKS5Ud2lnSGlnaGxpZ2h0UnVsZXM7XG52YXIgTWF0Y2hpbmdCcmFjZU91dGRlbnQgPSByZXF1aXJlKFwiLi9tYXRjaGluZ19icmFjZV9vdXRkZW50XCIpLk1hdGNoaW5nQnJhY2VPdXRkZW50O1xuXG52YXIgTW9kZSA9IGZ1bmN0aW9uKCkge1xuICAgIEh0bWxNb2RlLmNhbGwodGhpcyk7XG4gICAgdGhpcy5IaWdobGlnaHRSdWxlcyA9IFR3aWdIaWdobGlnaHRSdWxlcztcbiAgICB0aGlzLiRvdXRkZW50ID0gbmV3IE1hdGNoaW5nQnJhY2VPdXRkZW50KCk7XG59O1xub29wLmluaGVyaXRzKE1vZGUsIEh0bWxNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuYmxvY2tDb21tZW50ID0ge3N0YXJ0OiBcInsjXCIsIGVuZDogXCIjfVwifTtcblxuICAgIHRoaXMuZ2V0TmV4dExpbmVJbmRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgbGluZSwgdGFiKSB7XG4gICAgICAgIHZhciBpbmRlbnQgPSB0aGlzLiRnZXRJbmRlbnQobGluZSk7XG5cbiAgICAgICAgdmFyIHRva2VuaXplZExpbmUgPSB0aGlzLmdldFRva2VuaXplcigpLmdldExpbmVUb2tlbnMobGluZSwgc3RhdGUpO1xuICAgICAgICB2YXIgdG9rZW5zID0gdG9rZW5pemVkTGluZS50b2tlbnM7XG4gICAgICAgIHZhciBlbmRTdGF0ZSA9IHRva2VuaXplZExpbmUuc3RhdGU7XG5cbiAgICAgICAgaWYgKHRva2Vucy5sZW5ndGggJiYgdG9rZW5zW3Rva2Vucy5sZW5ndGgtMV0udHlwZSA9PSBcImNvbW1lbnRcIikge1xuICAgICAgICAgICAgcmV0dXJuIGluZGVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdGF0ZSA9PSBcInN0YXJ0XCIpIHtcbiAgICAgICAgICAgIHZhciBtYXRjaCA9IGxpbmUubWF0Y2goL14uKltcXHtcXChcXFtdXFxzKiQvKTtcbiAgICAgICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgICAgIGluZGVudCArPSB0YWI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW5kZW50O1xuICAgIH07XG5cbiAgICB0aGlzLmNoZWNrT3V0ZGVudCA9IGZ1bmN0aW9uKHN0YXRlLCBsaW5lLCBpbnB1dCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kb3V0ZGVudC5jaGVja091dGRlbnQobGluZSwgaW5wdXQpO1xuICAgIH07XG5cbiAgICB0aGlzLmF1dG9PdXRkZW50ID0gZnVuY3Rpb24oc3RhdGUsIGRvYywgcm93KSB7XG4gICAgICAgIHRoaXMuJG91dGRlbnQuYXV0b091dGRlbnQoZG9jLCByb3cpO1xuICAgIH07XG4gICAgdGhpcy4kaWQgPSBcImFjZS9tb2RlL3R3aWdcIjtcbn0pLmNhbGwoTW9kZS5wcm90b3R5cGUpO1xuXG5leHBvcnRzLk1vZGUgPSBNb2RlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBsYW5nID0gcmVxdWlyZShcIi4uL2xpYi9sYW5nXCIpO1xudmFyIEh0bWxIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL2h0bWxfaGlnaGxpZ2h0X3J1bGVzXCIpLkh0bWxIaWdobGlnaHRSdWxlcztcbnZhciBUZXh0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90ZXh0X2hpZ2hsaWdodF9ydWxlc1wiKS5UZXh0SGlnaGxpZ2h0UnVsZXM7XG5cbnZhciBUd2lnSGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbigpIHtcbiAgICAvLyBpbmhlcml0IGZyb20gaHRtbFxuICAgIEh0bWxIaWdobGlnaHRSdWxlcy5jYWxsKHRoaXMpO1xuXG4gICAgdmFyIHRhZ3MgPSBcImF1dG9lc2NhcGV8YmxvY2t8ZG98ZW1iZWR8ZXh0ZW5kc3xmaWx0ZXJ8Zmx1c2h8Zm9yfGZyb218aWZ8aW1wb3J0fGluY2x1ZGV8bWFjcm98c2FuZGJveHxzZXR8c3BhY2VsZXNzfHVzZXx2ZXJiYXRpbVwiO1xuICAgIHRhZ3MgPSB0YWdzICsgXCJ8ZW5kXCIgKyB0YWdzLnJlcGxhY2UoL1xcfC9nLCBcInxlbmRcIik7XG4gICAgdmFyIGZpbHRlcnMgPSBcImFic3xiYXRjaHxjYXBpdGFsaXplfGNvbnZlcnRfZW5jb2Rpbmd8ZGF0ZXxkYXRlX21vZGlmeXxkZWZhdWx0fGV8ZXNjYXBlfGZpcnN0fGZvcm1hdHxqb2lufGpzb25fZW5jb2RlfGtleXN8bGFzdHxsZW5ndGh8bG93ZXJ8bWVyZ2V8bmwyYnJ8bnVtYmVyX2Zvcm1hdHxyYXd8cmVwbGFjZXxyZXZlcnNlfHNsaWNlfHNvcnR8c3BsaXR8c3RyaXB0YWdzfHRpdGxlfHRyaW18dXBwZXJ8dXJsX2VuY29kZVwiO1xuICAgIHZhciBmdW5jdGlvbnMgPSBcImF0dHJpYnV0ZXxjb25zdGFudHxjeWNsZXxkYXRlfGR1bXB8cGFyZW50fHJhbmRvbXxyYW5nZXx0ZW1wbGF0ZV9mcm9tX3N0cmluZ1wiO1xuICAgIHZhciB0ZXN0cyA9IFwiY29uc3RhbnR8ZGl2aXNpYmxlYnl8c2FtZWFzfGRlZmluZWR8ZW1wdHl8ZXZlbnxpdGVyYWJsZXxvZGRcIjtcbiAgICB2YXIgY29uc3RhbnRzID0gXCJudWxsfG5vbmV8dHJ1ZXxmYWxzZVwiO1xuICAgIHZhciBvcGVyYXRvcnMgPSBcImItYW5kfGIteG9yfGItb3J8aW58aXN8YW5kfG9yfG5vdFwiO1xuXG4gICAgdmFyIGtleXdvcmRNYXBwZXIgPSB0aGlzLmNyZWF0ZUtleXdvcmRNYXBwZXIoe1xuICAgICAgICBcImtleXdvcmQuY29udHJvbC50d2lnXCI6IHRhZ3MsXG4gICAgICAgIFwic3VwcG9ydC5mdW5jdGlvbi50d2lnXCI6IFtmaWx0ZXJzLCBmdW5jdGlvbnMsIHRlc3RzXS5qb2luKFwifFwiKSxcbiAgICAgICAgXCJrZXl3b3JkLm9wZXJhdG9yLnR3aWdcIjogIG9wZXJhdG9ycyxcbiAgICAgICAgXCJjb25zdGFudC5sYW5ndWFnZS50d2lnXCI6IGNvbnN0YW50c1xuICAgIH0sIFwiaWRlbnRpZmllclwiKTtcblxuICAgIC8vIGFkZCB0d2lnIHN0YXJ0IHRhZ3MgdG8gdGhlIEhUTUwgc3RhcnQgdGFnc1xuICAgIGZvciAodmFyIHJ1bGUgaW4gdGhpcy4kcnVsZXMpIHtcbiAgICAgICAgdGhpcy4kcnVsZXNbcnVsZV0udW5zaGlmdCh7XG4gICAgICAgICAgICB0b2tlbiA6IFwidmFyaWFibGUub3RoZXIucmVhZHdyaXRlLmxvY2FsLnR3aWdcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxce1xcXFx7LT9cIixcbiAgICAgICAgICAgIHB1c2ggOiBcInR3aWctc3RhcnRcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwibWV0YS50YWcudHdpZ1wiLFxuICAgICAgICAgICAgcmVnZXggOiBcIlxcXFx7JS0/XCIsXG4gICAgICAgICAgICBwdXNoIDogXCJ0d2lnLXN0YXJ0XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnQuYmxvY2sudHdpZ1wiLFxuICAgICAgICAgICAgcmVnZXggOiBcIlxcXFx7Iy0/XCIsXG4gICAgICAgICAgICBwdXNoIDogXCJ0d2lnLWNvbW1lbnRcIlxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBhZGQgdHdpZyBjbG9zaW5nIGNvbW1lbnQgdG8gSFRNTCBjb21tZW50c1xuICAgIHRoaXMuJHJ1bGVzW1widHdpZy1jb21tZW50XCJdID0gW3tcbiAgICAgICAgdG9rZW4gOiBcImNvbW1lbnQuYmxvY2sudHdpZ1wiLFxuICAgICAgICByZWdleCA6IFwiLiotPyNcXFxcfVwiLFxuICAgICAgICBuZXh0IDogXCJwb3BcIlxuICAgIH1dO1xuXG4gICAgdGhpcy4kcnVsZXNbXCJ0d2lnLXN0YXJ0XCJdID0gW3tcbiAgICAgICAgdG9rZW4gOiBcInZhcmlhYmxlLm90aGVyLnJlYWR3cml0ZS5sb2NhbC50d2lnXCIsXG4gICAgICAgIHJlZ2V4IDogXCItP1xcXFx9XFxcXH1cIixcbiAgICAgICAgbmV4dCA6IFwicG9wXCJcbiAgICB9LCB7XG4gICAgICAgIHRva2VuIDogXCJtZXRhLnRhZy50d2lnXCIsXG4gICAgICAgIHJlZ2V4IDogXCItPyVcXFxcfVwiLFxuICAgICAgICBuZXh0IDogXCJwb3BcIlxuICAgIH0sIHtcbiAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLFxuICAgICAgICByZWdleCA6IFwiJ1wiLFxuICAgICAgICBuZXh0ICA6IFwidHdpZy1xc3RyaW5nXCJcbiAgICB9LCB7XG4gICAgICAgIHRva2VuIDogXCJzdHJpbmdcIixcbiAgICAgICAgcmVnZXggOiAnXCInLFxuICAgICAgICBuZXh0ICA6IFwidHdpZy1xcXN0cmluZ1wiXG4gICAgfSwge1xuICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLCAvLyBoZXhcbiAgICAgICAgcmVnZXggOiBcIjBbeFhdWzAtOWEtZkEtRl0rXFxcXGJcIlxuICAgIH0sIHtcbiAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIiwgLy8gZmxvYXRcbiAgICAgICAgcmVnZXggOiBcIlsrLV0/XFxcXGQrKD86KD86XFxcXC5cXFxcZCopPyg/OltlRV1bKy1dP1xcXFxkKyk/KT9cXFxcYlwiXG4gICAgfSwge1xuICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubGFuZ3VhZ2UuYm9vbGVhblwiLFxuICAgICAgICByZWdleCA6IFwiKD86dHJ1ZXxmYWxzZSlcXFxcYlwiXG4gICAgfSwge1xuICAgICAgICB0b2tlbiA6IGtleXdvcmRNYXBwZXIsXG4gICAgICAgIHJlZ2V4IDogXCJbYS16QS1aXyRdW2EtekEtWjAtOV8kXSpcXFxcYlwiXG4gICAgfSwge1xuICAgICAgICB0b2tlbiA6IFwia2V5d29yZC5vcGVyYXRvci5hc3NpZ25tZW50XCIsXG4gICAgICAgIHJlZ2V4IDogXCI9fH5cIlxuICAgIH0sIHtcbiAgICAgICAgdG9rZW4gOiBcImtleXdvcmQub3BlcmF0b3IuY29tcGFyaXNvblwiLFxuICAgICAgICByZWdleCA6IFwiPT18IT18PHw+fD49fDw9fD09PVwiXG4gICAgfSwge1xuICAgICAgICB0b2tlbiA6IFwia2V5d29yZC5vcGVyYXRvci5hcml0aG1ldGljXCIsXG4gICAgICAgIHJlZ2V4IDogXCJcXFxcK3wtfC98JXwvL3xcXFxcKnxcXFxcKlxcXFwqXCJcbiAgICB9LCB7XG4gICAgICAgIHRva2VuIDogXCJrZXl3b3JkLm9wZXJhdG9yLm90aGVyXCIsXG4gICAgICAgIHJlZ2V4IDogXCJcXFxcLlxcXFwufFxcXFx8XCJcbiAgICB9LCB7XG4gICAgICAgIHRva2VuIDogXCJwdW5jdHVhdGlvbi5vcGVyYXRvclwiLFxuICAgICAgICByZWdleCA6IC9cXD98OnwsfDt8XFwuL1xuICAgIH0sIHtcbiAgICAgICAgdG9rZW4gOiBcInBhcmVuLmxwYXJlblwiLFxuICAgICAgICByZWdleCA6IC9bXFxbXFwoe10vXG4gICAgfSwge1xuICAgICAgICB0b2tlbiA6IFwicGFyZW4ucnBhcmVuXCIsXG4gICAgICAgIHJlZ2V4IDogL1tcXF0pfV0vXG4gICAgfSwge1xuICAgICAgICB0b2tlbiA6IFwidGV4dFwiLFxuICAgICAgICByZWdleCA6IFwiXFxcXHMrXCJcbiAgICB9IF07XG5cbiAgICB0aGlzLiRydWxlc1tcInR3aWctcXFzdHJpbmdcIl0gPSBbe1xuICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLFxuICAgICAgICAgICAgcmVnZXggOiAvXFxcXFtcXFxcXCIkI250cl18I3tbXlwifV0qfS9cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgcmVnZXggOiAnXCInLFxuICAgICAgICAgICAgbmV4dCAgOiBcInR3aWctc3RhcnRcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBkZWZhdWx0VG9rZW4gOiBcInN0cmluZ1wiXG4gICAgICAgIH1cbiAgICBdO1xuXG4gICAgdGhpcy4kcnVsZXNbXCJ0d2lnLXFzdHJpbmdcIl0gPSBbe1xuICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLFxuICAgICAgICAgICAgcmVnZXggOiAvXFxcXFtcXFxcJ250cl19L1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiJ1wiLFxuICAgICAgICAgICAgbmV4dCAgOiBcInR3aWctc3RhcnRcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBkZWZhdWx0VG9rZW4gOiBcInN0cmluZ1wiXG4gICAgICAgIH1cbiAgICBdO1xuXG4gICAgdGhpcy5ub3JtYWxpemVSdWxlcygpO1xufTtcblxub29wLmluaGVyaXRzKFR3aWdIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuZXhwb3J0cy5Ud2lnSGlnaGxpZ2h0UnVsZXMgPSBUd2lnSGlnaGxpZ2h0UnVsZXM7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=