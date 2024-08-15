"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[3087],{

/***/ 13087:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var HashHandler = (__webpack_require__(93050).HashHandler);
var config = __webpack_require__(76321);

exports.handler = new HashHandler();
exports.handler.$id = "ace/keyboard/vscode";

exports.handler.addCommands([{
    name: "toggleWordWrap",
    exec: function(editor) {
        var wrapUsed = editor.session.getUseWrapMode();
        editor.session.setUseWrapMode(!wrapUsed);
    },
    readOnly: true
}, {
    name: "navigateToLastEditLocation",
    exec: function(editor) {
        var lastDelta = editor.session.getUndoManager().$lastDelta;
        var range = (lastDelta.action  == "remove")? lastDelta.start: lastDelta.end;
        editor.moveCursorTo(range.row, range.column);
        editor.clearSelection();
    }
}, {
    name: "replaceAll",
    exec: function (editor) {
        if (!editor.searchBox) {
            config.loadModule("ace/ext/searchbox", function(e) {
                e.Search(editor, true);
            });
        } else {
            if (editor.searchBox.active === true && editor.searchBox.replaceOption.checked === true) {
                editor.searchBox.replaceAll();
            }
        }
    }
}, {
    name: "replaceOne",
    exec: function (editor) {
        if (!editor.searchBox) {
            config.loadModule("ace/ext/searchbox", function(e) {
                e.Search(editor, true);
            });
        } else {
            if (editor.searchBox.active === true && editor.searchBox.replaceOption.checked === true) {
                editor.searchBox.replace();
            }
        }
    }
}, {
    name: "selectAllMatches",
    exec: function (editor) {
        if (!editor.searchBox) {
            config.loadModule("ace/ext/searchbox", function(e) {
                e.Search(editor, false);
            });
        } else {
            if (editor.searchBox.active === true) {
                editor.searchBox.findAll();
            }
        }
    }
}, {
    name: "toggleFindCaseSensitive",
    exec: function (editor) {
        config.loadModule("ace/ext/searchbox", function(e) {
            e.Search(editor, false);
            var sb = editor.searchBox;
            sb.caseSensitiveOption.checked = !sb.caseSensitiveOption.checked;
            sb.$syncOptions();
        });

    }
}, {
    name: "toggleFindInSelection",
    exec: function (editor) {
        config.loadModule("ace/ext/searchbox", function(e) {
            e.Search(editor, false);
            var sb = editor.searchBox;
            sb.searchOption.checked = !sb.searchRange;
            sb.setSearchRange(sb.searchOption.checked && sb.editor.getSelectionRange());
            sb.$syncOptions();
        });
    }
}, {
    name: "toggleFindRegex",
    exec: function (editor) {
        config.loadModule("ace/ext/searchbox", function(e) {
            e.Search(editor, false);
            var sb = editor.searchBox;
            sb.regExpOption.checked = !sb.regExpOption.checked;
            sb.$syncOptions();
        });
    }
}, {
    name: "toggleFindWholeWord",
    exec: function (editor) {
        config.loadModule("ace/ext/searchbox", function(e) {
            e.Search(editor, false);
            var sb = editor.searchBox;
            sb.wholeWordOption.checked = !sb.wholeWordOption.checked;
            sb.$syncOptions();
        });
    }
}, {
    name: "removeSecondaryCursors",
    exec: function (editor) {
        var ranges = editor.selection.ranges;
        if (ranges && ranges.length > 1)
            editor.selection.toSingleRange(ranges[ranges.length - 1]);
        else
            editor.selection.clearSelection();
    }
}]);


