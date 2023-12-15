"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[2447],{

/***/ 62447:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/**
 * @typedef {import("../edit_session").EditSession} EditSession
 * @typedef {import("../virtual_renderer").VirtualRenderer & {$textLayer: import("../layer/text").Text &{$lenses}}} VirtualRenderer
 */

var LineWidgets = (__webpack_require__(62269)/* .LineWidgets */ .H);
var event = __webpack_require__(17989);
var lang = __webpack_require__(20124);
var dom = __webpack_require__(6359);

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
 * @param lenses
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
 * @param codeLensProvider
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjI0NDcuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7QUFDYjtBQUNBLGFBQWEsdUNBQXVDO0FBQ3BELGFBQWEsaURBQWlELDJDQUEyQyxXQUFXO0FBQ3BIOztBQUVBLGtCQUFrQixpREFBc0M7QUFDeEQsWUFBWSxtQkFBTyxDQUFDLEtBQWM7QUFDbEMsV0FBVyxtQkFBTyxDQUFDLEtBQWE7QUFDaEMsVUFBVSxtQkFBTyxDQUFDLElBQVk7O0FBRTlCO0FBQ0EsV0FBVyxpQkFBaUI7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxjQUFjO0FBQ3pEO0FBQ0E7O0FBRUE7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxpQkFBaUI7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0Esb0JBQW9CLHNCQUFzQjtBQUMxQztBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLHNCQUFzQjtBQUM5RDtBQUNBO0FBQ0E7O0FBRUEsd0JBQXdCLG1CQUFtQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxXQUFXLGFBQWE7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBLFdBQVcsYUFBYTtBQUN4QjtBQUNBLFlBQVk7QUFDWjtBQUNBLGlCQUFpQjtBQUNqQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsaUNBQWlDLE9BQU8sUUFBUSxnQkFBZ0I7QUFDaEU7QUFDQTs7QUFFQTtBQUNBLFdBQVcsNEJBQTRCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFdBQVcsNEJBQTRCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsV0FBVyw0QkFBNEI7QUFDdkM7QUFDQTtBQUNBLGdDQUFnQztBQUNoQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFdBQVcsYUFBYTtBQUN4QjtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBLGFBQWEsNENBQTJCO0FBQ3hDLDBDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL2V4dC9jb2RlX2xlbnMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG4vKipcbiAqIEB0eXBlZGVmIHtpbXBvcnQoXCIuLi9lZGl0X3Nlc3Npb25cIikuRWRpdFNlc3Npb259IEVkaXRTZXNzaW9uXG4gKiBAdHlwZWRlZiB7aW1wb3J0KFwiLi4vdmlydHVhbF9yZW5kZXJlclwiKS5WaXJ0dWFsUmVuZGVyZXIgJiB7JHRleHRMYXllcjogaW1wb3J0KFwiLi4vbGF5ZXIvdGV4dFwiKS5UZXh0ICZ7JGxlbnNlc319fSBWaXJ0dWFsUmVuZGVyZXJcbiAqL1xuXG52YXIgTGluZVdpZGdldHMgPSByZXF1aXJlKFwiLi4vbGluZV93aWRnZXRzXCIpLkxpbmVXaWRnZXRzO1xudmFyIGV2ZW50ID0gcmVxdWlyZShcIi4uL2xpYi9ldmVudFwiKTtcbnZhciBsYW5nID0gcmVxdWlyZShcIi4uL2xpYi9sYW5nXCIpO1xudmFyIGRvbSA9IHJlcXVpcmUoXCIuLi9saWIvZG9tXCIpO1xuXG4vKipcbiAqIEBwYXJhbSB7VmlydHVhbFJlbmRlcmVyfSByZW5kZXJlclxuICovXG5mdW5jdGlvbiBjbGVhckxlbnNFbGVtZW50cyhyZW5kZXJlcikge1xuICAgIHZhciB0ZXh0TGF5ZXIgPSByZW5kZXJlci4kdGV4dExheWVyO1xuICAgIHZhciBsZW5zRWxlbWVudHMgPSB0ZXh0TGF5ZXIuJGxlbnNlcztcbiAgICBpZiAobGVuc0VsZW1lbnRzKVxuICAgICAgICBsZW5zRWxlbWVudHMuZm9yRWFjaChmdW5jdGlvbihlbCkge2VsLnJlbW92ZSgpOyB9KTtcbiAgICB0ZXh0TGF5ZXIuJGxlbnNlcyA9IG51bGw7XG59XG5cbi8qKlxuICogQHBhcmFtIHtudW1iZXJ9IGNoYW5nZXNcbiAqIEBwYXJhbSB7VmlydHVhbFJlbmRlcmVyfSByZW5kZXJlclxuICovXG5mdW5jdGlvbiByZW5kZXJXaWRnZXRzKGNoYW5nZXMsIHJlbmRlcmVyKSB7XG4gICAgdmFyIGNoYW5nZWQgPSBjaGFuZ2VzICYgcmVuZGVyZXIuQ0hBTkdFX0xJTkVTXG4gICAgICAgIHx8IGNoYW5nZXMgJiByZW5kZXJlci5DSEFOR0VfRlVMTFxuICAgICAgICB8fCBjaGFuZ2VzICYgcmVuZGVyZXIuQ0hBTkdFX1NDUk9MTFxuICAgICAgICB8fCBjaGFuZ2VzICYgcmVuZGVyZXIuQ0hBTkdFX1RFWFQ7XG4gICAgaWYgKCFjaGFuZ2VkKVxuICAgICAgICByZXR1cm47XG5cbiAgICB2YXIgc2Vzc2lvbiA9IHJlbmRlcmVyLnNlc3Npb247XG4gICAgdmFyIGxpbmVXaWRnZXRzID0gcmVuZGVyZXIuc2Vzc2lvbi5saW5lV2lkZ2V0cztcbiAgICB2YXIgdGV4dExheWVyID0gcmVuZGVyZXIuJHRleHRMYXllcjtcbiAgICB2YXIgbGVuc0VsZW1lbnRzID0gdGV4dExheWVyLiRsZW5zZXM7XG4gICAgaWYgKCFsaW5lV2lkZ2V0cykge1xuICAgICAgICBpZiAobGVuc0VsZW1lbnRzKVxuICAgICAgICAgICAgY2xlYXJMZW5zRWxlbWVudHMocmVuZGVyZXIpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHRleHRDZWxscyA9IHJlbmRlcmVyLiR0ZXh0TGF5ZXIuJGxpbmVzLmNlbGxzO1xuICAgIHZhciBjb25maWcgPSByZW5kZXJlci5sYXllckNvbmZpZztcbiAgICB2YXIgcGFkZGluZyA9IHJlbmRlcmVyLiRwYWRkaW5nO1xuXG4gICAgaWYgKCFsZW5zRWxlbWVudHMpXG4gICAgICAgIGxlbnNFbGVtZW50cyA9IHRleHRMYXllci4kbGVuc2VzID0gW107XG5cblxuICAgIHZhciBpbmRleCA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0ZXh0Q2VsbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHJvdyA9IHRleHRDZWxsc1tpXS5yb3c7XG4gICAgICAgIHZhciB3aWRnZXQgPSBsaW5lV2lkZ2V0c1tyb3ddO1xuICAgICAgICB2YXIgbGVuc2VzID0gd2lkZ2V0ICYmIHdpZGdldC5sZW5zZXM7XG5cbiAgICAgICAgaWYgKCFsZW5zZXMgfHwgIWxlbnNlcy5sZW5ndGgpIGNvbnRpbnVlO1xuXG4gICAgICAgIHZhciBsZW5zQ29udGFpbmVyID0gbGVuc0VsZW1lbnRzW2luZGV4XTtcbiAgICAgICAgaWYgKCFsZW5zQ29udGFpbmVyKSB7XG4gICAgICAgICAgICBsZW5zQ29udGFpbmVyID0gbGVuc0VsZW1lbnRzW2luZGV4XVxuICAgICAgICAgICAgICAgID0gZG9tLmJ1aWxkRG9tKFtcImRpdlwiLCB7Y2xhc3M6IFwiYWNlX2NvZGVMZW5zXCJ9XSwgcmVuZGVyZXIuY29udGFpbmVyKTtcbiAgICAgICAgfVxuICAgICAgICBsZW5zQ29udGFpbmVyLnN0eWxlLmhlaWdodCA9IGNvbmZpZy5saW5lSGVpZ2h0ICsgXCJweFwiO1xuICAgICAgICBpbmRleCsrO1xuXG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgbGVuc2VzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICB2YXIgZWwgPSBsZW5zQ29udGFpbmVyLmNoaWxkTm9kZXNbMiAqIGpdO1xuICAgICAgICAgICAgaWYgKCFlbCkge1xuICAgICAgICAgICAgICAgIGlmIChqICE9IDApIGxlbnNDb250YWluZXIuYXBwZW5kQ2hpbGQoZG9tLmNyZWF0ZVRleHROb2RlKFwiXFx4YTB8XFx4YTBcIikpO1xuICAgICAgICAgICAgICAgIGVsID0gZG9tLmJ1aWxkRG9tKFtcImFcIl0sIGxlbnNDb250YWluZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWwudGV4dENvbnRlbnQgPSBsZW5zZXNbal0udGl0bGU7XG4gICAgICAgICAgICBlbC5sZW5zQ29tbWFuZCA9IGxlbnNlc1tqXTtcbiAgICAgICAgfVxuICAgICAgICB3aGlsZSAobGVuc0NvbnRhaW5lci5jaGlsZE5vZGVzLmxlbmd0aCA+IDIgKiBqIC0gMSlcbiAgICAgICAgICAgIGxlbnNDb250YWluZXIubGFzdENoaWxkLnJlbW92ZSgpO1xuXG4gICAgICAgIHZhciB0b3AgPSByZW5kZXJlci4kY3Vyc29yTGF5ZXIuZ2V0UGl4ZWxQb3NpdGlvbih7XG4gICAgICAgICAgICByb3c6IHJvdyxcbiAgICAgICAgICAgIGNvbHVtbjogMFxuICAgICAgICB9LCB0cnVlKS50b3AgLSBjb25maWcubGluZUhlaWdodCAqIHdpZGdldC5yb3dzQWJvdmUgLSBjb25maWcub2Zmc2V0O1xuICAgICAgICBsZW5zQ29udGFpbmVyLnN0eWxlLnRvcCA9IHRvcCArIFwicHhcIjtcblxuICAgICAgICB2YXIgbGVmdCA9IHJlbmRlcmVyLmd1dHRlcldpZHRoO1xuICAgICAgICB2YXIgaW5kZW50ID0gc2Vzc2lvbi5nZXRMaW5lKHJvdykuc2VhcmNoKC9cXFN8JC8pO1xuICAgICAgICBpZiAoaW5kZW50ID09IC0xKVxuICAgICAgICAgICAgaW5kZW50ID0gMDtcbiAgICAgICAgbGVmdCArPSBpbmRlbnQgKiBjb25maWcuY2hhcmFjdGVyV2lkdGg7XG4gICAgICAgIGxlbnNDb250YWluZXIuc3R5bGUucGFkZGluZ0xlZnQgPSBwYWRkaW5nICsgbGVmdCArIFwicHhcIjtcbiAgICB9XG4gICAgd2hpbGUgKGluZGV4IDwgbGVuc0VsZW1lbnRzLmxlbmd0aClcbiAgICAgICAgbGVuc0VsZW1lbnRzLnBvcCgpLnJlbW92ZSgpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7RWRpdFNlc3Npb259IHNlc3Npb25cbiAqL1xuZnVuY3Rpb24gY2xlYXJDb2RlTGVuc1dpZGdldHMoc2Vzc2lvbikge1xuICAgIGlmICghc2Vzc2lvbi5saW5lV2lkZ2V0cykgcmV0dXJuO1xuICAgIHZhciB3aWRnZXRNYW5hZ2VyID0gc2Vzc2lvbi53aWRnZXRNYW5hZ2VyO1xuICAgIHNlc3Npb24ubGluZVdpZGdldHMuZm9yRWFjaChmdW5jdGlvbih3aWRnZXQpIHtcbiAgICAgICAgaWYgKHdpZGdldCAmJiB3aWRnZXQubGVuc2VzKVxuICAgICAgICAgICAgd2lkZ2V0TWFuYWdlci5yZW1vdmVMaW5lV2lkZ2V0KHdpZGdldCk7XG4gICAgfSk7XG59XG5cbi8qKlxuICogXG4gKiBAcGFyYW0ge0VkaXRTZXNzaW9ufSBzZXNzaW9uXG4gKiBAcGFyYW0gbGVuc2VzXG4gKiBAcmV0dXJuIHtudW1iZXJ9XG4gKi9cbmV4cG9ydHMuc2V0TGVuc2VzID0gZnVuY3Rpb24oc2Vzc2lvbiwgbGVuc2VzKSB7XG4gICAgdmFyIGZpcnN0Um93ID0gTnVtYmVyLk1BWF9WQUxVRTtcblxuICAgIGNsZWFyQ29kZUxlbnNXaWRnZXRzKHNlc3Npb24pO1xuICAgIGxlbnNlcyAmJiBsZW5zZXMuZm9yRWFjaChmdW5jdGlvbihsZW5zKSB7XG4gICAgICAgIHZhciByb3cgPSBsZW5zLnN0YXJ0LnJvdztcbiAgICAgICAgdmFyIGNvbHVtbiA9IGxlbnMuc3RhcnQuY29sdW1uO1xuICAgICAgICB2YXIgd2lkZ2V0ID0gc2Vzc2lvbi5saW5lV2lkZ2V0cyAmJiBzZXNzaW9uLmxpbmVXaWRnZXRzW3Jvd107XG4gICAgICAgIGlmICghd2lkZ2V0IHx8ICF3aWRnZXQubGVuc2VzKSB7XG4gICAgICAgICAgICB3aWRnZXQgPSBzZXNzaW9uLndpZGdldE1hbmFnZXIuJHJlZ2lzdGVyTGluZVdpZGdldCh7XG4gICAgICAgICAgICAgICAgcm93Q291bnQ6IDEsXG4gICAgICAgICAgICAgICAgcm93c0Fib3ZlOiAxLFxuICAgICAgICAgICAgICAgIHJvdzogcm93LFxuICAgICAgICAgICAgICAgIGNvbHVtbjogY29sdW1uLFxuICAgICAgICAgICAgICAgIGxlbnNlczogW11cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHdpZGdldC5sZW5zZXMucHVzaChsZW5zLmNvbW1hbmQpO1xuICAgICAgICBpZiAocm93IDwgZmlyc3RSb3cpXG4gICAgICAgICAgICBmaXJzdFJvdyA9IHJvdztcbiAgICB9KTtcbiAgICBzZXNzaW9uLl9lbWl0KFwiY2hhbmdlRm9sZFwiLCB7ZGF0YToge3N0YXJ0OiB7cm93OiBmaXJzdFJvd319fSk7XG4gICAgcmV0dXJuIGZpcnN0Um93O1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge2ltcG9ydChcIi4uL2VkaXRvclwiKS5FZGl0b3J9IGVkaXRvclxuICovXG5mdW5jdGlvbiBhdHRhY2hUb0VkaXRvcihlZGl0b3IpIHtcbiAgICBlZGl0b3IuY29kZUxlbnNQcm92aWRlcnMgPSBbXTtcbiAgICBlZGl0b3IucmVuZGVyZXIub24oXCJhZnRlclJlbmRlclwiLCByZW5kZXJXaWRnZXRzKTtcbiAgICBpZiAoIWVkaXRvci4kY29kZUxlbnNDbGlja0hhbmRsZXIpIHtcbiAgICAgICAgZWRpdG9yLiRjb2RlTGVuc0NsaWNrSGFuZGxlciA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIHZhciBjb21tYW5kID0gZS50YXJnZXQubGVuc0NvbW1hbmQ7XG4gICAgICAgICAgICBpZiAoIWNvbW1hbmQpIHJldHVybjtcbiAgICAgICAgICAgIGVkaXRvci5leGVjQ29tbWFuZChjb21tYW5kLmlkLCBjb21tYW5kLmFyZ3VtZW50cyk7XG4gICAgICAgICAgICBlZGl0b3IuX2VtaXQoXCJjb2RlTGVuc0NsaWNrXCIsIGUpO1xuICAgICAgICB9O1xuICAgICAgICBldmVudC5hZGRMaXN0ZW5lcihlZGl0b3IuY29udGFpbmVyLCBcImNsaWNrXCIsIGVkaXRvci4kY29kZUxlbnNDbGlja0hhbmRsZXIsIGVkaXRvcik7XG4gICAgfVxuICAgIGVkaXRvci4kdXBkYXRlTGVuc2VzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzZXNzaW9uID0gZWRpdG9yLnNlc3Npb247XG4gICAgICAgIGlmICghc2Vzc2lvbikgcmV0dXJuO1xuXG4gICAgICAgIGlmICghc2Vzc2lvbi53aWRnZXRNYW5hZ2VyKSB7XG4gICAgICAgICAgICBzZXNzaW9uLndpZGdldE1hbmFnZXIgPSBuZXcgTGluZVdpZGdldHMoc2Vzc2lvbik7XG4gICAgICAgICAgICBzZXNzaW9uLndpZGdldE1hbmFnZXIuYXR0YWNoKGVkaXRvcik7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcHJvdmlkZXJzVG9XYWl0TnVtID0gZWRpdG9yLmNvZGVMZW5zUHJvdmlkZXJzLmxlbmd0aDtcbiAgICAgICAgdmFyIGxlbnNlcyA9IFtdO1xuICAgICAgICBlZGl0b3IuY29kZUxlbnNQcm92aWRlcnMuZm9yRWFjaChmdW5jdGlvbihwcm92aWRlcikge1xuICAgICAgICAgICAgcHJvdmlkZXIucHJvdmlkZUNvZGVMZW5zZXMoc2Vzc2lvbiwgZnVuY3Rpb24oZXJyLCBwYXlsb2FkKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikgcmV0dXJuO1xuICAgICAgICAgICAgICAgIHBheWxvYWQuZm9yRWFjaChmdW5jdGlvbihsZW5zKSB7XG4gICAgICAgICAgICAgICAgICAgIGxlbnNlcy5wdXNoKGxlbnMpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHByb3ZpZGVyc1RvV2FpdE51bS0tO1xuICAgICAgICAgICAgICAgIGlmIChwcm92aWRlcnNUb1dhaXROdW0gPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBhcHBseUxlbnNlcygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBmdW5jdGlvbiBhcHBseUxlbnNlcygpIHtcbiAgICAgICAgICAgIHZhciBjdXJzb3IgPSBzZXNzaW9uLnNlbGVjdGlvbi5jdXJzb3I7XG4gICAgICAgICAgICB2YXIgb2xkUm93ID0gc2Vzc2lvbi5kb2N1bWVudFRvU2NyZWVuUm93KGN1cnNvcik7XG4gICAgICAgICAgICB2YXIgc2Nyb2xsVG9wID0gc2Vzc2lvbi5nZXRTY3JvbGxUb3AoKTtcbiAgICAgICAgICAgIHZhciBmaXJzdFJvdyA9IGV4cG9ydHMuc2V0TGVuc2VzKHNlc3Npb24sIGxlbnNlcyk7XG5cbiAgICAgICAgICAgIHZhciBsYXN0RGVsdGEgPSBzZXNzaW9uLiR1bmRvTWFuYWdlciAmJiBzZXNzaW9uLiR1bmRvTWFuYWdlci4kbGFzdERlbHRhO1xuICAgICAgICAgICAgaWYgKGxhc3REZWx0YSAmJiBsYXN0RGVsdGEuYWN0aW9uID09IFwicmVtb3ZlXCIgJiYgbGFzdERlbHRhLmxpbmVzLmxlbmd0aCA+IDEpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgdmFyIHJvdyA9IHNlc3Npb24uZG9jdW1lbnRUb1NjcmVlblJvdyhjdXJzb3IpO1xuICAgICAgICAgICAgdmFyIGxpbmVIZWlnaHQgPSBlZGl0b3IucmVuZGVyZXIubGF5ZXJDb25maWcubGluZUhlaWdodDtcbiAgICAgICAgICAgIHZhciB0b3AgPSBzZXNzaW9uLmdldFNjcm9sbFRvcCgpICsgKHJvdyAtIG9sZFJvdykgKiBsaW5lSGVpZ2h0O1xuICAgICAgICAgICAgLy8gc3BlY2lhbCBjYXNlIGZvciB0aGUgbGVucyBvbiBsaW5lIDAsIGJlY2F1c2UgaXQgY2FuJ3QgYmUgc2Nyb2xsZWQgaW50byB2aWV3IHdpdGgga2V5Ym9hcmQgXG4gICAgICAgICAgICBpZiAoZmlyc3RSb3cgPT0gMCAmJiBzY3JvbGxUb3AgPCBsaW5lSGVpZ2h0IC80ICYmIHNjcm9sbFRvcCA+IC1saW5lSGVpZ2h0LzQpIHtcbiAgICAgICAgICAgICAgICB0b3AgPSAtbGluZUhlaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlc3Npb24uc2V0U2Nyb2xsVG9wKHRvcCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHZhciB1cGRhdGVMZW5zZXMgPSBsYW5nLmRlbGF5ZWRDYWxsKGVkaXRvci4kdXBkYXRlTGVuc2VzKTtcbiAgICBlZGl0b3IuJHVwZGF0ZUxlbnNlc09uSW5wdXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdXBkYXRlTGVuc2VzLmRlbGF5KDI1MCk7XG4gICAgfTtcbiAgICBlZGl0b3Iub24oXCJpbnB1dFwiLCBlZGl0b3IuJHVwZGF0ZUxlbnNlc09uSW5wdXQpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7aW1wb3J0KFwiLi4vZWRpdG9yXCIpLkVkaXRvcn0gZWRpdG9yXG4gKi9cbmZ1bmN0aW9uIGRldGFjaEZyb21FZGl0b3IoZWRpdG9yKSB7XG4gICAgZWRpdG9yLm9mZihcImlucHV0XCIsIGVkaXRvci4kdXBkYXRlTGVuc2VzT25JbnB1dCk7XG4gICAgZWRpdG9yLnJlbmRlcmVyLm9mZihcImFmdGVyUmVuZGVyXCIsIHJlbmRlcldpZGdldHMpO1xuICAgIGlmIChlZGl0b3IuJGNvZGVMZW5zQ2xpY2tIYW5kbGVyKVxuICAgICAgICBlZGl0b3IuY29udGFpbmVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBlZGl0b3IuJGNvZGVMZW5zQ2xpY2tIYW5kbGVyKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge2ltcG9ydChcIi4uL2VkaXRvclwiKS5FZGl0b3J9IGVkaXRvclxuICogQHBhcmFtIGNvZGVMZW5zUHJvdmlkZXJcbiAqL1xuZXhwb3J0cy5yZWdpc3RlckNvZGVMZW5zUHJvdmlkZXIgPSBmdW5jdGlvbihlZGl0b3IsIGNvZGVMZW5zUHJvdmlkZXIpIHtcbiAgICBlZGl0b3Iuc2V0T3B0aW9uKFwiZW5hYmxlQ29kZUxlbnNcIiwgdHJ1ZSk7XG4gICAgZWRpdG9yLmNvZGVMZW5zUHJvdmlkZXJzLnB1c2goY29kZUxlbnNQcm92aWRlcik7XG4gICAgZWRpdG9yLiR1cGRhdGVMZW5zZXNPbklucHV0KCk7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7RWRpdFNlc3Npb259IHNlc3Npb25cbiAqL1xuZXhwb3J0cy5jbGVhciA9IGZ1bmN0aW9uKHNlc3Npb24pIHtcbiAgICBleHBvcnRzLnNldExlbnNlcyhzZXNzaW9uLCBudWxsKTtcbn07XG5cbnZhciBFZGl0b3IgPSByZXF1aXJlKFwiLi4vZWRpdG9yXCIpLkVkaXRvcjtcbnJlcXVpcmUoXCIuLi9jb25maWdcIikuZGVmaW5lT3B0aW9ucyhFZGl0b3IucHJvdG90eXBlLCBcImVkaXRvclwiLCB7XG4gICAgZW5hYmxlQ29kZUxlbnM6IHtcbiAgICAgICAgc2V0OiBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgICAgICAgICBhdHRhY2hUb0VkaXRvcih0aGlzKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGV0YWNoRnJvbUVkaXRvcih0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5kb20uaW1wb3J0Q3NzU3RyaW5nKGBcbi5hY2VfY29kZUxlbnMge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBjb2xvcjogI2FhYTtcbiAgICBmb250LXNpemU6IDg4JTtcbiAgICBiYWNrZ3JvdW5kOiBpbmhlcml0O1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGZsZXgtZW5kO1xuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xufVxuLmFjZV9jb2RlTGVucyA+IGEge1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBwb2ludGVyLWV2ZW50czogYXV0bztcbn1cbi5hY2VfY29kZUxlbnMgPiBhOmhvdmVyIHtcbiAgICBjb2xvcjogIzAwMDBmZjtcbiAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcbn1cbi5hY2VfZGFyayA+IC5hY2VfY29kZUxlbnMgPiBhOmhvdmVyIHtcbiAgICBjb2xvcjogIzRlOTRjZTtcbn1cbmAsIFwiY29kZWxlbnNlLmNzc1wiLCBmYWxzZSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=