"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[5917],{

/***/ 85917:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



  var oop = __webpack_require__(2645);
  var TextMode = (__webpack_require__(49432).Mode);
  var AqlHighlightRules = (__webpack_require__(15914)/* .AqlHighlightRules */ .C);

  var Mode = function() {
      this.HighlightRules = AqlHighlightRules;
      this.$behaviour = this.$defaultBehaviour;
  };
  oop.inherits(Mode, TextMode);

  (function() {

      this.lineCommentStart = "//";

      this.$id = "ace/mode/aql";
  }).call(Mode.prototype);

  exports.Mode = Mode;


/***/ }),

/***/ 15914:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



  var oop = __webpack_require__(2645);
  var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

  var AqlHighlightRules = function() {

      var keywords = (
        "for|return|filter|search|sort|limit|let|collect|asc|desc|in|into|insert|update|remove|replace|upsert|options|with|and|or|not|distinct|graph|shortest_path|outbound|inbound|any|all|none|at least|aggregate|like|k_shortest_paths|k_paths|all_shortest_paths|prune|window"
      );

      var builtinConstants = (
          "true|false"
      );

      var builtinFunctions = (
        "to_bool|to_number|to_string|to_array|to_list|is_null|is_bool|is_number|is_string|is_array|is_list|is_object|is_document|is_datestring|" +
        "typename|json_stringify|json_parse|concat|concat_separator|char_length|lower|upper|substring|left|right|trim|reverse|contains|" +
        "log|log2|log10|exp|exp2|sin|cos|tan|asin|acos|atan|atan2|radians|degrees|pi|regex_test|regex_replace|" +
        "like|floor|ceil|round|abs|rand|sqrt|pow|length|count|min|max|average|avg|sum|product|median|variance_population|variance_sample|variance|percentile|" +
        "bit_and|bit_or|bit_xor|bit_negate|bit_test|bit_popcount|bit_shift_left|bit_shift_right|bit_construct|bit_deconstruct|bit_to_string|bit_from_string|" +
        "first|last|unique|outersection|interleave|in_range|jaccard|matches|merge|merge_recursive|has|attributes|keys|values|unset|unset_recursive|keep|keep_recursive|" +
        "near|within|within_rectangle|is_in_polygon|distance|fulltext|stddev_sample|stddev_population|stddev|" +
        "slice|nth|position|contains_array|translate|zip|call|apply|push|append|pop|shift|unshift|remove_value|remove_values|" +
        "remove_nth|replace_nth|date_now|date_timestamp|date_iso8601|date_dayofweek|date_year|date_month|date_day|date_hour|" +
        "date_minute|date_second|date_millisecond|date_dayofyear|date_isoweek|date_isoweekyear|date_leapyear|date_quarter|date_days_in_month|date_trunc|date_round|" +
        "date_add|date_subtract|date_diff|date_compare|date_format|date_utctolocal|date_localtoutc|date_timezone|date_timezones|" +
        "fail|passthru|v8|sleep|schema_get|schema_validate|shard_id|call_greenspun|version|noopt|noeval|not_null|" +
        "first_list|first_document|parse_identifier|current_user|current_database|collection_count|pregel_result|" +
        "collections|document|decode_rev|range|union|union_distinct|minus|intersection|flatten|is_same_collection|check_document|" +
        "ltrim|rtrim|find_first|find_last|split|substitute|ipv4_to_number|ipv4_from_number|is_ipv4|md5|sha1|sha512|crc32|fnv64|hash|random_token|to_base64|" +
        "to_hex|encode_uri_component|soundex|assert|warn|is_key|sorted|sorted_unique|count_distinct|count_unique|" +
        "levenshtein_distance|levenshtein_match|regex_matches|regex_split|ngram_match|ngram_similarity|ngram_positional_similarity|uuid|" +
        "tokens|exists|starts_with|phrase|min_match|bm25|tfidf|boost|analyzer|" +
        "cosine_similarity|decay_exp|decay_gauss|decay_linear|l1_distance|l2_distance|minhash|minhash_count|minhash_error|minhash_match|" +
        "geo_point|geo_multipoint|geo_polygon|geo_multipolygon|geo_linestring|geo_multilinestring|geo_contains|geo_intersects|" +
        "geo_equals|geo_distance|geo_area|geo_in_range"
      );

      var keywordMapper = this.createKeywordMapper({
          "support.function": builtinFunctions,
          "keyword": keywords,
          "constant.language": builtinConstants
      }, "identifier", true);

      this.$rules = {
          "start" : [ {
              token : "comment",
              regex : "//.*$"
          }, {
              token : "string",           // " string
              regex : '".*?"'
          }, {
              token : "string",           // ' string
              regex : "'.*?'"
          }, {
              token : "constant.numeric", // float
              regex : "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
          }, {
              token : keywordMapper,
              regex : "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
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
          } ]
      };
      this.normalizeRules();
  };

  oop.inherits(AqlHighlightRules, TextHighlightRules);

  exports.C = AqlHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjU5MTcuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsWUFBWSxtQkFBTyxDQUFDLElBQVk7QUFDaEMsaUJBQWlCLGlDQUFzQjtBQUN2QywwQkFBMEIsdURBQWtEOztBQUU1RTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSCxFQUFFLFlBQVk7Ozs7Ozs7O0FDbkJEOztBQUViLFlBQVksbUJBQU8sQ0FBQyxJQUFZO0FBQ2hDLDJCQUEyQix3REFBb0Q7O0FBRS9FOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxFQUFFLFNBQXlCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9hcWwuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9hcWxfaGlnaGxpZ2h0X3J1bGVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG4gIHZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbiAgdmFyIFRleHRNb2RlID0gcmVxdWlyZShcIi4vdGV4dFwiKS5Nb2RlO1xuICB2YXIgQXFsSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9hcWxfaGlnaGxpZ2h0X3J1bGVzXCIpLkFxbEhpZ2hsaWdodFJ1bGVzO1xuXG4gIHZhciBNb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLkhpZ2hsaWdodFJ1bGVzID0gQXFsSGlnaGxpZ2h0UnVsZXM7XG4gICAgICB0aGlzLiRiZWhhdmlvdXIgPSB0aGlzLiRkZWZhdWx0QmVoYXZpb3VyO1xuICB9O1xuICBvb3AuaW5oZXJpdHMoTW9kZSwgVGV4dE1vZGUpO1xuXG4gIChmdW5jdGlvbigpIHtcblxuICAgICAgdGhpcy5saW5lQ29tbWVudFN0YXJ0ID0gXCIvL1wiO1xuXG4gICAgICB0aGlzLiRpZCA9IFwiYWNlL21vZGUvYXFsXCI7XG4gIH0pLmNhbGwoTW9kZS5wcm90b3R5cGUpO1xuXG4gIGV4cG9ydHMuTW9kZSA9IE1vZGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuICB2YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG4gIHZhciBUZXh0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90ZXh0X2hpZ2hsaWdodF9ydWxlc1wiKS5UZXh0SGlnaGxpZ2h0UnVsZXM7XG5cbiAgdmFyIEFxbEhpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgIHZhciBrZXl3b3JkcyA9IChcbiAgICAgICAgXCJmb3J8cmV0dXJufGZpbHRlcnxzZWFyY2h8c29ydHxsaW1pdHxsZXR8Y29sbGVjdHxhc2N8ZGVzY3xpbnxpbnRvfGluc2VydHx1cGRhdGV8cmVtb3ZlfHJlcGxhY2V8dXBzZXJ0fG9wdGlvbnN8d2l0aHxhbmR8b3J8bm90fGRpc3RpbmN0fGdyYXBofHNob3J0ZXN0X3BhdGh8b3V0Ym91bmR8aW5ib3VuZHxhbnl8YWxsfG5vbmV8YXQgbGVhc3R8YWdncmVnYXRlfGxpa2V8a19zaG9ydGVzdF9wYXRoc3xrX3BhdGhzfGFsbF9zaG9ydGVzdF9wYXRoc3xwcnVuZXx3aW5kb3dcIlxuICAgICAgKTtcblxuICAgICAgdmFyIGJ1aWx0aW5Db25zdGFudHMgPSAoXG4gICAgICAgICAgXCJ0cnVlfGZhbHNlXCJcbiAgICAgICk7XG5cbiAgICAgIHZhciBidWlsdGluRnVuY3Rpb25zID0gKFxuICAgICAgICBcInRvX2Jvb2x8dG9fbnVtYmVyfHRvX3N0cmluZ3x0b19hcnJheXx0b19saXN0fGlzX251bGx8aXNfYm9vbHxpc19udW1iZXJ8aXNfc3RyaW5nfGlzX2FycmF5fGlzX2xpc3R8aXNfb2JqZWN0fGlzX2RvY3VtZW50fGlzX2RhdGVzdHJpbmd8XCIgK1xuICAgICAgICBcInR5cGVuYW1lfGpzb25fc3RyaW5naWZ5fGpzb25fcGFyc2V8Y29uY2F0fGNvbmNhdF9zZXBhcmF0b3J8Y2hhcl9sZW5ndGh8bG93ZXJ8dXBwZXJ8c3Vic3RyaW5nfGxlZnR8cmlnaHR8dHJpbXxyZXZlcnNlfGNvbnRhaW5zfFwiICtcbiAgICAgICAgXCJsb2d8bG9nMnxsb2cxMHxleHB8ZXhwMnxzaW58Y29zfHRhbnxhc2lufGFjb3N8YXRhbnxhdGFuMnxyYWRpYW5zfGRlZ3JlZXN8cGl8cmVnZXhfdGVzdHxyZWdleF9yZXBsYWNlfFwiICtcbiAgICAgICAgXCJsaWtlfGZsb29yfGNlaWx8cm91bmR8YWJzfHJhbmR8c3FydHxwb3d8bGVuZ3RofGNvdW50fG1pbnxtYXh8YXZlcmFnZXxhdmd8c3VtfHByb2R1Y3R8bWVkaWFufHZhcmlhbmNlX3BvcHVsYXRpb258dmFyaWFuY2Vfc2FtcGxlfHZhcmlhbmNlfHBlcmNlbnRpbGV8XCIgK1xuICAgICAgICBcImJpdF9hbmR8Yml0X29yfGJpdF94b3J8Yml0X25lZ2F0ZXxiaXRfdGVzdHxiaXRfcG9wY291bnR8Yml0X3NoaWZ0X2xlZnR8Yml0X3NoaWZ0X3JpZ2h0fGJpdF9jb25zdHJ1Y3R8Yml0X2RlY29uc3RydWN0fGJpdF90b19zdHJpbmd8Yml0X2Zyb21fc3RyaW5nfFwiICtcbiAgICAgICAgXCJmaXJzdHxsYXN0fHVuaXF1ZXxvdXRlcnNlY3Rpb258aW50ZXJsZWF2ZXxpbl9yYW5nZXxqYWNjYXJkfG1hdGNoZXN8bWVyZ2V8bWVyZ2VfcmVjdXJzaXZlfGhhc3xhdHRyaWJ1dGVzfGtleXN8dmFsdWVzfHVuc2V0fHVuc2V0X3JlY3Vyc2l2ZXxrZWVwfGtlZXBfcmVjdXJzaXZlfFwiICtcbiAgICAgICAgXCJuZWFyfHdpdGhpbnx3aXRoaW5fcmVjdGFuZ2xlfGlzX2luX3BvbHlnb258ZGlzdGFuY2V8ZnVsbHRleHR8c3RkZGV2X3NhbXBsZXxzdGRkZXZfcG9wdWxhdGlvbnxzdGRkZXZ8XCIgK1xuICAgICAgICBcInNsaWNlfG50aHxwb3NpdGlvbnxjb250YWluc19hcnJheXx0cmFuc2xhdGV8emlwfGNhbGx8YXBwbHl8cHVzaHxhcHBlbmR8cG9wfHNoaWZ0fHVuc2hpZnR8cmVtb3ZlX3ZhbHVlfHJlbW92ZV92YWx1ZXN8XCIgK1xuICAgICAgICBcInJlbW92ZV9udGh8cmVwbGFjZV9udGh8ZGF0ZV9ub3d8ZGF0ZV90aW1lc3RhbXB8ZGF0ZV9pc284NjAxfGRhdGVfZGF5b2Z3ZWVrfGRhdGVfeWVhcnxkYXRlX21vbnRofGRhdGVfZGF5fGRhdGVfaG91cnxcIiArXG4gICAgICAgIFwiZGF0ZV9taW51dGV8ZGF0ZV9zZWNvbmR8ZGF0ZV9taWxsaXNlY29uZHxkYXRlX2RheW9meWVhcnxkYXRlX2lzb3dlZWt8ZGF0ZV9pc293ZWVreWVhcnxkYXRlX2xlYXB5ZWFyfGRhdGVfcXVhcnRlcnxkYXRlX2RheXNfaW5fbW9udGh8ZGF0ZV90cnVuY3xkYXRlX3JvdW5kfFwiICtcbiAgICAgICAgXCJkYXRlX2FkZHxkYXRlX3N1YnRyYWN0fGRhdGVfZGlmZnxkYXRlX2NvbXBhcmV8ZGF0ZV9mb3JtYXR8ZGF0ZV91dGN0b2xvY2FsfGRhdGVfbG9jYWx0b3V0Y3xkYXRlX3RpbWV6b25lfGRhdGVfdGltZXpvbmVzfFwiICtcbiAgICAgICAgXCJmYWlsfHBhc3N0aHJ1fHY4fHNsZWVwfHNjaGVtYV9nZXR8c2NoZW1hX3ZhbGlkYXRlfHNoYXJkX2lkfGNhbGxfZ3JlZW5zcHVufHZlcnNpb258bm9vcHR8bm9ldmFsfG5vdF9udWxsfFwiICtcbiAgICAgICAgXCJmaXJzdF9saXN0fGZpcnN0X2RvY3VtZW50fHBhcnNlX2lkZW50aWZpZXJ8Y3VycmVudF91c2VyfGN1cnJlbnRfZGF0YWJhc2V8Y29sbGVjdGlvbl9jb3VudHxwcmVnZWxfcmVzdWx0fFwiICtcbiAgICAgICAgXCJjb2xsZWN0aW9uc3xkb2N1bWVudHxkZWNvZGVfcmV2fHJhbmdlfHVuaW9ufHVuaW9uX2Rpc3RpbmN0fG1pbnVzfGludGVyc2VjdGlvbnxmbGF0dGVufGlzX3NhbWVfY29sbGVjdGlvbnxjaGVja19kb2N1bWVudHxcIiArXG4gICAgICAgIFwibHRyaW18cnRyaW18ZmluZF9maXJzdHxmaW5kX2xhc3R8c3BsaXR8c3Vic3RpdHV0ZXxpcHY0X3RvX251bWJlcnxpcHY0X2Zyb21fbnVtYmVyfGlzX2lwdjR8bWQ1fHNoYTF8c2hhNTEyfGNyYzMyfGZudjY0fGhhc2h8cmFuZG9tX3Rva2VufHRvX2Jhc2U2NHxcIiArXG4gICAgICAgIFwidG9faGV4fGVuY29kZV91cmlfY29tcG9uZW50fHNvdW5kZXh8YXNzZXJ0fHdhcm58aXNfa2V5fHNvcnRlZHxzb3J0ZWRfdW5pcXVlfGNvdW50X2Rpc3RpbmN0fGNvdW50X3VuaXF1ZXxcIiArXG4gICAgICAgIFwibGV2ZW5zaHRlaW5fZGlzdGFuY2V8bGV2ZW5zaHRlaW5fbWF0Y2h8cmVnZXhfbWF0Y2hlc3xyZWdleF9zcGxpdHxuZ3JhbV9tYXRjaHxuZ3JhbV9zaW1pbGFyaXR5fG5ncmFtX3Bvc2l0aW9uYWxfc2ltaWxhcml0eXx1dWlkfFwiICtcbiAgICAgICAgXCJ0b2tlbnN8ZXhpc3RzfHN0YXJ0c193aXRofHBocmFzZXxtaW5fbWF0Y2h8Ym0yNXx0ZmlkZnxib29zdHxhbmFseXplcnxcIiArXG4gICAgICAgIFwiY29zaW5lX3NpbWlsYXJpdHl8ZGVjYXlfZXhwfGRlY2F5X2dhdXNzfGRlY2F5X2xpbmVhcnxsMV9kaXN0YW5jZXxsMl9kaXN0YW5jZXxtaW5oYXNofG1pbmhhc2hfY291bnR8bWluaGFzaF9lcnJvcnxtaW5oYXNoX21hdGNofFwiICtcbiAgICAgICAgXCJnZW9fcG9pbnR8Z2VvX211bHRpcG9pbnR8Z2VvX3BvbHlnb258Z2VvX211bHRpcG9seWdvbnxnZW9fbGluZXN0cmluZ3xnZW9fbXVsdGlsaW5lc3RyaW5nfGdlb19jb250YWluc3xnZW9faW50ZXJzZWN0c3xcIiArXG4gICAgICAgIFwiZ2VvX2VxdWFsc3xnZW9fZGlzdGFuY2V8Z2VvX2FyZWF8Z2VvX2luX3JhbmdlXCJcbiAgICAgICk7XG5cbiAgICAgIHZhciBrZXl3b3JkTWFwcGVyID0gdGhpcy5jcmVhdGVLZXl3b3JkTWFwcGVyKHtcbiAgICAgICAgICBcInN1cHBvcnQuZnVuY3Rpb25cIjogYnVpbHRpbkZ1bmN0aW9ucyxcbiAgICAgICAgICBcImtleXdvcmRcIjoga2V5d29yZHMsXG4gICAgICAgICAgXCJjb25zdGFudC5sYW5ndWFnZVwiOiBidWlsdGluQ29uc3RhbnRzXG4gICAgICB9LCBcImlkZW50aWZpZXJcIiwgdHJ1ZSk7XG5cbiAgICAgIHRoaXMuJHJ1bGVzID0ge1xuICAgICAgICAgIFwic3RhcnRcIiA6IFsge1xuICAgICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudFwiLFxuICAgICAgICAgICAgICByZWdleCA6IFwiLy8uKiRcIlxuICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLCAgICAgICAgICAgLy8gXCIgc3RyaW5nXG4gICAgICAgICAgICAgIHJlZ2V4IDogJ1wiLio/XCInXG4gICAgICAgICAgfSwge1xuICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsICAgICAgICAgICAvLyAnIHN0cmluZ1xuICAgICAgICAgICAgICByZWdleCA6IFwiJy4qPydcIlxuICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIiwgLy8gZmxvYXRcbiAgICAgICAgICAgICAgcmVnZXggOiBcIlsrLV0/XFxcXGQrKD86KD86XFxcXC5cXFxcZCopPyg/OltlRV1bKy1dP1xcXFxkKyk/KT9cXFxcYlwiXG4gICAgICAgICAgfSwge1xuICAgICAgICAgICAgICB0b2tlbiA6IGtleXdvcmRNYXBwZXIsXG4gICAgICAgICAgICAgIHJlZ2V4IDogXCJbYS16QS1aXyRdW2EtekEtWjAtOV8kXSpcXFxcYlwiXG4gICAgICAgICAgfSwge1xuICAgICAgICAgICAgICB0b2tlbiA6IFwia2V5d29yZC5vcGVyYXRvclwiLFxuICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXCt8XFxcXC18XFxcXC98XFxcXC9cXFxcL3wlfDxAPnxAPnw8QHwmfFxcXFxefH58PHw+fDw9fD0+fD09fCE9fDw+fD1cIlxuICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgdG9rZW4gOiBcInBhcmVuLmxwYXJlblwiLFxuICAgICAgICAgICAgICByZWdleCA6IFwiW1xcXFwoXVwiXG4gICAgICAgICAgfSwge1xuICAgICAgICAgICAgICB0b2tlbiA6IFwicGFyZW4ucnBhcmVuXCIsXG4gICAgICAgICAgICAgIHJlZ2V4IDogXCJbXFxcXCldXCJcbiAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgIHRva2VuIDogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxccytcIlxuICAgICAgICAgIH0gXVxuICAgICAgfTtcbiAgICAgIHRoaXMubm9ybWFsaXplUnVsZXMoKTtcbiAgfTtcblxuICBvb3AuaW5oZXJpdHMoQXFsSGlnaGxpZ2h0UnVsZXMsIFRleHRIaWdobGlnaHRSdWxlcyk7XG5cbiAgZXhwb3J0cy5BcWxIaWdobGlnaHRSdWxlcyA9IEFxbEhpZ2hsaWdodFJ1bGVzO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9