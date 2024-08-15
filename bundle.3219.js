"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[3219],{

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

/***/ 19437:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var BaseFoldMode = (__webpack_require__(93887)/* .FoldMode */ .l);

var FoldMode = exports.l = function() {};

oop.inherits(FoldMode, BaseFoldMode);

(function() {
    /** 
     * Inheriting cstyle folding because it handles the region comment folding 
     * and special block comment folding appropriately.
     * 
     * Cstyle's getCommentRegionBlock() contains the sql comment characters '--' for end region block.
     */
    

}).call(FoldMode.prototype);


/***/ }),

/***/ 73219:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2012, Ajax.org B.V.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of Ajax.org B.V. nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL AJAX.ORG B.V. BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * ***** END LICENSE BLOCK ***** */

/*
  THIS FILE WAS AUTOGENERATED BY mode.tmpl.js
*/



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var PLSqlHighlightRules = (__webpack_require__(66200)/* .plsqlHighlightRules */ .g);
var FoldMode = (__webpack_require__(19437)/* .FoldMode */ .l);

var Mode = function() {
    this.HighlightRules = PLSqlHighlightRules;
    this.foldingRules = new FoldMode();
};
oop.inherits(Mode, TextMode);

(function() {
    this.lineCommentStart = "--";
    this.blockComment = {start: "/*", end: "*/"};

    this.$id = "ace/mode/plsql";
}).call(Mode.prototype);

exports.Mode = Mode;

/***/ }),

/***/ 66200:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2012, Ajax.org B.V.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of Ajax.org B.V. nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL AJAX.ORG B.V. BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * ***** END LICENSE BLOCK ***** */

/* This file was autogenerated from  (uuid: ) */
/****************************************************************************************
 * IT MIGHT NOT BE PERFECT ...But it's a good start from an existing *.tmlanguage file. *
 * fileTypes                                                                            *
 ****************************************************************************************/



var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

var plsqlHighlightRules = function() {
    var keywords = (
        "all|alter|and|any|array|arrow|as|asc|at|begin|between|by|case|check|clusters|cluster|colauth|columns|compress|connect|crash|create|cross|current|database|declare|default|delete|desc|distinct|drop|else|end|exception|exclusive|exists|fetch|form|for|foreign|from|goto|grant|group|having|identified|if|in|inner|indexes|index|insert|intersect|into|is|join|key|left|like|lock|minus|mode|natural|nocompress|not|nowait|null|of|on|option|or|order,overlaps|outer|primary|prior|procedure|public|range|record|references|resource|revoke|right|select|share|size|sql|start|subtype|tabauth|table|then|to|type|union|unique|update|use|values|view|views|when|where|with"
    );

    var builtinConstants = (
        "true|false"
    );

    var builtinFunctions = (
        "abs|acos|add_months|ascii|asciistr|asin|atan|atan2|avg|bfilename|bin_to_num|bitand|cardinality|case|cast|ceil|chartorowid|chr|coalesce|compose|concat|convert|corr|cos|cosh|count|covar_pop|covar_samp|cume_dist|current_date|current_timestamp|dbtimezone|decode|decompose|dense_rank|dump|empty_blob|empty_clob|exp|extract|first_value|floor|from_tz|greatest|group_id|hextoraw|initcap|instr|instr2|instr4|instrb|instrc|lag|last_day|last_value|lead|least|length|length2|length4|lengthb|lengthc|listagg|ln|lnnvl|localtimestamp|log|lower|lpad|ltrim|max|median|min|mod|months_between|nanvl|nchr|new_time|next_day|nth_value|nullif|numtodsinterval|numtoyminterval|nvl|nvl2|power|rank|rawtohex|regexp_count|regexp_instr|regexp_replace|regexp_substr|remainder|replace|round|rownum|rpad|rtrim|sessiontimezone|sign|sin|sinh|soundex|sqrt|stddev|substr|sum|sys_context|sysdate|systimestamp|tan|tanh|to_char|to_clob|to_date|to_dsinterval|to_lob|to_multi_byte|to_nclob|to_number|to_single_byte|to_timestamp|to_timestamp_tz|to_yminterval|translate|trim|trunc|tz_offset|uid|upper|user|userenv|var_pop|var_samp|variance|vsize"
    );

    var dataTypes = (
        "char|nchar|nvarchar2|varchar2|long|raw|" +
        "number|numeric|float|dec|decimal|integer|int|smallint|real|double|precision|" +
        "date|timestamp|interval|year|day|" +
        "bfile|blob|clob|nclob|" +
        "rowid|urowid"
    );
    
    var keywordMapper = this.createKeywordMapper({
        "support.function": builtinFunctions,
        "keyword": keywords,
        "constant.language": builtinConstants,
        "storage.type": dataTypes
    }, "identifier", true);

    this.$rules = {
        "start" : [ {
            token : "comment",
            regex : "--.*$"
        },  {
            token : "comment",
            start : "/\\*",
            end : "\\*/"
        }, {
            token : "string",           // " string
            regex : '".*?"'
        }, {
            token : "string",           // ' string
            regex : "'.*?'"
        }, {
            token : "constant.numeric", // float
            regex : "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
        }, {
            token : keywordMapper,
            regex : "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
        }, {
            token : "keyword.operator",
            regex : "\\+|\\-|\\/|\\/\\/|%|<@>|@>|<@|&|\\^|~|<|>|<=|=>|==|!=|<>|="
        }, {
            token : "paren.lparen",
            regex : "[\\(]"
        }, {
            token : "paren.rparen",
            regex : "[\\)]"
        }, {
            token : "text",
            regex : "\\s+"
        } ]
    };
    
    this.normalizeRules();
};

