(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[3281],{

/***/ 73281:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/*jslint indent: 4, maxerr: 50, white: true, browser: true, vars: true*/
/*global define, require */

/**
 * Show Keyboard Shortcuts
 * @fileOverview Show Keyboard Shortcuts <br />
 * Generates a menu which displays the keyboard shortcuts.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 */



var Editor = (__webpack_require__(27258).Editor);

/**
 * Generates a menu which displays the keyboard shortcuts.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @param {Editor} editor An instance of the ace editor.
 */
function showKeyboardShortcuts(editor) {
    // make sure the menu isn't open already.
    if (!document.getElementById('kbshortcutmenu')) {
        var overlayPage = (__webpack_require__(24809).overlayPage);
        var getEditorKeybordShortcuts = (__webpack_require__(98463)/* .getEditorKeybordShortcuts */ .$);
        var kb = getEditorKeybordShortcuts(editor);
        var el = document.createElement('div');
        var commands = kb.reduce(function (previous, current) {
            return previous + '<div class="ace_optionsMenuEntry"><span class="ace_optionsMenuCommand">'
                + current.command + '</span> : '
                + '<span class="ace_optionsMenuKey">' + current.key + '</span></div>';
        }, '');

        el.id = 'kbshortcutmenu';
        el.innerHTML = '<h1>Keyboard Shortcuts</h1>' + commands + '</div>';
        overlayPage(editor, el);
    }
}

/**
 * @param {Editor} editor
 */
module.exports.init = function (editor) {
    Editor.prototype.showKeyboardShortcuts = function () {
        showKeyboardShortcuts(this);
    };
    editor.commands.addCommands([{
        name: "showKeyboardShortcuts",
        bindKey: {
            win: "Ctrl-Alt-h",
            mac: "Command-Alt-h"
        },
        exec:
            /**
             * 
             * @param {Editor} editor
             * @param [line]
             */
            function (editor, line) {
            editor.showKeyboardShortcuts();
        }
    }]);
};


/***/ }),

/***/ 98463:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/*jslint indent: 4, maxerr: 50, white: true, browser: true, vars: true*/
/*global define, require */

/**
 * Get Editor Keyboard Shortcuts
 * @fileOverview Get Editor Keyboard Shortcuts <br />
 * Gets a map of keyboard shortcuts to command names for the current platform.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 */



/** @type{any} */var keys = __webpack_require__(29451);

/**
 * Gets a map of keyboard shortcuts to command names for the current platform.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @param {import("../../editor").Editor} editor An editor instance.
 * @returns {Array} Returns an array of objects representing the keyboard
 *  shortcuts for the given editor.
 * @example
 * var getKbShortcuts = require('./get_keyboard_shortcuts');
 * console.log(getKbShortcuts(editor));
 * // [
 * //     {'command' : aCommand, 'key' : 'Control-d'},
 * //     {'command' : aCommand, 'key' : 'Control-d'}
 * // ]
 */
module.exports.$ = function(editor) {
    var KEY_MODS = keys.KEY_MODS;
    var keybindings = [];
    var commandMap = {};
    editor.keyBinding.$handlers.forEach(function(handler) {
        var ckb = handler["commandKeyBinding"];
        for (var i in ckb) {
            var key = i.replace(/(^|-)\w/g, function(x) { return x.toUpperCase(); });
            var commands = ckb[i];
            if (!Array.isArray(commands))
                commands = [commands];
            commands.forEach(function(command) {
                if (typeof command != "string")
                    command  = command.name;
                if (commandMap[command]) {
                    commandMap[command].key += "|" + key;
                } else {
                    commandMap[command] = {key: key, command: command};
                    keybindings.push(commandMap[command]);
                }         
            });
        }
    });
    return keybindings;
};


/***/ }),

/***/ 24809:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/*jslint indent: 4, maxerr: 50, white: true, browser: true, vars: true*/
/*global define, require */

/**
 * Overlay Page
 * @fileOverview Overlay Page <br />
 * Generates an overlay for displaying menus. The overlay is an absolutely
 *  positioned div.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 */


