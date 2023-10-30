(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[31],{

/***/ 35654:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var oop = __webpack_require__(89359);
var TextMode = (__webpack_require__(98030).Mode);
var HighlightRules = (__webpack_require__(89467)/* .JsonHighlightRules */ .h);
var MatchingBraceOutdent = (__webpack_require__(1164).MatchingBraceOutdent);
var CStyleFoldMode = (__webpack_require__(12764)/* .FoldMode */ .Z);
var WorkerClient = (__webpack_require__(91451).WorkerClient);

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

/***/ 89467:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var oop = __webpack_require__(89359);
var TextHighlightRules = (__webpack_require__(28053)/* .TextHighlightRules */ .K);

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

exports.h = JsonHighlightRules;


/***/ }),

/***/ 20031:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var oop = __webpack_require__(89359);
var TextMode = (__webpack_require__(98030).Mode);
var HtmlMode = (__webpack_require__(75528).Mode);
var JavascriptMode = (__webpack_require__(88057).Mode);
var JsonMode = (__webpack_require__(35654).Mode);
var CssMode = (__webpack_require__(98771).Mode);
var LiquidHighlightRules = (__webpack_require__(71377)/* .LiquidHighlightRules */ .x);
var MatchingBraceOutdent = (__webpack_require__(1164).MatchingBraceOutdent);

/* -------------------------------------------- */
/* FOLDS                                        */
/* -------------------------------------------- */

var FoldMode = (__webpack_require__(12764)/* .FoldMode */ .Z);

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

/***/ 71377:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var oop = __webpack_require__(89359);

var TextHighlightRules = (__webpack_require__(28053)/* .TextHighlightRules */ .K);
var CssHighlightRules = (__webpack_require__(99301).CssHighlightRules);
var HtmlHighlightRules = (__webpack_require__(72843)/* .HtmlHighlightRules */ .V);
var JsonHighlightRules = (__webpack_require__(89467)/* .JsonHighlightRules */ .h);
var JavaScriptHighlightRules =  (__webpack_require__(33801)/* .JavaScriptHighlightRules */ ._);

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

