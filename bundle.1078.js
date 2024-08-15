"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[1078],{

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


/***/ }),

/***/ 51078:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/*
  THIS FILE WAS GENERATED BY 'ligand' USING 'mode.js'
*/



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var HighlightRules = (__webpack_require__(91313)/* .PartiqlHighlightRules */ .T);
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

    this.lineCommentStart = "--";
    this.blockComment = {
        start: "/*",
        end: "*/",
        nestable: true
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

    this.$id = "ace/mode/partiql";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 91313:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/*
  THIS FILE WAS GENERATED BY 'ligand' USING 'mode_highlight_rules.js'
*/

    

    var oop = __webpack_require__(2645);
    var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

    var IonHighlightRules = (__webpack_require__(57762)/* .IonHighlightRules */ .S);

    var PartiqlHighlightRules = function() {
        // constant.language.partiql
        var k_partiql_constant =
            "MISSING";
        var k_sql_constant =
            "FALSE|NULL|TRUE";
        var k_constant = k_partiql_constant + "|" + k_sql_constant;

        // keyword.other.partiql
        var k_partiql_keyword =
            "PIVOT|UNPIVOT|LIMIT|TUPLE|REMOVE|INDEX|CONFLICT|DO|NOTHING|RETURNING|"
            +"MODIFIED|NEW|OLD|LET";
        var k_sql_keyword =
            "ABSOLUTE|ACTION|ADD|ALL|ALLOCATE|ALTER|AND|ANY|ARE|AS|"
            +"ASC|ASSERTION|AT|AUTHORIZATION|BEGIN|BETWEEN|BIT_LENGTH|BY|CASCADE|CASCADED|"
            +"CASE|CATALOG|CHAR|CHARACTER_LENGTH|CHAR_LENGTH|CHECK|CLOSE|COLLATE|COLLATION|COLUMN|"
            +"COMMIT|CONNECT|CONNECTION|CONSTRAINT|CONSTRAINTS|CONTINUE|CONVERT|CORRESPONDING|CREATE|CROSS|"
            +"CURRENT|CURSOR|DEALLOCATE|DEC|DECLARE|DEFAULT|DEFERRABLE|DEFERRED|DELETE|DESC|"
            +"DESCRIBE|DESCRIPTOR|DIAGNOSTICS|DISCONNECT|DISTINCT|DOMAIN|DROP|ELSE|END|END-EXEC|"
            +"ESCAPE|EXCEPT|EXCEPTION|EXEC|EXECUTE|EXTERNAL|EXTRACT|FETCH|FIRST|FOR|"
            +"FOREIGN|FOUND|FROM|FULL|GET|GLOBAL|GO|GOTO|GRANT|GROUP|"
            +"HAVING|IDENTITY|IMMEDIATE|IN|INDICATOR|INITIALLY|INNER|INPUT|INSENSITIVE|INSERT|"
            +"INTERSECT|INTERVAL|INTO|IS|ISOLATION|JOIN|KEY|LANGUAGE|LAST|LEFT|"
            +"LEVEL|LIKE|LOCAL|LOWER|MATCH|MODULE|NAMES|NATIONAL|NATURAL|NCHAR|"
            +"NEXT|NO|NOT|OCTET_LENGTH|OF|ON|ONLY|OPEN|OPTION|OR|"
            +"ORDER|OUTER|OUTPUT|OVERLAPS|PAD|PARTIAL|POSITION|PRECISION|PREPARE|PRESERVE|"
            +"PRIMARY|PRIOR|PRIVILEGES|PROCEDURE|PUBLIC|READ|REAL|REFERENCES|RELATIVE|RESTRICT|"
            +"REVOKE|RIGHT|ROLLBACK|ROWS|SCHEMA|SCROLL|SECTION|SELECT|SESSION|SET|"
            +"SIZE|SOME|SPACE|SQL|SQLCODE|SQLERROR|SQLSTATE|TABLE|TEMPORARY|THEN|"
            +"TIME|TO|TRANSACTION|TRANSLATE|TRANSLATION|UNION|UNIQUE|UNKNOWN|UPDATE|UPPER|"
            +"USAGE|USER|USING|VALUE|VALUES|VIEW|WHEN|WHENEVER|WHERE|WITH|"
            +"WORK|WRITE|ZONE";
        var k_keyword = k_partiql_keyword + "|" + k_sql_keyword;

        // storage.type.partiql
        var k_partiql_type =
            "BOOL|BOOLEAN|STRING|SYMBOL|CLOB|BLOB|STRUCT|LIST|SEXP|BAG";
        var k_sql_type =
            "CHARACTER|DATE|DECIMAL|DOUBLE|FLOAT|INT|INTEGER|NUMERIC|SMALLINT|TIMESTAMP|"
            +"VARCHAR|VARYING";
        var k_type = k_partiql_type + "|" + k_sql_type;

        // support.function.aggregation.partiql
        var k_sql_aggfn =
            "AVG|COUNT|MAX|MIN|SUM";
        var k_aggfn = k_sql_aggfn;

        // support.function.partiql
        var k_sql_fn =
            "CAST|COALESCE|CURRENT_DATE|CURRENT_TIME|CURRENT_TIMESTAMP|CURRENT_USER|EXISTS|DATE_ADD|DATE_DIFF|NULLIF|"
            +"SESSION_USER|SUBSTRING|SYSTEM_USER|TRIM";
        var k_fn = k_sql_fn;


        var keywordMapper = this.createKeywordMapper({
            "constant.language.partiql": k_constant,
            "keyword.other.partiql": k_keyword,
            "storage.type.partiql": k_type,
            "support.function.aggregation.partiql": k_aggfn,
            "support.function.partiql": k_fn
        }, "variable.language.identifier.partiql", true);

        var keywordMapperRule = {
            token : keywordMapper,
            regex : "\\b\\w+\\b"
        };

        this.$rules = {
          "start": [
            {
              "include": "whitespace"
            },
            {
              "include": "comment"
            },
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
              "include": "tuple_value"
            },
            {
              "include": "collection_value"
            },
            {
              "include": "scalar_value"
            }
          ],
          "scalar_value": [
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
              "include": "identifier"
            },
            {
              "include": "embed-ion"
            },
            {
              "include": "operator"
            },
            {
              "include": "punctuation"
            }
          ],
          "punctuation": [
            {
              "token": "punctuation.partiql",
              "regex": "[;:()\\[\\]\\{\\},.]"
            }
          ],
          "operator": [
            {
              "token": "keyword.operator.partiql",
              "regex": "[+*/<>=~!@#%&|?^-]+"
            }
          ],
          "identifier": [
            {
              "token": "variable.language.identifier.quoted.partiql",
              "regex": "([\"])((?:(?:\\\\.)|(?:[^\"\\\\]))*?)([\"])"
            },
            {
              "token": "variable.language.identifier.at.partiql",
              "regex": "@\\w+"
            },
            {
              "token": "variable.language.identifier.partiql",
              "regex": "\\b\\w+(?:\\.\\w+)?\\b"
            }
          ],
          "number": [
            {
              "token": "constant.numeric.partiql",
              "regex": "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
            }
          ],
          "string": [
            {
              "token": [
                "punctuation.definition.string.begin.partiql",
                "string.quoted.single.partiql",
                "punctuation.definition.string.end.partiql"
              ],
              "regex": "(['])((?:(?:\\\\.)|(?:[^'\\\\]))*?)(['])"
            }
          ],
          "collection_value": [
            {
              "include": "array_value"
            },
            {
              "include": "bag_value"
            }
          ],
          "bag_value": [
            {
              "token": "punctuation.definition.bag.begin.partiql",
              "regex": "<<",
              "push": [
                {
                  "token": "punctuation.definition.bag.end.partiql",
                  "regex": ">>",
                  "next": "pop"
                },
                {
                  "include": "comment"
                },
                {
                  "token": "punctuation.definition.bag.separator.partiql",
                  "regex": ","
                },
                {
                  "include": "value"
                }
              ]
            }
          ],
          "comment": [
            {
              "token": "comment.line.partiql",
              "regex": "--.*"
            },
            {
              "token": "comment.block.partiql",
              "regex": "/\\*",
              "push": "comment__1"
            }
          ],
          "comment__1": [
            {
              "token": "comment.block.partiql",
              "regex": "[*]/",
              "next": "pop"
            },
            {
              "token": "comment.block.partiql",
              "regex": "[^*/]+"
            },
            {
              "token": "comment.block.partiql",
              "regex": "/\\*",
              "push": "comment__1"
            },
            {
              "token": "comment.block.partiql",
              "regex": "[*/]+"
            }
          ],
          "array_value": [
            {
              "token": "punctuation.definition.array.begin.partiql",
              "regex": "\\[",
              "push": [
                {
                  "token": "punctuation.definition.array.end.partiql",
                  "regex": "\\]",
                  "next": "pop"
                },
                {
                  "include": "comment"
                },
                {
                  "token": "punctuation.definition.array.separator.partiql",
                  "regex": ","
                },
                {
                  "include": "value"
                }
              ]
            }
          ],
          "tuple_value": [
            {
              "token": "punctuation.definition.tuple.begin.partiql",
              "regex": "\\{",
              "push": [
                {
                  "token": "punctuation.definition.tuple.end.partiql",
                  "regex": "\\}",
                  "next": "pop"
                },
                {
                  "include": "comment"
                },
                {
                  "token": "punctuation.definition.tuple.separator.partiql",
                  "regex": ",|:"
                },
                {
                  "include": "value"
                }
              ]
            }
          ],
          "whitespace": [
            {
              "token": "text.partiql",
              "regex": "\\s+"
            }
          ]
        } ;
        this.$rules["keywords"] = [keywordMapperRule];

        this.$rules["embed-ion"] = [{token : "punctuation.definition.ion.begin.partiql", regex : "`", next : "ion-start"}];
        this.embedRules(IonHighlightRules, "ion-", [{token : "punctuation.definition.ion.end.partiql", regex : "`", next : "start"}]);

        this.normalizeRules();
    };

    oop.inherits(PartiqlHighlightRules, TextHighlightRules);

    exports.T = PartiqlHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLFlBQVksR0FBRztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQ0FBcUMsb0ZBQW9GO0FBQ3pILHFEQUFxRCw4RUFBOEU7O0FBRW5JO0FBQ0E7O0FBRUE7O0FBRUEsSUFBSSxTQUE2QiIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvZm9sZGluZy9jc3R5bGUuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9pb25faGlnaGxpZ2h0X3J1bGVzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvbWF0Y2hpbmdfYnJhY2Vfb3V0ZGVudC5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL3BhcnRpcWwuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9wYXJ0aXFsX2hpZ2hsaWdodF9ydWxlcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi8uLi9saWIvb29wXCIpO1xudmFyIFJhbmdlID0gcmVxdWlyZShcIi4uLy4uL3JhbmdlXCIpLlJhbmdlO1xudmFyIEJhc2VGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRfbW9kZVwiKS5Gb2xkTW9kZTtcblxudmFyIEZvbGRNb2RlID0gZXhwb3J0cy5Gb2xkTW9kZSA9IGZ1bmN0aW9uKGNvbW1lbnRSZWdleCkge1xuICAgIGlmIChjb21tZW50UmVnZXgpIHtcbiAgICAgICAgdGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIgPSBuZXcgUmVnRXhwKFxuICAgICAgICAgICAgdGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIuc291cmNlLnJlcGxhY2UoL1xcfFtefF0qPyQvLCBcInxcIiArIGNvbW1lbnRSZWdleC5zdGFydClcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5mb2xkaW5nU3RvcE1hcmtlciA9IG5ldyBSZWdFeHAoXG4gICAgICAgICAgICB0aGlzLmZvbGRpbmdTdG9wTWFya2VyLnNvdXJjZS5yZXBsYWNlKC9cXHxbXnxdKj8kLywgXCJ8XCIgKyBjb21tZW50UmVnZXguZW5kKVxuICAgICAgICApO1xuICAgIH1cbn07XG5vb3AuaW5oZXJpdHMoRm9sZE1vZGUsIEJhc2VGb2xkTW9kZSk7XG5cbihmdW5jdGlvbigpIHtcbiAgICBcbiAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlciA9IC8oW1xce1xcW1xcKF0pW15cXH1cXF1cXCldKiR8XlxccyooXFwvXFwqKS87XG4gICAgdGhpcy5mb2xkaW5nU3RvcE1hcmtlciA9IC9eW15cXFtcXHtcXChdKihbXFx9XFxdXFwpXSl8XltcXHNcXCpdKihcXCpcXC8pLztcbiAgICB0aGlzLnNpbmdsZUxpbmVCbG9ja0NvbW1lbnRSZT0gL15cXHMqKFxcL1xcKikuKlxcKlxcL1xccyokLztcbiAgICB0aGlzLnRyaXBsZVN0YXJCbG9ja0NvbW1lbnRSZSA9IC9eXFxzKihcXC9cXCpcXCpcXCopLipcXCpcXC9cXHMqJC87XG4gICAgdGhpcy5zdGFydFJlZ2lvblJlID0gL15cXHMqKFxcL1xcKnxcXC9cXC8pIz9yZWdpb25cXGIvO1xuICAgIFxuICAgIC8vcHJldmVudCBuYW1pbmcgY29uZmxpY3Qgd2l0aCBhbnkgbW9kZXMgdGhhdCBpbmhlcml0IGZyb20gY3N0eWxlIGFuZCBvdmVycmlkZSB0aGlzIChsaWtlIGNzaGFycClcbiAgICB0aGlzLl9nZXRGb2xkV2lkZ2V0QmFzZSA9IHRoaXMuZ2V0Rm9sZFdpZGdldDtcbiAgICBcbiAgICAvKipcbiAgICAgKiBHZXRzIGZvbGQgd2lkZ2V0IHdpdGggc29tZSBub24tc3RhbmRhcmQgZXh0cmFzOlxuICAgICAqXG4gICAgICogQGV4YW1wbGUgbGluZUNvbW1lbnRSZWdpb25TdGFydFxuICAgICAqICAgICAgLy8jcmVnaW9uIFtvcHRpb25hbCBkZXNjcmlwdGlvbl1cbiAgICAgKlxuICAgICAqIEBleGFtcGxlIGJsb2NrQ29tbWVudFJlZ2lvblN0YXJ0XG4gICAgICogICAgICAvKiNyZWdpb24gW29wdGlvbmFsIGRlc2NyaXB0aW9uXSAqWy9dXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSB0cmlwbGVTdGFyRm9sZGluZ1NlY3Rpb25cbiAgICAgKiAgICAgIC8qKiogdGhpcyBmb2xkcyBldmVuIHRob3VnaCAxIGxpbmUgYmVjYXVzZSBpdCBoYXMgMyBzdGFycyAqKipbL11cbiAgICAgKiBcbiAgICAgKiBAbm90ZSB0aGUgcG91bmQgc3ltYm9sIGZvciByZWdpb24gdGFncyBpcyBvcHRpb25hbFxuICAgICAqL1xuICAgIHRoaXMuZ2V0Rm9sZFdpZGdldCA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgXG4gICAgICAgIGlmICh0aGlzLnNpbmdsZUxpbmVCbG9ja0NvbW1lbnRSZS50ZXN0KGxpbmUpKSB7XG4gICAgICAgICAgICAvLyBObyB3aWRnZXQgZm9yIHNpbmdsZSBsaW5lIGJsb2NrIGNvbW1lbnQgdW5sZXNzIHJlZ2lvbiBvciB0cmlwbGUgc3RhclxuICAgICAgICAgICAgaWYgKCF0aGlzLnN0YXJ0UmVnaW9uUmUudGVzdChsaW5lKSAmJiAhdGhpcy50cmlwbGVTdGFyQmxvY2tDb21tZW50UmUudGVzdChsaW5lKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICB2YXIgZncgPSB0aGlzLl9nZXRGb2xkV2lkZ2V0QmFzZShzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdyk7XG4gICAgXG4gICAgICAgIGlmICghZncgJiYgdGhpcy5zdGFydFJlZ2lvblJlLnRlc3QobGluZSkpXG4gICAgICAgICAgICByZXR1cm4gXCJzdGFydFwiOyAvLyBsaW5lQ29tbWVudFJlZ2lvblN0YXJ0XG4gICAgXG4gICAgICAgIHJldHVybiBmdztcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0UmFuZ2UgPSBmdW5jdGlvbihzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdywgZm9yY2VNdWx0aWxpbmUpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLnN0YXJ0UmVnaW9uUmUudGVzdChsaW5lKSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldENvbW1lbnRSZWdpb25CbG9jayhzZXNzaW9uLCBsaW5lLCByb3cpO1xuICAgICAgICBcbiAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCh0aGlzLmZvbGRpbmdTdGFydE1hcmtlcik7XG4gICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgdmFyIGkgPSBtYXRjaC5pbmRleDtcblxuICAgICAgICAgICAgaWYgKG1hdGNoWzFdKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm9wZW5pbmdCcmFja2V0QmxvY2soc2Vzc2lvbiwgbWF0Y2hbMV0sIHJvdywgaSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgcmFuZ2UgPSBzZXNzaW9uLmdldENvbW1lbnRGb2xkUmFuZ2Uocm93LCBpICsgbWF0Y2hbMF0ubGVuZ3RoLCAxKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHJhbmdlICYmICFyYW5nZS5pc011bHRpTGluZSgpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZvcmNlTXVsdGlsaW5lKSB7XG4gICAgICAgICAgICAgICAgICAgIHJhbmdlID0gdGhpcy5nZXRTZWN0aW9uUmFuZ2Uoc2Vzc2lvbiwgcm93KTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZvbGRTdHlsZSAhPSBcImFsbFwiKVxuICAgICAgICAgICAgICAgICAgICByYW5nZSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiByYW5nZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmb2xkU3R5bGUgPT09IFwibWFya2JlZ2luXCIpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCh0aGlzLmZvbGRpbmdTdG9wTWFya2VyKTtcbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICB2YXIgaSA9IG1hdGNoLmluZGV4ICsgbWF0Y2hbMF0ubGVuZ3RoO1xuXG4gICAgICAgICAgICBpZiAobWF0Y2hbMV0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2xvc2luZ0JyYWNrZXRCbG9jayhzZXNzaW9uLCBtYXRjaFsxXSwgcm93LCBpKTtcblxuICAgICAgICAgICAgcmV0dXJuIHNlc3Npb24uZ2V0Q29tbWVudEZvbGRSYW5nZShyb3csIGksIC0xKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgXG4gICAgdGhpcy5nZXRTZWN0aW9uUmFuZ2UgPSBmdW5jdGlvbihzZXNzaW9uLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgdmFyIHN0YXJ0SW5kZW50ID0gbGluZS5zZWFyY2goL1xcUy8pO1xuICAgICAgICB2YXIgc3RhcnRSb3cgPSByb3c7XG4gICAgICAgIHZhciBzdGFydENvbHVtbiA9IGxpbmUubGVuZ3RoO1xuICAgICAgICByb3cgPSByb3cgKyAxO1xuICAgICAgICB2YXIgZW5kUm93ID0gcm93O1xuICAgICAgICB2YXIgbWF4Um93ID0gc2Vzc2lvbi5nZXRMZW5ndGgoKTtcbiAgICAgICAgd2hpbGUgKCsrcm93IDwgbWF4Um93KSB7XG4gICAgICAgICAgICBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgICAgICB2YXIgaW5kZW50ID0gbGluZS5zZWFyY2goL1xcUy8pO1xuICAgICAgICAgICAgaWYgKGluZGVudCA9PT0gLTEpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICBpZiAgKHN0YXJ0SW5kZW50ID4gaW5kZW50KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgdmFyIHN1YlJhbmdlID0gdGhpcy5nZXRGb2xkV2lkZ2V0UmFuZ2Uoc2Vzc2lvbiwgXCJhbGxcIiwgcm93KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHN1YlJhbmdlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN1YlJhbmdlLnN0YXJ0LnJvdyA8PSBzdGFydFJvdykge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN1YlJhbmdlLmlzTXVsdGlMaW5lKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcm93ID0gc3ViUmFuZ2UuZW5kLnJvdztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXJ0SW5kZW50ID09IGluZGVudCkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbmRSb3cgPSByb3c7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBuZXcgUmFuZ2Uoc3RhcnRSb3csIHN0YXJ0Q29sdW1uLCBlbmRSb3csIHNlc3Npb24uZ2V0TGluZShlbmRSb3cpLmxlbmd0aCk7XG4gICAgfTtcbiAgICBcbiAgICAvKipcbiAgICAgKiBnZXRzIGNvbW1lbnQgcmVnaW9uIGJsb2NrIHdpdGggZW5kIHJlZ2lvbiBhc3N1bWVkIHRvIGJlIHN0YXJ0IG9mIGNvbW1lbnQgaW4gYW55IGNzdHlsZSBtb2RlIG9yIFNRTCBtb2RlICgtLSkgd2hpY2ggaW5oZXJpdHMgZnJvbSB0aGlzLlxuICAgICAqIFRoZXJlIG1heSBvcHRpb25hbGx5IGJlIGEgcG91bmQgc3ltYm9sIGJlZm9yZSB0aGUgcmVnaW9uL2VuZHJlZ2lvbiBzdGF0ZW1lbnRcbiAgICAgKi9cbiAgICB0aGlzLmdldENvbW1lbnRSZWdpb25CbG9jayA9IGZ1bmN0aW9uKHNlc3Npb24sIGxpbmUsIHJvdykge1xuICAgICAgICB2YXIgc3RhcnRDb2x1bW4gPSBsaW5lLnNlYXJjaCgvXFxzKiQvKTtcbiAgICAgICAgdmFyIG1heFJvdyA9IHNlc3Npb24uZ2V0TGVuZ3RoKCk7XG4gICAgICAgIHZhciBzdGFydFJvdyA9IHJvdztcbiAgICAgICAgXG4gICAgICAgIHZhciByZSA9IC9eXFxzKig/OlxcL1xcKnxcXC9cXC98LS0pIz8oZW5kKT9yZWdpb25cXGIvO1xuICAgICAgICB2YXIgZGVwdGggPSAxO1xuICAgICAgICB3aGlsZSAoKytyb3cgPCBtYXhSb3cpIHtcbiAgICAgICAgICAgIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgICAgIHZhciBtID0gcmUuZXhlYyhsaW5lKTtcbiAgICAgICAgICAgIGlmICghbSkgY29udGludWU7XG4gICAgICAgICAgICBpZiAobVsxXSkgZGVwdGgtLTtcbiAgICAgICAgICAgIGVsc2UgZGVwdGgrKztcblxuICAgICAgICAgICAgaWYgKCFkZXB0aCkgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZW5kUm93ID0gcm93O1xuICAgICAgICBpZiAoZW5kUm93ID4gc3RhcnRSb3cpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmFuZ2Uoc3RhcnRSb3csIHN0YXJ0Q29sdW1uLCBlbmRSb3csIGxpbmUubGVuZ3RoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbn0pLmNhbGwoRm9sZE1vZGUucHJvdG90eXBlKTtcbiIsIi8qXG4gIFRISVMgRklMRSBXQVMgR0VORVJBVEVEIEJZICdsaWdhbmQnIFVTSU5HICdtb2RlX2hpZ2hsaWdodF9ydWxlcy5qcydcbiovXG5cbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIHZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbiAgICB2YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xuXG5cbiAgICB2YXIgSW9uSGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gY29uc3RhbnQubGFuZ3VhZ2UuYm9vbC5pb25cbiAgICAgICAgdmFyIGtfa2V5d29yZHNfYm9vbCA9XG4gICAgICAgICAgICBcIlRSVUV8RkFMU0VcIjtcbiAgICAgICAgdmFyIGtfYm9vbCA9IGtfa2V5d29yZHNfYm9vbDtcblxuICAgICAgICAvLyBjb25zdGFudC5sYW5ndWFnZS5udWxsLmlvblxuICAgICAgICB2YXIga19rZXl3b3Jkc19udWxsID1cbiAgICAgICAgICAgIFwiTlVMTC5OVUxMfE5VTEwuQk9PTHxOVUxMLklOVHxOVUxMLkZMT0FUfE5VTEwuREVDSU1BTHxOVUxMLlRJTUVTVEFNUHxOVUxMLlNUUklOR3xOVUxMLlNZTUJPTHxOVUxMLkJMT0J8TlVMTC5DTE9CfFwiXG4gICAgICAgICAgICArXCJOVUxMLlNUUlVDVHxOVUxMLkxJU1R8TlVMTC5TRVhQfE5VTExcIjtcbiAgICAgICAgdmFyIGtfbnVsbCA9IGtfa2V5d29yZHNfbnVsbDtcblxuXG4gICAgICAgIHZhciBrZXl3b3JkTWFwcGVyID0gdGhpcy5jcmVhdGVLZXl3b3JkTWFwcGVyKHtcbiAgICAgICAgICAgIFwiY29uc3RhbnQubGFuZ3VhZ2UuYm9vbC5pb25cIjoga19ib29sLFxuICAgICAgICAgICAgXCJjb25zdGFudC5sYW5ndWFnZS5udWxsLmlvblwiOiBrX251bGxcbiAgICAgICAgfSwgXCJjb25zdGFudC5vdGhlci5zeW1ib2wuaWRlbnRpZmllci5pb25cIiwgdHJ1ZSk7XG5cbiAgICAgICAgdmFyIGtleXdvcmRNYXBwZXJSdWxlID0ge1xuICAgICAgICAgICAgdG9rZW4gOiBrZXl3b3JkTWFwcGVyLFxuICAgICAgICAgICAgcmVnZXggOiBcIlxcXFxiXFxcXHcrKD86XFxcXC5cXFxcdyspP1xcXFxiXCJcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLiRydWxlcyA9IHtcbiAgICAgICAgICBcInN0YXJ0XCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJpbmNsdWRlXCI6IFwidmFsdWVcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJ2YWx1ZVwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwiaW5jbHVkZVwiOiBcIndoaXRlc3BhY2VcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJpbmNsdWRlXCI6IFwiY29tbWVudFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcImluY2x1ZGVcIjogXCJhbm5vdGF0aW9uXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwiaW5jbHVkZVwiOiBcInN0cmluZ1wiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcImluY2x1ZGVcIjogXCJudW1iZXJcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJpbmNsdWRlXCI6IFwia2V5d29yZHNcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJpbmNsdWRlXCI6IFwic3ltYm9sXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwiaW5jbHVkZVwiOiBcImNsb2JcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJpbmNsdWRlXCI6IFwiYmxvYlwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcImluY2x1ZGVcIjogXCJzdHJ1Y3RcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJpbmNsdWRlXCI6IFwibGlzdFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcImluY2x1ZGVcIjogXCJzZXhwXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdLFxuICAgICAgICAgIFwic2V4cFwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidG9rZW5cIjogXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnNleHAuYmVnaW4uaW9uXCIsXG4gICAgICAgICAgICAgIFwicmVnZXhcIjogXCJcXFxcKFwiLFxuICAgICAgICAgICAgICBcInB1c2hcIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidG9rZW5cIjogXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnNleHAuZW5kLmlvblwiLFxuICAgICAgICAgICAgICAgICAgXCJyZWdleFwiOiBcIlxcXFwpXCIsXG4gICAgICAgICAgICAgICAgICBcIm5leHRcIjogXCJwb3BcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJpbmNsdWRlXCI6IFwiY29tbWVudFwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcImluY2x1ZGVcIjogXCJ2YWx1ZVwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInRva2VuXCI6IFwic3RvcmFnZS50eXBlLnN5bWJvbC5vcGVyYXRvci5pb25cIixcbiAgICAgICAgICAgICAgICAgIFwicmVnZXhcIjogXCJbXFxcXCFcXFxcI1xcXFwlXFxcXCZcXFxcKlxcXFwrXFxcXC1cXFxcLi9cXFxcO1xcXFw8XFxcXD1cXFxcPlxcXFw/XFxcXEBcXFxcXlxcXFxgXFxcXHxcXFxcfl0rXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdLFxuICAgICAgICAgIFwiY29tbWVudFwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidG9rZW5cIjogXCJjb21tZW50LmxpbmUuaW9uXCIsXG4gICAgICAgICAgICAgIFwicmVnZXhcIjogXCIvL1teXFxcXG5dKlwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInRva2VuXCI6IFwiY29tbWVudC5ibG9jay5pb25cIixcbiAgICAgICAgICAgICAgXCJyZWdleFwiOiBcIi9cXFxcKlwiLFxuICAgICAgICAgICAgICBcInB1c2hcIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidG9rZW5cIjogXCJjb21tZW50LmJsb2NrLmlvblwiLFxuICAgICAgICAgICAgICAgICAgXCJyZWdleFwiOiBcIlsqXS9cIixcbiAgICAgICAgICAgICAgICAgIFwibmV4dFwiOiBcInBvcFwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInRva2VuXCI6IFwiY29tbWVudC5ibG9jay5pb25cIixcbiAgICAgICAgICAgICAgICAgIFwicmVnZXhcIjogXCJbXiovXStcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0b2tlblwiOiBcImNvbW1lbnQuYmxvY2suaW9uXCIsXG4gICAgICAgICAgICAgICAgICBcInJlZ2V4XCI6IFwiWyovXStcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJsaXN0XCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0b2tlblwiOiBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24ubGlzdC5iZWdpbi5pb25cIixcbiAgICAgICAgICAgICAgXCJyZWdleFwiOiBcIlxcXFxbXCIsXG4gICAgICAgICAgICAgIFwicHVzaFwiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0b2tlblwiOiBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24ubGlzdC5lbmQuaW9uXCIsXG4gICAgICAgICAgICAgICAgICBcInJlZ2V4XCI6IFwiXFxcXF1cIixcbiAgICAgICAgICAgICAgICAgIFwibmV4dFwiOiBcInBvcFwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcImluY2x1ZGVcIjogXCJjb21tZW50XCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwiaW5jbHVkZVwiOiBcInZhbHVlXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidG9rZW5cIjogXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLmxpc3Quc2VwYXJhdG9yLmlvblwiLFxuICAgICAgICAgICAgICAgICAgXCJyZWdleFwiOiBcIixcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJzdHJ1Y3RcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInRva2VuXCI6IFwicHVuY3R1YXRpb24uZGVmaW5pdGlvbi5zdHJ1Y3QuYmVnaW4uaW9uXCIsXG4gICAgICAgICAgICAgIFwicmVnZXhcIjogXCJcXFxce1wiLFxuICAgICAgICAgICAgICBcInB1c2hcIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidG9rZW5cIjogXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnN0cnVjdC5lbmQuaW9uXCIsXG4gICAgICAgICAgICAgICAgICBcInJlZ2V4XCI6IFwiXFxcXH1cIixcbiAgICAgICAgICAgICAgICAgIFwibmV4dFwiOiBcInBvcFwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcImluY2x1ZGVcIjogXCJjb21tZW50XCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwiaW5jbHVkZVwiOiBcInZhbHVlXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidG9rZW5cIjogXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnN0cnVjdC5zZXBhcmF0b3IuaW9uXCIsXG4gICAgICAgICAgICAgICAgICBcInJlZ2V4XCI6IFwiLHw6XCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdLFxuICAgICAgICAgIFwiYmxvYlwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidG9rZW5cIjogW1xuICAgICAgICAgICAgICAgIFwicHVuY3R1YXRpb24uZGVmaW5pdGlvbi5ibG9iLmJlZ2luLmlvblwiLFxuICAgICAgICAgICAgICAgIFwic3RyaW5nLm90aGVyLmJsb2IuaW9uXCIsXG4gICAgICAgICAgICAgICAgXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLmJsb2IuZW5kLmlvblwiXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIFwicmVnZXhcIjogXCIoXFxcXHtcXFxceykoW15cXFwiXSopKFxcXFx9XFxcXH0pXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdLFxuICAgICAgICAgIFwiY2xvYlwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidG9rZW5cIjogW1xuICAgICAgICAgICAgICAgIFwicHVuY3R1YXRpb24uZGVmaW5pdGlvbi5jbG9iLmJlZ2luLmlvblwiLFxuICAgICAgICAgICAgICAgIFwic3RyaW5nLm90aGVyLmNsb2IuaW9uXCIsXG4gICAgICAgICAgICAgICAgXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLmNsb2IuZW5kLmlvblwiXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIFwicmVnZXhcIjogXCIoXFxcXHtcXFxceykoXFxcIlteXFxcIl0qXFxcIikoXFxcXH1cXFxcfSlcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJzeW1ib2xcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInRva2VuXCI6IFwic3RvcmFnZS50eXBlLnN5bWJvbC5xdW90ZWQuaW9uXCIsXG4gICAgICAgICAgICAgIFwicmVnZXhcIjogXCIoWyddKSgoPzooPzpcXFxcXFxcXCcpfCg/OlteJ10pKSo/KShbJ10pXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidG9rZW5cIjogXCJzdG9yYWdlLnR5cGUuc3ltYm9sLmlkZW50aWZpZXIuaW9uXCIsXG4gICAgICAgICAgICAgIFwicmVnZXhcIjogXCJbXFxcXCRfYS16QS1aXVtcXFxcJF9hLXpBLVowLTldKlwiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXSxcbiAgICAgICAgICBcIm51bWJlclwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidG9rZW5cIjogXCJjb25zdGFudC5udW1lcmljLnRpbWVzdGFtcC5pb25cIixcbiAgICAgICAgICAgICAgXCJyZWdleFwiOiBcIlxcXFxkezR9KD86LVxcXFxkezJ9KT8oPzotXFxcXGR7Mn0pP1QoPzpcXFxcZHsyfTpcXFxcZHsyfSkoPzo6XFxcXGR7Mn0pPyg/OlxcXFwuXFxcXGQrKT8oPzpafFstK11cXFxcZHsyfTpcXFxcZHsyfSk/XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidG9rZW5cIjogXCJjb25zdGFudC5udW1lcmljLnRpbWVzdGFtcC5pb25cIixcbiAgICAgICAgICAgICAgXCJyZWdleFwiOiBcIlxcXFxkezR9LVxcXFxkezJ9LVxcXFxkezJ9VD9cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0b2tlblwiOiBcImNvbnN0YW50Lm51bWVyaWMuaW50ZWdlci5iaW5hcnkuaW9uXCIsXG4gICAgICAgICAgICAgIFwicmVnZXhcIjogXCItPzBbYkJdWzAxXSg/Ol8/WzAxXSkqXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidG9rZW5cIjogXCJjb25zdGFudC5udW1lcmljLmludGVnZXIuaGV4LmlvblwiLFxuICAgICAgICAgICAgICBcInJlZ2V4XCI6IFwiLT8wW3hYXVswLTlhLWZBLUZdKD86Xz9bMC05YS1mQS1GXSkqXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidG9rZW5cIjogXCJjb25zdGFudC5udW1lcmljLmZsb2F0LmlvblwiLFxuICAgICAgICAgICAgICBcInJlZ2V4XCI6IFwiLT8oPzowfFsxLTldKD86Xz9cXFxcZCkqKSg/OlxcXFwuKD86XFxcXGQoPzpfP1xcXFxkKSopPyk/KD86W2VFXVsrLV0/XFxcXGQrKVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInRva2VuXCI6IFwiY29uc3RhbnQubnVtZXJpYy5mbG9hdC5pb25cIixcbiAgICAgICAgICAgICAgXCJyZWdleFwiOiBcIig/OlstK11pbmYpfCg/Om5hbilcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0b2tlblwiOiBcImNvbnN0YW50Lm51bWVyaWMuZGVjaW1hbC5pb25cIixcbiAgICAgICAgICAgICAgXCJyZWdleFwiOiBcIi0/KD86MHxbMS05XSg/Ol8/XFxcXGQpKikoPzooPzooPzpcXFxcLig/OlxcXFxkKD86Xz9cXFxcZCkqKT8pKD86W2REXVsrLV0/XFxcXGQrKXxcXFxcLig/OlxcXFxkKD86Xz9cXFxcZCkqKT8pfCg/OltkRF1bKy1dP1xcXFxkKykpXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidG9rZW5cIjogXCJjb25zdGFudC5udW1lcmljLmludGVnZXIuaW9uXCIsXG4gICAgICAgICAgICAgIFwicmVnZXhcIjogXCItPyg/OjB8WzEtOV0oPzpfP1xcXFxkKSopXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdLFxuICAgICAgICAgIFwic3RyaW5nXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0b2tlblwiOiBbXG4gICAgICAgICAgICAgICAgXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnN0cmluZy5iZWdpbi5pb25cIixcbiAgICAgICAgICAgICAgICBcInN0cmluZy5xdW90ZWQuZG91YmxlLmlvblwiLFxuICAgICAgICAgICAgICAgIFwicHVuY3R1YXRpb24uZGVmaW5pdGlvbi5zdHJpbmcuZW5kLmlvblwiXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIFwicmVnZXhcIjogXCIoW1xcXCJdKSgoPzooPzpcXFxcXFxcXFxcXCIpfCg/OlteXFxcIl0pKSo/KShbXFxcIl0pXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidG9rZW5cIjogXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnN0cmluZy5iZWdpbi5pb25cIixcbiAgICAgICAgICAgICAgXCJyZWdleFwiOiBcIid7M31cIixcbiAgICAgICAgICAgICAgXCJwdXNoXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInRva2VuXCI6IFwicHVuY3R1YXRpb24uZGVmaW5pdGlvbi5zdHJpbmcuZW5kLmlvblwiLFxuICAgICAgICAgICAgICAgICAgXCJyZWdleFwiOiBcIid7M31cIixcbiAgICAgICAgICAgICAgICAgIFwibmV4dFwiOiBcInBvcFwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInRva2VuXCI6IFwic3RyaW5nLnF1b3RlZC50cmlwbGUuaW9uXCIsXG4gICAgICAgICAgICAgICAgICBcInJlZ2V4XCI6IFwiKD86XFxcXFxcXFwnfFteJ10pK1wiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInRva2VuXCI6IFwic3RyaW5nLnF1b3RlZC50cmlwbGUuaW9uXCIsXG4gICAgICAgICAgICAgICAgICBcInJlZ2V4XCI6IFwiJ1wiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXSxcbiAgICAgICAgICBcImFubm90YXRpb25cIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInRva2VuXCI6IFtcbiAgICAgICAgICAgICAgICBcInZhcmlhYmxlLmxhbmd1YWdlLmFubm90YXRpb24uaW9uXCIsXG4gICAgICAgICAgICAgICAgXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLmFubm90YXRpb24uaW9uXCJcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgXCJyZWdleFwiOiAvKCcoPzpbXidcXFxcXXxcXFxcLikqJylcXHMqKDo6KS9cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidG9rZW5cIjogW1xuICAgICAgICAgICAgICAgIFwidmFyaWFibGUubGFuZ3VhZ2UuYW5ub3RhdGlvbi5pb25cIixcbiAgICAgICAgICAgICAgICBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24uYW5ub3RhdGlvbi5pb25cIlxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBcInJlZ2V4XCI6IFwiKFtcXFxcJF9hLXpBLVpdW1xcXFwkX2EtekEtWjAtOV0qKVxcXFxzKig6OilcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJ3aGl0ZXNwYWNlXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0b2tlblwiOiBcInRleHQuaW9uXCIsXG4gICAgICAgICAgICAgIFwicmVnZXhcIjogXCJcXFxccytcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfSA7XG4gICAgICAgIHRoaXMuJHJ1bGVzW1wia2V5d29yZHNcIl0gPSBba2V5d29yZE1hcHBlclJ1bGVdO1xuXG5cbiAgICAgICAgdGhpcy5ub3JtYWxpemVSdWxlcygpO1xuICAgIH07XG5cbiAgICBvb3AuaW5oZXJpdHMoSW9uSGlnaGxpZ2h0UnVsZXMsIFRleHRIaWdobGlnaHRSdWxlcyk7XG5cbiAgICBleHBvcnRzLklvbkhpZ2hsaWdodFJ1bGVzID0gSW9uSGlnaGxpZ2h0UnVsZXM7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIFJhbmdlID0gcmVxdWlyZShcIi4uL3JhbmdlXCIpLlJhbmdlO1xuXG52YXIgTWF0Y2hpbmdCcmFjZU91dGRlbnQgPSBmdW5jdGlvbigpIHt9O1xuXG4oZnVuY3Rpb24oKSB7XG5cbiAgICB0aGlzLmNoZWNrT3V0ZGVudCA9IGZ1bmN0aW9uKGxpbmUsIGlucHV0KSB7XG4gICAgICAgIGlmICghIC9eXFxzKyQvLnRlc3QobGluZSkpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgcmV0dXJuIC9eXFxzKlxcfS8udGVzdChpbnB1dCk7XG4gICAgfTtcblxuICAgIHRoaXMuYXV0b091dGRlbnQgPSBmdW5jdGlvbihkb2MsIHJvdykge1xuICAgICAgICB2YXIgbGluZSA9IGRvYy5nZXRMaW5lKHJvdyk7XG4gICAgICAgIHZhciBtYXRjaCA9IGxpbmUubWF0Y2goL14oXFxzKlxcfSkvKTtcblxuICAgICAgICBpZiAoIW1hdGNoKSByZXR1cm4gMDtcblxuICAgICAgICB2YXIgY29sdW1uID0gbWF0Y2hbMV0ubGVuZ3RoO1xuICAgICAgICB2YXIgb3BlbkJyYWNlUG9zID0gZG9jLmZpbmRNYXRjaGluZ0JyYWNrZXQoe3Jvdzogcm93LCBjb2x1bW46IGNvbHVtbn0pO1xuXG4gICAgICAgIGlmICghb3BlbkJyYWNlUG9zIHx8IG9wZW5CcmFjZVBvcy5yb3cgPT0gcm93KSByZXR1cm4gMDtcblxuICAgICAgICB2YXIgaW5kZW50ID0gdGhpcy4kZ2V0SW5kZW50KGRvYy5nZXRMaW5lKG9wZW5CcmFjZVBvcy5yb3cpKTtcbiAgICAgICAgZG9jLnJlcGxhY2UobmV3IFJhbmdlKHJvdywgMCwgcm93LCBjb2x1bW4tMSksIGluZGVudCk7XG4gICAgfTtcblxuICAgIHRoaXMuJGdldEluZGVudCA9IGZ1bmN0aW9uKGxpbmUpIHtcbiAgICAgICAgcmV0dXJuIGxpbmUubWF0Y2goL15cXHMqLylbMF07XG4gICAgfTtcblxufSkuY2FsbChNYXRjaGluZ0JyYWNlT3V0ZGVudC5wcm90b3R5cGUpO1xuXG5leHBvcnRzLk1hdGNoaW5nQnJhY2VPdXRkZW50ID0gTWF0Y2hpbmdCcmFjZU91dGRlbnQ7XG4iLCIvKlxuICBUSElTIEZJTEUgV0FTIEdFTkVSQVRFRCBCWSAnbGlnYW5kJyBVU0lORyAnbW9kZS5qcydcbiovXG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dE1vZGUgPSByZXF1aXJlKFwiLi90ZXh0XCIpLk1vZGU7XG52YXIgSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9wYXJ0aXFsX2hpZ2hsaWdodF9ydWxlc1wiKS5QYXJ0aXFsSGlnaGxpZ2h0UnVsZXM7XG52YXIgTWF0Y2hpbmdCcmFjZU91dGRlbnQgPSByZXF1aXJlKFwiLi9tYXRjaGluZ19icmFjZV9vdXRkZW50XCIpLk1hdGNoaW5nQnJhY2VPdXRkZW50O1xudmFyIENTdHlsZUZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZGluZy9jc3R5bGVcIikuRm9sZE1vZGU7XG5cbnZhciBNb2RlID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuSGlnaGxpZ2h0UnVsZXMgPSBIaWdobGlnaHRSdWxlcztcbiAgICB0aGlzLiRvdXRkZW50ID0gbmV3IE1hdGNoaW5nQnJhY2VPdXRkZW50KCk7XG4gICAgdGhpcy4kYmVoYXZpb3VyID0gdGhpcy4kZGVmYXVsdEJlaGF2aW91cjtcbiAgICB0aGlzLmZvbGRpbmdSdWxlcyA9IG5ldyBDU3R5bGVGb2xkTW9kZSgpO1xufTtcbm9vcC5pbmhlcml0cyhNb2RlLCBUZXh0TW9kZSk7XG5cbihmdW5jdGlvbiAoKSB7XG5cbiAgICB0aGlzLmxpbmVDb21tZW50U3RhcnQgPSBcIi0tXCI7XG4gICAgdGhpcy5ibG9ja0NvbW1lbnQgPSB7XG4gICAgICAgIHN0YXJ0OiBcIi8qXCIsXG4gICAgICAgIGVuZDogXCIqL1wiLFxuICAgICAgICBuZXN0YWJsZTogdHJ1ZVxuICAgIH07XG5cbiAgICB0aGlzLmdldE5leHRMaW5lSW5kZW50ID0gZnVuY3Rpb24gKHN0YXRlLCBsaW5lLCB0YWIpIHtcbiAgICAgICAgdmFyIGluZGVudCA9IHRoaXMuJGdldEluZGVudChsaW5lKTtcblxuICAgICAgICBpZiAoc3RhdGUgPT0gXCJzdGFydFwiKSB7XG4gICAgICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKC9eLipbXFx7XFwoXFxbXVxccyokLyk7XG4gICAgICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgICAgICBpbmRlbnQgKz0gdGFiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGluZGVudDtcbiAgICB9O1xuXG4gICAgdGhpcy5jaGVja091dGRlbnQgPSBmdW5jdGlvbiAoc3RhdGUsIGxpbmUsIGlucHV0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRvdXRkZW50LmNoZWNrT3V0ZGVudChsaW5lLCBpbnB1dCk7XG4gICAgfTtcblxuICAgIHRoaXMuYXV0b091dGRlbnQgPSBmdW5jdGlvbiAoc3RhdGUsIGRvYywgcm93KSB7XG4gICAgICAgIHRoaXMuJG91dGRlbnQuYXV0b091dGRlbnQoZG9jLCByb3cpO1xuICAgIH07XG5cbiAgICB0aGlzLiRpZCA9IFwiYWNlL21vZGUvcGFydGlxbFwiO1xufSkuY2FsbChNb2RlLnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTW9kZSA9IE1vZGU7XG4iLCIvKlxuICBUSElTIEZJTEUgV0FTIEdFTkVSQVRFRCBCWSAnbGlnYW5kJyBVU0lORyAnbW9kZV9oaWdobGlnaHRfcnVsZXMuanMnXG4qL1xuXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICB2YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG4gICAgdmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcblxuICAgIHZhciBJb25IaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL2lvbl9oaWdobGlnaHRfcnVsZXNcIikuSW9uSGlnaGxpZ2h0UnVsZXM7XG5cbiAgICB2YXIgUGFydGlxbEhpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIGNvbnN0YW50Lmxhbmd1YWdlLnBhcnRpcWxcbiAgICAgICAgdmFyIGtfcGFydGlxbF9jb25zdGFudCA9XG4gICAgICAgICAgICBcIk1JU1NJTkdcIjtcbiAgICAgICAgdmFyIGtfc3FsX2NvbnN0YW50ID1cbiAgICAgICAgICAgIFwiRkFMU0V8TlVMTHxUUlVFXCI7XG4gICAgICAgIHZhciBrX2NvbnN0YW50ID0ga19wYXJ0aXFsX2NvbnN0YW50ICsgXCJ8XCIgKyBrX3NxbF9jb25zdGFudDtcblxuICAgICAgICAvLyBrZXl3b3JkLm90aGVyLnBhcnRpcWxcbiAgICAgICAgdmFyIGtfcGFydGlxbF9rZXl3b3JkID1cbiAgICAgICAgICAgIFwiUElWT1R8VU5QSVZPVHxMSU1JVHxUVVBMRXxSRU1PVkV8SU5ERVh8Q09ORkxJQ1R8RE98Tk9USElOR3xSRVRVUk5JTkd8XCJcbiAgICAgICAgICAgICtcIk1PRElGSUVEfE5FV3xPTER8TEVUXCI7XG4gICAgICAgIHZhciBrX3NxbF9rZXl3b3JkID1cbiAgICAgICAgICAgIFwiQUJTT0xVVEV8QUNUSU9OfEFERHxBTEx8QUxMT0NBVEV8QUxURVJ8QU5EfEFOWXxBUkV8QVN8XCJcbiAgICAgICAgICAgICtcIkFTQ3xBU1NFUlRJT058QVR8QVVUSE9SSVpBVElPTnxCRUdJTnxCRVRXRUVOfEJJVF9MRU5HVEh8Qll8Q0FTQ0FERXxDQVNDQURFRHxcIlxuICAgICAgICAgICAgK1wiQ0FTRXxDQVRBTE9HfENIQVJ8Q0hBUkFDVEVSX0xFTkdUSHxDSEFSX0xFTkdUSHxDSEVDS3xDTE9TRXxDT0xMQVRFfENPTExBVElPTnxDT0xVTU58XCJcbiAgICAgICAgICAgICtcIkNPTU1JVHxDT05ORUNUfENPTk5FQ1RJT058Q09OU1RSQUlOVHxDT05TVFJBSU5UU3xDT05USU5VRXxDT05WRVJUfENPUlJFU1BPTkRJTkd8Q1JFQVRFfENST1NTfFwiXG4gICAgICAgICAgICArXCJDVVJSRU5UfENVUlNPUnxERUFMTE9DQVRFfERFQ3xERUNMQVJFfERFRkFVTFR8REVGRVJSQUJMRXxERUZFUlJFRHxERUxFVEV8REVTQ3xcIlxuICAgICAgICAgICAgK1wiREVTQ1JJQkV8REVTQ1JJUFRPUnxESUFHTk9TVElDU3xESVNDT05ORUNUfERJU1RJTkNUfERPTUFJTnxEUk9QfEVMU0V8RU5EfEVORC1FWEVDfFwiXG4gICAgICAgICAgICArXCJFU0NBUEV8RVhDRVBUfEVYQ0VQVElPTnxFWEVDfEVYRUNVVEV8RVhURVJOQUx8RVhUUkFDVHxGRVRDSHxGSVJTVHxGT1J8XCJcbiAgICAgICAgICAgICtcIkZPUkVJR058Rk9VTkR8RlJPTXxGVUxMfEdFVHxHTE9CQUx8R098R09UT3xHUkFOVHxHUk9VUHxcIlxuICAgICAgICAgICAgK1wiSEFWSU5HfElERU5USVRZfElNTUVESUFURXxJTnxJTkRJQ0FUT1J8SU5JVElBTExZfElOTkVSfElOUFVUfElOU0VOU0lUSVZFfElOU0VSVHxcIlxuICAgICAgICAgICAgK1wiSU5URVJTRUNUfElOVEVSVkFMfElOVE98SVN8SVNPTEFUSU9OfEpPSU58S0VZfExBTkdVQUdFfExBU1R8TEVGVHxcIlxuICAgICAgICAgICAgK1wiTEVWRUx8TElLRXxMT0NBTHxMT1dFUnxNQVRDSHxNT0RVTEV8TkFNRVN8TkFUSU9OQUx8TkFUVVJBTHxOQ0hBUnxcIlxuICAgICAgICAgICAgK1wiTkVYVHxOT3xOT1R8T0NURVRfTEVOR1RIfE9GfE9OfE9OTFl8T1BFTnxPUFRJT058T1J8XCJcbiAgICAgICAgICAgICtcIk9SREVSfE9VVEVSfE9VVFBVVHxPVkVSTEFQU3xQQUR8UEFSVElBTHxQT1NJVElPTnxQUkVDSVNJT058UFJFUEFSRXxQUkVTRVJWRXxcIlxuICAgICAgICAgICAgK1wiUFJJTUFSWXxQUklPUnxQUklWSUxFR0VTfFBST0NFRFVSRXxQVUJMSUN8UkVBRHxSRUFMfFJFRkVSRU5DRVN8UkVMQVRJVkV8UkVTVFJJQ1R8XCJcbiAgICAgICAgICAgICtcIlJFVk9LRXxSSUdIVHxST0xMQkFDS3xST1dTfFNDSEVNQXxTQ1JPTEx8U0VDVElPTnxTRUxFQ1R8U0VTU0lPTnxTRVR8XCJcbiAgICAgICAgICAgICtcIlNJWkV8U09NRXxTUEFDRXxTUUx8U1FMQ09ERXxTUUxFUlJPUnxTUUxTVEFURXxUQUJMRXxURU1QT1JBUll8VEhFTnxcIlxuICAgICAgICAgICAgK1wiVElNRXxUT3xUUkFOU0FDVElPTnxUUkFOU0xBVEV8VFJBTlNMQVRJT058VU5JT058VU5JUVVFfFVOS05PV058VVBEQVRFfFVQUEVSfFwiXG4gICAgICAgICAgICArXCJVU0FHRXxVU0VSfFVTSU5HfFZBTFVFfFZBTFVFU3xWSUVXfFdIRU58V0hFTkVWRVJ8V0hFUkV8V0lUSHxcIlxuICAgICAgICAgICAgK1wiV09SS3xXUklURXxaT05FXCI7XG4gICAgICAgIHZhciBrX2tleXdvcmQgPSBrX3BhcnRpcWxfa2V5d29yZCArIFwifFwiICsga19zcWxfa2V5d29yZDtcblxuICAgICAgICAvLyBzdG9yYWdlLnR5cGUucGFydGlxbFxuICAgICAgICB2YXIga19wYXJ0aXFsX3R5cGUgPVxuICAgICAgICAgICAgXCJCT09MfEJPT0xFQU58U1RSSU5HfFNZTUJPTHxDTE9CfEJMT0J8U1RSVUNUfExJU1R8U0VYUHxCQUdcIjtcbiAgICAgICAgdmFyIGtfc3FsX3R5cGUgPVxuICAgICAgICAgICAgXCJDSEFSQUNURVJ8REFURXxERUNJTUFMfERPVUJMRXxGTE9BVHxJTlR8SU5URUdFUnxOVU1FUklDfFNNQUxMSU5UfFRJTUVTVEFNUHxcIlxuICAgICAgICAgICAgK1wiVkFSQ0hBUnxWQVJZSU5HXCI7XG4gICAgICAgIHZhciBrX3R5cGUgPSBrX3BhcnRpcWxfdHlwZSArIFwifFwiICsga19zcWxfdHlwZTtcblxuICAgICAgICAvLyBzdXBwb3J0LmZ1bmN0aW9uLmFnZ3JlZ2F0aW9uLnBhcnRpcWxcbiAgICAgICAgdmFyIGtfc3FsX2FnZ2ZuID1cbiAgICAgICAgICAgIFwiQVZHfENPVU5UfE1BWHxNSU58U1VNXCI7XG4gICAgICAgIHZhciBrX2FnZ2ZuID0ga19zcWxfYWdnZm47XG5cbiAgICAgICAgLy8gc3VwcG9ydC5mdW5jdGlvbi5wYXJ0aXFsXG4gICAgICAgIHZhciBrX3NxbF9mbiA9XG4gICAgICAgICAgICBcIkNBU1R8Q09BTEVTQ0V8Q1VSUkVOVF9EQVRFfENVUlJFTlRfVElNRXxDVVJSRU5UX1RJTUVTVEFNUHxDVVJSRU5UX1VTRVJ8RVhJU1RTfERBVEVfQUREfERBVEVfRElGRnxOVUxMSUZ8XCJcbiAgICAgICAgICAgICtcIlNFU1NJT05fVVNFUnxTVUJTVFJJTkd8U1lTVEVNX1VTRVJ8VFJJTVwiO1xuICAgICAgICB2YXIga19mbiA9IGtfc3FsX2ZuO1xuXG5cbiAgICAgICAgdmFyIGtleXdvcmRNYXBwZXIgPSB0aGlzLmNyZWF0ZUtleXdvcmRNYXBwZXIoe1xuICAgICAgICAgICAgXCJjb25zdGFudC5sYW5ndWFnZS5wYXJ0aXFsXCI6IGtfY29uc3RhbnQsXG4gICAgICAgICAgICBcImtleXdvcmQub3RoZXIucGFydGlxbFwiOiBrX2tleXdvcmQsXG4gICAgICAgICAgICBcInN0b3JhZ2UudHlwZS5wYXJ0aXFsXCI6IGtfdHlwZSxcbiAgICAgICAgICAgIFwic3VwcG9ydC5mdW5jdGlvbi5hZ2dyZWdhdGlvbi5wYXJ0aXFsXCI6IGtfYWdnZm4sXG4gICAgICAgICAgICBcInN1cHBvcnQuZnVuY3Rpb24ucGFydGlxbFwiOiBrX2ZuXG4gICAgICAgIH0sIFwidmFyaWFibGUubGFuZ3VhZ2UuaWRlbnRpZmllci5wYXJ0aXFsXCIsIHRydWUpO1xuXG4gICAgICAgIHZhciBrZXl3b3JkTWFwcGVyUnVsZSA9IHtcbiAgICAgICAgICAgIHRva2VuIDoga2V5d29yZE1hcHBlcixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcYlxcXFx3K1xcXFxiXCJcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLiRydWxlcyA9IHtcbiAgICAgICAgICBcInN0YXJ0XCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJpbmNsdWRlXCI6IFwid2hpdGVzcGFjZVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcImluY2x1ZGVcIjogXCJjb21tZW50XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwiaW5jbHVkZVwiOiBcInZhbHVlXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdLFxuICAgICAgICAgIFwidmFsdWVcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcImluY2x1ZGVcIjogXCJ3aGl0ZXNwYWNlXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwiaW5jbHVkZVwiOiBcImNvbW1lbnRcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJpbmNsdWRlXCI6IFwidHVwbGVfdmFsdWVcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJpbmNsdWRlXCI6IFwiY29sbGVjdGlvbl92YWx1ZVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcImluY2x1ZGVcIjogXCJzY2FsYXJfdmFsdWVcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJzY2FsYXJfdmFsdWVcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcImluY2x1ZGVcIjogXCJzdHJpbmdcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJpbmNsdWRlXCI6IFwibnVtYmVyXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwiaW5jbHVkZVwiOiBcImtleXdvcmRzXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwiaW5jbHVkZVwiOiBcImlkZW50aWZpZXJcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJpbmNsdWRlXCI6IFwiZW1iZWQtaW9uXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwiaW5jbHVkZVwiOiBcIm9wZXJhdG9yXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwiaW5jbHVkZVwiOiBcInB1bmN0dWF0aW9uXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdLFxuICAgICAgICAgIFwicHVuY3R1YXRpb25cIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInRva2VuXCI6IFwicHVuY3R1YXRpb24ucGFydGlxbFwiLFxuICAgICAgICAgICAgICBcInJlZ2V4XCI6IFwiWzs6KClcXFxcW1xcXFxdXFxcXHtcXFxcfSwuXVwiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXSxcbiAgICAgICAgICBcIm9wZXJhdG9yXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0b2tlblwiOiBcImtleXdvcmQub3BlcmF0b3IucGFydGlxbFwiLFxuICAgICAgICAgICAgICBcInJlZ2V4XCI6IFwiWysqLzw+PX4hQCMlJnw/Xi1dK1wiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXSxcbiAgICAgICAgICBcImlkZW50aWZpZXJcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInRva2VuXCI6IFwidmFyaWFibGUubGFuZ3VhZ2UuaWRlbnRpZmllci5xdW90ZWQucGFydGlxbFwiLFxuICAgICAgICAgICAgICBcInJlZ2V4XCI6IFwiKFtcXFwiXSkoKD86KD86XFxcXFxcXFwuKXwoPzpbXlxcXCJcXFxcXFxcXF0pKSo/KShbXFxcIl0pXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidG9rZW5cIjogXCJ2YXJpYWJsZS5sYW5ndWFnZS5pZGVudGlmaWVyLmF0LnBhcnRpcWxcIixcbiAgICAgICAgICAgICAgXCJyZWdleFwiOiBcIkBcXFxcdytcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0b2tlblwiOiBcInZhcmlhYmxlLmxhbmd1YWdlLmlkZW50aWZpZXIucGFydGlxbFwiLFxuICAgICAgICAgICAgICBcInJlZ2V4XCI6IFwiXFxcXGJcXFxcdysoPzpcXFxcLlxcXFx3Kyk/XFxcXGJcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJudW1iZXJcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInRva2VuXCI6IFwiY29uc3RhbnQubnVtZXJpYy5wYXJ0aXFsXCIsXG4gICAgICAgICAgICAgIFwicmVnZXhcIjogXCJbKy1dP1xcXFxkKyg/Oig/OlxcXFwuXFxcXGQqKT8oPzpbZUVdWystXT9cXFxcZCspPyk/XFxcXGJcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJzdHJpbmdcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInRva2VuXCI6IFtcbiAgICAgICAgICAgICAgICBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24uc3RyaW5nLmJlZ2luLnBhcnRpcWxcIixcbiAgICAgICAgICAgICAgICBcInN0cmluZy5xdW90ZWQuc2luZ2xlLnBhcnRpcWxcIixcbiAgICAgICAgICAgICAgICBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24uc3RyaW5nLmVuZC5wYXJ0aXFsXCJcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgXCJyZWdleFwiOiBcIihbJ10pKCg/Oig/OlxcXFxcXFxcLil8KD86W14nXFxcXFxcXFxdKSkqPykoWyddKVwiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXSxcbiAgICAgICAgICBcImNvbGxlY3Rpb25fdmFsdWVcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcImluY2x1ZGVcIjogXCJhcnJheV92YWx1ZVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcImluY2x1ZGVcIjogXCJiYWdfdmFsdWVcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJiYWdfdmFsdWVcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInRva2VuXCI6IFwicHVuY3R1YXRpb24uZGVmaW5pdGlvbi5iYWcuYmVnaW4ucGFydGlxbFwiLFxuICAgICAgICAgICAgICBcInJlZ2V4XCI6IFwiPDxcIixcbiAgICAgICAgICAgICAgXCJwdXNoXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInRva2VuXCI6IFwicHVuY3R1YXRpb24uZGVmaW5pdGlvbi5iYWcuZW5kLnBhcnRpcWxcIixcbiAgICAgICAgICAgICAgICAgIFwicmVnZXhcIjogXCI+PlwiLFxuICAgICAgICAgICAgICAgICAgXCJuZXh0XCI6IFwicG9wXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwiaW5jbHVkZVwiOiBcImNvbW1lbnRcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJ0b2tlblwiOiBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24uYmFnLnNlcGFyYXRvci5wYXJ0aXFsXCIsXG4gICAgICAgICAgICAgICAgICBcInJlZ2V4XCI6IFwiLFwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcImluY2x1ZGVcIjogXCJ2YWx1ZVwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXSxcbiAgICAgICAgICBcImNvbW1lbnRcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInRva2VuXCI6IFwiY29tbWVudC5saW5lLnBhcnRpcWxcIixcbiAgICAgICAgICAgICAgXCJyZWdleFwiOiBcIi0tLipcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0b2tlblwiOiBcImNvbW1lbnQuYmxvY2sucGFydGlxbFwiLFxuICAgICAgICAgICAgICBcInJlZ2V4XCI6IFwiL1xcXFwqXCIsXG4gICAgICAgICAgICAgIFwicHVzaFwiOiBcImNvbW1lbnRfXzFcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgIF0sXG4gICAgICAgICAgXCJjb21tZW50X18xXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0b2tlblwiOiBcImNvbW1lbnQuYmxvY2sucGFydGlxbFwiLFxuICAgICAgICAgICAgICBcInJlZ2V4XCI6IFwiWypdL1wiLFxuICAgICAgICAgICAgICBcIm5leHRcIjogXCJwb3BcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0b2tlblwiOiBcImNvbW1lbnQuYmxvY2sucGFydGlxbFwiLFxuICAgICAgICAgICAgICBcInJlZ2V4XCI6IFwiW14qL10rXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidG9rZW5cIjogXCJjb21tZW50LmJsb2NrLnBhcnRpcWxcIixcbiAgICAgICAgICAgICAgXCJyZWdleFwiOiBcIi9cXFxcKlwiLFxuICAgICAgICAgICAgICBcInB1c2hcIjogXCJjb21tZW50X18xXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIFwidG9rZW5cIjogXCJjb21tZW50LmJsb2NrLnBhcnRpcWxcIixcbiAgICAgICAgICAgICAgXCJyZWdleFwiOiBcIlsqL10rXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdLFxuICAgICAgICAgIFwiYXJyYXlfdmFsdWVcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInRva2VuXCI6IFwicHVuY3R1YXRpb24uZGVmaW5pdGlvbi5hcnJheS5iZWdpbi5wYXJ0aXFsXCIsXG4gICAgICAgICAgICAgIFwicmVnZXhcIjogXCJcXFxcW1wiLFxuICAgICAgICAgICAgICBcInB1c2hcIjogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidG9rZW5cIjogXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLmFycmF5LmVuZC5wYXJ0aXFsXCIsXG4gICAgICAgICAgICAgICAgICBcInJlZ2V4XCI6IFwiXFxcXF1cIixcbiAgICAgICAgICAgICAgICAgIFwibmV4dFwiOiBcInBvcFwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcImluY2x1ZGVcIjogXCJjb21tZW50XCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIFwidG9rZW5cIjogXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLmFycmF5LnNlcGFyYXRvci5wYXJ0aXFsXCIsXG4gICAgICAgICAgICAgICAgICBcInJlZ2V4XCI6IFwiLFwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcImluY2x1ZGVcIjogXCJ2YWx1ZVwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXSxcbiAgICAgICAgICBcInR1cGxlX3ZhbHVlXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgXCJ0b2tlblwiOiBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24udHVwbGUuYmVnaW4ucGFydGlxbFwiLFxuICAgICAgICAgICAgICBcInJlZ2V4XCI6IFwiXFxcXHtcIixcbiAgICAgICAgICAgICAgXCJwdXNoXCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInRva2VuXCI6IFwicHVuY3R1YXRpb24uZGVmaW5pdGlvbi50dXBsZS5lbmQucGFydGlxbFwiLFxuICAgICAgICAgICAgICAgICAgXCJyZWdleFwiOiBcIlxcXFx9XCIsXG4gICAgICAgICAgICAgICAgICBcIm5leHRcIjogXCJwb3BcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgXCJpbmNsdWRlXCI6IFwiY29tbWVudFwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcInRva2VuXCI6IFwicHVuY3R1YXRpb24uZGVmaW5pdGlvbi50dXBsZS5zZXBhcmF0b3IucGFydGlxbFwiLFxuICAgICAgICAgICAgICAgICAgXCJyZWdleFwiOiBcIix8OlwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBcImluY2x1ZGVcIjogXCJ2YWx1ZVwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXSxcbiAgICAgICAgICBcIndoaXRlc3BhY2VcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBcInRva2VuXCI6IFwidGV4dC5wYXJ0aXFsXCIsXG4gICAgICAgICAgICAgIFwicmVnZXhcIjogXCJcXFxccytcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfSA7XG4gICAgICAgIHRoaXMuJHJ1bGVzW1wia2V5d29yZHNcIl0gPSBba2V5d29yZE1hcHBlclJ1bGVdO1xuXG4gICAgICAgIHRoaXMuJHJ1bGVzW1wiZW1iZWQtaW9uXCJdID0gW3t0b2tlbiA6IFwicHVuY3R1YXRpb24uZGVmaW5pdGlvbi5pb24uYmVnaW4ucGFydGlxbFwiLCByZWdleCA6IFwiYFwiLCBuZXh0IDogXCJpb24tc3RhcnRcIn1dO1xuICAgICAgICB0aGlzLmVtYmVkUnVsZXMoSW9uSGlnaGxpZ2h0UnVsZXMsIFwiaW9uLVwiLCBbe3Rva2VuIDogXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLmlvbi5lbmQucGFydGlxbFwiLCByZWdleCA6IFwiYFwiLCBuZXh0IDogXCJzdGFydFwifV0pO1xuXG4gICAgICAgIHRoaXMubm9ybWFsaXplUnVsZXMoKTtcbiAgICB9O1xuXG4gICAgb29wLmluaGVyaXRzKFBhcnRpcWxIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuICAgIGV4cG9ydHMuUGFydGlxbEhpZ2hsaWdodFJ1bGVzID0gUGFydGlxbEhpZ2hsaWdodFJ1bGVzO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9