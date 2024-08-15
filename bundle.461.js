"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[461],{

/***/ 30461:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var oop = __webpack_require__(2645);
var JSMode = (__webpack_require__(93388).Mode);
var SJSHighlightRules = (__webpack_require__(8317)/* .SJSHighlightRules */ .w);
var MatchingBraceOutdent = (__webpack_require__(28670).MatchingBraceOutdent);
var CStyleFoldMode = (__webpack_require__(93887)/* .FoldMode */ .l);

var Mode = function() {
    this.HighlightRules = SJSHighlightRules;
    this.$outdent = new MatchingBraceOutdent();
    this.$behaviour = this.$defaultBehaviour;
    this.foldingRules = new CStyleFoldMode();
};
oop.inherits(Mode, JSMode);
(function() {
    // disable jshint
    this.createWorker = function(session) {
        return null;
    };
    this.$id = "ace/mode/sjs";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 8317:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var JavaScriptHighlightRules = (__webpack_require__(15903).JavaScriptHighlightRules);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

var SJSHighlightRules = function() {
    var parent = new JavaScriptHighlightRules({noES6: true});
    var escapedRe = "\\\\(?:x[0-9a-fA-F]{2}|" + // hex
        "u[0-9a-fA-F]{4}|" + // unicode
        "[0-2][0-7]{0,2}|" + // oct
        "3[0-6][0-7]?|" + // oct
        "37[0-7]?|" + // oct
        "[4-7][0-7]?|" + //oct
        ".)";

    var contextAware = function(f) {
        f.isContextAware = true;
        return f;
    };

    var ctxBegin = function(opts) {
        return {
            token: opts.token,
            regex: opts.regex,
            next: contextAware(function(currentState, stack) {
                if (stack.length === 0)
                    stack.unshift(currentState);
                stack.unshift(opts.next);
                return opts.next;
            })
        };
    };

    var ctxEnd = function(opts) {
        return {
            token: opts.token,
            regex: opts.regex,
            next: contextAware(function(currentState, stack) {
                stack.shift();
                return stack[0] || "start";
            })
        };
    };

    this.$rules = parent.$rules;
    this.$rules.no_regex = [
        {
            token: "keyword",
            regex: "(waitfor|or|and|collapse|spawn|retract)\\b"
        },
        {
            token: "keyword.operator",
            regex: "(->|=>|\\.\\.)"
        },
        {
            token: "variable.language",
            regex: "(hold|default)\\b"
        },
        ctxBegin({
            token: "string",
            regex: "`",
            next: "bstring"
        }),
        ctxBegin({
            token: "string",
            regex: '"',
            next: "qqstring"
        }),
        ctxBegin({
            token: "string",
            regex: '"',
            next: "qqstring"
        }),
        {
            token: ["paren.lparen", "text", "paren.rparen"],
            regex: "(\\{)(\\s*)(\\|)",
            next: "block_arguments"
        }

    ].concat(this.$rules.no_regex);

    this.$rules.block_arguments = [
        {
            token: "paren.rparen",
            regex: "\\|",
            next: "no_regex"
        }
    ].concat(this.$rules.function_arguments);

    this.$rules.bstring = [
        {
            token : "constant.language.escape",
            regex : escapedRe
        },
        {
            token : "string",
            regex : "\\\\$",
            next: "bstring"
        },
        ctxBegin({
            token : "paren.lparen",
            regex : "\\$\\{",
            next: "string_interp"
        }),
        ctxBegin({
            token : "paren.lparen",
            regex : "\\$",
            next: "bstring_interp_single"
        }),
        ctxEnd({
            token : "string",
            regex : "`"
        }),
        {
            defaultToken: "string"
        }
    ];
    
    this.$rules.qqstring = [
        {
            token : "constant.language.escape",
            regex : escapedRe
        },
        {
            token : "string",
            regex : "\\\\$",
            next: "qqstring"
        },
        ctxBegin({
            token : "paren.lparen",
            regex : "#\\{",
            next: "string_interp"
        }),
        ctxEnd({
            token : "string",
            regex : '"'
        }),
        {
            defaultToken: "string"
        }
    ];

    // collect all context-aware (or stateless), brace-less
    // states. This gives us most normal highlighting
    // for use within interpreted contexts
    // without interfering with context nesting
    var embeddableRules = [];
    for (var i=0; i < this.$rules.no_regex.length; i++) {
        var rule = this.$rules.no_regex[i];
        var token = String(rule.token);
        if (token.indexOf('paren') == -1 && (!rule.next || rule.next.isContextAware)) {
            embeddableRules.push(rule);
        }
    }

    this.$rules.string_interp = [
        ctxEnd({
            token: "paren.rparen",
            regex: "\\}"
        }),
        ctxBegin({
            token: "paren.lparen",
            regex: '{',
            next: "string_interp"
        })
    ].concat(embeddableRules);

    // backtick strings can have single interpolation, which accept
    // \w+ followed by an optional set of function call parens
    this.$rules.bstring_interp_single = [
        {
            token: ["identifier", "paren.lparen"],
            regex: '(\\w+)(\\()',
            next: 'bstring_interp_single_call'
        },
        // identifier-only match ends this interp
        ctxEnd({
            token : "identifier",
            regex : "\\w*"
        })
    ];
    
    // the call part of a bstring_interp_single
    // is terminated by a close paren `)`, but
    // can have nested parens.
    this.$rules.bstring_interp_single_call = [
        ctxBegin({
            token: "paren.lparen",
            regex: "\\(",
            next: "bstring_interp_single_call"
        }),
        ctxEnd({
            token: "paren.rparen",
            regex: "\\)"
        })
    ].concat(embeddableRules);
};
oop.inherits(SJSHighlightRules, TextHighlightRules);

exports.w = SJSHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjQ2MS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBYTtBQUNiLFVBQVUsbUJBQU8sQ0FBQyxJQUFZO0FBQzlCLGFBQWEsaUNBQTRCO0FBQ3pDLHdCQUF3QixzREFBa0Q7QUFDMUUsMkJBQTJCLGlEQUF3RDtBQUNuRixxQkFBcUIsOENBQW9DOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQsWUFBWTs7Ozs7Ozs7QUN0QkM7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLElBQVk7QUFDOUIsK0JBQStCLHFEQUFnRTtBQUMvRix5QkFBeUIsd0RBQW9EOztBQUU3RTtBQUNBLCtDQUErQyxZQUFZO0FBQzNELHlDQUF5QyxFQUFFO0FBQzNDLHNCQUFzQixFQUFFO0FBQ3hCLG9CQUFvQixJQUFJO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixpQ0FBaUM7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QixTQUFTO0FBQ1Q7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBLFNBQXlCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9zanMuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9zanNfaGlnaGxpZ2h0X3J1bGVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIEpTTW9kZSA9IHJlcXVpcmUoXCIuL2phdmFzY3JpcHRcIikuTW9kZTtcbnZhciBTSlNIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3Nqc19oaWdobGlnaHRfcnVsZXNcIikuU0pTSGlnaGxpZ2h0UnVsZXM7XG52YXIgTWF0Y2hpbmdCcmFjZU91dGRlbnQgPSByZXF1aXJlKFwiLi9tYXRjaGluZ19icmFjZV9vdXRkZW50XCIpLk1hdGNoaW5nQnJhY2VPdXRkZW50O1xudmFyIENTdHlsZUZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZGluZy9jc3R5bGVcIikuRm9sZE1vZGU7XG5cbnZhciBNb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5IaWdobGlnaHRSdWxlcyA9IFNKU0hpZ2hsaWdodFJ1bGVzO1xuICAgIHRoaXMuJG91dGRlbnQgPSBuZXcgTWF0Y2hpbmdCcmFjZU91dGRlbnQoKTtcbiAgICB0aGlzLiRiZWhhdmlvdXIgPSB0aGlzLiRkZWZhdWx0QmVoYXZpb3VyO1xuICAgIHRoaXMuZm9sZGluZ1J1bGVzID0gbmV3IENTdHlsZUZvbGRNb2RlKCk7XG59O1xub29wLmluaGVyaXRzKE1vZGUsIEpTTW9kZSk7XG4oZnVuY3Rpb24oKSB7XG4gICAgLy8gZGlzYWJsZSBqc2hpbnRcbiAgICB0aGlzLmNyZWF0ZVdvcmtlciA9IGZ1bmN0aW9uKHNlc3Npb24pIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcbiAgICB0aGlzLiRpZCA9IFwiYWNlL21vZGUvc2pzXCI7XG59KS5jYWxsKE1vZGUucHJvdG90eXBlKTtcblxuZXhwb3J0cy5Nb2RlID0gTW9kZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgSmF2YVNjcmlwdEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vamF2YXNjcmlwdF9oaWdobGlnaHRfcnVsZXNcIikuSmF2YVNjcmlwdEhpZ2hsaWdodFJ1bGVzO1xudmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcblxudmFyIFNKU0hpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHBhcmVudCA9IG5ldyBKYXZhU2NyaXB0SGlnaGxpZ2h0UnVsZXMoe25vRVM2OiB0cnVlfSk7XG4gICAgdmFyIGVzY2FwZWRSZSA9IFwiXFxcXFxcXFwoPzp4WzAtOWEtZkEtRl17Mn18XCIgKyAvLyBoZXhcbiAgICAgICAgXCJ1WzAtOWEtZkEtRl17NH18XCIgKyAvLyB1bmljb2RlXG4gICAgICAgIFwiWzAtMl1bMC03XXswLDJ9fFwiICsgLy8gb2N0XG4gICAgICAgIFwiM1swLTZdWzAtN10/fFwiICsgLy8gb2N0XG4gICAgICAgIFwiMzdbMC03XT98XCIgKyAvLyBvY3RcbiAgICAgICAgXCJbNC03XVswLTddP3xcIiArIC8vb2N0XG4gICAgICAgIFwiLilcIjtcblxuICAgIHZhciBjb250ZXh0QXdhcmUgPSBmdW5jdGlvbihmKSB7XG4gICAgICAgIGYuaXNDb250ZXh0QXdhcmUgPSB0cnVlO1xuICAgICAgICByZXR1cm4gZjtcbiAgICB9O1xuXG4gICAgdmFyIGN0eEJlZ2luID0gZnVuY3Rpb24ob3B0cykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdG9rZW46IG9wdHMudG9rZW4sXG4gICAgICAgICAgICByZWdleDogb3B0cy5yZWdleCxcbiAgICAgICAgICAgIG5leHQ6IGNvbnRleHRBd2FyZShmdW5jdGlvbihjdXJyZW50U3RhdGUsIHN0YWNrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN0YWNrLmxlbmd0aCA9PT0gMClcbiAgICAgICAgICAgICAgICAgICAgc3RhY2sudW5zaGlmdChjdXJyZW50U3RhdGUpO1xuICAgICAgICAgICAgICAgIHN0YWNrLnVuc2hpZnQob3B0cy5uZXh0KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gb3B0cy5uZXh0O1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgdmFyIGN0eEVuZCA9IGZ1bmN0aW9uKG9wdHMpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRva2VuOiBvcHRzLnRva2VuLFxuICAgICAgICAgICAgcmVnZXg6IG9wdHMucmVnZXgsXG4gICAgICAgICAgICBuZXh0OiBjb250ZXh0QXdhcmUoZnVuY3Rpb24oY3VycmVudFN0YXRlLCBzdGFjaykge1xuICAgICAgICAgICAgICAgIHN0YWNrLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YWNrWzBdIHx8IFwic3RhcnRcIjtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIHRoaXMuJHJ1bGVzID0gcGFyZW50LiRydWxlcztcbiAgICB0aGlzLiRydWxlcy5ub19yZWdleCA9IFtcbiAgICAgICAge1xuICAgICAgICAgICAgdG9rZW46IFwia2V5d29yZFwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiKHdhaXRmb3J8b3J8YW5kfGNvbGxhcHNlfHNwYXdufHJldHJhY3QpXFxcXGJcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbjogXCJrZXl3b3JkLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICByZWdleDogXCIoLT58PT58XFxcXC5cXFxcLilcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbjogXCJ2YXJpYWJsZS5sYW5ndWFnZVwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiKGhvbGR8ZGVmYXVsdClcXFxcYlwiXG4gICAgICAgIH0sXG4gICAgICAgIGN0eEJlZ2luKHtcbiAgICAgICAgICAgIHRva2VuOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgcmVnZXg6IFwiYFwiLFxuICAgICAgICAgICAgbmV4dDogXCJic3RyaW5nXCJcbiAgICAgICAgfSksXG4gICAgICAgIGN0eEJlZ2luKHtcbiAgICAgICAgICAgIHRva2VuOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgcmVnZXg6ICdcIicsXG4gICAgICAgICAgICBuZXh0OiBcInFxc3RyaW5nXCJcbiAgICAgICAgfSksXG4gICAgICAgIGN0eEJlZ2luKHtcbiAgICAgICAgICAgIHRva2VuOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgcmVnZXg6ICdcIicsXG4gICAgICAgICAgICBuZXh0OiBcInFxc3RyaW5nXCJcbiAgICAgICAgfSksXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuOiBbXCJwYXJlbi5scGFyZW5cIiwgXCJ0ZXh0XCIsIFwicGFyZW4ucnBhcmVuXCJdLFxuICAgICAgICAgICAgcmVnZXg6IFwiKFxcXFx7KShcXFxccyopKFxcXFx8KVwiLFxuICAgICAgICAgICAgbmV4dDogXCJibG9ja19hcmd1bWVudHNcIlxuICAgICAgICB9XG5cbiAgICBdLmNvbmNhdCh0aGlzLiRydWxlcy5ub19yZWdleCk7XG5cbiAgICB0aGlzLiRydWxlcy5ibG9ja19hcmd1bWVudHMgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuOiBcInBhcmVuLnJwYXJlblwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiXFxcXHxcIixcbiAgICAgICAgICAgIG5leHQ6IFwibm9fcmVnZXhcIlxuICAgICAgICB9XG4gICAgXS5jb25jYXQodGhpcy4kcnVsZXMuZnVuY3Rpb25fYXJndW1lbnRzKTtcblxuICAgIHRoaXMuJHJ1bGVzLmJzdHJpbmcgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIixcbiAgICAgICAgICAgIHJlZ2V4IDogZXNjYXBlZFJlXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcXFxcXCRcIixcbiAgICAgICAgICAgIG5leHQ6IFwiYnN0cmluZ1wiXG4gICAgICAgIH0sXG4gICAgICAgIGN0eEJlZ2luKHtcbiAgICAgICAgICAgIHRva2VuIDogXCJwYXJlbi5scGFyZW5cIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcJFxcXFx7XCIsXG4gICAgICAgICAgICBuZXh0OiBcInN0cmluZ19pbnRlcnBcIlxuICAgICAgICB9KSxcbiAgICAgICAgY3R4QmVnaW4oe1xuICAgICAgICAgICAgdG9rZW4gOiBcInBhcmVuLmxwYXJlblwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwkXCIsXG4gICAgICAgICAgICBuZXh0OiBcImJzdHJpbmdfaW50ZXJwX3NpbmdsZVwiXG4gICAgICAgIH0pLFxuICAgICAgICBjdHhFbmQoe1xuICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgcmVnZXggOiBcImBcIlxuICAgICAgICB9KSxcbiAgICAgICAge1xuICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInN0cmluZ1wiXG4gICAgICAgIH1cbiAgICBdO1xuICAgIFxuICAgIHRoaXMuJHJ1bGVzLnFxc3RyaW5nID0gW1xuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCIsXG4gICAgICAgICAgICByZWdleCA6IGVzY2FwZWRSZVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiXFxcXFxcXFwkXCIsXG4gICAgICAgICAgICBuZXh0OiBcInFxc3RyaW5nXCJcbiAgICAgICAgfSxcbiAgICAgICAgY3R4QmVnaW4oe1xuICAgICAgICAgICAgdG9rZW4gOiBcInBhcmVuLmxwYXJlblwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIiNcXFxce1wiLFxuICAgICAgICAgICAgbmV4dDogXCJzdHJpbmdfaW50ZXJwXCJcbiAgICAgICAgfSksXG4gICAgICAgIGN0eEVuZCh7XG4gICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICByZWdleCA6ICdcIidcbiAgICAgICAgfSksXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzdHJpbmdcIlxuICAgICAgICB9XG4gICAgXTtcblxuICAgIC8vIGNvbGxlY3QgYWxsIGNvbnRleHQtYXdhcmUgKG9yIHN0YXRlbGVzcyksIGJyYWNlLWxlc3NcbiAgICAvLyBzdGF0ZXMuIFRoaXMgZ2l2ZXMgdXMgbW9zdCBub3JtYWwgaGlnaGxpZ2h0aW5nXG4gICAgLy8gZm9yIHVzZSB3aXRoaW4gaW50ZXJwcmV0ZWQgY29udGV4dHNcbiAgICAvLyB3aXRob3V0IGludGVyZmVyaW5nIHdpdGggY29udGV4dCBuZXN0aW5nXG4gICAgdmFyIGVtYmVkZGFibGVSdWxlcyA9IFtdO1xuICAgIGZvciAodmFyIGk9MDsgaSA8IHRoaXMuJHJ1bGVzLm5vX3JlZ2V4Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBydWxlID0gdGhpcy4kcnVsZXMubm9fcmVnZXhbaV07XG4gICAgICAgIHZhciB0b2tlbiA9IFN0cmluZyhydWxlLnRva2VuKTtcbiAgICAgICAgaWYgKHRva2VuLmluZGV4T2YoJ3BhcmVuJykgPT0gLTEgJiYgKCFydWxlLm5leHQgfHwgcnVsZS5uZXh0LmlzQ29udGV4dEF3YXJlKSkge1xuICAgICAgICAgICAgZW1iZWRkYWJsZVJ1bGVzLnB1c2gocnVsZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLiRydWxlcy5zdHJpbmdfaW50ZXJwID0gW1xuICAgICAgICBjdHhFbmQoe1xuICAgICAgICAgICAgdG9rZW46IFwicGFyZW4ucnBhcmVuXCIsXG4gICAgICAgICAgICByZWdleDogXCJcXFxcfVwiXG4gICAgICAgIH0pLFxuICAgICAgICBjdHhCZWdpbih7XG4gICAgICAgICAgICB0b2tlbjogXCJwYXJlbi5scGFyZW5cIixcbiAgICAgICAgICAgIHJlZ2V4OiAneycsXG4gICAgICAgICAgICBuZXh0OiBcInN0cmluZ19pbnRlcnBcIlxuICAgICAgICB9KVxuICAgIF0uY29uY2F0KGVtYmVkZGFibGVSdWxlcyk7XG5cbiAgICAvLyBiYWNrdGljayBzdHJpbmdzIGNhbiBoYXZlIHNpbmdsZSBpbnRlcnBvbGF0aW9uLCB3aGljaCBhY2NlcHRcbiAgICAvLyBcXHcrIGZvbGxvd2VkIGJ5IGFuIG9wdGlvbmFsIHNldCBvZiBmdW5jdGlvbiBjYWxsIHBhcmVuc1xuICAgIHRoaXMuJHJ1bGVzLmJzdHJpbmdfaW50ZXJwX3NpbmdsZSA9IFtcbiAgICAgICAge1xuICAgICAgICAgICAgdG9rZW46IFtcImlkZW50aWZpZXJcIiwgXCJwYXJlbi5scGFyZW5cIl0sXG4gICAgICAgICAgICByZWdleDogJyhcXFxcdyspKFxcXFwoKScsXG4gICAgICAgICAgICBuZXh0OiAnYnN0cmluZ19pbnRlcnBfc2luZ2xlX2NhbGwnXG4gICAgICAgIH0sXG4gICAgICAgIC8vIGlkZW50aWZpZXItb25seSBtYXRjaCBlbmRzIHRoaXMgaW50ZXJwXG4gICAgICAgIGN0eEVuZCh7XG4gICAgICAgICAgICB0b2tlbiA6IFwiaWRlbnRpZmllclwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIlxcXFx3KlwiXG4gICAgICAgIH0pXG4gICAgXTtcbiAgICBcbiAgICAvLyB0aGUgY2FsbCBwYXJ0IG9mIGEgYnN0cmluZ19pbnRlcnBfc2luZ2xlXG4gICAgLy8gaXMgdGVybWluYXRlZCBieSBhIGNsb3NlIHBhcmVuIGApYCwgYnV0XG4gICAgLy8gY2FuIGhhdmUgbmVzdGVkIHBhcmVucy5cbiAgICB0aGlzLiRydWxlcy5ic3RyaW5nX2ludGVycF9zaW5nbGVfY2FsbCA9IFtcbiAgICAgICAgY3R4QmVnaW4oe1xuICAgICAgICAgICAgdG9rZW46IFwicGFyZW4ubHBhcmVuXCIsXG4gICAgICAgICAgICByZWdleDogXCJcXFxcKFwiLFxuICAgICAgICAgICAgbmV4dDogXCJic3RyaW5nX2ludGVycF9zaW5nbGVfY2FsbFwiXG4gICAgICAgIH0pLFxuICAgICAgICBjdHhFbmQoe1xuICAgICAgICAgICAgdG9rZW46IFwicGFyZW4ucnBhcmVuXCIsXG4gICAgICAgICAgICByZWdleDogXCJcXFxcKVwiXG4gICAgICAgIH0pXG4gICAgXS5jb25jYXQoZW1iZWRkYWJsZVJ1bGVzKTtcbn07XG5vb3AuaW5oZXJpdHMoU0pTSGlnaGxpZ2h0UnVsZXMsIFRleHRIaWdobGlnaHRSdWxlcyk7XG5cbmV4cG9ydHMuU0pTSGlnaGxpZ2h0UnVsZXMgPSBTSlNIaWdobGlnaHRSdWxlcztcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==