"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[2613],{

/***/ 93887:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



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

/***/ 92613:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/*
  THIS FILE WAS GENERATED BY 'ligand' USING 'mode.js'
*/



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var HighlightRules = (__webpack_require__(57762)/* .IonHighlightRules */ .S);
var MatchingBraceOutdent = (__webpack_require__(28670).MatchingBraceOutdent);
var CStyleFoldMode = (__webpack_require__(93887)/* .FoldMode */ .l);

var Mode = function () {
    this.HighlightRules = HighlightRules;
    this.$outdent = new MatchingBraceOutdent();
    this.$behaviour = this.$defaultBehaviour;
    this.foldingRules = new CStyleFoldMode();
};
oop.inherits(Mode, TextMode);

(function () {

    this.lineCommentStart = "//";
    this.blockComment = {
        start: "/*",
        end: "*/"
    };

    this.getNextLineIndent = function (state, line, tab) {
        var indent = this.$getIndent(line);

        if (state == "start") {
            var match = line.match(/^.*[\{\(\[]\s*$/);
            if (match) {
                indent += tab;
            }
        }

        return indent;
    };

    this.checkOutdent = function (state, line, input) {
        return this.$outdent.checkOutdent(line, input);
    };

    this.autoOutdent = function (state, doc, row) {
        this.$outdent.autoOutdent(doc, row);
    };

    this.$id = "ace/mode/ion";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 57762:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/*
  THIS FILE WAS GENERATED BY 'ligand' USING 'mode_highlight_rules.js'
*/

    

    var oop = __webpack_require__(2645);
    var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);


    var IonHighlightRules = function() {
        // constant.language.bool.ion
        var k_keywords_bool =
            "TRUE|FALSE";
        var k_bool = k_keywords_bool;

        // constant.language.null.ion
        var k_keywords_null =
            "NULL.NULL|NULL.BOOL|NULL.INT|NULL.FLOAT|NULL.DECIMAL|NULL.TIMESTAMP|NULL.STRING|NULL.SYMBOL|NULL.BLOB|NULL.CLOB|"
            +"NULL.STRUCT|NULL.LIST|NULL.SEXP|NULL";
        var k_null = k_keywords_null;


        var keywordMapper = this.createKeywordMapper({
            "constant.language.bool.ion": k_bool,
            "constant.language.null.ion": k_null
        }, "constant.other.symbol.identifier.ion", true);

        var keywordMapperRule = {
            token : keywordMapper,
            regex : "\\b\\w+(?:\\.\\w+)?\\b"
        };

        this.$rules = {
          "start": [
            {
              "include": "value"
            }
          ],
          "value": [
            {
              "include": "whitespace"
            },
            {
              "include": "comment"
            },
            {
              "include": "annotation"
            },
            {
              "include": "string"
            },
            {
              "include": "number"
            },
            {
              "include": "keywords"
            },
            {
              "include": "symbol"
            },
            {
              "include": "clob"
            },
            {
              "include": "blob"
            },
            {
              "include": "struct"
            },
            {
              "include": "list"
            },
            {
              "include": "sexp"
            }
          ],
          "sexp": [
            {
              "token": "punctuation.definition.sexp.begin.ion",
              "regex": "\\(",
              "push": [
                {
                  "token": "punctuation.definition.sexp.end.ion",
                  "regex": "\\)",
                  "next": "pop"
                },
                {
                  "include": "comment"
                },
                {
                  "include": "value"
                },
                {
                  "token": "storage.type.symbol.operator.ion",
                  "regex": "[\\!\\#\\%\\&\\*\\+\\-\\./\\;\\<\\=\\>\\?\\@\\^\\`\\|\\~]+"
                }
              ]
            }
          ],
          "comment": [
            {
              "token": "comment.line.ion",
              "regex": "//[^\\n]*"
            },
            {
              "token": "comment.block.ion",
              "regex": "/\\*",
              "push": [
                {
                  "token": "comment.block.ion",
                  "regex": "[*]/",
                  "next": "pop"
                },
                {
                  "token": "comment.block.ion",
                  "regex": "[^*/]+"
                },
                {
                  "token": "comment.block.ion",
                  "regex": "[*/]+"
                }
              ]
            }
          ],
          "list": [
            {
              "token": "punctuation.definition.list.begin.ion",
              "regex": "\\[",
              "push": [
                {
                  "token": "punctuation.definition.list.end.ion",
                  "regex": "\\]",
                  "next": "pop"
                },
                {
                  "include": "comment"
                },
                {
                  "include": "value"
                },
                {
                  "token": "punctuation.definition.list.separator.ion",
                  "regex": ","
                }
              ]
            }
          ],
          "struct": [
            {
              "token": "punctuation.definition.struct.begin.ion",
              "regex": "\\{",
              "push": [
                {
                  "token": "punctuation.definition.struct.end.ion",
                  "regex": "\\}",
                  "next": "pop"
                },
                {
                  "include": "comment"
                },
                {
                  "include": "value"
                },
                {
                  "token": "punctuation.definition.struct.separator.ion",
                  "regex": ",|:"
                }
              ]
            }
          ],
          "blob": [
            {
              "token": [
                "punctuation.definition.blob.begin.ion",
                "string.other.blob.ion",
                "punctuation.definition.blob.end.ion"
              ],
              "regex": "(\\{\\{)([^\"]*)(\\}\\})"
            }
          ],
          "clob": [
            {
              "token": [
                "punctuation.definition.clob.begin.ion",
                "string.other.clob.ion",
                "punctuation.definition.clob.end.ion"
              ],
              "regex": "(\\{\\{)(\"[^\"]*\")(\\}\\})"
            }
          ],
          "symbol": [
            {
              "token": "storage.type.symbol.quoted.ion",
              "regex": "(['])((?:(?:\\\\')|(?:[^']))*?)(['])"
            },
            {
              "token": "storage.type.symbol.identifier.ion",
              "regex": "[\\$_a-zA-Z][\\$_a-zA-Z0-9]*"
            }
          ],
          "number": [
            {
              "token": "constant.numeric.timestamp.ion",
              "regex": "\\d{4}(?:-\\d{2})?(?:-\\d{2})?T(?:\\d{2}:\\d{2})(?::\\d{2})?(?:\\.\\d+)?(?:Z|[-+]\\d{2}:\\d{2})?"
            },
            {
              "token": "constant.numeric.timestamp.ion",
              "regex": "\\d{4}-\\d{2}-\\d{2}T?"
            },
            {
              "token": "constant.numeric.integer.binary.ion",
              "regex": "-?0[bB][01](?:_?[01])*"
            },
            {
              "token": "constant.numeric.integer.hex.ion",
              "regex": "-?0[xX][0-9a-fA-F](?:_?[0-9a-fA-F])*"
            },
            {
              "token": "constant.numeric.float.ion",
              "regex": "-?(?:0|[1-9](?:_?\\d)*)(?:\\.(?:\\d(?:_?\\d)*)?)?(?:[eE][+-]?\\d+)"
            },
            {
              "token": "constant.numeric.float.ion",
              "regex": "(?:[-+]inf)|(?:nan)"
            },
            {
              "token": "constant.numeric.decimal.ion",
              "regex": "-?(?:0|[1-9](?:_?\\d)*)(?:(?:(?:\\.(?:\\d(?:_?\\d)*)?)(?:[dD][+-]?\\d+)|\\.(?:\\d(?:_?\\d)*)?)|(?:[dD][+-]?\\d+))"
            },
            {
              "token": "constant.numeric.integer.ion",
              "regex": "-?(?:0|[1-9](?:_?\\d)*)"
            }
          ],
          "string": [
            {
              "token": [
                "punctuation.definition.string.begin.ion",
                "string.quoted.double.ion",
                "punctuation.definition.string.end.ion"
              ],
              "regex": "([\"])((?:(?:\\\\\")|(?:[^\"]))*?)([\"])"
            },
            {
              "token": "punctuation.definition.string.begin.ion",
              "regex": "'{3}",
              "push": [
                {
                  "token": "punctuation.definition.string.end.ion",
                  "regex": "'{3}",
                  "next": "pop"
                },
                {
                  "token": "string.quoted.triple.ion",
                  "regex": "(?:\\\\'|[^'])+"
                },
                {
                  "token": "string.quoted.triple.ion",
                  "regex": "'"
                }
              ]
            }
          ],
          "annotation": [
            {
              "token": [
                "variable.language.annotation.ion",
                "punctuation.definition.annotation.ion"
              ],
              "regex": /('(?:[^'\\]|\\.)*')\s*(::)/
            },
            {
              "token": [
                "variable.language.annotation.ion",
                "punctuation.definition.annotation.ion"
              ],
              "regex": "([\\$_a-zA-Z][\\$_a-zA-Z0-9]*)\\s*(::)"
            }
          ],
          "whitespace": [
            {
              "token": "text.ion",
              "regex": "\\s+"
            }
          ]
        } ;
        this.$rules["keywords"] = [keywordMapperRule];


        this.normalizeRules();
    };

    oop.inherits(IonHighlightRules, TextHighlightRules);

    exports.S = IonHighlightRules;


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


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsMEJBQTBCLEVBQUU7QUFDNUI7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLEVBQUU7QUFDaEM7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7O0FBRUEsSUFBSSxTQUF5Qjs7Ozs7Ozs7QUN2U2hCOztBQUViLFlBQVksMkNBQXlCOztBQUVyQzs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsc0JBQXNCO0FBQ3RCOztBQUVBO0FBQ0E7QUFDQSx1Q0FBdUM7O0FBRXZDOztBQUVBO0FBQ0Esb0RBQW9ELHlCQUF5Qjs7QUFFN0U7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDOztBQUVELDRCQUE0QiIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvZm9sZGluZy9jc3R5bGUuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9pb24uanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9pb25faGlnaGxpZ2h0X3J1bGVzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvbWF0Y2hpbmdfYnJhY2Vfb3V0ZGVudC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi8uLi9saWIvb29wXCIpO1xudmFyIFJhbmdlID0gcmVxdWlyZShcIi4uLy4uL3JhbmdlXCIpLlJhbmdlO1xudmFyIEJhc2VGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRfbW9kZVwiKS5Gb2xkTW9kZTtcblxudmFyIEZvbGRNb2RlID0gZXhwb3J0cy5Gb2xkTW9kZSA9IGZ1bmN0aW9uKGNvbW1lbnRSZWdleCkge1xuICAgIGlmIChjb21tZW50UmVnZXgpIHtcbiAgICAgICAgdGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIgPSBuZXcgUmVnRXhwKFxuICAgICAgICAgICAgdGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIuc291cmNlLnJlcGxhY2UoL1xcfFtefF0qPyQvLCBcInxcIiArIGNvbW1lbnRSZWdleC5zdGFydClcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5mb2xkaW5nU3RvcE1hcmtlciA9IG5ldyBSZWdFeHAoXG4gICAgICAgICAgICB0aGlzLmZvbGRpbmdTdG9wTWFya2VyLnNvdXJjZS5yZXBsYWNlKC9cXHxbXnxdKj8kLywgXCJ8XCIgKyBjb21tZW50UmVnZXguZW5kKVxuICAgICAgICApO1xuICAgIH1cbn07XG5vb3AuaW5oZXJpdHMoRm9sZE1vZGUsIEJhc2VGb2xkTW9kZSk7XG5cbihmdW5jdGlvbigpIHtcbiAgICBcbiAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlciA9IC8oW1xce1xcW1xcKF0pW15cXH1cXF1cXCldKiR8XlxccyooXFwvXFwqKS87XG4gICAgdGhpcy5mb2xkaW5nU3RvcE1hcmtlciA9IC9eW15cXFtcXHtcXChdKihbXFx9XFxdXFwpXSl8XltcXHNcXCpdKihcXCpcXC8pLztcbiAgICB0aGlzLnNpbmdsZUxpbmVCbG9ja0NvbW1lbnRSZT0gL15cXHMqKFxcL1xcKikuKlxcKlxcL1xccyokLztcbiAgICB0aGlzLnRyaXBsZVN0YXJCbG9ja0NvbW1lbnRSZSA9IC9eXFxzKihcXC9cXCpcXCpcXCopLipcXCpcXC9cXHMqJC87XG4gICAgdGhpcy5zdGFydFJlZ2lvblJlID0gL15cXHMqKFxcL1xcKnxcXC9cXC8pIz9yZWdpb25cXGIvO1xuICAgIFxuICAgIC8vcHJldmVudCBuYW1pbmcgY29uZmxpY3Qgd2l0aCBhbnkgbW9kZXMgdGhhdCBpbmhlcml0IGZyb20gY3N0eWxlIGFuZCBvdmVycmlkZSB0aGlzIChsaWtlIGNzaGFycClcbiAgICB0aGlzLl9nZXRGb2xkV2lkZ2V0QmFzZSA9IHRoaXMuZ2V0Rm9sZFdpZGdldDtcbiAgICBcbiAgICAvKipcbiAgICAgKiBHZXRzIGZvbGQgd2lkZ2V0IHdpdGggc29tZSBub24tc3RhbmRhcmQgZXh0cmFzOlxuICAgICAqXG4gICAgICogQGV4YW1wbGUgbGluZUNvbW1lbnRSZWdpb25TdGFydFxuICAgICAqICAgICAgLy8jcmVnaW9uIFtvcHRpb25hbCBkZXNjcmlwdGlvbl1cbiAgICAgKlxuICAgICAqIEBleGFtcGxlIGJsb2NrQ29tbWVudFJlZ2lvblN0YXJ0XG4gICAgICogICAgICAvKiNyZWdpb24gW29wdGlvbmFsIGRlc2NyaXB0aW9uXSAqWy9dXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSB0cmlwbGVTdGFyRm9sZGluZ1NlY3Rpb25cbiAgICAgKiAgICAgIC8qKiogdGhpcyBmb2xkcyBldmVuIHRob3VnaCAxIGxpbmUgYmVjYXVzZSBpdCBoYXMgMyBzdGFycyAqKipbL11cbiAgICAgKiBcbiAgICAgKiBAbm90ZSB0aGUgcG91bmQgc3ltYm9sIGZvciByZWdpb24gdGFncyBpcyBvcHRpb25hbFxuICAgICAqL1xuICAgIHRoaXMuZ2V0Rm9sZFdpZGdldCA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgXG4gICAgICAgIGlmICh0aGlzLnNpbmdsZUxpbmVCbG9ja0NvbW1lbnRSZS50ZXN0KGxpbmUpKSB7XG4gICAgICAgICAgICAvLyBObyB3aWRnZXQgZm9yIHNpbmdsZSBsaW5lIGJsb2NrIGNvbW1lbnQgdW5sZXNzIHJlZ2lvbiBvciB0cmlwbGUgc3RhclxuICAgICAgICAgICAgaWYgKCF0aGlzLnN0YXJ0UmVnaW9uUmUudGVzdChsaW5lKSAmJiAhdGhpcy50cmlwbGVTdGFyQmxvY2tDb21tZW50UmUudGVzdChsaW5lKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICB2YXIgZncgPSB0aGlzLl9nZXRGb2xkV2lkZ2V0QmFzZShzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdyk7XG4gICAgXG4gICAgICAgIGlmICghZncgJiYgdGhpcy5zdGFydFJlZ2lvblJlLnRlc3QobGluZSkpXG4gICAgICAgICAgICByZXR1cm4gXCJzdGFydFwiOyAvLyBsaW5lQ29tbWVudFJlZ2lvblN0YXJ0XG4gICAgXG4gICAgICAgIHJldHVybiBmdztcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0UmFuZ2UgPSBmdW5jdGlvbihzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdywgZm9yY2VNdWx0aWxpbmUpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLnN0YXJ0UmVnaW9uUmUudGVzdChsaW5lKSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldENvbW1lbnRSZWdpb25CbG9jayhzZXNzaW9uLCBsaW5lLCByb3cpO1xuICAgICAgICBcbiAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCh0aGlzLmZvbGRpbmdTdGFydE1hcmtlcik7XG4gICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgdmFyIGkgPSBtYXRjaC5pbmRleDtcblxuICAgICAgICAgICAgaWYgKG1hdGNoWzFdKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm9wZW5pbmdCcmFja2V0QmxvY2soc2Vzc2lvbiwgbWF0Y2hbMV0sIHJvdywgaSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgcmFuZ2UgPSBzZXNzaW9uLmdldENvbW1lbnRGb2xkUmFuZ2Uocm93LCBpICsgbWF0Y2hbMF0ubGVuZ3RoLCAxKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHJhbmdlICYmICFyYW5nZS5pc011bHRpTGluZSgpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZvcmNlTXVsdGlsaW5lKSB7XG4gICAgICAgICAgICAgICAgICAgIHJhbmdlID0gdGhpcy5nZXRTZWN0aW9uUmFuZ2Uoc2Vzc2lvbiwgcm93KTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZvbGRTdHlsZSAhPSBcImFsbFwiKVxuICAgICAgICAgICAgICAgICAgICByYW5nZSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiByYW5nZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmb2xkU3R5bGUgPT09IFwibWFya2JlZ2luXCIpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCh0aGlzLmZvbGRpbmdTdG9wTWFya2VyKTtcbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICB2YXIgaSA9IG1hdGNoLmluZGV4ICsgbWF0Y2hbMF0ubGVuZ3RoO1xuXG4gICAgICAgICAgICBpZiAobWF0Y2hbMV0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2xvc2luZ0JyYWNrZXRCbG9jayhzZXNzaW9uLCBtYXRjaFsxXSwgcm93LCBpKTtcblxuICAgICAgICAgICAgcmV0dXJuIHNlc3Npb24uZ2V0Q29tbWVudEZvbGRSYW5nZShyb3csIGksIC0xKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgXG4gICAgdGhpcy5nZXRTZWN0aW9uUmFuZ2UgPSBmdW5jdGlvbihzZXNzaW9uLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgdmFyIHN0YXJ0SW5kZW50ID0gbGluZS5zZWFyY2goL1xcUy8pO1xuICAgICAgICB2YXIgc3RhcnRSb3cgPSByb3c7XG4gICAgICAgIHZhciBzdGFydENvbHVtbiA9IGxpbmUubGVuZ3RoO1xuICAgICAgICByb3cgPSByb3cgKyAxO1xuICAgICAgICB2YXIgZW5kUm93ID0gcm93O1xuICAgICAgICB2YXIgbWF4Um93ID0gc2Vzc2lvbi5nZXRMZW5ndGgoKTtcbiAgICAgICAgd2hpbGUgKCsrcm93IDwgbWF4Um93KSB7XG4gICAgICAgICAgICBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgICAgICB2YXIgaW5kZW50ID0gbGluZS5zZWFyY2goL1xcUy8pO1xuICAgICAgICAgICAgaWYgKGluZGVudCA9PT0gLTEpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICBpZiAgKHN0YXJ0SW5kZW50ID4gaW5kZW50KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgdmFyIHN1YlJhbmdlID0gdGhpcy5nZXRGb2xkV2lkZ2V0UmFuZ2Uoc2Vzc2lvbiwgXCJhbGxcIiwgcm93KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHN1YlJhbmdlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN1YlJhbmdlLnN0YXJ0LnJvdyA8PSBzdGFydFJvdykge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN1YlJhbmdlLmlzTXVsdGlMaW5lKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcm93ID0gc3ViUmFuZ2UuZW5kLnJvdztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXJ0SW5kZW50ID09IGluZGVudCkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbmRSb3cgPSByb3c7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBuZXcgUmFuZ2Uoc3RhcnRSb3csIHN0YXJ0Q29sdW1uLCBlbmRSb3csIHNlc3Npb24uZ2V0TGluZShlbmRSb3cpLmxlbmd0aCk7XG4gICAgfTtcbiAgICBcbiAgICAvKipcbiAgICAgKiBnZXRzIGNvbW1lbnQgcmVnaW9uIGJsb2NrIHdpdGggZW5kIHJlZ2lvbiBhc3N1bWVkIHRvIGJlIHN0YXJ0IG9mIGNvbW1lbnQgaW4gYW55IGNzdHlsZSBtb2RlIG9yIFNRTCBtb2RlICgtLSkgd2hpY2ggaW5oZXJpdHMgZnJvbSB0aGlzLlxuICAgICAqIFRoZXJlIG1heSBvcHRpb25hbGx5IGJlIGEgcG91bmQgc3ltYm9sIGJlZm9yZSB0aGUgcmVnaW9uL2VuZHJlZ2lvbiBzdGF0ZW1lbnRcbiAgICAgKi9cbiAgICB0aGlzLmdldENvbW1lbnRSZWdpb25CbG9jayA9IGZ1bmN0aW9uKHNlc3Npb24sIGxpbmUsIHJvdykge1xuICAgICAgICB2YXIgc3RhcnRDb2x1bW4gPSBsaW5lLnNlYXJjaCgvXFxzKiQvKTtcbiAgICAgICAgdmFyIG1heFJvdyA9IHNlc3Npb24uZ2V0TGVuZ3RoKCk7XG4gICAgICAgIHZhciBzdGFydFJvdyA9IHJvdztcbiAgICAgICAgXG4gICAgICAgIHZhciByZSA9IC9eXFxzKig/OlxcL1xcKnxcXC9cXC98LS0pIz8oZW5kKT9yZWdpb25cXGIvO1xuICAgICAgICB2YXIgZGVwdGggPSAxO1xuICAgICAgICB3aGlsZSAoKytyb3cgPCBtYXhSb3cpIHtcbiAgICAgICAgICAgIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgICAgIHZhciBtID0gcmUuZXhlYyhsaW5lKTtcbiAgICAgICAgICAgIGlmICghbSkgY29udGludWU7XG4gICAgICAgICAgICBpZiAobVsxXSkgZGVwdGgtLTtcbiAgICAgICAgICAgIGVsc2UgZGVwdGgrKztcblxuICAgICAgICAgICAgaWYgKCFkZXB0aCkgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZW5kUm93ID0gcm93O1xuICAgICAgICBpZiAoZW5kUm93ID4gc3RhcnRSb3cpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmFuZ2Uoc3RhcnRSb3csIHN0YXJ0Q29sdW1uLCBlbmRSb3csIGxpbmUubGVuZ3RoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbn0pLmNhbGwoRm9sZE1vZGUucHJvdG90eXBlKTtcbiIsIi8qXG4gIFRISVMgRklMRSBXQVMgR0VORVJBVEVEIEJZICdsaWdhbmQnIFVTSU5HICdtb2RlLmpzJ1xuKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0TW9kZSA9IHJlcXVpcmUoXCIuL3RleHRcIikuTW9kZTtcbnZhciBIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL2lvbl9oaWdobGlnaHRfcnVsZXNcIikuSW9uSGlnaGxpZ2h0UnVsZXM7XG52YXIgTWF0Y2hpbmdCcmFjZU91dGRlbnQgPSByZXF1aXJlKFwiLi9tYXRjaGluZ19icmFjZV9vdXRkZW50XCIpLk1hdGNoaW5nQnJhY2VPdXRkZW50O1xudmFyIENTdHlsZUZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZGluZy9jc3R5bGVcIikuRm9sZE1vZGU7XG5cbnZhciBNb2RlID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuSGlnaGxpZ2h0UnVsZXMgPSBIaWdobGlnaHRSdWxlcztcbiAgICB0aGlzLiRvdXRkZW50ID0gbmV3IE1hdGNoaW5nQnJhY2VPdXRkZW50KCk7XG4gICAgdGhpcy4kYmVoYXZpb3VyID0gdGhpcy4kZGVmYXVsdEJlaGF2aW91cjtcbiAgICB0aGlzLmZvbGRpbmdSdWxlcyA9IG5ldyBDU3R5bGVGb2xkTW9kZSgpO1xufTtcbm9vcC5pbmhlcml0cyhNb2RlLCBUZXh0TW9kZSk7XG5cbihmdW5jdGlvbiAoKSB7XG5cbiAgICB0aGlzLmxpbmVDb21tZW50U3RhcnQgPSBcIi8vXCI7XG4gICAgdGhpcy5ibG9ja0NvbW1lbnQgPSB7XG4gICAgICAgIHN0YXJ0OiBcIi8qXCIsXG4gICAgICAgIGVuZDogXCIqL1wiXG4gICAgfTtcblxuICAgIHRoaXMuZ2V0TmV4dExpbmVJbmRlbnQgPSBmdW5jdGlvbiAoc3RhdGUsIGxpbmUsIHRhYikge1xuICAgICAgICB2YXIgaW5kZW50ID0gdGhpcy4kZ2V0SW5kZW50KGxpbmUpO1xuXG4gICAgICAgIGlmIChzdGF0ZSA9PSBcInN0YXJ0XCIpIHtcbiAgICAgICAgICAgIHZhciBtYXRjaCA9IGxpbmUubWF0Y2goL14uKltcXHtcXChcXFtdXFxzKiQvKTtcbiAgICAgICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgICAgIGluZGVudCArPSB0YWI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW5kZW50O1xuICAgIH07XG5cbiAgICB0aGlzLmNoZWNrT3V0ZGVudCA9IGZ1bmN0aW9uIChzdGF0ZSwgbGluZSwgaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJG91dGRlbnQuY2hlY2tPdXRkZW50KGxpbmUsIGlucHV0KTtcbiAgICB9O1xuXG4gICAgdGhpcy5hdXRvT3V0ZGVudCA9IGZ1bmN0aW9uIChzdGF0ZSwgZG9jLCByb3cpIHtcbiAgICAgICAgdGhpcy4kb3V0ZGVudC5hdXRvT3V0ZGVudChkb2MsIHJvdyk7XG4gICAgfTtcblxuICAgIHRoaXMuJGlkID0gXCJhY2UvbW9kZS9pb25cIjtcbn0pLmNhbGwoTW9kZS5wcm90b3R5cGUpO1xuXG5leHBvcnRzLk1vZGUgPSBNb2RlO1xuIiwiLypcbiAgVEhJUyBGSUxFIFdBUyBHRU5FUkFURUQgQlkgJ2xpZ2FuZCcgVVNJTkcgJ21vZGVfaGlnaGxpZ2h0X3J1bGVzLmpzJ1xuKi9cblxuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgdmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xuICAgIHZhciBUZXh0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90ZXh0X2hpZ2hsaWdodF9ydWxlc1wiKS5UZXh0SGlnaGxpZ2h0UnVsZXM7XG5cblxuICAgIHZhciBJb25IaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBjb25zdGFudC5sYW5ndWFnZS5ib29sLmlvblxuICAgICAgICB2YXIga19rZXl3b3Jkc19ib29sID1cbiAgICAgICAgICAgIFwiVFJVRXxGQUxTRVwiO1xuICAgICAgICB2YXIga19ib29sID0ga19rZXl3b3Jkc19ib29sO1xuXG4gICAgICAgIC8vIGNvbnN0YW50Lmxhbmd1YWdlLm51bGwuaW9uXG4gICAgICAgIHZhciBrX2tleXdvcmRzX251bGwgPVxuICAgICAgICAgICAgXCJOVUxMLk5VTEx8TlVMTC5CT09MfE5VTEwuSU5UfE5VTEwuRkxPQVR8TlVMTC5ERUNJTUFMfE5VTEwuVElNRVNUQU1QfE5VTEwuU1RSSU5HfE5VTEwuU1lNQk9MfE5VTEwuQkxPQnxOVUxMLkNMT0J8XCJcbiAgICAgICAgICAgICtcIk5VTEwuU1RSVUNUfE5VTEwuTElTVHxOVUxMLlNFWFB8TlVMTFwiO1xuICAgICAgICB2YXIga19udWxsID0ga19rZXl3b3Jkc19udWxsO1xuXG5cbiAgICAgICAgdmFyIGtleXdvcmRNYXBwZXIgPSB0aGlzLmNyZWF0ZUtleXdvcmRNYXBwZXIoe1xuICAgICAgICAgICAgXCJjb25zdGFudC5sYW5ndWFnZS5ib29sLmlvblwiOiBrX2Jvb2wsXG4gICAgICAgICAgICBcImNvbnN0YW50Lmxhbmd1YWdlLm51bGwuaW9uXCI6IGtfbnVsbFxuICAgICAgICB9LCBcImNvbnN0YW50Lm90aGVyLnN5bWJvbC5pZGVudGlmaWVyLmlvblwiLCB0cnVlKTtcblxuICAgICAgICB2YXIga2V5d29yZE1hcHBlclJ1bGUgPSB7XG4gICAgICAgICAgICB0b2tlbiA6IGtleXdvcmRNYXBwZXIsXG4gICAgICAgICAgICByZWdleCA6IFwiXFxcXGJcXFxcdysoPzpcXFxcLlxcXFx3Kyk/XFxcXGJcIlxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuJHJ1bGVzID0ge1xuICAgICAgICAgIFwic3RhcnRcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcImluY2x1ZGVcIjogXCJ2YWx1ZVwiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXSxcbiAgICAgICAgICBcInZhbHVlXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJpbmNsdWRlXCI6IFwid2hpdGVzcGFjZVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcImluY2x1ZGVcIjogXCJjb21tZW50XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwiaW5jbHVkZVwiOiBcImFubm90YXRpb25cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJpbmNsdWRlXCI6IFwic3RyaW5nXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwiaW5jbHVkZVwiOiBcIm51bWJlclwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcImluY2x1ZGVcIjogXCJrZXl3b3Jkc1wiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcImluY2x1ZGVcIjogXCJzeW1ib2xcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJpbmNsdWRlXCI6IFwiY2xvYlwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcImluY2x1ZGVcIjogXCJibG9iXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwiaW5jbHVkZVwiOiBcInN0cnVjdFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcImluY2x1ZGVcIjogXCJsaXN0XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwiaW5jbHVkZVwiOiBcInNleHBcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJzZXhwXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0b2tlblwiOiBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24uc2V4cC5iZWdpbi5pb25cIixcbiAgICAgICAgICAgICAgXCJyZWdleFwiOiBcIlxcXFwoXCIsXG4gICAgICAgICAgICAgIFwicHVzaFwiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0b2tlblwiOiBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24uc2V4cC5lbmQuaW9uXCIsXG4gICAgICAgICAgICAgICAgICBcInJlZ2V4XCI6IFwiXFxcXClcIixcbiAgICAgICAgICAgICAgICAgIFwibmV4dFwiOiBcInBvcFwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcImluY2x1ZGVcIjogXCJjb21tZW50XCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwiaW5jbHVkZVwiOiBcInZhbHVlXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidG9rZW5cIjogXCJzdG9yYWdlLnR5cGUuc3ltYm9sLm9wZXJhdG9yLmlvblwiLFxuICAgICAgICAgICAgICAgICAgXCJyZWdleFwiOiBcIltcXFxcIVxcXFwjXFxcXCVcXFxcJlxcXFwqXFxcXCtcXFxcLVxcXFwuL1xcXFw7XFxcXDxcXFxcPVxcXFw+XFxcXD9cXFxcQFxcXFxeXFxcXGBcXFxcfFxcXFx+XStcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJjb21tZW50XCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0b2tlblwiOiBcImNvbW1lbnQubGluZS5pb25cIixcbiAgICAgICAgICAgICAgXCJyZWdleFwiOiBcIi8vW15cXFxcbl0qXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidG9rZW5cIjogXCJjb21tZW50LmJsb2NrLmlvblwiLFxuICAgICAgICAgICAgICBcInJlZ2V4XCI6IFwiL1xcXFwqXCIsXG4gICAgICAgICAgICAgIFwicHVzaFwiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0b2tlblwiOiBcImNvbW1lbnQuYmxvY2suaW9uXCIsXG4gICAgICAgICAgICAgICAgICBcInJlZ2V4XCI6IFwiWypdL1wiLFxuICAgICAgICAgICAgICAgICAgXCJuZXh0XCI6IFwicG9wXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidG9rZW5cIjogXCJjb21tZW50LmJsb2NrLmlvblwiLFxuICAgICAgICAgICAgICAgICAgXCJyZWdleFwiOiBcIlteKi9dK1wiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInRva2VuXCI6IFwiY29tbWVudC5ibG9jay5pb25cIixcbiAgICAgICAgICAgICAgICAgIFwicmVnZXhcIjogXCJbKi9dK1wiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXSxcbiAgICAgICAgICBcImxpc3RcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInRva2VuXCI6IFwicHVuY3R1YXRpb24uZGVmaW5pdGlvbi5saXN0LmJlZ2luLmlvblwiLFxuICAgICAgICAgICAgICBcInJlZ2V4XCI6IFwiXFxcXFtcIixcbiAgICAgICAgICAgICAgXCJwdXNoXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInRva2VuXCI6IFwicHVuY3R1YXRpb24uZGVmaW5pdGlvbi5saXN0LmVuZC5pb25cIixcbiAgICAgICAgICAgICAgICAgIFwicmVnZXhcIjogXCJcXFxcXVwiLFxuICAgICAgICAgICAgICAgICAgXCJuZXh0XCI6IFwicG9wXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwiaW5jbHVkZVwiOiBcImNvbW1lbnRcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJpbmNsdWRlXCI6IFwidmFsdWVcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0b2tlblwiOiBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24ubGlzdC5zZXBhcmF0b3IuaW9uXCIsXG4gICAgICAgICAgICAgICAgICBcInJlZ2V4XCI6IFwiLFwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXSxcbiAgICAgICAgICBcInN0cnVjdFwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidG9rZW5cIjogXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnN0cnVjdC5iZWdpbi5pb25cIixcbiAgICAgICAgICAgICAgXCJyZWdleFwiOiBcIlxcXFx7XCIsXG4gICAgICAgICAgICAgIFwicHVzaFwiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0b2tlblwiOiBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24uc3RydWN0LmVuZC5pb25cIixcbiAgICAgICAgICAgICAgICAgIFwicmVnZXhcIjogXCJcXFxcfVwiLFxuICAgICAgICAgICAgICAgICAgXCJuZXh0XCI6IFwicG9wXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwiaW5jbHVkZVwiOiBcImNvbW1lbnRcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJpbmNsdWRlXCI6IFwidmFsdWVcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0b2tlblwiOiBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24uc3RydWN0LnNlcGFyYXRvci5pb25cIixcbiAgICAgICAgICAgICAgICAgIFwicmVnZXhcIjogXCIsfDpcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJibG9iXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0b2tlblwiOiBbXG4gICAgICAgICAgICAgICAgXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLmJsb2IuYmVnaW4uaW9uXCIsXG4gICAgICAgICAgICAgICAgXCJzdHJpbmcub3RoZXIuYmxvYi5pb25cIixcbiAgICAgICAgICAgICAgICBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24uYmxvYi5lbmQuaW9uXCJcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgXCJyZWdleFwiOiBcIihcXFxce1xcXFx7KShbXlxcXCJdKikoXFxcXH1cXFxcfSlcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJjbG9iXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0b2tlblwiOiBbXG4gICAgICAgICAgICAgICAgXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLmNsb2IuYmVnaW4uaW9uXCIsXG4gICAgICAgICAgICAgICAgXCJzdHJpbmcub3RoZXIuY2xvYi5pb25cIixcbiAgICAgICAgICAgICAgICBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24uY2xvYi5lbmQuaW9uXCJcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgXCJyZWdleFwiOiBcIihcXFxce1xcXFx7KShcXFwiW15cXFwiXSpcXFwiKShcXFxcfVxcXFx9KVwiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXSxcbiAgICAgICAgICBcInN5bWJvbFwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidG9rZW5cIjogXCJzdG9yYWdlLnR5cGUuc3ltYm9sLnF1b3RlZC5pb25cIixcbiAgICAgICAgICAgICAgXCJyZWdleFwiOiBcIihbJ10pKCg/Oig/OlxcXFxcXFxcJyl8KD86W14nXSkpKj8pKFsnXSlcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0b2tlblwiOiBcInN0b3JhZ2UudHlwZS5zeW1ib2wuaWRlbnRpZmllci5pb25cIixcbiAgICAgICAgICAgICAgXCJyZWdleFwiOiBcIltcXFxcJF9hLXpBLVpdW1xcXFwkX2EtekEtWjAtOV0qXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdLFxuICAgICAgICAgIFwibnVtYmVyXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0b2tlblwiOiBcImNvbnN0YW50Lm51bWVyaWMudGltZXN0YW1wLmlvblwiLFxuICAgICAgICAgICAgICBcInJlZ2V4XCI6IFwiXFxcXGR7NH0oPzotXFxcXGR7Mn0pPyg/Oi1cXFxcZHsyfSk/VCg/OlxcXFxkezJ9OlxcXFxkezJ9KSg/OjpcXFxcZHsyfSk/KD86XFxcXC5cXFxcZCspPyg/Olp8Wy0rXVxcXFxkezJ9OlxcXFxkezJ9KT9cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0b2tlblwiOiBcImNvbnN0YW50Lm51bWVyaWMudGltZXN0YW1wLmlvblwiLFxuICAgICAgICAgICAgICBcInJlZ2V4XCI6IFwiXFxcXGR7NH0tXFxcXGR7Mn0tXFxcXGR7Mn1UP1wiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInRva2VuXCI6IFwiY29uc3RhbnQubnVtZXJpYy5pbnRlZ2VyLmJpbmFyeS5pb25cIixcbiAgICAgICAgICAgICAgXCJyZWdleFwiOiBcIi0/MFtiQl1bMDFdKD86Xz9bMDFdKSpcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0b2tlblwiOiBcImNvbnN0YW50Lm51bWVyaWMuaW50ZWdlci5oZXguaW9uXCIsXG4gICAgICAgICAgICAgIFwicmVnZXhcIjogXCItPzBbeFhdWzAtOWEtZkEtRl0oPzpfP1swLTlhLWZBLUZdKSpcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0b2tlblwiOiBcImNvbnN0YW50Lm51bWVyaWMuZmxvYXQuaW9uXCIsXG4gICAgICAgICAgICAgIFwicmVnZXhcIjogXCItPyg/OjB8WzEtOV0oPzpfP1xcXFxkKSopKD86XFxcXC4oPzpcXFxcZCg/Ol8/XFxcXGQpKik/KT8oPzpbZUVdWystXT9cXFxcZCspXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidG9rZW5cIjogXCJjb25zdGFudC5udW1lcmljLmZsb2F0LmlvblwiLFxuICAgICAgICAgICAgICBcInJlZ2V4XCI6IFwiKD86Wy0rXWluZil8KD86bmFuKVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInRva2VuXCI6IFwiY29uc3RhbnQubnVtZXJpYy5kZWNpbWFsLmlvblwiLFxuICAgICAgICAgICAgICBcInJlZ2V4XCI6IFwiLT8oPzowfFsxLTldKD86Xz9cXFxcZCkqKSg/Oig/Oig/OlxcXFwuKD86XFxcXGQoPzpfP1xcXFxkKSopPykoPzpbZERdWystXT9cXFxcZCspfFxcXFwuKD86XFxcXGQoPzpfP1xcXFxkKSopPyl8KD86W2REXVsrLV0/XFxcXGQrKSlcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0b2tlblwiOiBcImNvbnN0YW50Lm51bWVyaWMuaW50ZWdlci5pb25cIixcbiAgICAgICAgICAgICAgXCJyZWdleFwiOiBcIi0/KD86MHxbMS05XSg/Ol8/XFxcXGQpKilcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJzdHJpbmdcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInRva2VuXCI6IFtcbiAgICAgICAgICAgICAgICBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24uc3RyaW5nLmJlZ2luLmlvblwiLFxuICAgICAgICAgICAgICAgIFwic3RyaW5nLnF1b3RlZC5kb3VibGUuaW9uXCIsXG4gICAgICAgICAgICAgICAgXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnN0cmluZy5lbmQuaW9uXCJcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgXCJyZWdleFwiOiBcIihbXFxcIl0pKCg/Oig/OlxcXFxcXFxcXFxcIil8KD86W15cXFwiXSkpKj8pKFtcXFwiXSlcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0b2tlblwiOiBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24uc3RyaW5nLmJlZ2luLmlvblwiLFxuICAgICAgICAgICAgICBcInJlZ2V4XCI6IFwiJ3szfVwiLFxuICAgICAgICAgICAgICBcInB1c2hcIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidG9rZW5cIjogXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnN0cmluZy5lbmQuaW9uXCIsXG4gICAgICAgICAgICAgICAgICBcInJlZ2V4XCI6IFwiJ3szfVwiLFxuICAgICAgICAgICAgICAgICAgXCJuZXh0XCI6IFwicG9wXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidG9rZW5cIjogXCJzdHJpbmcucXVvdGVkLnRyaXBsZS5pb25cIixcbiAgICAgICAgICAgICAgICAgIFwicmVnZXhcIjogXCIoPzpcXFxcXFxcXCd8W14nXSkrXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidG9rZW5cIjogXCJzdHJpbmcucXVvdGVkLnRyaXBsZS5pb25cIixcbiAgICAgICAgICAgICAgICAgIFwicmVnZXhcIjogXCInXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdLFxuICAgICAgICAgIFwiYW5ub3RhdGlvblwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidG9rZW5cIjogW1xuICAgICAgICAgICAgICAgIFwidmFyaWFibGUubGFuZ3VhZ2UuYW5ub3RhdGlvbi5pb25cIixcbiAgICAgICAgICAgICAgICBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24uYW5ub3RhdGlvbi5pb25cIlxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBcInJlZ2V4XCI6IC8oJyg/OlteJ1xcXFxdfFxcXFwuKSonKVxccyooOjopL1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0b2tlblwiOiBbXG4gICAgICAgICAgICAgICAgXCJ2YXJpYWJsZS5sYW5ndWFnZS5hbm5vdGF0aW9uLmlvblwiLFxuICAgICAgICAgICAgICAgIFwicHVuY3R1YXRpb24uZGVmaW5pdGlvbi5hbm5vdGF0aW9uLmlvblwiXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIFwicmVnZXhcIjogXCIoW1xcXFwkX2EtekEtWl1bXFxcXCRfYS16QS1aMC05XSopXFxcXHMqKDo6KVwiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXSxcbiAgICAgICAgICBcIndoaXRlc3BhY2VcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInRva2VuXCI6IFwidGV4dC5pb25cIixcbiAgICAgICAgICAgICAgXCJyZWdleFwiOiBcIlxcXFxzK1wiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9IDtcbiAgICAgICAgdGhpcy4kcnVsZXNbXCJrZXl3b3Jkc1wiXSA9IFtrZXl3b3JkTWFwcGVyUnVsZV07XG5cblxuICAgICAgICB0aGlzLm5vcm1hbGl6ZVJ1bGVzKCk7XG4gICAgfTtcblxuICAgIG9vcC5pbmhlcml0cyhJb25IaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuICAgIGV4cG9ydHMuSW9uSGlnaGxpZ2h0UnVsZXMgPSBJb25IaWdobGlnaHRSdWxlcztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgUmFuZ2UgPSByZXF1aXJlKFwiLi4vcmFuZ2VcIikuUmFuZ2U7XG5cbnZhciBNYXRjaGluZ0JyYWNlT3V0ZGVudCA9IGZ1bmN0aW9uKCkge307XG5cbihmdW5jdGlvbigpIHtcblxuICAgIHRoaXMuY2hlY2tPdXRkZW50ID0gZnVuY3Rpb24obGluZSwgaW5wdXQpIHtcbiAgICAgICAgaWYgKCEgL15cXHMrJC8udGVzdChsaW5lKSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgICByZXR1cm4gL15cXHMqXFx9Ly50ZXN0KGlucHV0KTtcbiAgICB9O1xuXG4gICAgdGhpcy5hdXRvT3V0ZGVudCA9IGZ1bmN0aW9uKGRvYywgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gZG9jLmdldExpbmUocm93KTtcbiAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCgvXihcXHMqXFx9KS8pO1xuXG4gICAgICAgIGlmICghbWF0Y2gpIHJldHVybiAwO1xuXG4gICAgICAgIHZhciBjb2x1bW4gPSBtYXRjaFsxXS5sZW5ndGg7XG4gICAgICAgIHZhciBvcGVuQnJhY2VQb3MgPSBkb2MuZmluZE1hdGNoaW5nQnJhY2tldCh7cm93OiByb3csIGNvbHVtbjogY29sdW1ufSk7XG5cbiAgICAgICAgaWYgKCFvcGVuQnJhY2VQb3MgfHwgb3BlbkJyYWNlUG9zLnJvdyA9PSByb3cpIHJldHVybiAwO1xuXG4gICAgICAgIHZhciBpbmRlbnQgPSB0aGlzLiRnZXRJbmRlbnQoZG9jLmdldExpbmUob3BlbkJyYWNlUG9zLnJvdykpO1xuICAgICAgICBkb2MucmVwbGFjZShuZXcgUmFuZ2Uocm93LCAwLCByb3csIGNvbHVtbi0xKSwgaW5kZW50KTtcbiAgICB9O1xuXG4gICAgdGhpcy4kZ2V0SW5kZW50ID0gZnVuY3Rpb24obGluZSkge1xuICAgICAgICByZXR1cm4gbGluZS5tYXRjaCgvXlxccyovKVswXTtcbiAgICB9O1xuXG59KS5jYWxsKE1hdGNoaW5nQnJhY2VPdXRkZW50LnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTWF0Y2hpbmdCcmFjZU91dGRlbnQgPSBNYXRjaGluZ0JyYWNlT3V0ZGVudDtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==