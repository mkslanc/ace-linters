"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[661],{

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

/***/ 10661:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var PuppetHighlightRules = (__webpack_require__(50786)/* .PuppetHighlightRules */ .c);
var CStyleFoldMode = (__webpack_require__(93887)/* .FoldMode */ .l);
var MatchingBraceOutdent = (__webpack_require__(28670).MatchingBraceOutdent);

var Mode = function () {
    TextMode.call(this);
    this.HighlightRules = PuppetHighlightRules;
    this.$outdent = new MatchingBraceOutdent();
    this.$behaviour = this.$defaultBehaviour;
    this.foldingRules = new CStyleFoldMode();
};

oop.inherits(Mode, TextMode);


(function () {
    this.lineCommentStart = "#";
    this.blockComment = {start: "/*", end: "*/"};
    
    this.$id = "ace/mode/puppet";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 50786:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);
var PuppetHighlightRules = function () {
    this.$rules = {
        "start": [
            {
                token: ['keyword.type.puppet', 'constant.class.puppet', 'keyword.inherits.puppet', 'constant.class.puppet'],
                regex: "^\\s*(class)(\\s+(?:[-_A-Za-z0-9\".]+::)*[-_A-Za-z0-9\".]+\\s*)(?:(inherits\\s*)(\\s+(?:[-_A-Za-z0-9\".]+::)*[-_A-Za-z0-9\".]+\\s*))?"
            },
            {
                token: ['storage.function.puppet', 'name.function.puppet', 'punctuation.lpar'],
                regex: "(^\\s*define)(\\s+[a-zA-Z0-9_:]+\\s*)(\\()",
                push:
                    [{
                        token: 'punctuation.rpar.puppet',
                        regex: "\\)",
                        next: 'pop'
                    },
                        {include: "constants"},
                        {include: "variable"},
                        {include: "strings"},
                        {include: "operators"},
                        {defaultToken: 'string'}]
            },
            {
                token: ["language.support.class", "keyword.operator"],
                regex: "\\b([a-zA-Z_]+)(\\s+=>)"
            },
            {
                token: ["exported.resource.puppet", "keyword.name.resource.puppet", "paren.lparen"],
                regex: "(\\@\\@)?(\\s*[a-zA-Z_]*)(\\s*\\{)"
            },
            {
                token: "qualified.variable.puppet",
                regex: "(\\$([a-z][a-z0-9_]*)?(::[a-z][a-z0-9_]*)*::[a-z0-9_][a-zA-Z0-9_]*)"
            },

            {
                token: "singleline.comment.puppet",
                regex: '#(.)*$'
            },
            {
                token: "multiline.comment.begin.puppet",
                regex: '^\\s*\\/\\*',
                push: "blockComment"
            },
            {
                token: "keyword.control.puppet",
                regex: "\\b(case|if|unless|else|elsif|in|default:|and|or)\\s+(?!::)"
            },
            {
                token: "keyword.control.puppet",
                regex: "\\b(import|default|inherits|include|require|contain|node|application|consumes|environment|site|function|produces)\\b"
            },
            {
                token: "support.function.puppet",
                regex: "\\b(lest|str2bool|escape|gsub|Timestamp|Timespan|with|alert|crit|debug|notice|sprintf|split|step|strftime|slice|shellquote|type|sha1|defined|scanf|reverse_each|regsubst|return|emerg|reduce|err|failed|fail|versioncmp|file|generate|then|info|realize|search|tag|tagged|template|epp|warning|hiera_include|each|assert_type|binary_file|create_resources|dig|digest|filter|lookup|find_file|fqdn_rand|hiera_array|hiera_hash|inline_epp|inline_template|map|match|md5|new|next)\\b"
            },
            {
                token: "constant.types.puppet",
                regex: "\\b(String|File|Package|Service|Class|Integer|Array|Catalogentry|Variant|Boolean|Undef|Number|Hash|Float|Numeric|NotUndef|Callable|Optional|Any|Regexp|Sensitive|Sensitive.new|Type|Resource|Default|Enum|Scalar|Collection|Data|Pattern|Tuple|Struct)\\b"
            },

            {
                token: "paren.lparen",
                regex: "[[({]"
            },
            {
                token: "paren.rparen",
                regex: "[\\])}]"
            },
            {include: "variable"},
            {include: "constants"},
            {include: "strings"},
            {include: "operators"},
            {
                token: "regexp.begin.string.puppet",
                regex: "\\s*(\\/(\\S)+)\\/"
            }
        ],
        blockComment: [{
            regex: "\\*\\/",
            token: "multiline.comment.end.puppet",
            next: "pop"
        }, {
            defaultToken: "comment"
        }],
        "constants": [
            {
                token: "constant.language.puppet",
                regex: "\\b(false|true|running|stopped|installed|purged|latest|file|directory|held|undef|present|absent|link|mounted|unmounted)\\b"
            }
        ],
        "variable": [
            {
                token: "variable.puppet",
                regex: "(\\$[a-z0-9_\{][a-zA-Z0-9_]*)"
            }
        ],
        "strings": [
            {
                token: "punctuation.quote.puppet",
                regex: "'",
                push:
                    [{
                        token: 'punctuation.quote.puppet',
                        regex: "'",
                        next: 'pop'
                    },
                        {include: "escaped_chars"},
                        {defaultToken: 'string'}]
            },
            {
                token: "punctuation.quote.puppet",
                regex: '"',
                push:
                    [{
                        token: 'punctuation.quote.puppet',
                        regex: '"',
                        next: 'pop'
                    },
                        {include: "escaped_chars"},
                        {include: "variable"},
                        {defaultToken: 'string'}]
            }
        ],
        "escaped_chars": [
            {
                token: "constant.escaped_char.puppet",
                regex: "\\\\."
            }
        ],
        "operators": [
            {
                token: "keyword.operator",
                regex: "\\+\\.|\\-\\.|\\*\\.|\\/\\.|#|;;|\\+|\\-|\\*|\\*\\*\\/|\\/\\/|%|<<|>>|&|\\||\\^|~|<|>|<=|=>|==|!=|<>|<-|=|::|,"
            }
        ]
    };
    this.normalizeRules();
};


oop.inherits(PuppetHighlightRules, TextHighlightRules);

exports.c = PuppetHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUIsYUFBYTtBQUNiO0FBQ0E7QUFDQSw4QkFBOEI7QUFDOUIsYUFBYTtBQUNiLGFBQWEsb0JBQW9CO0FBQ2pDLGFBQWEscUJBQXFCO0FBQ2xDLGFBQWEsbUJBQW1CO0FBQ2hDLGFBQWEscUJBQXFCO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0M7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQix5QkFBeUIseUJBQXlCO0FBQ2xELHlCQUF5Qix1QkFBdUI7QUFDaEQsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckIseUJBQXlCLHlCQUF5QjtBQUNsRCx5QkFBeUIsb0JBQW9CO0FBQzdDLHlCQUF5Qix1QkFBdUI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdEQUF3RDtBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQSxTQUE0QiIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvZm9sZGluZy9jc3R5bGUuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9tYXRjaGluZ19icmFjZV9vdXRkZW50LmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvcHVwcGV0LmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvcHVwcGV0X2hpZ2hsaWdodF9ydWxlcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi8uLi9saWIvb29wXCIpO1xudmFyIFJhbmdlID0gcmVxdWlyZShcIi4uLy4uL3JhbmdlXCIpLlJhbmdlO1xudmFyIEJhc2VGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRfbW9kZVwiKS5Gb2xkTW9kZTtcblxudmFyIEZvbGRNb2RlID0gZXhwb3J0cy5Gb2xkTW9kZSA9IGZ1bmN0aW9uKGNvbW1lbnRSZWdleCkge1xuICAgIGlmIChjb21tZW50UmVnZXgpIHtcbiAgICAgICAgdGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIgPSBuZXcgUmVnRXhwKFxuICAgICAgICAgICAgdGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIuc291cmNlLnJlcGxhY2UoL1xcfFtefF0qPyQvLCBcInxcIiArIGNvbW1lbnRSZWdleC5zdGFydClcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5mb2xkaW5nU3RvcE1hcmtlciA9IG5ldyBSZWdFeHAoXG4gICAgICAgICAgICB0aGlzLmZvbGRpbmdTdG9wTWFya2VyLnNvdXJjZS5yZXBsYWNlKC9cXHxbXnxdKj8kLywgXCJ8XCIgKyBjb21tZW50UmVnZXguZW5kKVxuICAgICAgICApO1xuICAgIH1cbn07XG5vb3AuaW5oZXJpdHMoRm9sZE1vZGUsIEJhc2VGb2xkTW9kZSk7XG5cbihmdW5jdGlvbigpIHtcbiAgICBcbiAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlciA9IC8oW1xce1xcW1xcKF0pW15cXH1cXF1cXCldKiR8XlxccyooXFwvXFwqKS87XG4gICAgdGhpcy5mb2xkaW5nU3RvcE1hcmtlciA9IC9eW15cXFtcXHtcXChdKihbXFx9XFxdXFwpXSl8XltcXHNcXCpdKihcXCpcXC8pLztcbiAgICB0aGlzLnNpbmdsZUxpbmVCbG9ja0NvbW1lbnRSZT0gL15cXHMqKFxcL1xcKikuKlxcKlxcL1xccyokLztcbiAgICB0aGlzLnRyaXBsZVN0YXJCbG9ja0NvbW1lbnRSZSA9IC9eXFxzKihcXC9cXCpcXCpcXCopLipcXCpcXC9cXHMqJC87XG4gICAgdGhpcy5zdGFydFJlZ2lvblJlID0gL15cXHMqKFxcL1xcKnxcXC9cXC8pIz9yZWdpb25cXGIvO1xuICAgIFxuICAgIC8vcHJldmVudCBuYW1pbmcgY29uZmxpY3Qgd2l0aCBhbnkgbW9kZXMgdGhhdCBpbmhlcml0IGZyb20gY3N0eWxlIGFuZCBvdmVycmlkZSB0aGlzIChsaWtlIGNzaGFycClcbiAgICB0aGlzLl9nZXRGb2xkV2lkZ2V0QmFzZSA9IHRoaXMuZ2V0Rm9sZFdpZGdldDtcbiAgICBcbiAgICAvKipcbiAgICAgKiBHZXRzIGZvbGQgd2lkZ2V0IHdpdGggc29tZSBub24tc3RhbmRhcmQgZXh0cmFzOlxuICAgICAqXG4gICAgICogQGV4YW1wbGUgbGluZUNvbW1lbnRSZWdpb25TdGFydFxuICAgICAqICAgICAgLy8jcmVnaW9uIFtvcHRpb25hbCBkZXNjcmlwdGlvbl1cbiAgICAgKlxuICAgICAqIEBleGFtcGxlIGJsb2NrQ29tbWVudFJlZ2lvblN0YXJ0XG4gICAgICogICAgICAvKiNyZWdpb24gW29wdGlvbmFsIGRlc2NyaXB0aW9uXSAqWy9dXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSB0cmlwbGVTdGFyRm9sZGluZ1NlY3Rpb25cbiAgICAgKiAgICAgIC8qKiogdGhpcyBmb2xkcyBldmVuIHRob3VnaCAxIGxpbmUgYmVjYXVzZSBpdCBoYXMgMyBzdGFycyAqKipbL11cbiAgICAgKiBcbiAgICAgKiBAbm90ZSB0aGUgcG91bmQgc3ltYm9sIGZvciByZWdpb24gdGFncyBpcyBvcHRpb25hbFxuICAgICAqL1xuICAgIHRoaXMuZ2V0Rm9sZFdpZGdldCA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgXG4gICAgICAgIGlmICh0aGlzLnNpbmdsZUxpbmVCbG9ja0NvbW1lbnRSZS50ZXN0KGxpbmUpKSB7XG4gICAgICAgICAgICAvLyBObyB3aWRnZXQgZm9yIHNpbmdsZSBsaW5lIGJsb2NrIGNvbW1lbnQgdW5sZXNzIHJlZ2lvbiBvciB0cmlwbGUgc3RhclxuICAgICAgICAgICAgaWYgKCF0aGlzLnN0YXJ0UmVnaW9uUmUudGVzdChsaW5lKSAmJiAhdGhpcy50cmlwbGVTdGFyQmxvY2tDb21tZW50UmUudGVzdChsaW5lKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICB2YXIgZncgPSB0aGlzLl9nZXRGb2xkV2lkZ2V0QmFzZShzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdyk7XG4gICAgXG4gICAgICAgIGlmICghZncgJiYgdGhpcy5zdGFydFJlZ2lvblJlLnRlc3QobGluZSkpXG4gICAgICAgICAgICByZXR1cm4gXCJzdGFydFwiOyAvLyBsaW5lQ29tbWVudFJlZ2lvblN0YXJ0XG4gICAgXG4gICAgICAgIHJldHVybiBmdztcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0UmFuZ2UgPSBmdW5jdGlvbihzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdywgZm9yY2VNdWx0aWxpbmUpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLnN0YXJ0UmVnaW9uUmUudGVzdChsaW5lKSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldENvbW1lbnRSZWdpb25CbG9jayhzZXNzaW9uLCBsaW5lLCByb3cpO1xuICAgICAgICBcbiAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCh0aGlzLmZvbGRpbmdTdGFydE1hcmtlcik7XG4gICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgdmFyIGkgPSBtYXRjaC5pbmRleDtcblxuICAgICAgICAgICAgaWYgKG1hdGNoWzFdKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm9wZW5pbmdCcmFja2V0QmxvY2soc2Vzc2lvbiwgbWF0Y2hbMV0sIHJvdywgaSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgcmFuZ2UgPSBzZXNzaW9uLmdldENvbW1lbnRGb2xkUmFuZ2Uocm93LCBpICsgbWF0Y2hbMF0ubGVuZ3RoLCAxKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHJhbmdlICYmICFyYW5nZS5pc011bHRpTGluZSgpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZvcmNlTXVsdGlsaW5lKSB7XG4gICAgICAgICAgICAgICAgICAgIHJhbmdlID0gdGhpcy5nZXRTZWN0aW9uUmFuZ2Uoc2Vzc2lvbiwgcm93KTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZvbGRTdHlsZSAhPSBcImFsbFwiKVxuICAgICAgICAgICAgICAgICAgICByYW5nZSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiByYW5nZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmb2xkU3R5bGUgPT09IFwibWFya2JlZ2luXCIpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCh0aGlzLmZvbGRpbmdTdG9wTWFya2VyKTtcbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICB2YXIgaSA9IG1hdGNoLmluZGV4ICsgbWF0Y2hbMF0ubGVuZ3RoO1xuXG4gICAgICAgICAgICBpZiAobWF0Y2hbMV0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2xvc2luZ0JyYWNrZXRCbG9jayhzZXNzaW9uLCBtYXRjaFsxXSwgcm93LCBpKTtcblxuICAgICAgICAgICAgcmV0dXJuIHNlc3Npb24uZ2V0Q29tbWVudEZvbGRSYW5nZShyb3csIGksIC0xKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgXG4gICAgdGhpcy5nZXRTZWN0aW9uUmFuZ2UgPSBmdW5jdGlvbihzZXNzaW9uLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgdmFyIHN0YXJ0SW5kZW50ID0gbGluZS5zZWFyY2goL1xcUy8pO1xuICAgICAgICB2YXIgc3RhcnRSb3cgPSByb3c7XG4gICAgICAgIHZhciBzdGFydENvbHVtbiA9IGxpbmUubGVuZ3RoO1xuICAgICAgICByb3cgPSByb3cgKyAxO1xuICAgICAgICB2YXIgZW5kUm93ID0gcm93O1xuICAgICAgICB2YXIgbWF4Um93ID0gc2Vzc2lvbi5nZXRMZW5ndGgoKTtcbiAgICAgICAgd2hpbGUgKCsrcm93IDwgbWF4Um93KSB7XG4gICAgICAgICAgICBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgICAgICB2YXIgaW5kZW50ID0gbGluZS5zZWFyY2goL1xcUy8pO1xuICAgICAgICAgICAgaWYgKGluZGVudCA9PT0gLTEpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICBpZiAgKHN0YXJ0SW5kZW50ID4gaW5kZW50KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgdmFyIHN1YlJhbmdlID0gdGhpcy5nZXRGb2xkV2lkZ2V0UmFuZ2Uoc2Vzc2lvbiwgXCJhbGxcIiwgcm93KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHN1YlJhbmdlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN1YlJhbmdlLnN0YXJ0LnJvdyA8PSBzdGFydFJvdykge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN1YlJhbmdlLmlzTXVsdGlMaW5lKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcm93ID0gc3ViUmFuZ2UuZW5kLnJvdztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXJ0SW5kZW50ID09IGluZGVudCkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbmRSb3cgPSByb3c7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBuZXcgUmFuZ2Uoc3RhcnRSb3csIHN0YXJ0Q29sdW1uLCBlbmRSb3csIHNlc3Npb24uZ2V0TGluZShlbmRSb3cpLmxlbmd0aCk7XG4gICAgfTtcbiAgICBcbiAgICAvKipcbiAgICAgKiBnZXRzIGNvbW1lbnQgcmVnaW9uIGJsb2NrIHdpdGggZW5kIHJlZ2lvbiBhc3N1bWVkIHRvIGJlIHN0YXJ0IG9mIGNvbW1lbnQgaW4gYW55IGNzdHlsZSBtb2RlIG9yIFNRTCBtb2RlICgtLSkgd2hpY2ggaW5oZXJpdHMgZnJvbSB0aGlzLlxuICAgICAqIFRoZXJlIG1heSBvcHRpb25hbGx5IGJlIGEgcG91bmQgc3ltYm9sIGJlZm9yZSB0aGUgcmVnaW9uL2VuZHJlZ2lvbiBzdGF0ZW1lbnRcbiAgICAgKi9cbiAgICB0aGlzLmdldENvbW1lbnRSZWdpb25CbG9jayA9IGZ1bmN0aW9uKHNlc3Npb24sIGxpbmUsIHJvdykge1xuICAgICAgICB2YXIgc3RhcnRDb2x1bW4gPSBsaW5lLnNlYXJjaCgvXFxzKiQvKTtcbiAgICAgICAgdmFyIG1heFJvdyA9IHNlc3Npb24uZ2V0TGVuZ3RoKCk7XG4gICAgICAgIHZhciBzdGFydFJvdyA9IHJvdztcbiAgICAgICAgXG4gICAgICAgIHZhciByZSA9IC9eXFxzKig/OlxcL1xcKnxcXC9cXC98LS0pIz8oZW5kKT9yZWdpb25cXGIvO1xuICAgICAgICB2YXIgZGVwdGggPSAxO1xuICAgICAgICB3aGlsZSAoKytyb3cgPCBtYXhSb3cpIHtcbiAgICAgICAgICAgIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgICAgIHZhciBtID0gcmUuZXhlYyhsaW5lKTtcbiAgICAgICAgICAgIGlmICghbSkgY29udGludWU7XG4gICAgICAgICAgICBpZiAobVsxXSkgZGVwdGgtLTtcbiAgICAgICAgICAgIGVsc2UgZGVwdGgrKztcblxuICAgICAgICAgICAgaWYgKCFkZXB0aCkgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZW5kUm93ID0gcm93O1xuICAgICAgICBpZiAoZW5kUm93ID4gc3RhcnRSb3cpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmFuZ2Uoc3RhcnRSb3csIHN0YXJ0Q29sdW1uLCBlbmRSb3csIGxpbmUubGVuZ3RoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbn0pLmNhbGwoRm9sZE1vZGUucHJvdG90eXBlKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgUmFuZ2UgPSByZXF1aXJlKFwiLi4vcmFuZ2VcIikuUmFuZ2U7XG5cbnZhciBNYXRjaGluZ0JyYWNlT3V0ZGVudCA9IGZ1bmN0aW9uKCkge307XG5cbihmdW5jdGlvbigpIHtcblxuICAgIHRoaXMuY2hlY2tPdXRkZW50ID0gZnVuY3Rpb24obGluZSwgaW5wdXQpIHtcbiAgICAgICAgaWYgKCEgL15cXHMrJC8udGVzdChsaW5lKSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgICByZXR1cm4gL15cXHMqXFx9Ly50ZXN0KGlucHV0KTtcbiAgICB9O1xuXG4gICAgdGhpcy5hdXRvT3V0ZGVudCA9IGZ1bmN0aW9uKGRvYywgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gZG9jLmdldExpbmUocm93KTtcbiAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCgvXihcXHMqXFx9KS8pO1xuXG4gICAgICAgIGlmICghbWF0Y2gpIHJldHVybiAwO1xuXG4gICAgICAgIHZhciBjb2x1bW4gPSBtYXRjaFsxXS5sZW5ndGg7XG4gICAgICAgIHZhciBvcGVuQnJhY2VQb3MgPSBkb2MuZmluZE1hdGNoaW5nQnJhY2tldCh7cm93OiByb3csIGNvbHVtbjogY29sdW1ufSk7XG5cbiAgICAgICAgaWYgKCFvcGVuQnJhY2VQb3MgfHwgb3BlbkJyYWNlUG9zLnJvdyA9PSByb3cpIHJldHVybiAwO1xuXG4gICAgICAgIHZhciBpbmRlbnQgPSB0aGlzLiRnZXRJbmRlbnQoZG9jLmdldExpbmUob3BlbkJyYWNlUG9zLnJvdykpO1xuICAgICAgICBkb2MucmVwbGFjZShuZXcgUmFuZ2Uocm93LCAwLCByb3csIGNvbHVtbi0xKSwgaW5kZW50KTtcbiAgICB9O1xuXG4gICAgdGhpcy4kZ2V0SW5kZW50ID0gZnVuY3Rpb24obGluZSkge1xuICAgICAgICByZXR1cm4gbGluZS5tYXRjaCgvXlxccyovKVswXTtcbiAgICB9O1xuXG59KS5jYWxsKE1hdGNoaW5nQnJhY2VPdXRkZW50LnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTWF0Y2hpbmdCcmFjZU91dGRlbnQgPSBNYXRjaGluZ0JyYWNlT3V0ZGVudDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dE1vZGUgPSByZXF1aXJlKFwiLi90ZXh0XCIpLk1vZGU7XG52YXIgUHVwcGV0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9wdXBwZXRfaGlnaGxpZ2h0X3J1bGVzXCIpLlB1cHBldEhpZ2hsaWdodFJ1bGVzO1xudmFyIENTdHlsZUZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZGluZy9jc3R5bGVcIikuRm9sZE1vZGU7XG52YXIgTWF0Y2hpbmdCcmFjZU91dGRlbnQgPSByZXF1aXJlKFwiLi9tYXRjaGluZ19icmFjZV9vdXRkZW50XCIpLk1hdGNoaW5nQnJhY2VPdXRkZW50O1xuXG52YXIgTW9kZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBUZXh0TW9kZS5jYWxsKHRoaXMpO1xuICAgIHRoaXMuSGlnaGxpZ2h0UnVsZXMgPSBQdXBwZXRIaWdobGlnaHRSdWxlcztcbiAgICB0aGlzLiRvdXRkZW50ID0gbmV3IE1hdGNoaW5nQnJhY2VPdXRkZW50KCk7XG4gICAgdGhpcy4kYmVoYXZpb3VyID0gdGhpcy4kZGVmYXVsdEJlaGF2aW91cjtcbiAgICB0aGlzLmZvbGRpbmdSdWxlcyA9IG5ldyBDU3R5bGVGb2xkTW9kZSgpO1xufTtcblxub29wLmluaGVyaXRzKE1vZGUsIFRleHRNb2RlKTtcblxuXG4oZnVuY3Rpb24gKCkge1xuICAgIHRoaXMubGluZUNvbW1lbnRTdGFydCA9IFwiI1wiO1xuICAgIHRoaXMuYmxvY2tDb21tZW50ID0ge3N0YXJ0OiBcIi8qXCIsIGVuZDogXCIqL1wifTtcbiAgICBcbiAgICB0aGlzLiRpZCA9IFwiYWNlL21vZGUvcHVwcGV0XCI7XG59KS5jYWxsKE1vZGUucHJvdG90eXBlKTtcblxuZXhwb3J0cy5Nb2RlID0gTW9kZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xudmFyIFB1cHBldEhpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuJHJ1bGVzID0ge1xuICAgICAgICBcInN0YXJ0XCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogWydrZXl3b3JkLnR5cGUucHVwcGV0JywgJ2NvbnN0YW50LmNsYXNzLnB1cHBldCcsICdrZXl3b3JkLmluaGVyaXRzLnB1cHBldCcsICdjb25zdGFudC5jbGFzcy5wdXBwZXQnXSxcbiAgICAgICAgICAgICAgICByZWdleDogXCJeXFxcXHMqKGNsYXNzKShcXFxccysoPzpbLV9BLVphLXowLTlcXFwiLl0rOjopKlstX0EtWmEtejAtOVxcXCIuXStcXFxccyopKD86KGluaGVyaXRzXFxcXHMqKShcXFxccysoPzpbLV9BLVphLXowLTlcXFwiLl0rOjopKlstX0EtWmEtejAtOVxcXCIuXStcXFxccyopKT9cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogWydzdG9yYWdlLmZ1bmN0aW9uLnB1cHBldCcsICduYW1lLmZ1bmN0aW9uLnB1cHBldCcsICdwdW5jdHVhdGlvbi5scGFyJ10sXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiKF5cXFxccypkZWZpbmUpKFxcXFxzK1thLXpBLVowLTlfOl0rXFxcXHMqKShcXFxcKClcIixcbiAgICAgICAgICAgICAgICBwdXNoOlxuICAgICAgICAgICAgICAgICAgICBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46ICdwdW5jdHVhdGlvbi5ycGFyLnB1cHBldCcsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWdleDogXCJcXFxcKVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dDogJ3BvcCdcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtpbmNsdWRlOiBcImNvbnN0YW50c1wifSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtpbmNsdWRlOiBcInZhcmlhYmxlXCJ9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2luY2x1ZGU6IFwic3RyaW5nc1wifSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtpbmNsdWRlOiBcIm9wZXJhdG9yc1wifSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtkZWZhdWx0VG9rZW46ICdzdHJpbmcnfV1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFtcImxhbmd1YWdlLnN1cHBvcnQuY2xhc3NcIiwgXCJrZXl3b3JkLm9wZXJhdG9yXCJdLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFxiKFthLXpBLVpfXSspKFxcXFxzKz0+KVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuOiBbXCJleHBvcnRlZC5yZXNvdXJjZS5wdXBwZXRcIiwgXCJrZXl3b3JkLm5hbWUucmVzb3VyY2UucHVwcGV0XCIsIFwicGFyZW4ubHBhcmVuXCJdLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIihcXFxcQFxcXFxAKT8oXFxcXHMqW2EtekEtWl9dKikoXFxcXHMqXFxcXHspXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwicXVhbGlmaWVkLnZhcmlhYmxlLnB1cHBldFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIihcXFxcJChbYS16XVthLXowLTlfXSopPyg6OlthLXpdW2EtejAtOV9dKikqOjpbYS16MC05X11bYS16QS1aMC05X10qKVwiXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwic2luZ2xlbGluZS5jb21tZW50LnB1cHBldFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAnIyguKSokJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJtdWx0aWxpbmUuY29tbWVudC5iZWdpbi5wdXBwZXRcIixcbiAgICAgICAgICAgICAgICByZWdleDogJ15cXFxccypcXFxcL1xcXFwqJyxcbiAgICAgICAgICAgICAgICBwdXNoOiBcImJsb2NrQ29tbWVudFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcImtleXdvcmQuY29udHJvbC5wdXBwZXRcIixcbiAgICAgICAgICAgICAgICByZWdleDogXCJcXFxcYihjYXNlfGlmfHVubGVzc3xlbHNlfGVsc2lmfGlufGRlZmF1bHQ6fGFuZHxvcilcXFxccysoPyE6OilcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJrZXl3b3JkLmNvbnRyb2wucHVwcGV0XCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiXFxcXGIoaW1wb3J0fGRlZmF1bHR8aW5oZXJpdHN8aW5jbHVkZXxyZXF1aXJlfGNvbnRhaW58bm9kZXxhcHBsaWNhdGlvbnxjb25zdW1lc3xlbnZpcm9ubWVudHxzaXRlfGZ1bmN0aW9ufHByb2R1Y2VzKVxcXFxiXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwic3VwcG9ydC5mdW5jdGlvbi5wdXBwZXRcIixcbiAgICAgICAgICAgICAgICByZWdleDogXCJcXFxcYihsZXN0fHN0cjJib29sfGVzY2FwZXxnc3VifFRpbWVzdGFtcHxUaW1lc3Bhbnx3aXRofGFsZXJ0fGNyaXR8ZGVidWd8bm90aWNlfHNwcmludGZ8c3BsaXR8c3RlcHxzdHJmdGltZXxzbGljZXxzaGVsbHF1b3RlfHR5cGV8c2hhMXxkZWZpbmVkfHNjYW5mfHJldmVyc2VfZWFjaHxyZWdzdWJzdHxyZXR1cm58ZW1lcmd8cmVkdWNlfGVycnxmYWlsZWR8ZmFpbHx2ZXJzaW9uY21wfGZpbGV8Z2VuZXJhdGV8dGhlbnxpbmZvfHJlYWxpemV8c2VhcmNofHRhZ3x0YWdnZWR8dGVtcGxhdGV8ZXBwfHdhcm5pbmd8aGllcmFfaW5jbHVkZXxlYWNofGFzc2VydF90eXBlfGJpbmFyeV9maWxlfGNyZWF0ZV9yZXNvdXJjZXN8ZGlnfGRpZ2VzdHxmaWx0ZXJ8bG9va3VwfGZpbmRfZmlsZXxmcWRuX3JhbmR8aGllcmFfYXJyYXl8aGllcmFfaGFzaHxpbmxpbmVfZXBwfGlubGluZV90ZW1wbGF0ZXxtYXB8bWF0Y2h8bWQ1fG5ld3xuZXh0KVxcXFxiXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQudHlwZXMucHVwcGV0XCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiXFxcXGIoU3RyaW5nfEZpbGV8UGFja2FnZXxTZXJ2aWNlfENsYXNzfEludGVnZXJ8QXJyYXl8Q2F0YWxvZ2VudHJ5fFZhcmlhbnR8Qm9vbGVhbnxVbmRlZnxOdW1iZXJ8SGFzaHxGbG9hdHxOdW1lcmljfE5vdFVuZGVmfENhbGxhYmxlfE9wdGlvbmFsfEFueXxSZWdleHB8U2Vuc2l0aXZlfFNlbnNpdGl2ZS5uZXd8VHlwZXxSZXNvdXJjZXxEZWZhdWx0fEVudW18U2NhbGFyfENvbGxlY3Rpb258RGF0YXxQYXR0ZXJufFR1cGxlfFN0cnVjdClcXFxcYlwiXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwicGFyZW4ubHBhcmVuXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiW1soe11cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJwYXJlbi5ycGFyZW5cIixcbiAgICAgICAgICAgICAgICByZWdleDogXCJbXFxcXF0pfV1cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtpbmNsdWRlOiBcInZhcmlhYmxlXCJ9LFxuICAgICAgICAgICAge2luY2x1ZGU6IFwiY29uc3RhbnRzXCJ9LFxuICAgICAgICAgICAge2luY2x1ZGU6IFwic3RyaW5nc1wifSxcbiAgICAgICAgICAgIHtpbmNsdWRlOiBcIm9wZXJhdG9yc1wifSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJyZWdleHAuYmVnaW4uc3RyaW5nLnB1cHBldFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFxzKihcXFxcLyhcXFxcUykrKVxcXFwvXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgYmxvY2tDb21tZW50OiBbe1xuICAgICAgICAgICAgcmVnZXg6IFwiXFxcXCpcXFxcL1wiLFxuICAgICAgICAgICAgdG9rZW46IFwibXVsdGlsaW5lLmNvbW1lbnQuZW5kLnB1cHBldFwiLFxuICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwiY29tbWVudFwiXG4gICAgICAgIH1dLFxuICAgICAgICBcImNvbnN0YW50c1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQubGFuZ3VhZ2UucHVwcGV0XCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiXFxcXGIoZmFsc2V8dHJ1ZXxydW5uaW5nfHN0b3BwZWR8aW5zdGFsbGVkfHB1cmdlZHxsYXRlc3R8ZmlsZXxkaXJlY3Rvcnl8aGVsZHx1bmRlZnxwcmVzZW50fGFic2VudHxsaW5rfG1vdW50ZWR8dW5tb3VudGVkKVxcXFxiXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgXCJ2YXJpYWJsZVwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwidmFyaWFibGUucHVwcGV0XCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiKFxcXFwkW2EtejAtOV9cXHtdW2EtekEtWjAtOV9dKilcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBcInN0cmluZ3NcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInB1bmN0dWF0aW9uLnF1b3RlLnB1cHBldFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIidcIixcbiAgICAgICAgICAgICAgICBwdXNoOlxuICAgICAgICAgICAgICAgICAgICBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46ICdwdW5jdHVhdGlvbi5xdW90ZS5wdXBwZXQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXg6IFwiJ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dDogJ3BvcCdcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtpbmNsdWRlOiBcImVzY2FwZWRfY2hhcnNcIn0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7ZGVmYXVsdFRva2VuOiAnc3RyaW5nJ31dXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInB1bmN0dWF0aW9uLnF1b3RlLnB1cHBldFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAnXCInLFxuICAgICAgICAgICAgICAgIHB1c2g6XG4gICAgICAgICAgICAgICAgICAgIFt7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbjogJ3B1bmN0dWF0aW9uLnF1b3RlLnB1cHBldCcsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWdleDogJ1wiJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHQ6ICdwb3AnXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7aW5jbHVkZTogXCJlc2NhcGVkX2NoYXJzXCJ9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2luY2x1ZGU6IFwidmFyaWFibGVcIn0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7ZGVmYXVsdFRva2VuOiAnc3RyaW5nJ31dXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIFwiZXNjYXBlZF9jaGFyc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQuZXNjYXBlZF9jaGFyLnB1cHBldFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFxcXFxcLlwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIFwib3BlcmF0b3JzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJrZXl3b3JkLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiXFxcXCtcXFxcLnxcXFxcLVxcXFwufFxcXFwqXFxcXC58XFxcXC9cXFxcLnwjfDs7fFxcXFwrfFxcXFwtfFxcXFwqfFxcXFwqXFxcXCpcXFxcL3xcXFxcL1xcXFwvfCV8PDx8Pj58JnxcXFxcfHxcXFxcXnx+fDx8Pnw8PXw9Pnw9PXwhPXw8Pnw8LXw9fDo6fCxcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfTtcbiAgICB0aGlzLm5vcm1hbGl6ZVJ1bGVzKCk7XG59O1xuXG5cbm9vcC5pbmhlcml0cyhQdXBwZXRIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuZXhwb3J0cy5QdXBwZXRIaWdobGlnaHRSdWxlcyA9IFB1cHBldEhpZ2hsaWdodFJ1bGVzO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9