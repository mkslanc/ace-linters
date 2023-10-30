"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[1816,8057],{

/***/ 12764:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var Range = (__webpack_require__(59082)/* .Range */ .e);
var BaseFoldMode = (__webpack_require__(15369).FoldMode);

var FoldMode = exports.Z = function(commentRegex) {
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

/***/ 91816:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var JavaScriptMode = (__webpack_require__(88057).Mode);
var GobstonesHighlightRules = (__webpack_require__(36882)/* .GobstonesHighlightRules */ .u);

var Mode = function() {
    JavaScriptMode.call(this);
    this.HighlightRules = GobstonesHighlightRules;
    this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, JavaScriptMode);

(function() {

    this.createWorker = function() {
        return null;
    };

    this.$id = "ace/mode/gobstones";
    this.snippetFileId = "ace/snippets/gobstones";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 36882:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var TextHighlightRules = (__webpack_require__(28053)/* .TextHighlightRules */ .K);

var GobstonesHighlightRules = function() {

  var definitions = {
    standard: "program|procedure|function|interactive|return|let",
    type: "type|is|variant|record|field|case"
  };

  var control = {
    commands: {
      repetitions: "repeat|while|foreach|in",
      alternatives: "if|elseif|else|switch"
    },
    expressions: {
      alternatives: "choose|when|otherwise|matching|select|on"
    }
  };

  var values = {
    colors: "Verde|Rojo|Azul|Negro",
    cardinals: "Norte|Sur|Este|Oeste",
    booleans: "True|False",
    numbers: /([-]?)([0-9]+)\b/,
    strings: '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'
  };

  var primitives = {
    commands: "Poner|Sacar|Mover|IrAlBorde|VaciarTablero|BOOM",
    expressions: "nroBolitas|hayBolitas|puedeMover|"+
                  "siguiente|previo|opuesto|"+
                  "minBool|maxBool|minDir|maxDir|minColor|maxColor|"+
                  "primero|sinElPrimero|esVacía|"+
                  "boom",
    keys: "K_A|K_B|K_C|K_D|K_E|K_F|K_G|K_G|K_H|K_I|K_J|K_K|K_L|K_M|K_N|K_Ñ|"+
      "K_O|K_P|K_Q|K_R|K_S|K_T|K_U|K_V|K_W|K_X|K_Y|K_Z|"+
      "K_0|K_1|K_2|K_3|K_4|K_5|K_6|K_7|K_8|K_9|"+
      "K_F1|K_F2|K_F3|K_F4|K_F5|K_F6|K_F7|K_F8|K_F9|K_F10|K_F11|K_12|"+
      "K_UP|K_DOWN|K_LEFT|K_RIGHT|K_RETURN|K_BACKSPACE|K_TAB|K_SPACE|K_ESCAPE"+

      "K_CTRL_A|K_CTRL_B|K_CTRL_C|K_CTRL_D|K_CTRL_E|K_CTRL_F|K_CTRL_G|K_CTRL_G|"+
      "K_CTRL_H|K_CTRL_I|K_CTRL_J|K_CTRL_K|K_CTRL_L|K_CTRL_M|K_CTRL_N|K_CTRL_Ñ|"+
      "K_CTRL_O|K_CTRL_P|K_CTRL_Q|K_CTRL_R|K_CTRL_S|K_CTRL_T|K_CTRL_U|K_CTRL_V|"+
      "K_CTRL_W|K_CTRL_X|K_CTRL_Y|K_CTRL_Z|"+
      "K_CTRL_0|K_CTRL_1|K_CTRL_2|K_CTRL_3|K_CTRL_4|K_CTRL_5|K_CTRL_6|K_CTRL_7|K_CTRL_8|K_CTRL_9|"+
      "K_CTRL_F1|K_CTRL_F2|K_CTRL_F3|K_CTRL_F4|K_CTRL_F5|K_CTRL_F6|K_CTRL_F7|"+
      "K_CTRL_F8|K_CTRL_F9|K_CTRL_F10|K_CTRL_F11|K_CTRL_F12|"+
      "K_CTRL_UP|K_CTRL_DOWN|K_CTRL_LEFT|K_CTRL_RIGHT|K_CTRL_RETURN|"+
      "K_CTRL_BACKSPACE|K_CTRL_TAB|K_CTRL_SPACE|K_CTRL_ESCAPE"+

      "K_ALT_A|K_ALT_B|K_ALT_C|K_ALT_D|K_ALT_E|K_ALT_F|K_ALT_G|K_ALT_G|K_ALT_H|"+
      "K_ALT_I|K_ALT_J|K_ALT_K|K_ALT_L|K_ALT_M|K_ALT_N|K_ALT_Ñ|K_ALT_O|K_ALT_P|"+
      "K_ALT_Q|K_ALT_R|K_ALT_S|K_ALT_T|K_ALT_U|K_ALT_V|K_ALT_W|K_ALT_X|K_ALT_Y|K_ALT_Z|"+
      "K_ALT_0|K_ALT_1|K_ALT_2|K_ALT_3|K_ALT_4|K_ALT_5|K_ALT_6|K_ALT_7|K_ALT_8|K_ALT_9|"+
      "K_ALT_F1|K_ALT_F2|K_ALT_F3|K_ALT_F4|K_ALT_F5|K_ALT_F6|K_ALT_F7|K_ALT_F8|"+
      "K_ALT_F9|K_ALT_F10|K_ALT_F11|K_ALT_F12|"+
      "K_ALT_UP|K_ALT_DOWN|K_ALT_LEFT|K_ALT_RIGHT|K_ALT_RETURN|K_ALT_BACKSPACE|"+
      "K_ALT_TAB|K_ALT_SPACE|K_ALT_ESCAPE"+

      "K_SHIFT_A|K_SHIFT_B|K_SHIFT_C|K_SHIFT_D|K_SHIFT_E|K_SHIFT_F|K_SHIFT_G|"+
      "K_SHIFT_G|K_SHIFT_H|K_SHIFT_I|K_SHIFT_J|K_SHIFT_K|K_SHIFT_L|K_SHIFT_M|"+
      "K_SHIFT_N|K_SHIFT_Ñ|K_SHIFT_O|K_SHIFT_P|K_SHIFT_Q|K_SHIFT_R|K_SHIFT_S|"+
      "K_SHIFT_T|K_SHIFT_U|K_SHIFT_V|K_SHIFT_W|K_SHIFT_X|K_SHIFT_Y|K_SHIFT_Z|"+
      "K_SHIFT_0|K_SHIFT_1|K_SHIFT_2|K_SHIFT_3|K_SHIFT_4|K_SHIFT_5|K_SHIFT_6|"+
      "K_SHIFT_7|K_SHIFT_8|K_SHIFT_9|"+
      "K_SHIFT_F1|K_SHIFT_F2|K_SHIFT_F3|K_SHIFT_F4|K_SHIFT_F5|K_SHIFT_F6|"+
      "K_SHIFT_F7|K_SHIFT_F8|K_SHIFT_F9|K_SHIFT_F10|K_SHIFT_F11|K_SHIFT_F12|"+
      "K_SHIFT_UP|K_SHIFT_DOWN|K_SHIFT_LEFT|K_SHIFT_RIGHT|K_SHIFT_RETURN|"+
      "K_SHIFT_BACKSPACE|K_SHIFT_TAB|K_SHIFT_SPACE|K_SHIFT_ESCAPE"+

      "K_CTRL_ALT_A|K_CTRL_ALT_B|K_CTRL_ALT_C|K_CTRL_ALT_D|K_CTRL_ALT_E|"+
      "K_CTRL_ALT_F|K_CTRL_ALT_G|K_CTRL_ALT_G|K_CTRL_ALT_H|K_CTRL_ALT_I|"+
      "K_CTRL_ALT_J|K_CTRL_ALT_K|K_CTRL_ALT_L|K_CTRL_ALT_M|K_CTRL_ALT_N|"+
      "K_CTRL_ALT_Ñ|K_CTRL_ALT_O|K_CTRL_ALT_P|K_CTRL_ALT_Q|K_CTRL_ALT_R|"+
      "K_CTRL_ALT_S|K_CTRL_ALT_T|K_CTRL_ALT_U|K_CTRL_ALT_V|K_CTRL_ALT_W|"+
      "K_CTRL_ALT_X|K_CTRL_ALT_Y|K_CTRL_ALT_Z|"+
      "K_CTRL_ALT_0|K_CTRL_ALT_1|K_CTRL_ALT_2|K_CTRL_ALT_3|K_CTRL_ALT_4|"+
      "K_CTRL_ALT_5|K_CTRL_ALT_6|K_CTRL_ALT_7|K_CTRL_ALT_8|K_CTRL_ALT_9|"+
      "K_CTRL_ALT_F1|K_CTRL_ALT_F2|K_CTRL_ALT_F3|K_CTRL_ALT_F4|K_CTRL_ALT_F5|"+
      "K_CTRL_ALT_F6|K_CTRL_ALT_F7|K_CTRL_ALT_F8|K_CTRL_ALT_F9|K_CTRL_ALT_F10|"+
      "K_CTRL_ALT_F11|K_CTRL_ALT_F12|"+
      "K_CTRL_ALT_UP|K_CTRL_ALT_DOWN|K_CTRL_ALT_LEFT|K_CTRL_ALT_RIGHT|"+
      "K_CTRL_ALT_RETURN|K_CTRL_ALT_BACKSPACE|K_CTRL_ALT_TAB|K_CTRL_ALT_SPACE|K_CTRL_ALT_ESCAPE"+

      "K_CTRL_SHIFT_A|K_CTRL_SHIFT_B|K_CTRL_SHIFT_C|K_CTRL_SHIFT_D|K_CTRL_SHIFT_E|"+
      "K_CTRL_SHIFT_F|K_CTRL_SHIFT_G|K_CTRL_SHIFT_G|K_CTRL_SHIFT_H|K_CTRL_SHIFT_I|"+
      "K_CTRL_SHIFT_J|K_CTRL_SHIFT_K|K_CTRL_SHIFT_L|K_CTRL_SHIFT_M|K_CTRL_SHIFT_N|"+
      "K_CTRL_SHIFT_Ñ|K_CTRL_SHIFT_O|K_CTRL_SHIFT_P|K_CTRL_SHIFT_Q|K_CTRL_SHIFT_R|"+
      "K_CTRL_SHIFT_S|K_CTRL_SHIFT_T|K_CTRL_SHIFT_U|K_CTRL_SHIFT_V|K_CTRL_SHIFT_W|"+
      "K_CTRL_SHIFT_X|K_CTRL_SHIFT_Y|K_CTRL_SHIFT_Z|"+
      "K_CTRL_SHIFT_0|K_CTRL_SHIFT_1|K_CTRL_SHIFT_2|K_CTRL_SHIFT_3|K_CTRL_SHIFT_4|"+
      "K_CTRL_SHIFT_5|K_CTRL_SHIFT_6|K_CTRL_SHIFT_7|K_CTRL_SHIFT_8|K_CTRL_SHIFT_9|"+
      "K_CTRL_SHIFT_F1|K_CTRL_SHIFT_F2|K_CTRL_SHIFT_F3|K_CTRL_SHIFT_F4|"+
      "K_CTRL_SHIFT_F5|K_CTRL_SHIFT_F6|K_CTRL_SHIFT_F7|K_CTRL_SHIFT_F8|"+
      "K_CTRL_SHIFT_9|K_CTRL_SHIFT_10|K_CTRL_SHIFT_11|K_CTRL_SHIFT_12|"+
      "K_CTRL_SHIFT_UP|K_CTRL_SHIFT_DOWN|K_CTRL_SHIFT_LEFT|K_CTRL_SHIFT_RIGHT|"+
      "K_CTRL_SHIFT_RETURN|K_CTRL_SHIFT_BACKSPACE|K_CTRL_SHIFT_TAB|"+
      "K_CTRL_SHIFT_SPACE|K_CTRL_SHIFT_ESCAPE"+

      "K_ALT_SHIFT_A|K_ALT_SHIFT_B|K_ALT_SHIFT_C|K_ALT_SHIFT_D|K_ALT_SHIFT_E|"+
      "K_ALT_SHIFT_F|K_ALT_SHIFT_G|K_ALT_SHIFT_G|K_ALT_SHIFT_H|K_ALT_SHIFT_I|"+
      "K_ALT_SHIFT_J|K_ALT_SHIFT_K|K_ALT_SHIFT_L|K_ALT_SHIFT_M|K_ALT_SHIFT_N|"+
      "K_ALT_SHIFT_Ñ|K_ALT_SHIFT_O|K_ALT_SHIFT_P|K_ALT_SHIFT_Q|K_ALT_SHIFT_R|"+
      "K_ALT_SHIFT_S|K_ALT_SHIFT_T|K_ALT_SHIFT_U|K_ALT_SHIFT_V|K_ALT_SHIFT_W|"+
      "K_ALT_SHIFT_X|K_ALT_SHIFT_Y|K_ALT_SHIFT_Z|"+
      "K_ALT_SHIFT_0|K_ALT_SHIFT_1|K_ALT_SHIFT_2|K_ALT_SHIFT_3|K_ALT_SHIFT_4|"+
      "K_ALT_SHIFT_5|K_ALT_SHIFT_6|K_ALT_SHIFT_7|K_ALT_SHIFT_8|K_ALT_SHIFT_9|"+
      "K_ALT_SHIFT_F1|K_ALT_SHIFT_F2|K_ALT_SHIFT_F3|K_ALT_SHIFT_F4|"+
      "K_ALT_SHIFT_F5|K_ALT_SHIFT_F6|K_ALT_SHIFT_F7|K_ALT_SHIFT_F8|"+
      "K_ALT_SHIFT_9|K_ALT_SHIFT_10|K_ALT_SHIFT_11|K_ALT_SHIFT_12|"+
      "K_ALT_SHIFT_UP|K_ALT_SHIFT_DOWN|K_ALT_SHIFT_LEFT|K_ALT_SHIFT_RIGHT|"+
      "K_ALT_SHIFT_RETURN|K_ALT_SHIFT_BACKSPACE|K_ALT_SHIFT_TAB|K_ALT_SHIFT_SPACE|"+
      "K_ALT_SHIFT_ESCAPE"+

      "K_CTRL_ALT_SHIFT_A|K_CTRL_ALT_SHIFT_B|K_CTRL_ALT_SHIFT_C|K_CTRL_ALT_SHIFT_D|"+
      "K_CTRL_ALT_SHIFT_E|K_CTRL_ALT_SHIFT_F|K_CTRL_ALT_SHIFT_G|K_CTRL_ALT_SHIFT_G|"+
      "K_CTRL_ALT_SHIFT_H|K_CTRL_ALT_SHIFT_I|K_CTRL_ALT_SHIFT_J|K_CTRL_ALT_SHIFT_K|"+
      "K_CTRL_ALT_SHIFT_L|K_CTRL_ALT_SHIFT_M|K_CTRL_ALT_SHIFT_N|K_CTRL_ALT_SHIFT_Ñ|"+
      "K_CTRL_ALT_SHIFT_O|K_CTRL_ALT_SHIFT_P|K_CTRL_ALT_SHIFT_Q|K_CTRL_ALT_SHIFT_R|"+
      "K_CTRL_ALT_SHIFT_S|K_CTRL_ALT_SHIFT_T|K_CTRL_ALT_SHIFT_U|K_CTRL_ALT_SHIFT_V|"+
      "K_CTRL_ALT_SHIFT_W|K_CTRL_ALT_SHIFT_X|K_CTRL_ALT_SHIFT_Y|K_CTRL_ALT_SHIFT_Z|"+
      "K_CTRL_ALT_SHIFT_0|K_CTRL_ALT_SHIFT_1|K_CTRL_ALT_SHIFT_2|K_CTRL_ALT_SHIFT_3|"+
      "K_CTRL_ALT_SHIFT_4|K_CTRL_ALT_SHIFT_5|K_CTRL_ALT_SHIFT_6|K_CTRL_ALT_SHIFT_7|"+
      "K_CTRL_ALT_SHIFT_8|K_CTRL_ALT_SHIFT_9|"+
      "K_CTRL_ALT_SHIFT_F1|K_CTRL_ALT_SHIFT_F2|K_CTRL_ALT_SHIFT_F3|K_CTRL_ALT_SHIFT_F4|"+
      "K_CTRL_ALT_SHIFT_F5|K_CTRL_ALT_SHIFT_F6|K_CTRL_ALT_SHIFT_F7|K_CTRL_ALT_SHIFT_F8|"+
      "K_CTRL_ALT_SHIFT_F9|K_CTRL_ALT_SHIFT_F10|K_CTRL_ALT_SHIFT_F11|K_CTRL_ALT_SHIFT_F12|"+
      "K_CTRL_ALT_SHIFT_UP|K_CTRL_ALT_SHIFT_DOWN|K_CTRL_ALT_SHIFT_LEFT|K_CTRL_ALT_SHIFT_RIGHT|"+
      "K_CTRL_ALT_SHIFT_RETURN|K_CTRL_ALT_SHIFT_BACKSPACE|K_CTRL_ALT_SHIFT_TAB|"+
      "K_CTRL_ALT_SHIFT_SPACE|K_CTRL_ALT_SHIFT_ESCAPE"
  };

  var operations = {
    commands: ":=",
    expressions: {
      numeric: "\\+|\\-|\\*|\\^|div|mod",
      comparison: ">=|<=|==|\\/=|>|<",
      boolean: "\\|\\||&&|not",
      other: "\\+\\+|<\\-|\\[|\\]|\\_|\\->"
    }
  };

  var comments = {
    line: {
      double_slash: "\\/\\/.*$",
      double_dash: "\\-\\-.*$",
      number_sign: "#.*$"
    },
    block: { start: "\\/\\*", end: "\\*\\/" },
    block_alt: { start: "\\{\\-", end: "\\-\\}" }
  };

  this.$rules = {
    "start" : [
      // comments
      {
        token : "comment.line.double-slash.gobstones",
        regex : comments.line.double_slash
      },
      {
        token : "comment.line.double-dash.gobstones",
        regex : comments.line.double_dash
      },
      {
        token : "comment.line.number-sign.gobstones",
        regex : comments.line.number_sign
      },
      {
        token : "comment.block.dash-asterisc.gobstones",
        regex : comments.block.start,
        next : "block_comment_end"
      },
      {
        token : "comment.block.brace-dash.gobstones",
        regex : comments.block_alt.start,
        next : "block_comment_alt_end"
      },
      // numbers
      {
        token : "constant.numeric.gobstones",
        regex : values.numbers
      },
      // strings
      {
        token : "string.quoted.double.gobstones",
        regex : values.strings
      },
      //  operations
      {
        token : "keyword.operator.other.gobstones",
        regex : operations.expressions.other
      },
      {
        token : "keyword.operator.numeric.gobstones",
        regex : operations.expressions.numeric
      },
      {
        token : "keyword.operator.compare.gobstones",
        regex : operations.expressions.comparison
      },
      {
        token : "keyword.operator.boolean.gobstones",
        regex : operations.expressions.boolean
      },
      // keywords
      {
        token : this.createKeywordMapper({
          // basic constructs
          "storage.type.definitions.gobstones": definitions.standard,
          "storage.type.types.gobstones": definitions.type,
          "keyword.control.commands.repetitions.gobstones": control.commands.repetitions,
          "keyword.control.commands.alternatives.gobstones": control.commands.alternatives,
          "keyword.control.expressions.alternatives.gobstones": control.expressions.alternatives,
          // types
          "constant.language.colors.gobstones":values.colors,
          "constant.language.cardinals.gobstones": values.cardinals,
          "constant.language.boolean.gobstones": values.booleans,
          // primitives
          "support.function.gobstones": primitives.commands,
          "support.variable.gobstones": primitives.expressions,
          "variable.language.gobstones": primitives.keys
      }, "identifier.gobstones"),
        regex : "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
      },
      {
        token : "comma.gobstones",
        regex : ","
      },
      {
        token : "semicolon.gobstones",
        regex : ";"
      },
      {
        token : "lparen",
        regex : "[[({]"
      },
      {
        token : "rparen",
        regex : "[\\])}]"
      },
      {
        token : "text",
        regex : "\\s+"
      }
    ],
    "block_comment_end": [{
        token : "comment.block.dash-asterisc.gobstones",
        regex : comments.block.end,
        next : "start"
      }, {
        defaultToken : "comment.block.dash-asterisc.gobstones"
      }
    ],
    "block_comment_alt_end": [{
        token : "comment.block.brace-dash.gobstones",
        regex : comments.block_alt.end,
        next : "start"
      }, {
        defaultToken : "comment.block.brace-dash.gobstones"
      }
    ]
  };
};

oop.inherits(GobstonesHighlightRules, TextHighlightRules);

exports.u = GobstonesHighlightRules;


/***/ }),

/***/ 88057:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var TextMode = (__webpack_require__(98030).Mode);
var JavaScriptHighlightRules = (__webpack_require__(33801)/* .JavaScriptHighlightRules */ ._);
var MatchingBraceOutdent = (__webpack_require__(1164).MatchingBraceOutdent);
var WorkerClient = (__webpack_require__(91451).WorkerClient);
var CstyleBehaviour = (__webpack_require__(19414)/* .CstyleBehaviour */ .B);
var CStyleFoldMode = (__webpack_require__(12764)/* .FoldMode */ .Z);

var Mode = function() {
    this.HighlightRules = JavaScriptHighlightRules;

    this.$outdent = new MatchingBraceOutdent();
    this.$behaviour = new CstyleBehaviour();
    this.foldingRules = new CStyleFoldMode();
};
oop.inherits(Mode, TextMode);

(function() {

    this.lineCommentStart = "//";
    this.blockComment = {start: "/*", end: "*/"};
    this.$quotes = {'"': '"', "'": "'", "`": "`"};
    this.$pairQuotesAfter = {
        "`": /\w/
    };

    this.getNextLineIndent = function(state, line, tab) {
        var indent = this.$getIndent(line);

        var tokenizedLine = this.getTokenizer().getLineTokens(line, state);
        var tokens = tokenizedLine.tokens;
        var endState = tokenizedLine.state;

        if (tokens.length && tokens[tokens.length-1].type == "comment") {
            return indent;
        }

        if (state == "start" || state == "no_regex") {
            var match = line.match(/^.*(?:\bcase\b.*:|[\{\(\[])\s*$/);
            if (match) {
                indent += tab;
            }
        } else if (state == "doc-start") {
            if (endState == "start" || endState == "no_regex") {
                return "";
            }
            var match = line.match(/^\s*(\/?)\*/);
            if (match) {
                if (match[1]) {
                    indent += " ";
                }
                indent += "* ";
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
        var worker = new WorkerClient(["ace"], "ace/mode/javascript_worker", "JavaScriptWorker");
        worker.attachToDocument(session.getDocument());

        worker.on("annotate", function(results) {
            session.setAnnotations(results.data);
        });

        worker.on("terminate", function() {
            session.clearAnnotations();
        });

        return worker;
    };

    this.$id = "ace/mode/javascript";
    this.snippetFileId = "ace/snippets/javascript";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 1164:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var Range = (__webpack_require__(59082)/* .Range */ .e);

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


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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K0M7QUFDbEUsc0JBQXNCLHFEQUE2QztBQUNuRSxxQkFBcUIsOENBQW9DOztBQUV6RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSx5QkFBeUI7QUFDekIsb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx5REFBeUQ7QUFDekQ7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVELFlBQVk7Ozs7Ozs7O0FDdkZDOztBQUViLFlBQVksMkNBQXlCOztBQUVyQzs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsc0JBQXNCO0FBQ3RCOztBQUVBO0FBQ0E7QUFDQSx1Q0FBdUM7O0FBRXZDOztBQUVBO0FBQ0Esb0RBQW9ELHlCQUF5Qjs7QUFFN0U7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDOztBQUVELDRCQUE0QiIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvZm9sZGluZy9jc3R5bGUuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9nb2JzdG9uZXMuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9nb2JzdG9uZXNfaGlnaGxpZ2h0X3J1bGVzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvamF2YXNjcmlwdC5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL21hdGNoaW5nX2JyYWNlX291dGRlbnQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vLi4vbGliL29vcFwiKTtcbnZhciBSYW5nZSA9IHJlcXVpcmUoXCIuLi8uLi9yYW5nZVwiKS5SYW5nZTtcbnZhciBCYXNlRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9mb2xkX21vZGVcIikuRm9sZE1vZGU7XG5cbnZhciBGb2xkTW9kZSA9IGV4cG9ydHMuRm9sZE1vZGUgPSBmdW5jdGlvbihjb21tZW50UmVnZXgpIHtcbiAgICBpZiAoY29tbWVudFJlZ2V4KSB7XG4gICAgICAgIHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyID0gbmV3IFJlZ0V4cChcbiAgICAgICAgICAgIHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyLnNvdXJjZS5yZXBsYWNlKC9cXHxbXnxdKj8kLywgXCJ8XCIgKyBjb21tZW50UmVnZXguc3RhcnQpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIgPSBuZXcgUmVnRXhwKFxuICAgICAgICAgICAgdGhpcy5mb2xkaW5nU3RvcE1hcmtlci5zb3VyY2UucmVwbGFjZSgvXFx8W158XSo/JC8sIFwifFwiICsgY29tbWVudFJlZ2V4LmVuZClcbiAgICAgICAgKTtcbiAgICB9XG59O1xub29wLmluaGVyaXRzKEZvbGRNb2RlLCBCYXNlRm9sZE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgXG4gICAgdGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIgPSAvKFtcXHtcXFtcXChdKVteXFx9XFxdXFwpXSokfF5cXHMqKFxcL1xcKikvO1xuICAgIHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIgPSAvXlteXFxbXFx7XFwoXSooW1xcfVxcXVxcKV0pfF5bXFxzXFwqXSooXFwqXFwvKS87XG4gICAgdGhpcy5zaW5nbGVMaW5lQmxvY2tDb21tZW50UmU9IC9eXFxzKihcXC9cXCopLipcXCpcXC9cXHMqJC87XG4gICAgdGhpcy50cmlwbGVTdGFyQmxvY2tDb21tZW50UmUgPSAvXlxccyooXFwvXFwqXFwqXFwqKS4qXFwqXFwvXFxzKiQvO1xuICAgIHRoaXMuc3RhcnRSZWdpb25SZSA9IC9eXFxzKihcXC9cXCp8XFwvXFwvKSM/cmVnaW9uXFxiLztcbiAgICBcbiAgICAvL3ByZXZlbnQgbmFtaW5nIGNvbmZsaWN0IHdpdGggYW55IG1vZGVzIHRoYXQgaW5oZXJpdCBmcm9tIGNzdHlsZSBhbmQgb3ZlcnJpZGUgdGhpcyAobGlrZSBjc2hhcnApXG4gICAgdGhpcy5fZ2V0Rm9sZFdpZGdldEJhc2UgPSB0aGlzLmdldEZvbGRXaWRnZXQ7XG4gICAgXG4gICAgLyoqXG4gICAgICogR2V0cyBmb2xkIHdpZGdldCB3aXRoIHNvbWUgbm9uLXN0YW5kYXJkIGV4dHJhczpcbiAgICAgKlxuICAgICAqIEBleGFtcGxlIGxpbmVDb21tZW50UmVnaW9uU3RhcnRcbiAgICAgKiAgICAgIC8vI3JlZ2lvbiBbb3B0aW9uYWwgZGVzY3JpcHRpb25dXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSBibG9ja0NvbW1lbnRSZWdpb25TdGFydFxuICAgICAqICAgICAgLyojcmVnaW9uIFtvcHRpb25hbCBkZXNjcmlwdGlvbl0gKlsvXVxuICAgICAqXG4gICAgICogQGV4YW1wbGUgdHJpcGxlU3RhckZvbGRpbmdTZWN0aW9uXG4gICAgICogICAgICAvKioqIHRoaXMgZm9sZHMgZXZlbiB0aG91Z2ggMSBsaW5lIGJlY2F1c2UgaXQgaGFzIDMgc3RhcnMgKioqWy9dXG4gICAgICogXG4gICAgICogQG5vdGUgdGhlIHBvdW5kIHN5bWJvbCBmb3IgcmVnaW9uIHRhZ3MgaXMgb3B0aW9uYWxcbiAgICAgKi9cbiAgICB0aGlzLmdldEZvbGRXaWRnZXQgPSBmdW5jdGlvbihzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdykge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgIFxuICAgICAgICBpZiAodGhpcy5zaW5nbGVMaW5lQmxvY2tDb21tZW50UmUudGVzdChsaW5lKSkge1xuICAgICAgICAgICAgLy8gTm8gd2lkZ2V0IGZvciBzaW5nbGUgbGluZSBibG9jayBjb21tZW50IHVubGVzcyByZWdpb24gb3IgdHJpcGxlIHN0YXJcbiAgICAgICAgICAgIGlmICghdGhpcy5zdGFydFJlZ2lvblJlLnRlc3QobGluZSkgJiYgIXRoaXMudHJpcGxlU3RhckJsb2NrQ29tbWVudFJlLnRlc3QobGluZSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgdmFyIGZ3ID0gdGhpcy5fZ2V0Rm9sZFdpZGdldEJhc2Uoc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpO1xuICAgIFxuICAgICAgICBpZiAoIWZ3ICYmIHRoaXMuc3RhcnRSZWdpb25SZS50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgcmV0dXJuIFwic3RhcnRcIjsgLy8gbGluZUNvbW1lbnRSZWdpb25TdGFydFxuICAgIFxuICAgICAgICByZXR1cm4gZnc7XG4gICAgfTtcblxuICAgIHRoaXMuZ2V0Rm9sZFdpZGdldFJhbmdlID0gZnVuY3Rpb24oc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3csIGZvcmNlTXVsdGlsaW5lKSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5zdGFydFJlZ2lvblJlLnRlc3QobGluZSkpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRDb21tZW50UmVnaW9uQmxvY2soc2Vzc2lvbiwgbGluZSwgcm93KTtcbiAgICAgICAgXG4gICAgICAgIHZhciBtYXRjaCA9IGxpbmUubWF0Y2godGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIpO1xuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIHZhciBpID0gbWF0Y2guaW5kZXg7XG5cbiAgICAgICAgICAgIGlmIChtYXRjaFsxXSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5vcGVuaW5nQnJhY2tldEJsb2NrKHNlc3Npb24sIG1hdGNoWzFdLCByb3csIGkpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIHJhbmdlID0gc2Vzc2lvbi5nZXRDb21tZW50Rm9sZFJhbmdlKHJvdywgaSArIG1hdGNoWzBdLmxlbmd0aCwgMSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChyYW5nZSAmJiAhcmFuZ2UuaXNNdWx0aUxpbmUoKSkge1xuICAgICAgICAgICAgICAgIGlmIChmb3JjZU11bHRpbGluZSkge1xuICAgICAgICAgICAgICAgICAgICByYW5nZSA9IHRoaXMuZ2V0U2VjdGlvblJhbmdlKHNlc3Npb24sIHJvdyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChmb2xkU3R5bGUgIT0gXCJhbGxcIilcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2UgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gcmFuZ2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZm9sZFN0eWxlID09PSBcIm1hcmtiZWdpblwiKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHZhciBtYXRjaCA9IGxpbmUubWF0Y2godGhpcy5mb2xkaW5nU3RvcE1hcmtlcik7XG4gICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgdmFyIGkgPSBtYXRjaC5pbmRleCArIG1hdGNoWzBdLmxlbmd0aDtcblxuICAgICAgICAgICAgaWYgKG1hdGNoWzFdKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNsb3NpbmdCcmFja2V0QmxvY2soc2Vzc2lvbiwgbWF0Y2hbMV0sIHJvdywgaSk7XG5cbiAgICAgICAgICAgIHJldHVybiBzZXNzaW9uLmdldENvbW1lbnRGb2xkUmFuZ2Uocm93LCBpLCAtMSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFxuICAgIHRoaXMuZ2V0U2VjdGlvblJhbmdlID0gZnVuY3Rpb24oc2Vzc2lvbiwgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgIHZhciBzdGFydEluZGVudCA9IGxpbmUuc2VhcmNoKC9cXFMvKTtcbiAgICAgICAgdmFyIHN0YXJ0Um93ID0gcm93O1xuICAgICAgICB2YXIgc3RhcnRDb2x1bW4gPSBsaW5lLmxlbmd0aDtcbiAgICAgICAgcm93ID0gcm93ICsgMTtcbiAgICAgICAgdmFyIGVuZFJvdyA9IHJvdztcbiAgICAgICAgdmFyIG1heFJvdyA9IHNlc3Npb24uZ2V0TGVuZ3RoKCk7XG4gICAgICAgIHdoaWxlICgrK3JvdyA8IG1heFJvdykge1xuICAgICAgICAgICAgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICAgICAgdmFyIGluZGVudCA9IGxpbmUuc2VhcmNoKC9cXFMvKTtcbiAgICAgICAgICAgIGlmIChpbmRlbnQgPT09IC0xKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgaWYgIChzdGFydEluZGVudCA+IGluZGVudClcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIHZhciBzdWJSYW5nZSA9IHRoaXMuZ2V0Rm9sZFdpZGdldFJhbmdlKHNlc3Npb24sIFwiYWxsXCIsIHJvdyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChzdWJSYW5nZSkge1xuICAgICAgICAgICAgICAgIGlmIChzdWJSYW5nZS5zdGFydC5yb3cgPD0gc3RhcnRSb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzdWJSYW5nZS5pc011bHRpTGluZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJvdyA9IHN1YlJhbmdlLmVuZC5yb3c7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzdGFydEluZGVudCA9PSBpbmRlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZW5kUm93ID0gcm93O1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gbmV3IFJhbmdlKHN0YXJ0Um93LCBzdGFydENvbHVtbiwgZW5kUm93LCBzZXNzaW9uLmdldExpbmUoZW5kUm93KS5sZW5ndGgpO1xuICAgIH07XG4gICAgXG4gICAgLyoqXG4gICAgICogZ2V0cyBjb21tZW50IHJlZ2lvbiBibG9jayB3aXRoIGVuZCByZWdpb24gYXNzdW1lZCB0byBiZSBzdGFydCBvZiBjb21tZW50IGluIGFueSBjc3R5bGUgbW9kZSBvciBTUUwgbW9kZSAoLS0pIHdoaWNoIGluaGVyaXRzIGZyb20gdGhpcy5cbiAgICAgKiBUaGVyZSBtYXkgb3B0aW9uYWxseSBiZSBhIHBvdW5kIHN5bWJvbCBiZWZvcmUgdGhlIHJlZ2lvbi9lbmRyZWdpb24gc3RhdGVtZW50XG4gICAgICovXG4gICAgdGhpcy5nZXRDb21tZW50UmVnaW9uQmxvY2sgPSBmdW5jdGlvbihzZXNzaW9uLCBsaW5lLCByb3cpIHtcbiAgICAgICAgdmFyIHN0YXJ0Q29sdW1uID0gbGluZS5zZWFyY2goL1xccyokLyk7XG4gICAgICAgIHZhciBtYXhSb3cgPSBzZXNzaW9uLmdldExlbmd0aCgpO1xuICAgICAgICB2YXIgc3RhcnRSb3cgPSByb3c7XG4gICAgICAgIFxuICAgICAgICB2YXIgcmUgPSAvXlxccyooPzpcXC9cXCp8XFwvXFwvfC0tKSM/KGVuZCk/cmVnaW9uXFxiLztcbiAgICAgICAgdmFyIGRlcHRoID0gMTtcbiAgICAgICAgd2hpbGUgKCsrcm93IDwgbWF4Um93KSB7XG4gICAgICAgICAgICBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgICAgICB2YXIgbSA9IHJlLmV4ZWMobGluZSk7XG4gICAgICAgICAgICBpZiAoIW0pIGNvbnRpbnVlO1xuICAgICAgICAgICAgaWYgKG1bMV0pIGRlcHRoLS07XG4gICAgICAgICAgICBlbHNlIGRlcHRoKys7XG5cbiAgICAgICAgICAgIGlmICghZGVwdGgpIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGVuZFJvdyA9IHJvdztcbiAgICAgICAgaWYgKGVuZFJvdyA+IHN0YXJ0Um93KSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFJhbmdlKHN0YXJ0Um93LCBzdGFydENvbHVtbiwgZW5kUm93LCBsaW5lLmxlbmd0aCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG59KS5jYWxsKEZvbGRNb2RlLnByb3RvdHlwZSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIEphdmFTY3JpcHRNb2RlID0gcmVxdWlyZShcIi4vamF2YXNjcmlwdFwiKS5Nb2RlO1xudmFyIEdvYnN0b25lc0hpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vZ29ic3RvbmVzX2hpZ2hsaWdodF9ydWxlc1wiKS5Hb2JzdG9uZXNIaWdobGlnaHRSdWxlcztcblxudmFyIE1vZGUgPSBmdW5jdGlvbigpIHtcbiAgICBKYXZhU2NyaXB0TW9kZS5jYWxsKHRoaXMpO1xuICAgIHRoaXMuSGlnaGxpZ2h0UnVsZXMgPSBHb2JzdG9uZXNIaWdobGlnaHRSdWxlcztcbiAgICB0aGlzLiRiZWhhdmlvdXIgPSB0aGlzLiRkZWZhdWx0QmVoYXZpb3VyO1xufTtcbm9vcC5pbmhlcml0cyhNb2RlLCBKYXZhU2NyaXB0TW9kZSk7XG5cbihmdW5jdGlvbigpIHtcblxuICAgIHRoaXMuY3JlYXRlV29ya2VyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG5cbiAgICB0aGlzLiRpZCA9IFwiYWNlL21vZGUvZ29ic3RvbmVzXCI7XG4gICAgdGhpcy5zbmlwcGV0RmlsZUlkID0gXCJhY2Uvc25pcHBldHMvZ29ic3RvbmVzXCI7XG59KS5jYWxsKE1vZGUucHJvdG90eXBlKTtcblxuZXhwb3J0cy5Nb2RlID0gTW9kZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xuXG52YXIgR29ic3RvbmVzSGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbigpIHtcblxuICB2YXIgZGVmaW5pdGlvbnMgPSB7XG4gICAgc3RhbmRhcmQ6IFwicHJvZ3JhbXxwcm9jZWR1cmV8ZnVuY3Rpb258aW50ZXJhY3RpdmV8cmV0dXJufGxldFwiLFxuICAgIHR5cGU6IFwidHlwZXxpc3x2YXJpYW50fHJlY29yZHxmaWVsZHxjYXNlXCJcbiAgfTtcblxuICB2YXIgY29udHJvbCA9IHtcbiAgICBjb21tYW5kczoge1xuICAgICAgcmVwZXRpdGlvbnM6IFwicmVwZWF0fHdoaWxlfGZvcmVhY2h8aW5cIixcbiAgICAgIGFsdGVybmF0aXZlczogXCJpZnxlbHNlaWZ8ZWxzZXxzd2l0Y2hcIlxuICAgIH0sXG4gICAgZXhwcmVzc2lvbnM6IHtcbiAgICAgIGFsdGVybmF0aXZlczogXCJjaG9vc2V8d2hlbnxvdGhlcndpc2V8bWF0Y2hpbmd8c2VsZWN0fG9uXCJcbiAgICB9XG4gIH07XG5cbiAgdmFyIHZhbHVlcyA9IHtcbiAgICBjb2xvcnM6IFwiVmVyZGV8Um9qb3xBenVsfE5lZ3JvXCIsXG4gICAgY2FyZGluYWxzOiBcIk5vcnRlfFN1cnxFc3RlfE9lc3RlXCIsXG4gICAgYm9vbGVhbnM6IFwiVHJ1ZXxGYWxzZVwiLFxuICAgIG51bWJlcnM6IC8oWy1dPykoWzAtOV0rKVxcYi8sXG4gICAgc3RyaW5nczogJ1tcIl0oPzooPzpcXFxcXFxcXC4pfCg/OlteXCJcXFxcXFxcXF0pKSo/W1wiXSdcbiAgfTtcblxuICB2YXIgcHJpbWl0aXZlcyA9IHtcbiAgICBjb21tYW5kczogXCJQb25lcnxTYWNhcnxNb3ZlcnxJckFsQm9yZGV8VmFjaWFyVGFibGVyb3xCT09NXCIsXG4gICAgZXhwcmVzc2lvbnM6IFwibnJvQm9saXRhc3xoYXlCb2xpdGFzfHB1ZWRlTW92ZXJ8XCIrXG4gICAgICAgICAgICAgICAgICBcInNpZ3VpZW50ZXxwcmV2aW98b3B1ZXN0b3xcIitcbiAgICAgICAgICAgICAgICAgIFwibWluQm9vbHxtYXhCb29sfG1pbkRpcnxtYXhEaXJ8bWluQ29sb3J8bWF4Q29sb3J8XCIrXG4gICAgICAgICAgICAgICAgICBcInByaW1lcm98c2luRWxQcmltZXJvfGVzVmFjw61hfFwiK1xuICAgICAgICAgICAgICAgICAgXCJib29tXCIsXG4gICAga2V5czogXCJLX0F8S19CfEtfQ3xLX0R8S19FfEtfRnxLX0d8S19HfEtfSHxLX0l8S19KfEtfS3xLX0x8S19NfEtfTnxLX8ORfFwiK1xuICAgICAgXCJLX098S19QfEtfUXxLX1J8S19TfEtfVHxLX1V8S19WfEtfV3xLX1h8S19ZfEtfWnxcIitcbiAgICAgIFwiS18wfEtfMXxLXzJ8S18zfEtfNHxLXzV8S182fEtfN3xLXzh8S185fFwiK1xuICAgICAgXCJLX0YxfEtfRjJ8S19GM3xLX0Y0fEtfRjV8S19GNnxLX0Y3fEtfRjh8S19GOXxLX0YxMHxLX0YxMXxLXzEyfFwiK1xuICAgICAgXCJLX1VQfEtfRE9XTnxLX0xFRlR8S19SSUdIVHxLX1JFVFVSTnxLX0JBQ0tTUEFDRXxLX1RBQnxLX1NQQUNFfEtfRVNDQVBFXCIrXG5cbiAgICAgIFwiS19DVFJMX0F8S19DVFJMX0J8S19DVFJMX0N8S19DVFJMX0R8S19DVFJMX0V8S19DVFJMX0Z8S19DVFJMX0d8S19DVFJMX0d8XCIrXG4gICAgICBcIktfQ1RSTF9IfEtfQ1RSTF9JfEtfQ1RSTF9KfEtfQ1RSTF9LfEtfQ1RSTF9MfEtfQ1RSTF9NfEtfQ1RSTF9OfEtfQ1RSTF/DkXxcIitcbiAgICAgIFwiS19DVFJMX098S19DVFJMX1B8S19DVFJMX1F8S19DVFJMX1J8S19DVFJMX1N8S19DVFJMX1R8S19DVFJMX1V8S19DVFJMX1Z8XCIrXG4gICAgICBcIktfQ1RSTF9XfEtfQ1RSTF9YfEtfQ1RSTF9ZfEtfQ1RSTF9afFwiK1xuICAgICAgXCJLX0NUUkxfMHxLX0NUUkxfMXxLX0NUUkxfMnxLX0NUUkxfM3xLX0NUUkxfNHxLX0NUUkxfNXxLX0NUUkxfNnxLX0NUUkxfN3xLX0NUUkxfOHxLX0NUUkxfOXxcIitcbiAgICAgIFwiS19DVFJMX0YxfEtfQ1RSTF9GMnxLX0NUUkxfRjN8S19DVFJMX0Y0fEtfQ1RSTF9GNXxLX0NUUkxfRjZ8S19DVFJMX0Y3fFwiK1xuICAgICAgXCJLX0NUUkxfRjh8S19DVFJMX0Y5fEtfQ1RSTF9GMTB8S19DVFJMX0YxMXxLX0NUUkxfRjEyfFwiK1xuICAgICAgXCJLX0NUUkxfVVB8S19DVFJMX0RPV058S19DVFJMX0xFRlR8S19DVFJMX1JJR0hUfEtfQ1RSTF9SRVRVUk58XCIrXG4gICAgICBcIktfQ1RSTF9CQUNLU1BBQ0V8S19DVFJMX1RBQnxLX0NUUkxfU1BBQ0V8S19DVFJMX0VTQ0FQRVwiK1xuXG4gICAgICBcIktfQUxUX0F8S19BTFRfQnxLX0FMVF9DfEtfQUxUX0R8S19BTFRfRXxLX0FMVF9GfEtfQUxUX0d8S19BTFRfR3xLX0FMVF9IfFwiK1xuICAgICAgXCJLX0FMVF9JfEtfQUxUX0p8S19BTFRfS3xLX0FMVF9MfEtfQUxUX018S19BTFRfTnxLX0FMVF/DkXxLX0FMVF9PfEtfQUxUX1B8XCIrXG4gICAgICBcIktfQUxUX1F8S19BTFRfUnxLX0FMVF9TfEtfQUxUX1R8S19BTFRfVXxLX0FMVF9WfEtfQUxUX1d8S19BTFRfWHxLX0FMVF9ZfEtfQUxUX1p8XCIrXG4gICAgICBcIktfQUxUXzB8S19BTFRfMXxLX0FMVF8yfEtfQUxUXzN8S19BTFRfNHxLX0FMVF81fEtfQUxUXzZ8S19BTFRfN3xLX0FMVF84fEtfQUxUXzl8XCIrXG4gICAgICBcIktfQUxUX0YxfEtfQUxUX0YyfEtfQUxUX0YzfEtfQUxUX0Y0fEtfQUxUX0Y1fEtfQUxUX0Y2fEtfQUxUX0Y3fEtfQUxUX0Y4fFwiK1xuICAgICAgXCJLX0FMVF9GOXxLX0FMVF9GMTB8S19BTFRfRjExfEtfQUxUX0YxMnxcIitcbiAgICAgIFwiS19BTFRfVVB8S19BTFRfRE9XTnxLX0FMVF9MRUZUfEtfQUxUX1JJR0hUfEtfQUxUX1JFVFVSTnxLX0FMVF9CQUNLU1BBQ0V8XCIrXG4gICAgICBcIktfQUxUX1RBQnxLX0FMVF9TUEFDRXxLX0FMVF9FU0NBUEVcIitcblxuICAgICAgXCJLX1NISUZUX0F8S19TSElGVF9CfEtfU0hJRlRfQ3xLX1NISUZUX0R8S19TSElGVF9FfEtfU0hJRlRfRnxLX1NISUZUX0d8XCIrXG4gICAgICBcIktfU0hJRlRfR3xLX1NISUZUX0h8S19TSElGVF9JfEtfU0hJRlRfSnxLX1NISUZUX0t8S19TSElGVF9MfEtfU0hJRlRfTXxcIitcbiAgICAgIFwiS19TSElGVF9OfEtfU0hJRlRfw5F8S19TSElGVF9PfEtfU0hJRlRfUHxLX1NISUZUX1F8S19TSElGVF9SfEtfU0hJRlRfU3xcIitcbiAgICAgIFwiS19TSElGVF9UfEtfU0hJRlRfVXxLX1NISUZUX1Z8S19TSElGVF9XfEtfU0hJRlRfWHxLX1NISUZUX1l8S19TSElGVF9afFwiK1xuICAgICAgXCJLX1NISUZUXzB8S19TSElGVF8xfEtfU0hJRlRfMnxLX1NISUZUXzN8S19TSElGVF80fEtfU0hJRlRfNXxLX1NISUZUXzZ8XCIrXG4gICAgICBcIktfU0hJRlRfN3xLX1NISUZUXzh8S19TSElGVF85fFwiK1xuICAgICAgXCJLX1NISUZUX0YxfEtfU0hJRlRfRjJ8S19TSElGVF9GM3xLX1NISUZUX0Y0fEtfU0hJRlRfRjV8S19TSElGVF9GNnxcIitcbiAgICAgIFwiS19TSElGVF9GN3xLX1NISUZUX0Y4fEtfU0hJRlRfRjl8S19TSElGVF9GMTB8S19TSElGVF9GMTF8S19TSElGVF9GMTJ8XCIrXG4gICAgICBcIktfU0hJRlRfVVB8S19TSElGVF9ET1dOfEtfU0hJRlRfTEVGVHxLX1NISUZUX1JJR0hUfEtfU0hJRlRfUkVUVVJOfFwiK1xuICAgICAgXCJLX1NISUZUX0JBQ0tTUEFDRXxLX1NISUZUX1RBQnxLX1NISUZUX1NQQUNFfEtfU0hJRlRfRVNDQVBFXCIrXG5cbiAgICAgIFwiS19DVFJMX0FMVF9BfEtfQ1RSTF9BTFRfQnxLX0NUUkxfQUxUX0N8S19DVFJMX0FMVF9EfEtfQ1RSTF9BTFRfRXxcIitcbiAgICAgIFwiS19DVFJMX0FMVF9GfEtfQ1RSTF9BTFRfR3xLX0NUUkxfQUxUX0d8S19DVFJMX0FMVF9IfEtfQ1RSTF9BTFRfSXxcIitcbiAgICAgIFwiS19DVFJMX0FMVF9KfEtfQ1RSTF9BTFRfS3xLX0NUUkxfQUxUX0x8S19DVFJMX0FMVF9NfEtfQ1RSTF9BTFRfTnxcIitcbiAgICAgIFwiS19DVFJMX0FMVF/DkXxLX0NUUkxfQUxUX098S19DVFJMX0FMVF9QfEtfQ1RSTF9BTFRfUXxLX0NUUkxfQUxUX1J8XCIrXG4gICAgICBcIktfQ1RSTF9BTFRfU3xLX0NUUkxfQUxUX1R8S19DVFJMX0FMVF9VfEtfQ1RSTF9BTFRfVnxLX0NUUkxfQUxUX1d8XCIrXG4gICAgICBcIktfQ1RSTF9BTFRfWHxLX0NUUkxfQUxUX1l8S19DVFJMX0FMVF9afFwiK1xuICAgICAgXCJLX0NUUkxfQUxUXzB8S19DVFJMX0FMVF8xfEtfQ1RSTF9BTFRfMnxLX0NUUkxfQUxUXzN8S19DVFJMX0FMVF80fFwiK1xuICAgICAgXCJLX0NUUkxfQUxUXzV8S19DVFJMX0FMVF82fEtfQ1RSTF9BTFRfN3xLX0NUUkxfQUxUXzh8S19DVFJMX0FMVF85fFwiK1xuICAgICAgXCJLX0NUUkxfQUxUX0YxfEtfQ1RSTF9BTFRfRjJ8S19DVFJMX0FMVF9GM3xLX0NUUkxfQUxUX0Y0fEtfQ1RSTF9BTFRfRjV8XCIrXG4gICAgICBcIktfQ1RSTF9BTFRfRjZ8S19DVFJMX0FMVF9GN3xLX0NUUkxfQUxUX0Y4fEtfQ1RSTF9BTFRfRjl8S19DVFJMX0FMVF9GMTB8XCIrXG4gICAgICBcIktfQ1RSTF9BTFRfRjExfEtfQ1RSTF9BTFRfRjEyfFwiK1xuICAgICAgXCJLX0NUUkxfQUxUX1VQfEtfQ1RSTF9BTFRfRE9XTnxLX0NUUkxfQUxUX0xFRlR8S19DVFJMX0FMVF9SSUdIVHxcIitcbiAgICAgIFwiS19DVFJMX0FMVF9SRVRVUk58S19DVFJMX0FMVF9CQUNLU1BBQ0V8S19DVFJMX0FMVF9UQUJ8S19DVFJMX0FMVF9TUEFDRXxLX0NUUkxfQUxUX0VTQ0FQRVwiK1xuXG4gICAgICBcIktfQ1RSTF9TSElGVF9BfEtfQ1RSTF9TSElGVF9CfEtfQ1RSTF9TSElGVF9DfEtfQ1RSTF9TSElGVF9EfEtfQ1RSTF9TSElGVF9FfFwiK1xuICAgICAgXCJLX0NUUkxfU0hJRlRfRnxLX0NUUkxfU0hJRlRfR3xLX0NUUkxfU0hJRlRfR3xLX0NUUkxfU0hJRlRfSHxLX0NUUkxfU0hJRlRfSXxcIitcbiAgICAgIFwiS19DVFJMX1NISUZUX0p8S19DVFJMX1NISUZUX0t8S19DVFJMX1NISUZUX0x8S19DVFJMX1NISUZUX018S19DVFJMX1NISUZUX058XCIrXG4gICAgICBcIktfQ1RSTF9TSElGVF/DkXxLX0NUUkxfU0hJRlRfT3xLX0NUUkxfU0hJRlRfUHxLX0NUUkxfU0hJRlRfUXxLX0NUUkxfU0hJRlRfUnxcIitcbiAgICAgIFwiS19DVFJMX1NISUZUX1N8S19DVFJMX1NISUZUX1R8S19DVFJMX1NISUZUX1V8S19DVFJMX1NISUZUX1Z8S19DVFJMX1NISUZUX1d8XCIrXG4gICAgICBcIktfQ1RSTF9TSElGVF9YfEtfQ1RSTF9TSElGVF9ZfEtfQ1RSTF9TSElGVF9afFwiK1xuICAgICAgXCJLX0NUUkxfU0hJRlRfMHxLX0NUUkxfU0hJRlRfMXxLX0NUUkxfU0hJRlRfMnxLX0NUUkxfU0hJRlRfM3xLX0NUUkxfU0hJRlRfNHxcIitcbiAgICAgIFwiS19DVFJMX1NISUZUXzV8S19DVFJMX1NISUZUXzZ8S19DVFJMX1NISUZUXzd8S19DVFJMX1NISUZUXzh8S19DVFJMX1NISUZUXzl8XCIrXG4gICAgICBcIktfQ1RSTF9TSElGVF9GMXxLX0NUUkxfU0hJRlRfRjJ8S19DVFJMX1NISUZUX0YzfEtfQ1RSTF9TSElGVF9GNHxcIitcbiAgICAgIFwiS19DVFJMX1NISUZUX0Y1fEtfQ1RSTF9TSElGVF9GNnxLX0NUUkxfU0hJRlRfRjd8S19DVFJMX1NISUZUX0Y4fFwiK1xuICAgICAgXCJLX0NUUkxfU0hJRlRfOXxLX0NUUkxfU0hJRlRfMTB8S19DVFJMX1NISUZUXzExfEtfQ1RSTF9TSElGVF8xMnxcIitcbiAgICAgIFwiS19DVFJMX1NISUZUX1VQfEtfQ1RSTF9TSElGVF9ET1dOfEtfQ1RSTF9TSElGVF9MRUZUfEtfQ1RSTF9TSElGVF9SSUdIVHxcIitcbiAgICAgIFwiS19DVFJMX1NISUZUX1JFVFVSTnxLX0NUUkxfU0hJRlRfQkFDS1NQQUNFfEtfQ1RSTF9TSElGVF9UQUJ8XCIrXG4gICAgICBcIktfQ1RSTF9TSElGVF9TUEFDRXxLX0NUUkxfU0hJRlRfRVNDQVBFXCIrXG5cbiAgICAgIFwiS19BTFRfU0hJRlRfQXxLX0FMVF9TSElGVF9CfEtfQUxUX1NISUZUX0N8S19BTFRfU0hJRlRfRHxLX0FMVF9TSElGVF9FfFwiK1xuICAgICAgXCJLX0FMVF9TSElGVF9GfEtfQUxUX1NISUZUX0d8S19BTFRfU0hJRlRfR3xLX0FMVF9TSElGVF9IfEtfQUxUX1NISUZUX0l8XCIrXG4gICAgICBcIktfQUxUX1NISUZUX0p8S19BTFRfU0hJRlRfS3xLX0FMVF9TSElGVF9MfEtfQUxUX1NISUZUX018S19BTFRfU0hJRlRfTnxcIitcbiAgICAgIFwiS19BTFRfU0hJRlRfw5F8S19BTFRfU0hJRlRfT3xLX0FMVF9TSElGVF9QfEtfQUxUX1NISUZUX1F8S19BTFRfU0hJRlRfUnxcIitcbiAgICAgIFwiS19BTFRfU0hJRlRfU3xLX0FMVF9TSElGVF9UfEtfQUxUX1NISUZUX1V8S19BTFRfU0hJRlRfVnxLX0FMVF9TSElGVF9XfFwiK1xuICAgICAgXCJLX0FMVF9TSElGVF9YfEtfQUxUX1NISUZUX1l8S19BTFRfU0hJRlRfWnxcIitcbiAgICAgIFwiS19BTFRfU0hJRlRfMHxLX0FMVF9TSElGVF8xfEtfQUxUX1NISUZUXzJ8S19BTFRfU0hJRlRfM3xLX0FMVF9TSElGVF80fFwiK1xuICAgICAgXCJLX0FMVF9TSElGVF81fEtfQUxUX1NISUZUXzZ8S19BTFRfU0hJRlRfN3xLX0FMVF9TSElGVF84fEtfQUxUX1NISUZUXzl8XCIrXG4gICAgICBcIktfQUxUX1NISUZUX0YxfEtfQUxUX1NISUZUX0YyfEtfQUxUX1NISUZUX0YzfEtfQUxUX1NISUZUX0Y0fFwiK1xuICAgICAgXCJLX0FMVF9TSElGVF9GNXxLX0FMVF9TSElGVF9GNnxLX0FMVF9TSElGVF9GN3xLX0FMVF9TSElGVF9GOHxcIitcbiAgICAgIFwiS19BTFRfU0hJRlRfOXxLX0FMVF9TSElGVF8xMHxLX0FMVF9TSElGVF8xMXxLX0FMVF9TSElGVF8xMnxcIitcbiAgICAgIFwiS19BTFRfU0hJRlRfVVB8S19BTFRfU0hJRlRfRE9XTnxLX0FMVF9TSElGVF9MRUZUfEtfQUxUX1NISUZUX1JJR0hUfFwiK1xuICAgICAgXCJLX0FMVF9TSElGVF9SRVRVUk58S19BTFRfU0hJRlRfQkFDS1NQQUNFfEtfQUxUX1NISUZUX1RBQnxLX0FMVF9TSElGVF9TUEFDRXxcIitcbiAgICAgIFwiS19BTFRfU0hJRlRfRVNDQVBFXCIrXG5cbiAgICAgIFwiS19DVFJMX0FMVF9TSElGVF9BfEtfQ1RSTF9BTFRfU0hJRlRfQnxLX0NUUkxfQUxUX1NISUZUX0N8S19DVFJMX0FMVF9TSElGVF9EfFwiK1xuICAgICAgXCJLX0NUUkxfQUxUX1NISUZUX0V8S19DVFJMX0FMVF9TSElGVF9GfEtfQ1RSTF9BTFRfU0hJRlRfR3xLX0NUUkxfQUxUX1NISUZUX0d8XCIrXG4gICAgICBcIktfQ1RSTF9BTFRfU0hJRlRfSHxLX0NUUkxfQUxUX1NISUZUX0l8S19DVFJMX0FMVF9TSElGVF9KfEtfQ1RSTF9BTFRfU0hJRlRfS3xcIitcbiAgICAgIFwiS19DVFJMX0FMVF9TSElGVF9MfEtfQ1RSTF9BTFRfU0hJRlRfTXxLX0NUUkxfQUxUX1NISUZUX058S19DVFJMX0FMVF9TSElGVF/DkXxcIitcbiAgICAgIFwiS19DVFJMX0FMVF9TSElGVF9PfEtfQ1RSTF9BTFRfU0hJRlRfUHxLX0NUUkxfQUxUX1NISUZUX1F8S19DVFJMX0FMVF9TSElGVF9SfFwiK1xuICAgICAgXCJLX0NUUkxfQUxUX1NISUZUX1N8S19DVFJMX0FMVF9TSElGVF9UfEtfQ1RSTF9BTFRfU0hJRlRfVXxLX0NUUkxfQUxUX1NISUZUX1Z8XCIrXG4gICAgICBcIktfQ1RSTF9BTFRfU0hJRlRfV3xLX0NUUkxfQUxUX1NISUZUX1h8S19DVFJMX0FMVF9TSElGVF9ZfEtfQ1RSTF9BTFRfU0hJRlRfWnxcIitcbiAgICAgIFwiS19DVFJMX0FMVF9TSElGVF8wfEtfQ1RSTF9BTFRfU0hJRlRfMXxLX0NUUkxfQUxUX1NISUZUXzJ8S19DVFJMX0FMVF9TSElGVF8zfFwiK1xuICAgICAgXCJLX0NUUkxfQUxUX1NISUZUXzR8S19DVFJMX0FMVF9TSElGVF81fEtfQ1RSTF9BTFRfU0hJRlRfNnxLX0NUUkxfQUxUX1NISUZUXzd8XCIrXG4gICAgICBcIktfQ1RSTF9BTFRfU0hJRlRfOHxLX0NUUkxfQUxUX1NISUZUXzl8XCIrXG4gICAgICBcIktfQ1RSTF9BTFRfU0hJRlRfRjF8S19DVFJMX0FMVF9TSElGVF9GMnxLX0NUUkxfQUxUX1NISUZUX0YzfEtfQ1RSTF9BTFRfU0hJRlRfRjR8XCIrXG4gICAgICBcIktfQ1RSTF9BTFRfU0hJRlRfRjV8S19DVFJMX0FMVF9TSElGVF9GNnxLX0NUUkxfQUxUX1NISUZUX0Y3fEtfQ1RSTF9BTFRfU0hJRlRfRjh8XCIrXG4gICAgICBcIktfQ1RSTF9BTFRfU0hJRlRfRjl8S19DVFJMX0FMVF9TSElGVF9GMTB8S19DVFJMX0FMVF9TSElGVF9GMTF8S19DVFJMX0FMVF9TSElGVF9GMTJ8XCIrXG4gICAgICBcIktfQ1RSTF9BTFRfU0hJRlRfVVB8S19DVFJMX0FMVF9TSElGVF9ET1dOfEtfQ1RSTF9BTFRfU0hJRlRfTEVGVHxLX0NUUkxfQUxUX1NISUZUX1JJR0hUfFwiK1xuICAgICAgXCJLX0NUUkxfQUxUX1NISUZUX1JFVFVSTnxLX0NUUkxfQUxUX1NISUZUX0JBQ0tTUEFDRXxLX0NUUkxfQUxUX1NISUZUX1RBQnxcIitcbiAgICAgIFwiS19DVFJMX0FMVF9TSElGVF9TUEFDRXxLX0NUUkxfQUxUX1NISUZUX0VTQ0FQRVwiXG4gIH07XG5cbiAgdmFyIG9wZXJhdGlvbnMgPSB7XG4gICAgY29tbWFuZHM6IFwiOj1cIixcbiAgICBleHByZXNzaW9uczoge1xuICAgICAgbnVtZXJpYzogXCJcXFxcK3xcXFxcLXxcXFxcKnxcXFxcXnxkaXZ8bW9kXCIsXG4gICAgICBjb21wYXJpc29uOiBcIj49fDw9fD09fFxcXFwvPXw+fDxcIixcbiAgICAgIGJvb2xlYW46IFwiXFxcXHxcXFxcfHwmJnxub3RcIixcbiAgICAgIG90aGVyOiBcIlxcXFwrXFxcXCt8PFxcXFwtfFxcXFxbfFxcXFxdfFxcXFxffFxcXFwtPlwiXG4gICAgfVxuICB9O1xuXG4gIHZhciBjb21tZW50cyA9IHtcbiAgICBsaW5lOiB7XG4gICAgICBkb3VibGVfc2xhc2g6IFwiXFxcXC9cXFxcLy4qJFwiLFxuICAgICAgZG91YmxlX2Rhc2g6IFwiXFxcXC1cXFxcLS4qJFwiLFxuICAgICAgbnVtYmVyX3NpZ246IFwiIy4qJFwiXG4gICAgfSxcbiAgICBibG9jazogeyBzdGFydDogXCJcXFxcL1xcXFwqXCIsIGVuZDogXCJcXFxcKlxcXFwvXCIgfSxcbiAgICBibG9ja19hbHQ6IHsgc3RhcnQ6IFwiXFxcXHtcXFxcLVwiLCBlbmQ6IFwiXFxcXC1cXFxcfVwiIH1cbiAgfTtcblxuICB0aGlzLiRydWxlcyA9IHtcbiAgICBcInN0YXJ0XCIgOiBbXG4gICAgICAvLyBjb21tZW50c1xuICAgICAge1xuICAgICAgICB0b2tlbiA6IFwiY29tbWVudC5saW5lLmRvdWJsZS1zbGFzaC5nb2JzdG9uZXNcIixcbiAgICAgICAgcmVnZXggOiBjb21tZW50cy5saW5lLmRvdWJsZV9zbGFzaFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdG9rZW4gOiBcImNvbW1lbnQubGluZS5kb3VibGUtZGFzaC5nb2JzdG9uZXNcIixcbiAgICAgICAgcmVnZXggOiBjb21tZW50cy5saW5lLmRvdWJsZV9kYXNoXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0b2tlbiA6IFwiY29tbWVudC5saW5lLm51bWJlci1zaWduLmdvYnN0b25lc1wiLFxuICAgICAgICByZWdleCA6IGNvbW1lbnRzLmxpbmUubnVtYmVyX3NpZ25cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRva2VuIDogXCJjb21tZW50LmJsb2NrLmRhc2gtYXN0ZXJpc2MuZ29ic3RvbmVzXCIsXG4gICAgICAgIHJlZ2V4IDogY29tbWVudHMuYmxvY2suc3RhcnQsXG4gICAgICAgIG5leHQgOiBcImJsb2NrX2NvbW1lbnRfZW5kXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRva2VuIDogXCJjb21tZW50LmJsb2NrLmJyYWNlLWRhc2guZ29ic3RvbmVzXCIsXG4gICAgICAgIHJlZ2V4IDogY29tbWVudHMuYmxvY2tfYWx0LnN0YXJ0LFxuICAgICAgICBuZXh0IDogXCJibG9ja19jb21tZW50X2FsdF9lbmRcIlxuICAgICAgfSxcbiAgICAgIC8vIG51bWJlcnNcbiAgICAgIHtcbiAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWMuZ29ic3RvbmVzXCIsXG4gICAgICAgIHJlZ2V4IDogdmFsdWVzLm51bWJlcnNcbiAgICAgIH0sXG4gICAgICAvLyBzdHJpbmdzXG4gICAgICB7XG4gICAgICAgIHRva2VuIDogXCJzdHJpbmcucXVvdGVkLmRvdWJsZS5nb2JzdG9uZXNcIixcbiAgICAgICAgcmVnZXggOiB2YWx1ZXMuc3RyaW5nc1xuICAgICAgfSxcbiAgICAgIC8vICBvcGVyYXRpb25zXG4gICAgICB7XG4gICAgICAgIHRva2VuIDogXCJrZXl3b3JkLm9wZXJhdG9yLm90aGVyLmdvYnN0b25lc1wiLFxuICAgICAgICByZWdleCA6IG9wZXJhdGlvbnMuZXhwcmVzc2lvbnMub3RoZXJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRva2VuIDogXCJrZXl3b3JkLm9wZXJhdG9yLm51bWVyaWMuZ29ic3RvbmVzXCIsXG4gICAgICAgIHJlZ2V4IDogb3BlcmF0aW9ucy5leHByZXNzaW9ucy5udW1lcmljXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0b2tlbiA6IFwia2V5d29yZC5vcGVyYXRvci5jb21wYXJlLmdvYnN0b25lc1wiLFxuICAgICAgICByZWdleCA6IG9wZXJhdGlvbnMuZXhwcmVzc2lvbnMuY29tcGFyaXNvblxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdG9rZW4gOiBcImtleXdvcmQub3BlcmF0b3IuYm9vbGVhbi5nb2JzdG9uZXNcIixcbiAgICAgICAgcmVnZXggOiBvcGVyYXRpb25zLmV4cHJlc3Npb25zLmJvb2xlYW5cbiAgICAgIH0sXG4gICAgICAvLyBrZXl3b3Jkc1xuICAgICAge1xuICAgICAgICB0b2tlbiA6IHRoaXMuY3JlYXRlS2V5d29yZE1hcHBlcih7XG4gICAgICAgICAgLy8gYmFzaWMgY29uc3RydWN0c1xuICAgICAgICAgIFwic3RvcmFnZS50eXBlLmRlZmluaXRpb25zLmdvYnN0b25lc1wiOiBkZWZpbml0aW9ucy5zdGFuZGFyZCxcbiAgICAgICAgICBcInN0b3JhZ2UudHlwZS50eXBlcy5nb2JzdG9uZXNcIjogZGVmaW5pdGlvbnMudHlwZSxcbiAgICAgICAgICBcImtleXdvcmQuY29udHJvbC5jb21tYW5kcy5yZXBldGl0aW9ucy5nb2JzdG9uZXNcIjogY29udHJvbC5jb21tYW5kcy5yZXBldGl0aW9ucyxcbiAgICAgICAgICBcImtleXdvcmQuY29udHJvbC5jb21tYW5kcy5hbHRlcm5hdGl2ZXMuZ29ic3RvbmVzXCI6IGNvbnRyb2wuY29tbWFuZHMuYWx0ZXJuYXRpdmVzLFxuICAgICAgICAgIFwia2V5d29yZC5jb250cm9sLmV4cHJlc3Npb25zLmFsdGVybmF0aXZlcy5nb2JzdG9uZXNcIjogY29udHJvbC5leHByZXNzaW9ucy5hbHRlcm5hdGl2ZXMsXG4gICAgICAgICAgLy8gdHlwZXNcbiAgICAgICAgICBcImNvbnN0YW50Lmxhbmd1YWdlLmNvbG9ycy5nb2JzdG9uZXNcIjp2YWx1ZXMuY29sb3JzLFxuICAgICAgICAgIFwiY29uc3RhbnQubGFuZ3VhZ2UuY2FyZGluYWxzLmdvYnN0b25lc1wiOiB2YWx1ZXMuY2FyZGluYWxzLFxuICAgICAgICAgIFwiY29uc3RhbnQubGFuZ3VhZ2UuYm9vbGVhbi5nb2JzdG9uZXNcIjogdmFsdWVzLmJvb2xlYW5zLFxuICAgICAgICAgIC8vIHByaW1pdGl2ZXNcbiAgICAgICAgICBcInN1cHBvcnQuZnVuY3Rpb24uZ29ic3RvbmVzXCI6IHByaW1pdGl2ZXMuY29tbWFuZHMsXG4gICAgICAgICAgXCJzdXBwb3J0LnZhcmlhYmxlLmdvYnN0b25lc1wiOiBwcmltaXRpdmVzLmV4cHJlc3Npb25zLFxuICAgICAgICAgIFwidmFyaWFibGUubGFuZ3VhZ2UuZ29ic3RvbmVzXCI6IHByaW1pdGl2ZXMua2V5c1xuICAgICAgfSwgXCJpZGVudGlmaWVyLmdvYnN0b25lc1wiKSxcbiAgICAgICAgcmVnZXggOiBcIlthLXpBLVpfJF1bYS16QS1aMC05XyRdKlxcXFxiXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRva2VuIDogXCJjb21tYS5nb2JzdG9uZXNcIixcbiAgICAgICAgcmVnZXggOiBcIixcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdG9rZW4gOiBcInNlbWljb2xvbi5nb2JzdG9uZXNcIixcbiAgICAgICAgcmVnZXggOiBcIjtcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdG9rZW4gOiBcImxwYXJlblwiLFxuICAgICAgICByZWdleCA6IFwiW1soe11cIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdG9rZW4gOiBcInJwYXJlblwiLFxuICAgICAgICByZWdleCA6IFwiW1xcXFxdKX1dXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRva2VuIDogXCJ0ZXh0XCIsXG4gICAgICAgIHJlZ2V4IDogXCJcXFxccytcIlxuICAgICAgfVxuICAgIF0sXG4gICAgXCJibG9ja19jb21tZW50X2VuZFwiOiBbe1xuICAgICAgICB0b2tlbiA6IFwiY29tbWVudC5ibG9jay5kYXNoLWFzdGVyaXNjLmdvYnN0b25lc1wiLFxuICAgICAgICByZWdleCA6IGNvbW1lbnRzLmJsb2NrLmVuZCxcbiAgICAgICAgbmV4dCA6IFwic3RhcnRcIlxuICAgICAgfSwge1xuICAgICAgICBkZWZhdWx0VG9rZW4gOiBcImNvbW1lbnQuYmxvY2suZGFzaC1hc3RlcmlzYy5nb2JzdG9uZXNcIlxuICAgICAgfVxuICAgIF0sXG4gICAgXCJibG9ja19jb21tZW50X2FsdF9lbmRcIjogW3tcbiAgICAgICAgdG9rZW4gOiBcImNvbW1lbnQuYmxvY2suYnJhY2UtZGFzaC5nb2JzdG9uZXNcIixcbiAgICAgICAgcmVnZXggOiBjb21tZW50cy5ibG9ja19hbHQuZW5kLFxuICAgICAgICBuZXh0IDogXCJzdGFydFwiXG4gICAgICB9LCB7XG4gICAgICAgIGRlZmF1bHRUb2tlbiA6IFwiY29tbWVudC5ibG9jay5icmFjZS1kYXNoLmdvYnN0b25lc1wiXG4gICAgICB9XG4gICAgXVxuICB9O1xufTtcblxub29wLmluaGVyaXRzKEdvYnN0b25lc0hpZ2hsaWdodFJ1bGVzLCBUZXh0SGlnaGxpZ2h0UnVsZXMpO1xuXG5leHBvcnRzLkdvYnN0b25lc0hpZ2hsaWdodFJ1bGVzID0gR29ic3RvbmVzSGlnaGxpZ2h0UnVsZXM7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRNb2RlID0gcmVxdWlyZShcIi4vdGV4dFwiKS5Nb2RlO1xudmFyIEphdmFTY3JpcHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL2phdmFzY3JpcHRfaGlnaGxpZ2h0X3J1bGVzXCIpLkphdmFTY3JpcHRIaWdobGlnaHRSdWxlcztcbnZhciBNYXRjaGluZ0JyYWNlT3V0ZGVudCA9IHJlcXVpcmUoXCIuL21hdGNoaW5nX2JyYWNlX291dGRlbnRcIikuTWF0Y2hpbmdCcmFjZU91dGRlbnQ7XG52YXIgV29ya2VyQ2xpZW50ID0gcmVxdWlyZShcIi4uL3dvcmtlci93b3JrZXJfY2xpZW50XCIpLldvcmtlckNsaWVudDtcbnZhciBDc3R5bGVCZWhhdmlvdXIgPSByZXF1aXJlKFwiLi9iZWhhdmlvdXIvY3N0eWxlXCIpLkNzdHlsZUJlaGF2aW91cjtcbnZhciBDU3R5bGVGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRpbmcvY3N0eWxlXCIpLkZvbGRNb2RlO1xuXG52YXIgTW9kZSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuSGlnaGxpZ2h0UnVsZXMgPSBKYXZhU2NyaXB0SGlnaGxpZ2h0UnVsZXM7XG5cbiAgICB0aGlzLiRvdXRkZW50ID0gbmV3IE1hdGNoaW5nQnJhY2VPdXRkZW50KCk7XG4gICAgdGhpcy4kYmVoYXZpb3VyID0gbmV3IENzdHlsZUJlaGF2aW91cigpO1xuICAgIHRoaXMuZm9sZGluZ1J1bGVzID0gbmV3IENTdHlsZUZvbGRNb2RlKCk7XG59O1xub29wLmluaGVyaXRzKE1vZGUsIFRleHRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5saW5lQ29tbWVudFN0YXJ0ID0gXCIvL1wiO1xuICAgIHRoaXMuYmxvY2tDb21tZW50ID0ge3N0YXJ0OiBcIi8qXCIsIGVuZDogXCIqL1wifTtcbiAgICB0aGlzLiRxdW90ZXMgPSB7J1wiJzogJ1wiJywgXCInXCI6IFwiJ1wiLCBcImBcIjogXCJgXCJ9O1xuICAgIHRoaXMuJHBhaXJRdW90ZXNBZnRlciA9IHtcbiAgICAgICAgXCJgXCI6IC9cXHcvXG4gICAgfTtcblxuICAgIHRoaXMuZ2V0TmV4dExpbmVJbmRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgbGluZSwgdGFiKSB7XG4gICAgICAgIHZhciBpbmRlbnQgPSB0aGlzLiRnZXRJbmRlbnQobGluZSk7XG5cbiAgICAgICAgdmFyIHRva2VuaXplZExpbmUgPSB0aGlzLmdldFRva2VuaXplcigpLmdldExpbmVUb2tlbnMobGluZSwgc3RhdGUpO1xuICAgICAgICB2YXIgdG9rZW5zID0gdG9rZW5pemVkTGluZS50b2tlbnM7XG4gICAgICAgIHZhciBlbmRTdGF0ZSA9IHRva2VuaXplZExpbmUuc3RhdGU7XG5cbiAgICAgICAgaWYgKHRva2Vucy5sZW5ndGggJiYgdG9rZW5zW3Rva2Vucy5sZW5ndGgtMV0udHlwZSA9PSBcImNvbW1lbnRcIikge1xuICAgICAgICAgICAgcmV0dXJuIGluZGVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdGF0ZSA9PSBcInN0YXJ0XCIgfHwgc3RhdGUgPT0gXCJub19yZWdleFwiKSB7XG4gICAgICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKC9eLiooPzpcXGJjYXNlXFxiLio6fFtcXHtcXChcXFtdKVxccyokLyk7XG4gICAgICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgICAgICBpbmRlbnQgKz0gdGFiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHN0YXRlID09IFwiZG9jLXN0YXJ0XCIpIHtcbiAgICAgICAgICAgIGlmIChlbmRTdGF0ZSA9PSBcInN0YXJ0XCIgfHwgZW5kU3RhdGUgPT0gXCJub19yZWdleFwiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKC9eXFxzKihcXC8/KVxcKi8pO1xuICAgICAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoWzFdKSB7XG4gICAgICAgICAgICAgICAgICAgIGluZGVudCArPSBcIiBcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaW5kZW50ICs9IFwiKiBcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpbmRlbnQ7XG4gICAgfTtcblxuICAgIHRoaXMuY2hlY2tPdXRkZW50ID0gZnVuY3Rpb24oc3RhdGUsIGxpbmUsIGlucHV0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRvdXRkZW50LmNoZWNrT3V0ZGVudChsaW5lLCBpbnB1dCk7XG4gICAgfTtcblxuICAgIHRoaXMuYXV0b091dGRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgZG9jLCByb3cpIHtcbiAgICAgICAgdGhpcy4kb3V0ZGVudC5hdXRvT3V0ZGVudChkb2MsIHJvdyk7XG4gICAgfTtcblxuICAgIHRoaXMuY3JlYXRlV29ya2VyID0gZnVuY3Rpb24oc2Vzc2lvbikge1xuICAgICAgICB2YXIgd29ya2VyID0gbmV3IFdvcmtlckNsaWVudChbXCJhY2VcIl0sIFwiYWNlL21vZGUvamF2YXNjcmlwdF93b3JrZXJcIiwgXCJKYXZhU2NyaXB0V29ya2VyXCIpO1xuICAgICAgICB3b3JrZXIuYXR0YWNoVG9Eb2N1bWVudChzZXNzaW9uLmdldERvY3VtZW50KCkpO1xuXG4gICAgICAgIHdvcmtlci5vbihcImFubm90YXRlXCIsIGZ1bmN0aW9uKHJlc3VsdHMpIHtcbiAgICAgICAgICAgIHNlc3Npb24uc2V0QW5ub3RhdGlvbnMocmVzdWx0cy5kYXRhKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgd29ya2VyLm9uKFwidGVybWluYXRlXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2Vzc2lvbi5jbGVhckFubm90YXRpb25zKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB3b3JrZXI7XG4gICAgfTtcblxuICAgIHRoaXMuJGlkID0gXCJhY2UvbW9kZS9qYXZhc2NyaXB0XCI7XG4gICAgdGhpcy5zbmlwcGV0RmlsZUlkID0gXCJhY2Uvc25pcHBldHMvamF2YXNjcmlwdFwiO1xufSkuY2FsbChNb2RlLnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTW9kZSA9IE1vZGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIFJhbmdlID0gcmVxdWlyZShcIi4uL3JhbmdlXCIpLlJhbmdlO1xuXG52YXIgTWF0Y2hpbmdCcmFjZU91dGRlbnQgPSBmdW5jdGlvbigpIHt9O1xuXG4oZnVuY3Rpb24oKSB7XG5cbiAgICB0aGlzLmNoZWNrT3V0ZGVudCA9IGZ1bmN0aW9uKGxpbmUsIGlucHV0KSB7XG4gICAgICAgIGlmICghIC9eXFxzKyQvLnRlc3QobGluZSkpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgcmV0dXJuIC9eXFxzKlxcfS8udGVzdChpbnB1dCk7XG4gICAgfTtcblxuICAgIHRoaXMuYXV0b091dGRlbnQgPSBmdW5jdGlvbihkb2MsIHJvdykge1xuICAgICAgICB2YXIgbGluZSA9IGRvYy5nZXRMaW5lKHJvdyk7XG4gICAgICAgIHZhciBtYXRjaCA9IGxpbmUubWF0Y2goL14oXFxzKlxcfSkvKTtcblxuICAgICAgICBpZiAoIW1hdGNoKSByZXR1cm4gMDtcblxuICAgICAgICB2YXIgY29sdW1uID0gbWF0Y2hbMV0ubGVuZ3RoO1xuICAgICAgICB2YXIgb3BlbkJyYWNlUG9zID0gZG9jLmZpbmRNYXRjaGluZ0JyYWNrZXQoe3Jvdzogcm93LCBjb2x1bW46IGNvbHVtbn0pO1xuXG4gICAgICAgIGlmICghb3BlbkJyYWNlUG9zIHx8IG9wZW5CcmFjZVBvcy5yb3cgPT0gcm93KSByZXR1cm4gMDtcblxuICAgICAgICB2YXIgaW5kZW50ID0gdGhpcy4kZ2V0SW5kZW50KGRvYy5nZXRMaW5lKG9wZW5CcmFjZVBvcy5yb3cpKTtcbiAgICAgICAgZG9jLnJlcGxhY2UobmV3IFJhbmdlKHJvdywgMCwgcm93LCBjb2x1bW4tMSksIGluZGVudCk7XG4gICAgfTtcblxuICAgIHRoaXMuJGdldEluZGVudCA9IGZ1bmN0aW9uKGxpbmUpIHtcbiAgICAgICAgcmV0dXJuIGxpbmUubWF0Y2goL15cXHMqLylbMF07XG4gICAgfTtcblxufSkuY2FsbChNYXRjaGluZ0JyYWNlT3V0ZGVudC5wcm90b3R5cGUpO1xuXG5leHBvcnRzLk1hdGNoaW5nQnJhY2VPdXRkZW50ID0gTWF0Y2hpbmdCcmFjZU91dGRlbnQ7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=