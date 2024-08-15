"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[1092],{

/***/ 42124:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

var DocCommentHighlightRules = function () {
    this.$rules = {
        "start": [
            {
                token: "comment.doc.tag",
                regex: "@\\w+(?=\\s|$)"
            }, DocCommentHighlightRules.getTagRule(), {
                defaultToken: "comment.doc.body",
                caseInsensitive: true
            }
        ]
    };
};

oop.inherits(DocCommentHighlightRules, TextHighlightRules);

DocCommentHighlightRules.getTagRule = function(start) {
    return {
        token : "comment.doc.tag.storage.type",
        regex : "\\b(?:TODO|FIXME|XXX|HACK)\\b"
    };
};

DocCommentHighlightRules.getStartRule = function(start) {
    return {
        token : "comment.doc", // doc comment
        regex: /\/\*\*(?!\/)/,
        next  : start
    };
};

DocCommentHighlightRules.getEndRule = function (start) {
    return {
        token : "comment.doc", // closing comment
        regex : "\\*\\/",
        next  : start
    };
};


exports.l = DocCommentHighlightRules;


/***/ }),

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

/***/ 91092:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var scadHighlightRules = (__webpack_require__(46615)/* .scadHighlightRules */ .h);
var MatchingBraceOutdent = (__webpack_require__(28670).MatchingBraceOutdent);
var CStyleFoldMode = (__webpack_require__(93887)/* .FoldMode */ .l);

var Mode = function() {
    this.HighlightRules = scadHighlightRules;
    this.$outdent = new MatchingBraceOutdent();
    this.$behaviour = this.$defaultBehaviour;
    this.foldingRules = new CStyleFoldMode();
};
oop.inherits(Mode, TextMode);

