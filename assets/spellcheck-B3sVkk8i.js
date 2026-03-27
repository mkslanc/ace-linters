import { t as __commonJSMin } from "./chunk-BLiWRsM1.js";
import "./useragent-Cm8O_vvb.js";
import "./dom-BmR1mTSl.js";
import "./range-D2fBS63W.js";
import "./lang-B3gWVpaj.js";
import "./keys-BcZo005C.js";
import { t as require_event } from "./event-Dotkamqq.js";
import { t as require_config } from "./config-D-BhsSyn.js";
import "./event_emitter-DQJDHkGW.js";
import "./textmate-7M3qxGeS.js";
import { t as require_editor } from "./editor-IG7gAR87.js";
import "./edit_session-BlcJnX8K.js";
import "./tooltip-CZS68mop.js";
import "./tokenizer-BFeMc3TI.js";
import "./text-x9TxHOMd.js";
import "./token_iterator-B0gzmLw-.js";
import "./hash_handler-qEoapM91.js";
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
