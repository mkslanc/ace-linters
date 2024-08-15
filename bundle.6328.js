"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[6328],{

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

/***/ 28670:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var Range = (__webpack_require__(91902)/* .Range */ .Q);

var MatchingBraceOutdent = function() {};

(function() {

    this.checkOutdent = function(line, input) {
        if (! /^\s+$/.test(line))
            return false;

        return /^\s*\}/.test(input);
    };

    this.autoOutdent = function(doc, row) {
        var line = doc.getLine(row);
        var match = line.match(/^(\s*\})/);

        if (!match) return 0;

        var column = match[1].length;
        var openBracePos = doc.findMatchingBracket({row: row, column: column});

        if (!openBracePos || openBracePos.row == row) return 0;

        var indent = this.$getIndent(doc.getLine(openBracePos.row));
        doc.replace(new Range(row, 0, row, column-1), indent);
    };

    this.$getIndent = function(line) {
        return line.match(/^\s*/)[0];
    };

}).call(MatchingBraceOutdent.prototype);

exports.MatchingBraceOutdent = MatchingBraceOutdent;


/***/ }),

/***/ 66328:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var RedHighlightRules = (__webpack_require__(5923)/* .RedHighlightRules */ .h);
var RedFoldMode = (__webpack_require__(93887)/* .FoldMode */ .l);
var MatchingBraceOutdent = (__webpack_require__(28670).MatchingBraceOutdent);
var Range = (__webpack_require__(91902)/* .Range */ .Q);

var Mode = function() {
    this.HighlightRules = RedHighlightRules;
    this.foldingRules = new RedFoldMode();
    this.$outdent = new MatchingBraceOutdent();
    this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, TextMode);

