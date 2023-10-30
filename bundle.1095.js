"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[1095],{

/***/ 91095:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {



var commands = [{
    name: "leftToRight",
    bindKey: { win: "Ctrl-Alt-Shift-L", mac: "Command-Alt-Shift-L" },
    exec: function(editor) {
        editor.session.$bidiHandler.setRtlDirection(editor, false);
    },
    readOnly: true
}, {
    name: "rightToLeft",
    bindKey: { win: "Ctrl-Alt-Shift-R",  mac: "Command-Alt-Shift-R" },
    exec: function(editor) {
        editor.session.$bidiHandler.setRtlDirection(editor, true);
    },
    readOnly: true
}];

var Editor = (__webpack_require__(82880)/* .Editor */ .M);
(__webpack_require__(13188).defineOptions)(Editor.prototype, "editor", {
    rtlText: {
        set: function(val) {
            if (val) {
                this.on("change", onChange);
                this.on("changeSelection", onChangeSelection);
                this.renderer.on("afterRender", updateLineDirection);
                this.commands.on("exec", onCommandEmitted);
                this.commands.addCommands(commands);
            } else {
                this.off("change", onChange);
                this.off("changeSelection", onChangeSelection);
                this.renderer.off("afterRender", updateLineDirection);
                this.commands.off("exec", onCommandEmitted);
                this.commands.removeCommands(commands);
                clearTextLayer(this.renderer);
            }
            this.renderer.updateFull();
        }
    },
    rtl: {
        set: function(val) {
            this.session.$bidiHandler.$isRtl = val;
            if (val) {
                this.setOption("rtlText", false);
                this.renderer.on("afterRender", updateLineDirection);
                this.session.$bidiHandler.seenBidi = true;
            } else {
                this.renderer.off("afterRender", updateLineDirection);
                clearTextLayer(this.renderer);
            }
            this.renderer.updateFull();
        }
    }
});

/**
 * Whenever the selection is changed, prevent cursor (lead) to be positioned at
 * position 0 of right-to-left line in order to maintain the RLE marker at this position.
 * When cursor reaches position 0, either advance it to position 1 of current line (default) 
 * or to last position of previous line (if it comes from position 1 as the result of commands
 * mentioned in 'onCommandEmitted' event handler).
 * This serves few purposes:
 * - ensures cursor visual movement as if RLE mark doesn't exist.
 * - prevents character insertion before RLE mark.
 * - prevents RLE mark removal when 'delete' is pressed when cursot stays at position 0.         
 * - ensures RLE mark removal on line merge, when 'delete' is pressed and cursor stays 
 *   at last position of previous line and when 'backspace' is pressed and cursor  stays at
 *   first position of current line. This is achived by hacking range boundaries on 'remove' operation.
 **/
function onChangeSelection(e, editor) {
    var lead = editor.getSelection().lead;
    if (editor.session.$bidiHandler.isRtlLine(lead.row)) {
        if (lead.column === 0) {
            if (editor.session.$bidiHandler.isMoveLeftOperation && lead.row > 0) {
                editor.getSelection().moveCursorTo(lead.row - 1, editor.session.getLine(lead.row - 1).length);
            } else {
                if (editor.getSelection().isEmpty())
                    lead.column += 1;
                else
                    lead.setPosition(lead.row, lead.column + 1);
            }
        }
    }
}

function onCommandEmitted(commadEvent) {
    commadEvent.editor.session.$bidiHandler.isMoveLeftOperation = /gotoleft|selectleft|backspace|removewordleft/.test(commadEvent.command.name);
}

/**
 * Whenever the document is changed make sure that line break operatin
 * on right-to-left line (like pressing Enter or pasting multi-line text)
 * produces new right-to-left lines
 **/
function onChange(delta, editor) {
    var session = editor.session;
    session.$bidiHandler.currentRow = null;
    if (session.$bidiHandler.isRtlLine(delta.start.row) && delta.action === 'insert' && delta.lines.length > 1) {
        for (var row = delta.start.row; row < delta.end.row; row++) {
            if (session.getLine(row + 1).charAt(0) !== session.$bidiHandler.RLE)
                session.doc.$lines[row + 1] = session.$bidiHandler.RLE + session.getLine(row + 1);
        }
    }
}

function updateLineDirection(e, renderer) {
    var session = renderer.session;
    var $bidiHandler = session.$bidiHandler;
    var cells = renderer.$textLayer.$lines.cells;
    var width = renderer.layerConfig.width - renderer.layerConfig.padding + "px";
    cells.forEach(function(cell) {
        var style = cell.element.style;
        if ($bidiHandler && $bidiHandler.isRtlLine(cell.row)) {
            style.direction = "rtl";
            style.textAlign = "right";
            style.width = width;
        } else {
            style.direction = "";
            style.textAlign = "";
            style.width = "";
        }
    });
}

function clearTextLayer(renderer) {
    var lines = renderer.$textLayer.$lines;
    lines.cells.forEach(clear);
    lines.cellCache.forEach(clear);
    function clear(cell) {
        var style = cell.element.style;
        style.direction = style.textAlign = style.width = "";
    }
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjEwOTUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWI7QUFDQTtBQUNBLGVBQWUscURBQXFEO0FBQ3BFO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxlQUFlLHNEQUFzRDtBQUNyRTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsQ0FBQzs7QUFFRCxhQUFhLDRDQUEyQjtBQUN4QywwQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxxQkFBcUI7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL2V4dC9ydGwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBjb21tYW5kcyA9IFt7XG4gICAgbmFtZTogXCJsZWZ0VG9SaWdodFwiLFxuICAgIGJpbmRLZXk6IHsgd2luOiBcIkN0cmwtQWx0LVNoaWZ0LUxcIiwgbWFjOiBcIkNvbW1hbmQtQWx0LVNoaWZ0LUxcIiB9LFxuICAgIGV4ZWM6IGZ1bmN0aW9uKGVkaXRvcikge1xuICAgICAgICBlZGl0b3Iuc2Vzc2lvbi4kYmlkaUhhbmRsZXIuc2V0UnRsRGlyZWN0aW9uKGVkaXRvciwgZmFsc2UpO1xuICAgIH0sXG4gICAgcmVhZE9ubHk6IHRydWVcbn0sIHtcbiAgICBuYW1lOiBcInJpZ2h0VG9MZWZ0XCIsXG4gICAgYmluZEtleTogeyB3aW46IFwiQ3RybC1BbHQtU2hpZnQtUlwiLCAgbWFjOiBcIkNvbW1hbmQtQWx0LVNoaWZ0LVJcIiB9LFxuICAgIGV4ZWM6IGZ1bmN0aW9uKGVkaXRvcikge1xuICAgICAgICBlZGl0b3Iuc2Vzc2lvbi4kYmlkaUhhbmRsZXIuc2V0UnRsRGlyZWN0aW9uKGVkaXRvciwgdHJ1ZSk7XG4gICAgfSxcbiAgICByZWFkT25seTogdHJ1ZVxufV07XG5cbnZhciBFZGl0b3IgPSByZXF1aXJlKFwiLi4vZWRpdG9yXCIpLkVkaXRvcjtcbnJlcXVpcmUoXCIuLi9jb25maWdcIikuZGVmaW5lT3B0aW9ucyhFZGl0b3IucHJvdG90eXBlLCBcImVkaXRvclwiLCB7XG4gICAgcnRsVGV4dDoge1xuICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgICAgIHRoaXMub24oXCJjaGFuZ2VcIiwgb25DaGFuZ2UpO1xuICAgICAgICAgICAgICAgIHRoaXMub24oXCJjaGFuZ2VTZWxlY3Rpb25cIiwgb25DaGFuZ2VTZWxlY3Rpb24pO1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIub24oXCJhZnRlclJlbmRlclwiLCB1cGRhdGVMaW5lRGlyZWN0aW9uKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbW1hbmRzLm9uKFwiZXhlY1wiLCBvbkNvbW1hbmRFbWl0dGVkKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbW1hbmRzLmFkZENvbW1hbmRzKGNvbW1hbmRzKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vZmYoXCJjaGFuZ2VcIiwgb25DaGFuZ2UpO1xuICAgICAgICAgICAgICAgIHRoaXMub2ZmKFwiY2hhbmdlU2VsZWN0aW9uXCIsIG9uQ2hhbmdlU2VsZWN0aW9uKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLm9mZihcImFmdGVyUmVuZGVyXCIsIHVwZGF0ZUxpbmVEaXJlY3Rpb24pO1xuICAgICAgICAgICAgICAgIHRoaXMuY29tbWFuZHMub2ZmKFwiZXhlY1wiLCBvbkNvbW1hbmRFbWl0dGVkKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbW1hbmRzLnJlbW92ZUNvbW1hbmRzKGNvbW1hbmRzKTtcbiAgICAgICAgICAgICAgICBjbGVhclRleHRMYXllcih0aGlzLnJlbmRlcmVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIudXBkYXRlRnVsbCgpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBydGw6IHtcbiAgICAgICAgc2V0OiBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgICAgIHRoaXMuc2Vzc2lvbi4kYmlkaUhhbmRsZXIuJGlzUnRsID0gdmFsO1xuICAgICAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0T3B0aW9uKFwicnRsVGV4dFwiLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5vbihcImFmdGVyUmVuZGVyXCIsIHVwZGF0ZUxpbmVEaXJlY3Rpb24pO1xuICAgICAgICAgICAgICAgIHRoaXMuc2Vzc2lvbi4kYmlkaUhhbmRsZXIuc2VlbkJpZGkgPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLm9mZihcImFmdGVyUmVuZGVyXCIsIHVwZGF0ZUxpbmVEaXJlY3Rpb24pO1xuICAgICAgICAgICAgICAgIGNsZWFyVGV4dExheWVyKHRoaXMucmVuZGVyZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci51cGRhdGVGdWxsKCk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuLyoqXG4gKiBXaGVuZXZlciB0aGUgc2VsZWN0aW9uIGlzIGNoYW5nZWQsIHByZXZlbnQgY3Vyc29yIChsZWFkKSB0byBiZSBwb3NpdGlvbmVkIGF0XG4gKiBwb3NpdGlvbiAwIG9mIHJpZ2h0LXRvLWxlZnQgbGluZSBpbiBvcmRlciB0byBtYWludGFpbiB0aGUgUkxFIG1hcmtlciBhdCB0aGlzIHBvc2l0aW9uLlxuICogV2hlbiBjdXJzb3IgcmVhY2hlcyBwb3NpdGlvbiAwLCBlaXRoZXIgYWR2YW5jZSBpdCB0byBwb3NpdGlvbiAxIG9mIGN1cnJlbnQgbGluZSAoZGVmYXVsdCkgXG4gKiBvciB0byBsYXN0IHBvc2l0aW9uIG9mIHByZXZpb3VzIGxpbmUgKGlmIGl0IGNvbWVzIGZyb20gcG9zaXRpb24gMSBhcyB0aGUgcmVzdWx0IG9mIGNvbW1hbmRzXG4gKiBtZW50aW9uZWQgaW4gJ29uQ29tbWFuZEVtaXR0ZWQnIGV2ZW50IGhhbmRsZXIpLlxuICogVGhpcyBzZXJ2ZXMgZmV3IHB1cnBvc2VzOlxuICogLSBlbnN1cmVzIGN1cnNvciB2aXN1YWwgbW92ZW1lbnQgYXMgaWYgUkxFIG1hcmsgZG9lc24ndCBleGlzdC5cbiAqIC0gcHJldmVudHMgY2hhcmFjdGVyIGluc2VydGlvbiBiZWZvcmUgUkxFIG1hcmsuXG4gKiAtIHByZXZlbnRzIFJMRSBtYXJrIHJlbW92YWwgd2hlbiAnZGVsZXRlJyBpcyBwcmVzc2VkIHdoZW4gY3Vyc290IHN0YXlzIGF0IHBvc2l0aW9uIDAuICAgICAgICAgXG4gKiAtIGVuc3VyZXMgUkxFIG1hcmsgcmVtb3ZhbCBvbiBsaW5lIG1lcmdlLCB3aGVuICdkZWxldGUnIGlzIHByZXNzZWQgYW5kIGN1cnNvciBzdGF5cyBcbiAqICAgYXQgbGFzdCBwb3NpdGlvbiBvZiBwcmV2aW91cyBsaW5lIGFuZCB3aGVuICdiYWNrc3BhY2UnIGlzIHByZXNzZWQgYW5kIGN1cnNvciAgc3RheXMgYXRcbiAqICAgZmlyc3QgcG9zaXRpb24gb2YgY3VycmVudCBsaW5lLiBUaGlzIGlzIGFjaGl2ZWQgYnkgaGFja2luZyByYW5nZSBib3VuZGFyaWVzIG9uICdyZW1vdmUnIG9wZXJhdGlvbi5cbiAqKi9cbmZ1bmN0aW9uIG9uQ2hhbmdlU2VsZWN0aW9uKGUsIGVkaXRvcikge1xuICAgIHZhciBsZWFkID0gZWRpdG9yLmdldFNlbGVjdGlvbigpLmxlYWQ7XG4gICAgaWYgKGVkaXRvci5zZXNzaW9uLiRiaWRpSGFuZGxlci5pc1J0bExpbmUobGVhZC5yb3cpKSB7XG4gICAgICAgIGlmIChsZWFkLmNvbHVtbiA9PT0gMCkge1xuICAgICAgICAgICAgaWYgKGVkaXRvci5zZXNzaW9uLiRiaWRpSGFuZGxlci5pc01vdmVMZWZ0T3BlcmF0aW9uICYmIGxlYWQucm93ID4gMCkge1xuICAgICAgICAgICAgICAgIGVkaXRvci5nZXRTZWxlY3Rpb24oKS5tb3ZlQ3Vyc29yVG8obGVhZC5yb3cgLSAxLCBlZGl0b3Iuc2Vzc2lvbi5nZXRMaW5lKGxlYWQucm93IC0gMSkubGVuZ3RoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKGVkaXRvci5nZXRTZWxlY3Rpb24oKS5pc0VtcHR5KCkpXG4gICAgICAgICAgICAgICAgICAgIGxlYWQuY29sdW1uICs9IDE7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBsZWFkLnNldFBvc2l0aW9uKGxlYWQucm93LCBsZWFkLmNvbHVtbiArIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBvbkNvbW1hbmRFbWl0dGVkKGNvbW1hZEV2ZW50KSB7XG4gICAgY29tbWFkRXZlbnQuZWRpdG9yLnNlc3Npb24uJGJpZGlIYW5kbGVyLmlzTW92ZUxlZnRPcGVyYXRpb24gPSAvZ290b2xlZnR8c2VsZWN0bGVmdHxiYWNrc3BhY2V8cmVtb3Zld29yZGxlZnQvLnRlc3QoY29tbWFkRXZlbnQuY29tbWFuZC5uYW1lKTtcbn1cblxuLyoqXG4gKiBXaGVuZXZlciB0aGUgZG9jdW1lbnQgaXMgY2hhbmdlZCBtYWtlIHN1cmUgdGhhdCBsaW5lIGJyZWFrIG9wZXJhdGluXG4gKiBvbiByaWdodC10by1sZWZ0IGxpbmUgKGxpa2UgcHJlc3NpbmcgRW50ZXIgb3IgcGFzdGluZyBtdWx0aS1saW5lIHRleHQpXG4gKiBwcm9kdWNlcyBuZXcgcmlnaHQtdG8tbGVmdCBsaW5lc1xuICoqL1xuZnVuY3Rpb24gb25DaGFuZ2UoZGVsdGEsIGVkaXRvcikge1xuICAgIHZhciBzZXNzaW9uID0gZWRpdG9yLnNlc3Npb247XG4gICAgc2Vzc2lvbi4kYmlkaUhhbmRsZXIuY3VycmVudFJvdyA9IG51bGw7XG4gICAgaWYgKHNlc3Npb24uJGJpZGlIYW5kbGVyLmlzUnRsTGluZShkZWx0YS5zdGFydC5yb3cpICYmIGRlbHRhLmFjdGlvbiA9PT0gJ2luc2VydCcgJiYgZGVsdGEubGluZXMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciByb3cgPSBkZWx0YS5zdGFydC5yb3c7IHJvdyA8IGRlbHRhLmVuZC5yb3c7IHJvdysrKSB7XG4gICAgICAgICAgICBpZiAoc2Vzc2lvbi5nZXRMaW5lKHJvdyArIDEpLmNoYXJBdCgwKSAhPT0gc2Vzc2lvbi4kYmlkaUhhbmRsZXIuUkxFKVxuICAgICAgICAgICAgICAgIHNlc3Npb24uZG9jLiRsaW5lc1tyb3cgKyAxXSA9IHNlc3Npb24uJGJpZGlIYW5kbGVyLlJMRSArIHNlc3Npb24uZ2V0TGluZShyb3cgKyAxKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlTGluZURpcmVjdGlvbihlLCByZW5kZXJlcikge1xuICAgIHZhciBzZXNzaW9uID0gcmVuZGVyZXIuc2Vzc2lvbjtcbiAgICB2YXIgJGJpZGlIYW5kbGVyID0gc2Vzc2lvbi4kYmlkaUhhbmRsZXI7XG4gICAgdmFyIGNlbGxzID0gcmVuZGVyZXIuJHRleHRMYXllci4kbGluZXMuY2VsbHM7XG4gICAgdmFyIHdpZHRoID0gcmVuZGVyZXIubGF5ZXJDb25maWcud2lkdGggLSByZW5kZXJlci5sYXllckNvbmZpZy5wYWRkaW5nICsgXCJweFwiO1xuICAgIGNlbGxzLmZvckVhY2goZnVuY3Rpb24oY2VsbCkge1xuICAgICAgICB2YXIgc3R5bGUgPSBjZWxsLmVsZW1lbnQuc3R5bGU7XG4gICAgICAgIGlmICgkYmlkaUhhbmRsZXIgJiYgJGJpZGlIYW5kbGVyLmlzUnRsTGluZShjZWxsLnJvdykpIHtcbiAgICAgICAgICAgIHN0eWxlLmRpcmVjdGlvbiA9IFwicnRsXCI7XG4gICAgICAgICAgICBzdHlsZS50ZXh0QWxpZ24gPSBcInJpZ2h0XCI7XG4gICAgICAgICAgICBzdHlsZS53aWR0aCA9IHdpZHRoO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3R5bGUuZGlyZWN0aW9uID0gXCJcIjtcbiAgICAgICAgICAgIHN0eWxlLnRleHRBbGlnbiA9IFwiXCI7XG4gICAgICAgICAgICBzdHlsZS53aWR0aCA9IFwiXCI7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gY2xlYXJUZXh0TGF5ZXIocmVuZGVyZXIpIHtcbiAgICB2YXIgbGluZXMgPSByZW5kZXJlci4kdGV4dExheWVyLiRsaW5lcztcbiAgICBsaW5lcy5jZWxscy5mb3JFYWNoKGNsZWFyKTtcbiAgICBsaW5lcy5jZWxsQ2FjaGUuZm9yRWFjaChjbGVhcik7XG4gICAgZnVuY3Rpb24gY2xlYXIoY2VsbCkge1xuICAgICAgICB2YXIgc3R5bGUgPSBjZWxsLmVsZW1lbnQuc3R5bGU7XG4gICAgICAgIHN0eWxlLmRpcmVjdGlvbiA9IHN0eWxlLnRleHRBbGlnbiA9IHN0eWxlLndpZHRoID0gXCJcIjtcbiAgICB9XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=