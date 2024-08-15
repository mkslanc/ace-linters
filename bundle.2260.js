"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[2260],{

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

/***/ 22260:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var HighlightRules = (__webpack_require__(92791)/* .PrqlHighlightRules */ .B);
var FoldMode = (__webpack_require__(93887)/* .FoldMode */ .l);

var Mode = function() {
    this.HighlightRules = HighlightRules;
    this.foldingRules = new FoldMode();
    this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, TextMode);

(function() {
    this.lineCommentStart = "#";
    // Extra logic goes here.
    this.$id = "ace/mode/prql";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 92791:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

// https://prql-lang.org/
// https://github.com/PRQL/prql



var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

var PrqlHighlightRules = function() {
    var builtinFunctions = "min|max|sum|average|stddev|every|any|concat_array|count|" +
    "lag|lead|first|last|rank|rank_dense|row_number|" +
    "round|as|in|" +
    "tuple_every|tuple_map|tuple_zip|_eq|_is_null|" +
    "from_text|" +
    "lower|upper|" +
    "read_parquet|read_csv";

    var builtinTypes = [
        "bool",
        "int",
        "int8",
        "int16",
        "int32",
        "int64",
        "int128",
        "float",
        "text",
        "timestamp",
        "set"].join("|");

    var keywordMapper = this.createKeywordMapper({
       "constant.language": "null",
       "constant.language.boolean": "true|false",
       "keyword": "let|into|case|prql|type|module|internal",
       "storage.type": "let|func",
       "support.function": builtinFunctions,
       "support.type": builtinTypes,
       "variable.language": "date|math"
    }, "identifier");
    
    var escapeRe = /\\(\d+|['"\\&bfnrt]|u\{[0-9a-fA-F]{1,6}\}|x[0-9a-fA-F]{2})/;
    var identifierRe = /[A-Za-z_][a-z_A-Z0-9]/.source;
    var numRe = /(?:\d\d*(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+\b)?/.source;
    var bidi = "[\\u202A\\u202B\\u202D\\u202E\\u2066\\u2067\\u2068\\u202C\\u2069]";

    this.$rules = {
        start: [
        {
            token: "string.start",
            regex: 's?"',
            next: "string"
        }, {
            token: "string.start",
            regex: 'f"',
            next: "fstring"
        }, {
            token: "string.start",
            regex: 'r"',
            next: "rstring"
        }, {
            token: "string.single",
            start: "'",
            end: "'"
        }, {
            token: "string.character",
            regex: "'(?:" + escapeRe.source + "|.)'?"
        }, {
            token: "constant.language",
            regex: "^" + identifierRe + "*"
        }, {
            token : ["constant.numeric", "keyword"],
            regex : "(" + numRe + ")(years|months|weeks|days|hours|minutes|seconds|milliseconds|microseconds)"
        }, {
            token: "constant.numeric", // hexadecimal, octal and binary
            regex: /0(?:[xX][0-9a-fA-F]+|[oO][0-7]+|[bB][01]+)\b/
        }, {
            token: "constant.numeric", // decimal integers and floats
            regex: numRe
        }, {
            token: "comment.block.documentation",
            regex: "#!.*"
        }, {
            token: "comment.line.number-sign",
            regex: "#.*"
        }, {
            token: "keyword.operator",
            regex: /\|\s*/,
            next: "pipe"
        }, {
            token: "keyword.operator",
            regex: /->|=>|==|!=|>=|<=|~=|&&|\|\||\?\?|\/\/|@/
        }, {
            token: "invalid.illegal",
            regex: bidi
        }, {
            token: "punctuation.operator",
            regex: /[,`]/
        }, {
            token: keywordMapper,
            regex: "[\\w\\xff-\\u218e\\u2455-\\uffff]+\\b"
        }, {
            token: "paren.lparen",
            regex: /[\[({]/
        }, {
            token: "paren.rparen",
            regex: /[\])}]/
        } ],
        pipe: [{
            token: "constant.language",
            regex: identifierRe + "*",
            next: "pop"
        },{
            token: "error",
            regex: "",
            next: "pop"
        }],
        string: [{
            token: "constant.character.escape",
            regex: escapeRe
        }, {
            token: "text",
            regex: /\\(\s|$)/,
            next: "stringGap"
        }, {
            token: "string.end",
            regex: '"',
            next: "start"
        }, {
            token: "invalid.illegal",
            regex: bidi
        }, {
            defaultToken: "string.double"
        }],
        stringGap: [{
            token: "text",
            regex: /\\/,
            next: "string"
        }, {
            token: "error",
            regex: "",
            next: "start"
        }],
        fstring: [{
            token: "constant.character.escape",
            regex: escapeRe
        }, {
            token: "string.end",
            regex: '"',
            next: "start"
        }, {
            token: "invalid.illegal",
            regex: bidi
        }, {
            token: "paren.lparen",
            regex: "{",
            push: "fstringParenRules"
        }, {
            token: "invalid.illegal",
            regex: bidi
        }, {
            defaultToken: "string"
        }],
        fstringParenRules: [{
            token: "constant.language",
            regex: "^" + identifierRe + "*"
        }, {
            token: "paren.rparen",
            regex: "}",
            next: "pop"
        }],
        rstring: [{
            token: "string.end",
            regex: '"',
            next: "start"
        }, {
            token: "invalid.illegal",
            regex: bidi
        }, {
            defaultToken: "string"
        }]
    };
    
    this.normalizeRules();
};

oop.inherits(PrqlHighlightRules, TextHighlightRules);

exports.B = PrqlHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsU0FBMEIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2ZvbGRpbmcvY3N0eWxlLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvcHJxbC5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL3BycWxfaGlnaGxpZ2h0X3J1bGVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uLy4uL2xpYi9vb3BcIik7XG52YXIgUmFuZ2UgPSByZXF1aXJlKFwiLi4vLi4vcmFuZ2VcIikuUmFuZ2U7XG52YXIgQmFzZUZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZF9tb2RlXCIpLkZvbGRNb2RlO1xuXG52YXIgRm9sZE1vZGUgPSBleHBvcnRzLkZvbGRNb2RlID0gZnVuY3Rpb24oY29tbWVudFJlZ2V4KSB7XG4gICAgaWYgKGNvbW1lbnRSZWdleCkge1xuICAgICAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlciA9IG5ldyBSZWdFeHAoXG4gICAgICAgICAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlci5zb3VyY2UucmVwbGFjZSgvXFx8W158XSo/JC8sIFwifFwiICsgY29tbWVudFJlZ2V4LnN0YXJ0KVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmZvbGRpbmdTdG9wTWFya2VyID0gbmV3IFJlZ0V4cChcbiAgICAgICAgICAgIHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIuc291cmNlLnJlcGxhY2UoL1xcfFtefF0qPyQvLCBcInxcIiArIGNvbW1lbnRSZWdleC5lbmQpXG4gICAgICAgICk7XG4gICAgfVxufTtcbm9vcC5pbmhlcml0cyhGb2xkTW9kZSwgQmFzZUZvbGRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuICAgIFxuICAgIHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyID0gLyhbXFx7XFxbXFwoXSlbXlxcfVxcXVxcKV0qJHxeXFxzKihcXC9cXCopLztcbiAgICB0aGlzLmZvbGRpbmdTdG9wTWFya2VyID0gL15bXlxcW1xce1xcKF0qKFtcXH1cXF1cXCldKXxeW1xcc1xcKl0qKFxcKlxcLykvO1xuICAgIHRoaXMuc2luZ2xlTGluZUJsb2NrQ29tbWVudFJlPSAvXlxccyooXFwvXFwqKS4qXFwqXFwvXFxzKiQvO1xuICAgIHRoaXMudHJpcGxlU3RhckJsb2NrQ29tbWVudFJlID0gL15cXHMqKFxcL1xcKlxcKlxcKikuKlxcKlxcL1xccyokLztcbiAgICB0aGlzLnN0YXJ0UmVnaW9uUmUgPSAvXlxccyooXFwvXFwqfFxcL1xcLykjP3JlZ2lvblxcYi87XG4gICAgXG4gICAgLy9wcmV2ZW50IG5hbWluZyBjb25mbGljdCB3aXRoIGFueSBtb2RlcyB0aGF0IGluaGVyaXQgZnJvbSBjc3R5bGUgYW5kIG92ZXJyaWRlIHRoaXMgKGxpa2UgY3NoYXJwKVxuICAgIHRoaXMuX2dldEZvbGRXaWRnZXRCYXNlID0gdGhpcy5nZXRGb2xkV2lkZ2V0O1xuICAgIFxuICAgIC8qKlxuICAgICAqIEdldHMgZm9sZCB3aWRnZXQgd2l0aCBzb21lIG5vbi1zdGFuZGFyZCBleHRyYXM6XG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSBsaW5lQ29tbWVudFJlZ2lvblN0YXJ0XG4gICAgICogICAgICAvLyNyZWdpb24gW29wdGlvbmFsIGRlc2NyaXB0aW9uXVxuICAgICAqXG4gICAgICogQGV4YW1wbGUgYmxvY2tDb21tZW50UmVnaW9uU3RhcnRcbiAgICAgKiAgICAgIC8qI3JlZ2lvbiBbb3B0aW9uYWwgZGVzY3JpcHRpb25dICpbL11cbiAgICAgKlxuICAgICAqIEBleGFtcGxlIHRyaXBsZVN0YXJGb2xkaW5nU2VjdGlvblxuICAgICAqICAgICAgLyoqKiB0aGlzIGZvbGRzIGV2ZW4gdGhvdWdoIDEgbGluZSBiZWNhdXNlIGl0IGhhcyAzIHN0YXJzICoqKlsvXVxuICAgICAqIFxuICAgICAqIEBub3RlIHRoZSBwb3VuZCBzeW1ib2wgZm9yIHJlZ2lvbiB0YWdzIGlzIG9wdGlvbmFsXG4gICAgICovXG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0ID0gZnVuY3Rpb24oc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICBcbiAgICAgICAgaWYgKHRoaXMuc2luZ2xlTGluZUJsb2NrQ29tbWVudFJlLnRlc3QobGluZSkpIHtcbiAgICAgICAgICAgIC8vIE5vIHdpZGdldCBmb3Igc2luZ2xlIGxpbmUgYmxvY2sgY29tbWVudCB1bmxlc3MgcmVnaW9uIG9yIHRyaXBsZSBzdGFyXG4gICAgICAgICAgICBpZiAoIXRoaXMuc3RhcnRSZWdpb25SZS50ZXN0KGxpbmUpICYmICF0aGlzLnRyaXBsZVN0YXJCbG9ja0NvbW1lbnRSZS50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIHZhciBmdyA9IHRoaXMuX2dldEZvbGRXaWRnZXRCYXNlKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KTtcbiAgICBcbiAgICAgICAgaWYgKCFmdyAmJiB0aGlzLnN0YXJ0UmVnaW9uUmUudGVzdChsaW5lKSlcbiAgICAgICAgICAgIHJldHVybiBcInN0YXJ0XCI7IC8vIGxpbmVDb21tZW50UmVnaW9uU3RhcnRcbiAgICBcbiAgICAgICAgcmV0dXJuIGZ3O1xuICAgIH07XG5cbiAgICB0aGlzLmdldEZvbGRXaWRnZXRSYW5nZSA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93LCBmb3JjZU11bHRpbGluZSkge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuc3RhcnRSZWdpb25SZS50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q29tbWVudFJlZ2lvbkJsb2NrKHNlc3Npb24sIGxpbmUsIHJvdyk7XG4gICAgICAgIFxuICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyKTtcbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICB2YXIgaSA9IG1hdGNoLmluZGV4O1xuXG4gICAgICAgICAgICBpZiAobWF0Y2hbMV0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMub3BlbmluZ0JyYWNrZXRCbG9jayhzZXNzaW9uLCBtYXRjaFsxXSwgcm93LCBpKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciByYW5nZSA9IHNlc3Npb24uZ2V0Q29tbWVudEZvbGRSYW5nZShyb3csIGkgKyBtYXRjaFswXS5sZW5ndGgsIDEpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAocmFuZ2UgJiYgIXJhbmdlLmlzTXVsdGlMaW5lKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoZm9yY2VNdWx0aWxpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2UgPSB0aGlzLmdldFNlY3Rpb25SYW5nZShzZXNzaW9uLCByb3cpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZm9sZFN0eWxlICE9IFwiYWxsXCIpXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIHJhbmdlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZvbGRTdHlsZSA9PT0gXCJtYXJrYmVnaW5cIilcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIpO1xuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIHZhciBpID0gbWF0Y2guaW5kZXggKyBtYXRjaFswXS5sZW5ndGg7XG5cbiAgICAgICAgICAgIGlmIChtYXRjaFsxXSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jbG9zaW5nQnJhY2tldEJsb2NrKHNlc3Npb24sIG1hdGNoWzFdLCByb3csIGkpO1xuXG4gICAgICAgICAgICByZXR1cm4gc2Vzc2lvbi5nZXRDb21tZW50Rm9sZFJhbmdlKHJvdywgaSwgLTEpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBcbiAgICB0aGlzLmdldFNlY3Rpb25SYW5nZSA9IGZ1bmN0aW9uKHNlc3Npb24sIHJvdykge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICB2YXIgc3RhcnRJbmRlbnQgPSBsaW5lLnNlYXJjaCgvXFxTLyk7XG4gICAgICAgIHZhciBzdGFydFJvdyA9IHJvdztcbiAgICAgICAgdmFyIHN0YXJ0Q29sdW1uID0gbGluZS5sZW5ndGg7XG4gICAgICAgIHJvdyA9IHJvdyArIDE7XG4gICAgICAgIHZhciBlbmRSb3cgPSByb3c7XG4gICAgICAgIHZhciBtYXhSb3cgPSBzZXNzaW9uLmdldExlbmd0aCgpO1xuICAgICAgICB3aGlsZSAoKytyb3cgPCBtYXhSb3cpIHtcbiAgICAgICAgICAgIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgICAgIHZhciBpbmRlbnQgPSBsaW5lLnNlYXJjaCgvXFxTLyk7XG4gICAgICAgICAgICBpZiAoaW5kZW50ID09PSAtMSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIGlmICAoc3RhcnRJbmRlbnQgPiBpbmRlbnQpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB2YXIgc3ViUmFuZ2UgPSB0aGlzLmdldEZvbGRXaWRnZXRSYW5nZShzZXNzaW9uLCBcImFsbFwiLCByb3cpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoc3ViUmFuZ2UpIHtcbiAgICAgICAgICAgICAgICBpZiAoc3ViUmFuZ2Uuc3RhcnQucm93IDw9IHN0YXJ0Um93KSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3ViUmFuZ2UuaXNNdWx0aUxpbmUoKSkge1xuICAgICAgICAgICAgICAgICAgICByb3cgPSBzdWJSYW5nZS5lbmQucm93O1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhcnRJbmRlbnQgPT0gaW5kZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVuZFJvdyA9IHJvdztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShzdGFydFJvdywgc3RhcnRDb2x1bW4sIGVuZFJvdywgc2Vzc2lvbi5nZXRMaW5lKGVuZFJvdykubGVuZ3RoKTtcbiAgICB9O1xuICAgIFxuICAgIC8qKlxuICAgICAqIGdldHMgY29tbWVudCByZWdpb24gYmxvY2sgd2l0aCBlbmQgcmVnaW9uIGFzc3VtZWQgdG8gYmUgc3RhcnQgb2YgY29tbWVudCBpbiBhbnkgY3N0eWxlIG1vZGUgb3IgU1FMIG1vZGUgKC0tKSB3aGljaCBpbmhlcml0cyBmcm9tIHRoaXMuXG4gICAgICogVGhlcmUgbWF5IG9wdGlvbmFsbHkgYmUgYSBwb3VuZCBzeW1ib2wgYmVmb3JlIHRoZSByZWdpb24vZW5kcmVnaW9uIHN0YXRlbWVudFxuICAgICAqL1xuICAgIHRoaXMuZ2V0Q29tbWVudFJlZ2lvbkJsb2NrID0gZnVuY3Rpb24oc2Vzc2lvbiwgbGluZSwgcm93KSB7XG4gICAgICAgIHZhciBzdGFydENvbHVtbiA9IGxpbmUuc2VhcmNoKC9cXHMqJC8pO1xuICAgICAgICB2YXIgbWF4Um93ID0gc2Vzc2lvbi5nZXRMZW5ndGgoKTtcbiAgICAgICAgdmFyIHN0YXJ0Um93ID0gcm93O1xuICAgICAgICBcbiAgICAgICAgdmFyIHJlID0gL15cXHMqKD86XFwvXFwqfFxcL1xcL3wtLSkjPyhlbmQpP3JlZ2lvblxcYi87XG4gICAgICAgIHZhciBkZXB0aCA9IDE7XG4gICAgICAgIHdoaWxlICgrK3JvdyA8IG1heFJvdykge1xuICAgICAgICAgICAgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICAgICAgdmFyIG0gPSByZS5leGVjKGxpbmUpO1xuICAgICAgICAgICAgaWYgKCFtKSBjb250aW51ZTtcbiAgICAgICAgICAgIGlmIChtWzFdKSBkZXB0aC0tO1xuICAgICAgICAgICAgZWxzZSBkZXB0aCsrO1xuXG4gICAgICAgICAgICBpZiAoIWRlcHRoKSBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBlbmRSb3cgPSByb3c7XG4gICAgICAgIGlmIChlbmRSb3cgPiBzdGFydFJvdykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShzdGFydFJvdywgc3RhcnRDb2x1bW4sIGVuZFJvdywgbGluZS5sZW5ndGgpO1xuICAgICAgICB9XG4gICAgfTtcblxufSkuY2FsbChGb2xkTW9kZS5wcm90b3R5cGUpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0TW9kZSA9IHJlcXVpcmUoXCIuL3RleHRcIikuTW9kZTtcbnZhciBIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3BycWxfaGlnaGxpZ2h0X3J1bGVzXCIpLlBycWxIaWdobGlnaHRSdWxlcztcbnZhciBGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRpbmcvY3N0eWxlXCIpLkZvbGRNb2RlO1xuXG52YXIgTW9kZSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuSGlnaGxpZ2h0UnVsZXMgPSBIaWdobGlnaHRSdWxlcztcbiAgICB0aGlzLmZvbGRpbmdSdWxlcyA9IG5ldyBGb2xkTW9kZSgpO1xuICAgIHRoaXMuJGJlaGF2aW91ciA9IHRoaXMuJGRlZmF1bHRCZWhhdmlvdXI7XG59O1xub29wLmluaGVyaXRzKE1vZGUsIFRleHRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuICAgIHRoaXMubGluZUNvbW1lbnRTdGFydCA9IFwiI1wiO1xuICAgIC8vIEV4dHJhIGxvZ2ljIGdvZXMgaGVyZS5cbiAgICB0aGlzLiRpZCA9IFwiYWNlL21vZGUvcHJxbFwiO1xufSkuY2FsbChNb2RlLnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTW9kZSA9IE1vZGU7XG4iLCIvLyBodHRwczovL3BycWwtbGFuZy5vcmcvXG4vLyBodHRwczovL2dpdGh1Yi5jb20vUFJRTC9wcnFsXG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xuXG52YXIgUHJxbEhpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGJ1aWx0aW5GdW5jdGlvbnMgPSBcIm1pbnxtYXh8c3VtfGF2ZXJhZ2V8c3RkZGV2fGV2ZXJ5fGFueXxjb25jYXRfYXJyYXl8Y291bnR8XCIgK1xuICAgIFwibGFnfGxlYWR8Zmlyc3R8bGFzdHxyYW5rfHJhbmtfZGVuc2V8cm93X251bWJlcnxcIiArXG4gICAgXCJyb3VuZHxhc3xpbnxcIiArXG4gICAgXCJ0dXBsZV9ldmVyeXx0dXBsZV9tYXB8dHVwbGVfemlwfF9lcXxfaXNfbnVsbHxcIiArXG4gICAgXCJmcm9tX3RleHR8XCIgK1xuICAgIFwibG93ZXJ8dXBwZXJ8XCIgK1xuICAgIFwicmVhZF9wYXJxdWV0fHJlYWRfY3N2XCI7XG5cbiAgICB2YXIgYnVpbHRpblR5cGVzID0gW1xuICAgICAgICBcImJvb2xcIixcbiAgICAgICAgXCJpbnRcIixcbiAgICAgICAgXCJpbnQ4XCIsXG4gICAgICAgIFwiaW50MTZcIixcbiAgICAgICAgXCJpbnQzMlwiLFxuICAgICAgICBcImludDY0XCIsXG4gICAgICAgIFwiaW50MTI4XCIsXG4gICAgICAgIFwiZmxvYXRcIixcbiAgICAgICAgXCJ0ZXh0XCIsXG4gICAgICAgIFwidGltZXN0YW1wXCIsXG4gICAgICAgIFwic2V0XCJdLmpvaW4oXCJ8XCIpO1xuXG4gICAgdmFyIGtleXdvcmRNYXBwZXIgPSB0aGlzLmNyZWF0ZUtleXdvcmRNYXBwZXIoe1xuICAgICAgIFwiY29uc3RhbnQubGFuZ3VhZ2VcIjogXCJudWxsXCIsXG4gICAgICAgXCJjb25zdGFudC5sYW5ndWFnZS5ib29sZWFuXCI6IFwidHJ1ZXxmYWxzZVwiLFxuICAgICAgIFwia2V5d29yZFwiOiBcImxldHxpbnRvfGNhc2V8cHJxbHx0eXBlfG1vZHVsZXxpbnRlcm5hbFwiLFxuICAgICAgIFwic3RvcmFnZS50eXBlXCI6IFwibGV0fGZ1bmNcIixcbiAgICAgICBcInN1cHBvcnQuZnVuY3Rpb25cIjogYnVpbHRpbkZ1bmN0aW9ucyxcbiAgICAgICBcInN1cHBvcnQudHlwZVwiOiBidWlsdGluVHlwZXMsXG4gICAgICAgXCJ2YXJpYWJsZS5sYW5ndWFnZVwiOiBcImRhdGV8bWF0aFwiXG4gICAgfSwgXCJpZGVudGlmaWVyXCIpO1xuICAgIFxuICAgIHZhciBlc2NhcGVSZSA9IC9cXFxcKFxcZCt8WydcIlxcXFwmYmZucnRdfHVcXHtbMC05YS1mQS1GXXsxLDZ9XFx9fHhbMC05YS1mQS1GXXsyfSkvO1xuICAgIHZhciBpZGVudGlmaWVyUmUgPSAvW0EtWmEtel9dW2Etel9BLVowLTldLy5zb3VyY2U7XG4gICAgdmFyIG51bVJlID0gLyg/OlxcZFxcZCooPzpcXC5cXGQqKT98XFwuXFxkKykoPzpbZUVdWystXT9cXGQrXFxiKT8vLnNvdXJjZTtcbiAgICB2YXIgYmlkaSA9IFwiW1xcXFx1MjAyQVxcXFx1MjAyQlxcXFx1MjAyRFxcXFx1MjAyRVxcXFx1MjA2NlxcXFx1MjA2N1xcXFx1MjA2OFxcXFx1MjAyQ1xcXFx1MjA2OV1cIjtcblxuICAgIHRoaXMuJHJ1bGVzID0ge1xuICAgICAgICBzdGFydDogW1xuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbjogXCJzdHJpbmcuc3RhcnRcIixcbiAgICAgICAgICAgIHJlZ2V4OiAncz9cIicsXG4gICAgICAgICAgICBuZXh0OiBcInN0cmluZ1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInN0cmluZy5zdGFydFwiLFxuICAgICAgICAgICAgcmVnZXg6ICdmXCInLFxuICAgICAgICAgICAgbmV4dDogXCJmc3RyaW5nXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nLnN0YXJ0XCIsXG4gICAgICAgICAgICByZWdleDogJ3JcIicsXG4gICAgICAgICAgICBuZXh0OiBcInJzdHJpbmdcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJzdHJpbmcuc2luZ2xlXCIsXG4gICAgICAgICAgICBzdGFydDogXCInXCIsXG4gICAgICAgICAgICBlbmQ6IFwiJ1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInN0cmluZy5jaGFyYWN0ZXJcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIicoPzpcIiArIGVzY2FwZVJlLnNvdXJjZSArIFwifC4pJz9cIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5sYW5ndWFnZVwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiXlwiICsgaWRlbnRpZmllclJlICsgXCIqXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBbXCJjb25zdGFudC5udW1lcmljXCIsIFwia2V5d29yZFwiXSxcbiAgICAgICAgICAgIHJlZ2V4IDogXCIoXCIgKyBudW1SZSArIFwiKSh5ZWFyc3xtb250aHN8d2Vla3N8ZGF5c3xob3Vyc3xtaW51dGVzfHNlY29uZHN8bWlsbGlzZWNvbmRzfG1pY3Jvc2Vjb25kcylcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5udW1lcmljXCIsIC8vIGhleGFkZWNpbWFsLCBvY3RhbCBhbmQgYmluYXJ5XG4gICAgICAgICAgICByZWdleDogLzAoPzpbeFhdWzAtOWEtZkEtRl0rfFtvT11bMC03XSt8W2JCXVswMV0rKVxcYi9cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQubnVtZXJpY1wiLCAvLyBkZWNpbWFsIGludGVnZXJzIGFuZCBmbG9hdHNcbiAgICAgICAgICAgIHJlZ2V4OiBudW1SZVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJjb21tZW50LmJsb2NrLmRvY3VtZW50YXRpb25cIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIiMhLipcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJjb21tZW50LmxpbmUubnVtYmVyLXNpZ25cIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIiMuKlwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcImtleXdvcmQub3BlcmF0b3JcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXFx8XFxzKi8sXG4gICAgICAgICAgICBuZXh0OiBcInBpcGVcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJrZXl3b3JkLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICByZWdleDogLy0+fD0+fD09fCE9fD49fDw9fH49fCYmfFxcfFxcfHxcXD9cXD98XFwvXFwvfEAvXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcImludmFsaWQuaWxsZWdhbFwiLFxuICAgICAgICAgICAgcmVnZXg6IGJpZGlcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwicHVuY3R1YXRpb24ub3BlcmF0b3JcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvWyxgXS9cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IGtleXdvcmRNYXBwZXIsXG4gICAgICAgICAgICByZWdleDogXCJbXFxcXHdcXFxceGZmLVxcXFx1MjE4ZVxcXFx1MjQ1NS1cXFxcdWZmZmZdK1xcXFxiXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwicGFyZW4ubHBhcmVuXCIsXG4gICAgICAgICAgICByZWdleDogL1tcXFsoe10vXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInBhcmVuLnJwYXJlblwiLFxuICAgICAgICAgICAgcmVnZXg6IC9bXFxdKX1dL1xuICAgICAgICB9IF0sXG4gICAgICAgIHBpcGU6IFt7XG4gICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5sYW5ndWFnZVwiLFxuICAgICAgICAgICAgcmVnZXg6IGlkZW50aWZpZXJSZSArIFwiKlwiLFxuICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICB9LHtcbiAgICAgICAgICAgIHRva2VuOiBcImVycm9yXCIsXG4gICAgICAgICAgICByZWdleDogXCJcIixcbiAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgfV0sXG4gICAgICAgIHN0cmluZzogW3tcbiAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50LmNoYXJhY3Rlci5lc2NhcGVcIixcbiAgICAgICAgICAgIHJlZ2V4OiBlc2NhcGVSZVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICByZWdleDogL1xcXFwoXFxzfCQpLyxcbiAgICAgICAgICAgIG5leHQ6IFwic3RyaW5nR2FwXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nLmVuZFwiLFxuICAgICAgICAgICAgcmVnZXg6ICdcIicsXG4gICAgICAgICAgICBuZXh0OiBcInN0YXJ0XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwiaW52YWxpZC5pbGxlZ2FsXCIsXG4gICAgICAgICAgICByZWdleDogYmlkaVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwic3RyaW5nLmRvdWJsZVwiXG4gICAgICAgIH1dLFxuICAgICAgICBzdHJpbmdHYXA6IFt7XG4gICAgICAgICAgICB0b2tlbjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICByZWdleDogL1xcXFwvLFxuICAgICAgICAgICAgbmV4dDogXCJzdHJpbmdcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJlcnJvclwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiXCIsXG4gICAgICAgICAgICBuZXh0OiBcInN0YXJ0XCJcbiAgICAgICAgfV0sXG4gICAgICAgIGZzdHJpbmc6IFt7XG4gICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5jaGFyYWN0ZXIuZXNjYXBlXCIsXG4gICAgICAgICAgICByZWdleDogZXNjYXBlUmVcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nLmVuZFwiLFxuICAgICAgICAgICAgcmVnZXg6ICdcIicsXG4gICAgICAgICAgICBuZXh0OiBcInN0YXJ0XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwiaW52YWxpZC5pbGxlZ2FsXCIsXG4gICAgICAgICAgICByZWdleDogYmlkaVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJwYXJlbi5scGFyZW5cIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIntcIixcbiAgICAgICAgICAgIHB1c2g6IFwiZnN0cmluZ1BhcmVuUnVsZXNcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJpbnZhbGlkLmlsbGVnYWxcIixcbiAgICAgICAgICAgIHJlZ2V4OiBiaWRpXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzdHJpbmdcIlxuICAgICAgICB9XSxcbiAgICAgICAgZnN0cmluZ1BhcmVuUnVsZXM6IFt7XG4gICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5sYW5ndWFnZVwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiXlwiICsgaWRlbnRpZmllclJlICsgXCIqXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwicGFyZW4ucnBhcmVuXCIsXG4gICAgICAgICAgICByZWdleDogXCJ9XCIsXG4gICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgIH1dLFxuICAgICAgICByc3RyaW5nOiBbe1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nLmVuZFwiLFxuICAgICAgICAgICAgcmVnZXg6ICdcIicsXG4gICAgICAgICAgICBuZXh0OiBcInN0YXJ0XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwiaW52YWxpZC5pbGxlZ2FsXCIsXG4gICAgICAgICAgICByZWdleDogYmlkaVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwic3RyaW5nXCJcbiAgICAgICAgfV1cbiAgICB9O1xuICAgIFxuICAgIHRoaXMubm9ybWFsaXplUnVsZXMoKTtcbn07XG5cbm9vcC5pbmhlcml0cyhQcnFsSGlnaGxpZ2h0UnVsZXMsIFRleHRIaWdobGlnaHRSdWxlcyk7XG5cbmV4cG9ydHMuUHJxbEhpZ2hsaWdodFJ1bGVzID0gUHJxbEhpZ2hsaWdodFJ1bGVzO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9