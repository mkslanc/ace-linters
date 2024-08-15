"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[9858],{

/***/ 55598:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);

var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

var CsoundPreprocessorHighlightRules = function(embeddedRulePrefix) {

    this.embeddedRulePrefix = embeddedRulePrefix === undefined ? "" : embeddedRulePrefix;

    this.semicolonComments = {
        token : "comment.line.semicolon.csound",
        regex : ";.*$"
    };

    this.comments = [
        {
            token : "punctuation.definition.comment.begin.csound",
            regex : "/\\*",
            push  : [
                {
                    token : "punctuation.definition.comment.end.csound",
                    regex : "\\*/",
                    next  : "pop"
                }, {
                    defaultToken: "comment.block.csound"
                }
            ]
        }, {
            token : "comment.line.double-slash.csound",
            regex : "//.*$"
        },
        this.semicolonComments
    ];

    this.macroUses = [
        {
            token : ["entity.name.function.preprocessor.csound", "punctuation.definition.macro-parameter-value-list.begin.csound"],
            regex : /(\$[A-Z_a-z]\w*\.?)(\()/,
            next  : "macro parameter value list"
        }, {
            token : "entity.name.function.preprocessor.csound",
            regex : /\$[A-Z_a-z]\w*(?:\.|\b)/
        }
    ];

    this.numbers = [
        {
            token : "constant.numeric.float.csound",
            regex : /(?:\d+[Ee][+-]?\d+)|(?:\d+\.\d*|\d*\.\d+)(?:[Ee][+-]?\d+)?/
        }, {
            token : ["storage.type.number.csound", "constant.numeric.integer.hexadecimal.csound"],
            regex : /(0[Xx])([0-9A-Fa-f]+)/
        }, {
            token : "constant.numeric.integer.decimal.csound",
            regex : /\d+/
        }
    ];

    this.bracedStringContents = [
        {
            token : "constant.character.escape.csound",
            // https://github.com/csound/csound/search?q=unquote_string+path%3AEngine+filename%3Acsound_orc_compile.c
            regex : /\\(?:[\\abnrt"]|[0-7]{1,3})/
        },
        // Format specifiers are included in quoted and braced strings. This
        // means that format specifiers are highlighted in all strings, even
        // though only
        //   fprintks        https://csound.com/docs/manual/fprintks.html
        //   fprints         https://csound.com/docs/manual/fprints.html
        //   printf/printf_i https://csound.com/docs/manual/printf.html
        //   printks         https://csound.com/docs/manual/printks.html
        //   prints          https://csound.com/docs/manual/prints.html
        //   sprintf         https://csound.com/docs/manual/sprintf.html
        //   sprintfk        https://csound.com/docs/manual/sprintfk.html
        // work with strings that contain format specifiers. In addition, these
        // opcodes’ handling of format specifiers is inconsistent:
        //   - fprintks, fprints, printks, and prints do accept %a and %A
        //     specifiers, but can’t accept %s specifiers.
        //   - printf, printf_i, sprintf, and sprintfk don’t accept %a and %A
        //     specifiers, but do accept %s specifiers.
        // See https://github.com/csound/csound/issues/747 for more information.
        {
            token : "constant.character.placeholder.csound",
            regex : /%[#0\- +]*\d*(?:\.\d+)?[diuoxXfFeEgGaAcs]/
        }, {
            token : "constant.character.escape.csound",
            regex : /%%/
        }
    ];

    this.quotedStringContents = [
        this.macroUses,
        this.bracedStringContents
    ];

    var start = [
        this.comments,

        {
            token : "keyword.preprocessor.csound",
            regex : /#(?:e(?:nd(?:if)?|lse)\b|##)|@@?[ \t]*\d+/
        }, {
            token : "keyword.preprocessor.csound",
            regex : /#include/,
            push  : [
                this.comments,
                {
                    token : "string.csound",
                    regex : /([^ \t])(?:.*?\1)/,
                    next  : "pop"
                }
            ]
        }, {
            token : "keyword.preprocessor.csound",
            regex : /#includestr/,
            push  : [
                this.comments,
                {
                    token : "string.csound",
                    regex : /([^ \t])(?:.*?\1)/,
                    next  : "pop"
                }
            ]
        }, {
            token : "keyword.preprocessor.csound",
            regex : /#[ \t]*define/,
            next  : "define directive"
        }, {
            token : "keyword.preprocessor.csound",
            regex : /#(?:ifn?def|undef)\b/,
            next  : "macro directive"
        },

        this.macroUses
    ];

    this.$rules = {
        "start": start,

        "define directive": [
            this.comments,
            {
                token : "entity.name.function.preprocessor.csound",
                regex : /[A-Z_a-z]\w*/
            }, {
                token : "punctuation.definition.macro-parameter-name-list.begin.csound",
                regex : /\(/,
                next  : "macro parameter name list"
            }, {
                token : "punctuation.definition.macro.begin.csound",
                regex : /#/,
                next  : "macro body"
            }
        ],
        "macro parameter name list": [
            {
                token : "variable.parameter.preprocessor.csound",
                regex : /[A-Z_a-z]\w*/
            }, {
                token : "punctuation.definition.macro-parameter-name-list.end.csound",
                regex : /\)/,
                next  : "define directive"
            }
        ],
        "macro body": [
            {
                token : "constant.character.escape.csound",
                regex : /\\#/
            }, {
                token : "punctuation.definition.macro.end.csound",
                regex : /#/,
                next  : "start"
            },
            start
        ],

        "macro directive": [
            this.comments,
            {
                token : "entity.name.function.preprocessor.csound",
                regex : /[A-Z_a-z]\w*/,
                next  : "start"
            }
        ],

        "macro parameter value list": [
            {
                token : "punctuation.definition.macro-parameter-value-list.end.csound",
                regex : /\)/,
                next  : "start"
            }, {
                token : "punctuation.definition.string.begin.csound",
                regex : /"/,
                next  : "macro parameter value quoted string"
            }, this.pushRule({
                token : "punctuation.macro-parameter-value-parenthetical.begin.csound",
                regex : /\(/,
                next  : "macro parameter value parenthetical"
            }), {
                token : "punctuation.macro-parameter-value-separator.csound",
                regex : "[#']"
            }
        ],
        "macro parameter value quoted string": [
            {
                token : "constant.character.escape.csound",
                regex : /\\[#'()]/
            }, {
                token : "invalid.illegal.csound",
                regex : /[#'()]/
            }, {
                token : "punctuation.definition.string.end.csound",
                regex : /"/,
                next  : "macro parameter value list"
            },
            this.quotedStringContents,
            {
                defaultToken: "string.quoted.csound"
            }
        ],
        "macro parameter value parenthetical": [
            {
                token : "constant.character.escape.csound",
                regex : /\\\)/
            }, this.popRule({
                token : "punctuation.macro-parameter-value-parenthetical.end.csound",
                regex : /\)/
            }), this.pushRule({
                token : "punctuation.macro-parameter-value-parenthetical.begin.csound",
                regex : /\(/,
                next  : "macro parameter value parenthetical"
            }),
            start
        ]
    };
};

oop.inherits(CsoundPreprocessorHighlightRules, TextHighlightRules);

(function() {

    this.pushRule = function(params) {
        if (Array.isArray(params.next)) {
            for (var i = 0; i < params.next.length; i++) {
                params.next[i] = this.embeddedRulePrefix + params.next[i];
            }
        }

        return {
            regex : params.regex, onMatch: function(value, currentState, stack, line) {
                if (stack.length === 0)
                    stack.push(currentState);
                if (Array.isArray(params.next)) {
                    for (var i = 0; i < params.next.length; i++) {
                        stack.push(params.next[i]);
                    }
                } else {
                    stack.push(params.next);
                }
                this.next = stack[stack.length - 1];
                return params.token;
            },

            get next() { return Array.isArray(params.next) ? params.next[params.next.length - 1] : params.next; },
            set next(next) {
                if (!Array.isArray(params.next)) {
                    params.next = next;
                }
            },

            get token() { return params.token; }
        };
    };

    this.popRule = function(params) {
        if (params.next) {
            params.next = this.embeddedRulePrefix + params.next;
        }

        return {
            regex : params.regex, onMatch: function(value, currentState, stack, line) {
                stack.pop();
                if (params.next) {
                    stack.push(params.next);
                    this.next = stack[stack.length - 1];
                } else {
                    this.next = stack.length > 1 ? stack[stack.length - 1] : stack.pop();
                }
                return params.token;
            }
        };
    };

}).call(CsoundPreprocessorHighlightRules.prototype);

exports.B = CsoundPreprocessorHighlightRules;


/***/ }),

/***/ 79858:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var CsoundScoreHighlightRules = (__webpack_require__(85189)/* .CsoundScoreHighlightRules */ .M);

var Mode = function() {
    this.HighlightRules = CsoundScoreHighlightRules;
};
oop.inherits(Mode, TextMode);

(function() {

    this.lineCommentStart = ";";
    this.blockComment = {start: "/*", end: "*/"};

    this.$id = "ace/mode/csound_score";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 85189:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);

var CsoundPreprocessorHighlightRules = (__webpack_require__(55598)/* .CsoundPreprocessorHighlightRules */ .B);

var CsoundScoreHighlightRules = function(embeddedRulePrefix) {

    CsoundPreprocessorHighlightRules.call(this, embeddedRulePrefix);

    this.quotedStringContents.push({
        token : "invalid.illegal.csound-score",
        regex : /[^"]*$/
    });

    var start = this.$rules.start;
    start.push(
        {
            token : "keyword.control.csound-score",
            regex : /[aBbCdefiqstvxy]/
        }, {
            // w statements are generated internally and should not be used; see
            // https://github.com/csound/csound/issues/750.
            token : "invalid.illegal.csound-score",
            regex : /w/
        }, {
            // z is not a statement, but rather a constant equal to
            // 800,000,000,000. 800 billion seconds is about 25,367.8 years. See
            // also https://csound.github.io/docs/manual/ScoreTop.html and
            // https://github.com/csound/csound/search?q=stof+path%3AEngine+filename%3Asread.c.
            token : "constant.numeric.language.csound-score",
            regex : /z/
        }, {
            token : ["keyword.control.csound-score", "constant.numeric.integer.decimal.csound-score"],
            regex : /([nNpP][pP])(\d+)/
        }, {
            token : "keyword.other.csound-score",
            regex : /[mn]/,
            push  : [
                {
                    token : "empty",
                    regex : /$/,
                    next  : "pop"
                },
                this.comments,
                {
                    token : "entity.name.label.csound-score",
                    regex : /[A-Z_a-z]\w*/
                }
            ]
        }, {
            token : "keyword.preprocessor.csound-score",
            regex : /r\b/,
            next  : "repeat section"
        },

        this.numbers,

        {
            token : "keyword.operator.csound-score",
            regex : "[!+\\-*/^%&|<>#~.]"
        },

        this.pushRule({
            token : "punctuation.definition.string.begin.csound-score",
            regex : /"/,
            next  : "quoted string"
        }),

        this.pushRule({
            token : "punctuation.braced-loop.begin.csound-score",
            regex : /{/,
            next  : "loop after left brace"
        })
    );

    this.addRules({
        "repeat section": [
            {
                token : "empty",
                regex : /$/,
                next  : "start"
            },
            this.comments,
            {
                token : "constant.numeric.integer.decimal.csound-score",
                regex : /\d+/,
                next  : "repeat section before label"
            }
        ],
        "repeat section before label": [
            {
                token : "empty",
                regex : /$/,
                next  : "start"
            },
            this.comments,
            {
                token : "entity.name.label.csound-score",
                regex : /[A-Z_a-z]\w*/,
                next  : "start"
            }
        ],

        "quoted string": [
            this.popRule({
                token : "punctuation.definition.string.end.csound-score",
                regex : /"/
            }),
            this.quotedStringContents,
            {
                defaultToken: "string.quoted.csound-score"
            }
        ],

        "loop after left brace": [
            this.popRule({
                token : "constant.numeric.integer.decimal.csound-score",
                regex : /\d+/,
                next  : "loop after repeat count"
            }),
            this.comments,
            {
                token : "invalid.illegal.csound",
                regex : /\S.*/
            }
        ],
        "loop after repeat count": [
            this.popRule({
                token : "entity.name.function.preprocessor.csound-score",
                regex : /[A-Z_a-z]\w*\b/,
                next  : "loop after macro name"
            }),
            this.comments,
            {
                token : "invalid.illegal.csound",
                regex : /\S.*/
            }
        ],
        "loop after macro name": [
            start,
            this.popRule({
                token : "punctuation.braced-loop.end.csound-score",
                regex : /}/
            })
        ]
    });

    this.normalizeRules();
};

oop.inherits(CsoundScoreHighlightRules, CsoundPreprocessorHighlightRules);

exports.M = CsoundScoreHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QzFCLGFBQWE7QUFDYjtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTs7QUFFQSxTQUFpQyIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvY3NvdW5kX3ByZXByb2Nlc3Nvcl9oaWdobGlnaHRfcnVsZXMuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9jc291bmRfc2NvcmUuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9jc291bmRfc2NvcmVfaGlnaGxpZ2h0X3J1bGVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG5cbnZhciBUZXh0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90ZXh0X2hpZ2hsaWdodF9ydWxlc1wiKS5UZXh0SGlnaGxpZ2h0UnVsZXM7XG5cbnZhciBDc291bmRQcmVwcm9jZXNzb3JIaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uKGVtYmVkZGVkUnVsZVByZWZpeCkge1xuXG4gICAgdGhpcy5lbWJlZGRlZFJ1bGVQcmVmaXggPSBlbWJlZGRlZFJ1bGVQcmVmaXggPT09IHVuZGVmaW5lZCA/IFwiXCIgOiBlbWJlZGRlZFJ1bGVQcmVmaXg7XG5cbiAgICB0aGlzLnNlbWljb2xvbkNvbW1lbnRzID0ge1xuICAgICAgICB0b2tlbiA6IFwiY29tbWVudC5saW5lLnNlbWljb2xvbi5jc291bmRcIixcbiAgICAgICAgcmVnZXggOiBcIjsuKiRcIlxuICAgIH07XG5cbiAgICB0aGlzLmNvbW1lbnRzID0gW1xuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbiA6IFwicHVuY3R1YXRpb24uZGVmaW5pdGlvbi5jb21tZW50LmJlZ2luLmNzb3VuZFwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIi9cXFxcKlwiLFxuICAgICAgICAgICAgcHVzaCAgOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IFwicHVuY3R1YXRpb24uZGVmaW5pdGlvbi5jb21tZW50LmVuZC5jc291bmRcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwqL1wiLFxuICAgICAgICAgICAgICAgICAgICBuZXh0ICA6IFwicG9wXCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJjb21tZW50LmJsb2NrLmNzb3VuZFwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudC5saW5lLmRvdWJsZS1zbGFzaC5jc291bmRcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCIvLy4qJFwiXG4gICAgICAgIH0sXG4gICAgICAgIHRoaXMuc2VtaWNvbG9uQ29tbWVudHNcbiAgICBdO1xuXG4gICAgdGhpcy5tYWNyb1VzZXMgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuIDogW1wiZW50aXR5Lm5hbWUuZnVuY3Rpb24ucHJlcHJvY2Vzc29yLmNzb3VuZFwiLCBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24ubWFjcm8tcGFyYW1ldGVyLXZhbHVlLWxpc3QuYmVnaW4uY3NvdW5kXCJdLFxuICAgICAgICAgICAgcmVnZXggOiAvKFxcJFtBLVpfYS16XVxcdypcXC4/KShcXCgpLyxcbiAgICAgICAgICAgIG5leHQgIDogXCJtYWNybyBwYXJhbWV0ZXIgdmFsdWUgbGlzdFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJlbnRpdHkubmFtZS5mdW5jdGlvbi5wcmVwcm9jZXNzb3IuY3NvdW5kXCIsXG4gICAgICAgICAgICByZWdleCA6IC9cXCRbQS1aX2Etel1cXHcqKD86XFwufFxcYikvXG4gICAgICAgIH1cbiAgICBdO1xuXG4gICAgdGhpcy5udW1iZXJzID0gW1xuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpYy5mbG9hdC5jc291bmRcIixcbiAgICAgICAgICAgIHJlZ2V4IDogLyg/OlxcZCtbRWVdWystXT9cXGQrKXwoPzpcXGQrXFwuXFxkKnxcXGQqXFwuXFxkKykoPzpbRWVdWystXT9cXGQrKT8vXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogW1wic3RvcmFnZS50eXBlLm51bWJlci5jc291bmRcIiwgXCJjb25zdGFudC5udW1lcmljLmludGVnZXIuaGV4YWRlY2ltYWwuY3NvdW5kXCJdLFxuICAgICAgICAgICAgcmVnZXggOiAvKDBbWHhdKShbMC05QS1GYS1mXSspL1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpYy5pbnRlZ2VyLmRlY2ltYWwuY3NvdW5kXCIsXG4gICAgICAgICAgICByZWdleCA6IC9cXGQrL1xuICAgICAgICB9XG4gICAgXTtcblxuICAgIHRoaXMuYnJhY2VkU3RyaW5nQ29udGVudHMgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5jaGFyYWN0ZXIuZXNjYXBlLmNzb3VuZFwiLFxuICAgICAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2Nzb3VuZC9jc291bmQvc2VhcmNoP3E9dW5xdW90ZV9zdHJpbmcrcGF0aCUzQUVuZ2luZStmaWxlbmFtZSUzQWNzb3VuZF9vcmNfY29tcGlsZS5jXG4gICAgICAgICAgICByZWdleCA6IC9cXFxcKD86W1xcXFxhYm5ydFwiXXxbMC03XXsxLDN9KS9cbiAgICAgICAgfSxcbiAgICAgICAgLy8gRm9ybWF0IHNwZWNpZmllcnMgYXJlIGluY2x1ZGVkIGluIHF1b3RlZCBhbmQgYnJhY2VkIHN0cmluZ3MuIFRoaXNcbiAgICAgICAgLy8gbWVhbnMgdGhhdCBmb3JtYXQgc3BlY2lmaWVycyBhcmUgaGlnaGxpZ2h0ZWQgaW4gYWxsIHN0cmluZ3MsIGV2ZW5cbiAgICAgICAgLy8gdGhvdWdoIG9ubHlcbiAgICAgICAgLy8gICBmcHJpbnRrcyAgICAgICAgaHR0cHM6Ly9jc291bmQuY29tL2RvY3MvbWFudWFsL2ZwcmludGtzLmh0bWxcbiAgICAgICAgLy8gICBmcHJpbnRzICAgICAgICAgaHR0cHM6Ly9jc291bmQuY29tL2RvY3MvbWFudWFsL2ZwcmludHMuaHRtbFxuICAgICAgICAvLyAgIHByaW50Zi9wcmludGZfaSBodHRwczovL2Nzb3VuZC5jb20vZG9jcy9tYW51YWwvcHJpbnRmLmh0bWxcbiAgICAgICAgLy8gICBwcmludGtzICAgICAgICAgaHR0cHM6Ly9jc291bmQuY29tL2RvY3MvbWFudWFsL3ByaW50a3MuaHRtbFxuICAgICAgICAvLyAgIHByaW50cyAgICAgICAgICBodHRwczovL2Nzb3VuZC5jb20vZG9jcy9tYW51YWwvcHJpbnRzLmh0bWxcbiAgICAgICAgLy8gICBzcHJpbnRmICAgICAgICAgaHR0cHM6Ly9jc291bmQuY29tL2RvY3MvbWFudWFsL3NwcmludGYuaHRtbFxuICAgICAgICAvLyAgIHNwcmludGZrICAgICAgICBodHRwczovL2Nzb3VuZC5jb20vZG9jcy9tYW51YWwvc3ByaW50ZmsuaHRtbFxuICAgICAgICAvLyB3b3JrIHdpdGggc3RyaW5ncyB0aGF0IGNvbnRhaW4gZm9ybWF0IHNwZWNpZmllcnMuIEluIGFkZGl0aW9uLCB0aGVzZVxuICAgICAgICAvLyBvcGNvZGVz4oCZIGhhbmRsaW5nIG9mIGZvcm1hdCBzcGVjaWZpZXJzIGlzIGluY29uc2lzdGVudDpcbiAgICAgICAgLy8gICAtIGZwcmludGtzLCBmcHJpbnRzLCBwcmludGtzLCBhbmQgcHJpbnRzIGRvIGFjY2VwdCAlYSBhbmQgJUFcbiAgICAgICAgLy8gICAgIHNwZWNpZmllcnMsIGJ1dCBjYW7igJl0IGFjY2VwdCAlcyBzcGVjaWZpZXJzLlxuICAgICAgICAvLyAgIC0gcHJpbnRmLCBwcmludGZfaSwgc3ByaW50ZiwgYW5kIHNwcmludGZrIGRvbuKAmXQgYWNjZXB0ICVhIGFuZCAlQVxuICAgICAgICAvLyAgICAgc3BlY2lmaWVycywgYnV0IGRvIGFjY2VwdCAlcyBzcGVjaWZpZXJzLlxuICAgICAgICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2Nzb3VuZC9jc291bmQvaXNzdWVzLzc0NyBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAgICAgICAge1xuICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50LmNoYXJhY3Rlci5wbGFjZWhvbGRlci5jc291bmRcIixcbiAgICAgICAgICAgIHJlZ2V4IDogLyVbIzBcXC0gK10qXFxkKig/OlxcLlxcZCspP1tkaXVveFhmRmVFZ0dhQWNzXS9cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50LmNoYXJhY3Rlci5lc2NhcGUuY3NvdW5kXCIsXG4gICAgICAgICAgICByZWdleCA6IC8lJS9cbiAgICAgICAgfVxuICAgIF07XG5cbiAgICB0aGlzLnF1b3RlZFN0cmluZ0NvbnRlbnRzID0gW1xuICAgICAgICB0aGlzLm1hY3JvVXNlcyxcbiAgICAgICAgdGhpcy5icmFjZWRTdHJpbmdDb250ZW50c1xuICAgIF07XG5cbiAgICB2YXIgc3RhcnQgPSBbXG4gICAgICAgIHRoaXMuY29tbWVudHMsXG5cbiAgICAgICAge1xuICAgICAgICAgICAgdG9rZW4gOiBcImtleXdvcmQucHJlcHJvY2Vzc29yLmNzb3VuZFwiLFxuICAgICAgICAgICAgcmVnZXggOiAvIyg/OmUoPzpuZCg/OmlmKT98bHNlKVxcYnwjIyl8QEA/WyBcXHRdKlxcZCsvXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkLnByZXByb2Nlc3Nvci5jc291bmRcIixcbiAgICAgICAgICAgIHJlZ2V4IDogLyNpbmNsdWRlLyxcbiAgICAgICAgICAgIHB1c2ggIDogW1xuICAgICAgICAgICAgICAgIHRoaXMuY29tbWVudHMsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nLmNzb3VuZFwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleCA6IC8oW14gXFx0XSkoPzouKj9cXDEpLyxcbiAgICAgICAgICAgICAgICAgICAgbmV4dCAgOiBcInBvcFwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwia2V5d29yZC5wcmVwcm9jZXNzb3IuY3NvdW5kXCIsXG4gICAgICAgICAgICByZWdleCA6IC8jaW5jbHVkZXN0ci8sXG4gICAgICAgICAgICBwdXNoICA6IFtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbW1lbnRzLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZy5jc291bmRcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggOiAvKFteIFxcdF0pKD86Lio/XFwxKS8sXG4gICAgICAgICAgICAgICAgICAgIG5leHQgIDogXCJwb3BcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcImtleXdvcmQucHJlcHJvY2Vzc29yLmNzb3VuZFwiLFxuICAgICAgICAgICAgcmVnZXggOiAvI1sgXFx0XSpkZWZpbmUvLFxuICAgICAgICAgICAgbmV4dCAgOiBcImRlZmluZSBkaXJlY3RpdmVcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwia2V5d29yZC5wcmVwcm9jZXNzb3IuY3NvdW5kXCIsXG4gICAgICAgICAgICByZWdleCA6IC8jKD86aWZuP2RlZnx1bmRlZilcXGIvLFxuICAgICAgICAgICAgbmV4dCAgOiBcIm1hY3JvIGRpcmVjdGl2ZVwiXG4gICAgICAgIH0sXG5cbiAgICAgICAgdGhpcy5tYWNyb1VzZXNcbiAgICBdO1xuXG4gICAgdGhpcy4kcnVsZXMgPSB7XG4gICAgICAgIFwic3RhcnRcIjogc3RhcnQsXG5cbiAgICAgICAgXCJkZWZpbmUgZGlyZWN0aXZlXCI6IFtcbiAgICAgICAgICAgIHRoaXMuY29tbWVudHMsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImVudGl0eS5uYW1lLmZ1bmN0aW9uLnByZXByb2Nlc3Nvci5jc291bmRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC9bQS1aX2Etel1cXHcqL1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLm1hY3JvLXBhcmFtZXRlci1uYW1lLWxpc3QuYmVnaW4uY3NvdW5kXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvXFwoLyxcbiAgICAgICAgICAgICAgICBuZXh0ICA6IFwibWFjcm8gcGFyYW1ldGVyIG5hbWUgbGlzdFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24ubWFjcm8uYmVnaW4uY3NvdW5kXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvIy8sXG4gICAgICAgICAgICAgICAgbmV4dCAgOiBcIm1hY3JvIGJvZHlcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBcIm1hY3JvIHBhcmFtZXRlciBuYW1lIGxpc3RcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJ2YXJpYWJsZS5wYXJhbWV0ZXIucHJlcHJvY2Vzc29yLmNzb3VuZFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogL1tBLVpfYS16XVxcdyovXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24ubWFjcm8tcGFyYW1ldGVyLW5hbWUtbGlzdC5lbmQuY3NvdW5kXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvXFwpLyxcbiAgICAgICAgICAgICAgICBuZXh0ICA6IFwiZGVmaW5lIGRpcmVjdGl2ZVwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIFwibWFjcm8gYm9keVwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50LmNoYXJhY3Rlci5lc2NhcGUuY3NvdW5kXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvXFxcXCMvXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24ubWFjcm8uZW5kLmNzb3VuZFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogLyMvLFxuICAgICAgICAgICAgICAgIG5leHQgIDogXCJzdGFydFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3RhcnRcbiAgICAgICAgXSxcblxuICAgICAgICBcIm1hY3JvIGRpcmVjdGl2ZVwiOiBbXG4gICAgICAgICAgICB0aGlzLmNvbW1lbnRzLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJlbnRpdHkubmFtZS5mdW5jdGlvbi5wcmVwcm9jZXNzb3IuY3NvdW5kXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvW0EtWl9hLXpdXFx3Ki8sXG4gICAgICAgICAgICAgICAgbmV4dCAgOiBcInN0YXJ0XCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcblxuICAgICAgICBcIm1hY3JvIHBhcmFtZXRlciB2YWx1ZSBsaXN0XCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwicHVuY3R1YXRpb24uZGVmaW5pdGlvbi5tYWNyby1wYXJhbWV0ZXItdmFsdWUtbGlzdC5lbmQuY3NvdW5kXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvXFwpLyxcbiAgICAgICAgICAgICAgICBuZXh0ICA6IFwic3RhcnRcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnN0cmluZy5iZWdpbi5jc291bmRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC9cIi8sXG4gICAgICAgICAgICAgICAgbmV4dCAgOiBcIm1hY3JvIHBhcmFtZXRlciB2YWx1ZSBxdW90ZWQgc3RyaW5nXCJcbiAgICAgICAgICAgIH0sIHRoaXMucHVzaFJ1bGUoe1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJwdW5jdHVhdGlvbi5tYWNyby1wYXJhbWV0ZXItdmFsdWUtcGFyZW50aGV0aWNhbC5iZWdpbi5jc291bmRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC9cXCgvLFxuICAgICAgICAgICAgICAgIG5leHQgIDogXCJtYWNybyBwYXJhbWV0ZXIgdmFsdWUgcGFyZW50aGV0aWNhbFwiXG4gICAgICAgICAgICB9KSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJwdW5jdHVhdGlvbi5tYWNyby1wYXJhbWV0ZXItdmFsdWUtc2VwYXJhdG9yLmNzb3VuZFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJbIyddXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgXCJtYWNybyBwYXJhbWV0ZXIgdmFsdWUgcXVvdGVkIHN0cmluZ1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50LmNoYXJhY3Rlci5lc2NhcGUuY3NvdW5kXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvXFxcXFsjJygpXS9cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiaW52YWxpZC5pbGxlZ2FsLmNzb3VuZFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogL1sjJygpXS9cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwicHVuY3R1YXRpb24uZGVmaW5pdGlvbi5zdHJpbmcuZW5kLmNzb3VuZFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogL1wiLyxcbiAgICAgICAgICAgICAgICBuZXh0ICA6IFwibWFjcm8gcGFyYW1ldGVyIHZhbHVlIGxpc3RcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRoaXMucXVvdGVkU3RyaW5nQ29udGVudHMsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInN0cmluZy5xdW90ZWQuY3NvdW5kXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgXCJtYWNybyBwYXJhbWV0ZXIgdmFsdWUgcGFyZW50aGV0aWNhbFwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50LmNoYXJhY3Rlci5lc2NhcGUuY3NvdW5kXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvXFxcXFxcKS9cbiAgICAgICAgICAgIH0sIHRoaXMucG9wUnVsZSh7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInB1bmN0dWF0aW9uLm1hY3JvLXBhcmFtZXRlci12YWx1ZS1wYXJlbnRoZXRpY2FsLmVuZC5jc291bmRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC9cXCkvXG4gICAgICAgICAgICB9KSwgdGhpcy5wdXNoUnVsZSh7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInB1bmN0dWF0aW9uLm1hY3JvLXBhcmFtZXRlci12YWx1ZS1wYXJlbnRoZXRpY2FsLmJlZ2luLmNzb3VuZFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogL1xcKC8sXG4gICAgICAgICAgICAgICAgbmV4dCAgOiBcIm1hY3JvIHBhcmFtZXRlciB2YWx1ZSBwYXJlbnRoZXRpY2FsXCJcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgc3RhcnRcbiAgICAgICAgXVxuICAgIH07XG59O1xuXG5vb3AuaW5oZXJpdHMoQ3NvdW5kUHJlcHJvY2Vzc29ySGlnaGxpZ2h0UnVsZXMsIFRleHRIaWdobGlnaHRSdWxlcyk7XG5cbihmdW5jdGlvbigpIHtcblxuICAgIHRoaXMucHVzaFJ1bGUgPSBmdW5jdGlvbihwYXJhbXMpIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocGFyYW1zLm5leHQpKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhcmFtcy5uZXh0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcGFyYW1zLm5leHRbaV0gPSB0aGlzLmVtYmVkZGVkUnVsZVByZWZpeCArIHBhcmFtcy5uZXh0W2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlZ2V4IDogcGFyYW1zLnJlZ2V4LCBvbk1hdGNoOiBmdW5jdGlvbih2YWx1ZSwgY3VycmVudFN0YXRlLCBzdGFjaywgbGluZSkge1xuICAgICAgICAgICAgICAgIGlmIChzdGFjay5sZW5ndGggPT09IDApXG4gICAgICAgICAgICAgICAgICAgIHN0YWNrLnB1c2goY3VycmVudFN0YXRlKTtcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwYXJhbXMubmV4dCkpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXJhbXMubmV4dC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhY2sucHVzaChwYXJhbXMubmV4dFtpXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzdGFjay5wdXNoKHBhcmFtcy5uZXh0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5uZXh0ID0gc3RhY2tbc3RhY2subGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcmFtcy50b2tlbjtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGdldCBuZXh0KCkgeyByZXR1cm4gQXJyYXkuaXNBcnJheShwYXJhbXMubmV4dCkgPyBwYXJhbXMubmV4dFtwYXJhbXMubmV4dC5sZW5ndGggLSAxXSA6IHBhcmFtcy5uZXh0OyB9LFxuICAgICAgICAgICAgc2V0IG5leHQobmV4dCkge1xuICAgICAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShwYXJhbXMubmV4dCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zLm5leHQgPSBuZXh0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGdldCB0b2tlbigpIHsgcmV0dXJuIHBhcmFtcy50b2tlbjsgfVxuICAgICAgICB9O1xuICAgIH07XG5cbiAgICB0aGlzLnBvcFJ1bGUgPSBmdW5jdGlvbihwYXJhbXMpIHtcbiAgICAgICAgaWYgKHBhcmFtcy5uZXh0KSB7XG4gICAgICAgICAgICBwYXJhbXMubmV4dCA9IHRoaXMuZW1iZWRkZWRSdWxlUHJlZml4ICsgcGFyYW1zLm5leHQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVnZXggOiBwYXJhbXMucmVnZXgsIG9uTWF0Y2g6IGZ1bmN0aW9uKHZhbHVlLCBjdXJyZW50U3RhdGUsIHN0YWNrLCBsaW5lKSB7XG4gICAgICAgICAgICAgICAgc3RhY2sucG9wKCk7XG4gICAgICAgICAgICAgICAgaWYgKHBhcmFtcy5uZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YWNrLnB1c2gocGFyYW1zLm5leHQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHQgPSBzdGFja1tzdGFjay5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHQgPSBzdGFjay5sZW5ndGggPiAxID8gc3RhY2tbc3RhY2subGVuZ3RoIC0gMV0gOiBzdGFjay5wb3AoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcmFtcy50b2tlbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9O1xuXG59KS5jYWxsKENzb3VuZFByZXByb2Nlc3NvckhpZ2hsaWdodFJ1bGVzLnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuQ3NvdW5kUHJlcHJvY2Vzc29ySGlnaGxpZ2h0UnVsZXMgPSBDc291bmRQcmVwcm9jZXNzb3JIaWdobGlnaHRSdWxlcztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dE1vZGUgPSByZXF1aXJlKFwiLi90ZXh0XCIpLk1vZGU7XG52YXIgQ3NvdW5kU2NvcmVIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL2Nzb3VuZF9zY29yZV9oaWdobGlnaHRfcnVsZXNcIikuQ3NvdW5kU2NvcmVIaWdobGlnaHRSdWxlcztcblxudmFyIE1vZGUgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLkhpZ2hsaWdodFJ1bGVzID0gQ3NvdW5kU2NvcmVIaWdobGlnaHRSdWxlcztcbn07XG5vb3AuaW5oZXJpdHMoTW9kZSwgVGV4dE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG5cbiAgICB0aGlzLmxpbmVDb21tZW50U3RhcnQgPSBcIjtcIjtcbiAgICB0aGlzLmJsb2NrQ29tbWVudCA9IHtzdGFydDogXCIvKlwiLCBlbmQ6IFwiKi9cIn07XG5cbiAgICB0aGlzLiRpZCA9IFwiYWNlL21vZGUvY3NvdW5kX3Njb3JlXCI7XG59KS5jYWxsKE1vZGUucHJvdG90eXBlKTtcblxuZXhwb3J0cy5Nb2RlID0gTW9kZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG5cbnZhciBDc291bmRQcmVwcm9jZXNzb3JIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL2Nzb3VuZF9wcmVwcm9jZXNzb3JfaGlnaGxpZ2h0X3J1bGVzXCIpLkNzb3VuZFByZXByb2Nlc3NvckhpZ2hsaWdodFJ1bGVzO1xuXG52YXIgQ3NvdW5kU2NvcmVIaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uKGVtYmVkZGVkUnVsZVByZWZpeCkge1xuXG4gICAgQ3NvdW5kUHJlcHJvY2Vzc29ySGlnaGxpZ2h0UnVsZXMuY2FsbCh0aGlzLCBlbWJlZGRlZFJ1bGVQcmVmaXgpO1xuXG4gICAgdGhpcy5xdW90ZWRTdHJpbmdDb250ZW50cy5wdXNoKHtcbiAgICAgICAgdG9rZW4gOiBcImludmFsaWQuaWxsZWdhbC5jc291bmQtc2NvcmVcIixcbiAgICAgICAgcmVnZXggOiAvW15cIl0qJC9cbiAgICB9KTtcblxuICAgIHZhciBzdGFydCA9IHRoaXMuJHJ1bGVzLnN0YXJ0O1xuICAgIHN0YXJ0LnB1c2goXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkLmNvbnRyb2wuY3NvdW5kLXNjb3JlXCIsXG4gICAgICAgICAgICByZWdleCA6IC9bYUJiQ2RlZmlxc3R2eHldL1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICAvLyB3IHN0YXRlbWVudHMgYXJlIGdlbmVyYXRlZCBpbnRlcm5hbGx5IGFuZCBzaG91bGQgbm90IGJlIHVzZWQ7IHNlZVxuICAgICAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2Nzb3VuZC9jc291bmQvaXNzdWVzLzc1MC5cbiAgICAgICAgICAgIHRva2VuIDogXCJpbnZhbGlkLmlsbGVnYWwuY3NvdW5kLXNjb3JlXCIsXG4gICAgICAgICAgICByZWdleCA6IC93L1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICAvLyB6IGlzIG5vdCBhIHN0YXRlbWVudCwgYnV0IHJhdGhlciBhIGNvbnN0YW50IGVxdWFsIHRvXG4gICAgICAgICAgICAvLyA4MDAsMDAwLDAwMCwwMDAuIDgwMCBiaWxsaW9uIHNlY29uZHMgaXMgYWJvdXQgMjUsMzY3LjggeWVhcnMuIFNlZVxuICAgICAgICAgICAgLy8gYWxzbyBodHRwczovL2Nzb3VuZC5naXRodWIuaW8vZG9jcy9tYW51YWwvU2NvcmVUb3AuaHRtbCBhbmRcbiAgICAgICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9jc291bmQvY3NvdW5kL3NlYXJjaD9xPXN0b2YrcGF0aCUzQUVuZ2luZStmaWxlbmFtZSUzQXNyZWFkLmMuXG4gICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpYy5sYW5ndWFnZS5jc291bmQtc2NvcmVcIixcbiAgICAgICAgICAgIHJlZ2V4IDogL3ovXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogW1wia2V5d29yZC5jb250cm9sLmNzb3VuZC1zY29yZVwiLCBcImNvbnN0YW50Lm51bWVyaWMuaW50ZWdlci5kZWNpbWFsLmNzb3VuZC1zY29yZVwiXSxcbiAgICAgICAgICAgIHJlZ2V4IDogLyhbbk5wUF1bcFBdKShcXGQrKS9cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcImtleXdvcmQub3RoZXIuY3NvdW5kLXNjb3JlXCIsXG4gICAgICAgICAgICByZWdleCA6IC9bbW5dLyxcbiAgICAgICAgICAgIHB1c2ggIDogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcImVtcHR5XCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogLyQvLFxuICAgICAgICAgICAgICAgICAgICBuZXh0ICA6IFwicG9wXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHRoaXMuY29tbWVudHMsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IFwiZW50aXR5Lm5hbWUubGFiZWwuY3NvdW5kLXNjb3JlXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogL1tBLVpfYS16XVxcdyovXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwia2V5d29yZC5wcmVwcm9jZXNzb3IuY3NvdW5kLXNjb3JlXCIsXG4gICAgICAgICAgICByZWdleCA6IC9yXFxiLyxcbiAgICAgICAgICAgIG5leHQgIDogXCJyZXBlYXQgc2VjdGlvblwiXG4gICAgICAgIH0sXG5cbiAgICAgICAgdGhpcy5udW1iZXJzLFxuXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkLm9wZXJhdG9yLmNzb3VuZC1zY29yZVwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIlshK1xcXFwtKi9eJSZ8PD4jfi5dXCJcbiAgICAgICAgfSxcblxuICAgICAgICB0aGlzLnB1c2hSdWxlKHtcbiAgICAgICAgICAgIHRva2VuIDogXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnN0cmluZy5iZWdpbi5jc291bmQtc2NvcmVcIixcbiAgICAgICAgICAgIHJlZ2V4IDogL1wiLyxcbiAgICAgICAgICAgIG5leHQgIDogXCJxdW90ZWQgc3RyaW5nXCJcbiAgICAgICAgfSksXG5cbiAgICAgICAgdGhpcy5wdXNoUnVsZSh7XG4gICAgICAgICAgICB0b2tlbiA6IFwicHVuY3R1YXRpb24uYnJhY2VkLWxvb3AuYmVnaW4uY3NvdW5kLXNjb3JlXCIsXG4gICAgICAgICAgICByZWdleCA6IC97LyxcbiAgICAgICAgICAgIG5leHQgIDogXCJsb29wIGFmdGVyIGxlZnQgYnJhY2VcIlxuICAgICAgICB9KVxuICAgICk7XG5cbiAgICB0aGlzLmFkZFJ1bGVzKHtcbiAgICAgICAgXCJyZXBlYXQgc2VjdGlvblwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImVtcHR5XCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvJC8sXG4gICAgICAgICAgICAgICAgbmV4dCAgOiBcInN0YXJ0XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0aGlzLmNvbW1lbnRzLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5udW1lcmljLmludGVnZXIuZGVjaW1hbC5jc291bmQtc2NvcmVcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC9cXGQrLyxcbiAgICAgICAgICAgICAgICBuZXh0ICA6IFwicmVwZWF0IHNlY3Rpb24gYmVmb3JlIGxhYmVsXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgXCJyZXBlYXQgc2VjdGlvbiBiZWZvcmUgbGFiZWxcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJlbXB0eVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogLyQvLFxuICAgICAgICAgICAgICAgIG5leHQgIDogXCJzdGFydFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGhpcy5jb21tZW50cyxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiZW50aXR5Lm5hbWUubGFiZWwuY3NvdW5kLXNjb3JlXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvW0EtWl9hLXpdXFx3Ki8sXG4gICAgICAgICAgICAgICAgbmV4dCAgOiBcInN0YXJ0XCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcblxuICAgICAgICBcInF1b3RlZCBzdHJpbmdcIjogW1xuICAgICAgICAgICAgdGhpcy5wb3BSdWxlKHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwicHVuY3R1YXRpb24uZGVmaW5pdGlvbi5zdHJpbmcuZW5kLmNzb3VuZC1zY29yZVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogL1wiL1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICB0aGlzLnF1b3RlZFN0cmluZ0NvbnRlbnRzLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzdHJpbmcucXVvdGVkLmNzb3VuZC1zY29yZVwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG5cbiAgICAgICAgXCJsb29wIGFmdGVyIGxlZnQgYnJhY2VcIjogW1xuICAgICAgICAgICAgdGhpcy5wb3BSdWxlKHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpYy5pbnRlZ2VyLmRlY2ltYWwuY3NvdW5kLXNjb3JlXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvXFxkKy8sXG4gICAgICAgICAgICAgICAgbmV4dCAgOiBcImxvb3AgYWZ0ZXIgcmVwZWF0IGNvdW50XCJcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgdGhpcy5jb21tZW50cyxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiaW52YWxpZC5pbGxlZ2FsLmNzb3VuZFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogL1xcUy4qL1xuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBcImxvb3AgYWZ0ZXIgcmVwZWF0IGNvdW50XCI6IFtcbiAgICAgICAgICAgIHRoaXMucG9wUnVsZSh7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImVudGl0eS5uYW1lLmZ1bmN0aW9uLnByZXByb2Nlc3Nvci5jc291bmQtc2NvcmVcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC9bQS1aX2Etel1cXHcqXFxiLyxcbiAgICAgICAgICAgICAgICBuZXh0ICA6IFwibG9vcCBhZnRlciBtYWNybyBuYW1lXCJcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgdGhpcy5jb21tZW50cyxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiaW52YWxpZC5pbGxlZ2FsLmNzb3VuZFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogL1xcUy4qL1xuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBcImxvb3AgYWZ0ZXIgbWFjcm8gbmFtZVwiOiBbXG4gICAgICAgICAgICBzdGFydCxcbiAgICAgICAgICAgIHRoaXMucG9wUnVsZSh7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInB1bmN0dWF0aW9uLmJyYWNlZC1sb29wLmVuZC5jc291bmQtc2NvcmVcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC99L1xuICAgICAgICAgICAgfSlcbiAgICAgICAgXVxuICAgIH0pO1xuXG4gICAgdGhpcy5ub3JtYWxpemVSdWxlcygpO1xufTtcblxub29wLmluaGVyaXRzKENzb3VuZFNjb3JlSGlnaGxpZ2h0UnVsZXMsIENzb3VuZFByZXByb2Nlc3NvckhpZ2hsaWdodFJ1bGVzKTtcblxuZXhwb3J0cy5Dc291bmRTY29yZUhpZ2hsaWdodFJ1bGVzID0gQ3NvdW5kU2NvcmVIaWdobGlnaHRSdWxlcztcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==