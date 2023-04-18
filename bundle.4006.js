"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[4006],{

/***/ 94006:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var TextMode = (__webpack_require__(98030).Mode);
var FtlHighlightRules = (__webpack_require__(88395)/* .FtlHighlightRules */ .u);

var Mode = function() {
    this.HighlightRules = FtlHighlightRules;
    this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, TextMode);

(function() {

    this.$id = "ace/mode/ftl";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 88395:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var HtmlHighlightRules = (__webpack_require__(72843)/* .HtmlHighlightRules */ .V);
var TextHighlightRules = (__webpack_require__(28053)/* .TextHighlightRules */ .K);

var FtlLangHighlightRules = function () {

    var stringBuiltIns = "\\?|substring|cap_first|uncap_first|capitalize|chop_linebreak|date|time|datetime|"
        + "ends_with|html|groups|index_of|j_string|js_string|json_string|last_index_of|length|lower_case|"
        + "left_pad|right_pad|contains|matches|number|replace|rtf|url|split|starts_with|string|trim|"
        + "upper_case|word_list|xhtml|xml";
    var numberBuiltIns = "c|round|floor|ceiling";
    var dateBuiltIns = "iso_[a-z_]+";
    var seqBuiltIns = "first|last|seq_contains|seq_index_of|seq_last_index_of|reverse|size|sort|sort_by|chunk";
    var hashBuiltIns = "keys|values";
    var xmlBuiltIns = "children|parent|root|ancestors|node_name|node_type|node_namespace";
    var expertBuiltIns = "byte|double|float|int|long|short|number_to_date|number_to_time|number_to_datetime|"
        + "eval|has_content|interpret|is_[a-z_]+|namespacenew";
    var allBuiltIns = stringBuiltIns + numberBuiltIns + dateBuiltIns + seqBuiltIns + hashBuiltIns
        + xmlBuiltIns + expertBuiltIns;

    var deprecatedBuiltIns = "default|exists|if_exists|web_safe";

    var variables = "data_model|error|globals|lang|locale|locals|main|namespace|node|current_node|"
        + "now|output_encoding|template_name|url_escaping_charset|vars|version";

    var operators = "gt|gte|lt|lte|as|in|using";

    var reserved = "true|false";

    var attributes = "encoding|parse|locale|number_format|date_format|time_format|datetime_format|time_zone|"
        + "url_escaping_charset|classic_compatible|strip_whitespace|strip_text|strict_syntax|ns_prefixes|"
        + "attributes";

    this.$rules = {
        "start" : [{
            token : "constant.character.entity",
            regex : /&[^;]+;/
        }, {
            token : "support.function",
            regex : "\\?("+allBuiltIns+")"
        },  {
            token : "support.function.deprecated",
            regex : "\\?("+deprecatedBuiltIns+")"
        }, {
            token : "language.variable",
            regex : "\\.(?:"+variables+")"
        }, {
            token : "constant.language",
            regex : "\\b("+reserved+")\\b"
        }, {
            token : "keyword.operator",
            regex : "\\b(?:"+operators+")\\b"
        }, {
            token : "entity.other.attribute-name",
            regex : attributes
        }, {
            token : "string", //
            regex : /['"]/,
            next : "qstring"
        }, {
            // Deal with variable names that contains number
            // e.g. <#if var42 == 42 >
            token : function(value) {
                if (value.match("^[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?$")) {
                    return "constant.numeric";
                } else {
                    return "variable";
                }
            },
            regex : /[\w.+\-]+/
        }, {
            token : "keyword.operator",
            regex : "!|\\.|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^="
        }, {
            token : "paren.lparen",
            regex : "[[({]"
        }, {
            token : "paren.rparen",
            regex : "[\\])}]"
        }, {
            token : "text",
            regex : "\\s+"
        }],

        "qstring" : [{
            token : "constant.character.escape",
            regex : '\\\\[nrtvef\\\\"$]'
        }, {
            token : "string",
            regex : /['"]/,
            next : "start"
        }, {
            defaultToken : "string"
        }]
    };
};

oop.inherits(FtlLangHighlightRules, TextHighlightRules);

var FtlHighlightRules = function() {
    HtmlHighlightRules.call(this);

    var directives = "assign|attempt|break|case|compress|default|elseif|else|escape|fallback|function|flush|"
        + "ftl|global|if|import|include|list|local|lt|macro|nested|noescape|noparse|nt|recover|recurse|return|rt|"
        + "setting|stop|switch|t|visit";

    var startRules = [
        {
            token : "comment",
            regex : "<#--",
            next : "ftl-dcomment"
        }, {
            token : "string.interpolated",
            regex : "\\${",
            push  : "ftl-start"
        }, {
            token : "keyword.function",
            regex :  "</?#("+directives+")",
            push : "ftl-start"
        }, {
            token : "keyword.other",
            regex : "</?@[a-zA-Z\\.]+",
            push : "ftl-start"
        }
    ];

    var endRules = [
        {
           token : "keyword",
            regex : "/?>",
            next  : "pop"
        }, {
            token : "string.interpolated",
            regex : "}",
            next  : "pop"
        }
    ];

    for (var key in this.$rules)
        this.$rules[key].unshift.apply(this.$rules[key], startRules);

    this.embedRules(FtlLangHighlightRules, "ftl-", endRules, ["start"]);

    this.addRules({
        "ftl-dcomment" : [{
            token : "comment",
            regex : "-->",
            next : "pop"
        }, {
            defaultToken : "comment"
        }]
    });

    this.normalizeRules();
};

oop.inherits(FtlHighlightRules, HtmlHighlightRules);

exports.u = FtlHighlightRules;


/***/ })

}]);
//# sourceMappingURL=bundle.4006.js.map