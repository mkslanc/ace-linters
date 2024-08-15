"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[5044],{

/***/ 5044:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjUwNDQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYSw0QkFBNEI7QUFDekM7QUFDQSxVQUFVLG1CQUFPLENBQUMsS0FBWTtBQUM5QixXQUFXLG1CQUFPLENBQUMsS0FBYTs7QUFFaEM7QUFDQTtBQUNBO0FBQ0EsZUFBZSxRQUFRO0FBQ3ZCLGVBQWUsYUFBYTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDREQUE0RDtBQUM1RDs7QUFFQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9leHQvc3RhdHVzYmFyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuLyoqXG4gKlxuICogQHR5cGVkZWYge2ltcG9ydChcIi4uL2VkaXRvclwiKS5FZGl0b3J9IEVkaXRvclxuICovXG52YXIgZG9tID0gcmVxdWlyZShcIi4uL2xpYi9kb21cIik7XG52YXIgbGFuZyA9IHJlcXVpcmUoXCIuLi9saWIvbGFuZ1wiKTtcblxuLyoqIHNpbXBsZSBzdGF0dXNiYXIgKiovXG5jbGFzcyBTdGF0dXNCYXJ7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtFZGl0b3J9IGVkaXRvclxuICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHBhcmVudE5vZGVcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihlZGl0b3IsIHBhcmVudE5vZGUpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZG9tLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc05hbWUgPSBcImFjZV9zdGF0dXMtaW5kaWNhdG9yXCI7XG4gICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS5jc3NUZXh0ID0gXCJkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XCI7XG4gICAgICAgIHBhcmVudE5vZGUuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50KTtcblxuICAgICAgICB2YXIgc3RhdHVzVXBkYXRlID0gbGFuZy5kZWxheWVkQ2FsbChmdW5jdGlvbigpe1xuICAgICAgICAgICAgdGhpcy51cGRhdGVTdGF0dXMoZWRpdG9yKTtcbiAgICAgICAgfS5iaW5kKHRoaXMpKS5zY2hlZHVsZS5iaW5kKG51bGwsIDEwMCk7XG5cbiAgICAgICAgZWRpdG9yLm9uKFwiY2hhbmdlU3RhdHVzXCIsIHN0YXR1c1VwZGF0ZSk7XG4gICAgICAgIGVkaXRvci5vbihcImNoYW5nZVNlbGVjdGlvblwiLCBzdGF0dXNVcGRhdGUpO1xuICAgICAgICBlZGl0b3Iub24oXCJrZXlib2FyZEFjdGl2aXR5XCIsIHN0YXR1c1VwZGF0ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtFZGl0b3J9IGVkaXRvclxuICAgICAqL1xuICAgIHVwZGF0ZVN0YXR1cyhlZGl0b3IpIHtcbiAgICAgICAgdmFyIHN0YXR1cyA9IFtdO1xuICAgICAgICBmdW5jdGlvbiBhZGQoc3RyLCBzZXBhcmF0b3IpIHtcbiAgICAgICAgICAgIHN0ciAmJiBzdGF0dXMucHVzaChzdHIsIHNlcGFyYXRvciB8fCBcInxcIik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvciBUT0RPOiBwb3RlbnRpYWwgd3JvbmcgYXJndW1lbnRcbiAgICAgICAgYWRkKGVkaXRvci5rZXlCaW5kaW5nLmdldFN0YXR1c1RleHQoZWRpdG9yKSk7XG4gICAgICAgIGlmIChlZGl0b3IuY29tbWFuZHMucmVjb3JkaW5nKVxuICAgICAgICAgICAgYWRkKFwiUkVDXCIpO1xuICAgICAgICBcbiAgICAgICAgdmFyIHNlbCA9IGVkaXRvci5zZWxlY3Rpb247XG4gICAgICAgIHZhciBjID0gc2VsLmxlYWQ7XG4gICAgICAgIFxuICAgICAgICBpZiAoIXNlbC5pc0VtcHR5KCkpIHtcbiAgICAgICAgICAgIHZhciByID0gZWRpdG9yLmdldFNlbGVjdGlvblJhbmdlKCk7XG4gICAgICAgICAgICBhZGQoXCIoXCIgKyAoci5lbmQucm93IC0gci5zdGFydC5yb3cpICsgXCI6XCIgICsoci5lbmQuY29sdW1uIC0gci5zdGFydC5jb2x1bW4pICsgXCIpXCIsIFwiIFwiKTtcbiAgICAgICAgfVxuICAgICAgICBhZGQoYy5yb3cgKyBcIjpcIiArIGMuY29sdW1uLCBcIiBcIik7ICAgICAgICBcbiAgICAgICAgaWYgKHNlbC5yYW5nZUNvdW50KVxuICAgICAgICAgICAgYWRkKFwiW1wiICsgc2VsLnJhbmdlQ291bnQgKyBcIl1cIiwgXCIgXCIpO1xuICAgICAgICBzdGF0dXMucG9wKCk7XG4gICAgICAgIHRoaXMuZWxlbWVudC50ZXh0Q29udGVudCA9IHN0YXR1cy5qb2luKFwiXCIpO1xuICAgIH1cbn1cblxuZXhwb3J0cy5TdGF0dXNCYXIgPSBTdGF0dXNCYXI7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=