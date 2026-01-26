(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[3281],{

/***/ 73281:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * ## Show Keyboard Shortcuts extension
 *
 * Provides a keyboard shortcuts display overlay for the Ace editor. Creates an interactive menu that shows all available
 * keyboard shortcuts with their corresponding commands, organized in a searchable and navigable format. The menu
 * appears as an overlay page and can be triggered via keyboard shortcut (Ctrl-Alt-H/Cmd-Alt-H) or programmatically.
 *
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 * @module
 */

/*jslint indent: 4, maxerr: 50, white: true, browser: true, vars: true*/
/*global define, require */



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
 * Initializes keyboard shortcut functionality for the editor.
 * Adds a method to show keyboard shortcuts and registers a command
 * to trigger the keyboard shortcuts display.
 *
 * @param {Editor} editor The Ace editor instance to initialize
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
/**
 * ## Editor Keyboard Shortcuts Utility
 *
 * Provides functionality to extract and format keyboard shortcuts from an Ace editor instance. Analyzes all registered
 * command handlers and their key bindings to generate a list of available keyboard shortcuts for the
 * current platform. Returns formatted key combinations with proper modifier key representations and handles multiple
 * bindings per command with pipe-separated notation.
 *
 * **Usage:**
 * ```javascript
 * var getKbShortcuts = require('ace/ext/menu_tools/get_editor_keyboard_shortcuts');
 * var shortcuts = getKbShortcuts.getEditorKeybordShortcuts(editor);
 * console.log(shortcuts);
 * // [
 * //     {'command': 'selectall', 'key': 'Ctrl-A'},
 * //     {'command': 'copy', 'key': 'Ctrl-C|Ctrl-Insert'}
 * // ]
 * ```
 *
 * @module
 */

/*jslint indent: 4, maxerr: 50, white: true, browser: true, vars: true*/
/*global define, require */



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
/**
 * ## Overlay Page utility
 *
 * Provides modal overlay functionality for displaying editor extension interfaces. Creates a full-screen overlay with
 * configurable backdrop behavior, keyboard navigation (ESC to close), and focus management. Used by various extensions
 * to display menus, settings panels, and other interactive content over the editor interface.
 *
 * **Usage:**
 * ```javascript
 * var overlayPage = require('./overlay_page').overlayPage;
 * var contentElement = document.createElement('div');
 * contentElement.innerHTML = '<h1>Settings</h1>';
 *
 * var overlay = overlayPage(editor, contentElement, function() {
 *   console.log('Overlay closed');
 * });
 * ```
 *
 * @module
 */


/*jslint indent: 4, maxerr: 50, white: true, browser: true, vars: true*/
/*global define, require */


var dom = __webpack_require__(71435);
var cssText = __webpack_require__(39047);
dom.importCssString(cssText, "settings_menu.css", false);

/**
 * Generates an overlay for displaying menus. The overlay is an absolutely
 *  positioned div.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @param {import("../../editor").Editor} editor
 * @param {HTMLElement} contentElement Any element which may be presented inside
 *  a div.
 * @param {() => void} [callback]
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9leHQva2V5YmluZGluZ19tZW51LmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL2V4dC9tZW51X3Rvb2xzL2dldF9lZGl0b3Jfa2V5Ym9hcmRfc2hvcnRjdXRzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL2V4dC9tZW51X3Rvb2xzL292ZXJsYXlfcGFnZS5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9leHQvbWVudV90b29scy9zZXR0aW5nc19tZW51LmNzcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqICMjIFNob3cgS2V5Ym9hcmQgU2hvcnRjdXRzIGV4dGVuc2lvblxuICpcbiAqIFByb3ZpZGVzIGEga2V5Ym9hcmQgc2hvcnRjdXRzIGRpc3BsYXkgb3ZlcmxheSBmb3IgdGhlIEFjZSBlZGl0b3IuIENyZWF0ZXMgYW4gaW50ZXJhY3RpdmUgbWVudSB0aGF0IHNob3dzIGFsbCBhdmFpbGFibGVcbiAqIGtleWJvYXJkIHNob3J0Y3V0cyB3aXRoIHRoZWlyIGNvcnJlc3BvbmRpbmcgY29tbWFuZHMsIG9yZ2FuaXplZCBpbiBhIHNlYXJjaGFibGUgYW5kIG5hdmlnYWJsZSBmb3JtYXQuIFRoZSBtZW51XG4gKiBhcHBlYXJzIGFzIGFuIG92ZXJsYXkgcGFnZSBhbmQgY2FuIGJlIHRyaWdnZXJlZCB2aWEga2V5Ym9hcmQgc2hvcnRjdXQgKEN0cmwtQWx0LUgvQ21kLUFsdC1IKSBvciBwcm9ncmFtbWF0aWNhbGx5LlxuICpcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiBAbW9kdWxlXG4gKi9cblxuLypqc2xpbnQgaW5kZW50OiA0LCBtYXhlcnI6IDUwLCB3aGl0ZTogdHJ1ZSwgYnJvd3NlcjogdHJ1ZSwgdmFyczogdHJ1ZSovXG4vKmdsb2JhbCBkZWZpbmUsIHJlcXVpcmUgKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBFZGl0b3IgPSByZXF1aXJlKFwiLi4vZWRpdG9yXCIpLkVkaXRvcjtcblxuLyoqXG4gKiBHZW5lcmF0ZXMgYSBtZW51IHdoaWNoIGRpc3BsYXlzIHRoZSBrZXlib2FyZCBzaG9ydGN1dHMuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHBhcmFtIHtFZGl0b3J9IGVkaXRvciBBbiBpbnN0YW5jZSBvZiB0aGUgYWNlIGVkaXRvci5cbiAqL1xuZnVuY3Rpb24gc2hvd0tleWJvYXJkU2hvcnRjdXRzKGVkaXRvcikge1xuICAgIC8vIG1ha2Ugc3VyZSB0aGUgbWVudSBpc24ndCBvcGVuIGFscmVhZHkuXG4gICAgaWYgKCFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgna2JzaG9ydGN1dG1lbnUnKSkge1xuICAgICAgICB2YXIgb3ZlcmxheVBhZ2UgPSByZXF1aXJlKCcuL21lbnVfdG9vbHMvb3ZlcmxheV9wYWdlJykub3ZlcmxheVBhZ2U7XG4gICAgICAgIHZhciBnZXRFZGl0b3JLZXlib3JkU2hvcnRjdXRzID0gcmVxdWlyZSgnLi9tZW51X3Rvb2xzL2dldF9lZGl0b3Jfa2V5Ym9hcmRfc2hvcnRjdXRzJykuZ2V0RWRpdG9yS2V5Ym9yZFNob3J0Y3V0cztcbiAgICAgICAgdmFyIGtiID0gZ2V0RWRpdG9yS2V5Ym9yZFNob3J0Y3V0cyhlZGl0b3IpO1xuICAgICAgICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgdmFyIGNvbW1hbmRzID0ga2IucmVkdWNlKGZ1bmN0aW9uIChwcmV2aW91cywgY3VycmVudCkge1xuICAgICAgICAgICAgcmV0dXJuIHByZXZpb3VzICsgJzxkaXYgY2xhc3M9XCJhY2Vfb3B0aW9uc01lbnVFbnRyeVwiPjxzcGFuIGNsYXNzPVwiYWNlX29wdGlvbnNNZW51Q29tbWFuZFwiPidcbiAgICAgICAgICAgICAgICArIGN1cnJlbnQuY29tbWFuZCArICc8L3NwYW4+IDogJ1xuICAgICAgICAgICAgICAgICsgJzxzcGFuIGNsYXNzPVwiYWNlX29wdGlvbnNNZW51S2V5XCI+JyArIGN1cnJlbnQua2V5ICsgJzwvc3Bhbj48L2Rpdj4nO1xuICAgICAgICB9LCAnJyk7XG5cbiAgICAgICAgZWwuaWQgPSAna2JzaG9ydGN1dG1lbnUnO1xuICAgICAgICBlbC5pbm5lckhUTUwgPSAnPGgxPktleWJvYXJkIFNob3J0Y3V0czwvaDE+JyArIGNvbW1hbmRzICsgJzwvZGl2Pic7XG4gICAgICAgIG92ZXJsYXlQYWdlKGVkaXRvciwgZWwpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBJbml0aWFsaXplcyBrZXlib2FyZCBzaG9ydGN1dCBmdW5jdGlvbmFsaXR5IGZvciB0aGUgZWRpdG9yLlxuICogQWRkcyBhIG1ldGhvZCB0byBzaG93IGtleWJvYXJkIHNob3J0Y3V0cyBhbmQgcmVnaXN0ZXJzIGEgY29tbWFuZFxuICogdG8gdHJpZ2dlciB0aGUga2V5Ym9hcmQgc2hvcnRjdXRzIGRpc3BsYXkuXG4gKlxuICogQHBhcmFtIHtFZGl0b3J9IGVkaXRvciBUaGUgQWNlIGVkaXRvciBpbnN0YW5jZSB0byBpbml0aWFsaXplXG4gKi9cbm1vZHVsZS5leHBvcnRzLmluaXQgPSBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgRWRpdG9yLnByb3RvdHlwZS5zaG93S2V5Ym9hcmRTaG9ydGN1dHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNob3dLZXlib2FyZFNob3J0Y3V0cyh0aGlzKTtcbiAgICB9O1xuICAgIGVkaXRvci5jb21tYW5kcy5hZGRDb21tYW5kcyhbe1xuICAgICAgICBuYW1lOiBcInNob3dLZXlib2FyZFNob3J0Y3V0c1wiLFxuICAgICAgICBiaW5kS2V5OiB7XG4gICAgICAgICAgICB3aW46IFwiQ3RybC1BbHQtaFwiLFxuICAgICAgICAgICAgbWFjOiBcIkNvbW1hbmQtQWx0LWhcIlxuICAgICAgICB9LFxuICAgICAgICBleGVjOlxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBcbiAgICAgICAgICAgICAqIEBwYXJhbSB7RWRpdG9yfSBlZGl0b3JcbiAgICAgICAgICAgICAqIEBwYXJhbSBbbGluZV1cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgZnVuY3Rpb24gKGVkaXRvciwgbGluZSkge1xuICAgICAgICAgICAgZWRpdG9yLnNob3dLZXlib2FyZFNob3J0Y3V0cygpO1xuICAgICAgICB9XG4gICAgfV0pO1xufTtcbiIsIi8qKlxuICogIyMgRWRpdG9yIEtleWJvYXJkIFNob3J0Y3V0cyBVdGlsaXR5XG4gKlxuICogUHJvdmlkZXMgZnVuY3Rpb25hbGl0eSB0byBleHRyYWN0IGFuZCBmb3JtYXQga2V5Ym9hcmQgc2hvcnRjdXRzIGZyb20gYW4gQWNlIGVkaXRvciBpbnN0YW5jZS4gQW5hbHl6ZXMgYWxsIHJlZ2lzdGVyZWRcbiAqIGNvbW1hbmQgaGFuZGxlcnMgYW5kIHRoZWlyIGtleSBiaW5kaW5ncyB0byBnZW5lcmF0ZSBhIGxpc3Qgb2YgYXZhaWxhYmxlIGtleWJvYXJkIHNob3J0Y3V0cyBmb3IgdGhlXG4gKiBjdXJyZW50IHBsYXRmb3JtLiBSZXR1cm5zIGZvcm1hdHRlZCBrZXkgY29tYmluYXRpb25zIHdpdGggcHJvcGVyIG1vZGlmaWVyIGtleSByZXByZXNlbnRhdGlvbnMgYW5kIGhhbmRsZXMgbXVsdGlwbGVcbiAqIGJpbmRpbmdzIHBlciBjb21tYW5kIHdpdGggcGlwZS1zZXBhcmF0ZWQgbm90YXRpb24uXG4gKlxuICogKipVc2FnZToqKlxuICogYGBgamF2YXNjcmlwdFxuICogdmFyIGdldEtiU2hvcnRjdXRzID0gcmVxdWlyZSgnYWNlL2V4dC9tZW51X3Rvb2xzL2dldF9lZGl0b3Jfa2V5Ym9hcmRfc2hvcnRjdXRzJyk7XG4gKiB2YXIgc2hvcnRjdXRzID0gZ2V0S2JTaG9ydGN1dHMuZ2V0RWRpdG9yS2V5Ym9yZFNob3J0Y3V0cyhlZGl0b3IpO1xuICogY29uc29sZS5sb2coc2hvcnRjdXRzKTtcbiAqIC8vIFtcbiAqIC8vICAgICB7J2NvbW1hbmQnOiAnc2VsZWN0YWxsJywgJ2tleSc6ICdDdHJsLUEnfSxcbiAqIC8vICAgICB7J2NvbW1hbmQnOiAnY29weScsICdrZXknOiAnQ3RybC1DfEN0cmwtSW5zZXJ0J31cbiAqIC8vIF1cbiAqIGBgYFxuICpcbiAqIEBtb2R1bGVcbiAqL1xuXG4vKmpzbGludCBpbmRlbnQ6IDQsIG1heGVycjogNTAsIHdoaXRlOiB0cnVlLCBicm93c2VyOiB0cnVlLCB2YXJzOiB0cnVlKi9cbi8qZ2xvYmFsIGRlZmluZSwgcmVxdWlyZSAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxuLyoqIEB0eXBle2FueX0gKi92YXIga2V5cyA9IHJlcXVpcmUoXCIuLi8uLi9saWIva2V5c1wiKTtcblxuLyoqXG4gKiBHZXRzIGEgbWFwIG9mIGtleWJvYXJkIHNob3J0Y3V0cyB0byBjb21tYW5kIG5hbWVzIGZvciB0aGUgY3VycmVudCBwbGF0Zm9ybS5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAcGFyYW0ge2ltcG9ydChcIi4uLy4uL2VkaXRvclwiKS5FZGl0b3J9IGVkaXRvciBBbiBlZGl0b3IgaW5zdGFuY2UuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYW4gYXJyYXkgb2Ygb2JqZWN0cyByZXByZXNlbnRpbmcgdGhlIGtleWJvYXJkXG4gKiAgc2hvcnRjdXRzIGZvciB0aGUgZ2l2ZW4gZWRpdG9yLlxuICogQGV4YW1wbGVcbiAqIHZhciBnZXRLYlNob3J0Y3V0cyA9IHJlcXVpcmUoJy4vZ2V0X2tleWJvYXJkX3Nob3J0Y3V0cycpO1xuICogY29uc29sZS5sb2coZ2V0S2JTaG9ydGN1dHMoZWRpdG9yKSk7XG4gKiAvLyBbXG4gKiAvLyAgICAgeydjb21tYW5kJyA6IGFDb21tYW5kLCAna2V5JyA6ICdDb250cm9sLWQnfSxcbiAqIC8vICAgICB7J2NvbW1hbmQnIDogYUNvbW1hbmQsICdrZXknIDogJ0NvbnRyb2wtZCd9XG4gKiAvLyBdXG4gKi9cbm1vZHVsZS5leHBvcnRzLmdldEVkaXRvcktleWJvcmRTaG9ydGN1dHMgPSBmdW5jdGlvbihlZGl0b3IpIHtcbiAgICB2YXIgS0VZX01PRFMgPSBrZXlzLktFWV9NT0RTO1xuICAgIHZhciBrZXliaW5kaW5ncyA9IFtdO1xuICAgIHZhciBjb21tYW5kTWFwID0ge307XG4gICAgZWRpdG9yLmtleUJpbmRpbmcuJGhhbmRsZXJzLmZvckVhY2goZnVuY3Rpb24oaGFuZGxlcikge1xuICAgICAgICB2YXIgY2tiID0gaGFuZGxlcltcImNvbW1hbmRLZXlCaW5kaW5nXCJdO1xuICAgICAgICBmb3IgKHZhciBpIGluIGNrYikge1xuICAgICAgICAgICAgdmFyIGtleSA9IGkucmVwbGFjZSgvKF58LSlcXHcvZywgZnVuY3Rpb24oeCkgeyByZXR1cm4geC50b1VwcGVyQ2FzZSgpOyB9KTtcbiAgICAgICAgICAgIHZhciBjb21tYW5kcyA9IGNrYltpXTtcbiAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShjb21tYW5kcykpXG4gICAgICAgICAgICAgICAgY29tbWFuZHMgPSBbY29tbWFuZHNdO1xuICAgICAgICAgICAgY29tbWFuZHMuZm9yRWFjaChmdW5jdGlvbihjb21tYW5kKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjb21tYW5kICE9IFwic3RyaW5nXCIpXG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmQgID0gY29tbWFuZC5uYW1lO1xuICAgICAgICAgICAgICAgIGlmIChjb21tYW5kTWFwW2NvbW1hbmRdKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmRNYXBbY29tbWFuZF0ua2V5ICs9IFwifFwiICsga2V5O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmRNYXBbY29tbWFuZF0gPSB7a2V5OiBrZXksIGNvbW1hbmQ6IGNvbW1hbmR9O1xuICAgICAgICAgICAgICAgICAgICBrZXliaW5kaW5ncy5wdXNoKGNvbW1hbmRNYXBbY29tbWFuZF0pO1xuICAgICAgICAgICAgICAgIH0gICAgICAgICBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGtleWJpbmRpbmdzO1xufTtcbiIsIi8qKlxuICogIyMgT3ZlcmxheSBQYWdlIHV0aWxpdHlcbiAqXG4gKiBQcm92aWRlcyBtb2RhbCBvdmVybGF5IGZ1bmN0aW9uYWxpdHkgZm9yIGRpc3BsYXlpbmcgZWRpdG9yIGV4dGVuc2lvbiBpbnRlcmZhY2VzLiBDcmVhdGVzIGEgZnVsbC1zY3JlZW4gb3ZlcmxheSB3aXRoXG4gKiBjb25maWd1cmFibGUgYmFja2Ryb3AgYmVoYXZpb3IsIGtleWJvYXJkIG5hdmlnYXRpb24gKEVTQyB0byBjbG9zZSksIGFuZCBmb2N1cyBtYW5hZ2VtZW50LiBVc2VkIGJ5IHZhcmlvdXMgZXh0ZW5zaW9uc1xuICogdG8gZGlzcGxheSBtZW51cywgc2V0dGluZ3MgcGFuZWxzLCBhbmQgb3RoZXIgaW50ZXJhY3RpdmUgY29udGVudCBvdmVyIHRoZSBlZGl0b3IgaW50ZXJmYWNlLlxuICpcbiAqICoqVXNhZ2U6KipcbiAqIGBgYGphdmFzY3JpcHRcbiAqIHZhciBvdmVybGF5UGFnZSA9IHJlcXVpcmUoJy4vb3ZlcmxheV9wYWdlJykub3ZlcmxheVBhZ2U7XG4gKiB2YXIgY29udGVudEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAqIGNvbnRlbnRFbGVtZW50LmlubmVySFRNTCA9ICc8aDE+U2V0dGluZ3M8L2gxPic7XG4gKlxuICogdmFyIG92ZXJsYXkgPSBvdmVybGF5UGFnZShlZGl0b3IsIGNvbnRlbnRFbGVtZW50LCBmdW5jdGlvbigpIHtcbiAqICAgY29uc29sZS5sb2coJ092ZXJsYXkgY2xvc2VkJyk7XG4gKiB9KTtcbiAqIGBgYFxuICpcbiAqIEBtb2R1bGVcbiAqL1xuXG5cbi8qanNsaW50IGluZGVudDogNCwgbWF4ZXJyOiA1MCwgd2hpdGU6IHRydWUsIGJyb3dzZXI6IHRydWUsIHZhcnM6IHRydWUqL1xuLypnbG9iYWwgZGVmaW5lLCByZXF1aXJlICovXG5cbid1c2Ugc3RyaWN0JztcbnZhciBkb20gPSByZXF1aXJlKFwiLi4vLi4vbGliL2RvbVwiKTtcbnZhciBjc3NUZXh0ID0gcmVxdWlyZShcIi4vc2V0dGluZ3NfbWVudS5jc3NcIik7XG5kb20uaW1wb3J0Q3NzU3RyaW5nKGNzc1RleHQsIFwic2V0dGluZ3NfbWVudS5jc3NcIiwgZmFsc2UpO1xuXG4vKipcbiAqIEdlbmVyYXRlcyBhbiBvdmVybGF5IGZvciBkaXNwbGF5aW5nIG1lbnVzLiBUaGUgb3ZlcmxheSBpcyBhbiBhYnNvbHV0ZWx5XG4gKiAgcG9zaXRpb25lZCBkaXYuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHBhcmFtIHtpbXBvcnQoXCIuLi8uLi9lZGl0b3JcIikuRWRpdG9yfSBlZGl0b3JcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGNvbnRlbnRFbGVtZW50IEFueSBlbGVtZW50IHdoaWNoIG1heSBiZSBwcmVzZW50ZWQgaW5zaWRlXG4gKiAgYSBkaXYuXG4gKiBAcGFyYW0geygpID0+IHZvaWR9IFtjYWxsYmFja11cbiAqL1xubW9kdWxlLmV4cG9ydHMub3ZlcmxheVBhZ2UgPSBmdW5jdGlvbiBvdmVybGF5UGFnZShlZGl0b3IsIGNvbnRlbnRFbGVtZW50LCBjYWxsYmFjaykge1xuICAgIHZhciBjbG9zZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB2YXIgaWdub3JlRm9jdXNPdXQgPSBmYWxzZTtcblxuICAgIGZ1bmN0aW9uIGRvY3VtZW50RXNjTGlzdGVuZXIoZSkge1xuICAgICAgICBpZiAoZS5rZXlDb2RlID09PSAyNykge1xuICAgICAgICAgICAgY2xvc2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsb3NlKCkge1xuICAgICAgICBpZiAoIWNsb3NlcikgcmV0dXJuO1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZG9jdW1lbnRFc2NMaXN0ZW5lcik7XG4gICAgICAgIGNsb3Nlci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGNsb3Nlcik7XG4gICAgICAgIGlmIChlZGl0b3IpIHtcbiAgICAgICAgICAgIGVkaXRvci5mb2N1cygpO1xuICAgICAgICB9XG4gICAgICAgIGNsb3NlciA9IG51bGw7XG4gICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKCk7XG4gICAgfVxuXG4gICAgIC8qKlxuICAgICAqIERlZmluZXMgd2hldGhlciBvdmVybGF5IGlzIGNsb3NlZCB3aGVuIHVzZXIgY2xpY2tzIG91dHNpZGUgb2YgaXQuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBpZ25vcmUgICAgICBJZiBzZXQgdG8gdHJ1ZSBvdmVybGF5IHN0YXlzIG9wZW4gd2hlbiBmb2N1cyBtb3ZlcyB0byBhbm90aGVyIHBhcnQgb2YgdGhlIGVkaXRvci5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzZXRJZ25vcmVGb2N1c091dChpZ25vcmUpIHtcbiAgICAgICAgaWdub3JlRm9jdXNPdXQgPSBpZ25vcmU7XG4gICAgICAgIGlmIChpZ25vcmUpIHtcbiAgICAgICAgICAgIGNsb3Nlci5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJub25lXCI7XG4gICAgICAgICAgICBjb250ZW50RWxlbWVudC5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJhdXRvXCI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbG9zZXIuc3R5bGUuY3NzVGV4dCA9ICdtYXJnaW46IDA7IHBhZGRpbmc6IDA7ICcgK1xuICAgICAgICAncG9zaXRpb246IGZpeGVkOyB0b3A6MDsgYm90dG9tOjA7IGxlZnQ6MDsgcmlnaHQ6MDsnICtcbiAgICAgICAgJ3otaW5kZXg6IDk5OTA7ICcgK1xuICAgICAgICAoZWRpdG9yID8gJ2JhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4zKTsnIDogJycpO1xuICAgIGNsb3Nlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKCFpZ25vcmVGb2N1c091dCkge1xuICAgICAgICAgICAgY2xvc2UoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIC8vIGNsaWNrIGNsb3NlciBpZiBlc2Mga2V5IGlzIHByZXNzZWRcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZG9jdW1lbnRFc2NMaXN0ZW5lcik7XG5cbiAgICBjb250ZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSk7XG5cbiAgICBjbG9zZXIuYXBwZW5kQ2hpbGQoY29udGVudEVsZW1lbnQpO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY2xvc2VyKTtcbiAgICBpZiAoZWRpdG9yKSB7XG4gICAgICAgIGVkaXRvci5ibHVyKCk7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIGNsb3NlOiBjbG9zZSxcbiAgICAgICAgc2V0SWdub3JlRm9jdXNPdXQ6IHNldElnbm9yZUZvY3VzT3V0XG4gICAgfTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGAjYWNlX3NldHRpbmdzbWVudSwgI2tic2hvcnRjdXRtZW51IHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRjdGN0Y3O1xuICAgIGNvbG9yOiBibGFjaztcbiAgICBib3gtc2hhZG93OiAtNXB4IDRweCA1cHggcmdiYSgxMjYsIDEyNiwgMTI2LCAwLjU1KTtcbiAgICBwYWRkaW5nOiAxZW0gMC41ZW0gMmVtIDFlbTtcbiAgICBvdmVyZmxvdzogYXV0bztcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgbWFyZ2luOiAwO1xuICAgIGJvdHRvbTogMDtcbiAgICByaWdodDogMDtcbiAgICB0b3A6IDA7XG4gICAgei1pbmRleDogOTk5MTtcbiAgICBjdXJzb3I6IGRlZmF1bHQ7XG59XG5cbi5hY2VfZGFyayAjYWNlX3NldHRpbmdzbWVudSwgLmFjZV9kYXJrICNrYnNob3J0Y3V0bWVudSB7XG4gICAgYm94LXNoYWRvdzogLTIwcHggMTBweCAyNXB4IHJnYmEoMTI2LCAxMjYsIDEyNiwgMC4yNSk7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjYpO1xuICAgIGNvbG9yOiBibGFjaztcbn1cblxuLmFjZV9vcHRpb25zTWVudUVudHJ5OmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDEwMCwgMTAwLCAxMDAsIDAuMSk7XG4gICAgdHJhbnNpdGlvbjogYWxsIDAuM3Ncbn1cblxuLmFjZV9jbG9zZUJ1dHRvbiB7XG4gICAgYmFja2dyb3VuZDogcmdiYSgyNDUsIDE0NiwgMTQ2LCAwLjUpO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkICNGNDhBOEE7XG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgIHBhZGRpbmc6IDdweDtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgcmlnaHQ6IC04cHg7XG4gICAgdG9wOiAtOHB4O1xuICAgIHotaW5kZXg6IDEwMDAwMDtcbn1cbi5hY2VfY2xvc2VCdXR0b257XG4gICAgYmFja2dyb3VuZDogcmdiYSgyNDUsIDE0NiwgMTQ2LCAwLjkpO1xufVxuLmFjZV9vcHRpb25zTWVudUtleSB7XG4gICAgY29sb3I6IGRhcmtzbGF0ZWJsdWU7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG4uYWNlX29wdGlvbnNNZW51Q29tbWFuZCB7XG4gICAgY29sb3I6IGRhcmtjeWFuO1xuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG59XG4uYWNlX29wdGlvbnNNZW51RW50cnkgaW5wdXQsIC5hY2Vfb3B0aW9uc01lbnVFbnRyeSBidXR0b24ge1xuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG59XG5cbi5hY2Vfb3B0aW9uc01lbnVFbnRyeSBidXR0b25bYWNlX3NlbGVjdGVkX2J1dHRvbj10cnVlXSB7XG4gICAgYmFja2dyb3VuZDogI2U3ZTdlNztcbiAgICBib3gtc2hhZG93OiAxcHggMHB4IDJweCAwcHggI2FkYWRhZCBpbnNldDtcbiAgICBib3JkZXItY29sb3I6ICNhZGFkYWQ7XG59XG4uYWNlX29wdGlvbnNNZW51RW50cnkgYnV0dG9uIHtcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgICBib3JkZXI6IDFweCBzb2xpZCBsaWdodGdyYXk7XG4gICAgbWFyZ2luOiAwcHg7XG59XG4uYWNlX29wdGlvbnNNZW51RW50cnkgYnV0dG9uOmhvdmVye1xuICAgIGJhY2tncm91bmQ6ICNmMGYwZjA7XG59YDtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==