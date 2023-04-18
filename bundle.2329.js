"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[2329],{

/***/ 82329:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var HtmlMode = (__webpack_require__(75528).Mode);
var TwigHighlightRules = (__webpack_require__(25375)/* .TwigHighlightRules */ .D);
var MatchingBraceOutdent = (__webpack_require__(1164).MatchingBraceOutdent);

var Mode = function() {
    HtmlMode.call(this);
    this.HighlightRules = TwigHighlightRules;
    this.$outdent = new MatchingBraceOutdent();
};
oop.inherits(Mode, HtmlMode);

(function() {
    this.blockComment = {start: "{#", end: "#}"};

    this.getNextLineIndent = function(state, line, tab) {
        var indent = this.$getIndent(line);

        var tokenizedLine = this.getTokenizer().getLineTokens(line, state);
        var tokens = tokenizedLine.tokens;
        var endState = tokenizedLine.state;

        if (tokens.length && tokens[tokens.length-1].type == "comment") {
            return indent;
        }

        if (state == "start") {
            var match = line.match(/^.*[\{\(\[]\s*$/);
            if (match) {
                indent += tab;
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
    this.$id = "ace/mode/twig";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 25375:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var lang = __webpack_require__(20124);
var HtmlHighlightRules = (__webpack_require__(72843)/* .HtmlHighlightRules */ .V);
var TextHighlightRules = (__webpack_require__(28053)/* .TextHighlightRules */ .K);

var TwigHighlightRules = function() {
    // inherit from html
    HtmlHighlightRules.call(this);

    var tags = "autoescape|block|do|embed|extends|filter|flush|for|from|if|import|include|macro|sandbox|set|spaceless|use|verbatim";
    tags = tags + "|end" + tags.replace(/\|/g, "|end");
    var filters = "abs|batch|capitalize|convert_encoding|date|date_modify|default|e|escape|first|format|join|json_encode|keys|last|length|lower|merge|nl2br|number_format|raw|replace|reverse|slice|sort|split|striptags|title|trim|upper|url_encode";
    var functions = "attribute|constant|cycle|date|dump|parent|random|range|template_from_string";
    var tests = "constant|divisibleby|sameas|defined|empty|even|iterable|odd";
    var constants = "null|none|true|false";
    var operators = "b-and|b-xor|b-or|in|is|and|or|not";

    var keywordMapper = this.createKeywordMapper({
        "keyword.control.twig": tags,
        "support.function.twig": [filters, functions, tests].join("|"),
        "keyword.operator.twig":  operators,
        "constant.language.twig": constants
    }, "identifier");

    // add twig start tags to the HTML start tags
    for (var rule in this.$rules) {
        this.$rules[rule].unshift({
            token : "variable.other.readwrite.local.twig",
            regex : "\\{\\{-?",
            push : "twig-start"
        }, {
            token : "meta.tag.twig",
            regex : "\\{%-?",
            push : "twig-start"
        }, {
            token : "comment.block.twig",
            regex : "\\{#-?",
            push : "twig-comment"
        });
    }

    // add twig closing comment to HTML comments
    this.$rules["twig-comment"] = [{
        token : "comment.block.twig",
        regex : ".*-?#\\}",
        next : "pop"
    }];

    this.$rules["twig-start"] = [{
        token : "variable.other.readwrite.local.twig",
        regex : "-?\\}\\}",
        next : "pop"
    }, {
        token : "meta.tag.twig",
        regex : "-?%\\}",
        next : "pop"
    }, {
        token : "string",
        regex : "'",
        next  : "twig-qstring"
    }, {
        token : "string",
        regex : '"',
        next  : "twig-qqstring"
    }, {
        token : "constant.numeric", // hex
        regex : "0[xX][0-9a-fA-F]+\\b"
    }, {
        token : "constant.numeric", // float
        regex : "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
    }, {
        token : "constant.language.boolean",
        regex : "(?:true|false)\\b"
    }, {
        token : keywordMapper,
        regex : "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
    }, {
        token : "keyword.operator.assignment",
        regex : "=|~"
    }, {
        token : "keyword.operator.comparison",
        regex : "==|!=|<|>|>=|<=|==="
    }, {
        token : "keyword.operator.arithmetic",
        regex : "\\+|-|/|%|//|\\*|\\*\\*"
    }, {
        token : "keyword.operator.other",
        regex : "\\.\\.|\\|"
    }, {
        token : "punctuation.operator",
        regex : /\?|:|,|;|\./
    }, {
        token : "paren.lparen",
        regex : /[\[\({]/
    }, {
        token : "paren.rparen",
        regex : /[\])}]/
    }, {
        token : "text",
        regex : "\\s+"
    } ];

    this.$rules["twig-qqstring"] = [{
            token : "constant.language.escape",
            regex : /\\[\\"$#ntr]|#{[^"}]*}/
        }, {
            token : "string",
            regex : '"',
            next  : "twig-start"
        }, {
            defaultToken : "string"
        }
    ];

    this.$rules["twig-qstring"] = [{
            token : "constant.language.escape",
            regex : /\\[\\'ntr]}/
        }, {
            token : "string",
            regex : "'",
            next  : "twig-start"
        }, {
            defaultToken : "string"
        }
    ];

    this.normalizeRules();
};

oop.inherits(TwigHighlightRules, TextHighlightRules);

exports.D = TwigHighlightRules;


/***/ })

}]);
//# sourceMappingURL=bundle.2329.js.map