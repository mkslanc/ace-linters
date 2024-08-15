(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[5074],{

/***/ 42124:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

var DocCommentHighlightRules = function () {
    this.$rules = {
        "start": [
            {
                token: "comment.doc.tag",
                regex: "@\\w+(?=\\s|$)"
            }, DocCommentHighlightRules.getTagRule(), {
                defaultToken: "comment.doc.body",
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
        regex: /\/\*\*(?!\/)/,
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


exports.l = DocCommentHighlightRules;


/***/ }),

/***/ 23614:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

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

exports.S = JsonHighlightRules;


/***/ }),

/***/ 25074:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var RedshiftHighlightRules = (__webpack_require__(12133)/* .RedshiftHighlightRules */ .V);

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

/***/ 12133:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var oop = __webpack_require__(2645);
var lang = __webpack_require__(39955);
var DocCommentHighlightRules = (__webpack_require__(42124)/* .DocCommentHighlightRules */ .l);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);
// Syntax highlighting for json.
var JsonHighlightRules = (__webpack_require__(23614)/* .JsonHighlightRules */ .S);

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

exports.V = RedshiftHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1EQUFtRCwyREFBMkQ7QUFDOUc7O0FBRUE7O0FBRUEsU0FBOEIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2RvY19jb21tZW50X2hpZ2hsaWdodF9ydWxlcy5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2pzb25faGlnaGxpZ2h0X3J1bGVzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvcmVkc2hpZnQuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9yZWRzaGlmdF9oaWdobGlnaHRfcnVsZXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90ZXh0X2hpZ2hsaWdodF9ydWxlc1wiKS5UZXh0SGlnaGxpZ2h0UnVsZXM7XG5cbnZhciBEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy4kcnVsZXMgPSB7XG4gICAgICAgIFwic3RhcnRcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcImNvbW1lbnQuZG9jLnRhZ1wiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIkBcXFxcdysoPz1cXFxcc3wkKVwiXG4gICAgICAgICAgICB9LCBEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMuZ2V0VGFnUnVsZSgpLCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcImNvbW1lbnQuZG9jLmJvZHlcIixcbiAgICAgICAgICAgICAgICBjYXNlSW5zZW5zaXRpdmU6IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH07XG59O1xuXG5vb3AuaW5oZXJpdHMoRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLCBUZXh0SGlnaGxpZ2h0UnVsZXMpO1xuXG5Eb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMuZ2V0VGFnUnVsZSA9IGZ1bmN0aW9uKHN0YXJ0KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdG9rZW4gOiBcImNvbW1lbnQuZG9jLnRhZy5zdG9yYWdlLnR5cGVcIixcbiAgICAgICAgcmVnZXggOiBcIlxcXFxiKD86VE9ET3xGSVhNRXxYWFh8SEFDSylcXFxcYlwiXG4gICAgfTtcbn07XG5cbkRvY0NvbW1lbnRIaWdobGlnaHRSdWxlcy5nZXRTdGFydFJ1bGUgPSBmdW5jdGlvbihzdGFydCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHRva2VuIDogXCJjb21tZW50LmRvY1wiLCAvLyBkb2MgY29tbWVudFxuICAgICAgICByZWdleDogL1xcL1xcKlxcKig/IVxcLykvLFxuICAgICAgICBuZXh0ICA6IHN0YXJ0XG4gICAgfTtcbn07XG5cbkRvY0NvbW1lbnRIaWdobGlnaHRSdWxlcy5nZXRFbmRSdWxlID0gZnVuY3Rpb24gKHN0YXJ0KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdG9rZW4gOiBcImNvbW1lbnQuZG9jXCIsIC8vIGNsb3NpbmcgY29tbWVudFxuICAgICAgICByZWdleCA6IFwiXFxcXCpcXFxcL1wiLFxuICAgICAgICBuZXh0ICA6IHN0YXJ0XG4gICAgfTtcbn07XG5cblxuZXhwb3J0cy5Eb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMgPSBEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXM7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcblxudmFyIEpzb25IaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgLy8gcmVnZXhwIG11c3Qgbm90IGhhdmUgY2FwdHVyaW5nIHBhcmVudGhlc2VzLiBVc2UgKD86KSBpbnN0ZWFkLlxuICAgIC8vIHJlZ2V4cHMgYXJlIG9yZGVyZWQgLT4gdGhlIGZpcnN0IG1hdGNoIGlzIHVzZWRcbiAgICB0aGlzLiRydWxlcyA9IHtcbiAgICAgICAgXCJzdGFydFwiIDogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJ2YXJpYWJsZVwiLCAvLyBzaW5nbGUgbGluZVxuICAgICAgICAgICAgICAgIHJlZ2V4IDogJ1tcIl0oPzooPzpcXFxcXFxcXC4pfCg/OlteXCJcXFxcXFxcXF0pKSo/W1wiXVxcXFxzKig/PTopJ1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIiwgLy8gc2luZ2xlIGxpbmVcbiAgICAgICAgICAgICAgICByZWdleCA6ICdcIicsXG4gICAgICAgICAgICAgICAgbmV4dCAgOiBcInN0cmluZ1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIiwgLy8gaGV4XG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIjBbeFhdWzAtOWEtZkEtRl0rXFxcXGJcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5udW1lcmljXCIsIC8vIGZsb2F0XG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlsrLV0/XFxcXGQrKD86KD86XFxcXC5cXFxcZCopPyg/OltlRV1bKy1dP1xcXFxkKyk/KT9cXFxcYlwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lmxhbmd1YWdlLmJvb2xlYW5cIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiKD86dHJ1ZXxmYWxzZSlcXFxcYlwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInRleHRcIiwgLy8gc2luZ2xlIHF1b3RlZCBzdHJpbmdzIGFyZSBub3QgYWxsb3dlZFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJbJ10oPzooPzpcXFxcXFxcXC4pfCg/OlteJ1xcXFxcXFxcXSkpKj9bJ11cIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsIC8vIGNvbW1lbnRzIGFyZSBub3QgYWxsb3dlZCwgYnV0IHdobyBjYXJlcz9cbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXC9cXFxcLy4qJFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnQuc3RhcnRcIiwgLy8gY29tbWVudHMgYXJlIG5vdCBhbGxvd2VkLCBidXQgd2hvIGNhcmVzP1xuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcL1xcXFwqXCIsXG4gICAgICAgICAgICAgICAgbmV4dCAgOiBcImNvbW1lbnRcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJwYXJlbi5scGFyZW5cIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiW1soe11cIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJwYXJlbi5ycGFyZW5cIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiW1xcXFxdKX1dXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwicHVuY3R1YXRpb24ub3BlcmF0b3JcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC9bLF0vXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXHMrXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgXCJzdHJpbmdcIiA6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvXFxcXCg/OnhbMC05YS1mQS1GXXsyfXx1WzAtOWEtZkEtRl17NH18W1wiXFxcXFxcL2JmbnJ0XSkvXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogJ1wifCQnLFxuICAgICAgICAgICAgICAgIG5leHQgIDogXCJzdGFydFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuIDogXCJzdHJpbmdcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBcImNvbW1lbnRcIiA6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudC5lbmRcIiwgLy8gY29tbWVudHMgYXJlIG5vdCBhbGxvd2VkLCBidXQgd2hvIGNhcmVzP1xuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcKlxcXFwvXCIsXG4gICAgICAgICAgICAgICAgbmV4dCAgOiBcInN0YXJ0XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwiY29tbWVudFwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9O1xuICAgIFxufTtcblxub29wLmluaGVyaXRzKEpzb25IaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuZXhwb3J0cy5Kc29uSGlnaGxpZ2h0UnVsZXMgPSBKc29uSGlnaGxpZ2h0UnVsZXM7XG4iLCJ2YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dE1vZGUgPSByZXF1aXJlKFwiLi4vbW9kZS90ZXh0XCIpLk1vZGU7XG52YXIgUmVkc2hpZnRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3JlZHNoaWZ0X2hpZ2hsaWdodF9ydWxlc1wiKS5SZWRzaGlmdEhpZ2hsaWdodFJ1bGVzO1xuXG52YXIgTW9kZSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuSGlnaGxpZ2h0UnVsZXMgPSBSZWRzaGlmdEhpZ2hsaWdodFJ1bGVzO1xuICAgIHRoaXMuJGJlaGF2aW91ciA9IHRoaXMuJGRlZmF1bHRCZWhhdmlvdXI7XG59O1xub29wLmluaGVyaXRzKE1vZGUsIFRleHRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuICAgIHRoaXMubGluZUNvbW1lbnRTdGFydCA9IFwiLS1cIjtcbiAgICB0aGlzLmJsb2NrQ29tbWVudCA9IHtzdGFydDogXCIvKlwiLCBlbmQ6IFwiKi9cIn07XG5cbiAgICB0aGlzLmdldE5leHRMaW5lSW5kZW50ID0gZnVuY3Rpb24oc3RhdGUsIGxpbmUsIHRhYikgeyBcbiAgICAgICAgaWYgKHN0YXRlID09IFwic3RhcnRcIiB8fCBzdGF0ZSA9PSBcImtleXdvcmQuc3RhdGVtZW50RW5kXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGdldEluZGVudChsaW5lKTsgLy8gS2VlcCB3aGF0ZXZlciBpbmRlbnQgdGhlIHByZXZpb3VzIGxpbmUgaGFzXG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy4kaWQgPSBcImFjZS9tb2RlL3JlZHNoaWZ0XCI7XG59KS5jYWxsKE1vZGUucHJvdG90eXBlKTtcblxuZXhwb3J0cy5Nb2RlID0gTW9kZTtcbiIsInZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBsYW5nID0gcmVxdWlyZShcIi4uL2xpYi9sYW5nXCIpO1xudmFyIERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL2RvY19jb21tZW50X2hpZ2hsaWdodF9ydWxlc1wiKS5Eb2NDb21tZW50SGlnaGxpZ2h0UnVsZXM7XG52YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xuLy8gU3ludGF4IGhpZ2hsaWdodGluZyBmb3IganNvbi5cbnZhciBKc29uSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9qc29uX2hpZ2hsaWdodF9ydWxlc1wiKS5Kc29uSGlnaGxpZ2h0UnVsZXM7XG5cbnZhciBSZWRzaGlmdEhpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24oKSB7XG5cbiAgICAvLyBLZXl3b3JkcywgZnVuY3Rpb25zLCBvcGVyYXRvcnMgbGFzdCB1cGRhdGVkIGZvciBwZyA5LjMuXG4gICAgdmFyIGtleXdvcmRzID0gKFxuICAgICAgICBcImFlczEyOHxhZXMyNTZ8YWxsfGFsbG93b3ZlcndyaXRlfGFuYWx5c2V8YW5hbHl6ZXxhbmR8YW55fGFycmF5fGFzfGFzY3xhdXRob3JpemF0aW9ufGJhY2t1cHxcIiArIFxuICAgICAgICBcImJldHdlZW58YmluYXJ5fGJsYW5rc2FzbnVsbHxib3RofGJ5dGVkaWN0fGJ6aXAyfGNhc2V8Y2FzdHxjaGVja3xjb2xsYXRlfGNvbHVtbnxjb25zdHJhaW50fGNyZWF0ZXxjcmVkZW50aWFsc3xcIiArIFxuICAgICAgICBcImNyb3NzfGN1cnJlbnRfZGF0ZXxjdXJyZW50X3RpbWV8Y3VycmVudF90aW1lc3RhbXB8Y3VycmVudF91c2VyfGN1cnJlbnRfdXNlcl9pZHxkZWZhdWx0fGRlZmVycmFibGV8ZGVmbGF0ZXxkZWZyYWd8ZGVsdGF8XCIgKyBcbiAgICAgICAgXCJkZWx0YTMya3xkZXNjfGRpc2FibGV8ZGlzdGluY3R8ZG98ZWxzZXxlbXB0eWFzbnVsbHxlbmFibGV8ZW5jb2RlfGVuY3J5cHR8ZW5jcnlwdGlvbnxlbmR8ZXhjZXB0fGV4cGxpY2l0fGZhbHNlfGZvcnxmb3JlaWdufFwiICsgXG4gICAgICAgIFwiZnJlZXplfGZyb218ZnVsbHxnbG9iYWxkaWN0MjU2fGdsb2JhbGRpY3Q2NGt8Z3JhbnR8Z3JvdXB8Z3ppcHxoYXZpbmd8aWRlbnRpdHl8aWdub3JlfGlsaWtlfGlufGluaXRpYWxseXxpbm5lcnxpbnRlcnNlY3R8aW50b3xpc3xcIiArIFxuICAgICAgICBcImlzbnVsbHxqb2lufGxlYWRpbmd8bGVmdHxsaWtlfGxpbWl0fGxvY2FsdGltZXxsb2NhbHRpbWVzdGFtcHxsdW58bHVuc3xsem98bHpvcHxtaW51c3xtb3N0bHkxM3xtb3N0bHkzMnxtb3N0bHk4fG5hdHVyYWx8bmV3fG5vdHxub3RudWxsfFwiICsgXG4gICAgICAgIFwibnVsbHxudWxsc3xvZmZ8b2ZmbGluZXxvZmZzZXR8b2xkfG9ufG9ubHl8b3BlbnxvcnxvcmRlcnxvdXRlcnxvdmVybGFwc3xwYXJhbGxlbHxwYXJ0aXRpb258cGVyY2VudHxwZXJtaXNzaW9uc3xwbGFjaW5nfHByaW1hcnl8cmF3fHJlYWRyYXRpb3xcIiArXG4gICAgICAgIFwicmVjb3ZlcnxyZWZlcmVuY2VzfHJlamVjdGxvZ3xyZXNvcnR8cmVzdG9yZXxyaWdodHxzZWxlY3R8c2Vzc2lvbl91c2VyfHNpbWlsYXJ8c29tZXxzeXNkYXRlfHN5c3RlbXx0YWJsZXx0YWd8dGRlc3x0ZXh0MjU1fHRleHQzMmt8dGhlbnx0aW1lc3RhbXB8XCIgKyBcbiAgICAgICAgXCJ0b3x0b3B8dHJhaWxpbmd8dHJ1ZXx0cnVuY2F0ZWNvbHVtbnN8dW5pb258dW5pcXVlfHVzZXJ8dXNpbmd8dmVyYm9zZXx3YWxsZXR8d2hlbnx3aGVyZXx3aXRofHdpdGhvdXRcIlxuICAgICk7XG5cblxuICAgIHZhciBidWlsdGluRnVuY3Rpb25zID0gKFxuICAgICAgICBcImN1cnJlbnRfc2NoZW1hfGN1cnJlbnRfc2NoZW1hc3xoYXNfZGF0YWJhc2VfcHJpdmlsZWdlfGhhc19zY2hlbWFfcHJpdmlsZWdlfGhhc190YWJsZV9wcml2aWxlZ2V8YWdlfGN1cnJlbnRfdGltZXxjdXJyZW50X3RpbWVzdGFtcHxsb2NhbHRpbWV8XCIgKyBcbiAgICAgICAgXCJpc2Zpbml0ZXxub3d8YXNjaWl8Z2V0X2JpdHxnZXRfYnl0ZXxvY3RldF9sZW5ndGh8c2V0X2JpdHxzZXRfYnl0ZXx0b19hc2NpaXxhdmd8Y291bnR8bGlzdGFnZ3xtYXh8bWlufHN0ZGRldl9zYW1wfHN0ZGRldl9wb3B8c3VtfHZhcl9zYW1wfHZhcl9wb3B8XCIgKyBcbiAgICAgICAgXCJiaXRfYW5kfGJpdF9vcnxib29sX2FuZHxib29sX29yfGF2Z3xjb3VudHxjdW1lX2Rpc3R8ZGVuc2VfcmFua3xmaXJzdF92YWx1ZXxsYXN0X3ZhbHVlfGxhZ3xsZWFkfGxpc3RhZ2d8bWF4fG1lZGlhbnxtaW58bnRoX3ZhbHVlfG50aWxlfHBlcmNlbnRfcmFua3xcIiArIFxuICAgICAgICBcInBlcmNlbnRpbGVfY29udHxwZXJjZW50aWxlX2Rpc2N8cmFua3xyYXRpb190b19yZXBvcnR8cm93X251bWJlcnxjYXNlfGNvYWxlc2NlfGRlY29kZXxncmVhdGVzdHxsZWFzdHxudmx8bnZsMnxudWxsaWZ8YWRkX21vbnRoc3xhZ2V8Y29udmVydF90aW1lem9uZXxcIiArXG4gICAgICAgIFwiY3VycmVudF9kYXRlfHRpbWVvZmRheXxjdXJyZW50X3RpbWV8Y3VycmVudF90aW1lc3RhbXB8ZGF0ZV9jbXB8ZGF0ZV9jbXBfdGltZXN0YW1wfGRhdGVfcGFydF95ZWFyfGRhdGVhZGR8ZGF0ZWRpZmZ8ZGF0ZV9wYXJ0fGRhdGVfdHJ1bmN8ZXh0cmFjdHxnZXRkYXRlfFwiICtcbiAgICAgICAgXCJpbnRlcnZhbF9jbXB8aXNmaW5pdGV8bGFzdF9kYXl8bG9jYWx0aW1lfGxvY2FsdGltZXN0YW1wfG1vbnRoc19iZXR3ZWVufG5leHRfZGF5fG5vd3xzeXNkYXRlfHRpbWVzdGFtcF9jbXB8dGltZXN0YW1wX2NtcF9kYXRlfHRydW5jfGFic3xhY29zfGFzaW58YXRhbnxcIiArXG4gICAgICAgIFwiYXRhbjJ8Y2JydHxjZWlsaW5nfGNlaWx8Y2hlY2tzdW18Y29zfGNvdHxkZWdyZWVzfGRleHB8ZGxvZzF8ZGxvZzEwfGV4cHxmbG9vcnxsbnxsb2d8bW9kfHBpfHBvd2VyfHJhZGlhbnN8cmFuZG9tfHJvdW5kfHNpbnxzaWdufHNxcnR8dGFufHRydW5jfGFzY2lpfFwiICtcbiAgICAgICAgXCJicGNoYXJjbXB8YnRyaW18YnR0ZXh0X3BhdHRlcm5fY21wfGNoYXJfbGVuZ3RofGNoYXJhY3Rlcl9sZW5ndGh8Y2hhcmluZGV4fGNocnxjb25jYXR8Y3JjMzJ8ZnVuY19zaGExfGdldF9iaXR8Z2V0X2J5dGV8aW5pdGNhcHxsZWZ0fHJpZ2h0fGxlbnxsZW5ndGh8XCIgK1xuICAgICAgICBcImxvd2VyfGxwYWR8cnBhZHxsdHJpbXxtZDV8b2N0ZXRfbGVuZ3RofHBvc2l0aW9ufHF1b3RlX2lkZW50fHF1b3RlX2xpdGVyYWx8cmVnZXhwX2NvdW50fHJlZ2V4cF9pbnN0cnxyZWdleHBfcmVwbGFjZXxyZWdleHBfc3Vic3RyfHJlcGVhdHxyZXBsYWNlfHJlcGxpY2F0ZXxcIiArXG4gICAgICAgIFwicmV2ZXJzZXxydHJpbXxzZXRfYml0fHNldF9ieXRlfHNwbGl0X3BhcnR8c3RycG9zfHN0cnRvbHxzdWJzdHJpbmd8dGV4dGxlbnx0b19hc2NpaXx0b19oZXh8dHJhbnNsYXRlfHRyaW18dXBwZXJ8anNvbl9hcnJheV9sZW5ndGh8anNvbl9leHRyYWN0X2FycmF5X2VsZW1lbnRfdGV4dHxcIiArXG4gICAgICAgIFwianNvbl9leHRyYWN0X3BhdGhfdGV4dHxjYXN0fGNvbnZlcnR8dG9fY2hhcnx0b19kYXRlfHRvX251bWJlcnxjdXJyZW50X2RhdGFiYXNlfGN1cnJlbnRfc2NoZW1hfGN1cnJlbnRfc2NoZW1hc3xjdXJyZW50X3VzZXJ8Y3VycmVudF91c2VyX2lkfGhhc19kYXRhYmFzZV9wcml2aWxlZ2V8XCIgK1xuICAgICAgICBcImhhc19zY2hlbWFfcHJpdmlsZWdlfGhhc190YWJsZV9wcml2aWxlZ2V8cGdfYmFja2VuZF9waWR8cGdfbGFzdF9jb3B5X2NvdW50fHBnX2xhc3RfY29weV9pZHxwZ19sYXN0X3F1ZXJ5X2lkfHBnX2xhc3RfdW5sb2FkX2NvdW50fHNlc3Npb25fdXNlcnxzbGljZV9udW18dXNlcnx2ZXJzaW9uXCJcbiAgICApO1xuXG4gICAgdmFyIGtleXdvcmRNYXBwZXIgPSB0aGlzLmNyZWF0ZUtleXdvcmRNYXBwZXIoe1xuICAgICAgICBcInN1cHBvcnQuZnVuY3Rpb25cIjogYnVpbHRpbkZ1bmN0aW9ucyxcbiAgICAgICAgXCJrZXl3b3JkXCI6IGtleXdvcmRzXG4gICAgfSwgXCJpZGVudGlmaWVyXCIsIHRydWUpO1xuXG5cbiAgICB2YXIgc3FsUnVsZXMgPSBbe1xuICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLCAvLyBzaW5nbGUgbGluZSBzdHJpbmcgLS0gYXNzdW1lIGRvbGxhciBzdHJpbmdzIGlmIG11bHRpLWxpbmUgZm9yIG5vd1xuICAgICAgICAgICAgcmVnZXggOiBcIlsnXSg/Oig/OlxcXFxcXFxcLil8KD86W14nXFxcXFxcXFxdKSkqP1snXVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJ2YXJpYWJsZS5sYW5ndWFnZVwiLCAvLyBwZyBpZGVudGlmaWVyXG4gICAgICAgICAgICByZWdleCA6ICdcIi4qP1wiJ1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLCAvLyBmbG9hdFxuICAgICAgICAgICAgcmVnZXggOiBcIlsrLV0/XFxcXGQrKD86KD86XFxcXC5cXFxcZCopPyg/OltlRV1bKy1dP1xcXFxkKyk/KT9cXFxcYlwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDoga2V5d29yZE1hcHBlcixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJbYS16QS1aX11bYS16QS1aMC05XyRdKlxcXFxiXCIgLy8gVE9ETyAtIFVuaWNvZGUgaW4gaWRlbnRpZmllcnNcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcImtleXdvcmQub3BlcmF0b3JcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCIhfCEhfCF+fCF+XFxcXCp8IX5+fCF+flxcXFwqfCN8IyN8Izx8Izw9fCM8PnwjPXwjPnwjPj18JXxcXFxcJnxcXFxcJlxcXFwmfFxcXFwmPHxcXFxcJjxcXFxcfHxcXFxcJj58XFxcXCp8XFxcXCt8XCIgK1xuICAgICAgICAgICAgICAgICAgICBcIlxcXFwtfC98PHw8Iz58PFxcXFwtPnw8PHw8PD18PDxcXFxcfHw8PXw8Pnw8XFxcXD8+fDxAfDxcXFxcXnw9fD58Pj18Pj58Pj49fD5cXFxcXnxcXFxcPyN8XFxcXD9cXFxcLXxcXFxcP1xcXFwtXFxcXHx8XCIgK1xuICAgICAgICAgICAgICAgICAgICBcIlxcXFw/XFxcXHx8XFxcXD9cXFxcfFxcXFx8fEB8QFxcXFwtQHxAPnxAQHxAQEB8XFxcXF58XFxcXHx8XFxcXHxcXFxcJj58XFxcXHwvfFxcXFx8Pj58XFxcXHxcXFxcfHxcXFxcfFxcXFx8L3x+fH5cXFxcKnx+PD1+fH48fnxcIiArXG4gICAgICAgICAgICAgICAgICAgIFwifj18fj49fnx+Pn58fn58fn5cXFxcKlwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJwYXJlbi5scGFyZW5cIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJbXFxcXChdXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInBhcmVuLnJwYXJlblwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIltcXFxcKV1cIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwidGV4dFwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIlxcXFxzK1wiXG4gICAgICAgIH1cbiAgICBdO1xuXG5cbiAgICB0aGlzLiRydWxlcyA9IHtcbiAgICAgICAgXCJzdGFydFwiIDogW3tcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCItLS4qJFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLmdldFN0YXJ0UnVsZShcImRvYy1zdGFydFwiKSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudFwiLCAvLyBtdWx0aS1saW5lIGNvbW1lbnRcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXC9cXFxcKlwiLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcImNvbW1lbnRcIlxuICAgICAgICAgICAgfSx7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImtleXdvcmQuc3RhdGVtZW50QmVnaW5cIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXlthLXpBLVpdK1wiLCAvLyBDb3VsZCBlbnVtZXJhdGUgc3RhcnRpbmcga2V5d29yZHMgYnV0IHRoaXMgYWxsb3dzIHRoaW5ncyB0byB3b3JrIHdoZW4gbmV3IHN0YXRlbWVudHMgYXJlIGFkZGVkLlxuICAgICAgICAgICAgICAgIG5leHQgOiBcInN0YXRlbWVudFwiXG4gICAgICAgICAgICB9LHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3VwcG9ydC5idWlsZGluXCIsIC8vIHBzcWwgZGlyZWN0aXZlXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIl5cXFxcXFxcXFtcXFxcU10rLiokXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcblxuICAgICAgICBcInN0YXRlbWVudFwiIDogW3tcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCItLS4qJFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIiwgLy8gbXVsdGktbGluZSBjb21tZW50XG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwvXFxcXCpcIixcbiAgICAgICAgICAgICAgICBuZXh0IDogXCJjb21tZW50U3RhdGVtZW50XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RhdGVtZW50RW5kXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIjtcIixcbiAgICAgICAgICAgICAgICBuZXh0IDogXCJzdGFydFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcJGpzb25cXFxcJFwiLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcImpzb24tc3RhcnRcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXCRbXFxcXHdfMC05XSpcXFxcJCRcIiwgLy8gZG9sbGFyIHF1b3RlIGF0IHRoZSBlbmQgb2YgYSBsaW5lXG4gICAgICAgICAgICAgICAgbmV4dCA6IFwiZG9sbGFyU3FsXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwkW1xcXFx3XzAtOV0qXFxcXCRcIixcbiAgICAgICAgICAgICAgICBuZXh0IDogXCJkb2xsYXJTdGF0ZW1lbnRTdHJpbmdcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdLmNvbmNhdChzcWxSdWxlcyksXG5cbiAgICAgICAgXCJkb2xsYXJTcWxcIiA6IFt7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiLS0uKiRcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsIC8vIG11bHRpLWxpbmUgY29tbWVudFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcL1xcXFwqXCIsXG4gICAgICAgICAgICAgICAgbmV4dCA6IFwiY29tbWVudERvbGxhclNxbFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLCAvLyBlbmQgcXVvdGluZyB3aXRoIGRvbGxhciBhdCB0aGUgc3RhcnQgb2YgYSBsaW5lXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIl5cXFxcJFtcXFxcd18wLTldKlxcXFwkXCIsXG4gICAgICAgICAgICAgICAgbmV4dCA6IFwic3RhdGVtZW50XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwkW1xcXFx3XzAtOV0qXFxcXCRcIixcbiAgICAgICAgICAgICAgICBuZXh0IDogXCJkb2xsYXJTcWxTdHJpbmdcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdLmNvbmNhdChzcWxSdWxlcyksXG5cbiAgICAgICAgXCJjb21tZW50XCIgOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsIC8vIGNsb3NpbmcgY29tbWVudFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIuKj9cXFxcKlxcXFwvXCIsXG4gICAgICAgICAgICAgICAgbmV4dCA6IFwic3RhcnRcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsIC8vIGNvbW1lbnQgc3Bhbm5pbmcgd2hvbGUgbGluZVxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIuK1wiXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG5cbiAgICAgICAgXCJjb21tZW50U3RhdGVtZW50XCIgOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsIC8vIGNsb3NpbmcgY29tbWVudFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIuKj9cXFxcKlxcXFwvXCIsXG4gICAgICAgICAgICAgICAgbmV4dCA6IFwic3RhdGVtZW50XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudFwiLCAvLyBjb21tZW50IHNwYW5uaW5nIHdob2xlIGxpbmVcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiLitcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuXG4gICAgICAgIFwiY29tbWVudERvbGxhclNxbFwiIDogW3tcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudFwiLCAvLyBjbG9zaW5nIGNvbW1lbnRcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiLio/XFxcXCpcXFxcL1wiLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcImRvbGxhclNxbFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIiwgLy8gY29tbWVudCBzcGFubmluZyB3aG9sZSBsaW5lXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIi4rXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcblxuICAgICAgICBcImRvbGxhclN0YXRlbWVudFN0cmluZ1wiIDogW3tcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsIC8vIGNsb3NpbmcgZG9sbGFyc3RyaW5nXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIi4qP1xcXFwkW1xcXFx3XzAtOV0qXFxcXCRcIixcbiAgICAgICAgICAgICAgICBuZXh0IDogXCJzdGF0ZW1lbnRcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIiwgLy8gZG9sbGFyc3RyaW5nIHNwYW5uaW5nIHdob2xlIGxpbmVcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiLitcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuXG4gICAgICAgIFwiZG9sbGFyU3FsU3RyaW5nXCIgOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIiwgLy8gY2xvc2luZyBkb2xsYXJzdHJpbmdcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiLio/XFxcXCRbXFxcXHdfMC05XSpcXFxcJFwiLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcImRvbGxhclNxbFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLCAvLyBkb2xsYXJzdHJpbmcgc3Bhbm5pbmcgd2hvbGUgbGluZVxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIuK1wiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9O1xuXG4gICAgdGhpcy5lbWJlZFJ1bGVzKERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcywgXCJkb2MtXCIsIFsgRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLmdldEVuZFJ1bGUoXCJzdGFydFwiKSBdKTtcbiAgICB0aGlzLmVtYmVkUnVsZXMoSnNvbkhpZ2hsaWdodFJ1bGVzLCBcImpzb24tXCIsIFt7dG9rZW4gOiBcInN0cmluZ1wiLCByZWdleCA6IFwiXFxcXCRqc29uXFxcXCRcIiwgbmV4dCA6IFwic3RhdGVtZW50XCJ9XSk7XG59O1xuXG5vb3AuaW5oZXJpdHMoUmVkc2hpZnRIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuZXhwb3J0cy5SZWRzaGlmdEhpZ2hsaWdodFJ1bGVzID0gUmVkc2hpZnRIaWdobGlnaHRSdWxlcztcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==