var dom = __webpack_require__(71435);
var cssText = __webpack_require__(39047);
dom.importCssString(cssText, "settings_menu.css", false);

/**
 * Generates an overlay for displaying menus. The overlay is an absolutely
 *  positioned div.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @param editor
 * @param {HTMLElement} contentElement Any element which may be presented inside
 *  a div.
 * @param [callback]
 */
module.exports.overlayPage = function overlayPage(editor, contentElement, callback) {
    var closer = document.createElement('div');
    var ignoreFocusOut = false;

    function documentEscListener(e) {
        if (e.keyCode === 27) {
            close();
        }
    }

    function close() {
        if (!closer) return;
        document.removeEventListener('keydown', documentEscListener);
        closer.parentNode.removeChild(closer);
        if (editor) {
            editor.focus();
        }
        closer = null;
        callback && callback();
    }

     /**
     * Defines whether overlay is closed when user clicks outside of it.
     * 
     * @param {Boolean} ignore      If set to true overlay stays open when focus moves to another part of the editor.
     */
    function setIgnoreFocusOut(ignore) {
        ignoreFocusOut = ignore;
        if (ignore) {
            closer.style.pointerEvents = "none";
            contentElement.style.pointerEvents = "auto";
        }
    }

    closer.style.cssText = 'margin: 0; padding: 0; ' +
        'position: fixed; top:0; bottom:0; left:0; right:0;' +
        'z-index: 9990; ' +
        (editor ? 'background-color: rgba(0, 0, 0, 0.3);' : '');
    closer.addEventListener('click', function(e) {
        if (!ignoreFocusOut) {
            close();
        }
    });
    // click closer if esc key is pressed
    document.addEventListener('keydown', documentEscListener);

    contentElement.addEventListener('click', function (e) {
        e.stopPropagation();
    });

    closer.appendChild(contentElement);
    document.body.appendChild(closer);
    if (editor) {
        editor.blur();
    }
    return {
        close: close,
        setIgnoreFocusOut: setIgnoreFocusOut
    };
};


/***/ }),

