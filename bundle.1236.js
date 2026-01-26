"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[1236],{

/***/ 52930:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
const {FoldMode: MixedFoldMode} = __webpack_require__(90610);
var HtmlFoldMode = (__webpack_require__(6944).FoldMode);
var Range = (__webpack_require__(91902)/* .Range */ .Q);
var TokenIterator = (__webpack_require__(99339).TokenIterator);


var FoldMode = exports.l = function (voidElements, optionalTags) {
    HtmlFoldMode.call(this, voidElements, optionalTags);
};

oop.inherits(FoldMode, HtmlFoldMode);

(function () {//TODO: set|endset
    this.getFoldWidgetRangeBase = this.getFoldWidgetRange;
    this.getFoldWidgetBase = this.getFoldWidget;

    this.indentKeywords = {
        "block": 1,
        "if": 1,
        "for": 1,
        "asyncEach": 1,
        "asyncAll": 1,
        "macro": 1,
        "filter": 1,
        "call": 1,
        "else": 0,
        "elif": 0,
        "set": 1,
        "endblock": -1,
        "endif": -1,
        "endfor": -1,
        "endeach": -1,
        "endall": -1,
        "endmacro": -1,
        "endfilter": -1,
        "endcall": -1,
        "endset": -1
    };

    this.foldingStartMarkerNunjucks = /(?:\{%-?\s*)(?:(block|if|else|elif|for|asyncEach|asyncAll|macro|filter|call)\b.*)|(?:\bset(?:[^=]*))(?=%})/i;
    this.foldingStopMarkerNunjucks = /(?:\{%-?\s*)(endblock|endif|endfor|endeach|endall|endmacro|endfilter|endcall|endset)\b.*(?=%})/i;

    this.getFoldWidgetRange = function (session, foldStyle, row) {
        var line = session.doc.getLine(row);
        let offset = calculateOffset(this.foldingStartMarkerNunjucks, line);
        if (offset) {
            return this.nunjucksBlock(session, row, offset);
        }

        offset = calculateOffset(this.foldingStopMarkerNunjucks, line);
        if (offset) {
            return this.nunjucksBlock(session, row, offset);
        }
        return this.getFoldWidgetRangeBase(session, foldStyle, row);
    };

    /**
     *
     * @param {RegExp} regExp
     * @param line
     * @return {*}
     */
    function calculateOffset(regExp, line) {
        var match = regExp.exec(line);
        if (match) {
            var keyword = match[0].includes("set") ? "set" : match[1].toLowerCase();
            if (keyword) {
                var offsetInMatch = match[0].toLowerCase().indexOf(keyword);
                return match.index + offsetInMatch + 1;
            }
        }
    }

    // must return "" if there's no fold, to enable caching
    this.getFoldWidget = function (session, foldStyle, row) {
        var line = session.getLine(row);
        var isStart = this.foldingStartMarkerNunjucks.test(line);
        var isEnd = this.foldingStopMarkerNunjucks.test(line);
        if (isStart && !isEnd) {
            var offset = calculateOffset(this.foldingStartMarkerNunjucks, line);
            if (offset) {
                var type = session.getTokenAt(row, offset).type;
                if (type === "keyword.control") {
                    return "start";
                }
            }
        }
        if (isEnd && !isStart && foldStyle === "markbeginend") {
            var offset = calculateOffset(this.foldingStopMarkerNunjucks, line);
            if (offset) {
                var type = session.getTokenAt(row, offset).type;
                if (type === "keyword.control") {
                    return "end";
                }
            }
        }
        return this.getFoldWidgetBase(session, foldStyle, row);
    };

    /**
     *
     * @param {TokenIterator} stream
     */
    function getTokenPosition(stream, findStart) {
        let token;
        const currentIndex = stream.$tokenIndex;
        const type = findStart ? "punctuation.begin" : "punctuation.end";
        stream.step = findStart ? stream.stepBackward : stream.stepForward;
        while (token = stream.step()) {
            if (token.type !== type) continue;
            break;
        }
        if (!token) return;
        let pos = stream.getCurrentTokenPosition();
        if (!findStart) {
            pos.column = pos.column + token.value.length;
        }
        stream.$tokenIndex = currentIndex;
        return pos;
    }

    this.nunjucksBlock = function (session, row, column) {
        var stream = new TokenIterator(session, row, column);

        var token = stream.getCurrentToken();
        if (!token || token.type != "keyword.control") return;

        var val = token.value;
        var stack = [val];
        var dir = this.indentKeywords[val];

        if (val === "else" || val === "elif") {
            dir = 1;
        }

        if (!dir) return;

        var start = getTokenPosition(stream, dir === -1);

        if (!token) return;

        stream.step = dir === -1 ? stream.stepBackward : stream.stepForward;
        while (token = stream.step()) {
            if (token.type !== "keyword.control") continue;
            var level = dir * this.indentKeywords[token.value];

            if (token.value === "set") {
                var tokenPos = stream.getCurrentTokenPosition();
                var line = session.getLine(tokenPos.row).substring(tokenPos.column);
                if (!/^[^=]*%}/.test(line)) {
                    continue;
                }
            }
            if (level > 0) {
                stack.unshift(token.value);
            }
            else if (level <= 0) {
                stack.shift();
                if (!stack.length) break;
                if (level === 0) stack.unshift(token.value);
            }
        }

        if (!token) return null;

        var end = getTokenPosition(stream, dir === 1);
        return dir === 1 ? Range.fromPoints(start, end) : Range.fromPoints(end, start);
    };

}).call(FoldMode.prototype);


