import { t as __commonJSMin } from "./chunk-iA-Slpst.js";
import { t as require_useragent } from "./useragent-BODERP_7.js";
import "./dom-BBjJ92-n.js";
import "./range-BUVqNbwc.js";
import "./lang-DcNOSqFo.js";
import "./keys-B8CLTATX.js";
import { t as require_event } from "./event-BcX-N72I.js";
import "./config-DPm1ug3B.js";
import "./event_emitter-BGfSYA24.js";
import "./textmate-zFNmb5zU.js";
import "./editor-BiOsjB7l.js";
import "./edit_session-CDHRvoey.js";
import "./tooltip-DAauyLxM.js";
import "./tokenizer-C2b-GJMk.js";
import "./text-B9A1mx6l.js";
import "./token_iterator-CbfYmntj.js";
import "./hash_handler-G_6vQiwI.js";
import "./text-DOzSnOss.js";
import "./virtual_renderer-xL5PfPPr.js";
import { t as require_ace } from "./ace-BNoj2zEj.js";
import "./multi_select-B30HHNMb.js";
import "./fold_mode-D1xG2KFM.js";
import "./error_marker-BBMov5iD.js";
var require_textarea = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var event = require_event();
	var UA = require_useragent();
	var ace = require_ace();
	module.exports = exports = ace;
	var getCSSProperty = function(element, container, property) {
		var ret = element.style[property];
		if (!ret) if (window.getComputedStyle) ret = window.getComputedStyle(element, "").getPropertyValue(property);
		else ret = element.currentStyle[property];
		if (!ret || ret == "auto" || ret == "intrinsic") ret = container.style[property];
		return ret;
	};
	function applyStyles(elm, styles) {
		for (var style in styles) elm.style[style] = styles[style];
	}
	function setupContainer(element, getValue) {
		if (element.type != "textarea") throw new Error("Textarea required!");
		var parentNode = element.parentNode;
		var container = document.createElement("div");
		var resizeEvent = function() {
			var style = "position:relative;";
			[
				"margin-top",
				"margin-left",
				"margin-right",
				"margin-bottom"
			].forEach(function(item) {
				style += item + ":" + getCSSProperty(element, container, item) + ";";
			});
			var width = getCSSProperty(element, container, "width") || element.clientWidth + "px";
			var height = getCSSProperty(element, container, "height") || element.clientHeight + "px";
			style += "height:" + height + ";width:" + width + ";";
			style += "display:inline-block;";
			container.style.cssText = style;
		};
		event.addListener(window, "resize", resizeEvent);
		resizeEvent();
		parentNode.insertBefore(container, element.nextSibling);
		while (parentNode !== document) {
			if (parentNode.tagName.toUpperCase() === "FORM") {
				var oldSumit = parentNode.onsubmit;
				parentNode.onsubmit = function(evt) {
					element.value = getValue();
					if (oldSumit) oldSumit.call(this, evt);
				};
				break;
			}
			parentNode = parentNode.parentNode;
		}
		return container;
	}
	exports.transformTextarea = function(element, options) {
		var isFocused = element.autofocus || document.activeElement == element;
		var session;
		var container = setupContainer(element, function() {
			return session.getValue();
		});
		element.style.display = "none";
		container.style.background = "white";
		var editorDiv = document.createElement("div");
		applyStyles(editorDiv, {
			top: "0px",
			left: "0px",
			right: "0px",
			bottom: "0px",
			border: "1px solid gray",
			position: "absolute"
		});
		container.appendChild(editorDiv);
		var settingOpener = document.createElement("div");
		applyStyles(settingOpener, {
			position: "absolute",
			right: "0px",
			bottom: "0px",
			cursor: "nw-resize",
			border: "solid 9px",
			borderColor: "lightblue gray gray #ceade6",
			zIndex: 101
		});
		var settingDiv = document.createElement("div");
		var settingDivStyles = {
			top: "0px",
			left: "20%",
			right: "0px",
			bottom: "0px",
			position: "absolute",
			padding: "5px",
			zIndex: 100,
			color: "white",
			display: "none",
			overflow: "auto",
			fontSize: "14px",
			boxShadow: "-5px 2px 3px gray"
		};
		if (!UA.isOldIE) settingDivStyles.backgroundColor = "rgba(0, 0, 0, 0.6)";
		else settingDivStyles.backgroundColor = "#333";
		applyStyles(settingDiv, settingDivStyles);
		container.appendChild(settingDiv);
		options = options || exports.defaultOptions;
		var editor = ace.edit(editorDiv);
		session = editor.getSession();
		session.setValue(element.value || element.innerHTML);
		if (isFocused) editor.focus();
		container.appendChild(settingOpener);
		setupApi(editor, editorDiv, settingDiv, ace, options);
		setupSettingPanel(settingDiv, settingOpener, editor);
		var state = "";
		event.addListener(settingOpener, "mousemove", function(e) {
			var rect = this.getBoundingClientRect();
			if (e.clientX - rect.left + (e.clientY - rect.top) < (rect.width + rect.height) / 2) {
				this.style.cursor = "pointer";
				state = "toggle";
			} else {
				state = "resize";
				this.style.cursor = "nw-resize";
			}
		});
		event.addListener(settingOpener, "mousedown", function(e) {
			e.preventDefault();
			if (state == "toggle") {
				editor.setDisplaySettings();
				return;
			}
			container.style.zIndex = "100000";
			var rect = container.getBoundingClientRect();
			var startX = rect.width + rect.left - e.clientX;
			var startY = rect.height + rect.top - e.clientY;
			event.capture(settingOpener, function(e$1) {
				container.style.width = e$1.clientX - rect.left + startX + "px";
				container.style.height = e$1.clientY - rect.top + startY + "px";
				editor.resize();
			}, function() {});
		});
		return editor;
	};
	function setupApi(editor, editorDiv, settingDiv, ace$1, options) {
		function toBool(value) {
			return value === "true" || value == true;
		}
		editor.setDisplaySettings = function(display) {
			if (display == null) display = settingDiv.style.display == "none";
			if (display) {
				settingDiv.style.display = "block";
				settingDiv.hideButton.focus();
				editor.on("focus", function onFocus() {
					editor.removeListener("focus", onFocus);
					settingDiv.style.display = "none";
				});
			} else editor.focus();
		};
		editor.$setOption = editor.setOption;
		editor.$getOption = editor.getOption;
		editor.setOption = function(key, value) {
			switch (key) {
				case "mode":
					editor.$setOption("mode", "ace/mode/" + value);
					break;
				case "theme":
					editor.$setOption("theme", "ace/theme/" + value);
					break;
				case "keybindings":
					switch (value) {
						case "vim":
							editor.setKeyboardHandler("ace/keyboard/vim");
							break;
						case "emacs":
							editor.setKeyboardHandler("ace/keyboard/emacs");
							break;
						default: editor.setKeyboardHandler(null);
					}
					break;
				case "wrap":
				case "fontSize":
					editor.$setOption(key, value);
					break;
				default: editor.$setOption(key, toBool(value));
			}
		};
		editor.getOption = function(key) {
			switch (key) {
				case "mode": return editor.$getOption("mode").substr(9);
				case "theme": return editor.$getOption("theme").substr(10);
				case "keybindings":
					var value = editor.getKeyboardHandler();
					switch (value && value.$id) {
						case "ace/keyboard/vim": return "vim";
						case "ace/keyboard/emacs": return "emacs";
						default: return "ace";
					}
					break;
				default: return editor.$getOption(key);
			}
		};
		editor.setOptions(options);
		return editor;
	}
	function setupSettingPanel(settingDiv, settingOpener, editor) {
		var BOOL = null;
		var desc = {
			mode: "Mode:",
			wrap: "Soft Wrap:",
			theme: "Theme:",
			fontSize: "Font Size:",
			showGutter: "Display Gutter:",
			keybindings: "Keyboard",
			showPrintMargin: "Show Print Margin:",
			useSoftTabs: "Use Soft Tabs:",
			showInvisibles: "Show Invisibles"
		};
		var optionValues = {
			mode: {
				text: "Plain",
				javascript: "JavaScript",
				xml: "XML",
				html: "HTML",
				css: "CSS",
				scss: "SCSS",
				python: "Python",
				php: "PHP",
				java: "Java",
				ruby: "Ruby",
				c_cpp: "C/C++",
				coffee: "CoffeeScript",
				json: "json",
				perl: "Perl",
				clojure: "Clojure",
				ocaml: "OCaml",
				csharp: "C#",
				haxe: "haXe",
				svg: "SVG",
				textile: "Textile",
				groovy: "Groovy",
				liquid: "Liquid",
				Scala: "Scala"
			},
			theme: {
				clouds: "Clouds",
				clouds_midnight: "Clouds Midnight",
				cobalt: "Cobalt",
				crimson_editor: "Crimson Editor",
				dawn: "Dawn",
				gob: "Green on Black",
				eclipse: "Eclipse",
				idle_fingers: "Idle Fingers",
				kr_theme: "Kr Theme",
				merbivore: "Merbivore",
				merbivore_soft: "Merbivore Soft",
				mono_industrial: "Mono Industrial",
				monokai: "Monokai",
				pastel_on_dark: "Pastel On Dark",
				solarized_dark: "Solarized Dark",
				solarized_light: "Solarized Light",
				textmate: "Textmate",
				twilight: "Twilight",
				vibrant_ink: "Vibrant Ink"
			},
			showGutter: BOOL,
			fontSize: {
				"10px": "10px",
				"11px": "11px",
				"12px": "12px",
				"14px": "14px",
				"16px": "16px"
			},
			wrap: {
				off: "Off",
				40: "40",
				80: "80",
				free: "Free"
			},
			keybindings: {
				ace: "ace",
				vim: "vim",
				emacs: "emacs"
			},
			showPrintMargin: BOOL,
			useSoftTabs: BOOL,
			showInvisibles: BOOL
		};
		var table = [];
		table.push("<table><tr><th>Setting</th><th>Value</th></tr>");
		function renderOption(builder, option$1, obj, cValue) {
			if (!obj) {
				builder.push("<input type='checkbox' title='", option$1, "' ", cValue + "" == "true" ? "checked='true'" : "", "'></input>");
				return;
			}
			builder.push("<select title='" + option$1 + "'>");
			for (var value in obj) {
				builder.push("<option value='" + value + "' ");
				if (cValue == value) builder.push(" selected ");
				builder.push(">", obj[value], "</option>");
			}
			builder.push("</select>");
		}
		for (var option in exports.defaultOptions) {
			table.push("<tr><td>", desc[option], "</td>");
			table.push("<td>");
			renderOption(table, option, optionValues[option], editor.getOption(option));
			table.push("</td></tr>");
		}
		table.push("</table>");
		settingDiv.innerHTML = table.join("");
		var onChange = function(e) {
			var select = e.currentTarget;
			editor.setOption(select.title, select.value);
		};
		var onClick = function(e) {
			var cb = e.currentTarget;
			editor.setOption(cb.title, cb.checked);
		};
		var selects = settingDiv.getElementsByTagName("select");
		for (var i = 0; i < selects.length; i++) selects[i].onchange = onChange;
		var cbs = settingDiv.getElementsByTagName("input");
		for (var i = 0; i < cbs.length; i++) cbs[i].onclick = onClick;
		var button = document.createElement("input");
		button.type = "button";
		button.value = "Hide";
		event.addListener(button, "click", function() {
			editor.setDisplaySettings(false);
		});
		settingDiv.appendChild(button);
		settingDiv.hideButton = button;
	}
	exports.defaultOptions = {
		mode: "javascript",
		theme: "textmate",
		wrap: "off",
		fontSize: "12px",
		showGutter: "false",
		keybindings: "ace",
		showPrintMargin: "false",
		useSoftTabs: "true",
		showInvisibles: "false"
	};
}));
export default require_textarea();
