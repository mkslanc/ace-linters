"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[3764],{

/***/ 73764:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* caption: Apex; extensions: apex,cls,trigger,tgr */



var oop = __webpack_require__(89359);
var TextMode = (__webpack_require__(98030).Mode);
var ApexHighlightRules = (__webpack_require__(96362)/* .ApexHighlightRules */ .t);
var FoldMode = (__webpack_require__(12764)/* .FoldMode */ .Z);

function ApexMode() {
    TextMode.call(this);

    this.HighlightRules = ApexHighlightRules;
    this.foldingRules = new FoldMode();
    this.$behaviour = this.$defaultBehaviour;
}

oop.inherits(ApexMode, TextMode);

ApexMode.prototype.lineCommentStart = "//";

ApexMode.prototype.blockComment = {
    start: "/*",
    end: "*/"
};

exports.Mode = ApexMode;


/***/ }),

/***/ 96362:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var TextHighlightRules = (__webpack_require__(28053)/* .TextHighlightRules */ .K);
var DocCommentHighlightRules = (__webpack_require__(62718)/* .DocCommentHighlightRules */ .c);

var ApexHighlightRules = function() {
    var mainKeywordMapper = this.createKeywordMapper({
        "variable.language": "activate|any|autonomous|begin|bigdecimal|byte|cast|char|collect|const"
             + "|end|exit|export|float|goto|group|having|hint|import|inner|into|join|loop|number|object|of|outer"
             + "|parallel|pragma|retrieve|returning|search|short|stat|synchronized|then|this_month"
             + "|transaction|type|when",
        "keyword": "private|protected|public|native|synchronized|abstract|threadsafe|transient|static|final"
             + "|and|array|as|asc|break|bulk|by|catch|class|commit|continue|convertcurrency"
             + "|delete|desc|do|else|enum|extends|false|final|finally|for|from|future|global"
             + "|if|implements|in|insert|instanceof|interface|last_90_days|last_month"
             + "|last_n_days|last_week|like|limit|list|map|merge|new|next_90_days|next_month|next_n_days"
             + "|next_week|not|null|nulls|on|or|override|package|return"
             + "|rollback|savepoint|select|set|sort|super|testmethod|this|this_week|throw|today"
             + "|tolabel|tomorrow|trigger|true|try|undelete|update|upsert|using|virtual|webservice"
             + "|where|while|yesterday|switch|case|default",
        "storage.type":
            "def|boolean|byte|char|short|int|float|pblob|date|datetime|decimal|double|id|integer|long|string|time|void|blob|Object",
        "constant.language":
            "true|false|null|after|before|count|excludes|first|includes|last|order|sharing|with",
        "support.function":
            "system|apex|label|apexpages|userinfo|schema"
    }, "identifier", true);
    function keywordMapper(value) {
        if (value.slice(-3) == "__c") return "support.function";
        return mainKeywordMapper(value);
    }
    
    function string(start, options) {
        return {
            regex: start + (options.multiline ? "" : "(?=.)"),
            token: "string.start",
            next: [{
                regex: options.escape,
                token: "character.escape"
            }, {
                regex: options.error,
                token: "error.invalid"
            }, {
                regex: start + (options.multiline ? "" : "|$"),
                token: "string.end",
                next: options.next || "start"
            }, {
                defaultToken: "string"
            }]
        };
    }
    
    function comments() {
        return [{
                token : "comment",
                regex : "\\/\\/(?=.)",
                next : [
                    DocCommentHighlightRules.getTagRule(),
                    {token : "comment", regex : "$|^", next : "start"},
                    {defaultToken : "comment", caseInsensitive: true}
                ]
            },
            DocCommentHighlightRules.getStartRule("doc-start"),
            {
                token : "comment", // multi line comment
                regex : /\/\*/,
                next : [
                    DocCommentHighlightRules.getTagRule(),
                    {token : "comment", regex : "\\*\\/", next : "start"},
                    {defaultToken : "comment", caseInsensitive: true}
                ]
            }
        ];
    }
    
    this.$rules = {
        start: [
            string("'", {
                escape: /\\[nb'"\\]/,
                error: /\\./,
                multiline: false
            }),
            comments("c"),
            {
                type: "decoration",
                token: [
                    "meta.package.apex",
                    "keyword.other.package.apex",
                    "meta.package.apex",
                    "storage.modifier.package.apex",
                    "meta.package.apex",
                    "punctuation.terminator.apex"
                ],
                regex: /^(\s*)(package)\b(?:(\s*)([^ ;$]+)(\s*)((?:;)?))?/
            }, {
                 regex: /@[a-zA-Z_$][a-zA-Z_$\d\u0080-\ufffe]*/,
                 token: "constant.language"
            },
            {
                regex: /[a-zA-Z_$][a-zA-Z_$\d\u0080-\ufffe]*/,
                token: keywordMapper
            },  
            {
                regex: "`#%",
                token: "error.invalid"
            }, {
                token : "constant.numeric", // float
                regex : /[+-]?\d+(?:(?:\.\d*)?(?:[LlDdEe][+-]?\d+)?)\b|\.\d+[LlDdEe]/
            }, {
                token : "keyword.operator",
                regex : /--|\+\+|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\|\||\?\:|[!$%&*+\-~\/^]=?/,
                next  : "start"
            }, {
                token : "punctuation.operator",
                regex : /[?:,;.]/,
                next  : "start"
            }, {
                token : "paren.lparen",
                regex : /[\[]/,
                next  : "maybe_soql",
                merge : false
            }, {
                token : "paren.lparen",
                regex : /[\[({]/,
                next  : "start",
                merge : false
            }, {
                token : "paren.rparen",
                regex : /[\])}]/,
                merge : false
            } 
        ], 
        maybe_soql: [{
            regex: /\s+/,
            token: "text"
        }, {
            regex: /(SELECT|FIND)\b/,
            token: "keyword",
            caseInsensitive: true,
            next: "soql"
        }, {
            regex: "",
            token: "none",
            next: "start"
        }],
        soql: [{
            regex: "(:?ASC|BY|CATEGORY|CUBE|DATA|DESC|END|FIND|FIRST|FOR|FROM|GROUP|HAVING|IN|LAST"
                + "|LIMIT|NETWORK|NULLS|OFFSET|ORDER|REFERENCE|RETURNING|ROLLUP|SCOPE|SELECT"
                + "|SNIPPET|TRACKING|TYPEOF|UPDATE|USING|VIEW|VIEWSTAT|WHERE|WITH|AND|OR)\\b",
            token: "keyword",
            caseInsensitive: true
        }, {
            regex: "(:?target_length|toLabel|convertCurrency|count|Contact|Account|User|FIELDS)\\b",
            token: "support.function",
            caseInsensitive: true
        }, {
            token : "paren.rparen",
            regex : /[\]]/,
            next  : "start",
            merge : false
        }, 
        string("'", {
            escape: /\\[nb'"\\]/,
            error: /\\./,
            multiline: false,
            next: "soql"
        }),
        string('"', {
            escape: /\\[nb'"\\]/,
            error: /\\./,
            multiline: false,
            next: "soql"
        }),
        {
            regex: /\\./,
            token: "character.escape"
        },
        {
            regex : /[\?\&\|\!\{\}\[\]\(\)\^\~\*\:\"\'\+\-\,\.=\\\/]/,
            token : "keyword.operator"
        }],
        
        "log-start" : [ {
            token : "timestamp.invisible",
            regex : /^[\d:.() ]+\|/, 
            next: "log-header"
        },  {
            token : "timestamp.invisible",
            regex : /^  (Number of|Maximum)[^:]*:/,
            next: "log-comment"
        }, {
            token : "invisible",
            regex : /^Execute Anonymous:/,
            next: "log-comment"
        },  {
            defaultToken: "text"
        }],
        "log-comment": [{
            token : "log-comment",
            regex : /.*$/,
            next: "log-start"
        }],
        "log-header": [{
            token : "timestamp.invisible",
            regex : /((USER_DEBUG|\[\d+\]|DEBUG)\|)+/
        },
        {
            token : "keyword",
            regex: "(?:EXECUTION_FINISHED|EXECUTION_STARTED|CODE_UNIT_STARTED"
                + "|CUMULATIVE_LIMIT_USAGE|LIMIT_USAGE_FOR_NS"
                + "|CUMULATIVE_LIMIT_USAGE_END|CODE_UNIT_FINISHED)"
        }, {
            regex: "",
            next: "log-start"
        }]
    };
    this.embedRules(DocCommentHighlightRules, "doc-",
        [ DocCommentHighlightRules.getEndRule("start") ]);
        

    this.normalizeRules();
};


oop.inherits(ApexHighlightRules, TextHighlightRules);

exports.t = ApexHighlightRules;


/***/ }),

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


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvYXBleC5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2FwZXhfaGlnaGxpZ2h0X3J1bGVzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvZG9jX2NvbW1lbnRfaGlnaGxpZ2h0X3J1bGVzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvZm9sZGluZy9jc3R5bGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyogY2FwdGlvbjogQXBleDsgZXh0ZW5zaW9uczogYXBleCxjbHMsdHJpZ2dlcix0Z3IgKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0TW9kZSA9IHJlcXVpcmUoXCIuLi9tb2RlL3RleHRcIikuTW9kZTtcbnZhciBBcGV4SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9hcGV4X2hpZ2hsaWdodF9ydWxlc1wiKS5BcGV4SGlnaGxpZ2h0UnVsZXM7XG52YXIgRm9sZE1vZGUgPSByZXF1aXJlKFwiLi4vbW9kZS9mb2xkaW5nL2NzdHlsZVwiKS5Gb2xkTW9kZTtcblxuZnVuY3Rpb24gQXBleE1vZGUoKSB7XG4gICAgVGV4dE1vZGUuY2FsbCh0aGlzKTtcblxuICAgIHRoaXMuSGlnaGxpZ2h0UnVsZXMgPSBBcGV4SGlnaGxpZ2h0UnVsZXM7XG4gICAgdGhpcy5mb2xkaW5nUnVsZXMgPSBuZXcgRm9sZE1vZGUoKTtcbiAgICB0aGlzLiRiZWhhdmlvdXIgPSB0aGlzLiRkZWZhdWx0QmVoYXZpb3VyO1xufVxuXG5vb3AuaW5oZXJpdHMoQXBleE1vZGUsIFRleHRNb2RlKTtcblxuQXBleE1vZGUucHJvdG90eXBlLmxpbmVDb21tZW50U3RhcnQgPSBcIi8vXCI7XG5cbkFwZXhNb2RlLnByb3RvdHlwZS5ibG9ja0NvbW1lbnQgPSB7XG4gICAgc3RhcnQ6IFwiLypcIixcbiAgICBlbmQ6IFwiKi9cIlxufTtcblxuZXhwb3J0cy5Nb2RlID0gQXBleE1vZGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuLi9tb2RlL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcbnZhciBEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi4vbW9kZS9kb2NfY29tbWVudF9oaWdobGlnaHRfcnVsZXNcIikuRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzO1xuXG52YXIgQXBleEhpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG1haW5LZXl3b3JkTWFwcGVyID0gdGhpcy5jcmVhdGVLZXl3b3JkTWFwcGVyKHtcbiAgICAgICAgXCJ2YXJpYWJsZS5sYW5ndWFnZVwiOiBcImFjdGl2YXRlfGFueXxhdXRvbm9tb3VzfGJlZ2lufGJpZ2RlY2ltYWx8Ynl0ZXxjYXN0fGNoYXJ8Y29sbGVjdHxjb25zdFwiXG4gICAgICAgICAgICAgKyBcInxlbmR8ZXhpdHxleHBvcnR8ZmxvYXR8Z290b3xncm91cHxoYXZpbmd8aGludHxpbXBvcnR8aW5uZXJ8aW50b3xqb2lufGxvb3B8bnVtYmVyfG9iamVjdHxvZnxvdXRlclwiXG4gICAgICAgICAgICAgKyBcInxwYXJhbGxlbHxwcmFnbWF8cmV0cmlldmV8cmV0dXJuaW5nfHNlYXJjaHxzaG9ydHxzdGF0fHN5bmNocm9uaXplZHx0aGVufHRoaXNfbW9udGhcIlxuICAgICAgICAgICAgICsgXCJ8dHJhbnNhY3Rpb258dHlwZXx3aGVuXCIsXG4gICAgICAgIFwia2V5d29yZFwiOiBcInByaXZhdGV8cHJvdGVjdGVkfHB1YmxpY3xuYXRpdmV8c3luY2hyb25pemVkfGFic3RyYWN0fHRocmVhZHNhZmV8dHJhbnNpZW50fHN0YXRpY3xmaW5hbFwiXG4gICAgICAgICAgICAgKyBcInxhbmR8YXJyYXl8YXN8YXNjfGJyZWFrfGJ1bGt8Ynl8Y2F0Y2h8Y2xhc3N8Y29tbWl0fGNvbnRpbnVlfGNvbnZlcnRjdXJyZW5jeVwiXG4gICAgICAgICAgICAgKyBcInxkZWxldGV8ZGVzY3xkb3xlbHNlfGVudW18ZXh0ZW5kc3xmYWxzZXxmaW5hbHxmaW5hbGx5fGZvcnxmcm9tfGZ1dHVyZXxnbG9iYWxcIlxuICAgICAgICAgICAgICsgXCJ8aWZ8aW1wbGVtZW50c3xpbnxpbnNlcnR8aW5zdGFuY2VvZnxpbnRlcmZhY2V8bGFzdF85MF9kYXlzfGxhc3RfbW9udGhcIlxuICAgICAgICAgICAgICsgXCJ8bGFzdF9uX2RheXN8bGFzdF93ZWVrfGxpa2V8bGltaXR8bGlzdHxtYXB8bWVyZ2V8bmV3fG5leHRfOTBfZGF5c3xuZXh0X21vbnRofG5leHRfbl9kYXlzXCJcbiAgICAgICAgICAgICArIFwifG5leHRfd2Vla3xub3R8bnVsbHxudWxsc3xvbnxvcnxvdmVycmlkZXxwYWNrYWdlfHJldHVyblwiXG4gICAgICAgICAgICAgKyBcInxyb2xsYmFja3xzYXZlcG9pbnR8c2VsZWN0fHNldHxzb3J0fHN1cGVyfHRlc3RtZXRob2R8dGhpc3x0aGlzX3dlZWt8dGhyb3d8dG9kYXlcIlxuICAgICAgICAgICAgICsgXCJ8dG9sYWJlbHx0b21vcnJvd3x0cmlnZ2VyfHRydWV8dHJ5fHVuZGVsZXRlfHVwZGF0ZXx1cHNlcnR8dXNpbmd8dmlydHVhbHx3ZWJzZXJ2aWNlXCJcbiAgICAgICAgICAgICArIFwifHdoZXJlfHdoaWxlfHllc3RlcmRheXxzd2l0Y2h8Y2FzZXxkZWZhdWx0XCIsXG4gICAgICAgIFwic3RvcmFnZS50eXBlXCI6XG4gICAgICAgICAgICBcImRlZnxib29sZWFufGJ5dGV8Y2hhcnxzaG9ydHxpbnR8ZmxvYXR8cGJsb2J8ZGF0ZXxkYXRldGltZXxkZWNpbWFsfGRvdWJsZXxpZHxpbnRlZ2VyfGxvbmd8c3RyaW5nfHRpbWV8dm9pZHxibG9ifE9iamVjdFwiLFxuICAgICAgICBcImNvbnN0YW50Lmxhbmd1YWdlXCI6XG4gICAgICAgICAgICBcInRydWV8ZmFsc2V8bnVsbHxhZnRlcnxiZWZvcmV8Y291bnR8ZXhjbHVkZXN8Zmlyc3R8aW5jbHVkZXN8bGFzdHxvcmRlcnxzaGFyaW5nfHdpdGhcIixcbiAgICAgICAgXCJzdXBwb3J0LmZ1bmN0aW9uXCI6XG4gICAgICAgICAgICBcInN5c3RlbXxhcGV4fGxhYmVsfGFwZXhwYWdlc3x1c2VyaW5mb3xzY2hlbWFcIlxuICAgIH0sIFwiaWRlbnRpZmllclwiLCB0cnVlKTtcbiAgICBmdW5jdGlvbiBrZXl3b3JkTWFwcGVyKHZhbHVlKSB7XG4gICAgICAgIGlmICh2YWx1ZS5zbGljZSgtMykgPT0gXCJfX2NcIikgcmV0dXJuIFwic3VwcG9ydC5mdW5jdGlvblwiO1xuICAgICAgICByZXR1cm4gbWFpbktleXdvcmRNYXBwZXIodmFsdWUpO1xuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiBzdHJpbmcoc3RhcnQsIG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlZ2V4OiBzdGFydCArIChvcHRpb25zLm11bHRpbGluZSA/IFwiXCIgOiBcIig/PS4pXCIpLFxuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nLnN0YXJ0XCIsXG4gICAgICAgICAgICBuZXh0OiBbe1xuICAgICAgICAgICAgICAgIHJlZ2V4OiBvcHRpb25zLmVzY2FwZSxcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJjaGFyYWN0ZXIuZXNjYXBlXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICByZWdleDogb3B0aW9ucy5lcnJvcixcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJlcnJvci5pbnZhbGlkXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICByZWdleDogc3RhcnQgKyAob3B0aW9ucy5tdWx0aWxpbmUgPyBcIlwiIDogXCJ8JFwiKSxcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJzdHJpbmcuZW5kXCIsXG4gICAgICAgICAgICAgICAgbmV4dDogb3B0aW9ucy5uZXh0IHx8IFwic3RhcnRcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzdHJpbmdcIlxuICAgICAgICAgICAgfV1cbiAgICAgICAgfTtcbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gY29tbWVudHMoKSB7XG4gICAgICAgIHJldHVybiBbe1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwvXFxcXC8oPz0uKVwiLFxuICAgICAgICAgICAgICAgIG5leHQgOiBbXG4gICAgICAgICAgICAgICAgICAgIERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcy5nZXRUYWdSdWxlKCksXG4gICAgICAgICAgICAgICAgICAgIHt0b2tlbiA6IFwiY29tbWVudFwiLCByZWdleCA6IFwiJHxeXCIsIG5leHQgOiBcInN0YXJ0XCJ9LFxuICAgICAgICAgICAgICAgICAgICB7ZGVmYXVsdFRva2VuIDogXCJjb21tZW50XCIsIGNhc2VJbnNlbnNpdGl2ZTogdHJ1ZX1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLmdldFN0YXJ0UnVsZShcImRvYy1zdGFydFwiKSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudFwiLCAvLyBtdWx0aSBsaW5lIGNvbW1lbnRcbiAgICAgICAgICAgICAgICByZWdleCA6IC9cXC9cXCovLFxuICAgICAgICAgICAgICAgIG5leHQgOiBbXG4gICAgICAgICAgICAgICAgICAgIERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcy5nZXRUYWdSdWxlKCksXG4gICAgICAgICAgICAgICAgICAgIHt0b2tlbiA6IFwiY29tbWVudFwiLCByZWdleCA6IFwiXFxcXCpcXFxcL1wiLCBuZXh0IDogXCJzdGFydFwifSxcbiAgICAgICAgICAgICAgICAgICAge2RlZmF1bHRUb2tlbiA6IFwiY29tbWVudFwiLCBjYXNlSW5zZW5zaXRpdmU6IHRydWV9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICBdO1xuICAgIH1cbiAgICBcbiAgICB0aGlzLiRydWxlcyA9IHtcbiAgICAgICAgc3RhcnQ6IFtcbiAgICAgICAgICAgIHN0cmluZyhcIidcIiwge1xuICAgICAgICAgICAgICAgIGVzY2FwZTogL1xcXFxbbmInXCJcXFxcXS8sXG4gICAgICAgICAgICAgICAgZXJyb3I6IC9cXFxcLi8sXG4gICAgICAgICAgICAgICAgbXVsdGlsaW5lOiBmYWxzZVxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBjb21tZW50cyhcImNcIiksXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJkZWNvcmF0aW9uXCIsXG4gICAgICAgICAgICAgICAgdG9rZW46IFtcbiAgICAgICAgICAgICAgICAgICAgXCJtZXRhLnBhY2thZ2UuYXBleFwiLFxuICAgICAgICAgICAgICAgICAgICBcImtleXdvcmQub3RoZXIucGFja2FnZS5hcGV4XCIsXG4gICAgICAgICAgICAgICAgICAgIFwibWV0YS5wYWNrYWdlLmFwZXhcIixcbiAgICAgICAgICAgICAgICAgICAgXCJzdG9yYWdlLm1vZGlmaWVyLnBhY2thZ2UuYXBleFwiLFxuICAgICAgICAgICAgICAgICAgICBcIm1ldGEucGFja2FnZS5hcGV4XCIsXG4gICAgICAgICAgICAgICAgICAgIFwicHVuY3R1YXRpb24udGVybWluYXRvci5hcGV4XCJcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvXihcXHMqKShwYWNrYWdlKVxcYig/OihcXHMqKShbXiA7JF0rKShcXHMqKSgoPzo7KT8pKT8vXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgIHJlZ2V4OiAvQFthLXpBLVpfJF1bYS16QS1aXyRcXGRcXHUwMDgwLVxcdWZmZmVdKi8sXG4gICAgICAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lmxhbmd1YWdlXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmVnZXg6IC9bYS16QS1aXyRdW2EtekEtWl8kXFxkXFx1MDA4MC1cXHVmZmZlXSovLFxuICAgICAgICAgICAgICAgIHRva2VuOiBrZXl3b3JkTWFwcGVyXG4gICAgICAgICAgICB9LCAgXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiYCMlXCIsXG4gICAgICAgICAgICAgICAgdG9rZW46IFwiZXJyb3IuaW52YWxpZFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIiwgLy8gZmxvYXRcbiAgICAgICAgICAgICAgICByZWdleCA6IC9bKy1dP1xcZCsoPzooPzpcXC5cXGQqKT8oPzpbTGxEZEVlXVsrLV0/XFxkKyk/KVxcYnxcXC5cXGQrW0xsRGRFZV0vXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImtleXdvcmQub3BlcmF0b3JcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC8tLXxcXCtcXCt8PT09fD09fD18IT18IT09fDw9fD49fDw8PXw+Pj18Pj4+PXw8Pnw8fD58IXwmJnxcXHxcXHx8XFw/XFw6fFshJCUmKitcXC1+XFwvXl09Py8sXG4gICAgICAgICAgICAgICAgbmV4dCAgOiBcInN0YXJ0XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwicHVuY3R1YXRpb24ub3BlcmF0b3JcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC9bPzosOy5dLyxcbiAgICAgICAgICAgICAgICBuZXh0ICA6IFwic3RhcnRcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJwYXJlbi5scGFyZW5cIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC9bXFxbXS8sXG4gICAgICAgICAgICAgICAgbmV4dCAgOiBcIm1heWJlX3NvcWxcIixcbiAgICAgICAgICAgICAgICBtZXJnZSA6IGZhbHNlXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInBhcmVuLmxwYXJlblwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogL1tcXFsoe10vLFxuICAgICAgICAgICAgICAgIG5leHQgIDogXCJzdGFydFwiLFxuICAgICAgICAgICAgICAgIG1lcmdlIDogZmFsc2VcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwicGFyZW4ucnBhcmVuXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvW1xcXSl9XS8sXG4gICAgICAgICAgICAgICAgbWVyZ2UgOiBmYWxzZVxuICAgICAgICAgICAgfSBcbiAgICAgICAgXSwgXG4gICAgICAgIG1heWJlX3NvcWw6IFt7XG4gICAgICAgICAgICByZWdleDogL1xccysvLFxuICAgICAgICAgICAgdG9rZW46IFwidGV4dFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHJlZ2V4OiAvKFNFTEVDVHxGSU5EKVxcYi8sXG4gICAgICAgICAgICB0b2tlbjogXCJrZXl3b3JkXCIsXG4gICAgICAgICAgICBjYXNlSW5zZW5zaXRpdmU6IHRydWUsXG4gICAgICAgICAgICBuZXh0OiBcInNvcWxcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICByZWdleDogXCJcIixcbiAgICAgICAgICAgIHRva2VuOiBcIm5vbmVcIixcbiAgICAgICAgICAgIG5leHQ6IFwic3RhcnRcIlxuICAgICAgICB9XSxcbiAgICAgICAgc29xbDogW3tcbiAgICAgICAgICAgIHJlZ2V4OiBcIig6P0FTQ3xCWXxDQVRFR09SWXxDVUJFfERBVEF8REVTQ3xFTkR8RklORHxGSVJTVHxGT1J8RlJPTXxHUk9VUHxIQVZJTkd8SU58TEFTVFwiXG4gICAgICAgICAgICAgICAgKyBcInxMSU1JVHxORVRXT1JLfE5VTExTfE9GRlNFVHxPUkRFUnxSRUZFUkVOQ0V8UkVUVVJOSU5HfFJPTExVUHxTQ09QRXxTRUxFQ1RcIlxuICAgICAgICAgICAgICAgICsgXCJ8U05JUFBFVHxUUkFDS0lOR3xUWVBFT0Z8VVBEQVRFfFVTSU5HfFZJRVd8VklFV1NUQVR8V0hFUkV8V0lUSHxBTkR8T1IpXFxcXGJcIixcbiAgICAgICAgICAgIHRva2VuOiBcImtleXdvcmRcIixcbiAgICAgICAgICAgIGNhc2VJbnNlbnNpdGl2ZTogdHJ1ZVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICByZWdleDogXCIoOj90YXJnZXRfbGVuZ3RofHRvTGFiZWx8Y29udmVydEN1cnJlbmN5fGNvdW50fENvbnRhY3R8QWNjb3VudHxVc2VyfEZJRUxEUylcXFxcYlwiLFxuICAgICAgICAgICAgdG9rZW46IFwic3VwcG9ydC5mdW5jdGlvblwiLFxuICAgICAgICAgICAgY2FzZUluc2Vuc2l0aXZlOiB0cnVlXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJwYXJlbi5ycGFyZW5cIixcbiAgICAgICAgICAgIHJlZ2V4IDogL1tcXF1dLyxcbiAgICAgICAgICAgIG5leHQgIDogXCJzdGFydFwiLFxuICAgICAgICAgICAgbWVyZ2UgOiBmYWxzZVxuICAgICAgICB9LCBcbiAgICAgICAgc3RyaW5nKFwiJ1wiLCB7XG4gICAgICAgICAgICBlc2NhcGU6IC9cXFxcW25iJ1wiXFxcXF0vLFxuICAgICAgICAgICAgZXJyb3I6IC9cXFxcLi8sXG4gICAgICAgICAgICBtdWx0aWxpbmU6IGZhbHNlLFxuICAgICAgICAgICAgbmV4dDogXCJzb3FsXCJcbiAgICAgICAgfSksXG4gICAgICAgIHN0cmluZygnXCInLCB7XG4gICAgICAgICAgICBlc2NhcGU6IC9cXFxcW25iJ1wiXFxcXF0vLFxuICAgICAgICAgICAgZXJyb3I6IC9cXFxcLi8sXG4gICAgICAgICAgICBtdWx0aWxpbmU6IGZhbHNlLFxuICAgICAgICAgICAgbmV4dDogXCJzb3FsXCJcbiAgICAgICAgfSksXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJlZ2V4OiAvXFxcXC4vLFxuICAgICAgICAgICAgdG9rZW46IFwiY2hhcmFjdGVyLmVzY2FwZVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJlZ2V4IDogL1tcXD9cXCZcXHxcXCFcXHtcXH1cXFtcXF1cXChcXClcXF5cXH5cXCpcXDpcXFwiXFwnXFwrXFwtXFwsXFwuPVxcXFxcXC9dLyxcbiAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkLm9wZXJhdG9yXCJcbiAgICAgICAgfV0sXG4gICAgICAgIFxuICAgICAgICBcImxvZy1zdGFydFwiIDogWyB7XG4gICAgICAgICAgICB0b2tlbiA6IFwidGltZXN0YW1wLmludmlzaWJsZVwiLFxuICAgICAgICAgICAgcmVnZXggOiAvXltcXGQ6LigpIF0rXFx8LywgXG4gICAgICAgICAgICBuZXh0OiBcImxvZy1oZWFkZXJcIlxuICAgICAgICB9LCAge1xuICAgICAgICAgICAgdG9rZW4gOiBcInRpbWVzdGFtcC5pbnZpc2libGVcIixcbiAgICAgICAgICAgIHJlZ2V4IDogL14gIChOdW1iZXIgb2Z8TWF4aW11bSlbXjpdKjovLFxuICAgICAgICAgICAgbmV4dDogXCJsb2ctY29tbWVudFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJpbnZpc2libGVcIixcbiAgICAgICAgICAgIHJlZ2V4IDogL15FeGVjdXRlIEFub255bW91czovLFxuICAgICAgICAgICAgbmV4dDogXCJsb2ctY29tbWVudFwiXG4gICAgICAgIH0sICB7XG4gICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwidGV4dFwiXG4gICAgICAgIH1dLFxuICAgICAgICBcImxvZy1jb21tZW50XCI6IFt7XG4gICAgICAgICAgICB0b2tlbiA6IFwibG9nLWNvbW1lbnRcIixcbiAgICAgICAgICAgIHJlZ2V4IDogLy4qJC8sXG4gICAgICAgICAgICBuZXh0OiBcImxvZy1zdGFydFwiXG4gICAgICAgIH1dLFxuICAgICAgICBcImxvZy1oZWFkZXJcIjogW3tcbiAgICAgICAgICAgIHRva2VuIDogXCJ0aW1lc3RhbXAuaW52aXNpYmxlXCIsXG4gICAgICAgICAgICByZWdleCA6IC8oKFVTRVJfREVCVUd8XFxbXFxkK1xcXXxERUJVRylcXHwpKy9cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdG9rZW4gOiBcImtleXdvcmRcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIig/OkVYRUNVVElPTl9GSU5JU0hFRHxFWEVDVVRJT05fU1RBUlRFRHxDT0RFX1VOSVRfU1RBUlRFRFwiXG4gICAgICAgICAgICAgICAgKyBcInxDVU1VTEFUSVZFX0xJTUlUX1VTQUdFfExJTUlUX1VTQUdFX0ZPUl9OU1wiXG4gICAgICAgICAgICAgICAgKyBcInxDVU1VTEFUSVZFX0xJTUlUX1VTQUdFX0VORHxDT0RFX1VOSVRfRklOSVNIRUQpXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgcmVnZXg6IFwiXCIsXG4gICAgICAgICAgICBuZXh0OiBcImxvZy1zdGFydFwiXG4gICAgICAgIH1dXG4gICAgfTtcbiAgICB0aGlzLmVtYmVkUnVsZXMoRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLCBcImRvYy1cIixcbiAgICAgICAgWyBEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMuZ2V0RW5kUnVsZShcInN0YXJ0XCIpIF0pO1xuICAgICAgICBcblxuICAgIHRoaXMubm9ybWFsaXplUnVsZXMoKTtcbn07XG5cblxub29wLmluaGVyaXRzKEFwZXhIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuZXhwb3J0cy5BcGV4SGlnaGxpZ2h0UnVsZXMgPSBBcGV4SGlnaGxpZ2h0UnVsZXM7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcblxudmFyIERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLiRydWxlcyA9IHtcbiAgICAgICAgXCJzdGFydFwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwiY29tbWVudC5kb2MudGFnXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiQFxcXFx3Kyg/PVxcXFxzfCQpXCJcbiAgICAgICAgICAgIH0sIERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcy5nZXRUYWdSdWxlKCksIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwiY29tbWVudC5kb2NcIixcbiAgICAgICAgICAgICAgICBjYXNlSW5zZW5zaXRpdmU6IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH07XG59O1xuXG5vb3AuaW5oZXJpdHMoRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLCBUZXh0SGlnaGxpZ2h0UnVsZXMpO1xuXG5Eb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMuZ2V0VGFnUnVsZSA9IGZ1bmN0aW9uKHN0YXJ0KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdG9rZW4gOiBcImNvbW1lbnQuZG9jLnRhZy5zdG9yYWdlLnR5cGVcIixcbiAgICAgICAgcmVnZXggOiBcIlxcXFxiKD86VE9ET3xGSVhNRXxYWFh8SEFDSylcXFxcYlwiXG4gICAgfTtcbn07XG5cbkRvY0NvbW1lbnRIaWdobGlnaHRSdWxlcy5nZXRTdGFydFJ1bGUgPSBmdW5jdGlvbihzdGFydCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHRva2VuIDogXCJjb21tZW50LmRvY1wiLCAvLyBkb2MgY29tbWVudFxuICAgICAgICByZWdleCA6IFwiXFxcXC9cXFxcKig/PVxcXFwqKVwiLFxuICAgICAgICBuZXh0ICA6IHN0YXJ0XG4gICAgfTtcbn07XG5cbkRvY0NvbW1lbnRIaWdobGlnaHRSdWxlcy5nZXRFbmRSdWxlID0gZnVuY3Rpb24gKHN0YXJ0KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdG9rZW4gOiBcImNvbW1lbnQuZG9jXCIsIC8vIGNsb3NpbmcgY29tbWVudFxuICAgICAgICByZWdleCA6IFwiXFxcXCpcXFxcL1wiLFxuICAgICAgICBuZXh0ICA6IHN0YXJ0XG4gICAgfTtcbn07XG5cblxuZXhwb3J0cy5Eb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMgPSBEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXM7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi8uLi9saWIvb29wXCIpO1xudmFyIFJhbmdlID0gcmVxdWlyZShcIi4uLy4uL3JhbmdlXCIpLlJhbmdlO1xudmFyIEJhc2VGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRfbW9kZVwiKS5Gb2xkTW9kZTtcblxudmFyIEZvbGRNb2RlID0gZXhwb3J0cy5Gb2xkTW9kZSA9IGZ1bmN0aW9uKGNvbW1lbnRSZWdleCkge1xuICAgIGlmIChjb21tZW50UmVnZXgpIHtcbiAgICAgICAgdGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIgPSBuZXcgUmVnRXhwKFxuICAgICAgICAgICAgdGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIuc291cmNlLnJlcGxhY2UoL1xcfFtefF0qPyQvLCBcInxcIiArIGNvbW1lbnRSZWdleC5zdGFydClcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5mb2xkaW5nU3RvcE1hcmtlciA9IG5ldyBSZWdFeHAoXG4gICAgICAgICAgICB0aGlzLmZvbGRpbmdTdG9wTWFya2VyLnNvdXJjZS5yZXBsYWNlKC9cXHxbXnxdKj8kLywgXCJ8XCIgKyBjb21tZW50UmVnZXguZW5kKVxuICAgICAgICApO1xuICAgIH1cbn07XG5vb3AuaW5oZXJpdHMoRm9sZE1vZGUsIEJhc2VGb2xkTW9kZSk7XG5cbihmdW5jdGlvbigpIHtcbiAgICBcbiAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlciA9IC8oW1xce1xcW1xcKF0pW15cXH1cXF1cXCldKiR8XlxccyooXFwvXFwqKS87XG4gICAgdGhpcy5mb2xkaW5nU3RvcE1hcmtlciA9IC9eW15cXFtcXHtcXChdKihbXFx9XFxdXFwpXSl8XltcXHNcXCpdKihcXCpcXC8pLztcbiAgICB0aGlzLnNpbmdsZUxpbmVCbG9ja0NvbW1lbnRSZT0gL15cXHMqKFxcL1xcKikuKlxcKlxcL1xccyokLztcbiAgICB0aGlzLnRyaXBsZVN0YXJCbG9ja0NvbW1lbnRSZSA9IC9eXFxzKihcXC9cXCpcXCpcXCopLipcXCpcXC9cXHMqJC87XG4gICAgdGhpcy5zdGFydFJlZ2lvblJlID0gL15cXHMqKFxcL1xcKnxcXC9cXC8pIz9yZWdpb25cXGIvO1xuICAgIFxuICAgIC8vcHJldmVudCBuYW1pbmcgY29uZmxpY3Qgd2l0aCBhbnkgbW9kZXMgdGhhdCBpbmhlcml0IGZyb20gY3N0eWxlIGFuZCBvdmVycmlkZSB0aGlzIChsaWtlIGNzaGFycClcbiAgICB0aGlzLl9nZXRGb2xkV2lkZ2V0QmFzZSA9IHRoaXMuZ2V0Rm9sZFdpZGdldDtcbiAgICBcbiAgICAvKipcbiAgICAgKiBHZXRzIGZvbGQgd2lkZ2V0IHdpdGggc29tZSBub24tc3RhbmRhcmQgZXh0cmFzOlxuICAgICAqXG4gICAgICogQGV4YW1wbGUgbGluZUNvbW1lbnRSZWdpb25TdGFydFxuICAgICAqICAgICAgLy8jcmVnaW9uIFtvcHRpb25hbCBkZXNjcmlwdGlvbl1cbiAgICAgKlxuICAgICAqIEBleGFtcGxlIGJsb2NrQ29tbWVudFJlZ2lvblN0YXJ0XG4gICAgICogICAgICAvKiNyZWdpb24gW29wdGlvbmFsIGRlc2NyaXB0aW9uXSAqWy9dXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSB0cmlwbGVTdGFyRm9sZGluZ1NlY3Rpb25cbiAgICAgKiAgICAgIC8qKiogdGhpcyBmb2xkcyBldmVuIHRob3VnaCAxIGxpbmUgYmVjYXVzZSBpdCBoYXMgMyBzdGFycyAqKipbL11cbiAgICAgKiBcbiAgICAgKiBAbm90ZSB0aGUgcG91bmQgc3ltYm9sIGZvciByZWdpb24gdGFncyBpcyBvcHRpb25hbFxuICAgICAqL1xuICAgIHRoaXMuZ2V0Rm9sZFdpZGdldCA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgXG4gICAgICAgIGlmICh0aGlzLnNpbmdsZUxpbmVCbG9ja0NvbW1lbnRSZS50ZXN0KGxpbmUpKSB7XG4gICAgICAgICAgICAvLyBObyB3aWRnZXQgZm9yIHNpbmdsZSBsaW5lIGJsb2NrIGNvbW1lbnQgdW5sZXNzIHJlZ2lvbiBvciB0cmlwbGUgc3RhclxuICAgICAgICAgICAgaWYgKCF0aGlzLnN0YXJ0UmVnaW9uUmUudGVzdChsaW5lKSAmJiAhdGhpcy50cmlwbGVTdGFyQmxvY2tDb21tZW50UmUudGVzdChsaW5lKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICB2YXIgZncgPSB0aGlzLl9nZXRGb2xkV2lkZ2V0QmFzZShzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdyk7XG4gICAgXG4gICAgICAgIGlmICghZncgJiYgdGhpcy5zdGFydFJlZ2lvblJlLnRlc3QobGluZSkpXG4gICAgICAgICAgICByZXR1cm4gXCJzdGFydFwiOyAvLyBsaW5lQ29tbWVudFJlZ2lvblN0YXJ0XG4gICAgXG4gICAgICAgIHJldHVybiBmdztcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0UmFuZ2UgPSBmdW5jdGlvbihzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdywgZm9yY2VNdWx0aWxpbmUpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLnN0YXJ0UmVnaW9uUmUudGVzdChsaW5lKSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldENvbW1lbnRSZWdpb25CbG9jayhzZXNzaW9uLCBsaW5lLCByb3cpO1xuICAgICAgICBcbiAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCh0aGlzLmZvbGRpbmdTdGFydE1hcmtlcik7XG4gICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgdmFyIGkgPSBtYXRjaC5pbmRleDtcblxuICAgICAgICAgICAgaWYgKG1hdGNoWzFdKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm9wZW5pbmdCcmFja2V0QmxvY2soc2Vzc2lvbiwgbWF0Y2hbMV0sIHJvdywgaSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgcmFuZ2UgPSBzZXNzaW9uLmdldENvbW1lbnRGb2xkUmFuZ2Uocm93LCBpICsgbWF0Y2hbMF0ubGVuZ3RoLCAxKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHJhbmdlICYmICFyYW5nZS5pc011bHRpTGluZSgpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZvcmNlTXVsdGlsaW5lKSB7XG4gICAgICAgICAgICAgICAgICAgIHJhbmdlID0gdGhpcy5nZXRTZWN0aW9uUmFuZ2Uoc2Vzc2lvbiwgcm93KTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZvbGRTdHlsZSAhPSBcImFsbFwiKVxuICAgICAgICAgICAgICAgICAgICByYW5nZSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiByYW5nZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmb2xkU3R5bGUgPT09IFwibWFya2JlZ2luXCIpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCh0aGlzLmZvbGRpbmdTdG9wTWFya2VyKTtcbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICB2YXIgaSA9IG1hdGNoLmluZGV4ICsgbWF0Y2hbMF0ubGVuZ3RoO1xuXG4gICAgICAgICAgICBpZiAobWF0Y2hbMV0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2xvc2luZ0JyYWNrZXRCbG9jayhzZXNzaW9uLCBtYXRjaFsxXSwgcm93LCBpKTtcblxuICAgICAgICAgICAgcmV0dXJuIHNlc3Npb24uZ2V0Q29tbWVudEZvbGRSYW5nZShyb3csIGksIC0xKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgXG4gICAgdGhpcy5nZXRTZWN0aW9uUmFuZ2UgPSBmdW5jdGlvbihzZXNzaW9uLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgdmFyIHN0YXJ0SW5kZW50ID0gbGluZS5zZWFyY2goL1xcUy8pO1xuICAgICAgICB2YXIgc3RhcnRSb3cgPSByb3c7XG4gICAgICAgIHZhciBzdGFydENvbHVtbiA9IGxpbmUubGVuZ3RoO1xuICAgICAgICByb3cgPSByb3cgKyAxO1xuICAgICAgICB2YXIgZW5kUm93ID0gcm93O1xuICAgICAgICB2YXIgbWF4Um93ID0gc2Vzc2lvbi5nZXRMZW5ndGgoKTtcbiAgICAgICAgd2hpbGUgKCsrcm93IDwgbWF4Um93KSB7XG4gICAgICAgICAgICBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgICAgICB2YXIgaW5kZW50ID0gbGluZS5zZWFyY2goL1xcUy8pO1xuICAgICAgICAgICAgaWYgKGluZGVudCA9PT0gLTEpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICBpZiAgKHN0YXJ0SW5kZW50ID4gaW5kZW50KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgdmFyIHN1YlJhbmdlID0gdGhpcy5nZXRGb2xkV2lkZ2V0UmFuZ2Uoc2Vzc2lvbiwgXCJhbGxcIiwgcm93KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHN1YlJhbmdlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN1YlJhbmdlLnN0YXJ0LnJvdyA8PSBzdGFydFJvdykge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN1YlJhbmdlLmlzTXVsdGlMaW5lKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcm93ID0gc3ViUmFuZ2UuZW5kLnJvdztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXJ0SW5kZW50ID09IGluZGVudCkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbmRSb3cgPSByb3c7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBuZXcgUmFuZ2Uoc3RhcnRSb3csIHN0YXJ0Q29sdW1uLCBlbmRSb3csIHNlc3Npb24uZ2V0TGluZShlbmRSb3cpLmxlbmd0aCk7XG4gICAgfTtcbiAgICBcbiAgICAvKipcbiAgICAgKiBnZXRzIGNvbW1lbnQgcmVnaW9uIGJsb2NrIHdpdGggZW5kIHJlZ2lvbiBhc3N1bWVkIHRvIGJlIHN0YXJ0IG9mIGNvbW1lbnQgaW4gYW55IGNzdHlsZSBtb2RlIG9yIFNRTCBtb2RlICgtLSkgd2hpY2ggaW5oZXJpdHMgZnJvbSB0aGlzLlxuICAgICAqIFRoZXJlIG1heSBvcHRpb25hbGx5IGJlIGEgcG91bmQgc3ltYm9sIGJlZm9yZSB0aGUgcmVnaW9uL2VuZHJlZ2lvbiBzdGF0ZW1lbnRcbiAgICAgKi9cbiAgICB0aGlzLmdldENvbW1lbnRSZWdpb25CbG9jayA9IGZ1bmN0aW9uKHNlc3Npb24sIGxpbmUsIHJvdykge1xuICAgICAgICB2YXIgc3RhcnRDb2x1bW4gPSBsaW5lLnNlYXJjaCgvXFxzKiQvKTtcbiAgICAgICAgdmFyIG1heFJvdyA9IHNlc3Npb24uZ2V0TGVuZ3RoKCk7XG4gICAgICAgIHZhciBzdGFydFJvdyA9IHJvdztcbiAgICAgICAgXG4gICAgICAgIHZhciByZSA9IC9eXFxzKig/OlxcL1xcKnxcXC9cXC98LS0pIz8oZW5kKT9yZWdpb25cXGIvO1xuICAgICAgICB2YXIgZGVwdGggPSAxO1xuICAgICAgICB3aGlsZSAoKytyb3cgPCBtYXhSb3cpIHtcbiAgICAgICAgICAgIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgICAgIHZhciBtID0gcmUuZXhlYyhsaW5lKTtcbiAgICAgICAgICAgIGlmICghbSkgY29udGludWU7XG4gICAgICAgICAgICBpZiAobVsxXSkgZGVwdGgtLTtcbiAgICAgICAgICAgIGVsc2UgZGVwdGgrKztcblxuICAgICAgICAgICAgaWYgKCFkZXB0aCkgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZW5kUm93ID0gcm93O1xuICAgICAgICBpZiAoZW5kUm93ID4gc3RhcnRSb3cpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmFuZ2Uoc3RhcnRSb3csIHN0YXJ0Q29sdW1uLCBlbmRSb3csIGxpbmUubGVuZ3RoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbn0pLmNhbGwoRm9sZE1vZGUucHJvdG90eXBlKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==