"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[7674],{

/***/ 57674:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/**
 * ## Text hard wrapping extension for automatic line breaking and text formatting.
 *
 * Provides intelligent line wrapping functionality that breaks long lines at configurable column limits while
 * preserving indentation and optionally merging short adjacent lines. Supports both automatic wrapping during text
 * input and manual formatting of selected text ranges.
 *
 * **Enable:** `editor.setOption("hardWrap", true)`
 * or configure it during editor initialization in the options object.
 * @module
 */



var Range = (__webpack_require__(91902)/* .Range */ .Q);

/**
 * Wraps lines at specified column limits and optionally merges short adjacent lines.
 *
 * Processes text within the specified row range, breaking lines that exceed the maximum column
 * width at appropriate word boundaries while preserving indentation. When merge is enabled,
 * combines short consecutive lines that can fit within the column limit. Automatically adjusts
 * the end row when new line breaks are inserted to ensure all affected content is processed.
 *
 * @param {import("../editor").Editor} editor - The editor instance containing the text to wrap
 * @param {import("../../ace-internal").Ace.HardWrapOptions} options - Configuration options for wrapping behavior
 */

function hardWrap(editor, options) {
    var max = options.column || editor.getOption("printMarginColumn");
    var allowMerge = options.allowMerge != false;
       
    var row = Math.min(options.startRow, options.endRow);
    var endRow = Math.max(options.startRow, options.endRow);
    
    var session = editor.session;
    
    while (row <= endRow) {
        var line = session.getLine(row);
        if (line.length > max) {
            var space = findSpace(line, max, 5);
            if (space) {
                var indentation = /^\s*/.exec(line)[0];
                session.replace(new Range(row,space.start,row,space.end), "\n" + indentation);
            }
            endRow++;
        } else if (allowMerge && /\S/.test(line) && row != endRow) {
            var nextLine = session.getLine(row + 1);
            if (nextLine && /\S/.test(nextLine)) {
                var trimmedLine = line.replace(/\s+$/, "");
                var trimmedNextLine = nextLine.replace(/^\s+/, "");
                var mergedLine = trimmedLine + " " + trimmedNextLine;

                var space = findSpace(mergedLine, max, 5);
                if (space && space.start > trimmedLine.length || mergedLine.length < max) {
                    var replaceRange = new Range(row,trimmedLine.length,row + 1,nextLine.length - trimmedNextLine.length);
                    session.replace(replaceRange, " ");
                    row--;
                    endRow--;
                } else if (trimmedLine.length < line.length) {
                    session.remove(new Range(row, trimmedLine.length, row, line.length));
                }
            }
        }
        row++;
    }

    /**
     * @param {string} line
     * @param {number} max
     * @param {number} min
     */
    function findSpace(line, max, min) {
        if (line.length < max)
            return;
        var before = line.slice(0, max);
        var after = line.slice(max);
        var spaceAfter = /^(?:(\s+)|(\S+)(\s+))/.exec(after);
        var spaceBefore = /(?:(\s+)|(\s+)(\S+))$/.exec(before);
        var start = 0;
        var end = 0;
        if (spaceBefore && !spaceBefore[2]) {
            start = max - spaceBefore[1].length;
            end = max;
        }
        if (spaceAfter && !spaceAfter[2]) {
            if (!start)
                start = max;
            end = max + spaceAfter[1].length;
        }
        if (start) {
            return {
                start: start,
                end: end
            };
        }
        if (spaceBefore && spaceBefore[2] && spaceBefore.index > min) {
            return {
                start: spaceBefore.index,
                end: spaceBefore.index + spaceBefore[2].length
            };
        }
        if (spaceAfter && spaceAfter[2]) {
            start =  max + spaceAfter[2].length;
            return {
                start: start,
                end: start + spaceAfter[3].length
            };
        }
    }

}

function wrapAfterInput(e) {
    if (e.command.name == "insertstring" && /\S/.test(e.args)) {
        var editor = e.editor;
        var cursor = editor.selection.cursor;
        if (cursor.column <= editor.renderer.$printMarginColumn) return;
        var lastDelta = editor.session.$undoManager.$lastDelta;

        hardWrap(editor, {
            startRow: cursor.row, endRow: cursor.row,
            allowMerge: false
        });
        if (lastDelta != editor.session.$undoManager.$lastDelta) 
            editor.session.markUndoGroup();
    }
}

var Editor = (__webpack_require__(27258).Editor);
(__webpack_require__(76321).defineOptions)(Editor.prototype, "editor", {
    hardWrap: {
        set: function(val) {
            if (val) {
                this.commands.on("afterExec", wrapAfterInput);
            } else {
                this.commands.off("afterExec", wrapAfterInput);
            }
        },
        value: false
    }
});

