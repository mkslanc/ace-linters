(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[4323],{

/***/ 94323:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var Editor = (__webpack_require__(27258).Editor);

(__webpack_require__(76321).defineOptions)(Editor.prototype, "editor", {
    enableLinking: {
        set: function(val) {
            if (val) {
                this.on("click", onClick);
                this.on("mousemove", onMouseMove);
            } else {
                this.off("click", onClick);
                this.off("mousemove", onMouseMove);
            }
        },
        value: false
    }
});

exports.previousLinkingHover = false;

function onMouseMove(e) {
    var editor = e.editor;
    var ctrl = e.getAccelKey();

    if (ctrl) {
        var editor = e.editor;
        var docPos = e.getDocumentPosition();
        var session = editor.session;
        var token = session.getTokenAt(docPos.row, docPos.column);

        if (exports.previousLinkingHover && exports.previousLinkingHover != token) {
            editor._emit("linkHoverOut");
        }
        editor._emit("linkHover", {position: docPos, token: token});
        exports.previousLinkingHover = token;
    } else if (exports.previousLinkingHover) {
        editor._emit("linkHoverOut");
        exports.previousLinkingHover = false;
    }
}

function onClick(e) {
    var ctrl = e.getAccelKey();
    var button = e.getButton();

    if (button == 0 && ctrl) {
        var editor = e.editor;
        var docPos = e.getDocumentPosition();
        var session = editor.session;
        var token = session.getTokenAt(docPos.row, docPos.column);

        editor._emit("linkClick", {position: docPos, token: token});
    }
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjQzMjMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxhQUFhLG1DQUEyQjs7QUFFeEMsMENBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxDQUFDOztBQUVELDRCQUE0Qjs7QUFFNUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLCtCQUErQjtBQUNsRSxRQUFRLDRCQUE0QjtBQUNwQyxNQUFNO0FBQ047QUFDQSxRQUFRLDRCQUE0QjtBQUNwQztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG1DQUFtQywrQkFBK0I7QUFDbEU7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL2V4dC9saW5raW5nLmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBFZGl0b3IgPSByZXF1aXJlKFwiLi4vZWRpdG9yXCIpLkVkaXRvcjtcblxucmVxdWlyZShcIi4uL2NvbmZpZ1wiKS5kZWZpbmVPcHRpb25zKEVkaXRvci5wcm90b3R5cGUsIFwiZWRpdG9yXCIsIHtcbiAgICBlbmFibGVMaW5raW5nOiB7XG4gICAgICAgIHNldDogZnVuY3Rpb24odmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbihcImNsaWNrXCIsIG9uQ2xpY2spO1xuICAgICAgICAgICAgICAgIHRoaXMub24oXCJtb3VzZW1vdmVcIiwgb25Nb3VzZU1vdmUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9mZihcImNsaWNrXCIsIG9uQ2xpY2spO1xuICAgICAgICAgICAgICAgIHRoaXMub2ZmKFwibW91c2Vtb3ZlXCIsIG9uTW91c2VNb3ZlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdmFsdWU6IGZhbHNlXG4gICAgfVxufSk7XG5cbmV4cG9ydHMucHJldmlvdXNMaW5raW5nSG92ZXIgPSBmYWxzZTtcblxuZnVuY3Rpb24gb25Nb3VzZU1vdmUoZSkge1xuICAgIHZhciBlZGl0b3IgPSBlLmVkaXRvcjtcbiAgICB2YXIgY3RybCA9IGUuZ2V0QWNjZWxLZXkoKTtcblxuICAgIGlmIChjdHJsKSB7XG4gICAgICAgIHZhciBlZGl0b3IgPSBlLmVkaXRvcjtcbiAgICAgICAgdmFyIGRvY1BvcyA9IGUuZ2V0RG9jdW1lbnRQb3NpdGlvbigpO1xuICAgICAgICB2YXIgc2Vzc2lvbiA9IGVkaXRvci5zZXNzaW9uO1xuICAgICAgICB2YXIgdG9rZW4gPSBzZXNzaW9uLmdldFRva2VuQXQoZG9jUG9zLnJvdywgZG9jUG9zLmNvbHVtbik7XG5cbiAgICAgICAgaWYgKGV4cG9ydHMucHJldmlvdXNMaW5raW5nSG92ZXIgJiYgZXhwb3J0cy5wcmV2aW91c0xpbmtpbmdIb3ZlciAhPSB0b2tlbikge1xuICAgICAgICAgICAgZWRpdG9yLl9lbWl0KFwibGlua0hvdmVyT3V0XCIpO1xuICAgICAgICB9XG4gICAgICAgIGVkaXRvci5fZW1pdChcImxpbmtIb3ZlclwiLCB7cG9zaXRpb246IGRvY1BvcywgdG9rZW46IHRva2VufSk7XG4gICAgICAgIGV4cG9ydHMucHJldmlvdXNMaW5raW5nSG92ZXIgPSB0b2tlbjtcbiAgICB9IGVsc2UgaWYgKGV4cG9ydHMucHJldmlvdXNMaW5raW5nSG92ZXIpIHtcbiAgICAgICAgZWRpdG9yLl9lbWl0KFwibGlua0hvdmVyT3V0XCIpO1xuICAgICAgICBleHBvcnRzLnByZXZpb3VzTGlua2luZ0hvdmVyID0gZmFsc2U7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBvbkNsaWNrKGUpIHtcbiAgICB2YXIgY3RybCA9IGUuZ2V0QWNjZWxLZXkoKTtcbiAgICB2YXIgYnV0dG9uID0gZS5nZXRCdXR0b24oKTtcblxuICAgIGlmIChidXR0b24gPT0gMCAmJiBjdHJsKSB7XG4gICAgICAgIHZhciBlZGl0b3IgPSBlLmVkaXRvcjtcbiAgICAgICAgdmFyIGRvY1BvcyA9IGUuZ2V0RG9jdW1lbnRQb3NpdGlvbigpO1xuICAgICAgICB2YXIgc2Vzc2lvbiA9IGVkaXRvci5zZXNzaW9uO1xuICAgICAgICB2YXIgdG9rZW4gPSBzZXNzaW9uLmdldFRva2VuQXQoZG9jUG9zLnJvdywgZG9jUG9zLmNvbHVtbik7XG5cbiAgICAgICAgZWRpdG9yLl9lbWl0KFwibGlua0NsaWNrXCIsIHtwb3NpdGlvbjogZG9jUG9zLCB0b2tlbjogdG9rZW59KTtcbiAgICB9XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=