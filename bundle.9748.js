(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[9748],{

/***/ 31042:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/*
 * r_highlight_rules.js
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
   var TexHighlightRules = (__webpack_require__(51249)/* .TexHighlightRules */ .l);

   var RHighlightRules = function()
   {

      var keywords = lang.arrayToMap(
            ("function|if|in|break|next|repeat|else|for|return|switch|while|try|tryCatch|stop|warning|require|library|attach|detach|source|setMethod|setGeneric|setGroupGeneric|setClass")
                  .split("|")
            );

      var buildinConstants = lang.arrayToMap(
            ("NULL|NA|TRUE|FALSE|T|F|Inf|NaN|NA_integer_|NA_real_|NA_character_|" +
             "NA_complex_").split("|")
            );

      // regexp must not have capturing parentheses. Use (?:) instead.
      // regexps are ordered -> the first match is used

      this.$rules = {
         "start" : [
            {
               // Roxygen
               token : "comment.sectionhead",
               regex : "#+(?!').*(?:----|====|####)\\s*$"
            },
            {
               // Roxygen
               token : "comment",
               regex : "#+'",
               next : "rd-start"
            },
            {
               token : "comment",
               regex : "#.*$"
            },
            {
               token : "string", // multi line string start
               regex : '["]',
               next : "qqstring"
            },
            {
               token : "string", // multi line string start
               regex : "[']",
               next : "qstring"
            },
            {
               token : "constant.numeric", // hex
               regex : "0[xX][0-9a-fA-F]+[Li]?\\b"
            },
            {
               token : "constant.numeric", // explicit integer
               regex : "\\d+L\\b"
            },
            {
               token : "constant.numeric", // number
               regex : "\\d+(?:\\.\\d*)?(?:[eE][+\\-]?\\d*)?i?\\b"
            },
            {
               token : "constant.numeric", // number with leading decimal
               regex : "\\.\\d+(?:[eE][+\\-]?\\d*)?i?\\b"
            },
            {
               token : "constant.language.boolean",
               regex : "(?:TRUE|FALSE|T|F)\\b"
            },
            {
               token : "identifier",
               regex : "`.*?`"
            },
            {
               onMatch : function(value) {
                  if (keywords[value])
                     return "keyword";
                  else if (buildinConstants[value])
                     return "constant.language";
                  else if (value == '...' || value.match(/^\.\.\d+$/))
                     return "variable.language";
                  else
                     return "identifier";
               },
               regex : "[a-zA-Z.][a-zA-Z0-9._]*\\b"
            },
            {
               token : "keyword.operator",
               regex : "%%|>=|<=|==|!=|\\->|<\\-|\\|\\||&&|=|\\+|\\-|\\*|/|\\^|>|<|!|&|\\||~|\\$|:"
            },
            {
               token : "keyword.operator", // infix operators
               regex : "%.*?%"
            },
            {
               // Obviously these are neither keywords nor operators, but
               // labelling them as such was the easiest way to get them
               // to be colored distinctly from regular text
               token : "paren.keyword.operator",
               regex : "[[({]"
            },
            {
               // Obviously these are neither keywords nor operators, but
               // labelling them as such was the easiest way to get them
               // to be colored distinctly from regular text
               token : "paren.keyword.operator",
               regex : "[\\])}]"
            },
            {
               token : "text",
               regex : "\\s+"
            }
         ],
         "qqstring" : [
            {
               token : "string",
               regex : '(?:(?:\\\\.)|(?:[^"\\\\]))*?"',
               next : "start"
            },
            {
               token : "string",
               regex : '.+'
            }
         ],
         "qstring" : [
            {
               token : "string",
               regex : "(?:(?:\\\\.)|(?:[^'\\\\]))*?'",
               next : "start"
            },
            {
               token : "string",
               regex : '.+'
            }
         ]
      };

      var rdRules = new TexHighlightRules("comment").getRules();

      // Make all embedded TeX virtual-comment so they don't interfere with
      // auto-indent.
      for (var i = 0; i < rdRules["start"].length; i++) {
         rdRules["start"][i].token += ".virtual-comment";
      }

      this.addRules(rdRules, "rd-");
      this.$rules["rd-start"].unshift({
          token: "text",
          regex: "^",
          next: "start"
      });
      this.$rules["rd-start"].unshift({
         token : "keyword",
         regex : "@(?!@)[^ ]*"
      });
      this.$rules["rd-start"].unshift({
         token : "comment",
         regex : "@@"
      });
      this.$rules["rd-start"].push({
         token : "comment",
         regex : "[^%\\\\[({\\])}]+"
      });
   };

   oop.inherits(RHighlightRules, TextHighlightRules);

   exports.O = RHighlightRules;


/***/ }),

/***/ 9748:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/*
 * rhtml.js
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
 */



var oop = __webpack_require__(2645);
var HtmlMode = (__webpack_require__(32234).Mode);

var RHtmlHighlightRules = (__webpack_require__(73303)/* .RHtmlHighlightRules */ .D);
/* Make life easier, don't do these right now 
var SweaveBackgroundHighlighter = require("mode/sweave_background_highlighter").SweaveBackgroundHighlighter;
var RCodeModel = require("mode/r_code_model").RCodeModel;
*/

var Mode = function(doc, session) {
   HtmlMode.call(this);
   this.$session = session;
   this.HighlightRules = RHtmlHighlightRules;

   /* Or these.
   this.codeModel = new RCodeModel(doc, this.$tokenizer, /^r-/,
                                   /^<!--\s*begin.rcode\s*(.*)/);
   this.foldingRules = this.codeModel;
   this.$sweaveBackgroundHighlighter = new SweaveBackgroundHighlighter(
         session,
         /^<!--\s*begin.rcode\s*(?:.*)/,
         /^\s*end.rcode\s*-->/,
         true); */
};
oop.inherits(Mode, HtmlMode);

