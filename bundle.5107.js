"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[5107],{

/***/ 85107:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var lang = __webpack_require__(20124);

// based on http://www.freehackers.org/Indent_Finder
exports.$detectIndentation = function(lines, fallback) {
    var stats = [];
    var changes = [];
    var tabIndents = 0;
    var prevSpaces = 0;
    var max = Math.min(lines.length, 1000);
    for (var i = 0; i < max; i++) {
        var line = lines[i];
        // ignore empty and comment lines
        if (!/^\s*[^*+\-\s]/.test(line))
            continue;

        if (line[0] == "\t") {
            tabIndents++;
            prevSpaces = -Number.MAX_VALUE;
        } else {
            var spaces = line.match(/^ */)[0].length;
            if (spaces && line[spaces] != "\t") {
                var diff = spaces - prevSpaces;
                if (diff > 0 && !(prevSpaces%diff) && !(spaces%diff))
                    changes[diff] = (changes[diff] || 0) + 1;
    
                stats[spaces] = (stats[spaces] || 0) + 1;
            }
            prevSpaces = spaces;
        }
        // ignore lines ending with backslash
        while (i < max && line[line.length - 1] == "\\")
            line = lines[i++];
    }
    
    function getScore(indent) {
        var score = 0;
        for (var i = indent; i < stats.length; i += indent)
            score += stats[i] || 0;
        return score;
    }

    var changesTotal = changes.reduce(function(a,b){return a+b;}, 0);

    var first = {score: 0, length: 0};
    var spaceIndents = 0;
    for (var i = 1; i < 12; i++) {
        var score = getScore(i);
        if (i == 1) {
            spaceIndents = score;
            score = stats[1] ? 0.9 : 0.8;
            if (!stats.length)
                score = 0;
        } else
            score /= spaceIndents;

        if (changes[i])
            score += changes[i] / changesTotal;

        if (score > first.score)
            first = {score: score, length: i};
    }

    if (first.score && first.score > 1.4)
        var tabLength = first.length;

    if (tabIndents > spaceIndents + 1) {
        if (tabLength == 1 || spaceIndents < tabIndents / 4 || first.score < 1.8)
            tabLength = undefined;
        return {ch: "\t", length: tabLength};
    }
    if (spaceIndents > tabIndents + 1)
        return {ch: " ", length: tabLength};
};

exports.detectIndentation = function(session) {
    var lines = session.getLines(0, 1000);
    var indent = exports.$detectIndentation(lines) || {};

    if (indent.ch)
        session.setUseSoftTabs(indent.ch == " ");

    if (indent.length)
        session.setTabSize(indent.length);
    return indent;
};

/**
 * EditSession session
 * options.trimEmpty trim empty lines too
 * options.keepCursorPosition do not trim whitespace before the cursor
 */
exports.trimTrailingSpace = function(session, options) {
    var doc = session.getDocument();
    var lines = doc.getAllLines();
    
    var min = options && options.trimEmpty ? -1 : 0;
    var cursors = [], ci = -1;
    if (options && options.keepCursorPosition) {
        if (session.selection.rangeCount) {
            session.selection.rangeList.ranges.forEach(function(x, i, ranges) {
               var next = ranges[i + 1];
               if (next && next.cursor.row == x.cursor.row)
                  return;
              cursors.push(x.cursor);
            });
        } else {
            cursors.push(session.selection.getCursor());
        }
        ci = 0;
    }
    var cursorRow = cursors[ci] && cursors[ci].row;

    for (var i = 0, l=lines.length; i < l; i++) {
        var line = lines[i];
        var index = line.search(/\s+$/);

        if (i == cursorRow) {
            if (index < cursors[ci].column && index > min)
               index = cursors[ci].column;
            ci++;
            cursorRow = cursors[ci] ? cursors[ci].row : -1;
        }

        if (index > min)
            doc.removeInLine(i, index, line.length);
    }
};

