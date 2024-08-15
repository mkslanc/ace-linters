(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[3317],{

/***/ 28670:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


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

/***/ 13317:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/*
 * r.js
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

   

   var unicode = __webpack_require__(6672);
   var Range = (__webpack_require__(91902)/* .Range */ .Q);
   var oop = __webpack_require__(2645);
   var TextMode = (__webpack_require__(49432).Mode);
   var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);
   var RHighlightRules = (__webpack_require__(31042)/* .RHighlightRules */ .O);
   var MatchingBraceOutdent = (__webpack_require__(28670).MatchingBraceOutdent);

   var Mode = function(){
      this.HighlightRules = RHighlightRules;
      this.$outdent = new MatchingBraceOutdent();
      this.$behaviour = this.$defaultBehaviour;
   };
   oop.inherits(Mode, TextMode);

   (function() {
      this.lineCommentStart = "#";
      // todo import codeModel from RStudio
      this.tokenRe = new RegExp("^[" + unicode.wordChars + "._]+", "g");

      this.nonTokenRe = new RegExp("^(?:[^" + unicode.wordChars + "._]|\s])+", "g");

      /*this.$complements = {
               "(": ")",
               "[": "]",
               '"': '"',
               "'": "'",
               "{": "}"
            };
      this.$reOpen = /^[(["'{]$/;
      this.$reClose = /^[)\]"'}]$/;

      this.getNextLineIndent = function(state, line, tab, tabSize, row)
      {
         return this.codeModel.getNextLineIndent(row, line, state, tab, tabSize);
      };

      this.allowAutoInsert = this.smartAllowAutoInsert;

      this.checkOutdent = function(state, line, input) {
         if (! /^\s+$/.test(line))
            return false;

         return /^\s*[\{\}\)]/.test(input);
      };

      this.getIndentForOpenBrace = function(openBracePos)
      {
         return this.codeModel.getIndentForOpenBrace(openBracePos);
      };

      this.autoOutdent = function(state, doc, row) {
         if (row == 0)
            return 0;

         var line = doc.getLine(row);

         var match = line.match(/^(\s*[\}\)])/);
         if (match)
         {
            var column = match[1].length;
            var openBracePos = doc.findMatchingBracket({row: row, column: column});

            if (!openBracePos || openBracePos.row == row) return 0;

            var indent = this.codeModel.getIndentForOpenBrace(openBracePos);
            doc.replace(new Range(row, 0, row, column-1), indent);
         }

         match = line.match(/^(\s*\{)/);
         if (match)
         {
            var column = match[1].length;
            var indent = this.codeModel.getBraceIndent(row-1);
            doc.replace(new Range(row, 0, row, column-1), indent);
         }
      };

      this.$getIndent = function(line) {
         var match = line.match(/^(\s+)/);
         if (match) {
            return match[1];
         }

         return "";
      };

      this.transformAction = function(state, action, editor, session, text) {
         if (action === 'insertion' && text === "\n") {

            // If newline in a doxygen comment, continue the comment
            var pos = editor.getSelectionRange().start;
            var match = /^((\s*#+')\s*)/.exec(session.doc.getLine(pos.row));
            if (match && editor.getSelectionRange().start.column >= match[2].length) {
               return {text: "\n" + match[1]};
            }
         }
         return false;
      };*/
       this.$id = "ace/mode/r";
       this.snippetFileId = "ace/snippets/r";
   }).call(Mode.prototype);
   exports.Mode = Mode;


