"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[3682],{

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

/***/ 63682:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/*
  THIS FILE WAS AUTOGENERATED BY mode.tmpl.js
*/



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var KotlinHighlightRules = (__webpack_require__(14901)/* .KotlinHighlightRules */ .n);
var FoldMode = (__webpack_require__(93887)/* .FoldMode */ .l);

var Mode = function() {
    this.HighlightRules = KotlinHighlightRules;
    this.foldingRules = new FoldMode();
    this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, TextMode);

(function() {
    this.lineCommentStart = "//";
    this.blockComment = {start: "/*", end: "*/"};
    // Extra logic goes here.
    this.$id = "ace/mode/kotlin";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 14901:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

var KotlinHighlightRules = function() {
    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used

    var keywordMapper = this.$keywords = this.createKeywordMapper({
        "storage.modifier.kotlin": "var|val|public|private|protected|abstract|final|enum|open|attribute|"
            + "annotation|override|inline|var|val|vararg|lazy|in|out|internal|data|tailrec|operator|infix|const|"
            + "yield|typealias|typeof|sealed|inner|value|lateinit|external|suspend|noinline|crossinline|reified|"
            + "expect|actual",
        "keyword": "companion|class|object|interface|namespace|type|fun|constructor|if|else|while|for|do|return|when|"
            + "where|break|continue|try|catch|finally|throw|in|is|as|assert|constructor",
        "constant.language.kotlin": "true|false|null|this|super",
        "entity.name.function.kotlin": "get|set"
    }, "identifier");

    this.$rules = {
        start: [{
            include: "#comments"
        }, {
            token: [
                "text",
                "keyword.other.kotlin",
                "text",
                "entity.name.package.kotlin",
                "text"
            ],
            regex: /^(\s*)(package)\b(?:(\s*)([^ ;$]+)(\s*))?/
        }, {
            token: "comment",
            regex: /^\s*#!.*$/
        }, {
            include: "#imports"
        }, {
            include: "#expressions"
        }, {
            token: "string",
            regex: /@[a-zA-Z][a-zA-Z:]*\b/
        }, {
            token: ["keyword.other.kotlin", "text", "entity.name.variable.kotlin"],
            regex: /\b(var|val)(\s+)([a-zA-Z_][\w]*)\b/
        }, {
            token: ["keyword.other.kotlin", "text", "entity.name.variable.kotlin", "paren.lparen"],
            regex: /(fun)(\s+)(\w+)(\()/,
            push: [{
                token: ["variable.parameter.function.kotlin", "text", "keyword.operator"],
                regex: /(\w+)(\s*)(:)/
            }, {
                token: "paren.rparen",
                regex: /\)/,
                next: "pop"
            }, {
                include: "#comments"
            }, {
                include: "#types"
            }, {
                include: "#expressions"
            }]
        }, {
            token: ["text", "keyword","text", "identifier"],
            regex: /^(\s*)(class)(\s*)([a-zA-Z]+)/,
            next: "#classes"
        }, {
            token: ["identifier", "punctuaction"],
            regex: /([a-zA-Z_][\w]*)(<)/,
            push: [{
                include: "#generics"
            }, {
                include: "#defaultTypes"
            }, {
                token: "punctuation",
                regex: />/,
                next: "pop"
            }]
        }, {
            token: keywordMapper,
            regex: /[a-zA-Z_][\w]*\b/
        }, {
            token: "paren.lparen",
            regex: /[{(\[]/
        }, {
            token: "paren.rparen",
            regex: /[})\]]/
        }],
        "#comments": [{
            token: "comment",
            regex: /\/\*/,
            push: [{
                token: "comment",
                regex: /\*\//,
                next: "pop"
            }, {
                defaultToken: "comment"
            }]
        }, {
            token: [
                "text",
                "comment"
            ],
            regex: /(\s*)(\/\/.*$)/
        }],
        "#constants": [{
            token: "constant.numeric.kotlin",
            regex: /\b(?:0(?:x|X)[0-9a-fA-F]*|(?:[0-9]+\.?[0-9]*|\.[0-9]+)(?:(?:e|E)(?:\+|-)?[0-9]+)?)(?:[LlFfUuDd]|UL|ul)?\b/
        }, {
            token: "constant.other.kotlin",
            regex: /\b[A-Z][A-Z0-9_]+\b/
        }],
        "#expressions": [{
            include: "#strings"
        }, {
            include: "#constants"
        }, {
            include: "#keywords"
        }],
        "#imports": [{
            token: [
                "text",
                "keyword.other.kotlin",
                "text",
                "keyword.other.kotlin"
            ],
            regex: /^(\s*)(import)(\s+[^ $]+\s+)((?:as)?)/
        }],
        "#generics": [{
            token: "punctuation",
            regex: /</,
            push: [{
                token: "punctuation",
                regex: />/,
                next: "pop"
            }, {
                token: "storage.type.generic.kotlin",
                regex: /\w+/
            }, {
                token: "keyword.operator",
                regex: /:/
            }, {
                token: "punctuation",
                regex: /,/
            }, {
                include: "#generics"
            }]
        }],
        "#classes": [{
            include: "#generics"
        }, {
            token: "keyword",
            regex: /public|private|constructor/
        }, {
            token: "string",
            regex: /@[a-zA-Z][a-zA-Z:]*\b/
        }, {
            token: "text",
            regex: /(?=$|\(|{)/,
            next: "start"
        }],
        "#keywords": [{
            token: "keyword.operator.kotlin",
            regex: /==|!=|===|!==|<=|>=|<|>|=>|->|::|\?:/
        }, {
            token: "keyword.operator.assignment.kotlin",
            regex: /=/
        }, {
            token: "keyword.operator.declaration.kotlin",
            regex: /:/,
            push: [{
                token: "text",
                regex: /(?=$|{|=|,)/,
                next: "pop"
            }, {
                include: "#types"
            }]
        }, {
            token: "keyword.operator.dot.kotlin",
            regex: /\./
        }, {
            token: "keyword.operator.increment-decrement.kotlin",
            regex: /\-\-|\+\+/
        }, {
            token: "keyword.operator.arithmetic.kotlin",
            regex: /\-|\+|\*|\/|%/
        }, {
            token: "keyword.operator.arithmetic.assign.kotlin",
            regex: /\+=|\-=|\*=|\/=/
        }, {
            token: "keyword.operator.logical.kotlin",
            regex: /!|&&|\|\|/
        }, {
            token: "keyword.operator.range.kotlin",
            regex: /\.\./
        }, {
            token: "punctuation.kotlin",
            regex: /[;,]/
        }],
        "#types": [{
            include: "#defaultTypes"
        }, {
            token: "paren.lparen",
            regex: /\(/,
            push: [{
                token: "paren.rparen",
                regex: /\)/,
                next: "pop"
            }, {
                include: "#defaultTypes"
            }, {
                token: "punctuation",
                regex: /,/
            }]
        }, {
            include: "#generics"
        }, {
            token: "keyword.operator.declaration.kotlin",
            regex: /->/
        }, {
            token: "paren.rparen",
            regex: /\)/
        }, {
            token: "keyword.operator.declaration.kotlin",
            regex: /:/,
            push: [{
                token: "text",
                regex: /(?=$|{|=|,)/,
                next: "pop"
            }, {
                include: "#types"
            }]
        }],
        "#defaultTypes": [{
            token: "storage.type.buildin.kotlin",
            regex: /\b(Any|Unit|String|Int|Boolean|Char|Long|Double|Float|Short|Byte|dynamic|IntArray|BooleanArray|CharArray|LongArray|DoubleArray|FloatArray|ShortArray|ByteArray|Array|List|Map|Nothing|Enum|Throwable|Comparable)\b/
        }],
        "#strings": [{
            token: "string",
            regex: /"""/,
            push: [{
                token: "string",
                regex: /"""/,
                next: "pop"
            }, {
                token: "variable.parameter.template.kotlin",
                regex: /\$\w+|\${[^}]+}/
            }, {
                token: "constant.character.escape.kotlin",
                regex: /\\./
            }, {
                defaultToken: "string"
            }]
        }, {
            token: "string",
            regex: /"/,
            push: [{
                token: "string",
                regex: /"/,
                next: "pop"
            }, {
                token: "variable.parameter.template.kotlin",
                regex: /\$\w+|\$\{[^\}]+\}/
            }, {
                token: "constant.character.escape.kotlin",
                regex: /\\./
            }, {
                defaultToken: "string"
            }]
        }, {
            token: "string",
            regex: /'/,
            push: [{
                token: "string",
                regex: /'/,
                next: "pop"
            }, {
                token: "constant.character.escape.kotlin",
                regex: /\\./
            }, {
                defaultToken: "string"
            }]
        }, {
            token: "string",
            regex: /`/,
            push: [{
                token: "string",
                regex: /`/,
                next: "pop"
            }, {
                defaultToken: "string"
            }]
        }]
    };

    this.normalizeRules();
};