exports.x = LiquidHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q2xCO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUEsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCLE9BQU87QUFDUDtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTs7QUFFQTs7QUFFQSxTQUE0QiIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvanNvbi5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2pzb25faGlnaGxpZ2h0X3J1bGVzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvbGlxdWlkLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvbGlxdWlkX2hpZ2hsaWdodF9ydWxlcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRNb2RlID0gcmVxdWlyZShcIi4vdGV4dFwiKS5Nb2RlO1xudmFyIEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vanNvbl9oaWdobGlnaHRfcnVsZXNcIikuSnNvbkhpZ2hsaWdodFJ1bGVzO1xudmFyIE1hdGNoaW5nQnJhY2VPdXRkZW50ID0gcmVxdWlyZShcIi4vbWF0Y2hpbmdfYnJhY2Vfb3V0ZGVudFwiKS5NYXRjaGluZ0JyYWNlT3V0ZGVudDtcbnZhciBDU3R5bGVGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRpbmcvY3N0eWxlXCIpLkZvbGRNb2RlO1xudmFyIFdvcmtlckNsaWVudCA9IHJlcXVpcmUoXCIuLi93b3JrZXIvd29ya2VyX2NsaWVudFwiKS5Xb3JrZXJDbGllbnQ7XG5cbnZhciBNb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5IaWdobGlnaHRSdWxlcyA9IEhpZ2hsaWdodFJ1bGVzO1xuICAgIHRoaXMuJG91dGRlbnQgPSBuZXcgTWF0Y2hpbmdCcmFjZU91dGRlbnQoKTtcbiAgICB0aGlzLiRiZWhhdmlvdXIgPSB0aGlzLiRkZWZhdWx0QmVoYXZpb3VyO1xuICAgIHRoaXMuZm9sZGluZ1J1bGVzID0gbmV3IENTdHlsZUZvbGRNb2RlKCk7XG59O1xub29wLmluaGVyaXRzKE1vZGUsIFRleHRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5saW5lQ29tbWVudFN0YXJ0ID0gXCIvL1wiO1xuICAgIHRoaXMuYmxvY2tDb21tZW50ID0ge3N0YXJ0OiBcIi8qXCIsIGVuZDogXCIqL1wifTtcbiAgICBcbiAgICB0aGlzLmdldE5leHRMaW5lSW5kZW50ID0gZnVuY3Rpb24oc3RhdGUsIGxpbmUsIHRhYikge1xuICAgICAgICB2YXIgaW5kZW50ID0gdGhpcy4kZ2V0SW5kZW50KGxpbmUpO1xuXG4gICAgICAgIGlmIChzdGF0ZSA9PSBcInN0YXJ0XCIpIHtcbiAgICAgICAgICAgIHZhciBtYXRjaCA9IGxpbmUubWF0Y2goL14uKltcXHtcXChcXFtdXFxzKiQvKTtcbiAgICAgICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgICAgIGluZGVudCArPSB0YWI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW5kZW50O1xuICAgIH07XG5cbiAgICB0aGlzLmNoZWNrT3V0ZGVudCA9IGZ1bmN0aW9uKHN0YXRlLCBsaW5lLCBpbnB1dCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kb3V0ZGVudC5jaGVja091dGRlbnQobGluZSwgaW5wdXQpO1xuICAgIH07XG5cbiAgICB0aGlzLmF1dG9PdXRkZW50ID0gZnVuY3Rpb24oc3RhdGUsIGRvYywgcm93KSB7XG4gICAgICAgIHRoaXMuJG91dGRlbnQuYXV0b091dGRlbnQoZG9jLCByb3cpO1xuICAgIH07XG5cbiAgICB0aGlzLmNyZWF0ZVdvcmtlciA9IGZ1bmN0aW9uKHNlc3Npb24pIHtcbiAgICAgICAgdmFyIHdvcmtlciA9IG5ldyBXb3JrZXJDbGllbnQoW1wiYWNlXCJdLCBcImFjZS9tb2RlL2pzb25fd29ya2VyXCIsIFwiSnNvbldvcmtlclwiKTtcbiAgICAgICAgd29ya2VyLmF0dGFjaFRvRG9jdW1lbnQoc2Vzc2lvbi5nZXREb2N1bWVudCgpKTtcblxuICAgICAgICB3b3JrZXIub24oXCJhbm5vdGF0ZVwiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBzZXNzaW9uLnNldEFubm90YXRpb25zKGUuZGF0YSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHdvcmtlci5vbihcInRlcm1pbmF0ZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNlc3Npb24uY2xlYXJBbm5vdGF0aW9ucygpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gd29ya2VyO1xuICAgIH07XG5cblxuICAgIHRoaXMuJGlkID0gXCJhY2UvbW9kZS9qc29uXCI7XG59KS5jYWxsKE1vZGUucHJvdG90eXBlKTtcblxuZXhwb3J0cy5Nb2RlID0gTW9kZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xuXG52YXIgSnNvbkhpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24oKSB7XG5cbiAgICAvLyByZWdleHAgbXVzdCBub3QgaGF2ZSBjYXB0dXJpbmcgcGFyZW50aGVzZXMuIFVzZSAoPzopIGluc3RlYWQuXG4gICAgLy8gcmVnZXhwcyBhcmUgb3JkZXJlZCAtPiB0aGUgZmlyc3QgbWF0Y2ggaXMgdXNlZFxuICAgIHRoaXMuJHJ1bGVzID0ge1xuICAgICAgICBcInN0YXJ0XCIgOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInZhcmlhYmxlXCIsIC8vIHNpbmdsZSBsaW5lXG4gICAgICAgICAgICAgICAgcmVnZXggOiAnW1wiXSg/Oig/OlxcXFxcXFxcLil8KD86W15cIlxcXFxcXFxcXSkpKj9bXCJdXFxcXHMqKD89OiknXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLCAvLyBzaW5nbGUgbGluZVxuICAgICAgICAgICAgICAgIHJlZ2V4IDogJ1wiJyxcbiAgICAgICAgICAgICAgICBuZXh0ICA6IFwic3RyaW5nXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLCAvLyBoZXhcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiMFt4WF1bMC05YS1mQS1GXStcXFxcYlwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIiwgLy8gZmxvYXRcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiWystXT9cXFxcZCsoPzooPzpcXFxcLlxcXFxkKik/KD86W2VFXVsrLV0/XFxcXGQrKT8pP1xcXFxiXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubGFuZ3VhZ2UuYm9vbGVhblwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIoPzp0cnVlfGZhbHNlKVxcXFxiXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwidGV4dFwiLCAvLyBzaW5nbGUgcXVvdGVkIHN0cmluZ3MgYXJlIG5vdCBhbGxvd2VkXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlsnXSg/Oig/OlxcXFxcXFxcLil8KD86W14nXFxcXFxcXFxdKSkqP1snXVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIiwgLy8gY29tbWVudHMgYXJlIG5vdCBhbGxvd2VkLCBidXQgd2hvIGNhcmVzP1xuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcL1xcXFwvLiokXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudC5zdGFydFwiLCAvLyBjb21tZW50cyBhcmUgbm90IGFsbG93ZWQsIGJ1dCB3aG8gY2FyZXM/XG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwvXFxcXCpcIixcbiAgICAgICAgICAgICAgICBuZXh0ICA6IFwiY29tbWVudFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInBhcmVuLmxwYXJlblwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJbWyh7XVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInBhcmVuLnJwYXJlblwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJbXFxcXF0pfV1cIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJwdW5jdHVhdGlvbi5vcGVyYXRvclwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogL1ssXS9cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxccytcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBcInN0cmluZ1wiIDogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC9cXFxcKD86eFswLTlhLWZBLUZdezJ9fHVbMC05YS1mQS1GXXs0fXxbXCJcXFxcXFwvYmZucnRdKS9cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAnXCJ8JCcsXG4gICAgICAgICAgICAgICAgbmV4dCAgOiBcInN0YXJ0XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW4gOiBcInN0cmluZ1wiXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIFwiY29tbWVudFwiIDogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50LmVuZFwiLCAvLyBjb21tZW50cyBhcmUgbm90IGFsbG93ZWQsIGJ1dCB3aG8gY2FyZXM/XG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwqXFxcXC9cIixcbiAgICAgICAgICAgICAgICBuZXh0ICA6IFwic3RhcnRcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJjb21tZW50XCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH07XG4gICAgXG59O1xuXG5vb3AuaW5oZXJpdHMoSnNvbkhpZ2hsaWdodFJ1bGVzLCBUZXh0SGlnaGxpZ2h0UnVsZXMpO1xuXG5leHBvcnRzLkpzb25IaWdobGlnaHRSdWxlcyA9IEpzb25IaWdobGlnaHRSdWxlcztcbiIsInZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0TW9kZSA9IHJlcXVpcmUoXCIuL3RleHRcIikuTW9kZTtcbnZhciBIdG1sTW9kZSA9IHJlcXVpcmUoXCIuL2h0bWxcIikuTW9kZTtcbnZhciBKYXZhc2NyaXB0TW9kZSA9IHJlcXVpcmUoXCIuL2phdmFzY3JpcHRcIikuTW9kZTtcbnZhciBKc29uTW9kZSA9IHJlcXVpcmUoXCIuL2pzb25cIikuTW9kZTtcbnZhciBDc3NNb2RlID0gcmVxdWlyZShcIi4vY3NzXCIpLk1vZGU7XG52YXIgTGlxdWlkSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9saXF1aWRfaGlnaGxpZ2h0X3J1bGVzXCIpLkxpcXVpZEhpZ2hsaWdodFJ1bGVzO1xudmFyIE1hdGNoaW5nQnJhY2VPdXRkZW50ID0gcmVxdWlyZShcIi4vbWF0Y2hpbmdfYnJhY2Vfb3V0ZGVudFwiKS5NYXRjaGluZ0JyYWNlT3V0ZGVudDtcblxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbi8qIEZPTERTICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG52YXIgRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9mb2xkaW5nL2NzdHlsZVwiKS5Gb2xkTW9kZTtcblxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbi8qIE1PREUgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuXG52YXIgTW9kZSA9IGZ1bmN0aW9uICgpIHtcblxuICBKc29uTW9kZS5jYWxsKHRoaXMpO1xuICBIdG1sTW9kZS5jYWxsKHRoaXMpO1xuICBDc3NNb2RlLmNhbGwodGhpcyk7XG4gIEphdmFzY3JpcHRNb2RlLmNhbGwodGhpcyk7XG4gIHRoaXMuSGlnaGxpZ2h0UnVsZXMgPSBMaXF1aWRIaWdobGlnaHRSdWxlcztcbiAgdGhpcy5mb2xkaW5nUnVsZXMgPSBuZXcgRm9sZE1vZGUoKTtcblxufTtcblxub29wLmluaGVyaXRzKE1vZGUsIFRleHRNb2RlKTtcblxuKGZ1bmN0aW9uICgpIHtcblxuICAgIHRoaXMuYmxvY2tDb21tZW50ID0ge3N0YXJ0OiBcIjwhLS1cIiwgZW5kOiBcIi0tPlwifTtcbiAgICB0aGlzLnZvaWRFbGVtZW50cyA9IG5ldyBIdG1sTW9kZSgpLnZvaWRFbGVtZW50cztcblxuICAgIHRoaXMuZ2V0TmV4dExpbmVJbmRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgbGluZSwgdGFiKSB7XG4gICAgICAgIHZhciBpbmRlbnQgPSB0aGlzLiRnZXRJbmRlbnQobGluZSk7XG5cbiAgICAgICAgdmFyIHRva2VuaXplZExpbmUgPSB0aGlzLmdldFRva2VuaXplcigpLmdldExpbmVUb2tlbnMobGluZSwgc3RhdGUpO1xuICAgICAgICB2YXIgdG9rZW5zID0gdG9rZW5pemVkTGluZS50b2tlbnM7XG4gICAgICAgIHZhciBlbmRTdGF0ZSA9IHRva2VuaXplZExpbmUuc3RhdGU7XG5cbiAgICAgICAgaWYgKHRva2Vucy5sZW5ndGggJiYgdG9rZW5zW3Rva2Vucy5sZW5ndGgtMV0udHlwZSA9PSBcImNvbW1lbnRcIikge1xuICAgICAgICAgICAgcmV0dXJuIGluZGVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdGF0ZSA9PSBcInN0YXJ0XCIpIHtcbiAgICAgICAgICAgIHZhciBtYXRjaCA9IGxpbmUubWF0Y2goL14uKltcXHtcXChcXFtdXFxzKiQvKTtcbiAgICAgICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgICAgIGluZGVudCArPSB0YWI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW5kZW50O1xuICAgIH07XG5cbiAgICB0aGlzLmNoZWNrT3V0ZGVudCA9IGZ1bmN0aW9uKHN0YXRlLCBsaW5lLCBpbnB1dCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kb3V0ZGVudC5jaGVja091dGRlbnQobGluZSwgaW5wdXQpO1xuICAgIH07XG5cbiAgICB0aGlzLmF1dG9PdXRkZW50ID0gZnVuY3Rpb24oc3RhdGUsIGRvYywgcm93KSB7XG4gICAgICAgIHRoaXMuJG91dGRlbnQuYXV0b091dGRlbnQoZG9jLCByb3cpO1xuICAgIH07XG5cbiAgICB0aGlzLiRpZCA9IFwiYWNlL21vZGUvbGlxdWlkXCI7XG4gICAgdGhpcy5zbmlwcGV0RmlsZUlkID0gXCJhY2Uvc25pcHBldHMvbGlxdWlkXCI7XG5cbn0uY2FsbChNb2RlLnByb3RvdHlwZSkpO1xuXG5leHBvcnRzLk1vZGUgPSBNb2RlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcblxudmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcbnZhciBDc3NIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL2Nzc19oaWdobGlnaHRfcnVsZXNcIikuQ3NzSGlnaGxpZ2h0UnVsZXM7XG52YXIgSHRtbEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vaHRtbF9oaWdobGlnaHRfcnVsZXNcIikuSHRtbEhpZ2hsaWdodFJ1bGVzO1xudmFyIEpzb25IaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL2pzb25faGlnaGxpZ2h0X3J1bGVzXCIpLkpzb25IaWdobGlnaHRSdWxlcztcbnZhciBKYXZhU2NyaXB0SGlnaGxpZ2h0UnVsZXMgPSAgcmVxdWlyZShcIi4vamF2YXNjcmlwdF9oaWdobGlnaHRfcnVsZXNcIikuSmF2YVNjcmlwdEhpZ2hsaWdodFJ1bGVzO1xuXG52YXIgTGlxdWlkSGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbiAoKSB7XG5cbiAgSHRtbEhpZ2hsaWdodFJ1bGVzLmNhbGwodGhpcyk7XG5cbiAgLyoqXG4gICAqIEVtYmVkZGVkIE1hdGNoZXNcbiAgICpcbiAgICogSGFuZGxlcyBgb25NYXRjaGAgdG9rZW5zIGFuZCBjb3JyZWN0IHBhcnNlcyB0aGVcbiAgICogaW5uZXIgY29udGVudHMgb2YgdGhlIHRhZy5cbiAgICovXG4gIGZ1bmN0aW9uIG9uTWF0Y2hFbWJlZGRlZChuYW1lKSB7XG5cbiAgICBjb25zdCBsZW5ndGggPSBuYW1lLmxlbmd0aDtcblxuICAgIHJldHVybiBmdW5jdGlvbiAodmFsdWUpIHtcblxuICAgICAgY29uc3QgaWR4ID0gdmFsdWUuaW5kZXhPZihuYW1lKTtcblxuICAgICAgY29uc3QgeCA9IFtcbiAgICAgICAge1xuICAgICAgICAgIHR5cGU6IFwibWV0YS50YWcucHVuY3R1YXRpb24udGFnLW9wZW5cIixcbiAgICAgICAgICB2YWx1ZTogXCJ7JVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0eXBlOiBcInRleHRcIixcbiAgICAgICAgICB2YWx1ZTogdmFsdWUuc2xpY2UoMiwgaWR4KVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdHlwZTogXCJrZXl3b3JkLnRhZ1wiICsgbmFtZSArIFwiLnRhZy1uYW1lXCIsXG4gICAgICAgICAgdmFsdWU6IHZhbHVlLnNsaWNlKGlkeCwgaWR4ICsgbGVuZ3RoKVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdHlwZTogXCJ0ZXh0XCIsXG4gICAgICAgICAgdmFsdWU6IHZhbHVlLnNsaWNlKGlkeCArIGxlbmd0aCwgdmFsdWUuaW5kZXhPZihcIiV9XCIpKVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdHlwZTogXCJtZXRhLnRhZy5wdW5jdHVhdGlvbi50YWctY2xvc2VcIixcbiAgICAgICAgICB2YWx1ZTogXCIlfVwiXG4gICAgICAgIH1cbiAgICAgIF07XG5cbiAgICAgIHJldHVybiB4O1xuICAgIH07XG4gIH1cblxuXG4gIGZvciAodmFyIHJ1bGUgaW4gdGhpcy4kcnVsZXMpIHtcblxuICAgIHRoaXMuJHJ1bGVzW3J1bGVdLnVuc2hpZnQoXG4gICAgICB7XG4gICAgICAgIHRva2VuOiBcImNvbW1lbnQuYmxvY2tcIixcbiAgICAgICAgcmVnZXg6IC97JS0/XFxzKmNvbW1lbnRcXHMqLT8lfS8sXG4gICAgICAgIG5leHQ6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbjogXCJjb21tZW50LmJsb2NrXCIsXG4gICAgICAgICAgICByZWdleDogL3slLT9cXHMqZW5kY29tbWVudFxccyotPyV9LyxcbiAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJjb21tZW50XCIsXG4gICAgICAgICAgICBjYXNlSW5zZW5zaXRpdmU6IGZhbHNlXG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0b2tlbjogXCJjb21tZW50LmxpbmVcIixcbiAgICAgICAgcmVnZXg6IC97JS0/XFxzKiMvLFxuICAgICAgICBuZXh0OiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdG9rZW46IFwiY29tbWVudC5saW5lXCIsXG4gICAgICAgICAgICByZWdleDogLy0/JX0vLFxuICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcImNvbW1lbnRcIixcbiAgICAgICAgICAgIGNhc2VJbnNlbnNpdGl2ZTogZmFsc2VcbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRva2VuOiAnc3R5bGUuZW1iZWRkZWQuc3RhcnQnLFxuICAgICAgICByZWdleDogLyh7JS0/XFxzKlxcYnN0eWxlXFxiXFxzKi0/JX0pLyxcbiAgICAgICAgbmV4dDogXCJzdHlsZS1zdGFydFwiLFxuICAgICAgICBvbk1hdGNoOiBvbk1hdGNoRW1iZWRkZWQoXCJzdHlsZVwiKVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcmVnZXg6IC8oeyUtP1xccypcXGJzdHlsZXNoZWV0XFxiXFxzKi0/JX0pLyxcbiAgICAgICAgbmV4dDogXCJzdHlsZXNoZWV0LXN0YXJ0XCIsXG4gICAgICAgIG9uTWF0Y2g6IG9uTWF0Y2hFbWJlZGRlZChcInN0eWxlc2hlZXRcIilcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHJlZ2V4OiAvKHslLT9cXHMqXFxic2NoZW1hXFxiXFxzKi0/JX0pLyxcbiAgICAgICAgbmV4dDogXCJzY2hlbWEtc3RhcnRcIixcbiAgICAgICAgb25NYXRjaDogb25NYXRjaEVtYmVkZGVkKFwic2NoZW1hXCIpXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICByZWdleDogLyh7JS0/XFxzKlxcYmphdmFzY3JpcHRcXGJcXHMqLT8lfSkvLFxuICAgICAgICBuZXh0OiBcImphdmFzY3JpcHQtc3RhcnRcIixcbiAgICAgICAgb25NYXRjaDogb25NYXRjaEVtYmVkZGVkKFwiamF2YXNjcmlwdFwiKVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdG9rZW46IFwibWV0YS50YWcucHVuY3R1YXRpb24udGFnLW9wZW5cIixcbiAgICAgICAgcmVnZXg6IC8oeyUpLyxcbiAgICAgICAgbmV4dDogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdG9rZW46IFwia2V5d29yZC5ibG9ja1wiLFxuICAgICAgICAgICAgICByZWdleDogLy0/XFxzKlthLXpBLVpfJF1bYS16QS1aMC05XyRdK1xcYi8sXG4gICAgICAgICAgICAgIG5leHQ6ICdsaXF1aWQtc3RhcnQnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbjogXCJtZXRhLnRhZy5wdW5jdHVhdGlvbi50YWctY2xvc2VcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvKC0/KSglfSkvLFxuICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdG9rZW46IFwibWV0YS50YWcucHVuY3R1YXRpb24ub3VwdXQtb3BlblwiLFxuICAgICAgICByZWdleDogLyh7eykvLFxuICAgICAgICBwdXNoOiBcImxpcXVpZC1zdGFydFwiXG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4gIC8qIEVNQkVEREVEIFJFR0lPTlMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4gIC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbiAgdGhpcy5lbWJlZFJ1bGVzKEpzb25IaWdobGlnaHRSdWxlcywgXCJzY2hlbWEtXCIsIFtcbiAgICB7XG4gICAgICB0b2tlbjogXCJzY2hlbWEtc3RhcnRcIixcbiAgICAgIG5leHQ6IFwicG9wXCIsXG4gICAgICByZWdleDogLyh7JS0/XFxzKlxcYmVuZHNjaGVtYVxcYlxccyotPyV9KS8sXG4gICAgICBvbk1hdGNoOiBvbk1hdGNoRW1iZWRkZWQoXCJlbmRzY2hlbWFcIilcbiAgICB9XG4gIF0pO1xuXG4gIHRoaXMuZW1iZWRSdWxlcyhKYXZhU2NyaXB0SGlnaGxpZ2h0UnVsZXMsIFwiamF2YXNjcmlwdC1cIiwgW1xuICAgIHtcbiAgICAgIHRva2VuOiBcImphdmFzY3JpcHQtc3RhcnRcIixcbiAgICAgIG5leHQ6IFwicG9wXCIsXG4gICAgICByZWdleDogLyh7JS0/XFxzKlxcYmVuZGphdmFzY3JpcHRcXGJcXHMqLT8lfSkvLFxuICAgICAgb25NYXRjaDogb25NYXRjaEVtYmVkZGVkKFwiZW5kamF2YXNjcmlwdFwiKVxuICAgIH1cbiAgXSk7XG5cblxuXG4gIHRoaXMuZW1iZWRSdWxlcyhDc3NIaWdobGlnaHRSdWxlcywgXCJzdHlsZS1cIiwgW1xuICAgIHtcbiAgICAgIHRva2VuOiBcInN0eWxlLXN0YXJ0XCIsXG4gICAgICBuZXh0OiBcInBvcFwiLFxuICAgICAgcmVnZXg6IC8oeyUtP1xccypcXGJlbmRzdHlsZVxcYlxccyotPyV9KS8sXG4gICAgICBvbk1hdGNoOiBvbk1hdGNoRW1iZWRkZWQoXCJlbmRzdHlsZVwiKVxuICAgIH1cbiAgXSk7XG5cbiAgdGhpcy5lbWJlZFJ1bGVzKENzc0hpZ2hsaWdodFJ1bGVzLCBcInN0eWxlc2hlZXQtXCIsIFtcbiAgICB7XG4gICAgICB0b2tlbjogXCJzdHlsZXNoZWV0LXN0YXJ0XCIsXG4gICAgICBuZXh0OiBcInBvcFwiLFxuICAgICAgcmVnZXg6IC8oeyUtP1xccypcXGJlbmRzdHlsZXNoZWV0XFxiXFxzKi0/JX0pLyxcbiAgICAgIG9uTWF0Y2g6IG9uTWF0Y2hFbWJlZGRlZChcImVuZHN0eWxlc2hlZXRcIilcbiAgICB9XG4gIF0pO1xuXG4gIC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4gIC8qIExJUVVJRCBHUkFNTUFSUyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG4gIC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cbiAgdGhpcy5hZGRSdWxlcyh7XG4gICAgXCJsaXF1aWQtc3RhcnRcIjogW1xuICAgICAge1xuICAgICAgICB0b2tlbjogXCJtZXRhLnRhZy5wdW5jdHVhdGlvbi5vdXB1dC1jbG9zZVwiLFxuICAgICAgICByZWdleDogL319LyxcbiAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdG9rZW46IFwibWV0YS50YWcucHVuY3R1YXRpb24udGFnLWNsb3NlXCIsXG4gICAgICAgIHJlZ2V4OiAvJX0vLFxuICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0b2tlbjogXCJzdHJpbmdcIixcbiAgICAgICAgcmVnZXg6IC9bJ10oPzooPzpcXFxcLil8KD86W14nXFxcXF0pKSo/WyddL1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdG9rZW46IFwic3RyaW5nXCIsXG4gICAgICAgIHJlZ2V4OiAvW1wiXSg/Oig/OlxcXFwuKXwoPzpbXidcXFxcXSkpKj9bXCJdL1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdG9rZW46IFwiY29uc3RhbnQubnVtZXJpY1wiLFxuICAgICAgICByZWdleDogLzBbeFhdWzAtOWEtZkEtRl0rXFxiL1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdG9rZW46IFwiY29uc3RhbnQubnVtZXJpY1wiLFxuICAgICAgICByZWdleDogL1srLV0/XFxkKyg/Oig/OlxcLlxcZCopPyg/OltlRV1bKy1dP1xcZCspPyk/XFxiL1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdG9rZW46IFwia2V5d29yZC5vcGVyYXRvclwiLFxuICAgICAgICByZWdleDogL1xcKnxcXC18XFwrfD18IT18XFw/XFx8XFw6L1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdG9rZW46IFwiY29uc3RhbnQubGFuZ3VhZ2UuYm9vbGVhblwiLFxuICAgICAgICByZWdleDogLyg/OnRydWV8ZmFsc2V8bmlsfGVtcHR5KVxcYi9cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRva2VuOiBcImtleXdvcmQub3BlcmF0b3JcIixcbiAgICAgICAgcmVnZXg6IC9cXHMrKD86YW5kfGNvbnRhaW5zfGlufHdpdGgpXFxiXFxzKy9cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRva2VuOiBbXCJrZXl3b3JkLm9wZXJhdG9yXCIsIFwic3VwcG9ydC5mdW5jdGlvblwiXSxcbiAgICAgICAgcmVnZXg6IC8oXFx8XFxzKikoW2EtekEtWl9dKykvXG5cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRva2VuOiBcInN1cHBvcnQuZnVuY3Rpb25cIixcbiAgICAgICAgcmVnZXg6IC9cXHMqKFthLXpBLVpfXStcXGIpKD89OikvXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0b2tlbjogXCJrZXl3b3JkLm9wZXJhdG9yXCIsXG4gICAgICAgIHJlZ2V4OlxuICAgICAgICAgIC8oOilcXHMqKD89W2EtekEtWl9dKS9cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRva2VuOiBbXG4gICAgICAgICAgXCJzdXBwb3J0LmNsYXNzXCIsXG4gICAgICAgICAgXCJrZXl3b3JkLm9wZXJhdG9yXCIsXG4gICAgICAgICAgXCJzdXBwb3J0Lm9iamVjdFwiLFxuICAgICAgICAgIFwia2V5d29yZC5vcGVyYXRvclwiLFxuICAgICAgICAgIFwidmFyaWFibGUucGFyYW1ldGVyXCJcbiAgICAgICAgXSxcbiAgICAgICAgcmVnZXg6IC8oXFx3KykoXFwuKShcXHcrKShcXC4pPyhcXHcrKT8vXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0b2tlbjogXCJ2YXJpYWJsZS5wYXJhbWV0ZXJcIixcbiAgICAgICAgcmVnZXg6IC9cXC4oW2EtekEtWl8kXVthLXpBLVowLTlfJF0qXFxiKSQvXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0b2tlbjogXCJzdXBwb3J0LmNsYXNzXCIsXG4gICAgICAgIHJlZ2V4OiAvKD86YWRkaXRpb25hbF9jaGVja291dF9idXR0b25zfGNvbnRlbnRfZm9yX2FkZGl0aW9uYWxfY2hlY2tvdXRfYnV0dG9ucylcXGIvXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0b2tlbjogXCJwYXJlbi5scGFyZW5cIixcbiAgICAgICAgcmVnZXg6IC9bXFxbXFwoe10vXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0b2tlbjogXCJwYXJlbi5ycGFyZW5cIixcbiAgICAgICAgcmVnZXg6IC9bXFxdKX1dL1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdG9rZW46IFwidGV4dFwiLFxuICAgICAgICByZWdleDogL1xccysvXG4gICAgICB9XG4gICAgXVxuICB9KTtcblxuICB0aGlzLm5vcm1hbGl6ZVJ1bGVzKCk7XG5cbn07XG5cbm9vcC5pbmhlcml0cyhMaXF1aWRIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuZXhwb3J0cy5MaXF1aWRIaWdobGlnaHRSdWxlcyA9IExpcXVpZEhpZ2hsaWdodFJ1bGVzO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9