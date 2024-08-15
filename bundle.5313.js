"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[5313],{

/***/ 3719:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var BaseFoldMode = (__webpack_require__(51358).FoldMode);

var FoldMode = exports.l = function(markers) {
    this.foldingStartMarker = new RegExp("([\\[{])(?:\\s*)$|(" + markers + ")(?:\\s*)(?:#.*)?$");
};
oop.inherits(FoldMode, BaseFoldMode);

(function() {

    this.getFoldWidgetRange = function(session, foldStyle, row) {
        var line = session.getLine(row);
        var match = line.match(this.foldingStartMarker);
        if (match) {
            if (match[1])
                return this.openingBracketBlock(session, match[1], row, match.index);
            if (match[2])
                return this.indentationBlock(session, row, match.index + match[2].length);
            return this.indentationBlock(session, row);
        }
    };

}).call(FoldMode.prototype);


/***/ }),

/***/ 35313:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var PythonHighlightRules = (__webpack_require__(49318)/* .PythonHighlightRules */ .u);
var PythonFoldMode = (__webpack_require__(3719)/* .FoldMode */ .l);
var Range = (__webpack_require__(91902)/* .Range */ .Q);

var Mode = function() {
    this.HighlightRules = PythonHighlightRules;
    this.foldingRules = new PythonFoldMode("\\:");
    this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, TextMode);

