"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[2942],{

/***/ 35090:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var BaseFoldMode = (__webpack_require__(15369).FoldMode);
var Range = (__webpack_require__(59082)/* .Range */ .e);

var FoldMode = exports.Z = function() {};
oop.inherits(FoldMode, BaseFoldMode);

(function() {

    this.getFoldWidgetRange = function(session, foldStyle, row) {
        var range = this.indentationBlock(session, row);
        if (range)
            return range;

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

/***/ 82942:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var TextMode = (__webpack_require__(98030).Mode);
var TextHighlightRules = (__webpack_require__(28053)/* .TextHighlightRules */ .K);

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

var FoldMode = (__webpack_require__(35090)/* .FoldMode */ .Z);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjI5NDIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLEtBQWU7QUFDakMsbUJBQW1CLHFDQUErQjtBQUNsRCxZQUFZLDJDQUE0Qjs7QUFFeEMsZUFBZSxTQUFnQjtBQUMvQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQzs7Ozs7Ozs7QUN0Rlk7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLEtBQVk7QUFDOUIsZUFBZSxpQ0FBc0I7QUFDckMseUJBQXlCLHdEQUFvRDs7QUFFN0U7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYSxnREFBZ0QsTUFBTTtBQUNuRSxhQUFhLDZEQUE2RDtBQUMxRSxhQUFhLG1DQUFtQztBQUNoRCxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsd0NBQXdDLG1CQUFtQjtBQUN4RSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxxQ0FBcUMsRUFBRTtBQUNwRCxhQUFhLGlDQUFpQyxFQUFFLEVBQUUsR0FBRztBQUNyRDtBQUNBO0FBQ0EsYUFBYSwwQ0FBMEM7QUFDdkQsYUFBYSwwREFBMEQ7QUFDdkUsYUFBYSxnQ0FBZ0M7QUFDN0MsYUFBYSx5REFBeUQ7QUFDdEUsYUFBYSxtREFBbUQ7QUFDaEUsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhLDhCQUE4QjtBQUMzQyxhQUFhLHFEQUFxRDtBQUNsRSxhQUFhLGtEQUFrRDtBQUMvRCxlQUFlLDBCQUEwQjtBQUN6QyxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWEsOEJBQThCO0FBQzNDLGFBQWEsaURBQWlEO0FBQzlELGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYSxxQ0FBcUM7QUFDbEQsYUFBYSxrQ0FBa0M7QUFDL0MsYUFBYSx5REFBeUQ7QUFDdEUsZ0JBQWdCLG9CQUFvQjtBQUNwQyxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsNkJBQTZCOztBQUU3QjtBQUNBO0FBQ0E7QUFDQSxhQUFhLCtDQUErQztBQUM1RCxhQUFhLGdDQUFnQztBQUM3QyxhQUFhLCtCQUErQjtBQUM1QyxhQUFhLGtFQUFrRTtBQUMvRSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWEsMkJBQTJCO0FBQ3hDLGFBQWEsNEJBQTRCO0FBQ3pDLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxTQUFTLCtDQUErQztBQUN4RCxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsa0NBQWtDOztBQUVsQyxlQUFlLDhDQUFvQzs7QUFFbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsWUFBWSIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvZm9sZGluZy9jb2ZmZWUuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9zbmlwcGV0cy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi8uLi9saWIvb29wXCIpO1xudmFyIEJhc2VGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRfbW9kZVwiKS5Gb2xkTW9kZTtcbnZhciBSYW5nZSA9IHJlcXVpcmUoXCIuLi8uLi9yYW5nZVwiKS5SYW5nZTtcblxudmFyIEZvbGRNb2RlID0gZXhwb3J0cy5Gb2xkTW9kZSA9IGZ1bmN0aW9uKCkge307XG5vb3AuaW5oZXJpdHMoRm9sZE1vZGUsIEJhc2VGb2xkTW9kZSk7XG5cbihmdW5jdGlvbigpIHtcblxuICAgIHRoaXMuZ2V0Rm9sZFdpZGdldFJhbmdlID0gZnVuY3Rpb24oc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpIHtcbiAgICAgICAgdmFyIHJhbmdlID0gdGhpcy5pbmRlbnRhdGlvbkJsb2NrKHNlc3Npb24sIHJvdyk7XG4gICAgICAgIGlmIChyYW5nZSlcbiAgICAgICAgICAgIHJldHVybiByYW5nZTtcblxuICAgICAgICB2YXIgcmUgPSAvXFxTLztcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgdmFyIHN0YXJ0TGV2ZWwgPSBsaW5lLnNlYXJjaChyZSk7XG4gICAgICAgIGlmIChzdGFydExldmVsID09IC0xIHx8IGxpbmVbc3RhcnRMZXZlbF0gIT0gXCIjXCIpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdmFyIHN0YXJ0Q29sdW1uID0gbGluZS5sZW5ndGg7XG4gICAgICAgIHZhciBtYXhSb3cgPSBzZXNzaW9uLmdldExlbmd0aCgpO1xuICAgICAgICB2YXIgc3RhcnRSb3cgPSByb3c7XG4gICAgICAgIHZhciBlbmRSb3cgPSByb3c7XG5cbiAgICAgICAgd2hpbGUgKCsrcm93IDwgbWF4Um93KSB7XG4gICAgICAgICAgICBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgICAgICB2YXIgbGV2ZWwgPSBsaW5lLnNlYXJjaChyZSk7XG5cbiAgICAgICAgICAgIGlmIChsZXZlbCA9PSAtMSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcblxuICAgICAgICAgICAgaWYgKGxpbmVbbGV2ZWxdICE9IFwiI1wiKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBlbmRSb3cgPSByb3c7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW5kUm93ID4gc3RhcnRSb3cpIHtcbiAgICAgICAgICAgIHZhciBlbmRDb2x1bW4gPSBzZXNzaW9uLmdldExpbmUoZW5kUm93KS5sZW5ndGg7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFJhbmdlKHN0YXJ0Um93LCBzdGFydENvbHVtbiwgZW5kUm93LCBlbmRDb2x1bW4pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8vIG11c3QgcmV0dXJuIFwiXCIgaWYgdGhlcmUncyBubyBmb2xkLCB0byBlbmFibGUgY2FjaGluZ1xuICAgIHRoaXMuZ2V0Rm9sZFdpZGdldCA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgIHZhciBpbmRlbnQgPSBsaW5lLnNlYXJjaCgvXFxTLyk7XG4gICAgICAgIHZhciBuZXh0ID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyArIDEpO1xuICAgICAgICB2YXIgcHJldiA9IHNlc3Npb24uZ2V0TGluZShyb3cgLSAxKTtcbiAgICAgICAgdmFyIHByZXZJbmRlbnQgPSBwcmV2LnNlYXJjaCgvXFxTLyk7XG4gICAgICAgIHZhciBuZXh0SW5kZW50ID0gbmV4dC5zZWFyY2goL1xcUy8pO1xuXG4gICAgICAgIGlmIChpbmRlbnQgPT0gLTEpIHtcbiAgICAgICAgICAgIHNlc3Npb24uZm9sZFdpZGdldHNbcm93IC0gMV0gPSBwcmV2SW5kZW50IT0gLTEgJiYgcHJldkluZGVudCA8IG5leHRJbmRlbnQgPyBcInN0YXJ0XCIgOiBcIlwiO1xuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBkb2N1bWVudGF0aW9uIGNvbW1lbnRzXG4gICAgICAgIGlmIChwcmV2SW5kZW50ID09IC0xKSB7XG4gICAgICAgICAgICBpZiAoaW5kZW50ID09IG5leHRJbmRlbnQgJiYgbGluZVtpbmRlbnRdID09IFwiI1wiICYmIG5leHRbaW5kZW50XSA9PSBcIiNcIikge1xuICAgICAgICAgICAgICAgIHNlc3Npb24uZm9sZFdpZGdldHNbcm93IC0gMV0gPSBcIlwiO1xuICAgICAgICAgICAgICAgIHNlc3Npb24uZm9sZFdpZGdldHNbcm93ICsgMV0gPSBcIlwiO1xuICAgICAgICAgICAgICAgIHJldHVybiBcInN0YXJ0XCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAocHJldkluZGVudCA9PSBpbmRlbnQgJiYgbGluZVtpbmRlbnRdID09IFwiI1wiICYmIHByZXZbaW5kZW50XSA9PSBcIiNcIikge1xuICAgICAgICAgICAgaWYgKHNlc3Npb24uZ2V0TGluZShyb3cgLSAyKS5zZWFyY2goL1xcUy8pID09IC0xKSB7XG4gICAgICAgICAgICAgICAgc2Vzc2lvbi5mb2xkV2lkZ2V0c1tyb3cgLSAxXSA9IFwic3RhcnRcIjtcbiAgICAgICAgICAgICAgICBzZXNzaW9uLmZvbGRXaWRnZXRzW3JvdyArIDFdID0gXCJcIjtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwcmV2SW5kZW50IT0gLTEgJiYgcHJldkluZGVudCA8IGluZGVudClcbiAgICAgICAgICAgIHNlc3Npb24uZm9sZFdpZGdldHNbcm93IC0gMV0gPSBcInN0YXJ0XCI7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHNlc3Npb24uZm9sZFdpZGdldHNbcm93IC0gMV0gPSBcIlwiO1xuXG4gICAgICAgIGlmIChpbmRlbnQgPCBuZXh0SW5kZW50KVxuICAgICAgICAgICAgcmV0dXJuIFwic3RhcnRcIjtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfTtcblxufSkuY2FsbChGb2xkTW9kZS5wcm90b3R5cGUpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0TW9kZSA9IHJlcXVpcmUoXCIuL3RleHRcIikuTW9kZTtcbnZhciBUZXh0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90ZXh0X2hpZ2hsaWdodF9ydWxlc1wiKS5UZXh0SGlnaGxpZ2h0UnVsZXM7XG5cbnZhciBTbmlwcGV0SGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbigpIHtcblxuICAgIHZhciBidWlsdGlucyA9IFwiU0VMRUNUSU9OfENVUlJFTlRfV09SRHxTRUxFQ1RFRF9URVhUfENVUlJFTlRfTElORXxMSU5FX0lOREVYfFwiICtcbiAgICAgICAgXCJMSU5FX05VTUJFUnxTT0ZUX1RBQlN8VEFCX1NJWkV8RklMRU5BTUV8RklMRVBBVEh8RlVMTE5BTUVcIjtcblxuICAgIHRoaXMuJHJ1bGVzID0ge1xuICAgICAgICBcInN0YXJ0XCIgOiBbXG4gICAgICAgICAgICB7dG9rZW46XCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIiwgcmVnZXg6IC9cXFxcW1xcJH1gXFxcXF0vfSxcbiAgICAgICAgICAgIHt0b2tlbjpcImtleXdvcmRcIiwgcmVnZXg6IFwiXFxcXCQoPzpUTV8pPyg/OlwiICsgYnVpbHRpbnMgKyBcIilcXFxcYlwifSxcbiAgICAgICAgICAgIHt0b2tlbjpcInZhcmlhYmxlXCIsIHJlZ2V4OiBcIlxcXFwkXFxcXHcrXCJ9LFxuICAgICAgICAgICAge29uTWF0Y2g6IGZ1bmN0aW9uKHZhbHVlLCBzdGF0ZSwgc3RhY2spIHtcbiAgICAgICAgICAgICAgICBpZiAoc3RhY2tbMV0pXG4gICAgICAgICAgICAgICAgICAgIHN0YWNrWzFdKys7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBzdGFjay51bnNoaWZ0KHN0YXRlLCAxKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50b2tlbk5hbWU7XG4gICAgICAgICAgICB9LCB0b2tlbk5hbWU6IFwibWFya3VwLmxpc3RcIiwgcmVnZXg6IFwiXFxcXCR7XCIsIG5leHQ6IFwidmFyRGVjbFwifSxcbiAgICAgICAgICAgIHtvbk1hdGNoOiBmdW5jdGlvbih2YWx1ZSwgc3RhdGUsIHN0YWNrKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFzdGFja1sxXSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwidGV4dFwiO1xuICAgICAgICAgICAgICAgIHN0YWNrWzFdLS07XG4gICAgICAgICAgICAgICAgaWYgKCFzdGFja1sxXSlcbiAgICAgICAgICAgICAgICAgICAgc3RhY2suc3BsaWNlKDAsMik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9rZW5OYW1lO1xuICAgICAgICAgICAgfSwgdG9rZW5OYW1lOiBcIm1hcmt1cC5saXN0XCIsIHJlZ2V4OiBcIn1cIn0sXG4gICAgICAgICAgICB7dG9rZW46IFwiZG9jLmNvbW1lbnRcIiwgcmVnZXg6L15cXCR7Mn0tezUsfSQvfVxuICAgICAgICBdLFxuICAgICAgICBcInZhckRlY2xcIiA6IFtcbiAgICAgICAgICAgIHtyZWdleDogL1xcZCtcXGIvLCB0b2tlbjogXCJjb25zdGFudC5udW1lcmljXCJ9LFxuICAgICAgICAgICAge3Rva2VuOlwia2V5d29yZFwiLCByZWdleDogXCIoPzpUTV8pPyg/OlwiICsgYnVpbHRpbnMgKyBcIilcXFxcYlwifSxcbiAgICAgICAgICAgIHt0b2tlbjpcInZhcmlhYmxlXCIsIHJlZ2V4OiBcIlxcXFx3K1wifSxcbiAgICAgICAgICAgIHtyZWdleDogLzovLCB0b2tlbjogXCJwdW5jdHVhdGlvbi5vcGVyYXRvclwiLCBuZXh0OiBcInN0YXJ0XCJ9LFxuICAgICAgICAgICAge3JlZ2V4OiAvXFwvLywgdG9rZW46IFwic3RyaW5nLnJlZ2V4XCIsIG5leHQ6IFwicmVnZXhwXCJ9LFxuICAgICAgICAgICAge3JlZ2V4OiBcIlwiLCBuZXh0OiBcInN0YXJ0XCJ9XG4gICAgICAgIF0sXG4gICAgICAgIFwicmVnZXhwXCIgOiBbXG4gICAgICAgICAgICB7cmVnZXg6IC9cXFxcLi8sIHRva2VuOiBcImVzY2FwZVwifSxcbiAgICAgICAgICAgIHtyZWdleDogL1xcWy8sIHRva2VuOiBcInJlZ2V4LnN0YXJ0XCIsIG5leHQ6IFwiY2hhckNsYXNzXCJ9LFxuICAgICAgICAgICAge3JlZ2V4OiBcIi9cIiwgdG9rZW46IFwic3RyaW5nLnJlZ2V4XCIsIG5leHQ6IFwiZm9ybWF0XCJ9LFxuICAgICAgICAgICAgLy97XCJkZWZhdWx0XCI6IFwic3RyaW5nLnJlZ2V4XCJ9LFxuICAgICAgICAgICAge1widG9rZW5cIjogXCJzdHJpbmcucmVnZXhcIiwgcmVnZXg6XCIuXCJ9XG4gICAgICAgIF0sXG4gICAgICAgIGNoYXJDbGFzcyA6IFtcbiAgICAgICAgICAgIHtyZWdleDogXCJcXFxcLlwiLCB0b2tlbjogXCJlc2NhcGVcIn0sXG4gICAgICAgICAgICB7cmVnZXg6IFwiXFxcXF1cIiwgdG9rZW46IFwicmVnZXguZW5kXCIsIG5leHQ6IFwicmVnZXhwXCJ9LFxuICAgICAgICAgICAge1widG9rZW5cIjogXCJzdHJpbmcucmVnZXhcIiwgcmVnZXg6XCIuXCJ9XG4gICAgICAgIF0sXG4gICAgICAgIFwiZm9ybWF0XCIgOiBbXG4gICAgICAgICAgICB7cmVnZXg6IC9cXFxcW3VsVUxFXS8sIHRva2VuOiBcImtleXdvcmRcIn0sXG4gICAgICAgICAgICB7cmVnZXg6IC9cXCRcXGQrLywgdG9rZW46IFwidmFyaWFibGVcIn0sXG4gICAgICAgICAgICB7cmVnZXg6IFwiL1tnaW1dKjo/XCIsIHRva2VuOiBcInN0cmluZy5yZWdleFwiLCBuZXh0OiBcInN0YXJ0XCJ9LFxuICAgICAgICAgICAgLy8ge1wiZGVmYXVsdFwiOiBcInN0cmluZ1wifSxcbiAgICAgICAgICAgIHtcInRva2VuXCI6IFwic3RyaW5nXCIsIHJlZ2V4OlwiLlwifVxuICAgICAgICBdXG4gICAgfTtcbn07XG5vb3AuaW5oZXJpdHMoU25pcHBldEhpZ2hsaWdodFJ1bGVzLCBUZXh0SGlnaGxpZ2h0UnVsZXMpO1xuXG5leHBvcnRzLlNuaXBwZXRIaWdobGlnaHRSdWxlcyA9IFNuaXBwZXRIaWdobGlnaHRSdWxlcztcblxudmFyIFNuaXBwZXRHcm91cEhpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy4kcnVsZXMgPSB7XG4gICAgICAgIFwic3RhcnRcIiA6IFtcbiAgICAgICAgICAgIHt0b2tlbjogXCJ0ZXh0XCIsIHJlZ2V4OiBcIl5cXFxcdFwiLCBuZXh0OiBcInNuLXN0YXJ0XCJ9LFxuICAgICAgICAgICAge3Rva2VuOlwiaW52YWxpZFwiLCByZWdleDogL14gXFxzKi99LFxuICAgICAgICAgICAge3Rva2VuOlwiY29tbWVudFwiLCByZWdleDogL14jLiovfSxcbiAgICAgICAgICAgIHt0b2tlbjpcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLCByZWdleDogXCJecmVnZXggXCIsIG5leHQ6IFwicmVnZXhcIn0sXG4gICAgICAgICAgICB7dG9rZW46XCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIiwgcmVnZXg6IFwiXih0cmlnZ2VyfGVuZFRyaWdnZXJ8bmFtZXxzbmlwcGV0fGd1YXJkfGVuZEd1YXJkfHRhYlRyaWdnZXJ8a2V5KVxcXFxiXCJ9XG4gICAgICAgIF0sXG4gICAgICAgIFwicmVnZXhcIiA6IFtcbiAgICAgICAgICAgIHt0b2tlbjpcInRleHRcIiwgcmVnZXg6IFwiXFxcXC5cIn0sXG4gICAgICAgICAgICB7dG9rZW46XCJrZXl3b3JkXCIsIHJlZ2V4OiBcIi9cIn0sXG4gICAgICAgICAgICB7dG9rZW46XCJlbXB0eVwiLCByZWdleDogXCIkXCIsIG5leHQ6IFwic3RhcnRcIn1cbiAgICAgICAgXVxuICAgIH07XG4gICAgdGhpcy5lbWJlZFJ1bGVzKFNuaXBwZXRIaWdobGlnaHRSdWxlcywgXCJzbi1cIiwgW1xuICAgICAgICB7dG9rZW46IFwidGV4dFwiLCByZWdleDogXCJeXFxcXHRcIiwgbmV4dDogXCJzbi1zdGFydFwifSxcbiAgICAgICAge29uTWF0Y2g6IGZ1bmN0aW9uKHZhbHVlLCBzdGF0ZSwgc3RhY2spIHtcbiAgICAgICAgICAgIHN0YWNrLnNwbGljZShzdGFjay5sZW5ndGgpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9rZW5OYW1lO1xuICAgICAgICB9LCB0b2tlbk5hbWU6IFwidGV4dFwiLCByZWdleDogXCJeKD8hXFx0KVwiLCBuZXh0OiBcInN0YXJ0XCJ9XG4gICAgXSk7XG4gICAgXG59O1xuXG5vb3AuaW5oZXJpdHMoU25pcHBldEdyb3VwSGlnaGxpZ2h0UnVsZXMsIFRleHRIaWdobGlnaHRSdWxlcyk7XG5cbmV4cG9ydHMuU25pcHBldEdyb3VwSGlnaGxpZ2h0UnVsZXMgPSBTbmlwcGV0R3JvdXBIaWdobGlnaHRSdWxlcztcblxudmFyIEZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZGluZy9jb2ZmZWVcIikuRm9sZE1vZGU7XG5cbnZhciBNb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5IaWdobGlnaHRSdWxlcyA9IFNuaXBwZXRHcm91cEhpZ2hsaWdodFJ1bGVzO1xuICAgIHRoaXMuZm9sZGluZ1J1bGVzID0gbmV3IEZvbGRNb2RlKCk7XG4gICAgdGhpcy4kYmVoYXZpb3VyID0gdGhpcy4kZGVmYXVsdEJlaGF2aW91cjtcbn07XG5vb3AuaW5oZXJpdHMoTW9kZSwgVGV4dE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgdGhpcy4kaW5kZW50V2l0aFRhYnMgPSB0cnVlO1xuICAgIHRoaXMubGluZUNvbW1lbnRTdGFydCA9IFwiI1wiO1xuICAgIHRoaXMuJGlkID0gXCJhY2UvbW9kZS9zbmlwcGV0c1wiO1xuICAgIHRoaXMuc25pcHBldEZpbGVJZCA9IFwiYWNlL3NuaXBwZXRzL3NuaXBwZXRzXCI7XG59KS5jYWxsKE1vZGUucHJvdG90eXBlKTtcbmV4cG9ydHMuTW9kZSA9IE1vZGU7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=