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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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OztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLFVBQVUsS0FBSztBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDJCQUEyQjtBQUMzQiwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsb0JBQW9COztBQUVwQjtBQUNBLG9CQUFvQixhQUFhO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsV0FBVyxLQUFLO0FBQ2hCO0FBQ0Esb0JBQW9CLElBQUk7QUFDeEI7O0FBRUE7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMkJBQTJCO0FBQzNCLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQztBQUNoQzs7QUFFQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQSxTQUEyQjtBQUMzQix5QkFBK0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2NzaGFycF9oaWdobGlnaHRfcnVsZXMuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9kb2NfY29tbWVudF9oaWdobGlnaHRfcnVsZXMuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9yYXpvci5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL3Jhem9yX2NvbXBsZXRpb25zLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvcmF6b3JfaGlnaGxpZ2h0X3J1bGVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vZG9jX2NvbW1lbnRfaGlnaGxpZ2h0X3J1bGVzXCIpLkRvY0NvbW1lbnRIaWdobGlnaHRSdWxlcztcbnZhciBUZXh0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90ZXh0X2hpZ2hsaWdodF9ydWxlc1wiKS5UZXh0SGlnaGxpZ2h0UnVsZXM7XG5cbnZhciBDU2hhcnBIaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBrZXl3b3JkTWFwcGVyID0gdGhpcy5jcmVhdGVLZXl3b3JkTWFwcGVyKHtcbiAgICAgICAgXCJ2YXJpYWJsZS5sYW5ndWFnZVwiOiBcInRoaXNcIixcbiAgICAgICAgXCJrZXl3b3JkXCI6IFwiYWJzdHJhY3R8YXN5bmN8YXdhaXR8ZXZlbnR8bmV3fHN0cnVjdHxhc3xleHBsaWNpdHxudWxsfHN3aXRjaHxiYXNlfGV4dGVybnxvYmplY3R8dGhpc3xib29sfGZhbHNlfG9wZXJhdG9yfHRocm93fGJyZWFrfGZpbmFsbHl8b3V0fHRydWV8Ynl0ZXxmaXhlZHxvdmVycmlkZXx0cnl8Y2FzZXxmbG9hdHxwYXJhbXN8dHlwZW9mfGNhdGNofGZvcnxwcml2YXRlfHVpbnR8Y2hhcnxmb3JlYWNofHByb3RlY3RlZHx1bG9uZ3xjaGVja2VkfGdvdG98cHVibGljfHVuY2hlY2tlZHxjbGFzc3xpZnxyZWFkb25seXx1bnNhZmV8Y29uc3R8aW1wbGljaXR8cmVmfHVzaG9ydHxjb250aW51ZXxpbnxyZXR1cm58dXNpbmd8ZGVjaW1hbHxpbnR8c2J5dGV8dmlydHVhbHxkZWZhdWx0fGludGVyZmFjZXxzZWFsZWR8dm9sYXRpbGV8ZGVsZWdhdGV8aW50ZXJuYWx8cGFydGlhbHxzaG9ydHx2b2lkfGRvfGlzfHNpemVvZnx3aGlsZXxkb3VibGV8bG9ja3xzdGFja2FsbG9jfGVsc2V8bG9uZ3xzdGF0aWN8ZW51bXxuYW1lc3BhY2V8c3RyaW5nfHZhcnxkeW5hbWljXCIsXG4gICAgICAgIFwiY29uc3RhbnQubGFuZ3VhZ2VcIjogXCJudWxsfHRydWV8ZmFsc2VcIlxuICAgIH0sIFwiaWRlbnRpZmllclwiKTtcblxuICAgIC8vIHJlZ2V4cCBtdXN0IG5vdCBoYXZlIGNhcHR1cmluZyBwYXJlbnRoZXNlcy4gVXNlICg/OikgaW5zdGVhZC5cbiAgICAvLyByZWdleHBzIGFyZSBvcmRlcmVkIC0+IHRoZSBmaXJzdCBtYXRjaCBpcyB1c2VkXG5cbiAgICB0aGlzLiRydWxlcyA9IHtcbiAgICAgICAgXCJzdGFydFwiIDogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwvXFxcXC8uKiRcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcy5nZXRTdGFydFJ1bGUoXCJkb2Mtc3RhcnRcIiksXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIiwgLy8gbXVsdGkgbGluZSBjb21tZW50XG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwvXFxcXCpcIixcbiAgICAgICAgICAgICAgICBuZXh0IDogXCJjb21tZW50XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsIC8vIGNoYXJhY3RlclxuICAgICAgICAgICAgICAgIHJlZ2V4IDogLycoPzoufFxcXFwoOj91W1xcZGEtZkEtRl0rfHhbXFxkYS1mQS1GXSt8W3RicmYnXCJuXSkpPycvXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLCBzdGFydCA6ICdcIicsIGVuZCA6ICdcInwkJywgbmV4dDogW1xuICAgICAgICAgICAgICAgICAgICB7dG9rZW46IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCIsIHJlZ2V4OiAvXFxcXCg6P3VbXFxkYS1mQS1GXSt8eFtcXGRhLWZBLUZdK3xbdGJyZidcIm5dKS99LFxuICAgICAgICAgICAgICAgICAgICB7dG9rZW46IFwiaW52YWxpZFwiLCByZWdleDogL1xcXFwuL31cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLCBzdGFydCA6ICdAXCInLCBlbmQgOiAnXCInLCBuZXh0OltcbiAgICAgICAgICAgICAgICAgICAge3Rva2VuOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLCByZWdleDogJ1wiXCInfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsIHN0YXJ0IDogL1xcJFwiLywgZW5kIDogJ1wifCQnLCBuZXh0OiBbXG4gICAgICAgICAgICAgICAgICAgIHt0b2tlbjogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIiwgcmVnZXg6IC9cXFxcKDo/JCl8e3svfSxcbiAgICAgICAgICAgICAgICAgICAge3Rva2VuOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLCByZWdleDogL1xcXFwoOj91W1xcZGEtZkEtRl0rfHhbXFxkYS1mQS1GXSt8W3RicmYnXCJuXSkvfSxcbiAgICAgICAgICAgICAgICAgICAge3Rva2VuOiBcImludmFsaWRcIiwgcmVnZXg6IC9cXFxcLi99XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5udW1lcmljXCIsIC8vIGhleFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIwW3hYXVswLTlhLWZBLUZdK1xcXFxiXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLCAvLyBmbG9hdFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJbKy1dP1xcXFxkKyg/Oig/OlxcXFwuXFxcXGQqKT8oPzpbZUVdWystXT9cXFxcZCspPyk/XFxcXGJcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5sYW5ndWFnZS5ib29sZWFuXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIig/OnRydWV8ZmFsc2UpXFxcXGJcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDoga2V5d29yZE1hcHBlcixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiW2EtekEtWl8kXVthLXpBLVowLTlfJF0qXFxcXGJcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIiF8XFxcXCR8JXwmfFxcXFwqfFxcXFwtXFxcXC18XFxcXC18XFxcXCtcXFxcK3xcXFxcK3x+fD09PXw9PXw9fCE9fCE9PXw8PXw+PXw8PD18Pj49fD4+Pj18PD58PHw+fCF8JiZ8XFxcXHxcXFxcfHxcXFxcP1xcXFw6fFxcXFwqPXwlPXxcXFxcKz18XFxcXC09fCY9fFxcXFxePXxcXFxcYig/OmlufGluc3RhbmNlb2Z8bmV3fGRlbGV0ZXx0eXBlb2Z8dm9pZClcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIl5cXFxccyojKGlmfGVsc2V8ZWxpZnxlbmRpZnxkZWZpbmV8dW5kZWZ8d2FybmluZ3xlcnJvcnxsaW5lfHJlZ2lvbnxlbmRyZWdpb258cHJhZ21hKVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInB1bmN0dWF0aW9uLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFw/fFxcXFw6fFxcXFwsfFxcXFw7fFxcXFwuXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwicGFyZW4ubHBhcmVuXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIltbKHtdXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwicGFyZW4ucnBhcmVuXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIltcXFxcXSl9XVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXHMrXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgXCJjb21tZW50XCIgOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIiwgLy8gY2xvc2luZyBjb21tZW50XG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwqXFxcXC9cIixcbiAgICAgICAgICAgICAgICBuZXh0IDogXCJzdGFydFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuIDogXCJjb21tZW50XCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH07XG5cbiAgICB0aGlzLmVtYmVkUnVsZXMoRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLCBcImRvYy1cIixcbiAgICAgICAgWyBEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMuZ2V0RW5kUnVsZShcInN0YXJ0XCIpIF0pO1xuICAgIHRoaXMubm9ybWFsaXplUnVsZXMoKTtcbn07XG5cbm9vcC5pbmhlcml0cyhDU2hhcnBIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuZXhwb3J0cy5DU2hhcnBIaWdobGlnaHRSdWxlcyA9IENTaGFycEhpZ2hsaWdodFJ1bGVzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90ZXh0X2hpZ2hsaWdodF9ydWxlc1wiKS5UZXh0SGlnaGxpZ2h0UnVsZXM7XG5cbnZhciBEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy4kcnVsZXMgPSB7XG4gICAgICAgIFwic3RhcnRcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcImNvbW1lbnQuZG9jLnRhZ1wiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIkBcXFxcdysoPz1cXFxcc3wkKVwiXG4gICAgICAgICAgICB9LCBEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMuZ2V0VGFnUnVsZSgpLCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcImNvbW1lbnQuZG9jXCIsXG4gICAgICAgICAgICAgICAgY2FzZUluc2Vuc2l0aXZlOiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9O1xufTtcblxub29wLmluaGVyaXRzKERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLmdldFRhZ1J1bGUgPSBmdW5jdGlvbihzdGFydCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHRva2VuIDogXCJjb21tZW50LmRvYy50YWcuc3RvcmFnZS50eXBlXCIsXG4gICAgICAgIHJlZ2V4IDogXCJcXFxcYig/OlRPRE98RklYTUV8WFhYfEhBQ0spXFxcXGJcIlxuICAgIH07XG59O1xuXG5Eb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMuZ2V0U3RhcnRSdWxlID0gZnVuY3Rpb24oc3RhcnQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0b2tlbiA6IFwiY29tbWVudC5kb2NcIiwgLy8gZG9jIGNvbW1lbnRcbiAgICAgICAgcmVnZXggOiBcIlxcXFwvXFxcXCooPz1cXFxcKilcIixcbiAgICAgICAgbmV4dCAgOiBzdGFydFxuICAgIH07XG59O1xuXG5Eb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMuZ2V0RW5kUnVsZSA9IGZ1bmN0aW9uIChzdGFydCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHRva2VuIDogXCJjb21tZW50LmRvY1wiLCAvLyBjbG9zaW5nIGNvbW1lbnRcbiAgICAgICAgcmVnZXggOiBcIlxcXFwqXFxcXC9cIixcbiAgICAgICAgbmV4dCAgOiBzdGFydFxuICAgIH07XG59O1xuXG5cbmV4cG9ydHMuRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzID0gRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBIdG1sTW9kZSA9IHJlcXVpcmUoXCIuL2h0bWxcIikuTW9kZTtcbnZhciBSYXpvckhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vcmF6b3JfaGlnaGxpZ2h0X3J1bGVzXCIpLlJhem9ySGlnaGxpZ2h0UnVsZXM7XG52YXIgUmF6b3JDb21wbGV0aW9ucyA9IHJlcXVpcmUoXCIuL3Jhem9yX2NvbXBsZXRpb25zXCIpLlJhem9yQ29tcGxldGlvbnM7XG52YXIgSHRtbENvbXBsZXRpb25zID0gcmVxdWlyZShcIi4vaHRtbF9jb21wbGV0aW9uc1wiKS5IdG1sQ29tcGxldGlvbnM7XG5cbnZhciBNb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgSHRtbE1vZGUuY2FsbCh0aGlzKTtcbiAgICB0aGlzLiRoaWdobGlnaHRSdWxlcyA9IG5ldyBSYXpvckhpZ2hsaWdodFJ1bGVzKCk7XG4gICAgdGhpcy4kY29tcGxldGVyID0gbmV3IFJhem9yQ29tcGxldGlvbnMoKTtcbiAgICB0aGlzLiRodG1sQ29tcGxldGVyID0gbmV3IEh0bWxDb21wbGV0aW9ucygpO1xufTtcbm9vcC5pbmhlcml0cyhNb2RlLCBIdG1sTW9kZSk7XG5cbihmdW5jdGlvbigpIHtcbiAgICB0aGlzLmdldENvbXBsZXRpb25zID0gZnVuY3Rpb24oc3RhdGUsIHNlc3Npb24sIHBvcywgcHJlZml4KSB7XG4gICAgICAgIHZhciByYXpvclRva2VuID0gdGhpcy4kY29tcGxldGVyLmdldENvbXBsZXRpb25zKHN0YXRlLCBzZXNzaW9uLCBwb3MsIHByZWZpeCk7XG4gICAgICAgIHZhciBodG1sVG9rZW4gPSB0aGlzLiRodG1sQ29tcGxldGVyLmdldENvbXBsZXRpb25zKHN0YXRlLCBzZXNzaW9uLCBwb3MsIHByZWZpeCk7XG4gICAgICAgIHJldHVybiByYXpvclRva2VuLmNvbmNhdChodG1sVG9rZW4pO1xuICAgIH07XG4gICAgXG4gICAgdGhpcy5jcmVhdGVXb3JrZXIgPSBmdW5jdGlvbihzZXNzaW9uKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG5cbiAgICB0aGlzLiRpZCA9IFwiYWNlL21vZGUvcmF6b3JcIjtcbiAgICB0aGlzLnNuaXBwZXRGaWxlSWQgPSBcImFjZS9zbmlwcGV0cy9yYXpvclwiO1xufSkuY2FsbChNb2RlLnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTW9kZSA9IE1vZGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIFRva2VuSXRlcmF0b3IgPSByZXF1aXJlKFwiLi4vdG9rZW5faXRlcmF0b3JcIikuVG9rZW5JdGVyYXRvcjtcblxudmFyIGtleXdvcmRzID0gW1xuICAgIFwiYWJzdHJhY3RcIiwgXCJhc1wiLCBcImJhc2VcIiwgXCJib29sXCIsXG4gICAgXCJicmVha1wiLCBcImJ5dGVcIiwgXCJjYXNlXCIsIFwiY2F0Y2hcIixcbiAgICBcImNoYXJcIiwgXCJjaGVja2VkXCIsIFwiY2xhc3NcIiwgXCJjb25zdFwiLFxuICAgIFwiY29udGludWVcIiwgXCJkZWNpbWFsXCIsIFwiZGVmYXVsdFwiLCBcImRlbGVnYXRlXCIsXG4gICAgXCJkb1wiLCBcImRvdWJsZVwiLFwiZWxzZVwiLFwiZW51bVwiLFxuICAgIFwiZXZlbnRcIiwgXCJleHBsaWNpdFwiLCBcImV4dGVyblwiLCBcImZhbHNlXCIsXG4gICAgXCJmaW5hbGx5XCIsIFwiZml4ZWRcIiwgXCJmbG9hdFwiLCBcImZvclwiLFxuICAgIFwiZm9yZWFjaFwiLCBcImdvdG9cIiwgXCJpZlwiLCBcImltcGxpY2l0XCIsXG4gICAgXCJpblwiLCBcImludFwiLCBcImludGVyZmFjZVwiLCBcImludGVybmFsXCIsXG4gICAgXCJpc1wiLCBcImxvY2tcIiwgXCJsb25nXCIsIFwibmFtZXNwYWNlXCIsXG4gICAgXCJuZXdcIiwgXCJudWxsXCIsIFwib2JqZWN0XCIsIFwib3BlcmF0b3JcIixcbiAgICBcIm91dFwiLCBcIm92ZXJyaWRlXCIsIFwicGFyYW1zXCIsIFwicHJpdmF0ZVwiLFxuICAgIFwicHJvdGVjdGVkXCIsIFwicHVibGljXCIsIFwicmVhZG9ubHlcIiwgXCJyZWZcIixcbiAgICBcInJldHVyblwiLCBcInNieXRlXCIsIFwic2VhbGVkXCIsIFwic2hvcnRcIixcbiAgICBcInNpemVvZlwiLCBcInN0YWNrYWxsb2NcIiwgXCJzdGF0aWNcIiwgXCJzdHJpbmdcIixcbiAgICBcInN0cnVjdFwiLCBcInN3aXRjaFwiLCBcInRoaXNcIiwgXCJ0aHJvd1wiLFxuICAgIFwidHJ1ZVwiLCBcInRyeVwiLCBcInR5cGVvZlwiLCBcInVpbnRcIixcbiAgICBcInVsb25nXCIsIFwidW5jaGVja2VkXCIsIFwidW5zYWZlXCIsIFwidXNob3J0XCIsXG4gICAgXCJ1c2luZ1wiLCBcInZhclwiLCBcInZpcnR1YWxcIiwgXCJ2b2lkXCIsXG4gICAgXCJ2b2xhdGlsZVwiLCBcIndoaWxlXCJdO1xuXG52YXIgc2hvcnRIYW5kcyAgPSBbXG4gICAgXCJIdG1sXCIsIFwiTW9kZWxcIiwgXCJVcmxcIiwgXCJMYXlvdXRcIlxuXTtcbiAgICBcbnZhciBSYXpvckNvbXBsZXRpb25zID0gZnVuY3Rpb24oKSB7XG5cbn07XG5cbihmdW5jdGlvbigpIHtcblxuICAgIHRoaXMuZ2V0Q29tcGxldGlvbnMgPSBmdW5jdGlvbihzdGF0ZSwgc2Vzc2lvbiwgcG9zLCBwcmVmaXgpIHtcbiAgICAgICAgXG4gICAgICAgIGlmKHN0YXRlLmxhc3RJbmRleE9mKFwicmF6b3Itc2hvcnQtc3RhcnRcIikgPT0gLTEgJiYgc3RhdGUubGFzdEluZGV4T2YoXCJyYXpvci1ibG9jay1zdGFydFwiKSA9PSAtMSlcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgXG4gICAgICAgIHZhciB0b2tlbiA9IHNlc3Npb24uZ2V0VG9rZW5BdChwb3Mucm93LCBwb3MuY29sdW1uKTtcbiAgICAgICAgaWYgKCF0b2tlbilcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgXG4gICAgICAgIGlmKHN0YXRlLmxhc3RJbmRleE9mKFwicmF6b3Itc2hvcnQtc3RhcnRcIikgIT0gLTEpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFNob3J0U3RhcnRDb21wbGV0aW9ucyhzdGF0ZSwgc2Vzc2lvbiwgcG9zLCBwcmVmaXgpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZihzdGF0ZS5sYXN0SW5kZXhPZihcInJhem9yLWJsb2NrLXN0YXJ0XCIpICE9IC0xKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRLZXl3b3JkQ29tcGxldGlvbnMoc3RhdGUsIHNlc3Npb24sIHBvcywgcHJlZml4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIFxuICAgIH07XG4gICAgXG4gICAgdGhpcy5nZXRTaG9ydFN0YXJ0Q29tcGxldGlvbnMgPSBmdW5jdGlvbihzdGF0ZSwgc2Vzc2lvbiwgcG9zLCBwcmVmaXgpIHtcbiAgICAgICAgcmV0dXJuIHNob3J0SGFuZHMubWFwKGZ1bmN0aW9uKGVsZW1lbnQpe1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogZWxlbWVudCxcbiAgICAgICAgICAgICAgICBtZXRhOiBcImtleXdvcmRcIixcbiAgICAgICAgICAgICAgICBzY29yZTogMTAwMDAwMFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMuZ2V0S2V5d29yZENvbXBsZXRpb25zID0gZnVuY3Rpb24oc3RhdGUsIHNlc3Npb24sIHBvcywgcHJlZml4KSB7XG4gICAgICAgIHJldHVybiBzaG9ydEhhbmRzLmNvbmNhdChrZXl3b3JkcykubWFwKGZ1bmN0aW9uKGVsZW1lbnQpe1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogZWxlbWVudCxcbiAgICAgICAgICAgICAgICBtZXRhOiBcImtleXdvcmRcIixcbiAgICAgICAgICAgICAgICBzY29yZTogMTAwMDAwMFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxufSkuY2FsbChSYXpvckNvbXBsZXRpb25zLnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuUmF6b3JDb21wbGV0aW9ucyA9IFJhem9yQ29tcGxldGlvbnM7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIGxhbmcgPSByZXF1aXJlKFwiLi4vbGliL2xhbmdcIik7XG52YXIgRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vZG9jX2NvbW1lbnRfaGlnaGxpZ2h0X3J1bGVzXCIpLkRvY0NvbW1lbnRIaWdobGlnaHRSdWxlcztcbnZhciBIdG1sSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9odG1sX2hpZ2hsaWdodF9ydWxlc1wiKS5IdG1sSGlnaGxpZ2h0UnVsZXM7XG52YXIgQ1NoYXJwSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9jc2hhcnBfaGlnaGxpZ2h0X3J1bGVzXCIpLkNTaGFycEhpZ2hsaWdodFJ1bGVzO1xuXG52YXIgYmxvY2tQcmVmaXggPSAncmF6b3ItYmxvY2stJztcbnZhciBSYXpvckxhbmdIaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uKCkge1xuICAgIENTaGFycEhpZ2hsaWdodFJ1bGVzLmNhbGwodGhpcyk7XG5cbiAgICB2YXIgcHJvY2Vzc1BvdGVudGlhbENhbGxiYWNrID0gZnVuY3Rpb24odmFsdWUsIHN0YWNrSXRlbSkge1xuICAgICAgICBpZiAodHlwZW9mIHN0YWNrSXRlbSA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgICAgICAgcmV0dXJuIHN0YWNrSXRlbSh2YWx1ZSk7XG5cbiAgICAgICAgcmV0dXJuIHN0YWNrSXRlbTtcbiAgICB9O1xuXG4gICAgdmFyIGluQnJhY2VzID0gJ2luLWJyYWNlcyc7XG4gICAgdGhpcy4kcnVsZXMuc3RhcnQudW5zaGlmdCh7XG4gICAgICAgIHJlZ2V4OiAnW1xcXFxbKHtdJyxcbiAgICAgICAgb25NYXRjaDogZnVuY3Rpb24odmFsdWUsIHN0YXRlLCBzdGFjaykge1xuICAgICAgICAgICAgdmFyIHByZWZpeCA9IC9yYXpvci1bXlxcLV0rLS8uZXhlYyhzdGF0ZSlbMF07XG5cbiAgICAgICAgICAgIHN0YWNrLnVuc2hpZnQodmFsdWUpO1xuICAgICAgICAgICAgc3RhY2sudW5zaGlmdChwcmVmaXggKyBpbkJyYWNlcyk7XG4gICAgICAgICAgICB0aGlzLm5leHQgPSBwcmVmaXggKyBpbkJyYWNlcztcbiAgICAgICAgICAgIHJldHVybiAncGFyZW4ubHBhcmVuJztcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAgc3RhcnQ6IFwiQFxcXFwqXCIsXG4gICAgICAgIGVuZDogXCJcXFxcKkBcIixcbiAgICAgICAgdG9rZW46IFwiY29tbWVudFwiXG4gICAgfSk7XG5cbiAgICB2YXIgcGFyZW50Q2xvc2VNYXAgPSB7XG4gICAgICAgICd7JzogJ30nLFxuICAgICAgICAnWyc6ICddJyxcbiAgICAgICAgJygnOiAnKSdcbiAgICB9O1xuXG4gICAgdGhpcy4kcnVsZXNbaW5CcmFjZXNdID0gbGFuZy5kZWVwQ29weSh0aGlzLiRydWxlcy5zdGFydCk7XG4gICAgdGhpcy4kcnVsZXNbaW5CcmFjZXNdLnVuc2hpZnQoe1xuICAgICAgICByZWdleDogJ1tcXFxcXSl9XScsXG4gICAgICAgIG9uTWF0Y2g6IGZ1bmN0aW9uKHZhbHVlLCBzdGF0ZSwgc3RhY2spIHtcbiAgICAgICAgICAgIHZhciBvcGVuID0gc3RhY2tbMV07XG4gICAgICAgICAgICBpZiAocGFyZW50Q2xvc2VNYXBbb3Blbl0gIT09IHZhbHVlKVxuICAgICAgICAgICAgICAgIHJldHVybiAnaW52YWxpZC5pbGxlZ2FsJztcblxuICAgICAgICAgICAgc3RhY2suc2hpZnQoKTsgLy8gZXhpdCBpbi1icmFjZXMgYmxvY2tcbiAgICAgICAgICAgIHN0YWNrLnNoaWZ0KCk7IC8vIGV4aXQgYnJhY2UgbWFya2VyXG4gICAgICAgICAgICB0aGlzLm5leHQgPSBwcm9jZXNzUG90ZW50aWFsQ2FsbGJhY2sodmFsdWUsIHN0YWNrWzBdKSB8fCAnc3RhcnQnO1xuICAgICAgICAgICAgcmV0dXJuICdwYXJlbi5ycGFyZW4nO1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG5vb3AuaW5oZXJpdHMoUmF6b3JMYW5nSGlnaGxpZ2h0UnVsZXMsIENTaGFycEhpZ2hsaWdodFJ1bGVzKTtcblxudmFyIFJhem9ySGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbigpIHtcbiAgICBIdG1sSGlnaGxpZ2h0UnVsZXMuY2FsbCh0aGlzKTtcblxuICAgIC8vICdCbG9ja3MnOiBAe30sIEAoKSwgQGZ1bmN0aW9uc3t9XG5cbiAgICB2YXIgYmxvY2tTdGFydFJ1bGUgPSB7XG4gICAgICAgIHJlZ2V4OiAnQFsoe118QGZ1bmN0aW9uc3snLFxuICAgICAgICBvbk1hdGNoOiBmdW5jdGlvbih2YWx1ZSwgc3RhdGUsIHN0YWNrKSB7XG4gICAgICAgICAgICBzdGFjay51bnNoaWZ0KHZhbHVlKTtcbiAgICAgICAgICAgIHN0YWNrLnVuc2hpZnQoJ3Jhem9yLWJsb2NrLXN0YXJ0Jyk7XG4gICAgICAgICAgICB0aGlzLm5leHQgPSAncmF6b3ItYmxvY2stc3RhcnQnO1xuICAgICAgICAgICAgcmV0dXJuICdwdW5jdHVhdGlvbi5ibG9jay5yYXpvcic7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIGJsb2NrRW5kTWFwID0ge1xuICAgICAgICAnQHsnOiAnfScsXG4gICAgICAgICdAKCc6ICcpJyxcbiAgICAgICAgJ0BmdW5jdGlvbnN7JzonfSdcbiAgICB9O1xuXG4gICAgdmFyIGJsb2NrRW5kUnVsZSA9IHtcbiAgICAgICAgcmVnZXg6ICdbfSldJyxcbiAgICAgICAgb25NYXRjaDogZnVuY3Rpb24odmFsdWUsIHN0YXRlLCBzdGFjaykge1xuICAgICAgICAgICAgdmFyIGJsb2NrU3RhcnQgPSBzdGFja1sxXTtcbiAgICAgICAgICAgIGlmIChibG9ja0VuZE1hcFtibG9ja1N0YXJ0XSAhPT0gdmFsdWUpXG4gICAgICAgICAgICAgICAgcmV0dXJuICdpbnZhbGlkLmlsbGVnYWwnO1xuXG4gICAgICAgICAgICBzdGFjay5zaGlmdCgpOyAvLyBleGl0IHJhem9yIGJsb2NrXG4gICAgICAgICAgICBzdGFjay5zaGlmdCgpOyAvLyByZW1vdmUgYmxvY2sgdHlwZSBtYXJrZXJcbiAgICAgICAgICAgIHRoaXMubmV4dCA9IHN0YWNrLnNoaWZ0KCkgfHwgJ3N0YXJ0JztcbiAgICAgICAgICAgIHJldHVybiAncHVuY3R1YXRpb24uYmxvY2sucmF6b3InO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8vIFNob3J0OiBAQWJjLkNkZShYeXopLkVmXG5cbiAgICB2YXIgc2hvcnRTdGFydFJ1bGUgPSB7XG4gICAgICAgIHJlZ2V4OiBcIkAoPyFbeyhdKVwiLFxuICAgICAgICBvbk1hdGNoOiBmdW5jdGlvbih2YWx1ZSwgc3RhdGUsIHN0YWNrKSB7XG4gICAgICAgICAgICBzdGFjay51bnNoaWZ0KFwicmF6b3Itc2hvcnQtc3RhcnRcIik7XG4gICAgICAgICAgICB0aGlzLm5leHQgPSBcInJhem9yLXNob3J0LXN0YXJ0XCI7XG4gICAgICAgICAgICByZXR1cm4gJ3B1bmN0dWF0aW9uLnNob3J0LnJhem9yJztcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgc2hvcnRFbmRSdWxlID0ge1xuICAgICAgICB0b2tlbjogXCJcIixcbiAgICAgICAgcmVnZXg6IFwiKD89W15BLVphLXpfXFxcXC4oKVxcXFxbXFxcXF1dKVwiLFxuICAgICAgICBuZXh0OiAncG9wJ1xuICAgIH07XG5cbiAgICAvLyBDb250cm9sIGZsb3c6IEBpZiwgZXRjXG5cbiAgICB2YXIgaWZTdGFydFJ1bGUgPSB7XG4gICAgICAgIHJlZ2V4OiBcIkAoPz1pZilcIixcbiAgICAgICAgb25NYXRjaDogZnVuY3Rpb24odmFsdWUsIHN0YXRlLCBzdGFjaykge1xuICAgICAgICAgICAgc3RhY2sudW5zaGlmdChmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gJ30nKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3N0YXJ0JztcblxuICAgICAgICAgICAgICAgIHJldHVybiBzdGFjay5zaGlmdCgpIHx8ICdzdGFydCc7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMubmV4dCA9ICdyYXpvci1ibG9jay1zdGFydCc7XG4gICAgICAgICAgICByZXR1cm4gJ3B1bmN0dWF0aW9uLmNvbnRyb2wucmF6b3InO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8vIENvbWJpbmVkOlxuXG4gICAgdmFyIHJhem9yU3RhcnRSdWxlcyA9IFtcbiAgICAgICAge1xuICAgICAgICAgICAgc3RhcnQ6IFwiQFxcXFwqXCIsXG4gICAgICAgICAgICBlbmQ6IFwiXFxcXCpAXCIsXG4gICAgICAgICAgICB0b2tlbjogXCJjb21tZW50XCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdG9rZW46IFtcIm1ldGEuZGlyZWN0aXZlLnJhem9yXCIsIFwidGV4dFwiLCBcImlkZW50aWZpZXJcIl0sXG4gICAgICAgICAgICByZWdleDogXCJeKFxcXFxzKkBtb2RlbCkoXFxcXHMrKSguKykkXCJcbiAgICAgICAgfSxcbiAgICAgICAgYmxvY2tTdGFydFJ1bGUsXG4gICAgICAgIC8vaWZTdGFydFJ1bGUsXG4gICAgICAgIHNob3J0U3RhcnRSdWxlXG4gICAgXTtcblxuICAgIGZvciAodmFyIGtleSBpbiB0aGlzLiRydWxlcylcbiAgICAgICAgdGhpcy4kcnVsZXNba2V5XS51bnNoaWZ0LmFwcGx5KHRoaXMuJHJ1bGVzW2tleV0sIHJhem9yU3RhcnRSdWxlcyk7XG5cbiAgICB0aGlzLmVtYmVkUnVsZXMoUmF6b3JMYW5nSGlnaGxpZ2h0UnVsZXMsIFwicmF6b3ItYmxvY2stXCIsIFtibG9ja0VuZFJ1bGVdLCBbXCJzdGFydFwiXSk7XG4gICAgdGhpcy5lbWJlZFJ1bGVzKFJhem9yTGFuZ0hpZ2hsaWdodFJ1bGVzLCBcInJhem9yLXNob3J0LVwiLCBbc2hvcnRFbmRSdWxlXSwgW1wic3RhcnRcIl0pO1xuXG4gICAgdGhpcy5ub3JtYWxpemVSdWxlcygpO1xufTtcblxub29wLmluaGVyaXRzKFJhem9ySGlnaGxpZ2h0UnVsZXMsIEh0bWxIaWdobGlnaHRSdWxlcyk7XG5cbmV4cG9ydHMuUmF6b3JIaWdobGlnaHRSdWxlcyA9IFJhem9ySGlnaGxpZ2h0UnVsZXM7XG5leHBvcnRzLlJhem9yTGFuZ0hpZ2hsaWdodFJ1bGVzID0gUmF6b3JMYW5nSGlnaGxpZ2h0UnVsZXM7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=