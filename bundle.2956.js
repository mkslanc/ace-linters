"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[2956],{

/***/ 88302:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var BaseFoldMode = (__webpack_require__(51358).FoldMode);
var Range = (__webpack_require__(91902)/* .Range */ .Q);
var TokenIterator = (__webpack_require__(99339).TokenIterator);


var FoldMode = exports.l = function() {};

oop.inherits(FoldMode, BaseFoldMode);

(function() {
    this.indentKeywords = {
        "class": 1,
        "function": 1,
        "sub": 1,
        "if": 1,
        "select": 1,
        "do": 1,
        "for": 1,
        "while": 1,
        "with": 1,
        "property": 1,
        "else": 1,
        "elseif": 1,
        "end": -1,
        "loop": -1,
        "next": -1,
        "wend": -1
    };

    this.foldingStartMarker = /(?:\s|^)(class|function|sub|if|select|do|for|while|with|property|else|elseif)\b/i;
    this.foldingStopMarker = /\b(end|loop|next|wend)\b/i;

    this.getFoldWidgetRange = function (session, foldStyle, row) {
        var line = session.getLine(row);
        var isStart = this.foldingStartMarker.test(line);
        var isEnd = this.foldingStopMarker.test(line);
        if (isStart || isEnd) {
            var match = (isEnd) ? this.foldingStopMarker.exec(line) : this.foldingStartMarker.exec(line);
            var keyword = match && match[1].toLowerCase();
            if (keyword) {
                var type = session.getTokenAt(row, match.index + 2).type;
                if (type === "keyword.control.asp" || type === "storage.type.function.asp")
                    return this.vbsBlock(session, row, match.index + 2);
            }
        }
    };


    // must return "" if there's no fold, to enable caching
    this.getFoldWidget = function(session, foldStyle, row) {
        var line = session.getLine(row);
        var isStart = this.foldingStartMarker.test(line);
        var isEnd = this.foldingStopMarker.test(line);
        if (isStart && !isEnd) {
            var match = this.foldingStartMarker.exec(line);
            var keyword = match && match[1].toLowerCase();
            if (keyword) {
                var type = session.getTokenAt(row, match.index + 2).type;
                if (type == "keyword.control.asp" || type == "storage.type.function.asp") {
                    if (keyword == "if" && !/then\s*('|$)/i.test(line))
                        return "";
                    return "start";
                }
            }
        }
        return "";
    };

    this.vbsBlock = function(session, row, column, tokenRange) {
        var stream = new TokenIterator(session, row, column);

        var endOpenings = {
            "class": 1,
            "function": 1,
            "sub": 1,
            "if": 1,
            "select": 1,
            "with": 1,
            "property": 1,
            "else": 1,
            "elseif": 1
        };

        var token = stream.getCurrentToken();
        if (!token || (token.type != "keyword.control.asp" && token.type != "storage.type.function.asp"))
            return;

        var startTokenValue = token.value.toLowerCase();
        var val = token.value.toLowerCase();

        var stack = [val];
        var dir = this.indentKeywords[val];

        if (!dir)
            return;

        var firstRange = stream.getCurrentTokenRange();
        switch (val) {
            case "property":
            case "sub":
            case "function":
            case "if":
            case "select":
            case "do":
            case "for":
            case "class":
            case "while":
            case "with":
                var line = session.getLine(row);
                var singleLineCondition = /^\s*If\s+.*\s+Then(?!')\s+(?!')\S/i.test(line);
                if (singleLineCondition)
                    return;
                var checkToken = new RegExp("(?:^|\\s)" + val, "i");
                var endTest = /^\s*End\s(If|Sub|Select|Function|Class|With|Property)\s*/i.test(line);
                if (!checkToken.test(line) && !endTest) {
                    return;
                }
                if (endTest) {
                    var tokenRange = stream.getCurrentTokenRange();
                    stream.step = stream.stepBackward;
                    stream.step();
                    stream.step();
                    token = stream.getCurrentToken();
                    if (token) {
                        val = token.value.toLowerCase();
                        if (val == "end") {
                            firstRange = stream.getCurrentTokenRange();
                            firstRange = new Range(firstRange.start.row, firstRange.start.column, tokenRange.start.row, tokenRange.end.column);
                        }
                    }
                    dir = -1;
                }
                break;
            case "end":
                var tokenPos = stream.getCurrentTokenPosition();
                firstRange = stream.getCurrentTokenRange();
                stream.step = stream.stepForward;
                stream.step();
                stream.step();
                token = stream.getCurrentToken();
                if (token) {
                    val = token.value.toLowerCase();
                    if (val in endOpenings) {
                        startTokenValue = val;
                        var nextTokenPos = stream.getCurrentTokenPosition();
                        var endColumn = nextTokenPos.column + val.length;
                        firstRange = new Range(tokenPos.row, tokenPos.column, nextTokenPos.row, endColumn);
                    }
                }
                stream.step = stream.stepBackward;
                stream.step();
                stream.step();
                break;
        }
        var startColumn = dir === -1 ? session.getLine(row - 1).length : session.getLine(row).length;
        var startRow = row;
        var ranges = [];
        ranges.push(firstRange);

        stream.step = dir === -1 ? stream.stepBackward : stream.stepForward;
        while(token = stream.step()) {
            var outputRange = null;
            var ignore = false;
            if (token.type != "keyword.control.asp" && token.type != "storage.type.function.asp")
                continue;
            val = token.value.toLowerCase();
            var level = dir * this.indentKeywords[val];

            switch (val) {
                case "property":
                case "sub":
                case "function":
                case "if":
                case "select":
                case "do":
                case "for":
                case "class":
                case "while":
                case "with":
                    var line = session.getLine(stream.getCurrentTokenRow());
                    var singleLineCondition = /^\s*If\s+.*\s+Then(?!')\s+(?!')\S/i.test(line);
                    if (singleLineCondition) {
                        level = 0;
                        ignore = true;
                    }
                    var checkToken = new RegExp("^\\s* end\\s+" + val, "i");
                    if (checkToken.test(line)) {
                        level = 0;
                        ignore = true;
                    }
                    break;
                case "elseif":
                case "else":
                    level = 0;
                    if (startTokenValue != "elseif") {
                        ignore = true;
                    }
                    break;
            }

            if (level > 0) {
                stack.unshift(val);
            } else if (level <= 0 && ignore === false) {
                stack.shift();
                if (!stack.length) {
                        switch (val) {
                            case "end":
                                var tokenPos = stream.getCurrentTokenPosition();
                                outputRange = stream.getCurrentTokenRange();
                                stream.step();
                                stream.step();
                                token = stream.getCurrentToken();
                                if (token) {
                                    val = token.value.toLowerCase();
                                    if (val in endOpenings) {
                                        if ((startTokenValue == "else" || startTokenValue == "elseif")) {
                                            if (val !== "if") {
                                                ranges.shift();
                                            }
                                        } else {
                                            if (val != startTokenValue)
                                                ranges.shift();
                                        }
                                        var nextTokenPos = stream.getCurrentTokenPosition();
                                        var endColumn = nextTokenPos.column + val.length;
                                        outputRange = new Range(tokenPos.row, tokenPos.column, nextTokenPos.row, endColumn);
                                    } else {
                                        ranges.shift();
                                    }
                                } else {
                                    ranges.shift();
                                }
                                stream.step = stream.stepBackward;
                                stream.step();
                                stream.step();
                                token = stream.getCurrentToken();
                                val = token.value.toLowerCase();
                                break;
                            case "select":
                            case "sub":
                            case "if":
                            case "function":
                            case "class":
                            case "with":
                            case "property":
                                if (val != startTokenValue)
                                    ranges.shift();
                                break;
                            case "do":
                                if (startTokenValue != "loop")
                                    ranges.shift();
                                break;
                            case "loop":
                                if (startTokenValue != "do")
                                    ranges.shift();
                                break;
                            case "for":
                                if (startTokenValue != "next")
                                    ranges.shift();
                                break;
                            case "next":
                                if (startTokenValue != "for")
                                    ranges.shift();
                                break;
                            case "while":
                                if (startTokenValue != "wend")
                                    ranges.shift();
                                break;
                            case "wend":
                                if (startTokenValue != "while")
                                    ranges.shift();
                                break;
                        }
                        break;
                }

                if (level === 0){
                    stack.unshift(val);
                }
            }
        }

        if (!token)
            return null;

        if (tokenRange) {
            if (!outputRange) {
                ranges.push(stream.getCurrentTokenRange());
            } else {
                ranges.push(outputRange);
            }
            return ranges;
        }

        var row = stream.getCurrentTokenRow();
        if (dir === -1) {
            var endColumn = session.getLine(row).length;
            return new Range(row, endColumn, startRow - 1, startColumn);
        } else
            return new Range(startRow, startColumn, row - 1, session.getLine(row - 1).length);
    };

}).call(FoldMode.prototype);


/***/ }),

/***/ 92956:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/*
  THIS FILE WAS AUTOGENERATED BY mode.tmpl.js
*/



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var VBScriptHighlightRules = (__webpack_require__(16943)/* .VBScriptHighlightRules */ .Z);
var FoldMode = (__webpack_require__(88302)/* .FoldMode */ .l);
var Range = (__webpack_require__(91902)/* .Range */ .Q);

var Mode = function() {
    this.HighlightRules = VBScriptHighlightRules;
    this.foldingRules = new FoldMode();
    this.$behaviour = this.$defaultBehaviour;
    this.indentKeywords = this.foldingRules.indentKeywords;
};
oop.inherits(Mode, TextMode);

