import { t as __commonJSMin } from "./modulepreload-polyfill-DxDZhch-.js";
import { t as require_editor } from "./editor-Wm2F5SNl.js";
import { t as require_overlay_page } from "./overlay_page-CYcCFe6L.js";
import { t as require_options } from "./options-W9Z4LSID.js";
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
