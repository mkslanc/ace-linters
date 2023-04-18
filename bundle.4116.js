"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[4116,8057],{

/***/ 12764:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var Range = (__webpack_require__(59082).Range);
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

/***/ 88057:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var TextMode = (__webpack_require__(98030).Mode);
var JavaScriptHighlightRules = (__webpack_require__(33801)/* .JavaScriptHighlightRules */ ._);
var MatchingBraceOutdent = (__webpack_require__(1164).MatchingBraceOutdent);
var WorkerClient = (__webpack_require__(91451).WorkerClient);
var CstyleBehaviour = (__webpack_require__(19414)/* .CstyleBehaviour */ .B);
var CStyleFoldMode = (__webpack_require__(12764)/* .FoldMode */ .Z);

var Mode = function() {
    this.HighlightRules = JavaScriptHighlightRules;

    this.$outdent = new MatchingBraceOutdent();
    this.$behaviour = new CstyleBehaviour();
    this.foldingRules = new CStyleFoldMode();
};
oop.inherits(Mode, TextMode);

(function() {

    this.lineCommentStart = "//";
    this.blockComment = {start: "/*", end: "*/"};
    this.$quotes = {'"': '"', "'": "'", "`": "`"};
    this.$pairQuotesAfter = {
        "`": /\w/
    };

    this.getNextLineIndent = function(state, line, tab) {
        var indent = this.$getIndent(line);

        var tokenizedLine = this.getTokenizer().getLineTokens(line, state);
        var tokens = tokenizedLine.tokens;
        var endState = tokenizedLine.state;

        if (tokens.length && tokens[tokens.length-1].type == "comment") {
            return indent;
        }

        if (state == "start" || state == "no_regex") {
            var match = line.match(/^.*(?:\bcase\b.*:|[\{\(\[])\s*$/);
            if (match) {
                indent += tab;
            }
        } else if (state == "doc-start") {
            if (endState == "start" || endState == "no_regex") {
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

    this.createWorker = function(session) {
        var worker = new WorkerClient(["ace"], "ace/mode/javascript_worker", "JavaScriptWorker");
        worker.attachToDocument(session.getDocument());

        worker.on("annotate", function(results) {
            session.setAnnotations(results.data);
        });

        worker.on("terminate", function() {
            session.clearAnnotations();
        });

        return worker;
    };

    this.$id = "ace/mode/javascript";
    this.snippetFileId = "ace/snippets/javascript";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 1164:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var Range = (__webpack_require__(59082).Range);

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

/***/ 24116:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var oop = __webpack_require__(89359);
var JSMode = (__webpack_require__(88057).Mode);
var SJSHighlightRules = (__webpack_require__(78377)/* .SJSHighlightRules */ .n);
var MatchingBraceOutdent = (__webpack_require__(1164).MatchingBraceOutdent);
var CstyleBehaviour = (__webpack_require__(19414)/* .CstyleBehaviour */ .B);
var CStyleFoldMode = (__webpack_require__(12764)/* .FoldMode */ .Z);

var Mode = function() {
    this.HighlightRules = SJSHighlightRules;
    this.$outdent = new MatchingBraceOutdent();
    this.$behaviour = new CstyleBehaviour();
    this.foldingRules = new CStyleFoldMode();
};
oop.inherits(Mode, JSMode);
(function() {
    // disable jshint
    this.createWorker = function(session) {
        return null;
    };
    this.$id = "ace/mode/sjs";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 78377:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var JavaScriptHighlightRules = (__webpack_require__(33801)/* .JavaScriptHighlightRules */ ._);
var TextHighlightRules = (__webpack_require__(28053)/* .TextHighlightRules */ .K);

var SJSHighlightRules = function() {
    var parent = new JavaScriptHighlightRules({noES6: true});
    var escapedRe = "\\\\(?:x[0-9a-fA-F]{2}|" + // hex
        "u[0-9a-fA-F]{4}|" + // unicode
        "[0-2][0-7]{0,2}|" + // oct
        "3[0-6][0-7]?|" + // oct
        "37[0-7]?|" + // oct
        "[4-7][0-7]?|" + //oct
        ".)";

    var contextAware = function(f) {
        f.isContextAware = true;
        return f;
    };

    var ctxBegin = function(opts) {
        return {
            token: opts.token,
            regex: opts.regex,
            next: contextAware(function(currentState, stack) {
                if (stack.length === 0)
                    stack.unshift(currentState);
                stack.unshift(opts.next);
                return opts.next;
            })
        };
    };

    var ctxEnd = function(opts) {
        return {
            token: opts.token,
            regex: opts.regex,
            next: contextAware(function(currentState, stack) {
                stack.shift();
                return stack[0] || "start";
            })
        };
    };

    this.$rules = parent.$rules;
    this.$rules.no_regex = [
        {
            token: "keyword",
            regex: "(waitfor|or|and|collapse|spawn|retract)\\b"
        },
        {
            token: "keyword.operator",
            regex: "(->|=>|\\.\\.)"
        },
        {
            token: "variable.language",
            regex: "(hold|default)\\b"
        },
        ctxBegin({
            token: "string",
            regex: "`",
            next: "bstring"
        }),
        ctxBegin({
            token: "string",
            regex: '"',
            next: "qqstring"
        }),
        ctxBegin({
            token: "string",
            regex: '"',
            next: "qqstring"
        }),
        {
            token: ["paren.lparen", "text", "paren.rparen"],
            regex: "(\\{)(\\s*)(\\|)",
            next: "block_arguments"
        }

    ].concat(this.$rules.no_regex);

    this.$rules.block_arguments = [
        {
            token: "paren.rparen",
            regex: "\\|",
            next: "no_regex"
        }
    ].concat(this.$rules.function_arguments);

    this.$rules.bstring = [
        {
            token : "constant.language.escape",
            regex : escapedRe
        },
        {
            token : "string",
            regex : "\\\\$",
            next: "bstring"
        },
        ctxBegin({
            token : "paren.lparen",
            regex : "\\$\\{",
            next: "string_interp"
        }),
        ctxBegin({
            token : "paren.lparen",
            regex : "\\$",
            next: "bstring_interp_single"
        }),
        ctxEnd({
            token : "string",
            regex : "`"
        }),
        {
            defaultToken: "string"
        }
    ];
    
    this.$rules.qqstring = [
        {
            token : "constant.language.escape",
            regex : escapedRe
        },
        {
            token : "string",
            regex : "\\\\$",
            next: "qqstring"
        },
        ctxBegin({
            token : "paren.lparen",
            regex : "#\\{",
            next: "string_interp"
        }),
        ctxEnd({
            token : "string",
            regex : '"'
        }),
        {
            defaultToken: "string"
        }
    ];

    // collect all context-aware (or stateless), brace-less
    // states. This gives us most normal highlighting
    // for use within interpreted contexts
    // without interfering with context nesting
    var embeddableRules = [];
    for (var i=0; i < this.$rules.no_regex.length; i++) {
        var rule = this.$rules.no_regex[i];
        var token = String(rule.token);
        if (token.indexOf('paren') == -1 && (!rule.next || rule.next.isContextAware)) {
            embeddableRules.push(rule);
        }
    }

    this.$rules.string_interp = [
        ctxEnd({
            token: "paren.rparen",
            regex: "\\}"
        }),
        ctxBegin({
            token: "paren.lparen",
            regex: '{',
            next: "string_interp"
        })
    ].concat(embeddableRules);

    // backtick strings can have single interpolation, which accept
    // \w+ followed by an optional set of function call parens
    this.$rules.bstring_interp_single = [
        {
            token: ["identifier", "paren.lparen"],
            regex: '(\\w+)(\\()',
            next: 'bstring_interp_single_call'
        },
        // identifier-only match ends this interp
        ctxEnd({
            token : "identifier",
            regex : "\\w*"
        })
    ];
    
    // the call part of a bstring_interp_single
    // is terminated by a close paren `)`, but
    // can have nested parens.
    this.$rules.bstring_interp_single_call = [
        ctxBegin({
            token: "paren.lparen",
            regex: "\\(",
            next: "bstring_interp_single_call"
        }),
        ctxEnd({
            token: "paren.rparen",
            regex: "\\)"
        })
    ].concat(embeddableRules);
};
oop.inherits(SJSHighlightRules, TextHighlightRules);

exports.n = SJSHighlightRules;


/***/ })

}]);
//# sourceMappingURL=bundle.4116.js.map