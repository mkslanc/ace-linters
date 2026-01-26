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
        "wend": -1,
        "exit": 0,
        "until": 0
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
        if (/(?:\s*|^)Exit\s+(Do|For|Sub|Function|Property)\b/i.test(line)) return "";
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

        var firstRange = stream.getCurrentTokenRange();

        var doubleKeywordResult = this.$isDoubleKeyword(token, stream);
        if (doubleKeywordResult === "ignore") {
            return;
        }
        var doubleKeywordPosition = null;
        if (doubleKeywordResult) {
            firstRange = doubleKeywordResult.range;
            doubleKeywordPosition = doubleKeywordResult.position;
            if (doubleKeywordResult.position === "second") {
                val = doubleKeywordResult.keyword;
                startTokenValue = val;
            }
        }

        var stack = [val];
        var dir = this.indentKeywords[val];

        if (!dir)
            return;

        if (doubleKeywordPosition === "first" && dir === 1) {
            stream.stepForward();
            stream.stepForward();
        } else if (doubleKeywordPosition === "second" && dir === -1) {
            stream.stepBackward();
            stream.stepBackward();
        }

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
                case "until":
                case "exit":
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
                    var doubleKeyword = this.$isDoubleKeyword(token, stream);
                    if (doubleKeyword === "ignore" || (doubleKeyword && doubleKeyword.position === "second")) {
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
                                    outputRange.setEnd(nextTokenPos.row, endColumn);
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
                            var doDouble = this.$isDoubleKeyword(token, stream);
                            outputRange = (doDouble && doDouble.position === "first")
                                ? doDouble.range
                                : stream.getCurrentTokenRange();
                            break;
                        case "loop":
                            if (startTokenValue != "do")
                                ranges.shift();
                            var loopDouble = this.$isDoubleKeyword(token, stream);
                            outputRange = (loopDouble && loopDouble.position === "first")
                                ? loopDouble.range
                                : stream.getCurrentTokenRange();
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

    /**
     * @param {Token} currentToken
     * @param {TokenIterator} stream
     * @return {false | "ignore" | { range: Range, position: "first" | "second", keyword: string }}
     */
    this.$isDoubleKeyword = function (currentToken, stream) {
        var val = currentToken.value.toLowerCase();
        var tokenIndex = stream.$tokenIndex;
        var rowTokens = stream.$rowTokens;

        var prevKeywordIndex = tokenIndex - 2;
        var prevKeyword = prevKeywordIndex >= 0 ? rowTokens[prevKeywordIndex] : null;
        if (prevKeyword) {
            var prevVal = prevKeyword.value.toLowerCase();

            // Do While / Do Until
            if ((val === "while" || val === "until") && prevVal === "do") {
                return {
                    range: this.$getDoubleKeywordRange(prevKeywordIndex, tokenIndex, stream),
                    position: "second",
                    keyword: "do"
                };
            }

            // Loop While / Loop Until
            if ((val === "while" || val === "until") && prevVal === "loop") {
                return {
                    range: this.$getDoubleKeywordRange(prevKeywordIndex, tokenIndex, stream),
                    position: "second",
                    keyword: "loop"
                };
            }

            if (prevVal === "exit" && (val === "for" || val === "do" || val === "sub" || val === "function" || val === "property")) {
                return "ignore";
            }
        }

        var nextKeywordIndex = tokenIndex + 2;
        var nextKeyword = nextKeywordIndex < rowTokens.length ? rowTokens[nextKeywordIndex] : null;
        if (nextKeyword) {
            var nextVal = nextKeyword.value.toLowerCase();

            // Do While / Do Until
            if (val === "do" && (nextVal === "while" || nextVal === "until")) {
                return {
                    range: this.$getDoubleKeywordRange(tokenIndex, nextKeywordIndex, stream),
                    position: "first",
                    keyword: "do"
                };
            }

            // Loop While / Loop Until
            if (val === "loop" && (nextVal === "while" || nextVal === "until")) {
                return {
                    range: this.$getDoubleKeywordRange(tokenIndex, nextKeywordIndex, stream),
                    position: "first",
                    keyword: "loop"
                };
            }

            if (val === "exit" && (nextVal === "for" || nextVal === "do" || nextVal === "sub" || nextVal === "function" || nextVal === "property")) {
                return "ignore";
            }
        }

        return false;
    };

    /**
     * Calculate range spanning both tokens of a double keyword
     * @param {number} firstTokenIndex
     * @param {number} secondTokenIndex
     * @param {TokenIterator} stream
     * @return {Range}
     */
    this.$getDoubleKeywordRange = function (firstTokenIndex, secondTokenIndex, stream) {
        var row = stream.$row;
        var rowTokens = stream.$rowTokens;

        var firstStart = 0;
        for (var i = 0; i < firstTokenIndex; i++) {
            firstStart += rowTokens[i].value.length;
        }

        var secondEnd = 0;
        for (var i = 0; i <= secondTokenIndex; i++) {
            secondEnd += rowTokens[i].value.length;
        }

        return new Range(row, firstStart, row, secondEnd);
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

    function isSecondOfDoubleKeyword(tokens, i) {
        var val = tokens[i].value.toLowerCase();
        var prevToken = i >= 2 ? tokens[i - 2] : null;
        if (!prevToken) return false;
        var prevVal = prevToken.value.toLowerCase();

        // Do While / Do Until / Loop While / Loop Until
        if ((val === "while" || val === "until") && (prevVal === "do" || prevVal === "loop")) {
            return true;
        }
        // Exit For / Exit Do / Exit Sub / Exit Function / Exit Property
        if (prevVal === "exit" && (val === "for" || val === "do" || val === "sub" || val === "function" || val
            === "property")) {
            return true;
        }
        return false;
    }

    function getNetIndentLevel(tokens, line, indentKeywords) {
        var level = 0;
        // Support single-line blocks by decrementing the indent level if
        // an ending token is found
        for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            if (token.type == "keyword.control.asp" || token.type == "storage.type.function.asp") {
                var val = token.value.toLowerCase();
                if (val in indentKeywords) {
                    if (isSecondOfDoubleKeyword(tokens, i)) {
                        continue;
                    }
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
            if (/^\s+$/.test(val)) {
                column = column + val.length;
                startToken = session.getTokenAt(row, column);
                if (!startToken) {
                    return;
                }
                val = startToken.value.toLowerCase();
            }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjI5NTYuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLElBQWU7QUFDakMsbUJBQW1CLHFDQUErQjtBQUNsRCxZQUFZLDJDQUE0QjtBQUN4QyxvQkFBb0IsMENBQTZDOzs7QUFHakUsZUFBZSxTQUFnQjs7QUFFL0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7O0FBRUE7QUFDQSxlQUFlLE9BQU87QUFDdEIsZUFBZSxlQUFlO0FBQzlCLGdCQUFnQixxQkFBcUI7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsUUFBUTtBQUN2QixlQUFlLFFBQVE7QUFDdkIsZUFBZSxlQUFlO0FBQzlCLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdCQUF3QixxQkFBcUI7QUFDN0M7QUFDQTs7QUFFQTtBQUNBLHdCQUF3Qix1QkFBdUI7QUFDL0M7QUFDQTs7QUFFQTtBQUNBOztBQUVBLENBQUM7Ozs7Ozs7O0FDdmJEO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixVQUFVLG1CQUFPLENBQUMsSUFBWTtBQUM5QixlQUFlLGlDQUFzQjtBQUNyQyw2QkFBNkIsNERBQTREO0FBQ3pGLGVBQWUsOENBQXNDO0FBQ3JELFlBQVksMkNBQXlCOztBQUVyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixtQkFBbUI7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRCxZQUFZOzs7Ozs7OztBQzdLWjtBQUNBOztBQUVhOztBQUViLFVBQVUsbUJBQU8sQ0FBQyxJQUFZO0FBQzlCLHlCQUF5Qix3REFBb0Q7O0FBRTdFOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxTQUE4QiIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvZm9sZGluZy92YnNjcmlwdC5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL3Zic2NyaXB0LmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvdmJzY3JpcHRfaGlnaGxpZ2h0X3J1bGVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uLy4uL2xpYi9vb3BcIik7XG52YXIgQmFzZUZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZF9tb2RlXCIpLkZvbGRNb2RlO1xudmFyIFJhbmdlID0gcmVxdWlyZShcIi4uLy4uL3JhbmdlXCIpLlJhbmdlO1xudmFyIFRva2VuSXRlcmF0b3IgPSByZXF1aXJlKFwiLi4vLi4vdG9rZW5faXRlcmF0b3JcIikuVG9rZW5JdGVyYXRvcjtcblxuXG52YXIgRm9sZE1vZGUgPSBleHBvcnRzLkZvbGRNb2RlID0gZnVuY3Rpb24oKSB7fTtcblxub29wLmluaGVyaXRzKEZvbGRNb2RlLCBCYXNlRm9sZE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5pbmRlbnRLZXl3b3JkcyA9IHtcbiAgICAgICAgXCJjbGFzc1wiOiAxLFxuICAgICAgICBcImZ1bmN0aW9uXCI6IDEsXG4gICAgICAgIFwic3ViXCI6IDEsXG4gICAgICAgIFwiaWZcIjogMSxcbiAgICAgICAgXCJzZWxlY3RcIjogMSxcbiAgICAgICAgXCJkb1wiOiAxLFxuICAgICAgICBcImZvclwiOiAxLFxuICAgICAgICBcIndoaWxlXCI6IDEsXG4gICAgICAgIFwid2l0aFwiOiAxLFxuICAgICAgICBcInByb3BlcnR5XCI6IDEsXG4gICAgICAgIFwiZWxzZVwiOiAxLFxuICAgICAgICBcImVsc2VpZlwiOiAxLFxuICAgICAgICBcImVuZFwiOiAtMSxcbiAgICAgICAgXCJsb29wXCI6IC0xLFxuICAgICAgICBcIm5leHRcIjogLTEsXG4gICAgICAgIFwid2VuZFwiOiAtMSxcbiAgICAgICAgXCJleGl0XCI6IDAsXG4gICAgICAgIFwidW50aWxcIjogMFxuICAgIH07XG5cbiAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlciA9IC8oPzpcXHN8XikoY2xhc3N8ZnVuY3Rpb258c3VifGlmfHNlbGVjdHxkb3xmb3J8d2hpbGV8d2l0aHxwcm9wZXJ0eXxlbHNlfGVsc2VpZilcXGIvaTtcbiAgICB0aGlzLmZvbGRpbmdTdG9wTWFya2VyID0gL1xcYihlbmR8bG9vcHxuZXh0fHdlbmQpXFxiL2k7XG5cbiAgICB0aGlzLmdldEZvbGRXaWRnZXRSYW5nZSA9IGZ1bmN0aW9uIChzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdykge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICB2YXIgaXNTdGFydCA9IHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyLnRlc3QobGluZSk7XG4gICAgICAgIHZhciBpc0VuZCA9IHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIudGVzdChsaW5lKTtcbiAgICAgICAgaWYgKGlzU3RhcnQgfHwgaXNFbmQpIHtcbiAgICAgICAgICAgIHZhciBtYXRjaCA9IChpc0VuZCkgPyB0aGlzLmZvbGRpbmdTdG9wTWFya2VyLmV4ZWMobGluZSkgOiB0aGlzLmZvbGRpbmdTdGFydE1hcmtlci5leGVjKGxpbmUpO1xuICAgICAgICAgICAgdmFyIGtleXdvcmQgPSBtYXRjaCAmJiBtYXRjaFsxXS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgaWYgKGtleXdvcmQpIHtcbiAgICAgICAgICAgICAgICB2YXIgdHlwZSA9IHNlc3Npb24uZ2V0VG9rZW5BdChyb3csIG1hdGNoLmluZGV4ICsgMikudHlwZTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gXCJrZXl3b3JkLmNvbnRyb2wuYXNwXCIgfHwgdHlwZSA9PT0gXCJzdG9yYWdlLnR5cGUuZnVuY3Rpb24uYXNwXCIpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnZic0Jsb2NrKHNlc3Npb24sIHJvdywgbWF0Y2guaW5kZXggKyAyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cblxuICAgIC8vIG11c3QgcmV0dXJuIFwiXCIgaWYgdGhlcmUncyBubyBmb2xkLCB0byBlbmFibGUgY2FjaGluZ1xuICAgIHRoaXMuZ2V0Rm9sZFdpZGdldCA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgIHZhciBpc1N0YXJ0ID0gdGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIudGVzdChsaW5lKTtcbiAgICAgICAgdmFyIGlzRW5kID0gdGhpcy5mb2xkaW5nU3RvcE1hcmtlci50ZXN0KGxpbmUpO1xuICAgICAgICBpZiAoLyg/Olxccyp8XilFeGl0XFxzKyhEb3xGb3J8U3VifEZ1bmN0aW9ufFByb3BlcnR5KVxcYi9pLnRlc3QobGluZSkpIHJldHVybiBcIlwiO1xuICAgICAgICBpZiAoaXNTdGFydCAmJiAhaXNFbmQpIHtcbiAgICAgICAgICAgIHZhciBtYXRjaCA9IHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyLmV4ZWMobGluZSk7XG4gICAgICAgICAgICB2YXIga2V5d29yZCA9IG1hdGNoICYmIG1hdGNoWzFdLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBpZiAoa2V5d29yZCkge1xuICAgICAgICAgICAgICAgIHZhciB0eXBlID0gc2Vzc2lvbi5nZXRUb2tlbkF0KHJvdywgbWF0Y2guaW5kZXggKyAyKS50eXBlO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlID09IFwia2V5d29yZC5jb250cm9sLmFzcFwiIHx8IHR5cGUgPT0gXCJzdG9yYWdlLnR5cGUuZnVuY3Rpb24uYXNwXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGtleXdvcmQgPT0gXCJpZlwiICYmICEvdGhlblxccyooJ3wkKS9pLnRlc3QobGluZSkpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwic3RhcnRcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfTtcblxuICAgIHRoaXMudmJzQmxvY2sgPSBmdW5jdGlvbihzZXNzaW9uLCByb3csIGNvbHVtbiwgdG9rZW5SYW5nZSkge1xuICAgICAgICB2YXIgc3RyZWFtID0gbmV3IFRva2VuSXRlcmF0b3Ioc2Vzc2lvbiwgcm93LCBjb2x1bW4pO1xuXG4gICAgICAgIHZhciBlbmRPcGVuaW5ncyA9IHtcbiAgICAgICAgICAgIFwiY2xhc3NcIjogMSxcbiAgICAgICAgICAgIFwiZnVuY3Rpb25cIjogMSxcbiAgICAgICAgICAgIFwic3ViXCI6IDEsXG4gICAgICAgICAgICBcImlmXCI6IDEsXG4gICAgICAgICAgICBcInNlbGVjdFwiOiAxLFxuICAgICAgICAgICAgXCJ3aXRoXCI6IDEsXG4gICAgICAgICAgICBcInByb3BlcnR5XCI6IDEsXG4gICAgICAgICAgICBcImVsc2VcIjogMSxcbiAgICAgICAgICAgIFwiZWxzZWlmXCI6IDFcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgdG9rZW4gPSBzdHJlYW0uZ2V0Q3VycmVudFRva2VuKCk7XG4gICAgICAgIGlmICghdG9rZW4gfHwgKHRva2VuLnR5cGUgIT0gXCJrZXl3b3JkLmNvbnRyb2wuYXNwXCIgJiYgdG9rZW4udHlwZSAhPSBcInN0b3JhZ2UudHlwZS5mdW5jdGlvbi5hc3BcIikpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdmFyIHN0YXJ0VG9rZW5WYWx1ZSA9IHRva2VuLnZhbHVlLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIHZhciB2YWwgPSB0b2tlbi52YWx1ZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIHZhciBmaXJzdFJhbmdlID0gc3RyZWFtLmdldEN1cnJlbnRUb2tlblJhbmdlKCk7XG5cbiAgICAgICAgdmFyIGRvdWJsZUtleXdvcmRSZXN1bHQgPSB0aGlzLiRpc0RvdWJsZUtleXdvcmQodG9rZW4sIHN0cmVhbSk7XG4gICAgICAgIGlmIChkb3VibGVLZXl3b3JkUmVzdWx0ID09PSBcImlnbm9yZVwiKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGRvdWJsZUtleXdvcmRQb3NpdGlvbiA9IG51bGw7XG4gICAgICAgIGlmIChkb3VibGVLZXl3b3JkUmVzdWx0KSB7XG4gICAgICAgICAgICBmaXJzdFJhbmdlID0gZG91YmxlS2V5d29yZFJlc3VsdC5yYW5nZTtcbiAgICAgICAgICAgIGRvdWJsZUtleXdvcmRQb3NpdGlvbiA9IGRvdWJsZUtleXdvcmRSZXN1bHQucG9zaXRpb247XG4gICAgICAgICAgICBpZiAoZG91YmxlS2V5d29yZFJlc3VsdC5wb3NpdGlvbiA9PT0gXCJzZWNvbmRcIikge1xuICAgICAgICAgICAgICAgIHZhbCA9IGRvdWJsZUtleXdvcmRSZXN1bHQua2V5d29yZDtcbiAgICAgICAgICAgICAgICBzdGFydFRva2VuVmFsdWUgPSB2YWw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc3RhY2sgPSBbdmFsXTtcbiAgICAgICAgdmFyIGRpciA9IHRoaXMuaW5kZW50S2V5d29yZHNbdmFsXTtcblxuICAgICAgICBpZiAoIWRpcilcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICBpZiAoZG91YmxlS2V5d29yZFBvc2l0aW9uID09PSBcImZpcnN0XCIgJiYgZGlyID09PSAxKSB7XG4gICAgICAgICAgICBzdHJlYW0uc3RlcEZvcndhcmQoKTtcbiAgICAgICAgICAgIHN0cmVhbS5zdGVwRm9yd2FyZCgpO1xuICAgICAgICB9IGVsc2UgaWYgKGRvdWJsZUtleXdvcmRQb3NpdGlvbiA9PT0gXCJzZWNvbmRcIiAmJiBkaXIgPT09IC0xKSB7XG4gICAgICAgICAgICBzdHJlYW0uc3RlcEJhY2t3YXJkKCk7XG4gICAgICAgICAgICBzdHJlYW0uc3RlcEJhY2t3YXJkKCk7XG4gICAgICAgIH1cblxuICAgICAgICBzd2l0Y2ggKHZhbCkge1xuICAgICAgICAgICAgY2FzZSBcInByb3BlcnR5XCI6XG4gICAgICAgICAgICBjYXNlIFwic3ViXCI6XG4gICAgICAgICAgICBjYXNlIFwiZnVuY3Rpb25cIjpcbiAgICAgICAgICAgIGNhc2UgXCJpZlwiOlxuICAgICAgICAgICAgY2FzZSBcInNlbGVjdFwiOlxuICAgICAgICAgICAgY2FzZSBcImRvXCI6XG4gICAgICAgICAgICBjYXNlIFwiZm9yXCI6XG4gICAgICAgICAgICBjYXNlIFwiY2xhc3NcIjpcbiAgICAgICAgICAgIGNhc2UgXCJ3aGlsZVwiOlxuICAgICAgICAgICAgY2FzZSBcIndpdGhcIjpcbiAgICAgICAgICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICAgICAgICAgIHZhciBzaW5nbGVMaW5lQ29uZGl0aW9uID0gL15cXHMqSWZcXHMrLipcXHMrVGhlbig/IScpXFxzKyg/IScpXFxTL2kudGVzdChsaW5lKTtcbiAgICAgICAgICAgICAgICBpZiAoc2luZ2xlTGluZUNvbmRpdGlvbilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIHZhciBjaGVja1Rva2VuID0gbmV3IFJlZ0V4cChcIig/Ol58XFxcXHMpXCIgKyB2YWwsIFwiaVwiKTtcbiAgICAgICAgICAgICAgICB2YXIgZW5kVGVzdCA9IC9eXFxzKkVuZFxccyhJZnxTdWJ8U2VsZWN0fEZ1bmN0aW9ufENsYXNzfFdpdGh8UHJvcGVydHkpXFxzKi9pLnRlc3QobGluZSk7XG4gICAgICAgICAgICAgICAgaWYgKCFjaGVja1Rva2VuLnRlc3QobGluZSkgJiYgIWVuZFRlc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZW5kVGVzdCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdG9rZW5SYW5nZSA9IHN0cmVhbS5nZXRDdXJyZW50VG9rZW5SYW5nZSgpO1xuICAgICAgICAgICAgICAgICAgICBzdHJlYW0uc3RlcCA9IHN0cmVhbS5zdGVwQmFja3dhcmQ7XG4gICAgICAgICAgICAgICAgICAgIHN0cmVhbS5zdGVwKCk7XG4gICAgICAgICAgICAgICAgICAgIHN0cmVhbS5zdGVwKCk7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuID0gc3RyZWFtLmdldEN1cnJlbnRUb2tlbigpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodG9rZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbCA9IHRva2VuLnZhbHVlLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsID09IFwiZW5kXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJzdFJhbmdlID0gc3RyZWFtLmdldEN1cnJlbnRUb2tlblJhbmdlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3RSYW5nZSA9IG5ldyBSYW5nZShmaXJzdFJhbmdlLnN0YXJ0LnJvdywgZmlyc3RSYW5nZS5zdGFydC5jb2x1bW4sIHRva2VuUmFuZ2Uuc3RhcnQucm93LCB0b2tlblJhbmdlLmVuZC5jb2x1bW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGRpciA9IC0xO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICB2YXIgdG9rZW5Qb3MgPSBzdHJlYW0uZ2V0Q3VycmVudFRva2VuUG9zaXRpb24oKTtcbiAgICAgICAgICAgICAgICBmaXJzdFJhbmdlID0gc3RyZWFtLmdldEN1cnJlbnRUb2tlblJhbmdlKCk7XG4gICAgICAgICAgICAgICAgc3RyZWFtLnN0ZXAgPSBzdHJlYW0uc3RlcEZvcndhcmQ7XG4gICAgICAgICAgICAgICAgc3RyZWFtLnN0ZXAoKTtcbiAgICAgICAgICAgICAgICBzdHJlYW0uc3RlcCgpO1xuICAgICAgICAgICAgICAgIHRva2VuID0gc3RyZWFtLmdldEN1cnJlbnRUb2tlbigpO1xuICAgICAgICAgICAgICAgIGlmICh0b2tlbikge1xuICAgICAgICAgICAgICAgICAgICB2YWwgPSB0b2tlbi52YWx1ZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFsIGluIGVuZE9wZW5pbmdzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydFRva2VuVmFsdWUgPSB2YWw7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV4dFRva2VuUG9zID0gc3RyZWFtLmdldEN1cnJlbnRUb2tlblBvc2l0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZW5kQ29sdW1uID0gbmV4dFRva2VuUG9zLmNvbHVtbiArIHZhbC5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJzdFJhbmdlID0gbmV3IFJhbmdlKHRva2VuUG9zLnJvdywgdG9rZW5Qb3MuY29sdW1uLCBuZXh0VG9rZW5Qb3Mucm93LCBlbmRDb2x1bW4pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN0cmVhbS5zdGVwID0gc3RyZWFtLnN0ZXBCYWNrd2FyZDtcbiAgICAgICAgICAgICAgICBzdHJlYW0uc3RlcCgpO1xuICAgICAgICAgICAgICAgIHN0cmVhbS5zdGVwKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHN0YXJ0Q29sdW1uID0gZGlyID09PSAtMSA/IHNlc3Npb24uZ2V0TGluZShyb3cgLSAxKS5sZW5ndGggOiBzZXNzaW9uLmdldExpbmUocm93KS5sZW5ndGg7XG4gICAgICAgIHZhciBzdGFydFJvdyA9IHJvdztcbiAgICAgICAgdmFyIHJhbmdlcyA9IFtdO1xuICAgICAgICByYW5nZXMucHVzaChmaXJzdFJhbmdlKTtcblxuICAgICAgICBzdHJlYW0uc3RlcCA9IGRpciA9PT0gLTEgPyBzdHJlYW0uc3RlcEJhY2t3YXJkIDogc3RyZWFtLnN0ZXBGb3J3YXJkO1xuICAgICAgICB3aGlsZSh0b2tlbiA9IHN0cmVhbS5zdGVwKCkpIHtcbiAgICAgICAgICAgIHZhciBvdXRwdXRSYW5nZSA9IG51bGw7XG4gICAgICAgICAgICB2YXIgaWdub3JlID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAodG9rZW4udHlwZSAhPSBcImtleXdvcmQuY29udHJvbC5hc3BcIiAmJiB0b2tlbi50eXBlICE9IFwic3RvcmFnZS50eXBlLmZ1bmN0aW9uLmFzcFwiKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgdmFsID0gdG9rZW4udmFsdWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIHZhciBsZXZlbCA9IGRpciAqIHRoaXMuaW5kZW50S2V5d29yZHNbdmFsXTtcblxuICAgICAgICAgICAgc3dpdGNoICh2YWwpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwicHJvcGVydHlcIjpcbiAgICAgICAgICAgICAgICBjYXNlIFwic3ViXCI6XG4gICAgICAgICAgICAgICAgY2FzZSBcImZ1bmN0aW9uXCI6XG4gICAgICAgICAgICAgICAgY2FzZSBcImlmXCI6XG4gICAgICAgICAgICAgICAgY2FzZSBcInNlbGVjdFwiOlxuICAgICAgICAgICAgICAgIGNhc2UgXCJkb1wiOlxuICAgICAgICAgICAgICAgIGNhc2UgXCJmb3JcIjpcbiAgICAgICAgICAgICAgICBjYXNlIFwiY2xhc3NcIjpcbiAgICAgICAgICAgICAgICBjYXNlIFwid2hpbGVcIjpcbiAgICAgICAgICAgICAgICBjYXNlIFwid2l0aFwiOlxuICAgICAgICAgICAgICAgIGNhc2UgXCJ1bnRpbFwiOlxuICAgICAgICAgICAgICAgIGNhc2UgXCJleGl0XCI6XG4gICAgICAgICAgICAgICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHN0cmVhbS5nZXRDdXJyZW50VG9rZW5Sb3coKSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzaW5nbGVMaW5lQ29uZGl0aW9uID0gL15cXHMqSWZcXHMrLipcXHMrVGhlbig/IScpXFxzKyg/IScpXFxTL2kudGVzdChsaW5lKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNpbmdsZUxpbmVDb25kaXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldmVsID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlnbm9yZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdmFyIGNoZWNrVG9rZW4gPSBuZXcgUmVnRXhwKFwiXlxcXFxzKiBlbmRcXFxccytcIiArIHZhbCwgXCJpXCIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2hlY2tUb2tlbi50ZXN0KGxpbmUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXZlbCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZ25vcmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHZhciBkb3VibGVLZXl3b3JkID0gdGhpcy4kaXNEb3VibGVLZXl3b3JkKHRva2VuLCBzdHJlYW0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZG91YmxlS2V5d29yZCA9PT0gXCJpZ25vcmVcIiB8fCAoZG91YmxlS2V5d29yZCAmJiBkb3VibGVLZXl3b3JkLnBvc2l0aW9uID09PSBcInNlY29uZFwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV2ZWwgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWdub3JlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiZWxzZWlmXCI6XG4gICAgICAgICAgICAgICAgY2FzZSBcImVsc2VcIjpcbiAgICAgICAgICAgICAgICAgICAgbGV2ZWwgPSAwO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhcnRUb2tlblZhbHVlICE9IFwiZWxzZWlmXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlnbm9yZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChsZXZlbCA+IDApIHtcbiAgICAgICAgICAgICAgICBzdGFjay51bnNoaWZ0KHZhbCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGxldmVsIDw9IDAgJiYgaWdub3JlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHN0YWNrLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgaWYgKCFzdGFjay5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJlbmRcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdG9rZW5Qb3MgPSBzdHJlYW0uZ2V0Q3VycmVudFRva2VuUG9zaXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXRSYW5nZSA9IHN0cmVhbS5nZXRDdXJyZW50VG9rZW5SYW5nZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmVhbS5zdGVwKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyZWFtLnN0ZXAoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2tlbiA9IHN0cmVhbS5nZXRDdXJyZW50VG9rZW4oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodG9rZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsID0gdG9rZW4udmFsdWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbCBpbiBlbmRPcGVuaW5ncykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChzdGFydFRva2VuVmFsdWUgPT0gXCJlbHNlXCIgfHwgc3RhcnRUb2tlblZhbHVlID09IFwiZWxzZWlmXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbCAhPT0gXCJpZlwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlcy5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsICE9IHN0YXJ0VG9rZW5WYWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlcy5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5leHRUb2tlblBvcyA9IHN0cmVhbS5nZXRDdXJyZW50VG9rZW5Qb3NpdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVuZENvbHVtbiA9IG5leHRUb2tlblBvcy5jb2x1bW4gKyB2YWwubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0UmFuZ2Uuc2V0RW5kKG5leHRUb2tlblBvcy5yb3csIGVuZENvbHVtbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYW5nZXMuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYW5nZXMuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyZWFtLnN0ZXAgPSBzdHJlYW0uc3RlcEJhY2t3YXJkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cmVhbS5zdGVwKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyZWFtLnN0ZXAoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2tlbiA9IHN0cmVhbS5nZXRDdXJyZW50VG9rZW4oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWwgPSB0b2tlbi52YWx1ZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcInNlbGVjdFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcInN1YlwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImlmXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZnVuY3Rpb25cIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJjbGFzc1wiOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIndpdGhcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJwcm9wZXJ0eVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsICE9IHN0YXJ0VG9rZW5WYWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlcy5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImRvXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXJ0VG9rZW5WYWx1ZSAhPSBcImxvb3BcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFuZ2VzLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRvRG91YmxlID0gdGhpcy4kaXNEb3VibGVLZXl3b3JkKHRva2VuLCBzdHJlYW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dFJhbmdlID0gKGRvRG91YmxlICYmIGRvRG91YmxlLnBvc2l0aW9uID09PSBcImZpcnN0XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gZG9Eb3VibGUucmFuZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBzdHJlYW0uZ2V0Q3VycmVudFRva2VuUmFuZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJsb29wXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXJ0VG9rZW5WYWx1ZSAhPSBcImRvXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlcy5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsb29wRG91YmxlID0gdGhpcy4kaXNEb3VibGVLZXl3b3JkKHRva2VuLCBzdHJlYW0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dFJhbmdlID0gKGxvb3BEb3VibGUgJiYgbG9vcERvdWJsZS5wb3NpdGlvbiA9PT0gXCJmaXJzdFwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGxvb3BEb3VibGUucmFuZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBzdHJlYW0uZ2V0Q3VycmVudFRva2VuUmFuZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJmb3JcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXJ0VG9rZW5WYWx1ZSAhPSBcIm5leHRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlcy5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIm5leHRcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXJ0VG9rZW5WYWx1ZSAhPSBcImZvclwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFuZ2VzLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwid2hpbGVcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXJ0VG9rZW5WYWx1ZSAhPSBcIndlbmRcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlcy5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIndlbmRcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXJ0VG9rZW5WYWx1ZSAhPSBcIndoaWxlXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYW5nZXMuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAobGV2ZWwgPT09IDApe1xuICAgICAgICAgICAgICAgICAgICBzdGFjay51bnNoaWZ0KHZhbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0b2tlbilcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuXG4gICAgICAgIGlmICh0b2tlblJhbmdlKSB7XG4gICAgICAgICAgICBpZiAoIW91dHB1dFJhbmdlKSB7XG4gICAgICAgICAgICAgICAgcmFuZ2VzLnB1c2goc3RyZWFtLmdldEN1cnJlbnRUb2tlblJhbmdlKCkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByYW5nZXMucHVzaChvdXRwdXRSYW5nZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmFuZ2VzO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHJvdyA9IHN0cmVhbS5nZXRDdXJyZW50VG9rZW5Sb3coKTtcbiAgICAgICAgaWYgKGRpciA9PT0gLTEpIHtcbiAgICAgICAgICAgIHZhciBlbmRDb2x1bW4gPSBzZXNzaW9uLmdldExpbmUocm93KS5sZW5ndGg7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFJhbmdlKHJvdywgZW5kQ29sdW1uLCBzdGFydFJvdyAtIDEsIHN0YXJ0Q29sdW1uKTtcbiAgICAgICAgfSBlbHNlXG4gICAgICAgICAgICByZXR1cm4gbmV3IFJhbmdlKHN0YXJ0Um93LCBzdGFydENvbHVtbiwgcm93IC0gMSwgc2Vzc2lvbi5nZXRMaW5lKHJvdyAtIDEpLmxlbmd0aCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7VG9rZW59IGN1cnJlbnRUb2tlblxuICAgICAqIEBwYXJhbSB7VG9rZW5JdGVyYXRvcn0gc3RyZWFtXG4gICAgICogQHJldHVybiB7ZmFsc2UgfCBcImlnbm9yZVwiIHwgeyByYW5nZTogUmFuZ2UsIHBvc2l0aW9uOiBcImZpcnN0XCIgfCBcInNlY29uZFwiLCBrZXl3b3JkOiBzdHJpbmcgfX1cbiAgICAgKi9cbiAgICB0aGlzLiRpc0RvdWJsZUtleXdvcmQgPSBmdW5jdGlvbiAoY3VycmVudFRva2VuLCBzdHJlYW0pIHtcbiAgICAgICAgdmFyIHZhbCA9IGN1cnJlbnRUb2tlbi52YWx1ZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICB2YXIgdG9rZW5JbmRleCA9IHN0cmVhbS4kdG9rZW5JbmRleDtcbiAgICAgICAgdmFyIHJvd1Rva2VucyA9IHN0cmVhbS4kcm93VG9rZW5zO1xuXG4gICAgICAgIHZhciBwcmV2S2V5d29yZEluZGV4ID0gdG9rZW5JbmRleCAtIDI7XG4gICAgICAgIHZhciBwcmV2S2V5d29yZCA9IHByZXZLZXl3b3JkSW5kZXggPj0gMCA/IHJvd1Rva2Vuc1twcmV2S2V5d29yZEluZGV4XSA6IG51bGw7XG4gICAgICAgIGlmIChwcmV2S2V5d29yZCkge1xuICAgICAgICAgICAgdmFyIHByZXZWYWwgPSBwcmV2S2V5d29yZC52YWx1ZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgICAgICAvLyBEbyBXaGlsZSAvIERvIFVudGlsXG4gICAgICAgICAgICBpZiAoKHZhbCA9PT0gXCJ3aGlsZVwiIHx8IHZhbCA9PT0gXCJ1bnRpbFwiKSAmJiBwcmV2VmFsID09PSBcImRvXCIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICByYW5nZTogdGhpcy4kZ2V0RG91YmxlS2V5d29yZFJhbmdlKHByZXZLZXl3b3JkSW5kZXgsIHRva2VuSW5kZXgsIHN0cmVhbSksXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBcInNlY29uZFwiLFxuICAgICAgICAgICAgICAgICAgICBrZXl3b3JkOiBcImRvXCJcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBMb29wIFdoaWxlIC8gTG9vcCBVbnRpbFxuICAgICAgICAgICAgaWYgKCh2YWwgPT09IFwid2hpbGVcIiB8fCB2YWwgPT09IFwidW50aWxcIikgJiYgcHJldlZhbCA9PT0gXCJsb29wXCIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICByYW5nZTogdGhpcy4kZ2V0RG91YmxlS2V5d29yZFJhbmdlKHByZXZLZXl3b3JkSW5kZXgsIHRva2VuSW5kZXgsIHN0cmVhbSksXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBcInNlY29uZFwiLFxuICAgICAgICAgICAgICAgICAgICBrZXl3b3JkOiBcImxvb3BcIlxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChwcmV2VmFsID09PSBcImV4aXRcIiAmJiAodmFsID09PSBcImZvclwiIHx8IHZhbCA9PT0gXCJkb1wiIHx8IHZhbCA9PT0gXCJzdWJcIiB8fCB2YWwgPT09IFwiZnVuY3Rpb25cIiB8fCB2YWwgPT09IFwicHJvcGVydHlcIikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJpZ25vcmVcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBuZXh0S2V5d29yZEluZGV4ID0gdG9rZW5JbmRleCArIDI7XG4gICAgICAgIHZhciBuZXh0S2V5d29yZCA9IG5leHRLZXl3b3JkSW5kZXggPCByb3dUb2tlbnMubGVuZ3RoID8gcm93VG9rZW5zW25leHRLZXl3b3JkSW5kZXhdIDogbnVsbDtcbiAgICAgICAgaWYgKG5leHRLZXl3b3JkKSB7XG4gICAgICAgICAgICB2YXIgbmV4dFZhbCA9IG5leHRLZXl3b3JkLnZhbHVlLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgICAgIC8vIERvIFdoaWxlIC8gRG8gVW50aWxcbiAgICAgICAgICAgIGlmICh2YWwgPT09IFwiZG9cIiAmJiAobmV4dFZhbCA9PT0gXCJ3aGlsZVwiIHx8IG5leHRWYWwgPT09IFwidW50aWxcIikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICByYW5nZTogdGhpcy4kZ2V0RG91YmxlS2V5d29yZFJhbmdlKHRva2VuSW5kZXgsIG5leHRLZXl3b3JkSW5kZXgsIHN0cmVhbSksXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBcImZpcnN0XCIsXG4gICAgICAgICAgICAgICAgICAgIGtleXdvcmQ6IFwiZG9cIlxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIExvb3AgV2hpbGUgLyBMb29wIFVudGlsXG4gICAgICAgICAgICBpZiAodmFsID09PSBcImxvb3BcIiAmJiAobmV4dFZhbCA9PT0gXCJ3aGlsZVwiIHx8IG5leHRWYWwgPT09IFwidW50aWxcIikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICByYW5nZTogdGhpcy4kZ2V0RG91YmxlS2V5d29yZFJhbmdlKHRva2VuSW5kZXgsIG5leHRLZXl3b3JkSW5kZXgsIHN0cmVhbSksXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBcImZpcnN0XCIsXG4gICAgICAgICAgICAgICAgICAgIGtleXdvcmQ6IFwibG9vcFwiXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHZhbCA9PT0gXCJleGl0XCIgJiYgKG5leHRWYWwgPT09IFwiZm9yXCIgfHwgbmV4dFZhbCA9PT0gXCJkb1wiIHx8IG5leHRWYWwgPT09IFwic3ViXCIgfHwgbmV4dFZhbCA9PT0gXCJmdW5jdGlvblwiIHx8IG5leHRWYWwgPT09IFwicHJvcGVydHlcIikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJpZ25vcmVcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ2FsY3VsYXRlIHJhbmdlIHNwYW5uaW5nIGJvdGggdG9rZW5zIG9mIGEgZG91YmxlIGtleXdvcmRcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZmlyc3RUb2tlbkluZGV4XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNlY29uZFRva2VuSW5kZXhcbiAgICAgKiBAcGFyYW0ge1Rva2VuSXRlcmF0b3J9IHN0cmVhbVxuICAgICAqIEByZXR1cm4ge1JhbmdlfVxuICAgICAqL1xuICAgIHRoaXMuJGdldERvdWJsZUtleXdvcmRSYW5nZSA9IGZ1bmN0aW9uIChmaXJzdFRva2VuSW5kZXgsIHNlY29uZFRva2VuSW5kZXgsIHN0cmVhbSkge1xuICAgICAgICB2YXIgcm93ID0gc3RyZWFtLiRyb3c7XG4gICAgICAgIHZhciByb3dUb2tlbnMgPSBzdHJlYW0uJHJvd1Rva2VucztcblxuICAgICAgICB2YXIgZmlyc3RTdGFydCA9IDA7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmlyc3RUb2tlbkluZGV4OyBpKyspIHtcbiAgICAgICAgICAgIGZpcnN0U3RhcnQgKz0gcm93VG9rZW5zW2ldLnZhbHVlLmxlbmd0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzZWNvbmRFbmQgPSAwO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8PSBzZWNvbmRUb2tlbkluZGV4OyBpKyspIHtcbiAgICAgICAgICAgIHNlY29uZEVuZCArPSByb3dUb2tlbnNbaV0udmFsdWUubGVuZ3RoO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShyb3csIGZpcnN0U3RhcnQsIHJvdywgc2Vjb25kRW5kKTtcbiAgICB9O1xuXG59KS5jYWxsKEZvbGRNb2RlLnByb3RvdHlwZSk7XG4iLCIvKlxuICBUSElTIEZJTEUgV0FTIEFVVE9HRU5FUkFURUQgQlkgbW9kZS50bXBsLmpzXG4qL1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRNb2RlID0gcmVxdWlyZShcIi4vdGV4dFwiKS5Nb2RlO1xudmFyIFZCU2NyaXB0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi92YnNjcmlwdF9oaWdobGlnaHRfcnVsZXNcIikuVkJTY3JpcHRIaWdobGlnaHRSdWxlcztcbnZhciBGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRpbmcvdmJzY3JpcHRcIikuRm9sZE1vZGU7XG52YXIgUmFuZ2UgPSByZXF1aXJlKFwiLi4vcmFuZ2VcIikuUmFuZ2U7XG5cbnZhciBNb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5IaWdobGlnaHRSdWxlcyA9IFZCU2NyaXB0SGlnaGxpZ2h0UnVsZXM7XG4gICAgdGhpcy5mb2xkaW5nUnVsZXMgPSBuZXcgRm9sZE1vZGUoKTtcbiAgICB0aGlzLiRiZWhhdmlvdXIgPSB0aGlzLiRkZWZhdWx0QmVoYXZpb3VyO1xuICAgIHRoaXMuaW5kZW50S2V5d29yZHMgPSB0aGlzLmZvbGRpbmdSdWxlcy5pbmRlbnRLZXl3b3Jkcztcbn07XG5vb3AuaW5oZXJpdHMoTW9kZSwgVGV4dE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG5cbiAgICB0aGlzLmxpbmVDb21tZW50U3RhcnQgPSBbXCInXCIsIFwiUkVNXCJdO1xuXG4gICAgdmFyIG91dGRlbnRLZXl3b3JkcyA9IFtcbiAgICAgICAgXCJlbHNlXCIsXG4gICAgICAgIFwiZWxzZWlmXCIsXG4gICAgICAgIFwiZW5kXCIsXG4gICAgICAgIFwibG9vcFwiLFxuICAgICAgICBcIm5leHRcIixcbiAgICAgICAgXCJ3ZW5kXCJcbiAgICBdO1xuXG4gICAgZnVuY3Rpb24gaXNTZWNvbmRPZkRvdWJsZUtleXdvcmQodG9rZW5zLCBpKSB7XG4gICAgICAgIHZhciB2YWwgPSB0b2tlbnNbaV0udmFsdWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgdmFyIHByZXZUb2tlbiA9IGkgPj0gMiA/IHRva2Vuc1tpIC0gMl0gOiBudWxsO1xuICAgICAgICBpZiAoIXByZXZUb2tlbikgcmV0dXJuIGZhbHNlO1xuICAgICAgICB2YXIgcHJldlZhbCA9IHByZXZUb2tlbi52YWx1ZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIC8vIERvIFdoaWxlIC8gRG8gVW50aWwgLyBMb29wIFdoaWxlIC8gTG9vcCBVbnRpbFxuICAgICAgICBpZiAoKHZhbCA9PT0gXCJ3aGlsZVwiIHx8IHZhbCA9PT0gXCJ1bnRpbFwiKSAmJiAocHJldlZhbCA9PT0gXCJkb1wiIHx8IHByZXZWYWwgPT09IFwibG9vcFwiKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgLy8gRXhpdCBGb3IgLyBFeGl0IERvIC8gRXhpdCBTdWIgLyBFeGl0IEZ1bmN0aW9uIC8gRXhpdCBQcm9wZXJ0eVxuICAgICAgICBpZiAocHJldlZhbCA9PT0gXCJleGl0XCIgJiYgKHZhbCA9PT0gXCJmb3JcIiB8fCB2YWwgPT09IFwiZG9cIiB8fCB2YWwgPT09IFwic3ViXCIgfHwgdmFsID09PSBcImZ1bmN0aW9uXCIgfHwgdmFsXG4gICAgICAgICAgICA9PT0gXCJwcm9wZXJ0eVwiKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldE5ldEluZGVudExldmVsKHRva2VucywgbGluZSwgaW5kZW50S2V5d29yZHMpIHtcbiAgICAgICAgdmFyIGxldmVsID0gMDtcbiAgICAgICAgLy8gU3VwcG9ydCBzaW5nbGUtbGluZSBibG9ja3MgYnkgZGVjcmVtZW50aW5nIHRoZSBpbmRlbnQgbGV2ZWwgaWZcbiAgICAgICAgLy8gYW4gZW5kaW5nIHRva2VuIGlzIGZvdW5kXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgdG9rZW4gPSB0b2tlbnNbaV07XG4gICAgICAgICAgICBpZiAodG9rZW4udHlwZSA9PSBcImtleXdvcmQuY29udHJvbC5hc3BcIiB8fCB0b2tlbi50eXBlID09IFwic3RvcmFnZS50eXBlLmZ1bmN0aW9uLmFzcFwiKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbCA9IHRva2VuLnZhbHVlLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgaWYgKHZhbCBpbiBpbmRlbnRLZXl3b3Jkcykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNTZWNvbmRPZkRvdWJsZUtleXdvcmQodG9rZW5zLCBpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoICh2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJwcm9wZXJ0eVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcInN1YlwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImZ1bmN0aW9uXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwic2VsZWN0XCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZG9cIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJmb3JcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgXCJjbGFzc1wiOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcIndoaWxlXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlIFwid2l0aFwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBcImlmXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNoZWNrVG9rZW4gPSBuZXcgUmVnRXhwKFwiXlxcXFxzKiBlbmRcXFxccytcIiArIHZhbCwgXCJpXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzaW5nbGVMaW5lQ29uZGl0aW9uID0gL15cXHMqSWZcXHMrLipcXHMrVGhlbig/IScpXFxzKyg/IScpXFxTL2kudGVzdChsaW5lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXNpbmdsZUxpbmVDb25kaXRpb24gJiYgIWNoZWNrVG9rZW4udGVzdChsaW5lKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV2ZWwgKz0gaW5kZW50S2V5d29yZHNbdmFsXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV2ZWwgKz0gaW5kZW50S2V5d29yZHNbdmFsXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBMaW1pdCB0aGUgbGV2ZWwgdG8gKy8tIDEgc2luY2UgdXN1YWxseSB1c2VycyBvbmx5IGluZGVudCBvbmUgbGV2ZWxcbiAgICAgICAgLy8gYXQgYSB0aW1lIHJlZ2FyZGxlc3Mgb2YgdGhlIGxvZ2ljYWwgbmVzdGluZyBsZXZlbFxuICAgICAgICBpZiAobGV2ZWwgPCAwKSB7XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH0gZWxzZSBpZiAobGV2ZWwgPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5nZXROZXh0TGluZUluZGVudCA9IGZ1bmN0aW9uKHN0YXRlLCBsaW5lLCB0YWIpIHtcbiAgICAgICAgdmFyIGluZGVudCA9IHRoaXMuJGdldEluZGVudChsaW5lKTtcbiAgICAgICAgdmFyIGxldmVsID0gMDtcblxuICAgICAgICB2YXIgdG9rZW5pemVkTGluZSA9IHRoaXMuZ2V0VG9rZW5pemVyKCkuZ2V0TGluZVRva2VucyhsaW5lLCBzdGF0ZSk7XG4gICAgICAgIHZhciB0b2tlbnMgPSB0b2tlbml6ZWRMaW5lLnRva2VucztcblxuICAgICAgICBpZiAoc3RhdGUgPT0gXCJzdGFydFwiKSB7XG4gICAgICAgICAgICBsZXZlbCA9IGdldE5ldEluZGVudExldmVsKHRva2VucywgbGluZSwgdGhpcy5pbmRlbnRLZXl3b3Jkcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxldmVsID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGluZGVudCArIHRhYjtcbiAgICAgICAgfSBlbHNlIGlmIChsZXZlbCA8IDAgJiYgaW5kZW50LnN1YnN0cihpbmRlbnQubGVuZ3RoIC0gdGFiLmxlbmd0aCkgPT0gdGFiKSB7XG4gICAgICAgICAgICAvLyBEb24ndCBkbyBhIG5leHQtbGluZSBvdXRkZW50IGlmIHdlJ3JlIGdvaW5nIHRvIGRvIGEgcmVhbCBvdXRkZW50IG9mIHRoaXMgbGluZVxuICAgICAgICAgICAgaWYgKCF0aGlzLmNoZWNrT3V0ZGVudChzdGF0ZSwgbGluZSwgXCJcXG5cIikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaW5kZW50LnN1YnN0cigwLCBpbmRlbnQubGVuZ3RoIC0gdGFiLmxlbmd0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGluZGVudDtcbiAgICB9O1xuXG4gICAgdGhpcy5jaGVja091dGRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgbGluZSwgaW5wdXQpIHtcbiAgICAgICAgaWYgKGlucHV0ICE9IFwiXFxuXCIgJiYgaW5wdXQgIT0gXCJcXHJcIiAmJiBpbnB1dCAhPSBcIlxcclxcblwiKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIHZhciB0b2tlbnMgPSB0aGlzLmdldFRva2VuaXplcigpLmdldExpbmVUb2tlbnMobGluZS50cmltKCksIHN0YXRlKS50b2tlbnM7XG5cbiAgICAgICAgaWYgKCF0b2tlbnMgfHwgIXRva2Vucy5sZW5ndGgpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIHZhciB2YWwgPSB0b2tlbnNbMF0udmFsdWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgcmV0dXJuICgodG9rZW5zWzBdLnR5cGUgPT0gXCJrZXl3b3JkLmNvbnRyb2wuYXNwXCIgfHwgdG9rZW5zWzBdLnR5cGUgPT0gXCJzdG9yYWdlLnR5cGUuZnVuY3Rpb24uYXNwXCIpICYmIG91dGRlbnRLZXl3b3Jkcy5pbmRleE9mKHZhbCkgIT0gLTEpO1xuICAgIH07XG5cbiAgICB0aGlzLmdldE1hdGNoaW5nID0gZnVuY3Rpb24oc2Vzc2lvbiwgcm93LCBjb2x1bW4sIHRva2VuUmFuZ2UpIHtcbiAgICAgICAgaWYgKHJvdyA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHZhciBwb3MgPSBzZXNzaW9uLnNlbGVjdGlvbi5sZWFkO1xuICAgICAgICAgICAgY29sdW1uID0gcG9zLmNvbHVtbjtcbiAgICAgICAgICAgIHJvdyA9IHBvcy5yb3c7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRva2VuUmFuZ2UgPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgdG9rZW5SYW5nZSA9IHRydWU7XG5cbiAgICAgICAgdmFyIHN0YXJ0VG9rZW4gPSBzZXNzaW9uLmdldFRva2VuQXQocm93LCBjb2x1bW4pO1xuICAgICAgICBpZiAoc3RhcnRUb2tlbikge1xuICAgICAgICAgICAgdmFyIHZhbCA9IHN0YXJ0VG9rZW4udmFsdWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGlmICgvXlxccyskLy50ZXN0KHZhbCkpIHtcbiAgICAgICAgICAgICAgICBjb2x1bW4gPSBjb2x1bW4gKyB2YWwubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHN0YXJ0VG9rZW4gPSBzZXNzaW9uLmdldFRva2VuQXQocm93LCBjb2x1bW4pO1xuICAgICAgICAgICAgICAgIGlmICghc3RhcnRUb2tlbikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhbCA9IHN0YXJ0VG9rZW4udmFsdWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh2YWwgaW4gdGhpcy5pbmRlbnRLZXl3b3JkcylcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5mb2xkaW5nUnVsZXMudmJzQmxvY2soc2Vzc2lvbiwgcm93LCBjb2x1bW4sIHRva2VuUmFuZ2UpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMuYXV0b091dGRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgc2Vzc2lvbiwgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgIHZhciBjb2x1bW4gPSBsaW5lLm1hdGNoKC9eXFxzKi8pWzBdLmxlbmd0aDtcbiAgICAgICAgaWYgKCFjb2x1bW4gfHwgIXJvdykgcmV0dXJuO1xuXG4gICAgICAgIHZhciBzdGFydFJhbmdlID0gdGhpcy5nZXRNYXRjaGluZyhzZXNzaW9uLCByb3csIGNvbHVtbiArIDEsIGZhbHNlKTtcbiAgICAgICAgaWYgKCFzdGFydFJhbmdlIHx8IHN0YXJ0UmFuZ2Uuc3RhcnQucm93ID09IHJvdylcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdmFyIGluZGVudCA9IHRoaXMuJGdldEluZGVudChzZXNzaW9uLmdldExpbmUoc3RhcnRSYW5nZS5zdGFydC5yb3cpKTtcbiAgICAgICAgaWYgKGluZGVudC5sZW5ndGggIT0gY29sdW1uKSB7XG4gICAgICAgICAgICBzZXNzaW9uLnJlcGxhY2UobmV3IFJhbmdlKHJvdywgMCwgcm93LCBjb2x1bW4pLCBpbmRlbnQpO1xuICAgICAgICAgICAgc2Vzc2lvbi5vdXRkZW50Um93cyhuZXcgUmFuZ2Uocm93ICsgMSwgMCwgcm93ICsgMSwgMCkpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMuJGlkID0gXCJhY2UvbW9kZS92YnNjcmlwdFwiO1xufSkuY2FsbChNb2RlLnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTW9kZSA9IE1vZGU7XG4iLCIvKlxuICBUSElTIEZJTEUgV0FTIEFVVE9HRU5FUkFURUQgQlkgbW9kZV9oaWdobGlnaHRfcnVsZXMudG1wbC5qcyAoVVVJRDogN0Y5QzkzNDMtRDQ4RS00RTdELUJGRTgtRjY4MDcxNERDRDNFKSAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcblxudmFyIFZCU2NyaXB0SGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbigpIHtcblxuICAgIHZhciBrZXl3b3JkTWFwcGVyID0gdGhpcy5jcmVhdGVLZXl3b3JkTWFwcGVyKHtcbiAgICAgICAgXCJrZXl3b3JkLmNvbnRyb2wuYXNwXCI6ICBcIklmfFRoZW58RWxzZXxFbHNlSWZ8RW5kfFdoaWxlfFdlbmR8Rm9yfFRvfEVhY2h8Q2FzZXxTZWxlY3R8UmV0dXJuXCJcbiAgICAgICAgICAgICsgXCJ8Q29udGludWV8RG98VW50aWx8TG9vcHxOZXh0fFdpdGh8RXhpdHxGdW5jdGlvbnxQcm9wZXJ0eXxUeXBlfEVudW18U3VifElJZnxDbGFzc1wiLFxuICAgICAgICBcInN0b3JhZ2UudHlwZS5hc3BcIjogXCJEaW18Q2FsbHxDb25zdHxSZWRpbXxTZXR8TGV0fEdldHxOZXd8UmFuZG9taXplfE9wdGlvbnxFeHBsaWNpdHxQcmVzZXJ2ZXxFcmFzZXxFeGVjdXRlfEV4ZWN1dGVHbG9iYWxcIixcbiAgICAgICAgXCJzdG9yYWdlLm1vZGlmaWVyLmFzcFwiOiBcIlByaXZhdGV8UHVibGljfERlZmF1bHRcIixcbiAgICAgICAgXCJrZXl3b3JkLm9wZXJhdG9yLmFzcFwiOiBcIk1vZHxBbmR8Tm90fE9yfFhvcnxBc3xFcXZ8SW1wfElzXCIsXG4gICAgICAgIFwiY29uc3RhbnQubGFuZ3VhZ2UuYXNwXCI6IFwiRW1wdHl8RmFsc2V8Tm90aGluZ3xOdWxsfFRydWVcIixcbiAgICAgICAgXCJ2YXJpYWJsZS5sYW5ndWFnZS52Yi5hc3BcIjogXCJNZVwiLFxuICAgICAgICBcInN1cHBvcnQuY2xhc3MudmIuYXNwXCI6IFwiUmVnRXhwXCIsXG4gICAgICAgIFwic3VwcG9ydC5jbGFzcy5hc3BcIjogXCJBcHBsaWNhdGlvbnxPYmplY3RDb250ZXh0fFJlcXVlc3R8UmVzcG9uc2V8U2VydmVyfFNlc3Npb25cIixcbiAgICAgICAgXCJzdXBwb3J0LmNsYXNzLmNvbGxlY3Rpb24uYXNwXCI6IFwiQ29udGVudHN8U3RhdGljT2JqZWN0c3xDbGllbnRDZXJ0aWZpY2F0ZXxDb29raWVzfEZvcm18UXVlcnlTdHJpbmd8U2VydmVyVmFyaWFibGVzXCIsXG4gICAgICAgIFwic3VwcG9ydC5jb25zdGFudC5hc3BcIjogXCJUb3RhbEJ5dGVzfEJ1ZmZlcnxDYWNoZUNvbnRyb2x8Q2hhcnNldHxDb250ZW50VHlwZXxFeHBpcmVzfEV4cGlyZXNBYnNvbHV0ZVwiXG4gICAgICAgICAgICArIFwifElzQ2xpZW50Q29ubmVjdGVkfFBJQ1N8U3RhdHVzfFNjcmlwdFRpbWVvdXR8Q29kZVBhZ2V8TENJRHxTZXNzaW9uSUR8VGltZW91dFwiLFxuICAgICAgICBcInN1cHBvcnQuZnVuY3Rpb24uYXNwXCI6IFwiTG9ja3xVbmxvY2t8U2V0QWJvcnR8U2V0Q29tcGxldGV8QmluYXJ5UmVhZHxBZGRIZWFkZXJ8QXBwZW5kVG9Mb2dcIlxuICAgICAgICAgICAgKyBcInxCaW5hcnlXcml0ZXxDbGVhcnxGbHVzaHxSZWRpcmVjdHxXcml0ZXxDcmVhdGVPYmplY3R8SFRNTEVuY29kZXxNYXBQYXRofFVSTEVuY29kZXxBYmFuZG9ufENvbnZlcnR8UmVnZXhcIixcbiAgICAgICAgXCJzdXBwb3J0LmZ1bmN0aW9uLmV2ZW50LmFzcFwiOiBcIkFwcGxpY2F0aW9uX09uRW5kfEFwcGxpY2F0aW9uX09uU3RhcnRcIlxuICAgICAgICAgICAgKyBcInxPblRyYW5zYWN0aW9uQWJvcnR8T25UcmFuc2FjdGlvbkNvbW1pdHxTZXNzaW9uX09uRW5kfFNlc3Npb25fT25TdGFydFwiLFxuICAgICAgICBcInN1cHBvcnQuZnVuY3Rpb24udmIuYXNwXCI6IFwiQXJyYXl8QWRkfEFzY3xBdG58Q0Jvb2x8Q0J5dGV8Q0N1cnxDRGF0ZXxDRGJsfENocnxDSW50fENMbmdcIlxuICAgICAgICAgICAgKyBcInxDb252ZXJzaW9uc3xDb3N8Q3JlYXRlT2JqZWN0fENTbmd8Q1N0cnxEYXRlfERhdGVBZGR8RGF0ZURpZmZ8RGF0ZVBhcnR8RGF0ZVNlcmlhbFwiXG4gICAgICAgICAgICArIFwifERhdGVWYWx1ZXxEYXl8RGVyaXZlZHxNYXRofEVzY2FwZXxFdmFsfEV4aXN0c3xFeHB8RmlsdGVyfEZvcm1hdEN1cnJlbmN5XCJcbiAgICAgICAgICAgICsgXCJ8Rm9ybWF0RGF0ZVRpbWV8Rm9ybWF0TnVtYmVyfEZvcm1hdFBlcmNlbnR8R2V0TG9jYWxlfEdldE9iamVjdHxHZXRSZWZ8SGV4XCJcbiAgICAgICAgICAgICsgXCJ8SG91cnxJbnB1dEJveHxJblN0cnxJblN0clJldnxJbnR8Rml4fElzQXJyYXl8SXNEYXRlfElzRW1wdHl8SXNOdWxsfElzTnVtZXJpY1wiXG4gICAgICAgICAgICArIFwifElzT2JqZWN0fEl0ZW18SXRlbXN8Sm9pbnxLZXlzfExCb3VuZHxMQ2FzZXxMZWZ0fExlbnxMb2FkUGljdHVyZXxMb2d8TFRyaW18UlRyaW1cIlxuICAgICAgICAgICAgKyBcInxUcmltfE1hdGhzfE1pZHxNaW51dGV8TW9udGh8TW9udGhOYW1lfE1zZ0JveHxOb3d8T2N0fFJlbW92ZXxSZW1vdmVBbGx8UmVwbGFjZVwiXG4gICAgICAgICAgICArIFwifFJHQnxSaWdodHxSbmR8Um91bmR8U2NyaXB0RW5naW5lfFNjcmlwdEVuZ2luZUJ1aWxkVmVyc2lvbnxTY3JpcHRFbmdpbmVNYWpvclZlcnNpb25cIlxuICAgICAgICAgICAgKyBcInxTY3JpcHRFbmdpbmVNaW5vclZlcnNpb258U2Vjb25kfFNldExvY2FsZXxTZ258U2lufFNwYWNlfFNwbGl0fFNxcnxTdHJDb21wfFN0cmluZ3xTdHJSZXZlcnNlXCJcbiAgICAgICAgICAgICsgXCJ8VGFufFRpbWV8VGltZXJ8VGltZVNlcmlhbHxUaW1lVmFsdWV8VHlwZU5hbWV8VUJvdW5kfFVDYXNlfFVuZXNjYXBlfFZhclR5cGV8V2Vla2RheXxXZWVrZGF5TmFtZXxZZWFyXCJcbiAgICAgICAgICAgICsgXCJ8QXNjQnxBc2NXfENockJ8Q2hyV3xJblN0ckJ8TGVmdEJ8TGVuQnxNaWRCfFJpZ2h0QnxBYnN8R2V0VUlMYW5ndWFnZVwiLFxuICAgICAgICBcInN1cHBvcnQudHlwZS52Yi5hc3BcIjogXCJ2YlRydWV8dmJGYWxzZXx2YkNyfHZiQ3JMZnx2YkZvcm1GZWVkfHZiTGZ8dmJOZXdMaW5lfHZiTnVsbENoYXJ8dmJOdWxsU3RyaW5nXCJcbiAgICAgICAgICAgICsgXCJ8dmJUYWJ8dmJWZXJ0aWNhbFRhYnx2YkJpbmFyeUNvbXBhcmV8dmJUZXh0Q29tcGFyZXx2YlN1bmRheXx2Yk1vbmRheXx2YlR1ZXNkYXl8dmJXZWRuZXNkYXlcIlxuICAgICAgICAgICAgKyBcInx2YlRodXJzZGF5fHZiRnJpZGF5fHZiU2F0dXJkYXl8dmJVc2VTeXN0ZW1EYXlPZldlZWt8dmJGaXJzdEphbjF8dmJGaXJzdEZvdXJEYXlzfHZiRmlyc3RGdWxsV2Vla1wiXG4gICAgICAgICAgICArIFwifHZiR2VuZXJhbERhdGV8dmJMb25nRGF0ZXx2YlNob3J0RGF0ZXx2YkxvbmdUaW1lfHZiU2hvcnRUaW1lfHZiT2JqZWN0RXJyb3J8dmJFbXB0eXx2Yk51bGx8dmJJbnRlZ2VyXCJcbiAgICAgICAgICAgICsgXCJ8dmJMb25nfHZiU2luZ2xlfHZiRG91YmxlfHZiQ3VycmVuY3l8dmJEYXRlfHZiU3RyaW5nfHZiT2JqZWN0fHZiRXJyb3J8dmJCb29sZWFufHZiVmFyaWFudFwiXG4gICAgICAgICAgICArIFwifHZiRGF0YU9iamVjdHx2YkRlY2ltYWx8dmJCeXRlfHZiQXJyYXl8dmJPS09ubHl8dmJPS0NhbmNlbHx2YkFib3J0UmV0cnlJZ25vcmV8dmJZZXNOb0NhbmNlbHx2Ylllc05vXCJcbiAgICAgICAgICAgICsgXCJ8dmJSZXRyeUNhbmNlbHx2YkNyaXRpY2FsfHZiUXVlc3Rpb258dmJFeGNsYW1hdGlvbnx2YkluZm9ybWF0aW9ufHZiRGVmYXVsdEJ1dHRvbjF8dmJEZWZhdWx0QnV0dG9uMlwiXG4gICAgICAgICAgICArIFwifHZiRGVmYXVsdEJ1dHRvbjN8dmJEZWZhdWx0QnV0dG9uNHx2YkFwcGxpY2F0aW9uTW9kYWx8dmJTeXN0ZW1Nb2RhbHx2Yk9LfHZiQ2FuY2VsfHZiQWJvcnR8dmJSZXRyeXx2Yklnbm9yZXx2Ylllc3x2Yk5vXCJcbiAgICAgICAgICAgICsgXCJ8dmJVc2VEZWZhdWx0XCJcbiAgICB9LCBcImlkZW50aWZpZXJcIiwgdHJ1ZSk7XG5cbiAgICB0aGlzLiRydWxlcyA9IHtcbiAgICBcInN0YXJ0XCI6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgdG9rZW46IFtcbiAgICAgICAgICAgICAgICBcIm1ldGEuZW5kaW5nLXNwYWNlXCJcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICByZWdleDogXCIkXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdG9rZW46IFtudWxsXSxcbiAgICAgICAgICAgIHJlZ2V4OiBcIl4oPz1cXFxcdClcIixcbiAgICAgICAgICAgIG5leHQ6IFwic3RhdGVfM1wiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuOiBbbnVsbF0sXG4gICAgICAgICAgICByZWdleDogXCJeKD89IClcIixcbiAgICAgICAgICAgIG5leHQ6IFwic3RhdGVfNFwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuOiBbXG4gICAgICAgICAgICAgICAgXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgXCJzdG9yYWdlLnR5cGUuZnVuY3Rpb24uYXNwXCIsXG4gICAgICAgICAgICAgICAgXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgXCJlbnRpdHkubmFtZS5mdW5jdGlvbi5hc3BcIixcbiAgICAgICAgICAgICAgICBcInRleHRcIixcbiAgICAgICAgICAgICAgICBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24ucGFyYW1ldGVycy5hc3BcIixcbiAgICAgICAgICAgICAgICBcInZhcmlhYmxlLnBhcmFtZXRlci5mdW5jdGlvbi5hc3BcIixcbiAgICAgICAgICAgICAgICBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24ucGFyYW1ldGVycy5hc3BcIlxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHJlZ2V4OiBcIl4oXFxcXHMqKShGdW5jdGlvbnxTdWIpKFxcXFxzKykoW2EtekEtWl9dXFxcXHcqKShcXFxccyopKFxcXFwoKShbXildKikoXFxcXCkpXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdG9rZW46IFwicHVuY3R1YXRpb24uZGVmaW5pdGlvbi5jb21tZW50LmFzcFwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiJ3xSRU0oPz1cXFxcc3wkKVwiLFxuICAgICAgICAgICAgbmV4dDogXCJjb21tZW50XCIsXG4gICAgICAgICAgICBjYXNlSW5zZW5zaXRpdmU6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdG9rZW46IFwic3RvcmFnZS50eXBlLmFzcFwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiT25cXFxccytFcnJvclxcXFxzKyg/OlJlc3VtZVxcXFxzK05leHR8R29UbylcXFxcYlwiLFxuICAgICAgICAgICAgY2FzZUluc2Vuc2l0aXZlOiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuOiBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24uc3RyaW5nLmJlZ2luLmFzcFwiLFxuICAgICAgICAgICAgcmVnZXg6ICdcIicsXG4gICAgICAgICAgICBuZXh0OiBcInN0cmluZ1wiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuOiBbXG4gICAgICAgICAgICAgICAgXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnZhcmlhYmxlLmFzcFwiXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgcmVnZXg6IFwiKFxcXFwkKVthLXpBLVpfeDdmLXhmZl1bYS16QS1aMC05X3g3Zi14ZmZdKj9cXFxcYlxcXFxzKlwiXG4gICAgICAgIH0sXG4vLyAgICAgICAge1xuLy8gICAgICAgICAgICB0b2tlbjogW1xuLy8gICAgICAgICAgICAgICAgXCJzdXBwb3J0LnR5cGUudmIuYXNwXCJcbi8vICAgICAgICAgICAgXSxcbi8vICAgICAgICAgICAgcmVnZXg6IFwiKD86KD88PWFzICkoXFxcXGJbYS16QS1aX3g3Zi14ZmZdW2EtekEtWjAtOV94N2YteGZmXSo/XFxcXGIpKVwiLCAvLyBFUlJPUjogVGhpcyBjb250YWlucyBhIGxvb2tiZWhpbmQsIHdoaWNoIEpTIGRvZXMgbm90IHN1cHBvcnQgOihcIlxuLy8gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lm51bWVyaWMuYXNwXCIsXG4gICAgICAgICAgICByZWdleDogXCItP1xcXFxiKD86KD86MCg/Onh8WClbMC05YS1mQS1GXSopfCg/Oig/OlswLTldK1xcXFwuP1swLTldKil8KD86XFxcXC5bMC05XSspKSg/Oig/OmV8RSkoPzpcXFxcK3wtKT9bMC05XSspPykoPzpMfGx8VUx8dWx8dXxVfEZ8Zik/XFxcXGJcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICByZWdleDogXCJcXFxcdytcIixcbiAgICAgICAgICAgIHRva2VuOiBrZXl3b3JkTWFwcGVyXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuOiBbXCJlbnRpdHkubmFtZS5mdW5jdGlvbi5hc3BcIl0sXG4gICAgICAgICAgICByZWdleDogXCIoPzooXFxcXGJbYS16QS1aX3g3Zi14ZmZdW2EtekEtWjAtOV94N2YteGZmXSo/XFxcXGIpKD89XFxcXChcXFxcKT8pKVwiXG4gICAgICAgIH0sXG4vLyAgICAgICAge1xuLy8gICAgICAgICAgICB0b2tlbjogW1xuLy8gICAgICAgICAgICAgICAgXCJ2YXJpYWJsZS5vdGhlci5hc3BcIlxuLy8gICAgICAgICAgICBdLFxuLy8gICAgICAgICAgICByZWdleDogXCIoPzooKD88PShcXFxcK3w9fC18XFxcXCZ8XFxcXFxcXFx8L3w8fD58XFxcXCh8LCkpXFxcXHMqXFxcXGIoW2EtekEtWl94N2YteGZmXVthLXpBLVowLTlfeDdmLXhmZl0qPylcXFxcYig/IShcXFxcKHxcXFxcLikpfFxcXFxiKFthLXpBLVpfeDdmLXhmZl1bYS16QS1aMC05X3g3Zi14ZmZdKj8pXFxcXGIoPz1cXFxccyooXFxcXCt8PXwtfFxcXFwmfFxcXFxcXFxcfC98PHw+fFxcXFwofFxcXFwpKSkpKVwiLCAvLyBFUlJPUjogVGhpcyBjb250YWlucyBhIGxvb2tiZWhpbmQsIHdoaWNoIEpTIGRvZXMgbm90IHN1cHBvcnQgOihcIlxuLy8gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuOiBbXCJrZXl3b3JkLm9wZXJhdG9yLmFzcFwiXSxcbiAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFwtfFxcXFwrfFxcXFwqfFxcXFwvfFxcXFw+fFxcXFw8fFxcXFw9fFxcXFwmfFxcXFxcXFxcfFxcXFxeXCJcbiAgICAgICAgfVxuICAgIF0sXG4gICAgXCJzdGF0ZV8zXCI6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgdG9rZW46IFtcbiAgICAgICAgICAgICAgICBcIm1ldGEub2RkLXRhYi50YWJzXCIsXG4gICAgICAgICAgICAgICAgXCJtZXRhLmV2ZW4tdGFiLnRhYnNcIlxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHJlZ2V4OiBcIihcXFxcdCkoXFxcXHQpP1wiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuOiBcIm1ldGEubGVhZGluZy1zcGFjZVwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiKD89W15cXFxcdF0pXCIsXG4gICAgICAgICAgICBuZXh0OiBcInN0YXJ0XCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdG9rZW46IFwibWV0YS5sZWFkaW5nLXNwYWNlXCIsXG4gICAgICAgICAgICByZWdleDogXCIuXCIsXG4gICAgICAgICAgICBuZXh0OiBcInN0YXRlXzNcIlxuICAgICAgICB9XG4gICAgXSxcbiAgICBcInN0YXRlXzRcIjogW1xuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbjogW1wibWV0YS5vZGQtdGFiLnNwYWNlc1wiLCBcIm1ldGEuZXZlbi10YWIuc3BhY2VzXCJdLFxuICAgICAgICAgICAgcmVnZXg6IFwiKCAgKSggICk/XCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdG9rZW46IFwibWV0YS5sZWFkaW5nLXNwYWNlXCIsXG4gICAgICAgICAgICByZWdleDogXCIoPz1bXiBdKVwiLFxuICAgICAgICAgICAgbmV4dDogXCJzdGFydFwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJtZXRhLmxlYWRpbmctc3BhY2VcIlxuICAgICAgICB9XG4gICAgXSxcbiAgICBcImNvbW1lbnRcIjogW1xuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbjogXCJjb21tZW50LmxpbmUuYXBvc3Ryb3BoZS5hc3BcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIiRcIixcbiAgICAgICAgICAgIG5leHQ6IFwic3RhcnRcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwiY29tbWVudC5saW5lLmFwb3N0cm9waGUuYXNwXCJcbiAgICAgICAgfVxuICAgIF0sXG4gICAgXCJzdHJpbmdcIjogW1xuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5jaGFyYWN0ZXIuZXNjYXBlLmFwb3N0cm9waGUuYXNwXCIsXG4gICAgICAgICAgICByZWdleDogJ1wiXCInXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuOiBcInN0cmluZy5xdW90ZWQuZG91YmxlLmFzcFwiLFxuICAgICAgICAgICAgcmVnZXg6ICdcIicsXG4gICAgICAgICAgICBuZXh0OiBcInN0YXJ0XCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInN0cmluZy5xdW90ZWQuZG91YmxlLmFzcFwiXG4gICAgICAgIH1cbiAgICBdXG59O1xuXG59O1xuXG5vb3AuaW5oZXJpdHMoVkJTY3JpcHRIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuZXhwb3J0cy5WQlNjcmlwdEhpZ2hsaWdodFJ1bGVzID0gVkJTY3JpcHRIaWdobGlnaHRSdWxlcztcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==