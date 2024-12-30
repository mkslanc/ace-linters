"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[1377],{

/***/ 91377:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/**
 * @typedef {import("../edit_session").EditSession} EditSession
 * @typedef {import("../virtual_renderer").VirtualRenderer & {$textLayer: import("../layer/text").Text &{$lenses: any}}} VirtualRenderer
 */

var event = __webpack_require__(19631);
var lang = __webpack_require__(39955);
var dom = __webpack_require__(71435);

/**
 * @param {VirtualRenderer} renderer
 */
function clearLensElements(renderer) {
    var textLayer = renderer.$textLayer;
    var lensElements = textLayer.$lenses;
    if (lensElements)
        lensElements.forEach(function(el) {el.remove(); });
    textLayer.$lenses = null;
}

/**
 * @param {number} changes
 * @param {VirtualRenderer} renderer
 */
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

/**
 * @param {EditSession} session
 */
function clearCodeLensWidgets(session) {
    if (!session.lineWidgets) return;
    var widgetManager = session.widgetManager;
    session.lineWidgets.forEach(function(widget) {
        if (widget && widget.lenses)
            widgetManager.removeLineWidget(widget);
    });
}

/**
 *
 * @param {EditSession} session
 * @param {import("../../ace-internal").Ace.CodeLense[]} lenses
 * @return {number}
 */
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

/**
 * @param {import("../editor").Editor} editor
 */
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

/**
 * @param {import("../editor").Editor} editor
 */
function detachFromEditor(editor) {
    editor.off("input", editor.$updateLensesOnInput);
    editor.renderer.off("afterRender", renderWidgets);
    if (editor.$codeLensClickHandler)
        editor.container.removeEventListener("click", editor.$codeLensClickHandler);
}

/**
 * @param {import("../editor").Editor} editor
 * @param {import("../../ace-internal").Ace.CodeLenseProvider} codeLensProvider
 */
exports.registerCodeLensProvider = function(editor, codeLensProvider) {
    editor.setOption("enableCodeLens", true);
    editor.codeLensProviders.push(codeLensProvider);
    editor.$updateLensesOnInput();
};

/**
 * @param {EditSession} session
 */
exports.clear = function(session) {
    exports.setLenses(session, null);
};

