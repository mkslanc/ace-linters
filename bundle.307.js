(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[307],{

/***/ 45081:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var HighlightRules = (__webpack_require__(23614)/* .JsonHighlightRules */ .S);
var MatchingBraceOutdent = (__webpack_require__(28670).MatchingBraceOutdent);
var CStyleFoldMode = (__webpack_require__(93887)/* .FoldMode */ .l);
var WorkerClient = (__webpack_require__(28402).WorkerClient);

var Mode = function() {
    this.HighlightRules = HighlightRules;
    this.$outdent = new MatchingBraceOutdent();
    this.$behaviour = this.$defaultBehaviour;
    this.foldingRules = new CStyleFoldMode();
};
oop.inherits(Mode, TextMode);

(function() {

    this.lineCommentStart = "//";
    this.blockComment = {start: "/*", end: "*/"};
    
    this.getNextLineIndent = function(state, line, tab) {
        var indent = this.$getIndent(line);

        if (state == "start") {
            var match = line.match(/^.*[\{\(\[]\s*$/);
            if (match) {
                indent += tab;
            }
        }

        return indent;
    };

    this.checkOutdent = function(state, line, input) {
        return this.$outdent.checkOutdent(line, input);
    };

    this.autoOutdent = function(state, doc, row) {
        this.$outdent.autoOutdent(doc, row);
    };

    this.createWorker = function(session) {
        var worker = new WorkerClient(["ace"], "ace/mode/json_worker", "JsonWorker");
        worker.attachToDocument(session.getDocument());

        worker.on("annotate", function(e) {
            session.setAnnotations(e.data);
        });

        worker.on("terminate", function() {
            session.clearAnnotations();
        });

        return worker;
    };


    this.$id = "ace/mode/json";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 23614:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

var JsonHighlightRules = function() {

    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used
    this.$rules = {
        "start" : [
            {
                token : "variable", // single line
                regex : '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]\\s*(?=:)'
            }, {
                token : "string", // single line
                regex : '"',
                next  : "string"
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
                token : "text", // single quoted strings are not allowed
                regex : "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"
            }, {
                token : "comment", // comments are not allowed, but who cares?
                regex : "\\/\\/.*$"
            }, {
                token : "comment.start", // comments are not allowed, but who cares?
                regex : "\\/\\*",
                next  : "comment"
            }, {
                token : "paren.lparen",
                regex : "[[({]"
            }, {
                token : "paren.rparen",
                regex : "[\\])}]"
            }, {
                token : "punctuation.operator",
                regex : /[,]/
            }, {
                token : "text",
                regex : "\\s+"
            }
        ],
        "string" : [
            {
                token : "constant.language.escape",
                regex : /\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|["\\\/bfnrt])/
            }, {
                token : "string",
                regex : '"|$',
                next  : "start"
            }, {
                defaultToken : "string"
            }
        ],
        "comment" : [
            {
                token : "comment.end", // comments are not allowed, but who cares?
                regex : "\\*\\/",
                next  : "start"
            }, {
                defaultToken: "comment"
            }
        ]
    };
    
};

oop.inherits(JsonHighlightRules, TextHighlightRules);

exports.S = JsonHighlightRules;


/***/ }),

/***/ 20307:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var HtmlMode = (__webpack_require__(32234).Mode);
var JavascriptMode = (__webpack_require__(93388).Mode);
var JsonMode = (__webpack_require__(45081).Mode);
var CssMode = (__webpack_require__(41080).Mode);
var LiquidHighlightRules = (__webpack_require__(71336)/* .LiquidHighlightRules */ .k);
var MatchingBraceOutdent = (__webpack_require__(28670).MatchingBraceOutdent);

/* -------------------------------------------- */
/* FOLDS                                        */
/* -------------------------------------------- */

var FoldMode = (__webpack_require__(93887)/* .FoldMode */ .l);

/* -------------------------------------------- */
/* MODE                                         */
/* -------------------------------------------- */

var Mode = function () {

  JsonMode.call(this);
  HtmlMode.call(this);
  CssMode.call(this);
  JavascriptMode.call(this);
  this.HighlightRules = LiquidHighlightRules;
  this.foldingRules = new FoldMode();

};

oop.inherits(Mode, TextMode);

(function () {

    this.blockComment = {start: "<!--", end: "-->"};
    this.voidElements = new HtmlMode().voidElements;

    this.getNextLineIndent = function(state, line, tab) {
        var indent = this.$getIndent(line);

        var tokenizedLine = this.getTokenizer().getLineTokens(line, state);
        var tokens = tokenizedLine.tokens;
        var endState = tokenizedLine.state;

        if (tokens.length && tokens[tokens.length-1].type == "comment") {
            return indent;
        }

        if (state == "start") {
            var match = line.match(/^.*[\{\(\[]\s*$/);
            if (match) {
                indent += tab;
            }
        }

        return indent;
    };

    this.checkOutdent = function(state, line, input) {
        return this.$outdent.checkOutdent(line, input);
    };

    this.autoOutdent = function(state, doc, row) {
        this.$outdent.autoOutdent(doc, row);
    };

    this.$id = "ace/mode/liquid";
    this.snippetFileId = "ace/snippets/liquid";

}.call(Mode.prototype));

exports.Mode = Mode;


/***/ }),

/***/ 71336:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var oop = __webpack_require__(2645);

var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);
var CssHighlightRules = (__webpack_require__(74275).CssHighlightRules);
var HtmlHighlightRules = (__webpack_require__(10413).HtmlHighlightRules);
var JsonHighlightRules = (__webpack_require__(23614)/* .JsonHighlightRules */ .S);
var JavaScriptHighlightRules =  (__webpack_require__(15903).JavaScriptHighlightRules);

var LiquidHighlightRules = function () {

  HtmlHighlightRules.call(this);

  /**
   * Embedded Matches
   *
   * Handles `onMatch` tokens and correct parses the
   * inner contents of the tag.
   */
  function onMatchEmbedded(name) {

    const length = name.length;

    return function (value) {

      const idx = value.indexOf(name);

      const x = [
        {
          type: "meta.tag.punctuation.tag-open",
          value: "{%"
        },
        {
          type: "text",
          value: value.slice(2, idx)
        },
        {
          type: "keyword.tag" + name + ".tag-name",
          value: value.slice(idx, idx + length)
        },
        {
          type: "text",
          value: value.slice(idx + length, value.indexOf("%}"))
        },
        {
          type: "meta.tag.punctuation.tag-close",
          value: "%}"
        }
      ];

      return x;
    };
  }


  for (var rule in this.$rules) {

    this.$rules[rule].unshift(
      {
        token: "comment.block",
        regex: /{%-?\s*comment\s*-?%}/,
        next: [
          {
            token: "comment.block",
            regex: /{%-?\s*endcomment\s*-?%}/,
            next: "pop"
          },
          {
            defaultToken: "comment",
            caseInsensitive: false
          }
        ]
      },
      {
        token: "comment.line",
        regex: /{%-?\s*#/,
        next: [
          {
            token: "comment.line",
            regex: /-?%}/,
            next: "pop"
          },
          {
            defaultToken: "comment",
            caseInsensitive: false
          }
        ]
      },
      {
        token: 'style.embedded.start',
        regex: /({%-?\s*\bstyle\b\s*-?%})/,
        next: "style-start",
        onMatch: onMatchEmbedded("style")
      },
      {
        regex: /({%-?\s*\bstylesheet\b\s*-?%})/,
        next: "stylesheet-start",
        onMatch: onMatchEmbedded("stylesheet")
      },
      {
        regex: /({%-?\s*\bschema\b\s*-?%})/,
        next: "schema-start",
        onMatch: onMatchEmbedded("schema")
      },
      {
        regex: /({%-?\s*\bjavascript\b\s*-?%})/,
        next: "javascript-start",
        onMatch: onMatchEmbedded("javascript")
      },
      {
        token: "meta.tag.punctuation.tag-open",
        regex: /({%)/,
        next: [
          {
              token: "keyword.block",
              regex: /-?\s*[a-zA-Z_$][a-zA-Z0-9_$]+\b/,
              next: 'liquid-start'
          },
          {
            token: "meta.tag.punctuation.tag-close",
            regex: /(-?)(%})/,
            next: "pop"
          }
        ]
      },
      {
        token: "meta.tag.punctuation.ouput-open",
        regex: /({{)/,
        push: "liquid-start"
      }
    );
  }

  /* -------------------------------------------- */
  /* EMBEDDED REGIONS                             */
  /* -------------------------------------------- */

  this.embedRules(JsonHighlightRules, "schema-", [
    {
      token: "schema-start",
      next: "pop",
      regex: /({%-?\s*\bendschema\b\s*-?%})/,
      onMatch: onMatchEmbedded("endschema")
    }
  ]);

  this.embedRules(JavaScriptHighlightRules, "javascript-", [
    {
      token: "javascript-start",
      next: "pop",
      regex: /({%-?\s*\bendjavascript\b\s*-?%})/,
      onMatch: onMatchEmbedded("endjavascript")
    }
  ]);



  this.embedRules(CssHighlightRules, "style-", [
    {
      token: "style-start",
      next: "pop",
      regex: /({%-?\s*\bendstyle\b\s*-?%})/,
      onMatch: onMatchEmbedded("endstyle")
    }
  ]);

  this.embedRules(CssHighlightRules, "stylesheet-", [
    {
      token: "stylesheet-start",
      next: "pop",
      regex: /({%-?\s*\bendstylesheet\b\s*-?%})/,
      onMatch: onMatchEmbedded("endstylesheet")
    }
  ]);

  /* -------------------------------------------- */
  /* LIQUID GRAMMARS                              */
  /* -------------------------------------------- */

  this.addRules({
    "liquid-start": [
      {
        token: "meta.tag.punctuation.ouput-close",
        regex: /}}/,
        next: "pop"
      },
      {
        token: "meta.tag.punctuation.tag-close",
        regex: /%}/,
        next: "pop"
      },
      {
        token: "string",
        regex: /['](?:(?:\\.)|(?:[^'\\]))*?[']/
      },
      {
        token: "string",
        regex: /["](?:(?:\\.)|(?:[^'\\]))*?["]/
      },
      {
        token: "constant.numeric",
        regex: /0[xX][0-9a-fA-F]+\b/
      },
      {
        token: "constant.numeric",
        regex: /[+-]?\d+(?:(?:\.\d*)?(?:[eE][+-]?\d+)?)?\b/
      },
      {
        token: "keyword.operator",
        regex: /\*|\-|\+|=|!=|\?\|\:/
      },
      {
        token: "constant.language.boolean",
        regex: /(?:true|false|nil|empty)\b/
      },
      {
        token: "keyword.operator",
        regex: /\s+(?:and|contains|in|with)\b\s+/
      },
      {
        token: ["keyword.operator", "support.function"],
        regex: /(\|\s*)([a-zA-Z_]+)/

      },
      {
        token: "support.function",
        regex: /\s*([a-zA-Z_]+\b)(?=:)/
      },
      {
        token: "keyword.operator",
        regex:
          /(:)\s*(?=[a-zA-Z_])/
      },
      {
        token: [
          "support.class",
          "keyword.operator",
          "support.object",
          "keyword.operator",
          "variable.parameter"
        ],
        regex: /(\w+)(\.)(\w+)(\.)?(\w+)?/
      },
      {
        token: "variable.parameter",
        regex: /\.([a-zA-Z_$][a-zA-Z0-9_$]*\b)$/
      },
      {
        token: "support.class",
        regex: /(?:additional_checkout_buttons|content_for_additional_checkout_buttons)\b/
      },
      {
        token: "paren.lparen",
        regex: /[\[\({]/
      },
      {
        token: "paren.rparen",
        regex: /[\])}]/
      },
      {
        token: "text",
        regex: /\s+/
      }
    ]
  });

  this.normalizeRules();

};

oop.inherits(LiquidHighlightRules, TextHighlightRules);

exports.k = LiquidHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNsQjtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QixPQUFPO0FBQ1A7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQixPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7O0FBRUE7O0FBRUE7O0FBRUEsU0FBNEIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2pzb24uanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9qc29uX2hpZ2hsaWdodF9ydWxlcy5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2xpcXVpZC5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2xpcXVpZF9oaWdobGlnaHRfcnVsZXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0TW9kZSA9IHJlcXVpcmUoXCIuL3RleHRcIikuTW9kZTtcbnZhciBIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL2pzb25faGlnaGxpZ2h0X3J1bGVzXCIpLkpzb25IaWdobGlnaHRSdWxlcztcbnZhciBNYXRjaGluZ0JyYWNlT3V0ZGVudCA9IHJlcXVpcmUoXCIuL21hdGNoaW5nX2JyYWNlX291dGRlbnRcIikuTWF0Y2hpbmdCcmFjZU91dGRlbnQ7XG52YXIgQ1N0eWxlRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9mb2xkaW5nL2NzdHlsZVwiKS5Gb2xkTW9kZTtcbnZhciBXb3JrZXJDbGllbnQgPSByZXF1aXJlKFwiLi4vd29ya2VyL3dvcmtlcl9jbGllbnRcIikuV29ya2VyQ2xpZW50O1xuXG52YXIgTW9kZSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuSGlnaGxpZ2h0UnVsZXMgPSBIaWdobGlnaHRSdWxlcztcbiAgICB0aGlzLiRvdXRkZW50ID0gbmV3IE1hdGNoaW5nQnJhY2VPdXRkZW50KCk7XG4gICAgdGhpcy4kYmVoYXZpb3VyID0gdGhpcy4kZGVmYXVsdEJlaGF2aW91cjtcbiAgICB0aGlzLmZvbGRpbmdSdWxlcyA9IG5ldyBDU3R5bGVGb2xkTW9kZSgpO1xufTtcbm9vcC5pbmhlcml0cyhNb2RlLCBUZXh0TW9kZSk7XG5cbihmdW5jdGlvbigpIHtcblxuICAgIHRoaXMubGluZUNvbW1lbnRTdGFydCA9IFwiLy9cIjtcbiAgICB0aGlzLmJsb2NrQ29tbWVudCA9IHtzdGFydDogXCIvKlwiLCBlbmQ6IFwiKi9cIn07XG4gICAgXG4gICAgdGhpcy5nZXROZXh0TGluZUluZGVudCA9IGZ1bmN0aW9uKHN0YXRlLCBsaW5lLCB0YWIpIHtcbiAgICAgICAgdmFyIGluZGVudCA9IHRoaXMuJGdldEluZGVudChsaW5lKTtcblxuICAgICAgICBpZiAoc3RhdGUgPT0gXCJzdGFydFwiKSB7XG4gICAgICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKC9eLipbXFx7XFwoXFxbXVxccyokLyk7XG4gICAgICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgICAgICBpbmRlbnQgKz0gdGFiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGluZGVudDtcbiAgICB9O1xuXG4gICAgdGhpcy5jaGVja091dGRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgbGluZSwgaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJG91dGRlbnQuY2hlY2tPdXRkZW50KGxpbmUsIGlucHV0KTtcbiAgICB9O1xuXG4gICAgdGhpcy5hdXRvT3V0ZGVudCA9IGZ1bmN0aW9uKHN0YXRlLCBkb2MsIHJvdykge1xuICAgICAgICB0aGlzLiRvdXRkZW50LmF1dG9PdXRkZW50KGRvYywgcm93KTtcbiAgICB9O1xuXG4gICAgdGhpcy5jcmVhdGVXb3JrZXIgPSBmdW5jdGlvbihzZXNzaW9uKSB7XG4gICAgICAgIHZhciB3b3JrZXIgPSBuZXcgV29ya2VyQ2xpZW50KFtcImFjZVwiXSwgXCJhY2UvbW9kZS9qc29uX3dvcmtlclwiLCBcIkpzb25Xb3JrZXJcIik7XG4gICAgICAgIHdvcmtlci5hdHRhY2hUb0RvY3VtZW50KHNlc3Npb24uZ2V0RG9jdW1lbnQoKSk7XG5cbiAgICAgICAgd29ya2VyLm9uKFwiYW5ub3RhdGVcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgc2Vzc2lvbi5zZXRBbm5vdGF0aW9ucyhlLmRhdGEpO1xuICAgICAgICB9KTtcblxuICAgICAgICB3b3JrZXIub24oXCJ0ZXJtaW5hdGVcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzZXNzaW9uLmNsZWFyQW5ub3RhdGlvbnMoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHdvcmtlcjtcbiAgICB9O1xuXG5cbiAgICB0aGlzLiRpZCA9IFwiYWNlL21vZGUvanNvblwiO1xufSkuY2FsbChNb2RlLnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTW9kZSA9IE1vZGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcblxudmFyIEpzb25IaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgLy8gcmVnZXhwIG11c3Qgbm90IGhhdmUgY2FwdHVyaW5nIHBhcmVudGhlc2VzLiBVc2UgKD86KSBpbnN0ZWFkLlxuICAgIC8vIHJlZ2V4cHMgYXJlIG9yZGVyZWQgLT4gdGhlIGZpcnN0IG1hdGNoIGlzIHVzZWRcbiAgICB0aGlzLiRydWxlcyA9IHtcbiAgICAgICAgXCJzdGFydFwiIDogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJ2YXJpYWJsZVwiLCAvLyBzaW5nbGUgbGluZVxuICAgICAgICAgICAgICAgIHJlZ2V4IDogJ1tcIl0oPzooPzpcXFxcXFxcXC4pfCg/OlteXCJcXFxcXFxcXF0pKSo/W1wiXVxcXFxzKig/PTopJ1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIiwgLy8gc2luZ2xlIGxpbmVcbiAgICAgICAgICAgICAgICByZWdleCA6ICdcIicsXG4gICAgICAgICAgICAgICAgbmV4dCAgOiBcInN0cmluZ1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIiwgLy8gaGV4XG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIjBbeFhdWzAtOWEtZkEtRl0rXFxcXGJcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5udW1lcmljXCIsIC8vIGZsb2F0XG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlsrLV0/XFxcXGQrKD86KD86XFxcXC5cXFxcZCopPyg/OltlRV1bKy1dP1xcXFxkKyk/KT9cXFxcYlwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lmxhbmd1YWdlLmJvb2xlYW5cIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiKD86dHJ1ZXxmYWxzZSlcXFxcYlwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInRleHRcIiwgLy8gc2luZ2xlIHF1b3RlZCBzdHJpbmdzIGFyZSBub3QgYWxsb3dlZFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJbJ10oPzooPzpcXFxcXFxcXC4pfCg/OlteJ1xcXFxcXFxcXSkpKj9bJ11cIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsIC8vIGNvbW1lbnRzIGFyZSBub3QgYWxsb3dlZCwgYnV0IHdobyBjYXJlcz9cbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXC9cXFxcLy4qJFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnQuc3RhcnRcIiwgLy8gY29tbWVudHMgYXJlIG5vdCBhbGxvd2VkLCBidXQgd2hvIGNhcmVzP1xuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcL1xcXFwqXCIsXG4gICAgICAgICAgICAgICAgbmV4dCAgOiBcImNvbW1lbnRcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJwYXJlbi5scGFyZW5cIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiW1soe11cIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJwYXJlbi5ycGFyZW5cIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiW1xcXFxdKX1dXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwicHVuY3R1YXRpb24ub3BlcmF0b3JcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC9bLF0vXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXHMrXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgXCJzdHJpbmdcIiA6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvXFxcXCg/OnhbMC05YS1mQS1GXXsyfXx1WzAtOWEtZkEtRl17NH18W1wiXFxcXFxcL2JmbnJ0XSkvXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogJ1wifCQnLFxuICAgICAgICAgICAgICAgIG5leHQgIDogXCJzdGFydFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuIDogXCJzdHJpbmdcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBcImNvbW1lbnRcIiA6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudC5lbmRcIiwgLy8gY29tbWVudHMgYXJlIG5vdCBhbGxvd2VkLCBidXQgd2hvIGNhcmVzP1xuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcKlxcXFwvXCIsXG4gICAgICAgICAgICAgICAgbmV4dCAgOiBcInN0YXJ0XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwiY29tbWVudFwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9O1xuICAgIFxufTtcblxub29wLmluaGVyaXRzKEpzb25IaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuZXhwb3J0cy5Kc29uSGlnaGxpZ2h0UnVsZXMgPSBKc29uSGlnaGxpZ2h0UnVsZXM7XG4iLCJ2YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dE1vZGUgPSByZXF1aXJlKFwiLi90ZXh0XCIpLk1vZGU7XG52YXIgSHRtbE1vZGUgPSByZXF1aXJlKFwiLi9odG1sXCIpLk1vZGU7XG52YXIgSmF2YXNjcmlwdE1vZGUgPSByZXF1aXJlKFwiLi9qYXZhc2NyaXB0XCIpLk1vZGU7XG52YXIgSnNvbk1vZGUgPSByZXF1aXJlKFwiLi9qc29uXCIpLk1vZGU7XG52YXIgQ3NzTW9kZSA9IHJlcXVpcmUoXCIuL2Nzc1wiKS5Nb2RlO1xudmFyIExpcXVpZEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vbGlxdWlkX2hpZ2hsaWdodF9ydWxlc1wiKS5MaXF1aWRIaWdobGlnaHRSdWxlcztcbnZhciBNYXRjaGluZ0JyYWNlT3V0ZGVudCA9IHJlcXVpcmUoXCIuL21hdGNoaW5nX2JyYWNlX291dGRlbnRcIikuTWF0Y2hpbmdCcmFjZU91dGRlbnQ7XG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4vKiBGT0xEUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxudmFyIEZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZGluZy9jc3R5bGVcIikuRm9sZE1vZGU7XG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4vKiBNT0RFICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxudmFyIE1vZGUgPSBmdW5jdGlvbiAoKSB7XG5cbiAgSnNvbk1vZGUuY2FsbCh0aGlzKTtcbiAgSHRtbE1vZGUuY2FsbCh0aGlzKTtcbiAgQ3NzTW9kZS5jYWxsKHRoaXMpO1xuICBKYXZhc2NyaXB0TW9kZS5jYWxsKHRoaXMpO1xuICB0aGlzLkhpZ2hsaWdodFJ1bGVzID0gTGlxdWlkSGlnaGxpZ2h0UnVsZXM7XG4gIHRoaXMuZm9sZGluZ1J1bGVzID0gbmV3IEZvbGRNb2RlKCk7XG5cbn07XG5cbm9vcC5pbmhlcml0cyhNb2RlLCBUZXh0TW9kZSk7XG5cbihmdW5jdGlvbiAoKSB7XG5cbiAgICB0aGlzLmJsb2NrQ29tbWVudCA9IHtzdGFydDogXCI8IS0tXCIsIGVuZDogXCItLT5cIn07XG4gICAgdGhpcy52b2lkRWxlbWVudHMgPSBuZXcgSHRtbE1vZGUoKS52b2lkRWxlbWVudHM7XG5cbiAgICB0aGlzLmdldE5leHRMaW5lSW5kZW50ID0gZnVuY3Rpb24oc3RhdGUsIGxpbmUsIHRhYikge1xuICAgICAgICB2YXIgaW5kZW50ID0gdGhpcy4kZ2V0SW5kZW50KGxpbmUpO1xuXG4gICAgICAgIHZhciB0b2tlbml6ZWRMaW5lID0gdGhpcy5nZXRUb2tlbml6ZXIoKS5nZXRMaW5lVG9rZW5zKGxpbmUsIHN0YXRlKTtcbiAgICAgICAgdmFyIHRva2VucyA9IHRva2VuaXplZExpbmUudG9rZW5zO1xuICAgICAgICB2YXIgZW5kU3RhdGUgPSB0b2tlbml6ZWRMaW5lLnN0YXRlO1xuXG4gICAgICAgIGlmICh0b2tlbnMubGVuZ3RoICYmIHRva2Vuc1t0b2tlbnMubGVuZ3RoLTFdLnR5cGUgPT0gXCJjb21tZW50XCIpIHtcbiAgICAgICAgICAgIHJldHVybiBpbmRlbnQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RhdGUgPT0gXCJzdGFydFwiKSB7XG4gICAgICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKC9eLipbXFx7XFwoXFxbXVxccyokLyk7XG4gICAgICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgICAgICBpbmRlbnQgKz0gdGFiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGluZGVudDtcbiAgICB9O1xuXG4gICAgdGhpcy5jaGVja091dGRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgbGluZSwgaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJG91dGRlbnQuY2hlY2tPdXRkZW50KGxpbmUsIGlucHV0KTtcbiAgICB9O1xuXG4gICAgdGhpcy5hdXRvT3V0ZGVudCA9IGZ1bmN0aW9uKHN0YXRlLCBkb2MsIHJvdykge1xuICAgICAgICB0aGlzLiRvdXRkZW50LmF1dG9PdXRkZW50KGRvYywgcm93KTtcbiAgICB9O1xuXG4gICAgdGhpcy4kaWQgPSBcImFjZS9tb2RlL2xpcXVpZFwiO1xuICAgIHRoaXMuc25pcHBldEZpbGVJZCA9IFwiYWNlL3NuaXBwZXRzL2xpcXVpZFwiO1xuXG59LmNhbGwoTW9kZS5wcm90b3R5cGUpKTtcblxuZXhwb3J0cy5Nb2RlID0gTW9kZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG5cbnZhciBUZXh0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90ZXh0X2hpZ2hsaWdodF9ydWxlc1wiKS5UZXh0SGlnaGxpZ2h0UnVsZXM7XG52YXIgQ3NzSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9jc3NfaGlnaGxpZ2h0X3J1bGVzXCIpLkNzc0hpZ2hsaWdodFJ1bGVzO1xudmFyIEh0bWxIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL2h0bWxfaGlnaGxpZ2h0X3J1bGVzXCIpLkh0bWxIaWdobGlnaHRSdWxlcztcbnZhciBKc29uSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9qc29uX2hpZ2hsaWdodF9ydWxlc1wiKS5Kc29uSGlnaGxpZ2h0UnVsZXM7XG52YXIgSmF2YVNjcmlwdEhpZ2hsaWdodFJ1bGVzID0gIHJlcXVpcmUoXCIuL2phdmFzY3JpcHRfaGlnaGxpZ2h0X3J1bGVzXCIpLkphdmFTY3JpcHRIaWdobGlnaHRSdWxlcztcblxudmFyIExpcXVpZEhpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24gKCkge1xuXG4gIEh0bWxIaWdobGlnaHRSdWxlcy5jYWxsKHRoaXMpO1xuXG4gIC8qKlxuICAgKiBFbWJlZGRlZCBNYXRjaGVzXG4gICAqXG4gICAqIEhhbmRsZXMgYG9uTWF0Y2hgIHRva2VucyBhbmQgY29ycmVjdCBwYXJzZXMgdGhlXG4gICAqIGlubmVyIGNvbnRlbnRzIG9mIHRoZSB0YWcuXG4gICAqL1xuICBmdW5jdGlvbiBvbk1hdGNoRW1iZWRkZWQobmFtZSkge1xuXG4gICAgY29uc3QgbGVuZ3RoID0gbmFtZS5sZW5ndGg7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlKSB7XG5cbiAgICAgIGNvbnN0IGlkeCA9IHZhbHVlLmluZGV4T2YobmFtZSk7XG5cbiAgICAgIGNvbnN0IHggPSBbXG4gICAgICAgIHtcbiAgICAgICAgICB0eXBlOiBcIm1ldGEudGFnLnB1bmN0dWF0aW9uLnRhZy1vcGVuXCIsXG4gICAgICAgICAgdmFsdWU6IFwieyVcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdHlwZTogXCJ0ZXh0XCIsXG4gICAgICAgICAgdmFsdWU6IHZhbHVlLnNsaWNlKDIsIGlkeClcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHR5cGU6IFwia2V5d29yZC50YWdcIiArIG5hbWUgKyBcIi50YWctbmFtZVwiLFxuICAgICAgICAgIHZhbHVlOiB2YWx1ZS5zbGljZShpZHgsIGlkeCArIGxlbmd0aClcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHR5cGU6IFwidGV4dFwiLFxuICAgICAgICAgIHZhbHVlOiB2YWx1ZS5zbGljZShpZHggKyBsZW5ndGgsIHZhbHVlLmluZGV4T2YoXCIlfVwiKSlcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHR5cGU6IFwibWV0YS50YWcucHVuY3R1YXRpb24udGFnLWNsb3NlXCIsXG4gICAgICAgICAgdmFsdWU6IFwiJX1cIlxuICAgICAgICB9XG4gICAgICBdO1xuXG4gICAgICByZXR1cm4geDtcbiAgICB9O1xuICB9XG5cblxuICBmb3IgKHZhciBydWxlIGluIHRoaXMuJHJ1bGVzKSB7XG5cbiAgICB0aGlzLiRydWxlc1tydWxlXS51bnNoaWZ0KFxuICAgICAge1xuICAgICAgICB0b2tlbjogXCJjb21tZW50LmJsb2NrXCIsXG4gICAgICAgIHJlZ2V4OiAveyUtP1xccypjb21tZW50XFxzKi0/JX0vLFxuICAgICAgICBuZXh0OiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdG9rZW46IFwiY29tbWVudC5ibG9ja1wiLFxuICAgICAgICAgICAgcmVnZXg6IC97JS0/XFxzKmVuZGNvbW1lbnRcXHMqLT8lfS8sXG4gICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwiY29tbWVudFwiLFxuICAgICAgICAgICAgY2FzZUluc2Vuc2l0aXZlOiBmYWxzZVxuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdG9rZW46IFwiY29tbWVudC5saW5lXCIsXG4gICAgICAgIHJlZ2V4OiAveyUtP1xccyojLyxcbiAgICAgICAgbmV4dDogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuOiBcImNvbW1lbnQubGluZVwiLFxuICAgICAgICAgICAgcmVnZXg6IC8tPyV9LyxcbiAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJjb21tZW50XCIsXG4gICAgICAgICAgICBjYXNlSW5zZW5zaXRpdmU6IGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0b2tlbjogJ3N0eWxlLmVtYmVkZGVkLnN0YXJ0JyxcbiAgICAgICAgcmVnZXg6IC8oeyUtP1xccypcXGJzdHlsZVxcYlxccyotPyV9KS8sXG4gICAgICAgIG5leHQ6IFwic3R5bGUtc3RhcnRcIixcbiAgICAgICAgb25NYXRjaDogb25NYXRjaEVtYmVkZGVkKFwic3R5bGVcIilcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHJlZ2V4OiAvKHslLT9cXHMqXFxic3R5bGVzaGVldFxcYlxccyotPyV9KS8sXG4gICAgICAgIG5leHQ6IFwic3R5bGVzaGVldC1zdGFydFwiLFxuICAgICAgICBvbk1hdGNoOiBvbk1hdGNoRW1iZWRkZWQoXCJzdHlsZXNoZWV0XCIpXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICByZWdleDogLyh7JS0/XFxzKlxcYnNjaGVtYVxcYlxccyotPyV9KS8sXG4gICAgICAgIG5leHQ6IFwic2NoZW1hLXN0YXJ0XCIsXG4gICAgICAgIG9uTWF0Y2g6IG9uTWF0Y2hFbWJlZGRlZChcInNjaGVtYVwiKVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcmVnZXg6IC8oeyUtP1xccypcXGJqYXZhc2NyaXB0XFxiXFxzKi0/JX0pLyxcbiAgICAgICAgbmV4dDogXCJqYXZhc2NyaXB0LXN0YXJ0XCIsXG4gICAgICAgIG9uTWF0Y2g6IG9uTWF0Y2hFbWJlZGRlZChcImphdmFzY3JpcHRcIilcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRva2VuOiBcIm1ldGEudGFnLnB1bmN0dWF0aW9uLnRhZy1vcGVuXCIsXG4gICAgICAgIHJlZ2V4OiAvKHslKS8sXG4gICAgICAgIG5leHQ6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICAgIHRva2VuOiBcImtleXdvcmQuYmxvY2tcIixcbiAgICAgICAgICAgICAgcmVnZXg6IC8tP1xccypbYS16QS1aXyRdW2EtekEtWjAtOV8kXStcXGIvLFxuICAgICAgICAgICAgICBuZXh0OiAnbGlxdWlkLXN0YXJ0J1xuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdG9rZW46IFwibWV0YS50YWcucHVuY3R1YXRpb24udGFnLWNsb3NlXCIsXG4gICAgICAgICAgICByZWdleDogLygtPykoJX0pLyxcbiAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRva2VuOiBcIm1ldGEudGFnLnB1bmN0dWF0aW9uLm91cHV0LW9wZW5cIixcbiAgICAgICAgcmVnZXg6IC8oe3spLyxcbiAgICAgICAgcHVzaDogXCJsaXF1aWQtc3RhcnRcIlxuICAgICAgfVxuICAgICk7XG4gIH1cblxuICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuICAvKiBFTUJFRERFRCBSRUdJT05TICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG4gIHRoaXMuZW1iZWRSdWxlcyhKc29uSGlnaGxpZ2h0UnVsZXMsIFwic2NoZW1hLVwiLCBbXG4gICAge1xuICAgICAgdG9rZW46IFwic2NoZW1hLXN0YXJ0XCIsXG4gICAgICBuZXh0OiBcInBvcFwiLFxuICAgICAgcmVnZXg6IC8oeyUtP1xccypcXGJlbmRzY2hlbWFcXGJcXHMqLT8lfSkvLFxuICAgICAgb25NYXRjaDogb25NYXRjaEVtYmVkZGVkKFwiZW5kc2NoZW1hXCIpXG4gICAgfVxuICBdKTtcblxuICB0aGlzLmVtYmVkUnVsZXMoSmF2YVNjcmlwdEhpZ2hsaWdodFJ1bGVzLCBcImphdmFzY3JpcHQtXCIsIFtcbiAgICB7XG4gICAgICB0b2tlbjogXCJqYXZhc2NyaXB0LXN0YXJ0XCIsXG4gICAgICBuZXh0OiBcInBvcFwiLFxuICAgICAgcmVnZXg6IC8oeyUtP1xccypcXGJlbmRqYXZhc2NyaXB0XFxiXFxzKi0/JX0pLyxcbiAgICAgIG9uTWF0Y2g6IG9uTWF0Y2hFbWJlZGRlZChcImVuZGphdmFzY3JpcHRcIilcbiAgICB9XG4gIF0pO1xuXG5cblxuICB0aGlzLmVtYmVkUnVsZXMoQ3NzSGlnaGxpZ2h0UnVsZXMsIFwic3R5bGUtXCIsIFtcbiAgICB7XG4gICAgICB0b2tlbjogXCJzdHlsZS1zdGFydFwiLFxuICAgICAgbmV4dDogXCJwb3BcIixcbiAgICAgIHJlZ2V4OiAvKHslLT9cXHMqXFxiZW5kc3R5bGVcXGJcXHMqLT8lfSkvLFxuICAgICAgb25NYXRjaDogb25NYXRjaEVtYmVkZGVkKFwiZW5kc3R5bGVcIilcbiAgICB9XG4gIF0pO1xuXG4gIHRoaXMuZW1iZWRSdWxlcyhDc3NIaWdobGlnaHRSdWxlcywgXCJzdHlsZXNoZWV0LVwiLCBbXG4gICAge1xuICAgICAgdG9rZW46IFwic3R5bGVzaGVldC1zdGFydFwiLFxuICAgICAgbmV4dDogXCJwb3BcIixcbiAgICAgIHJlZ2V4OiAvKHslLT9cXHMqXFxiZW5kc3R5bGVzaGVldFxcYlxccyotPyV9KS8sXG4gICAgICBvbk1hdGNoOiBvbk1hdGNoRW1iZWRkZWQoXCJlbmRzdHlsZXNoZWV0XCIpXG4gICAgfVxuICBdKTtcblxuICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuICAvKiBMSVFVSUQgR1JBTU1BUlMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqL1xuICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG4gIHRoaXMuYWRkUnVsZXMoe1xuICAgIFwibGlxdWlkLXN0YXJ0XCI6IFtcbiAgICAgIHtcbiAgICAgICAgdG9rZW46IFwibWV0YS50YWcucHVuY3R1YXRpb24ub3VwdXQtY2xvc2VcIixcbiAgICAgICAgcmVnZXg6IC99fS8sXG4gICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRva2VuOiBcIm1ldGEudGFnLnB1bmN0dWF0aW9uLnRhZy1jbG9zZVwiLFxuICAgICAgICByZWdleDogLyV9LyxcbiAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdG9rZW46IFwic3RyaW5nXCIsXG4gICAgICAgIHJlZ2V4OiAvWyddKD86KD86XFxcXC4pfCg/OlteJ1xcXFxdKSkqP1snXS9cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRva2VuOiBcInN0cmluZ1wiLFxuICAgICAgICByZWdleDogL1tcIl0oPzooPzpcXFxcLil8KD86W14nXFxcXF0pKSo/W1wiXS9cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRva2VuOiBcImNvbnN0YW50Lm51bWVyaWNcIixcbiAgICAgICAgcmVnZXg6IC8wW3hYXVswLTlhLWZBLUZdK1xcYi9cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRva2VuOiBcImNvbnN0YW50Lm51bWVyaWNcIixcbiAgICAgICAgcmVnZXg6IC9bKy1dP1xcZCsoPzooPzpcXC5cXGQqKT8oPzpbZUVdWystXT9cXGQrKT8pP1xcYi9cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRva2VuOiBcImtleXdvcmQub3BlcmF0b3JcIixcbiAgICAgICAgcmVnZXg6IC9cXCp8XFwtfFxcK3w9fCE9fFxcP1xcfFxcOi9cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRva2VuOiBcImNvbnN0YW50Lmxhbmd1YWdlLmJvb2xlYW5cIixcbiAgICAgICAgcmVnZXg6IC8oPzp0cnVlfGZhbHNlfG5pbHxlbXB0eSlcXGIvXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0b2tlbjogXCJrZXl3b3JkLm9wZXJhdG9yXCIsXG4gICAgICAgIHJlZ2V4OiAvXFxzKyg/OmFuZHxjb250YWluc3xpbnx3aXRoKVxcYlxccysvXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0b2tlbjogW1wia2V5d29yZC5vcGVyYXRvclwiLCBcInN1cHBvcnQuZnVuY3Rpb25cIl0sXG4gICAgICAgIHJlZ2V4OiAvKFxcfFxccyopKFthLXpBLVpfXSspL1xuXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0b2tlbjogXCJzdXBwb3J0LmZ1bmN0aW9uXCIsXG4gICAgICAgIHJlZ2V4OiAvXFxzKihbYS16QS1aX10rXFxiKSg/PTopL1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdG9rZW46IFwia2V5d29yZC5vcGVyYXRvclwiLFxuICAgICAgICByZWdleDpcbiAgICAgICAgICAvKDopXFxzKig/PVthLXpBLVpfXSkvXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0b2tlbjogW1xuICAgICAgICAgIFwic3VwcG9ydC5jbGFzc1wiLFxuICAgICAgICAgIFwia2V5d29yZC5vcGVyYXRvclwiLFxuICAgICAgICAgIFwic3VwcG9ydC5vYmplY3RcIixcbiAgICAgICAgICBcImtleXdvcmQub3BlcmF0b3JcIixcbiAgICAgICAgICBcInZhcmlhYmxlLnBhcmFtZXRlclwiXG4gICAgICAgIF0sXG4gICAgICAgIHJlZ2V4OiAvKFxcdyspKFxcLikoXFx3KykoXFwuKT8oXFx3Kyk/L1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdG9rZW46IFwidmFyaWFibGUucGFyYW1ldGVyXCIsXG4gICAgICAgIHJlZ2V4OiAvXFwuKFthLXpBLVpfJF1bYS16QS1aMC05XyRdKlxcYikkL1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdG9rZW46IFwic3VwcG9ydC5jbGFzc1wiLFxuICAgICAgICByZWdleDogLyg/OmFkZGl0aW9uYWxfY2hlY2tvdXRfYnV0dG9uc3xjb250ZW50X2Zvcl9hZGRpdGlvbmFsX2NoZWNrb3V0X2J1dHRvbnMpXFxiL1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdG9rZW46IFwicGFyZW4ubHBhcmVuXCIsXG4gICAgICAgIHJlZ2V4OiAvW1xcW1xcKHtdL1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdG9rZW46IFwicGFyZW4ucnBhcmVuXCIsXG4gICAgICAgIHJlZ2V4OiAvW1xcXSl9XS9cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRva2VuOiBcInRleHRcIixcbiAgICAgICAgcmVnZXg6IC9cXHMrL1xuICAgICAgfVxuICAgIF1cbiAgfSk7XG5cbiAgdGhpcy5ub3JtYWxpemVSdWxlcygpO1xuXG59O1xuXG5vb3AuaW5oZXJpdHMoTGlxdWlkSGlnaGxpZ2h0UnVsZXMsIFRleHRIaWdobGlnaHRSdWxlcyk7XG5cbmV4cG9ydHMuTGlxdWlkSGlnaGxpZ2h0UnVsZXMgPSBMaXF1aWRIaWdobGlnaHRSdWxlcztcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==