/***/ }),

/***/ 1236:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var NunjucksFoldMode = (__webpack_require__(52930)/* .FoldMode */ .l);
var lang = __webpack_require__(39955);
var HtmlMode = (__webpack_require__(32234).Mode);
var NunjucksHighlightRules = (__webpack_require__(14615)/* .NunjucksHighlightRules */ .D);

// http://www.w3.org/TR/html5/syntax.html#void-elements
var voidElements = [
    "area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "meta", "menuitem", "param", "source",
    "track", "wbr"
];
var optionalEndTags = ["li", "dt", "dd", "p", "rt", "rp", "optgroup", "option", "colgroup", "td", "th"];

var Mode = function () {
    this.HighlightRules = NunjucksHighlightRules;
    this.foldingRules = new NunjucksFoldMode(this.voidElements, lang.arrayToMap(optionalEndTags));
};

oop.inherits(Mode, HtmlMode);

(function () {
    this.$id = "ace/mode/nunjucks";
    this.voidElements = lang.arrayToMap(voidElements);

}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 14615:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);
var HtmlHighlightRules = (__webpack_require__(10413).HtmlHighlightRules);

var NunjucksHighlightRules = function() {
    HtmlHighlightRules.call(this);
    this.$rules["start"].unshift({
        token: "punctuation.begin",
        regex: /{{-?/,
        push: [{
            token: "punctuation.end",
            regex: /-?}}/,
            next: "pop"
        },
            {include: "expression"}
        ]
    }, {
        token: "punctuation.begin",
        regex: /{%-?/,
        push: [{
            token: "punctuation.end",
            regex: /-?%}/,
            next: "pop"
        }, {
            token: "constant.language.escape",
            regex: /\b(r\/.*\/[gimy]?)\b/
        },
            {include: "statement"}
        ]
    }, {
        token: "comment.begin",
        regex: /{#/,
        push: [{
            token: "comment.end",
            regex: /#}/,
            next: "pop"
        },
            {defaultToken: "comment"}
        ]
    });
    this.addRules({
        attribute_value: [{
            token: "string.attribute-value.xml",
            regex: "'",
            push: [
                {token: "string.attribute-value.xml", regex: "'", next: "pop"},
                {
                    token: "punctuation.begin",
                    regex: /{{-?/,
                    push: [{
                        token: "punctuation.end",
                        regex: /-?}}/,
                        next: "pop"
                    },
                        {include: "expression"}
                    ]
                },
                {include: "attr_reference"},
                {defaultToken: "string.attribute-value.xml"}
            ]
        }, {
            token: "string.attribute-value.xml",
            regex: '"',
            push: [
                {token: "string.attribute-value.xml", regex: '"', next: "pop"},
                {
                    token: "punctuation.begin",
                    regex: /{{-?/,
                    push: [{
                        token: "punctuation.end",
                        regex: /-?}}/,
                        next: "pop"
                    },
                        {include: "expression"}
                    ]
                },
                {include: "attr_reference"},
                {defaultToken: "string.attribute-value.xml"}
            ]
        }],
        "statement": [{
            token: "keyword.control",
            regex: /\b(block|endblock|extends|endif|elif|for|endfor|asyncEach|endeach|include|asyncAll|endall|macro|endmacro|set|endset|ignore missing|as|from|raw|verbatim|filter|endfilter)\b/
        },
            {include: "expression"}
        ],
        "expression": [{
            token: "constant.language",
            regex: /\b(true|false|none)\b/
        }, {
            token: "string",
            regex: /"/,
            push: [{
                token: "string",
                regex: /"/,
                next: "pop"
            },
                {include: "escapeStrings"},
                {defaultToken: "string"}
            ]
        }, {
            token: "string",
            regex: /'/,
            push: [{
                token: "string",
                regex: /'/,
                next: "pop"
            },
                {include: "escapeStrings"},
                {defaultToken: "string"}
            ]
        }, {
            token: "constant.numeric", // hexadecimal, octal and binary
            regex: /0(?:[xX][0-9a-fA-F]+|[oO][0-7]+|[bB][01]+)\b/
        }, {
            token: "constant.numeric", // decimal integers and floats
            regex: /(?:\d\d*(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+\b)?/
        }, {
            token: "keyword.operator",
            regex: /\+|-|\/\/|\/|%|\*\*|\*|===|==|!==|!=|>=|>|<=|</
        }, {
            token: "keyword.control",
            regex: /\b(and|else|if|in|import|not|or)\b/
        }, {
            token: "support.function",
            regex: /[a-zA-Z_]+(?=\()/
        }, {
            token: "paren.lpar",
            regex: /[(\[{]/
        }, {
            token: "paren.rpar",
            regex: /[)\]}]/
        }, {
            token: "punctuation",
            regex: /[,]/
        }, {
            token: ["punctuation", "support.function"],
            regex: /(\.)([a-zA-Z_][a-zA-Z0-9_]*)(?=\()/
        }, {
            token: ["punctuation", "variable.parameter"],
            regex: /(\.)([a-zA-Z_][a-zA-Z0-9_]*)/
        }, {
            token: ["punctuation", "text", "support.other"],
            regex: /(\|)(\s)*([a-zA-Z_][a-zA-Z0-9_]*)/
        }, {
            token: "variable",
            regex: /[a-zA-Z_][a-zA-Z0-9_]*/
        }
        ],
        "escapeStrings": [{
            token: "constant.language.escape",
            regex: /(\\\\n)|(\\\\)|(\\")|(\\')|(\\a)|(\\b)|(\\f)|(\\n)|(\\r)|(\\t)|(\\v)/
        }, {
            token: "constant.language.escape",
            regex: /\\(?:x[0-9A-F]{2}|(?:U[0-9A-Fa-f]{8})|(?:u[0-9A-Fa-f]{4})|(?:N{[a-zA-Z ]+}))/
        }]
    });

    this.normalizeRules();
};

oop.inherits(NunjucksHighlightRules, TextHighlightRules);

exports.D = NunjucksHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0EsaUJBQWlCLDZEQUE2RDtBQUM5RTtBQUNBO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQSxvQ0FBb0M7QUFDcEM7QUFDQSxxQkFBcUI7QUFDckIseUJBQXlCO0FBQ3pCO0FBQ0EsaUJBQWlCO0FBQ2pCLGlCQUFpQiwwQkFBMEI7QUFDM0MsaUJBQWlCO0FBQ2pCO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLGlCQUFpQix5QkFBeUI7QUFDMUMsaUJBQWlCO0FBQ2pCO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixpQkFBaUIseUJBQXlCO0FBQzFDLGlCQUFpQjtBQUNqQjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSx5QkFBeUI7QUFDekIsU0FBUztBQUNUO0FBQ0EseUJBQXlCO0FBQ3pCLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsbUNBQW1DLEVBQUUsaUJBQWlCLEVBQUUsa0JBQWtCLEVBQUUsT0FBTyxXQUFXO0FBQzlGLFNBQVM7QUFDVCxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7O0FBRUEsU0FBOEIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2ZvbGRpbmcvbnVuanVja3MuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9udW5qdWNrcy5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL251bmp1Y2tzX2hpZ2hsaWdodF9ydWxlcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi8uLi9saWIvb29wXCIpO1xuY29uc3Qge0ZvbGRNb2RlOiBNaXhlZEZvbGRNb2RlfSA9IHJlcXVpcmUoXCIuL21peGVkXCIpO1xudmFyIEh0bWxGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2h0bWxcIikuRm9sZE1vZGU7XG52YXIgUmFuZ2UgPSByZXF1aXJlKFwiLi4vLi4vcmFuZ2VcIikuUmFuZ2U7XG52YXIgVG9rZW5JdGVyYXRvciA9IHJlcXVpcmUoXCIuLi8uLi90b2tlbl9pdGVyYXRvclwiKS5Ub2tlbkl0ZXJhdG9yO1xuXG5cbnZhciBGb2xkTW9kZSA9IGV4cG9ydHMuRm9sZE1vZGUgPSBmdW5jdGlvbiAodm9pZEVsZW1lbnRzLCBvcHRpb25hbFRhZ3MpIHtcbiAgICBIdG1sRm9sZE1vZGUuY2FsbCh0aGlzLCB2b2lkRWxlbWVudHMsIG9wdGlvbmFsVGFncyk7XG59O1xuXG5vb3AuaW5oZXJpdHMoRm9sZE1vZGUsIEh0bWxGb2xkTW9kZSk7XG5cbihmdW5jdGlvbiAoKSB7Ly9UT0RPOiBzZXR8ZW5kc2V0XG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0UmFuZ2VCYXNlID0gdGhpcy5nZXRGb2xkV2lkZ2V0UmFuZ2U7XG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0QmFzZSA9IHRoaXMuZ2V0Rm9sZFdpZGdldDtcblxuICAgIHRoaXMuaW5kZW50S2V5d29yZHMgPSB7XG4gICAgICAgIFwiYmxvY2tcIjogMSxcbiAgICAgICAgXCJpZlwiOiAxLFxuICAgICAgICBcImZvclwiOiAxLFxuICAgICAgICBcImFzeW5jRWFjaFwiOiAxLFxuICAgICAgICBcImFzeW5jQWxsXCI6IDEsXG4gICAgICAgIFwibWFjcm9cIjogMSxcbiAgICAgICAgXCJmaWx0ZXJcIjogMSxcbiAgICAgICAgXCJjYWxsXCI6IDEsXG4gICAgICAgIFwiZWxzZVwiOiAwLFxuICAgICAgICBcImVsaWZcIjogMCxcbiAgICAgICAgXCJzZXRcIjogMSxcbiAgICAgICAgXCJlbmRibG9ja1wiOiAtMSxcbiAgICAgICAgXCJlbmRpZlwiOiAtMSxcbiAgICAgICAgXCJlbmRmb3JcIjogLTEsXG4gICAgICAgIFwiZW5kZWFjaFwiOiAtMSxcbiAgICAgICAgXCJlbmRhbGxcIjogLTEsXG4gICAgICAgIFwiZW5kbWFjcm9cIjogLTEsXG4gICAgICAgIFwiZW5kZmlsdGVyXCI6IC0xLFxuICAgICAgICBcImVuZGNhbGxcIjogLTEsXG4gICAgICAgIFwiZW5kc2V0XCI6IC0xXG4gICAgfTtcblxuICAgIHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyTnVuanVja3MgPSAvKD86XFx7JS0/XFxzKikoPzooYmxvY2t8aWZ8ZWxzZXxlbGlmfGZvcnxhc3luY0VhY2h8YXN5bmNBbGx8bWFjcm98ZmlsdGVyfGNhbGwpXFxiLiopfCg/OlxcYnNldCg/OltePV0qKSkoPz0lfSkvaTtcbiAgICB0aGlzLmZvbGRpbmdTdG9wTWFya2VyTnVuanVja3MgPSAvKD86XFx7JS0/XFxzKikoZW5kYmxvY2t8ZW5kaWZ8ZW5kZm9yfGVuZGVhY2h8ZW5kYWxsfGVuZG1hY3JvfGVuZGZpbHRlcnxlbmRjYWxsfGVuZHNldClcXGIuKig/PSV9KS9pO1xuXG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0UmFuZ2UgPSBmdW5jdGlvbiAoc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmRvYy5nZXRMaW5lKHJvdyk7XG4gICAgICAgIGxldCBvZmZzZXQgPSBjYWxjdWxhdGVPZmZzZXQodGhpcy5mb2xkaW5nU3RhcnRNYXJrZXJOdW5qdWNrcywgbGluZSk7XG4gICAgICAgIGlmIChvZmZzZXQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm51bmp1Y2tzQmxvY2soc2Vzc2lvbiwgcm93LCBvZmZzZXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgb2Zmc2V0ID0gY2FsY3VsYXRlT2Zmc2V0KHRoaXMuZm9sZGluZ1N0b3BNYXJrZXJOdW5qdWNrcywgbGluZSk7XG4gICAgICAgIGlmIChvZmZzZXQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm51bmp1Y2tzQmxvY2soc2Vzc2lvbiwgcm93LCBvZmZzZXQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmdldEZvbGRXaWRnZXRSYW5nZUJhc2Uoc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7UmVnRXhwfSByZWdFeHBcbiAgICAgKiBAcGFyYW0gbGluZVxuICAgICAqIEByZXR1cm4geyp9XG4gICAgICovXG4gICAgZnVuY3Rpb24gY2FsY3VsYXRlT2Zmc2V0KHJlZ0V4cCwgbGluZSkge1xuICAgICAgICB2YXIgbWF0Y2ggPSByZWdFeHAuZXhlYyhsaW5lKTtcbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICB2YXIga2V5d29yZCA9IG1hdGNoWzBdLmluY2x1ZGVzKFwic2V0XCIpID8gXCJzZXRcIiA6IG1hdGNoWzFdLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBpZiAoa2V5d29yZCkge1xuICAgICAgICAgICAgICAgIHZhciBvZmZzZXRJbk1hdGNoID0gbWF0Y2hbMF0udG9Mb3dlckNhc2UoKS5pbmRleE9mKGtleXdvcmQpO1xuICAgICAgICAgICAgICAgIHJldHVybiBtYXRjaC5pbmRleCArIG9mZnNldEluTWF0Y2ggKyAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gbXVzdCByZXR1cm4gXCJcIiBpZiB0aGVyZSdzIG5vIGZvbGQsIHRvIGVuYWJsZSBjYWNoaW5nXG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0ID0gZnVuY3Rpb24gKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgIHZhciBpc1N0YXJ0ID0gdGhpcy5mb2xkaW5nU3RhcnRNYXJrZXJOdW5qdWNrcy50ZXN0KGxpbmUpO1xuICAgICAgICB2YXIgaXNFbmQgPSB0aGlzLmZvbGRpbmdTdG9wTWFya2VyTnVuanVja3MudGVzdChsaW5lKTtcbiAgICAgICAgaWYgKGlzU3RhcnQgJiYgIWlzRW5kKSB7XG4gICAgICAgICAgICB2YXIgb2Zmc2V0ID0gY2FsY3VsYXRlT2Zmc2V0KHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyTnVuanVja3MsIGxpbmUpO1xuICAgICAgICAgICAgaWYgKG9mZnNldCkge1xuICAgICAgICAgICAgICAgIHZhciB0eXBlID0gc2Vzc2lvbi5nZXRUb2tlbkF0KHJvdywgb2Zmc2V0KS50eXBlO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSBcImtleXdvcmQuY29udHJvbFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcInN0YXJ0XCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChpc0VuZCAmJiAhaXNTdGFydCAmJiBmb2xkU3R5bGUgPT09IFwibWFya2JlZ2luZW5kXCIpIHtcbiAgICAgICAgICAgIHZhciBvZmZzZXQgPSBjYWxjdWxhdGVPZmZzZXQodGhpcy5mb2xkaW5nU3RvcE1hcmtlck51bmp1Y2tzLCBsaW5lKTtcbiAgICAgICAgICAgIGlmIChvZmZzZXQpIHtcbiAgICAgICAgICAgICAgICB2YXIgdHlwZSA9IHNlc3Npb24uZ2V0VG9rZW5BdChyb3csIG9mZnNldCkudHlwZTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZSA9PT0gXCJrZXl3b3JkLmNvbnRyb2xcIikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJlbmRcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Rm9sZFdpZGdldEJhc2Uoc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7VG9rZW5JdGVyYXRvcn0gc3RyZWFtXG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2V0VG9rZW5Qb3NpdGlvbihzdHJlYW0sIGZpbmRTdGFydCkge1xuICAgICAgICBsZXQgdG9rZW47XG4gICAgICAgIGNvbnN0IGN1cnJlbnRJbmRleCA9IHN0cmVhbS4kdG9rZW5JbmRleDtcbiAgICAgICAgY29uc3QgdHlwZSA9IGZpbmRTdGFydCA/IFwicHVuY3R1YXRpb24uYmVnaW5cIiA6IFwicHVuY3R1YXRpb24uZW5kXCI7XG4gICAgICAgIHN0cmVhbS5zdGVwID0gZmluZFN0YXJ0ID8gc3RyZWFtLnN0ZXBCYWNrd2FyZCA6IHN0cmVhbS5zdGVwRm9yd2FyZDtcbiAgICAgICAgd2hpbGUgKHRva2VuID0gc3RyZWFtLnN0ZXAoKSkge1xuICAgICAgICAgICAgaWYgKHRva2VuLnR5cGUgIT09IHR5cGUpIGNvbnRpbnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0b2tlbikgcmV0dXJuO1xuICAgICAgICBsZXQgcG9zID0gc3RyZWFtLmdldEN1cnJlbnRUb2tlblBvc2l0aW9uKCk7XG4gICAgICAgIGlmICghZmluZFN0YXJ0KSB7XG4gICAgICAgICAgICBwb3MuY29sdW1uID0gcG9zLmNvbHVtbiArIHRva2VuLnZhbHVlLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICBzdHJlYW0uJHRva2VuSW5kZXggPSBjdXJyZW50SW5kZXg7XG4gICAgICAgIHJldHVybiBwb3M7XG4gICAgfVxuXG4gICAgdGhpcy5udW5qdWNrc0Jsb2NrID0gZnVuY3Rpb24gKHNlc3Npb24sIHJvdywgY29sdW1uKSB7XG4gICAgICAgIHZhciBzdHJlYW0gPSBuZXcgVG9rZW5JdGVyYXRvcihzZXNzaW9uLCByb3csIGNvbHVtbik7XG5cbiAgICAgICAgdmFyIHRva2VuID0gc3RyZWFtLmdldEN1cnJlbnRUb2tlbigpO1xuICAgICAgICBpZiAoIXRva2VuIHx8IHRva2VuLnR5cGUgIT0gXCJrZXl3b3JkLmNvbnRyb2xcIikgcmV0dXJuO1xuXG4gICAgICAgIHZhciB2YWwgPSB0b2tlbi52YWx1ZTtcbiAgICAgICAgdmFyIHN0YWNrID0gW3ZhbF07XG4gICAgICAgIHZhciBkaXIgPSB0aGlzLmluZGVudEtleXdvcmRzW3ZhbF07XG5cbiAgICAgICAgaWYgKHZhbCA9PT0gXCJlbHNlXCIgfHwgdmFsID09PSBcImVsaWZcIikge1xuICAgICAgICAgICAgZGlyID0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghZGlyKSByZXR1cm47XG5cbiAgICAgICAgdmFyIHN0YXJ0ID0gZ2V0VG9rZW5Qb3NpdGlvbihzdHJlYW0sIGRpciA9PT0gLTEpO1xuXG4gICAgICAgIGlmICghdG9rZW4pIHJldHVybjtcblxuICAgICAgICBzdHJlYW0uc3RlcCA9IGRpciA9PT0gLTEgPyBzdHJlYW0uc3RlcEJhY2t3YXJkIDogc3RyZWFtLnN0ZXBGb3J3YXJkO1xuICAgICAgICB3aGlsZSAodG9rZW4gPSBzdHJlYW0uc3RlcCgpKSB7XG4gICAgICAgICAgICBpZiAodG9rZW4udHlwZSAhPT0gXCJrZXl3b3JkLmNvbnRyb2xcIikgY29udGludWU7XG4gICAgICAgICAgICB2YXIgbGV2ZWwgPSBkaXIgKiB0aGlzLmluZGVudEtleXdvcmRzW3Rva2VuLnZhbHVlXTtcblxuICAgICAgICAgICAgaWYgKHRva2VuLnZhbHVlID09PSBcInNldFwiKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRva2VuUG9zID0gc3RyZWFtLmdldEN1cnJlbnRUb2tlblBvc2l0aW9uKCk7XG4gICAgICAgICAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUodG9rZW5Qb3Mucm93KS5zdWJzdHJpbmcodG9rZW5Qb3MuY29sdW1uKTtcbiAgICAgICAgICAgICAgICBpZiAoIS9eW149XSolfS8udGVzdChsaW5lKSkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobGV2ZWwgPiAwKSB7XG4gICAgICAgICAgICAgICAgc3RhY2sudW5zaGlmdCh0b2tlbi52YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChsZXZlbCA8PSAwKSB7XG4gICAgICAgICAgICAgICAgc3RhY2suc2hpZnQoKTtcbiAgICAgICAgICAgICAgICBpZiAoIXN0YWNrLmxlbmd0aCkgYnJlYWs7XG4gICAgICAgICAgICAgICAgaWYgKGxldmVsID09PSAwKSBzdGFjay51bnNoaWZ0KHRva2VuLnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdG9rZW4pIHJldHVybiBudWxsO1xuXG4gICAgICAgIHZhciBlbmQgPSBnZXRUb2tlblBvc2l0aW9uKHN0cmVhbSwgZGlyID09PSAxKTtcbiAgICAgICAgcmV0dXJuIGRpciA9PT0gMSA/IFJhbmdlLmZyb21Qb2ludHMoc3RhcnQsIGVuZCkgOiBSYW5nZS5mcm9tUG9pbnRzKGVuZCwgc3RhcnQpO1xuICAgIH07XG5cbn0pLmNhbGwoRm9sZE1vZGUucHJvdG90eXBlKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgTnVuanVja3NGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRpbmcvbnVuanVja3NcIikuRm9sZE1vZGU7XG52YXIgbGFuZyA9IHJlcXVpcmUoXCIuLi9saWIvbGFuZ1wiKTtcbnZhciBIdG1sTW9kZSA9IHJlcXVpcmUoXCIuL2h0bWxcIikuTW9kZTtcbnZhciBOdW5qdWNrc0hpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vbnVuanVja3NfaGlnaGxpZ2h0X3J1bGVzXCIpLk51bmp1Y2tzSGlnaGxpZ2h0UnVsZXM7XG5cbi8vIGh0dHA6Ly93d3cudzMub3JnL1RSL2h0bWw1L3N5bnRheC5odG1sI3ZvaWQtZWxlbWVudHNcbnZhciB2b2lkRWxlbWVudHMgPSBbXG4gICAgXCJhcmVhXCIsIFwiYmFzZVwiLCBcImJyXCIsIFwiY29sXCIsIFwiZW1iZWRcIiwgXCJoclwiLCBcImltZ1wiLCBcImlucHV0XCIsIFwia2V5Z2VuXCIsIFwibGlua1wiLCBcIm1ldGFcIiwgXCJtZW51aXRlbVwiLCBcInBhcmFtXCIsIFwic291cmNlXCIsXG4gICAgXCJ0cmFja1wiLCBcIndiclwiXG5dO1xudmFyIG9wdGlvbmFsRW5kVGFncyA9IFtcImxpXCIsIFwiZHRcIiwgXCJkZFwiLCBcInBcIiwgXCJydFwiLCBcInJwXCIsIFwib3B0Z3JvdXBcIiwgXCJvcHRpb25cIiwgXCJjb2xncm91cFwiLCBcInRkXCIsIFwidGhcIl07XG5cbnZhciBNb2RlID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuSGlnaGxpZ2h0UnVsZXMgPSBOdW5qdWNrc0hpZ2hsaWdodFJ1bGVzO1xuICAgIHRoaXMuZm9sZGluZ1J1bGVzID0gbmV3IE51bmp1Y2tzRm9sZE1vZGUodGhpcy52b2lkRWxlbWVudHMsIGxhbmcuYXJyYXlUb01hcChvcHRpb25hbEVuZFRhZ3MpKTtcbn07XG5cbm9vcC5pbmhlcml0cyhNb2RlLCBIdG1sTW9kZSk7XG5cbihmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy4kaWQgPSBcImFjZS9tb2RlL251bmp1Y2tzXCI7XG4gICAgdGhpcy52b2lkRWxlbWVudHMgPSBsYW5nLmFycmF5VG9NYXAodm9pZEVsZW1lbnRzKTtcblxufSkuY2FsbChNb2RlLnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTW9kZSA9IE1vZGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcbnZhciBIdG1sSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9odG1sX2hpZ2hsaWdodF9ydWxlc1wiKS5IdG1sSGlnaGxpZ2h0UnVsZXM7XG5cbnZhciBOdW5qdWNrc0hpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24oKSB7XG4gICAgSHRtbEhpZ2hsaWdodFJ1bGVzLmNhbGwodGhpcyk7XG4gICAgdGhpcy4kcnVsZXNbXCJzdGFydFwiXS51bnNoaWZ0KHtcbiAgICAgICAgdG9rZW46IFwicHVuY3R1YXRpb24uYmVnaW5cIixcbiAgICAgICAgcmVnZXg6IC97ey0/LyxcbiAgICAgICAgcHVzaDogW3tcbiAgICAgICAgICAgIHRva2VuOiBcInB1bmN0dWF0aW9uLmVuZFwiLFxuICAgICAgICAgICAgcmVnZXg6IC8tP319LyxcbiAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgfSxcbiAgICAgICAgICAgIHtpbmNsdWRlOiBcImV4cHJlc3Npb25cIn1cbiAgICAgICAgXVxuICAgIH0sIHtcbiAgICAgICAgdG9rZW46IFwicHVuY3R1YXRpb24uYmVnaW5cIixcbiAgICAgICAgcmVnZXg6IC97JS0/LyxcbiAgICAgICAgcHVzaDogW3tcbiAgICAgICAgICAgIHRva2VuOiBcInB1bmN0dWF0aW9uLmVuZFwiLFxuICAgICAgICAgICAgcmVnZXg6IC8tPyV9LyxcbiAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCIsXG4gICAgICAgICAgICByZWdleDogL1xcYihyXFwvLipcXC9bZ2lteV0/KVxcYi9cbiAgICAgICAgfSxcbiAgICAgICAgICAgIHtpbmNsdWRlOiBcInN0YXRlbWVudFwifVxuICAgICAgICBdXG4gICAgfSwge1xuICAgICAgICB0b2tlbjogXCJjb21tZW50LmJlZ2luXCIsXG4gICAgICAgIHJlZ2V4OiAveyMvLFxuICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgdG9rZW46IFwiY29tbWVudC5lbmRcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvI30vLFxuICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICB9LFxuICAgICAgICAgICAge2RlZmF1bHRUb2tlbjogXCJjb21tZW50XCJ9XG4gICAgICAgIF1cbiAgICB9KTtcbiAgICB0aGlzLmFkZFJ1bGVzKHtcbiAgICAgICAgYXR0cmlidXRlX3ZhbHVlOiBbe1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nLmF0dHJpYnV0ZS12YWx1ZS54bWxcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIidcIixcbiAgICAgICAgICAgIHB1c2g6IFtcbiAgICAgICAgICAgICAgICB7dG9rZW46IFwic3RyaW5nLmF0dHJpYnV0ZS12YWx1ZS54bWxcIiwgcmVnZXg6IFwiJ1wiLCBuZXh0OiBcInBvcFwifSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuOiBcInB1bmN0dWF0aW9uLmJlZ2luXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAve3stPy8sXG4gICAgICAgICAgICAgICAgICAgIHB1c2g6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJwdW5jdHVhdGlvbi5lbmRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAvLT99fS8sXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7aW5jbHVkZTogXCJleHByZXNzaW9uXCJ9XG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtpbmNsdWRlOiBcImF0dHJfcmVmZXJlbmNlXCJ9LFxuICAgICAgICAgICAgICAgIHtkZWZhdWx0VG9rZW46IFwic3RyaW5nLmF0dHJpYnV0ZS12YWx1ZS54bWxcIn1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nLmF0dHJpYnV0ZS12YWx1ZS54bWxcIixcbiAgICAgICAgICAgIHJlZ2V4OiAnXCInLFxuICAgICAgICAgICAgcHVzaDogW1xuICAgICAgICAgICAgICAgIHt0b2tlbjogXCJzdHJpbmcuYXR0cmlidXRlLXZhbHVlLnhtbFwiLCByZWdleDogJ1wiJywgbmV4dDogXCJwb3BcIn0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJwdW5jdHVhdGlvbi5iZWdpblwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleDogL3t7LT8vLFxuICAgICAgICAgICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwicHVuY3R1YXRpb24uZW5kXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWdleDogLy0/fX0vLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAge2luY2x1ZGU6IFwiZXhwcmVzc2lvblwifVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7aW5jbHVkZTogXCJhdHRyX3JlZmVyZW5jZVwifSxcbiAgICAgICAgICAgICAgICB7ZGVmYXVsdFRva2VuOiBcInN0cmluZy5hdHRyaWJ1dGUtdmFsdWUueG1sXCJ9XG4gICAgICAgICAgICBdXG4gICAgICAgIH1dLFxuICAgICAgICBcInN0YXRlbWVudFwiOiBbe1xuICAgICAgICAgICAgdG9rZW46IFwia2V5d29yZC5jb250cm9sXCIsXG4gICAgICAgICAgICByZWdleDogL1xcYihibG9ja3xlbmRibG9ja3xleHRlbmRzfGVuZGlmfGVsaWZ8Zm9yfGVuZGZvcnxhc3luY0VhY2h8ZW5kZWFjaHxpbmNsdWRlfGFzeW5jQWxsfGVuZGFsbHxtYWNyb3xlbmRtYWNyb3xzZXR8ZW5kc2V0fGlnbm9yZSBtaXNzaW5nfGFzfGZyb218cmF3fHZlcmJhdGltfGZpbHRlcnxlbmRmaWx0ZXIpXFxiL1xuICAgICAgICB9LFxuICAgICAgICAgICAge2luY2x1ZGU6IFwiZXhwcmVzc2lvblwifVxuICAgICAgICBdLFxuICAgICAgICBcImV4cHJlc3Npb25cIjogW3tcbiAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lmxhbmd1YWdlXCIsXG4gICAgICAgICAgICByZWdleDogL1xcYih0cnVlfGZhbHNlfG5vbmUpXFxiL1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXCIvLFxuICAgICAgICAgICAgcHVzaDogW3tcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICByZWdleDogL1wiLyxcbiAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtpbmNsdWRlOiBcImVzY2FwZVN0cmluZ3NcIn0sXG4gICAgICAgICAgICAgICAge2RlZmF1bHRUb2tlbjogXCJzdHJpbmdcIn1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nXCIsXG4gICAgICAgICAgICByZWdleDogLycvLFxuICAgICAgICAgICAgcHVzaDogW3tcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICByZWdleDogLycvLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge2luY2x1ZGU6IFwiZXNjYXBlU3RyaW5nc1wifSxcbiAgICAgICAgICAgICAgICB7ZGVmYXVsdFRva2VuOiBcInN0cmluZ1wifVxuICAgICAgICAgICAgXVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5udW1lcmljXCIsIC8vIGhleGFkZWNpbWFsLCBvY3RhbCBhbmQgYmluYXJ5XG4gICAgICAgICAgICByZWdleDogLzAoPzpbeFhdWzAtOWEtZkEtRl0rfFtvT11bMC03XSt8W2JCXVswMV0rKVxcYi9cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQubnVtZXJpY1wiLCAvLyBkZWNpbWFsIGludGVnZXJzIGFuZCBmbG9hdHNcbiAgICAgICAgICAgIHJlZ2V4OiAvKD86XFxkXFxkKig/OlxcLlxcZCopP3xcXC5cXGQrKSg/OltlRV1bKy1dP1xcZCtcXGIpPy9cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwia2V5d29yZC5vcGVyYXRvclwiLFxuICAgICAgICAgICAgcmVnZXg6IC9cXCt8LXxcXC9cXC98XFwvfCV8XFwqXFwqfFxcKnw9PT18PT18IT09fCE9fD49fD58PD18PC9cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwia2V5d29yZC5jb250cm9sXCIsXG4gICAgICAgICAgICByZWdleDogL1xcYihhbmR8ZWxzZXxpZnxpbnxpbXBvcnR8bm90fG9yKVxcYi9cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwic3VwcG9ydC5mdW5jdGlvblwiLFxuICAgICAgICAgICAgcmVnZXg6IC9bYS16QS1aX10rKD89XFwoKS9cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwicGFyZW4ubHBhclwiLFxuICAgICAgICAgICAgcmVnZXg6IC9bKFxcW3tdL1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJwYXJlbi5ycGFyXCIsXG4gICAgICAgICAgICByZWdleDogL1spXFxdfV0vXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInB1bmN0dWF0aW9uXCIsXG4gICAgICAgICAgICByZWdleDogL1ssXS9cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFtcInB1bmN0dWF0aW9uXCIsIFwic3VwcG9ydC5mdW5jdGlvblwiXSxcbiAgICAgICAgICAgIHJlZ2V4OiAvKFxcLikoW2EtekEtWl9dW2EtekEtWjAtOV9dKikoPz1cXCgpL1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogW1wicHVuY3R1YXRpb25cIiwgXCJ2YXJpYWJsZS5wYXJhbWV0ZXJcIl0sXG4gICAgICAgICAgICByZWdleDogLyhcXC4pKFthLXpBLVpfXVthLXpBLVowLTlfXSopL1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogW1wicHVuY3R1YXRpb25cIiwgXCJ0ZXh0XCIsIFwic3VwcG9ydC5vdGhlclwiXSxcbiAgICAgICAgICAgIHJlZ2V4OiAvKFxcfCkoXFxzKSooW2EtekEtWl9dW2EtekEtWjAtOV9dKikvXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInZhcmlhYmxlXCIsXG4gICAgICAgICAgICByZWdleDogL1thLXpBLVpfXVthLXpBLVowLTlfXSovXG4gICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgXCJlc2NhcGVTdHJpbmdzXCI6IFt7XG4gICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvKFxcXFxcXFxcbil8KFxcXFxcXFxcKXwoXFxcXFwiKXwoXFxcXCcpfChcXFxcYSl8KFxcXFxiKXwoXFxcXGYpfChcXFxcbil8KFxcXFxyKXwoXFxcXHQpfChcXFxcdikvXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLFxuICAgICAgICAgICAgcmVnZXg6IC9cXFxcKD86eFswLTlBLUZdezJ9fCg/OlVbMC05QS1GYS1mXXs4fSl8KD86dVswLTlBLUZhLWZdezR9KXwoPzpOe1thLXpBLVogXSt9KSkvXG4gICAgICAgIH1dXG4gICAgfSk7XG5cbiAgICB0aGlzLm5vcm1hbGl6ZVJ1bGVzKCk7XG59O1xuXG5vb3AuaW5oZXJpdHMoTnVuanVja3NIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuZXhwb3J0cy5OdW5qdWNrc0hpZ2hsaWdodFJ1bGVzID0gTnVuanVja3NIaWdobGlnaHRSdWxlcztcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==