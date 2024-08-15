"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[7787],{

/***/ 72644:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

var LatexHighlightRules = function() {  

    this.$rules = {
        "start" : [{
            // A comment. Tex comments start with % and go to 
            // the end of the line
            token : "comment",
            regex : "%.*$"
        }, {
            // Documentclass and usepackage
            token : ["keyword", "lparen", "variable.parameter", "rparen", "lparen", "storage.type", "rparen"],
            regex : "(\\\\(?:documentclass|usepackage|input))(?:(\\[)([^\\]]*)(\\]))?({)([^}]*)(})"
        }, {
            // A label
            token : ["keyword","lparen", "variable.parameter", "rparen"],
            regex : "(\\\\(?:label|v?ref|cite(?:[^{]*)))(?:({)([^}]*)(}))?"
        }, {
            // A Verbatim block
            token : ["storage.type", "lparen", "variable.parameter", "rparen"],
            regex : "(\\\\begin)({)(verbatim)(})",
            next : "verbatim"
        },  {
            token : ["storage.type", "lparen", "variable.parameter", "rparen"],
            regex : "(\\\\begin)({)(lstlisting)(})",
            next : "lstlisting"
        },  {
            // A block
            token : ["storage.type", "lparen", "variable.parameter", "rparen"],
            regex : "(\\\\(?:begin|end))({)([\\w*]*)(})"
        }, {
            token : "storage.type",
            regex : /\\verb\b\*?/,
            next : [{
                token : ["keyword.operator", "string", "keyword.operator"],
                regex : "(.)(.*?)(\\1|$)|",
                next : "start"
            }]
        }, {
            // A tex command e.g. \foo
            token : "storage.type",
            regex : "\\\\[a-zA-Z]+"
        }, {
            // Curly and square braces
            token : "lparen",
            regex : "[[({]"
        }, {
            // Curly and square braces
            token : "rparen",
            regex : "[\\])}]"
        }, {
            // Escaped character (including new line)
            token : "constant.character.escape",
            regex : "\\\\[^a-zA-Z]?"
        }, {
            // An equation
            token : "string",
            regex : "\\${1,2}",
            next  : "equation"
        }],
        "equation" : [{
            token : "comment",
            regex : "%.*$"
        }, {
            token : "string",
            regex : "\\${1,2}",
            next  : "start"
        }, {
            token : "constant.character.escape",
            regex : "\\\\(?:[^a-zA-Z]|[a-zA-Z]+)"
        }, {
            token : "error", 
            regex : "^\\s*$", 
            next : "start" 
        }, {
            defaultToken : "string"
        }],
        "verbatim": [{
            token : ["storage.type", "lparen", "variable.parameter", "rparen"],
            regex : "(\\\\end)({)(verbatim)(})",
            next : "start"
        }, {
            defaultToken : "text"
        }],
        "lstlisting": [{
            token : ["storage.type", "lparen", "variable.parameter", "rparen"],
            regex : "(\\\\end)({)(lstlisting)(})",
            next : "start"
        }, {
            defaultToken : "text"
        }]
    };
    
    this.normalizeRules();
};
oop.inherits(LatexHighlightRules, TextHighlightRules);

exports.LatexHighlightRules = LatexHighlightRules;


/***/ }),

/***/ 28670:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var Range = (__webpack_require__(91902)/* .Range */ .Q);

var MatchingBraceOutdent = function() {};

(function() {

    this.checkOutdent = function(line, input) {
        if (! /^\s+$/.test(line))
            return false;

        return /^\s*\}/.test(input);
    };

    this.autoOutdent = function(doc, row) {
        var line = doc.getLine(row);
        var match = line.match(/^(\s*\})/);

        if (!match) return 0;

        var column = match[1].length;
        var openBracePos = doc.findMatchingBracket({row: row, column: column});

        if (!openBracePos || openBracePos.row == row) return 0;

        var indent = this.$getIndent(doc.getLine(openBracePos.row));
        doc.replace(new Range(row, 0, row, column-1), indent);
    };

    this.$getIndent = function(line) {
        return line.match(/^\s*/)[0];
    };

}).call(MatchingBraceOutdent.prototype);

exports.MatchingBraceOutdent = MatchingBraceOutdent;


/***/ }),

