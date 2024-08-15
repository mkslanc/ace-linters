(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[5005],{

/***/ 25005:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var GherkinHighlightRules = (__webpack_require__(18394)/* .GherkinHighlightRules */ .M);

var Mode = function() {
    this.HighlightRules = GherkinHighlightRules;
    this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, TextMode);

(function() {
    this.lineCommentStart = "#";
    this.$id = "ace/mode/gherkin";

    this.getNextLineIndent = function(state, line, tab) {
        var indent = this.$getIndent(line);
        var space2 = "  ";

        var tokenizedLine = this.getTokenizer().getLineTokens(line, state);
        var tokens = tokenizedLine.tokens;
        
        if(line.match("[ ]*\\|")) {
            indent += "| ";
        }

        if (tokens.length && tokens[tokens.length-1].type == "comment") {
            return indent;
        }
        

        if (state == "start") {
            if (line.match("Scenario:|Feature:|Scenario Outline:|Background:")) {
                indent += space2;
            } else if(line.match("(Given|Then).+(:)$|Examples:")) {
                indent += space2;
            } else if(line.match("\\*.+")) {
                indent += "* ";
            } 
        }
        

        return indent;
    };
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 18394:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);
var stringEscape =  "\\\\(x[0-9A-Fa-f]{2}|[0-7]{3}|[\\\\abfnrtv'\"]|U[0-9A-Fa-f]{8}|u[0-9A-Fa-f]{4})";

var GherkinHighlightRules = function() {
    var languages = [{
        name: "en",
        labels: "Feature|Background|Scenario(?: Outline)?|Examples",
        keywords: "Given|When|Then|And|But"
    }
    /* TODO find a way to enable this when first line in the file is # language: pl
    , {
        name: "pl",
        labels: "Właściwość|Funkcja|Aspekt|Potrzeba biznesowa|Założenia|Scenariusz|Szablon scenariusza|Przykłady",
        keywords: "Mając|Zakładając(?:, że)?|Jeżeli|Jeśli|Gdy|Kiedy|Wtedy|Oraz|I|Ale"
    }
    */];
    
    var labels = languages.map(function(l) {
        return l.labels;
    }).join("|");
    var keywords = languages.map(function(l) {
        return l.keywords;
    }).join("|");
    
    // need to include constant ints
    this.$rules = {
        start : [{
            token: "constant.numeric",
            regex: "(?:(?:[1-9]\\d*)|(?:0))"
        }, {
            token : "comment",
            regex : "#.*$"
        }, {
            token : "keyword",
            regex : "(?:" + labels + "):|(?:" + keywords + ")\\b"
        }, {
            token : "keyword",
            regex : "\\*"
        }, {
            token : "string",           // multi line """ string start
            regex : '"{3}',
            next : "qqstring3"
        }, {
            token : "string",           // " string
            regex : '"',
            next : "qqstring"
        }, {
            token : "text",
            regex : "^\\s*(?=@[\\w])",
            next : [{
                token : "text",
                regex : "\\s+"
            }, {
                token : "variable.parameter",
                regex : "@[\\w]+"
            }, {
                token : "empty",
                regex : "",
                next : "start"
            }]
        }, {
            token : "comment",
            regex : "<[^>]+>"
        }, {
            token : "comment",
            regex : "\\|(?=.)",
            next : "table-item"
        }, {
            token : "comment",
            regex : "\\|$",
            next : "start"
        }],
        "qqstring3" : [ {
            token : "constant.language.escape",
            regex : stringEscape
        }, {
            token : "string", // multi line """ string end
            regex : '"{3}',
            next : "start"
        }, {
            defaultToken : "string"
        }],
        "qqstring" : [{
            token : "constant.language.escape",
            regex : stringEscape
        }, {
            token : "string",
            regex : "\\\\$",
            next  : "qqstring"
        }, {
            token : "string",
            regex : '"|$',
            next  : "start"
        }, {
            defaultToken: "string"
        }],
        "table-item" : [{
            token : "comment",
            regex : /$/,
            next : "start"
        }, {
            token : "comment",
            regex : /\|/
        }, {
            token : "string",
            regex : /\\./
        }, {
            defaultToken : "string"
        }]
    };
    this.normalizeRules();
};

oop.inherits(GherkinHighlightRules, TextHighlightRules);

exports.M = GherkinHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjUwMDUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxVQUFVLG1CQUFPLENBQUMsSUFBWTtBQUM5QixlQUFlLGlDQUFzQjtBQUNyQyw0QkFBNEIsMkRBQTBEOztBQUV0RjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCxZQUFZOzs7Ozs7OztBQzdDWixVQUFVLG1CQUFPLENBQUMsSUFBWTtBQUM5Qix5QkFBeUIsd0RBQW9EO0FBQzdFLHVDQUF1QyxFQUFFLE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxjQUFjLEVBQUU7O0FBRW5HO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsdUJBQXVCLEVBQUU7QUFDekI7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSx1QkFBdUIsRUFBRTtBQUN6QjtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBOztBQUVBLFNBQTZCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9naGVya2luLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvZ2hlcmtpbl9oaWdobGlnaHRfcnVsZXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRNb2RlID0gcmVxdWlyZShcIi4vdGV4dFwiKS5Nb2RlO1xudmFyIEdoZXJraW5IaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL2doZXJraW5faGlnaGxpZ2h0X3J1bGVzXCIpLkdoZXJraW5IaWdobGlnaHRSdWxlcztcblxudmFyIE1vZGUgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLkhpZ2hsaWdodFJ1bGVzID0gR2hlcmtpbkhpZ2hsaWdodFJ1bGVzO1xuICAgIHRoaXMuJGJlaGF2aW91ciA9IHRoaXMuJGRlZmF1bHRCZWhhdmlvdXI7XG59O1xub29wLmluaGVyaXRzKE1vZGUsIFRleHRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuICAgIHRoaXMubGluZUNvbW1lbnRTdGFydCA9IFwiI1wiO1xuICAgIHRoaXMuJGlkID0gXCJhY2UvbW9kZS9naGVya2luXCI7XG5cbiAgICB0aGlzLmdldE5leHRMaW5lSW5kZW50ID0gZnVuY3Rpb24oc3RhdGUsIGxpbmUsIHRhYikge1xuICAgICAgICB2YXIgaW5kZW50ID0gdGhpcy4kZ2V0SW5kZW50KGxpbmUpO1xuICAgICAgICB2YXIgc3BhY2UyID0gXCIgIFwiO1xuXG4gICAgICAgIHZhciB0b2tlbml6ZWRMaW5lID0gdGhpcy5nZXRUb2tlbml6ZXIoKS5nZXRMaW5lVG9rZW5zKGxpbmUsIHN0YXRlKTtcbiAgICAgICAgdmFyIHRva2VucyA9IHRva2VuaXplZExpbmUudG9rZW5zO1xuICAgICAgICBcbiAgICAgICAgaWYobGluZS5tYXRjaChcIlsgXSpcXFxcfFwiKSkge1xuICAgICAgICAgICAgaW5kZW50ICs9IFwifCBcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0b2tlbnMubGVuZ3RoICYmIHRva2Vuc1t0b2tlbnMubGVuZ3RoLTFdLnR5cGUgPT0gXCJjb21tZW50XCIpIHtcbiAgICAgICAgICAgIHJldHVybiBpbmRlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgXG5cbiAgICAgICAgaWYgKHN0YXRlID09IFwic3RhcnRcIikge1xuICAgICAgICAgICAgaWYgKGxpbmUubWF0Y2goXCJTY2VuYXJpbzp8RmVhdHVyZTp8U2NlbmFyaW8gT3V0bGluZTp8QmFja2dyb3VuZDpcIikpIHtcbiAgICAgICAgICAgICAgICBpbmRlbnQgKz0gc3BhY2UyO1xuICAgICAgICAgICAgfSBlbHNlIGlmKGxpbmUubWF0Y2goXCIoR2l2ZW58VGhlbikuKyg6KSR8RXhhbXBsZXM6XCIpKSB7XG4gICAgICAgICAgICAgICAgaW5kZW50ICs9IHNwYWNlMjtcbiAgICAgICAgICAgIH0gZWxzZSBpZihsaW5lLm1hdGNoKFwiXFxcXCouK1wiKSkge1xuICAgICAgICAgICAgICAgIGluZGVudCArPSBcIiogXCI7XG4gICAgICAgICAgICB9IFxuICAgICAgICB9XG4gICAgICAgIFxuXG4gICAgICAgIHJldHVybiBpbmRlbnQ7XG4gICAgfTtcbn0pLmNhbGwoTW9kZS5wcm90b3R5cGUpO1xuXG5leHBvcnRzLk1vZGUgPSBNb2RlO1xuIiwidmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcbnZhciBzdHJpbmdFc2NhcGUgPSAgXCJcXFxcXFxcXCh4WzAtOUEtRmEtZl17Mn18WzAtN117M318W1xcXFxcXFxcYWJmbnJ0didcXFwiXXxVWzAtOUEtRmEtZl17OH18dVswLTlBLUZhLWZdezR9KVwiO1xuXG52YXIgR2hlcmtpbkhpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGxhbmd1YWdlcyA9IFt7XG4gICAgICAgIG5hbWU6IFwiZW5cIixcbiAgICAgICAgbGFiZWxzOiBcIkZlYXR1cmV8QmFja2dyb3VuZHxTY2VuYXJpbyg/OiBPdXRsaW5lKT98RXhhbXBsZXNcIixcbiAgICAgICAga2V5d29yZHM6IFwiR2l2ZW58V2hlbnxUaGVufEFuZHxCdXRcIlxuICAgIH1cbiAgICAvKiBUT0RPIGZpbmQgYSB3YXkgdG8gZW5hYmxlIHRoaXMgd2hlbiBmaXJzdCBsaW5lIGluIHRoZSBmaWxlIGlzICMgbGFuZ3VhZ2U6IHBsXG4gICAgLCB7XG4gICAgICAgIG5hbWU6IFwicGxcIixcbiAgICAgICAgbGFiZWxzOiBcIlfFgmHFm2Npd2/Fm8SHfEZ1bmtjamF8QXNwZWt0fFBvdHJ6ZWJhIGJpem5lc293YXxaYcWCb8W8ZW5pYXxTY2VuYXJpdXN6fFN6YWJsb24gc2NlbmFyaXVzemF8UHJ6eWvFgmFkeVwiLFxuICAgICAgICBrZXl3b3JkczogXCJNYWrEhWN8WmFrxYJhZGFqxIVjKD86LCDFvGUpP3xKZcW8ZWxpfEplxZtsaXxHZHl8S2llZHl8V3RlZHl8T3JhenxJfEFsZVwiXG4gICAgfVxuICAgICovXTtcbiAgICBcbiAgICB2YXIgbGFiZWxzID0gbGFuZ3VhZ2VzLm1hcChmdW5jdGlvbihsKSB7XG4gICAgICAgIHJldHVybiBsLmxhYmVscztcbiAgICB9KS5qb2luKFwifFwiKTtcbiAgICB2YXIga2V5d29yZHMgPSBsYW5ndWFnZXMubWFwKGZ1bmN0aW9uKGwpIHtcbiAgICAgICAgcmV0dXJuIGwua2V5d29yZHM7XG4gICAgfSkuam9pbihcInxcIik7XG4gICAgXG4gICAgLy8gbmVlZCB0byBpbmNsdWRlIGNvbnN0YW50IGludHNcbiAgICB0aGlzLiRydWxlcyA9IHtcbiAgICAgICAgc3RhcnQgOiBbe1xuICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQubnVtZXJpY1wiLFxuICAgICAgICAgICAgcmVnZXg6IFwiKD86KD86WzEtOV1cXFxcZCopfCg/OjApKVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsXG4gICAgICAgICAgICByZWdleCA6IFwiIy4qJFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiKD86XCIgKyBsYWJlbHMgKyBcIik6fCg/OlwiICsga2V5d29yZHMgKyBcIilcXFxcYlwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiXFxcXCpcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsICAgICAgICAgICAvLyBtdWx0aSBsaW5lIFwiXCJcIiBzdHJpbmcgc3RhcnRcbiAgICAgICAgICAgIHJlZ2V4IDogJ1wiezN9JyxcbiAgICAgICAgICAgIG5leHQgOiBcInFxc3RyaW5nM1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIiwgICAgICAgICAgIC8vIFwiIHN0cmluZ1xuICAgICAgICAgICAgcmVnZXggOiAnXCInLFxuICAgICAgICAgICAgbmV4dCA6IFwicXFzdHJpbmdcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwidGV4dFwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIl5cXFxccyooPz1AW1xcXFx3XSlcIixcbiAgICAgICAgICAgIG5leHQgOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFxzK1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInZhcmlhYmxlLnBhcmFtZXRlclwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJAW1xcXFx3XStcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJlbXB0eVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcIixcbiAgICAgICAgICAgICAgICBuZXh0IDogXCJzdGFydFwiXG4gICAgICAgICAgICB9XVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudFwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIjxbXj5dKz5cIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudFwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIlxcXFx8KD89LilcIixcbiAgICAgICAgICAgIG5leHQgOiBcInRhYmxlLWl0ZW1cIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudFwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIlxcXFx8JFwiLFxuICAgICAgICAgICAgbmV4dCA6IFwic3RhcnRcIlxuICAgICAgICB9XSxcbiAgICAgICAgXCJxcXN0cmluZzNcIiA6IFsge1xuICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLFxuICAgICAgICAgICAgcmVnZXggOiBzdHJpbmdFc2NhcGVcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLCAvLyBtdWx0aSBsaW5lIFwiXCJcIiBzdHJpbmcgZW5kXG4gICAgICAgICAgICByZWdleCA6ICdcInszfScsXG4gICAgICAgICAgICBuZXh0IDogXCJzdGFydFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGRlZmF1bHRUb2tlbiA6IFwic3RyaW5nXCJcbiAgICAgICAgfV0sXG4gICAgICAgIFwicXFzdHJpbmdcIiA6IFt7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCIsXG4gICAgICAgICAgICByZWdleCA6IHN0cmluZ0VzY2FwZVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiXFxcXFxcXFwkXCIsXG4gICAgICAgICAgICBuZXh0ICA6IFwicXFzdHJpbmdcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICByZWdleCA6ICdcInwkJyxcbiAgICAgICAgICAgIG5leHQgIDogXCJzdGFydFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzdHJpbmdcIlxuICAgICAgICB9XSxcbiAgICAgICAgXCJ0YWJsZS1pdGVtXCIgOiBbe1xuICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIixcbiAgICAgICAgICAgIHJlZ2V4IDogLyQvLFxuICAgICAgICAgICAgbmV4dCA6IFwic3RhcnRcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudFwiLFxuICAgICAgICAgICAgcmVnZXggOiAvXFx8L1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICByZWdleCA6IC9cXFxcLi9cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgZGVmYXVsdFRva2VuIDogXCJzdHJpbmdcIlxuICAgICAgICB9XVxuICAgIH07XG4gICAgdGhpcy5ub3JtYWxpemVSdWxlcygpO1xufTtcblxub29wLmluaGVyaXRzKEdoZXJraW5IaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuZXhwb3J0cy5HaGVya2luSGlnaGxpZ2h0UnVsZXMgPSBHaGVya2luSGlnaGxpZ2h0UnVsZXM7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=