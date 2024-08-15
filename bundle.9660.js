"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[9660],{

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

/***/ 79660:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/*
  THIS FILE WAS AUTOGENERATED BY mode.tmpl.js
*/



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var scryptHighlightRules = (__webpack_require__(16031)/* .scryptHighlightRules */ .R);
var FoldMode = (__webpack_require__(93887)/* .FoldMode */ .l);

var Mode = function () {
    this.HighlightRules = scryptHighlightRules;
    this.foldingRules = new FoldMode();
    this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, TextMode);

(function () {
    this.lineCommentStart = "//";
    this.blockComment = {
        start: "/*",
        end: "*/"
    };
    this.$quotes = {
        '"': '"',
        "'": "'"
    };

    this.createWorker = function (session) {

        return null;
    };


    this.$id = "ace/mode/scrypt";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 16031:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* This file was autogenerated from ./tmthemes/tmscrypt.tmLanguage (uuid: ) */
/****************************************************************************************
 * IT MIGHT NOT BE PERFECT ...But it's a good start from an existing *.tmlanguage file. *
 * fileTypes                                                                            *
 ****************************************************************************************/

    

    var oop = __webpack_require__(2645);
    var DocCommentHighlightRules = (__webpack_require__(42124)/* .DocCommentHighlightRules */ .l);
    var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

    var scryptHighlightRules = function () {

        var keywords = (
            "contract|library|loop|new|private|" +
            "public|if|else|struct|type|" +
            "require|static|const|import|exit|return|asm"
        );

        var buildinConstants = ("true|false");


        var langClasses = (
            "function|auto|constructor|bytes|int|bool|SigHashPreimage|PrivKey|PubKey|Sig|Ripemd160|Sha1|Sha256|" +
            "SigHashType|SigHashPreimage|OpCodeType"
        );

        var keywordMapper = this.createKeywordMapper({
            "variable.language": "this",
            "keyword": keywords,
            "constant.language": buildinConstants,
            "support.function": langClasses
        }, "identifier");

        // regexp must not have capturing parentheses. Use (?:) instead.
        // regexps are ordered -> the first match is used

        this.$rules = {
            "start": [
                {
                    token: "comment",
                    regex: "\\/\\/.*$"
                },
                DocCommentHighlightRules.getStartRule("doc-start"),
                {
                    token: "comment", // multi line comment
                    regex: "\\/\\*",
                    next: "comment"
                }, {
                    token: "string", // single line
                    regex: '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'
                }, {
                    token: "string", // single line
                    regex: "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"
                }, {
                    token: "constant.numeric", // hex
                    regex: /0(?:[xX][0-9a-fA-F][0-9a-fA-F_]*|[bB][01][01_]*)[LlSsDdFfYy]?\b/
                }, {
                    token: "constant.numeric", // float
                    regex: /[+-]?\d[\d_]*(?:(?:\.[\d_]*)?(?:[eE][+-]?[\d_]+)?)?[LlSsDdFfYy]?\b/
                }, {
                    token: "constant.language.boolean",
                    regex: "(?:true|false)\\b"
                },
                {
                    token: ["support.function.math.scrypt", "text", "text"],
                    regex: /\b(abs|min|max|within|ripemd160|sha1|sha256|hash160|hash256|checkSig|checkMultiSig|num2bin|pack|unpack|len|reverseBytes|repeat)(\s*)(\()/
                }, {
                    token: [
                        "entity.name.type.scrypt",
                        "text",
                        "text",
                        "text",
                        "variable.object.property.scrypt"
                    ],
                    regex: /\b(SigHash)(\s*)(\.)(\s*)(ANYONECANPAY|ALL|FORKID|NONE|SINGLE)\b/
                },
                {
                    token: [
                        "entity.name.type.scrypt",
                        "text",
                        "text",
                        "text",
                        "variable.object.property.scrypt"
                    ],
                    regex: /\b(OpCode)(\s*)(\.)(\s*)(OP_PUSHDATA1|OP_PUSHDATA2|OP_PUSHDATA4|OP_0|OP_FALSE|OP_1NEGATE|OP_1|OP_TRUE|OP_2|OP_3|OP_4|OP_5|OP_6|OP_7|OP_8|OP_9|OP_10|OP_11|OP_12|OP_13|OP_14|OP_15|OP_16|OP_1ADD|OP_1SUB|OP_NEGATE|OP_ABS|OP_NOT|OP_0NOTEQUAL|OP_ADD|OP_SUB|OP_MUL|OP_DIV|OP_MOD|OP_LSHIFT|OP_RSHIFT|OP_BOOLAND|OP_BOOLOR|OP_NUMEQUAL|OP_NUMEQUALVERIFY|OP_NUMNOTEQUAL|OP_LESSTHAN|OP_GREATERTHAN|OP_LESSTHANOREQUAL|OP_GREATERTHANOREQUAL|OP_MIN|OP_MAX|OP_WITHIN|OP_CAT|OP_SPLIT|OP_BIN2NUM|OP_NUM2BIN|OP_SIZE|OP_NOP|OP_IF|OP_NOTIF|OP_ELSE|OP_ENDIF|OP_VERIFY|OP_RETURN|OP_TOALTSTACK|OP_FROMALTSTACK|OP_IFDUP|OP_DEPTH|OP_DROP|OP_DUP|OP_NIP|OP_OVER|OP_PICK|OP_ROLL|OP_ROT|OP_SWAP|OP_TUCK|OP_2DROP|OP_2DUP|OP_3DUP|OP_2OVER|OP_2ROT|OP_2SWAP|OP_RIPEMD160|OP_SHA1|OP_SHA256|OP_HASH160|OP_HASH256|OP_CODESEPARATOR|OP_CHECKSIG|OP_CHECKSIGVERIFY|OP_CHECKMULTISIG|OP_CHECKMULTISIGVERIFY|OP_INVERT|OP_AND|OP_OR|OP_XOR|OP_EQUAL|OP_EQUALVERIFY)\b/
                }, {
                    token: "entity.name.type.scrypt",
                    regex: /\b(?:P2PKH|P2PK|Tx|HashPuzzleRipemd160|HashPuzzleSha1|HashPuzzleSha256|HashPuzzleHash160|OpCode|SigHash)\b/
                }, {
                    token: [
                        "punctuation.separator.period.scrypt",
                        'text',
                        "entity.name.function.scrypt",
                        "text",
                        "punctuation.definition.parameters.begin.bracket.round.scrypt"
                    ],
                    regex: /(\.)([^\S$\r]*)([\w][\w\d]*)(\s*)(\()/, 
                    push: [{
                        token: "punctuation.definition.parameters.end.bracket.round.scrypt",
                        regex: /\)/,
                        next: "pop"
                    }, {
                        defaultToken: "start"
                    }]
                }, {
                    token: keywordMapper,
                    regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
                }, {
                    token: "keyword.operator",
                    regex: "!|\\$|%|&|\\||\\^|\\*|\\/|\\-\\-|\\-|\\+\\+|\\+|~|==|=|!=|<=|>=|<>|<|>|!|&&|\\|\\||\\?|\\:|\\*=|\\/=|%=|\\+=|\\-=|&=|\\|=|\\^="
                }, {
                    token: "lparen",
                    regex: "[[({]"
                }, {
                    token: "rparen",
                    regex: "[\\])}]"
                }, {
                    token: "text",
                    regex: "\\s+"
                }
            ],
            "comment": [
                {
                    token: "comment", // closing comment
                    regex: "\\*\\/",
                    next: "start"
                }, {
                    defaultToken: "comment"
                }
            ]
        };


        this.embedRules(DocCommentHighlightRules, "doc-",
            [DocCommentHighlightRules.getEndRule("start")]);
        this.normalizeRules();
    };

    oop.inherits(scryptHighlightRules, TextHighlightRules);

    exports.R = scryptHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBLHFCQUFxQjtBQUNyQixpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsZ0NBQWdDO0FBQ2hDLGlCQUFpQjtBQUNqQjtBQUNBLGtDQUFrQztBQUNsQyxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxJQUFJLFNBQTRCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9kb2NfY29tbWVudF9oaWdobGlnaHRfcnVsZXMuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9mb2xkaW5nL2NzdHlsZS5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL3NjcnlwdC5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL3NjcnlwdF9oaWdobGlnaHRfcnVsZXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90ZXh0X2hpZ2hsaWdodF9ydWxlc1wiKS5UZXh0SGlnaGxpZ2h0UnVsZXM7XG5cbnZhciBEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy4kcnVsZXMgPSB7XG4gICAgICAgIFwic3RhcnRcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcImNvbW1lbnQuZG9jLnRhZ1wiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIkBcXFxcdysoPz1cXFxcc3wkKVwiXG4gICAgICAgICAgICB9LCBEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMuZ2V0VGFnUnVsZSgpLCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcImNvbW1lbnQuZG9jLmJvZHlcIixcbiAgICAgICAgICAgICAgICBjYXNlSW5zZW5zaXRpdmU6IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH07XG59O1xuXG5vb3AuaW5oZXJpdHMoRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLCBUZXh0SGlnaGxpZ2h0UnVsZXMpO1xuXG5Eb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMuZ2V0VGFnUnVsZSA9IGZ1bmN0aW9uKHN0YXJ0KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdG9rZW4gOiBcImNvbW1lbnQuZG9jLnRhZy5zdG9yYWdlLnR5cGVcIixcbiAgICAgICAgcmVnZXggOiBcIlxcXFxiKD86VE9ET3xGSVhNRXxYWFh8SEFDSylcXFxcYlwiXG4gICAgfTtcbn07XG5cbkRvY0NvbW1lbnRIaWdobGlnaHRSdWxlcy5nZXRTdGFydFJ1bGUgPSBmdW5jdGlvbihzdGFydCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHRva2VuIDogXCJjb21tZW50LmRvY1wiLCAvLyBkb2MgY29tbWVudFxuICAgICAgICByZWdleDogL1xcL1xcKlxcKig/IVxcLykvLFxuICAgICAgICBuZXh0ICA6IHN0YXJ0XG4gICAgfTtcbn07XG5cbkRvY0NvbW1lbnRIaWdobGlnaHRSdWxlcy5nZXRFbmRSdWxlID0gZnVuY3Rpb24gKHN0YXJ0KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdG9rZW4gOiBcImNvbW1lbnQuZG9jXCIsIC8vIGNsb3NpbmcgY29tbWVudFxuICAgICAgICByZWdleCA6IFwiXFxcXCpcXFxcL1wiLFxuICAgICAgICBuZXh0ICA6IHN0YXJ0XG4gICAgfTtcbn07XG5cblxuZXhwb3J0cy5Eb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMgPSBEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXM7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi8uLi9saWIvb29wXCIpO1xudmFyIFJhbmdlID0gcmVxdWlyZShcIi4uLy4uL3JhbmdlXCIpLlJhbmdlO1xudmFyIEJhc2VGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRfbW9kZVwiKS5Gb2xkTW9kZTtcblxudmFyIEZvbGRNb2RlID0gZXhwb3J0cy5Gb2xkTW9kZSA9IGZ1bmN0aW9uKGNvbW1lbnRSZWdleCkge1xuICAgIGlmIChjb21tZW50UmVnZXgpIHtcbiAgICAgICAgdGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIgPSBuZXcgUmVnRXhwKFxuICAgICAgICAgICAgdGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIuc291cmNlLnJlcGxhY2UoL1xcfFtefF0qPyQvLCBcInxcIiArIGNvbW1lbnRSZWdleC5zdGFydClcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5mb2xkaW5nU3RvcE1hcmtlciA9IG5ldyBSZWdFeHAoXG4gICAgICAgICAgICB0aGlzLmZvbGRpbmdTdG9wTWFya2VyLnNvdXJjZS5yZXBsYWNlKC9cXHxbXnxdKj8kLywgXCJ8XCIgKyBjb21tZW50UmVnZXguZW5kKVxuICAgICAgICApO1xuICAgIH1cbn07XG5vb3AuaW5oZXJpdHMoRm9sZE1vZGUsIEJhc2VGb2xkTW9kZSk7XG5cbihmdW5jdGlvbigpIHtcbiAgICBcbiAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlciA9IC8oW1xce1xcW1xcKF0pW15cXH1cXF1cXCldKiR8XlxccyooXFwvXFwqKS87XG4gICAgdGhpcy5mb2xkaW5nU3RvcE1hcmtlciA9IC9eW15cXFtcXHtcXChdKihbXFx9XFxdXFwpXSl8XltcXHNcXCpdKihcXCpcXC8pLztcbiAgICB0aGlzLnNpbmdsZUxpbmVCbG9ja0NvbW1lbnRSZT0gL15cXHMqKFxcL1xcKikuKlxcKlxcL1xccyokLztcbiAgICB0aGlzLnRyaXBsZVN0YXJCbG9ja0NvbW1lbnRSZSA9IC9eXFxzKihcXC9cXCpcXCpcXCopLipcXCpcXC9cXHMqJC87XG4gICAgdGhpcy5zdGFydFJlZ2lvblJlID0gL15cXHMqKFxcL1xcKnxcXC9cXC8pIz9yZWdpb25cXGIvO1xuICAgIFxuICAgIC8vcHJldmVudCBuYW1pbmcgY29uZmxpY3Qgd2l0aCBhbnkgbW9kZXMgdGhhdCBpbmhlcml0IGZyb20gY3N0eWxlIGFuZCBvdmVycmlkZSB0aGlzIChsaWtlIGNzaGFycClcbiAgICB0aGlzLl9nZXRGb2xkV2lkZ2V0QmFzZSA9IHRoaXMuZ2V0Rm9sZFdpZGdldDtcbiAgICBcbiAgICAvKipcbiAgICAgKiBHZXRzIGZvbGQgd2lkZ2V0IHdpdGggc29tZSBub24tc3RhbmRhcmQgZXh0cmFzOlxuICAgICAqXG4gICAgICogQGV4YW1wbGUgbGluZUNvbW1lbnRSZWdpb25TdGFydFxuICAgICAqICAgICAgLy8jcmVnaW9uIFtvcHRpb25hbCBkZXNjcmlwdGlvbl1cbiAgICAgKlxuICAgICAqIEBleGFtcGxlIGJsb2NrQ29tbWVudFJlZ2lvblN0YXJ0XG4gICAgICogICAgICAvKiNyZWdpb24gW29wdGlvbmFsIGRlc2NyaXB0aW9uXSAqWy9dXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSB0cmlwbGVTdGFyRm9sZGluZ1NlY3Rpb25cbiAgICAgKiAgICAgIC8qKiogdGhpcyBmb2xkcyBldmVuIHRob3VnaCAxIGxpbmUgYmVjYXVzZSBpdCBoYXMgMyBzdGFycyAqKipbL11cbiAgICAgKiBcbiAgICAgKiBAbm90ZSB0aGUgcG91bmQgc3ltYm9sIGZvciByZWdpb24gdGFncyBpcyBvcHRpb25hbFxuICAgICAqL1xuICAgIHRoaXMuZ2V0Rm9sZFdpZGdldCA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgXG4gICAgICAgIGlmICh0aGlzLnNpbmdsZUxpbmVCbG9ja0NvbW1lbnRSZS50ZXN0KGxpbmUpKSB7XG4gICAgICAgICAgICAvLyBObyB3aWRnZXQgZm9yIHNpbmdsZSBsaW5lIGJsb2NrIGNvbW1lbnQgdW5sZXNzIHJlZ2lvbiBvciB0cmlwbGUgc3RhclxuICAgICAgICAgICAgaWYgKCF0aGlzLnN0YXJ0UmVnaW9uUmUudGVzdChsaW5lKSAmJiAhdGhpcy50cmlwbGVTdGFyQmxvY2tDb21tZW50UmUudGVzdChsaW5lKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICB2YXIgZncgPSB0aGlzLl9nZXRGb2xkV2lkZ2V0QmFzZShzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdyk7XG4gICAgXG4gICAgICAgIGlmICghZncgJiYgdGhpcy5zdGFydFJlZ2lvblJlLnRlc3QobGluZSkpXG4gICAgICAgICAgICByZXR1cm4gXCJzdGFydFwiOyAvLyBsaW5lQ29tbWVudFJlZ2lvblN0YXJ0XG4gICAgXG4gICAgICAgIHJldHVybiBmdztcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0UmFuZ2UgPSBmdW5jdGlvbihzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdywgZm9yY2VNdWx0aWxpbmUpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLnN0YXJ0UmVnaW9uUmUudGVzdChsaW5lKSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldENvbW1lbnRSZWdpb25CbG9jayhzZXNzaW9uLCBsaW5lLCByb3cpO1xuICAgICAgICBcbiAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCh0aGlzLmZvbGRpbmdTdGFydE1hcmtlcik7XG4gICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgdmFyIGkgPSBtYXRjaC5pbmRleDtcblxuICAgICAgICAgICAgaWYgKG1hdGNoWzFdKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm9wZW5pbmdCcmFja2V0QmxvY2soc2Vzc2lvbiwgbWF0Y2hbMV0sIHJvdywgaSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgcmFuZ2UgPSBzZXNzaW9uLmdldENvbW1lbnRGb2xkUmFuZ2Uocm93LCBpICsgbWF0Y2hbMF0ubGVuZ3RoLCAxKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHJhbmdlICYmICFyYW5nZS5pc011bHRpTGluZSgpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZvcmNlTXVsdGlsaW5lKSB7XG4gICAgICAgICAgICAgICAgICAgIHJhbmdlID0gdGhpcy5nZXRTZWN0aW9uUmFuZ2Uoc2Vzc2lvbiwgcm93KTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZvbGRTdHlsZSAhPSBcImFsbFwiKVxuICAgICAgICAgICAgICAgICAgICByYW5nZSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiByYW5nZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmb2xkU3R5bGUgPT09IFwibWFya2JlZ2luXCIpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCh0aGlzLmZvbGRpbmdTdG9wTWFya2VyKTtcbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICB2YXIgaSA9IG1hdGNoLmluZGV4ICsgbWF0Y2hbMF0ubGVuZ3RoO1xuXG4gICAgICAgICAgICBpZiAobWF0Y2hbMV0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2xvc2luZ0JyYWNrZXRCbG9jayhzZXNzaW9uLCBtYXRjaFsxXSwgcm93LCBpKTtcblxuICAgICAgICAgICAgcmV0dXJuIHNlc3Npb24uZ2V0Q29tbWVudEZvbGRSYW5nZShyb3csIGksIC0xKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgXG4gICAgdGhpcy5nZXRTZWN0aW9uUmFuZ2UgPSBmdW5jdGlvbihzZXNzaW9uLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgdmFyIHN0YXJ0SW5kZW50ID0gbGluZS5zZWFyY2goL1xcUy8pO1xuICAgICAgICB2YXIgc3RhcnRSb3cgPSByb3c7XG4gICAgICAgIHZhciBzdGFydENvbHVtbiA9IGxpbmUubGVuZ3RoO1xuICAgICAgICByb3cgPSByb3cgKyAxO1xuICAgICAgICB2YXIgZW5kUm93ID0gcm93O1xuICAgICAgICB2YXIgbWF4Um93ID0gc2Vzc2lvbi5nZXRMZW5ndGgoKTtcbiAgICAgICAgd2hpbGUgKCsrcm93IDwgbWF4Um93KSB7XG4gICAgICAgICAgICBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgICAgICB2YXIgaW5kZW50ID0gbGluZS5zZWFyY2goL1xcUy8pO1xuICAgICAgICAgICAgaWYgKGluZGVudCA9PT0gLTEpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICBpZiAgKHN0YXJ0SW5kZW50ID4gaW5kZW50KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgdmFyIHN1YlJhbmdlID0gdGhpcy5nZXRGb2xkV2lkZ2V0UmFuZ2Uoc2Vzc2lvbiwgXCJhbGxcIiwgcm93KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHN1YlJhbmdlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN1YlJhbmdlLnN0YXJ0LnJvdyA8PSBzdGFydFJvdykge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN1YlJhbmdlLmlzTXVsdGlMaW5lKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcm93ID0gc3ViUmFuZ2UuZW5kLnJvdztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXJ0SW5kZW50ID09IGluZGVudCkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbmRSb3cgPSByb3c7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBuZXcgUmFuZ2Uoc3RhcnRSb3csIHN0YXJ0Q29sdW1uLCBlbmRSb3csIHNlc3Npb24uZ2V0TGluZShlbmRSb3cpLmxlbmd0aCk7XG4gICAgfTtcbiAgICBcbiAgICAvKipcbiAgICAgKiBnZXRzIGNvbW1lbnQgcmVnaW9uIGJsb2NrIHdpdGggZW5kIHJlZ2lvbiBhc3N1bWVkIHRvIGJlIHN0YXJ0IG9mIGNvbW1lbnQgaW4gYW55IGNzdHlsZSBtb2RlIG9yIFNRTCBtb2RlICgtLSkgd2hpY2ggaW5oZXJpdHMgZnJvbSB0aGlzLlxuICAgICAqIFRoZXJlIG1heSBvcHRpb25hbGx5IGJlIGEgcG91bmQgc3ltYm9sIGJlZm9yZSB0aGUgcmVnaW9uL2VuZHJlZ2lvbiBzdGF0ZW1lbnRcbiAgICAgKi9cbiAgICB0aGlzLmdldENvbW1lbnRSZWdpb25CbG9jayA9IGZ1bmN0aW9uKHNlc3Npb24sIGxpbmUsIHJvdykge1xuICAgICAgICB2YXIgc3RhcnRDb2x1bW4gPSBsaW5lLnNlYXJjaCgvXFxzKiQvKTtcbiAgICAgICAgdmFyIG1heFJvdyA9IHNlc3Npb24uZ2V0TGVuZ3RoKCk7XG4gICAgICAgIHZhciBzdGFydFJvdyA9IHJvdztcbiAgICAgICAgXG4gICAgICAgIHZhciByZSA9IC9eXFxzKig/OlxcL1xcKnxcXC9cXC98LS0pIz8oZW5kKT9yZWdpb25cXGIvO1xuICAgICAgICB2YXIgZGVwdGggPSAxO1xuICAgICAgICB3aGlsZSAoKytyb3cgPCBtYXhSb3cpIHtcbiAgICAgICAgICAgIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgICAgIHZhciBtID0gcmUuZXhlYyhsaW5lKTtcbiAgICAgICAgICAgIGlmICghbSkgY29udGludWU7XG4gICAgICAgICAgICBpZiAobVsxXSkgZGVwdGgtLTtcbiAgICAgICAgICAgIGVsc2UgZGVwdGgrKztcblxuICAgICAgICAgICAgaWYgKCFkZXB0aCkgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZW5kUm93ID0gcm93O1xuICAgICAgICBpZiAoZW5kUm93ID4gc3RhcnRSb3cpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmFuZ2Uoc3RhcnRSb3csIHN0YXJ0Q29sdW1uLCBlbmRSb3csIGxpbmUubGVuZ3RoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbn0pLmNhbGwoRm9sZE1vZGUucHJvdG90eXBlKTtcbiIsIi8qXG4gIFRISVMgRklMRSBXQVMgQVVUT0dFTkVSQVRFRCBCWSBtb2RlLnRtcGwuanNcbiovXG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dE1vZGUgPSByZXF1aXJlKFwiLi90ZXh0XCIpLk1vZGU7XG52YXIgc2NyeXB0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9zY3J5cHRfaGlnaGxpZ2h0X3J1bGVzXCIpLnNjcnlwdEhpZ2hsaWdodFJ1bGVzO1xudmFyIEZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZGluZy9jc3R5bGVcIikuRm9sZE1vZGU7XG5cbnZhciBNb2RlID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuSGlnaGxpZ2h0UnVsZXMgPSBzY3J5cHRIaWdobGlnaHRSdWxlcztcbiAgICB0aGlzLmZvbGRpbmdSdWxlcyA9IG5ldyBGb2xkTW9kZSgpO1xuICAgIHRoaXMuJGJlaGF2aW91ciA9IHRoaXMuJGRlZmF1bHRCZWhhdmlvdXI7XG59O1xub29wLmluaGVyaXRzKE1vZGUsIFRleHRNb2RlKTtcblxuKGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmxpbmVDb21tZW50U3RhcnQgPSBcIi8vXCI7XG4gICAgdGhpcy5ibG9ja0NvbW1lbnQgPSB7XG4gICAgICAgIHN0YXJ0OiBcIi8qXCIsXG4gICAgICAgIGVuZDogXCIqL1wiXG4gICAgfTtcbiAgICB0aGlzLiRxdW90ZXMgPSB7XG4gICAgICAgICdcIic6ICdcIicsXG4gICAgICAgIFwiJ1wiOiBcIidcIlxuICAgIH07XG5cbiAgICB0aGlzLmNyZWF0ZVdvcmtlciA9IGZ1bmN0aW9uIChzZXNzaW9uKSB7XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcblxuXG4gICAgdGhpcy4kaWQgPSBcImFjZS9tb2RlL3NjcnlwdFwiO1xufSkuY2FsbChNb2RlLnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTW9kZSA9IE1vZGU7XG4iLCIvKiBUaGlzIGZpbGUgd2FzIGF1dG9nZW5lcmF0ZWQgZnJvbSAuL3RtdGhlbWVzL3Rtc2NyeXB0LnRtTGFuZ3VhZ2UgKHV1aWQ6ICkgKi9cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBJVCBNSUdIVCBOT1QgQkUgUEVSRkVDVCAuLi5CdXQgaXQncyBhIGdvb2Qgc3RhcnQgZnJvbSBhbiBleGlzdGluZyAqLnRtbGFuZ3VhZ2UgZmlsZS4gKlxuICogZmlsZVR5cGVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICB2YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG4gICAgdmFyIERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL2RvY19jb21tZW50X2hpZ2hsaWdodF9ydWxlc1wiKS5Eb2NDb21tZW50SGlnaGxpZ2h0UnVsZXM7XG4gICAgdmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcblxuICAgIHZhciBzY3J5cHRIaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICB2YXIga2V5d29yZHMgPSAoXG4gICAgICAgICAgICBcImNvbnRyYWN0fGxpYnJhcnl8bG9vcHxuZXd8cHJpdmF0ZXxcIiArXG4gICAgICAgICAgICBcInB1YmxpY3xpZnxlbHNlfHN0cnVjdHx0eXBlfFwiICtcbiAgICAgICAgICAgIFwicmVxdWlyZXxzdGF0aWN8Y29uc3R8aW1wb3J0fGV4aXR8cmV0dXJufGFzbVwiXG4gICAgICAgICk7XG5cbiAgICAgICAgdmFyIGJ1aWxkaW5Db25zdGFudHMgPSAoXCJ0cnVlfGZhbHNlXCIpO1xuXG5cbiAgICAgICAgdmFyIGxhbmdDbGFzc2VzID0gKFxuICAgICAgICAgICAgXCJmdW5jdGlvbnxhdXRvfGNvbnN0cnVjdG9yfGJ5dGVzfGludHxib29sfFNpZ0hhc2hQcmVpbWFnZXxQcml2S2V5fFB1YktleXxTaWd8UmlwZW1kMTYwfFNoYTF8U2hhMjU2fFwiICtcbiAgICAgICAgICAgIFwiU2lnSGFzaFR5cGV8U2lnSGFzaFByZWltYWdlfE9wQ29kZVR5cGVcIlxuICAgICAgICApO1xuXG4gICAgICAgIHZhciBrZXl3b3JkTWFwcGVyID0gdGhpcy5jcmVhdGVLZXl3b3JkTWFwcGVyKHtcbiAgICAgICAgICAgIFwidmFyaWFibGUubGFuZ3VhZ2VcIjogXCJ0aGlzXCIsXG4gICAgICAgICAgICBcImtleXdvcmRcIjoga2V5d29yZHMsXG4gICAgICAgICAgICBcImNvbnN0YW50Lmxhbmd1YWdlXCI6IGJ1aWxkaW5Db25zdGFudHMsXG4gICAgICAgICAgICBcInN1cHBvcnQuZnVuY3Rpb25cIjogbGFuZ0NsYXNzZXNcbiAgICAgICAgfSwgXCJpZGVudGlmaWVyXCIpO1xuXG4gICAgICAgIC8vIHJlZ2V4cCBtdXN0IG5vdCBoYXZlIGNhcHR1cmluZyBwYXJlbnRoZXNlcy4gVXNlICg/OikgaW5zdGVhZC5cbiAgICAgICAgLy8gcmVnZXhwcyBhcmUgb3JkZXJlZCAtPiB0aGUgZmlyc3QgbWF0Y2ggaXMgdXNlZFxuXG4gICAgICAgIHRoaXMuJHJ1bGVzID0ge1xuICAgICAgICAgICAgXCJzdGFydFwiOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJjb21tZW50XCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFwvXFxcXC8uKiRcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLmdldFN0YXJ0UnVsZShcImRvYy1zdGFydFwiKSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuOiBcImNvbW1lbnRcIiwgLy8gbXVsdGkgbGluZSBjb21tZW50XG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFwvXFxcXCpcIixcbiAgICAgICAgICAgICAgICAgICAgbmV4dDogXCJjb21tZW50XCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuOiBcInN0cmluZ1wiLCAvLyBzaW5nbGUgbGluZVxuICAgICAgICAgICAgICAgICAgICByZWdleDogJ1tcIl0oPzooPzpcXFxcXFxcXC4pfCg/OlteXCJcXFxcXFxcXF0pKSo/W1wiXSdcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuOiBcInN0cmluZ1wiLCAvLyBzaW5nbGUgbGluZVxuICAgICAgICAgICAgICAgICAgICByZWdleDogXCJbJ10oPzooPzpcXFxcXFxcXC4pfCg/OlteJ1xcXFxcXFxcXSkpKj9bJ11cIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQubnVtZXJpY1wiLCAvLyBoZXhcbiAgICAgICAgICAgICAgICAgICAgcmVnZXg6IC8wKD86W3hYXVswLTlhLWZBLUZdWzAtOWEtZkEtRl9dKnxbYkJdWzAxXVswMV9dKilbTGxTc0RkRmZZeV0/XFxiL1xuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQubnVtZXJpY1wiLCAvLyBmbG9hdFxuICAgICAgICAgICAgICAgICAgICByZWdleDogL1srLV0/XFxkW1xcZF9dKig/Oig/OlxcLltcXGRfXSopPyg/OltlRV1bKy1dP1tcXGRfXSspPyk/W0xsU3NEZEZmWXldP1xcYi9cbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lmxhbmd1YWdlLmJvb2xlYW5cIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXg6IFwiKD86dHJ1ZXxmYWxzZSlcXFxcYlwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuOiBbXCJzdXBwb3J0LmZ1bmN0aW9uLm1hdGguc2NyeXB0XCIsIFwidGV4dFwiLCBcInRleHRcIl0sXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAvXFxiKGFic3xtaW58bWF4fHdpdGhpbnxyaXBlbWQxNjB8c2hhMXxzaGEyNTZ8aGFzaDE2MHxoYXNoMjU2fGNoZWNrU2lnfGNoZWNrTXVsdGlTaWd8bnVtMmJpbnxwYWNrfHVucGFja3xsZW58cmV2ZXJzZUJ5dGVzfHJlcGVhdCkoXFxzKikoXFwoKS9cbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcImVudGl0eS5uYW1lLnR5cGUuc2NyeXB0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInZhcmlhYmxlLm9iamVjdC5wcm9wZXJ0eS5zY3J5cHRcIlxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICByZWdleDogL1xcYihTaWdIYXNoKShcXHMqKShcXC4pKFxccyopKEFOWU9ORUNBTlBBWXxBTEx8Rk9SS0lEfE5PTkV8U0lOR0xFKVxcYi9cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW46IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZW50aXR5Lm5hbWUudHlwZS5zY3J5cHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmFyaWFibGUub2JqZWN0LnByb3BlcnR5LnNjcnlwdFwiXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAvXFxiKE9wQ29kZSkoXFxzKikoXFwuKShcXHMqKShPUF9QVVNIREFUQTF8T1BfUFVTSERBVEEyfE9QX1BVU0hEQVRBNHxPUF8wfE9QX0ZBTFNFfE9QXzFORUdBVEV8T1BfMXxPUF9UUlVFfE9QXzJ8T1BfM3xPUF80fE9QXzV8T1BfNnxPUF83fE9QXzh8T1BfOXxPUF8xMHxPUF8xMXxPUF8xMnxPUF8xM3xPUF8xNHxPUF8xNXxPUF8xNnxPUF8xQUREfE9QXzFTVUJ8T1BfTkVHQVRFfE9QX0FCU3xPUF9OT1R8T1BfME5PVEVRVUFMfE9QX0FERHxPUF9TVUJ8T1BfTVVMfE9QX0RJVnxPUF9NT0R8T1BfTFNISUZUfE9QX1JTSElGVHxPUF9CT09MQU5EfE9QX0JPT0xPUnxPUF9OVU1FUVVBTHxPUF9OVU1FUVVBTFZFUklGWXxPUF9OVU1OT1RFUVVBTHxPUF9MRVNTVEhBTnxPUF9HUkVBVEVSVEhBTnxPUF9MRVNTVEhBTk9SRVFVQUx8T1BfR1JFQVRFUlRIQU5PUkVRVUFMfE9QX01JTnxPUF9NQVh8T1BfV0lUSElOfE9QX0NBVHxPUF9TUExJVHxPUF9CSU4yTlVNfE9QX05VTTJCSU58T1BfU0laRXxPUF9OT1B8T1BfSUZ8T1BfTk9USUZ8T1BfRUxTRXxPUF9FTkRJRnxPUF9WRVJJRll8T1BfUkVUVVJOfE9QX1RPQUxUU1RBQ0t8T1BfRlJPTUFMVFNUQUNLfE9QX0lGRFVQfE9QX0RFUFRIfE9QX0RST1B8T1BfRFVQfE9QX05JUHxPUF9PVkVSfE9QX1BJQ0t8T1BfUk9MTHxPUF9ST1R8T1BfU1dBUHxPUF9UVUNLfE9QXzJEUk9QfE9QXzJEVVB8T1BfM0RVUHxPUF8yT1ZFUnxPUF8yUk9UfE9QXzJTV0FQfE9QX1JJUEVNRDE2MHxPUF9TSEExfE9QX1NIQTI1NnxPUF9IQVNIMTYwfE9QX0hBU0gyNTZ8T1BfQ09ERVNFUEFSQVRPUnxPUF9DSEVDS1NJR3xPUF9DSEVDS1NJR1ZFUklGWXxPUF9DSEVDS01VTFRJU0lHfE9QX0NIRUNLTVVMVElTSUdWRVJJRll8T1BfSU5WRVJUfE9QX0FORHxPUF9PUnxPUF9YT1J8T1BfRVFVQUx8T1BfRVFVQUxWRVJJRlkpXFxiL1xuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwiZW50aXR5Lm5hbWUudHlwZS5zY3J5cHRcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXg6IC9cXGIoPzpQMlBLSHxQMlBLfFR4fEhhc2hQdXp6bGVSaXBlbWQxNjB8SGFzaFB1enpsZVNoYTF8SGFzaFB1enpsZVNoYTI1NnxIYXNoUHV6emxlSGFzaDE2MHxPcENvZGV8U2lnSGFzaClcXGIvXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJwdW5jdHVhdGlvbi5zZXBhcmF0b3IucGVyaW9kLnNjcnlwdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3RleHQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJlbnRpdHkubmFtZS5mdW5jdGlvbi5zY3J5cHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnBhcmFtZXRlcnMuYmVnaW4uYnJhY2tldC5yb3VuZC5zY3J5cHRcIlxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICByZWdleDogLyhcXC4pKFteXFxTJFxccl0qKShbXFx3XVtcXHdcXGRdKikoXFxzKikoXFwoKS8sIFxuICAgICAgICAgICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwicHVuY3R1YXRpb24uZGVmaW5pdGlvbi5wYXJhbWV0ZXJzLmVuZC5icmFja2V0LnJvdW5kLnNjcnlwdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXg6IC9cXCkvLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwic3RhcnRcIlxuICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW46IGtleXdvcmRNYXBwZXIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4OiBcIlthLXpBLVpfJF1bYS16QS1aMC05XyRdKlxcXFxiXCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuOiBcImtleXdvcmQub3BlcmF0b3JcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXg6IFwiIXxcXFxcJHwlfCZ8XFxcXHx8XFxcXF58XFxcXCp8XFxcXC98XFxcXC1cXFxcLXxcXFxcLXxcXFxcK1xcXFwrfFxcXFwrfH58PT18PXwhPXw8PXw+PXw8Pnw8fD58IXwmJnxcXFxcfFxcXFx8fFxcXFw/fFxcXFw6fFxcXFwqPXxcXFxcLz18JT18XFxcXCs9fFxcXFwtPXwmPXxcXFxcfD18XFxcXF49XCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuOiBcImxwYXJlblwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleDogXCJbWyh7XVwiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJycGFyZW5cIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXg6IFwiW1xcXFxdKX1dXCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXg6IFwiXFxcXHMrXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgXCJjb21tZW50XCI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuOiBcImNvbW1lbnRcIiwgLy8gY2xvc2luZyBjb21tZW50XG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFwqXFxcXC9cIixcbiAgICAgICAgICAgICAgICAgICAgbmV4dDogXCJzdGFydFwiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwiY29tbWVudFwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuXG5cbiAgICAgICAgdGhpcy5lbWJlZFJ1bGVzKERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcywgXCJkb2MtXCIsXG4gICAgICAgICAgICBbRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLmdldEVuZFJ1bGUoXCJzdGFydFwiKV0pO1xuICAgICAgICB0aGlzLm5vcm1hbGl6ZVJ1bGVzKCk7XG4gICAgfTtcblxuICAgIG9vcC5pbmhlcml0cyhzY3J5cHRIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuICAgIGV4cG9ydHMuc2NyeXB0SGlnaGxpZ2h0UnVsZXMgPSBzY3J5cHRIaWdobGlnaHRSdWxlcztcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==