oop.inherits(plsqlHighlightRules, TextHighlightRules);

exports.g = plsqlHighlightRules;

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsU0FBMkIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2ZvbGRpbmcvY3N0eWxlLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvZm9sZGluZy9zcWwuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9wbHNxbC5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL3Bsc3FsX2hpZ2hsaWdodF9ydWxlcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi8uLi9saWIvb29wXCIpO1xudmFyIFJhbmdlID0gcmVxdWlyZShcIi4uLy4uL3JhbmdlXCIpLlJhbmdlO1xudmFyIEJhc2VGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRfbW9kZVwiKS5Gb2xkTW9kZTtcblxudmFyIEZvbGRNb2RlID0gZXhwb3J0cy5Gb2xkTW9kZSA9IGZ1bmN0aW9uKGNvbW1lbnRSZWdleCkge1xuICAgIGlmIChjb21tZW50UmVnZXgpIHtcbiAgICAgICAgdGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIgPSBuZXcgUmVnRXhwKFxuICAgICAgICAgICAgdGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIuc291cmNlLnJlcGxhY2UoL1xcfFtefF0qPyQvLCBcInxcIiArIGNvbW1lbnRSZWdleC5zdGFydClcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5mb2xkaW5nU3RvcE1hcmtlciA9IG5ldyBSZWdFeHAoXG4gICAgICAgICAgICB0aGlzLmZvbGRpbmdTdG9wTWFya2VyLnNvdXJjZS5yZXBsYWNlKC9cXHxbXnxdKj8kLywgXCJ8XCIgKyBjb21tZW50UmVnZXguZW5kKVxuICAgICAgICApO1xuICAgIH1cbn07XG5vb3AuaW5oZXJpdHMoRm9sZE1vZGUsIEJhc2VGb2xkTW9kZSk7XG5cbihmdW5jdGlvbigpIHtcbiAgICBcbiAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlciA9IC8oW1xce1xcW1xcKF0pW15cXH1cXF1cXCldKiR8XlxccyooXFwvXFwqKS87XG4gICAgdGhpcy5mb2xkaW5nU3RvcE1hcmtlciA9IC9eW15cXFtcXHtcXChdKihbXFx9XFxdXFwpXSl8XltcXHNcXCpdKihcXCpcXC8pLztcbiAgICB0aGlzLnNpbmdsZUxpbmVCbG9ja0NvbW1lbnRSZT0gL15cXHMqKFxcL1xcKikuKlxcKlxcL1xccyokLztcbiAgICB0aGlzLnRyaXBsZVN0YXJCbG9ja0NvbW1lbnRSZSA9IC9eXFxzKihcXC9cXCpcXCpcXCopLipcXCpcXC9cXHMqJC87XG4gICAgdGhpcy5zdGFydFJlZ2lvblJlID0gL15cXHMqKFxcL1xcKnxcXC9cXC8pIz9yZWdpb25cXGIvO1xuICAgIFxuICAgIC8vcHJldmVudCBuYW1pbmcgY29uZmxpY3Qgd2l0aCBhbnkgbW9kZXMgdGhhdCBpbmhlcml0IGZyb20gY3N0eWxlIGFuZCBvdmVycmlkZSB0aGlzIChsaWtlIGNzaGFycClcbiAgICB0aGlzLl9nZXRGb2xkV2lkZ2V0QmFzZSA9IHRoaXMuZ2V0Rm9sZFdpZGdldDtcbiAgICBcbiAgICAvKipcbiAgICAgKiBHZXRzIGZvbGQgd2lkZ2V0IHdpdGggc29tZSBub24tc3RhbmRhcmQgZXh0cmFzOlxuICAgICAqXG4gICAgICogQGV4YW1wbGUgbGluZUNvbW1lbnRSZWdpb25TdGFydFxuICAgICAqICAgICAgLy8jcmVnaW9uIFtvcHRpb25hbCBkZXNjcmlwdGlvbl1cbiAgICAgKlxuICAgICAqIEBleGFtcGxlIGJsb2NrQ29tbWVudFJlZ2lvblN0YXJ0XG4gICAgICogICAgICAvKiNyZWdpb24gW29wdGlvbmFsIGRlc2NyaXB0aW9uXSAqWy9dXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSB0cmlwbGVTdGFyRm9sZGluZ1NlY3Rpb25cbiAgICAgKiAgICAgIC8qKiogdGhpcyBmb2xkcyBldmVuIHRob3VnaCAxIGxpbmUgYmVjYXVzZSBpdCBoYXMgMyBzdGFycyAqKipbL11cbiAgICAgKiBcbiAgICAgKiBAbm90ZSB0aGUgcG91bmQgc3ltYm9sIGZvciByZWdpb24gdGFncyBpcyBvcHRpb25hbFxuICAgICAqL1xuICAgIHRoaXMuZ2V0Rm9sZFdpZGdldCA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgXG4gICAgICAgIGlmICh0aGlzLnNpbmdsZUxpbmVCbG9ja0NvbW1lbnRSZS50ZXN0KGxpbmUpKSB7XG4gICAgICAgICAgICAvLyBObyB3aWRnZXQgZm9yIHNpbmdsZSBsaW5lIGJsb2NrIGNvbW1lbnQgdW5sZXNzIHJlZ2lvbiBvciB0cmlwbGUgc3RhclxuICAgICAgICAgICAgaWYgKCF0aGlzLnN0YXJ0UmVnaW9uUmUudGVzdChsaW5lKSAmJiAhdGhpcy50cmlwbGVTdGFyQmxvY2tDb21tZW50UmUudGVzdChsaW5lKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICB2YXIgZncgPSB0aGlzLl9nZXRGb2xkV2lkZ2V0QmFzZShzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdyk7XG4gICAgXG4gICAgICAgIGlmICghZncgJiYgdGhpcy5zdGFydFJlZ2lvblJlLnRlc3QobGluZSkpXG4gICAgICAgICAgICByZXR1cm4gXCJzdGFydFwiOyAvLyBsaW5lQ29tbWVudFJlZ2lvblN0YXJ0XG4gICAgXG4gICAgICAgIHJldHVybiBmdztcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0UmFuZ2UgPSBmdW5jdGlvbihzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdywgZm9yY2VNdWx0aWxpbmUpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLnN0YXJ0UmVnaW9uUmUudGVzdChsaW5lKSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldENvbW1lbnRSZWdpb25CbG9jayhzZXNzaW9uLCBsaW5lLCByb3cpO1xuICAgICAgICBcbiAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCh0aGlzLmZvbGRpbmdTdGFydE1hcmtlcik7XG4gICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgdmFyIGkgPSBtYXRjaC5pbmRleDtcblxuICAgICAgICAgICAgaWYgKG1hdGNoWzFdKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm9wZW5pbmdCcmFja2V0QmxvY2soc2Vzc2lvbiwgbWF0Y2hbMV0sIHJvdywgaSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgcmFuZ2UgPSBzZXNzaW9uLmdldENvbW1lbnRGb2xkUmFuZ2Uocm93LCBpICsgbWF0Y2hbMF0ubGVuZ3RoLCAxKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHJhbmdlICYmICFyYW5nZS5pc011bHRpTGluZSgpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZvcmNlTXVsdGlsaW5lKSB7XG4gICAgICAgICAgICAgICAgICAgIHJhbmdlID0gdGhpcy5nZXRTZWN0aW9uUmFuZ2Uoc2Vzc2lvbiwgcm93KTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZvbGRTdHlsZSAhPSBcImFsbFwiKVxuICAgICAgICAgICAgICAgICAgICByYW5nZSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiByYW5nZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmb2xkU3R5bGUgPT09IFwibWFya2JlZ2luXCIpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCh0aGlzLmZvbGRpbmdTdG9wTWFya2VyKTtcbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICB2YXIgaSA9IG1hdGNoLmluZGV4ICsgbWF0Y2hbMF0ubGVuZ3RoO1xuXG4gICAgICAgICAgICBpZiAobWF0Y2hbMV0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2xvc2luZ0JyYWNrZXRCbG9jayhzZXNzaW9uLCBtYXRjaFsxXSwgcm93LCBpKTtcblxuICAgICAgICAgICAgcmV0dXJuIHNlc3Npb24uZ2V0Q29tbWVudEZvbGRSYW5nZShyb3csIGksIC0xKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgXG4gICAgdGhpcy5nZXRTZWN0aW9uUmFuZ2UgPSBmdW5jdGlvbihzZXNzaW9uLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgdmFyIHN0YXJ0SW5kZW50ID0gbGluZS5zZWFyY2goL1xcUy8pO1xuICAgICAgICB2YXIgc3RhcnRSb3cgPSByb3c7XG4gICAgICAgIHZhciBzdGFydENvbHVtbiA9IGxpbmUubGVuZ3RoO1xuICAgICAgICByb3cgPSByb3cgKyAxO1xuICAgICAgICB2YXIgZW5kUm93ID0gcm93O1xuICAgICAgICB2YXIgbWF4Um93ID0gc2Vzc2lvbi5nZXRMZW5ndGgoKTtcbiAgICAgICAgd2hpbGUgKCsrcm93IDwgbWF4Um93KSB7XG4gICAgICAgICAgICBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgICAgICB2YXIgaW5kZW50ID0gbGluZS5zZWFyY2goL1xcUy8pO1xuICAgICAgICAgICAgaWYgKGluZGVudCA9PT0gLTEpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICBpZiAgKHN0YXJ0SW5kZW50ID4gaW5kZW50KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgdmFyIHN1YlJhbmdlID0gdGhpcy5nZXRGb2xkV2lkZ2V0UmFuZ2Uoc2Vzc2lvbiwgXCJhbGxcIiwgcm93KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHN1YlJhbmdlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN1YlJhbmdlLnN0YXJ0LnJvdyA8PSBzdGFydFJvdykge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN1YlJhbmdlLmlzTXVsdGlMaW5lKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcm93ID0gc3ViUmFuZ2UuZW5kLnJvdztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXJ0SW5kZW50ID09IGluZGVudCkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbmRSb3cgPSByb3c7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBuZXcgUmFuZ2Uoc3RhcnRSb3csIHN0YXJ0Q29sdW1uLCBlbmRSb3csIHNlc3Npb24uZ2V0TGluZShlbmRSb3cpLmxlbmd0aCk7XG4gICAgfTtcbiAgICBcbiAgICAvKipcbiAgICAgKiBnZXRzIGNvbW1lbnQgcmVnaW9uIGJsb2NrIHdpdGggZW5kIHJlZ2lvbiBhc3N1bWVkIHRvIGJlIHN0YXJ0IG9mIGNvbW1lbnQgaW4gYW55IGNzdHlsZSBtb2RlIG9yIFNRTCBtb2RlICgtLSkgd2hpY2ggaW5oZXJpdHMgZnJvbSB0aGlzLlxuICAgICAqIFRoZXJlIG1heSBvcHRpb25hbGx5IGJlIGEgcG91bmQgc3ltYm9sIGJlZm9yZSB0aGUgcmVnaW9uL2VuZHJlZ2lvbiBzdGF0ZW1lbnRcbiAgICAgKi9cbiAgICB0aGlzLmdldENvbW1lbnRSZWdpb25CbG9jayA9IGZ1bmN0aW9uKHNlc3Npb24sIGxpbmUsIHJvdykge1xuICAgICAgICB2YXIgc3RhcnRDb2x1bW4gPSBsaW5lLnNlYXJjaCgvXFxzKiQvKTtcbiAgICAgICAgdmFyIG1heFJvdyA9IHNlc3Npb24uZ2V0TGVuZ3RoKCk7XG4gICAgICAgIHZhciBzdGFydFJvdyA9IHJvdztcbiAgICAgICAgXG4gICAgICAgIHZhciByZSA9IC9eXFxzKig/OlxcL1xcKnxcXC9cXC98LS0pIz8oZW5kKT9yZWdpb25cXGIvO1xuICAgICAgICB2YXIgZGVwdGggPSAxO1xuICAgICAgICB3aGlsZSAoKytyb3cgPCBtYXhSb3cpIHtcbiAgICAgICAgICAgIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgICAgIHZhciBtID0gcmUuZXhlYyhsaW5lKTtcbiAgICAgICAgICAgIGlmICghbSkgY29udGludWU7XG4gICAgICAgICAgICBpZiAobVsxXSkgZGVwdGgtLTtcbiAgICAgICAgICAgIGVsc2UgZGVwdGgrKztcblxuICAgICAgICAgICAgaWYgKCFkZXB0aCkgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZW5kUm93ID0gcm93O1xuICAgICAgICBpZiAoZW5kUm93ID4gc3RhcnRSb3cpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmFuZ2Uoc3RhcnRSb3csIHN0YXJ0Q29sdW1uLCBlbmRSb3csIGxpbmUubGVuZ3RoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbn0pLmNhbGwoRm9sZE1vZGUucHJvdG90eXBlKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uLy4uL2xpYi9vb3BcIik7XG52YXIgQmFzZUZvbGRNb2RlID0gcmVxdWlyZShcIi4vY3N0eWxlXCIpLkZvbGRNb2RlO1xuXG52YXIgRm9sZE1vZGUgPSBleHBvcnRzLkZvbGRNb2RlID0gZnVuY3Rpb24oKSB7fTtcblxub29wLmluaGVyaXRzKEZvbGRNb2RlLCBCYXNlRm9sZE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgLyoqIFxuICAgICAqIEluaGVyaXRpbmcgY3N0eWxlIGZvbGRpbmcgYmVjYXVzZSBpdCBoYW5kbGVzIHRoZSByZWdpb24gY29tbWVudCBmb2xkaW5nIFxuICAgICAqIGFuZCBzcGVjaWFsIGJsb2NrIGNvbW1lbnQgZm9sZGluZyBhcHByb3ByaWF0ZWx5LlxuICAgICAqIFxuICAgICAqIENzdHlsZSdzIGdldENvbW1lbnRSZWdpb25CbG9jaygpIGNvbnRhaW5zIHRoZSBzcWwgY29tbWVudCBjaGFyYWN0ZXJzICctLScgZm9yIGVuZCByZWdpb24gYmxvY2suXG4gICAgICovXG4gICAgXG5cbn0pLmNhbGwoRm9sZE1vZGUucHJvdG90eXBlKTtcbiIsIi8qICoqKioqIEJFR0lOIExJQ0VOU0UgQkxPQ0sgKioqKipcbiAqIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSBCU0QgbGljZW5zZTpcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTIsIEFqYXgub3JnIEIuVi5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogUmVkaXN0cmlidXRpb24gYW5kIHVzZSBpbiBzb3VyY2UgYW5kIGJpbmFyeSBmb3Jtcywgd2l0aCBvciB3aXRob3V0XG4gKiBtb2RpZmljYXRpb24sIGFyZSBwZXJtaXR0ZWQgcHJvdmlkZWQgdGhhdCB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIG1ldDpcbiAqICAgICAqIFJlZGlzdHJpYnV0aW9ucyBvZiBzb3VyY2UgY29kZSBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0XG4gKiAgICAgICBub3RpY2UsIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIuXG4gKiAgICAgKiBSZWRpc3RyaWJ1dGlvbnMgaW4gYmluYXJ5IGZvcm0gbXVzdCByZXByb2R1Y2UgdGhlIGFib3ZlIGNvcHlyaWdodFxuICogICAgICAgbm90aWNlLCB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZVxuICogICAgICAgZG9jdW1lbnRhdGlvbiBhbmQvb3Igb3RoZXIgbWF0ZXJpYWxzIHByb3ZpZGVkIHdpdGggdGhlIGRpc3RyaWJ1dGlvbi5cbiAqICAgICAqIE5laXRoZXIgdGhlIG5hbWUgb2YgQWpheC5vcmcgQi5WLiBub3IgdGhlXG4gKiAgICAgICBuYW1lcyBvZiBpdHMgY29udHJpYnV0b3JzIG1heSBiZSB1c2VkIHRvIGVuZG9yc2Ugb3IgcHJvbW90ZSBwcm9kdWN0c1xuICogICAgICAgZGVyaXZlZCBmcm9tIHRoaXMgc29mdHdhcmUgd2l0aG91dCBzcGVjaWZpYyBwcmlvciB3cml0dGVuIHBlcm1pc3Npb24uXG4gKlxuICogVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCIgQU5EXG4gKiBBTlkgRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRFxuICogV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRVxuICogRElTQ0xBSU1FRC4gSU4gTk8gRVZFTlQgU0hBTEwgQUpBWC5PUkcgQi5WLiBCRSBMSUFCTEUgRk9SIEFOWVxuICogRElSRUNULCBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVNcbiAqIChJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0YgU1VCU1RJVFVURSBHT09EUyBPUiBTRVJWSUNFUztcbiAqIExPU1MgT0YgVVNFLCBEQVRBLCBPUiBQUk9GSVRTOyBPUiBCVVNJTkVTUyBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIEFORFxuICogT04gQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlRcbiAqIChJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpIEFSSVNJTkcgSU4gQU5ZIFdBWSBPVVQgT0YgVEhFIFVTRSBPRiBUSElTXG4gKiBTT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRSBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS5cbiAqXG4gKiAqKioqKiBFTkQgTElDRU5TRSBCTE9DSyAqKioqKiAqL1xuXG4vKlxuICBUSElTIEZJTEUgV0FTIEFVVE9HRU5FUkFURUQgQlkgbW9kZS50bXBsLmpzXG4qL1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRNb2RlID0gcmVxdWlyZShcIi4vdGV4dFwiKS5Nb2RlO1xudmFyIFBMU3FsSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9wbHNxbF9oaWdobGlnaHRfcnVsZXNcIikucGxzcWxIaWdobGlnaHRSdWxlcztcbnZhciBGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRpbmcvc3FsXCIpLkZvbGRNb2RlO1xuXG52YXIgTW9kZSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuSGlnaGxpZ2h0UnVsZXMgPSBQTFNxbEhpZ2hsaWdodFJ1bGVzO1xuICAgIHRoaXMuZm9sZGluZ1J1bGVzID0gbmV3IEZvbGRNb2RlKCk7XG59O1xub29wLmluaGVyaXRzKE1vZGUsIFRleHRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuICAgIHRoaXMubGluZUNvbW1lbnRTdGFydCA9IFwiLS1cIjtcbiAgICB0aGlzLmJsb2NrQ29tbWVudCA9IHtzdGFydDogXCIvKlwiLCBlbmQ6IFwiKi9cIn07XG5cbiAgICB0aGlzLiRpZCA9IFwiYWNlL21vZGUvcGxzcWxcIjtcbn0pLmNhbGwoTW9kZS5wcm90b3R5cGUpO1xuXG5leHBvcnRzLk1vZGUgPSBNb2RlOyIsIi8qICoqKioqIEJFR0lOIExJQ0VOU0UgQkxPQ0sgKioqKipcbiAqIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSBCU0QgbGljZW5zZTpcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTIsIEFqYXgub3JnIEIuVi5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogUmVkaXN0cmlidXRpb24gYW5kIHVzZSBpbiBzb3VyY2UgYW5kIGJpbmFyeSBmb3Jtcywgd2l0aCBvciB3aXRob3V0XG4gKiBtb2RpZmljYXRpb24sIGFyZSBwZXJtaXR0ZWQgcHJvdmlkZWQgdGhhdCB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIG1ldDpcbiAqICAgICAqIFJlZGlzdHJpYnV0aW9ucyBvZiBzb3VyY2UgY29kZSBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0XG4gKiAgICAgICBub3RpY2UsIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIuXG4gKiAgICAgKiBSZWRpc3RyaWJ1dGlvbnMgaW4gYmluYXJ5IGZvcm0gbXVzdCByZXByb2R1Y2UgdGhlIGFib3ZlIGNvcHlyaWdodFxuICogICAgICAgbm90aWNlLCB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZVxuICogICAgICAgZG9jdW1lbnRhdGlvbiBhbmQvb3Igb3RoZXIgbWF0ZXJpYWxzIHByb3ZpZGVkIHdpdGggdGhlIGRpc3RyaWJ1dGlvbi5cbiAqICAgICAqIE5laXRoZXIgdGhlIG5hbWUgb2YgQWpheC5vcmcgQi5WLiBub3IgdGhlXG4gKiAgICAgICBuYW1lcyBvZiBpdHMgY29udHJpYnV0b3JzIG1heSBiZSB1c2VkIHRvIGVuZG9yc2Ugb3IgcHJvbW90ZSBwcm9kdWN0c1xuICogICAgICAgZGVyaXZlZCBmcm9tIHRoaXMgc29mdHdhcmUgd2l0aG91dCBzcGVjaWZpYyBwcmlvciB3cml0dGVuIHBlcm1pc3Npb24uXG4gKlxuICogVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCIgQU5EXG4gKiBBTlkgRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRFxuICogV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRVxuICogRElTQ0xBSU1FRC4gSU4gTk8gRVZFTlQgU0hBTEwgQUpBWC5PUkcgQi5WLiBCRSBMSUFCTEUgRk9SIEFOWVxuICogRElSRUNULCBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVNcbiAqIChJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0YgU1VCU1RJVFVURSBHT09EUyBPUiBTRVJWSUNFUztcbiAqIExPU1MgT0YgVVNFLCBEQVRBLCBPUiBQUk9GSVRTOyBPUiBCVVNJTkVTUyBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIEFORFxuICogT04gQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlRcbiAqIChJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpIEFSSVNJTkcgSU4gQU5ZIFdBWSBPVVQgT0YgVEhFIFVTRSBPRiBUSElTXG4gKiBTT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRSBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS5cbiAqXG4gKiAqKioqKiBFTkQgTElDRU5TRSBCTE9DSyAqKioqKiAqL1xuXG4vKiBUaGlzIGZpbGUgd2FzIGF1dG9nZW5lcmF0ZWQgZnJvbSAgKHV1aWQ6ICkgKi9cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBJVCBNSUdIVCBOT1QgQkUgUEVSRkVDVCAuLi5CdXQgaXQncyBhIGdvb2Qgc3RhcnQgZnJvbSBhbiBleGlzdGluZyAqLnRtbGFuZ3VhZ2UgZmlsZS4gKlxuICogZmlsZVR5cGVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcblxudmFyIHBsc3FsSGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIga2V5d29yZHMgPSAoXG4gICAgICAgIFwiYWxsfGFsdGVyfGFuZHxhbnl8YXJyYXl8YXJyb3d8YXN8YXNjfGF0fGJlZ2lufGJldHdlZW58Ynl8Y2FzZXxjaGVja3xjbHVzdGVyc3xjbHVzdGVyfGNvbGF1dGh8Y29sdW1uc3xjb21wcmVzc3xjb25uZWN0fGNyYXNofGNyZWF0ZXxjcm9zc3xjdXJyZW50fGRhdGFiYXNlfGRlY2xhcmV8ZGVmYXVsdHxkZWxldGV8ZGVzY3xkaXN0aW5jdHxkcm9wfGVsc2V8ZW5kfGV4Y2VwdGlvbnxleGNsdXNpdmV8ZXhpc3RzfGZldGNofGZvcm18Zm9yfGZvcmVpZ258ZnJvbXxnb3RvfGdyYW50fGdyb3VwfGhhdmluZ3xpZGVudGlmaWVkfGlmfGlufGlubmVyfGluZGV4ZXN8aW5kZXh8aW5zZXJ0fGludGVyc2VjdHxpbnRvfGlzfGpvaW58a2V5fGxlZnR8bGlrZXxsb2NrfG1pbnVzfG1vZGV8bmF0dXJhbHxub2NvbXByZXNzfG5vdHxub3dhaXR8bnVsbHxvZnxvbnxvcHRpb258b3J8b3JkZXIsb3ZlcmxhcHN8b3V0ZXJ8cHJpbWFyeXxwcmlvcnxwcm9jZWR1cmV8cHVibGljfHJhbmdlfHJlY29yZHxyZWZlcmVuY2VzfHJlc291cmNlfHJldm9rZXxyaWdodHxzZWxlY3R8c2hhcmV8c2l6ZXxzcWx8c3RhcnR8c3VidHlwZXx0YWJhdXRofHRhYmxlfHRoZW58dG98dHlwZXx1bmlvbnx1bmlxdWV8dXBkYXRlfHVzZXx2YWx1ZXN8dmlld3x2aWV3c3x3aGVufHdoZXJlfHdpdGhcIlxuICAgICk7XG5cbiAgICB2YXIgYnVpbHRpbkNvbnN0YW50cyA9IChcbiAgICAgICAgXCJ0cnVlfGZhbHNlXCJcbiAgICApO1xuXG4gICAgdmFyIGJ1aWx0aW5GdW5jdGlvbnMgPSAoXG4gICAgICAgIFwiYWJzfGFjb3N8YWRkX21vbnRoc3xhc2NpaXxhc2NpaXN0cnxhc2lufGF0YW58YXRhbjJ8YXZnfGJmaWxlbmFtZXxiaW5fdG9fbnVtfGJpdGFuZHxjYXJkaW5hbGl0eXxjYXNlfGNhc3R8Y2VpbHxjaGFydG9yb3dpZHxjaHJ8Y29hbGVzY2V8Y29tcG9zZXxjb25jYXR8Y29udmVydHxjb3JyfGNvc3xjb3NofGNvdW50fGNvdmFyX3BvcHxjb3Zhcl9zYW1wfGN1bWVfZGlzdHxjdXJyZW50X2RhdGV8Y3VycmVudF90aW1lc3RhbXB8ZGJ0aW1lem9uZXxkZWNvZGV8ZGVjb21wb3NlfGRlbnNlX3Jhbmt8ZHVtcHxlbXB0eV9ibG9ifGVtcHR5X2Nsb2J8ZXhwfGV4dHJhY3R8Zmlyc3RfdmFsdWV8Zmxvb3J8ZnJvbV90enxncmVhdGVzdHxncm91cF9pZHxoZXh0b3Jhd3xpbml0Y2FwfGluc3RyfGluc3RyMnxpbnN0cjR8aW5zdHJifGluc3RyY3xsYWd8bGFzdF9kYXl8bGFzdF92YWx1ZXxsZWFkfGxlYXN0fGxlbmd0aHxsZW5ndGgyfGxlbmd0aDR8bGVuZ3RoYnxsZW5ndGhjfGxpc3RhZ2d8bG58bG5udmx8bG9jYWx0aW1lc3RhbXB8bG9nfGxvd2VyfGxwYWR8bHRyaW18bWF4fG1lZGlhbnxtaW58bW9kfG1vbnRoc19iZXR3ZWVufG5hbnZsfG5jaHJ8bmV3X3RpbWV8bmV4dF9kYXl8bnRoX3ZhbHVlfG51bGxpZnxudW10b2RzaW50ZXJ2YWx8bnVtdG95bWludGVydmFsfG52bHxudmwyfHBvd2VyfHJhbmt8cmF3dG9oZXh8cmVnZXhwX2NvdW50fHJlZ2V4cF9pbnN0cnxyZWdleHBfcmVwbGFjZXxyZWdleHBfc3Vic3RyfHJlbWFpbmRlcnxyZXBsYWNlfHJvdW5kfHJvd251bXxycGFkfHJ0cmltfHNlc3Npb250aW1lem9uZXxzaWdufHNpbnxzaW5ofHNvdW5kZXh8c3FydHxzdGRkZXZ8c3Vic3RyfHN1bXxzeXNfY29udGV4dHxzeXNkYXRlfHN5c3RpbWVzdGFtcHx0YW58dGFuaHx0b19jaGFyfHRvX2Nsb2J8dG9fZGF0ZXx0b19kc2ludGVydmFsfHRvX2xvYnx0b19tdWx0aV9ieXRlfHRvX25jbG9ifHRvX251bWJlcnx0b19zaW5nbGVfYnl0ZXx0b190aW1lc3RhbXB8dG9fdGltZXN0YW1wX3R6fHRvX3ltaW50ZXJ2YWx8dHJhbnNsYXRlfHRyaW18dHJ1bmN8dHpfb2Zmc2V0fHVpZHx1cHBlcnx1c2VyfHVzZXJlbnZ8dmFyX3BvcHx2YXJfc2FtcHx2YXJpYW5jZXx2c2l6ZVwiXG4gICAgKTtcblxuICAgIHZhciBkYXRhVHlwZXMgPSAoXG4gICAgICAgIFwiY2hhcnxuY2hhcnxudmFyY2hhcjJ8dmFyY2hhcjJ8bG9uZ3xyYXd8XCIgK1xuICAgICAgICBcIm51bWJlcnxudW1lcmljfGZsb2F0fGRlY3xkZWNpbWFsfGludGVnZXJ8aW50fHNtYWxsaW50fHJlYWx8ZG91YmxlfHByZWNpc2lvbnxcIiArXG4gICAgICAgIFwiZGF0ZXx0aW1lc3RhbXB8aW50ZXJ2YWx8eWVhcnxkYXl8XCIgK1xuICAgICAgICBcImJmaWxlfGJsb2J8Y2xvYnxuY2xvYnxcIiArXG4gICAgICAgIFwicm93aWR8dXJvd2lkXCJcbiAgICApO1xuICAgIFxuICAgIHZhciBrZXl3b3JkTWFwcGVyID0gdGhpcy5jcmVhdGVLZXl3b3JkTWFwcGVyKHtcbiAgICAgICAgXCJzdXBwb3J0LmZ1bmN0aW9uXCI6IGJ1aWx0aW5GdW5jdGlvbnMsXG4gICAgICAgIFwia2V5d29yZFwiOiBrZXl3b3JkcyxcbiAgICAgICAgXCJjb25zdGFudC5sYW5ndWFnZVwiOiBidWlsdGluQ29uc3RhbnRzLFxuICAgICAgICBcInN0b3JhZ2UudHlwZVwiOiBkYXRhVHlwZXNcbiAgICB9LCBcImlkZW50aWZpZXJcIiwgdHJ1ZSk7XG5cbiAgICB0aGlzLiRydWxlcyA9IHtcbiAgICAgICAgXCJzdGFydFwiIDogWyB7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudFwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIi0tLiokXCJcbiAgICAgICAgfSwgIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsXG4gICAgICAgICAgICBzdGFydCA6IFwiL1xcXFwqXCIsXG4gICAgICAgICAgICBlbmQgOiBcIlxcXFwqL1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIiwgICAgICAgICAgIC8vIFwiIHN0cmluZ1xuICAgICAgICAgICAgcmVnZXggOiAnXCIuKj9cIidcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLCAgICAgICAgICAgLy8gJyBzdHJpbmdcbiAgICAgICAgICAgIHJlZ2V4IDogXCInLio/J1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5udW1lcmljXCIsIC8vIGZsb2F0XG4gICAgICAgICAgICByZWdleCA6IFwiWystXT9cXFxcZCsoPzooPzpcXFxcLlxcXFxkKik/KD86W2VFXVsrLV0/XFxcXGQrKT8pP1xcXFxiXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBrZXl3b3JkTWFwcGVyLFxuICAgICAgICAgICAgcmVnZXggOiBcIlthLXpBLVpfJF1bYS16QS1aMC05XyRdKlxcXFxiXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcImtleXdvcmQub3BlcmF0b3JcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcK3xcXFxcLXxcXFxcL3xcXFxcL1xcXFwvfCV8PEA+fEA+fDxAfCZ8XFxcXF58fnw8fD58PD18PT58PT18IT18PD58PVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJwYXJlbi5scGFyZW5cIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJbXFxcXChdXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInBhcmVuLnJwYXJlblwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIltcXFxcKV1cIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwidGV4dFwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIlxcXFxzK1wiXG4gICAgICAgIH0gXVxuICAgIH07XG4gICAgXG4gICAgdGhpcy5ub3JtYWxpemVSdWxlcygpO1xufTtcblxub29wLmluaGVyaXRzKHBsc3FsSGlnaGxpZ2h0UnVsZXMsIFRleHRIaWdobGlnaHRSdWxlcyk7XG5cbmV4cG9ydHMucGxzcWxIaWdobGlnaHRSdWxlcyA9IHBsc3FsSGlnaGxpZ2h0UnVsZXM7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9