/***/ }),

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxxQ0FBcUMsR0FBRztBQUN4QyxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0IsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQSxvQ0FBb0MsR0FBRztBQUN2QyxZQUFZO0FBQ1o7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQSw0QkFBNEI7QUFDNUIsWUFBWTtBQUNaO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQSx5QkFBeUI7QUFDekI7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsU0FBeUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL21hdGNoaW5nX2JyYWNlX291dGRlbnQuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9yLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvcl9oaWdobGlnaHRfcnVsZXMuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS90ZXhfaGlnaGxpZ2h0X3J1bGVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG52YXIgUmFuZ2UgPSByZXF1aXJlKFwiLi4vcmFuZ2VcIikuUmFuZ2U7XG5cbnZhciBNYXRjaGluZ0JyYWNlT3V0ZGVudCA9IGZ1bmN0aW9uKCkge307XG5cbihmdW5jdGlvbigpIHtcblxuICAgIHRoaXMuY2hlY2tPdXRkZW50ID0gZnVuY3Rpb24obGluZSwgaW5wdXQpIHtcbiAgICAgICAgaWYgKCEgL15cXHMrJC8udGVzdChsaW5lKSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgICByZXR1cm4gL15cXHMqXFx9Ly50ZXN0KGlucHV0KTtcbiAgICB9O1xuXG4gICAgdGhpcy5hdXRvT3V0ZGVudCA9IGZ1bmN0aW9uKGRvYywgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gZG9jLmdldExpbmUocm93KTtcbiAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCgvXihcXHMqXFx9KS8pO1xuXG4gICAgICAgIGlmICghbWF0Y2gpIHJldHVybiAwO1xuXG4gICAgICAgIHZhciBjb2x1bW4gPSBtYXRjaFsxXS5sZW5ndGg7XG4gICAgICAgIHZhciBvcGVuQnJhY2VQb3MgPSBkb2MuZmluZE1hdGNoaW5nQnJhY2tldCh7cm93OiByb3csIGNvbHVtbjogY29sdW1ufSk7XG5cbiAgICAgICAgaWYgKCFvcGVuQnJhY2VQb3MgfHwgb3BlbkJyYWNlUG9zLnJvdyA9PSByb3cpIHJldHVybiAwO1xuXG4gICAgICAgIHZhciBpbmRlbnQgPSB0aGlzLiRnZXRJbmRlbnQoZG9jLmdldExpbmUob3BlbkJyYWNlUG9zLnJvdykpO1xuICAgICAgICBkb2MucmVwbGFjZShuZXcgUmFuZ2Uocm93LCAwLCByb3csIGNvbHVtbi0xKSwgaW5kZW50KTtcbiAgICB9O1xuXG4gICAgdGhpcy4kZ2V0SW5kZW50ID0gZnVuY3Rpb24obGluZSkge1xuICAgICAgICByZXR1cm4gbGluZS5tYXRjaCgvXlxccyovKVswXTtcbiAgICB9O1xuXG59KS5jYWxsKE1hdGNoaW5nQnJhY2VPdXRkZW50LnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTWF0Y2hpbmdCcmFjZU91dGRlbnQgPSBNYXRjaGluZ0JyYWNlT3V0ZGVudDtcbiIsIi8qXG4gKiByLmpzXG4gKlxuICogQ29weXJpZ2h0IChDKSAyMDA5LTExIGJ5IFJTdHVkaW8sIEluYy5cbiAqXG4gKiBUaGUgSW5pdGlhbCBEZXZlbG9wZXIgb2YgdGhlIE9yaWdpbmFsIENvZGUgaXNcbiAqIEFqYXgub3JnIEIuVi5cbiAqIFBvcnRpb25zIGNyZWF0ZWQgYnkgdGhlIEluaXRpYWwgRGV2ZWxvcGVyIGFyZSBDb3B5cmlnaHQgKEMpIDIwMTBcbiAqIHRoZSBJbml0aWFsIERldmVsb3Blci4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBEaXN0cmlidXRlZCB1bmRlciB0aGUgQlNEIGxpY2Vuc2U6XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDEwLCBBamF4Lm9yZyBCLlYuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dFxuICogbW9kaWZpY2F0aW9uLCBhcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG4gKiAgICAgKiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodFxuICogICAgICAgbm90aWNlLCB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyLlxuICogICAgICogUmVkaXN0cmlidXRpb25zIGluIGJpbmFyeSBmb3JtIG11c3QgcmVwcm9kdWNlIHRoZSBhYm92ZSBjb3B5cmlnaHRcbiAqICAgICAgIG5vdGljZSwgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lciBpbiB0aGVcbiAqICAgICAgIGRvY3VtZW50YXRpb24gYW5kL29yIG90aGVyIG1hdGVyaWFscyBwcm92aWRlZCB3aXRoIHRoZSBkaXN0cmlidXRpb24uXG4gKiAgICAgKiBOZWl0aGVyIHRoZSBuYW1lIG9mIEFqYXgub3JnIEIuVi4gbm9yIHRoZVxuICogICAgICAgbmFtZXMgb2YgaXRzIGNvbnRyaWJ1dG9ycyBtYXkgYmUgdXNlZCB0byBlbmRvcnNlIG9yIHByb21vdGUgcHJvZHVjdHNcbiAqICAgICAgIGRlcml2ZWQgZnJvbSB0aGlzIHNvZnR3YXJlIHdpdGhvdXQgc3BlY2lmaWMgcHJpb3Igd3JpdHRlbiBwZXJtaXNzaW9uLlxuICpcbiAqIFRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgVEhFIENPUFlSSUdIVCBIT0xERVJTIEFORCBDT05UUklCVVRPUlMgXCJBUyBJU1wiIEFORFxuICogQU5ZIEVYUFJFU1MgT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFIElNUExJRURcbiAqIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBUkVcbiAqIERJU0NMQUlNRUQuIElOIE5PIEVWRU5UIFNIQUxMIEFKQVguT1JHIEIuVi4gQkUgTElBQkxFIEZPUiBBTllcbiAqIERJUkVDVCwgSU5ESVJFQ1QsIElOQ0lERU5UQUwsIFNQRUNJQUwsIEVYRU1QTEFSWSwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTXG4gKiAoSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFBST0NVUkVNRU5UIE9GIFNVQlNUSVRVVEUgR09PRFMgT1IgU0VSVklDRVM7XG4gKiBMT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUzsgT1IgQlVTSU5FU1MgSU5URVJSVVBUSU9OKSBIT1dFVkVSIENBVVNFRCBBTkRcbiAqIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSIElOIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUXG4gKiAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0UgT0ZcbiAqXG4gKi9cblxuICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgIHZhciB1bmljb2RlID0gcmVxdWlyZShcIi4uL3VuaWNvZGVcIik7XG4gICB2YXIgUmFuZ2UgPSByZXF1aXJlKFwiLi4vcmFuZ2VcIikuUmFuZ2U7XG4gICB2YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG4gICB2YXIgVGV4dE1vZGUgPSByZXF1aXJlKFwiLi90ZXh0XCIpLk1vZGU7XG4gICB2YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xuICAgdmFyIFJIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3JfaGlnaGxpZ2h0X3J1bGVzXCIpLlJIaWdobGlnaHRSdWxlcztcbiAgIHZhciBNYXRjaGluZ0JyYWNlT3V0ZGVudCA9IHJlcXVpcmUoXCIuL21hdGNoaW5nX2JyYWNlX291dGRlbnRcIikuTWF0Y2hpbmdCcmFjZU91dGRlbnQ7XG5cbiAgIHZhciBNb2RlID0gZnVuY3Rpb24oKXtcbiAgICAgIHRoaXMuSGlnaGxpZ2h0UnVsZXMgPSBSSGlnaGxpZ2h0UnVsZXM7XG4gICAgICB0aGlzLiRvdXRkZW50ID0gbmV3IE1hdGNoaW5nQnJhY2VPdXRkZW50KCk7XG4gICAgICB0aGlzLiRiZWhhdmlvdXIgPSB0aGlzLiRkZWZhdWx0QmVoYXZpb3VyO1xuICAgfTtcbiAgIG9vcC5pbmhlcml0cyhNb2RlLCBUZXh0TW9kZSk7XG5cbiAgIChmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMubGluZUNvbW1lbnRTdGFydCA9IFwiI1wiO1xuICAgICAgLy8gdG9kbyBpbXBvcnQgY29kZU1vZGVsIGZyb20gUlN0dWRpb1xuICAgICAgdGhpcy50b2tlblJlID0gbmV3IFJlZ0V4cChcIl5bXCIgKyB1bmljb2RlLndvcmRDaGFycyArIFwiLl9dK1wiLCBcImdcIik7XG5cbiAgICAgIHRoaXMubm9uVG9rZW5SZSA9IG5ldyBSZWdFeHAoXCJeKD86W15cIiArIHVuaWNvZGUud29yZENoYXJzICsgXCIuX118XFxzXSkrXCIsIFwiZ1wiKTtcblxuICAgICAgLyp0aGlzLiRjb21wbGVtZW50cyA9IHtcbiAgICAgICAgICAgICAgIFwiKFwiOiBcIilcIixcbiAgICAgICAgICAgICAgIFwiW1wiOiBcIl1cIixcbiAgICAgICAgICAgICAgICdcIic6ICdcIicsXG4gICAgICAgICAgICAgICBcIidcIjogXCInXCIsXG4gICAgICAgICAgICAgICBcIntcIjogXCJ9XCJcbiAgICAgICAgICAgIH07XG4gICAgICB0aGlzLiRyZU9wZW4gPSAvXlsoW1wiJ3tdJC87XG4gICAgICB0aGlzLiRyZUNsb3NlID0gL15bKVxcXVwiJ31dJC87XG5cbiAgICAgIHRoaXMuZ2V0TmV4dExpbmVJbmRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgbGluZSwgdGFiLCB0YWJTaXplLCByb3cpXG4gICAgICB7XG4gICAgICAgICByZXR1cm4gdGhpcy5jb2RlTW9kZWwuZ2V0TmV4dExpbmVJbmRlbnQocm93LCBsaW5lLCBzdGF0ZSwgdGFiLCB0YWJTaXplKTtcbiAgICAgIH07XG5cbiAgICAgIHRoaXMuYWxsb3dBdXRvSW5zZXJ0ID0gdGhpcy5zbWFydEFsbG93QXV0b0luc2VydDtcblxuICAgICAgdGhpcy5jaGVja091dGRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgbGluZSwgaW5wdXQpIHtcbiAgICAgICAgIGlmICghIC9eXFxzKyQvLnRlc3QobGluZSkpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgIHJldHVybiAvXlxccypbXFx7XFx9XFwpXS8udGVzdChpbnB1dCk7XG4gICAgICB9O1xuXG4gICAgICB0aGlzLmdldEluZGVudEZvck9wZW5CcmFjZSA9IGZ1bmN0aW9uKG9wZW5CcmFjZVBvcylcbiAgICAgIHtcbiAgICAgICAgIHJldHVybiB0aGlzLmNvZGVNb2RlbC5nZXRJbmRlbnRGb3JPcGVuQnJhY2Uob3BlbkJyYWNlUG9zKTtcbiAgICAgIH07XG5cbiAgICAgIHRoaXMuYXV0b091dGRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgZG9jLCByb3cpIHtcbiAgICAgICAgIGlmIChyb3cgPT0gMClcbiAgICAgICAgICAgIHJldHVybiAwO1xuXG4gICAgICAgICB2YXIgbGluZSA9IGRvYy5nZXRMaW5lKHJvdyk7XG5cbiAgICAgICAgIHZhciBtYXRjaCA9IGxpbmUubWF0Y2goL14oXFxzKltcXH1cXCldKS8pO1xuICAgICAgICAgaWYgKG1hdGNoKVxuICAgICAgICAge1xuICAgICAgICAgICAgdmFyIGNvbHVtbiA9IG1hdGNoWzFdLmxlbmd0aDtcbiAgICAgICAgICAgIHZhciBvcGVuQnJhY2VQb3MgPSBkb2MuZmluZE1hdGNoaW5nQnJhY2tldCh7cm93OiByb3csIGNvbHVtbjogY29sdW1ufSk7XG5cbiAgICAgICAgICAgIGlmICghb3BlbkJyYWNlUG9zIHx8IG9wZW5CcmFjZVBvcy5yb3cgPT0gcm93KSByZXR1cm4gMDtcblxuICAgICAgICAgICAgdmFyIGluZGVudCA9IHRoaXMuY29kZU1vZGVsLmdldEluZGVudEZvck9wZW5CcmFjZShvcGVuQnJhY2VQb3MpO1xuICAgICAgICAgICAgZG9jLnJlcGxhY2UobmV3IFJhbmdlKHJvdywgMCwgcm93LCBjb2x1bW4tMSksIGluZGVudCk7XG4gICAgICAgICB9XG5cbiAgICAgICAgIG1hdGNoID0gbGluZS5tYXRjaCgvXihcXHMqXFx7KS8pO1xuICAgICAgICAgaWYgKG1hdGNoKVxuICAgICAgICAge1xuICAgICAgICAgICAgdmFyIGNvbHVtbiA9IG1hdGNoWzFdLmxlbmd0aDtcbiAgICAgICAgICAgIHZhciBpbmRlbnQgPSB0aGlzLmNvZGVNb2RlbC5nZXRCcmFjZUluZGVudChyb3ctMSk7XG4gICAgICAgICAgICBkb2MucmVwbGFjZShuZXcgUmFuZ2Uocm93LCAwLCByb3csIGNvbHVtbi0xKSwgaW5kZW50KTtcbiAgICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHRoaXMuJGdldEluZGVudCA9IGZ1bmN0aW9uKGxpbmUpIHtcbiAgICAgICAgIHZhciBtYXRjaCA9IGxpbmUubWF0Y2goL14oXFxzKykvKTtcbiAgICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgcmV0dXJuIG1hdGNoWzFdO1xuICAgICAgICAgfVxuXG4gICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgIH07XG5cbiAgICAgIHRoaXMudHJhbnNmb3JtQWN0aW9uID0gZnVuY3Rpb24oc3RhdGUsIGFjdGlvbiwgZWRpdG9yLCBzZXNzaW9uLCB0ZXh0KSB7XG4gICAgICAgICBpZiAoYWN0aW9uID09PSAnaW5zZXJ0aW9uJyAmJiB0ZXh0ID09PSBcIlxcblwiKSB7XG5cbiAgICAgICAgICAgIC8vIElmIG5ld2xpbmUgaW4gYSBkb3h5Z2VuIGNvbW1lbnQsIGNvbnRpbnVlIHRoZSBjb21tZW50XG4gICAgICAgICAgICB2YXIgcG9zID0gZWRpdG9yLmdldFNlbGVjdGlvblJhbmdlKCkuc3RhcnQ7XG4gICAgICAgICAgICB2YXIgbWF0Y2ggPSAvXigoXFxzKiMrJylcXHMqKS8uZXhlYyhzZXNzaW9uLmRvYy5nZXRMaW5lKHBvcy5yb3cpKTtcbiAgICAgICAgICAgIGlmIChtYXRjaCAmJiBlZGl0b3IuZ2V0U2VsZWN0aW9uUmFuZ2UoKS5zdGFydC5jb2x1bW4gPj0gbWF0Y2hbMl0ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICByZXR1cm4ge3RleHQ6IFwiXFxuXCIgKyBtYXRjaFsxXX07XG4gICAgICAgICAgICB9XG4gICAgICAgICB9XG4gICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9OyovXG4gICAgICAgdGhpcy4kaWQgPSBcImFjZS9tb2RlL3JcIjtcbiAgICAgICB0aGlzLnNuaXBwZXRGaWxlSWQgPSBcImFjZS9zbmlwcGV0cy9yXCI7XG4gICB9KS5jYWxsKE1vZGUucHJvdG90eXBlKTtcbiAgIGV4cG9ydHMuTW9kZSA9IE1vZGU7XG4iLCIvKlxuICogcl9oaWdobGlnaHRfcnVsZXMuanNcbiAqXG4gKiBDb3B5cmlnaHQgKEMpIDIwMDktMTEgYnkgUlN0dWRpbywgSW5jLlxuICpcbiAqIFRoZSBJbml0aWFsIERldmVsb3BlciBvZiB0aGUgT3JpZ2luYWwgQ29kZSBpc1xuICogQWpheC5vcmcgQi5WLlxuICogUG9ydGlvbnMgY3JlYXRlZCBieSB0aGUgSW5pdGlhbCBEZXZlbG9wZXIgYXJlIENvcHlyaWdodCAoQykgMjAxMFxuICogdGhlIEluaXRpYWwgRGV2ZWxvcGVyLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSBCU0QgbGljZW5zZTpcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTAsIEFqYXgub3JnIEIuVi5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogUmVkaXN0cmlidXRpb24gYW5kIHVzZSBpbiBzb3VyY2UgYW5kIGJpbmFyeSBmb3Jtcywgd2l0aCBvciB3aXRob3V0XG4gKiBtb2RpZmljYXRpb24sIGFyZSBwZXJtaXR0ZWQgcHJvdmlkZWQgdGhhdCB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIG1ldDpcbiAqICAgICAqIFJlZGlzdHJpYnV0aW9ucyBvZiBzb3VyY2UgY29kZSBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0XG4gKiAgICAgICBub3RpY2UsIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIuXG4gKiAgICAgKiBSZWRpc3RyaWJ1dGlvbnMgaW4gYmluYXJ5IGZvcm0gbXVzdCByZXByb2R1Y2UgdGhlIGFib3ZlIGNvcHlyaWdodFxuICogICAgICAgbm90aWNlLCB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZVxuICogICAgICAgZG9jdW1lbnRhdGlvbiBhbmQvb3Igb3RoZXIgbWF0ZXJpYWxzIHByb3ZpZGVkIHdpdGggdGhlIGRpc3RyaWJ1dGlvbi5cbiAqICAgICAqIE5laXRoZXIgdGhlIG5hbWUgb2YgQWpheC5vcmcgQi5WLiBub3IgdGhlXG4gKiAgICAgICBuYW1lcyBvZiBpdHMgY29udHJpYnV0b3JzIG1heSBiZSB1c2VkIHRvIGVuZG9yc2Ugb3IgcHJvbW90ZSBwcm9kdWN0c1xuICogICAgICAgZGVyaXZlZCBmcm9tIHRoaXMgc29mdHdhcmUgd2l0aG91dCBzcGVjaWZpYyBwcmlvciB3cml0dGVuIHBlcm1pc3Npb24uXG4gKlxuICogVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCIgQU5EXG4gKiBBTlkgRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRFxuICogV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRVxuICogRElTQ0xBSU1FRC4gSU4gTk8gRVZFTlQgU0hBTEwgQUpBWC5PUkcgQi5WLiBCRSBMSUFCTEUgRk9SIEFOWVxuICogRElSRUNULCBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVNcbiAqIChJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0YgU1VCU1RJVFVURSBHT09EUyBPUiBTRVJWSUNFUztcbiAqIExPU1MgT0YgVVNFLCBEQVRBLCBPUiBQUk9GSVRTOyBPUiBCVVNJTkVTUyBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIEFORFxuICogT04gQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlRcbiAqIChJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpIEFSSVNJTkcgSU4gQU5ZIFdBWSBPVVQgT0YgVEhFIFVTRSBPRlxuICpcbiAqL1xuXG5cbiAgIHZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbiAgIHZhciBsYW5nID0gcmVxdWlyZShcIi4uL2xpYi9sYW5nXCIpO1xuICAgdmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcbiAgIHZhciBUZXhIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleF9oaWdobGlnaHRfcnVsZXNcIikuVGV4SGlnaGxpZ2h0UnVsZXM7XG5cbiAgIHZhciBSSGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbigpXG4gICB7XG5cbiAgICAgIHZhciBrZXl3b3JkcyA9IGxhbmcuYXJyYXlUb01hcChcbiAgICAgICAgICAgIChcImZ1bmN0aW9ufGlmfGlufGJyZWFrfG5leHR8cmVwZWF0fGVsc2V8Zm9yfHJldHVybnxzd2l0Y2h8d2hpbGV8dHJ5fHRyeUNhdGNofHN0b3B8d2FybmluZ3xyZXF1aXJlfGxpYnJhcnl8YXR0YWNofGRldGFjaHxzb3VyY2V8c2V0TWV0aG9kfHNldEdlbmVyaWN8c2V0R3JvdXBHZW5lcmljfHNldENsYXNzXCIpXG4gICAgICAgICAgICAgICAgICAuc3BsaXQoXCJ8XCIpXG4gICAgICAgICAgICApO1xuXG4gICAgICB2YXIgYnVpbGRpbkNvbnN0YW50cyA9IGxhbmcuYXJyYXlUb01hcChcbiAgICAgICAgICAgIChcIk5VTEx8TkF8VFJVRXxGQUxTRXxUfEZ8SW5mfE5hTnxOQV9pbnRlZ2VyX3xOQV9yZWFsX3xOQV9jaGFyYWN0ZXJffFwiICtcbiAgICAgICAgICAgICBcIk5BX2NvbXBsZXhfXCIpLnNwbGl0KFwifFwiKVxuICAgICAgICAgICAgKTtcblxuICAgICAgLy8gcmVnZXhwIG11c3Qgbm90IGhhdmUgY2FwdHVyaW5nIHBhcmVudGhlc2VzLiBVc2UgKD86KSBpbnN0ZWFkLlxuICAgICAgLy8gcmVnZXhwcyBhcmUgb3JkZXJlZCAtPiB0aGUgZmlyc3QgbWF0Y2ggaXMgdXNlZFxuXG4gICAgICB0aGlzLiRydWxlcyA9IHtcbiAgICAgICAgIFwic3RhcnRcIiA6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgIC8vIFJveHlnZW5cbiAgICAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50LnNlY3Rpb25oZWFkXCIsXG4gICAgICAgICAgICAgICByZWdleCA6IFwiIysoPyEnKS4qKD86LS0tLXw9PT09fCMjIyMpXFxcXHMqJFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgLy8gUm94eWdlblxuICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIixcbiAgICAgICAgICAgICAgIHJlZ2V4IDogXCIjKydcIixcbiAgICAgICAgICAgICAgIG5leHQgOiBcInJkLXN0YXJ0XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudFwiLFxuICAgICAgICAgICAgICAgcmVnZXggOiBcIiMuKiRcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIiwgLy8gbXVsdGkgbGluZSBzdHJpbmcgc3RhcnRcbiAgICAgICAgICAgICAgIHJlZ2V4IDogJ1tcIl0nLFxuICAgICAgICAgICAgICAgbmV4dCA6IFwicXFzdHJpbmdcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIiwgLy8gbXVsdGkgbGluZSBzdHJpbmcgc3RhcnRcbiAgICAgICAgICAgICAgIHJlZ2V4IDogXCJbJ11cIixcbiAgICAgICAgICAgICAgIG5leHQgOiBcInFzdHJpbmdcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5udW1lcmljXCIsIC8vIGhleFxuICAgICAgICAgICAgICAgcmVnZXggOiBcIjBbeFhdWzAtOWEtZkEtRl0rW0xpXT9cXFxcYlwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIiwgLy8gZXhwbGljaXQgaW50ZWdlclxuICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFxkK0xcXFxcYlwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIiwgLy8gbnVtYmVyXG4gICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXGQrKD86XFxcXC5cXFxcZCopPyg/OltlRV1bK1xcXFwtXT9cXFxcZCopP2k/XFxcXGJcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5udW1lcmljXCIsIC8vIG51bWJlciB3aXRoIGxlYWRpbmcgZGVjaW1hbFxuICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwuXFxcXGQrKD86W2VFXVsrXFxcXC1dP1xcXFxkKik/aT9cXFxcYlwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lmxhbmd1YWdlLmJvb2xlYW5cIixcbiAgICAgICAgICAgICAgIHJlZ2V4IDogXCIoPzpUUlVFfEZBTFNFfFR8RilcXFxcYlwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgdG9rZW4gOiBcImlkZW50aWZpZXJcIixcbiAgICAgICAgICAgICAgIHJlZ2V4IDogXCJgLio/YFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgb25NYXRjaCA6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICBpZiAoa2V5d29yZHNbdmFsdWVdKVxuICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwia2V5d29yZFwiO1xuICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoYnVpbGRpbkNvbnN0YW50c1t2YWx1ZV0pXG4gICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJjb25zdGFudC5sYW5ndWFnZVwiO1xuICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodmFsdWUgPT0gJy4uLicgfHwgdmFsdWUubWF0Y2goL15cXC5cXC5cXGQrJC8pKVxuICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwidmFyaWFibGUubGFuZ3VhZ2VcIjtcbiAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcImlkZW50aWZpZXJcIjtcbiAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICByZWdleCA6IFwiW2EtekEtWi5dW2EtekEtWjAtOS5fXSpcXFxcYlwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgdG9rZW4gOiBcImtleXdvcmQub3BlcmF0b3JcIixcbiAgICAgICAgICAgICAgIHJlZ2V4IDogXCIlJXw+PXw8PXw9PXwhPXxcXFxcLT58PFxcXFwtfFxcXFx8XFxcXHx8JiZ8PXxcXFxcK3xcXFxcLXxcXFxcKnwvfFxcXFxefD58PHwhfCZ8XFxcXHx8fnxcXFxcJHw6XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICB0b2tlbiA6IFwia2V5d29yZC5vcGVyYXRvclwiLCAvLyBpbmZpeCBvcGVyYXRvcnNcbiAgICAgICAgICAgICAgIHJlZ2V4IDogXCIlLio/JVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgLy8gT2J2aW91c2x5IHRoZXNlIGFyZSBuZWl0aGVyIGtleXdvcmRzIG5vciBvcGVyYXRvcnMsIGJ1dFxuICAgICAgICAgICAgICAgLy8gbGFiZWxsaW5nIHRoZW0gYXMgc3VjaCB3YXMgdGhlIGVhc2llc3Qgd2F5IHRvIGdldCB0aGVtXG4gICAgICAgICAgICAgICAvLyB0byBiZSBjb2xvcmVkIGRpc3RpbmN0bHkgZnJvbSByZWd1bGFyIHRleHRcbiAgICAgICAgICAgICAgIHRva2VuIDogXCJwYXJlbi5rZXl3b3JkLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICAgICByZWdleCA6IFwiW1soe11cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgIC8vIE9idmlvdXNseSB0aGVzZSBhcmUgbmVpdGhlciBrZXl3b3JkcyBub3Igb3BlcmF0b3JzLCBidXRcbiAgICAgICAgICAgICAgIC8vIGxhYmVsbGluZyB0aGVtIGFzIHN1Y2ggd2FzIHRoZSBlYXNpZXN0IHdheSB0byBnZXQgdGhlbVxuICAgICAgICAgICAgICAgLy8gdG8gYmUgY29sb3JlZCBkaXN0aW5jdGx5IGZyb20gcmVndWxhciB0ZXh0XG4gICAgICAgICAgICAgICB0b2tlbiA6IFwicGFyZW4ua2V5d29yZC5vcGVyYXRvclwiLFxuICAgICAgICAgICAgICAgcmVnZXggOiBcIltcXFxcXSl9XVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgdG9rZW4gOiBcInRleHRcIixcbiAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxccytcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgXSxcbiAgICAgICAgIFwicXFzdHJpbmdcIiA6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgIHJlZ2V4IDogJyg/Oig/OlxcXFxcXFxcLil8KD86W15cIlxcXFxcXFxcXSkpKj9cIicsXG4gICAgICAgICAgICAgICBuZXh0IDogXCJzdGFydFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgcmVnZXggOiAnLisnXG4gICAgICAgICAgICB9XG4gICAgICAgICBdLFxuICAgICAgICAgXCJxc3RyaW5nXCIgOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICByZWdleCA6IFwiKD86KD86XFxcXFxcXFwuKXwoPzpbXidcXFxcXFxcXF0pKSo/J1wiLFxuICAgICAgICAgICAgICAgbmV4dCA6IFwic3RhcnRcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgIHJlZ2V4IDogJy4rJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgXVxuICAgICAgfTtcblxuICAgICAgdmFyIHJkUnVsZXMgPSBuZXcgVGV4SGlnaGxpZ2h0UnVsZXMoXCJjb21tZW50XCIpLmdldFJ1bGVzKCk7XG5cbiAgICAgIC8vIE1ha2UgYWxsIGVtYmVkZGVkIFRlWCB2aXJ0dWFsLWNvbW1lbnQgc28gdGhleSBkb24ndCBpbnRlcmZlcmUgd2l0aFxuICAgICAgLy8gYXV0by1pbmRlbnQuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJkUnVsZXNbXCJzdGFydFwiXS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgcmRSdWxlc1tcInN0YXJ0XCJdW2ldLnRva2VuICs9IFwiLnZpcnR1YWwtY29tbWVudFwiO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmFkZFJ1bGVzKHJkUnVsZXMsIFwicmQtXCIpO1xuICAgICAgdGhpcy4kcnVsZXNbXCJyZC1zdGFydFwiXS51bnNoaWZ0KHtcbiAgICAgICAgICB0b2tlbjogXCJ0ZXh0XCIsXG4gICAgICAgICAgcmVnZXg6IFwiXlwiLFxuICAgICAgICAgIG5leHQ6IFwic3RhcnRcIlxuICAgICAgfSk7XG4gICAgICB0aGlzLiRydWxlc1tcInJkLXN0YXJ0XCJdLnVuc2hpZnQoe1xuICAgICAgICAgdG9rZW4gOiBcImtleXdvcmRcIixcbiAgICAgICAgIHJlZ2V4IDogXCJAKD8hQClbXiBdKlwiXG4gICAgICB9KTtcbiAgICAgIHRoaXMuJHJ1bGVzW1wicmQtc3RhcnRcIl0udW5zaGlmdCh7XG4gICAgICAgICB0b2tlbiA6IFwiY29tbWVudFwiLFxuICAgICAgICAgcmVnZXggOiBcIkBAXCJcbiAgICAgIH0pO1xuICAgICAgdGhpcy4kcnVsZXNbXCJyZC1zdGFydFwiXS5wdXNoKHtcbiAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsXG4gICAgICAgICByZWdleCA6IFwiW14lXFxcXFxcXFxbKHtcXFxcXSl9XStcIlxuICAgICAgfSk7XG4gICB9O1xuXG4gICBvb3AuaW5oZXJpdHMoUkhpZ2hsaWdodFJ1bGVzLCBUZXh0SGlnaGxpZ2h0UnVsZXMpO1xuXG4gICBleHBvcnRzLlJIaWdobGlnaHRSdWxlcyA9IFJIaWdobGlnaHRSdWxlcztcbiIsIi8qXG4gKiB0ZXhfaGlnaGxpZ2h0X3J1bGVzLmpzXG4gKlxuICogQ29weXJpZ2h0IChDKSAyMDA5LTExIGJ5IFJTdHVkaW8sIEluYy5cbiAqXG4gKiBUaGUgSW5pdGlhbCBEZXZlbG9wZXIgb2YgdGhlIE9yaWdpbmFsIENvZGUgaXNcbiAqIEFqYXgub3JnIEIuVi5cbiAqIFBvcnRpb25zIGNyZWF0ZWQgYnkgdGhlIEluaXRpYWwgRGV2ZWxvcGVyIGFyZSBDb3B5cmlnaHQgKEMpIDIwMTBcbiAqIHRoZSBJbml0aWFsIERldmVsb3Blci4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBEaXN0cmlidXRlZCB1bmRlciB0aGUgQlNEIGxpY2Vuc2U6XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDEwLCBBamF4Lm9yZyBCLlYuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dFxuICogbW9kaWZpY2F0aW9uLCBhcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG4gKiAgICAgKiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodFxuICogICAgICAgbm90aWNlLCB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyLlxuICogICAgICogUmVkaXN0cmlidXRpb25zIGluIGJpbmFyeSBmb3JtIG11c3QgcmVwcm9kdWNlIHRoZSBhYm92ZSBjb3B5cmlnaHRcbiAqICAgICAgIG5vdGljZSwgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lciBpbiB0aGVcbiAqICAgICAgIGRvY3VtZW50YXRpb24gYW5kL29yIG90aGVyIG1hdGVyaWFscyBwcm92aWRlZCB3aXRoIHRoZSBkaXN0cmlidXRpb24uXG4gKiAgICAgKiBOZWl0aGVyIHRoZSBuYW1lIG9mIEFqYXgub3JnIEIuVi4gbm9yIHRoZVxuICogICAgICAgbmFtZXMgb2YgaXRzIGNvbnRyaWJ1dG9ycyBtYXkgYmUgdXNlZCB0byBlbmRvcnNlIG9yIHByb21vdGUgcHJvZHVjdHNcbiAqICAgICAgIGRlcml2ZWQgZnJvbSB0aGlzIHNvZnR3YXJlIHdpdGhvdXQgc3BlY2lmaWMgcHJpb3Igd3JpdHRlbiBwZXJtaXNzaW9uLlxuICpcbiAqIFRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgVEhFIENPUFlSSUdIVCBIT0xERVJTIEFORCBDT05UUklCVVRPUlMgXCJBUyBJU1wiIEFORFxuICogQU5ZIEVYUFJFU1MgT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFIElNUExJRURcbiAqIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBUkVcbiAqIERJU0NMQUlNRUQuIElOIE5PIEVWRU5UIFNIQUxMIEFKQVguT1JHIEIuVi4gQkUgTElBQkxFIEZPUiBBTllcbiAqIERJUkVDVCwgSU5ESVJFQ1QsIElOQ0lERU5UQUwsIFNQRUNJQUwsIEVYRU1QTEFSWSwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTXG4gKiAoSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFBST0NVUkVNRU5UIE9GIFNVQlNUSVRVVEUgR09PRFMgT1IgU0VSVklDRVM7XG4gKiBMT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUzsgT1IgQlVTSU5FU1MgSU5URVJSVVBUSU9OKSBIT1dFVkVSIENBVVNFRCBBTkRcbiAqIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSIElOIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUXG4gKiAoSU5DTFVESU5HIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0UgT0ZcbiAqXG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBsYW5nID0gcmVxdWlyZShcIi4uL2xpYi9sYW5nXCIpO1xudmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcblxudmFyIFRleEhpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24odGV4dENsYXNzKSB7XG5cbiAgICBpZiAoIXRleHRDbGFzcylcbiAgICAgICAgdGV4dENsYXNzID0gXCJ0ZXh0XCI7XG5cbiAgICAvLyByZWdleHAgbXVzdCBub3QgaGF2ZSBjYXB0dXJpbmcgcGFyZW50aGVzZXMuIFVzZSAoPzopIGluc3RlYWQuXG4gICAgLy8gcmVnZXhwcyBhcmUgb3JkZXJlZCAtPiB0aGUgZmlyc3QgbWF0Y2ggaXMgdXNlZFxuXG4gICAgdGhpcy4kcnVsZXMgPSB7XG4gICAgICAgIFwic3RhcnRcIiA6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIlLiokXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IHRleHRDbGFzcywgLy8gbm9uLWNvbW1hbmRcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXFxcXFxbJCYlI1xcXFx7XFxcXH1dXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwia2V5d29yZFwiLCAvLyBjb21tYW5kXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFxcXFxcKD86ZG9jdW1lbnRjbGFzc3x1c2VwYWNrYWdlfG5ld2NvdW50ZXJ8c2V0Y291bnRlcnxhZGR0b2NvdW50ZXJ8dmFsdWV8YXJhYmljfHN0ZXBjb3VudGVyfG5ld2Vudmlyb25tZW50fHJlbmV3ZW52aXJvbm1lbnR8cmVmfHZyZWZ8ZXFyZWZ8cGFnZXJlZnxsYWJlbHxjaXRlW2EtekEtWl0qfHRhZ3xiZWdpbnxlbmR8YmliaXRlbSlcXFxcYlwiLFxuICAgICAgICAgICAgICAgbmV4dCA6IFwibm9zcGVsbFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImtleXdvcmRcIiwgLy8gY29tbWFuZFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcXFxcXCg/OlthLXpBLVowLTldK3xbXmEtekEtWjAtOV0pXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgIC8vIE9idmlvdXNseSB0aGVzZSBhcmUgbmVpdGhlciBrZXl3b3JkcyBub3Igb3BlcmF0b3JzLCBidXRcbiAgICAgICAgICAgICAgIC8vIGxhYmVsbGluZyB0aGVtIGFzIHN1Y2ggd2FzIHRoZSBlYXNpZXN0IHdheSB0byBnZXQgdGhlbVxuICAgICAgICAgICAgICAgLy8gdG8gYmUgY29sb3JlZCBkaXN0aW5jdGx5IGZyb20gcmVndWxhciB0ZXh0XG4gICAgICAgICAgICAgICB0b2tlbiA6IFwicGFyZW4ua2V5d29yZC5vcGVyYXRvclwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJbWyh7XVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAvLyBPYnZpb3VzbHkgdGhlc2UgYXJlIG5laXRoZXIga2V5d29yZHMgbm9yIG9wZXJhdG9ycywgYnV0XG4gICAgICAgICAgICAgICAvLyBsYWJlbGxpbmcgdGhlbSBhcyBzdWNoIHdhcyB0aGUgZWFzaWVzdCB3YXkgdG8gZ2V0IHRoZW1cbiAgICAgICAgICAgICAgIC8vIHRvIGJlIGNvbG9yZWQgZGlzdGluY3RseSBmcm9tIHJlZ3VsYXIgdGV4dFxuICAgICAgICAgICAgICAgdG9rZW4gOiBcInBhcmVuLmtleXdvcmQub3BlcmF0b3JcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiW1xcXFxdKX1dXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IHRleHRDbGFzcyxcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXHMrXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgLy8gVGhpcyBtb2RlIGlzIG5lY2Vzc2FyeSB0byBwcmV2ZW50IHNwZWxsIGNoZWNraW5nLCBidXQgdG8ga2VlcCB0aGVcbiAgICAgICAgLy8gc2FtZSBzeW50YXggaGlnaGxpZ2h0aW5nIGJlaGF2aW9yLiBUaGUgbGlzdCBvZiBjb21tYW5kcyBjb21lcyBmcm9tXG4gICAgICAgIC8vIFRleGxpcHNlLlxuICAgICAgICBcIm5vc3BlbGxcIiA6IFtcbiAgICAgICAgICAge1xuICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIixcbiAgICAgICAgICAgICAgIHJlZ2V4IDogXCIlLiokXCIsXG4gICAgICAgICAgICAgICBuZXh0IDogXCJzdGFydFwiXG4gICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgIHRva2VuIDogXCJub3NwZWxsLlwiICsgdGV4dENsYXNzLCAvLyBub24tY29tbWFuZFxuICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFxcXFxcWyQmJSNcXFxce1xcXFx9XVwiXG4gICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkXCIsIC8vIGNvbW1hbmRcbiAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcXFxcXCg/OmRvY3VtZW50Y2xhc3N8dXNlcGFja2FnZXxuZXdjb3VudGVyfHNldGNvdW50ZXJ8YWRkdG9jb3VudGVyfHZhbHVlfGFyYWJpY3xzdGVwY291bnRlcnxuZXdlbnZpcm9ubWVudHxyZW5ld2Vudmlyb25tZW50fHJlZnx2cmVmfGVxcmVmfHBhZ2VyZWZ8bGFiZWx8Y2l0ZVthLXpBLVpdKnx0YWd8YmVnaW58ZW5kfGJpYml0ZW0pXFxcXGJcIlxuICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICB0b2tlbiA6IFwia2V5d29yZFwiLCAvLyBjb21tYW5kXG4gICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXFxcXFwoPzpbYS16QS1aMC05XSt8W15hLXpBLVowLTldKVwiLFxuICAgICAgICAgICAgICAgbmV4dCA6IFwic3RhcnRcIlxuICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICB0b2tlbiA6IFwicGFyZW4ua2V5d29yZC5vcGVyYXRvclwiLFxuICAgICAgICAgICAgICAgcmVnZXggOiBcIltbKHtdXCJcbiAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgdG9rZW4gOiBcInBhcmVuLmtleXdvcmQub3BlcmF0b3JcIixcbiAgICAgICAgICAgICAgIHJlZ2V4IDogXCJbXFxcXF0pXVwiXG4gICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgIHRva2VuIDogXCJwYXJlbi5rZXl3b3JkLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICAgICByZWdleCA6IFwifVwiLFxuICAgICAgICAgICAgICAgbmV4dCA6IFwic3RhcnRcIlxuICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICB0b2tlbiA6IFwibm9zcGVsbC5cIiArIHRleHRDbGFzcyxcbiAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxccytcIlxuICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICB0b2tlbiA6IFwibm9zcGVsbC5cIiArIHRleHRDbGFzcyxcbiAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcdytcIlxuICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9O1xufTtcblxub29wLmluaGVyaXRzKFRleEhpZ2hsaWdodFJ1bGVzLCBUZXh0SGlnaGxpZ2h0UnVsZXMpO1xuXG5leHBvcnRzLlRleEhpZ2hsaWdodFJ1bGVzID0gVGV4SGlnaGxpZ2h0UnVsZXM7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=