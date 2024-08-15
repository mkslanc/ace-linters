"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[2181],{

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

/***/ 52181:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var ZigHighlightRules = (__webpack_require__(79026)/* .ZigHighlightRules */ .c);
var FoldMode = (__webpack_require__(93887)/* .FoldMode */ .l);

var Mode = function() {
    this.HighlightRules = ZigHighlightRules;
    this.foldingRules = new FoldMode();
    this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, TextMode);

(function() {
    this.lineCommentStart = "//";
    this.$id = "ace/mode/zig";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 79026:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

var ZigHighlightRules = function() {
    this.$rules = {
        start: [{
            include: "#dummy_main"
        }],
        "#block": [{
            token: [
                "storage.type.zig",
                "text",
                "punctuation.section.braces.begin.zig"
            ],
            regex: /((?:[a-zA-Z_][\w.]*|@\".+\")?)(\s*)(\{)/,
            push: [{
                token: "punctuation.section.braces.end.zig",
                regex: /\}/,
                next: "pop"
            }, {
                include: "#dummy_main"
            }]
        }],
        "#character_escapes": [{
            token: "constant.character.escape.newline.zig",
            regex: /\\n/
        }, {
            token: "constant.character.escape.carrigereturn.zig",
            regex: /\\r/
        }, {
            token: "constant.character.escape.tabulator.zig",
            regex: /\\t/
        }, {
            token: "constant.character.escape.backslash.zig",
            regex: /\\\\/
        }, {
            token: "constant.character.escape.single-quote.zig",
            regex: /\\'/
        }, {
            token: "constant.character.escape.double-quote.zig",
            regex: /\\\"/
        }, {
            token: "constant.character.escape.hexidecimal.zig",
            regex: /\\x[a-fA-F\d]{2}/
        }, {
            token: "constant.character.escape.hexidecimal.zig",
            regex: /\\u\{[a-fA-F\d]{1,6}\}/
        }],
        "#comments": [{
            token: "comment.line.documentation.zig",
            regex: /\/\/[!\/](?=[^\/])/,
            push: [{
                token: "comment.line.documentation.zig",
                regex: /$/,
                next: "pop"
            }, {
                include: "#commentContents"
            }, {
                defaultToken: "comment.line.documentation.zig"
            }]
        }, {
            token: "comment.line.double-slash.zig",
            regex: /\/\//,
            push: [{
                token: "comment.line.double-slash.zig",
                regex: /$/,
                next: "pop"
            }, {
                include: "#commentContents"
            }, {
                defaultToken: "comment.line.double-slash.zig"
            }]
        }],
        "#commentContents": [{
            token: "keyword.todo.zig",
            regex: /\b(?:TODO|FIXME|XXX|NOTE)\b:?/
        }],
        "#constants": [{
            token: "constant.language.zig",
            regex: /\b(?:null|undefined|true|false)\b/
        }, {
            token: "constant.numeric.integer.zig",
            regex: /\b(?!\.)-?[\d_]+(?!\.)\b/
        }, {
            token: "constant.numeric.integer.hexadecimal.zig",
            regex: /\b(?!\.)0x[a-fA-F\d_]+(?!\.)\b/
        }, {
            token: "constant.numeric.integer.octal.zig",
            regex: /\b(?!\.)0o[0-7_]+(?!\.)\b/
        }, {
            token: "constant.numeric.integer.binary.zig",
            regex: /\b(?!\.)0b[01_]+(?!\.)\b/
        }, {
            token: "constant.numeric.float.zig",
            regex: /(?!\.)-?\b[\d_]+(?:\.[\d_]+)?(?:[eE][+-]?[\d_]+)?(?!\.)\b/
        }, {
            token: "constant.numeric.float.hexadecimal.zig",
            regex: /(?!\.)-?\b0x[a-fA-F\d_]+(?:\.[a-fA-F\d_]+)?[pP]?(?:[+-]?[\d_]+)?(?!\.)\b/
        }],
        "#container_decl": [{
            token: "entity.name.union.zig",
            regex: /\b(?!\d)(?:[a-zA-Z_]\w*|@\".+\")?(?=\s*=\s*(?:extern|packed)?\b\s*union\s*[(\{])/
        }, {
            token: "entity.name.struct.zig",
            regex: /\b(?!\d)(?:[a-zA-Z_]\w*|@\".+\")?(?=\s*=\s*(?:extern|packed)?\b\s*struct\s*[(\{])/
        }, {
            token: "entity.name.enum.zig",
            regex: /\b(?!\d)(?:[a-zA-Z_]\w*|@\".+\")?(?=\s*=\s*(?:extern|packed)?\b\s*enum\s*[(\{])/
        }, {
            token: "entity.name.error.zig",
            regex: /\b(?!\d)(?:[a-zA-Z_]\w*|@\".+\")?(?=\s*=\s*error\s*[(\{])/
        }, {
            token: [
                "storage.type.error.zig",
                "punctuation.accessor.zig",
                "entity.name.error.zig"
            ],
            regex: /\b(error)(\.)([a-zA-Z_]\w*|@\".+\")/
        }],
        "#dummy_main": [{
            include: "#label"
        }, {
            include: "#function_type"
        }, {
            include: "#function_def"
        }, {
            include: "#punctuation"
        }, {
            include: "#storage_modifier"
        }, {
            include: "#container_decl"
        }, {
            include: "#constants"
        }, {
            include: "#comments"
        }, {
            include: "#strings"
        }, {
            include: "#storage"
        }, {
            include: "#keywords"
        }, {
            include: "#operators"
        }, {
            include: "#support"
        }, {
            include: "#field_decl"
        }, {
            include: "#block"
        }, {
            include: "#function_call"
        }, {
            include: "#enum_literal"
        }, {
            include: "#variables"
        }],
        "#enum_literal": [{
            token: "constant.language.enum",
            regex: /(?!\w|\)|\?|\}|\]|\*|\.)\.(?:[a-zA-Z_]\w*\b|@\"[^\"]*\")(?!\(|\s*=[^=>])/
        }],
        "#field_decl": [{
            token: [
                "variable.other.member.zig",
                "text",
                "punctuation.separator.zig",
                "text"
            ],
            regex: /([a-zA-Z_]\w*|@\".+\")(\s*)(:)(\s*)/,
            push: [{
                token: [
                    "storage.type.zig",
                    "text",
                    "punctuation.separator.zig",
                    "keyword.operator.assignment.zig"
                ],
                regex: /((?:[a-zA-Z_][\w.]*|@\".+\")?)(\s*)(?:(,)|(=)|$)/,
                next: "pop"
            }, {
                include: "#dummy_main"
            }]
        }],
        "#function_call": [{
            token: "variable.function.zig",
            regex: /\b(?!fn)(?:[a-zA-Z_]\w*|@\".+\")(?=\s*\()/
        }],
        "#keywords": [{
            token: "keyword.control.zig",
            regex: /\b(?:while|for|break|return|continue|asm|defer|errdefer|unreachable)\b/
        }, {
            token: "keyword.control.async.zig",
            regex: /\b(?:async|await|suspend|nosuspend|resume)\b/
        }, {
            token: "keyword.control.conditional.zig",
            regex: /\b(?:if|else|switch|try|catch|orelse)\b/
        }, {
            token: "keyword.control.import.zig",
            regex: /\b(?!\w)(?:@import|@cImport|@cInclude)\b/
        }, {
            token: "keyword.other.usingnamespace.zig",
            regex: /\busingnamespace\b/
        }],
        "#label": [{
            token: [
                "keyword.control.zig",
                "text",
                "entity.name.label.zig",
                "entity.name.label.zig"
            ],
            regex: /\b(break|continue)(\s*:\s*)([a-zA-Z_]\w*|@\".+\")\b|\b(?!\d)([a-zA-Z_]\w*|@\".+\")\b(?=\s*:\s*(?:\{|while\b))/
        }],
        "#operators": [{
            token: "keyword.operator.zig",
            regex: /\b!\b/
        }, {
            token: "keyword.operator.logical.zig",
            regex: /==|(?:!|>|<)=?/
        }, {
            token: "keyword.operator.word.zig",
            regex: /\b(?:and|or)\b/
        }, {
            token: "keyword.operator.assignment.zig",
            regex: /(?:(?:\+|-|\*)\%?|\/|%|<<|>>|&|\|(?=[^\|])|\^)?=/
        }, {
            token: "keyword.operator.arithmetic.zig",
            regex: /(?:\+|-|\*)\%?|\/(?!\/)|%/
        }, {
            token: "keyword.operator.bitwise.zig",
            regex: /<<|>>|&(?=[a-zA-Z_]|@\")|\|(?=[^\|])|\^|~/
        }, {
            token: "keyword.operator.other.zig",
            regex: /\+\+|\*\*|->|\.\?|\.\*|&(?=[a-zA-Z_]|@\")|\?|\|\||\.{2,3}/
        }],
        "#param_list": [{
            token: [
                "variable.parameter.zig",
                "text",
                "punctuation.separator.zig",
                "text"
            ],
            regex: /([a-zA-Z_]\w*|@\".+\")(\s*)(:)(\s*)/,
            push: [{
                token: [
                    "storage.type.zig",
                    "text",
                    "punctuation.separator.zig",
                    "punctuation.section.parens.end.zig"
                ],
                regex: /((?:[a-zA-Z_][\w.]*|@\".+\")?)(\s*)(?:(,)|(\)))/,
                next: "pop"
            }, {
                include: "#dummy_main"
            }, {
                token: "storage.type.zig",
                regex: /[a-zA-Z_][\w.]*|@\".+\"/
            }]
        }],
        "#punctuation": [{
            token: "punctuation.separator.zig",
            regex: /,/
        }, {
            token: "punctuation.terminator.zig",
            regex: /;/
        }, {
            token: "punctuation.section.parens.begin.zig",
            regex: /\(/
        }, {
            token: "punctuation.section.parens.end.zig",
            regex: /\)/
        }],
        "#storage": [{
            token: "storage.type.zig",
            regex: /\b(?:bool|void|noreturn|type|anyerror|anytype)\b/
        }, {
            token: "storage.type.integer.zig",
            regex: /\b(?!\.)(?:[iu]\d+|[iu]size|comptime_int)\b/
        }, {
            token: "storage.type.float.zig",
            regex: /\b(?:f16|f32|f64|f128|comptime_float)\b/
        }, {
            token: "storage.type.c_compat.zig",
            regex: /\b(?:c_short|c_ushort|c_int|c_uint|c_long|c_ulong|c_longlong|c_ulonglong|c_longdouble|c_void)\b/
        }, {
            token: [
                "storage.type.zig",
                "text",
                "keyword.operator.zig",
                "text",
                "storage.type.zig"
            ],
            regex: /\b(anyframe)\b(\s*)((?:->)?)(\s*)(?:([a-zA-Z_][\w.]*|@\".+\")\b(?!\s*\())?/
        }, {
            token: "storage.type.function.zig",
            regex: /\bfn\b/
        }, {
            token: "storage.type.test.zig",
            regex: /\btest\b/
        }, {
            token: "storage.type.struct.zig",
            regex: /\bstruct\b/
        }, {
            token: "storage.type.enum.zig",
            regex: /\benum\b/
        }, {
            token: "storage.type.union.zig",
            regex: /\bunion\b/
        }, {
            token: "storage.type.error.zig",
            regex: /\berror\b/
        }],
        "#storage_modifier": [{
            token: "storage.modifier.zig",
            regex: /\b(?:const|var|extern|packed|export|pub|noalias|inline|noinline|comptime|volatile|align|linksection|threadlocal|allowzero)\b/
        }],
        "#strings": [{
            token: "string.quoted.single.zig",
            regex: /\'/,
            push: [{
                token: "string.quoted.single.zig",
                regex: /\'/,
                next: "pop"
            }, {
                include: "#character_escapes"
            }, {
                token: "invalid.illegal.character.zig",
                regex: /\\[^\'][^\']*?/
            }, {
                defaultToken: "string.quoted.single.zig"
            }]
        }, {
            token: "string.quoted.double.zig",
            regex: /c?\"/,
            push: [{
                token: "string.quoted.double.zig",
                regex: /\"/,
                next: "pop"
            }, {
                include: "#character_escapes"
            }, {
                token: "invalid.illegal.character.zig",
                regex: /\\[^\'][^\']*?/
            }, {
                defaultToken: "string.quoted.double.zig"
            }]
        }, {
            token: "string.quoted.other.zig",
            regex: /c?\\\\/,
            push: [{
                token: "string.quoted.other.zig",
                regex: /$/,
                next: "pop"
            }, {
                defaultToken: "string.quoted.other.zig"
            }]
        }],  
        "#function_type": [{
            token: [
                "storage.type.function.zig",
                "text",
                "punctuation.section.parens.begin.zig"
            ],
            regex: /\b(fn)(\s*)(\()/,
            push: [{
                token: [
                    "text",
                    "storage.type.zig",
                    "text",
                    "keyword.operator.zig",
                    "text",
                    "storage.type.zig"
                ],
                regex: /(\s*)(?:([a-zA-Z_]\w*|@\".+\"))?(\s*)((?:!)?)(\s*)([a-zA-Z_]\w*|@\".+\")/,
                next: "pop"
            }, {
                include: "#label"
            }, {
                include: "#param_list"
            }, {
                token: "storage.type.zig",
                regex: /[a-zA-Z_]\w*|@\".+\"/
            }, {
                include: "#dummy_main"
            }, {
                defaultToken: "meta.function.parameters.zig"
            }]
        }],
        "#function_def": [{
            token: [
                "text",
                "entity.name.function",
                "punctuation.section.parens.begin.zig"
            ],
            regex: /(?=fn\s+)(\s+)([a-zA-Z_]\w*|@\".+\")(\()/,
            push: [{
                token: [
                    "text",
                    "storage.type.zig",
                    "keyword.operator.zig",
                    "text",
                    "storage.type.zig"
                ],
                regex: /(\s*)((?:[a-zA-Z_][\w.]*|@\".+\")?)((?:!)?)(\s*)(?:([a-zA-Z_][\w.]*|@\".+\")?)/,
                next: "pop"
            }, {
                include: "#label"
            }, {
                include: "#param_list"
            }, {
                token: "storage.type.zig",
                regex: /[a-zA-Z_][\w.]*|@\".+\"/
            }, {
                include: "#dummy_main"
            }]
        }],
        "#support": [{
            token: "support.function.zig",
            regex: /\b@(?!\w|\"|[0-9])[a-zA-Z_]\w*\b/
        }],
        "#variables": [{
            token: "variable.constant.zig",
            regex: /\b[_A-Z][_A-Z0-9]+\b/
        }, {
            token: "entity.name.type.zig",
            regex: /\b[_a-zA-Z][_a-zA-Z0-9]*_t\b/
        }, {
            token: "entity.name.type.zig",
            regex: /\b[A-Z][a-zA-Z0-9]*\b/
        }, {
            token: "variable.zig",
            regex: /\b[_a-zA-Z][_a-zA-Z0-9]*\b/
        }]
    };
    
    this.normalizeRules();
};

ZigHighlightRules.metaData = {
    fileTypes: ["zig"],
    keyEquivalent: "^~Z",
    name: "Zig",
    scopeName: "source.zig"
};


oop.inherits(ZigHighlightRules, TextHighlightRules);

exports.c = ZigHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLHlFQUF5RSxJQUFJO0FBQzdFLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLHFCQUFxQjtBQUNyQixTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUEsU0FBeUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2ZvbGRpbmcvY3N0eWxlLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvemlnLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvemlnX2hpZ2hsaWdodF9ydWxlcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi8uLi9saWIvb29wXCIpO1xudmFyIFJhbmdlID0gcmVxdWlyZShcIi4uLy4uL3JhbmdlXCIpLlJhbmdlO1xudmFyIEJhc2VGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRfbW9kZVwiKS5Gb2xkTW9kZTtcblxudmFyIEZvbGRNb2RlID0gZXhwb3J0cy5Gb2xkTW9kZSA9IGZ1bmN0aW9uKGNvbW1lbnRSZWdleCkge1xuICAgIGlmIChjb21tZW50UmVnZXgpIHtcbiAgICAgICAgdGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIgPSBuZXcgUmVnRXhwKFxuICAgICAgICAgICAgdGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIuc291cmNlLnJlcGxhY2UoL1xcfFtefF0qPyQvLCBcInxcIiArIGNvbW1lbnRSZWdleC5zdGFydClcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5mb2xkaW5nU3RvcE1hcmtlciA9IG5ldyBSZWdFeHAoXG4gICAgICAgICAgICB0aGlzLmZvbGRpbmdTdG9wTWFya2VyLnNvdXJjZS5yZXBsYWNlKC9cXHxbXnxdKj8kLywgXCJ8XCIgKyBjb21tZW50UmVnZXguZW5kKVxuICAgICAgICApO1xuICAgIH1cbn07XG5vb3AuaW5oZXJpdHMoRm9sZE1vZGUsIEJhc2VGb2xkTW9kZSk7XG5cbihmdW5jdGlvbigpIHtcbiAgICBcbiAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlciA9IC8oW1xce1xcW1xcKF0pW15cXH1cXF1cXCldKiR8XlxccyooXFwvXFwqKS87XG4gICAgdGhpcy5mb2xkaW5nU3RvcE1hcmtlciA9IC9eW15cXFtcXHtcXChdKihbXFx9XFxdXFwpXSl8XltcXHNcXCpdKihcXCpcXC8pLztcbiAgICB0aGlzLnNpbmdsZUxpbmVCbG9ja0NvbW1lbnRSZT0gL15cXHMqKFxcL1xcKikuKlxcKlxcL1xccyokLztcbiAgICB0aGlzLnRyaXBsZVN0YXJCbG9ja0NvbW1lbnRSZSA9IC9eXFxzKihcXC9cXCpcXCpcXCopLipcXCpcXC9cXHMqJC87XG4gICAgdGhpcy5zdGFydFJlZ2lvblJlID0gL15cXHMqKFxcL1xcKnxcXC9cXC8pIz9yZWdpb25cXGIvO1xuICAgIFxuICAgIC8vcHJldmVudCBuYW1pbmcgY29uZmxpY3Qgd2l0aCBhbnkgbW9kZXMgdGhhdCBpbmhlcml0IGZyb20gY3N0eWxlIGFuZCBvdmVycmlkZSB0aGlzIChsaWtlIGNzaGFycClcbiAgICB0aGlzLl9nZXRGb2xkV2lkZ2V0QmFzZSA9IHRoaXMuZ2V0Rm9sZFdpZGdldDtcbiAgICBcbiAgICAvKipcbiAgICAgKiBHZXRzIGZvbGQgd2lkZ2V0IHdpdGggc29tZSBub24tc3RhbmRhcmQgZXh0cmFzOlxuICAgICAqXG4gICAgICogQGV4YW1wbGUgbGluZUNvbW1lbnRSZWdpb25TdGFydFxuICAgICAqICAgICAgLy8jcmVnaW9uIFtvcHRpb25hbCBkZXNjcmlwdGlvbl1cbiAgICAgKlxuICAgICAqIEBleGFtcGxlIGJsb2NrQ29tbWVudFJlZ2lvblN0YXJ0XG4gICAgICogICAgICAvKiNyZWdpb24gW29wdGlvbmFsIGRlc2NyaXB0aW9uXSAqWy9dXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSB0cmlwbGVTdGFyRm9sZGluZ1NlY3Rpb25cbiAgICAgKiAgICAgIC8qKiogdGhpcyBmb2xkcyBldmVuIHRob3VnaCAxIGxpbmUgYmVjYXVzZSBpdCBoYXMgMyBzdGFycyAqKipbL11cbiAgICAgKiBcbiAgICAgKiBAbm90ZSB0aGUgcG91bmQgc3ltYm9sIGZvciByZWdpb24gdGFncyBpcyBvcHRpb25hbFxuICAgICAqL1xuICAgIHRoaXMuZ2V0Rm9sZFdpZGdldCA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgXG4gICAgICAgIGlmICh0aGlzLnNpbmdsZUxpbmVCbG9ja0NvbW1lbnRSZS50ZXN0KGxpbmUpKSB7XG4gICAgICAgICAgICAvLyBObyB3aWRnZXQgZm9yIHNpbmdsZSBsaW5lIGJsb2NrIGNvbW1lbnQgdW5sZXNzIHJlZ2lvbiBvciB0cmlwbGUgc3RhclxuICAgICAgICAgICAgaWYgKCF0aGlzLnN0YXJ0UmVnaW9uUmUudGVzdChsaW5lKSAmJiAhdGhpcy50cmlwbGVTdGFyQmxvY2tDb21tZW50UmUudGVzdChsaW5lKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICB2YXIgZncgPSB0aGlzLl9nZXRGb2xkV2lkZ2V0QmFzZShzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdyk7XG4gICAgXG4gICAgICAgIGlmICghZncgJiYgdGhpcy5zdGFydFJlZ2lvblJlLnRlc3QobGluZSkpXG4gICAgICAgICAgICByZXR1cm4gXCJzdGFydFwiOyAvLyBsaW5lQ29tbWVudFJlZ2lvblN0YXJ0XG4gICAgXG4gICAgICAgIHJldHVybiBmdztcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0UmFuZ2UgPSBmdW5jdGlvbihzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdywgZm9yY2VNdWx0aWxpbmUpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLnN0YXJ0UmVnaW9uUmUudGVzdChsaW5lKSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldENvbW1lbnRSZWdpb25CbG9jayhzZXNzaW9uLCBsaW5lLCByb3cpO1xuICAgICAgICBcbiAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCh0aGlzLmZvbGRpbmdTdGFydE1hcmtlcik7XG4gICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgdmFyIGkgPSBtYXRjaC5pbmRleDtcblxuICAgICAgICAgICAgaWYgKG1hdGNoWzFdKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm9wZW5pbmdCcmFja2V0QmxvY2soc2Vzc2lvbiwgbWF0Y2hbMV0sIHJvdywgaSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgcmFuZ2UgPSBzZXNzaW9uLmdldENvbW1lbnRGb2xkUmFuZ2Uocm93LCBpICsgbWF0Y2hbMF0ubGVuZ3RoLCAxKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHJhbmdlICYmICFyYW5nZS5pc011bHRpTGluZSgpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZvcmNlTXVsdGlsaW5lKSB7XG4gICAgICAgICAgICAgICAgICAgIHJhbmdlID0gdGhpcy5nZXRTZWN0aW9uUmFuZ2Uoc2Vzc2lvbiwgcm93KTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZvbGRTdHlsZSAhPSBcImFsbFwiKVxuICAgICAgICAgICAgICAgICAgICByYW5nZSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiByYW5nZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmb2xkU3R5bGUgPT09IFwibWFya2JlZ2luXCIpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCh0aGlzLmZvbGRpbmdTdG9wTWFya2VyKTtcbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICB2YXIgaSA9IG1hdGNoLmluZGV4ICsgbWF0Y2hbMF0ubGVuZ3RoO1xuXG4gICAgICAgICAgICBpZiAobWF0Y2hbMV0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2xvc2luZ0JyYWNrZXRCbG9jayhzZXNzaW9uLCBtYXRjaFsxXSwgcm93LCBpKTtcblxuICAgICAgICAgICAgcmV0dXJuIHNlc3Npb24uZ2V0Q29tbWVudEZvbGRSYW5nZShyb3csIGksIC0xKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgXG4gICAgdGhpcy5nZXRTZWN0aW9uUmFuZ2UgPSBmdW5jdGlvbihzZXNzaW9uLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgdmFyIHN0YXJ0SW5kZW50ID0gbGluZS5zZWFyY2goL1xcUy8pO1xuICAgICAgICB2YXIgc3RhcnRSb3cgPSByb3c7XG4gICAgICAgIHZhciBzdGFydENvbHVtbiA9IGxpbmUubGVuZ3RoO1xuICAgICAgICByb3cgPSByb3cgKyAxO1xuICAgICAgICB2YXIgZW5kUm93ID0gcm93O1xuICAgICAgICB2YXIgbWF4Um93ID0gc2Vzc2lvbi5nZXRMZW5ndGgoKTtcbiAgICAgICAgd2hpbGUgKCsrcm93IDwgbWF4Um93KSB7XG4gICAgICAgICAgICBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgICAgICB2YXIgaW5kZW50ID0gbGluZS5zZWFyY2goL1xcUy8pO1xuICAgICAgICAgICAgaWYgKGluZGVudCA9PT0gLTEpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICBpZiAgKHN0YXJ0SW5kZW50ID4gaW5kZW50KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgdmFyIHN1YlJhbmdlID0gdGhpcy5nZXRGb2xkV2lkZ2V0UmFuZ2Uoc2Vzc2lvbiwgXCJhbGxcIiwgcm93KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHN1YlJhbmdlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN1YlJhbmdlLnN0YXJ0LnJvdyA8PSBzdGFydFJvdykge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN1YlJhbmdlLmlzTXVsdGlMaW5lKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcm93ID0gc3ViUmFuZ2UuZW5kLnJvdztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXJ0SW5kZW50ID09IGluZGVudCkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbmRSb3cgPSByb3c7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBuZXcgUmFuZ2Uoc3RhcnRSb3csIHN0YXJ0Q29sdW1uLCBlbmRSb3csIHNlc3Npb24uZ2V0TGluZShlbmRSb3cpLmxlbmd0aCk7XG4gICAgfTtcbiAgICBcbiAgICAvKipcbiAgICAgKiBnZXRzIGNvbW1lbnQgcmVnaW9uIGJsb2NrIHdpdGggZW5kIHJlZ2lvbiBhc3N1bWVkIHRvIGJlIHN0YXJ0IG9mIGNvbW1lbnQgaW4gYW55IGNzdHlsZSBtb2RlIG9yIFNRTCBtb2RlICgtLSkgd2hpY2ggaW5oZXJpdHMgZnJvbSB0aGlzLlxuICAgICAqIFRoZXJlIG1heSBvcHRpb25hbGx5IGJlIGEgcG91bmQgc3ltYm9sIGJlZm9yZSB0aGUgcmVnaW9uL2VuZHJlZ2lvbiBzdGF0ZW1lbnRcbiAgICAgKi9cbiAgICB0aGlzLmdldENvbW1lbnRSZWdpb25CbG9jayA9IGZ1bmN0aW9uKHNlc3Npb24sIGxpbmUsIHJvdykge1xuICAgICAgICB2YXIgc3RhcnRDb2x1bW4gPSBsaW5lLnNlYXJjaCgvXFxzKiQvKTtcbiAgICAgICAgdmFyIG1heFJvdyA9IHNlc3Npb24uZ2V0TGVuZ3RoKCk7XG4gICAgICAgIHZhciBzdGFydFJvdyA9IHJvdztcbiAgICAgICAgXG4gICAgICAgIHZhciByZSA9IC9eXFxzKig/OlxcL1xcKnxcXC9cXC98LS0pIz8oZW5kKT9yZWdpb25cXGIvO1xuICAgICAgICB2YXIgZGVwdGggPSAxO1xuICAgICAgICB3aGlsZSAoKytyb3cgPCBtYXhSb3cpIHtcbiAgICAgICAgICAgIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgICAgIHZhciBtID0gcmUuZXhlYyhsaW5lKTtcbiAgICAgICAgICAgIGlmICghbSkgY29udGludWU7XG4gICAgICAgICAgICBpZiAobVsxXSkgZGVwdGgtLTtcbiAgICAgICAgICAgIGVsc2UgZGVwdGgrKztcblxuICAgICAgICAgICAgaWYgKCFkZXB0aCkgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZW5kUm93ID0gcm93O1xuICAgICAgICBpZiAoZW5kUm93ID4gc3RhcnRSb3cpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmFuZ2Uoc3RhcnRSb3csIHN0YXJ0Q29sdW1uLCBlbmRSb3csIGxpbmUubGVuZ3RoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbn0pLmNhbGwoRm9sZE1vZGUucHJvdG90eXBlKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dE1vZGUgPSByZXF1aXJlKFwiLi90ZXh0XCIpLk1vZGU7XG52YXIgWmlnSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi96aWdfaGlnaGxpZ2h0X3J1bGVzXCIpLlppZ0hpZ2hsaWdodFJ1bGVzO1xudmFyIEZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZGluZy9jc3R5bGVcIikuRm9sZE1vZGU7XG5cbnZhciBNb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5IaWdobGlnaHRSdWxlcyA9IFppZ0hpZ2hsaWdodFJ1bGVzO1xuICAgIHRoaXMuZm9sZGluZ1J1bGVzID0gbmV3IEZvbGRNb2RlKCk7XG4gICAgdGhpcy4kYmVoYXZpb3VyID0gdGhpcy4kZGVmYXVsdEJlaGF2aW91cjtcbn07XG5vb3AuaW5oZXJpdHMoTW9kZSwgVGV4dE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5saW5lQ29tbWVudFN0YXJ0ID0gXCIvL1wiO1xuICAgIHRoaXMuJGlkID0gXCJhY2UvbW9kZS96aWdcIjtcbn0pLmNhbGwoTW9kZS5wcm90b3R5cGUpO1xuXG5leHBvcnRzLk1vZGUgPSBNb2RlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90ZXh0X2hpZ2hsaWdodF9ydWxlc1wiKS5UZXh0SGlnaGxpZ2h0UnVsZXM7XG5cbnZhciBaaWdIaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuJHJ1bGVzID0ge1xuICAgICAgICBzdGFydDogW3tcbiAgICAgICAgICAgIGluY2x1ZGU6IFwiI2R1bW15X21haW5cIlxuICAgICAgICB9XSxcbiAgICAgICAgXCIjYmxvY2tcIjogW3tcbiAgICAgICAgICAgIHRva2VuOiBbXG4gICAgICAgICAgICAgICAgXCJzdG9yYWdlLnR5cGUuemlnXCIsXG4gICAgICAgICAgICAgICAgXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgXCJwdW5jdHVhdGlvbi5zZWN0aW9uLmJyYWNlcy5iZWdpbi56aWdcIlxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHJlZ2V4OiAvKCg/OlthLXpBLVpfXVtcXHcuXSp8QFxcXCIuK1xcXCIpPykoXFxzKikoXFx7KS8sXG4gICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInB1bmN0dWF0aW9uLnNlY3Rpb24uYnJhY2VzLmVuZC56aWdcIixcbiAgICAgICAgICAgICAgICByZWdleDogL1xcfS8sXG4gICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFwiI2R1bW15X21haW5cIlxuICAgICAgICAgICAgfV1cbiAgICAgICAgfV0sXG4gICAgICAgIFwiI2NoYXJhY3Rlcl9lc2NhcGVzXCI6IFt7XG4gICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5jaGFyYWN0ZXIuZXNjYXBlLm5ld2xpbmUuemlnXCIsXG4gICAgICAgICAgICByZWdleDogL1xcXFxuL1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5jaGFyYWN0ZXIuZXNjYXBlLmNhcnJpZ2VyZXR1cm4uemlnXCIsXG4gICAgICAgICAgICByZWdleDogL1xcXFxyL1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5jaGFyYWN0ZXIuZXNjYXBlLnRhYnVsYXRvci56aWdcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXFxcXHQvXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50LmNoYXJhY3Rlci5lc2NhcGUuYmFja3NsYXNoLnppZ1wiLFxuICAgICAgICAgICAgcmVnZXg6IC9cXFxcXFxcXC9cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQuY2hhcmFjdGVyLmVzY2FwZS5zaW5nbGUtcXVvdGUuemlnXCIsXG4gICAgICAgICAgICByZWdleDogL1xcXFwnL1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5jaGFyYWN0ZXIuZXNjYXBlLmRvdWJsZS1xdW90ZS56aWdcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXFxcXFxcXCIvXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50LmNoYXJhY3Rlci5lc2NhcGUuaGV4aWRlY2ltYWwuemlnXCIsXG4gICAgICAgICAgICByZWdleDogL1xcXFx4W2EtZkEtRlxcZF17Mn0vXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50LmNoYXJhY3Rlci5lc2NhcGUuaGV4aWRlY2ltYWwuemlnXCIsXG4gICAgICAgICAgICByZWdleDogL1xcXFx1XFx7W2EtZkEtRlxcZF17MSw2fVxcfS9cbiAgICAgICAgfV0sXG4gICAgICAgIFwiI2NvbW1lbnRzXCI6IFt7XG4gICAgICAgICAgICB0b2tlbjogXCJjb21tZW50LmxpbmUuZG9jdW1lbnRhdGlvbi56aWdcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXFwvXFwvWyFcXC9dKD89W15cXC9dKS8sXG4gICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuOiBcImNvbW1lbnQubGluZS5kb2N1bWVudGF0aW9uLnppZ1wiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvJC8sXG4gICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFwiI2NvbW1lbnRDb250ZW50c1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcImNvbW1lbnQubGluZS5kb2N1bWVudGF0aW9uLnppZ1wiXG4gICAgICAgICAgICB9XVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJjb21tZW50LmxpbmUuZG91YmxlLXNsYXNoLnppZ1wiLFxuICAgICAgICAgICAgcmVnZXg6IC9cXC9cXC8vLFxuICAgICAgICAgICAgcHVzaDogW3tcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJjb21tZW50LmxpbmUuZG91YmxlLXNsYXNoLnppZ1wiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvJC8sXG4gICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFwiI2NvbW1lbnRDb250ZW50c1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcImNvbW1lbnQubGluZS5kb3VibGUtc2xhc2guemlnXCJcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH1dLFxuICAgICAgICBcIiNjb21tZW50Q29udGVudHNcIjogW3tcbiAgICAgICAgICAgIHRva2VuOiBcImtleXdvcmQudG9kby56aWdcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXFxiKD86VE9ET3xGSVhNRXxYWFh8Tk9URSlcXGI6Py9cbiAgICAgICAgfV0sXG4gICAgICAgIFwiI2NvbnN0YW50c1wiOiBbe1xuICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQubGFuZ3VhZ2UuemlnXCIsXG4gICAgICAgICAgICByZWdleDogL1xcYig/Om51bGx8dW5kZWZpbmVkfHRydWV8ZmFsc2UpXFxiL1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5udW1lcmljLmludGVnZXIuemlnXCIsXG4gICAgICAgICAgICByZWdleDogL1xcYig/IVxcLiktP1tcXGRfXSsoPyFcXC4pXFxiL1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5udW1lcmljLmludGVnZXIuaGV4YWRlY2ltYWwuemlnXCIsXG4gICAgICAgICAgICByZWdleDogL1xcYig/IVxcLikweFthLWZBLUZcXGRfXSsoPyFcXC4pXFxiL1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5udW1lcmljLmludGVnZXIub2N0YWwuemlnXCIsXG4gICAgICAgICAgICByZWdleDogL1xcYig/IVxcLikwb1swLTdfXSsoPyFcXC4pXFxiL1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5udW1lcmljLmludGVnZXIuYmluYXJ5LnppZ1wiLFxuICAgICAgICAgICAgcmVnZXg6IC9cXGIoPyFcXC4pMGJbMDFfXSsoPyFcXC4pXFxiL1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5udW1lcmljLmZsb2F0LnppZ1wiLFxuICAgICAgICAgICAgcmVnZXg6IC8oPyFcXC4pLT9cXGJbXFxkX10rKD86XFwuW1xcZF9dKyk/KD86W2VFXVsrLV0/W1xcZF9dKyk/KD8hXFwuKVxcYi9cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQubnVtZXJpYy5mbG9hdC5oZXhhZGVjaW1hbC56aWdcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvKD8hXFwuKS0/XFxiMHhbYS1mQS1GXFxkX10rKD86XFwuW2EtZkEtRlxcZF9dKyk/W3BQXT8oPzpbKy1dP1tcXGRfXSspPyg/IVxcLilcXGIvXG4gICAgICAgIH1dLFxuICAgICAgICBcIiNjb250YWluZXJfZGVjbFwiOiBbe1xuICAgICAgICAgICAgdG9rZW46IFwiZW50aXR5Lm5hbWUudW5pb24uemlnXCIsXG4gICAgICAgICAgICByZWdleDogL1xcYig/IVxcZCkoPzpbYS16QS1aX11cXHcqfEBcXFwiLitcXFwiKT8oPz1cXHMqPVxccyooPzpleHRlcm58cGFja2VkKT9cXGJcXHMqdW5pb25cXHMqWyhcXHtdKS9cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwiZW50aXR5Lm5hbWUuc3RydWN0LnppZ1wiLFxuICAgICAgICAgICAgcmVnZXg6IC9cXGIoPyFcXGQpKD86W2EtekEtWl9dXFx3KnxAXFxcIi4rXFxcIik/KD89XFxzKj1cXHMqKD86ZXh0ZXJufHBhY2tlZCk/XFxiXFxzKnN0cnVjdFxccypbKFxce10pL1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJlbnRpdHkubmFtZS5lbnVtLnppZ1wiLFxuICAgICAgICAgICAgcmVnZXg6IC9cXGIoPyFcXGQpKD86W2EtekEtWl9dXFx3KnxAXFxcIi4rXFxcIik/KD89XFxzKj1cXHMqKD86ZXh0ZXJufHBhY2tlZCk/XFxiXFxzKmVudW1cXHMqWyhcXHtdKS9cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwiZW50aXR5Lm5hbWUuZXJyb3IuemlnXCIsXG4gICAgICAgICAgICByZWdleDogL1xcYig/IVxcZCkoPzpbYS16QS1aX11cXHcqfEBcXFwiLitcXFwiKT8oPz1cXHMqPVxccyplcnJvclxccypbKFxce10pL1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogW1xuICAgICAgICAgICAgICAgIFwic3RvcmFnZS50eXBlLmVycm9yLnppZ1wiLFxuICAgICAgICAgICAgICAgIFwicHVuY3R1YXRpb24uYWNjZXNzb3IuemlnXCIsXG4gICAgICAgICAgICAgICAgXCJlbnRpdHkubmFtZS5lcnJvci56aWdcIlxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHJlZ2V4OiAvXFxiKGVycm9yKShcXC4pKFthLXpBLVpfXVxcdyp8QFxcXCIuK1xcXCIpL1xuICAgICAgICB9XSxcbiAgICAgICAgXCIjZHVtbXlfbWFpblwiOiBbe1xuICAgICAgICAgICAgaW5jbHVkZTogXCIjbGFiZWxcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpbmNsdWRlOiBcIiNmdW5jdGlvbl90eXBlXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaW5jbHVkZTogXCIjZnVuY3Rpb25fZGVmXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaW5jbHVkZTogXCIjcHVuY3R1YXRpb25cIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpbmNsdWRlOiBcIiNzdG9yYWdlX21vZGlmaWVyXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaW5jbHVkZTogXCIjY29udGFpbmVyX2RlY2xcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpbmNsdWRlOiBcIiNjb25zdGFudHNcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpbmNsdWRlOiBcIiNjb21tZW50c1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGluY2x1ZGU6IFwiI3N0cmluZ3NcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpbmNsdWRlOiBcIiNzdG9yYWdlXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaW5jbHVkZTogXCIja2V5d29yZHNcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpbmNsdWRlOiBcIiNvcGVyYXRvcnNcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpbmNsdWRlOiBcIiNzdXBwb3J0XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaW5jbHVkZTogXCIjZmllbGRfZGVjbFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGluY2x1ZGU6IFwiI2Jsb2NrXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaW5jbHVkZTogXCIjZnVuY3Rpb25fY2FsbFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGluY2x1ZGU6IFwiI2VudW1fbGl0ZXJhbFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGluY2x1ZGU6IFwiI3ZhcmlhYmxlc1wiXG4gICAgICAgIH1dLFxuICAgICAgICBcIiNlbnVtX2xpdGVyYWxcIjogW3tcbiAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVudW1cIixcbiAgICAgICAgICAgIHJlZ2V4OiAvKD8hXFx3fFxcKXxcXD98XFx9fFxcXXxcXCp8XFwuKVxcLig/OlthLXpBLVpfXVxcdypcXGJ8QFxcXCJbXlxcXCJdKlxcXCIpKD8hXFwofFxccyo9W149Pl0pL1xuICAgICAgICB9XSxcbiAgICAgICAgXCIjZmllbGRfZGVjbFwiOiBbe1xuICAgICAgICAgICAgdG9rZW46IFtcbiAgICAgICAgICAgICAgICBcInZhcmlhYmxlLm90aGVyLm1lbWJlci56aWdcIixcbiAgICAgICAgICAgICAgICBcInRleHRcIixcbiAgICAgICAgICAgICAgICBcInB1bmN0dWF0aW9uLnNlcGFyYXRvci56aWdcIixcbiAgICAgICAgICAgICAgICBcInRleHRcIlxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHJlZ2V4OiAvKFthLXpBLVpfXVxcdyp8QFxcXCIuK1xcXCIpKFxccyopKDopKFxccyopLyxcbiAgICAgICAgICAgIHB1c2g6IFt7XG4gICAgICAgICAgICAgICAgdG9rZW46IFtcbiAgICAgICAgICAgICAgICAgICAgXCJzdG9yYWdlLnR5cGUuemlnXCIsXG4gICAgICAgICAgICAgICAgICAgIFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBcInB1bmN0dWF0aW9uLnNlcGFyYXRvci56aWdcIixcbiAgICAgICAgICAgICAgICAgICAgXCJrZXl3b3JkLm9wZXJhdG9yLmFzc2lnbm1lbnQuemlnXCJcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvKCg/OlthLXpBLVpfXVtcXHcuXSp8QFxcXCIuK1xcXCIpPykoXFxzKikoPzooLCl8KD0pfCQpLyxcbiAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaW5jbHVkZTogXCIjZHVtbXlfbWFpblwiXG4gICAgICAgICAgICB9XVxuICAgICAgICB9XSxcbiAgICAgICAgXCIjZnVuY3Rpb25fY2FsbFwiOiBbe1xuICAgICAgICAgICAgdG9rZW46IFwidmFyaWFibGUuZnVuY3Rpb24uemlnXCIsXG4gICAgICAgICAgICByZWdleDogL1xcYig/IWZuKSg/OlthLXpBLVpfXVxcdyp8QFxcXCIuK1xcXCIpKD89XFxzKlxcKCkvXG4gICAgICAgIH1dLFxuICAgICAgICBcIiNrZXl3b3Jkc1wiOiBbe1xuICAgICAgICAgICAgdG9rZW46IFwia2V5d29yZC5jb250cm9sLnppZ1wiLFxuICAgICAgICAgICAgcmVnZXg6IC9cXGIoPzp3aGlsZXxmb3J8YnJlYWt8cmV0dXJufGNvbnRpbnVlfGFzbXxkZWZlcnxlcnJkZWZlcnx1bnJlYWNoYWJsZSlcXGIvXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcImtleXdvcmQuY29udHJvbC5hc3luYy56aWdcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXFxiKD86YXN5bmN8YXdhaXR8c3VzcGVuZHxub3N1c3BlbmR8cmVzdW1lKVxcYi9cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwia2V5d29yZC5jb250cm9sLmNvbmRpdGlvbmFsLnppZ1wiLFxuICAgICAgICAgICAgcmVnZXg6IC9cXGIoPzppZnxlbHNlfHN3aXRjaHx0cnl8Y2F0Y2h8b3JlbHNlKVxcYi9cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwia2V5d29yZC5jb250cm9sLmltcG9ydC56aWdcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXFxiKD8hXFx3KSg/OkBpbXBvcnR8QGNJbXBvcnR8QGNJbmNsdWRlKVxcYi9cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwia2V5d29yZC5vdGhlci51c2luZ25hbWVzcGFjZS56aWdcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXFxidXNpbmduYW1lc3BhY2VcXGIvXG4gICAgICAgIH1dLFxuICAgICAgICBcIiNsYWJlbFwiOiBbe1xuICAgICAgICAgICAgdG9rZW46IFtcbiAgICAgICAgICAgICAgICBcImtleXdvcmQuY29udHJvbC56aWdcIixcbiAgICAgICAgICAgICAgICBcInRleHRcIixcbiAgICAgICAgICAgICAgICBcImVudGl0eS5uYW1lLmxhYmVsLnppZ1wiLFxuICAgICAgICAgICAgICAgIFwiZW50aXR5Lm5hbWUubGFiZWwuemlnXCJcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICByZWdleDogL1xcYihicmVha3xjb250aW51ZSkoXFxzKjpcXHMqKShbYS16QS1aX11cXHcqfEBcXFwiLitcXFwiKVxcYnxcXGIoPyFcXGQpKFthLXpBLVpfXVxcdyp8QFxcXCIuK1xcXCIpXFxiKD89XFxzKjpcXHMqKD86XFx7fHdoaWxlXFxiKSkvXG4gICAgICAgIH1dLFxuICAgICAgICBcIiNvcGVyYXRvcnNcIjogW3tcbiAgICAgICAgICAgIHRva2VuOiBcImtleXdvcmQub3BlcmF0b3IuemlnXCIsXG4gICAgICAgICAgICByZWdleDogL1xcYiFcXGIvXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcImtleXdvcmQub3BlcmF0b3IubG9naWNhbC56aWdcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvPT18KD86IXw+fDwpPT8vXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcImtleXdvcmQub3BlcmF0b3Iud29yZC56aWdcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXFxiKD86YW5kfG9yKVxcYi9cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwia2V5d29yZC5vcGVyYXRvci5hc3NpZ25tZW50LnppZ1wiLFxuICAgICAgICAgICAgcmVnZXg6IC8oPzooPzpcXCt8LXxcXCopXFwlP3xcXC98JXw8PHw+PnwmfFxcfCg/PVteXFx8XSl8XFxeKT89L1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJrZXl3b3JkLm9wZXJhdG9yLmFyaXRobWV0aWMuemlnXCIsXG4gICAgICAgICAgICByZWdleDogLyg/OlxcK3wtfFxcKilcXCU/fFxcLyg/IVxcLyl8JS9cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwia2V5d29yZC5vcGVyYXRvci5iaXR3aXNlLnppZ1wiLFxuICAgICAgICAgICAgcmVnZXg6IC88PHw+PnwmKD89W2EtekEtWl9dfEBcXFwiKXxcXHwoPz1bXlxcfF0pfFxcXnx+L1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJrZXl3b3JkLm9wZXJhdG9yLm90aGVyLnppZ1wiLFxuICAgICAgICAgICAgcmVnZXg6IC9cXCtcXCt8XFwqXFwqfC0+fFxcLlxcP3xcXC5cXCp8Jig/PVthLXpBLVpfXXxAXFxcIil8XFw/fFxcfFxcfHxcXC57MiwzfS9cbiAgICAgICAgfV0sXG4gICAgICAgIFwiI3BhcmFtX2xpc3RcIjogW3tcbiAgICAgICAgICAgIHRva2VuOiBbXG4gICAgICAgICAgICAgICAgXCJ2YXJpYWJsZS5wYXJhbWV0ZXIuemlnXCIsXG4gICAgICAgICAgICAgICAgXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgXCJwdW5jdHVhdGlvbi5zZXBhcmF0b3IuemlnXCIsXG4gICAgICAgICAgICAgICAgXCJ0ZXh0XCJcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICByZWdleDogLyhbYS16QS1aX11cXHcqfEBcXFwiLitcXFwiKShcXHMqKSg6KShcXHMqKS8sXG4gICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuOiBbXG4gICAgICAgICAgICAgICAgICAgIFwic3RvcmFnZS50eXBlLnppZ1wiLFxuICAgICAgICAgICAgICAgICAgICBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgXCJwdW5jdHVhdGlvbi5zZXBhcmF0b3IuemlnXCIsXG4gICAgICAgICAgICAgICAgICAgIFwicHVuY3R1YXRpb24uc2VjdGlvbi5wYXJlbnMuZW5kLnppZ1wiXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICByZWdleDogLygoPzpbYS16QS1aX11bXFx3Ll0qfEBcXFwiLitcXFwiKT8pKFxccyopKD86KCwpfChcXCkpKS8sXG4gICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFwiI2R1bW15X21haW5cIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInN0b3JhZ2UudHlwZS56aWdcIixcbiAgICAgICAgICAgICAgICByZWdleDogL1thLXpBLVpfXVtcXHcuXSp8QFxcXCIuK1xcXCIvXG4gICAgICAgICAgICB9XVxuICAgICAgICB9XSxcbiAgICAgICAgXCIjcHVuY3R1YXRpb25cIjogW3tcbiAgICAgICAgICAgIHRva2VuOiBcInB1bmN0dWF0aW9uLnNlcGFyYXRvci56aWdcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvLC9cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwicHVuY3R1YXRpb24udGVybWluYXRvci56aWdcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvOy9cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwicHVuY3R1YXRpb24uc2VjdGlvbi5wYXJlbnMuYmVnaW4uemlnXCIsXG4gICAgICAgICAgICByZWdleDogL1xcKC9cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwicHVuY3R1YXRpb24uc2VjdGlvbi5wYXJlbnMuZW5kLnppZ1wiLFxuICAgICAgICAgICAgcmVnZXg6IC9cXCkvXG4gICAgICAgIH1dLFxuICAgICAgICBcIiNzdG9yYWdlXCI6IFt7XG4gICAgICAgICAgICB0b2tlbjogXCJzdG9yYWdlLnR5cGUuemlnXCIsXG4gICAgICAgICAgICByZWdleDogL1xcYig/OmJvb2x8dm9pZHxub3JldHVybnx0eXBlfGFueWVycm9yfGFueXR5cGUpXFxiL1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJzdG9yYWdlLnR5cGUuaW50ZWdlci56aWdcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXFxiKD8hXFwuKSg/OltpdV1cXGQrfFtpdV1zaXplfGNvbXB0aW1lX2ludClcXGIvXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInN0b3JhZ2UudHlwZS5mbG9hdC56aWdcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXFxiKD86ZjE2fGYzMnxmNjR8ZjEyOHxjb21wdGltZV9mbG9hdClcXGIvXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInN0b3JhZ2UudHlwZS5jX2NvbXBhdC56aWdcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXFxiKD86Y19zaG9ydHxjX3VzaG9ydHxjX2ludHxjX3VpbnR8Y19sb25nfGNfdWxvbmd8Y19sb25nbG9uZ3xjX3Vsb25nbG9uZ3xjX2xvbmdkb3VibGV8Y192b2lkKVxcYi9cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFtcbiAgICAgICAgICAgICAgICBcInN0b3JhZ2UudHlwZS56aWdcIixcbiAgICAgICAgICAgICAgICBcInRleHRcIixcbiAgICAgICAgICAgICAgICBcImtleXdvcmQub3BlcmF0b3IuemlnXCIsXG4gICAgICAgICAgICAgICAgXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgXCJzdG9yYWdlLnR5cGUuemlnXCJcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICByZWdleDogL1xcYihhbnlmcmFtZSlcXGIoXFxzKikoKD86LT4pPykoXFxzKikoPzooW2EtekEtWl9dW1xcdy5dKnxAXFxcIi4rXFxcIilcXGIoPyFcXHMqXFwoKSk/L1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJzdG9yYWdlLnR5cGUuZnVuY3Rpb24uemlnXCIsXG4gICAgICAgICAgICByZWdleDogL1xcYmZuXFxiL1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJzdG9yYWdlLnR5cGUudGVzdC56aWdcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXFxidGVzdFxcYi9cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwic3RvcmFnZS50eXBlLnN0cnVjdC56aWdcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXFxic3RydWN0XFxiL1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJzdG9yYWdlLnR5cGUuZW51bS56aWdcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXFxiZW51bVxcYi9cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwic3RvcmFnZS50eXBlLnVuaW9uLnppZ1wiLFxuICAgICAgICAgICAgcmVnZXg6IC9cXGJ1bmlvblxcYi9cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwic3RvcmFnZS50eXBlLmVycm9yLnppZ1wiLFxuICAgICAgICAgICAgcmVnZXg6IC9cXGJlcnJvclxcYi9cbiAgICAgICAgfV0sXG4gICAgICAgIFwiI3N0b3JhZ2VfbW9kaWZpZXJcIjogW3tcbiAgICAgICAgICAgIHRva2VuOiBcInN0b3JhZ2UubW9kaWZpZXIuemlnXCIsXG4gICAgICAgICAgICByZWdleDogL1xcYig/OmNvbnN0fHZhcnxleHRlcm58cGFja2VkfGV4cG9ydHxwdWJ8bm9hbGlhc3xpbmxpbmV8bm9pbmxpbmV8Y29tcHRpbWV8dm9sYXRpbGV8YWxpZ258bGlua3NlY3Rpb258dGhyZWFkbG9jYWx8YWxsb3d6ZXJvKVxcYi9cbiAgICAgICAgfV0sXG4gICAgICAgIFwiI3N0cmluZ3NcIjogW3tcbiAgICAgICAgICAgIHRva2VuOiBcInN0cmluZy5xdW90ZWQuc2luZ2xlLnppZ1wiLFxuICAgICAgICAgICAgcmVnZXg6IC9cXCcvLFxuICAgICAgICAgICAgcHVzaDogW3tcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJzdHJpbmcucXVvdGVkLnNpbmdsZS56aWdcIixcbiAgICAgICAgICAgICAgICByZWdleDogL1xcJy8sXG4gICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFwiI2NoYXJhY3Rlcl9lc2NhcGVzXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJpbnZhbGlkLmlsbGVnYWwuY2hhcmFjdGVyLnppZ1wiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvXFxcXFteXFwnXVteXFwnXSo/L1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzdHJpbmcucXVvdGVkLnNpbmdsZS56aWdcIlxuICAgICAgICAgICAgfV1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nLnF1b3RlZC5kb3VibGUuemlnXCIsXG4gICAgICAgICAgICByZWdleDogL2M/XFxcIi8sXG4gICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInN0cmluZy5xdW90ZWQuZG91YmxlLnppZ1wiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvXFxcIi8sXG4gICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFwiI2NoYXJhY3Rlcl9lc2NhcGVzXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJpbnZhbGlkLmlsbGVnYWwuY2hhcmFjdGVyLnppZ1wiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvXFxcXFteXFwnXVteXFwnXSo/L1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzdHJpbmcucXVvdGVkLmRvdWJsZS56aWdcIlxuICAgICAgICAgICAgfV1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nLnF1b3RlZC5vdGhlci56aWdcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvYz9cXFxcXFxcXC8sXG4gICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInN0cmluZy5xdW90ZWQub3RoZXIuemlnXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IC8kLyxcbiAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInN0cmluZy5xdW90ZWQub3RoZXIuemlnXCJcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH1dLCAgXG4gICAgICAgIFwiI2Z1bmN0aW9uX3R5cGVcIjogW3tcbiAgICAgICAgICAgIHRva2VuOiBbXG4gICAgICAgICAgICAgICAgXCJzdG9yYWdlLnR5cGUuZnVuY3Rpb24uemlnXCIsXG4gICAgICAgICAgICAgICAgXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgXCJwdW5jdHVhdGlvbi5zZWN0aW9uLnBhcmVucy5iZWdpbi56aWdcIlxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHJlZ2V4OiAvXFxiKGZuKShcXHMqKShcXCgpLyxcbiAgICAgICAgICAgIHB1c2g6IFt7XG4gICAgICAgICAgICAgICAgdG9rZW46IFtcbiAgICAgICAgICAgICAgICAgICAgXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIFwic3RvcmFnZS50eXBlLnppZ1wiLFxuICAgICAgICAgICAgICAgICAgICBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgXCJrZXl3b3JkLm9wZXJhdG9yLnppZ1wiLFxuICAgICAgICAgICAgICAgICAgICBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgXCJzdG9yYWdlLnR5cGUuemlnXCJcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvKFxccyopKD86KFthLXpBLVpfXVxcdyp8QFxcXCIuK1xcXCIpKT8oXFxzKikoKD86ISk/KShcXHMqKShbYS16QS1aX11cXHcqfEBcXFwiLitcXFwiKS8sXG4gICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFwiI2xhYmVsXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiBcIiNwYXJhbV9saXN0XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJzdG9yYWdlLnR5cGUuemlnXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IC9bYS16QS1aX11cXHcqfEBcXFwiLitcXFwiL1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFwiI2R1bW15X21haW5cIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJtZXRhLmZ1bmN0aW9uLnBhcmFtZXRlcnMuemlnXCJcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH1dLFxuICAgICAgICBcIiNmdW5jdGlvbl9kZWZcIjogW3tcbiAgICAgICAgICAgIHRva2VuOiBbXG4gICAgICAgICAgICAgICAgXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgXCJlbnRpdHkubmFtZS5mdW5jdGlvblwiLFxuICAgICAgICAgICAgICAgIFwicHVuY3R1YXRpb24uc2VjdGlvbi5wYXJlbnMuYmVnaW4uemlnXCJcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICByZWdleDogLyg/PWZuXFxzKykoXFxzKykoW2EtekEtWl9dXFx3KnxAXFxcIi4rXFxcIikoXFwoKS8sXG4gICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuOiBbXG4gICAgICAgICAgICAgICAgICAgIFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBcInN0b3JhZ2UudHlwZS56aWdcIixcbiAgICAgICAgICAgICAgICAgICAgXCJrZXl3b3JkLm9wZXJhdG9yLnppZ1wiLFxuICAgICAgICAgICAgICAgICAgICBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgXCJzdG9yYWdlLnR5cGUuemlnXCJcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvKFxccyopKCg/OlthLXpBLVpfXVtcXHcuXSp8QFxcXCIuK1xcXCIpPykoKD86ISk/KShcXHMqKSg/OihbYS16QS1aX11bXFx3Ll0qfEBcXFwiLitcXFwiKT8pLyxcbiAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaW5jbHVkZTogXCIjbGFiZWxcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFwiI3BhcmFtX2xpc3RcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInN0b3JhZ2UudHlwZS56aWdcIixcbiAgICAgICAgICAgICAgICByZWdleDogL1thLXpBLVpfXVtcXHcuXSp8QFxcXCIuK1xcXCIvXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaW5jbHVkZTogXCIjZHVtbXlfbWFpblwiXG4gICAgICAgICAgICB9XVxuICAgICAgICB9XSxcbiAgICAgICAgXCIjc3VwcG9ydFwiOiBbe1xuICAgICAgICAgICAgdG9rZW46IFwic3VwcG9ydC5mdW5jdGlvbi56aWdcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXFxiQCg/IVxcd3xcXFwifFswLTldKVthLXpBLVpfXVxcdypcXGIvXG4gICAgICAgIH1dLFxuICAgICAgICBcIiN2YXJpYWJsZXNcIjogW3tcbiAgICAgICAgICAgIHRva2VuOiBcInZhcmlhYmxlLmNvbnN0YW50LnppZ1wiLFxuICAgICAgICAgICAgcmVnZXg6IC9cXGJbX0EtWl1bX0EtWjAtOV0rXFxiL1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJlbnRpdHkubmFtZS50eXBlLnppZ1wiLFxuICAgICAgICAgICAgcmVnZXg6IC9cXGJbX2EtekEtWl1bX2EtekEtWjAtOV0qX3RcXGIvXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcImVudGl0eS5uYW1lLnR5cGUuemlnXCIsXG4gICAgICAgICAgICByZWdleDogL1xcYltBLVpdW2EtekEtWjAtOV0qXFxiL1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJ2YXJpYWJsZS56aWdcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXFxiW19hLXpBLVpdW19hLXpBLVowLTldKlxcYi9cbiAgICAgICAgfV1cbiAgICB9O1xuICAgIFxuICAgIHRoaXMubm9ybWFsaXplUnVsZXMoKTtcbn07XG5cblppZ0hpZ2hsaWdodFJ1bGVzLm1ldGFEYXRhID0ge1xuICAgIGZpbGVUeXBlczogW1wiemlnXCJdLFxuICAgIGtleUVxdWl2YWxlbnQ6IFwiXn5aXCIsXG4gICAgbmFtZTogXCJaaWdcIixcbiAgICBzY29wZU5hbWU6IFwic291cmNlLnppZ1wiXG59O1xuXG5cbm9vcC5pbmhlcml0cyhaaWdIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuZXhwb3J0cy5aaWdIaWdobGlnaHRSdWxlcyA9IFppZ0hpZ2hsaWdodFJ1bGVzO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9