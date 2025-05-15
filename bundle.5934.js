"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[5934,955],{

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


/***/ }),

/***/ 45934:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var CSVMode = (__webpack_require__(30955).Mode);
var TsvHighlightRules = (__webpack_require__(17161)/* .TsvHighlightRules */ .N);

var Mode = function(options) {
    var mode = new CSVMode({
        splitter: "\t",
        quote: '"'
    });
    mode.HighlightRules = TsvHighlightRules;
    mode.$id = "ace/mode/tsv";
    return mode;
};

exports.Mode = Mode;


/***/ }),

/***/ 17161:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);


var TsvHighlightRules = function() {
    TextHighlightRules.call(this);
};

oop.inherits(TsvHighlightRules, TextHighlightRules);

exports.N = TsvHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjU5MzQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLElBQVk7QUFDOUIsZUFBZSxpQ0FBc0I7QUFDckMsbUJBQW1CLHlDQUFtQztBQUN0RCx3QkFBd0IsdURBQWtEOztBQUUxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQsWUFBWTs7O0FBR1o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGtCQUFrQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhOztBQUViOzs7Ozs7O0FDckZhOztBQUViLFVBQVUsbUJBQU8sQ0FBQyxJQUFZO0FBQzlCLHlCQUF5Qix3REFBb0Q7OztBQUc3RTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsU0FBeUI7Ozs7Ozs7O0FDWlo7O0FBRWIsY0FBYyxpQ0FBcUI7QUFDbkMsd0JBQXdCLHVEQUFrRDs7QUFFMUU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsWUFBWTs7Ozs7Ozs7QUNmQzs7QUFFYixVQUFVLG1CQUFPLENBQUMsSUFBWTtBQUM5Qix5QkFBeUIsd0RBQW9EOzs7QUFHN0U7QUFDQTtBQUNBOztBQUVBOztBQUVBLFNBQXlCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9jc3YuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9jc3ZfaGlnaGxpZ2h0X3J1bGVzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvdHN2LmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvdHN2X2hpZ2hsaWdodF9ydWxlcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRNb2RlID0gcmVxdWlyZShcIi4vdGV4dFwiKS5Nb2RlO1xudmFyIGVzY2FwZVJlZ0V4cCA9IHJlcXVpcmUoXCIuLi9saWIvbGFuZ1wiKS5lc2NhcGVSZWdFeHA7XG52YXIgQ3N2SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9jc3ZfaGlnaGxpZ2h0X3J1bGVzXCIpLkNzdkhpZ2hsaWdodFJ1bGVzO1xuXG52YXIgTW9kZSA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICB0aGlzLkhpZ2hsaWdodFJ1bGVzID0gQ3N2SGlnaGxpZ2h0UnVsZXM7XG4gICAgaWYgKCFvcHRpb25zKSBvcHRpb25zID0ge307XG4gICAgdmFyIHNlcGFyYXRvclJlZ2V4ID0gW29wdGlvbnMuc3BsaXR0ZXIgfHwgXCIsXCIsIG9wdGlvbnMucXVvdGUgfHwgJ1wiJ11cbiAgICAgICAgLm1hcChlc2NhcGVSZWdFeHApLmpvaW4oXCJ8XCIpO1xuICAgIHRoaXMuJHRva2VuaXplciA9IHtcbiAgICAgICAgZ2V0TGluZVRva2VuczogZnVuY3Rpb24obGluZSwgc3RhdGUsIHJvdykge1xuICAgICAgICAgICAgcmV0dXJuIHRva2VuaXplQ3N2KGxpbmUsIHN0YXRlLCB0aGlzLm9wdGlvbnMpO1xuICAgICAgICB9LFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICBxdW90ZXM6IG9wdGlvbnMucXVvdGUgfHwgJ1wiJyxcbiAgICAgICAgICAgIHNlcGFyYXRvclJlZ2V4OiBuZXcgUmVnRXhwKFwiKFwiICsgc2VwYXJhdG9yUmVnZXggKyBcIilcIiksXG4gICAgICAgICAgICBzcGxpdGVyOiBvcHRpb25zLnNwbGl0dGVyIHx8IFwiLFwiXG4gICAgICAgIH0sXG4gICAgICAgIHN0YXRlczoge30sXG4gICAgfTtcbiAgICB0aGlzLiRoaWdobGlnaHRSdWxlcyA9IG5ldyB0aGlzLkhpZ2hsaWdodFJ1bGVzKCk7XG59O1xub29wLmluaGVyaXRzKE1vZGUsIFRleHRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuZ2V0VG9rZW5pemVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiR0b2tlbml6ZXI7XG4gICAgfTtcblxuICAgIHRoaXMuJGlkID0gXCJhY2UvbW9kZS9jc3ZcIjtcbn0pLmNhbGwoTW9kZS5wcm90b3R5cGUpO1xuXG5leHBvcnRzLk1vZGUgPSBNb2RlO1xuXG5cbnZhciBjbGFzc05hbWVzID0gW1wia2V5d29yZFwiLCBcInRleHRcIiwgXCJzdHJpbmdcIiwgXCJzdHJpbmcucmVnZXhcIiwgXCJ2YXJpYWJsZVwiLCBcImNvbnN0YW50Lm51bWVyaWNcIl07XG5cbmZ1bmN0aW9uIHRva2VuaXplQ3N2KGxpbmUsIHN0YXRlLCBvcHRpb25zKSB7XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIHZhciBwYXJ0cyA9IGxpbmUuc3BsaXQob3B0aW9ucy5zZXBhcmF0b3JSZWdleCk7XG4gICAgdmFyIHNwbGl0ZXIgPSBvcHRpb25zLnNwbGl0ZXI7XG4gICAgdmFyIHF1b3RlID0gb3B0aW9ucy5xdW90ZSB8fCAnXCInO1xuICAgIHZhciBzdGF0ZVBhcnRzID0gKHN0YXRlfHxcInN0YXJ0XCIpLnNwbGl0KFwiLVwiKTtcbiAgICB2YXIgY29sdW1uID0gcGFyc2VJbnQoc3RhdGVQYXJ0c1sxXSkgfHwgMDtcbiAgICB2YXIgaW5TdHJpbmcgPSBzdGF0ZVBhcnRzWzBdID09ICdzdHJpbmcnO1xuICAgIHZhciBhdENvbHVtblN0YXJ0ID0gIWluU3RyaW5nO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGFydHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHZhbHVlID0gcGFydHNbaV07XG4gICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgdmFyIGlzU2VwYXJhdG9yID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAodmFsdWUgPT0gc3BsaXRlciAmJiAhaW5TdHJpbmcpIHtcbiAgICAgICAgICAgICAgICBjb2x1bW4rKztcbiAgICAgICAgICAgICAgICBhdENvbHVtblN0YXJ0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpc1NlcGFyYXRvciA9IHRydWU7XG4gICAgICAgICAgICB9IFxuICAgICAgICAgICAgZWxzZSBpZiAodmFsdWUgPT0gcXVvdGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoYXRDb2x1bW5TdGFydCkge1xuICAgICAgICAgICAgICAgICAgICBpblN0cmluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGF0Q29sdW1uU3RhcnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGluU3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJ0c1tpICsgMV0gPT0gJycgJiYgcGFydHNbaSArIDJdID09IHF1b3RlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHF1b3RlICsgcXVvdGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpICs9IDI7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpblN0cmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgYXRDb2x1bW5TdGFydCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXN1bHQucHVzaChcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogY2xhc3NOYW1lc1tjb2x1bW4gJSBjbGFzc05hbWVzLmxlbmd0aF0gKyBcIi5jc3ZfXCIgKyBjb2x1bW4gKyAoaXNTZXBhcmF0b3IgPyBcIi5jc3Zfc2VwYXJhdG9yXCIgOiBcIlwiKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHsgdG9rZW5zOiByZXN1bHQsIHN0YXRlOiBpblN0cmluZyA/IFwic3RyaW5nLVwiICsgY29sdW1uIDogXCJzdGFydFwiIH07XG5cbn0iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcblxuXG52YXIgQ3N2SGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbigpIHtcbiAgICBUZXh0SGlnaGxpZ2h0UnVsZXMuY2FsbCh0aGlzKTtcbn07XG5cbm9vcC5pbmhlcml0cyhDc3ZIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuZXhwb3J0cy5Dc3ZIaWdobGlnaHRSdWxlcyA9IENzdkhpZ2hsaWdodFJ1bGVzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBDU1ZNb2RlID0gcmVxdWlyZShcIi4vY3N2XCIpLk1vZGU7XG52YXIgVHN2SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90c3ZfaGlnaGxpZ2h0X3J1bGVzXCIpLlRzdkhpZ2hsaWdodFJ1bGVzO1xuXG52YXIgTW9kZSA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICB2YXIgbW9kZSA9IG5ldyBDU1ZNb2RlKHtcbiAgICAgICAgc3BsaXR0ZXI6IFwiXFx0XCIsXG4gICAgICAgIHF1b3RlOiAnXCInXG4gICAgfSk7XG4gICAgbW9kZS5IaWdobGlnaHRSdWxlcyA9IFRzdkhpZ2hsaWdodFJ1bGVzO1xuICAgIG1vZGUuJGlkID0gXCJhY2UvbW9kZS90c3ZcIjtcbiAgICByZXR1cm4gbW9kZTtcbn07XG5cbmV4cG9ydHMuTW9kZSA9IE1vZGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcblxuXG52YXIgVHN2SGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbigpIHtcbiAgICBUZXh0SGlnaGxpZ2h0UnVsZXMuY2FsbCh0aGlzKTtcbn07XG5cbm9vcC5pbmhlcml0cyhUc3ZIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuZXhwb3J0cy5Uc3ZIaWdobGlnaHRSdWxlcyA9IFRzdkhpZ2hsaWdodFJ1bGVzO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9