/***/ 17787:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/*
 * rdoc.js
 *
 * Copyright (C) 2009-11 by RStudio, Inc.
 *
 * The Initial Developer of the Original Code is
 * Ajax.org B.V.
 * Portions created by the Initial Developer are Copyright (C) 2010
 * the Initial Developer. All Rights Reserved.
 *
 * Distributed under the BSD license:
 *
 * Copyright (c) 2010, Ajax.org B.V.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of Ajax.org B.V. nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL AJAX.ORG B.V. BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 *
 */



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var RDocHighlightRules = (__webpack_require__(10752)/* .RDocHighlightRules */ .Y);
var MatchingBraceOutdent = (__webpack_require__(28670).MatchingBraceOutdent);

var Mode = function(suppressHighlighting) {
	this.HighlightRules = RDocHighlightRules;
    this.$outdent = new MatchingBraceOutdent();
    this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, TextMode);

(function() {
    this.getNextLineIndent = function(state, line, tab) {
        return this.$getIndent(line);
    };
    this.$id = "ace/mode/rdoc";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 10752:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/*
 * rdoc_highlight_rules.js
 *
 * Copyright (C) 2009-11 by RStudio, Inc.
 *
 * Distributed under the BSD license:
 *
 * Copyright (c) 2010, Ajax.org B.V.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of Ajax.org B.V. nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL AJAX.ORG B.V. BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 *
 */



var oop = __webpack_require__(2645);
var lang = __webpack_require__(39955);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);
var LaTeXHighlightRules = __webpack_require__(72644);

var RDocHighlightRules = function() {

    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used

    this.$rules = {
        "start" : [
            {
                token : "comment",
                regex : "%.*$"
            }, {
                token : "text", // non-command
                regex : "\\\\[$&%#\\{\\}]"
            }, {
                token : "keyword", // command
                regex : "\\\\(?:name|alias|method|S3method|S4method|item|code|preformatted|kbd|pkg|var|env|option|command|author|email|url|source|cite|acronym|href|code|preformatted|link|eqn|deqn|keyword|usage|examples|dontrun|dontshow|figure|if|ifelse|Sexpr|RdOpts|inputencoding|usepackage)\\b",
               next : "nospell"
            }, {
                token : "keyword", // command
                regex : "\\\\(?:[a-zA-Z0-9]+|[^a-zA-Z0-9])"
            }, {
               // Obviously these are neither keywords nor operators, but
               // labelling them as such was the easiest way to get them
               // to be colored distinctly from regular text
               token : "paren.keyword.operator",
                regex : "[[({]"
            }, {
               // Obviously these are neither keywords nor operators, but
               // labelling them as such was the easiest way to get them
               // to be colored distinctly from regular text
               token : "paren.keyword.operator",
                regex : "[\\])}]"
            }, {
                token : "text",
                regex : "\\s+"
            }
        ],
        // This mode is necessary to prevent spell checking, but to keep the
        // same syntax highlighting behavior. 
        "nospell" : [
           {
               token : "comment",
               regex : "%.*$",
               next : "start"
           }, {
               token : "nospell.text", // non-command
               regex : "\\\\[$&%#\\{\\}]"
           }, {
               token : "keyword", // command
               regex : "\\\\(?:name|alias|method|S3method|S4method|item|code|preformatted|kbd|pkg|var|env|option|command|author|email|url|source|cite|acronym|href|code|preformatted|link|eqn|deqn|keyword|usage|examples|dontrun|dontshow|figure|if|ifelse|Sexpr|RdOpts|inputencoding|usepackage)\\b"
           }, {
               token : "keyword", // command
               regex : "\\\\(?:[a-zA-Z0-9]+|[^a-zA-Z0-9])",
               next : "start"
           }, {
               token : "paren.keyword.operator",
               regex : "[[({]"
           }, {
               token : "paren.keyword.operator",
               regex : "[\\])]"
           }, {
               token : "paren.keyword.operator",
               regex : "}",
               next : "start"
           }, {
               token : "nospell.text",
               regex : "\\s+"
           }, {
               token : "nospell.text",
               regex : "\\w+"
           }
        ]
    };
};

oop.inherits(RDocHighlightRules, TextHighlightRules);

exports.Y = RDocHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBLG9DQUFvQyxHQUFHO0FBQ3ZDLFlBQVk7QUFDWjtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBLDRCQUE0QjtBQUM1QixZQUFZO0FBQ1o7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxTQUEwQiIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvbGF0ZXhfaGlnaGxpZ2h0X3J1bGVzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvbWF0Y2hpbmdfYnJhY2Vfb3V0ZGVudC5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL3Jkb2MuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9yZG9jX2hpZ2hsaWdodF9ydWxlcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcblxudmFyIExhdGV4SGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbigpIHsgIFxuXG4gICAgdGhpcy4kcnVsZXMgPSB7XG4gICAgICAgIFwic3RhcnRcIiA6IFt7XG4gICAgICAgICAgICAvLyBBIGNvbW1lbnQuIFRleCBjb21tZW50cyBzdGFydCB3aXRoICUgYW5kIGdvIHRvIFxuICAgICAgICAgICAgLy8gdGhlIGVuZCBvZiB0aGUgbGluZVxuICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCIlLiokXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgLy8gRG9jdW1lbnRjbGFzcyBhbmQgdXNlcGFja2FnZVxuICAgICAgICAgICAgdG9rZW4gOiBbXCJrZXl3b3JkXCIsIFwibHBhcmVuXCIsIFwidmFyaWFibGUucGFyYW1ldGVyXCIsIFwicnBhcmVuXCIsIFwibHBhcmVuXCIsIFwic3RvcmFnZS50eXBlXCIsIFwicnBhcmVuXCJdLFxuICAgICAgICAgICAgcmVnZXggOiBcIihcXFxcXFxcXCg/OmRvY3VtZW50Y2xhc3N8dXNlcGFja2FnZXxpbnB1dCkpKD86KFxcXFxbKShbXlxcXFxdXSopKFxcXFxdKSk/KHspKFtefV0qKSh9KVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIC8vIEEgbGFiZWxcbiAgICAgICAgICAgIHRva2VuIDogW1wia2V5d29yZFwiLFwibHBhcmVuXCIsIFwidmFyaWFibGUucGFyYW1ldGVyXCIsIFwicnBhcmVuXCJdLFxuICAgICAgICAgICAgcmVnZXggOiBcIihcXFxcXFxcXCg/OmxhYmVsfHY/cmVmfGNpdGUoPzpbXntdKikpKSg/Oih7KShbXn1dKikofSkpP1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIC8vIEEgVmVyYmF0aW0gYmxvY2tcbiAgICAgICAgICAgIHRva2VuIDogW1wic3RvcmFnZS50eXBlXCIsIFwibHBhcmVuXCIsIFwidmFyaWFibGUucGFyYW1ldGVyXCIsIFwicnBhcmVuXCJdLFxuICAgICAgICAgICAgcmVnZXggOiBcIihcXFxcXFxcXGJlZ2luKSh7KSh2ZXJiYXRpbSkofSlcIixcbiAgICAgICAgICAgIG5leHQgOiBcInZlcmJhdGltXCJcbiAgICAgICAgfSwgIHtcbiAgICAgICAgICAgIHRva2VuIDogW1wic3RvcmFnZS50eXBlXCIsIFwibHBhcmVuXCIsIFwidmFyaWFibGUucGFyYW1ldGVyXCIsIFwicnBhcmVuXCJdLFxuICAgICAgICAgICAgcmVnZXggOiBcIihcXFxcXFxcXGJlZ2luKSh7KShsc3RsaXN0aW5nKSh9KVwiLFxuICAgICAgICAgICAgbmV4dCA6IFwibHN0bGlzdGluZ1wiXG4gICAgICAgIH0sICB7XG4gICAgICAgICAgICAvLyBBIGJsb2NrXG4gICAgICAgICAgICB0b2tlbiA6IFtcInN0b3JhZ2UudHlwZVwiLCBcImxwYXJlblwiLCBcInZhcmlhYmxlLnBhcmFtZXRlclwiLCBcInJwYXJlblwiXSxcbiAgICAgICAgICAgIHJlZ2V4IDogXCIoXFxcXFxcXFwoPzpiZWdpbnxlbmQpKSh7KShbXFxcXHcqXSopKH0pXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInN0b3JhZ2UudHlwZVwiLFxuICAgICAgICAgICAgcmVnZXggOiAvXFxcXHZlcmJcXGJcXCo/LyxcbiAgICAgICAgICAgIG5leHQgOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuIDogW1wia2V5d29yZC5vcGVyYXRvclwiLCBcInN0cmluZ1wiLCBcImtleXdvcmQub3BlcmF0b3JcIl0sXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIiguKSguKj8pKFxcXFwxfCQpfFwiLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcInN0YXJ0XCJcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIC8vIEEgdGV4IGNvbW1hbmQgZS5nLiBcXGZvb1xuICAgICAgICAgICAgdG9rZW4gOiBcInN0b3JhZ2UudHlwZVwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIlxcXFxcXFxcW2EtekEtWl0rXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgLy8gQ3VybHkgYW5kIHNxdWFyZSBicmFjZXNcbiAgICAgICAgICAgIHRva2VuIDogXCJscGFyZW5cIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJbWyh7XVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIC8vIEN1cmx5IGFuZCBzcXVhcmUgYnJhY2VzXG4gICAgICAgICAgICB0b2tlbiA6IFwicnBhcmVuXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiW1xcXFxdKX1dXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgLy8gRXNjYXBlZCBjaGFyYWN0ZXIgKGluY2x1ZGluZyBuZXcgbGluZSlcbiAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5jaGFyYWN0ZXIuZXNjYXBlXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiXFxcXFxcXFxbXmEtekEtWl0/XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgLy8gQW4gZXF1YXRpb25cbiAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcJHsxLDJ9XCIsXG4gICAgICAgICAgICBuZXh0ICA6IFwiZXF1YXRpb25cIlxuICAgICAgICB9XSxcbiAgICAgICAgXCJlcXVhdGlvblwiIDogW3tcbiAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsXG4gICAgICAgICAgICByZWdleCA6IFwiJS4qJFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcJHsxLDJ9XCIsXG4gICAgICAgICAgICBuZXh0ICA6IFwic3RhcnRcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQuY2hhcmFjdGVyLmVzY2FwZVwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIlxcXFxcXFxcKD86W15hLXpBLVpdfFthLXpBLVpdKylcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwiZXJyb3JcIiwgXG4gICAgICAgICAgICByZWdleCA6IFwiXlxcXFxzKiRcIiwgXG4gICAgICAgICAgICBuZXh0IDogXCJzdGFydFwiIFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBkZWZhdWx0VG9rZW4gOiBcInN0cmluZ1wiXG4gICAgICAgIH1dLFxuICAgICAgICBcInZlcmJhdGltXCI6IFt7XG4gICAgICAgICAgICB0b2tlbiA6IFtcInN0b3JhZ2UudHlwZVwiLCBcImxwYXJlblwiLCBcInZhcmlhYmxlLnBhcmFtZXRlclwiLCBcInJwYXJlblwiXSxcbiAgICAgICAgICAgIHJlZ2V4IDogXCIoXFxcXFxcXFxlbmQpKHspKHZlcmJhdGltKSh9KVwiLFxuICAgICAgICAgICAgbmV4dCA6IFwic3RhcnRcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBkZWZhdWx0VG9rZW4gOiBcInRleHRcIlxuICAgICAgICB9XSxcbiAgICAgICAgXCJsc3RsaXN0aW5nXCI6IFt7XG4gICAgICAgICAgICB0b2tlbiA6IFtcInN0b3JhZ2UudHlwZVwiLCBcImxwYXJlblwiLCBcInZhcmlhYmxlLnBhcmFtZXRlclwiLCBcInJwYXJlblwiXSxcbiAgICAgICAgICAgIHJlZ2V4IDogXCIoXFxcXFxcXFxlbmQpKHspKGxzdGxpc3RpbmcpKH0pXCIsXG4gICAgICAgICAgICBuZXh0IDogXCJzdGFydFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGRlZmF1bHRUb2tlbiA6IFwidGV4dFwiXG4gICAgICAgIH1dXG4gICAgfTtcbiAgICBcbiAgICB0aGlzLm5vcm1hbGl6ZVJ1bGVzKCk7XG59O1xub29wLmluaGVyaXRzKExhdGV4SGlnaGxpZ2h0UnVsZXMsIFRleHRIaWdobGlnaHRSdWxlcyk7XG5cbmV4cG9ydHMuTGF0ZXhIaWdobGlnaHRSdWxlcyA9IExhdGV4SGlnaGxpZ2h0UnVsZXM7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIFJhbmdlID0gcmVxdWlyZShcIi4uL3JhbmdlXCIpLlJhbmdlO1xuXG52YXIgTWF0Y2hpbmdCcmFjZU91dGRlbnQgPSBmdW5jdGlvbigpIHt9O1xuXG4oZnVuY3Rpb24oKSB7XG5cbiAgICB0aGlzLmNoZWNrT3V0ZGVudCA9IGZ1bmN0aW9uKGxpbmUsIGlucHV0KSB7XG4gICAgICAgIGlmICghIC9eXFxzKyQvLnRlc3QobGluZSkpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgcmV0dXJuIC9eXFxzKlxcfS8udGVzdChpbnB1dCk7XG4gICAgfTtcblxuICAgIHRoaXMuYXV0b091dGRlbnQgPSBmdW5jdGlvbihkb2MsIHJvdykge1xuICAgICAgICB2YXIgbGluZSA9IGRvYy5nZXRMaW5lKHJvdyk7XG4gICAgICAgIHZhciBtYXRjaCA9IGxpbmUubWF0Y2goL14oXFxzKlxcfSkvKTtcblxuICAgICAgICBpZiAoIW1hdGNoKSByZXR1cm4gMDtcblxuICAgICAgICB2YXIgY29sdW1uID0gbWF0Y2hbMV0ubGVuZ3RoO1xuICAgICAgICB2YXIgb3BlbkJyYWNlUG9zID0gZG9jLmZpbmRNYXRjaGluZ0JyYWNrZXQoe3Jvdzogcm93LCBjb2x1bW46IGNvbHVtbn0pO1xuXG4gICAgICAgIGlmICghb3BlbkJyYWNlUG9zIHx8IG9wZW5CcmFjZVBvcy5yb3cgPT0gcm93KSByZXR1cm4gMDtcblxuICAgICAgICB2YXIgaW5kZW50ID0gdGhpcy4kZ2V0SW5kZW50KGRvYy5nZXRMaW5lKG9wZW5CcmFjZVBvcy5yb3cpKTtcbiAgICAgICAgZG9jLnJlcGxhY2UobmV3IFJhbmdlKHJvdywgMCwgcm93LCBjb2x1bW4tMSksIGluZGVudCk7XG4gICAgfTtcblxuICAgIHRoaXMuJGdldEluZGVudCA9IGZ1bmN0aW9uKGxpbmUpIHtcbiAgICAgICAgcmV0dXJuIGxpbmUubWF0Y2goL15cXHMqLylbMF07XG4gICAgfTtcblxufSkuY2FsbChNYXRjaGluZ0JyYWNlT3V0ZGVudC5wcm90b3R5cGUpO1xuXG5leHBvcnRzLk1hdGNoaW5nQnJhY2VPdXRkZW50ID0gTWF0Y2hpbmdCcmFjZU91dGRlbnQ7XG4iLCIvKlxuICogcmRvYy5qc1xuICpcbiAqIENvcHlyaWdodCAoQykgMjAwOS0xMSBieSBSU3R1ZGlvLCBJbmMuXG4gKlxuICogVGhlIEluaXRpYWwgRGV2ZWxvcGVyIG9mIHRoZSBPcmlnaW5hbCBDb2RlIGlzXG4gKiBBamF4Lm9yZyBCLlYuXG4gKiBQb3J0aW9ucyBjcmVhdGVkIGJ5IHRoZSBJbml0aWFsIERldmVsb3BlciBhcmUgQ29weXJpZ2h0IChDKSAyMDEwXG4gKiB0aGUgSW5pdGlhbCBEZXZlbG9wZXIuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIEJTRCBsaWNlbnNlOlxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxMCwgQWpheC5vcmcgQi5WLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBSZWRpc3RyaWJ1dGlvbiBhbmQgdXNlIGluIHNvdXJjZSBhbmQgYmluYXJ5IGZvcm1zLCB3aXRoIG9yIHdpdGhvdXRcbiAqIG1vZGlmaWNhdGlvbiwgYXJlIHBlcm1pdHRlZCBwcm92aWRlZCB0aGF0IHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgbWV0OlxuICogICAgICogUmVkaXN0cmlidXRpb25zIG9mIHNvdXJjZSBjb2RlIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHRcbiAqICAgICAgIG5vdGljZSwgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci5cbiAqICAgICAqIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUgY29weXJpZ2h0XG4gKiAgICAgICBub3RpY2UsIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIgaW4gdGhlXG4gKiAgICAgICBkb2N1bWVudGF0aW9uIGFuZC9vciBvdGhlciBtYXRlcmlhbHMgcHJvdmlkZWQgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxuICogICAgICogTmVpdGhlciB0aGUgbmFtZSBvZiBBamF4Lm9yZyBCLlYuIG5vciB0aGVcbiAqICAgICAgIG5hbWVzIG9mIGl0cyBjb250cmlidXRvcnMgbWF5IGJlIHVzZWQgdG8gZW5kb3JzZSBvciBwcm9tb3RlIHByb2R1Y3RzXG4gKiAgICAgICBkZXJpdmVkIGZyb20gdGhpcyBzb2Z0d2FyZSB3aXRob3V0IHNwZWNpZmljIHByaW9yIHdyaXR0ZW4gcGVybWlzc2lvbi5cbiAqXG4gKiBUSElTIFNPRlRXQVJFIElTIFBST1ZJREVEIEJZIFRIRSBDT1BZUklHSFQgSE9MREVSUyBBTkQgQ09OVFJJQlVUT1JTIFwiQVMgSVNcIiBBTkRcbiAqIEFOWSBFWFBSRVNTIE9SIElNUExJRUQgV0FSUkFOVElFUywgSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFRIRSBJTVBMSUVEXG4gKiBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSBBTkQgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQVJFXG4gKiBESVNDTEFJTUVELiBJTiBOTyBFVkVOVCBTSEFMTCBBSkFYLk9SRyBCLlYuIEJFIExJQUJMRSBGT1IgQU5ZXG4gKiBESVJFQ1QsIElORElSRUNULCBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFU1xuICogKElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTO1xuICogTE9TUyBPRiBVU0UsIERBVEEsIE9SIFBST0ZJVFM7IE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EXG4gKiBPTiBBTlkgVEhFT1JZIE9GIExJQUJJTElUWSwgV0hFVEhFUiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVFxuICogKElOQ0xVRElORyBORUdMSUdFTkNFIE9SIE9USEVSV0lTRSkgQVJJU0lORyBJTiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GXG4gKlxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dE1vZGUgPSByZXF1aXJlKFwiLi90ZXh0XCIpLk1vZGU7XG52YXIgUkRvY0hpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vcmRvY19oaWdobGlnaHRfcnVsZXNcIikuUkRvY0hpZ2hsaWdodFJ1bGVzO1xudmFyIE1hdGNoaW5nQnJhY2VPdXRkZW50ID0gcmVxdWlyZShcIi4vbWF0Y2hpbmdfYnJhY2Vfb3V0ZGVudFwiKS5NYXRjaGluZ0JyYWNlT3V0ZGVudDtcblxudmFyIE1vZGUgPSBmdW5jdGlvbihzdXBwcmVzc0hpZ2hsaWdodGluZykge1xuXHR0aGlzLkhpZ2hsaWdodFJ1bGVzID0gUkRvY0hpZ2hsaWdodFJ1bGVzO1xuICAgIHRoaXMuJG91dGRlbnQgPSBuZXcgTWF0Y2hpbmdCcmFjZU91dGRlbnQoKTtcbiAgICB0aGlzLiRiZWhhdmlvdXIgPSB0aGlzLiRkZWZhdWx0QmVoYXZpb3VyO1xufTtcbm9vcC5pbmhlcml0cyhNb2RlLCBUZXh0TW9kZSk7XG5cbihmdW5jdGlvbigpIHtcbiAgICB0aGlzLmdldE5leHRMaW5lSW5kZW50ID0gZnVuY3Rpb24oc3RhdGUsIGxpbmUsIHRhYikge1xuICAgICAgICByZXR1cm4gdGhpcy4kZ2V0SW5kZW50KGxpbmUpO1xuICAgIH07XG4gICAgdGhpcy4kaWQgPSBcImFjZS9tb2RlL3Jkb2NcIjtcbn0pLmNhbGwoTW9kZS5wcm90b3R5cGUpO1xuXG5leHBvcnRzLk1vZGUgPSBNb2RlO1xuIiwiLypcbiAqIHJkb2NfaGlnaGxpZ2h0X3J1bGVzLmpzXG4gKlxuICogQ29weXJpZ2h0IChDKSAyMDA5LTExIGJ5IFJTdHVkaW8sIEluYy5cbiAqXG4gKiBEaXN0cmlidXRlZCB1bmRlciB0aGUgQlNEIGxpY2Vuc2U6XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDEwLCBBamF4Lm9yZyBCLlYuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dFxuICogbW9kaWZpY2F0aW9uLCBhcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG4gKiAgICAgKiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodFxuICogICAgICAgbm90aWNlLCB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyLlxuICogICAgICogUmVkaXN0cmlidXRpb25zIGluIGJpbmFyeSBmb3JtIG11c3QgcmVwcm9kdWNlIHRoZSBhYm92ZSBjb3B5cmlnaHRcbiAqICAgICAgIG5vdGljZSwgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lciBpbiB0aGVcbiAqICAgICAgIGRvY3VtZW50YXRpb24gYW5kL29yIG90aGVyIG1hdGVyaWFscyBwcm92aWRlZCB3aXRoIHRoZSBkaXN0cmlidXRpb24uXG4gKiAgICAgKiBOZWl0aGVyIHRoZSBuYW1lIG9mIEFqYXgub3JnIEIuVi4gbm9yIHRoZVxuICogICAgICAgbmFtZXMgb2YgaXRzIGNvbnRyaWJ1dG9ycyBtYXkgYmUgdXNlZCB0byBlbmRvcnNlIG9yIHByb21vdGUgcHJvZHVjdHNcbiAqICAgICAgIGRlcml2ZWQgZnJvbSB0aGlzIHNvZnR3YXJlIHdpdGhvdXQgc3BlY2lmaWMgcHJpb3Igd3JpdHRlbiBwZXJtaXNzaW9uLlxuICpcbiAqIFRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgVEhFIENPUFlSSUdIVCBIT0xERVJTIEFORCBDT05UUklCVVRPUlMgXCJBUyBJU1wiIEFORFxuICogQU5ZIEVYUFJFU1MgT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFIElNUExJRURcbiAqIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBUkVcbiAqIERJU0NMQUlNRUQuIElOIE5PIEVWRU5UIFNIQUxMIEFKQVguT1JHIEIuVi4gQkUgTElBQkxFIEZPUiBBTllcbiAqIERJUkVDVCwgSU5ESVJFQ1QsIElOQ0lERU5UQUwsIFNQRUNJQUwsIEVYRU1QTEFSWSwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTXG4gKiAoSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFBST0NVUkVNRU5UIE9GIFNVQlNUSVRVVEUgR09PRFMgT1IgU0VSVklDRVM7XG4gKiBMT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUzsgT1IgQlVTSU5FU1MgSU5URVJSVVBUSU9OKSBIT1dFVkVSIENBVVNFRCBBTkRcbiAqIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSIElOIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUXG4gKiAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0UgT0ZcbiAqXG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBsYW5nID0gcmVxdWlyZShcIi4uL2xpYi9sYW5nXCIpO1xudmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcbnZhciBMYVRlWEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vbGF0ZXhfaGlnaGxpZ2h0X3J1bGVzXCIpO1xuXG52YXIgUkRvY0hpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24oKSB7XG5cbiAgICAvLyByZWdleHAgbXVzdCBub3QgaGF2ZSBjYXB0dXJpbmcgcGFyZW50aGVzZXMuIFVzZSAoPzopIGluc3RlYWQuXG4gICAgLy8gcmVnZXhwcyBhcmUgb3JkZXJlZCAtPiB0aGUgZmlyc3QgbWF0Y2ggaXMgdXNlZFxuXG4gICAgdGhpcy4kcnVsZXMgPSB7XG4gICAgICAgIFwic3RhcnRcIiA6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIlLiokXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwidGV4dFwiLCAvLyBub24tY29tbWFuZFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcXFxcXFskJiUjXFxcXHtcXFxcfV1cIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkXCIsIC8vIGNvbW1hbmRcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXFxcXFwoPzpuYW1lfGFsaWFzfG1ldGhvZHxTM21ldGhvZHxTNG1ldGhvZHxpdGVtfGNvZGV8cHJlZm9ybWF0dGVkfGtiZHxwa2d8dmFyfGVudnxvcHRpb258Y29tbWFuZHxhdXRob3J8ZW1haWx8dXJsfHNvdXJjZXxjaXRlfGFjcm9ueW18aHJlZnxjb2RlfHByZWZvcm1hdHRlZHxsaW5rfGVxbnxkZXFufGtleXdvcmR8dXNhZ2V8ZXhhbXBsZXN8ZG9udHJ1bnxkb250c2hvd3xmaWd1cmV8aWZ8aWZlbHNlfFNleHByfFJkT3B0c3xpbnB1dGVuY29kaW5nfHVzZXBhY2thZ2UpXFxcXGJcIixcbiAgICAgICAgICAgICAgIG5leHQgOiBcIm5vc3BlbGxcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkXCIsIC8vIGNvbW1hbmRcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXFxcXFwoPzpbYS16QS1aMC05XSt8W15hLXpBLVowLTldKVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAvLyBPYnZpb3VzbHkgdGhlc2UgYXJlIG5laXRoZXIga2V5d29yZHMgbm9yIG9wZXJhdG9ycywgYnV0XG4gICAgICAgICAgICAgICAvLyBsYWJlbGxpbmcgdGhlbSBhcyBzdWNoIHdhcyB0aGUgZWFzaWVzdCB3YXkgdG8gZ2V0IHRoZW1cbiAgICAgICAgICAgICAgIC8vIHRvIGJlIGNvbG9yZWQgZGlzdGluY3RseSBmcm9tIHJlZ3VsYXIgdGV4dFxuICAgICAgICAgICAgICAgdG9rZW4gOiBcInBhcmVuLmtleXdvcmQub3BlcmF0b3JcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiW1soe11cIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgLy8gT2J2aW91c2x5IHRoZXNlIGFyZSBuZWl0aGVyIGtleXdvcmRzIG5vciBvcGVyYXRvcnMsIGJ1dFxuICAgICAgICAgICAgICAgLy8gbGFiZWxsaW5nIHRoZW0gYXMgc3VjaCB3YXMgdGhlIGVhc2llc3Qgd2F5IHRvIGdldCB0aGVtXG4gICAgICAgICAgICAgICAvLyB0byBiZSBjb2xvcmVkIGRpc3RpbmN0bHkgZnJvbSByZWd1bGFyIHRleHRcbiAgICAgICAgICAgICAgIHRva2VuIDogXCJwYXJlbi5rZXl3b3JkLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIltcXFxcXSl9XVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXHMrXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgLy8gVGhpcyBtb2RlIGlzIG5lY2Vzc2FyeSB0byBwcmV2ZW50IHNwZWxsIGNoZWNraW5nLCBidXQgdG8ga2VlcCB0aGVcbiAgICAgICAgLy8gc2FtZSBzeW50YXggaGlnaGxpZ2h0aW5nIGJlaGF2aW9yLiBcbiAgICAgICAgXCJub3NwZWxsXCIgOiBbXG4gICAgICAgICAgIHtcbiAgICAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsXG4gICAgICAgICAgICAgICByZWdleCA6IFwiJS4qJFwiLFxuICAgICAgICAgICAgICAgbmV4dCA6IFwic3RhcnRcIlxuICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICB0b2tlbiA6IFwibm9zcGVsbC50ZXh0XCIsIC8vIG5vbi1jb21tYW5kXG4gICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXFxcXFxbJCYlI1xcXFx7XFxcXH1dXCJcbiAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgdG9rZW4gOiBcImtleXdvcmRcIiwgLy8gY29tbWFuZFxuICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFxcXFxcKD86bmFtZXxhbGlhc3xtZXRob2R8UzNtZXRob2R8UzRtZXRob2R8aXRlbXxjb2RlfHByZWZvcm1hdHRlZHxrYmR8cGtnfHZhcnxlbnZ8b3B0aW9ufGNvbW1hbmR8YXV0aG9yfGVtYWlsfHVybHxzb3VyY2V8Y2l0ZXxhY3JvbnltfGhyZWZ8Y29kZXxwcmVmb3JtYXR0ZWR8bGlua3xlcW58ZGVxbnxrZXl3b3JkfHVzYWdlfGV4YW1wbGVzfGRvbnRydW58ZG9udHNob3d8ZmlndXJlfGlmfGlmZWxzZXxTZXhwcnxSZE9wdHN8aW5wdXRlbmNvZGluZ3x1c2VwYWNrYWdlKVxcXFxiXCJcbiAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgdG9rZW4gOiBcImtleXdvcmRcIiwgLy8gY29tbWFuZFxuICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFxcXFxcKD86W2EtekEtWjAtOV0rfFteYS16QS1aMC05XSlcIixcbiAgICAgICAgICAgICAgIG5leHQgOiBcInN0YXJ0XCJcbiAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgdG9rZW4gOiBcInBhcmVuLmtleXdvcmQub3BlcmF0b3JcIixcbiAgICAgICAgICAgICAgIHJlZ2V4IDogXCJbWyh7XVwiXG4gICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgIHRva2VuIDogXCJwYXJlbi5rZXl3b3JkLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICAgICByZWdleCA6IFwiW1xcXFxdKV1cIlxuICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICB0b2tlbiA6IFwicGFyZW4ua2V5d29yZC5vcGVyYXRvclwiLFxuICAgICAgICAgICAgICAgcmVnZXggOiBcIn1cIixcbiAgICAgICAgICAgICAgIG5leHQgOiBcInN0YXJ0XCJcbiAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgdG9rZW4gOiBcIm5vc3BlbGwudGV4dFwiLFxuICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFxzK1wiXG4gICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgIHRva2VuIDogXCJub3NwZWxsLnRleHRcIixcbiAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcdytcIlxuICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9O1xufTtcblxub29wLmluaGVyaXRzKFJEb2NIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuZXhwb3J0cy5SRG9jSGlnaGxpZ2h0UnVsZXMgPSBSRG9jSGlnaGxpZ2h0UnVsZXM7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=