exports.hardWrap = hardWrap;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjc2NzQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixZQUFZLDJDQUF5Qjs7QUFFckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsNEJBQTRCO0FBQ3ZDLFdBQVcsa0RBQWtEO0FBQzdEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxlQUFlLFFBQVE7QUFDdkIsZUFBZSxRQUFRO0FBQ3ZCLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxhQUFhLG1DQUEyQjtBQUN4QywwQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCxnQkFBZ0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9leHQvaGFyZHdyYXAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiAjIyBUZXh0IGhhcmQgd3JhcHBpbmcgZXh0ZW5zaW9uIGZvciBhdXRvbWF0aWMgbGluZSBicmVha2luZyBhbmQgdGV4dCBmb3JtYXR0aW5nLlxuICpcbiAqIFByb3ZpZGVzIGludGVsbGlnZW50IGxpbmUgd3JhcHBpbmcgZnVuY3Rpb25hbGl0eSB0aGF0IGJyZWFrcyBsb25nIGxpbmVzIGF0IGNvbmZpZ3VyYWJsZSBjb2x1bW4gbGltaXRzIHdoaWxlXG4gKiBwcmVzZXJ2aW5nIGluZGVudGF0aW9uIGFuZCBvcHRpb25hbGx5IG1lcmdpbmcgc2hvcnQgYWRqYWNlbnQgbGluZXMuIFN1cHBvcnRzIGJvdGggYXV0b21hdGljIHdyYXBwaW5nIGR1cmluZyB0ZXh0XG4gKiBpbnB1dCBhbmQgbWFudWFsIGZvcm1hdHRpbmcgb2Ygc2VsZWN0ZWQgdGV4dCByYW5nZXMuXG4gKlxuICogKipFbmFibGU6KiogYGVkaXRvci5zZXRPcHRpb24oXCJoYXJkV3JhcFwiLCB0cnVlKWBcbiAqIG9yIGNvbmZpZ3VyZSBpdCBkdXJpbmcgZWRpdG9yIGluaXRpYWxpemF0aW9uIGluIHRoZSBvcHRpb25zIG9iamVjdC5cbiAqIEBtb2R1bGVcbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIFJhbmdlID0gcmVxdWlyZShcIi4uL3JhbmdlXCIpLlJhbmdlO1xuXG4vKipcbiAqIFdyYXBzIGxpbmVzIGF0IHNwZWNpZmllZCBjb2x1bW4gbGltaXRzIGFuZCBvcHRpb25hbGx5IG1lcmdlcyBzaG9ydCBhZGphY2VudCBsaW5lcy5cbiAqXG4gKiBQcm9jZXNzZXMgdGV4dCB3aXRoaW4gdGhlIHNwZWNpZmllZCByb3cgcmFuZ2UsIGJyZWFraW5nIGxpbmVzIHRoYXQgZXhjZWVkIHRoZSBtYXhpbXVtIGNvbHVtblxuICogd2lkdGggYXQgYXBwcm9wcmlhdGUgd29yZCBib3VuZGFyaWVzIHdoaWxlIHByZXNlcnZpbmcgaW5kZW50YXRpb24uIFdoZW4gbWVyZ2UgaXMgZW5hYmxlZCxcbiAqIGNvbWJpbmVzIHNob3J0IGNvbnNlY3V0aXZlIGxpbmVzIHRoYXQgY2FuIGZpdCB3aXRoaW4gdGhlIGNvbHVtbiBsaW1pdC4gQXV0b21hdGljYWxseSBhZGp1c3RzXG4gKiB0aGUgZW5kIHJvdyB3aGVuIG5ldyBsaW5lIGJyZWFrcyBhcmUgaW5zZXJ0ZWQgdG8gZW5zdXJlIGFsbCBhZmZlY3RlZCBjb250ZW50IGlzIHByb2Nlc3NlZC5cbiAqXG4gKiBAcGFyYW0ge2ltcG9ydChcIi4uL2VkaXRvclwiKS5FZGl0b3J9IGVkaXRvciAtIFRoZSBlZGl0b3IgaW5zdGFuY2UgY29udGFpbmluZyB0aGUgdGV4dCB0byB3cmFwXG4gKiBAcGFyYW0ge2ltcG9ydChcIi4uLy4uL2FjZS1pbnRlcm5hbFwiKS5BY2UuSGFyZFdyYXBPcHRpb25zfSBvcHRpb25zIC0gQ29uZmlndXJhdGlvbiBvcHRpb25zIGZvciB3cmFwcGluZyBiZWhhdmlvclxuICovXG5cbmZ1bmN0aW9uIGhhcmRXcmFwKGVkaXRvciwgb3B0aW9ucykge1xuICAgIHZhciBtYXggPSBvcHRpb25zLmNvbHVtbiB8fCBlZGl0b3IuZ2V0T3B0aW9uKFwicHJpbnRNYXJnaW5Db2x1bW5cIik7XG4gICAgdmFyIGFsbG93TWVyZ2UgPSBvcHRpb25zLmFsbG93TWVyZ2UgIT0gZmFsc2U7XG4gICAgICAgXG4gICAgdmFyIHJvdyA9IE1hdGgubWluKG9wdGlvbnMuc3RhcnRSb3csIG9wdGlvbnMuZW5kUm93KTtcbiAgICB2YXIgZW5kUm93ID0gTWF0aC5tYXgob3B0aW9ucy5zdGFydFJvdywgb3B0aW9ucy5lbmRSb3cpO1xuICAgIFxuICAgIHZhciBzZXNzaW9uID0gZWRpdG9yLnNlc3Npb247XG4gICAgXG4gICAgd2hpbGUgKHJvdyA8PSBlbmRSb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgaWYgKGxpbmUubGVuZ3RoID4gbWF4KSB7XG4gICAgICAgICAgICB2YXIgc3BhY2UgPSBmaW5kU3BhY2UobGluZSwgbWF4LCA1KTtcbiAgICAgICAgICAgIGlmIChzcGFjZSkge1xuICAgICAgICAgICAgICAgIHZhciBpbmRlbnRhdGlvbiA9IC9eXFxzKi8uZXhlYyhsaW5lKVswXTtcbiAgICAgICAgICAgICAgICBzZXNzaW9uLnJlcGxhY2UobmV3IFJhbmdlKHJvdyxzcGFjZS5zdGFydCxyb3csc3BhY2UuZW5kKSwgXCJcXG5cIiArIGluZGVudGF0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVuZFJvdysrO1xuICAgICAgICB9IGVsc2UgaWYgKGFsbG93TWVyZ2UgJiYgL1xcUy8udGVzdChsaW5lKSAmJiByb3cgIT0gZW5kUm93KSB7XG4gICAgICAgICAgICB2YXIgbmV4dExpbmUgPSBzZXNzaW9uLmdldExpbmUocm93ICsgMSk7XG4gICAgICAgICAgICBpZiAobmV4dExpbmUgJiYgL1xcUy8udGVzdChuZXh0TGluZSkpIHtcbiAgICAgICAgICAgICAgICB2YXIgdHJpbW1lZExpbmUgPSBsaW5lLnJlcGxhY2UoL1xccyskLywgXCJcIik7XG4gICAgICAgICAgICAgICAgdmFyIHRyaW1tZWROZXh0TGluZSA9IG5leHRMaW5lLnJlcGxhY2UoL15cXHMrLywgXCJcIik7XG4gICAgICAgICAgICAgICAgdmFyIG1lcmdlZExpbmUgPSB0cmltbWVkTGluZSArIFwiIFwiICsgdHJpbW1lZE5leHRMaW5lO1xuXG4gICAgICAgICAgICAgICAgdmFyIHNwYWNlID0gZmluZFNwYWNlKG1lcmdlZExpbmUsIG1heCwgNSk7XG4gICAgICAgICAgICAgICAgaWYgKHNwYWNlICYmIHNwYWNlLnN0YXJ0ID4gdHJpbW1lZExpbmUubGVuZ3RoIHx8IG1lcmdlZExpbmUubGVuZ3RoIDwgbWF4KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXBsYWNlUmFuZ2UgPSBuZXcgUmFuZ2Uocm93LHRyaW1tZWRMaW5lLmxlbmd0aCxyb3cgKyAxLG5leHRMaW5lLmxlbmd0aCAtIHRyaW1tZWROZXh0TGluZS5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICBzZXNzaW9uLnJlcGxhY2UocmVwbGFjZVJhbmdlLCBcIiBcIik7XG4gICAgICAgICAgICAgICAgICAgIHJvdy0tO1xuICAgICAgICAgICAgICAgICAgICBlbmRSb3ctLTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRyaW1tZWRMaW5lLmxlbmd0aCA8IGxpbmUubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlc3Npb24ucmVtb3ZlKG5ldyBSYW5nZShyb3csIHRyaW1tZWRMaW5lLmxlbmd0aCwgcm93LCBsaW5lLmxlbmd0aCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByb3crKztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGluZVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtYXhcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbWluXG4gICAgICovXG4gICAgZnVuY3Rpb24gZmluZFNwYWNlKGxpbmUsIG1heCwgbWluKSB7XG4gICAgICAgIGlmIChsaW5lLmxlbmd0aCA8IG1heClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdmFyIGJlZm9yZSA9IGxpbmUuc2xpY2UoMCwgbWF4KTtcbiAgICAgICAgdmFyIGFmdGVyID0gbGluZS5zbGljZShtYXgpO1xuICAgICAgICB2YXIgc3BhY2VBZnRlciA9IC9eKD86KFxccyspfChcXFMrKShcXHMrKSkvLmV4ZWMoYWZ0ZXIpO1xuICAgICAgICB2YXIgc3BhY2VCZWZvcmUgPSAvKD86KFxccyspfChcXHMrKShcXFMrKSkkLy5leGVjKGJlZm9yZSk7XG4gICAgICAgIHZhciBzdGFydCA9IDA7XG4gICAgICAgIHZhciBlbmQgPSAwO1xuICAgICAgICBpZiAoc3BhY2VCZWZvcmUgJiYgIXNwYWNlQmVmb3JlWzJdKSB7XG4gICAgICAgICAgICBzdGFydCA9IG1heCAtIHNwYWNlQmVmb3JlWzFdLmxlbmd0aDtcbiAgICAgICAgICAgIGVuZCA9IG1heDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3BhY2VBZnRlciAmJiAhc3BhY2VBZnRlclsyXSkge1xuICAgICAgICAgICAgaWYgKCFzdGFydClcbiAgICAgICAgICAgICAgICBzdGFydCA9IG1heDtcbiAgICAgICAgICAgIGVuZCA9IG1heCArIHNwYWNlQWZ0ZXJbMV0ubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdGFydCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzdGFydDogc3RhcnQsXG4gICAgICAgICAgICAgICAgZW5kOiBlbmRcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNwYWNlQmVmb3JlICYmIHNwYWNlQmVmb3JlWzJdICYmIHNwYWNlQmVmb3JlLmluZGV4ID4gbWluKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHN0YXJ0OiBzcGFjZUJlZm9yZS5pbmRleCxcbiAgICAgICAgICAgICAgICBlbmQ6IHNwYWNlQmVmb3JlLmluZGV4ICsgc3BhY2VCZWZvcmVbMl0ubGVuZ3RoXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGlmIChzcGFjZUFmdGVyICYmIHNwYWNlQWZ0ZXJbMl0pIHtcbiAgICAgICAgICAgIHN0YXJ0ID0gIG1heCArIHNwYWNlQWZ0ZXJbMl0ubGVuZ3RoO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzdGFydDogc3RhcnQsXG4gICAgICAgICAgICAgICAgZW5kOiBzdGFydCArIHNwYWNlQWZ0ZXJbM10ubGVuZ3RoXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuXG59XG5cbmZ1bmN0aW9uIHdyYXBBZnRlcklucHV0KGUpIHtcbiAgICBpZiAoZS5jb21tYW5kLm5hbWUgPT0gXCJpbnNlcnRzdHJpbmdcIiAmJiAvXFxTLy50ZXN0KGUuYXJncykpIHtcbiAgICAgICAgdmFyIGVkaXRvciA9IGUuZWRpdG9yO1xuICAgICAgICB2YXIgY3Vyc29yID0gZWRpdG9yLnNlbGVjdGlvbi5jdXJzb3I7XG4gICAgICAgIGlmIChjdXJzb3IuY29sdW1uIDw9IGVkaXRvci5yZW5kZXJlci4kcHJpbnRNYXJnaW5Db2x1bW4pIHJldHVybjtcbiAgICAgICAgdmFyIGxhc3REZWx0YSA9IGVkaXRvci5zZXNzaW9uLiR1bmRvTWFuYWdlci4kbGFzdERlbHRhO1xuXG4gICAgICAgIGhhcmRXcmFwKGVkaXRvciwge1xuICAgICAgICAgICAgc3RhcnRSb3c6IGN1cnNvci5yb3csIGVuZFJvdzogY3Vyc29yLnJvdyxcbiAgICAgICAgICAgIGFsbG93TWVyZ2U6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAobGFzdERlbHRhICE9IGVkaXRvci5zZXNzaW9uLiR1bmRvTWFuYWdlci4kbGFzdERlbHRhKSBcbiAgICAgICAgICAgIGVkaXRvci5zZXNzaW9uLm1hcmtVbmRvR3JvdXAoKTtcbiAgICB9XG59XG5cbnZhciBFZGl0b3IgPSByZXF1aXJlKFwiLi4vZWRpdG9yXCIpLkVkaXRvcjtcbnJlcXVpcmUoXCIuLi9jb25maWdcIikuZGVmaW5lT3B0aW9ucyhFZGl0b3IucHJvdG90eXBlLCBcImVkaXRvclwiLCB7XG4gICAgaGFyZFdyYXA6IHtcbiAgICAgICAgc2V0OiBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbW1hbmRzLm9uKFwiYWZ0ZXJFeGVjXCIsIHdyYXBBZnRlcklucHV0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb21tYW5kcy5vZmYoXCJhZnRlckV4ZWNcIiwgd3JhcEFmdGVySW5wdXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB2YWx1ZTogZmFsc2VcbiAgICB9XG59KTtcblxuZXhwb3J0cy5oYXJkV3JhcCA9IGhhcmRXcmFwO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9