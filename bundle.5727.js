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
                defaultToken: "comment.doc",
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
        regex : "\\/\\*(?=\\*)",
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
                regex: '\\b(fn)(\\s+)((?:r#)?' + wordPattern + ')(<)',
                push: "generics"
            }, {
                token: ['keyword.source.rust', 'text', 'entity.name.function.source.rust'],
                regex: '\\b(fn)(\\s+)((?:r#)?' + wordPattern + ')'
            }, {
                token: ['support.constant', "punctuation"],
                regex: "(" + wordPattern + '::)(<)',
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
                regex: "(?:(impl)|(" + wordPattern + "))(<)",
                stateName: 'generics',
                push: [
                    {
                        token: "punctuaction",
                        regex: "<",
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
                        token: "punctuation.operator",
                        regex: "[,:]"
                    }, {
                        token: "keyword",
                        regex: "\\b(?:const|dyn)\\b"
                    }, {
                        token: "punctuation",
                        regex: ">",
                        next: "pop"
                    }, {
                        token: "paren.lparen",
                        regex: "[(]"
                    }, {
                        token: "paren.rparen",
                        regex: "[)]"
                    }, {
                        token: "identifier",
                        regex: "\\b"+wordPattern+"\\b"
                    }, {
                        token: 'keyword.operator',
                        regex: "="
                    }
                ]
            }, {
                token: keywordMapper,
                regex: wordPattern
            }, {
                token: 'keyword.operator', // `[*/](?![*/])=?` is separated because `//` and `/* */` become comments and must be
                // guarded against. This states either `*` or `/` may be matched as long as the match
                // it isn't followed by either of the two. An `=` may be on the end.
                regex: /\$|[-=]>|[-+%^=!&|<>]=?|[*/](?![*/])=?/
            }, {
                token: "punctuation.operator",
                regex: /[?:,;.]/
            }, {
                token: "paren.lparen",
                regex: /[\[({]/
            }, {
                token: "paren.rparen",
                regex: /[\])}]/
            }, {
                token: 'meta.preprocessor.source.rust',
                regex: '\\b\\w\\(\\w\\)*!|#\\[[\\w=\\(\\)_]+\\]\\b'
            }, {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxnQ0FBZ0M7QUFDaEMsdUVBQXVFLEtBQUs7QUFDNUUsa0NBQWtDO0FBQ2xDO0FBQ0E7OztBQUdBOztBQUVBLFNBQTBCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9kb2NfY29tbWVudF9oaWdobGlnaHRfcnVsZXMuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9mb2xkaW5nL2NzdHlsZS5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL3J1c3QuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9ydXN0X2hpZ2hsaWdodF9ydWxlcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcblxudmFyIERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLiRydWxlcyA9IHtcbiAgICAgICAgXCJzdGFydFwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwiY29tbWVudC5kb2MudGFnXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiQFxcXFx3Kyg/PVxcXFxzfCQpXCJcbiAgICAgICAgICAgIH0sIERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcy5nZXRUYWdSdWxlKCksIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwiY29tbWVudC5kb2NcIixcbiAgICAgICAgICAgICAgICBjYXNlSW5zZW5zaXRpdmU6IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH07XG59O1xuXG5vb3AuaW5oZXJpdHMoRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLCBUZXh0SGlnaGxpZ2h0UnVsZXMpO1xuXG5Eb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMuZ2V0VGFnUnVsZSA9IGZ1bmN0aW9uKHN0YXJ0KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdG9rZW4gOiBcImNvbW1lbnQuZG9jLnRhZy5zdG9yYWdlLnR5cGVcIixcbiAgICAgICAgcmVnZXggOiBcIlxcXFxiKD86VE9ET3xGSVhNRXxYWFh8SEFDSylcXFxcYlwiXG4gICAgfTtcbn07XG5cbkRvY0NvbW1lbnRIaWdobGlnaHRSdWxlcy5nZXRTdGFydFJ1bGUgPSBmdW5jdGlvbihzdGFydCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHRva2VuIDogXCJjb21tZW50LmRvY1wiLCAvLyBkb2MgY29tbWVudFxuICAgICAgICByZWdleCA6IFwiXFxcXC9cXFxcKig/PVxcXFwqKVwiLFxuICAgICAgICBuZXh0ICA6IHN0YXJ0XG4gICAgfTtcbn07XG5cbkRvY0NvbW1lbnRIaWdobGlnaHRSdWxlcy5nZXRFbmRSdWxlID0gZnVuY3Rpb24gKHN0YXJ0KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdG9rZW4gOiBcImNvbW1lbnQuZG9jXCIsIC8vIGNsb3NpbmcgY29tbWVudFxuICAgICAgICByZWdleCA6IFwiXFxcXCpcXFxcL1wiLFxuICAgICAgICBuZXh0ICA6IHN0YXJ0XG4gICAgfTtcbn07XG5cblxuZXhwb3J0cy5Eb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMgPSBEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXM7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi8uLi9saWIvb29wXCIpO1xudmFyIFJhbmdlID0gcmVxdWlyZShcIi4uLy4uL3JhbmdlXCIpLlJhbmdlO1xudmFyIEJhc2VGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRfbW9kZVwiKS5Gb2xkTW9kZTtcblxudmFyIEZvbGRNb2RlID0gZXhwb3J0cy5Gb2xkTW9kZSA9IGZ1bmN0aW9uKGNvbW1lbnRSZWdleCkge1xuICAgIGlmIChjb21tZW50UmVnZXgpIHtcbiAgICAgICAgdGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIgPSBuZXcgUmVnRXhwKFxuICAgICAgICAgICAgdGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIuc291cmNlLnJlcGxhY2UoL1xcfFtefF0qPyQvLCBcInxcIiArIGNvbW1lbnRSZWdleC5zdGFydClcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5mb2xkaW5nU3RvcE1hcmtlciA9IG5ldyBSZWdFeHAoXG4gICAgICAgICAgICB0aGlzLmZvbGRpbmdTdG9wTWFya2VyLnNvdXJjZS5yZXBsYWNlKC9cXHxbXnxdKj8kLywgXCJ8XCIgKyBjb21tZW50UmVnZXguZW5kKVxuICAgICAgICApO1xuICAgIH1cbn07XG5vb3AuaW5oZXJpdHMoRm9sZE1vZGUsIEJhc2VGb2xkTW9kZSk7XG5cbihmdW5jdGlvbigpIHtcbiAgICBcbiAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlciA9IC8oW1xce1xcW1xcKF0pW15cXH1cXF1cXCldKiR8XlxccyooXFwvXFwqKS87XG4gICAgdGhpcy5mb2xkaW5nU3RvcE1hcmtlciA9IC9eW15cXFtcXHtcXChdKihbXFx9XFxdXFwpXSl8XltcXHNcXCpdKihcXCpcXC8pLztcbiAgICB0aGlzLnNpbmdsZUxpbmVCbG9ja0NvbW1lbnRSZT0gL15cXHMqKFxcL1xcKikuKlxcKlxcL1xccyokLztcbiAgICB0aGlzLnRyaXBsZVN0YXJCbG9ja0NvbW1lbnRSZSA9IC9eXFxzKihcXC9cXCpcXCpcXCopLipcXCpcXC9cXHMqJC87XG4gICAgdGhpcy5zdGFydFJlZ2lvblJlID0gL15cXHMqKFxcL1xcKnxcXC9cXC8pIz9yZWdpb25cXGIvO1xuICAgIFxuICAgIC8vcHJldmVudCBuYW1pbmcgY29uZmxpY3Qgd2l0aCBhbnkgbW9kZXMgdGhhdCBpbmhlcml0IGZyb20gY3N0eWxlIGFuZCBvdmVycmlkZSB0aGlzIChsaWtlIGNzaGFycClcbiAgICB0aGlzLl9nZXRGb2xkV2lkZ2V0QmFzZSA9IHRoaXMuZ2V0Rm9sZFdpZGdldDtcbiAgICBcbiAgICAvKipcbiAgICAgKiBHZXRzIGZvbGQgd2lkZ2V0IHdpdGggc29tZSBub24tc3RhbmRhcmQgZXh0cmFzOlxuICAgICAqXG4gICAgICogQGV4YW1wbGUgbGluZUNvbW1lbnRSZWdpb25TdGFydFxuICAgICAqICAgICAgLy8jcmVnaW9uIFtvcHRpb25hbCBkZXNjcmlwdGlvbl1cbiAgICAgKlxuICAgICAqIEBleGFtcGxlIGJsb2NrQ29tbWVudFJlZ2lvblN0YXJ0XG4gICAgICogICAgICAvKiNyZWdpb24gW29wdGlvbmFsIGRlc2NyaXB0aW9uXSAqWy9dXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSB0cmlwbGVTdGFyRm9sZGluZ1NlY3Rpb25cbiAgICAgKiAgICAgIC8qKiogdGhpcyBmb2xkcyBldmVuIHRob3VnaCAxIGxpbmUgYmVjYXVzZSBpdCBoYXMgMyBzdGFycyAqKipbL11cbiAgICAgKiBcbiAgICAgKiBAbm90ZSB0aGUgcG91bmQgc3ltYm9sIGZvciByZWdpb24gdGFncyBpcyBvcHRpb25hbFxuICAgICAqL1xuICAgIHRoaXMuZ2V0Rm9sZFdpZGdldCA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgXG4gICAgICAgIGlmICh0aGlzLnNpbmdsZUxpbmVCbG9ja0NvbW1lbnRSZS50ZXN0KGxpbmUpKSB7XG4gICAgICAgICAgICAvLyBObyB3aWRnZXQgZm9yIHNpbmdsZSBsaW5lIGJsb2NrIGNvbW1lbnQgdW5sZXNzIHJlZ2lvbiBvciB0cmlwbGUgc3RhclxuICAgICAgICAgICAgaWYgKCF0aGlzLnN0YXJ0UmVnaW9uUmUudGVzdChsaW5lKSAmJiAhdGhpcy50cmlwbGVTdGFyQmxvY2tDb21tZW50UmUudGVzdChsaW5lKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICB2YXIgZncgPSB0aGlzLl9nZXRGb2xkV2lkZ2V0QmFzZShzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdyk7XG4gICAgXG4gICAgICAgIGlmICghZncgJiYgdGhpcy5zdGFydFJlZ2lvblJlLnRlc3QobGluZSkpXG4gICAgICAgICAgICByZXR1cm4gXCJzdGFydFwiOyAvLyBsaW5lQ29tbWVudFJlZ2lvblN0YXJ0XG4gICAgXG4gICAgICAgIHJldHVybiBmdztcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0UmFuZ2UgPSBmdW5jdGlvbihzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdywgZm9yY2VNdWx0aWxpbmUpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLnN0YXJ0UmVnaW9uUmUudGVzdChsaW5lKSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldENvbW1lbnRSZWdpb25CbG9jayhzZXNzaW9uLCBsaW5lLCByb3cpO1xuICAgICAgICBcbiAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCh0aGlzLmZvbGRpbmdTdGFydE1hcmtlcik7XG4gICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgdmFyIGkgPSBtYXRjaC5pbmRleDtcblxuICAgICAgICAgICAgaWYgKG1hdGNoWzFdKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm9wZW5pbmdCcmFja2V0QmxvY2soc2Vzc2lvbiwgbWF0Y2hbMV0sIHJvdywgaSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgcmFuZ2UgPSBzZXNzaW9uLmdldENvbW1lbnRGb2xkUmFuZ2Uocm93LCBpICsgbWF0Y2hbMF0ubGVuZ3RoLCAxKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHJhbmdlICYmICFyYW5nZS5pc011bHRpTGluZSgpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZvcmNlTXVsdGlsaW5lKSB7XG4gICAgICAgICAgICAgICAgICAgIHJhbmdlID0gdGhpcy5nZXRTZWN0aW9uUmFuZ2Uoc2Vzc2lvbiwgcm93KTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZvbGRTdHlsZSAhPSBcImFsbFwiKVxuICAgICAgICAgICAgICAgICAgICByYW5nZSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiByYW5nZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmb2xkU3R5bGUgPT09IFwibWFya2JlZ2luXCIpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCh0aGlzLmZvbGRpbmdTdG9wTWFya2VyKTtcbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICB2YXIgaSA9IG1hdGNoLmluZGV4ICsgbWF0Y2hbMF0ubGVuZ3RoO1xuXG4gICAgICAgICAgICBpZiAobWF0Y2hbMV0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2xvc2luZ0JyYWNrZXRCbG9jayhzZXNzaW9uLCBtYXRjaFsxXSwgcm93LCBpKTtcblxuICAgICAgICAgICAgcmV0dXJuIHNlc3Npb24uZ2V0Q29tbWVudEZvbGRSYW5nZShyb3csIGksIC0xKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgXG4gICAgdGhpcy5nZXRTZWN0aW9uUmFuZ2UgPSBmdW5jdGlvbihzZXNzaW9uLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgdmFyIHN0YXJ0SW5kZW50ID0gbGluZS5zZWFyY2goL1xcUy8pO1xuICAgICAgICB2YXIgc3RhcnRSb3cgPSByb3c7XG4gICAgICAgIHZhciBzdGFydENvbHVtbiA9IGxpbmUubGVuZ3RoO1xuICAgICAgICByb3cgPSByb3cgKyAxO1xuICAgICAgICB2YXIgZW5kUm93ID0gcm93O1xuICAgICAgICB2YXIgbWF4Um93ID0gc2Vzc2lvbi5nZXRMZW5ndGgoKTtcbiAgICAgICAgd2hpbGUgKCsrcm93IDwgbWF4Um93KSB7XG4gICAgICAgICAgICBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgICAgICB2YXIgaW5kZW50ID0gbGluZS5zZWFyY2goL1xcUy8pO1xuICAgICAgICAgICAgaWYgKGluZGVudCA9PT0gLTEpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICBpZiAgKHN0YXJ0SW5kZW50ID4gaW5kZW50KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgdmFyIHN1YlJhbmdlID0gdGhpcy5nZXRGb2xkV2lkZ2V0UmFuZ2Uoc2Vzc2lvbiwgXCJhbGxcIiwgcm93KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHN1YlJhbmdlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN1YlJhbmdlLnN0YXJ0LnJvdyA8PSBzdGFydFJvdykge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN1YlJhbmdlLmlzTXVsdGlMaW5lKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcm93ID0gc3ViUmFuZ2UuZW5kLnJvdztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXJ0SW5kZW50ID09IGluZGVudCkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbmRSb3cgPSByb3c7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBuZXcgUmFuZ2Uoc3RhcnRSb3csIHN0YXJ0Q29sdW1uLCBlbmRSb3csIHNlc3Npb24uZ2V0TGluZShlbmRSb3cpLmxlbmd0aCk7XG4gICAgfTtcbiAgICBcbiAgICAvKipcbiAgICAgKiBnZXRzIGNvbW1lbnQgcmVnaW9uIGJsb2NrIHdpdGggZW5kIHJlZ2lvbiBhc3N1bWVkIHRvIGJlIHN0YXJ0IG9mIGNvbW1lbnQgaW4gYW55IGNzdHlsZSBtb2RlIG9yIFNRTCBtb2RlICgtLSkgd2hpY2ggaW5oZXJpdHMgZnJvbSB0aGlzLlxuICAgICAqIFRoZXJlIG1heSBvcHRpb25hbGx5IGJlIGEgcG91bmQgc3ltYm9sIGJlZm9yZSB0aGUgcmVnaW9uL2VuZHJlZ2lvbiBzdGF0ZW1lbnRcbiAgICAgKi9cbiAgICB0aGlzLmdldENvbW1lbnRSZWdpb25CbG9jayA9IGZ1bmN0aW9uKHNlc3Npb24sIGxpbmUsIHJvdykge1xuICAgICAgICB2YXIgc3RhcnRDb2x1bW4gPSBsaW5lLnNlYXJjaCgvXFxzKiQvKTtcbiAgICAgICAgdmFyIG1heFJvdyA9IHNlc3Npb24uZ2V0TGVuZ3RoKCk7XG4gICAgICAgIHZhciBzdGFydFJvdyA9IHJvdztcbiAgICAgICAgXG4gICAgICAgIHZhciByZSA9IC9eXFxzKig/OlxcL1xcKnxcXC9cXC98LS0pIz8oZW5kKT9yZWdpb25cXGIvO1xuICAgICAgICB2YXIgZGVwdGggPSAxO1xuICAgICAgICB3aGlsZSAoKytyb3cgPCBtYXhSb3cpIHtcbiAgICAgICAgICAgIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgICAgIHZhciBtID0gcmUuZXhlYyhsaW5lKTtcbiAgICAgICAgICAgIGlmICghbSkgY29udGludWU7XG4gICAgICAgICAgICBpZiAobVsxXSkgZGVwdGgtLTtcbiAgICAgICAgICAgIGVsc2UgZGVwdGgrKztcblxuICAgICAgICAgICAgaWYgKCFkZXB0aCkgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZW5kUm93ID0gcm93O1xuICAgICAgICBpZiAoZW5kUm93ID4gc3RhcnRSb3cpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmFuZ2Uoc3RhcnRSb3csIHN0YXJ0Q29sdW1uLCBlbmRSb3csIGxpbmUubGVuZ3RoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbn0pLmNhbGwoRm9sZE1vZGUucHJvdG90eXBlKTtcbiIsIi8qXG4gIFRISVMgRklMRSBXQVMgQVVUT0dFTkVSQVRFRCBCWSBtb2RlLnRtcGwuanNcbiovXG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dE1vZGUgPSByZXF1aXJlKFwiLi90ZXh0XCIpLk1vZGU7XG52YXIgUnVzdEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vcnVzdF9oaWdobGlnaHRfcnVsZXNcIikuUnVzdEhpZ2hsaWdodFJ1bGVzO1xudmFyIEZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZGluZy9jc3R5bGVcIikuRm9sZE1vZGU7XG5cbnZhciBNb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5IaWdobGlnaHRSdWxlcyA9IFJ1c3RIaWdobGlnaHRSdWxlcztcbiAgICB0aGlzLmZvbGRpbmdSdWxlcyA9IG5ldyBGb2xkTW9kZSgpO1xuICAgIHRoaXMuJGJlaGF2aW91ciA9IHRoaXMuJGRlZmF1bHRCZWhhdmlvdXI7XG59O1xub29wLmluaGVyaXRzKE1vZGUsIFRleHRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuICAgIHRoaXMubGluZUNvbW1lbnRTdGFydCA9IFwiLy9cIjtcbiAgICB0aGlzLmJsb2NrQ29tbWVudCA9IHtzdGFydDogXCIvKlwiLCBlbmQ6IFwiKi9cIiwgbmVzdGFibGU6IHRydWV9O1xuICAgIHRoaXMuJHF1b3RlcyA9IHsgJ1wiJzogJ1wiJyB9O1xuICAgIHRoaXMuJGlkID0gXCJhY2UvbW9kZS9ydXN0XCI7XG59KS5jYWxsKE1vZGUucHJvdG90eXBlKTtcblxuZXhwb3J0cy5Nb2RlID0gTW9kZTtcbiIsIi8qIFRoaXMgZmlsZSB3YXMgYXV0b2dlbmVyYXRlZCBmcm9tIGh0dHBzOi8vcmF3LmdpdGh1Yi5jb20vZGJwL3N1YmxpbWUtcnVzdC9tYXN0ZXIvUnVzdC50bUxhbmd1YWdlICh1dWlkOiApICovXG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xudmFyIERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL2RvY19jb21tZW50X2hpZ2hsaWdodF9ydWxlc1wiKS5Eb2NDb21tZW50SGlnaGxpZ2h0UnVsZXM7XG5cbnZhciBzdHJpbmdFc2NhcGUgPSAvXFxcXCg/OltucnQwJ1wiXFxcXF18eFtcXGRhLWZBLUZdezJ9fHVcXHtbXFxkYS1mQS1GXXs2fVxcfSkvLnNvdXJjZTtcbnZhciB3b3JkUGF0dGVybiA9IC9bYS16QS1aX1xceGExLVxcdWZmZmZdW2EtekEtWjAtOV9cXHhhMS1cXHVmZmZmXSovLnNvdXJjZTtcbnZhciBSdXN0SGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbigpIHtcbiAgICAvLyByZWdleHAgbXVzdCBub3QgaGF2ZSBjYXB0dXJpbmcgcGFyZW50aGVzZXMuIFVzZSAoPzopIGluc3RlYWQuXG4gICAgLy8gcmVnZXhwcyBhcmUgb3JkZXJlZCAtPiB0aGUgZmlyc3QgbWF0Y2ggaXMgdXNlZFxuICAgIHZhciBrZXl3b3JkTWFwcGVyID0gdGhpcy5jcmVhdGVLZXl3b3JkTWFwcGVyKHtcbiAgICAgICAgXCJrZXl3b3JkLnNvdXJjZS5ydXN0XCI6IFwiYWJzdHJhY3R8YWxpZ25vZnxhc3xhc3luY3xhd2FpdHxiZWNvbWV8Ym94fGJyZWFrfGNhdGNofGNvbnRpbnVlfGNvbnN0fGNyYXRlfFwiXG4gICAgICAgICAgICArIFwiZGVmYXVsdHxkb3xkeW58ZWxzZXxlbnVtfGV4dGVybnxmb3J8ZmluYWx8aWZ8aW1wbHxpbnxsZXR8bG9vcHxtYWNyb3xtYXRjaHxtb2R8bW92ZXxtdXR8b2Zmc2V0b2Z8XCJcbiAgICAgICAgICAgICsgXCJvdmVycmlkZXxwcml2fHByb2N8cHVifHB1cmV8cmVmfHJldHVybnxzZWxmfHNpemVvZnxzdGF0aWN8c3RydWN0fHN1cGVyfHRyYWl0fHR5cGV8dHlwZW9mfHVuaW9ufFwiXG4gICAgICAgICAgICArIFwidW5zYWZlfHVuc2l6ZWR8dXNlfHZpcnR1YWx8d2hlcmV8d2hpbGV8eWllbGR8dHJ5XCIsXG4gICAgICAgIFwic3RvcmFnZS50eXBlLnNvdXJjZS5ydXN0XCI6IFwiU2VsZnxpc2l6ZXx1c2l6ZXxjaGFyfGJvb2x8dTh8dTE2fHUzMnx1NjR8dTEyOHxmMTZ8ZjMyfGY2NHxpOHxpMTZ8aTMyfGk2NHxcIlxuICAgICAgICAgICAgKyBcImkxMjh8c3RyfG9wdGlvbnxlaXRoZXJ8Y19mbG9hdHxjX2RvdWJsZXxjX3ZvaWR8RklMRXxmcG9zX3R8RElSfGRpcmVudHxjX2NoYXJ8Y19zY2hhcnxjX3VjaGFyfGNfc2hvcnR8XCJcbiAgICAgICAgICAgICsgXCJjX3VzaG9ydHxjX2ludHxjX3VpbnR8Y19sb25nfGNfdWxvbmd8c2l6ZV90fHB0cmRpZmZfdHxjbG9ja190fHRpbWVfdHxjX2xvbmdsb25nfGNfdWxvbmdsb25nfGludHB0cl90fFwiXG4gICAgICAgICAgICArIFwidWludHB0cl90fG9mZl90fGRldl90fGlub190fHBpZF90fG1vZGVfdHxzc2l6ZV90XCIsXG4gICAgICAgIFwiY29uc3RhbnQubGFuZ3VhZ2Uuc291cmNlLnJ1c3RcIjogXCJ0cnVlfGZhbHNlfFNvbWV8Tm9uZXxPa3xFcnJ8RkFMU0V8VFJVRVwiLFxuICAgICAgICBcInN1cHBvcnQuY29uc3RhbnQuc291cmNlLnJ1c3RcIjogXCJFWElUX0ZBSUxVUkV8RVhJVF9TVUNDRVNTfFJBTkRfTUFYfEVPRnxTRUVLX1NFVHxTRUVLX0NVUnxTRUVLX0VORHxfSU9GQkZ8XCJcbiAgICAgICAgICAgICsgXCJfSU9OQkZ8X0lPTEJGfFwiXG4gICAgICAgICAgICArIFwiQlVGU0lafEZPUEVOX01BWHxGSUxFTkFNRV9NQVh8TF90bXBuYW18VE1QX01BWHxPX1JET05MWXxPX1dST05MWXxPX1JEV1J8T19BUFBFTkR8T19DUkVBVHxPX0VYQ0x8T19UUlVOQ3xcIlxuICAgICAgICAgICAgKyBcIlNfSUZJRk98U19JRkNIUnxTX0lGQkxLfFNfSUZESVJ8U19JRlJFR3xTX0lGTVR8U19JRVhFQ3xTX0lXUklURXxTX0lSRUFEfFNfSVJXWFV8U19JWFVTUnxTX0lXVVNSfFNfSVJVU1J8XCJcbiAgICAgICAgICAgICsgXCJGX09LfFJfT0t8V19PS3xYX09LfFNURElOX0ZJTEVOT3xTVERPVVRfRklMRU5PfFNUREVSUl9GSUxFTk9cIixcbiAgICAgICAgXCJjb25zdGFudC5sYW5ndWFnZVwiOiBcIm1hY3JvX3J1bGVzfG1hY192YXJpYW50XCJcbiAgICB9LCBcImlkZW50aWZpZXJcIik7XG5cbiAgICB0aGlzLiRydWxlcyA9IHtcbiAgICAgICAgc3RhcnQ6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogJ3ZhcmlhYmxlLm90aGVyLnNvdXJjZS5ydXN0JywgLy8gYCg/IVtcXFxcXFwnXSlgIHRvIGtlZXAgYSBsaWZldGltZSBuYW1lIGhpZ2hsaWdodGluZyBmcm9tIGNvbnRpbnVpbmcgb25lIGNoYXJhY3RlclxuICAgICAgICAgICAgICAgIC8vIHBhc3QgdGhlIG5hbWUuIFRoZSBlbmQgYFxcJ2Agd2lsbCBibG9jayB0aGlzIGZyb20gbWF0Y2hpbmcgZm9yIGEgY2hhcmFjdGVyIGxpa2VcbiAgICAgICAgICAgICAgICAvLyBgJ2EnYCAoaXQgc2hvdWxkIGhhdmUgY2hhcmFjdGVyIGhpZ2hsaWdodGluZywgbm90IHZhcmlhYmxlIGhpZ2hsaWdodGluZykuXG4gICAgICAgICAgICAgICAgcmVnZXg6ICdcXCcnICsgd29yZFBhdHRlcm4gKyAnKD8hW1xcXFxcXCddKSdcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogJ3N0cmluZy5xdW90ZWQuc2luZ2xlLnNvdXJjZS5ydXN0JyxcbiAgICAgICAgICAgICAgICByZWdleDogXCInKD86W14nXFxcXFxcXFxdfFwiICsgc3RyaW5nRXNjYXBlICsgXCIpJ1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46ICdpZGVudGlmaWVyJyxcbiAgICAgICAgICAgICAgICByZWdleDogXCJyI1wiICsgd29yZFBhdHRlcm4gKyBcIlxcXFxiXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBzdGF0ZU5hbWU6IFwiYnJhY2tldGVkQ29tbWVudFwiLFxuICAgICAgICAgICAgICAgIG9uTWF0Y2g6IGZ1bmN0aW9uICh2YWx1ZSwgY3VycmVudFN0YXRlLCBzdGFjaykge1xuICAgICAgICAgICAgICAgICAgICBzdGFjay51bnNoaWZ0KHRoaXMubmV4dCwgdmFsdWUubGVuZ3RoIC0gMSwgY3VycmVudFN0YXRlKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwic3RyaW5nLnF1b3RlZC5yYXcuc291cmNlLnJ1c3RcIjtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvciMqXCIvLFxuICAgICAgICAgICAgICAgIG5leHQ6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgb25NYXRjaDogZnVuY3Rpb24gKHZhbHVlLCBjdXJyZW50U3RhdGUsIHN0YWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRva2VuID0gXCJzdHJpbmcucXVvdGVkLnJhdy5zb3VyY2UucnVzdFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5sZW5ndGggPj0gc3RhY2tbMV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCA+IHN0YWNrWzFdKSB0b2tlbiA9IFwiaW52YWxpZFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFjay5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFjay5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHQgPSBzdGFjay5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0ID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRva2VuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAvXCIjKi8sXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0OiBcInN0YXJ0XCJcbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInN0cmluZy5xdW90ZWQucmF3LnNvdXJjZS5ydXN0XCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogJ3N0cmluZy5xdW90ZWQuZG91YmxlLnNvdXJjZS5ydXN0JyxcbiAgICAgICAgICAgICAgICByZWdleDogJ1wiJyxcbiAgICAgICAgICAgICAgICBwdXNoOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiAnc3RyaW5nLnF1b3RlZC5kb3VibGUuc291cmNlLnJ1c3QnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXg6ICdcIicsXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0OiAncG9wJ1xuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbjogJ2NvbnN0YW50LmNoYXJhY3Rlci5lc2NhcGUuc291cmNlLnJ1c3QnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXg6IHN0cmluZ0VzY2FwZVxuICAgICAgICAgICAgICAgICAgICB9LCB7ZGVmYXVsdFRva2VuOiAnc3RyaW5nLnF1b3RlZC5kb3VibGUuc291cmNlLnJ1c3QnfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogWydrZXl3b3JkLnNvdXJjZS5ydXN0JywgJ3RleHQnLCAnZW50aXR5Lm5hbWUuZnVuY3Rpb24uc291cmNlLnJ1c3QnLCAncHVuY3R1YXRpb24nXSxcbiAgICAgICAgICAgICAgICByZWdleDogJ1xcXFxiKGZuKShcXFxccyspKCg/OnIjKT8nICsgd29yZFBhdHRlcm4gKyAnKSg8KScsXG4gICAgICAgICAgICAgICAgcHVzaDogXCJnZW5lcmljc1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFsna2V5d29yZC5zb3VyY2UucnVzdCcsICd0ZXh0JywgJ2VudGl0eS5uYW1lLmZ1bmN0aW9uLnNvdXJjZS5ydXN0J10sXG4gICAgICAgICAgICAgICAgcmVnZXg6ICdcXFxcYihmbikoXFxcXHMrKSgoPzpyIyk/JyArIHdvcmRQYXR0ZXJuICsgJyknXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFsnc3VwcG9ydC5jb25zdGFudCcsIFwicHVuY3R1YXRpb25cIl0sXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiKFwiICsgd29yZFBhdHRlcm4gKyAnOjopKDwpJyxcbiAgICAgICAgICAgICAgICBwdXNoOiBcImdlbmVyaWNzXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogJ3N1cHBvcnQuY29uc3RhbnQnLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiB3b3JkUGF0dGVybiArICc6OidcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogJ3ZhcmlhYmxlLmxhbmd1YWdlLnNvdXJjZS5ydXN0JyxcbiAgICAgICAgICAgICAgICByZWdleDogJ1xcXFxic2VsZlxcXFxiJ1xuICAgICAgICAgICAgfSwgRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLmdldFN0YXJ0UnVsZShcImRvYy1zdGFydFwiKSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiAnY29tbWVudC5saW5lLmRvYy5zb3VyY2UucnVzdCcsXG4gICAgICAgICAgICAgICAgcmVnZXg6ICcvLy8uKiQnXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46ICdjb21tZW50LmxpbmUuZG9jLnNvdXJjZS5ydXN0JyxcbiAgICAgICAgICAgICAgICByZWdleDogJy8vIS4qJCdcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogJ2NvbW1lbnQubGluZS5kb3VibGUtZGFzaC5zb3VyY2UucnVzdCcsXG4gICAgICAgICAgICAgICAgcmVnZXg6ICcvLy4qJCdcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogJ2NvbW1lbnQuc3RhcnQuYmxvY2suc291cmNlLnJ1c3QnLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAnL1xcXFwqJyxcbiAgICAgICAgICAgICAgICBzdGF0ZU5hbWU6ICdjb21tZW50JyxcbiAgICAgICAgICAgICAgICBwdXNoOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiAnY29tbWVudC5zdGFydC5ibG9jay5zb3VyY2UucnVzdCcsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWdleDogJy9cXFxcKicsXG4gICAgICAgICAgICAgICAgICAgICAgICBwdXNoOiAnY29tbWVudCdcbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46ICdjb21tZW50LmVuZC5ibG9jay5zb3VyY2UucnVzdCcsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWdleDogJ1xcXFwqLycsXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0OiAncG9wJ1xuICAgICAgICAgICAgICAgICAgICB9LCB7ZGVmYXVsdFRva2VuOiAnY29tbWVudC5ibG9jay5zb3VyY2UucnVzdCd9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBbXCJrZXl3b3JkLnNvdXJjZS5ydXN0XCIsIFwiaWRlbnRpZmllclwiLCBcInB1bmN0dWFjdGlvblwiXSxcbiAgICAgICAgICAgICAgICByZWdleDogXCIoPzooaW1wbCl8KFwiICsgd29yZFBhdHRlcm4gKyBcIikpKDwpXCIsXG4gICAgICAgICAgICAgICAgc3RhdGVOYW1lOiAnZ2VuZXJpY3MnLFxuICAgICAgICAgICAgICAgIHB1c2g6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwicHVuY3R1YWN0aW9uXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWdleDogXCI8XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBwdXNoOiBcImdlbmVyaWNzXCJcbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46ICd2YXJpYWJsZS5vdGhlci5zb3VyY2UucnVzdCcsIC8vIGAoPyFbXFxcXFxcJ10pYCB0byBrZWVwIGEgbGlmZXRpbWUgbmFtZSBoaWdobGlnaHRpbmcgZnJvbSBjb250aW51aW5nIG9uZSBjaGFyYWN0ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBhc3QgdGhlIG5hbWUuIFRoZSBlbmQgYFxcJ2Agd2lsbCBibG9jayB0aGlzIGZyb20gbWF0Y2hpbmcgZm9yIGEgY2hhcmFjdGVyIGxpa2VcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGAnYSdgIChpdCBzaG91bGQgaGF2ZSBjaGFyYWN0ZXIgaGlnaGxpZ2h0aW5nLCBub3QgdmFyaWFibGUgaGlnaGxpZ2h0aW5nKS5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAnXFwnJyArIHdvcmRQYXR0ZXJuICsgJyg/IVtcXFxcXFwnXSknXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiBcInN0b3JhZ2UudHlwZS5zb3VyY2UucnVzdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXg6IFwiXFxcXGIodTh8dTE2fHUzMnx1NjR8dTEyOHx1c2l6ZXxpOHxpMTZ8aTMyfGk2NHxpMTI4fGlzaXplfGNoYXJ8Ym9vbClcXFxcYlwiXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiBcInB1bmN0dWF0aW9uLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWdleDogXCJbLDpdXCJcbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwia2V5d29yZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXg6IFwiXFxcXGIoPzpjb25zdHxkeW4pXFxcXGJcIlxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJwdW5jdHVhdGlvblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXg6IFwiPlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJwYXJlbi5scGFyZW5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiBcIlsoXVwiXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiBcInBhcmVuLnJwYXJlblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXg6IFwiWyldXCJcbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwiaWRlbnRpZmllclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXg6IFwiXFxcXGJcIit3b3JkUGF0dGVybitcIlxcXFxiXCJcbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46ICdrZXl3b3JkLm9wZXJhdG9yJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiBcIj1cIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBrZXl3b3JkTWFwcGVyLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiB3b3JkUGF0dGVyblxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiAna2V5d29yZC5vcGVyYXRvcicsIC8vIGBbKi9dKD8hWyovXSk9P2AgaXMgc2VwYXJhdGVkIGJlY2F1c2UgYC8vYCBhbmQgYC8qICovYCBiZWNvbWUgY29tbWVudHMgYW5kIG11c3QgYmVcbiAgICAgICAgICAgICAgICAvLyBndWFyZGVkIGFnYWluc3QuIFRoaXMgc3RhdGVzIGVpdGhlciBgKmAgb3IgYC9gIG1heSBiZSBtYXRjaGVkIGFzIGxvbmcgYXMgdGhlIG1hdGNoXG4gICAgICAgICAgICAgICAgLy8gaXQgaXNuJ3QgZm9sbG93ZWQgYnkgZWl0aGVyIG9mIHRoZSB0d28uIEFuIGA9YCBtYXkgYmUgb24gdGhlIGVuZC5cbiAgICAgICAgICAgICAgICByZWdleDogL1xcJHxbLT1dPnxbLSslXj0hJnw8Pl09P3xbKi9dKD8hWyovXSk9Py9cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJwdW5jdHVhdGlvbi5vcGVyYXRvclwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvWz86LDsuXS9cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJwYXJlbi5scGFyZW5cIixcbiAgICAgICAgICAgICAgICByZWdleDogL1tcXFsoe10vXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwicGFyZW4ucnBhcmVuXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IC9bXFxdKX1dL1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiAnbWV0YS5wcmVwcm9jZXNzb3Iuc291cmNlLnJ1c3QnLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAnXFxcXGJcXFxcd1xcXFwoXFxcXHdcXFxcKSohfCNcXFxcW1tcXFxcdz1cXFxcKFxcXFwpX10rXFxcXF1cXFxcYidcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogJ2NvbnN0YW50Lm51bWVyaWMuc291cmNlLnJ1c3QnLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvXFxiKD86MHhbYS1mQS1GMC05X10rfDBvWzAtN19dK3wwYlswMV9dK3xbMC05XVswLTlfXSooPyFcXC4pKSg/OltpdV0oPzpzaXplfDh8MTZ8MzJ8NjR8MTI4KSk/XFxiL1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiAnY29uc3RhbnQubnVtZXJpYy5zb3VyY2UucnVzdCcsXG4gICAgICAgICAgICAgICAgcmVnZXg6IC9cXGIoPzpbMC05XVswLTlfXSopKD86XFwuWzAtOV1bMC05X10qKT8oPzpbRWVdWystXVswLTldWzAtOV9dKik/KD86ZjMyfGY2NCk/XFxiL1xuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfTtcblxuICAgIHRoaXMuZW1iZWRSdWxlcyhEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMsIFwiZG9jLVwiLFxuICAgICAgICBbIERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcy5nZXRFbmRSdWxlKFwic3RhcnRcIikgXSk7XG4gICAgdGhpcy5ub3JtYWxpemVSdWxlcygpO1xufTtcblxuUnVzdEhpZ2hsaWdodFJ1bGVzLm1ldGFEYXRhID0geyBmaWxlVHlwZXM6IFsgJ3JzJywgJ3JjJyBdLFxuICAgICAgZm9sZGluZ1N0YXJ0TWFya2VyOiAnXi4qXFxcXGJmblxcXFxzKihcXFxcdytcXFxccyopP1xcXFwoW15cXFxcKV0qXFxcXCkoXFxcXHMqXFxcXHtbXlxcXFx9XSopP1xcXFxzKiQnLFxuICAgICAgZm9sZGluZ1N0b3BNYXJrZXI6ICdeXFxcXHMqXFxcXH0nLFxuICAgICAgbmFtZTogJ1J1c3QnLFxuICAgICAgc2NvcGVOYW1lOiAnc291cmNlLnJ1c3QnIH07XG5cblxub29wLmluaGVyaXRzKFJ1c3RIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuZXhwb3J0cy5SdXN0SGlnaGxpZ2h0UnVsZXMgPSBSdXN0SGlnaGxpZ2h0UnVsZXM7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=