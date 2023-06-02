"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[6562],{

/***/ 58885:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var DocCommentHighlightRules = (__webpack_require__(62718)/* .DocCommentHighlightRules */ .c);
var TextHighlightRules = (__webpack_require__(28053)/* .TextHighlightRules */ .K);

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

exports.f = CSharpHighlightRules;


/***/ }),

/***/ 62718:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var TextHighlightRules = (__webpack_require__(28053)/* .TextHighlightRules */ .K);

var DocCommentHighlightRules = function () {
    this.$rules = {
        "start": [
            {
                token: "comment.doc.tag",
                regex: "@\\w+(?=\\s|$)"
            }, DocCommentHighlightRules.getTagRule(), {
                defaultToken: "comment.doc",
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
        regex : "\\/\\*(?=\\*)",
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


exports.c = DocCommentHighlightRules;


/***/ }),

/***/ 86562:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var HtmlMode = (__webpack_require__(75528).Mode);
var RazorHighlightRules = (__webpack_require__(65792)/* .RazorHighlightRules */ .h);
var RazorCompletions = (__webpack_require__(9102)/* .RazorCompletions */ .Z);
var HtmlCompletions = (__webpack_require__(18439)/* .HtmlCompletions */ .A);

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

/***/ 9102:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var TokenIterator = (__webpack_require__(39216)/* .TokenIterator */ .N);

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

exports.Z = RazorCompletions;


/***/ }),

/***/ 65792:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var __webpack_unused_export__;


var oop = __webpack_require__(89359);
var lang = __webpack_require__(20124);
var DocCommentHighlightRules = (__webpack_require__(62718)/* .DocCommentHighlightRules */ .c);
var HtmlHighlightRules = (__webpack_require__(72843)/* .HtmlHighlightRules */ .V);
var CSharpHighlightRules = (__webpack_require__(58885)/* .CSharpHighlightRules */ .f);

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
        regex: '@[({]|@functions{',
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
        '@functions{':'}'
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
            regex: "^(\\s*@model)(\\s+)(.+)$"
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

exports.h = RazorHighlightRules;
__webpack_unused_export__ = RazorLangHighlightRules;


/***/ })

}]);
//# sourceMappingURL=bundle.6562.js.map