[{
    bindKey: {mac: "Ctrl-G", win: "Ctrl-G"},
    name: "gotoline"
}, {
    bindKey: {mac: "Command-Shift-L|Command-F2", win: "Ctrl-Shift-L|Ctrl-F2"},
    name: "findAll"
}, {
    bindKey: {mac: "Shift-F8|Shift-Option-F8", win: "Shift-F8|Shift-Alt-F8"},
    name: "goToPreviousError"
}, {
    bindKey: {mac: "F8|Option-F8", win: "F8|Alt-F8"},
    name: "goToNextError"
}, {
    bindKey: {mac: "Command-Shift-P|F1", win: "Ctrl-Shift-P|F1"},
    name: "openCommandPalette"
}, {
    bindKey: {mac: "Shift-Option-Up", win: "Alt-Shift-Up"},
    name: "copylinesup"
}, {
    bindKey: {mac: "Shift-Option-Down", win: "Alt-Shift-Down"},
    name: "copylinesdown"
}, {
    bindKey: {mac: "Command-Shift-K", win: "Ctrl-Shift-K"},
    name: "removeline"
}, {
    bindKey: {mac: "Command-Enter", win: "Ctrl-Enter"},
    name: "addLineAfter"
}, {
    bindKey: {mac: "Command-Shift-Enter", win: "Ctrl-Shift-Enter"},
    name: "addLineBefore"
}, {
    bindKey: {mac: "Command-Shift-\\", win: "Ctrl-Shift-\\"},
    name: "jumptomatching"
}, {
    bindKey: {mac: "Command-]", win: "Ctrl-]"},
    name: "blockindent"
}, {
    bindKey: {mac: "Command-[", win: "Ctrl-["},
    name: "blockoutdent"
}, {
    bindKey: {mac: "Ctrl-PageDown", win: "Alt-PageDown"},
    name: "pagedown"
}, {
    bindKey: {mac: "Ctrl-PageUp", win: "Alt-PageUp"},
    name: "pageup"
}, {
    bindKey: {mac: "Shift-Option-A", win: "Shift-Alt-A"},
    name: "toggleBlockComment"
}, {
    bindKey: {mac: "Option-Z", win: "Alt-Z"},
    name: "toggleWordWrap"
}, {
    bindKey: {mac: "Command-G", win: "F3|Ctrl-K Ctrl-D"},
    name: "findnext"
}, {
    bindKey: {mac: "Command-Shift-G", win: "Shift-F3"},
    name: "findprevious"
}, {
    bindKey: {mac: "Option-Enter", win: "Alt-Enter"},
    name: "selectAllMatches"
}, {
    bindKey: {mac: "Command-D", win: "Ctrl-D"},
    name: "selectMoreAfter"
}, {
    bindKey: {mac: "Command-K Command-D", win: "Ctrl-K Ctrl-D"},
    name: "selectOrFindNext"
}, {
    bindKey: {mac: "Shift-Option-I", win: "Shift-Alt-I"},
    name: "splitSelectionIntoLines"
}, {
    bindKey: {mac: "Command-K M", win: "Ctrl-K M"},
    name: "modeSelect"
}, {
    // In VsCode this command is used only for folding instead of toggling fold
    bindKey: {mac: "Command-Option-[", win: "Ctrl-Shift-["},
    name: "toggleFoldWidget"
}, {
    bindKey: {mac: "Command-Option-]", win: "Ctrl-Shift-]"},
    name: "toggleFoldWidget"
}, {
    bindKey: {mac: "Command-K Command-0", win: "Ctrl-K Ctrl-0"},
    name: "foldall"
}, {
    bindKey: {mac: "Command-K Command-J", win: "Ctrl-K Ctrl-J"},
    name: "unfoldall"
}, {
    bindKey: { mac: "Command-K Command-1", win: "Ctrl-K Ctrl-1" },
    name: "foldOther"
}, {
    bindKey: { mac: "Command-K Command-Q", win: "Ctrl-K Ctrl-Q" },
    name: "navigateToLastEditLocation"
}, {
    bindKey: { mac: "Command-K Command-R|Command-K Command-S", win: "Ctrl-K Ctrl-R|Ctrl-K Ctrl-S" },
    name: "showKeyboardShortcuts"
}, {
    bindKey: { mac: "Command-K Command-X", win: "Ctrl-K Ctrl-X" },
    name: "trimTrailingSpace"
}, {
    bindKey: {mac: "Shift-Down|Command-Shift-Down", win: "Shift-Down|Ctrl-Shift-Down"},
    name: "selectdown"
}, {
    bindKey: {mac: "Shift-Up|Command-Shift-Up", win: "Shift-Up|Ctrl-Shift-Up"},
    name: "selectup"
}, {
    // TODO: add similar command to work inside SearchBox
    bindKey: {mac: "Command-Alt-Enter", win: "Ctrl-Alt-Enter"},
    name: "replaceAll"
}, {
    // TODO: add similar command to work inside SearchBox
    bindKey: {mac: "Command-Shift-1", win: "Ctrl-Shift-1"},
    name: "replaceOne"
}, {
    bindKey: {mac: "Option-C", win: "Alt-C"},
    name: "toggleFindCaseSensitive"
}, {
    bindKey: {mac: "Option-L", win: "Alt-L"},
    name: "toggleFindInSelection"
}, {
    bindKey: {mac: "Option-R", win: "Alt-R"},
    name: "toggleFindRegex"
}, {
    bindKey: {mac: "Option-W", win: "Alt-W"},
    name: "toggleFindWholeWord"
}, {
    bindKey: {mac: "Command-L", win: "Ctrl-L"},
    name: "expandtoline"
}, {
    bindKey: {mac: "Shift-Esc", win: "Shift-Esc"},
    name: "removeSecondaryCursors"
} 
// not implemented
/*{
    bindKey: {mac: "Option-Shift-Command-Right", win: "Shift-Alt-Right"},
    name: "smartSelect.expand"
}, {
    bindKey: {mac: "Ctrl-Shift-Command-Left", win: "Shift-Alt-Left"},
    name: "smartSelect.shrink"
}, {
    bindKey: {mac: "Shift-Option-F", win: "Shift-Alt-F"},
    name: "beautify"
}, {
    bindKey: {mac: "Command-K Command-F", win: "Ctrl-K Ctrl-F"},
    name: "formatSelection"
}, {
    bindKey: {mac: "Command-K Command-C", win: "Ctrl-K Ctrl-C"},
    name: "addCommentLine"
}, {
    bindKey: {mac: "Command-K Command-U", win: "Ctrl-K Ctrl-U"},
    name: "removeCommentLine"
}, {
    bindKey: {mac: "Command-K Command-/", win: "Ctrl-K Ctrl-/"},
    name: "foldAllBlockComments"
}, {
    bindKey: {mac: "Command-K Command-2", win: "Ctrl-K Ctrl-2"},
    name: "foldLevel2"
}, {
    bindKey: {mac: "Command-K Command-3", win: "Ctrl-K Ctrl-3"},
    name: "foldLevel3"
}, {
    bindKey: {mac: "Command-K Command-4", win: "Ctrl-K Ctrl-4"},
    name: "foldLevel4"
}, {
    bindKey: {mac: "Command-K Command-5", win: "Ctrl-K Ctrl-5"},
    name: "foldLevel5"
}, {
    bindKey: {mac: "Command-K Command-6", win: "Ctrl-K Ctrl-6"},
    name: "foldLevel6"
}, {
    bindKey: {mac: "Command-K Command-7", win: "Ctrl-K Ctrl-7"},
    name: "foldLevel7"
}, {
    bindKey: {mac: "Command-K Command-[", win: "Ctrl-K Ctrl-["},
    name: "foldRecursively"
}, {
    bindKey: {mac: "Command-K Command-8", win: "Ctrl-K Ctrl-8"},
    name: "foldAllMarkerRegions"
}, {
    bindKey: {mac: "Command-K Command-9", win: "Ctrl-K Ctrl-9"},
    name: "unfoldAllMarkerRegions"
}, {
    bindKey: {mac: "Command-K Command-]", win: "Ctrl-K Ctrl-]"},
    name: "unfoldRecursively"
}, {
    bindKey: {mac: "Command-K Command-T", win: "Ctrl-K Ctrl-T"},
    name: "selectTheme"
}, {
    bindKey: {mac: "Command-K Command-M", win: "Ctrl-K Ctrl-M"},
    name: "selectKeymap"
}, {
    bindKey: {mac: "Command-U", win: "Ctrl-U"},
    name: "cursorUndo"
}*/
].forEach(function(binding) {
    var command = exports.handler.commands[binding.name];
    if (command)
        command.bindKey = binding.bindKey;
    exports.handler.bindKey(binding.bindKey, command || binding.name);
});


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQztBQUNELGNBQWMsaURBQWlEO0FBQy9EO0FBQ0EsQ0FBQztBQUNELGNBQWMsaURBQWlEO0FBQy9EO0FBQ0EsQ0FBQztBQUNELGNBQWMsaURBQWlEO0FBQy9EO0FBQ0EsQ0FBQztBQUNELGNBQWMsZ0NBQWdDO0FBQzlDO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMva2V5Ym9hcmQvdnNjb2RlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG52YXIgSGFzaEhhbmRsZXIgPSByZXF1aXJlKFwiLi4va2V5Ym9hcmQvaGFzaF9oYW5kbGVyXCIpLkhhc2hIYW5kbGVyO1xudmFyIGNvbmZpZyA9IHJlcXVpcmUoXCIuLi9jb25maWdcIik7XG5cbmV4cG9ydHMuaGFuZGxlciA9IG5ldyBIYXNoSGFuZGxlcigpO1xuZXhwb3J0cy5oYW5kbGVyLiRpZCA9IFwiYWNlL2tleWJvYXJkL3ZzY29kZVwiO1xuXG5leHBvcnRzLmhhbmRsZXIuYWRkQ29tbWFuZHMoW3tcbiAgICBuYW1lOiBcInRvZ2dsZVdvcmRXcmFwXCIsXG4gICAgZXhlYzogZnVuY3Rpb24oZWRpdG9yKSB7XG4gICAgICAgIHZhciB3cmFwVXNlZCA9IGVkaXRvci5zZXNzaW9uLmdldFVzZVdyYXBNb2RlKCk7XG4gICAgICAgIGVkaXRvci5zZXNzaW9uLnNldFVzZVdyYXBNb2RlKCF3cmFwVXNlZCk7XG4gICAgfSxcbiAgICByZWFkT25seTogdHJ1ZVxufSwge1xuICAgIG5hbWU6IFwibmF2aWdhdGVUb0xhc3RFZGl0TG9jYXRpb25cIixcbiAgICBleGVjOiBmdW5jdGlvbihlZGl0b3IpIHtcbiAgICAgICAgdmFyIGxhc3REZWx0YSA9IGVkaXRvci5zZXNzaW9uLmdldFVuZG9NYW5hZ2VyKCkuJGxhc3REZWx0YTtcbiAgICAgICAgdmFyIHJhbmdlID0gKGxhc3REZWx0YS5hY3Rpb24gID09IFwicmVtb3ZlXCIpPyBsYXN0RGVsdGEuc3RhcnQ6IGxhc3REZWx0YS5lbmQ7XG4gICAgICAgIGVkaXRvci5tb3ZlQ3Vyc29yVG8ocmFuZ2Uucm93LCByYW5nZS5jb2x1bW4pO1xuICAgICAgICBlZGl0b3IuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICB9XG59LCB7XG4gICAgbmFtZTogXCJyZXBsYWNlQWxsXCIsXG4gICAgZXhlYzogZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgICBpZiAoIWVkaXRvci5zZWFyY2hCb3gpIHtcbiAgICAgICAgICAgIGNvbmZpZy5sb2FkTW9kdWxlKFwiYWNlL2V4dC9zZWFyY2hib3hcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgICAgIGUuU2VhcmNoKGVkaXRvciwgdHJ1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChlZGl0b3Iuc2VhcmNoQm94LmFjdGl2ZSA9PT0gdHJ1ZSAmJiBlZGl0b3Iuc2VhcmNoQm94LnJlcGxhY2VPcHRpb24uY2hlY2tlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGVkaXRvci5zZWFyY2hCb3gucmVwbGFjZUFsbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSwge1xuICAgIG5hbWU6IFwicmVwbGFjZU9uZVwiLFxuICAgIGV4ZWM6IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgICAgaWYgKCFlZGl0b3Iuc2VhcmNoQm94KSB7XG4gICAgICAgICAgICBjb25maWcubG9hZE1vZHVsZShcImFjZS9leHQvc2VhcmNoYm94XCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgICAgICBlLlNlYXJjaChlZGl0b3IsIHRydWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoZWRpdG9yLnNlYXJjaEJveC5hY3RpdmUgPT09IHRydWUgJiYgZWRpdG9yLnNlYXJjaEJveC5yZXBsYWNlT3B0aW9uLmNoZWNrZWQgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBlZGl0b3Iuc2VhcmNoQm94LnJlcGxhY2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn0sIHtcbiAgICBuYW1lOiBcInNlbGVjdEFsbE1hdGNoZXNcIixcbiAgICBleGVjOiBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICAgIGlmICghZWRpdG9yLnNlYXJjaEJveCkge1xuICAgICAgICAgICAgY29uZmlnLmxvYWRNb2R1bGUoXCJhY2UvZXh0L3NlYXJjaGJveFwiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAgICAgZS5TZWFyY2goZWRpdG9yLCBmYWxzZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChlZGl0b3Iuc2VhcmNoQm94LmFjdGl2ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGVkaXRvci5zZWFyY2hCb3guZmluZEFsbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSwge1xuICAgIG5hbWU6IFwidG9nZ2xlRmluZENhc2VTZW5zaXRpdmVcIixcbiAgICBleGVjOiBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICAgIGNvbmZpZy5sb2FkTW9kdWxlKFwiYWNlL2V4dC9zZWFyY2hib3hcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgZS5TZWFyY2goZWRpdG9yLCBmYWxzZSk7XG4gICAgICAgICAgICB2YXIgc2IgPSBlZGl0b3Iuc2VhcmNoQm94O1xuICAgICAgICAgICAgc2IuY2FzZVNlbnNpdGl2ZU9wdGlvbi5jaGVja2VkID0gIXNiLmNhc2VTZW5zaXRpdmVPcHRpb24uY2hlY2tlZDtcbiAgICAgICAgICAgIHNiLiRzeW5jT3B0aW9ucygpO1xuICAgICAgICB9KTtcblxuICAgIH1cbn0sIHtcbiAgICBuYW1lOiBcInRvZ2dsZUZpbmRJblNlbGVjdGlvblwiLFxuICAgIGV4ZWM6IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgICAgY29uZmlnLmxvYWRNb2R1bGUoXCJhY2UvZXh0L3NlYXJjaGJveFwiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBlLlNlYXJjaChlZGl0b3IsIGZhbHNlKTtcbiAgICAgICAgICAgIHZhciBzYiA9IGVkaXRvci5zZWFyY2hCb3g7XG4gICAgICAgICAgICBzYi5zZWFyY2hPcHRpb24uY2hlY2tlZCA9ICFzYi5zZWFyY2hSYW5nZTtcbiAgICAgICAgICAgIHNiLnNldFNlYXJjaFJhbmdlKHNiLnNlYXJjaE9wdGlvbi5jaGVja2VkICYmIHNiLmVkaXRvci5nZXRTZWxlY3Rpb25SYW5nZSgpKTtcbiAgICAgICAgICAgIHNiLiRzeW5jT3B0aW9ucygpO1xuICAgICAgICB9KTtcbiAgICB9XG59LCB7XG4gICAgbmFtZTogXCJ0b2dnbGVGaW5kUmVnZXhcIixcbiAgICBleGVjOiBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICAgIGNvbmZpZy5sb2FkTW9kdWxlKFwiYWNlL2V4dC9zZWFyY2hib3hcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgZS5TZWFyY2goZWRpdG9yLCBmYWxzZSk7XG4gICAgICAgICAgICB2YXIgc2IgPSBlZGl0b3Iuc2VhcmNoQm94O1xuICAgICAgICAgICAgc2IucmVnRXhwT3B0aW9uLmNoZWNrZWQgPSAhc2IucmVnRXhwT3B0aW9uLmNoZWNrZWQ7XG4gICAgICAgICAgICBzYi4kc3luY09wdGlvbnMoKTtcbiAgICAgICAgfSk7XG4gICAgfVxufSwge1xuICAgIG5hbWU6IFwidG9nZ2xlRmluZFdob2xlV29yZFwiLFxuICAgIGV4ZWM6IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgICAgY29uZmlnLmxvYWRNb2R1bGUoXCJhY2UvZXh0L3NlYXJjaGJveFwiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBlLlNlYXJjaChlZGl0b3IsIGZhbHNlKTtcbiAgICAgICAgICAgIHZhciBzYiA9IGVkaXRvci5zZWFyY2hCb3g7XG4gICAgICAgICAgICBzYi53aG9sZVdvcmRPcHRpb24uY2hlY2tlZCA9ICFzYi53aG9sZVdvcmRPcHRpb24uY2hlY2tlZDtcbiAgICAgICAgICAgIHNiLiRzeW5jT3B0aW9ucygpO1xuICAgICAgICB9KTtcbiAgICB9XG59LCB7XG4gICAgbmFtZTogXCJyZW1vdmVTZWNvbmRhcnlDdXJzb3JzXCIsXG4gICAgZXhlYzogZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgICB2YXIgcmFuZ2VzID0gZWRpdG9yLnNlbGVjdGlvbi5yYW5nZXM7XG4gICAgICAgIGlmIChyYW5nZXMgJiYgcmFuZ2VzLmxlbmd0aCA+IDEpXG4gICAgICAgICAgICBlZGl0b3Iuc2VsZWN0aW9uLnRvU2luZ2xlUmFuZ2UocmFuZ2VzW3Jhbmdlcy5sZW5ndGggLSAxXSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGVkaXRvci5zZWxlY3Rpb24uY2xlYXJTZWxlY3Rpb24oKTtcbiAgICB9XG59XSk7XG5cblxuW3tcbiAgICBiaW5kS2V5OiB7bWFjOiBcIkN0cmwtR1wiLCB3aW46IFwiQ3RybC1HXCJ9LFxuICAgIG5hbWU6IFwiZ290b2xpbmVcIlxufSwge1xuICAgIGJpbmRLZXk6IHttYWM6IFwiQ29tbWFuZC1TaGlmdC1MfENvbW1hbmQtRjJcIiwgd2luOiBcIkN0cmwtU2hpZnQtTHxDdHJsLUYyXCJ9LFxuICAgIG5hbWU6IFwiZmluZEFsbFwiXG59LCB7XG4gICAgYmluZEtleToge21hYzogXCJTaGlmdC1GOHxTaGlmdC1PcHRpb24tRjhcIiwgd2luOiBcIlNoaWZ0LUY4fFNoaWZ0LUFsdC1GOFwifSxcbiAgICBuYW1lOiBcImdvVG9QcmV2aW91c0Vycm9yXCJcbn0sIHtcbiAgICBiaW5kS2V5OiB7bWFjOiBcIkY4fE9wdGlvbi1GOFwiLCB3aW46IFwiRjh8QWx0LUY4XCJ9LFxuICAgIG5hbWU6IFwiZ29Ub05leHRFcnJvclwiXG59LCB7XG4gICAgYmluZEtleToge21hYzogXCJDb21tYW5kLVNoaWZ0LVB8RjFcIiwgd2luOiBcIkN0cmwtU2hpZnQtUHxGMVwifSxcbiAgICBuYW1lOiBcIm9wZW5Db21tYW5kUGFsZXR0ZVwiXG59LCB7XG4gICAgYmluZEtleToge21hYzogXCJTaGlmdC1PcHRpb24tVXBcIiwgd2luOiBcIkFsdC1TaGlmdC1VcFwifSxcbiAgICBuYW1lOiBcImNvcHlsaW5lc3VwXCJcbn0sIHtcbiAgICBiaW5kS2V5OiB7bWFjOiBcIlNoaWZ0LU9wdGlvbi1Eb3duXCIsIHdpbjogXCJBbHQtU2hpZnQtRG93blwifSxcbiAgICBuYW1lOiBcImNvcHlsaW5lc2Rvd25cIlxufSwge1xuICAgIGJpbmRLZXk6IHttYWM6IFwiQ29tbWFuZC1TaGlmdC1LXCIsIHdpbjogXCJDdHJsLVNoaWZ0LUtcIn0sXG4gICAgbmFtZTogXCJyZW1vdmVsaW5lXCJcbn0sIHtcbiAgICBiaW5kS2V5OiB7bWFjOiBcIkNvbW1hbmQtRW50ZXJcIiwgd2luOiBcIkN0cmwtRW50ZXJcIn0sXG4gICAgbmFtZTogXCJhZGRMaW5lQWZ0ZXJcIlxufSwge1xuICAgIGJpbmRLZXk6IHttYWM6IFwiQ29tbWFuZC1TaGlmdC1FbnRlclwiLCB3aW46IFwiQ3RybC1TaGlmdC1FbnRlclwifSxcbiAgICBuYW1lOiBcImFkZExpbmVCZWZvcmVcIlxufSwge1xuICAgIGJpbmRLZXk6IHttYWM6IFwiQ29tbWFuZC1TaGlmdC1cXFxcXCIsIHdpbjogXCJDdHJsLVNoaWZ0LVxcXFxcIn0sXG4gICAgbmFtZTogXCJqdW1wdG9tYXRjaGluZ1wiXG59LCB7XG4gICAgYmluZEtleToge21hYzogXCJDb21tYW5kLV1cIiwgd2luOiBcIkN0cmwtXVwifSxcbiAgICBuYW1lOiBcImJsb2NraW5kZW50XCJcbn0sIHtcbiAgICBiaW5kS2V5OiB7bWFjOiBcIkNvbW1hbmQtW1wiLCB3aW46IFwiQ3RybC1bXCJ9LFxuICAgIG5hbWU6IFwiYmxvY2tvdXRkZW50XCJcbn0sIHtcbiAgICBiaW5kS2V5OiB7bWFjOiBcIkN0cmwtUGFnZURvd25cIiwgd2luOiBcIkFsdC1QYWdlRG93blwifSxcbiAgICBuYW1lOiBcInBhZ2Vkb3duXCJcbn0sIHtcbiAgICBiaW5kS2V5OiB7bWFjOiBcIkN0cmwtUGFnZVVwXCIsIHdpbjogXCJBbHQtUGFnZVVwXCJ9LFxuICAgIG5hbWU6IFwicGFnZXVwXCJcbn0sIHtcbiAgICBiaW5kS2V5OiB7bWFjOiBcIlNoaWZ0LU9wdGlvbi1BXCIsIHdpbjogXCJTaGlmdC1BbHQtQVwifSxcbiAgICBuYW1lOiBcInRvZ2dsZUJsb2NrQ29tbWVudFwiXG59LCB7XG4gICAgYmluZEtleToge21hYzogXCJPcHRpb24tWlwiLCB3aW46IFwiQWx0LVpcIn0sXG4gICAgbmFtZTogXCJ0b2dnbGVXb3JkV3JhcFwiXG59LCB7XG4gICAgYmluZEtleToge21hYzogXCJDb21tYW5kLUdcIiwgd2luOiBcIkYzfEN0cmwtSyBDdHJsLURcIn0sXG4gICAgbmFtZTogXCJmaW5kbmV4dFwiXG59LCB7XG4gICAgYmluZEtleToge21hYzogXCJDb21tYW5kLVNoaWZ0LUdcIiwgd2luOiBcIlNoaWZ0LUYzXCJ9LFxuICAgIG5hbWU6IFwiZmluZHByZXZpb3VzXCJcbn0sIHtcbiAgICBiaW5kS2V5OiB7bWFjOiBcIk9wdGlvbi1FbnRlclwiLCB3aW46IFwiQWx0LUVudGVyXCJ9LFxuICAgIG5hbWU6IFwic2VsZWN0QWxsTWF0Y2hlc1wiXG59LCB7XG4gICAgYmluZEtleToge21hYzogXCJDb21tYW5kLURcIiwgd2luOiBcIkN0cmwtRFwifSxcbiAgICBuYW1lOiBcInNlbGVjdE1vcmVBZnRlclwiXG59LCB7XG4gICAgYmluZEtleToge21hYzogXCJDb21tYW5kLUsgQ29tbWFuZC1EXCIsIHdpbjogXCJDdHJsLUsgQ3RybC1EXCJ9LFxuICAgIG5hbWU6IFwic2VsZWN0T3JGaW5kTmV4dFwiXG59LCB7XG4gICAgYmluZEtleToge21hYzogXCJTaGlmdC1PcHRpb24tSVwiLCB3aW46IFwiU2hpZnQtQWx0LUlcIn0sXG4gICAgbmFtZTogXCJzcGxpdFNlbGVjdGlvbkludG9MaW5lc1wiXG59LCB7XG4gICAgYmluZEtleToge21hYzogXCJDb21tYW5kLUsgTVwiLCB3aW46IFwiQ3RybC1LIE1cIn0sXG4gICAgbmFtZTogXCJtb2RlU2VsZWN0XCJcbn0sIHtcbiAgICAvLyBJbiBWc0NvZGUgdGhpcyBjb21tYW5kIGlzIHVzZWQgb25seSBmb3IgZm9sZGluZyBpbnN0ZWFkIG9mIHRvZ2dsaW5nIGZvbGRcbiAgICBiaW5kS2V5OiB7bWFjOiBcIkNvbW1hbmQtT3B0aW9uLVtcIiwgd2luOiBcIkN0cmwtU2hpZnQtW1wifSxcbiAgICBuYW1lOiBcInRvZ2dsZUZvbGRXaWRnZXRcIlxufSwge1xuICAgIGJpbmRLZXk6IHttYWM6IFwiQ29tbWFuZC1PcHRpb24tXVwiLCB3aW46IFwiQ3RybC1TaGlmdC1dXCJ9LFxuICAgIG5hbWU6IFwidG9nZ2xlRm9sZFdpZGdldFwiXG59LCB7XG4gICAgYmluZEtleToge21hYzogXCJDb21tYW5kLUsgQ29tbWFuZC0wXCIsIHdpbjogXCJDdHJsLUsgQ3RybC0wXCJ9LFxuICAgIG5hbWU6IFwiZm9sZGFsbFwiXG59LCB7XG4gICAgYmluZEtleToge21hYzogXCJDb21tYW5kLUsgQ29tbWFuZC1KXCIsIHdpbjogXCJDdHJsLUsgQ3RybC1KXCJ9LFxuICAgIG5hbWU6IFwidW5mb2xkYWxsXCJcbn0sIHtcbiAgICBiaW5kS2V5OiB7IG1hYzogXCJDb21tYW5kLUsgQ29tbWFuZC0xXCIsIHdpbjogXCJDdHJsLUsgQ3RybC0xXCIgfSxcbiAgICBuYW1lOiBcImZvbGRPdGhlclwiXG59LCB7XG4gICAgYmluZEtleTogeyBtYWM6IFwiQ29tbWFuZC1LIENvbW1hbmQtUVwiLCB3aW46IFwiQ3RybC1LIEN0cmwtUVwiIH0sXG4gICAgbmFtZTogXCJuYXZpZ2F0ZVRvTGFzdEVkaXRMb2NhdGlvblwiXG59LCB7XG4gICAgYmluZEtleTogeyBtYWM6IFwiQ29tbWFuZC1LIENvbW1hbmQtUnxDb21tYW5kLUsgQ29tbWFuZC1TXCIsIHdpbjogXCJDdHJsLUsgQ3RybC1SfEN0cmwtSyBDdHJsLVNcIiB9LFxuICAgIG5hbWU6IFwic2hvd0tleWJvYXJkU2hvcnRjdXRzXCJcbn0sIHtcbiAgICBiaW5kS2V5OiB7IG1hYzogXCJDb21tYW5kLUsgQ29tbWFuZC1YXCIsIHdpbjogXCJDdHJsLUsgQ3RybC1YXCIgfSxcbiAgICBuYW1lOiBcInRyaW1UcmFpbGluZ1NwYWNlXCJcbn0sIHtcbiAgICBiaW5kS2V5OiB7bWFjOiBcIlNoaWZ0LURvd258Q29tbWFuZC1TaGlmdC1Eb3duXCIsIHdpbjogXCJTaGlmdC1Eb3dufEN0cmwtU2hpZnQtRG93blwifSxcbiAgICBuYW1lOiBcInNlbGVjdGRvd25cIlxufSwge1xuICAgIGJpbmRLZXk6IHttYWM6IFwiU2hpZnQtVXB8Q29tbWFuZC1TaGlmdC1VcFwiLCB3aW46IFwiU2hpZnQtVXB8Q3RybC1TaGlmdC1VcFwifSxcbiAgICBuYW1lOiBcInNlbGVjdHVwXCJcbn0sIHtcbiAgICAvLyBUT0RPOiBhZGQgc2ltaWxhciBjb21tYW5kIHRvIHdvcmsgaW5zaWRlIFNlYXJjaEJveFxuICAgIGJpbmRLZXk6IHttYWM6IFwiQ29tbWFuZC1BbHQtRW50ZXJcIiwgd2luOiBcIkN0cmwtQWx0LUVudGVyXCJ9LFxuICAgIG5hbWU6IFwicmVwbGFjZUFsbFwiXG59LCB7XG4gICAgLy8gVE9ETzogYWRkIHNpbWlsYXIgY29tbWFuZCB0byB3b3JrIGluc2lkZSBTZWFyY2hCb3hcbiAgICBiaW5kS2V5OiB7bWFjOiBcIkNvbW1hbmQtU2hpZnQtMVwiLCB3aW46IFwiQ3RybC1TaGlmdC0xXCJ9LFxuICAgIG5hbWU6IFwicmVwbGFjZU9uZVwiXG59LCB7XG4gICAgYmluZEtleToge21hYzogXCJPcHRpb24tQ1wiLCB3aW46IFwiQWx0LUNcIn0sXG4gICAgbmFtZTogXCJ0b2dnbGVGaW5kQ2FzZVNlbnNpdGl2ZVwiXG59LCB7XG4gICAgYmluZEtleToge21hYzogXCJPcHRpb24tTFwiLCB3aW46IFwiQWx0LUxcIn0sXG4gICAgbmFtZTogXCJ0b2dnbGVGaW5kSW5TZWxlY3Rpb25cIlxufSwge1xuICAgIGJpbmRLZXk6IHttYWM6IFwiT3B0aW9uLVJcIiwgd2luOiBcIkFsdC1SXCJ9LFxuICAgIG5hbWU6IFwidG9nZ2xlRmluZFJlZ2V4XCJcbn0sIHtcbiAgICBiaW5kS2V5OiB7bWFjOiBcIk9wdGlvbi1XXCIsIHdpbjogXCJBbHQtV1wifSxcbiAgICBuYW1lOiBcInRvZ2dsZUZpbmRXaG9sZVdvcmRcIlxufSwge1xuICAgIGJpbmRLZXk6IHttYWM6IFwiQ29tbWFuZC1MXCIsIHdpbjogXCJDdHJsLUxcIn0sXG4gICAgbmFtZTogXCJleHBhbmR0b2xpbmVcIlxufSwge1xuICAgIGJpbmRLZXk6IHttYWM6IFwiU2hpZnQtRXNjXCIsIHdpbjogXCJTaGlmdC1Fc2NcIn0sXG4gICAgbmFtZTogXCJyZW1vdmVTZWNvbmRhcnlDdXJzb3JzXCJcbn0gXG4vLyBub3QgaW1wbGVtZW50ZWRcbi8qe1xuICAgIGJpbmRLZXk6IHttYWM6IFwiT3B0aW9uLVNoaWZ0LUNvbW1hbmQtUmlnaHRcIiwgd2luOiBcIlNoaWZ0LUFsdC1SaWdodFwifSxcbiAgICBuYW1lOiBcInNtYXJ0U2VsZWN0LmV4cGFuZFwiXG59LCB7XG4gICAgYmluZEtleToge21hYzogXCJDdHJsLVNoaWZ0LUNvbW1hbmQtTGVmdFwiLCB3aW46IFwiU2hpZnQtQWx0LUxlZnRcIn0sXG4gICAgbmFtZTogXCJzbWFydFNlbGVjdC5zaHJpbmtcIlxufSwge1xuICAgIGJpbmRLZXk6IHttYWM6IFwiU2hpZnQtT3B0aW9uLUZcIiwgd2luOiBcIlNoaWZ0LUFsdC1GXCJ9LFxuICAgIG5hbWU6IFwiYmVhdXRpZnlcIlxufSwge1xuICAgIGJpbmRLZXk6IHttYWM6IFwiQ29tbWFuZC1LIENvbW1hbmQtRlwiLCB3aW46IFwiQ3RybC1LIEN0cmwtRlwifSxcbiAgICBuYW1lOiBcImZvcm1hdFNlbGVjdGlvblwiXG59LCB7XG4gICAgYmluZEtleToge21hYzogXCJDb21tYW5kLUsgQ29tbWFuZC1DXCIsIHdpbjogXCJDdHJsLUsgQ3RybC1DXCJ9LFxuICAgIG5hbWU6IFwiYWRkQ29tbWVudExpbmVcIlxufSwge1xuICAgIGJpbmRLZXk6IHttYWM6IFwiQ29tbWFuZC1LIENvbW1hbmQtVVwiLCB3aW46IFwiQ3RybC1LIEN0cmwtVVwifSxcbiAgICBuYW1lOiBcInJlbW92ZUNvbW1lbnRMaW5lXCJcbn0sIHtcbiAgICBiaW5kS2V5OiB7bWFjOiBcIkNvbW1hbmQtSyBDb21tYW5kLS9cIiwgd2luOiBcIkN0cmwtSyBDdHJsLS9cIn0sXG4gICAgbmFtZTogXCJmb2xkQWxsQmxvY2tDb21tZW50c1wiXG59LCB7XG4gICAgYmluZEtleToge21hYzogXCJDb21tYW5kLUsgQ29tbWFuZC0yXCIsIHdpbjogXCJDdHJsLUsgQ3RybC0yXCJ9LFxuICAgIG5hbWU6IFwiZm9sZExldmVsMlwiXG59LCB7XG4gICAgYmluZEtleToge21hYzogXCJDb21tYW5kLUsgQ29tbWFuZC0zXCIsIHdpbjogXCJDdHJsLUsgQ3RybC0zXCJ9LFxuICAgIG5hbWU6IFwiZm9sZExldmVsM1wiXG59LCB7XG4gICAgYmluZEtleToge21hYzogXCJDb21tYW5kLUsgQ29tbWFuZC00XCIsIHdpbjogXCJDdHJsLUsgQ3RybC00XCJ9LFxuICAgIG5hbWU6IFwiZm9sZExldmVsNFwiXG59LCB7XG4gICAgYmluZEtleToge21hYzogXCJDb21tYW5kLUsgQ29tbWFuZC01XCIsIHdpbjogXCJDdHJsLUsgQ3RybC01XCJ9LFxuICAgIG5hbWU6IFwiZm9sZExldmVsNVwiXG59LCB7XG4gICAgYmluZEtleToge21hYzogXCJDb21tYW5kLUsgQ29tbWFuZC02XCIsIHdpbjogXCJDdHJsLUsgQ3RybC02XCJ9LFxuICAgIG5hbWU6IFwiZm9sZExldmVsNlwiXG59LCB7XG4gICAgYmluZEtleToge21hYzogXCJDb21tYW5kLUsgQ29tbWFuZC03XCIsIHdpbjogXCJDdHJsLUsgQ3RybC03XCJ9LFxuICAgIG5hbWU6IFwiZm9sZExldmVsN1wiXG59LCB7XG4gICAgYmluZEtleToge21hYzogXCJDb21tYW5kLUsgQ29tbWFuZC1bXCIsIHdpbjogXCJDdHJsLUsgQ3RybC1bXCJ9LFxuICAgIG5hbWU6IFwiZm9sZFJlY3Vyc2l2ZWx5XCJcbn0sIHtcbiAgICBiaW5kS2V5OiB7bWFjOiBcIkNvbW1hbmQtSyBDb21tYW5kLThcIiwgd2luOiBcIkN0cmwtSyBDdHJsLThcIn0sXG4gICAgbmFtZTogXCJmb2xkQWxsTWFya2VyUmVnaW9uc1wiXG59LCB7XG4gICAgYmluZEtleToge21hYzogXCJDb21tYW5kLUsgQ29tbWFuZC05XCIsIHdpbjogXCJDdHJsLUsgQ3RybC05XCJ9LFxuICAgIG5hbWU6IFwidW5mb2xkQWxsTWFya2VyUmVnaW9uc1wiXG59LCB7XG4gICAgYmluZEtleToge21hYzogXCJDb21tYW5kLUsgQ29tbWFuZC1dXCIsIHdpbjogXCJDdHJsLUsgQ3RybC1dXCJ9LFxuICAgIG5hbWU6IFwidW5mb2xkUmVjdXJzaXZlbHlcIlxufSwge1xuICAgIGJpbmRLZXk6IHttYWM6IFwiQ29tbWFuZC1LIENvbW1hbmQtVFwiLCB3aW46IFwiQ3RybC1LIEN0cmwtVFwifSxcbiAgICBuYW1lOiBcInNlbGVjdFRoZW1lXCJcbn0sIHtcbiAgICBiaW5kS2V5OiB7bWFjOiBcIkNvbW1hbmQtSyBDb21tYW5kLU1cIiwgd2luOiBcIkN0cmwtSyBDdHJsLU1cIn0sXG4gICAgbmFtZTogXCJzZWxlY3RLZXltYXBcIlxufSwge1xuICAgIGJpbmRLZXk6IHttYWM6IFwiQ29tbWFuZC1VXCIsIHdpbjogXCJDdHJsLVVcIn0sXG4gICAgbmFtZTogXCJjdXJzb3JVbmRvXCJcbn0qL1xuXS5mb3JFYWNoKGZ1bmN0aW9uKGJpbmRpbmcpIHtcbiAgICB2YXIgY29tbWFuZCA9IGV4cG9ydHMuaGFuZGxlci5jb21tYW5kc1tiaW5kaW5nLm5hbWVdO1xuICAgIGlmIChjb21tYW5kKVxuICAgICAgICBjb21tYW5kLmJpbmRLZXkgPSBiaW5kaW5nLmJpbmRLZXk7XG4gICAgZXhwb3J0cy5oYW5kbGVyLmJpbmRLZXkoYmluZGluZy5iaW5kS2V5LCBjb21tYW5kIHx8IGJpbmRpbmcubmFtZSk7XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==