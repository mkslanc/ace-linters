"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[5262],{

/***/ 25262:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var RSTHighlightRules = (__webpack_require__(13353)/* .RSTHighlightRules */ .d);

var Mode = function() {
    this.HighlightRules = RSTHighlightRules;
};
oop.inherits(Mode, TextMode);

(function() {
    this.type = "text";

    this.$id = "ace/mode/rst";
    this.snippetFileId = "ace/snippets/rst";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 13353:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var lang = __webpack_require__(39955);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

var RSTHighlightRules = function() {

  var tokens = {
    title: "markup.heading",
    list: "markup.heading",
    table: "constant",
    directive: "keyword.operator",
    entity: "string",
    link: "markup.underline.list",
    bold: "markup.bold",
    italic: "markup.italic",
    literal: "support.function",
    comment: "comment"
  };

  var startStringPrefix = "(^|\\s|[\"'(<\\[{\\-/:])";
  var endStringSuffix = "(?:$|(?=\\s|[\\\\.,;!?\\-/:\"')>\\]}]))";

  this.$rules = {
    "start": [
      /* NB: Only the underline of the heading is highlighted.
       * ACE tokenizer does not allow backtracking, the underlined text of the
       * heading cannot be highlighted. */
      {
        token : tokens.title,
        regex : "(^)([\\=\\-`:\\.'\"~\\^_\\*\\+#])(\\2{2,}\\s*$)"
      },
      /* Generic directive syntax (e.g. .. code-block:: c)
       * All of the directive body is highlighted as a code block. */
      {
        token : ["text", tokens.directive, tokens.literal],
        regex : "(^\\s*\\.\\. )([^: ]+::)(.*$)",
        next  : "codeblock"
      },
      {
        token : tokens.directive,
        regex : "::$",
        next  : "codeblock"
      },
      /* Link/anchor definitions */
      {
        token : [tokens.entity, tokens.link],
        regex : "(^\\.\\. _[^:]+:)(.*$)"
      },
      {
        token : [tokens.entity, tokens.link],
        regex : "(^__ )(https?://.*$)"
      },
      /* Footnote definition */
      {
        token : tokens.entity,
        regex : "^\\.\\. \\[[^\\]]+\\] "
      },
      /* Comment block start */
      {
        token : tokens.comment,
        regex : "^\\.\\. .*$",
        next  : "comment"
      },
      /* List items */
      {
        token : tokens.list,
        regex : "^\\s*[\\*\\+-] "
      },
      {
        token : tokens.list,
        regex : "^\\s*(?:[A-Za-z]|[0-9]+|[ivxlcdmIVXLCDM]+)\\. "
      },
      {
        token : tokens.list,
        regex : "^\\s*\\(?(?:[A-Za-z]|[0-9]+|[ivxlcdmIVXLCDM]+)\\) "
      },
      /* "Simple" tables */
      {
        token : tokens.table,
        regex : "^={2,}(?: +={2,})+$"
      },
      /* "Grid" tables */
      {
        token : tokens.table,
        regex : "^\\+-{2,}(?:\\+-{2,})+\\+$"
      },
      {
        token : tokens.table,
        regex : "^\\+={2,}(?:\\+={2,})+\\+$"
      },
      /* Inline markup */
      {
        token : ["text", tokens.literal],
        regex : startStringPrefix + "(``)(?=\\S)",
        next  : "code"
      },
      {
        token : ["text", tokens.bold],
        regex : startStringPrefix + "(\\*\\*)(?=\\S)",
        next  : "bold"
      },
      {
        token : ["text", tokens.italic],
        regex : startStringPrefix + "(\\*)(?=\\S)",
        next  : "italic"
      },
      /* Substitution reference */
      {
        token : tokens.entity,
        regex : "\\|[\\w\\-]+?\\|"
      },
      /* Link/footnote references */
      {
        token : tokens.entity,
        regex : ":[\\w-:]+:`\\S",
        next  : "entity"
      },
      {
        token : ["text", tokens.entity],
        regex : startStringPrefix + "(_`)(?=\\S)",
        next  : "entity"
      },
      {
        token : tokens.entity,
        regex : "_[A-Za-z0-9\\-]+?"
      },
      {
        token : ["text", tokens.link],
        regex : startStringPrefix + "(`)(?=\\S)",
        next  : "link"
      },
      {
        token : tokens.link,
        regex : "[A-Za-z0-9\\-]+?__?"
      },
      {
        token : tokens.link,
        regex : "\\[[^\\]]+?\\]_"
      },
      {
        token : tokens.link,
        regex : "https?://\\S+"
      },
      /* "Grid" tables column separator
       * This is at the end to make it lower priority over all other rules. */
      {
        token : tokens.table,
        regex : "\\|"
      }
    ],

    /* This state is used for all directive bodies and literal blocks.
     * The parser returns to the "start" state when reaching the first
     * non-empty line that does not start with at least one space. */
    "codeblock": [
      {
        token : tokens.literal,
        regex : "^ +.+$",
        next : "codeblock"
      },
      {
        token : tokens.literal,
        regex : '^$',
        next: "codeblock"
      },
      {
        token : "empty",
        regex : "",
        next : "start"
      }
    ],

    /* Inline code
     * The parser returns to the "start" state when reaching "``" */
    "code": [
      {
        token : tokens.literal,
        regex : "\\S``" + endStringSuffix,
        next  : "start"
      },
      {
        defaultToken: tokens.literal
      }
    ],

    /* Bold (strong) text
     * The parser returns to the "start" state when reaching "**" */
    "bold": [
      {
        token : tokens.bold,
        regex : "\\S\\*\\*" + endStringSuffix,
        next  : "start"
      },
      {
        defaultToken: tokens.bold
      }
    ],

    /* Italic (emphasis) text
     * The parser returns to the "start" state when reaching "*" */
    "italic": [
      {
        token : tokens.italic,
        regex : "\\S\\*" + endStringSuffix,
        next  : "start"
      },
      {
        defaultToken: tokens.italic
      }
    ],

    /* Explicit role/class text or link anchor definition
     * The parser returns to the "start" state when reaching "`" */
    "entity": [
      {
        token : tokens.entity,
        regex : "\\S`" + endStringSuffix,
        next  : "start"
      },
      {
        defaultToken: tokens.entity
      }
    ],

    /* Link reference
     * The parser returns to the "start" state when reaching "`_" or "`__" */
    "link": [
      {
        token : tokens.link,
        regex : "\\S`__?" + endStringSuffix,
        next  : "start"
      },
      {
        defaultToken: tokens.link
      }
    ],

    /* Comment block.
     * The parser returns to the "start" state when reaching the first
     * non-empty line that does not start with at least one space. */
    "comment": [
      {
        token : tokens.comment,
        regex : "^ +.+$",
        next : "comment"
      },
      {
        token : tokens.comment,
        regex : '^$',
        next: "comment"
      },
      {
        token : "empty",
        regex : "",
        next : "start"
      }
    ]
  };
};
oop.inherits(RSTHighlightRules, TextHighlightRules);

exports.d = RSTHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjUyNjIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLElBQVk7QUFDOUIsZUFBZSxpQ0FBc0I7QUFDckMsd0JBQXdCLHVEQUFrRDs7QUFFMUU7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCxZQUFZOzs7Ozs7OztBQ2xCQzs7QUFFYixVQUFVLG1CQUFPLENBQUMsSUFBWTtBQUM5QixXQUFXLG1CQUFPLENBQUMsS0FBYTtBQUNoQyx5QkFBeUIsd0RBQW9EOztBQUU3RTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsNENBQTRDO0FBQzVDLDZDQUE2QyxnQkFBZ0I7O0FBRTdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVELEdBQUc7QUFDMUQsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixHQUFHLE9BQU8sR0FBRztBQUNqQyxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLEdBQUcsUUFBUSxHQUFHO0FBQ3JDLE9BQU87QUFDUDtBQUNBO0FBQ0EsdUJBQXVCLEdBQUcsUUFBUSxHQUFHO0FBQ3JDLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQXlCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9yc3QuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9yc3RfaGlnaGxpZ2h0X3J1bGVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dE1vZGUgPSByZXF1aXJlKFwiLi90ZXh0XCIpLk1vZGU7XG52YXIgUlNUSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9yc3RfaGlnaGxpZ2h0X3J1bGVzXCIpLlJTVEhpZ2hsaWdodFJ1bGVzO1xuXG52YXIgTW9kZSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuSGlnaGxpZ2h0UnVsZXMgPSBSU1RIaWdobGlnaHRSdWxlcztcbn07XG5vb3AuaW5oZXJpdHMoTW9kZSwgVGV4dE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgdGhpcy50eXBlID0gXCJ0ZXh0XCI7XG5cbiAgICB0aGlzLiRpZCA9IFwiYWNlL21vZGUvcnN0XCI7XG4gICAgdGhpcy5zbmlwcGV0RmlsZUlkID0gXCJhY2Uvc25pcHBldHMvcnN0XCI7XG59KS5jYWxsKE1vZGUucHJvdG90eXBlKTtcblxuZXhwb3J0cy5Nb2RlID0gTW9kZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgbGFuZyA9IHJlcXVpcmUoXCIuLi9saWIvbGFuZ1wiKTtcbnZhciBUZXh0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90ZXh0X2hpZ2hsaWdodF9ydWxlc1wiKS5UZXh0SGlnaGxpZ2h0UnVsZXM7XG5cbnZhciBSU1RIaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uKCkge1xuXG4gIHZhciB0b2tlbnMgPSB7XG4gICAgdGl0bGU6IFwibWFya3VwLmhlYWRpbmdcIixcbiAgICBsaXN0OiBcIm1hcmt1cC5oZWFkaW5nXCIsXG4gICAgdGFibGU6IFwiY29uc3RhbnRcIixcbiAgICBkaXJlY3RpdmU6IFwia2V5d29yZC5vcGVyYXRvclwiLFxuICAgIGVudGl0eTogXCJzdHJpbmdcIixcbiAgICBsaW5rOiBcIm1hcmt1cC51bmRlcmxpbmUubGlzdFwiLFxuICAgIGJvbGQ6IFwibWFya3VwLmJvbGRcIixcbiAgICBpdGFsaWM6IFwibWFya3VwLml0YWxpY1wiLFxuICAgIGxpdGVyYWw6IFwic3VwcG9ydC5mdW5jdGlvblwiLFxuICAgIGNvbW1lbnQ6IFwiY29tbWVudFwiXG4gIH07XG5cbiAgdmFyIHN0YXJ0U3RyaW5nUHJlZml4ID0gXCIoXnxcXFxcc3xbXFxcIicoPFxcXFxbe1xcXFwtLzpdKVwiO1xuICB2YXIgZW5kU3RyaW5nU3VmZml4ID0gXCIoPzokfCg/PVxcXFxzfFtcXFxcXFxcXC4sOyE/XFxcXC0vOlxcXCInKT5cXFxcXX1dKSlcIjtcblxuICB0aGlzLiRydWxlcyA9IHtcbiAgICBcInN0YXJ0XCI6IFtcbiAgICAgIC8qIE5COiBPbmx5IHRoZSB1bmRlcmxpbmUgb2YgdGhlIGhlYWRpbmcgaXMgaGlnaGxpZ2h0ZWQuXG4gICAgICAgKiBBQ0UgdG9rZW5pemVyIGRvZXMgbm90IGFsbG93IGJhY2t0cmFja2luZywgdGhlIHVuZGVybGluZWQgdGV4dCBvZiB0aGVcbiAgICAgICAqIGhlYWRpbmcgY2Fubm90IGJlIGhpZ2hsaWdodGVkLiAqL1xuICAgICAge1xuICAgICAgICB0b2tlbiA6IHRva2Vucy50aXRsZSxcbiAgICAgICAgcmVnZXggOiBcIiheKShbXFxcXD1cXFxcLWA6XFxcXC4nXFxcIn5cXFxcXl9cXFxcKlxcXFwrI10pKFxcXFwyezIsfVxcXFxzKiQpXCJcbiAgICAgIH0sXG4gICAgICAvKiBHZW5lcmljIGRpcmVjdGl2ZSBzeW50YXggKGUuZy4gLi4gY29kZS1ibG9jazo6IGMpXG4gICAgICAgKiBBbGwgb2YgdGhlIGRpcmVjdGl2ZSBib2R5IGlzIGhpZ2hsaWdodGVkIGFzIGEgY29kZSBibG9jay4gKi9cbiAgICAgIHtcbiAgICAgICAgdG9rZW4gOiBbXCJ0ZXh0XCIsIHRva2Vucy5kaXJlY3RpdmUsIHRva2Vucy5saXRlcmFsXSxcbiAgICAgICAgcmVnZXggOiBcIiheXFxcXHMqXFxcXC5cXFxcLiApKFteOiBdKzo6KSguKiQpXCIsXG4gICAgICAgIG5leHQgIDogXCJjb2RlYmxvY2tcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdG9rZW4gOiB0b2tlbnMuZGlyZWN0aXZlLFxuICAgICAgICByZWdleCA6IFwiOjokXCIsXG4gICAgICAgIG5leHQgIDogXCJjb2RlYmxvY2tcIlxuICAgICAgfSxcbiAgICAgIC8qIExpbmsvYW5jaG9yIGRlZmluaXRpb25zICovXG4gICAgICB7XG4gICAgICAgIHRva2VuIDogW3Rva2Vucy5lbnRpdHksIHRva2Vucy5saW5rXSxcbiAgICAgICAgcmVnZXggOiBcIiheXFxcXC5cXFxcLiBfW146XSs6KSguKiQpXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRva2VuIDogW3Rva2Vucy5lbnRpdHksIHRva2Vucy5saW5rXSxcbiAgICAgICAgcmVnZXggOiBcIiheX18gKShodHRwcz86Ly8uKiQpXCJcbiAgICAgIH0sXG4gICAgICAvKiBGb290bm90ZSBkZWZpbml0aW9uICovXG4gICAgICB7XG4gICAgICAgIHRva2VuIDogdG9rZW5zLmVudGl0eSxcbiAgICAgICAgcmVnZXggOiBcIl5cXFxcLlxcXFwuIFxcXFxbW15cXFxcXV0rXFxcXF0gXCJcbiAgICAgIH0sXG4gICAgICAvKiBDb21tZW50IGJsb2NrIHN0YXJ0ICovXG4gICAgICB7XG4gICAgICAgIHRva2VuIDogdG9rZW5zLmNvbW1lbnQsXG4gICAgICAgIHJlZ2V4IDogXCJeXFxcXC5cXFxcLiAuKiRcIixcbiAgICAgICAgbmV4dCAgOiBcImNvbW1lbnRcIlxuICAgICAgfSxcbiAgICAgIC8qIExpc3QgaXRlbXMgKi9cbiAgICAgIHtcbiAgICAgICAgdG9rZW4gOiB0b2tlbnMubGlzdCxcbiAgICAgICAgcmVnZXggOiBcIl5cXFxccypbXFxcXCpcXFxcKy1dIFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0b2tlbiA6IHRva2Vucy5saXN0LFxuICAgICAgICByZWdleCA6IFwiXlxcXFxzKig/OltBLVphLXpdfFswLTldK3xbaXZ4bGNkbUlWWExDRE1dKylcXFxcLiBcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdG9rZW4gOiB0b2tlbnMubGlzdCxcbiAgICAgICAgcmVnZXggOiBcIl5cXFxccypcXFxcKD8oPzpbQS1aYS16XXxbMC05XSt8W2l2eGxjZG1JVlhMQ0RNXSspXFxcXCkgXCJcbiAgICAgIH0sXG4gICAgICAvKiBcIlNpbXBsZVwiIHRhYmxlcyAqL1xuICAgICAge1xuICAgICAgICB0b2tlbiA6IHRva2Vucy50YWJsZSxcbiAgICAgICAgcmVnZXggOiBcIl49ezIsfSg/OiArPXsyLH0pKyRcIlxuICAgICAgfSxcbiAgICAgIC8qIFwiR3JpZFwiIHRhYmxlcyAqL1xuICAgICAge1xuICAgICAgICB0b2tlbiA6IHRva2Vucy50YWJsZSxcbiAgICAgICAgcmVnZXggOiBcIl5cXFxcKy17Mix9KD86XFxcXCstezIsfSkrXFxcXCskXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRva2VuIDogdG9rZW5zLnRhYmxlLFxuICAgICAgICByZWdleCA6IFwiXlxcXFwrPXsyLH0oPzpcXFxcKz17Mix9KStcXFxcKyRcIlxuICAgICAgfSxcbiAgICAgIC8qIElubGluZSBtYXJrdXAgKi9cbiAgICAgIHtcbiAgICAgICAgdG9rZW4gOiBbXCJ0ZXh0XCIsIHRva2Vucy5saXRlcmFsXSxcbiAgICAgICAgcmVnZXggOiBzdGFydFN0cmluZ1ByZWZpeCArIFwiKGBgKSg/PVxcXFxTKVwiLFxuICAgICAgICBuZXh0ICA6IFwiY29kZVwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0b2tlbiA6IFtcInRleHRcIiwgdG9rZW5zLmJvbGRdLFxuICAgICAgICByZWdleCA6IHN0YXJ0U3RyaW5nUHJlZml4ICsgXCIoXFxcXCpcXFxcKikoPz1cXFxcUylcIixcbiAgICAgICAgbmV4dCAgOiBcImJvbGRcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdG9rZW4gOiBbXCJ0ZXh0XCIsIHRva2Vucy5pdGFsaWNdLFxuICAgICAgICByZWdleCA6IHN0YXJ0U3RyaW5nUHJlZml4ICsgXCIoXFxcXCopKD89XFxcXFMpXCIsXG4gICAgICAgIG5leHQgIDogXCJpdGFsaWNcIlxuICAgICAgfSxcbiAgICAgIC8qIFN1YnN0aXR1dGlvbiByZWZlcmVuY2UgKi9cbiAgICAgIHtcbiAgICAgICAgdG9rZW4gOiB0b2tlbnMuZW50aXR5LFxuICAgICAgICByZWdleCA6IFwiXFxcXHxbXFxcXHdcXFxcLV0rP1xcXFx8XCJcbiAgICAgIH0sXG4gICAgICAvKiBMaW5rL2Zvb3Rub3RlIHJlZmVyZW5jZXMgKi9cbiAgICAgIHtcbiAgICAgICAgdG9rZW4gOiB0b2tlbnMuZW50aXR5LFxuICAgICAgICByZWdleCA6IFwiOltcXFxcdy06XSs6YFxcXFxTXCIsXG4gICAgICAgIG5leHQgIDogXCJlbnRpdHlcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdG9rZW4gOiBbXCJ0ZXh0XCIsIHRva2Vucy5lbnRpdHldLFxuICAgICAgICByZWdleCA6IHN0YXJ0U3RyaW5nUHJlZml4ICsgXCIoX2ApKD89XFxcXFMpXCIsXG4gICAgICAgIG5leHQgIDogXCJlbnRpdHlcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdG9rZW4gOiB0b2tlbnMuZW50aXR5LFxuICAgICAgICByZWdleCA6IFwiX1tBLVphLXowLTlcXFxcLV0rP1wiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0b2tlbiA6IFtcInRleHRcIiwgdG9rZW5zLmxpbmtdLFxuICAgICAgICByZWdleCA6IHN0YXJ0U3RyaW5nUHJlZml4ICsgXCIoYCkoPz1cXFxcUylcIixcbiAgICAgICAgbmV4dCAgOiBcImxpbmtcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdG9rZW4gOiB0b2tlbnMubGluayxcbiAgICAgICAgcmVnZXggOiBcIltBLVphLXowLTlcXFxcLV0rP19fP1wiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0b2tlbiA6IHRva2Vucy5saW5rLFxuICAgICAgICByZWdleCA6IFwiXFxcXFtbXlxcXFxdXSs/XFxcXF1fXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRva2VuIDogdG9rZW5zLmxpbmssXG4gICAgICAgIHJlZ2V4IDogXCJodHRwcz86Ly9cXFxcUytcIlxuICAgICAgfSxcbiAgICAgIC8qIFwiR3JpZFwiIHRhYmxlcyBjb2x1bW4gc2VwYXJhdG9yXG4gICAgICAgKiBUaGlzIGlzIGF0IHRoZSBlbmQgdG8gbWFrZSBpdCBsb3dlciBwcmlvcml0eSBvdmVyIGFsbCBvdGhlciBydWxlcy4gKi9cbiAgICAgIHtcbiAgICAgICAgdG9rZW4gOiB0b2tlbnMudGFibGUsXG4gICAgICAgIHJlZ2V4IDogXCJcXFxcfFwiXG4gICAgICB9XG4gICAgXSxcblxuICAgIC8qIFRoaXMgc3RhdGUgaXMgdXNlZCBmb3IgYWxsIGRpcmVjdGl2ZSBib2RpZXMgYW5kIGxpdGVyYWwgYmxvY2tzLlxuICAgICAqIFRoZSBwYXJzZXIgcmV0dXJucyB0byB0aGUgXCJzdGFydFwiIHN0YXRlIHdoZW4gcmVhY2hpbmcgdGhlIGZpcnN0XG4gICAgICogbm9uLWVtcHR5IGxpbmUgdGhhdCBkb2VzIG5vdCBzdGFydCB3aXRoIGF0IGxlYXN0IG9uZSBzcGFjZS4gKi9cbiAgICBcImNvZGVibG9ja1wiOiBbXG4gICAgICB7XG4gICAgICAgIHRva2VuIDogdG9rZW5zLmxpdGVyYWwsXG4gICAgICAgIHJlZ2V4IDogXCJeICsuKyRcIixcbiAgICAgICAgbmV4dCA6IFwiY29kZWJsb2NrXCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRva2VuIDogdG9rZW5zLmxpdGVyYWwsXG4gICAgICAgIHJlZ2V4IDogJ14kJyxcbiAgICAgICAgbmV4dDogXCJjb2RlYmxvY2tcIlxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdG9rZW4gOiBcImVtcHR5XCIsXG4gICAgICAgIHJlZ2V4IDogXCJcIixcbiAgICAgICAgbmV4dCA6IFwic3RhcnRcIlxuICAgICAgfVxuICAgIF0sXG5cbiAgICAvKiBJbmxpbmUgY29kZVxuICAgICAqIFRoZSBwYXJzZXIgcmV0dXJucyB0byB0aGUgXCJzdGFydFwiIHN0YXRlIHdoZW4gcmVhY2hpbmcgXCJgYFwiICovXG4gICAgXCJjb2RlXCI6IFtcbiAgICAgIHtcbiAgICAgICAgdG9rZW4gOiB0b2tlbnMubGl0ZXJhbCxcbiAgICAgICAgcmVnZXggOiBcIlxcXFxTYGBcIiArIGVuZFN0cmluZ1N1ZmZpeCxcbiAgICAgICAgbmV4dCAgOiBcInN0YXJ0XCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGRlZmF1bHRUb2tlbjogdG9rZW5zLmxpdGVyYWxcbiAgICAgIH1cbiAgICBdLFxuXG4gICAgLyogQm9sZCAoc3Ryb25nKSB0ZXh0XG4gICAgICogVGhlIHBhcnNlciByZXR1cm5zIHRvIHRoZSBcInN0YXJ0XCIgc3RhdGUgd2hlbiByZWFjaGluZyBcIioqXCIgKi9cbiAgICBcImJvbGRcIjogW1xuICAgICAge1xuICAgICAgICB0b2tlbiA6IHRva2Vucy5ib2xkLFxuICAgICAgICByZWdleCA6IFwiXFxcXFNcXFxcKlxcXFwqXCIgKyBlbmRTdHJpbmdTdWZmaXgsXG4gICAgICAgIG5leHQgIDogXCJzdGFydFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBkZWZhdWx0VG9rZW46IHRva2Vucy5ib2xkXG4gICAgICB9XG4gICAgXSxcblxuICAgIC8qIEl0YWxpYyAoZW1waGFzaXMpIHRleHRcbiAgICAgKiBUaGUgcGFyc2VyIHJldHVybnMgdG8gdGhlIFwic3RhcnRcIiBzdGF0ZSB3aGVuIHJlYWNoaW5nIFwiKlwiICovXG4gICAgXCJpdGFsaWNcIjogW1xuICAgICAge1xuICAgICAgICB0b2tlbiA6IHRva2Vucy5pdGFsaWMsXG4gICAgICAgIHJlZ2V4IDogXCJcXFxcU1xcXFwqXCIgKyBlbmRTdHJpbmdTdWZmaXgsXG4gICAgICAgIG5leHQgIDogXCJzdGFydFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBkZWZhdWx0VG9rZW46IHRva2Vucy5pdGFsaWNcbiAgICAgIH1cbiAgICBdLFxuXG4gICAgLyogRXhwbGljaXQgcm9sZS9jbGFzcyB0ZXh0IG9yIGxpbmsgYW5jaG9yIGRlZmluaXRpb25cbiAgICAgKiBUaGUgcGFyc2VyIHJldHVybnMgdG8gdGhlIFwic3RhcnRcIiBzdGF0ZSB3aGVuIHJlYWNoaW5nIFwiYFwiICovXG4gICAgXCJlbnRpdHlcIjogW1xuICAgICAge1xuICAgICAgICB0b2tlbiA6IHRva2Vucy5lbnRpdHksXG4gICAgICAgIHJlZ2V4IDogXCJcXFxcU2BcIiArIGVuZFN0cmluZ1N1ZmZpeCxcbiAgICAgICAgbmV4dCAgOiBcInN0YXJ0XCJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGRlZmF1bHRUb2tlbjogdG9rZW5zLmVudGl0eVxuICAgICAgfVxuICAgIF0sXG5cbiAgICAvKiBMaW5rIHJlZmVyZW5jZVxuICAgICAqIFRoZSBwYXJzZXIgcmV0dXJucyB0byB0aGUgXCJzdGFydFwiIHN0YXRlIHdoZW4gcmVhY2hpbmcgXCJgX1wiIG9yIFwiYF9fXCIgKi9cbiAgICBcImxpbmtcIjogW1xuICAgICAge1xuICAgICAgICB0b2tlbiA6IHRva2Vucy5saW5rLFxuICAgICAgICByZWdleCA6IFwiXFxcXFNgX18/XCIgKyBlbmRTdHJpbmdTdWZmaXgsXG4gICAgICAgIG5leHQgIDogXCJzdGFydFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBkZWZhdWx0VG9rZW46IHRva2Vucy5saW5rXG4gICAgICB9XG4gICAgXSxcblxuICAgIC8qIENvbW1lbnQgYmxvY2suXG4gICAgICogVGhlIHBhcnNlciByZXR1cm5zIHRvIHRoZSBcInN0YXJ0XCIgc3RhdGUgd2hlbiByZWFjaGluZyB0aGUgZmlyc3RcbiAgICAgKiBub24tZW1wdHkgbGluZSB0aGF0IGRvZXMgbm90IHN0YXJ0IHdpdGggYXQgbGVhc3Qgb25lIHNwYWNlLiAqL1xuICAgIFwiY29tbWVudFwiOiBbXG4gICAgICB7XG4gICAgICAgIHRva2VuIDogdG9rZW5zLmNvbW1lbnQsXG4gICAgICAgIHJlZ2V4IDogXCJeICsuKyRcIixcbiAgICAgICAgbmV4dCA6IFwiY29tbWVudFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0b2tlbiA6IHRva2Vucy5jb21tZW50LFxuICAgICAgICByZWdleCA6ICdeJCcsXG4gICAgICAgIG5leHQ6IFwiY29tbWVudFwiXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0b2tlbiA6IFwiZW1wdHlcIixcbiAgICAgICAgcmVnZXggOiBcIlwiLFxuICAgICAgICBuZXh0IDogXCJzdGFydFwiXG4gICAgICB9XG4gICAgXVxuICB9O1xufTtcbm9vcC5pbmhlcml0cyhSU1RIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuZXhwb3J0cy5SU1RIaWdobGlnaHRSdWxlcyA9IFJTVEhpZ2hsaWdodFJ1bGVzO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9