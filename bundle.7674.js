"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[7674],{

/***/ 57674:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var Range = (__webpack_require__(91902)/* .Range */ .Q);

/**
 * @param {import("../editor").Editor} editor
 * @param {import("../../ace-internal").Ace.HardWrapOptions} options
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjc2NzQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsWUFBWSwyQ0FBeUI7O0FBRXJDO0FBQ0EsV0FBVyw0QkFBNEI7QUFDdkMsV0FBVyxrREFBa0Q7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZUFBZSxRQUFRO0FBQ3ZCLGVBQWUsUUFBUTtBQUN2QixlQUFlLFFBQVE7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsYUFBYSxtQ0FBMkI7QUFDeEMsMENBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLENBQUM7O0FBRUQsZ0JBQWdCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvZXh0L2hhcmR3cmFwLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG52YXIgUmFuZ2UgPSByZXF1aXJlKFwiLi4vcmFuZ2VcIikuUmFuZ2U7XG5cbi8qKlxuICogQHBhcmFtIHtpbXBvcnQoXCIuLi9lZGl0b3JcIikuRWRpdG9yfSBlZGl0b3JcbiAqIEBwYXJhbSB7aW1wb3J0KFwiLi4vLi4vYWNlLWludGVybmFsXCIpLkFjZS5IYXJkV3JhcE9wdGlvbnN9IG9wdGlvbnNcbiAqL1xuZnVuY3Rpb24gaGFyZFdyYXAoZWRpdG9yLCBvcHRpb25zKSB7XG4gICAgdmFyIG1heCA9IG9wdGlvbnMuY29sdW1uIHx8IGVkaXRvci5nZXRPcHRpb24oXCJwcmludE1hcmdpbkNvbHVtblwiKTtcbiAgICB2YXIgYWxsb3dNZXJnZSA9IG9wdGlvbnMuYWxsb3dNZXJnZSAhPSBmYWxzZTtcbiAgICAgICBcbiAgICB2YXIgcm93ID0gTWF0aC5taW4ob3B0aW9ucy5zdGFydFJvdywgb3B0aW9ucy5lbmRSb3cpO1xuICAgIHZhciBlbmRSb3cgPSBNYXRoLm1heChvcHRpb25zLnN0YXJ0Um93LCBvcHRpb25zLmVuZFJvdyk7XG4gICAgXG4gICAgdmFyIHNlc3Npb24gPSBlZGl0b3Iuc2Vzc2lvbjtcbiAgICBcbiAgICB3aGlsZSAocm93IDw9IGVuZFJvdykge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICBpZiAobGluZS5sZW5ndGggPiBtYXgpIHtcbiAgICAgICAgICAgIHZhciBzcGFjZSA9IGZpbmRTcGFjZShsaW5lLCBtYXgsIDUpO1xuICAgICAgICAgICAgaWYgKHNwYWNlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGluZGVudGF0aW9uID0gL15cXHMqLy5leGVjKGxpbmUpWzBdO1xuICAgICAgICAgICAgICAgIHNlc3Npb24ucmVwbGFjZShuZXcgUmFuZ2Uocm93LHNwYWNlLnN0YXJ0LHJvdyxzcGFjZS5lbmQpLCBcIlxcblwiICsgaW5kZW50YXRpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZW5kUm93Kys7XG4gICAgICAgIH0gZWxzZSBpZiAoYWxsb3dNZXJnZSAmJiAvXFxTLy50ZXN0KGxpbmUpICYmIHJvdyAhPSBlbmRSb3cpIHtcbiAgICAgICAgICAgIHZhciBuZXh0TGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cgKyAxKTtcbiAgICAgICAgICAgIGlmIChuZXh0TGluZSAmJiAvXFxTLy50ZXN0KG5leHRMaW5lKSkge1xuICAgICAgICAgICAgICAgIHZhciB0cmltbWVkTGluZSA9IGxpbmUucmVwbGFjZSgvXFxzKyQvLCBcIlwiKTtcbiAgICAgICAgICAgICAgICB2YXIgdHJpbW1lZE5leHRMaW5lID0gbmV4dExpbmUucmVwbGFjZSgvXlxccysvLCBcIlwiKTtcbiAgICAgICAgICAgICAgICB2YXIgbWVyZ2VkTGluZSA9IHRyaW1tZWRMaW5lICsgXCIgXCIgKyB0cmltbWVkTmV4dExpbmU7XG5cbiAgICAgICAgICAgICAgICB2YXIgc3BhY2UgPSBmaW5kU3BhY2UobWVyZ2VkTGluZSwgbWF4LCA1KTtcbiAgICAgICAgICAgICAgICBpZiAoc3BhY2UgJiYgc3BhY2Uuc3RhcnQgPiB0cmltbWVkTGluZS5sZW5ndGggfHwgbWVyZ2VkTGluZS5sZW5ndGggPCBtYXgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlcGxhY2VSYW5nZSA9IG5ldyBSYW5nZShyb3csdHJpbW1lZExpbmUubGVuZ3RoLHJvdyArIDEsbmV4dExpbmUubGVuZ3RoIC0gdHJpbW1lZE5leHRMaW5lLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgIHNlc3Npb24ucmVwbGFjZShyZXBsYWNlUmFuZ2UsIFwiIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgcm93LS07XG4gICAgICAgICAgICAgICAgICAgIGVuZFJvdy0tO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHJpbW1lZExpbmUubGVuZ3RoIDwgbGluZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgc2Vzc2lvbi5yZW1vdmUobmV3IFJhbmdlKHJvdywgdHJpbW1lZExpbmUubGVuZ3RoLCByb3csIGxpbmUubGVuZ3RoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJvdysrO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsaW5lXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG1heFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtaW5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBmaW5kU3BhY2UobGluZSwgbWF4LCBtaW4pIHtcbiAgICAgICAgaWYgKGxpbmUubGVuZ3RoIDwgbWF4KVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB2YXIgYmVmb3JlID0gbGluZS5zbGljZSgwLCBtYXgpO1xuICAgICAgICB2YXIgYWZ0ZXIgPSBsaW5lLnNsaWNlKG1heCk7XG4gICAgICAgIHZhciBzcGFjZUFmdGVyID0gL14oPzooXFxzKyl8KFxcUyspKFxccyspKS8uZXhlYyhhZnRlcik7XG4gICAgICAgIHZhciBzcGFjZUJlZm9yZSA9IC8oPzooXFxzKyl8KFxccyspKFxcUyspKSQvLmV4ZWMoYmVmb3JlKTtcbiAgICAgICAgdmFyIHN0YXJ0ID0gMDtcbiAgICAgICAgdmFyIGVuZCA9IDA7XG4gICAgICAgIGlmIChzcGFjZUJlZm9yZSAmJiAhc3BhY2VCZWZvcmVbMl0pIHtcbiAgICAgICAgICAgIHN0YXJ0ID0gbWF4IC0gc3BhY2VCZWZvcmVbMV0ubGVuZ3RoO1xuICAgICAgICAgICAgZW5kID0gbWF4O1xuICAgICAgICB9XG4gICAgICAgIGlmIChzcGFjZUFmdGVyICYmICFzcGFjZUFmdGVyWzJdKSB7XG4gICAgICAgICAgICBpZiAoIXN0YXJ0KVxuICAgICAgICAgICAgICAgIHN0YXJ0ID0gbWF4O1xuICAgICAgICAgICAgZW5kID0gbWF4ICsgc3BhY2VBZnRlclsxXS5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN0YXJ0KSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHN0YXJ0OiBzdGFydCxcbiAgICAgICAgICAgICAgICBlbmQ6IGVuZFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3BhY2VCZWZvcmUgJiYgc3BhY2VCZWZvcmVbMl0gJiYgc3BhY2VCZWZvcmUuaW5kZXggPiBtaW4pIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc3RhcnQ6IHNwYWNlQmVmb3JlLmluZGV4LFxuICAgICAgICAgICAgICAgIGVuZDogc3BhY2VCZWZvcmUuaW5kZXggKyBzcGFjZUJlZm9yZVsyXS5sZW5ndGhcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNwYWNlQWZ0ZXIgJiYgc3BhY2VBZnRlclsyXSkge1xuICAgICAgICAgICAgc3RhcnQgPSAgbWF4ICsgc3BhY2VBZnRlclsyXS5sZW5ndGg7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHN0YXJ0OiBzdGFydCxcbiAgICAgICAgICAgICAgICBlbmQ6IHN0YXJ0ICsgc3BhY2VBZnRlclszXS5sZW5ndGhcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuZnVuY3Rpb24gd3JhcEFmdGVySW5wdXQoZSkge1xuICAgIGlmIChlLmNvbW1hbmQubmFtZSA9PSBcImluc2VydHN0cmluZ1wiICYmIC9cXFMvLnRlc3QoZS5hcmdzKSkge1xuICAgICAgICB2YXIgZWRpdG9yID0gZS5lZGl0b3I7XG4gICAgICAgIHZhciBjdXJzb3IgPSBlZGl0b3Iuc2VsZWN0aW9uLmN1cnNvcjtcbiAgICAgICAgaWYgKGN1cnNvci5jb2x1bW4gPD0gZWRpdG9yLnJlbmRlcmVyLiRwcmludE1hcmdpbkNvbHVtbikgcmV0dXJuO1xuICAgICAgICB2YXIgbGFzdERlbHRhID0gZWRpdG9yLnNlc3Npb24uJHVuZG9NYW5hZ2VyLiRsYXN0RGVsdGE7XG5cbiAgICAgICAgaGFyZFdyYXAoZWRpdG9yLCB7XG4gICAgICAgICAgICBzdGFydFJvdzogY3Vyc29yLnJvdywgZW5kUm93OiBjdXJzb3Iucm93LFxuICAgICAgICAgICAgYWxsb3dNZXJnZTogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChsYXN0RGVsdGEgIT0gZWRpdG9yLnNlc3Npb24uJHVuZG9NYW5hZ2VyLiRsYXN0RGVsdGEpIFxuICAgICAgICAgICAgZWRpdG9yLnNlc3Npb24ubWFya1VuZG9Hcm91cCgpO1xuICAgIH1cbn1cblxudmFyIEVkaXRvciA9IHJlcXVpcmUoXCIuLi9lZGl0b3JcIikuRWRpdG9yO1xucmVxdWlyZShcIi4uL2NvbmZpZ1wiKS5kZWZpbmVPcHRpb25zKEVkaXRvci5wcm90b3R5cGUsIFwiZWRpdG9yXCIsIHtcbiAgICBoYXJkV3JhcDoge1xuICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29tbWFuZHMub24oXCJhZnRlckV4ZWNcIiwgd3JhcEFmdGVySW5wdXQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbW1hbmRzLm9mZihcImFmdGVyRXhlY1wiLCB3cmFwQWZ0ZXJJbnB1dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHZhbHVlOiBmYWxzZVxuICAgIH1cbn0pO1xuXG5leHBvcnRzLmhhcmRXcmFwID0gaGFyZFdyYXA7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=