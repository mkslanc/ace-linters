import { t as __commonJSMin } from "./chunk-iA-Slpst.js";
import "./useragent-BODERP_7.js";
import "./dom-BBjJ92-n.js";
import "./range-BUVqNbwc.js";
import "./lang-DcNOSqFo.js";
import "./keys-B8CLTATX.js";
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
import "./themelist-DhHkwAw-.js";
import { t as require_options } from "./options-CZG8ghly.js";
var require_settings_menu = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var OptionPanel = require_options().OptionPanel;
	var overlayPage = require_overlay_page().overlayPage;
	function showSettingsMenu(editor) {
		if (!document.getElementById("ace_settingsmenu")) {
			var options = new OptionPanel(editor);
			options.render();
			options.container.id = "ace_settingsmenu";
			overlayPage(editor, options.container);
			options.container.querySelector("select,input,button,checkbox").focus();
		}
	}
	module.exports.init = function() {
		var Editor = require_editor().Editor;
		Editor.prototype.showSettingsMenu = function() {
			showSettingsMenu(this);
		};
	};
}));
export default require_settings_menu();
