"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[769],{

/***/ 50769:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var FtlHighlightRules = (__webpack_require__(56422)/* .FtlHighlightRules */ .i);

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

/***/ 56422:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var HtmlHighlightRules = (__webpack_require__(10413).HtmlHighlightRules);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

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

exports.i = FtlHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjc2OS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBYTs7QUFFYixVQUFVLG1CQUFPLENBQUMsSUFBWTtBQUM5QixlQUFlLGlDQUFzQjtBQUNyQyx3QkFBd0IsdURBQWtEOztBQUUxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRCxZQUFZOzs7Ozs7OztBQ2pCQzs7QUFFYixVQUFVLG1CQUFPLENBQUMsSUFBWTtBQUM5Qix5QkFBeUIsK0NBQW9EO0FBQzdFLHlCQUF5Qix3REFBb0Q7O0FBRTdFOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixHQUFHO0FBQzVCLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSx5QkFBeUI7QUFDekIsU0FBUztBQUNUO0FBQ0EsMkJBQTJCO0FBQzNCLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1QsS0FBSzs7QUFFTDtBQUNBOztBQUVBOztBQUVBLFNBQXlCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9mdGwuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9mdGxfaGlnaGxpZ2h0X3J1bGVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dE1vZGUgPSByZXF1aXJlKFwiLi90ZXh0XCIpLk1vZGU7XG52YXIgRnRsSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9mdGxfaGlnaGxpZ2h0X3J1bGVzXCIpLkZ0bEhpZ2hsaWdodFJ1bGVzO1xuXG52YXIgTW9kZSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuSGlnaGxpZ2h0UnVsZXMgPSBGdGxIaWdobGlnaHRSdWxlcztcbiAgICB0aGlzLiRiZWhhdmlvdXIgPSB0aGlzLiRkZWZhdWx0QmVoYXZpb3VyO1xufTtcbm9vcC5pbmhlcml0cyhNb2RlLCBUZXh0TW9kZSk7XG5cbihmdW5jdGlvbigpIHtcblxuICAgIHRoaXMuJGlkID0gXCJhY2UvbW9kZS9mdGxcIjtcbn0pLmNhbGwoTW9kZS5wcm90b3R5cGUpO1xuXG5leHBvcnRzLk1vZGUgPSBNb2RlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBIdG1sSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9odG1sX2hpZ2hsaWdodF9ydWxlc1wiKS5IdG1sSGlnaGxpZ2h0UnVsZXM7XG52YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xuXG52YXIgRnRsTGFuZ0hpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIHN0cmluZ0J1aWx0SW5zID0gXCJcXFxcP3xzdWJzdHJpbmd8Y2FwX2ZpcnN0fHVuY2FwX2ZpcnN0fGNhcGl0YWxpemV8Y2hvcF9saW5lYnJlYWt8ZGF0ZXx0aW1lfGRhdGV0aW1lfFwiXG4gICAgICAgICsgXCJlbmRzX3dpdGh8aHRtbHxncm91cHN8aW5kZXhfb2Z8al9zdHJpbmd8anNfc3RyaW5nfGpzb25fc3RyaW5nfGxhc3RfaW5kZXhfb2Z8bGVuZ3RofGxvd2VyX2Nhc2V8XCJcbiAgICAgICAgKyBcImxlZnRfcGFkfHJpZ2h0X3BhZHxjb250YWluc3xtYXRjaGVzfG51bWJlcnxyZXBsYWNlfHJ0Znx1cmx8c3BsaXR8c3RhcnRzX3dpdGh8c3RyaW5nfHRyaW18XCJcbiAgICAgICAgKyBcInVwcGVyX2Nhc2V8d29yZF9saXN0fHhodG1sfHhtbFwiO1xuICAgIHZhciBudW1iZXJCdWlsdElucyA9IFwiY3xyb3VuZHxmbG9vcnxjZWlsaW5nXCI7XG4gICAgdmFyIGRhdGVCdWlsdElucyA9IFwiaXNvX1thLXpfXStcIjtcbiAgICB2YXIgc2VxQnVpbHRJbnMgPSBcImZpcnN0fGxhc3R8c2VxX2NvbnRhaW5zfHNlcV9pbmRleF9vZnxzZXFfbGFzdF9pbmRleF9vZnxyZXZlcnNlfHNpemV8c29ydHxzb3J0X2J5fGNodW5rXCI7XG4gICAgdmFyIGhhc2hCdWlsdElucyA9IFwia2V5c3x2YWx1ZXNcIjtcbiAgICB2YXIgeG1sQnVpbHRJbnMgPSBcImNoaWxkcmVufHBhcmVudHxyb290fGFuY2VzdG9yc3xub2RlX25hbWV8bm9kZV90eXBlfG5vZGVfbmFtZXNwYWNlXCI7XG4gICAgdmFyIGV4cGVydEJ1aWx0SW5zID0gXCJieXRlfGRvdWJsZXxmbG9hdHxpbnR8bG9uZ3xzaG9ydHxudW1iZXJfdG9fZGF0ZXxudW1iZXJfdG9fdGltZXxudW1iZXJfdG9fZGF0ZXRpbWV8XCJcbiAgICAgICAgKyBcImV2YWx8aGFzX2NvbnRlbnR8aW50ZXJwcmV0fGlzX1thLXpfXSt8bmFtZXNwYWNlbmV3XCI7XG4gICAgdmFyIGFsbEJ1aWx0SW5zID0gc3RyaW5nQnVpbHRJbnMgKyBudW1iZXJCdWlsdElucyArIGRhdGVCdWlsdElucyArIHNlcUJ1aWx0SW5zICsgaGFzaEJ1aWx0SW5zXG4gICAgICAgICsgeG1sQnVpbHRJbnMgKyBleHBlcnRCdWlsdElucztcblxuICAgIHZhciBkZXByZWNhdGVkQnVpbHRJbnMgPSBcImRlZmF1bHR8ZXhpc3RzfGlmX2V4aXN0c3x3ZWJfc2FmZVwiO1xuXG4gICAgdmFyIHZhcmlhYmxlcyA9IFwiZGF0YV9tb2RlbHxlcnJvcnxnbG9iYWxzfGxhbmd8bG9jYWxlfGxvY2Fsc3xtYWlufG5hbWVzcGFjZXxub2RlfGN1cnJlbnRfbm9kZXxcIlxuICAgICAgICArIFwibm93fG91dHB1dF9lbmNvZGluZ3x0ZW1wbGF0ZV9uYW1lfHVybF9lc2NhcGluZ19jaGFyc2V0fHZhcnN8dmVyc2lvblwiO1xuXG4gICAgdmFyIG9wZXJhdG9ycyA9IFwiZ3R8Z3RlfGx0fGx0ZXxhc3xpbnx1c2luZ1wiO1xuXG4gICAgdmFyIHJlc2VydmVkID0gXCJ0cnVlfGZhbHNlXCI7XG5cbiAgICB2YXIgYXR0cmlidXRlcyA9IFwiZW5jb2Rpbmd8cGFyc2V8bG9jYWxlfG51bWJlcl9mb3JtYXR8ZGF0ZV9mb3JtYXR8dGltZV9mb3JtYXR8ZGF0ZXRpbWVfZm9ybWF0fHRpbWVfem9uZXxcIlxuICAgICAgICArIFwidXJsX2VzY2FwaW5nX2NoYXJzZXR8Y2xhc3NpY19jb21wYXRpYmxlfHN0cmlwX3doaXRlc3BhY2V8c3RyaXBfdGV4dHxzdHJpY3Rfc3ludGF4fG5zX3ByZWZpeGVzfFwiXG4gICAgICAgICsgXCJhdHRyaWJ1dGVzXCI7XG5cbiAgICB0aGlzLiRydWxlcyA9IHtcbiAgICAgICAgXCJzdGFydFwiIDogW3tcbiAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5jaGFyYWN0ZXIuZW50aXR5XCIsXG4gICAgICAgICAgICByZWdleCA6IC8mW147XSs7L1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwic3VwcG9ydC5mdW5jdGlvblwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIlxcXFw/KFwiK2FsbEJ1aWx0SW5zK1wiKVwiXG4gICAgICAgIH0sICB7XG4gICAgICAgICAgICB0b2tlbiA6IFwic3VwcG9ydC5mdW5jdGlvbi5kZXByZWNhdGVkXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiXFxcXD8oXCIrZGVwcmVjYXRlZEJ1aWx0SW5zK1wiKVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJsYW5ndWFnZS52YXJpYWJsZVwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwuKD86XCIrdmFyaWFibGVzK1wiKVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5sYW5ndWFnZVwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIlxcXFxiKFwiK3Jlc2VydmVkK1wiKVxcXFxiXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcImtleXdvcmQub3BlcmF0b3JcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcYig/OlwiK29wZXJhdG9ycytcIilcXFxcYlwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJlbnRpdHkub3RoZXIuYXR0cmlidXRlLW5hbWVcIixcbiAgICAgICAgICAgIHJlZ2V4IDogYXR0cmlidXRlc1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsIC8vXG4gICAgICAgICAgICByZWdleCA6IC9bJ1wiXS8sXG4gICAgICAgICAgICBuZXh0IDogXCJxc3RyaW5nXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgLy8gRGVhbCB3aXRoIHZhcmlhYmxlIG5hbWVzIHRoYXQgY29udGFpbnMgbnVtYmVyXG4gICAgICAgICAgICAvLyBlLmcuIDwjaWYgdmFyNDIgPT0gNDIgPlxuICAgICAgICAgICAgdG9rZW4gOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5tYXRjaChcIl5bKy1dP1xcXFxkKyg/Oig/OlxcXFwuXFxcXGQqKT8oPzpbZUVdWystXT9cXFxcZCspPyk/JFwiKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJjb25zdGFudC5udW1lcmljXCI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwidmFyaWFibGVcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVnZXggOiAvW1xcdy4rXFwtXSsvXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiIXxcXFxcLnxcXFxcJHwlfCZ8XFxcXCp8XFxcXC1cXFxcLXxcXFxcLXxcXFxcK1xcXFwrfFxcXFwrfH58PT09fD09fD18IT18IT09fDw9fD49fDw8PXw+Pj18Pj4+PXw8Pnw8fD58JiZ8XFxcXHxcXFxcfHxcXFxcP1xcXFw6fFxcXFwqPXwlPXxcXFxcKz18XFxcXC09fCY9fFxcXFxePVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJwYXJlbi5scGFyZW5cIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJbWyh7XVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJwYXJlbi5ycGFyZW5cIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJbXFxcXF0pfV1cIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwidGV4dFwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIlxcXFxzK1wiXG4gICAgICAgIH1dLFxuXG4gICAgICAgIFwicXN0cmluZ1wiIDogW3tcbiAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5jaGFyYWN0ZXIuZXNjYXBlXCIsXG4gICAgICAgICAgICByZWdleCA6ICdcXFxcXFxcXFtucnR2ZWZcXFxcXFxcXFwiJF0nXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIHJlZ2V4IDogL1snXCJdLyxcbiAgICAgICAgICAgIG5leHQgOiBcInN0YXJ0XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgZGVmYXVsdFRva2VuIDogXCJzdHJpbmdcIlxuICAgICAgICB9XVxuICAgIH07XG59O1xuXG5vb3AuaW5oZXJpdHMoRnRsTGFuZ0hpZ2hsaWdodFJ1bGVzLCBUZXh0SGlnaGxpZ2h0UnVsZXMpO1xuXG52YXIgRnRsSGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbigpIHtcbiAgICBIdG1sSGlnaGxpZ2h0UnVsZXMuY2FsbCh0aGlzKTtcblxuICAgIHZhciBkaXJlY3RpdmVzID0gXCJhc3NpZ258YXR0ZW1wdHxicmVha3xjYXNlfGNvbXByZXNzfGRlZmF1bHR8ZWxzZWlmfGVsc2V8ZXNjYXBlfGZhbGxiYWNrfGZ1bmN0aW9ufGZsdXNofFwiXG4gICAgICAgICsgXCJmdGx8Z2xvYmFsfGlmfGltcG9ydHxpbmNsdWRlfGxpc3R8bG9jYWx8bHR8bWFjcm98bmVzdGVkfG5vZXNjYXBlfG5vcGFyc2V8bnR8cmVjb3ZlcnxyZWN1cnNlfHJldHVybnxydHxcIlxuICAgICAgICArIFwic2V0dGluZ3xzdG9wfHN3aXRjaHx0fHZpc2l0XCI7XG5cbiAgICB2YXIgc3RhcnRSdWxlcyA9IFtcbiAgICAgICAge1xuICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCI8Iy0tXCIsXG4gICAgICAgICAgICBuZXh0IDogXCJmdGwtZGNvbW1lbnRcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nLmludGVycG9sYXRlZFwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwke1wiLFxuICAgICAgICAgICAgcHVzaCAgOiBcImZ0bC1zdGFydFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkLmZ1bmN0aW9uXCIsXG4gICAgICAgICAgICByZWdleCA6ICBcIjwvPyMoXCIrZGlyZWN0aXZlcytcIilcIixcbiAgICAgICAgICAgIHB1c2ggOiBcImZ0bC1zdGFydFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkLm90aGVyXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiPC8/QFthLXpBLVpcXFxcLl0rXCIsXG4gICAgICAgICAgICBwdXNoIDogXCJmdGwtc3RhcnRcIlxuICAgICAgICB9XG4gICAgXTtcblxuICAgIHZhciBlbmRSdWxlcyA9IFtcbiAgICAgICAge1xuICAgICAgICAgICB0b2tlbiA6IFwia2V5d29yZFwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIi8/PlwiLFxuICAgICAgICAgICAgbmV4dCAgOiBcInBvcFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmcuaW50ZXJwb2xhdGVkXCIsXG4gICAgICAgICAgICByZWdleCA6IFwifVwiLFxuICAgICAgICAgICAgbmV4dCAgOiBcInBvcFwiXG4gICAgICAgIH1cbiAgICBdO1xuXG4gICAgZm9yICh2YXIga2V5IGluIHRoaXMuJHJ1bGVzKVxuICAgICAgICB0aGlzLiRydWxlc1trZXldLnVuc2hpZnQuYXBwbHkodGhpcy4kcnVsZXNba2V5XSwgc3RhcnRSdWxlcyk7XG5cbiAgICB0aGlzLmVtYmVkUnVsZXMoRnRsTGFuZ0hpZ2hsaWdodFJ1bGVzLCBcImZ0bC1cIiwgZW5kUnVsZXMsIFtcInN0YXJ0XCJdKTtcblxuICAgIHRoaXMuYWRkUnVsZXMoe1xuICAgICAgICBcImZ0bC1kY29tbWVudFwiIDogW3tcbiAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsXG4gICAgICAgICAgICByZWdleCA6IFwiLS0+XCIsXG4gICAgICAgICAgICBuZXh0IDogXCJwb3BcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBkZWZhdWx0VG9rZW4gOiBcImNvbW1lbnRcIlxuICAgICAgICB9XVxuICAgIH0pO1xuXG4gICAgdGhpcy5ub3JtYWxpemVSdWxlcygpO1xufTtcblxub29wLmluaGVyaXRzKEZ0bEhpZ2hsaWdodFJ1bGVzLCBIdG1sSGlnaGxpZ2h0UnVsZXMpO1xuXG5leHBvcnRzLkZ0bEhpZ2hsaWdodFJ1bGVzID0gRnRsSGlnaGxpZ2h0UnVsZXM7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=