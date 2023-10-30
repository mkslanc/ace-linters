"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[7872],{

/***/ 77872:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var dom = __webpack_require__(6359);
var lang = __webpack_require__(20124);

/** simple statusbar **/
class StatusBar{
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
    
    updateStatus(editor) {
        var status = [];
        function add(str, separator) {
            str && status.push(str, separator || "|");
        }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjc4NzIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLElBQVk7QUFDOUIsV0FBVyxtQkFBTyxDQUFDLEtBQWE7O0FBRWhDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0REFBNEQ7QUFDNUQ7O0FBRUE7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlCQUFpQiIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL2V4dC9zdGF0dXNiYXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBkb20gPSByZXF1aXJlKFwiLi4vbGliL2RvbVwiKTtcbnZhciBsYW5nID0gcmVxdWlyZShcIi4uL2xpYi9sYW5nXCIpO1xuXG4vKiogc2ltcGxlIHN0YXR1c2JhciAqKi9cbmNsYXNzIFN0YXR1c0JhcntcbiAgICBjb25zdHJ1Y3RvcihlZGl0b3IsIHBhcmVudE5vZGUpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZG9tLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHRoaXMuZWxlbWVudC5jbGFzc05hbWUgPSBcImFjZV9zdGF0dXMtaW5kaWNhdG9yXCI7XG4gICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS5jc3NUZXh0ID0gXCJkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XCI7XG4gICAgICAgIHBhcmVudE5vZGUuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50KTtcblxuICAgICAgICB2YXIgc3RhdHVzVXBkYXRlID0gbGFuZy5kZWxheWVkQ2FsbChmdW5jdGlvbigpe1xuICAgICAgICAgICAgdGhpcy51cGRhdGVTdGF0dXMoZWRpdG9yKTtcbiAgICAgICAgfS5iaW5kKHRoaXMpKS5zY2hlZHVsZS5iaW5kKG51bGwsIDEwMCk7XG5cbiAgICAgICAgZWRpdG9yLm9uKFwiY2hhbmdlU3RhdHVzXCIsIHN0YXR1c1VwZGF0ZSk7XG4gICAgICAgIGVkaXRvci5vbihcImNoYW5nZVNlbGVjdGlvblwiLCBzdGF0dXNVcGRhdGUpO1xuICAgICAgICBlZGl0b3Iub24oXCJrZXlib2FyZEFjdGl2aXR5XCIsIHN0YXR1c1VwZGF0ZSk7XG4gICAgfVxuICAgIFxuICAgIHVwZGF0ZVN0YXR1cyhlZGl0b3IpIHtcbiAgICAgICAgdmFyIHN0YXR1cyA9IFtdO1xuICAgICAgICBmdW5jdGlvbiBhZGQoc3RyLCBzZXBhcmF0b3IpIHtcbiAgICAgICAgICAgIHN0ciAmJiBzdGF0dXMucHVzaChzdHIsIHNlcGFyYXRvciB8fCBcInxcIik7XG4gICAgICAgIH1cblxuICAgICAgICBhZGQoZWRpdG9yLmtleUJpbmRpbmcuZ2V0U3RhdHVzVGV4dChlZGl0b3IpKTtcbiAgICAgICAgaWYgKGVkaXRvci5jb21tYW5kcy5yZWNvcmRpbmcpXG4gICAgICAgICAgICBhZGQoXCJSRUNcIik7XG4gICAgICAgIFxuICAgICAgICB2YXIgc2VsID0gZWRpdG9yLnNlbGVjdGlvbjtcbiAgICAgICAgdmFyIGMgPSBzZWwubGVhZDtcbiAgICAgICAgXG4gICAgICAgIGlmICghc2VsLmlzRW1wdHkoKSkge1xuICAgICAgICAgICAgdmFyIHIgPSBlZGl0b3IuZ2V0U2VsZWN0aW9uUmFuZ2UoKTtcbiAgICAgICAgICAgIGFkZChcIihcIiArIChyLmVuZC5yb3cgLSByLnN0YXJ0LnJvdykgKyBcIjpcIiAgKyhyLmVuZC5jb2x1bW4gLSByLnN0YXJ0LmNvbHVtbikgKyBcIilcIiwgXCIgXCIpO1xuICAgICAgICB9XG4gICAgICAgIGFkZChjLnJvdyArIFwiOlwiICsgYy5jb2x1bW4sIFwiIFwiKTsgICAgICAgIFxuICAgICAgICBpZiAoc2VsLnJhbmdlQ291bnQpXG4gICAgICAgICAgICBhZGQoXCJbXCIgKyBzZWwucmFuZ2VDb3VudCArIFwiXVwiLCBcIiBcIik7XG4gICAgICAgIHN0YXR1cy5wb3AoKTtcbiAgICAgICAgdGhpcy5lbGVtZW50LnRleHRDb250ZW50ID0gc3RhdHVzLmpvaW4oXCJcIik7XG4gICAgfVxufVxuXG5leHBvcnRzLlN0YXR1c0JhciA9IFN0YXR1c0JhcjtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==