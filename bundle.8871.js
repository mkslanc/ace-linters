"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[8871],{

/***/ 11775:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var DocCommentHighlightRules = (__webpack_require__(42124)/* .DocCommentHighlightRules */ .l);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

var CSharpHighlightRules = function() {
    var keywordMapper = this.createKeywordMapper({
        "variable.language": "this",
        "keyword": "abstract|async|await|event|new|struct|as|explicit|null|switch|base|extern|object|this|bool|false|operator|throw|break|finally|out|true|byte|fixed|override|try|case|float|params|typeof|catch|for|private|uint|char|foreach|protected|ulong|checked|goto|public|unchecked|class|if|readonly|unsafe|const|implicit|ref|ushort|continue|in|return|using|decimal|int|sbyte|virtual|default|interface|sealed|volatile|delegate|internal|partial|short|void|do|is|sizeof|while|double|lock|stackalloc|else|long|static|enum|namespace|string|var|dynamic",
        "constant.language": "null|true|false"
    }, "identifier");

    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used

    this.$rules = {
        "start" : [
            {
                token : "comment",
                regex : "\\/\\/.*$"
            },
            DocCommentHighlightRules.getStartRule("doc-start"),
            {
                token : "comment", // multi line comment
                regex : "\\/\\*",
                next : "comment"
            }, {
                token : "string", // character
                regex : /'(?:.|\\(:?u[\da-fA-F]+|x[\da-fA-F]+|[tbrf'"n]))?'/
            }, {
                token : "string", start : '"', end : '"|$', next: [
                    {token: "constant.language.escape", regex: /\\(:?u[\da-fA-F]+|x[\da-fA-F]+|[tbrf'"n])/},
                    {token: "invalid", regex: /\\./}
                ]
            }, {
                token : "string", start : '@"', end : '"', next:[
                    {token: "constant.language.escape", regex: '""'}
                ]
            }, {
                token : "string", start : /\$"/, end : '"|$', next: [
                    {token: "constant.language.escape", regex: /\\(:?$)|{{/},
                    {token: "constant.language.escape", regex: /\\(:?u[\da-fA-F]+|x[\da-fA-F]+|[tbrf'"n])/},
                    {token: "invalid", regex: /\\./}
                ]
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
                token : "keyword.operator",
                regex : "!|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^=|\\b(?:in|instanceof|new|delete|typeof|void)"
            }, {
                token : "keyword",
                regex : "^\\s*#(if|else|elif|endif|define|undef|warning|error|line|region|endregion|pragma)"
            }, {
                token : "punctuation.operator",
                regex : "\\?|\\:|\\,|\\;|\\."
            }, {
                token : "paren.lparen",
                regex : "[[({]"
            }, {
                token : "paren.rparen",
                regex : "[\\])}]"
            }, {
                token : "text",
                regex : "\\s+"
            }
        ],
        "comment" : [
            {
                token : "comment", // closing comment
                regex : "\\*\\/",
                next : "start"
            }, {
                defaultToken : "comment"
            }
        ]
    };

    this.embedRules(DocCommentHighlightRules, "doc-",
        [ DocCommentHighlightRules.getEndRule("start") ]);
    this.normalizeRules();
};

oop.inherits(CSharpHighlightRules, TextHighlightRules);

exports.r = CSharpHighlightRules;


/***/ }),

/***/ 42124:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

var DocCommentHighlightRules = function () {
    this.$rules = {
        "start": [
            {
                token: "comment.doc.tag",
                regex: "@\\w+(?=\\s|$)"
            }, DocCommentHighlightRules.getTagRule(), {
                defaultToken: "comment.doc.body",
                caseInsensitive: true
            }
        ]
    };
};

oop.inherits(DocCommentHighlightRules, TextHighlightRules);

DocCommentHighlightRules.getTagRule = function(start) {
    return {
        token : "comment.doc.tag.storage.type",
        regex : "\\b(?:TODO|FIXME|XXX|HACK)\\b"
    };
};

DocCommentHighlightRules.getStartRule = function(start) {
    return {
        token : "comment.doc", // doc comment
        regex: /\/\*\*(?!\/)/,
        next  : start
    };
};

DocCommentHighlightRules.getEndRule = function (start) {
    return {
        token : "comment.doc", // closing comment
        regex : "\\*\\/",
        next  : start
    };
};


exports.l = DocCommentHighlightRules;


/***/ }),

/***/ 78871:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var HtmlMode = (__webpack_require__(32234).Mode);
var RazorHighlightRules = (__webpack_require__(94916)/* .RazorHighlightRules */ .a);
var RazorCompletions = (__webpack_require__(96835)/* .RazorCompletions */ .Q);
var HtmlCompletions = (__webpack_require__(14402).HtmlCompletions);

var Mode = function() {
    HtmlMode.call(this);
    this.$highlightRules = new RazorHighlightRules();
    this.$completer = new RazorCompletions();
    this.$htmlCompleter = new HtmlCompletions();
};
oop.inherits(Mode, HtmlMode);

(function() {
    this.getCompletions = function(state, session, pos, prefix) {
        var razorToken = this.$completer.getCompletions(state, session, pos, prefix);
        var htmlToken = this.$htmlCompleter.getCompletions(state, session, pos, prefix);
        return razorToken.concat(htmlToken);
    };
    
    this.createWorker = function(session) {
        return null;
    };

    this.$id = "ace/mode/razor";
    this.snippetFileId = "ace/snippets/razor";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 96835:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var TokenIterator = (__webpack_require__(99339).TokenIterator);

var keywords = [
    "abstract", "as", "base", "bool",
    "break", "byte", "case", "catch",
    "char", "checked", "class", "const",
    "continue", "decimal", "default", "delegate",
    "do", "double","else","enum",
    "event", "explicit", "extern", "false",
    "finally", "fixed", "float", "for",
    "foreach", "goto", "if", "implicit",
    "in", "int", "interface", "internal",
    "is", "lock", "long", "namespace",
    "new", "null", "object", "operator",
    "out", "override", "params", "private",
    "protected", "public", "readonly", "ref",
    "return", "sbyte", "sealed", "short",
    "sizeof", "stackalloc", "static", "string",
    "struct", "switch", "this", "throw",
    "true", "try", "typeof", "uint",
    "ulong", "unchecked", "unsafe", "ushort",
    "using", "var", "virtual", "void",
    "volatile", "while"];

var shortHands  = [
    "Html", "Model", "Url", "Layout"
];
    
var RazorCompletions = function() {

};

(function() {

    this.getCompletions = function(state, session, pos, prefix) {
        
        if(state.lastIndexOf("razor-short-start") == -1 && state.lastIndexOf("razor-block-start") == -1)
            return [];
        
        var token = session.getTokenAt(pos.row, pos.column);
        if (!token)
            return [];
        
        if(state.lastIndexOf("razor-short-start") != -1) {
            return this.getShortStartCompletions(state, session, pos, prefix);
        }
        
        if(state.lastIndexOf("razor-block-start") != -1) {
            return this.getKeywordCompletions(state, session, pos, prefix);
        }

        
    };
    
    this.getShortStartCompletions = function(state, session, pos, prefix) {
        return shortHands.map(function(element){
            return {
                value: element,
                meta: "keyword",
                score: 1000000
            };
        });
    };

    this.getKeywordCompletions = function(state, session, pos, prefix) {
        return shortHands.concat(keywords).map(function(element){
            return {
                value: element,
                meta: "keyword",
                score: 1000000
            };
        });
    };

}).call(RazorCompletions.prototype);

exports.Q = RazorCompletions;


/***/ }),

/***/ 94916:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var __webpack_unused_export__;


var oop = __webpack_require__(2645);
var lang = __webpack_require__(39955);
var DocCommentHighlightRules = (__webpack_require__(42124)/* .DocCommentHighlightRules */ .l);
var HtmlHighlightRules = (__webpack_require__(10413).HtmlHighlightRules);
var CSharpHighlightRules = (__webpack_require__(11775)/* .CSharpHighlightRules */ .r);

var blockPrefix = 'razor-block-';
var RazorLangHighlightRules = function() {
    CSharpHighlightRules.call(this);

    var processPotentialCallback = function(value, stackItem) {
        if (typeof stackItem === "function")
            return stackItem(value);

        return stackItem;
    };

    var inBraces = 'in-braces';
    this.$rules.start.unshift({
        regex: '[\\[({]',
        onMatch: function(value, state, stack) {
            var prefix = /razor-[^\-]+-/.exec(state)[0];

            stack.unshift(value);
            stack.unshift(prefix + inBraces);
            this.next = prefix + inBraces;
            return 'paren.lparen';
        }
    }, {
        start: "@\\*",
        end: "\\*@",
        token: "comment"
    });

    var parentCloseMap = {
        '{': '}',
        '[': ']',
        '(': ')'
    };

    this.$rules[inBraces] = lang.deepCopy(this.$rules.start);
    this.$rules[inBraces].unshift({
        regex: '[\\])}]',
        onMatch: function(value, state, stack) {
            var open = stack[1];
            if (parentCloseMap[open] !== value)
                return 'invalid.illegal';

            stack.shift(); // exit in-braces block
            stack.shift(); // exit brace marker
            this.next = processPotentialCallback(value, stack[0]) || 'start';
            return 'paren.rparen';
        }
    });
};

oop.inherits(RazorLangHighlightRules, CSharpHighlightRules);

var RazorHighlightRules = function() {
    HtmlHighlightRules.call(this);

    // 'Blocks': @{}, @(), @functions{}

    var blockStartRule = {
        regex: '@[({]|@functions{|@code ?{',
        onMatch: function(value, state, stack) {
            stack.unshift(value);
            stack.unshift('razor-block-start');
            this.next = 'razor-block-start';
            return 'punctuation.block.razor';
        }
    };

    var blockEndMap = {
        '@{': '}',
        '@(': ')',
        '@functions{':'}',
        '@code {':'}',
        '@code{':'}'
    };

    var blockEndRule = {
        regex: '[})]',
        onMatch: function(value, state, stack) {
            var blockStart = stack[1];
            if (blockEndMap[blockStart] !== value)
                return 'invalid.illegal';

            stack.shift(); // exit razor block
            stack.shift(); // remove block type marker
            this.next = stack.shift() || 'start';
            return 'punctuation.block.razor';
        }
    };

    // Short: @Abc.Cde(Xyz).Ef

    var shortStartRule = {
        regex: "@(?![{(])",
        onMatch: function(value, state, stack) {
            stack.unshift("razor-short-start");
            this.next = "razor-short-start";
            return 'punctuation.short.razor';
        }
    };

    var shortEndRule = {
        token: "",
        regex: "(?=[^A-Za-z_\\.()\\[\\]])",
        next: 'pop'
    };

    // Control flow: @if, etc

    var ifStartRule = {
        regex: "@(?=if)",
        onMatch: function(value, state, stack) {
            stack.unshift(function(value) {
                if (value !== '}')
                    return 'start';

                return stack.shift() || 'start';
            });
            this.next = 'razor-block-start';
            return 'punctuation.control.razor';
        }
    };

    // Combined:

    var razorStartRules = [
        {
            start: "@\\*",
            end: "\\*@",
            token: "comment"
        },
        {
            token: ["meta.directive.razor", "text", "identifier"],
            regex: "^(\\s*@(?:model|inject|inherits|implements|attribute|layout|namespace|rendermode|using))(\\s+)(.+)$"
        },
        {
            token: ["meta.directive.razor", "text", "string"],
            regex: "^(\\s*@page)(\\s+)(.*)$"
        },
        blockStartRule,
        //ifStartRule,
        shortStartRule
    ];

    for (var key in this.$rules)
        this.$rules[key].unshift.apply(this.$rules[key], razorStartRules);

    this.embedRules(RazorLangHighlightRules, "razor-block-", [blockEndRule], ["start"]);
    this.embedRules(RazorLangHighlightRules, "razor-short-", [shortEndRule], ["start"]);

    this.normalizeRules();
};

oop.inherits(RazorHighlightRules, HtmlHighlightRules);

exports.a = RazorHighlightRules;
__webpack_unused_export__ = RazorLangHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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cy9hY2UtY29kZS9zcmMvbW9kZS9jc2hhcnBfaGlnaGxpZ2h0X3J1bGVzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvZG9jX2NvbW1lbnRfaGlnaGxpZ2h0X3J1bGVzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvcmF6b3IuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9yYXpvcl9jb21wbGV0aW9ucy5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL3Jhem9yX2hpZ2hsaWdodF9ydWxlcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL2RvY19jb21tZW50X2hpZ2hsaWdodF9ydWxlc1wiKS5Eb2NDb21tZW50SGlnaGxpZ2h0UnVsZXM7XG52YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xuXG52YXIgQ1NoYXJwSGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIga2V5d29yZE1hcHBlciA9IHRoaXMuY3JlYXRlS2V5d29yZE1hcHBlcih7XG4gICAgICAgIFwidmFyaWFibGUubGFuZ3VhZ2VcIjogXCJ0aGlzXCIsXG4gICAgICAgIFwia2V5d29yZFwiOiBcImFic3RyYWN0fGFzeW5jfGF3YWl0fGV2ZW50fG5ld3xzdHJ1Y3R8YXN8ZXhwbGljaXR8bnVsbHxzd2l0Y2h8YmFzZXxleHRlcm58b2JqZWN0fHRoaXN8Ym9vbHxmYWxzZXxvcGVyYXRvcnx0aHJvd3xicmVha3xmaW5hbGx5fG91dHx0cnVlfGJ5dGV8Zml4ZWR8b3ZlcnJpZGV8dHJ5fGNhc2V8ZmxvYXR8cGFyYW1zfHR5cGVvZnxjYXRjaHxmb3J8cHJpdmF0ZXx1aW50fGNoYXJ8Zm9yZWFjaHxwcm90ZWN0ZWR8dWxvbmd8Y2hlY2tlZHxnb3RvfHB1YmxpY3x1bmNoZWNrZWR8Y2xhc3N8aWZ8cmVhZG9ubHl8dW5zYWZlfGNvbnN0fGltcGxpY2l0fHJlZnx1c2hvcnR8Y29udGludWV8aW58cmV0dXJufHVzaW5nfGRlY2ltYWx8aW50fHNieXRlfHZpcnR1YWx8ZGVmYXVsdHxpbnRlcmZhY2V8c2VhbGVkfHZvbGF0aWxlfGRlbGVnYXRlfGludGVybmFsfHBhcnRpYWx8c2hvcnR8dm9pZHxkb3xpc3xzaXplb2Z8d2hpbGV8ZG91YmxlfGxvY2t8c3RhY2thbGxvY3xlbHNlfGxvbmd8c3RhdGljfGVudW18bmFtZXNwYWNlfHN0cmluZ3x2YXJ8ZHluYW1pY1wiLFxuICAgICAgICBcImNvbnN0YW50Lmxhbmd1YWdlXCI6IFwibnVsbHx0cnVlfGZhbHNlXCJcbiAgICB9LCBcImlkZW50aWZpZXJcIik7XG5cbiAgICAvLyByZWdleHAgbXVzdCBub3QgaGF2ZSBjYXB0dXJpbmcgcGFyZW50aGVzZXMuIFVzZSAoPzopIGluc3RlYWQuXG4gICAgLy8gcmVnZXhwcyBhcmUgb3JkZXJlZCAtPiB0aGUgZmlyc3QgbWF0Y2ggaXMgdXNlZFxuXG4gICAgdGhpcy4kcnVsZXMgPSB7XG4gICAgICAgIFwic3RhcnRcIiA6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcL1xcXFwvLiokXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMuZ2V0U3RhcnRSdWxlKFwiZG9jLXN0YXJ0XCIpLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsIC8vIG11bHRpIGxpbmUgY29tbWVudFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcL1xcXFwqXCIsXG4gICAgICAgICAgICAgICAgbmV4dCA6IFwiY29tbWVudFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLCAvLyBjaGFyYWN0ZXJcbiAgICAgICAgICAgICAgICByZWdleCA6IC8nKD86LnxcXFxcKDo/dVtcXGRhLWZBLUZdK3x4W1xcZGEtZkEtRl0rfFt0YnJmJ1wibl0pKT8nL1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIiwgc3RhcnQgOiAnXCInLCBlbmQgOiAnXCJ8JCcsIG5leHQ6IFtcbiAgICAgICAgICAgICAgICAgICAge3Rva2VuOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLCByZWdleDogL1xcXFwoOj91W1xcZGEtZkEtRl0rfHhbXFxkYS1mQS1GXSt8W3RicmYnXCJuXSkvfSxcbiAgICAgICAgICAgICAgICAgICAge3Rva2VuOiBcImludmFsaWRcIiwgcmVnZXg6IC9cXFxcLi99XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIiwgc3RhcnQgOiAnQFwiJywgZW5kIDogJ1wiJywgbmV4dDpbXG4gICAgICAgICAgICAgICAgICAgIHt0b2tlbjogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIiwgcmVnZXg6ICdcIlwiJ31cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLCBzdGFydCA6IC9cXCRcIi8sIGVuZCA6ICdcInwkJywgbmV4dDogW1xuICAgICAgICAgICAgICAgICAgICB7dG9rZW46IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCIsIHJlZ2V4OiAvXFxcXCg6PyQpfHt7L30sXG4gICAgICAgICAgICAgICAgICAgIHt0b2tlbjogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIiwgcmVnZXg6IC9cXFxcKDo/dVtcXGRhLWZBLUZdK3x4W1xcZGEtZkEtRl0rfFt0YnJmJ1wibl0pL30sXG4gICAgICAgICAgICAgICAgICAgIHt0b2tlbjogXCJpbnZhbGlkXCIsIHJlZ2V4OiAvXFxcXC4vfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLCAvLyBoZXhcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiMFt4WF1bMC05YS1mQS1GXStcXFxcYlwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIiwgLy8gZmxvYXRcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiWystXT9cXFxcZCsoPzooPzpcXFxcLlxcXFxkKik/KD86W2VFXVsrLV0/XFxcXGQrKT8pP1xcXFxiXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubGFuZ3VhZ2UuYm9vbGVhblwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIoPzp0cnVlfGZhbHNlKVxcXFxiXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IGtleXdvcmRNYXBwZXIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlthLXpBLVpfJF1bYS16QS1aMC05XyRdKlxcXFxiXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwia2V5d29yZC5vcGVyYXRvclwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIhfFxcXFwkfCV8JnxcXFxcKnxcXFxcLVxcXFwtfFxcXFwtfFxcXFwrXFxcXCt8XFxcXCt8fnw9PT18PT18PXwhPXwhPT18PD18Pj18PDw9fD4+PXw+Pj49fDw+fDx8PnwhfCYmfFxcXFx8XFxcXHx8XFxcXD9cXFxcOnxcXFxcKj18JT18XFxcXCs9fFxcXFwtPXwmPXxcXFxcXj18XFxcXGIoPzppbnxpbnN0YW5jZW9mfG5ld3xkZWxldGV8dHlwZW9mfHZvaWQpXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwia2V5d29yZFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJeXFxcXHMqIyhpZnxlbHNlfGVsaWZ8ZW5kaWZ8ZGVmaW5lfHVuZGVmfHdhcm5pbmd8ZXJyb3J8bGluZXxyZWdpb258ZW5kcmVnaW9ufHByYWdtYSlcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJwdW5jdHVhdGlvbi5vcGVyYXRvclwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcP3xcXFxcOnxcXFxcLHxcXFxcO3xcXFxcLlwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInBhcmVuLmxwYXJlblwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJbWyh7XVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInBhcmVuLnJwYXJlblwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJbXFxcXF0pfV1cIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFxzK1wiXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIFwiY29tbWVudFwiIDogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsIC8vIGNsb3NpbmcgY29tbWVudFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcKlxcXFwvXCIsXG4gICAgICAgICAgICAgICAgbmV4dCA6IFwic3RhcnRcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbiA6IFwiY29tbWVudFwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9O1xuXG4gICAgdGhpcy5lbWJlZFJ1bGVzKERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcywgXCJkb2MtXCIsXG4gICAgICAgIFsgRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLmdldEVuZFJ1bGUoXCJzdGFydFwiKSBdKTtcbiAgICB0aGlzLm5vcm1hbGl6ZVJ1bGVzKCk7XG59O1xuXG5vb3AuaW5oZXJpdHMoQ1NoYXJwSGlnaGxpZ2h0UnVsZXMsIFRleHRIaWdobGlnaHRSdWxlcyk7XG5cbmV4cG9ydHMuQ1NoYXJwSGlnaGxpZ2h0UnVsZXMgPSBDU2hhcnBIaWdobGlnaHRSdWxlcztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xuXG52YXIgRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuJHJ1bGVzID0ge1xuICAgICAgICBcInN0YXJ0XCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJjb21tZW50LmRvYy50YWdcIixcbiAgICAgICAgICAgICAgICByZWdleDogXCJAXFxcXHcrKD89XFxcXHN8JClcIlxuICAgICAgICAgICAgfSwgRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLmdldFRhZ1J1bGUoKSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJjb21tZW50LmRvYy5ib2R5XCIsXG4gICAgICAgICAgICAgICAgY2FzZUluc2Vuc2l0aXZlOiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9O1xufTtcblxub29wLmluaGVyaXRzKERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLmdldFRhZ1J1bGUgPSBmdW5jdGlvbihzdGFydCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHRva2VuIDogXCJjb21tZW50LmRvYy50YWcuc3RvcmFnZS50eXBlXCIsXG4gICAgICAgIHJlZ2V4IDogXCJcXFxcYig/OlRPRE98RklYTUV8WFhYfEhBQ0spXFxcXGJcIlxuICAgIH07XG59O1xuXG5Eb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMuZ2V0U3RhcnRSdWxlID0gZnVuY3Rpb24oc3RhcnQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0b2tlbiA6IFwiY29tbWVudC5kb2NcIiwgLy8gZG9jIGNvbW1lbnRcbiAgICAgICAgcmVnZXg6IC9cXC9cXCpcXCooPyFcXC8pLyxcbiAgICAgICAgbmV4dCAgOiBzdGFydFxuICAgIH07XG59O1xuXG5Eb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMuZ2V0RW5kUnVsZSA9IGZ1bmN0aW9uIChzdGFydCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHRva2VuIDogXCJjb21tZW50LmRvY1wiLCAvLyBjbG9zaW5nIGNvbW1lbnRcbiAgICAgICAgcmVnZXggOiBcIlxcXFwqXFxcXC9cIixcbiAgICAgICAgbmV4dCAgOiBzdGFydFxuICAgIH07XG59O1xuXG5cbmV4cG9ydHMuRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzID0gRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBIdG1sTW9kZSA9IHJlcXVpcmUoXCIuL2h0bWxcIikuTW9kZTtcbnZhciBSYXpvckhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vcmF6b3JfaGlnaGxpZ2h0X3J1bGVzXCIpLlJhem9ySGlnaGxpZ2h0UnVsZXM7XG52YXIgUmF6b3JDb21wbGV0aW9ucyA9IHJlcXVpcmUoXCIuL3Jhem9yX2NvbXBsZXRpb25zXCIpLlJhem9yQ29tcGxldGlvbnM7XG52YXIgSHRtbENvbXBsZXRpb25zID0gcmVxdWlyZShcIi4vaHRtbF9jb21wbGV0aW9uc1wiKS5IdG1sQ29tcGxldGlvbnM7XG5cbnZhciBNb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgSHRtbE1vZGUuY2FsbCh0aGlzKTtcbiAgICB0aGlzLiRoaWdobGlnaHRSdWxlcyA9IG5ldyBSYXpvckhpZ2hsaWdodFJ1bGVzKCk7XG4gICAgdGhpcy4kY29tcGxldGVyID0gbmV3IFJhem9yQ29tcGxldGlvbnMoKTtcbiAgICB0aGlzLiRodG1sQ29tcGxldGVyID0gbmV3IEh0bWxDb21wbGV0aW9ucygpO1xufTtcbm9vcC5pbmhlcml0cyhNb2RlLCBIdG1sTW9kZSk7XG5cbihmdW5jdGlvbigpIHtcbiAgICB0aGlzLmdldENvbXBsZXRpb25zID0gZnVuY3Rpb24oc3RhdGUsIHNlc3Npb24sIHBvcywgcHJlZml4KSB7XG4gICAgICAgIHZhciByYXpvclRva2VuID0gdGhpcy4kY29tcGxldGVyLmdldENvbXBsZXRpb25zKHN0YXRlLCBzZXNzaW9uLCBwb3MsIHByZWZpeCk7XG4gICAgICAgIHZhciBodG1sVG9rZW4gPSB0aGlzLiRodG1sQ29tcGxldGVyLmdldENvbXBsZXRpb25zKHN0YXRlLCBzZXNzaW9uLCBwb3MsIHByZWZpeCk7XG4gICAgICAgIHJldHVybiByYXpvclRva2VuLmNvbmNhdChodG1sVG9rZW4pO1xuICAgIH07XG4gICAgXG4gICAgdGhpcy5jcmVhdGVXb3JrZXIgPSBmdW5jdGlvbihzZXNzaW9uKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG5cbiAgICB0aGlzLiRpZCA9IFwiYWNlL21vZGUvcmF6b3JcIjtcbiAgICB0aGlzLnNuaXBwZXRGaWxlSWQgPSBcImFjZS9zbmlwcGV0cy9yYXpvclwiO1xufSkuY2FsbChNb2RlLnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTW9kZSA9IE1vZGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIFRva2VuSXRlcmF0b3IgPSByZXF1aXJlKFwiLi4vdG9rZW5faXRlcmF0b3JcIikuVG9rZW5JdGVyYXRvcjtcblxudmFyIGtleXdvcmRzID0gW1xuICAgIFwiYWJzdHJhY3RcIiwgXCJhc1wiLCBcImJhc2VcIiwgXCJib29sXCIsXG4gICAgXCJicmVha1wiLCBcImJ5dGVcIiwgXCJjYXNlXCIsIFwiY2F0Y2hcIixcbiAgICBcImNoYXJcIiwgXCJjaGVja2VkXCIsIFwiY2xhc3NcIiwgXCJjb25zdFwiLFxuICAgIFwiY29udGludWVcIiwgXCJkZWNpbWFsXCIsIFwiZGVmYXVsdFwiLCBcImRlbGVnYXRlXCIsXG4gICAgXCJkb1wiLCBcImRvdWJsZVwiLFwiZWxzZVwiLFwiZW51bVwiLFxuICAgIFwiZXZlbnRcIiwgXCJleHBsaWNpdFwiLCBcImV4dGVyblwiLCBcImZhbHNlXCIsXG4gICAgXCJmaW5hbGx5XCIsIFwiZml4ZWRcIiwgXCJmbG9hdFwiLCBcImZvclwiLFxuICAgIFwiZm9yZWFjaFwiLCBcImdvdG9cIiwgXCJpZlwiLCBcImltcGxpY2l0XCIsXG4gICAgXCJpblwiLCBcImludFwiLCBcImludGVyZmFjZVwiLCBcImludGVybmFsXCIsXG4gICAgXCJpc1wiLCBcImxvY2tcIiwgXCJsb25nXCIsIFwibmFtZXNwYWNlXCIsXG4gICAgXCJuZXdcIiwgXCJudWxsXCIsIFwib2JqZWN0XCIsIFwib3BlcmF0b3JcIixcbiAgICBcIm91dFwiLCBcIm92ZXJyaWRlXCIsIFwicGFyYW1zXCIsIFwicHJpdmF0ZVwiLFxuICAgIFwicHJvdGVjdGVkXCIsIFwicHVibGljXCIsIFwicmVhZG9ubHlcIiwgXCJyZWZcIixcbiAgICBcInJldHVyblwiLCBcInNieXRlXCIsIFwic2VhbGVkXCIsIFwic2hvcnRcIixcbiAgICBcInNpemVvZlwiLCBcInN0YWNrYWxsb2NcIiwgXCJzdGF0aWNcIiwgXCJzdHJpbmdcIixcbiAgICBcInN0cnVjdFwiLCBcInN3aXRjaFwiLCBcInRoaXNcIiwgXCJ0aHJvd1wiLFxuICAgIFwidHJ1ZVwiLCBcInRyeVwiLCBcInR5cGVvZlwiLCBcInVpbnRcIixcbiAgICBcInVsb25nXCIsIFwidW5jaGVja2VkXCIsIFwidW5zYWZlXCIsIFwidXNob3J0XCIsXG4gICAgXCJ1c2luZ1wiLCBcInZhclwiLCBcInZpcnR1YWxcIiwgXCJ2b2lkXCIsXG4gICAgXCJ2b2xhdGlsZVwiLCBcIndoaWxlXCJdO1xuXG52YXIgc2hvcnRIYW5kcyAgPSBbXG4gICAgXCJIdG1sXCIsIFwiTW9kZWxcIiwgXCJVcmxcIiwgXCJMYXlvdXRcIlxuXTtcbiAgICBcbnZhciBSYXpvckNvbXBsZXRpb25zID0gZnVuY3Rpb24oKSB7XG5cbn07XG5cbihmdW5jdGlvbigpIHtcblxuICAgIHRoaXMuZ2V0Q29tcGxldGlvbnMgPSBmdW5jdGlvbihzdGF0ZSwgc2Vzc2lvbiwgcG9zLCBwcmVmaXgpIHtcbiAgICAgICAgXG4gICAgICAgIGlmKHN0YXRlLmxhc3RJbmRleE9mKFwicmF6b3Itc2hvcnQtc3RhcnRcIikgPT0gLTEgJiYgc3RhdGUubGFzdEluZGV4T2YoXCJyYXpvci1ibG9jay1zdGFydFwiKSA9PSAtMSlcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgXG4gICAgICAgIHZhciB0b2tlbiA9IHNlc3Npb24uZ2V0VG9rZW5BdChwb3Mucm93LCBwb3MuY29sdW1uKTtcbiAgICAgICAgaWYgKCF0b2tlbilcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgXG4gICAgICAgIGlmKHN0YXRlLmxhc3RJbmRleE9mKFwicmF6b3Itc2hvcnQtc3RhcnRcIikgIT0gLTEpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFNob3J0U3RhcnRDb21wbGV0aW9ucyhzdGF0ZSwgc2Vzc2lvbiwgcG9zLCBwcmVmaXgpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZihzdGF0ZS5sYXN0SW5kZXhPZihcInJhem9yLWJsb2NrLXN0YXJ0XCIpICE9IC0xKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRLZXl3b3JkQ29tcGxldGlvbnMoc3RhdGUsIHNlc3Npb24sIHBvcywgcHJlZml4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIFxuICAgIH07XG4gICAgXG4gICAgdGhpcy5nZXRTaG9ydFN0YXJ0Q29tcGxldGlvbnMgPSBmdW5jdGlvbihzdGF0ZSwgc2Vzc2lvbiwgcG9zLCBwcmVmaXgpIHtcbiAgICAgICAgcmV0dXJuIHNob3J0SGFuZHMubWFwKGZ1bmN0aW9uKGVsZW1lbnQpe1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogZWxlbWVudCxcbiAgICAgICAgICAgICAgICBtZXRhOiBcImtleXdvcmRcIixcbiAgICAgICAgICAgICAgICBzY29yZTogMTAwMDAwMFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMuZ2V0S2V5d29yZENvbXBsZXRpb25zID0gZnVuY3Rpb24oc3RhdGUsIHNlc3Npb24sIHBvcywgcHJlZml4KSB7XG4gICAgICAgIHJldHVybiBzaG9ydEhhbmRzLmNvbmNhdChrZXl3b3JkcykubWFwKGZ1bmN0aW9uKGVsZW1lbnQpe1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogZWxlbWVudCxcbiAgICAgICAgICAgICAgICBtZXRhOiBcImtleXdvcmRcIixcbiAgICAgICAgICAgICAgICBzY29yZTogMTAwMDAwMFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxufSkuY2FsbChSYXpvckNvbXBsZXRpb25zLnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuUmF6b3JDb21wbGV0aW9ucyA9IFJhem9yQ29tcGxldGlvbnM7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIGxhbmcgPSByZXF1aXJlKFwiLi4vbGliL2xhbmdcIik7XG52YXIgRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vZG9jX2NvbW1lbnRfaGlnaGxpZ2h0X3J1bGVzXCIpLkRvY0NvbW1lbnRIaWdobGlnaHRSdWxlcztcbnZhciBIdG1sSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9odG1sX2hpZ2hsaWdodF9ydWxlc1wiKS5IdG1sSGlnaGxpZ2h0UnVsZXM7XG52YXIgQ1NoYXJwSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9jc2hhcnBfaGlnaGxpZ2h0X3J1bGVzXCIpLkNTaGFycEhpZ2hsaWdodFJ1bGVzO1xuXG52YXIgYmxvY2tQcmVmaXggPSAncmF6b3ItYmxvY2stJztcbnZhciBSYXpvckxhbmdIaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uKCkge1xuICAgIENTaGFycEhpZ2hsaWdodFJ1bGVzLmNhbGwodGhpcyk7XG5cbiAgICB2YXIgcHJvY2Vzc1BvdGVudGlhbENhbGxiYWNrID0gZnVuY3Rpb24odmFsdWUsIHN0YWNrSXRlbSkge1xuICAgICAgICBpZiAodHlwZW9mIHN0YWNrSXRlbSA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgICAgICAgcmV0dXJuIHN0YWNrSXRlbSh2YWx1ZSk7XG5cbiAgICAgICAgcmV0dXJuIHN0YWNrSXRlbTtcbiAgICB9O1xuXG4gICAgdmFyIGluQnJhY2VzID0gJ2luLWJyYWNlcyc7XG4gICAgdGhpcy4kcnVsZXMuc3RhcnQudW5zaGlmdCh7XG4gICAgICAgIHJlZ2V4OiAnW1xcXFxbKHtdJyxcbiAgICAgICAgb25NYXRjaDogZnVuY3Rpb24odmFsdWUsIHN0YXRlLCBzdGFjaykge1xuICAgICAgICAgICAgdmFyIHByZWZpeCA9IC9yYXpvci1bXlxcLV0rLS8uZXhlYyhzdGF0ZSlbMF07XG5cbiAgICAgICAgICAgIHN0YWNrLnVuc2hpZnQodmFsdWUpO1xuICAgICAgICAgICAgc3RhY2sudW5zaGlmdChwcmVmaXggKyBpbkJyYWNlcyk7XG4gICAgICAgICAgICB0aGlzLm5leHQgPSBwcmVmaXggKyBpbkJyYWNlcztcbiAgICAgICAgICAgIHJldHVybiAncGFyZW4ubHBhcmVuJztcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAgc3RhcnQ6IFwiQFxcXFwqXCIsXG4gICAgICAgIGVuZDogXCJcXFxcKkBcIixcbiAgICAgICAgdG9rZW46IFwiY29tbWVudFwiXG4gICAgfSk7XG5cbiAgICB2YXIgcGFyZW50Q2xvc2VNYXAgPSB7XG4gICAgICAgICd7JzogJ30nLFxuICAgICAgICAnWyc6ICddJyxcbiAgICAgICAgJygnOiAnKSdcbiAgICB9O1xuXG4gICAgdGhpcy4kcnVsZXNbaW5CcmFjZXNdID0gbGFuZy5kZWVwQ29weSh0aGlzLiRydWxlcy5zdGFydCk7XG4gICAgdGhpcy4kcnVsZXNbaW5CcmFjZXNdLnVuc2hpZnQoe1xuICAgICAgICByZWdleDogJ1tcXFxcXSl9XScsXG4gICAgICAgIG9uTWF0Y2g6IGZ1bmN0aW9uKHZhbHVlLCBzdGF0ZSwgc3RhY2spIHtcbiAgICAgICAgICAgIHZhciBvcGVuID0gc3RhY2tbMV07XG4gICAgICAgICAgICBpZiAocGFyZW50Q2xvc2VNYXBbb3Blbl0gIT09IHZhbHVlKVxuICAgICAgICAgICAgICAgIHJldHVybiAnaW52YWxpZC5pbGxlZ2FsJztcblxuICAgICAgICAgICAgc3RhY2suc2hpZnQoKTsgLy8gZXhpdCBpbi1icmFjZXMgYmxvY2tcbiAgICAgICAgICAgIHN0YWNrLnNoaWZ0KCk7IC8vIGV4aXQgYnJhY2UgbWFya2VyXG4gICAgICAgICAgICB0aGlzLm5leHQgPSBwcm9jZXNzUG90ZW50aWFsQ2FsbGJhY2sodmFsdWUsIHN0YWNrWzBdKSB8fCAnc3RhcnQnO1xuICAgICAgICAgICAgcmV0dXJuICdwYXJlbi5ycGFyZW4nO1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG5vb3AuaW5oZXJpdHMoUmF6b3JMYW5nSGlnaGxpZ2h0UnVsZXMsIENTaGFycEhpZ2hsaWdodFJ1bGVzKTtcblxudmFyIFJhem9ySGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbigpIHtcbiAgICBIdG1sSGlnaGxpZ2h0UnVsZXMuY2FsbCh0aGlzKTtcblxuICAgIC8vICdCbG9ja3MnOiBAe30sIEAoKSwgQGZ1bmN0aW9uc3t9XG5cbiAgICB2YXIgYmxvY2tTdGFydFJ1bGUgPSB7XG4gICAgICAgIHJlZ2V4OiAnQFsoe118QGZ1bmN0aW9uc3t8QGNvZGUgP3snLFxuICAgICAgICBvbk1hdGNoOiBmdW5jdGlvbih2YWx1ZSwgc3RhdGUsIHN0YWNrKSB7XG4gICAgICAgICAgICBzdGFjay51bnNoaWZ0KHZhbHVlKTtcbiAgICAgICAgICAgIHN0YWNrLnVuc2hpZnQoJ3Jhem9yLWJsb2NrLXN0YXJ0Jyk7XG4gICAgICAgICAgICB0aGlzLm5leHQgPSAncmF6b3ItYmxvY2stc3RhcnQnO1xuICAgICAgICAgICAgcmV0dXJuICdwdW5jdHVhdGlvbi5ibG9jay5yYXpvcic7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIGJsb2NrRW5kTWFwID0ge1xuICAgICAgICAnQHsnOiAnfScsXG4gICAgICAgICdAKCc6ICcpJyxcbiAgICAgICAgJ0BmdW5jdGlvbnN7JzonfScsXG4gICAgICAgICdAY29kZSB7JzonfScsXG4gICAgICAgICdAY29kZXsnOid9J1xuICAgIH07XG5cbiAgICB2YXIgYmxvY2tFbmRSdWxlID0ge1xuICAgICAgICByZWdleDogJ1t9KV0nLFxuICAgICAgICBvbk1hdGNoOiBmdW5jdGlvbih2YWx1ZSwgc3RhdGUsIHN0YWNrKSB7XG4gICAgICAgICAgICB2YXIgYmxvY2tTdGFydCA9IHN0YWNrWzFdO1xuICAgICAgICAgICAgaWYgKGJsb2NrRW5kTWFwW2Jsb2NrU3RhcnRdICE9PSB2YWx1ZSlcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2ludmFsaWQuaWxsZWdhbCc7XG5cbiAgICAgICAgICAgIHN0YWNrLnNoaWZ0KCk7IC8vIGV4aXQgcmF6b3IgYmxvY2tcbiAgICAgICAgICAgIHN0YWNrLnNoaWZ0KCk7IC8vIHJlbW92ZSBibG9jayB0eXBlIG1hcmtlclxuICAgICAgICAgICAgdGhpcy5uZXh0ID0gc3RhY2suc2hpZnQoKSB8fCAnc3RhcnQnO1xuICAgICAgICAgICAgcmV0dXJuICdwdW5jdHVhdGlvbi5ibG9jay5yYXpvcic7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gU2hvcnQ6IEBBYmMuQ2RlKFh5eikuRWZcblxuICAgIHZhciBzaG9ydFN0YXJ0UnVsZSA9IHtcbiAgICAgICAgcmVnZXg6IFwiQCg/IVt7KF0pXCIsXG4gICAgICAgIG9uTWF0Y2g6IGZ1bmN0aW9uKHZhbHVlLCBzdGF0ZSwgc3RhY2spIHtcbiAgICAgICAgICAgIHN0YWNrLnVuc2hpZnQoXCJyYXpvci1zaG9ydC1zdGFydFwiKTtcbiAgICAgICAgICAgIHRoaXMubmV4dCA9IFwicmF6b3Itc2hvcnQtc3RhcnRcIjtcbiAgICAgICAgICAgIHJldHVybiAncHVuY3R1YXRpb24uc2hvcnQucmF6b3InO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHZhciBzaG9ydEVuZFJ1bGUgPSB7XG4gICAgICAgIHRva2VuOiBcIlwiLFxuICAgICAgICByZWdleDogXCIoPz1bXkEtWmEtel9cXFxcLigpXFxcXFtcXFxcXV0pXCIsXG4gICAgICAgIG5leHQ6ICdwb3AnXG4gICAgfTtcblxuICAgIC8vIENvbnRyb2wgZmxvdzogQGlmLCBldGNcblxuICAgIHZhciBpZlN0YXJ0UnVsZSA9IHtcbiAgICAgICAgcmVnZXg6IFwiQCg/PWlmKVwiLFxuICAgICAgICBvbk1hdGNoOiBmdW5jdGlvbih2YWx1ZSwgc3RhdGUsIHN0YWNrKSB7XG4gICAgICAgICAgICBzdGFjay51bnNoaWZ0KGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlICE9PSAnfScpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnc3RhcnQnO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YWNrLnNoaWZ0KCkgfHwgJ3N0YXJ0JztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5uZXh0ID0gJ3Jhem9yLWJsb2NrLXN0YXJ0JztcbiAgICAgICAgICAgIHJldHVybiAncHVuY3R1YXRpb24uY29udHJvbC5yYXpvcic7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gQ29tYmluZWQ6XG5cbiAgICB2YXIgcmF6b3JTdGFydFJ1bGVzID0gW1xuICAgICAgICB7XG4gICAgICAgICAgICBzdGFydDogXCJAXFxcXCpcIixcbiAgICAgICAgICAgIGVuZDogXCJcXFxcKkBcIixcbiAgICAgICAgICAgIHRva2VuOiBcImNvbW1lbnRcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbjogW1wibWV0YS5kaXJlY3RpdmUucmF6b3JcIiwgXCJ0ZXh0XCIsIFwiaWRlbnRpZmllclwiXSxcbiAgICAgICAgICAgIHJlZ2V4OiBcIl4oXFxcXHMqQCg/Om1vZGVsfGluamVjdHxpbmhlcml0c3xpbXBsZW1lbnRzfGF0dHJpYnV0ZXxsYXlvdXR8bmFtZXNwYWNlfHJlbmRlcm1vZGV8dXNpbmcpKShcXFxccyspKC4rKSRcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbjogW1wibWV0YS5kaXJlY3RpdmUucmF6b3JcIiwgXCJ0ZXh0XCIsIFwic3RyaW5nXCJdLFxuICAgICAgICAgICAgcmVnZXg6IFwiXihcXFxccypAcGFnZSkoXFxcXHMrKSguKikkXCJcbiAgICAgICAgfSxcbiAgICAgICAgYmxvY2tTdGFydFJ1bGUsXG4gICAgICAgIC8vaWZTdGFydFJ1bGUsXG4gICAgICAgIHNob3J0U3RhcnRSdWxlXG4gICAgXTtcblxuICAgIGZvciAodmFyIGtleSBpbiB0aGlzLiRydWxlcylcbiAgICAgICAgdGhpcy4kcnVsZXNba2V5XS51bnNoaWZ0LmFwcGx5KHRoaXMuJHJ1bGVzW2tleV0sIHJhem9yU3RhcnRSdWxlcyk7XG5cbiAgICB0aGlzLmVtYmVkUnVsZXMoUmF6b3JMYW5nSGlnaGxpZ2h0UnVsZXMsIFwicmF6b3ItYmxvY2stXCIsIFtibG9ja0VuZFJ1bGVdLCBbXCJzdGFydFwiXSk7XG4gICAgdGhpcy5lbWJlZFJ1bGVzKFJhem9yTGFuZ0hpZ2hsaWdodFJ1bGVzLCBcInJhem9yLXNob3J0LVwiLCBbc2hvcnRFbmRSdWxlXSwgW1wic3RhcnRcIl0pO1xuXG4gICAgdGhpcy5ub3JtYWxpemVSdWxlcygpO1xufTtcblxub29wLmluaGVyaXRzKFJhem9ySGlnaGxpZ2h0UnVsZXMsIEh0bWxIaWdobGlnaHRSdWxlcyk7XG5cbmV4cG9ydHMuUmF6b3JIaWdobGlnaHRSdWxlcyA9IFJhem9ySGlnaGxpZ2h0UnVsZXM7XG5leHBvcnRzLlJhem9yTGFuZ0hpZ2hsaWdodFJ1bGVzID0gUmF6b3JMYW5nSGlnaGxpZ2h0UnVsZXM7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=