(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[8544],{

/***/ 62718:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var oop = __webpack_require__(89359);
var TextHighlightRules = (__webpack_require__(28053)/* .TextHighlightRules */ .K);

var DocCommentHighlightRules = function () {
    this.$rules = {
        "start": [
            {
                token: "comment.doc.tag",
                regex: "@\\w+(?=\\s|$)"
            }, DocCommentHighlightRules.getTagRule(), {
                defaultToken: "comment.doc",
                caseInsensitive: true
            }
        ]
    };
};

oop.inherits(DocCommentHighlightRules, TextHighlightRules);

DocCommentHighlightRules.getTagRule = function(start) {
    return {
        token : "comment.doc.tag.storage.type",
        regex : "\\b(?:TODO|FIXME|XXX|HACK)\\b"
    };
};

DocCommentHighlightRules.getStartRule = function(start) {
    return {
        token : "comment.doc", // doc comment
        regex : "\\/\\*(?=\\*)",
        next  : start
    };
};

DocCommentHighlightRules.getEndRule = function (start) {
    return {
        token : "comment.doc", // closing comment
        regex : "\\*\\/",
        next  : start
    };
};


exports.c = DocCommentHighlightRules;


/***/ }),

/***/ 89467:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var oop = __webpack_require__(89359);
var TextHighlightRules = (__webpack_require__(28053)/* .TextHighlightRules */ .K);

var JsonHighlightRules = function() {

    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used
    this.$rules = {
        "start" : [
            {
                token : "variable", // single line
                regex : '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]\\s*(?=:)'
            }, {
                token : "string", // single line
                regex : '"',
                next  : "string"
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
                token : "text", // single quoted strings are not allowed
                regex : "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"
            }, {
                token : "comment", // comments are not allowed, but who cares?
                regex : "\\/\\/.*$"
            }, {
                token : "comment.start", // comments are not allowed, but who cares?
                regex : "\\/\\*",
                next  : "comment"
            }, {
                token : "paren.lparen",
                regex : "[[({]"
            }, {
                token : "paren.rparen",
                regex : "[\\])}]"
            }, {
                token : "punctuation.operator",
                regex : /[,]/
            }, {
                token : "text",
                regex : "\\s+"
            }
        ],
        "string" : [
            {
                token : "constant.language.escape",
                regex : /\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|["\\\/bfnrt])/
            }, {
                token : "string",
                regex : '"|$',
                next  : "start"
            }, {
                defaultToken : "string"
            }
        ],
        "comment" : [
            {
                token : "comment.end", // comments are not allowed, but who cares?
                regex : "\\*\\/",
                next  : "start"
            }, {
                defaultToken: "comment"
            }
        ]
    };
    
};

oop.inherits(JsonHighlightRules, TextHighlightRules);

exports.h = JsonHighlightRules;


/***/ }),

/***/ 78544:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var oop = __webpack_require__(89359);
var TextMode = (__webpack_require__(98030).Mode);
var RedshiftHighlightRules = (__webpack_require__(91079)/* .RedshiftHighlightRules */ .F);

var Mode = function() {
    this.HighlightRules = RedshiftHighlightRules;
    this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, TextMode);

