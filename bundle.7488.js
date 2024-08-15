"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[7488],{

/***/ 87488:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var AsciidocHighlightRules = (__webpack_require__(58651)/* .AsciidocHighlightRules */ .b);
var AsciidocFoldMode = (__webpack_require__(20350)/* .FoldMode */ .l);

var Mode = function() {
    this.HighlightRules = AsciidocHighlightRules;
    
    this.foldingRules = new AsciidocFoldMode();    
};
oop.inherits(Mode, TextMode);

(function() {
    this.type = "text";
    this.getNextLineIndent = function(state, line, tab) {
        if (state == "listblock") {
            var match = /^((?:.+)?)([-+*][ ]+)/.exec(line);
            if (match) {
                return new Array(match[1].length + 1).join(" ") + match[2];
            } else {
                return "";
            }
        } else {
            return this.$getIndent(line);
        }
    };
    this.$id = "ace/mode/asciidoc";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 58651:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

var AsciidocHighlightRules = function() {
    var identifierRe = "[a-zA-Z\u00a1-\uffff]+\\b";

    this.$rules = {
        "start": [
            {token: "empty",   regex: /$/},
            {token: "literal", regex: /^\.{4,}\s*$/,  next: "listingBlock"},
            {token: "literal", regex: /^-{4,}\s*$/,   next: "literalBlock"},
            {token: "string",  regex: /^\+{4,}\s*$/,  next: "passthroughBlock"},
            {token: "keyword", regex: /^={4,}\s*$/},
            {token: "text",    regex: /^\s*$/},
            // immediately return to the start mode without matching anything
            {token: "empty", regex: "", next: "dissallowDelimitedBlock"}
        ],

        "dissallowDelimitedBlock": [
            {include: "paragraphEnd"},
            {token: "comment", regex: '^//.+$'},
            {token: "keyword", regex: "^(?:NOTE|TIP|IMPORTANT|WARNING|CAUTION):"},

            {include: "listStart"},
            {token: "literal", regex: /^\s+.+$/, next: "indentedBlock"},
            {token: "empty",   regex: "", next: "text"}
        ],

        "paragraphEnd": [
            {token: "doc.comment", regex: /^\/{4,}\s*$/,    next: "commentBlock"},
            {token: "tableBlock",  regex: /^\s*[|!]=+\s*$/, next: "tableBlock"},
            // open block, ruller
            {token: "keyword",     regex: /^(?:--|''')\s*$/, next: "start"},
            {token: "option",      regex: /^\[.*\]\s*$/,     next: "start"},
            {token: "pageBreak",   regex: /^>{3,}$/,         next: "start"},
            {token: "literal",     regex: /^\.{4,}\s*$/,     next: "listingBlock"},
            {token: "titleUnderline",    regex: /^(?:={2,}|-{2,}|~{2,}|\^{2,}|\+{2,})\s*$/, next: "start"},
            {token: "singleLineTitle",   regex: /^={1,5}\s+\S.*$/, next: "start"},

            {token: "otherBlock",    regex: /^(?:\*{2,}|_{2,})\s*$/, next: "start"},
            // .optional title
            {token: "optionalTitle", regex: /^\.[^.\s].+$/,  next: "start"}
        ],

        "listStart": [
            {token: "keyword",  regex: /^\s*(?:\d+\.|[a-zA-Z]\.|[ixvmIXVM]+\)|\*{1,5}|-|\.{1,5})\s/, next: "listText"},
            {token: "meta.tag", regex: /^.+(?::{2,4}|;;)(?: |$)/, next: "listText"},
            {token: "support.function.list.callout", regex: /^(?:<\d+>|\d+>|>) /, next: "text"},
            // continuation
            {token: "keyword",  regex: /^\+\s*$/, next: "start"}
        ],

        "text": [
            {token: ["link", "variable.language"], regex: /((?:https?:\/\/|ftp:\/\/|file:\/\/|mailto:|callto:)[^\s\[]+)(\[.*?\])/},
            {token: "link", regex: /(?:https?:\/\/|ftp:\/\/|file:\/\/|mailto:|callto:)[^\s\[]+/},
            {token: "link", regex: /\b[\w\.\/\-]+@[\w\.\/\-]+\b/},
            {include: "macros"},
            {include: "paragraphEnd"},
            {token: "literal", regex:/\+{3,}/, next:"smallPassthrough"},
            {token: "escape", regex: /\((?:C|TM|R)\)|\.{3}|->|<-|=>|<=|&#(?:\d+|x[a-fA-F\d]+);|(?: |^)--(?=\s+\S)/},
            {token: "escape", regex: /\\[_*'`+#]|\\{2}[_*'`+#]{2}/},
            {token: "keyword", regex: /\s\+$/},
            // any word
            {token: "text", regex: identifierRe},
            {token: ["keyword", "string", "keyword"],
                regex: /(<<[\w\d\-$]+,)(.*?)(>>|$)/},
            {token: "keyword", regex: /<<[\w\d\-$]+,?|>>/},
            {token: "constant.character", regex: /\({2,3}.*?\){2,3}/},
            // Anchor
            {token: "keyword", regex: /\[\[.+?\]\]/},
            // bibliography
            {token: "support", regex: /^\[{3}[\w\d =\-]+\]{3}/},

            {include: "quotes"},
            // text block end
            {token: "empty", regex: /^\s*$/, next: "start"}
        ],

        "listText": [
            {include: "listStart"},
            {include: "text"}
        ],

        "indentedBlock": [
            {token: "literal", regex: /^[\s\w].+$/, next: "indentedBlock"},
            {token: "literal", regex: "", next: "start"}
        ],

        "listingBlock": [
            {token: "literal", regex: /^\.{4,}\s*$/, next: "dissallowDelimitedBlock"},
            {token: "constant.numeric", regex: '<\\d+>'},
            {token: "literal", regex: '[^<]+'},
            {token: "literal", regex: '<'}
        ],
        "literalBlock": [
            {token: "literal", regex: /^-{4,}\s*$/, next: "dissallowDelimitedBlock"},
            {token: "constant.numeric", regex: '<\\d+>'},
            {token: "literal", regex: '[^<]+'},
            {token: "literal", regex: '<'}
        ],
        "passthroughBlock": [
            {token: "literal", regex: /^\+{4,}\s*$/, next: "dissallowDelimitedBlock"},
            {token: "literal", regex: identifierRe + "|\\d+"},
            {include: "macros"},
            {token: "literal", regex: "."}
        ],

        "smallPassthrough": [
            {token: "literal", regex: /[+]{3,}/, next: "dissallowDelimitedBlock"},
            {token: "literal", regex: /^\s*$/, next: "dissallowDelimitedBlock"},
            {token: "literal", regex: identifierRe + "|\\d+"},
            {include: "macros"}
        ],

        "commentBlock": [
            {token: "doc.comment", regex: /^\/{4,}\s*$/, next: "dissallowDelimitedBlock"},
            {token: "doc.comment", regex: '^.*$'}
        ],
        "tableBlock": [
            {token: "tableBlock", regex: /^\s*\|={3,}\s*$/, next: "dissallowDelimitedBlock"},
            {token: "tableBlock", regex: /^\s*!={3,}\s*$/, next: "innerTableBlock"},
            {token: "tableBlock", regex: /\|/},
            {include: "text", noEscape: true}
        ],
        "innerTableBlock": [
            {token: "tableBlock", regex: /^\s*!={3,}\s*$/, next: "tableBlock"},
            {token: "tableBlock", regex: /^\s*|={3,}\s*$/, next: "dissallowDelimitedBlock"},
            {token: "tableBlock", regex: /!/}
        ],
        "macros": [
            {token: "macro", regex: /{[\w\-$]+}/},
            {token: ["text", "string", "text", "constant.character", "text"], regex: /({)([\w\-$]+)(:)?(.+)?(})/},
            {token: ["text", "markup.list.macro", "keyword", "string"], regex: /(\w+)(footnote(?:ref)?::?)([^\s\[]+)?(\[.*?\])?/},
            {token: ["markup.list.macro", "keyword", "string"], regex: /([a-zA-Z\-][\w\.\/\-]*::?)([^\s\[]+)(\[.*?\])?/},
            {token: ["markup.list.macro", "keyword"], regex: /([a-zA-Z\-][\w\.\/\-]+::?)(\[.*?\])/},
            {token: "keyword",     regex: /^:.+?:(?= |$)/}
        ],

        "quotes": [
            {token: "string.italic", regex: /__[^_\s].*?__/},
            {token: "string.italic", regex: quoteRule("_")},
            
            {token: "keyword.bold", regex: /\*\*[^*\s].*?\*\*/},
            {token: "keyword.bold", regex: quoteRule("\\*")},
            
            {token: "literal", regex: quoteRule("\\+")},
            {token: "literal", regex: /\+\+[^+\s].*?\+\+/},
            {token: "literal", regex: /\$\$.+?\$\$/},
            {token: "literal", regex: quoteRule("`")},

            {token: "keyword", regex: quoteRule("^")},
            {token: "keyword", regex: quoteRule("~")},
            {token: "keyword", regex: /##?/},
            {token: "keyword", regex: /(?:\B|^)``|\b''/}
        ]

    };

    function quoteRule(ch) {
        var prefix = /\w/.test(ch) ? "\\b" : "(?:\\B|^)";
        return prefix + ch + "[^" + ch + "].*?" + ch + "(?![\\w*])";
    }

    //addQuoteBlock("text")

    var tokenMap = {
        macro: "constant.character",
        tableBlock: "doc.comment",
        titleUnderline: "markup.heading",
        singleLineTitle: "markup.heading",
        pageBreak: "string",
        option: "string.regexp",
        otherBlock: "markup.list",
        literal: "support.function",
        optionalTitle: "constant.numeric",
        escape: "constant.language.escape",
        link: "markup.underline.list"
    };

    for (var state in this.$rules) {
        var stateRules = this.$rules[state];
        for (var i = stateRules.length; i--; ) {
            var rule = stateRules[i];
            if (rule.include || typeof rule == "string") {
                var args = [i, 1].concat(this.$rules[rule.include || rule]);
                if (rule.noEscape) {
                    args = args.filter(function(x) {
                        return !x.next;
                    });
                }
                stateRules.splice.apply(stateRules, args);
            } else if (rule.token in tokenMap) {
                rule.token = tokenMap[rule.token];
            }
        }
    }
};
oop.inherits(AsciidocHighlightRules, TextHighlightRules);

exports.b = AsciidocHighlightRules;


/***/ }),

/***/ 20350:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var BaseFoldMode = (__webpack_require__(51358).FoldMode);
var Range = (__webpack_require__(91902)/* .Range */ .Q);

var FoldMode = exports.l = function() {};
oop.inherits(FoldMode, BaseFoldMode);

(function() {
    this.foldingStartMarker = /^(?:\|={10,}|[\.\/=\-~^+]{4,}\s*$|={1,5} )/;
    this.singleLineHeadingRe = /^={1,5}(?=\s+\S)/;

    this.getFoldWidget = function(session, foldStyle, row) {
        var line = session.getLine(row);
        if (!this.foldingStartMarker.test(line))
            return "";

        if (line[0] == "=") {
            if (this.singleLineHeadingRe.test(line))
                return "start";
            if (session.getLine(row - 1).length != session.getLine(row).length)
                return "";
            return "start";
        }
        if (session.bgTokenizer.getState(row) == "dissallowDelimitedBlock")
            return "end";
        return "start";
    };

    this.getFoldWidgetRange = function(session, foldStyle, row) {
        var line = session.getLine(row);
        var startColumn = line.length;
        var maxRow = session.getLength();
        var startRow = row;
        var endRow = row;
        if (!line.match(this.foldingStartMarker))
            return;

        var token;
        function getTokenType(row) {
            token = session.getTokens(row)[0];
            return token && token.type;
        }

        var levels = ["=","-","~","^","+"];
        var heading = "markup.heading";
        var singleLineHeadingRe = this.singleLineHeadingRe;
        function getLevel() {
            var match = token.value.match(singleLineHeadingRe);
            if (match)
                return match[0].length;
            var level = levels.indexOf(token.value[0]) + 1;
            if (level == 1) {
                if (session.getLine(row - 1).length != session.getLine(row).length)
                    return Infinity;
            }
            return level;
        }

        if (getTokenType(row) == heading) {
            var startHeadingLevel = getLevel();
            while (++row < maxRow) {
                if (getTokenType(row) != heading)
                    continue;
                var level = getLevel();
                if (level <= startHeadingLevel)
                    break;
            }

            var isSingleLineHeading = token && token.value.match(this.singleLineHeadingRe);
            endRow = isSingleLineHeading ? row - 1 : row - 2;

            if (endRow > startRow) {
                while (endRow > startRow && (!getTokenType(endRow) || token.value[0] == "["))
                    endRow--;
            }

            if (endRow > startRow) {
                var endColumn = session.getLine(endRow).length;
                return new Range(startRow, startColumn, endRow, endColumn);
            }
        } else {
            var state = session.bgTokenizer.getState(row);
            if (state == "dissallowDelimitedBlock") {
                while (row -- > 0) {
                    if (session.bgTokenizer.getState(row).lastIndexOf("Block") == -1)
                        break;
                }
                endRow = row + 1;
                if (endRow < startRow) {
                    var endColumn = session.getLine(row).length;
                    return new Range(endRow, 5, startRow, startColumn - 5);
                }
            } else {
                while (++row < maxRow) {
                    if (session.bgTokenizer.getState(row) == "dissallowDelimitedBlock")
                        break;
                }
                endRow = row;
                if (endRow > startRow) {
                    var endColumn = session.getLine(row).length;
                    return new Range(startRow, 5, endRow, endColumn - 5);
                }
            }
        }
    };

}).call(FoldMode.prototype);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNyQjtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUE4Qjs7Ozs7Ozs7QUN6TWpCOztBQUViLFVBQVUsbUJBQU8sQ0FBQyxJQUFlO0FBQ2pDLG1CQUFtQixxQ0FBK0I7QUFDbEQsWUFBWSwyQ0FBNEI7O0FBRXhDLGVBQWUsU0FBZ0I7QUFDL0I7O0FBRUE7QUFDQSx1Q0FBdUMsSUFBSSxjQUFjLEdBQUcsT0FBTyxLQUFLO0FBQ3hFLG1DQUFtQyxJQUFJOztBQUV2QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2FzY2lpZG9jLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvYXNjaWlkb2NfaGlnaGxpZ2h0X3J1bGVzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvZm9sZGluZy9hc2NpaWRvYy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRNb2RlID0gcmVxdWlyZShcIi4vdGV4dFwiKS5Nb2RlO1xudmFyIEFzY2lpZG9jSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9hc2NpaWRvY19oaWdobGlnaHRfcnVsZXNcIikuQXNjaWlkb2NIaWdobGlnaHRSdWxlcztcbnZhciBBc2NpaWRvY0ZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZGluZy9hc2NpaWRvY1wiKS5Gb2xkTW9kZTtcblxudmFyIE1vZGUgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLkhpZ2hsaWdodFJ1bGVzID0gQXNjaWlkb2NIaWdobGlnaHRSdWxlcztcbiAgICBcbiAgICB0aGlzLmZvbGRpbmdSdWxlcyA9IG5ldyBBc2NpaWRvY0ZvbGRNb2RlKCk7ICAgIFxufTtcbm9vcC5pbmhlcml0cyhNb2RlLCBUZXh0TW9kZSk7XG5cbihmdW5jdGlvbigpIHtcbiAgICB0aGlzLnR5cGUgPSBcInRleHRcIjtcbiAgICB0aGlzLmdldE5leHRMaW5lSW5kZW50ID0gZnVuY3Rpb24oc3RhdGUsIGxpbmUsIHRhYikge1xuICAgICAgICBpZiAoc3RhdGUgPT0gXCJsaXN0YmxvY2tcIikge1xuICAgICAgICAgICAgdmFyIG1hdGNoID0gL14oKD86LispPykoWy0rKl1bIF0rKS8uZXhlYyhsaW5lKTtcbiAgICAgICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQXJyYXkobWF0Y2hbMV0ubGVuZ3RoICsgMSkuam9pbihcIiBcIikgKyBtYXRjaFsyXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kZ2V0SW5kZW50KGxpbmUpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB0aGlzLiRpZCA9IFwiYWNlL21vZGUvYXNjaWlkb2NcIjtcbn0pLmNhbGwoTW9kZS5wcm90b3R5cGUpO1xuXG5leHBvcnRzLk1vZGUgPSBNb2RlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90ZXh0X2hpZ2hsaWdodF9ydWxlc1wiKS5UZXh0SGlnaGxpZ2h0UnVsZXM7XG5cbnZhciBBc2NpaWRvY0hpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGlkZW50aWZpZXJSZSA9IFwiW2EtekEtWlxcdTAwYTEtXFx1ZmZmZl0rXFxcXGJcIjtcblxuICAgIHRoaXMuJHJ1bGVzID0ge1xuICAgICAgICBcInN0YXJ0XCI6IFtcbiAgICAgICAgICAgIHt0b2tlbjogXCJlbXB0eVwiLCAgIHJlZ2V4OiAvJC99LFxuICAgICAgICAgICAge3Rva2VuOiBcImxpdGVyYWxcIiwgcmVnZXg6IC9eXFwuezQsfVxccyokLywgIG5leHQ6IFwibGlzdGluZ0Jsb2NrXCJ9LFxuICAgICAgICAgICAge3Rva2VuOiBcImxpdGVyYWxcIiwgcmVnZXg6IC9eLXs0LH1cXHMqJC8sICAgbmV4dDogXCJsaXRlcmFsQmxvY2tcIn0sXG4gICAgICAgICAgICB7dG9rZW46IFwic3RyaW5nXCIsICByZWdleDogL15cXCt7NCx9XFxzKiQvLCAgbmV4dDogXCJwYXNzdGhyb3VnaEJsb2NrXCJ9LFxuICAgICAgICAgICAge3Rva2VuOiBcImtleXdvcmRcIiwgcmVnZXg6IC9ePXs0LH1cXHMqJC99LFxuICAgICAgICAgICAge3Rva2VuOiBcInRleHRcIiwgICAgcmVnZXg6IC9eXFxzKiQvfSxcbiAgICAgICAgICAgIC8vIGltbWVkaWF0ZWx5IHJldHVybiB0byB0aGUgc3RhcnQgbW9kZSB3aXRob3V0IG1hdGNoaW5nIGFueXRoaW5nXG4gICAgICAgICAgICB7dG9rZW46IFwiZW1wdHlcIiwgcmVnZXg6IFwiXCIsIG5leHQ6IFwiZGlzc2FsbG93RGVsaW1pdGVkQmxvY2tcIn1cbiAgICAgICAgXSxcblxuICAgICAgICBcImRpc3NhbGxvd0RlbGltaXRlZEJsb2NrXCI6IFtcbiAgICAgICAgICAgIHtpbmNsdWRlOiBcInBhcmFncmFwaEVuZFwifSxcbiAgICAgICAgICAgIHt0b2tlbjogXCJjb21tZW50XCIsIHJlZ2V4OiAnXi8vLiskJ30sXG4gICAgICAgICAgICB7dG9rZW46IFwia2V5d29yZFwiLCByZWdleDogXCJeKD86Tk9URXxUSVB8SU1QT1JUQU5UfFdBUk5JTkd8Q0FVVElPTik6XCJ9LFxuXG4gICAgICAgICAgICB7aW5jbHVkZTogXCJsaXN0U3RhcnRcIn0sXG4gICAgICAgICAgICB7dG9rZW46IFwibGl0ZXJhbFwiLCByZWdleDogL15cXHMrLiskLywgbmV4dDogXCJpbmRlbnRlZEJsb2NrXCJ9LFxuICAgICAgICAgICAge3Rva2VuOiBcImVtcHR5XCIsICAgcmVnZXg6IFwiXCIsIG5leHQ6IFwidGV4dFwifVxuICAgICAgICBdLFxuXG4gICAgICAgIFwicGFyYWdyYXBoRW5kXCI6IFtcbiAgICAgICAgICAgIHt0b2tlbjogXCJkb2MuY29tbWVudFwiLCByZWdleDogL15cXC97NCx9XFxzKiQvLCAgICBuZXh0OiBcImNvbW1lbnRCbG9ja1wifSxcbiAgICAgICAgICAgIHt0b2tlbjogXCJ0YWJsZUJsb2NrXCIsICByZWdleDogL15cXHMqW3whXT0rXFxzKiQvLCBuZXh0OiBcInRhYmxlQmxvY2tcIn0sXG4gICAgICAgICAgICAvLyBvcGVuIGJsb2NrLCBydWxsZXJcbiAgICAgICAgICAgIHt0b2tlbjogXCJrZXl3b3JkXCIsICAgICByZWdleDogL14oPzotLXwnJycpXFxzKiQvLCBuZXh0OiBcInN0YXJ0XCJ9LFxuICAgICAgICAgICAge3Rva2VuOiBcIm9wdGlvblwiLCAgICAgIHJlZ2V4OiAvXlxcWy4qXFxdXFxzKiQvLCAgICAgbmV4dDogXCJzdGFydFwifSxcbiAgICAgICAgICAgIHt0b2tlbjogXCJwYWdlQnJlYWtcIiwgICByZWdleDogL14+ezMsfSQvLCAgICAgICAgIG5leHQ6IFwic3RhcnRcIn0sXG4gICAgICAgICAgICB7dG9rZW46IFwibGl0ZXJhbFwiLCAgICAgcmVnZXg6IC9eXFwuezQsfVxccyokLywgICAgIG5leHQ6IFwibGlzdGluZ0Jsb2NrXCJ9LFxuICAgICAgICAgICAge3Rva2VuOiBcInRpdGxlVW5kZXJsaW5lXCIsICAgIHJlZ2V4OiAvXig/Oj17Mix9fC17Mix9fH57Mix9fFxcXnsyLH18XFwrezIsfSlcXHMqJC8sIG5leHQ6IFwic3RhcnRcIn0sXG4gICAgICAgICAgICB7dG9rZW46IFwic2luZ2xlTGluZVRpdGxlXCIsICAgcmVnZXg6IC9ePXsxLDV9XFxzK1xcUy4qJC8sIG5leHQ6IFwic3RhcnRcIn0sXG5cbiAgICAgICAgICAgIHt0b2tlbjogXCJvdGhlckJsb2NrXCIsICAgIHJlZ2V4OiAvXig/OlxcKnsyLH18X3syLH0pXFxzKiQvLCBuZXh0OiBcInN0YXJ0XCJ9LFxuICAgICAgICAgICAgLy8gLm9wdGlvbmFsIHRpdGxlXG4gICAgICAgICAgICB7dG9rZW46IFwib3B0aW9uYWxUaXRsZVwiLCByZWdleDogL15cXC5bXi5cXHNdLiskLywgIG5leHQ6IFwic3RhcnRcIn1cbiAgICAgICAgXSxcblxuICAgICAgICBcImxpc3RTdGFydFwiOiBbXG4gICAgICAgICAgICB7dG9rZW46IFwia2V5d29yZFwiLCAgcmVnZXg6IC9eXFxzKig/OlxcZCtcXC58W2EtekEtWl1cXC58W2l4dm1JWFZNXStcXCl8XFwqezEsNX18LXxcXC57MSw1fSlcXHMvLCBuZXh0OiBcImxpc3RUZXh0XCJ9LFxuICAgICAgICAgICAge3Rva2VuOiBcIm1ldGEudGFnXCIsIHJlZ2V4OiAvXi4rKD86OnsyLDR9fDs7KSg/OiB8JCkvLCBuZXh0OiBcImxpc3RUZXh0XCJ9LFxuICAgICAgICAgICAge3Rva2VuOiBcInN1cHBvcnQuZnVuY3Rpb24ubGlzdC5jYWxsb3V0XCIsIHJlZ2V4OiAvXig/OjxcXGQrPnxcXGQrPnw+KSAvLCBuZXh0OiBcInRleHRcIn0sXG4gICAgICAgICAgICAvLyBjb250aW51YXRpb25cbiAgICAgICAgICAgIHt0b2tlbjogXCJrZXl3b3JkXCIsICByZWdleDogL15cXCtcXHMqJC8sIG5leHQ6IFwic3RhcnRcIn1cbiAgICAgICAgXSxcblxuICAgICAgICBcInRleHRcIjogW1xuICAgICAgICAgICAge3Rva2VuOiBbXCJsaW5rXCIsIFwidmFyaWFibGUubGFuZ3VhZ2VcIl0sIHJlZ2V4OiAvKCg/Omh0dHBzPzpcXC9cXC98ZnRwOlxcL1xcL3xmaWxlOlxcL1xcL3xtYWlsdG86fGNhbGx0bzopW15cXHNcXFtdKykoXFxbLio/XFxdKS99LFxuICAgICAgICAgICAge3Rva2VuOiBcImxpbmtcIiwgcmVnZXg6IC8oPzpodHRwcz86XFwvXFwvfGZ0cDpcXC9cXC98ZmlsZTpcXC9cXC98bWFpbHRvOnxjYWxsdG86KVteXFxzXFxbXSsvfSxcbiAgICAgICAgICAgIHt0b2tlbjogXCJsaW5rXCIsIHJlZ2V4OiAvXFxiW1xcd1xcLlxcL1xcLV0rQFtcXHdcXC5cXC9cXC1dK1xcYi99LFxuICAgICAgICAgICAge2luY2x1ZGU6IFwibWFjcm9zXCJ9LFxuICAgICAgICAgICAge2luY2x1ZGU6IFwicGFyYWdyYXBoRW5kXCJ9LFxuICAgICAgICAgICAge3Rva2VuOiBcImxpdGVyYWxcIiwgcmVnZXg6L1xcK3szLH0vLCBuZXh0Olwic21hbGxQYXNzdGhyb3VnaFwifSxcbiAgICAgICAgICAgIHt0b2tlbjogXCJlc2NhcGVcIiwgcmVnZXg6IC9cXCgoPzpDfFRNfFIpXFwpfFxcLnszfXwtPnw8LXw9Pnw8PXwmIyg/OlxcZCt8eFthLWZBLUZcXGRdKyk7fCg/OiB8XiktLSg/PVxccytcXFMpL30sXG4gICAgICAgICAgICB7dG9rZW46IFwiZXNjYXBlXCIsIHJlZ2V4OiAvXFxcXFtfKidgKyNdfFxcXFx7Mn1bXyonYCsjXXsyfS99LFxuICAgICAgICAgICAge3Rva2VuOiBcImtleXdvcmRcIiwgcmVnZXg6IC9cXHNcXCskL30sXG4gICAgICAgICAgICAvLyBhbnkgd29yZFxuICAgICAgICAgICAge3Rva2VuOiBcInRleHRcIiwgcmVnZXg6IGlkZW50aWZpZXJSZX0sXG4gICAgICAgICAgICB7dG9rZW46IFtcImtleXdvcmRcIiwgXCJzdHJpbmdcIiwgXCJrZXl3b3JkXCJdLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvKDw8W1xcd1xcZFxcLSRdKywpKC4qPykoPj58JCkvfSxcbiAgICAgICAgICAgIHt0b2tlbjogXCJrZXl3b3JkXCIsIHJlZ2V4OiAvPDxbXFx3XFxkXFwtJF0rLD98Pj4vfSxcbiAgICAgICAgICAgIHt0b2tlbjogXCJjb25zdGFudC5jaGFyYWN0ZXJcIiwgcmVnZXg6IC9cXCh7MiwzfS4qP1xcKXsyLDN9L30sXG4gICAgICAgICAgICAvLyBBbmNob3JcbiAgICAgICAgICAgIHt0b2tlbjogXCJrZXl3b3JkXCIsIHJlZ2V4OiAvXFxbXFxbLis/XFxdXFxdL30sXG4gICAgICAgICAgICAvLyBiaWJsaW9ncmFwaHlcbiAgICAgICAgICAgIHt0b2tlbjogXCJzdXBwb3J0XCIsIHJlZ2V4OiAvXlxcW3szfVtcXHdcXGQgPVxcLV0rXFxdezN9L30sXG5cbiAgICAgICAgICAgIHtpbmNsdWRlOiBcInF1b3Rlc1wifSxcbiAgICAgICAgICAgIC8vIHRleHQgYmxvY2sgZW5kXG4gICAgICAgICAgICB7dG9rZW46IFwiZW1wdHlcIiwgcmVnZXg6IC9eXFxzKiQvLCBuZXh0OiBcInN0YXJ0XCJ9XG4gICAgICAgIF0sXG5cbiAgICAgICAgXCJsaXN0VGV4dFwiOiBbXG4gICAgICAgICAgICB7aW5jbHVkZTogXCJsaXN0U3RhcnRcIn0sXG4gICAgICAgICAgICB7aW5jbHVkZTogXCJ0ZXh0XCJ9XG4gICAgICAgIF0sXG5cbiAgICAgICAgXCJpbmRlbnRlZEJsb2NrXCI6IFtcbiAgICAgICAgICAgIHt0b2tlbjogXCJsaXRlcmFsXCIsIHJlZ2V4OiAvXltcXHNcXHddLiskLywgbmV4dDogXCJpbmRlbnRlZEJsb2NrXCJ9LFxuICAgICAgICAgICAge3Rva2VuOiBcImxpdGVyYWxcIiwgcmVnZXg6IFwiXCIsIG5leHQ6IFwic3RhcnRcIn1cbiAgICAgICAgXSxcblxuICAgICAgICBcImxpc3RpbmdCbG9ja1wiOiBbXG4gICAgICAgICAgICB7dG9rZW46IFwibGl0ZXJhbFwiLCByZWdleDogL15cXC57NCx9XFxzKiQvLCBuZXh0OiBcImRpc3NhbGxvd0RlbGltaXRlZEJsb2NrXCJ9LFxuICAgICAgICAgICAge3Rva2VuOiBcImNvbnN0YW50Lm51bWVyaWNcIiwgcmVnZXg6ICc8XFxcXGQrPid9LFxuICAgICAgICAgICAge3Rva2VuOiBcImxpdGVyYWxcIiwgcmVnZXg6ICdbXjxdKyd9LFxuICAgICAgICAgICAge3Rva2VuOiBcImxpdGVyYWxcIiwgcmVnZXg6ICc8J31cbiAgICAgICAgXSxcbiAgICAgICAgXCJsaXRlcmFsQmxvY2tcIjogW1xuICAgICAgICAgICAge3Rva2VuOiBcImxpdGVyYWxcIiwgcmVnZXg6IC9eLXs0LH1cXHMqJC8sIG5leHQ6IFwiZGlzc2FsbG93RGVsaW1pdGVkQmxvY2tcIn0sXG4gICAgICAgICAgICB7dG9rZW46IFwiY29uc3RhbnQubnVtZXJpY1wiLCByZWdleDogJzxcXFxcZCs+J30sXG4gICAgICAgICAgICB7dG9rZW46IFwibGl0ZXJhbFwiLCByZWdleDogJ1tePF0rJ30sXG4gICAgICAgICAgICB7dG9rZW46IFwibGl0ZXJhbFwiLCByZWdleDogJzwnfVxuICAgICAgICBdLFxuICAgICAgICBcInBhc3N0aHJvdWdoQmxvY2tcIjogW1xuICAgICAgICAgICAge3Rva2VuOiBcImxpdGVyYWxcIiwgcmVnZXg6IC9eXFwrezQsfVxccyokLywgbmV4dDogXCJkaXNzYWxsb3dEZWxpbWl0ZWRCbG9ja1wifSxcbiAgICAgICAgICAgIHt0b2tlbjogXCJsaXRlcmFsXCIsIHJlZ2V4OiBpZGVudGlmaWVyUmUgKyBcInxcXFxcZCtcIn0sXG4gICAgICAgICAgICB7aW5jbHVkZTogXCJtYWNyb3NcIn0sXG4gICAgICAgICAgICB7dG9rZW46IFwibGl0ZXJhbFwiLCByZWdleDogXCIuXCJ9XG4gICAgICAgIF0sXG5cbiAgICAgICAgXCJzbWFsbFBhc3N0aHJvdWdoXCI6IFtcbiAgICAgICAgICAgIHt0b2tlbjogXCJsaXRlcmFsXCIsIHJlZ2V4OiAvWytdezMsfS8sIG5leHQ6IFwiZGlzc2FsbG93RGVsaW1pdGVkQmxvY2tcIn0sXG4gICAgICAgICAgICB7dG9rZW46IFwibGl0ZXJhbFwiLCByZWdleDogL15cXHMqJC8sIG5leHQ6IFwiZGlzc2FsbG93RGVsaW1pdGVkQmxvY2tcIn0sXG4gICAgICAgICAgICB7dG9rZW46IFwibGl0ZXJhbFwiLCByZWdleDogaWRlbnRpZmllclJlICsgXCJ8XFxcXGQrXCJ9LFxuICAgICAgICAgICAge2luY2x1ZGU6IFwibWFjcm9zXCJ9XG4gICAgICAgIF0sXG5cbiAgICAgICAgXCJjb21tZW50QmxvY2tcIjogW1xuICAgICAgICAgICAge3Rva2VuOiBcImRvYy5jb21tZW50XCIsIHJlZ2V4OiAvXlxcL3s0LH1cXHMqJC8sIG5leHQ6IFwiZGlzc2FsbG93RGVsaW1pdGVkQmxvY2tcIn0sXG4gICAgICAgICAgICB7dG9rZW46IFwiZG9jLmNvbW1lbnRcIiwgcmVnZXg6ICdeLiokJ31cbiAgICAgICAgXSxcbiAgICAgICAgXCJ0YWJsZUJsb2NrXCI6IFtcbiAgICAgICAgICAgIHt0b2tlbjogXCJ0YWJsZUJsb2NrXCIsIHJlZ2V4OiAvXlxccypcXHw9ezMsfVxccyokLywgbmV4dDogXCJkaXNzYWxsb3dEZWxpbWl0ZWRCbG9ja1wifSxcbiAgICAgICAgICAgIHt0b2tlbjogXCJ0YWJsZUJsb2NrXCIsIHJlZ2V4OiAvXlxccyohPXszLH1cXHMqJC8sIG5leHQ6IFwiaW5uZXJUYWJsZUJsb2NrXCJ9LFxuICAgICAgICAgICAge3Rva2VuOiBcInRhYmxlQmxvY2tcIiwgcmVnZXg6IC9cXHwvfSxcbiAgICAgICAgICAgIHtpbmNsdWRlOiBcInRleHRcIiwgbm9Fc2NhcGU6IHRydWV9XG4gICAgICAgIF0sXG4gICAgICAgIFwiaW5uZXJUYWJsZUJsb2NrXCI6IFtcbiAgICAgICAgICAgIHt0b2tlbjogXCJ0YWJsZUJsb2NrXCIsIHJlZ2V4OiAvXlxccyohPXszLH1cXHMqJC8sIG5leHQ6IFwidGFibGVCbG9ja1wifSxcbiAgICAgICAgICAgIHt0b2tlbjogXCJ0YWJsZUJsb2NrXCIsIHJlZ2V4OiAvXlxccyp8PXszLH1cXHMqJC8sIG5leHQ6IFwiZGlzc2FsbG93RGVsaW1pdGVkQmxvY2tcIn0sXG4gICAgICAgICAgICB7dG9rZW46IFwidGFibGVCbG9ja1wiLCByZWdleDogLyEvfVxuICAgICAgICBdLFxuICAgICAgICBcIm1hY3Jvc1wiOiBbXG4gICAgICAgICAgICB7dG9rZW46IFwibWFjcm9cIiwgcmVnZXg6IC97W1xcd1xcLSRdK30vfSxcbiAgICAgICAgICAgIHt0b2tlbjogW1widGV4dFwiLCBcInN0cmluZ1wiLCBcInRleHRcIiwgXCJjb25zdGFudC5jaGFyYWN0ZXJcIiwgXCJ0ZXh0XCJdLCByZWdleDogLyh7KShbXFx3XFwtJF0rKSg6KT8oLispPyh9KS99LFxuICAgICAgICAgICAge3Rva2VuOiBbXCJ0ZXh0XCIsIFwibWFya3VwLmxpc3QubWFjcm9cIiwgXCJrZXl3b3JkXCIsIFwic3RyaW5nXCJdLCByZWdleDogLyhcXHcrKShmb290bm90ZSg/OnJlZik/Ojo/KShbXlxcc1xcW10rKT8oXFxbLio/XFxdKT8vfSxcbiAgICAgICAgICAgIHt0b2tlbjogW1wibWFya3VwLmxpc3QubWFjcm9cIiwgXCJrZXl3b3JkXCIsIFwic3RyaW5nXCJdLCByZWdleDogLyhbYS16QS1aXFwtXVtcXHdcXC5cXC9cXC1dKjo6PykoW15cXHNcXFtdKykoXFxbLio/XFxdKT8vfSxcbiAgICAgICAgICAgIHt0b2tlbjogW1wibWFya3VwLmxpc3QubWFjcm9cIiwgXCJrZXl3b3JkXCJdLCByZWdleDogLyhbYS16QS1aXFwtXVtcXHdcXC5cXC9cXC1dKzo6PykoXFxbLio/XFxdKS99LFxuICAgICAgICAgICAge3Rva2VuOiBcImtleXdvcmRcIiwgICAgIHJlZ2V4OiAvXjouKz86KD89IHwkKS99XG4gICAgICAgIF0sXG5cbiAgICAgICAgXCJxdW90ZXNcIjogW1xuICAgICAgICAgICAge3Rva2VuOiBcInN0cmluZy5pdGFsaWNcIiwgcmVnZXg6IC9fX1teX1xcc10uKj9fXy99LFxuICAgICAgICAgICAge3Rva2VuOiBcInN0cmluZy5pdGFsaWNcIiwgcmVnZXg6IHF1b3RlUnVsZShcIl9cIil9LFxuICAgICAgICAgICAgXG4gICAgICAgICAgICB7dG9rZW46IFwia2V5d29yZC5ib2xkXCIsIHJlZ2V4OiAvXFwqXFwqW14qXFxzXS4qP1xcKlxcKi99LFxuICAgICAgICAgICAge3Rva2VuOiBcImtleXdvcmQuYm9sZFwiLCByZWdleDogcXVvdGVSdWxlKFwiXFxcXCpcIil9LFxuICAgICAgICAgICAgXG4gICAgICAgICAgICB7dG9rZW46IFwibGl0ZXJhbFwiLCByZWdleDogcXVvdGVSdWxlKFwiXFxcXCtcIil9LFxuICAgICAgICAgICAge3Rva2VuOiBcImxpdGVyYWxcIiwgcmVnZXg6IC9cXCtcXCtbXitcXHNdLio/XFwrXFwrL30sXG4gICAgICAgICAgICB7dG9rZW46IFwibGl0ZXJhbFwiLCByZWdleDogL1xcJFxcJC4rP1xcJFxcJC99LFxuICAgICAgICAgICAge3Rva2VuOiBcImxpdGVyYWxcIiwgcmVnZXg6IHF1b3RlUnVsZShcImBcIil9LFxuXG4gICAgICAgICAgICB7dG9rZW46IFwia2V5d29yZFwiLCByZWdleDogcXVvdGVSdWxlKFwiXlwiKX0sXG4gICAgICAgICAgICB7dG9rZW46IFwia2V5d29yZFwiLCByZWdleDogcXVvdGVSdWxlKFwiflwiKX0sXG4gICAgICAgICAgICB7dG9rZW46IFwia2V5d29yZFwiLCByZWdleDogLyMjPy99LFxuICAgICAgICAgICAge3Rva2VuOiBcImtleXdvcmRcIiwgcmVnZXg6IC8oPzpcXEJ8XilgYHxcXGInJy99XG4gICAgICAgIF1cblxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBxdW90ZVJ1bGUoY2gpIHtcbiAgICAgICAgdmFyIHByZWZpeCA9IC9cXHcvLnRlc3QoY2gpID8gXCJcXFxcYlwiIDogXCIoPzpcXFxcQnxeKVwiO1xuICAgICAgICByZXR1cm4gcHJlZml4ICsgY2ggKyBcIlteXCIgKyBjaCArIFwiXS4qP1wiICsgY2ggKyBcIig/IVtcXFxcdypdKVwiO1xuICAgIH1cblxuICAgIC8vYWRkUXVvdGVCbG9jayhcInRleHRcIilcblxuICAgIHZhciB0b2tlbk1hcCA9IHtcbiAgICAgICAgbWFjcm86IFwiY29uc3RhbnQuY2hhcmFjdGVyXCIsXG4gICAgICAgIHRhYmxlQmxvY2s6IFwiZG9jLmNvbW1lbnRcIixcbiAgICAgICAgdGl0bGVVbmRlcmxpbmU6IFwibWFya3VwLmhlYWRpbmdcIixcbiAgICAgICAgc2luZ2xlTGluZVRpdGxlOiBcIm1hcmt1cC5oZWFkaW5nXCIsXG4gICAgICAgIHBhZ2VCcmVhazogXCJzdHJpbmdcIixcbiAgICAgICAgb3B0aW9uOiBcInN0cmluZy5yZWdleHBcIixcbiAgICAgICAgb3RoZXJCbG9jazogXCJtYXJrdXAubGlzdFwiLFxuICAgICAgICBsaXRlcmFsOiBcInN1cHBvcnQuZnVuY3Rpb25cIixcbiAgICAgICAgb3B0aW9uYWxUaXRsZTogXCJjb25zdGFudC5udW1lcmljXCIsXG4gICAgICAgIGVzY2FwZTogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIixcbiAgICAgICAgbGluazogXCJtYXJrdXAudW5kZXJsaW5lLmxpc3RcIlxuICAgIH07XG5cbiAgICBmb3IgKHZhciBzdGF0ZSBpbiB0aGlzLiRydWxlcykge1xuICAgICAgICB2YXIgc3RhdGVSdWxlcyA9IHRoaXMuJHJ1bGVzW3N0YXRlXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IHN0YXRlUnVsZXMubGVuZ3RoOyBpLS07ICkge1xuICAgICAgICAgICAgdmFyIHJ1bGUgPSBzdGF0ZVJ1bGVzW2ldO1xuICAgICAgICAgICAgaWYgKHJ1bGUuaW5jbHVkZSB8fCB0eXBlb2YgcnVsZSA9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBbaSwgMV0uY29uY2F0KHRoaXMuJHJ1bGVzW3J1bGUuaW5jbHVkZSB8fCBydWxlXSk7XG4gICAgICAgICAgICAgICAgaWYgKHJ1bGUubm9Fc2NhcGUpIHtcbiAgICAgICAgICAgICAgICAgICAgYXJncyA9IGFyZ3MuZmlsdGVyKGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAheC5uZXh0O1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc3RhdGVSdWxlcy5zcGxpY2UuYXBwbHkoc3RhdGVSdWxlcywgYXJncyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJ1bGUudG9rZW4gaW4gdG9rZW5NYXApIHtcbiAgICAgICAgICAgICAgICBydWxlLnRva2VuID0gdG9rZW5NYXBbcnVsZS50b2tlbl07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59O1xub29wLmluaGVyaXRzKEFzY2lpZG9jSGlnaGxpZ2h0UnVsZXMsIFRleHRIaWdobGlnaHRSdWxlcyk7XG5cbmV4cG9ydHMuQXNjaWlkb2NIaWdobGlnaHRSdWxlcyA9IEFzY2lpZG9jSGlnaGxpZ2h0UnVsZXM7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi8uLi9saWIvb29wXCIpO1xudmFyIEJhc2VGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRfbW9kZVwiKS5Gb2xkTW9kZTtcbnZhciBSYW5nZSA9IHJlcXVpcmUoXCIuLi8uLi9yYW5nZVwiKS5SYW5nZTtcblxudmFyIEZvbGRNb2RlID0gZXhwb3J0cy5Gb2xkTW9kZSA9IGZ1bmN0aW9uKCkge307XG5vb3AuaW5oZXJpdHMoRm9sZE1vZGUsIEJhc2VGb2xkTW9kZSk7XG5cbihmdW5jdGlvbigpIHtcbiAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlciA9IC9eKD86XFx8PXsxMCx9fFtcXC5cXC89XFwtfl4rXXs0LH1cXHMqJHw9ezEsNX0gKS87XG4gICAgdGhpcy5zaW5nbGVMaW5lSGVhZGluZ1JlID0gL149ezEsNX0oPz1cXHMrXFxTKS87XG5cbiAgICB0aGlzLmdldEZvbGRXaWRnZXQgPSBmdW5jdGlvbihzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdykge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICBpZiAoIXRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyLnRlc3QobGluZSkpXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcblxuICAgICAgICBpZiAobGluZVswXSA9PSBcIj1cIikge1xuICAgICAgICAgICAgaWYgKHRoaXMuc2luZ2xlTGluZUhlYWRpbmdSZS50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgICAgIHJldHVybiBcInN0YXJ0XCI7XG4gICAgICAgICAgICBpZiAoc2Vzc2lvbi5nZXRMaW5lKHJvdyAtIDEpLmxlbmd0aCAhPSBzZXNzaW9uLmdldExpbmUocm93KS5sZW5ndGgpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgICAgICByZXR1cm4gXCJzdGFydFwiO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZXNzaW9uLmJnVG9rZW5pemVyLmdldFN0YXRlKHJvdykgPT0gXCJkaXNzYWxsb3dEZWxpbWl0ZWRCbG9ja1wiKVxuICAgICAgICAgICAgcmV0dXJuIFwiZW5kXCI7XG4gICAgICAgIHJldHVybiBcInN0YXJ0XCI7XG4gICAgfTtcblxuICAgIHRoaXMuZ2V0Rm9sZFdpZGdldFJhbmdlID0gZnVuY3Rpb24oc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgdmFyIHN0YXJ0Q29sdW1uID0gbGluZS5sZW5ndGg7XG4gICAgICAgIHZhciBtYXhSb3cgPSBzZXNzaW9uLmdldExlbmd0aCgpO1xuICAgICAgICB2YXIgc3RhcnRSb3cgPSByb3c7XG4gICAgICAgIHZhciBlbmRSb3cgPSByb3c7XG4gICAgICAgIGlmICghbGluZS5tYXRjaCh0aGlzLmZvbGRpbmdTdGFydE1hcmtlcikpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdmFyIHRva2VuO1xuICAgICAgICBmdW5jdGlvbiBnZXRUb2tlblR5cGUocm93KSB7XG4gICAgICAgICAgICB0b2tlbiA9IHNlc3Npb24uZ2V0VG9rZW5zKHJvdylbMF07XG4gICAgICAgICAgICByZXR1cm4gdG9rZW4gJiYgdG9rZW4udHlwZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBsZXZlbHMgPSBbXCI9XCIsXCItXCIsXCJ+XCIsXCJeXCIsXCIrXCJdO1xuICAgICAgICB2YXIgaGVhZGluZyA9IFwibWFya3VwLmhlYWRpbmdcIjtcbiAgICAgICAgdmFyIHNpbmdsZUxpbmVIZWFkaW5nUmUgPSB0aGlzLnNpbmdsZUxpbmVIZWFkaW5nUmU7XG4gICAgICAgIGZ1bmN0aW9uIGdldExldmVsKCkge1xuICAgICAgICAgICAgdmFyIG1hdGNoID0gdG9rZW4udmFsdWUubWF0Y2goc2luZ2xlTGluZUhlYWRpbmdSZSk7XG4gICAgICAgICAgICBpZiAobWF0Y2gpXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1hdGNoWzBdLmxlbmd0aDtcbiAgICAgICAgICAgIHZhciBsZXZlbCA9IGxldmVscy5pbmRleE9mKHRva2VuLnZhbHVlWzBdKSArIDE7XG4gICAgICAgICAgICBpZiAobGV2ZWwgPT0gMSkge1xuICAgICAgICAgICAgICAgIGlmIChzZXNzaW9uLmdldExpbmUocm93IC0gMSkubGVuZ3RoICE9IHNlc3Npb24uZ2V0TGluZShyb3cpLmxlbmd0aClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEluZmluaXR5O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGxldmVsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGdldFRva2VuVHlwZShyb3cpID09IGhlYWRpbmcpIHtcbiAgICAgICAgICAgIHZhciBzdGFydEhlYWRpbmdMZXZlbCA9IGdldExldmVsKCk7XG4gICAgICAgICAgICB3aGlsZSAoKytyb3cgPCBtYXhSb3cpIHtcbiAgICAgICAgICAgICAgICBpZiAoZ2V0VG9rZW5UeXBlKHJvdykgIT0gaGVhZGluZylcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgdmFyIGxldmVsID0gZ2V0TGV2ZWwoKTtcbiAgICAgICAgICAgICAgICBpZiAobGV2ZWwgPD0gc3RhcnRIZWFkaW5nTGV2ZWwpXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgaXNTaW5nbGVMaW5lSGVhZGluZyA9IHRva2VuICYmIHRva2VuLnZhbHVlLm1hdGNoKHRoaXMuc2luZ2xlTGluZUhlYWRpbmdSZSk7XG4gICAgICAgICAgICBlbmRSb3cgPSBpc1NpbmdsZUxpbmVIZWFkaW5nID8gcm93IC0gMSA6IHJvdyAtIDI7XG5cbiAgICAgICAgICAgIGlmIChlbmRSb3cgPiBzdGFydFJvdykge1xuICAgICAgICAgICAgICAgIHdoaWxlIChlbmRSb3cgPiBzdGFydFJvdyAmJiAoIWdldFRva2VuVHlwZShlbmRSb3cpIHx8IHRva2VuLnZhbHVlWzBdID09IFwiW1wiKSlcbiAgICAgICAgICAgICAgICAgICAgZW5kUm93LS07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChlbmRSb3cgPiBzdGFydFJvdykge1xuICAgICAgICAgICAgICAgIHZhciBlbmRDb2x1bW4gPSBzZXNzaW9uLmdldExpbmUoZW5kUm93KS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShzdGFydFJvdywgc3RhcnRDb2x1bW4sIGVuZFJvdywgZW5kQ29sdW1uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBzdGF0ZSA9IHNlc3Npb24uYmdUb2tlbml6ZXIuZ2V0U3RhdGUocm93KTtcbiAgICAgICAgICAgIGlmIChzdGF0ZSA9PSBcImRpc3NhbGxvd0RlbGltaXRlZEJsb2NrXCIpIHtcbiAgICAgICAgICAgICAgICB3aGlsZSAocm93IC0tID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2Vzc2lvbi5iZ1Rva2VuaXplci5nZXRTdGF0ZShyb3cpLmxhc3RJbmRleE9mKFwiQmxvY2tcIikgPT0gLTEpXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZW5kUm93ID0gcm93ICsgMTtcbiAgICAgICAgICAgICAgICBpZiAoZW5kUm93IDwgc3RhcnRSb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVuZENvbHVtbiA9IHNlc3Npb24uZ2V0TGluZShyb3cpLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShlbmRSb3csIDUsIHN0YXJ0Um93LCBzdGFydENvbHVtbiAtIDUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgd2hpbGUgKCsrcm93IDwgbWF4Um93KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZXNzaW9uLmJnVG9rZW5pemVyLmdldFN0YXRlKHJvdykgPT0gXCJkaXNzYWxsb3dEZWxpbWl0ZWRCbG9ja1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVuZFJvdyA9IHJvdztcbiAgICAgICAgICAgICAgICBpZiAoZW5kUm93ID4gc3RhcnRSb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVuZENvbHVtbiA9IHNlc3Npb24uZ2V0TGluZShyb3cpLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShzdGFydFJvdywgNSwgZW5kUm93LCBlbmRDb2x1bW4gLSA1KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG59KS5jYWxsKEZvbGRNb2RlLnByb3RvdHlwZSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=