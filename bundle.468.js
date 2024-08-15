"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[468],{

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

/***/ 40468:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/*
  THIS FILE WAS AUTOGENERATED BY mode.tmpl.js
*/



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var HighlightRules = (__webpack_require__(79255)/* .HighlightRules */ .G);
// TODO: pick appropriate fold mode
var FoldMode = (__webpack_require__(93887)/* .FoldMode */ .l);

var Mode = function() {
    this.HighlightRules = HighlightRules;
    this.foldingRules = new FoldMode();
    this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, TextMode);

(function() {
    this.lineCommentStart = "//";
    this.blockComment = {start: "/*", end: "*/", nestable: true};
    
    this.$id = "ace/mode/swift";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 79255:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var __webpack_unused_export__;


var oop = __webpack_require__(2645);
var lang = __webpack_require__(39955);
var DocCommentHighlightRules = (__webpack_require__(42124)/* .DocCommentHighlightRules */ .l);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

var SwiftHighlightRules = function() {
   var keywordMapper = this.createKeywordMapper({
        "variable.language": "",
        "keyword": "__COLUMN__|__FILE__|__FUNCTION__|__LINE__"
            + "|as|associativity|break|case|class|continue|default|deinit|didSet"
            + "|do|dynamicType|else|enum|extension|fallthrough|for|func|get|if|import"
            + "|in|infix|init|inout|is|left|let|let|mutating|new|none|nonmutating"
            + "|operator|override|postfix|precedence|prefix|protocol|return|right"
            + "|safe|Self|self|set|struct|subscript|switch|Type|typealias"
            + "|unowned|unsafe|var|weak|where|while|willSet"
            + "|convenience|dynamic|final|infix|lazy|mutating|nonmutating|optional|override|postfix"
            + "|prefix|required|static|guard|defer",
        "storage.type": "bool|double|Double"
            + "|extension|float|Float|int|Int|open|internal|fileprivate|private|public|string|String",
        "constant.language":
            "false|Infinity|NaN|nil|no|null|null|off|on|super|this|true|undefined|yes",
        "support.function":
            ""
    }, "identifier");
    
    function string(start, options) {
        var nestable = options.nestable || options.interpolation;
        var interpStart = options.interpolation && options.interpolation.nextState || "start";
        var mainRule = {
            regex: start + (options.multiline ? "" : "(?=.)"),
            token: "string.start"
        };
        var nextState = [
            options.escape && {
                regex: options.escape,
                token: "character.escape"
            },
            options.interpolation && {
                token : "paren.quasi.start",
                regex : lang.escapeRegExp(options.interpolation.lead + options.interpolation.open),
                push  : interpStart
            },
            options.error && {
                regex: options.error,
                token: "error.invalid"
            }, 
            {
                regex: start + (options.multiline ? "" : "|$"),
                token: "string.end",
                next: nestable ? "pop" : "start"
            }, {
                defaultToken: "string"
            }
        ].filter(Boolean);
        
        if (nestable)
            mainRule.push = nextState;
        else
            mainRule.next = nextState;
        
        if (!options.interpolation)
            return mainRule;
        
        var open = options.interpolation.open;
        var close = options.interpolation.close;
        var counter = {
            regex: "[" + lang.escapeRegExp(open + close) + "]",
            onMatch: function(val, state, stack) {
                this.next = val == open ? this.nextState : "";
                if (val == open && stack.length) {
                    stack.unshift("start", state);
                    return "paren";
                }
                if (val == close && stack.length) {
                    stack.shift();
                    this.next = stack.shift();
                    if (this.next.indexOf("string") != -1)
                        return "paren.quasi.end";
                }
                return val == open ? "paren.lparen" : "paren.rparen";
            },
            nextState: interpStart
        }; 
        return [counter, mainRule];
    }
    
    function comments() {
        return [{
                token : "comment",
                regex : /\/\//,
                next : [
                    DocCommentHighlightRules.getTagRule(),
                    {token : "comment", regex : "$|^", next: "start"},
                    {defaultToken : "comment", caseInsensitive: true}
                ]
            },
            DocCommentHighlightRules.getStartRule("doc-start"),
            {
                token : "comment.start",
                regex : /\/\*/,
                stateName: "nested_comment",
                push : [
                    DocCommentHighlightRules.getTagRule(),
                    {token : "comment.start", regex : /\/\*/, push: "nested_comment"},
                    {token : "comment.end", regex : "\\*\\/", next : "pop"},
                    {defaultToken : "comment", caseInsensitive: true}
                ]
            }
        ];
    }
    

    this.$rules = {
        start: [
            string('"""', {
                escape: /\\(?:[0\\tnr"']|u{[a-fA-F1-9]{0,8}})/,
                interpolation: {lead: "\\", open: "(", close: ")"},
                error: /\\./,
                multiline: true
            }),
            string('"', {
                escape: /\\(?:[0\\tnr"']|u{[a-fA-F1-9]{0,8}})/,
                interpolation: {lead: "\\", open: "(", close: ")"},
                error: /\\./,
                multiline: false
            }),
            comments(),
            {
                 regex: /@[a-zA-Z_$][a-zA-Z_$\d\u0080-\ufffe]*/,
                 token: "variable.parameter"
            },
            {
                regex: /[a-zA-Z_$][a-zA-Z_$\d\u0080-\ufffe]*/,
                token: keywordMapper
            },  
            {
                token : "constant.numeric", 
                regex : /[+-]?(?:0(?:b[01]+|o[0-7]+|x[\da-fA-F])|\d+(?:(?:\.\d*)?(?:[PpEe][+-]?\d+)?)\b)/
            }, {
                token : "keyword.operator",
                regex : /--|\+\+|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\|\||\?:|[!$%&*+\-~\/^]=?/,
                next  : "start"
            }, {
                token : "punctuation.operator",
                regex : /[?:,;.]/,
                next  : "start"
            }, {
                token : "paren.lparen",
                regex : /[\[({]/,
                next  : "start"
            }, {
                token : "paren.rparen",
                regex : /[\])}]/
            } 
            
        ]
    };
    this.embedRules(DocCommentHighlightRules, "doc-",
        [ DocCommentHighlightRules.getEndRule("start") ]);
    
    this.normalizeRules();
};


oop.inherits(SwiftHighlightRules, TextHighlightRules);

exports.G = SwiftHighlightRules;
__webpack_unused_export__ = SwiftHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLGdEQUFnRDtBQUNyRSxxQkFBcUI7QUFDckI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsZ0VBQWdFO0FBQ3JGLHFCQUFxQixzREFBc0Q7QUFDM0UscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLFlBQVksS0FBSztBQUM1RCxnQ0FBZ0Msa0NBQWtDO0FBQ2xFO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSwyQ0FBMkMsWUFBWSxLQUFLO0FBQzVELGdDQUFnQyxrQ0FBa0M7QUFDbEU7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBLGFBQWE7QUFDYjtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBLGFBQWE7QUFDYjtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBLFNBQXNCO0FBQ3RCLHlCQUEyQiIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvZG9jX2NvbW1lbnRfaGlnaGxpZ2h0X3J1bGVzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvZm9sZGluZy9jc3R5bGUuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9zd2lmdC5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL3N3aWZ0X2hpZ2hsaWdodF9ydWxlcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcblxudmFyIERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLiRydWxlcyA9IHtcbiAgICAgICAgXCJzdGFydFwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwiY29tbWVudC5kb2MudGFnXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiQFxcXFx3Kyg/PVxcXFxzfCQpXCJcbiAgICAgICAgICAgIH0sIERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcy5nZXRUYWdSdWxlKCksIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwiY29tbWVudC5kb2MuYm9keVwiLFxuICAgICAgICAgICAgICAgIGNhc2VJbnNlbnNpdGl2ZTogdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfTtcbn07XG5cbm9vcC5pbmhlcml0cyhEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMsIFRleHRIaWdobGlnaHRSdWxlcyk7XG5cbkRvY0NvbW1lbnRIaWdobGlnaHRSdWxlcy5nZXRUYWdSdWxlID0gZnVuY3Rpb24oc3RhcnQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0b2tlbiA6IFwiY29tbWVudC5kb2MudGFnLnN0b3JhZ2UudHlwZVwiLFxuICAgICAgICByZWdleCA6IFwiXFxcXGIoPzpUT0RPfEZJWE1FfFhYWHxIQUNLKVxcXFxiXCJcbiAgICB9O1xufTtcblxuRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLmdldFN0YXJ0UnVsZSA9IGZ1bmN0aW9uKHN0YXJ0KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdG9rZW4gOiBcImNvbW1lbnQuZG9jXCIsIC8vIGRvYyBjb21tZW50XG4gICAgICAgIHJlZ2V4OiAvXFwvXFwqXFwqKD8hXFwvKS8sXG4gICAgICAgIG5leHQgIDogc3RhcnRcbiAgICB9O1xufTtcblxuRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLmdldEVuZFJ1bGUgPSBmdW5jdGlvbiAoc3RhcnQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0b2tlbiA6IFwiY29tbWVudC5kb2NcIiwgLy8gY2xvc2luZyBjb21tZW50XG4gICAgICAgIHJlZ2V4IDogXCJcXFxcKlxcXFwvXCIsXG4gICAgICAgIG5leHQgIDogc3RhcnRcbiAgICB9O1xufTtcblxuXG5leHBvcnRzLkRvY0NvbW1lbnRIaWdobGlnaHRSdWxlcyA9IERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uLy4uL2xpYi9vb3BcIik7XG52YXIgUmFuZ2UgPSByZXF1aXJlKFwiLi4vLi4vcmFuZ2VcIikuUmFuZ2U7XG52YXIgQmFzZUZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZF9tb2RlXCIpLkZvbGRNb2RlO1xuXG52YXIgRm9sZE1vZGUgPSBleHBvcnRzLkZvbGRNb2RlID0gZnVuY3Rpb24oY29tbWVudFJlZ2V4KSB7XG4gICAgaWYgKGNvbW1lbnRSZWdleCkge1xuICAgICAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlciA9IG5ldyBSZWdFeHAoXG4gICAgICAgICAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlci5zb3VyY2UucmVwbGFjZSgvXFx8W158XSo/JC8sIFwifFwiICsgY29tbWVudFJlZ2V4LnN0YXJ0KVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmZvbGRpbmdTdG9wTWFya2VyID0gbmV3IFJlZ0V4cChcbiAgICAgICAgICAgIHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIuc291cmNlLnJlcGxhY2UoL1xcfFtefF0qPyQvLCBcInxcIiArIGNvbW1lbnRSZWdleC5lbmQpXG4gICAgICAgICk7XG4gICAgfVxufTtcbm9vcC5pbmhlcml0cyhGb2xkTW9kZSwgQmFzZUZvbGRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuICAgIFxuICAgIHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyID0gLyhbXFx7XFxbXFwoXSlbXlxcfVxcXVxcKV0qJHxeXFxzKihcXC9cXCopLztcbiAgICB0aGlzLmZvbGRpbmdTdG9wTWFya2VyID0gL15bXlxcW1xce1xcKF0qKFtcXH1cXF1cXCldKXxeW1xcc1xcKl0qKFxcKlxcLykvO1xuICAgIHRoaXMuc2luZ2xlTGluZUJsb2NrQ29tbWVudFJlPSAvXlxccyooXFwvXFwqKS4qXFwqXFwvXFxzKiQvO1xuICAgIHRoaXMudHJpcGxlU3RhckJsb2NrQ29tbWVudFJlID0gL15cXHMqKFxcL1xcKlxcKlxcKikuKlxcKlxcL1xccyokLztcbiAgICB0aGlzLnN0YXJ0UmVnaW9uUmUgPSAvXlxccyooXFwvXFwqfFxcL1xcLykjP3JlZ2lvblxcYi87XG4gICAgXG4gICAgLy9wcmV2ZW50IG5hbWluZyBjb25mbGljdCB3aXRoIGFueSBtb2RlcyB0aGF0IGluaGVyaXQgZnJvbSBjc3R5bGUgYW5kIG92ZXJyaWRlIHRoaXMgKGxpa2UgY3NoYXJwKVxuICAgIHRoaXMuX2dldEZvbGRXaWRnZXRCYXNlID0gdGhpcy5nZXRGb2xkV2lkZ2V0O1xuICAgIFxuICAgIC8qKlxuICAgICAqIEdldHMgZm9sZCB3aWRnZXQgd2l0aCBzb21lIG5vbi1zdGFuZGFyZCBleHRyYXM6XG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSBsaW5lQ29tbWVudFJlZ2lvblN0YXJ0XG4gICAgICogICAgICAvLyNyZWdpb24gW29wdGlvbmFsIGRlc2NyaXB0aW9uXVxuICAgICAqXG4gICAgICogQGV4YW1wbGUgYmxvY2tDb21tZW50UmVnaW9uU3RhcnRcbiAgICAgKiAgICAgIC8qI3JlZ2lvbiBbb3B0aW9uYWwgZGVzY3JpcHRpb25dICpbL11cbiAgICAgKlxuICAgICAqIEBleGFtcGxlIHRyaXBsZVN0YXJGb2xkaW5nU2VjdGlvblxuICAgICAqICAgICAgLyoqKiB0aGlzIGZvbGRzIGV2ZW4gdGhvdWdoIDEgbGluZSBiZWNhdXNlIGl0IGhhcyAzIHN0YXJzICoqKlsvXVxuICAgICAqIFxuICAgICAqIEBub3RlIHRoZSBwb3VuZCBzeW1ib2wgZm9yIHJlZ2lvbiB0YWdzIGlzIG9wdGlvbmFsXG4gICAgICovXG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0ID0gZnVuY3Rpb24oc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICBcbiAgICAgICAgaWYgKHRoaXMuc2luZ2xlTGluZUJsb2NrQ29tbWVudFJlLnRlc3QobGluZSkpIHtcbiAgICAgICAgICAgIC8vIE5vIHdpZGdldCBmb3Igc2luZ2xlIGxpbmUgYmxvY2sgY29tbWVudCB1bmxlc3MgcmVnaW9uIG9yIHRyaXBsZSBzdGFyXG4gICAgICAgICAgICBpZiAoIXRoaXMuc3RhcnRSZWdpb25SZS50ZXN0KGxpbmUpICYmICF0aGlzLnRyaXBsZVN0YXJCbG9ja0NvbW1lbnRSZS50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIHZhciBmdyA9IHRoaXMuX2dldEZvbGRXaWRnZXRCYXNlKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KTtcbiAgICBcbiAgICAgICAgaWYgKCFmdyAmJiB0aGlzLnN0YXJ0UmVnaW9uUmUudGVzdChsaW5lKSlcbiAgICAgICAgICAgIHJldHVybiBcInN0YXJ0XCI7IC8vIGxpbmVDb21tZW50UmVnaW9uU3RhcnRcbiAgICBcbiAgICAgICAgcmV0dXJuIGZ3O1xuICAgIH07XG5cbiAgICB0aGlzLmdldEZvbGRXaWRnZXRSYW5nZSA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93LCBmb3JjZU11bHRpbGluZSkge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuc3RhcnRSZWdpb25SZS50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q29tbWVudFJlZ2lvbkJsb2NrKHNlc3Npb24sIGxpbmUsIHJvdyk7XG4gICAgICAgIFxuICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyKTtcbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICB2YXIgaSA9IG1hdGNoLmluZGV4O1xuXG4gICAgICAgICAgICBpZiAobWF0Y2hbMV0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMub3BlbmluZ0JyYWNrZXRCbG9jayhzZXNzaW9uLCBtYXRjaFsxXSwgcm93LCBpKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciByYW5nZSA9IHNlc3Npb24uZ2V0Q29tbWVudEZvbGRSYW5nZShyb3csIGkgKyBtYXRjaFswXS5sZW5ndGgsIDEpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAocmFuZ2UgJiYgIXJhbmdlLmlzTXVsdGlMaW5lKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoZm9yY2VNdWx0aWxpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2UgPSB0aGlzLmdldFNlY3Rpb25SYW5nZShzZXNzaW9uLCByb3cpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZm9sZFN0eWxlICE9IFwiYWxsXCIpXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIHJhbmdlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZvbGRTdHlsZSA9PT0gXCJtYXJrYmVnaW5cIilcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIpO1xuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIHZhciBpID0gbWF0Y2guaW5kZXggKyBtYXRjaFswXS5sZW5ndGg7XG5cbiAgICAgICAgICAgIGlmIChtYXRjaFsxXSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jbG9zaW5nQnJhY2tldEJsb2NrKHNlc3Npb24sIG1hdGNoWzFdLCByb3csIGkpO1xuXG4gICAgICAgICAgICByZXR1cm4gc2Vzc2lvbi5nZXRDb21tZW50Rm9sZFJhbmdlKHJvdywgaSwgLTEpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBcbiAgICB0aGlzLmdldFNlY3Rpb25SYW5nZSA9IGZ1bmN0aW9uKHNlc3Npb24sIHJvdykge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICB2YXIgc3RhcnRJbmRlbnQgPSBsaW5lLnNlYXJjaCgvXFxTLyk7XG4gICAgICAgIHZhciBzdGFydFJvdyA9IHJvdztcbiAgICAgICAgdmFyIHN0YXJ0Q29sdW1uID0gbGluZS5sZW5ndGg7XG4gICAgICAgIHJvdyA9IHJvdyArIDE7XG4gICAgICAgIHZhciBlbmRSb3cgPSByb3c7XG4gICAgICAgIHZhciBtYXhSb3cgPSBzZXNzaW9uLmdldExlbmd0aCgpO1xuICAgICAgICB3aGlsZSAoKytyb3cgPCBtYXhSb3cpIHtcbiAgICAgICAgICAgIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgICAgIHZhciBpbmRlbnQgPSBsaW5lLnNlYXJjaCgvXFxTLyk7XG4gICAgICAgICAgICBpZiAoaW5kZW50ID09PSAtMSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIGlmICAoc3RhcnRJbmRlbnQgPiBpbmRlbnQpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB2YXIgc3ViUmFuZ2UgPSB0aGlzLmdldEZvbGRXaWRnZXRSYW5nZShzZXNzaW9uLCBcImFsbFwiLCByb3cpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoc3ViUmFuZ2UpIHtcbiAgICAgICAgICAgICAgICBpZiAoc3ViUmFuZ2Uuc3RhcnQucm93IDw9IHN0YXJ0Um93KSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3ViUmFuZ2UuaXNNdWx0aUxpbmUoKSkge1xuICAgICAgICAgICAgICAgICAgICByb3cgPSBzdWJSYW5nZS5lbmQucm93O1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhcnRJbmRlbnQgPT0gaW5kZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVuZFJvdyA9IHJvdztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShzdGFydFJvdywgc3RhcnRDb2x1bW4sIGVuZFJvdywgc2Vzc2lvbi5nZXRMaW5lKGVuZFJvdykubGVuZ3RoKTtcbiAgICB9O1xuICAgIFxuICAgIC8qKlxuICAgICAqIGdldHMgY29tbWVudCByZWdpb24gYmxvY2sgd2l0aCBlbmQgcmVnaW9uIGFzc3VtZWQgdG8gYmUgc3RhcnQgb2YgY29tbWVudCBpbiBhbnkgY3N0eWxlIG1vZGUgb3IgU1FMIG1vZGUgKC0tKSB3aGljaCBpbmhlcml0cyBmcm9tIHRoaXMuXG4gICAgICogVGhlcmUgbWF5IG9wdGlvbmFsbHkgYmUgYSBwb3VuZCBzeW1ib2wgYmVmb3JlIHRoZSByZWdpb24vZW5kcmVnaW9uIHN0YXRlbWVudFxuICAgICAqL1xuICAgIHRoaXMuZ2V0Q29tbWVudFJlZ2lvbkJsb2NrID0gZnVuY3Rpb24oc2Vzc2lvbiwgbGluZSwgcm93KSB7XG4gICAgICAgIHZhciBzdGFydENvbHVtbiA9IGxpbmUuc2VhcmNoKC9cXHMqJC8pO1xuICAgICAgICB2YXIgbWF4Um93ID0gc2Vzc2lvbi5nZXRMZW5ndGgoKTtcbiAgICAgICAgdmFyIHN0YXJ0Um93ID0gcm93O1xuICAgICAgICBcbiAgICAgICAgdmFyIHJlID0gL15cXHMqKD86XFwvXFwqfFxcL1xcL3wtLSkjPyhlbmQpP3JlZ2lvblxcYi87XG4gICAgICAgIHZhciBkZXB0aCA9IDE7XG4gICAgICAgIHdoaWxlICgrK3JvdyA8IG1heFJvdykge1xuICAgICAgICAgICAgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICAgICAgdmFyIG0gPSByZS5leGVjKGxpbmUpO1xuICAgICAgICAgICAgaWYgKCFtKSBjb250aW51ZTtcbiAgICAgICAgICAgIGlmIChtWzFdKSBkZXB0aC0tO1xuICAgICAgICAgICAgZWxzZSBkZXB0aCsrO1xuXG4gICAgICAgICAgICBpZiAoIWRlcHRoKSBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBlbmRSb3cgPSByb3c7XG4gICAgICAgIGlmIChlbmRSb3cgPiBzdGFydFJvdykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShzdGFydFJvdywgc3RhcnRDb2x1bW4sIGVuZFJvdywgbGluZS5sZW5ndGgpO1xuICAgICAgICB9XG4gICAgfTtcblxufSkuY2FsbChGb2xkTW9kZS5wcm90b3R5cGUpO1xuIiwiLypcbiAgVEhJUyBGSUxFIFdBUyBBVVRPR0VORVJBVEVEIEJZIG1vZGUudG1wbC5qc1xuKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0TW9kZSA9IHJlcXVpcmUoXCIuL3RleHRcIikuTW9kZTtcbnZhciBIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3N3aWZ0X2hpZ2hsaWdodF9ydWxlc1wiKS5IaWdobGlnaHRSdWxlcztcbi8vIFRPRE86IHBpY2sgYXBwcm9wcmlhdGUgZm9sZCBtb2RlXG52YXIgRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9mb2xkaW5nL2NzdHlsZVwiKS5Gb2xkTW9kZTtcblxudmFyIE1vZGUgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLkhpZ2hsaWdodFJ1bGVzID0gSGlnaGxpZ2h0UnVsZXM7XG4gICAgdGhpcy5mb2xkaW5nUnVsZXMgPSBuZXcgRm9sZE1vZGUoKTtcbiAgICB0aGlzLiRiZWhhdmlvdXIgPSB0aGlzLiRkZWZhdWx0QmVoYXZpb3VyO1xufTtcbm9vcC5pbmhlcml0cyhNb2RlLCBUZXh0TW9kZSk7XG5cbihmdW5jdGlvbigpIHtcbiAgICB0aGlzLmxpbmVDb21tZW50U3RhcnQgPSBcIi8vXCI7XG4gICAgdGhpcy5ibG9ja0NvbW1lbnQgPSB7c3RhcnQ6IFwiLypcIiwgZW5kOiBcIiovXCIsIG5lc3RhYmxlOiB0cnVlfTtcbiAgICBcbiAgICB0aGlzLiRpZCA9IFwiYWNlL21vZGUvc3dpZnRcIjtcbn0pLmNhbGwoTW9kZS5wcm90b3R5cGUpO1xuXG5leHBvcnRzLk1vZGUgPSBNb2RlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBsYW5nID0gcmVxdWlyZShcIi4uL2xpYi9sYW5nXCIpO1xudmFyIERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL2RvY19jb21tZW50X2hpZ2hsaWdodF9ydWxlc1wiKS5Eb2NDb21tZW50SGlnaGxpZ2h0UnVsZXM7XG52YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xuXG52YXIgU3dpZnRIaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uKCkge1xuICAgdmFyIGtleXdvcmRNYXBwZXIgPSB0aGlzLmNyZWF0ZUtleXdvcmRNYXBwZXIoe1xuICAgICAgICBcInZhcmlhYmxlLmxhbmd1YWdlXCI6IFwiXCIsXG4gICAgICAgIFwia2V5d29yZFwiOiBcIl9fQ09MVU1OX198X19GSUxFX198X19GVU5DVElPTl9ffF9fTElORV9fXCJcbiAgICAgICAgICAgICsgXCJ8YXN8YXNzb2NpYXRpdml0eXxicmVha3xjYXNlfGNsYXNzfGNvbnRpbnVlfGRlZmF1bHR8ZGVpbml0fGRpZFNldFwiXG4gICAgICAgICAgICArIFwifGRvfGR5bmFtaWNUeXBlfGVsc2V8ZW51bXxleHRlbnNpb258ZmFsbHRocm91Z2h8Zm9yfGZ1bmN8Z2V0fGlmfGltcG9ydFwiXG4gICAgICAgICAgICArIFwifGlufGluZml4fGluaXR8aW5vdXR8aXN8bGVmdHxsZXR8bGV0fG11dGF0aW5nfG5ld3xub25lfG5vbm11dGF0aW5nXCJcbiAgICAgICAgICAgICsgXCJ8b3BlcmF0b3J8b3ZlcnJpZGV8cG9zdGZpeHxwcmVjZWRlbmNlfHByZWZpeHxwcm90b2NvbHxyZXR1cm58cmlnaHRcIlxuICAgICAgICAgICAgKyBcInxzYWZlfFNlbGZ8c2VsZnxzZXR8c3RydWN0fHN1YnNjcmlwdHxzd2l0Y2h8VHlwZXx0eXBlYWxpYXNcIlxuICAgICAgICAgICAgKyBcInx1bm93bmVkfHVuc2FmZXx2YXJ8d2Vha3x3aGVyZXx3aGlsZXx3aWxsU2V0XCJcbiAgICAgICAgICAgICsgXCJ8Y29udmVuaWVuY2V8ZHluYW1pY3xmaW5hbHxpbmZpeHxsYXp5fG11dGF0aW5nfG5vbm11dGF0aW5nfG9wdGlvbmFsfG92ZXJyaWRlfHBvc3RmaXhcIlxuICAgICAgICAgICAgKyBcInxwcmVmaXh8cmVxdWlyZWR8c3RhdGljfGd1YXJkfGRlZmVyXCIsXG4gICAgICAgIFwic3RvcmFnZS50eXBlXCI6IFwiYm9vbHxkb3VibGV8RG91YmxlXCJcbiAgICAgICAgICAgICsgXCJ8ZXh0ZW5zaW9ufGZsb2F0fEZsb2F0fGludHxJbnR8b3BlbnxpbnRlcm5hbHxmaWxlcHJpdmF0ZXxwcml2YXRlfHB1YmxpY3xzdHJpbmd8U3RyaW5nXCIsXG4gICAgICAgIFwiY29uc3RhbnQubGFuZ3VhZ2VcIjpcbiAgICAgICAgICAgIFwiZmFsc2V8SW5maW5pdHl8TmFOfG5pbHxub3xudWxsfG51bGx8b2ZmfG9ufHN1cGVyfHRoaXN8dHJ1ZXx1bmRlZmluZWR8eWVzXCIsXG4gICAgICAgIFwic3VwcG9ydC5mdW5jdGlvblwiOlxuICAgICAgICAgICAgXCJcIlxuICAgIH0sIFwiaWRlbnRpZmllclwiKTtcbiAgICBcbiAgICBmdW5jdGlvbiBzdHJpbmcoc3RhcnQsIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIG5lc3RhYmxlID0gb3B0aW9ucy5uZXN0YWJsZSB8fCBvcHRpb25zLmludGVycG9sYXRpb247XG4gICAgICAgIHZhciBpbnRlcnBTdGFydCA9IG9wdGlvbnMuaW50ZXJwb2xhdGlvbiAmJiBvcHRpb25zLmludGVycG9sYXRpb24ubmV4dFN0YXRlIHx8IFwic3RhcnRcIjtcbiAgICAgICAgdmFyIG1haW5SdWxlID0ge1xuICAgICAgICAgICAgcmVnZXg6IHN0YXJ0ICsgKG9wdGlvbnMubXVsdGlsaW5lID8gXCJcIiA6IFwiKD89LilcIiksXG4gICAgICAgICAgICB0b2tlbjogXCJzdHJpbmcuc3RhcnRcIlxuICAgICAgICB9O1xuICAgICAgICB2YXIgbmV4dFN0YXRlID0gW1xuICAgICAgICAgICAgb3B0aW9ucy5lc2NhcGUgJiYge1xuICAgICAgICAgICAgICAgIHJlZ2V4OiBvcHRpb25zLmVzY2FwZSxcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJjaGFyYWN0ZXIuZXNjYXBlXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvcHRpb25zLmludGVycG9sYXRpb24gJiYge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJwYXJlbi5xdWFzaS5zdGFydFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogbGFuZy5lc2NhcGVSZWdFeHAob3B0aW9ucy5pbnRlcnBvbGF0aW9uLmxlYWQgKyBvcHRpb25zLmludGVycG9sYXRpb24ub3BlbiksXG4gICAgICAgICAgICAgICAgcHVzaCAgOiBpbnRlcnBTdGFydFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9wdGlvbnMuZXJyb3IgJiYge1xuICAgICAgICAgICAgICAgIHJlZ2V4OiBvcHRpb25zLmVycm9yLFxuICAgICAgICAgICAgICAgIHRva2VuOiBcImVycm9yLmludmFsaWRcIlxuICAgICAgICAgICAgfSwgXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmVnZXg6IHN0YXJ0ICsgKG9wdGlvbnMubXVsdGlsaW5lID8gXCJcIiA6IFwifCRcIiksXG4gICAgICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nLmVuZFwiLFxuICAgICAgICAgICAgICAgIG5leHQ6IG5lc3RhYmxlID8gXCJwb3BcIiA6IFwic3RhcnRcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzdHJpbmdcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdLmZpbHRlcihCb29sZWFuKTtcbiAgICAgICAgXG4gICAgICAgIGlmIChuZXN0YWJsZSlcbiAgICAgICAgICAgIG1haW5SdWxlLnB1c2ggPSBuZXh0U3RhdGU7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIG1haW5SdWxlLm5leHQgPSBuZXh0U3RhdGU7XG4gICAgICAgIFxuICAgICAgICBpZiAoIW9wdGlvbnMuaW50ZXJwb2xhdGlvbilcbiAgICAgICAgICAgIHJldHVybiBtYWluUnVsZTtcbiAgICAgICAgXG4gICAgICAgIHZhciBvcGVuID0gb3B0aW9ucy5pbnRlcnBvbGF0aW9uLm9wZW47XG4gICAgICAgIHZhciBjbG9zZSA9IG9wdGlvbnMuaW50ZXJwb2xhdGlvbi5jbG9zZTtcbiAgICAgICAgdmFyIGNvdW50ZXIgPSB7XG4gICAgICAgICAgICByZWdleDogXCJbXCIgKyBsYW5nLmVzY2FwZVJlZ0V4cChvcGVuICsgY2xvc2UpICsgXCJdXCIsXG4gICAgICAgICAgICBvbk1hdGNoOiBmdW5jdGlvbih2YWwsIHN0YXRlLCBzdGFjaykge1xuICAgICAgICAgICAgICAgIHRoaXMubmV4dCA9IHZhbCA9PSBvcGVuID8gdGhpcy5uZXh0U3RhdGUgOiBcIlwiO1xuICAgICAgICAgICAgICAgIGlmICh2YWwgPT0gb3BlbiAmJiBzdGFjay5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhY2sudW5zaGlmdChcInN0YXJ0XCIsIHN0YXRlKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwicGFyZW5cIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHZhbCA9PSBjbG9zZSAmJiBzdGFjay5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhY2suc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0ID0gc3RhY2suc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubmV4dC5pbmRleE9mKFwic3RyaW5nXCIpICE9IC0xKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwicGFyZW4ucXVhc2kuZW5kXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB2YWwgPT0gb3BlbiA/IFwicGFyZW4ubHBhcmVuXCIgOiBcInBhcmVuLnJwYXJlblwiO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5leHRTdGF0ZTogaW50ZXJwU3RhcnRcbiAgICAgICAgfTsgXG4gICAgICAgIHJldHVybiBbY291bnRlciwgbWFpblJ1bGVdO1xuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiBjb21tZW50cygpIHtcbiAgICAgICAgcmV0dXJuIFt7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC9cXC9cXC8vLFxuICAgICAgICAgICAgICAgIG5leHQgOiBbXG4gICAgICAgICAgICAgICAgICAgIERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcy5nZXRUYWdSdWxlKCksXG4gICAgICAgICAgICAgICAgICAgIHt0b2tlbiA6IFwiY29tbWVudFwiLCByZWdleCA6IFwiJHxeXCIsIG5leHQ6IFwic3RhcnRcIn0sXG4gICAgICAgICAgICAgICAgICAgIHtkZWZhdWx0VG9rZW4gOiBcImNvbW1lbnRcIiwgY2FzZUluc2Vuc2l0aXZlOiB0cnVlfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMuZ2V0U3RhcnRSdWxlKFwiZG9jLXN0YXJ0XCIpLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50LnN0YXJ0XCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvXFwvXFwqLyxcbiAgICAgICAgICAgICAgICBzdGF0ZU5hbWU6IFwibmVzdGVkX2NvbW1lbnRcIixcbiAgICAgICAgICAgICAgICBwdXNoIDogW1xuICAgICAgICAgICAgICAgICAgICBEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMuZ2V0VGFnUnVsZSgpLFxuICAgICAgICAgICAgICAgICAgICB7dG9rZW4gOiBcImNvbW1lbnQuc3RhcnRcIiwgcmVnZXggOiAvXFwvXFwqLywgcHVzaDogXCJuZXN0ZWRfY29tbWVudFwifSxcbiAgICAgICAgICAgICAgICAgICAge3Rva2VuIDogXCJjb21tZW50LmVuZFwiLCByZWdleCA6IFwiXFxcXCpcXFxcL1wiLCBuZXh0IDogXCJwb3BcIn0sXG4gICAgICAgICAgICAgICAgICAgIHtkZWZhdWx0VG9rZW4gOiBcImNvbW1lbnRcIiwgY2FzZUluc2Vuc2l0aXZlOiB0cnVlfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgXTtcbiAgICB9XG4gICAgXG5cbiAgICB0aGlzLiRydWxlcyA9IHtcbiAgICAgICAgc3RhcnQ6IFtcbiAgICAgICAgICAgIHN0cmluZygnXCJcIlwiJywge1xuICAgICAgICAgICAgICAgIGVzY2FwZTogL1xcXFwoPzpbMFxcXFx0bnJcIiddfHV7W2EtZkEtRjEtOV17MCw4fX0pLyxcbiAgICAgICAgICAgICAgICBpbnRlcnBvbGF0aW9uOiB7bGVhZDogXCJcXFxcXCIsIG9wZW46IFwiKFwiLCBjbG9zZTogXCIpXCJ9LFxuICAgICAgICAgICAgICAgIGVycm9yOiAvXFxcXC4vLFxuICAgICAgICAgICAgICAgIG11bHRpbGluZTogdHJ1ZVxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBzdHJpbmcoJ1wiJywge1xuICAgICAgICAgICAgICAgIGVzY2FwZTogL1xcXFwoPzpbMFxcXFx0bnJcIiddfHV7W2EtZkEtRjEtOV17MCw4fX0pLyxcbiAgICAgICAgICAgICAgICBpbnRlcnBvbGF0aW9uOiB7bGVhZDogXCJcXFxcXCIsIG9wZW46IFwiKFwiLCBjbG9zZTogXCIpXCJ9LFxuICAgICAgICAgICAgICAgIGVycm9yOiAvXFxcXC4vLFxuICAgICAgICAgICAgICAgIG11bHRpbGluZTogZmFsc2VcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgY29tbWVudHMoKSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgcmVnZXg6IC9AW2EtekEtWl8kXVthLXpBLVpfJFxcZFxcdTAwODAtXFx1ZmZmZV0qLyxcbiAgICAgICAgICAgICAgICAgdG9rZW46IFwidmFyaWFibGUucGFyYW1ldGVyXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmVnZXg6IC9bYS16QS1aXyRdW2EtekEtWl8kXFxkXFx1MDA4MC1cXHVmZmZlXSovLFxuICAgICAgICAgICAgICAgIHRva2VuOiBrZXl3b3JkTWFwcGVyXG4gICAgICAgICAgICB9LCAgXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIiwgXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvWystXT8oPzowKD86YlswMV0rfG9bMC03XSt8eFtcXGRhLWZBLUZdKXxcXGQrKD86KD86XFwuXFxkKik/KD86W1BwRWVdWystXT9cXGQrKT8pXFxiKS9cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwia2V5d29yZC5vcGVyYXRvclwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogLy0tfFxcK1xcK3w9PT18PT18PXwhPXwhPT18PD18Pj18PDw9fD4+PXw+Pj49fDw+fDx8PnwhfCYmfFxcfFxcfHxcXD86fFshJCUmKitcXC1+XFwvXl09Py8sXG4gICAgICAgICAgICAgICAgbmV4dCAgOiBcInN0YXJ0XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwicHVuY3R1YXRpb24ub3BlcmF0b3JcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC9bPzosOy5dLyxcbiAgICAgICAgICAgICAgICBuZXh0ICA6IFwic3RhcnRcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJwYXJlbi5scGFyZW5cIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC9bXFxbKHtdLyxcbiAgICAgICAgICAgICAgICBuZXh0ICA6IFwic3RhcnRcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJwYXJlbi5ycGFyZW5cIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC9bXFxdKX1dL1xuICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIFxuICAgICAgICBdXG4gICAgfTtcbiAgICB0aGlzLmVtYmVkUnVsZXMoRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLCBcImRvYy1cIixcbiAgICAgICAgWyBEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMuZ2V0RW5kUnVsZShcInN0YXJ0XCIpIF0pO1xuICAgIFxuICAgIHRoaXMubm9ybWFsaXplUnVsZXMoKTtcbn07XG5cblxub29wLmluaGVyaXRzKFN3aWZ0SGlnaGxpZ2h0UnVsZXMsIFRleHRIaWdobGlnaHRSdWxlcyk7XG5cbmV4cG9ydHMuSGlnaGxpZ2h0UnVsZXMgPSBTd2lmdEhpZ2hsaWdodFJ1bGVzO1xuZXhwb3J0cy5Td2lmdEhpZ2hsaWdodFJ1bGVzID0gU3dpZnRIaWdobGlnaHRSdWxlcztcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==