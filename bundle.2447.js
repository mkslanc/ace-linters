"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[2447],{

/***/ 62447:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var LineWidgets = (__webpack_require__(62269)/* .LineWidgets */ .H);
var event = __webpack_require__(17989);
var lang = __webpack_require__(20124);
var dom = __webpack_require__(6359);

function clearLensElements(renderer) {
    var textLayer = renderer.$textLayer;
    var lensElements = textLayer.$lenses;
    if (lensElements)
        lensElements.forEach(function(el) {el.remove(); });
    textLayer.$lenses = null;
}

function renderWidgets(changes, renderer) {
    var changed = changes & renderer.CHANGE_LINES
        || changes & renderer.CHANGE_FULL
        || changes & renderer.CHANGE_SCROLL
        || changes & renderer.CHANGE_TEXT;
    if (!changed)
        return;

    var session = renderer.session;
    var lineWidgets = renderer.session.lineWidgets;
    var textLayer = renderer.$textLayer;
    var lensElements = textLayer.$lenses;
    if (!lineWidgets) {
        if (lensElements)
            clearLensElements(renderer);
        return;
    }

    var textCells = renderer.$textLayer.$lines.cells;
    var config = renderer.layerConfig;
    var padding = renderer.$padding;

    if (!lensElements)
        lensElements = textLayer.$lenses = [];


    var index = 0;
    for (var i = 0; i < textCells.length; i++) {
        var row = textCells[i].row;
        var widget = lineWidgets[row];
        var lenses = widget && widget.lenses;

        if (!lenses || !lenses.length) continue;

        var lensContainer = lensElements[index];
        if (!lensContainer) {
            lensContainer = lensElements[index]
                = dom.buildDom(["div", {class: "ace_codeLens"}], renderer.container);
        }
        lensContainer.style.height = config.lineHeight + "px";
        index++;

        for (var j = 0; j < lenses.length; j++) {
            var el = lensContainer.childNodes[2 * j];
            if (!el) {
                if (j != 0) lensContainer.appendChild(dom.createTextNode("\xa0|\xa0"));
                el = dom.buildDom(["a"], lensContainer);
            }
            el.textContent = lenses[j].title;
            el.lensCommand = lenses[j];
        }
        while (lensContainer.childNodes.length > 2 * j - 1)
            lensContainer.lastChild.remove();

        var top = renderer.$cursorLayer.getPixelPosition({
            row: row,
            column: 0
        }, true).top - config.lineHeight * widget.rowsAbove - config.offset;
        lensContainer.style.top = top + "px";

        var left = renderer.gutterWidth;
        var indent = session.getLine(row).search(/\S|$/);
        if (indent == -1)
            indent = 0;
        left += indent * config.characterWidth;
        lensContainer.style.paddingLeft = padding + left + "px";
    }
    while (index < lensElements.length)
        lensElements.pop().remove();
}

function clearCodeLensWidgets(session) {
    if (!session.lineWidgets) return;
    var widgetManager = session.widgetManager;
    session.lineWidgets.forEach(function(widget) {
        if (widget && widget.lenses)
            widgetManager.removeLineWidget(widget);
    });
}

exports.setLenses = function(session, lenses) {
    var firstRow = Number.MAX_VALUE;

    clearCodeLensWidgets(session);
    lenses && lenses.forEach(function(lens) {
        var row = lens.start.row;
        var column = lens.start.column;
        var widget = session.lineWidgets && session.lineWidgets[row];
        if (!widget || !widget.lenses) {
            widget = session.widgetManager.$registerLineWidget({
                rowCount: 1,
                rowsAbove: 1,
                row: row,
                column: column,
                lenses: []
            });
        }
        widget.lenses.push(lens.command);
        if (row < firstRow)
            firstRow = row;
    });
    session._emit("changeFold", {data: {start: {row: firstRow}}});
    return firstRow;
};

