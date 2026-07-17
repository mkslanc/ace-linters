import { t as __commonJSMin } from "./modulepreload-polyfill-DxDZhch-.js";
import { t as require_config } from "./config-i4E5_Mdd.js";
import { t as require_editor } from "./editor-Wm2F5SNl.js";
//#region node_modules/ace-code/src/ext/linking.js
var require_linking = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* ## Interactive Linking Extension
	*
	* Enables clickable links and hover interactions in the editor when the Control key is pressed. Provides
	* keyboard-accelerated navigation by detecting tokens under the cursor and emitting custom events that can be handled
	* by external code to implement go-to-definition, symbol navigation, or other link-based functionality.
	*
	* **Enable:** `editor.setOption("enableLinking", true)`
	* @module
	*/
	var Editor = require_editor().Editor;
	require_config().defineOptions(Editor.prototype, "editor", { enableLinking: {
		set: function(val) {
			if (val) {
				this.on("click", onClick);
				this.on("mousemove", onMouseMove);
			} else {
				this.off("click", onClick);
				this.off("mousemove", onMouseMove);
			}
		},
		value: false
	} });
	exports.previousLinkingHover = false;
	function onMouseMove(e) {
		var editor = e.editor;
		if (e.getAccelKey()) {
			var editor = e.editor;
			var docPos = e.getDocumentPosition();
			var token = editor.session.getTokenAt(docPos.row, docPos.column);
			if (exports.previousLinkingHover && exports.previousLinkingHover != token) editor._emit("linkHoverOut");
			editor._emit("linkHover", {
				position: docPos,
				token
			});
			exports.previousLinkingHover = token;
		} else if (exports.previousLinkingHover) {
			editor._emit("linkHoverOut");
			exports.previousLinkingHover = false;
		}
	}
	function onClick(e) {
		var ctrl = e.getAccelKey();
		if (e.getButton() == 0 && ctrl) {
			var editor = e.editor;
			var docPos = e.getDocumentPosition();
			var token = editor.session.getTokenAt(docPos.row, docPos.column);
			editor._emit("linkClick", {
				position: docPos,
				token
			});
		}
	}
}));
//#endregion
export default require_linking();
