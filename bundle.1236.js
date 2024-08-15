"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[1236],{

/***/ 1236:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var HtmlMode = (__webpack_require__(32234).Mode);
var NunjucksHighlightRules = (__webpack_require__(14615)/* .NunjucksHighlightRules */ .D);

var Mode = function() {
    this.HighlightRules = NunjucksHighlightRules;
};

oop.inherits(Mode, HtmlMode);

(function() {
    this.$id = "ace/mode/nunjucks";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 14615:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);
var HtmlHighlightRules = (__webpack_require__(10413).HtmlHighlightRules);

var NunjucksHighlightRules = function() {
    HtmlHighlightRules.call(this);
    this.$rules["start"].unshift({
        token: "punctuation.begin",
        regex: /{{-?/,
        push: [{
            token: "punctuation.end",
            regex: /-?}}/,
            next: "pop"
        },
            {include: "expression"}
        ]
    }, {
        token: "punctuation.begin",
        regex: /{%-?/,
        push: [{
            token: "punctuation.end",
            regex: /-?%}/,
            next: "pop"
        }, {
            token: "constant.language.escape",
            regex: /\b(r\/.*\/[gimy]?)\b/
        },
            {include: "statement"}
        ]
    }, {
        token: "comment.begin",
        regex: /{#/,
        push: [{
            token: "comment.end",
            regex: /#}/,
            next: "pop"
        },
            {defaultToken: "comment"}
        ]
    });
    this.addRules({
        attribute_value: [{
            token: "string.attribute-value.xml",
            regex: "'",
            push: [
                {token: "string.attribute-value.xml", regex: "'", next: "pop"},
                {
                    token: "punctuation.begin",
                    regex: /{{-?/,
                    push: [{
                        token: "punctuation.end",
                        regex: /-?}}/,
                        next: "pop"
                    },
                        {include: "expression"}
                    ]
                },
                {include: "attr_reference"},
                {defaultToken: "string.attribute-value.xml"}
            ]
        }, {
            token: "string.attribute-value.xml",
            regex: '"',
            push: [
                {token: "string.attribute-value.xml", regex: '"', next: "pop"},
                {
                    token: "punctuation.begin",
                    regex: /{{-?/,
                    push: [{
                        token: "punctuation.end",
                        regex: /-?}}/,
                        next: "pop"
                    },
                        {include: "expression"}
                    ]
                },
                {include: "attr_reference"},
                {defaultToken: "string.attribute-value.xml"}
            ]
        }],
        "statement": [{
            token: "keyword.control",
            regex: /\b(block|endblock|extends|endif|elif|for|endfor|asyncEach|endeach|include|asyncAll|endall|macro|endmacro|set|endset|ignore missing|as|from|raw|verbatim|filter|endfilter)\b/
        },
            {include: "expression"}
        ],
        "expression": [{
            token: "constant.language",
            regex: /\b(true|false|none)\b/
        }, {
            token: "string",
            regex: /"/,
            push: [{
                token: "string",
                regex: /"/,
                next: "pop"
            },
                {include: "escapeStrings"},
                {defaultToken: "string"}
            ]
        }, {
            token: "string",
            regex: /'/,
            push: [{
                token: "string",
                regex: /'/,
                next: "pop"
            },
                {include: "escapeStrings"},
                {defaultToken: "string"}
            ]
        }, {
            token: "constant.numeric", // hexadecimal, octal and binary
            regex: /0(?:[xX][0-9a-fA-F]+|[oO][0-7]+|[bB][01]+)\b/
        }, {
            token: "constant.numeric", // decimal integers and floats
            regex: /(?:\d\d*(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+\b)?/
        }, {
            token: "keyword.operator",
            regex: /\+|-|\/\/|\/|%|\*\*|\*|===|==|!==|!=|>=|>|<=|</
        }, {
            token: "keyword.control",
            regex: /\b(and|else|if|in|import|not|or)\b/
        }, {
            token: "support.function",
            regex: /[a-zA-Z_]+(?=\()/
        }, {
            token: "paren.lpar",
            regex: /[(\[{]/
        }, {
            token: "paren.rpar",
            regex: /[)\]}]/
        }, {
            token: "punctuation",
            regex: /[,]/
        }, {
            token: ["punctuation", "support.function"],
            regex: /(\.)([a-zA-Z_][a-zA-Z0-9_]*)(?=\()/
        }, {
            token: ["punctuation", "variable.parameter"],
            regex: /(\.)([a-zA-Z_][a-zA-Z0-9_]*)/
        }, {
            token: ["punctuation", "text", "support.other"],
            regex: /(\|)(\s)*([a-zA-Z_][a-zA-Z0-9_]*)/
        }, {
            token: "variable",
            regex: /[a-zA-Z_][a-zA-Z0-9_]*/
        }
        ],
        "escapeStrings": [{
            token: "constant.language.escape",
            regex: /(\\\\n)|(\\\\)|(\\")|(\\')|(\\a)|(\\b)|(\\f)|(\\n)|(\\r)|(\\t)|(\\v)/
        }, {
            token: "constant.language.escape",
            regex: /\\(?:x[0-9A-F]{2}|(?:U[0-9A-Fa-f]{8})|(?:u[0-9A-Fa-f]{4})|(?:N{[a-zA-Z ]+}))/
        }]
    });

    this.normalizeRules();
};

oop.inherits(NunjucksHighlightRules, TextHighlightRules);

exports.D = NunjucksHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjEyMzYuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLElBQVk7QUFDOUIsZUFBZSxpQ0FBc0I7QUFDckMsNkJBQTZCLDREQUE0RDs7QUFFekY7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVELFlBQVk7Ozs7Ozs7O0FDaEJDOztBQUViLFVBQVUsbUJBQU8sQ0FBQyxJQUFZO0FBQzlCLHlCQUF5Qix3REFBb0Q7QUFDN0UseUJBQXlCLCtDQUFvRDs7QUFFN0U7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBLFNBQVM7QUFDVCxhQUFhO0FBQ2I7QUFDQSxLQUFLO0FBQ0w7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNULGFBQWE7QUFDYjtBQUNBLEtBQUs7QUFDTDtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0EsU0FBUztBQUNULGFBQWE7QUFDYjtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLDZEQUE2RDtBQUM5RTtBQUNBO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQSxvQ0FBb0M7QUFDcEM7QUFDQSxxQkFBcUI7QUFDckIseUJBQXlCO0FBQ3pCO0FBQ0EsaUJBQWlCO0FBQ2pCLGlCQUFpQiwwQkFBMEI7QUFDM0MsaUJBQWlCO0FBQ2pCO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQiw2REFBNkQ7QUFDOUU7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0Esb0NBQW9DO0FBQ3BDO0FBQ0EscUJBQXFCO0FBQ3JCLHlCQUF5QjtBQUN6QjtBQUNBLGlCQUFpQjtBQUNqQixpQkFBaUIsMEJBQTBCO0FBQzNDLGlCQUFpQjtBQUNqQjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixpQkFBaUIseUJBQXlCO0FBQzFDLGlCQUFpQjtBQUNqQjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsaUJBQWlCLHlCQUF5QjtBQUMxQyxpQkFBaUI7QUFDakI7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EseUJBQXlCO0FBQ3pCLFNBQVM7QUFDVDtBQUNBLHlCQUF5QjtBQUN6QixTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLG1DQUFtQyxFQUFFLGlCQUFpQixFQUFFLGtCQUFrQixFQUFFLE9BQU8sV0FBVztBQUM5RixTQUFTO0FBQ1QsS0FBSzs7QUFFTDtBQUNBOztBQUVBOztBQUVBLFNBQThCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9udW5qdWNrcy5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL251bmp1Y2tzX2hpZ2hsaWdodF9ydWxlcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIEh0bWxNb2RlID0gcmVxdWlyZShcIi4vaHRtbFwiKS5Nb2RlO1xudmFyIE51bmp1Y2tzSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9udW5qdWNrc19oaWdobGlnaHRfcnVsZXNcIikuTnVuanVja3NIaWdobGlnaHRSdWxlcztcblxudmFyIE1vZGUgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLkhpZ2hsaWdodFJ1bGVzID0gTnVuanVja3NIaWdobGlnaHRSdWxlcztcbn07XG5cbm9vcC5pbmhlcml0cyhNb2RlLCBIdG1sTW9kZSk7XG5cbihmdW5jdGlvbigpIHtcbiAgICB0aGlzLiRpZCA9IFwiYWNlL21vZGUvbnVuanVja3NcIjtcbn0pLmNhbGwoTW9kZS5wcm90b3R5cGUpO1xuXG5leHBvcnRzLk1vZGUgPSBNb2RlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90ZXh0X2hpZ2hsaWdodF9ydWxlc1wiKS5UZXh0SGlnaGxpZ2h0UnVsZXM7XG52YXIgSHRtbEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vaHRtbF9oaWdobGlnaHRfcnVsZXNcIikuSHRtbEhpZ2hsaWdodFJ1bGVzO1xuXG52YXIgTnVuanVja3NIaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uKCkge1xuICAgIEh0bWxIaWdobGlnaHRSdWxlcy5jYWxsKHRoaXMpO1xuICAgIHRoaXMuJHJ1bGVzW1wic3RhcnRcIl0udW5zaGlmdCh7XG4gICAgICAgIHRva2VuOiBcInB1bmN0dWF0aW9uLmJlZ2luXCIsXG4gICAgICAgIHJlZ2V4OiAve3stPy8sXG4gICAgICAgIHB1c2g6IFt7XG4gICAgICAgICAgICB0b2tlbjogXCJwdW5jdHVhdGlvbi5lbmRcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvLT99fS8sXG4gICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgIH0sXG4gICAgICAgICAgICB7aW5jbHVkZTogXCJleHByZXNzaW9uXCJ9XG4gICAgICAgIF1cbiAgICB9LCB7XG4gICAgICAgIHRva2VuOiBcInB1bmN0dWF0aW9uLmJlZ2luXCIsXG4gICAgICAgIHJlZ2V4OiAveyUtPy8sXG4gICAgICAgIHB1c2g6IFt7XG4gICAgICAgICAgICB0b2tlbjogXCJwdW5jdHVhdGlvbi5lbmRcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvLT8lfS8sXG4gICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLFxuICAgICAgICAgICAgcmVnZXg6IC9cXGIoclxcLy4qXFwvW2dpbXldPylcXGIvXG4gICAgICAgIH0sXG4gICAgICAgICAgICB7aW5jbHVkZTogXCJzdGF0ZW1lbnRcIn1cbiAgICAgICAgXVxuICAgIH0sIHtcbiAgICAgICAgdG9rZW46IFwiY29tbWVudC5iZWdpblwiLFxuICAgICAgICByZWdleDogL3sjLyxcbiAgICAgICAgcHVzaDogW3tcbiAgICAgICAgICAgIHRva2VuOiBcImNvbW1lbnQuZW5kXCIsXG4gICAgICAgICAgICByZWdleDogLyN9LyxcbiAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgfSxcbiAgICAgICAgICAgIHtkZWZhdWx0VG9rZW46IFwiY29tbWVudFwifVxuICAgICAgICBdXG4gICAgfSk7XG4gICAgdGhpcy5hZGRSdWxlcyh7XG4gICAgICAgIGF0dHJpYnV0ZV92YWx1ZTogW3tcbiAgICAgICAgICAgIHRva2VuOiBcInN0cmluZy5hdHRyaWJ1dGUtdmFsdWUueG1sXCIsXG4gICAgICAgICAgICByZWdleDogXCInXCIsXG4gICAgICAgICAgICBwdXNoOiBbXG4gICAgICAgICAgICAgICAge3Rva2VuOiBcInN0cmluZy5hdHRyaWJ1dGUtdmFsdWUueG1sXCIsIHJlZ2V4OiBcIidcIiwgbmV4dDogXCJwb3BcIn0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJwdW5jdHVhdGlvbi5iZWdpblwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleDogL3t7LT8vLFxuICAgICAgICAgICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwicHVuY3R1YXRpb24uZW5kXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWdleDogLy0/fX0vLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2luY2x1ZGU6IFwiZXhwcmVzc2lvblwifVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7aW5jbHVkZTogXCJhdHRyX3JlZmVyZW5jZVwifSxcbiAgICAgICAgICAgICAgICB7ZGVmYXVsdFRva2VuOiBcInN0cmluZy5hdHRyaWJ1dGUtdmFsdWUueG1sXCJ9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInN0cmluZy5hdHRyaWJ1dGUtdmFsdWUueG1sXCIsXG4gICAgICAgICAgICByZWdleDogJ1wiJyxcbiAgICAgICAgICAgIHB1c2g6IFtcbiAgICAgICAgICAgICAgICB7dG9rZW46IFwic3RyaW5nLmF0dHJpYnV0ZS12YWx1ZS54bWxcIiwgcmVnZXg6ICdcIicsIG5leHQ6IFwicG9wXCJ9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwicHVuY3R1YXRpb24uYmVnaW5cIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXg6IC97ey0/LyxcbiAgICAgICAgICAgICAgICAgICAgcHVzaDogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiBcInB1bmN0dWF0aW9uLmVuZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXg6IC8tP319LyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtpbmNsdWRlOiBcImV4cHJlc3Npb25cIn1cbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge2luY2x1ZGU6IFwiYXR0cl9yZWZlcmVuY2VcIn0sXG4gICAgICAgICAgICAgICAge2RlZmF1bHRUb2tlbjogXCJzdHJpbmcuYXR0cmlidXRlLXZhbHVlLnhtbFwifVxuICAgICAgICAgICAgXVxuICAgICAgICB9XSxcbiAgICAgICAgXCJzdGF0ZW1lbnRcIjogW3tcbiAgICAgICAgICAgIHRva2VuOiBcImtleXdvcmQuY29udHJvbFwiLFxuICAgICAgICAgICAgcmVnZXg6IC9cXGIoYmxvY2t8ZW5kYmxvY2t8ZXh0ZW5kc3xlbmRpZnxlbGlmfGZvcnxlbmRmb3J8YXN5bmNFYWNofGVuZGVhY2h8aW5jbHVkZXxhc3luY0FsbHxlbmRhbGx8bWFjcm98ZW5kbWFjcm98c2V0fGVuZHNldHxpZ25vcmUgbWlzc2luZ3xhc3xmcm9tfHJhd3x2ZXJiYXRpbXxmaWx0ZXJ8ZW5kZmlsdGVyKVxcYi9cbiAgICAgICAgfSxcbiAgICAgICAgICAgIHtpbmNsdWRlOiBcImV4cHJlc3Npb25cIn1cbiAgICAgICAgXSxcbiAgICAgICAgXCJleHByZXNzaW9uXCI6IFt7XG4gICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5sYW5ndWFnZVwiLFxuICAgICAgICAgICAgcmVnZXg6IC9cXGIodHJ1ZXxmYWxzZXxub25lKVxcYi9cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nXCIsXG4gICAgICAgICAgICByZWdleDogL1wiLyxcbiAgICAgICAgICAgIHB1c2g6IFt7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IC9cIi8sXG4gICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7aW5jbHVkZTogXCJlc2NhcGVTdHJpbmdzXCJ9LFxuICAgICAgICAgICAgICAgIHtkZWZhdWx0VG9rZW46IFwic3RyaW5nXCJ9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgcmVnZXg6IC8nLyxcbiAgICAgICAgICAgIHB1c2g6IFt7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IC8nLyxcbiAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtpbmNsdWRlOiBcImVzY2FwZVN0cmluZ3NcIn0sXG4gICAgICAgICAgICAgICAge2RlZmF1bHRUb2tlbjogXCJzdHJpbmdcIn1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQubnVtZXJpY1wiLCAvLyBoZXhhZGVjaW1hbCwgb2N0YWwgYW5kIGJpbmFyeVxuICAgICAgICAgICAgcmVnZXg6IC8wKD86W3hYXVswLTlhLWZBLUZdK3xbb09dWzAtN10rfFtiQl1bMDFdKylcXGIvXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lm51bWVyaWNcIiwgLy8gZGVjaW1hbCBpbnRlZ2VycyBhbmQgZmxvYXRzXG4gICAgICAgICAgICByZWdleDogLyg/OlxcZFxcZCooPzpcXC5cXGQqKT98XFwuXFxkKykoPzpbZUVdWystXT9cXGQrXFxiKT8vXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcImtleXdvcmQub3BlcmF0b3JcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXFwrfC18XFwvXFwvfFxcL3wlfFxcKlxcKnxcXCp8PT09fD09fCE9PXwhPXw+PXw+fDw9fDwvXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcImtleXdvcmQuY29udHJvbFwiLFxuICAgICAgICAgICAgcmVnZXg6IC9cXGIoYW5kfGVsc2V8aWZ8aW58aW1wb3J0fG5vdHxvcilcXGIvXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInN1cHBvcnQuZnVuY3Rpb25cIixcbiAgICAgICAgICAgIHJlZ2V4OiAvW2EtekEtWl9dKyg/PVxcKCkvXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInBhcmVuLmxwYXJcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvWyhcXFt7XS9cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwicGFyZW4ucnBhclwiLFxuICAgICAgICAgICAgcmVnZXg6IC9bKVxcXX1dL1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJwdW5jdHVhdGlvblwiLFxuICAgICAgICAgICAgcmVnZXg6IC9bLF0vXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBbXCJwdW5jdHVhdGlvblwiLCBcInN1cHBvcnQuZnVuY3Rpb25cIl0sXG4gICAgICAgICAgICByZWdleDogLyhcXC4pKFthLXpBLVpfXVthLXpBLVowLTlfXSopKD89XFwoKS9cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFtcInB1bmN0dWF0aW9uXCIsIFwidmFyaWFibGUucGFyYW1ldGVyXCJdLFxuICAgICAgICAgICAgcmVnZXg6IC8oXFwuKShbYS16QS1aX11bYS16QS1aMC05X10qKS9cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFtcInB1bmN0dWF0aW9uXCIsIFwidGV4dFwiLCBcInN1cHBvcnQub3RoZXJcIl0sXG4gICAgICAgICAgICByZWdleDogLyhcXHwpKFxccykqKFthLXpBLVpfXVthLXpBLVowLTlfXSopL1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJ2YXJpYWJsZVwiLFxuICAgICAgICAgICAgcmVnZXg6IC9bYS16QS1aX11bYS16QS1aMC05X10qL1xuICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIFwiZXNjYXBlU3RyaW5nc1wiOiBbe1xuICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCIsXG4gICAgICAgICAgICByZWdleDogLyhcXFxcXFxcXG4pfChcXFxcXFxcXCl8KFxcXFxcIil8KFxcXFwnKXwoXFxcXGEpfChcXFxcYil8KFxcXFxmKXwoXFxcXG4pfChcXFxccil8KFxcXFx0KXwoXFxcXHYpL1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXFxcXCg/OnhbMC05QS1GXXsyfXwoPzpVWzAtOUEtRmEtZl17OH0pfCg/OnVbMC05QS1GYS1mXXs0fSl8KD86TntbYS16QS1aIF0rfSkpL1xuICAgICAgICB9XVxuICAgIH0pO1xuXG4gICAgdGhpcy5ub3JtYWxpemVSdWxlcygpO1xufTtcblxub29wLmluaGVyaXRzKE51bmp1Y2tzSGlnaGxpZ2h0UnVsZXMsIFRleHRIaWdobGlnaHRSdWxlcyk7XG5cbmV4cG9ydHMuTnVuanVja3NIaWdobGlnaHRSdWxlcyA9IE51bmp1Y2tzSGlnaGxpZ2h0UnVsZXM7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=