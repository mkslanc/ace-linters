"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[3641],{

/***/ 53641:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var event = __webpack_require__(19631);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjM2NDEuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7QUFDYixZQUFZLG1CQUFPLENBQUMsS0FBYzs7QUFFbEMsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBYSxtQ0FBMkI7QUFDeEMsMENBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9leHQvc3BlbGxjaGVjay5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbnZhciBldmVudCA9IHJlcXVpcmUoXCIuLi9saWIvZXZlbnRcIik7XG5cbmV4cG9ydHMuY29udGV4dE1lbnVIYW5kbGVyID0gZnVuY3Rpb24oZSl7XG4gICAgdmFyIGhvc3QgPSBlLnRhcmdldDtcbiAgICB2YXIgdGV4dCA9IGhvc3QudGV4dElucHV0LmdldEVsZW1lbnQoKTtcbiAgICBpZiAoIWhvc3Quc2VsZWN0aW9uLmlzRW1wdHkoKSlcbiAgICAgICAgcmV0dXJuO1xuICAgIHZhciBjID0gaG9zdC5nZXRDdXJzb3JQb3NpdGlvbigpO1xuICAgIHZhciByID0gaG9zdC5zZXNzaW9uLmdldFdvcmRSYW5nZShjLnJvdywgYy5jb2x1bW4pO1xuICAgIHZhciB3ID0gaG9zdC5zZXNzaW9uLmdldFRleHRSYW5nZShyKTtcblxuICAgIGhvc3Quc2Vzc2lvbi50b2tlblJlLmxhc3RJbmRleCA9IDA7XG4gICAgaWYgKCFob3N0LnNlc3Npb24udG9rZW5SZS50ZXN0KHcpKVxuICAgICAgICByZXR1cm47XG4gICAgdmFyIFBMQUNFSE9MREVSID0gXCJcXHgwMVxceDAxXCI7XG4gICAgdmFyIHZhbHVlID0gdyArIFwiIFwiICsgUExBQ0VIT0xERVI7XG4gICAgdGV4dC52YWx1ZSA9IHZhbHVlO1xuICAgIHRleHQuc2V0U2VsZWN0aW9uUmFuZ2Uody5sZW5ndGgsIHcubGVuZ3RoICsgMSk7XG4gICAgdGV4dC5zZXRTZWxlY3Rpb25SYW5nZSgwLCAwKTtcbiAgICB0ZXh0LnNldFNlbGVjdGlvblJhbmdlKDAsIHcubGVuZ3RoKTtcblxuICAgIHZhciBhZnRlcktleWRvd24gPSBmYWxzZTtcbiAgICBldmVudC5hZGRMaXN0ZW5lcih0ZXh0LCBcImtleWRvd25cIiwgZnVuY3Rpb24gb25LZXlkb3duKCkge1xuICAgICAgICBldmVudC5yZW1vdmVMaXN0ZW5lcih0ZXh0LCBcImtleWRvd25cIiwgb25LZXlkb3duKTtcbiAgICAgICAgYWZ0ZXJLZXlkb3duID0gdHJ1ZTtcbiAgICB9KTtcblxuICAgIGhvc3QudGV4dElucHV0LnNldElucHV0SGFuZGxlcihmdW5jdGlvbihuZXdWYWwpIHtcbiAgICAgICAgaWYgKG5ld1ZhbCA9PSB2YWx1ZSlcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgaWYgKG5ld1ZhbC5sYXN0SW5kZXhPZih2YWx1ZSwgMCkgPT09IDApXG4gICAgICAgICAgICByZXR1cm4gbmV3VmFsLnNsaWNlKHZhbHVlLmxlbmd0aCk7XG4gICAgICAgIGlmIChuZXdWYWwuc3Vic3RyKHRleHQuc2VsZWN0aW9uRW5kKSA9PSB2YWx1ZSlcbiAgICAgICAgICAgIHJldHVybiBuZXdWYWwuc2xpY2UoMCwgLXZhbHVlLmxlbmd0aCk7XG4gICAgICAgIGlmIChuZXdWYWwuc2xpY2UoLTIpID09IFBMQUNFSE9MREVSKSB7XG4gICAgICAgICAgICB2YXIgdmFsID0gbmV3VmFsLnNsaWNlKDAsIC0yKTtcbiAgICAgICAgICAgIGlmICh2YWwuc2xpY2UoLTEpID09IFwiIFwiKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFmdGVyS2V5ZG93bilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbC5zdWJzdHJpbmcoMCwgdGV4dC5zZWxlY3Rpb25FbmQpO1xuICAgICAgICAgICAgICAgIHZhbCA9IHZhbC5zbGljZSgwLCAtMSk7XG4gICAgICAgICAgICAgICAgaG9zdC5zZXNzaW9uLnJlcGxhY2UociwgdmFsKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXdWYWw7XG4gICAgfSk7XG59O1xuLy8gdG9kbyBzdXBwb3J0IGhpZ2hsaWdodGluZyB3aXRoIHR5cG8uanNcbnZhciBFZGl0b3IgPSByZXF1aXJlKFwiLi4vZWRpdG9yXCIpLkVkaXRvcjtcbnJlcXVpcmUoXCIuLi9jb25maWdcIikuZGVmaW5lT3B0aW9ucyhFZGl0b3IucHJvdG90eXBlLCBcImVkaXRvclwiLCB7XG4gICAgc3BlbGxjaGVjazoge1xuICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAgICAgdmFyIHRleHQgPSB0aGlzLnRleHRJbnB1dC5nZXRFbGVtZW50KCk7XG4gICAgICAgICAgICB0ZXh0LnNwZWxsY2hlY2sgPSAhIXZhbDtcbiAgICAgICAgICAgIGlmICghdmFsKVxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIoXCJuYXRpdmVjb250ZXh0bWVudVwiLCBleHBvcnRzLmNvbnRleHRNZW51SGFuZGxlcik7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5vbihcIm5hdGl2ZWNvbnRleHRtZW51XCIsIGV4cG9ydHMuY29udGV4dE1lbnVIYW5kbGVyKTtcbiAgICAgICAgfSxcbiAgICAgICAgdmFsdWU6IHRydWVcbiAgICB9XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==