(function() {

    this.lineCommentStart = ["'", "REM"];

    var outdentKeywords = [
        "else",
        "elseif",
        "end",
        "loop",
        "next",
        "wend"
    ];

    function getNetIndentLevel(tokens, line, indentKeywords) {
        var level = 0;
        // Support single-line blocks by decrementing the indent level if
        // an ending token is found
        for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            if (token.type == "keyword.control.asp" || token.type == "storage.type.function.asp") {
                var val = token.value.toLowerCase();
                if (val in indentKeywords) {
                    switch (val) {
                        case "property":
                        case "sub":
                        case "function":
                        case "select":
                        case "do":
                        case "for":
                        case "class":
                        case "while":
                        case "with":
                        case "if":
                            var checkToken = new RegExp("^\\s* end\\s+" + val, "i");
                            var singleLineCondition = /^\s*If\s+.*\s+Then(?!')\s+(?!')\S/i.test(line);
                            if (!singleLineCondition && !checkToken.test(line))
                                level += indentKeywords[val];
                            break;
                        default:
                            level += indentKeywords[val];
                            break;
                    }
                }
            }
        }
        // Limit the level to +/- 1 since usually users only indent one level
        // at a time regardless of the logical nesting level
        if (level < 0) {
            return -1;
        } else if (level > 0) {
            return 1;
        } else {
            return 0;
        }
    }

    this.getNextLineIndent = function(state, line, tab) {
        var indent = this.$getIndent(line);
        var level = 0;

        var tokenizedLine = this.getTokenizer().getLineTokens(line, state);
        var tokens = tokenizedLine.tokens;

        if (state == "start") {
            level = getNetIndentLevel(tokens, line, this.indentKeywords);
        }
        if (level > 0) {
            return indent + tab;
        } else if (level < 0 && indent.substr(indent.length - tab.length) == tab) {
            // Don't do a next-line outdent if we're going to do a real outdent of this line
            if (!this.checkOutdent(state, line, "\n")) {
                return indent.substr(0, indent.length - tab.length);
            }
        }
        return indent;
    };

    this.checkOutdent = function(state, line, input) {
        if (input != "\n" && input != "\r" && input != "\r\n")
            return false;

        var tokens = this.getTokenizer().getLineTokens(line.trim(), state).tokens;

        if (!tokens || !tokens.length)
            return false;
        var val = tokens[0].value.toLowerCase();
        return ((tokens[0].type == "keyword.control.asp" || tokens[0].type == "storage.type.function.asp") && outdentKeywords.indexOf(val) != -1);
    };

    this.getMatching = function(session, row, column, tokenRange) {
        if (row == undefined) {
            var pos = session.selection.lead;
            column = pos.column;
            row = pos.row;
        }
        if (tokenRange == undefined)
            tokenRange = true;

        var startToken = session.getTokenAt(row, column);
        if (startToken) {
            var val = startToken.value.toLowerCase();
            if (val in this.indentKeywords)
                return this.foldingRules.vbsBlock(session, row, column, tokenRange);
        }
    };

    this.autoOutdent = function(state, session, row) {
        var line = session.getLine(row);
        var column = line.match(/^\s*/)[0].length;
        if (!column || !row) return;

        var startRange = this.getMatching(session, row, column + 1, false);
        if (!startRange || startRange.start.row == row)
            return;
        var indent = this.$getIndent(session.getLine(startRange.start.row));
        if (indent.length != column) {
            session.replace(new Range(row, 0, row, column), indent);
            session.outdentRows(new Range(row + 1, 0, row + 1, 0));
        }
    };

    this.$id = "ace/mode/vbscript";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 16943:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/*
  THIS FILE WAS AUTOGENERATED BY mode_highlight_rules.tmpl.js (UUID: 7F9C9343-D48E-4E7D-BFE8-F680714DCD3E) */



var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

var VBScriptHighlightRules = function() {

    var keywordMapper = this.createKeywordMapper({
        "keyword.control.asp":  "If|Then|Else|ElseIf|End|While|Wend|For|To|Each|Case|Select|Return"
            + "|Continue|Do|Until|Loop|Next|With|Exit|Function|Property|Type|Enum|Sub|IIf|Class",
        "storage.type.asp": "Dim|Call|Const|Redim|Set|Let|Get|New|Randomize|Option|Explicit|Preserve|Erase|Execute|ExecuteGlobal",
        "storage.modifier.asp": "Private|Public|Default",
        "keyword.operator.asp": "Mod|And|Not|Or|Xor|As|Eqv|Imp|Is",
        "constant.language.asp": "Empty|False|Nothing|Null|True",
        "variable.language.vb.asp": "Me",
        "support.class.vb.asp": "RegExp",
        "support.class.asp": "Application|ObjectContext|Request|Response|Server|Session",
        "support.class.collection.asp": "Contents|StaticObjects|ClientCertificate|Cookies|Form|QueryString|ServerVariables",
        "support.constant.asp": "TotalBytes|Buffer|CacheControl|Charset|ContentType|Expires|ExpiresAbsolute"
            + "|IsClientConnected|PICS|Status|ScriptTimeout|CodePage|LCID|SessionID|Timeout",
        "support.function.asp": "Lock|Unlock|SetAbort|SetComplete|BinaryRead|AddHeader|AppendToLog"
            + "|BinaryWrite|Clear|Flush|Redirect|Write|CreateObject|HTMLEncode|MapPath|URLEncode|Abandon|Convert|Regex",
        "support.function.event.asp": "Application_OnEnd|Application_OnStart"
            + "|OnTransactionAbort|OnTransactionCommit|Session_OnEnd|Session_OnStart",
        "support.function.vb.asp": "Array|Add|Asc|Atn|CBool|CByte|CCur|CDate|CDbl|Chr|CInt|CLng"
            + "|Conversions|Cos|CreateObject|CSng|CStr|Date|DateAdd|DateDiff|DatePart|DateSerial"
            + "|DateValue|Day|Derived|Math|Escape|Eval|Exists|Exp|Filter|FormatCurrency"
            + "|FormatDateTime|FormatNumber|FormatPercent|GetLocale|GetObject|GetRef|Hex"
            + "|Hour|InputBox|InStr|InStrRev|Int|Fix|IsArray|IsDate|IsEmpty|IsNull|IsNumeric"
            + "|IsObject|Item|Items|Join|Keys|LBound|LCase|Left|Len|LoadPicture|Log|LTrim|RTrim"
            + "|Trim|Maths|Mid|Minute|Month|MonthName|MsgBox|Now|Oct|Remove|RemoveAll|Replace"
            + "|RGB|Right|Rnd|Round|ScriptEngine|ScriptEngineBuildVersion|ScriptEngineMajorVersion"
            + "|ScriptEngineMinorVersion|Second|SetLocale|Sgn|Sin|Space|Split|Sqr|StrComp|String|StrReverse"
            + "|Tan|Time|Timer|TimeSerial|TimeValue|TypeName|UBound|UCase|Unescape|VarType|Weekday|WeekdayName|Year"
            + "|AscB|AscW|ChrB|ChrW|InStrB|LeftB|LenB|MidB|RightB|Abs|GetUILanguage",
        "support.type.vb.asp": "vbTrue|vbFalse|vbCr|vbCrLf|vbFormFeed|vbLf|vbNewLine|vbNullChar|vbNullString"
            + "|vbTab|vbVerticalTab|vbBinaryCompare|vbTextCompare|vbSunday|vbMonday|vbTuesday|vbWednesday"
            + "|vbThursday|vbFriday|vbSaturday|vbUseSystemDayOfWeek|vbFirstJan1|vbFirstFourDays|vbFirstFullWeek"
            + "|vbGeneralDate|vbLongDate|vbShortDate|vbLongTime|vbShortTime|vbObjectError|vbEmpty|vbNull|vbInteger"
            + "|vbLong|vbSingle|vbDouble|vbCurrency|vbDate|vbString|vbObject|vbError|vbBoolean|vbVariant"
            + "|vbDataObject|vbDecimal|vbByte|vbArray|vbOKOnly|vbOKCancel|vbAbortRetryIgnore|vbYesNoCancel|vbYesNo"
            + "|vbRetryCancel|vbCritical|vbQuestion|vbExclamation|vbInformation|vbDefaultButton1|vbDefaultButton2"
            + "|vbDefaultButton3|vbDefaultButton4|vbApplicationModal|vbSystemModal|vbOK|vbCancel|vbAbort|vbRetry|vbIgnore|vbYes|vbNo"
            + "|vbUseDefault"
    }, "identifier", true);

    this.$rules = {
    "start": [
        {
            token: [
                "meta.ending-space"
            ],
            regex: "$"
        },
        {
            token: [null],
            regex: "^(?=\\t)",
            next: "state_3"
        },
        {
            token: [null],
            regex: "^(?= )",
            next: "state_4"
        },
        {
            token: [
                "text",
                "storage.type.function.asp",
                "text",
                "entity.name.function.asp",
                "text",
                "punctuation.definition.parameters.asp",
                "variable.parameter.function.asp",
                "punctuation.definition.parameters.asp"
            ],
            regex: "^(\\s*)(Function|Sub)(\\s+)([a-zA-Z_]\\w*)(\\s*)(\\()([^)]*)(\\))"
        },
        {
            token: "punctuation.definition.comment.asp",
            regex: "'|REM(?=\\s|$)",
            next: "comment",
            caseInsensitive: true
        },
        {
            token: "storage.type.asp",
            regex: "On\\s+Error\\s+(?:Resume\\s+Next|GoTo)\\b",
            caseInsensitive: true
        },
        {
            token: "punctuation.definition.string.begin.asp",
            regex: '"',
            next: "string"
        },
        {
            token: [
                "punctuation.definition.variable.asp"
            ],
            regex: "(\\$)[a-zA-Z_x7f-xff][a-zA-Z0-9_x7f-xff]*?\\b\\s*"
        },
//        {
//            token: [
//                "support.type.vb.asp"
//            ],
//            regex: "(?:(?<=as )(\\b[a-zA-Z_x7f-xff][a-zA-Z0-9_x7f-xff]*?\\b))", // ERROR: This contains a lookbehind, which JS does not support :("
//        },
        {
            token: "constant.numeric.asp",
            regex: "-?\\b(?:(?:0(?:x|X)[0-9a-fA-F]*)|(?:(?:[0-9]+\\.?[0-9]*)|(?:\\.[0-9]+))(?:(?:e|E)(?:\\+|-)?[0-9]+)?)(?:L|l|UL|ul|u|U|F|f)?\\b"
        },
        {
            regex: "\\w+",
            token: keywordMapper
        },
        {
            token: ["entity.name.function.asp"],
            regex: "(?:(\\b[a-zA-Z_x7f-xff][a-zA-Z0-9_x7f-xff]*?\\b)(?=\\(\\)?))"
        },
//        {
//            token: [
//                "variable.other.asp"
//            ],
//            regex: "(?:((?<=(\\+|=|-|\\&|\\\\|/|<|>|\\(|,))\\s*\\b([a-zA-Z_x7f-xff][a-zA-Z0-9_x7f-xff]*?)\\b(?!(\\(|\\.))|\\b([a-zA-Z_x7f-xff][a-zA-Z0-9_x7f-xff]*?)\\b(?=\\s*(\\+|=|-|\\&|\\\\|/|<|>|\\(|\\)))))", // ERROR: This contains a lookbehind, which JS does not support :("
//        },
        {
            token: ["keyword.operator.asp"],
            regex: "\\-|\\+|\\*|\\/|\\>|\\<|\\=|\\&|\\\\|\\^"
        }
    ],
    "state_3": [
        {
            token: [
                "meta.odd-tab.tabs",
                "meta.even-tab.tabs"
            ],
            regex: "(\\t)(\\t)?"
        },
        {
            token: "meta.leading-space",
            regex: "(?=[^\\t])",
            next: "start"
        },
        {
            token: "meta.leading-space",
            regex: ".",
            next: "state_3"
        }
    ],
    "state_4": [
        {
            token: ["meta.odd-tab.spaces", "meta.even-tab.spaces"],
            regex: "(  )(  )?"
        },
        {
            token: "meta.leading-space",
            regex: "(?=[^ ])",
            next: "start"
        },
        {
            defaultToken: "meta.leading-space"
        }
    ],
    "comment": [
        {
            token: "comment.line.apostrophe.asp",
            regex: "$",
            next: "start"
        },
        {
            defaultToken: "comment.line.apostrophe.asp"
        }
    ],
    "string": [
        {
            token: "constant.character.escape.apostrophe.asp",
            regex: '""'
        },
        {
            token: "string.quoted.double.asp",
            regex: '"',
            next: "start"
        },
        {
            defaultToken: "string.quoted.double.asp"
        }
    ]
};

};

oop.inherits(VBScriptHighlightRules, TextHighlightRules);

exports.Z = VBScriptHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjI5NTYuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLElBQWU7QUFDakMsbUJBQW1CLHFDQUErQjtBQUNsRCxZQUFZLDJDQUE0QjtBQUN4QyxvQkFBb0IsMENBQTZDOzs7QUFHakUsZUFBZSxTQUFnQjs7QUFFL0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQztBQUN0QztBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7O0FBRUEsQ0FBQzs7Ozs7Ozs7QUNqVEQ7QUFDQTtBQUNBOztBQUVhOztBQUViLFVBQVUsbUJBQU8sQ0FBQyxJQUFZO0FBQzlCLGVBQWUsaUNBQXNCO0FBQ3JDLDZCQUE2Qiw0REFBNEQ7QUFDekYsZUFBZSw4Q0FBc0M7QUFDckQsWUFBWSwyQ0FBeUI7O0FBRXJDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsbUJBQW1CO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRCxZQUFZOzs7Ozs7OztBQ2hKWjtBQUNBOztBQUVhOztBQUViLFVBQVUsbUJBQU8sQ0FBQyxJQUFZO0FBQzlCLHlCQUF5Qix3REFBb0Q7O0FBRTdFOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxTQUE4QiIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvZm9sZGluZy92YnNjcmlwdC5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL3Zic2NyaXB0LmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvdmJzY3JpcHRfaGlnaGxpZ2h0X3J1bGVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uLy4uL2xpYi9vb3BcIik7XG52YXIgQmFzZUZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZF9tb2RlXCIpLkZvbGRNb2RlO1xudmFyIFJhbmdlID0gcmVxdWlyZShcIi4uLy4uL3JhbmdlXCIpLlJhbmdlO1xudmFyIFRva2VuSXRlcmF0b3IgPSByZXF1aXJlKFwiLi4vLi4vdG9rZW5faXRlcmF0b3JcIikuVG9rZW5JdGVyYXRvcjtcblxuXG52YXIgRm9sZE1vZGUgPSBleHBvcnRzLkZvbGRNb2RlID0gZnVuY3Rpb24oKSB7fTtcblxub29wLmluaGVyaXRzKEZvbGRNb2RlLCBCYXNlRm9sZE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5pbmRlbnRLZXl3b3JkcyA9IHtcbiAgICAgICAgXCJjbGFzc1wiOiAxLFxuICAgICAgICBcImZ1bmN0aW9uXCI6IDEsXG4gICAgICAgIFwic3ViXCI6IDEsXG4gICAgICAgIFwiaWZcIjogMSxcbiAgICAgICAgXCJzZWxlY3RcIjogMSxcbiAgICAgICAgXCJkb1wiOiAxLFxuICAgICAgICBcImZvclwiOiAxLFxuICAgICAgICBcIndoaWxlXCI6IDEsXG4gICAgICAgIFwid2l0aFwiOiAxLFxuICAgICAgICBcInByb3BlcnR5XCI6IDEsXG4gICAgICAgIFwiZWxzZVwiOiAxLFxuICAgICAgICBcImVsc2VpZlwiOiAxLFxuICAgICAgICBcImVuZFwiOiAtMSxcbiAgICAgICAgXCJsb29wXCI6IC0xLFxuICAgICAgICBcIm5leHRcIjogLTEsXG4gICAgICAgIFwid2VuZFwiOiAtMVxuICAgIH07XG5cbiAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlciA9IC8oPzpcXHN8XikoY2xhc3N8ZnVuY3Rpb258c3VifGlmfHNlbGVjdHxkb3xmb3J8d2hpbGV8d2l0aHxwcm9wZXJ0eXxlbHNlfGVsc2VpZilcXGIvaTtcbiAgICB0aGlzLmZvbGRpbmdTdG9wTWFya2VyID0gL1xcYihlbmR8bG9vcHxuZXh0fHdlbmQpXFxiL2k7XG5cbiAgICB0aGlzLmdldEZvbGRXaWRnZXRSYW5nZSA9IGZ1bmN0aW9uIChzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdykge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICB2YXIgaXNTdGFydCA9IHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyLnRlc3QobGluZSk7XG4gICAgICAgIHZhciBpc0VuZCA9IHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIudGVzdChsaW5lKTtcbiAgICAgICAgaWYgKGlzU3RhcnQgfHwgaXNFbmQpIHtcbiAgICAgICAgICAgIHZhciBtYXRjaCA9IChpc0VuZCkgPyB0aGlzLmZvbGRpbmdTdG9wTWFya2VyLmV4ZWMobGluZSkgOiB0aGlzLmZvbGRpbmdTdGFydE1hcmtlci5leGVjKGxpbmUpO1xuICAgICAgICAgICAgdmFyIGtleXdvcmQgPSBtYXRjaCAmJiBtYXRjaFsxXS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgaWYgKGtleXdvcmQpIHtcbiAgICAgICAgICAgICAgICB2YXIgdHlwZSA9IHNlc3Npb24uZ2V0VG9rZW5BdChyb3csIG1hdGNoLmluZGV4ICsgMikudHlwZTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gXCJrZXl3b3JkLmNvbnRyb2wuYXNwXCIgfHwgdHlwZSA9PT0gXCJzdG9yYWdlLnR5cGUuZnVuY3Rpb24uYXNwXCIpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnZic0Jsb2NrKHNlc3Npb24sIHJvdywgbWF0Y2guaW5kZXggKyAyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cblxuICAgIC8vIG11c3QgcmV0dXJuIFwiXCIgaWYgdGhlcmUncyBubyBmb2xkLCB0byBlbmFibGUgY2FjaGluZ1xuICAgIHRoaXMuZ2V0Rm9sZFdpZGdldCA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgIHZhciBpc1N0YXJ0ID0gdGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIudGVzdChsaW5lKTtcbiAgICAgICAgdmFyIGlzRW5kID0gdGhpcy5mb2xkaW5nU3RvcE1hcmtlci50ZXN0KGxpbmUpO1xuICAgICAgICBpZiAoaXNTdGFydCAmJiAhaXNFbmQpIHtcbiAgICAgICAgICAgIHZhciBtYXRjaCA9IHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyLmV4ZWMobGluZSk7XG4gICAgICAgICAgICB2YXIga2V5d29yZCA9IG1hdGNoICYmIG1hdGNoWzFdLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBpZiAoa2V5d29yZCkge1xuICAgICAgICAgICAgICAgIHZhciB0eXBlID0gc2Vzc2lvbi5nZXRUb2tlbkF0KHJvdywgbWF0Y2guaW5kZXggKyAyKS50eXBlO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlID09IFwia2V5d29yZC5jb250cm9sLmFzcFwiIHx8IHR5cGUgPT0gXCJzdG9yYWdlLnR5cGUuZnVuY3Rpb24uYXNwXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGtleXdvcmQgPT0gXCJpZlwiICYmICEvdGhlblxccyooJ3wkKS9pLnRlc3QobGluZSkpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwic3RhcnRcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfTtcblxuICAgIHRoaXMudmJzQmxvY2sgPSBmdW5jdGlvbihzZXNzaW9uLCByb3csIGNvbHVtbiwgdG9rZW5SYW5nZSkge1xuICAgICAgICB2YXIgc3RyZWFtID0gbmV3IFRva2VuSXRlcmF0b3Ioc2Vzc2lvbiwgcm93LCBjb2x1bW4pO1xuXG4gICAgICAgIHZhciBlbmRPcGVuaW5ncyA9IHtcbiAgICAgICAgICAgIFwiY2xhc3NcIjogMSxcbiAgICAgICAgICAgIFwiZnVuY3Rpb25cIjogMSxcbiAgICAgICAgICAgIFwic3ViXCI6IDEsXG4gICAgICAgICAgICBcImlmXCI6IDEsXG4gICAgICAgICAgICBcInNlbGVjdFwiOiAxLFxuICAgICAgICAgICAgXCJ3aXRoXCI6IDEsXG4gICAgICAgICAgICBcInByb3BlcnR5XCI6IDEsXG4gICAgICAgICAgICBcImVsc2VcIjogMSxcbiAgICAgICAgICAgIFwiZWxzZWlmXCI6IDFcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgdG9rZW4gPSBzdHJlYW0uZ2V0Q3VycmVudFRva2VuKCk7XG4gICAgICAgIGlmICghdG9rZW4gfHwgKHRva2VuLnR5cGUgIT0gXCJrZXl3b3JkLmNvbnRyb2wuYXNwXCIgJiYgdG9rZW4udHlwZSAhPSBcInN0b3JhZ2UudHlwZS5mdW5jdGlvbi5hc3BcIikpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdmFyIHN0YXJ0VG9rZW5WYWx1ZSA9IHRva2VuLnZhbHVlLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIHZhciB2YWwgPSB0b2tlbi52YWx1ZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIHZhciBzdGFjayA9IFt2YWxdO1xuICAgICAgICB2YXIgZGlyID0gdGhpcy5pbmRlbnRLZXl3b3Jkc1t2YWxdO1xuXG4gICAgICAgIGlmICghZGlyKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHZhciBmaXJzdFJhbmdlID0gc3RyZWFtLmdldEN1cnJlbnRUb2tlblJhbmdlKCk7XG4gICAgICAgIHN3aXRjaCAodmFsKSB7XG4gICAgICAgICAgICBjYXNlIFwicHJvcGVydHlcIjpcbiAgICAgICAgICAgIGNhc2UgXCJzdWJcIjpcbiAgICAgICAgICAgIGNhc2UgXCJmdW5jdGlvblwiOlxuICAgICAgICAgICAgY2FzZSBcImlmXCI6XG4gICAgICAgICAgICBjYXNlIFwic2VsZWN0XCI6XG4gICAgICAgICAgICBjYXNlIFwiZG9cIjpcbiAgICAgICAgICAgIGNhc2UgXCJmb3JcIjpcbiAgICAgICAgICAgIGNhc2UgXCJjbGFzc1wiOlxuICAgICAgICAgICAgY2FzZSBcIndoaWxlXCI6XG4gICAgICAgICAgICBjYXNlIFwid2l0aFwiOlxuICAgICAgICAgICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgICAgICAgICAgdmFyIHNpbmdsZUxpbmVDb25kaXRpb24gPSAvXlxccypJZlxccysuKlxccytUaGVuKD8hJylcXHMrKD8hJylcXFMvaS50ZXN0KGxpbmUpO1xuICAgICAgICAgICAgICAgIGlmIChzaW5nbGVMaW5lQ29uZGl0aW9uKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgdmFyIGNoZWNrVG9rZW4gPSBuZXcgUmVnRXhwKFwiKD86XnxcXFxccylcIiArIHZhbCwgXCJpXCIpO1xuICAgICAgICAgICAgICAgIHZhciBlbmRUZXN0ID0gL15cXHMqRW5kXFxzKElmfFN1YnxTZWxlY3R8RnVuY3Rpb258Q2xhc3N8V2l0aHxQcm9wZXJ0eSlcXHMqL2kudGVzdChsaW5lKTtcbiAgICAgICAgICAgICAgICBpZiAoIWNoZWNrVG9rZW4udGVzdChsaW5lKSAmJiAhZW5kVGVzdCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChlbmRUZXN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0b2tlblJhbmdlID0gc3RyZWFtLmdldEN1cnJlbnRUb2tlblJhbmdlKCk7XG4gICAgICAgICAgICAgICAgICAgIHN0cmVhbS5zdGVwID0gc3RyZWFtLnN0ZXBCYWNrd2FyZDtcbiAgICAgICAgICAgICAgICAgICAgc3RyZWFtLnN0ZXAoKTtcbiAgICAgICAgICAgICAgICAgICAgc3RyZWFtLnN0ZXAoKTtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gPSBzdHJlYW0uZ2V0Q3VycmVudFRva2VuKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0b2tlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsID0gdG9rZW4udmFsdWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWwgPT0gXCJlbmRcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0UmFuZ2UgPSBzdHJlYW0uZ2V0Q3VycmVudFRva2VuUmFuZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJzdFJhbmdlID0gbmV3IFJhbmdlKGZpcnN0UmFuZ2Uuc3RhcnQucm93LCBmaXJzdFJhbmdlLnN0YXJ0LmNvbHVtbiwgdG9rZW5SYW5nZS5zdGFydC5yb3csIHRva2VuUmFuZ2UuZW5kLmNvbHVtbik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZGlyID0gLTE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImVuZFwiOlxuICAgICAgICAgICAgICAgIHZhciB0b2tlblBvcyA9IHN0cmVhbS5nZXRDdXJyZW50VG9rZW5Qb3NpdGlvbigpO1xuICAgICAgICAgICAgICAgIGZpcnN0UmFuZ2UgPSBzdHJlYW0uZ2V0Q3VycmVudFRva2VuUmFuZ2UoKTtcbiAgICAgICAgICAgICAgICBzdHJlYW0uc3RlcCA9IHN0cmVhbS5zdGVwRm9yd2FyZDtcbiAgICAgICAgICAgICAgICBzdHJlYW0uc3RlcCgpO1xuICAgICAgICAgICAgICAgIHN0cmVhbS5zdGVwKCk7XG4gICAgICAgICAgICAgICAgdG9rZW4gPSBzdHJlYW0uZ2V0Q3VycmVudFRva2VuKCk7XG4gICAgICAgICAgICAgICAgaWYgKHRva2VuKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbCA9IHRva2VuLnZhbHVlLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWwgaW4gZW5kT3BlbmluZ3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0VG9rZW5WYWx1ZSA9IHZhbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXh0VG9rZW5Qb3MgPSBzdHJlYW0uZ2V0Q3VycmVudFRva2VuUG9zaXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlbmRDb2x1bW4gPSBuZXh0VG9rZW5Qb3MuY29sdW1uICsgdmFsLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0UmFuZ2UgPSBuZXcgUmFuZ2UodG9rZW5Qb3Mucm93LCB0b2tlblBvcy5jb2x1bW4sIG5leHRUb2tlblBvcy5yb3csIGVuZENvbHVtbik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc3RyZWFtLnN0ZXAgPSBzdHJlYW0uc3RlcEJhY2t3YXJkO1xuICAgICAgICAgICAgICAgIHN0cmVhbS5zdGVwKCk7XG4gICAgICAgICAgICAgICAgc3RyZWFtLnN0ZXAoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICB2YXIgc3RhcnRDb2x1bW4gPSBkaXIgPT09IC0xID8gc2Vzc2lvbi5nZXRMaW5lKHJvdyAtIDEpLmxlbmd0aCA6IHNlc3Npb24uZ2V0TGluZShyb3cpLmxlbmd0aDtcbiAgICAgICAgdmFyIHN0YXJ0Um93ID0gcm93O1xuICAgICAgICB2YXIgcmFuZ2VzID0gW107XG4gICAgICAgIHJhbmdlcy5wdXNoKGZpcnN0UmFuZ2UpO1xuXG4gICAgICAgIHN0cmVhbS5zdGVwID0gZGlyID09PSAtMSA/IHN0cmVhbS5zdGVwQmFja3dhcmQgOiBzdHJlYW0uc3RlcEZvcndhcmQ7XG4gICAgICAgIHdoaWxlKHRva2VuID0gc3RyZWFtLnN0ZXAoKSkge1xuICAgICAgICAgICAgdmFyIG91dHB1dFJhbmdlID0gbnVsbDtcbiAgICAgICAgICAgIHZhciBpZ25vcmUgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmICh0b2tlbi50eXBlICE9IFwia2V5d29yZC5jb250cm9sLmFzcFwiICYmIHRva2VuLnR5cGUgIT0gXCJzdG9yYWdlLnR5cGUuZnVuY3Rpb24uYXNwXCIpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB2YWwgPSB0b2tlbi52YWx1ZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgdmFyIGxldmVsID0gZGlyICogdGhpcy5pbmRlbnRLZXl3b3Jkc1t2YWxdO1xuXG4gICAgICAgICAgICBzd2l0Y2ggKHZhbCkge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJwcm9wZXJ0eVwiOlxuICAgICAgICAgICAgICAgIGNhc2UgXCJzdWJcIjpcbiAgICAgICAgICAgICAgICBjYXNlIFwiZnVuY3Rpb25cIjpcbiAgICAgICAgICAgICAgICBjYXNlIFwiaWZcIjpcbiAgICAgICAgICAgICAgICBjYXNlIFwic2VsZWN0XCI6XG4gICAgICAgICAgICAgICAgY2FzZSBcImRvXCI6XG4gICAgICAgICAgICAgICAgY2FzZSBcImZvclwiOlxuICAgICAgICAgICAgICAgIGNhc2UgXCJjbGFzc1wiOlxuICAgICAgICAgICAgICAgIGNhc2UgXCJ3aGlsZVwiOlxuICAgICAgICAgICAgICAgIGNhc2UgXCJ3aXRoXCI6XG4gICAgICAgICAgICAgICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHN0cmVhbS5nZXRDdXJyZW50VG9rZW5Sb3coKSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzaW5nbGVMaW5lQ29uZGl0aW9uID0gL15cXHMqSWZcXHMrLipcXHMrVGhlbig/IScpXFxzKyg/IScpXFxTL2kudGVzdChsaW5lKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNpbmdsZUxpbmVDb25kaXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldmVsID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlnbm9yZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdmFyIGNoZWNrVG9rZW4gPSBuZXcgUmVnRXhwKFwiXlxcXFxzKiBlbmRcXFxccytcIiArIHZhbCwgXCJpXCIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2hlY2tUb2tlbi50ZXN0KGxpbmUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXZlbCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZ25vcmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJlbHNlaWZcIjpcbiAgICAgICAgICAgICAgICBjYXNlIFwiZWxzZVwiOlxuICAgICAgICAgICAgICAgICAgICBsZXZlbCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGFydFRva2VuVmFsdWUgIT0gXCJlbHNlaWZcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWdub3JlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGxldmVsID4gMCkge1xuICAgICAgICAgICAgICAgIHN0YWNrLnVuc2hpZnQodmFsKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobGV2ZWwgPD0gMCAmJiBpZ25vcmUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgc3RhY2suc2hpZnQoKTtcbiAgICAgICAgICAgICAgICBpZiAoIXN0YWNrLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZW5kXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0b2tlblBvcyA9IHN0cmVhbS5nZXRDdXJyZW50VG9rZW5Qb3NpdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXRSYW5nZSA9IHN0cmVhbS5nZXRDdXJyZW50VG9rZW5SYW5nZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJlYW0uc3RlcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJlYW0uc3RlcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2tlbiA9IHN0cmVhbS5nZXRDdXJyZW50VG9rZW4oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRva2VuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWwgPSB0b2tlbi52YWx1ZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbCBpbiBlbmRPcGVuaW5ncykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoc3RhcnRUb2tlblZhbHVlID09IFwiZWxzZVwiIHx8IHN0YXJ0VG9rZW5WYWx1ZSA9PSBcImVsc2VpZlwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsICE9PSBcImlmXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlcy5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbCAhPSBzdGFydFRva2VuVmFsdWUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYW5nZXMuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5leHRUb2tlblBvcyA9IHN0cmVhbS5nZXRDdXJyZW50VG9rZW5Qb3NpdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlbmRDb2x1bW4gPSBuZXh0VG9rZW5Qb3MuY29sdW1uICsgdmFsLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXRSYW5nZSA9IG5ldyBSYW5nZSh0b2tlblBvcy5yb3csIHRva2VuUG9zLmNvbHVtbiwgbmV4dFRva2VuUG9zLnJvdywgZW5kQ29sdW1uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFuZ2VzLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYW5nZXMuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJlYW0uc3RlcCA9IHN0cmVhbS5zdGVwQmFja3dhcmQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmVhbS5zdGVwKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmVhbS5zdGVwKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuID0gc3RyZWFtLmdldEN1cnJlbnRUb2tlbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWwgPSB0b2tlbi52YWx1ZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwic2VsZWN0XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcInN1YlwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJpZlwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJmdW5jdGlvblwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJjbGFzc1wiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ3aXRoXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcInByb3BlcnR5XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWwgIT0gc3RhcnRUb2tlblZhbHVlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFuZ2VzLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJkb1wiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RhcnRUb2tlblZhbHVlICE9IFwibG9vcFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFuZ2VzLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJsb29wXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdGFydFRva2VuVmFsdWUgIT0gXCJkb1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFuZ2VzLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJmb3JcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXJ0VG9rZW5WYWx1ZSAhPSBcIm5leHRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlcy5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwibmV4dFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RhcnRUb2tlblZhbHVlICE9IFwiZm9yXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYW5nZXMuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIndoaWxlXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdGFydFRva2VuVmFsdWUgIT0gXCJ3ZW5kXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYW5nZXMuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIndlbmRcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXJ0VG9rZW5WYWx1ZSAhPSBcIndoaWxlXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYW5nZXMuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAobGV2ZWwgPT09IDApe1xuICAgICAgICAgICAgICAgICAgICBzdGFjay51bnNoaWZ0KHZhbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0b2tlbilcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuXG4gICAgICAgIGlmICh0b2tlblJhbmdlKSB7XG4gICAgICAgICAgICBpZiAoIW91dHB1dFJhbmdlKSB7XG4gICAgICAgICAgICAgICAgcmFuZ2VzLnB1c2goc3RyZWFtLmdldEN1cnJlbnRUb2tlblJhbmdlKCkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByYW5nZXMucHVzaChvdXRwdXRSYW5nZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmFuZ2VzO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHJvdyA9IHN0cmVhbS5nZXRDdXJyZW50VG9rZW5Sb3coKTtcbiAgICAgICAgaWYgKGRpciA9PT0gLTEpIHtcbiAgICAgICAgICAgIHZhciBlbmRDb2x1bW4gPSBzZXNzaW9uLmdldExpbmUocm93KS5sZW5ndGg7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFJhbmdlKHJvdywgZW5kQ29sdW1uLCBzdGFydFJvdyAtIDEsIHN0YXJ0Q29sdW1uKTtcbiAgICAgICAgfSBlbHNlXG4gICAgICAgICAgICByZXR1cm4gbmV3IFJhbmdlKHN0YXJ0Um93LCBzdGFydENvbHVtbiwgcm93IC0gMSwgc2Vzc2lvbi5nZXRMaW5lKHJvdyAtIDEpLmxlbmd0aCk7XG4gICAgfTtcblxufSkuY2FsbChGb2xkTW9kZS5wcm90b3R5cGUpO1xuIiwiLypcbiAgVEhJUyBGSUxFIFdBUyBBVVRPR0VORVJBVEVEIEJZIG1vZGUudG1wbC5qc1xuKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0TW9kZSA9IHJlcXVpcmUoXCIuL3RleHRcIikuTW9kZTtcbnZhciBWQlNjcmlwdEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdmJzY3JpcHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlZCU2NyaXB0SGlnaGxpZ2h0UnVsZXM7XG52YXIgRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9mb2xkaW5nL3Zic2NyaXB0XCIpLkZvbGRNb2RlO1xudmFyIFJhbmdlID0gcmVxdWlyZShcIi4uL3JhbmdlXCIpLlJhbmdlO1xuXG52YXIgTW9kZSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuSGlnaGxpZ2h0UnVsZXMgPSBWQlNjcmlwdEhpZ2hsaWdodFJ1bGVzO1xuICAgIHRoaXMuZm9sZGluZ1J1bGVzID0gbmV3IEZvbGRNb2RlKCk7XG4gICAgdGhpcy4kYmVoYXZpb3VyID0gdGhpcy4kZGVmYXVsdEJlaGF2aW91cjtcbiAgICB0aGlzLmluZGVudEtleXdvcmRzID0gdGhpcy5mb2xkaW5nUnVsZXMuaW5kZW50S2V5d29yZHM7XG59O1xub29wLmluaGVyaXRzKE1vZGUsIFRleHRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5saW5lQ29tbWVudFN0YXJ0ID0gW1wiJ1wiLCBcIlJFTVwiXTtcblxuICAgIHZhciBvdXRkZW50S2V5d29yZHMgPSBbXG4gICAgICAgIFwiZWxzZVwiLFxuICAgICAgICBcImVsc2VpZlwiLFxuICAgICAgICBcImVuZFwiLFxuICAgICAgICBcImxvb3BcIixcbiAgICAgICAgXCJuZXh0XCIsXG4gICAgICAgIFwid2VuZFwiXG4gICAgXTtcblxuICAgIGZ1bmN0aW9uIGdldE5ldEluZGVudExldmVsKHRva2VucywgbGluZSwgaW5kZW50S2V5d29yZHMpIHtcbiAgICAgICAgdmFyIGxldmVsID0gMDtcbiAgICAgICAgLy8gU3VwcG9ydCBzaW5nbGUtbGluZSBibG9ja3MgYnkgZGVjcmVtZW50aW5nIHRoZSBpbmRlbnQgbGV2ZWwgaWZcbiAgICAgICAgLy8gYW4gZW5kaW5nIHRva2VuIGlzIGZvdW5kXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgdG9rZW4gPSB0b2tlbnNbaV07XG4gICAgICAgICAgICBpZiAodG9rZW4udHlwZSA9PSBcImtleXdvcmQuY29udHJvbC5hc3BcIiB8fCB0b2tlbi50eXBlID09IFwic3RvcmFnZS50eXBlLmZ1bmN0aW9uLmFzcFwiKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbCA9IHRva2VuLnZhbHVlLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgaWYgKHZhbCBpbiBpbmRlbnRLZXl3b3Jkcykge1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKHZhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcInByb3BlcnR5XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwic3ViXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZnVuY3Rpb25cIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJzZWxlY3RcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJkb1wiOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImZvclwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImNsYXNzXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwid2hpbGVcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ3aXRoXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiaWZcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgY2hlY2tUb2tlbiA9IG5ldyBSZWdFeHAoXCJeXFxcXHMqIGVuZFxcXFxzK1wiICsgdmFsLCBcImlcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNpbmdsZUxpbmVDb25kaXRpb24gPSAvXlxccypJZlxccysuKlxccytUaGVuKD8hJylcXHMrKD8hJylcXFMvaS50ZXN0KGxpbmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc2luZ2xlTGluZUNvbmRpdGlvbiAmJiAhY2hlY2tUb2tlbi50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXZlbCArPSBpbmRlbnRLZXl3b3Jkc1t2YWxdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXZlbCArPSBpbmRlbnRLZXl3b3Jkc1t2YWxdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIExpbWl0IHRoZSBsZXZlbCB0byArLy0gMSBzaW5jZSB1c3VhbGx5IHVzZXJzIG9ubHkgaW5kZW50IG9uZSBsZXZlbFxuICAgICAgICAvLyBhdCBhIHRpbWUgcmVnYXJkbGVzcyBvZiB0aGUgbG9naWNhbCBuZXN0aW5nIGxldmVsXG4gICAgICAgIGlmIChsZXZlbCA8IDApIHtcbiAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfSBlbHNlIGlmIChsZXZlbCA+IDApIHtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmdldE5leHRMaW5lSW5kZW50ID0gZnVuY3Rpb24oc3RhdGUsIGxpbmUsIHRhYikge1xuICAgICAgICB2YXIgaW5kZW50ID0gdGhpcy4kZ2V0SW5kZW50KGxpbmUpO1xuICAgICAgICB2YXIgbGV2ZWwgPSAwO1xuXG4gICAgICAgIHZhciB0b2tlbml6ZWRMaW5lID0gdGhpcy5nZXRUb2tlbml6ZXIoKS5nZXRMaW5lVG9rZW5zKGxpbmUsIHN0YXRlKTtcbiAgICAgICAgdmFyIHRva2VucyA9IHRva2VuaXplZExpbmUudG9rZW5zO1xuXG4gICAgICAgIGlmIChzdGF0ZSA9PSBcInN0YXJ0XCIpIHtcbiAgICAgICAgICAgIGxldmVsID0gZ2V0TmV0SW5kZW50TGV2ZWwodG9rZW5zLCBsaW5lLCB0aGlzLmluZGVudEtleXdvcmRzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGV2ZWwgPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5kZW50ICsgdGFiO1xuICAgICAgICB9IGVsc2UgaWYgKGxldmVsIDwgMCAmJiBpbmRlbnQuc3Vic3RyKGluZGVudC5sZW5ndGggLSB0YWIubGVuZ3RoKSA9PSB0YWIpIHtcbiAgICAgICAgICAgIC8vIERvbid0IGRvIGEgbmV4dC1saW5lIG91dGRlbnQgaWYgd2UncmUgZ29pbmcgdG8gZG8gYSByZWFsIG91dGRlbnQgb2YgdGhpcyBsaW5lXG4gICAgICAgICAgICBpZiAoIXRoaXMuY2hlY2tPdXRkZW50KHN0YXRlLCBsaW5lLCBcIlxcblwiKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpbmRlbnQuc3Vic3RyKDAsIGluZGVudC5sZW5ndGggLSB0YWIubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaW5kZW50O1xuICAgIH07XG5cbiAgICB0aGlzLmNoZWNrT3V0ZGVudCA9IGZ1bmN0aW9uKHN0YXRlLCBsaW5lLCBpbnB1dCkge1xuICAgICAgICBpZiAoaW5wdXQgIT0gXCJcXG5cIiAmJiBpbnB1dCAhPSBcIlxcclwiICYmIGlucHV0ICE9IFwiXFxyXFxuXCIpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgdmFyIHRva2VucyA9IHRoaXMuZ2V0VG9rZW5pemVyKCkuZ2V0TGluZVRva2VucyhsaW5lLnRyaW0oKSwgc3RhdGUpLnRva2VucztcblxuICAgICAgICBpZiAoIXRva2VucyB8fCAhdG9rZW5zLmxlbmd0aClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgdmFyIHZhbCA9IHRva2Vuc1swXS52YWx1ZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICByZXR1cm4gKCh0b2tlbnNbMF0udHlwZSA9PSBcImtleXdvcmQuY29udHJvbC5hc3BcIiB8fCB0b2tlbnNbMF0udHlwZSA9PSBcInN0b3JhZ2UudHlwZS5mdW5jdGlvbi5hc3BcIikgJiYgb3V0ZGVudEtleXdvcmRzLmluZGV4T2YodmFsKSAhPSAtMSk7XG4gICAgfTtcblxuICAgIHRoaXMuZ2V0TWF0Y2hpbmcgPSBmdW5jdGlvbihzZXNzaW9uLCByb3csIGNvbHVtbiwgdG9rZW5SYW5nZSkge1xuICAgICAgICBpZiAocm93ID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdmFyIHBvcyA9IHNlc3Npb24uc2VsZWN0aW9uLmxlYWQ7XG4gICAgICAgICAgICBjb2x1bW4gPSBwb3MuY29sdW1uO1xuICAgICAgICAgICAgcm93ID0gcG9zLnJvdztcbiAgICAgICAgfVxuICAgICAgICBpZiAodG9rZW5SYW5nZSA9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB0b2tlblJhbmdlID0gdHJ1ZTtcblxuICAgICAgICB2YXIgc3RhcnRUb2tlbiA9IHNlc3Npb24uZ2V0VG9rZW5BdChyb3csIGNvbHVtbik7XG4gICAgICAgIGlmIChzdGFydFRva2VuKSB7XG4gICAgICAgICAgICB2YXIgdmFsID0gc3RhcnRUb2tlbi52YWx1ZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgaWYgKHZhbCBpbiB0aGlzLmluZGVudEtleXdvcmRzKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZvbGRpbmdSdWxlcy52YnNCbG9jayhzZXNzaW9uLCByb3csIGNvbHVtbiwgdG9rZW5SYW5nZSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5hdXRvT3V0ZGVudCA9IGZ1bmN0aW9uKHN0YXRlLCBzZXNzaW9uLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgdmFyIGNvbHVtbiA9IGxpbmUubWF0Y2goL15cXHMqLylbMF0ubGVuZ3RoO1xuICAgICAgICBpZiAoIWNvbHVtbiB8fCAhcm93KSByZXR1cm47XG5cbiAgICAgICAgdmFyIHN0YXJ0UmFuZ2UgPSB0aGlzLmdldE1hdGNoaW5nKHNlc3Npb24sIHJvdywgY29sdW1uICsgMSwgZmFsc2UpO1xuICAgICAgICBpZiAoIXN0YXJ0UmFuZ2UgfHwgc3RhcnRSYW5nZS5zdGFydC5yb3cgPT0gcm93KVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB2YXIgaW5kZW50ID0gdGhpcy4kZ2V0SW5kZW50KHNlc3Npb24uZ2V0TGluZShzdGFydFJhbmdlLnN0YXJ0LnJvdykpO1xuICAgICAgICBpZiAoaW5kZW50Lmxlbmd0aCAhPSBjb2x1bW4pIHtcbiAgICAgICAgICAgIHNlc3Npb24ucmVwbGFjZShuZXcgUmFuZ2Uocm93LCAwLCByb3csIGNvbHVtbiksIGluZGVudCk7XG4gICAgICAgICAgICBzZXNzaW9uLm91dGRlbnRSb3dzKG5ldyBSYW5nZShyb3cgKyAxLCAwLCByb3cgKyAxLCAwKSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy4kaWQgPSBcImFjZS9tb2RlL3Zic2NyaXB0XCI7XG59KS5jYWxsKE1vZGUucHJvdG90eXBlKTtcblxuZXhwb3J0cy5Nb2RlID0gTW9kZTtcbiIsIi8qXG4gIFRISVMgRklMRSBXQVMgQVVUT0dFTkVSQVRFRCBCWSBtb2RlX2hpZ2hsaWdodF9ydWxlcy50bXBsLmpzIChVVUlEOiA3RjlDOTM0My1ENDhFLTRFN0QtQkZFOC1GNjgwNzE0RENEM0UpICovXG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xuXG52YXIgVkJTY3JpcHRIaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIGtleXdvcmRNYXBwZXIgPSB0aGlzLmNyZWF0ZUtleXdvcmRNYXBwZXIoe1xuICAgICAgICBcImtleXdvcmQuY29udHJvbC5hc3BcIjogIFwiSWZ8VGhlbnxFbHNlfEVsc2VJZnxFbmR8V2hpbGV8V2VuZHxGb3J8VG98RWFjaHxDYXNlfFNlbGVjdHxSZXR1cm5cIlxuICAgICAgICAgICAgKyBcInxDb250aW51ZXxEb3xVbnRpbHxMb29wfE5leHR8V2l0aHxFeGl0fEZ1bmN0aW9ufFByb3BlcnR5fFR5cGV8RW51bXxTdWJ8SUlmfENsYXNzXCIsXG4gICAgICAgIFwic3RvcmFnZS50eXBlLmFzcFwiOiBcIkRpbXxDYWxsfENvbnN0fFJlZGltfFNldHxMZXR8R2V0fE5ld3xSYW5kb21pemV8T3B0aW9ufEV4cGxpY2l0fFByZXNlcnZlfEVyYXNlfEV4ZWN1dGV8RXhlY3V0ZUdsb2JhbFwiLFxuICAgICAgICBcInN0b3JhZ2UubW9kaWZpZXIuYXNwXCI6IFwiUHJpdmF0ZXxQdWJsaWN8RGVmYXVsdFwiLFxuICAgICAgICBcImtleXdvcmQub3BlcmF0b3IuYXNwXCI6IFwiTW9kfEFuZHxOb3R8T3J8WG9yfEFzfEVxdnxJbXB8SXNcIixcbiAgICAgICAgXCJjb25zdGFudC5sYW5ndWFnZS5hc3BcIjogXCJFbXB0eXxGYWxzZXxOb3RoaW5nfE51bGx8VHJ1ZVwiLFxuICAgICAgICBcInZhcmlhYmxlLmxhbmd1YWdlLnZiLmFzcFwiOiBcIk1lXCIsXG4gICAgICAgIFwic3VwcG9ydC5jbGFzcy52Yi5hc3BcIjogXCJSZWdFeHBcIixcbiAgICAgICAgXCJzdXBwb3J0LmNsYXNzLmFzcFwiOiBcIkFwcGxpY2F0aW9ufE9iamVjdENvbnRleHR8UmVxdWVzdHxSZXNwb25zZXxTZXJ2ZXJ8U2Vzc2lvblwiLFxuICAgICAgICBcInN1cHBvcnQuY2xhc3MuY29sbGVjdGlvbi5hc3BcIjogXCJDb250ZW50c3xTdGF0aWNPYmplY3RzfENsaWVudENlcnRpZmljYXRlfENvb2tpZXN8Rm9ybXxRdWVyeVN0cmluZ3xTZXJ2ZXJWYXJpYWJsZXNcIixcbiAgICAgICAgXCJzdXBwb3J0LmNvbnN0YW50LmFzcFwiOiBcIlRvdGFsQnl0ZXN8QnVmZmVyfENhY2hlQ29udHJvbHxDaGFyc2V0fENvbnRlbnRUeXBlfEV4cGlyZXN8RXhwaXJlc0Fic29sdXRlXCJcbiAgICAgICAgICAgICsgXCJ8SXNDbGllbnRDb25uZWN0ZWR8UElDU3xTdGF0dXN8U2NyaXB0VGltZW91dHxDb2RlUGFnZXxMQ0lEfFNlc3Npb25JRHxUaW1lb3V0XCIsXG4gICAgICAgIFwic3VwcG9ydC5mdW5jdGlvbi5hc3BcIjogXCJMb2NrfFVubG9ja3xTZXRBYm9ydHxTZXRDb21wbGV0ZXxCaW5hcnlSZWFkfEFkZEhlYWRlcnxBcHBlbmRUb0xvZ1wiXG4gICAgICAgICAgICArIFwifEJpbmFyeVdyaXRlfENsZWFyfEZsdXNofFJlZGlyZWN0fFdyaXRlfENyZWF0ZU9iamVjdHxIVE1MRW5jb2RlfE1hcFBhdGh8VVJMRW5jb2RlfEFiYW5kb258Q29udmVydHxSZWdleFwiLFxuICAgICAgICBcInN1cHBvcnQuZnVuY3Rpb24uZXZlbnQuYXNwXCI6IFwiQXBwbGljYXRpb25fT25FbmR8QXBwbGljYXRpb25fT25TdGFydFwiXG4gICAgICAgICAgICArIFwifE9uVHJhbnNhY3Rpb25BYm9ydHxPblRyYW5zYWN0aW9uQ29tbWl0fFNlc3Npb25fT25FbmR8U2Vzc2lvbl9PblN0YXJ0XCIsXG4gICAgICAgIFwic3VwcG9ydC5mdW5jdGlvbi52Yi5hc3BcIjogXCJBcnJheXxBZGR8QXNjfEF0bnxDQm9vbHxDQnl0ZXxDQ3VyfENEYXRlfENEYmx8Q2hyfENJbnR8Q0xuZ1wiXG4gICAgICAgICAgICArIFwifENvbnZlcnNpb25zfENvc3xDcmVhdGVPYmplY3R8Q1NuZ3xDU3RyfERhdGV8RGF0ZUFkZHxEYXRlRGlmZnxEYXRlUGFydHxEYXRlU2VyaWFsXCJcbiAgICAgICAgICAgICsgXCJ8RGF0ZVZhbHVlfERheXxEZXJpdmVkfE1hdGh8RXNjYXBlfEV2YWx8RXhpc3RzfEV4cHxGaWx0ZXJ8Rm9ybWF0Q3VycmVuY3lcIlxuICAgICAgICAgICAgKyBcInxGb3JtYXREYXRlVGltZXxGb3JtYXROdW1iZXJ8Rm9ybWF0UGVyY2VudHxHZXRMb2NhbGV8R2V0T2JqZWN0fEdldFJlZnxIZXhcIlxuICAgICAgICAgICAgKyBcInxIb3VyfElucHV0Qm94fEluU3RyfEluU3RyUmV2fEludHxGaXh8SXNBcnJheXxJc0RhdGV8SXNFbXB0eXxJc051bGx8SXNOdW1lcmljXCJcbiAgICAgICAgICAgICsgXCJ8SXNPYmplY3R8SXRlbXxJdGVtc3xKb2lufEtleXN8TEJvdW5kfExDYXNlfExlZnR8TGVufExvYWRQaWN0dXJlfExvZ3xMVHJpbXxSVHJpbVwiXG4gICAgICAgICAgICArIFwifFRyaW18TWF0aHN8TWlkfE1pbnV0ZXxNb250aHxNb250aE5hbWV8TXNnQm94fE5vd3xPY3R8UmVtb3ZlfFJlbW92ZUFsbHxSZXBsYWNlXCJcbiAgICAgICAgICAgICsgXCJ8UkdCfFJpZ2h0fFJuZHxSb3VuZHxTY3JpcHRFbmdpbmV8U2NyaXB0RW5naW5lQnVpbGRWZXJzaW9ufFNjcmlwdEVuZ2luZU1ham9yVmVyc2lvblwiXG4gICAgICAgICAgICArIFwifFNjcmlwdEVuZ2luZU1pbm9yVmVyc2lvbnxTZWNvbmR8U2V0TG9jYWxlfFNnbnxTaW58U3BhY2V8U3BsaXR8U3FyfFN0ckNvbXB8U3RyaW5nfFN0clJldmVyc2VcIlxuICAgICAgICAgICAgKyBcInxUYW58VGltZXxUaW1lcnxUaW1lU2VyaWFsfFRpbWVWYWx1ZXxUeXBlTmFtZXxVQm91bmR8VUNhc2V8VW5lc2NhcGV8VmFyVHlwZXxXZWVrZGF5fFdlZWtkYXlOYW1lfFllYXJcIlxuICAgICAgICAgICAgKyBcInxBc2NCfEFzY1d8Q2hyQnxDaHJXfEluU3RyQnxMZWZ0QnxMZW5CfE1pZEJ8UmlnaHRCfEFic3xHZXRVSUxhbmd1YWdlXCIsXG4gICAgICAgIFwic3VwcG9ydC50eXBlLnZiLmFzcFwiOiBcInZiVHJ1ZXx2YkZhbHNlfHZiQ3J8dmJDckxmfHZiRm9ybUZlZWR8dmJMZnx2Yk5ld0xpbmV8dmJOdWxsQ2hhcnx2Yk51bGxTdHJpbmdcIlxuICAgICAgICAgICAgKyBcInx2YlRhYnx2YlZlcnRpY2FsVGFifHZiQmluYXJ5Q29tcGFyZXx2YlRleHRDb21wYXJlfHZiU3VuZGF5fHZiTW9uZGF5fHZiVHVlc2RheXx2YldlZG5lc2RheVwiXG4gICAgICAgICAgICArIFwifHZiVGh1cnNkYXl8dmJGcmlkYXl8dmJTYXR1cmRheXx2YlVzZVN5c3RlbURheU9mV2Vla3x2YkZpcnN0SmFuMXx2YkZpcnN0Rm91ckRheXN8dmJGaXJzdEZ1bGxXZWVrXCJcbiAgICAgICAgICAgICsgXCJ8dmJHZW5lcmFsRGF0ZXx2YkxvbmdEYXRlfHZiU2hvcnREYXRlfHZiTG9uZ1RpbWV8dmJTaG9ydFRpbWV8dmJPYmplY3RFcnJvcnx2YkVtcHR5fHZiTnVsbHx2YkludGVnZXJcIlxuICAgICAgICAgICAgKyBcInx2Ykxvbmd8dmJTaW5nbGV8dmJEb3VibGV8dmJDdXJyZW5jeXx2YkRhdGV8dmJTdHJpbmd8dmJPYmplY3R8dmJFcnJvcnx2YkJvb2xlYW58dmJWYXJpYW50XCJcbiAgICAgICAgICAgICsgXCJ8dmJEYXRhT2JqZWN0fHZiRGVjaW1hbHx2YkJ5dGV8dmJBcnJheXx2Yk9LT25seXx2Yk9LQ2FuY2VsfHZiQWJvcnRSZXRyeUlnbm9yZXx2Ylllc05vQ2FuY2VsfHZiWWVzTm9cIlxuICAgICAgICAgICAgKyBcInx2YlJldHJ5Q2FuY2VsfHZiQ3JpdGljYWx8dmJRdWVzdGlvbnx2YkV4Y2xhbWF0aW9ufHZiSW5mb3JtYXRpb258dmJEZWZhdWx0QnV0dG9uMXx2YkRlZmF1bHRCdXR0b24yXCJcbiAgICAgICAgICAgICsgXCJ8dmJEZWZhdWx0QnV0dG9uM3x2YkRlZmF1bHRCdXR0b240fHZiQXBwbGljYXRpb25Nb2RhbHx2YlN5c3RlbU1vZGFsfHZiT0t8dmJDYW5jZWx8dmJBYm9ydHx2YlJldHJ5fHZiSWdub3JlfHZiWWVzfHZiTm9cIlxuICAgICAgICAgICAgKyBcInx2YlVzZURlZmF1bHRcIlxuICAgIH0sIFwiaWRlbnRpZmllclwiLCB0cnVlKTtcblxuICAgIHRoaXMuJHJ1bGVzID0ge1xuICAgIFwic3RhcnRcIjogW1xuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbjogW1xuICAgICAgICAgICAgICAgIFwibWV0YS5lbmRpbmctc3BhY2VcIlxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHJlZ2V4OiBcIiRcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbjogW251bGxdLFxuICAgICAgICAgICAgcmVnZXg6IFwiXig/PVxcXFx0KVwiLFxuICAgICAgICAgICAgbmV4dDogXCJzdGF0ZV8zXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdG9rZW46IFtudWxsXSxcbiAgICAgICAgICAgIHJlZ2V4OiBcIl4oPz0gKVwiLFxuICAgICAgICAgICAgbmV4dDogXCJzdGF0ZV80XCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdG9rZW46IFtcbiAgICAgICAgICAgICAgICBcInRleHRcIixcbiAgICAgICAgICAgICAgICBcInN0b3JhZ2UudHlwZS5mdW5jdGlvbi5hc3BcIixcbiAgICAgICAgICAgICAgICBcInRleHRcIixcbiAgICAgICAgICAgICAgICBcImVudGl0eS5uYW1lLmZ1bmN0aW9uLmFzcFwiLFxuICAgICAgICAgICAgICAgIFwidGV4dFwiLFxuICAgICAgICAgICAgICAgIFwicHVuY3R1YXRpb24uZGVmaW5pdGlvbi5wYXJhbWV0ZXJzLmFzcFwiLFxuICAgICAgICAgICAgICAgIFwidmFyaWFibGUucGFyYW1ldGVyLmZ1bmN0aW9uLmFzcFwiLFxuICAgICAgICAgICAgICAgIFwicHVuY3R1YXRpb24uZGVmaW5pdGlvbi5wYXJhbWV0ZXJzLmFzcFwiXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgcmVnZXg6IFwiXihcXFxccyopKEZ1bmN0aW9ufFN1YikoXFxcXHMrKShbYS16QS1aX11cXFxcdyopKFxcXFxzKikoXFxcXCgpKFteKV0qKShcXFxcKSlcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbjogXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLmNvbW1lbnQuYXNwXCIsXG4gICAgICAgICAgICByZWdleDogXCInfFJFTSg/PVxcXFxzfCQpXCIsXG4gICAgICAgICAgICBuZXh0OiBcImNvbW1lbnRcIixcbiAgICAgICAgICAgIGNhc2VJbnNlbnNpdGl2ZTogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbjogXCJzdG9yYWdlLnR5cGUuYXNwXCIsXG4gICAgICAgICAgICByZWdleDogXCJPblxcXFxzK0Vycm9yXFxcXHMrKD86UmVzdW1lXFxcXHMrTmV4dHxHb1RvKVxcXFxiXCIsXG4gICAgICAgICAgICBjYXNlSW5zZW5zaXRpdmU6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdG9rZW46IFwicHVuY3R1YXRpb24uZGVmaW5pdGlvbi5zdHJpbmcuYmVnaW4uYXNwXCIsXG4gICAgICAgICAgICByZWdleDogJ1wiJyxcbiAgICAgICAgICAgIG5leHQ6IFwic3RyaW5nXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdG9rZW46IFtcbiAgICAgICAgICAgICAgICBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24udmFyaWFibGUuYXNwXCJcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICByZWdleDogXCIoXFxcXCQpW2EtekEtWl94N2YteGZmXVthLXpBLVowLTlfeDdmLXhmZl0qP1xcXFxiXFxcXHMqXCJcbiAgICAgICAgfSxcbi8vICAgICAgICB7XG4vLyAgICAgICAgICAgIHRva2VuOiBbXG4vLyAgICAgICAgICAgICAgICBcInN1cHBvcnQudHlwZS52Yi5hc3BcIlxuLy8gICAgICAgICAgICBdLFxuLy8gICAgICAgICAgICByZWdleDogXCIoPzooPzw9YXMgKShcXFxcYlthLXpBLVpfeDdmLXhmZl1bYS16QS1aMC05X3g3Zi14ZmZdKj9cXFxcYikpXCIsIC8vIEVSUk9SOiBUaGlzIGNvbnRhaW5zIGEgbG9va2JlaGluZCwgd2hpY2ggSlMgZG9lcyBub3Qgc3VwcG9ydCA6KFwiXG4vLyAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQubnVtZXJpYy5hc3BcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIi0/XFxcXGIoPzooPzowKD86eHxYKVswLTlhLWZBLUZdKil8KD86KD86WzAtOV0rXFxcXC4/WzAtOV0qKXwoPzpcXFxcLlswLTldKykpKD86KD86ZXxFKSg/OlxcXFwrfC0pP1swLTldKyk/KSg/Okx8bHxVTHx1bHx1fFV8RnxmKT9cXFxcYlwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFx3K1wiLFxuICAgICAgICAgICAgdG9rZW46IGtleXdvcmRNYXBwZXJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdG9rZW46IFtcImVudGl0eS5uYW1lLmZ1bmN0aW9uLmFzcFwiXSxcbiAgICAgICAgICAgIHJlZ2V4OiBcIig/OihcXFxcYlthLXpBLVpfeDdmLXhmZl1bYS16QS1aMC05X3g3Zi14ZmZdKj9cXFxcYikoPz1cXFxcKFxcXFwpPykpXCJcbiAgICAgICAgfSxcbi8vICAgICAgICB7XG4vLyAgICAgICAgICAgIHRva2VuOiBbXG4vLyAgICAgICAgICAgICAgICBcInZhcmlhYmxlLm90aGVyLmFzcFwiXG4vLyAgICAgICAgICAgIF0sXG4vLyAgICAgICAgICAgIHJlZ2V4OiBcIig/OigoPzw9KFxcXFwrfD18LXxcXFxcJnxcXFxcXFxcXHwvfDx8PnxcXFxcKHwsKSlcXFxccypcXFxcYihbYS16QS1aX3g3Zi14ZmZdW2EtekEtWjAtOV94N2YteGZmXSo/KVxcXFxiKD8hKFxcXFwofFxcXFwuKSl8XFxcXGIoW2EtekEtWl94N2YteGZmXVthLXpBLVowLTlfeDdmLXhmZl0qPylcXFxcYig/PVxcXFxzKihcXFxcK3w9fC18XFxcXCZ8XFxcXFxcXFx8L3w8fD58XFxcXCh8XFxcXCkpKSkpXCIsIC8vIEVSUk9SOiBUaGlzIGNvbnRhaW5zIGEgbG9va2JlaGluZCwgd2hpY2ggSlMgZG9lcyBub3Qgc3VwcG9ydCA6KFwiXG4vLyAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdG9rZW46IFtcImtleXdvcmQub3BlcmF0b3IuYXNwXCJdLFxuICAgICAgICAgICAgcmVnZXg6IFwiXFxcXC18XFxcXCt8XFxcXCp8XFxcXC98XFxcXD58XFxcXDx8XFxcXD18XFxcXCZ8XFxcXFxcXFx8XFxcXF5cIlxuICAgICAgICB9XG4gICAgXSxcbiAgICBcInN0YXRlXzNcIjogW1xuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbjogW1xuICAgICAgICAgICAgICAgIFwibWV0YS5vZGQtdGFiLnRhYnNcIixcbiAgICAgICAgICAgICAgICBcIm1ldGEuZXZlbi10YWIudGFic1wiXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgcmVnZXg6IFwiKFxcXFx0KShcXFxcdCk/XCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdG9rZW46IFwibWV0YS5sZWFkaW5nLXNwYWNlXCIsXG4gICAgICAgICAgICByZWdleDogXCIoPz1bXlxcXFx0XSlcIixcbiAgICAgICAgICAgIG5leHQ6IFwic3RhcnRcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbjogXCJtZXRhLmxlYWRpbmctc3BhY2VcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIi5cIixcbiAgICAgICAgICAgIG5leHQ6IFwic3RhdGVfM1wiXG4gICAgICAgIH1cbiAgICBdLFxuICAgIFwic3RhdGVfNFwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuOiBbXCJtZXRhLm9kZC10YWIuc3BhY2VzXCIsIFwibWV0YS5ldmVuLXRhYi5zcGFjZXNcIl0sXG4gICAgICAgICAgICByZWdleDogXCIoICApKCAgKT9cIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbjogXCJtZXRhLmxlYWRpbmctc3BhY2VcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIig/PVteIF0pXCIsXG4gICAgICAgICAgICBuZXh0OiBcInN0YXJ0XCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcIm1ldGEubGVhZGluZy1zcGFjZVwiXG4gICAgICAgIH1cbiAgICBdLFxuICAgIFwiY29tbWVudFwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuOiBcImNvbW1lbnQubGluZS5hcG9zdHJvcGhlLmFzcFwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiJFwiLFxuICAgICAgICAgICAgbmV4dDogXCJzdGFydFwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJjb21tZW50LmxpbmUuYXBvc3Ryb3BoZS5hc3BcIlxuICAgICAgICB9XG4gICAgXSxcbiAgICBcInN0cmluZ1wiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50LmNoYXJhY3Rlci5lc2NhcGUuYXBvc3Ryb3BoZS5hc3BcIixcbiAgICAgICAgICAgIHJlZ2V4OiAnXCJcIidcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nLnF1b3RlZC5kb3VibGUuYXNwXCIsXG4gICAgICAgICAgICByZWdleDogJ1wiJyxcbiAgICAgICAgICAgIG5leHQ6IFwic3RhcnRcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwic3RyaW5nLnF1b3RlZC5kb3VibGUuYXNwXCJcbiAgICAgICAgfVxuICAgIF1cbn07XG5cbn07XG5cbm9vcC5pbmhlcml0cyhWQlNjcmlwdEhpZ2hsaWdodFJ1bGVzLCBUZXh0SGlnaGxpZ2h0UnVsZXMpO1xuXG5leHBvcnRzLlZCU2NyaXB0SGlnaGxpZ2h0UnVsZXMgPSBWQlNjcmlwdEhpZ2hsaWdodFJ1bGVzO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9