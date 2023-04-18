"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[9382],{

/***/ 99382:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var HtmlMode = (__webpack_require__(75528).Mode);
var NunjucksHighlightRules = (__webpack_require__(58730)/* .NunjucksHighlightRules */ .q);

var Mode = function() {
    this.HighlightRules = NunjucksHighlightRules;
};

oop.inherits(Mode, HtmlMode);

(function() {
    this.$id = "ace/mode/nunjucks";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 58730:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var TextHighlightRules = (__webpack_require__(28053)/* .TextHighlightRules */ .K);
var HtmlHighlightRules = (__webpack_require__(72843)/* .HtmlHighlightRules */ .V);

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

exports.q = NunjucksHighlightRules;


/***/ })

}]);
//# sourceMappingURL=bundle.9382.js.map