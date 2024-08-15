"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[8390],{

/***/ 48390:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var HashHandler = (__webpack_require__(93050).HashHandler);

function moveBySubWords(editor, direction, extend) {
    var selection = editor.selection;
    var row = selection.lead.row;
    var column = selection.lead.column;

    var line = editor.session.getLine(row);
    if (!line[column + direction]) {
        var method = (extend ? "selectWord" : "moveCursorShortWord")
            + (direction == 1 ? "Right" : "Left");
        return editor.selection[method]();
    }
    if (direction == -1) column--;
    while (line[column]) {
        var type = getType(line[column]) + getType(line[column + direction]);
        column += direction;
        if (direction == 1) {
            if (type == "WW" && getType(line[column + 1]) == "w")
                break;
        }
        else {
            if (type == "wW") {
                if (getType(line[column - 1]) == "W") {
                    column -= 1;
                    break;
                } else {
                    continue;
                }
            }
            if (type == "Ww")
                break;
        }
        if (/w[s_oW]|_[sWo]|o[s_wW]|s[W]|W[so]/.test(type))
            break;
    }
    if (direction == -1) column++;
    if (extend)
        editor.selection.moveCursorTo(row, column);
    else
        editor.selection.moveTo(row, column);
    
    function getType(x) {
        if (!x) return "-";
        if (/\s/.test(x)) return "s";
        if (x == "_") return "_";
        if (x.toUpperCase() == x && x.toLowerCase() != x) return "W";
        if (x.toUpperCase() != x && x.toLowerCase() == x) return "w";
        return "o";
    }
}

exports.handler = new HashHandler();
 
exports.handler.addCommands([{
    name: "find_all_under",
    exec: function(editor) {
        if (editor.selection.isEmpty())
            editor.selection.selectWord();
        editor.findAll();
    },
    readOnly: true
}, {
    name: "find_under",
    exec: function(editor) {
        if (editor.selection.isEmpty())
            editor.selection.selectWord();
        editor.findNext();
    },
    readOnly: true
}, {
    name: "find_under_prev",
    exec: function(editor) {
        if (editor.selection.isEmpty())
            editor.selection.selectWord();
        editor.findPrevious();
    },
    readOnly: true
}, {
    name: "find_under_expand",
    exec: function(editor) {
        editor.selectMore(1, false, true);
    },
    scrollIntoView: "animate",
    readOnly: true
}, {
    name: "find_under_expand_skip",
    exec: function(editor) {
        editor.selectMore(1, true, true);
    },
    scrollIntoView: "animate",
    readOnly: true
}, {
    name: "delete_to_hard_bol",
    exec: function(editor) {
        var pos = editor.selection.getCursor();
        editor.session.remove({
            start: { row: pos.row, column: 0 },
            end: pos
        });
    },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor"
}, {
    name: "delete_to_hard_eol",
    exec: function(editor) {
        var pos = editor.selection.getCursor();
        editor.session.remove({
            start: pos,
            end: { row: pos.row, column: Infinity }
        });
    },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor"
}, {
    name: "moveToWordStartLeft",
    exec: function(editor) {
        editor.selection.moveCursorLongWordLeft();
        editor.clearSelection();
    },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor"
}, {
    name: "moveToWordEndRight",
    exec: function(editor) {
        editor.selection.moveCursorLongWordRight();
        editor.clearSelection();
    },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor"
}, {
    name: "selectToWordStartLeft",
    exec: function(editor) {
        var sel = editor.selection;
        sel.$moveSelection(sel.moveCursorLongWordLeft);
    },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor"
}, {
    name: "selectToWordEndRight",
    exec: function(editor) {
        var sel = editor.selection;
        sel.$moveSelection(sel.moveCursorLongWordRight);
    },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor"
}, {
    name: "selectSubWordRight",
    exec: function(editor) {
        moveBySubWords(editor, 1, true);
    },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor",
    readOnly: true
}, {
    name: "selectSubWordLeft",
    exec: function(editor) {
        moveBySubWords(editor, -1, true);
    },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor",
    readOnly: true
}, {
    name: "moveSubWordRight",
    exec: function(editor) {
        moveBySubWords(editor, 1);
    },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor",
    readOnly: true
}, {
    name: "moveSubWordLeft",
    exec: function(editor) {
        moveBySubWords(editor, -1);
    },
    multiSelectAction: "forEach",
    scrollIntoView: "cursor",
    readOnly: true
}]);


