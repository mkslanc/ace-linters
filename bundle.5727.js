"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[5727],{

/***/ 62718:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var TextHighlightRules = (__webpack_require__(28053)/* .TextHighlightRules */ .K);

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


exports.c = DocCommentHighlightRules;


/***/ }),

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

/***/ 25727:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/*
  THIS FILE WAS AUTOGENERATED BY mode.tmpl.js
*/



var oop = __webpack_require__(89359);
var TextMode = (__webpack_require__(98030).Mode);
var RustHighlightRules = (__webpack_require__(5278)/* .RustHighlightRules */ .q);
var FoldMode = (__webpack_require__(12764)/* .FoldMode */ .Z);

var Mode = function() {
    this.HighlightRules = RustHighlightRules;
    this.foldingRules = new FoldMode();
    this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, TextMode);

(function() {
    this.lineCommentStart = "//";
    this.blockComment = {start: "/*", end: "*/", nestable: true};
    this.$quotes = { '"': '"' };
    this.$id = "ace/mode/rust";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 5278:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* This file was autogenerated from https://raw.github.com/dbp/sublime-rust/master/Rust.tmLanguage (uuid: ) */



var oop = __webpack_require__(89359);
var TextHighlightRules = (__webpack_require__(28053)/* .TextHighlightRules */ .K);
var DocCommentHighlightRules = (__webpack_require__(62718)/* .DocCommentHighlightRules */ .c);

var stringEscape = /\\(?:[nrt0'"\\]|x[\da-fA-F]{2}|u\{[\da-fA-F]{6}\})/.source;
var wordPattern = /[a-zA-Z_\xa1-\uffff][a-zA-Z0-9_\xa1-\uffff]*/.source;
var RustHighlightRules = function() {
    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used
    var keywordMapper = this.createKeywordMapper({
        "keyword.source.rust": "abstract|alignof|as|async|await|become|box|break|catch|continue|const|crate|"
            + "default|do|dyn|else|enum|extern|for|final|if|impl|in|let|loop|macro|match|mod|move|mut|offsetof|"
            + "override|priv|proc|pub|pure|ref|return|self|sizeof|static|struct|super|trait|type|typeof|union|"
            + "unsafe|unsized|use|virtual|where|while|yield|try",
        "storage.type.source.rust": "Self|isize|usize|char|bool|u8|u16|u32|u64|u128|f16|f32|f64|i8|i16|i32|i64|"
            + "i128|str|option|either|c_float|c_double|c_void|FILE|fpos_t|DIR|dirent|c_char|c_schar|c_uchar|c_short|"
            + "c_ushort|c_int|c_uint|c_long|c_ulong|size_t|ptrdiff_t|clock_t|time_t|c_longlong|c_ulonglong|intptr_t|"
            + "uintptr_t|off_t|dev_t|ino_t|pid_t|mode_t|ssize_t",
        "constant.language.source.rust": "true|false|Some|None|Ok|Err|FALSE|TRUE",
        "support.constant.source.rust": "EXIT_FAILURE|EXIT_SUCCESS|RAND_MAX|EOF|SEEK_SET|SEEK_CUR|SEEK_END|_IOFBF|"
            + "_IONBF|_IOLBF|"
            + "BUFSIZ|FOPEN_MAX|FILENAME_MAX|L_tmpnam|TMP_MAX|O_RDONLY|O_WRONLY|O_RDWR|O_APPEND|O_CREAT|O_EXCL|O_TRUNC|"
            + "S_IFIFO|S_IFCHR|S_IFBLK|S_IFDIR|S_IFREG|S_IFMT|S_IEXEC|S_IWRITE|S_IREAD|S_IRWXU|S_IXUSR|S_IWUSR|S_IRUSR|"
            + "F_OK|R_OK|W_OK|X_OK|STDIN_FILENO|STDOUT_FILENO|STDERR_FILENO",
        "constant.language": "macro_rules|mac_variant"
    }, "identifier");

    this.$rules = {
        start: [
            {
                token: 'variable.other.source.rust', // `(?![\\\'])` to keep a lifetime name highlighting from continuing one character
                // past the name. The end `\'` will block this from matching for a character like
                // `'a'` (it should have character highlighting, not variable highlighting).
                regex: '\'' + wordPattern + '(?![\\\'])'
            }, {
                token: 'string.quoted.single.source.rust',
                regex: "'(?:[^'\\\\]|" + stringEscape + ")'"
            }, {
                token: 'identifier',
                regex: "r#" + wordPattern + "\\b"
            }, {
                stateName: "bracketedComment",
                onMatch: function (value, currentState, stack) {
                    stack.unshift(this.next, value.length - 1, currentState);
                    return "string.quoted.raw.source.rust";
                },
                regex: /r#*"/,
                next: [
                    {
                        onMatch: function (value, currentState, stack) {
                            var token = "string.quoted.raw.source.rust";
                            if (value.length >= stack[1]) {
                                if (value.length > stack[1]) token = "invalid";
                                stack.shift();
                                stack.shift();
                                this.next = stack.shift();
                            }
                            else {
                                this.next = "";
                            }
                            return token;
                        },
                        regex: /"#*/,
                        next: "start"
                    }, {
                        defaultToken: "string.quoted.raw.source.rust"
                    }
                ]
            }, {
                token: 'string.quoted.double.source.rust',
                regex: '"',
                push: [
                    {
                        token: 'string.quoted.double.source.rust',
                        regex: '"',
                        next: 'pop'
                    }, {
                        token: 'constant.character.escape.source.rust',
                        regex: stringEscape
                    }, {defaultToken: 'string.quoted.double.source.rust'}
                ]
            }, {
                token: ['keyword.source.rust', 'text', 'entity.name.function.source.rust', 'punctuation'],
                regex: '\\b(fn)(\\s+)((?:r#)?' + wordPattern + ')(<)(?!<)',
                push: "generics"
            }, {
                token: ['keyword.source.rust', 'text', 'entity.name.function.source.rust'],
                regex: '\\b(fn)(\\s+)((?:r#)?' + wordPattern + ')'
            }, {
                token: ['support.constant', "punctuation"],
                regex: "(" + wordPattern + '::)(<)(?!<)',
                push: "generics"
            }, {
                token: 'support.constant',
                regex: wordPattern + '::'
            }, {
                token: 'variable.language.source.rust',
                regex: '\\bself\\b'
            }, DocCommentHighlightRules.getStartRule("doc-start"), {
                token: 'comment.line.doc.source.rust',
                regex: '///.*$'
            }, {
                token: 'comment.line.doc.source.rust',
                regex: '//!.*$'
            }, {
                token: 'comment.line.double-dash.source.rust',
                regex: '//.*$'
            }, {
                token: 'comment.start.block.source.rust',
                regex: '/\\*',
                stateName: 'comment',
                push: [
                    {
                        token: 'comment.start.block.source.rust',
                        regex: '/\\*',
                        push: 'comment'
                    }, {
                        token: 'comment.end.block.source.rust',
                        regex: '\\*/',
                        next: 'pop'
                    }, {defaultToken: 'comment.block.source.rust'}
                ]
            }, {
                token: ["keyword.source.rust", "identifier", "punctuaction"],
                regex: "(?:(impl)|(" + wordPattern + "))(<)(?!<)",
                stateName: 'generics',
                push: [
                    {
                        token: 'keyword.operator',
                        regex: /<<|=/
                    }, {
                        token: "punctuaction",
                        regex: "<(?!<)",
                        push: "generics"
                    }, {
                        token: 'variable.other.source.rust', // `(?![\\\'])` to keep a lifetime name highlighting from continuing one character
                        // past the name. The end `\'` will block this from matching for a character like
                        // `'a'` (it should have character highlighting, not variable highlighting).
                        regex: '\'' + wordPattern + '(?![\\\'])'
                    }, {
                        token: "storage.type.source.rust",
                        regex: "\\b(u8|u16|u32|u64|u128|usize|i8|i16|i32|i64|i128|isize|char|bool)\\b"
                    }, {
                        token: "keyword",
                        regex: "\\b(?:const|dyn)\\b"
                    }, {
                        token: "punctuation",
                        regex: ">",
                        next: "pop"
                    }, 
                    {include: "punctuation"},
                    {include: "operators"},
                    {include: "constants"},
                    {
                        token: "identifier",
                        regex: "\\b"+wordPattern+"\\b"
                    }
                ]
            }, {
                token: keywordMapper,
                regex: wordPattern
            }, {
                token: 'meta.preprocessor.source.rust',
                regex: '\\b\\w\\(\\w\\)*!|#\\[[\\w=\\(\\)_]+\\]\\b'
            }, 
            {include: "punctuation"},
            {include: "operators"},
            {include: "constants"}
        ],
        punctuation: [
            {
                token: "paren.lparen",
                regex: /[\[({]/
            }, {
                token: "paren.rparen",
                regex: /[\])}]/
            }, {
                token: "punctuation.operator",
                regex: /[?:,;.]/
            }
        ],
        operators: [
            {
                token: 'keyword.operator', // `[*/](?![*/])=?` is separated because `//` and `/* */` become comments and must be
                // guarded against. This states either `*` or `/` may be matched as long as the match
                // it isn't followed by either of the two. An `=` may be on the end.
                regex: /\$|[-=]>|[-+%^=!&|<>]=?|[*/](?![*/])=?/
            }
        ],
        constants: [
            {
                token: 'constant.numeric.source.rust',
                regex: /\b(?:0x[a-fA-F0-9_]+|0o[0-7_]+|0b[01_]+|[0-9][0-9_]*(?!\.))(?:[iu](?:size|8|16|32|64|128))?\b/
            }, {
                token: 'constant.numeric.source.rust',
                regex: /\b(?:[0-9][0-9_]*)(?:\.[0-9][0-9_]*)?(?:[Ee][+-][0-9][0-9_]*)?(?:f32|f64)?\b/
            }
        ]
    };

    this.embedRules(DocCommentHighlightRules, "doc-",
        [ DocCommentHighlightRules.getEndRule("start") ]);
    this.normalizeRules();
};

RustHighlightRules.metaData = { fileTypes: [ 'rs', 'rc' ],
      foldingStartMarker: '^.*\\bfn\\s*(\\w+\\s*)?\\([^\\)]*\\)(\\s*\\{[^\\}]*)?\\s*$',
      foldingStopMarker: '^\\s*\\}',
      name: 'Rust',
      scopeName: 'source.rust' };


oop.inherits(RustHighlightRules, TextHighlightRules);

exports.q = RustHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGdDQUFnQztBQUNoQyx1RUFBdUUsS0FBSztBQUM1RSxrQ0FBa0M7QUFDbEM7QUFDQTs7O0FBR0E7O0FBRUEsU0FBMEIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2RvY19jb21tZW50X2hpZ2hsaWdodF9ydWxlcy5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2ZvbGRpbmcvY3N0eWxlLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvcnVzdC5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL3J1c3RfaGlnaGxpZ2h0X3J1bGVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xuXG52YXIgRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuJHJ1bGVzID0ge1xuICAgICAgICBcInN0YXJ0XCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJjb21tZW50LmRvYy50YWdcIixcbiAgICAgICAgICAgICAgICByZWdleDogXCJAXFxcXHcrKD89XFxcXHN8JClcIlxuICAgICAgICAgICAgfSwgRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLmdldFRhZ1J1bGUoKSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJjb21tZW50LmRvYy5ib2R5XCIsXG4gICAgICAgICAgICAgICAgY2FzZUluc2Vuc2l0aXZlOiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9O1xufTtcblxub29wLmluaGVyaXRzKERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLmdldFRhZ1J1bGUgPSBmdW5jdGlvbihzdGFydCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHRva2VuIDogXCJjb21tZW50LmRvYy50YWcuc3RvcmFnZS50eXBlXCIsXG4gICAgICAgIHJlZ2V4IDogXCJcXFxcYig/OlRPRE98RklYTUV8WFhYfEhBQ0spXFxcXGJcIlxuICAgIH07XG59O1xuXG5Eb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMuZ2V0U3RhcnRSdWxlID0gZnVuY3Rpb24oc3RhcnQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0b2tlbiA6IFwiY29tbWVudC5kb2NcIiwgLy8gZG9jIGNvbW1lbnRcbiAgICAgICAgcmVnZXg6IC9cXC9cXCpcXCooPyFcXC8pLyxcbiAgICAgICAgbmV4dCAgOiBzdGFydFxuICAgIH07XG59O1xuXG5Eb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMuZ2V0RW5kUnVsZSA9IGZ1bmN0aW9uIChzdGFydCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHRva2VuIDogXCJjb21tZW50LmRvY1wiLCAvLyBjbG9zaW5nIGNvbW1lbnRcbiAgICAgICAgcmVnZXggOiBcIlxcXFwqXFxcXC9cIixcbiAgICAgICAgbmV4dCAgOiBzdGFydFxuICAgIH07XG59O1xuXG5cbmV4cG9ydHMuRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzID0gRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vLi4vbGliL29vcFwiKTtcbnZhciBSYW5nZSA9IHJlcXVpcmUoXCIuLi8uLi9yYW5nZVwiKS5SYW5nZTtcbnZhciBCYXNlRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9mb2xkX21vZGVcIikuRm9sZE1vZGU7XG5cbnZhciBGb2xkTW9kZSA9IGV4cG9ydHMuRm9sZE1vZGUgPSBmdW5jdGlvbihjb21tZW50UmVnZXgpIHtcbiAgICBpZiAoY29tbWVudFJlZ2V4KSB7XG4gICAgICAgIHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyID0gbmV3IFJlZ0V4cChcbiAgICAgICAgICAgIHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyLnNvdXJjZS5yZXBsYWNlKC9cXHxbXnxdKj8kLywgXCJ8XCIgKyBjb21tZW50UmVnZXguc3RhcnQpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIgPSBuZXcgUmVnRXhwKFxuICAgICAgICAgICAgdGhpcy5mb2xkaW5nU3RvcE1hcmtlci5zb3VyY2UucmVwbGFjZSgvXFx8W158XSo/JC8sIFwifFwiICsgY29tbWVudFJlZ2V4LmVuZClcbiAgICAgICAgKTtcbiAgICB9XG59O1xub29wLmluaGVyaXRzKEZvbGRNb2RlLCBCYXNlRm9sZE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgXG4gICAgdGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIgPSAvKFtcXHtcXFtcXChdKVteXFx9XFxdXFwpXSokfF5cXHMqKFxcL1xcKikvO1xuICAgIHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIgPSAvXlteXFxbXFx7XFwoXSooW1xcfVxcXVxcKV0pfF5bXFxzXFwqXSooXFwqXFwvKS87XG4gICAgdGhpcy5zaW5nbGVMaW5lQmxvY2tDb21tZW50UmU9IC9eXFxzKihcXC9cXCopLipcXCpcXC9cXHMqJC87XG4gICAgdGhpcy50cmlwbGVTdGFyQmxvY2tDb21tZW50UmUgPSAvXlxccyooXFwvXFwqXFwqXFwqKS4qXFwqXFwvXFxzKiQvO1xuICAgIHRoaXMuc3RhcnRSZWdpb25SZSA9IC9eXFxzKihcXC9cXCp8XFwvXFwvKSM/cmVnaW9uXFxiLztcbiAgICBcbiAgICAvL3ByZXZlbnQgbmFtaW5nIGNvbmZsaWN0IHdpdGggYW55IG1vZGVzIHRoYXQgaW5oZXJpdCBmcm9tIGNzdHlsZSBhbmQgb3ZlcnJpZGUgdGhpcyAobGlrZSBjc2hhcnApXG4gICAgdGhpcy5fZ2V0Rm9sZFdpZGdldEJhc2UgPSB0aGlzLmdldEZvbGRXaWRnZXQ7XG4gICAgXG4gICAgLyoqXG4gICAgICogR2V0cyBmb2xkIHdpZGdldCB3aXRoIHNvbWUgbm9uLXN0YW5kYXJkIGV4dHJhczpcbiAgICAgKlxuICAgICAqIEBleGFtcGxlIGxpbmVDb21tZW50UmVnaW9uU3RhcnRcbiAgICAgKiAgICAgIC8vI3JlZ2lvbiBbb3B0aW9uYWwgZGVzY3JpcHRpb25dXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSBibG9ja0NvbW1lbnRSZWdpb25TdGFydFxuICAgICAqICAgICAgLyojcmVnaW9uIFtvcHRpb25hbCBkZXNjcmlwdGlvbl0gKlsvXVxuICAgICAqXG4gICAgICogQGV4YW1wbGUgdHJpcGxlU3RhckZvbGRpbmdTZWN0aW9uXG4gICAgICogICAgICAvKioqIHRoaXMgZm9sZHMgZXZlbiB0aG91Z2ggMSBsaW5lIGJlY2F1c2UgaXQgaGFzIDMgc3RhcnMgKioqWy9dXG4gICAgICogXG4gICAgICogQG5vdGUgdGhlIHBvdW5kIHN5bWJvbCBmb3IgcmVnaW9uIHRhZ3MgaXMgb3B0aW9uYWxcbiAgICAgKi9cbiAgICB0aGlzLmdldEZvbGRXaWRnZXQgPSBmdW5jdGlvbihzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdykge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgIFxuICAgICAgICBpZiAodGhpcy5zaW5nbGVMaW5lQmxvY2tDb21tZW50UmUudGVzdChsaW5lKSkge1xuICAgICAgICAgICAgLy8gTm8gd2lkZ2V0IGZvciBzaW5nbGUgbGluZSBibG9jayBjb21tZW50IHVubGVzcyByZWdpb24gb3IgdHJpcGxlIHN0YXJcbiAgICAgICAgICAgIGlmICghdGhpcy5zdGFydFJlZ2lvblJlLnRlc3QobGluZSkgJiYgIXRoaXMudHJpcGxlU3RhckJsb2NrQ29tbWVudFJlLnRlc3QobGluZSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgdmFyIGZ3ID0gdGhpcy5fZ2V0Rm9sZFdpZGdldEJhc2Uoc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpO1xuICAgIFxuICAgICAgICBpZiAoIWZ3ICYmIHRoaXMuc3RhcnRSZWdpb25SZS50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgcmV0dXJuIFwic3RhcnRcIjsgLy8gbGluZUNvbW1lbnRSZWdpb25TdGFydFxuICAgIFxuICAgICAgICByZXR1cm4gZnc7XG4gICAgfTtcblxuICAgIHRoaXMuZ2V0Rm9sZFdpZGdldFJhbmdlID0gZnVuY3Rpb24oc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3csIGZvcmNlTXVsdGlsaW5lKSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5zdGFydFJlZ2lvblJlLnRlc3QobGluZSkpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRDb21tZW50UmVnaW9uQmxvY2soc2Vzc2lvbiwgbGluZSwgcm93KTtcbiAgICAgICAgXG4gICAgICAgIHZhciBtYXRjaCA9IGxpbmUubWF0Y2godGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIpO1xuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIHZhciBpID0gbWF0Y2guaW5kZXg7XG5cbiAgICAgICAgICAgIGlmIChtYXRjaFsxXSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5vcGVuaW5nQnJhY2tldEJsb2NrKHNlc3Npb24sIG1hdGNoWzFdLCByb3csIGkpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIHJhbmdlID0gc2Vzc2lvbi5nZXRDb21tZW50Rm9sZFJhbmdlKHJvdywgaSArIG1hdGNoWzBdLmxlbmd0aCwgMSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChyYW5nZSAmJiAhcmFuZ2UuaXNNdWx0aUxpbmUoKSkge1xuICAgICAgICAgICAgICAgIGlmIChmb3JjZU11bHRpbGluZSkge1xuICAgICAgICAgICAgICAgICAgICByYW5nZSA9IHRoaXMuZ2V0U2VjdGlvblJhbmdlKHNlc3Npb24sIHJvdyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChmb2xkU3R5bGUgIT0gXCJhbGxcIilcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2UgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gcmFuZ2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZm9sZFN0eWxlID09PSBcIm1hcmtiZWdpblwiKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHZhciBtYXRjaCA9IGxpbmUubWF0Y2godGhpcy5mb2xkaW5nU3RvcE1hcmtlcik7XG4gICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgdmFyIGkgPSBtYXRjaC5pbmRleCArIG1hdGNoWzBdLmxlbmd0aDtcblxuICAgICAgICAgICAgaWYgKG1hdGNoWzFdKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNsb3NpbmdCcmFja2V0QmxvY2soc2Vzc2lvbiwgbWF0Y2hbMV0sIHJvdywgaSk7XG5cbiAgICAgICAgICAgIHJldHVybiBzZXNzaW9uLmdldENvbW1lbnRGb2xkUmFuZ2Uocm93LCBpLCAtMSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFxuICAgIHRoaXMuZ2V0U2VjdGlvblJhbmdlID0gZnVuY3Rpb24oc2Vzc2lvbiwgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgIHZhciBzdGFydEluZGVudCA9IGxpbmUuc2VhcmNoKC9cXFMvKTtcbiAgICAgICAgdmFyIHN0YXJ0Um93ID0gcm93O1xuICAgICAgICB2YXIgc3RhcnRDb2x1bW4gPSBsaW5lLmxlbmd0aDtcbiAgICAgICAgcm93ID0gcm93ICsgMTtcbiAgICAgICAgdmFyIGVuZFJvdyA9IHJvdztcbiAgICAgICAgdmFyIG1heFJvdyA9IHNlc3Npb24uZ2V0TGVuZ3RoKCk7XG4gICAgICAgIHdoaWxlICgrK3JvdyA8IG1heFJvdykge1xuICAgICAgICAgICAgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICAgICAgdmFyIGluZGVudCA9IGxpbmUuc2VhcmNoKC9cXFMvKTtcbiAgICAgICAgICAgIGlmIChpbmRlbnQgPT09IC0xKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgaWYgIChzdGFydEluZGVudCA+IGluZGVudClcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIHZhciBzdWJSYW5nZSA9IHRoaXMuZ2V0Rm9sZFdpZGdldFJhbmdlKHNlc3Npb24sIFwiYWxsXCIsIHJvdyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChzdWJSYW5nZSkge1xuICAgICAgICAgICAgICAgIGlmIChzdWJSYW5nZS5zdGFydC5yb3cgPD0gc3RhcnRSb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzdWJSYW5nZS5pc011bHRpTGluZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJvdyA9IHN1YlJhbmdlLmVuZC5yb3c7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzdGFydEluZGVudCA9PSBpbmRlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZW5kUm93ID0gcm93O1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gbmV3IFJhbmdlKHN0YXJ0Um93LCBzdGFydENvbHVtbiwgZW5kUm93LCBzZXNzaW9uLmdldExpbmUoZW5kUm93KS5sZW5ndGgpO1xuICAgIH07XG4gICAgXG4gICAgLyoqXG4gICAgICogZ2V0cyBjb21tZW50IHJlZ2lvbiBibG9jayB3aXRoIGVuZCByZWdpb24gYXNzdW1lZCB0byBiZSBzdGFydCBvZiBjb21tZW50IGluIGFueSBjc3R5bGUgbW9kZSBvciBTUUwgbW9kZSAoLS0pIHdoaWNoIGluaGVyaXRzIGZyb20gdGhpcy5cbiAgICAgKiBUaGVyZSBtYXkgb3B0aW9uYWxseSBiZSBhIHBvdW5kIHN5bWJvbCBiZWZvcmUgdGhlIHJlZ2lvbi9lbmRyZWdpb24gc3RhdGVtZW50XG4gICAgICovXG4gICAgdGhpcy5nZXRDb21tZW50UmVnaW9uQmxvY2sgPSBmdW5jdGlvbihzZXNzaW9uLCBsaW5lLCByb3cpIHtcbiAgICAgICAgdmFyIHN0YXJ0Q29sdW1uID0gbGluZS5zZWFyY2goL1xccyokLyk7XG4gICAgICAgIHZhciBtYXhSb3cgPSBzZXNzaW9uLmdldExlbmd0aCgpO1xuICAgICAgICB2YXIgc3RhcnRSb3cgPSByb3c7XG4gICAgICAgIFxuICAgICAgICB2YXIgcmUgPSAvXlxccyooPzpcXC9cXCp8XFwvXFwvfC0tKSM/KGVuZCk/cmVnaW9uXFxiLztcbiAgICAgICAgdmFyIGRlcHRoID0gMTtcbiAgICAgICAgd2hpbGUgKCsrcm93IDwgbWF4Um93KSB7XG4gICAgICAgICAgICBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgICAgICB2YXIgbSA9IHJlLmV4ZWMobGluZSk7XG4gICAgICAgICAgICBpZiAoIW0pIGNvbnRpbnVlO1xuICAgICAgICAgICAgaWYgKG1bMV0pIGRlcHRoLS07XG4gICAgICAgICAgICBlbHNlIGRlcHRoKys7XG5cbiAgICAgICAgICAgIGlmICghZGVwdGgpIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGVuZFJvdyA9IHJvdztcbiAgICAgICAgaWYgKGVuZFJvdyA+IHN0YXJ0Um93KSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFJhbmdlKHN0YXJ0Um93LCBzdGFydENvbHVtbiwgZW5kUm93LCBsaW5lLmxlbmd0aCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG59KS5jYWxsKEZvbGRNb2RlLnByb3RvdHlwZSk7XG4iLCIvKlxuICBUSElTIEZJTEUgV0FTIEFVVE9HRU5FUkFURUQgQlkgbW9kZS50bXBsLmpzXG4qL1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRNb2RlID0gcmVxdWlyZShcIi4vdGV4dFwiKS5Nb2RlO1xudmFyIFJ1c3RIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3J1c3RfaGlnaGxpZ2h0X3J1bGVzXCIpLlJ1c3RIaWdobGlnaHRSdWxlcztcbnZhciBGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRpbmcvY3N0eWxlXCIpLkZvbGRNb2RlO1xuXG52YXIgTW9kZSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuSGlnaGxpZ2h0UnVsZXMgPSBSdXN0SGlnaGxpZ2h0UnVsZXM7XG4gICAgdGhpcy5mb2xkaW5nUnVsZXMgPSBuZXcgRm9sZE1vZGUoKTtcbiAgICB0aGlzLiRiZWhhdmlvdXIgPSB0aGlzLiRkZWZhdWx0QmVoYXZpb3VyO1xufTtcbm9vcC5pbmhlcml0cyhNb2RlLCBUZXh0TW9kZSk7XG5cbihmdW5jdGlvbigpIHtcbiAgICB0aGlzLmxpbmVDb21tZW50U3RhcnQgPSBcIi8vXCI7XG4gICAgdGhpcy5ibG9ja0NvbW1lbnQgPSB7c3RhcnQ6IFwiLypcIiwgZW5kOiBcIiovXCIsIG5lc3RhYmxlOiB0cnVlfTtcbiAgICB0aGlzLiRxdW90ZXMgPSB7ICdcIic6ICdcIicgfTtcbiAgICB0aGlzLiRpZCA9IFwiYWNlL21vZGUvcnVzdFwiO1xufSkuY2FsbChNb2RlLnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTW9kZSA9IE1vZGU7XG4iLCIvKiBUaGlzIGZpbGUgd2FzIGF1dG9nZW5lcmF0ZWQgZnJvbSBodHRwczovL3Jhdy5naXRodWIuY29tL2RicC9zdWJsaW1lLXJ1c3QvbWFzdGVyL1J1c3QudG1MYW5ndWFnZSAodXVpZDogKSAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcbnZhciBEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9kb2NfY29tbWVudF9oaWdobGlnaHRfcnVsZXNcIikuRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzO1xuXG52YXIgc3RyaW5nRXNjYXBlID0gL1xcXFwoPzpbbnJ0MCdcIlxcXFxdfHhbXFxkYS1mQS1GXXsyfXx1XFx7W1xcZGEtZkEtRl17Nn1cXH0pLy5zb3VyY2U7XG52YXIgd29yZFBhdHRlcm4gPSAvW2EtekEtWl9cXHhhMS1cXHVmZmZmXVthLXpBLVowLTlfXFx4YTEtXFx1ZmZmZl0qLy5zb3VyY2U7XG52YXIgUnVzdEhpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24oKSB7XG4gICAgLy8gcmVnZXhwIG11c3Qgbm90IGhhdmUgY2FwdHVyaW5nIHBhcmVudGhlc2VzLiBVc2UgKD86KSBpbnN0ZWFkLlxuICAgIC8vIHJlZ2V4cHMgYXJlIG9yZGVyZWQgLT4gdGhlIGZpcnN0IG1hdGNoIGlzIHVzZWRcbiAgICB2YXIga2V5d29yZE1hcHBlciA9IHRoaXMuY3JlYXRlS2V5d29yZE1hcHBlcih7XG4gICAgICAgIFwia2V5d29yZC5zb3VyY2UucnVzdFwiOiBcImFic3RyYWN0fGFsaWdub2Z8YXN8YXN5bmN8YXdhaXR8YmVjb21lfGJveHxicmVha3xjYXRjaHxjb250aW51ZXxjb25zdHxjcmF0ZXxcIlxuICAgICAgICAgICAgKyBcImRlZmF1bHR8ZG98ZHlufGVsc2V8ZW51bXxleHRlcm58Zm9yfGZpbmFsfGlmfGltcGx8aW58bGV0fGxvb3B8bWFjcm98bWF0Y2h8bW9kfG1vdmV8bXV0fG9mZnNldG9mfFwiXG4gICAgICAgICAgICArIFwib3ZlcnJpZGV8cHJpdnxwcm9jfHB1YnxwdXJlfHJlZnxyZXR1cm58c2VsZnxzaXplb2Z8c3RhdGljfHN0cnVjdHxzdXBlcnx0cmFpdHx0eXBlfHR5cGVvZnx1bmlvbnxcIlxuICAgICAgICAgICAgKyBcInVuc2FmZXx1bnNpemVkfHVzZXx2aXJ0dWFsfHdoZXJlfHdoaWxlfHlpZWxkfHRyeVwiLFxuICAgICAgICBcInN0b3JhZ2UudHlwZS5zb3VyY2UucnVzdFwiOiBcIlNlbGZ8aXNpemV8dXNpemV8Y2hhcnxib29sfHU4fHUxNnx1MzJ8dTY0fHUxMjh8ZjE2fGYzMnxmNjR8aTh8aTE2fGkzMnxpNjR8XCJcbiAgICAgICAgICAgICsgXCJpMTI4fHN0cnxvcHRpb258ZWl0aGVyfGNfZmxvYXR8Y19kb3VibGV8Y192b2lkfEZJTEV8ZnBvc190fERJUnxkaXJlbnR8Y19jaGFyfGNfc2NoYXJ8Y191Y2hhcnxjX3Nob3J0fFwiXG4gICAgICAgICAgICArIFwiY191c2hvcnR8Y19pbnR8Y191aW50fGNfbG9uZ3xjX3Vsb25nfHNpemVfdHxwdHJkaWZmX3R8Y2xvY2tfdHx0aW1lX3R8Y19sb25nbG9uZ3xjX3Vsb25nbG9uZ3xpbnRwdHJfdHxcIlxuICAgICAgICAgICAgKyBcInVpbnRwdHJfdHxvZmZfdHxkZXZfdHxpbm9fdHxwaWRfdHxtb2RlX3R8c3NpemVfdFwiLFxuICAgICAgICBcImNvbnN0YW50Lmxhbmd1YWdlLnNvdXJjZS5ydXN0XCI6IFwidHJ1ZXxmYWxzZXxTb21lfE5vbmV8T2t8RXJyfEZBTFNFfFRSVUVcIixcbiAgICAgICAgXCJzdXBwb3J0LmNvbnN0YW50LnNvdXJjZS5ydXN0XCI6IFwiRVhJVF9GQUlMVVJFfEVYSVRfU1VDQ0VTU3xSQU5EX01BWHxFT0Z8U0VFS19TRVR8U0VFS19DVVJ8U0VFS19FTkR8X0lPRkJGfFwiXG4gICAgICAgICAgICArIFwiX0lPTkJGfF9JT0xCRnxcIlxuICAgICAgICAgICAgKyBcIkJVRlNJWnxGT1BFTl9NQVh8RklMRU5BTUVfTUFYfExfdG1wbmFtfFRNUF9NQVh8T19SRE9OTFl8T19XUk9OTFl8T19SRFdSfE9fQVBQRU5EfE9fQ1JFQVR8T19FWENMfE9fVFJVTkN8XCJcbiAgICAgICAgICAgICsgXCJTX0lGSUZPfFNfSUZDSFJ8U19JRkJMS3xTX0lGRElSfFNfSUZSRUd8U19JRk1UfFNfSUVYRUN8U19JV1JJVEV8U19JUkVBRHxTX0lSV1hVfFNfSVhVU1J8U19JV1VTUnxTX0lSVVNSfFwiXG4gICAgICAgICAgICArIFwiRl9PS3xSX09LfFdfT0t8WF9PS3xTVERJTl9GSUxFTk98U1RET1VUX0ZJTEVOT3xTVERFUlJfRklMRU5PXCIsXG4gICAgICAgIFwiY29uc3RhbnQubGFuZ3VhZ2VcIjogXCJtYWNyb19ydWxlc3xtYWNfdmFyaWFudFwiXG4gICAgfSwgXCJpZGVudGlmaWVyXCIpO1xuXG4gICAgdGhpcy4kcnVsZXMgPSB7XG4gICAgICAgIHN0YXJ0OiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW46ICd2YXJpYWJsZS5vdGhlci5zb3VyY2UucnVzdCcsIC8vIGAoPyFbXFxcXFxcJ10pYCB0byBrZWVwIGEgbGlmZXRpbWUgbmFtZSBoaWdobGlnaHRpbmcgZnJvbSBjb250aW51aW5nIG9uZSBjaGFyYWN0ZXJcbiAgICAgICAgICAgICAgICAvLyBwYXN0IHRoZSBuYW1lLiBUaGUgZW5kIGBcXCdgIHdpbGwgYmxvY2sgdGhpcyBmcm9tIG1hdGNoaW5nIGZvciBhIGNoYXJhY3RlciBsaWtlXG4gICAgICAgICAgICAgICAgLy8gYCdhJ2AgKGl0IHNob3VsZCBoYXZlIGNoYXJhY3RlciBoaWdobGlnaHRpbmcsIG5vdCB2YXJpYWJsZSBoaWdobGlnaHRpbmcpLlxuICAgICAgICAgICAgICAgIHJlZ2V4OiAnXFwnJyArIHdvcmRQYXR0ZXJuICsgJyg/IVtcXFxcXFwnXSknXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46ICdzdHJpbmcucXVvdGVkLnNpbmdsZS5zb3VyY2UucnVzdCcsXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiJyg/OlteJ1xcXFxcXFxcXXxcIiArIHN0cmluZ0VzY2FwZSArIFwiKSdcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiAnaWRlbnRpZmllcicsXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiciNcIiArIHdvcmRQYXR0ZXJuICsgXCJcXFxcYlwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgc3RhdGVOYW1lOiBcImJyYWNrZXRlZENvbW1lbnRcIixcbiAgICAgICAgICAgICAgICBvbk1hdGNoOiBmdW5jdGlvbiAodmFsdWUsIGN1cnJlbnRTdGF0ZSwgc3RhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhY2sudW5zaGlmdCh0aGlzLm5leHQsIHZhbHVlLmxlbmd0aCAtIDEsIGN1cnJlbnRTdGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcInN0cmluZy5xdW90ZWQucmF3LnNvdXJjZS5ydXN0XCI7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICByZWdleDogL3IjKlwiLyxcbiAgICAgICAgICAgICAgICBuZXh0OiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uTWF0Y2g6IGZ1bmN0aW9uICh2YWx1ZSwgY3VycmVudFN0YXRlLCBzdGFjaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0b2tlbiA9IFwic3RyaW5nLnF1b3RlZC5yYXcuc291cmNlLnJ1c3RcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUubGVuZ3RoID49IHN0YWNrWzFdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5sZW5ndGggPiBzdGFja1sxXSkgdG9rZW4gPSBcImludmFsaWRcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhY2suc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhY2suc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0ID0gc3RhY2suc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICByZWdleDogL1wiIyovLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dDogXCJzdGFydFwiXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzdHJpbmcucXVvdGVkLnJhdy5zb3VyY2UucnVzdFwiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46ICdzdHJpbmcucXVvdGVkLmRvdWJsZS5zb3VyY2UucnVzdCcsXG4gICAgICAgICAgICAgICAgcmVnZXg6ICdcIicsXG4gICAgICAgICAgICAgICAgcHVzaDogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbjogJ3N0cmluZy5xdW90ZWQuZG91YmxlLnNvdXJjZS5ydXN0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAnXCInLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dDogJ3BvcCdcbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46ICdjb25zdGFudC5jaGFyYWN0ZXIuZXNjYXBlLnNvdXJjZS5ydXN0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiBzdHJpbmdFc2NhcGVcbiAgICAgICAgICAgICAgICAgICAgfSwge2RlZmF1bHRUb2tlbjogJ3N0cmluZy5xdW90ZWQuZG91YmxlLnNvdXJjZS5ydXN0J31cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFsna2V5d29yZC5zb3VyY2UucnVzdCcsICd0ZXh0JywgJ2VudGl0eS5uYW1lLmZ1bmN0aW9uLnNvdXJjZS5ydXN0JywgJ3B1bmN0dWF0aW9uJ10sXG4gICAgICAgICAgICAgICAgcmVnZXg6ICdcXFxcYihmbikoXFxcXHMrKSgoPzpyIyk/JyArIHdvcmRQYXR0ZXJuICsgJykoPCkoPyE8KScsXG4gICAgICAgICAgICAgICAgcHVzaDogXCJnZW5lcmljc1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFsna2V5d29yZC5zb3VyY2UucnVzdCcsICd0ZXh0JywgJ2VudGl0eS5uYW1lLmZ1bmN0aW9uLnNvdXJjZS5ydXN0J10sXG4gICAgICAgICAgICAgICAgcmVnZXg6ICdcXFxcYihmbikoXFxcXHMrKSgoPzpyIyk/JyArIHdvcmRQYXR0ZXJuICsgJyknXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFsnc3VwcG9ydC5jb25zdGFudCcsIFwicHVuY3R1YXRpb25cIl0sXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiKFwiICsgd29yZFBhdHRlcm4gKyAnOjopKDwpKD8hPCknLFxuICAgICAgICAgICAgICAgIHB1c2g6IFwiZ2VuZXJpY3NcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiAnc3VwcG9ydC5jb25zdGFudCcsXG4gICAgICAgICAgICAgICAgcmVnZXg6IHdvcmRQYXR0ZXJuICsgJzo6J1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiAndmFyaWFibGUubGFuZ3VhZ2Uuc291cmNlLnJ1c3QnLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAnXFxcXGJzZWxmXFxcXGInXG4gICAgICAgICAgICB9LCBEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMuZ2V0U3RhcnRSdWxlKFwiZG9jLXN0YXJ0XCIpLCB7XG4gICAgICAgICAgICAgICAgdG9rZW46ICdjb21tZW50LmxpbmUuZG9jLnNvdXJjZS5ydXN0JyxcbiAgICAgICAgICAgICAgICByZWdleDogJy8vLy4qJCdcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogJ2NvbW1lbnQubGluZS5kb2Muc291cmNlLnJ1c3QnLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAnLy8hLiokJ1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiAnY29tbWVudC5saW5lLmRvdWJsZS1kYXNoLnNvdXJjZS5ydXN0JyxcbiAgICAgICAgICAgICAgICByZWdleDogJy8vLiokJ1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiAnY29tbWVudC5zdGFydC5ibG9jay5zb3VyY2UucnVzdCcsXG4gICAgICAgICAgICAgICAgcmVnZXg6ICcvXFxcXConLFxuICAgICAgICAgICAgICAgIHN0YXRlTmFtZTogJ2NvbW1lbnQnLFxuICAgICAgICAgICAgICAgIHB1c2g6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46ICdjb21tZW50LnN0YXJ0LmJsb2NrLnNvdXJjZS5ydXN0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAnL1xcXFwqJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHB1c2g6ICdjb21tZW50J1xuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbjogJ2NvbW1lbnQuZW5kLmJsb2NrLnNvdXJjZS5ydXN0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAnXFxcXCovJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHQ6ICdwb3AnXG4gICAgICAgICAgICAgICAgICAgIH0sIHtkZWZhdWx0VG9rZW46ICdjb21tZW50LmJsb2NrLnNvdXJjZS5ydXN0J31cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFtcImtleXdvcmQuc291cmNlLnJ1c3RcIiwgXCJpZGVudGlmaWVyXCIsIFwicHVuY3R1YWN0aW9uXCJdLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIig/OihpbXBsKXwoXCIgKyB3b3JkUGF0dGVybiArIFwiKSkoPCkoPyE8KVwiLFxuICAgICAgICAgICAgICAgIHN0YXRlTmFtZTogJ2dlbmVyaWNzJyxcbiAgICAgICAgICAgICAgICBwdXNoOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiAna2V5d29yZC5vcGVyYXRvcicsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWdleDogLzw8fD0vXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiBcInB1bmN0dWFjdGlvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXg6IFwiPCg/ITwpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBwdXNoOiBcImdlbmVyaWNzXCJcbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46ICd2YXJpYWJsZS5vdGhlci5zb3VyY2UucnVzdCcsIC8vIGAoPyFbXFxcXFxcJ10pYCB0byBrZWVwIGEgbGlmZXRpbWUgbmFtZSBoaWdobGlnaHRpbmcgZnJvbSBjb250aW51aW5nIG9uZSBjaGFyYWN0ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBhc3QgdGhlIG5hbWUuIFRoZSBlbmQgYFxcJ2Agd2lsbCBibG9jayB0aGlzIGZyb20gbWF0Y2hpbmcgZm9yIGEgY2hhcmFjdGVyIGxpa2VcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGAnYSdgIChpdCBzaG91bGQgaGF2ZSBjaGFyYWN0ZXIgaGlnaGxpZ2h0aW5nLCBub3QgdmFyaWFibGUgaGlnaGxpZ2h0aW5nKS5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAnXFwnJyArIHdvcmRQYXR0ZXJuICsgJyg/IVtcXFxcXFwnXSknXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiBcInN0b3JhZ2UudHlwZS5zb3VyY2UucnVzdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXg6IFwiXFxcXGIodTh8dTE2fHUzMnx1NjR8dTEyOHx1c2l6ZXxpOHxpMTZ8aTMyfGk2NHxpMTI4fGlzaXplfGNoYXJ8Ym9vbClcXFxcYlwiXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiBcImtleXdvcmRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFxiKD86Y29uc3R8ZHluKVxcXFxiXCJcbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwicHVuY3R1YXRpb25cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiBcIj5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgICAgICAgICAgfSwgXG4gICAgICAgICAgICAgICAgICAgIHtpbmNsdWRlOiBcInB1bmN0dWF0aW9uXCJ9LFxuICAgICAgICAgICAgICAgICAgICB7aW5jbHVkZTogXCJvcGVyYXRvcnNcIn0sXG4gICAgICAgICAgICAgICAgICAgIHtpbmNsdWRlOiBcImNvbnN0YW50c1wifSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwiaWRlbnRpZmllclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXg6IFwiXFxcXGJcIit3b3JkUGF0dGVybitcIlxcXFxiXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjoga2V5d29yZE1hcHBlcixcbiAgICAgICAgICAgICAgICByZWdleDogd29yZFBhdHRlcm5cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogJ21ldGEucHJlcHJvY2Vzc29yLnNvdXJjZS5ydXN0JyxcbiAgICAgICAgICAgICAgICByZWdleDogJ1xcXFxiXFxcXHdcXFxcKFxcXFx3XFxcXCkqIXwjXFxcXFtbXFxcXHc9XFxcXChcXFxcKV9dK1xcXFxdXFxcXGInXG4gICAgICAgICAgICB9LCBcbiAgICAgICAgICAgIHtpbmNsdWRlOiBcInB1bmN0dWF0aW9uXCJ9LFxuICAgICAgICAgICAge2luY2x1ZGU6IFwib3BlcmF0b3JzXCJ9LFxuICAgICAgICAgICAge2luY2x1ZGU6IFwiY29uc3RhbnRzXCJ9XG4gICAgICAgIF0sXG4gICAgICAgIHB1bmN0dWF0aW9uOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwicGFyZW4ubHBhcmVuXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IC9bXFxbKHtdL1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInBhcmVuLnJwYXJlblwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvW1xcXSl9XS9cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJwdW5jdHVhdGlvbi5vcGVyYXRvclwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvWz86LDsuXS9cbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgb3BlcmF0b3JzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW46ICdrZXl3b3JkLm9wZXJhdG9yJywgLy8gYFsqL10oPyFbKi9dKT0/YCBpcyBzZXBhcmF0ZWQgYmVjYXVzZSBgLy9gIGFuZCBgLyogKi9gIGJlY29tZSBjb21tZW50cyBhbmQgbXVzdCBiZVxuICAgICAgICAgICAgICAgIC8vIGd1YXJkZWQgYWdhaW5zdC4gVGhpcyBzdGF0ZXMgZWl0aGVyIGAqYCBvciBgL2AgbWF5IGJlIG1hdGNoZWQgYXMgbG9uZyBhcyB0aGUgbWF0Y2hcbiAgICAgICAgICAgICAgICAvLyBpdCBpc24ndCBmb2xsb3dlZCBieSBlaXRoZXIgb2YgdGhlIHR3by4gQW4gYD1gIG1heSBiZSBvbiB0aGUgZW5kLlxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvXFwkfFstPV0+fFstKyVePSEmfDw+XT0/fFsqL10oPyFbKi9dKT0/L1xuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBjb25zdGFudHM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogJ2NvbnN0YW50Lm51bWVyaWMuc291cmNlLnJ1c3QnLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvXFxiKD86MHhbYS1mQS1GMC05X10rfDBvWzAtN19dK3wwYlswMV9dK3xbMC05XVswLTlfXSooPyFcXC4pKSg/OltpdV0oPzpzaXplfDh8MTZ8MzJ8NjR8MTI4KSk/XFxiL1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiAnY29uc3RhbnQubnVtZXJpYy5zb3VyY2UucnVzdCcsXG4gICAgICAgICAgICAgICAgcmVnZXg6IC9cXGIoPzpbMC05XVswLTlfXSopKD86XFwuWzAtOV1bMC05X10qKT8oPzpbRWVdWystXVswLTldWzAtOV9dKik/KD86ZjMyfGY2NCk/XFxiL1xuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfTtcblxuICAgIHRoaXMuZW1iZWRSdWxlcyhEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMsIFwiZG9jLVwiLFxuICAgICAgICBbIERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcy5nZXRFbmRSdWxlKFwic3RhcnRcIikgXSk7XG4gICAgdGhpcy5ub3JtYWxpemVSdWxlcygpO1xufTtcblxuUnVzdEhpZ2hsaWdodFJ1bGVzLm1ldGFEYXRhID0geyBmaWxlVHlwZXM6IFsgJ3JzJywgJ3JjJyBdLFxuICAgICAgZm9sZGluZ1N0YXJ0TWFya2VyOiAnXi4qXFxcXGJmblxcXFxzKihcXFxcdytcXFxccyopP1xcXFwoW15cXFxcKV0qXFxcXCkoXFxcXHMqXFxcXHtbXlxcXFx9XSopP1xcXFxzKiQnLFxuICAgICAgZm9sZGluZ1N0b3BNYXJrZXI6ICdeXFxcXHMqXFxcXH0nLFxuICAgICAgbmFtZTogJ1J1c3QnLFxuICAgICAgc2NvcGVOYW1lOiAnc291cmNlLnJ1c3QnIH07XG5cblxub29wLmluaGVyaXRzKFJ1c3RIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuZXhwb3J0cy5SdXN0SGlnaGxpZ2h0UnVsZXMgPSBSdXN0SGlnaGxpZ2h0UnVsZXM7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=