"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[3114],{

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

/***/ 53114:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/*
  THIS FILE WAS AUTOGENERATED BY mode.tmpl.js
*/



var oop = __webpack_require__(89359);
var TextMode = (__webpack_require__(98030).Mode);
var PigHighlightRules = (__webpack_require__(53574)/* .PigHighlightRules */ .S);
// TODO: pick appropriate fold mode
var FoldMode = (__webpack_require__(12764)/* .FoldMode */ .Z);

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

/***/ 53574:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* This file was autogenerated from Pig.tmLanguage (uuid: ) */
/****************************************************************************************
 * IT MIGHT NOT BE PERFECT ...But it's a good start from an existing *.tmlanguage file. *
 * fileTypes                                                                            *
 ****************************************************************************************/



var oop = __webpack_require__(89359);
var TextHighlightRules = (__webpack_require__(28053)/* .TextHighlightRules */ .K);

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

exports.S = PigHighlightRules;


/***/ })

}]);
//# sourceMappingURL=bundle.3114.js.map