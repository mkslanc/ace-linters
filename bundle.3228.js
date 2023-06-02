(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[3228],{

/***/ 83228:
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

    
    var Editor = (__webpack_require__(82880)/* .Editor */ .M);
    /**
     * Generates a menu which displays the keyboard shortcuts.
     * @author <a href="mailto:matthewkastor@gmail.com">
     *  Matthew Christopher Kastor-Inare III </a><br />
     *  ☭ Hial Atropa!! ☭
     * @param {ace.Editor} editor An instance of the ace editor.
     */
    function showKeyboardShortcuts (editor) {
        // make sure the menu isn't open already.
        if(!document.getElementById('kbshortcutmenu')) {
            var overlayPage = (__webpack_require__(9613).overlayPage);
            var getEditorKeybordShortcuts = (__webpack_require__(26991)/* .getEditorKeybordShortcuts */ .F);
            var kb = getEditorKeybordShortcuts(editor);
            var el = document.createElement('div');
            var commands = kb.reduce(function(previous, current) {
                return previous + '<div class="ace_optionsMenuEntry"><span class="ace_optionsMenuCommand">' 
                    + current.command + '</span> : '
                    + '<span class="ace_optionsMenuKey">' + current.key + '</span></div>';
            }, '');

            el.id = 'kbshortcutmenu';
            el.innerHTML = '<h1>Keyboard Shortcuts</h1>' + commands + '</div>';
            overlayPage(editor, el);
        }
    }
    module.exports.init = function(editor) {
        Editor.prototype.showKeyboardShortcuts = function() {
            showKeyboardShortcuts(this);
        };
        editor.commands.addCommands([{
            name: "showKeyboardShortcuts",
            bindKey: {win: "Ctrl-Alt-h", mac: "Command-Alt-h"},
            exec: function(editor, line) {
                editor.showKeyboardShortcuts();
            }
        }]);
    };


/***/ }),

/***/ 26991:
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


var keys = __webpack_require__(11797);

/**
 * Gets a map of keyboard shortcuts to command names for the current platform.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @param {ace.Editor} editor An editor instance.
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
module.exports.F = function(editor) {
    var KEY_MODS = keys.KEY_MODS;
    var keybindings = [];
    var commandMap = {};
    editor.keyBinding.$handlers.forEach(function(handler) {
        var ckb = handler.commandKeyBinding;
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

/***/ 9613:
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


var dom = __webpack_require__(6359);
var cssText = __webpack_require__(10221);
dom.importCssString(cssText, "settings_menu.css", false);

/**
 * Generates an overlay for displaying menus. The overlay is an absolutely
 *  positioned div.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @param {Element} contentElement Any element which may be presented inside
 *  a div.
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

/***/ 10221:
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
//# sourceMappingURL=bundle.3228.js.map