"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[955],{

/***/ 30955:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var escapeRegExp = (__webpack_require__(39955).escapeRegExp);
var CsvHighlightRules = (__webpack_require__(20688)/* .CsvHighlightRules */ .I);

var Mode = function(options) {
    this.HighlightRules = CsvHighlightRules;
    if (!options) options = {};
    var separatorRegex = [options.splitter || ",", options.quote || '"']
        .map(escapeRegExp).join("|");
    this.$tokenizer = {
        getLineTokens: function(line, state, row) {
            return tokenizeCsv(line, state, this.options);
        },
        options: {
            quotes: options.quote || '"',
            separatorRegex: new RegExp("(" + separatorRegex + ")"),
            spliter: options.splitter || ","
        },
        states: {},
    };
    this.$highlightRules = new this.HighlightRules();
};
oop.inherits(Mode, TextMode);

(function() {
    this.getTokenizer = function() {
        return this.$tokenizer;
    };

    this.$id = "ace/mode/csv";
}).call(Mode.prototype);

exports.Mode = Mode;


var classNames = ["keyword", "text", "string", "string.regex", "variable", "constant.numeric"];

function tokenizeCsv(line, state, options) {
    var result = [];
    var parts = line.split(options.separatorRegex);
    var spliter = options.spliter;
    var quote = options.quote || '"';
    var stateParts = (state||"start").split("-");
    var column = parseInt(stateParts[1]) || 0;
    var inString = stateParts[0] == 'string';
    var atColumnStart = !inString;
    for (var i = 0; i < parts.length; i++) {
        var value = parts[i];
        if (value) {
            var isSeparator = false;
            if (value == spliter && !inString) {
                column++;
                atColumnStart = true;
                isSeparator = true;
            } 
            else if (value == quote) {
                if (atColumnStart) {
                    inString = true;
                    atColumnStart = false;
                } else if (inString) {
                    if (parts[i + 1] == '' && parts[i + 2] == quote) {
                        value = quote + quote;
                        i += 2;
                    } else {
                        inString = false;
                    }
                }
            }
            else {
                atColumnStart = false;
            }

            result.push(
                {
                    value: value,
                    type: classNames[column % classNames.length] + ".csv_" + column + (isSeparator ? ".csv_separator" : "")
                }
            );
        }
    }
    return { tokens: result, state: inString ? "string-" + column : "start" };

}

/***/ }),

/***/ 20688:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);


var CsvHighlightRules = function() {
    TextHighlightRules.call(this);
};

oop.inherits(CsvHighlightRules, TextHighlightRules);

