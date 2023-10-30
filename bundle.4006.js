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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjQwMDYuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLEtBQVk7QUFDOUIsZUFBZSxpQ0FBc0I7QUFDckMsd0JBQXdCLHVEQUFrRDs7QUFFMUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQsWUFBWTs7Ozs7Ozs7QUNqQkM7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLEtBQVk7QUFDOUIseUJBQXlCLHdEQUFvRDtBQUM3RSx5QkFBeUIsd0RBQW9EOztBQUU3RTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsR0FBRztBQUM1QixTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EseUJBQXlCO0FBQ3pCLFNBQVM7QUFDVDtBQUNBLDJCQUEyQjtBQUMzQixTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSx5QkFBeUI7QUFDekI7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNULEtBQUs7O0FBRUw7QUFDQTs7QUFFQTs7QUFFQSxTQUF5QiIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvZnRsLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvZnRsX2hpZ2hsaWdodF9ydWxlcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRNb2RlID0gcmVxdWlyZShcIi4vdGV4dFwiKS5Nb2RlO1xudmFyIEZ0bEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vZnRsX2hpZ2hsaWdodF9ydWxlc1wiKS5GdGxIaWdobGlnaHRSdWxlcztcblxudmFyIE1vZGUgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLkhpZ2hsaWdodFJ1bGVzID0gRnRsSGlnaGxpZ2h0UnVsZXM7XG4gICAgdGhpcy4kYmVoYXZpb3VyID0gdGhpcy4kZGVmYXVsdEJlaGF2aW91cjtcbn07XG5vb3AuaW5oZXJpdHMoTW9kZSwgVGV4dE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG5cbiAgICB0aGlzLiRpZCA9IFwiYWNlL21vZGUvZnRsXCI7XG59KS5jYWxsKE1vZGUucHJvdG90eXBlKTtcblxuZXhwb3J0cy5Nb2RlID0gTW9kZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgSHRtbEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vaHRtbF9oaWdobGlnaHRfcnVsZXNcIikuSHRtbEhpZ2hsaWdodFJ1bGVzO1xudmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcblxudmFyIEZ0bExhbmdIaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBzdHJpbmdCdWlsdElucyA9IFwiXFxcXD98c3Vic3RyaW5nfGNhcF9maXJzdHx1bmNhcF9maXJzdHxjYXBpdGFsaXplfGNob3BfbGluZWJyZWFrfGRhdGV8dGltZXxkYXRldGltZXxcIlxuICAgICAgICArIFwiZW5kc193aXRofGh0bWx8Z3JvdXBzfGluZGV4X29mfGpfc3RyaW5nfGpzX3N0cmluZ3xqc29uX3N0cmluZ3xsYXN0X2luZGV4X29mfGxlbmd0aHxsb3dlcl9jYXNlfFwiXG4gICAgICAgICsgXCJsZWZ0X3BhZHxyaWdodF9wYWR8Y29udGFpbnN8bWF0Y2hlc3xudW1iZXJ8cmVwbGFjZXxydGZ8dXJsfHNwbGl0fHN0YXJ0c193aXRofHN0cmluZ3x0cmltfFwiXG4gICAgICAgICsgXCJ1cHBlcl9jYXNlfHdvcmRfbGlzdHx4aHRtbHx4bWxcIjtcbiAgICB2YXIgbnVtYmVyQnVpbHRJbnMgPSBcImN8cm91bmR8Zmxvb3J8Y2VpbGluZ1wiO1xuICAgIHZhciBkYXRlQnVpbHRJbnMgPSBcImlzb19bYS16X10rXCI7XG4gICAgdmFyIHNlcUJ1aWx0SW5zID0gXCJmaXJzdHxsYXN0fHNlcV9jb250YWluc3xzZXFfaW5kZXhfb2Z8c2VxX2xhc3RfaW5kZXhfb2Z8cmV2ZXJzZXxzaXplfHNvcnR8c29ydF9ieXxjaHVua1wiO1xuICAgIHZhciBoYXNoQnVpbHRJbnMgPSBcImtleXN8dmFsdWVzXCI7XG4gICAgdmFyIHhtbEJ1aWx0SW5zID0gXCJjaGlsZHJlbnxwYXJlbnR8cm9vdHxhbmNlc3RvcnN8bm9kZV9uYW1lfG5vZGVfdHlwZXxub2RlX25hbWVzcGFjZVwiO1xuICAgIHZhciBleHBlcnRCdWlsdElucyA9IFwiYnl0ZXxkb3VibGV8ZmxvYXR8aW50fGxvbmd8c2hvcnR8bnVtYmVyX3RvX2RhdGV8bnVtYmVyX3RvX3RpbWV8bnVtYmVyX3RvX2RhdGV0aW1lfFwiXG4gICAgICAgICsgXCJldmFsfGhhc19jb250ZW50fGludGVycHJldHxpc19bYS16X10rfG5hbWVzcGFjZW5ld1wiO1xuICAgIHZhciBhbGxCdWlsdElucyA9IHN0cmluZ0J1aWx0SW5zICsgbnVtYmVyQnVpbHRJbnMgKyBkYXRlQnVpbHRJbnMgKyBzZXFCdWlsdElucyArIGhhc2hCdWlsdEluc1xuICAgICAgICArIHhtbEJ1aWx0SW5zICsgZXhwZXJ0QnVpbHRJbnM7XG5cbiAgICB2YXIgZGVwcmVjYXRlZEJ1aWx0SW5zID0gXCJkZWZhdWx0fGV4aXN0c3xpZl9leGlzdHN8d2ViX3NhZmVcIjtcblxuICAgIHZhciB2YXJpYWJsZXMgPSBcImRhdGFfbW9kZWx8ZXJyb3J8Z2xvYmFsc3xsYW5nfGxvY2FsZXxsb2NhbHN8bWFpbnxuYW1lc3BhY2V8bm9kZXxjdXJyZW50X25vZGV8XCJcbiAgICAgICAgKyBcIm5vd3xvdXRwdXRfZW5jb2Rpbmd8dGVtcGxhdGVfbmFtZXx1cmxfZXNjYXBpbmdfY2hhcnNldHx2YXJzfHZlcnNpb25cIjtcblxuICAgIHZhciBvcGVyYXRvcnMgPSBcImd0fGd0ZXxsdHxsdGV8YXN8aW58dXNpbmdcIjtcblxuICAgIHZhciByZXNlcnZlZCA9IFwidHJ1ZXxmYWxzZVwiO1xuXG4gICAgdmFyIGF0dHJpYnV0ZXMgPSBcImVuY29kaW5nfHBhcnNlfGxvY2FsZXxudW1iZXJfZm9ybWF0fGRhdGVfZm9ybWF0fHRpbWVfZm9ybWF0fGRhdGV0aW1lX2Zvcm1hdHx0aW1lX3pvbmV8XCJcbiAgICAgICAgKyBcInVybF9lc2NhcGluZ19jaGFyc2V0fGNsYXNzaWNfY29tcGF0aWJsZXxzdHJpcF93aGl0ZXNwYWNlfHN0cmlwX3RleHR8c3RyaWN0X3N5bnRheHxuc19wcmVmaXhlc3xcIlxuICAgICAgICArIFwiYXR0cmlidXRlc1wiO1xuXG4gICAgdGhpcy4kcnVsZXMgPSB7XG4gICAgICAgIFwic3RhcnRcIiA6IFt7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQuY2hhcmFjdGVyLmVudGl0eVwiLFxuICAgICAgICAgICAgcmVnZXggOiAvJlteO10rOy9cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInN1cHBvcnQuZnVuY3Rpb25cIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcPyhcIithbGxCdWlsdElucytcIilcIlxuICAgICAgICB9LCAge1xuICAgICAgICAgICAgdG9rZW4gOiBcInN1cHBvcnQuZnVuY3Rpb24uZGVwcmVjYXRlZFwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIlxcXFw/KFwiK2RlcHJlY2F0ZWRCdWlsdElucytcIilcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwibGFuZ3VhZ2UudmFyaWFibGVcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcLig/OlwiK3ZhcmlhYmxlcytcIilcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubGFuZ3VhZ2VcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcYihcIityZXNlcnZlZCtcIilcXFxcYlwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiXFxcXGIoPzpcIitvcGVyYXRvcnMrXCIpXFxcXGJcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwiZW50aXR5Lm90aGVyLmF0dHJpYnV0ZS1uYW1lXCIsXG4gICAgICAgICAgICByZWdleCA6IGF0dHJpYnV0ZXNcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLCAvL1xuICAgICAgICAgICAgcmVnZXggOiAvWydcIl0vLFxuICAgICAgICAgICAgbmV4dCA6IFwicXN0cmluZ1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIC8vIERlYWwgd2l0aCB2YXJpYWJsZSBuYW1lcyB0aGF0IGNvbnRhaW5zIG51bWJlclxuICAgICAgICAgICAgLy8gZS5nLiA8I2lmIHZhcjQyID09IDQyID5cbiAgICAgICAgICAgIHRva2VuIDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUubWF0Y2goXCJeWystXT9cXFxcZCsoPzooPzpcXFxcLlxcXFxkKik/KD86W2VFXVsrLV0/XFxcXGQrKT8pPyRcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiY29uc3RhbnQubnVtZXJpY1wiO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcInZhcmlhYmxlXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlZ2V4IDogL1tcXHcuK1xcLV0rL1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwia2V5d29yZC5vcGVyYXRvclwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIiF8XFxcXC58XFxcXCR8JXwmfFxcXFwqfFxcXFwtXFxcXC18XFxcXC18XFxcXCtcXFxcK3xcXFxcK3x+fD09PXw9PXw9fCE9fCE9PXw8PXw+PXw8PD18Pj49fD4+Pj18PD58PHw+fCYmfFxcXFx8XFxcXHx8XFxcXD9cXFxcOnxcXFxcKj18JT18XFxcXCs9fFxcXFwtPXwmPXxcXFxcXj1cIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwicGFyZW4ubHBhcmVuXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiW1soe11cIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwicGFyZW4ucnBhcmVuXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiW1xcXFxdKX1dXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInRleHRcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxccytcIlxuICAgICAgICB9XSxcblxuICAgICAgICBcInFzdHJpbmdcIiA6IFt7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQuY2hhcmFjdGVyLmVzY2FwZVwiLFxuICAgICAgICAgICAgcmVnZXggOiAnXFxcXFxcXFxbbnJ0dmVmXFxcXFxcXFxcIiRdJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICByZWdleCA6IC9bJ1wiXS8sXG4gICAgICAgICAgICBuZXh0IDogXCJzdGFydFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGRlZmF1bHRUb2tlbiA6IFwic3RyaW5nXCJcbiAgICAgICAgfV1cbiAgICB9O1xufTtcblxub29wLmluaGVyaXRzKEZ0bExhbmdIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxudmFyIEZ0bEhpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24oKSB7XG4gICAgSHRtbEhpZ2hsaWdodFJ1bGVzLmNhbGwodGhpcyk7XG5cbiAgICB2YXIgZGlyZWN0aXZlcyA9IFwiYXNzaWdufGF0dGVtcHR8YnJlYWt8Y2FzZXxjb21wcmVzc3xkZWZhdWx0fGVsc2VpZnxlbHNlfGVzY2FwZXxmYWxsYmFja3xmdW5jdGlvbnxmbHVzaHxcIlxuICAgICAgICArIFwiZnRsfGdsb2JhbHxpZnxpbXBvcnR8aW5jbHVkZXxsaXN0fGxvY2FsfGx0fG1hY3JvfG5lc3RlZHxub2VzY2FwZXxub3BhcnNlfG50fHJlY292ZXJ8cmVjdXJzZXxyZXR1cm58cnR8XCJcbiAgICAgICAgKyBcInNldHRpbmd8c3RvcHxzd2l0Y2h8dHx2aXNpdFwiO1xuXG4gICAgdmFyIHN0YXJ0UnVsZXMgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsXG4gICAgICAgICAgICByZWdleCA6IFwiPCMtLVwiLFxuICAgICAgICAgICAgbmV4dCA6IFwiZnRsLWRjb21tZW50XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZy5pbnRlcnBvbGF0ZWRcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcJHtcIixcbiAgICAgICAgICAgIHB1c2ggIDogXCJmdGwtc3RhcnRcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwia2V5d29yZC5mdW5jdGlvblwiLFxuICAgICAgICAgICAgcmVnZXggOiAgXCI8Lz8jKFwiK2RpcmVjdGl2ZXMrXCIpXCIsXG4gICAgICAgICAgICBwdXNoIDogXCJmdGwtc3RhcnRcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwia2V5d29yZC5vdGhlclwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIjwvP0BbYS16QS1aXFxcXC5dK1wiLFxuICAgICAgICAgICAgcHVzaCA6IFwiZnRsLXN0YXJ0XCJcbiAgICAgICAgfVxuICAgIF07XG5cbiAgICB2YXIgZW5kUnVsZXMgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICAgdG9rZW4gOiBcImtleXdvcmRcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCIvPz5cIixcbiAgICAgICAgICAgIG5leHQgIDogXCJwb3BcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nLmludGVycG9sYXRlZFwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIn1cIixcbiAgICAgICAgICAgIG5leHQgIDogXCJwb3BcIlxuICAgICAgICB9XG4gICAgXTtcblxuICAgIGZvciAodmFyIGtleSBpbiB0aGlzLiRydWxlcylcbiAgICAgICAgdGhpcy4kcnVsZXNba2V5XS51bnNoaWZ0LmFwcGx5KHRoaXMuJHJ1bGVzW2tleV0sIHN0YXJ0UnVsZXMpO1xuXG4gICAgdGhpcy5lbWJlZFJ1bGVzKEZ0bExhbmdIaWdobGlnaHRSdWxlcywgXCJmdGwtXCIsIGVuZFJ1bGVzLCBbXCJzdGFydFwiXSk7XG5cbiAgICB0aGlzLmFkZFJ1bGVzKHtcbiAgICAgICAgXCJmdGwtZGNvbW1lbnRcIiA6IFt7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudFwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIi0tPlwiLFxuICAgICAgICAgICAgbmV4dCA6IFwicG9wXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgZGVmYXVsdFRva2VuIDogXCJjb21tZW50XCJcbiAgICAgICAgfV1cbiAgICB9KTtcblxuICAgIHRoaXMubm9ybWFsaXplUnVsZXMoKTtcbn07XG5cbm9vcC5pbmhlcml0cyhGdGxIaWdobGlnaHRSdWxlcywgSHRtbEhpZ2hsaWdodFJ1bGVzKTtcblxuZXhwb3J0cy5GdGxIaWdobGlnaHRSdWxlcyA9IEZ0bEhpZ2hsaWdodFJ1bGVzO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9