exports.convertIndentation = function(session, ch, len) {
    var oldCh = session.getTabString()[0];
    var oldLen = session.getTabSize();
    if (!len) len = oldLen;
    if (!ch) ch = oldCh;

    var tab = ch == "\t" ? ch: lang.stringRepeat(ch, len);

    var doc = session.doc;
    var lines = doc.getAllLines();

    var cache = {};
    var spaceCache = {};
    for (var i = 0, l=lines.length; i < l; i++) {
        var line = lines[i];
        var match = line.match(/^\s*/)[0];
        if (match) {
            var w = session.$getStringScreenWidth(match)[0];
            var tabCount = Math.floor(w/oldLen);
            var reminder = w%oldLen;
            var toInsert = cache[tabCount] || (cache[tabCount] = lang.stringRepeat(tab, tabCount));
            toInsert += spaceCache[reminder] || (spaceCache[reminder] = lang.stringRepeat(" ", reminder));

            if (toInsert != match) {
                doc.removeInLine(i, 0, match.length);
                doc.insertInLine({row: i, column: 0}, toInsert);
            }
        }
    }
    session.setTabSize(len);
    session.setUseSoftTabs(ch == " ");
};

exports.$parseStringArg = function(text) {
    var indent = {};
    if (/t/.test(text))
        indent.ch = "\t";
    else if (/s/.test(text))
        indent.ch = " ";
    var m = text.match(/\d+/);
    if (m)
        indent.length = parseInt(m[0], 10);
    return indent;
};

exports.$parseArg = function(arg) {
    if (!arg)
        return {};
    if (typeof arg == "string")
        return exports.$parseStringArg(arg);
    if (typeof arg.text == "string")
        return exports.$parseStringArg(arg.text);
    return arg;
};

