"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[1377],{

/***/ 91377:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/**
 * @typedef {import("../edit_session").EditSession} EditSession
 * @typedef {import("../virtual_renderer").VirtualRenderer & {$textLayer: import("../layer/text").Text &{$lenses: HTMLElement[]}}} VirtualRenderer
 * @typedef {import("../../ace-internal").Ace.CodeLenseCommand} CodeLenseCommand
 * @typedef {import("../../ace-internal").Ace.CodeLense} CodeLense
 */

var event = __webpack_require__(19631);
var lang = __webpack_require__(39955);
var dom = __webpack_require__(71435);

/**
 * Clears all code lens elements from the renderer
 * @param {VirtualRenderer} renderer The renderer to clear lens elements from
 */
function clearLensElements(renderer) {
    var textLayer = renderer.$textLayer;
    /** @type {HTMLElement[]} */
    var lensElements = textLayer.$lenses;
    if (lensElements)
        lensElements.forEach(function(el) {el.remove(); });
    textLayer.$lenses = null;
}

/**
 * Renders code lens widgets based on changes to the editor
 * @param {number} changes Bitmask of change types
 * @param {VirtualRenderer} renderer The renderer to update
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
            /** @type {HTMLElement & { lensCommand : CodeLenseCommand}} */
            (el).lensCommand = lenses[j];
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
 * Clears all code lens widgets from the session
 * @param {EditSession} session The session to clear code lens widgets from
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
 * Sets code lenses for the given session
 * @param {EditSession} session The session to set code lenses for
 * @param {import("../../ace-internal").Ace.CodeLense[]} lenses Array of code lenses to set
 * @return {number} The row of the first code lens or Number.MAX_VALUE if no lenses
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
 * Attaches code lens functionality to an editor
 * @param {import("../editor").Editor} editor The editor to attach to
 */
