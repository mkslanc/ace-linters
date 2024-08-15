"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[5611],{

/***/ 76793:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/*
* Folding mode for Cabal files (Haskell): allow folding each seaction, including
* the initial general section.
*/



var oop = __webpack_require__(2645);
var BaseFoldMode = (__webpack_require__(51358).FoldMode);
var Range = (__webpack_require__(91902)/* .Range */ .Q);

var FoldMode = exports.l = function() {};
oop.inherits(FoldMode, BaseFoldMode);

(function() {
  /**
  is the row a heading?
  */
  this.isHeading = function (session,row) {
      var heading = "markup.heading";
      var token = session.getTokens(row)[0];
      return row==0 || (token && token.type.lastIndexOf(heading, 0) === 0);
  };

  this.getFoldWidget = function(session, foldStyle, row) {
      if (this.isHeading(session,row)){
        return "start";
      } else if (foldStyle === "markbeginend" && !(/^\s*$/.test(session.getLine(row)))){
        var maxRow = session.getLength();
        while (++row < maxRow) {
          if (!(/^\s*$/.test(session.getLine(row)))){
              break;
          }
        }
        if (row==maxRow || this.isHeading(session,row)){
          return "end";
        }
      }
      return "";
  };


  this.getFoldWidgetRange = function(session, foldStyle, row) {
      var line = session.getLine(row);
      var startColumn = line.length;
      var maxRow = session.getLength();
      var startRow = row;
      var endRow = row;
      // go until next heading
      if (this.isHeading(session,row)) {
          while (++row < maxRow) {
              if (this.isHeading(session,row)){
                row--;
                break;
              }
          }

          endRow = row;
          // remove empty lines at end
          if (endRow > startRow) {
              while (endRow > startRow && /^\s*$/.test(session.getLine(endRow)))
                  endRow--;
          }

          if (endRow > startRow) {
              var endColumn = session.getLine(endRow).length;
              return new Range(startRow, startColumn, endRow, endColumn);
          }
      // go back to heading
      } else if (this.getFoldWidget(session, foldStyle, row)==="end"){
        var endRow = row;
        var endColumn = session.getLine(endRow).length;
        while (--row>=0){
          if (this.isHeading(session,row)){
            break;
          }
        }
        var line = session.getLine(row);
        var startColumn = line.length;
        return new Range(row, startColumn, endRow, endColumn);
      }
    };

}).call(FoldMode.prototype);


/***/ }),

/***/ 85611:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/**
* Haskell Cabal files mode (https://www.haskell.org/cabal/users-guide/developing-packages.html)
**/



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var CabalHighlightRules = (__webpack_require__(63920)/* .CabalHighlightRules */ .L);
var FoldMode = (__webpack_require__(76793)/* .FoldMode */ .l);

var Mode = function() {
    this.HighlightRules = CabalHighlightRules;
    this.foldingRules = new FoldMode();
    this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, TextMode);

