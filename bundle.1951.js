"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[1951],{

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

/***/ 71951:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/*
  THIS FILE WAS AUTOGENERATED BY mode.tmpl.js
*/



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var PigHighlightRules = (__webpack_require__(69900)/* .PigHighlightRules */ .g);
// TODO: pick appropriate fold mode
var FoldMode = (__webpack_require__(93887)/* .FoldMode */ .l);

var Mode = function() {
    this.HighlightRules = PigHighlightRules;
    this.foldingRules = new FoldMode();
};
oop.inherits(Mode, TextMode);

(function() {
    this.lineCommentStart = "--";
    this.blockComment = {start: "/*", end: "*/"};
    // Extra logic goes here.
    this.$id = "ace/mode/pig";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 69900:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* This file was autogenerated from Pig.tmLanguage (uuid: ) */
/****************************************************************************************
 * IT MIGHT NOT BE PERFECT ...But it's a good start from an existing *.tmlanguage file. *
 * fileTypes                                                                            *
 ****************************************************************************************/



var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

var PigHighlightRules = function() {
    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used

    this.$rules = {
        start: [{
            token: "comment.block.pig",
            regex: /\/\*/,
            push: [{
                token: "comment.block.pig",
                regex: /\*\//,
                next: "pop"
            }, {
                defaultToken: "comment.block.pig"
            }]
        }, {
            token: "comment.line.double-dash.asciidoc",
            regex: /--.*$/
        }, {
            token: "keyword.control.pig",
            regex: /\b(?:ASSERT|LOAD|STORE|DUMP|FILTER|DISTINCT|FOREACH|GENERATE|STREAM|JOIN|COGROUP|GROUP|CROSS|ORDER|LIMIT|UNION|SPLIT|DESCRIBE|EXPLAIN|ILLUSTRATE|AS|BY|INTO|USING|LIMIT|PARALLEL|OUTER|INNER|DEFAULT|LEFT|SAMPLE|RANK|CUBE|ALL|KILL|QUIT|MAPREDUCE|ASC|DESC|THROUGH|SHIP|CACHE|DECLARE|CASE|WHEN|THEN|END|IN|PARTITION|FULL|IMPORT|IF|ONSCHEMA|INPUT|OUTPUT)\b/,
            caseInsensitive: true
        }, {
            token: "storage.datatypes.pig",
            regex: /\b(?:int|long|float|double|chararray|bytearray|boolean|datetime|biginteger|bigdecimal|tuple|bag|map)\b/,
            caseInsensitive: true
        }, {
            token: "support.function.storage.pig",
            regex: /\b(?:PigStorage|BinStorage|BinaryStorage|PigDump|HBaseStorage|JsonLoader|JsonStorage|AvroStorage|TextLoader|PigStreaming|TrevniStorage|AccumuloStorage)\b/
        }, {
            token: "support.function.udf.pig",
            regex: /\b(?:DIFF|TOBAG|TOMAP|TOP|TOTUPLE|RANDOM|FLATTEN|flatten|CUBE|ROLLUP|IsEmpty|ARITY|PluckTuple|SUBTRACT|BagToString)\b/
        }, {
            token: "support.function.udf.math.pig",
            regex: /\b(?:ABS|ACOS|ASIN|ATAN|CBRT|CEIL|COS|COSH|EXP|FLOOR|LOG|LOG10|ROUND|ROUND_TO|SIN|SINH|SQRT|TAN|TANH|AVG|COUNT|COUNT_STAR|MAX|MIN|SUM|COR|COV)\b/
        }, {
            token: "support.function.udf.string.pig",
            regex: /\b(?:CONCAT|INDEXOF|LAST_INDEX_OF|LCFIRST|LOWER|REGEX_EXTRACT|REGEX_EXTRACT_ALL|REPLACE|SIZE|STRSPLIT|SUBSTRING|TOKENIZE|TRIM|UCFIRST|UPPER|LTRIM|RTRIM|ENDSWITH|STARTSWITH|TRIM)\b/
        }, {
            token: "support.function.udf.datetime.pig",
            regex: /\b(?:AddDuration|CurrentTime|DaysBetween|GetDay|GetHour|GetMilliSecond|GetMinute|GetMonth|GetSecond|GetWeek|GetWeekYear|GetYear|HoursBetween|MilliSecondsBetween|MinutesBetween|MonthsBetween|SecondsBetween|SubtractDuration|ToDate|WeeksBetween|YearsBetween|ToMilliSeconds|ToString|ToUnixTime)\b/
        }, {
            token: "support.function.command.pig",
            regex: /\b(?:cat|cd|copyFromLocal|copyToLocal|cp|ls|mkdir|mv|pwd|rm)\b/
        }, {
            token: "variable.pig",
            regex: /\$[a_zA-Z0-9_]+/
        }, {
            token: "constant.language.pig",
            regex: /\b(?:NULL|true|false|stdin|stdout|stderr)\b/,
            caseInsensitive: true
        }, {
            token: "constant.numeric.pig",
            regex: /\b\d+(?:\.\d+)?\b/
        }, {
            token: "keyword.operator.comparison.pig",
            regex: /!=|==|<|>|<=|>=|\b(?:MATCHES|IS|OR|AND|NOT)\b/,
            caseInsensitive: true
        }, {
            token: "keyword.operator.arithmetic.pig",
            regex: /\+|\-|\*|\/|\%|\?|:|::|\.\.|#/
        }, {
            token: "string.quoted.double.pig",
            regex: /"/,
            push: [{
                token: "string.quoted.double.pig",
                regex: /"/,
                next: "pop"
            }, {
                token: "constant.character.escape.pig",
                regex: /\\./
            }, {
                defaultToken: "string.quoted.double.pig"
            }]
        }, {
            token: "string.quoted.single.pig",
            regex: /'/,
            push: [{
                token: "string.quoted.single.pig",
                regex: /'/,
                next: "pop"
            }, {
                token: "constant.character.escape.pig",
                regex: /\\./
            }, {
                defaultToken: "string.quoted.single.pig"
            }]
        }, {
            todo: {
                token: [
                    "text",
                    "keyword.parameter.pig",
                    "text",
                    "storage.type.parameter.pig"
                ],
                regex: /^(\s*)(set)(\s+)(\S+)/,
                caseInsensitive: true,
                push: [{
                    token: "text",
                    regex: /$/,
                    next: "pop"
                }, {
                    include: "$self"
                }]
            }
        }, {
            token: [
                "text",
                "keyword.alias.pig",
                "text",
                "storage.type.alias.pig"
            ],
            regex: /(\s*)(DEFINE|DECLARE|REGISTER)(\s+)(\S+)/,
            caseInsensitive: true,
            push: [{
                token: "text",
                regex: /;?$/,
                next: "pop"
            }]
        }]
    };
    
    this.normalizeRules();
};

PigHighlightRules.metaData = {
    fileTypes: ["pig"],
    name: "Pig",
    scopeName: "source.pig"
};


oop.inherits(PigHighlightRules, TextHighlightRules);

exports.g = PigHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQSxTQUF5QiIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvZm9sZGluZy9jc3R5bGUuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9waWcuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9waWdfaGlnaGxpZ2h0X3J1bGVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uLy4uL2xpYi9vb3BcIik7XG52YXIgUmFuZ2UgPSByZXF1aXJlKFwiLi4vLi4vcmFuZ2VcIikuUmFuZ2U7XG52YXIgQmFzZUZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZF9tb2RlXCIpLkZvbGRNb2RlO1xuXG52YXIgRm9sZE1vZGUgPSBleHBvcnRzLkZvbGRNb2RlID0gZnVuY3Rpb24oY29tbWVudFJlZ2V4KSB7XG4gICAgaWYgKGNvbW1lbnRSZWdleCkge1xuICAgICAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlciA9IG5ldyBSZWdFeHAoXG4gICAgICAgICAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlci5zb3VyY2UucmVwbGFjZSgvXFx8W158XSo/JC8sIFwifFwiICsgY29tbWVudFJlZ2V4LnN0YXJ0KVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmZvbGRpbmdTdG9wTWFya2VyID0gbmV3IFJlZ0V4cChcbiAgICAgICAgICAgIHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIuc291cmNlLnJlcGxhY2UoL1xcfFtefF0qPyQvLCBcInxcIiArIGNvbW1lbnRSZWdleC5lbmQpXG4gICAgICAgICk7XG4gICAgfVxufTtcbm9vcC5pbmhlcml0cyhGb2xkTW9kZSwgQmFzZUZvbGRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuICAgIFxuICAgIHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyID0gLyhbXFx7XFxbXFwoXSlbXlxcfVxcXVxcKV0qJHxeXFxzKihcXC9cXCopLztcbiAgICB0aGlzLmZvbGRpbmdTdG9wTWFya2VyID0gL15bXlxcW1xce1xcKF0qKFtcXH1cXF1cXCldKXxeW1xcc1xcKl0qKFxcKlxcLykvO1xuICAgIHRoaXMuc2luZ2xlTGluZUJsb2NrQ29tbWVudFJlPSAvXlxccyooXFwvXFwqKS4qXFwqXFwvXFxzKiQvO1xuICAgIHRoaXMudHJpcGxlU3RhckJsb2NrQ29tbWVudFJlID0gL15cXHMqKFxcL1xcKlxcKlxcKikuKlxcKlxcL1xccyokLztcbiAgICB0aGlzLnN0YXJ0UmVnaW9uUmUgPSAvXlxccyooXFwvXFwqfFxcL1xcLykjP3JlZ2lvblxcYi87XG4gICAgXG4gICAgLy9wcmV2ZW50IG5hbWluZyBjb25mbGljdCB3aXRoIGFueSBtb2RlcyB0aGF0IGluaGVyaXQgZnJvbSBjc3R5bGUgYW5kIG92ZXJyaWRlIHRoaXMgKGxpa2UgY3NoYXJwKVxuICAgIHRoaXMuX2dldEZvbGRXaWRnZXRCYXNlID0gdGhpcy5nZXRGb2xkV2lkZ2V0O1xuICAgIFxuICAgIC8qKlxuICAgICAqIEdldHMgZm9sZCB3aWRnZXQgd2l0aCBzb21lIG5vbi1zdGFuZGFyZCBleHRyYXM6XG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSBsaW5lQ29tbWVudFJlZ2lvblN0YXJ0XG4gICAgICogICAgICAvLyNyZWdpb24gW29wdGlvbmFsIGRlc2NyaXB0aW9uXVxuICAgICAqXG4gICAgICogQGV4YW1wbGUgYmxvY2tDb21tZW50UmVnaW9uU3RhcnRcbiAgICAgKiAgICAgIC8qI3JlZ2lvbiBbb3B0aW9uYWwgZGVzY3JpcHRpb25dICpbL11cbiAgICAgKlxuICAgICAqIEBleGFtcGxlIHRyaXBsZVN0YXJGb2xkaW5nU2VjdGlvblxuICAgICAqICAgICAgLyoqKiB0aGlzIGZvbGRzIGV2ZW4gdGhvdWdoIDEgbGluZSBiZWNhdXNlIGl0IGhhcyAzIHN0YXJzICoqKlsvXVxuICAgICAqIFxuICAgICAqIEBub3RlIHRoZSBwb3VuZCBzeW1ib2wgZm9yIHJlZ2lvbiB0YWdzIGlzIG9wdGlvbmFsXG4gICAgICovXG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0ID0gZnVuY3Rpb24oc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICBcbiAgICAgICAgaWYgKHRoaXMuc2luZ2xlTGluZUJsb2NrQ29tbWVudFJlLnRlc3QobGluZSkpIHtcbiAgICAgICAgICAgIC8vIE5vIHdpZGdldCBmb3Igc2luZ2xlIGxpbmUgYmxvY2sgY29tbWVudCB1bmxlc3MgcmVnaW9uIG9yIHRyaXBsZSBzdGFyXG4gICAgICAgICAgICBpZiAoIXRoaXMuc3RhcnRSZWdpb25SZS50ZXN0KGxpbmUpICYmICF0aGlzLnRyaXBsZVN0YXJCbG9ja0NvbW1lbnRSZS50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIHZhciBmdyA9IHRoaXMuX2dldEZvbGRXaWRnZXRCYXNlKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KTtcbiAgICBcbiAgICAgICAgaWYgKCFmdyAmJiB0aGlzLnN0YXJ0UmVnaW9uUmUudGVzdChsaW5lKSlcbiAgICAgICAgICAgIHJldHVybiBcInN0YXJ0XCI7IC8vIGxpbmVDb21tZW50UmVnaW9uU3RhcnRcbiAgICBcbiAgICAgICAgcmV0dXJuIGZ3O1xuICAgIH07XG5cbiAgICB0aGlzLmdldEZvbGRXaWRnZXRSYW5nZSA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93LCBmb3JjZU11bHRpbGluZSkge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuc3RhcnRSZWdpb25SZS50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q29tbWVudFJlZ2lvbkJsb2NrKHNlc3Npb24sIGxpbmUsIHJvdyk7XG4gICAgICAgIFxuICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyKTtcbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICB2YXIgaSA9IG1hdGNoLmluZGV4O1xuXG4gICAgICAgICAgICBpZiAobWF0Y2hbMV0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMub3BlbmluZ0JyYWNrZXRCbG9jayhzZXNzaW9uLCBtYXRjaFsxXSwgcm93LCBpKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciByYW5nZSA9IHNlc3Npb24uZ2V0Q29tbWVudEZvbGRSYW5nZShyb3csIGkgKyBtYXRjaFswXS5sZW5ndGgsIDEpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAocmFuZ2UgJiYgIXJhbmdlLmlzTXVsdGlMaW5lKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoZm9yY2VNdWx0aWxpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2UgPSB0aGlzLmdldFNlY3Rpb25SYW5nZShzZXNzaW9uLCByb3cpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZm9sZFN0eWxlICE9IFwiYWxsXCIpXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIHJhbmdlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZvbGRTdHlsZSA9PT0gXCJtYXJrYmVnaW5cIilcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIpO1xuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIHZhciBpID0gbWF0Y2guaW5kZXggKyBtYXRjaFswXS5sZW5ndGg7XG5cbiAgICAgICAgICAgIGlmIChtYXRjaFsxXSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jbG9zaW5nQnJhY2tldEJsb2NrKHNlc3Npb24sIG1hdGNoWzFdLCByb3csIGkpO1xuXG4gICAgICAgICAgICByZXR1cm4gc2Vzc2lvbi5nZXRDb21tZW50Rm9sZFJhbmdlKHJvdywgaSwgLTEpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBcbiAgICB0aGlzLmdldFNlY3Rpb25SYW5nZSA9IGZ1bmN0aW9uKHNlc3Npb24sIHJvdykge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICB2YXIgc3RhcnRJbmRlbnQgPSBsaW5lLnNlYXJjaCgvXFxTLyk7XG4gICAgICAgIHZhciBzdGFydFJvdyA9IHJvdztcbiAgICAgICAgdmFyIHN0YXJ0Q29sdW1uID0gbGluZS5sZW5ndGg7XG4gICAgICAgIHJvdyA9IHJvdyArIDE7XG4gICAgICAgIHZhciBlbmRSb3cgPSByb3c7XG4gICAgICAgIHZhciBtYXhSb3cgPSBzZXNzaW9uLmdldExlbmd0aCgpO1xuICAgICAgICB3aGlsZSAoKytyb3cgPCBtYXhSb3cpIHtcbiAgICAgICAgICAgIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgICAgIHZhciBpbmRlbnQgPSBsaW5lLnNlYXJjaCgvXFxTLyk7XG4gICAgICAgICAgICBpZiAoaW5kZW50ID09PSAtMSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIGlmICAoc3RhcnRJbmRlbnQgPiBpbmRlbnQpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB2YXIgc3ViUmFuZ2UgPSB0aGlzLmdldEZvbGRXaWRnZXRSYW5nZShzZXNzaW9uLCBcImFsbFwiLCByb3cpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoc3ViUmFuZ2UpIHtcbiAgICAgICAgICAgICAgICBpZiAoc3ViUmFuZ2Uuc3RhcnQucm93IDw9IHN0YXJ0Um93KSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3ViUmFuZ2UuaXNNdWx0aUxpbmUoKSkge1xuICAgICAgICAgICAgICAgICAgICByb3cgPSBzdWJSYW5nZS5lbmQucm93O1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhcnRJbmRlbnQgPT0gaW5kZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVuZFJvdyA9IHJvdztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShzdGFydFJvdywgc3RhcnRDb2x1bW4sIGVuZFJvdywgc2Vzc2lvbi5nZXRMaW5lKGVuZFJvdykubGVuZ3RoKTtcbiAgICB9O1xuICAgIFxuICAgIC8qKlxuICAgICAqIGdldHMgY29tbWVudCByZWdpb24gYmxvY2sgd2l0aCBlbmQgcmVnaW9uIGFzc3VtZWQgdG8gYmUgc3RhcnQgb2YgY29tbWVudCBpbiBhbnkgY3N0eWxlIG1vZGUgb3IgU1FMIG1vZGUgKC0tKSB3aGljaCBpbmhlcml0cyBmcm9tIHRoaXMuXG4gICAgICogVGhlcmUgbWF5IG9wdGlvbmFsbHkgYmUgYSBwb3VuZCBzeW1ib2wgYmVmb3JlIHRoZSByZWdpb24vZW5kcmVnaW9uIHN0YXRlbWVudFxuICAgICAqL1xuICAgIHRoaXMuZ2V0Q29tbWVudFJlZ2lvbkJsb2NrID0gZnVuY3Rpb24oc2Vzc2lvbiwgbGluZSwgcm93KSB7XG4gICAgICAgIHZhciBzdGFydENvbHVtbiA9IGxpbmUuc2VhcmNoKC9cXHMqJC8pO1xuICAgICAgICB2YXIgbWF4Um93ID0gc2Vzc2lvbi5nZXRMZW5ndGgoKTtcbiAgICAgICAgdmFyIHN0YXJ0Um93ID0gcm93O1xuICAgICAgICBcbiAgICAgICAgdmFyIHJlID0gL15cXHMqKD86XFwvXFwqfFxcL1xcL3wtLSkjPyhlbmQpP3JlZ2lvblxcYi87XG4gICAgICAgIHZhciBkZXB0aCA9IDE7XG4gICAgICAgIHdoaWxlICgrK3JvdyA8IG1heFJvdykge1xuICAgICAgICAgICAgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICAgICAgdmFyIG0gPSByZS5leGVjKGxpbmUpO1xuICAgICAgICAgICAgaWYgKCFtKSBjb250aW51ZTtcbiAgICAgICAgICAgIGlmIChtWzFdKSBkZXB0aC0tO1xuICAgICAgICAgICAgZWxzZSBkZXB0aCsrO1xuXG4gICAgICAgICAgICBpZiAoIWRlcHRoKSBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBlbmRSb3cgPSByb3c7XG4gICAgICAgIGlmIChlbmRSb3cgPiBzdGFydFJvdykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShzdGFydFJvdywgc3RhcnRDb2x1bW4sIGVuZFJvdywgbGluZS5sZW5ndGgpO1xuICAgICAgICB9XG4gICAgfTtcblxufSkuY2FsbChGb2xkTW9kZS5wcm90b3R5cGUpO1xuIiwiLypcbiAgVEhJUyBGSUxFIFdBUyBBVVRPR0VORVJBVEVEIEJZIG1vZGUudG1wbC5qc1xuKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0TW9kZSA9IHJlcXVpcmUoXCIuL3RleHRcIikuTW9kZTtcbnZhciBQaWdIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3BpZ19oaWdobGlnaHRfcnVsZXNcIikuUGlnSGlnaGxpZ2h0UnVsZXM7XG4vLyBUT0RPOiBwaWNrIGFwcHJvcHJpYXRlIGZvbGQgbW9kZVxudmFyIEZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZGluZy9jc3R5bGVcIikuRm9sZE1vZGU7XG5cbnZhciBNb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5IaWdobGlnaHRSdWxlcyA9IFBpZ0hpZ2hsaWdodFJ1bGVzO1xuICAgIHRoaXMuZm9sZGluZ1J1bGVzID0gbmV3IEZvbGRNb2RlKCk7XG59O1xub29wLmluaGVyaXRzKE1vZGUsIFRleHRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuICAgIHRoaXMubGluZUNvbW1lbnRTdGFydCA9IFwiLS1cIjtcbiAgICB0aGlzLmJsb2NrQ29tbWVudCA9IHtzdGFydDogXCIvKlwiLCBlbmQ6IFwiKi9cIn07XG4gICAgLy8gRXh0cmEgbG9naWMgZ29lcyBoZXJlLlxuICAgIHRoaXMuJGlkID0gXCJhY2UvbW9kZS9waWdcIjtcbn0pLmNhbGwoTW9kZS5wcm90b3R5cGUpO1xuXG5leHBvcnRzLk1vZGUgPSBNb2RlO1xuIiwiLyogVGhpcyBmaWxlIHdhcyBhdXRvZ2VuZXJhdGVkIGZyb20gUGlnLnRtTGFuZ3VhZ2UgKHV1aWQ6ICkgKi9cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBJVCBNSUdIVCBOT1QgQkUgUEVSRkVDVCAuLi5CdXQgaXQncyBhIGdvb2Qgc3RhcnQgZnJvbSBhbiBleGlzdGluZyAqLnRtbGFuZ3VhZ2UgZmlsZS4gKlxuICogZmlsZVR5cGVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcblxudmFyIFBpZ0hpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24oKSB7XG4gICAgLy8gcmVnZXhwIG11c3Qgbm90IGhhdmUgY2FwdHVyaW5nIHBhcmVudGhlc2VzLiBVc2UgKD86KSBpbnN0ZWFkLlxuICAgIC8vIHJlZ2V4cHMgYXJlIG9yZGVyZWQgLT4gdGhlIGZpcnN0IG1hdGNoIGlzIHVzZWRcblxuICAgIHRoaXMuJHJ1bGVzID0ge1xuICAgICAgICBzdGFydDogW3tcbiAgICAgICAgICAgIHRva2VuOiBcImNvbW1lbnQuYmxvY2sucGlnXCIsXG4gICAgICAgICAgICByZWdleDogL1xcL1xcKi8sXG4gICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuOiBcImNvbW1lbnQuYmxvY2sucGlnXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IC9cXCpcXC8vLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwiY29tbWVudC5ibG9jay5waWdcIlxuICAgICAgICAgICAgfV1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwiY29tbWVudC5saW5lLmRvdWJsZS1kYXNoLmFzY2lpZG9jXCIsXG4gICAgICAgICAgICByZWdleDogLy0tLiokL1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJrZXl3b3JkLmNvbnRyb2wucGlnXCIsXG4gICAgICAgICAgICByZWdleDogL1xcYig/OkFTU0VSVHxMT0FEfFNUT1JFfERVTVB8RklMVEVSfERJU1RJTkNUfEZPUkVBQ0h8R0VORVJBVEV8U1RSRUFNfEpPSU58Q09HUk9VUHxHUk9VUHxDUk9TU3xPUkRFUnxMSU1JVHxVTklPTnxTUExJVHxERVNDUklCRXxFWFBMQUlOfElMTFVTVFJBVEV8QVN8Qll8SU5UT3xVU0lOR3xMSU1JVHxQQVJBTExFTHxPVVRFUnxJTk5FUnxERUZBVUxUfExFRlR8U0FNUExFfFJBTkt8Q1VCRXxBTEx8S0lMTHxRVUlUfE1BUFJFRFVDRXxBU0N8REVTQ3xUSFJPVUdIfFNISVB8Q0FDSEV8REVDTEFSRXxDQVNFfFdIRU58VEhFTnxFTkR8SU58UEFSVElUSU9OfEZVTEx8SU1QT1JUfElGfE9OU0NIRU1BfElOUFVUfE9VVFBVVClcXGIvLFxuICAgICAgICAgICAgY2FzZUluc2Vuc2l0aXZlOiB0cnVlXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInN0b3JhZ2UuZGF0YXR5cGVzLnBpZ1wiLFxuICAgICAgICAgICAgcmVnZXg6IC9cXGIoPzppbnR8bG9uZ3xmbG9hdHxkb3VibGV8Y2hhcmFycmF5fGJ5dGVhcnJheXxib29sZWFufGRhdGV0aW1lfGJpZ2ludGVnZXJ8YmlnZGVjaW1hbHx0dXBsZXxiYWd8bWFwKVxcYi8sXG4gICAgICAgICAgICBjYXNlSW5zZW5zaXRpdmU6IHRydWVcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwic3VwcG9ydC5mdW5jdGlvbi5zdG9yYWdlLnBpZ1wiLFxuICAgICAgICAgICAgcmVnZXg6IC9cXGIoPzpQaWdTdG9yYWdlfEJpblN0b3JhZ2V8QmluYXJ5U3RvcmFnZXxQaWdEdW1wfEhCYXNlU3RvcmFnZXxKc29uTG9hZGVyfEpzb25TdG9yYWdlfEF2cm9TdG9yYWdlfFRleHRMb2FkZXJ8UGlnU3RyZWFtaW5nfFRyZXZuaVN0b3JhZ2V8QWNjdW11bG9TdG9yYWdlKVxcYi9cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwic3VwcG9ydC5mdW5jdGlvbi51ZGYucGlnXCIsXG4gICAgICAgICAgICByZWdleDogL1xcYig/OkRJRkZ8VE9CQUd8VE9NQVB8VE9QfFRPVFVQTEV8UkFORE9NfEZMQVRURU58ZmxhdHRlbnxDVUJFfFJPTExVUHxJc0VtcHR5fEFSSVRZfFBsdWNrVHVwbGV8U1VCVFJBQ1R8QmFnVG9TdHJpbmcpXFxiL1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJzdXBwb3J0LmZ1bmN0aW9uLnVkZi5tYXRoLnBpZ1wiLFxuICAgICAgICAgICAgcmVnZXg6IC9cXGIoPzpBQlN8QUNPU3xBU0lOfEFUQU58Q0JSVHxDRUlMfENPU3xDT1NIfEVYUHxGTE9PUnxMT0d8TE9HMTB8Uk9VTkR8Uk9VTkRfVE98U0lOfFNJTkh8U1FSVHxUQU58VEFOSHxBVkd8Q09VTlR8Q09VTlRfU1RBUnxNQVh8TUlOfFNVTXxDT1J8Q09WKVxcYi9cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwic3VwcG9ydC5mdW5jdGlvbi51ZGYuc3RyaW5nLnBpZ1wiLFxuICAgICAgICAgICAgcmVnZXg6IC9cXGIoPzpDT05DQVR8SU5ERVhPRnxMQVNUX0lOREVYX09GfExDRklSU1R8TE9XRVJ8UkVHRVhfRVhUUkFDVHxSRUdFWF9FWFRSQUNUX0FMTHxSRVBMQUNFfFNJWkV8U1RSU1BMSVR8U1VCU1RSSU5HfFRPS0VOSVpFfFRSSU18VUNGSVJTVHxVUFBFUnxMVFJJTXxSVFJJTXxFTkRTV0lUSHxTVEFSVFNXSVRIfFRSSU0pXFxiL1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJzdXBwb3J0LmZ1bmN0aW9uLnVkZi5kYXRldGltZS5waWdcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXFxiKD86QWRkRHVyYXRpb258Q3VycmVudFRpbWV8RGF5c0JldHdlZW58R2V0RGF5fEdldEhvdXJ8R2V0TWlsbGlTZWNvbmR8R2V0TWludXRlfEdldE1vbnRofEdldFNlY29uZHxHZXRXZWVrfEdldFdlZWtZZWFyfEdldFllYXJ8SG91cnNCZXR3ZWVufE1pbGxpU2Vjb25kc0JldHdlZW58TWludXRlc0JldHdlZW58TW9udGhzQmV0d2VlbnxTZWNvbmRzQmV0d2VlbnxTdWJ0cmFjdER1cmF0aW9ufFRvRGF0ZXxXZWVrc0JldHdlZW58WWVhcnNCZXR3ZWVufFRvTWlsbGlTZWNvbmRzfFRvU3RyaW5nfFRvVW5peFRpbWUpXFxiL1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJzdXBwb3J0LmZ1bmN0aW9uLmNvbW1hbmQucGlnXCIsXG4gICAgICAgICAgICByZWdleDogL1xcYig/OmNhdHxjZHxjb3B5RnJvbUxvY2FsfGNvcHlUb0xvY2FsfGNwfGxzfG1rZGlyfG12fHB3ZHxybSlcXGIvXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInZhcmlhYmxlLnBpZ1wiLFxuICAgICAgICAgICAgcmVnZXg6IC9cXCRbYV96QS1aMC05X10rL1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5sYW5ndWFnZS5waWdcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXFxiKD86TlVMTHx0cnVlfGZhbHNlfHN0ZGlufHN0ZG91dHxzdGRlcnIpXFxiLyxcbiAgICAgICAgICAgIGNhc2VJbnNlbnNpdGl2ZTogdHJ1ZVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5udW1lcmljLnBpZ1wiLFxuICAgICAgICAgICAgcmVnZXg6IC9cXGJcXGQrKD86XFwuXFxkKyk/XFxiL1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJrZXl3b3JkLm9wZXJhdG9yLmNvbXBhcmlzb24ucGlnXCIsXG4gICAgICAgICAgICByZWdleDogLyE9fD09fDx8Pnw8PXw+PXxcXGIoPzpNQVRDSEVTfElTfE9SfEFORHxOT1QpXFxiLyxcbiAgICAgICAgICAgIGNhc2VJbnNlbnNpdGl2ZTogdHJ1ZVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJrZXl3b3JkLm9wZXJhdG9yLmFyaXRobWV0aWMucGlnXCIsXG4gICAgICAgICAgICByZWdleDogL1xcK3xcXC18XFwqfFxcL3xcXCV8XFw/fDp8Ojp8XFwuXFwufCMvXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInN0cmluZy5xdW90ZWQuZG91YmxlLnBpZ1wiLFxuICAgICAgICAgICAgcmVnZXg6IC9cIi8sXG4gICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInN0cmluZy5xdW90ZWQuZG91YmxlLnBpZ1wiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvXCIvLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5jaGFyYWN0ZXIuZXNjYXBlLnBpZ1wiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvXFxcXC4vXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInN0cmluZy5xdW90ZWQuZG91YmxlLnBpZ1wiXG4gICAgICAgICAgICB9XVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJzdHJpbmcucXVvdGVkLnNpbmdsZS5waWdcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvJy8sXG4gICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInN0cmluZy5xdW90ZWQuc2luZ2xlLnBpZ1wiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvJy8sXG4gICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50LmNoYXJhY3Rlci5lc2NhcGUucGlnXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IC9cXFxcLi9cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwic3RyaW5nLnF1b3RlZC5zaW5nbGUucGlnXCJcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRvZG86IHtcbiAgICAgICAgICAgICAgICB0b2tlbjogW1xuICAgICAgICAgICAgICAgICAgICBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgXCJrZXl3b3JkLnBhcmFtZXRlci5waWdcIixcbiAgICAgICAgICAgICAgICAgICAgXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIFwic3RvcmFnZS50eXBlLnBhcmFtZXRlci5waWdcIlxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgcmVnZXg6IC9eKFxccyopKHNldCkoXFxzKykoXFxTKykvLFxuICAgICAgICAgICAgICAgIGNhc2VJbnNlbnNpdGl2ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAvJC8sXG4gICAgICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGluY2x1ZGU6IFwiJHNlbGZcIlxuICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBbXG4gICAgICAgICAgICAgICAgXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgXCJrZXl3b3JkLmFsaWFzLnBpZ1wiLFxuICAgICAgICAgICAgICAgIFwidGV4dFwiLFxuICAgICAgICAgICAgICAgIFwic3RvcmFnZS50eXBlLmFsaWFzLnBpZ1wiXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgcmVnZXg6IC8oXFxzKikoREVGSU5FfERFQ0xBUkV8UkVHSVNURVIpKFxccyspKFxcUyspLyxcbiAgICAgICAgICAgIGNhc2VJbnNlbnNpdGl2ZTogdHJ1ZSxcbiAgICAgICAgICAgIHB1c2g6IFt7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvOz8kLyxcbiAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICB9XVxuICAgICAgICB9XVxuICAgIH07XG4gICAgXG4gICAgdGhpcy5ub3JtYWxpemVSdWxlcygpO1xufTtcblxuUGlnSGlnaGxpZ2h0UnVsZXMubWV0YURhdGEgPSB7XG4gICAgZmlsZVR5cGVzOiBbXCJwaWdcIl0sXG4gICAgbmFtZTogXCJQaWdcIixcbiAgICBzY29wZU5hbWU6IFwic291cmNlLnBpZ1wiXG59O1xuXG5cbm9vcC5pbmhlcml0cyhQaWdIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuZXhwb3J0cy5QaWdIaWdobGlnaHRSdWxlcyA9IFBpZ0hpZ2hsaWdodFJ1bGVzO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9