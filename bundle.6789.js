(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[6789],{

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

/***/ 86789:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var oop = __webpack_require__(89359);
var TextMode = (__webpack_require__(98030).Mode);
var MysqlHighlightRules = (__webpack_require__(81758)/* .MysqlHighlightRules */ .g);

var Mode = function() {
    this.HighlightRules = MysqlHighlightRules;
    this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, TextMode);

(function() {       
    this.lineCommentStart = ["--", "#"]; // todo space
    this.blockComment = {start: "/*", end: "*/"};

    this.$id = "ace/mode/mysql";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 81758:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var oop = __webpack_require__(89359);
var lang = __webpack_require__(20124);
var DocCommentHighlightRules = (__webpack_require__(62718)/* .DocCommentHighlightRules */ .c);
var TextHighlightRules = (__webpack_require__(28053)/* .TextHighlightRules */ .K);

var MysqlHighlightRules = function() {
    var mySqlKeywords = /*sql*/ "alter|and|as|asc|between|count|create|delete|desc|distinct|drop|from|lateral|having|in|insert|into|is|join|like|not|on|or|order|select|set|table|union|intersect|except|update|values|where"
        /*mysql*/ + "|accessible|action|add|after|algorithm|all|analyze|asensitive|at|authors|auto_increment|autocommit|avg|avg_row_length|before|binary|binlog|both|btree|cache|call|cascade|cascaded|case|catalog_name|chain|change|changed|character|check|checkpoint|checksum|class_origin|client_statistics|close|code|collate|collation|collations|column|columns|comment|commit|committed|completion|concurrent|condition|connection|consistent|constraint|contains|continue|contributors|convert|cross|current_date|current_time|current_timestamp|current_user|cursor|data|database|databases|day_hour|day_microsecond|day_minute|day_second|deallocate|dec|declare|default|delay_key_write|delayed|delimiter|des_key_file|describe|deterministic|dev_pop|dev_samp|deviance|directory|disable|discard|distinctrow|div|dual|dumpfile|each|elseif|enable|enclosed|end|ends|engine|engines|enum|errors|escape|escaped|even|event|events|every|execute|exists|exit|explain|extended|fast|fetch|field|fields|first|flush|for|force|foreign|found_rows|full|fulltext|function|general|global|grant|grants|group|by|group_concat|handler|hash|help|high_priority|hosts|hour_microsecond|hour_minute|hour_second|if|ignore|ignore_server_ids|import|index|index_statistics|infile|inner|innodb|inout|insensitive|insert_method|install|interval|invoker|isolation|iterate|key|keys|kill|language|last|leading|leave|left|level|limit|linear|lines|list|load|local|localtime|localtimestamp|lock|logs|low_priority|master|master_heartbeat_period|master_ssl_verify_server_cert|masters|match|max|max_rows|maxvalue|message_text|middleint|migrate|min|min_rows|minute_microsecond|minute_second|mod|mode|modifies|modify|mutex|mysql_errno|natural|next|no|no_write_to_binlog|offline|offset|one|online|open|optimize|option|optionally|out|outer|outfile|pack_keys|parser|partition|partitions|password|phase|plugin|plugins|prepare|preserve|prev|primary|privileges|procedure|processlist|profile|profiles|purge|query|quick|range|read|read_write|reads|real|rebuild|recover|references|regexp|relaylog|release|remove|rename|reorganize|repair|repeatable|replace|require|resignal|restrict|resume|return|returns|revoke|right|rlike|rollback|rollup|row|row_format|rtree|savepoint|schedule|schema|schema_name|schemas|second_microsecond|security|sensitive|separator|serializable|server|session|share|show|signal|slave|slow|smallint|snapshot|soname|spatial|specific|sql|sql_big_result|sql_buffer_result|sql_cache|sql_calc_found_rows|sql_no_cache|sql_small_result|sqlexception|sqlstate|sqlwarning|ssl|start|starting|starts|status|std|stddev|stddev_pop|stddev_samp|storage|straight_join|subclass_origin|sum|suspend|table_name|table_statistics|tables|tablespace|temporary|terminated|to|trailing|transaction|trigger|triggers|truncate|uncommitted|undo|uninstall|unique|unlock|upgrade|usage|use|use_frm|user|user_resources|user_statistics|using|utc_date|utc_time|utc_timestamp|value|variables|varying|view|views|warnings|when|while|with|work|write|xa|xor|year_month|zerofill|begin|do|then|else|loop|repeat";
    var builtins = "rank|coalesce|ifnull|isnull|nvl";
    var variable = "charset|clear|connect|edit|ego|exit|go|help|nopager|notee|nowarning|pager|print|prompt|quit|rehash|source|status|system|tee";
    var datetimeFunctions = 'adddate|addtime|convert_tz|curdate|current_date|current_time|current_timestamp|curtime|date|date_add|date_format|date_sub|datediff|day|dayname|dayofmonth|dayofweek|dayofyear|extract|from_days|from_unixtime|get_format|hour|last_day|localtime|localtimestamp|makedate|maketime|microsecond|minute|month|monthname|now|period_add|period_diff|quarter|sec_to_time|second|str_to_date|subdate|subtime|sysdate|time|time_format|time_to_sec|timediff|timestamp|timestampadd|timestampdiff|to_days|to_seconds|unix_timestamp|utc_date|utc_time|utc_timestamp|week|weekday|weekofyear|year|yearweek';
    var encryptionFunctions = 'aes_decrypt|aes_encrypt|compress|md|random_bytes|sha|sha|statement_digest|statement_digest_text|uncompress|uncompressed_length|validate_password_strength';
    var mathFunctions = 'abs|acos|asin|atan|atan|ceil|ceiling|conv|cos|cot|crc|degrees|div|exp|floor|ln|log|log10|log2|mod|pi|pow|power|radians|rand|round|sign|sin|sqrt|tan|truncate';
    var stringFunctions = 'ascii|bin|bit_length|char|char_length|character_length|concat|concat_ws|elt|export_set|field|find_in_set|format|from_base|hex|insert|instr|lcase|left|length|like|load_file|locate|lower|lpad|ltrim|make_set|match|mid|not|not|oct|octet_length|ord|position|quote|regexp|regexp_instr|regexp_like|regexp_replace|regexp_substr|repeat|replace|reverse|right|rlike|rpad|rtrim|soundex|sounds|space|strcmp|substr|substring|substring_index|to_base|trim|ucase|unhex|upper|weight_string';
    //operatorChars: /^[*+\-%<>!=&|^]/,
    var dataTypes = (
        "bool|boolean|bit|blob|decimal|double|enum|float|long|longblob|longtext|medium|mediumblob|mediumint|mediumtext|time|timestamp|tinyblob|tinyint|tinytext|text|" +
        "bigint|int|int1|int2|int3|int4|int8|integer|float|float4|float8|double|char|varbinary|varchar|varcharacter|precision|date|datetime|year|unsigned|signed|numeric"
    );
    
    var keywordMapper = this.createKeywordMapper({
        "support.function": [builtins, datetimeFunctions, encryptionFunctions, mathFunctions, stringFunctions].join('|'),
        "keyword": mySqlKeywords,
        "storage.type": dataTypes,
        "constant": "false|true|null|unknown|ODBCdotTable|zerolessFloat",
        "variable.language": variable
    }, "identifier", true);

    
    function string(rule) {
        var start = rule.start;
        var escapeSeq = rule.escape;
        return {
            token: "string.start",
            regex: start,
            next: [
                {token: "constant.language.escape", regex: escapeSeq},
                {token: "string.end", next: "start", regex: start},
                {defaultToken: "string"}
            ]
        };
    }

    this.$rules = {
        "start" : [ {
            token : "comment", regex : "(?:-- |#).*$"
        },  
        string({start: '"', escape: /\\[0'"bnrtZ\\%_]?/}),
        string({start: "'", escape: /\\[0'"bnrtZ\\%_]?/}),
        DocCommentHighlightRules.getStartRule("doc-start"),
        {
            token : "comment", // multi line comment
            regex : /\/\*/,
            next : "comment"
        }, {
            token : "constant.numeric", // hex
            regex : /0[xX][0-9a-fA-F]+|[xX]'[0-9a-fA-F]+'|0[bB][01]+|[bB]'[01]+'/
        }, {
            token : "constant.numeric", // float
            regex : "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
        }, {
            token : keywordMapper,
            regex : "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
        }, {
            token : "constant.class",
            regex : "@@?[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
        }, {
            token : "constant.buildin",
            regex : "`[^`]*`"
        }, {
            token : "keyword.operator",
            regex : "\\+|\\-|\\/|\\/\\/|%|<@>|@>|<@|&|\\^|~|<|>|<=|=>|==|!=|<>|="
        }, {
            token : "paren.lparen",
            regex : "[\\(]"
        }, {
            token : "paren.rparen",
            regex : "[\\)]"
        }, {
            token : "text",
            regex : "\\s+"
        } ],
        "comment" : [
            {token : "comment", regex : "\\*\\/", next : "start"},
            {defaultToken : "comment"}
        ]
    };

    this.embedRules(DocCommentHighlightRules, "doc-", [ DocCommentHighlightRules.getEndRule("start") ]);
    this.normalizeRules();
};

oop.inherits(MysqlHighlightRules, TextHighlightRules);

exports.g = MysqlHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjY3ODkuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLEtBQVk7QUFDOUIseUJBQXlCLHdEQUFvRDs7QUFFN0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBLFNBQWdDOzs7Ozs7OztBQzdDaEMsVUFBVSxtQkFBTyxDQUFDLEtBQVk7QUFDOUIsZUFBZSxpQ0FBNEI7QUFDM0MsMEJBQTBCLHlEQUFzRDs7QUFFaEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHlDQUF5QztBQUN6Qyx5QkFBeUI7O0FBRXpCO0FBQ0EsQ0FBQzs7QUFFRCxZQUFZOzs7Ozs7OztBQ2pCWixVQUFVLG1CQUFPLENBQUMsS0FBWTtBQUM5QixXQUFXLG1CQUFPLENBQUMsS0FBYTtBQUNoQywrQkFBK0IsOERBQWlFO0FBQ2hHLHlCQUF5Qix3REFBb0Q7O0FBRTdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixvREFBb0Q7QUFDckUsaUJBQWlCLGlEQUFpRDtBQUNsRSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxnQkFBZ0Isd0NBQXdDO0FBQ3hELGdCQUFnQix3Q0FBd0M7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBLGFBQWEsb0RBQW9EO0FBQ2pFLGFBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxTQUEyQiIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvZG9jX2NvbW1lbnRfaGlnaGxpZ2h0X3J1bGVzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvbXlzcWwuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9teXNxbF9oaWdobGlnaHRfcnVsZXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90ZXh0X2hpZ2hsaWdodF9ydWxlc1wiKS5UZXh0SGlnaGxpZ2h0UnVsZXM7XG5cbnZhciBEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy4kcnVsZXMgPSB7XG4gICAgICAgIFwic3RhcnRcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcImNvbW1lbnQuZG9jLnRhZ1wiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIkBcXFxcdysoPz1cXFxcc3wkKVwiXG4gICAgICAgICAgICB9LCBEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMuZ2V0VGFnUnVsZSgpLCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcImNvbW1lbnQuZG9jXCIsXG4gICAgICAgICAgICAgICAgY2FzZUluc2Vuc2l0aXZlOiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9O1xufTtcblxub29wLmluaGVyaXRzKERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLmdldFRhZ1J1bGUgPSBmdW5jdGlvbihzdGFydCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHRva2VuIDogXCJjb21tZW50LmRvYy50YWcuc3RvcmFnZS50eXBlXCIsXG4gICAgICAgIHJlZ2V4IDogXCJcXFxcYig/OlRPRE98RklYTUV8WFhYfEhBQ0spXFxcXGJcIlxuICAgIH07XG59O1xuXG5Eb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMuZ2V0U3RhcnRSdWxlID0gZnVuY3Rpb24oc3RhcnQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0b2tlbiA6IFwiY29tbWVudC5kb2NcIiwgLy8gZG9jIGNvbW1lbnRcbiAgICAgICAgcmVnZXggOiBcIlxcXFwvXFxcXCooPz1cXFxcKilcIixcbiAgICAgICAgbmV4dCAgOiBzdGFydFxuICAgIH07XG59O1xuXG5Eb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMuZ2V0RW5kUnVsZSA9IGZ1bmN0aW9uIChzdGFydCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHRva2VuIDogXCJjb21tZW50LmRvY1wiLCAvLyBjbG9zaW5nIGNvbW1lbnRcbiAgICAgICAgcmVnZXggOiBcIlxcXFwqXFxcXC9cIixcbiAgICAgICAgbmV4dCAgOiBzdGFydFxuICAgIH07XG59O1xuXG5cbmV4cG9ydHMuRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzID0gRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzO1xuIiwidmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRNb2RlID0gcmVxdWlyZShcIi4uL21vZGUvdGV4dFwiKS5Nb2RlO1xudmFyIE15c3FsSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9teXNxbF9oaWdobGlnaHRfcnVsZXNcIikuTXlzcWxIaWdobGlnaHRSdWxlcztcblxudmFyIE1vZGUgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLkhpZ2hsaWdodFJ1bGVzID0gTXlzcWxIaWdobGlnaHRSdWxlcztcbiAgICB0aGlzLiRiZWhhdmlvdXIgPSB0aGlzLiRkZWZhdWx0QmVoYXZpb3VyO1xufTtcbm9vcC5pbmhlcml0cyhNb2RlLCBUZXh0TW9kZSk7XG5cbihmdW5jdGlvbigpIHsgICAgICAgXG4gICAgdGhpcy5saW5lQ29tbWVudFN0YXJ0ID0gW1wiLS1cIiwgXCIjXCJdOyAvLyB0b2RvIHNwYWNlXG4gICAgdGhpcy5ibG9ja0NvbW1lbnQgPSB7c3RhcnQ6IFwiLypcIiwgZW5kOiBcIiovXCJ9O1xuXG4gICAgdGhpcy4kaWQgPSBcImFjZS9tb2RlL215c3FsXCI7XG59KS5jYWxsKE1vZGUucHJvdG90eXBlKTtcblxuZXhwb3J0cy5Nb2RlID0gTW9kZTtcbiIsInZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBsYW5nID0gcmVxdWlyZShcIi4uL2xpYi9sYW5nXCIpO1xudmFyIERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL2RvY19jb21tZW50X2hpZ2hsaWdodF9ydWxlc1wiKS5Eb2NDb21tZW50SGlnaGxpZ2h0UnVsZXM7XG52YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xuXG52YXIgTXlzcWxIaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBteVNxbEtleXdvcmRzID0gLypzcWwqLyBcImFsdGVyfGFuZHxhc3xhc2N8YmV0d2Vlbnxjb3VudHxjcmVhdGV8ZGVsZXRlfGRlc2N8ZGlzdGluY3R8ZHJvcHxmcm9tfGxhdGVyYWx8aGF2aW5nfGlufGluc2VydHxpbnRvfGlzfGpvaW58bGlrZXxub3R8b258b3J8b3JkZXJ8c2VsZWN0fHNldHx0YWJsZXx1bmlvbnxpbnRlcnNlY3R8ZXhjZXB0fHVwZGF0ZXx2YWx1ZXN8d2hlcmVcIlxuICAgICAgICAvKm15c3FsKi8gKyBcInxhY2Nlc3NpYmxlfGFjdGlvbnxhZGR8YWZ0ZXJ8YWxnb3JpdGhtfGFsbHxhbmFseXplfGFzZW5zaXRpdmV8YXR8YXV0aG9yc3xhdXRvX2luY3JlbWVudHxhdXRvY29tbWl0fGF2Z3xhdmdfcm93X2xlbmd0aHxiZWZvcmV8YmluYXJ5fGJpbmxvZ3xib3RofGJ0cmVlfGNhY2hlfGNhbGx8Y2FzY2FkZXxjYXNjYWRlZHxjYXNlfGNhdGFsb2dfbmFtZXxjaGFpbnxjaGFuZ2V8Y2hhbmdlZHxjaGFyYWN0ZXJ8Y2hlY2t8Y2hlY2twb2ludHxjaGVja3N1bXxjbGFzc19vcmlnaW58Y2xpZW50X3N0YXRpc3RpY3N8Y2xvc2V8Y29kZXxjb2xsYXRlfGNvbGxhdGlvbnxjb2xsYXRpb25zfGNvbHVtbnxjb2x1bW5zfGNvbW1lbnR8Y29tbWl0fGNvbW1pdHRlZHxjb21wbGV0aW9ufGNvbmN1cnJlbnR8Y29uZGl0aW9ufGNvbm5lY3Rpb258Y29uc2lzdGVudHxjb25zdHJhaW50fGNvbnRhaW5zfGNvbnRpbnVlfGNvbnRyaWJ1dG9yc3xjb252ZXJ0fGNyb3NzfGN1cnJlbnRfZGF0ZXxjdXJyZW50X3RpbWV8Y3VycmVudF90aW1lc3RhbXB8Y3VycmVudF91c2VyfGN1cnNvcnxkYXRhfGRhdGFiYXNlfGRhdGFiYXNlc3xkYXlfaG91cnxkYXlfbWljcm9zZWNvbmR8ZGF5X21pbnV0ZXxkYXlfc2Vjb25kfGRlYWxsb2NhdGV8ZGVjfGRlY2xhcmV8ZGVmYXVsdHxkZWxheV9rZXlfd3JpdGV8ZGVsYXllZHxkZWxpbWl0ZXJ8ZGVzX2tleV9maWxlfGRlc2NyaWJlfGRldGVybWluaXN0aWN8ZGV2X3BvcHxkZXZfc2FtcHxkZXZpYW5jZXxkaXJlY3Rvcnl8ZGlzYWJsZXxkaXNjYXJkfGRpc3RpbmN0cm93fGRpdnxkdWFsfGR1bXBmaWxlfGVhY2h8ZWxzZWlmfGVuYWJsZXxlbmNsb3NlZHxlbmR8ZW5kc3xlbmdpbmV8ZW5naW5lc3xlbnVtfGVycm9yc3xlc2NhcGV8ZXNjYXBlZHxldmVufGV2ZW50fGV2ZW50c3xldmVyeXxleGVjdXRlfGV4aXN0c3xleGl0fGV4cGxhaW58ZXh0ZW5kZWR8ZmFzdHxmZXRjaHxmaWVsZHxmaWVsZHN8Zmlyc3R8Zmx1c2h8Zm9yfGZvcmNlfGZvcmVpZ258Zm91bmRfcm93c3xmdWxsfGZ1bGx0ZXh0fGZ1bmN0aW9ufGdlbmVyYWx8Z2xvYmFsfGdyYW50fGdyYW50c3xncm91cHxieXxncm91cF9jb25jYXR8aGFuZGxlcnxoYXNofGhlbHB8aGlnaF9wcmlvcml0eXxob3N0c3xob3VyX21pY3Jvc2Vjb25kfGhvdXJfbWludXRlfGhvdXJfc2Vjb25kfGlmfGlnbm9yZXxpZ25vcmVfc2VydmVyX2lkc3xpbXBvcnR8aW5kZXh8aW5kZXhfc3RhdGlzdGljc3xpbmZpbGV8aW5uZXJ8aW5ub2RifGlub3V0fGluc2Vuc2l0aXZlfGluc2VydF9tZXRob2R8aW5zdGFsbHxpbnRlcnZhbHxpbnZva2VyfGlzb2xhdGlvbnxpdGVyYXRlfGtleXxrZXlzfGtpbGx8bGFuZ3VhZ2V8bGFzdHxsZWFkaW5nfGxlYXZlfGxlZnR8bGV2ZWx8bGltaXR8bGluZWFyfGxpbmVzfGxpc3R8bG9hZHxsb2NhbHxsb2NhbHRpbWV8bG9jYWx0aW1lc3RhbXB8bG9ja3xsb2dzfGxvd19wcmlvcml0eXxtYXN0ZXJ8bWFzdGVyX2hlYXJ0YmVhdF9wZXJpb2R8bWFzdGVyX3NzbF92ZXJpZnlfc2VydmVyX2NlcnR8bWFzdGVyc3xtYXRjaHxtYXh8bWF4X3Jvd3N8bWF4dmFsdWV8bWVzc2FnZV90ZXh0fG1pZGRsZWludHxtaWdyYXRlfG1pbnxtaW5fcm93c3xtaW51dGVfbWljcm9zZWNvbmR8bWludXRlX3NlY29uZHxtb2R8bW9kZXxtb2RpZmllc3xtb2RpZnl8bXV0ZXh8bXlzcWxfZXJybm98bmF0dXJhbHxuZXh0fG5vfG5vX3dyaXRlX3RvX2JpbmxvZ3xvZmZsaW5lfG9mZnNldHxvbmV8b25saW5lfG9wZW58b3B0aW1pemV8b3B0aW9ufG9wdGlvbmFsbHl8b3V0fG91dGVyfG91dGZpbGV8cGFja19rZXlzfHBhcnNlcnxwYXJ0aXRpb258cGFydGl0aW9uc3xwYXNzd29yZHxwaGFzZXxwbHVnaW58cGx1Z2luc3xwcmVwYXJlfHByZXNlcnZlfHByZXZ8cHJpbWFyeXxwcml2aWxlZ2VzfHByb2NlZHVyZXxwcm9jZXNzbGlzdHxwcm9maWxlfHByb2ZpbGVzfHB1cmdlfHF1ZXJ5fHF1aWNrfHJhbmdlfHJlYWR8cmVhZF93cml0ZXxyZWFkc3xyZWFsfHJlYnVpbGR8cmVjb3ZlcnxyZWZlcmVuY2VzfHJlZ2V4cHxyZWxheWxvZ3xyZWxlYXNlfHJlbW92ZXxyZW5hbWV8cmVvcmdhbml6ZXxyZXBhaXJ8cmVwZWF0YWJsZXxyZXBsYWNlfHJlcXVpcmV8cmVzaWduYWx8cmVzdHJpY3R8cmVzdW1lfHJldHVybnxyZXR1cm5zfHJldm9rZXxyaWdodHxybGlrZXxyb2xsYmFja3xyb2xsdXB8cm93fHJvd19mb3JtYXR8cnRyZWV8c2F2ZXBvaW50fHNjaGVkdWxlfHNjaGVtYXxzY2hlbWFfbmFtZXxzY2hlbWFzfHNlY29uZF9taWNyb3NlY29uZHxzZWN1cml0eXxzZW5zaXRpdmV8c2VwYXJhdG9yfHNlcmlhbGl6YWJsZXxzZXJ2ZXJ8c2Vzc2lvbnxzaGFyZXxzaG93fHNpZ25hbHxzbGF2ZXxzbG93fHNtYWxsaW50fHNuYXBzaG90fHNvbmFtZXxzcGF0aWFsfHNwZWNpZmljfHNxbHxzcWxfYmlnX3Jlc3VsdHxzcWxfYnVmZmVyX3Jlc3VsdHxzcWxfY2FjaGV8c3FsX2NhbGNfZm91bmRfcm93c3xzcWxfbm9fY2FjaGV8c3FsX3NtYWxsX3Jlc3VsdHxzcWxleGNlcHRpb258c3Fsc3RhdGV8c3Fsd2FybmluZ3xzc2x8c3RhcnR8c3RhcnRpbmd8c3RhcnRzfHN0YXR1c3xzdGR8c3RkZGV2fHN0ZGRldl9wb3B8c3RkZGV2X3NhbXB8c3RvcmFnZXxzdHJhaWdodF9qb2lufHN1YmNsYXNzX29yaWdpbnxzdW18c3VzcGVuZHx0YWJsZV9uYW1lfHRhYmxlX3N0YXRpc3RpY3N8dGFibGVzfHRhYmxlc3BhY2V8dGVtcG9yYXJ5fHRlcm1pbmF0ZWR8dG98dHJhaWxpbmd8dHJhbnNhY3Rpb258dHJpZ2dlcnx0cmlnZ2Vyc3x0cnVuY2F0ZXx1bmNvbW1pdHRlZHx1bmRvfHVuaW5zdGFsbHx1bmlxdWV8dW5sb2NrfHVwZ3JhZGV8dXNhZ2V8dXNlfHVzZV9mcm18dXNlcnx1c2VyX3Jlc291cmNlc3x1c2VyX3N0YXRpc3RpY3N8dXNpbmd8dXRjX2RhdGV8dXRjX3RpbWV8dXRjX3RpbWVzdGFtcHx2YWx1ZXx2YXJpYWJsZXN8dmFyeWluZ3x2aWV3fHZpZXdzfHdhcm5pbmdzfHdoZW58d2hpbGV8d2l0aHx3b3JrfHdyaXRlfHhhfHhvcnx5ZWFyX21vbnRofHplcm9maWxsfGJlZ2lufGRvfHRoZW58ZWxzZXxsb29wfHJlcGVhdFwiO1xuICAgIHZhciBidWlsdGlucyA9IFwicmFua3xjb2FsZXNjZXxpZm51bGx8aXNudWxsfG52bFwiO1xuICAgIHZhciB2YXJpYWJsZSA9IFwiY2hhcnNldHxjbGVhcnxjb25uZWN0fGVkaXR8ZWdvfGV4aXR8Z298aGVscHxub3BhZ2VyfG5vdGVlfG5vd2FybmluZ3xwYWdlcnxwcmludHxwcm9tcHR8cXVpdHxyZWhhc2h8c291cmNlfHN0YXR1c3xzeXN0ZW18dGVlXCI7XG4gICAgdmFyIGRhdGV0aW1lRnVuY3Rpb25zID0gJ2FkZGRhdGV8YWRkdGltZXxjb252ZXJ0X3R6fGN1cmRhdGV8Y3VycmVudF9kYXRlfGN1cnJlbnRfdGltZXxjdXJyZW50X3RpbWVzdGFtcHxjdXJ0aW1lfGRhdGV8ZGF0ZV9hZGR8ZGF0ZV9mb3JtYXR8ZGF0ZV9zdWJ8ZGF0ZWRpZmZ8ZGF5fGRheW5hbWV8ZGF5b2Ztb250aHxkYXlvZndlZWt8ZGF5b2Z5ZWFyfGV4dHJhY3R8ZnJvbV9kYXlzfGZyb21fdW5peHRpbWV8Z2V0X2Zvcm1hdHxob3VyfGxhc3RfZGF5fGxvY2FsdGltZXxsb2NhbHRpbWVzdGFtcHxtYWtlZGF0ZXxtYWtldGltZXxtaWNyb3NlY29uZHxtaW51dGV8bW9udGh8bW9udGhuYW1lfG5vd3xwZXJpb2RfYWRkfHBlcmlvZF9kaWZmfHF1YXJ0ZXJ8c2VjX3RvX3RpbWV8c2Vjb25kfHN0cl90b19kYXRlfHN1YmRhdGV8c3VidGltZXxzeXNkYXRlfHRpbWV8dGltZV9mb3JtYXR8dGltZV90b19zZWN8dGltZWRpZmZ8dGltZXN0YW1wfHRpbWVzdGFtcGFkZHx0aW1lc3RhbXBkaWZmfHRvX2RheXN8dG9fc2Vjb25kc3x1bml4X3RpbWVzdGFtcHx1dGNfZGF0ZXx1dGNfdGltZXx1dGNfdGltZXN0YW1wfHdlZWt8d2Vla2RheXx3ZWVrb2Z5ZWFyfHllYXJ8eWVhcndlZWsnO1xuICAgIHZhciBlbmNyeXB0aW9uRnVuY3Rpb25zID0gJ2Flc19kZWNyeXB0fGFlc19lbmNyeXB0fGNvbXByZXNzfG1kfHJhbmRvbV9ieXRlc3xzaGF8c2hhfHN0YXRlbWVudF9kaWdlc3R8c3RhdGVtZW50X2RpZ2VzdF90ZXh0fHVuY29tcHJlc3N8dW5jb21wcmVzc2VkX2xlbmd0aHx2YWxpZGF0ZV9wYXNzd29yZF9zdHJlbmd0aCc7XG4gICAgdmFyIG1hdGhGdW5jdGlvbnMgPSAnYWJzfGFjb3N8YXNpbnxhdGFufGF0YW58Y2VpbHxjZWlsaW5nfGNvbnZ8Y29zfGNvdHxjcmN8ZGVncmVlc3xkaXZ8ZXhwfGZsb29yfGxufGxvZ3xsb2cxMHxsb2cyfG1vZHxwaXxwb3d8cG93ZXJ8cmFkaWFuc3xyYW5kfHJvdW5kfHNpZ258c2lufHNxcnR8dGFufHRydW5jYXRlJztcbiAgICB2YXIgc3RyaW5nRnVuY3Rpb25zID0gJ2FzY2lpfGJpbnxiaXRfbGVuZ3RofGNoYXJ8Y2hhcl9sZW5ndGh8Y2hhcmFjdGVyX2xlbmd0aHxjb25jYXR8Y29uY2F0X3dzfGVsdHxleHBvcnRfc2V0fGZpZWxkfGZpbmRfaW5fc2V0fGZvcm1hdHxmcm9tX2Jhc2V8aGV4fGluc2VydHxpbnN0cnxsY2FzZXxsZWZ0fGxlbmd0aHxsaWtlfGxvYWRfZmlsZXxsb2NhdGV8bG93ZXJ8bHBhZHxsdHJpbXxtYWtlX3NldHxtYXRjaHxtaWR8bm90fG5vdHxvY3R8b2N0ZXRfbGVuZ3RofG9yZHxwb3NpdGlvbnxxdW90ZXxyZWdleHB8cmVnZXhwX2luc3RyfHJlZ2V4cF9saWtlfHJlZ2V4cF9yZXBsYWNlfHJlZ2V4cF9zdWJzdHJ8cmVwZWF0fHJlcGxhY2V8cmV2ZXJzZXxyaWdodHxybGlrZXxycGFkfHJ0cmltfHNvdW5kZXh8c291bmRzfHNwYWNlfHN0cmNtcHxzdWJzdHJ8c3Vic3RyaW5nfHN1YnN0cmluZ19pbmRleHx0b19iYXNlfHRyaW18dWNhc2V8dW5oZXh8dXBwZXJ8d2VpZ2h0X3N0cmluZyc7XG4gICAgLy9vcGVyYXRvckNoYXJzOiAvXlsqK1xcLSU8PiE9JnxeXS8sXG4gICAgdmFyIGRhdGFUeXBlcyA9IChcbiAgICAgICAgXCJib29sfGJvb2xlYW58Yml0fGJsb2J8ZGVjaW1hbHxkb3VibGV8ZW51bXxmbG9hdHxsb25nfGxvbmdibG9ifGxvbmd0ZXh0fG1lZGl1bXxtZWRpdW1ibG9ifG1lZGl1bWludHxtZWRpdW10ZXh0fHRpbWV8dGltZXN0YW1wfHRpbnlibG9ifHRpbnlpbnR8dGlueXRleHR8dGV4dHxcIiArXG4gICAgICAgIFwiYmlnaW50fGludHxpbnQxfGludDJ8aW50M3xpbnQ0fGludDh8aW50ZWdlcnxmbG9hdHxmbG9hdDR8ZmxvYXQ4fGRvdWJsZXxjaGFyfHZhcmJpbmFyeXx2YXJjaGFyfHZhcmNoYXJhY3RlcnxwcmVjaXNpb258ZGF0ZXxkYXRldGltZXx5ZWFyfHVuc2lnbmVkfHNpZ25lZHxudW1lcmljXCJcbiAgICApO1xuICAgIFxuICAgIHZhciBrZXl3b3JkTWFwcGVyID0gdGhpcy5jcmVhdGVLZXl3b3JkTWFwcGVyKHtcbiAgICAgICAgXCJzdXBwb3J0LmZ1bmN0aW9uXCI6IFtidWlsdGlucywgZGF0ZXRpbWVGdW5jdGlvbnMsIGVuY3J5cHRpb25GdW5jdGlvbnMsIG1hdGhGdW5jdGlvbnMsIHN0cmluZ0Z1bmN0aW9uc10uam9pbignfCcpLFxuICAgICAgICBcImtleXdvcmRcIjogbXlTcWxLZXl3b3JkcyxcbiAgICAgICAgXCJzdG9yYWdlLnR5cGVcIjogZGF0YVR5cGVzLFxuICAgICAgICBcImNvbnN0YW50XCI6IFwiZmFsc2V8dHJ1ZXxudWxsfHVua25vd258T0RCQ2RvdFRhYmxlfHplcm9sZXNzRmxvYXRcIixcbiAgICAgICAgXCJ2YXJpYWJsZS5sYW5ndWFnZVwiOiB2YXJpYWJsZVxuICAgIH0sIFwiaWRlbnRpZmllclwiLCB0cnVlKTtcblxuICAgIFxuICAgIGZ1bmN0aW9uIHN0cmluZyhydWxlKSB7XG4gICAgICAgIHZhciBzdGFydCA9IHJ1bGUuc3RhcnQ7XG4gICAgICAgIHZhciBlc2NhcGVTZXEgPSBydWxlLmVzY2FwZTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRva2VuOiBcInN0cmluZy5zdGFydFwiLFxuICAgICAgICAgICAgcmVnZXg6IHN0YXJ0LFxuICAgICAgICAgICAgbmV4dDogW1xuICAgICAgICAgICAgICAgIHt0b2tlbjogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIiwgcmVnZXg6IGVzY2FwZVNlcX0sXG4gICAgICAgICAgICAgICAge3Rva2VuOiBcInN0cmluZy5lbmRcIiwgbmV4dDogXCJzdGFydFwiLCByZWdleDogc3RhcnR9LFxuICAgICAgICAgICAgICAgIHtkZWZhdWx0VG9rZW46IFwic3RyaW5nXCJ9XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgdGhpcy4kcnVsZXMgPSB7XG4gICAgICAgIFwic3RhcnRcIiA6IFsge1xuICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIiwgcmVnZXggOiBcIig/Oi0tIHwjKS4qJFwiXG4gICAgICAgIH0sICBcbiAgICAgICAgc3RyaW5nKHtzdGFydDogJ1wiJywgZXNjYXBlOiAvXFxcXFswJ1wiYm5ydFpcXFxcJV9dPy99KSxcbiAgICAgICAgc3RyaW5nKHtzdGFydDogXCInXCIsIGVzY2FwZTogL1xcXFxbMCdcImJucnRaXFxcXCVfXT8vfSksXG4gICAgICAgIERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcy5nZXRTdGFydFJ1bGUoXCJkb2Mtc3RhcnRcIiksXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsIC8vIG11bHRpIGxpbmUgY29tbWVudFxuICAgICAgICAgICAgcmVnZXggOiAvXFwvXFwqLyxcbiAgICAgICAgICAgIG5leHQgOiBcImNvbW1lbnRcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLCAvLyBoZXhcbiAgICAgICAgICAgIHJlZ2V4IDogLzBbeFhdWzAtOWEtZkEtRl0rfFt4WF0nWzAtOWEtZkEtRl0rJ3wwW2JCXVswMV0rfFtiQl0nWzAxXSsnL1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLCAvLyBmbG9hdFxuICAgICAgICAgICAgcmVnZXggOiBcIlsrLV0/XFxcXGQrKD86KD86XFxcXC5cXFxcZCopPyg/OltlRV1bKy1dP1xcXFxkKyk/KT9cXFxcYlwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDoga2V5d29yZE1hcHBlcixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJbYS16QS1aXyRdW2EtekEtWjAtOV8kXSpcXFxcYlwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5jbGFzc1wiLFxuICAgICAgICAgICAgcmVnZXggOiBcIkBAP1thLXpBLVpfJF1bYS16QS1aMC05XyRdKlxcXFxiXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50LmJ1aWxkaW5cIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJgW15gXSpgXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcImtleXdvcmQub3BlcmF0b3JcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcK3xcXFxcLXxcXFxcL3xcXFxcL1xcXFwvfCV8PEA+fEA+fDxAfCZ8XFxcXF58fnw8fD58PD18PT58PT18IT18PD58PVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJwYXJlbi5scGFyZW5cIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJbXFxcXChdXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInBhcmVuLnJwYXJlblwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIltcXFxcKV1cIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwidGV4dFwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIlxcXFxzK1wiXG4gICAgICAgIH0gXSxcbiAgICAgICAgXCJjb21tZW50XCIgOiBbXG4gICAgICAgICAgICB7dG9rZW4gOiBcImNvbW1lbnRcIiwgcmVnZXggOiBcIlxcXFwqXFxcXC9cIiwgbmV4dCA6IFwic3RhcnRcIn0sXG4gICAgICAgICAgICB7ZGVmYXVsdFRva2VuIDogXCJjb21tZW50XCJ9XG4gICAgICAgIF1cbiAgICB9O1xuXG4gICAgdGhpcy5lbWJlZFJ1bGVzKERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcywgXCJkb2MtXCIsIFsgRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLmdldEVuZFJ1bGUoXCJzdGFydFwiKSBdKTtcbiAgICB0aGlzLm5vcm1hbGl6ZVJ1bGVzKCk7XG59O1xuXG5vb3AuaW5oZXJpdHMoTXlzcWxIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuZXhwb3J0cy5NeXNxbEhpZ2hsaWdodFJ1bGVzID0gTXlzcWxIaWdobGlnaHRSdWxlcztcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==