[{
    bindKey: { mac: "cmd-k cmd-backspace|cmd-backspace", win: "ctrl-shift-backspace|ctrl-k ctrl-backspace" },
    name: "removetolinestarthard"
}, {
    bindKey: { mac: "cmd-k cmd-k|cmd-delete|ctrl-k", win: "ctrl-shift-delete|ctrl-k ctrl-k" },
    name: "removetolineendhard"
}, {
    bindKey: { mac: "cmd-shift-d", win: "ctrl-shift-d" },
    name: "duplicateSelection"
}, {
    bindKey: { mac: "cmd-l", win: "ctrl-l" },
    name: "expandtoline"
}, 
{
    bindKey: {mac: "cmd-shift-a", win: "ctrl-shift-a"},
    name: "expandSelection",
    args: {to: "tag"}
}, {
    bindKey: {mac: "cmd-shift-j", win: "ctrl-shift-j"},
    name: "expandSelection",
    args: {to: "indentation"}
}, {
    bindKey: {mac: "ctrl-shift-m", win: "ctrl-shift-m"},
    name: "expandSelection",
    args: {to: "brackets"}
}, {
    bindKey: {mac: "cmd-shift-space", win: "ctrl-shift-space"},
    name: "expandSelection",
    args: {to: "scope"}
},
{
    bindKey: { mac: "ctrl-cmd-g", win: "alt-f3" },
    name: "find_all_under"
}, {
    bindKey: { mac: "alt-cmd-g", win: "ctrl-f3" },
    name: "find_under"
}, {
    bindKey: { mac: "shift-alt-cmd-g", win: "ctrl-shift-f3" },
    name: "find_under_prev"
}, {
    bindKey: { mac: "cmd-g", win: "f3" },
    name: "findnext"
}, {
    bindKey: { mac: "shift-cmd-g", win: "shift-f3" },
    name: "findprevious"
}, {
    bindKey: { mac: "cmd-d", win: "ctrl-d" },
    name: "find_under_expand"
}, {
    bindKey: { mac: "cmd-k cmd-d", win: "ctrl-k ctrl-d" },
    name: "find_under_expand_skip"
}, 

/* fold */
{
    bindKey: { mac: "cmd-alt-[", win: "ctrl-shift-[" },
    name: "toggleFoldWidget"
}, {
    bindKey: { mac: "cmd-alt-]", win: "ctrl-shift-]" },
    name: "unfold"
}, {
    bindKey: { mac: "cmd-k cmd-0|cmd-k cmd-j", win: "ctrl-k ctrl-0|ctrl-k ctrl-j" },
    name: "unfoldall"
}, {
    bindKey: { mac: "cmd-k cmd-1", win: "ctrl-k ctrl-1" },
    name: "foldOther",
    args: { level: 1 }
},
 

/* move */
{
    bindKey: { win: "ctrl-left", mac: "alt-left" },
    name: "moveToWordStartLeft"
}, {
    bindKey: { win: "ctrl-right", mac: "alt-right" },
    name: "moveToWordEndRight"
}, {
    bindKey: { win: "ctrl-shift-left", mac: "alt-shift-left" },
    name: "selectToWordStartLeft"
}, {
    bindKey: { win: "ctrl-shift-right", mac: "alt-shift-right" },
    name: "selectToWordEndRight"
}, 

// subwords
{
    bindKey: {mac: "ctrl-alt-shift-right|ctrl-shift-right", win: "alt-shift-right"},
    name: "selectSubWordRight"
}, {
    bindKey: {mac: "ctrl-alt-shift-left|ctrl-shift-left", win: "alt-shift-left"},
    name: "selectSubWordLeft"
}, {
    bindKey: {mac: "ctrl-alt-right|ctrl-right", win: "alt-right"},
    name: "moveSubWordRight"
}, {
    bindKey: {mac: "ctrl-alt-left|ctrl-left", win: "alt-left"},
    name: "moveSubWordLeft"
}, 
{
    bindKey: { mac: "ctrl-m", win: "ctrl-m" },
    name: "jumptomatching",
    args: { to: "brackets" }
}, 
{
    bindKey: { mac: "ctrl-f6", win: "ctrl-f6" },
    name: "goToNextError"
}, {
    bindKey: { mac: "ctrl-shift-f6", win: "ctrl-shift-f6" },
    name: "goToPreviousError"
},

{
    bindKey: { mac: "ctrl-o" },
    name: "splitline"
}, 
{
    bindKey: {mac: "ctrl-shift-w", win: "alt-shift-w"},
    name: "surrowndWithTag"
},{
    bindKey: {mac: "cmd-alt-.", win: "alt-."},
    name: "close_tag"
}, 
{
    bindKey: { mac: "cmd-j", win: "ctrl-j" },
    name: "joinlines"
}, 

{
    bindKey: {mac: "ctrl--", win: "alt--"},
    name: "jumpBack"
}, {
    bindKey: {mac: "ctrl-shift--", win: "alt-shift--"},
    name: "jumpForward"
}, 

{
    bindKey: { mac: "cmd-k cmd-l", win: "ctrl-k ctrl-l" },
    name: "tolowercase"
}, {
    bindKey: { mac: "cmd-k cmd-u", win: "ctrl-k ctrl-u" },
    name: "touppercase"
}, 

{
    bindKey: {mac: "cmd-shift-v", win: "ctrl-shift-v"},
    name: "paste_and_indent"
}, {
    bindKey: {mac: "cmd-k cmd-v|cmd-alt-v", win: "ctrl-k ctrl-v"},
    name: "paste_from_history"
}, 

{
    bindKey: { mac: "cmd-shift-enter", win: "ctrl-shift-enter" },
    name: "addLineBefore"
}, {
    bindKey: { mac: "cmd-enter", win: "ctrl-enter" },
    name: "addLineAfter"
}, {
    bindKey: { mac: "ctrl-shift-k", win: "ctrl-shift-k" },
    name: "removeline"
}, {
    bindKey: { mac: "ctrl-alt-up", win: "ctrl-up" },
    name: "scrollup"
}, {
    bindKey: { mac: "ctrl-alt-down", win: "ctrl-down" },
    name: "scrolldown"
}, {
    bindKey: { mac: "cmd-a", win: "ctrl-a" },
    name: "selectall"
}, {
    bindKey: { linux: "alt-shift-down", mac: "ctrl-shift-down", win: "ctrl-alt-down" },
    name: "addCursorBelow"
}, {
    bindKey: { linux: "alt-shift-up", mac: "ctrl-shift-up", win: "ctrl-alt-up" },
    name: "addCursorAbove"
},


{
    bindKey: { mac: "cmd-k cmd-c|ctrl-l", win: "ctrl-k ctrl-c" },
    name: "centerselection"
}, 

{
    bindKey: { mac: "f5", win: "f9" },
    name: "sortlines"
}, 
{
    bindKey: {mac: "ctrl-f5", win: "ctrl-f9"},
    name: "sortlines",
    args: {caseSensitive: true}
},
{
    bindKey: { mac: "cmd-shift-l", win: "ctrl-shift-l" },
    name: "splitSelectionIntoLines"
}, {
    bindKey: { mac: "ctrl-cmd-down", win: "ctrl-shift-down" },
    name: "movelinesdown"
}, {
    bindKey: { mac: "ctrl-cmd-up", win: "ctrl-shift-up" },
    name: "movelinesup"
}, {
    bindKey: { mac: "alt-down", win: "alt-down" },
    name: "modifyNumberDown"
}, {
    bindKey: { mac: "alt-up", win: "alt-up" },
    name: "modifyNumberUp"
}, {
    bindKey: { mac: "cmd-/", win: "ctrl-/" },
    name: "togglecomment"
}, {
    bindKey: { mac: "cmd-alt-/", win: "ctrl-shift-/" },
    name: "toggleBlockComment"
},


{
    bindKey: { linux: "ctrl-alt-q", mac: "ctrl-q", win: "ctrl-q" },
    name: "togglerecording"
}, {
    bindKey: { linux: "ctrl-alt-shift-q", mac: "ctrl-shift-q", win: "ctrl-shift-q" },
    name: "replaymacro"
}, 

{
    bindKey: { mac: "ctrl-t", win: "ctrl-t" },
    name: "transpose"
}

].forEach(function(binding) {
    var command = exports.handler.commands[binding.name];
    if (command)
        command.bindKey = binding.bindKey;
    exports.handler.bindKey(binding.bindKey, command || binding.name);
});


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjgzOTAuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsa0JBQWtCLHdDQUErQzs7QUFFakU7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIseUJBQXlCO0FBQzlDO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkIsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLENBQUM7OztBQUdEO0FBQ0EsZUFBZSw2RkFBNkY7QUFDNUc7QUFDQSxDQUFDO0FBQ0QsZUFBZSw4RUFBOEU7QUFDN0Y7QUFDQSxDQUFDO0FBQ0QsZUFBZSx5Q0FBeUM7QUFDeEQ7QUFDQSxDQUFDO0FBQ0QsZUFBZSw2QkFBNkI7QUFDNUM7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxjQUFjLHdDQUF3QztBQUN0RDtBQUNBLFdBQVc7QUFDWCxDQUFDO0FBQ0QsY0FBYyx3Q0FBd0M7QUFDdEQ7QUFDQSxXQUFXO0FBQ1gsQ0FBQztBQUNELGNBQWMseUNBQXlDO0FBQ3ZEO0FBQ0EsV0FBVztBQUNYLENBQUM7QUFDRCxjQUFjLGdEQUFnRDtBQUM5RDtBQUNBLFdBQVc7QUFDWCxDQUFDO0FBQ0Q7QUFDQSxlQUFlLGtDQUFrQztBQUNqRDtBQUNBLENBQUM7QUFDRCxlQUFlLGtDQUFrQztBQUNqRDtBQUNBLENBQUM7QUFDRCxlQUFlLDhDQUE4QztBQUM3RDtBQUNBLENBQUM7QUFDRCxlQUFlLHlCQUF5QjtBQUN4QztBQUNBLENBQUM7QUFDRCxlQUFlLHFDQUFxQztBQUNwRDtBQUNBLENBQUM7QUFDRCxlQUFlLDZCQUE2QjtBQUM1QztBQUNBLENBQUM7QUFDRCxlQUFlLDBDQUEwQztBQUN6RDtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBLGVBQWUsdUNBQXVDO0FBQ3REO0FBQ0EsQ0FBQztBQUNELGVBQWUsdUNBQXVDO0FBQ3REO0FBQ0EsQ0FBQztBQUNELGVBQWUsb0VBQW9FO0FBQ25GO0FBQ0EsQ0FBQztBQUNELGVBQWUsMENBQTBDO0FBQ3pEO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxtQ0FBbUM7QUFDbEQ7QUFDQSxDQUFDO0FBQ0QsZUFBZSxxQ0FBcUM7QUFDcEQ7QUFDQSxDQUFDO0FBQ0QsZUFBZSwrQ0FBK0M7QUFDOUQ7QUFDQSxDQUFDO0FBQ0QsZUFBZSxpREFBaUQ7QUFDaEU7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQSxjQUFjLHFFQUFxRTtBQUNuRjtBQUNBLENBQUM7QUFDRCxjQUFjLGtFQUFrRTtBQUNoRjtBQUNBLENBQUM7QUFDRCxjQUFjLG1EQUFtRDtBQUNqRTtBQUNBLENBQUM7QUFDRCxjQUFjLGdEQUFnRDtBQUM5RDtBQUNBLENBQUM7QUFDRDtBQUNBLGVBQWUsOEJBQThCO0FBQzdDO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBLGVBQWUsZ0NBQWdDO0FBQy9DO0FBQ0EsQ0FBQztBQUNELGVBQWUsNENBQTRDO0FBQzNEO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBLGVBQWUsZUFBZTtBQUM5QjtBQUNBLENBQUM7QUFDRDtBQUNBLGNBQWMsd0NBQXdDO0FBQ3REO0FBQ0EsQ0FBQztBQUNELGNBQWMsK0JBQStCO0FBQzdDO0FBQ0EsQ0FBQztBQUNEO0FBQ0EsZUFBZSw2QkFBNkI7QUFDNUM7QUFDQSxDQUFDOztBQUVEO0FBQ0EsY0FBYyw0QkFBNEI7QUFDMUM7QUFDQSxDQUFDO0FBQ0QsY0FBYyx3Q0FBd0M7QUFDdEQ7QUFDQSxDQUFDOztBQUVEO0FBQ0EsZUFBZSwwQ0FBMEM7QUFDekQ7QUFDQSxDQUFDO0FBQ0QsZUFBZSwwQ0FBMEM7QUFDekQ7QUFDQSxDQUFDOztBQUVEO0FBQ0EsY0FBYyx3Q0FBd0M7QUFDdEQ7QUFDQSxDQUFDO0FBQ0QsY0FBYyxtREFBbUQ7QUFDakU7QUFDQSxDQUFDOztBQUVEO0FBQ0EsZUFBZSxpREFBaUQ7QUFDaEU7QUFDQSxDQUFDO0FBQ0QsZUFBZSxxQ0FBcUM7QUFDcEQ7QUFDQSxDQUFDO0FBQ0QsZUFBZSwwQ0FBMEM7QUFDekQ7QUFDQSxDQUFDO0FBQ0QsZUFBZSxvQ0FBb0M7QUFDbkQ7QUFDQSxDQUFDO0FBQ0QsZUFBZSx3Q0FBd0M7QUFDdkQ7QUFDQSxDQUFDO0FBQ0QsZUFBZSw2QkFBNkI7QUFDNUM7QUFDQSxDQUFDO0FBQ0QsZUFBZSx1RUFBdUU7QUFDdEY7QUFDQSxDQUFDO0FBQ0QsZUFBZSxpRUFBaUU7QUFDaEY7QUFDQSxDQUFDOzs7QUFHRDtBQUNBLGVBQWUsaURBQWlEO0FBQ2hFO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBLGVBQWUsc0JBQXNCO0FBQ3JDO0FBQ0EsQ0FBQztBQUNEO0FBQ0EsY0FBYywrQkFBK0I7QUFDN0M7QUFDQSxXQUFXO0FBQ1gsQ0FBQztBQUNEO0FBQ0EsZUFBZSx5Q0FBeUM7QUFDeEQ7QUFDQSxDQUFDO0FBQ0QsZUFBZSw4Q0FBOEM7QUFDN0Q7QUFDQSxDQUFDO0FBQ0QsZUFBZSwwQ0FBMEM7QUFDekQ7QUFDQSxDQUFDO0FBQ0QsZUFBZSxrQ0FBa0M7QUFDakQ7QUFDQSxDQUFDO0FBQ0QsZUFBZSw4QkFBOEI7QUFDN0M7QUFDQSxDQUFDO0FBQ0QsZUFBZSw2QkFBNkI7QUFDNUM7QUFDQSxDQUFDO0FBQ0QsZUFBZSx1Q0FBdUM7QUFDdEQ7QUFDQSxDQUFDOzs7QUFHRDtBQUNBLGVBQWUsbURBQW1EO0FBQ2xFO0FBQ0EsQ0FBQztBQUNELGVBQWUscUVBQXFFO0FBQ3BGO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBLGVBQWUsOEJBQThCO0FBQzdDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9rZXlib2FyZC9zdWJsaW1lLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG52YXIgSGFzaEhhbmRsZXIgPSByZXF1aXJlKFwiLi4va2V5Ym9hcmQvaGFzaF9oYW5kbGVyXCIpLkhhc2hIYW5kbGVyO1xuXG5mdW5jdGlvbiBtb3ZlQnlTdWJXb3JkcyhlZGl0b3IsIGRpcmVjdGlvbiwgZXh0ZW5kKSB7XG4gICAgdmFyIHNlbGVjdGlvbiA9IGVkaXRvci5zZWxlY3Rpb247XG4gICAgdmFyIHJvdyA9IHNlbGVjdGlvbi5sZWFkLnJvdztcbiAgICB2YXIgY29sdW1uID0gc2VsZWN0aW9uLmxlYWQuY29sdW1uO1xuXG4gICAgdmFyIGxpbmUgPSBlZGl0b3Iuc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgaWYgKCFsaW5lW2NvbHVtbiArIGRpcmVjdGlvbl0pIHtcbiAgICAgICAgdmFyIG1ldGhvZCA9IChleHRlbmQgPyBcInNlbGVjdFdvcmRcIiA6IFwibW92ZUN1cnNvclNob3J0V29yZFwiKVxuICAgICAgICAgICAgKyAoZGlyZWN0aW9uID09IDEgPyBcIlJpZ2h0XCIgOiBcIkxlZnRcIik7XG4gICAgICAgIHJldHVybiBlZGl0b3Iuc2VsZWN0aW9uW21ldGhvZF0oKTtcbiAgICB9XG4gICAgaWYgKGRpcmVjdGlvbiA9PSAtMSkgY29sdW1uLS07XG4gICAgd2hpbGUgKGxpbmVbY29sdW1uXSkge1xuICAgICAgICB2YXIgdHlwZSA9IGdldFR5cGUobGluZVtjb2x1bW5dKSArIGdldFR5cGUobGluZVtjb2x1bW4gKyBkaXJlY3Rpb25dKTtcbiAgICAgICAgY29sdW1uICs9IGRpcmVjdGlvbjtcbiAgICAgICAgaWYgKGRpcmVjdGlvbiA9PSAxKSB7XG4gICAgICAgICAgICBpZiAodHlwZSA9PSBcIldXXCIgJiYgZ2V0VHlwZShsaW5lW2NvbHVtbiArIDFdKSA9PSBcIndcIilcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0eXBlID09IFwid1dcIikge1xuICAgICAgICAgICAgICAgIGlmIChnZXRUeXBlKGxpbmVbY29sdW1uIC0gMV0pID09IFwiV1wiKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbiAtPSAxO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZSA9PSBcIld3XCIpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKC93W3Nfb1ddfF9bc1dvXXxvW3Nfd1ddfHNbV118V1tzb10vLnRlc3QodHlwZSkpXG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG4gICAgaWYgKGRpcmVjdGlvbiA9PSAtMSkgY29sdW1uKys7XG4gICAgaWYgKGV4dGVuZClcbiAgICAgICAgZWRpdG9yLnNlbGVjdGlvbi5tb3ZlQ3Vyc29yVG8ocm93LCBjb2x1bW4pO1xuICAgIGVsc2VcbiAgICAgICAgZWRpdG9yLnNlbGVjdGlvbi5tb3ZlVG8ocm93LCBjb2x1bW4pO1xuICAgIFxuICAgIGZ1bmN0aW9uIGdldFR5cGUoeCkge1xuICAgICAgICBpZiAoIXgpIHJldHVybiBcIi1cIjtcbiAgICAgICAgaWYgKC9cXHMvLnRlc3QoeCkpIHJldHVybiBcInNcIjtcbiAgICAgICAgaWYgKHggPT0gXCJfXCIpIHJldHVybiBcIl9cIjtcbiAgICAgICAgaWYgKHgudG9VcHBlckNhc2UoKSA9PSB4ICYmIHgudG9Mb3dlckNhc2UoKSAhPSB4KSByZXR1cm4gXCJXXCI7XG4gICAgICAgIGlmICh4LnRvVXBwZXJDYXNlKCkgIT0geCAmJiB4LnRvTG93ZXJDYXNlKCkgPT0geCkgcmV0dXJuIFwid1wiO1xuICAgICAgICByZXR1cm4gXCJvXCI7XG4gICAgfVxufVxuXG5leHBvcnRzLmhhbmRsZXIgPSBuZXcgSGFzaEhhbmRsZXIoKTtcbiBcbmV4cG9ydHMuaGFuZGxlci5hZGRDb21tYW5kcyhbe1xuICAgIG5hbWU6IFwiZmluZF9hbGxfdW5kZXJcIixcbiAgICBleGVjOiBmdW5jdGlvbihlZGl0b3IpIHtcbiAgICAgICAgaWYgKGVkaXRvci5zZWxlY3Rpb24uaXNFbXB0eSgpKVxuICAgICAgICAgICAgZWRpdG9yLnNlbGVjdGlvbi5zZWxlY3RXb3JkKCk7XG4gICAgICAgIGVkaXRvci5maW5kQWxsKCk7XG4gICAgfSxcbiAgICByZWFkT25seTogdHJ1ZVxufSwge1xuICAgIG5hbWU6IFwiZmluZF91bmRlclwiLFxuICAgIGV4ZWM6IGZ1bmN0aW9uKGVkaXRvcikge1xuICAgICAgICBpZiAoZWRpdG9yLnNlbGVjdGlvbi5pc0VtcHR5KCkpXG4gICAgICAgICAgICBlZGl0b3Iuc2VsZWN0aW9uLnNlbGVjdFdvcmQoKTtcbiAgICAgICAgZWRpdG9yLmZpbmROZXh0KCk7XG4gICAgfSxcbiAgICByZWFkT25seTogdHJ1ZVxufSwge1xuICAgIG5hbWU6IFwiZmluZF91bmRlcl9wcmV2XCIsXG4gICAgZXhlYzogZnVuY3Rpb24oZWRpdG9yKSB7XG4gICAgICAgIGlmIChlZGl0b3Iuc2VsZWN0aW9uLmlzRW1wdHkoKSlcbiAgICAgICAgICAgIGVkaXRvci5zZWxlY3Rpb24uc2VsZWN0V29yZCgpO1xuICAgICAgICBlZGl0b3IuZmluZFByZXZpb3VzKCk7XG4gICAgfSxcbiAgICByZWFkT25seTogdHJ1ZVxufSwge1xuICAgIG5hbWU6IFwiZmluZF91bmRlcl9leHBhbmRcIixcbiAgICBleGVjOiBmdW5jdGlvbihlZGl0b3IpIHtcbiAgICAgICAgZWRpdG9yLnNlbGVjdE1vcmUoMSwgZmFsc2UsIHRydWUpO1xuICAgIH0sXG4gICAgc2Nyb2xsSW50b1ZpZXc6IFwiYW5pbWF0ZVwiLFxuICAgIHJlYWRPbmx5OiB0cnVlXG59LCB7XG4gICAgbmFtZTogXCJmaW5kX3VuZGVyX2V4cGFuZF9za2lwXCIsXG4gICAgZXhlYzogZnVuY3Rpb24oZWRpdG9yKSB7XG4gICAgICAgIGVkaXRvci5zZWxlY3RNb3JlKDEsIHRydWUsIHRydWUpO1xuICAgIH0sXG4gICAgc2Nyb2xsSW50b1ZpZXc6IFwiYW5pbWF0ZVwiLFxuICAgIHJlYWRPbmx5OiB0cnVlXG59LCB7XG4gICAgbmFtZTogXCJkZWxldGVfdG9faGFyZF9ib2xcIixcbiAgICBleGVjOiBmdW5jdGlvbihlZGl0b3IpIHtcbiAgICAgICAgdmFyIHBvcyA9IGVkaXRvci5zZWxlY3Rpb24uZ2V0Q3Vyc29yKCk7XG4gICAgICAgIGVkaXRvci5zZXNzaW9uLnJlbW92ZSh7XG4gICAgICAgICAgICBzdGFydDogeyByb3c6IHBvcy5yb3csIGNvbHVtbjogMCB9LFxuICAgICAgICAgICAgZW5kOiBwb3NcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBtdWx0aVNlbGVjdEFjdGlvbjogXCJmb3JFYWNoXCIsXG4gICAgc2Nyb2xsSW50b1ZpZXc6IFwiY3Vyc29yXCJcbn0sIHtcbiAgICBuYW1lOiBcImRlbGV0ZV90b19oYXJkX2VvbFwiLFxuICAgIGV4ZWM6IGZ1bmN0aW9uKGVkaXRvcikge1xuICAgICAgICB2YXIgcG9zID0gZWRpdG9yLnNlbGVjdGlvbi5nZXRDdXJzb3IoKTtcbiAgICAgICAgZWRpdG9yLnNlc3Npb24ucmVtb3ZlKHtcbiAgICAgICAgICAgIHN0YXJ0OiBwb3MsXG4gICAgICAgICAgICBlbmQ6IHsgcm93OiBwb3Mucm93LCBjb2x1bW46IEluZmluaXR5IH1cbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBtdWx0aVNlbGVjdEFjdGlvbjogXCJmb3JFYWNoXCIsXG4gICAgc2Nyb2xsSW50b1ZpZXc6IFwiY3Vyc29yXCJcbn0sIHtcbiAgICBuYW1lOiBcIm1vdmVUb1dvcmRTdGFydExlZnRcIixcbiAgICBleGVjOiBmdW5jdGlvbihlZGl0b3IpIHtcbiAgICAgICAgZWRpdG9yLnNlbGVjdGlvbi5tb3ZlQ3Vyc29yTG9uZ1dvcmRMZWZ0KCk7XG4gICAgICAgIGVkaXRvci5jbGVhclNlbGVjdGlvbigpO1xuICAgIH0sXG4gICAgbXVsdGlTZWxlY3RBY3Rpb246IFwiZm9yRWFjaFwiLFxuICAgIHNjcm9sbEludG9WaWV3OiBcImN1cnNvclwiXG59LCB7XG4gICAgbmFtZTogXCJtb3ZlVG9Xb3JkRW5kUmlnaHRcIixcbiAgICBleGVjOiBmdW5jdGlvbihlZGl0b3IpIHtcbiAgICAgICAgZWRpdG9yLnNlbGVjdGlvbi5tb3ZlQ3Vyc29yTG9uZ1dvcmRSaWdodCgpO1xuICAgICAgICBlZGl0b3IuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICB9LFxuICAgIG11bHRpU2VsZWN0QWN0aW9uOiBcImZvckVhY2hcIixcbiAgICBzY3JvbGxJbnRvVmlldzogXCJjdXJzb3JcIlxufSwge1xuICAgIG5hbWU6IFwic2VsZWN0VG9Xb3JkU3RhcnRMZWZ0XCIsXG4gICAgZXhlYzogZnVuY3Rpb24oZWRpdG9yKSB7XG4gICAgICAgIHZhciBzZWwgPSBlZGl0b3Iuc2VsZWN0aW9uO1xuICAgICAgICBzZWwuJG1vdmVTZWxlY3Rpb24oc2VsLm1vdmVDdXJzb3JMb25nV29yZExlZnQpO1xuICAgIH0sXG4gICAgbXVsdGlTZWxlY3RBY3Rpb246IFwiZm9yRWFjaFwiLFxuICAgIHNjcm9sbEludG9WaWV3OiBcImN1cnNvclwiXG59LCB7XG4gICAgbmFtZTogXCJzZWxlY3RUb1dvcmRFbmRSaWdodFwiLFxuICAgIGV4ZWM6IGZ1bmN0aW9uKGVkaXRvcikge1xuICAgICAgICB2YXIgc2VsID0gZWRpdG9yLnNlbGVjdGlvbjtcbiAgICAgICAgc2VsLiRtb3ZlU2VsZWN0aW9uKHNlbC5tb3ZlQ3Vyc29yTG9uZ1dvcmRSaWdodCk7XG4gICAgfSxcbiAgICBtdWx0aVNlbGVjdEFjdGlvbjogXCJmb3JFYWNoXCIsXG4gICAgc2Nyb2xsSW50b1ZpZXc6IFwiY3Vyc29yXCJcbn0sIHtcbiAgICBuYW1lOiBcInNlbGVjdFN1YldvcmRSaWdodFwiLFxuICAgIGV4ZWM6IGZ1bmN0aW9uKGVkaXRvcikge1xuICAgICAgICBtb3ZlQnlTdWJXb3JkcyhlZGl0b3IsIDEsIHRydWUpO1xuICAgIH0sXG4gICAgbXVsdGlTZWxlY3RBY3Rpb246IFwiZm9yRWFjaFwiLFxuICAgIHNjcm9sbEludG9WaWV3OiBcImN1cnNvclwiLFxuICAgIHJlYWRPbmx5OiB0cnVlXG59LCB7XG4gICAgbmFtZTogXCJzZWxlY3RTdWJXb3JkTGVmdFwiLFxuICAgIGV4ZWM6IGZ1bmN0aW9uKGVkaXRvcikge1xuICAgICAgICBtb3ZlQnlTdWJXb3JkcyhlZGl0b3IsIC0xLCB0cnVlKTtcbiAgICB9LFxuICAgIG11bHRpU2VsZWN0QWN0aW9uOiBcImZvckVhY2hcIixcbiAgICBzY3JvbGxJbnRvVmlldzogXCJjdXJzb3JcIixcbiAgICByZWFkT25seTogdHJ1ZVxufSwge1xuICAgIG5hbWU6IFwibW92ZVN1YldvcmRSaWdodFwiLFxuICAgIGV4ZWM6IGZ1bmN0aW9uKGVkaXRvcikge1xuICAgICAgICBtb3ZlQnlTdWJXb3JkcyhlZGl0b3IsIDEpO1xuICAgIH0sXG4gICAgbXVsdGlTZWxlY3RBY3Rpb246IFwiZm9yRWFjaFwiLFxuICAgIHNjcm9sbEludG9WaWV3OiBcImN1cnNvclwiLFxuICAgIHJlYWRPbmx5OiB0cnVlXG59LCB7XG4gICAgbmFtZTogXCJtb3ZlU3ViV29yZExlZnRcIixcbiAgICBleGVjOiBmdW5jdGlvbihlZGl0b3IpIHtcbiAgICAgICAgbW92ZUJ5U3ViV29yZHMoZWRpdG9yLCAtMSk7XG4gICAgfSxcbiAgICBtdWx0aVNlbGVjdEFjdGlvbjogXCJmb3JFYWNoXCIsXG4gICAgc2Nyb2xsSW50b1ZpZXc6IFwiY3Vyc29yXCIsXG4gICAgcmVhZE9ubHk6IHRydWVcbn1dKTtcblxuXG5be1xuICAgIGJpbmRLZXk6IHsgbWFjOiBcImNtZC1rIGNtZC1iYWNrc3BhY2V8Y21kLWJhY2tzcGFjZVwiLCB3aW46IFwiY3RybC1zaGlmdC1iYWNrc3BhY2V8Y3RybC1rIGN0cmwtYmFja3NwYWNlXCIgfSxcbiAgICBuYW1lOiBcInJlbW92ZXRvbGluZXN0YXJ0aGFyZFwiXG59LCB7XG4gICAgYmluZEtleTogeyBtYWM6IFwiY21kLWsgY21kLWt8Y21kLWRlbGV0ZXxjdHJsLWtcIiwgd2luOiBcImN0cmwtc2hpZnQtZGVsZXRlfGN0cmwtayBjdHJsLWtcIiB9LFxuICAgIG5hbWU6IFwicmVtb3ZldG9saW5lZW5kaGFyZFwiXG59LCB7XG4gICAgYmluZEtleTogeyBtYWM6IFwiY21kLXNoaWZ0LWRcIiwgd2luOiBcImN0cmwtc2hpZnQtZFwiIH0sXG4gICAgbmFtZTogXCJkdXBsaWNhdGVTZWxlY3Rpb25cIlxufSwge1xuICAgIGJpbmRLZXk6IHsgbWFjOiBcImNtZC1sXCIsIHdpbjogXCJjdHJsLWxcIiB9LFxuICAgIG5hbWU6IFwiZXhwYW5kdG9saW5lXCJcbn0sIFxue1xuICAgIGJpbmRLZXk6IHttYWM6IFwiY21kLXNoaWZ0LWFcIiwgd2luOiBcImN0cmwtc2hpZnQtYVwifSxcbiAgICBuYW1lOiBcImV4cGFuZFNlbGVjdGlvblwiLFxuICAgIGFyZ3M6IHt0bzogXCJ0YWdcIn1cbn0sIHtcbiAgICBiaW5kS2V5OiB7bWFjOiBcImNtZC1zaGlmdC1qXCIsIHdpbjogXCJjdHJsLXNoaWZ0LWpcIn0sXG4gICAgbmFtZTogXCJleHBhbmRTZWxlY3Rpb25cIixcbiAgICBhcmdzOiB7dG86IFwiaW5kZW50YXRpb25cIn1cbn0sIHtcbiAgICBiaW5kS2V5OiB7bWFjOiBcImN0cmwtc2hpZnQtbVwiLCB3aW46IFwiY3RybC1zaGlmdC1tXCJ9LFxuICAgIG5hbWU6IFwiZXhwYW5kU2VsZWN0aW9uXCIsXG4gICAgYXJnczoge3RvOiBcImJyYWNrZXRzXCJ9XG59LCB7XG4gICAgYmluZEtleToge21hYzogXCJjbWQtc2hpZnQtc3BhY2VcIiwgd2luOiBcImN0cmwtc2hpZnQtc3BhY2VcIn0sXG4gICAgbmFtZTogXCJleHBhbmRTZWxlY3Rpb25cIixcbiAgICBhcmdzOiB7dG86IFwic2NvcGVcIn1cbn0sXG57XG4gICAgYmluZEtleTogeyBtYWM6IFwiY3RybC1jbWQtZ1wiLCB3aW46IFwiYWx0LWYzXCIgfSxcbiAgICBuYW1lOiBcImZpbmRfYWxsX3VuZGVyXCJcbn0sIHtcbiAgICBiaW5kS2V5OiB7IG1hYzogXCJhbHQtY21kLWdcIiwgd2luOiBcImN0cmwtZjNcIiB9LFxuICAgIG5hbWU6IFwiZmluZF91bmRlclwiXG59LCB7XG4gICAgYmluZEtleTogeyBtYWM6IFwic2hpZnQtYWx0LWNtZC1nXCIsIHdpbjogXCJjdHJsLXNoaWZ0LWYzXCIgfSxcbiAgICBuYW1lOiBcImZpbmRfdW5kZXJfcHJldlwiXG59LCB7XG4gICAgYmluZEtleTogeyBtYWM6IFwiY21kLWdcIiwgd2luOiBcImYzXCIgfSxcbiAgICBuYW1lOiBcImZpbmRuZXh0XCJcbn0sIHtcbiAgICBiaW5kS2V5OiB7IG1hYzogXCJzaGlmdC1jbWQtZ1wiLCB3aW46IFwic2hpZnQtZjNcIiB9LFxuICAgIG5hbWU6IFwiZmluZHByZXZpb3VzXCJcbn0sIHtcbiAgICBiaW5kS2V5OiB7IG1hYzogXCJjbWQtZFwiLCB3aW46IFwiY3RybC1kXCIgfSxcbiAgICBuYW1lOiBcImZpbmRfdW5kZXJfZXhwYW5kXCJcbn0sIHtcbiAgICBiaW5kS2V5OiB7IG1hYzogXCJjbWQtayBjbWQtZFwiLCB3aW46IFwiY3RybC1rIGN0cmwtZFwiIH0sXG4gICAgbmFtZTogXCJmaW5kX3VuZGVyX2V4cGFuZF9za2lwXCJcbn0sIFxuXG4vKiBmb2xkICovXG57XG4gICAgYmluZEtleTogeyBtYWM6IFwiY21kLWFsdC1bXCIsIHdpbjogXCJjdHJsLXNoaWZ0LVtcIiB9LFxuICAgIG5hbWU6IFwidG9nZ2xlRm9sZFdpZGdldFwiXG59LCB7XG4gICAgYmluZEtleTogeyBtYWM6IFwiY21kLWFsdC1dXCIsIHdpbjogXCJjdHJsLXNoaWZ0LV1cIiB9LFxuICAgIG5hbWU6IFwidW5mb2xkXCJcbn0sIHtcbiAgICBiaW5kS2V5OiB7IG1hYzogXCJjbWQtayBjbWQtMHxjbWQtayBjbWQtalwiLCB3aW46IFwiY3RybC1rIGN0cmwtMHxjdHJsLWsgY3RybC1qXCIgfSxcbiAgICBuYW1lOiBcInVuZm9sZGFsbFwiXG59LCB7XG4gICAgYmluZEtleTogeyBtYWM6IFwiY21kLWsgY21kLTFcIiwgd2luOiBcImN0cmwtayBjdHJsLTFcIiB9LFxuICAgIG5hbWU6IFwiZm9sZE90aGVyXCIsXG4gICAgYXJnczogeyBsZXZlbDogMSB9XG59LFxuIFxuXG4vKiBtb3ZlICovXG57XG4gICAgYmluZEtleTogeyB3aW46IFwiY3RybC1sZWZ0XCIsIG1hYzogXCJhbHQtbGVmdFwiIH0sXG4gICAgbmFtZTogXCJtb3ZlVG9Xb3JkU3RhcnRMZWZ0XCJcbn0sIHtcbiAgICBiaW5kS2V5OiB7IHdpbjogXCJjdHJsLXJpZ2h0XCIsIG1hYzogXCJhbHQtcmlnaHRcIiB9LFxuICAgIG5hbWU6IFwibW92ZVRvV29yZEVuZFJpZ2h0XCJcbn0sIHtcbiAgICBiaW5kS2V5OiB7IHdpbjogXCJjdHJsLXNoaWZ0LWxlZnRcIiwgbWFjOiBcImFsdC1zaGlmdC1sZWZ0XCIgfSxcbiAgICBuYW1lOiBcInNlbGVjdFRvV29yZFN0YXJ0TGVmdFwiXG59LCB7XG4gICAgYmluZEtleTogeyB3aW46IFwiY3RybC1zaGlmdC1yaWdodFwiLCBtYWM6IFwiYWx0LXNoaWZ0LXJpZ2h0XCIgfSxcbiAgICBuYW1lOiBcInNlbGVjdFRvV29yZEVuZFJpZ2h0XCJcbn0sIFxuXG4vLyBzdWJ3b3Jkc1xue1xuICAgIGJpbmRLZXk6IHttYWM6IFwiY3RybC1hbHQtc2hpZnQtcmlnaHR8Y3RybC1zaGlmdC1yaWdodFwiLCB3aW46IFwiYWx0LXNoaWZ0LXJpZ2h0XCJ9LFxuICAgIG5hbWU6IFwic2VsZWN0U3ViV29yZFJpZ2h0XCJcbn0sIHtcbiAgICBiaW5kS2V5OiB7bWFjOiBcImN0cmwtYWx0LXNoaWZ0LWxlZnR8Y3RybC1zaGlmdC1sZWZ0XCIsIHdpbjogXCJhbHQtc2hpZnQtbGVmdFwifSxcbiAgICBuYW1lOiBcInNlbGVjdFN1YldvcmRMZWZ0XCJcbn0sIHtcbiAgICBiaW5kS2V5OiB7bWFjOiBcImN0cmwtYWx0LXJpZ2h0fGN0cmwtcmlnaHRcIiwgd2luOiBcImFsdC1yaWdodFwifSxcbiAgICBuYW1lOiBcIm1vdmVTdWJXb3JkUmlnaHRcIlxufSwge1xuICAgIGJpbmRLZXk6IHttYWM6IFwiY3RybC1hbHQtbGVmdHxjdHJsLWxlZnRcIiwgd2luOiBcImFsdC1sZWZ0XCJ9LFxuICAgIG5hbWU6IFwibW92ZVN1YldvcmRMZWZ0XCJcbn0sIFxue1xuICAgIGJpbmRLZXk6IHsgbWFjOiBcImN0cmwtbVwiLCB3aW46IFwiY3RybC1tXCIgfSxcbiAgICBuYW1lOiBcImp1bXB0b21hdGNoaW5nXCIsXG4gICAgYXJnczogeyB0bzogXCJicmFja2V0c1wiIH1cbn0sIFxue1xuICAgIGJpbmRLZXk6IHsgbWFjOiBcImN0cmwtZjZcIiwgd2luOiBcImN0cmwtZjZcIiB9LFxuICAgIG5hbWU6IFwiZ29Ub05leHRFcnJvclwiXG59LCB7XG4gICAgYmluZEtleTogeyBtYWM6IFwiY3RybC1zaGlmdC1mNlwiLCB3aW46IFwiY3RybC1zaGlmdC1mNlwiIH0sXG4gICAgbmFtZTogXCJnb1RvUHJldmlvdXNFcnJvclwiXG59LFxuXG57XG4gICAgYmluZEtleTogeyBtYWM6IFwiY3RybC1vXCIgfSxcbiAgICBuYW1lOiBcInNwbGl0bGluZVwiXG59LCBcbntcbiAgICBiaW5kS2V5OiB7bWFjOiBcImN0cmwtc2hpZnQtd1wiLCB3aW46IFwiYWx0LXNoaWZ0LXdcIn0sXG4gICAgbmFtZTogXCJzdXJyb3duZFdpdGhUYWdcIlxufSx7XG4gICAgYmluZEtleToge21hYzogXCJjbWQtYWx0LS5cIiwgd2luOiBcImFsdC0uXCJ9LFxuICAgIG5hbWU6IFwiY2xvc2VfdGFnXCJcbn0sIFxue1xuICAgIGJpbmRLZXk6IHsgbWFjOiBcImNtZC1qXCIsIHdpbjogXCJjdHJsLWpcIiB9LFxuICAgIG5hbWU6IFwiam9pbmxpbmVzXCJcbn0sIFxuXG57XG4gICAgYmluZEtleToge21hYzogXCJjdHJsLS1cIiwgd2luOiBcImFsdC0tXCJ9LFxuICAgIG5hbWU6IFwianVtcEJhY2tcIlxufSwge1xuICAgIGJpbmRLZXk6IHttYWM6IFwiY3RybC1zaGlmdC0tXCIsIHdpbjogXCJhbHQtc2hpZnQtLVwifSxcbiAgICBuYW1lOiBcImp1bXBGb3J3YXJkXCJcbn0sIFxuXG57XG4gICAgYmluZEtleTogeyBtYWM6IFwiY21kLWsgY21kLWxcIiwgd2luOiBcImN0cmwtayBjdHJsLWxcIiB9LFxuICAgIG5hbWU6IFwidG9sb3dlcmNhc2VcIlxufSwge1xuICAgIGJpbmRLZXk6IHsgbWFjOiBcImNtZC1rIGNtZC11XCIsIHdpbjogXCJjdHJsLWsgY3RybC11XCIgfSxcbiAgICBuYW1lOiBcInRvdXBwZXJjYXNlXCJcbn0sIFxuXG57XG4gICAgYmluZEtleToge21hYzogXCJjbWQtc2hpZnQtdlwiLCB3aW46IFwiY3RybC1zaGlmdC12XCJ9LFxuICAgIG5hbWU6IFwicGFzdGVfYW5kX2luZGVudFwiXG59LCB7XG4gICAgYmluZEtleToge21hYzogXCJjbWQtayBjbWQtdnxjbWQtYWx0LXZcIiwgd2luOiBcImN0cmwtayBjdHJsLXZcIn0sXG4gICAgbmFtZTogXCJwYXN0ZV9mcm9tX2hpc3RvcnlcIlxufSwgXG5cbntcbiAgICBiaW5kS2V5OiB7IG1hYzogXCJjbWQtc2hpZnQtZW50ZXJcIiwgd2luOiBcImN0cmwtc2hpZnQtZW50ZXJcIiB9LFxuICAgIG5hbWU6IFwiYWRkTGluZUJlZm9yZVwiXG59LCB7XG4gICAgYmluZEtleTogeyBtYWM6IFwiY21kLWVudGVyXCIsIHdpbjogXCJjdHJsLWVudGVyXCIgfSxcbiAgICBuYW1lOiBcImFkZExpbmVBZnRlclwiXG59LCB7XG4gICAgYmluZEtleTogeyBtYWM6IFwiY3RybC1zaGlmdC1rXCIsIHdpbjogXCJjdHJsLXNoaWZ0LWtcIiB9LFxuICAgIG5hbWU6IFwicmVtb3ZlbGluZVwiXG59LCB7XG4gICAgYmluZEtleTogeyBtYWM6IFwiY3RybC1hbHQtdXBcIiwgd2luOiBcImN0cmwtdXBcIiB9LFxuICAgIG5hbWU6IFwic2Nyb2xsdXBcIlxufSwge1xuICAgIGJpbmRLZXk6IHsgbWFjOiBcImN0cmwtYWx0LWRvd25cIiwgd2luOiBcImN0cmwtZG93blwiIH0sXG4gICAgbmFtZTogXCJzY3JvbGxkb3duXCJcbn0sIHtcbiAgICBiaW5kS2V5OiB7IG1hYzogXCJjbWQtYVwiLCB3aW46IFwiY3RybC1hXCIgfSxcbiAgICBuYW1lOiBcInNlbGVjdGFsbFwiXG59LCB7XG4gICAgYmluZEtleTogeyBsaW51eDogXCJhbHQtc2hpZnQtZG93blwiLCBtYWM6IFwiY3RybC1zaGlmdC1kb3duXCIsIHdpbjogXCJjdHJsLWFsdC1kb3duXCIgfSxcbiAgICBuYW1lOiBcImFkZEN1cnNvckJlbG93XCJcbn0sIHtcbiAgICBiaW5kS2V5OiB7IGxpbnV4OiBcImFsdC1zaGlmdC11cFwiLCBtYWM6IFwiY3RybC1zaGlmdC11cFwiLCB3aW46IFwiY3RybC1hbHQtdXBcIiB9LFxuICAgIG5hbWU6IFwiYWRkQ3Vyc29yQWJvdmVcIlxufSxcblxuXG57XG4gICAgYmluZEtleTogeyBtYWM6IFwiY21kLWsgY21kLWN8Y3RybC1sXCIsIHdpbjogXCJjdHJsLWsgY3RybC1jXCIgfSxcbiAgICBuYW1lOiBcImNlbnRlcnNlbGVjdGlvblwiXG59LCBcblxue1xuICAgIGJpbmRLZXk6IHsgbWFjOiBcImY1XCIsIHdpbjogXCJmOVwiIH0sXG4gICAgbmFtZTogXCJzb3J0bGluZXNcIlxufSwgXG57XG4gICAgYmluZEtleToge21hYzogXCJjdHJsLWY1XCIsIHdpbjogXCJjdHJsLWY5XCJ9LFxuICAgIG5hbWU6IFwic29ydGxpbmVzXCIsXG4gICAgYXJnczoge2Nhc2VTZW5zaXRpdmU6IHRydWV9XG59LFxue1xuICAgIGJpbmRLZXk6IHsgbWFjOiBcImNtZC1zaGlmdC1sXCIsIHdpbjogXCJjdHJsLXNoaWZ0LWxcIiB9LFxuICAgIG5hbWU6IFwic3BsaXRTZWxlY3Rpb25JbnRvTGluZXNcIlxufSwge1xuICAgIGJpbmRLZXk6IHsgbWFjOiBcImN0cmwtY21kLWRvd25cIiwgd2luOiBcImN0cmwtc2hpZnQtZG93blwiIH0sXG4gICAgbmFtZTogXCJtb3ZlbGluZXNkb3duXCJcbn0sIHtcbiAgICBiaW5kS2V5OiB7IG1hYzogXCJjdHJsLWNtZC11cFwiLCB3aW46IFwiY3RybC1zaGlmdC11cFwiIH0sXG4gICAgbmFtZTogXCJtb3ZlbGluZXN1cFwiXG59LCB7XG4gICAgYmluZEtleTogeyBtYWM6IFwiYWx0LWRvd25cIiwgd2luOiBcImFsdC1kb3duXCIgfSxcbiAgICBuYW1lOiBcIm1vZGlmeU51bWJlckRvd25cIlxufSwge1xuICAgIGJpbmRLZXk6IHsgbWFjOiBcImFsdC11cFwiLCB3aW46IFwiYWx0LXVwXCIgfSxcbiAgICBuYW1lOiBcIm1vZGlmeU51bWJlclVwXCJcbn0sIHtcbiAgICBiaW5kS2V5OiB7IG1hYzogXCJjbWQtL1wiLCB3aW46IFwiY3RybC0vXCIgfSxcbiAgICBuYW1lOiBcInRvZ2dsZWNvbW1lbnRcIlxufSwge1xuICAgIGJpbmRLZXk6IHsgbWFjOiBcImNtZC1hbHQtL1wiLCB3aW46IFwiY3RybC1zaGlmdC0vXCIgfSxcbiAgICBuYW1lOiBcInRvZ2dsZUJsb2NrQ29tbWVudFwiXG59LFxuXG5cbntcbiAgICBiaW5kS2V5OiB7IGxpbnV4OiBcImN0cmwtYWx0LXFcIiwgbWFjOiBcImN0cmwtcVwiLCB3aW46IFwiY3RybC1xXCIgfSxcbiAgICBuYW1lOiBcInRvZ2dsZXJlY29yZGluZ1wiXG59LCB7XG4gICAgYmluZEtleTogeyBsaW51eDogXCJjdHJsLWFsdC1zaGlmdC1xXCIsIG1hYzogXCJjdHJsLXNoaWZ0LXFcIiwgd2luOiBcImN0cmwtc2hpZnQtcVwiIH0sXG4gICAgbmFtZTogXCJyZXBsYXltYWNyb1wiXG59LCBcblxue1xuICAgIGJpbmRLZXk6IHsgbWFjOiBcImN0cmwtdFwiLCB3aW46IFwiY3RybC10XCIgfSxcbiAgICBuYW1lOiBcInRyYW5zcG9zZVwiXG59XG5cbl0uZm9yRWFjaChmdW5jdGlvbihiaW5kaW5nKSB7XG4gICAgdmFyIGNvbW1hbmQgPSBleHBvcnRzLmhhbmRsZXIuY29tbWFuZHNbYmluZGluZy5uYW1lXTtcbiAgICBpZiAoY29tbWFuZClcbiAgICAgICAgY29tbWFuZC5iaW5kS2V5ID0gYmluZGluZy5iaW5kS2V5O1xuICAgIGV4cG9ydHMuaGFuZGxlci5iaW5kS2V5KGJpbmRpbmcuYmluZEtleSwgY29tbWFuZCB8fCBiaW5kaW5nLm5hbWUpO1xufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=