KotlinHighlightRules.metaData = {
    fileTypes: ["kt", "kts"],
    name: "Kotlin",
    scopeName: "source.Kotlin"
};


oop.inherits(KotlinHighlightRules, TextHighlightRules);

exports.n = KotlinHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxzQkFBc0I7QUFDdEIsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsaUNBQWlDLEdBQUcsR0FBRztBQUN2QyxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0Esa0NBQWtDLElBQUksSUFBSTtBQUMxQyxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQSxTQUE0QiIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvZm9sZGluZy9jc3R5bGUuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9rb3RsaW4uanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9rb3RsaW5faGlnaGxpZ2h0X3J1bGVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uLy4uL2xpYi9vb3BcIik7XG52YXIgUmFuZ2UgPSByZXF1aXJlKFwiLi4vLi4vcmFuZ2VcIikuUmFuZ2U7XG52YXIgQmFzZUZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZF9tb2RlXCIpLkZvbGRNb2RlO1xuXG52YXIgRm9sZE1vZGUgPSBleHBvcnRzLkZvbGRNb2RlID0gZnVuY3Rpb24oY29tbWVudFJlZ2V4KSB7XG4gICAgaWYgKGNvbW1lbnRSZWdleCkge1xuICAgICAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlciA9IG5ldyBSZWdFeHAoXG4gICAgICAgICAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlci5zb3VyY2UucmVwbGFjZSgvXFx8W158XSo/JC8sIFwifFwiICsgY29tbWVudFJlZ2V4LnN0YXJ0KVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmZvbGRpbmdTdG9wTWFya2VyID0gbmV3IFJlZ0V4cChcbiAgICAgICAgICAgIHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIuc291cmNlLnJlcGxhY2UoL1xcfFtefF0qPyQvLCBcInxcIiArIGNvbW1lbnRSZWdleC5lbmQpXG4gICAgICAgICk7XG4gICAgfVxufTtcbm9vcC5pbmhlcml0cyhGb2xkTW9kZSwgQmFzZUZvbGRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuICAgIFxuICAgIHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyID0gLyhbXFx7XFxbXFwoXSlbXlxcfVxcXVxcKV0qJHxeXFxzKihcXC9cXCopLztcbiAgICB0aGlzLmZvbGRpbmdTdG9wTWFya2VyID0gL15bXlxcW1xce1xcKF0qKFtcXH1cXF1cXCldKXxeW1xcc1xcKl0qKFxcKlxcLykvO1xuICAgIHRoaXMuc2luZ2xlTGluZUJsb2NrQ29tbWVudFJlPSAvXlxccyooXFwvXFwqKS4qXFwqXFwvXFxzKiQvO1xuICAgIHRoaXMudHJpcGxlU3RhckJsb2NrQ29tbWVudFJlID0gL15cXHMqKFxcL1xcKlxcKlxcKikuKlxcKlxcL1xccyokLztcbiAgICB0aGlzLnN0YXJ0UmVnaW9uUmUgPSAvXlxccyooXFwvXFwqfFxcL1xcLykjP3JlZ2lvblxcYi87XG4gICAgXG4gICAgLy9wcmV2ZW50IG5hbWluZyBjb25mbGljdCB3aXRoIGFueSBtb2RlcyB0aGF0IGluaGVyaXQgZnJvbSBjc3R5bGUgYW5kIG92ZXJyaWRlIHRoaXMgKGxpa2UgY3NoYXJwKVxuICAgIHRoaXMuX2dldEZvbGRXaWRnZXRCYXNlID0gdGhpcy5nZXRGb2xkV2lkZ2V0O1xuICAgIFxuICAgIC8qKlxuICAgICAqIEdldHMgZm9sZCB3aWRnZXQgd2l0aCBzb21lIG5vbi1zdGFuZGFyZCBleHRyYXM6XG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSBsaW5lQ29tbWVudFJlZ2lvblN0YXJ0XG4gICAgICogICAgICAvLyNyZWdpb24gW29wdGlvbmFsIGRlc2NyaXB0aW9uXVxuICAgICAqXG4gICAgICogQGV4YW1wbGUgYmxvY2tDb21tZW50UmVnaW9uU3RhcnRcbiAgICAgKiAgICAgIC8qI3JlZ2lvbiBbb3B0aW9uYWwgZGVzY3JpcHRpb25dICpbL11cbiAgICAgKlxuICAgICAqIEBleGFtcGxlIHRyaXBsZVN0YXJGb2xkaW5nU2VjdGlvblxuICAgICAqICAgICAgLyoqKiB0aGlzIGZvbGRzIGV2ZW4gdGhvdWdoIDEgbGluZSBiZWNhdXNlIGl0IGhhcyAzIHN0YXJzICoqKlsvXVxuICAgICAqIFxuICAgICAqIEBub3RlIHRoZSBwb3VuZCBzeW1ib2wgZm9yIHJlZ2lvbiB0YWdzIGlzIG9wdGlvbmFsXG4gICAgICovXG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0ID0gZnVuY3Rpb24oc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICBcbiAgICAgICAgaWYgKHRoaXMuc2luZ2xlTGluZUJsb2NrQ29tbWVudFJlLnRlc3QobGluZSkpIHtcbiAgICAgICAgICAgIC8vIE5vIHdpZGdldCBmb3Igc2luZ2xlIGxpbmUgYmxvY2sgY29tbWVudCB1bmxlc3MgcmVnaW9uIG9yIHRyaXBsZSBzdGFyXG4gICAgICAgICAgICBpZiAoIXRoaXMuc3RhcnRSZWdpb25SZS50ZXN0KGxpbmUpICYmICF0aGlzLnRyaXBsZVN0YXJCbG9ja0NvbW1lbnRSZS50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIHZhciBmdyA9IHRoaXMuX2dldEZvbGRXaWRnZXRCYXNlKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KTtcbiAgICBcbiAgICAgICAgaWYgKCFmdyAmJiB0aGlzLnN0YXJ0UmVnaW9uUmUudGVzdChsaW5lKSlcbiAgICAgICAgICAgIHJldHVybiBcInN0YXJ0XCI7IC8vIGxpbmVDb21tZW50UmVnaW9uU3RhcnRcbiAgICBcbiAgICAgICAgcmV0dXJuIGZ3O1xuICAgIH07XG5cbiAgICB0aGlzLmdldEZvbGRXaWRnZXRSYW5nZSA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93LCBmb3JjZU11bHRpbGluZSkge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuc3RhcnRSZWdpb25SZS50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q29tbWVudFJlZ2lvbkJsb2NrKHNlc3Npb24sIGxpbmUsIHJvdyk7XG4gICAgICAgIFxuICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyKTtcbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICB2YXIgaSA9IG1hdGNoLmluZGV4O1xuXG4gICAgICAgICAgICBpZiAobWF0Y2hbMV0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMub3BlbmluZ0JyYWNrZXRCbG9jayhzZXNzaW9uLCBtYXRjaFsxXSwgcm93LCBpKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciByYW5nZSA9IHNlc3Npb24uZ2V0Q29tbWVudEZvbGRSYW5nZShyb3csIGkgKyBtYXRjaFswXS5sZW5ndGgsIDEpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAocmFuZ2UgJiYgIXJhbmdlLmlzTXVsdGlMaW5lKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoZm9yY2VNdWx0aWxpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2UgPSB0aGlzLmdldFNlY3Rpb25SYW5nZShzZXNzaW9uLCByb3cpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZm9sZFN0eWxlICE9IFwiYWxsXCIpXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIHJhbmdlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZvbGRTdHlsZSA9PT0gXCJtYXJrYmVnaW5cIilcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIpO1xuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIHZhciBpID0gbWF0Y2guaW5kZXggKyBtYXRjaFswXS5sZW5ndGg7XG5cbiAgICAgICAgICAgIGlmIChtYXRjaFsxXSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jbG9zaW5nQnJhY2tldEJsb2NrKHNlc3Npb24sIG1hdGNoWzFdLCByb3csIGkpO1xuXG4gICAgICAgICAgICByZXR1cm4gc2Vzc2lvbi5nZXRDb21tZW50Rm9sZFJhbmdlKHJvdywgaSwgLTEpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBcbiAgICB0aGlzLmdldFNlY3Rpb25SYW5nZSA9IGZ1bmN0aW9uKHNlc3Npb24sIHJvdykge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICB2YXIgc3RhcnRJbmRlbnQgPSBsaW5lLnNlYXJjaCgvXFxTLyk7XG4gICAgICAgIHZhciBzdGFydFJvdyA9IHJvdztcbiAgICAgICAgdmFyIHN0YXJ0Q29sdW1uID0gbGluZS5sZW5ndGg7XG4gICAgICAgIHJvdyA9IHJvdyArIDE7XG4gICAgICAgIHZhciBlbmRSb3cgPSByb3c7XG4gICAgICAgIHZhciBtYXhSb3cgPSBzZXNzaW9uLmdldExlbmd0aCgpO1xuICAgICAgICB3aGlsZSAoKytyb3cgPCBtYXhSb3cpIHtcbiAgICAgICAgICAgIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgICAgIHZhciBpbmRlbnQgPSBsaW5lLnNlYXJjaCgvXFxTLyk7XG4gICAgICAgICAgICBpZiAoaW5kZW50ID09PSAtMSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIGlmICAoc3RhcnRJbmRlbnQgPiBpbmRlbnQpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB2YXIgc3ViUmFuZ2UgPSB0aGlzLmdldEZvbGRXaWRnZXRSYW5nZShzZXNzaW9uLCBcImFsbFwiLCByb3cpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoc3ViUmFuZ2UpIHtcbiAgICAgICAgICAgICAgICBpZiAoc3ViUmFuZ2Uuc3RhcnQucm93IDw9IHN0YXJ0Um93KSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3ViUmFuZ2UuaXNNdWx0aUxpbmUoKSkge1xuICAgICAgICAgICAgICAgICAgICByb3cgPSBzdWJSYW5nZS5lbmQucm93O1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhcnRJbmRlbnQgPT0gaW5kZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVuZFJvdyA9IHJvdztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShzdGFydFJvdywgc3RhcnRDb2x1bW4sIGVuZFJvdywgc2Vzc2lvbi5nZXRMaW5lKGVuZFJvdykubGVuZ3RoKTtcbiAgICB9O1xuICAgIFxuICAgIC8qKlxuICAgICAqIGdldHMgY29tbWVudCByZWdpb24gYmxvY2sgd2l0aCBlbmQgcmVnaW9uIGFzc3VtZWQgdG8gYmUgc3RhcnQgb2YgY29tbWVudCBpbiBhbnkgY3N0eWxlIG1vZGUgb3IgU1FMIG1vZGUgKC0tKSB3aGljaCBpbmhlcml0cyBmcm9tIHRoaXMuXG4gICAgICogVGhlcmUgbWF5IG9wdGlvbmFsbHkgYmUgYSBwb3VuZCBzeW1ib2wgYmVmb3JlIHRoZSByZWdpb24vZW5kcmVnaW9uIHN0YXRlbWVudFxuICAgICAqL1xuICAgIHRoaXMuZ2V0Q29tbWVudFJlZ2lvbkJsb2NrID0gZnVuY3Rpb24oc2Vzc2lvbiwgbGluZSwgcm93KSB7XG4gICAgICAgIHZhciBzdGFydENvbHVtbiA9IGxpbmUuc2VhcmNoKC9cXHMqJC8pO1xuICAgICAgICB2YXIgbWF4Um93ID0gc2Vzc2lvbi5nZXRMZW5ndGgoKTtcbiAgICAgICAgdmFyIHN0YXJ0Um93ID0gcm93O1xuICAgICAgICBcbiAgICAgICAgdmFyIHJlID0gL15cXHMqKD86XFwvXFwqfFxcL1xcL3wtLSkjPyhlbmQpP3JlZ2lvblxcYi87XG4gICAgICAgIHZhciBkZXB0aCA9IDE7XG4gICAgICAgIHdoaWxlICgrK3JvdyA8IG1heFJvdykge1xuICAgICAgICAgICAgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICAgICAgdmFyIG0gPSByZS5leGVjKGxpbmUpO1xuICAgICAgICAgICAgaWYgKCFtKSBjb250aW51ZTtcbiAgICAgICAgICAgIGlmIChtWzFdKSBkZXB0aC0tO1xuICAgICAgICAgICAgZWxzZSBkZXB0aCsrO1xuXG4gICAgICAgICAgICBpZiAoIWRlcHRoKSBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBlbmRSb3cgPSByb3c7XG4gICAgICAgIGlmIChlbmRSb3cgPiBzdGFydFJvdykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShzdGFydFJvdywgc3RhcnRDb2x1bW4sIGVuZFJvdywgbGluZS5sZW5ndGgpO1xuICAgICAgICB9XG4gICAgfTtcblxufSkuY2FsbChGb2xkTW9kZS5wcm90b3R5cGUpO1xuIiwiLypcbiAgVEhJUyBGSUxFIFdBUyBBVVRPR0VORVJBVEVEIEJZIG1vZGUudG1wbC5qc1xuKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0TW9kZSA9IHJlcXVpcmUoXCIuL3RleHRcIikuTW9kZTtcbnZhciBLb3RsaW5IaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL2tvdGxpbl9oaWdobGlnaHRfcnVsZXNcIikuS290bGluSGlnaGxpZ2h0UnVsZXM7XG52YXIgRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9mb2xkaW5nL2NzdHlsZVwiKS5Gb2xkTW9kZTtcblxudmFyIE1vZGUgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLkhpZ2hsaWdodFJ1bGVzID0gS290bGluSGlnaGxpZ2h0UnVsZXM7XG4gICAgdGhpcy5mb2xkaW5nUnVsZXMgPSBuZXcgRm9sZE1vZGUoKTtcbiAgICB0aGlzLiRiZWhhdmlvdXIgPSB0aGlzLiRkZWZhdWx0QmVoYXZpb3VyO1xufTtcbm9vcC5pbmhlcml0cyhNb2RlLCBUZXh0TW9kZSk7XG5cbihmdW5jdGlvbigpIHtcbiAgICB0aGlzLmxpbmVDb21tZW50U3RhcnQgPSBcIi8vXCI7XG4gICAgdGhpcy5ibG9ja0NvbW1lbnQgPSB7c3RhcnQ6IFwiLypcIiwgZW5kOiBcIiovXCJ9O1xuICAgIC8vIEV4dHJhIGxvZ2ljIGdvZXMgaGVyZS5cbiAgICB0aGlzLiRpZCA9IFwiYWNlL21vZGUva290bGluXCI7XG59KS5jYWxsKE1vZGUucHJvdG90eXBlKTtcblxuZXhwb3J0cy5Nb2RlID0gTW9kZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xuXG52YXIgS290bGluSGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbigpIHtcbiAgICAvLyByZWdleHAgbXVzdCBub3QgaGF2ZSBjYXB0dXJpbmcgcGFyZW50aGVzZXMuIFVzZSAoPzopIGluc3RlYWQuXG4gICAgLy8gcmVnZXhwcyBhcmUgb3JkZXJlZCAtPiB0aGUgZmlyc3QgbWF0Y2ggaXMgdXNlZFxuXG4gICAgdmFyIGtleXdvcmRNYXBwZXIgPSB0aGlzLiRrZXl3b3JkcyA9IHRoaXMuY3JlYXRlS2V5d29yZE1hcHBlcih7XG4gICAgICAgIFwic3RvcmFnZS5tb2RpZmllci5rb3RsaW5cIjogXCJ2YXJ8dmFsfHB1YmxpY3xwcml2YXRlfHByb3RlY3RlZHxhYnN0cmFjdHxmaW5hbHxlbnVtfG9wZW58YXR0cmlidXRlfFwiXG4gICAgICAgICAgICArIFwiYW5ub3RhdGlvbnxvdmVycmlkZXxpbmxpbmV8dmFyfHZhbHx2YXJhcmd8bGF6eXxpbnxvdXR8aW50ZXJuYWx8ZGF0YXx0YWlscmVjfG9wZXJhdG9yfGluZml4fGNvbnN0fFwiXG4gICAgICAgICAgICArIFwieWllbGR8dHlwZWFsaWFzfHR5cGVvZnxzZWFsZWR8aW5uZXJ8dmFsdWV8bGF0ZWluaXR8ZXh0ZXJuYWx8c3VzcGVuZHxub2lubGluZXxjcm9zc2lubGluZXxyZWlmaWVkfFwiXG4gICAgICAgICAgICArIFwiZXhwZWN0fGFjdHVhbFwiLFxuICAgICAgICBcImtleXdvcmRcIjogXCJjb21wYW5pb258Y2xhc3N8b2JqZWN0fGludGVyZmFjZXxuYW1lc3BhY2V8dHlwZXxmdW58Y29uc3RydWN0b3J8aWZ8ZWxzZXx3aGlsZXxmb3J8ZG98cmV0dXJufHdoZW58XCJcbiAgICAgICAgICAgICsgXCJ3aGVyZXxicmVha3xjb250aW51ZXx0cnl8Y2F0Y2h8ZmluYWxseXx0aHJvd3xpbnxpc3xhc3xhc3NlcnR8Y29uc3RydWN0b3JcIixcbiAgICAgICAgXCJjb25zdGFudC5sYW5ndWFnZS5rb3RsaW5cIjogXCJ0cnVlfGZhbHNlfG51bGx8dGhpc3xzdXBlclwiLFxuICAgICAgICBcImVudGl0eS5uYW1lLmZ1bmN0aW9uLmtvdGxpblwiOiBcImdldHxzZXRcIlxuICAgIH0sIFwiaWRlbnRpZmllclwiKTtcblxuICAgIHRoaXMuJHJ1bGVzID0ge1xuICAgICAgICBzdGFydDogW3tcbiAgICAgICAgICAgIGluY2x1ZGU6IFwiI2NvbW1lbnRzXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFtcbiAgICAgICAgICAgICAgICBcInRleHRcIixcbiAgICAgICAgICAgICAgICBcImtleXdvcmQub3RoZXIua290bGluXCIsXG4gICAgICAgICAgICAgICAgXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgXCJlbnRpdHkubmFtZS5wYWNrYWdlLmtvdGxpblwiLFxuICAgICAgICAgICAgICAgIFwidGV4dFwiXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgcmVnZXg6IC9eKFxccyopKHBhY2thZ2UpXFxiKD86KFxccyopKFteIDskXSspKFxccyopKT8vXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcImNvbW1lbnRcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXlxccyojIS4qJC9cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaW5jbHVkZTogXCIjaW1wb3J0c1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGluY2x1ZGU6IFwiI2V4cHJlc3Npb25zXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nXCIsXG4gICAgICAgICAgICByZWdleDogL0BbYS16QS1aXVthLXpBLVo6XSpcXGIvXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBbXCJrZXl3b3JkLm90aGVyLmtvdGxpblwiLCBcInRleHRcIiwgXCJlbnRpdHkubmFtZS52YXJpYWJsZS5rb3RsaW5cIl0sXG4gICAgICAgICAgICByZWdleDogL1xcYih2YXJ8dmFsKShcXHMrKShbYS16QS1aX11bXFx3XSopXFxiL1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogW1wia2V5d29yZC5vdGhlci5rb3RsaW5cIiwgXCJ0ZXh0XCIsIFwiZW50aXR5Lm5hbWUudmFyaWFibGUua290bGluXCIsIFwicGFyZW4ubHBhcmVuXCJdLFxuICAgICAgICAgICAgcmVnZXg6IC8oZnVuKShcXHMrKShcXHcrKShcXCgpLyxcbiAgICAgICAgICAgIHB1c2g6IFt7XG4gICAgICAgICAgICAgICAgdG9rZW46IFtcInZhcmlhYmxlLnBhcmFtZXRlci5mdW5jdGlvbi5rb3RsaW5cIiwgXCJ0ZXh0XCIsIFwia2V5d29yZC5vcGVyYXRvclwiXSxcbiAgICAgICAgICAgICAgICByZWdleDogLyhcXHcrKShcXHMqKSg6KS9cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJwYXJlbi5ycGFyZW5cIixcbiAgICAgICAgICAgICAgICByZWdleDogL1xcKS8sXG4gICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFwiI2NvbW1lbnRzXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiBcIiN0eXBlc1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaW5jbHVkZTogXCIjZXhwcmVzc2lvbnNcIlxuICAgICAgICAgICAgfV1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFtcInRleHRcIiwgXCJrZXl3b3JkXCIsXCJ0ZXh0XCIsIFwiaWRlbnRpZmllclwiXSxcbiAgICAgICAgICAgIHJlZ2V4OiAvXihcXHMqKShjbGFzcykoXFxzKikoW2EtekEtWl0rKS8sXG4gICAgICAgICAgICBuZXh0OiBcIiNjbGFzc2VzXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFtcImlkZW50aWZpZXJcIiwgXCJwdW5jdHVhY3Rpb25cIl0sXG4gICAgICAgICAgICByZWdleDogLyhbYS16QS1aX11bXFx3XSopKDwpLyxcbiAgICAgICAgICAgIHB1c2g6IFt7XG4gICAgICAgICAgICAgICAgaW5jbHVkZTogXCIjZ2VuZXJpY3NcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFwiI2RlZmF1bHRUeXBlc1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwicHVuY3R1YXRpb25cIixcbiAgICAgICAgICAgICAgICByZWdleDogLz4vLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBrZXl3b3JkTWFwcGVyLFxuICAgICAgICAgICAgcmVnZXg6IC9bYS16QS1aX11bXFx3XSpcXGIvXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInBhcmVuLmxwYXJlblwiLFxuICAgICAgICAgICAgcmVnZXg6IC9beyhcXFtdL1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJwYXJlbi5ycGFyZW5cIixcbiAgICAgICAgICAgIHJlZ2V4OiAvW30pXFxdXS9cbiAgICAgICAgfV0sXG4gICAgICAgIFwiI2NvbW1lbnRzXCI6IFt7XG4gICAgICAgICAgICB0b2tlbjogXCJjb21tZW50XCIsXG4gICAgICAgICAgICByZWdleDogL1xcL1xcKi8sXG4gICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuOiBcImNvbW1lbnRcIixcbiAgICAgICAgICAgICAgICByZWdleDogL1xcKlxcLy8sXG4gICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJjb21tZW50XCJcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBbXG4gICAgICAgICAgICAgICAgXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgXCJjb21tZW50XCJcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICByZWdleDogLyhcXHMqKShcXC9cXC8uKiQpL1xuICAgICAgICB9XSxcbiAgICAgICAgXCIjY29uc3RhbnRzXCI6IFt7XG4gICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5udW1lcmljLmtvdGxpblwiLFxuICAgICAgICAgICAgcmVnZXg6IC9cXGIoPzowKD86eHxYKVswLTlhLWZBLUZdKnwoPzpbMC05XStcXC4/WzAtOV0qfFxcLlswLTldKykoPzooPzplfEUpKD86XFwrfC0pP1swLTldKyk/KSg/OltMbEZmVXVEZF18VUx8dWwpP1xcYi9cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQub3RoZXIua290bGluXCIsXG4gICAgICAgICAgICByZWdleDogL1xcYltBLVpdW0EtWjAtOV9dK1xcYi9cbiAgICAgICAgfV0sXG4gICAgICAgIFwiI2V4cHJlc3Npb25zXCI6IFt7XG4gICAgICAgICAgICBpbmNsdWRlOiBcIiNzdHJpbmdzXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaW5jbHVkZTogXCIjY29uc3RhbnRzXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaW5jbHVkZTogXCIja2V5d29yZHNcIlxuICAgICAgICB9XSxcbiAgICAgICAgXCIjaW1wb3J0c1wiOiBbe1xuICAgICAgICAgICAgdG9rZW46IFtcbiAgICAgICAgICAgICAgICBcInRleHRcIixcbiAgICAgICAgICAgICAgICBcImtleXdvcmQub3RoZXIua290bGluXCIsXG4gICAgICAgICAgICAgICAgXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgXCJrZXl3b3JkLm90aGVyLmtvdGxpblwiXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgcmVnZXg6IC9eKFxccyopKGltcG9ydCkoXFxzK1teICRdK1xccyspKCg/OmFzKT8pL1xuICAgICAgICB9XSxcbiAgICAgICAgXCIjZ2VuZXJpY3NcIjogW3tcbiAgICAgICAgICAgIHRva2VuOiBcInB1bmN0dWF0aW9uXCIsXG4gICAgICAgICAgICByZWdleDogLzwvLFxuICAgICAgICAgICAgcHVzaDogW3tcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJwdW5jdHVhdGlvblwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvPi8sXG4gICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInN0b3JhZ2UudHlwZS5nZW5lcmljLmtvdGxpblwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvXFx3Ky9cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJrZXl3b3JkLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IC86L1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInB1bmN0dWF0aW9uXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IC8sL1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFwiI2dlbmVyaWNzXCJcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH1dLFxuICAgICAgICBcIiNjbGFzc2VzXCI6IFt7XG4gICAgICAgICAgICBpbmNsdWRlOiBcIiNnZW5lcmljc1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcImtleXdvcmRcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvcHVibGljfHByaXZhdGV8Y29uc3RydWN0b3IvXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgcmVnZXg6IC9AW2EtekEtWl1bYS16QS1aOl0qXFxiL1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICByZWdleDogLyg/PSR8XFwofHspLyxcbiAgICAgICAgICAgIG5leHQ6IFwic3RhcnRcIlxuICAgICAgICB9XSxcbiAgICAgICAgXCIja2V5d29yZHNcIjogW3tcbiAgICAgICAgICAgIHRva2VuOiBcImtleXdvcmQub3BlcmF0b3Iua290bGluXCIsXG4gICAgICAgICAgICByZWdleDogLz09fCE9fD09PXwhPT18PD18Pj18PHw+fD0+fC0+fDo6fFxcPzovXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcImtleXdvcmQub3BlcmF0b3IuYXNzaWdubWVudC5rb3RsaW5cIixcbiAgICAgICAgICAgIHJlZ2V4OiAvPS9cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwia2V5d29yZC5vcGVyYXRvci5kZWNsYXJhdGlvbi5rb3RsaW5cIixcbiAgICAgICAgICAgIHJlZ2V4OiAvOi8sXG4gICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICByZWdleDogLyg/PSR8e3w9fCwpLyxcbiAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaW5jbHVkZTogXCIjdHlwZXNcIlxuICAgICAgICAgICAgfV1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwia2V5d29yZC5vcGVyYXRvci5kb3Qua290bGluXCIsXG4gICAgICAgICAgICByZWdleDogL1xcLi9cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwia2V5d29yZC5vcGVyYXRvci5pbmNyZW1lbnQtZGVjcmVtZW50LmtvdGxpblwiLFxuICAgICAgICAgICAgcmVnZXg6IC9cXC1cXC18XFwrXFwrL1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJrZXl3b3JkLm9wZXJhdG9yLmFyaXRobWV0aWMua290bGluXCIsXG4gICAgICAgICAgICByZWdleDogL1xcLXxcXCt8XFwqfFxcL3wlL1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJrZXl3b3JkLm9wZXJhdG9yLmFyaXRobWV0aWMuYXNzaWduLmtvdGxpblwiLFxuICAgICAgICAgICAgcmVnZXg6IC9cXCs9fFxcLT18XFwqPXxcXC89L1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJrZXl3b3JkLm9wZXJhdG9yLmxvZ2ljYWwua290bGluXCIsXG4gICAgICAgICAgICByZWdleDogLyF8JiZ8XFx8XFx8L1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJrZXl3b3JkLm9wZXJhdG9yLnJhbmdlLmtvdGxpblwiLFxuICAgICAgICAgICAgcmVnZXg6IC9cXC5cXC4vXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInB1bmN0dWF0aW9uLmtvdGxpblwiLFxuICAgICAgICAgICAgcmVnZXg6IC9bOyxdL1xuICAgICAgICB9XSxcbiAgICAgICAgXCIjdHlwZXNcIjogW3tcbiAgICAgICAgICAgIGluY2x1ZGU6IFwiI2RlZmF1bHRUeXBlc1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInBhcmVuLmxwYXJlblwiLFxuICAgICAgICAgICAgcmVnZXg6IC9cXCgvLFxuICAgICAgICAgICAgcHVzaDogW3tcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJwYXJlbi5ycGFyZW5cIixcbiAgICAgICAgICAgICAgICByZWdleDogL1xcKS8sXG4gICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFwiI2RlZmF1bHRUeXBlc1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwicHVuY3R1YXRpb25cIixcbiAgICAgICAgICAgICAgICByZWdleDogLywvXG4gICAgICAgICAgICB9XVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpbmNsdWRlOiBcIiNnZW5lcmljc1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcImtleXdvcmQub3BlcmF0b3IuZGVjbGFyYXRpb24ua290bGluXCIsXG4gICAgICAgICAgICByZWdleDogLy0+L1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJwYXJlbi5ycGFyZW5cIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXFwpL1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJrZXl3b3JkLm9wZXJhdG9yLmRlY2xhcmF0aW9uLmtvdGxpblwiLFxuICAgICAgICAgICAgcmVnZXg6IC86LyxcbiAgICAgICAgICAgIHB1c2g6IFt7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvKD89JHx7fD18LCkvLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiBcIiN0eXBlc1wiXG4gICAgICAgICAgICB9XVxuICAgICAgICB9XSxcbiAgICAgICAgXCIjZGVmYXVsdFR5cGVzXCI6IFt7XG4gICAgICAgICAgICB0b2tlbjogXCJzdG9yYWdlLnR5cGUuYnVpbGRpbi5rb3RsaW5cIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXFxiKEFueXxVbml0fFN0cmluZ3xJbnR8Qm9vbGVhbnxDaGFyfExvbmd8RG91YmxlfEZsb2F0fFNob3J0fEJ5dGV8ZHluYW1pY3xJbnRBcnJheXxCb29sZWFuQXJyYXl8Q2hhckFycmF5fExvbmdBcnJheXxEb3VibGVBcnJheXxGbG9hdEFycmF5fFNob3J0QXJyYXl8Qnl0ZUFycmF5fEFycmF5fExpc3R8TWFwfE5vdGhpbmd8RW51bXxUaHJvd2FibGV8Q29tcGFyYWJsZSlcXGIvXG4gICAgICAgIH1dLFxuICAgICAgICBcIiNzdHJpbmdzXCI6IFt7XG4gICAgICAgICAgICB0b2tlbjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXCJcIlwiLyxcbiAgICAgICAgICAgIHB1c2g6IFt7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IC9cIlwiXCIvLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJ2YXJpYWJsZS5wYXJhbWV0ZXIudGVtcGxhdGUua290bGluXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IC9cXCRcXHcrfFxcJHtbXn1dK30vXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQuY2hhcmFjdGVyLmVzY2FwZS5rb3RsaW5cIixcbiAgICAgICAgICAgICAgICByZWdleDogL1xcXFwuL1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzdHJpbmdcIlxuICAgICAgICAgICAgfV1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nXCIsXG4gICAgICAgICAgICByZWdleDogL1wiLyxcbiAgICAgICAgICAgIHB1c2g6IFt7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IC9cIi8sXG4gICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInZhcmlhYmxlLnBhcmFtZXRlci50ZW1wbGF0ZS5rb3RsaW5cIixcbiAgICAgICAgICAgICAgICByZWdleDogL1xcJFxcdyt8XFwkXFx7W15cXH1dK1xcfS9cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5jaGFyYWN0ZXIuZXNjYXBlLmtvdGxpblwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvXFxcXC4vXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInN0cmluZ1wiXG4gICAgICAgICAgICB9XVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvJy8sXG4gICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvJy8sXG4gICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50LmNoYXJhY3Rlci5lc2NhcGUua290bGluXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IC9cXFxcLi9cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwic3RyaW5nXCJcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgcmVnZXg6IC9gLyxcbiAgICAgICAgICAgIHB1c2g6IFt7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IC9gLyxcbiAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInN0cmluZ1wiXG4gICAgICAgICAgICB9XVxuICAgICAgICB9XVxuICAgIH07XG5cbiAgICB0aGlzLm5vcm1hbGl6ZVJ1bGVzKCk7XG59O1xuXG5Lb3RsaW5IaWdobGlnaHRSdWxlcy5tZXRhRGF0YSA9IHtcbiAgICBmaWxlVHlwZXM6IFtcImt0XCIsIFwia3RzXCJdLFxuICAgIG5hbWU6IFwiS290bGluXCIsXG4gICAgc2NvcGVOYW1lOiBcInNvdXJjZS5Lb3RsaW5cIlxufTtcblxuXG5vb3AuaW5oZXJpdHMoS290bGluSGlnaGxpZ2h0UnVsZXMsIFRleHRIaWdobGlnaHRSdWxlcyk7XG5cbmV4cG9ydHMuS290bGluSGlnaGxpZ2h0UnVsZXMgPSBLb3RsaW5IaWdobGlnaHRSdWxlcztcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==