(function() {
   this.insertChunkInfo = {
      value: "<!--begin.rcode\n\nend.rcode-->\n",
      position: {row: 0, column: 15}
   };
    
   this.getLanguageMode = function(position)
   {
      return this.$session.getState(position.row).match(/^r-/) ? 'R' : 'HTML';
   };

   /* this.getNextLineIndent = function(state, line, tab, tabSize, row)
   {
      return this.codeModel.getNextLineIndent(row, line, state, tab, tabSize);
   }; */

    this.$id = "ace/mode/rhtml";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 73303:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/*
 * rhtml_highlight_rules.js
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
var RHighlightRules = (__webpack_require__(31042)/* .RHighlightRules */ .O);
var HtmlHighlightRules = (__webpack_require__(10413).HtmlHighlightRules);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

var RHtmlHighlightRules = function() {
    HtmlHighlightRules.call(this);

    this.$rules["start"].unshift({
        token: "support.function.codebegin",
        regex: "^<" + "!--\\s*begin.rcode\\s*(?:.*)",
        next: "r-start"
    });

    this.embedRules(RHighlightRules, "r-", [{
        token: "support.function.codeend",
        regex: "^\\s*end.rcode\\s*-->",
        next: "start"
    }], ["start"]);

    this.normalizeRules();
};
oop.inherits(RHtmlHighlightRules, TextHighlightRules);

exports.D = RHtmlHighlightRules;


/***/ }),