exports.I = CsvHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjk1NS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBYTs7QUFFYixVQUFVLG1CQUFPLENBQUMsSUFBWTtBQUM5QixlQUFlLGlDQUFzQjtBQUNyQyxtQkFBbUIseUNBQW1DO0FBQ3RELHdCQUF3Qix1REFBa0Q7O0FBRTFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Qsa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRCxZQUFZOzs7QUFHWjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isa0JBQWtCO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7Ozs7Ozs7QUNyRmE7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLElBQVk7QUFDOUIseUJBQXlCLHdEQUFvRDs7O0FBRzdFO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxTQUF5QiIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvY3N2LmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvY3N2X2hpZ2hsaWdodF9ydWxlcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRNb2RlID0gcmVxdWlyZShcIi4vdGV4dFwiKS5Nb2RlO1xudmFyIGVzY2FwZVJlZ0V4cCA9IHJlcXVpcmUoXCIuLi9saWIvbGFuZ1wiKS5lc2NhcGVSZWdFeHA7XG52YXIgQ3N2SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9jc3ZfaGlnaGxpZ2h0X3J1bGVzXCIpLkNzdkhpZ2hsaWdodFJ1bGVzO1xuXG52YXIgTW9kZSA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICB0aGlzLkhpZ2hsaWdodFJ1bGVzID0gQ3N2SGlnaGxpZ2h0UnVsZXM7XG4gICAgaWYgKCFvcHRpb25zKSBvcHRpb25zID0ge307XG4gICAgdmFyIHNlcGFyYXRvclJlZ2V4ID0gW29wdGlvbnMuc3BsaXR0ZXIgfHwgXCIsXCIsIG9wdGlvbnMucXVvdGUgfHwgJ1wiJ11cbiAgICAgICAgLm1hcChlc2NhcGVSZWdFeHApLmpvaW4oXCJ8XCIpO1xuICAgIHRoaXMuJHRva2VuaXplciA9IHtcbiAgICAgICAgZ2V0TGluZVRva2VuczogZnVuY3Rpb24obGluZSwgc3RhdGUsIHJvdykge1xuICAgICAgICAgICAgcmV0dXJuIHRva2VuaXplQ3N2KGxpbmUsIHN0YXRlLCB0aGlzLm9wdGlvbnMpO1xuICAgICAgICB9LFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICBxdW90ZXM6IG9wdGlvbnMucXVvdGUgfHwgJ1wiJyxcbiAgICAgICAgICAgIHNlcGFyYXRvclJlZ2V4OiBuZXcgUmVnRXhwKFwiKFwiICsgc2VwYXJhdG9yUmVnZXggKyBcIilcIiksXG4gICAgICAgICAgICBzcGxpdGVyOiBvcHRpb25zLnNwbGl0dGVyIHx8IFwiLFwiXG4gICAgICAgIH0sXG4gICAgICAgIHN0YXRlczoge30sXG4gICAgfTtcbiAgICB0aGlzLiRoaWdobGlnaHRSdWxlcyA9IG5ldyB0aGlzLkhpZ2hsaWdodFJ1bGVzKCk7XG59O1xub29wLmluaGVyaXRzKE1vZGUsIFRleHRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuZ2V0VG9rZW5pemVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiR0b2tlbml6ZXI7XG4gICAgfTtcblxuICAgIHRoaXMuJGlkID0gXCJhY2UvbW9kZS9jc3ZcIjtcbn0pLmNhbGwoTW9kZS5wcm90b3R5cGUpO1xuXG5leHBvcnRzLk1vZGUgPSBNb2RlO1xuXG5cbnZhciBjbGFzc05hbWVzID0gW1wia2V5d29yZFwiLCBcInRleHRcIiwgXCJzdHJpbmdcIiwgXCJzdHJpbmcucmVnZXhcIiwgXCJ2YXJpYWJsZVwiLCBcImNvbnN0YW50Lm51bWVyaWNcIl07XG5cbmZ1bmN0aW9uIHRva2VuaXplQ3N2KGxpbmUsIHN0YXRlLCBvcHRpb25zKSB7XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIHZhciBwYXJ0cyA9IGxpbmUuc3BsaXQob3B0aW9ucy5zZXBhcmF0b3JSZWdleCk7XG4gICAgdmFyIHNwbGl0ZXIgPSBvcHRpb25zLnNwbGl0ZXI7XG4gICAgdmFyIHF1b3RlID0gb3B0aW9ucy5xdW90ZSB8fCAnXCInO1xuICAgIHZhciBzdGF0ZVBhcnRzID0gKHN0YXRlfHxcInN0YXJ0XCIpLnNwbGl0KFwiLVwiKTtcbiAgICB2YXIgY29sdW1uID0gcGFyc2VJbnQoc3RhdGVQYXJ0c1sxXSkgfHwgMDtcbiAgICB2YXIgaW5TdHJpbmcgPSBzdGF0ZVBhcnRzWzBdID09ICdzdHJpbmcnO1xuICAgIHZhciBhdENvbHVtblN0YXJ0ID0gIWluU3RyaW5nO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGFydHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHZhbHVlID0gcGFydHNbaV07XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgdmFyIGlzU2VwYXJhdG9yID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAodmFsdWUgPT0gc3BsaXRlciAmJiAhaW5TdHJpbmcpIHtcbiAgICAgICAgICAgICAgICBjb2x1bW4rKztcbiAgICAgICAgICAgICAgICBhdENvbHVtblN0YXJ0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpc1NlcGFyYXRvciA9IHRydWU7XG4gICAgICAgICAgICB9IFxuICAgICAgICAgICAgZWxzZSBpZiAodmFsdWUgPT0gcXVvdGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoYXRDb2x1bW5TdGFydCkge1xuICAgICAgICAgICAgICAgICAgICBpblN0cmluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGF0Q29sdW1uU3RhcnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGluU3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJ0c1tpICsgMV0gPT0gJycgJiYgcGFydHNbaSArIDJdID09IHF1b3RlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHF1b3RlICsgcXVvdGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpICs9IDI7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpblN0cmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgYXRDb2x1bW5TdGFydCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXN1bHQucHVzaChcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogY2xhc3NOYW1lc1tjb2x1bW4gJSBjbGFzc05hbWVzLmxlbmd0aF0gKyBcIi5jc3ZfXCIgKyBjb2x1bW4gKyAoaXNTZXBhcmF0b3IgPyBcIi5jc3Zfc2VwYXJhdG9yXCIgOiBcIlwiKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHsgdG9rZW5zOiByZXN1bHQsIHN0YXRlOiBpblN0cmluZyA/IFwic3RyaW5nLVwiICsgY29sdW1uIDogXCJzdGFydFwiIH07XG5cbn0iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcblxuXG52YXIgQ3N2SGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbigpIHtcbiAgICBUZXh0SGlnaGxpZ2h0UnVsZXMuY2FsbCh0aGlzKTtcbn07XG5cbm9vcC5pbmhlcml0cyhDc3ZIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuZXhwb3J0cy5Dc3ZIaWdobGlnaHRSdWxlcyA9IENzdkhpZ2hsaWdodFJ1bGVzO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9