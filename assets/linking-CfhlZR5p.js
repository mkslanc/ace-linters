import { t as __commonJSMin } from "./chunk-iA-Slpst.js";
import "./useragent-BODERP_7.js";
import "./dom-BBjJ92-n.js";
import "./range-BUVqNbwc.js";
import "./lang-DcNOSqFo.js";
import "./keys-B8CLTATX.js";
import "./event-BcX-N72I.js";
import { t as require_config } from "./config-DPm1ug3B.js";
import "./event_emitter-BGfSYA24.js";
import "./textmate-zFNmb5zU.js";
import { t as require_editor } from "./editor-BiOsjB7l.js";
import "./edit_session-CDHRvoey.js";
import "./tooltip-DAauyLxM.js";
import "./tokenizer-C2b-GJMk.js";
import "./text-B9A1mx6l.js";
import "./token_iterator-CbfYmntj.js";
import "./hash_handler-G_6vQiwI.js";
var require_linking = /* @__PURE__ */ __commonJSMin(((exports) => {
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
export default require_linking();
