"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[4116],{

/***/ 24116:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var oop = __webpack_require__(89359);
var JSMode = (__webpack_require__(88057).Mode);
var SJSHighlightRules = (__webpack_require__(78377)/* .SJSHighlightRules */ .n);
var MatchingBraceOutdent = (__webpack_require__(1164).MatchingBraceOutdent);
var CStyleFoldMode = (__webpack_require__(12764)/* .FoldMode */ .Z);

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

/***/ 78377:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var JavaScriptHighlightRules = (__webpack_require__(33801).JavaScriptHighlightRules);
var TextHighlightRules = (__webpack_require__(28053)/* .TextHighlightRules */ .K);

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

exports.n = SJSHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjQxMTYuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7QUFDYixVQUFVLG1CQUFPLENBQUMsS0FBWTtBQUM5QixhQUFhLGlDQUE0QjtBQUN6Qyx3QkFBd0IsdURBQWtEO0FBQzFFLDJCQUEyQixnREFBd0Q7QUFDbkYscUJBQXFCLDhDQUFvQzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVELFlBQVk7Ozs7Ozs7O0FDdEJDOztBQUViLFVBQVUsbUJBQU8sQ0FBQyxLQUFZO0FBQzlCLCtCQUErQixxREFBZ0U7QUFDL0YseUJBQXlCLHdEQUFvRDs7QUFFN0U7QUFDQSwrQ0FBK0MsWUFBWTtBQUMzRCx5Q0FBeUMsRUFBRTtBQUMzQyxzQkFBc0IsRUFBRTtBQUN4QixvQkFBb0IsSUFBSTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsaUNBQWlDO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkIsU0FBUztBQUNUO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQSxTQUF5QiIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvc2pzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvc2pzX2hpZ2hsaWdodF9ydWxlcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBKU01vZGUgPSByZXF1aXJlKFwiLi9qYXZhc2NyaXB0XCIpLk1vZGU7XG52YXIgU0pTSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9zanNfaGlnaGxpZ2h0X3J1bGVzXCIpLlNKU0hpZ2hsaWdodFJ1bGVzO1xudmFyIE1hdGNoaW5nQnJhY2VPdXRkZW50ID0gcmVxdWlyZShcIi4vbWF0Y2hpbmdfYnJhY2Vfb3V0ZGVudFwiKS5NYXRjaGluZ0JyYWNlT3V0ZGVudDtcbnZhciBDU3R5bGVGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRpbmcvY3N0eWxlXCIpLkZvbGRNb2RlO1xuXG52YXIgTW9kZSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuSGlnaGxpZ2h0UnVsZXMgPSBTSlNIaWdobGlnaHRSdWxlcztcbiAgICB0aGlzLiRvdXRkZW50ID0gbmV3IE1hdGNoaW5nQnJhY2VPdXRkZW50KCk7XG4gICAgdGhpcy4kYmVoYXZpb3VyID0gdGhpcy4kZGVmYXVsdEJlaGF2aW91cjtcbiAgICB0aGlzLmZvbGRpbmdSdWxlcyA9IG5ldyBDU3R5bGVGb2xkTW9kZSgpO1xufTtcbm9vcC5pbmhlcml0cyhNb2RlLCBKU01vZGUpO1xuKGZ1bmN0aW9uKCkge1xuICAgIC8vIGRpc2FibGUganNoaW50XG4gICAgdGhpcy5jcmVhdGVXb3JrZXIgPSBmdW5jdGlvbihzZXNzaW9uKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG4gICAgdGhpcy4kaWQgPSBcImFjZS9tb2RlL3Nqc1wiO1xufSkuY2FsbChNb2RlLnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTW9kZSA9IE1vZGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIEphdmFTY3JpcHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL2phdmFzY3JpcHRfaGlnaGxpZ2h0X3J1bGVzXCIpLkphdmFTY3JpcHRIaWdobGlnaHRSdWxlcztcbnZhciBUZXh0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90ZXh0X2hpZ2hsaWdodF9ydWxlc1wiKS5UZXh0SGlnaGxpZ2h0UnVsZXM7XG5cbnZhciBTSlNIaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBwYXJlbnQgPSBuZXcgSmF2YVNjcmlwdEhpZ2hsaWdodFJ1bGVzKHtub0VTNjogdHJ1ZX0pO1xuICAgIHZhciBlc2NhcGVkUmUgPSBcIlxcXFxcXFxcKD86eFswLTlhLWZBLUZdezJ9fFwiICsgLy8gaGV4XG4gICAgICAgIFwidVswLTlhLWZBLUZdezR9fFwiICsgLy8gdW5pY29kZVxuICAgICAgICBcIlswLTJdWzAtN117MCwyfXxcIiArIC8vIG9jdFxuICAgICAgICBcIjNbMC02XVswLTddP3xcIiArIC8vIG9jdFxuICAgICAgICBcIjM3WzAtN10/fFwiICsgLy8gb2N0XG4gICAgICAgIFwiWzQtN11bMC03XT98XCIgKyAvL29jdFxuICAgICAgICBcIi4pXCI7XG5cbiAgICB2YXIgY29udGV4dEF3YXJlID0gZnVuY3Rpb24oZikge1xuICAgICAgICBmLmlzQ29udGV4dEF3YXJlID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGY7XG4gICAgfTtcblxuICAgIHZhciBjdHhCZWdpbiA9IGZ1bmN0aW9uKG9wdHMpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRva2VuOiBvcHRzLnRva2VuLFxuICAgICAgICAgICAgcmVnZXg6IG9wdHMucmVnZXgsXG4gICAgICAgICAgICBuZXh0OiBjb250ZXh0QXdhcmUoZnVuY3Rpb24oY3VycmVudFN0YXRlLCBzdGFjaykge1xuICAgICAgICAgICAgICAgIGlmIChzdGFjay5sZW5ndGggPT09IDApXG4gICAgICAgICAgICAgICAgICAgIHN0YWNrLnVuc2hpZnQoY3VycmVudFN0YXRlKTtcbiAgICAgICAgICAgICAgICBzdGFjay51bnNoaWZ0KG9wdHMubmV4dCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9wdHMubmV4dDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIHZhciBjdHhFbmQgPSBmdW5jdGlvbihvcHRzKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0b2tlbjogb3B0cy50b2tlbixcbiAgICAgICAgICAgIHJlZ2V4OiBvcHRzLnJlZ2V4LFxuICAgICAgICAgICAgbmV4dDogY29udGV4dEF3YXJlKGZ1bmN0aW9uKGN1cnJlbnRTdGF0ZSwgc3RhY2spIHtcbiAgICAgICAgICAgICAgICBzdGFjay5zaGlmdCgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBzdGFja1swXSB8fCBcInN0YXJ0XCI7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9O1xuICAgIH07XG5cbiAgICB0aGlzLiRydWxlcyA9IHBhcmVudC4kcnVsZXM7XG4gICAgdGhpcy4kcnVsZXMubm9fcmVnZXggPSBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuOiBcImtleXdvcmRcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIih3YWl0Zm9yfG9yfGFuZHxjb2xsYXBzZXxzcGF3bnxyZXRyYWN0KVxcXFxiXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdG9rZW46IFwia2V5d29yZC5vcGVyYXRvclwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiKC0+fD0+fFxcXFwuXFxcXC4pXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdG9rZW46IFwidmFyaWFibGUubGFuZ3VhZ2VcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIihob2xkfGRlZmF1bHQpXFxcXGJcIlxuICAgICAgICB9LFxuICAgICAgICBjdHhCZWdpbih7XG4gICAgICAgICAgICB0b2tlbjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcImBcIixcbiAgICAgICAgICAgIG5leHQ6IFwiYnN0cmluZ1wiXG4gICAgICAgIH0pLFxuICAgICAgICBjdHhCZWdpbih7XG4gICAgICAgICAgICB0b2tlbjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIHJlZ2V4OiAnXCInLFxuICAgICAgICAgICAgbmV4dDogXCJxcXN0cmluZ1wiXG4gICAgICAgIH0pLFxuICAgICAgICBjdHhCZWdpbih7XG4gICAgICAgICAgICB0b2tlbjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIHJlZ2V4OiAnXCInLFxuICAgICAgICAgICAgbmV4dDogXCJxcXN0cmluZ1wiXG4gICAgICAgIH0pLFxuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbjogW1wicGFyZW4ubHBhcmVuXCIsIFwidGV4dFwiLCBcInBhcmVuLnJwYXJlblwiXSxcbiAgICAgICAgICAgIHJlZ2V4OiBcIihcXFxceykoXFxcXHMqKShcXFxcfClcIixcbiAgICAgICAgICAgIG5leHQ6IFwiYmxvY2tfYXJndW1lbnRzXCJcbiAgICAgICAgfVxuXG4gICAgXS5jb25jYXQodGhpcy4kcnVsZXMubm9fcmVnZXgpO1xuXG4gICAgdGhpcy4kcnVsZXMuYmxvY2tfYXJndW1lbnRzID0gW1xuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbjogXCJwYXJlbi5ycGFyZW5cIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFx8XCIsXG4gICAgICAgICAgICBuZXh0OiBcIm5vX3JlZ2V4XCJcbiAgICAgICAgfVxuICAgIF0uY29uY2F0KHRoaXMuJHJ1bGVzLmZ1bmN0aW9uX2FyZ3VtZW50cyk7XG5cbiAgICB0aGlzLiRydWxlcy5ic3RyaW5nID0gW1xuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCIsXG4gICAgICAgICAgICByZWdleCA6IGVzY2FwZWRSZVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiXFxcXFxcXFwkXCIsXG4gICAgICAgICAgICBuZXh0OiBcImJzdHJpbmdcIlxuICAgICAgICB9LFxuICAgICAgICBjdHhCZWdpbih7XG4gICAgICAgICAgICB0b2tlbiA6IFwicGFyZW4ubHBhcmVuXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiXFxcXCRcXFxce1wiLFxuICAgICAgICAgICAgbmV4dDogXCJzdHJpbmdfaW50ZXJwXCJcbiAgICAgICAgfSksXG4gICAgICAgIGN0eEJlZ2luKHtcbiAgICAgICAgICAgIHRva2VuIDogXCJwYXJlbi5scGFyZW5cIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcJFwiLFxuICAgICAgICAgICAgbmV4dDogXCJic3RyaW5nX2ludGVycF9zaW5nbGVcIlxuICAgICAgICB9KSxcbiAgICAgICAgY3R4RW5kKHtcbiAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJgXCJcbiAgICAgICAgfSksXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzdHJpbmdcIlxuICAgICAgICB9XG4gICAgXTtcbiAgICBcbiAgICB0aGlzLiRydWxlcy5xcXN0cmluZyA9IFtcbiAgICAgICAge1xuICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLFxuICAgICAgICAgICAgcmVnZXggOiBlc2NhcGVkUmVcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgcmVnZXggOiBcIlxcXFxcXFxcJFwiLFxuICAgICAgICAgICAgbmV4dDogXCJxcXN0cmluZ1wiXG4gICAgICAgIH0sXG4gICAgICAgIGN0eEJlZ2luKHtcbiAgICAgICAgICAgIHRva2VuIDogXCJwYXJlbi5scGFyZW5cIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCIjXFxcXHtcIixcbiAgICAgICAgICAgIG5leHQ6IFwic3RyaW5nX2ludGVycFwiXG4gICAgICAgIH0pLFxuICAgICAgICBjdHhFbmQoe1xuICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgcmVnZXggOiAnXCInXG4gICAgICAgIH0pLFxuICAgICAgICB7XG4gICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwic3RyaW5nXCJcbiAgICAgICAgfVxuICAgIF07XG5cbiAgICAvLyBjb2xsZWN0IGFsbCBjb250ZXh0LWF3YXJlIChvciBzdGF0ZWxlc3MpLCBicmFjZS1sZXNzXG4gICAgLy8gc3RhdGVzLiBUaGlzIGdpdmVzIHVzIG1vc3Qgbm9ybWFsIGhpZ2hsaWdodGluZ1xuICAgIC8vIGZvciB1c2Ugd2l0aGluIGludGVycHJldGVkIGNvbnRleHRzXG4gICAgLy8gd2l0aG91dCBpbnRlcmZlcmluZyB3aXRoIGNvbnRleHQgbmVzdGluZ1xuICAgIHZhciBlbWJlZGRhYmxlUnVsZXMgPSBbXTtcbiAgICBmb3IgKHZhciBpPTA7IGkgPCB0aGlzLiRydWxlcy5ub19yZWdleC5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgcnVsZSA9IHRoaXMuJHJ1bGVzLm5vX3JlZ2V4W2ldO1xuICAgICAgICB2YXIgdG9rZW4gPSBTdHJpbmcocnVsZS50b2tlbik7XG4gICAgICAgIGlmICh0b2tlbi5pbmRleE9mKCdwYXJlbicpID09IC0xICYmICghcnVsZS5uZXh0IHx8IHJ1bGUubmV4dC5pc0NvbnRleHRBd2FyZSkpIHtcbiAgICAgICAgICAgIGVtYmVkZGFibGVSdWxlcy5wdXNoKHJ1bGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy4kcnVsZXMuc3RyaW5nX2ludGVycCA9IFtcbiAgICAgICAgY3R4RW5kKHtcbiAgICAgICAgICAgIHRva2VuOiBcInBhcmVuLnJwYXJlblwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiXFxcXH1cIlxuICAgICAgICB9KSxcbiAgICAgICAgY3R4QmVnaW4oe1xuICAgICAgICAgICAgdG9rZW46IFwicGFyZW4ubHBhcmVuXCIsXG4gICAgICAgICAgICByZWdleDogJ3snLFxuICAgICAgICAgICAgbmV4dDogXCJzdHJpbmdfaW50ZXJwXCJcbiAgICAgICAgfSlcbiAgICBdLmNvbmNhdChlbWJlZGRhYmxlUnVsZXMpO1xuXG4gICAgLy8gYmFja3RpY2sgc3RyaW5ncyBjYW4gaGF2ZSBzaW5nbGUgaW50ZXJwb2xhdGlvbiwgd2hpY2ggYWNjZXB0XG4gICAgLy8gXFx3KyBmb2xsb3dlZCBieSBhbiBvcHRpb25hbCBzZXQgb2YgZnVuY3Rpb24gY2FsbCBwYXJlbnNcbiAgICB0aGlzLiRydWxlcy5ic3RyaW5nX2ludGVycF9zaW5nbGUgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuOiBbXCJpZGVudGlmaWVyXCIsIFwicGFyZW4ubHBhcmVuXCJdLFxuICAgICAgICAgICAgcmVnZXg6ICcoXFxcXHcrKShcXFxcKCknLFxuICAgICAgICAgICAgbmV4dDogJ2JzdHJpbmdfaW50ZXJwX3NpbmdsZV9jYWxsJ1xuICAgICAgICB9LFxuICAgICAgICAvLyBpZGVudGlmaWVyLW9ubHkgbWF0Y2ggZW5kcyB0aGlzIGludGVycFxuICAgICAgICBjdHhFbmQoe1xuICAgICAgICAgICAgdG9rZW4gOiBcImlkZW50aWZpZXJcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcdypcIlxuICAgICAgICB9KVxuICAgIF07XG4gICAgXG4gICAgLy8gdGhlIGNhbGwgcGFydCBvZiBhIGJzdHJpbmdfaW50ZXJwX3NpbmdsZVxuICAgIC8vIGlzIHRlcm1pbmF0ZWQgYnkgYSBjbG9zZSBwYXJlbiBgKWAsIGJ1dFxuICAgIC8vIGNhbiBoYXZlIG5lc3RlZCBwYXJlbnMuXG4gICAgdGhpcy4kcnVsZXMuYnN0cmluZ19pbnRlcnBfc2luZ2xlX2NhbGwgPSBbXG4gICAgICAgIGN0eEJlZ2luKHtcbiAgICAgICAgICAgIHRva2VuOiBcInBhcmVuLmxwYXJlblwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiXFxcXChcIixcbiAgICAgICAgICAgIG5leHQ6IFwiYnN0cmluZ19pbnRlcnBfc2luZ2xlX2NhbGxcIlxuICAgICAgICB9KSxcbiAgICAgICAgY3R4RW5kKHtcbiAgICAgICAgICAgIHRva2VuOiBcInBhcmVuLnJwYXJlblwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiXFxcXClcIlxuICAgICAgICB9KVxuICAgIF0uY29uY2F0KGVtYmVkZGFibGVSdWxlcyk7XG59O1xub29wLmluaGVyaXRzKFNKU0hpZ2hsaWdodFJ1bGVzLCBUZXh0SGlnaGxpZ2h0UnVsZXMpO1xuXG5leHBvcnRzLlNKU0hpZ2hsaWdodFJ1bGVzID0gU0pTSGlnaGxpZ2h0UnVsZXM7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=