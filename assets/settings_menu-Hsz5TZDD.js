import { t as __commonJSMin } from "./chunk-Cu_MO8PN.js";
import "./useragent-BMYEMUd9.js";
import "./dom-DRNmwCmL.js";
import "./range-BakcZ9jR.js";
import "./lang-Chfjzp5y.js";
import "./keys-CNbBglaM.js";
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
import "./modelist-rRWjg926.js";
import { t as require_overlay_page } from "./overlay_page-DPGBlun0.js";
import "./themelist-PeREjR7d.js";
import { t as require_options } from "./options-BnQBMT1T.js";
//#region node_modules/ace-code/src/ext/settings_menu.js
/**
* ## Interactive Settings Menu Extension
*
* Provides settings interface for the Ace editor that displays dynamically generated configuration options based on
* the current editor state. The menu appears as an overlay panel allowing users to modify editor options, themes,
* modes, and other settings through an intuitive graphical interface.
*
* **Usage:**
* ```javascript
* editor.showSettingsMenu();
* ```
*
* The extension automatically registers the `showSettingsMenu` command and method
* on the editor instance when initialized.
*
* @author <a href="mailto:matthewkastor@gmail.com">
*  Matthew Christopher Kastor-Inare III </a><br />
*
* @module
*/
var require_settings_menu = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var OptionPanel = require_options().OptionPanel;
	var overlayPage = require_overlay_page().overlayPage;
	/**
	* This displays the settings menu if it is not already being shown.
	* @author <a href="mailto:matthewkastor@gmail.com">
	*  Matthew Christopher Kastor-Inare III </a><br />
	*  ☭ Hial Atropa!! ☭
	* @param {import("../editor").Editor} editor An instance of the ace editor.
	*/
	function showSettingsMenu(editor) {
		if (!document.getElementById("ace_settingsmenu")) {
			var options = new OptionPanel(editor);
			options.render();
			options.container.id = "ace_settingsmenu";
			overlayPage(editor, options.container);
			options.container.querySelector("select,input,button,checkbox").focus();
		}
	}
	/**
	* Initializes the settings menu extension. It adds the showSettingsMenu
	*  method to the given editor object and adds the showSettingsMenu command
	*  to the editor with appropriate keyboard shortcuts.
	*/
	module.exports.init = function() {
		var Editor = require_editor().Editor;
		Editor.prototype.showSettingsMenu = function() {
			showSettingsMenu(this);
		};
	};
}));
//#endregion
export default require_settings_menu();