function attachToEditor(editor) {
    editor.codeLensProviders = [];
    editor.renderer.on("afterRender", renderWidgets);
    if (!editor.$codeLensClickHandler) {
        editor.$codeLensClickHandler = function(e) {
            var command = e.target.lensCommand;
            if (!command) return;
            editor.execCommand(command.id, command.arguments);
            editor._emit("codeLensClick", e);
        };
        event.addListener(editor.container, "click", editor.$codeLensClickHandler, editor);
    }
    editor.$updateLenses = function() {
        var session = editor.session;
        if (!session) return;

        if (!session.widgetManager) {
            session.widgetManager = new LineWidgets(session);
            session.widgetManager.attach(editor);
        }

        var providersToWaitNum = editor.codeLensProviders.length;
        var lenses = [];
        editor.codeLensProviders.forEach(function(provider) {
            provider.provideCodeLenses(session, function(err, payload) {
                if (err) return;
                payload.forEach(function(lens) {
                    lenses.push(lens);
                });
                providersToWaitNum--;
                if (providersToWaitNum == 0) {
                    applyLenses();
                }
            });
        });

        function applyLenses() {
            var cursor = session.selection.cursor;
            var oldRow = session.documentToScreenRow(cursor);
            var scrollTop = session.getScrollTop();
            var firstRow = exports.setLenses(session, lenses);

            var lastDelta = session.$undoManager && session.$undoManager.$lastDelta;
            if (lastDelta && lastDelta.action == "remove" && lastDelta.lines.length > 1)
                return;
            var row = session.documentToScreenRow(cursor);
            var lineHeight = editor.renderer.layerConfig.lineHeight;
            var top = session.getScrollTop() + (row - oldRow) * lineHeight;
            // special case for the lens on line 0, because it can't be scrolled into view with keyboard 
            if (firstRow == 0 && scrollTop < lineHeight /4 && scrollTop > -lineHeight/4) {
                top = -lineHeight;
            }
            session.setScrollTop(top);
        }
    };
    var updateLenses = lang.delayedCall(editor.$updateLenses);
    editor.$updateLensesOnInput = function() {
        updateLenses.delay(250);
    };
    editor.on("input", editor.$updateLensesOnInput);
}

function detachFromEditor(editor) {
    editor.off("input", editor.$updateLensesOnInput);
    editor.renderer.off("afterRender", renderWidgets);
    if (editor.$codeLensClickHandler)
        editor.container.removeEventListener("click", editor.$codeLensClickHandler);
}

exports.registerCodeLensProvider = function(editor, codeLensProvider) {
    editor.setOption("enableCodeLens", true);
    editor.codeLensProviders.push(codeLensProvider);
    editor.$updateLensesOnInput();
};

exports.clear = function(session) {
    exports.setLenses(session, null);
};

var Editor = (__webpack_require__(82880)/* .Editor */ .M);
(__webpack_require__(13188).defineOptions)(Editor.prototype, "editor", {
    enableCodeLens: {
        set: function(val) {
            if (val) {
                attachToEditor(this);
            } else {
                detachFromEditor(this);
            }
        }
    }
});