(function() {
    this.lineCommentStart = "--";
    this.blockComment = null;
    this.$id = "ace/mode/haskell_cabal";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 63920:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/**
 * Haskell Cabal files highlighter (https://www.haskell.org/cabal/users-guide/developing-packages.html)
 **/



var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

var CabalHighlightRules = function() {

    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used
    this.$rules = {
        "start" : [
            {
                token : "comment",
                regex : "^\\s*--.*$"
            }, {
                token: ["keyword"],
                regex: /^(\s*\w.*?)(:(?:\s+|$))/
            }, {
                token : "constant.numeric", // float
                regex : /[\d_]+(?:(?:[\.\d_]*)?)/
            }, {
                token : "constant.language.boolean",
                regex : "(?:true|false|TRUE|FALSE|True|False|yes|no)\\b"
            }, {
                token : "markup.heading",
                regex : /^(\w.*)$/
            }
        ]};

};

oop.inherits(CabalHighlightRules, TextHighlightRules);

exports.L = CabalHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjU2MTEuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLElBQWU7QUFDakMsbUJBQW1CLHFDQUErQjtBQUNsRCxZQUFZLDJDQUE0Qjs7QUFFeEMsZUFBZSxTQUFnQjtBQUMvQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQzs7Ozs7Ozs7QUNuRkQ7QUFDQTtBQUNBOztBQUVhOztBQUViLFVBQVUsbUJBQU8sQ0FBQyxJQUFZO0FBQzlCLGVBQWUsaUNBQXNCO0FBQ3JDLDBCQUEwQix5REFBOEQ7QUFDeEYsZUFBZSw4Q0FBMkM7O0FBRTFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQsWUFBWTs7Ozs7Ozs7QUN4Qlo7QUFDQTtBQUNBOztBQUVhOztBQUViLFVBQVUsbUJBQU8sQ0FBQyxJQUFZO0FBQzlCLHlCQUF5Qix3REFBb0Q7O0FBRTdFOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLFNBQTJCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9mb2xkaW5nL2hhc2tlbGxfY2FiYWwuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9oYXNrZWxsX2NhYmFsLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvaGFza2VsbF9jYWJhbF9oaWdobGlnaHRfcnVsZXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcbiogRm9sZGluZyBtb2RlIGZvciBDYWJhbCBmaWxlcyAoSGFza2VsbCk6IGFsbG93IGZvbGRpbmcgZWFjaCBzZWFjdGlvbiwgaW5jbHVkaW5nXG4qIHRoZSBpbml0aWFsIGdlbmVyYWwgc2VjdGlvbi5cbiovXG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uLy4uL2xpYi9vb3BcIik7XG52YXIgQmFzZUZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZF9tb2RlXCIpLkZvbGRNb2RlO1xudmFyIFJhbmdlID0gcmVxdWlyZShcIi4uLy4uL3JhbmdlXCIpLlJhbmdlO1xuXG52YXIgRm9sZE1vZGUgPSBleHBvcnRzLkZvbGRNb2RlID0gZnVuY3Rpb24oKSB7fTtcbm9vcC5pbmhlcml0cyhGb2xkTW9kZSwgQmFzZUZvbGRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuICAvKipcbiAgaXMgdGhlIHJvdyBhIGhlYWRpbmc/XG4gICovXG4gIHRoaXMuaXNIZWFkaW5nID0gZnVuY3Rpb24gKHNlc3Npb24scm93KSB7XG4gICAgICB2YXIgaGVhZGluZyA9IFwibWFya3VwLmhlYWRpbmdcIjtcbiAgICAgIHZhciB0b2tlbiA9IHNlc3Npb24uZ2V0VG9rZW5zKHJvdylbMF07XG4gICAgICByZXR1cm4gcm93PT0wIHx8ICh0b2tlbiAmJiB0b2tlbi50eXBlLmxhc3RJbmRleE9mKGhlYWRpbmcsIDApID09PSAwKTtcbiAgfTtcblxuICB0aGlzLmdldEZvbGRXaWRnZXQgPSBmdW5jdGlvbihzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdykge1xuICAgICAgaWYgKHRoaXMuaXNIZWFkaW5nKHNlc3Npb24scm93KSl7XG4gICAgICAgIHJldHVybiBcInN0YXJ0XCI7XG4gICAgICB9IGVsc2UgaWYgKGZvbGRTdHlsZSA9PT0gXCJtYXJrYmVnaW5lbmRcIiAmJiAhKC9eXFxzKiQvLnRlc3Qoc2Vzc2lvbi5nZXRMaW5lKHJvdykpKSl7XG4gICAgICAgIHZhciBtYXhSb3cgPSBzZXNzaW9uLmdldExlbmd0aCgpO1xuICAgICAgICB3aGlsZSAoKytyb3cgPCBtYXhSb3cpIHtcbiAgICAgICAgICBpZiAoISgvXlxccyokLy50ZXN0KHNlc3Npb24uZ2V0TGluZShyb3cpKSkpe1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJvdz09bWF4Um93IHx8IHRoaXMuaXNIZWFkaW5nKHNlc3Npb24scm93KSl7XG4gICAgICAgICAgcmV0dXJuIFwiZW5kXCI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBcIlwiO1xuICB9O1xuXG5cbiAgdGhpcy5nZXRGb2xkV2lkZ2V0UmFuZ2UgPSBmdW5jdGlvbihzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdykge1xuICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgIHZhciBzdGFydENvbHVtbiA9IGxpbmUubGVuZ3RoO1xuICAgICAgdmFyIG1heFJvdyA9IHNlc3Npb24uZ2V0TGVuZ3RoKCk7XG4gICAgICB2YXIgc3RhcnRSb3cgPSByb3c7XG4gICAgICB2YXIgZW5kUm93ID0gcm93O1xuICAgICAgLy8gZ28gdW50aWwgbmV4dCBoZWFkaW5nXG4gICAgICBpZiAodGhpcy5pc0hlYWRpbmcoc2Vzc2lvbixyb3cpKSB7XG4gICAgICAgICAgd2hpbGUgKCsrcm93IDwgbWF4Um93KSB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLmlzSGVhZGluZyhzZXNzaW9uLHJvdykpe1xuICAgICAgICAgICAgICAgIHJvdy0tO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZW5kUm93ID0gcm93O1xuICAgICAgICAgIC8vIHJlbW92ZSBlbXB0eSBsaW5lcyBhdCBlbmRcbiAgICAgICAgICBpZiAoZW5kUm93ID4gc3RhcnRSb3cpIHtcbiAgICAgICAgICAgICAgd2hpbGUgKGVuZFJvdyA+IHN0YXJ0Um93ICYmIC9eXFxzKiQvLnRlc3Qoc2Vzc2lvbi5nZXRMaW5lKGVuZFJvdykpKVxuICAgICAgICAgICAgICAgICAgZW5kUm93LS07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGVuZFJvdyA+IHN0YXJ0Um93KSB7XG4gICAgICAgICAgICAgIHZhciBlbmRDb2x1bW4gPSBzZXNzaW9uLmdldExpbmUoZW5kUm93KS5sZW5ndGg7XG4gICAgICAgICAgICAgIHJldHVybiBuZXcgUmFuZ2Uoc3RhcnRSb3csIHN0YXJ0Q29sdW1uLCBlbmRSb3csIGVuZENvbHVtbik7XG4gICAgICAgICAgfVxuICAgICAgLy8gZ28gYmFjayB0byBoZWFkaW5nXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuZ2V0Rm9sZFdpZGdldChzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdyk9PT1cImVuZFwiKXtcbiAgICAgICAgdmFyIGVuZFJvdyA9IHJvdztcbiAgICAgICAgdmFyIGVuZENvbHVtbiA9IHNlc3Npb24uZ2V0TGluZShlbmRSb3cpLmxlbmd0aDtcbiAgICAgICAgd2hpbGUgKC0tcm93Pj0wKXtcbiAgICAgICAgICBpZiAodGhpcy5pc0hlYWRpbmcoc2Vzc2lvbixyb3cpKXtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICB2YXIgc3RhcnRDb2x1bW4gPSBsaW5lLmxlbmd0aDtcbiAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShyb3csIHN0YXJ0Q29sdW1uLCBlbmRSb3csIGVuZENvbHVtbik7XG4gICAgICB9XG4gICAgfTtcblxufSkuY2FsbChGb2xkTW9kZS5wcm90b3R5cGUpO1xuIiwiLyoqXG4qIEhhc2tlbGwgQ2FiYWwgZmlsZXMgbW9kZSAoaHR0cHM6Ly93d3cuaGFza2VsbC5vcmcvY2FiYWwvdXNlcnMtZ3VpZGUvZGV2ZWxvcGluZy1wYWNrYWdlcy5odG1sKVxuKiovXG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dE1vZGUgPSByZXF1aXJlKFwiLi90ZXh0XCIpLk1vZGU7XG52YXIgQ2FiYWxIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL2hhc2tlbGxfY2FiYWxfaGlnaGxpZ2h0X3J1bGVzXCIpLkNhYmFsSGlnaGxpZ2h0UnVsZXM7XG52YXIgRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9mb2xkaW5nL2hhc2tlbGxfY2FiYWxcIikuRm9sZE1vZGU7XG5cbnZhciBNb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5IaWdobGlnaHRSdWxlcyA9IENhYmFsSGlnaGxpZ2h0UnVsZXM7XG4gICAgdGhpcy5mb2xkaW5nUnVsZXMgPSBuZXcgRm9sZE1vZGUoKTtcbiAgICB0aGlzLiRiZWhhdmlvdXIgPSB0aGlzLiRkZWZhdWx0QmVoYXZpb3VyO1xufTtcbm9vcC5pbmhlcml0cyhNb2RlLCBUZXh0TW9kZSk7XG5cbihmdW5jdGlvbigpIHtcbiAgICB0aGlzLmxpbmVDb21tZW50U3RhcnQgPSBcIi0tXCI7XG4gICAgdGhpcy5ibG9ja0NvbW1lbnQgPSBudWxsO1xuICAgIHRoaXMuJGlkID0gXCJhY2UvbW9kZS9oYXNrZWxsX2NhYmFsXCI7XG59KS5jYWxsKE1vZGUucHJvdG90eXBlKTtcblxuZXhwb3J0cy5Nb2RlID0gTW9kZTtcbiIsIi8qKlxuICogSGFza2VsbCBDYWJhbCBmaWxlcyBoaWdobGlnaHRlciAoaHR0cHM6Ly93d3cuaGFza2VsbC5vcmcvY2FiYWwvdXNlcnMtZ3VpZGUvZGV2ZWxvcGluZy1wYWNrYWdlcy5odG1sKVxuICoqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcblxudmFyIENhYmFsSGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbigpIHtcblxuICAgIC8vIHJlZ2V4cCBtdXN0IG5vdCBoYXZlIGNhcHR1cmluZyBwYXJlbnRoZXNlcy4gVXNlICg/OikgaW5zdGVhZC5cbiAgICAvLyByZWdleHBzIGFyZSBvcmRlcmVkIC0+IHRoZSBmaXJzdCBtYXRjaCBpcyB1c2VkXG4gICAgdGhpcy4kcnVsZXMgPSB7XG4gICAgICAgIFwic3RhcnRcIiA6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJeXFxcXHMqLS0uKiRcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBbXCJrZXl3b3JkXCJdLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvXihcXHMqXFx3Lio/KSg6KD86XFxzK3wkKSkvXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIiwgLy8gZmxvYXRcbiAgICAgICAgICAgICAgICByZWdleCA6IC9bXFxkX10rKD86KD86W1xcLlxcZF9dKik/KS9cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubGFuZ3VhZ2UuYm9vbGVhblwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIoPzp0cnVlfGZhbHNlfFRSVUV8RkFMU0V8VHJ1ZXxGYWxzZXx5ZXN8bm8pXFxcXGJcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJtYXJrdXAuaGVhZGluZ1wiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogL14oXFx3LiopJC9cbiAgICAgICAgICAgIH1cbiAgICAgICAgXX07XG5cbn07XG5cbm9vcC5pbmhlcml0cyhDYWJhbEhpZ2hsaWdodFJ1bGVzLCBUZXh0SGlnaGxpZ2h0UnVsZXMpO1xuXG5leHBvcnRzLkNhYmFsSGlnaGxpZ2h0UnVsZXMgPSBDYWJhbEhpZ2hsaWdodFJ1bGVzO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9