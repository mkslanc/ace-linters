"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[3641],{

/***/ 53641:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/**
 * ## Browser spellcheck integration extension for native spelling correction
 *
 * Provides seamless integration with browser's native spellcheck functionality through context menu interactions.
 * Enables right-click spelling suggestions on misspelled words while preserving editor functionality and text input
 * handling. The extension bridges browser spellcheck capabilities with the editor's text manipulation system.
 *
 * **Enable:** `editor.setOption("spellcheck", true)` (enabled by default)
 * or configure it during editor initialization in the options object.
 *
 * @module
 */



var event = __webpack_require__(19631);

/**
 * Handles context menu events for spellcheck integration by setting up a hidden input field
 * with the word at cursor position to trigger browser spellcheck suggestions.
 * @param {any} e - The context menu event
 */

exports.contextMenuHandler = function(e){
    var host = e.target;
    var text = host.textInput.getElement();
    if (!host.selection.isEmpty())
        return;
    var c = host.getCursorPosition();
    var r = host.session.getWordRange(c.row, c.column);
    var w = host.session.getTextRange(r);

    host.session.tokenRe.lastIndex = 0;
    if (!host.session.tokenRe.test(w))
        return;
    var PLACEHOLDER = "\x01\x01";
    var value = w + " " + PLACEHOLDER;
    text.value = value;
    text.setSelectionRange(w.length, w.length + 1);
    text.setSelectionRange(0, 0);
    text.setSelectionRange(0, w.length);

    var afterKeydown = false;
    event.addListener(text, "keydown", function onKeydown() {
        event.removeListener(text, "keydown", onKeydown);
        afterKeydown = true;
    });

    host.textInput.setInputHandler(function(newVal) {
        if (newVal == value)
            return '';
        if (newVal.lastIndexOf(value, 0) === 0)
            return newVal.slice(value.length);
        if (newVal.substr(text.selectionEnd) == value)
            return newVal.slice(0, -value.length);
        if (newVal.slice(-2) == PLACEHOLDER) {
            var val = newVal.slice(0, -2);
            if (val.slice(-1) == " ") {
                if (afterKeydown)
                    return val.substring(0, text.selectionEnd);
                val = val.slice(0, -1);
                host.session.replace(r, val);
                return "";
            }
        }

        return newVal;
    });
};
// todo support highlighting with typo.js
var Editor = (__webpack_require__(27258).Editor);
(__webpack_require__(76321).defineOptions)(Editor.prototype, "editor", {
    spellcheck: {
        set: function(val) {
            var text = this.textInput.getElement();
            text.spellcheck = !!val;
            if (!val)
                this.removeListener("nativecontextmenu", exports.contextMenuHandler);
            else
                this.on("nativecontextmenu", exports.contextMenuHandler);
        },
        value: true
    }
});


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjM2NDEuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHYTtBQUNiLFlBQVksbUJBQU8sQ0FBQyxLQUFjOztBQUVsQztBQUNBO0FBQ0E7QUFDQSxXQUFXLEtBQUs7QUFDaEI7O0FBRUEsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBYSxtQ0FBMkI7QUFDeEMsMENBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9leHQvc3BlbGxjaGVjay5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqICMjIEJyb3dzZXIgc3BlbGxjaGVjayBpbnRlZ3JhdGlvbiBleHRlbnNpb24gZm9yIG5hdGl2ZSBzcGVsbGluZyBjb3JyZWN0aW9uXG4gKlxuICogUHJvdmlkZXMgc2VhbWxlc3MgaW50ZWdyYXRpb24gd2l0aCBicm93c2VyJ3MgbmF0aXZlIHNwZWxsY2hlY2sgZnVuY3Rpb25hbGl0eSB0aHJvdWdoIGNvbnRleHQgbWVudSBpbnRlcmFjdGlvbnMuXG4gKiBFbmFibGVzIHJpZ2h0LWNsaWNrIHNwZWxsaW5nIHN1Z2dlc3Rpb25zIG9uIG1pc3NwZWxsZWQgd29yZHMgd2hpbGUgcHJlc2VydmluZyBlZGl0b3IgZnVuY3Rpb25hbGl0eSBhbmQgdGV4dCBpbnB1dFxuICogaGFuZGxpbmcuIFRoZSBleHRlbnNpb24gYnJpZGdlcyBicm93c2VyIHNwZWxsY2hlY2sgY2FwYWJpbGl0aWVzIHdpdGggdGhlIGVkaXRvcidzIHRleHQgbWFuaXB1bGF0aW9uIHN5c3RlbS5cbiAqXG4gKiAqKkVuYWJsZToqKiBgZWRpdG9yLnNldE9wdGlvbihcInNwZWxsY2hlY2tcIiwgdHJ1ZSlgIChlbmFibGVkIGJ5IGRlZmF1bHQpXG4gKiBvciBjb25maWd1cmUgaXQgZHVyaW5nIGVkaXRvciBpbml0aWFsaXphdGlvbiBpbiB0aGUgb3B0aW9ucyBvYmplY3QuXG4gKlxuICogQG1vZHVsZVxuICovXG5cblxuXCJ1c2Ugc3RyaWN0XCI7XG52YXIgZXZlbnQgPSByZXF1aXJlKFwiLi4vbGliL2V2ZW50XCIpO1xuXG4vKipcbiAqIEhhbmRsZXMgY29udGV4dCBtZW51IGV2ZW50cyBmb3Igc3BlbGxjaGVjayBpbnRlZ3JhdGlvbiBieSBzZXR0aW5nIHVwIGEgaGlkZGVuIGlucHV0IGZpZWxkXG4gKiB3aXRoIHRoZSB3b3JkIGF0IGN1cnNvciBwb3NpdGlvbiB0byB0cmlnZ2VyIGJyb3dzZXIgc3BlbGxjaGVjayBzdWdnZXN0aW9ucy5cbiAqIEBwYXJhbSB7YW55fSBlIC0gVGhlIGNvbnRleHQgbWVudSBldmVudFxuICovXG5cbmV4cG9ydHMuY29udGV4dE1lbnVIYW5kbGVyID0gZnVuY3Rpb24oZSl7XG4gICAgdmFyIGhvc3QgPSBlLnRhcmdldDtcbiAgICB2YXIgdGV4dCA9IGhvc3QudGV4dElucHV0LmdldEVsZW1lbnQoKTtcbiAgICBpZiAoIWhvc3Quc2VsZWN0aW9uLmlzRW1wdHkoKSlcbiAgICAgICAgcmV0dXJuO1xuICAgIHZhciBjID0gaG9zdC5nZXRDdXJzb3JQb3NpdGlvbigpO1xuICAgIHZhciByID0gaG9zdC5zZXNzaW9uLmdldFdvcmRSYW5nZShjLnJvdywgYy5jb2x1bW4pO1xuICAgIHZhciB3ID0gaG9zdC5zZXNzaW9uLmdldFRleHRSYW5nZShyKTtcblxuICAgIGhvc3Quc2Vzc2lvbi50b2tlblJlLmxhc3RJbmRleCA9IDA7XG4gICAgaWYgKCFob3N0LnNlc3Npb24udG9rZW5SZS50ZXN0KHcpKVxuICAgICAgICByZXR1cm47XG4gICAgdmFyIFBMQUNFSE9MREVSID0gXCJcXHgwMVxceDAxXCI7XG4gICAgdmFyIHZhbHVlID0gdyArIFwiIFwiICsgUExBQ0VIT0xERVI7XG4gICAgdGV4dC52YWx1ZSA9IHZhbHVlO1xuICAgIHRleHQuc2V0U2VsZWN0aW9uUmFuZ2Uody5sZW5ndGgsIHcubGVuZ3RoICsgMSk7XG4gICAgdGV4dC5zZXRTZWxlY3Rpb25SYW5nZSgwLCAwKTtcbiAgICB0ZXh0LnNldFNlbGVjdGlvblJhbmdlKDAsIHcubGVuZ3RoKTtcblxuICAgIHZhciBhZnRlcktleWRvd24gPSBmYWxzZTtcbiAgICBldmVudC5hZGRMaXN0ZW5lcih0ZXh0LCBcImtleWRvd25cIiwgZnVuY3Rpb24gb25LZXlkb3duKCkge1xuICAgICAgICBldmVudC5yZW1vdmVMaXN0ZW5lcih0ZXh0LCBcImtleWRvd25cIiwgb25LZXlkb3duKTtcbiAgICAgICAgYWZ0ZXJLZXlkb3duID0gdHJ1ZTtcbiAgICB9KTtcblxuICAgIGhvc3QudGV4dElucHV0LnNldElucHV0SGFuZGxlcihmdW5jdGlvbihuZXdWYWwpIHtcbiAgICAgICAgaWYgKG5ld1ZhbCA9PSB2YWx1ZSlcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgaWYgKG5ld1ZhbC5sYXN0SW5kZXhPZih2YWx1ZSwgMCkgPT09IDApXG4gICAgICAgICAgICByZXR1cm4gbmV3VmFsLnNsaWNlKHZhbHVlLmxlbmd0aCk7XG4gICAgICAgIGlmIChuZXdWYWwuc3Vic3RyKHRleHQuc2VsZWN0aW9uRW5kKSA9PSB2YWx1ZSlcbiAgICAgICAgICAgIHJldHVybiBuZXdWYWwuc2xpY2UoMCwgLXZhbHVlLmxlbmd0aCk7XG4gICAgICAgIGlmIChuZXdWYWwuc2xpY2UoLTIpID09IFBMQUNFSE9MREVSKSB7XG4gICAgICAgICAgICB2YXIgdmFsID0gbmV3VmFsLnNsaWNlKDAsIC0yKTtcbiAgICAgICAgICAgIGlmICh2YWwuc2xpY2UoLTEpID09IFwiIFwiKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFmdGVyS2V5ZG93bilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbC5zdWJzdHJpbmcoMCwgdGV4dC5zZWxlY3Rpb25FbmQpO1xuICAgICAgICAgICAgICAgIHZhbCA9IHZhbC5zbGljZSgwLCAtMSk7XG4gICAgICAgICAgICAgICAgaG9zdC5zZXNzaW9uLnJlcGxhY2UociwgdmFsKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXdWYWw7XG4gICAgfSk7XG59O1xuLy8gdG9kbyBzdXBwb3J0IGhpZ2hsaWdodGluZyB3aXRoIHR5cG8uanNcbnZhciBFZGl0b3IgPSByZXF1aXJlKFwiLi4vZWRpdG9yXCIpLkVkaXRvcjtcbnJlcXVpcmUoXCIuLi9jb25maWdcIikuZGVmaW5lT3B0aW9ucyhFZGl0b3IucHJvdG90eXBlLCBcImVkaXRvclwiLCB7XG4gICAgc3BlbGxjaGVjazoge1xuICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAgICAgdmFyIHRleHQgPSB0aGlzLnRleHRJbnB1dC5nZXRFbGVtZW50KCk7XG4gICAgICAgICAgICB0ZXh0LnNwZWxsY2hlY2sgPSAhIXZhbDtcbiAgICAgICAgICAgIGlmICghdmFsKVxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIoXCJuYXRpdmVjb250ZXh0bWVudVwiLCBleHBvcnRzLmNvbnRleHRNZW51SGFuZGxlcik7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5vbihcIm5hdGl2ZWNvbnRleHRtZW51XCIsIGV4cG9ydHMuY29udGV4dE1lbnVIYW5kbGVyKTtcbiAgICAgICAgfSxcbiAgICAgICAgdmFsdWU6IHRydWVcbiAgICB9XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==