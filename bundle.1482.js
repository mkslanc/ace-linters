"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[1482],{

/***/ 21482:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



/**
 *
 * @typedef {import("../edit_session").EditSession} EditSession
 */

var lang = __webpack_require__(39955);

// based on http://www.freehackers.org/Indent_Finder
/**
 * 
 * @param {string[]} lines
 * @param [fallback]
 * @returns {{ch?: string, length?: number}}
 */
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

/**
 * @param {EditSession} session
 * @returns {{ch?: string, length?: number}|{}}
 */
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
 * @param {EditSession} session
 * @param {Object} options
 * @param {boolean} [options.trimEmpty] trim empty lines too
 * @param {boolean} [options.keepCursorPosition] do not trim whitespace before the cursor
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

/**
 * @param {EditSession} session
 * @param {string} ch
 * @param {number} len
 */
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

/**
 * 
 * @param {string} text
 * @returns {{}}
 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjE0ODIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWI7QUFDQTtBQUNBLGFBQWEsdUNBQXVDO0FBQ3BEOztBQUVBLFdBQVcsbUJBQU8sQ0FBQyxLQUFhOztBQUVoQztBQUNBO0FBQ0E7QUFDQSxXQUFXLFVBQVU7QUFDckI7QUFDQSxjQUFjO0FBQ2Q7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixTQUFTO0FBQzdCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLGtCQUFrQjtBQUMvQztBQUNBO0FBQ0E7O0FBRUEsb0RBQW9ELFlBQVk7O0FBRWhFLGlCQUFpQjtBQUNqQjtBQUNBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjs7QUFFQTtBQUNBOztBQUVBO0FBQ0EscUJBQXFCO0FBQ3JCOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7O0FBRUE7QUFDQSxXQUFXLGFBQWE7QUFDeEIsY0FBYyw2QkFBNkI7QUFDM0M7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsV0FBVyxhQUFhO0FBQ3hCLFdBQVcsUUFBUTtBQUNuQixXQUFXLFNBQVM7QUFDcEIsV0FBVyxTQUFTO0FBQ3BCO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxvQ0FBb0MsT0FBTztBQUMzQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFdBQVcsYUFBYTtBQUN4QixXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG9DQUFvQyxPQUFPO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtDQUFrQyxrQkFBa0I7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkI7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL2V4dC93aGl0ZXNwYWNlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG4vKipcbiAqXG4gKiBAdHlwZWRlZiB7aW1wb3J0KFwiLi4vZWRpdF9zZXNzaW9uXCIpLkVkaXRTZXNzaW9ufSBFZGl0U2Vzc2lvblxuICovXG5cbnZhciBsYW5nID0gcmVxdWlyZShcIi4uL2xpYi9sYW5nXCIpO1xuXG4vLyBiYXNlZCBvbiBodHRwOi8vd3d3LmZyZWVoYWNrZXJzLm9yZy9JbmRlbnRfRmluZGVyXG4vKipcbiAqIFxuICogQHBhcmFtIHtzdHJpbmdbXX0gbGluZXNcbiAqIEBwYXJhbSBbZmFsbGJhY2tdXG4gKiBAcmV0dXJucyB7e2NoPzogc3RyaW5nLCBsZW5ndGg/OiBudW1iZXJ9fVxuICovXG5leHBvcnRzLiRkZXRlY3RJbmRlbnRhdGlvbiA9IGZ1bmN0aW9uKGxpbmVzLCBmYWxsYmFjaykge1xuICAgIHZhciBzdGF0cyA9IFtdO1xuICAgIHZhciBjaGFuZ2VzID0gW107XG4gICAgdmFyIHRhYkluZGVudHMgPSAwO1xuICAgIHZhciBwcmV2U3BhY2VzID0gMDtcbiAgICB2YXIgbWF4ID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCAxMDAwKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1heDsgaSsrKSB7XG4gICAgICAgIHZhciBsaW5lID0gbGluZXNbaV07XG4gICAgICAgIC8vIGlnbm9yZSBlbXB0eSBhbmQgY29tbWVudCBsaW5lc1xuICAgICAgICBpZiAoIS9eXFxzKlteKitcXC1cXHNdLy50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgaWYgKGxpbmVbMF0gPT0gXCJcXHRcIikge1xuICAgICAgICAgICAgdGFiSW5kZW50cysrO1xuICAgICAgICAgICAgcHJldlNwYWNlcyA9IC1OdW1iZXIuTUFYX1ZBTFVFO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIHNwYWNlcyA9IGxpbmUubWF0Y2goL14gKi8pWzBdLmxlbmd0aDtcbiAgICAgICAgICAgIGlmIChzcGFjZXMgJiYgbGluZVtzcGFjZXNdICE9IFwiXFx0XCIpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGlmZiA9IHNwYWNlcyAtIHByZXZTcGFjZXM7XG4gICAgICAgICAgICAgICAgaWYgKGRpZmYgPiAwICYmICEocHJldlNwYWNlcyVkaWZmKSAmJiAhKHNwYWNlcyVkaWZmKSlcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlc1tkaWZmXSA9IChjaGFuZ2VzW2RpZmZdIHx8IDApICsgMTtcbiAgICBcbiAgICAgICAgICAgICAgICBzdGF0c1tzcGFjZXNdID0gKHN0YXRzW3NwYWNlc10gfHwgMCkgKyAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJldlNwYWNlcyA9IHNwYWNlcztcbiAgICAgICAgfVxuICAgICAgICAvLyBpZ25vcmUgbGluZXMgZW5kaW5nIHdpdGggYmFja3NsYXNoXG4gICAgICAgIHdoaWxlIChpIDwgbWF4ICYmIGxpbmVbbGluZS5sZW5ndGggLSAxXSA9PSBcIlxcXFxcIilcbiAgICAgICAgICAgIGxpbmUgPSBsaW5lc1tpKytdO1xuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiBnZXRTY29yZShpbmRlbnQpIHtcbiAgICAgICAgdmFyIHNjb3JlID0gMDtcbiAgICAgICAgZm9yICh2YXIgaSA9IGluZGVudDsgaSA8IHN0YXRzLmxlbmd0aDsgaSArPSBpbmRlbnQpXG4gICAgICAgICAgICBzY29yZSArPSBzdGF0c1tpXSB8fCAwO1xuICAgICAgICByZXR1cm4gc2NvcmU7XG4gICAgfVxuXG4gICAgdmFyIGNoYW5nZXNUb3RhbCA9IGNoYW5nZXMucmVkdWNlKGZ1bmN0aW9uKGEsYil7cmV0dXJuIGErYjt9LCAwKTtcblxuICAgIHZhciBmaXJzdCA9IHtzY29yZTogMCwgbGVuZ3RoOiAwfTtcbiAgICB2YXIgc3BhY2VJbmRlbnRzID0gMDtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IDEyOyBpKyspIHtcbiAgICAgICAgdmFyIHNjb3JlID0gZ2V0U2NvcmUoaSk7XG4gICAgICAgIGlmIChpID09IDEpIHtcbiAgICAgICAgICAgIHNwYWNlSW5kZW50cyA9IHNjb3JlO1xuICAgICAgICAgICAgc2NvcmUgPSBzdGF0c1sxXSA/IDAuOSA6IDAuODtcbiAgICAgICAgICAgIGlmICghc3RhdHMubGVuZ3RoKVxuICAgICAgICAgICAgICAgIHNjb3JlID0gMDtcbiAgICAgICAgfSBlbHNlXG4gICAgICAgICAgICBzY29yZSAvPSBzcGFjZUluZGVudHM7XG5cbiAgICAgICAgaWYgKGNoYW5nZXNbaV0pXG4gICAgICAgICAgICBzY29yZSArPSBjaGFuZ2VzW2ldIC8gY2hhbmdlc1RvdGFsO1xuXG4gICAgICAgIGlmIChzY29yZSA+IGZpcnN0LnNjb3JlKVxuICAgICAgICAgICAgZmlyc3QgPSB7c2NvcmU6IHNjb3JlLCBsZW5ndGg6IGl9O1xuICAgIH1cblxuICAgIGlmIChmaXJzdC5zY29yZSAmJiBmaXJzdC5zY29yZSA+IDEuNClcbiAgICAgICAgdmFyIHRhYkxlbmd0aCA9IGZpcnN0Lmxlbmd0aDtcblxuICAgIGlmICh0YWJJbmRlbnRzID4gc3BhY2VJbmRlbnRzICsgMSkge1xuICAgICAgICBpZiAodGFiTGVuZ3RoID09IDEgfHwgc3BhY2VJbmRlbnRzIDwgdGFiSW5kZW50cyAvIDQgfHwgZmlyc3Quc2NvcmUgPCAxLjgpXG4gICAgICAgICAgICB0YWJMZW5ndGggPSB1bmRlZmluZWQ7XG4gICAgICAgIHJldHVybiB7Y2g6IFwiXFx0XCIsIGxlbmd0aDogdGFiTGVuZ3RofTtcbiAgICB9XG4gICAgaWYgKHNwYWNlSW5kZW50cyA+IHRhYkluZGVudHMgKyAxKVxuICAgICAgICByZXR1cm4ge2NoOiBcIiBcIiwgbGVuZ3RoOiB0YWJMZW5ndGh9O1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge0VkaXRTZXNzaW9ufSBzZXNzaW9uXG4gKiBAcmV0dXJucyB7e2NoPzogc3RyaW5nLCBsZW5ndGg/OiBudW1iZXJ9fHt9fVxuICovXG5leHBvcnRzLmRldGVjdEluZGVudGF0aW9uID0gZnVuY3Rpb24oc2Vzc2lvbikge1xuICAgIHZhciBsaW5lcyA9IHNlc3Npb24uZ2V0TGluZXMoMCwgMTAwMCk7XG4gICAgdmFyIGluZGVudCA9IGV4cG9ydHMuJGRldGVjdEluZGVudGF0aW9uKGxpbmVzKSB8fCB7fTtcblxuICAgIGlmIChpbmRlbnQuY2gpXG4gICAgICAgIHNlc3Npb24uc2V0VXNlU29mdFRhYnMoaW5kZW50LmNoID09IFwiIFwiKTtcblxuICAgIGlmIChpbmRlbnQubGVuZ3RoKVxuICAgICAgICBzZXNzaW9uLnNldFRhYlNpemUoaW5kZW50Lmxlbmd0aCk7XG4gICAgcmV0dXJuIGluZGVudDtcbn07XG5cbi8qKlxuICogQHBhcmFtIHtFZGl0U2Vzc2lvbn0gc2Vzc2lvblxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMudHJpbUVtcHR5XSB0cmltIGVtcHR5IGxpbmVzIHRvb1xuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5rZWVwQ3Vyc29yUG9zaXRpb25dIGRvIG5vdCB0cmltIHdoaXRlc3BhY2UgYmVmb3JlIHRoZSBjdXJzb3JcbiAqL1xuZXhwb3J0cy50cmltVHJhaWxpbmdTcGFjZSA9IGZ1bmN0aW9uKHNlc3Npb24sIG9wdGlvbnMpIHtcbiAgICB2YXIgZG9jID0gc2Vzc2lvbi5nZXREb2N1bWVudCgpO1xuICAgIHZhciBsaW5lcyA9IGRvYy5nZXRBbGxMaW5lcygpO1xuICAgIFxuICAgIHZhciBtaW4gPSBvcHRpb25zICYmIG9wdGlvbnMudHJpbUVtcHR5ID8gLTEgOiAwO1xuICAgIHZhciBjdXJzb3JzID0gW10sIGNpID0gLTE7XG4gICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5rZWVwQ3Vyc29yUG9zaXRpb24pIHtcbiAgICAgICAgaWYgKHNlc3Npb24uc2VsZWN0aW9uLnJhbmdlQ291bnQpIHtcbiAgICAgICAgICAgIHNlc3Npb24uc2VsZWN0aW9uLnJhbmdlTGlzdC5yYW5nZXMuZm9yRWFjaChmdW5jdGlvbih4LCBpLCByYW5nZXMpIHtcbiAgICAgICAgICAgICAgIHZhciBuZXh0ID0gcmFuZ2VzW2kgKyAxXTtcbiAgICAgICAgICAgICAgIGlmIChuZXh0ICYmIG5leHQuY3Vyc29yLnJvdyA9PSB4LmN1cnNvci5yb3cpXG4gICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIGN1cnNvcnMucHVzaCh4LmN1cnNvcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGN1cnNvcnMucHVzaChzZXNzaW9uLnNlbGVjdGlvbi5nZXRDdXJzb3IoKSk7XG4gICAgICAgIH1cbiAgICAgICAgY2kgPSAwO1xuICAgIH1cbiAgICB2YXIgY3Vyc29yUm93ID0gY3Vyc29yc1tjaV0gJiYgY3Vyc29yc1tjaV0ucm93O1xuXG4gICAgZm9yICh2YXIgaSA9IDAsIGw9bGluZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIHZhciBsaW5lID0gbGluZXNbaV07XG4gICAgICAgIHZhciBpbmRleCA9IGxpbmUuc2VhcmNoKC9cXHMrJC8pO1xuXG4gICAgICAgIGlmIChpID09IGN1cnNvclJvdykge1xuICAgICAgICAgICAgaWYgKGluZGV4IDwgY3Vyc29yc1tjaV0uY29sdW1uICYmIGluZGV4ID4gbWluKVxuICAgICAgICAgICAgICAgaW5kZXggPSBjdXJzb3JzW2NpXS5jb2x1bW47XG4gICAgICAgICAgICBjaSsrO1xuICAgICAgICAgICAgY3Vyc29yUm93ID0gY3Vyc29yc1tjaV0gPyBjdXJzb3JzW2NpXS5yb3cgOiAtMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpbmRleCA+IG1pbilcbiAgICAgICAgICAgIGRvYy5yZW1vdmVJbkxpbmUoaSwgaW5kZXgsIGxpbmUubGVuZ3RoKTtcbiAgICB9XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7RWRpdFNlc3Npb259IHNlc3Npb25cbiAqIEBwYXJhbSB7c3RyaW5nfSBjaFxuICogQHBhcmFtIHtudW1iZXJ9IGxlblxuICovXG5leHBvcnRzLmNvbnZlcnRJbmRlbnRhdGlvbiA9IGZ1bmN0aW9uKHNlc3Npb24sIGNoLCBsZW4pIHtcbiAgICB2YXIgb2xkQ2ggPSBzZXNzaW9uLmdldFRhYlN0cmluZygpWzBdO1xuICAgIHZhciBvbGRMZW4gPSBzZXNzaW9uLmdldFRhYlNpemUoKTtcbiAgICBpZiAoIWxlbikgbGVuID0gb2xkTGVuO1xuICAgIGlmICghY2gpIGNoID0gb2xkQ2g7XG5cbiAgICB2YXIgdGFiID0gY2ggPT0gXCJcXHRcIiA/IGNoOiBsYW5nLnN0cmluZ1JlcGVhdChjaCwgbGVuKTtcblxuICAgIHZhciBkb2MgPSBzZXNzaW9uLmRvYztcbiAgICB2YXIgbGluZXMgPSBkb2MuZ2V0QWxsTGluZXMoKTtcblxuICAgIHZhciBjYWNoZSA9IHt9O1xuICAgIHZhciBzcGFjZUNhY2hlID0ge307XG4gICAgZm9yICh2YXIgaSA9IDAsIGw9bGluZXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIHZhciBsaW5lID0gbGluZXNbaV07XG4gICAgICAgIHZhciBtYXRjaCA9IGxpbmUubWF0Y2goL15cXHMqLylbMF07XG4gICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgdmFyIHcgPSBzZXNzaW9uLiRnZXRTdHJpbmdTY3JlZW5XaWR0aChtYXRjaClbMF07XG4gICAgICAgICAgICB2YXIgdGFiQ291bnQgPSBNYXRoLmZsb29yKHcvb2xkTGVuKTtcbiAgICAgICAgICAgIHZhciByZW1pbmRlciA9IHclb2xkTGVuO1xuICAgICAgICAgICAgdmFyIHRvSW5zZXJ0ID0gY2FjaGVbdGFiQ291bnRdIHx8IChjYWNoZVt0YWJDb3VudF0gPSBsYW5nLnN0cmluZ1JlcGVhdCh0YWIsIHRhYkNvdW50KSk7XG4gICAgICAgICAgICB0b0luc2VydCArPSBzcGFjZUNhY2hlW3JlbWluZGVyXSB8fCAoc3BhY2VDYWNoZVtyZW1pbmRlcl0gPSBsYW5nLnN0cmluZ1JlcGVhdChcIiBcIiwgcmVtaW5kZXIpKTtcblxuICAgICAgICAgICAgaWYgKHRvSW5zZXJ0ICE9IG1hdGNoKSB7XG4gICAgICAgICAgICAgICAgZG9jLnJlbW92ZUluTGluZShpLCAwLCBtYXRjaC5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIGRvYy5pbnNlcnRJbkxpbmUoe3JvdzogaSwgY29sdW1uOiAwfSwgdG9JbnNlcnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHNlc3Npb24uc2V0VGFiU2l6ZShsZW4pO1xuICAgIHNlc3Npb24uc2V0VXNlU29mdFRhYnMoY2ggPT0gXCIgXCIpO1xufTtcblxuLyoqXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0XG4gKiBAcmV0dXJucyB7e319XG4gKi9cbmV4cG9ydHMuJHBhcnNlU3RyaW5nQXJnID0gZnVuY3Rpb24odGV4dCkge1xuICAgIHZhciBpbmRlbnQgPSB7fTtcbiAgICBpZiAoL3QvLnRlc3QodGV4dCkpXG4gICAgICAgIGluZGVudC5jaCA9IFwiXFx0XCI7XG4gICAgZWxzZSBpZiAoL3MvLnRlc3QodGV4dCkpXG4gICAgICAgIGluZGVudC5jaCA9IFwiIFwiO1xuICAgIHZhciBtID0gdGV4dC5tYXRjaCgvXFxkKy8pO1xuICAgIGlmIChtKVxuICAgICAgICBpbmRlbnQubGVuZ3RoID0gcGFyc2VJbnQobVswXSwgMTApO1xuICAgIHJldHVybiBpbmRlbnQ7XG59O1xuXG5leHBvcnRzLiRwYXJzZUFyZyA9IGZ1bmN0aW9uKGFyZykge1xuICAgIGlmICghYXJnKVxuICAgICAgICByZXR1cm4ge307XG4gICAgaWYgKHR5cGVvZiBhcmcgPT0gXCJzdHJpbmdcIilcbiAgICAgICAgcmV0dXJuIGV4cG9ydHMuJHBhcnNlU3RyaW5nQXJnKGFyZyk7XG4gICAgaWYgKHR5cGVvZiBhcmcudGV4dCA9PSBcInN0cmluZ1wiKVxuICAgICAgICByZXR1cm4gZXhwb3J0cy4kcGFyc2VTdHJpbmdBcmcoYXJnLnRleHQpO1xuICAgIHJldHVybiBhcmc7XG59O1xuXG5leHBvcnRzLmNvbW1hbmRzID0gW3tcbiAgICBuYW1lOiBcImRldGVjdEluZGVudGF0aW9uXCIsXG4gICAgZGVzY3JpcHRpb246IFwiRGV0ZWN0IGluZGVudGF0aW9uIGZyb20gY29udGVudFwiLFxuICAgIGV4ZWM6IGZ1bmN0aW9uKGVkaXRvcikge1xuICAgICAgICBleHBvcnRzLmRldGVjdEluZGVudGF0aW9uKGVkaXRvci5zZXNzaW9uKTtcbiAgICAgICAgLy8gdG9kbyBzaG93IG1lc3NhZ2U/XG4gICAgfVxufSwge1xuICAgIG5hbWU6IFwidHJpbVRyYWlsaW5nU3BhY2VcIixcbiAgICBkZXNjcmlwdGlvbjogXCJUcmltIHRyYWlsaW5nIHdoaXRlc3BhY2VcIixcbiAgICBleGVjOiBmdW5jdGlvbihlZGl0b3IsIGFyZ3MpIHtcbiAgICAgICAgZXhwb3J0cy50cmltVHJhaWxpbmdTcGFjZShlZGl0b3Iuc2Vzc2lvbiwgYXJncyk7XG4gICAgfVxufSwge1xuICAgIG5hbWU6IFwiY29udmVydEluZGVudGF0aW9uXCIsXG4gICAgZGVzY3JpcHRpb246IFwiQ29udmVydCBpbmRlbnRhdGlvbiB0byAuLi5cIixcbiAgICBleGVjOiBmdW5jdGlvbihlZGl0b3IsIGFyZykge1xuICAgICAgICB2YXIgaW5kZW50ID0gZXhwb3J0cy4kcGFyc2VBcmcoYXJnKTtcbiAgICAgICAgZXhwb3J0cy5jb252ZXJ0SW5kZW50YXRpb24oZWRpdG9yLnNlc3Npb24sIGluZGVudC5jaCwgaW5kZW50Lmxlbmd0aCk7XG4gICAgfVxufSwge1xuICAgIG5hbWU6IFwic2V0SW5kZW50YXRpb25cIixcbiAgICBkZXNjcmlwdGlvbjogXCJTZXQgaW5kZW50YXRpb25cIixcbiAgICBleGVjOiBmdW5jdGlvbihlZGl0b3IsIGFyZykge1xuICAgICAgICB2YXIgaW5kZW50ID0gZXhwb3J0cy4kcGFyc2VBcmcoYXJnKTtcbiAgICAgICAgaW5kZW50Lmxlbmd0aCAmJiBlZGl0b3Iuc2Vzc2lvbi5zZXRUYWJTaXplKGluZGVudC5sZW5ndGgpO1xuICAgICAgICBpbmRlbnQuY2ggJiYgZWRpdG9yLnNlc3Npb24uc2V0VXNlU29mdFRhYnMoaW5kZW50LmNoID09IFwiIFwiKTtcbiAgICB9XG59XTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==