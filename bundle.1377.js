"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[1377],{

/***/ 91377:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/**
 * ## Code Lens extension.
 *
 * Displaying contextual information and clickable commands above code lines. Supports registering custom providers,
 * rendering lens widgets with proper positioning and styling, and handling user interactions with lens commands.
 * @module
 */


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9leHQvY29kZV9sZW5zLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogIyMgQ29kZSBMZW5zIGV4dGVuc2lvbi5cbiAqXG4gKiBEaXNwbGF5aW5nIGNvbnRleHR1YWwgaW5mb3JtYXRpb24gYW5kIGNsaWNrYWJsZSBjb21tYW5kcyBhYm92ZSBjb2RlIGxpbmVzLiBTdXBwb3J0cyByZWdpc3RlcmluZyBjdXN0b20gcHJvdmlkZXJzLFxuICogcmVuZGVyaW5nIGxlbnMgd2lkZ2V0cyB3aXRoIHByb3BlciBwb3NpdGlvbmluZyBhbmQgc3R5bGluZywgYW5kIGhhbmRsaW5nIHVzZXIgaW50ZXJhY3Rpb25zIHdpdGggbGVucyBjb21tYW5kcy5cbiAqIEBtb2R1bGVcbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcbi8qKlxuICogQHR5cGVkZWYge2ltcG9ydChcIi4uL2VkaXRfc2Vzc2lvblwiKS5FZGl0U2Vzc2lvbn0gRWRpdFNlc3Npb25cbiAqIEB0eXBlZGVmIHtpbXBvcnQoXCIuLi92aXJ0dWFsX3JlbmRlcmVyXCIpLlZpcnR1YWxSZW5kZXJlciAmIHskdGV4dExheWVyOiBpbXBvcnQoXCIuLi9sYXllci90ZXh0XCIpLlRleHQgJnskbGVuc2VzOiBIVE1MRWxlbWVudFtdfX19IFZpcnR1YWxSZW5kZXJlclxuICogQHR5cGVkZWYge2ltcG9ydChcIi4uLy4uL2FjZS1pbnRlcm5hbFwiKS5BY2UuQ29kZUxlbnNlQ29tbWFuZH0gQ29kZUxlbnNlQ29tbWFuZFxuICogQHR5cGVkZWYge2ltcG9ydChcIi4uLy4uL2FjZS1pbnRlcm5hbFwiKS5BY2UuQ29kZUxlbnNlfSBDb2RlTGVuc2VcbiAqL1xuXG52YXIgZXZlbnQgPSByZXF1aXJlKFwiLi4vbGliL2V2ZW50XCIpO1xudmFyIGxhbmcgPSByZXF1aXJlKFwiLi4vbGliL2xhbmdcIik7XG52YXIgZG9tID0gcmVxdWlyZShcIi4uL2xpYi9kb21cIik7XG5cbi8qKlxuICogQ2xlYXJzIGFsbCBjb2RlIGxlbnMgZWxlbWVudHMgZnJvbSB0aGUgcmVuZGVyZXJcbiAqIEBwYXJhbSB7VmlydHVhbFJlbmRlcmVyfSByZW5kZXJlciBUaGUgcmVuZGVyZXIgdG8gY2xlYXIgbGVucyBlbGVtZW50cyBmcm9tXG4gKi9cbmZ1bmN0aW9uIGNsZWFyTGVuc0VsZW1lbnRzKHJlbmRlcmVyKSB7XG4gICAgdmFyIHRleHRMYXllciA9IHJlbmRlcmVyLiR0ZXh0TGF5ZXI7XG4gICAgLyoqIEB0eXBlIHtIVE1MRWxlbWVudFtdfSAqL1xuICAgIHZhciBsZW5zRWxlbWVudHMgPSB0ZXh0TGF5ZXIuJGxlbnNlcztcbiAgICBpZiAobGVuc0VsZW1lbnRzKVxuICAgICAgICBsZW5zRWxlbWVudHMuZm9yRWFjaChmdW5jdGlvbihlbCkge2VsLnJlbW92ZSgpOyB9KTtcbiAgICB0ZXh0TGF5ZXIuJGxlbnNlcyA9IG51bGw7XG59XG5cbi8qKlxuICogUmVuZGVycyBjb2RlIGxlbnMgd2lkZ2V0cyBiYXNlZCBvbiBjaGFuZ2VzIHRvIHRoZSBlZGl0b3JcbiAqIEBwYXJhbSB7bnVtYmVyfSBjaGFuZ2VzIEJpdG1hc2sgb2YgY2hhbmdlIHR5cGVzXG4gKiBAcGFyYW0ge1ZpcnR1YWxSZW5kZXJlcn0gcmVuZGVyZXIgVGhlIHJlbmRlcmVyIHRvIHVwZGF0ZVxuICovXG5mdW5jdGlvbiByZW5kZXJXaWRnZXRzKGNoYW5nZXMsIHJlbmRlcmVyKSB7XG4gICAgdmFyIGNoYW5nZWQgPSBjaGFuZ2VzICYgcmVuZGVyZXIuQ0hBTkdFX0xJTkVTXG4gICAgICAgIHx8IGNoYW5nZXMgJiByZW5kZXJlci5DSEFOR0VfRlVMTFxuICAgICAgICB8fCBjaGFuZ2VzICYgcmVuZGVyZXIuQ0hBTkdFX1NDUk9MTFxuICAgICAgICB8fCBjaGFuZ2VzICYgcmVuZGVyZXIuQ0hBTkdFX1RFWFQ7XG4gICAgaWYgKCFjaGFuZ2VkKVxuICAgICAgICByZXR1cm47XG5cbiAgICB2YXIgc2Vzc2lvbiA9IHJlbmRlcmVyLnNlc3Npb247XG4gICAgdmFyIGxpbmVXaWRnZXRzID0gcmVuZGVyZXIuc2Vzc2lvbi5saW5lV2lkZ2V0cztcbiAgICB2YXIgdGV4dExheWVyID0gcmVuZGVyZXIuJHRleHRMYXllcjtcbiAgICB2YXIgbGVuc0VsZW1lbnRzID0gdGV4dExheWVyLiRsZW5zZXM7XG4gICAgaWYgKCFsaW5lV2lkZ2V0cykge1xuICAgICAgICBpZiAobGVuc0VsZW1lbnRzKVxuICAgICAgICAgICAgY2xlYXJMZW5zRWxlbWVudHMocmVuZGVyZXIpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHRleHRDZWxscyA9IHJlbmRlcmVyLiR0ZXh0TGF5ZXIuJGxpbmVzLmNlbGxzO1xuICAgIHZhciBjb25maWcgPSByZW5kZXJlci5sYXllckNvbmZpZztcbiAgICB2YXIgcGFkZGluZyA9IHJlbmRlcmVyLiRwYWRkaW5nO1xuXG4gICAgaWYgKCFsZW5zRWxlbWVudHMpXG4gICAgICAgIGxlbnNFbGVtZW50cyA9IHRleHRMYXllci4kbGVuc2VzID0gW107XG5cblxuICAgIHZhciBpbmRleCA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0ZXh0Q2VsbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHJvdyA9IHRleHRDZWxsc1tpXS5yb3c7XG4gICAgICAgIHZhciB3aWRnZXQgPSBsaW5lV2lkZ2V0c1tyb3ddO1xuICAgICAgICB2YXIgbGVuc2VzID0gd2lkZ2V0ICYmIHdpZGdldC5sZW5zZXM7XG5cbiAgICAgICAgaWYgKCFsZW5zZXMgfHwgIWxlbnNlcy5sZW5ndGgpIGNvbnRpbnVlO1xuXG4gICAgICAgIHZhciBsZW5zQ29udGFpbmVyID0gbGVuc0VsZW1lbnRzW2luZGV4XTtcbiAgICAgICAgaWYgKCFsZW5zQ29udGFpbmVyKSB7XG4gICAgICAgICAgICBsZW5zQ29udGFpbmVyID0gbGVuc0VsZW1lbnRzW2luZGV4XVxuICAgICAgICAgICAgICAgID0gZG9tLmJ1aWxkRG9tKFtcImRpdlwiLCB7Y2xhc3M6IFwiYWNlX2NvZGVMZW5zXCJ9XSwgcmVuZGVyZXIuY29udGFpbmVyKTtcbiAgICAgICAgfVxuICAgICAgICBsZW5zQ29udGFpbmVyLnN0eWxlLmhlaWdodCA9IGNvbmZpZy5saW5lSGVpZ2h0ICsgXCJweFwiO1xuICAgICAgICBpbmRleCsrO1xuXG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgbGVuc2VzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICB2YXIgZWwgPSBsZW5zQ29udGFpbmVyLmNoaWxkTm9kZXNbMiAqIGpdO1xuICAgICAgICAgICAgaWYgKCFlbCkge1xuICAgICAgICAgICAgICAgIGlmIChqICE9IDApIGxlbnNDb250YWluZXIuYXBwZW5kQ2hpbGQoZG9tLmNyZWF0ZVRleHROb2RlKFwiXFx4YTB8XFx4YTBcIikpO1xuICAgICAgICAgICAgICAgIGVsID0gZG9tLmJ1aWxkRG9tKFtcImFcIl0sIGxlbnNDb250YWluZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWwudGV4dENvbnRlbnQgPSBsZW5zZXNbal0udGl0bGU7XG4gICAgICAgICAgICAvKiogQHR5cGUge0hUTUxFbGVtZW50ICYgeyBsZW5zQ29tbWFuZCA6IENvZGVMZW5zZUNvbW1hbmR9fSAqL1xuICAgICAgICAgICAgKGVsKS5sZW5zQ29tbWFuZCA9IGxlbnNlc1tqXTtcbiAgICAgICAgfVxuICAgICAgICB3aGlsZSAobGVuc0NvbnRhaW5lci5jaGlsZE5vZGVzLmxlbmd0aCA+IDIgKiBqIC0gMSlcbiAgICAgICAgICAgIGxlbnNDb250YWluZXIubGFzdENoaWxkLnJlbW92ZSgpO1xuXG4gICAgICAgIHZhciB0b3AgPSByZW5kZXJlci4kY3Vyc29yTGF5ZXIuZ2V0UGl4ZWxQb3NpdGlvbih7XG4gICAgICAgICAgICByb3c6IHJvdyxcbiAgICAgICAgICAgIGNvbHVtbjogMFxuICAgICAgICB9LCB0cnVlKS50b3AgLSBjb25maWcubGluZUhlaWdodCAqIHdpZGdldC5yb3dzQWJvdmUgLSBjb25maWcub2Zmc2V0O1xuICAgICAgICBsZW5zQ29udGFpbmVyLnN0eWxlLnRvcCA9IHRvcCArIFwicHhcIjtcblxuICAgICAgICB2YXIgbGVmdCA9IHJlbmRlcmVyLmd1dHRlcldpZHRoO1xuICAgICAgICB2YXIgaW5kZW50ID0gc2Vzc2lvbi5nZXRMaW5lKHJvdykuc2VhcmNoKC9cXFN8JC8pO1xuICAgICAgICBpZiAoaW5kZW50ID09IC0xKVxuICAgICAgICAgICAgaW5kZW50ID0gMDtcbiAgICAgICAgbGVmdCArPSBpbmRlbnQgKiBjb25maWcuY2hhcmFjdGVyV2lkdGg7XG4gICAgICAgIGxlbnNDb250YWluZXIuc3R5bGUucGFkZGluZ0xlZnQgPSBwYWRkaW5nICsgbGVmdCArIFwicHhcIjtcbiAgICB9XG4gICAgd2hpbGUgKGluZGV4IDwgbGVuc0VsZW1lbnRzLmxlbmd0aClcbiAgICAgICAgbGVuc0VsZW1lbnRzLnBvcCgpLnJlbW92ZSgpO1xufVxuXG4vKipcbiAqIENsZWFycyBhbGwgY29kZSBsZW5zIHdpZGdldHMgZnJvbSB0aGUgc2Vzc2lvblxuICogQHBhcmFtIHtFZGl0U2Vzc2lvbn0gc2Vzc2lvbiBUaGUgc2Vzc2lvbiB0byBjbGVhciBjb2RlIGxlbnMgd2lkZ2V0cyBmcm9tXG4gKi9cbmZ1bmN0aW9uIGNsZWFyQ29kZUxlbnNXaWRnZXRzKHNlc3Npb24pIHtcbiAgICBpZiAoIXNlc3Npb24ubGluZVdpZGdldHMpIHJldHVybjtcbiAgICB2YXIgd2lkZ2V0TWFuYWdlciA9IHNlc3Npb24ud2lkZ2V0TWFuYWdlcjtcbiAgICBzZXNzaW9uLmxpbmVXaWRnZXRzLmZvckVhY2goZnVuY3Rpb24od2lkZ2V0KSB7XG4gICAgICAgIGlmICh3aWRnZXQgJiYgd2lkZ2V0LmxlbnNlcylcbiAgICAgICAgICAgIHdpZGdldE1hbmFnZXIucmVtb3ZlTGluZVdpZGdldCh3aWRnZXQpO1xuICAgIH0pO1xufVxuXG4vKipcbiAqIFNldHMgY29kZSBsZW5zZXMgZm9yIHRoZSBnaXZlbiBzZXNzaW9uXG4gKiBAcGFyYW0ge0VkaXRTZXNzaW9ufSBzZXNzaW9uIFRoZSBzZXNzaW9uIHRvIHNldCBjb2RlIGxlbnNlcyBmb3JcbiAqIEBwYXJhbSB7aW1wb3J0KFwiLi4vLi4vYWNlLWludGVybmFsXCIpLkFjZS5Db2RlTGVuc2VbXX0gbGVuc2VzIEFycmF5IG9mIGNvZGUgbGVuc2VzIHRvIHNldFxuICogQHJldHVybiB7bnVtYmVyfSBUaGUgcm93IG9mIHRoZSBmaXJzdCBjb2RlIGxlbnMgb3IgTnVtYmVyLk1BWF9WQUxVRSBpZiBubyBsZW5zZXNcbiAqL1xuZXhwb3J0cy5zZXRMZW5zZXMgPSBmdW5jdGlvbihzZXNzaW9uLCBsZW5zZXMpIHtcbiAgICB2YXIgZmlyc3RSb3cgPSBOdW1iZXIuTUFYX1ZBTFVFO1xuXG4gICAgY2xlYXJDb2RlTGVuc1dpZGdldHMoc2Vzc2lvbik7XG4gICAgbGVuc2VzICYmIGxlbnNlcy5mb3JFYWNoKGZ1bmN0aW9uKGxlbnMpIHtcbiAgICAgICAgdmFyIHJvdyA9IGxlbnMuc3RhcnQucm93O1xuICAgICAgICB2YXIgY29sdW1uID0gbGVucy5zdGFydC5jb2x1bW47XG4gICAgICAgIHZhciB3aWRnZXQgPSBzZXNzaW9uLmxpbmVXaWRnZXRzICYmIHNlc3Npb24ubGluZVdpZGdldHNbcm93XTtcbiAgICAgICAgaWYgKCF3aWRnZXQgfHwgIXdpZGdldC5sZW5zZXMpIHtcbiAgICAgICAgICAgIHdpZGdldCA9IHNlc3Npb24ud2lkZ2V0TWFuYWdlci4kcmVnaXN0ZXJMaW5lV2lkZ2V0KHtcbiAgICAgICAgICAgICAgICByb3dDb3VudDogMSxcbiAgICAgICAgICAgICAgICByb3dzQWJvdmU6IDEsXG4gICAgICAgICAgICAgICAgcm93OiByb3csXG4gICAgICAgICAgICAgICAgY29sdW1uOiBjb2x1bW4sXG4gICAgICAgICAgICAgICAgbGVuc2VzOiBbXVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgd2lkZ2V0LmxlbnNlcy5wdXNoKGxlbnMuY29tbWFuZCk7XG4gICAgICAgIGlmIChyb3cgPCBmaXJzdFJvdylcbiAgICAgICAgICAgIGZpcnN0Um93ID0gcm93O1xuICAgIH0pO1xuICAgIHNlc3Npb24uX2VtaXQoXCJjaGFuZ2VGb2xkXCIsIHtkYXRhOiB7c3RhcnQ6IHtyb3c6IGZpcnN0Um93fX19KTtcbiAgICByZXR1cm4gZmlyc3RSb3c7XG59O1xuXG4vKipcbiAqIEF0dGFjaGVzIGNvZGUgbGVucyBmdW5jdGlvbmFsaXR5IHRvIGFuIGVkaXRvclxuICogQHBhcmFtIHtpbXBvcnQoXCIuLi9lZGl0b3JcIikuRWRpdG9yfSBlZGl0b3IgVGhlIGVkaXRvciB0byBhdHRhY2ggdG9cbiAqL1xuZnVuY3Rpb24gYXR0YWNoVG9FZGl0b3IoZWRpdG9yKSB7XG4gICAgZWRpdG9yLmNvZGVMZW5zUHJvdmlkZXJzID0gW107XG4gICAgZWRpdG9yLnJlbmRlcmVyLm9uKFwiYWZ0ZXJSZW5kZXJcIiwgcmVuZGVyV2lkZ2V0cyk7XG4gICAgaWYgKCFlZGl0b3IuJGNvZGVMZW5zQ2xpY2tIYW5kbGVyKSB7XG4gICAgICAgIGVkaXRvci4kY29kZUxlbnNDbGlja0hhbmRsZXIgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAvKiogQHR5cGUge0NvZGVMZW5zZUNvbW1hbmR9ICovXG4gICAgICAgICAgICB2YXIgY29tbWFuZCA9IGUudGFyZ2V0LmxlbnNDb21tYW5kO1xuICAgICAgICAgICAgaWYgKCFjb21tYW5kKSByZXR1cm47XG4gICAgICAgICAgICBlZGl0b3IuZXhlY0NvbW1hbmQoY29tbWFuZC5pZCwgY29tbWFuZC5hcmd1bWVudHMpO1xuICAgICAgICAgICAgZWRpdG9yLl9lbWl0KFwiY29kZUxlbnNDbGlja1wiLCBlKTtcbiAgICAgICAgfTtcbiAgICAgICAgZXZlbnQuYWRkTGlzdGVuZXIoZWRpdG9yLmNvbnRhaW5lciwgXCJjbGlja1wiLCBlZGl0b3IuJGNvZGVMZW5zQ2xpY2tIYW5kbGVyLCBlZGl0b3IpO1xuICAgIH1cbiAgICBlZGl0b3IuJHVwZGF0ZUxlbnNlcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc2Vzc2lvbiA9IGVkaXRvci5zZXNzaW9uO1xuICAgICAgICBpZiAoIXNlc3Npb24pIHJldHVybjtcblxuICAgICAgICB2YXIgcHJvdmlkZXJzVG9XYWl0TnVtID0gZWRpdG9yLmNvZGVMZW5zUHJvdmlkZXJzLmxlbmd0aDtcbiAgICAgICAgdmFyIGxlbnNlcyA9IFtdO1xuICAgICAgICBlZGl0b3IuY29kZUxlbnNQcm92aWRlcnMuZm9yRWFjaChmdW5jdGlvbihwcm92aWRlcikge1xuICAgICAgICAgICAgcHJvdmlkZXIucHJvdmlkZUNvZGVMZW5zZXMoc2Vzc2lvbiwgZnVuY3Rpb24oZXJyLCBwYXlsb2FkKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikgcmV0dXJuO1xuICAgICAgICAgICAgICAgIHBheWxvYWQuZm9yRWFjaChmdW5jdGlvbihsZW5zKSB7XG4gICAgICAgICAgICAgICAgICAgIGxlbnNlcy5wdXNoKGxlbnMpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHByb3ZpZGVyc1RvV2FpdE51bS0tO1xuICAgICAgICAgICAgICAgIGlmIChwcm92aWRlcnNUb1dhaXROdW0gPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBhcHBseUxlbnNlcygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBmdW5jdGlvbiBhcHBseUxlbnNlcygpIHtcbiAgICAgICAgICAgIHZhciBjdXJzb3IgPSBzZXNzaW9uLnNlbGVjdGlvbi5jdXJzb3I7XG4gICAgICAgICAgICB2YXIgb2xkUm93ID0gc2Vzc2lvbi5kb2N1bWVudFRvU2NyZWVuUm93KGN1cnNvcik7XG4gICAgICAgICAgICB2YXIgc2Nyb2xsVG9wID0gc2Vzc2lvbi5nZXRTY3JvbGxUb3AoKTtcbiAgICAgICAgICAgIHZhciBmaXJzdFJvdyA9IGV4cG9ydHMuc2V0TGVuc2VzKHNlc3Npb24sIGxlbnNlcyk7XG5cbiAgICAgICAgICAgIHZhciBsYXN0RGVsdGEgPSBzZXNzaW9uLiR1bmRvTWFuYWdlciAmJiBzZXNzaW9uLiR1bmRvTWFuYWdlci4kbGFzdERlbHRhO1xuICAgICAgICAgICAgaWYgKGxhc3REZWx0YSAmJiBsYXN0RGVsdGEuYWN0aW9uID09IFwicmVtb3ZlXCIgJiYgbGFzdERlbHRhLmxpbmVzLmxlbmd0aCA+IDEpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgdmFyIHJvdyA9IHNlc3Npb24uZG9jdW1lbnRUb1NjcmVlblJvdyhjdXJzb3IpO1xuICAgICAgICAgICAgdmFyIGxpbmVIZWlnaHQgPSBlZGl0b3IucmVuZGVyZXIubGF5ZXJDb25maWcubGluZUhlaWdodDtcbiAgICAgICAgICAgIHZhciB0b3AgPSBzZXNzaW9uLmdldFNjcm9sbFRvcCgpICsgKHJvdyAtIG9sZFJvdykgKiBsaW5lSGVpZ2h0O1xuICAgICAgICAgICAgLy8gc3BlY2lhbCBjYXNlIGZvciB0aGUgbGVucyBvbiBsaW5lIDAsIGJlY2F1c2UgaXQgY2FuJ3QgYmUgc2Nyb2xsZWQgaW50byB2aWV3IHdpdGgga2V5Ym9hcmRcbiAgICAgICAgICAgIGlmIChmaXJzdFJvdyA9PSAwICYmIHNjcm9sbFRvcCA8IGxpbmVIZWlnaHQgLzQgJiYgc2Nyb2xsVG9wID4gLWxpbmVIZWlnaHQvNCkge1xuICAgICAgICAgICAgICAgIHRvcCA9IC1saW5lSGVpZ2h0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2Vzc2lvbi5zZXRTY3JvbGxUb3AodG9wKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdmFyIHVwZGF0ZUxlbnNlcyA9IGxhbmcuZGVsYXllZENhbGwoZWRpdG9yLiR1cGRhdGVMZW5zZXMpO1xuICAgIGVkaXRvci4kdXBkYXRlTGVuc2VzT25JbnB1dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB1cGRhdGVMZW5zZXMuZGVsYXkoMjUwKTtcbiAgICB9O1xuICAgIGVkaXRvci5vbihcImlucHV0XCIsIGVkaXRvci4kdXBkYXRlTGVuc2VzT25JbnB1dCk7XG59XG5cbi8qKlxuICogRGV0YWNoZXMgY29kZSBsZW5zIGZ1bmN0aW9uYWxpdHkgZnJvbSBhbiBlZGl0b3JcbiAqIEBwYXJhbSB7aW1wb3J0KFwiLi4vZWRpdG9yXCIpLkVkaXRvcn0gZWRpdG9yIFRoZSBlZGl0b3IgdG8gZGV0YWNoIGZyb21cbiAqL1xuZnVuY3Rpb24gZGV0YWNoRnJvbUVkaXRvcihlZGl0b3IpIHtcbiAgICBlZGl0b3Iub2ZmKFwiaW5wdXRcIiwgZWRpdG9yLiR1cGRhdGVMZW5zZXNPbklucHV0KTtcbiAgICBlZGl0b3IucmVuZGVyZXIub2ZmKFwiYWZ0ZXJSZW5kZXJcIiwgcmVuZGVyV2lkZ2V0cyk7XG4gICAgaWYgKGVkaXRvci4kY29kZUxlbnNDbGlja0hhbmRsZXIpXG4gICAgICAgIGVkaXRvci5jb250YWluZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGVkaXRvci4kY29kZUxlbnNDbGlja0hhbmRsZXIpO1xufVxuXG4vKipcbiAqIFJlZ2lzdGVycyBhIGNvZGUgbGVucyBwcm92aWRlciB3aXRoIGFuIGVkaXRvclxuICogQHBhcmFtIHtpbXBvcnQoXCIuLi9lZGl0b3JcIikuRWRpdG9yfSBlZGl0b3IgVGhlIGVkaXRvciB0byByZWdpc3RlciB0aGUgcHJvdmlkZXIgd2l0aFxuICogQHBhcmFtIHtpbXBvcnQoXCIuLi8uLi9hY2UtaW50ZXJuYWxcIikuQWNlLkNvZGVMZW5zZVByb3ZpZGVyfSBjb2RlTGVuc1Byb3ZpZGVyIFRoZSBwcm92aWRlciB0byByZWdpc3RlclxuICovXG5leHBvcnRzLnJlZ2lzdGVyQ29kZUxlbnNQcm92aWRlciA9IGZ1bmN0aW9uKGVkaXRvciwgY29kZUxlbnNQcm92aWRlcikge1xuICAgIGVkaXRvci5zZXRPcHRpb24oXCJlbmFibGVDb2RlTGVuc1wiLCB0cnVlKTtcbiAgICBlZGl0b3IuY29kZUxlbnNQcm92aWRlcnMucHVzaChjb2RlTGVuc1Byb3ZpZGVyKTtcbiAgICBlZGl0b3IuJHVwZGF0ZUxlbnNlc09uSW5wdXQoKTtcbn07XG5cbi8qKlxuICogQ2xlYXJzIGFsbCBjb2RlIGxlbnNlcyBmcm9tIHRoZSBzZXNzaW9uXG4gKiBAcGFyYW0ge0VkaXRTZXNzaW9ufSBzZXNzaW9uIFRoZSBzZXNzaW9uIHRvIGNsZWFyIGNvZGUgbGVuc2VzIGZyb21cbiAqL1xuZXhwb3J0cy5jbGVhciA9IGZ1bmN0aW9uKHNlc3Npb24pIHtcbiAgICBleHBvcnRzLnNldExlbnNlcyhzZXNzaW9uLCBudWxsKTtcbn07XG5cbnZhciBFZGl0b3IgPSByZXF1aXJlKFwiLi4vZWRpdG9yXCIpLkVkaXRvcjtcbnJlcXVpcmUoXCIuLi9jb25maWdcIikuZGVmaW5lT3B0aW9ucyhFZGl0b3IucHJvdG90eXBlLCBcImVkaXRvclwiLCB7XG4gICAgZW5hYmxlQ29kZUxlbnM6IHtcbiAgICAgICAgc2V0OiBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgICAgICAgICBhdHRhY2hUb0VkaXRvcih0aGlzKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGV0YWNoRnJvbUVkaXRvcih0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5kb20uaW1wb3J0Q3NzU3RyaW5nKGBcbi5hY2VfY29kZUxlbnMge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBjb2xvcjogI2FhYTtcbiAgICBmb250LXNpemU6IDg4JTtcbiAgICBiYWNrZ3JvdW5kOiBpbmhlcml0O1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGZsZXgtZW5kO1xuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xufVxuLmFjZV9jb2RlTGVucyA+IGEge1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBwb2ludGVyLWV2ZW50czogYXV0bztcbn1cbi5hY2VfY29kZUxlbnMgPiBhOmhvdmVyIHtcbiAgICBjb2xvcjogIzAwMDBmZjtcbiAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcbn1cbi5hY2VfZGFyayA+IC5hY2VfY29kZUxlbnMgPiBhOmhvdmVyIHtcbiAgICBjb2xvcjogIzRlOTRjZTtcbn1cbmAsIFwiY29kZWxlbnNlLmNzc1wiLCBmYWxzZSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=