/***/ 39047:
/***/ ((module) => {

module.exports = `#ace_settingsmenu, #kbshortcutmenu {
    background-color: #F7F7F7;
    color: black;
    box-shadow: -5px 4px 5px rgba(126, 126, 126, 0.55);
    padding: 1em 0.5em 2em 1em;
    overflow: auto;
    position: absolute;
    margin: 0;
    bottom: 0;
    right: 0;
    top: 0;
    z-index: 9991;
    cursor: default;
}

.ace_dark #ace_settingsmenu, .ace_dark #kbshortcutmenu {
    box-shadow: -20px 10px 25px rgba(126, 126, 126, 0.25);
    background-color: rgba(255, 255, 255, 0.6);
    color: black;
}

.ace_optionsMenuEntry:hover {
    background-color: rgba(100, 100, 100, 0.1);
    transition: all 0.3s
}

.ace_closeButton {
    background: rgba(245, 146, 146, 0.5);
    border: 1px solid #F48A8A;
    border-radius: 50%;
    padding: 7px;
    position: absolute;
    right: -8px;
    top: -8px;
    z-index: 100000;
}
.ace_closeButton{
    background: rgba(245, 146, 146, 0.9);
}
.ace_optionsMenuKey {
    color: darkslateblue;
    font-weight: bold;
}
.ace_optionsMenuCommand {
    color: darkcyan;
    font-weight: normal;
}
.ace_optionsMenuEntry input, .ace_optionsMenuEntry button {
    vertical-align: middle;
}

.ace_optionsMenuEntry button[ace_selected_button=true] {
    background: #e7e7e7;
    box-shadow: 1px 0px 2px 0px #adadad inset;
    border-color: #adadad;
}
.ace_optionsMenuEntry button {
    background: white;
    border: 1px solid lightgray;
    margin: 0px;
}
.ace_optionsMenuEntry button:hover{
    background: #f0f0f0;
}`;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Y29kZS9zcmMvZXh0L2tleWJpbmRpbmdfbWVudS5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9leHQvbWVudV90b29scy9nZXRfZWRpdG9yX2tleWJvYXJkX3Nob3J0Y3V0cy5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9leHQvbWVudV90b29scy9vdmVybGF5X3BhZ2UuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvZXh0L21lbnVfdG9vbHMvc2V0dGluZ3NfbWVudS5jc3MuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLypqc2xpbnQgaW5kZW50OiA0LCBtYXhlcnI6IDUwLCB3aGl0ZTogdHJ1ZSwgYnJvd3NlcjogdHJ1ZSwgdmFyczogdHJ1ZSovXG4vKmdsb2JhbCBkZWZpbmUsIHJlcXVpcmUgKi9cblxuLyoqXG4gKiBTaG93IEtleWJvYXJkIFNob3J0Y3V0c1xuICogQGZpbGVPdmVydmlldyBTaG93IEtleWJvYXJkIFNob3J0Y3V0cyA8YnIgLz5cbiAqIEdlbmVyYXRlcyBhIG1lbnUgd2hpY2ggZGlzcGxheXMgdGhlIGtleWJvYXJkIHNob3J0Y3V0cy5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBFZGl0b3IgPSByZXF1aXJlKFwiLi4vZWRpdG9yXCIpLkVkaXRvcjtcblxuLyoqXG4gKiBHZW5lcmF0ZXMgYSBtZW51IHdoaWNoIGRpc3BsYXlzIHRoZSBrZXlib2FyZCBzaG9ydGN1dHMuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHBhcmFtIHtFZGl0b3J9IGVkaXRvciBBbiBpbnN0YW5jZSBvZiB0aGUgYWNlIGVkaXRvci5cbiAqL1xuZnVuY3Rpb24gc2hvd0tleWJvYXJkU2hvcnRjdXRzKGVkaXRvcikge1xuICAgIC8vIG1ha2Ugc3VyZSB0aGUgbWVudSBpc24ndCBvcGVuIGFscmVhZHkuXG4gICAgaWYgKCFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgna2JzaG9ydGN1dG1lbnUnKSkge1xuICAgICAgICB2YXIgb3ZlcmxheVBhZ2UgPSByZXF1aXJlKCcuL21lbnVfdG9vbHMvb3ZlcmxheV9wYWdlJykub3ZlcmxheVBhZ2U7XG4gICAgICAgIHZhciBnZXRFZGl0b3JLZXlib3JkU2hvcnRjdXRzID0gcmVxdWlyZSgnLi9tZW51X3Rvb2xzL2dldF9lZGl0b3Jfa2V5Ym9hcmRfc2hvcnRjdXRzJykuZ2V0RWRpdG9yS2V5Ym9yZFNob3J0Y3V0cztcbiAgICAgICAgdmFyIGtiID0gZ2V0RWRpdG9yS2V5Ym9yZFNob3J0Y3V0cyhlZGl0b3IpO1xuICAgICAgICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdmFyIGNvbW1hbmRzID0ga2IucmVkdWNlKGZ1bmN0aW9uIChwcmV2aW91cywgY3VycmVudCkge1xuICAgICAgICAgICAgcmV0dXJuIHByZXZpb3VzICsgJzxkaXYgY2xhc3M9XCJhY2Vfb3B0aW9uc01lbnVFbnRyeVwiPjxzcGFuIGNsYXNzPVwiYWNlX29wdGlvbnNNZW51Q29tbWFuZFwiPidcbiAgICAgICAgICAgICAgICArIGN1cnJlbnQuY29tbWFuZCArICc8L3NwYW4+IDogJ1xuICAgICAgICAgICAgICAgICsgJzxzcGFuIGNsYXNzPVwiYWNlX29wdGlvbnNNZW51S2V5XCI+JyArIGN1cnJlbnQua2V5ICsgJzwvc3Bhbj48L2Rpdj4nO1xuICAgICAgICB9LCAnJyk7XG5cbiAgICAgICAgZWwuaWQgPSAna2JzaG9ydGN1dG1lbnUnO1xuICAgICAgICBlbC5pbm5lckhUTUwgPSAnPGgxPktleWJvYXJkIFNob3J0Y3V0czwvaDE+JyArIGNvbW1hbmRzICsgJzwvZGl2Pic7XG4gICAgICAgIG92ZXJsYXlQYWdlKGVkaXRvciwgZWwpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBAcGFyYW0ge0VkaXRvcn0gZWRpdG9yXG4gKi9cbm1vZHVsZS5leHBvcnRzLmluaXQgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgRWRpdG9yLnByb3RvdHlwZS5zaG93S2V5Ym9hcmRTaG9ydGN1dHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNob3dLZXlib2FyZFNob3J0Y3V0cyh0aGlzKTtcbiAgICB9O1xuICAgIGVkaXRvci5jb21tYW5kcy5hZGRDb21tYW5kcyhbe1xuICAgICAgICBuYW1lOiBcInNob3dLZXlib2FyZFNob3J0Y3V0c1wiLFxuICAgICAgICBiaW5kS2V5OiB7XG4gICAgICAgICAgICB3aW46IFwiQ3RybC1BbHQtaFwiLFxuICAgICAgICAgICAgbWFjOiBcIkNvbW1hbmQtQWx0LWhcIlxuICAgICAgICB9LFxuICAgICAgICBleGVjOlxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBcbiAgICAgICAgICAgICAqIEBwYXJhbSB7RWRpdG9yfSBlZGl0b3JcbiAgICAgICAgICAgICAqIEBwYXJhbSBbbGluZV1cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgZnVuY3Rpb24gKGVkaXRvciwgbGluZSkge1xuICAgICAgICAgICAgZWRpdG9yLnNob3dLZXlib2FyZFNob3J0Y3V0cygpO1xuICAgICAgICB9XG4gICAgfV0pO1xufTtcbiIsIi8qanNsaW50IGluZGVudDogNCwgbWF4ZXJyOiA1MCwgd2hpdGU6IHRydWUsIGJyb3dzZXI6IHRydWUsIHZhcnM6IHRydWUqL1xuLypnbG9iYWwgZGVmaW5lLCByZXF1aXJlICovXG5cbi8qKlxuICogR2V0IEVkaXRvciBLZXlib2FyZCBTaG9ydGN1dHNcbiAqIEBmaWxlT3ZlcnZpZXcgR2V0IEVkaXRvciBLZXlib2FyZCBTaG9ydGN1dHMgPGJyIC8+XG4gKiBHZXRzIGEgbWFwIG9mIGtleWJvYXJkIHNob3J0Y3V0cyB0byBjb21tYW5kIG5hbWVzIGZvciB0aGUgY3VycmVudCBwbGF0Zm9ybS5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKiBAdHlwZXthbnl9ICovdmFyIGtleXMgPSByZXF1aXJlKFwiLi4vLi4vbGliL2tleXNcIik7XG5cbi8qKlxuICogR2V0cyBhIG1hcCBvZiBrZXlib2FyZCBzaG9ydGN1dHMgdG8gY29tbWFuZCBuYW1lcyBmb3IgdGhlIGN1cnJlbnQgcGxhdGZvcm0uXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHBhcmFtIHtpbXBvcnQoXCIuLi8uLi9lZGl0b3JcIikuRWRpdG9yfSBlZGl0b3IgQW4gZWRpdG9yIGluc3RhbmNlLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGFuIGFycmF5IG9mIG9iamVjdHMgcmVwcmVzZW50aW5nIHRoZSBrZXlib2FyZFxuICogIHNob3J0Y3V0cyBmb3IgdGhlIGdpdmVuIGVkaXRvci5cbiAqIEBleGFtcGxlXG4gKiB2YXIgZ2V0S2JTaG9ydGN1dHMgPSByZXF1aXJlKCcuL2dldF9rZXlib2FyZF9zaG9ydGN1dHMnKTtcbiAqIGNvbnNvbGUubG9nKGdldEtiU2hvcnRjdXRzKGVkaXRvcikpO1xuICogLy8gW1xuICogLy8gICAgIHsnY29tbWFuZCcgOiBhQ29tbWFuZCwgJ2tleScgOiAnQ29udHJvbC1kJ30sXG4gKiAvLyAgICAgeydjb21tYW5kJyA6IGFDb21tYW5kLCAna2V5JyA6ICdDb250cm9sLWQnfVxuICogLy8gXVxuICovXG5tb2R1bGUuZXhwb3J0cy5nZXRFZGl0b3JLZXlib3JkU2hvcnRjdXRzID0gZnVuY3Rpb24oZWRpdG9yKSB7XG4gICAgdmFyIEtFWV9NT0RTID0ga2V5cy5LRVlfTU9EUztcbiAgICB2YXIga2V5YmluZGluZ3MgPSBbXTtcbiAgICB2YXIgY29tbWFuZE1hcCA9IHt9O1xuICAgIGVkaXRvci5rZXlCaW5kaW5nLiRoYW5kbGVycy5mb3JFYWNoKGZ1bmN0aW9uKGhhbmRsZXIpIHtcbiAgICAgICAgdmFyIGNrYiA9IGhhbmRsZXJbXCJjb21tYW5kS2V5QmluZGluZ1wiXTtcbiAgICAgICAgZm9yICh2YXIgaSBpbiBja2IpIHtcbiAgICAgICAgICAgIHZhciBrZXkgPSBpLnJlcGxhY2UoLyhefC0pXFx3L2csIGZ1bmN0aW9uKHgpIHsgcmV0dXJuIHgudG9VcHBlckNhc2UoKTsgfSk7XG4gICAgICAgICAgICB2YXIgY29tbWFuZHMgPSBja2JbaV07XG4gICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoY29tbWFuZHMpKVxuICAgICAgICAgICAgICAgIGNvbW1hbmRzID0gW2NvbW1hbmRzXTtcbiAgICAgICAgICAgIGNvbW1hbmRzLmZvckVhY2goZnVuY3Rpb24oY29tbWFuZCkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgY29tbWFuZCAhPSBcInN0cmluZ1wiKVxuICAgICAgICAgICAgICAgICAgICBjb21tYW5kICA9IGNvbW1hbmQubmFtZTtcbiAgICAgICAgICAgICAgICBpZiAoY29tbWFuZE1hcFtjb21tYW5kXSkge1xuICAgICAgICAgICAgICAgICAgICBjb21tYW5kTWFwW2NvbW1hbmRdLmtleSArPSBcInxcIiArIGtleTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb21tYW5kTWFwW2NvbW1hbmRdID0ge2tleToga2V5LCBjb21tYW5kOiBjb21tYW5kfTtcbiAgICAgICAgICAgICAgICAgICAga2V5YmluZGluZ3MucHVzaChjb21tYW5kTWFwW2NvbW1hbmRdKTtcbiAgICAgICAgICAgICAgICB9ICAgICAgICAgXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBrZXliaW5kaW5ncztcbn07XG4iLCIvKmpzbGludCBpbmRlbnQ6IDQsIG1heGVycjogNTAsIHdoaXRlOiB0cnVlLCBicm93c2VyOiB0cnVlLCB2YXJzOiB0cnVlKi9cbi8qZ2xvYmFsIGRlZmluZSwgcmVxdWlyZSAqL1xuXG4vKipcbiAqIE92ZXJsYXkgUGFnZVxuICogQGZpbGVPdmVydmlldyBPdmVybGF5IFBhZ2UgPGJyIC8+XG4gKiBHZW5lcmF0ZXMgYW4gb3ZlcmxheSBmb3IgZGlzcGxheWluZyBtZW51cy4gVGhlIG92ZXJsYXkgaXMgYW4gYWJzb2x1dGVseVxuICogIHBvc2l0aW9uZWQgZGl2LlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG52YXIgZG9tID0gcmVxdWlyZShcIi4uLy4uL2xpYi9kb21cIik7XG52YXIgY3NzVGV4dCA9IHJlcXVpcmUoXCIuL3NldHRpbmdzX21lbnUuY3NzXCIpO1xuZG9tLmltcG9ydENzc1N0cmluZyhjc3NUZXh0LCBcInNldHRpbmdzX21lbnUuY3NzXCIsIGZhbHNlKTtcblxuLyoqXG4gKiBHZW5lcmF0ZXMgYW4gb3ZlcmxheSBmb3IgZGlzcGxheWluZyBtZW51cy4gVGhlIG92ZXJsYXkgaXMgYW4gYWJzb2x1dGVseVxuICogIHBvc2l0aW9uZWQgZGl2LlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEBwYXJhbSBlZGl0b3JcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGNvbnRlbnRFbGVtZW50IEFueSBlbGVtZW50IHdoaWNoIG1heSBiZSBwcmVzZW50ZWQgaW5zaWRlXG4gKiAgYSBkaXYuXG4gKiBAcGFyYW0gW2NhbGxiYWNrXVxuICovXG5tb2R1bGUuZXhwb3J0cy5vdmVybGF5UGFnZSA9IGZ1bmN0aW9uIG92ZXJsYXlQYWdlKGVkaXRvciwgY29udGVudEVsZW1lbnQsIGNhbGxiYWNrKSB7XG4gICAgdmFyIGNsb3NlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHZhciBpZ25vcmVGb2N1c091dCA9IGZhbHNlO1xuXG4gICAgZnVuY3Rpb24gZG9jdW1lbnRFc2NMaXN0ZW5lcihlKSB7XG4gICAgICAgIGlmIChlLmtleUNvZGUgPT09IDI3KSB7XG4gICAgICAgICAgICBjbG9zZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xvc2UoKSB7XG4gICAgICAgIGlmICghY2xvc2VyKSByZXR1cm47XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBkb2N1bWVudEVzY0xpc3RlbmVyKTtcbiAgICAgICAgY2xvc2VyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoY2xvc2VyKTtcbiAgICAgICAgaWYgKGVkaXRvcikge1xuICAgICAgICAgICAgZWRpdG9yLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICAgICAgY2xvc2VyID0gbnVsbDtcbiAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soKTtcbiAgICB9XG5cbiAgICAgLyoqXG4gICAgICogRGVmaW5lcyB3aGV0aGVyIG92ZXJsYXkgaXMgY2xvc2VkIHdoZW4gdXNlciBjbGlja3Mgb3V0c2lkZSBvZiBpdC5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IGlnbm9yZSAgICAgIElmIHNldCB0byB0cnVlIG92ZXJsYXkgc3RheXMgb3BlbiB3aGVuIGZvY3VzIG1vdmVzIHRvIGFub3RoZXIgcGFydCBvZiB0aGUgZWRpdG9yLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHNldElnbm9yZUZvY3VzT3V0KGlnbm9yZSkge1xuICAgICAgICBpZ25vcmVGb2N1c091dCA9IGlnbm9yZTtcbiAgICAgICAgaWYgKGlnbm9yZSkge1xuICAgICAgICAgICAgY2xvc2VyLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgIGNvbnRlbnRFbGVtZW50LnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcImF1dG9cIjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsb3Nlci5zdHlsZS5jc3NUZXh0ID0gJ21hcmdpbjogMDsgcGFkZGluZzogMDsgJyArXG4gICAgICAgICdwb3NpdGlvbjogZml4ZWQ7IHRvcDowOyBib3R0b206MDsgbGVmdDowOyByaWdodDowOycgK1xuICAgICAgICAnei1pbmRleDogOTk5MDsgJyArXG4gICAgICAgIChlZGl0b3IgPyAnYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjMpOycgOiAnJyk7XG4gICAgY2xvc2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoIWlnbm9yZUZvY3VzT3V0KSB7XG4gICAgICAgICAgICBjbG9zZSgpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgLy8gY2xpY2sgY2xvc2VyIGlmIGVzYyBrZXkgaXMgcHJlc3NlZFxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBkb2N1bWVudEVzY0xpc3RlbmVyKTtcblxuICAgIGNvbnRlbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9KTtcblxuICAgIGNsb3Nlci5hcHBlbmRDaGlsZChjb250ZW50RWxlbWVudCk7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjbG9zZXIpO1xuICAgIGlmIChlZGl0b3IpIHtcbiAgICAgICAgZWRpdG9yLmJsdXIoKTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgY2xvc2U6IGNsb3NlLFxuICAgICAgICBzZXRJZ25vcmVGb2N1c091dDogc2V0SWdub3JlRm9jdXNPdXRcbiAgICB9O1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gYCNhY2Vfc2V0dGluZ3NtZW51LCAja2JzaG9ydGN1dG1lbnUge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNGN0Y3Rjc7XG4gICAgY29sb3I6IGJsYWNrO1xuICAgIGJveC1zaGFkb3c6IC01cHggNHB4IDVweCByZ2JhKDEyNiwgMTI2LCAxMjYsIDAuNTUpO1xuICAgIHBhZGRpbmc6IDFlbSAwLjVlbSAyZW0gMWVtO1xuICAgIG92ZXJmbG93OiBhdXRvO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBtYXJnaW46IDA7XG4gICAgYm90dG9tOiAwO1xuICAgIHJpZ2h0OiAwO1xuICAgIHRvcDogMDtcbiAgICB6LWluZGV4OiA5OTkxO1xuICAgIGN1cnNvcjogZGVmYXVsdDtcbn1cblxuLmFjZV9kYXJrICNhY2Vfc2V0dGluZ3NtZW51LCAuYWNlX2RhcmsgI2tic2hvcnRjdXRtZW51IHtcbiAgICBib3gtc2hhZG93OiAtMjBweCAxMHB4IDI1cHggcmdiYSgxMjYsIDEyNiwgMTI2LCAwLjI1KTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNik7XG4gICAgY29sb3I6IGJsYWNrO1xufVxuXG4uYWNlX29wdGlvbnNNZW51RW50cnk6aG92ZXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTAwLCAxMDAsIDEwMCwgMC4xKTtcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC4zc1xufVxuXG4uYWNlX2Nsb3NlQnV0dG9uIHtcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKDI0NSwgMTQ2LCAxNDYsIDAuNSk7XG4gICAgYm9yZGVyOiAxcHggc29saWQgI0Y0OEE4QTtcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgcGFkZGluZzogN3B4O1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICByaWdodDogLThweDtcbiAgICB0b3A6IC04cHg7XG4gICAgei1pbmRleDogMTAwMDAwO1xufVxuLmFjZV9jbG9zZUJ1dHRvbntcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKDI0NSwgMTQ2LCAxNDYsIDAuOSk7XG59XG4uYWNlX29wdGlvbnNNZW51S2V5IHtcbiAgICBjb2xvcjogZGFya3NsYXRlYmx1ZTtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbn1cbi5hY2Vfb3B0aW9uc01lbnVDb21tYW5kIHtcbiAgICBjb2xvcjogZGFya2N5YW47XG4gICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbn1cbi5hY2Vfb3B0aW9uc01lbnVFbnRyeSBpbnB1dCwgLmFjZV9vcHRpb25zTWVudUVudHJ5IGJ1dHRvbiB7XG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbn1cblxuLmFjZV9vcHRpb25zTWVudUVudHJ5IGJ1dHRvblthY2Vfc2VsZWN0ZWRfYnV0dG9uPXRydWVdIHtcbiAgICBiYWNrZ3JvdW5kOiAjZTdlN2U3O1xuICAgIGJveC1zaGFkb3c6IDFweCAwcHggMnB4IDBweCAjYWRhZGFkIGluc2V0O1xuICAgIGJvcmRlci1jb2xvcjogI2FkYWRhZDtcbn1cbi5hY2Vfb3B0aW9uc01lbnVFbnRyeSBidXR0b24ge1xuICAgIGJhY2tncm91bmQ6IHdoaXRlO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcbiAgICBtYXJnaW46IDBweDtcbn1cbi5hY2Vfb3B0aW9uc01lbnVFbnRyeSBidXR0b246aG92ZXJ7XG4gICAgYmFja2dyb3VuZDogI2YwZjBmMDtcbn1gO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9