exports.commands = [{
    name: "detectIndentation",
    description: "Detect indentation from content",
    exec: function(editor) {
        exports.detectIndentation(editor.session);
        // todo show message?
    }
}, {
    name: "trimTrailingSpace",
    description: "Trim trailing whitespace",
    exec: function(editor, args) {
        exports.trimTrailingSpace(editor.session, args);
    }
}, {
    name: "convertIndentation",
    description: "Convert indentation to ...",
    exec: function(editor, arg) {
        var indent = exports.$parseArg(arg);
        exports.convertIndentation(editor.session, indent.ch, indent.length);
    }
}, {
    name: "setIndentation",
    description: "Set indentation",
    exec: function(editor, arg) {
        var indent = exports.$parseArg(arg);
        indent.length && editor.session.setTabSize(indent.length);
        indent.ch && editor.session.setUseSoftTabs(indent.ch == " ");
    }
}];


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjUxMDcuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsV0FBVyxtQkFBTyxDQUFDLEtBQWE7O0FBRWhDO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsU0FBUztBQUM3QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixrQkFBa0I7QUFDL0M7QUFDQTtBQUNBOztBQUVBLG9EQUFvRCxZQUFZOztBQUVoRSxpQkFBaUI7QUFDakI7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHFCQUFxQjtBQUNyQjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCOztBQUVBLHlCQUF5QjtBQUN6QjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0NBQW9DLE9BQU87QUFDM0M7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG9DQUFvQyxPQUFPO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtDQUFrQyxrQkFBa0I7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL2V4dC93aGl0ZXNwYWNlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbGFuZyA9IHJlcXVpcmUoXCIuLi9saWIvbGFuZ1wiKTtcblxuLy8gYmFzZWQgb24gaHR0cDovL3d3dy5mcmVlaGFja2Vycy5vcmcvSW5kZW50X0ZpbmRlclxuZXhwb3J0cy4kZGV0ZWN0SW5kZW50YXRpb24gPSBmdW5jdGlvbihsaW5lcywgZmFsbGJhY2spIHtcbiAgICB2YXIgc3RhdHMgPSBbXTtcbiAgICB2YXIgY2hhbmdlcyA9IFtdO1xuICAgIHZhciB0YWJJbmRlbnRzID0gMDtcbiAgICB2YXIgcHJldlNwYWNlcyA9IDA7XG4gICAgdmFyIG1heCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgMTAwMCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtYXg7IGkrKykge1xuICAgICAgICB2YXIgbGluZSA9IGxpbmVzW2ldO1xuICAgICAgICAvLyBpZ25vcmUgZW1wdHkgYW5kIGNvbW1lbnQgbGluZXNcbiAgICAgICAgaWYgKCEvXlxccypbXiorXFwtXFxzXS8udGVzdChsaW5lKSlcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgIGlmIChsaW5lWzBdID09IFwiXFx0XCIpIHtcbiAgICAgICAgICAgIHRhYkluZGVudHMrKztcbiAgICAgICAgICAgIHByZXZTcGFjZXMgPSAtTnVtYmVyLk1BWF9WQUxVRTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBzcGFjZXMgPSBsaW5lLm1hdGNoKC9eICovKVswXS5sZW5ndGg7XG4gICAgICAgICAgICBpZiAoc3BhY2VzICYmIGxpbmVbc3BhY2VzXSAhPSBcIlxcdFwiKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRpZmYgPSBzcGFjZXMgLSBwcmV2U3BhY2VzO1xuICAgICAgICAgICAgICAgIGlmIChkaWZmID4gMCAmJiAhKHByZXZTcGFjZXMlZGlmZikgJiYgIShzcGFjZXMlZGlmZikpXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZXNbZGlmZl0gPSAoY2hhbmdlc1tkaWZmXSB8fCAwKSArIDE7XG4gICAgXG4gICAgICAgICAgICAgICAgc3RhdHNbc3BhY2VzXSA9IChzdGF0c1tzcGFjZXNdIHx8IDApICsgMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByZXZTcGFjZXMgPSBzcGFjZXM7XG4gICAgICAgIH1cbiAgICAgICAgLy8gaWdub3JlIGxpbmVzIGVuZGluZyB3aXRoIGJhY2tzbGFzaFxuICAgICAgICB3aGlsZSAoaSA8IG1heCAmJiBsaW5lW2xpbmUubGVuZ3RoIC0gMV0gPT0gXCJcXFxcXCIpXG4gICAgICAgICAgICBsaW5lID0gbGluZXNbaSsrXTtcbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gZ2V0U2NvcmUoaW5kZW50KSB7XG4gICAgICAgIHZhciBzY29yZSA9IDA7XG4gICAgICAgIGZvciAodmFyIGkgPSBpbmRlbnQ7IGkgPCBzdGF0cy5sZW5ndGg7IGkgKz0gaW5kZW50KVxuICAgICAgICAgICAgc2NvcmUgKz0gc3RhdHNbaV0gfHwgMDtcbiAgICAgICAgcmV0dXJuIHNjb3JlO1xuICAgIH1cblxuICAgIHZhciBjaGFuZ2VzVG90YWwgPSBjaGFuZ2VzLnJlZHVjZShmdW5jdGlvbihhLGIpe3JldHVybiBhK2I7fSwgMCk7XG5cbiAgICB2YXIgZmlyc3QgPSB7c2NvcmU6IDAsIGxlbmd0aDogMH07XG4gICAgdmFyIHNwYWNlSW5kZW50cyA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCAxMjsgaSsrKSB7XG4gICAgICAgIHZhciBzY29yZSA9IGdldFNjb3JlKGkpO1xuICAgICAgICBpZiAoaSA9PSAxKSB7XG4gICAgICAgICAgICBzcGFjZUluZGVudHMgPSBzY29yZTtcbiAgICAgICAgICAgIHNjb3JlID0gc3RhdHNbMV0gPyAwLjkgOiAwLjg7XG4gICAgICAgICAgICBpZiAoIXN0YXRzLmxlbmd0aClcbiAgICAgICAgICAgICAgICBzY29yZSA9IDA7XG4gICAgICAgIH0gZWxzZVxuICAgICAgICAgICAgc2NvcmUgLz0gc3BhY2VJbmRlbnRzO1xuXG4gICAgICAgIGlmIChjaGFuZ2VzW2ldKVxuICAgICAgICAgICAgc2NvcmUgKz0gY2hhbmdlc1tpXSAvIGNoYW5nZXNUb3RhbDtcblxuICAgICAgICBpZiAoc2NvcmUgPiBmaXJzdC5zY29yZSlcbiAgICAgICAgICAgIGZpcnN0ID0ge3Njb3JlOiBzY29yZSwgbGVuZ3RoOiBpfTtcbiAgICB9XG5cbiAgICBpZiAoZmlyc3Quc2NvcmUgJiYgZmlyc3Quc2NvcmUgPiAxLjQpXG4gICAgICAgIHZhciB0YWJMZW5ndGggPSBmaXJzdC5sZW5ndGg7XG5cbiAgICBpZiAodGFiSW5kZW50cyA+IHNwYWNlSW5kZW50cyArIDEpIHtcbiAgICAgICAgaWYgKHRhYkxlbmd0aCA9PSAxIHx8IHNwYWNlSW5kZW50cyA8IHRhYkluZGVudHMgLyA0IHx8IGZpcnN0LnNjb3JlIDwgMS44KVxuICAgICAgICAgICAgdGFiTGVuZ3RoID0gdW5kZWZpbmVkO1xuICAgICAgICByZXR1cm4ge2NoOiBcIlxcdFwiLCBsZW5ndGg6IHRhYkxlbmd0aH07XG4gICAgfVxuICAgIGlmIChzcGFjZUluZGVudHMgPiB0YWJJbmRlbnRzICsgMSlcbiAgICAgICAgcmV0dXJuIHtjaDogXCIgXCIsIGxlbmd0aDogdGFiTGVuZ3RofTtcbn07XG5cbmV4cG9ydHMuZGV0ZWN0SW5kZW50YXRpb24gPSBmdW5jdGlvbihzZXNzaW9uKSB7XG4gICAgdmFyIGxpbmVzID0gc2Vzc2lvbi5nZXRMaW5lcygwLCAxMDAwKTtcbiAgICB2YXIgaW5kZW50ID0gZXhwb3J0cy4kZGV0ZWN0SW5kZW50YXRpb24obGluZXMpIHx8IHt9O1xuXG4gICAgaWYgKGluZGVudC5jaClcbiAgICAgICAgc2Vzc2lvbi5zZXRVc2VTb2Z0VGFicyhpbmRlbnQuY2ggPT0gXCIgXCIpO1xuXG4gICAgaWYgKGluZGVudC5sZW5ndGgpXG4gICAgICAgIHNlc3Npb24uc2V0VGFiU2l6ZShpbmRlbnQubGVuZ3RoKTtcbiAgICByZXR1cm4gaW5kZW50O1xufTtcblxuLyoqXG4gKiBFZGl0U2Vzc2lvbiBzZXNzaW9uXG4gKiBvcHRpb25zLnRyaW1FbXB0eSB0cmltIGVtcHR5IGxpbmVzIHRvb1xuICogb3B0aW9ucy5rZWVwQ3Vyc29yUG9zaXRpb24gZG8gbm90IHRyaW0gd2hpdGVzcGFjZSBiZWZvcmUgdGhlIGN1cnNvclxuICovXG5leHBvcnRzLnRyaW1UcmFpbGluZ1NwYWNlID0gZnVuY3Rpb24oc2Vzc2lvbiwgb3B0aW9ucykge1xuICAgIHZhciBkb2MgPSBzZXNzaW9uLmdldERvY3VtZW50KCk7XG4gICAgdmFyIGxpbmVzID0gZG9jLmdldEFsbExpbmVzKCk7XG4gICAgXG4gICAgdmFyIG1pbiA9IG9wdGlvbnMgJiYgb3B0aW9ucy50cmltRW1wdHkgPyAtMSA6IDA7XG4gICAgdmFyIGN1cnNvcnMgPSBbXSwgY2kgPSAtMTtcbiAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLmtlZXBDdXJzb3JQb3NpdGlvbikge1xuICAgICAgICBpZiAoc2Vzc2lvbi5zZWxlY3Rpb24ucmFuZ2VDb3VudCkge1xuICAgICAgICAgICAgc2Vzc2lvbi5zZWxlY3Rpb24ucmFuZ2VMaXN0LnJhbmdlcy5mb3JFYWNoKGZ1bmN0aW9uKHgsIGksIHJhbmdlcykge1xuICAgICAgICAgICAgICAgdmFyIG5leHQgPSByYW5nZXNbaSArIDFdO1xuICAgICAgICAgICAgICAgaWYgKG5leHQgJiYgbmV4dC5jdXJzb3Iucm93ID09IHguY3Vyc29yLnJvdylcbiAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgY3Vyc29ycy5wdXNoKHguY3Vyc29yKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY3Vyc29ycy5wdXNoKHNlc3Npb24uc2VsZWN0aW9uLmdldEN1cnNvcigpKTtcbiAgICAgICAgfVxuICAgICAgICBjaSA9IDA7XG4gICAgfVxuICAgIHZhciBjdXJzb3JSb3cgPSBjdXJzb3JzW2NpXSAmJiBjdXJzb3JzW2NpXS5yb3c7XG5cbiAgICBmb3IgKHZhciBpID0gMCwgbD1saW5lcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgdmFyIGxpbmUgPSBsaW5lc1tpXTtcbiAgICAgICAgdmFyIGluZGV4ID0gbGluZS5zZWFyY2goL1xccyskLyk7XG5cbiAgICAgICAgaWYgKGkgPT0gY3Vyc29yUm93KSB7XG4gICAgICAgICAgICBpZiAoaW5kZXggPCBjdXJzb3JzW2NpXS5jb2x1bW4gJiYgaW5kZXggPiBtaW4pXG4gICAgICAgICAgICAgICBpbmRleCA9IGN1cnNvcnNbY2ldLmNvbHVtbjtcbiAgICAgICAgICAgIGNpKys7XG4gICAgICAgICAgICBjdXJzb3JSb3cgPSBjdXJzb3JzW2NpXSA/IGN1cnNvcnNbY2ldLnJvdyA6IC0xO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGluZGV4ID4gbWluKVxuICAgICAgICAgICAgZG9jLnJlbW92ZUluTGluZShpLCBpbmRleCwgbGluZS5sZW5ndGgpO1xuICAgIH1cbn07XG5cbmV4cG9ydHMuY29udmVydEluZGVudGF0aW9uID0gZnVuY3Rpb24oc2Vzc2lvbiwgY2gsIGxlbikge1xuICAgIHZhciBvbGRDaCA9IHNlc3Npb24uZ2V0VGFiU3RyaW5nKClbMF07XG4gICAgdmFyIG9sZExlbiA9IHNlc3Npb24uZ2V0VGFiU2l6ZSgpO1xuICAgIGlmICghbGVuKSBsZW4gPSBvbGRMZW47XG4gICAgaWYgKCFjaCkgY2ggPSBvbGRDaDtcblxuICAgIHZhciB0YWIgPSBjaCA9PSBcIlxcdFwiID8gY2g6IGxhbmcuc3RyaW5nUmVwZWF0KGNoLCBsZW4pO1xuXG4gICAgdmFyIGRvYyA9IHNlc3Npb24uZG9jO1xuICAgIHZhciBsaW5lcyA9IGRvYy5nZXRBbGxMaW5lcygpO1xuXG4gICAgdmFyIGNhY2hlID0ge307XG4gICAgdmFyIHNwYWNlQ2FjaGUgPSB7fTtcbiAgICBmb3IgKHZhciBpID0gMCwgbD1saW5lcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgdmFyIGxpbmUgPSBsaW5lc1tpXTtcbiAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCgvXlxccyovKVswXTtcbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICB2YXIgdyA9IHNlc3Npb24uJGdldFN0cmluZ1NjcmVlbldpZHRoKG1hdGNoKVswXTtcbiAgICAgICAgICAgIHZhciB0YWJDb3VudCA9IE1hdGguZmxvb3Iody9vbGRMZW4pO1xuICAgICAgICAgICAgdmFyIHJlbWluZGVyID0gdyVvbGRMZW47XG4gICAgICAgICAgICB2YXIgdG9JbnNlcnQgPSBjYWNoZVt0YWJDb3VudF0gfHwgKGNhY2hlW3RhYkNvdW50XSA9IGxhbmcuc3RyaW5nUmVwZWF0KHRhYiwgdGFiQ291bnQpKTtcbiAgICAgICAgICAgIHRvSW5zZXJ0ICs9IHNwYWNlQ2FjaGVbcmVtaW5kZXJdIHx8IChzcGFjZUNhY2hlW3JlbWluZGVyXSA9IGxhbmcuc3RyaW5nUmVwZWF0KFwiIFwiLCByZW1pbmRlcikpO1xuXG4gICAgICAgICAgICBpZiAodG9JbnNlcnQgIT0gbWF0Y2gpIHtcbiAgICAgICAgICAgICAgICBkb2MucmVtb3ZlSW5MaW5lKGksIDAsIG1hdGNoLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgZG9jLmluc2VydEluTGluZSh7cm93OiBpLCBjb2x1bW46IDB9LCB0b0luc2VydCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2Vzc2lvbi5zZXRUYWJTaXplKGxlbik7XG4gICAgc2Vzc2lvbi5zZXRVc2VTb2Z0VGFicyhjaCA9PSBcIiBcIik7XG59O1xuXG5leHBvcnRzLiRwYXJzZVN0cmluZ0FyZyA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgICB2YXIgaW5kZW50ID0ge307XG4gICAgaWYgKC90Ly50ZXN0KHRleHQpKVxuICAgICAgICBpbmRlbnQuY2ggPSBcIlxcdFwiO1xuICAgIGVsc2UgaWYgKC9zLy50ZXN0KHRleHQpKVxuICAgICAgICBpbmRlbnQuY2ggPSBcIiBcIjtcbiAgICB2YXIgbSA9IHRleHQubWF0Y2goL1xcZCsvKTtcbiAgICBpZiAobSlcbiAgICAgICAgaW5kZW50Lmxlbmd0aCA9IHBhcnNlSW50KG1bMF0sIDEwKTtcbiAgICByZXR1cm4gaW5kZW50O1xufTtcblxuZXhwb3J0cy4kcGFyc2VBcmcgPSBmdW5jdGlvbihhcmcpIHtcbiAgICBpZiAoIWFyZylcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgIGlmICh0eXBlb2YgYXJnID09IFwic3RyaW5nXCIpXG4gICAgICAgIHJldHVybiBleHBvcnRzLiRwYXJzZVN0cmluZ0FyZyhhcmcpO1xuICAgIGlmICh0eXBlb2YgYXJnLnRleHQgPT0gXCJzdHJpbmdcIilcbiAgICAgICAgcmV0dXJuIGV4cG9ydHMuJHBhcnNlU3RyaW5nQXJnKGFyZy50ZXh0KTtcbiAgICByZXR1cm4gYXJnO1xufTtcblxuZXhwb3J0cy5jb21tYW5kcyA9IFt7XG4gICAgbmFtZTogXCJkZXRlY3RJbmRlbnRhdGlvblwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkRldGVjdCBpbmRlbnRhdGlvbiBmcm9tIGNvbnRlbnRcIixcbiAgICBleGVjOiBmdW5jdGlvbihlZGl0b3IpIHtcbiAgICAgICAgZXhwb3J0cy5kZXRlY3RJbmRlbnRhdGlvbihlZGl0b3Iuc2Vzc2lvbik7XG4gICAgICAgIC8vIHRvZG8gc2hvdyBtZXNzYWdlP1xuICAgIH1cbn0sIHtcbiAgICBuYW1lOiBcInRyaW1UcmFpbGluZ1NwYWNlXCIsXG4gICAgZGVzY3JpcHRpb246IFwiVHJpbSB0cmFpbGluZyB3aGl0ZXNwYWNlXCIsXG4gICAgZXhlYzogZnVuY3Rpb24oZWRpdG9yLCBhcmdzKSB7XG4gICAgICAgIGV4cG9ydHMudHJpbVRyYWlsaW5nU3BhY2UoZWRpdG9yLnNlc3Npb24sIGFyZ3MpO1xuICAgIH1cbn0sIHtcbiAgICBuYW1lOiBcImNvbnZlcnRJbmRlbnRhdGlvblwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkNvbnZlcnQgaW5kZW50YXRpb24gdG8gLi4uXCIsXG4gICAgZXhlYzogZnVuY3Rpb24oZWRpdG9yLCBhcmcpIHtcbiAgICAgICAgdmFyIGluZGVudCA9IGV4cG9ydHMuJHBhcnNlQXJnKGFyZyk7XG4gICAgICAgIGV4cG9ydHMuY29udmVydEluZGVudGF0aW9uKGVkaXRvci5zZXNzaW9uLCBpbmRlbnQuY2gsIGluZGVudC5sZW5ndGgpO1xuICAgIH1cbn0sIHtcbiAgICBuYW1lOiBcInNldEluZGVudGF0aW9uXCIsXG4gICAgZGVzY3JpcHRpb246IFwiU2V0IGluZGVudGF0aW9uXCIsXG4gICAgZXhlYzogZnVuY3Rpb24oZWRpdG9yLCBhcmcpIHtcbiAgICAgICAgdmFyIGluZGVudCA9IGV4cG9ydHMuJHBhcnNlQXJnKGFyZyk7XG4gICAgICAgIGluZGVudC5sZW5ndGggJiYgZWRpdG9yLnNlc3Npb24uc2V0VGFiU2l6ZShpbmRlbnQubGVuZ3RoKTtcbiAgICAgICAgaW5kZW50LmNoICYmIGVkaXRvci5zZXNzaW9uLnNldFVzZVNvZnRUYWJzKGluZGVudC5jaCA9PSBcIiBcIik7XG4gICAgfVxufV07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=