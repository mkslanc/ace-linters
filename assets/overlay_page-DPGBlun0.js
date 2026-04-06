import { t as __commonJSMin } from "./chunk-Cu_MO8PN.js";
import { t as require_dom } from "./dom-DRNmwCmL.js";
//#region node_modules/ace-code/src/ext/menu_tools/settings_menu.css.js
var require_settings_menu_css = /* @__PURE__ */ __commonJSMin(((exports, module) => {
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
}));
//#endregion
//#region node_modules/ace-code/src/ext/menu_tools/overlay_page.js
/**
* ## Overlay Page utility
*
* Provides modal overlay functionality for displaying editor extension interfaces. Creates a full-screen overlay with
* configurable backdrop behavior, keyboard navigation (ESC to close), and focus management. Used by various extensions
* to display menus, settings panels, and other interactive content over the editor interface.
*
* **Usage:**
* ```javascript
* var overlayPage = require('./overlay_page').overlayPage;
* var contentElement = document.createElement('div');
* contentElement.innerHTML = '<h1>Settings</h1>';
*
* var overlay = overlayPage(editor, contentElement, function() {
*   console.log('Overlay closed');
* });
* ```
*
* @module
*/
var require_overlay_page = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var dom = require_dom();
	var cssText = require_settings_menu_css();
	dom.importCssString(cssText, "settings_menu.css", false);
	/**
	* Generates an overlay for displaying menus. The overlay is an absolutely
	*  positioned div.
	* @author <a href="mailto:matthewkastor@gmail.com">
	*  Matthew Christopher Kastor-Inare III </a><br />
	*  ☭ Hial Atropa!! ☭
	* @param {import("../../editor").Editor} editor
	* @param {HTMLElement} contentElement Any element which may be presented inside
	*  a div.
	* @param {() => void} [callback]
	*/
	module.exports.overlayPage = function overlayPage(editor, contentElement, callback) {
		var closer = document.createElement("div");
		var ignoreFocusOut = false;
		function documentEscListener(e) {
			if (e.keyCode === 27) close();
		}
		function close() {
			if (!closer) return;
			document.removeEventListener("keydown", documentEscListener);
			closer.parentNode.removeChild(closer);
			if (editor) editor.focus();
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
		closer.style.cssText = "margin: 0; padding: 0; position: fixed; top:0; bottom:0; left:0; right:0;z-index: 9990; " + (editor ? "background-color: rgba(0, 0, 0, 0.3);" : "");
		closer.addEventListener("click", function(e) {
			if (!ignoreFocusOut) close();
		});
		document.addEventListener("keydown", documentEscListener);
		contentElement.addEventListener("click", function(e) {
			e.stopPropagation();
		});
		closer.appendChild(contentElement);
		document.body.appendChild(closer);
		if (editor) editor.blur();
		return {
			close,
			setIgnoreFocusOut
		};
	};
}));
//#endregion
export { require_overlay_page as t };