(function() {

    this.lineCommentStart = "//";
    this.blockComment = {start: "/*", end: "*/"};

    this.getNextLineIndent = function(state, line, tab) {
        var indent = this.$getIndent(line);

        var tokenizedLine = this.getTokenizer().getLineTokens(line, state);
        var tokens = tokenizedLine.tokens;
        var endState = tokenizedLine.state;

        if (tokens.length && tokens[tokens.length-1].type == "comment") {
            return indent;
        }

        if (state == "start") {
            var match = line.match(/^.*[\{\(\[]\s*$/);
            if (match) {
                indent += tab;
            }
        } else if (state == "doc-start") {
            if (endState == "start") {
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

    this.$id = "ace/mode/scad";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 46615:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var lang = __webpack_require__(39955);
var DocCommentHighlightRules = (__webpack_require__(42124)/* .DocCommentHighlightRules */ .l);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

var scadHighlightRules = function() {
    var keywordMapper = this.createKeywordMapper({
        "variable.language": "this",
        "keyword": "module|if|else|for",
        "constant.language": "NULL"
    }, "identifier");

    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used

    this.$rules = {
        "start" : [
            {
                token : "comment",
                regex : "\\/\\/.*$"
            },
            DocCommentHighlightRules.getStartRule("start"),
            {
                token : "comment", // multi line comment
                regex : "\\/\\*",
                next : "comment"
            }, {
                token : "string", // single line
                regex : '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'
            }, {
                token : "string", // multi line string start
                regex : '["].*\\\\$',
                next : "qqstring"
            }, {
                token : "string", // single line
                regex : "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"
            }, {
                token : "string", // multi line string start
                regex : "['].*\\\\$",
                next : "qstring"
            }, {
                token : "constant.numeric", // hex
                regex : "0[xX][0-9a-fA-F]+\\b"
            }, {
                token : "constant.numeric", // float
                regex : "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
            }, {
              token : "constant", // <CONSTANT>
              regex : "<[a-zA-Z0-9.]+>"
            }, {
              token : "keyword", // pre-compiler directivs
              regex : "(?:use|include)"
            }, {
                token : keywordMapper,
                regex : "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
            }, {
                token : "keyword.operator",
                regex : "!|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|==|=|!=|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^=|\\b(?:in|new|delete|typeof|void)"
            }, {
                token : "paren.lparen",
                regex : "[[({]"
            }, {
                token : "paren.rparen",
                regex : "[\\])}]"
            }, {
                token : "text",
                regex : "\\s+"
            }
        ],
        "comment" : [
            {
                token : "comment", // closing comment
                regex : "\\*\\/",
                next : "start"
            }, {
                defaultToken : "comment"
            }
        ],
        "qqstring" : [
            {
                token : "string",
                regex : '(?:(?:\\\\.)|(?:[^"\\\\]))*?"',
                next : "start"
            }, {
                token : "string",
                regex : '.+'
            }
        ],
        "qstring" : [
            {
                token : "string",
                regex : "(?:(?:\\\\.)|(?:[^'\\\\]))*?'",
                next : "start"
            }, {
                token : "string",
                regex : '.+'
            }
        ]
    };
    
    this.embedRules(DocCommentHighlightRules, "doc-",
        [ DocCommentHighlightRules.getEndRule("start") ]);
};

oop.inherits(scadHighlightRules, TextHighlightRules);

exports.h = scadHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUMsSUFBWTtBQUM5QixXQUFXLG1CQUFPLENBQUMsS0FBYTtBQUNoQywrQkFBK0IsOERBQWlFO0FBQ2hHLHlCQUF5Qix3REFBb0Q7O0FBRTdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsNkJBQTZCO0FBQzdCLGFBQWE7QUFDYjtBQUNBLCtCQUErQjtBQUMvQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxTQUEwQiIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvZG9jX2NvbW1lbnRfaGlnaGxpZ2h0X3J1bGVzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvZm9sZGluZy9jc3R5bGUuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9tYXRjaGluZ19icmFjZV9vdXRkZW50LmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvc2NhZC5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL3NjYWRfaGlnaGxpZ2h0X3J1bGVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xuXG52YXIgRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuJHJ1bGVzID0ge1xuICAgICAgICBcInN0YXJ0XCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJjb21tZW50LmRvYy50YWdcIixcbiAgICAgICAgICAgICAgICByZWdleDogXCJAXFxcXHcrKD89XFxcXHN8JClcIlxuICAgICAgICAgICAgfSwgRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLmdldFRhZ1J1bGUoKSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJjb21tZW50LmRvYy5ib2R5XCIsXG4gICAgICAgICAgICAgICAgY2FzZUluc2Vuc2l0aXZlOiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9O1xufTtcblxub29wLmluaGVyaXRzKERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLmdldFRhZ1J1bGUgPSBmdW5jdGlvbihzdGFydCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHRva2VuIDogXCJjb21tZW50LmRvYy50YWcuc3RvcmFnZS50eXBlXCIsXG4gICAgICAgIHJlZ2V4IDogXCJcXFxcYig/OlRPRE98RklYTUV8WFhYfEhBQ0spXFxcXGJcIlxuICAgIH07XG59O1xuXG5Eb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMuZ2V0U3RhcnRSdWxlID0gZnVuY3Rpb24oc3RhcnQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0b2tlbiA6IFwiY29tbWVudC5kb2NcIiwgLy8gZG9jIGNvbW1lbnRcbiAgICAgICAgcmVnZXg6IC9cXC9cXCpcXCooPyFcXC8pLyxcbiAgICAgICAgbmV4dCAgOiBzdGFydFxuICAgIH07XG59O1xuXG5Eb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMuZ2V0RW5kUnVsZSA9IGZ1bmN0aW9uIChzdGFydCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHRva2VuIDogXCJjb21tZW50LmRvY1wiLCAvLyBjbG9zaW5nIGNvbW1lbnRcbiAgICAgICAgcmVnZXggOiBcIlxcXFwqXFxcXC9cIixcbiAgICAgICAgbmV4dCAgOiBzdGFydFxuICAgIH07XG59O1xuXG5cbmV4cG9ydHMuRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzID0gRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vLi4vbGliL29vcFwiKTtcbnZhciBSYW5nZSA9IHJlcXVpcmUoXCIuLi8uLi9yYW5nZVwiKS5SYW5nZTtcbnZhciBCYXNlRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9mb2xkX21vZGVcIikuRm9sZE1vZGU7XG5cbnZhciBGb2xkTW9kZSA9IGV4cG9ydHMuRm9sZE1vZGUgPSBmdW5jdGlvbihjb21tZW50UmVnZXgpIHtcbiAgICBpZiAoY29tbWVudFJlZ2V4KSB7XG4gICAgICAgIHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyID0gbmV3IFJlZ0V4cChcbiAgICAgICAgICAgIHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyLnNvdXJjZS5yZXBsYWNlKC9cXHxbXnxdKj8kLywgXCJ8XCIgKyBjb21tZW50UmVnZXguc3RhcnQpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIgPSBuZXcgUmVnRXhwKFxuICAgICAgICAgICAgdGhpcy5mb2xkaW5nU3RvcE1hcmtlci5zb3VyY2UucmVwbGFjZSgvXFx8W158XSo/JC8sIFwifFwiICsgY29tbWVudFJlZ2V4LmVuZClcbiAgICAgICAgKTtcbiAgICB9XG59O1xub29wLmluaGVyaXRzKEZvbGRNb2RlLCBCYXNlRm9sZE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgXG4gICAgdGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIgPSAvKFtcXHtcXFtcXChdKVteXFx9XFxdXFwpXSokfF5cXHMqKFxcL1xcKikvO1xuICAgIHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIgPSAvXlteXFxbXFx7XFwoXSooW1xcfVxcXVxcKV0pfF5bXFxzXFwqXSooXFwqXFwvKS87XG4gICAgdGhpcy5zaW5nbGVMaW5lQmxvY2tDb21tZW50UmU9IC9eXFxzKihcXC9cXCopLipcXCpcXC9cXHMqJC87XG4gICAgdGhpcy50cmlwbGVTdGFyQmxvY2tDb21tZW50UmUgPSAvXlxccyooXFwvXFwqXFwqXFwqKS4qXFwqXFwvXFxzKiQvO1xuICAgIHRoaXMuc3RhcnRSZWdpb25SZSA9IC9eXFxzKihcXC9cXCp8XFwvXFwvKSM/cmVnaW9uXFxiLztcbiAgICBcbiAgICAvL3ByZXZlbnQgbmFtaW5nIGNvbmZsaWN0IHdpdGggYW55IG1vZGVzIHRoYXQgaW5oZXJpdCBmcm9tIGNzdHlsZSBhbmQgb3ZlcnJpZGUgdGhpcyAobGlrZSBjc2hhcnApXG4gICAgdGhpcy5fZ2V0Rm9sZFdpZGdldEJhc2UgPSB0aGlzLmdldEZvbGRXaWRnZXQ7XG4gICAgXG4gICAgLyoqXG4gICAgICogR2V0cyBmb2xkIHdpZGdldCB3aXRoIHNvbWUgbm9uLXN0YW5kYXJkIGV4dHJhczpcbiAgICAgKlxuICAgICAqIEBleGFtcGxlIGxpbmVDb21tZW50UmVnaW9uU3RhcnRcbiAgICAgKiAgICAgIC8vI3JlZ2lvbiBbb3B0aW9uYWwgZGVzY3JpcHRpb25dXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSBibG9ja0NvbW1lbnRSZWdpb25TdGFydFxuICAgICAqICAgICAgLyojcmVnaW9uIFtvcHRpb25hbCBkZXNjcmlwdGlvbl0gKlsvXVxuICAgICAqXG4gICAgICogQGV4YW1wbGUgdHJpcGxlU3RhckZvbGRpbmdTZWN0aW9uXG4gICAgICogICAgICAvKioqIHRoaXMgZm9sZHMgZXZlbiB0aG91Z2ggMSBsaW5lIGJlY2F1c2UgaXQgaGFzIDMgc3RhcnMgKioqWy9dXG4gICAgICogXG4gICAgICogQG5vdGUgdGhlIHBvdW5kIHN5bWJvbCBmb3IgcmVnaW9uIHRhZ3MgaXMgb3B0aW9uYWxcbiAgICAgKi9cbiAgICB0aGlzLmdldEZvbGRXaWRnZXQgPSBmdW5jdGlvbihzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdykge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgIFxuICAgICAgICBpZiAodGhpcy5zaW5nbGVMaW5lQmxvY2tDb21tZW50UmUudGVzdChsaW5lKSkge1xuICAgICAgICAgICAgLy8gTm8gd2lkZ2V0IGZvciBzaW5nbGUgbGluZSBibG9jayBjb21tZW50IHVubGVzcyByZWdpb24gb3IgdHJpcGxlIHN0YXJcbiAgICAgICAgICAgIGlmICghdGhpcy5zdGFydFJlZ2lvblJlLnRlc3QobGluZSkgJiYgIXRoaXMudHJpcGxlU3RhckJsb2NrQ29tbWVudFJlLnRlc3QobGluZSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgdmFyIGZ3ID0gdGhpcy5fZ2V0Rm9sZFdpZGdldEJhc2Uoc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpO1xuICAgIFxuICAgICAgICBpZiAoIWZ3ICYmIHRoaXMuc3RhcnRSZWdpb25SZS50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgcmV0dXJuIFwic3RhcnRcIjsgLy8gbGluZUNvbW1lbnRSZWdpb25TdGFydFxuICAgIFxuICAgICAgICByZXR1cm4gZnc7XG4gICAgfTtcblxuICAgIHRoaXMuZ2V0Rm9sZFdpZGdldFJhbmdlID0gZnVuY3Rpb24oc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3csIGZvcmNlTXVsdGlsaW5lKSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5zdGFydFJlZ2lvblJlLnRlc3QobGluZSkpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRDb21tZW50UmVnaW9uQmxvY2soc2Vzc2lvbiwgbGluZSwgcm93KTtcbiAgICAgICAgXG4gICAgICAgIHZhciBtYXRjaCA9IGxpbmUubWF0Y2godGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIpO1xuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIHZhciBpID0gbWF0Y2guaW5kZXg7XG5cbiAgICAgICAgICAgIGlmIChtYXRjaFsxXSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5vcGVuaW5nQnJhY2tldEJsb2NrKHNlc3Npb24sIG1hdGNoWzFdLCByb3csIGkpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIHJhbmdlID0gc2Vzc2lvbi5nZXRDb21tZW50Rm9sZFJhbmdlKHJvdywgaSArIG1hdGNoWzBdLmxlbmd0aCwgMSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChyYW5nZSAmJiAhcmFuZ2UuaXNNdWx0aUxpbmUoKSkge1xuICAgICAgICAgICAgICAgIGlmIChmb3JjZU11bHRpbGluZSkge1xuICAgICAgICAgICAgICAgICAgICByYW5nZSA9IHRoaXMuZ2V0U2VjdGlvblJhbmdlKHNlc3Npb24sIHJvdyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChmb2xkU3R5bGUgIT0gXCJhbGxcIilcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2UgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gcmFuZ2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZm9sZFN0eWxlID09PSBcIm1hcmtiZWdpblwiKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHZhciBtYXRjaCA9IGxpbmUubWF0Y2godGhpcy5mb2xkaW5nU3RvcE1hcmtlcik7XG4gICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgdmFyIGkgPSBtYXRjaC5pbmRleCArIG1hdGNoWzBdLmxlbmd0aDtcblxuICAgICAgICAgICAgaWYgKG1hdGNoWzFdKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNsb3NpbmdCcmFja2V0QmxvY2soc2Vzc2lvbiwgbWF0Y2hbMV0sIHJvdywgaSk7XG5cbiAgICAgICAgICAgIHJldHVybiBzZXNzaW9uLmdldENvbW1lbnRGb2xkUmFuZ2Uocm93LCBpLCAtMSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFxuICAgIHRoaXMuZ2V0U2VjdGlvblJhbmdlID0gZnVuY3Rpb24oc2Vzc2lvbiwgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgIHZhciBzdGFydEluZGVudCA9IGxpbmUuc2VhcmNoKC9cXFMvKTtcbiAgICAgICAgdmFyIHN0YXJ0Um93ID0gcm93O1xuICAgICAgICB2YXIgc3RhcnRDb2x1bW4gPSBsaW5lLmxlbmd0aDtcbiAgICAgICAgcm93ID0gcm93ICsgMTtcbiAgICAgICAgdmFyIGVuZFJvdyA9IHJvdztcbiAgICAgICAgdmFyIG1heFJvdyA9IHNlc3Npb24uZ2V0TGVuZ3RoKCk7XG4gICAgICAgIHdoaWxlICgrK3JvdyA8IG1heFJvdykge1xuICAgICAgICAgICAgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICAgICAgdmFyIGluZGVudCA9IGxpbmUuc2VhcmNoKC9cXFMvKTtcbiAgICAgICAgICAgIGlmIChpbmRlbnQgPT09IC0xKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgaWYgIChzdGFydEluZGVudCA+IGluZGVudClcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIHZhciBzdWJSYW5nZSA9IHRoaXMuZ2V0Rm9sZFdpZGdldFJhbmdlKHNlc3Npb24sIFwiYWxsXCIsIHJvdyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChzdWJSYW5nZSkge1xuICAgICAgICAgICAgICAgIGlmIChzdWJSYW5nZS5zdGFydC5yb3cgPD0gc3RhcnRSb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzdWJSYW5nZS5pc011bHRpTGluZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJvdyA9IHN1YlJhbmdlLmVuZC5yb3c7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzdGFydEluZGVudCA9PSBpbmRlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZW5kUm93ID0gcm93O1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gbmV3IFJhbmdlKHN0YXJ0Um93LCBzdGFydENvbHVtbiwgZW5kUm93LCBzZXNzaW9uLmdldExpbmUoZW5kUm93KS5sZW5ndGgpO1xuICAgIH07XG4gICAgXG4gICAgLyoqXG4gICAgICogZ2V0cyBjb21tZW50IHJlZ2lvbiBibG9jayB3aXRoIGVuZCByZWdpb24gYXNzdW1lZCB0byBiZSBzdGFydCBvZiBjb21tZW50IGluIGFueSBjc3R5bGUgbW9kZSBvciBTUUwgbW9kZSAoLS0pIHdoaWNoIGluaGVyaXRzIGZyb20gdGhpcy5cbiAgICAgKiBUaGVyZSBtYXkgb3B0aW9uYWxseSBiZSBhIHBvdW5kIHN5bWJvbCBiZWZvcmUgdGhlIHJlZ2lvbi9lbmRyZWdpb24gc3RhdGVtZW50XG4gICAgICovXG4gICAgdGhpcy5nZXRDb21tZW50UmVnaW9uQmxvY2sgPSBmdW5jdGlvbihzZXNzaW9uLCBsaW5lLCByb3cpIHtcbiAgICAgICAgdmFyIHN0YXJ0Q29sdW1uID0gbGluZS5zZWFyY2goL1xccyokLyk7XG4gICAgICAgIHZhciBtYXhSb3cgPSBzZXNzaW9uLmdldExlbmd0aCgpO1xuICAgICAgICB2YXIgc3RhcnRSb3cgPSByb3c7XG4gICAgICAgIFxuICAgICAgICB2YXIgcmUgPSAvXlxccyooPzpcXC9cXCp8XFwvXFwvfC0tKSM/KGVuZCk/cmVnaW9uXFxiLztcbiAgICAgICAgdmFyIGRlcHRoID0gMTtcbiAgICAgICAgd2hpbGUgKCsrcm93IDwgbWF4Um93KSB7XG4gICAgICAgICAgICBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgICAgICB2YXIgbSA9IHJlLmV4ZWMobGluZSk7XG4gICAgICAgICAgICBpZiAoIW0pIGNvbnRpbnVlO1xuICAgICAgICAgICAgaWYgKG1bMV0pIGRlcHRoLS07XG4gICAgICAgICAgICBlbHNlIGRlcHRoKys7XG5cbiAgICAgICAgICAgIGlmICghZGVwdGgpIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGVuZFJvdyA9IHJvdztcbiAgICAgICAgaWYgKGVuZFJvdyA+IHN0YXJ0Um93KSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFJhbmdlKHN0YXJ0Um93LCBzdGFydENvbHVtbiwgZW5kUm93LCBsaW5lLmxlbmd0aCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG59KS5jYWxsKEZvbGRNb2RlLnByb3RvdHlwZSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIFJhbmdlID0gcmVxdWlyZShcIi4uL3JhbmdlXCIpLlJhbmdlO1xuXG52YXIgTWF0Y2hpbmdCcmFjZU91dGRlbnQgPSBmdW5jdGlvbigpIHt9O1xuXG4oZnVuY3Rpb24oKSB7XG5cbiAgICB0aGlzLmNoZWNrT3V0ZGVudCA9IGZ1bmN0aW9uKGxpbmUsIGlucHV0KSB7XG4gICAgICAgIGlmICghIC9eXFxzKyQvLnRlc3QobGluZSkpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgcmV0dXJuIC9eXFxzKlxcfS8udGVzdChpbnB1dCk7XG4gICAgfTtcblxuICAgIHRoaXMuYXV0b091dGRlbnQgPSBmdW5jdGlvbihkb2MsIHJvdykge1xuICAgICAgICB2YXIgbGluZSA9IGRvYy5nZXRMaW5lKHJvdyk7XG4gICAgICAgIHZhciBtYXRjaCA9IGxpbmUubWF0Y2goL14oXFxzKlxcfSkvKTtcblxuICAgICAgICBpZiAoIW1hdGNoKSByZXR1cm4gMDtcblxuICAgICAgICB2YXIgY29sdW1uID0gbWF0Y2hbMV0ubGVuZ3RoO1xuICAgICAgICB2YXIgb3BlbkJyYWNlUG9zID0gZG9jLmZpbmRNYXRjaGluZ0JyYWNrZXQoe3Jvdzogcm93LCBjb2x1bW46IGNvbHVtbn0pO1xuXG4gICAgICAgIGlmICghb3BlbkJyYWNlUG9zIHx8IG9wZW5CcmFjZVBvcy5yb3cgPT0gcm93KSByZXR1cm4gMDtcblxuICAgICAgICB2YXIgaW5kZW50ID0gdGhpcy4kZ2V0SW5kZW50KGRvYy5nZXRMaW5lKG9wZW5CcmFjZVBvcy5yb3cpKTtcbiAgICAgICAgZG9jLnJlcGxhY2UobmV3IFJhbmdlKHJvdywgMCwgcm93LCBjb2x1bW4tMSksIGluZGVudCk7XG4gICAgfTtcblxuICAgIHRoaXMuJGdldEluZGVudCA9IGZ1bmN0aW9uKGxpbmUpIHtcbiAgICAgICAgcmV0dXJuIGxpbmUubWF0Y2goL15cXHMqLylbMF07XG4gICAgfTtcblxufSkuY2FsbChNYXRjaGluZ0JyYWNlT3V0ZGVudC5wcm90b3R5cGUpO1xuXG5leHBvcnRzLk1hdGNoaW5nQnJhY2VPdXRkZW50ID0gTWF0Y2hpbmdCcmFjZU91dGRlbnQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRNb2RlID0gcmVxdWlyZShcIi4vdGV4dFwiKS5Nb2RlO1xudmFyIHNjYWRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3NjYWRfaGlnaGxpZ2h0X3J1bGVzXCIpLnNjYWRIaWdobGlnaHRSdWxlcztcbnZhciBNYXRjaGluZ0JyYWNlT3V0ZGVudCA9IHJlcXVpcmUoXCIuL21hdGNoaW5nX2JyYWNlX291dGRlbnRcIikuTWF0Y2hpbmdCcmFjZU91dGRlbnQ7XG52YXIgQ1N0eWxlRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9mb2xkaW5nL2NzdHlsZVwiKS5Gb2xkTW9kZTtcblxudmFyIE1vZGUgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLkhpZ2hsaWdodFJ1bGVzID0gc2NhZEhpZ2hsaWdodFJ1bGVzO1xuICAgIHRoaXMuJG91dGRlbnQgPSBuZXcgTWF0Y2hpbmdCcmFjZU91dGRlbnQoKTtcbiAgICB0aGlzLiRiZWhhdmlvdXIgPSB0aGlzLiRkZWZhdWx0QmVoYXZpb3VyO1xuICAgIHRoaXMuZm9sZGluZ1J1bGVzID0gbmV3IENTdHlsZUZvbGRNb2RlKCk7XG59O1xub29wLmluaGVyaXRzKE1vZGUsIFRleHRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5saW5lQ29tbWVudFN0YXJ0ID0gXCIvL1wiO1xuICAgIHRoaXMuYmxvY2tDb21tZW50ID0ge3N0YXJ0OiBcIi8qXCIsIGVuZDogXCIqL1wifTtcblxuICAgIHRoaXMuZ2V0TmV4dExpbmVJbmRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgbGluZSwgdGFiKSB7XG4gICAgICAgIHZhciBpbmRlbnQgPSB0aGlzLiRnZXRJbmRlbnQobGluZSk7XG5cbiAgICAgICAgdmFyIHRva2VuaXplZExpbmUgPSB0aGlzLmdldFRva2VuaXplcigpLmdldExpbmVUb2tlbnMobGluZSwgc3RhdGUpO1xuICAgICAgICB2YXIgdG9rZW5zID0gdG9rZW5pemVkTGluZS50b2tlbnM7XG4gICAgICAgIHZhciBlbmRTdGF0ZSA9IHRva2VuaXplZExpbmUuc3RhdGU7XG5cbiAgICAgICAgaWYgKHRva2Vucy5sZW5ndGggJiYgdG9rZW5zW3Rva2Vucy5sZW5ndGgtMV0udHlwZSA9PSBcImNvbW1lbnRcIikge1xuICAgICAgICAgICAgcmV0dXJuIGluZGVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdGF0ZSA9PSBcInN0YXJ0XCIpIHtcbiAgICAgICAgICAgIHZhciBtYXRjaCA9IGxpbmUubWF0Y2goL14uKltcXHtcXChcXFtdXFxzKiQvKTtcbiAgICAgICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgICAgIGluZGVudCArPSB0YWI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT0gXCJkb2Mtc3RhcnRcIikge1xuICAgICAgICAgICAgaWYgKGVuZFN0YXRlID09IFwic3RhcnRcIikge1xuICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCgvXlxccyooXFwvPylcXCovKTtcbiAgICAgICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgICAgIGlmIChtYXRjaFsxXSkge1xuICAgICAgICAgICAgICAgICAgICBpbmRlbnQgKz0gXCIgXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGluZGVudCArPSBcIiogXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW5kZW50O1xuICAgIH07XG5cbiAgICB0aGlzLmNoZWNrT3V0ZGVudCA9IGZ1bmN0aW9uKHN0YXRlLCBsaW5lLCBpbnB1dCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kb3V0ZGVudC5jaGVja091dGRlbnQobGluZSwgaW5wdXQpO1xuICAgIH07XG5cbiAgICB0aGlzLmF1dG9PdXRkZW50ID0gZnVuY3Rpb24oc3RhdGUsIGRvYywgcm93KSB7XG4gICAgICAgIHRoaXMuJG91dGRlbnQuYXV0b091dGRlbnQoZG9jLCByb3cpO1xuICAgIH07XG5cbiAgICB0aGlzLiRpZCA9IFwiYWNlL21vZGUvc2NhZFwiO1xufSkuY2FsbChNb2RlLnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTW9kZSA9IE1vZGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIGxhbmcgPSByZXF1aXJlKFwiLi4vbGliL2xhbmdcIik7XG52YXIgRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vZG9jX2NvbW1lbnRfaGlnaGxpZ2h0X3J1bGVzXCIpLkRvY0NvbW1lbnRIaWdobGlnaHRSdWxlcztcbnZhciBUZXh0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90ZXh0X2hpZ2hsaWdodF9ydWxlc1wiKS5UZXh0SGlnaGxpZ2h0UnVsZXM7XG5cbnZhciBzY2FkSGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIga2V5d29yZE1hcHBlciA9IHRoaXMuY3JlYXRlS2V5d29yZE1hcHBlcih7XG4gICAgICAgIFwidmFyaWFibGUubGFuZ3VhZ2VcIjogXCJ0aGlzXCIsXG4gICAgICAgIFwia2V5d29yZFwiOiBcIm1vZHVsZXxpZnxlbHNlfGZvclwiLFxuICAgICAgICBcImNvbnN0YW50Lmxhbmd1YWdlXCI6IFwiTlVMTFwiXG4gICAgfSwgXCJpZGVudGlmaWVyXCIpO1xuXG4gICAgLy8gcmVnZXhwIG11c3Qgbm90IGhhdmUgY2FwdHVyaW5nIHBhcmVudGhlc2VzLiBVc2UgKD86KSBpbnN0ZWFkLlxuICAgIC8vIHJlZ2V4cHMgYXJlIG9yZGVyZWQgLT4gdGhlIGZpcnN0IG1hdGNoIGlzIHVzZWRcblxuICAgIHRoaXMuJHJ1bGVzID0ge1xuICAgICAgICBcInN0YXJ0XCIgOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXC9cXFxcLy4qJFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLmdldFN0YXJ0UnVsZShcInN0YXJ0XCIpLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsIC8vIG11bHRpIGxpbmUgY29tbWVudFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcL1xcXFwqXCIsXG4gICAgICAgICAgICAgICAgbmV4dCA6IFwiY29tbWVudFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLCAvLyBzaW5nbGUgbGluZVxuICAgICAgICAgICAgICAgIHJlZ2V4IDogJ1tcIl0oPzooPzpcXFxcXFxcXC4pfCg/OlteXCJcXFxcXFxcXF0pKSo/W1wiXSdcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsIC8vIG11bHRpIGxpbmUgc3RyaW5nIHN0YXJ0XG4gICAgICAgICAgICAgICAgcmVnZXggOiAnW1wiXS4qXFxcXFxcXFwkJyxcbiAgICAgICAgICAgICAgICBuZXh0IDogXCJxcXN0cmluZ1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLCAvLyBzaW5nbGUgbGluZVxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJbJ10oPzooPzpcXFxcXFxcXC4pfCg/OlteJ1xcXFxcXFxcXSkpKj9bJ11cIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIiwgLy8gbXVsdGkgbGluZSBzdHJpbmcgc3RhcnRcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiWyddLipcXFxcXFxcXCRcIixcbiAgICAgICAgICAgICAgICBuZXh0IDogXCJxc3RyaW5nXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLCAvLyBoZXhcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiMFt4WF1bMC05YS1mQS1GXStcXFxcYlwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIiwgLy8gZmxvYXRcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiWystXT9cXFxcZCsoPzooPzpcXFxcLlxcXFxkKik/KD86W2VFXVsrLV0/XFxcXGQrKT8pP1xcXFxiXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50XCIsIC8vIDxDT05TVEFOVD5cbiAgICAgICAgICAgICAgcmVnZXggOiBcIjxbYS16QS1aMC05Ll0rPlwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkXCIsIC8vIHByZS1jb21waWxlciBkaXJlY3RpdnNcbiAgICAgICAgICAgICAgcmVnZXggOiBcIig/OnVzZXxpbmNsdWRlKVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBrZXl3b3JkTWFwcGVyLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJbYS16QS1aXyRdW2EtekEtWjAtOV8kXSpcXFxcYlwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImtleXdvcmQub3BlcmF0b3JcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiIXxcXFxcJHwlfCZ8XFxcXCp8XFxcXC1cXFxcLXxcXFxcLXxcXFxcK1xcXFwrfFxcXFwrfH58PT18PXwhPXw8PXw+PXw8PD18Pj49fD4+Pj18PD58PHw+fCF8JiZ8XFxcXHxcXFxcfHxcXFxcP1xcXFw6fFxcXFwqPXwlPXxcXFxcKz18XFxcXC09fCY9fFxcXFxePXxcXFxcYig/OmlufG5ld3xkZWxldGV8dHlwZW9mfHZvaWQpXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwicGFyZW4ubHBhcmVuXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIltbKHtdXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwicGFyZW4ucnBhcmVuXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIltcXFxcXSl9XVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXHMrXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgXCJjb21tZW50XCIgOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIiwgLy8gY2xvc2luZyBjb21tZW50XG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwqXFxcXC9cIixcbiAgICAgICAgICAgICAgICBuZXh0IDogXCJzdGFydFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuIDogXCJjb21tZW50XCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgXCJxcXN0cmluZ1wiIDogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICByZWdleCA6ICcoPzooPzpcXFxcXFxcXC4pfCg/OlteXCJcXFxcXFxcXF0pKSo/XCInLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcInN0YXJ0XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAnLisnXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIFwicXN0cmluZ1wiIDogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiKD86KD86XFxcXFxcXFwuKXwoPzpbXidcXFxcXFxcXF0pKSo/J1wiLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcInN0YXJ0XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAnLisnXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9O1xuICAgIFxuICAgIHRoaXMuZW1iZWRSdWxlcyhEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMsIFwiZG9jLVwiLFxuICAgICAgICBbIERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcy5nZXRFbmRSdWxlKFwic3RhcnRcIikgXSk7XG59O1xuXG5vb3AuaW5oZXJpdHMoc2NhZEhpZ2hsaWdodFJ1bGVzLCBUZXh0SGlnaGxpZ2h0UnVsZXMpO1xuXG5leHBvcnRzLnNjYWRIaWdobGlnaHRSdWxlcyA9IHNjYWRIaWdobGlnaHRSdWxlcztcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==