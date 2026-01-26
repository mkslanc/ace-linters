"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[7413],{

/***/ 87413:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/**
 * ## Right-to-Left (RTL) text support extension
 *
 * Provides bidirectional text support enabling proper rendering and editing of RTL languages such as Arabic, Hebrew,
 * and Persian. Handles text direction detection, cursor positioning, and ensures correct visual behavior for mixed
 * LTR/RTL content. Includes keyboard shortcuts for manual text direction control and automatic
 * RLE (Right-to-Left Embedding) marker management.
 *
 * **Configuration Options:**
 * - `rtlText`: Enable automatic RTL text detection and handling
 * - `rtl`: Force RTL direction for the entire editor
 *
 * **Keyboard Shortcuts:**
 * - `Ctrl-Alt-Shift-L` (Win) / `Cmd-Alt-Shift-L` (Mac): Force left-to-right direction
 * - `Ctrl-Alt-Shift-R` (Win) / `Cmd-Alt-Shift-R` (Mac): Force right-to-left direction
 *
 * **Usage:**
 * ```javascript
 * editor.setOptions({
 *   rtlText: true,  // Enable automatic RTL detection
 *   rtl: false      // Or force RTL direction
 * });
 * ```
 *
 * @module
 */




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

var Editor = (__webpack_require__(27258).Editor);
(__webpack_require__(76321).defineOptions)(Editor.prototype, "editor", {
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
 * @param {any} e
 * @param {Editor} editor
 */
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
 * @param {import("../../ace-internal").Ace.Delta} delta
 * @param {Editor} editor
 */
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

/**
 * @param {any} e
 * @param {import("../virtual_renderer").VirtualRenderer} renderer
 */
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

/**
 * @param {import("../virtual_renderer").VirtualRenderer} renderer
 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjc0MTMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBOzs7QUFHYTs7QUFFYjtBQUNBO0FBQ0EsZUFBZSxxREFBcUQ7QUFDcEU7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLENBQUM7QUFDRDtBQUNBLGVBQWUsc0RBQXNEO0FBQ3JFO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxDQUFDOztBQUVELGFBQWEsbUNBQTJCO0FBQ3hDLDBDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxLQUFLO0FBQ2hCLFdBQVcsUUFBUTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsd0NBQXdDO0FBQ25ELFdBQVcsUUFBUTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLHFCQUFxQjtBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsV0FBVyxLQUFLO0FBQ2hCLFdBQVcsK0NBQStDO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBLFdBQVcsK0NBQStDO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvZXh0L3J0bC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqICMjIFJpZ2h0LXRvLUxlZnQgKFJUTCkgdGV4dCBzdXBwb3J0IGV4dGVuc2lvblxuICpcbiAqIFByb3ZpZGVzIGJpZGlyZWN0aW9uYWwgdGV4dCBzdXBwb3J0IGVuYWJsaW5nIHByb3BlciByZW5kZXJpbmcgYW5kIGVkaXRpbmcgb2YgUlRMIGxhbmd1YWdlcyBzdWNoIGFzIEFyYWJpYywgSGVicmV3LFxuICogYW5kIFBlcnNpYW4uIEhhbmRsZXMgdGV4dCBkaXJlY3Rpb24gZGV0ZWN0aW9uLCBjdXJzb3IgcG9zaXRpb25pbmcsIGFuZCBlbnN1cmVzIGNvcnJlY3QgdmlzdWFsIGJlaGF2aW9yIGZvciBtaXhlZFxuICogTFRSL1JUTCBjb250ZW50LiBJbmNsdWRlcyBrZXlib2FyZCBzaG9ydGN1dHMgZm9yIG1hbnVhbCB0ZXh0IGRpcmVjdGlvbiBjb250cm9sIGFuZCBhdXRvbWF0aWNcbiAqIFJMRSAoUmlnaHQtdG8tTGVmdCBFbWJlZGRpbmcpIG1hcmtlciBtYW5hZ2VtZW50LlxuICpcbiAqICoqQ29uZmlndXJhdGlvbiBPcHRpb25zOioqXG4gKiAtIGBydGxUZXh0YDogRW5hYmxlIGF1dG9tYXRpYyBSVEwgdGV4dCBkZXRlY3Rpb24gYW5kIGhhbmRsaW5nXG4gKiAtIGBydGxgOiBGb3JjZSBSVEwgZGlyZWN0aW9uIGZvciB0aGUgZW50aXJlIGVkaXRvclxuICpcbiAqICoqS2V5Ym9hcmQgU2hvcnRjdXRzOioqXG4gKiAtIGBDdHJsLUFsdC1TaGlmdC1MYCAoV2luKSAvIGBDbWQtQWx0LVNoaWZ0LUxgIChNYWMpOiBGb3JjZSBsZWZ0LXRvLXJpZ2h0IGRpcmVjdGlvblxuICogLSBgQ3RybC1BbHQtU2hpZnQtUmAgKFdpbikgLyBgQ21kLUFsdC1TaGlmdC1SYCAoTWFjKTogRm9yY2UgcmlnaHQtdG8tbGVmdCBkaXJlY3Rpb25cbiAqXG4gKiAqKlVzYWdlOioqXG4gKiBgYGBqYXZhc2NyaXB0XG4gKiBlZGl0b3Iuc2V0T3B0aW9ucyh7XG4gKiAgIHJ0bFRleHQ6IHRydWUsICAvLyBFbmFibGUgYXV0b21hdGljIFJUTCBkZXRlY3Rpb25cbiAqICAgcnRsOiBmYWxzZSAgICAgIC8vIE9yIGZvcmNlIFJUTCBkaXJlY3Rpb25cbiAqIH0pO1xuICogYGBgXG4gKlxuICogQG1vZHVsZVxuICovXG5cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBjb21tYW5kcyA9IFt7XG4gICAgbmFtZTogXCJsZWZ0VG9SaWdodFwiLFxuICAgIGJpbmRLZXk6IHsgd2luOiBcIkN0cmwtQWx0LVNoaWZ0LUxcIiwgbWFjOiBcIkNvbW1hbmQtQWx0LVNoaWZ0LUxcIiB9LFxuICAgIGV4ZWM6IGZ1bmN0aW9uKGVkaXRvcikge1xuICAgICAgICBlZGl0b3Iuc2Vzc2lvbi4kYmlkaUhhbmRsZXIuc2V0UnRsRGlyZWN0aW9uKGVkaXRvciwgZmFsc2UpO1xuICAgIH0sXG4gICAgcmVhZE9ubHk6IHRydWVcbn0sIHtcbiAgICBuYW1lOiBcInJpZ2h0VG9MZWZ0XCIsXG4gICAgYmluZEtleTogeyB3aW46IFwiQ3RybC1BbHQtU2hpZnQtUlwiLCAgbWFjOiBcIkNvbW1hbmQtQWx0LVNoaWZ0LVJcIiB9LFxuICAgIGV4ZWM6IGZ1bmN0aW9uKGVkaXRvcikge1xuICAgICAgICBlZGl0b3Iuc2Vzc2lvbi4kYmlkaUhhbmRsZXIuc2V0UnRsRGlyZWN0aW9uKGVkaXRvciwgdHJ1ZSk7XG4gICAgfSxcbiAgICByZWFkT25seTogdHJ1ZVxufV07XG5cbnZhciBFZGl0b3IgPSByZXF1aXJlKFwiLi4vZWRpdG9yXCIpLkVkaXRvcjtcbnJlcXVpcmUoXCIuLi9jb25maWdcIikuZGVmaW5lT3B0aW9ucyhFZGl0b3IucHJvdG90eXBlLCBcImVkaXRvclwiLCB7XG4gICAgcnRsVGV4dDoge1xuICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgICAgIHRoaXMub24oXCJjaGFuZ2VcIiwgb25DaGFuZ2UpO1xuICAgICAgICAgICAgICAgIHRoaXMub24oXCJjaGFuZ2VTZWxlY3Rpb25cIiwgb25DaGFuZ2VTZWxlY3Rpb24pO1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIub24oXCJhZnRlclJlbmRlclwiLCB1cGRhdGVMaW5lRGlyZWN0aW9uKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbW1hbmRzLm9uKFwiZXhlY1wiLCBvbkNvbW1hbmRFbWl0dGVkKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbW1hbmRzLmFkZENvbW1hbmRzKGNvbW1hbmRzKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vZmYoXCJjaGFuZ2VcIiwgb25DaGFuZ2UpO1xuICAgICAgICAgICAgICAgIHRoaXMub2ZmKFwiY2hhbmdlU2VsZWN0aW9uXCIsIG9uQ2hhbmdlU2VsZWN0aW9uKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLm9mZihcImFmdGVyUmVuZGVyXCIsIHVwZGF0ZUxpbmVEaXJlY3Rpb24pO1xuICAgICAgICAgICAgICAgIHRoaXMuY29tbWFuZHMub2ZmKFwiZXhlY1wiLCBvbkNvbW1hbmRFbWl0dGVkKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbW1hbmRzLnJlbW92ZUNvbW1hbmRzKGNvbW1hbmRzKTtcbiAgICAgICAgICAgICAgICBjbGVhclRleHRMYXllcih0aGlzLnJlbmRlcmVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIudXBkYXRlRnVsbCgpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBydGw6IHtcbiAgICAgICAgc2V0OiBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgICAgIHRoaXMuc2Vzc2lvbi4kYmlkaUhhbmRsZXIuJGlzUnRsID0gdmFsO1xuICAgICAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0T3B0aW9uKFwicnRsVGV4dFwiLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5vbihcImFmdGVyUmVuZGVyXCIsIHVwZGF0ZUxpbmVEaXJlY3Rpb24pO1xuICAgICAgICAgICAgICAgIHRoaXMuc2Vzc2lvbi4kYmlkaUhhbmRsZXIuc2VlbkJpZGkgPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLm9mZihcImFmdGVyUmVuZGVyXCIsIHVwZGF0ZUxpbmVEaXJlY3Rpb24pO1xuICAgICAgICAgICAgICAgIGNsZWFyVGV4dExheWVyKHRoaXMucmVuZGVyZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci51cGRhdGVGdWxsKCk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuLyoqXG4gKiBXaGVuZXZlciB0aGUgc2VsZWN0aW9uIGlzIGNoYW5nZWQsIHByZXZlbnQgY3Vyc29yIChsZWFkKSB0byBiZSBwb3NpdGlvbmVkIGF0XG4gKiBwb3NpdGlvbiAwIG9mIHJpZ2h0LXRvLWxlZnQgbGluZSBpbiBvcmRlciB0byBtYWludGFpbiB0aGUgUkxFIG1hcmtlciBhdCB0aGlzIHBvc2l0aW9uLlxuICogV2hlbiBjdXJzb3IgcmVhY2hlcyBwb3NpdGlvbiAwLCBlaXRoZXIgYWR2YW5jZSBpdCB0byBwb3NpdGlvbiAxIG9mIGN1cnJlbnQgbGluZSAoZGVmYXVsdCkgXG4gKiBvciB0byBsYXN0IHBvc2l0aW9uIG9mIHByZXZpb3VzIGxpbmUgKGlmIGl0IGNvbWVzIGZyb20gcG9zaXRpb24gMSBhcyB0aGUgcmVzdWx0IG9mIGNvbW1hbmRzXG4gKiBtZW50aW9uZWQgaW4gJ29uQ29tbWFuZEVtaXR0ZWQnIGV2ZW50IGhhbmRsZXIpLlxuICogVGhpcyBzZXJ2ZXMgZmV3IHB1cnBvc2VzOlxuICogLSBlbnN1cmVzIGN1cnNvciB2aXN1YWwgbW92ZW1lbnQgYXMgaWYgUkxFIG1hcmsgZG9lc24ndCBleGlzdC5cbiAqIC0gcHJldmVudHMgY2hhcmFjdGVyIGluc2VydGlvbiBiZWZvcmUgUkxFIG1hcmsuXG4gKiAtIHByZXZlbnRzIFJMRSBtYXJrIHJlbW92YWwgd2hlbiAnZGVsZXRlJyBpcyBwcmVzc2VkIHdoZW4gY3Vyc290IHN0YXlzIGF0IHBvc2l0aW9uIDAuICAgICAgICAgXG4gKiAtIGVuc3VyZXMgUkxFIG1hcmsgcmVtb3ZhbCBvbiBsaW5lIG1lcmdlLCB3aGVuICdkZWxldGUnIGlzIHByZXNzZWQgYW5kIGN1cnNvciBzdGF5cyBcbiAqICAgYXQgbGFzdCBwb3NpdGlvbiBvZiBwcmV2aW91cyBsaW5lIGFuZCB3aGVuICdiYWNrc3BhY2UnIGlzIHByZXNzZWQgYW5kIGN1cnNvciAgc3RheXMgYXRcbiAqICAgZmlyc3QgcG9zaXRpb24gb2YgY3VycmVudCBsaW5lLiBUaGlzIGlzIGFjaGl2ZWQgYnkgaGFja2luZyByYW5nZSBib3VuZGFyaWVzIG9uICdyZW1vdmUnIG9wZXJhdGlvbi5cbiAqIEBwYXJhbSB7YW55fSBlXG4gKiBAcGFyYW0ge0VkaXRvcn0gZWRpdG9yXG4gKi9cbmZ1bmN0aW9uIG9uQ2hhbmdlU2VsZWN0aW9uKGUsIGVkaXRvcikge1xuICAgIHZhciBsZWFkID0gZWRpdG9yLmdldFNlbGVjdGlvbigpLmxlYWQ7XG4gICAgaWYgKGVkaXRvci5zZXNzaW9uLiRiaWRpSGFuZGxlci5pc1J0bExpbmUobGVhZC5yb3cpKSB7XG4gICAgICAgIGlmIChsZWFkLmNvbHVtbiA9PT0gMCkge1xuICAgICAgICAgICAgaWYgKGVkaXRvci5zZXNzaW9uLiRiaWRpSGFuZGxlci5pc01vdmVMZWZ0T3BlcmF0aW9uICYmIGxlYWQucm93ID4gMCkge1xuICAgICAgICAgICAgICAgIGVkaXRvci5nZXRTZWxlY3Rpb24oKS5tb3ZlQ3Vyc29yVG8obGVhZC5yb3cgLSAxLCBlZGl0b3Iuc2Vzc2lvbi5nZXRMaW5lKGxlYWQucm93IC0gMSkubGVuZ3RoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKGVkaXRvci5nZXRTZWxlY3Rpb24oKS5pc0VtcHR5KCkpXG4gICAgICAgICAgICAgICAgICAgIGxlYWQuY29sdW1uICs9IDE7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBsZWFkLnNldFBvc2l0aW9uKGxlYWQucm93LCBsZWFkLmNvbHVtbiArIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBvbkNvbW1hbmRFbWl0dGVkKGNvbW1hZEV2ZW50KSB7XG4gICAgY29tbWFkRXZlbnQuZWRpdG9yLnNlc3Npb24uJGJpZGlIYW5kbGVyLmlzTW92ZUxlZnRPcGVyYXRpb24gPSAvZ290b2xlZnR8c2VsZWN0bGVmdHxiYWNrc3BhY2V8cmVtb3Zld29yZGxlZnQvLnRlc3QoY29tbWFkRXZlbnQuY29tbWFuZC5uYW1lKTtcbn1cblxuLyoqXG4gKiBXaGVuZXZlciB0aGUgZG9jdW1lbnQgaXMgY2hhbmdlZCBtYWtlIHN1cmUgdGhhdCBsaW5lIGJyZWFrIG9wZXJhdGluXG4gKiBvbiByaWdodC10by1sZWZ0IGxpbmUgKGxpa2UgcHJlc3NpbmcgRW50ZXIgb3IgcGFzdGluZyBtdWx0aS1saW5lIHRleHQpXG4gKiBwcm9kdWNlcyBuZXcgcmlnaHQtdG8tbGVmdCBsaW5lc1xuICogQHBhcmFtIHtpbXBvcnQoXCIuLi8uLi9hY2UtaW50ZXJuYWxcIikuQWNlLkRlbHRhfSBkZWx0YVxuICogQHBhcmFtIHtFZGl0b3J9IGVkaXRvclxuICovXG5mdW5jdGlvbiBvbkNoYW5nZShkZWx0YSwgZWRpdG9yKSB7XG4gICAgdmFyIHNlc3Npb24gPSBlZGl0b3Iuc2Vzc2lvbjtcbiAgICBzZXNzaW9uLiRiaWRpSGFuZGxlci5jdXJyZW50Um93ID0gbnVsbDtcbiAgICBpZiAoc2Vzc2lvbi4kYmlkaUhhbmRsZXIuaXNSdGxMaW5lKGRlbHRhLnN0YXJ0LnJvdykgJiYgZGVsdGEuYWN0aW9uID09PSAnaW5zZXJ0JyAmJiBkZWx0YS5saW5lcy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIHJvdyA9IGRlbHRhLnN0YXJ0LnJvdzsgcm93IDwgZGVsdGEuZW5kLnJvdzsgcm93KyspIHtcbiAgICAgICAgICAgIGlmIChzZXNzaW9uLmdldExpbmUocm93ICsgMSkuY2hhckF0KDApICE9PSBzZXNzaW9uLiRiaWRpSGFuZGxlci5STEUpXG4gICAgICAgICAgICAgICAgc2Vzc2lvbi5kb2MuJGxpbmVzW3JvdyArIDFdID0gc2Vzc2lvbi4kYmlkaUhhbmRsZXIuUkxFICsgc2Vzc2lvbi5nZXRMaW5lKHJvdyArIDEpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqIEBwYXJhbSB7YW55fSBlXG4gKiBAcGFyYW0ge2ltcG9ydChcIi4uL3ZpcnR1YWxfcmVuZGVyZXJcIikuVmlydHVhbFJlbmRlcmVyfSByZW5kZXJlclxuICovXG5mdW5jdGlvbiB1cGRhdGVMaW5lRGlyZWN0aW9uKGUsIHJlbmRlcmVyKSB7XG4gICAgdmFyIHNlc3Npb24gPSByZW5kZXJlci5zZXNzaW9uO1xuICAgIHZhciAkYmlkaUhhbmRsZXIgPSBzZXNzaW9uLiRiaWRpSGFuZGxlcjtcbiAgICB2YXIgY2VsbHMgPSByZW5kZXJlci4kdGV4dExheWVyLiRsaW5lcy5jZWxscztcbiAgICB2YXIgd2lkdGggPSByZW5kZXJlci5sYXllckNvbmZpZy53aWR0aCAtIHJlbmRlcmVyLmxheWVyQ29uZmlnLnBhZGRpbmcgKyBcInB4XCI7XG4gICAgY2VsbHMuZm9yRWFjaChmdW5jdGlvbihjZWxsKSB7XG4gICAgICAgIHZhciBzdHlsZSA9IGNlbGwuZWxlbWVudC5zdHlsZTtcbiAgICAgICAgaWYgKCRiaWRpSGFuZGxlciAmJiAkYmlkaUhhbmRsZXIuaXNSdGxMaW5lKGNlbGwucm93KSkge1xuICAgICAgICAgICAgc3R5bGUuZGlyZWN0aW9uID0gXCJydGxcIjtcbiAgICAgICAgICAgIHN0eWxlLnRleHRBbGlnbiA9IFwicmlnaHRcIjtcbiAgICAgICAgICAgIHN0eWxlLndpZHRoID0gd2lkdGg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdHlsZS5kaXJlY3Rpb24gPSBcIlwiO1xuICAgICAgICAgICAgc3R5bGUudGV4dEFsaWduID0gXCJcIjtcbiAgICAgICAgICAgIHN0eWxlLndpZHRoID0gXCJcIjtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7aW1wb3J0KFwiLi4vdmlydHVhbF9yZW5kZXJlclwiKS5WaXJ0dWFsUmVuZGVyZXJ9IHJlbmRlcmVyXG4gKi9cbmZ1bmN0aW9uIGNsZWFyVGV4dExheWVyKHJlbmRlcmVyKSB7XG4gICAgdmFyIGxpbmVzID0gcmVuZGVyZXIuJHRleHRMYXllci4kbGluZXM7XG4gICAgbGluZXMuY2VsbHMuZm9yRWFjaChjbGVhcik7XG4gICAgbGluZXMuY2VsbENhY2hlLmZvckVhY2goY2xlYXIpO1xuICAgIGZ1bmN0aW9uIGNsZWFyKGNlbGwpIHtcbiAgICAgICAgdmFyIHN0eWxlID0gY2VsbC5lbGVtZW50LnN0eWxlO1xuICAgICAgICBzdHlsZS5kaXJlY3Rpb24gPSBzdHlsZS50ZXh0QWxpZ24gPSBzdHlsZS53aWR0aCA9IFwiXCI7XG4gICAgfVxufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9