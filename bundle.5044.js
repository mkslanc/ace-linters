"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[5044],{

/***/ 5044:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/**
 * ## Status bar extension for displaying editor state information
 *
 * Provides a lightweight status indicator that displays real-time information about the editor state including
 * cursor position, selection details, recording status, and keyboard binding information. The status bar
 * automatically updates on editor events and renders as an inline element that can be embedded in any parent container.
 *
 * **Usage:**
 * ```javascript
 * var StatusBar = require("ace/ext/statusbar").StatusBar;
 * var statusBar = new StatusBar(editor, parentElement);
 * ```
 *
 * @module
 */



/**
 *
 * @typedef {import("../editor").Editor} Editor
 */
var dom = __webpack_require__(71435);
var lang = __webpack_require__(39955);

/** simple statusbar **/
class StatusBar{
    /**
     * @param {Editor} editor
     * @param {HTMLElement} parentNode
     */
    constructor(editor, parentNode) {
        this.element = dom.createElement("div");
        this.element.className = "ace_status-indicator";
        this.element.style.cssText = "display: inline-block;";
        parentNode.appendChild(this.element);

        var statusUpdate = lang.delayedCall(function(){
            this.updateStatus(editor);
        }.bind(this)).schedule.bind(null, 100);

        editor.on("changeStatus", statusUpdate);
        editor.on("changeSelection", statusUpdate);
        editor.on("keyboardActivity", statusUpdate);
    }

    /**
     * @param {Editor} editor
     */
    updateStatus(editor) {
        var status = [];
        function add(str, separator) {
            str && status.push(str, separator || "|");
        }
        // @ts-expect-error TODO: potential wrong argument
        add(editor.keyBinding.getStatusText(editor));
        if (editor.commands.recording)
            add("REC");
        
        var sel = editor.selection;
        var c = sel.lead;
        
        if (!sel.isEmpty()) {
            var r = editor.getSelectionRange();
            add("(" + (r.end.row - r.start.row) + ":"  +(r.end.column - r.start.column) + ")", " ");
        }
        add(c.row + ":" + c.column, " ");        
        if (sel.rangeCount)
            add("[" + sel.rangeCount + "]", " ");
        status.pop();
        this.element.textContent = status.join("");
    }
}

