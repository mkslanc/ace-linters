"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[1482],{

/***/ 21482:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/**
 * ## Whitespace management and indentation utilities extension
 *
 * Provides whitespace handling capabilities including automatic indentation detection, trailing whitespace trimming,
 * and indentation format conversion. Analyzes code patterns to determine optimal tab settings and offers commands for
 * maintaining consistent code formatting across different indentation styles (spaces vs. tabs) and sizes.
 *
 * @module
 */



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
 * Detects the indentation style of a document and configures the session accordingly.
 *
 * @param {EditSession} session The editing session to analyze and configure
 * @returns {{ch?: string, length?: number}|{}} An object containing detected indentation details (character and length)
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
 * Removes trailing whitespace from all lines in the session.
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
 * Converts indentation format throughout the session to use specified character and size.
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjE0ODIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViO0FBQ0E7QUFDQSxhQUFhLHVDQUF1QztBQUNwRDs7QUFFQSxXQUFXLG1CQUFPLENBQUMsS0FBYTs7QUFFaEM7QUFDQTtBQUNBO0FBQ0EsV0FBVyxVQUFVO0FBQ3JCO0FBQ0EsY0FBYztBQUNkO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsU0FBUztBQUM3QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixrQkFBa0I7QUFDL0M7QUFDQTtBQUNBOztBQUVBLG9EQUFvRCxZQUFZOztBQUVoRSxpQkFBaUI7QUFDakI7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHFCQUFxQjtBQUNyQjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsYUFBYTtBQUN4QixjQUFjLDZCQUE2QixLQUFLO0FBQ2hEO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxhQUFhO0FBQ3hCLFdBQVcsUUFBUTtBQUNuQixXQUFXLFNBQVM7QUFDcEIsV0FBVyxTQUFTO0FBQ3BCO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxvQ0FBb0MsT0FBTztBQUMzQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxhQUFhO0FBQ3hCLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkI7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esb0NBQW9DLE9BQU87QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0NBQWtDLGtCQUFrQjtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQjtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvZXh0L3doaXRlc3BhY2UuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiAjIyBXaGl0ZXNwYWNlIG1hbmFnZW1lbnQgYW5kIGluZGVudGF0aW9uIHV0aWxpdGllcyBleHRlbnNpb25cbiAqXG4gKiBQcm92aWRlcyB3aGl0ZXNwYWNlIGhhbmRsaW5nIGNhcGFiaWxpdGllcyBpbmNsdWRpbmcgYXV0b21hdGljIGluZGVudGF0aW9uIGRldGVjdGlvbiwgdHJhaWxpbmcgd2hpdGVzcGFjZSB0cmltbWluZyxcbiAqIGFuZCBpbmRlbnRhdGlvbiBmb3JtYXQgY29udmVyc2lvbi4gQW5hbHl6ZXMgY29kZSBwYXR0ZXJucyB0byBkZXRlcm1pbmUgb3B0aW1hbCB0YWIgc2V0dGluZ3MgYW5kIG9mZmVycyBjb21tYW5kcyBmb3JcbiAqIG1haW50YWluaW5nIGNvbnNpc3RlbnQgY29kZSBmb3JtYXR0aW5nIGFjcm9zcyBkaWZmZXJlbnQgaW5kZW50YXRpb24gc3R5bGVzIChzcGFjZXMgdnMuIHRhYnMpIGFuZCBzaXplcy5cbiAqXG4gKiBAbW9kdWxlXG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxuICpcbiAqIEB0eXBlZGVmIHtpbXBvcnQoXCIuLi9lZGl0X3Nlc3Npb25cIikuRWRpdFNlc3Npb259IEVkaXRTZXNzaW9uXG4gKi9cblxudmFyIGxhbmcgPSByZXF1aXJlKFwiLi4vbGliL2xhbmdcIik7XG5cbi8vIGJhc2VkIG9uIGh0dHA6Ly93d3cuZnJlZWhhY2tlcnMub3JnL0luZGVudF9GaW5kZXJcbi8qKlxuICogXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBsaW5lc1xuICogQHBhcmFtIFtmYWxsYmFja11cbiAqIEByZXR1cm5zIHt7Y2g/OiBzdHJpbmcsIGxlbmd0aD86IG51bWJlcn19XG4gKi9cbmV4cG9ydHMuJGRldGVjdEluZGVudGF0aW9uID0gZnVuY3Rpb24obGluZXMsIGZhbGxiYWNrKSB7XG4gICAgdmFyIHN0YXRzID0gW107XG4gICAgdmFyIGNoYW5nZXMgPSBbXTtcbiAgICB2YXIgdGFiSW5kZW50cyA9IDA7XG4gICAgdmFyIHByZXZTcGFjZXMgPSAwO1xuICAgIHZhciBtYXggPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIDEwMDApO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWF4OyBpKyspIHtcbiAgICAgICAgdmFyIGxpbmUgPSBsaW5lc1tpXTtcbiAgICAgICAgLy8gaWdub3JlIGVtcHR5IGFuZCBjb21tZW50IGxpbmVzXG4gICAgICAgIGlmICghL15cXHMqW14qK1xcLVxcc10vLnRlc3QobGluZSkpXG4gICAgICAgICAgICBjb250aW51ZTtcblxuICAgICAgICBpZiAobGluZVswXSA9PSBcIlxcdFwiKSB7XG4gICAgICAgICAgICB0YWJJbmRlbnRzKys7XG4gICAgICAgICAgICBwcmV2U3BhY2VzID0gLU51bWJlci5NQVhfVkFMVUU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgc3BhY2VzID0gbGluZS5tYXRjaCgvXiAqLylbMF0ubGVuZ3RoO1xuICAgICAgICAgICAgaWYgKHNwYWNlcyAmJiBsaW5lW3NwYWNlc10gIT0gXCJcXHRcIikge1xuICAgICAgICAgICAgICAgIHZhciBkaWZmID0gc3BhY2VzIC0gcHJldlNwYWNlcztcbiAgICAgICAgICAgICAgICBpZiAoZGlmZiA+IDAgJiYgIShwcmV2U3BhY2VzJWRpZmYpICYmICEoc3BhY2VzJWRpZmYpKVxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2VzW2RpZmZdID0gKGNoYW5nZXNbZGlmZl0gfHwgMCkgKyAxO1xuICAgIFxuICAgICAgICAgICAgICAgIHN0YXRzW3NwYWNlc10gPSAoc3RhdHNbc3BhY2VzXSB8fCAwKSArIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcmV2U3BhY2VzID0gc3BhY2VzO1xuICAgICAgICB9XG4gICAgICAgIC8vIGlnbm9yZSBsaW5lcyBlbmRpbmcgd2l0aCBiYWNrc2xhc2hcbiAgICAgICAgd2hpbGUgKGkgPCBtYXggJiYgbGluZVtsaW5lLmxlbmd0aCAtIDFdID09IFwiXFxcXFwiKVxuICAgICAgICAgICAgbGluZSA9IGxpbmVzW2krK107XG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIGdldFNjb3JlKGluZGVudCkge1xuICAgICAgICB2YXIgc2NvcmUgPSAwO1xuICAgICAgICBmb3IgKHZhciBpID0gaW5kZW50OyBpIDwgc3RhdHMubGVuZ3RoOyBpICs9IGluZGVudClcbiAgICAgICAgICAgIHNjb3JlICs9IHN0YXRzW2ldIHx8IDA7XG4gICAgICAgIHJldHVybiBzY29yZTtcbiAgICB9XG5cbiAgICB2YXIgY2hhbmdlc1RvdGFsID0gY2hhbmdlcy5yZWR1Y2UoZnVuY3Rpb24oYSxiKXtyZXR1cm4gYStiO30sIDApO1xuXG4gICAgdmFyIGZpcnN0ID0ge3Njb3JlOiAwLCBsZW5ndGg6IDB9O1xuICAgIHZhciBzcGFjZUluZGVudHMgPSAwO1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgMTI7IGkrKykge1xuICAgICAgICB2YXIgc2NvcmUgPSBnZXRTY29yZShpKTtcbiAgICAgICAgaWYgKGkgPT0gMSkge1xuICAgICAgICAgICAgc3BhY2VJbmRlbnRzID0gc2NvcmU7XG4gICAgICAgICAgICBzY29yZSA9IHN0YXRzWzFdID8gMC45IDogMC44O1xuICAgICAgICAgICAgaWYgKCFzdGF0cy5sZW5ndGgpXG4gICAgICAgICAgICAgICAgc2NvcmUgPSAwO1xuICAgICAgICB9IGVsc2VcbiAgICAgICAgICAgIHNjb3JlIC89IHNwYWNlSW5kZW50cztcblxuICAgICAgICBpZiAoY2hhbmdlc1tpXSlcbiAgICAgICAgICAgIHNjb3JlICs9IGNoYW5nZXNbaV0gLyBjaGFuZ2VzVG90YWw7XG5cbiAgICAgICAgaWYgKHNjb3JlID4gZmlyc3Quc2NvcmUpXG4gICAgICAgICAgICBmaXJzdCA9IHtzY29yZTogc2NvcmUsIGxlbmd0aDogaX07XG4gICAgfVxuXG4gICAgaWYgKGZpcnN0LnNjb3JlICYmIGZpcnN0LnNjb3JlID4gMS40KVxuICAgICAgICB2YXIgdGFiTGVuZ3RoID0gZmlyc3QubGVuZ3RoO1xuXG4gICAgaWYgKHRhYkluZGVudHMgPiBzcGFjZUluZGVudHMgKyAxKSB7XG4gICAgICAgIGlmICh0YWJMZW5ndGggPT0gMSB8fCBzcGFjZUluZGVudHMgPCB0YWJJbmRlbnRzIC8gNCB8fCBmaXJzdC5zY29yZSA8IDEuOClcbiAgICAgICAgICAgIHRhYkxlbmd0aCA9IHVuZGVmaW5lZDtcbiAgICAgICAgcmV0dXJuIHtjaDogXCJcXHRcIiwgbGVuZ3RoOiB0YWJMZW5ndGh9O1xuICAgIH1cbiAgICBpZiAoc3BhY2VJbmRlbnRzID4gdGFiSW5kZW50cyArIDEpXG4gICAgICAgIHJldHVybiB7Y2g6IFwiIFwiLCBsZW5ndGg6IHRhYkxlbmd0aH07XG59O1xuXG4vKipcbiAqIERldGVjdHMgdGhlIGluZGVudGF0aW9uIHN0eWxlIG9mIGEgZG9jdW1lbnQgYW5kIGNvbmZpZ3VyZXMgdGhlIHNlc3Npb24gYWNjb3JkaW5nbHkuXG4gKlxuICogQHBhcmFtIHtFZGl0U2Vzc2lvbn0gc2Vzc2lvbiBUaGUgZWRpdGluZyBzZXNzaW9uIHRvIGFuYWx5emUgYW5kIGNvbmZpZ3VyZVxuICogQHJldHVybnMge3tjaD86IHN0cmluZywgbGVuZ3RoPzogbnVtYmVyfXx7fX0gQW4gb2JqZWN0IGNvbnRhaW5pbmcgZGV0ZWN0ZWQgaW5kZW50YXRpb24gZGV0YWlscyAoY2hhcmFjdGVyIGFuZCBsZW5ndGgpXG4gKi9cbmV4cG9ydHMuZGV0ZWN0SW5kZW50YXRpb24gPSBmdW5jdGlvbihzZXNzaW9uKSB7XG4gICAgdmFyIGxpbmVzID0gc2Vzc2lvbi5nZXRMaW5lcygwLCAxMDAwKTtcbiAgICB2YXIgaW5kZW50ID0gZXhwb3J0cy4kZGV0ZWN0SW5kZW50YXRpb24obGluZXMpIHx8IHt9O1xuXG4gICAgaWYgKGluZGVudC5jaClcbiAgICAgICAgc2Vzc2lvbi5zZXRVc2VTb2Z0VGFicyhpbmRlbnQuY2ggPT0gXCIgXCIpO1xuXG4gICAgaWYgKGluZGVudC5sZW5ndGgpXG4gICAgICAgIHNlc3Npb24uc2V0VGFiU2l6ZShpbmRlbnQubGVuZ3RoKTtcbiAgICByZXR1cm4gaW5kZW50O1xufTtcblxuLyoqXG4gKiBSZW1vdmVzIHRyYWlsaW5nIHdoaXRlc3BhY2UgZnJvbSBhbGwgbGluZXMgaW4gdGhlIHNlc3Npb24uXG4gKiBAcGFyYW0ge0VkaXRTZXNzaW9ufSBzZXNzaW9uXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy50cmltRW1wdHldIHRyaW0gZW1wdHkgbGluZXMgdG9vXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmtlZXBDdXJzb3JQb3NpdGlvbl0gZG8gbm90IHRyaW0gd2hpdGVzcGFjZSBiZWZvcmUgdGhlIGN1cnNvclxuICovXG5leHBvcnRzLnRyaW1UcmFpbGluZ1NwYWNlID0gZnVuY3Rpb24oc2Vzc2lvbiwgb3B0aW9ucykge1xuICAgIHZhciBkb2MgPSBzZXNzaW9uLmdldERvY3VtZW50KCk7XG4gICAgdmFyIGxpbmVzID0gZG9jLmdldEFsbExpbmVzKCk7XG4gICAgXG4gICAgdmFyIG1pbiA9IG9wdGlvbnMgJiYgb3B0aW9ucy50cmltRW1wdHkgPyAtMSA6IDA7XG4gICAgdmFyIGN1cnNvcnMgPSBbXSwgY2kgPSAtMTtcbiAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLmtlZXBDdXJzb3JQb3NpdGlvbikge1xuICAgICAgICBpZiAoc2Vzc2lvbi5zZWxlY3Rpb24ucmFuZ2VDb3VudCkge1xuICAgICAgICAgICAgc2Vzc2lvbi5zZWxlY3Rpb24ucmFuZ2VMaXN0LnJhbmdlcy5mb3JFYWNoKGZ1bmN0aW9uKHgsIGksIHJhbmdlcykge1xuICAgICAgICAgICAgICAgdmFyIG5leHQgPSByYW5nZXNbaSArIDFdO1xuICAgICAgICAgICAgICAgaWYgKG5leHQgJiYgbmV4dC5jdXJzb3Iucm93ID09IHguY3Vyc29yLnJvdylcbiAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgY3Vyc29ycy5wdXNoKHguY3Vyc29yKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY3Vyc29ycy5wdXNoKHNlc3Npb24uc2VsZWN0aW9uLmdldEN1cnNvcigpKTtcbiAgICAgICAgfVxuICAgICAgICBjaSA9IDA7XG4gICAgfVxuICAgIHZhciBjdXJzb3JSb3cgPSBjdXJzb3JzW2NpXSAmJiBjdXJzb3JzW2NpXS5yb3c7XG5cbiAgICBmb3IgKHZhciBpID0gMCwgbD1saW5lcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgdmFyIGxpbmUgPSBsaW5lc1tpXTtcbiAgICAgICAgdmFyIGluZGV4ID0gbGluZS5zZWFyY2goL1xccyskLyk7XG5cbiAgICAgICAgaWYgKGkgPT0gY3Vyc29yUm93KSB7XG4gICAgICAgICAgICBpZiAoaW5kZXggPCBjdXJzb3JzW2NpXS5jb2x1bW4gJiYgaW5kZXggPiBtaW4pXG4gICAgICAgICAgICAgICBpbmRleCA9IGN1cnNvcnNbY2ldLmNvbHVtbjtcbiAgICAgICAgICAgIGNpKys7XG4gICAgICAgICAgICBjdXJzb3JSb3cgPSBjdXJzb3JzW2NpXSA/IGN1cnNvcnNbY2ldLnJvdyA6IC0xO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGluZGV4ID4gbWluKVxuICAgICAgICAgICAgZG9jLnJlbW92ZUluTGluZShpLCBpbmRleCwgbGluZS5sZW5ndGgpO1xuICAgIH1cbn07XG5cbi8qKlxuICogQ29udmVydHMgaW5kZW50YXRpb24gZm9ybWF0IHRocm91Z2hvdXQgdGhlIHNlc3Npb24gdG8gdXNlIHNwZWNpZmllZCBjaGFyYWN0ZXIgYW5kIHNpemUuXG4gKiBAcGFyYW0ge0VkaXRTZXNzaW9ufSBzZXNzaW9uXG4gKiBAcGFyYW0ge3N0cmluZ30gY2hcbiAqIEBwYXJhbSB7bnVtYmVyfSBsZW5cbiAqL1xuZXhwb3J0cy5jb252ZXJ0SW5kZW50YXRpb24gPSBmdW5jdGlvbihzZXNzaW9uLCBjaCwgbGVuKSB7XG4gICAgdmFyIG9sZENoID0gc2Vzc2lvbi5nZXRUYWJTdHJpbmcoKVswXTtcbiAgICB2YXIgb2xkTGVuID0gc2Vzc2lvbi5nZXRUYWJTaXplKCk7XG4gICAgaWYgKCFsZW4pIGxlbiA9IG9sZExlbjtcbiAgICBpZiAoIWNoKSBjaCA9IG9sZENoO1xuXG4gICAgdmFyIHRhYiA9IGNoID09IFwiXFx0XCIgPyBjaDogbGFuZy5zdHJpbmdSZXBlYXQoY2gsIGxlbik7XG5cbiAgICB2YXIgZG9jID0gc2Vzc2lvbi5kb2M7XG4gICAgdmFyIGxpbmVzID0gZG9jLmdldEFsbExpbmVzKCk7XG5cbiAgICB2YXIgY2FjaGUgPSB7fTtcbiAgICB2YXIgc3BhY2VDYWNoZSA9IHt9O1xuICAgIGZvciAodmFyIGkgPSAwLCBsPWxpbmVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICB2YXIgbGluZSA9IGxpbmVzW2ldO1xuICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKC9eXFxzKi8pWzBdO1xuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIHZhciB3ID0gc2Vzc2lvbi4kZ2V0U3RyaW5nU2NyZWVuV2lkdGgobWF0Y2gpWzBdO1xuICAgICAgICAgICAgdmFyIHRhYkNvdW50ID0gTWF0aC5mbG9vcih3L29sZExlbik7XG4gICAgICAgICAgICB2YXIgcmVtaW5kZXIgPSB3JW9sZExlbjtcbiAgICAgICAgICAgIHZhciB0b0luc2VydCA9IGNhY2hlW3RhYkNvdW50XSB8fCAoY2FjaGVbdGFiQ291bnRdID0gbGFuZy5zdHJpbmdSZXBlYXQodGFiLCB0YWJDb3VudCkpO1xuICAgICAgICAgICAgdG9JbnNlcnQgKz0gc3BhY2VDYWNoZVtyZW1pbmRlcl0gfHwgKHNwYWNlQ2FjaGVbcmVtaW5kZXJdID0gbGFuZy5zdHJpbmdSZXBlYXQoXCIgXCIsIHJlbWluZGVyKSk7XG5cbiAgICAgICAgICAgIGlmICh0b0luc2VydCAhPSBtYXRjaCkge1xuICAgICAgICAgICAgICAgIGRvYy5yZW1vdmVJbkxpbmUoaSwgMCwgbWF0Y2gubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICBkb2MuaW5zZXJ0SW5MaW5lKHtyb3c6IGksIGNvbHVtbjogMH0sIHRvSW5zZXJ0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBzZXNzaW9uLnNldFRhYlNpemUobGVuKTtcbiAgICBzZXNzaW9uLnNldFVzZVNvZnRUYWJzKGNoID09IFwiIFwiKTtcbn07XG5cbi8qKlxuICogXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuICogQHJldHVybnMge3t9fVxuICovXG5leHBvcnRzLiRwYXJzZVN0cmluZ0FyZyA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgICB2YXIgaW5kZW50ID0ge307XG4gICAgaWYgKC90Ly50ZXN0KHRleHQpKVxuICAgICAgICBpbmRlbnQuY2ggPSBcIlxcdFwiO1xuICAgIGVsc2UgaWYgKC9zLy50ZXN0KHRleHQpKVxuICAgICAgICBpbmRlbnQuY2ggPSBcIiBcIjtcbiAgICB2YXIgbSA9IHRleHQubWF0Y2goL1xcZCsvKTtcbiAgICBpZiAobSlcbiAgICAgICAgaW5kZW50Lmxlbmd0aCA9IHBhcnNlSW50KG1bMF0sIDEwKTtcbiAgICByZXR1cm4gaW5kZW50O1xufTtcblxuZXhwb3J0cy4kcGFyc2VBcmcgPSBmdW5jdGlvbihhcmcpIHtcbiAgICBpZiAoIWFyZylcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgIGlmICh0eXBlb2YgYXJnID09IFwic3RyaW5nXCIpXG4gICAgICAgIHJldHVybiBleHBvcnRzLiRwYXJzZVN0cmluZ0FyZyhhcmcpO1xuICAgIGlmICh0eXBlb2YgYXJnLnRleHQgPT0gXCJzdHJpbmdcIilcbiAgICAgICAgcmV0dXJuIGV4cG9ydHMuJHBhcnNlU3RyaW5nQXJnKGFyZy50ZXh0KTtcbiAgICByZXR1cm4gYXJnO1xufTtcblxuZXhwb3J0cy5jb21tYW5kcyA9IFt7XG4gICAgbmFtZTogXCJkZXRlY3RJbmRlbnRhdGlvblwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkRldGVjdCBpbmRlbnRhdGlvbiBmcm9tIGNvbnRlbnRcIixcbiAgICBleGVjOiBmdW5jdGlvbihlZGl0b3IpIHtcbiAgICAgICAgZXhwb3J0cy5kZXRlY3RJbmRlbnRhdGlvbihlZGl0b3Iuc2Vzc2lvbik7XG4gICAgICAgIC8vIHRvZG8gc2hvdyBtZXNzYWdlP1xuICAgIH1cbn0sIHtcbiAgICBuYW1lOiBcInRyaW1UcmFpbGluZ1NwYWNlXCIsXG4gICAgZGVzY3JpcHRpb246IFwiVHJpbSB0cmFpbGluZyB3aGl0ZXNwYWNlXCIsXG4gICAgZXhlYzogZnVuY3Rpb24oZWRpdG9yLCBhcmdzKSB7XG4gICAgICAgIGV4cG9ydHMudHJpbVRyYWlsaW5nU3BhY2UoZWRpdG9yLnNlc3Npb24sIGFyZ3MpO1xuICAgIH1cbn0sIHtcbiAgICBuYW1lOiBcImNvbnZlcnRJbmRlbnRhdGlvblwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkNvbnZlcnQgaW5kZW50YXRpb24gdG8gLi4uXCIsXG4gICAgZXhlYzogZnVuY3Rpb24oZWRpdG9yLCBhcmcpIHtcbiAgICAgICAgdmFyIGluZGVudCA9IGV4cG9ydHMuJHBhcnNlQXJnKGFyZyk7XG4gICAgICAgIGV4cG9ydHMuY29udmVydEluZGVudGF0aW9uKGVkaXRvci5zZXNzaW9uLCBpbmRlbnQuY2gsIGluZGVudC5sZW5ndGgpO1xuICAgIH1cbn0sIHtcbiAgICBuYW1lOiBcInNldEluZGVudGF0aW9uXCIsXG4gICAgZGVzY3JpcHRpb246IFwiU2V0IGluZGVudGF0aW9uXCIsXG4gICAgZXhlYzogZnVuY3Rpb24oZWRpdG9yLCBhcmcpIHtcbiAgICAgICAgdmFyIGluZGVudCA9IGV4cG9ydHMuJHBhcnNlQXJnKGFyZyk7XG4gICAgICAgIGluZGVudC5sZW5ndGggJiYgZWRpdG9yLnNlc3Npb24uc2V0VGFiU2l6ZShpbmRlbnQubGVuZ3RoKTtcbiAgICAgICAgaW5kZW50LmNoICYmIGVkaXRvci5zZXNzaW9uLnNldFVzZVNvZnRUYWJzKGluZGVudC5jaCA9PSBcIiBcIik7XG4gICAgfVxufV07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=