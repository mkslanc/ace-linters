import { t as __commonJSMin } from "./chunk-iA-Slpst.js";
import "./useragent-BODERP_7.js";
import { t as require_dom } from "./dom-BBjJ92-n.js";
import { t as require_oop } from "./oop-DcdK5Mrs.js";
import "./lang-DcNOSqFo.js";
import { t as require_config } from "./config-DPm1ug3B.js";
import { t as require_event_emitter } from "./event_emitter-BGfSYA24.js";
import "./textmate-zFNmb5zU.js";
import { t as require_modelist } from "./file-api-websockets-DsCjH-N2.js";
import { t as require_overlay_page } from "./overlay_page-CbLUm6_m.js";
import { t as require_themelist } from "./themelist-DhHkwAw-.js";
var require_options = /* @__PURE__ */ __commonJSMin(((exports) => {
	require_overlay_page();
	var dom = require_dom();
	var oop = require_oop();
	var config = require_config();
	var EventEmitter = require_event_emitter().EventEmitter;
	var buildDom = dom.buildDom;
	var modelist = require_modelist();
	var themelist = require_themelist();
	var themes = {
		Bright: [],
		Dark: []
	};
	themelist.themes.forEach(function(x) {
		themes[x.isDark ? "Dark" : "Bright"].push({
			caption: x.caption,
			value: x.theme
		});
	});
	var optionGroups = {
		Main: {
			Mode: {
				path: "mode",
				type: "select",
				items: modelist.modes.map(function(x) {
					return {
						caption: x.caption,
						value: x.mode
					};
				})
			},
			Theme: {
				path: "theme",
				type: "select",
				items: themes
			},
			"Keybinding": {
				type: "buttonBar",
				path: "keyboardHandler",
				items: [
					{
						caption: "Ace",
						value: null
					},
					{
						caption: "Vim",
						value: "ace/keyboard/vim"
					},
					{
						caption: "Emacs",
						value: "ace/keyboard/emacs"
					},
					{
						caption: "Sublime",
						value: "ace/keyboard/sublime"
					},
					{
						caption: "VSCode",
						value: "ace/keyboard/vscode"
					}
				]
			},
			"Font Size": {
				path: "fontSize",
				type: "number",
				defaultValue: 12,
				defaults: [{
					caption: "12px",
					value: 12
				}, {
					caption: "24px",
					value: 24
				}]
			},
			"Soft Wrap": {
				type: "buttonBar",
				path: "wrap",
				items: [
					{
						caption: "Off",
						value: "off"
					},
					{
						caption: "View",
						value: "free"
					},
					{
						caption: "margin",
						value: "printMargin"
					},
					{
						caption: "40",
						value: "40"
					}
				]
			},
			"Cursor Style": {
				path: "cursorStyle",
				items: [
					{
						caption: "Ace",
						value: "ace"
					},
					{
						caption: "Slim",
						value: "slim"
					},
					{
						caption: "Smooth",
						value: "smooth"
					},
					{
						caption: "Smooth And Slim",
						value: "smooth slim"
					},
					{
						caption: "Wide",
						value: "wide"
					}
				]
			},
			"Folding": {
				path: "foldStyle",
				items: [
					{
						caption: "Manual",
						value: "manual"
					},
					{
						caption: "Mark begin",
						value: "markbegin"
					},
					{
						caption: "Mark begin and end",
						value: "markbeginend"
					}
				]
			},
			"Soft Tabs": [{ path: "useSoftTabs" }, {
				ariaLabel: "Tab Size",
				path: "tabSize",
				type: "number",
				values: [
					2,
					3,
					4,
					8,
					16
				]
			}],
			"Overscroll": {
				type: "buttonBar",
				path: "scrollPastEnd",
				items: [
					{
						caption: "None",
						value: 0
					},
					{
						caption: "Half",
						value: .5
					},
					{
						caption: "Full",
						value: 1
					}
				]
			}
		},
		More: {
			"Atomic soft tabs": { path: "navigateWithinSoftTabs" },
			"Enable Behaviours": { path: "behavioursEnabled" },
			"Wrap with quotes": { path: "wrapBehavioursEnabled" },
			"Enable Auto Indent": { path: "enableAutoIndent" },
			"Full Line Selection": {
				type: "checkbox",
				values: "text|line",
				path: "selectionStyle"
			},
			"Highlight Active Line": { path: "highlightActiveLine" },
			"Show Invisibles": { path: "showInvisibles" },
			"Show Indent Guides": { path: "displayIndentGuides" },
			"Highlight Indent Guides": { path: "highlightIndentGuides" },
			"Persistent HScrollbar": { path: "hScrollBarAlwaysVisible" },
			"Persistent VScrollbar": { path: "vScrollBarAlwaysVisible" },
			"Animate scrolling": { path: "animatedScroll" },
			"Show Gutter": { path: "showGutter" },
			"Show Line Numbers": { path: "showLineNumbers" },
			"Relative Line Numbers": { path: "relativeLineNumbers" },
			"Fixed Gutter Width": { path: "fixedWidthGutter" },
			"Show Print Margin": [{ path: "showPrintMargin" }, {
				ariaLabel: "Print Margin",
				type: "number",
				path: "printMarginColumn"
			}],
			"Indented Soft Wrap": { path: "indentedSoftWrap" },
			"Highlight selected word": { path: "highlightSelectedWord" },
			"Fade Fold Widgets": { path: "fadeFoldWidgets" },
			"Use textarea for IME": { path: "useTextareaForIME" },
			"Merge Undo Deltas": {
				path: "mergeUndoDeltas",
				items: [
					{
						caption: "Always",
						value: "always"
					},
					{
						caption: "Never",
						value: "false"
					},
					{
						caption: "Timed",
						value: "true"
					}
				]
			},
			"Elastic Tabstops": { path: "useElasticTabstops" },
			"Incremental Search": { path: "useIncrementalSearch" },
			"Read-only": { path: "readOnly" },
			"Copy without selection": { path: "copyWithEmptySelection" },
			"Live Autocompletion": { path: "enableLiveAutocompletion" },
			"Custom scrollbar": { path: "customScrollbar" },
			"Use SVG gutter icons": { path: "useSvgGutterIcons" },
			"Annotations for folded lines": { path: "showFoldedAnnotations" },
			"Keyboard Accessibility Mode": { path: "enableKeyboardAccessibility" }
		}
	};
	var OptionPanel = class {
		constructor(editor, element) {
			this.editor = editor;
			this.container = element || document.createElement("div");
			this.groups = [];
			this.options = {};
		}
		add(config$1) {
			if (config$1.Main) oop.mixin(optionGroups.Main, config$1.Main);
			if (config$1.More) oop.mixin(optionGroups.More, config$1.More);
		}
		render() {
			this.container.innerHTML = "";
			buildDom([
				"table",
				{
					role: "presentation",
					id: "controls"
				},
				this.renderOptionGroup(optionGroups.Main),
				[
					"tr",
					null,
					[
						"td",
						{ colspan: 2 },
						[
							"table",
							{
								role: "presentation",
								id: "more-controls"
							},
							this.renderOptionGroup(optionGroups.More)
						]
					]
				],
				[
					"tr",
					null,
					[
						"td",
						{ colspan: 2 },
						"version " + config.version
					]
				]
			], this.container);
		}
		renderOptionGroup(group) {
			return Object.keys(group).map(function(key, i) {
				var item = group[key];
				if (!item.position) item.position = i / 1e4;
				if (!item.label) item.label = key;
				return item;
			}).sort(function(a, b) {
				return a.position - b.position;
			}).map(function(item) {
				return this.renderOption(item.label, item);
			}, this);
		}
		renderOptionControl(key, option) {
			var self = this;
			if (Array.isArray(option)) return option.map(function(x) {
				return self.renderOptionControl(key, x);
			});
			var control;
			var value = self.getOption(option);
			if (option.values && option.type != "checkbox") {
				if (typeof option.values == "string") option.values = option.values.split("|");
				option.items = option.values.map(function(v) {
					return {
						value: v,
						name: v
					};
				});
			}
			if (option.type == "buttonBar") control = [
				"div",
				{
					role: "group",
					"aria-labelledby": option.path + "-label"
				},
				option.items.map(function(item) {
					return [
						"button",
						{
							value: item.value,
							ace_selected_button: value == item.value,
							"aria-pressed": value == item.value,
							onclick: function() {
								self.setOption(option, item.value);
								var nodes = this.parentNode.querySelectorAll("[ace_selected_button]");
								for (var i = 0; i < nodes.length; i++) {
									nodes[i].removeAttribute("ace_selected_button");
									nodes[i].setAttribute("aria-pressed", false);
								}
								this.setAttribute("ace_selected_button", true);
								this.setAttribute("aria-pressed", true);
							}
						},
						item.desc || item.caption || item.name
					];
				})
			];
			else if (option.type == "number") {
				control = ["input", {
					type: "number",
					value: value || option.defaultValue,
					style: "width:3em",
					oninput: function() {
						self.setOption(option, parseInt(this.value));
					}
				}];
				if (option.ariaLabel) control[1]["aria-label"] = option.ariaLabel;
				else control[1].id = key;
				if (option.defaults) control = [control, option.defaults.map(function(item) {
					return [
						"button",
						{ onclick: function() {
							var input = this.parentNode.firstChild;
							input.value = item.value;
							input.oninput();
						} },
						item.caption
					];
				})];
			} else if (option.items) {
				var buildItems = function(items$1) {
					return items$1.map(function(item) {
						return [
							"option",
							{ value: item.value || item.name },
							item.desc || item.caption || item.name
						];
					});
				};
				var items = Array.isArray(option.items) ? buildItems(option.items) : Object.keys(option.items).map(function(key$1) {
					return [
						"optgroup",
						{ "label": key$1 },
						buildItems(option.items[key$1])
					];
				});
				control = [
					"select",
					{
						id: key,
						value,
						onchange: function() {
							self.setOption(option, this.value);
						}
					},
					items
				];
			} else {
				if (typeof option.values == "string") option.values = option.values.split("|");
				if (option.values) value = value == option.values[1];
				control = ["input", {
					type: "checkbox",
					id: key,
					checked: value || null,
					onchange: function() {
						var value$1 = this.checked;
						if (option.values) value$1 = option.values[value$1 ? 1 : 0];
						self.setOption(option, value$1);
					}
				}];
				if (option.type == "checkedNumber") control = [control, []];
			}
			return control;
		}
		renderOption(key, option) {
			if (option.path && !option.onchange && !this.editor.$options[option.path]) return;
			var path = Array.isArray(option) ? option[0].path : option.path;
			this.options[path] = option;
			var safeKey = "-" + path;
			var safeId = path + "-label";
			var control = this.renderOptionControl(safeKey, option);
			return [
				"tr",
				{ class: "ace_optionsMenuEntry" },
				["td", [
					"label",
					{
						for: safeKey,
						id: safeId
					},
					key
				]],
				["td", control]
			];
		}
		setOption(option, value) {
			if (typeof option == "string") option = this.options[option];
			if (value == "false") value = false;
			if (value == "true") value = true;
			if (value == "null") value = null;
			if (value == "undefined") value = void 0;
			if (typeof value == "string" && parseFloat(value).toString() == value) value = parseFloat(value);
			if (option.onchange) option.onchange(value);
			else if (option.path) this.editor.setOption(option.path, value);
			this._signal("setOption", {
				name: option.path,
				value
			});
		}
		getOption(option) {
			if (option.getValue) return option.getValue();
			return this.editor.getOption(option.path);
		}
	};
	oop.implement(OptionPanel.prototype, EventEmitter);
	exports.OptionPanel = OptionPanel;
	exports.optionGroups = optionGroups;
}));
export default require_options();
export { require_options as t };
