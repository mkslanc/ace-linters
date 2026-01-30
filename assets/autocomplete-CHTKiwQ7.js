import { t as __commonJSMin } from "./chunk-iA-Slpst.js";
import { t as require_useragent } from "./useragent-BODERP_7.js";
import { t as require_dom } from "./dom-BBjJ92-n.js";
import { t as require_range } from "./range-BUVqNbwc.js";
import { t as require_lang } from "./lang-DcNOSqFo.js";
import { t as require_event } from "./event-BcX-N72I.js";
import { t as require_config } from "./config-DPm1ug3B.js";
import { t as require_editor } from "./editor-BiOsjB7l.js";
import { n as require_scroll } from "./tooltip-DAauyLxM.js";
import { t as require_hash_handler } from "./hash_handler-G_6vQiwI.js";
import { t as require_virtual_renderer } from "./virtual_renderer-xL5PfPPr.js";
import { t as require_snippets } from "./snippets-Ct-Wi_HP.js";
var require_popup = /* @__PURE__ */ __commonJSMin(((exports) => {
	var Renderer = require_virtual_renderer().VirtualRenderer;
	var Editor = require_editor().Editor;
	var Range = require_range().Range;
	var event$1 = require_event();
	var lang$1 = require_lang();
	var dom$1 = require_dom();
	var nls = require_config().nls;
	var userAgent = require_useragent();
	var getAriaId$1 = function(index) {
		return `suggest-aria-id:${index}`;
	};
	var popupAriaRole = userAgent.isSafari ? "menu" : "listbox";
	var optionAriaRole = userAgent.isSafari ? "menuitem" : "option";
	var ariaActiveState = userAgent.isSafari ? "aria-current" : "aria-selected";
	var $singleLineEditor = function(el) {
		var renderer = new Renderer(el);
		renderer.$maxLines = 4;
		var editor = new Editor(renderer);
		editor.setHighlightActiveLine(false);
		editor.setShowPrintMargin(false);
		editor.renderer.setShowGutter(false);
		editor.renderer.setHighlightGutterLine(false);
		editor.$mouseHandler.$focusTimeout = 0;
		editor.$highlightTagPending = true;
		return editor;
	};
	var AcePopup$1 = class {
		constructor(parentNode) {
			var el = dom$1.createElement("div");
			var popup = $singleLineEditor(el);
			if (parentNode) parentNode.appendChild(el);
			el.style.display = "none";
			popup.renderer.content.style.cursor = "default";
			popup.renderer.setStyle("ace_autocomplete");
			popup.renderer.$textLayer.element.setAttribute("role", popupAriaRole);
			popup.renderer.$textLayer.element.setAttribute("aria-roledescription", nls("autocomplete.popup.aria-roledescription", "Autocomplete suggestions"));
			popup.renderer.$textLayer.element.setAttribute("aria-label", nls("autocomplete.popup.aria-label", "Autocomplete suggestions"));
			popup.renderer.textarea.setAttribute("aria-hidden", "true");
			popup.setOption("displayIndentGuides", false);
			popup.setOption("dragDelay", 150);
			var noop = function() {};
			popup.focus = noop;
			popup.$isFocused = true;
			popup.renderer.$cursorLayer.restartTimer = noop;
			popup.renderer.$cursorLayer.element.style.opacity = "0";
			popup.renderer.$maxLines = 8;
			popup.renderer.$keepTextAreaAtCursor = false;
			popup.setHighlightActiveLine(false);
			popup.session.highlight("");
			popup.session.$searchHighlight.clazz = "ace_highlight-marker";
			popup.on("mousedown", function(e) {
				var pos = e.getDocumentPosition();
				popup.selection.moveToPosition(pos);
				selectionMarker.start.row = selectionMarker.end.row = pos.row;
				e.stop();
			});
			var lastMouseEvent;
			var hoverMarker = new Range(-1, 0, -1, Infinity);
			var selectionMarker = new Range(-1, 0, -1, Infinity);
			selectionMarker.id = popup.session.addMarker(selectionMarker, "ace_active-line", "fullLine");
			popup.setSelectOnHover = function(val) {
				if (!val) hoverMarker.id = popup.session.addMarker(hoverMarker, "ace_line-hover", "fullLine");
				else if (hoverMarker.id) {
					popup.session.removeMarker(hoverMarker.id);
					hoverMarker.id = null;
				}
			};
			popup.setSelectOnHover(false);
			popup.on("mousemove", function(e) {
				if (!lastMouseEvent) {
					lastMouseEvent = e;
					return;
				}
				if (lastMouseEvent.x == e.x && lastMouseEvent.y == e.y) return;
				lastMouseEvent = e;
				lastMouseEvent.scrollTop = popup.renderer.scrollTop;
				popup.isMouseOver = true;
				var row = lastMouseEvent.getDocumentPosition().row;
				if (hoverMarker.start.row != row) {
					if (!hoverMarker.id) popup.setRow(row);
					setHoverMarker(row);
				}
			});
			popup.renderer.on("beforeRender", function() {
				if (lastMouseEvent && hoverMarker.start.row != -1) {
					lastMouseEvent.$pos = null;
					var row = lastMouseEvent.getDocumentPosition().row;
					if (!hoverMarker.id) popup.setRow(row);
					setHoverMarker(row, true);
				}
			});
			popup.renderer.on("afterRender", function() {
				var t = popup.renderer.$textLayer;
				for (var row = t.config.firstRow, l = t.config.lastRow; row <= l; row++) {
					const popupRowElement = t.element.childNodes[row - t.config.firstRow];
					popupRowElement.setAttribute("role", optionAriaRole);
					popupRowElement.setAttribute("aria-roledescription", nls("autocomplete.popup.item.aria-roledescription", "item"));
					popupRowElement.setAttribute("aria-setsize", popup.data.length);
					popupRowElement.setAttribute("aria-describedby", "doc-tooltip");
					popupRowElement.setAttribute("aria-posinset", row + 1);
					const rowData = popup.getData(row);
					if (rowData) {
						const ariaLabel = `${rowData.caption || rowData.value}${rowData.meta ? `, ${rowData.meta}` : ""}`;
						popupRowElement.setAttribute("aria-label", ariaLabel);
					}
					popupRowElement.querySelectorAll(".ace_completion-highlight").forEach((span) => {
						span.setAttribute("role", "mark");
					});
				}
			});
			popup.renderer.on("afterRender", function() {
				var row = popup.getRow();
				var t = popup.renderer.$textLayer;
				var selected = t.element.childNodes[row - t.config.firstRow];
				var el$1 = document.activeElement;
				if (selected !== popup.selectedNode && popup.selectedNode) {
					dom$1.removeCssClass(popup.selectedNode, "ace_selected");
					popup.selectedNode.removeAttribute(ariaActiveState);
					popup.selectedNode.removeAttribute("id");
				}
				el$1.removeAttribute("aria-activedescendant");
				popup.selectedNode = selected;
				if (selected) {
					var ariaId = getAriaId$1(row);
					dom$1.addCssClass(selected, "ace_selected");
					selected.id = ariaId;
					t.element.setAttribute("aria-activedescendant", ariaId);
					el$1.setAttribute("aria-activedescendant", ariaId);
					selected.setAttribute(ariaActiveState, "true");
				}
			});
			var hideHoverMarker = function() {
				setHoverMarker(-1);
			};
			var setHoverMarker = function(row, suppressRedraw) {
				if (row !== hoverMarker.start.row) {
					hoverMarker.start.row = hoverMarker.end.row = row;
					if (!suppressRedraw) popup.session._emit("changeBackMarker");
					popup._emit("changeHoverMarker");
				}
			};
			popup.getHoveredRow = function() {
				return hoverMarker.start.row;
			};
			event$1.addListener(popup.container, "mouseout", function() {
				popup.isMouseOver = false;
				hideHoverMarker();
			});
			popup.on("hide", hideHoverMarker);
			popup.on("changeSelection", hideHoverMarker);
			popup.session.doc.getLength = function() {
				return popup.data.length;
			};
			popup.session.doc.getLine = function(i) {
				var data = popup.data[i];
				if (typeof data == "string") return data;
				return data && data.value || "";
			};
			var bgTokenizer = popup.session.bgTokenizer;
			bgTokenizer.$tokenizeRow = function(row) {
				var data = popup.data[row];
				var tokens = [];
				if (!data) return tokens;
				if (typeof data == "string") data = { value: data };
				var caption = data.caption || data.value || data.name;
				function addToken(value, className) {
					value && tokens.push({
						type: (data.className || "") + (className || ""),
						value
					});
				}
				var lower = caption.toLowerCase();
				var filterText = (popup.filterText || "").toLowerCase();
				var lastIndex = 0;
				var lastI = 0;
				for (var i = 0; i <= filterText.length; i++) if (i != lastI && (data.matchMask & 1 << i || i == filterText.length)) {
					var sub = filterText.slice(lastI, i);
					lastI = i;
					var index = lower.indexOf(sub, lastIndex);
					if (index == -1) continue;
					addToken(caption.slice(lastIndex, index), "");
					lastIndex = index + sub.length;
					addToken(caption.slice(index, lastIndex), "completion-highlight");
				}
				addToken(caption.slice(lastIndex, caption.length), "");
				tokens.push({
					type: "completion-spacer",
					value: " "
				});
				if (data.meta) tokens.push({
					type: "completion-meta",
					value: data.meta
				});
				if (data.message) tokens.push({
					type: "completion-message",
					value: data.message
				});
				return tokens;
			};
			bgTokenizer.$updateOnChange = noop;
			bgTokenizer.start = noop;
			popup.session.$computeWidth = function() {
				return this.screenWidth = 0;
			};
			popup.isOpen = false;
			popup.isTopdown = false;
			popup.autoSelect = true;
			popup.filterText = "";
			popup.isMouseOver = false;
			popup.data = [];
			popup.setData = function(list, filterText) {
				popup.filterText = filterText || "";
				popup.setValue(lang$1.stringRepeat("\n", list.length), -1);
				popup.data = list || [];
				popup.setRow(0);
			};
			popup.getData = function(row) {
				return popup.data[row];
			};
			popup.getRow = function() {
				return selectionMarker.start.row;
			};
			popup.setRow = function(line) {
				line = Math.max(this.autoSelect ? 0 : -1, Math.min(this.data.length - 1, line));
				if (selectionMarker.start.row != line) {
					popup.selection.clearSelection();
					selectionMarker.start.row = selectionMarker.end.row = line || 0;
					popup.session._emit("changeBackMarker");
					popup.moveCursorTo(line || 0, 0);
					if (popup.isOpen) popup._signal("select");
				}
			};
			popup.on("changeSelection", function() {
				if (popup.isOpen) popup.setRow(popup.selection.lead.row);
				popup.renderer.scrollCursorIntoView();
			});
			popup.hide = function() {
				this.container.style.display = "none";
				popup.anchorPos = null;
				popup.anchor = null;
				if (popup.isOpen) {
					popup.isOpen = false;
					this._signal("hide");
				}
			};
			popup.tryShow = function(pos, lineHeight, anchor, forceShow) {
				if (!forceShow && popup.isOpen && popup.anchorPos && popup.anchor && popup.anchorPos.top === pos.top && popup.anchorPos.left === pos.left && popup.anchor === anchor) return true;
				var el$1 = this.container;
				var scrollBarSize = this.renderer.scrollBar.width || 10;
				var screenHeight = window.innerHeight - scrollBarSize;
				var screenWidth = window.innerWidth - scrollBarSize;
				var renderer = this.renderer;
				var maxH = renderer.$maxLines * lineHeight * 1.4;
				var dims = {
					top: 0,
					bottom: 0,
					left: 0
				};
				var spaceBelow = screenHeight - pos.top - 3 * this.$borderSize - lineHeight;
				var spaceAbove = pos.top - 3 * this.$borderSize;
				if (!anchor) if (spaceAbove <= spaceBelow || spaceBelow >= maxH) anchor = "bottom";
				else anchor = "top";
				if (anchor === "top") {
					dims.bottom = pos.top - this.$borderSize;
					dims.top = dims.bottom - maxH;
				} else if (anchor === "bottom") {
					dims.top = pos.top + lineHeight + this.$borderSize;
					dims.bottom = dims.top + maxH;
				}
				var fitsX = dims.top >= 0 && dims.bottom <= screenHeight;
				if (!forceShow && !fitsX) return false;
				if (!fitsX) if (anchor === "top") renderer.$maxPixelHeight = spaceAbove;
				else renderer.$maxPixelHeight = spaceBelow;
				else renderer.$maxPixelHeight = null;
				if (anchor === "top") {
					el$1.style.top = "";
					el$1.style.bottom = screenHeight + scrollBarSize - dims.bottom + "px";
					popup.isTopdown = false;
				} else {
					el$1.style.top = dims.top + "px";
					el$1.style.bottom = "";
					popup.isTopdown = true;
				}
				el$1.style.display = "";
				var left = pos.left;
				if (left + el$1.offsetWidth > screenWidth) left = screenWidth - el$1.offsetWidth;
				el$1.style.left = left + "px";
				el$1.style.right = "";
				dom$1.$fixPositionBug(el$1);
				if (!popup.isOpen) {
					popup.isOpen = true;
					this._signal("show");
					lastMouseEvent = null;
				}
				popup.anchorPos = pos;
				popup.anchor = anchor;
				return true;
			};
			popup.show = function(pos, lineHeight, topdownOnly) {
				this.tryShow(pos, lineHeight, topdownOnly ? "bottom" : void 0, true);
			};
			popup.goTo = function(where) {
				var row = this.getRow();
				var max = this.session.getLength() - 1;
				switch (where) {
					case "up":
						row = row <= 0 ? max : row - 1;
						break;
					case "down":
						row = row >= max ? -1 : row + 1;
						break;
					case "start":
						row = 0;
						break;
					case "end":
						row = max;
						break;
				}
				this.setRow(row);
			};
			popup.getTextLeftOffset = function() {
				return this.$borderSize + this.renderer.$padding + this.$imageSize;
			};
			popup.$imageSize = 0;
			popup.$borderSize = 1;
			return popup;
		}
	};
	dom$1.importCssString(`
.ace_editor.ace_autocomplete .ace_marker-layer .ace_active-line {
    background-color: #CAD6FA;
    z-index: 1;
}
.ace_dark.ace_editor.ace_autocomplete .ace_marker-layer .ace_active-line {
    background-color: #3a674e;
}
.ace_editor.ace_autocomplete .ace_line-hover {
    border: 1px solid #abbffe;
    margin-top: -1px;
    background: rgba(233,233,253,0.4);
    position: absolute;
    z-index: 2;
}
.ace_dark.ace_editor.ace_autocomplete .ace_line-hover {
    border: 1px solid rgba(109, 150, 13, 0.8);
    background: rgba(58, 103, 78, 0.62);
}
.ace_completion-meta {
    opacity: 0.5;
    margin-left: 0.9em;
}
.ace_completion-message {
    margin-left: 0.9em;
    color: blue;
}
.ace_editor.ace_autocomplete .ace_completion-highlight{
    color: #2d69c7;
}
.ace_dark.ace_editor.ace_autocomplete .ace_completion-highlight{
    color: #93ca12;
}
.ace_editor.ace_autocomplete {
    width: 300px;
    z-index: 200000;
    border: 1px lightgray solid;
    position: fixed;
    box-shadow: 2px 3px 5px rgba(0,0,0,.2);
    line-height: 1.4;
    background: #fefefe;
    color: #111;
}
.ace_dark.ace_editor.ace_autocomplete {
    border: 1px #484747 solid;
    box-shadow: 2px 3px 5px rgba(0, 0, 0, 0.51);
    line-height: 1.4;
    background: #25282c;
    color: #c1c1c1;
}
.ace_autocomplete .ace_text-layer  {
    width: calc(100% - 8px);
}
.ace_autocomplete .ace_line {
    display: flex;
    align-items: center;
}
.ace_autocomplete .ace_line > * {
    min-width: 0;
    flex: 0 0 auto;
}
.ace_autocomplete .ace_line .ace_ {
    flex: 0 1 auto;
    overflow: hidden;
    text-overflow: ellipsis;
}
.ace_autocomplete .ace_completion-spacer {
    flex: 1;
}
.ace_autocomplete.ace_loading:after  {
    content: "";
    position: absolute;
    top: 0px;
    height: 2px;
    width: 8%;
    background: blue;
    z-index: 100;
    animation: ace_progress 3s infinite linear;
    animation-delay: 300ms;
    transform: translateX(-100%) scaleX(1);
}
@keyframes ace_progress {
    0% { transform: translateX(-100%) scaleX(1) }
    50% { transform: translateX(625%) scaleX(2) } 
    100% { transform: translateX(1500%) scaleX(3) } 
}
@media (prefers-reduced-motion) {
    .ace_autocomplete.ace_loading:after {
        transform: translateX(625%) scaleX(2);
        animation: none;
     }
}
`, "autocompletion.css", false);
	exports.AcePopup = AcePopup$1;
	exports.$singleLineEditor = $singleLineEditor;
	exports.getAriaId = getAriaId$1;
}));
var require_inline_screenreader = /* @__PURE__ */ __commonJSMin(((exports) => {
	var AceInlineScreenReader$1 = class {
		constructor(editor) {
			this.editor = editor;
			this.screenReaderDiv = document.createElement("div");
			this.screenReaderDiv.classList.add("ace_screenreader-only");
			this.editor.container.appendChild(this.screenReaderDiv);
		}
		setScreenReaderContent(content) {
			if (!this.popup && this.editor.completer && this.editor.completer.popup) {
				this.popup = this.editor.completer.popup;
				this.popup.renderer.on("afterRender", function() {
					let row = this.popup.getRow();
					let t = this.popup.renderer.$textLayer;
					let selected = t.element.childNodes[row - t.config.firstRow];
					if (selected) {
						let idString = "doc-tooltip ";
						for (let lineIndex = 0; lineIndex < this._lines.length; lineIndex++) idString += `ace-inline-screenreader-line-${lineIndex} `;
						selected.setAttribute("aria-describedby", idString);
					}
				}.bind(this));
			}
			while (this.screenReaderDiv.firstChild) this.screenReaderDiv.removeChild(this.screenReaderDiv.firstChild);
			this._lines = content.split(/\r\n|\r|\n/);
			const codeElement = this.createCodeBlock();
			this.screenReaderDiv.appendChild(codeElement);
		}
		destroy() {
			this.screenReaderDiv.remove();
		}
		createCodeBlock() {
			const container = document.createElement("pre");
			container.setAttribute("id", "ace-inline-screenreader");
			for (let lineIndex = 0; lineIndex < this._lines.length; lineIndex++) {
				const codeElement = document.createElement("code");
				codeElement.setAttribute("id", `ace-inline-screenreader-line-${lineIndex}`);
				const line = document.createTextNode(this._lines[lineIndex]);
				codeElement.appendChild(line);
				container.appendChild(codeElement);
			}
			return container;
		}
	};
	exports.AceInlineScreenReader = AceInlineScreenReader$1;
}));
var require_inline = /* @__PURE__ */ __commonJSMin(((exports) => {
	var snippetManager$1 = require_snippets().snippetManager;
	var AceInlineScreenReader = require_inline_screenreader().AceInlineScreenReader;
	var AceInline$1 = class {
		constructor() {
			this.editor = null;
		}
		show(editor, completion, prefix) {
			prefix = prefix || "";
			if (editor && this.editor && this.editor !== editor) {
				this.hide();
				this.editor = null;
				this.inlineScreenReader = null;
			}
			if (!editor || !completion) return false;
			if (!this.inlineScreenReader) this.inlineScreenReader = new AceInlineScreenReader(editor);
			var displayText = completion.snippet ? snippetManager$1.getDisplayTextForSnippet(editor, completion.snippet) : completion.value;
			if (completion.hideInlinePreview || !displayText || !displayText.startsWith(prefix)) return false;
			this.editor = editor;
			this.inlineScreenReader.setScreenReaderContent(displayText);
			displayText = displayText.slice(prefix.length);
			if (displayText === "") editor.removeGhostText();
			else editor.setGhostText(displayText);
			return true;
		}
		isOpen() {
			if (!this.editor) return false;
			return !!this.editor.renderer.$ghostText;
		}
		hide() {
			if (!this.editor) return false;
			this.editor.removeGhostText();
			return true;
		}
		destroy() {
			this.hide();
			this.editor = null;
			if (this.inlineScreenReader) {
				this.inlineScreenReader.destroy();
				this.inlineScreenReader = null;
			}
		}
	};
	exports.AceInline = AceInline$1;
}));
var require_util = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.parForEach = function(array, fn, callback) {
		var completed = 0;
		var arLength = array.length;
		if (arLength === 0) callback();
		for (var i = 0; i < arLength; i++) fn(array[i], function(result, err) {
			completed++;
			if (completed === arLength) callback(result, err);
		});
	};
	var ID_REGEX = /[a-zA-Z_0-9\$\-\u00A2-\u2000\u2070-\uFFFF]/;
	exports.retrievePrecedingIdentifier = function(text, pos, regex) {
		regex = regex || ID_REGEX;
		var buf = [];
		for (var i = pos - 1; i >= 0; i--) if (regex.test(text[i])) buf.push(text[i]);
		else break;
		return buf.reverse().join("");
	};
	exports.retrieveFollowingIdentifier = function(text, pos, regex) {
		regex = regex || ID_REGEX;
		var buf = [];
		for (var i = pos; i < text.length; i++) if (regex.test(text[i])) buf.push(text[i]);
		else break;
		return buf;
	};
	exports.getCompletionPrefix = function(editor) {
		var pos = editor.getCursorPosition();
		var line = editor.session.getLine(pos.row);
		var prefix;
		editor.completers.forEach(function(completer) {
			if (completer.identifierRegexps) completer.identifierRegexps.forEach(function(identifierRegex) {
				if (!prefix && identifierRegex) prefix = this.retrievePrecedingIdentifier(line, pos.column, identifierRegex);
			}.bind(this));
		}.bind(this));
		return prefix || this.retrievePrecedingIdentifier(line, pos.column);
	};
	exports.triggerAutocomplete = function(editor, previousChar) {
		var previousChar = previousChar == null ? editor.session.getPrecedingCharacter() : previousChar;
		return editor.completers.some((completer) => {
			if (completer.triggerCharacters && Array.isArray(completer.triggerCharacters)) return completer.triggerCharacters.includes(previousChar);
		});
	};
}));
var require_autocomplete = /* @__PURE__ */ __commonJSMin(((exports) => {
	var HashHandler = require_hash_handler().HashHandler;
	var AcePopup = require_popup().AcePopup;
	var AceInline = require_inline().AceInline;
	var getAriaId = require_popup().getAriaId;
	var util = require_util();
	var lang = require_lang();
	var dom = require_dom();
	var snippetManager = require_snippets().snippetManager;
	var config = require_config();
	var event = require_event();
	var preventParentScroll = require_scroll().preventParentScroll;
	var destroyCompleter = function(e, editor) {
		editor.completer && editor.completer.destroy();
	};
	var Autocomplete = class Autocomplete {
		constructor() {
			this.autoInsert = false;
			this.autoSelect = true;
			this.autoShown = false;
			this.exactMatch = false;
			this.inlineEnabled = false;
			this.keyboardHandler = new HashHandler();
			this.keyboardHandler.bindKeys(this.commands);
			this.parentNode = null;
			this.setSelectOnHover = false;
			this.hasSeen = /* @__PURE__ */ new Set();
			this.showLoadingState = false;
			this.stickySelectionDelay = 500;
			this.blurListener = this.blurListener.bind(this);
			this.changeListener = this.changeListener.bind(this);
			this.mousedownListener = this.mousedownListener.bind(this);
			this.mousewheelListener = this.mousewheelListener.bind(this);
			this.onLayoutChange = this.onLayoutChange.bind(this);
			this.changeTimer = lang.delayedCall(function() {
				this.updateCompletions(true);
			}.bind(this));
			this.tooltipTimer = lang.delayedCall(this.updateDocTooltip.bind(this), 50);
			this.popupTimer = lang.delayedCall(this.$updatePopupPosition.bind(this), 50);
			this.stickySelectionTimer = lang.delayedCall(function() {
				this.stickySelection = true;
			}.bind(this), this.stickySelectionDelay);
			this.$firstOpenTimer = lang.delayedCall(function() {
				var initialPosition = this.completionProvider && this.completionProvider.initialPosition;
				if (this.autoShown || this.popup && this.popup.isOpen || !initialPosition || this.editor.completers.length === 0) return;
				this.completions = new FilteredList(Autocomplete.completionsForLoading);
				this.openPopup(this.editor, initialPosition.prefix, false);
				this.popup.renderer.setStyle("ace_loading", true);
			}.bind(this), this.stickySelectionDelay);
		}
		static get completionsForLoading() {
			return [{
				caption: config.nls("autocomplete.loading", "Loading..."),
				value: ""
			}];
		}
		$init() {
			this.popup = new AcePopup(this.parentNode || document.body || document.documentElement);
			this.popup.on("click", function(e) {
				this.insertMatch();
				e.stop();
			}.bind(this));
			this.popup.focus = this.editor.focus.bind(this.editor);
			this.popup.on("show", this.$onPopupShow.bind(this));
			this.popup.on("hide", this.$onHidePopup.bind(this));
			this.popup.on("select", this.$onPopupChange.bind(this));
			event.addListener(this.popup.container, "mouseout", this.mouseOutListener.bind(this));
			this.popup.on("changeHoverMarker", this.tooltipTimer.bind(null, null));
			this.popup.renderer.on("afterRender", this.$onPopupRender.bind(this));
			return this.popup;
		}
		$initInline() {
			if (!this.inlineEnabled || this.inlineRenderer) return;
			this.inlineRenderer = new AceInline();
			return this.inlineRenderer;
		}
		getPopup() {
			return this.popup || this.$init();
		}
		$onHidePopup() {
			if (this.inlineRenderer) this.inlineRenderer.hide();
			this.hideDocTooltip();
			this.stickySelectionTimer.cancel();
			this.popupTimer.cancel();
			this.stickySelection = false;
		}
		$seen(completion) {
			if (!this.hasSeen.has(completion) && completion && completion.completer && completion.completer.onSeen && typeof completion.completer.onSeen === "function") {
				completion.completer.onSeen(this.editor, completion);
				this.hasSeen.add(completion);
			}
		}
		$onPopupChange(hide) {
			if (this.inlineRenderer && this.inlineEnabled) {
				var completion = hide ? null : this.popup.getData(this.popup.getRow());
				this.$updateGhostText(completion);
				if (this.popup.isMouseOver && this.setSelectOnHover) {
					this.tooltipTimer.call(null, null);
					return;
				}
				this.popupTimer.schedule();
				this.tooltipTimer.schedule();
			} else {
				this.popupTimer.call(null, null);
				this.tooltipTimer.call(null, null);
			}
		}
		$updateGhostText(completion) {
			var row = this.base.row;
			var column = this.base.column;
			var cursorColumn = this.editor.getCursorPosition().column;
			var prefix = this.editor.session.getLine(row).slice(column, cursorColumn);
			if (!this.inlineRenderer.show(this.editor, completion, prefix)) this.inlineRenderer.hide();
			else this.$seen(completion);
		}
		$onPopupRender() {
			const inlineEnabled = this.inlineRenderer && this.inlineEnabled;
			if (this.completions && this.completions.filtered && this.completions.filtered.length > 0) for (var i = this.popup.getFirstVisibleRow(); i <= this.popup.getLastVisibleRow(); i++) {
				var completion = this.popup.getData(i);
				if (completion && (!inlineEnabled || completion.hideInlinePreview)) this.$seen(completion);
			}
		}
		$onPopupShow(hide) {
			this.$onPopupChange(hide);
			this.stickySelection = false;
			if (this.stickySelectionDelay >= 0) this.stickySelectionTimer.schedule(this.stickySelectionDelay);
		}
		observeLayoutChanges() {
			if (this.$elements || !this.editor) return;
			window.addEventListener("resize", this.onLayoutChange, { passive: true });
			window.addEventListener("wheel", this.mousewheelListener);
			var el = this.editor.container.parentNode;
			var elements = [];
			while (el) {
				elements.push(el);
				el.addEventListener("scroll", this.onLayoutChange, { passive: true });
				el = el.parentNode;
			}
			this.$elements = elements;
		}
		unObserveLayoutChanges() {
			window.removeEventListener("resize", this.onLayoutChange, { passive: true });
			window.removeEventListener("wheel", this.mousewheelListener);
			this.$elements && this.$elements.forEach((el) => {
				el.removeEventListener("scroll", this.onLayoutChange, { passive: true });
			});
			this.$elements = null;
		}
		onLayoutChange() {
			if (!this.popup.isOpen) return this.unObserveLayoutChanges();
			this.$updatePopupPosition();
			this.updateDocTooltip();
		}
		$updatePopupPosition() {
			var editor = this.editor;
			var renderer = editor.renderer;
			var lineHeight = renderer.layerConfig.lineHeight;
			var pos = renderer.$cursorLayer.getPixelPosition(this.base, true);
			pos.left -= this.popup.getTextLeftOffset();
			var rect = editor.container.getBoundingClientRect();
			pos.top += rect.top - renderer.layerConfig.offset;
			pos.left += rect.left - editor.renderer.scrollLeft;
			pos.left += renderer.gutterWidth;
			var posGhostText = {
				top: pos.top,
				left: pos.left
			};
			if (renderer.$ghostText && renderer.$ghostTextWidget) {
				if (this.base.row === renderer.$ghostText.position.row) posGhostText.top += renderer.$ghostTextWidget.el.offsetHeight;
			}
			var editorContainerBottom = editor.container.getBoundingClientRect().bottom - lineHeight;
			var lowestPosition = editorContainerBottom < posGhostText.top ? {
				top: editorContainerBottom,
				left: posGhostText.left
			} : posGhostText;
			if (this.popup.tryShow(lowestPosition, lineHeight, "bottom")) return;
			if (this.popup.tryShow(pos, lineHeight, "top")) return;
			this.popup.show(pos, lineHeight);
		}
		openPopup(editor, prefix, keepPopupPosition) {
			this.$firstOpenTimer.cancel();
			if (!this.popup) this.$init();
			if (this.inlineEnabled && !this.inlineRenderer) this.$initInline();
			this.popup.autoSelect = this.autoSelect;
			this.popup.setSelectOnHover(this.setSelectOnHover);
			var oldRow = this.popup.getRow();
			var previousSelectedItem = this.popup.data[oldRow];
			this.popup.setData(this.completions.filtered, this.completions.filterText);
			if (this.editor.textInput.setAriaOptions) this.editor.textInput.setAriaOptions({
				activeDescendant: getAriaId(this.popup.getRow()),
				inline: this.inlineEnabled
			});
			editor.keyBinding.addKeyboardHandler(this.keyboardHandler);
			var newRow;
			if (this.stickySelection) newRow = this.popup.data.indexOf(previousSelectedItem);
			if (!newRow || newRow === -1) newRow = 0;
			this.popup.setRow(this.autoSelect ? newRow : -1);
			if (newRow === oldRow && previousSelectedItem !== this.completions.filtered[newRow]) this.$onPopupChange();
			const inlineEnabled = this.inlineRenderer && this.inlineEnabled;
			if (newRow === oldRow && inlineEnabled) {
				var completion = this.popup.getData(this.popup.getRow());
				this.$updateGhostText(completion);
			}
			if (!keepPopupPosition) {
				this.popup.setTheme(editor.getTheme());
				this.popup.setFontSize(editor.getFontSize());
				this.$updatePopupPosition();
				if (this.tooltipNode) this.updateDocTooltip();
			}
			this.changeTimer.cancel();
			this.observeLayoutChanges();
		}
		detach() {
			if (this.editor) {
				this.editor.keyBinding.removeKeyboardHandler(this.keyboardHandler);
				this.editor.off("changeSelection", this.changeListener);
				this.editor.off("blur", this.blurListener);
				this.editor.off("mousedown", this.mousedownListener);
				this.editor.off("mousewheel", this.mousewheelListener);
			}
			this.$firstOpenTimer.cancel();
			this.changeTimer.cancel();
			this.hideDocTooltip();
			if (this.completionProvider) this.completionProvider.detach();
			if (this.popup && this.popup.isOpen) this.popup.hide();
			if (this.popup && this.popup.renderer) this.popup.renderer.off("afterRender", this.$onPopupRender);
			if (this.base) this.base.detach();
			this.activated = false;
			this.completionProvider = this.completions = this.base = null;
			this.unObserveLayoutChanges();
		}
		changeListener(e) {
			var cursor = this.editor.selection.lead;
			if (cursor.row != this.base.row || cursor.column < this.base.column) this.detach();
			if (this.activated) this.changeTimer.schedule();
			else this.detach();
		}
		blurListener(e) {
			var el = document.activeElement;
			var text = this.editor.textInput.getElement();
			var fromTooltip = e.relatedTarget && this.tooltipNode && this.tooltipNode.contains(e.relatedTarget);
			var container = this.popup && this.popup.container;
			if (el != text && el.parentNode != container && !fromTooltip && el != this.tooltipNode && e.relatedTarget != text) this.detach();
		}
		mousedownListener(e) {
			this.detach();
		}
		mousewheelListener(e) {
			if (this.popup && !this.popup.isMouseOver) this.detach();
		}
		mouseOutListener(e) {
			if (this.popup.isOpen) this.$updatePopupPosition();
		}
		goTo(where) {
			this.popup.goTo(where);
		}
		insertMatch(data, options) {
			if (!data) data = this.popup.getData(this.popup.getRow());
			if (!data) return false;
			if (data.value === "") return this.detach();
			var completions = this.completions;
			var result = this.getCompletionProvider().insertMatch(this.editor, data, completions.filterText, options);
			if (this.completions == completions) this.detach();
			return result;
		}
		showPopup(editor, options) {
			if (this.editor) this.detach();
			this.activated = true;
			this.editor = editor;
			if (editor.completer != this) {
				if (editor.completer) editor.completer.detach();
				editor.completer = this;
			}
			editor.on("changeSelection", this.changeListener);
			editor.on("blur", this.blurListener);
			editor.on("mousedown", this.mousedownListener);
			editor.on("mousewheel", this.mousewheelListener);
			this.updateCompletions(false, options);
		}
		getCompletionProvider(initialPosition) {
			if (!this.completionProvider) this.completionProvider = new CompletionProvider(initialPosition);
			return this.completionProvider;
		}
		gatherCompletions(editor, callback) {
			return this.getCompletionProvider().gatherCompletions(editor, callback);
		}
		updateCompletions(keepPopupPosition, options) {
			if (keepPopupPosition && this.base && this.completions) {
				var pos = this.editor.getCursorPosition();
				var prefix = this.editor.session.getTextRange({
					start: this.base,
					end: pos
				});
				if (prefix == this.completions.filterText) return;
				this.completions.setFilter(prefix);
				if (!this.completions.filtered.length) return this.detach();
				if (this.completions.filtered.length == 1 && this.completions.filtered[0].value == prefix && !this.completions.filtered[0].snippet) return this.detach();
				this.openPopup(this.editor, prefix, keepPopupPosition);
				return;
			}
			if (options && options.matches) {
				var pos = this.editor.getSelectionRange().start;
				this.base = this.editor.session.doc.createAnchor(pos.row, pos.column);
				this.base.$insertRight = true;
				this.completions = new FilteredList(options.matches);
				this.getCompletionProvider().completions = this.completions;
				return this.openPopup(this.editor, "", keepPopupPosition);
			}
			var session = this.editor.getSession();
			var pos = this.editor.getCursorPosition();
			var prefix = util.getCompletionPrefix(this.editor);
			this.base = session.doc.createAnchor(pos.row, pos.column - prefix.length);
			this.base.$insertRight = true;
			var completionOptions = {
				exactMatch: this.exactMatch,
				ignoreCaption: this.ignoreCaption
			};
			this.getCompletionProvider({
				prefix,
				pos
			}).provideCompletions(this.editor, completionOptions, function(err, completions, finished) {
				var filtered = completions.filtered;
				var prefix$1 = util.getCompletionPrefix(this.editor);
				this.$firstOpenTimer.cancel();
				if (finished) {
					if (!filtered.length) {
						var emptyMessage = !this.autoShown && this.emptyMessage;
						if (typeof emptyMessage == "function") emptyMessage = this.emptyMessage(prefix$1);
						if (emptyMessage) {
							this.completions = new FilteredList([{
								caption: emptyMessage,
								value: ""
							}]);
							this.openPopup(this.editor, prefix$1, keepPopupPosition);
							this.popup.renderer.setStyle("ace_loading", false);
							this.popup.renderer.setStyle("ace_empty-message", true);
							return;
						}
						return this.detach();
					}
					if (filtered.length == 1 && filtered[0].value == prefix$1 && !filtered[0].snippet) return this.detach();
					if (this.autoInsert && !this.autoShown && filtered.length == 1) return this.insertMatch(filtered[0]);
				}
				this.completions = !finished && this.showLoadingState ? new FilteredList(Autocomplete.completionsForLoading.concat(filtered), completions.filterText) : completions;
				this.openPopup(this.editor, prefix$1, keepPopupPosition);
				this.popup.renderer.setStyle("ace_empty-message", false);
				this.popup.renderer.setStyle("ace_loading", !finished);
			}.bind(this));
			if (this.showLoadingState && !this.autoShown && !(this.popup && this.popup.isOpen)) this.$firstOpenTimer.delay(this.stickySelectionDelay / 2);
		}
		cancelContextMenu() {
			this.editor.$mouseHandler.cancelContextMenu();
		}
		updateDocTooltip() {
			var popup = this.popup;
			var all = this.completions && this.completions.filtered;
			var selected = all && (all[popup.getHoveredRow()] || all[popup.getRow()]);
			var doc = null;
			if (!selected || !this.editor || !this.popup.isOpen) return this.hideDocTooltip();
			var completersLength = this.editor.completers.length;
			for (var i = 0; i < completersLength; i++) {
				var completer = this.editor.completers[i];
				if (completer.getDocTooltip && selected.completerId === completer.id) {
					doc = completer.getDocTooltip(selected);
					break;
				}
			}
			if (!doc && typeof selected != "string") doc = selected;
			if (typeof doc == "string") doc = { docText: doc };
			if (!doc || !(doc.docHTML || doc.docText)) return this.hideDocTooltip();
			this.showDocTooltip(doc);
		}
		showDocTooltip(item) {
			if (!this.tooltipNode) {
				this.tooltipNode = dom.createElement("div");
				this.tooltipNode.style.margin = "0";
				this.tooltipNode.style.pointerEvents = "auto";
				this.tooltipNode.style.overscrollBehavior = "contain";
				this.tooltipNode.tabIndex = -1;
				this.tooltipNode.onblur = this.blurListener.bind(this);
				this.tooltipNode.onclick = this.onTooltipClick.bind(this);
				this.tooltipNode.id = "doc-tooltip";
				this.tooltipNode.setAttribute("role", "tooltip");
				this.tooltipNode.addEventListener("wheel", preventParentScroll);
			}
			var theme = this.editor.renderer.theme;
			this.tooltipNode.className = "ace_tooltip ace_doc-tooltip " + (theme.isDark ? "ace_dark " : "") + (theme.cssClass || "");
			var tooltipNode = this.tooltipNode;
			if (item.docHTML) tooltipNode.innerHTML = item.docHTML;
			else if (item.docText) tooltipNode.textContent = item.docText;
			if (!tooltipNode.parentNode) this.popup.container.appendChild(this.tooltipNode);
			var popup = this.popup;
			var rect = popup.container.getBoundingClientRect();
			var targetWidth = 400;
			var targetHeight = 300;
			var scrollBarSize = popup.renderer.scrollBar.width || 10;
			var leftSize = rect.left;
			var rightSize = window.innerWidth - rect.right - scrollBarSize;
			var topSize = popup.isTopdown ? window.innerHeight - scrollBarSize - rect.bottom : rect.top;
			var scores = [
				Math.min(rightSize / targetWidth, 1),
				Math.min(leftSize / targetWidth, 1),
				Math.min(topSize / targetHeight, 1) * .9
			];
			var max = Math.max.apply(Math, scores);
			var tooltipStyle = tooltipNode.style;
			tooltipStyle.display = "block";
			if (max == scores[0] || scores[0] >= 1) {
				tooltipStyle.left = rect.right + 1 + "px";
				tooltipStyle.right = "";
				tooltipStyle.maxWidth = targetWidth * max + "px";
				tooltipStyle.top = rect.top + "px";
				tooltipStyle.bottom = "";
				tooltipStyle.maxHeight = Math.min(window.innerHeight - scrollBarSize - rect.top, targetHeight) + "px";
			} else if (max == scores[1] || scores[1] >= 1) {
				tooltipStyle.right = window.innerWidth - rect.left + "px";
				tooltipStyle.left = "";
				tooltipStyle.maxWidth = targetWidth * max + "px";
				tooltipStyle.top = rect.top + "px";
				tooltipStyle.bottom = "";
				tooltipStyle.maxHeight = Math.min(window.innerHeight - scrollBarSize - rect.top, targetHeight) + "px";
			} else if (max == scores[2]) {
				tooltipStyle.left = rect.left + "px";
				tooltipStyle.right = "";
				tooltipStyle.maxWidth = Math.min(targetWidth, window.innerWidth - rect.left) + "px";
				if (popup.isTopdown) {
					tooltipStyle.top = rect.bottom + "px";
					tooltipStyle.bottom = "";
					tooltipStyle.maxHeight = Math.min(window.innerHeight - scrollBarSize - rect.bottom, targetHeight) + "px";
				} else {
					tooltipStyle.top = "";
					tooltipStyle.bottom = window.innerHeight - rect.top + "px";
					tooltipStyle.maxHeight = Math.min(rect.top, targetHeight) + "px";
				}
			}
			dom.$fixPositionBug(tooltipNode);
		}
		hideDocTooltip() {
			this.tooltipTimer.cancel();
			if (!this.tooltipNode) return;
			var el = this.tooltipNode;
			if (!this.editor.isFocused() && document.activeElement == el) this.editor.focus();
			this.tooltipNode = null;
			if (el.parentNode) el.parentNode.removeChild(el);
		}
		onTooltipClick(e) {
			var a = e.target;
			while (a && a != this.tooltipNode) {
				if (a.nodeName == "A" && a.href) {
					a.rel = "noreferrer";
					a.target = "_blank";
					break;
				}
				a = a.parentNode;
			}
		}
		destroy() {
			this.detach();
			if (this.popup) {
				this.popup.destroy();
				var el = this.popup.container;
				if (el && el.parentNode) el.parentNode.removeChild(el);
			}
			if (this.editor && this.editor.completer == this) {
				this.editor.off("destroy", destroyCompleter);
				this.editor.completer = null;
			}
			this.inlineRenderer = this.popup = this.editor = null;
		}
		static for(editor) {
			if (editor.completer instanceof Autocomplete) return editor.completer;
			if (editor.completer) {
				editor.completer.destroy();
				editor.completer = null;
			}
			if (config.get("sharedPopups")) {
				if (!Autocomplete["$sharedInstance"]) Autocomplete["$sharedInstance"] = new Autocomplete();
				editor.completer = Autocomplete["$sharedInstance"];
			} else {
				editor.completer = new Autocomplete();
				editor.once("destroy", destroyCompleter);
			}
			return editor.completer;
		}
	};
	Autocomplete.prototype.commands = {
		"Up": function(editor) {
			editor.completer.goTo("up");
		},
		"Down": function(editor) {
			editor.completer.goTo("down");
		},
		"Ctrl-Up|Ctrl-Home": function(editor) {
			editor.completer.goTo("start");
		},
		"Ctrl-Down|Ctrl-End": function(editor) {
			editor.completer.goTo("end");
		},
		"Esc": function(editor) {
			editor.completer.detach();
		},
		"Return": function(editor) {
			return editor.completer.insertMatch();
		},
		"Shift-Return": function(editor) {
			editor.completer.insertMatch(null, { deleteSuffix: true });
		},
		"Tab": function(editor) {
			var result = editor.completer.insertMatch();
			if (!result && !editor.tabstopManager) editor.completer.goTo("down");
			else return result;
		},
		"Backspace": function(editor) {
			editor.execCommand("backspace");
			if (!util.getCompletionPrefix(editor) && editor.completer) editor.completer.detach();
		},
		"PageUp": function(editor) {
			editor.completer.popup.gotoPageUp();
		},
		"PageDown": function(editor) {
			editor.completer.popup.gotoPageDown();
		}
	};
	Autocomplete.startCommand = {
		name: "startAutocomplete",
		exec: function(editor, options) {
			var completer = Autocomplete.for(editor);
			completer.autoInsert = false;
			completer.autoSelect = true;
			completer.autoShown = false;
			completer.showPopup(editor, options);
			completer.cancelContextMenu();
		},
		bindKey: "Ctrl-Space|Ctrl-Shift-Space|Alt-Space"
	};
	var CompletionProvider = class {
		constructor(initialPosition) {
			this.initialPosition = initialPosition;
			this.active = true;
		}
		insertByIndex(editor, index, options) {
			if (!this.completions || !this.completions.filtered) return false;
			return this.insertMatch(editor, this.completions.filtered[index], options);
		}
		insertMatch(editor, data, options) {
			if (!data) return false;
			editor.startOperation({ command: { name: "insertMatch" } });
			if (data.completer && data.completer.insertMatch) data.completer.insertMatch(editor, data);
			else {
				if (!this.completions) return false;
				var replaceBefore = this.completions.filterText.length;
				var replaceAfter = 0;
				if (data.range && data.range.start.row === data.range.end.row) {
					replaceBefore -= this.initialPosition.prefix.length;
					replaceBefore += this.initialPosition.pos.column - data.range.start.column;
					replaceAfter += data.range.end.column - this.initialPosition.pos.column;
				}
				if (replaceBefore || replaceAfter) {
					var ranges;
					if (editor.selection.getAllRanges) ranges = editor.selection.getAllRanges();
					else ranges = [editor.getSelectionRange()];
					for (var i = 0, range; range = ranges[i]; i++) {
						range.start.column -= replaceBefore;
						range.end.column += replaceAfter;
						editor.session.remove(range);
					}
				}
				if (data.snippet) snippetManager.insertSnippet(editor, data.snippet);
				else this.$insertString(editor, data);
				if (data.completer && data.completer.onInsert && typeof data.completer.onInsert == "function") data.completer.onInsert(editor, data);
				if (data.command && data.command === "startAutocomplete") editor.execCommand(data.command);
			}
			editor.endOperation();
			return true;
		}
		$insertString(editor, data) {
			var text = data.value || data;
			editor.execCommand("insertstring", text);
		}
		gatherCompletions(editor, callback) {
			var session = editor.getSession();
			var pos = editor.getCursorPosition();
			var prefix = util.getCompletionPrefix(editor);
			var matches = [];
			this.completers = editor.completers;
			var total = editor.completers.length;
			editor.completers.forEach(function(completer, i) {
				completer.getCompletions(editor, session, pos, prefix, function(err, results) {
					if (completer.hideInlinePreview) results = results.map((result) => {
						return Object.assign(result, { hideInlinePreview: completer.hideInlinePreview });
					});
					if (!err && results) matches = matches.concat(results);
					callback(null, {
						prefix: util.getCompletionPrefix(editor),
						matches,
						finished: --total === 0
					});
				});
			});
			return true;
		}
		provideCompletions(editor, options, callback) {
			var processResults = function(results$1) {
				var prefix = results$1.prefix;
				var matches = results$1.matches;
				this.completions = new FilteredList(matches);
				if (options.exactMatch) this.completions.exactMatch = true;
				if (options.ignoreCaption) this.completions.ignoreCaption = true;
				this.completions.setFilter(prefix);
				if (results$1.finished || this.completions.filtered.length) callback(null, this.completions, results$1.finished);
			}.bind(this);
			var isImmediate = true;
			var immediateResults = null;
			this.gatherCompletions(editor, function(err, results$1) {
				if (!this.active) return;
				if (err) {
					callback(err, [], true);
					this.detach();
				}
				if (results$1.prefix.indexOf(results$1.prefix) !== 0) return;
				if (isImmediate) {
					immediateResults = results$1;
					return;
				}
				processResults(results$1);
			}.bind(this));
			isImmediate = false;
			if (immediateResults) {
				var results = immediateResults;
				immediateResults = null;
				processResults(results);
			}
		}
		detach() {
			this.active = false;
			this.completers && this.completers.forEach(function(completer) {
				if (typeof completer.cancel === "function") completer.cancel();
			});
		}
	};
	var FilteredList = class {
		constructor(array, filterText) {
			this.all = array;
			this.filtered = array;
			this.filterText = filterText || "";
			this.exactMatch = false;
			this.ignoreCaption = false;
		}
		setFilter(str) {
			if (str.length > this.filterText && str.lastIndexOf(this.filterText, 0) === 0) var matches = this.filtered;
			else var matches = this.all;
			this.filterText = str;
			matches = this.filterCompletions(matches, this.filterText);
			matches = matches.sort(function(a, b) {
				return b.exactMatch - a.exactMatch || b.$score - a.$score || (a.caption || a.value).localeCompare(b.caption || b.value);
			});
			var prev = null;
			matches = matches.filter(function(item) {
				var caption = item.snippet || item.caption || item.value;
				if (caption === prev) return false;
				prev = caption;
				return true;
			});
			this.filtered = matches;
		}
		filterCompletions(items, needle) {
			var results = [];
			var upper = needle.toUpperCase();
			var lower = needle.toLowerCase();
			loop: for (var i = 0, item; item = items[i]; i++) {
				if (item.skipFilter) {
					item.$score = item.score;
					results.push(item);
					continue;
				}
				var caption = !this.ignoreCaption && item.caption || item.value || item.snippet;
				if (!caption) continue;
				var lastIndex = -1;
				var matchMask = 0;
				var penalty = 0;
				var index, distance;
				if (this.exactMatch) {
					if (needle !== caption.substr(0, needle.length)) continue loop;
				} else {
					var fullMatchIndex = caption.toLowerCase().indexOf(lower);
					if (fullMatchIndex > -1) penalty = fullMatchIndex;
					else for (var j = 0; j < needle.length; j++) {
						var i1 = caption.indexOf(lower[j], lastIndex + 1);
						var i2 = caption.indexOf(upper[j], lastIndex + 1);
						index = i1 >= 0 ? i2 < 0 || i1 < i2 ? i1 : i2 : i2;
						if (index < 0) continue loop;
						distance = index - lastIndex - 1;
						if (distance > 0) {
							if (lastIndex === -1) penalty += 10;
							penalty += distance;
							matchMask = matchMask | 1 << j;
						}
						lastIndex = index;
					}
				}
				item.matchMask = matchMask;
				item.exactMatch = penalty ? 0 : 1;
				item.$score = (item.score || 0) - penalty;
				results.push(item);
			}
			return results;
		}
	};
	exports.Autocomplete = Autocomplete;
	exports.CompletionProvider = CompletionProvider;
	exports.FilteredList = FilteredList;
}));
export { require_popup as i, require_util as n, require_inline as r, require_autocomplete as t };
