"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[5131],{

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

/***/ 25131:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var TerraformHighlightRules = (__webpack_require__(17968)/* .TerraformHighlightRules */ .U);
var CStyleFoldMode = (__webpack_require__(93887)/* .FoldMode */ .l);
var MatchingBraceOutdent = (__webpack_require__(28670).MatchingBraceOutdent);

var Mode = function () {
    TextMode.call(this);
    this.HighlightRules = TerraformHighlightRules;
    this.$outdent = new MatchingBraceOutdent();
    this.$behaviour = this.$defaultBehaviour;
    this.foldingRules = new CStyleFoldMode();
};

oop.inherits(Mode, TextMode);


(function () {
    this.lineCommentStart = ["#", "//"];
    this.blockComment = {start: "/*", end: "*/"};
    
    this.$id = "ace/mode/terraform";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 17968:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);
var TerraformHighlightRules = function () {


    this.$rules = {
        "start": [
            {
                token: ['storage.function.terraform'],
                regex: '\\b(output|resource|data|variable|module|export)\\b'
            },
            {
                token: "variable.terraform",
                regex: "\\$\\s",
                push: [
                    {
                        token: "keyword.terraform",
                        regex: "(-var-file|-var)"
                    },
                    {
                        token: "variable.terraform",
                        regex: "\\n|$",
                        next: "pop"
                    },

                    {include: "strings"},
                    {include: "variables"},
                    {include: "operators"},

                    {defaultToken: "text"}
                ]
            },
            {
                token: "language.support.class",
                regex: "\\b(timeouts|provider|connection|provisioner|lifecycleprovider|atlas)\\b"
            },

            {
                token: "singleline.comment.terraform",
                regex: '#.*$'
            },
            {
                token: "singleline.comment.terraform",
                regex: '//.*$'
            },
            {
                token: "multiline.comment.begin.terraform",
                regex: /\/\*/,
                push: "blockComment"
            },
            {
                token: "storage.function.terraform",
                regex: "^\\s*(locals|terraform)\\s*{"
            },
            {
                token: "paren.lparen",
                regex: "[[({]"
            },

            {
                token: "paren.rparen",
                regex: "[\\])}]"
            },
            {include: "constants"},
            {include: "strings"},
            {include: "operators"},
            {include: "variables"}
        ],
        blockComment: [{
            regex: /\*\//,
            token: "multiline.comment.end.terraform",
            next: "pop"
        }, {
            defaultToken: "comment"
        }],
        "constants": [
            {
                token: "constant.language.terraform",
                regex: "\\b(true|false|yes|no|on|off|EOF)\\b"
            },
            {
                token: "constant.numeric.terraform",
                regex: "(\\b([0-9]+)([kKmMgG]b?)?\\b)|(\\b(0x[0-9A-Fa-f]+)([kKmMgG]b?)?\\b)"
            }
        ],
        "variables": [
            {
                token: ["variable.assignment.terraform", "keyword.operator"],
                regex: "\\b([a-zA-Z_]+)(\\s*=)"
            }
        ],
        "interpolated_variables": [
            {
                token: "variable.terraform",
                regex: "\\b(var|self|count|path|local)\\b(?:\\.*[a-zA-Z_-]*)?"
            }
        ],
        "strings": [
            {
                token: "punctuation.quote.terraform",
                regex: "'",
                push:
                    [{
                        token: 'punctuation.quote.terraform',
                        regex: "'",
                        next: 'pop'
                    },
                        {include: "escaped_chars"},
                        {defaultToken: 'string'}]
            },
            {
                token: "punctuation.quote.terraform",
                regex: '"',
                push:
                    [{
                        token: 'punctuation.quote.terraform',
                        regex: '"',
                        next: 'pop'
                    },
                        {include: "interpolation"},
                        {include: "escaped_chars"},
                        {defaultToken: 'string'}]
            }
        ],
        "escaped_chars": [
            {
                token: "constant.escaped_char.terraform",
                regex: "\\\\."
            }
        ],
        "operators": [
            {
                token: "keyword.operator",
                regex: "\\?|:|==|!=|>|<|>=|<=|&&|\\|\\\||!|%|&|\\*|\\+|\\-|/|="
            }
        ],
        "interpolation": [
            {// TODO: double $
                token: "punctuation.interpolated.begin.terraform",
                regex: "\\$?\\$\\{",
                push: [{
                    token: "punctuation.interpolated.end.terraform",
                    regex: "\\}",
                    next: "pop"
                },
                    {include: "interpolated_variables"},
                    {include: "operators"},
                    {include: "constants"},
                    {include: "strings"},
                    {include: "functions"},
                    {include: "parenthesis"},
                    {defaultToken: "punctuation"}
                ]
            }
        ],
        "functions": [
            {
                token: "keyword.function.terraform",
                regex: "\\b(abs|basename|base64decode|base64encode|base64gzip|base64sha256|base64sha512|bcrypt|ceil|chomp|chunklist|cidrhost|cidrnetmask|cidrsubnet|coalesce|coalescelist|compact|concat|contains|dirname|distinct|element|file|floor|flatten|format|formatlist|indent|index|join|jsonencode|keys|length|list|log|lookup|lower|map|matchkeys|max|merge|min|md5|pathexpand|pow|replace|rsadecrypt|sha1|sha256|sha512|signum|slice|sort|split|substr|timestamp|timeadd|title|transpose|trimspace|upper|urlencode|uuid|values|zipmap)\\b"
            }
        ],
        "parenthesis": [
            {
                token: "paren.lparen",
                regex: "\\["
            },
            {
                token: "paren.rparen",
                regex: "\\]"
            }
        ]
    };
    this.normalizeRules();
};

oop.inherits(TerraformHighlightRules, TextHighlightRules);

exports.U = TerraformHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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azovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvZm9sZGluZy9jc3R5bGUuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9tYXRjaGluZ19icmFjZV9vdXRkZW50LmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvdGVycmFmb3JtLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvdGVycmFmb3JtX2hpZ2hsaWdodF9ydWxlcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi8uLi9saWIvb29wXCIpO1xudmFyIFJhbmdlID0gcmVxdWlyZShcIi4uLy4uL3JhbmdlXCIpLlJhbmdlO1xudmFyIEJhc2VGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRfbW9kZVwiKS5Gb2xkTW9kZTtcblxudmFyIEZvbGRNb2RlID0gZXhwb3J0cy5Gb2xkTW9kZSA9IGZ1bmN0aW9uKGNvbW1lbnRSZWdleCkge1xuICAgIGlmIChjb21tZW50UmVnZXgpIHtcbiAgICAgICAgdGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIgPSBuZXcgUmVnRXhwKFxuICAgICAgICAgICAgdGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIuc291cmNlLnJlcGxhY2UoL1xcfFtefF0qPyQvLCBcInxcIiArIGNvbW1lbnRSZWdleC5zdGFydClcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5mb2xkaW5nU3RvcE1hcmtlciA9IG5ldyBSZWdFeHAoXG4gICAgICAgICAgICB0aGlzLmZvbGRpbmdTdG9wTWFya2VyLnNvdXJjZS5yZXBsYWNlKC9cXHxbXnxdKj8kLywgXCJ8XCIgKyBjb21tZW50UmVnZXguZW5kKVxuICAgICAgICApO1xuICAgIH1cbn07XG5vb3AuaW5oZXJpdHMoRm9sZE1vZGUsIEJhc2VGb2xkTW9kZSk7XG5cbihmdW5jdGlvbigpIHtcbiAgICBcbiAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlciA9IC8oW1xce1xcW1xcKF0pW15cXH1cXF1cXCldKiR8XlxccyooXFwvXFwqKS87XG4gICAgdGhpcy5mb2xkaW5nU3RvcE1hcmtlciA9IC9eW15cXFtcXHtcXChdKihbXFx9XFxdXFwpXSl8XltcXHNcXCpdKihcXCpcXC8pLztcbiAgICB0aGlzLnNpbmdsZUxpbmVCbG9ja0NvbW1lbnRSZT0gL15cXHMqKFxcL1xcKikuKlxcKlxcL1xccyokLztcbiAgICB0aGlzLnRyaXBsZVN0YXJCbG9ja0NvbW1lbnRSZSA9IC9eXFxzKihcXC9cXCpcXCpcXCopLipcXCpcXC9cXHMqJC87XG4gICAgdGhpcy5zdGFydFJlZ2lvblJlID0gL15cXHMqKFxcL1xcKnxcXC9cXC8pIz9yZWdpb25cXGIvO1xuICAgIFxuICAgIC8vcHJldmVudCBuYW1pbmcgY29uZmxpY3Qgd2l0aCBhbnkgbW9kZXMgdGhhdCBpbmhlcml0IGZyb20gY3N0eWxlIGFuZCBvdmVycmlkZSB0aGlzIChsaWtlIGNzaGFycClcbiAgICB0aGlzLl9nZXRGb2xkV2lkZ2V0QmFzZSA9IHRoaXMuZ2V0Rm9sZFdpZGdldDtcbiAgICBcbiAgICAvKipcbiAgICAgKiBHZXRzIGZvbGQgd2lkZ2V0IHdpdGggc29tZSBub24tc3RhbmRhcmQgZXh0cmFzOlxuICAgICAqXG4gICAgICogQGV4YW1wbGUgbGluZUNvbW1lbnRSZWdpb25TdGFydFxuICAgICAqICAgICAgLy8jcmVnaW9uIFtvcHRpb25hbCBkZXNjcmlwdGlvbl1cbiAgICAgKlxuICAgICAqIEBleGFtcGxlIGJsb2NrQ29tbWVudFJlZ2lvblN0YXJ0XG4gICAgICogICAgICAvKiNyZWdpb24gW29wdGlvbmFsIGRlc2NyaXB0aW9uXSAqWy9dXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSB0cmlwbGVTdGFyRm9sZGluZ1NlY3Rpb25cbiAgICAgKiAgICAgIC8qKiogdGhpcyBmb2xkcyBldmVuIHRob3VnaCAxIGxpbmUgYmVjYXVzZSBpdCBoYXMgMyBzdGFycyAqKipbL11cbiAgICAgKiBcbiAgICAgKiBAbm90ZSB0aGUgcG91bmQgc3ltYm9sIGZvciByZWdpb24gdGFncyBpcyBvcHRpb25hbFxuICAgICAqL1xuICAgIHRoaXMuZ2V0Rm9sZFdpZGdldCA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgXG4gICAgICAgIGlmICh0aGlzLnNpbmdsZUxpbmVCbG9ja0NvbW1lbnRSZS50ZXN0KGxpbmUpKSB7XG4gICAgICAgICAgICAvLyBObyB3aWRnZXQgZm9yIHNpbmdsZSBsaW5lIGJsb2NrIGNvbW1lbnQgdW5sZXNzIHJlZ2lvbiBvciB0cmlwbGUgc3RhclxuICAgICAgICAgICAgaWYgKCF0aGlzLnN0YXJ0UmVnaW9uUmUudGVzdChsaW5lKSAmJiAhdGhpcy50cmlwbGVTdGFyQmxvY2tDb21tZW50UmUudGVzdChsaW5lKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICB2YXIgZncgPSB0aGlzLl9nZXRGb2xkV2lkZ2V0QmFzZShzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdyk7XG4gICAgXG4gICAgICAgIGlmICghZncgJiYgdGhpcy5zdGFydFJlZ2lvblJlLnRlc3QobGluZSkpXG4gICAgICAgICAgICByZXR1cm4gXCJzdGFydFwiOyAvLyBsaW5lQ29tbWVudFJlZ2lvblN0YXJ0XG4gICAgXG4gICAgICAgIHJldHVybiBmdztcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0UmFuZ2UgPSBmdW5jdGlvbihzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdywgZm9yY2VNdWx0aWxpbmUpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLnN0YXJ0UmVnaW9uUmUudGVzdChsaW5lKSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldENvbW1lbnRSZWdpb25CbG9jayhzZXNzaW9uLCBsaW5lLCByb3cpO1xuICAgICAgICBcbiAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCh0aGlzLmZvbGRpbmdTdGFydE1hcmtlcik7XG4gICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgdmFyIGkgPSBtYXRjaC5pbmRleDtcblxuICAgICAgICAgICAgaWYgKG1hdGNoWzFdKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm9wZW5pbmdCcmFja2V0QmxvY2soc2Vzc2lvbiwgbWF0Y2hbMV0sIHJvdywgaSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgcmFuZ2UgPSBzZXNzaW9uLmdldENvbW1lbnRGb2xkUmFuZ2Uocm93LCBpICsgbWF0Y2hbMF0ubGVuZ3RoLCAxKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHJhbmdlICYmICFyYW5nZS5pc011bHRpTGluZSgpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZvcmNlTXVsdGlsaW5lKSB7XG4gICAgICAgICAgICAgICAgICAgIHJhbmdlID0gdGhpcy5nZXRTZWN0aW9uUmFuZ2Uoc2Vzc2lvbiwgcm93KTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZvbGRTdHlsZSAhPSBcImFsbFwiKVxuICAgICAgICAgICAgICAgICAgICByYW5nZSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiByYW5nZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmb2xkU3R5bGUgPT09IFwibWFya2JlZ2luXCIpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCh0aGlzLmZvbGRpbmdTdG9wTWFya2VyKTtcbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICB2YXIgaSA9IG1hdGNoLmluZGV4ICsgbWF0Y2hbMF0ubGVuZ3RoO1xuXG4gICAgICAgICAgICBpZiAobWF0Y2hbMV0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2xvc2luZ0JyYWNrZXRCbG9jayhzZXNzaW9uLCBtYXRjaFsxXSwgcm93LCBpKTtcblxuICAgICAgICAgICAgcmV0dXJuIHNlc3Npb24uZ2V0Q29tbWVudEZvbGRSYW5nZShyb3csIGksIC0xKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgXG4gICAgdGhpcy5nZXRTZWN0aW9uUmFuZ2UgPSBmdW5jdGlvbihzZXNzaW9uLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgdmFyIHN0YXJ0SW5kZW50ID0gbGluZS5zZWFyY2goL1xcUy8pO1xuICAgICAgICB2YXIgc3RhcnRSb3cgPSByb3c7XG4gICAgICAgIHZhciBzdGFydENvbHVtbiA9IGxpbmUubGVuZ3RoO1xuICAgICAgICByb3cgPSByb3cgKyAxO1xuICAgICAgICB2YXIgZW5kUm93ID0gcm93O1xuICAgICAgICB2YXIgbWF4Um93ID0gc2Vzc2lvbi5nZXRMZW5ndGgoKTtcbiAgICAgICAgd2hpbGUgKCsrcm93IDwgbWF4Um93KSB7XG4gICAgICAgICAgICBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgICAgICB2YXIgaW5kZW50ID0gbGluZS5zZWFyY2goL1xcUy8pO1xuICAgICAgICAgICAgaWYgKGluZGVudCA9PT0gLTEpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICBpZiAgKHN0YXJ0SW5kZW50ID4gaW5kZW50KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgdmFyIHN1YlJhbmdlID0gdGhpcy5nZXRGb2xkV2lkZ2V0UmFuZ2Uoc2Vzc2lvbiwgXCJhbGxcIiwgcm93KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHN1YlJhbmdlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN1YlJhbmdlLnN0YXJ0LnJvdyA8PSBzdGFydFJvdykge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN1YlJhbmdlLmlzTXVsdGlMaW5lKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcm93ID0gc3ViUmFuZ2UuZW5kLnJvdztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXJ0SW5kZW50ID09IGluZGVudCkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbmRSb3cgPSByb3c7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBuZXcgUmFuZ2Uoc3RhcnRSb3csIHN0YXJ0Q29sdW1uLCBlbmRSb3csIHNlc3Npb24uZ2V0TGluZShlbmRSb3cpLmxlbmd0aCk7XG4gICAgfTtcbiAgICBcbiAgICAvKipcbiAgICAgKiBnZXRzIGNvbW1lbnQgcmVnaW9uIGJsb2NrIHdpdGggZW5kIHJlZ2lvbiBhc3N1bWVkIHRvIGJlIHN0YXJ0IG9mIGNvbW1lbnQgaW4gYW55IGNzdHlsZSBtb2RlIG9yIFNRTCBtb2RlICgtLSkgd2hpY2ggaW5oZXJpdHMgZnJvbSB0aGlzLlxuICAgICAqIFRoZXJlIG1heSBvcHRpb25hbGx5IGJlIGEgcG91bmQgc3ltYm9sIGJlZm9yZSB0aGUgcmVnaW9uL2VuZHJlZ2lvbiBzdGF0ZW1lbnRcbiAgICAgKi9cbiAgICB0aGlzLmdldENvbW1lbnRSZWdpb25CbG9jayA9IGZ1bmN0aW9uKHNlc3Npb24sIGxpbmUsIHJvdykge1xuICAgICAgICB2YXIgc3RhcnRDb2x1bW4gPSBsaW5lLnNlYXJjaCgvXFxzKiQvKTtcbiAgICAgICAgdmFyIG1heFJvdyA9IHNlc3Npb24uZ2V0TGVuZ3RoKCk7XG4gICAgICAgIHZhciBzdGFydFJvdyA9IHJvdztcbiAgICAgICAgXG4gICAgICAgIHZhciByZSA9IC9eXFxzKig/OlxcL1xcKnxcXC9cXC98LS0pIz8oZW5kKT9yZWdpb25cXGIvO1xuICAgICAgICB2YXIgZGVwdGggPSAxO1xuICAgICAgICB3aGlsZSAoKytyb3cgPCBtYXhSb3cpIHtcbiAgICAgICAgICAgIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgICAgIHZhciBtID0gcmUuZXhlYyhsaW5lKTtcbiAgICAgICAgICAgIGlmICghbSkgY29udGludWU7XG4gICAgICAgICAgICBpZiAobVsxXSkgZGVwdGgtLTtcbiAgICAgICAgICAgIGVsc2UgZGVwdGgrKztcblxuICAgICAgICAgICAgaWYgKCFkZXB0aCkgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZW5kUm93ID0gcm93O1xuICAgICAgICBpZiAoZW5kUm93ID4gc3RhcnRSb3cpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmFuZ2Uoc3RhcnRSb3csIHN0YXJ0Q29sdW1uLCBlbmRSb3csIGxpbmUubGVuZ3RoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbn0pLmNhbGwoRm9sZE1vZGUucHJvdG90eXBlKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgUmFuZ2UgPSByZXF1aXJlKFwiLi4vcmFuZ2VcIikuUmFuZ2U7XG5cbnZhciBNYXRjaGluZ0JyYWNlT3V0ZGVudCA9IGZ1bmN0aW9uKCkge307XG5cbihmdW5jdGlvbigpIHtcblxuICAgIHRoaXMuY2hlY2tPdXRkZW50ID0gZnVuY3Rpb24obGluZSwgaW5wdXQpIHtcbiAgICAgICAgaWYgKCEgL15cXHMrJC8udGVzdChsaW5lKSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgICByZXR1cm4gL15cXHMqXFx9Ly50ZXN0KGlucHV0KTtcbiAgICB9O1xuXG4gICAgdGhpcy5hdXRvT3V0ZGVudCA9IGZ1bmN0aW9uKGRvYywgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gZG9jLmdldExpbmUocm93KTtcbiAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCgvXihcXHMqXFx9KS8pO1xuXG4gICAgICAgIGlmICghbWF0Y2gpIHJldHVybiAwO1xuXG4gICAgICAgIHZhciBjb2x1bW4gPSBtYXRjaFsxXS5sZW5ndGg7XG4gICAgICAgIHZhciBvcGVuQnJhY2VQb3MgPSBkb2MuZmluZE1hdGNoaW5nQnJhY2tldCh7cm93OiByb3csIGNvbHVtbjogY29sdW1ufSk7XG5cbiAgICAgICAgaWYgKCFvcGVuQnJhY2VQb3MgfHwgb3BlbkJyYWNlUG9zLnJvdyA9PSByb3cpIHJldHVybiAwO1xuXG4gICAgICAgIHZhciBpbmRlbnQgPSB0aGlzLiRnZXRJbmRlbnQoZG9jLmdldExpbmUob3BlbkJyYWNlUG9zLnJvdykpO1xuICAgICAgICBkb2MucmVwbGFjZShuZXcgUmFuZ2Uocm93LCAwLCByb3csIGNvbHVtbi0xKSwgaW5kZW50KTtcbiAgICB9O1xuXG4gICAgdGhpcy4kZ2V0SW5kZW50ID0gZnVuY3Rpb24obGluZSkge1xuICAgICAgICByZXR1cm4gbGluZS5tYXRjaCgvXlxccyovKVswXTtcbiAgICB9O1xuXG59KS5jYWxsKE1hdGNoaW5nQnJhY2VPdXRkZW50LnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTWF0Y2hpbmdCcmFjZU91dGRlbnQgPSBNYXRjaGluZ0JyYWNlT3V0ZGVudDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dE1vZGUgPSByZXF1aXJlKFwiLi90ZXh0XCIpLk1vZGU7XG52YXIgVGVycmFmb3JtSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90ZXJyYWZvcm1faGlnaGxpZ2h0X3J1bGVzXCIpLlRlcnJhZm9ybUhpZ2hsaWdodFJ1bGVzO1xudmFyIENTdHlsZUZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZGluZy9jc3R5bGVcIikuRm9sZE1vZGU7XG52YXIgTWF0Y2hpbmdCcmFjZU91dGRlbnQgPSByZXF1aXJlKFwiLi9tYXRjaGluZ19icmFjZV9vdXRkZW50XCIpLk1hdGNoaW5nQnJhY2VPdXRkZW50O1xuXG52YXIgTW9kZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBUZXh0TW9kZS5jYWxsKHRoaXMpO1xuICAgIHRoaXMuSGlnaGxpZ2h0UnVsZXMgPSBUZXJyYWZvcm1IaWdobGlnaHRSdWxlcztcbiAgICB0aGlzLiRvdXRkZW50ID0gbmV3IE1hdGNoaW5nQnJhY2VPdXRkZW50KCk7XG4gICAgdGhpcy4kYmVoYXZpb3VyID0gdGhpcy4kZGVmYXVsdEJlaGF2aW91cjtcbiAgICB0aGlzLmZvbGRpbmdSdWxlcyA9IG5ldyBDU3R5bGVGb2xkTW9kZSgpO1xufTtcblxub29wLmluaGVyaXRzKE1vZGUsIFRleHRNb2RlKTtcblxuXG4oZnVuY3Rpb24gKCkge1xuICAgIHRoaXMubGluZUNvbW1lbnRTdGFydCA9IFtcIiNcIiwgXCIvL1wiXTtcbiAgICB0aGlzLmJsb2NrQ29tbWVudCA9IHtzdGFydDogXCIvKlwiLCBlbmQ6IFwiKi9cIn07XG4gICAgXG4gICAgdGhpcy4kaWQgPSBcImFjZS9tb2RlL3RlcnJhZm9ybVwiO1xufSkuY2FsbChNb2RlLnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTW9kZSA9IE1vZGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcbnZhciBUZXJyYWZvcm1IaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uICgpIHtcblxuXG4gICAgdGhpcy4kcnVsZXMgPSB7XG4gICAgICAgIFwic3RhcnRcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuOiBbJ3N0b3JhZ2UuZnVuY3Rpb24udGVycmFmb3JtJ10sXG4gICAgICAgICAgICAgICAgcmVnZXg6ICdcXFxcYihvdXRwdXR8cmVzb3VyY2V8ZGF0YXx2YXJpYWJsZXxtb2R1bGV8ZXhwb3J0KVxcXFxiJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJ2YXJpYWJsZS50ZXJyYWZvcm1cIixcbiAgICAgICAgICAgICAgICByZWdleDogXCJcXFxcJFxcXFxzXCIsXG4gICAgICAgICAgICAgICAgcHVzaDogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJrZXl3b3JkLnRlcnJhZm9ybVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXg6IFwiKC12YXItZmlsZXwtdmFyKVwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiBcInZhcmlhYmxlLnRlcnJhZm9ybVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXg6IFwiXFxcXG58JFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgICAgIHtpbmNsdWRlOiBcInN0cmluZ3NcIn0sXG4gICAgICAgICAgICAgICAgICAgIHtpbmNsdWRlOiBcInZhcmlhYmxlc1wifSxcbiAgICAgICAgICAgICAgICAgICAge2luY2x1ZGU6IFwib3BlcmF0b3JzXCJ9LFxuXG4gICAgICAgICAgICAgICAgICAgIHtkZWZhdWx0VG9rZW46IFwidGV4dFwifVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwibGFuZ3VhZ2Uuc3VwcG9ydC5jbGFzc1wiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFxiKHRpbWVvdXRzfHByb3ZpZGVyfGNvbm5lY3Rpb258cHJvdmlzaW9uZXJ8bGlmZWN5Y2xlcHJvdmlkZXJ8YXRsYXMpXFxcXGJcIlxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInNpbmdsZWxpbmUuY29tbWVudC50ZXJyYWZvcm1cIixcbiAgICAgICAgICAgICAgICByZWdleDogJyMuKiQnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInNpbmdsZWxpbmUuY29tbWVudC50ZXJyYWZvcm1cIixcbiAgICAgICAgICAgICAgICByZWdleDogJy8vLiokJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJtdWx0aWxpbmUuY29tbWVudC5iZWdpbi50ZXJyYWZvcm1cIixcbiAgICAgICAgICAgICAgICByZWdleDogL1xcL1xcKi8sXG4gICAgICAgICAgICAgICAgcHVzaDogXCJibG9ja0NvbW1lbnRcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJzdG9yYWdlLmZ1bmN0aW9uLnRlcnJhZm9ybVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIl5cXFxccyoobG9jYWxzfHRlcnJhZm9ybSlcXFxccyp7XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwicGFyZW4ubHBhcmVuXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiW1soe11cIlxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInBhcmVuLnJwYXJlblwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIltcXFxcXSl9XVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge2luY2x1ZGU6IFwiY29uc3RhbnRzXCJ9LFxuICAgICAgICAgICAge2luY2x1ZGU6IFwic3RyaW5nc1wifSxcbiAgICAgICAgICAgIHtpbmNsdWRlOiBcIm9wZXJhdG9yc1wifSxcbiAgICAgICAgICAgIHtpbmNsdWRlOiBcInZhcmlhYmxlc1wifVxuICAgICAgICBdLFxuICAgICAgICBibG9ja0NvbW1lbnQ6IFt7XG4gICAgICAgICAgICByZWdleDogL1xcKlxcLy8sXG4gICAgICAgICAgICB0b2tlbjogXCJtdWx0aWxpbmUuY29tbWVudC5lbmQudGVycmFmb3JtXCIsXG4gICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJjb21tZW50XCJcbiAgICAgICAgfV0sXG4gICAgICAgIFwiY29uc3RhbnRzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5sYW5ndWFnZS50ZXJyYWZvcm1cIixcbiAgICAgICAgICAgICAgICByZWdleDogXCJcXFxcYih0cnVlfGZhbHNlfHllc3xub3xvbnxvZmZ8RU9GKVxcXFxiXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQubnVtZXJpYy50ZXJyYWZvcm1cIixcbiAgICAgICAgICAgICAgICByZWdleDogXCIoXFxcXGIoWzAtOV0rKShba0ttTWdHXWI/KT9cXFxcYil8KFxcXFxiKDB4WzAtOUEtRmEtZl0rKShba0ttTWdHXWI/KT9cXFxcYilcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBcInZhcmlhYmxlc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFtcInZhcmlhYmxlLmFzc2lnbm1lbnQudGVycmFmb3JtXCIsIFwia2V5d29yZC5vcGVyYXRvclwiXSxcbiAgICAgICAgICAgICAgICByZWdleDogXCJcXFxcYihbYS16QS1aX10rKShcXFxccyo9KVwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIFwiaW50ZXJwb2xhdGVkX3ZhcmlhYmxlc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwidmFyaWFibGUudGVycmFmb3JtXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiXFxcXGIodmFyfHNlbGZ8Y291bnR8cGF0aHxsb2NhbClcXFxcYig/OlxcXFwuKlthLXpBLVpfLV0qKT9cIlxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBcInN0cmluZ3NcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInB1bmN0dWF0aW9uLnF1b3RlLnRlcnJhZm9ybVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIidcIixcbiAgICAgICAgICAgICAgICBwdXNoOlxuICAgICAgICAgICAgICAgICAgICBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46ICdwdW5jdHVhdGlvbi5xdW90ZS50ZXJyYWZvcm0nLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXg6IFwiJ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dDogJ3BvcCdcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtpbmNsdWRlOiBcImVzY2FwZWRfY2hhcnNcIn0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7ZGVmYXVsdFRva2VuOiAnc3RyaW5nJ31dXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInB1bmN0dWF0aW9uLnF1b3RlLnRlcnJhZm9ybVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAnXCInLFxuICAgICAgICAgICAgICAgIHB1c2g6XG4gICAgICAgICAgICAgICAgICAgIFt7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbjogJ3B1bmN0dWF0aW9uLnF1b3RlLnRlcnJhZm9ybScsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWdleDogJ1wiJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHQ6ICdwb3AnXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7aW5jbHVkZTogXCJpbnRlcnBvbGF0aW9uXCJ9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2luY2x1ZGU6IFwiZXNjYXBlZF9jaGFyc1wifSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtkZWZhdWx0VG9rZW46ICdzdHJpbmcnfV1cbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgXCJlc2NhcGVkX2NoYXJzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5lc2NhcGVkX2NoYXIudGVycmFmb3JtXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiXFxcXFxcXFwuXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgXCJvcGVyYXRvcnNcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcImtleXdvcmQub3BlcmF0b3JcIixcbiAgICAgICAgICAgICAgICByZWdleDogXCJcXFxcP3w6fD09fCE9fD58PHw+PXw8PXwmJnxcXFxcfFxcXFxcXHx8IXwlfCZ8XFxcXCp8XFxcXCt8XFxcXC18L3w9XCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgXCJpbnRlcnBvbGF0aW9uXCI6IFtcbiAgICAgICAgICAgIHsvLyBUT0RPOiBkb3VibGUgJFxuICAgICAgICAgICAgICAgIHRva2VuOiBcInB1bmN0dWF0aW9uLmludGVycG9sYXRlZC5iZWdpbi50ZXJyYWZvcm1cIixcbiAgICAgICAgICAgICAgICByZWdleDogXCJcXFxcJD9cXFxcJFxcXFx7XCIsXG4gICAgICAgICAgICAgICAgcHVzaDogW3tcbiAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwicHVuY3R1YXRpb24uaW50ZXJwb2xhdGVkLmVuZC50ZXJyYWZvcm1cIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXg6IFwiXFxcXH1cIixcbiAgICAgICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtpbmNsdWRlOiBcImludGVycG9sYXRlZF92YXJpYWJsZXNcIn0sXG4gICAgICAgICAgICAgICAgICAgIHtpbmNsdWRlOiBcIm9wZXJhdG9yc1wifSxcbiAgICAgICAgICAgICAgICAgICAge2luY2x1ZGU6IFwiY29uc3RhbnRzXCJ9LFxuICAgICAgICAgICAgICAgICAgICB7aW5jbHVkZTogXCJzdHJpbmdzXCJ9LFxuICAgICAgICAgICAgICAgICAgICB7aW5jbHVkZTogXCJmdW5jdGlvbnNcIn0sXG4gICAgICAgICAgICAgICAgICAgIHtpbmNsdWRlOiBcInBhcmVudGhlc2lzXCJ9LFxuICAgICAgICAgICAgICAgICAgICB7ZGVmYXVsdFRva2VuOiBcInB1bmN0dWF0aW9uXCJ9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBcImZ1bmN0aW9uc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwia2V5d29yZC5mdW5jdGlvbi50ZXJyYWZvcm1cIixcbiAgICAgICAgICAgICAgICByZWdleDogXCJcXFxcYihhYnN8YmFzZW5hbWV8YmFzZTY0ZGVjb2RlfGJhc2U2NGVuY29kZXxiYXNlNjRnemlwfGJhc2U2NHNoYTI1NnxiYXNlNjRzaGE1MTJ8YmNyeXB0fGNlaWx8Y2hvbXB8Y2h1bmtsaXN0fGNpZHJob3N0fGNpZHJuZXRtYXNrfGNpZHJzdWJuZXR8Y29hbGVzY2V8Y29hbGVzY2VsaXN0fGNvbXBhY3R8Y29uY2F0fGNvbnRhaW5zfGRpcm5hbWV8ZGlzdGluY3R8ZWxlbWVudHxmaWxlfGZsb29yfGZsYXR0ZW58Zm9ybWF0fGZvcm1hdGxpc3R8aW5kZW50fGluZGV4fGpvaW58anNvbmVuY29kZXxrZXlzfGxlbmd0aHxsaXN0fGxvZ3xsb29rdXB8bG93ZXJ8bWFwfG1hdGNoa2V5c3xtYXh8bWVyZ2V8bWlufG1kNXxwYXRoZXhwYW5kfHBvd3xyZXBsYWNlfHJzYWRlY3J5cHR8c2hhMXxzaGEyNTZ8c2hhNTEyfHNpZ251bXxzbGljZXxzb3J0fHNwbGl0fHN1YnN0cnx0aW1lc3RhbXB8dGltZWFkZHx0aXRsZXx0cmFuc3Bvc2V8dHJpbXNwYWNlfHVwcGVyfHVybGVuY29kZXx1dWlkfHZhbHVlc3x6aXBtYXApXFxcXGJcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBcInBhcmVudGhlc2lzXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJwYXJlbi5scGFyZW5cIixcbiAgICAgICAgICAgICAgICByZWdleDogXCJcXFxcW1wiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInBhcmVuLnJwYXJlblwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFxdXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH07XG4gICAgdGhpcy5ub3JtYWxpemVSdWxlcygpO1xufTtcblxub29wLmluaGVyaXRzKFRlcnJhZm9ybUhpZ2hsaWdodFJ1bGVzLCBUZXh0SGlnaGxpZ2h0UnVsZXMpO1xuXG5leHBvcnRzLlRlcnJhZm9ybUhpZ2hsaWdodFJ1bGVzID0gVGVycmFmb3JtSGlnaGxpZ2h0UnVsZXM7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=