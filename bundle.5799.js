"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[5799],{

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

/***/ 15799:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var NimHighlightRules = (__webpack_require__(98116)/* .NimHighlightRules */ .W);
var CStyleFoldMode = (__webpack_require__(93887)/* .FoldMode */ .l);

var Mode = function () {
    TextMode.call(this);
    this.HighlightRules = NimHighlightRules;
    this.foldingRules = new CStyleFoldMode();
    this.$behaviour = this.$defaultBehaviour;
};

oop.inherits(Mode, TextMode);


(function () {
    this.lineCommentStart = "#";
    this.blockComment = {start: "#[", end: "]#", nestable: true};


    this.$id = "ace/mode/nim";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 98116:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);
var NimHighlightRules = function () {

    var keywordMapper = this.createKeywordMapper({
        "variable": "var|let|const",
        "keyword": "assert|parallel|spawn|export|include|from|template|mixin|bind|import|concept|raise|defer|try|finally|except|converter|proc|func|macro|method|and|or|not|xor|shl|shr|div|mod|in|notin|is|isnot|of|static|if|elif|else|case|of|discard|when|return|yield|block|break|while|echo|continue|asm|using|cast|addr|unsafeAddr|type|ref|ptr|do|declared|defined|definedInScope|compiles|sizeOf|is|shallowCopy|getAst|astToStr|spawn|procCall|for|iterator|as",
        "storage.type": "newSeq|int|int8|int16|int32|int64|uint|uint8|uint16|uint32|uint64|float|char|bool|string|set|pointer|float32|float64|enum|object|cstring|array|seq|openArray|varargs|UncheckedArray|tuple|set|distinct|void|auto|openarray|range",
        "support.function": "lock|ze|toU8|toU16|toU32|ord|low|len|high|add|pop|contains|card|incl|excl|dealloc|inc",
        "constant.language": "nil|true|false"
    }, "identifier");

    var hexNumber = "(?:0[xX][\\dA-Fa-f][\\dA-Fa-f_]*)";
    var decNumber = "(?:[0-9][\\d_]*)";
    var octNumber = "(?:0o[0-7][0-7_]*)";
    var binNumber = "(?:0[bB][01][01_]*)";
    var intNumber = "(?:" + hexNumber + "|" + decNumber + "|" + octNumber + "|" + binNumber + ")(?:'?[iIuU](?:8|16|32|64)|u)?\\b";
    var exponent = "(?:[eE][+-]?[\\d][\\d_]*)";
    var floatNumber = "(?:[\\d][\\d_]*(?:[.][\\d](?:[\\d_]*)" + exponent + "?)|" + exponent + ")";
    var floatNumberExt = "(?:" + hexNumber + "(?:'(?:(?:[fF](?:32|64)?)|[dD])))|(?:" + floatNumber + "|" + decNumber + "|" + octNumber + "|" + binNumber + ")(?:'(?:(?:[fF](?:32|64)?)|[dD]))";
    var stringEscape = "\\\\([abeprcnlftv\\\"']|x[0-9A-Fa-f]{2}|[0-2][0-9]{2}|u[0-9A-Fa-f]{8}|u[0-9A-Fa-f]{4})";
    var identifier = '[a-zA-Z][a-zA-Z0-9_]*';
    this.$rules = {
        "start": [{
            token: ["identifier", "keyword.operator", "support.function"],
            regex: "(" + identifier + ")([.]{1})(" + identifier + ")(?=\\()"
        }, {//pragmas
            token: "paren.lparen",
            regex: "(\\{\\.)",
            next: [{
                token: "paren.rparen",
                regex: '(\\.\\}|\\})',
                next: "start"
            }, {
                include: "methods"
            }, {
                token: "identifier",
                regex: identifier
            }, {
                token: "punctuation",
                regex: /[,]/
            }, {
                token: "keyword.operator",
                regex: /[=:.]/
            }, {
                token: "paren.lparen",
                regex: /[[(]/
            }, {
                token: "paren.rparen",
                regex: /[\])]/
            }, {
                include: "math"
            }, {
                include: "strings"
            }, {
                defaultToken: "text"
            }]
        }, {
            token: "comment.doc.start",
            regex: /##\[(?!])/,
            push: "docBlockComment"
        }, {
            token: "comment.start",
            regex: /#\[(?!])/,
            push: "blockComment"
        }, {
            token: "comment.doc",
            regex: '##.*$'
        }, {
            token: "comment",
            regex: '#.*$'
        }, {
            include: "strings"
        }, {// character
            token: "string",
            regex: "'(?:\\\\(?:[abercnlftv]|x[0-9A-Fa-f]{2}|[0-2][0-9]{2}|u[0-9A-Fa-f]{8}|u[0-9A-Fa-f]{4})|.{1})?'"
        }, {
            include: "methods"
        }, {
            token: keywordMapper,
            regex: "[a-zA-Z][a-zA-Z0-9_]*\\b"
        }, {
            token: ["keyword.operator", "text", "storage.type"],
            regex: "([:])(\\s+)(" + identifier + ")(?=$|\\)|\\[|,|\\s+=|;|\\s+\\{)"
        }, {
            token: "paren.lparen",
            regex: /\[\.|{\||\(\.|\[:|[[({`]/
        }, {
            token: "paren.rparen",
            regex: /\.\)|\|}|\.]|[\])}]/
        }, {
            token: "keyword.operator",
            regex: /[=+\-*\/<>@$~&%|!?^.:\\]/
        }, {
            token: "punctuation",
            regex: /[,;]/
        }, {
            include: "math"
        }],
        blockComment: [{
            regex: /#\[]/,
            token: "comment"
        }, {
            regex: /#\[(?!])/,
            token: "comment.start",
            push: "blockComment"
        }, {
            regex: /]#/,
            token: "comment.end",
            next: "pop"
        }, {
            defaultToken: "comment"
        }],
        docBlockComment: [{
            regex: /##\[]/,
            token: "comment.doc"
        }, {
            regex: /##\[(?!])/,
            token: "comment.doc.start",
            push: "docBlockComment"
        }, {
            regex: /]##/,
            token: "comment.doc.end",
            next: "pop"
        }, {
            defaultToken: "comment.doc"
        }],
        math: [{
            token: "constant.float",
            regex: floatNumberExt
        }, {
            token: "constant.float",
            regex: floatNumber
        }, {
            token: "constant.integer",
            regex: intNumber
        }],
        methods: [{
            token: "support.function",
            regex: "(\\w+)(?=\\()"
        }],
        strings: [{
            token: "string",
            regex: '(\\b' + identifier + ')?"""',
            push: [{
                token: "string",
                regex: '"""',
                next: "pop"
            }, {
                defaultToken: "string"
            }]
        }, {
            token: "string",
            regex: "\\b" + identifier + '"(?=.)',
            push: [{
                token: "string",
                regex: '"|$',
                next: "pop"
            }, {
                defaultToken: "string"
            }]
        }, {
            token: "string",
            regex: '"',
            push: [{
                token: "string",
                regex: '"|$',
                next: "pop"
            }, {
                token: "constant.language.escape",
                regex: stringEscape
            }, {
                defaultToken: "string"
            }]
        }]
    };
    this.normalizeRules();
};


oop.inherits(NimHighlightRules, TextHighlightRules);

exports.W = NimHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjU3OTkuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLElBQWU7QUFDakMsWUFBWSwyQ0FBNEI7QUFDeEMsbUJBQW1CLHFDQUErQjs7QUFFbEQsZUFBZSxTQUFnQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUNBQW1DLFVBQVU7QUFDN0MscUNBQXFDLFFBQVE7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUM7Ozs7Ozs7O0FDOUpZOztBQUViLFVBQVUsbUJBQU8sQ0FBQyxJQUFZO0FBQzlCLGVBQWUsaUNBQXNCO0FBQ3JDLHdCQUF3Qix1REFBa0Q7QUFDMUUscUJBQXFCLDhDQUFvQzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0EseUJBQXlCOzs7QUFHekI7QUFDQSxDQUFDOztBQUVELFlBQVk7Ozs7Ozs7O0FDekJDOztBQUViLFVBQVUsbUJBQU8sQ0FBQyxJQUFZO0FBQzlCLHlCQUF5Qix3REFBb0Q7QUFDN0U7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkRBQTZELEVBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUU7QUFDN0c7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2Q0FBNkMsRUFBRTtBQUMvQyxTQUFTLEdBQUc7QUFDWjtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0EsK0JBQStCLElBQUk7QUFDbkM7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVMsR0FBRztBQUNaO0FBQ0EseURBQXlELEVBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFFO0FBQy9HLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EseUVBQXlFLFFBQVE7QUFDakYsU0FBUztBQUNUO0FBQ0EsMEJBQTBCLGdCQUFnQjtBQUMxQyxTQUFTO0FBQ1Q7QUFDQSw0QkFBNEIsVUFBVTtBQUN0QyxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLHVCQUF1QjtBQUN2QixTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUEsU0FBeUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2ZvbGRpbmcvY3N0eWxlLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvbmltLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvbmltX2hpZ2hsaWdodF9ydWxlcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi8uLi9saWIvb29wXCIpO1xudmFyIFJhbmdlID0gcmVxdWlyZShcIi4uLy4uL3JhbmdlXCIpLlJhbmdlO1xudmFyIEJhc2VGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRfbW9kZVwiKS5Gb2xkTW9kZTtcblxudmFyIEZvbGRNb2RlID0gZXhwb3J0cy5Gb2xkTW9kZSA9IGZ1bmN0aW9uKGNvbW1lbnRSZWdleCkge1xuICAgIGlmIChjb21tZW50UmVnZXgpIHtcbiAgICAgICAgdGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIgPSBuZXcgUmVnRXhwKFxuICAgICAgICAgICAgdGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIuc291cmNlLnJlcGxhY2UoL1xcfFtefF0qPyQvLCBcInxcIiArIGNvbW1lbnRSZWdleC5zdGFydClcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5mb2xkaW5nU3RvcE1hcmtlciA9IG5ldyBSZWdFeHAoXG4gICAgICAgICAgICB0aGlzLmZvbGRpbmdTdG9wTWFya2VyLnNvdXJjZS5yZXBsYWNlKC9cXHxbXnxdKj8kLywgXCJ8XCIgKyBjb21tZW50UmVnZXguZW5kKVxuICAgICAgICApO1xuICAgIH1cbn07XG5vb3AuaW5oZXJpdHMoRm9sZE1vZGUsIEJhc2VGb2xkTW9kZSk7XG5cbihmdW5jdGlvbigpIHtcbiAgICBcbiAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlciA9IC8oW1xce1xcW1xcKF0pW15cXH1cXF1cXCldKiR8XlxccyooXFwvXFwqKS87XG4gICAgdGhpcy5mb2xkaW5nU3RvcE1hcmtlciA9IC9eW15cXFtcXHtcXChdKihbXFx9XFxdXFwpXSl8XltcXHNcXCpdKihcXCpcXC8pLztcbiAgICB0aGlzLnNpbmdsZUxpbmVCbG9ja0NvbW1lbnRSZT0gL15cXHMqKFxcL1xcKikuKlxcKlxcL1xccyokLztcbiAgICB0aGlzLnRyaXBsZVN0YXJCbG9ja0NvbW1lbnRSZSA9IC9eXFxzKihcXC9cXCpcXCpcXCopLipcXCpcXC9cXHMqJC87XG4gICAgdGhpcy5zdGFydFJlZ2lvblJlID0gL15cXHMqKFxcL1xcKnxcXC9cXC8pIz9yZWdpb25cXGIvO1xuICAgIFxuICAgIC8vcHJldmVudCBuYW1pbmcgY29uZmxpY3Qgd2l0aCBhbnkgbW9kZXMgdGhhdCBpbmhlcml0IGZyb20gY3N0eWxlIGFuZCBvdmVycmlkZSB0aGlzIChsaWtlIGNzaGFycClcbiAgICB0aGlzLl9nZXRGb2xkV2lkZ2V0QmFzZSA9IHRoaXMuZ2V0Rm9sZFdpZGdldDtcbiAgICBcbiAgICAvKipcbiAgICAgKiBHZXRzIGZvbGQgd2lkZ2V0IHdpdGggc29tZSBub24tc3RhbmRhcmQgZXh0cmFzOlxuICAgICAqXG4gICAgICogQGV4YW1wbGUgbGluZUNvbW1lbnRSZWdpb25TdGFydFxuICAgICAqICAgICAgLy8jcmVnaW9uIFtvcHRpb25hbCBkZXNjcmlwdGlvbl1cbiAgICAgKlxuICAgICAqIEBleGFtcGxlIGJsb2NrQ29tbWVudFJlZ2lvblN0YXJ0XG4gICAgICogICAgICAvKiNyZWdpb24gW29wdGlvbmFsIGRlc2NyaXB0aW9uXSAqWy9dXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSB0cmlwbGVTdGFyRm9sZGluZ1NlY3Rpb25cbiAgICAgKiAgICAgIC8qKiogdGhpcyBmb2xkcyBldmVuIHRob3VnaCAxIGxpbmUgYmVjYXVzZSBpdCBoYXMgMyBzdGFycyAqKipbL11cbiAgICAgKiBcbiAgICAgKiBAbm90ZSB0aGUgcG91bmQgc3ltYm9sIGZvciByZWdpb24gdGFncyBpcyBvcHRpb25hbFxuICAgICAqL1xuICAgIHRoaXMuZ2V0Rm9sZFdpZGdldCA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgXG4gICAgICAgIGlmICh0aGlzLnNpbmdsZUxpbmVCbG9ja0NvbW1lbnRSZS50ZXN0KGxpbmUpKSB7XG4gICAgICAgICAgICAvLyBObyB3aWRnZXQgZm9yIHNpbmdsZSBsaW5lIGJsb2NrIGNvbW1lbnQgdW5sZXNzIHJlZ2lvbiBvciB0cmlwbGUgc3RhclxuICAgICAgICAgICAgaWYgKCF0aGlzLnN0YXJ0UmVnaW9uUmUudGVzdChsaW5lKSAmJiAhdGhpcy50cmlwbGVTdGFyQmxvY2tDb21tZW50UmUudGVzdChsaW5lKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICB2YXIgZncgPSB0aGlzLl9nZXRGb2xkV2lkZ2V0QmFzZShzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdyk7XG4gICAgXG4gICAgICAgIGlmICghZncgJiYgdGhpcy5zdGFydFJlZ2lvblJlLnRlc3QobGluZSkpXG4gICAgICAgICAgICByZXR1cm4gXCJzdGFydFwiOyAvLyBsaW5lQ29tbWVudFJlZ2lvblN0YXJ0XG4gICAgXG4gICAgICAgIHJldHVybiBmdztcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0UmFuZ2UgPSBmdW5jdGlvbihzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdywgZm9yY2VNdWx0aWxpbmUpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLnN0YXJ0UmVnaW9uUmUudGVzdChsaW5lKSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldENvbW1lbnRSZWdpb25CbG9jayhzZXNzaW9uLCBsaW5lLCByb3cpO1xuICAgICAgICBcbiAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCh0aGlzLmZvbGRpbmdTdGFydE1hcmtlcik7XG4gICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgdmFyIGkgPSBtYXRjaC5pbmRleDtcblxuICAgICAgICAgICAgaWYgKG1hdGNoWzFdKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm9wZW5pbmdCcmFja2V0QmxvY2soc2Vzc2lvbiwgbWF0Y2hbMV0sIHJvdywgaSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgcmFuZ2UgPSBzZXNzaW9uLmdldENvbW1lbnRGb2xkUmFuZ2Uocm93LCBpICsgbWF0Y2hbMF0ubGVuZ3RoLCAxKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHJhbmdlICYmICFyYW5nZS5pc011bHRpTGluZSgpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZvcmNlTXVsdGlsaW5lKSB7XG4gICAgICAgICAgICAgICAgICAgIHJhbmdlID0gdGhpcy5nZXRTZWN0aW9uUmFuZ2Uoc2Vzc2lvbiwgcm93KTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZvbGRTdHlsZSAhPSBcImFsbFwiKVxuICAgICAgICAgICAgICAgICAgICByYW5nZSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiByYW5nZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmb2xkU3R5bGUgPT09IFwibWFya2JlZ2luXCIpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCh0aGlzLmZvbGRpbmdTdG9wTWFya2VyKTtcbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICB2YXIgaSA9IG1hdGNoLmluZGV4ICsgbWF0Y2hbMF0ubGVuZ3RoO1xuXG4gICAgICAgICAgICBpZiAobWF0Y2hbMV0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2xvc2luZ0JyYWNrZXRCbG9jayhzZXNzaW9uLCBtYXRjaFsxXSwgcm93LCBpKTtcblxuICAgICAgICAgICAgcmV0dXJuIHNlc3Npb24uZ2V0Q29tbWVudEZvbGRSYW5nZShyb3csIGksIC0xKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgXG4gICAgdGhpcy5nZXRTZWN0aW9uUmFuZ2UgPSBmdW5jdGlvbihzZXNzaW9uLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgdmFyIHN0YXJ0SW5kZW50ID0gbGluZS5zZWFyY2goL1xcUy8pO1xuICAgICAgICB2YXIgc3RhcnRSb3cgPSByb3c7XG4gICAgICAgIHZhciBzdGFydENvbHVtbiA9IGxpbmUubGVuZ3RoO1xuICAgICAgICByb3cgPSByb3cgKyAxO1xuICAgICAgICB2YXIgZW5kUm93ID0gcm93O1xuICAgICAgICB2YXIgbWF4Um93ID0gc2Vzc2lvbi5nZXRMZW5ndGgoKTtcbiAgICAgICAgd2hpbGUgKCsrcm93IDwgbWF4Um93KSB7XG4gICAgICAgICAgICBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgICAgICB2YXIgaW5kZW50ID0gbGluZS5zZWFyY2goL1xcUy8pO1xuICAgICAgICAgICAgaWYgKGluZGVudCA9PT0gLTEpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICBpZiAgKHN0YXJ0SW5kZW50ID4gaW5kZW50KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgdmFyIHN1YlJhbmdlID0gdGhpcy5nZXRGb2xkV2lkZ2V0UmFuZ2Uoc2Vzc2lvbiwgXCJhbGxcIiwgcm93KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHN1YlJhbmdlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN1YlJhbmdlLnN0YXJ0LnJvdyA8PSBzdGFydFJvdykge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN1YlJhbmdlLmlzTXVsdGlMaW5lKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcm93ID0gc3ViUmFuZ2UuZW5kLnJvdztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXJ0SW5kZW50ID09IGluZGVudCkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbmRSb3cgPSByb3c7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBuZXcgUmFuZ2Uoc3RhcnRSb3csIHN0YXJ0Q29sdW1uLCBlbmRSb3csIHNlc3Npb24uZ2V0TGluZShlbmRSb3cpLmxlbmd0aCk7XG4gICAgfTtcbiAgICBcbiAgICAvKipcbiAgICAgKiBnZXRzIGNvbW1lbnQgcmVnaW9uIGJsb2NrIHdpdGggZW5kIHJlZ2lvbiBhc3N1bWVkIHRvIGJlIHN0YXJ0IG9mIGNvbW1lbnQgaW4gYW55IGNzdHlsZSBtb2RlIG9yIFNRTCBtb2RlICgtLSkgd2hpY2ggaW5oZXJpdHMgZnJvbSB0aGlzLlxuICAgICAqIFRoZXJlIG1heSBvcHRpb25hbGx5IGJlIGEgcG91bmQgc3ltYm9sIGJlZm9yZSB0aGUgcmVnaW9uL2VuZHJlZ2lvbiBzdGF0ZW1lbnRcbiAgICAgKi9cbiAgICB0aGlzLmdldENvbW1lbnRSZWdpb25CbG9jayA9IGZ1bmN0aW9uKHNlc3Npb24sIGxpbmUsIHJvdykge1xuICAgICAgICB2YXIgc3RhcnRDb2x1bW4gPSBsaW5lLnNlYXJjaCgvXFxzKiQvKTtcbiAgICAgICAgdmFyIG1heFJvdyA9IHNlc3Npb24uZ2V0TGVuZ3RoKCk7XG4gICAgICAgIHZhciBzdGFydFJvdyA9IHJvdztcbiAgICAgICAgXG4gICAgICAgIHZhciByZSA9IC9eXFxzKig/OlxcL1xcKnxcXC9cXC98LS0pIz8oZW5kKT9yZWdpb25cXGIvO1xuICAgICAgICB2YXIgZGVwdGggPSAxO1xuICAgICAgICB3aGlsZSAoKytyb3cgPCBtYXhSb3cpIHtcbiAgICAgICAgICAgIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgICAgIHZhciBtID0gcmUuZXhlYyhsaW5lKTtcbiAgICAgICAgICAgIGlmICghbSkgY29udGludWU7XG4gICAgICAgICAgICBpZiAobVsxXSkgZGVwdGgtLTtcbiAgICAgICAgICAgIGVsc2UgZGVwdGgrKztcblxuICAgICAgICAgICAgaWYgKCFkZXB0aCkgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZW5kUm93ID0gcm93O1xuICAgICAgICBpZiAoZW5kUm93ID4gc3RhcnRSb3cpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmFuZ2Uoc3RhcnRSb3csIHN0YXJ0Q29sdW1uLCBlbmRSb3csIGxpbmUubGVuZ3RoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbn0pLmNhbGwoRm9sZE1vZGUucHJvdG90eXBlKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dE1vZGUgPSByZXF1aXJlKFwiLi90ZXh0XCIpLk1vZGU7XG52YXIgTmltSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9uaW1faGlnaGxpZ2h0X3J1bGVzXCIpLk5pbUhpZ2hsaWdodFJ1bGVzO1xudmFyIENTdHlsZUZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZGluZy9jc3R5bGVcIikuRm9sZE1vZGU7XG5cbnZhciBNb2RlID0gZnVuY3Rpb24gKCkge1xuICAgIFRleHRNb2RlLmNhbGwodGhpcyk7XG4gICAgdGhpcy5IaWdobGlnaHRSdWxlcyA9IE5pbUhpZ2hsaWdodFJ1bGVzO1xuICAgIHRoaXMuZm9sZGluZ1J1bGVzID0gbmV3IENTdHlsZUZvbGRNb2RlKCk7XG4gICAgdGhpcy4kYmVoYXZpb3VyID0gdGhpcy4kZGVmYXVsdEJlaGF2aW91cjtcbn07XG5cbm9vcC5pbmhlcml0cyhNb2RlLCBUZXh0TW9kZSk7XG5cblxuKGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmxpbmVDb21tZW50U3RhcnQgPSBcIiNcIjtcbiAgICB0aGlzLmJsb2NrQ29tbWVudCA9IHtzdGFydDogXCIjW1wiLCBlbmQ6IFwiXSNcIiwgbmVzdGFibGU6IHRydWV9O1xuXG5cbiAgICB0aGlzLiRpZCA9IFwiYWNlL21vZGUvbmltXCI7XG59KS5jYWxsKE1vZGUucHJvdG90eXBlKTtcblxuZXhwb3J0cy5Nb2RlID0gTW9kZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xudmFyIE5pbUhpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIGtleXdvcmRNYXBwZXIgPSB0aGlzLmNyZWF0ZUtleXdvcmRNYXBwZXIoe1xuICAgICAgICBcInZhcmlhYmxlXCI6IFwidmFyfGxldHxjb25zdFwiLFxuICAgICAgICBcImtleXdvcmRcIjogXCJhc3NlcnR8cGFyYWxsZWx8c3Bhd258ZXhwb3J0fGluY2x1ZGV8ZnJvbXx0ZW1wbGF0ZXxtaXhpbnxiaW5kfGltcG9ydHxjb25jZXB0fHJhaXNlfGRlZmVyfHRyeXxmaW5hbGx5fGV4Y2VwdHxjb252ZXJ0ZXJ8cHJvY3xmdW5jfG1hY3JvfG1ldGhvZHxhbmR8b3J8bm90fHhvcnxzaGx8c2hyfGRpdnxtb2R8aW58bm90aW58aXN8aXNub3R8b2Z8c3RhdGljfGlmfGVsaWZ8ZWxzZXxjYXNlfG9mfGRpc2NhcmR8d2hlbnxyZXR1cm58eWllbGR8YmxvY2t8YnJlYWt8d2hpbGV8ZWNob3xjb250aW51ZXxhc218dXNpbmd8Y2FzdHxhZGRyfHVuc2FmZUFkZHJ8dHlwZXxyZWZ8cHRyfGRvfGRlY2xhcmVkfGRlZmluZWR8ZGVmaW5lZEluU2NvcGV8Y29tcGlsZXN8c2l6ZU9mfGlzfHNoYWxsb3dDb3B5fGdldEFzdHxhc3RUb1N0cnxzcGF3bnxwcm9jQ2FsbHxmb3J8aXRlcmF0b3J8YXNcIixcbiAgICAgICAgXCJzdG9yYWdlLnR5cGVcIjogXCJuZXdTZXF8aW50fGludDh8aW50MTZ8aW50MzJ8aW50NjR8dWludHx1aW50OHx1aW50MTZ8dWludDMyfHVpbnQ2NHxmbG9hdHxjaGFyfGJvb2x8c3RyaW5nfHNldHxwb2ludGVyfGZsb2F0MzJ8ZmxvYXQ2NHxlbnVtfG9iamVjdHxjc3RyaW5nfGFycmF5fHNlcXxvcGVuQXJyYXl8dmFyYXJnc3xVbmNoZWNrZWRBcnJheXx0dXBsZXxzZXR8ZGlzdGluY3R8dm9pZHxhdXRvfG9wZW5hcnJheXxyYW5nZVwiLFxuICAgICAgICBcInN1cHBvcnQuZnVuY3Rpb25cIjogXCJsb2NrfHplfHRvVTh8dG9VMTZ8dG9VMzJ8b3JkfGxvd3xsZW58aGlnaHxhZGR8cG9wfGNvbnRhaW5zfGNhcmR8aW5jbHxleGNsfGRlYWxsb2N8aW5jXCIsXG4gICAgICAgIFwiY29uc3RhbnQubGFuZ3VhZ2VcIjogXCJuaWx8dHJ1ZXxmYWxzZVwiXG4gICAgfSwgXCJpZGVudGlmaWVyXCIpO1xuXG4gICAgdmFyIGhleE51bWJlciA9IFwiKD86MFt4WF1bXFxcXGRBLUZhLWZdW1xcXFxkQS1GYS1mX10qKVwiO1xuICAgIHZhciBkZWNOdW1iZXIgPSBcIig/OlswLTldW1xcXFxkX10qKVwiO1xuICAgIHZhciBvY3ROdW1iZXIgPSBcIig/OjBvWzAtN11bMC03X10qKVwiO1xuICAgIHZhciBiaW5OdW1iZXIgPSBcIig/OjBbYkJdWzAxXVswMV9dKilcIjtcbiAgICB2YXIgaW50TnVtYmVyID0gXCIoPzpcIiArIGhleE51bWJlciArIFwifFwiICsgZGVjTnVtYmVyICsgXCJ8XCIgKyBvY3ROdW1iZXIgKyBcInxcIiArIGJpbk51bWJlciArIFwiKSg/Oic/W2lJdVVdKD86OHwxNnwzMnw2NCl8dSk/XFxcXGJcIjtcbiAgICB2YXIgZXhwb25lbnQgPSBcIig/OltlRV1bKy1dP1tcXFxcZF1bXFxcXGRfXSopXCI7XG4gICAgdmFyIGZsb2F0TnVtYmVyID0gXCIoPzpbXFxcXGRdW1xcXFxkX10qKD86Wy5dW1xcXFxkXSg/OltcXFxcZF9dKilcIiArIGV4cG9uZW50ICsgXCI/KXxcIiArIGV4cG9uZW50ICsgXCIpXCI7XG4gICAgdmFyIGZsb2F0TnVtYmVyRXh0ID0gXCIoPzpcIiArIGhleE51bWJlciArIFwiKD86Jyg/Oig/OltmRl0oPzozMnw2NCk/KXxbZERdKSkpfCg/OlwiICsgZmxvYXROdW1iZXIgKyBcInxcIiArIGRlY051bWJlciArIFwifFwiICsgb2N0TnVtYmVyICsgXCJ8XCIgKyBiaW5OdW1iZXIgKyBcIikoPzonKD86KD86W2ZGXSg/OjMyfDY0KT8pfFtkRF0pKVwiO1xuICAgIHZhciBzdHJpbmdFc2NhcGUgPSBcIlxcXFxcXFxcKFthYmVwcmNubGZ0dlxcXFxcXFwiJ118eFswLTlBLUZhLWZdezJ9fFswLTJdWzAtOV17Mn18dVswLTlBLUZhLWZdezh9fHVbMC05QS1GYS1mXXs0fSlcIjtcbiAgICB2YXIgaWRlbnRpZmllciA9ICdbYS16QS1aXVthLXpBLVowLTlfXSonO1xuICAgIHRoaXMuJHJ1bGVzID0ge1xuICAgICAgICBcInN0YXJ0XCI6IFt7XG4gICAgICAgICAgICB0b2tlbjogW1wiaWRlbnRpZmllclwiLCBcImtleXdvcmQub3BlcmF0b3JcIiwgXCJzdXBwb3J0LmZ1bmN0aW9uXCJdLFxuICAgICAgICAgICAgcmVnZXg6IFwiKFwiICsgaWRlbnRpZmllciArIFwiKShbLl17MX0pKFwiICsgaWRlbnRpZmllciArIFwiKSg/PVxcXFwoKVwiXG4gICAgICAgIH0sIHsvL3ByYWdtYXNcbiAgICAgICAgICAgIHRva2VuOiBcInBhcmVuLmxwYXJlblwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiKFxcXFx7XFxcXC4pXCIsXG4gICAgICAgICAgICBuZXh0OiBbe1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInBhcmVuLnJwYXJlblwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAnKFxcXFwuXFxcXH18XFxcXH0pJyxcbiAgICAgICAgICAgICAgICBuZXh0OiBcInN0YXJ0XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiBcIm1ldGhvZHNcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcImlkZW50aWZpZXJcIixcbiAgICAgICAgICAgICAgICByZWdleDogaWRlbnRpZmllclxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInB1bmN0dWF0aW9uXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IC9bLF0vXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwia2V5d29yZC5vcGVyYXRvclwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvWz06Ll0vXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwicGFyZW4ubHBhcmVuXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IC9bWyhdL1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInBhcmVuLnJwYXJlblwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvW1xcXSldL1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFwibWF0aFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaW5jbHVkZTogXCJzdHJpbmdzXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwidGV4dFwiXG4gICAgICAgICAgICB9XVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJjb21tZW50LmRvYy5zdGFydFwiLFxuICAgICAgICAgICAgcmVnZXg6IC8jI1xcWyg/IV0pLyxcbiAgICAgICAgICAgIHB1c2g6IFwiZG9jQmxvY2tDb21tZW50XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwiY29tbWVudC5zdGFydFwiLFxuICAgICAgICAgICAgcmVnZXg6IC8jXFxbKD8hXSkvLFxuICAgICAgICAgICAgcHVzaDogXCJibG9ja0NvbW1lbnRcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJjb21tZW50LmRvY1wiLFxuICAgICAgICAgICAgcmVnZXg6ICcjIy4qJCdcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwiY29tbWVudFwiLFxuICAgICAgICAgICAgcmVnZXg6ICcjLiokJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpbmNsdWRlOiBcInN0cmluZ3NcIlxuICAgICAgICB9LCB7Ly8gY2hhcmFjdGVyXG4gICAgICAgICAgICB0b2tlbjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIicoPzpcXFxcXFxcXCg/OlthYmVyY25sZnR2XXx4WzAtOUEtRmEtZl17Mn18WzAtMl1bMC05XXsyfXx1WzAtOUEtRmEtZl17OH18dVswLTlBLUZhLWZdezR9KXwuezF9KT8nXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaW5jbHVkZTogXCJtZXRob2RzXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IGtleXdvcmRNYXBwZXIsXG4gICAgICAgICAgICByZWdleDogXCJbYS16QS1aXVthLXpBLVowLTlfXSpcXFxcYlwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBbXCJrZXl3b3JkLm9wZXJhdG9yXCIsIFwidGV4dFwiLCBcInN0b3JhZ2UudHlwZVwiXSxcbiAgICAgICAgICAgIHJlZ2V4OiBcIihbOl0pKFxcXFxzKykoXCIgKyBpZGVudGlmaWVyICsgXCIpKD89JHxcXFxcKXxcXFxcW3wsfFxcXFxzKz18O3xcXFxccytcXFxceylcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJwYXJlbi5scGFyZW5cIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXFxbXFwufHtcXHx8XFwoXFwufFxcWzp8W1soe2BdL1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJwYXJlbi5ycGFyZW5cIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXFwuXFwpfFxcfH18XFwuXXxbXFxdKX1dL1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJrZXl3b3JkLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICByZWdleDogL1s9K1xcLSpcXC88PkAkfiYlfCE/Xi46XFxcXF0vXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInB1bmN0dWF0aW9uXCIsXG4gICAgICAgICAgICByZWdleDogL1ssO10vXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGluY2x1ZGU6IFwibWF0aFwiXG4gICAgICAgIH1dLFxuICAgICAgICBibG9ja0NvbW1lbnQ6IFt7XG4gICAgICAgICAgICByZWdleDogLyNcXFtdLyxcbiAgICAgICAgICAgIHRva2VuOiBcImNvbW1lbnRcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICByZWdleDogLyNcXFsoPyFdKS8sXG4gICAgICAgICAgICB0b2tlbjogXCJjb21tZW50LnN0YXJ0XCIsXG4gICAgICAgICAgICBwdXNoOiBcImJsb2NrQ29tbWVudFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHJlZ2V4OiAvXSMvLFxuICAgICAgICAgICAgdG9rZW46IFwiY29tbWVudC5lbmRcIixcbiAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcImNvbW1lbnRcIlxuICAgICAgICB9XSxcbiAgICAgICAgZG9jQmxvY2tDb21tZW50OiBbe1xuICAgICAgICAgICAgcmVnZXg6IC8jI1xcW10vLFxuICAgICAgICAgICAgdG9rZW46IFwiY29tbWVudC5kb2NcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICByZWdleDogLyMjXFxbKD8hXSkvLFxuICAgICAgICAgICAgdG9rZW46IFwiY29tbWVudC5kb2Muc3RhcnRcIixcbiAgICAgICAgICAgIHB1c2g6IFwiZG9jQmxvY2tDb21tZW50XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgcmVnZXg6IC9dIyMvLFxuICAgICAgICAgICAgdG9rZW46IFwiY29tbWVudC5kb2MuZW5kXCIsXG4gICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJjb21tZW50LmRvY1wiXG4gICAgICAgIH1dLFxuICAgICAgICBtYXRoOiBbe1xuICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQuZmxvYXRcIixcbiAgICAgICAgICAgIHJlZ2V4OiBmbG9hdE51bWJlckV4dFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5mbG9hdFwiLFxuICAgICAgICAgICAgcmVnZXg6IGZsb2F0TnVtYmVyXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50LmludGVnZXJcIixcbiAgICAgICAgICAgIHJlZ2V4OiBpbnROdW1iZXJcbiAgICAgICAgfV0sXG4gICAgICAgIG1ldGhvZHM6IFt7XG4gICAgICAgICAgICB0b2tlbjogXCJzdXBwb3J0LmZ1bmN0aW9uXCIsXG4gICAgICAgICAgICByZWdleDogXCIoXFxcXHcrKSg/PVxcXFwoKVwiXG4gICAgICAgIH1dLFxuICAgICAgICBzdHJpbmdzOiBbe1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nXCIsXG4gICAgICAgICAgICByZWdleDogJyhcXFxcYicgKyBpZGVudGlmaWVyICsgJyk/XCJcIlwiJyxcbiAgICAgICAgICAgIHB1c2g6IFt7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6ICdcIlwiXCInLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwic3RyaW5nXCJcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgcmVnZXg6IFwiXFxcXGJcIiArIGlkZW50aWZpZXIgKyAnXCIoPz0uKScsXG4gICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAnXCJ8JCcsXG4gICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzdHJpbmdcIlxuICAgICAgICAgICAgfV1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nXCIsXG4gICAgICAgICAgICByZWdleDogJ1wiJyxcbiAgICAgICAgICAgIHB1c2g6IFt7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6ICdcInwkJyxcbiAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IHN0cmluZ0VzY2FwZVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzdHJpbmdcIlxuICAgICAgICAgICAgfV1cbiAgICAgICAgfV1cbiAgICB9O1xuICAgIHRoaXMubm9ybWFsaXplUnVsZXMoKTtcbn07XG5cblxub29wLmluaGVyaXRzKE5pbUhpZ2hsaWdodFJ1bGVzLCBUZXh0SGlnaGxpZ2h0UnVsZXMpO1xuXG5leHBvcnRzLk5pbUhpZ2hsaWdodFJ1bGVzID0gTmltSGlnaGxpZ2h0UnVsZXM7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=