/***/ 51249:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQSxvQ0FBb0MsR0FBRztBQUN2QyxZQUFZO0FBQ1o7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQSw0QkFBNEI7QUFDNUIsWUFBWTtBQUNaO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQSx5QkFBeUI7QUFDekI7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsU0FBeUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL3JfaGlnaGxpZ2h0X3J1bGVzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvcmh0bWwuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9yaHRtbF9oaWdobGlnaHRfcnVsZXMuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS90ZXhfaGlnaGxpZ2h0X3J1bGVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiByX2hpZ2hsaWdodF9ydWxlcy5qc1xuICpcbiAqIENvcHlyaWdodCAoQykgMjAwOS0xMSBieSBSU3R1ZGlvLCBJbmMuXG4gKlxuICogVGhlIEluaXRpYWwgRGV2ZWxvcGVyIG9mIHRoZSBPcmlnaW5hbCBDb2RlIGlzXG4gKiBBamF4Lm9yZyBCLlYuXG4gKiBQb3J0aW9ucyBjcmVhdGVkIGJ5IHRoZSBJbml0aWFsIERldmVsb3BlciBhcmUgQ29weXJpZ2h0IChDKSAyMDEwXG4gKiB0aGUgSW5pdGlhbCBEZXZlbG9wZXIuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIEJTRCBsaWNlbnNlOlxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxMCwgQWpheC5vcmcgQi5WLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBSZWRpc3RyaWJ1dGlvbiBhbmQgdXNlIGluIHNvdXJjZSBhbmQgYmluYXJ5IGZvcm1zLCB3aXRoIG9yIHdpdGhvdXRcbiAqIG1vZGlmaWNhdGlvbiwgYXJlIHBlcm1pdHRlZCBwcm92aWRlZCB0aGF0IHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgbWV0OlxuICogICAgICogUmVkaXN0cmlidXRpb25zIG9mIHNvdXJjZSBjb2RlIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHRcbiAqICAgICAgIG5vdGljZSwgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci5cbiAqICAgICAqIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUgY29weXJpZ2h0XG4gKiAgICAgICBub3RpY2UsIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIgaW4gdGhlXG4gKiAgICAgICBkb2N1bWVudGF0aW9uIGFuZC9vciBvdGhlciBtYXRlcmlhbHMgcHJvdmlkZWQgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxuICogICAgICogTmVpdGhlciB0aGUgbmFtZSBvZiBBamF4Lm9yZyBCLlYuIG5vciB0aGVcbiAqICAgICAgIG5hbWVzIG9mIGl0cyBjb250cmlidXRvcnMgbWF5IGJlIHVzZWQgdG8gZW5kb3JzZSBvciBwcm9tb3RlIHByb2R1Y3RzXG4gKiAgICAgICBkZXJpdmVkIGZyb20gdGhpcyBzb2Z0d2FyZSB3aXRob3V0IHNwZWNpZmljIHByaW9yIHdyaXR0ZW4gcGVybWlzc2lvbi5cbiAqXG4gKiBUSElTIFNPRlRXQVJFIElTIFBST1ZJREVEIEJZIFRIRSBDT1BZUklHSFQgSE9MREVSUyBBTkQgQ09OVFJJQlVUT1JTIFwiQVMgSVNcIiBBTkRcbiAqIEFOWSBFWFBSRVNTIE9SIElNUExJRUQgV0FSUkFOVElFUywgSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFRIRSBJTVBMSUVEXG4gKiBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSBBTkQgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQVJFXG4gKiBESVNDTEFJTUVELiBJTiBOTyBFVkVOVCBTSEFMTCBBSkFYLk9SRyBCLlYuIEJFIExJQUJMRSBGT1IgQU5ZXG4gKiBESVJFQ1QsIElORElSRUNULCBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFU1xuICogKElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTO1xuICogTE9TUyBPRiBVU0UsIERBVEEsIE9SIFBST0ZJVFM7IE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EXG4gKiBPTiBBTlkgVEhFT1JZIE9GIExJQUJJTElUWSwgV0hFVEhFUiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVFxuICogKElOQ0xVRElORyBORUdMSUdFTkNFIE9SIE9USEVSV0lTRSkgQVJJU0lORyBJTiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GXG4gKlxuICovXG5cblxuICAgdmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xuICAgdmFyIGxhbmcgPSByZXF1aXJlKFwiLi4vbGliL2xhbmdcIik7XG4gICB2YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xuICAgdmFyIFRleEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4X2hpZ2hsaWdodF9ydWxlc1wiKS5UZXhIaWdobGlnaHRSdWxlcztcblxuICAgdmFyIFJIaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uKClcbiAgIHtcblxuICAgICAgdmFyIGtleXdvcmRzID0gbGFuZy5hcnJheVRvTWFwKFxuICAgICAgICAgICAgKFwiZnVuY3Rpb258aWZ8aW58YnJlYWt8bmV4dHxyZXBlYXR8ZWxzZXxmb3J8cmV0dXJufHN3aXRjaHx3aGlsZXx0cnl8dHJ5Q2F0Y2h8c3RvcHx3YXJuaW5nfHJlcXVpcmV8bGlicmFyeXxhdHRhY2h8ZGV0YWNofHNvdXJjZXxzZXRNZXRob2R8c2V0R2VuZXJpY3xzZXRHcm91cEdlbmVyaWN8c2V0Q2xhc3NcIilcbiAgICAgICAgICAgICAgICAgIC5zcGxpdChcInxcIilcbiAgICAgICAgICAgICk7XG5cbiAgICAgIHZhciBidWlsZGluQ29uc3RhbnRzID0gbGFuZy5hcnJheVRvTWFwKFxuICAgICAgICAgICAgKFwiTlVMTHxOQXxUUlVFfEZBTFNFfFR8RnxJbmZ8TmFOfE5BX2ludGVnZXJffE5BX3JlYWxffE5BX2NoYXJhY3Rlcl98XCIgK1xuICAgICAgICAgICAgIFwiTkFfY29tcGxleF9cIikuc3BsaXQoXCJ8XCIpXG4gICAgICAgICAgICApO1xuXG4gICAgICAvLyByZWdleHAgbXVzdCBub3QgaGF2ZSBjYXB0dXJpbmcgcGFyZW50aGVzZXMuIFVzZSAoPzopIGluc3RlYWQuXG4gICAgICAvLyByZWdleHBzIGFyZSBvcmRlcmVkIC0+IHRoZSBmaXJzdCBtYXRjaCBpcyB1c2VkXG5cbiAgICAgIHRoaXMuJHJ1bGVzID0ge1xuICAgICAgICAgXCJzdGFydFwiIDogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgLy8gUm94eWdlblxuICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnQuc2VjdGlvbmhlYWRcIixcbiAgICAgICAgICAgICAgIHJlZ2V4IDogXCIjKyg/IScpLiooPzotLS0tfD09PT18IyMjIylcXFxccyokXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAvLyBSb3h5Z2VuXG4gICAgICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudFwiLFxuICAgICAgICAgICAgICAgcmVnZXggOiBcIiMrJ1wiLFxuICAgICAgICAgICAgICAgbmV4dCA6IFwicmQtc3RhcnRcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsXG4gICAgICAgICAgICAgICByZWdleCA6IFwiIy4qJFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLCAvLyBtdWx0aSBsaW5lIHN0cmluZyBzdGFydFxuICAgICAgICAgICAgICAgcmVnZXggOiAnW1wiXScsXG4gICAgICAgICAgICAgICBuZXh0IDogXCJxcXN0cmluZ1wiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLCAvLyBtdWx0aSBsaW5lIHN0cmluZyBzdGFydFxuICAgICAgICAgICAgICAgcmVnZXggOiBcIlsnXVwiLFxuICAgICAgICAgICAgICAgbmV4dCA6IFwicXN0cmluZ1wiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIiwgLy8gaGV4XG4gICAgICAgICAgICAgICByZWdleCA6IFwiMFt4WF1bMC05YS1mQS1GXStbTGldP1xcXFxiXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLCAvLyBleHBsaWNpdCBpbnRlZ2VyXG4gICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXGQrTFxcXFxiXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLCAvLyBudW1iZXJcbiAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcZCsoPzpcXFxcLlxcXFxkKik/KD86W2VFXVsrXFxcXC1dP1xcXFxkKik/aT9cXFxcYlwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIiwgLy8gbnVtYmVyIHdpdGggbGVhZGluZyBkZWNpbWFsXG4gICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXC5cXFxcZCsoPzpbZUVdWytcXFxcLV0/XFxcXGQqKT9pP1xcXFxiXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubGFuZ3VhZ2UuYm9vbGVhblwiLFxuICAgICAgICAgICAgICAgcmVnZXggOiBcIig/OlRSVUV8RkFMU0V8VHxGKVxcXFxiXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICB0b2tlbiA6IFwiaWRlbnRpZmllclwiLFxuICAgICAgICAgICAgICAgcmVnZXggOiBcImAuKj9gXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICBvbk1hdGNoIDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChrZXl3b3Jkc1t2YWx1ZV0pXG4gICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJrZXl3b3JkXCI7XG4gICAgICAgICAgICAgICAgICBlbHNlIGlmIChidWlsZGluQ29uc3RhbnRzW3ZhbHVlXSlcbiAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcImNvbnN0YW50Lmxhbmd1YWdlXCI7XG4gICAgICAgICAgICAgICAgICBlbHNlIGlmICh2YWx1ZSA9PSAnLi4uJyB8fCB2YWx1ZS5tYXRjaCgvXlxcLlxcLlxcZCskLykpXG4gICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJ2YXJpYWJsZS5sYW5ndWFnZVwiO1xuICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiaWRlbnRpZmllclwiO1xuICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgIHJlZ2V4IDogXCJbYS16QS1aLl1bYS16QS1aMC05Ll9dKlxcXFxiXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICB0b2tlbiA6IFwia2V5d29yZC5vcGVyYXRvclwiLFxuICAgICAgICAgICAgICAgcmVnZXggOiBcIiUlfD49fDw9fD09fCE9fFxcXFwtPnw8XFxcXC18XFxcXHxcXFxcfHwmJnw9fFxcXFwrfFxcXFwtfFxcXFwqfC98XFxcXF58Pnw8fCF8JnxcXFxcfHx+fFxcXFwkfDpcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkLm9wZXJhdG9yXCIsIC8vIGluZml4IG9wZXJhdG9yc1xuICAgICAgICAgICAgICAgcmVnZXggOiBcIiUuKj8lXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAvLyBPYnZpb3VzbHkgdGhlc2UgYXJlIG5laXRoZXIga2V5d29yZHMgbm9yIG9wZXJhdG9ycywgYnV0XG4gICAgICAgICAgICAgICAvLyBsYWJlbGxpbmcgdGhlbSBhcyBzdWNoIHdhcyB0aGUgZWFzaWVzdCB3YXkgdG8gZ2V0IHRoZW1cbiAgICAgICAgICAgICAgIC8vIHRvIGJlIGNvbG9yZWQgZGlzdGluY3RseSBmcm9tIHJlZ3VsYXIgdGV4dFxuICAgICAgICAgICAgICAgdG9rZW4gOiBcInBhcmVuLmtleXdvcmQub3BlcmF0b3JcIixcbiAgICAgICAgICAgICAgIHJlZ2V4IDogXCJbWyh7XVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgLy8gT2J2aW91c2x5IHRoZXNlIGFyZSBuZWl0aGVyIGtleXdvcmRzIG5vciBvcGVyYXRvcnMsIGJ1dFxuICAgICAgICAgICAgICAgLy8gbGFiZWxsaW5nIHRoZW0gYXMgc3VjaCB3YXMgdGhlIGVhc2llc3Qgd2F5IHRvIGdldCB0aGVtXG4gICAgICAgICAgICAgICAvLyB0byBiZSBjb2xvcmVkIGRpc3RpbmN0bHkgZnJvbSByZWd1bGFyIHRleHRcbiAgICAgICAgICAgICAgIHRva2VuIDogXCJwYXJlbi5rZXl3b3JkLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICAgICByZWdleCA6IFwiW1xcXFxdKX1dXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICB0b2tlbiA6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFxzK1wiXG4gICAgICAgICAgICB9XG4gICAgICAgICBdLFxuICAgICAgICAgXCJxcXN0cmluZ1wiIDogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgcmVnZXggOiAnKD86KD86XFxcXFxcXFwuKXwoPzpbXlwiXFxcXFxcXFxdKSkqP1wiJyxcbiAgICAgICAgICAgICAgIG5leHQgOiBcInN0YXJ0XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICByZWdleCA6ICcuKydcbiAgICAgICAgICAgIH1cbiAgICAgICAgIF0sXG4gICAgICAgICBcInFzdHJpbmdcIiA6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgIHJlZ2V4IDogXCIoPzooPzpcXFxcXFxcXC4pfCg/OlteJ1xcXFxcXFxcXSkpKj8nXCIsXG4gICAgICAgICAgICAgICBuZXh0IDogXCJzdGFydFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgcmVnZXggOiAnLisnXG4gICAgICAgICAgICB9XG4gICAgICAgICBdXG4gICAgICB9O1xuXG4gICAgICB2YXIgcmRSdWxlcyA9IG5ldyBUZXhIaWdobGlnaHRSdWxlcyhcImNvbW1lbnRcIikuZ2V0UnVsZXMoKTtcblxuICAgICAgLy8gTWFrZSBhbGwgZW1iZWRkZWQgVGVYIHZpcnR1YWwtY29tbWVudCBzbyB0aGV5IGRvbid0IGludGVyZmVyZSB3aXRoXG4gICAgICAvLyBhdXRvLWluZGVudC5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmRSdWxlc1tcInN0YXJ0XCJdLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICByZFJ1bGVzW1wic3RhcnRcIl1baV0udG9rZW4gKz0gXCIudmlydHVhbC1jb21tZW50XCI7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuYWRkUnVsZXMocmRSdWxlcywgXCJyZC1cIik7XG4gICAgICB0aGlzLiRydWxlc1tcInJkLXN0YXJ0XCJdLnVuc2hpZnQoe1xuICAgICAgICAgIHRva2VuOiBcInRleHRcIixcbiAgICAgICAgICByZWdleDogXCJeXCIsXG4gICAgICAgICAgbmV4dDogXCJzdGFydFwiXG4gICAgICB9KTtcbiAgICAgIHRoaXMuJHJ1bGVzW1wicmQtc3RhcnRcIl0udW5zaGlmdCh7XG4gICAgICAgICB0b2tlbiA6IFwia2V5d29yZFwiLFxuICAgICAgICAgcmVnZXggOiBcIkAoPyFAKVteIF0qXCJcbiAgICAgIH0pO1xuICAgICAgdGhpcy4kcnVsZXNbXCJyZC1zdGFydFwiXS51bnNoaWZ0KHtcbiAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsXG4gICAgICAgICByZWdleCA6IFwiQEBcIlxuICAgICAgfSk7XG4gICAgICB0aGlzLiRydWxlc1tcInJkLXN0YXJ0XCJdLnB1c2goe1xuICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIixcbiAgICAgICAgIHJlZ2V4IDogXCJbXiVcXFxcXFxcXFsoe1xcXFxdKX1dK1wiXG4gICAgICB9KTtcbiAgIH07XG5cbiAgIG9vcC5pbmhlcml0cyhSSGlnaGxpZ2h0UnVsZXMsIFRleHRIaWdobGlnaHRSdWxlcyk7XG5cbiAgIGV4cG9ydHMuUkhpZ2hsaWdodFJ1bGVzID0gUkhpZ2hsaWdodFJ1bGVzO1xuIiwiLypcbiAqIHJodG1sLmpzXG4gKlxuICogQ29weXJpZ2h0IChDKSAyMDA5LTExIGJ5IFJTdHVkaW8sIEluYy5cbiAqXG4gKiBUaGUgSW5pdGlhbCBEZXZlbG9wZXIgb2YgdGhlIE9yaWdpbmFsIENvZGUgaXNcbiAqIEFqYXgub3JnIEIuVi5cbiAqIFBvcnRpb25zIGNyZWF0ZWQgYnkgdGhlIEluaXRpYWwgRGV2ZWxvcGVyIGFyZSBDb3B5cmlnaHQgKEMpIDIwMTBcbiAqIHRoZSBJbml0aWFsIERldmVsb3Blci4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBEaXN0cmlidXRlZCB1bmRlciB0aGUgQlNEIGxpY2Vuc2U6XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDEwLCBBamF4Lm9yZyBCLlYuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dFxuICogbW9kaWZpY2F0aW9uLCBhcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG4gKiAgICAgKiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodFxuICogICAgICAgbm90aWNlLCB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyLlxuICogICAgICogUmVkaXN0cmlidXRpb25zIGluIGJpbmFyeSBmb3JtIG11c3QgcmVwcm9kdWNlIHRoZSBhYm92ZSBjb3B5cmlnaHRcbiAqICAgICAgIG5vdGljZSwgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lciBpbiB0aGVcbiAqICAgICAgIGRvY3VtZW50YXRpb24gYW5kL29yIG90aGVyIG1hdGVyaWFscyBwcm92aWRlZCB3aXRoIHRoZSBkaXN0cmlidXRpb24uXG4gKiAgICAgKiBOZWl0aGVyIHRoZSBuYW1lIG9mIEFqYXgub3JnIEIuVi4gbm9yIHRoZVxuICogICAgICAgbmFtZXMgb2YgaXRzIGNvbnRyaWJ1dG9ycyBtYXkgYmUgdXNlZCB0byBlbmRvcnNlIG9yIHByb21vdGUgcHJvZHVjdHNcbiAqICAgICAgIGRlcml2ZWQgZnJvbSB0aGlzIHNvZnR3YXJlIHdpdGhvdXQgc3BlY2lmaWMgcHJpb3Igd3JpdHRlbiBwZXJtaXNzaW9uLlxuICpcbiAqIFRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgVEhFIENPUFlSSUdIVCBIT0xERVJTIEFORCBDT05UUklCVVRPUlMgXCJBUyBJU1wiIEFORFxuICogQU5ZIEVYUFJFU1MgT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFIElNUExJRURcbiAqIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBUkVcbiAqIERJU0NMQUlNRUQuIElOIE5PIEVWRU5UIFNIQUxMIEFKQVguT1JHIEIuVi4gQkUgTElBQkxFIEZPUiBBTllcbiAqIERJUkVDVCwgSU5ESVJFQ1QsIElOQ0lERU5UQUwsIFNQRUNJQUwsIEVYRU1QTEFSWSwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTXG4gKiAoSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFBST0NVUkVNRU5UIE9GIFNVQlNUSVRVVEUgR09PRFMgT1IgU0VSVklDRVM7XG4gKiBMT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUzsgT1IgQlVTSU5FU1MgSU5URVJSVVBUSU9OKSBIT1dFVkVSIENBVVNFRCBBTkRcbiAqIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSIElOIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUXG4gKiAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0UgT0ZcbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIEh0bWxNb2RlID0gcmVxdWlyZShcIi4vaHRtbFwiKS5Nb2RlO1xuXG52YXIgUkh0bWxIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3JodG1sX2hpZ2hsaWdodF9ydWxlc1wiKS5SSHRtbEhpZ2hsaWdodFJ1bGVzO1xuLyogTWFrZSBsaWZlIGVhc2llciwgZG9uJ3QgZG8gdGhlc2UgcmlnaHQgbm93IFxudmFyIFN3ZWF2ZUJhY2tncm91bmRIaWdobGlnaHRlciA9IHJlcXVpcmUoXCJtb2RlL3N3ZWF2ZV9iYWNrZ3JvdW5kX2hpZ2hsaWdodGVyXCIpLlN3ZWF2ZUJhY2tncm91bmRIaWdobGlnaHRlcjtcbnZhciBSQ29kZU1vZGVsID0gcmVxdWlyZShcIm1vZGUvcl9jb2RlX21vZGVsXCIpLlJDb2RlTW9kZWw7XG4qL1xuXG52YXIgTW9kZSA9IGZ1bmN0aW9uKGRvYywgc2Vzc2lvbikge1xuICAgSHRtbE1vZGUuY2FsbCh0aGlzKTtcbiAgIHRoaXMuJHNlc3Npb24gPSBzZXNzaW9uO1xuICAgdGhpcy5IaWdobGlnaHRSdWxlcyA9IFJIdG1sSGlnaGxpZ2h0UnVsZXM7XG5cbiAgIC8qIE9yIHRoZXNlLlxuICAgdGhpcy5jb2RlTW9kZWwgPSBuZXcgUkNvZGVNb2RlbChkb2MsIHRoaXMuJHRva2VuaXplciwgL15yLS8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC9ePCEtLVxccypiZWdpbi5yY29kZVxccyooLiopLyk7XG4gICB0aGlzLmZvbGRpbmdSdWxlcyA9IHRoaXMuY29kZU1vZGVsO1xuICAgdGhpcy4kc3dlYXZlQmFja2dyb3VuZEhpZ2hsaWdodGVyID0gbmV3IFN3ZWF2ZUJhY2tncm91bmRIaWdobGlnaHRlcihcbiAgICAgICAgIHNlc3Npb24sXG4gICAgICAgICAvXjwhLS1cXHMqYmVnaW4ucmNvZGVcXHMqKD86LiopLyxcbiAgICAgICAgIC9eXFxzKmVuZC5yY29kZVxccyotLT4vLFxuICAgICAgICAgdHJ1ZSk7ICovXG59O1xub29wLmluaGVyaXRzKE1vZGUsIEh0bWxNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuICAgdGhpcy5pbnNlcnRDaHVua0luZm8gPSB7XG4gICAgICB2YWx1ZTogXCI8IS0tYmVnaW4ucmNvZGVcXG5cXG5lbmQucmNvZGUtLT5cXG5cIixcbiAgICAgIHBvc2l0aW9uOiB7cm93OiAwLCBjb2x1bW46IDE1fVxuICAgfTtcbiAgICBcbiAgIHRoaXMuZ2V0TGFuZ3VhZ2VNb2RlID0gZnVuY3Rpb24ocG9zaXRpb24pXG4gICB7XG4gICAgICByZXR1cm4gdGhpcy4kc2Vzc2lvbi5nZXRTdGF0ZShwb3NpdGlvbi5yb3cpLm1hdGNoKC9eci0vKSA/ICdSJyA6ICdIVE1MJztcbiAgIH07XG5cbiAgIC8qIHRoaXMuZ2V0TmV4dExpbmVJbmRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgbGluZSwgdGFiLCB0YWJTaXplLCByb3cpXG4gICB7XG4gICAgICByZXR1cm4gdGhpcy5jb2RlTW9kZWwuZ2V0TmV4dExpbmVJbmRlbnQocm93LCBsaW5lLCBzdGF0ZSwgdGFiLCB0YWJTaXplKTtcbiAgIH07ICovXG5cbiAgICB0aGlzLiRpZCA9IFwiYWNlL21vZGUvcmh0bWxcIjtcbn0pLmNhbGwoTW9kZS5wcm90b3R5cGUpO1xuXG5leHBvcnRzLk1vZGUgPSBNb2RlO1xuIiwiLypcbiAqIHJodG1sX2hpZ2hsaWdodF9ydWxlcy5qc1xuICpcbiAqIENvcHlyaWdodCAoQykgMjAwOS0xMSBieSBSU3R1ZGlvLCBJbmMuXG4gKlxuICogVGhlIEluaXRpYWwgRGV2ZWxvcGVyIG9mIHRoZSBPcmlnaW5hbCBDb2RlIGlzXG4gKiBBamF4Lm9yZyBCLlYuXG4gKiBQb3J0aW9ucyBjcmVhdGVkIGJ5IHRoZSBJbml0aWFsIERldmVsb3BlciBhcmUgQ29weXJpZ2h0IChDKSAyMDEwXG4gKiB0aGUgSW5pdGlhbCBEZXZlbG9wZXIuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIEJTRCBsaWNlbnNlOlxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxMCwgQWpheC5vcmcgQi5WLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBSZWRpc3RyaWJ1dGlvbiBhbmQgdXNlIGluIHNvdXJjZSBhbmQgYmluYXJ5IGZvcm1zLCB3aXRoIG9yIHdpdGhvdXRcbiAqIG1vZGlmaWNhdGlvbiwgYXJlIHBlcm1pdHRlZCBwcm92aWRlZCB0aGF0IHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgbWV0OlxuICogICAgICogUmVkaXN0cmlidXRpb25zIG9mIHNvdXJjZSBjb2RlIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHRcbiAqICAgICAgIG5vdGljZSwgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci5cbiAqICAgICAqIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUgY29weXJpZ2h0XG4gKiAgICAgICBub3RpY2UsIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIgaW4gdGhlXG4gKiAgICAgICBkb2N1bWVudGF0aW9uIGFuZC9vciBvdGhlciBtYXRlcmlhbHMgcHJvdmlkZWQgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxuICogICAgICogTmVpdGhlciB0aGUgbmFtZSBvZiBBamF4Lm9yZyBCLlYuIG5vciB0aGVcbiAqICAgICAgIG5hbWVzIG9mIGl0cyBjb250cmlidXRvcnMgbWF5IGJlIHVzZWQgdG8gZW5kb3JzZSBvciBwcm9tb3RlIHByb2R1Y3RzXG4gKiAgICAgICBkZXJpdmVkIGZyb20gdGhpcyBzb2Z0d2FyZSB3aXRob3V0IHNwZWNpZmljIHByaW9yIHdyaXR0ZW4gcGVybWlzc2lvbi5cbiAqXG4gKiBUSElTIFNPRlRXQVJFIElTIFBST1ZJREVEIEJZIFRIRSBDT1BZUklHSFQgSE9MREVSUyBBTkQgQ09OVFJJQlVUT1JTIFwiQVMgSVNcIiBBTkRcbiAqIEFOWSBFWFBSRVNTIE9SIElNUExJRUQgV0FSUkFOVElFUywgSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFRIRSBJTVBMSUVEXG4gKiBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSBBTkQgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQVJFXG4gKiBESVNDTEFJTUVELiBJTiBOTyBFVkVOVCBTSEFMTCBBSkFYLk9SRyBCLlYuIEJFIExJQUJMRSBGT1IgQU5ZXG4gKiBESVJFQ1QsIElORElSRUNULCBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFU1xuICogKElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTO1xuICogTE9TUyBPRiBVU0UsIERBVEEsIE9SIFBST0ZJVFM7IE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUiBDQVVTRUQgQU5EXG4gKiBPTiBBTlkgVEhFT1JZIE9GIExJQUJJTElUWSwgV0hFVEhFUiBJTiBDT05UUkFDVCwgU1RSSUNUIExJQUJJTElUWSwgT1IgVE9SVFxuICogKElOQ0xVRElORyBORUdMSUdFTkNFIE9SIE9USEVSV0lTRSkgQVJJU0lORyBJTiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GXG4gKlxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgUkhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vcl9oaWdobGlnaHRfcnVsZXNcIikuUkhpZ2hsaWdodFJ1bGVzO1xudmFyIEh0bWxIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL2h0bWxfaGlnaGxpZ2h0X3J1bGVzXCIpLkh0bWxIaWdobGlnaHRSdWxlcztcbnZhciBUZXh0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90ZXh0X2hpZ2hsaWdodF9ydWxlc1wiKS5UZXh0SGlnaGxpZ2h0UnVsZXM7XG5cbnZhciBSSHRtbEhpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24oKSB7XG4gICAgSHRtbEhpZ2hsaWdodFJ1bGVzLmNhbGwodGhpcyk7XG5cbiAgICB0aGlzLiRydWxlc1tcInN0YXJ0XCJdLnVuc2hpZnQoe1xuICAgICAgICB0b2tlbjogXCJzdXBwb3J0LmZ1bmN0aW9uLmNvZGViZWdpblwiLFxuICAgICAgICByZWdleDogXCJePFwiICsgXCIhLS1cXFxccypiZWdpbi5yY29kZVxcXFxzKig/Oi4qKVwiLFxuICAgICAgICBuZXh0OiBcInItc3RhcnRcIlxuICAgIH0pO1xuXG4gICAgdGhpcy5lbWJlZFJ1bGVzKFJIaWdobGlnaHRSdWxlcywgXCJyLVwiLCBbe1xuICAgICAgICB0b2tlbjogXCJzdXBwb3J0LmZ1bmN0aW9uLmNvZGVlbmRcIixcbiAgICAgICAgcmVnZXg6IFwiXlxcXFxzKmVuZC5yY29kZVxcXFxzKi0tPlwiLFxuICAgICAgICBuZXh0OiBcInN0YXJ0XCJcbiAgICB9XSwgW1wic3RhcnRcIl0pO1xuXG4gICAgdGhpcy5ub3JtYWxpemVSdWxlcygpO1xufTtcbm9vcC5pbmhlcml0cyhSSHRtbEhpZ2hsaWdodFJ1bGVzLCBUZXh0SGlnaGxpZ2h0UnVsZXMpO1xuXG5leHBvcnRzLlJIdG1sSGlnaGxpZ2h0UnVsZXMgPSBSSHRtbEhpZ2hsaWdodFJ1bGVzO1xuIiwiLypcbiAqIHRleF9oaWdobGlnaHRfcnVsZXMuanNcbiAqXG4gKiBDb3B5cmlnaHQgKEMpIDIwMDktMTEgYnkgUlN0dWRpbywgSW5jLlxuICpcbiAqIFRoZSBJbml0aWFsIERldmVsb3BlciBvZiB0aGUgT3JpZ2luYWwgQ29kZSBpc1xuICogQWpheC5vcmcgQi5WLlxuICogUG9ydGlvbnMgY3JlYXRlZCBieSB0aGUgSW5pdGlhbCBEZXZlbG9wZXIgYXJlIENvcHlyaWdodCAoQykgMjAxMFxuICogdGhlIEluaXRpYWwgRGV2ZWxvcGVyLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSBCU0QgbGljZW5zZTpcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTAsIEFqYXgub3JnIEIuVi5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogUmVkaXN0cmlidXRpb24gYW5kIHVzZSBpbiBzb3VyY2UgYW5kIGJpbmFyeSBmb3Jtcywgd2l0aCBvciB3aXRob3V0XG4gKiBtb2RpZmljYXRpb24sIGFyZSBwZXJtaXR0ZWQgcHJvdmlkZWQgdGhhdCB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIG1ldDpcbiAqICAgICAqIFJlZGlzdHJpYnV0aW9ucyBvZiBzb3VyY2UgY29kZSBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0XG4gKiAgICAgICBub3RpY2UsIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIuXG4gKiAgICAgKiBSZWRpc3RyaWJ1dGlvbnMgaW4gYmluYXJ5IGZvcm0gbXVzdCByZXByb2R1Y2UgdGhlIGFib3ZlIGNvcHlyaWdodFxuICogICAgICAgbm90aWNlLCB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZVxuICogICAgICAgZG9jdW1lbnRhdGlvbiBhbmQvb3Igb3RoZXIgbWF0ZXJpYWxzIHByb3ZpZGVkIHdpdGggdGhlIGRpc3RyaWJ1dGlvbi5cbiAqICAgICAqIE5laXRoZXIgdGhlIG5hbWUgb2YgQWpheC5vcmcgQi5WLiBub3IgdGhlXG4gKiAgICAgICBuYW1lcyBvZiBpdHMgY29udHJpYnV0b3JzIG1heSBiZSB1c2VkIHRvIGVuZG9yc2Ugb3IgcHJvbW90ZSBwcm9kdWN0c1xuICogICAgICAgZGVyaXZlZCBmcm9tIHRoaXMgc29mdHdhcmUgd2l0aG91dCBzcGVjaWZpYyBwcmlvciB3cml0dGVuIHBlcm1pc3Npb24uXG4gKlxuICogVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCIgQU5EXG4gKiBBTlkgRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRFxuICogV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRVxuICogRElTQ0xBSU1FRC4gSU4gTk8gRVZFTlQgU0hBTEwgQUpBWC5PUkcgQi5WLiBCRSBMSUFCTEUgRk9SIEFOWVxuICogRElSRUNULCBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVNcbiAqIChJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0YgU1VCU1RJVFVURSBHT09EUyBPUiBTRVJWSUNFUztcbiAqIExPU1MgT0YgVVNFLCBEQVRBLCBPUiBQUk9GSVRTOyBPUiBCVVNJTkVTUyBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIEFORFxuICogT04gQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlRcbiAqIChJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpIEFSSVNJTkcgSU4gQU5ZIFdBWSBPVVQgT0YgVEhFIFVTRSBPRlxuICpcbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIGxhbmcgPSByZXF1aXJlKFwiLi4vbGliL2xhbmdcIik7XG52YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xuXG52YXIgVGV4SGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbih0ZXh0Q2xhc3MpIHtcblxuICAgIGlmICghdGV4dENsYXNzKVxuICAgICAgICB0ZXh0Q2xhc3MgPSBcInRleHRcIjtcblxuICAgIC8vIHJlZ2V4cCBtdXN0IG5vdCBoYXZlIGNhcHR1cmluZyBwYXJlbnRoZXNlcy4gVXNlICg/OikgaW5zdGVhZC5cbiAgICAvLyByZWdleHBzIGFyZSBvcmRlcmVkIC0+IHRoZSBmaXJzdCBtYXRjaCBpcyB1c2VkXG5cbiAgICB0aGlzLiRydWxlcyA9IHtcbiAgICAgICAgXCJzdGFydFwiIDogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIiUuKiRcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogdGV4dENsYXNzLCAvLyBub24tY29tbWFuZFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcXFxcXFskJiUjXFxcXHtcXFxcfV1cIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkXCIsIC8vIGNvbW1hbmRcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXFxcXFwoPzpkb2N1bWVudGNsYXNzfHVzZXBhY2thZ2V8bmV3Y291bnRlcnxzZXRjb3VudGVyfGFkZHRvY291bnRlcnx2YWx1ZXxhcmFiaWN8c3RlcGNvdW50ZXJ8bmV3ZW52aXJvbm1lbnR8cmVuZXdlbnZpcm9ubWVudHxyZWZ8dnJlZnxlcXJlZnxwYWdlcmVmfGxhYmVsfGNpdGVbYS16QS1aXSp8dGFnfGJlZ2lufGVuZHxiaWJpdGVtKVxcXFxiXCIsXG4gICAgICAgICAgICAgICBuZXh0IDogXCJub3NwZWxsXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwia2V5d29yZFwiLCAvLyBjb21tYW5kXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFxcXFxcKD86W2EtekEtWjAtOV0rfFteYS16QS1aMC05XSlcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgLy8gT2J2aW91c2x5IHRoZXNlIGFyZSBuZWl0aGVyIGtleXdvcmRzIG5vciBvcGVyYXRvcnMsIGJ1dFxuICAgICAgICAgICAgICAgLy8gbGFiZWxsaW5nIHRoZW0gYXMgc3VjaCB3YXMgdGhlIGVhc2llc3Qgd2F5IHRvIGdldCB0aGVtXG4gICAgICAgICAgICAgICAvLyB0byBiZSBjb2xvcmVkIGRpc3RpbmN0bHkgZnJvbSByZWd1bGFyIHRleHRcbiAgICAgICAgICAgICAgIHRva2VuIDogXCJwYXJlbi5rZXl3b3JkLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIltbKHtdXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgIC8vIE9idmlvdXNseSB0aGVzZSBhcmUgbmVpdGhlciBrZXl3b3JkcyBub3Igb3BlcmF0b3JzLCBidXRcbiAgICAgICAgICAgICAgIC8vIGxhYmVsbGluZyB0aGVtIGFzIHN1Y2ggd2FzIHRoZSBlYXNpZXN0IHdheSB0byBnZXQgdGhlbVxuICAgICAgICAgICAgICAgLy8gdG8gYmUgY29sb3JlZCBkaXN0aW5jdGx5IGZyb20gcmVndWxhciB0ZXh0XG4gICAgICAgICAgICAgICB0b2tlbiA6IFwicGFyZW4ua2V5d29yZC5vcGVyYXRvclwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJbXFxcXF0pfV1cIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogdGV4dENsYXNzLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxccytcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICAvLyBUaGlzIG1vZGUgaXMgbmVjZXNzYXJ5IHRvIHByZXZlbnQgc3BlbGwgY2hlY2tpbmcsIGJ1dCB0byBrZWVwIHRoZVxuICAgICAgICAvLyBzYW1lIHN5bnRheCBoaWdobGlnaHRpbmcgYmVoYXZpb3IuIFRoZSBsaXN0IG9mIGNvbW1hbmRzIGNvbWVzIGZyb21cbiAgICAgICAgLy8gVGV4bGlwc2UuXG4gICAgICAgIFwibm9zcGVsbFwiIDogW1xuICAgICAgICAgICB7XG4gICAgICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudFwiLFxuICAgICAgICAgICAgICAgcmVnZXggOiBcIiUuKiRcIixcbiAgICAgICAgICAgICAgIG5leHQgOiBcInN0YXJ0XCJcbiAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgdG9rZW4gOiBcIm5vc3BlbGwuXCIgKyB0ZXh0Q2xhc3MsIC8vIG5vbi1jb21tYW5kXG4gICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXFxcXFxbJCYlI1xcXFx7XFxcXH1dXCJcbiAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgdG9rZW4gOiBcImtleXdvcmRcIiwgLy8gY29tbWFuZFxuICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFxcXFxcKD86ZG9jdW1lbnRjbGFzc3x1c2VwYWNrYWdlfG5ld2NvdW50ZXJ8c2V0Y291bnRlcnxhZGR0b2NvdW50ZXJ8dmFsdWV8YXJhYmljfHN0ZXBjb3VudGVyfG5ld2Vudmlyb25tZW50fHJlbmV3ZW52aXJvbm1lbnR8cmVmfHZyZWZ8ZXFyZWZ8cGFnZXJlZnxsYWJlbHxjaXRlW2EtekEtWl0qfHRhZ3xiZWdpbnxlbmR8YmliaXRlbSlcXFxcYlwiXG4gICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkXCIsIC8vIGNvbW1hbmRcbiAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcXFxcXCg/OlthLXpBLVowLTldK3xbXmEtekEtWjAtOV0pXCIsXG4gICAgICAgICAgICAgICBuZXh0IDogXCJzdGFydFwiXG4gICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgIHRva2VuIDogXCJwYXJlbi5rZXl3b3JkLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICAgICByZWdleCA6IFwiW1soe11cIlxuICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICB0b2tlbiA6IFwicGFyZW4ua2V5d29yZC5vcGVyYXRvclwiLFxuICAgICAgICAgICAgICAgcmVnZXggOiBcIltcXFxcXSldXCJcbiAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgdG9rZW4gOiBcInBhcmVuLmtleXdvcmQub3BlcmF0b3JcIixcbiAgICAgICAgICAgICAgIHJlZ2V4IDogXCJ9XCIsXG4gICAgICAgICAgICAgICBuZXh0IDogXCJzdGFydFwiXG4gICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgIHRva2VuIDogXCJub3NwZWxsLlwiICsgdGV4dENsYXNzLFxuICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFxzK1wiXG4gICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgIHRva2VuIDogXCJub3NwZWxsLlwiICsgdGV4dENsYXNzLFxuICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFx3K1wiXG4gICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH07XG59O1xuXG5vb3AuaW5oZXJpdHMoVGV4SGlnaGxpZ2h0UnVsZXMsIFRleHRIaWdobGlnaHRSdWxlcyk7XG5cbmV4cG9ydHMuVGV4SGlnaGxpZ2h0UnVsZXMgPSBUZXhIaWdobGlnaHRSdWxlcztcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==