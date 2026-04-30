import { t as __commonJSMin } from "./chunk-Cu_MO8PN.js";
import "./useragent-BMYEMUd9.js";
import "./dom-DRNmwCmL.js";
import "./range-BakcZ9jR.js";
import "./lang-Chfjzp5y.js";
import { t as require_keys } from "./keys-CNbBglaM.js";
import "./event-Crda3qyq.js";
import "./config-7GJDZd_b.js";
import "./event_emitter-r-lZpQyf.js";
import "./textmate-CN2VrF7f.js";
import { t as require_editor } from "./editor-ImsyhaOB.js";
import "./edit_session-DAgqly_m.js";
import "./tooltip-BuOUCQpw.js";
import "./tokenizer-B5s1nUwH.js";
import "./text-D8sm5DzM.js";
import "./token_iterator-BNxpI84f.js";
import "./hash_handler-DWXab_Mk.js";
import { t as require_overlay_page } from "./overlay_page-Beftftev.js";
//#region node_modules/ace-code/src/ext/menu_tools/get_editor_keyboard_shortcuts.js
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
var require_get_editor_keyboard_shortcuts = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/** @type{any} */ var keys = require_keys();
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
	module.exports.getEditorKeybordShortcuts = function(editor) {
		keys.KEY_MODS;
		var keybindings = [];
		var commandMap = {};
		editor.keyBinding.$handlers.forEach(function(handler) {
			var ckb = handler["commandKeyBinding"];
			for (var i in ckb) {
				var key = i.replace(/(^|-)\w/g, function(x) {
					return x.toUpperCase();
				});
				var commands = ckb[i];
				if (!Array.isArray(commands)) commands = [commands];
				commands.forEach(function(command) {
					if (typeof command != "string") command = command.name;
					if (commandMap[command]) commandMap[command].key += "|" + key;
					else {
						commandMap[command] = {
							key,
							command
						};
						keybindings.push(commandMap[command]);
					}
				});
			}
		});
		return keybindings;
	};
}));
//#endregion
//#region node_modules/ace-code/src/ext/keybinding_menu.js
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
var require_keybinding_menu = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Editor = require_editor().Editor;
	/**
	* Generates a menu which displays the keyboard shortcuts.
	* @author <a href="mailto:matthewkastor@gmail.com">
	*  Matthew Christopher Kastor-Inare III </a><br />
	*  ☭ Hial Atropa!! ☭
	* @param {Editor} editor An instance of the ace editor.
	*/
	function showKeyboardShortcuts(editor) {
		if (!document.getElementById("kbshortcutmenu")) {
			var overlayPage = require_overlay_page().overlayPage;
			var getEditorKeybordShortcuts = require_get_editor_keyboard_shortcuts().getEditorKeybordShortcuts;
			var kb = getEditorKeybordShortcuts(editor);
			var el = document.createElement("div");
			var commands = kb.reduce(function(previous, current) {
				return previous + "<div class=\"ace_optionsMenuEntry\"><span class=\"ace_optionsMenuCommand\">" + current.command + "</span> : <span class=\"ace_optionsMenuKey\">" + current.key + "</span></div>";
			}, "");
			el.id = "kbshortcutmenu";
			el.innerHTML = "<h1>Keyboard Shortcuts</h1>" + commands + "</div>";
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
	module.exports.init = function(editor) {
		Editor.prototype.showKeyboardShortcuts = function() {
			showKeyboardShortcuts(this);
		};
		editor.commands.addCommands([{
			name: "showKeyboardShortcuts",
			bindKey: {
				win: "Ctrl-Alt-h",
				mac: "Command-Alt-h"
			},
			exec: function(editor, line) {
				editor.showKeyboardShortcuts();
			}
		}]);
	};
}));
//#endregion
export default require_keybinding_menu();
