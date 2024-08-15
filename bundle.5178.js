"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[5178],{

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

/***/ 15178:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/*
  THIS FILE WAS AUTOGENERATED BY mode.tmpl.js
*/



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var ZeekHighlightRules = (__webpack_require__(61101)/* .ZeekHighlightRules */ .l);
var FoldMode = (__webpack_require__(93887)/* .FoldMode */ .l);

var Mode = function() {
    this.HighlightRules = ZeekHighlightRules;
    this.foldingRules = new FoldMode();
};
oop.inherits(Mode, TextMode);

(function() {
    this.lineCommentStart = "#";
    // Extra logic goes here.
    this.$id = "ace/mode/zeek";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 61101:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

var ZeekHighlightRules = function() {
    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used

    this.$rules = {
        "start": [
            {
            token: "comment.line",
            regex: "#.*$"
            },
            {
            token: "string.double",
            regex: /"/,
            next: "string-state"
            },
            {
            token: "string.regexp",
            regex: "(/)(?=.*/)",
            next: "pattern-state"
            },
            {
            token: ["keyword.other", "meta.preprocessor"],
            regex: /(@(?:load-plugin|load-sigs|load|unload))(.*$)/
            },
            {
            token: "keyword.other",
            regex: /@(?:DEBUG|DIR|FILENAME|deprecated|if|ifdef|ifndef|else|endif)/
            },
            {
            token: [
                "keyword.other",
                "meta.preprocessor",
                "keyword.operator",
                "meta.preprocessor"
            ],
            regex: /(@prefixes)(\s*)(\+?=)(.*$)/
            },
            {
            token: "storage.modifier.attribute",
            regex: /\&\b(?:redef|priority|log|optional|default|add_func|delete_func|expire_func|read_expire|write_expire|create_expire|synchronized|persistent|rotate_interval|rotate_size|encrypt|raw_output|mergeable|error_handler|type_column|deprecated)\b/
            },
            {
            token: "constant.language",
            regex: /\b(?:T|F)\b/
            },
            {
            token: "constant.numeric.port",
            regex: /\b\d{1,5}\/(?:udp|tcp|icmp|unknown)\b/
            },
            {
            token: "constant.numeric.addr",
            regex: /\b(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[0-9]{1,2})\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[0-9]{1,2})\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[0-9]{1,2})\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[0-9]{1,2})\b/,
            comment: "IPv4 address"
            },
            {
            token: "constant.numeric.addr",
            regex: /\[(?:[0-9a-fA-F]{0,4}:){2,7}(?:[0-9a-fA-F]{0,4})?(?:(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[0-9]{1,2})\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[0-9]{1,2})\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[0-9]{1,2})\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[0-9]{1,2}))?\]/,
            comment: "IPv6 address"
            },
            {
            token: "constant.numeric.float.decimal.interval",
            regex: /(?:(?:\d*\.\d*(?:[eE][+-]?\d+)?|\d*[eE][+-]?\d+|\d*\.\d*)|\d+)\s*(?:day|hr|min|msec|usec|sec)s?/
            },
            {
            token: "constant.numeric.float.decimal",
            regex: /\d*\.\d*(?:[eE][+-]?\d+)?|\d*[eE][+-]?\d+|\d*\.\d*/
            },
            {
            token: "constant.numeric.hostname",
            regex: /\b[A-Za-z0-9][A-Za-z0-9\-]*(?:\.[A-Za-z0-9][A-Za-z0-9\-]*)+\b/
            },
            {
            token: "constant.numeric.integer.hexadecimal",
            regex: /\b0x[0-9a-fA-F]+\b/
            },
            {
            token: "constant.numeric.integer.decimal",
            regex: /\b\d+\b/
            },
            {
            token: "keyword.operator",
            regex: /==|!=|<=|<|>=|>/
            },
            {
            token: "keyword.operator",
            regex: /(&&)|(\|\|)|(!)/
            },
            {
            token: "keyword.operator",
            regex: /=|\+=|-=/
            },
            {
            token: "keyword.operator",
            regex: /\+\+|\+|--|-|\*|\/|%/
            },
            {
            token: "keyword.operator",
            regex: /&|\||\^|~/
            },
            {
            token: "keyword.operator",
            regex: /\b(?:in|as|is)\b/
            },
            {
            token: "punctuation.terminator",
            regex: /;/
            },
            {
            token: "punctuation.accessor",
            regex: /\??\$/
            },
            {
            token: "punctuation.accessor",
            regex: /::/
            },
            {
            token: "keyword.operator",
            regex: /\?/
            },
            // Unsure how to tell if colon is used as operator vs. separator.
            // {
            // token: "keyword.operator",
            // regex: /:/
            // },
            {
            token: "punctuation.separator",
            regex: /:/
            },
            {
            token: "punctuation.separator",
            regex: /,/
            },
            {
            token: [
                "keyword.other",
                "meta.namespace",
                "entity.name.namespace"
            ],
            regex: /(module)(\s+)([A-Za-z_][A-Za-z_0-9]*(?:::[A-Za-z_][A-Za-z_0-9]*)*)/
            },
            {
            token: "keyword.other",
            regex: /\bexport\b/
            },
            {
            token: "keyword.control.conditional",
            regex: /\b(?:if|else)\b/
            },
            {
            token: "keyword.control",
            regex: /\b(?:for|while)\b/
            },
            {
            token: "keyword.control",
            regex: /\b(?:return|break|next|continue|fallthrough)\b/
            },
            {
            token: "keyword.control",
            regex: /\b(?:switch|default|case)\b/
            },
            {
            token: "keyword.other",
            regex: /\b(?:add|delete)\b/
            },
            {
            token: "keyword.other",
            regex: /\bprint\b/
            },
            {
            token: "keyword.control",
            regex: /\b(?:when|timeout|schedule)\b/
            },
            {
            token: [
                "keyword.other",
                "meta.struct.record",
                "entity.name.struct.record",
                "meta.struct.record",
                "punctuation.separator",
                "meta.struct.record",
                "storage.type.struct.record"
            ],
            regex: /\b(type)(\s+)([A-Za-z_][A-Za-z_0-9]*(?:::[A-Za-z_][A-Za-z_0-9]*)*)(\s*)(:)(\s*\b)(record)\b/
            },
            {
            token: [
                "keyword.other",
                "meta.enum",
                "entity.name.enum",
                "meta.enum",
                "punctuation.separator",
                "meta.enum",
                "storage.type.enum"
            ],
            regex: /\b(type)(\s+)([A-Za-z_][A-Za-z_0-9]*(?:::[A-Za-z_][A-Za-z_0-9]*)*)(\s*)(:)(\s*\b)(enum)\b/
            },
            {
            token: [
                "keyword.other",
                "meta.type",
                "entity.name.type",
                "meta.type",
                "punctuation.separator"
            ],
            regex: /\b(type)(\s+)([A-Za-z_][A-Za-z_0-9]*(?:::[A-Za-z_][A-Za-z_0-9]*)*)(\s*)(:)/
            },
            {
            token: [
                "keyword.other",
                "meta.struct.record",
                "storage.type.struct.record",
                "meta.struct.record",
                "entity.name.struct.record"
            ],
            regex: /\b(redef)(\s+)(record)(\s+)([A-Za-z_][A-Za-z_0-9]*(?:::[A-Za-z_][A-Za-z_0-9]*)*)\b/
            },
            {
            token: [
                "keyword.other",
                "meta.enum",
                "storage.type.enum",
                "meta.enum",
                "entity.name.enum"
            ],
            regex: /\b(redef)(\s+)(enum)(\s+)([A-Za-z_][A-Za-z_0-9]*(?:::[A-Za-z_][A-Za-z_0-9]*)*)\b/
            },
            {
            token: [
                "storage.type",
                "text",
                "entity.name.function.event"
            ],
            regex: /\b(event)(\s+)([A-Za-z_][A-Za-z_0-9]*(?:::[A-Za-z_][A-Za-z_0-9]*)*)(?=s*\()/
            },
            {
            token: [
                "storage.type",
                "text",
                "entity.name.function.hook"
            ],
            regex: /\b(hook)(\s+)([A-Za-z_][A-Za-z_0-9]*(?:::[A-Za-z_][A-Za-z_0-9]*)*)(?=s*\()/
            },
            {
            token: [
                "storage.type",
                "text",
                "entity.name.function"
            ],
            regex: /\b(function)(\s+)([A-Za-z_][A-Za-z_0-9]*(?:::[A-Za-z_][A-Za-z_0-9]*)*)(?=s*\()/
            },
            {
            token: "keyword.other",
            regex: /\bredef\b/
            },
            {
            token: "storage.type",
            regex: /\bany\b/
            },
            {
            token: "storage.type",
            regex: /\b(?:enum|record|set|table|vector)\b/
            },
            {
            token: [
                "storage.type",
                "text",
                "keyword.operator",
                "text",
                "storage.type"
            ],
            regex: /\b(opaque)(\s+)(of)(\s+)([A-Za-z_][A-Za-z_0-9]*(?:::[A-Za-z_][A-Za-z_0-9]*)*)\b/
            },
            {
            token: "keyword.operator",
            regex: /\bof\b/
            },
            {
            token: "storage.type",
            regex: /\b(?:addr|bool|count|double|file|int|interval|pattern|port|string|subnet|time)\b/
            },
            {
            token: "storage.type",
            regex: /\b(?:function|hook|event)\b/
            },
            {
            token: "storage.modifier",
            regex: /\b(?:global|local|const|option)\b/
            },
            {
            token: "entity.name.function.call",
            regex: /\b[A-Za-z_][A-Za-z_0-9]*(?:::[A-Za-z_][A-Za-z_0-9]*)*(?=s*\()/
            },
            {
            token: "punctuation.section.block.begin",
            regex: /\{/
            },
            {
            token: "punctuation.section.block.end",
            regex: /\}/
            },
            {
            token: "punctuation.section.brackets.begin",
            regex: /\[/
            },
            {
            token: "punctuation.section.brackets.end",
            regex: /\]/
            },
            {
            token: "punctuation.section.parens.begin",
            regex: /\(/
            },
            {
            token: "punctuation.section.parens.end",
            regex: /\)/
            }

        ], // state: start

        "string-state": [
            {
            token: "constant.character.escape",
            regex: /\\./
            },
            {
            token: "string.double",
            regex: /"/,
            next: "start"
            },
            {
            token: "constant.other.placeholder",
            regex: /%-?[0-9]*(\.[0-9]+)?[DTdxsefg]/
            },
            {
            token: "string.double",
            regex: "."
            }
        ], // state: string-state

        "pattern-state": [
            {
            token: "constant.character.escape",
            regex: /\\./
            },
            {
            token: "string.regexp",
            regex: "/",
            next: "start"
            },
            {
            token: "string.regexp",
            regex: "."
            }
        ] // state: pattern-state

    };

    this.normalizeRules();
};

ZeekHighlightRules.metaData = {
    fileTypes: ["bro", "zeek"],
    name: "Zeek",
    scopeName: "source.zeek"
};


oop.inherits(ZeekHighlightRules, TextHighlightRules);

exports.l = ZeekHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCLGFBQWE7QUFDYjtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUEsU0FBMEIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2ZvbGRpbmcvY3N0eWxlLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvemVlay5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL3plZWtfaGlnaGxpZ2h0X3J1bGVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uLy4uL2xpYi9vb3BcIik7XG52YXIgUmFuZ2UgPSByZXF1aXJlKFwiLi4vLi4vcmFuZ2VcIikuUmFuZ2U7XG52YXIgQmFzZUZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZF9tb2RlXCIpLkZvbGRNb2RlO1xuXG52YXIgRm9sZE1vZGUgPSBleHBvcnRzLkZvbGRNb2RlID0gZnVuY3Rpb24oY29tbWVudFJlZ2V4KSB7XG4gICAgaWYgKGNvbW1lbnRSZWdleCkge1xuICAgICAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlciA9IG5ldyBSZWdFeHAoXG4gICAgICAgICAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlci5zb3VyY2UucmVwbGFjZSgvXFx8W158XSo/JC8sIFwifFwiICsgY29tbWVudFJlZ2V4LnN0YXJ0KVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmZvbGRpbmdTdG9wTWFya2VyID0gbmV3IFJlZ0V4cChcbiAgICAgICAgICAgIHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIuc291cmNlLnJlcGxhY2UoL1xcfFtefF0qPyQvLCBcInxcIiArIGNvbW1lbnRSZWdleC5lbmQpXG4gICAgICAgICk7XG4gICAgfVxufTtcbm9vcC5pbmhlcml0cyhGb2xkTW9kZSwgQmFzZUZvbGRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuICAgIFxuICAgIHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyID0gLyhbXFx7XFxbXFwoXSlbXlxcfVxcXVxcKV0qJHxeXFxzKihcXC9cXCopLztcbiAgICB0aGlzLmZvbGRpbmdTdG9wTWFya2VyID0gL15bXlxcW1xce1xcKF0qKFtcXH1cXF1cXCldKXxeW1xcc1xcKl0qKFxcKlxcLykvO1xuICAgIHRoaXMuc2luZ2xlTGluZUJsb2NrQ29tbWVudFJlPSAvXlxccyooXFwvXFwqKS4qXFwqXFwvXFxzKiQvO1xuICAgIHRoaXMudHJpcGxlU3RhckJsb2NrQ29tbWVudFJlID0gL15cXHMqKFxcL1xcKlxcKlxcKikuKlxcKlxcL1xccyokLztcbiAgICB0aGlzLnN0YXJ0UmVnaW9uUmUgPSAvXlxccyooXFwvXFwqfFxcL1xcLykjP3JlZ2lvblxcYi87XG4gICAgXG4gICAgLy9wcmV2ZW50IG5hbWluZyBjb25mbGljdCB3aXRoIGFueSBtb2RlcyB0aGF0IGluaGVyaXQgZnJvbSBjc3R5bGUgYW5kIG92ZXJyaWRlIHRoaXMgKGxpa2UgY3NoYXJwKVxuICAgIHRoaXMuX2dldEZvbGRXaWRnZXRCYXNlID0gdGhpcy5nZXRGb2xkV2lkZ2V0O1xuICAgIFxuICAgIC8qKlxuICAgICAqIEdldHMgZm9sZCB3aWRnZXQgd2l0aCBzb21lIG5vbi1zdGFuZGFyZCBleHRyYXM6XG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSBsaW5lQ29tbWVudFJlZ2lvblN0YXJ0XG4gICAgICogICAgICAvLyNyZWdpb24gW29wdGlvbmFsIGRlc2NyaXB0aW9uXVxuICAgICAqXG4gICAgICogQGV4YW1wbGUgYmxvY2tDb21tZW50UmVnaW9uU3RhcnRcbiAgICAgKiAgICAgIC8qI3JlZ2lvbiBbb3B0aW9uYWwgZGVzY3JpcHRpb25dICpbL11cbiAgICAgKlxuICAgICAqIEBleGFtcGxlIHRyaXBsZVN0YXJGb2xkaW5nU2VjdGlvblxuICAgICAqICAgICAgLyoqKiB0aGlzIGZvbGRzIGV2ZW4gdGhvdWdoIDEgbGluZSBiZWNhdXNlIGl0IGhhcyAzIHN0YXJzICoqKlsvXVxuICAgICAqIFxuICAgICAqIEBub3RlIHRoZSBwb3VuZCBzeW1ib2wgZm9yIHJlZ2lvbiB0YWdzIGlzIG9wdGlvbmFsXG4gICAgICovXG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0ID0gZnVuY3Rpb24oc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICBcbiAgICAgICAgaWYgKHRoaXMuc2luZ2xlTGluZUJsb2NrQ29tbWVudFJlLnRlc3QobGluZSkpIHtcbiAgICAgICAgICAgIC8vIE5vIHdpZGdldCBmb3Igc2luZ2xlIGxpbmUgYmxvY2sgY29tbWVudCB1bmxlc3MgcmVnaW9uIG9yIHRyaXBsZSBzdGFyXG4gICAgICAgICAgICBpZiAoIXRoaXMuc3RhcnRSZWdpb25SZS50ZXN0KGxpbmUpICYmICF0aGlzLnRyaXBsZVN0YXJCbG9ja0NvbW1lbnRSZS50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIHZhciBmdyA9IHRoaXMuX2dldEZvbGRXaWRnZXRCYXNlKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KTtcbiAgICBcbiAgICAgICAgaWYgKCFmdyAmJiB0aGlzLnN0YXJ0UmVnaW9uUmUudGVzdChsaW5lKSlcbiAgICAgICAgICAgIHJldHVybiBcInN0YXJ0XCI7IC8vIGxpbmVDb21tZW50UmVnaW9uU3RhcnRcbiAgICBcbiAgICAgICAgcmV0dXJuIGZ3O1xuICAgIH07XG5cbiAgICB0aGlzLmdldEZvbGRXaWRnZXRSYW5nZSA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93LCBmb3JjZU11bHRpbGluZSkge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuc3RhcnRSZWdpb25SZS50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q29tbWVudFJlZ2lvbkJsb2NrKHNlc3Npb24sIGxpbmUsIHJvdyk7XG4gICAgICAgIFxuICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyKTtcbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICB2YXIgaSA9IG1hdGNoLmluZGV4O1xuXG4gICAgICAgICAgICBpZiAobWF0Y2hbMV0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMub3BlbmluZ0JyYWNrZXRCbG9jayhzZXNzaW9uLCBtYXRjaFsxXSwgcm93LCBpKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciByYW5nZSA9IHNlc3Npb24uZ2V0Q29tbWVudEZvbGRSYW5nZShyb3csIGkgKyBtYXRjaFswXS5sZW5ndGgsIDEpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAocmFuZ2UgJiYgIXJhbmdlLmlzTXVsdGlMaW5lKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoZm9yY2VNdWx0aWxpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2UgPSB0aGlzLmdldFNlY3Rpb25SYW5nZShzZXNzaW9uLCByb3cpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZm9sZFN0eWxlICE9IFwiYWxsXCIpXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIHJhbmdlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZvbGRTdHlsZSA9PT0gXCJtYXJrYmVnaW5cIilcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIpO1xuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIHZhciBpID0gbWF0Y2guaW5kZXggKyBtYXRjaFswXS5sZW5ndGg7XG5cbiAgICAgICAgICAgIGlmIChtYXRjaFsxXSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jbG9zaW5nQnJhY2tldEJsb2NrKHNlc3Npb24sIG1hdGNoWzFdLCByb3csIGkpO1xuXG4gICAgICAgICAgICByZXR1cm4gc2Vzc2lvbi5nZXRDb21tZW50Rm9sZFJhbmdlKHJvdywgaSwgLTEpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBcbiAgICB0aGlzLmdldFNlY3Rpb25SYW5nZSA9IGZ1bmN0aW9uKHNlc3Npb24sIHJvdykge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICB2YXIgc3RhcnRJbmRlbnQgPSBsaW5lLnNlYXJjaCgvXFxTLyk7XG4gICAgICAgIHZhciBzdGFydFJvdyA9IHJvdztcbiAgICAgICAgdmFyIHN0YXJ0Q29sdW1uID0gbGluZS5sZW5ndGg7XG4gICAgICAgIHJvdyA9IHJvdyArIDE7XG4gICAgICAgIHZhciBlbmRSb3cgPSByb3c7XG4gICAgICAgIHZhciBtYXhSb3cgPSBzZXNzaW9uLmdldExlbmd0aCgpO1xuICAgICAgICB3aGlsZSAoKytyb3cgPCBtYXhSb3cpIHtcbiAgICAgICAgICAgIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgICAgIHZhciBpbmRlbnQgPSBsaW5lLnNlYXJjaCgvXFxTLyk7XG4gICAgICAgICAgICBpZiAoaW5kZW50ID09PSAtMSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIGlmICAoc3RhcnRJbmRlbnQgPiBpbmRlbnQpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB2YXIgc3ViUmFuZ2UgPSB0aGlzLmdldEZvbGRXaWRnZXRSYW5nZShzZXNzaW9uLCBcImFsbFwiLCByb3cpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoc3ViUmFuZ2UpIHtcbiAgICAgICAgICAgICAgICBpZiAoc3ViUmFuZ2Uuc3RhcnQucm93IDw9IHN0YXJ0Um93KSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3ViUmFuZ2UuaXNNdWx0aUxpbmUoKSkge1xuICAgICAgICAgICAgICAgICAgICByb3cgPSBzdWJSYW5nZS5lbmQucm93O1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhcnRJbmRlbnQgPT0gaW5kZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVuZFJvdyA9IHJvdztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShzdGFydFJvdywgc3RhcnRDb2x1bW4sIGVuZFJvdywgc2Vzc2lvbi5nZXRMaW5lKGVuZFJvdykubGVuZ3RoKTtcbiAgICB9O1xuICAgIFxuICAgIC8qKlxuICAgICAqIGdldHMgY29tbWVudCByZWdpb24gYmxvY2sgd2l0aCBlbmQgcmVnaW9uIGFzc3VtZWQgdG8gYmUgc3RhcnQgb2YgY29tbWVudCBpbiBhbnkgY3N0eWxlIG1vZGUgb3IgU1FMIG1vZGUgKC0tKSB3aGljaCBpbmhlcml0cyBmcm9tIHRoaXMuXG4gICAgICogVGhlcmUgbWF5IG9wdGlvbmFsbHkgYmUgYSBwb3VuZCBzeW1ib2wgYmVmb3JlIHRoZSByZWdpb24vZW5kcmVnaW9uIHN0YXRlbWVudFxuICAgICAqL1xuICAgIHRoaXMuZ2V0Q29tbWVudFJlZ2lvbkJsb2NrID0gZnVuY3Rpb24oc2Vzc2lvbiwgbGluZSwgcm93KSB7XG4gICAgICAgIHZhciBzdGFydENvbHVtbiA9IGxpbmUuc2VhcmNoKC9cXHMqJC8pO1xuICAgICAgICB2YXIgbWF4Um93ID0gc2Vzc2lvbi5nZXRMZW5ndGgoKTtcbiAgICAgICAgdmFyIHN0YXJ0Um93ID0gcm93O1xuICAgICAgICBcbiAgICAgICAgdmFyIHJlID0gL15cXHMqKD86XFwvXFwqfFxcL1xcL3wtLSkjPyhlbmQpP3JlZ2lvblxcYi87XG4gICAgICAgIHZhciBkZXB0aCA9IDE7XG4gICAgICAgIHdoaWxlICgrK3JvdyA8IG1heFJvdykge1xuICAgICAgICAgICAgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICAgICAgdmFyIG0gPSByZS5leGVjKGxpbmUpO1xuICAgICAgICAgICAgaWYgKCFtKSBjb250aW51ZTtcbiAgICAgICAgICAgIGlmIChtWzFdKSBkZXB0aC0tO1xuICAgICAgICAgICAgZWxzZSBkZXB0aCsrO1xuXG4gICAgICAgICAgICBpZiAoIWRlcHRoKSBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBlbmRSb3cgPSByb3c7XG4gICAgICAgIGlmIChlbmRSb3cgPiBzdGFydFJvdykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShzdGFydFJvdywgc3RhcnRDb2x1bW4sIGVuZFJvdywgbGluZS5sZW5ndGgpO1xuICAgICAgICB9XG4gICAgfTtcblxufSkuY2FsbChGb2xkTW9kZS5wcm90b3R5cGUpO1xuIiwiLypcbiAgVEhJUyBGSUxFIFdBUyBBVVRPR0VORVJBVEVEIEJZIG1vZGUudG1wbC5qc1xuKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0TW9kZSA9IHJlcXVpcmUoXCIuL3RleHRcIikuTW9kZTtcbnZhciBaZWVrSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi96ZWVrX2hpZ2hsaWdodF9ydWxlc1wiKS5aZWVrSGlnaGxpZ2h0UnVsZXM7XG52YXIgRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9mb2xkaW5nL2NzdHlsZVwiKS5Gb2xkTW9kZTtcblxudmFyIE1vZGUgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLkhpZ2hsaWdodFJ1bGVzID0gWmVla0hpZ2hsaWdodFJ1bGVzO1xuICAgIHRoaXMuZm9sZGluZ1J1bGVzID0gbmV3IEZvbGRNb2RlKCk7XG59O1xub29wLmluaGVyaXRzKE1vZGUsIFRleHRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuICAgIHRoaXMubGluZUNvbW1lbnRTdGFydCA9IFwiI1wiO1xuICAgIC8vIEV4dHJhIGxvZ2ljIGdvZXMgaGVyZS5cbiAgICB0aGlzLiRpZCA9IFwiYWNlL21vZGUvemVla1wiO1xufSkuY2FsbChNb2RlLnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTW9kZSA9IE1vZGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcblxudmFyIFplZWtIaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uKCkge1xuICAgIC8vIHJlZ2V4cCBtdXN0IG5vdCBoYXZlIGNhcHR1cmluZyBwYXJlbnRoZXNlcy4gVXNlICg/OikgaW5zdGVhZC5cbiAgICAvLyByZWdleHBzIGFyZSBvcmRlcmVkIC0+IHRoZSBmaXJzdCBtYXRjaCBpcyB1c2VkXG5cbiAgICB0aGlzLiRydWxlcyA9IHtcbiAgICAgICAgXCJzdGFydFwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbjogXCJjb21tZW50LmxpbmVcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIiMuKiRcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuOiBcInN0cmluZy5kb3VibGVcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXCIvLFxuICAgICAgICAgICAgbmV4dDogXCJzdHJpbmctc3RhdGVcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuOiBcInN0cmluZy5yZWdleHBcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIigvKSg/PS4qLylcIixcbiAgICAgICAgICAgIG5leHQ6IFwicGF0dGVybi1zdGF0ZVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgdG9rZW46IFtcImtleXdvcmQub3RoZXJcIiwgXCJtZXRhLnByZXByb2Nlc3NvclwiXSxcbiAgICAgICAgICAgIHJlZ2V4OiAvKEAoPzpsb2FkLXBsdWdpbnxsb2FkLXNpZ3N8bG9hZHx1bmxvYWQpKSguKiQpL1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuOiBcImtleXdvcmQub3RoZXJcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvQCg/OkRFQlVHfERJUnxGSUxFTkFNRXxkZXByZWNhdGVkfGlmfGlmZGVmfGlmbmRlZnxlbHNlfGVuZGlmKS9cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbjogW1xuICAgICAgICAgICAgICAgIFwia2V5d29yZC5vdGhlclwiLFxuICAgICAgICAgICAgICAgIFwibWV0YS5wcmVwcm9jZXNzb3JcIixcbiAgICAgICAgICAgICAgICBcImtleXdvcmQub3BlcmF0b3JcIixcbiAgICAgICAgICAgICAgICBcIm1ldGEucHJlcHJvY2Vzc29yXCJcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICByZWdleDogLyhAcHJlZml4ZXMpKFxccyopKFxcKz89KSguKiQpL1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuOiBcInN0b3JhZ2UubW9kaWZpZXIuYXR0cmlidXRlXCIsXG4gICAgICAgICAgICByZWdleDogL1xcJlxcYig/OnJlZGVmfHByaW9yaXR5fGxvZ3xvcHRpb25hbHxkZWZhdWx0fGFkZF9mdW5jfGRlbGV0ZV9mdW5jfGV4cGlyZV9mdW5jfHJlYWRfZXhwaXJlfHdyaXRlX2V4cGlyZXxjcmVhdGVfZXhwaXJlfHN5bmNocm9uaXplZHxwZXJzaXN0ZW50fHJvdGF0ZV9pbnRlcnZhbHxyb3RhdGVfc2l6ZXxlbmNyeXB0fHJhd19vdXRwdXR8bWVyZ2VhYmxlfGVycm9yX2hhbmRsZXJ8dHlwZV9jb2x1bW58ZGVwcmVjYXRlZClcXGIvXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQubGFuZ3VhZ2VcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXFxiKD86VHxGKVxcYi9cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5udW1lcmljLnBvcnRcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXFxiXFxkezEsNX1cXC8oPzp1ZHB8dGNwfGljbXB8dW5rbm93bilcXGIvXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQubnVtZXJpYy5hZGRyXCIsXG4gICAgICAgICAgICByZWdleDogL1xcYig/OjI1WzAtNV18MlswLTRdWzAtOV18WzAtMV1bMC05XXsyfXxbMC05XXsxLDJ9KVxcLig/OjI1WzAtNV18MlswLTRdWzAtOV18WzAtMV1bMC05XXsyfXxbMC05XXsxLDJ9KVxcLig/OjI1WzAtNV18MlswLTRdWzAtOV18WzAtMV1bMC05XXsyfXxbMC05XXsxLDJ9KVxcLig/OjI1WzAtNV18MlswLTRdWzAtOV18WzAtMV1bMC05XXsyfXxbMC05XXsxLDJ9KVxcYi8sXG4gICAgICAgICAgICBjb21tZW50OiBcIklQdjQgYWRkcmVzc1wiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQubnVtZXJpYy5hZGRyXCIsXG4gICAgICAgICAgICByZWdleDogL1xcWyg/OlswLTlhLWZBLUZdezAsNH06KXsyLDd9KD86WzAtOWEtZkEtRl17MCw0fSk/KD86KD86MjVbMC01XXwyWzAtNF1bMC05XXxbMC0xXVswLTldezJ9fFswLTldezEsMn0pXFwuKD86MjVbMC01XXwyWzAtNF1bMC05XXxbMC0xXVswLTldezJ9fFswLTldezEsMn0pXFwuKD86MjVbMC01XXwyWzAtNF1bMC05XXxbMC0xXVswLTldezJ9fFswLTldezEsMn0pXFwuKD86MjVbMC01XXwyWzAtNF1bMC05XXxbMC0xXVswLTldezJ9fFswLTldezEsMn0pKT9cXF0vLFxuICAgICAgICAgICAgY29tbWVudDogXCJJUHY2IGFkZHJlc3NcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lm51bWVyaWMuZmxvYXQuZGVjaW1hbC5pbnRlcnZhbFwiLFxuICAgICAgICAgICAgcmVnZXg6IC8oPzooPzpcXGQqXFwuXFxkKig/OltlRV1bKy1dP1xcZCspP3xcXGQqW2VFXVsrLV0/XFxkK3xcXGQqXFwuXFxkKil8XFxkKylcXHMqKD86ZGF5fGhyfG1pbnxtc2VjfHVzZWN8c2VjKXM/L1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lm51bWVyaWMuZmxvYXQuZGVjaW1hbFwiLFxuICAgICAgICAgICAgcmVnZXg6IC9cXGQqXFwuXFxkKig/OltlRV1bKy1dP1xcZCspP3xcXGQqW2VFXVsrLV0/XFxkK3xcXGQqXFwuXFxkKi9cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5udW1lcmljLmhvc3RuYW1lXCIsXG4gICAgICAgICAgICByZWdleDogL1xcYltBLVphLXowLTldW0EtWmEtejAtOVxcLV0qKD86XFwuW0EtWmEtejAtOV1bQS1aYS16MC05XFwtXSopK1xcYi9cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5udW1lcmljLmludGVnZXIuaGV4YWRlY2ltYWxcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXFxiMHhbMC05YS1mQS1GXStcXGIvXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQubnVtZXJpYy5pbnRlZ2VyLmRlY2ltYWxcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXFxiXFxkK1xcYi9cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbjogXCJrZXl3b3JkLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICByZWdleDogLz09fCE9fDw9fDx8Pj18Pi9cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbjogXCJrZXl3b3JkLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICByZWdleDogLygmJil8KFxcfFxcfCl8KCEpL1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuOiBcImtleXdvcmQub3BlcmF0b3JcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvPXxcXCs9fC09L1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuOiBcImtleXdvcmQub3BlcmF0b3JcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXFwrXFwrfFxcK3wtLXwtfFxcKnxcXC98JS9cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbjogXCJrZXl3b3JkLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICByZWdleDogLyZ8XFx8fFxcXnx+L1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuOiBcImtleXdvcmQub3BlcmF0b3JcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXFxiKD86aW58YXN8aXMpXFxiL1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuOiBcInB1bmN0dWF0aW9uLnRlcm1pbmF0b3JcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvOy9cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbjogXCJwdW5jdHVhdGlvbi5hY2Nlc3NvclwiLFxuICAgICAgICAgICAgcmVnZXg6IC9cXD8/XFwkL1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuOiBcInB1bmN0dWF0aW9uLmFjY2Vzc29yXCIsXG4gICAgICAgICAgICByZWdleDogLzo6L1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuOiBcImtleXdvcmQub3BlcmF0b3JcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXFw/L1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIFVuc3VyZSBob3cgdG8gdGVsbCBpZiBjb2xvbiBpcyB1c2VkIGFzIG9wZXJhdG9yIHZzLiBzZXBhcmF0b3IuXG4gICAgICAgICAgICAvLyB7XG4gICAgICAgICAgICAvLyB0b2tlbjogXCJrZXl3b3JkLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICAvLyByZWdleDogLzovXG4gICAgICAgICAgICAvLyB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgdG9rZW46IFwicHVuY3R1YXRpb24uc2VwYXJhdG9yXCIsXG4gICAgICAgICAgICByZWdleDogLzovXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgdG9rZW46IFwicHVuY3R1YXRpb24uc2VwYXJhdG9yXCIsXG4gICAgICAgICAgICByZWdleDogLywvXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgdG9rZW46IFtcbiAgICAgICAgICAgICAgICBcImtleXdvcmQub3RoZXJcIixcbiAgICAgICAgICAgICAgICBcIm1ldGEubmFtZXNwYWNlXCIsXG4gICAgICAgICAgICAgICAgXCJlbnRpdHkubmFtZS5uYW1lc3BhY2VcIlxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHJlZ2V4OiAvKG1vZHVsZSkoXFxzKykoW0EtWmEtel9dW0EtWmEtel8wLTldKig/Ojo6W0EtWmEtel9dW0EtWmEtel8wLTldKikqKS9cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbjogXCJrZXl3b3JkLm90aGVyXCIsXG4gICAgICAgICAgICByZWdleDogL1xcYmV4cG9ydFxcYi9cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbjogXCJrZXl3b3JkLmNvbnRyb2wuY29uZGl0aW9uYWxcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXFxiKD86aWZ8ZWxzZSlcXGIvXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgdG9rZW46IFwia2V5d29yZC5jb250cm9sXCIsXG4gICAgICAgICAgICByZWdleDogL1xcYig/OmZvcnx3aGlsZSlcXGIvXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgdG9rZW46IFwia2V5d29yZC5jb250cm9sXCIsXG4gICAgICAgICAgICByZWdleDogL1xcYig/OnJldHVybnxicmVha3xuZXh0fGNvbnRpbnVlfGZhbGx0aHJvdWdoKVxcYi9cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbjogXCJrZXl3b3JkLmNvbnRyb2xcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXFxiKD86c3dpdGNofGRlZmF1bHR8Y2FzZSlcXGIvXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgdG9rZW46IFwia2V5d29yZC5vdGhlclwiLFxuICAgICAgICAgICAgcmVnZXg6IC9cXGIoPzphZGR8ZGVsZXRlKVxcYi9cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbjogXCJrZXl3b3JkLm90aGVyXCIsXG4gICAgICAgICAgICByZWdleDogL1xcYnByaW50XFxiL1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuOiBcImtleXdvcmQuY29udHJvbFwiLFxuICAgICAgICAgICAgcmVnZXg6IC9cXGIoPzp3aGVufHRpbWVvdXR8c2NoZWR1bGUpXFxiL1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuOiBbXG4gICAgICAgICAgICAgICAgXCJrZXl3b3JkLm90aGVyXCIsXG4gICAgICAgICAgICAgICAgXCJtZXRhLnN0cnVjdC5yZWNvcmRcIixcbiAgICAgICAgICAgICAgICBcImVudGl0eS5uYW1lLnN0cnVjdC5yZWNvcmRcIixcbiAgICAgICAgICAgICAgICBcIm1ldGEuc3RydWN0LnJlY29yZFwiLFxuICAgICAgICAgICAgICAgIFwicHVuY3R1YXRpb24uc2VwYXJhdG9yXCIsXG4gICAgICAgICAgICAgICAgXCJtZXRhLnN0cnVjdC5yZWNvcmRcIixcbiAgICAgICAgICAgICAgICBcInN0b3JhZ2UudHlwZS5zdHJ1Y3QucmVjb3JkXCJcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICByZWdleDogL1xcYih0eXBlKShcXHMrKShbQS1aYS16X11bQS1aYS16XzAtOV0qKD86OjpbQS1aYS16X11bQS1aYS16XzAtOV0qKSopKFxccyopKDopKFxccypcXGIpKHJlY29yZClcXGIvXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgdG9rZW46IFtcbiAgICAgICAgICAgICAgICBcImtleXdvcmQub3RoZXJcIixcbiAgICAgICAgICAgICAgICBcIm1ldGEuZW51bVwiLFxuICAgICAgICAgICAgICAgIFwiZW50aXR5Lm5hbWUuZW51bVwiLFxuICAgICAgICAgICAgICAgIFwibWV0YS5lbnVtXCIsXG4gICAgICAgICAgICAgICAgXCJwdW5jdHVhdGlvbi5zZXBhcmF0b3JcIixcbiAgICAgICAgICAgICAgICBcIm1ldGEuZW51bVwiLFxuICAgICAgICAgICAgICAgIFwic3RvcmFnZS50eXBlLmVudW1cIlxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHJlZ2V4OiAvXFxiKHR5cGUpKFxccyspKFtBLVphLXpfXVtBLVphLXpfMC05XSooPzo6OltBLVphLXpfXVtBLVphLXpfMC05XSopKikoXFxzKikoOikoXFxzKlxcYikoZW51bSlcXGIvXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgdG9rZW46IFtcbiAgICAgICAgICAgICAgICBcImtleXdvcmQub3RoZXJcIixcbiAgICAgICAgICAgICAgICBcIm1ldGEudHlwZVwiLFxuICAgICAgICAgICAgICAgIFwiZW50aXR5Lm5hbWUudHlwZVwiLFxuICAgICAgICAgICAgICAgIFwibWV0YS50eXBlXCIsXG4gICAgICAgICAgICAgICAgXCJwdW5jdHVhdGlvbi5zZXBhcmF0b3JcIlxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHJlZ2V4OiAvXFxiKHR5cGUpKFxccyspKFtBLVphLXpfXVtBLVphLXpfMC05XSooPzo6OltBLVphLXpfXVtBLVphLXpfMC05XSopKikoXFxzKikoOikvXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgdG9rZW46IFtcbiAgICAgICAgICAgICAgICBcImtleXdvcmQub3RoZXJcIixcbiAgICAgICAgICAgICAgICBcIm1ldGEuc3RydWN0LnJlY29yZFwiLFxuICAgICAgICAgICAgICAgIFwic3RvcmFnZS50eXBlLnN0cnVjdC5yZWNvcmRcIixcbiAgICAgICAgICAgICAgICBcIm1ldGEuc3RydWN0LnJlY29yZFwiLFxuICAgICAgICAgICAgICAgIFwiZW50aXR5Lm5hbWUuc3RydWN0LnJlY29yZFwiXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgcmVnZXg6IC9cXGIocmVkZWYpKFxccyspKHJlY29yZCkoXFxzKykoW0EtWmEtel9dW0EtWmEtel8wLTldKig/Ojo6W0EtWmEtel9dW0EtWmEtel8wLTldKikqKVxcYi9cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbjogW1xuICAgICAgICAgICAgICAgIFwia2V5d29yZC5vdGhlclwiLFxuICAgICAgICAgICAgICAgIFwibWV0YS5lbnVtXCIsXG4gICAgICAgICAgICAgICAgXCJzdG9yYWdlLnR5cGUuZW51bVwiLFxuICAgICAgICAgICAgICAgIFwibWV0YS5lbnVtXCIsXG4gICAgICAgICAgICAgICAgXCJlbnRpdHkubmFtZS5lbnVtXCJcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICByZWdleDogL1xcYihyZWRlZikoXFxzKykoZW51bSkoXFxzKykoW0EtWmEtel9dW0EtWmEtel8wLTldKig/Ojo6W0EtWmEtel9dW0EtWmEtel8wLTldKikqKVxcYi9cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbjogW1xuICAgICAgICAgICAgICAgIFwic3RvcmFnZS50eXBlXCIsXG4gICAgICAgICAgICAgICAgXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgXCJlbnRpdHkubmFtZS5mdW5jdGlvbi5ldmVudFwiXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgcmVnZXg6IC9cXGIoZXZlbnQpKFxccyspKFtBLVphLXpfXVtBLVphLXpfMC05XSooPzo6OltBLVphLXpfXVtBLVphLXpfMC05XSopKikoPz1zKlxcKCkvXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgdG9rZW46IFtcbiAgICAgICAgICAgICAgICBcInN0b3JhZ2UudHlwZVwiLFxuICAgICAgICAgICAgICAgIFwidGV4dFwiLFxuICAgICAgICAgICAgICAgIFwiZW50aXR5Lm5hbWUuZnVuY3Rpb24uaG9va1wiXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgcmVnZXg6IC9cXGIoaG9vaykoXFxzKykoW0EtWmEtel9dW0EtWmEtel8wLTldKig/Ojo6W0EtWmEtel9dW0EtWmEtel8wLTldKikqKSg/PXMqXFwoKS9cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbjogW1xuICAgICAgICAgICAgICAgIFwic3RvcmFnZS50eXBlXCIsXG4gICAgICAgICAgICAgICAgXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgXCJlbnRpdHkubmFtZS5mdW5jdGlvblwiXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgcmVnZXg6IC9cXGIoZnVuY3Rpb24pKFxccyspKFtBLVphLXpfXVtBLVphLXpfMC05XSooPzo6OltBLVphLXpfXVtBLVphLXpfMC05XSopKikoPz1zKlxcKCkvXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgdG9rZW46IFwia2V5d29yZC5vdGhlclwiLFxuICAgICAgICAgICAgcmVnZXg6IC9cXGJyZWRlZlxcYi9cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbjogXCJzdG9yYWdlLnR5cGVcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXFxiYW55XFxiL1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuOiBcInN0b3JhZ2UudHlwZVwiLFxuICAgICAgICAgICAgcmVnZXg6IC9cXGIoPzplbnVtfHJlY29yZHxzZXR8dGFibGV8dmVjdG9yKVxcYi9cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbjogW1xuICAgICAgICAgICAgICAgIFwic3RvcmFnZS50eXBlXCIsXG4gICAgICAgICAgICAgICAgXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgXCJrZXl3b3JkLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICAgICAgXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgXCJzdG9yYWdlLnR5cGVcIlxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHJlZ2V4OiAvXFxiKG9wYXF1ZSkoXFxzKykob2YpKFxccyspKFtBLVphLXpfXVtBLVphLXpfMC05XSooPzo6OltBLVphLXpfXVtBLVphLXpfMC05XSopKilcXGIvXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgdG9rZW46IFwia2V5d29yZC5vcGVyYXRvclwiLFxuICAgICAgICAgICAgcmVnZXg6IC9cXGJvZlxcYi9cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbjogXCJzdG9yYWdlLnR5cGVcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXFxiKD86YWRkcnxib29sfGNvdW50fGRvdWJsZXxmaWxlfGludHxpbnRlcnZhbHxwYXR0ZXJufHBvcnR8c3RyaW5nfHN1Ym5ldHx0aW1lKVxcYi9cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbjogXCJzdG9yYWdlLnR5cGVcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXFxiKD86ZnVuY3Rpb258aG9va3xldmVudClcXGIvXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgdG9rZW46IFwic3RvcmFnZS5tb2RpZmllclwiLFxuICAgICAgICAgICAgcmVnZXg6IC9cXGIoPzpnbG9iYWx8bG9jYWx8Y29uc3R8b3B0aW9uKVxcYi9cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbjogXCJlbnRpdHkubmFtZS5mdW5jdGlvbi5jYWxsXCIsXG4gICAgICAgICAgICByZWdleDogL1xcYltBLVphLXpfXVtBLVphLXpfMC05XSooPzo6OltBLVphLXpfXVtBLVphLXpfMC05XSopKig/PXMqXFwoKS9cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbjogXCJwdW5jdHVhdGlvbi5zZWN0aW9uLmJsb2NrLmJlZ2luXCIsXG4gICAgICAgICAgICByZWdleDogL1xcey9cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbjogXCJwdW5jdHVhdGlvbi5zZWN0aW9uLmJsb2NrLmVuZFwiLFxuICAgICAgICAgICAgcmVnZXg6IC9cXH0vXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgdG9rZW46IFwicHVuY3R1YXRpb24uc2VjdGlvbi5icmFja2V0cy5iZWdpblwiLFxuICAgICAgICAgICAgcmVnZXg6IC9cXFsvXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgdG9rZW46IFwicHVuY3R1YXRpb24uc2VjdGlvbi5icmFja2V0cy5lbmRcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXFxdL1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuOiBcInB1bmN0dWF0aW9uLnNlY3Rpb24ucGFyZW5zLmJlZ2luXCIsXG4gICAgICAgICAgICByZWdleDogL1xcKC9cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbjogXCJwdW5jdHVhdGlvbi5zZWN0aW9uLnBhcmVucy5lbmRcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXFwpL1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIF0sIC8vIHN0YXRlOiBzdGFydFxuXG4gICAgICAgIFwic3RyaW5nLXN0YXRlXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50LmNoYXJhY3Rlci5lc2NhcGVcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXFxcXC4vXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nLmRvdWJsZVwiLFxuICAgICAgICAgICAgcmVnZXg6IC9cIi8sXG4gICAgICAgICAgICBuZXh0OiBcInN0YXJ0XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5vdGhlci5wbGFjZWhvbGRlclwiLFxuICAgICAgICAgICAgcmVnZXg6IC8lLT9bMC05XSooXFwuWzAtOV0rKT9bRFRkeHNlZmddL1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuOiBcInN0cmluZy5kb3VibGVcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIi5cIlxuICAgICAgICAgICAgfVxuICAgICAgICBdLCAvLyBzdGF0ZTogc3RyaW5nLXN0YXRlXG5cbiAgICAgICAgXCJwYXR0ZXJuLXN0YXRlXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50LmNoYXJhY3Rlci5lc2NhcGVcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXFxcXC4vXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nLnJlZ2V4cFwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiL1wiLFxuICAgICAgICAgICAgbmV4dDogXCJzdGFydFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nLnJlZ2V4cFwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiLlwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF0gLy8gc3RhdGU6IHBhdHRlcm4tc3RhdGVcblxuICAgIH07XG5cbiAgICB0aGlzLm5vcm1hbGl6ZVJ1bGVzKCk7XG59O1xuXG5aZWVrSGlnaGxpZ2h0UnVsZXMubWV0YURhdGEgPSB7XG4gICAgZmlsZVR5cGVzOiBbXCJicm9cIiwgXCJ6ZWVrXCJdLFxuICAgIG5hbWU6IFwiWmVla1wiLFxuICAgIHNjb3BlTmFtZTogXCJzb3VyY2UuemVla1wiXG59O1xuXG5cbm9vcC5pbmhlcml0cyhaZWVrSGlnaGxpZ2h0UnVsZXMsIFRleHRIaWdobGlnaHRSdWxlcyk7XG5cbmV4cG9ydHMuWmVla0hpZ2hsaWdodFJ1bGVzID0gWmVla0hpZ2hsaWdodFJ1bGVzO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9