exports.StatusBar = StatusBar;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjUwNDQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHYTtBQUNiO0FBQ0E7QUFDQSxhQUFhLDRCQUE0QjtBQUN6QztBQUNBLFVBQVUsbUJBQU8sQ0FBQyxLQUFZO0FBQzlCLFdBQVcsbUJBQU8sQ0FBQyxLQUFhOztBQUVoQztBQUNBO0FBQ0E7QUFDQSxlQUFlLFFBQVE7QUFDdkIsZUFBZSxhQUFhO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNERBQTREO0FBQzVEOztBQUVBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZUFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlCQUFpQiIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL2V4dC9zdGF0dXNiYXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiAjIyBTdGF0dXMgYmFyIGV4dGVuc2lvbiBmb3IgZGlzcGxheWluZyBlZGl0b3Igc3RhdGUgaW5mb3JtYXRpb25cbiAqXG4gKiBQcm92aWRlcyBhIGxpZ2h0d2VpZ2h0IHN0YXR1cyBpbmRpY2F0b3IgdGhhdCBkaXNwbGF5cyByZWFsLXRpbWUgaW5mb3JtYXRpb24gYWJvdXQgdGhlIGVkaXRvciBzdGF0ZSBpbmNsdWRpbmdcbiAqIGN1cnNvciBwb3NpdGlvbiwgc2VsZWN0aW9uIGRldGFpbHMsIHJlY29yZGluZyBzdGF0dXMsIGFuZCBrZXlib2FyZCBiaW5kaW5nIGluZm9ybWF0aW9uLiBUaGUgc3RhdHVzIGJhclxuICogYXV0b21hdGljYWxseSB1cGRhdGVzIG9uIGVkaXRvciBldmVudHMgYW5kIHJlbmRlcnMgYXMgYW4gaW5saW5lIGVsZW1lbnQgdGhhdCBjYW4gYmUgZW1iZWRkZWQgaW4gYW55IHBhcmVudCBjb250YWluZXIuXG4gKlxuICogKipVc2FnZToqKlxuICogYGBgamF2YXNjcmlwdFxuICogdmFyIFN0YXR1c0JhciA9IHJlcXVpcmUoXCJhY2UvZXh0L3N0YXR1c2JhclwiKS5TdGF0dXNCYXI7XG4gKiB2YXIgc3RhdHVzQmFyID0gbmV3IFN0YXR1c0JhcihlZGl0b3IsIHBhcmVudEVsZW1lbnQpO1xuICogYGBgXG4gKlxuICogQG1vZHVsZVxuICovXG5cblxuXCJ1c2Ugc3RyaWN0XCI7XG4vKipcbiAqXG4gKiBAdHlwZWRlZiB7aW1wb3J0KFwiLi4vZWRpdG9yXCIpLkVkaXRvcn0gRWRpdG9yXG4gKi9cbnZhciBkb20gPSByZXF1aXJlKFwiLi4vbGliL2RvbVwiKTtcbnZhciBsYW5nID0gcmVxdWlyZShcIi4uL2xpYi9sYW5nXCIpO1xuXG4vKiogc2ltcGxlIHN0YXR1c2JhciAqKi9cbmNsYXNzIFN0YXR1c0JhcntcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0VkaXRvcn0gZWRpdG9yXG4gICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gcGFyZW50Tm9kZVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGVkaXRvciwgcGFyZW50Tm9kZSkge1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBkb20uY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgdGhpcy5lbGVtZW50LmNsYXNzTmFtZSA9IFwiYWNlX3N0YXR1cy1pbmRpY2F0b3JcIjtcbiAgICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLmNzc1RleHQgPSBcImRpc3BsYXk6IGlubGluZS1ibG9jaztcIjtcbiAgICAgICAgcGFyZW50Tm9kZS5hcHBlbmRDaGlsZCh0aGlzLmVsZW1lbnQpO1xuXG4gICAgICAgIHZhciBzdGF0dXNVcGRhdGUgPSBsYW5nLmRlbGF5ZWRDYWxsKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVN0YXR1cyhlZGl0b3IpO1xuICAgICAgICB9LmJpbmQodGhpcykpLnNjaGVkdWxlLmJpbmQobnVsbCwgMTAwKTtcblxuICAgICAgICBlZGl0b3Iub24oXCJjaGFuZ2VTdGF0dXNcIiwgc3RhdHVzVXBkYXRlKTtcbiAgICAgICAgZWRpdG9yLm9uKFwiY2hhbmdlU2VsZWN0aW9uXCIsIHN0YXR1c1VwZGF0ZSk7XG4gICAgICAgIGVkaXRvci5vbihcImtleWJvYXJkQWN0aXZpdHlcIiwgc3RhdHVzVXBkYXRlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0VkaXRvcn0gZWRpdG9yXG4gICAgICovXG4gICAgdXBkYXRlU3RhdHVzKGVkaXRvcikge1xuICAgICAgICB2YXIgc3RhdHVzID0gW107XG4gICAgICAgIGZ1bmN0aW9uIGFkZChzdHIsIHNlcGFyYXRvcikge1xuICAgICAgICAgICAgc3RyICYmIHN0YXR1cy5wdXNoKHN0ciwgc2VwYXJhdG9yIHx8IFwifFwiKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBAdHMtZXhwZWN0LWVycm9yIFRPRE86IHBvdGVudGlhbCB3cm9uZyBhcmd1bWVudFxuICAgICAgICBhZGQoZWRpdG9yLmtleUJpbmRpbmcuZ2V0U3RhdHVzVGV4dChlZGl0b3IpKTtcbiAgICAgICAgaWYgKGVkaXRvci5jb21tYW5kcy5yZWNvcmRpbmcpXG4gICAgICAgICAgICBhZGQoXCJSRUNcIik7XG4gICAgICAgIFxuICAgICAgICB2YXIgc2VsID0gZWRpdG9yLnNlbGVjdGlvbjtcbiAgICAgICAgdmFyIGMgPSBzZWwubGVhZDtcbiAgICAgICAgXG4gICAgICAgIGlmICghc2VsLmlzRW1wdHkoKSkge1xuICAgICAgICAgICAgdmFyIHIgPSBlZGl0b3IuZ2V0U2VsZWN0aW9uUmFuZ2UoKTtcbiAgICAgICAgICAgIGFkZChcIihcIiArIChyLmVuZC5yb3cgLSByLnN0YXJ0LnJvdykgKyBcIjpcIiAgKyhyLmVuZC5jb2x1bW4gLSByLnN0YXJ0LmNvbHVtbikgKyBcIilcIiwgXCIgXCIpO1xuICAgICAgICB9XG4gICAgICAgIGFkZChjLnJvdyArIFwiOlwiICsgYy5jb2x1bW4sIFwiIFwiKTsgICAgICAgIFxuICAgICAgICBpZiAoc2VsLnJhbmdlQ291bnQpXG4gICAgICAgICAgICBhZGQoXCJbXCIgKyBzZWwucmFuZ2VDb3VudCArIFwiXVwiLCBcIiBcIik7XG4gICAgICAgIHN0YXR1cy5wb3AoKTtcbiAgICAgICAgdGhpcy5lbGVtZW50LnRleHRDb250ZW50ID0gc3RhdHVzLmpvaW4oXCJcIik7XG4gICAgfVxufVxuXG5leHBvcnRzLlN0YXR1c0JhciA9IFN0YXR1c0JhcjtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==