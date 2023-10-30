"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[2165],{

/***/ 52165:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var Range = (__webpack_require__(59082)/* .Range */ .e);

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

var Editor = (__webpack_require__(82880)/* .Editor */ .M);
(__webpack_require__(13188).defineOptions)(Editor.prototype, "editor", {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjIxNjUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsWUFBWSwyQ0FBeUI7O0FBRXJDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGFBQWEsNENBQTJCO0FBQ3hDLDBDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxDQUFDOztBQUVELGdCQUFnQiIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL2V4dC9oYXJkd3JhcC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIFJhbmdlID0gcmVxdWlyZShcIi4uL3JhbmdlXCIpLlJhbmdlO1xuXG5mdW5jdGlvbiBoYXJkV3JhcChlZGl0b3IsIG9wdGlvbnMpIHtcbiAgICB2YXIgbWF4ID0gb3B0aW9ucy5jb2x1bW4gfHwgZWRpdG9yLmdldE9wdGlvbihcInByaW50TWFyZ2luQ29sdW1uXCIpO1xuICAgIHZhciBhbGxvd01lcmdlID0gb3B0aW9ucy5hbGxvd01lcmdlICE9IGZhbHNlO1xuICAgICAgIFxuICAgIHZhciByb3cgPSBNYXRoLm1pbihvcHRpb25zLnN0YXJ0Um93LCBvcHRpb25zLmVuZFJvdyk7XG4gICAgdmFyIGVuZFJvdyA9IE1hdGgubWF4KG9wdGlvbnMuc3RhcnRSb3csIG9wdGlvbnMuZW5kUm93KTtcbiAgICBcbiAgICB2YXIgc2Vzc2lvbiA9IGVkaXRvci5zZXNzaW9uO1xuICAgIFxuICAgIHdoaWxlIChyb3cgPD0gZW5kUm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgIGlmIChsaW5lLmxlbmd0aCA+IG1heCkge1xuICAgICAgICAgICAgdmFyIHNwYWNlID0gZmluZFNwYWNlKGxpbmUsIG1heCwgNSk7XG4gICAgICAgICAgICBpZiAoc3BhY2UpIHtcbiAgICAgICAgICAgICAgICB2YXIgaW5kZW50YXRpb24gPSAvXlxccyovLmV4ZWMobGluZSlbMF07XG4gICAgICAgICAgICAgICAgc2Vzc2lvbi5yZXBsYWNlKG5ldyBSYW5nZShyb3csc3BhY2Uuc3RhcnQscm93LHNwYWNlLmVuZCksIFwiXFxuXCIgKyBpbmRlbnRhdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbmRSb3crKztcbiAgICAgICAgfSBlbHNlIGlmIChhbGxvd01lcmdlICYmIC9cXFMvLnRlc3QobGluZSkgJiYgcm93ICE9IGVuZFJvdykge1xuICAgICAgICAgICAgdmFyIG5leHRMaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyArIDEpO1xuICAgICAgICAgICAgaWYgKG5leHRMaW5lICYmIC9cXFMvLnRlc3QobmV4dExpbmUpKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRyaW1tZWRMaW5lID0gbGluZS5yZXBsYWNlKC9cXHMrJC8sIFwiXCIpO1xuICAgICAgICAgICAgICAgIHZhciB0cmltbWVkTmV4dExpbmUgPSBuZXh0TGluZS5yZXBsYWNlKC9eXFxzKy8sIFwiXCIpO1xuICAgICAgICAgICAgICAgIHZhciBtZXJnZWRMaW5lID0gdHJpbW1lZExpbmUgKyBcIiBcIiArIHRyaW1tZWROZXh0TGluZTtcblxuICAgICAgICAgICAgICAgIHZhciBzcGFjZSA9IGZpbmRTcGFjZShtZXJnZWRMaW5lLCBtYXgsIDUpO1xuICAgICAgICAgICAgICAgIGlmIChzcGFjZSAmJiBzcGFjZS5zdGFydCA+IHRyaW1tZWRMaW5lLmxlbmd0aCB8fCBtZXJnZWRMaW5lLmxlbmd0aCA8IG1heCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVwbGFjZVJhbmdlID0gbmV3IFJhbmdlKHJvdyx0cmltbWVkTGluZS5sZW5ndGgscm93ICsgMSxuZXh0TGluZS5sZW5ndGggLSB0cmltbWVkTmV4dExpbmUubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgc2Vzc2lvbi5yZXBsYWNlKHJlcGxhY2VSYW5nZSwgXCIgXCIpO1xuICAgICAgICAgICAgICAgICAgICByb3ctLTtcbiAgICAgICAgICAgICAgICAgICAgZW5kUm93LS07XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0cmltbWVkTGluZS5sZW5ndGggPCBsaW5lLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBzZXNzaW9uLnJlbW92ZShuZXcgUmFuZ2Uocm93LCB0cmltbWVkTGluZS5sZW5ndGgsIHJvdywgbGluZS5sZW5ndGgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcm93Kys7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZmluZFNwYWNlKGxpbmUsIG1heCwgbWluKSB7XG4gICAgICAgIGlmIChsaW5lLmxlbmd0aCA8IG1heClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdmFyIGJlZm9yZSA9IGxpbmUuc2xpY2UoMCwgbWF4KTtcbiAgICAgICAgdmFyIGFmdGVyID0gbGluZS5zbGljZShtYXgpO1xuICAgICAgICB2YXIgc3BhY2VBZnRlciA9IC9eKD86KFxccyspfChcXFMrKShcXHMrKSkvLmV4ZWMoYWZ0ZXIpO1xuICAgICAgICB2YXIgc3BhY2VCZWZvcmUgPSAvKD86KFxccyspfChcXHMrKShcXFMrKSkkLy5leGVjKGJlZm9yZSk7XG4gICAgICAgIHZhciBzdGFydCA9IDA7XG4gICAgICAgIHZhciBlbmQgPSAwO1xuICAgICAgICBpZiAoc3BhY2VCZWZvcmUgJiYgIXNwYWNlQmVmb3JlWzJdKSB7XG4gICAgICAgICAgICBzdGFydCA9IG1heCAtIHNwYWNlQmVmb3JlWzFdLmxlbmd0aDtcbiAgICAgICAgICAgIGVuZCA9IG1heDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3BhY2VBZnRlciAmJiAhc3BhY2VBZnRlclsyXSkge1xuICAgICAgICAgICAgaWYgKCFzdGFydClcbiAgICAgICAgICAgICAgICBzdGFydCA9IG1heDtcbiAgICAgICAgICAgIGVuZCA9IG1heCArIHNwYWNlQWZ0ZXJbMV0ubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdGFydCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzdGFydDogc3RhcnQsXG4gICAgICAgICAgICAgICAgZW5kOiBlbmRcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNwYWNlQmVmb3JlICYmIHNwYWNlQmVmb3JlWzJdICYmIHNwYWNlQmVmb3JlLmluZGV4ID4gbWluKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHN0YXJ0OiBzcGFjZUJlZm9yZS5pbmRleCxcbiAgICAgICAgICAgICAgICBlbmQ6IHNwYWNlQmVmb3JlLmluZGV4ICsgc3BhY2VCZWZvcmVbMl0ubGVuZ3RoXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGlmIChzcGFjZUFmdGVyICYmIHNwYWNlQWZ0ZXJbMl0pIHtcbiAgICAgICAgICAgIHN0YXJ0ID0gIG1heCArIHNwYWNlQWZ0ZXJbMl0ubGVuZ3RoO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzdGFydDogc3RhcnQsXG4gICAgICAgICAgICAgICAgZW5kOiBzdGFydCArIHNwYWNlQWZ0ZXJbM10ubGVuZ3RoXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuXG59XG5cbmZ1bmN0aW9uIHdyYXBBZnRlcklucHV0KGUpIHtcbiAgICBpZiAoZS5jb21tYW5kLm5hbWUgPT0gXCJpbnNlcnRzdHJpbmdcIiAmJiAvXFxTLy50ZXN0KGUuYXJncykpIHtcbiAgICAgICAgdmFyIGVkaXRvciA9IGUuZWRpdG9yO1xuICAgICAgICB2YXIgY3Vyc29yID0gZWRpdG9yLnNlbGVjdGlvbi5jdXJzb3I7XG4gICAgICAgIGlmIChjdXJzb3IuY29sdW1uIDw9IGVkaXRvci5yZW5kZXJlci4kcHJpbnRNYXJnaW5Db2x1bW4pIHJldHVybjtcbiAgICAgICAgdmFyIGxhc3REZWx0YSA9IGVkaXRvci5zZXNzaW9uLiR1bmRvTWFuYWdlci4kbGFzdERlbHRhO1xuXG4gICAgICAgIGhhcmRXcmFwKGVkaXRvciwge1xuICAgICAgICAgICAgc3RhcnRSb3c6IGN1cnNvci5yb3csIGVuZFJvdzogY3Vyc29yLnJvdyxcbiAgICAgICAgICAgIGFsbG93TWVyZ2U6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAobGFzdERlbHRhICE9IGVkaXRvci5zZXNzaW9uLiR1bmRvTWFuYWdlci4kbGFzdERlbHRhKSBcbiAgICAgICAgICAgIGVkaXRvci5zZXNzaW9uLm1hcmtVbmRvR3JvdXAoKTtcbiAgICB9XG59XG5cbnZhciBFZGl0b3IgPSByZXF1aXJlKFwiLi4vZWRpdG9yXCIpLkVkaXRvcjtcbnJlcXVpcmUoXCIuLi9jb25maWdcIikuZGVmaW5lT3B0aW9ucyhFZGl0b3IucHJvdG90eXBlLCBcImVkaXRvclwiLCB7XG4gICAgaGFyZFdyYXA6IHtcbiAgICAgICAgc2V0OiBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbW1hbmRzLm9uKFwiYWZ0ZXJFeGVjXCIsIHdyYXBBZnRlcklucHV0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb21tYW5kcy5vZmYoXCJhZnRlckV4ZWNcIiwgd3JhcEFmdGVySW5wdXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB2YWx1ZTogZmFsc2VcbiAgICB9XG59KTtcblxuZXhwb3J0cy5oYXJkV3JhcCA9IGhhcmRXcmFwO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9