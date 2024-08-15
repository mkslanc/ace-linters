"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[6473],{

/***/ 69261:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var BaseFoldMode = (__webpack_require__(51358).FoldMode);
var Range = (__webpack_require__(91902)/* .Range */ .Q);

var FoldMode = exports.l = function() {};
oop.inherits(FoldMode, BaseFoldMode);

(function() {
    this.commentBlock = function(session, row) {
        var re = /\S/;
        var line = session.getLine(row);
        var startLevel = line.search(re);
        if (startLevel == -1 || line[startLevel] != "#")
            return;

        var startColumn = line.length;
        var maxRow = session.getLength();
        var startRow = row;
        var endRow = row;

        while (++row < maxRow) {
            line = session.getLine(row);
            var level = line.search(re);

            if (level == -1)
                continue;

            if (line[level] != "#")
                break;

            endRow = row;
        }

        if (endRow > startRow) {
            var endColumn = session.getLine(endRow).length;
            return new Range(startRow, startColumn, endRow, endColumn);
        }
    };

    this.getFoldWidgetRange = function(session, foldStyle, row) {
        var range = this.indentationBlock(session, row);
        if (range)
            return range;

        range = this.commentBlock(session, row);
        if (range)
            return range;
    };

    // must return "" if there's no fold, to enable caching
    this.getFoldWidget = function(session, foldStyle, row) {
        var line = session.getLine(row);
        var indent = line.search(/\S/);
        var next = session.getLine(row + 1);
        var prev = session.getLine(row - 1);
        var prevIndent = prev.search(/\S/);
        var nextIndent = next.search(/\S/);

        if (indent == -1) {
            session.foldWidgets[row - 1] = prevIndent!= -1 && prevIndent < nextIndent ? "start" : "";
            return "";
        }

        // documentation comments
        if (prevIndent == -1) {
            if (indent == nextIndent && line[indent] == "#" && next[indent] == "#") {
                session.foldWidgets[row - 1] = "";
                session.foldWidgets[row + 1] = "";
                return "start";
            }
        } else if (prevIndent == indent && line[indent] == "#" && prev[indent] == "#") {
            if (session.getLine(row - 2).search(/\S/) == -1) {
                session.foldWidgets[row - 1] = "start";
                session.foldWidgets[row + 1] = "";
                return "";
            }
        }

        if (prevIndent!= -1 && prevIndent < indent)
            session.foldWidgets[row - 1] = "start";
        else
            session.foldWidgets[row - 1] = "";

        if (indent < nextIndent)
            return "start";
        else
            return "";
    };

}).call(FoldMode.prototype);


/***/ }),

/***/ 96473:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

