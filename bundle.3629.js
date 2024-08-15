"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[3629],{

/***/ 43629:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var HtmlMode = (__webpack_require__(32234).Mode);
var LatteHighlightRules = (__webpack_require__(88954)/* .LatteHighlightRules */ .S);
var MatchingBraceOutdent = (__webpack_require__(28670).MatchingBraceOutdent);

var Mode = function() {
    HtmlMode.call(this);
    this.HighlightRules = LatteHighlightRules;
    this.$outdent = new MatchingBraceOutdent();
};
oop.inherits(Mode, HtmlMode);

(function() {
    this.blockComment = {start: "{*", end: "*}"};

    this.getNextLineIndent = function(state, line, tab) {
        var indent = this.$getIndent(line);

        if (state == "start") {
            var match = line.match(/^.*\{(?:if|else|elseif|ifset|elseifset|ifchanged|switch|case|foreach|iterateWhile|for|while|first|last|sep|try|capture|spaceless|snippet|block|define|embed|snippetArea)\b[^{]*$/);
            if (match) {
                indent += tab;
            }
        }

        return indent;
    };

    this.checkOutdent = function(state, line, input) {
        return /^\s+\{\/$/.test(line + input);
    };

    this.autoOutdent = function(state, doc, row) {
    };

    this.$id = "ace/mode/latte";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 88954:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var HtmlHighlightRules = (__webpack_require__(10413).HtmlHighlightRules);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

var LatteHighlightRules = function() {
    // inherit from html
    HtmlHighlightRules.call(this);

    // add latte start tags to the HTML
    for (var rule in this.$rules) {
        this.$rules[rule].unshift(
            {
                token : "comment.start.latte",
                regex : "\\{\\*",
                push : [{
                    token : "comment.end.latte",
                    regex : ".*\\*\\}",
                    next : "pop"
                }, {
                    defaultToken : "comment"
                }]
            }, {
                token : "meta.tag.punctuation.tag-open.latte",
                regex : "\\{(?![\\s'\"{}]|$)/?",
                push : [{
                    token : "meta.tag.latte",
                    regex : "(?:_|=|[a-z]\\w*(?:[.:-]\\w+)*)?",
                    next: [{
                        token : "meta.tag.punctuation.tag-close.latte",
                        regex : "\\}",
                        next : "pop"
                    }, {
                        include: "latte-content"
                    }]
                }]
        });
    }

    // add n:attribute to HTML tag
    this.$rules['tag_stuff'].unshift({
        token : "meta.attribute.latte",
        regex : "n:[\\w-]+",
        next : [{
            include: "tag_whitespace"
        }, {
            token : "keyword.operator.attribute-equals.xml",
            regex : "=",
            next : [{
                token : "string.attribute-value.xml",
                regex : "'",
                next : [
                    {token : "string.attribute-value.xml", regex: "'", next: "tag_stuff"},
                    {include : "latte-content"}
                ]
            }, {
                token : "string.attribute-value.xml",
                regex : '"',
                next : [
                    {token : "string.attribute-value.xml", regex: '"', next: "tag_stuff"},
                    {include : "latte-content"}
                ]
            }, {
                token : "text.tag-whitespace.xml",
                regex : "\\s",
                next: "tag_stuff"
            }, {
                token : "meta.tag.punctuation.tag-close.xml",
                regex : "/?>",
                next: "tag_stuff"
            }, {
               include : "latte-content"
            }]
        }, {
            token : "empty",
            regex : "",
            next : "tag_stuff"
        }]
    });


    // PHP content
    this.$rules["latte-content"] = [
        {
            token : "comment.start.latte", // multi line comment
            regex : "\\/\\*",
            push : [
                {
                    token : "comment.end.latte",
                    regex : "\\*\\/",
                    next : "pop"
                }, {
                    defaultToken : "comment"
                }
            ]
        }, {
            token : "string.start", // " string start
            regex : '"',
            push : [
                {
                    token : "constant.language.escape",
                    regex : '\\\\(?:[nrtvef\\\\"$]|[0-7]{1,3}|x[0-9A-Fa-f]{1,2})'
                }, {
                    token : "variable",
                    regex : /\$[\w]+(?:\[[\w\]+]|[=\-]>\w+)?/
                }, {
                    token : "variable",
                    regex : /\$\{[^"\}]+\}?/           // this is wrong but ok for now
                },
                {token : "string.end", regex : '"', next : "pop"},
                {defaultToken : "string"}
            ]
        }, {
            token : "string.start", // ' string start
            regex : "'",
            push : [
                {token : "constant.language.escape", regex : /\\['\\]/},
                {token : "string.end", regex : "'", next : "pop"},
                {defaultToken : "string"}
            ]
        }, {
            token : "keyword.control",
            regex : "\\b(?:INF|NAN|and|or|xor|AND|OR|XOR|clone|new|instanceof|return|continue|break|as)\\b"
        }, {
            token : "constant.language",
            regex : "\\b(?:true|false|null|TRUE|FALSE|NULL)\\b"
        }, {
            token : "variable",
            regex : /\$\w+/
        }, {
            token : "constant.numeric",
            regex : "[+-]?[0-9]+(?:\\.[0-9]+)?(?:e[0-9]+)?"
        }, {
            token : ["support.class", "keyword.operator"],
            regex : "\\b(\\w+)(::)"
        }, {
            token : "constant.language", // constants
            regex : "\\b(?:[A-Z0-9_]+)\\b"
        }, {
            token : "string.unquoted",
            regex : "\\w+(?:-+\\w+)*"
        }, {
            token : "paren.lparen",
            regex : "[[({]"
        }, {
            token : "paren.rparen",
            regex : "[\\])}]"
        }, {
            token : "keyword.operator",
            regex : "::|=>|->|\\?->|\\?\\?->|\\+\\+|--|<<|>>|<=>|<=|>=|===|!==|==|!=|<>|&&|\\|\\||\\?\\?|\\?>|\\*\\*|\\.\\.\\.|[^'\"]" // =>, any char except quotes
        }
    ];

    this.normalizeRules();
};

oop.inherits(LatteHighlightRules, TextHighlightRules);

exports.S = LatteHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjM2MjkuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLElBQVk7QUFDOUIsZUFBZSxpQ0FBc0I7QUFDckMsMEJBQTBCLHlEQUFzRDtBQUNoRiwyQkFBMkIsaURBQXdEOztBQUVuRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx5QkFBeUIsU0FBUyxZQUFZOztBQUU5QztBQUNBOztBQUVBO0FBQ0EseUNBQXlDLHdLQUF3SztBQUNqTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esc0JBQXNCO0FBQ3RCOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVELFlBQVk7Ozs7Ozs7O0FDeENDOztBQUViLFVBQVUsbUJBQU8sQ0FBQyxJQUFZO0FBQzlCLHlCQUF5QiwrQ0FBb0Q7QUFDN0UseUJBQXlCLHdEQUFvRDs7QUFFN0U7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQSw0QkFBNEIsWUFBWTtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DO0FBQ3BDO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0EscUJBQXFCO0FBQ3JCLGlCQUFpQjtBQUNqQixTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixvRUFBb0U7QUFDekYscUJBQXFCO0FBQ3JCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixvRUFBb0U7QUFDekYscUJBQXFCO0FBQ3JCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLOzs7QUFHTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RCxJQUFJLGNBQWMsSUFBSTtBQUMvRSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGlDQUFpQyxLQUFLLElBQUk7QUFDMUMsaUJBQWlCO0FBQ2pCLGlCQUFpQixnREFBZ0Q7QUFDakUsaUJBQWlCO0FBQ2pCO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixzREFBc0Q7QUFDdkUsaUJBQWlCLGdEQUFnRDtBQUNqRSxpQkFBaUI7QUFDakI7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLHlCQUF5QjtBQUN6QixTQUFTO0FBQ1Q7QUFDQSwyQkFBMkI7QUFDM0IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEsU0FBMkIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2xhdHRlLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvbGF0dGVfaGlnaGxpZ2h0X3J1bGVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgSHRtbE1vZGUgPSByZXF1aXJlKFwiLi9odG1sXCIpLk1vZGU7XG52YXIgTGF0dGVIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL2xhdHRlX2hpZ2hsaWdodF9ydWxlc1wiKS5MYXR0ZUhpZ2hsaWdodFJ1bGVzO1xudmFyIE1hdGNoaW5nQnJhY2VPdXRkZW50ID0gcmVxdWlyZShcIi4vbWF0Y2hpbmdfYnJhY2Vfb3V0ZGVudFwiKS5NYXRjaGluZ0JyYWNlT3V0ZGVudDtcblxudmFyIE1vZGUgPSBmdW5jdGlvbigpIHtcbiAgICBIdG1sTW9kZS5jYWxsKHRoaXMpO1xuICAgIHRoaXMuSGlnaGxpZ2h0UnVsZXMgPSBMYXR0ZUhpZ2hsaWdodFJ1bGVzO1xuICAgIHRoaXMuJG91dGRlbnQgPSBuZXcgTWF0Y2hpbmdCcmFjZU91dGRlbnQoKTtcbn07XG5vb3AuaW5oZXJpdHMoTW9kZSwgSHRtbE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5ibG9ja0NvbW1lbnQgPSB7c3RhcnQ6IFwieypcIiwgZW5kOiBcIip9XCJ9O1xuXG4gICAgdGhpcy5nZXROZXh0TGluZUluZGVudCA9IGZ1bmN0aW9uKHN0YXRlLCBsaW5lLCB0YWIpIHtcbiAgICAgICAgdmFyIGluZGVudCA9IHRoaXMuJGdldEluZGVudChsaW5lKTtcblxuICAgICAgICBpZiAoc3RhdGUgPT0gXCJzdGFydFwiKSB7XG4gICAgICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKC9eLipcXHsoPzppZnxlbHNlfGVsc2VpZnxpZnNldHxlbHNlaWZzZXR8aWZjaGFuZ2VkfHN3aXRjaHxjYXNlfGZvcmVhY2h8aXRlcmF0ZVdoaWxlfGZvcnx3aGlsZXxmaXJzdHxsYXN0fHNlcHx0cnl8Y2FwdHVyZXxzcGFjZWxlc3N8c25pcHBldHxibG9ja3xkZWZpbmV8ZW1iZWR8c25pcHBldEFyZWEpXFxiW157XSokLyk7XG4gICAgICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgICAgICBpbmRlbnQgKz0gdGFiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGluZGVudDtcbiAgICB9O1xuXG4gICAgdGhpcy5jaGVja091dGRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgbGluZSwgaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIC9eXFxzK1xce1xcLyQvLnRlc3QobGluZSArIGlucHV0KTtcbiAgICB9O1xuXG4gICAgdGhpcy5hdXRvT3V0ZGVudCA9IGZ1bmN0aW9uKHN0YXRlLCBkb2MsIHJvdykge1xuICAgIH07XG5cbiAgICB0aGlzLiRpZCA9IFwiYWNlL21vZGUvbGF0dGVcIjtcbn0pLmNhbGwoTW9kZS5wcm90b3R5cGUpO1xuXG5leHBvcnRzLk1vZGUgPSBNb2RlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBIdG1sSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9odG1sX2hpZ2hsaWdodF9ydWxlc1wiKS5IdG1sSGlnaGxpZ2h0UnVsZXM7XG52YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xuXG52YXIgTGF0dGVIaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uKCkge1xuICAgIC8vIGluaGVyaXQgZnJvbSBodG1sXG4gICAgSHRtbEhpZ2hsaWdodFJ1bGVzLmNhbGwodGhpcyk7XG5cbiAgICAvLyBhZGQgbGF0dGUgc3RhcnQgdGFncyB0byB0aGUgSFRNTFxuICAgIGZvciAodmFyIHJ1bGUgaW4gdGhpcy4kcnVsZXMpIHtcbiAgICAgICAgdGhpcy4kcnVsZXNbcnVsZV0udW5zaGlmdChcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudC5zdGFydC5sYXR0ZVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxce1xcXFwqXCIsXG4gICAgICAgICAgICAgICAgcHVzaCA6IFt7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50LmVuZC5sYXR0ZVwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleCA6IFwiLipcXFxcKlxcXFx9XCIsXG4gICAgICAgICAgICAgICAgICAgIG5leHQgOiBcInBvcFwiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW4gOiBcImNvbW1lbnRcIlxuICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcIm1ldGEudGFnLnB1bmN0dWF0aW9uLnRhZy1vcGVuLmxhdHRlXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFx7KD8hW1xcXFxzJ1xcXCJ7fV18JCkvP1wiLFxuICAgICAgICAgICAgICAgIHB1c2ggOiBbe1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IFwibWV0YS50YWcubGF0dGVcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggOiBcIig/Ol98PXxbYS16XVxcXFx3Kig/OlsuOi1dXFxcXHcrKSopP1wiLFxuICAgICAgICAgICAgICAgICAgICBuZXh0OiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcIm1ldGEudGFnLnB1bmN0dWF0aW9uLnRhZy1jbG9zZS5sYXR0ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFx9XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0IDogXCJwb3BcIlxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmNsdWRlOiBcImxhdHRlLWNvbnRlbnRcIlxuICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgIH1dXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIGFkZCBuOmF0dHJpYnV0ZSB0byBIVE1MIHRhZ1xuICAgIHRoaXMuJHJ1bGVzWyd0YWdfc3R1ZmYnXS51bnNoaWZ0KHtcbiAgICAgICAgdG9rZW4gOiBcIm1ldGEuYXR0cmlidXRlLmxhdHRlXCIsXG4gICAgICAgIHJlZ2V4IDogXCJuOltcXFxcdy1dK1wiLFxuICAgICAgICBuZXh0IDogW3tcbiAgICAgICAgICAgIGluY2x1ZGU6IFwidGFnX3doaXRlc3BhY2VcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwia2V5d29yZC5vcGVyYXRvci5hdHRyaWJ1dGUtZXF1YWxzLnhtbFwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIj1cIixcbiAgICAgICAgICAgIG5leHQgOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmcuYXR0cmlidXRlLXZhbHVlLnhtbFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCInXCIsXG4gICAgICAgICAgICAgICAgbmV4dCA6IFtcbiAgICAgICAgICAgICAgICAgICAge3Rva2VuIDogXCJzdHJpbmcuYXR0cmlidXRlLXZhbHVlLnhtbFwiLCByZWdleDogXCInXCIsIG5leHQ6IFwidGFnX3N0dWZmXCJ9LFxuICAgICAgICAgICAgICAgICAgICB7aW5jbHVkZSA6IFwibGF0dGUtY29udGVudFwifVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nLmF0dHJpYnV0ZS12YWx1ZS54bWxcIixcbiAgICAgICAgICAgICAgICByZWdleCA6ICdcIicsXG4gICAgICAgICAgICAgICAgbmV4dCA6IFtcbiAgICAgICAgICAgICAgICAgICAge3Rva2VuIDogXCJzdHJpbmcuYXR0cmlidXRlLXZhbHVlLnhtbFwiLCByZWdleDogJ1wiJywgbmV4dDogXCJ0YWdfc3R1ZmZcIn0sXG4gICAgICAgICAgICAgICAgICAgIHtpbmNsdWRlIDogXCJsYXR0ZS1jb250ZW50XCJ9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJ0ZXh0LnRhZy13aGl0ZXNwYWNlLnhtbFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcc1wiLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwidGFnX3N0dWZmXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwibWV0YS50YWcucHVuY3R1YXRpb24udGFnLWNsb3NlLnhtbFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIvPz5cIixcbiAgICAgICAgICAgICAgICBuZXh0OiBcInRhZ19zdHVmZlwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICBpbmNsdWRlIDogXCJsYXR0ZS1jb250ZW50XCJcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJlbXB0eVwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIlwiLFxuICAgICAgICAgICAgbmV4dCA6IFwidGFnX3N0dWZmXCJcbiAgICAgICAgfV1cbiAgICB9KTtcblxuXG4gICAgLy8gUEhQIGNvbnRlbnRcbiAgICB0aGlzLiRydWxlc1tcImxhdHRlLWNvbnRlbnRcIl0gPSBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50LnN0YXJ0LmxhdHRlXCIsIC8vIG11bHRpIGxpbmUgY29tbWVudFxuICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwvXFxcXCpcIixcbiAgICAgICAgICAgIHB1c2ggOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudC5lbmQubGF0dGVcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwqXFxcXC9cIixcbiAgICAgICAgICAgICAgICAgICAgbmV4dCA6IFwicG9wXCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbiA6IFwiY29tbWVudFwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nLnN0YXJ0XCIsIC8vIFwiIHN0cmluZyBzdGFydFxuICAgICAgICAgICAgcmVnZXggOiAnXCInLFxuICAgICAgICAgICAgcHVzaCA6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggOiAnXFxcXFxcXFwoPzpbbnJ0dmVmXFxcXFxcXFxcIiRdfFswLTddezEsM318eFswLTlBLUZhLWZdezEsMn0pJ1xuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcInZhcmlhYmxlXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogL1xcJFtcXHddKyg/OlxcW1tcXHdcXF0rXXxbPVxcLV0+XFx3Kyk/L1xuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcInZhcmlhYmxlXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogL1xcJFxce1teXCJcXH1dK1xcfT8vICAgICAgICAgICAvLyB0aGlzIGlzIHdyb25nIGJ1dCBvayBmb3Igbm93XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7dG9rZW4gOiBcInN0cmluZy5lbmRcIiwgcmVnZXggOiAnXCInLCBuZXh0IDogXCJwb3BcIn0sXG4gICAgICAgICAgICAgICAge2RlZmF1bHRUb2tlbiA6IFwic3RyaW5nXCJ9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmcuc3RhcnRcIiwgLy8gJyBzdHJpbmcgc3RhcnRcbiAgICAgICAgICAgIHJlZ2V4IDogXCInXCIsXG4gICAgICAgICAgICBwdXNoIDogW1xuICAgICAgICAgICAgICAgIHt0b2tlbiA6IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCIsIHJlZ2V4IDogL1xcXFxbJ1xcXFxdL30sXG4gICAgICAgICAgICAgICAge3Rva2VuIDogXCJzdHJpbmcuZW5kXCIsIHJlZ2V4IDogXCInXCIsIG5leHQgOiBcInBvcFwifSxcbiAgICAgICAgICAgICAgICB7ZGVmYXVsdFRva2VuIDogXCJzdHJpbmdcIn1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcImtleXdvcmQuY29udHJvbFwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIlxcXFxiKD86SU5GfE5BTnxhbmR8b3J8eG9yfEFORHxPUnxYT1J8Y2xvbmV8bmV3fGluc3RhbmNlb2Z8cmV0dXJufGNvbnRpbnVlfGJyZWFrfGFzKVxcXFxiXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lmxhbmd1YWdlXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiXFxcXGIoPzp0cnVlfGZhbHNlfG51bGx8VFJVRXxGQUxTRXxOVUxMKVxcXFxiXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInZhcmlhYmxlXCIsXG4gICAgICAgICAgICByZWdleCA6IC9cXCRcXHcrL1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLFxuICAgICAgICAgICAgcmVnZXggOiBcIlsrLV0/WzAtOV0rKD86XFxcXC5bMC05XSspPyg/OmVbMC05XSspP1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogW1wic3VwcG9ydC5jbGFzc1wiLCBcImtleXdvcmQub3BlcmF0b3JcIl0sXG4gICAgICAgICAgICByZWdleCA6IFwiXFxcXGIoXFxcXHcrKSg6OilcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubGFuZ3VhZ2VcIiwgLy8gY29uc3RhbnRzXG4gICAgICAgICAgICByZWdleCA6IFwiXFxcXGIoPzpbQS1aMC05X10rKVxcXFxiXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZy51bnF1b3RlZFwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIlxcXFx3Kyg/Oi0rXFxcXHcrKSpcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwicGFyZW4ubHBhcmVuXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiW1soe11cIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwicGFyZW4ucnBhcmVuXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiW1xcXFxdKX1dXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcImtleXdvcmQub3BlcmF0b3JcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCI6Onw9PnwtPnxcXFxcPy0+fFxcXFw/XFxcXD8tPnxcXFxcK1xcXFwrfC0tfDw8fD4+fDw9Pnw8PXw+PXw9PT18IT09fD09fCE9fDw+fCYmfFxcXFx8XFxcXHx8XFxcXD9cXFxcP3xcXFxcPz58XFxcXCpcXFxcKnxcXFxcLlxcXFwuXFxcXC58W14nXFxcIl1cIiAvLyA9PiwgYW55IGNoYXIgZXhjZXB0IHF1b3Rlc1xuICAgICAgICB9XG4gICAgXTtcblxuICAgIHRoaXMubm9ybWFsaXplUnVsZXMoKTtcbn07XG5cbm9vcC5pbmhlcml0cyhMYXR0ZUhpZ2hsaWdodFJ1bGVzLCBUZXh0SGlnaGxpZ2h0UnVsZXMpO1xuXG5leHBvcnRzLkxhdHRlSGlnaGxpZ2h0UnVsZXMgPSBMYXR0ZUhpZ2hsaWdodFJ1bGVzO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9