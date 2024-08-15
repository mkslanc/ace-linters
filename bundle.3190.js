"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[3190],{

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

/***/ 13190:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/*
 * tex.js
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
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);
var TexHighlightRules = (__webpack_require__(51249)/* .TexHighlightRules */ .l);
var MatchingBraceOutdent = (__webpack_require__(28670).MatchingBraceOutdent);

var Mode = function(suppressHighlighting) {
    if (suppressHighlighting)
        this.HighlightRules = TextHighlightRules;
    else
        this.HighlightRules = TexHighlightRules;
    this.$outdent = new MatchingBraceOutdent();
    this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, TextMode);

(function() {
   this.lineCommentStart = "%";
   this.getNextLineIndent = function(state, line, tab) {
      return this.$getIndent(line);
   };

   this.allowAutoInsert = function() {
      return false;
   };
    this.$id = "ace/mode/tex";
    this.snippetFileId = "ace/snippets/tex";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 51249:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/*
 * tex_highlight_rules.js
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
var lang = __webpack_require__(39955);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

var TexHighlightRules = function(textClass) {

    if (!textClass)
        textClass = "text";

    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used

    this.$rules = {
        "start" : [
            {
                token : "comment",
                regex : "%.*$"
            }, {
                token : textClass, // non-command
                regex : "\\\\[$&%#\\{\\}]"
            }, {
                token : "keyword", // command
                regex : "\\\\(?:documentclass|usepackage|newcounter|setcounter|addtocounter|value|arabic|stepcounter|newenvironment|renewenvironment|ref|vref|eqref|pageref|label|cite[a-zA-Z]*|tag|begin|end|bibitem)\\b",
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
                token : textClass,
                regex : "\\s+"
            }
        ],
        // This mode is necessary to prevent spell checking, but to keep the
        // same syntax highlighting behavior. The list of commands comes from
        // Texlipse.
        "nospell" : [
           {
               token : "comment",
               regex : "%.*$",
               next : "start"
           }, {
               token : "nospell." + textClass, // non-command
               regex : "\\\\[$&%#\\{\\}]"
           }, {
               token : "keyword", // command
               regex : "\\\\(?:documentclass|usepackage|newcounter|setcounter|addtocounter|value|arabic|stepcounter|newenvironment|renewenvironment|ref|vref|eqref|pageref|label|cite[a-zA-Z]*|tag|begin|end|bibitem)\\b"
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
               token : "nospell." + textClass,
               regex : "\\s+"
           }, {
               token : "nospell." + textClass,
               regex : "\\w+"
           }
        ]
    };
};

oop.inherits(TexHighlightRules, TextHighlightRules);

exports.l = TexHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjMxOTAuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsWUFBWSwyQ0FBeUI7O0FBRXJDOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxzQkFBc0I7QUFDdEI7O0FBRUE7QUFDQTtBQUNBLHVDQUF1Qzs7QUFFdkM7O0FBRUE7QUFDQSxvREFBb0QseUJBQXlCOztBQUU3RTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLENBQUM7O0FBRUQsNEJBQTRCOzs7Ozs7OztBQ3BDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixVQUFVLG1CQUFPLENBQUMsSUFBWTtBQUM5QixlQUFlLGlDQUFzQjtBQUNyQyx5QkFBeUIsd0RBQW9EO0FBQzdFLHdCQUF3Qix1REFBa0Q7QUFDMUUsMkJBQTJCLGlEQUF3RDs7QUFFbkY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQsWUFBWTs7Ozs7Ozs7QUNyRVo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixVQUFVLG1CQUFPLENBQUMsSUFBWTtBQUM5QixXQUFXLG1CQUFPLENBQUMsS0FBYTtBQUNoQyx5QkFBeUIsd0RBQW9EOztBQUU3RTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLHFDQUFxQyxHQUFHO0FBQ3hDLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0IsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBLG9DQUFvQyxHQUFHO0FBQ3ZDLFlBQVk7QUFDWjtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBLDRCQUE0QjtBQUM1QixZQUFZO0FBQ1o7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxTQUF5QiIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvbWF0Y2hpbmdfYnJhY2Vfb3V0ZGVudC5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL3RleC5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL3RleF9oaWdobGlnaHRfcnVsZXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBSYW5nZSA9IHJlcXVpcmUoXCIuLi9yYW5nZVwiKS5SYW5nZTtcblxudmFyIE1hdGNoaW5nQnJhY2VPdXRkZW50ID0gZnVuY3Rpb24oKSB7fTtcblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5jaGVja091dGRlbnQgPSBmdW5jdGlvbihsaW5lLCBpbnB1dCkge1xuICAgICAgICBpZiAoISAvXlxccyskLy50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIHJldHVybiAvXlxccypcXH0vLnRlc3QoaW5wdXQpO1xuICAgIH07XG5cbiAgICB0aGlzLmF1dG9PdXRkZW50ID0gZnVuY3Rpb24oZG9jLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBkb2MuZ2V0TGluZShyb3cpO1xuICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKC9eKFxccypcXH0pLyk7XG5cbiAgICAgICAgaWYgKCFtYXRjaCkgcmV0dXJuIDA7XG5cbiAgICAgICAgdmFyIGNvbHVtbiA9IG1hdGNoWzFdLmxlbmd0aDtcbiAgICAgICAgdmFyIG9wZW5CcmFjZVBvcyA9IGRvYy5maW5kTWF0Y2hpbmdCcmFja2V0KHtyb3c6IHJvdywgY29sdW1uOiBjb2x1bW59KTtcblxuICAgICAgICBpZiAoIW9wZW5CcmFjZVBvcyB8fCBvcGVuQnJhY2VQb3Mucm93ID09IHJvdykgcmV0dXJuIDA7XG5cbiAgICAgICAgdmFyIGluZGVudCA9IHRoaXMuJGdldEluZGVudChkb2MuZ2V0TGluZShvcGVuQnJhY2VQb3Mucm93KSk7XG4gICAgICAgIGRvYy5yZXBsYWNlKG5ldyBSYW5nZShyb3csIDAsIHJvdywgY29sdW1uLTEpLCBpbmRlbnQpO1xuICAgIH07XG5cbiAgICB0aGlzLiRnZXRJbmRlbnQgPSBmdW5jdGlvbihsaW5lKSB7XG4gICAgICAgIHJldHVybiBsaW5lLm1hdGNoKC9eXFxzKi8pWzBdO1xuICAgIH07XG5cbn0pLmNhbGwoTWF0Y2hpbmdCcmFjZU91dGRlbnQucHJvdG90eXBlKTtcblxuZXhwb3J0cy5NYXRjaGluZ0JyYWNlT3V0ZGVudCA9IE1hdGNoaW5nQnJhY2VPdXRkZW50O1xuIiwiLypcbiAqIHRleC5qc1xuICpcbiAqIENvcHlyaWdodCAoQykgMjAwOS0xMSBieSBSU3R1ZGlvLCBJbmMuXG4gKlxuICogVGhlIEluaXRpYWwgRGV2ZWxvcGVyIG9mIHRoZSBPcmlnaW5hbCBDb2RlIGlzXG4gKiBBamF4Lm9yZyBCLlYuXG4gKiBQb3J0aW9ucyBjcmVhdGVkIGJ5IHRoZSBJbml0aWFsIERldmVsb3BlciBhcmUgQ29weXJpZ2h0IChDKSAyMDEwXG4gKiB0aGUgSW5pdGlhbCBEZXZlbG9wZXIuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIEJTRCBsaWNlbnNlOlxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxMCwgQWpheC5vcmcgQi5WLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBSZWRpc3RyaWJ1dGlvbiBhbmQgdXNlIGluIHNvdXJjZSBhbmQgYmluYXJ5IGZvcm1zLCB3aXRoIG9yIHdpdGhvdXRcbiAqIG1vZGlmaWNhdGlvbiwgYXJlIHBlcm1pdHRlZCBwcm92aWRlZCB0aGF0IHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgbWV0OlxuICogICAgICogUmVkaXN0cmlidXRpb25zIG9mIHNvdXJjZSBjb2RlIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHRcbiAqICAgICAgIG5vdGljZSwgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci5cbiAqICAgICAqIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUgY29weXJpZ2h0XG4gKiAgICAgICBub3RpY2UsIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIgaW4gdGhlXG4gKiAgICAgICBkb2N1bWVudGF0aW9uIGFuZC9vciBvdGhlciBtYXRlcmlhbHMgcHJvdmlkZWQgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxuICogICAgICogTmVpdGhlciB0aGUgbmFtZSBvZiBBamF4Lm9yZyBCLlYuIG5vciB0aGVcbiAqICAgICAgIG5hbWVzIG9mIGl0cyBjb250cmlidXRvcnMgbWF5IGJlIHVzZWQgdG8gZW5kb3JzZSBvciBwcm9tb3RlIHByb2R1Y3RzXG4gKiAgICAgICBkZXJpdmVkIGZyb20gdGhpcyBzb2Z0d2FyZSB3aXRob3V0IHNwZWNpZmljIHByaW9yIHdyaXR0ZW4gcGVybWlzc2lvbi5cbiAqXG4gKiBUSElTIFNPRlRXQVJFIElTIFBST1ZJREVEIEJZIFRIRSBDT1BZUklHSFQgSE9MREVSUyBBTkQgQ09OVFJJQlVUT1JTIFwiQVMgSVNcIiBBTkRcbiAqIEFOWSBFWFBSRVNTIE9SIElNUExJRUQgV0FSUkFOVElFUywgSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFRIRSBJTVBMSUVEXG4gKiBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSBBTkQgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQVJFXG4gKiBESVNDTEFJTUVELiBJTiBOTyBFVkVOVCBTSEFMTCBBSkFYLk9SRyBCLlYuIEJFIExJQUJMRSBGT1IgQU5ZXG4gKiBESVJFQ1QsIElORElSRUNULCBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFU1xuICogKElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTO1xuICogTE9TUyBPRiBVU0UsIERBVEEsIE9SIFBST0ZJVFM7IE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EXG4gKiBPTiBBTlkgVEhFT1JZIE9GIExJQUJJTElUWSwgV0hFVEhFUiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVFxuICogKElOQ0xVRElORyBORUdMSUdFTkNFIE9SIE9USEVSV0lTRSkgQVJJU0lORyBJTiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GXG4gKlxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dE1vZGUgPSByZXF1aXJlKFwiLi90ZXh0XCIpLk1vZGU7XG52YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xudmFyIFRleEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4X2hpZ2hsaWdodF9ydWxlc1wiKS5UZXhIaWdobGlnaHRSdWxlcztcbnZhciBNYXRjaGluZ0JyYWNlT3V0ZGVudCA9IHJlcXVpcmUoXCIuL21hdGNoaW5nX2JyYWNlX291dGRlbnRcIikuTWF0Y2hpbmdCcmFjZU91dGRlbnQ7XG5cbnZhciBNb2RlID0gZnVuY3Rpb24oc3VwcHJlc3NIaWdobGlnaHRpbmcpIHtcbiAgICBpZiAoc3VwcHJlc3NIaWdobGlnaHRpbmcpXG4gICAgICAgIHRoaXMuSGlnaGxpZ2h0UnVsZXMgPSBUZXh0SGlnaGxpZ2h0UnVsZXM7XG4gICAgZWxzZVxuICAgICAgICB0aGlzLkhpZ2hsaWdodFJ1bGVzID0gVGV4SGlnaGxpZ2h0UnVsZXM7XG4gICAgdGhpcy4kb3V0ZGVudCA9IG5ldyBNYXRjaGluZ0JyYWNlT3V0ZGVudCgpO1xuICAgIHRoaXMuJGJlaGF2aW91ciA9IHRoaXMuJGRlZmF1bHRCZWhhdmlvdXI7XG59O1xub29wLmluaGVyaXRzKE1vZGUsIFRleHRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuICAgdGhpcy5saW5lQ29tbWVudFN0YXJ0ID0gXCIlXCI7XG4gICB0aGlzLmdldE5leHRMaW5lSW5kZW50ID0gZnVuY3Rpb24oc3RhdGUsIGxpbmUsIHRhYikge1xuICAgICAgcmV0dXJuIHRoaXMuJGdldEluZGVudChsaW5lKTtcbiAgIH07XG5cbiAgIHRoaXMuYWxsb3dBdXRvSW5zZXJ0ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICB9O1xuICAgIHRoaXMuJGlkID0gXCJhY2UvbW9kZS90ZXhcIjtcbiAgICB0aGlzLnNuaXBwZXRGaWxlSWQgPSBcImFjZS9zbmlwcGV0cy90ZXhcIjtcbn0pLmNhbGwoTW9kZS5wcm90b3R5cGUpO1xuXG5leHBvcnRzLk1vZGUgPSBNb2RlO1xuIiwiLypcbiAqIHRleF9oaWdobGlnaHRfcnVsZXMuanNcbiAqXG4gKiBDb3B5cmlnaHQgKEMpIDIwMDktMTEgYnkgUlN0dWRpbywgSW5jLlxuICpcbiAqIFRoZSBJbml0aWFsIERldmVsb3BlciBvZiB0aGUgT3JpZ2luYWwgQ29kZSBpc1xuICogQWpheC5vcmcgQi5WLlxuICogUG9ydGlvbnMgY3JlYXRlZCBieSB0aGUgSW5pdGlhbCBEZXZlbG9wZXIgYXJlIENvcHlyaWdodCAoQykgMjAxMFxuICogdGhlIEluaXRpYWwgRGV2ZWxvcGVyLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSBCU0QgbGljZW5zZTpcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTAsIEFqYXgub3JnIEIuVi5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogUmVkaXN0cmlidXRpb24gYW5kIHVzZSBpbiBzb3VyY2UgYW5kIGJpbmFyeSBmb3Jtcywgd2l0aCBvciB3aXRob3V0XG4gKiBtb2RpZmljYXRpb24sIGFyZSBwZXJtaXR0ZWQgcHJvdmlkZWQgdGhhdCB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIG1ldDpcbiAqICAgICAqIFJlZGlzdHJpYnV0aW9ucyBvZiBzb3VyY2UgY29kZSBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0XG4gKiAgICAgICBub3RpY2UsIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIuXG4gKiAgICAgKiBSZWRpc3RyaWJ1dGlvbnMgaW4gYmluYXJ5IGZvcm0gbXVzdCByZXByb2R1Y2UgdGhlIGFib3ZlIGNvcHlyaWdodFxuICogICAgICAgbm90aWNlLCB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZVxuICogICAgICAgZG9jdW1lbnRhdGlvbiBhbmQvb3Igb3RoZXIgbWF0ZXJpYWxzIHByb3ZpZGVkIHdpdGggdGhlIGRpc3RyaWJ1dGlvbi5cbiAqICAgICAqIE5laXRoZXIgdGhlIG5hbWUgb2YgQWpheC5vcmcgQi5WLiBub3IgdGhlXG4gKiAgICAgICBuYW1lcyBvZiBpdHMgY29udHJpYnV0b3JzIG1heSBiZSB1c2VkIHRvIGVuZG9yc2Ugb3IgcHJvbW90ZSBwcm9kdWN0c1xuICogICAgICAgZGVyaXZlZCBmcm9tIHRoaXMgc29mdHdhcmUgd2l0aG91dCBzcGVjaWZpYyBwcmlvciB3cml0dGVuIHBlcm1pc3Npb24uXG4gKlxuICogVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCIgQU5EXG4gKiBBTlkgRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRFxuICogV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRVxuICogRElTQ0xBSU1FRC4gSU4gTk8gRVZFTlQgU0hBTEwgQUpBWC5PUkcgQi5WLiBCRSBMSUFCTEUgRk9SIEFOWVxuICogRElSRUNULCBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVNcbiAqIChJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0YgU1VCU1RJVFVURSBHT09EUyBPUiBTRVJWSUNFUztcbiAqIExPU1MgT0YgVVNFLCBEQVRBLCBPUiBQUk9GSVRTOyBPUiBCVVNJTkVTUyBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIEFORFxuICogT04gQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlRcbiAqIChJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpIEFSSVNJTkcgSU4gQU5ZIFdBWSBPVVQgT0YgVEhFIFVTRSBPRlxuICpcbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIGxhbmcgPSByZXF1aXJlKFwiLi4vbGliL2xhbmdcIik7XG52YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xuXG52YXIgVGV4SGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbih0ZXh0Q2xhc3MpIHtcblxuICAgIGlmICghdGV4dENsYXNzKVxuICAgICAgICB0ZXh0Q2xhc3MgPSBcInRleHRcIjtcblxuICAgIC8vIHJlZ2V4cCBtdXN0IG5vdCBoYXZlIGNhcHR1cmluZyBwYXJlbnRoZXNlcy4gVXNlICg/OikgaW5zdGVhZC5cbiAgICAvLyByZWdleHBzIGFyZSBvcmRlcmVkIC0+IHRoZSBmaXJzdCBtYXRjaCBpcyB1c2VkXG5cbiAgICB0aGlzLiRydWxlcyA9IHtcbiAgICAgICAgXCJzdGFydFwiIDogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIiUuKiRcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogdGV4dENsYXNzLCAvLyBub24tY29tbWFuZFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcXFxcXFskJiUjXFxcXHtcXFxcfV1cIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkXCIsIC8vIGNvbW1hbmRcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXFxcXFwoPzpkb2N1bWVudGNsYXNzfHVzZXBhY2thZ2V8bmV3Y291bnRlcnxzZXRjb3VudGVyfGFkZHRvY291bnRlcnx2YWx1ZXxhcmFiaWN8c3RlcGNvdW50ZXJ8bmV3ZW52aXJvbm1lbnR8cmVuZXdlbnZpcm9ubWVudHxyZWZ8dnJlZnxlcXJlZnxwYWdlcmVmfGxhYmVsfGNpdGVbYS16QS1aXSp8dGFnfGJlZ2lufGVuZHxiaWJpdGVtKVxcXFxiXCIsXG4gICAgICAgICAgICAgICBuZXh0IDogXCJub3NwZWxsXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwia2V5d29yZFwiLCAvLyBjb21tYW5kXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFxcXFxcKD86W2EtekEtWjAtOV0rfFteYS16QS1aMC05XSlcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgLy8gT2J2aW91c2x5IHRoZXNlIGFyZSBuZWl0aGVyIGtleXdvcmRzIG5vciBvcGVyYXRvcnMsIGJ1dFxuICAgICAgICAgICAgICAgLy8gbGFiZWxsaW5nIHRoZW0gYXMgc3VjaCB3YXMgdGhlIGVhc2llc3Qgd2F5IHRvIGdldCB0aGVtXG4gICAgICAgICAgICAgICAvLyB0byBiZSBjb2xvcmVkIGRpc3RpbmN0bHkgZnJvbSByZWd1bGFyIHRleHRcbiAgICAgICAgICAgICAgIHRva2VuIDogXCJwYXJlbi5rZXl3b3JkLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIltbKHtdXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgIC8vIE9idmlvdXNseSB0aGVzZSBhcmUgbmVpdGhlciBrZXl3b3JkcyBub3Igb3BlcmF0b3JzLCBidXRcbiAgICAgICAgICAgICAgIC8vIGxhYmVsbGluZyB0aGVtIGFzIHN1Y2ggd2FzIHRoZSBlYXNpZXN0IHdheSB0byBnZXQgdGhlbVxuICAgICAgICAgICAgICAgLy8gdG8gYmUgY29sb3JlZCBkaXN0aW5jdGx5IGZyb20gcmVndWxhciB0ZXh0XG4gICAgICAgICAgICAgICB0b2tlbiA6IFwicGFyZW4ua2V5d29yZC5vcGVyYXRvclwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJbXFxcXF0pfV1cIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogdGV4dENsYXNzLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxccytcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICAvLyBUaGlzIG1vZGUgaXMgbmVjZXNzYXJ5IHRvIHByZXZlbnQgc3BlbGwgY2hlY2tpbmcsIGJ1dCB0byBrZWVwIHRoZVxuICAgICAgICAvLyBzYW1lIHN5bnRheCBoaWdobGlnaHRpbmcgYmVoYXZpb3IuIFRoZSBsaXN0IG9mIGNvbW1hbmRzIGNvbWVzIGZyb21cbiAgICAgICAgLy8gVGV4bGlwc2UuXG4gICAgICAgIFwibm9zcGVsbFwiIDogW1xuICAgICAgICAgICB7XG4gICAgICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudFwiLFxuICAgICAgICAgICAgICAgcmVnZXggOiBcIiUuKiRcIixcbiAgICAgICAgICAgICAgIG5leHQgOiBcInN0YXJ0XCJcbiAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgdG9rZW4gOiBcIm5vc3BlbGwuXCIgKyB0ZXh0Q2xhc3MsIC8vIG5vbi1jb21tYW5kXG4gICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXFxcXFxbJCYlI1xcXFx7XFxcXH1dXCJcbiAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgdG9rZW4gOiBcImtleXdvcmRcIiwgLy8gY29tbWFuZFxuICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFxcXFxcKD86ZG9jdW1lbnRjbGFzc3x1c2VwYWNrYWdlfG5ld2NvdW50ZXJ8c2V0Y291bnRlcnxhZGR0b2NvdW50ZXJ8dmFsdWV8YXJhYmljfHN0ZXBjb3VudGVyfG5ld2Vudmlyb25tZW50fHJlbmV3ZW52aXJvbm1lbnR8cmVmfHZyZWZ8ZXFyZWZ8cGFnZXJlZnxsYWJlbHxjaXRlW2EtekEtWl0qfHRhZ3xiZWdpbnxlbmR8YmliaXRlbSlcXFxcYlwiXG4gICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkXCIsIC8vIGNvbW1hbmRcbiAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcXFxcXCg/OlthLXpBLVowLTldK3xbXmEtekEtWjAtOV0pXCIsXG4gICAgICAgICAgICAgICBuZXh0IDogXCJzdGFydFwiXG4gICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgIHRva2VuIDogXCJwYXJlbi5rZXl3b3JkLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICAgICByZWdleCA6IFwiW1soe11cIlxuICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICB0b2tlbiA6IFwicGFyZW4ua2V5d29yZC5vcGVyYXRvclwiLFxuICAgICAgICAgICAgICAgcmVnZXggOiBcIltcXFxcXSldXCJcbiAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgdG9rZW4gOiBcInBhcmVuLmtleXdvcmQub3BlcmF0b3JcIixcbiAgICAgICAgICAgICAgIHJlZ2V4IDogXCJ9XCIsXG4gICAgICAgICAgICAgICBuZXh0IDogXCJzdGFydFwiXG4gICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgIHRva2VuIDogXCJub3NwZWxsLlwiICsgdGV4dENsYXNzLFxuICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFxzK1wiXG4gICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgIHRva2VuIDogXCJub3NwZWxsLlwiICsgdGV4dENsYXNzLFxuICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFx3K1wiXG4gICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH07XG59O1xuXG5vb3AuaW5oZXJpdHMoVGV4SGlnaGxpZ2h0UnVsZXMsIFRleHRIaWdobGlnaHRSdWxlcyk7XG5cbmV4cG9ydHMuVGV4SGlnaGxpZ2h0UnVsZXMgPSBUZXhIaWdobGlnaHRSdWxlcztcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==