"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[553],{

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

/***/ 80553:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* Derived from Python rules */



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var FortranHighlightRules = (__webpack_require__(64718)/* .FortranHighlightRules */ .U);
var CStyleFoldMode = (__webpack_require__(93887)/* .FoldMode */ .l);
var Range = (__webpack_require__(91902)/* .Range */ .Q);

var Mode = function() {
    this.HighlightRules = FortranHighlightRules;
    this.foldingRules = new CStyleFoldMode();
    this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, TextMode);

(function() {

    this.lineCommentStart = "!";

    this.getNextLineIndent = function(state, line, tab) {
        var indent = this.$getIndent(line);

        var tokenizedLine = this.getTokenizer().getLineTokens(line, state);
        var tokens = tokenizedLine.tokens;

        if (tokens.length && tokens[tokens.length-1].type == "comment") {
            return indent;
        }

        if (state == "start") {
            var match = line.match(/^.*[\{\(\[:]\s*$/);
            if (match) {
                indent += tab;
            }
        }

        return indent;
    };

    var outdents = {
        "return": 1,
        "break": 1,
        "continue": 1,
        "RETURN": 1,
        "BREAK": 1,
        "CONTINUE": 1
    };

    this.checkOutdent = function(state, line, input) {
        if (input !== "\r\n" && input !== "\r" && input !== "\n")
            return false;

        var tokens = this.getTokenizer().getLineTokens(line.trim(), state).tokens;

        if (!tokens)
            return false;
        do {
            var last = tokens.pop();
        } while (last && (last.type == "comment" || (last.type == "text" && last.value.match(/^\s+$/))));

        if (!last)
            return false;

        return (last.type == "keyword" && outdents[last.value]);
    };

    this.autoOutdent = function(state, doc, row) {

        row += 1;
        var indent = this.$getIndent(doc.getLine(row));
        var tab = doc.getTabString();
        if (indent.slice(-tab.length) == tab)
            doc.remove(new Range(row, indent.length-tab.length, row, indent.length));
    };

    this.$id = "ace/mode/fortran";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 64718:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* Derived from Python highlighing rules */



var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

var FortranHighlightRules = function() {

    var keywords = (
        "call|case|contains|continue|cycle|do|else|elseif|end|enddo|endif|function|"+ 
        "if|implicit|in|include|inout|intent|module|none|only|out|print|program|return|"+ 
        "select|status|stop|subroutine|" +
        "return|then|use|while|write|"+
        "CALL|CASE|CONTAINS|CONTINUE|CYCLE|DO|ELSE|ELSEIF|END|ENDDO|ENDIF|FUNCTION|"+
        "IF|IMPLICIT|IN|INCLUDE|INOUT|INTENT|MODULE|NONE|ONLY|OUT|PRINT|PROGRAM|RETURN|"+
        "SELECT|STATUS|STOP|SUBROUTINE|" +
        "RETURN|THEN|USE|WHILE|WRITE"
    );

    var keywordOperators = (
        "and|or|not|eq|ne|gt|ge|lt|le|" +
        "AND|OR|NOT|EQ|NE|GT|GE|LT|LE" 
    );

    var builtinConstants = (
        "true|false|TRUE|FALSE"
    );

    var builtinFunctions = (
        "abs|achar|acos|acosh|adjustl|adjustr|aimag|aint|all|allocate|"+
        "anint|any|asin|asinh|associated|atan|atan2|atanh|"+
        "bessel_j0|bessel_j1|bessel_jn|bessel_y0|bessel_y1|bessel_yn|"+
        "bge|bgt|bit_size|ble|blt|btest|ceiling|char|cmplx|conjg|cos|cosh|"+
        "count|cpu_time|cshift|date_and_time|dble|deallocate|digits|dim|dot_product|dprod|"+
        "dshiftl|dshiftr|dsqrt|eoshift|epsilon|erf|erfc|erfc_scaled|exp|float|floor|"+
        "format|fraction|gamma|input|len|lge|lgt|lle|llt|log|log10|maskl|maskr|matmul|max|maxloc|maxval|"+
        "merge|min|minloc|minval|mod|modulo|nint|not|norm2|null|nullify|pack|parity|popcnt|poppar|"+
        "precision|present|product|radix|random_number|random_seed|range|repeat|reshape|round|"+
        "rrspacing|same_type_as|scale|scan|selected_char_kind|selected_int_kind|selected_real_kind|"+
        "set_exponent|shape|shifta|shiftl|shiftr|sign|sin|sinh|size|sngl|spacing|spread|"+
        "sqrt|sum|system_clock|tan|tanh|tiny|trailz|transfer|transpose|trim|ubound|unpack|verify|" +
        "ABS|ACHAR|ACOS|ACOSH|ADJUSTL|ADJUSTR|AIMAG|AINT|ALL|ALLOCATE|"+
        "ANINT|ANY|ASIN|ASINH|ASSOCIATED|ATAN|ATAN2|ATANH|"+
        "BESSEL_J0|BESSEL_J1|BESSEL_JN|BESSEL_Y0|BESSEL_Y1|BESSEL_YN|"+
        "BGE|BGT|BIT_SIZE|BLE|BLT|BTEST|CEILING|CHAR|CMPLX|CONJG|COS|COSH|"+
        "COUNT|CPU_TIME|CSHIFT|DATE_AND_TIME|DBLE|DEALLOCATE|DIGITS|DIM|DOT_PRODUCT|DPROD|"+
        "DSHIFTL|DSHIFTR|DSQRT|EOSHIFT|EPSILON|ERF|ERFC|ERFC_SCALED|EXP|FLOAT|FLOOR|"+
        "FORMAT|FRACTION|GAMMA|INPUT|LEN|LGE|LGT|LLE|LLT|LOG|LOG10|MASKL|MASKR|MATMUL|MAX|MAXLOC|MAXVAL|"+
        "MERGE|MIN|MINLOC|MINVAL|MOD|MODULO|NINT|NOT|NORM2|NULL|NULLIFY|PACK|PARITY|POPCNT|POPPAR|"+
        "PRECISION|PRESENT|PRODUCT|RADIX|RANDOM_NUMBER|RANDOM_SEED|RANGE|REPEAT|RESHAPE|ROUND|"+
        "RRSPACING|SAME_TYPE_AS|SCALE|SCAN|SELECTED_CHAR_KIND|SELECTED_INT_KIND|SELECTED_REAL_KIND|"+
        "SET_EXPONENT|SHAPE|SHIFTA|SHIFTL|SHIFTR|SIGN|SIN|SINH|SIZE|SNGL|SPACING|SPREAD|"+
        "SQRT|SUM|SYSTEM_CLOCK|TAN|TANH|TINY|TRAILZ|TRANSFER|TRANSPOSE|TRIM|UBOUND|UNPACK|VERIFY"
    );

    var storageType = (
        "logical|character|integer|real|type|" +
        "LOGICAL|CHARACTER|INTEGER|REAL|TYPE"    
    );

    var storageModifiers = ( 
        "allocatable|dimension|intent|parameter|pointer|target|private|public|" +
        "ALLOCATABLE|DIMENSION|INTENT|PARAMETER|POINTER|TARGET|PRIVATE|PUBLIC"
    );

    var keywordMapper = this.createKeywordMapper({
        "invalid.deprecated": "debugger",
        "support.function": builtinFunctions,
        "constant.language": builtinConstants,
        "keyword": keywords,
        "keyword.operator": keywordOperators,
        "storage.type": storageType,
        "storage.modifier" : storageModifiers
    }, "identifier");

    var strPre = "(?:r|u|ur|R|U|UR|Ur|uR)?";

    var decimalInteger = "(?:(?:[1-9]\\d*)|(?:0))";
    var octInteger = "(?:0[oO]?[0-7]+)";
    var hexInteger = "(?:0[xX][\\dA-Fa-f]+)";
    var binInteger = "(?:0[bB][01]+)";
    var integer = "(?:" + decimalInteger + "|" + octInteger + "|" + hexInteger + "|" + binInteger + ")";

    var exponent = "(?:[eE][+-]?\\d+)";
    var fraction = "(?:\\.\\d+)";
    var intPart = "(?:\\d+)";
    var pointFloat = "(?:(?:" + intPart + "?" + fraction + ")|(?:" + intPart + "\\.))";
    var exponentFloat = "(?:(?:" + pointFloat + "|" +  intPart + ")" + exponent + ")";
    var floatNumber = "(?:" + exponentFloat + "|" + pointFloat + ")";

    var stringEscape =  "\\\\(x[0-9A-Fa-f]{2}|[0-7]{3}|[\\\\abfnrtv'\"]|U[0-9A-Fa-f]{8}|u[0-9A-Fa-f]{4})";

    this.$rules = {
        "start" : [ {
            token : "comment",
            regex : "!.*$"
        }, {
            token : "string",           // multi line """ string start
            regex : strPre + '"{3}',
            next : "qqstring3"
        }, {
            token : "string",           // " string
            regex : strPre + '"(?=.)',
            next : "qqstring"
        }, {
            token : "string",           // multi line ''' string start
            regex : strPre + "'{3}",
            next : "qstring3"
        }, {
            token : "string",           // ' string
            regex : strPre + "'(?=.)",
            next : "qstring"
        }, {
            token : "constant.numeric", // imaginary
            regex : "(?:" + floatNumber + "|\\d+)[jJ]\\b"
        }, {
            token : "constant.numeric", // float
            regex : floatNumber
        }, {
            token : "constant.numeric", // long integer
            regex : integer + "[lL]\\b"
        }, {
            token : "constant.numeric", // integer
            regex : integer + "\\b"
        }, {
            token : "keyword", // pre-compiler directives
            regex : "#\\s*(?:include|import|define|undef|INCLUDE|IMPORT|DEFINE|UNDEF)\\b"
        }, {
            token : "keyword", // special case pre-compiler directive
            regex : "#\\s*(?:endif|ifdef|else|elseif|ifndef|ENDIF|IFDEF|ELSE|ELSEIF|IFNDEF)\\b"
        }, {
            token : keywordMapper,
            regex : "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
        }, {
            token : "keyword.operator",
            regex : "\\+|\\-|\\*|\\*\\*|\\/|\\/\\/|%|<<|>>|&|\\||\\^|~|<|>|<=|=>|==|!=|<>|="
        }, {
            token : "paren.lparen",
            regex : "[\\[\\(\\{]"
        }, {
            token : "paren.rparen",
            regex : "[\\]\\)\\}]"
        }, {
            token : "text",
            regex : "\\s+"
        } ],
        "qqstring3" : [ {
            token : "constant.language.escape",
            regex : stringEscape
        }, {
            token : "string", // multi line """ string end
            regex : '"{3}',
            next : "start"
        }, {
            defaultToken : "string"
        } ],
        "qstring3" : [ {
            token : "constant.language.escape",
            regex : stringEscape
        }, {
            token : "string", // multi line """ string end
            regex : '"{3}',
            next : "start"
        }, {
            defaultToken : "string"
        } ],
        "qqstring" : [{
            token : "constant.language.escape",
            regex : stringEscape
        }, {
            token : "string",
            regex : "\\\\$",
            next  : "qqstring"
        }, {
            token : "string",
            regex : '"|$',
            next  : "start"
        }, {
            defaultToken: "string"
        }],
        "qstring" : [{
            token : "constant.language.escape",
            regex : stringEscape
        }, {
            token : "string",
            regex : "\\\\$",
            next  : "qstring"
        }, {
            token : "string",
            regex : "'|$",
            next  : "start"
        }, {
            defaultToken: "string"
        }]
    };
};

oop.inherits(FortranHighlightRules, TextHighlightRules);

exports.U = FortranHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTs7QUFFQSwyQ0FBMkMsRUFBRSxPQUFPLEVBQUUsK0JBQStCLEVBQUUsY0FBYyxFQUFFOztBQUV2RztBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLGdDQUFnQyxFQUFFO0FBQ2xDO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLGdDQUFnQyxFQUFFO0FBQ2xDO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSwrQkFBK0I7QUFDL0IsU0FBUztBQUNUO0FBQ0EsK0JBQStCO0FBQy9CLFNBQVM7QUFDVDtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLHVCQUF1QixFQUFFO0FBQ3pCO0FBQ0EsU0FBUztBQUNUO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLHVCQUF1QixFQUFFO0FBQ3pCO0FBQ0EsU0FBUztBQUNUO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7O0FBRUEsU0FBNkIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2ZvbGRpbmcvY3N0eWxlLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvZm9ydHJhbi5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2ZvcnRyYW5faGlnaGxpZ2h0X3J1bGVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uLy4uL2xpYi9vb3BcIik7XG52YXIgUmFuZ2UgPSByZXF1aXJlKFwiLi4vLi4vcmFuZ2VcIikuUmFuZ2U7XG52YXIgQmFzZUZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZF9tb2RlXCIpLkZvbGRNb2RlO1xuXG52YXIgRm9sZE1vZGUgPSBleHBvcnRzLkZvbGRNb2RlID0gZnVuY3Rpb24oY29tbWVudFJlZ2V4KSB7XG4gICAgaWYgKGNvbW1lbnRSZWdleCkge1xuICAgICAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlciA9IG5ldyBSZWdFeHAoXG4gICAgICAgICAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlci5zb3VyY2UucmVwbGFjZSgvXFx8W158XSo/JC8sIFwifFwiICsgY29tbWVudFJlZ2V4LnN0YXJ0KVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmZvbGRpbmdTdG9wTWFya2VyID0gbmV3IFJlZ0V4cChcbiAgICAgICAgICAgIHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIuc291cmNlLnJlcGxhY2UoL1xcfFtefF0qPyQvLCBcInxcIiArIGNvbW1lbnRSZWdleC5lbmQpXG4gICAgICAgICk7XG4gICAgfVxufTtcbm9vcC5pbmhlcml0cyhGb2xkTW9kZSwgQmFzZUZvbGRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuICAgIFxuICAgIHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyID0gLyhbXFx7XFxbXFwoXSlbXlxcfVxcXVxcKV0qJHxeXFxzKihcXC9cXCopLztcbiAgICB0aGlzLmZvbGRpbmdTdG9wTWFya2VyID0gL15bXlxcW1xce1xcKF0qKFtcXH1cXF1cXCldKXxeW1xcc1xcKl0qKFxcKlxcLykvO1xuICAgIHRoaXMuc2luZ2xlTGluZUJsb2NrQ29tbWVudFJlPSAvXlxccyooXFwvXFwqKS4qXFwqXFwvXFxzKiQvO1xuICAgIHRoaXMudHJpcGxlU3RhckJsb2NrQ29tbWVudFJlID0gL15cXHMqKFxcL1xcKlxcKlxcKikuKlxcKlxcL1xccyokLztcbiAgICB0aGlzLnN0YXJ0UmVnaW9uUmUgPSAvXlxccyooXFwvXFwqfFxcL1xcLykjP3JlZ2lvblxcYi87XG4gICAgXG4gICAgLy9wcmV2ZW50IG5hbWluZyBjb25mbGljdCB3aXRoIGFueSBtb2RlcyB0aGF0IGluaGVyaXQgZnJvbSBjc3R5bGUgYW5kIG92ZXJyaWRlIHRoaXMgKGxpa2UgY3NoYXJwKVxuICAgIHRoaXMuX2dldEZvbGRXaWRnZXRCYXNlID0gdGhpcy5nZXRGb2xkV2lkZ2V0O1xuICAgIFxuICAgIC8qKlxuICAgICAqIEdldHMgZm9sZCB3aWRnZXQgd2l0aCBzb21lIG5vbi1zdGFuZGFyZCBleHRyYXM6XG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSBsaW5lQ29tbWVudFJlZ2lvblN0YXJ0XG4gICAgICogICAgICAvLyNyZWdpb24gW29wdGlvbmFsIGRlc2NyaXB0aW9uXVxuICAgICAqXG4gICAgICogQGV4YW1wbGUgYmxvY2tDb21tZW50UmVnaW9uU3RhcnRcbiAgICAgKiAgICAgIC8qI3JlZ2lvbiBbb3B0aW9uYWwgZGVzY3JpcHRpb25dICpbL11cbiAgICAgKlxuICAgICAqIEBleGFtcGxlIHRyaXBsZVN0YXJGb2xkaW5nU2VjdGlvblxuICAgICAqICAgICAgLyoqKiB0aGlzIGZvbGRzIGV2ZW4gdGhvdWdoIDEgbGluZSBiZWNhdXNlIGl0IGhhcyAzIHN0YXJzICoqKlsvXVxuICAgICAqIFxuICAgICAqIEBub3RlIHRoZSBwb3VuZCBzeW1ib2wgZm9yIHJlZ2lvbiB0YWdzIGlzIG9wdGlvbmFsXG4gICAgICovXG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0ID0gZnVuY3Rpb24oc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICBcbiAgICAgICAgaWYgKHRoaXMuc2luZ2xlTGluZUJsb2NrQ29tbWVudFJlLnRlc3QobGluZSkpIHtcbiAgICAgICAgICAgIC8vIE5vIHdpZGdldCBmb3Igc2luZ2xlIGxpbmUgYmxvY2sgY29tbWVudCB1bmxlc3MgcmVnaW9uIG9yIHRyaXBsZSBzdGFyXG4gICAgICAgICAgICBpZiAoIXRoaXMuc3RhcnRSZWdpb25SZS50ZXN0KGxpbmUpICYmICF0aGlzLnRyaXBsZVN0YXJCbG9ja0NvbW1lbnRSZS50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIHZhciBmdyA9IHRoaXMuX2dldEZvbGRXaWRnZXRCYXNlKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KTtcbiAgICBcbiAgICAgICAgaWYgKCFmdyAmJiB0aGlzLnN0YXJ0UmVnaW9uUmUudGVzdChsaW5lKSlcbiAgICAgICAgICAgIHJldHVybiBcInN0YXJ0XCI7IC8vIGxpbmVDb21tZW50UmVnaW9uU3RhcnRcbiAgICBcbiAgICAgICAgcmV0dXJuIGZ3O1xuICAgIH07XG5cbiAgICB0aGlzLmdldEZvbGRXaWRnZXRSYW5nZSA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93LCBmb3JjZU11bHRpbGluZSkge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuc3RhcnRSZWdpb25SZS50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q29tbWVudFJlZ2lvbkJsb2NrKHNlc3Npb24sIGxpbmUsIHJvdyk7XG4gICAgICAgIFxuICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyKTtcbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICB2YXIgaSA9IG1hdGNoLmluZGV4O1xuXG4gICAgICAgICAgICBpZiAobWF0Y2hbMV0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMub3BlbmluZ0JyYWNrZXRCbG9jayhzZXNzaW9uLCBtYXRjaFsxXSwgcm93LCBpKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciByYW5nZSA9IHNlc3Npb24uZ2V0Q29tbWVudEZvbGRSYW5nZShyb3csIGkgKyBtYXRjaFswXS5sZW5ndGgsIDEpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAocmFuZ2UgJiYgIXJhbmdlLmlzTXVsdGlMaW5lKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoZm9yY2VNdWx0aWxpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2UgPSB0aGlzLmdldFNlY3Rpb25SYW5nZShzZXNzaW9uLCByb3cpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZm9sZFN0eWxlICE9IFwiYWxsXCIpXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIHJhbmdlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZvbGRTdHlsZSA9PT0gXCJtYXJrYmVnaW5cIilcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIpO1xuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIHZhciBpID0gbWF0Y2guaW5kZXggKyBtYXRjaFswXS5sZW5ndGg7XG5cbiAgICAgICAgICAgIGlmIChtYXRjaFsxXSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jbG9zaW5nQnJhY2tldEJsb2NrKHNlc3Npb24sIG1hdGNoWzFdLCByb3csIGkpO1xuXG4gICAgICAgICAgICByZXR1cm4gc2Vzc2lvbi5nZXRDb21tZW50Rm9sZFJhbmdlKHJvdywgaSwgLTEpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBcbiAgICB0aGlzLmdldFNlY3Rpb25SYW5nZSA9IGZ1bmN0aW9uKHNlc3Npb24sIHJvdykge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICB2YXIgc3RhcnRJbmRlbnQgPSBsaW5lLnNlYXJjaCgvXFxTLyk7XG4gICAgICAgIHZhciBzdGFydFJvdyA9IHJvdztcbiAgICAgICAgdmFyIHN0YXJ0Q29sdW1uID0gbGluZS5sZW5ndGg7XG4gICAgICAgIHJvdyA9IHJvdyArIDE7XG4gICAgICAgIHZhciBlbmRSb3cgPSByb3c7XG4gICAgICAgIHZhciBtYXhSb3cgPSBzZXNzaW9uLmdldExlbmd0aCgpO1xuICAgICAgICB3aGlsZSAoKytyb3cgPCBtYXhSb3cpIHtcbiAgICAgICAgICAgIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgICAgIHZhciBpbmRlbnQgPSBsaW5lLnNlYXJjaCgvXFxTLyk7XG4gICAgICAgICAgICBpZiAoaW5kZW50ID09PSAtMSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIGlmICAoc3RhcnRJbmRlbnQgPiBpbmRlbnQpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB2YXIgc3ViUmFuZ2UgPSB0aGlzLmdldEZvbGRXaWRnZXRSYW5nZShzZXNzaW9uLCBcImFsbFwiLCByb3cpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoc3ViUmFuZ2UpIHtcbiAgICAgICAgICAgICAgICBpZiAoc3ViUmFuZ2Uuc3RhcnQucm93IDw9IHN0YXJ0Um93KSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3ViUmFuZ2UuaXNNdWx0aUxpbmUoKSkge1xuICAgICAgICAgICAgICAgICAgICByb3cgPSBzdWJSYW5nZS5lbmQucm93O1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhcnRJbmRlbnQgPT0gaW5kZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVuZFJvdyA9IHJvdztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShzdGFydFJvdywgc3RhcnRDb2x1bW4sIGVuZFJvdywgc2Vzc2lvbi5nZXRMaW5lKGVuZFJvdykubGVuZ3RoKTtcbiAgICB9O1xuICAgIFxuICAgIC8qKlxuICAgICAqIGdldHMgY29tbWVudCByZWdpb24gYmxvY2sgd2l0aCBlbmQgcmVnaW9uIGFzc3VtZWQgdG8gYmUgc3RhcnQgb2YgY29tbWVudCBpbiBhbnkgY3N0eWxlIG1vZGUgb3IgU1FMIG1vZGUgKC0tKSB3aGljaCBpbmhlcml0cyBmcm9tIHRoaXMuXG4gICAgICogVGhlcmUgbWF5IG9wdGlvbmFsbHkgYmUgYSBwb3VuZCBzeW1ib2wgYmVmb3JlIHRoZSByZWdpb24vZW5kcmVnaW9uIHN0YXRlbWVudFxuICAgICAqL1xuICAgIHRoaXMuZ2V0Q29tbWVudFJlZ2lvbkJsb2NrID0gZnVuY3Rpb24oc2Vzc2lvbiwgbGluZSwgcm93KSB7XG4gICAgICAgIHZhciBzdGFydENvbHVtbiA9IGxpbmUuc2VhcmNoKC9cXHMqJC8pO1xuICAgICAgICB2YXIgbWF4Um93ID0gc2Vzc2lvbi5nZXRMZW5ndGgoKTtcbiAgICAgICAgdmFyIHN0YXJ0Um93ID0gcm93O1xuICAgICAgICBcbiAgICAgICAgdmFyIHJlID0gL15cXHMqKD86XFwvXFwqfFxcL1xcL3wtLSkjPyhlbmQpP3JlZ2lvblxcYi87XG4gICAgICAgIHZhciBkZXB0aCA9IDE7XG4gICAgICAgIHdoaWxlICgrK3JvdyA8IG1heFJvdykge1xuICAgICAgICAgICAgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICAgICAgdmFyIG0gPSByZS5leGVjKGxpbmUpO1xuICAgICAgICAgICAgaWYgKCFtKSBjb250aW51ZTtcbiAgICAgICAgICAgIGlmIChtWzFdKSBkZXB0aC0tO1xuICAgICAgICAgICAgZWxzZSBkZXB0aCsrO1xuXG4gICAgICAgICAgICBpZiAoIWRlcHRoKSBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBlbmRSb3cgPSByb3c7XG4gICAgICAgIGlmIChlbmRSb3cgPiBzdGFydFJvdykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShzdGFydFJvdywgc3RhcnRDb2x1bW4sIGVuZFJvdywgbGluZS5sZW5ndGgpO1xuICAgICAgICB9XG4gICAgfTtcblxufSkuY2FsbChGb2xkTW9kZS5wcm90b3R5cGUpO1xuIiwiLyogRGVyaXZlZCBmcm9tIFB5dGhvbiBydWxlcyAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRNb2RlID0gcmVxdWlyZShcIi4vdGV4dFwiKS5Nb2RlO1xudmFyIEZvcnRyYW5IaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL2ZvcnRyYW5faGlnaGxpZ2h0X3J1bGVzXCIpLkZvcnRyYW5IaWdobGlnaHRSdWxlcztcbnZhciBDU3R5bGVGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRpbmcvY3N0eWxlXCIpLkZvbGRNb2RlO1xudmFyIFJhbmdlID0gcmVxdWlyZShcIi4uL3JhbmdlXCIpLlJhbmdlO1xuXG52YXIgTW9kZSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuSGlnaGxpZ2h0UnVsZXMgPSBGb3J0cmFuSGlnaGxpZ2h0UnVsZXM7XG4gICAgdGhpcy5mb2xkaW5nUnVsZXMgPSBuZXcgQ1N0eWxlRm9sZE1vZGUoKTtcbiAgICB0aGlzLiRiZWhhdmlvdXIgPSB0aGlzLiRkZWZhdWx0QmVoYXZpb3VyO1xufTtcbm9vcC5pbmhlcml0cyhNb2RlLCBUZXh0TW9kZSk7XG5cbihmdW5jdGlvbigpIHtcblxuICAgIHRoaXMubGluZUNvbW1lbnRTdGFydCA9IFwiIVwiO1xuXG4gICAgdGhpcy5nZXROZXh0TGluZUluZGVudCA9IGZ1bmN0aW9uKHN0YXRlLCBsaW5lLCB0YWIpIHtcbiAgICAgICAgdmFyIGluZGVudCA9IHRoaXMuJGdldEluZGVudChsaW5lKTtcblxuICAgICAgICB2YXIgdG9rZW5pemVkTGluZSA9IHRoaXMuZ2V0VG9rZW5pemVyKCkuZ2V0TGluZVRva2VucyhsaW5lLCBzdGF0ZSk7XG4gICAgICAgIHZhciB0b2tlbnMgPSB0b2tlbml6ZWRMaW5lLnRva2VucztcblxuICAgICAgICBpZiAodG9rZW5zLmxlbmd0aCAmJiB0b2tlbnNbdG9rZW5zLmxlbmd0aC0xXS50eXBlID09IFwiY29tbWVudFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5kZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN0YXRlID09IFwic3RhcnRcIikge1xuICAgICAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCgvXi4qW1xce1xcKFxcWzpdXFxzKiQvKTtcbiAgICAgICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgICAgIGluZGVudCArPSB0YWI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW5kZW50O1xuICAgIH07XG5cbiAgICB2YXIgb3V0ZGVudHMgPSB7XG4gICAgICAgIFwicmV0dXJuXCI6IDEsXG4gICAgICAgIFwiYnJlYWtcIjogMSxcbiAgICAgICAgXCJjb250aW51ZVwiOiAxLFxuICAgICAgICBcIlJFVFVSTlwiOiAxLFxuICAgICAgICBcIkJSRUFLXCI6IDEsXG4gICAgICAgIFwiQ09OVElOVUVcIjogMVxuICAgIH07XG5cbiAgICB0aGlzLmNoZWNrT3V0ZGVudCA9IGZ1bmN0aW9uKHN0YXRlLCBsaW5lLCBpbnB1dCkge1xuICAgICAgICBpZiAoaW5wdXQgIT09IFwiXFxyXFxuXCIgJiYgaW5wdXQgIT09IFwiXFxyXCIgJiYgaW5wdXQgIT09IFwiXFxuXCIpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgdmFyIHRva2VucyA9IHRoaXMuZ2V0VG9rZW5pemVyKCkuZ2V0TGluZVRva2VucyhsaW5lLnRyaW0oKSwgc3RhdGUpLnRva2VucztcblxuICAgICAgICBpZiAoIXRva2VucylcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgdmFyIGxhc3QgPSB0b2tlbnMucG9wKCk7XG4gICAgICAgIH0gd2hpbGUgKGxhc3QgJiYgKGxhc3QudHlwZSA9PSBcImNvbW1lbnRcIiB8fCAobGFzdC50eXBlID09IFwidGV4dFwiICYmIGxhc3QudmFsdWUubWF0Y2goL15cXHMrJC8pKSkpO1xuXG4gICAgICAgIGlmICghbGFzdClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgICByZXR1cm4gKGxhc3QudHlwZSA9PSBcImtleXdvcmRcIiAmJiBvdXRkZW50c1tsYXN0LnZhbHVlXSk7XG4gICAgfTtcblxuICAgIHRoaXMuYXV0b091dGRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgZG9jLCByb3cpIHtcblxuICAgICAgICByb3cgKz0gMTtcbiAgICAgICAgdmFyIGluZGVudCA9IHRoaXMuJGdldEluZGVudChkb2MuZ2V0TGluZShyb3cpKTtcbiAgICAgICAgdmFyIHRhYiA9IGRvYy5nZXRUYWJTdHJpbmcoKTtcbiAgICAgICAgaWYgKGluZGVudC5zbGljZSgtdGFiLmxlbmd0aCkgPT0gdGFiKVxuICAgICAgICAgICAgZG9jLnJlbW92ZShuZXcgUmFuZ2Uocm93LCBpbmRlbnQubGVuZ3RoLXRhYi5sZW5ndGgsIHJvdywgaW5kZW50Lmxlbmd0aCkpO1xuICAgIH07XG5cbiAgICB0aGlzLiRpZCA9IFwiYWNlL21vZGUvZm9ydHJhblwiO1xufSkuY2FsbChNb2RlLnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTW9kZSA9IE1vZGU7XG4iLCIvKiBEZXJpdmVkIGZyb20gUHl0aG9uIGhpZ2hsaWdoaW5nIHJ1bGVzICovXG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xuXG52YXIgRm9ydHJhbkhpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIga2V5d29yZHMgPSAoXG4gICAgICAgIFwiY2FsbHxjYXNlfGNvbnRhaW5zfGNvbnRpbnVlfGN5Y2xlfGRvfGVsc2V8ZWxzZWlmfGVuZHxlbmRkb3xlbmRpZnxmdW5jdGlvbnxcIisgXG4gICAgICAgIFwiaWZ8aW1wbGljaXR8aW58aW5jbHVkZXxpbm91dHxpbnRlbnR8bW9kdWxlfG5vbmV8b25seXxvdXR8cHJpbnR8cHJvZ3JhbXxyZXR1cm58XCIrIFxuICAgICAgICBcInNlbGVjdHxzdGF0dXN8c3RvcHxzdWJyb3V0aW5lfFwiICtcbiAgICAgICAgXCJyZXR1cm58dGhlbnx1c2V8d2hpbGV8d3JpdGV8XCIrXG4gICAgICAgIFwiQ0FMTHxDQVNFfENPTlRBSU5TfENPTlRJTlVFfENZQ0xFfERPfEVMU0V8RUxTRUlGfEVORHxFTkRET3xFTkRJRnxGVU5DVElPTnxcIitcbiAgICAgICAgXCJJRnxJTVBMSUNJVHxJTnxJTkNMVURFfElOT1VUfElOVEVOVHxNT0RVTEV8Tk9ORXxPTkxZfE9VVHxQUklOVHxQUk9HUkFNfFJFVFVSTnxcIitcbiAgICAgICAgXCJTRUxFQ1R8U1RBVFVTfFNUT1B8U1VCUk9VVElORXxcIiArXG4gICAgICAgIFwiUkVUVVJOfFRIRU58VVNFfFdISUxFfFdSSVRFXCJcbiAgICApO1xuXG4gICAgdmFyIGtleXdvcmRPcGVyYXRvcnMgPSAoXG4gICAgICAgIFwiYW5kfG9yfG5vdHxlcXxuZXxndHxnZXxsdHxsZXxcIiArXG4gICAgICAgIFwiQU5EfE9SfE5PVHxFUXxORXxHVHxHRXxMVHxMRVwiIFxuICAgICk7XG5cbiAgICB2YXIgYnVpbHRpbkNvbnN0YW50cyA9IChcbiAgICAgICAgXCJ0cnVlfGZhbHNlfFRSVUV8RkFMU0VcIlxuICAgICk7XG5cbiAgICB2YXIgYnVpbHRpbkZ1bmN0aW9ucyA9IChcbiAgICAgICAgXCJhYnN8YWNoYXJ8YWNvc3xhY29zaHxhZGp1c3RsfGFkanVzdHJ8YWltYWd8YWludHxhbGx8YWxsb2NhdGV8XCIrXG4gICAgICAgIFwiYW5pbnR8YW55fGFzaW58YXNpbmh8YXNzb2NpYXRlZHxhdGFufGF0YW4yfGF0YW5ofFwiK1xuICAgICAgICBcImJlc3NlbF9qMHxiZXNzZWxfajF8YmVzc2VsX2pufGJlc3NlbF95MHxiZXNzZWxfeTF8YmVzc2VsX3lufFwiK1xuICAgICAgICBcImJnZXxiZ3R8Yml0X3NpemV8YmxlfGJsdHxidGVzdHxjZWlsaW5nfGNoYXJ8Y21wbHh8Y29uamd8Y29zfGNvc2h8XCIrXG4gICAgICAgIFwiY291bnR8Y3B1X3RpbWV8Y3NoaWZ0fGRhdGVfYW5kX3RpbWV8ZGJsZXxkZWFsbG9jYXRlfGRpZ2l0c3xkaW18ZG90X3Byb2R1Y3R8ZHByb2R8XCIrXG4gICAgICAgIFwiZHNoaWZ0bHxkc2hpZnRyfGRzcXJ0fGVvc2hpZnR8ZXBzaWxvbnxlcmZ8ZXJmY3xlcmZjX3NjYWxlZHxleHB8ZmxvYXR8Zmxvb3J8XCIrXG4gICAgICAgIFwiZm9ybWF0fGZyYWN0aW9ufGdhbW1hfGlucHV0fGxlbnxsZ2V8bGd0fGxsZXxsbHR8bG9nfGxvZzEwfG1hc2tsfG1hc2tyfG1hdG11bHxtYXh8bWF4bG9jfG1heHZhbHxcIitcbiAgICAgICAgXCJtZXJnZXxtaW58bWlubG9jfG1pbnZhbHxtb2R8bW9kdWxvfG5pbnR8bm90fG5vcm0yfG51bGx8bnVsbGlmeXxwYWNrfHBhcml0eXxwb3BjbnR8cG9wcGFyfFwiK1xuICAgICAgICBcInByZWNpc2lvbnxwcmVzZW50fHByb2R1Y3R8cmFkaXh8cmFuZG9tX251bWJlcnxyYW5kb21fc2VlZHxyYW5nZXxyZXBlYXR8cmVzaGFwZXxyb3VuZHxcIitcbiAgICAgICAgXCJycnNwYWNpbmd8c2FtZV90eXBlX2FzfHNjYWxlfHNjYW58c2VsZWN0ZWRfY2hhcl9raW5kfHNlbGVjdGVkX2ludF9raW5kfHNlbGVjdGVkX3JlYWxfa2luZHxcIitcbiAgICAgICAgXCJzZXRfZXhwb25lbnR8c2hhcGV8c2hpZnRhfHNoaWZ0bHxzaGlmdHJ8c2lnbnxzaW58c2luaHxzaXplfHNuZ2x8c3BhY2luZ3xzcHJlYWR8XCIrXG4gICAgICAgIFwic3FydHxzdW18c3lzdGVtX2Nsb2NrfHRhbnx0YW5ofHRpbnl8dHJhaWx6fHRyYW5zZmVyfHRyYW5zcG9zZXx0cmltfHVib3VuZHx1bnBhY2t8dmVyaWZ5fFwiICtcbiAgICAgICAgXCJBQlN8QUNIQVJ8QUNPU3xBQ09TSHxBREpVU1RMfEFESlVTVFJ8QUlNQUd8QUlOVHxBTEx8QUxMT0NBVEV8XCIrXG4gICAgICAgIFwiQU5JTlR8QU5ZfEFTSU58QVNJTkh8QVNTT0NJQVRFRHxBVEFOfEFUQU4yfEFUQU5IfFwiK1xuICAgICAgICBcIkJFU1NFTF9KMHxCRVNTRUxfSjF8QkVTU0VMX0pOfEJFU1NFTF9ZMHxCRVNTRUxfWTF8QkVTU0VMX1lOfFwiK1xuICAgICAgICBcIkJHRXxCR1R8QklUX1NJWkV8QkxFfEJMVHxCVEVTVHxDRUlMSU5HfENIQVJ8Q01QTFh8Q09OSkd8Q09TfENPU0h8XCIrXG4gICAgICAgIFwiQ09VTlR8Q1BVX1RJTUV8Q1NISUZUfERBVEVfQU5EX1RJTUV8REJMRXxERUFMTE9DQVRFfERJR0lUU3xESU18RE9UX1BST0RVQ1R8RFBST0R8XCIrXG4gICAgICAgIFwiRFNISUZUTHxEU0hJRlRSfERTUVJUfEVPU0hJRlR8RVBTSUxPTnxFUkZ8RVJGQ3xFUkZDX1NDQUxFRHxFWFB8RkxPQVR8RkxPT1J8XCIrXG4gICAgICAgIFwiRk9STUFUfEZSQUNUSU9OfEdBTU1BfElOUFVUfExFTnxMR0V8TEdUfExMRXxMTFR8TE9HfExPRzEwfE1BU0tMfE1BU0tSfE1BVE1VTHxNQVh8TUFYTE9DfE1BWFZBTHxcIitcbiAgICAgICAgXCJNRVJHRXxNSU58TUlOTE9DfE1JTlZBTHxNT0R8TU9EVUxPfE5JTlR8Tk9UfE5PUk0yfE5VTEx8TlVMTElGWXxQQUNLfFBBUklUWXxQT1BDTlR8UE9QUEFSfFwiK1xuICAgICAgICBcIlBSRUNJU0lPTnxQUkVTRU5UfFBST0RVQ1R8UkFESVh8UkFORE9NX05VTUJFUnxSQU5ET01fU0VFRHxSQU5HRXxSRVBFQVR8UkVTSEFQRXxST1VORHxcIitcbiAgICAgICAgXCJSUlNQQUNJTkd8U0FNRV9UWVBFX0FTfFNDQUxFfFNDQU58U0VMRUNURURfQ0hBUl9LSU5EfFNFTEVDVEVEX0lOVF9LSU5EfFNFTEVDVEVEX1JFQUxfS0lORHxcIitcbiAgICAgICAgXCJTRVRfRVhQT05FTlR8U0hBUEV8U0hJRlRBfFNISUZUTHxTSElGVFJ8U0lHTnxTSU58U0lOSHxTSVpFfFNOR0x8U1BBQ0lOR3xTUFJFQUR8XCIrXG4gICAgICAgIFwiU1FSVHxTVU18U1lTVEVNX0NMT0NLfFRBTnxUQU5IfFRJTll8VFJBSUxafFRSQU5TRkVSfFRSQU5TUE9TRXxUUklNfFVCT1VORHxVTlBBQ0t8VkVSSUZZXCJcbiAgICApO1xuXG4gICAgdmFyIHN0b3JhZ2VUeXBlID0gKFxuICAgICAgICBcImxvZ2ljYWx8Y2hhcmFjdGVyfGludGVnZXJ8cmVhbHx0eXBlfFwiICtcbiAgICAgICAgXCJMT0dJQ0FMfENIQVJBQ1RFUnxJTlRFR0VSfFJFQUx8VFlQRVwiICAgIFxuICAgICk7XG5cbiAgICB2YXIgc3RvcmFnZU1vZGlmaWVycyA9ICggXG4gICAgICAgIFwiYWxsb2NhdGFibGV8ZGltZW5zaW9ufGludGVudHxwYXJhbWV0ZXJ8cG9pbnRlcnx0YXJnZXR8cHJpdmF0ZXxwdWJsaWN8XCIgK1xuICAgICAgICBcIkFMTE9DQVRBQkxFfERJTUVOU0lPTnxJTlRFTlR8UEFSQU1FVEVSfFBPSU5URVJ8VEFSR0VUfFBSSVZBVEV8UFVCTElDXCJcbiAgICApO1xuXG4gICAgdmFyIGtleXdvcmRNYXBwZXIgPSB0aGlzLmNyZWF0ZUtleXdvcmRNYXBwZXIoe1xuICAgICAgICBcImludmFsaWQuZGVwcmVjYXRlZFwiOiBcImRlYnVnZ2VyXCIsXG4gICAgICAgIFwic3VwcG9ydC5mdW5jdGlvblwiOiBidWlsdGluRnVuY3Rpb25zLFxuICAgICAgICBcImNvbnN0YW50Lmxhbmd1YWdlXCI6IGJ1aWx0aW5Db25zdGFudHMsXG4gICAgICAgIFwia2V5d29yZFwiOiBrZXl3b3JkcyxcbiAgICAgICAgXCJrZXl3b3JkLm9wZXJhdG9yXCI6IGtleXdvcmRPcGVyYXRvcnMsXG4gICAgICAgIFwic3RvcmFnZS50eXBlXCI6IHN0b3JhZ2VUeXBlLFxuICAgICAgICBcInN0b3JhZ2UubW9kaWZpZXJcIiA6IHN0b3JhZ2VNb2RpZmllcnNcbiAgICB9LCBcImlkZW50aWZpZXJcIik7XG5cbiAgICB2YXIgc3RyUHJlID0gXCIoPzpyfHV8dXJ8UnxVfFVSfFVyfHVSKT9cIjtcblxuICAgIHZhciBkZWNpbWFsSW50ZWdlciA9IFwiKD86KD86WzEtOV1cXFxcZCopfCg/OjApKVwiO1xuICAgIHZhciBvY3RJbnRlZ2VyID0gXCIoPzowW29PXT9bMC03XSspXCI7XG4gICAgdmFyIGhleEludGVnZXIgPSBcIig/OjBbeFhdW1xcXFxkQS1GYS1mXSspXCI7XG4gICAgdmFyIGJpbkludGVnZXIgPSBcIig/OjBbYkJdWzAxXSspXCI7XG4gICAgdmFyIGludGVnZXIgPSBcIig/OlwiICsgZGVjaW1hbEludGVnZXIgKyBcInxcIiArIG9jdEludGVnZXIgKyBcInxcIiArIGhleEludGVnZXIgKyBcInxcIiArIGJpbkludGVnZXIgKyBcIilcIjtcblxuICAgIHZhciBleHBvbmVudCA9IFwiKD86W2VFXVsrLV0/XFxcXGQrKVwiO1xuICAgIHZhciBmcmFjdGlvbiA9IFwiKD86XFxcXC5cXFxcZCspXCI7XG4gICAgdmFyIGludFBhcnQgPSBcIig/OlxcXFxkKylcIjtcbiAgICB2YXIgcG9pbnRGbG9hdCA9IFwiKD86KD86XCIgKyBpbnRQYXJ0ICsgXCI/XCIgKyBmcmFjdGlvbiArIFwiKXwoPzpcIiArIGludFBhcnQgKyBcIlxcXFwuKSlcIjtcbiAgICB2YXIgZXhwb25lbnRGbG9hdCA9IFwiKD86KD86XCIgKyBwb2ludEZsb2F0ICsgXCJ8XCIgKyAgaW50UGFydCArIFwiKVwiICsgZXhwb25lbnQgKyBcIilcIjtcbiAgICB2YXIgZmxvYXROdW1iZXIgPSBcIig/OlwiICsgZXhwb25lbnRGbG9hdCArIFwifFwiICsgcG9pbnRGbG9hdCArIFwiKVwiO1xuXG4gICAgdmFyIHN0cmluZ0VzY2FwZSA9ICBcIlxcXFxcXFxcKHhbMC05QS1GYS1mXXsyfXxbMC03XXszfXxbXFxcXFxcXFxhYmZucnR2J1xcXCJdfFVbMC05QS1GYS1mXXs4fXx1WzAtOUEtRmEtZl17NH0pXCI7XG5cbiAgICB0aGlzLiRydWxlcyA9IHtcbiAgICAgICAgXCJzdGFydFwiIDogWyB7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudFwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIiEuKiRcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsICAgICAgICAgICAvLyBtdWx0aSBsaW5lIFwiXCJcIiBzdHJpbmcgc3RhcnRcbiAgICAgICAgICAgIHJlZ2V4IDogc3RyUHJlICsgJ1wiezN9JyxcbiAgICAgICAgICAgIG5leHQgOiBcInFxc3RyaW5nM1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIiwgICAgICAgICAgIC8vIFwiIHN0cmluZ1xuICAgICAgICAgICAgcmVnZXggOiBzdHJQcmUgKyAnXCIoPz0uKScsXG4gICAgICAgICAgICBuZXh0IDogXCJxcXN0cmluZ1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIiwgICAgICAgICAgIC8vIG11bHRpIGxpbmUgJycnIHN0cmluZyBzdGFydFxuICAgICAgICAgICAgcmVnZXggOiBzdHJQcmUgKyBcIid7M31cIixcbiAgICAgICAgICAgIG5leHQgOiBcInFzdHJpbmczXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLCAgICAgICAgICAgLy8gJyBzdHJpbmdcbiAgICAgICAgICAgIHJlZ2V4IDogc3RyUHJlICsgXCInKD89LilcIixcbiAgICAgICAgICAgIG5leHQgOiBcInFzdHJpbmdcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLCAvLyBpbWFnaW5hcnlcbiAgICAgICAgICAgIHJlZ2V4IDogXCIoPzpcIiArIGZsb2F0TnVtYmVyICsgXCJ8XFxcXGQrKVtqSl1cXFxcYlwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5udW1lcmljXCIsIC8vIGZsb2F0XG4gICAgICAgICAgICByZWdleCA6IGZsb2F0TnVtYmVyXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5udW1lcmljXCIsIC8vIGxvbmcgaW50ZWdlclxuICAgICAgICAgICAgcmVnZXggOiBpbnRlZ2VyICsgXCJbbExdXFxcXGJcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLCAvLyBpbnRlZ2VyXG4gICAgICAgICAgICByZWdleCA6IGludGVnZXIgKyBcIlxcXFxiXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcImtleXdvcmRcIiwgLy8gcHJlLWNvbXBpbGVyIGRpcmVjdGl2ZXNcbiAgICAgICAgICAgIHJlZ2V4IDogXCIjXFxcXHMqKD86aW5jbHVkZXxpbXBvcnR8ZGVmaW5lfHVuZGVmfElOQ0xVREV8SU1QT1JUfERFRklORXxVTkRFRilcXFxcYlwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkXCIsIC8vIHNwZWNpYWwgY2FzZSBwcmUtY29tcGlsZXIgZGlyZWN0aXZlXG4gICAgICAgICAgICByZWdleCA6IFwiI1xcXFxzKig/OmVuZGlmfGlmZGVmfGVsc2V8ZWxzZWlmfGlmbmRlZnxFTkRJRnxJRkRFRnxFTFNFfEVMU0VJRnxJRk5ERUYpXFxcXGJcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IGtleXdvcmRNYXBwZXIsXG4gICAgICAgICAgICByZWdleCA6IFwiW2EtekEtWl8kXVthLXpBLVowLTlfJF0qXFxcXGJcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwia2V5d29yZC5vcGVyYXRvclwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwrfFxcXFwtfFxcXFwqfFxcXFwqXFxcXCp8XFxcXC98XFxcXC9cXFxcL3wlfDw8fD4+fCZ8XFxcXHx8XFxcXF58fnw8fD58PD18PT58PT18IT18PD58PVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJwYXJlbi5scGFyZW5cIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJbXFxcXFtcXFxcKFxcXFx7XVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJwYXJlbi5ycGFyZW5cIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJbXFxcXF1cXFxcKVxcXFx9XVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJ0ZXh0XCIsXG4gICAgICAgICAgICByZWdleCA6IFwiXFxcXHMrXCJcbiAgICAgICAgfSBdLFxuICAgICAgICBcInFxc3RyaW5nM1wiIDogWyB7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCIsXG4gICAgICAgICAgICByZWdleCA6IHN0cmluZ0VzY2FwZVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsIC8vIG11bHRpIGxpbmUgXCJcIlwiIHN0cmluZyBlbmRcbiAgICAgICAgICAgIHJlZ2V4IDogJ1wiezN9JyxcbiAgICAgICAgICAgIG5leHQgOiBcInN0YXJ0XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgZGVmYXVsdFRva2VuIDogXCJzdHJpbmdcIlxuICAgICAgICB9IF0sXG4gICAgICAgIFwicXN0cmluZzNcIiA6IFsge1xuICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLFxuICAgICAgICAgICAgcmVnZXggOiBzdHJpbmdFc2NhcGVcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLCAvLyBtdWx0aSBsaW5lIFwiXCJcIiBzdHJpbmcgZW5kXG4gICAgICAgICAgICByZWdleCA6ICdcInszfScsXG4gICAgICAgICAgICBuZXh0IDogXCJzdGFydFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGRlZmF1bHRUb2tlbiA6IFwic3RyaW5nXCJcbiAgICAgICAgfSBdLFxuICAgICAgICBcInFxc3RyaW5nXCIgOiBbe1xuICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLFxuICAgICAgICAgICAgcmVnZXggOiBzdHJpbmdFc2NhcGVcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgcmVnZXggOiBcIlxcXFxcXFxcJFwiLFxuICAgICAgICAgICAgbmV4dCAgOiBcInFxc3RyaW5nXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgcmVnZXggOiAnXCJ8JCcsXG4gICAgICAgICAgICBuZXh0ICA6IFwic3RhcnRcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwic3RyaW5nXCJcbiAgICAgICAgfV0sXG4gICAgICAgIFwicXN0cmluZ1wiIDogW3tcbiAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIixcbiAgICAgICAgICAgIHJlZ2V4IDogc3RyaW5nRXNjYXBlXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcXFxcXCRcIixcbiAgICAgICAgICAgIG5leHQgIDogXCJxc3RyaW5nXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgcmVnZXggOiBcIid8JFwiLFxuICAgICAgICAgICAgbmV4dCAgOiBcInN0YXJ0XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInN0cmluZ1wiXG4gICAgICAgIH1dXG4gICAgfTtcbn07XG5cbm9vcC5pbmhlcml0cyhGb3J0cmFuSGlnaGxpZ2h0UnVsZXMsIFRleHRIaWdobGlnaHRSdWxlcyk7XG5cbmV4cG9ydHMuRm9ydHJhbkhpZ2hsaWdodFJ1bGVzID0gRm9ydHJhbkhpZ2hsaWdodFJ1bGVzO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9