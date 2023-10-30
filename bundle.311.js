"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[311],{

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

/***/ 40311:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/*
  THIS FILE WAS AUTOGENERATED BY mode.tmpl.js
*/



var oop = __webpack_require__(89359);
var TextMode = (__webpack_require__(98030).Mode);
var PrismaHighlightRules = (__webpack_require__(77722)/* .PrismaHighlightRules */ .v);
// TODO: pick appropriate fold mode
var FoldMode = (__webpack_require__(12764)/* .FoldMode */ .Z);

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

/***/ 77722:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* This file was autogenerated from ../convert.json (uuid: ) */
/****************************************************************************************
 * IT MIGHT NOT BE PERFECT ...But it's a good start from an existing *.tmlanguage file. *
 * fileTypes                                                                            *
 ****************************************************************************************/



var oop = __webpack_require__(89359);
var TextHighlightRules = (__webpack_require__(28053)/* .TextHighlightRules */ .K);

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

exports.v = PrismaHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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YTtBQUNiO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBLFNBQTRCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9mb2xkaW5nL2NzdHlsZS5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL3ByaXNtYS5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL3ByaXNtYV9oaWdobGlnaHRfcnVsZXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vLi4vbGliL29vcFwiKTtcbnZhciBSYW5nZSA9IHJlcXVpcmUoXCIuLi8uLi9yYW5nZVwiKS5SYW5nZTtcbnZhciBCYXNlRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9mb2xkX21vZGVcIikuRm9sZE1vZGU7XG5cbnZhciBGb2xkTW9kZSA9IGV4cG9ydHMuRm9sZE1vZGUgPSBmdW5jdGlvbihjb21tZW50UmVnZXgpIHtcbiAgICBpZiAoY29tbWVudFJlZ2V4KSB7XG4gICAgICAgIHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyID0gbmV3IFJlZ0V4cChcbiAgICAgICAgICAgIHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyLnNvdXJjZS5yZXBsYWNlKC9cXHxbXnxdKj8kLywgXCJ8XCIgKyBjb21tZW50UmVnZXguc3RhcnQpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIgPSBuZXcgUmVnRXhwKFxuICAgICAgICAgICAgdGhpcy5mb2xkaW5nU3RvcE1hcmtlci5zb3VyY2UucmVwbGFjZSgvXFx8W158XSo/JC8sIFwifFwiICsgY29tbWVudFJlZ2V4LmVuZClcbiAgICAgICAgKTtcbiAgICB9XG59O1xub29wLmluaGVyaXRzKEZvbGRNb2RlLCBCYXNlRm9sZE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgXG4gICAgdGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIgPSAvKFtcXHtcXFtcXChdKVteXFx9XFxdXFwpXSokfF5cXHMqKFxcL1xcKikvO1xuICAgIHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIgPSAvXlteXFxbXFx7XFwoXSooW1xcfVxcXVxcKV0pfF5bXFxzXFwqXSooXFwqXFwvKS87XG4gICAgdGhpcy5zaW5nbGVMaW5lQmxvY2tDb21tZW50UmU9IC9eXFxzKihcXC9cXCopLipcXCpcXC9cXHMqJC87XG4gICAgdGhpcy50cmlwbGVTdGFyQmxvY2tDb21tZW50UmUgPSAvXlxccyooXFwvXFwqXFwqXFwqKS4qXFwqXFwvXFxzKiQvO1xuICAgIHRoaXMuc3RhcnRSZWdpb25SZSA9IC9eXFxzKihcXC9cXCp8XFwvXFwvKSM/cmVnaW9uXFxiLztcbiAgICBcbiAgICAvL3ByZXZlbnQgbmFtaW5nIGNvbmZsaWN0IHdpdGggYW55IG1vZGVzIHRoYXQgaW5oZXJpdCBmcm9tIGNzdHlsZSBhbmQgb3ZlcnJpZGUgdGhpcyAobGlrZSBjc2hhcnApXG4gICAgdGhpcy5fZ2V0Rm9sZFdpZGdldEJhc2UgPSB0aGlzLmdldEZvbGRXaWRnZXQ7XG4gICAgXG4gICAgLyoqXG4gICAgICogR2V0cyBmb2xkIHdpZGdldCB3aXRoIHNvbWUgbm9uLXN0YW5kYXJkIGV4dHJhczpcbiAgICAgKlxuICAgICAqIEBleGFtcGxlIGxpbmVDb21tZW50UmVnaW9uU3RhcnRcbiAgICAgKiAgICAgIC8vI3JlZ2lvbiBbb3B0aW9uYWwgZGVzY3JpcHRpb25dXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSBibG9ja0NvbW1lbnRSZWdpb25TdGFydFxuICAgICAqICAgICAgLyojcmVnaW9uIFtvcHRpb25hbCBkZXNjcmlwdGlvbl0gKlsvXVxuICAgICAqXG4gICAgICogQGV4YW1wbGUgdHJpcGxlU3RhckZvbGRpbmdTZWN0aW9uXG4gICAgICogICAgICAvKioqIHRoaXMgZm9sZHMgZXZlbiB0aG91Z2ggMSBsaW5lIGJlY2F1c2UgaXQgaGFzIDMgc3RhcnMgKioqWy9dXG4gICAgICogXG4gICAgICogQG5vdGUgdGhlIHBvdW5kIHN5bWJvbCBmb3IgcmVnaW9uIHRhZ3MgaXMgb3B0aW9uYWxcbiAgICAgKi9cbiAgICB0aGlzLmdldEZvbGRXaWRnZXQgPSBmdW5jdGlvbihzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdykge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgIFxuICAgICAgICBpZiAodGhpcy5zaW5nbGVMaW5lQmxvY2tDb21tZW50UmUudGVzdChsaW5lKSkge1xuICAgICAgICAgICAgLy8gTm8gd2lkZ2V0IGZvciBzaW5nbGUgbGluZSBibG9jayBjb21tZW50IHVubGVzcyByZWdpb24gb3IgdHJpcGxlIHN0YXJcbiAgICAgICAgICAgIGlmICghdGhpcy5zdGFydFJlZ2lvblJlLnRlc3QobGluZSkgJiYgIXRoaXMudHJpcGxlU3RhckJsb2NrQ29tbWVudFJlLnRlc3QobGluZSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgdmFyIGZ3ID0gdGhpcy5fZ2V0Rm9sZFdpZGdldEJhc2Uoc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpO1xuICAgIFxuICAgICAgICBpZiAoIWZ3ICYmIHRoaXMuc3RhcnRSZWdpb25SZS50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgcmV0dXJuIFwic3RhcnRcIjsgLy8gbGluZUNvbW1lbnRSZWdpb25TdGFydFxuICAgIFxuICAgICAgICByZXR1cm4gZnc7XG4gICAgfTtcblxuICAgIHRoaXMuZ2V0Rm9sZFdpZGdldFJhbmdlID0gZnVuY3Rpb24oc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3csIGZvcmNlTXVsdGlsaW5lKSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5zdGFydFJlZ2lvblJlLnRlc3QobGluZSkpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRDb21tZW50UmVnaW9uQmxvY2soc2Vzc2lvbiwgbGluZSwgcm93KTtcbiAgICAgICAgXG4gICAgICAgIHZhciBtYXRjaCA9IGxpbmUubWF0Y2godGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIpO1xuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIHZhciBpID0gbWF0Y2guaW5kZXg7XG5cbiAgICAgICAgICAgIGlmIChtYXRjaFsxXSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5vcGVuaW5nQnJhY2tldEJsb2NrKHNlc3Npb24sIG1hdGNoWzFdLCByb3csIGkpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIHJhbmdlID0gc2Vzc2lvbi5nZXRDb21tZW50Rm9sZFJhbmdlKHJvdywgaSArIG1hdGNoWzBdLmxlbmd0aCwgMSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChyYW5nZSAmJiAhcmFuZ2UuaXNNdWx0aUxpbmUoKSkge1xuICAgICAgICAgICAgICAgIGlmIChmb3JjZU11bHRpbGluZSkge1xuICAgICAgICAgICAgICAgICAgICByYW5nZSA9IHRoaXMuZ2V0U2VjdGlvblJhbmdlKHNlc3Npb24sIHJvdyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChmb2xkU3R5bGUgIT0gXCJhbGxcIilcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2UgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gcmFuZ2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZm9sZFN0eWxlID09PSBcIm1hcmtiZWdpblwiKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHZhciBtYXRjaCA9IGxpbmUubWF0Y2godGhpcy5mb2xkaW5nU3RvcE1hcmtlcik7XG4gICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgdmFyIGkgPSBtYXRjaC5pbmRleCArIG1hdGNoWzBdLmxlbmd0aDtcblxuICAgICAgICAgICAgaWYgKG1hdGNoWzFdKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNsb3NpbmdCcmFja2V0QmxvY2soc2Vzc2lvbiwgbWF0Y2hbMV0sIHJvdywgaSk7XG5cbiAgICAgICAgICAgIHJldHVybiBzZXNzaW9uLmdldENvbW1lbnRGb2xkUmFuZ2Uocm93LCBpLCAtMSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFxuICAgIHRoaXMuZ2V0U2VjdGlvblJhbmdlID0gZnVuY3Rpb24oc2Vzc2lvbiwgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgIHZhciBzdGFydEluZGVudCA9IGxpbmUuc2VhcmNoKC9cXFMvKTtcbiAgICAgICAgdmFyIHN0YXJ0Um93ID0gcm93O1xuICAgICAgICB2YXIgc3RhcnRDb2x1bW4gPSBsaW5lLmxlbmd0aDtcbiAgICAgICAgcm93ID0gcm93ICsgMTtcbiAgICAgICAgdmFyIGVuZFJvdyA9IHJvdztcbiAgICAgICAgdmFyIG1heFJvdyA9IHNlc3Npb24uZ2V0TGVuZ3RoKCk7XG4gICAgICAgIHdoaWxlICgrK3JvdyA8IG1heFJvdykge1xuICAgICAgICAgICAgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICAgICAgdmFyIGluZGVudCA9IGxpbmUuc2VhcmNoKC9cXFMvKTtcbiAgICAgICAgICAgIGlmIChpbmRlbnQgPT09IC0xKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgaWYgIChzdGFydEluZGVudCA+IGluZGVudClcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIHZhciBzdWJSYW5nZSA9IHRoaXMuZ2V0Rm9sZFdpZGdldFJhbmdlKHNlc3Npb24sIFwiYWxsXCIsIHJvdyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChzdWJSYW5nZSkge1xuICAgICAgICAgICAgICAgIGlmIChzdWJSYW5nZS5zdGFydC5yb3cgPD0gc3RhcnRSb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzdWJSYW5nZS5pc011bHRpTGluZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJvdyA9IHN1YlJhbmdlLmVuZC5yb3c7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzdGFydEluZGVudCA9PSBpbmRlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZW5kUm93ID0gcm93O1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gbmV3IFJhbmdlKHN0YXJ0Um93LCBzdGFydENvbHVtbiwgZW5kUm93LCBzZXNzaW9uLmdldExpbmUoZW5kUm93KS5sZW5ndGgpO1xuICAgIH07XG4gICAgXG4gICAgLyoqXG4gICAgICogZ2V0cyBjb21tZW50IHJlZ2lvbiBibG9jayB3aXRoIGVuZCByZWdpb24gYXNzdW1lZCB0byBiZSBzdGFydCBvZiBjb21tZW50IGluIGFueSBjc3R5bGUgbW9kZSBvciBTUUwgbW9kZSAoLS0pIHdoaWNoIGluaGVyaXRzIGZyb20gdGhpcy5cbiAgICAgKiBUaGVyZSBtYXkgb3B0aW9uYWxseSBiZSBhIHBvdW5kIHN5bWJvbCBiZWZvcmUgdGhlIHJlZ2lvbi9lbmRyZWdpb24gc3RhdGVtZW50XG4gICAgICovXG4gICAgdGhpcy5nZXRDb21tZW50UmVnaW9uQmxvY2sgPSBmdW5jdGlvbihzZXNzaW9uLCBsaW5lLCByb3cpIHtcbiAgICAgICAgdmFyIHN0YXJ0Q29sdW1uID0gbGluZS5zZWFyY2goL1xccyokLyk7XG4gICAgICAgIHZhciBtYXhSb3cgPSBzZXNzaW9uLmdldExlbmd0aCgpO1xuICAgICAgICB2YXIgc3RhcnRSb3cgPSByb3c7XG4gICAgICAgIFxuICAgICAgICB2YXIgcmUgPSAvXlxccyooPzpcXC9cXCp8XFwvXFwvfC0tKSM/KGVuZCk/cmVnaW9uXFxiLztcbiAgICAgICAgdmFyIGRlcHRoID0gMTtcbiAgICAgICAgd2hpbGUgKCsrcm93IDwgbWF4Um93KSB7XG4gICAgICAgICAgICBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgICAgICB2YXIgbSA9IHJlLmV4ZWMobGluZSk7XG4gICAgICAgICAgICBpZiAoIW0pIGNvbnRpbnVlO1xuICAgICAgICAgICAgaWYgKG1bMV0pIGRlcHRoLS07XG4gICAgICAgICAgICBlbHNlIGRlcHRoKys7XG5cbiAgICAgICAgICAgIGlmICghZGVwdGgpIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGVuZFJvdyA9IHJvdztcbiAgICAgICAgaWYgKGVuZFJvdyA+IHN0YXJ0Um93KSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFJhbmdlKHN0YXJ0Um93LCBzdGFydENvbHVtbiwgZW5kUm93LCBsaW5lLmxlbmd0aCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG59KS5jYWxsKEZvbGRNb2RlLnByb3RvdHlwZSk7XG4iLCIvKlxuICBUSElTIEZJTEUgV0FTIEFVVE9HRU5FUkFURUQgQlkgbW9kZS50bXBsLmpzXG4qL1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRNb2RlID0gcmVxdWlyZShcIi4vdGV4dFwiKS5Nb2RlO1xudmFyIFByaXNtYUhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vcHJpc21hX2hpZ2hsaWdodF9ydWxlc1wiKS5QcmlzbWFIaWdobGlnaHRSdWxlcztcbi8vIFRPRE86IHBpY2sgYXBwcm9wcmlhdGUgZm9sZCBtb2RlXG52YXIgRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9mb2xkaW5nL2NzdHlsZVwiKS5Gb2xkTW9kZTtcblxudmFyIE1vZGUgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLkhpZ2hsaWdodFJ1bGVzID0gUHJpc21hSGlnaGxpZ2h0UnVsZXM7XG4gICAgdGhpcy5mb2xkaW5nUnVsZXMgPSBuZXcgRm9sZE1vZGUoKTtcbn07XG5vb3AuaW5oZXJpdHMoTW9kZSwgVGV4dE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5saW5lQ29tbWVudFN0YXJ0ID0gXCIvL1wiO1xuICAgIC8vIHRoaXMuYmxvY2tDb21tZW50ID0ge3N0YXJ0OiBcIlwiLypcIlwiLCBlbmQ6IFwiXCIqL1wiXCJ9O1xuICAgIC8vIEV4dHJhIGxvZ2ljIGdvZXMgaGVyZS5cbiAgICB0aGlzLiRpZCA9IFwiYWNlL21vZGUvcHJpc21hXCI7XG59KS5jYWxsKE1vZGUucHJvdG90eXBlKTtcblxuZXhwb3J0cy5Nb2RlID0gTW9kZTtcbiIsIi8qIFRoaXMgZmlsZSB3YXMgYXV0b2dlbmVyYXRlZCBmcm9tIC4uL2NvbnZlcnQuanNvbiAodXVpZDogKSAqL1xuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqIElUIE1JR0hUIE5PVCBCRSBQRVJGRUNUIC4uLkJ1dCBpdCdzIGEgZ29vZCBzdGFydCBmcm9tIGFuIGV4aXN0aW5nICoudG1sYW5ndWFnZSBmaWxlLiAqXG4gKiBmaWxlVHlwZXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xuXG52YXIgUHJpc21hSGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbigpIHtcbiAgICAvLyByZWdleHAgbXVzdCBub3QgaGF2ZSBjYXB0dXJpbmcgcGFyZW50aGVzZXMuIFVzZSAoPzopIGluc3RlYWQuXG4gICAgLy8gcmVnZXhwcyBhcmUgb3JkZXJlZCAtPiB0aGUgZmlyc3QgbWF0Y2ggaXMgdXNlZFxuXG4gICAgdGhpcy4kcnVsZXMgPSB7XG4gICAgICAgIHN0YXJ0OiBbe1xuICAgICAgICAgICAgaW5jbHVkZTogXCIjdHJpcGxlX2NvbW1lbnRcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpbmNsdWRlOiBcIiNkb3VibGVfY29tbWVudFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGluY2x1ZGU6IFwiI21vZGVsX2Jsb2NrX2RlZmluaXRpb25cIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpbmNsdWRlOiBcIiNjb25maWdfYmxvY2tfZGVmaW5pdGlvblwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGluY2x1ZGU6IFwiI2VudW1fYmxvY2tfZGVmaW5pdGlvblwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGluY2x1ZGU6IFwiI3R5cGVfZGVmaW5pdGlvblwiXG4gICAgICAgIH1dLFxuICAgICAgICBcIiNtb2RlbF9ibG9ja19kZWZpbml0aW9uXCI6IFt7XG4gICAgICAgICAgICB0b2tlbjogW1xuICAgICAgICAgICAgICAgIFwic291cmNlLnByaXNtYS5lbWJlZGRlZC5zb3VyY2VcIixcbiAgICAgICAgICAgICAgICBcInN0b3JhZ2UudHlwZS5tb2RlbC5wcmlzbWFcIixcbiAgICAgICAgICAgICAgICBcInNvdXJjZS5wcmlzbWEuZW1iZWRkZWQuc291cmNlXCIsXG4gICAgICAgICAgICAgICAgXCJlbnRpdHkubmFtZS50eXBlLm1vZGVsLnByaXNtYVwiLFxuICAgICAgICAgICAgICAgIFwic291cmNlLnByaXNtYS5lbWJlZGRlZC5zb3VyY2VcIixcbiAgICAgICAgICAgICAgICBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24udGFnLnByaXNtYVwiXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgcmVnZXg6IC9eKFxccyopKG1vZGVsfHR5cGUpKFxccyspKFtBLVphLXpdW1xcd10qKShcXHMrKSh7KS8sXG4gICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24udGFnLnByaXNtYVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvXFxzKlxcfS8sXG4gICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFwiI3RyaXBsZV9jb21tZW50XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiBcIiNkb3VibGVfY29tbWVudFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaW5jbHVkZTogXCIjZmllbGRfZGVmaW5pdGlvblwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInNvdXJjZS5wcmlzbWEuZW1iZWRkZWQuc291cmNlXCJcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH1dLFxuICAgICAgICBcIiNlbnVtX2Jsb2NrX2RlZmluaXRpb25cIjogW3tcbiAgICAgICAgICAgIHRva2VuOiBbXG4gICAgICAgICAgICAgICAgXCJzb3VyY2UucHJpc21hLmVtYmVkZGVkLnNvdXJjZVwiLFxuICAgICAgICAgICAgICAgIFwic3RvcmFnZS50eXBlLmVudW0ucHJpc21hXCIsXG4gICAgICAgICAgICAgICAgXCJzb3VyY2UucHJpc21hLmVtYmVkZGVkLnNvdXJjZVwiLFxuICAgICAgICAgICAgICAgIFwiZW50aXR5Lm5hbWUudHlwZS5lbnVtLnByaXNtYVwiLFxuICAgICAgICAgICAgICAgIFwic291cmNlLnByaXNtYS5lbWJlZGRlZC5zb3VyY2VcIixcbiAgICAgICAgICAgICAgICBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24udGFnLnByaXNtYVwiXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgcmVnZXg6IC9eKFxccyopKGVudW0pKFxccyspKFtBLVphLXpdW1xcd10qKShcXHMrKSh7KS8sXG4gICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24udGFnLnByaXNtYVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvXFxzKlxcfS8sXG4gICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFwiI3RyaXBsZV9jb21tZW50XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiBcIiNkb3VibGVfY29tbWVudFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaW5jbHVkZTogXCIjZW51bV92YWx1ZV9kZWZpbml0aW9uXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwic291cmNlLnByaXNtYS5lbWJlZGRlZC5zb3VyY2VcIlxuICAgICAgICAgICAgfV1cbiAgICAgICAgfV0sXG4gICAgICAgIFwiI2NvbmZpZ19ibG9ja19kZWZpbml0aW9uXCI6IFt7XG4gICAgICAgICAgICB0b2tlbjogW1xuICAgICAgICAgICAgICAgIFwic291cmNlLnByaXNtYS5lbWJlZGRlZC5zb3VyY2VcIixcbiAgICAgICAgICAgICAgICBcInN0b3JhZ2UudHlwZS5jb25maWcucHJpc21hXCIsXG4gICAgICAgICAgICAgICAgXCJzb3VyY2UucHJpc21hLmVtYmVkZGVkLnNvdXJjZVwiLFxuICAgICAgICAgICAgICAgIFwiZW50aXR5Lm5hbWUudHlwZS5jb25maWcucHJpc21hXCIsXG4gICAgICAgICAgICAgICAgXCJzb3VyY2UucHJpc21hLmVtYmVkZGVkLnNvdXJjZVwiLFxuICAgICAgICAgICAgICAgIFwicHVuY3R1YXRpb24uZGVmaW5pdGlvbi50YWcucHJpc21hXCJcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICByZWdleDogL14oXFxzKikoZ2VuZXJhdG9yfGRhdGFzb3VyY2UpKFxccyspKFtBLVphLXpdW1xcd10qKShcXHMrKSh7KS8sXG4gICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInNvdXJjZS5wcmlzbWEuZW1iZWRkZWQuc291cmNlXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IC9cXHMqXFx9LyxcbiAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaW5jbHVkZTogXCIjdHJpcGxlX2NvbW1lbnRcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFwiI2RvdWJsZV9jb21tZW50XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiBcIiNhc3NpZ25tZW50XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwic291cmNlLnByaXNtYS5lbWJlZGRlZC5zb3VyY2VcIlxuICAgICAgICAgICAgfV1cbiAgICAgICAgfV0sXG4gICAgICAgIFwiI2Fzc2lnbm1lbnRcIjogW3tcbiAgICAgICAgICAgIHRva2VuOiBbXG4gICAgICAgICAgICAgICAgXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgXCJ2YXJpYWJsZS5vdGhlci5hc3NpZ25tZW50LnByaXNtYVwiLFxuICAgICAgICAgICAgICAgIFwidGV4dFwiLFxuICAgICAgICAgICAgICAgIFwia2V5d29yZC5vcGVyYXRvci50ZXJyYWZvcm1cIixcbiAgICAgICAgICAgICAgICBcInRleHRcIlxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHJlZ2V4OiAvXihcXHMqKShcXHcrKShcXHMqKSg9KShcXHMqKS8sXG4gICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICByZWdleDogLyQvLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiBcIiN2YWx1ZVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaW5jbHVkZTogXCIjZG91YmxlX2NvbW1lbnRfaW5saW5lXCJcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH1dLFxuICAgICAgICBcIiNmaWVsZF9kZWZpbml0aW9uXCI6IFt7XG4gICAgICAgICAgICB0b2tlbjogW1xuICAgICAgICAgICAgICAgIFwidGV4dFwiLFxuICAgICAgICAgICAgICAgIFwidmFyaWFibGUub3RoZXIuYXNzaWdubWVudC5wcmlzbWFcIixcbiAgICAgICAgICAgICAgICBcImludmFsaWQuaWxsZWdhbC5jb2xvbi5wcmlzbWFcIixcbiAgICAgICAgICAgICAgICBcInRleHRcIixcbiAgICAgICAgICAgICAgICBcInN1cHBvcnQudHlwZS5wcmltaXRpdmUucHJpc21hXCIsXG4gICAgICAgICAgICAgICAgXCJrZXl3b3JkLm9wZXJhdG9yLmxpc3RfdHlwZS5wcmlzbWFcIixcbiAgICAgICAgICAgICAgICBcImtleXdvcmQub3BlcmF0b3Iub3B0aW9uYWxfdHlwZS5wcmlzbWFcIixcbiAgICAgICAgICAgICAgICBcImludmFsaWQuaWxsZWdhbC5yZXF1aXJlZF90eXBlLnByaXNtYVwiXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgcmVnZXg6IC9eKFxccyopKFxcdyspKCg/Olxccyo6KT8pKFxccyspKFxcdyspKCg/OlxcW1xcXSk/KSgoPzpcXD8pPykoKD86XFwhKT8pL1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpbmNsdWRlOiBcIiNhdHRyaWJ1dGVfd2l0aF9hcmd1bWVudHNcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpbmNsdWRlOiBcIiNhdHRyaWJ1dGVcIlxuICAgICAgICB9XSxcbiAgICAgICAgXCIjdHlwZV9kZWZpbml0aW9uXCI6IFt7XG4gICAgICAgICAgICB0b2tlbjogW1xuICAgICAgICAgICAgICAgIFwidGV4dFwiLFxuICAgICAgICAgICAgICAgIFwic3RvcmFnZS50eXBlLnR5cGUucHJpc21hXCIsXG4gICAgICAgICAgICAgICAgXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgXCJlbnRpdHkubmFtZS50eXBlLnR5cGUucHJpc21hXCIsXG4gICAgICAgICAgICAgICAgXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgXCJzdXBwb3J0LnR5cGUucHJpbWl0aXZlLnByaXNtYVwiXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgcmVnZXg6IC9eKFxccyopKHR5cGUpKFxccyspKFxcdyspKFxccyo9XFxzKikoXFx3KykvXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGluY2x1ZGU6IFwiI2F0dHJpYnV0ZV93aXRoX2FyZ3VtZW50c1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGluY2x1ZGU6IFwiI2F0dHJpYnV0ZVwiXG4gICAgICAgIH1dLFxuICAgICAgICBcIiNlbnVtX3ZhbHVlX2RlZmluaXRpb25cIjogW3tcbiAgICAgICAgICAgIHRva2VuOiBbXG4gICAgICAgICAgICAgICAgXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgXCJ2YXJpYWJsZS5vdGhlci5hc3NpZ25tZW50LnByaXNtYVwiLFxuICAgICAgICAgICAgICAgIFwidGV4dFwiXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgcmVnZXg6IC9eKFxccyopKFxcdyspKFxccyokKS9cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaW5jbHVkZTogXCIjYXR0cmlidXRlX3dpdGhfYXJndW1lbnRzXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaW5jbHVkZTogXCIjYXR0cmlidXRlXCJcbiAgICAgICAgfV0sXG4gICAgICAgIFwiI2F0dHJpYnV0ZV93aXRoX2FyZ3VtZW50c1wiOiBbe1xuICAgICAgICAgICAgdG9rZW46IFtcbiAgICAgICAgICAgICAgICBcImVudGl0eS5uYW1lLmZ1bmN0aW9uLmF0dHJpYnV0ZS5wcmlzbWFcIixcbiAgICAgICAgICAgICAgICBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24udGFnLnByaXNtYVwiXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgcmVnZXg6IC8oQEA/W1xcd1xcLl0rKShcXCgpLyxcbiAgICAgICAgICAgIHB1c2g6IFt7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwicHVuY3R1YXRpb24uZGVmaW5pdGlvbi50YWcucHJpc21hXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IC9cXCkvLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiBcIiNuYW1lZF9hcmd1bWVudFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaW5jbHVkZTogXCIjdmFsdWVcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzb3VyY2UucHJpc21hLmF0dHJpYnV0ZS53aXRoX2FyZ3VtZW50c1wiXG4gICAgICAgICAgICB9XVxuICAgICAgICB9XSxcbiAgICAgICAgXCIjYXR0cmlidXRlXCI6IFt7XG4gICAgICAgICAgICB0b2tlbjogXCJlbnRpdHkubmFtZS5mdW5jdGlvbi5hdHRyaWJ1dGUucHJpc21hXCIsXG4gICAgICAgICAgICByZWdleDogL0BAP1tcXHdcXC5dKy9cbiAgICAgICAgfV0sXG4gICAgICAgIFwiI2FycmF5XCI6IFt7XG4gICAgICAgICAgICB0b2tlbjogXCJzb3VyY2UucHJpc21hLmFycmF5XCIsXG4gICAgICAgICAgICByZWdleDogL1xcWy8sXG4gICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInNvdXJjZS5wcmlzbWEuYXJyYXlcIixcbiAgICAgICAgICAgICAgICByZWdleDogL1xcXS8sXG4gICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFwiI3ZhbHVlXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwic291cmNlLnByaXNtYS5hcnJheVwiXG4gICAgICAgICAgICB9XVxuICAgICAgICB9XSxcbiAgICAgICAgXCIjdmFsdWVcIjogW3tcbiAgICAgICAgICAgIGluY2x1ZGU6IFwiI2FycmF5XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaW5jbHVkZTogXCIjZnVuY3Rpb25hbFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGluY2x1ZGU6IFwiI2xpdGVyYWxcIlxuICAgICAgICB9XSxcbiAgICAgICAgXCIjZnVuY3Rpb25hbFwiOiBbe1xuICAgICAgICAgICAgdG9rZW46IFtcbiAgICAgICAgICAgICAgICBcInN1cHBvcnQuZnVuY3Rpb24uZnVuY3Rpb25hbC5wcmlzbWFcIixcbiAgICAgICAgICAgICAgICBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24udGFnLnByaXNtYVwiXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgcmVnZXg6IC8oXFx3KykoXFwoKS8sXG4gICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24udGFnLnByaXNtYVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvXFwpLyxcbiAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaW5jbHVkZTogXCIjdmFsdWVcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzb3VyY2UucHJpc21hLmZ1bmN0aW9uYWxcIlxuICAgICAgICAgICAgfV1cbiAgICAgICAgfV0sXG4gICAgICAgIFwiI2xpdGVyYWxcIjogW3tcbiAgICAgICAgICAgIGluY2x1ZGU6IFwiI2Jvb2xlYW5cIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpbmNsdWRlOiBcIiNudW1iZXJcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpbmNsdWRlOiBcIiNkb3VibGVfcXVvdGVkX3N0cmluZ1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGluY2x1ZGU6IFwiI2lkZW50aWZpZXJcIlxuICAgICAgICB9XSxcbiAgICAgICAgXCIjaWRlbnRpZmllclwiOiBbe1xuICAgICAgICAgICAgdG9rZW46IFwic3VwcG9ydC5jb25zdGFudC5jb25zdGFudC5wcmlzbWFcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXFxiKD86XFx3KStcXGIvXG4gICAgICAgIH1dLFxuICAgICAgICBcIiNtYXBfa2V5XCI6IFt7XG4gICAgICAgICAgICB0b2tlbjogW1xuICAgICAgICAgICAgICAgIFwidmFyaWFibGUucGFyYW1ldGVyLmtleS5wcmlzbWFcIixcbiAgICAgICAgICAgICAgICBcInRleHRcIixcbiAgICAgICAgICAgICAgICBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24uc2VwYXJhdG9yLmtleS12YWx1ZS5wcmlzbWFcIixcbiAgICAgICAgICAgICAgICBcInRleHRcIlxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHJlZ2V4OiAvKFxcdyspKFxccyopKDopKFxccyopL1xuICAgICAgICB9XSxcbiAgICAgICAgXCIjbmFtZWRfYXJndW1lbnRcIjogW3tcbiAgICAgICAgICAgIGluY2x1ZGU6IFwiI21hcF9rZXlcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpbmNsdWRlOiBcIiN2YWx1ZVwiXG4gICAgICAgIH1dLFxuICAgICAgICBcIiN0cmlwbGVfY29tbWVudFwiOiBbe1xuICAgICAgICAgICAgdG9rZW46IFwiY29tbWVudC5wcmlzbWFcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXFwvXFwvXFwvLyxcbiAgICAgICAgICAgIHB1c2g6IFt7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwiY29tbWVudC5wcmlzbWFcIixcbiAgICAgICAgICAgICAgICByZWdleDogLyQvLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwiY29tbWVudC5wcmlzbWFcIlxuICAgICAgICAgICAgfV1cbiAgICAgICAgfV0sXG4gICAgICAgIFwiI2RvdWJsZV9jb21tZW50XCI6IFt7XG4gICAgICAgICAgICB0b2tlbjogXCJjb21tZW50LnByaXNtYVwiLFxuICAgICAgICAgICAgcmVnZXg6IC9cXC9cXC8vLFxuICAgICAgICAgICAgcHVzaDogW3tcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJjb21tZW50LnByaXNtYVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvJC8sXG4gICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJjb21tZW50LnByaXNtYVwiXG4gICAgICAgICAgICB9XVxuICAgICAgICB9XSxcbiAgICAgICAgXCIjZG91YmxlX2NvbW1lbnRfaW5saW5lXCI6IFt7XG4gICAgICAgICAgICB0b2tlbjogXCJjb21tZW50LnByaXNtYVwiLFxuICAgICAgICAgICAgcmVnZXg6IC9cXC9cXC9bXiRdKi9cbiAgICAgICAgfV0sXG4gICAgICAgIFwiI2Jvb2xlYW5cIjogW3tcbiAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lmxhbmd1YWdlLmJvb2xlYW4ucHJpc21hXCIsXG4gICAgICAgICAgICByZWdleDogL1xcYig/OnRydWV8ZmFsc2UpXFxiL1xuICAgICAgICB9XSxcbiAgICAgICAgXCIjbnVtYmVyXCI6IFt7XG4gICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5udW1lcmljLnByaXNtYVwiLFxuICAgICAgICAgICAgcmVnZXg6IC8oPzowKD86eHxYKVswLTlhLWZBLUZdKnwoPzpcXCt8LSk/XFxiKD86WzAtOV0rXFwuP1swLTldKnxcXC5bMC05XSspKD86KD86ZXxFKSg/OlxcK3wtKT9bMC05XSspPykoPzpbTGxGZlV1RGRnXXxVTHx1bCk/XFxiL1xuICAgICAgICB9XSxcbiAgICAgICAgXCIjZG91YmxlX3F1b3RlZF9zdHJpbmdcIjogW3tcbiAgICAgICAgICAgIHRva2VuOiBcInN0cmluZy5xdW90ZWQuZG91YmxlLnN0YXJ0LnByaXNtYVwiLFxuICAgICAgICAgICAgcmVnZXg6IC9cIi8sXG4gICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInN0cmluZy5xdW90ZWQuZG91YmxlLmVuZC5wcmlzbWFcIixcbiAgICAgICAgICAgICAgICByZWdleDogL1wiLyxcbiAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaW5jbHVkZTogXCIjc3RyaW5nX2ludGVycG9sYXRpb25cIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInN0cmluZy5xdW90ZWQuZG91YmxlLnByaXNtYVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvW1xcd1xcLVxcL1xcLl9cXFxcJUA6XFw/PV0rL1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJ1bm5hbWVkXCJcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH1dLFxuICAgICAgICBcIiNzdHJpbmdfaW50ZXJwb2xhdGlvblwiOiBbe1xuICAgICAgICAgICAgdG9rZW46IFwia2V5d29yZC5jb250cm9sLmludGVycG9sYXRpb24uc3RhcnQucHJpc21hXCIsXG4gICAgICAgICAgICByZWdleDogL1xcJFxcey8sXG4gICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuOiBcImtleXdvcmQuY29udHJvbC5pbnRlcnBvbGF0aW9uLmVuZC5wcmlzbWFcIixcbiAgICAgICAgICAgICAgICByZWdleDogL1xccypcXH0vLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiBcIiN2YWx1ZVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInNvdXJjZS50YWcuZW1iZWRkZWQuc291cmNlLnByaXNtYVwiXG4gICAgICAgICAgICB9XVxuICAgICAgICB9XVxuICAgIH07XG4gICAgXG4gICAgdGhpcy5ub3JtYWxpemVSdWxlcygpO1xufTtcblxuUHJpc21hSGlnaGxpZ2h0UnVsZXMubWV0YURhdGEgPSB7XG4gICAgbmFtZTogXCJQcmlzbWFcIixcbiAgICBzY29wZU5hbWU6IFwic291cmNlLnByaXNtYVwiXG59O1xuXG5cbm9vcC5pbmhlcml0cyhQcmlzbWFIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuZXhwb3J0cy5QcmlzbWFIaWdobGlnaHRSdWxlcyA9IFByaXNtYUhpZ2hsaWdodFJ1bGVzO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9