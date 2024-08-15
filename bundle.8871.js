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

exports.a = RazorHighlightRules;
__webpack_unused_export__ = RazorLangHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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OztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLFVBQVUsS0FBSztBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDJCQUEyQjtBQUMzQiwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsb0JBQW9COztBQUVwQjtBQUNBLG9CQUFvQixhQUFhO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsV0FBVyxLQUFLO0FBQ2hCO0FBQ0Esb0JBQW9CLElBQUk7QUFDeEI7O0FBRUE7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMkJBQTJCO0FBQzNCLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQztBQUNoQzs7QUFFQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQSxTQUEyQjtBQUMzQix5QkFBK0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2NzaGFycF9oaWdobGlnaHRfcnVsZXMuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9kb2NfY29tbWVudF9oaWdobGlnaHRfcnVsZXMuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9yYXpvci5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL3Jhem9yX2NvbXBsZXRpb25zLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvcmF6b3JfaGlnaGxpZ2h0X3J1bGVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vZG9jX2NvbW1lbnRfaGlnaGxpZ2h0X3J1bGVzXCIpLkRvY0NvbW1lbnRIaWdobGlnaHRSdWxlcztcbnZhciBUZXh0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90ZXh0X2hpZ2hsaWdodF9ydWxlc1wiKS5UZXh0SGlnaGxpZ2h0UnVsZXM7XG5cbnZhciBDU2hhcnBIaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBrZXl3b3JkTWFwcGVyID0gdGhpcy5jcmVhdGVLZXl3b3JkTWFwcGVyKHtcbiAgICAgICAgXCJ2YXJpYWJsZS5sYW5ndWFnZVwiOiBcInRoaXNcIixcbiAgICAgICAgXCJrZXl3b3JkXCI6IFwiYWJzdHJhY3R8YXN5bmN8YXdhaXR8ZXZlbnR8bmV3fHN0cnVjdHxhc3xleHBsaWNpdHxudWxsfHN3aXRjaHxiYXNlfGV4dGVybnxvYmplY3R8dGhpc3xib29sfGZhbHNlfG9wZXJhdG9yfHRocm93fGJyZWFrfGZpbmFsbHl8b3V0fHRydWV8Ynl0ZXxmaXhlZHxvdmVycmlkZXx0cnl8Y2FzZXxmbG9hdHxwYXJhbXN8dHlwZW9mfGNhdGNofGZvcnxwcml2YXRlfHVpbnR8Y2hhcnxmb3JlYWNofHByb3RlY3RlZHx1bG9uZ3xjaGVja2VkfGdvdG98cHVibGljfHVuY2hlY2tlZHxjbGFzc3xpZnxyZWFkb25seXx1bnNhZmV8Y29uc3R8aW1wbGljaXR8cmVmfHVzaG9ydHxjb250aW51ZXxpbnxyZXR1cm58dXNpbmd8ZGVjaW1hbHxpbnR8c2J5dGV8dmlydHVhbHxkZWZhdWx0fGludGVyZmFjZXxzZWFsZWR8dm9sYXRpbGV8ZGVsZWdhdGV8aW50ZXJuYWx8cGFydGlhbHxzaG9ydHx2b2lkfGRvfGlzfHNpemVvZnx3aGlsZXxkb3VibGV8bG9ja3xzdGFja2FsbG9jfGVsc2V8bG9uZ3xzdGF0aWN8ZW51bXxuYW1lc3BhY2V8c3RyaW5nfHZhcnxkeW5hbWljXCIsXG4gICAgICAgIFwiY29uc3RhbnQubGFuZ3VhZ2VcIjogXCJudWxsfHRydWV8ZmFsc2VcIlxuICAgIH0sIFwiaWRlbnRpZmllclwiKTtcblxuICAgIC8vIHJlZ2V4cCBtdXN0IG5vdCBoYXZlIGNhcHR1cmluZyBwYXJlbnRoZXNlcy4gVXNlICg/OikgaW5zdGVhZC5cbiAgICAvLyByZWdleHBzIGFyZSBvcmRlcmVkIC0+IHRoZSBmaXJzdCBtYXRjaCBpcyB1c2VkXG5cbiAgICB0aGlzLiRydWxlcyA9IHtcbiAgICAgICAgXCJzdGFydFwiIDogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwvXFxcXC8uKiRcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcy5nZXRTdGFydFJ1bGUoXCJkb2Mtc3RhcnRcIiksXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIiwgLy8gbXVsdGkgbGluZSBjb21tZW50XG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwvXFxcXCpcIixcbiAgICAgICAgICAgICAgICBuZXh0IDogXCJjb21tZW50XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsIC8vIGNoYXJhY3RlclxuICAgICAgICAgICAgICAgIHJlZ2V4IDogLycoPzoufFxcXFwoOj91W1xcZGEtZkEtRl0rfHhbXFxkYS1mQS1GXSt8W3RicmYnXCJuXSkpPycvXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLCBzdGFydCA6ICdcIicsIGVuZCA6ICdcInwkJywgbmV4dDogW1xuICAgICAgICAgICAgICAgICAgICB7dG9rZW46IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCIsIHJlZ2V4OiAvXFxcXCg6P3VbXFxkYS1mQS1GXSt8eFtcXGRhLWZBLUZdK3xbdGJyZidcIm5dKS99LFxuICAgICAgICAgICAgICAgICAgICB7dG9rZW46IFwiaW52YWxpZFwiLCByZWdleDogL1xcXFwuL31cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLCBzdGFydCA6ICdAXCInLCBlbmQgOiAnXCInLCBuZXh0OltcbiAgICAgICAgICAgICAgICAgICAge3Rva2VuOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLCByZWdleDogJ1wiXCInfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsIHN0YXJ0IDogL1xcJFwiLywgZW5kIDogJ1wifCQnLCBuZXh0OiBbXG4gICAgICAgICAgICAgICAgICAgIHt0b2tlbjogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIiwgcmVnZXg6IC9cXFxcKDo/JCl8e3svfSxcbiAgICAgICAgICAgICAgICAgICAge3Rva2VuOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLCByZWdleDogL1xcXFwoOj91W1xcZGEtZkEtRl0rfHhbXFxkYS1mQS1GXSt8W3RicmYnXCJuXSkvfSxcbiAgICAgICAgICAgICAgICAgICAge3Rva2VuOiBcImludmFsaWRcIiwgcmVnZXg6IC9cXFxcLi99XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5udW1lcmljXCIsIC8vIGhleFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIwW3hYXVswLTlhLWZBLUZdK1xcXFxiXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLCAvLyBmbG9hdFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJbKy1dP1xcXFxkKyg/Oig/OlxcXFwuXFxcXGQqKT8oPzpbZUVdWystXT9cXFxcZCspPyk/XFxcXGJcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5sYW5ndWFnZS5ib29sZWFuXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIig/OnRydWV8ZmFsc2UpXFxcXGJcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDoga2V5d29yZE1hcHBlcixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiW2EtekEtWl8kXVthLXpBLVowLTlfJF0qXFxcXGJcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIiF8XFxcXCR8JXwmfFxcXFwqfFxcXFwtXFxcXC18XFxcXC18XFxcXCtcXFxcK3xcXFxcK3x+fD09PXw9PXw9fCE9fCE9PXw8PXw+PXw8PD18Pj49fD4+Pj18PD58PHw+fCF8JiZ8XFxcXHxcXFxcfHxcXFxcP1xcXFw6fFxcXFwqPXwlPXxcXFxcKz18XFxcXC09fCY9fFxcXFxePXxcXFxcYig/OmlufGluc3RhbmNlb2Z8bmV3fGRlbGV0ZXx0eXBlb2Z8dm9pZClcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIl5cXFxccyojKGlmfGVsc2V8ZWxpZnxlbmRpZnxkZWZpbmV8dW5kZWZ8d2FybmluZ3xlcnJvcnxsaW5lfHJlZ2lvbnxlbmRyZWdpb258cHJhZ21hKVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInB1bmN0dWF0aW9uLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFw/fFxcXFw6fFxcXFwsfFxcXFw7fFxcXFwuXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwicGFyZW4ubHBhcmVuXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIltbKHtdXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwicGFyZW4ucnBhcmVuXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIltcXFxcXSl9XVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXHMrXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgXCJjb21tZW50XCIgOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIiwgLy8gY2xvc2luZyBjb21tZW50XG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwqXFxcXC9cIixcbiAgICAgICAgICAgICAgICBuZXh0IDogXCJzdGFydFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuIDogXCJjb21tZW50XCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH07XG5cbiAgICB0aGlzLmVtYmVkUnVsZXMoRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLCBcImRvYy1cIixcbiAgICAgICAgWyBEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMuZ2V0RW5kUnVsZShcInN0YXJ0XCIpIF0pO1xuICAgIHRoaXMubm9ybWFsaXplUnVsZXMoKTtcbn07XG5cbm9vcC5pbmhlcml0cyhDU2hhcnBIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuZXhwb3J0cy5DU2hhcnBIaWdobGlnaHRSdWxlcyA9IENTaGFycEhpZ2hsaWdodFJ1bGVzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90ZXh0X2hpZ2hsaWdodF9ydWxlc1wiKS5UZXh0SGlnaGxpZ2h0UnVsZXM7XG5cbnZhciBEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy4kcnVsZXMgPSB7XG4gICAgICAgIFwic3RhcnRcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcImNvbW1lbnQuZG9jLnRhZ1wiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIkBcXFxcdysoPz1cXFxcc3wkKVwiXG4gICAgICAgICAgICB9LCBEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMuZ2V0VGFnUnVsZSgpLCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcImNvbW1lbnQuZG9jLmJvZHlcIixcbiAgICAgICAgICAgICAgICBjYXNlSW5zZW5zaXRpdmU6IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH07XG59O1xuXG5vb3AuaW5oZXJpdHMoRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLCBUZXh0SGlnaGxpZ2h0UnVsZXMpO1xuXG5Eb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMuZ2V0VGFnUnVsZSA9IGZ1bmN0aW9uKHN0YXJ0KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdG9rZW4gOiBcImNvbW1lbnQuZG9jLnRhZy5zdG9yYWdlLnR5cGVcIixcbiAgICAgICAgcmVnZXggOiBcIlxcXFxiKD86VE9ET3xGSVhNRXxYWFh8SEFDSylcXFxcYlwiXG4gICAgfTtcbn07XG5cbkRvY0NvbW1lbnRIaWdobGlnaHRSdWxlcy5nZXRTdGFydFJ1bGUgPSBmdW5jdGlvbihzdGFydCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHRva2VuIDogXCJjb21tZW50LmRvY1wiLCAvLyBkb2MgY29tbWVudFxuICAgICAgICByZWdleDogL1xcL1xcKlxcKig/IVxcLykvLFxuICAgICAgICBuZXh0ICA6IHN0YXJ0XG4gICAgfTtcbn07XG5cbkRvY0NvbW1lbnRIaWdobGlnaHRSdWxlcy5nZXRFbmRSdWxlID0gZnVuY3Rpb24gKHN0YXJ0KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdG9rZW4gOiBcImNvbW1lbnQuZG9jXCIsIC8vIGNsb3NpbmcgY29tbWVudFxuICAgICAgICByZWdleCA6IFwiXFxcXCpcXFxcL1wiLFxuICAgICAgICBuZXh0ICA6IHN0YXJ0XG4gICAgfTtcbn07XG5cblxuZXhwb3J0cy5Eb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMgPSBEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXM7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIEh0bWxNb2RlID0gcmVxdWlyZShcIi4vaHRtbFwiKS5Nb2RlO1xudmFyIFJhem9ySGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9yYXpvcl9oaWdobGlnaHRfcnVsZXNcIikuUmF6b3JIaWdobGlnaHRSdWxlcztcbnZhciBSYXpvckNvbXBsZXRpb25zID0gcmVxdWlyZShcIi4vcmF6b3JfY29tcGxldGlvbnNcIikuUmF6b3JDb21wbGV0aW9ucztcbnZhciBIdG1sQ29tcGxldGlvbnMgPSByZXF1aXJlKFwiLi9odG1sX2NvbXBsZXRpb25zXCIpLkh0bWxDb21wbGV0aW9ucztcblxudmFyIE1vZGUgPSBmdW5jdGlvbigpIHtcbiAgICBIdG1sTW9kZS5jYWxsKHRoaXMpO1xuICAgIHRoaXMuJGhpZ2hsaWdodFJ1bGVzID0gbmV3IFJhem9ySGlnaGxpZ2h0UnVsZXMoKTtcbiAgICB0aGlzLiRjb21wbGV0ZXIgPSBuZXcgUmF6b3JDb21wbGV0aW9ucygpO1xuICAgIHRoaXMuJGh0bWxDb21wbGV0ZXIgPSBuZXcgSHRtbENvbXBsZXRpb25zKCk7XG59O1xub29wLmluaGVyaXRzKE1vZGUsIEh0bWxNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuZ2V0Q29tcGxldGlvbnMgPSBmdW5jdGlvbihzdGF0ZSwgc2Vzc2lvbiwgcG9zLCBwcmVmaXgpIHtcbiAgICAgICAgdmFyIHJhem9yVG9rZW4gPSB0aGlzLiRjb21wbGV0ZXIuZ2V0Q29tcGxldGlvbnMoc3RhdGUsIHNlc3Npb24sIHBvcywgcHJlZml4KTtcbiAgICAgICAgdmFyIGh0bWxUb2tlbiA9IHRoaXMuJGh0bWxDb21wbGV0ZXIuZ2V0Q29tcGxldGlvbnMoc3RhdGUsIHNlc3Npb24sIHBvcywgcHJlZml4KTtcbiAgICAgICAgcmV0dXJuIHJhem9yVG9rZW4uY29uY2F0KGh0bWxUb2tlbik7XG4gICAgfTtcbiAgICBcbiAgICB0aGlzLmNyZWF0ZVdvcmtlciA9IGZ1bmN0aW9uKHNlc3Npb24pIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcblxuICAgIHRoaXMuJGlkID0gXCJhY2UvbW9kZS9yYXpvclwiO1xuICAgIHRoaXMuc25pcHBldEZpbGVJZCA9IFwiYWNlL3NuaXBwZXRzL3Jhem9yXCI7XG59KS5jYWxsKE1vZGUucHJvdG90eXBlKTtcblxuZXhwb3J0cy5Nb2RlID0gTW9kZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgVG9rZW5JdGVyYXRvciA9IHJlcXVpcmUoXCIuLi90b2tlbl9pdGVyYXRvclwiKS5Ub2tlbkl0ZXJhdG9yO1xuXG52YXIga2V5d29yZHMgPSBbXG4gICAgXCJhYnN0cmFjdFwiLCBcImFzXCIsIFwiYmFzZVwiLCBcImJvb2xcIixcbiAgICBcImJyZWFrXCIsIFwiYnl0ZVwiLCBcImNhc2VcIiwgXCJjYXRjaFwiLFxuICAgIFwiY2hhclwiLCBcImNoZWNrZWRcIiwgXCJjbGFzc1wiLCBcImNvbnN0XCIsXG4gICAgXCJjb250aW51ZVwiLCBcImRlY2ltYWxcIiwgXCJkZWZhdWx0XCIsIFwiZGVsZWdhdGVcIixcbiAgICBcImRvXCIsIFwiZG91YmxlXCIsXCJlbHNlXCIsXCJlbnVtXCIsXG4gICAgXCJldmVudFwiLCBcImV4cGxpY2l0XCIsIFwiZXh0ZXJuXCIsIFwiZmFsc2VcIixcbiAgICBcImZpbmFsbHlcIiwgXCJmaXhlZFwiLCBcImZsb2F0XCIsIFwiZm9yXCIsXG4gICAgXCJmb3JlYWNoXCIsIFwiZ290b1wiLCBcImlmXCIsIFwiaW1wbGljaXRcIixcbiAgICBcImluXCIsIFwiaW50XCIsIFwiaW50ZXJmYWNlXCIsIFwiaW50ZXJuYWxcIixcbiAgICBcImlzXCIsIFwibG9ja1wiLCBcImxvbmdcIiwgXCJuYW1lc3BhY2VcIixcbiAgICBcIm5ld1wiLCBcIm51bGxcIiwgXCJvYmplY3RcIiwgXCJvcGVyYXRvclwiLFxuICAgIFwib3V0XCIsIFwib3ZlcnJpZGVcIiwgXCJwYXJhbXNcIiwgXCJwcml2YXRlXCIsXG4gICAgXCJwcm90ZWN0ZWRcIiwgXCJwdWJsaWNcIiwgXCJyZWFkb25seVwiLCBcInJlZlwiLFxuICAgIFwicmV0dXJuXCIsIFwic2J5dGVcIiwgXCJzZWFsZWRcIiwgXCJzaG9ydFwiLFxuICAgIFwic2l6ZW9mXCIsIFwic3RhY2thbGxvY1wiLCBcInN0YXRpY1wiLCBcInN0cmluZ1wiLFxuICAgIFwic3RydWN0XCIsIFwic3dpdGNoXCIsIFwidGhpc1wiLCBcInRocm93XCIsXG4gICAgXCJ0cnVlXCIsIFwidHJ5XCIsIFwidHlwZW9mXCIsIFwidWludFwiLFxuICAgIFwidWxvbmdcIiwgXCJ1bmNoZWNrZWRcIiwgXCJ1bnNhZmVcIiwgXCJ1c2hvcnRcIixcbiAgICBcInVzaW5nXCIsIFwidmFyXCIsIFwidmlydHVhbFwiLCBcInZvaWRcIixcbiAgICBcInZvbGF0aWxlXCIsIFwid2hpbGVcIl07XG5cbnZhciBzaG9ydEhhbmRzICA9IFtcbiAgICBcIkh0bWxcIiwgXCJNb2RlbFwiLCBcIlVybFwiLCBcIkxheW91dFwiXG5dO1xuICAgIFxudmFyIFJhem9yQ29tcGxldGlvbnMgPSBmdW5jdGlvbigpIHtcblxufTtcblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5nZXRDb21wbGV0aW9ucyA9IGZ1bmN0aW9uKHN0YXRlLCBzZXNzaW9uLCBwb3MsIHByZWZpeCkge1xuICAgICAgICBcbiAgICAgICAgaWYoc3RhdGUubGFzdEluZGV4T2YoXCJyYXpvci1zaG9ydC1zdGFydFwiKSA9PSAtMSAmJiBzdGF0ZS5sYXN0SW5kZXhPZihcInJhem9yLWJsb2NrLXN0YXJ0XCIpID09IC0xKVxuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICBcbiAgICAgICAgdmFyIHRva2VuID0gc2Vzc2lvbi5nZXRUb2tlbkF0KHBvcy5yb3csIHBvcy5jb2x1bW4pO1xuICAgICAgICBpZiAoIXRva2VuKVxuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICBcbiAgICAgICAgaWYoc3RhdGUubGFzdEluZGV4T2YoXCJyYXpvci1zaG9ydC1zdGFydFwiKSAhPSAtMSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U2hvcnRTdGFydENvbXBsZXRpb25zKHN0YXRlLCBzZXNzaW9uLCBwb3MsIHByZWZpeCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmKHN0YXRlLmxhc3RJbmRleE9mKFwicmF6b3ItYmxvY2stc3RhcnRcIikgIT0gLTEpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEtleXdvcmRDb21wbGV0aW9ucyhzdGF0ZSwgc2Vzc2lvbiwgcG9zLCBwcmVmaXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgXG4gICAgfTtcbiAgICBcbiAgICB0aGlzLmdldFNob3J0U3RhcnRDb21wbGV0aW9ucyA9IGZ1bmN0aW9uKHN0YXRlLCBzZXNzaW9uLCBwb3MsIHByZWZpeCkge1xuICAgICAgICByZXR1cm4gc2hvcnRIYW5kcy5tYXAoZnVuY3Rpb24oZWxlbWVudCl7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBlbGVtZW50LFxuICAgICAgICAgICAgICAgIG1ldGE6IFwia2V5d29yZFwiLFxuICAgICAgICAgICAgICAgIHNjb3JlOiAxMDAwMDAwXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRLZXl3b3JkQ29tcGxldGlvbnMgPSBmdW5jdGlvbihzdGF0ZSwgc2Vzc2lvbiwgcG9zLCBwcmVmaXgpIHtcbiAgICAgICAgcmV0dXJuIHNob3J0SGFuZHMuY29uY2F0KGtleXdvcmRzKS5tYXAoZnVuY3Rpb24oZWxlbWVudCl7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBlbGVtZW50LFxuICAgICAgICAgICAgICAgIG1ldGE6IFwia2V5d29yZFwiLFxuICAgICAgICAgICAgICAgIHNjb3JlOiAxMDAwMDAwXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9O1xuXG59KS5jYWxsKFJhem9yQ29tcGxldGlvbnMucHJvdG90eXBlKTtcblxuZXhwb3J0cy5SYXpvckNvbXBsZXRpb25zID0gUmF6b3JDb21wbGV0aW9ucztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgbGFuZyA9IHJlcXVpcmUoXCIuLi9saWIvbGFuZ1wiKTtcbnZhciBEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9kb2NfY29tbWVudF9oaWdobGlnaHRfcnVsZXNcIikuRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzO1xudmFyIEh0bWxIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL2h0bWxfaGlnaGxpZ2h0X3J1bGVzXCIpLkh0bWxIaWdobGlnaHRSdWxlcztcbnZhciBDU2hhcnBIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL2NzaGFycF9oaWdobGlnaHRfcnVsZXNcIikuQ1NoYXJwSGlnaGxpZ2h0UnVsZXM7XG5cbnZhciBibG9ja1ByZWZpeCA9ICdyYXpvci1ibG9jay0nO1xudmFyIFJhem9yTGFuZ0hpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24oKSB7XG4gICAgQ1NoYXJwSGlnaGxpZ2h0UnVsZXMuY2FsbCh0aGlzKTtcblxuICAgIHZhciBwcm9jZXNzUG90ZW50aWFsQ2FsbGJhY2sgPSBmdW5jdGlvbih2YWx1ZSwgc3RhY2tJdGVtKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc3RhY2tJdGVtID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgICAgICByZXR1cm4gc3RhY2tJdGVtKHZhbHVlKTtcblxuICAgICAgICByZXR1cm4gc3RhY2tJdGVtO1xuICAgIH07XG5cbiAgICB2YXIgaW5CcmFjZXMgPSAnaW4tYnJhY2VzJztcbiAgICB0aGlzLiRydWxlcy5zdGFydC51bnNoaWZ0KHtcbiAgICAgICAgcmVnZXg6ICdbXFxcXFsoe10nLFxuICAgICAgICBvbk1hdGNoOiBmdW5jdGlvbih2YWx1ZSwgc3RhdGUsIHN0YWNrKSB7XG4gICAgICAgICAgICB2YXIgcHJlZml4ID0gL3Jhem9yLVteXFwtXSstLy5leGVjKHN0YXRlKVswXTtcblxuICAgICAgICAgICAgc3RhY2sudW5zaGlmdCh2YWx1ZSk7XG4gICAgICAgICAgICBzdGFjay51bnNoaWZ0KHByZWZpeCArIGluQnJhY2VzKTtcbiAgICAgICAgICAgIHRoaXMubmV4dCA9IHByZWZpeCArIGluQnJhY2VzO1xuICAgICAgICAgICAgcmV0dXJuICdwYXJlbi5scGFyZW4nO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBzdGFydDogXCJAXFxcXCpcIixcbiAgICAgICAgZW5kOiBcIlxcXFwqQFwiLFxuICAgICAgICB0b2tlbjogXCJjb21tZW50XCJcbiAgICB9KTtcblxuICAgIHZhciBwYXJlbnRDbG9zZU1hcCA9IHtcbiAgICAgICAgJ3snOiAnfScsXG4gICAgICAgICdbJzogJ10nLFxuICAgICAgICAnKCc6ICcpJ1xuICAgIH07XG5cbiAgICB0aGlzLiRydWxlc1tpbkJyYWNlc10gPSBsYW5nLmRlZXBDb3B5KHRoaXMuJHJ1bGVzLnN0YXJ0KTtcbiAgICB0aGlzLiRydWxlc1tpbkJyYWNlc10udW5zaGlmdCh7XG4gICAgICAgIHJlZ2V4OiAnW1xcXFxdKX1dJyxcbiAgICAgICAgb25NYXRjaDogZnVuY3Rpb24odmFsdWUsIHN0YXRlLCBzdGFjaykge1xuICAgICAgICAgICAgdmFyIG9wZW4gPSBzdGFja1sxXTtcbiAgICAgICAgICAgIGlmIChwYXJlbnRDbG9zZU1hcFtvcGVuXSAhPT0gdmFsdWUpXG4gICAgICAgICAgICAgICAgcmV0dXJuICdpbnZhbGlkLmlsbGVnYWwnO1xuXG4gICAgICAgICAgICBzdGFjay5zaGlmdCgpOyAvLyBleGl0IGluLWJyYWNlcyBibG9ja1xuICAgICAgICAgICAgc3RhY2suc2hpZnQoKTsgLy8gZXhpdCBicmFjZSBtYXJrZXJcbiAgICAgICAgICAgIHRoaXMubmV4dCA9IHByb2Nlc3NQb3RlbnRpYWxDYWxsYmFjayh2YWx1ZSwgc3RhY2tbMF0pIHx8ICdzdGFydCc7XG4gICAgICAgICAgICByZXR1cm4gJ3BhcmVuLnJwYXJlbic7XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5cbm9vcC5pbmhlcml0cyhSYXpvckxhbmdIaWdobGlnaHRSdWxlcywgQ1NoYXJwSGlnaGxpZ2h0UnVsZXMpO1xuXG52YXIgUmF6b3JIaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uKCkge1xuICAgIEh0bWxIaWdobGlnaHRSdWxlcy5jYWxsKHRoaXMpO1xuXG4gICAgLy8gJ0Jsb2Nrcyc6IEB7fSwgQCgpLCBAZnVuY3Rpb25ze31cblxuICAgIHZhciBibG9ja1N0YXJ0UnVsZSA9IHtcbiAgICAgICAgcmVnZXg6ICdAWyh7XXxAZnVuY3Rpb25zeycsXG4gICAgICAgIG9uTWF0Y2g6IGZ1bmN0aW9uKHZhbHVlLCBzdGF0ZSwgc3RhY2spIHtcbiAgICAgICAgICAgIHN0YWNrLnVuc2hpZnQodmFsdWUpO1xuICAgICAgICAgICAgc3RhY2sudW5zaGlmdCgncmF6b3ItYmxvY2stc3RhcnQnKTtcbiAgICAgICAgICAgIHRoaXMubmV4dCA9ICdyYXpvci1ibG9jay1zdGFydCc7XG4gICAgICAgICAgICByZXR1cm4gJ3B1bmN0dWF0aW9uLmJsb2NrLnJhem9yJztcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgYmxvY2tFbmRNYXAgPSB7XG4gICAgICAgICdAeyc6ICd9JyxcbiAgICAgICAgJ0AoJzogJyknLFxuICAgICAgICAnQGZ1bmN0aW9uc3snOid9J1xuICAgIH07XG5cbiAgICB2YXIgYmxvY2tFbmRSdWxlID0ge1xuICAgICAgICByZWdleDogJ1t9KV0nLFxuICAgICAgICBvbk1hdGNoOiBmdW5jdGlvbih2YWx1ZSwgc3RhdGUsIHN0YWNrKSB7XG4gICAgICAgICAgICB2YXIgYmxvY2tTdGFydCA9IHN0YWNrWzFdO1xuICAgICAgICAgICAgaWYgKGJsb2NrRW5kTWFwW2Jsb2NrU3RhcnRdICE9PSB2YWx1ZSlcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2ludmFsaWQuaWxsZWdhbCc7XG5cbiAgICAgICAgICAgIHN0YWNrLnNoaWZ0KCk7IC8vIGV4aXQgcmF6b3IgYmxvY2tcbiAgICAgICAgICAgIHN0YWNrLnNoaWZ0KCk7IC8vIHJlbW92ZSBibG9jayB0eXBlIG1hcmtlclxuICAgICAgICAgICAgdGhpcy5uZXh0ID0gc3RhY2suc2hpZnQoKSB8fCAnc3RhcnQnO1xuICAgICAgICAgICAgcmV0dXJuICdwdW5jdHVhdGlvbi5ibG9jay5yYXpvcic7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gU2hvcnQ6IEBBYmMuQ2RlKFh5eikuRWZcblxuICAgIHZhciBzaG9ydFN0YXJ0UnVsZSA9IHtcbiAgICAgICAgcmVnZXg6IFwiQCg/IVt7KF0pXCIsXG4gICAgICAgIG9uTWF0Y2g6IGZ1bmN0aW9uKHZhbHVlLCBzdGF0ZSwgc3RhY2spIHtcbiAgICAgICAgICAgIHN0YWNrLnVuc2hpZnQoXCJyYXpvci1zaG9ydC1zdGFydFwiKTtcbiAgICAgICAgICAgIHRoaXMubmV4dCA9IFwicmF6b3Itc2hvcnQtc3RhcnRcIjtcbiAgICAgICAgICAgIHJldHVybiAncHVuY3R1YXRpb24uc2hvcnQucmF6b3InO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHZhciBzaG9ydEVuZFJ1bGUgPSB7XG4gICAgICAgIHRva2VuOiBcIlwiLFxuICAgICAgICByZWdleDogXCIoPz1bXkEtWmEtel9cXFxcLigpXFxcXFtcXFxcXV0pXCIsXG4gICAgICAgIG5leHQ6ICdwb3AnXG4gICAgfTtcblxuICAgIC8vIENvbnRyb2wgZmxvdzogQGlmLCBldGNcblxuICAgIHZhciBpZlN0YXJ0UnVsZSA9IHtcbiAgICAgICAgcmVnZXg6IFwiQCg/PWlmKVwiLFxuICAgICAgICBvbk1hdGNoOiBmdW5jdGlvbih2YWx1ZSwgc3RhdGUsIHN0YWNrKSB7XG4gICAgICAgICAgICBzdGFjay51bnNoaWZ0KGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlICE9PSAnfScpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnc3RhcnQnO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YWNrLnNoaWZ0KCkgfHwgJ3N0YXJ0JztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5uZXh0ID0gJ3Jhem9yLWJsb2NrLXN0YXJ0JztcbiAgICAgICAgICAgIHJldHVybiAncHVuY3R1YXRpb24uY29udHJvbC5yYXpvcic7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gQ29tYmluZWQ6XG5cbiAgICB2YXIgcmF6b3JTdGFydFJ1bGVzID0gW1xuICAgICAgICB7XG4gICAgICAgICAgICBzdGFydDogXCJAXFxcXCpcIixcbiAgICAgICAgICAgIGVuZDogXCJcXFxcKkBcIixcbiAgICAgICAgICAgIHRva2VuOiBcImNvbW1lbnRcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbjogW1wibWV0YS5kaXJlY3RpdmUucmF6b3JcIiwgXCJ0ZXh0XCIsIFwiaWRlbnRpZmllclwiXSxcbiAgICAgICAgICAgIHJlZ2V4OiBcIl4oXFxcXHMqQG1vZGVsKShcXFxccyspKC4rKSRcIlxuICAgICAgICB9LFxuICAgICAgICBibG9ja1N0YXJ0UnVsZSxcbiAgICAgICAgLy9pZlN0YXJ0UnVsZSxcbiAgICAgICAgc2hvcnRTdGFydFJ1bGVcbiAgICBdO1xuXG4gICAgZm9yICh2YXIga2V5IGluIHRoaXMuJHJ1bGVzKVxuICAgICAgICB0aGlzLiRydWxlc1trZXldLnVuc2hpZnQuYXBwbHkodGhpcy4kcnVsZXNba2V5XSwgcmF6b3JTdGFydFJ1bGVzKTtcblxuICAgIHRoaXMuZW1iZWRSdWxlcyhSYXpvckxhbmdIaWdobGlnaHRSdWxlcywgXCJyYXpvci1ibG9jay1cIiwgW2Jsb2NrRW5kUnVsZV0sIFtcInN0YXJ0XCJdKTtcbiAgICB0aGlzLmVtYmVkUnVsZXMoUmF6b3JMYW5nSGlnaGxpZ2h0UnVsZXMsIFwicmF6b3Itc2hvcnQtXCIsIFtzaG9ydEVuZFJ1bGVdLCBbXCJzdGFydFwiXSk7XG5cbiAgICB0aGlzLm5vcm1hbGl6ZVJ1bGVzKCk7XG59O1xuXG5vb3AuaW5oZXJpdHMoUmF6b3JIaWdobGlnaHRSdWxlcywgSHRtbEhpZ2hsaWdodFJ1bGVzKTtcblxuZXhwb3J0cy5SYXpvckhpZ2hsaWdodFJ1bGVzID0gUmF6b3JIaWdobGlnaHRSdWxlcztcbmV4cG9ydHMuUmF6b3JMYW5nSGlnaGxpZ2h0UnVsZXMgPSBSYXpvckxhbmdIaWdobGlnaHRSdWxlcztcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==