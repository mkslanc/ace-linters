"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[5052],{

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

/***/ 95052:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var ShHighlightRules = (__webpack_require__(55359).ShHighlightRules);
var Range = (__webpack_require__(91902)/* .Range */ .Q);
var CStyleFoldMode = (__webpack_require__(93887)/* .FoldMode */ .l);

var Mode = function() {
    this.HighlightRules = ShHighlightRules;
    this.foldingRules = new CStyleFoldMode();
    this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, TextMode);

(function() {

   
    this.lineCommentStart = "#";

    this.getNextLineIndent = function(state, line, tab) {
        var indent = this.$getIndent(line);

        var tokenizedLine = this.getTokenizer().getLineTokens(line, state);
        var tokens = tokenizedLine.tokens;

        if (tokens.length && tokens[tokens.length-1].type == "comment") {
            return indent;
        }

        if (state == "start") {
            var match = line.match(/^.*[\{\(\[:]\s*$/);
            if (match) {
                indent += tab;
            }
        }

        return indent;
    };

    var outdents = {
        "pass": 1,
        "return": 1,
        "raise": 1,
        "break": 1,
        "continue": 1
    };

    this.checkOutdent = function(state, line, input) {
        if (input !== "\r\n" && input !== "\r" && input !== "\n")
            return false;

        var tokens = this.getTokenizer().getLineTokens(line.trim(), state).tokens;

        if (!tokens)
            return false;

        // ignore trailing comments
        do {
            var last = tokens.pop();
        } while (last && (last.type == "comment" || (last.type == "text" && last.value.match(/^\s+$/))));

        if (!last)
            return false;

        return (last.type == "keyword" && outdents[last.value]);
    };

    this.autoOutdent = function(state, doc, row) {
        // outdenting in sh is slightly different because it always applies
        // to the next line and only of a new line is inserted

        row += 1;
        var indent = this.$getIndent(doc.getLine(row));
        var tab = doc.getTabString();
        if (indent.slice(-tab.length) == tab)
            doc.remove(new Range(row, indent.length-tab.length, row, indent.length));
    };

    this.$id = "ace/mode/sh";
    this.snippetFileId = "ace/snippets/sh";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 55359:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

var reservedKeywords = exports.reservedKeywords = (
        '!|{|}|case|do|done|elif|else|'+
        'esac|fi|for|if|in|then|until|while|'+
        '&|;|export|local|read|typeset|unset|'+
        'elif|select|set|function|declare|readonly'
    );

var languageConstructs = exports.languageConstructs = (
    '[|]|alias|bg|bind|break|builtin|'+
     'cd|command|compgen|complete|continue|'+
     'dirs|disown|echo|enable|eval|exec|'+
     'exit|fc|fg|getopts|hash|help|history|'+
     'jobs|kill|let|logout|popd|printf|pushd|'+
     'pwd|return|set|shift|shopt|source|'+
     'suspend|test|times|trap|type|ulimit|'+
     'umask|unalias|wait'
);

var ShHighlightRules = function() {
    var keywordMapper = this.createKeywordMapper({
        "keyword": reservedKeywords,
        "support.function.builtin": languageConstructs,
        "invalid.deprecated": "debugger"
    }, "identifier");

    var integer = "(?:(?:[1-9]\\d*)|(?:0))";
    // var integer = "(?:" + decimalInteger + ")";

    var fraction = "(?:\\.\\d+)";
    var intPart = "(?:\\d+)";
    var pointFloat = "(?:(?:" + intPart + "?" + fraction + ")|(?:" + intPart + "\\.))";
    var exponentFloat = "(?:(?:" + pointFloat + "|" +  intPart + ")" + ")";
    var floatNumber = "(?:" + exponentFloat + "|" + pointFloat + ")";
    var fileDescriptor = "(?:&" + intPart + ")";

    var variableName = "[a-zA-Z_][a-zA-Z0-9_]*";
    var variable = "(?:" + variableName + "(?==))";

    var builtinVariable = "(?:\\$(?:SHLVL|\\$|\\!|\\?))";

    var func = "(?:" + variableName + "\\s*\\(\\))";

    this.$rules = {
        "start" : [{
            token : "constant",
            regex : /\\./
        }, {
            token : ["text", "comment"],
            regex : /(^|\s)(#.*)$/
        }, {
            token : "string.start",
            regex : '"',
            push : [{
                token : "constant.language.escape",
                regex : /\\(?:[$`"\\]|$)/
            }, {
                include : "variables"
            }, {
                token : "keyword.operator",
                regex : /`/ // TODO highlight `
            }, {
                token : "string.end",
                regex : '"',
                next: "pop"
            }, {
                defaultToken: "string"
            }]
        }, {
            token : "string",
            regex : "\\$'",
            push : [{
                token : "constant.language.escape",
                regex : /\\(?:[abeEfnrtv\\'"]|x[a-fA-F\d]{1,2}|u[a-fA-F\d]{4}([a-fA-F\d]{4})?|c.|\d{1,3})/
            }, {
                token : "string",
                regex : "'",
                next: "pop"
            }, {
                defaultToken: "string"
            }]
        }, {
            regex : "<<<",
            token : "keyword.operator"
        }, {
            stateName: "heredoc",
            regex : "(<<-?)(\\s*)(['\"`]?)([\\w\\-]+)(['\"`]?)",
            onMatch : function(value, currentState, stack) {
                var next = value[2] == '-' ? "indentedHeredoc" : "heredoc";
                var tokens = value.split(this.splitRegex);
                stack.push(next, tokens[4]);
                return [
                    {type:"constant", value: tokens[1]},
                    {type:"text", value: tokens[2]},
                    {type:"string", value: tokens[3]},
                    {type:"support.class", value: tokens[4]},
                    {type:"string", value: tokens[5]}
                ];
            },
            rules: {
                heredoc: [{
                    onMatch:  function(value, currentState, stack) {
                        if (value === stack[1]) {
                            stack.shift();
                            stack.shift();
                            this.next = stack[0] || "start";
                            return "support.class";
                        }
                        this.next = "";
                        return "string";
                    },
                    regex: ".*$",
                    next: "start"
                }],
                indentedHeredoc: [{
                    token: "string",
                    regex: "^\t+"
                }, {
                    onMatch:  function(value, currentState, stack) {
                        if (value === stack[1]) {
                            stack.shift();
                            stack.shift();
                            this.next = stack[0] || "start";
                            return "support.class";
                        }
                        this.next = "";
                        return "string";
                    },
                    regex: ".*$",
                    next: "start"
                }]
            }
        }, {
            regex : "$",
            token : "empty",
            next : function(currentState, stack) {
                if (stack[0] === "heredoc" || stack[0] === "indentedHeredoc")
                    return stack[0];
                return currentState;
            }
        }, {
            token : ["keyword", "text", "text", "text", "variable"],
            regex : /(declare|local|readonly)(\s+)(?:(-[fixar]+)(\s+))?([a-zA-Z_][a-zA-Z0-9_]*\b)/
        }, {
            token : "variable.language",
            regex : builtinVariable
        }, {
            token : "variable",
            regex : variable
        }, {
            include : "variables"
        }, {
            token : "support.function",
            regex : func
        }, {
            token : "support.function",
            regex : fileDescriptor
        }, {
            token : "string",           // ' string
            start : "'", end : "'"
        }, {
            token : "constant.numeric", // float
            regex : floatNumber
        }, {
            token : "constant.numeric", // integer
            regex : integer + "\\b"
        }, {
            token : keywordMapper,
            regex : "[a-zA-Z_][a-zA-Z0-9_]*\\b"
        }, {
            token : "keyword.operator",
            regex : "\\+|\\-|\\*|\\*\\*|\\/|\\/\\/|~|<|>|<=|=>|=|!=|[%&|`]"
        }, {
            token : "punctuation.operator",
            regex : ";"
        }, {
            token : "paren.lparen",
            regex : "[\\[\\(\\{]"
        }, {
            token : "paren.rparen",
            regex : "[\\]]"
        }, {
            token : "paren.rparen",
            regex : "[\\)\\}]",
            next : "pop"
        }],
        variables: [{
            token : "variable",
            regex : /(\$)(\w+)/
        }, {
            token : ["variable", "paren.lparen"],
            regex : /(\$)(\()/,
            push : "start"
        }, {
            token : ["variable", "paren.lparen", "keyword.operator", "variable", "keyword.operator"],
            regex : /(\$)(\{)([#!]?)(\w+|[*@#?\-$!0_])(:[?+\-=]?|##?|%%?|,,?\/|\^\^?)?/,
            push : "start"
        }, {
            token : "variable",
            regex : /\$[*@#?\-$!0_]/
        }, {
            token : ["variable", "paren.lparen"],
            regex : /(\$)(\{)/,
            push : "start"
        }]
    };
    
    this.normalizeRules();
};

oop.inherits(ShHighlightRules, TextHighlightRules);

exports.ShHighlightRules = ShHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSw0QkFBNEI7QUFDNUI7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLDRCQUE0QjtBQUM1QjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSx3QkFBd0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2ZvbGRpbmcvY3N0eWxlLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvc2guanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9zaF9oaWdobGlnaHRfcnVsZXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vLi4vbGliL29vcFwiKTtcbnZhciBSYW5nZSA9IHJlcXVpcmUoXCIuLi8uLi9yYW5nZVwiKS5SYW5nZTtcbnZhciBCYXNlRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9mb2xkX21vZGVcIikuRm9sZE1vZGU7XG5cbnZhciBGb2xkTW9kZSA9IGV4cG9ydHMuRm9sZE1vZGUgPSBmdW5jdGlvbihjb21tZW50UmVnZXgpIHtcbiAgICBpZiAoY29tbWVudFJlZ2V4KSB7XG4gICAgICAgIHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyID0gbmV3IFJlZ0V4cChcbiAgICAgICAgICAgIHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyLnNvdXJjZS5yZXBsYWNlKC9cXHxbXnxdKj8kLywgXCJ8XCIgKyBjb21tZW50UmVnZXguc3RhcnQpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIgPSBuZXcgUmVnRXhwKFxuICAgICAgICAgICAgdGhpcy5mb2xkaW5nU3RvcE1hcmtlci5zb3VyY2UucmVwbGFjZSgvXFx8W158XSo/JC8sIFwifFwiICsgY29tbWVudFJlZ2V4LmVuZClcbiAgICAgICAgKTtcbiAgICB9XG59O1xub29wLmluaGVyaXRzKEZvbGRNb2RlLCBCYXNlRm9sZE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgXG4gICAgdGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIgPSAvKFtcXHtcXFtcXChdKVteXFx9XFxdXFwpXSokfF5cXHMqKFxcL1xcKikvO1xuICAgIHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIgPSAvXlteXFxbXFx7XFwoXSooW1xcfVxcXVxcKV0pfF5bXFxzXFwqXSooXFwqXFwvKS87XG4gICAgdGhpcy5zaW5nbGVMaW5lQmxvY2tDb21tZW50UmU9IC9eXFxzKihcXC9cXCopLipcXCpcXC9cXHMqJC87XG4gICAgdGhpcy50cmlwbGVTdGFyQmxvY2tDb21tZW50UmUgPSAvXlxccyooXFwvXFwqXFwqXFwqKS4qXFwqXFwvXFxzKiQvO1xuICAgIHRoaXMuc3RhcnRSZWdpb25SZSA9IC9eXFxzKihcXC9cXCp8XFwvXFwvKSM/cmVnaW9uXFxiLztcbiAgICBcbiAgICAvL3ByZXZlbnQgbmFtaW5nIGNvbmZsaWN0IHdpdGggYW55IG1vZGVzIHRoYXQgaW5oZXJpdCBmcm9tIGNzdHlsZSBhbmQgb3ZlcnJpZGUgdGhpcyAobGlrZSBjc2hhcnApXG4gICAgdGhpcy5fZ2V0Rm9sZFdpZGdldEJhc2UgPSB0aGlzLmdldEZvbGRXaWRnZXQ7XG4gICAgXG4gICAgLyoqXG4gICAgICogR2V0cyBmb2xkIHdpZGdldCB3aXRoIHNvbWUgbm9uLXN0YW5kYXJkIGV4dHJhczpcbiAgICAgKlxuICAgICAqIEBleGFtcGxlIGxpbmVDb21tZW50UmVnaW9uU3RhcnRcbiAgICAgKiAgICAgIC8vI3JlZ2lvbiBbb3B0aW9uYWwgZGVzY3JpcHRpb25dXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSBibG9ja0NvbW1lbnRSZWdpb25TdGFydFxuICAgICAqICAgICAgLyojcmVnaW9uIFtvcHRpb25hbCBkZXNjcmlwdGlvbl0gKlsvXVxuICAgICAqXG4gICAgICogQGV4YW1wbGUgdHJpcGxlU3RhckZvbGRpbmdTZWN0aW9uXG4gICAgICogICAgICAvKioqIHRoaXMgZm9sZHMgZXZlbiB0aG91Z2ggMSBsaW5lIGJlY2F1c2UgaXQgaGFzIDMgc3RhcnMgKioqWy9dXG4gICAgICogXG4gICAgICogQG5vdGUgdGhlIHBvdW5kIHN5bWJvbCBmb3IgcmVnaW9uIHRhZ3MgaXMgb3B0aW9uYWxcbiAgICAgKi9cbiAgICB0aGlzLmdldEZvbGRXaWRnZXQgPSBmdW5jdGlvbihzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdykge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgIFxuICAgICAgICBpZiAodGhpcy5zaW5nbGVMaW5lQmxvY2tDb21tZW50UmUudGVzdChsaW5lKSkge1xuICAgICAgICAgICAgLy8gTm8gd2lkZ2V0IGZvciBzaW5nbGUgbGluZSBibG9jayBjb21tZW50IHVubGVzcyByZWdpb24gb3IgdHJpcGxlIHN0YXJcbiAgICAgICAgICAgIGlmICghdGhpcy5zdGFydFJlZ2lvblJlLnRlc3QobGluZSkgJiYgIXRoaXMudHJpcGxlU3RhckJsb2NrQ29tbWVudFJlLnRlc3QobGluZSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgdmFyIGZ3ID0gdGhpcy5fZ2V0Rm9sZFdpZGdldEJhc2Uoc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpO1xuICAgIFxuICAgICAgICBpZiAoIWZ3ICYmIHRoaXMuc3RhcnRSZWdpb25SZS50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgcmV0dXJuIFwic3RhcnRcIjsgLy8gbGluZUNvbW1lbnRSZWdpb25TdGFydFxuICAgIFxuICAgICAgICByZXR1cm4gZnc7XG4gICAgfTtcblxuICAgIHRoaXMuZ2V0Rm9sZFdpZGdldFJhbmdlID0gZnVuY3Rpb24oc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3csIGZvcmNlTXVsdGlsaW5lKSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5zdGFydFJlZ2lvblJlLnRlc3QobGluZSkpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRDb21tZW50UmVnaW9uQmxvY2soc2Vzc2lvbiwgbGluZSwgcm93KTtcbiAgICAgICAgXG4gICAgICAgIHZhciBtYXRjaCA9IGxpbmUubWF0Y2godGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIpO1xuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIHZhciBpID0gbWF0Y2guaW5kZXg7XG5cbiAgICAgICAgICAgIGlmIChtYXRjaFsxXSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5vcGVuaW5nQnJhY2tldEJsb2NrKHNlc3Npb24sIG1hdGNoWzFdLCByb3csIGkpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIHJhbmdlID0gc2Vzc2lvbi5nZXRDb21tZW50Rm9sZFJhbmdlKHJvdywgaSArIG1hdGNoWzBdLmxlbmd0aCwgMSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChyYW5nZSAmJiAhcmFuZ2UuaXNNdWx0aUxpbmUoKSkge1xuICAgICAgICAgICAgICAgIGlmIChmb3JjZU11bHRpbGluZSkge1xuICAgICAgICAgICAgICAgICAgICByYW5nZSA9IHRoaXMuZ2V0U2VjdGlvblJhbmdlKHNlc3Npb24sIHJvdyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChmb2xkU3R5bGUgIT0gXCJhbGxcIilcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2UgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gcmFuZ2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZm9sZFN0eWxlID09PSBcIm1hcmtiZWdpblwiKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHZhciBtYXRjaCA9IGxpbmUubWF0Y2godGhpcy5mb2xkaW5nU3RvcE1hcmtlcik7XG4gICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgdmFyIGkgPSBtYXRjaC5pbmRleCArIG1hdGNoWzBdLmxlbmd0aDtcblxuICAgICAgICAgICAgaWYgKG1hdGNoWzFdKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNsb3NpbmdCcmFja2V0QmxvY2soc2Vzc2lvbiwgbWF0Y2hbMV0sIHJvdywgaSk7XG5cbiAgICAgICAgICAgIHJldHVybiBzZXNzaW9uLmdldENvbW1lbnRGb2xkUmFuZ2Uocm93LCBpLCAtMSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFxuICAgIHRoaXMuZ2V0U2VjdGlvblJhbmdlID0gZnVuY3Rpb24oc2Vzc2lvbiwgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgIHZhciBzdGFydEluZGVudCA9IGxpbmUuc2VhcmNoKC9cXFMvKTtcbiAgICAgICAgdmFyIHN0YXJ0Um93ID0gcm93O1xuICAgICAgICB2YXIgc3RhcnRDb2x1bW4gPSBsaW5lLmxlbmd0aDtcbiAgICAgICAgcm93ID0gcm93ICsgMTtcbiAgICAgICAgdmFyIGVuZFJvdyA9IHJvdztcbiAgICAgICAgdmFyIG1heFJvdyA9IHNlc3Npb24uZ2V0TGVuZ3RoKCk7XG4gICAgICAgIHdoaWxlICgrK3JvdyA8IG1heFJvdykge1xuICAgICAgICAgICAgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICAgICAgdmFyIGluZGVudCA9IGxpbmUuc2VhcmNoKC9cXFMvKTtcbiAgICAgICAgICAgIGlmIChpbmRlbnQgPT09IC0xKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgaWYgIChzdGFydEluZGVudCA+IGluZGVudClcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIHZhciBzdWJSYW5nZSA9IHRoaXMuZ2V0Rm9sZFdpZGdldFJhbmdlKHNlc3Npb24sIFwiYWxsXCIsIHJvdyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChzdWJSYW5nZSkge1xuICAgICAgICAgICAgICAgIGlmIChzdWJSYW5nZS5zdGFydC5yb3cgPD0gc3RhcnRSb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzdWJSYW5nZS5pc011bHRpTGluZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJvdyA9IHN1YlJhbmdlLmVuZC5yb3c7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzdGFydEluZGVudCA9PSBpbmRlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZW5kUm93ID0gcm93O1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gbmV3IFJhbmdlKHN0YXJ0Um93LCBzdGFydENvbHVtbiwgZW5kUm93LCBzZXNzaW9uLmdldExpbmUoZW5kUm93KS5sZW5ndGgpO1xuICAgIH07XG4gICAgXG4gICAgLyoqXG4gICAgICogZ2V0cyBjb21tZW50IHJlZ2lvbiBibG9jayB3aXRoIGVuZCByZWdpb24gYXNzdW1lZCB0byBiZSBzdGFydCBvZiBjb21tZW50IGluIGFueSBjc3R5bGUgbW9kZSBvciBTUUwgbW9kZSAoLS0pIHdoaWNoIGluaGVyaXRzIGZyb20gdGhpcy5cbiAgICAgKiBUaGVyZSBtYXkgb3B0aW9uYWxseSBiZSBhIHBvdW5kIHN5bWJvbCBiZWZvcmUgdGhlIHJlZ2lvbi9lbmRyZWdpb24gc3RhdGVtZW50XG4gICAgICovXG4gICAgdGhpcy5nZXRDb21tZW50UmVnaW9uQmxvY2sgPSBmdW5jdGlvbihzZXNzaW9uLCBsaW5lLCByb3cpIHtcbiAgICAgICAgdmFyIHN0YXJ0Q29sdW1uID0gbGluZS5zZWFyY2goL1xccyokLyk7XG4gICAgICAgIHZhciBtYXhSb3cgPSBzZXNzaW9uLmdldExlbmd0aCgpO1xuICAgICAgICB2YXIgc3RhcnRSb3cgPSByb3c7XG4gICAgICAgIFxuICAgICAgICB2YXIgcmUgPSAvXlxccyooPzpcXC9cXCp8XFwvXFwvfC0tKSM/KGVuZCk/cmVnaW9uXFxiLztcbiAgICAgICAgdmFyIGRlcHRoID0gMTtcbiAgICAgICAgd2hpbGUgKCsrcm93IDwgbWF4Um93KSB7XG4gICAgICAgICAgICBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgICAgICB2YXIgbSA9IHJlLmV4ZWMobGluZSk7XG4gICAgICAgICAgICBpZiAoIW0pIGNvbnRpbnVlO1xuICAgICAgICAgICAgaWYgKG1bMV0pIGRlcHRoLS07XG4gICAgICAgICAgICBlbHNlIGRlcHRoKys7XG5cbiAgICAgICAgICAgIGlmICghZGVwdGgpIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGVuZFJvdyA9IHJvdztcbiAgICAgICAgaWYgKGVuZFJvdyA+IHN0YXJ0Um93KSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFJhbmdlKHN0YXJ0Um93LCBzdGFydENvbHVtbiwgZW5kUm93LCBsaW5lLmxlbmd0aCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG59KS5jYWxsKEZvbGRNb2RlLnByb3RvdHlwZSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRNb2RlID0gcmVxdWlyZShcIi4vdGV4dFwiKS5Nb2RlO1xudmFyIFNoSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9zaF9oaWdobGlnaHRfcnVsZXNcIikuU2hIaWdobGlnaHRSdWxlcztcbnZhciBSYW5nZSA9IHJlcXVpcmUoXCIuLi9yYW5nZVwiKS5SYW5nZTtcbnZhciBDU3R5bGVGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRpbmcvY3N0eWxlXCIpLkZvbGRNb2RlO1xuXG52YXIgTW9kZSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuSGlnaGxpZ2h0UnVsZXMgPSBTaEhpZ2hsaWdodFJ1bGVzO1xuICAgIHRoaXMuZm9sZGluZ1J1bGVzID0gbmV3IENTdHlsZUZvbGRNb2RlKCk7XG4gICAgdGhpcy4kYmVoYXZpb3VyID0gdGhpcy4kZGVmYXVsdEJlaGF2aW91cjtcbn07XG5vb3AuaW5oZXJpdHMoTW9kZSwgVGV4dE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG5cbiAgIFxuICAgIHRoaXMubGluZUNvbW1lbnRTdGFydCA9IFwiI1wiO1xuXG4gICAgdGhpcy5nZXROZXh0TGluZUluZGVudCA9IGZ1bmN0aW9uKHN0YXRlLCBsaW5lLCB0YWIpIHtcbiAgICAgICAgdmFyIGluZGVudCA9IHRoaXMuJGdldEluZGVudChsaW5lKTtcblxuICAgICAgICB2YXIgdG9rZW5pemVkTGluZSA9IHRoaXMuZ2V0VG9rZW5pemVyKCkuZ2V0TGluZVRva2VucyhsaW5lLCBzdGF0ZSk7XG4gICAgICAgIHZhciB0b2tlbnMgPSB0b2tlbml6ZWRMaW5lLnRva2VucztcblxuICAgICAgICBpZiAodG9rZW5zLmxlbmd0aCAmJiB0b2tlbnNbdG9rZW5zLmxlbmd0aC0xXS50eXBlID09IFwiY29tbWVudFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5kZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN0YXRlID09IFwic3RhcnRcIikge1xuICAgICAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCgvXi4qW1xce1xcKFxcWzpdXFxzKiQvKTtcbiAgICAgICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgICAgIGluZGVudCArPSB0YWI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW5kZW50O1xuICAgIH07XG5cbiAgICB2YXIgb3V0ZGVudHMgPSB7XG4gICAgICAgIFwicGFzc1wiOiAxLFxuICAgICAgICBcInJldHVyblwiOiAxLFxuICAgICAgICBcInJhaXNlXCI6IDEsXG4gICAgICAgIFwiYnJlYWtcIjogMSxcbiAgICAgICAgXCJjb250aW51ZVwiOiAxXG4gICAgfTtcblxuICAgIHRoaXMuY2hlY2tPdXRkZW50ID0gZnVuY3Rpb24oc3RhdGUsIGxpbmUsIGlucHV0KSB7XG4gICAgICAgIGlmIChpbnB1dCAhPT0gXCJcXHJcXG5cIiAmJiBpbnB1dCAhPT0gXCJcXHJcIiAmJiBpbnB1dCAhPT0gXCJcXG5cIilcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgICB2YXIgdG9rZW5zID0gdGhpcy5nZXRUb2tlbml6ZXIoKS5nZXRMaW5lVG9rZW5zKGxpbmUudHJpbSgpLCBzdGF0ZSkudG9rZW5zO1xuXG4gICAgICAgIGlmICghdG9rZW5zKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIC8vIGlnbm9yZSB0cmFpbGluZyBjb21tZW50c1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICB2YXIgbGFzdCA9IHRva2Vucy5wb3AoKTtcbiAgICAgICAgfSB3aGlsZSAobGFzdCAmJiAobGFzdC50eXBlID09IFwiY29tbWVudFwiIHx8IChsYXN0LnR5cGUgPT0gXCJ0ZXh0XCIgJiYgbGFzdC52YWx1ZS5tYXRjaCgvXlxccyskLykpKSk7XG5cbiAgICAgICAgaWYgKCFsYXN0KVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIHJldHVybiAobGFzdC50eXBlID09IFwia2V5d29yZFwiICYmIG91dGRlbnRzW2xhc3QudmFsdWVdKTtcbiAgICB9O1xuXG4gICAgdGhpcy5hdXRvT3V0ZGVudCA9IGZ1bmN0aW9uKHN0YXRlLCBkb2MsIHJvdykge1xuICAgICAgICAvLyBvdXRkZW50aW5nIGluIHNoIGlzIHNsaWdodGx5IGRpZmZlcmVudCBiZWNhdXNlIGl0IGFsd2F5cyBhcHBsaWVzXG4gICAgICAgIC8vIHRvIHRoZSBuZXh0IGxpbmUgYW5kIG9ubHkgb2YgYSBuZXcgbGluZSBpcyBpbnNlcnRlZFxuXG4gICAgICAgIHJvdyArPSAxO1xuICAgICAgICB2YXIgaW5kZW50ID0gdGhpcy4kZ2V0SW5kZW50KGRvYy5nZXRMaW5lKHJvdykpO1xuICAgICAgICB2YXIgdGFiID0gZG9jLmdldFRhYlN0cmluZygpO1xuICAgICAgICBpZiAoaW5kZW50LnNsaWNlKC10YWIubGVuZ3RoKSA9PSB0YWIpXG4gICAgICAgICAgICBkb2MucmVtb3ZlKG5ldyBSYW5nZShyb3csIGluZGVudC5sZW5ndGgtdGFiLmxlbmd0aCwgcm93LCBpbmRlbnQubGVuZ3RoKSk7XG4gICAgfTtcblxuICAgIHRoaXMuJGlkID0gXCJhY2UvbW9kZS9zaFwiO1xuICAgIHRoaXMuc25pcHBldEZpbGVJZCA9IFwiYWNlL3NuaXBwZXRzL3NoXCI7XG59KS5jYWxsKE1vZGUucHJvdG90eXBlKTtcblxuZXhwb3J0cy5Nb2RlID0gTW9kZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xuXG52YXIgcmVzZXJ2ZWRLZXl3b3JkcyA9IGV4cG9ydHMucmVzZXJ2ZWRLZXl3b3JkcyA9IChcbiAgICAgICAgJyF8e3x9fGNhc2V8ZG98ZG9uZXxlbGlmfGVsc2V8JytcbiAgICAgICAgJ2VzYWN8Zml8Zm9yfGlmfGlufHRoZW58dW50aWx8d2hpbGV8JytcbiAgICAgICAgJyZ8O3xleHBvcnR8bG9jYWx8cmVhZHx0eXBlc2V0fHVuc2V0fCcrXG4gICAgICAgICdlbGlmfHNlbGVjdHxzZXR8ZnVuY3Rpb258ZGVjbGFyZXxyZWFkb25seSdcbiAgICApO1xuXG52YXIgbGFuZ3VhZ2VDb25zdHJ1Y3RzID0gZXhwb3J0cy5sYW5ndWFnZUNvbnN0cnVjdHMgPSAoXG4gICAgJ1t8XXxhbGlhc3xiZ3xiaW5kfGJyZWFrfGJ1aWx0aW58JytcbiAgICAgJ2NkfGNvbW1hbmR8Y29tcGdlbnxjb21wbGV0ZXxjb250aW51ZXwnK1xuICAgICAnZGlyc3xkaXNvd258ZWNob3xlbmFibGV8ZXZhbHxleGVjfCcrXG4gICAgICdleGl0fGZjfGZnfGdldG9wdHN8aGFzaHxoZWxwfGhpc3Rvcnl8JytcbiAgICAgJ2pvYnN8a2lsbHxsZXR8bG9nb3V0fHBvcGR8cHJpbnRmfHB1c2hkfCcrXG4gICAgICdwd2R8cmV0dXJufHNldHxzaGlmdHxzaG9wdHxzb3VyY2V8JytcbiAgICAgJ3N1c3BlbmR8dGVzdHx0aW1lc3x0cmFwfHR5cGV8dWxpbWl0fCcrXG4gICAgICd1bWFza3x1bmFsaWFzfHdhaXQnXG4pO1xuXG52YXIgU2hIaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBrZXl3b3JkTWFwcGVyID0gdGhpcy5jcmVhdGVLZXl3b3JkTWFwcGVyKHtcbiAgICAgICAgXCJrZXl3b3JkXCI6IHJlc2VydmVkS2V5d29yZHMsXG4gICAgICAgIFwic3VwcG9ydC5mdW5jdGlvbi5idWlsdGluXCI6IGxhbmd1YWdlQ29uc3RydWN0cyxcbiAgICAgICAgXCJpbnZhbGlkLmRlcHJlY2F0ZWRcIjogXCJkZWJ1Z2dlclwiXG4gICAgfSwgXCJpZGVudGlmaWVyXCIpO1xuXG4gICAgdmFyIGludGVnZXIgPSBcIig/Oig/OlsxLTldXFxcXGQqKXwoPzowKSlcIjtcbiAgICAvLyB2YXIgaW50ZWdlciA9IFwiKD86XCIgKyBkZWNpbWFsSW50ZWdlciArIFwiKVwiO1xuXG4gICAgdmFyIGZyYWN0aW9uID0gXCIoPzpcXFxcLlxcXFxkKylcIjtcbiAgICB2YXIgaW50UGFydCA9IFwiKD86XFxcXGQrKVwiO1xuICAgIHZhciBwb2ludEZsb2F0ID0gXCIoPzooPzpcIiArIGludFBhcnQgKyBcIj9cIiArIGZyYWN0aW9uICsgXCIpfCg/OlwiICsgaW50UGFydCArIFwiXFxcXC4pKVwiO1xuICAgIHZhciBleHBvbmVudEZsb2F0ID0gXCIoPzooPzpcIiArIHBvaW50RmxvYXQgKyBcInxcIiArICBpbnRQYXJ0ICsgXCIpXCIgKyBcIilcIjtcbiAgICB2YXIgZmxvYXROdW1iZXIgPSBcIig/OlwiICsgZXhwb25lbnRGbG9hdCArIFwifFwiICsgcG9pbnRGbG9hdCArIFwiKVwiO1xuICAgIHZhciBmaWxlRGVzY3JpcHRvciA9IFwiKD86JlwiICsgaW50UGFydCArIFwiKVwiO1xuXG4gICAgdmFyIHZhcmlhYmxlTmFtZSA9IFwiW2EtekEtWl9dW2EtekEtWjAtOV9dKlwiO1xuICAgIHZhciB2YXJpYWJsZSA9IFwiKD86XCIgKyB2YXJpYWJsZU5hbWUgKyBcIig/PT0pKVwiO1xuXG4gICAgdmFyIGJ1aWx0aW5WYXJpYWJsZSA9IFwiKD86XFxcXCQoPzpTSExWTHxcXFxcJHxcXFxcIXxcXFxcPykpXCI7XG5cbiAgICB2YXIgZnVuYyA9IFwiKD86XCIgKyB2YXJpYWJsZU5hbWUgKyBcIlxcXFxzKlxcXFwoXFxcXCkpXCI7XG5cbiAgICB0aGlzLiRydWxlcyA9IHtcbiAgICAgICAgXCJzdGFydFwiIDogW3tcbiAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudFwiLFxuICAgICAgICAgICAgcmVnZXggOiAvXFxcXC4vXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogW1widGV4dFwiLCBcImNvbW1lbnRcIl0sXG4gICAgICAgICAgICByZWdleCA6IC8oXnxcXHMpKCMuKikkL1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nLnN0YXJ0XCIsXG4gICAgICAgICAgICByZWdleCA6ICdcIicsXG4gICAgICAgICAgICBwdXNoIDogW3tcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvXFxcXCg/OlskYFwiXFxcXF18JCkvXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaW5jbHVkZSA6IFwidmFyaWFibGVzXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwia2V5d29yZC5vcGVyYXRvclwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogL2AvIC8vIFRPRE8gaGlnaGxpZ2h0IGBcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nLmVuZFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogJ1wiJyxcbiAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInN0cmluZ1wiXG4gICAgICAgICAgICB9XVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiXFxcXCQnXCIsXG4gICAgICAgICAgICBwdXNoIDogW3tcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvXFxcXCg/OlthYmVFZm5ydHZcXFxcJ1wiXXx4W2EtZkEtRlxcZF17MSwyfXx1W2EtZkEtRlxcZF17NH0oW2EtZkEtRlxcZF17NH0pP3xjLnxcXGR7MSwzfSkvXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCInXCIsXG4gICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzdHJpbmdcIlxuICAgICAgICAgICAgfV1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgcmVnZXggOiBcIjw8PFwiLFxuICAgICAgICAgICAgdG9rZW4gOiBcImtleXdvcmQub3BlcmF0b3JcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBzdGF0ZU5hbWU6IFwiaGVyZWRvY1wiLFxuICAgICAgICAgICAgcmVnZXggOiBcIig8PC0/KShcXFxccyopKFsnXFxcImBdPykoW1xcXFx3XFxcXC1dKykoWydcXFwiYF0/KVwiLFxuICAgICAgICAgICAgb25NYXRjaCA6IGZ1bmN0aW9uKHZhbHVlLCBjdXJyZW50U3RhdGUsIHN0YWNrKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5leHQgPSB2YWx1ZVsyXSA9PSAnLScgPyBcImluZGVudGVkSGVyZWRvY1wiIDogXCJoZXJlZG9jXCI7XG4gICAgICAgICAgICAgICAgdmFyIHRva2VucyA9IHZhbHVlLnNwbGl0KHRoaXMuc3BsaXRSZWdleCk7XG4gICAgICAgICAgICAgICAgc3RhY2sucHVzaChuZXh0LCB0b2tlbnNbNF0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgICAgIHt0eXBlOlwiY29uc3RhbnRcIiwgdmFsdWU6IHRva2Vuc1sxXX0sXG4gICAgICAgICAgICAgICAgICAgIHt0eXBlOlwidGV4dFwiLCB2YWx1ZTogdG9rZW5zWzJdfSxcbiAgICAgICAgICAgICAgICAgICAge3R5cGU6XCJzdHJpbmdcIiwgdmFsdWU6IHRva2Vuc1szXX0sXG4gICAgICAgICAgICAgICAgICAgIHt0eXBlOlwic3VwcG9ydC5jbGFzc1wiLCB2YWx1ZTogdG9rZW5zWzRdfSxcbiAgICAgICAgICAgICAgICAgICAge3R5cGU6XCJzdHJpbmdcIiwgdmFsdWU6IHRva2Vuc1s1XX1cbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJ1bGVzOiB7XG4gICAgICAgICAgICAgICAgaGVyZWRvYzogW3tcbiAgICAgICAgICAgICAgICAgICAgb25NYXRjaDogIGZ1bmN0aW9uKHZhbHVlLCBjdXJyZW50U3RhdGUsIHN0YWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IHN0YWNrWzFdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhY2suc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFjay5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dCA9IHN0YWNrWzBdIHx8IFwic3RhcnRcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJzdXBwb3J0LmNsYXNzXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHQgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwic3RyaW5nXCI7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4OiBcIi4qJFwiLFxuICAgICAgICAgICAgICAgICAgICBuZXh0OiBcInN0YXJ0XCJcbiAgICAgICAgICAgICAgICB9XSxcbiAgICAgICAgICAgICAgICBpbmRlbnRlZEhlcmVkb2M6IFt7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICByZWdleDogXCJeXFx0K1wiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBvbk1hdGNoOiAgZnVuY3Rpb24odmFsdWUsIGN1cnJlbnRTdGF0ZSwgc3RhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gc3RhY2tbMV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFjay5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWNrLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0ID0gc3RhY2tbMF0gfHwgXCJzdGFydFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcInN1cHBvcnQuY2xhc3NcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJzdHJpbmdcIjtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgcmVnZXg6IFwiLiokXCIsXG4gICAgICAgICAgICAgICAgICAgIG5leHQ6IFwic3RhcnRcIlxuICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHJlZ2V4IDogXCIkXCIsXG4gICAgICAgICAgICB0b2tlbiA6IFwiZW1wdHlcIixcbiAgICAgICAgICAgIG5leHQgOiBmdW5jdGlvbihjdXJyZW50U3RhdGUsIHN0YWNrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN0YWNrWzBdID09PSBcImhlcmVkb2NcIiB8fCBzdGFja1swXSA9PT0gXCJpbmRlbnRlZEhlcmVkb2NcIilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0YWNrWzBdO1xuICAgICAgICAgICAgICAgIHJldHVybiBjdXJyZW50U3RhdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogW1wia2V5d29yZFwiLCBcInRleHRcIiwgXCJ0ZXh0XCIsIFwidGV4dFwiLCBcInZhcmlhYmxlXCJdLFxuICAgICAgICAgICAgcmVnZXggOiAvKGRlY2xhcmV8bG9jYWx8cmVhZG9ubHkpKFxccyspKD86KC1bZml4YXJdKykoXFxzKykpPyhbYS16QS1aX11bYS16QS1aMC05X10qXFxiKS9cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInZhcmlhYmxlLmxhbmd1YWdlXCIsXG4gICAgICAgICAgICByZWdleCA6IGJ1aWx0aW5WYXJpYWJsZVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwidmFyaWFibGVcIixcbiAgICAgICAgICAgIHJlZ2V4IDogdmFyaWFibGVcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaW5jbHVkZSA6IFwidmFyaWFibGVzXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInN1cHBvcnQuZnVuY3Rpb25cIixcbiAgICAgICAgICAgIHJlZ2V4IDogZnVuY1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwic3VwcG9ydC5mdW5jdGlvblwiLFxuICAgICAgICAgICAgcmVnZXggOiBmaWxlRGVzY3JpcHRvclxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsICAgICAgICAgICAvLyAnIHN0cmluZ1xuICAgICAgICAgICAgc3RhcnQgOiBcIidcIiwgZW5kIDogXCInXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIiwgLy8gZmxvYXRcbiAgICAgICAgICAgIHJlZ2V4IDogZmxvYXROdW1iZXJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIiwgLy8gaW50ZWdlclxuICAgICAgICAgICAgcmVnZXggOiBpbnRlZ2VyICsgXCJcXFxcYlwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDoga2V5d29yZE1hcHBlcixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJbYS16QS1aX11bYS16QS1aMC05X10qXFxcXGJcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwia2V5d29yZC5vcGVyYXRvclwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwrfFxcXFwtfFxcXFwqfFxcXFwqXFxcXCp8XFxcXC98XFxcXC9cXFxcL3x+fDx8Pnw8PXw9Pnw9fCE9fFslJnxgXVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJwdW5jdHVhdGlvbi5vcGVyYXRvclwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIjtcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwicGFyZW4ubHBhcmVuXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiW1xcXFxbXFxcXChcXFxce11cIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwicGFyZW4ucnBhcmVuXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiW1xcXFxdXVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJwYXJlbi5ycGFyZW5cIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJbXFxcXClcXFxcfV1cIixcbiAgICAgICAgICAgIG5leHQgOiBcInBvcFwiXG4gICAgICAgIH1dLFxuICAgICAgICB2YXJpYWJsZXM6IFt7XG4gICAgICAgICAgICB0b2tlbiA6IFwidmFyaWFibGVcIixcbiAgICAgICAgICAgIHJlZ2V4IDogLyhcXCQpKFxcdyspL1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFtcInZhcmlhYmxlXCIsIFwicGFyZW4ubHBhcmVuXCJdLFxuICAgICAgICAgICAgcmVnZXggOiAvKFxcJCkoXFwoKS8sXG4gICAgICAgICAgICBwdXNoIDogXCJzdGFydFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogW1widmFyaWFibGVcIiwgXCJwYXJlbi5scGFyZW5cIiwgXCJrZXl3b3JkLm9wZXJhdG9yXCIsIFwidmFyaWFibGVcIiwgXCJrZXl3b3JkLm9wZXJhdG9yXCJdLFxuICAgICAgICAgICAgcmVnZXggOiAvKFxcJCkoXFx7KShbIyFdPykoXFx3K3xbKkAjP1xcLSQhMF9dKSg6Wz8rXFwtPV0/fCMjP3wlJT98LCw/XFwvfFxcXlxcXj8pPy8sXG4gICAgICAgICAgICBwdXNoIDogXCJzdGFydFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJ2YXJpYWJsZVwiLFxuICAgICAgICAgICAgcmVnZXggOiAvXFwkWypAIz9cXC0kITBfXS9cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBbXCJ2YXJpYWJsZVwiLCBcInBhcmVuLmxwYXJlblwiXSxcbiAgICAgICAgICAgIHJlZ2V4IDogLyhcXCQpKFxceykvLFxuICAgICAgICAgICAgcHVzaCA6IFwic3RhcnRcIlxuICAgICAgICB9XVxuICAgIH07XG4gICAgXG4gICAgdGhpcy5ub3JtYWxpemVSdWxlcygpO1xufTtcblxub29wLmluaGVyaXRzKFNoSGlnaGxpZ2h0UnVsZXMsIFRleHRIaWdobGlnaHRSdWxlcyk7XG5cbmV4cG9ydHMuU2hIaWdobGlnaHRSdWxlcyA9IFNoSGlnaGxpZ2h0UnVsZXM7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=