var Editor = (__webpack_require__(27258).Editor);
(__webpack_require__(76321).defineOptions)(Editor.prototype, "editor", {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjEzNzcuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7QUFDYjtBQUNBLGFBQWEsdUNBQXVDO0FBQ3BELGFBQWEsaURBQWlELDJDQUEyQyxnQkFBZ0I7QUFDekg7O0FBRUEsWUFBWSxtQkFBTyxDQUFDLEtBQWM7QUFDbEMsV0FBVyxtQkFBTyxDQUFDLEtBQWE7QUFDaEMsVUFBVSxtQkFBTyxDQUFDLEtBQVk7O0FBRTlCO0FBQ0EsV0FBVyxpQkFBaUI7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxjQUFjO0FBQ3pEO0FBQ0E7O0FBRUE7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxpQkFBaUI7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0Esb0JBQW9CLHNCQUFzQjtBQUMxQztBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLHNCQUFzQjtBQUM5RDtBQUNBO0FBQ0E7O0FBRUEsd0JBQXdCLG1CQUFtQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxXQUFXLGFBQWE7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBLFdBQVcsYUFBYTtBQUN4QixXQUFXLDhDQUE4QztBQUN6RCxZQUFZO0FBQ1o7QUFDQSxpQkFBaUI7QUFDakI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLGlDQUFpQyxPQUFPLFFBQVEsZ0JBQWdCO0FBQ2hFO0FBQ0E7O0FBRUE7QUFDQSxXQUFXLDRCQUE0QjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxXQUFXLDRCQUE0QjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFdBQVcsNEJBQTRCO0FBQ3ZDLFdBQVcsb0RBQW9EO0FBQy9EO0FBQ0EsZ0NBQWdDO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsV0FBVyxhQUFhO0FBQ3hCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUEsYUFBYSxtQ0FBMkI7QUFDeEMsMENBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvZXh0L2NvZGVfbGVucy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbi8qKlxuICogQHR5cGVkZWYge2ltcG9ydChcIi4uL2VkaXRfc2Vzc2lvblwiKS5FZGl0U2Vzc2lvbn0gRWRpdFNlc3Npb25cbiAqIEB0eXBlZGVmIHtpbXBvcnQoXCIuLi92aXJ0dWFsX3JlbmRlcmVyXCIpLlZpcnR1YWxSZW5kZXJlciAmIHskdGV4dExheWVyOiBpbXBvcnQoXCIuLi9sYXllci90ZXh0XCIpLlRleHQgJnskbGVuc2VzOiBhbnl9fX0gVmlydHVhbFJlbmRlcmVyXG4gKi9cblxudmFyIGV2ZW50ID0gcmVxdWlyZShcIi4uL2xpYi9ldmVudFwiKTtcbnZhciBsYW5nID0gcmVxdWlyZShcIi4uL2xpYi9sYW5nXCIpO1xudmFyIGRvbSA9IHJlcXVpcmUoXCIuLi9saWIvZG9tXCIpO1xuXG4vKipcbiAqIEBwYXJhbSB7VmlydHVhbFJlbmRlcmVyfSByZW5kZXJlclxuICovXG5mdW5jdGlvbiBjbGVhckxlbnNFbGVtZW50cyhyZW5kZXJlcikge1xuICAgIHZhciB0ZXh0TGF5ZXIgPSByZW5kZXJlci4kdGV4dExheWVyO1xuICAgIHZhciBsZW5zRWxlbWVudHMgPSB0ZXh0TGF5ZXIuJGxlbnNlcztcbiAgICBpZiAobGVuc0VsZW1lbnRzKVxuICAgICAgICBsZW5zRWxlbWVudHMuZm9yRWFjaChmdW5jdGlvbihlbCkge2VsLnJlbW92ZSgpOyB9KTtcbiAgICB0ZXh0TGF5ZXIuJGxlbnNlcyA9IG51bGw7XG59XG5cbi8qKlxuICogQHBhcmFtIHtudW1iZXJ9IGNoYW5nZXNcbiAqIEBwYXJhbSB7VmlydHVhbFJlbmRlcmVyfSByZW5kZXJlclxuICovXG5mdW5jdGlvbiByZW5kZXJXaWRnZXRzKGNoYW5nZXMsIHJlbmRlcmVyKSB7XG4gICAgdmFyIGNoYW5nZWQgPSBjaGFuZ2VzICYgcmVuZGVyZXIuQ0hBTkdFX0xJTkVTXG4gICAgICAgIHx8IGNoYW5nZXMgJiByZW5kZXJlci5DSEFOR0VfRlVMTFxuICAgICAgICB8fCBjaGFuZ2VzICYgcmVuZGVyZXIuQ0hBTkdFX1NDUk9MTFxuICAgICAgICB8fCBjaGFuZ2VzICYgcmVuZGVyZXIuQ0hBTkdFX1RFWFQ7XG4gICAgaWYgKCFjaGFuZ2VkKVxuICAgICAgICByZXR1cm47XG5cbiAgICB2YXIgc2Vzc2lvbiA9IHJlbmRlcmVyLnNlc3Npb247XG4gICAgdmFyIGxpbmVXaWRnZXRzID0gcmVuZGVyZXIuc2Vzc2lvbi5saW5lV2lkZ2V0cztcbiAgICB2YXIgdGV4dExheWVyID0gcmVuZGVyZXIuJHRleHRMYXllcjtcbiAgICB2YXIgbGVuc0VsZW1lbnRzID0gdGV4dExheWVyLiRsZW5zZXM7XG4gICAgaWYgKCFsaW5lV2lkZ2V0cykge1xuICAgICAgICBpZiAobGVuc0VsZW1lbnRzKVxuICAgICAgICAgICAgY2xlYXJMZW5zRWxlbWVudHMocmVuZGVyZXIpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHRleHRDZWxscyA9IHJlbmRlcmVyLiR0ZXh0TGF5ZXIuJGxpbmVzLmNlbGxzO1xuICAgIHZhciBjb25maWcgPSByZW5kZXJlci5sYXllckNvbmZpZztcbiAgICB2YXIgcGFkZGluZyA9IHJlbmRlcmVyLiRwYWRkaW5nO1xuXG4gICAgaWYgKCFsZW5zRWxlbWVudHMpXG4gICAgICAgIGxlbnNFbGVtZW50cyA9IHRleHRMYXllci4kbGVuc2VzID0gW107XG5cblxuICAgIHZhciBpbmRleCA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0ZXh0Q2VsbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHJvdyA9IHRleHRDZWxsc1tpXS5yb3c7XG4gICAgICAgIHZhciB3aWRnZXQgPSBsaW5lV2lkZ2V0c1tyb3ddO1xuICAgICAgICB2YXIgbGVuc2VzID0gd2lkZ2V0ICYmIHdpZGdldC5sZW5zZXM7XG5cbiAgICAgICAgaWYgKCFsZW5zZXMgfHwgIWxlbnNlcy5sZW5ndGgpIGNvbnRpbnVlO1xuXG4gICAgICAgIHZhciBsZW5zQ29udGFpbmVyID0gbGVuc0VsZW1lbnRzW2luZGV4XTtcbiAgICAgICAgaWYgKCFsZW5zQ29udGFpbmVyKSB7XG4gICAgICAgICAgICBsZW5zQ29udGFpbmVyID0gbGVuc0VsZW1lbnRzW2luZGV4XVxuICAgICAgICAgICAgICAgID0gZG9tLmJ1aWxkRG9tKFtcImRpdlwiLCB7Y2xhc3M6IFwiYWNlX2NvZGVMZW5zXCJ9XSwgcmVuZGVyZXIuY29udGFpbmVyKTtcbiAgICAgICAgfVxuICAgICAgICBsZW5zQ29udGFpbmVyLnN0eWxlLmhlaWdodCA9IGNvbmZpZy5saW5lSGVpZ2h0ICsgXCJweFwiO1xuICAgICAgICBpbmRleCsrO1xuXG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgbGVuc2VzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICB2YXIgZWwgPSBsZW5zQ29udGFpbmVyLmNoaWxkTm9kZXNbMiAqIGpdO1xuICAgICAgICAgICAgaWYgKCFlbCkge1xuICAgICAgICAgICAgICAgIGlmIChqICE9IDApIGxlbnNDb250YWluZXIuYXBwZW5kQ2hpbGQoZG9tLmNyZWF0ZVRleHROb2RlKFwiXFx4YTB8XFx4YTBcIikpO1xuICAgICAgICAgICAgICAgIGVsID0gZG9tLmJ1aWxkRG9tKFtcImFcIl0sIGxlbnNDb250YWluZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWwudGV4dENvbnRlbnQgPSBsZW5zZXNbal0udGl0bGU7XG4gICAgICAgICAgICBlbC5sZW5zQ29tbWFuZCA9IGxlbnNlc1tqXTtcbiAgICAgICAgfVxuICAgICAgICB3aGlsZSAobGVuc0NvbnRhaW5lci5jaGlsZE5vZGVzLmxlbmd0aCA+IDIgKiBqIC0gMSlcbiAgICAgICAgICAgIGxlbnNDb250YWluZXIubGFzdENoaWxkLnJlbW92ZSgpO1xuXG4gICAgICAgIHZhciB0b3AgPSByZW5kZXJlci4kY3Vyc29yTGF5ZXIuZ2V0UGl4ZWxQb3NpdGlvbih7XG4gICAgICAgICAgICByb3c6IHJvdyxcbiAgICAgICAgICAgIGNvbHVtbjogMFxuICAgICAgICB9LCB0cnVlKS50b3AgLSBjb25maWcubGluZUhlaWdodCAqIHdpZGdldC5yb3dzQWJvdmUgLSBjb25maWcub2Zmc2V0O1xuICAgICAgICBsZW5zQ29udGFpbmVyLnN0eWxlLnRvcCA9IHRvcCArIFwicHhcIjtcblxuICAgICAgICB2YXIgbGVmdCA9IHJlbmRlcmVyLmd1dHRlcldpZHRoO1xuICAgICAgICB2YXIgaW5kZW50ID0gc2Vzc2lvbi5nZXRMaW5lKHJvdykuc2VhcmNoKC9cXFN8JC8pO1xuICAgICAgICBpZiAoaW5kZW50ID09IC0xKVxuICAgICAgICAgICAgaW5kZW50ID0gMDtcbiAgICAgICAgbGVmdCArPSBpbmRlbnQgKiBjb25maWcuY2hhcmFjdGVyV2lkdGg7XG4gICAgICAgIGxlbnNDb250YWluZXIuc3R5bGUucGFkZGluZ0xlZnQgPSBwYWRkaW5nICsgbGVmdCArIFwicHhcIjtcbiAgICB9XG4gICAgd2hpbGUgKGluZGV4IDwgbGVuc0VsZW1lbnRzLmxlbmd0aClcbiAgICAgICAgbGVuc0VsZW1lbnRzLnBvcCgpLnJlbW92ZSgpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7RWRpdFNlc3Npb259IHNlc3Npb25cbiAqL1xuZnVuY3Rpb24gY2xlYXJDb2RlTGVuc1dpZGdldHMoc2Vzc2lvbikge1xuICAgIGlmICghc2Vzc2lvbi5saW5lV2lkZ2V0cykgcmV0dXJuO1xuICAgIHZhciB3aWRnZXRNYW5hZ2VyID0gc2Vzc2lvbi53aWRnZXRNYW5hZ2VyO1xuICAgIHNlc3Npb24ubGluZVdpZGdldHMuZm9yRWFjaChmdW5jdGlvbih3aWRnZXQpIHtcbiAgICAgICAgaWYgKHdpZGdldCAmJiB3aWRnZXQubGVuc2VzKVxuICAgICAgICAgICAgd2lkZ2V0TWFuYWdlci5yZW1vdmVMaW5lV2lkZ2V0KHdpZGdldCk7XG4gICAgfSk7XG59XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7RWRpdFNlc3Npb259IHNlc3Npb25cbiAqIEBwYXJhbSB7aW1wb3J0KFwiLi4vLi4vYWNlLWludGVybmFsXCIpLkFjZS5Db2RlTGVuc2VbXX0gbGVuc2VzXG4gKiBAcmV0dXJuIHtudW1iZXJ9XG4gKi9cbmV4cG9ydHMuc2V0TGVuc2VzID0gZnVuY3Rpb24oc2Vzc2lvbiwgbGVuc2VzKSB7XG4gICAgdmFyIGZpcnN0Um93ID0gTnVtYmVyLk1BWF9WQUxVRTtcblxuICAgIGNsZWFyQ29kZUxlbnNXaWRnZXRzKHNlc3Npb24pO1xuICAgIGxlbnNlcyAmJiBsZW5zZXMuZm9yRWFjaChmdW5jdGlvbihsZW5zKSB7XG4gICAgICAgIHZhciByb3cgPSBsZW5zLnN0YXJ0LnJvdztcbiAgICAgICAgdmFyIGNvbHVtbiA9IGxlbnMuc3RhcnQuY29sdW1uO1xuICAgICAgICB2YXIgd2lkZ2V0ID0gc2Vzc2lvbi5saW5lV2lkZ2V0cyAmJiBzZXNzaW9uLmxpbmVXaWRnZXRzW3Jvd107XG4gICAgICAgIGlmICghd2lkZ2V0IHx8ICF3aWRnZXQubGVuc2VzKSB7XG4gICAgICAgICAgICB3aWRnZXQgPSBzZXNzaW9uLndpZGdldE1hbmFnZXIuJHJlZ2lzdGVyTGluZVdpZGdldCh7XG4gICAgICAgICAgICAgICAgcm93Q291bnQ6IDEsXG4gICAgICAgICAgICAgICAgcm93c0Fib3ZlOiAxLFxuICAgICAgICAgICAgICAgIHJvdzogcm93LFxuICAgICAgICAgICAgICAgIGNvbHVtbjogY29sdW1uLFxuICAgICAgICAgICAgICAgIGxlbnNlczogW11cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHdpZGdldC5sZW5zZXMucHVzaChsZW5zLmNvbW1hbmQpO1xuICAgICAgICBpZiAocm93IDwgZmlyc3RSb3cpXG4gICAgICAgICAgICBmaXJzdFJvdyA9IHJvdztcbiAgICB9KTtcbiAgICBzZXNzaW9uLl9lbWl0KFwiY2hhbmdlRm9sZFwiLCB7ZGF0YToge3N0YXJ0OiB7cm93OiBmaXJzdFJvd319fSk7XG4gICAgcmV0dXJuIGZpcnN0Um93O1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge2ltcG9ydChcIi4uL2VkaXRvclwiKS5FZGl0b3J9IGVkaXRvclxuICovXG5mdW5jdGlvbiBhdHRhY2hUb0VkaXRvcihlZGl0b3IpIHtcbiAgICBlZGl0b3IuY29kZUxlbnNQcm92aWRlcnMgPSBbXTtcbiAgICBlZGl0b3IucmVuZGVyZXIub24oXCJhZnRlclJlbmRlclwiLCByZW5kZXJXaWRnZXRzKTtcbiAgICBpZiAoIWVkaXRvci4kY29kZUxlbnNDbGlja0hhbmRsZXIpIHtcbiAgICAgICAgZWRpdG9yLiRjb2RlTGVuc0NsaWNrSGFuZGxlciA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIHZhciBjb21tYW5kID0gZS50YXJnZXQubGVuc0NvbW1hbmQ7XG4gICAgICAgICAgICBpZiAoIWNvbW1hbmQpIHJldHVybjtcbiAgICAgICAgICAgIGVkaXRvci5leGVjQ29tbWFuZChjb21tYW5kLmlkLCBjb21tYW5kLmFyZ3VtZW50cyk7XG4gICAgICAgICAgICBlZGl0b3IuX2VtaXQoXCJjb2RlTGVuc0NsaWNrXCIsIGUpO1xuICAgICAgICB9O1xuICAgICAgICBldmVudC5hZGRMaXN0ZW5lcihlZGl0b3IuY29udGFpbmVyLCBcImNsaWNrXCIsIGVkaXRvci4kY29kZUxlbnNDbGlja0hhbmRsZXIsIGVkaXRvcik7XG4gICAgfVxuICAgIGVkaXRvci4kdXBkYXRlTGVuc2VzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzZXNzaW9uID0gZWRpdG9yLnNlc3Npb247XG4gICAgICAgIGlmICghc2Vzc2lvbikgcmV0dXJuO1xuXG4gICAgICAgIHZhciBwcm92aWRlcnNUb1dhaXROdW0gPSBlZGl0b3IuY29kZUxlbnNQcm92aWRlcnMubGVuZ3RoO1xuICAgICAgICB2YXIgbGVuc2VzID0gW107XG4gICAgICAgIGVkaXRvci5jb2RlTGVuc1Byb3ZpZGVycy5mb3JFYWNoKGZ1bmN0aW9uKHByb3ZpZGVyKSB7XG4gICAgICAgICAgICBwcm92aWRlci5wcm92aWRlQ29kZUxlbnNlcyhzZXNzaW9uLCBmdW5jdGlvbihlcnIsIHBheWxvYWQpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSByZXR1cm47XG4gICAgICAgICAgICAgICAgcGF5bG9hZC5mb3JFYWNoKGZ1bmN0aW9uKGxlbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgbGVuc2VzLnB1c2gobGVucyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcHJvdmlkZXJzVG9XYWl0TnVtLS07XG4gICAgICAgICAgICAgICAgaWYgKHByb3ZpZGVyc1RvV2FpdE51bSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGFwcGx5TGVuc2VzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZ1bmN0aW9uIGFwcGx5TGVuc2VzKCkge1xuICAgICAgICAgICAgdmFyIGN1cnNvciA9IHNlc3Npb24uc2VsZWN0aW9uLmN1cnNvcjtcbiAgICAgICAgICAgIHZhciBvbGRSb3cgPSBzZXNzaW9uLmRvY3VtZW50VG9TY3JlZW5Sb3coY3Vyc29yKTtcbiAgICAgICAgICAgIHZhciBzY3JvbGxUb3AgPSBzZXNzaW9uLmdldFNjcm9sbFRvcCgpO1xuICAgICAgICAgICAgdmFyIGZpcnN0Um93ID0gZXhwb3J0cy5zZXRMZW5zZXMoc2Vzc2lvbiwgbGVuc2VzKTtcblxuICAgICAgICAgICAgdmFyIGxhc3REZWx0YSA9IHNlc3Npb24uJHVuZG9NYW5hZ2VyICYmIHNlc3Npb24uJHVuZG9NYW5hZ2VyLiRsYXN0RGVsdGE7XG4gICAgICAgICAgICBpZiAobGFzdERlbHRhICYmIGxhc3REZWx0YS5hY3Rpb24gPT0gXCJyZW1vdmVcIiAmJiBsYXN0RGVsdGEubGluZXMubGVuZ3RoID4gMSlcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB2YXIgcm93ID0gc2Vzc2lvbi5kb2N1bWVudFRvU2NyZWVuUm93KGN1cnNvcik7XG4gICAgICAgICAgICB2YXIgbGluZUhlaWdodCA9IGVkaXRvci5yZW5kZXJlci5sYXllckNvbmZpZy5saW5lSGVpZ2h0O1xuICAgICAgICAgICAgdmFyIHRvcCA9IHNlc3Npb24uZ2V0U2Nyb2xsVG9wKCkgKyAocm93IC0gb2xkUm93KSAqIGxpbmVIZWlnaHQ7XG4gICAgICAgICAgICAvLyBzcGVjaWFsIGNhc2UgZm9yIHRoZSBsZW5zIG9uIGxpbmUgMCwgYmVjYXVzZSBpdCBjYW4ndCBiZSBzY3JvbGxlZCBpbnRvIHZpZXcgd2l0aCBrZXlib2FyZFxuICAgICAgICAgICAgaWYgKGZpcnN0Um93ID09IDAgJiYgc2Nyb2xsVG9wIDwgbGluZUhlaWdodCAvNCAmJiBzY3JvbGxUb3AgPiAtbGluZUhlaWdodC80KSB7XG4gICAgICAgICAgICAgICAgdG9wID0gLWxpbmVIZWlnaHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZXNzaW9uLnNldFNjcm9sbFRvcCh0b3ApO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB2YXIgdXBkYXRlTGVuc2VzID0gbGFuZy5kZWxheWVkQ2FsbChlZGl0b3IuJHVwZGF0ZUxlbnNlcyk7XG4gICAgZWRpdG9yLiR1cGRhdGVMZW5zZXNPbklucHV0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHVwZGF0ZUxlbnNlcy5kZWxheSgyNTApO1xuICAgIH07XG4gICAgZWRpdG9yLm9uKFwiaW5wdXRcIiwgZWRpdG9yLiR1cGRhdGVMZW5zZXNPbklucHV0KTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge2ltcG9ydChcIi4uL2VkaXRvclwiKS5FZGl0b3J9IGVkaXRvclxuICovXG5mdW5jdGlvbiBkZXRhY2hGcm9tRWRpdG9yKGVkaXRvcikge1xuICAgIGVkaXRvci5vZmYoXCJpbnB1dFwiLCBlZGl0b3IuJHVwZGF0ZUxlbnNlc09uSW5wdXQpO1xuICAgIGVkaXRvci5yZW5kZXJlci5vZmYoXCJhZnRlclJlbmRlclwiLCByZW5kZXJXaWRnZXRzKTtcbiAgICBpZiAoZWRpdG9yLiRjb2RlTGVuc0NsaWNrSGFuZGxlcilcbiAgICAgICAgZWRpdG9yLmNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZWRpdG9yLiRjb2RlTGVuc0NsaWNrSGFuZGxlcik7XG59XG5cbi8qKlxuICogQHBhcmFtIHtpbXBvcnQoXCIuLi9lZGl0b3JcIikuRWRpdG9yfSBlZGl0b3JcbiAqIEBwYXJhbSB7aW1wb3J0KFwiLi4vLi4vYWNlLWludGVybmFsXCIpLkFjZS5Db2RlTGVuc2VQcm92aWRlcn0gY29kZUxlbnNQcm92aWRlclxuICovXG5leHBvcnRzLnJlZ2lzdGVyQ29kZUxlbnNQcm92aWRlciA9IGZ1bmN0aW9uKGVkaXRvciwgY29kZUxlbnNQcm92aWRlcikge1xuICAgIGVkaXRvci5zZXRPcHRpb24oXCJlbmFibGVDb2RlTGVuc1wiLCB0cnVlKTtcbiAgICBlZGl0b3IuY29kZUxlbnNQcm92aWRlcnMucHVzaChjb2RlTGVuc1Byb3ZpZGVyKTtcbiAgICBlZGl0b3IuJHVwZGF0ZUxlbnNlc09uSW5wdXQoKTtcbn07XG5cbi8qKlxuICogQHBhcmFtIHtFZGl0U2Vzc2lvbn0gc2Vzc2lvblxuICovXG5leHBvcnRzLmNsZWFyID0gZnVuY3Rpb24oc2Vzc2lvbikge1xuICAgIGV4cG9ydHMuc2V0TGVuc2VzKHNlc3Npb24sIG51bGwpO1xufTtcblxudmFyIEVkaXRvciA9IHJlcXVpcmUoXCIuLi9lZGl0b3JcIikuRWRpdG9yO1xucmVxdWlyZShcIi4uL2NvbmZpZ1wiKS5kZWZpbmVPcHRpb25zKEVkaXRvci5wcm90b3R5cGUsIFwiZWRpdG9yXCIsIHtcbiAgICBlbmFibGVDb2RlTGVuczoge1xuICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgICAgIGF0dGFjaFRvRWRpdG9yKHRoaXMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkZXRhY2hGcm9tRWRpdG9yKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSk7XG5cbmRvbS5pbXBvcnRDc3NTdHJpbmcoYFxuLmFjZV9jb2RlTGVucyB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGNvbG9yOiAjYWFhO1xuICAgIGZvbnQtc2l6ZTogODglO1xuICAgIGJhY2tncm91bmQ6IGluaGVyaXQ7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogZmxleC1lbmQ7XG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG59XG4uYWNlX2NvZGVMZW5zID4gYSB7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIHBvaW50ZXItZXZlbnRzOiBhdXRvO1xufVxuLmFjZV9jb2RlTGVucyA+IGE6aG92ZXIge1xuICAgIGNvbG9yOiAjMDAwMGZmO1xuICAgIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xufVxuLmFjZV9kYXJrID4gLmFjZV9jb2RlTGVucyA+IGE6aG92ZXIge1xuICAgIGNvbG9yOiAjNGU5NGNlO1xufVxuYCwgXCJjb2RlbGVuc2UuY3NzXCIsIGZhbHNlKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==