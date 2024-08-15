"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[5159],{

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

/***/ 25159:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/*
  THIS FILE WAS AUTOGENERATED BY mode.tmpl.js
*/



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var PrismaHighlightRules = (__webpack_require__(71636)/* .PrismaHighlightRules */ .E);
// TODO: pick appropriate fold mode
var FoldMode = (__webpack_require__(93887)/* .FoldMode */ .l);

var Mode = function() {
    this.HighlightRules = PrismaHighlightRules;
    this.foldingRules = new FoldMode();
};
oop.inherits(Mode, TextMode);

(function() {
    this.lineCommentStart = "//";
    // this.blockComment = {start: ""/*"", end: ""*/""};
    // Extra logic goes here.
    this.$id = "ace/mode/prisma";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 71636:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* This file was autogenerated from ../convert.json (uuid: ) */
/****************************************************************************************
 * IT MIGHT NOT BE PERFECT ...But it's a good start from an existing *.tmlanguage file. *
 * fileTypes                                                                            *
 ****************************************************************************************/



var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

var PrismaHighlightRules = function() {
    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used

    this.$rules = {
        start: [{
            include: "#triple_comment"
        }, {
            include: "#double_comment"
        }, {
            include: "#model_block_definition"
        }, {
            include: "#config_block_definition"
        }, {
            include: "#enum_block_definition"
        }, {
            include: "#type_definition"
        }],
        "#model_block_definition": [{
            token: [
                "source.prisma.embedded.source",
                "storage.type.model.prisma",
                "source.prisma.embedded.source",
                "entity.name.type.model.prisma",
                "source.prisma.embedded.source",
                "punctuation.definition.tag.prisma"
            ],
            regex: /^(\s*)(model|type)(\s+)([A-Za-z][\w]*)(\s+)({)/,
            push: [{
                token: "punctuation.definition.tag.prisma",
                regex: /\s*\}/,
                next: "pop"
            }, {
                include: "#triple_comment"
            }, {
                include: "#double_comment"
            }, {
                include: "#field_definition"
            }, {
                defaultToken: "source.prisma.embedded.source"
            }]
        }],
        "#enum_block_definition": [{
            token: [
                "source.prisma.embedded.source",
                "storage.type.enum.prisma",
                "source.prisma.embedded.source",
                "entity.name.type.enum.prisma",
                "source.prisma.embedded.source",
                "punctuation.definition.tag.prisma"
            ],
            regex: /^(\s*)(enum)(\s+)([A-Za-z][\w]*)(\s+)({)/,
            push: [{
                token: "punctuation.definition.tag.prisma",
                regex: /\s*\}/,
                next: "pop"
            }, {
                include: "#triple_comment"
            }, {
                include: "#double_comment"
            }, {
                include: "#enum_value_definition"
            }, {
                defaultToken: "source.prisma.embedded.source"
            }]
        }],
        "#config_block_definition": [{
            token: [
                "source.prisma.embedded.source",
                "storage.type.config.prisma",
                "source.prisma.embedded.source",
                "entity.name.type.config.prisma",
                "source.prisma.embedded.source",
                "punctuation.definition.tag.prisma"
            ],
            regex: /^(\s*)(generator|datasource)(\s+)([A-Za-z][\w]*)(\s+)({)/,
            push: [{
                token: "source.prisma.embedded.source",
                regex: /\s*\}/,
                next: "pop"
            }, {
                include: "#triple_comment"
            }, {
                include: "#double_comment"
            }, {
                include: "#assignment"
            }, {
                defaultToken: "source.prisma.embedded.source"
            }]
        }],
        "#assignment": [{
            token: [
                "text",
                "variable.other.assignment.prisma",
                "text",
                "keyword.operator.terraform",
                "text"
            ],
            regex: /^(\s*)(\w+)(\s*)(=)(\s*)/,
            push: [{
                token: "text",
                regex: /$/,
                next: "pop"
            }, {
                include: "#value"
            }, {
                include: "#double_comment_inline"
            }]
        }],
        "#field_definition": [{
            token: [
                "text",
                "variable.other.assignment.prisma",
                "invalid.illegal.colon.prisma",
                "text",
                "support.type.primitive.prisma",
                "keyword.operator.list_type.prisma",
                "keyword.operator.optional_type.prisma",
                "invalid.illegal.required_type.prisma"
            ],
            regex: /^(\s*)(\w+)((?:\s*:)?)(\s+)(\w+)((?:\[\])?)((?:\?)?)((?:\!)?)/
        }, {
            include: "#attribute_with_arguments"
        }, {
            include: "#attribute"
        }],
        "#type_definition": [{
            token: [
                "text",
                "storage.type.type.prisma",
                "text",
                "entity.name.type.type.prisma",
                "text",
                "support.type.primitive.prisma"
            ],
            regex: /^(\s*)(type)(\s+)(\w+)(\s*=\s*)(\w+)/
        }, {
            include: "#attribute_with_arguments"
        }, {
            include: "#attribute"
        }],
        "#enum_value_definition": [{
            token: [
                "text",
                "variable.other.assignment.prisma",
                "text"
            ],
            regex: /^(\s*)(\w+)(\s*$)/
        }, {
            include: "#attribute_with_arguments"
        }, {
            include: "#attribute"
        }],
        "#attribute_with_arguments": [{
            token: [
                "entity.name.function.attribute.prisma",
                "punctuation.definition.tag.prisma"
            ],
            regex: /(@@?[\w\.]+)(\()/,
            push: [{
                token: "punctuation.definition.tag.prisma",
                regex: /\)/,
                next: "pop"
            }, {
                include: "#named_argument"
            }, {
                include: "#value"
            }, {
                defaultToken: "source.prisma.attribute.with_arguments"
            }]
        }],
        "#attribute": [{
            token: "entity.name.function.attribute.prisma",
            regex: /@@?[\w\.]+/
        }],
        "#array": [{
            token: "source.prisma.array",
            regex: /\[/,
            push: [{
                token: "source.prisma.array",
                regex: /\]/,
                next: "pop"
            }, {
                include: "#value"
            }, {
                defaultToken: "source.prisma.array"
            }]
        }],
        "#value": [{
            include: "#array"
        }, {
            include: "#functional"
        }, {
            include: "#literal"
        }],
        "#functional": [{
            token: [
                "support.function.functional.prisma",
                "punctuation.definition.tag.prisma"
            ],
            regex: /(\w+)(\()/,
            push: [{
                token: "punctuation.definition.tag.prisma",
                regex: /\)/,
                next: "pop"
            }, {
                include: "#value"
            }, {
                defaultToken: "source.prisma.functional"
            }]
        }],
        "#literal": [{
            include: "#boolean"
        }, {
            include: "#number"
        }, {
            include: "#double_quoted_string"
        }, {
            include: "#identifier"
        }],
        "#identifier": [{
            token: "support.constant.constant.prisma",
            regex: /\b(?:\w)+\b/
        }],
        "#map_key": [{
            token: [
                "variable.parameter.key.prisma",
                "text",
                "punctuation.definition.separator.key-value.prisma",
                "text"
            ],
            regex: /(\w+)(\s*)(:)(\s*)/
        }],
        "#named_argument": [{
            include: "#map_key"
        }, {
            include: "#value"
        }],
        "#triple_comment": [{
            token: "comment.prisma",
            regex: /\/\/\//,
            push: [{
                token: "comment.prisma",
                regex: /$/,
                next: "pop"
            }, {
                defaultToken: "comment.prisma"
            }]
        }],
        "#double_comment": [{
            token: "comment.prisma",
            regex: /\/\//,
            push: [{
                token: "comment.prisma",
                regex: /$/,
                next: "pop"
            }, {
                defaultToken: "comment.prisma"
            }]
        }],
        "#double_comment_inline": [{
            token: "comment.prisma",
            regex: /\/\/[^$]*/
        }],
        "#boolean": [{
            token: "constant.language.boolean.prisma",
            regex: /\b(?:true|false)\b/
        }],
        "#number": [{
            token: "constant.numeric.prisma",
            regex: /(?:0(?:x|X)[0-9a-fA-F]*|(?:\+|-)?\b(?:[0-9]+\.?[0-9]*|\.[0-9]+)(?:(?:e|E)(?:\+|-)?[0-9]+)?)(?:[LlFfUuDdg]|UL|ul)?\b/
        }],
        "#double_quoted_string": [{
            token: "string.quoted.double.start.prisma",
            regex: /"/,
            push: [{
                token: "string.quoted.double.end.prisma",
                regex: /"/,
                next: "pop"
            }, {
                include: "#string_interpolation"
            }, {
                token: "string.quoted.double.prisma",
                regex: /[\w\-\/\._\\%@:\?=]+/
            }, {
                defaultToken: "unnamed"
            }]
        }],
        "#string_interpolation": [{
            token: "keyword.control.interpolation.start.prisma",
            regex: /\$\{/,
            push: [{
                token: "keyword.control.interpolation.end.prisma",
                regex: /\s*\}/,
                next: "pop"
            }, {
                include: "#value"
            }, {
                defaultToken: "source.tag.embedded.source.prisma"
            }]
        }]
    };
    
    this.normalizeRules();
};

PrismaHighlightRules.metaData = {
    name: "Prisma",
    scopeName: "source.prisma"
};


oop.inherits(PrismaHighlightRules, TextHighlightRules);

exports.E = PrismaHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QWE7QUFDYjtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQSxTQUE0QiIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvZm9sZGluZy9jc3R5bGUuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9wcmlzbWEuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9wcmlzbWFfaGlnaGxpZ2h0X3J1bGVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uLy4uL2xpYi9vb3BcIik7XG52YXIgUmFuZ2UgPSByZXF1aXJlKFwiLi4vLi4vcmFuZ2VcIikuUmFuZ2U7XG52YXIgQmFzZUZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZF9tb2RlXCIpLkZvbGRNb2RlO1xuXG52YXIgRm9sZE1vZGUgPSBleHBvcnRzLkZvbGRNb2RlID0gZnVuY3Rpb24oY29tbWVudFJlZ2V4KSB7XG4gICAgaWYgKGNvbW1lbnRSZWdleCkge1xuICAgICAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlciA9IG5ldyBSZWdFeHAoXG4gICAgICAgICAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlci5zb3VyY2UucmVwbGFjZSgvXFx8W158XSo/JC8sIFwifFwiICsgY29tbWVudFJlZ2V4LnN0YXJ0KVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmZvbGRpbmdTdG9wTWFya2VyID0gbmV3IFJlZ0V4cChcbiAgICAgICAgICAgIHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIuc291cmNlLnJlcGxhY2UoL1xcfFtefF0qPyQvLCBcInxcIiArIGNvbW1lbnRSZWdleC5lbmQpXG4gICAgICAgICk7XG4gICAgfVxufTtcbm9vcC5pbmhlcml0cyhGb2xkTW9kZSwgQmFzZUZvbGRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuICAgIFxuICAgIHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyID0gLyhbXFx7XFxbXFwoXSlbXlxcfVxcXVxcKV0qJHxeXFxzKihcXC9cXCopLztcbiAgICB0aGlzLmZvbGRpbmdTdG9wTWFya2VyID0gL15bXlxcW1xce1xcKF0qKFtcXH1cXF1cXCldKXxeW1xcc1xcKl0qKFxcKlxcLykvO1xuICAgIHRoaXMuc2luZ2xlTGluZUJsb2NrQ29tbWVudFJlPSAvXlxccyooXFwvXFwqKS4qXFwqXFwvXFxzKiQvO1xuICAgIHRoaXMudHJpcGxlU3RhckJsb2NrQ29tbWVudFJlID0gL15cXHMqKFxcL1xcKlxcKlxcKikuKlxcKlxcL1xccyokLztcbiAgICB0aGlzLnN0YXJ0UmVnaW9uUmUgPSAvXlxccyooXFwvXFwqfFxcL1xcLykjP3JlZ2lvblxcYi87XG4gICAgXG4gICAgLy9wcmV2ZW50IG5hbWluZyBjb25mbGljdCB3aXRoIGFueSBtb2RlcyB0aGF0IGluaGVyaXQgZnJvbSBjc3R5bGUgYW5kIG92ZXJyaWRlIHRoaXMgKGxpa2UgY3NoYXJwKVxuICAgIHRoaXMuX2dldEZvbGRXaWRnZXRCYXNlID0gdGhpcy5nZXRGb2xkV2lkZ2V0O1xuICAgIFxuICAgIC8qKlxuICAgICAqIEdldHMgZm9sZCB3aWRnZXQgd2l0aCBzb21lIG5vbi1zdGFuZGFyZCBleHRyYXM6XG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSBsaW5lQ29tbWVudFJlZ2lvblN0YXJ0XG4gICAgICogICAgICAvLyNyZWdpb24gW29wdGlvbmFsIGRlc2NyaXB0aW9uXVxuICAgICAqXG4gICAgICogQGV4YW1wbGUgYmxvY2tDb21tZW50UmVnaW9uU3RhcnRcbiAgICAgKiAgICAgIC8qI3JlZ2lvbiBbb3B0aW9uYWwgZGVzY3JpcHRpb25dICpbL11cbiAgICAgKlxuICAgICAqIEBleGFtcGxlIHRyaXBsZVN0YXJGb2xkaW5nU2VjdGlvblxuICAgICAqICAgICAgLyoqKiB0aGlzIGZvbGRzIGV2ZW4gdGhvdWdoIDEgbGluZSBiZWNhdXNlIGl0IGhhcyAzIHN0YXJzICoqKlsvXVxuICAgICAqIFxuICAgICAqIEBub3RlIHRoZSBwb3VuZCBzeW1ib2wgZm9yIHJlZ2lvbiB0YWdzIGlzIG9wdGlvbmFsXG4gICAgICovXG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0ID0gZnVuY3Rpb24oc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICBcbiAgICAgICAgaWYgKHRoaXMuc2luZ2xlTGluZUJsb2NrQ29tbWVudFJlLnRlc3QobGluZSkpIHtcbiAgICAgICAgICAgIC8vIE5vIHdpZGdldCBmb3Igc2luZ2xlIGxpbmUgYmxvY2sgY29tbWVudCB1bmxlc3MgcmVnaW9uIG9yIHRyaXBsZSBzdGFyXG4gICAgICAgICAgICBpZiAoIXRoaXMuc3RhcnRSZWdpb25SZS50ZXN0KGxpbmUpICYmICF0aGlzLnRyaXBsZVN0YXJCbG9ja0NvbW1lbnRSZS50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIHZhciBmdyA9IHRoaXMuX2dldEZvbGRXaWRnZXRCYXNlKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KTtcbiAgICBcbiAgICAgICAgaWYgKCFmdyAmJiB0aGlzLnN0YXJ0UmVnaW9uUmUudGVzdChsaW5lKSlcbiAgICAgICAgICAgIHJldHVybiBcInN0YXJ0XCI7IC8vIGxpbmVDb21tZW50UmVnaW9uU3RhcnRcbiAgICBcbiAgICAgICAgcmV0dXJuIGZ3O1xuICAgIH07XG5cbiAgICB0aGlzLmdldEZvbGRXaWRnZXRSYW5nZSA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93LCBmb3JjZU11bHRpbGluZSkge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuc3RhcnRSZWdpb25SZS50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q29tbWVudFJlZ2lvbkJsb2NrKHNlc3Npb24sIGxpbmUsIHJvdyk7XG4gICAgICAgIFxuICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyKTtcbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICB2YXIgaSA9IG1hdGNoLmluZGV4O1xuXG4gICAgICAgICAgICBpZiAobWF0Y2hbMV0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMub3BlbmluZ0JyYWNrZXRCbG9jayhzZXNzaW9uLCBtYXRjaFsxXSwgcm93LCBpKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciByYW5nZSA9IHNlc3Npb24uZ2V0Q29tbWVudEZvbGRSYW5nZShyb3csIGkgKyBtYXRjaFswXS5sZW5ndGgsIDEpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAocmFuZ2UgJiYgIXJhbmdlLmlzTXVsdGlMaW5lKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoZm9yY2VNdWx0aWxpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2UgPSB0aGlzLmdldFNlY3Rpb25SYW5nZShzZXNzaW9uLCByb3cpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZm9sZFN0eWxlICE9IFwiYWxsXCIpXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIHJhbmdlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZvbGRTdHlsZSA9PT0gXCJtYXJrYmVnaW5cIilcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIpO1xuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIHZhciBpID0gbWF0Y2guaW5kZXggKyBtYXRjaFswXS5sZW5ndGg7XG5cbiAgICAgICAgICAgIGlmIChtYXRjaFsxXSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jbG9zaW5nQnJhY2tldEJsb2NrKHNlc3Npb24sIG1hdGNoWzFdLCByb3csIGkpO1xuXG4gICAgICAgICAgICByZXR1cm4gc2Vzc2lvbi5nZXRDb21tZW50Rm9sZFJhbmdlKHJvdywgaSwgLTEpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBcbiAgICB0aGlzLmdldFNlY3Rpb25SYW5nZSA9IGZ1bmN0aW9uKHNlc3Npb24sIHJvdykge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICB2YXIgc3RhcnRJbmRlbnQgPSBsaW5lLnNlYXJjaCgvXFxTLyk7XG4gICAgICAgIHZhciBzdGFydFJvdyA9IHJvdztcbiAgICAgICAgdmFyIHN0YXJ0Q29sdW1uID0gbGluZS5sZW5ndGg7XG4gICAgICAgIHJvdyA9IHJvdyArIDE7XG4gICAgICAgIHZhciBlbmRSb3cgPSByb3c7XG4gICAgICAgIHZhciBtYXhSb3cgPSBzZXNzaW9uLmdldExlbmd0aCgpO1xuICAgICAgICB3aGlsZSAoKytyb3cgPCBtYXhSb3cpIHtcbiAgICAgICAgICAgIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgICAgIHZhciBpbmRlbnQgPSBsaW5lLnNlYXJjaCgvXFxTLyk7XG4gICAgICAgICAgICBpZiAoaW5kZW50ID09PSAtMSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIGlmICAoc3RhcnRJbmRlbnQgPiBpbmRlbnQpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB2YXIgc3ViUmFuZ2UgPSB0aGlzLmdldEZvbGRXaWRnZXRSYW5nZShzZXNzaW9uLCBcImFsbFwiLCByb3cpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoc3ViUmFuZ2UpIHtcbiAgICAgICAgICAgICAgICBpZiAoc3ViUmFuZ2Uuc3RhcnQucm93IDw9IHN0YXJ0Um93KSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3ViUmFuZ2UuaXNNdWx0aUxpbmUoKSkge1xuICAgICAgICAgICAgICAgICAgICByb3cgPSBzdWJSYW5nZS5lbmQucm93O1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhcnRJbmRlbnQgPT0gaW5kZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVuZFJvdyA9IHJvdztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShzdGFydFJvdywgc3RhcnRDb2x1bW4sIGVuZFJvdywgc2Vzc2lvbi5nZXRMaW5lKGVuZFJvdykubGVuZ3RoKTtcbiAgICB9O1xuICAgIFxuICAgIC8qKlxuICAgICAqIGdldHMgY29tbWVudCByZWdpb24gYmxvY2sgd2l0aCBlbmQgcmVnaW9uIGFzc3VtZWQgdG8gYmUgc3RhcnQgb2YgY29tbWVudCBpbiBhbnkgY3N0eWxlIG1vZGUgb3IgU1FMIG1vZGUgKC0tKSB3aGljaCBpbmhlcml0cyBmcm9tIHRoaXMuXG4gICAgICogVGhlcmUgbWF5IG9wdGlvbmFsbHkgYmUgYSBwb3VuZCBzeW1ib2wgYmVmb3JlIHRoZSByZWdpb24vZW5kcmVnaW9uIHN0YXRlbWVudFxuICAgICAqL1xuICAgIHRoaXMuZ2V0Q29tbWVudFJlZ2lvbkJsb2NrID0gZnVuY3Rpb24oc2Vzc2lvbiwgbGluZSwgcm93KSB7XG4gICAgICAgIHZhciBzdGFydENvbHVtbiA9IGxpbmUuc2VhcmNoKC9cXHMqJC8pO1xuICAgICAgICB2YXIgbWF4Um93ID0gc2Vzc2lvbi5nZXRMZW5ndGgoKTtcbiAgICAgICAgdmFyIHN0YXJ0Um93ID0gcm93O1xuICAgICAgICBcbiAgICAgICAgdmFyIHJlID0gL15cXHMqKD86XFwvXFwqfFxcL1xcL3wtLSkjPyhlbmQpP3JlZ2lvblxcYi87XG4gICAgICAgIHZhciBkZXB0aCA9IDE7XG4gICAgICAgIHdoaWxlICgrK3JvdyA8IG1heFJvdykge1xuICAgICAgICAgICAgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICAgICAgdmFyIG0gPSByZS5leGVjKGxpbmUpO1xuICAgICAgICAgICAgaWYgKCFtKSBjb250aW51ZTtcbiAgICAgICAgICAgIGlmIChtWzFdKSBkZXB0aC0tO1xuICAgICAgICAgICAgZWxzZSBkZXB0aCsrO1xuXG4gICAgICAgICAgICBpZiAoIWRlcHRoKSBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBlbmRSb3cgPSByb3c7XG4gICAgICAgIGlmIChlbmRSb3cgPiBzdGFydFJvdykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShzdGFydFJvdywgc3RhcnRDb2x1bW4sIGVuZFJvdywgbGluZS5sZW5ndGgpO1xuICAgICAgICB9XG4gICAgfTtcblxufSkuY2FsbChGb2xkTW9kZS5wcm90b3R5cGUpO1xuIiwiLypcbiAgVEhJUyBGSUxFIFdBUyBBVVRPR0VORVJBVEVEIEJZIG1vZGUudG1wbC5qc1xuKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0TW9kZSA9IHJlcXVpcmUoXCIuL3RleHRcIikuTW9kZTtcbnZhciBQcmlzbWFIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3ByaXNtYV9oaWdobGlnaHRfcnVsZXNcIikuUHJpc21hSGlnaGxpZ2h0UnVsZXM7XG4vLyBUT0RPOiBwaWNrIGFwcHJvcHJpYXRlIGZvbGQgbW9kZVxudmFyIEZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZGluZy9jc3R5bGVcIikuRm9sZE1vZGU7XG5cbnZhciBNb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5IaWdobGlnaHRSdWxlcyA9IFByaXNtYUhpZ2hsaWdodFJ1bGVzO1xuICAgIHRoaXMuZm9sZGluZ1J1bGVzID0gbmV3IEZvbGRNb2RlKCk7XG59O1xub29wLmluaGVyaXRzKE1vZGUsIFRleHRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuICAgIHRoaXMubGluZUNvbW1lbnRTdGFydCA9IFwiLy9cIjtcbiAgICAvLyB0aGlzLmJsb2NrQ29tbWVudCA9IHtzdGFydDogXCJcIi8qXCJcIiwgZW5kOiBcIlwiKi9cIlwifTtcbiAgICAvLyBFeHRyYSBsb2dpYyBnb2VzIGhlcmUuXG4gICAgdGhpcy4kaWQgPSBcImFjZS9tb2RlL3ByaXNtYVwiO1xufSkuY2FsbChNb2RlLnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTW9kZSA9IE1vZGU7XG4iLCIvKiBUaGlzIGZpbGUgd2FzIGF1dG9nZW5lcmF0ZWQgZnJvbSAuLi9jb252ZXJ0Lmpzb24gKHV1aWQ6ICkgKi9cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBJVCBNSUdIVCBOT1QgQkUgUEVSRkVDVCAuLi5CdXQgaXQncyBhIGdvb2Qgc3RhcnQgZnJvbSBhbiBleGlzdGluZyAqLnRtbGFuZ3VhZ2UgZmlsZS4gKlxuICogZmlsZVR5cGVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcblxudmFyIFByaXNtYUhpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24oKSB7XG4gICAgLy8gcmVnZXhwIG11c3Qgbm90IGhhdmUgY2FwdHVyaW5nIHBhcmVudGhlc2VzLiBVc2UgKD86KSBpbnN0ZWFkLlxuICAgIC8vIHJlZ2V4cHMgYXJlIG9yZGVyZWQgLT4gdGhlIGZpcnN0IG1hdGNoIGlzIHVzZWRcblxuICAgIHRoaXMuJHJ1bGVzID0ge1xuICAgICAgICBzdGFydDogW3tcbiAgICAgICAgICAgIGluY2x1ZGU6IFwiI3RyaXBsZV9jb21tZW50XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaW5jbHVkZTogXCIjZG91YmxlX2NvbW1lbnRcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpbmNsdWRlOiBcIiNtb2RlbF9ibG9ja19kZWZpbml0aW9uXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaW5jbHVkZTogXCIjY29uZmlnX2Jsb2NrX2RlZmluaXRpb25cIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpbmNsdWRlOiBcIiNlbnVtX2Jsb2NrX2RlZmluaXRpb25cIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpbmNsdWRlOiBcIiN0eXBlX2RlZmluaXRpb25cIlxuICAgICAgICB9XSxcbiAgICAgICAgXCIjbW9kZWxfYmxvY2tfZGVmaW5pdGlvblwiOiBbe1xuICAgICAgICAgICAgdG9rZW46IFtcbiAgICAgICAgICAgICAgICBcInNvdXJjZS5wcmlzbWEuZW1iZWRkZWQuc291cmNlXCIsXG4gICAgICAgICAgICAgICAgXCJzdG9yYWdlLnR5cGUubW9kZWwucHJpc21hXCIsXG4gICAgICAgICAgICAgICAgXCJzb3VyY2UucHJpc21hLmVtYmVkZGVkLnNvdXJjZVwiLFxuICAgICAgICAgICAgICAgIFwiZW50aXR5Lm5hbWUudHlwZS5tb2RlbC5wcmlzbWFcIixcbiAgICAgICAgICAgICAgICBcInNvdXJjZS5wcmlzbWEuZW1iZWRkZWQuc291cmNlXCIsXG4gICAgICAgICAgICAgICAgXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnRhZy5wcmlzbWFcIlxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHJlZ2V4OiAvXihcXHMqKShtb2RlbHx0eXBlKShcXHMrKShbQS1aYS16XVtcXHddKikoXFxzKykoeykvLFxuICAgICAgICAgICAgcHVzaDogW3tcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnRhZy5wcmlzbWFcIixcbiAgICAgICAgICAgICAgICByZWdleDogL1xccypcXH0vLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiBcIiN0cmlwbGVfY29tbWVudFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaW5jbHVkZTogXCIjZG91YmxlX2NvbW1lbnRcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFwiI2ZpZWxkX2RlZmluaXRpb25cIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzb3VyY2UucHJpc21hLmVtYmVkZGVkLnNvdXJjZVwiXG4gICAgICAgICAgICB9XVxuICAgICAgICB9XSxcbiAgICAgICAgXCIjZW51bV9ibG9ja19kZWZpbml0aW9uXCI6IFt7XG4gICAgICAgICAgICB0b2tlbjogW1xuICAgICAgICAgICAgICAgIFwic291cmNlLnByaXNtYS5lbWJlZGRlZC5zb3VyY2VcIixcbiAgICAgICAgICAgICAgICBcInN0b3JhZ2UudHlwZS5lbnVtLnByaXNtYVwiLFxuICAgICAgICAgICAgICAgIFwic291cmNlLnByaXNtYS5lbWJlZGRlZC5zb3VyY2VcIixcbiAgICAgICAgICAgICAgICBcImVudGl0eS5uYW1lLnR5cGUuZW51bS5wcmlzbWFcIixcbiAgICAgICAgICAgICAgICBcInNvdXJjZS5wcmlzbWEuZW1iZWRkZWQuc291cmNlXCIsXG4gICAgICAgICAgICAgICAgXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnRhZy5wcmlzbWFcIlxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHJlZ2V4OiAvXihcXHMqKShlbnVtKShcXHMrKShbQS1aYS16XVtcXHddKikoXFxzKykoeykvLFxuICAgICAgICAgICAgcHVzaDogW3tcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnRhZy5wcmlzbWFcIixcbiAgICAgICAgICAgICAgICByZWdleDogL1xccypcXH0vLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiBcIiN0cmlwbGVfY29tbWVudFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaW5jbHVkZTogXCIjZG91YmxlX2NvbW1lbnRcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFwiI2VudW1fdmFsdWVfZGVmaW5pdGlvblwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInNvdXJjZS5wcmlzbWEuZW1iZWRkZWQuc291cmNlXCJcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH1dLFxuICAgICAgICBcIiNjb25maWdfYmxvY2tfZGVmaW5pdGlvblwiOiBbe1xuICAgICAgICAgICAgdG9rZW46IFtcbiAgICAgICAgICAgICAgICBcInNvdXJjZS5wcmlzbWEuZW1iZWRkZWQuc291cmNlXCIsXG4gICAgICAgICAgICAgICAgXCJzdG9yYWdlLnR5cGUuY29uZmlnLnByaXNtYVwiLFxuICAgICAgICAgICAgICAgIFwic291cmNlLnByaXNtYS5lbWJlZGRlZC5zb3VyY2VcIixcbiAgICAgICAgICAgICAgICBcImVudGl0eS5uYW1lLnR5cGUuY29uZmlnLnByaXNtYVwiLFxuICAgICAgICAgICAgICAgIFwic291cmNlLnByaXNtYS5lbWJlZGRlZC5zb3VyY2VcIixcbiAgICAgICAgICAgICAgICBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24udGFnLnByaXNtYVwiXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgcmVnZXg6IC9eKFxccyopKGdlbmVyYXRvcnxkYXRhc291cmNlKShcXHMrKShbQS1aYS16XVtcXHddKikoXFxzKykoeykvLFxuICAgICAgICAgICAgcHVzaDogW3tcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJzb3VyY2UucHJpc21hLmVtYmVkZGVkLnNvdXJjZVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvXFxzKlxcfS8sXG4gICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFwiI3RyaXBsZV9jb21tZW50XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiBcIiNkb3VibGVfY29tbWVudFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaW5jbHVkZTogXCIjYXNzaWdubWVudFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInNvdXJjZS5wcmlzbWEuZW1iZWRkZWQuc291cmNlXCJcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH1dLFxuICAgICAgICBcIiNhc3NpZ25tZW50XCI6IFt7XG4gICAgICAgICAgICB0b2tlbjogW1xuICAgICAgICAgICAgICAgIFwidGV4dFwiLFxuICAgICAgICAgICAgICAgIFwidmFyaWFibGUub3RoZXIuYXNzaWdubWVudC5wcmlzbWFcIixcbiAgICAgICAgICAgICAgICBcInRleHRcIixcbiAgICAgICAgICAgICAgICBcImtleXdvcmQub3BlcmF0b3IudGVycmFmb3JtXCIsXG4gICAgICAgICAgICAgICAgXCJ0ZXh0XCJcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICByZWdleDogL14oXFxzKikoXFx3KykoXFxzKikoPSkoXFxzKikvLFxuICAgICAgICAgICAgcHVzaDogW3tcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IC8kLyxcbiAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaW5jbHVkZTogXCIjdmFsdWVcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFwiI2RvdWJsZV9jb21tZW50X2lubGluZVwiXG4gICAgICAgICAgICB9XVxuICAgICAgICB9XSxcbiAgICAgICAgXCIjZmllbGRfZGVmaW5pdGlvblwiOiBbe1xuICAgICAgICAgICAgdG9rZW46IFtcbiAgICAgICAgICAgICAgICBcInRleHRcIixcbiAgICAgICAgICAgICAgICBcInZhcmlhYmxlLm90aGVyLmFzc2lnbm1lbnQucHJpc21hXCIsXG4gICAgICAgICAgICAgICAgXCJpbnZhbGlkLmlsbGVnYWwuY29sb24ucHJpc21hXCIsXG4gICAgICAgICAgICAgICAgXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgXCJzdXBwb3J0LnR5cGUucHJpbWl0aXZlLnByaXNtYVwiLFxuICAgICAgICAgICAgICAgIFwia2V5d29yZC5vcGVyYXRvci5saXN0X3R5cGUucHJpc21hXCIsXG4gICAgICAgICAgICAgICAgXCJrZXl3b3JkLm9wZXJhdG9yLm9wdGlvbmFsX3R5cGUucHJpc21hXCIsXG4gICAgICAgICAgICAgICAgXCJpbnZhbGlkLmlsbGVnYWwucmVxdWlyZWRfdHlwZS5wcmlzbWFcIlxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHJlZ2V4OiAvXihcXHMqKShcXHcrKSgoPzpcXHMqOik/KShcXHMrKShcXHcrKSgoPzpcXFtcXF0pPykoKD86XFw/KT8pKCg/OlxcISk/KS9cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaW5jbHVkZTogXCIjYXR0cmlidXRlX3dpdGhfYXJndW1lbnRzXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaW5jbHVkZTogXCIjYXR0cmlidXRlXCJcbiAgICAgICAgfV0sXG4gICAgICAgIFwiI3R5cGVfZGVmaW5pdGlvblwiOiBbe1xuICAgICAgICAgICAgdG9rZW46IFtcbiAgICAgICAgICAgICAgICBcInRleHRcIixcbiAgICAgICAgICAgICAgICBcInN0b3JhZ2UudHlwZS50eXBlLnByaXNtYVwiLFxuICAgICAgICAgICAgICAgIFwidGV4dFwiLFxuICAgICAgICAgICAgICAgIFwiZW50aXR5Lm5hbWUudHlwZS50eXBlLnByaXNtYVwiLFxuICAgICAgICAgICAgICAgIFwidGV4dFwiLFxuICAgICAgICAgICAgICAgIFwic3VwcG9ydC50eXBlLnByaW1pdGl2ZS5wcmlzbWFcIlxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHJlZ2V4OiAvXihcXHMqKSh0eXBlKShcXHMrKShcXHcrKShcXHMqPVxccyopKFxcdyspL1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpbmNsdWRlOiBcIiNhdHRyaWJ1dGVfd2l0aF9hcmd1bWVudHNcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpbmNsdWRlOiBcIiNhdHRyaWJ1dGVcIlxuICAgICAgICB9XSxcbiAgICAgICAgXCIjZW51bV92YWx1ZV9kZWZpbml0aW9uXCI6IFt7XG4gICAgICAgICAgICB0b2tlbjogW1xuICAgICAgICAgICAgICAgIFwidGV4dFwiLFxuICAgICAgICAgICAgICAgIFwidmFyaWFibGUub3RoZXIuYXNzaWdubWVudC5wcmlzbWFcIixcbiAgICAgICAgICAgICAgICBcInRleHRcIlxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHJlZ2V4OiAvXihcXHMqKShcXHcrKShcXHMqJCkvXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGluY2x1ZGU6IFwiI2F0dHJpYnV0ZV93aXRoX2FyZ3VtZW50c1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGluY2x1ZGU6IFwiI2F0dHJpYnV0ZVwiXG4gICAgICAgIH1dLFxuICAgICAgICBcIiNhdHRyaWJ1dGVfd2l0aF9hcmd1bWVudHNcIjogW3tcbiAgICAgICAgICAgIHRva2VuOiBbXG4gICAgICAgICAgICAgICAgXCJlbnRpdHkubmFtZS5mdW5jdGlvbi5hdHRyaWJ1dGUucHJpc21hXCIsXG4gICAgICAgICAgICAgICAgXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnRhZy5wcmlzbWFcIlxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHJlZ2V4OiAvKEBAP1tcXHdcXC5dKykoXFwoKS8sXG4gICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24udGFnLnByaXNtYVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvXFwpLyxcbiAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaW5jbHVkZTogXCIjbmFtZWRfYXJndW1lbnRcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFwiI3ZhbHVlXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwic291cmNlLnByaXNtYS5hdHRyaWJ1dGUud2l0aF9hcmd1bWVudHNcIlxuICAgICAgICAgICAgfV1cbiAgICAgICAgfV0sXG4gICAgICAgIFwiI2F0dHJpYnV0ZVwiOiBbe1xuICAgICAgICAgICAgdG9rZW46IFwiZW50aXR5Lm5hbWUuZnVuY3Rpb24uYXR0cmlidXRlLnByaXNtYVwiLFxuICAgICAgICAgICAgcmVnZXg6IC9AQD9bXFx3XFwuXSsvXG4gICAgICAgIH1dLFxuICAgICAgICBcIiNhcnJheVwiOiBbe1xuICAgICAgICAgICAgdG9rZW46IFwic291cmNlLnByaXNtYS5hcnJheVwiLFxuICAgICAgICAgICAgcmVnZXg6IC9cXFsvLFxuICAgICAgICAgICAgcHVzaDogW3tcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJzb3VyY2UucHJpc21hLmFycmF5XCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IC9cXF0vLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiBcIiN2YWx1ZVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInNvdXJjZS5wcmlzbWEuYXJyYXlcIlxuICAgICAgICAgICAgfV1cbiAgICAgICAgfV0sXG4gICAgICAgIFwiI3ZhbHVlXCI6IFt7XG4gICAgICAgICAgICBpbmNsdWRlOiBcIiNhcnJheVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGluY2x1ZGU6IFwiI2Z1bmN0aW9uYWxcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpbmNsdWRlOiBcIiNsaXRlcmFsXCJcbiAgICAgICAgfV0sXG4gICAgICAgIFwiI2Z1bmN0aW9uYWxcIjogW3tcbiAgICAgICAgICAgIHRva2VuOiBbXG4gICAgICAgICAgICAgICAgXCJzdXBwb3J0LmZ1bmN0aW9uLmZ1bmN0aW9uYWwucHJpc21hXCIsXG4gICAgICAgICAgICAgICAgXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnRhZy5wcmlzbWFcIlxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHJlZ2V4OiAvKFxcdyspKFxcKCkvLFxuICAgICAgICAgICAgcHVzaDogW3tcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnRhZy5wcmlzbWFcIixcbiAgICAgICAgICAgICAgICByZWdleDogL1xcKS8sXG4gICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFwiI3ZhbHVlXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwic291cmNlLnByaXNtYS5mdW5jdGlvbmFsXCJcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH1dLFxuICAgICAgICBcIiNsaXRlcmFsXCI6IFt7XG4gICAgICAgICAgICBpbmNsdWRlOiBcIiNib29sZWFuXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaW5jbHVkZTogXCIjbnVtYmVyXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaW5jbHVkZTogXCIjZG91YmxlX3F1b3RlZF9zdHJpbmdcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpbmNsdWRlOiBcIiNpZGVudGlmaWVyXCJcbiAgICAgICAgfV0sXG4gICAgICAgIFwiI2lkZW50aWZpZXJcIjogW3tcbiAgICAgICAgICAgIHRva2VuOiBcInN1cHBvcnQuY29uc3RhbnQuY29uc3RhbnQucHJpc21hXCIsXG4gICAgICAgICAgICByZWdleDogL1xcYig/OlxcdykrXFxiL1xuICAgICAgICB9XSxcbiAgICAgICAgXCIjbWFwX2tleVwiOiBbe1xuICAgICAgICAgICAgdG9rZW46IFtcbiAgICAgICAgICAgICAgICBcInZhcmlhYmxlLnBhcmFtZXRlci5rZXkucHJpc21hXCIsXG4gICAgICAgICAgICAgICAgXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnNlcGFyYXRvci5rZXktdmFsdWUucHJpc21hXCIsXG4gICAgICAgICAgICAgICAgXCJ0ZXh0XCJcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICByZWdleDogLyhcXHcrKShcXHMqKSg6KShcXHMqKS9cbiAgICAgICAgfV0sXG4gICAgICAgIFwiI25hbWVkX2FyZ3VtZW50XCI6IFt7XG4gICAgICAgICAgICBpbmNsdWRlOiBcIiNtYXBfa2V5XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaW5jbHVkZTogXCIjdmFsdWVcIlxuICAgICAgICB9XSxcbiAgICAgICAgXCIjdHJpcGxlX2NvbW1lbnRcIjogW3tcbiAgICAgICAgICAgIHRva2VuOiBcImNvbW1lbnQucHJpc21hXCIsXG4gICAgICAgICAgICByZWdleDogL1xcL1xcL1xcLy8sXG4gICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuOiBcImNvbW1lbnQucHJpc21hXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IC8kLyxcbiAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcImNvbW1lbnQucHJpc21hXCJcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH1dLFxuICAgICAgICBcIiNkb3VibGVfY29tbWVudFwiOiBbe1xuICAgICAgICAgICAgdG9rZW46IFwiY29tbWVudC5wcmlzbWFcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXFwvXFwvLyxcbiAgICAgICAgICAgIHB1c2g6IFt7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwiY29tbWVudC5wcmlzbWFcIixcbiAgICAgICAgICAgICAgICByZWdleDogLyQvLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwiY29tbWVudC5wcmlzbWFcIlxuICAgICAgICAgICAgfV1cbiAgICAgICAgfV0sXG4gICAgICAgIFwiI2RvdWJsZV9jb21tZW50X2lubGluZVwiOiBbe1xuICAgICAgICAgICAgdG9rZW46IFwiY29tbWVudC5wcmlzbWFcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXFwvXFwvW14kXSovXG4gICAgICAgIH1dLFxuICAgICAgICBcIiNib29sZWFuXCI6IFt7XG4gICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5sYW5ndWFnZS5ib29sZWFuLnByaXNtYVwiLFxuICAgICAgICAgICAgcmVnZXg6IC9cXGIoPzp0cnVlfGZhbHNlKVxcYi9cbiAgICAgICAgfV0sXG4gICAgICAgIFwiI251bWJlclwiOiBbe1xuICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQubnVtZXJpYy5wcmlzbWFcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvKD86MCg/Onh8WClbMC05YS1mQS1GXSp8KD86XFwrfC0pP1xcYig/OlswLTldK1xcLj9bMC05XSp8XFwuWzAtOV0rKSg/Oig/OmV8RSkoPzpcXCt8LSk/WzAtOV0rKT8pKD86W0xsRmZVdURkZ118VUx8dWwpP1xcYi9cbiAgICAgICAgfV0sXG4gICAgICAgIFwiI2RvdWJsZV9xdW90ZWRfc3RyaW5nXCI6IFt7XG4gICAgICAgICAgICB0b2tlbjogXCJzdHJpbmcucXVvdGVkLmRvdWJsZS5zdGFydC5wcmlzbWFcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXCIvLFxuICAgICAgICAgICAgcHVzaDogW3tcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJzdHJpbmcucXVvdGVkLmRvdWJsZS5lbmQucHJpc21hXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IC9cIi8sXG4gICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFwiI3N0cmluZ19pbnRlcnBvbGF0aW9uXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJzdHJpbmcucXVvdGVkLmRvdWJsZS5wcmlzbWFcIixcbiAgICAgICAgICAgICAgICByZWdleDogL1tcXHdcXC1cXC9cXC5fXFxcXCVAOlxcPz1dKy9cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwidW5uYW1lZFwiXG4gICAgICAgICAgICB9XVxuICAgICAgICB9XSxcbiAgICAgICAgXCIjc3RyaW5nX2ludGVycG9sYXRpb25cIjogW3tcbiAgICAgICAgICAgIHRva2VuOiBcImtleXdvcmQuY29udHJvbC5pbnRlcnBvbGF0aW9uLnN0YXJ0LnByaXNtYVwiLFxuICAgICAgICAgICAgcmVnZXg6IC9cXCRcXHsvLFxuICAgICAgICAgICAgcHVzaDogW3tcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJrZXl3b3JkLmNvbnRyb2wuaW50ZXJwb2xhdGlvbi5lbmQucHJpc21hXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IC9cXHMqXFx9LyxcbiAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaW5jbHVkZTogXCIjdmFsdWVcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzb3VyY2UudGFnLmVtYmVkZGVkLnNvdXJjZS5wcmlzbWFcIlxuICAgICAgICAgICAgfV1cbiAgICAgICAgfV1cbiAgICB9O1xuICAgIFxuICAgIHRoaXMubm9ybWFsaXplUnVsZXMoKTtcbn07XG5cblByaXNtYUhpZ2hsaWdodFJ1bGVzLm1ldGFEYXRhID0ge1xuICAgIG5hbWU6IFwiUHJpc21hXCIsXG4gICAgc2NvcGVOYW1lOiBcInNvdXJjZS5wcmlzbWFcIlxufTtcblxuXG5vb3AuaW5oZXJpdHMoUHJpc21hSGlnaGxpZ2h0UnVsZXMsIFRleHRIaWdobGlnaHRSdWxlcyk7XG5cbmV4cG9ydHMuUHJpc21hSGlnaGxpZ2h0UnVsZXMgPSBQcmlzbWFIaWdobGlnaHRSdWxlcztcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==