function attachToEditor(editor) {
    editor.codeLensProviders = [];
    editor.renderer.on("afterRender", renderWidgets);
    if (!editor.$codeLensClickHandler) {
        editor.$codeLensClickHandler = function(e) {
            /** @type {CodeLenseCommand} */
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
 * Detaches code lens functionality from an editor
 * @param {import("../editor").Editor} editor The editor to detach from
 */
function detachFromEditor(editor) {
    editor.off("input", editor.$updateLensesOnInput);
    editor.renderer.off("afterRender", renderWidgets);
    if (editor.$codeLensClickHandler)
        editor.container.removeEventListener("click", editor.$codeLensClickHandler);
}

/**
 * Registers a code lens provider with an editor
 * @param {import("../editor").Editor} editor The editor to register the provider with
 * @param {import("../../ace-internal").Ace.CodeLenseProvider} codeLensProvider The provider to register
 */
exports.registerCodeLensProvider = function(editor, codeLensProvider) {
    editor.setOption("enableCodeLens", true);
    editor.codeLensProviders.push(codeLensProvider);
    editor.$updateLensesOnInput();
};

/**
 * Clears all code lenses from the session
 * @param {EditSession} session The session to clear code lenses from
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9leHQvY29kZV9sZW5zLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuLyoqXG4gKiBAdHlwZWRlZiB7aW1wb3J0KFwiLi4vZWRpdF9zZXNzaW9uXCIpLkVkaXRTZXNzaW9ufSBFZGl0U2Vzc2lvblxuICogQHR5cGVkZWYge2ltcG9ydChcIi4uL3ZpcnR1YWxfcmVuZGVyZXJcIikuVmlydHVhbFJlbmRlcmVyICYgeyR0ZXh0TGF5ZXI6IGltcG9ydChcIi4uL2xheWVyL3RleHRcIikuVGV4dCAmeyRsZW5zZXM6IEhUTUxFbGVtZW50W119fX0gVmlydHVhbFJlbmRlcmVyXG4gKiBAdHlwZWRlZiB7aW1wb3J0KFwiLi4vLi4vYWNlLWludGVybmFsXCIpLkFjZS5Db2RlTGVuc2VDb21tYW5kfSBDb2RlTGVuc2VDb21tYW5kXG4gKiBAdHlwZWRlZiB7aW1wb3J0KFwiLi4vLi4vYWNlLWludGVybmFsXCIpLkFjZS5Db2RlTGVuc2V9IENvZGVMZW5zZVxuICovXG5cbnZhciBldmVudCA9IHJlcXVpcmUoXCIuLi9saWIvZXZlbnRcIik7XG52YXIgbGFuZyA9IHJlcXVpcmUoXCIuLi9saWIvbGFuZ1wiKTtcbnZhciBkb20gPSByZXF1aXJlKFwiLi4vbGliL2RvbVwiKTtcblxuLyoqXG4gKiBDbGVhcnMgYWxsIGNvZGUgbGVucyBlbGVtZW50cyBmcm9tIHRoZSByZW5kZXJlclxuICogQHBhcmFtIHtWaXJ0dWFsUmVuZGVyZXJ9IHJlbmRlcmVyIFRoZSByZW5kZXJlciB0byBjbGVhciBsZW5zIGVsZW1lbnRzIGZyb21cbiAqL1xuZnVuY3Rpb24gY2xlYXJMZW5zRWxlbWVudHMocmVuZGVyZXIpIHtcbiAgICB2YXIgdGV4dExheWVyID0gcmVuZGVyZXIuJHRleHRMYXllcjtcbiAgICAvKiogQHR5cGUge0hUTUxFbGVtZW50W119ICovXG4gICAgdmFyIGxlbnNFbGVtZW50cyA9IHRleHRMYXllci4kbGVuc2VzO1xuICAgIGlmIChsZW5zRWxlbWVudHMpXG4gICAgICAgIGxlbnNFbGVtZW50cy5mb3JFYWNoKGZ1bmN0aW9uKGVsKSB7ZWwucmVtb3ZlKCk7IH0pO1xuICAgIHRleHRMYXllci4kbGVuc2VzID0gbnVsbDtcbn1cblxuLyoqXG4gKiBSZW5kZXJzIGNvZGUgbGVucyB3aWRnZXRzIGJhc2VkIG9uIGNoYW5nZXMgdG8gdGhlIGVkaXRvclxuICogQHBhcmFtIHtudW1iZXJ9IGNoYW5nZXMgQml0bWFzayBvZiBjaGFuZ2UgdHlwZXNcbiAqIEBwYXJhbSB7VmlydHVhbFJlbmRlcmVyfSByZW5kZXJlciBUaGUgcmVuZGVyZXIgdG8gdXBkYXRlXG4gKi9cbmZ1bmN0aW9uIHJlbmRlcldpZGdldHMoY2hhbmdlcywgcmVuZGVyZXIpIHtcbiAgICB2YXIgY2hhbmdlZCA9IGNoYW5nZXMgJiByZW5kZXJlci5DSEFOR0VfTElORVNcbiAgICAgICAgfHwgY2hhbmdlcyAmIHJlbmRlcmVyLkNIQU5HRV9GVUxMXG4gICAgICAgIHx8IGNoYW5nZXMgJiByZW5kZXJlci5DSEFOR0VfU0NST0xMXG4gICAgICAgIHx8IGNoYW5nZXMgJiByZW5kZXJlci5DSEFOR0VfVEVYVDtcbiAgICBpZiAoIWNoYW5nZWQpXG4gICAgICAgIHJldHVybjtcblxuICAgIHZhciBzZXNzaW9uID0gcmVuZGVyZXIuc2Vzc2lvbjtcbiAgICB2YXIgbGluZVdpZGdldHMgPSByZW5kZXJlci5zZXNzaW9uLmxpbmVXaWRnZXRzO1xuICAgIHZhciB0ZXh0TGF5ZXIgPSByZW5kZXJlci4kdGV4dExheWVyO1xuICAgIHZhciBsZW5zRWxlbWVudHMgPSB0ZXh0TGF5ZXIuJGxlbnNlcztcbiAgICBpZiAoIWxpbmVXaWRnZXRzKSB7XG4gICAgICAgIGlmIChsZW5zRWxlbWVudHMpXG4gICAgICAgICAgICBjbGVhckxlbnNFbGVtZW50cyhyZW5kZXJlcik7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgdGV4dENlbGxzID0gcmVuZGVyZXIuJHRleHRMYXllci4kbGluZXMuY2VsbHM7XG4gICAgdmFyIGNvbmZpZyA9IHJlbmRlcmVyLmxheWVyQ29uZmlnO1xuICAgIHZhciBwYWRkaW5nID0gcmVuZGVyZXIuJHBhZGRpbmc7XG5cbiAgICBpZiAoIWxlbnNFbGVtZW50cylcbiAgICAgICAgbGVuc0VsZW1lbnRzID0gdGV4dExheWVyLiRsZW5zZXMgPSBbXTtcblxuXG4gICAgdmFyIGluZGV4ID0gMDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRleHRDZWxscy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgcm93ID0gdGV4dENlbGxzW2ldLnJvdztcbiAgICAgICAgdmFyIHdpZGdldCA9IGxpbmVXaWRnZXRzW3Jvd107XG4gICAgICAgIHZhciBsZW5zZXMgPSB3aWRnZXQgJiYgd2lkZ2V0LmxlbnNlcztcblxuICAgICAgICBpZiAoIWxlbnNlcyB8fCAhbGVuc2VzLmxlbmd0aCkgY29udGludWU7XG5cbiAgICAgICAgdmFyIGxlbnNDb250YWluZXIgPSBsZW5zRWxlbWVudHNbaW5kZXhdO1xuICAgICAgICBpZiAoIWxlbnNDb250YWluZXIpIHtcbiAgICAgICAgICAgIGxlbnNDb250YWluZXIgPSBsZW5zRWxlbWVudHNbaW5kZXhdXG4gICAgICAgICAgICAgICAgPSBkb20uYnVpbGREb20oW1wiZGl2XCIsIHtjbGFzczogXCJhY2VfY29kZUxlbnNcIn1dLCByZW5kZXJlci5jb250YWluZXIpO1xuICAgICAgICB9XG4gICAgICAgIGxlbnNDb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gY29uZmlnLmxpbmVIZWlnaHQgKyBcInB4XCI7XG4gICAgICAgIGluZGV4Kys7XG5cbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBsZW5zZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIHZhciBlbCA9IGxlbnNDb250YWluZXIuY2hpbGROb2Rlc1syICogal07XG4gICAgICAgICAgICBpZiAoIWVsKSB7XG4gICAgICAgICAgICAgICAgaWYgKGogIT0gMCkgbGVuc0NvbnRhaW5lci5hcHBlbmRDaGlsZChkb20uY3JlYXRlVGV4dE5vZGUoXCJcXHhhMHxcXHhhMFwiKSk7XG4gICAgICAgICAgICAgICAgZWwgPSBkb20uYnVpbGREb20oW1wiYVwiXSwgbGVuc0NvbnRhaW5lcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbC50ZXh0Q29udGVudCA9IGxlbnNlc1tqXS50aXRsZTtcbiAgICAgICAgICAgIC8qKiBAdHlwZSB7SFRNTEVsZW1lbnQgJiB7IGxlbnNDb21tYW5kIDogQ29kZUxlbnNlQ29tbWFuZH19ICovXG4gICAgICAgICAgICAoZWwpLmxlbnNDb21tYW5kID0gbGVuc2VzW2pdO1xuICAgICAgICB9XG4gICAgICAgIHdoaWxlIChsZW5zQ29udGFpbmVyLmNoaWxkTm9kZXMubGVuZ3RoID4gMiAqIGogLSAxKVxuICAgICAgICAgICAgbGVuc0NvbnRhaW5lci5sYXN0Q2hpbGQucmVtb3ZlKCk7XG5cbiAgICAgICAgdmFyIHRvcCA9IHJlbmRlcmVyLiRjdXJzb3JMYXllci5nZXRQaXhlbFBvc2l0aW9uKHtcbiAgICAgICAgICAgIHJvdzogcm93LFxuICAgICAgICAgICAgY29sdW1uOiAwXG4gICAgICAgIH0sIHRydWUpLnRvcCAtIGNvbmZpZy5saW5lSGVpZ2h0ICogd2lkZ2V0LnJvd3NBYm92ZSAtIGNvbmZpZy5vZmZzZXQ7XG4gICAgICAgIGxlbnNDb250YWluZXIuc3R5bGUudG9wID0gdG9wICsgXCJweFwiO1xuXG4gICAgICAgIHZhciBsZWZ0ID0gcmVuZGVyZXIuZ3V0dGVyV2lkdGg7XG4gICAgICAgIHZhciBpbmRlbnQgPSBzZXNzaW9uLmdldExpbmUocm93KS5zZWFyY2goL1xcU3wkLyk7XG4gICAgICAgIGlmIChpbmRlbnQgPT0gLTEpXG4gICAgICAgICAgICBpbmRlbnQgPSAwO1xuICAgICAgICBsZWZ0ICs9IGluZGVudCAqIGNvbmZpZy5jaGFyYWN0ZXJXaWR0aDtcbiAgICAgICAgbGVuc0NvbnRhaW5lci5zdHlsZS5wYWRkaW5nTGVmdCA9IHBhZGRpbmcgKyBsZWZ0ICsgXCJweFwiO1xuICAgIH1cbiAgICB3aGlsZSAoaW5kZXggPCBsZW5zRWxlbWVudHMubGVuZ3RoKVxuICAgICAgICBsZW5zRWxlbWVudHMucG9wKCkucmVtb3ZlKCk7XG59XG5cbi8qKlxuICogQ2xlYXJzIGFsbCBjb2RlIGxlbnMgd2lkZ2V0cyBmcm9tIHRoZSBzZXNzaW9uXG4gKiBAcGFyYW0ge0VkaXRTZXNzaW9ufSBzZXNzaW9uIFRoZSBzZXNzaW9uIHRvIGNsZWFyIGNvZGUgbGVucyB3aWRnZXRzIGZyb21cbiAqL1xuZnVuY3Rpb24gY2xlYXJDb2RlTGVuc1dpZGdldHMoc2Vzc2lvbikge1xuICAgIGlmICghc2Vzc2lvbi5saW5lV2lkZ2V0cykgcmV0dXJuO1xuICAgIHZhciB3aWRnZXRNYW5hZ2VyID0gc2Vzc2lvbi53aWRnZXRNYW5hZ2VyO1xuICAgIHNlc3Npb24ubGluZVdpZGdldHMuZm9yRWFjaChmdW5jdGlvbih3aWRnZXQpIHtcbiAgICAgICAgaWYgKHdpZGdldCAmJiB3aWRnZXQubGVuc2VzKVxuICAgICAgICAgICAgd2lkZ2V0TWFuYWdlci5yZW1vdmVMaW5lV2lkZ2V0KHdpZGdldCk7XG4gICAgfSk7XG59XG5cbi8qKlxuICogU2V0cyBjb2RlIGxlbnNlcyBmb3IgdGhlIGdpdmVuIHNlc3Npb25cbiAqIEBwYXJhbSB7RWRpdFNlc3Npb259IHNlc3Npb24gVGhlIHNlc3Npb24gdG8gc2V0IGNvZGUgbGVuc2VzIGZvclxuICogQHBhcmFtIHtpbXBvcnQoXCIuLi8uLi9hY2UtaW50ZXJuYWxcIikuQWNlLkNvZGVMZW5zZVtdfSBsZW5zZXMgQXJyYXkgb2YgY29kZSBsZW5zZXMgdG8gc2V0XG4gKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSByb3cgb2YgdGhlIGZpcnN0IGNvZGUgbGVucyBvciBOdW1iZXIuTUFYX1ZBTFVFIGlmIG5vIGxlbnNlc1xuICovXG5leHBvcnRzLnNldExlbnNlcyA9IGZ1bmN0aW9uKHNlc3Npb24sIGxlbnNlcykge1xuICAgIHZhciBmaXJzdFJvdyA9IE51bWJlci5NQVhfVkFMVUU7XG5cbiAgICBjbGVhckNvZGVMZW5zV2lkZ2V0cyhzZXNzaW9uKTtcbiAgICBsZW5zZXMgJiYgbGVuc2VzLmZvckVhY2goZnVuY3Rpb24obGVucykge1xuICAgICAgICB2YXIgcm93ID0gbGVucy5zdGFydC5yb3c7XG4gICAgICAgIHZhciBjb2x1bW4gPSBsZW5zLnN0YXJ0LmNvbHVtbjtcbiAgICAgICAgdmFyIHdpZGdldCA9IHNlc3Npb24ubGluZVdpZGdldHMgJiYgc2Vzc2lvbi5saW5lV2lkZ2V0c1tyb3ddO1xuICAgICAgICBpZiAoIXdpZGdldCB8fCAhd2lkZ2V0LmxlbnNlcykge1xuICAgICAgICAgICAgd2lkZ2V0ID0gc2Vzc2lvbi53aWRnZXRNYW5hZ2VyLiRyZWdpc3RlckxpbmVXaWRnZXQoe1xuICAgICAgICAgICAgICAgIHJvd0NvdW50OiAxLFxuICAgICAgICAgICAgICAgIHJvd3NBYm92ZTogMSxcbiAgICAgICAgICAgICAgICByb3c6IHJvdyxcbiAgICAgICAgICAgICAgICBjb2x1bW46IGNvbHVtbixcbiAgICAgICAgICAgICAgICBsZW5zZXM6IFtdXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB3aWRnZXQubGVuc2VzLnB1c2gobGVucy5jb21tYW5kKTtcbiAgICAgICAgaWYgKHJvdyA8IGZpcnN0Um93KVxuICAgICAgICAgICAgZmlyc3RSb3cgPSByb3c7XG4gICAgfSk7XG4gICAgc2Vzc2lvbi5fZW1pdChcImNoYW5nZUZvbGRcIiwge2RhdGE6IHtzdGFydDoge3JvdzogZmlyc3RSb3d9fX0pO1xuICAgIHJldHVybiBmaXJzdFJvdztcbn07XG5cbi8qKlxuICogQXR0YWNoZXMgY29kZSBsZW5zIGZ1bmN0aW9uYWxpdHkgdG8gYW4gZWRpdG9yXG4gKiBAcGFyYW0ge2ltcG9ydChcIi4uL2VkaXRvclwiKS5FZGl0b3J9IGVkaXRvciBUaGUgZWRpdG9yIHRvIGF0dGFjaCB0b1xuICovXG5mdW5jdGlvbiBhdHRhY2hUb0VkaXRvcihlZGl0b3IpIHtcbiAgICBlZGl0b3IuY29kZUxlbnNQcm92aWRlcnMgPSBbXTtcbiAgICBlZGl0b3IucmVuZGVyZXIub24oXCJhZnRlclJlbmRlclwiLCByZW5kZXJXaWRnZXRzKTtcbiAgICBpZiAoIWVkaXRvci4kY29kZUxlbnNDbGlja0hhbmRsZXIpIHtcbiAgICAgICAgZWRpdG9yLiRjb2RlTGVuc0NsaWNrSGFuZGxlciA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIC8qKiBAdHlwZSB7Q29kZUxlbnNlQ29tbWFuZH0gKi9cbiAgICAgICAgICAgIHZhciBjb21tYW5kID0gZS50YXJnZXQubGVuc0NvbW1hbmQ7XG4gICAgICAgICAgICBpZiAoIWNvbW1hbmQpIHJldHVybjtcbiAgICAgICAgICAgIGVkaXRvci5leGVjQ29tbWFuZChjb21tYW5kLmlkLCBjb21tYW5kLmFyZ3VtZW50cyk7XG4gICAgICAgICAgICBlZGl0b3IuX2VtaXQoXCJjb2RlTGVuc0NsaWNrXCIsIGUpO1xuICAgICAgICB9O1xuICAgICAgICBldmVudC5hZGRMaXN0ZW5lcihlZGl0b3IuY29udGFpbmVyLCBcImNsaWNrXCIsIGVkaXRvci4kY29kZUxlbnNDbGlja0hhbmRsZXIsIGVkaXRvcik7XG4gICAgfVxuICAgIGVkaXRvci4kdXBkYXRlTGVuc2VzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzZXNzaW9uID0gZWRpdG9yLnNlc3Npb247XG4gICAgICAgIGlmICghc2Vzc2lvbikgcmV0dXJuO1xuXG4gICAgICAgIHZhciBwcm92aWRlcnNUb1dhaXROdW0gPSBlZGl0b3IuY29kZUxlbnNQcm92aWRlcnMubGVuZ3RoO1xuICAgICAgICB2YXIgbGVuc2VzID0gW107XG4gICAgICAgIGVkaXRvci5jb2RlTGVuc1Byb3ZpZGVycy5mb3JFYWNoKGZ1bmN0aW9uKHByb3ZpZGVyKSB7XG4gICAgICAgICAgICBwcm92aWRlci5wcm92aWRlQ29kZUxlbnNlcyhzZXNzaW9uLCBmdW5jdGlvbihlcnIsIHBheWxvYWQpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSByZXR1cm47XG4gICAgICAgICAgICAgICAgcGF5bG9hZC5mb3JFYWNoKGZ1bmN0aW9uKGxlbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgbGVuc2VzLnB1c2gobGVucyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcHJvdmlkZXJzVG9XYWl0TnVtLS07XG4gICAgICAgICAgICAgICAgaWYgKHByb3ZpZGVyc1RvV2FpdE51bSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGFwcGx5TGVuc2VzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZ1bmN0aW9uIGFwcGx5TGVuc2VzKCkge1xuICAgICAgICAgICAgdmFyIGN1cnNvciA9IHNlc3Npb24uc2VsZWN0aW9uLmN1cnNvcjtcbiAgICAgICAgICAgIHZhciBvbGRSb3cgPSBzZXNzaW9uLmRvY3VtZW50VG9TY3JlZW5Sb3coY3Vyc29yKTtcbiAgICAgICAgICAgIHZhciBzY3JvbGxUb3AgPSBzZXNzaW9uLmdldFNjcm9sbFRvcCgpO1xuICAgICAgICAgICAgdmFyIGZpcnN0Um93ID0gZXhwb3J0cy5zZXRMZW5zZXMoc2Vzc2lvbiwgbGVuc2VzKTtcblxuICAgICAgICAgICAgdmFyIGxhc3REZWx0YSA9IHNlc3Npb24uJHVuZG9NYW5hZ2VyICYmIHNlc3Npb24uJHVuZG9NYW5hZ2VyLiRsYXN0RGVsdGE7XG4gICAgICAgICAgICBpZiAobGFzdERlbHRhICYmIGxhc3REZWx0YS5hY3Rpb24gPT0gXCJyZW1vdmVcIiAmJiBsYXN0RGVsdGEubGluZXMubGVuZ3RoID4gMSlcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB2YXIgcm93ID0gc2Vzc2lvbi5kb2N1bWVudFRvU2NyZWVuUm93KGN1cnNvcik7XG4gICAgICAgICAgICB2YXIgbGluZUhlaWdodCA9IGVkaXRvci5yZW5kZXJlci5sYXllckNvbmZpZy5saW5lSGVpZ2h0O1xuICAgICAgICAgICAgdmFyIHRvcCA9IHNlc3Npb24uZ2V0U2Nyb2xsVG9wKCkgKyAocm93IC0gb2xkUm93KSAqIGxpbmVIZWlnaHQ7XG4gICAgICAgICAgICAvLyBzcGVjaWFsIGNhc2UgZm9yIHRoZSBsZW5zIG9uIGxpbmUgMCwgYmVjYXVzZSBpdCBjYW4ndCBiZSBzY3JvbGxlZCBpbnRvIHZpZXcgd2l0aCBrZXlib2FyZFxuICAgICAgICAgICAgaWYgKGZpcnN0Um93ID09IDAgJiYgc2Nyb2xsVG9wIDwgbGluZUhlaWdodCAvNCAmJiBzY3JvbGxUb3AgPiAtbGluZUhlaWdodC80KSB7XG4gICAgICAgICAgICAgICAgdG9wID0gLWxpbmVIZWlnaHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZXNzaW9uLnNldFNjcm9sbFRvcCh0b3ApO1xuICAgICAgICB9XG4gICAgfTtcbiAgICB2YXIgdXBkYXRlTGVuc2VzID0gbGFuZy5kZWxheWVkQ2FsbChlZGl0b3IuJHVwZGF0ZUxlbnNlcyk7XG4gICAgZWRpdG9yLiR1cGRhdGVMZW5zZXNPbklucHV0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHVwZGF0ZUxlbnNlcy5kZWxheSgyNTApO1xuICAgIH07XG4gICAgZWRpdG9yLm9uKFwiaW5wdXRcIiwgZWRpdG9yLiR1cGRhdGVMZW5zZXNPbklucHV0KTtcbn1cblxuLyoqXG4gKiBEZXRhY2hlcyBjb2RlIGxlbnMgZnVuY3Rpb25hbGl0eSBmcm9tIGFuIGVkaXRvclxuICogQHBhcmFtIHtpbXBvcnQoXCIuLi9lZGl0b3JcIikuRWRpdG9yfSBlZGl0b3IgVGhlIGVkaXRvciB0byBkZXRhY2ggZnJvbVxuICovXG5mdW5jdGlvbiBkZXRhY2hGcm9tRWRpdG9yKGVkaXRvcikge1xuICAgIGVkaXRvci5vZmYoXCJpbnB1dFwiLCBlZGl0b3IuJHVwZGF0ZUxlbnNlc09uSW5wdXQpO1xuICAgIGVkaXRvci5yZW5kZXJlci5vZmYoXCJhZnRlclJlbmRlclwiLCByZW5kZXJXaWRnZXRzKTtcbiAgICBpZiAoZWRpdG9yLiRjb2RlTGVuc0NsaWNrSGFuZGxlcilcbiAgICAgICAgZWRpdG9yLmNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZWRpdG9yLiRjb2RlTGVuc0NsaWNrSGFuZGxlcik7XG59XG5cbi8qKlxuICogUmVnaXN0ZXJzIGEgY29kZSBsZW5zIHByb3ZpZGVyIHdpdGggYW4gZWRpdG9yXG4gKiBAcGFyYW0ge2ltcG9ydChcIi4uL2VkaXRvclwiKS5FZGl0b3J9IGVkaXRvciBUaGUgZWRpdG9yIHRvIHJlZ2lzdGVyIHRoZSBwcm92aWRlciB3aXRoXG4gKiBAcGFyYW0ge2ltcG9ydChcIi4uLy4uL2FjZS1pbnRlcm5hbFwiKS5BY2UuQ29kZUxlbnNlUHJvdmlkZXJ9IGNvZGVMZW5zUHJvdmlkZXIgVGhlIHByb3ZpZGVyIHRvIHJlZ2lzdGVyXG4gKi9cbmV4cG9ydHMucmVnaXN0ZXJDb2RlTGVuc1Byb3ZpZGVyID0gZnVuY3Rpb24oZWRpdG9yLCBjb2RlTGVuc1Byb3ZpZGVyKSB7XG4gICAgZWRpdG9yLnNldE9wdGlvbihcImVuYWJsZUNvZGVMZW5zXCIsIHRydWUpO1xuICAgIGVkaXRvci5jb2RlTGVuc1Byb3ZpZGVycy5wdXNoKGNvZGVMZW5zUHJvdmlkZXIpO1xuICAgIGVkaXRvci4kdXBkYXRlTGVuc2VzT25JbnB1dCgpO1xufTtcblxuLyoqXG4gKiBDbGVhcnMgYWxsIGNvZGUgbGVuc2VzIGZyb20gdGhlIHNlc3Npb25cbiAqIEBwYXJhbSB7RWRpdFNlc3Npb259IHNlc3Npb24gVGhlIHNlc3Npb24gdG8gY2xlYXIgY29kZSBsZW5zZXMgZnJvbVxuICovXG5leHBvcnRzLmNsZWFyID0gZnVuY3Rpb24oc2Vzc2lvbikge1xuICAgIGV4cG9ydHMuc2V0TGVuc2VzKHNlc3Npb24sIG51bGwpO1xufTtcblxudmFyIEVkaXRvciA9IHJlcXVpcmUoXCIuLi9lZGl0b3JcIikuRWRpdG9yO1xucmVxdWlyZShcIi4uL2NvbmZpZ1wiKS5kZWZpbmVPcHRpb25zKEVkaXRvci5wcm90b3R5cGUsIFwiZWRpdG9yXCIsIHtcbiAgICBlbmFibGVDb2RlTGVuczoge1xuICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgICAgIGF0dGFjaFRvRWRpdG9yKHRoaXMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkZXRhY2hGcm9tRWRpdG9yKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSk7XG5cbmRvbS5pbXBvcnRDc3NTdHJpbmcoYFxuLmFjZV9jb2RlTGVucyB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGNvbG9yOiAjYWFhO1xuICAgIGZvbnQtc2l6ZTogODglO1xuICAgIGJhY2tncm91bmQ6IGluaGVyaXQ7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogZmxleC1lbmQ7XG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG59XG4uYWNlX2NvZGVMZW5zID4gYSB7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIHBvaW50ZXItZXZlbnRzOiBhdXRvO1xufVxuLmFjZV9jb2RlTGVucyA+IGE6aG92ZXIge1xuICAgIGNvbG9yOiAjMDAwMGZmO1xuICAgIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xufVxuLmFjZV9kYXJrID4gLmFjZV9jb2RlTGVucyA+IGE6aG92ZXIge1xuICAgIGNvbG9yOiAjNGU5NGNlO1xufVxuYCwgXCJjb2RlbGVuc2UuY3NzXCIsIGZhbHNlKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==