(function() {

    this.lineCommentStart = ";";
    this.blockComment = { start: "comment {", end: "}" };

    this.getNextLineIndent = function(state, line, tab) {
        var indent = this.$getIndent(line);

        var tokenizedLine = this.getTokenizer().getLineTokens(line, state);
        var tokens = tokenizedLine.tokens;
        var endState = tokenizedLine.state;

        if (tokens.length && tokens[tokens.length-1].type == "comment") {
            return indent;
        }

        if (state == "start") {
            var match = line.match(/^.*[\{\[\(]\s*$/);
            if (match) {
                indent += tab;
            }
        } else if (state == "doc-start") {
            if (endState == "start") {
                return "";
            }
            var match = line.match(/^\s*(\/?)\*/);
            if (match) {
                if (match[1]) {
                    indent += " ";
                }
                indent += "* ";
            }
        }

        return indent;
    };

    this.checkOutdent = function(state, line, input) {
        return this.$outdent.checkOutdent(line, input);
    };

    this.autoOutdent = function(state, doc, row) {
        this.$outdent.autoOutdent(doc, row);
    };

    this.$id = "ace/mode/red";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 5923:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

var RedHighlightRules = function() {

    //var keywordMapper = this.createKeywordMapper({
    //}, "text", true, " ");

    var compoundKeywords = "";        

    this.$rules = {
        "start" : [
            {token : "keyword.operator", 
                regex: /\s([\-+%/=<>*]|(?:\*\*\|\/\/|==|>>>?|<>|<<|=>|<=|=\?))(\s|(?=:))/},
            {token : "string.email", regex : /\w[-\w._]*\@\w[-\w._]*/},
            {token : "value.time", regex : /\b\d+:\d+(:\d+)?/},
            {token : "string.url", regex : /\w[-\w_]*\:(\/\/)?\w[-\w._]*(:\d+)?/},
            {token : "value.date", regex : /(\b\d{1,4}[-/]\d{1,2}[-/]\d{1,2}|\d{1,2}[-/]\d{1,2}[-/]\d{1,4})\b/},
            {token : "value.tuple", regex : /\b\d{1,3}\.\d{1,3}\.\d{1,3}(\.\d{1,3}){0,9}/},
            {token : "value.pair", regex: /[+-]?\d+x[-+]?\d+/},
            {token : "value.binary", regex : /\b2#{([01]{8})+}/},
            {token : "value.binary", regex : /\b64#{([\w/=+])+}/},
            {token : "value.binary", regex : /(16)?#{([\dabcdefABCDEF][\dabcdefABCDEF])*}/},
            {token : "value.issue", regex : /#\w[-\w'*.]*/},
            {token : "value.numeric", regex: /[+-]?\d['\d]*(?:\.\d+)?e[-+]?\d{1,3}\%?(?!\w)/},
            {token : "invalid.illegal", regex: /[+-]?\d['\d]*(?:\.\d+)?\%?[a-zA-Z]/},
            {token : "value.numeric", regex: /[+-]?\d['\d]*(?:\.\d+)?\%?(?![a-zA-Z])/},
            {token : "value.character", regex : /#"(\^[-@/_~^"HKLM\[]|.)"/},
            {token : "string.file", regex : /%[-\w\.\/]+/},
            {token : "string.tag", regex : /</, next : "tag"},
            {token : "string", regex : /"/, next  : "string"},
            {token : "string.other", regex : "{", next  : "string.other"},
            {token : "comment", regex : "comment [{]", next : "comment"},
            {token : "comment",  regex : /;.+$/},
            //{token : "invalid", regex: "\\.{2,}"},
            {token : "paren.map-start", regex : "#\\("},
            {token : "paren.block-start", regex : "[\\[]"},
            {token : "paren.block-end", regex : "[\\]]"},
            {token : "paren.parens-start", regex : "[(]"},
            {token : "paren.parens-end", regex : "\\)"},
            //{token : "keyword", regex : compoundKeywords}, 
            {token : "keyword", regex : "/local|/external"},
            {token : "keyword.preprocessor", regex : "#(if|either|" +
                "switch|case|include|do|macrolocal|reset|process|trace)"},
            {token : "constant.datatype!", regex : 
                "(?:datatype|unset|none|logic|block|paren|string|" +
                "file|url|char|integer|float|word|set-word|lit-word|" +
                "get-word|refinement|issue|native|action|op|function|" +
                "path|lit-path|set-path|get-path|routine|bitset|point|" + 
                "object|typeset|error|vector|hash|pair|percent|tuple|" +
                "map|binary|time|tag|email|handle|date|image|event|" +
                "series|any-type|number|any-object|scalar|" +
                "any-string|any-word|any-function|any-block|any-list|" +
                "any-path|immediate|all-word|internal|external|default)!(?![-!?\\w~])"},
            {token : "keyword.function", regex : 
                "\\b(?:collect|quote|on-parse-event|math|last|source|expand|" +
                "show|context|object|input|quit|dir|make-dir|cause-error|" +
                "error\\?|none\\?|block\\?|any-list\\?|word\\?|char\\?|" +
                "any-string\\?|series\\?|binary\\?|attempt|url\\?|" +
                "string\\?|suffix\\?|file\\?|object\\?|body-of|first|" +
                "second|third|mod|clean-path|dir\\?|to-red-file|" +
                "normalize-dir|list-dir|pad|empty\\?|dirize|offset\\?|" +
                "what-dir|expand-directives|load|split-path|change-dir|" +
                "to-file|path-thru|save|load-thru|View|float\\?|to-float|" +
                "charset|\\?|probe|set-word\\?|q|words-of|replace|repend|" +
                "react|function\\?|spec-of|unset\\?|halt|op\\?|" +
                "any-function\\?|to-paren|tag\\?|routine|class-of|" +
                "size-text|draw|handle\\?|link-tabs-to-parent|" +
                "link-sub-to-parent|on-face-deep-change*|" +
                "update-font-faces|do-actor|do-safe|do-events|pair\\?|" +
                "foreach-face|hex-to-rgb|issue\\?|alter|path\\?|" +
                "typeset\\?|datatype\\?|set-flag|layout|extract|image\\?|" +
                "get-word\\?|to-logic|to-set-word|to-block|center-face|" +
                "dump-face|request-font|request-file|request-dir|rejoin|" +
                "ellipsize-at|any-block\\?|any-object\\?|map\\?|keys-of|" +
                "a-an|also|parse-func-spec|help-string|what|routine\\?|" +
                "action\\?|native\\?|refinement\\?|common-substr|" +
                "red-complete-file|red-complete-path|unview|comment|\\?\\?|" +
                "fourth|fifth|values-of|bitset\\?|email\\?|get-path\\?|" +
                "hash\\?|integer\\?|lit-path\\?|lit-word\\?|logic\\?|" +
                "paren\\?|percent\\?|set-path\\?|time\\?|tuple\\?|date\\?|" +
                "vector\\?|any-path\\?|any-word\\?|number\\?|immediate\\?|" +
                "scalar\\?|all-word\\?|to-bitset|to-binary|to-char|to-email|" +
                "to-get-path|to-get-word|to-hash|to-integer|to-issue|" +
                "to-lit-path|to-lit-word|to-map|to-none|to-pair|to-path|" +
                "to-percent|to-refinement|to-set-path|to-string|to-tag|" +
                "to-time|to-typeset|to-tuple|to-unset|to-url|to-word|" +
                "to-image|to-date|parse-trace|modulo|eval-set-path|" +
                "extract-boot-args|flip-exe-flag|split|do-file|" +
                "exists-thru\\?|read-thru|do-thru|cos|sin|tan|acos|asin|" +
                "atan|atan2|sqrt|clear-reactions|dump-reactions|react\\?|" +
                "within\\?|overlap\\?|distance\\?|face\\?|metrics\\?|" +
                "get-scroller|insert-event-func|remove-event-func|" +
                "set-focus|help|fetch-help|about|ls|ll|pwd|cd|" +
                "red-complete-input|matrix)(?![-!?\\w~])"},
            {token : "keyword.action", regex : 
                "\\b(?:to|remove|copy|insert|change|clear|move|poke|put|" +
                "random|reverse|sort|swap|take|trim|add|subtract|" +
                "divide|multiply|make|reflect|form|mold|modify|" +
                "absolute|negate|power|remainder|round|even\\?|odd\\?|" +
                "and~|complement|or~|xor~|append|at|back|find|skip|" +
                "tail|head|head\\?|index\\?|length\\?|next|pick|" +
                "select|tail\\?|delete|read|write)(?![-_!?\\w~])"
            },
            {token : "keyword.native", regex : 
                "\\b(?:not|any|set|uppercase|lowercase|checksum|" +
                "try|catch|browse|throw|all|as|" +
                "remove-each|func|function|does|has|do|reduce|" +
                "compose|get|print|prin|equal\\?|not-equal\\?|" +
                "strict-equal\\?|lesser\\?|greater\\?|lesser-or-equal\\?|" +
                "greater-or-equal\\?|same\\?|type\\?|stats|bind|in|parse|" +
                "union|unique|intersect|difference|exclude|" +
                "complement\\?|dehex|negative\\?|positive\\?|max|min|" +
                "shift|to-hex|sine|cosine|tangent|arcsine|arccosine|" +
                "arctangent|arctangent2|NaN\\?|zero\\?|log-2|log-10|log-e|" +
                "exp|square-root|construct|value\\?|as-pair|" +
                "extend|debase|enbase|to-local-file|" +
                "wait|unset|new-line|new-line\\?|context\\?|set-env|" +
                "get-env|list-env|now|sign\\?|call|size\\?)(?![-!?\\w~])"
            },
            {token : "keyword", regex : 
                "\\b(?:Red(?=\\s+\\[)|object|context|make|self|keep)(?![-!?\\w~])"
            },
            {token: "variable.language", regex : "this"},
            {token: "keyword.control", regex : 
                "(?:while|if|return|case|unless|either|until|loop|repeat|" +
                "forever|foreach|forall|switch|break|continue|exit)(?![-!?\\w~])"},
            {token: "constant.language", regex : 
                "\\b(?:true|false|on|off|yes|none|no)(?![-!?\\w~])"},
            {token: "constant.numeric", regex : /\bpi(?![^-_])/},
            {token: "constant.character", regex : "\\b(space|tab|newline|cr|lf)(?![-!?\\w~])"},
            {token: "keyword.operator", regex : "\s(or|and|xor|is)\s"},
            //{token : keywordMapper, regex : "\\b\\w[-\\w'*.]*\\b"},
            {token : "variable.get-path", regex : /:\w[-\w'*.?!]*(\/\w[-\w'*.?!]*)(\/\w[-\w'*.?!]*)*/},
            {token : "variable.set-path", regex : /\w[-\w'*.?!]*(\/\w[-\w'*.?!]*)(\/\w[-\w'*.?!]*)*:/},
            {token : "variable.lit-path", regex : /'\w[-\w'*.?!]*(\/\w[-\w'*.?!]*)(\/\w[-\w'*.?!]*)*/},
            {token : "variable.path", regex : /\w[-\w'*.?!]*(\/\w[-\w'*.?!]*)(\/\w[-\w'*.?!]*)*/},
            {token : "variable.refinement", regex : /\/\w[-\w'*.?!]*/}, 
            {token : "keyword.view.style", regex : 
                "\\b(?:window|base|button|text|field|area|check|" +
                "radio|progress|slider|camera|text-list|" +
                "drop-list|drop-down|panel|group-box|" +
                "tab-panel|h1|h2|h3|h4|h5|box|image|init)(?![-!?\\w~])"},
            {token : "keyword.view.event", regex : 
                "\\b(?:detect|on-detect|time|on-time|drawing|on-drawing|" +
                "scroll|on-scroll|down|on-down|up|on-up|mid-down|" +
                "on-mid-down|mid-up|on-mid-up|alt-down|on-alt-down|" +
                "alt-up|on-alt-up|aux-down|on-aux-down|aux-up|" +
                "on-aux-up|wheel|on-wheel|drag-start|on-drag-start|" +
                "drag|on-drag|drop|on-drop|click|on-click|dbl-click|" +
                "on-dbl-click|over|on-over|key|on-key|key-down|" +
                "on-key-down|key-up|on-key-up|ime|on-ime|focus|" +
                "on-focus|unfocus|on-unfocus|select|on-select|" +
                "change|on-change|enter|on-enter|menu|on-menu|close|" +
                "on-close|move|on-move|resize|on-resize|moving|" +
                "on-moving|resizing|on-resizing|zoom|on-zoom|pan|" +
                "on-pan|rotate|on-rotate|two-tap|on-two-tap|" +
                "press-tap|on-press-tap|create|on-create|created|on-created)(?![-!?\\w~])"},
            {token : "keyword.view.option", regex : 
                "\\b(?:all-over|center|color|default|disabled|down|" +
                "flags|focus|font|font-color|font-name|" +
                "font-size|hidden|hint|left|loose|name|" +
                "no-border|now|rate|react|select|size|space)(?![-!?\\w~])"},
            {token : "constant.other.colour", regex : "\\b(?:Red|white|transparent|" +
                "black|gray|aqua|beige|blue|brick|brown|coal|coffee|" +
                "crimson|cyan|forest|gold|green|ivory|khaki|leaf|linen|" +
                "magenta|maroon|mint|navy|oldrab|olive|orange|papaya|" +
                "pewter|pink|purple|reblue|rebolor|sienna|silver|sky|" +
                "snow|tanned|teal|violet|water|wheat|yello|yellow|glass)(?![-!?\\w~])"},
            {token : "variable.get-word", regex : /\:\w[-\w'*.?!]*/}, 
            {token : "variable.set-word", regex : /\w[-\w'*.?!]*\:/}, 
            {token : "variable.lit-word", regex : /'\w[-\w'*.?!]*/},
            {token : "variable.word", regex : /\b\w+[-\w'*.!?]*/},
            {caseInsensitive: true}
        ],
        "string" : [
            //{token : "constant.language.escape",   regex : "^"},
            {token : "string", regex : /"/, next : "start"},
            {defaultToken : "string"}
        ],
        "string.other" : [
            //{token : "constant.language.escape",   regex : "^"},
            {token : "string.other", regex : /}/, next : "start"},
            {defaultToken : "string.other"}
        ],
        "tag" : [
            {token : "string.tag", regex : />/, next : "start"},
            {defaultToken : "string.tag"}
        ],
        "comment" : [
            //{token : "constant.language.escape",   regex : "^"},
            {token : "comment", regex : /}/, next : "start"},
            {defaultToken : "comment"}
        ]
    };
};
oop.inherits(RedHighlightRules, TextHighlightRules);

exports.h = RedHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7O0FBRUEsU0FBeUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2ZvbGRpbmcvY3N0eWxlLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvbWF0Y2hpbmdfYnJhY2Vfb3V0ZGVudC5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL3JlZC5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL3JlZF9oaWdobGlnaHRfcnVsZXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vLi4vbGliL29vcFwiKTtcbnZhciBSYW5nZSA9IHJlcXVpcmUoXCIuLi8uLi9yYW5nZVwiKS5SYW5nZTtcbnZhciBCYXNlRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9mb2xkX21vZGVcIikuRm9sZE1vZGU7XG5cbnZhciBGb2xkTW9kZSA9IGV4cG9ydHMuRm9sZE1vZGUgPSBmdW5jdGlvbihjb21tZW50UmVnZXgpIHtcbiAgICBpZiAoY29tbWVudFJlZ2V4KSB7XG4gICAgICAgIHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyID0gbmV3IFJlZ0V4cChcbiAgICAgICAgICAgIHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyLnNvdXJjZS5yZXBsYWNlKC9cXHxbXnxdKj8kLywgXCJ8XCIgKyBjb21tZW50UmVnZXguc3RhcnQpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIgPSBuZXcgUmVnRXhwKFxuICAgICAgICAgICAgdGhpcy5mb2xkaW5nU3RvcE1hcmtlci5zb3VyY2UucmVwbGFjZSgvXFx8W158XSo/JC8sIFwifFwiICsgY29tbWVudFJlZ2V4LmVuZClcbiAgICAgICAgKTtcbiAgICB9XG59O1xub29wLmluaGVyaXRzKEZvbGRNb2RlLCBCYXNlRm9sZE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgXG4gICAgdGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIgPSAvKFtcXHtcXFtcXChdKVteXFx9XFxdXFwpXSokfF5cXHMqKFxcL1xcKikvO1xuICAgIHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIgPSAvXlteXFxbXFx7XFwoXSooW1xcfVxcXVxcKV0pfF5bXFxzXFwqXSooXFwqXFwvKS87XG4gICAgdGhpcy5zaW5nbGVMaW5lQmxvY2tDb21tZW50UmU9IC9eXFxzKihcXC9cXCopLipcXCpcXC9cXHMqJC87XG4gICAgdGhpcy50cmlwbGVTdGFyQmxvY2tDb21tZW50UmUgPSAvXlxccyooXFwvXFwqXFwqXFwqKS4qXFwqXFwvXFxzKiQvO1xuICAgIHRoaXMuc3RhcnRSZWdpb25SZSA9IC9eXFxzKihcXC9cXCp8XFwvXFwvKSM/cmVnaW9uXFxiLztcbiAgICBcbiAgICAvL3ByZXZlbnQgbmFtaW5nIGNvbmZsaWN0IHdpdGggYW55IG1vZGVzIHRoYXQgaW5oZXJpdCBmcm9tIGNzdHlsZSBhbmQgb3ZlcnJpZGUgdGhpcyAobGlrZSBjc2hhcnApXG4gICAgdGhpcy5fZ2V0Rm9sZFdpZGdldEJhc2UgPSB0aGlzLmdldEZvbGRXaWRnZXQ7XG4gICAgXG4gICAgLyoqXG4gICAgICogR2V0cyBmb2xkIHdpZGdldCB3aXRoIHNvbWUgbm9uLXN0YW5kYXJkIGV4dHJhczpcbiAgICAgKlxuICAgICAqIEBleGFtcGxlIGxpbmVDb21tZW50UmVnaW9uU3RhcnRcbiAgICAgKiAgICAgIC8vI3JlZ2lvbiBbb3B0aW9uYWwgZGVzY3JpcHRpb25dXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSBibG9ja0NvbW1lbnRSZWdpb25TdGFydFxuICAgICAqICAgICAgLyojcmVnaW9uIFtvcHRpb25hbCBkZXNjcmlwdGlvbl0gKlsvXVxuICAgICAqXG4gICAgICogQGV4YW1wbGUgdHJpcGxlU3RhckZvbGRpbmdTZWN0aW9uXG4gICAgICogICAgICAvKioqIHRoaXMgZm9sZHMgZXZlbiB0aG91Z2ggMSBsaW5lIGJlY2F1c2UgaXQgaGFzIDMgc3RhcnMgKioqWy9dXG4gICAgICogXG4gICAgICogQG5vdGUgdGhlIHBvdW5kIHN5bWJvbCBmb3IgcmVnaW9uIHRhZ3MgaXMgb3B0aW9uYWxcbiAgICAgKi9cbiAgICB0aGlzLmdldEZvbGRXaWRnZXQgPSBmdW5jdGlvbihzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdykge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgIFxuICAgICAgICBpZiAodGhpcy5zaW5nbGVMaW5lQmxvY2tDb21tZW50UmUudGVzdChsaW5lKSkge1xuICAgICAgICAgICAgLy8gTm8gd2lkZ2V0IGZvciBzaW5nbGUgbGluZSBibG9jayBjb21tZW50IHVubGVzcyByZWdpb24gb3IgdHJpcGxlIHN0YXJcbiAgICAgICAgICAgIGlmICghdGhpcy5zdGFydFJlZ2lvblJlLnRlc3QobGluZSkgJiYgIXRoaXMudHJpcGxlU3RhckJsb2NrQ29tbWVudFJlLnRlc3QobGluZSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgdmFyIGZ3ID0gdGhpcy5fZ2V0Rm9sZFdpZGdldEJhc2Uoc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpO1xuICAgIFxuICAgICAgICBpZiAoIWZ3ICYmIHRoaXMuc3RhcnRSZWdpb25SZS50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgcmV0dXJuIFwic3RhcnRcIjsgLy8gbGluZUNvbW1lbnRSZWdpb25TdGFydFxuICAgIFxuICAgICAgICByZXR1cm4gZnc7XG4gICAgfTtcblxuICAgIHRoaXMuZ2V0Rm9sZFdpZGdldFJhbmdlID0gZnVuY3Rpb24oc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3csIGZvcmNlTXVsdGlsaW5lKSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5zdGFydFJlZ2lvblJlLnRlc3QobGluZSkpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRDb21tZW50UmVnaW9uQmxvY2soc2Vzc2lvbiwgbGluZSwgcm93KTtcbiAgICAgICAgXG4gICAgICAgIHZhciBtYXRjaCA9IGxpbmUubWF0Y2godGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIpO1xuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIHZhciBpID0gbWF0Y2guaW5kZXg7XG5cbiAgICAgICAgICAgIGlmIChtYXRjaFsxXSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5vcGVuaW5nQnJhY2tldEJsb2NrKHNlc3Npb24sIG1hdGNoWzFdLCByb3csIGkpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIHJhbmdlID0gc2Vzc2lvbi5nZXRDb21tZW50Rm9sZFJhbmdlKHJvdywgaSArIG1hdGNoWzBdLmxlbmd0aCwgMSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChyYW5nZSAmJiAhcmFuZ2UuaXNNdWx0aUxpbmUoKSkge1xuICAgICAgICAgICAgICAgIGlmIChmb3JjZU11bHRpbGluZSkge1xuICAgICAgICAgICAgICAgICAgICByYW5nZSA9IHRoaXMuZ2V0U2VjdGlvblJhbmdlKHNlc3Npb24sIHJvdyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChmb2xkU3R5bGUgIT0gXCJhbGxcIilcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2UgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gcmFuZ2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZm9sZFN0eWxlID09PSBcIm1hcmtiZWdpblwiKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHZhciBtYXRjaCA9IGxpbmUubWF0Y2godGhpcy5mb2xkaW5nU3RvcE1hcmtlcik7XG4gICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgdmFyIGkgPSBtYXRjaC5pbmRleCArIG1hdGNoWzBdLmxlbmd0aDtcblxuICAgICAgICAgICAgaWYgKG1hdGNoWzFdKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNsb3NpbmdCcmFja2V0QmxvY2soc2Vzc2lvbiwgbWF0Y2hbMV0sIHJvdywgaSk7XG5cbiAgICAgICAgICAgIHJldHVybiBzZXNzaW9uLmdldENvbW1lbnRGb2xkUmFuZ2Uocm93LCBpLCAtMSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFxuICAgIHRoaXMuZ2V0U2VjdGlvblJhbmdlID0gZnVuY3Rpb24oc2Vzc2lvbiwgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgIHZhciBzdGFydEluZGVudCA9IGxpbmUuc2VhcmNoKC9cXFMvKTtcbiAgICAgICAgdmFyIHN0YXJ0Um93ID0gcm93O1xuICAgICAgICB2YXIgc3RhcnRDb2x1bW4gPSBsaW5lLmxlbmd0aDtcbiAgICAgICAgcm93ID0gcm93ICsgMTtcbiAgICAgICAgdmFyIGVuZFJvdyA9IHJvdztcbiAgICAgICAgdmFyIG1heFJvdyA9IHNlc3Npb24uZ2V0TGVuZ3RoKCk7XG4gICAgICAgIHdoaWxlICgrK3JvdyA8IG1heFJvdykge1xuICAgICAgICAgICAgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICAgICAgdmFyIGluZGVudCA9IGxpbmUuc2VhcmNoKC9cXFMvKTtcbiAgICAgICAgICAgIGlmIChpbmRlbnQgPT09IC0xKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgaWYgIChzdGFydEluZGVudCA+IGluZGVudClcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIHZhciBzdWJSYW5nZSA9IHRoaXMuZ2V0Rm9sZFdpZGdldFJhbmdlKHNlc3Npb24sIFwiYWxsXCIsIHJvdyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChzdWJSYW5nZSkge1xuICAgICAgICAgICAgICAgIGlmIChzdWJSYW5nZS5zdGFydC5yb3cgPD0gc3RhcnRSb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzdWJSYW5nZS5pc011bHRpTGluZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJvdyA9IHN1YlJhbmdlLmVuZC5yb3c7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzdGFydEluZGVudCA9PSBpbmRlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZW5kUm93ID0gcm93O1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gbmV3IFJhbmdlKHN0YXJ0Um93LCBzdGFydENvbHVtbiwgZW5kUm93LCBzZXNzaW9uLmdldExpbmUoZW5kUm93KS5sZW5ndGgpO1xuICAgIH07XG4gICAgXG4gICAgLyoqXG4gICAgICogZ2V0cyBjb21tZW50IHJlZ2lvbiBibG9jayB3aXRoIGVuZCByZWdpb24gYXNzdW1lZCB0byBiZSBzdGFydCBvZiBjb21tZW50IGluIGFueSBjc3R5bGUgbW9kZSBvciBTUUwgbW9kZSAoLS0pIHdoaWNoIGluaGVyaXRzIGZyb20gdGhpcy5cbiAgICAgKiBUaGVyZSBtYXkgb3B0aW9uYWxseSBiZSBhIHBvdW5kIHN5bWJvbCBiZWZvcmUgdGhlIHJlZ2lvbi9lbmRyZWdpb24gc3RhdGVtZW50XG4gICAgICovXG4gICAgdGhpcy5nZXRDb21tZW50UmVnaW9uQmxvY2sgPSBmdW5jdGlvbihzZXNzaW9uLCBsaW5lLCByb3cpIHtcbiAgICAgICAgdmFyIHN0YXJ0Q29sdW1uID0gbGluZS5zZWFyY2goL1xccyokLyk7XG4gICAgICAgIHZhciBtYXhSb3cgPSBzZXNzaW9uLmdldExlbmd0aCgpO1xuICAgICAgICB2YXIgc3RhcnRSb3cgPSByb3c7XG4gICAgICAgIFxuICAgICAgICB2YXIgcmUgPSAvXlxccyooPzpcXC9cXCp8XFwvXFwvfC0tKSM/KGVuZCk/cmVnaW9uXFxiLztcbiAgICAgICAgdmFyIGRlcHRoID0gMTtcbiAgICAgICAgd2hpbGUgKCsrcm93IDwgbWF4Um93KSB7XG4gICAgICAgICAgICBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgICAgICB2YXIgbSA9IHJlLmV4ZWMobGluZSk7XG4gICAgICAgICAgICBpZiAoIW0pIGNvbnRpbnVlO1xuICAgICAgICAgICAgaWYgKG1bMV0pIGRlcHRoLS07XG4gICAgICAgICAgICBlbHNlIGRlcHRoKys7XG5cbiAgICAgICAgICAgIGlmICghZGVwdGgpIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGVuZFJvdyA9IHJvdztcbiAgICAgICAgaWYgKGVuZFJvdyA+IHN0YXJ0Um93KSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFJhbmdlKHN0YXJ0Um93LCBzdGFydENvbHVtbiwgZW5kUm93LCBsaW5lLmxlbmd0aCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG59KS5jYWxsKEZvbGRNb2RlLnByb3RvdHlwZSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIFJhbmdlID0gcmVxdWlyZShcIi4uL3JhbmdlXCIpLlJhbmdlO1xuXG52YXIgTWF0Y2hpbmdCcmFjZU91dGRlbnQgPSBmdW5jdGlvbigpIHt9O1xuXG4oZnVuY3Rpb24oKSB7XG5cbiAgICB0aGlzLmNoZWNrT3V0ZGVudCA9IGZ1bmN0aW9uKGxpbmUsIGlucHV0KSB7XG4gICAgICAgIGlmICghIC9eXFxzKyQvLnRlc3QobGluZSkpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgcmV0dXJuIC9eXFxzKlxcfS8udGVzdChpbnB1dCk7XG4gICAgfTtcblxuICAgIHRoaXMuYXV0b091dGRlbnQgPSBmdW5jdGlvbihkb2MsIHJvdykge1xuICAgICAgICB2YXIgbGluZSA9IGRvYy5nZXRMaW5lKHJvdyk7XG4gICAgICAgIHZhciBtYXRjaCA9IGxpbmUubWF0Y2goL14oXFxzKlxcfSkvKTtcblxuICAgICAgICBpZiAoIW1hdGNoKSByZXR1cm4gMDtcblxuICAgICAgICB2YXIgY29sdW1uID0gbWF0Y2hbMV0ubGVuZ3RoO1xuICAgICAgICB2YXIgb3BlbkJyYWNlUG9zID0gZG9jLmZpbmRNYXRjaGluZ0JyYWNrZXQoe3Jvdzogcm93LCBjb2x1bW46IGNvbHVtbn0pO1xuXG4gICAgICAgIGlmICghb3BlbkJyYWNlUG9zIHx8IG9wZW5CcmFjZVBvcy5yb3cgPT0gcm93KSByZXR1cm4gMDtcblxuICAgICAgICB2YXIgaW5kZW50ID0gdGhpcy4kZ2V0SW5kZW50KGRvYy5nZXRMaW5lKG9wZW5CcmFjZVBvcy5yb3cpKTtcbiAgICAgICAgZG9jLnJlcGxhY2UobmV3IFJhbmdlKHJvdywgMCwgcm93LCBjb2x1bW4tMSksIGluZGVudCk7XG4gICAgfTtcblxuICAgIHRoaXMuJGdldEluZGVudCA9IGZ1bmN0aW9uKGxpbmUpIHtcbiAgICAgICAgcmV0dXJuIGxpbmUubWF0Y2goL15cXHMqLylbMF07XG4gICAgfTtcblxufSkuY2FsbChNYXRjaGluZ0JyYWNlT3V0ZGVudC5wcm90b3R5cGUpO1xuXG5leHBvcnRzLk1hdGNoaW5nQnJhY2VPdXRkZW50ID0gTWF0Y2hpbmdCcmFjZU91dGRlbnQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRNb2RlID0gcmVxdWlyZShcIi4vdGV4dFwiKS5Nb2RlO1xudmFyIFJlZEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vcmVkX2hpZ2hsaWdodF9ydWxlc1wiKS5SZWRIaWdobGlnaHRSdWxlcztcbnZhciBSZWRGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRpbmcvY3N0eWxlXCIpLkZvbGRNb2RlO1xudmFyIE1hdGNoaW5nQnJhY2VPdXRkZW50ID0gcmVxdWlyZShcIi4vbWF0Y2hpbmdfYnJhY2Vfb3V0ZGVudFwiKS5NYXRjaGluZ0JyYWNlT3V0ZGVudDtcbnZhciBSYW5nZSA9IHJlcXVpcmUoXCIuLi9yYW5nZVwiKS5SYW5nZTtcblxudmFyIE1vZGUgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLkhpZ2hsaWdodFJ1bGVzID0gUmVkSGlnaGxpZ2h0UnVsZXM7XG4gICAgdGhpcy5mb2xkaW5nUnVsZXMgPSBuZXcgUmVkRm9sZE1vZGUoKTtcbiAgICB0aGlzLiRvdXRkZW50ID0gbmV3IE1hdGNoaW5nQnJhY2VPdXRkZW50KCk7XG4gICAgdGhpcy4kYmVoYXZpb3VyID0gdGhpcy4kZGVmYXVsdEJlaGF2aW91cjtcbn07XG5vb3AuaW5oZXJpdHMoTW9kZSwgVGV4dE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG5cbiAgICB0aGlzLmxpbmVDb21tZW50U3RhcnQgPSBcIjtcIjtcbiAgICB0aGlzLmJsb2NrQ29tbWVudCA9IHsgc3RhcnQ6IFwiY29tbWVudCB7XCIsIGVuZDogXCJ9XCIgfTtcblxuICAgIHRoaXMuZ2V0TmV4dExpbmVJbmRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgbGluZSwgdGFiKSB7XG4gICAgICAgIHZhciBpbmRlbnQgPSB0aGlzLiRnZXRJbmRlbnQobGluZSk7XG5cbiAgICAgICAgdmFyIHRva2VuaXplZExpbmUgPSB0aGlzLmdldFRva2VuaXplcigpLmdldExpbmVUb2tlbnMobGluZSwgc3RhdGUpO1xuICAgICAgICB2YXIgdG9rZW5zID0gdG9rZW5pemVkTGluZS50b2tlbnM7XG4gICAgICAgIHZhciBlbmRTdGF0ZSA9IHRva2VuaXplZExpbmUuc3RhdGU7XG5cbiAgICAgICAgaWYgKHRva2Vucy5sZW5ndGggJiYgdG9rZW5zW3Rva2Vucy5sZW5ndGgtMV0udHlwZSA9PSBcImNvbW1lbnRcIikge1xuICAgICAgICAgICAgcmV0dXJuIGluZGVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdGF0ZSA9PSBcInN0YXJ0XCIpIHtcbiAgICAgICAgICAgIHZhciBtYXRjaCA9IGxpbmUubWF0Y2goL14uKltcXHtcXFtcXChdXFxzKiQvKTtcbiAgICAgICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgICAgIGluZGVudCArPSB0YWI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT0gXCJkb2Mtc3RhcnRcIikge1xuICAgICAgICAgICAgaWYgKGVuZFN0YXRlID09IFwic3RhcnRcIikge1xuICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCgvXlxccyooXFwvPylcXCovKTtcbiAgICAgICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgICAgIGlmIChtYXRjaFsxXSkge1xuICAgICAgICAgICAgICAgICAgICBpbmRlbnQgKz0gXCIgXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGluZGVudCArPSBcIiogXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW5kZW50O1xuICAgIH07XG5cbiAgICB0aGlzLmNoZWNrT3V0ZGVudCA9IGZ1bmN0aW9uKHN0YXRlLCBsaW5lLCBpbnB1dCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kb3V0ZGVudC5jaGVja091dGRlbnQobGluZSwgaW5wdXQpO1xuICAgIH07XG5cbiAgICB0aGlzLmF1dG9PdXRkZW50ID0gZnVuY3Rpb24oc3RhdGUsIGRvYywgcm93KSB7XG4gICAgICAgIHRoaXMuJG91dGRlbnQuYXV0b091dGRlbnQoZG9jLCByb3cpO1xuICAgIH07XG5cbiAgICB0aGlzLiRpZCA9IFwiYWNlL21vZGUvcmVkXCI7XG59KS5jYWxsKE1vZGUucHJvdG90eXBlKTtcblxuZXhwb3J0cy5Nb2RlID0gTW9kZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xuXG52YXIgUmVkSGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbigpIHtcblxuICAgIC8vdmFyIGtleXdvcmRNYXBwZXIgPSB0aGlzLmNyZWF0ZUtleXdvcmRNYXBwZXIoe1xuICAgIC8vfSwgXCJ0ZXh0XCIsIHRydWUsIFwiIFwiKTtcblxuICAgIHZhciBjb21wb3VuZEtleXdvcmRzID0gXCJcIjsgICAgICAgIFxuXG4gICAgdGhpcy4kcnVsZXMgPSB7XG4gICAgICAgIFwic3RhcnRcIiA6IFtcbiAgICAgICAgICAgIHt0b2tlbiA6IFwia2V5d29yZC5vcGVyYXRvclwiLCBcbiAgICAgICAgICAgICAgICByZWdleDogL1xccyhbXFwtKyUvPTw+Kl18KD86XFwqXFwqXFx8XFwvXFwvfD09fD4+Pj98PD58PDx8PT58PD18PVxcPykpKFxcc3woPz06KSkvfSxcbiAgICAgICAgICAgIHt0b2tlbiA6IFwic3RyaW5nLmVtYWlsXCIsIHJlZ2V4IDogL1xcd1stXFx3Ll9dKlxcQFxcd1stXFx3Ll9dKi99LFxuICAgICAgICAgICAge3Rva2VuIDogXCJ2YWx1ZS50aW1lXCIsIHJlZ2V4IDogL1xcYlxcZCs6XFxkKyg6XFxkKyk/L30sXG4gICAgICAgICAgICB7dG9rZW4gOiBcInN0cmluZy51cmxcIiwgcmVnZXggOiAvXFx3Wy1cXHdfXSpcXDooXFwvXFwvKT9cXHdbLVxcdy5fXSooOlxcZCspPy99LFxuICAgICAgICAgICAge3Rva2VuIDogXCJ2YWx1ZS5kYXRlXCIsIHJlZ2V4IDogLyhcXGJcXGR7MSw0fVstL11cXGR7MSwyfVstL11cXGR7MSwyfXxcXGR7MSwyfVstL11cXGR7MSwyfVstL11cXGR7MSw0fSlcXGIvfSxcbiAgICAgICAgICAgIHt0b2tlbiA6IFwidmFsdWUudHVwbGVcIiwgcmVnZXggOiAvXFxiXFxkezEsM31cXC5cXGR7MSwzfVxcLlxcZHsxLDN9KFxcLlxcZHsxLDN9KXswLDl9L30sXG4gICAgICAgICAgICB7dG9rZW4gOiBcInZhbHVlLnBhaXJcIiwgcmVnZXg6IC9bKy1dP1xcZCt4Wy0rXT9cXGQrL30sXG4gICAgICAgICAgICB7dG9rZW4gOiBcInZhbHVlLmJpbmFyeVwiLCByZWdleCA6IC9cXGIyI3soWzAxXXs4fSkrfS99LFxuICAgICAgICAgICAge3Rva2VuIDogXCJ2YWx1ZS5iaW5hcnlcIiwgcmVnZXggOiAvXFxiNjQjeyhbXFx3Lz0rXSkrfS99LFxuICAgICAgICAgICAge3Rva2VuIDogXCJ2YWx1ZS5iaW5hcnlcIiwgcmVnZXggOiAvKDE2KT8jeyhbXFxkYWJjZGVmQUJDREVGXVtcXGRhYmNkZWZBQkNERUZdKSp9L30sXG4gICAgICAgICAgICB7dG9rZW4gOiBcInZhbHVlLmlzc3VlXCIsIHJlZ2V4IDogLyNcXHdbLVxcdycqLl0qL30sXG4gICAgICAgICAgICB7dG9rZW4gOiBcInZhbHVlLm51bWVyaWNcIiwgcmVnZXg6IC9bKy1dP1xcZFsnXFxkXSooPzpcXC5cXGQrKT9lWy0rXT9cXGR7MSwzfVxcJT8oPyFcXHcpL30sXG4gICAgICAgICAgICB7dG9rZW4gOiBcImludmFsaWQuaWxsZWdhbFwiLCByZWdleDogL1srLV0/XFxkWydcXGRdKig/OlxcLlxcZCspP1xcJT9bYS16QS1aXS99LFxuICAgICAgICAgICAge3Rva2VuIDogXCJ2YWx1ZS5udW1lcmljXCIsIHJlZ2V4OiAvWystXT9cXGRbJ1xcZF0qKD86XFwuXFxkKyk/XFwlPyg/IVthLXpBLVpdKS99LFxuICAgICAgICAgICAge3Rva2VuIDogXCJ2YWx1ZS5jaGFyYWN0ZXJcIiwgcmVnZXggOiAvI1wiKFxcXlstQC9ffl5cIkhLTE1cXFtdfC4pXCIvfSxcbiAgICAgICAgICAgIHt0b2tlbiA6IFwic3RyaW5nLmZpbGVcIiwgcmVnZXggOiAvJVstXFx3XFwuXFwvXSsvfSxcbiAgICAgICAgICAgIHt0b2tlbiA6IFwic3RyaW5nLnRhZ1wiLCByZWdleCA6IC88LywgbmV4dCA6IFwidGFnXCJ9LFxuICAgICAgICAgICAge3Rva2VuIDogXCJzdHJpbmdcIiwgcmVnZXggOiAvXCIvLCBuZXh0ICA6IFwic3RyaW5nXCJ9LFxuICAgICAgICAgICAge3Rva2VuIDogXCJzdHJpbmcub3RoZXJcIiwgcmVnZXggOiBcIntcIiwgbmV4dCAgOiBcInN0cmluZy5vdGhlclwifSxcbiAgICAgICAgICAgIHt0b2tlbiA6IFwiY29tbWVudFwiLCByZWdleCA6IFwiY29tbWVudCBbe11cIiwgbmV4dCA6IFwiY29tbWVudFwifSxcbiAgICAgICAgICAgIHt0b2tlbiA6IFwiY29tbWVudFwiLCAgcmVnZXggOiAvOy4rJC99LFxuICAgICAgICAgICAgLy97dG9rZW4gOiBcImludmFsaWRcIiwgcmVnZXg6IFwiXFxcXC57Mix9XCJ9LFxuICAgICAgICAgICAge3Rva2VuIDogXCJwYXJlbi5tYXAtc3RhcnRcIiwgcmVnZXggOiBcIiNcXFxcKFwifSxcbiAgICAgICAgICAgIHt0b2tlbiA6IFwicGFyZW4uYmxvY2stc3RhcnRcIiwgcmVnZXggOiBcIltcXFxcW11cIn0sXG4gICAgICAgICAgICB7dG9rZW4gOiBcInBhcmVuLmJsb2NrLWVuZFwiLCByZWdleCA6IFwiW1xcXFxdXVwifSxcbiAgICAgICAgICAgIHt0b2tlbiA6IFwicGFyZW4ucGFyZW5zLXN0YXJ0XCIsIHJlZ2V4IDogXCJbKF1cIn0sXG4gICAgICAgICAgICB7dG9rZW4gOiBcInBhcmVuLnBhcmVucy1lbmRcIiwgcmVnZXggOiBcIlxcXFwpXCJ9LFxuICAgICAgICAgICAgLy97dG9rZW4gOiBcImtleXdvcmRcIiwgcmVnZXggOiBjb21wb3VuZEtleXdvcmRzfSwgXG4gICAgICAgICAgICB7dG9rZW4gOiBcImtleXdvcmRcIiwgcmVnZXggOiBcIi9sb2NhbHwvZXh0ZXJuYWxcIn0sXG4gICAgICAgICAgICB7dG9rZW4gOiBcImtleXdvcmQucHJlcHJvY2Vzc29yXCIsIHJlZ2V4IDogXCIjKGlmfGVpdGhlcnxcIiArXG4gICAgICAgICAgICAgICAgXCJzd2l0Y2h8Y2FzZXxpbmNsdWRlfGRvfG1hY3JvbG9jYWx8cmVzZXR8cHJvY2Vzc3x0cmFjZSlcIn0sXG4gICAgICAgICAgICB7dG9rZW4gOiBcImNvbnN0YW50LmRhdGF0eXBlIVwiLCByZWdleCA6IFxuICAgICAgICAgICAgICAgIFwiKD86ZGF0YXR5cGV8dW5zZXR8bm9uZXxsb2dpY3xibG9ja3xwYXJlbnxzdHJpbmd8XCIgK1xuICAgICAgICAgICAgICAgIFwiZmlsZXx1cmx8Y2hhcnxpbnRlZ2VyfGZsb2F0fHdvcmR8c2V0LXdvcmR8bGl0LXdvcmR8XCIgK1xuICAgICAgICAgICAgICAgIFwiZ2V0LXdvcmR8cmVmaW5lbWVudHxpc3N1ZXxuYXRpdmV8YWN0aW9ufG9wfGZ1bmN0aW9ufFwiICtcbiAgICAgICAgICAgICAgICBcInBhdGh8bGl0LXBhdGh8c2V0LXBhdGh8Z2V0LXBhdGh8cm91dGluZXxiaXRzZXR8cG9pbnR8XCIgKyBcbiAgICAgICAgICAgICAgICBcIm9iamVjdHx0eXBlc2V0fGVycm9yfHZlY3RvcnxoYXNofHBhaXJ8cGVyY2VudHx0dXBsZXxcIiArXG4gICAgICAgICAgICAgICAgXCJtYXB8YmluYXJ5fHRpbWV8dGFnfGVtYWlsfGhhbmRsZXxkYXRlfGltYWdlfGV2ZW50fFwiICtcbiAgICAgICAgICAgICAgICBcInNlcmllc3xhbnktdHlwZXxudW1iZXJ8YW55LW9iamVjdHxzY2FsYXJ8XCIgK1xuICAgICAgICAgICAgICAgIFwiYW55LXN0cmluZ3xhbnktd29yZHxhbnktZnVuY3Rpb258YW55LWJsb2NrfGFueS1saXN0fFwiICtcbiAgICAgICAgICAgICAgICBcImFueS1wYXRofGltbWVkaWF0ZXxhbGwtd29yZHxpbnRlcm5hbHxleHRlcm5hbHxkZWZhdWx0KSEoPyFbLSE/XFxcXHd+XSlcIn0sXG4gICAgICAgICAgICB7dG9rZW4gOiBcImtleXdvcmQuZnVuY3Rpb25cIiwgcmVnZXggOiBcbiAgICAgICAgICAgICAgICBcIlxcXFxiKD86Y29sbGVjdHxxdW90ZXxvbi1wYXJzZS1ldmVudHxtYXRofGxhc3R8c291cmNlfGV4cGFuZHxcIiArXG4gICAgICAgICAgICAgICAgXCJzaG93fGNvbnRleHR8b2JqZWN0fGlucHV0fHF1aXR8ZGlyfG1ha2UtZGlyfGNhdXNlLWVycm9yfFwiICtcbiAgICAgICAgICAgICAgICBcImVycm9yXFxcXD98bm9uZVxcXFw/fGJsb2NrXFxcXD98YW55LWxpc3RcXFxcP3x3b3JkXFxcXD98Y2hhclxcXFw/fFwiICtcbiAgICAgICAgICAgICAgICBcImFueS1zdHJpbmdcXFxcP3xzZXJpZXNcXFxcP3xiaW5hcnlcXFxcP3xhdHRlbXB0fHVybFxcXFw/fFwiICtcbiAgICAgICAgICAgICAgICBcInN0cmluZ1xcXFw/fHN1ZmZpeFxcXFw/fGZpbGVcXFxcP3xvYmplY3RcXFxcP3xib2R5LW9mfGZpcnN0fFwiICtcbiAgICAgICAgICAgICAgICBcInNlY29uZHx0aGlyZHxtb2R8Y2xlYW4tcGF0aHxkaXJcXFxcP3x0by1yZWQtZmlsZXxcIiArXG4gICAgICAgICAgICAgICAgXCJub3JtYWxpemUtZGlyfGxpc3QtZGlyfHBhZHxlbXB0eVxcXFw/fGRpcml6ZXxvZmZzZXRcXFxcP3xcIiArXG4gICAgICAgICAgICAgICAgXCJ3aGF0LWRpcnxleHBhbmQtZGlyZWN0aXZlc3xsb2FkfHNwbGl0LXBhdGh8Y2hhbmdlLWRpcnxcIiArXG4gICAgICAgICAgICAgICAgXCJ0by1maWxlfHBhdGgtdGhydXxzYXZlfGxvYWQtdGhydXxWaWV3fGZsb2F0XFxcXD98dG8tZmxvYXR8XCIgK1xuICAgICAgICAgICAgICAgIFwiY2hhcnNldHxcXFxcP3xwcm9iZXxzZXQtd29yZFxcXFw/fHF8d29yZHMtb2Z8cmVwbGFjZXxyZXBlbmR8XCIgK1xuICAgICAgICAgICAgICAgIFwicmVhY3R8ZnVuY3Rpb25cXFxcP3xzcGVjLW9mfHVuc2V0XFxcXD98aGFsdHxvcFxcXFw/fFwiICtcbiAgICAgICAgICAgICAgICBcImFueS1mdW5jdGlvblxcXFw/fHRvLXBhcmVufHRhZ1xcXFw/fHJvdXRpbmV8Y2xhc3Mtb2Z8XCIgK1xuICAgICAgICAgICAgICAgIFwic2l6ZS10ZXh0fGRyYXd8aGFuZGxlXFxcXD98bGluay10YWJzLXRvLXBhcmVudHxcIiArXG4gICAgICAgICAgICAgICAgXCJsaW5rLXN1Yi10by1wYXJlbnR8b24tZmFjZS1kZWVwLWNoYW5nZSp8XCIgK1xuICAgICAgICAgICAgICAgIFwidXBkYXRlLWZvbnQtZmFjZXN8ZG8tYWN0b3J8ZG8tc2FmZXxkby1ldmVudHN8cGFpclxcXFw/fFwiICtcbiAgICAgICAgICAgICAgICBcImZvcmVhY2gtZmFjZXxoZXgtdG8tcmdifGlzc3VlXFxcXD98YWx0ZXJ8cGF0aFxcXFw/fFwiICtcbiAgICAgICAgICAgICAgICBcInR5cGVzZXRcXFxcP3xkYXRhdHlwZVxcXFw/fHNldC1mbGFnfGxheW91dHxleHRyYWN0fGltYWdlXFxcXD98XCIgK1xuICAgICAgICAgICAgICAgIFwiZ2V0LXdvcmRcXFxcP3x0by1sb2dpY3x0by1zZXQtd29yZHx0by1ibG9ja3xjZW50ZXItZmFjZXxcIiArXG4gICAgICAgICAgICAgICAgXCJkdW1wLWZhY2V8cmVxdWVzdC1mb250fHJlcXVlc3QtZmlsZXxyZXF1ZXN0LWRpcnxyZWpvaW58XCIgK1xuICAgICAgICAgICAgICAgIFwiZWxsaXBzaXplLWF0fGFueS1ibG9ja1xcXFw/fGFueS1vYmplY3RcXFxcP3xtYXBcXFxcP3xrZXlzLW9mfFwiICtcbiAgICAgICAgICAgICAgICBcImEtYW58YWxzb3xwYXJzZS1mdW5jLXNwZWN8aGVscC1zdHJpbmd8d2hhdHxyb3V0aW5lXFxcXD98XCIgK1xuICAgICAgICAgICAgICAgIFwiYWN0aW9uXFxcXD98bmF0aXZlXFxcXD98cmVmaW5lbWVudFxcXFw/fGNvbW1vbi1zdWJzdHJ8XCIgK1xuICAgICAgICAgICAgICAgIFwicmVkLWNvbXBsZXRlLWZpbGV8cmVkLWNvbXBsZXRlLXBhdGh8dW52aWV3fGNvbW1lbnR8XFxcXD9cXFxcP3xcIiArXG4gICAgICAgICAgICAgICAgXCJmb3VydGh8ZmlmdGh8dmFsdWVzLW9mfGJpdHNldFxcXFw/fGVtYWlsXFxcXD98Z2V0LXBhdGhcXFxcP3xcIiArXG4gICAgICAgICAgICAgICAgXCJoYXNoXFxcXD98aW50ZWdlclxcXFw/fGxpdC1wYXRoXFxcXD98bGl0LXdvcmRcXFxcP3xsb2dpY1xcXFw/fFwiICtcbiAgICAgICAgICAgICAgICBcInBhcmVuXFxcXD98cGVyY2VudFxcXFw/fHNldC1wYXRoXFxcXD98dGltZVxcXFw/fHR1cGxlXFxcXD98ZGF0ZVxcXFw/fFwiICtcbiAgICAgICAgICAgICAgICBcInZlY3RvclxcXFw/fGFueS1wYXRoXFxcXD98YW55LXdvcmRcXFxcP3xudW1iZXJcXFxcP3xpbW1lZGlhdGVcXFxcP3xcIiArXG4gICAgICAgICAgICAgICAgXCJzY2FsYXJcXFxcP3xhbGwtd29yZFxcXFw/fHRvLWJpdHNldHx0by1iaW5hcnl8dG8tY2hhcnx0by1lbWFpbHxcIiArXG4gICAgICAgICAgICAgICAgXCJ0by1nZXQtcGF0aHx0by1nZXQtd29yZHx0by1oYXNofHRvLWludGVnZXJ8dG8taXNzdWV8XCIgK1xuICAgICAgICAgICAgICAgIFwidG8tbGl0LXBhdGh8dG8tbGl0LXdvcmR8dG8tbWFwfHRvLW5vbmV8dG8tcGFpcnx0by1wYXRofFwiICtcbiAgICAgICAgICAgICAgICBcInRvLXBlcmNlbnR8dG8tcmVmaW5lbWVudHx0by1zZXQtcGF0aHx0by1zdHJpbmd8dG8tdGFnfFwiICtcbiAgICAgICAgICAgICAgICBcInRvLXRpbWV8dG8tdHlwZXNldHx0by10dXBsZXx0by11bnNldHx0by11cmx8dG8td29yZHxcIiArXG4gICAgICAgICAgICAgICAgXCJ0by1pbWFnZXx0by1kYXRlfHBhcnNlLXRyYWNlfG1vZHVsb3xldmFsLXNldC1wYXRofFwiICtcbiAgICAgICAgICAgICAgICBcImV4dHJhY3QtYm9vdC1hcmdzfGZsaXAtZXhlLWZsYWd8c3BsaXR8ZG8tZmlsZXxcIiArXG4gICAgICAgICAgICAgICAgXCJleGlzdHMtdGhydVxcXFw/fHJlYWQtdGhydXxkby10aHJ1fGNvc3xzaW58dGFufGFjb3N8YXNpbnxcIiArXG4gICAgICAgICAgICAgICAgXCJhdGFufGF0YW4yfHNxcnR8Y2xlYXItcmVhY3Rpb25zfGR1bXAtcmVhY3Rpb25zfHJlYWN0XFxcXD98XCIgK1xuICAgICAgICAgICAgICAgIFwid2l0aGluXFxcXD98b3ZlcmxhcFxcXFw/fGRpc3RhbmNlXFxcXD98ZmFjZVxcXFw/fG1ldHJpY3NcXFxcP3xcIiArXG4gICAgICAgICAgICAgICAgXCJnZXQtc2Nyb2xsZXJ8aW5zZXJ0LWV2ZW50LWZ1bmN8cmVtb3ZlLWV2ZW50LWZ1bmN8XCIgK1xuICAgICAgICAgICAgICAgIFwic2V0LWZvY3VzfGhlbHB8ZmV0Y2gtaGVscHxhYm91dHxsc3xsbHxwd2R8Y2R8XCIgK1xuICAgICAgICAgICAgICAgIFwicmVkLWNvbXBsZXRlLWlucHV0fG1hdHJpeCkoPyFbLSE/XFxcXHd+XSlcIn0sXG4gICAgICAgICAgICB7dG9rZW4gOiBcImtleXdvcmQuYWN0aW9uXCIsIHJlZ2V4IDogXG4gICAgICAgICAgICAgICAgXCJcXFxcYig/OnRvfHJlbW92ZXxjb3B5fGluc2VydHxjaGFuZ2V8Y2xlYXJ8bW92ZXxwb2tlfHB1dHxcIiArXG4gICAgICAgICAgICAgICAgXCJyYW5kb218cmV2ZXJzZXxzb3J0fHN3YXB8dGFrZXx0cmltfGFkZHxzdWJ0cmFjdHxcIiArXG4gICAgICAgICAgICAgICAgXCJkaXZpZGV8bXVsdGlwbHl8bWFrZXxyZWZsZWN0fGZvcm18bW9sZHxtb2RpZnl8XCIgK1xuICAgICAgICAgICAgICAgIFwiYWJzb2x1dGV8bmVnYXRlfHBvd2VyfHJlbWFpbmRlcnxyb3VuZHxldmVuXFxcXD98b2RkXFxcXD98XCIgK1xuICAgICAgICAgICAgICAgIFwiYW5kfnxjb21wbGVtZW50fG9yfnx4b3J+fGFwcGVuZHxhdHxiYWNrfGZpbmR8c2tpcHxcIiArXG4gICAgICAgICAgICAgICAgXCJ0YWlsfGhlYWR8aGVhZFxcXFw/fGluZGV4XFxcXD98bGVuZ3RoXFxcXD98bmV4dHxwaWNrfFwiICtcbiAgICAgICAgICAgICAgICBcInNlbGVjdHx0YWlsXFxcXD98ZGVsZXRlfHJlYWR8d3JpdGUpKD8hWy1fIT9cXFxcd35dKVwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge3Rva2VuIDogXCJrZXl3b3JkLm5hdGl2ZVwiLCByZWdleCA6IFxuICAgICAgICAgICAgICAgIFwiXFxcXGIoPzpub3R8YW55fHNldHx1cHBlcmNhc2V8bG93ZXJjYXNlfGNoZWNrc3VtfFwiICtcbiAgICAgICAgICAgICAgICBcInRyeXxjYXRjaHxicm93c2V8dGhyb3d8YWxsfGFzfFwiICtcbiAgICAgICAgICAgICAgICBcInJlbW92ZS1lYWNofGZ1bmN8ZnVuY3Rpb258ZG9lc3xoYXN8ZG98cmVkdWNlfFwiICtcbiAgICAgICAgICAgICAgICBcImNvbXBvc2V8Z2V0fHByaW50fHByaW58ZXF1YWxcXFxcP3xub3QtZXF1YWxcXFxcP3xcIiArXG4gICAgICAgICAgICAgICAgXCJzdHJpY3QtZXF1YWxcXFxcP3xsZXNzZXJcXFxcP3xncmVhdGVyXFxcXD98bGVzc2VyLW9yLWVxdWFsXFxcXD98XCIgK1xuICAgICAgICAgICAgICAgIFwiZ3JlYXRlci1vci1lcXVhbFxcXFw/fHNhbWVcXFxcP3x0eXBlXFxcXD98c3RhdHN8YmluZHxpbnxwYXJzZXxcIiArXG4gICAgICAgICAgICAgICAgXCJ1bmlvbnx1bmlxdWV8aW50ZXJzZWN0fGRpZmZlcmVuY2V8ZXhjbHVkZXxcIiArXG4gICAgICAgICAgICAgICAgXCJjb21wbGVtZW50XFxcXD98ZGVoZXh8bmVnYXRpdmVcXFxcP3xwb3NpdGl2ZVxcXFw/fG1heHxtaW58XCIgK1xuICAgICAgICAgICAgICAgIFwic2hpZnR8dG8taGV4fHNpbmV8Y29zaW5lfHRhbmdlbnR8YXJjc2luZXxhcmNjb3NpbmV8XCIgK1xuICAgICAgICAgICAgICAgIFwiYXJjdGFuZ2VudHxhcmN0YW5nZW50MnxOYU5cXFxcP3x6ZXJvXFxcXD98bG9nLTJ8bG9nLTEwfGxvZy1lfFwiICtcbiAgICAgICAgICAgICAgICBcImV4cHxzcXVhcmUtcm9vdHxjb25zdHJ1Y3R8dmFsdWVcXFxcP3xhcy1wYWlyfFwiICtcbiAgICAgICAgICAgICAgICBcImV4dGVuZHxkZWJhc2V8ZW5iYXNlfHRvLWxvY2FsLWZpbGV8XCIgK1xuICAgICAgICAgICAgICAgIFwid2FpdHx1bnNldHxuZXctbGluZXxuZXctbGluZVxcXFw/fGNvbnRleHRcXFxcP3xzZXQtZW52fFwiICtcbiAgICAgICAgICAgICAgICBcImdldC1lbnZ8bGlzdC1lbnZ8bm93fHNpZ25cXFxcP3xjYWxsfHNpemVcXFxcPykoPyFbLSE/XFxcXHd+XSlcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHt0b2tlbiA6IFwia2V5d29yZFwiLCByZWdleCA6IFxuICAgICAgICAgICAgICAgIFwiXFxcXGIoPzpSZWQoPz1cXFxccytcXFxcWyl8b2JqZWN0fGNvbnRleHR8bWFrZXxzZWxmfGtlZXApKD8hWy0hP1xcXFx3fl0pXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7dG9rZW46IFwidmFyaWFibGUubGFuZ3VhZ2VcIiwgcmVnZXggOiBcInRoaXNcIn0sXG4gICAgICAgICAgICB7dG9rZW46IFwia2V5d29yZC5jb250cm9sXCIsIHJlZ2V4IDogXG4gICAgICAgICAgICAgICAgXCIoPzp3aGlsZXxpZnxyZXR1cm58Y2FzZXx1bmxlc3N8ZWl0aGVyfHVudGlsfGxvb3B8cmVwZWF0fFwiICtcbiAgICAgICAgICAgICAgICBcImZvcmV2ZXJ8Zm9yZWFjaHxmb3JhbGx8c3dpdGNofGJyZWFrfGNvbnRpbnVlfGV4aXQpKD8hWy0hP1xcXFx3fl0pXCJ9LFxuICAgICAgICAgICAge3Rva2VuOiBcImNvbnN0YW50Lmxhbmd1YWdlXCIsIHJlZ2V4IDogXG4gICAgICAgICAgICAgICAgXCJcXFxcYig/OnRydWV8ZmFsc2V8b258b2ZmfHllc3xub25lfG5vKSg/IVstIT9cXFxcd35dKVwifSxcbiAgICAgICAgICAgIHt0b2tlbjogXCJjb25zdGFudC5udW1lcmljXCIsIHJlZ2V4IDogL1xcYnBpKD8hW14tX10pL30sXG4gICAgICAgICAgICB7dG9rZW46IFwiY29uc3RhbnQuY2hhcmFjdGVyXCIsIHJlZ2V4IDogXCJcXFxcYihzcGFjZXx0YWJ8bmV3bGluZXxjcnxsZikoPyFbLSE/XFxcXHd+XSlcIn0sXG4gICAgICAgICAgICB7dG9rZW46IFwia2V5d29yZC5vcGVyYXRvclwiLCByZWdleCA6IFwiXFxzKG9yfGFuZHx4b3J8aXMpXFxzXCJ9LFxuICAgICAgICAgICAgLy97dG9rZW4gOiBrZXl3b3JkTWFwcGVyLCByZWdleCA6IFwiXFxcXGJcXFxcd1stXFxcXHcnKi5dKlxcXFxiXCJ9LFxuICAgICAgICAgICAge3Rva2VuIDogXCJ2YXJpYWJsZS5nZXQtcGF0aFwiLCByZWdleCA6IC86XFx3Wy1cXHcnKi4/IV0qKFxcL1xcd1stXFx3JyouPyFdKikoXFwvXFx3Wy1cXHcnKi4/IV0qKSovfSxcbiAgICAgICAgICAgIHt0b2tlbiA6IFwidmFyaWFibGUuc2V0LXBhdGhcIiwgcmVnZXggOiAvXFx3Wy1cXHcnKi4/IV0qKFxcL1xcd1stXFx3JyouPyFdKikoXFwvXFx3Wy1cXHcnKi4/IV0qKSo6L30sXG4gICAgICAgICAgICB7dG9rZW4gOiBcInZhcmlhYmxlLmxpdC1wYXRoXCIsIHJlZ2V4IDogLydcXHdbLVxcdycqLj8hXSooXFwvXFx3Wy1cXHcnKi4/IV0qKShcXC9cXHdbLVxcdycqLj8hXSopKi99LFxuICAgICAgICAgICAge3Rva2VuIDogXCJ2YXJpYWJsZS5wYXRoXCIsIHJlZ2V4IDogL1xcd1stXFx3JyouPyFdKihcXC9cXHdbLVxcdycqLj8hXSopKFxcL1xcd1stXFx3JyouPyFdKikqL30sXG4gICAgICAgICAgICB7dG9rZW4gOiBcInZhcmlhYmxlLnJlZmluZW1lbnRcIiwgcmVnZXggOiAvXFwvXFx3Wy1cXHcnKi4/IV0qL30sIFxuICAgICAgICAgICAge3Rva2VuIDogXCJrZXl3b3JkLnZpZXcuc3R5bGVcIiwgcmVnZXggOiBcbiAgICAgICAgICAgICAgICBcIlxcXFxiKD86d2luZG93fGJhc2V8YnV0dG9ufHRleHR8ZmllbGR8YXJlYXxjaGVja3xcIiArXG4gICAgICAgICAgICAgICAgXCJyYWRpb3xwcm9ncmVzc3xzbGlkZXJ8Y2FtZXJhfHRleHQtbGlzdHxcIiArXG4gICAgICAgICAgICAgICAgXCJkcm9wLWxpc3R8ZHJvcC1kb3dufHBhbmVsfGdyb3VwLWJveHxcIiArXG4gICAgICAgICAgICAgICAgXCJ0YWItcGFuZWx8aDF8aDJ8aDN8aDR8aDV8Ym94fGltYWdlfGluaXQpKD8hWy0hP1xcXFx3fl0pXCJ9LFxuICAgICAgICAgICAge3Rva2VuIDogXCJrZXl3b3JkLnZpZXcuZXZlbnRcIiwgcmVnZXggOiBcbiAgICAgICAgICAgICAgICBcIlxcXFxiKD86ZGV0ZWN0fG9uLWRldGVjdHx0aW1lfG9uLXRpbWV8ZHJhd2luZ3xvbi1kcmF3aW5nfFwiICtcbiAgICAgICAgICAgICAgICBcInNjcm9sbHxvbi1zY3JvbGx8ZG93bnxvbi1kb3dufHVwfG9uLXVwfG1pZC1kb3dufFwiICtcbiAgICAgICAgICAgICAgICBcIm9uLW1pZC1kb3dufG1pZC11cHxvbi1taWQtdXB8YWx0LWRvd258b24tYWx0LWRvd258XCIgK1xuICAgICAgICAgICAgICAgIFwiYWx0LXVwfG9uLWFsdC11cHxhdXgtZG93bnxvbi1hdXgtZG93bnxhdXgtdXB8XCIgK1xuICAgICAgICAgICAgICAgIFwib24tYXV4LXVwfHdoZWVsfG9uLXdoZWVsfGRyYWctc3RhcnR8b24tZHJhZy1zdGFydHxcIiArXG4gICAgICAgICAgICAgICAgXCJkcmFnfG9uLWRyYWd8ZHJvcHxvbi1kcm9wfGNsaWNrfG9uLWNsaWNrfGRibC1jbGlja3xcIiArXG4gICAgICAgICAgICAgICAgXCJvbi1kYmwtY2xpY2t8b3Zlcnxvbi1vdmVyfGtleXxvbi1rZXl8a2V5LWRvd258XCIgK1xuICAgICAgICAgICAgICAgIFwib24ta2V5LWRvd258a2V5LXVwfG9uLWtleS11cHxpbWV8b24taW1lfGZvY3VzfFwiICtcbiAgICAgICAgICAgICAgICBcIm9uLWZvY3VzfHVuZm9jdXN8b24tdW5mb2N1c3xzZWxlY3R8b24tc2VsZWN0fFwiICtcbiAgICAgICAgICAgICAgICBcImNoYW5nZXxvbi1jaGFuZ2V8ZW50ZXJ8b24tZW50ZXJ8bWVudXxvbi1tZW51fGNsb3NlfFwiICtcbiAgICAgICAgICAgICAgICBcIm9uLWNsb3NlfG1vdmV8b24tbW92ZXxyZXNpemV8b24tcmVzaXplfG1vdmluZ3xcIiArXG4gICAgICAgICAgICAgICAgXCJvbi1tb3Zpbmd8cmVzaXppbmd8b24tcmVzaXppbmd8em9vbXxvbi16b29tfHBhbnxcIiArXG4gICAgICAgICAgICAgICAgXCJvbi1wYW58cm90YXRlfG9uLXJvdGF0ZXx0d28tdGFwfG9uLXR3by10YXB8XCIgK1xuICAgICAgICAgICAgICAgIFwicHJlc3MtdGFwfG9uLXByZXNzLXRhcHxjcmVhdGV8b24tY3JlYXRlfGNyZWF0ZWR8b24tY3JlYXRlZCkoPyFbLSE/XFxcXHd+XSlcIn0sXG4gICAgICAgICAgICB7dG9rZW4gOiBcImtleXdvcmQudmlldy5vcHRpb25cIiwgcmVnZXggOiBcbiAgICAgICAgICAgICAgICBcIlxcXFxiKD86YWxsLW92ZXJ8Y2VudGVyfGNvbG9yfGRlZmF1bHR8ZGlzYWJsZWR8ZG93bnxcIiArXG4gICAgICAgICAgICAgICAgXCJmbGFnc3xmb2N1c3xmb250fGZvbnQtY29sb3J8Zm9udC1uYW1lfFwiICtcbiAgICAgICAgICAgICAgICBcImZvbnQtc2l6ZXxoaWRkZW58aGludHxsZWZ0fGxvb3NlfG5hbWV8XCIgK1xuICAgICAgICAgICAgICAgIFwibm8tYm9yZGVyfG5vd3xyYXRlfHJlYWN0fHNlbGVjdHxzaXplfHNwYWNlKSg/IVstIT9cXFxcd35dKVwifSxcbiAgICAgICAgICAgIHt0b2tlbiA6IFwiY29uc3RhbnQub3RoZXIuY29sb3VyXCIsIHJlZ2V4IDogXCJcXFxcYig/OlJlZHx3aGl0ZXx0cmFuc3BhcmVudHxcIiArXG4gICAgICAgICAgICAgICAgXCJibGFja3xncmF5fGFxdWF8YmVpZ2V8Ymx1ZXxicmlja3xicm93bnxjb2FsfGNvZmZlZXxcIiArXG4gICAgICAgICAgICAgICAgXCJjcmltc29ufGN5YW58Zm9yZXN0fGdvbGR8Z3JlZW58aXZvcnl8a2hha2l8bGVhZnxsaW5lbnxcIiArXG4gICAgICAgICAgICAgICAgXCJtYWdlbnRhfG1hcm9vbnxtaW50fG5hdnl8b2xkcmFifG9saXZlfG9yYW5nZXxwYXBheWF8XCIgK1xuICAgICAgICAgICAgICAgIFwicGV3dGVyfHBpbmt8cHVycGxlfHJlYmx1ZXxyZWJvbG9yfHNpZW5uYXxzaWx2ZXJ8c2t5fFwiICtcbiAgICAgICAgICAgICAgICBcInNub3d8dGFubmVkfHRlYWx8dmlvbGV0fHdhdGVyfHdoZWF0fHllbGxvfHllbGxvd3xnbGFzcykoPyFbLSE/XFxcXHd+XSlcIn0sXG4gICAgICAgICAgICB7dG9rZW4gOiBcInZhcmlhYmxlLmdldC13b3JkXCIsIHJlZ2V4IDogL1xcOlxcd1stXFx3JyouPyFdKi99LCBcbiAgICAgICAgICAgIHt0b2tlbiA6IFwidmFyaWFibGUuc2V0LXdvcmRcIiwgcmVnZXggOiAvXFx3Wy1cXHcnKi4/IV0qXFw6L30sIFxuICAgICAgICAgICAge3Rva2VuIDogXCJ2YXJpYWJsZS5saXQtd29yZFwiLCByZWdleCA6IC8nXFx3Wy1cXHcnKi4/IV0qL30sXG4gICAgICAgICAgICB7dG9rZW4gOiBcInZhcmlhYmxlLndvcmRcIiwgcmVnZXggOiAvXFxiXFx3K1stXFx3JyouIT9dKi99LFxuICAgICAgICAgICAge2Nhc2VJbnNlbnNpdGl2ZTogdHJ1ZX1cbiAgICAgICAgXSxcbiAgICAgICAgXCJzdHJpbmdcIiA6IFtcbiAgICAgICAgICAgIC8ve3Rva2VuIDogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIiwgICByZWdleCA6IFwiXlwifSxcbiAgICAgICAgICAgIHt0b2tlbiA6IFwic3RyaW5nXCIsIHJlZ2V4IDogL1wiLywgbmV4dCA6IFwic3RhcnRcIn0sXG4gICAgICAgICAgICB7ZGVmYXVsdFRva2VuIDogXCJzdHJpbmdcIn1cbiAgICAgICAgXSxcbiAgICAgICAgXCJzdHJpbmcub3RoZXJcIiA6IFtcbiAgICAgICAgICAgIC8ve3Rva2VuIDogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIiwgICByZWdleCA6IFwiXlwifSxcbiAgICAgICAgICAgIHt0b2tlbiA6IFwic3RyaW5nLm90aGVyXCIsIHJlZ2V4IDogL30vLCBuZXh0IDogXCJzdGFydFwifSxcbiAgICAgICAgICAgIHtkZWZhdWx0VG9rZW4gOiBcInN0cmluZy5vdGhlclwifVxuICAgICAgICBdLFxuICAgICAgICBcInRhZ1wiIDogW1xuICAgICAgICAgICAge3Rva2VuIDogXCJzdHJpbmcudGFnXCIsIHJlZ2V4IDogLz4vLCBuZXh0IDogXCJzdGFydFwifSxcbiAgICAgICAgICAgIHtkZWZhdWx0VG9rZW4gOiBcInN0cmluZy50YWdcIn1cbiAgICAgICAgXSxcbiAgICAgICAgXCJjb21tZW50XCIgOiBbXG4gICAgICAgICAgICAvL3t0b2tlbiA6IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCIsICAgcmVnZXggOiBcIl5cIn0sXG4gICAgICAgICAgICB7dG9rZW4gOiBcImNvbW1lbnRcIiwgcmVnZXggOiAvfS8sIG5leHQgOiBcInN0YXJ0XCJ9LFxuICAgICAgICAgICAge2RlZmF1bHRUb2tlbiA6IFwiY29tbWVudFwifVxuICAgICAgICBdXG4gICAgfTtcbn07XG5vb3AuaW5oZXJpdHMoUmVkSGlnaGxpZ2h0UnVsZXMsIFRleHRIaWdobGlnaHRSdWxlcyk7XG5cbmV4cG9ydHMuUmVkSGlnaGxpZ2h0UnVsZXMgPSBSZWRIaWdobGlnaHRSdWxlcztcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==