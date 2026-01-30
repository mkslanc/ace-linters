import { t as __commonJSMin } from "./chunk-iA-Slpst.js";
import { t as require_dom } from "./dom-BBjJ92-n.js";
import { t as require_range } from "./range-BUVqNbwc.js";
import { t as require_event } from "./event-BcX-N72I.js";
var require_scroll = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.preventParentScroll = function preventParentScroll$1(event) {
		event.stopPropagation();
		var target = event.currentTarget;
		if (!(target.scrollHeight > target.clientHeight)) event.preventDefault();
	};
}));
var require_tooltip = /* @__PURE__ */ __commonJSMin(((exports) => {
	var dom = require_dom();
	require_event();
	var Range = require_range().Range;
	var preventParentScroll = require_scroll().preventParentScroll;
	var CLASSNAME = "ace_tooltip";
	var Tooltip = class {
		constructor(parentNode) {
			this.isOpen = false;
			this.$element = null;
			this.$parentNode = parentNode;
		}
		$init() {
			this.$element = dom.createElement("div");
			this.$element.className = CLASSNAME;
			this.$element.style.display = "none";
			this.$parentNode.appendChild(this.$element);
			return this.$element;
		}
		getElement() {
			return this.$element || this.$init();
		}
		setText(text) {
			this.getElement().textContent = text;
		}
		setHtml(html) {
			this.getElement().innerHTML = html;
		}
		setPosition(x, y) {
			this.getElement().style.left = x + "px";
			this.getElement().style.top = y + "px";
		}
		setClassName(className) {
			dom.addCssClass(this.getElement(), className);
		}
		setTheme(theme) {
			if (this.theme) {
				this.theme.isDark && dom.removeCssClass(this.getElement(), "ace_dark");
				this.theme.cssClass && dom.removeCssClass(this.getElement(), this.theme.cssClass);
			}
			if (theme.isDark) dom.addCssClass(this.getElement(), "ace_dark");
			if (theme.cssClass) dom.addCssClass(this.getElement(), theme.cssClass);
			this.theme = {
				isDark: theme.isDark,
				cssClass: theme.cssClass
			};
		}
		show(text, x, y) {
			if (text != null) this.setText(text);
			if (x != null && y != null) this.setPosition(x, y);
			if (!this.isOpen) {
				this.getElement().style.display = "block";
				this.isOpen = true;
			}
		}
		hide(e) {
			if (this.isOpen) {
				this.getElement().style.display = "none";
				this.getElement().className = CLASSNAME;
				this.isOpen = false;
			}
		}
		getHeight() {
			return this.getElement().offsetHeight;
		}
		getWidth() {
			return this.getElement().offsetWidth;
		}
		destroy() {
			this.isOpen = false;
			if (this.$element && this.$element.parentNode) this.$element.parentNode.removeChild(this.$element);
		}
	};
	var PopupManager = class {
		constructor() {
			this.popups = [];
		}
		addPopup(popup) {
			this.popups.push(popup);
			this.updatePopups();
		}
		removePopup(popup) {
			var index = this.popups.indexOf(popup);
			if (index !== -1) {
				this.popups.splice(index, 1);
				this.updatePopups();
			}
		}
		updatePopups() {
			this.popups.sort((a, b) => b.priority - a.priority);
			let visiblepopups = [];
			for (let popup of this.popups) {
				let shouldDisplay = true;
				for (let visiblePopup of visiblepopups) if (this.doPopupsOverlap(visiblePopup, popup)) {
					shouldDisplay = false;
					break;
				}
				if (shouldDisplay) visiblepopups.push(popup);
				else popup.hide();
			}
		}
		doPopupsOverlap(popupA, popupB) {
			var rectA = popupA.getElement().getBoundingClientRect();
			var rectB = popupB.getElement().getBoundingClientRect();
			return rectA.left < rectB.right && rectA.right > rectB.left && rectA.top < rectB.bottom && rectA.bottom > rectB.top;
		}
	};
	var popupManager = new PopupManager();
	exports.popupManager = popupManager;
	exports.Tooltip = Tooltip;
	var HoverTooltip = class extends Tooltip {
		constructor(parentNode = document.body) {
			super(parentNode);
			this.timeout = void 0;
			this.lastT = 0;
			this.idleTime = 350;
			this.lastEvent = void 0;
			this.onMouseOut = this.onMouseOut.bind(this);
			this.onMouseMove = this.onMouseMove.bind(this);
			this.waitForHover = this.waitForHover.bind(this);
			this.hide = this.hide.bind(this);
			var el = this.getElement();
			el.style.whiteSpace = "pre-wrap";
			el.style.pointerEvents = "auto";
			el.addEventListener("mouseout", this.onMouseOut);
			el.tabIndex = -1;
			el.addEventListener("blur", function() {
				if (!el.contains(document.activeElement)) this.hide();
			}.bind(this));
			el.addEventListener("wheel", preventParentScroll);
		}
		addToEditor(editor) {
			editor.on("mousemove", this.onMouseMove);
			editor.on("mousedown", this.hide);
			var target = editor.renderer.getMouseEventTarget();
			if (target && typeof target.removeEventListener === "function") target.addEventListener("mouseout", this.onMouseOut, true);
		}
		removeFromEditor(editor) {
			editor.off("mousemove", this.onMouseMove);
			editor.off("mousedown", this.hide);
			var target = editor.renderer.getMouseEventTarget();
			if (target && typeof target.removeEventListener === "function") target.removeEventListener("mouseout", this.onMouseOut, true);
			if (this.timeout) {
				clearTimeout(this.timeout);
				this.timeout = null;
			}
		}
		onMouseMove(e, editor) {
			this.lastEvent = e;
			this.lastT = Date.now();
			var isMousePressed = editor.$mouseHandler.isMousePressed;
			if (this.isOpen) {
				var pos = this.lastEvent && this.lastEvent.getDocumentPosition();
				if (!this.range || !this.range.contains(pos.row, pos.column) || isMousePressed || this.isOutsideOfText(this.lastEvent)) this.hide();
			}
			if (this.timeout || isMousePressed) return;
			this.lastEvent = e;
			this.timeout = setTimeout(this.waitForHover, this.idleTime);
		}
		waitForHover() {
			if (this.timeout) clearTimeout(this.timeout);
			var dt = Date.now() - this.lastT;
			if (this.idleTime - dt > 10) {
				this.timeout = setTimeout(this.waitForHover, this.idleTime - dt);
				return;
			}
			this.timeout = null;
			if (this.lastEvent && !this.isOutsideOfText(this.lastEvent)) this.$gatherData(this.lastEvent, this.lastEvent.editor);
		}
		isOutsideOfText(e) {
			var editor = e.editor;
			var docPos = e.getDocumentPosition();
			var line = editor.session.getLine(docPos.row);
			if (docPos.column == line.length) {
				var screenPos = editor.renderer.pixelToScreenCoordinates(e.clientX, e.clientY);
				var clippedPos = editor.session.documentToScreenPosition(docPos.row, docPos.column);
				if (clippedPos.column != screenPos.column || clippedPos.row != screenPos.row) return true;
			}
			return false;
		}
		setDataProvider(value) {
			this.$gatherData = value;
		}
		showForRange(editor, range, domNode, startingEvent) {
			if (startingEvent && startingEvent != this.lastEvent) return;
			if (this.isOpen && document.activeElement == this.getElement()) return;
			var renderer = editor.renderer;
			if (!this.isOpen) {
				popupManager.addPopup(this);
				this.$registerCloseEvents();
				this.setTheme(renderer.theme);
			}
			this.isOpen = true;
			this.range = Range.fromPoints(range.start, range.end);
			var position = renderer.textToScreenCoordinates(range.start.row, range.start.column);
			var rect = renderer.scroller.getBoundingClientRect();
			if (position.pageX < rect.left) position.pageX = rect.left;
			var element = this.getElement();
			element.innerHTML = "";
			element.appendChild(domNode);
			element.style.maxHeight = "";
			element.style.display = "block";
			this.$setPosition(editor, position, true, range);
			dom.$fixPositionBug(element);
		}
		$setPosition(editor, position, withMarker, range) {
			var MARGIN = 10;
			withMarker && this.addMarker(range, editor.session);
			var renderer = editor.renderer;
			var element = this.getElement();
			var labelHeight = element.offsetHeight;
			var labelWidth = element.offsetWidth;
			var anchorTop = position.pageY;
			var anchorLeft = position.pageX;
			var spaceBelow = window.innerHeight - anchorTop - renderer.lineHeight;
			var isAbove = this.$shouldPlaceAbove(labelHeight, anchorTop, spaceBelow - MARGIN);
			element.style.maxHeight = (isAbove ? anchorTop : spaceBelow) - MARGIN + "px";
			element.style.top = isAbove ? "" : anchorTop + renderer.lineHeight + "px";
			element.style.bottom = isAbove ? window.innerHeight - anchorTop + "px" : "";
			element.style.left = Math.min(anchorLeft, window.innerWidth - labelWidth - MARGIN) + "px";
		}
		$shouldPlaceAbove(labelHeight, anchorTop, spaceBelow) {
			return !(anchorTop - labelHeight < 0 && anchorTop < spaceBelow);
		}
		addMarker(range, session) {
			if (this.marker) this.$markerSession.removeMarker(this.marker);
			this.$markerSession = session;
			this.marker = session && session.addMarker(range, "ace_highlight-marker", "text");
		}
		hide(e) {
			if (e && this.$fromKeyboard && e.type == "keydown") {
				if (e.code == "Escape") return;
			}
			if (!e && document.activeElement == this.getElement()) return;
			if (e && e.target && (e.type != "keydown" || e.ctrlKey || e.metaKey) && this.$element.contains(e.target)) return;
			this.lastEvent = null;
			if (this.timeout) clearTimeout(this.timeout);
			this.timeout = null;
			this.addMarker(null);
			if (this.isOpen) {
				this.$fromKeyboard = false;
				this.$removeCloseEvents();
				this.getElement().style.display = "none";
				this.isOpen = false;
				popupManager.removePopup(this);
			}
		}
		$registerCloseEvents() {
			window.addEventListener("keydown", this.hide, true);
			window.addEventListener("wheel", this.hide, true);
			window.addEventListener("mousedown", this.hide, true);
		}
		$removeCloseEvents() {
			window.removeEventListener("keydown", this.hide, true);
			window.removeEventListener("wheel", this.hide, true);
			window.removeEventListener("mousedown", this.hide, true);
		}
		onMouseOut(e) {
			if (this.timeout) {
				clearTimeout(this.timeout);
				this.timeout = null;
			}
			this.lastEvent = null;
			if (!this.isOpen) return;
			if (!e.relatedTarget || this.getElement().contains(e.relatedTarget)) return;
			if (e && e.currentTarget.contains(e.relatedTarget)) return;
			if (!e.relatedTarget.classList.contains("ace_content")) this.hide();
		}
	};
	exports.HoverTooltip = HoverTooltip;
}));
export { require_scroll as n, require_tooltip as t };