var SnippetHighlightRules = function() {

    var builtins = "SELECTION|CURRENT_WORD|SELECTED_TEXT|CURRENT_LINE|LINE_INDEX|" +
        "LINE_NUMBER|SOFT_TABS|TAB_SIZE|FILENAME|FILEPATH|FULLNAME";

    this.$rules = {
        "start" : [
            {token:"constant.language.escape", regex: /\\[\$}`\\]/},
            {token:"keyword", regex: "\\$(?:TM_)?(?:" + builtins + ")\\b"},
            {token:"variable", regex: "\\$\\w+"},
            {onMatch: function(value, state, stack) {
                if (stack[1])
                    stack[1]++;
                else
                    stack.unshift(state, 1);
                return this.tokenName;
            }, tokenName: "markup.list", regex: "\\${", next: "varDecl"},
            {onMatch: function(value, state, stack) {
                if (!stack[1])
                    return "text";
                stack[1]--;
                if (!stack[1])
                    stack.splice(0,2);
                return this.tokenName;
            }, tokenName: "markup.list", regex: "}"},
            {token: "doc.comment", regex:/^\${2}-{5,}$/}
        ],
        "varDecl" : [
            {regex: /\d+\b/, token: "constant.numeric"},
            {token:"keyword", regex: "(?:TM_)?(?:" + builtins + ")\\b"},
            {token:"variable", regex: "\\w+"},
            {regex: /:/, token: "punctuation.operator", next: "start"},
            {regex: /\//, token: "string.regex", next: "regexp"},
            {regex: "", next: "start"}
        ],
        "regexp" : [
            {regex: /\\./, token: "escape"},
            {regex: /\[/, token: "regex.start", next: "charClass"},
            {regex: "/", token: "string.regex", next: "format"},
            //{"default": "string.regex"},
            {"token": "string.regex", regex:"."}
        ],
        charClass : [
            {regex: "\\.", token: "escape"},
            {regex: "\\]", token: "regex.end", next: "regexp"},
            {"token": "string.regex", regex:"."}
        ],
        "format" : [
            {regex: /\\[ulULE]/, token: "keyword"},
            {regex: /\$\d+/, token: "variable"},
            {regex: "/[gim]*:?", token: "string.regex", next: "start"},
            // {"default": "string"},
            {"token": "string", regex:"."}
        ]
    };
};
oop.inherits(SnippetHighlightRules, TextHighlightRules);

exports.SnippetHighlightRules = SnippetHighlightRules;

var SnippetGroupHighlightRules = function() {
    this.$rules = {
        "start" : [
            {token: "text", regex: "^\\t", next: "sn-start"},
            {token:"invalid", regex: /^ \s*/},
            {token:"comment", regex: /^#.*/},
            {token:"constant.language.escape", regex: "^regex ", next: "regex"},
            {token:"constant.language.escape", regex: "^(trigger|endTrigger|name|snippet|guard|endGuard|tabTrigger|key)\\b"}
        ],
        "regex" : [
            {token:"text", regex: "\\."},
            {token:"keyword", regex: "/"},
            {token:"empty", regex: "$", next: "start"}
        ]
    };
    this.embedRules(SnippetHighlightRules, "sn-", [
        {token: "text", regex: "^\\t", next: "sn-start"},
        {onMatch: function(value, state, stack) {
            stack.splice(stack.length);
            return this.tokenName;
        }, tokenName: "text", regex: "^(?!\t)", next: "start"}
    ]);
    
};

oop.inherits(SnippetGroupHighlightRules, TextHighlightRules);

exports.SnippetGroupHighlightRules = SnippetGroupHighlightRules;

var FoldMode = (__webpack_require__(69261)/* .FoldMode */ .l);

var Mode = function() {
    this.HighlightRules = SnippetGroupHighlightRules;
    this.foldingRules = new FoldMode();
    this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, TextMode);

(function() {
    this.$indentWithTabs = true;
    this.lineCommentStart = "#";
    this.$id = "ace/mode/snippets";
    this.snippetFileId = "ace/snippets/snippets";
}).call(Mode.prototype);
exports.Mode = Mode;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjY0NzMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLElBQWU7QUFDakMsbUJBQW1CLHFDQUErQjtBQUNsRCxZQUFZLDJDQUE0Qjs7QUFFeEMsZUFBZSxTQUFnQjtBQUMvQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUM7Ozs7Ozs7O0FDM0ZZOztBQUViLFVBQVUsbUJBQU8sQ0FBQyxJQUFZO0FBQzlCLGVBQWUsaUNBQXNCO0FBQ3JDLHlCQUF5Qix3REFBb0Q7O0FBRTdFOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWEsZ0RBQWdELE1BQU07QUFDbkUsYUFBYSw2REFBNkQ7QUFDMUUsYUFBYSxtQ0FBbUM7QUFDaEQsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLHdDQUF3QyxtQkFBbUI7QUFDeEUsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEscUNBQXFDLEVBQUU7QUFDcEQsYUFBYSxpQ0FBaUMsRUFBRSxFQUFFLEdBQUc7QUFDckQ7QUFDQTtBQUNBLGFBQWEsMENBQTBDO0FBQ3ZELGFBQWEsMERBQTBEO0FBQ3ZFLGFBQWEsZ0NBQWdDO0FBQzdDLGFBQWEseURBQXlEO0FBQ3RFLGFBQWEsbURBQW1EO0FBQ2hFLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYSw4QkFBOEI7QUFDM0MsYUFBYSxxREFBcUQ7QUFDbEUsYUFBYSxrREFBa0Q7QUFDL0QsZUFBZSwwQkFBMEI7QUFDekMsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhLDhCQUE4QjtBQUMzQyxhQUFhLGlEQUFpRDtBQUM5RCxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWEscUNBQXFDO0FBQ2xELGFBQWEsa0NBQWtDO0FBQy9DLGFBQWEseURBQXlEO0FBQ3RFLGdCQUFnQixvQkFBb0I7QUFDcEMsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDZCQUE2Qjs7QUFFN0I7QUFDQTtBQUNBO0FBQ0EsYUFBYSwrQ0FBK0M7QUFDNUQsYUFBYSxnQ0FBZ0M7QUFDN0MsYUFBYSwrQkFBK0I7QUFDNUMsYUFBYSxrRUFBa0U7QUFDL0UsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhLDJCQUEyQjtBQUN4QyxhQUFhLDRCQUE0QjtBQUN6QyxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsU0FBUywrQ0FBK0M7QUFDeEQsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBOztBQUVBLGtDQUFrQzs7QUFFbEMsZUFBZSw4Q0FBb0M7O0FBRW5EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELFlBQVkiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2ZvbGRpbmcvY29mZmVlLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvc25pcHBldHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vLi4vbGliL29vcFwiKTtcbnZhciBCYXNlRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9mb2xkX21vZGVcIikuRm9sZE1vZGU7XG52YXIgUmFuZ2UgPSByZXF1aXJlKFwiLi4vLi4vcmFuZ2VcIikuUmFuZ2U7XG5cbnZhciBGb2xkTW9kZSA9IGV4cG9ydHMuRm9sZE1vZGUgPSBmdW5jdGlvbigpIHt9O1xub29wLmluaGVyaXRzKEZvbGRNb2RlLCBCYXNlRm9sZE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5jb21tZW50QmxvY2sgPSBmdW5jdGlvbihzZXNzaW9uLCByb3cpIHtcbiAgICAgICAgdmFyIHJlID0gL1xcUy87XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgIHZhciBzdGFydExldmVsID0gbGluZS5zZWFyY2gocmUpO1xuICAgICAgICBpZiAoc3RhcnRMZXZlbCA9PSAtMSB8fCBsaW5lW3N0YXJ0TGV2ZWxdICE9IFwiI1wiKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHZhciBzdGFydENvbHVtbiA9IGxpbmUubGVuZ3RoO1xuICAgICAgICB2YXIgbWF4Um93ID0gc2Vzc2lvbi5nZXRMZW5ndGgoKTtcbiAgICAgICAgdmFyIHN0YXJ0Um93ID0gcm93O1xuICAgICAgICB2YXIgZW5kUm93ID0gcm93O1xuXG4gICAgICAgIHdoaWxlICgrK3JvdyA8IG1heFJvdykge1xuICAgICAgICAgICAgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICAgICAgdmFyIGxldmVsID0gbGluZS5zZWFyY2gocmUpO1xuXG4gICAgICAgICAgICBpZiAobGV2ZWwgPT0gLTEpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgICAgIGlmIChsaW5lW2xldmVsXSAhPSBcIiNcIilcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZW5kUm93ID0gcm93O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVuZFJvdyA+IHN0YXJ0Um93KSB7XG4gICAgICAgICAgICB2YXIgZW5kQ29sdW1uID0gc2Vzc2lvbi5nZXRMaW5lKGVuZFJvdykubGVuZ3RoO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShzdGFydFJvdywgc3RhcnRDb2x1bW4sIGVuZFJvdywgZW5kQ29sdW1uKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLmdldEZvbGRXaWRnZXRSYW5nZSA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KSB7XG4gICAgICAgIHZhciByYW5nZSA9IHRoaXMuaW5kZW50YXRpb25CbG9jayhzZXNzaW9uLCByb3cpO1xuICAgICAgICBpZiAocmFuZ2UpXG4gICAgICAgICAgICByZXR1cm4gcmFuZ2U7XG5cbiAgICAgICAgcmFuZ2UgPSB0aGlzLmNvbW1lbnRCbG9jayhzZXNzaW9uLCByb3cpO1xuICAgICAgICBpZiAocmFuZ2UpXG4gICAgICAgICAgICByZXR1cm4gcmFuZ2U7XG4gICAgfTtcblxuICAgIC8vIG11c3QgcmV0dXJuIFwiXCIgaWYgdGhlcmUncyBubyBmb2xkLCB0byBlbmFibGUgY2FjaGluZ1xuICAgIHRoaXMuZ2V0Rm9sZFdpZGdldCA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgIHZhciBpbmRlbnQgPSBsaW5lLnNlYXJjaCgvXFxTLyk7XG4gICAgICAgIHZhciBuZXh0ID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyArIDEpO1xuICAgICAgICB2YXIgcHJldiA9IHNlc3Npb24uZ2V0TGluZShyb3cgLSAxKTtcbiAgICAgICAgdmFyIHByZXZJbmRlbnQgPSBwcmV2LnNlYXJjaCgvXFxTLyk7XG4gICAgICAgIHZhciBuZXh0SW5kZW50ID0gbmV4dC5zZWFyY2goL1xcUy8pO1xuXG4gICAgICAgIGlmIChpbmRlbnQgPT0gLTEpIHtcbiAgICAgICAgICAgIHNlc3Npb24uZm9sZFdpZGdldHNbcm93IC0gMV0gPSBwcmV2SW5kZW50IT0gLTEgJiYgcHJldkluZGVudCA8IG5leHRJbmRlbnQgPyBcInN0YXJ0XCIgOiBcIlwiO1xuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBkb2N1bWVudGF0aW9uIGNvbW1lbnRzXG4gICAgICAgIGlmIChwcmV2SW5kZW50ID09IC0xKSB7XG4gICAgICAgICAgICBpZiAoaW5kZW50ID09IG5leHRJbmRlbnQgJiYgbGluZVtpbmRlbnRdID09IFwiI1wiICYmIG5leHRbaW5kZW50XSA9PSBcIiNcIikge1xuICAgICAgICAgICAgICAgIHNlc3Npb24uZm9sZFdpZGdldHNbcm93IC0gMV0gPSBcIlwiO1xuICAgICAgICAgICAgICAgIHNlc3Npb24uZm9sZFdpZGdldHNbcm93ICsgMV0gPSBcIlwiO1xuICAgICAgICAgICAgICAgIHJldHVybiBcInN0YXJ0XCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAocHJldkluZGVudCA9PSBpbmRlbnQgJiYgbGluZVtpbmRlbnRdID09IFwiI1wiICYmIHByZXZbaW5kZW50XSA9PSBcIiNcIikge1xuICAgICAgICAgICAgaWYgKHNlc3Npb24uZ2V0TGluZShyb3cgLSAyKS5zZWFyY2goL1xcUy8pID09IC0xKSB7XG4gICAgICAgICAgICAgICAgc2Vzc2lvbi5mb2xkV2lkZ2V0c1tyb3cgLSAxXSA9IFwic3RhcnRcIjtcbiAgICAgICAgICAgICAgICBzZXNzaW9uLmZvbGRXaWRnZXRzW3JvdyArIDFdID0gXCJcIjtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcmV2SW5kZW50IT0gLTEgJiYgcHJldkluZGVudCA8IGluZGVudClcbiAgICAgICAgICAgIHNlc3Npb24uZm9sZFdpZGdldHNbcm93IC0gMV0gPSBcInN0YXJ0XCI7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHNlc3Npb24uZm9sZFdpZGdldHNbcm93IC0gMV0gPSBcIlwiO1xuXG4gICAgICAgIGlmIChpbmRlbnQgPCBuZXh0SW5kZW50KVxuICAgICAgICAgICAgcmV0dXJuIFwic3RhcnRcIjtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfTtcblxufSkuY2FsbChGb2xkTW9kZS5wcm90b3R5cGUpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0TW9kZSA9IHJlcXVpcmUoXCIuL3RleHRcIikuTW9kZTtcbnZhciBUZXh0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90ZXh0X2hpZ2hsaWdodF9ydWxlc1wiKS5UZXh0SGlnaGxpZ2h0UnVsZXM7XG5cbnZhciBTbmlwcGV0SGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbigpIHtcblxuICAgIHZhciBidWlsdGlucyA9IFwiU0VMRUNUSU9OfENVUlJFTlRfV09SRHxTRUxFQ1RFRF9URVhUfENVUlJFTlRfTElORXxMSU5FX0lOREVYfFwiICtcbiAgICAgICAgXCJMSU5FX05VTUJFUnxTT0ZUX1RBQlN8VEFCX1NJWkV8RklMRU5BTUV8RklMRVBBVEh8RlVMTE5BTUVcIjtcblxuICAgIHRoaXMuJHJ1bGVzID0ge1xuICAgICAgICBcInN0YXJ0XCIgOiBbXG4gICAgICAgICAgICB7dG9rZW46XCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIiwgcmVnZXg6IC9cXFxcW1xcJH1gXFxcXF0vfSxcbiAgICAgICAgICAgIHt0b2tlbjpcImtleXdvcmRcIiwgcmVnZXg6IFwiXFxcXCQoPzpUTV8pPyg/OlwiICsgYnVpbHRpbnMgKyBcIilcXFxcYlwifSxcbiAgICAgICAgICAgIHt0b2tlbjpcInZhcmlhYmxlXCIsIHJlZ2V4OiBcIlxcXFwkXFxcXHcrXCJ9LFxuICAgICAgICAgICAge29uTWF0Y2g6IGZ1bmN0aW9uKHZhbHVlLCBzdGF0ZSwgc3RhY2spIHtcbiAgICAgICAgICAgICAgICBpZiAoc3RhY2tbMV0pXG4gICAgICAgICAgICAgICAgICAgIHN0YWNrWzFdKys7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBzdGFjay51bnNoaWZ0KHN0YXRlLCAxKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50b2tlbk5hbWU7XG4gICAgICAgICAgICB9LCB0b2tlbk5hbWU6IFwibWFya3VwLmxpc3RcIiwgcmVnZXg6IFwiXFxcXCR7XCIsIG5leHQ6IFwidmFyRGVjbFwifSxcbiAgICAgICAgICAgIHtvbk1hdGNoOiBmdW5jdGlvbih2YWx1ZSwgc3RhdGUsIHN0YWNrKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFzdGFja1sxXSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwidGV4dFwiO1xuICAgICAgICAgICAgICAgIHN0YWNrWzFdLS07XG4gICAgICAgICAgICAgICAgaWYgKCFzdGFja1sxXSlcbiAgICAgICAgICAgICAgICAgICAgc3RhY2suc3BsaWNlKDAsMik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9rZW5OYW1lO1xuICAgICAgICAgICAgfSwgdG9rZW5OYW1lOiBcIm1hcmt1cC5saXN0XCIsIHJlZ2V4OiBcIn1cIn0sXG4gICAgICAgICAgICB7dG9rZW46IFwiZG9jLmNvbW1lbnRcIiwgcmVnZXg6L15cXCR7Mn0tezUsfSQvfVxuICAgICAgICBdLFxuICAgICAgICBcInZhckRlY2xcIiA6IFtcbiAgICAgICAgICAgIHtyZWdleDogL1xcZCtcXGIvLCB0b2tlbjogXCJjb25zdGFudC5udW1lcmljXCJ9LFxuICAgICAgICAgICAge3Rva2VuOlwia2V5d29yZFwiLCByZWdleDogXCIoPzpUTV8pPyg/OlwiICsgYnVpbHRpbnMgKyBcIilcXFxcYlwifSxcbiAgICAgICAgICAgIHt0b2tlbjpcInZhcmlhYmxlXCIsIHJlZ2V4OiBcIlxcXFx3K1wifSxcbiAgICAgICAgICAgIHtyZWdleDogLzovLCB0b2tlbjogXCJwdW5jdHVhdGlvbi5vcGVyYXRvclwiLCBuZXh0OiBcInN0YXJ0XCJ9LFxuICAgICAgICAgICAge3JlZ2V4OiAvXFwvLywgdG9rZW46IFwic3RyaW5nLnJlZ2V4XCIsIG5leHQ6IFwicmVnZXhwXCJ9LFxuICAgICAgICAgICAge3JlZ2V4OiBcIlwiLCBuZXh0OiBcInN0YXJ0XCJ9XG4gICAgICAgIF0sXG4gICAgICAgIFwicmVnZXhwXCIgOiBbXG4gICAgICAgICAgICB7cmVnZXg6IC9cXFxcLi8sIHRva2VuOiBcImVzY2FwZVwifSxcbiAgICAgICAgICAgIHtyZWdleDogL1xcWy8sIHRva2VuOiBcInJlZ2V4LnN0YXJ0XCIsIG5leHQ6IFwiY2hhckNsYXNzXCJ9LFxuICAgICAgICAgICAge3JlZ2V4OiBcIi9cIiwgdG9rZW46IFwic3RyaW5nLnJlZ2V4XCIsIG5leHQ6IFwiZm9ybWF0XCJ9LFxuICAgICAgICAgICAgLy97XCJkZWZhdWx0XCI6IFwic3RyaW5nLnJlZ2V4XCJ9LFxuICAgICAgICAgICAge1widG9rZW5cIjogXCJzdHJpbmcucmVnZXhcIiwgcmVnZXg6XCIuXCJ9XG4gICAgICAgIF0sXG4gICAgICAgIGNoYXJDbGFzcyA6IFtcbiAgICAgICAgICAgIHtyZWdleDogXCJcXFxcLlwiLCB0b2tlbjogXCJlc2NhcGVcIn0sXG4gICAgICAgICAgICB7cmVnZXg6IFwiXFxcXF1cIiwgdG9rZW46IFwicmVnZXguZW5kXCIsIG5leHQ6IFwicmVnZXhwXCJ9LFxuICAgICAgICAgICAge1widG9rZW5cIjogXCJzdHJpbmcucmVnZXhcIiwgcmVnZXg6XCIuXCJ9XG4gICAgICAgIF0sXG4gICAgICAgIFwiZm9ybWF0XCIgOiBbXG4gICAgICAgICAgICB7cmVnZXg6IC9cXFxcW3VsVUxFXS8sIHRva2VuOiBcImtleXdvcmRcIn0sXG4gICAgICAgICAgICB7cmVnZXg6IC9cXCRcXGQrLywgdG9rZW46IFwidmFyaWFibGVcIn0sXG4gICAgICAgICAgICB7cmVnZXg6IFwiL1tnaW1dKjo/XCIsIHRva2VuOiBcInN0cmluZy5yZWdleFwiLCBuZXh0OiBcInN0YXJ0XCJ9LFxuICAgICAgICAgICAgLy8ge1wiZGVmYXVsdFwiOiBcInN0cmluZ1wifSxcbiAgICAgICAgICAgIHtcInRva2VuXCI6IFwic3RyaW5nXCIsIHJlZ2V4OlwiLlwifVxuICAgICAgICBdXG4gICAgfTtcbn07XG5vb3AuaW5oZXJpdHMoU25pcHBldEhpZ2hsaWdodFJ1bGVzLCBUZXh0SGlnaGxpZ2h0UnVsZXMpO1xuXG5leHBvcnRzLlNuaXBwZXRIaWdobGlnaHRSdWxlcyA9IFNuaXBwZXRIaWdobGlnaHRSdWxlcztcblxudmFyIFNuaXBwZXRHcm91cEhpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy4kcnVsZXMgPSB7XG4gICAgICAgIFwic3RhcnRcIiA6IFtcbiAgICAgICAgICAgIHt0b2tlbjogXCJ0ZXh0XCIsIHJlZ2V4OiBcIl5cXFxcdFwiLCBuZXh0OiBcInNuLXN0YXJ0XCJ9LFxuICAgICAgICAgICAge3Rva2VuOlwiaW52YWxpZFwiLCByZWdleDogL14gXFxzKi99LFxuICAgICAgICAgICAge3Rva2VuOlwiY29tbWVudFwiLCByZWdleDogL14jLiovfSxcbiAgICAgICAgICAgIHt0b2tlbjpcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLCByZWdleDogXCJecmVnZXggXCIsIG5leHQ6IFwicmVnZXhcIn0sXG4gICAgICAgICAgICB7dG9rZW46XCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIiwgcmVnZXg6IFwiXih0cmlnZ2VyfGVuZFRyaWdnZXJ8bmFtZXxzbmlwcGV0fGd1YXJkfGVuZEd1YXJkfHRhYlRyaWdnZXJ8a2V5KVxcXFxiXCJ9XG4gICAgICAgIF0sXG4gICAgICAgIFwicmVnZXhcIiA6IFtcbiAgICAgICAgICAgIHt0b2tlbjpcInRleHRcIiwgcmVnZXg6IFwiXFxcXC5cIn0sXG4gICAgICAgICAgICB7dG9rZW46XCJrZXl3b3JkXCIsIHJlZ2V4OiBcIi9cIn0sXG4gICAgICAgICAgICB7dG9rZW46XCJlbXB0eVwiLCByZWdleDogXCIkXCIsIG5leHQ6IFwic3RhcnRcIn1cbiAgICAgICAgXVxuICAgIH07XG4gICAgdGhpcy5lbWJlZFJ1bGVzKFNuaXBwZXRIaWdobGlnaHRSdWxlcywgXCJzbi1cIiwgW1xuICAgICAgICB7dG9rZW46IFwidGV4dFwiLCByZWdleDogXCJeXFxcXHRcIiwgbmV4dDogXCJzbi1zdGFydFwifSxcbiAgICAgICAge29uTWF0Y2g6IGZ1bmN0aW9uKHZhbHVlLCBzdGF0ZSwgc3RhY2spIHtcbiAgICAgICAgICAgIHN0YWNrLnNwbGljZShzdGFjay5sZW5ndGgpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9rZW5OYW1lO1xuICAgICAgICB9LCB0b2tlbk5hbWU6IFwidGV4dFwiLCByZWdleDogXCJeKD8hXFx0KVwiLCBuZXh0OiBcInN0YXJ0XCJ9XG4gICAgXSk7XG4gICAgXG59O1xuXG5vb3AuaW5oZXJpdHMoU25pcHBldEdyb3VwSGlnaGxpZ2h0UnVsZXMsIFRleHRIaWdobGlnaHRSdWxlcyk7XG5cbmV4cG9ydHMuU25pcHBldEdyb3VwSGlnaGxpZ2h0UnVsZXMgPSBTbmlwcGV0R3JvdXBIaWdobGlnaHRSdWxlcztcblxudmFyIEZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZGluZy9jb2ZmZWVcIikuRm9sZE1vZGU7XG5cbnZhciBNb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5IaWdobGlnaHRSdWxlcyA9IFNuaXBwZXRHcm91cEhpZ2hsaWdodFJ1bGVzO1xuICAgIHRoaXMuZm9sZGluZ1J1bGVzID0gbmV3IEZvbGRNb2RlKCk7XG4gICAgdGhpcy4kYmVoYXZpb3VyID0gdGhpcy4kZGVmYXVsdEJlaGF2aW91cjtcbn07XG5vb3AuaW5oZXJpdHMoTW9kZSwgVGV4dE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgdGhpcy4kaW5kZW50V2l0aFRhYnMgPSB0cnVlO1xuICAgIHRoaXMubGluZUNvbW1lbnRTdGFydCA9IFwiI1wiO1xuICAgIHRoaXMuJGlkID0gXCJhY2UvbW9kZS9zbmlwcGV0c1wiO1xuICAgIHRoaXMuc25pcHBldEZpbGVJZCA9IFwiYWNlL3NuaXBwZXRzL3NuaXBwZXRzXCI7XG59KS5jYWxsKE1vZGUucHJvdG90eXBlKTtcbmV4cG9ydHMuTW9kZSA9IE1vZGU7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=