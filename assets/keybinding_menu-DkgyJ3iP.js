import { t as __commonJSMin } from "./chunk-iA-Slpst.js";
import "./useragent-BODERP_7.js";
import "./dom-BBjJ92-n.js";
import "./range-BUVqNbwc.js";
import "./lang-DcNOSqFo.js";
import { t as require_keys } from "./keys-B8CLTATX.js";
import "./event-BcX-N72I.js";
import "./config-DPm1ug3B.js";
import "./event_emitter-BGfSYA24.js";
import "./textmate-zFNmb5zU.js";
import { t as require_editor } from "./editor-BiOsjB7l.js";
import "./edit_session-CDHRvoey.js";
import "./tooltip-DAauyLxM.js";
import "./tokenizer-C2b-GJMk.js";
import "./text-B9A1mx6l.js";
import "./token_iterator-CbfYmntj.js";
import "./hash_handler-G_6vQiwI.js";
import { t as require_overlay_page } from "./overlay_page-CbLUm6_m.js";
var require_get_editor_keyboard_shortcuts = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var keys = require_keys();
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
var require_keybinding_menu = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var Editor = require_editor().Editor;
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
			exec: function(editor$1, line) {
				editor$1.showKeyboardShortcuts();
			}
		}]);
	};
}));
export default require_keybinding_menu();