(function() {
    this.lineCommentStart = "--";
    this.blockComment = {start: "/*", end: "*/"};

    this.getNextLineIndent = function(state, line, tab) { 
        if (state == "start" || state == "keyword.statementEnd") {
            return "";
        } else {
            return this.$getIndent(line); // Keep whatever indent the previous line has
        }
    };

    this.$id = "ace/mode/redshift";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 91079:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var oop = __webpack_require__(89359);
var lang = __webpack_require__(20124);
var DocCommentHighlightRules = (__webpack_require__(62718)/* .DocCommentHighlightRules */ .c);
var TextHighlightRules = (__webpack_require__(28053)/* .TextHighlightRules */ .K);
// Syntax highlighting for json.
var JsonHighlightRules = (__webpack_require__(89467)/* .JsonHighlightRules */ .h);

var RedshiftHighlightRules = function() {

    // Keywords, functions, operators last updated for pg 9.3.
    var keywords = (
        "aes128|aes256|all|allowoverwrite|analyse|analyze|and|any|array|as|asc|authorization|backup|" + 
        "between|binary|blanksasnull|both|bytedict|bzip2|case|cast|check|collate|column|constraint|create|credentials|" + 
        "cross|current_date|current_time|current_timestamp|current_user|current_user_id|default|deferrable|deflate|defrag|delta|" + 
        "delta32k|desc|disable|distinct|do|else|emptyasnull|enable|encode|encrypt|encryption|end|except|explicit|false|for|foreign|" + 
        "freeze|from|full|globaldict256|globaldict64k|grant|group|gzip|having|identity|ignore|ilike|in|initially|inner|intersect|into|is|" + 
        "isnull|join|leading|left|like|limit|localtime|localtimestamp|lun|luns|lzo|lzop|minus|mostly13|mostly32|mostly8|natural|new|not|notnull|" + 
        "null|nulls|off|offline|offset|old|on|only|open|or|order|outer|overlaps|parallel|partition|percent|permissions|placing|primary|raw|readratio|" +
        "recover|references|rejectlog|resort|restore|right|select|session_user|similar|some|sysdate|system|table|tag|tdes|text255|text32k|then|timestamp|" + 
        "to|top|trailing|true|truncatecolumns|union|unique|user|using|verbose|wallet|when|where|with|without"
    );


    var builtinFunctions = (
        "current_schema|current_schemas|has_database_privilege|has_schema_privilege|has_table_privilege|age|current_time|current_timestamp|localtime|" + 
        "isfinite|now|ascii|get_bit|get_byte|octet_length|set_bit|set_byte|to_ascii|avg|count|listagg|max|min|stddev_samp|stddev_pop|sum|var_samp|var_pop|" + 
        "bit_and|bit_or|bool_and|bool_or|avg|count|cume_dist|dense_rank|first_value|last_value|lag|lead|listagg|max|median|min|nth_value|ntile|percent_rank|" + 
        "percentile_cont|percentile_disc|rank|ratio_to_report|row_number|case|coalesce|decode|greatest|least|nvl|nvl2|nullif|add_months|age|convert_timezone|" +
        "current_date|timeofday|current_time|current_timestamp|date_cmp|date_cmp_timestamp|date_part_year|dateadd|datediff|date_part|date_trunc|extract|getdate|" +
        "interval_cmp|isfinite|last_day|localtime|localtimestamp|months_between|next_day|now|sysdate|timestamp_cmp|timestamp_cmp_date|trunc|abs|acos|asin|atan|" +
        "atan2|cbrt|ceiling|ceil|checksum|cos|cot|degrees|dexp|dlog1|dlog10|exp|floor|ln|log|mod|pi|power|radians|random|round|sin|sign|sqrt|tan|trunc|ascii|" +
        "bpcharcmp|btrim|bttext_pattern_cmp|char_length|character_length|charindex|chr|concat|crc32|func_sha1|get_bit|get_byte|initcap|left|right|len|length|" +
        "lower|lpad|rpad|ltrim|md5|octet_length|position|quote_ident|quote_literal|regexp_count|regexp_instr|regexp_replace|regexp_substr|repeat|replace|replicate|" +
        "reverse|rtrim|set_bit|set_byte|split_part|strpos|strtol|substring|textlen|to_ascii|to_hex|translate|trim|upper|json_array_length|json_extract_array_element_text|" +
        "json_extract_path_text|cast|convert|to_char|to_date|to_number|current_database|current_schema|current_schemas|current_user|current_user_id|has_database_privilege|" +
        "has_schema_privilege|has_table_privilege|pg_backend_pid|pg_last_copy_count|pg_last_copy_id|pg_last_query_id|pg_last_unload_count|session_user|slice_num|user|version"
    );

    var keywordMapper = this.createKeywordMapper({
        "support.function": builtinFunctions,
        "keyword": keywords
    }, "identifier", true);


    var sqlRules = [{
            token : "string", // single line string -- assume dollar strings if multi-line for now
            regex : "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"
        }, {
            token : "variable.language", // pg identifier
            regex : '".*?"'
        }, {
            token : "constant.numeric", // float
            regex : "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
        }, {
            token : keywordMapper,
            regex : "[a-zA-Z_][a-zA-Z0-9_$]*\\b" // TODO - Unicode in identifiers
        }, {
            token : "keyword.operator",
            regex : "!|!!|!~|!~\\*|!~~|!~~\\*|#|##|#<|#<=|#<>|#=|#>|#>=|%|\\&|\\&\\&|\\&<|\\&<\\||\\&>|\\*|\\+|" +
                    "\\-|/|<|<#>|<\\->|<<|<<=|<<\\||<=|<>|<\\?>|<@|<\\^|=|>|>=|>>|>>=|>\\^|\\?#|\\?\\-|\\?\\-\\||" +
                    "\\?\\||\\?\\|\\||@|@\\-@|@>|@@|@@@|\\^|\\||\\|\\&>|\\|/|\\|>>|\\|\\||\\|\\|/|~|~\\*|~<=~|~<~|" +
                    "~=|~>=~|~>~|~~|~~\\*"
        }, {
            token : "paren.lparen",
            regex : "[\\(]"
        }, {
            token : "paren.rparen",
            regex : "[\\)]"
        }, {
            token : "text",
            regex : "\\s+"
        }
    ];


    this.$rules = {
        "start" : [{
                token : "comment",
                regex : "--.*$"
            },
            DocCommentHighlightRules.getStartRule("doc-start"),
            {
                token : "comment", // multi-line comment
                regex : "\\/\\*",
                next : "comment"
            },{
                token : "keyword.statementBegin",
                regex : "^[a-zA-Z]+", // Could enumerate starting keywords but this allows things to work when new statements are added.
                next : "statement"
            },{
                token : "support.buildin", // psql directive
                regex : "^\\\\[\\S]+.*$"
            }
        ],

        "statement" : [{
                token : "comment",
                regex : "--.*$"
            }, {
                token : "comment", // multi-line comment
                regex : "\\/\\*",
                next : "commentStatement"
            }, {
                token : "statementEnd",
                regex : ";",
                next : "start"
            }, {
                token : "string",
                regex : "\\$json\\$",
                next : "json-start"
            }, {
                token : "string",
                regex : "\\$[\\w_0-9]*\\$$", // dollar quote at the end of a line
                next : "dollarSql"
            }, {
                token : "string",
                regex : "\\$[\\w_0-9]*\\$",
                next : "dollarStatementString"
            }
        ].concat(sqlRules),

        "dollarSql" : [{
                token : "comment",
                regex : "--.*$"
            }, {
                token : "comment", // multi-line comment
                regex : "\\/\\*",
                next : "commentDollarSql"
            }, {
                token : "string", // end quoting with dollar at the start of a line
                regex : "^\\$[\\w_0-9]*\\$",
                next : "statement"
            }, {
                token : "string",
                regex : "\\$[\\w_0-9]*\\$",
                next : "dollarSqlString"
            }
        ].concat(sqlRules),

        "comment" : [{
                token : "comment", // closing comment
                regex : ".*?\\*\\/",
                next : "start"
            }, {
                token : "comment", // comment spanning whole line
                regex : ".+"
            }
        ],

        "commentStatement" : [{
                token : "comment", // closing comment
                regex : ".*?\\*\\/",
                next : "statement"
            }, {
                token : "comment", // comment spanning whole line
                regex : ".+"
            }
        ],

        "commentDollarSql" : [{
                token : "comment", // closing comment
                regex : ".*?\\*\\/",
                next : "dollarSql"
            }, {
                token : "comment", // comment spanning whole line
                regex : ".+"
            }
        ],

        "dollarStatementString" : [{
                token : "string", // closing dollarstring
                regex : ".*?\\$[\\w_0-9]*\\$",
                next : "statement"
            }, {
                token : "string", // dollarstring spanning whole line
                regex : ".+"
            }
        ],

        "dollarSqlString" : [{
                token : "string", // closing dollarstring
                regex : ".*?\\$[\\w_0-9]*\\$",
                next : "dollarSql"
            }, {
                token : "string", // dollarstring spanning whole line
                regex : ".+"
            }
        ]
    };

    this.embedRules(DocCommentHighlightRules, "doc-", [ DocCommentHighlightRules.getEndRule("start") ]);
    this.embedRules(JsonHighlightRules, "json-", [{token : "string", regex : "\\$json\\$", next : "statement"}]);
};

oop.inherits(RedshiftHighlightRules, TextHighlightRules);

exports.F = RedshiftHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjg1NDQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLEtBQVk7QUFDOUIseUJBQXlCLHdEQUFvRDs7QUFFN0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBLFNBQWdDOzs7Ozs7Ozs7QUM3Q25COztBQUViLFVBQVUsbUJBQU8sQ0FBQyxLQUFZO0FBQzlCLHlCQUF5Qix3REFBb0Q7O0FBRTdFOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsNkJBQTZCO0FBQzdCLGFBQWE7QUFDYjtBQUNBLCtCQUErQjtBQUMvQixhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxFQUFFLGNBQWMsRUFBRTtBQUM3RCxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLFNBQTBCOzs7Ozs7OztBQzlFMUIsVUFBVSxtQkFBTyxDQUFDLEtBQVk7QUFDOUIsZUFBZSxpQ0FBNEI7QUFDM0MsNkJBQTZCLDREQUE0RDs7QUFFekY7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseUJBQXlCOztBQUV6QjtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1YsMENBQTBDO0FBQzFDO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVELFlBQVk7Ozs7Ozs7O0FDekJaLFVBQVUsbUJBQU8sQ0FBQyxLQUFZO0FBQzlCLFdBQVcsbUJBQU8sQ0FBQyxLQUFhO0FBQ2hDLCtCQUErQiw4REFBaUU7QUFDaEcseUJBQXlCLHdEQUFvRDtBQUM3RTtBQUNBLHlCQUF5Qix3REFBb0Q7O0FBRTdFOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOzs7QUFHTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1EQUFtRCwyREFBMkQ7QUFDOUc7O0FBRUE7O0FBRUEsU0FBOEIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2RvY19jb21tZW50X2hpZ2hsaWdodF9ydWxlcy5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2pzb25faGlnaGxpZ2h0X3J1bGVzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvcmVkc2hpZnQuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9yZWRzaGlmdF9oaWdobGlnaHRfcnVsZXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90ZXh0X2hpZ2hsaWdodF9ydWxlc1wiKS5UZXh0SGlnaGxpZ2h0UnVsZXM7XG5cbnZhciBEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy4kcnVsZXMgPSB7XG4gICAgICAgIFwic3RhcnRcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcImNvbW1lbnQuZG9jLnRhZ1wiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIkBcXFxcdysoPz1cXFxcc3wkKVwiXG4gICAgICAgICAgICB9LCBEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMuZ2V0VGFnUnVsZSgpLCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcImNvbW1lbnQuZG9jXCIsXG4gICAgICAgICAgICAgICAgY2FzZUluc2Vuc2l0aXZlOiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9O1xufTtcblxub29wLmluaGVyaXRzKERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLmdldFRhZ1J1bGUgPSBmdW5jdGlvbihzdGFydCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHRva2VuIDogXCJjb21tZW50LmRvYy50YWcuc3RvcmFnZS50eXBlXCIsXG4gICAgICAgIHJlZ2V4IDogXCJcXFxcYig/OlRPRE98RklYTUV8WFhYfEhBQ0spXFxcXGJcIlxuICAgIH07XG59O1xuXG5Eb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMuZ2V0U3RhcnRSdWxlID0gZnVuY3Rpb24oc3RhcnQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0b2tlbiA6IFwiY29tbWVudC5kb2NcIiwgLy8gZG9jIGNvbW1lbnRcbiAgICAgICAgcmVnZXggOiBcIlxcXFwvXFxcXCooPz1cXFxcKilcIixcbiAgICAgICAgbmV4dCAgOiBzdGFydFxuICAgIH07XG59O1xuXG5Eb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMuZ2V0RW5kUnVsZSA9IGZ1bmN0aW9uIChzdGFydCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHRva2VuIDogXCJjb21tZW50LmRvY1wiLCAvLyBjbG9zaW5nIGNvbW1lbnRcbiAgICAgICAgcmVnZXggOiBcIlxcXFwqXFxcXC9cIixcbiAgICAgICAgbmV4dCAgOiBzdGFydFxuICAgIH07XG59O1xuXG5cbmV4cG9ydHMuRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzID0gRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90ZXh0X2hpZ2hsaWdodF9ydWxlc1wiKS5UZXh0SGlnaGxpZ2h0UnVsZXM7XG5cbnZhciBKc29uSGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbigpIHtcblxuICAgIC8vIHJlZ2V4cCBtdXN0IG5vdCBoYXZlIGNhcHR1cmluZyBwYXJlbnRoZXNlcy4gVXNlICg/OikgaW5zdGVhZC5cbiAgICAvLyByZWdleHBzIGFyZSBvcmRlcmVkIC0+IHRoZSBmaXJzdCBtYXRjaCBpcyB1c2VkXG4gICAgdGhpcy4kcnVsZXMgPSB7XG4gICAgICAgIFwic3RhcnRcIiA6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwidmFyaWFibGVcIiwgLy8gc2luZ2xlIGxpbmVcbiAgICAgICAgICAgICAgICByZWdleCA6ICdbXCJdKD86KD86XFxcXFxcXFwuKXwoPzpbXlwiXFxcXFxcXFxdKSkqP1tcIl1cXFxccyooPz06KSdcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsIC8vIHNpbmdsZSBsaW5lXG4gICAgICAgICAgICAgICAgcmVnZXggOiAnXCInLFxuICAgICAgICAgICAgICAgIG5leHQgIDogXCJzdHJpbmdcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5udW1lcmljXCIsIC8vIGhleFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIwW3hYXVswLTlhLWZBLUZdK1xcXFxiXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLCAvLyBmbG9hdFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJbKy1dP1xcXFxkKyg/Oig/OlxcXFwuXFxcXGQqKT8oPzpbZUVdWystXT9cXFxcZCspPyk/XFxcXGJcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5sYW5ndWFnZS5ib29sZWFuXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIig/OnRydWV8ZmFsc2UpXFxcXGJcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJ0ZXh0XCIsIC8vIHNpbmdsZSBxdW90ZWQgc3RyaW5ncyBhcmUgbm90IGFsbG93ZWRcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiWyddKD86KD86XFxcXFxcXFwuKXwoPzpbXidcXFxcXFxcXF0pKSo/WyddXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudFwiLCAvLyBjb21tZW50cyBhcmUgbm90IGFsbG93ZWQsIGJ1dCB3aG8gY2FyZXM/XG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwvXFxcXC8uKiRcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50LnN0YXJ0XCIsIC8vIGNvbW1lbnRzIGFyZSBub3QgYWxsb3dlZCwgYnV0IHdobyBjYXJlcz9cbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXC9cXFxcKlwiLFxuICAgICAgICAgICAgICAgIG5leHQgIDogXCJjb21tZW50XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwicGFyZW4ubHBhcmVuXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIltbKHtdXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwicGFyZW4ucnBhcmVuXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIltcXFxcXSl9XVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInB1bmN0dWF0aW9uLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvWyxdL1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFxzK1wiXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIFwic3RyaW5nXCIgOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogL1xcXFwoPzp4WzAtOWEtZkEtRl17Mn18dVswLTlhLWZBLUZdezR9fFtcIlxcXFxcXC9iZm5ydF0pL1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICByZWdleCA6ICdcInwkJyxcbiAgICAgICAgICAgICAgICBuZXh0ICA6IFwic3RhcnRcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbiA6IFwic3RyaW5nXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgXCJjb21tZW50XCIgOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnQuZW5kXCIsIC8vIGNvbW1lbnRzIGFyZSBub3QgYWxsb3dlZCwgYnV0IHdobyBjYXJlcz9cbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXCpcXFxcL1wiLFxuICAgICAgICAgICAgICAgIG5leHQgIDogXCJzdGFydFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcImNvbW1lbnRcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfTtcbiAgICBcbn07XG5cbm9vcC5pbmhlcml0cyhKc29uSGlnaGxpZ2h0UnVsZXMsIFRleHRIaWdobGlnaHRSdWxlcyk7XG5cbmV4cG9ydHMuSnNvbkhpZ2hsaWdodFJ1bGVzID0gSnNvbkhpZ2hsaWdodFJ1bGVzO1xuIiwidmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRNb2RlID0gcmVxdWlyZShcIi4uL21vZGUvdGV4dFwiKS5Nb2RlO1xudmFyIFJlZHNoaWZ0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9yZWRzaGlmdF9oaWdobGlnaHRfcnVsZXNcIikuUmVkc2hpZnRIaWdobGlnaHRSdWxlcztcblxudmFyIE1vZGUgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLkhpZ2hsaWdodFJ1bGVzID0gUmVkc2hpZnRIaWdobGlnaHRSdWxlcztcbiAgICB0aGlzLiRiZWhhdmlvdXIgPSB0aGlzLiRkZWZhdWx0QmVoYXZpb3VyO1xufTtcbm9vcC5pbmhlcml0cyhNb2RlLCBUZXh0TW9kZSk7XG5cbihmdW5jdGlvbigpIHtcbiAgICB0aGlzLmxpbmVDb21tZW50U3RhcnQgPSBcIi0tXCI7XG4gICAgdGhpcy5ibG9ja0NvbW1lbnQgPSB7c3RhcnQ6IFwiLypcIiwgZW5kOiBcIiovXCJ9O1xuXG4gICAgdGhpcy5nZXROZXh0TGluZUluZGVudCA9IGZ1bmN0aW9uKHN0YXRlLCBsaW5lLCB0YWIpIHsgXG4gICAgICAgIGlmIChzdGF0ZSA9PSBcInN0YXJ0XCIgfHwgc3RhdGUgPT0gXCJrZXl3b3JkLnN0YXRlbWVudEVuZFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRnZXRJbmRlbnQobGluZSk7IC8vIEtlZXAgd2hhdGV2ZXIgaW5kZW50IHRoZSBwcmV2aW91cyBsaW5lIGhhc1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMuJGlkID0gXCJhY2UvbW9kZS9yZWRzaGlmdFwiO1xufSkuY2FsbChNb2RlLnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTW9kZSA9IE1vZGU7XG4iLCJ2YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgbGFuZyA9IHJlcXVpcmUoXCIuLi9saWIvbGFuZ1wiKTtcbnZhciBEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9kb2NfY29tbWVudF9oaWdobGlnaHRfcnVsZXNcIikuRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzO1xudmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcbi8vIFN5bnRheCBoaWdobGlnaHRpbmcgZm9yIGpzb24uXG52YXIgSnNvbkhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vanNvbl9oaWdobGlnaHRfcnVsZXNcIikuSnNvbkhpZ2hsaWdodFJ1bGVzO1xuXG52YXIgUmVkc2hpZnRIaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgLy8gS2V5d29yZHMsIGZ1bmN0aW9ucywgb3BlcmF0b3JzIGxhc3QgdXBkYXRlZCBmb3IgcGcgOS4zLlxuICAgIHZhciBrZXl3b3JkcyA9IChcbiAgICAgICAgXCJhZXMxMjh8YWVzMjU2fGFsbHxhbGxvd292ZXJ3cml0ZXxhbmFseXNlfGFuYWx5emV8YW5kfGFueXxhcnJheXxhc3xhc2N8YXV0aG9yaXphdGlvbnxiYWNrdXB8XCIgKyBcbiAgICAgICAgXCJiZXR3ZWVufGJpbmFyeXxibGFua3Nhc251bGx8Ym90aHxieXRlZGljdHxiemlwMnxjYXNlfGNhc3R8Y2hlY2t8Y29sbGF0ZXxjb2x1bW58Y29uc3RyYWludHxjcmVhdGV8Y3JlZGVudGlhbHN8XCIgKyBcbiAgICAgICAgXCJjcm9zc3xjdXJyZW50X2RhdGV8Y3VycmVudF90aW1lfGN1cnJlbnRfdGltZXN0YW1wfGN1cnJlbnRfdXNlcnxjdXJyZW50X3VzZXJfaWR8ZGVmYXVsdHxkZWZlcnJhYmxlfGRlZmxhdGV8ZGVmcmFnfGRlbHRhfFwiICsgXG4gICAgICAgIFwiZGVsdGEzMmt8ZGVzY3xkaXNhYmxlfGRpc3RpbmN0fGRvfGVsc2V8ZW1wdHlhc251bGx8ZW5hYmxlfGVuY29kZXxlbmNyeXB0fGVuY3J5cHRpb258ZW5kfGV4Y2VwdHxleHBsaWNpdHxmYWxzZXxmb3J8Zm9yZWlnbnxcIiArIFxuICAgICAgICBcImZyZWV6ZXxmcm9tfGZ1bGx8Z2xvYmFsZGljdDI1NnxnbG9iYWxkaWN0NjRrfGdyYW50fGdyb3VwfGd6aXB8aGF2aW5nfGlkZW50aXR5fGlnbm9yZXxpbGlrZXxpbnxpbml0aWFsbHl8aW5uZXJ8aW50ZXJzZWN0fGludG98aXN8XCIgKyBcbiAgICAgICAgXCJpc251bGx8am9pbnxsZWFkaW5nfGxlZnR8bGlrZXxsaW1pdHxsb2NhbHRpbWV8bG9jYWx0aW1lc3RhbXB8bHVufGx1bnN8bHpvfGx6b3B8bWludXN8bW9zdGx5MTN8bW9zdGx5MzJ8bW9zdGx5OHxuYXR1cmFsfG5ld3xub3R8bm90bnVsbHxcIiArIFxuICAgICAgICBcIm51bGx8bnVsbHN8b2ZmfG9mZmxpbmV8b2Zmc2V0fG9sZHxvbnxvbmx5fG9wZW58b3J8b3JkZXJ8b3V0ZXJ8b3ZlcmxhcHN8cGFyYWxsZWx8cGFydGl0aW9ufHBlcmNlbnR8cGVybWlzc2lvbnN8cGxhY2luZ3xwcmltYXJ5fHJhd3xyZWFkcmF0aW98XCIgK1xuICAgICAgICBcInJlY292ZXJ8cmVmZXJlbmNlc3xyZWplY3Rsb2d8cmVzb3J0fHJlc3RvcmV8cmlnaHR8c2VsZWN0fHNlc3Npb25fdXNlcnxzaW1pbGFyfHNvbWV8c3lzZGF0ZXxzeXN0ZW18dGFibGV8dGFnfHRkZXN8dGV4dDI1NXx0ZXh0MzJrfHRoZW58dGltZXN0YW1wfFwiICsgXG4gICAgICAgIFwidG98dG9wfHRyYWlsaW5nfHRydWV8dHJ1bmNhdGVjb2x1bW5zfHVuaW9ufHVuaXF1ZXx1c2VyfHVzaW5nfHZlcmJvc2V8d2FsbGV0fHdoZW58d2hlcmV8d2l0aHx3aXRob3V0XCJcbiAgICApO1xuXG5cbiAgICB2YXIgYnVpbHRpbkZ1bmN0aW9ucyA9IChcbiAgICAgICAgXCJjdXJyZW50X3NjaGVtYXxjdXJyZW50X3NjaGVtYXN8aGFzX2RhdGFiYXNlX3ByaXZpbGVnZXxoYXNfc2NoZW1hX3ByaXZpbGVnZXxoYXNfdGFibGVfcHJpdmlsZWdlfGFnZXxjdXJyZW50X3RpbWV8Y3VycmVudF90aW1lc3RhbXB8bG9jYWx0aW1lfFwiICsgXG4gICAgICAgIFwiaXNmaW5pdGV8bm93fGFzY2lpfGdldF9iaXR8Z2V0X2J5dGV8b2N0ZXRfbGVuZ3RofHNldF9iaXR8c2V0X2J5dGV8dG9fYXNjaWl8YXZnfGNvdW50fGxpc3RhZ2d8bWF4fG1pbnxzdGRkZXZfc2FtcHxzdGRkZXZfcG9wfHN1bXx2YXJfc2FtcHx2YXJfcG9wfFwiICsgXG4gICAgICAgIFwiYml0X2FuZHxiaXRfb3J8Ym9vbF9hbmR8Ym9vbF9vcnxhdmd8Y291bnR8Y3VtZV9kaXN0fGRlbnNlX3Jhbmt8Zmlyc3RfdmFsdWV8bGFzdF92YWx1ZXxsYWd8bGVhZHxsaXN0YWdnfG1heHxtZWRpYW58bWlufG50aF92YWx1ZXxudGlsZXxwZXJjZW50X3Jhbmt8XCIgKyBcbiAgICAgICAgXCJwZXJjZW50aWxlX2NvbnR8cGVyY2VudGlsZV9kaXNjfHJhbmt8cmF0aW9fdG9fcmVwb3J0fHJvd19udW1iZXJ8Y2FzZXxjb2FsZXNjZXxkZWNvZGV8Z3JlYXRlc3R8bGVhc3R8bnZsfG52bDJ8bnVsbGlmfGFkZF9tb250aHN8YWdlfGNvbnZlcnRfdGltZXpvbmV8XCIgK1xuICAgICAgICBcImN1cnJlbnRfZGF0ZXx0aW1lb2ZkYXl8Y3VycmVudF90aW1lfGN1cnJlbnRfdGltZXN0YW1wfGRhdGVfY21wfGRhdGVfY21wX3RpbWVzdGFtcHxkYXRlX3BhcnRfeWVhcnxkYXRlYWRkfGRhdGVkaWZmfGRhdGVfcGFydHxkYXRlX3RydW5jfGV4dHJhY3R8Z2V0ZGF0ZXxcIiArXG4gICAgICAgIFwiaW50ZXJ2YWxfY21wfGlzZmluaXRlfGxhc3RfZGF5fGxvY2FsdGltZXxsb2NhbHRpbWVzdGFtcHxtb250aHNfYmV0d2VlbnxuZXh0X2RheXxub3d8c3lzZGF0ZXx0aW1lc3RhbXBfY21wfHRpbWVzdGFtcF9jbXBfZGF0ZXx0cnVuY3xhYnN8YWNvc3xhc2lufGF0YW58XCIgK1xuICAgICAgICBcImF0YW4yfGNicnR8Y2VpbGluZ3xjZWlsfGNoZWNrc3VtfGNvc3xjb3R8ZGVncmVlc3xkZXhwfGRsb2cxfGRsb2cxMHxleHB8Zmxvb3J8bG58bG9nfG1vZHxwaXxwb3dlcnxyYWRpYW5zfHJhbmRvbXxyb3VuZHxzaW58c2lnbnxzcXJ0fHRhbnx0cnVuY3xhc2NpaXxcIiArXG4gICAgICAgIFwiYnBjaGFyY21wfGJ0cmltfGJ0dGV4dF9wYXR0ZXJuX2NtcHxjaGFyX2xlbmd0aHxjaGFyYWN0ZXJfbGVuZ3RofGNoYXJpbmRleHxjaHJ8Y29uY2F0fGNyYzMyfGZ1bmNfc2hhMXxnZXRfYml0fGdldF9ieXRlfGluaXRjYXB8bGVmdHxyaWdodHxsZW58bGVuZ3RofFwiICtcbiAgICAgICAgXCJsb3dlcnxscGFkfHJwYWR8bHRyaW18bWQ1fG9jdGV0X2xlbmd0aHxwb3NpdGlvbnxxdW90ZV9pZGVudHxxdW90ZV9saXRlcmFsfHJlZ2V4cF9jb3VudHxyZWdleHBfaW5zdHJ8cmVnZXhwX3JlcGxhY2V8cmVnZXhwX3N1YnN0cnxyZXBlYXR8cmVwbGFjZXxyZXBsaWNhdGV8XCIgK1xuICAgICAgICBcInJldmVyc2V8cnRyaW18c2V0X2JpdHxzZXRfYnl0ZXxzcGxpdF9wYXJ0fHN0cnBvc3xzdHJ0b2x8c3Vic3RyaW5nfHRleHRsZW58dG9fYXNjaWl8dG9faGV4fHRyYW5zbGF0ZXx0cmltfHVwcGVyfGpzb25fYXJyYXlfbGVuZ3RofGpzb25fZXh0cmFjdF9hcnJheV9lbGVtZW50X3RleHR8XCIgK1xuICAgICAgICBcImpzb25fZXh0cmFjdF9wYXRoX3RleHR8Y2FzdHxjb252ZXJ0fHRvX2NoYXJ8dG9fZGF0ZXx0b19udW1iZXJ8Y3VycmVudF9kYXRhYmFzZXxjdXJyZW50X3NjaGVtYXxjdXJyZW50X3NjaGVtYXN8Y3VycmVudF91c2VyfGN1cnJlbnRfdXNlcl9pZHxoYXNfZGF0YWJhc2VfcHJpdmlsZWdlfFwiICtcbiAgICAgICAgXCJoYXNfc2NoZW1hX3ByaXZpbGVnZXxoYXNfdGFibGVfcHJpdmlsZWdlfHBnX2JhY2tlbmRfcGlkfHBnX2xhc3RfY29weV9jb3VudHxwZ19sYXN0X2NvcHlfaWR8cGdfbGFzdF9xdWVyeV9pZHxwZ19sYXN0X3VubG9hZF9jb3VudHxzZXNzaW9uX3VzZXJ8c2xpY2VfbnVtfHVzZXJ8dmVyc2lvblwiXG4gICAgKTtcblxuICAgIHZhciBrZXl3b3JkTWFwcGVyID0gdGhpcy5jcmVhdGVLZXl3b3JkTWFwcGVyKHtcbiAgICAgICAgXCJzdXBwb3J0LmZ1bmN0aW9uXCI6IGJ1aWx0aW5GdW5jdGlvbnMsXG4gICAgICAgIFwia2V5d29yZFwiOiBrZXl3b3Jkc1xuICAgIH0sIFwiaWRlbnRpZmllclwiLCB0cnVlKTtcblxuXG4gICAgdmFyIHNxbFJ1bGVzID0gW3tcbiAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIiwgLy8gc2luZ2xlIGxpbmUgc3RyaW5nIC0tIGFzc3VtZSBkb2xsYXIgc3RyaW5ncyBpZiBtdWx0aS1saW5lIGZvciBub3dcbiAgICAgICAgICAgIHJlZ2V4IDogXCJbJ10oPzooPzpcXFxcXFxcXC4pfCg/OlteJ1xcXFxcXFxcXSkpKj9bJ11cIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwidmFyaWFibGUubGFuZ3VhZ2VcIiwgLy8gcGcgaWRlbnRpZmllclxuICAgICAgICAgICAgcmVnZXggOiAnXCIuKj9cIidcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIiwgLy8gZmxvYXRcbiAgICAgICAgICAgIHJlZ2V4IDogXCJbKy1dP1xcXFxkKyg/Oig/OlxcXFwuXFxcXGQqKT8oPzpbZUVdWystXT9cXFxcZCspPyk/XFxcXGJcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IGtleXdvcmRNYXBwZXIsXG4gICAgICAgICAgICByZWdleCA6IFwiW2EtekEtWl9dW2EtekEtWjAtOV8kXSpcXFxcYlwiIC8vIFRPRE8gLSBVbmljb2RlIGluIGlkZW50aWZpZXJzXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiIXwhIXwhfnwhflxcXFwqfCF+fnwhfn5cXFxcKnwjfCMjfCM8fCM8PXwjPD58Iz18Iz58Iz49fCV8XFxcXCZ8XFxcXCZcXFxcJnxcXFxcJjx8XFxcXCY8XFxcXHx8XFxcXCY+fFxcXFwqfFxcXFwrfFwiICtcbiAgICAgICAgICAgICAgICAgICAgXCJcXFxcLXwvfDx8PCM+fDxcXFxcLT58PDx8PDw9fDw8XFxcXHx8PD18PD58PFxcXFw/Pnw8QHw8XFxcXF58PXw+fD49fD4+fD4+PXw+XFxcXF58XFxcXD8jfFxcXFw/XFxcXC18XFxcXD9cXFxcLVxcXFx8fFwiICtcbiAgICAgICAgICAgICAgICAgICAgXCJcXFxcP1xcXFx8fFxcXFw/XFxcXHxcXFxcfHxAfEBcXFxcLUB8QD58QEB8QEBAfFxcXFxefFxcXFx8fFxcXFx8XFxcXCY+fFxcXFx8L3xcXFxcfD4+fFxcXFx8XFxcXHx8XFxcXHxcXFxcfC98fnx+XFxcXCp8fjw9fnx+PH58XCIgK1xuICAgICAgICAgICAgICAgICAgICBcIn49fH4+PX58fj5+fH5+fH5+XFxcXCpcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwicGFyZW4ubHBhcmVuXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiW1xcXFwoXVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJwYXJlbi5ycGFyZW5cIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJbXFxcXCldXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInRleHRcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxccytcIlxuICAgICAgICB9XG4gICAgXTtcblxuXG4gICAgdGhpcy4kcnVsZXMgPSB7XG4gICAgICAgIFwic3RhcnRcIiA6IFt7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiLS0uKiRcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcy5nZXRTdGFydFJ1bGUoXCJkb2Mtc3RhcnRcIiksXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIiwgLy8gbXVsdGktbGluZSBjb21tZW50XG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwvXFxcXCpcIixcbiAgICAgICAgICAgICAgICBuZXh0IDogXCJjb21tZW50XCJcbiAgICAgICAgICAgIH0se1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkLnN0YXRlbWVudEJlZ2luXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIl5bYS16QS1aXStcIiwgLy8gQ291bGQgZW51bWVyYXRlIHN0YXJ0aW5nIGtleXdvcmRzIGJ1dCB0aGlzIGFsbG93cyB0aGluZ3MgdG8gd29yayB3aGVuIG5ldyBzdGF0ZW1lbnRzIGFyZSBhZGRlZC5cbiAgICAgICAgICAgICAgICBuZXh0IDogXCJzdGF0ZW1lbnRcIlxuICAgICAgICAgICAgfSx7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN1cHBvcnQuYnVpbGRpblwiLCAvLyBwc3FsIGRpcmVjdGl2ZVxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJeXFxcXFxcXFxbXFxcXFNdKy4qJFwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG5cbiAgICAgICAgXCJzdGF0ZW1lbnRcIiA6IFt7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiLS0uKiRcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsIC8vIG11bHRpLWxpbmUgY29tbWVudFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcL1xcXFwqXCIsXG4gICAgICAgICAgICAgICAgbmV4dCA6IFwiY29tbWVudFN0YXRlbWVudFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0YXRlbWVudEVuZFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCI7XCIsXG4gICAgICAgICAgICAgICAgbmV4dCA6IFwic3RhcnRcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXCRqc29uXFxcXCRcIixcbiAgICAgICAgICAgICAgICBuZXh0IDogXCJqc29uLXN0YXJ0XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwkW1xcXFx3XzAtOV0qXFxcXCQkXCIsIC8vIGRvbGxhciBxdW90ZSBhdCB0aGUgZW5kIG9mIGEgbGluZVxuICAgICAgICAgICAgICAgIG5leHQgOiBcImRvbGxhclNxbFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcJFtcXFxcd18wLTldKlxcXFwkXCIsXG4gICAgICAgICAgICAgICAgbmV4dCA6IFwiZG9sbGFyU3RhdGVtZW50U3RyaW5nXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXS5jb25jYXQoc3FsUnVsZXMpLFxuXG4gICAgICAgIFwiZG9sbGFyU3FsXCIgOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIi0tLiokXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudFwiLCAvLyBtdWx0aS1saW5lIGNvbW1lbnRcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXC9cXFxcKlwiLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcImNvbW1lbnREb2xsYXJTcWxcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIiwgLy8gZW5kIHF1b3Rpbmcgd2l0aCBkb2xsYXIgYXQgdGhlIHN0YXJ0IG9mIGEgbGluZVxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJeXFxcXCRbXFxcXHdfMC05XSpcXFxcJFwiLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcInN0YXRlbWVudFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcJFtcXFxcd18wLTldKlxcXFwkXCIsXG4gICAgICAgICAgICAgICAgbmV4dCA6IFwiZG9sbGFyU3FsU3RyaW5nXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXS5jb25jYXQoc3FsUnVsZXMpLFxuXG4gICAgICAgIFwiY29tbWVudFwiIDogW3tcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudFwiLCAvLyBjbG9zaW5nIGNvbW1lbnRcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiLio/XFxcXCpcXFxcL1wiLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcInN0YXJ0XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudFwiLCAvLyBjb21tZW50IHNwYW5uaW5nIHdob2xlIGxpbmVcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiLitcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuXG4gICAgICAgIFwiY29tbWVudFN0YXRlbWVudFwiIDogW3tcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudFwiLCAvLyBjbG9zaW5nIGNvbW1lbnRcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiLio/XFxcXCpcXFxcL1wiLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcInN0YXRlbWVudFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIiwgLy8gY29tbWVudCBzcGFubmluZyB3aG9sZSBsaW5lXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIi4rXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcblxuICAgICAgICBcImNvbW1lbnREb2xsYXJTcWxcIiA6IFt7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIiwgLy8gY2xvc2luZyBjb21tZW50XG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIi4qP1xcXFwqXFxcXC9cIixcbiAgICAgICAgICAgICAgICBuZXh0IDogXCJkb2xsYXJTcWxcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsIC8vIGNvbW1lbnQgc3Bhbm5pbmcgd2hvbGUgbGluZVxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIuK1wiXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG5cbiAgICAgICAgXCJkb2xsYXJTdGF0ZW1lbnRTdHJpbmdcIiA6IFt7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLCAvLyBjbG9zaW5nIGRvbGxhcnN0cmluZ1xuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIuKj9cXFxcJFtcXFxcd18wLTldKlxcXFwkXCIsXG4gICAgICAgICAgICAgICAgbmV4dCA6IFwic3RhdGVtZW50XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsIC8vIGRvbGxhcnN0cmluZyBzcGFubmluZyB3aG9sZSBsaW5lXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIi4rXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcblxuICAgICAgICBcImRvbGxhclNxbFN0cmluZ1wiIDogW3tcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsIC8vIGNsb3NpbmcgZG9sbGFyc3RyaW5nXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIi4qP1xcXFwkW1xcXFx3XzAtOV0qXFxcXCRcIixcbiAgICAgICAgICAgICAgICBuZXh0IDogXCJkb2xsYXJTcWxcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIiwgLy8gZG9sbGFyc3RyaW5nIHNwYW5uaW5nIHdob2xlIGxpbmVcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiLitcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfTtcblxuICAgIHRoaXMuZW1iZWRSdWxlcyhEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMsIFwiZG9jLVwiLCBbIERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcy5nZXRFbmRSdWxlKFwic3RhcnRcIikgXSk7XG4gICAgdGhpcy5lbWJlZFJ1bGVzKEpzb25IaWdobGlnaHRSdWxlcywgXCJqc29uLVwiLCBbe3Rva2VuIDogXCJzdHJpbmdcIiwgcmVnZXggOiBcIlxcXFwkanNvblxcXFwkXCIsIG5leHQgOiBcInN0YXRlbWVudFwifV0pO1xufTtcblxub29wLmluaGVyaXRzKFJlZHNoaWZ0SGlnaGxpZ2h0UnVsZXMsIFRleHRIaWdobGlnaHRSdWxlcyk7XG5cbmV4cG9ydHMuUmVkc2hpZnRIaWdobGlnaHRSdWxlcyA9IFJlZHNoaWZ0SGlnaGxpZ2h0UnVsZXM7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=