(function() {

    this.lineCommentStart = "#";
    this.$pairQuotesAfter = {
        "'": /[ruf]/i,
        '"': /[ruf]/i
    };

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
        // outdenting in python is slightly different because it always applies
        // to the next line and only of a new line is inserted
        
        row += 1;
        var indent = this.$getIndent(doc.getLine(row));
        var tab = doc.getTabString();
        if (indent.slice(-tab.length) == tab)
            doc.remove(new Range(row, indent.length-tab.length, row, indent.length));
    };

    this.$id = "ace/mode/python";
    this.snippetFileId = "ace/snippets/python";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 49318:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/*
 * TODO: python delimiters
 */



var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

var PythonHighlightRules = function() {

    var keywords = (
        "and|as|assert|break|class|continue|def|del|elif|else|except|exec|" +
        "finally|for|from|global|if|import|in|is|lambda|not|or|pass|print|" +
        "raise|return|try|while|with|yield|async|await|nonlocal"
    );

    var builtinConstants = (
        "True|False|None|NotImplemented|Ellipsis|__debug__"
    );

    var builtinFunctions = (
        "abs|divmod|input|open|staticmethod|all|enumerate|int|ord|str|any|" +
        "eval|isinstance|pow|sum|basestring|execfile|issubclass|print|super|" +
        "binfile|bin|iter|property|tuple|bool|filter|len|range|type|bytearray|" +
        "float|list|raw_input|unichr|callable|format|locals|reduce|unicode|" +
        "chr|frozenset|long|reload|vars|classmethod|getattr|map|repr|xrange|" +
        "cmp|globals|max|reversed|zip|compile|hasattr|memoryview|round|" +
        "__import__|complex|hash|min|apply|delattr|help|next|setattr|set|" +
        "buffer|dict|hex|object|slice|coerce|dir|id|oct|sorted|intern|" +
        "ascii|breakpoint|bytes"
    );

    //var futureReserved = "";
    var keywordMapper = this.createKeywordMapper({
        "invalid.deprecated": "debugger",
        "support.function": builtinFunctions,
        "variable.language": "self|cls",
        "constant.language": builtinConstants,
        "keyword": keywords
    }, "identifier");

    var strPre = "[uU]?";
    var strRawPre = "[rR]";
    var strFormatPre = "[fF]";
    var strRawFormatPre = "(?:[rR][fF]|[fF][rR])";
    var decimalInteger = "(?:(?:[1-9]\\d*)|(?:0))";
    var octInteger = "(?:0[oO]?[0-7]+)";
    var hexInteger = "(?:0[xX][\\dA-Fa-f]+)";
    var binInteger = "(?:0[bB][01]+)";
    var integer = "(?:" + decimalInteger + "|" + octInteger + "|" + hexInteger + "|" + binInteger + ")";

    var exponent = "(?:[eE][+-]?\\d+)";
    var fraction = "(?:\\.\\d+)";
    var intPart = "(?:\\d+)";
    var pointFloat = "(?:(?:" + intPart + "?" + fraction + ")|(?:" + intPart + "\\.))";
    var exponentFloat = "(?:(?:" + pointFloat + "|" + intPart + ")" + exponent + ")";
    var floatNumber = "(?:" + exponentFloat + "|" + pointFloat + ")";

    var stringEscape = "\\\\(x[0-9A-Fa-f]{2}|[0-7]{3}|[\\\\abfnrtv'\"]|U[0-9A-Fa-f]{8}|u[0-9A-Fa-f]{4})";

    this.$rules = {
        "start" : [ {
            token : "comment",
            regex : "#.*$"
        }, {
            token : "string",           // multi line """ string start
            regex : strPre + '"{3}',
            next : "qqstring3"
        }, {
            token : "string",           // " string
            regex : strPre + '"(?=.)',
            next : "qqstring"
        }, {
            token : "string",           // multi line ''' string start
            regex : strPre + "'{3}",
            next : "qstring3"
        }, {
            token : "string",           // ' string
            regex : strPre + "'(?=.)",
            next : "qstring"
        }, {
            token: "string",
            regex: strRawPre + '"{3}',
            next: "rawqqstring3"
        }, {
            token: "string", 
            regex: strRawPre + '"(?=.)',
            next: "rawqqstring"
        }, {
            token: "string",
            regex: strRawPre + "'{3}",
            next: "rawqstring3"
        }, {
            token: "string",
            regex: strRawPre + "'(?=.)",
            next: "rawqstring"
        }, {
            token: "string",
            regex: strFormatPre + '"{3}',
            next: "fqqstring3"
        }, {
            token: "string",
            regex: strFormatPre + '"(?=.)',
            next: "fqqstring"
        }, {
            token: "string",
            regex: strFormatPre + "'{3}",
            next: "fqstring3"
        }, {
            token: "string",
            regex: strFormatPre + "'(?=.)",
            next: "fqstring"
        },{
            token: "string",
            regex: strRawFormatPre + '"{3}',
            next: "rfqqstring3"
        }, {
            token: "string",
            regex: strRawFormatPre + '"(?=.)',
            next: "rfqqstring"
        }, {
            token: "string",
            regex: strRawFormatPre + "'{3}",
            next: "rfqstring3"
        }, {
            token: "string",
            regex: strRawFormatPre + "'(?=.)",
            next: "rfqstring"
        }, {
            token: "keyword.operator",
            regex: "\\+|\\-|\\*|\\*\\*|\\/|\\/\\/|%|@|<<|>>|&|\\||\\^|~|<|>|<=|=>|==|!=|<>|="
        }, {
            token: "punctuation",
            regex: ",|:|;|\\->|\\+=|\\-=|\\*=|\\/=|\\/\\/=|%=|@=|&=|\\|=|^=|>>=|<<=|\\*\\*="
        }, {
            token: "paren.lparen",
            regex: "[\\[\\(\\{]"
        }, {
            token: "paren.rparen",
            regex: "[\\]\\)\\}]"
        }, {
            token: ["keyword", "text", "entity.name.function"],
            regex: "(def|class)(\\s+)([\\u00BF-\\u1FFF\\u2C00-\\uD7FF\\w]+)"
         }, {
            token: "text",
            regex: "\\s+"
        }, {
            include: "constants"
        }],
        "qqstring3": [{
            token: "constant.language.escape",
            regex: stringEscape
        }, {
            token: "string", // multi line """ string end
            regex: '"{3}',
            next: "start"
        }, {
            defaultToken: "string"
        }],
        "qstring3": [{
            token: "constant.language.escape",
            regex: stringEscape
        }, {
            token: "string",  // multi line ''' string end
            regex: "'{3}",
            next: "start"
        }, {
            defaultToken: "string"
        }],
        "qqstring": [{
            token: "constant.language.escape",
            regex: stringEscape
        }, {
            token: "string",
            regex: "\\\\$",
            next: "qqstring"
        }, {
            token: "string",
            regex: '"|$',
            next: "start"
        }, {
            defaultToken: "string"
        }],
        "qstring": [{
            token: "constant.language.escape",
            regex: stringEscape
        }, {
            token: "string",
            regex: "\\\\$",
            next: "qstring"
        }, {
            token: "string",
            regex: "'|$",
            next: "start"
        }, {
            defaultToken: "string"
        }],
        "rawqqstring3": [{
            token: "string", // multi line """ string end
            regex: '"{3}',
            next: "start"
        }, {
            defaultToken: "string"
        }],
        "rawqstring3": [{
            token: "string",  // multi line ''' string end
            regex: "'{3}",
            next: "start"
        }, {
            defaultToken: "string"
        }],
        "rawqqstring": [{
            token: "string",
            regex: "\\\\$",
            next: "rawqqstring"
        }, {
            token: "string",
            regex: '"|$',
            next: "start"
        }, {
            defaultToken: "string"
        }],
        "rawqstring": [{
            token: "string",
            regex: "\\\\$",
            next: "rawqstring"
        }, {
            token: "string",
            regex: "'|$",
            next: "start"
        }, {
            defaultToken: "string"
        }],
        "fqqstring3": [{
            token: "constant.language.escape",
            regex: stringEscape
        }, {
            token: "string", // multi line """ string end
            regex: '"{3}',
            next: "start"
        }, {
            token: "paren.lparen",
            regex: "{",
            push: "fqstringParRules"
        }, {
            defaultToken: "string"
        }],
        "fqstring3": [{
            token: "constant.language.escape",
            regex: stringEscape
        }, {
            token: "string",  // multi line ''' string end
            regex: "'{3}",
            next: "start"
        }, {
            token: "paren.lparen",
            regex: "{",
            push: "fqstringParRules"
        }, {
            defaultToken: "string"
        }],
        "fqqstring": [{
            token: "constant.language.escape",
            regex: stringEscape
        }, {
            token: "string",
            regex: "\\\\$",
            next: "fqqstring"
        }, {
            token: "string",
            regex: '"|$',
            next: "start"
        }, {
            token: "paren.lparen",
            regex: "{",
            push: "fqstringParRules"
        }, {
            defaultToken: "string"
        }],
        "fqstring": [{
            token: "constant.language.escape",
            regex: stringEscape
        }, {
            token: "string",
            regex: "'|$",
            next: "start"
        }, {
            token: "paren.lparen",
            regex: "{",
            push: "fqstringParRules"
        }, {
            defaultToken: "string"
        }],
        "rfqqstring3": [{
            token: "string", // multi line """ string end
            regex: '"{3}',
            next: "start"
        }, {
            token: "paren.lparen",
            regex: "{",
            push: "fqstringParRules"
        }, {
            defaultToken: "string"
        }],
        "rfqstring3": [{
            token: "string",  // multi line ''' string end
            regex: "'{3}",
            next: "start"
        }, {
            token: "paren.lparen",
            regex: "{",
            push: "fqstringParRules"
        }, {
            defaultToken: "string"
        }],
        "rfqqstring": [{
            token: "string",
            regex: "\\\\$",
            next: "rfqqstring"
        }, {
            token: "string",
            regex: '"|$',
            next: "start"
        }, {
            token: "paren.lparen",
            regex: "{",
            push: "fqstringParRules"
        }, {
            defaultToken: "string"
        }],
        "rfqstring": [{
            token: "string",
            regex: "'|$",
            next: "start"
        }, {
            token: "paren.lparen",
            regex: "{",
            push: "fqstringParRules"
        }, {
            defaultToken: "string"
        }],
        "fqstringParRules": [{//TODO: nested {}
            token: "paren.lparen",
            regex: "[\\[\\(]"
        }, {
            token: "paren.rparen",
            regex: "[\\]\\)]"
        }, {
            token: "string",
            regex: "\\s+"
        }, {
            token: "string",
            regex: "'[^']*'"
        }, {
            token: "string",
            regex: '"[^"]*"'
        }, {
            token: "function.support",
            regex: "(!s|!r|!a)"
        }, {
            include: "constants"
        },{
            token: 'paren.rparen',
            regex: "}",
            next: 'pop'
        },{
            token: 'paren.lparen',
            regex: "{",
            push: "fqstringParRules"
        }],
        "constants": [{
            token: "constant.numeric", // imaginary
            regex: "(?:" + floatNumber + "|\\d+)[jJ]\\b"
        }, {
            token: "constant.numeric", // float
            regex: floatNumber
        }, {
            token: "constant.numeric", // long integer
            regex: integer + "[lL]\\b"
        }, {
            token: "constant.numeric", // integer
            regex: integer + "\\b"
        }, {
            token: ["punctuation", "function.support"],// method
            regex: "(\\.)([a-zA-Z_]+)\\b"
        }, {
            token: keywordMapper,
            regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
        }]
    };
    this.normalizeRules();
};

oop.inherits(PythonHighlightRules, TextHighlightRules);

exports.u = PythonHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEVBQUU7QUFDeEI7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0Esc0JBQXNCLEVBQUU7QUFDeEI7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLHNCQUFzQixFQUFFO0FBQ3hCO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxzQkFBc0IsRUFBRTtBQUN4QjtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLHNCQUFzQixFQUFFO0FBQ3hCO0FBQ0EsU0FBUztBQUNUO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLHNCQUFzQixFQUFFO0FBQ3hCO0FBQ0EsU0FBUztBQUNUO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxxQkFBcUI7QUFDckI7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLHNCQUFzQixFQUFFO0FBQ3hCO0FBQ0EsU0FBUztBQUNUO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxzQkFBc0IsRUFBRTtBQUN4QjtBQUNBLFNBQVM7QUFDVDtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxxQkFBcUI7QUFDckI7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxxQkFBcUI7QUFDckI7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1QsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0EsU0FBUztBQUNUO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBOztBQUVBLFNBQTRCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9mb2xkaW5nL3B5dGhvbmljLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvcHl0aG9uLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvcHl0aG9uX2hpZ2hsaWdodF9ydWxlcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi8uLi9saWIvb29wXCIpO1xudmFyIEJhc2VGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRfbW9kZVwiKS5Gb2xkTW9kZTtcblxudmFyIEZvbGRNb2RlID0gZXhwb3J0cy5Gb2xkTW9kZSA9IGZ1bmN0aW9uKG1hcmtlcnMpIHtcbiAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlciA9IG5ldyBSZWdFeHAoXCIoW1xcXFxbe10pKD86XFxcXHMqKSR8KFwiICsgbWFya2VycyArIFwiKSg/OlxcXFxzKikoPzojLiopPyRcIik7XG59O1xub29wLmluaGVyaXRzKEZvbGRNb2RlLCBCYXNlRm9sZE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG5cbiAgICB0aGlzLmdldEZvbGRXaWRnZXRSYW5nZSA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgIHZhciBtYXRjaCA9IGxpbmUubWF0Y2godGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIpO1xuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIGlmIChtYXRjaFsxXSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5vcGVuaW5nQnJhY2tldEJsb2NrKHNlc3Npb24sIG1hdGNoWzFdLCByb3csIG1hdGNoLmluZGV4KTtcbiAgICAgICAgICAgIGlmIChtYXRjaFsyXSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pbmRlbnRhdGlvbkJsb2NrKHNlc3Npb24sIHJvdywgbWF0Y2guaW5kZXggKyBtYXRjaFsyXS5sZW5ndGgpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5kZW50YXRpb25CbG9jayhzZXNzaW9uLCByb3cpO1xuICAgICAgICB9XG4gICAgfTtcblxufSkuY2FsbChGb2xkTW9kZS5wcm90b3R5cGUpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0TW9kZSA9IHJlcXVpcmUoXCIuL3RleHRcIikuTW9kZTtcbnZhciBQeXRob25IaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3B5dGhvbl9oaWdobGlnaHRfcnVsZXNcIikuUHl0aG9uSGlnaGxpZ2h0UnVsZXM7XG52YXIgUHl0aG9uRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9mb2xkaW5nL3B5dGhvbmljXCIpLkZvbGRNb2RlO1xudmFyIFJhbmdlID0gcmVxdWlyZShcIi4uL3JhbmdlXCIpLlJhbmdlO1xuXG52YXIgTW9kZSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuSGlnaGxpZ2h0UnVsZXMgPSBQeXRob25IaWdobGlnaHRSdWxlcztcbiAgICB0aGlzLmZvbGRpbmdSdWxlcyA9IG5ldyBQeXRob25Gb2xkTW9kZShcIlxcXFw6XCIpO1xuICAgIHRoaXMuJGJlaGF2aW91ciA9IHRoaXMuJGRlZmF1bHRCZWhhdmlvdXI7XG59O1xub29wLmluaGVyaXRzKE1vZGUsIFRleHRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5saW5lQ29tbWVudFN0YXJ0ID0gXCIjXCI7XG4gICAgdGhpcy4kcGFpclF1b3Rlc0FmdGVyID0ge1xuICAgICAgICBcIidcIjogL1tydWZdL2ksXG4gICAgICAgICdcIic6IC9bcnVmXS9pXG4gICAgfTtcblxuICAgIHRoaXMuZ2V0TmV4dExpbmVJbmRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgbGluZSwgdGFiKSB7XG4gICAgICAgIHZhciBpbmRlbnQgPSB0aGlzLiRnZXRJbmRlbnQobGluZSk7XG5cbiAgICAgICAgdmFyIHRva2VuaXplZExpbmUgPSB0aGlzLmdldFRva2VuaXplcigpLmdldExpbmVUb2tlbnMobGluZSwgc3RhdGUpO1xuICAgICAgICB2YXIgdG9rZW5zID0gdG9rZW5pemVkTGluZS50b2tlbnM7XG5cbiAgICAgICAgaWYgKHRva2Vucy5sZW5ndGggJiYgdG9rZW5zW3Rva2Vucy5sZW5ndGgtMV0udHlwZSA9PSBcImNvbW1lbnRcIikge1xuICAgICAgICAgICAgcmV0dXJuIGluZGVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdGF0ZSA9PSBcInN0YXJ0XCIpIHtcbiAgICAgICAgICAgIHZhciBtYXRjaCA9IGxpbmUubWF0Y2goL14uKltcXHtcXChcXFs6XVxccyokLyk7XG4gICAgICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgICAgICBpbmRlbnQgKz0gdGFiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGluZGVudDtcbiAgICB9O1xuXG4gICAgdmFyIG91dGRlbnRzID0ge1xuICAgICAgICBcInBhc3NcIjogMSxcbiAgICAgICAgXCJyZXR1cm5cIjogMSxcbiAgICAgICAgXCJyYWlzZVwiOiAxLFxuICAgICAgICBcImJyZWFrXCI6IDEsXG4gICAgICAgIFwiY29udGludWVcIjogMVxuICAgIH07XG4gICAgXG4gICAgdGhpcy5jaGVja091dGRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgbGluZSwgaW5wdXQpIHtcbiAgICAgICAgaWYgKGlucHV0ICE9PSBcIlxcclxcblwiICYmIGlucHV0ICE9PSBcIlxcclwiICYmIGlucHV0ICE9PSBcIlxcblwiKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIHZhciB0b2tlbnMgPSB0aGlzLmdldFRva2VuaXplcigpLmdldExpbmVUb2tlbnMobGluZS50cmltKCksIHN0YXRlKS50b2tlbnM7XG4gICAgICAgIFxuICAgICAgICBpZiAoIXRva2VucylcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgXG4gICAgICAgIC8vIGlnbm9yZSB0cmFpbGluZyBjb21tZW50c1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICB2YXIgbGFzdCA9IHRva2Vucy5wb3AoKTtcbiAgICAgICAgfSB3aGlsZSAobGFzdCAmJiAobGFzdC50eXBlID09IFwiY29tbWVudFwiIHx8IChsYXN0LnR5cGUgPT0gXCJ0ZXh0XCIgJiYgbGFzdC52YWx1ZS5tYXRjaCgvXlxccyskLykpKSk7XG4gICAgICAgIFxuICAgICAgICBpZiAoIWxhc3QpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gKGxhc3QudHlwZSA9PSBcImtleXdvcmRcIiAmJiBvdXRkZW50c1tsYXN0LnZhbHVlXSk7XG4gICAgfTtcblxuICAgIHRoaXMuYXV0b091dGRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgZG9jLCByb3cpIHtcbiAgICAgICAgLy8gb3V0ZGVudGluZyBpbiBweXRob24gaXMgc2xpZ2h0bHkgZGlmZmVyZW50IGJlY2F1c2UgaXQgYWx3YXlzIGFwcGxpZXNcbiAgICAgICAgLy8gdG8gdGhlIG5leHQgbGluZSBhbmQgb25seSBvZiBhIG5ldyBsaW5lIGlzIGluc2VydGVkXG4gICAgICAgIFxuICAgICAgICByb3cgKz0gMTtcbiAgICAgICAgdmFyIGluZGVudCA9IHRoaXMuJGdldEluZGVudChkb2MuZ2V0TGluZShyb3cpKTtcbiAgICAgICAgdmFyIHRhYiA9IGRvYy5nZXRUYWJTdHJpbmcoKTtcbiAgICAgICAgaWYgKGluZGVudC5zbGljZSgtdGFiLmxlbmd0aCkgPT0gdGFiKVxuICAgICAgICAgICAgZG9jLnJlbW92ZShuZXcgUmFuZ2Uocm93LCBpbmRlbnQubGVuZ3RoLXRhYi5sZW5ndGgsIHJvdywgaW5kZW50Lmxlbmd0aCkpO1xuICAgIH07XG5cbiAgICB0aGlzLiRpZCA9IFwiYWNlL21vZGUvcHl0aG9uXCI7XG4gICAgdGhpcy5zbmlwcGV0RmlsZUlkID0gXCJhY2Uvc25pcHBldHMvcHl0aG9uXCI7XG59KS5jYWxsKE1vZGUucHJvdG90eXBlKTtcblxuZXhwb3J0cy5Nb2RlID0gTW9kZTtcbiIsIi8qXG4gKiBUT0RPOiBweXRob24gZGVsaW1pdGVyc1xuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xuXG52YXIgUHl0aG9uSGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbigpIHtcblxuICAgIHZhciBrZXl3b3JkcyA9IChcbiAgICAgICAgXCJhbmR8YXN8YXNzZXJ0fGJyZWFrfGNsYXNzfGNvbnRpbnVlfGRlZnxkZWx8ZWxpZnxlbHNlfGV4Y2VwdHxleGVjfFwiICtcbiAgICAgICAgXCJmaW5hbGx5fGZvcnxmcm9tfGdsb2JhbHxpZnxpbXBvcnR8aW58aXN8bGFtYmRhfG5vdHxvcnxwYXNzfHByaW50fFwiICtcbiAgICAgICAgXCJyYWlzZXxyZXR1cm58dHJ5fHdoaWxlfHdpdGh8eWllbGR8YXN5bmN8YXdhaXR8bm9ubG9jYWxcIlxuICAgICk7XG5cbiAgICB2YXIgYnVpbHRpbkNvbnN0YW50cyA9IChcbiAgICAgICAgXCJUcnVlfEZhbHNlfE5vbmV8Tm90SW1wbGVtZW50ZWR8RWxsaXBzaXN8X19kZWJ1Z19fXCJcbiAgICApO1xuXG4gICAgdmFyIGJ1aWx0aW5GdW5jdGlvbnMgPSAoXG4gICAgICAgIFwiYWJzfGRpdm1vZHxpbnB1dHxvcGVufHN0YXRpY21ldGhvZHxhbGx8ZW51bWVyYXRlfGludHxvcmR8c3RyfGFueXxcIiArXG4gICAgICAgIFwiZXZhbHxpc2luc3RhbmNlfHBvd3xzdW18YmFzZXN0cmluZ3xleGVjZmlsZXxpc3N1YmNsYXNzfHByaW50fHN1cGVyfFwiICtcbiAgICAgICAgXCJiaW5maWxlfGJpbnxpdGVyfHByb3BlcnR5fHR1cGxlfGJvb2x8ZmlsdGVyfGxlbnxyYW5nZXx0eXBlfGJ5dGVhcnJheXxcIiArXG4gICAgICAgIFwiZmxvYXR8bGlzdHxyYXdfaW5wdXR8dW5pY2hyfGNhbGxhYmxlfGZvcm1hdHxsb2NhbHN8cmVkdWNlfHVuaWNvZGV8XCIgK1xuICAgICAgICBcImNocnxmcm96ZW5zZXR8bG9uZ3xyZWxvYWR8dmFyc3xjbGFzc21ldGhvZHxnZXRhdHRyfG1hcHxyZXByfHhyYW5nZXxcIiArXG4gICAgICAgIFwiY21wfGdsb2JhbHN8bWF4fHJldmVyc2VkfHppcHxjb21waWxlfGhhc2F0dHJ8bWVtb3J5dmlld3xyb3VuZHxcIiArXG4gICAgICAgIFwiX19pbXBvcnRfX3xjb21wbGV4fGhhc2h8bWlufGFwcGx5fGRlbGF0dHJ8aGVscHxuZXh0fHNldGF0dHJ8c2V0fFwiICtcbiAgICAgICAgXCJidWZmZXJ8ZGljdHxoZXh8b2JqZWN0fHNsaWNlfGNvZXJjZXxkaXJ8aWR8b2N0fHNvcnRlZHxpbnRlcm58XCIgK1xuICAgICAgICBcImFzY2lpfGJyZWFrcG9pbnR8Ynl0ZXNcIlxuICAgICk7XG5cbiAgICAvL3ZhciBmdXR1cmVSZXNlcnZlZCA9IFwiXCI7XG4gICAgdmFyIGtleXdvcmRNYXBwZXIgPSB0aGlzLmNyZWF0ZUtleXdvcmRNYXBwZXIoe1xuICAgICAgICBcImludmFsaWQuZGVwcmVjYXRlZFwiOiBcImRlYnVnZ2VyXCIsXG4gICAgICAgIFwic3VwcG9ydC5mdW5jdGlvblwiOiBidWlsdGluRnVuY3Rpb25zLFxuICAgICAgICBcInZhcmlhYmxlLmxhbmd1YWdlXCI6IFwic2VsZnxjbHNcIixcbiAgICAgICAgXCJjb25zdGFudC5sYW5ndWFnZVwiOiBidWlsdGluQ29uc3RhbnRzLFxuICAgICAgICBcImtleXdvcmRcIjoga2V5d29yZHNcbiAgICB9LCBcImlkZW50aWZpZXJcIik7XG5cbiAgICB2YXIgc3RyUHJlID0gXCJbdVVdP1wiO1xuICAgIHZhciBzdHJSYXdQcmUgPSBcIltyUl1cIjtcbiAgICB2YXIgc3RyRm9ybWF0UHJlID0gXCJbZkZdXCI7XG4gICAgdmFyIHN0clJhd0Zvcm1hdFByZSA9IFwiKD86W3JSXVtmRl18W2ZGXVtyUl0pXCI7XG4gICAgdmFyIGRlY2ltYWxJbnRlZ2VyID0gXCIoPzooPzpbMS05XVxcXFxkKil8KD86MCkpXCI7XG4gICAgdmFyIG9jdEludGVnZXIgPSBcIig/OjBbb09dP1swLTddKylcIjtcbiAgICB2YXIgaGV4SW50ZWdlciA9IFwiKD86MFt4WF1bXFxcXGRBLUZhLWZdKylcIjtcbiAgICB2YXIgYmluSW50ZWdlciA9IFwiKD86MFtiQl1bMDFdKylcIjtcbiAgICB2YXIgaW50ZWdlciA9IFwiKD86XCIgKyBkZWNpbWFsSW50ZWdlciArIFwifFwiICsgb2N0SW50ZWdlciArIFwifFwiICsgaGV4SW50ZWdlciArIFwifFwiICsgYmluSW50ZWdlciArIFwiKVwiO1xuXG4gICAgdmFyIGV4cG9uZW50ID0gXCIoPzpbZUVdWystXT9cXFxcZCspXCI7XG4gICAgdmFyIGZyYWN0aW9uID0gXCIoPzpcXFxcLlxcXFxkKylcIjtcbiAgICB2YXIgaW50UGFydCA9IFwiKD86XFxcXGQrKVwiO1xuICAgIHZhciBwb2ludEZsb2F0ID0gXCIoPzooPzpcIiArIGludFBhcnQgKyBcIj9cIiArIGZyYWN0aW9uICsgXCIpfCg/OlwiICsgaW50UGFydCArIFwiXFxcXC4pKVwiO1xuICAgIHZhciBleHBvbmVudEZsb2F0ID0gXCIoPzooPzpcIiArIHBvaW50RmxvYXQgKyBcInxcIiArIGludFBhcnQgKyBcIilcIiArIGV4cG9uZW50ICsgXCIpXCI7XG4gICAgdmFyIGZsb2F0TnVtYmVyID0gXCIoPzpcIiArIGV4cG9uZW50RmxvYXQgKyBcInxcIiArIHBvaW50RmxvYXQgKyBcIilcIjtcblxuICAgIHZhciBzdHJpbmdFc2NhcGUgPSBcIlxcXFxcXFxcKHhbMC05QS1GYS1mXXsyfXxbMC03XXszfXxbXFxcXFxcXFxhYmZucnR2J1xcXCJdfFVbMC05QS1GYS1mXXs4fXx1WzAtOUEtRmEtZl17NH0pXCI7XG5cbiAgICB0aGlzLiRydWxlcyA9IHtcbiAgICAgICAgXCJzdGFydFwiIDogWyB7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudFwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIiMuKiRcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsICAgICAgICAgICAvLyBtdWx0aSBsaW5lIFwiXCJcIiBzdHJpbmcgc3RhcnRcbiAgICAgICAgICAgIHJlZ2V4IDogc3RyUHJlICsgJ1wiezN9JyxcbiAgICAgICAgICAgIG5leHQgOiBcInFxc3RyaW5nM1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIiwgICAgICAgICAgIC8vIFwiIHN0cmluZ1xuICAgICAgICAgICAgcmVnZXggOiBzdHJQcmUgKyAnXCIoPz0uKScsXG4gICAgICAgICAgICBuZXh0IDogXCJxcXN0cmluZ1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIiwgICAgICAgICAgIC8vIG11bHRpIGxpbmUgJycnIHN0cmluZyBzdGFydFxuICAgICAgICAgICAgcmVnZXggOiBzdHJQcmUgKyBcIid7M31cIixcbiAgICAgICAgICAgIG5leHQgOiBcInFzdHJpbmczXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLCAgICAgICAgICAgLy8gJyBzdHJpbmdcbiAgICAgICAgICAgIHJlZ2V4IDogc3RyUHJlICsgXCInKD89LilcIixcbiAgICAgICAgICAgIG5leHQgOiBcInFzdHJpbmdcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIHJlZ2V4OiBzdHJSYXdQcmUgKyAnXCJ7M30nLFxuICAgICAgICAgICAgbmV4dDogXCJyYXdxcXN0cmluZzNcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJzdHJpbmdcIiwgXG4gICAgICAgICAgICByZWdleDogc3RyUmF3UHJlICsgJ1wiKD89LiknLFxuICAgICAgICAgICAgbmV4dDogXCJyYXdxcXN0cmluZ1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgcmVnZXg6IHN0clJhd1ByZSArIFwiJ3szfVwiLFxuICAgICAgICAgICAgbmV4dDogXCJyYXdxc3RyaW5nM1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgcmVnZXg6IHN0clJhd1ByZSArIFwiJyg/PS4pXCIsXG4gICAgICAgICAgICBuZXh0OiBcInJhd3FzdHJpbmdcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIHJlZ2V4OiBzdHJGb3JtYXRQcmUgKyAnXCJ7M30nLFxuICAgICAgICAgICAgbmV4dDogXCJmcXFzdHJpbmczXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nXCIsXG4gICAgICAgICAgICByZWdleDogc3RyRm9ybWF0UHJlICsgJ1wiKD89LiknLFxuICAgICAgICAgICAgbmV4dDogXCJmcXFzdHJpbmdcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIHJlZ2V4OiBzdHJGb3JtYXRQcmUgKyBcIid7M31cIixcbiAgICAgICAgICAgIG5leHQ6IFwiZnFzdHJpbmczXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nXCIsXG4gICAgICAgICAgICByZWdleDogc3RyRm9ybWF0UHJlICsgXCInKD89LilcIixcbiAgICAgICAgICAgIG5leHQ6IFwiZnFzdHJpbmdcIlxuICAgICAgICB9LHtcbiAgICAgICAgICAgIHRva2VuOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgcmVnZXg6IHN0clJhd0Zvcm1hdFByZSArICdcInszfScsXG4gICAgICAgICAgICBuZXh0OiBcInJmcXFzdHJpbmczXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nXCIsXG4gICAgICAgICAgICByZWdleDogc3RyUmF3Rm9ybWF0UHJlICsgJ1wiKD89LiknLFxuICAgICAgICAgICAgbmV4dDogXCJyZnFxc3RyaW5nXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nXCIsXG4gICAgICAgICAgICByZWdleDogc3RyUmF3Rm9ybWF0UHJlICsgXCInezN9XCIsXG4gICAgICAgICAgICBuZXh0OiBcInJmcXN0cmluZzNcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIHJlZ2V4OiBzdHJSYXdGb3JtYXRQcmUgKyBcIicoPz0uKVwiLFxuICAgICAgICAgICAgbmV4dDogXCJyZnFzdHJpbmdcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJrZXl3b3JkLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICByZWdleDogXCJcXFxcK3xcXFxcLXxcXFxcKnxcXFxcKlxcXFwqfFxcXFwvfFxcXFwvXFxcXC98JXxAfDw8fD4+fCZ8XFxcXHx8XFxcXF58fnw8fD58PD18PT58PT18IT18PD58PVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInB1bmN0dWF0aW9uXCIsXG4gICAgICAgICAgICByZWdleDogXCIsfDp8O3xcXFxcLT58XFxcXCs9fFxcXFwtPXxcXFxcKj18XFxcXC89fFxcXFwvXFxcXC89fCU9fEA9fCY9fFxcXFx8PXxePXw+Pj18PDw9fFxcXFwqXFxcXCo9XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwicGFyZW4ubHBhcmVuXCIsXG4gICAgICAgICAgICByZWdleDogXCJbXFxcXFtcXFxcKFxcXFx7XVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInBhcmVuLnJwYXJlblwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiW1xcXFxdXFxcXClcXFxcfV1cIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogW1wia2V5d29yZFwiLCBcInRleHRcIiwgXCJlbnRpdHkubmFtZS5mdW5jdGlvblwiXSxcbiAgICAgICAgICAgIHJlZ2V4OiBcIihkZWZ8Y2xhc3MpKFxcXFxzKykoW1xcXFx1MDBCRi1cXFxcdTFGRkZcXFxcdTJDMDAtXFxcXHVEN0ZGXFxcXHddKylcIlxuICAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwidGV4dFwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiXFxcXHMrXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaW5jbHVkZTogXCJjb25zdGFudHNcIlxuICAgICAgICB9XSxcbiAgICAgICAgXCJxcXN0cmluZzNcIjogW3tcbiAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLFxuICAgICAgICAgICAgcmVnZXg6IHN0cmluZ0VzY2FwZVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJzdHJpbmdcIiwgLy8gbXVsdGkgbGluZSBcIlwiXCIgc3RyaW5nIGVuZFxuICAgICAgICAgICAgcmVnZXg6ICdcInszfScsXG4gICAgICAgICAgICBuZXh0OiBcInN0YXJ0XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInN0cmluZ1wiXG4gICAgICAgIH1dLFxuICAgICAgICBcInFzdHJpbmczXCI6IFt7XG4gICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIixcbiAgICAgICAgICAgIHJlZ2V4OiBzdHJpbmdFc2NhcGVcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nXCIsICAvLyBtdWx0aSBsaW5lICcnJyBzdHJpbmcgZW5kXG4gICAgICAgICAgICByZWdleDogXCInezN9XCIsXG4gICAgICAgICAgICBuZXh0OiBcInN0YXJ0XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInN0cmluZ1wiXG4gICAgICAgIH1dLFxuICAgICAgICBcInFxc3RyaW5nXCI6IFt7XG4gICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIixcbiAgICAgICAgICAgIHJlZ2V4OiBzdHJpbmdFc2NhcGVcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nXCIsXG4gICAgICAgICAgICByZWdleDogXCJcXFxcXFxcXCRcIixcbiAgICAgICAgICAgIG5leHQ6IFwicXFzdHJpbmdcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIHJlZ2V4OiAnXCJ8JCcsXG4gICAgICAgICAgICBuZXh0OiBcInN0YXJ0XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInN0cmluZ1wiXG4gICAgICAgIH1dLFxuICAgICAgICBcInFzdHJpbmdcIjogW3tcbiAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLFxuICAgICAgICAgICAgcmVnZXg6IHN0cmluZ0VzY2FwZVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFxcXFxcJFwiLFxuICAgICAgICAgICAgbmV4dDogXCJxc3RyaW5nXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nXCIsXG4gICAgICAgICAgICByZWdleDogXCInfCRcIixcbiAgICAgICAgICAgIG5leHQ6IFwic3RhcnRcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwic3RyaW5nXCJcbiAgICAgICAgfV0sXG4gICAgICAgIFwicmF3cXFzdHJpbmczXCI6IFt7XG4gICAgICAgICAgICB0b2tlbjogXCJzdHJpbmdcIiwgLy8gbXVsdGkgbGluZSBcIlwiXCIgc3RyaW5nIGVuZFxuICAgICAgICAgICAgcmVnZXg6ICdcInszfScsXG4gICAgICAgICAgICBuZXh0OiBcInN0YXJ0XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInN0cmluZ1wiXG4gICAgICAgIH1dLFxuICAgICAgICBcInJhd3FzdHJpbmczXCI6IFt7XG4gICAgICAgICAgICB0b2tlbjogXCJzdHJpbmdcIiwgIC8vIG11bHRpIGxpbmUgJycnIHN0cmluZyBlbmRcbiAgICAgICAgICAgIHJlZ2V4OiBcIid7M31cIixcbiAgICAgICAgICAgIG5leHQ6IFwic3RhcnRcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwic3RyaW5nXCJcbiAgICAgICAgfV0sXG4gICAgICAgIFwicmF3cXFzdHJpbmdcIjogW3tcbiAgICAgICAgICAgIHRva2VuOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgcmVnZXg6IFwiXFxcXFxcXFwkXCIsXG4gICAgICAgICAgICBuZXh0OiBcInJhd3Fxc3RyaW5nXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nXCIsXG4gICAgICAgICAgICByZWdleDogJ1wifCQnLFxuICAgICAgICAgICAgbmV4dDogXCJzdGFydFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzdHJpbmdcIlxuICAgICAgICB9XSxcbiAgICAgICAgXCJyYXdxc3RyaW5nXCI6IFt7XG4gICAgICAgICAgICB0b2tlbjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFxcXFxcJFwiLFxuICAgICAgICAgICAgbmV4dDogXCJyYXdxc3RyaW5nXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nXCIsXG4gICAgICAgICAgICByZWdleDogXCInfCRcIixcbiAgICAgICAgICAgIG5leHQ6IFwic3RhcnRcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwic3RyaW5nXCJcbiAgICAgICAgfV0sXG4gICAgICAgIFwiZnFxc3RyaW5nM1wiOiBbe1xuICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCIsXG4gICAgICAgICAgICByZWdleDogc3RyaW5nRXNjYXBlXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInN0cmluZ1wiLCAvLyBtdWx0aSBsaW5lIFwiXCJcIiBzdHJpbmcgZW5kXG4gICAgICAgICAgICByZWdleDogJ1wiezN9JyxcbiAgICAgICAgICAgIG5leHQ6IFwic3RhcnRcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJwYXJlbi5scGFyZW5cIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIntcIixcbiAgICAgICAgICAgIHB1c2g6IFwiZnFzdHJpbmdQYXJSdWxlc1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzdHJpbmdcIlxuICAgICAgICB9XSxcbiAgICAgICAgXCJmcXN0cmluZzNcIjogW3tcbiAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLFxuICAgICAgICAgICAgcmVnZXg6IHN0cmluZ0VzY2FwZVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJzdHJpbmdcIiwgIC8vIG11bHRpIGxpbmUgJycnIHN0cmluZyBlbmRcbiAgICAgICAgICAgIHJlZ2V4OiBcIid7M31cIixcbiAgICAgICAgICAgIG5leHQ6IFwic3RhcnRcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJwYXJlbi5scGFyZW5cIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIntcIixcbiAgICAgICAgICAgIHB1c2g6IFwiZnFzdHJpbmdQYXJSdWxlc1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzdHJpbmdcIlxuICAgICAgICB9XSxcbiAgICAgICAgXCJmcXFzdHJpbmdcIjogW3tcbiAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLFxuICAgICAgICAgICAgcmVnZXg6IHN0cmluZ0VzY2FwZVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFxcXFxcJFwiLFxuICAgICAgICAgICAgbmV4dDogXCJmcXFzdHJpbmdcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIHJlZ2V4OiAnXCJ8JCcsXG4gICAgICAgICAgICBuZXh0OiBcInN0YXJ0XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwicGFyZW4ubHBhcmVuXCIsXG4gICAgICAgICAgICByZWdleDogXCJ7XCIsXG4gICAgICAgICAgICBwdXNoOiBcImZxc3RyaW5nUGFyUnVsZXNcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwic3RyaW5nXCJcbiAgICAgICAgfV0sXG4gICAgICAgIFwiZnFzdHJpbmdcIjogW3tcbiAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLFxuICAgICAgICAgICAgcmVnZXg6IHN0cmluZ0VzY2FwZVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIid8JFwiLFxuICAgICAgICAgICAgbmV4dDogXCJzdGFydFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInBhcmVuLmxwYXJlblwiLFxuICAgICAgICAgICAgcmVnZXg6IFwie1wiLFxuICAgICAgICAgICAgcHVzaDogXCJmcXN0cmluZ1BhclJ1bGVzXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInN0cmluZ1wiXG4gICAgICAgIH1dLFxuICAgICAgICBcInJmcXFzdHJpbmczXCI6IFt7XG4gICAgICAgICAgICB0b2tlbjogXCJzdHJpbmdcIiwgLy8gbXVsdGkgbGluZSBcIlwiXCIgc3RyaW5nIGVuZFxuICAgICAgICAgICAgcmVnZXg6ICdcInszfScsXG4gICAgICAgICAgICBuZXh0OiBcInN0YXJ0XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwicGFyZW4ubHBhcmVuXCIsXG4gICAgICAgICAgICByZWdleDogXCJ7XCIsXG4gICAgICAgICAgICBwdXNoOiBcImZxc3RyaW5nUGFyUnVsZXNcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwic3RyaW5nXCJcbiAgICAgICAgfV0sXG4gICAgICAgIFwicmZxc3RyaW5nM1wiOiBbe1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nXCIsICAvLyBtdWx0aSBsaW5lICcnJyBzdHJpbmcgZW5kXG4gICAgICAgICAgICByZWdleDogXCInezN9XCIsXG4gICAgICAgICAgICBuZXh0OiBcInN0YXJ0XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwicGFyZW4ubHBhcmVuXCIsXG4gICAgICAgICAgICByZWdleDogXCJ7XCIsXG4gICAgICAgICAgICBwdXNoOiBcImZxc3RyaW5nUGFyUnVsZXNcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwic3RyaW5nXCJcbiAgICAgICAgfV0sXG4gICAgICAgIFwicmZxcXN0cmluZ1wiOiBbe1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nXCIsXG4gICAgICAgICAgICByZWdleDogXCJcXFxcXFxcXCRcIixcbiAgICAgICAgICAgIG5leHQ6IFwicmZxcXN0cmluZ1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgcmVnZXg6ICdcInwkJyxcbiAgICAgICAgICAgIG5leHQ6IFwic3RhcnRcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJwYXJlbi5scGFyZW5cIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIntcIixcbiAgICAgICAgICAgIHB1c2g6IFwiZnFzdHJpbmdQYXJSdWxlc1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzdHJpbmdcIlxuICAgICAgICB9XSxcbiAgICAgICAgXCJyZnFzdHJpbmdcIjogW3tcbiAgICAgICAgICAgIHRva2VuOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgcmVnZXg6IFwiJ3wkXCIsXG4gICAgICAgICAgICBuZXh0OiBcInN0YXJ0XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwicGFyZW4ubHBhcmVuXCIsXG4gICAgICAgICAgICByZWdleDogXCJ7XCIsXG4gICAgICAgICAgICBwdXNoOiBcImZxc3RyaW5nUGFyUnVsZXNcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwic3RyaW5nXCJcbiAgICAgICAgfV0sXG4gICAgICAgIFwiZnFzdHJpbmdQYXJSdWxlc1wiOiBbey8vVE9ETzogbmVzdGVkIHt9XG4gICAgICAgICAgICB0b2tlbjogXCJwYXJlbi5scGFyZW5cIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIltcXFxcW1xcXFwoXVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInBhcmVuLnJwYXJlblwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiW1xcXFxdXFxcXCldXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nXCIsXG4gICAgICAgICAgICByZWdleDogXCJcXFxccytcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIidbXiddKidcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIHJlZ2V4OiAnXCJbXlwiXSpcIidcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwiZnVuY3Rpb24uc3VwcG9ydFwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiKCFzfCFyfCFhKVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGluY2x1ZGU6IFwiY29uc3RhbnRzXCJcbiAgICAgICAgfSx7XG4gICAgICAgICAgICB0b2tlbjogJ3BhcmVuLnJwYXJlbicsXG4gICAgICAgICAgICByZWdleDogXCJ9XCIsXG4gICAgICAgICAgICBuZXh0OiAncG9wJ1xuICAgICAgICB9LHtcbiAgICAgICAgICAgIHRva2VuOiAncGFyZW4ubHBhcmVuJyxcbiAgICAgICAgICAgIHJlZ2V4OiBcIntcIixcbiAgICAgICAgICAgIHB1c2g6IFwiZnFzdHJpbmdQYXJSdWxlc1wiXG4gICAgICAgIH1dLFxuICAgICAgICBcImNvbnN0YW50c1wiOiBbe1xuICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQubnVtZXJpY1wiLCAvLyBpbWFnaW5hcnlcbiAgICAgICAgICAgIHJlZ2V4OiBcIig/OlwiICsgZmxvYXROdW1iZXIgKyBcInxcXFxcZCspW2pKXVxcXFxiXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQubnVtZXJpY1wiLCAvLyBmbG9hdFxuICAgICAgICAgICAgcmVnZXg6IGZsb2F0TnVtYmVyXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lm51bWVyaWNcIiwgLy8gbG9uZyBpbnRlZ2VyXG4gICAgICAgICAgICByZWdleDogaW50ZWdlciArIFwiW2xMXVxcXFxiXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQubnVtZXJpY1wiLCAvLyBpbnRlZ2VyXG4gICAgICAgICAgICByZWdleDogaW50ZWdlciArIFwiXFxcXGJcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogW1wicHVuY3R1YXRpb25cIiwgXCJmdW5jdGlvbi5zdXBwb3J0XCJdLC8vIG1ldGhvZFxuICAgICAgICAgICAgcmVnZXg6IFwiKFxcXFwuKShbYS16QS1aX10rKVxcXFxiXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IGtleXdvcmRNYXBwZXIsXG4gICAgICAgICAgICByZWdleDogXCJbYS16QS1aXyRdW2EtekEtWjAtOV8kXSpcXFxcYlwiXG4gICAgICAgIH1dXG4gICAgfTtcbiAgICB0aGlzLm5vcm1hbGl6ZVJ1bGVzKCk7XG59O1xuXG5vb3AuaW5oZXJpdHMoUHl0aG9uSGlnaGxpZ2h0UnVsZXMsIFRleHRIaWdobGlnaHRSdWxlcyk7XG5cbmV4cG9ydHMuUHl0aG9uSGlnaGxpZ2h0UnVsZXMgPSBQeXRob25IaWdobGlnaHRSdWxlcztcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==