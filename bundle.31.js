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
//# sourceMappingURL=bundle.31.js.map