dom.importCssString(`
.ace_codeLens {
    position: absolute;
    color: #aaa;
    font-size: 88%;
    background: inherit;
    width: 100%;
    display: flex;
    align-items: flex-end;
    pointer-events: none;
}
.ace_codeLens > a {
    cursor: pointer;
    pointer-events: auto;
}
.ace_codeLens > a:hover {
    color: #0000ff;
    text-decoration: underline;
}
.ace_dark > .ace_codeLens > a:hover {
    color: #4e94ce;
}
`, "codelense.css", false);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjI0NDcuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7QUFDYixrQkFBa0IsaURBQXNDO0FBQ3hELFlBQVksbUJBQU8sQ0FBQyxLQUFjO0FBQ2xDLFdBQVcsbUJBQU8sQ0FBQyxLQUFhO0FBQ2hDLFVBQVUsbUJBQU8sQ0FBQyxJQUFZOztBQUU5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxjQUFjO0FBQ3pEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBLG9CQUFvQixzQkFBc0I7QUFDMUM7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxzQkFBc0I7QUFDOUQ7QUFDQTtBQUNBOztBQUVBLHdCQUF3QixtQkFBbUI7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQSxpQkFBaUI7QUFDakI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLGlDQUFpQyxPQUFPLFFBQVEsZ0JBQWdCO0FBQ2hFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZ0NBQWdDO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGFBQWE7QUFDYjtBQUNBOztBQUVBLGFBQWEsNENBQTJCO0FBQ3hDLDBDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL2V4dC9jb2RlX2xlbnMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgTGluZVdpZGdldHMgPSByZXF1aXJlKFwiLi4vbGluZV93aWRnZXRzXCIpLkxpbmVXaWRnZXRzO1xudmFyIGV2ZW50ID0gcmVxdWlyZShcIi4uL2xpYi9ldmVudFwiKTtcbnZhciBsYW5nID0gcmVxdWlyZShcIi4uL2xpYi9sYW5nXCIpO1xudmFyIGRvbSA9IHJlcXVpcmUoXCIuLi9saWIvZG9tXCIpO1xuXG5mdW5jdGlvbiBjbGVhckxlbnNFbGVtZW50cyhyZW5kZXJlcikge1xuICAgIHZhciB0ZXh0TGF5ZXIgPSByZW5kZXJlci4kdGV4dExheWVyO1xuICAgIHZhciBsZW5zRWxlbWVudHMgPSB0ZXh0TGF5ZXIuJGxlbnNlcztcbiAgICBpZiAobGVuc0VsZW1lbnRzKVxuICAgICAgICBsZW5zRWxlbWVudHMuZm9yRWFjaChmdW5jdGlvbihlbCkge2VsLnJlbW92ZSgpOyB9KTtcbiAgICB0ZXh0TGF5ZXIuJGxlbnNlcyA9IG51bGw7XG59XG5cbmZ1bmN0aW9uIHJlbmRlcldpZGdldHMoY2hhbmdlcywgcmVuZGVyZXIpIHtcbiAgICB2YXIgY2hhbmdlZCA9IGNoYW5nZXMgJiByZW5kZXJlci5DSEFOR0VfTElORVNcbiAgICAgICAgfHwgY2hhbmdlcyAmIHJlbmRlcmVyLkNIQU5HRV9GVUxMXG4gICAgICAgIHx8IGNoYW5nZXMgJiByZW5kZXJlci5DSEFOR0VfU0NST0xMXG4gICAgICAgIHx8IGNoYW5nZXMgJiByZW5kZXJlci5DSEFOR0VfVEVYVDtcbiAgICBpZiAoIWNoYW5nZWQpXG4gICAgICAgIHJldHVybjtcblxuICAgIHZhciBzZXNzaW9uID0gcmVuZGVyZXIuc2Vzc2lvbjtcbiAgICB2YXIgbGluZVdpZGdldHMgPSByZW5kZXJlci5zZXNzaW9uLmxpbmVXaWRnZXRzO1xuICAgIHZhciB0ZXh0TGF5ZXIgPSByZW5kZXJlci4kdGV4dExheWVyO1xuICAgIHZhciBsZW5zRWxlbWVudHMgPSB0ZXh0TGF5ZXIuJGxlbnNlcztcbiAgICBpZiAoIWxpbmVXaWRnZXRzKSB7XG4gICAgICAgIGlmIChsZW5zRWxlbWVudHMpXG4gICAgICAgICAgICBjbGVhckxlbnNFbGVtZW50cyhyZW5kZXJlcik7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgdGV4dENlbGxzID0gcmVuZGVyZXIuJHRleHRMYXllci4kbGluZXMuY2VsbHM7XG4gICAgdmFyIGNvbmZpZyA9IHJlbmRlcmVyLmxheWVyQ29uZmlnO1xuICAgIHZhciBwYWRkaW5nID0gcmVuZGVyZXIuJHBhZGRpbmc7XG5cbiAgICBpZiAoIWxlbnNFbGVtZW50cylcbiAgICAgICAgbGVuc0VsZW1lbnRzID0gdGV4dExheWVyLiRsZW5zZXMgPSBbXTtcblxuXG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRleHRDZWxscy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgcm93ID0gdGV4dENlbGxzW2ldLnJvdztcbiAgICAgICAgdmFyIHdpZGdldCA9IGxpbmVXaWRnZXRzW3Jvd107XG4gICAgICAgIHZhciBsZW5zZXMgPSB3aWRnZXQgJiYgd2lkZ2V0LmxlbnNlcztcblxuICAgICAgICBpZiAoIWxlbnNlcyB8fCAhbGVuc2VzLmxlbmd0aCkgY29udGludWU7XG5cbiAgICAgICAgdmFyIGxlbnNDb250YWluZXIgPSBsZW5zRWxlbWVudHNbaW5kZXhdO1xuICAgICAgICBpZiAoIWxlbnNDb250YWluZXIpIHtcbiAgICAgICAgICAgIGxlbnNDb250YWluZXIgPSBsZW5zRWxlbWVudHNbaW5kZXhdXG4gICAgICAgICAgICAgICAgPSBkb20uYnVpbGREb20oW1wiZGl2XCIsIHtjbGFzczogXCJhY2VfY29kZUxlbnNcIn1dLCByZW5kZXJlci5jb250YWluZXIpO1xuICAgICAgICB9XG4gICAgICAgIGxlbnNDb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gY29uZmlnLmxpbmVIZWlnaHQgKyBcInB4XCI7XG4gICAgICAgIGluZGV4Kys7XG5cbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBsZW5zZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIHZhciBlbCA9IGxlbnNDb250YWluZXIuY2hpbGROb2Rlc1syICogal07XG4gICAgICAgICAgICBpZiAoIWVsKSB7XG4gICAgICAgICAgICAgICAgaWYgKGogIT0gMCkgbGVuc0NvbnRhaW5lci5hcHBlbmRDaGlsZChkb20uY3JlYXRlVGV4dE5vZGUoXCJcXHhhMHxcXHhhMFwiKSk7XG4gICAgICAgICAgICAgICAgZWwgPSBkb20uYnVpbGREb20oW1wiYVwiXSwgbGVuc0NvbnRhaW5lcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbC50ZXh0Q29udGVudCA9IGxlbnNlc1tqXS50aXRsZTtcbiAgICAgICAgICAgIGVsLmxlbnNDb21tYW5kID0gbGVuc2VzW2pdO1xuICAgICAgICB9XG4gICAgICAgIHdoaWxlIChsZW5zQ29udGFpbmVyLmNoaWxkTm9kZXMubGVuZ3RoID4gMiAqIGogLSAxKVxuICAgICAgICAgICAgbGVuc0NvbnRhaW5lci5sYXN0Q2hpbGQucmVtb3ZlKCk7XG5cbiAgICAgICAgdmFyIHRvcCA9IHJlbmRlcmVyLiRjdXJzb3JMYXllci5nZXRQaXhlbFBvc2l0aW9uKHtcbiAgICAgICAgICAgIHJvdzogcm93LFxuICAgICAgICAgICAgY29sdW1uOiAwXG4gICAgICAgIH0sIHRydWUpLnRvcCAtIGNvbmZpZy5saW5lSGVpZ2h0ICogd2lkZ2V0LnJvd3NBYm92ZSAtIGNvbmZpZy5vZmZzZXQ7XG4gICAgICAgIGxlbnNDb250YWluZXIuc3R5bGUudG9wID0gdG9wICsgXCJweFwiO1xuXG4gICAgICAgIHZhciBsZWZ0ID0gcmVuZGVyZXIuZ3V0dGVyV2lkdGg7XG4gICAgICAgIHZhciBpbmRlbnQgPSBzZXNzaW9uLmdldExpbmUocm93KS5zZWFyY2goL1xcU3wkLyk7XG4gICAgICAgIGlmIChpbmRlbnQgPT0gLTEpXG4gICAgICAgICAgICBpbmRlbnQgPSAwO1xuICAgICAgICBsZWZ0ICs9IGluZGVudCAqIGNvbmZpZy5jaGFyYWN0ZXJXaWR0aDtcbiAgICAgICAgbGVuc0NvbnRhaW5lci5zdHlsZS5wYWRkaW5nTGVmdCA9IHBhZGRpbmcgKyBsZWZ0ICsgXCJweFwiO1xuICAgIH1cbiAgICB3aGlsZSAoaW5kZXggPCBsZW5zRWxlbWVudHMubGVuZ3RoKVxuICAgICAgICBsZW5zRWxlbWVudHMucG9wKCkucmVtb3ZlKCk7XG59XG5cbmZ1bmN0aW9uIGNsZWFyQ29kZUxlbnNXaWRnZXRzKHNlc3Npb24pIHtcbiAgICBpZiAoIXNlc3Npb24ubGluZVdpZGdldHMpIHJldHVybjtcbiAgICB2YXIgd2lkZ2V0TWFuYWdlciA9IHNlc3Npb24ud2lkZ2V0TWFuYWdlcjtcbiAgICBzZXNzaW9uLmxpbmVXaWRnZXRzLmZvckVhY2goZnVuY3Rpb24od2lkZ2V0KSB7XG4gICAgICAgIGlmICh3aWRnZXQgJiYgd2lkZ2V0LmxlbnNlcylcbiAgICAgICAgICAgIHdpZGdldE1hbmFnZXIucmVtb3ZlTGluZVdpZGdldCh3aWRnZXQpO1xuICAgIH0pO1xufVxuXG5leHBvcnRzLnNldExlbnNlcyA9IGZ1bmN0aW9uKHNlc3Npb24sIGxlbnNlcykge1xuICAgIHZhciBmaXJzdFJvdyA9IE51bWJlci5NQVhfVkFMVUU7XG5cbiAgICBjbGVhckNvZGVMZW5zV2lkZ2V0cyhzZXNzaW9uKTtcbiAgICBsZW5zZXMgJiYgbGVuc2VzLmZvckVhY2goZnVuY3Rpb24obGVucykge1xuICAgICAgICB2YXIgcm93ID0gbGVucy5zdGFydC5yb3c7XG4gICAgICAgIHZhciBjb2x1bW4gPSBsZW5zLnN0YXJ0LmNvbHVtbjtcbiAgICAgICAgdmFyIHdpZGdldCA9IHNlc3Npb24ubGluZVdpZGdldHMgJiYgc2Vzc2lvbi5saW5lV2lkZ2V0c1tyb3ddO1xuICAgICAgICBpZiAoIXdpZGdldCB8fCAhd2lkZ2V0LmxlbnNlcykge1xuICAgICAgICAgICAgd2lkZ2V0ID0gc2Vzc2lvbi53aWRnZXRNYW5hZ2VyLiRyZWdpc3RlckxpbmVXaWRnZXQoe1xuICAgICAgICAgICAgICAgIHJvd0NvdW50OiAxLFxuICAgICAgICAgICAgICAgIHJvd3NBYm92ZTogMSxcbiAgICAgICAgICAgICAgICByb3c6IHJvdyxcbiAgICAgICAgICAgICAgICBjb2x1bW46IGNvbHVtbixcbiAgICAgICAgICAgICAgICBsZW5zZXM6IFtdXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB3aWRnZXQubGVuc2VzLnB1c2gobGVucy5jb21tYW5kKTtcbiAgICAgICAgaWYgKHJvdyA8IGZpcnN0Um93KVxuICAgICAgICAgICAgZmlyc3RSb3cgPSByb3c7XG4gICAgfSk7XG4gICAgc2Vzc2lvbi5fZW1pdChcImNoYW5nZUZvbGRcIiwge2RhdGE6IHtzdGFydDoge3JvdzogZmlyc3RSb3d9fX0pO1xuICAgIHJldHVybiBmaXJzdFJvdztcbn07XG5cbmZ1bmN0aW9uIGF0dGFjaFRvRWRpdG9yKGVkaXRvcikge1xuICAgIGVkaXRvci5jb2RlTGVuc1Byb3ZpZGVycyA9IFtdO1xuICAgIGVkaXRvci5yZW5kZXJlci5vbihcImFmdGVyUmVuZGVyXCIsIHJlbmRlcldpZGdldHMpO1xuICAgIGlmICghZWRpdG9yLiRjb2RlTGVuc0NsaWNrSGFuZGxlcikge1xuICAgICAgICBlZGl0b3IuJGNvZGVMZW5zQ2xpY2tIYW5kbGVyID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgdmFyIGNvbW1hbmQgPSBlLnRhcmdldC5sZW5zQ29tbWFuZDtcbiAgICAgICAgICAgIGlmICghY29tbWFuZCkgcmV0dXJuO1xuICAgICAgICAgICAgZWRpdG9yLmV4ZWNDb21tYW5kKGNvbW1hbmQuaWQsIGNvbW1hbmQuYXJndW1lbnRzKTtcbiAgICAgICAgICAgIGVkaXRvci5fZW1pdChcImNvZGVMZW5zQ2xpY2tcIiwgZSk7XG4gICAgICAgIH07XG4gICAgICAgIGV2ZW50LmFkZExpc3RlbmVyKGVkaXRvci5jb250YWluZXIsIFwiY2xpY2tcIiwgZWRpdG9yLiRjb2RlTGVuc0NsaWNrSGFuZGxlciwgZWRpdG9yKTtcbiAgICB9XG4gICAgZWRpdG9yLiR1cGRhdGVMZW5zZXMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHNlc3Npb24gPSBlZGl0b3Iuc2Vzc2lvbjtcbiAgICAgICAgaWYgKCFzZXNzaW9uKSByZXR1cm47XG5cbiAgICAgICAgaWYgKCFzZXNzaW9uLndpZGdldE1hbmFnZXIpIHtcbiAgICAgICAgICAgIHNlc3Npb24ud2lkZ2V0TWFuYWdlciA9IG5ldyBMaW5lV2lkZ2V0cyhzZXNzaW9uKTtcbiAgICAgICAgICAgIHNlc3Npb24ud2lkZ2V0TWFuYWdlci5hdHRhY2goZWRpdG9yKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBwcm92aWRlcnNUb1dhaXROdW0gPSBlZGl0b3IuY29kZUxlbnNQcm92aWRlcnMubGVuZ3RoO1xuICAgICAgICB2YXIgbGVuc2VzID0gW107XG4gICAgICAgIGVkaXRvci5jb2RlTGVuc1Byb3ZpZGVycy5mb3JFYWNoKGZ1bmN0aW9uKHByb3ZpZGVyKSB7XG4gICAgICAgICAgICBwcm92aWRlci5wcm92aWRlQ29kZUxlbnNlcyhzZXNzaW9uLCBmdW5jdGlvbihlcnIsIHBheWxvYWQpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSByZXR1cm47XG4gICAgICAgICAgICAgICAgcGF5bG9hZC5mb3JFYWNoKGZ1bmN0aW9uKGxlbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgbGVuc2VzLnB1c2gobGVucyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcHJvdmlkZXJzVG9XYWl0TnVtLS07XG4gICAgICAgICAgICAgICAgaWYgKHByb3ZpZGVyc1RvV2FpdE51bSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGFwcGx5TGVuc2VzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZ1bmN0aW9uIGFwcGx5TGVuc2VzKCkge1xuICAgICAgICAgICAgdmFyIGN1cnNvciA9IHNlc3Npb24uc2VsZWN0aW9uLmN1cnNvcjtcbiAgICAgICAgICAgIHZhciBvbGRSb3cgPSBzZXNzaW9uLmRvY3VtZW50VG9TY3JlZW5Sb3coY3Vyc29yKTtcbiAgICAgICAgICAgIHZhciBzY3JvbGxUb3AgPSBzZXNzaW9uLmdldFNjcm9sbFRvcCgpO1xuICAgICAgICAgICAgdmFyIGZpcnN0Um93ID0gZXhwb3J0cy5zZXRMZW5zZXMoc2Vzc2lvbiwgbGVuc2VzKTtcblxuICAgICAgICAgICAgdmFyIGxhc3REZWx0YSA9IHNlc3Npb24uJHVuZG9NYW5hZ2VyICYmIHNlc3Npb24uJHVuZG9NYW5hZ2VyLiRsYXN0RGVsdGE7XG4gICAgICAgICAgICBpZiAobGFzdERlbHRhICYmIGxhc3REZWx0YS5hY3Rpb24gPT0gXCJyZW1vdmVcIiAmJiBsYXN0RGVsdGEubGluZXMubGVuZ3RoID4gMSlcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB2YXIgcm93ID0gc2Vzc2lvbi5kb2N1bWVudFRvU2NyZWVuUm93KGN1cnNvcik7XG4gICAgICAgICAgICB2YXIgbGluZUhlaWdodCA9IGVkaXRvci5yZW5kZXJlci5sYXllckNvbmZpZy5saW5lSGVpZ2h0O1xuICAgICAgICAgICAgdmFyIHRvcCA9IHNlc3Npb24uZ2V0U2Nyb2xsVG9wKCkgKyAocm93IC0gb2xkUm93KSAqIGxpbmVIZWlnaHQ7XG4gICAgICAgICAgICAvLyBzcGVjaWFsIGNhc2UgZm9yIHRoZSBsZW5zIG9uIGxpbmUgMCwgYmVjYXVzZSBpdCBjYW4ndCBiZSBzY3JvbGxlZCBpbnRvIHZpZXcgd2l0aCBrZXlib2FyZCBcbiAgICAgICAgICAgIGlmIChmaXJzdFJvdyA9PSAwICYmIHNjcm9sbFRvcCA8IGxpbmVIZWlnaHQgLzQgJiYgc2Nyb2xsVG9wID4gLWxpbmVIZWlnaHQvNCkge1xuICAgICAgICAgICAgICAgIHRvcCA9IC1saW5lSGVpZ2h0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2Vzc2lvbi5zZXRTY3JvbGxUb3AodG9wKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdmFyIHVwZGF0ZUxlbnNlcyA9IGxhbmcuZGVsYXllZENhbGwoZWRpdG9yLiR1cGRhdGVMZW5zZXMpO1xuICAgIGVkaXRvci4kdXBkYXRlTGVuc2VzT25JbnB1dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB1cGRhdGVMZW5zZXMuZGVsYXkoMjUwKTtcbiAgICB9O1xuICAgIGVkaXRvci5vbihcImlucHV0XCIsIGVkaXRvci4kdXBkYXRlTGVuc2VzT25JbnB1dCk7XG59XG5cbmZ1bmN0aW9uIGRldGFjaEZyb21FZGl0b3IoZWRpdG9yKSB7XG4gICAgZWRpdG9yLm9mZihcImlucHV0XCIsIGVkaXRvci4kdXBkYXRlTGVuc2VzT25JbnB1dCk7XG4gICAgZWRpdG9yLnJlbmRlcmVyLm9mZihcImFmdGVyUmVuZGVyXCIsIHJlbmRlcldpZGdldHMpO1xuICAgIGlmIChlZGl0b3IuJGNvZGVMZW5zQ2xpY2tIYW5kbGVyKVxuICAgICAgICBlZGl0b3IuY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlZGl0b3IuJGNvZGVMZW5zQ2xpY2tIYW5kbGVyKTtcbn1cblxuZXhwb3J0cy5yZWdpc3RlckNvZGVMZW5zUHJvdmlkZXIgPSBmdW5jdGlvbihlZGl0b3IsIGNvZGVMZW5zUHJvdmlkZXIpIHtcbiAgICBlZGl0b3Iuc2V0T3B0aW9uKFwiZW5hYmxlQ29kZUxlbnNcIiwgdHJ1ZSk7XG4gICAgZWRpdG9yLmNvZGVMZW5zUHJvdmlkZXJzLnB1c2goY29kZUxlbnNQcm92aWRlcik7XG4gICAgZWRpdG9yLiR1cGRhdGVMZW5zZXNPbklucHV0KCk7XG59O1xuXG5leHBvcnRzLmNsZWFyID0gZnVuY3Rpb24oc2Vzc2lvbikge1xuICAgIGV4cG9ydHMuc2V0TGVuc2VzKHNlc3Npb24sIG51bGwpO1xufTtcblxudmFyIEVkaXRvciA9IHJlcXVpcmUoXCIuLi9lZGl0b3JcIikuRWRpdG9yO1xucmVxdWlyZShcIi4uL2NvbmZpZ1wiKS5kZWZpbmVPcHRpb25zKEVkaXRvci5wcm90b3R5cGUsIFwiZWRpdG9yXCIsIHtcbiAgICBlbmFibGVDb2RlTGVuczoge1xuICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgICAgIGF0dGFjaFRvRWRpdG9yKHRoaXMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkZXRhY2hGcm9tRWRpdG9yKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSk7XG5cbmRvbS5pbXBvcnRDc3NTdHJpbmcoYFxuLmFjZV9jb2RlTGVucyB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGNvbG9yOiAjYWFhO1xuICAgIGZvbnQtc2l6ZTogODglO1xuICAgIGJhY2tncm91bmQ6IGluaGVyaXQ7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogZmxleC1lbmQ7XG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG59XG4uYWNlX2NvZGVMZW5zID4gYSB7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIHBvaW50ZXItZXZlbnRzOiBhdXRvO1xufVxuLmFjZV9jb2RlTGVucyA+IGE6aG92ZXIge1xuICAgIGNvbG9yOiAjMDAwMGZmO1xuICAgIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xufVxuLmFjZV9kYXJrID4gLmFjZV9jb2RlTGVucyA+IGE6aG92ZXIge1xuICAgIGNvbG9yOiAjNGU5NGNlO1xufVxuYCwgXCJjb2RlbGVuc2UuY3NzXCIsIGZhbHNlKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==