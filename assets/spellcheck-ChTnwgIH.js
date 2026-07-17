import { t as __commonJSMin } from "./modulepreload-polyfill-DxDZhch-.js";
import { t as require_event } from "./event-yw4gTQwY.js";
import { t as require_config } from "./config-i4E5_Mdd.js";
import { t as require_editor } from "./editor-Wm2F5SNl.js";
//#region node_modules/ace-code/src/ext/spellcheck.js
/**
* ## Browser spellcheck integration extension for native spelling correction
*
* Provides seamless integration with browser's native spellcheck functionality through context menu interactions.
* Enables right-click spelling suggestions on misspelled words while preserving editor functionality and text input
* handling. The extension bridges browser spellcheck capabilities with the editor's text manipulation system.
*
* **Enable:** `editor.setOption("spellcheck", true)` (enabled by default)
* or configure it during editor initialization in the options object.
*
* @module
*/
var require_spellcheck = /* @__PURE__ */ __commonJSMin(((exports) => {
	var event = require_event();
	/**
	* Handles context menu events for spellcheck integration by setting up a hidden input field
	* with the word at cursor position to trigger browser spellcheck suggestions.
	* @param {any} e - The context menu event
	*/
	exports.contextMenuHandler = function(e) {
		var host = e.target;
		var text = host.textInput.getElement();
		if (!host.selection.isEmpty()) return;
		var c = host.getCursorPosition();
		var r = host.session.getWordRange(c.row, c.column);
		var w = host.session.getTextRange(r);
		host.session.tokenRe.lastIndex = 0;
		if (!host.session.tokenRe.test(w)) return;
		var PLACEHOLDER = "";
		var value = w + " " + PLACEHOLDER;
		text.value = value;
		text.setSelectionRange(w.length, w.length + 1);
		text.setSelectionRange(0, 0);
		text.setSelectionRange(0, w.length);
		var afterKeydown = false;
		event.addListener(text, "keydown", function onKeydown() {
			event.removeListener(text, "keydown", onKeydown);
			afterKeydown = true;
		});
		host.textInput.setInputHandler(function(newVal) {
			if (newVal == value) return "";
			if (newVal.lastIndexOf(value, 0) === 0) return newVal.slice(value.length);
			if (newVal.substr(text.selectionEnd) == value) return newVal.slice(0, -value.length);
			if (newVal.slice(-2) == PLACEHOLDER) {
				var val = newVal.slice(0, -2);
				if (val.slice(-1) == " ") {
					if (afterKeydown) return val.substring(0, text.selectionEnd);
					val = val.slice(0, -1);
					host.session.replace(r, val);
					return "";
				}
			}
			return newVal;
		});
	};
	var Editor = require_editor().Editor;
	require_config().defineOptions(Editor.prototype, "editor", { spellcheck: {
		set: function(val) {
			var text = this.textInput.getElement();
			text.spellcheck = !!val;
			if (!val) this.removeListener("nativecontextmenu", exports.contextMenuHandler);
			else this.on("nativecontextmenu", exports.contextMenuHandler);
		},
		value: true
	} });
}));
//#endregion
export default require_spellcheck();
