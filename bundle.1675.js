(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[1675],{

/***/ 42124:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


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

/***/ 93887:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var oop = __webpack_require__(2645);
var Range = (__webpack_require__(91902)/* .Range */ .Q);
var BaseFoldMode = (__webpack_require__(51358).FoldMode);

var FoldMode = exports.l = function(commentRegex) {
    if (commentRegex) {
        this.foldingStartMarker = new RegExp(
            this.foldingStartMarker.source.replace(/\|[^|]*?$/, "|" + commentRegex.start)
        );
        this.foldingStopMarker = new RegExp(
            this.foldingStopMarker.source.replace(/\|[^|]*?$/, "|" + commentRegex.end)
        );
    }
};
oop.inherits(FoldMode, BaseFoldMode);

(function() {
    
    this.foldingStartMarker = /([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/;
    this.foldingStopMarker = /^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/;
    this.singleLineBlockCommentRe= /^\s*(\/\*).*\*\/\s*$/;
    this.tripleStarBlockCommentRe = /^\s*(\/\*\*\*).*\*\/\s*$/;
    this.startRegionRe = /^\s*(\/\*|\/\/)#?region\b/;
    
    //prevent naming conflict with any modes that inherit from cstyle and override this (like csharp)
    this._getFoldWidgetBase = this.getFoldWidget;
    
    /**
     * Gets fold widget with some non-standard extras:
     *
     * @example lineCommentRegionStart
     *      //#region [optional description]
     *
     * @example blockCommentRegionStart
     *      /*#region [optional description] *[/]
     *
     * @example tripleStarFoldingSection
     *      /*** this folds even though 1 line because it has 3 stars ***[/]
     * 
     * @note the pound symbol for region tags is optional
     */
    this.getFoldWidget = function(session, foldStyle, row) {
        var line = session.getLine(row);
    
        if (this.singleLineBlockCommentRe.test(line)) {
            // No widget for single line block comment unless region or triple star
            if (!this.startRegionRe.test(line) && !this.tripleStarBlockCommentRe.test(line))
                return "";
        }
    
        var fw = this._getFoldWidgetBase(session, foldStyle, row);
    
        if (!fw && this.startRegionRe.test(line))
            return "start"; // lineCommentRegionStart
    
        return fw;
    };

    this.getFoldWidgetRange = function(session, foldStyle, row, forceMultiline) {
        var line = session.getLine(row);
        
        if (this.startRegionRe.test(line))
            return this.getCommentRegionBlock(session, line, row);
        
        var match = line.match(this.foldingStartMarker);
        if (match) {
            var i = match.index;

            if (match[1])
                return this.openingBracketBlock(session, match[1], row, i);
                
            var range = session.getCommentFoldRange(row, i + match[0].length, 1);
            
            if (range && !range.isMultiLine()) {
                if (forceMultiline) {
                    range = this.getSectionRange(session, row);
                } else if (foldStyle != "all")
                    range = null;
            }
            
            return range;
        }

        if (foldStyle === "markbegin")
            return;

        var match = line.match(this.foldingStopMarker);
        if (match) {
            var i = match.index + match[0].length;

            if (match[1])
                return this.closingBracketBlock(session, match[1], row, i);

            return session.getCommentFoldRange(row, i, -1);
        }
    };
    
    this.getSectionRange = function(session, row) {
        var line = session.getLine(row);
        var startIndent = line.search(/\S/);
        var startRow = row;
        var startColumn = line.length;
        row = row + 1;
        var endRow = row;
        var maxRow = session.getLength();
        while (++row < maxRow) {
            line = session.getLine(row);
            var indent = line.search(/\S/);
            if (indent === -1)
                continue;
            if  (startIndent > indent)
                break;
            var subRange = this.getFoldWidgetRange(session, "all", row);
            
            if (subRange) {
                if (subRange.start.row <= startRow) {
                    break;
                } else if (subRange.isMultiLine()) {
                    row = subRange.end.row;
                } else if (startIndent == indent) {
                    break;
                }
            }
            endRow = row;
        }
        
        return new Range(startRow, startColumn, endRow, session.getLine(endRow).length);
    };
    
    /**
     * gets comment region block with end region assumed to be start of comment in any cstyle mode or SQL mode (--) which inherits from this.
     * There may optionally be a pound symbol before the region/endregion statement
     */
    this.getCommentRegionBlock = function(session, line, row) {
        var startColumn = line.search(/\s*$/);
        var maxRow = session.getLength();
        var startRow = row;
        
        var re = /^\s*(?:\/\*|\/\/|--)#?(end)?region\b/;
        var depth = 1;
        while (++row < maxRow) {
            line = session.getLine(row);
            var m = re.exec(line);
            if (!m) continue;
            if (m[1]) depth--;
            else depth++;

            if (!depth) break;
        }

        var endRow = row;
        if (endRow > startRow) {
            return new Range(startRow, startColumn, endRow, line.length);
        }
    };

}).call(FoldMode.prototype);


/***/ }),

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

/***/ 91675:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var OdinHighlightRules =
  (__webpack_require__(42304)/* .OdinHighlightRules */ .G);
var MatchingBraceOutdent =
  (__webpack_require__(28670).MatchingBraceOutdent);
var CStyleFoldMode = (__webpack_require__(93887)/* .FoldMode */ .l);

var Mode = function () {
  this.HighlightRules = OdinHighlightRules;
  this.$outdent = new MatchingBraceOutdent();
  this.foldingRules = new CStyleFoldMode();
  this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, TextMode);

(function () {
  this.lineCommentStart = "//";
  this.blockComment = { start: "/*", end: "*/" };

  this.getNextLineIndent = function (state, line, tab) {
    var indent = this.$getIndent(line);

    var tokenizedLine = this.getTokenizer().getLineTokens(line, state);
    var tokens = tokenizedLine.tokens;

    if (tokens.length && tokens[tokens.length - 1].type == "comment") {
      return indent;
    }

    if (state == "start") {
      var match = line.match(/^.*[\{\(\[:]\s*$/);
      if (match) {
        indent += tab;
      }
    }

    return indent;
  }; //end getNextLineIndent

  this.checkOutdent = function (state, line, input) {
    return this.$outdent.checkOutdent(line, input);
  };

  this.autoOutdent = function (state, doc, row) {
    this.$outdent.autoOutdent(doc, row);
  };

  this.$id = "ace/mode/odin";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 42304:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var oop = __webpack_require__(2645);
var DocCommentHighlightRules =
  (__webpack_require__(42124)/* .DocCommentHighlightRules */ .l);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

var OdinHighlightRules = function () {
  var keywords =
    "using|transmute|cast|distinct|opaque|where|" +
    "struct|enum|union|bit_field|bit_set|" +
    "if|when|else|do|switch|case|break|fallthrough|" +
    "size_of|offset_of|type_info_if|typeid_of|type_of|align_of|" +
    "or_return|or_else|inline|no_inline|" +
    "import|package|foreign|defer|auto_cast|map|matrix|proc|" +
    "for|continue|not_in|in";

  const cartesian = (...a) =>
    a
      .reduce((a, b) => a.flatMap((d) => b.map((e) => [d, e].flat())))
      .map((parts) => parts.join(""));

  var builtinTypes = [
    "int",
    "uint",
    "uintptr",
    "typeid",
    "rawptr",
    "string",
    "cstring",
    "i8",
    "u8",
    "any",
    "byte",
    "rune",
    "bool",
    "b8",
    "b16",
    "b32",
    "b64",
    ...cartesian(["i", "u"], ["16", "32", "64", "128"], ["", "le", "be"]),
    ...cartesian(["f"], ["16", "32", "64"], ["", "le", "be"]),
    ...cartesian(["complex"], ["32", "64", "128"]),
    ...cartesian(["quaternion"], ["64", "128", "256"])
  ].join("|");

  var operators = [
    "\\*",
    "/",
    "%",
    "%%",
    "<<",
    ">>",
    "&",
    "&~",
    "\\+",
    "\\-",
    "~",
    "\\|",
    ">",
    "<",
    "<=",
    ">=",
    "==",
    "!="
  ]
    .concat(":")
    .map((operator) => operator + "=")
    .concat("=", ":=", "::", "->", "\\^", "&", ":")
    .join("|");

  var builtinFunctions = "new|cap|copy|panic|len|make|delete|append|free";
  var builtinConstants = "nil|true|false";

  var keywordMapper = this.createKeywordMapper(
    {
      keyword: keywords,
      "constant.language": builtinConstants,
      "support.function": builtinFunctions,
      "support.type": builtinTypes
    },
    ""
  );

  var stringEscapeRe =
    "\\\\(?:[0-7]{3}|x\\h{2}|u{4}|U\\h{6}|[abfnrtv'\"\\\\])".replace(
      /\\h/g,
      "[a-fA-F\\d]"
    );

  this.$rules = {
    start: [
      {
        token: "comment",
        regex: /\/\/.*$/
      },
      DocCommentHighlightRules.getStartRule("doc-start"),
      {
        token: "comment.start", // multi line comment
        regex: "\\/\\*",
        next: "comment"
      },
      {
        token: "string", // single line
        regex: /"(?:[^"\\]|\\.)*?"/
      },
      {
        token: "string", // raw
        regex: "`",
        next: "bqstring"
      },
      {
        token: "support.constant",
        regex: /#[a-z_]+/
      },
      {
        token: "constant.numeric", // rune
        regex:
          "'(?:[^\\'\uD800-\uDBFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|" +
          stringEscapeRe.replace('"', "") +
          ")'"
      },
      {
        token: "constant.numeric", // hex
        regex: "0[xX][0-9a-fA-F]+\\b"
      },
      {
        token: "constant.numeric", // float
        regex: "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
      },
      {
        token: [
          "entity.name.function",
          "text",
          "keyword.operator",
          "text",
          "keyword"
        ],
        regex: "([a-zA-Z_$][a-zA-Z0-9_$]*)(\\s+)(::)(\\s+)(proc)\\b"
      },
      {
        token: function (val) {
          if (val[val.length - 1] == "(") {
            return [
              {
                type: keywordMapper(val.slice(0, -1)) || "support.function",
                value: val.slice(0, -1)
              },
              {
                type: "paren.lparen",
                value: val.slice(-1)
              }
            ];
          }

          return keywordMapper(val) || "identifier";
        },
        regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b\\(?"
      },
      {
        token: "keyword.operator",
        regex: operators
      },
      {
        token: "punctuation.operator",
        regex: "\\?|\\,|\\;|\\."
      },
      {
        token: "paren.lparen",
        regex: "[[({]"
      },
      {
        token: "paren.rparen",
        regex: "[\\])}]"
      },
      {
        token: "text",
        regex: "\\s+"
      }
    ],
    comment: [
      {
        token: "comment.end",
        regex: "\\*\\/",
        next: "start"
      },
      {
        defaultToken: "comment"
      }
    ],
    bqstring: [
      {
        token: "string",
        regex: "`",
        next: "start"
      },
      {
        defaultToken: "string"
      }
    ]
  };

  this.embedRules(DocCommentHighlightRules, "doc-", [
    DocCommentHighlightRules.getEndRule("start")
  ]);
};
oop.inherits(OdinHighlightRules, TextHighlightRules);

exports.G = OdinHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjE2NzUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLElBQVk7QUFDOUIseUJBQXlCLHdEQUFvRDs7QUFFN0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBLFNBQWdDOzs7Ozs7Ozs7QUM3Q25COztBQUViLFVBQVUsbUJBQU8sQ0FBQyxJQUFlO0FBQ2pDLFlBQVksMkNBQTRCO0FBQ3hDLG1CQUFtQixxQ0FBK0I7O0FBRWxELGVBQWUsU0FBZ0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1DQUFtQyxVQUFVO0FBQzdDLHFDQUFxQyxRQUFRO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QjtBQUM1QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDOzs7Ozs7Ozs7QUM5Slk7O0FBRWIsWUFBWSwyQ0FBeUI7O0FBRXJDOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxzQkFBc0I7QUFDdEI7O0FBRUE7QUFDQTtBQUNBLHVDQUF1Qzs7QUFFdkM7O0FBRUE7QUFDQSxvREFBb0QseUJBQXlCOztBQUU3RTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLENBQUM7O0FBRUQsNEJBQTRCOzs7Ozs7OztBQ3BDNUIsVUFBVSxtQkFBTyxDQUFDLElBQVk7QUFDOUIsZUFBZSxpQ0FBc0I7QUFDckM7QUFDQSxFQUFFLHdEQUFvRDtBQUN0RDtBQUNBLEVBQUUsaURBQXdEO0FBQzFELHFCQUFxQiw4Q0FBb0M7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx3QkFBd0I7O0FBRXhCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvQ0FBb0M7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVELFlBQVk7Ozs7Ozs7O0FDbkRaLFVBQVUsbUJBQU8sQ0FBQyxJQUFZO0FBQzlCO0FBQ0EsRUFBRSw4REFBaUU7QUFDbkUseUJBQXlCLHdEQUFvRDs7QUFFN0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQSxrQkFBa0IsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRTtBQUN6QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVM7QUFDVDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLDJCQUEyQjtBQUMzQixPQUFPO0FBQ1A7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQixPQUFPO0FBQ1A7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QixPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUEwQiIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvZG9jX2NvbW1lbnRfaGlnaGxpZ2h0X3J1bGVzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvZm9sZGluZy9jc3R5bGUuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9tYXRjaGluZ19icmFjZV9vdXRkZW50LmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvb2Rpbi5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL29kaW5faGlnaGxpZ2h0X3J1bGVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xuXG52YXIgRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuJHJ1bGVzID0ge1xuICAgICAgICBcInN0YXJ0XCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJjb21tZW50LmRvYy50YWdcIixcbiAgICAgICAgICAgICAgICByZWdleDogXCJAXFxcXHcrKD89XFxcXHN8JClcIlxuICAgICAgICAgICAgfSwgRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLmdldFRhZ1J1bGUoKSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJjb21tZW50LmRvYy5ib2R5XCIsXG4gICAgICAgICAgICAgICAgY2FzZUluc2Vuc2l0aXZlOiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9O1xufTtcblxub29wLmluaGVyaXRzKERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLmdldFRhZ1J1bGUgPSBmdW5jdGlvbihzdGFydCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHRva2VuIDogXCJjb21tZW50LmRvYy50YWcuc3RvcmFnZS50eXBlXCIsXG4gICAgICAgIHJlZ2V4IDogXCJcXFxcYig/OlRPRE98RklYTUV8WFhYfEhBQ0spXFxcXGJcIlxuICAgIH07XG59O1xuXG5Eb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMuZ2V0U3RhcnRSdWxlID0gZnVuY3Rpb24oc3RhcnQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0b2tlbiA6IFwiY29tbWVudC5kb2NcIiwgLy8gZG9jIGNvbW1lbnRcbiAgICAgICAgcmVnZXg6IC9cXC9cXCpcXCooPyFcXC8pLyxcbiAgICAgICAgbmV4dCAgOiBzdGFydFxuICAgIH07XG59O1xuXG5Eb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMuZ2V0RW5kUnVsZSA9IGZ1bmN0aW9uIChzdGFydCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHRva2VuIDogXCJjb21tZW50LmRvY1wiLCAvLyBjbG9zaW5nIGNvbW1lbnRcbiAgICAgICAgcmVnZXggOiBcIlxcXFwqXFxcXC9cIixcbiAgICAgICAgbmV4dCAgOiBzdGFydFxuICAgIH07XG59O1xuXG5cbmV4cG9ydHMuRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzID0gRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vLi4vbGliL29vcFwiKTtcbnZhciBSYW5nZSA9IHJlcXVpcmUoXCIuLi8uLi9yYW5nZVwiKS5SYW5nZTtcbnZhciBCYXNlRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9mb2xkX21vZGVcIikuRm9sZE1vZGU7XG5cbnZhciBGb2xkTW9kZSA9IGV4cG9ydHMuRm9sZE1vZGUgPSBmdW5jdGlvbihjb21tZW50UmVnZXgpIHtcbiAgICBpZiAoY29tbWVudFJlZ2V4KSB7XG4gICAgICAgIHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyID0gbmV3IFJlZ0V4cChcbiAgICAgICAgICAgIHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyLnNvdXJjZS5yZXBsYWNlKC9cXHxbXnxdKj8kLywgXCJ8XCIgKyBjb21tZW50UmVnZXguc3RhcnQpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIgPSBuZXcgUmVnRXhwKFxuICAgICAgICAgICAgdGhpcy5mb2xkaW5nU3RvcE1hcmtlci5zb3VyY2UucmVwbGFjZSgvXFx8W158XSo/JC8sIFwifFwiICsgY29tbWVudFJlZ2V4LmVuZClcbiAgICAgICAgKTtcbiAgICB9XG59O1xub29wLmluaGVyaXRzKEZvbGRNb2RlLCBCYXNlRm9sZE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgXG4gICAgdGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIgPSAvKFtcXHtcXFtcXChdKVteXFx9XFxdXFwpXSokfF5cXHMqKFxcL1xcKikvO1xuICAgIHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIgPSAvXlteXFxbXFx7XFwoXSooW1xcfVxcXVxcKV0pfF5bXFxzXFwqXSooXFwqXFwvKS87XG4gICAgdGhpcy5zaW5nbGVMaW5lQmxvY2tDb21tZW50UmU9IC9eXFxzKihcXC9cXCopLipcXCpcXC9cXHMqJC87XG4gICAgdGhpcy50cmlwbGVTdGFyQmxvY2tDb21tZW50UmUgPSAvXlxccyooXFwvXFwqXFwqXFwqKS4qXFwqXFwvXFxzKiQvO1xuICAgIHRoaXMuc3RhcnRSZWdpb25SZSA9IC9eXFxzKihcXC9cXCp8XFwvXFwvKSM/cmVnaW9uXFxiLztcbiAgICBcbiAgICAvL3ByZXZlbnQgbmFtaW5nIGNvbmZsaWN0IHdpdGggYW55IG1vZGVzIHRoYXQgaW5oZXJpdCBmcm9tIGNzdHlsZSBhbmQgb3ZlcnJpZGUgdGhpcyAobGlrZSBjc2hhcnApXG4gICAgdGhpcy5fZ2V0Rm9sZFdpZGdldEJhc2UgPSB0aGlzLmdldEZvbGRXaWRnZXQ7XG4gICAgXG4gICAgLyoqXG4gICAgICogR2V0cyBmb2xkIHdpZGdldCB3aXRoIHNvbWUgbm9uLXN0YW5kYXJkIGV4dHJhczpcbiAgICAgKlxuICAgICAqIEBleGFtcGxlIGxpbmVDb21tZW50UmVnaW9uU3RhcnRcbiAgICAgKiAgICAgIC8vI3JlZ2lvbiBbb3B0aW9uYWwgZGVzY3JpcHRpb25dXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSBibG9ja0NvbW1lbnRSZWdpb25TdGFydFxuICAgICAqICAgICAgLyojcmVnaW9uIFtvcHRpb25hbCBkZXNjcmlwdGlvbl0gKlsvXVxuICAgICAqXG4gICAgICogQGV4YW1wbGUgdHJpcGxlU3RhckZvbGRpbmdTZWN0aW9uXG4gICAgICogICAgICAvKioqIHRoaXMgZm9sZHMgZXZlbiB0aG91Z2ggMSBsaW5lIGJlY2F1c2UgaXQgaGFzIDMgc3RhcnMgKioqWy9dXG4gICAgICogXG4gICAgICogQG5vdGUgdGhlIHBvdW5kIHN5bWJvbCBmb3IgcmVnaW9uIHRhZ3MgaXMgb3B0aW9uYWxcbiAgICAgKi9cbiAgICB0aGlzLmdldEZvbGRXaWRnZXQgPSBmdW5jdGlvbihzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdykge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgIFxuICAgICAgICBpZiAodGhpcy5zaW5nbGVMaW5lQmxvY2tDb21tZW50UmUudGVzdChsaW5lKSkge1xuICAgICAgICAgICAgLy8gTm8gd2lkZ2V0IGZvciBzaW5nbGUgbGluZSBibG9jayBjb21tZW50IHVubGVzcyByZWdpb24gb3IgdHJpcGxlIHN0YXJcbiAgICAgICAgICAgIGlmICghdGhpcy5zdGFydFJlZ2lvblJlLnRlc3QobGluZSkgJiYgIXRoaXMudHJpcGxlU3RhckJsb2NrQ29tbWVudFJlLnRlc3QobGluZSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgdmFyIGZ3ID0gdGhpcy5fZ2V0Rm9sZFdpZGdldEJhc2Uoc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpO1xuICAgIFxuICAgICAgICBpZiAoIWZ3ICYmIHRoaXMuc3RhcnRSZWdpb25SZS50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgcmV0dXJuIFwic3RhcnRcIjsgLy8gbGluZUNvbW1lbnRSZWdpb25TdGFydFxuICAgIFxuICAgICAgICByZXR1cm4gZnc7XG4gICAgfTtcblxuICAgIHRoaXMuZ2V0Rm9sZFdpZGdldFJhbmdlID0gZnVuY3Rpb24oc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3csIGZvcmNlTXVsdGlsaW5lKSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5zdGFydFJlZ2lvblJlLnRlc3QobGluZSkpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRDb21tZW50UmVnaW9uQmxvY2soc2Vzc2lvbiwgbGluZSwgcm93KTtcbiAgICAgICAgXG4gICAgICAgIHZhciBtYXRjaCA9IGxpbmUubWF0Y2godGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIpO1xuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIHZhciBpID0gbWF0Y2guaW5kZXg7XG5cbiAgICAgICAgICAgIGlmIChtYXRjaFsxXSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5vcGVuaW5nQnJhY2tldEJsb2NrKHNlc3Npb24sIG1hdGNoWzFdLCByb3csIGkpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIHJhbmdlID0gc2Vzc2lvbi5nZXRDb21tZW50Rm9sZFJhbmdlKHJvdywgaSArIG1hdGNoWzBdLmxlbmd0aCwgMSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChyYW5nZSAmJiAhcmFuZ2UuaXNNdWx0aUxpbmUoKSkge1xuICAgICAgICAgICAgICAgIGlmIChmb3JjZU11bHRpbGluZSkge1xuICAgICAgICAgICAgICAgICAgICByYW5nZSA9IHRoaXMuZ2V0U2VjdGlvblJhbmdlKHNlc3Npb24sIHJvdyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChmb2xkU3R5bGUgIT0gXCJhbGxcIilcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2UgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gcmFuZ2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZm9sZFN0eWxlID09PSBcIm1hcmtiZWdpblwiKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHZhciBtYXRjaCA9IGxpbmUubWF0Y2godGhpcy5mb2xkaW5nU3RvcE1hcmtlcik7XG4gICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgdmFyIGkgPSBtYXRjaC5pbmRleCArIG1hdGNoWzBdLmxlbmd0aDtcblxuICAgICAgICAgICAgaWYgKG1hdGNoWzFdKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNsb3NpbmdCcmFja2V0QmxvY2soc2Vzc2lvbiwgbWF0Y2hbMV0sIHJvdywgaSk7XG5cbiAgICAgICAgICAgIHJldHVybiBzZXNzaW9uLmdldENvbW1lbnRGb2xkUmFuZ2Uocm93LCBpLCAtMSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFxuICAgIHRoaXMuZ2V0U2VjdGlvblJhbmdlID0gZnVuY3Rpb24oc2Vzc2lvbiwgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgIHZhciBzdGFydEluZGVudCA9IGxpbmUuc2VhcmNoKC9cXFMvKTtcbiAgICAgICAgdmFyIHN0YXJ0Um93ID0gcm93O1xuICAgICAgICB2YXIgc3RhcnRDb2x1bW4gPSBsaW5lLmxlbmd0aDtcbiAgICAgICAgcm93ID0gcm93ICsgMTtcbiAgICAgICAgdmFyIGVuZFJvdyA9IHJvdztcbiAgICAgICAgdmFyIG1heFJvdyA9IHNlc3Npb24uZ2V0TGVuZ3RoKCk7XG4gICAgICAgIHdoaWxlICgrK3JvdyA8IG1heFJvdykge1xuICAgICAgICAgICAgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICAgICAgdmFyIGluZGVudCA9IGxpbmUuc2VhcmNoKC9cXFMvKTtcbiAgICAgICAgICAgIGlmIChpbmRlbnQgPT09IC0xKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgaWYgIChzdGFydEluZGVudCA+IGluZGVudClcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIHZhciBzdWJSYW5nZSA9IHRoaXMuZ2V0Rm9sZFdpZGdldFJhbmdlKHNlc3Npb24sIFwiYWxsXCIsIHJvdyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChzdWJSYW5nZSkge1xuICAgICAgICAgICAgICAgIGlmIChzdWJSYW5nZS5zdGFydC5yb3cgPD0gc3RhcnRSb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzdWJSYW5nZS5pc011bHRpTGluZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJvdyA9IHN1YlJhbmdlLmVuZC5yb3c7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzdGFydEluZGVudCA9PSBpbmRlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZW5kUm93ID0gcm93O1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gbmV3IFJhbmdlKHN0YXJ0Um93LCBzdGFydENvbHVtbiwgZW5kUm93LCBzZXNzaW9uLmdldExpbmUoZW5kUm93KS5sZW5ndGgpO1xuICAgIH07XG4gICAgXG4gICAgLyoqXG4gICAgICogZ2V0cyBjb21tZW50IHJlZ2lvbiBibG9jayB3aXRoIGVuZCByZWdpb24gYXNzdW1lZCB0byBiZSBzdGFydCBvZiBjb21tZW50IGluIGFueSBjc3R5bGUgbW9kZSBvciBTUUwgbW9kZSAoLS0pIHdoaWNoIGluaGVyaXRzIGZyb20gdGhpcy5cbiAgICAgKiBUaGVyZSBtYXkgb3B0aW9uYWxseSBiZSBhIHBvdW5kIHN5bWJvbCBiZWZvcmUgdGhlIHJlZ2lvbi9lbmRyZWdpb24gc3RhdGVtZW50XG4gICAgICovXG4gICAgdGhpcy5nZXRDb21tZW50UmVnaW9uQmxvY2sgPSBmdW5jdGlvbihzZXNzaW9uLCBsaW5lLCByb3cpIHtcbiAgICAgICAgdmFyIHN0YXJ0Q29sdW1uID0gbGluZS5zZWFyY2goL1xccyokLyk7XG4gICAgICAgIHZhciBtYXhSb3cgPSBzZXNzaW9uLmdldExlbmd0aCgpO1xuICAgICAgICB2YXIgc3RhcnRSb3cgPSByb3c7XG4gICAgICAgIFxuICAgICAgICB2YXIgcmUgPSAvXlxccyooPzpcXC9cXCp8XFwvXFwvfC0tKSM/KGVuZCk/cmVnaW9uXFxiLztcbiAgICAgICAgdmFyIGRlcHRoID0gMTtcbiAgICAgICAgd2hpbGUgKCsrcm93IDwgbWF4Um93KSB7XG4gICAgICAgICAgICBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgICAgICB2YXIgbSA9IHJlLmV4ZWMobGluZSk7XG4gICAgICAgICAgICBpZiAoIW0pIGNvbnRpbnVlO1xuICAgICAgICAgICAgaWYgKG1bMV0pIGRlcHRoLS07XG4gICAgICAgICAgICBlbHNlIGRlcHRoKys7XG5cbiAgICAgICAgICAgIGlmICghZGVwdGgpIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGVuZFJvdyA9IHJvdztcbiAgICAgICAgaWYgKGVuZFJvdyA+IHN0YXJ0Um93KSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFJhbmdlKHN0YXJ0Um93LCBzdGFydENvbHVtbiwgZW5kUm93LCBsaW5lLmxlbmd0aCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG59KS5jYWxsKEZvbGRNb2RlLnByb3RvdHlwZSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIFJhbmdlID0gcmVxdWlyZShcIi4uL3JhbmdlXCIpLlJhbmdlO1xuXG52YXIgTWF0Y2hpbmdCcmFjZU91dGRlbnQgPSBmdW5jdGlvbigpIHt9O1xuXG4oZnVuY3Rpb24oKSB7XG5cbiAgICB0aGlzLmNoZWNrT3V0ZGVudCA9IGZ1bmN0aW9uKGxpbmUsIGlucHV0KSB7XG4gICAgICAgIGlmICghIC9eXFxzKyQvLnRlc3QobGluZSkpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgcmV0dXJuIC9eXFxzKlxcfS8udGVzdChpbnB1dCk7XG4gICAgfTtcblxuICAgIHRoaXMuYXV0b091dGRlbnQgPSBmdW5jdGlvbihkb2MsIHJvdykge1xuICAgICAgICB2YXIgbGluZSA9IGRvYy5nZXRMaW5lKHJvdyk7XG4gICAgICAgIHZhciBtYXRjaCA9IGxpbmUubWF0Y2goL14oXFxzKlxcfSkvKTtcblxuICAgICAgICBpZiAoIW1hdGNoKSByZXR1cm4gMDtcblxuICAgICAgICB2YXIgY29sdW1uID0gbWF0Y2hbMV0ubGVuZ3RoO1xuICAgICAgICB2YXIgb3BlbkJyYWNlUG9zID0gZG9jLmZpbmRNYXRjaGluZ0JyYWNrZXQoe3Jvdzogcm93LCBjb2x1bW46IGNvbHVtbn0pO1xuXG4gICAgICAgIGlmICghb3BlbkJyYWNlUG9zIHx8IG9wZW5CcmFjZVBvcy5yb3cgPT0gcm93KSByZXR1cm4gMDtcblxuICAgICAgICB2YXIgaW5kZW50ID0gdGhpcy4kZ2V0SW5kZW50KGRvYy5nZXRMaW5lKG9wZW5CcmFjZVBvcy5yb3cpKTtcbiAgICAgICAgZG9jLnJlcGxhY2UobmV3IFJhbmdlKHJvdywgMCwgcm93LCBjb2x1bW4tMSksIGluZGVudCk7XG4gICAgfTtcblxuICAgIHRoaXMuJGdldEluZGVudCA9IGZ1bmN0aW9uKGxpbmUpIHtcbiAgICAgICAgcmV0dXJuIGxpbmUubWF0Y2goL15cXHMqLylbMF07XG4gICAgfTtcblxufSkuY2FsbChNYXRjaGluZ0JyYWNlT3V0ZGVudC5wcm90b3R5cGUpO1xuXG5leHBvcnRzLk1hdGNoaW5nQnJhY2VPdXRkZW50ID0gTWF0Y2hpbmdCcmFjZU91dGRlbnQ7XG4iLCJ2YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dE1vZGUgPSByZXF1aXJlKFwiLi90ZXh0XCIpLk1vZGU7XG52YXIgT2RpbkhpZ2hsaWdodFJ1bGVzID1cbiAgcmVxdWlyZShcIi4vb2Rpbl9oaWdobGlnaHRfcnVsZXNcIikuT2RpbkhpZ2hsaWdodFJ1bGVzO1xudmFyIE1hdGNoaW5nQnJhY2VPdXRkZW50ID1cbiAgcmVxdWlyZShcIi4vbWF0Y2hpbmdfYnJhY2Vfb3V0ZGVudFwiKS5NYXRjaGluZ0JyYWNlT3V0ZGVudDtcbnZhciBDU3R5bGVGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRpbmcvY3N0eWxlXCIpLkZvbGRNb2RlO1xuXG52YXIgTW9kZSA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5IaWdobGlnaHRSdWxlcyA9IE9kaW5IaWdobGlnaHRSdWxlcztcbiAgdGhpcy4kb3V0ZGVudCA9IG5ldyBNYXRjaGluZ0JyYWNlT3V0ZGVudCgpO1xuICB0aGlzLmZvbGRpbmdSdWxlcyA9IG5ldyBDU3R5bGVGb2xkTW9kZSgpO1xuICB0aGlzLiRiZWhhdmlvdXIgPSB0aGlzLiRkZWZhdWx0QmVoYXZpb3VyO1xufTtcbm9vcC5pbmhlcml0cyhNb2RlLCBUZXh0TW9kZSk7XG5cbihmdW5jdGlvbiAoKSB7XG4gIHRoaXMubGluZUNvbW1lbnRTdGFydCA9IFwiLy9cIjtcbiAgdGhpcy5ibG9ja0NvbW1lbnQgPSB7IHN0YXJ0OiBcIi8qXCIsIGVuZDogXCIqL1wiIH07XG5cbiAgdGhpcy5nZXROZXh0TGluZUluZGVudCA9IGZ1bmN0aW9uIChzdGF0ZSwgbGluZSwgdGFiKSB7XG4gICAgdmFyIGluZGVudCA9IHRoaXMuJGdldEluZGVudChsaW5lKTtcblxuICAgIHZhciB0b2tlbml6ZWRMaW5lID0gdGhpcy5nZXRUb2tlbml6ZXIoKS5nZXRMaW5lVG9rZW5zKGxpbmUsIHN0YXRlKTtcbiAgICB2YXIgdG9rZW5zID0gdG9rZW5pemVkTGluZS50b2tlbnM7XG5cbiAgICBpZiAodG9rZW5zLmxlbmd0aCAmJiB0b2tlbnNbdG9rZW5zLmxlbmd0aCAtIDFdLnR5cGUgPT0gXCJjb21tZW50XCIpIHtcbiAgICAgIHJldHVybiBpbmRlbnQ7XG4gICAgfVxuXG4gICAgaWYgKHN0YXRlID09IFwic3RhcnRcIikge1xuICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCgvXi4qW1xce1xcKFxcWzpdXFxzKiQvKTtcbiAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICBpbmRlbnQgKz0gdGFiO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBpbmRlbnQ7XG4gIH07IC8vZW5kIGdldE5leHRMaW5lSW5kZW50XG5cbiAgdGhpcy5jaGVja091dGRlbnQgPSBmdW5jdGlvbiAoc3RhdGUsIGxpbmUsIGlucHV0KSB7XG4gICAgcmV0dXJuIHRoaXMuJG91dGRlbnQuY2hlY2tPdXRkZW50KGxpbmUsIGlucHV0KTtcbiAgfTtcblxuICB0aGlzLmF1dG9PdXRkZW50ID0gZnVuY3Rpb24gKHN0YXRlLCBkb2MsIHJvdykge1xuICAgIHRoaXMuJG91dGRlbnQuYXV0b091dGRlbnQoZG9jLCByb3cpO1xuICB9O1xuXG4gIHRoaXMuJGlkID0gXCJhY2UvbW9kZS9vZGluXCI7XG59KS5jYWxsKE1vZGUucHJvdG90eXBlKTtcblxuZXhwb3J0cy5Nb2RlID0gTW9kZTtcbiIsInZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMgPVxuICByZXF1aXJlKFwiLi9kb2NfY29tbWVudF9oaWdobGlnaHRfcnVsZXNcIikuRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzO1xudmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcblxudmFyIE9kaW5IaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGtleXdvcmRzID1cbiAgICBcInVzaW5nfHRyYW5zbXV0ZXxjYXN0fGRpc3RpbmN0fG9wYXF1ZXx3aGVyZXxcIiArXG4gICAgXCJzdHJ1Y3R8ZW51bXx1bmlvbnxiaXRfZmllbGR8Yml0X3NldHxcIiArXG4gICAgXCJpZnx3aGVufGVsc2V8ZG98c3dpdGNofGNhc2V8YnJlYWt8ZmFsbHRocm91Z2h8XCIgK1xuICAgIFwic2l6ZV9vZnxvZmZzZXRfb2Z8dHlwZV9pbmZvX2lmfHR5cGVpZF9vZnx0eXBlX29mfGFsaWduX29mfFwiICtcbiAgICBcIm9yX3JldHVybnxvcl9lbHNlfGlubGluZXxub19pbmxpbmV8XCIgK1xuICAgIFwiaW1wb3J0fHBhY2thZ2V8Zm9yZWlnbnxkZWZlcnxhdXRvX2Nhc3R8bWFwfG1hdHJpeHxwcm9jfFwiICtcbiAgICBcImZvcnxjb250aW51ZXxub3RfaW58aW5cIjtcblxuICBjb25zdCBjYXJ0ZXNpYW4gPSAoLi4uYSkgPT5cbiAgICBhXG4gICAgICAucmVkdWNlKChhLCBiKSA9PiBhLmZsYXRNYXAoKGQpID0+IGIubWFwKChlKSA9PiBbZCwgZV0uZmxhdCgpKSkpXG4gICAgICAubWFwKChwYXJ0cykgPT4gcGFydHMuam9pbihcIlwiKSk7XG5cbiAgdmFyIGJ1aWx0aW5UeXBlcyA9IFtcbiAgICBcImludFwiLFxuICAgIFwidWludFwiLFxuICAgIFwidWludHB0clwiLFxuICAgIFwidHlwZWlkXCIsXG4gICAgXCJyYXdwdHJcIixcbiAgICBcInN0cmluZ1wiLFxuICAgIFwiY3N0cmluZ1wiLFxuICAgIFwiaThcIixcbiAgICBcInU4XCIsXG4gICAgXCJhbnlcIixcbiAgICBcImJ5dGVcIixcbiAgICBcInJ1bmVcIixcbiAgICBcImJvb2xcIixcbiAgICBcImI4XCIsXG4gICAgXCJiMTZcIixcbiAgICBcImIzMlwiLFxuICAgIFwiYjY0XCIsXG4gICAgLi4uY2FydGVzaWFuKFtcImlcIiwgXCJ1XCJdLCBbXCIxNlwiLCBcIjMyXCIsIFwiNjRcIiwgXCIxMjhcIl0sIFtcIlwiLCBcImxlXCIsIFwiYmVcIl0pLFxuICAgIC4uLmNhcnRlc2lhbihbXCJmXCJdLCBbXCIxNlwiLCBcIjMyXCIsIFwiNjRcIl0sIFtcIlwiLCBcImxlXCIsIFwiYmVcIl0pLFxuICAgIC4uLmNhcnRlc2lhbihbXCJjb21wbGV4XCJdLCBbXCIzMlwiLCBcIjY0XCIsIFwiMTI4XCJdKSxcbiAgICAuLi5jYXJ0ZXNpYW4oW1wicXVhdGVybmlvblwiXSwgW1wiNjRcIiwgXCIxMjhcIiwgXCIyNTZcIl0pXG4gIF0uam9pbihcInxcIik7XG5cbiAgdmFyIG9wZXJhdG9ycyA9IFtcbiAgICBcIlxcXFwqXCIsXG4gICAgXCIvXCIsXG4gICAgXCIlXCIsXG4gICAgXCIlJVwiLFxuICAgIFwiPDxcIixcbiAgICBcIj4+XCIsXG4gICAgXCImXCIsXG4gICAgXCImflwiLFxuICAgIFwiXFxcXCtcIixcbiAgICBcIlxcXFwtXCIsXG4gICAgXCJ+XCIsXG4gICAgXCJcXFxcfFwiLFxuICAgIFwiPlwiLFxuICAgIFwiPFwiLFxuICAgIFwiPD1cIixcbiAgICBcIj49XCIsXG4gICAgXCI9PVwiLFxuICAgIFwiIT1cIlxuICBdXG4gICAgLmNvbmNhdChcIjpcIilcbiAgICAubWFwKChvcGVyYXRvcikgPT4gb3BlcmF0b3IgKyBcIj1cIilcbiAgICAuY29uY2F0KFwiPVwiLCBcIjo9XCIsIFwiOjpcIiwgXCItPlwiLCBcIlxcXFxeXCIsIFwiJlwiLCBcIjpcIilcbiAgICAuam9pbihcInxcIik7XG5cbiAgdmFyIGJ1aWx0aW5GdW5jdGlvbnMgPSBcIm5ld3xjYXB8Y29weXxwYW5pY3xsZW58bWFrZXxkZWxldGV8YXBwZW5kfGZyZWVcIjtcbiAgdmFyIGJ1aWx0aW5Db25zdGFudHMgPSBcIm5pbHx0cnVlfGZhbHNlXCI7XG5cbiAgdmFyIGtleXdvcmRNYXBwZXIgPSB0aGlzLmNyZWF0ZUtleXdvcmRNYXBwZXIoXG4gICAge1xuICAgICAga2V5d29yZDoga2V5d29yZHMsXG4gICAgICBcImNvbnN0YW50Lmxhbmd1YWdlXCI6IGJ1aWx0aW5Db25zdGFudHMsXG4gICAgICBcInN1cHBvcnQuZnVuY3Rpb25cIjogYnVpbHRpbkZ1bmN0aW9ucyxcbiAgICAgIFwic3VwcG9ydC50eXBlXCI6IGJ1aWx0aW5UeXBlc1xuICAgIH0sXG4gICAgXCJcIlxuICApO1xuXG4gIHZhciBzdHJpbmdFc2NhcGVSZSA9XG4gICAgXCJcXFxcXFxcXCg/OlswLTddezN9fHhcXFxcaHsyfXx1ezR9fFVcXFxcaHs2fXxbYWJmbnJ0didcXFwiXFxcXFxcXFxdKVwiLnJlcGxhY2UoXG4gICAgICAvXFxcXGgvZyxcbiAgICAgIFwiW2EtZkEtRlxcXFxkXVwiXG4gICAgKTtcblxuICB0aGlzLiRydWxlcyA9IHtcbiAgICBzdGFydDogW1xuICAgICAge1xuICAgICAgICB0b2tlbjogXCJjb21tZW50XCIsXG4gICAgICAgIHJlZ2V4OiAvXFwvXFwvLiokL1xuICAgICAgfSxcbiAgICAgIERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcy5nZXRTdGFydFJ1bGUoXCJkb2Mtc3RhcnRcIiksXG4gICAgICB7XG4gICAgICAgIHRva2VuOiBcImNvbW1lbnQuc3RhcnRcIiwgLy8gbXVsdGkgbGluZSBjb21tZW50XG4gICAgICAgIHJlZ2V4OiBcIlxcXFwvXFxcXCpcIixcbiAgICAgICAgbmV4dDogXCJjb21tZW50XCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRva2VuOiBcInN0cmluZ1wiLCAvLyBzaW5nbGUgbGluZVxuICAgICAgICByZWdleDogL1wiKD86W15cIlxcXFxdfFxcXFwuKSo/XCIvXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0b2tlbjogXCJzdHJpbmdcIiwgLy8gcmF3XG4gICAgICAgIHJlZ2V4OiBcImBcIixcbiAgICAgICAgbmV4dDogXCJicXN0cmluZ1wiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0b2tlbjogXCJzdXBwb3J0LmNvbnN0YW50XCIsXG4gICAgICAgIHJlZ2V4OiAvI1thLXpfXSsvXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0b2tlbjogXCJjb25zdGFudC5udW1lcmljXCIsIC8vIHJ1bmVcbiAgICAgICAgcmVnZXg6XG4gICAgICAgICAgXCInKD86W15cXFxcJ1xcdUQ4MDAtXFx1REJGRl18W1xcdUQ4MDAtXFx1REJGRl1bXFx1REMwMC1cXHVERkZGXXxcIiArXG4gICAgICAgICAgc3RyaW5nRXNjYXBlUmUucmVwbGFjZSgnXCInLCBcIlwiKSArXG4gICAgICAgICAgXCIpJ1wiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0b2tlbjogXCJjb25zdGFudC5udW1lcmljXCIsIC8vIGhleFxuICAgICAgICByZWdleDogXCIwW3hYXVswLTlhLWZBLUZdK1xcXFxiXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRva2VuOiBcImNvbnN0YW50Lm51bWVyaWNcIiwgLy8gZmxvYXRcbiAgICAgICAgcmVnZXg6IFwiWystXT9cXFxcZCsoPzooPzpcXFxcLlxcXFxkKik/KD86W2VFXVsrLV0/XFxcXGQrKT8pP1xcXFxiXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRva2VuOiBbXG4gICAgICAgICAgXCJlbnRpdHkubmFtZS5mdW5jdGlvblwiLFxuICAgICAgICAgIFwidGV4dFwiLFxuICAgICAgICAgIFwia2V5d29yZC5vcGVyYXRvclwiLFxuICAgICAgICAgIFwidGV4dFwiLFxuICAgICAgICAgIFwia2V5d29yZFwiXG4gICAgICAgIF0sXG4gICAgICAgIHJlZ2V4OiBcIihbYS16QS1aXyRdW2EtekEtWjAtOV8kXSopKFxcXFxzKykoOjopKFxcXFxzKykocHJvYylcXFxcYlwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0b2tlbjogZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICAgIGlmICh2YWxbdmFsLmxlbmd0aCAtIDFdID09IFwiKFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdHlwZToga2V5d29yZE1hcHBlcih2YWwuc2xpY2UoMCwgLTEpKSB8fCBcInN1cHBvcnQuZnVuY3Rpb25cIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogdmFsLnNsaWNlKDAsIC0xKVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJwYXJlbi5scGFyZW5cIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogdmFsLnNsaWNlKC0xKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBrZXl3b3JkTWFwcGVyKHZhbCkgfHwgXCJpZGVudGlmaWVyXCI7XG4gICAgICAgIH0sXG4gICAgICAgIHJlZ2V4OiBcIlthLXpBLVpfJF1bYS16QS1aMC05XyRdKlxcXFxiXFxcXCg/XCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRva2VuOiBcImtleXdvcmQub3BlcmF0b3JcIixcbiAgICAgICAgcmVnZXg6IG9wZXJhdG9yc1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdG9rZW46IFwicHVuY3R1YXRpb24ub3BlcmF0b3JcIixcbiAgICAgICAgcmVnZXg6IFwiXFxcXD98XFxcXCx8XFxcXDt8XFxcXC5cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdG9rZW46IFwicGFyZW4ubHBhcmVuXCIsXG4gICAgICAgIHJlZ2V4OiBcIltbKHtdXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRva2VuOiBcInBhcmVuLnJwYXJlblwiLFxuICAgICAgICByZWdleDogXCJbXFxcXF0pfV1cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdG9rZW46IFwidGV4dFwiLFxuICAgICAgICByZWdleDogXCJcXFxccytcIlxuICAgICAgfVxuICAgIF0sXG4gICAgY29tbWVudDogW1xuICAgICAge1xuICAgICAgICB0b2tlbjogXCJjb21tZW50LmVuZFwiLFxuICAgICAgICByZWdleDogXCJcXFxcKlxcXFwvXCIsXG4gICAgICAgIG5leHQ6IFwic3RhcnRcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgZGVmYXVsdFRva2VuOiBcImNvbW1lbnRcIlxuICAgICAgfVxuICAgIF0sXG4gICAgYnFzdHJpbmc6IFtcbiAgICAgIHtcbiAgICAgICAgdG9rZW46IFwic3RyaW5nXCIsXG4gICAgICAgIHJlZ2V4OiBcImBcIixcbiAgICAgICAgbmV4dDogXCJzdGFydFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBkZWZhdWx0VG9rZW46IFwic3RyaW5nXCJcbiAgICAgIH1cbiAgICBdXG4gIH07XG5cbiAgdGhpcy5lbWJlZFJ1bGVzKERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcywgXCJkb2MtXCIsIFtcbiAgICBEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMuZ2V0RW5kUnVsZShcInN0YXJ0XCIpXG4gIF0pO1xufTtcbm9vcC5pbmhlcml0cyhPZGluSGlnaGxpZ2h0UnVsZXMsIFRleHRIaWdobGlnaHRSdWxlcyk7XG5cbmV4cG9ydHMuT2RpbkhpZ2hsaWdodFJ1bGVzID0gT2RpbkhpZ2hsaWdodFJ1bGVzO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9