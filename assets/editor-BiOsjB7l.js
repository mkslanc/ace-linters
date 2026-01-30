import { t as __commonJSMin } from "./chunk-iA-Slpst.js";
import { t as require_useragent } from "./useragent-BODERP_7.js";
import { t as require_dom } from "./dom-BBjJ92-n.js";
import { t as require_range } from "./range-BUVqNbwc.js";
import { t as require_oop } from "./oop-DcdK5Mrs.js";
import { t as require_lang } from "./lang-DcNOSqFo.js";
import { t as require_keys } from "./keys-B8CLTATX.js";
import { t as require_event } from "./event-BcX-N72I.js";
import { t as require_config } from "./config-DPm1ug3B.js";
import { t as require_event_emitter } from "./event_emitter-BGfSYA24.js";
import { s as require_mouse_event, t as require_edit_session } from "./edit_session-CDHRvoey.js";
import { t as require_tooltip } from "./tooltip-DAauyLxM.js";
import { t as require_token_iterator } from "./token_iterator-CbfYmntj.js";
import { t as require_hash_handler } from "./hash_handler-G_6vQiwI.js";
var require_clipboard = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var $cancelT;
	module.exports = {
		lineMode: false,
		pasteCancelled: function() {
			if ($cancelT && $cancelT > Date.now() - 50) return true;
			return $cancelT = false;
		},
		cancel: function() {
			$cancelT = Date.now();
		}
	};
}));
var require_textinput = /* @__PURE__ */ __commonJSMin(((exports) => {
	var event$5 = require_event();
	var nls$2 = require_config().nls;
	var useragent$4 = require_useragent();
	var dom$5 = require_dom();
	var lang$3 = require_lang();
	var clipboard$1 = require_clipboard();
	var BROKEN_SETDATA = useragent$4.isChrome < 18;
	var USE_IE_MIME_TYPE = useragent$4.isIE;
	var HAS_FOCUS_ARGS = useragent$4.isChrome > 63;
	var MAX_LINE_LENGTH = 400;
	var KEYS = require_keys();
	var MODS = KEYS.KEY_MODS;
	var isIOS = useragent$4.isIOS;
	var valueResetRegex = isIOS ? /\s/ : /\n/;
	var isMobile = useragent$4.isMobile;
	var TextInput$1 = class {
		constructor(parentNode, host) {
			this.host = host;
			this.text = dom$5.createElement("textarea");
			this.text.className = "ace_text-input";
			this.text.setAttribute("wrap", "off");
			this.text.setAttribute("autocomplete", "off");
			this.text.setAttribute("autocorrect", "off");
			this.text.setAttribute("autocapitalize", "off");
			this.text.setAttribute("spellcheck", "false");
			this.text.style.opacity = "0";
			parentNode.insertBefore(this.text, parentNode.firstChild);
			this.copied = false;
			this.pasted = false;
			this.inComposition = false;
			this.sendingText = false;
			this.tempStyle = "";
			if (!isMobile) this.text.style.fontSize = "1px";
			this.commandMode = false;
			this.ignoreFocusEvents = false;
			this.lastValue = "";
			this.lastSelectionStart = 0;
			this.lastSelectionEnd = 0;
			this.lastRestoreEnd = 0;
			this.rowStart = Number.MAX_SAFE_INTEGER;
			this.rowEnd = Number.MIN_SAFE_INTEGER;
			this.numberOfExtraLines = 0;
			try {
				this.$isFocused = document.activeElement === this.text;
			} catch (e) {}
			this.cancelComposition = this.cancelComposition.bind(this);
			this.setAriaOptions({ role: "textbox" });
			event$5.addListener(this.text, "blur", (e) => {
				if (this.ignoreFocusEvents) return;
				host.onBlur(e);
				this.$isFocused = false;
			}, host);
			event$5.addListener(this.text, "focus", (e) => {
				if (this.ignoreFocusEvents) return;
				this.$isFocused = true;
				if (useragent$4.isEdge) try {
					if (!document.hasFocus()) return;
				} catch (e$1) {}
				host.onFocus(e);
				if (useragent$4.isEdge) setTimeout(this.resetSelection.bind(this));
				else this.resetSelection();
			}, host);
			this.$focusScroll = false;
			host.on("beforeEndOperation", () => {
				var curOp = host.curOp;
				var commandName = curOp && curOp.command && curOp.command.name;
				if (commandName == "insertstring") return;
				var isUserAction = commandName && (curOp.docChanged || curOp.selectionChanged);
				if (this.inComposition && isUserAction) {
					this.lastValue = this.text.value = "";
					this.onCompositionEnd();
				}
				this.resetSelection();
			});
			host.on("changeSelection", this.setAriaLabel.bind(this));
			this.resetSelection = isIOS ? this.$resetSelectionIOS : this.$resetSelection;
			if (this.$isFocused) host.onFocus();
			this.inputHandler = null;
			this.afterContextMenu = false;
			event$5.addCommandKeyListener(this.text, (e, hashId, keyCode) => {
				if (this.inComposition) return;
				return host.onCommandKey(e, hashId, keyCode);
			}, host);
			event$5.addListener(this.text, "select", this.onSelect.bind(this), host);
			event$5.addListener(this.text, "input", this.onInput.bind(this), host);
			event$5.addListener(this.text, "cut", this.onCut.bind(this), host);
			event$5.addListener(this.text, "copy", this.onCopy.bind(this), host);
			event$5.addListener(this.text, "paste", this.onPaste.bind(this), host);
			if (!("oncut" in this.text) || !("oncopy" in this.text) || !("onpaste" in this.text)) event$5.addListener(parentNode, "keydown", (e) => {
				if (useragent$4.isMac && !e.metaKey || !e.ctrlKey) return;
				switch (e.keyCode) {
					case 67:
						this.onCopy(e);
						break;
					case 86:
						this.onPaste(e);
						break;
					case 88:
						this.onCut(e);
						break;
				}
			}, host);
			this.syncComposition = lang$3.delayedCall(this.onCompositionUpdate.bind(this), 50).schedule.bind(null, null);
			event$5.addListener(this.text, "compositionstart", this.onCompositionStart.bind(this), host);
			event$5.addListener(this.text, "compositionupdate", this.onCompositionUpdate.bind(this), host);
			event$5.addListener(this.text, "keyup", this.onKeyup.bind(this), host);
			event$5.addListener(this.text, "keydown", this.syncComposition.bind(this), host);
			event$5.addListener(this.text, "compositionend", this.onCompositionEnd.bind(this), host);
			this.closeTimeout;
			event$5.addListener(this.text, "mouseup", this.$onContextMenu.bind(this), host);
			event$5.addListener(this.text, "mousedown", (e) => {
				e.preventDefault();
				this.onContextMenuClose();
			}, host);
			event$5.addListener(host.renderer.scroller, "contextmenu", this.$onContextMenu.bind(this), host);
			event$5.addListener(this.text, "contextmenu", this.$onContextMenu.bind(this), host);
			if (isIOS) this.addIosSelectionHandler(parentNode, host, this.text);
		}
		addIosSelectionHandler(parentNode, host, text) {
			var typingResetTimeout = null;
			var typing = false;
			text.addEventListener("keydown", function(e) {
				if (typingResetTimeout) clearTimeout(typingResetTimeout);
				typing = true;
			}, true);
			text.addEventListener("keyup", function(e) {
				typingResetTimeout = setTimeout(function() {
					typing = false;
				}, 100);
			}, true);
			var detectArrowKeys = (e) => {
				if (document.activeElement !== text) return;
				if (typing || this.inComposition || host.$mouseHandler.isMousePressed) return;
				if (this.copied) return;
				var selectionStart = text.selectionStart;
				var selectionEnd = text.selectionEnd;
				var key = null;
				var modifier = 0;
				if (selectionStart == 0) key = KEYS.up;
				else if (selectionStart == 1) key = KEYS.home;
				else if (selectionEnd > this.lastSelectionEnd && this.lastValue[selectionEnd] == "\n") key = KEYS.end;
				else if (selectionStart < this.lastSelectionStart && this.lastValue[selectionStart - 1] == " ") {
					key = KEYS.left;
					modifier = MODS.option;
				} else if (selectionStart < this.lastSelectionStart || selectionStart == this.lastSelectionStart && this.lastSelectionEnd != this.lastSelectionStart && selectionStart == selectionEnd) key = KEYS.left;
				else if (selectionEnd > this.lastSelectionEnd && this.lastValue.slice(0, selectionEnd).split("\n").length > 2) key = KEYS.down;
				else if (selectionEnd > this.lastSelectionEnd && this.lastValue[selectionEnd - 1] == " ") {
					key = KEYS.right;
					modifier = MODS.option;
				} else if (selectionEnd > this.lastSelectionEnd || selectionEnd == this.lastSelectionEnd && this.lastSelectionEnd != this.lastSelectionStart && selectionStart == selectionEnd) key = KEYS.right;
				if (selectionStart !== selectionEnd) modifier |= MODS.shift;
				if (key) {
					if (!host.onCommandKey({}, modifier, key) && host.commands) {
						key = KEYS.keyCodeToString(key);
						var command = host.commands.findKeyCommand(modifier, key);
						if (command) host.execCommand(command);
					}
					this.lastSelectionStart = selectionStart;
					this.lastSelectionEnd = selectionEnd;
					this.resetSelection("");
				}
			};
			document.addEventListener("selectionchange", detectArrowKeys);
			host.on("destroy", function() {
				document.removeEventListener("selectionchange", detectArrowKeys);
			});
		}
		onContextMenuClose() {
			clearTimeout(this.closeTimeout);
			this.closeTimeout = setTimeout(() => {
				if (this.tempStyle) {
					this.text.style.cssText = this.tempStyle;
					this.tempStyle = "";
				}
				this.host.renderer.$isMousePressed = false;
				if (this.host.renderer.$keepTextAreaAtCursor) this.host.renderer.$moveTextAreaToCursor();
			}, 0);
		}
		$onContextMenu(e) {
			this.host.textInput.onContextMenu(e);
			this.onContextMenuClose();
		}
		onKeyup(e) {
			if (e.keyCode == 27 && this.text.value.length < this.text.selectionStart) {
				if (!this.inComposition) this.lastValue = this.text.value;
				this.lastSelectionStart = this.lastSelectionEnd = -1;
				this.resetSelection();
			}
			this.syncComposition();
		}
		cancelComposition() {
			this.ignoreFocusEvents = true;
			this.text.blur();
			this.text.focus();
			this.ignoreFocusEvents = false;
		}
		onCompositionStart(e) {
			if (this.inComposition || !this.host.onCompositionStart || this.host.$readOnly) return;
			this.inComposition = {};
			if (this.commandMode) return;
			if (e.data) this.inComposition.useTextareaForIME = false;
			setTimeout(this.onCompositionUpdate.bind(this), 0);
			this.host._signal("compositionStart");
			this.host.on("mousedown", this.cancelComposition);
			var range = this.host.getSelectionRange();
			range.end.row = range.start.row;
			range.end.column = range.start.column;
			this.inComposition.markerRange = range;
			this.inComposition.selectionStart = this.lastSelectionStart;
			this.host.onCompositionStart(this.inComposition);
			if (this.inComposition.useTextareaForIME) {
				this.lastValue = this.text.value = "";
				this.lastSelectionStart = 0;
				this.lastSelectionEnd = 0;
			} else {
				if (this.text.msGetInputContext) this.inComposition.context = this.text.msGetInputContext();
				if (this.text.getInputContext) this.inComposition.context = this.text.getInputContext();
			}
		}
		onCompositionUpdate() {
			if (!this.inComposition || !this.host.onCompositionUpdate || this.host.$readOnly) return;
			if (this.commandMode) return this.cancelComposition();
			if (this.inComposition.useTextareaForIME) this.host.onCompositionUpdate(this.text.value);
			else {
				var data = this.text.value;
				this.sendText(data);
				if (this.inComposition.markerRange) {
					if (this.inComposition.context) this.inComposition.markerRange.start.column = this.inComposition.selectionStart = this.inComposition.context.compositionStartOffset;
					this.inComposition.markerRange.end.column = this.inComposition.markerRange.start.column + this.lastSelectionEnd - this.inComposition.selectionStart + this.lastRestoreEnd;
				}
			}
		}
		onCompositionEnd(e) {
			if (!this.host.onCompositionEnd || this.host.$readOnly) return;
			this.inComposition = false;
			this.host.onCompositionEnd();
			this.host.off("mousedown", this.cancelComposition);
			if (e) this.onInput();
		}
		onCut(e) {
			this.doCopy(e, true);
		}
		onCopy(e) {
			this.doCopy(e, false);
		}
		onPaste(e) {
			var data = this.handleClipboardData(e);
			if (clipboard$1.pasteCancelled()) return;
			if (typeof data == "string") {
				if (data) this.host.onPaste(data, e);
				if (useragent$4.isIE) setTimeout(this.resetSelection);
				event$5.preventDefault(e);
			} else {
				this.text.value = "";
				this.pasted = true;
			}
		}
		doCopy(e, isCut) {
			var data = this.host.getCopyText();
			if (!data) return event$5.preventDefault(e);
			if (this.handleClipboardData(e, data)) {
				if (isIOS) {
					this.resetSelection(data);
					this.copied = data;
					setTimeout(() => {
						this.copied = false;
					}, 10);
				}
				isCut ? this.host.onCut() : this.host.onCopy();
				event$5.preventDefault(e);
			} else {
				this.copied = true;
				this.text.value = data;
				this.text.select();
				setTimeout(() => {
					this.copied = false;
					this.resetSelection();
					isCut ? this.host.onCut() : this.host.onCopy();
				});
			}
		}
		handleClipboardData(e, data, forceIEMime) {
			var clipboardData = e.clipboardData || window["clipboardData"];
			if (!clipboardData || BROKEN_SETDATA) return;
			var mime = USE_IE_MIME_TYPE || forceIEMime ? "Text" : "text/plain";
			try {
				if (data) return clipboardData.setData(mime, data) !== false;
				else return clipboardData.getData(mime);
			} catch (e$1) {
				if (!forceIEMime) return this.handleClipboardData(e$1, data, true);
			}
		}
		onInput(e) {
			if (this.inComposition) return this.onCompositionUpdate();
			if (e && e.inputType) {
				if (e.inputType == "historyUndo") return this.host.execCommand("undo");
				if (e.inputType == "historyRedo") return this.host.execCommand("redo");
			}
			var data = this.text.value;
			var inserted = this.sendText(data, true);
			if (data.length > MAX_LINE_LENGTH + 100 || valueResetRegex.test(inserted) || isMobile && this.lastSelectionStart < 1 && this.lastSelectionStart == this.lastSelectionEnd) this.resetSelection();
		}
		sendText(value, fromInput) {
			if (this.afterContextMenu) this.afterContextMenu = false;
			if (this.pasted) {
				this.resetSelection();
				if (value) this.host.onPaste(value);
				this.pasted = false;
				return "";
			} else {
				var selectionStart = this.text.selectionStart;
				var selectionEnd = this.text.selectionEnd;
				var extendLeft = this.lastSelectionStart;
				var extendRight = this.lastValue.length - this.lastSelectionEnd;
				var inserted = value;
				var restoreStart = value.length - selectionStart;
				var restoreEnd = value.length - selectionEnd;
				var i$1 = 0;
				while (extendLeft > 0 && this.lastValue[i$1] == value[i$1]) {
					i$1++;
					extendLeft--;
				}
				inserted = inserted.slice(i$1);
				i$1 = 1;
				while (extendRight > 0 && this.lastValue.length - i$1 > this.lastSelectionStart - 1 && this.lastValue[this.lastValue.length - i$1] == value[value.length - i$1]) {
					i$1++;
					extendRight--;
				}
				restoreStart -= i$1 - 1;
				restoreEnd -= i$1 - 1;
				var endIndex = inserted.length - i$1 + 1;
				if (endIndex < 0) {
					extendLeft = -endIndex;
					endIndex = 0;
				}
				inserted = inserted.slice(0, endIndex);
				if (!fromInput && !inserted && !restoreStart && !extendLeft && !extendRight && !restoreEnd) return "";
				this.sendingText = true;
				var shouldReset = false;
				if (useragent$4.isAndroid && inserted == ". ") {
					inserted = "  ";
					shouldReset = true;
				}
				if (inserted && !extendLeft && !extendRight && !restoreStart && !restoreEnd || this.commandMode) this.host.onTextInput(inserted);
				else this.host.onTextInput(inserted, {
					extendLeft,
					extendRight,
					restoreStart,
					restoreEnd
				});
				this.sendingText = false;
				this.lastValue = value;
				this.lastSelectionStart = selectionStart;
				this.lastSelectionEnd = selectionEnd;
				this.lastRestoreEnd = restoreEnd;
				return shouldReset ? "\n" : inserted;
			}
		}
		onSelect(e) {
			if (this.inComposition) return;
			var isAllSelected = (text) => {
				return text.selectionStart === 0 && text.selectionEnd >= this.lastValue.length && text.value === this.lastValue && this.lastValue && text.selectionEnd !== this.lastSelectionEnd;
			};
			if (this.copied) this.copied = false;
			else if (isAllSelected(this.text)) {
				this.host.selectAll();
				this.resetSelection();
			} else if (isMobile && this.text.selectionStart != this.lastSelectionStart) this.resetSelection();
		}
		$resetSelectionIOS(value) {
			if (!this.$isFocused || this.copied && !value || this.sendingText) return;
			if (!value) value = "";
			var newValue = "\n ab" + value + "cde fg\n";
			if (newValue != this.text.value) this.text.value = this.lastValue = newValue;
			var selectionStart = 4;
			var selectionEnd = 4 + (value.length || (this.host.selection.isEmpty() ? 0 : 1));
			if (this.lastSelectionStart != selectionStart || this.lastSelectionEnd != selectionEnd) this.text.setSelectionRange(selectionStart, selectionEnd);
			this.lastSelectionStart = selectionStart;
			this.lastSelectionEnd = selectionEnd;
		}
		$resetSelection() {
			if (this.inComposition || this.sendingText) return;
			if (!this.$isFocused && !this.afterContextMenu) return;
			this.inComposition = true;
			var selectionStart = 0;
			var selectionEnd = 0;
			var line = "";
			var positionToSelection = (row$1, column) => {
				var selection$1 = column;
				for (var i$2 = 1; i$2 <= row$1 - this.rowStart && i$2 < 2 * this.numberOfExtraLines + 1; i$2++) selection$1 += this.host.session.getLine(row$1 - i$2).length + 1;
				return selection$1;
			};
			if (this.host.session) {
				var selection = this.host.selection;
				var range = selection.getRange();
				var row = selection.cursor.row;
				if (row === this.rowEnd + 1) {
					this.rowStart = this.rowEnd + 1;
					this.rowEnd = this.rowStart + 2 * this.numberOfExtraLines;
				} else if (row === this.rowStart - 1) {
					this.rowEnd = this.rowStart - 1;
					this.rowStart = this.rowEnd - 2 * this.numberOfExtraLines;
				} else if (row < this.rowStart - 1 || row > this.rowEnd + 1) {
					this.rowStart = row > this.numberOfExtraLines ? row - this.numberOfExtraLines : 0;
					this.rowEnd = row > this.numberOfExtraLines ? row + this.numberOfExtraLines : 2 * this.numberOfExtraLines;
				}
				var lines = [];
				for (var i$1 = this.rowStart; i$1 <= this.rowEnd; i$1++) lines.push(this.host.session.getLine(i$1));
				line = lines.join("\n");
				selectionStart = positionToSelection(range.start.row, range.start.column);
				selectionEnd = positionToSelection(range.end.row, range.end.column);
				if (range.start.row < this.rowStart) {
					var prevLine = this.host.session.getLine(this.rowStart - 1);
					selectionStart = range.start.row < this.rowStart - 1 ? 0 : selectionStart;
					selectionEnd += prevLine.length + 1;
					line = prevLine + "\n" + line;
				} else if (range.end.row > this.rowEnd) {
					var nextLine = this.host.session.getLine(this.rowEnd + 1);
					selectionEnd = range.end.row > this.rowEnd + 1 ? nextLine.length : range.end.column;
					selectionEnd += line.length + 1;
					line = line + "\n" + nextLine;
				} else if (isMobile && row > 0) {
					line = "\n" + line;
					selectionEnd += 1;
					selectionStart += 1;
				}
				if (line.length > MAX_LINE_LENGTH) if (selectionStart < MAX_LINE_LENGTH && selectionEnd < MAX_LINE_LENGTH) line = line.slice(0, MAX_LINE_LENGTH);
				else {
					line = "\n";
					if (selectionStart == selectionEnd) selectionStart = selectionEnd = 0;
					else {
						selectionStart = 0;
						selectionEnd = 1;
					}
				}
				var newValue = line + "\n\n";
				if (newValue != this.lastValue) {
					this.text.value = this.lastValue = newValue;
					this.lastSelectionStart = this.lastSelectionEnd = newValue.length;
				}
			}
			if (this.afterContextMenu) {
				this.lastSelectionStart = this.text.selectionStart;
				this.lastSelectionEnd = this.text.selectionEnd;
			}
			if (this.lastSelectionEnd != selectionEnd || this.lastSelectionStart != selectionStart || this.text.selectionEnd != this.lastSelectionEnd) try {
				this.text.setSelectionRange(selectionStart, selectionEnd);
				this.lastSelectionStart = selectionStart;
				this.lastSelectionEnd = selectionEnd;
			} catch (e) {}
			this.inComposition = false;
		}
		setHost(newHost) {
			this.host = newHost;
		}
		setNumberOfExtraLines(number) {
			this.rowStart = Number.MAX_SAFE_INTEGER;
			this.rowEnd = Number.MIN_SAFE_INTEGER;
			if (number < 0) {
				this.numberOfExtraLines = 0;
				return;
			}
			this.numberOfExtraLines = number;
		}
		setAriaLabel() {
			var ariaLabel = "";
			if (this.host.$textInputAriaLabel) ariaLabel += `${this.host.$textInputAriaLabel}, `;
			if (this.host.session) {
				var row = this.host.session.selection.cursor.row;
				ariaLabel += nls$2("text-input.aria-label", "Cursor at row $0", [row + 1]);
			}
			this.text.setAttribute("aria-label", ariaLabel);
		}
		setAriaOptions(options) {
			if (options.activeDescendant) {
				this.text.setAttribute("aria-haspopup", "true");
				this.text.setAttribute("aria-autocomplete", options.inline ? "both" : "list");
				this.text.setAttribute("aria-activedescendant", options.activeDescendant);
			} else {
				this.text.setAttribute("aria-haspopup", "false");
				this.text.setAttribute("aria-autocomplete", "both");
				this.text.removeAttribute("aria-activedescendant");
			}
			if (options.role) this.text.setAttribute("role", options.role);
			if (options.setLabel) {
				this.text.setAttribute("aria-roledescription", nls$2("text-input.aria-roledescription", "editor"));
				this.setAriaLabel();
			}
		}
		focus() {
			this.setAriaOptions({ setLabel: this.host.renderer.enableKeyboardAccessibility });
			if (this.tempStyle || HAS_FOCUS_ARGS || this.$focusScroll == "browser") return this.text.focus({ preventScroll: true });
			var top = this.text.style.top;
			this.text.style.position = "fixed";
			this.text.style.top = "0px";
			try {
				var isTransformed = this.text.getBoundingClientRect().top != 0;
			} catch (e) {
				return;
			}
			var ancestors = [];
			if (isTransformed) {
				var t = this.text.parentElement;
				while (t && t.nodeType == 1) {
					ancestors.push(t);
					t.setAttribute("ace_nocontext", "true");
					if (!t.parentElement && t.getRootNode) t = t.getRootNode()["host"];
					else t = t.parentElement;
				}
			}
			this.text.focus({ preventScroll: true });
			if (isTransformed) ancestors.forEach(function(p) {
				p.removeAttribute("ace_nocontext");
			});
			setTimeout(() => {
				this.text.style.position = "";
				if (this.text.style.top == "0px") this.text.style.top = top;
			}, 0);
		}
		blur() {
			this.text.blur();
		}
		isFocused() {
			return this.$isFocused;
		}
		setInputHandler(cb) {
			this.inputHandler = cb;
		}
		getInputHandler() {
			return this.inputHandler;
		}
		getElement() {
			return this.text;
		}
		setCommandMode(value) {
			this.commandMode = value;
			this.text.readOnly = false;
		}
		setReadOnly(readOnly) {
			if (!this.commandMode) this.text.readOnly = readOnly;
		}
		setCopyWithEmptySelection(value) {}
		onContextMenu(e) {
			this.afterContextMenu = true;
			this.resetSelection();
			this.host._emit("nativecontextmenu", {
				target: this.host,
				domEvent: e
			});
			this.moveToMouse(e, true);
		}
		moveToMouse(e, bringToFront) {
			if (!this.tempStyle) this.tempStyle = this.text.style.cssText;
			this.text.style.cssText = (bringToFront ? "z-index:100000;" : "") + (useragent$4.isIE ? "opacity:0.1;" : "") + "text-indent: -" + (this.lastSelectionStart + this.lastSelectionEnd) * this.host.renderer.characterWidth * .5 + "px;";
			var rect = this.host.container.getBoundingClientRect();
			var style = dom$5.computedStyle(this.host.container);
			var top = rect.top + (parseInt(style.borderTopWidth) || 0);
			var left = rect.left + (parseInt(style.borderLeftWidth) || 0);
			var maxTop = rect.bottom - top - this.text.clientHeight - 2;
			var move = (e$1) => {
				dom$5.translate(this.text, e$1.clientX - left - 2, Math.min(e$1.clientY - top - 2, maxTop));
			};
			move(e);
			if (e.type != "mousedown") return;
			this.host.renderer.$isMousePressed = true;
			clearTimeout(this.closeTimeout);
			if (useragent$4.isWin) event$5.capture(this.host.container, move, this.onContextMenuClose.bind(this));
		}
		destroy() {
			if (this.text.parentElement) this.text.parentElement.removeChild(this.text);
		}
	};
	exports.TextInput = TextInput$1;
	exports.$setUserAgentForTests = function(_isMobile, _isIOS) {
		isMobile = _isMobile;
		isIOS = _isIOS;
	};
}));
var require_default_handlers = /* @__PURE__ */ __commonJSMin(((exports) => {
	var useragent$3 = require_useragent();
	var DRAG_OFFSET = 0;
	var SCROLL_COOLDOWN_T = 550;
	var DefaultHandlers$1 = class {
		constructor(mouseHandler) {
			mouseHandler.$clickSelection = null;
			var editor = mouseHandler.editor;
			editor.setDefaultHandler("mousedown", this.onMouseDown.bind(mouseHandler));
			editor.setDefaultHandler("dblclick", this.onDoubleClick.bind(mouseHandler));
			editor.setDefaultHandler("tripleclick", this.onTripleClick.bind(mouseHandler));
			editor.setDefaultHandler("quadclick", this.onQuadClick.bind(mouseHandler));
			editor.setDefaultHandler("mousewheel", this.onMouseWheel.bind(mouseHandler));
			[
				"select",
				"startSelect",
				"selectEnd",
				"selectAllEnd",
				"selectByWordsEnd",
				"selectByLinesEnd",
				"dragWait",
				"dragWaitEnd",
				"focusWait"
			].forEach(function(x) {
				mouseHandler[x] = this[x];
			}, this);
			mouseHandler["selectByLines"] = this.extendSelectionBy.bind(mouseHandler, "getLineRange");
			mouseHandler["selectByWords"] = this.extendSelectionBy.bind(mouseHandler, "getWordRange");
		}
		onMouseDown(ev) {
			var inSelection = ev.inSelection();
			var pos = ev.getDocumentPosition();
			this.mousedownEvent = ev;
			var editor = this.editor;
			var button = ev.getButton();
			if (button !== 0) {
				if (editor.getSelectionRange().isEmpty() || button == 1) editor.selection.moveToPosition(pos);
				if (button == 2) {
					editor.textInput.onContextMenu(ev.domEvent);
					if (!useragent$3.isMozilla) ev.preventDefault();
				}
				return;
			}
			this.mousedownEvent.time = Date.now();
			if (inSelection && !editor.isFocused()) {
				editor.focus();
				if (this.$focusTimeout && !this.$clickSelection && !editor.inMultiSelectMode) {
					this.setState("focusWait");
					this.captureMouse(ev);
					return;
				}
			}
			this.captureMouse(ev);
			this.startSelect(pos, ev.domEvent._clicks > 1);
			return ev.preventDefault();
		}
		startSelect(pos, waitForClickSelection) {
			pos = pos || this.editor.renderer.screenToTextCoordinates(this.x, this.y);
			var editor = this.editor;
			if (!this.mousedownEvent) return;
			if (this.mousedownEvent.getShiftKey()) editor.selection.selectToPosition(pos);
			else if (!waitForClickSelection) editor.selection.moveToPosition(pos);
			if (!waitForClickSelection) this.select();
			editor.setStyle("ace_selecting");
			this.setState("select");
		}
		select() {
			var anchor, editor = this.editor;
			var cursor = editor.renderer.screenToTextCoordinates(this.x, this.y);
			if (this.$clickSelection) {
				var cmp = this.$clickSelection.comparePoint(cursor);
				if (cmp == -1) anchor = this.$clickSelection.end;
				else if (cmp == 1) anchor = this.$clickSelection.start;
				else {
					var orientedRange = calcRangeOrientation(this.$clickSelection, cursor, editor.session);
					cursor = orientedRange.cursor;
					anchor = orientedRange.anchor;
				}
				editor.selection.setSelectionAnchor(anchor.row, anchor.column);
			}
			editor.selection.selectToPosition(cursor);
			editor.renderer.scrollCursorIntoView();
		}
		extendSelectionBy(unitName) {
			var anchor, editor = this.editor;
			var cursor = editor.renderer.screenToTextCoordinates(this.x, this.y);
			var range = editor.selection[unitName](cursor.row, cursor.column);
			if (this.$clickSelection) {
				var cmpStart = this.$clickSelection.comparePoint(range.start);
				var cmpEnd = this.$clickSelection.comparePoint(range.end);
				if (cmpStart == -1 && cmpEnd <= 0) {
					anchor = this.$clickSelection.end;
					if (range.end.row != cursor.row || range.end.column != cursor.column) cursor = range.start;
				} else if (cmpEnd == 1 && cmpStart >= 0) {
					anchor = this.$clickSelection.start;
					if (range.start.row != cursor.row || range.start.column != cursor.column) cursor = range.end;
				} else if (cmpStart == -1 && cmpEnd == 1) {
					cursor = range.end;
					anchor = range.start;
				} else {
					var orientedRange = calcRangeOrientation(this.$clickSelection, cursor, editor.session);
					cursor = orientedRange.cursor;
					anchor = orientedRange.anchor;
				}
				editor.selection.setSelectionAnchor(anchor.row, anchor.column);
			}
			editor.selection.selectToPosition(cursor);
			editor.renderer.scrollCursorIntoView();
		}
		selectByLinesEnd() {
			this.$clickSelection = null;
			this.editor.unsetStyle("ace_selecting");
		}
		focusWait() {
			if (calcDistance$1(this.mousedownEvent.x, this.mousedownEvent.y, this.x, this.y) > DRAG_OFFSET || Date.now() - this.mousedownEvent.time > this.$focusTimeout) this.startSelect(this.mousedownEvent.getDocumentPosition());
		}
		onDoubleClick(ev) {
			var pos = ev.getDocumentPosition();
			var editor = this.editor;
			var range = editor.session.getBracketRange(pos);
			if (range) {
				if (range.isEmpty()) {
					range.start.column--;
					range.end.column++;
				}
				this.setState("select");
			} else {
				range = editor.selection.getWordRange(pos.row, pos.column);
				this.setState("selectByWords");
			}
			this.$clickSelection = range;
			this.select();
		}
		onTripleClick(ev) {
			var pos = ev.getDocumentPosition();
			var editor = this.editor;
			this.setState("selectByLines");
			var range = editor.getSelectionRange();
			if (range.isMultiLine() && range.contains(pos.row, pos.column)) {
				this.$clickSelection = editor.selection.getLineRange(range.start.row);
				this.$clickSelection.end = editor.selection.getLineRange(range.end.row).end;
			} else this.$clickSelection = editor.selection.getLineRange(pos.row);
			this.select();
		}
		onQuadClick(ev) {
			var editor = this.editor;
			editor.selectAll();
			this.$clickSelection = editor.getSelectionRange();
			this.setState("selectAll");
		}
		onMouseWheel(ev) {
			if (ev.getAccelKey()) return;
			if (ev.getShiftKey() && ev.wheelY && !ev.wheelX) {
				ev.wheelX = ev.wheelY;
				ev.wheelY = 0;
			}
			var editor = this.editor;
			if (!this.$lastScroll) this.$lastScroll = {
				t: 0,
				vx: 0,
				vy: 0,
				allowed: 0
			};
			var prevScroll = this.$lastScroll;
			var t = ev.domEvent.timeStamp;
			var dt = t - prevScroll.t;
			var vx = dt ? ev.wheelX / dt : prevScroll.vx;
			var vy = dt ? ev.wheelY / dt : prevScroll.vy;
			if (dt < SCROLL_COOLDOWN_T) {
				vx = (vx + prevScroll.vx) / 2;
				vy = (vy + prevScroll.vy) / 2;
			}
			var direction = Math.abs(vx / vy);
			var canScroll = false;
			if (direction >= 1 && editor.renderer.isScrollableBy(ev.wheelX * ev.speed, 0)) canScroll = true;
			if (direction <= 1 && editor.renderer.isScrollableBy(0, ev.wheelY * ev.speed)) canScroll = true;
			if (canScroll) prevScroll.allowed = t;
			else if (t - prevScroll.allowed < SCROLL_COOLDOWN_T) if (Math.abs(vx) <= 1.5 * Math.abs(prevScroll.vx) && Math.abs(vy) <= 1.5 * Math.abs(prevScroll.vy)) {
				canScroll = true;
				prevScroll.allowed = t;
			} else prevScroll.allowed = 0;
			prevScroll.t = t;
			prevScroll.vx = vx;
			prevScroll.vy = vy;
			if (canScroll) {
				editor.renderer.scrollBy(ev.wheelX * ev.speed, ev.wheelY * ev.speed);
				return ev.stop();
			}
		}
	};
	DefaultHandlers$1.prototype.selectEnd = DefaultHandlers$1.prototype.selectByLinesEnd;
	DefaultHandlers$1.prototype.selectAllEnd = DefaultHandlers$1.prototype.selectByLinesEnd;
	DefaultHandlers$1.prototype.selectByWordsEnd = DefaultHandlers$1.prototype.selectByLinesEnd;
	exports.DefaultHandlers = DefaultHandlers$1;
	function calcDistance$1(ax, ay, bx, by) {
		return Math.sqrt(Math.pow(bx - ax, 2) + Math.pow(by - ay, 2));
	}
	function calcRangeOrientation(range, cursor, session) {
		if (range.start.row == range.end.row) var cmp = 2 * cursor.column - range.start.column - range.end.column;
		else if (range.start.row == range.end.row - 1 && !range.start.column && !range.end.column) var cmp = 3 * cursor.column - 2 * session.getLine(range.start.row).length;
		else var cmp = 2 * cursor.row - range.start.row - range.end.row;
		if (cmp < 0) return {
			cursor: range.start,
			anchor: range.end
		};
		else return {
			cursor: range.end,
			anchor: range.start
		};
	}
}));
var require_default_gutter_handler = /* @__PURE__ */ __commonJSMin(((exports) => {
	var dom$4 = require_dom();
	var MouseEvent$2 = require_mouse_event().MouseEvent;
	var HoverTooltip$1 = require_tooltip().HoverTooltip;
	var nls$1 = require_config().nls;
	var Range$3 = require_range().Range;
	function GutterHandler(mouseHandler) {
		var editor = mouseHandler.editor;
		var gutter = editor.renderer.$gutterLayer;
		mouseHandler.$tooltip = new GutterTooltip(editor);
		mouseHandler.$tooltip.addToEditor(editor);
		mouseHandler.$tooltip.setDataProvider(function(e, editor$1) {
			var row = e.getDocumentPosition().row;
			mouseHandler.$tooltip.showTooltip(row);
		});
		mouseHandler.editor.setDefaultHandler("guttermousedown", function(e) {
			if (!editor.isFocused() || e.getButton() != 0) return;
			if (gutter.getRegion(e) == "foldWidgets") return;
			var row = e.getDocumentPosition().row;
			var selection = editor.session.selection;
			if (e.getShiftKey()) selection.selectTo(row, 0);
			else {
				if (e.domEvent.detail == 2) {
					editor.selectAll();
					return e.preventDefault();
				}
				mouseHandler.$clickSelection = editor.selection.getLineRange(row);
			}
			mouseHandler.setState("selectByLines");
			mouseHandler.captureMouse(e);
			return e.preventDefault();
		});
	}
	exports.GutterHandler = GutterHandler;
	var GutterTooltip = class GutterTooltip extends HoverTooltip$1 {
		constructor(editor) {
			super(editor.container);
			this.id = "gt" + ++GutterTooltip.$uid;
			this.editor = editor;
			this.visibleTooltipRow;
			var el = this.getElement();
			el.setAttribute("role", "tooltip");
			el.setAttribute("id", this.id);
			el.style.pointerEvents = "auto";
			this.idleTime = 50;
			this.onDomMouseMove = this.onDomMouseMove.bind(this);
			this.onDomMouseOut = this.onDomMouseOut.bind(this);
			this.setClassName("ace_gutter-tooltip");
		}
		onDomMouseMove(domEvent) {
			var aceEvent = new MouseEvent$2(domEvent, this.editor);
			this.onMouseMove(aceEvent, this.editor);
		}
		onDomMouseOut(domEvent) {
			var aceEvent = new MouseEvent$2(domEvent, this.editor);
			this.onMouseOut(aceEvent);
		}
		addToEditor(editor) {
			var gutter = editor.renderer.$gutter;
			gutter.addEventListener("mousemove", this.onDomMouseMove);
			gutter.addEventListener("mouseout", this.onDomMouseOut);
			super.addToEditor(editor);
		}
		removeFromEditor(editor) {
			var gutter = editor.renderer.$gutter;
			gutter.removeEventListener("mousemove", this.onDomMouseMove);
			gutter.removeEventListener("mouseout", this.onDomMouseOut);
			super.removeFromEditor(editor);
		}
		destroy() {
			if (this.editor) this.removeFromEditor(this.editor);
			super.destroy();
		}
		static get annotationLabels() {
			return {
				error: {
					singular: nls$1("gutter-tooltip.aria-label.error.singular", "error"),
					plural: nls$1("gutter-tooltip.aria-label.error.plural", "errors")
				},
				security: {
					singular: nls$1("gutter-tooltip.aria-label.security.singular", "security finding"),
					plural: nls$1("gutter-tooltip.aria-label.security.plural", "security findings")
				},
				warning: {
					singular: nls$1("gutter-tooltip.aria-label.warning.singular", "warning"),
					plural: nls$1("gutter-tooltip.aria-label.warning.plural", "warnings")
				},
				info: {
					singular: nls$1("gutter-tooltip.aria-label.info.singular", "information message"),
					plural: nls$1("gutter-tooltip.aria-label.info.plural", "information messages")
				},
				hint: {
					singular: nls$1("gutter-tooltip.aria-label.hint.singular", "suggestion"),
					plural: nls$1("gutter-tooltip.aria-label.hint.plural", "suggestions")
				}
			};
		}
		showTooltip(row) {
			var gutter = this.editor.renderer.$gutterLayer;
			var annotationsInRow = gutter.$annotations[row];
			var annotation;
			if (annotationsInRow) annotation = {
				displayText: Array.from(annotationsInRow.displayText),
				type: Array.from(annotationsInRow.type)
			};
			else annotation = {
				displayText: [],
				type: []
			};
			var fold = gutter.session.getFoldLine(row);
			if (fold && gutter.$showFoldedAnnotations) {
				var annotationsInFold = {
					error: [],
					security: [],
					warning: [],
					info: [],
					hint: []
				};
				var severityRank = {
					error: 1,
					security: 2,
					warning: 3,
					info: 4,
					hint: 5
				};
				var mostSevereAnnotationTypeInFold;
				for (var i$1 = row + 1; i$1 <= fold.end.row; i$1++) {
					if (!gutter.$annotations[i$1]) continue;
					for (var j = 0; j < gutter.$annotations[i$1].text.length; j++) {
						var annotationType = gutter.$annotations[i$1].type[j];
						annotationsInFold[annotationType].push(gutter.$annotations[i$1].text[j]);
						if (!mostSevereAnnotationTypeInFold || severityRank[annotationType] < severityRank[mostSevereAnnotationTypeInFold]) mostSevereAnnotationTypeInFold = annotationType;
					}
				}
				if ([
					"error",
					"security",
					"warning"
				].includes(mostSevereAnnotationTypeInFold)) {
					var summaryFoldedAnnotations = `${GutterTooltip.annotationsToSummaryString(annotationsInFold)} in folded code.`;
					annotation.displayText.push(summaryFoldedAnnotations);
					annotation.type.push(mostSevereAnnotationTypeInFold + "_fold");
				}
			}
			if (annotation.displayText.length === 0) return this.hide();
			var annotationMessages = {
				error: [],
				security: [],
				warning: [],
				info: [],
				hint: []
			};
			var iconClassName = gutter.$useSvgGutterIcons ? "ace_icon_svg" : "ace_icon";
			for (var i$1 = 0; i$1 < annotation.displayText.length; i$1++) {
				var lineElement = dom$4.createElement("span");
				var iconElement = dom$4.createElement("span");
				iconElement.classList.add(...[`ace_${annotation.type[i$1]}`, iconClassName]);
				iconElement.setAttribute("aria-label", `${GutterTooltip.annotationLabels[annotation.type[i$1].replace("_fold", "")].singular}`);
				iconElement.setAttribute("role", "img");
				iconElement.appendChild(dom$4.createTextNode(" "));
				lineElement.appendChild(iconElement);
				lineElement.appendChild(dom$4.createTextNode(annotation.displayText[i$1]));
				lineElement.appendChild(dom$4.createElement("br"));
				annotationMessages[annotation.type[i$1].replace("_fold", "")].push(lineElement);
			}
			var tooltipElement = dom$4.createElement("span");
			annotationMessages.error.forEach((el) => tooltipElement.appendChild(el));
			annotationMessages.security.forEach((el) => tooltipElement.appendChild(el));
			annotationMessages.warning.forEach((el) => tooltipElement.appendChild(el));
			annotationMessages.info.forEach((el) => tooltipElement.appendChild(el));
			annotationMessages.hint.forEach((el) => tooltipElement.appendChild(el));
			tooltipElement.setAttribute("aria-live", "polite");
			var annotationNode = this.$findLinkedAnnotationNode(row);
			if (annotationNode) annotationNode.setAttribute("aria-describedby", this.id);
			var range = Range$3.fromPoints({
				row,
				column: 0
			}, {
				row,
				column: 0
			});
			this.showForRange(this.editor, range, tooltipElement);
			this.visibleTooltipRow = row;
			this.editor._signal("showGutterTooltip", this);
		}
		$setPosition(editor, _ignoredPosition, _withMarker, range) {
			var gutterCell = this.$findCellByRow(range.start.row);
			if (!gutterCell) return;
			var el = gutterCell && gutterCell.element;
			var anchorEl = el && el.querySelector(".ace_gutter_annotation");
			if (!anchorEl) return;
			var r = anchorEl.getBoundingClientRect();
			if (!r) return;
			var position = {
				pageX: r.right,
				pageY: r.top
			};
			return super.$setPosition(editor, position, false, range);
		}
		$shouldPlaceAbove(labelHeight, anchorTop, spaceBelow) {
			return spaceBelow < labelHeight;
		}
		$findLinkedAnnotationNode(row) {
			var cell = this.$findCellByRow(row);
			if (cell) {
				var element = cell.element;
				if (element.childNodes.length > 2) return element.childNodes[2];
			}
		}
		$findCellByRow(row) {
			return this.editor.renderer.$gutterLayer.$lines.cells.find((el) => el.row === row);
		}
		hide(e) {
			if (!this.isOpen) return;
			this.$element.removeAttribute("aria-live");
			if (this.visibleTooltipRow != void 0) {
				var annotationNode = this.$findLinkedAnnotationNode(this.visibleTooltipRow);
				if (annotationNode) annotationNode.removeAttribute("aria-describedby");
			}
			this.visibleTooltipRow = void 0;
			this.editor._signal("hideGutterTooltip", this);
			super.hide(e);
		}
		static annotationsToSummaryString(annotations) {
			var summary = [];
			for (var annotationType of [
				"error",
				"security",
				"warning",
				"info",
				"hint"
			]) {
				if (!annotations[annotationType].length) continue;
				var label = annotations[annotationType].length === 1 ? GutterTooltip.annotationLabels[annotationType].singular : GutterTooltip.annotationLabels[annotationType].plural;
				summary.push(`${annotations[annotationType].length} ${label}`);
			}
			return summary.join(", ");
		}
		isOutsideOfText(e) {
			var rect = e.editor.renderer.$gutter.getBoundingClientRect();
			return !(e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom);
		}
	};
	GutterTooltip.$uid = 0;
	exports.GutterTooltip = GutterTooltip;
}));
var require_dragdrop_handler = /* @__PURE__ */ __commonJSMin(((exports) => {
	var dom$3 = require_dom();
	var event$4 = require_event();
	var useragent$2 = require_useragent();
	var AUTOSCROLL_DELAY = 200;
	var SCROLL_CURSOR_DELAY = 200;
	var SCROLL_CURSOR_HYSTERESIS = 5;
	function DragdropHandler$1(mouseHandler) {
		var editor = mouseHandler.editor;
		var dragImage = dom$3.createElement("div");
		dragImage.style.cssText = "top:-100px;position:absolute;z-index:2147483647;opacity:0.5";
		dragImage.textContent = "\xA0";
		[
			"dragWait",
			"dragWaitEnd",
			"startDrag",
			"dragReadyEnd",
			"onMouseDrag"
		].forEach(function(x$1) {
			mouseHandler[x$1] = this[x$1];
		}, this);
		editor.on("mousedown", this.onMouseDown.bind(mouseHandler));
		var mouseTarget = editor.container;
		var dragSelectionMarker, x, y;
		var timerId, range;
		var dragCursor, counter = 0;
		var dragOperation;
		var isInternal;
		var autoScrollStartTime;
		var cursorMovedTime;
		var cursorPointOnCaretMoved;
		this.onDragStart = function(e) {
			if (this.cancelDrag || !mouseTarget.draggable) {
				var self = this;
				setTimeout(function() {
					self.startSelect();
					self.captureMouse(e);
				}, 0);
				return e.preventDefault();
			}
			range = editor.getSelectionRange();
			var dataTransfer = e.dataTransfer;
			dataTransfer.effectAllowed = editor.getReadOnly() ? "copy" : "copyMove";
			editor.container.appendChild(dragImage);
			dataTransfer.setDragImage && dataTransfer.setDragImage(dragImage, 0, 0);
			setTimeout(function() {
				editor.container.removeChild(dragImage);
			});
			dataTransfer.clearData();
			dataTransfer.setData("Text", editor.session.getTextRange());
			isInternal = true;
			this.setState("drag");
		};
		this.onDragEnd = function(e) {
			mouseTarget.draggable = false;
			isInternal = false;
			this.setState(null);
			if (!editor.getReadOnly()) {
				var dropEffect = e.dataTransfer.dropEffect;
				if (!dragOperation && dropEffect == "move") editor.session.remove(editor.getSelectionRange());
				editor.$resetCursorStyle();
			}
			this.editor.unsetStyle("ace_dragging");
			this.editor.renderer.setCursorStyle("");
		};
		this.onDragEnter = function(e) {
			if (editor.getReadOnly() || !canAccept(e.dataTransfer)) return;
			x = e.clientX;
			y = e.clientY;
			if (!dragSelectionMarker) addDragMarker();
			counter++;
			e.dataTransfer.dropEffect = dragOperation = getDropEffect(e);
			return event$4.preventDefault(e);
		};
		this.onDragOver = function(e) {
			if (editor.getReadOnly() || !canAccept(e.dataTransfer)) return;
			x = e.clientX;
			y = e.clientY;
			if (!dragSelectionMarker) {
				addDragMarker();
				counter++;
			}
			if (onMouseMoveTimer !== null) onMouseMoveTimer = null;
			e.dataTransfer.dropEffect = dragOperation = getDropEffect(e);
			return event$4.preventDefault(e);
		};
		this.onDragLeave = function(e) {
			counter--;
			if (counter <= 0 && dragSelectionMarker) {
				clearDragMarker();
				dragOperation = null;
				return event$4.preventDefault(e);
			}
		};
		this.onDrop = function(e) {
			if (!dragCursor) return;
			var dataTransfer = e.dataTransfer;
			if (isInternal) switch (dragOperation) {
				case "move":
					if (range.contains(dragCursor.row, dragCursor.column)) range = {
						start: dragCursor,
						end: dragCursor
					};
					else range = editor.moveText(range, dragCursor);
					break;
				case "copy":
					range = editor.moveText(range, dragCursor, true);
					break;
			}
			else {
				var dropData = dataTransfer.getData("Text");
				range = {
					start: dragCursor,
					end: editor.session.insert(dragCursor, dropData)
				};
				editor.focus();
				dragOperation = null;
			}
			clearDragMarker();
			return event$4.preventDefault(e);
		};
		event$4.addListener(mouseTarget, "dragstart", this.onDragStart.bind(mouseHandler), editor);
		event$4.addListener(mouseTarget, "dragend", this.onDragEnd.bind(mouseHandler), editor);
		event$4.addListener(mouseTarget, "dragenter", this.onDragEnter.bind(mouseHandler), editor);
		event$4.addListener(mouseTarget, "dragover", this.onDragOver.bind(mouseHandler), editor);
		event$4.addListener(mouseTarget, "dragleave", this.onDragLeave.bind(mouseHandler), editor);
		event$4.addListener(mouseTarget, "drop", this.onDrop.bind(mouseHandler), editor);
		function scrollCursorIntoView(cursor, prevCursor) {
			var now = Date.now();
			var vMovement = !prevCursor || cursor.row != prevCursor.row;
			var hMovement = !prevCursor || cursor.column != prevCursor.column;
			if (!cursorMovedTime || vMovement || hMovement) {
				editor.moveCursorToPosition(cursor);
				cursorMovedTime = now;
				cursorPointOnCaretMoved = {
					x,
					y
				};
			} else if (calcDistance(cursorPointOnCaretMoved.x, cursorPointOnCaretMoved.y, x, y) > SCROLL_CURSOR_HYSTERESIS) cursorMovedTime = null;
			else if (now - cursorMovedTime >= SCROLL_CURSOR_DELAY) {
				editor.renderer.scrollCursorIntoView();
				cursorMovedTime = null;
			}
		}
		function autoScroll(cursor, prevCursor) {
			var now = Date.now();
			var lineHeight = editor.renderer.layerConfig.lineHeight;
			var characterWidth = editor.renderer.layerConfig.characterWidth;
			var editorRect = editor.renderer.scroller.getBoundingClientRect();
			var offsets = {
				x: {
					left: x - editorRect.left,
					right: editorRect.right - x
				},
				y: {
					top: y - editorRect.top,
					bottom: editorRect.bottom - y
				}
			};
			var nearestXOffset = Math.min(offsets.x.left, offsets.x.right);
			var nearestYOffset = Math.min(offsets.y.top, offsets.y.bottom);
			var scrollCursor = {
				row: cursor.row,
				column: cursor.column
			};
			if (nearestXOffset / characterWidth <= 2) scrollCursor.column += offsets.x.left < offsets.x.right ? -3 : 2;
			if (nearestYOffset / lineHeight <= 1) scrollCursor.row += offsets.y.top < offsets.y.bottom ? -1 : 1;
			var vScroll = cursor.row != scrollCursor.row;
			var hScroll = cursor.column != scrollCursor.column;
			var vMovement = !prevCursor || cursor.row != prevCursor.row;
			if (vScroll || hScroll && !vMovement) {
				if (!autoScrollStartTime) autoScrollStartTime = now;
				else if (now - autoScrollStartTime >= AUTOSCROLL_DELAY) editor.renderer.scrollCursorIntoView(scrollCursor);
			} else autoScrollStartTime = null;
		}
		function onDragInterval() {
			var prevCursor = dragCursor;
			dragCursor = editor.renderer.screenToTextCoordinates(x, y);
			scrollCursorIntoView(dragCursor, prevCursor);
			autoScroll(dragCursor, prevCursor);
		}
		function addDragMarker() {
			range = editor.selection.toOrientedRange();
			dragSelectionMarker = editor.session.addMarker(range, "ace_selection", editor.getSelectionStyle());
			editor.clearSelection();
			if (editor.isFocused()) editor.renderer.$cursorLayer.setBlinking(false);
			clearInterval(timerId);
			onDragInterval();
			timerId = setInterval(onDragInterval, 20);
			counter = 0;
			event$4.addListener(document, "mousemove", onMouseMove);
		}
		function clearDragMarker() {
			clearInterval(timerId);
			editor.session.removeMarker(dragSelectionMarker);
			dragSelectionMarker = null;
			editor.selection.fromOrientedRange(range);
			if (editor.isFocused() && !isInternal) editor.$resetCursorStyle();
			range = null;
			dragCursor = null;
			counter = 0;
			autoScrollStartTime = null;
			cursorMovedTime = null;
			event$4.removeListener(document, "mousemove", onMouseMove);
		}
		var onMouseMoveTimer = null;
		function onMouseMove() {
			if (onMouseMoveTimer == null) onMouseMoveTimer = setTimeout(function() {
				if (onMouseMoveTimer != null && dragSelectionMarker) clearDragMarker();
			}, 20);
		}
		function canAccept(dataTransfer) {
			var types = dataTransfer.types;
			return !types || Array.prototype.some.call(types, function(type) {
				return type == "text/plain" || type == "Text";
			});
		}
		function getDropEffect(e) {
			var copyAllowed = [
				"copy",
				"copymove",
				"all",
				"uninitialized"
			];
			var moveAllowed = [
				"move",
				"copymove",
				"linkmove",
				"all",
				"uninitialized"
			];
			var copyModifierState = useragent$2.isMac ? e.altKey : e.ctrlKey;
			var effectAllowed = "uninitialized";
			try {
				effectAllowed = e.dataTransfer.effectAllowed.toLowerCase();
			} catch (e$1) {}
			var dropEffect = "none";
			if (copyModifierState && copyAllowed.indexOf(effectAllowed) >= 0) dropEffect = "copy";
			else if (moveAllowed.indexOf(effectAllowed) >= 0) dropEffect = "move";
			else if (copyAllowed.indexOf(effectAllowed) >= 0) dropEffect = "copy";
			return dropEffect;
		}
	}
	(function() {
		this.dragWait = function() {
			if (Date.now() - this.mousedownEvent.time > this.editor.getDragDelay()) this.startDrag();
		};
		this.dragWaitEnd = function() {
			var target = this.editor.container;
			target.draggable = false;
			this.startSelect(this.mousedownEvent.getDocumentPosition());
			this.selectEnd();
		};
		this.dragReadyEnd = function(e) {
			this.editor.$resetCursorStyle();
			this.editor.unsetStyle("ace_dragging");
			this.editor.renderer.setCursorStyle("");
			this.dragWaitEnd();
		};
		this.startDrag = function() {
			this.cancelDrag = false;
			var editor = this.editor;
			var target = editor.container;
			target.draggable = true;
			editor.renderer.$cursorLayer.setBlinking(false);
			editor.setStyle("ace_dragging");
			var cursorStyle = useragent$2.isWin ? "default" : "move";
			editor.renderer.setCursorStyle(cursorStyle);
			this.setState("dragReady");
		};
		this.onMouseDrag = function(e) {
			var target = this.editor.container;
			if (useragent$2.isIE && this.state == "dragReady") {
				var distance = calcDistance(this.mousedownEvent.x, this.mousedownEvent.y, this.x, this.y);
				if (distance > 3) target.dragDrop();
			}
			if (this.state === "dragWait") {
				var distance = calcDistance(this.mousedownEvent.x, this.mousedownEvent.y, this.x, this.y);
				if (distance > 0) {
					target.draggable = false;
					this.startSelect(this.mousedownEvent.getDocumentPosition());
				}
			}
		};
		this.onMouseDown = function(e) {
			if (!this.$dragEnabled) return;
			this.mousedownEvent = e;
			var editor = this.editor;
			var inSelection = e.inSelection();
			var button = e.getButton();
			if ((e.domEvent.detail || 1) === 1 && button === 0 && inSelection) {
				if (e.editor.inMultiSelectMode && (e.getAccelKey() || e.getShiftKey())) return;
				this.mousedownEvent.time = Date.now();
				var eventTarget = e.domEvent.target || e.domEvent.srcElement;
				if ("unselectable" in eventTarget) eventTarget.unselectable = "on";
				if (editor.getDragDelay()) {
					if (useragent$2.isWebKit) {
						this.cancelDrag = true;
						var mouseTarget = editor.container;
						mouseTarget.draggable = true;
					}
					this.setState("dragWait");
				} else this.startDrag();
				this.captureMouse(e, this.onMouseDrag.bind(this));
				e.defaultPrevented = true;
			}
		};
	}).call(DragdropHandler$1.prototype);
	function calcDistance(ax, ay, bx, by) {
		return Math.sqrt(Math.pow(bx - ax, 2) + Math.pow(by - ay, 2));
	}
	exports.DragdropHandler = DragdropHandler$1;
}));
var require_touch_handler = /* @__PURE__ */ __commonJSMin(((exports) => {
	var MouseEvent$1 = require_mouse_event().MouseEvent;
	var event$3 = require_event();
	var dom$2 = require_dom();
	exports.addTouchListeners = function(el, editor) {
		var mode = "scroll";
		var startX;
		var startY;
		var touchStartT;
		var lastT;
		var longTouchTimer;
		var animationTimer;
		var animationSteps = 0;
		var pos;
		var clickCount = 0;
		var vX = 0;
		var vY = 0;
		var pressed;
		var contextMenu;
		function createContextMenu() {
			var clipboard$2 = window.navigator && window.navigator.clipboard;
			var isOpen = false;
			var updateMenu = function() {
				var selected = editor.getCopyText();
				var hasUndo = editor.session.getUndoManager().hasUndo();
				contextMenu.replaceChild(dom$2.buildDom(isOpen ? [
					"span",
					!selected && canExecuteCommand("selectall") && [
						"span",
						{
							class: "ace_mobile-button",
							action: "selectall"
						},
						"Select All"
					],
					selected && canExecuteCommand("copy") && [
						"span",
						{
							class: "ace_mobile-button",
							action: "copy"
						},
						"Copy"
					],
					selected && canExecuteCommand("cut") && [
						"span",
						{
							class: "ace_mobile-button",
							action: "cut"
						},
						"Cut"
					],
					clipboard$2 && canExecuteCommand("paste") && [
						"span",
						{
							class: "ace_mobile-button",
							action: "paste"
						},
						"Paste"
					],
					hasUndo && canExecuteCommand("undo") && [
						"span",
						{
							class: "ace_mobile-button",
							action: "undo"
						},
						"Undo"
					],
					canExecuteCommand("find") && [
						"span",
						{
							class: "ace_mobile-button",
							action: "find"
						},
						"Find"
					],
					canExecuteCommand("openCommandPalette") && [
						"span",
						{
							class: "ace_mobile-button",
							action: "openCommandPalette"
						},
						"Palette"
					]
				] : ["span"]), contextMenu.firstChild);
			};
			var canExecuteCommand = function(cmd) {
				return editor.commands.canExecute(cmd, editor);
			};
			var handleClick = function(e) {
				var action = e.target.getAttribute("action");
				if (action == "more" || !isOpen) {
					isOpen = !isOpen;
					return updateMenu();
				}
				if (action == "paste") clipboard$2.readText().then(function(text) {
					editor.execCommand(action, text);
				});
				else if (action) {
					if (action == "cut" || action == "copy") if (clipboard$2) clipboard$2.writeText(editor.getCopyText());
					else document.execCommand("copy");
					editor.execCommand(action);
				}
				contextMenu.firstChild.style.display = "none";
				isOpen = false;
				if (action != "openCommandPalette") editor.focus();
			};
			contextMenu = dom$2.buildDom([
				"div",
				{
					class: "ace_mobile-menu",
					ontouchstart: function(e) {
						mode = "menu";
						e.stopPropagation();
						e.preventDefault();
						editor.textInput.focus();
					},
					ontouchend: function(e) {
						e.stopPropagation();
						e.preventDefault();
						handleClick(e);
					},
					onclick: handleClick
				},
				["span"],
				[
					"span",
					{
						class: "ace_mobile-button",
						action: "more"
					},
					"..."
				]
			], editor.container);
		}
		function showContextMenu() {
			if (!editor.getOption("enableMobileMenu")) {
				if (contextMenu) hideContextMenu();
				return;
			}
			if (!contextMenu) createContextMenu();
			var cursor = editor.selection.cursor;
			var pagePos = editor.renderer.textToScreenCoordinates(cursor.row, cursor.column);
			var leftOffset = editor.renderer.textToScreenCoordinates(0, 0).pageX;
			var scrollLeft = editor.renderer.scrollLeft;
			var rect = editor.container.getBoundingClientRect();
			contextMenu.style.top = pagePos.pageY - rect.top - 3 + "px";
			if (pagePos.pageX - rect.left < rect.width - 70) {
				contextMenu.style.left = "";
				contextMenu.style.right = "10px";
			} else {
				contextMenu.style.right = "";
				contextMenu.style.left = leftOffset + scrollLeft - rect.left + "px";
			}
			contextMenu.style.display = "";
			contextMenu.firstChild.style.display = "none";
			editor.on("input", hideContextMenu);
		}
		function hideContextMenu(e) {
			if (contextMenu) contextMenu.style.display = "none";
			editor.off("input", hideContextMenu);
		}
		function handleLongTap() {
			longTouchTimer = null;
			clearTimeout(longTouchTimer);
			var range = editor.selection.getRange();
			var inSelection = range.contains(pos.row, pos.column);
			if (range.isEmpty() || !inSelection) {
				editor.selection.moveToPosition(pos);
				editor.selection.selectWord();
			}
			mode = "wait";
			showContextMenu();
		}
		function switchToSelectionMode() {
			longTouchTimer = null;
			clearTimeout(longTouchTimer);
			editor.selection.moveToPosition(pos);
			var range = clickCount >= 2 ? editor.selection.getLineRange(pos.row) : editor.session.getBracketRange(pos);
			if (range && !range.isEmpty()) editor.selection.setRange(range);
			else editor.selection.selectWord();
			mode = "wait";
		}
		event$3.addListener(el, "contextmenu", function(e) {
			if (!pressed) return;
			editor.textInput.getElement().focus();
		}, editor);
		event$3.addListener(el, "touchstart", function(e) {
			var touches = e.touches;
			if (longTouchTimer || touches.length > 1) {
				clearTimeout(longTouchTimer);
				longTouchTimer = null;
				touchStartT = -1;
				mode = "zoom";
				return;
			}
			pressed = editor.$mouseHandler.isMousePressed = true;
			var h = editor.renderer.layerConfig.lineHeight;
			var w = editor.renderer.layerConfig.lineHeight;
			var t = e.timeStamp;
			lastT = t;
			var touchObj = touches[0];
			var x = touchObj.clientX;
			var y = touchObj.clientY;
			if (Math.abs(startX - x) + Math.abs(startY - y) > h) touchStartT = -1;
			startX = e.clientX = x;
			startY = e.clientY = y;
			vX = vY = 0;
			pos = new MouseEvent$1(e, editor).getDocumentPosition();
			if (t - touchStartT < 500 && touches.length == 1 && !animationSteps) {
				clickCount++;
				e.preventDefault();
				e.button = 0;
				switchToSelectionMode();
			} else {
				clickCount = 0;
				var cursor = editor.selection.cursor;
				var anchor = editor.selection.isEmpty() ? cursor : editor.selection.anchor;
				var cursorPos = editor.renderer.$cursorLayer.getPixelPosition(cursor, true);
				var anchorPos = editor.renderer.$cursorLayer.getPixelPosition(anchor, true);
				var rect = editor.renderer.scroller.getBoundingClientRect();
				var offsetTop = editor.renderer.layerConfig.offset;
				var offsetLeft = editor.renderer.scrollLeft;
				var weightedDistance = function(x$1, y$1) {
					x$1 = x$1 / w;
					y$1 = y$1 / h - .75;
					return x$1 * x$1 + y$1 * y$1;
				};
				if (e.clientX < rect.left) {
					mode = "zoom";
					return;
				}
				var diff1 = weightedDistance(e.clientX - rect.left - cursorPos.left + offsetLeft, e.clientY - rect.top - cursorPos.top + offsetTop);
				var diff2 = weightedDistance(e.clientX - rect.left - anchorPos.left + offsetLeft, e.clientY - rect.top - anchorPos.top + offsetTop);
				if (diff1 < 3.5 && diff2 < 3.5) mode = diff1 > diff2 ? "cursor" : "anchor";
				if (diff2 < 3.5) mode = "anchor";
				else if (diff1 < 3.5) mode = "cursor";
				else mode = "scroll";
				longTouchTimer = setTimeout(handleLongTap, 450);
			}
			touchStartT = t;
		}, editor);
		event$3.addListener(el, "touchend", function(e) {
			pressed = editor.$mouseHandler.isMousePressed = false;
			if (animationTimer) clearInterval(animationTimer);
			if (mode == "zoom") {
				mode = "";
				animationSteps = 0;
			} else if (longTouchTimer) {
				editor.selection.moveToPosition(pos);
				animationSteps = 0;
				showContextMenu();
			} else if (mode == "scroll") {
				animate();
				hideContextMenu();
			} else showContextMenu();
			clearTimeout(longTouchTimer);
			longTouchTimer = null;
		}, editor);
		event$3.addListener(el, "touchmove", function(e) {
			if (longTouchTimer) {
				clearTimeout(longTouchTimer);
				longTouchTimer = null;
			}
			var touches = e.touches;
			if (touches.length > 1 || mode == "zoom") return;
			var touchObj = touches[0];
			var wheelX = startX - touchObj.clientX;
			var wheelY = startY - touchObj.clientY;
			if (mode == "wait") if (wheelX * wheelX + wheelY * wheelY > 4) mode = "cursor";
			else return e.preventDefault();
			startX = touchObj.clientX;
			startY = touchObj.clientY;
			e.clientX = touchObj.clientX;
			e.clientY = touchObj.clientY;
			var t = e.timeStamp;
			var dt = t - lastT;
			lastT = t;
			if (mode == "scroll") {
				var mouseEvent = new MouseEvent$1(e, editor);
				mouseEvent.speed = 1;
				mouseEvent.wheelX = wheelX;
				mouseEvent.wheelY = wheelY;
				if (10 * Math.abs(wheelX) < Math.abs(wheelY)) wheelX = 0;
				if (10 * Math.abs(wheelY) < Math.abs(wheelX)) wheelY = 0;
				if (dt != 0) {
					vX = wheelX / dt;
					vY = wheelY / dt;
				}
				editor._emit("mousewheel", mouseEvent);
				if (!mouseEvent.propagationStopped) vX = vY = 0;
			} else {
				var pos$1 = new MouseEvent$1(e, editor).getDocumentPosition();
				if (mode == "cursor") editor.selection.moveCursorToPosition(pos$1);
				else if (mode == "anchor") editor.selection.setSelectionAnchor(pos$1.row, pos$1.column);
				editor.renderer.scrollCursorIntoView(pos$1);
				e.preventDefault();
			}
		}, editor);
		function animate() {
			animationSteps += 60;
			animationTimer = setInterval(function() {
				if (animationSteps-- <= 0) {
					clearInterval(animationTimer);
					animationTimer = null;
				}
				if (Math.abs(vX) < .01) vX = 0;
				if (Math.abs(vY) < .01) vY = 0;
				if (animationSteps < 20) vX = .9 * vX;
				if (animationSteps < 20) vY = .9 * vY;
				var oldScrollTop = editor.session.getScrollTop();
				editor.renderer.scrollBy(10 * vX, 10 * vY);
				if (oldScrollTop == editor.session.getScrollTop()) animationSteps = 0;
			}, 10);
		}
	};
}));
var require_mouse_handler = /* @__PURE__ */ __commonJSMin(((exports) => {
	var event$2 = require_event();
	var useragent$1 = require_useragent();
	var DefaultHandlers = require_default_handlers().DefaultHandlers;
	var DefaultGutterHandler = require_default_gutter_handler().GutterHandler;
	var MouseEvent = require_mouse_event().MouseEvent;
	var DragdropHandler = require_dragdrop_handler().DragdropHandler;
	var addTouchListeners = require_touch_handler().addTouchListeners;
	var config$2 = require_config();
	var MouseHandler$1 = class {
		constructor(editor) {
			this.$dragDelay;
			this.$dragEnabled;
			this.$mouseMoved;
			this.mouseEvent;
			this.$focusTimeout;
			var _self = this;
			this.editor = editor;
			new DefaultHandlers(this);
			new DefaultGutterHandler(this);
			new DragdropHandler(this);
			var focusEditor = function(e) {
				if (!document.hasFocus || !document.hasFocus() || !editor.isFocused() && document.activeElement == (editor.textInput && editor.textInput.getElement())) window.focus();
				editor.focus();
				setTimeout(function() {
					if (!editor.isFocused()) editor.focus();
				});
			};
			var mouseTarget = editor.renderer.getMouseEventTarget();
			event$2.addListener(mouseTarget, "click", this.onMouseEvent.bind(this, "click"), editor);
			event$2.addListener(mouseTarget, "mousemove", this.onMouseMove.bind(this, "mousemove"), editor);
			event$2.addMultiMouseDownListener([
				mouseTarget,
				editor.renderer.scrollBarV && editor.renderer.scrollBarV.inner,
				editor.renderer.scrollBarH && editor.renderer.scrollBarH.inner,
				editor.textInput && editor.textInput.getElement()
			].filter(Boolean), [
				400,
				300,
				250
			], this, "onMouseEvent", editor);
			event$2.addMouseWheelListener(editor.container, this.onMouseWheel.bind(this, "mousewheel"), editor);
			addTouchListeners(editor.container, editor);
			var gutterEl = editor.renderer.$gutter;
			event$2.addListener(gutterEl, "mousedown", this.onMouseEvent.bind(this, "guttermousedown"), editor);
			event$2.addListener(gutterEl, "click", this.onMouseEvent.bind(this, "gutterclick"), editor);
			event$2.addListener(gutterEl, "dblclick", this.onMouseEvent.bind(this, "gutterdblclick"), editor);
			event$2.addListener(gutterEl, "mousemove", this.onMouseEvent.bind(this, "guttermousemove"), editor);
			event$2.addListener(mouseTarget, "mousedown", focusEditor, editor);
			event$2.addListener(gutterEl, "mousedown", focusEditor, editor);
			if (useragent$1.isIE && editor.renderer.scrollBarV) {
				event$2.addListener(editor.renderer.scrollBarV.element, "mousedown", focusEditor, editor);
				event$2.addListener(editor.renderer.scrollBarH.element, "mousedown", focusEditor, editor);
			}
			editor.on("mousemove", function(e) {
				if (_self.state || _self.$dragDelay || !_self.$dragEnabled) return;
				var character = editor.renderer.screenToTextCoordinates(e.x, e.y);
				var range = editor.session.selection.getRange();
				var renderer = editor.renderer;
				if (!range.isEmpty() && range.insideStart(character.row, character.column)) renderer.setCursorStyle("default");
				else renderer.setCursorStyle("");
			}, editor);
		}
		onMouseEvent(name, e) {
			if (!this.editor.session) return;
			this.editor._emit(name, new MouseEvent(e, this.editor));
		}
		onMouseMove(name, e) {
			var listeners = this.editor._eventRegistry && this.editor._eventRegistry.mousemove;
			if (!listeners || !listeners.length) return;
			this.editor._emit(name, new MouseEvent(e, this.editor));
		}
		onMouseWheel(name, e) {
			var mouseEvent = new MouseEvent(e, this.editor);
			mouseEvent.speed = this.$scrollSpeed * 2;
			mouseEvent.wheelX = e.wheelX;
			mouseEvent.wheelY = e.wheelY;
			this.editor._emit(name, mouseEvent);
		}
		setState(state) {
			this.state = state;
		}
		captureMouse(ev, mouseMoveHandler) {
			this.x = ev.x;
			this.y = ev.y;
			this.isMousePressed = true;
			var editor = this.editor;
			var renderer = this.editor.renderer;
			renderer.$isMousePressed = true;
			var self = this;
			var continueCapture = true;
			var onMouseMove = function(e) {
				if (!e) return;
				if (useragent$1.isWebKit && !e.which && self.releaseMouse) return self.releaseMouse();
				self.x = e.clientX;
				self.y = e.clientY;
				mouseMoveHandler && mouseMoveHandler(e);
				self.mouseEvent = new MouseEvent(e, self.editor);
				self.$mouseMoved = true;
			};
			var onCaptureEnd = function(e) {
				editor.off("beforeEndOperation", onOperationEnd);
				continueCapture = false;
				if (editor.session) onCaptureUpdate();
				self[self.state + "End"] && self[self.state + "End"](e);
				self.state = "";
				self.isMousePressed = renderer.$isMousePressed = false;
				if (renderer.$keepTextAreaAtCursor) renderer.$moveTextAreaToCursor();
				self.$onCaptureMouseMove = self.releaseMouse = null;
				e && self.onMouseEvent("mouseup", e);
				editor.endOperation();
			};
			var onCaptureUpdate = function() {
				self[self.state] && self[self.state]();
				self.$mouseMoved = false;
			};
			var onCaptureInterval = function() {
				if (continueCapture) {
					onCaptureUpdate();
					event$2.nextFrame(onCaptureInterval);
				}
			};
			if (useragent$1.isOldIE && ev.domEvent.type == "dblclick") return setTimeout(function() {
				onCaptureEnd(ev);
			});
			var onOperationEnd = function(e) {
				if (!self.releaseMouse) return;
				if (editor.curOp.command.name && editor.curOp.selectionChanged) {
					self[self.state + "End"] && self[self.state + "End"]();
					self.state = "";
					self.releaseMouse();
				}
			};
			editor.on("beforeEndOperation", onOperationEnd);
			editor.startOperation({ command: { name: "mouse" } });
			self.$onCaptureMouseMove = onMouseMove;
			self.releaseMouse = event$2.capture(this.editor.container, onMouseMove, onCaptureEnd);
			onCaptureInterval();
		}
		cancelContextMenu() {
			var stop = function(e) {
				if (e && e.domEvent && e.domEvent.type != "contextmenu") return;
				this.editor.off("nativecontextmenu", stop);
				if (e && e.domEvent) event$2.stopEvent(e.domEvent);
			}.bind(this);
			setTimeout(stop, 10);
			this.editor.on("nativecontextmenu", stop);
		}
		destroy() {
			if (this.releaseMouse) this.releaseMouse();
			if (this.$tooltip) this.$tooltip.destroy();
		}
	};
	MouseHandler$1.prototype.releaseMouse = null;
	config$2.defineOptions(MouseHandler$1.prototype, "mouseHandler", {
		scrollSpeed: { initialValue: 2 },
		dragDelay: { initialValue: useragent$1.isMac ? 150 : 0 },
		dragEnabled: { initialValue: true },
		focusTimeout: { initialValue: 0 }
	});
	exports.MouseHandler = MouseHandler$1;
}));
var require_fold_handler = /* @__PURE__ */ __commonJSMin(((exports) => {
	var dom$1 = require_dom();
	var FoldHandler$1 = class {
		constructor(editor) {
			editor.on("click", function(e) {
				var position = e.getDocumentPosition();
				var session = editor.session;
				var fold = session.getFoldAt(position.row, position.column, 1);
				if (fold) {
					if (e.getAccelKey()) session.removeFold(fold);
					else session.expandFold(fold);
					e.stop();
				}
				var target = e.domEvent && e.domEvent.target;
				if (target && dom$1.hasCssClass(target, "ace_inline_button")) {
					if (dom$1.hasCssClass(target, "ace_toggle_wrap")) {
						session.setOption("wrap", !session.getUseWrapMode());
						editor.renderer.scrollCursorIntoView();
					}
				}
			});
			editor.on("gutterclick", function(e) {
				if (editor.renderer.$gutterLayer.getRegion(e) == "foldWidgets") {
					var row = e.getDocumentPosition().row;
					var session = editor.session;
					if (session.foldWidgets && session.foldWidgets[row]) editor.session.onFoldWidgetClick(row, e);
					if (!editor.isFocused()) editor.focus();
					e.stop();
				}
			});
			editor.on("gutterdblclick", function(e) {
				if (editor.renderer.$gutterLayer.getRegion(e) == "foldWidgets") {
					var row = e.getDocumentPosition().row;
					var session = editor.session;
					var data = session.getParentFoldRangeData(row, true);
					var range = data.range || data.firstRange;
					if (range) {
						row = range.start.row;
						var fold = session.getFoldAt(row, session.getLine(row).length, 1);
						if (fold) session.removeFold(fold);
						else {
							session.addFold("...", range);
							editor.renderer.scrollCursorIntoView({
								row: range.start.row,
								column: 0
							});
						}
					}
					e.stop();
				}
			});
		}
	};
	exports.FoldHandler = FoldHandler$1;
}));
var require_keybinding = /* @__PURE__ */ __commonJSMin(((exports) => {
	var keyUtil = require_keys();
	var event$1 = require_event();
	var KeyBinding$1 = class {
		constructor(editor) {
			this.$editor = editor;
			this.$data = { editor };
			this.$handlers = [];
			this.setDefaultHandler(editor.commands);
		}
		setDefaultHandler(kb) {
			this.removeKeyboardHandler(this.$defaultHandler);
			this.$defaultHandler = kb;
			this.addKeyboardHandler(kb, 0);
		}
		setKeyboardHandler(kb) {
			var h = this.$handlers;
			if (h[h.length - 1] == kb) return;
			while (h[h.length - 1] && h[h.length - 1] != this.$defaultHandler) this.removeKeyboardHandler(h[h.length - 1]);
			this.addKeyboardHandler(kb, 1);
		}
		addKeyboardHandler(kb, pos) {
			if (!kb) return;
			if (typeof kb == "function" && !kb.handleKeyboard) kb.handleKeyboard = kb;
			var i$1 = this.$handlers.indexOf(kb);
			if (i$1 != -1) this.$handlers.splice(i$1, 1);
			if (pos == void 0) this.$handlers.push(kb);
			else this.$handlers.splice(pos, 0, kb);
			if (i$1 == -1 && kb.attach) kb.attach(this.$editor);
		}
		removeKeyboardHandler(kb) {
			var i$1 = this.$handlers.indexOf(kb);
			if (i$1 == -1) return false;
			this.$handlers.splice(i$1, 1);
			kb.detach && kb.detach(this.$editor);
			return true;
		}
		getKeyboardHandler() {
			return this.$handlers[this.$handlers.length - 1];
		}
		getStatusText() {
			var data = this.$data;
			var editor = data.editor;
			return this.$handlers.map(function(h) {
				return h.getStatusText && h.getStatusText(editor, data) || "";
			}).filter(Boolean).join(" ");
		}
		$callKeyboardHandlers(hashId, keyString, keyCode, e) {
			var toExecute;
			var success = false;
			var commands = this.$editor.commands;
			for (var i$1 = this.$handlers.length; i$1--;) {
				toExecute = this.$handlers[i$1].handleKeyboard(this.$data, hashId, keyString, keyCode, e);
				if (!toExecute || !toExecute.command) continue;
				if (toExecute.command == "null") success = true;
				else success = commands.exec(toExecute.command, this.$editor, toExecute.args, e);
				if (success && e && hashId != -1 && toExecute["passEvent"] != true && toExecute.command["passEvent"] != true) event$1.stopEvent(e);
				if (success) break;
			}
			if (!success && hashId == -1) {
				toExecute = { command: "insertstring" };
				success = commands.exec("insertstring", this.$editor, keyString);
			}
			if (success && this.$editor._signal) this.$editor._signal("keyboardActivity", toExecute);
			return success;
		}
		onCommandKey(e, hashId, keyCode) {
			var keyString = keyUtil.keyCodeToString(keyCode);
			return this.$callKeyboardHandlers(hashId, keyString, keyCode, e);
		}
		onTextInput(text) {
			return this.$callKeyboardHandlers(-1, text);
		}
	};
	exports.KeyBinding = KeyBinding$1;
}));
var require_search = /* @__PURE__ */ __commonJSMin(((exports) => {
	var lang$2 = require_lang();
	var oop$2 = require_oop();
	var Range$2 = require_range().Range;
	var Search$1 = class {
		constructor() {
			this.$options = {};
		}
		set(options) {
			oop$2.mixin(this.$options, options);
			return this;
		}
		getOptions() {
			return lang$2.copyObject(this.$options);
		}
		setOptions(options) {
			this.$options = options;
		}
		find(session) {
			var options = this.$options;
			var iterator = this.$matchIterator(session, options);
			if (!iterator) return false;
			var firstRange = null;
			iterator.forEach(function(sr, sc, er, ec) {
				firstRange = new Range$2(sr, sc, er, ec);
				if (sc == ec && options.start && options.start.start && options.skipCurrent != false && firstRange.isEqual(options.start)) {
					firstRange = null;
					return false;
				}
				return true;
			});
			return firstRange;
		}
		findAll(session) {
			var options = this.$options;
			if (!options.needle) return [];
			this.$assembleRegExp(options);
			var range = options.range;
			var lines = range ? session.getLines(range.start.row, range.end.row) : session.doc.getAllLines();
			var ranges = [];
			var re = options.re;
			if (options.$isMultiLine) {
				var len = re.length;
				var maxRow = lines.length - len;
				var prevRange;
				outer: for (var row = re.offset || 0; row <= maxRow; row++) {
					for (var j = 0; j < len; j++) if (lines[row + j].search(re[j]) == -1) continue outer;
					var startLine = lines[row];
					var line = lines[row + len - 1];
					var startIndex = startLine.length - startLine.match(re[0])[0].length;
					var endIndex = line.match(re[len - 1])[0].length;
					if (prevRange && prevRange.end.row === row && prevRange.end.column > startIndex) continue;
					ranges.push(prevRange = new Range$2(row, startIndex, row + len - 1, endIndex));
					if (len > 2) row = row + len - 2;
				}
			} else for (var matches, i$1 = 0; i$1 < lines.length; i$1++) if (this.$isMultilineSearch(options)) {
				var lng = lines.length - 1;
				matches = this.$multiLineForward(session, re, i$1, lng);
				if (matches) {
					var end_row = matches.endRow <= lng ? matches.endRow - 1 : lng;
					if (end_row > i$1) i$1 = end_row;
					ranges.push(new Range$2(matches.startRow, matches.startCol, matches.endRow, matches.endCol));
				}
			} else {
				matches = lang$2.getMatchOffsets(lines[i$1], re);
				for (var j = 0; j < matches.length; j++) {
					var match = matches[j];
					ranges.push(new Range$2(i$1, match.offset, i$1, match.offset + match.length));
				}
			}
			if (range) {
				var startColumn = range.start.column;
				var endColumn = range.end.column;
				var i$1 = 0, j = ranges.length - 1;
				while (i$1 < j && ranges[i$1].start.column < startColumn && ranges[i$1].start.row == 0) i$1++;
				var endRow = range.end.row - range.start.row;
				while (i$1 < j && ranges[j].end.column > endColumn && ranges[j].end.row == endRow) j--;
				ranges = ranges.slice(i$1, j + 1);
				for (i$1 = 0, j = ranges.length; i$1 < j; i$1++) {
					ranges[i$1].start.row += range.start.row;
					ranges[i$1].end.row += range.start.row;
				}
			}
			return ranges;
		}
		parseReplaceString(replaceString) {
			var CharCode = {
				DollarSign: 36,
				Ampersand: 38,
				Digit0: 48,
				Digit1: 49,
				Digit9: 57,
				Backslash: 92,
				n: 110,
				t: 116
			};
			var replacement = "";
			for (var i$1 = 0, len = replaceString.length; i$1 < len; i$1++) {
				var chCode = replaceString.charCodeAt(i$1);
				if (chCode === CharCode.Backslash) {
					i$1++;
					if (i$1 >= len) {
						replacement += "\\";
						break;
					}
					switch (replaceString.charCodeAt(i$1)) {
						case CharCode.Backslash:
							replacement += "\\";
							break;
						case CharCode.n:
							replacement += "\n";
							break;
						case CharCode.t:
							replacement += "	";
							break;
					}
					continue;
				}
				if (chCode === CharCode.DollarSign) {
					i$1++;
					if (i$1 >= len) {
						replacement += "$";
						break;
					}
					const nextChCode = replaceString.charCodeAt(i$1);
					if (nextChCode === CharCode.DollarSign) {
						replacement += "$$";
						continue;
					}
					if (nextChCode === CharCode.Digit0 || nextChCode === CharCode.Ampersand) {
						replacement += "$&";
						continue;
					}
					if (CharCode.Digit1 <= nextChCode && nextChCode <= CharCode.Digit9) {
						replacement += "$" + replaceString[i$1];
						continue;
					}
				}
				replacement += replaceString[i$1];
			}
			return replacement || replaceString;
		}
		replace(input, replacement) {
			var options = this.$options;
			var re = this.$assembleRegExp(options);
			if (options.$isMultiLine) return replacement;
			if (!re) return;
			var mtSearch = this.$isMultilineSearch(options);
			if (mtSearch) input = input.replace(/\r\n|\r|\n/g, "\n");
			var match = re.exec(input);
			if (!match || !mtSearch && match[0].length != input.length) return null;
			replacement = options.regExp ? this.parseReplaceString(replacement) : replacement.replace(/\$/g, "$$$$");
			replacement = input.replace(re, replacement);
			if (options.preserveCase) {
				replacement = replacement.split("");
				for (var i$1 = Math.min(input.length, input.length); i$1--;) {
					var ch = input[i$1];
					if (ch && ch.toLowerCase() != ch) replacement[i$1] = replacement[i$1].toUpperCase();
					else replacement[i$1] = replacement[i$1].toLowerCase();
				}
				replacement = replacement.join("");
			}
			return replacement;
		}
		$assembleRegExp(options, $disableFakeMultiline) {
			if (options.needle instanceof RegExp) return options.re = options.needle;
			var needle = options.needle;
			if (!options.needle) return options.re = false;
			if (!options.regExp) needle = lang$2.escapeRegExp(needle);
			var modifier = options.caseSensitive ? "gm" : "gmi";
			try {
				new RegExp(needle, "u");
				options.$supportsUnicodeFlag = true;
				modifier += "u";
			} catch (e) {
				options.$supportsUnicodeFlag = false;
			}
			if (options.wholeWord) needle = addWordBoundary(needle, options);
			options.$isMultiLine = !$disableFakeMultiline && /[\n\r]/.test(needle);
			if (options.$isMultiLine) return options.re = this.$assembleMultilineRegExp(needle, modifier);
			try {
				var re = new RegExp(needle, modifier);
			} catch (e) {
				re = false;
			}
			return options.re = re;
		}
		$assembleMultilineRegExp(needle, modifier) {
			var parts = needle.replace(/\r\n|\r|\n/g, "$\n^").split("\n");
			var re = [];
			for (var i$1 = 0; i$1 < parts.length; i$1++) try {
				re.push(new RegExp(parts[i$1], modifier));
			} catch (e) {
				return false;
			}
			return re;
		}
		$isMultilineSearch(options) {
			return options.re && /\\r\\n|\\r|\\n/.test(options.re.source) && options.regExp && !options.$isMultiLine;
		}
		$multiLineForward(session, re, start, last) {
			var line, chunk = chunkEnd(session, start);
			for (var row = start; row <= last;) {
				for (var i$1 = 0; i$1 < chunk; i$1++) {
					if (row > last) break;
					var next = session.getLine(row++);
					line = line == null ? next : line + "\n" + next;
				}
				var match = re.exec(line);
				re.lastIndex = 0;
				if (match) {
					var beforeMatch = line.slice(0, match.index).split("\n");
					var matchedText = match[0].split("\n");
					var startRow = start + beforeMatch.length - 1;
					var startCol = beforeMatch[beforeMatch.length - 1].length;
					return {
						startRow,
						startCol,
						endRow: startRow + matchedText.length - 1,
						endCol: matchedText.length == 1 ? startCol + matchedText[0].length : matchedText[matchedText.length - 1].length
					};
				}
			}
			return null;
		}
		$multiLineBackward(session, re, endIndex, start, first) {
			var line, chunk = chunkEnd(session, start), endMargin = session.getLine(start).length - endIndex;
			for (var row = start; row >= first;) {
				for (var i$1 = 0; i$1 < chunk && row >= first; i$1++) {
					var next = session.getLine(row--);
					line = line == null ? next : next + "\n" + line;
				}
				var match = multiLineBackwardMatch(line, re, endMargin);
				if (match) {
					var beforeMatch = line.slice(0, match.index).split("\n");
					var matchedText = match[0].split("\n");
					var startRow = row + beforeMatch.length;
					var startCol = beforeMatch[beforeMatch.length - 1].length;
					return {
						startRow,
						startCol,
						endRow: startRow + matchedText.length - 1,
						endCol: matchedText.length == 1 ? startCol + matchedText[0].length : matchedText[matchedText.length - 1].length
					};
				}
			}
			return null;
		}
		$matchIterator(session, options) {
			var re = this.$assembleRegExp(options);
			if (!re) return false;
			var mtSearch = this.$isMultilineSearch(options);
			var mtForward = this.$multiLineForward;
			var mtBackward = this.$multiLineBackward;
			var backwards = options.backwards == true;
			var skipCurrent = options.skipCurrent != false;
			var supportsUnicodeFlag = re.unicode;
			var range = options.range;
			var start = options.start;
			if (!start) start = range ? range[backwards ? "end" : "start"] : session.selection.getRange();
			if (start.start) start = start[skipCurrent != backwards ? "end" : "start"];
			var firstRow = range ? range.start.row : 0;
			var lastRow = range ? range.end.row : session.getLength() - 1;
			if (backwards) var forEach = function(callback) {
				var row = start.row;
				if (forEachInLine(row, start.column, callback)) return;
				for (row--; row >= firstRow; row--) if (forEachInLine(row, Number.MAX_VALUE, callback)) return;
				if (options.wrap == false) return;
				for (row = lastRow, firstRow = start.row; row >= firstRow; row--) if (forEachInLine(row, Number.MAX_VALUE, callback)) return;
			};
			else var forEach = function(callback) {
				var row = start.row;
				if (forEachInLine(row, start.column, callback)) return;
				for (row = row + 1; row <= lastRow; row++) if (forEachInLine(row, 0, callback)) return;
				if (options.wrap == false) return;
				for (row = firstRow, lastRow = start.row; row <= lastRow; row++) if (forEachInLine(row, 0, callback)) return;
			};
			if (options.$isMultiLine) {
				var len = re.length;
				var forEachInLine = function(row, offset, callback) {
					var startRow = backwards ? row - len + 1 : row;
					if (startRow < 0 || startRow + len > session.getLength()) return;
					var line = session.getLine(startRow);
					var startIndex = line.search(re[0]);
					if (!backwards && startIndex < offset || startIndex === -1) return;
					for (var i$1 = 1; i$1 < len; i$1++) {
						line = session.getLine(startRow + i$1);
						if (line.search(re[i$1]) == -1) return;
					}
					var endIndex = line.match(re[len - 1])[0].length;
					if (backwards && endIndex > offset) return;
					if (callback(startRow, startIndex, startRow + len - 1, endIndex)) return true;
				};
			} else if (backwards) var forEachInLine = function(row, endIndex, callback) {
				if (mtSearch) {
					var pos = mtBackward(session, re, endIndex, row, firstRow);
					if (!pos) return false;
					if (callback(pos.startRow, pos.startCol, pos.endRow, pos.endCol)) return true;
				} else {
					var line = session.getLine(row);
					var matches = [];
					var m, last = 0;
					re.lastIndex = 0;
					while (m = re.exec(line)) {
						var length = m[0].length;
						last = m.index;
						if (!length) {
							if (last >= line.length) break;
							re.lastIndex = last += lang$2.skipEmptyMatch(line, last, supportsUnicodeFlag);
						}
						if (m.index + length > endIndex) break;
						matches.push(m.index, length);
					}
					for (var i$1 = matches.length - 1; i$1 >= 0; i$1 -= 2) {
						var column = matches[i$1 - 1];
						var length = matches[i$1];
						if (callback(row, column, row, column + length)) return true;
					}
				}
			};
			else var forEachInLine = function(row, startIndex, callback) {
				re.lastIndex = startIndex;
				if (mtSearch) {
					var pos = mtForward(session, re, row, lastRow);
					if (pos) {
						var end_row = pos.endRow <= lastRow ? pos.endRow - 1 : lastRow;
						if (end_row > row) row = end_row;
					}
					if (!pos) return false;
					if (callback(pos.startRow, pos.startCol, pos.endRow, pos.endCol)) return true;
				} else {
					var line = session.getLine(row);
					var last;
					var m;
					while (m = re.exec(line)) {
						var length = m[0].length;
						last = m.index;
						if (callback(row, last, row, last + length)) return true;
						if (!length) {
							re.lastIndex = last += lang$2.skipEmptyMatch(line, last, supportsUnicodeFlag);
							if (last >= line.length) return false;
						}
					}
				}
			};
			return { forEach };
		}
	};
	function addWordBoundary(needle, options) {
		let supportsLookbehind = lang$2.supportsLookbehind();
		function wordBoundary(c, firstChar$1 = true) {
			if ((supportsLookbehind && options.$supportsUnicodeFlag ? new RegExp("[\\p{L}\\p{N}_]", "u") : /* @__PURE__ */ new RegExp("\\w")).test(c) || options.regExp) {
				if (supportsLookbehind && options.$supportsUnicodeFlag) {
					if (firstChar$1) return "(?<=^|[^\\p{L}\\p{N}_])";
					return "(?=[^\\p{L}\\p{N}_]|$)";
				}
				return "\\b";
			}
			return "";
		}
		let needleArray = Array.from(needle);
		let firstChar = needleArray[0];
		let lastChar = needleArray[needleArray.length - 1];
		return wordBoundary(firstChar) + needle + wordBoundary(lastChar, false);
	}
	function multiLineBackwardMatch(line, re, endMargin) {
		var match = null;
		var from = 0;
		while (from <= line.length) {
			re.lastIndex = from;
			var newMatch = re.exec(line);
			if (!newMatch) break;
			var end = newMatch.index + newMatch[0].length;
			if (end > line.length - endMargin) break;
			if (!match || end > match.index + match[0].length) match = newMatch;
			from = newMatch.index + 1;
		}
		return match;
	}
	function chunkEnd(session, start) {
		var base = 5e3, startPosition = {
			row: start,
			column: 0
		}, targetIndex = session.doc.positionToIndex(startPosition) + base;
		return session.doc.indexToPosition(targetIndex).row + 1;
	}
	exports.Search = Search$1;
}));
var require_command_manager = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var MultiHashHandler = require_hash_handler().MultiHashHandler;
	var EventEmitter$1 = require_event_emitter().EventEmitter;
	var CommandManager$1 = class extends MultiHashHandler {
		constructor(platform, commands) {
			super(commands, platform);
			this.byName = this.commands;
			this.setDefaultHandler("exec", function(e) {
				if (!e.args) return e.command.exec(e.editor, {}, e.event, true);
				return e.command.exec(e.editor, e.args, e.event, false);
			});
		}
		exec(command, editor, args) {
			if (Array.isArray(command)) {
				for (var i$1 = command.length; i$1--;) if (this.exec(command[i$1], editor, args)) return true;
				return false;
			}
			if (typeof command === "string") command = this.commands[command];
			var e = {
				editor,
				command,
				args
			};
			if (!this.canExecute(command, editor)) {
				this._signal("commandUnavailable", e);
				return false;
			}
			e.returnValue = this._emit("exec", e);
			this._signal("afterExec", e);
			return e.returnValue === false ? false : true;
		}
		canExecute(command, editor) {
			if (typeof command === "string") command = this.commands[command];
			if (!command) return false;
			if (editor && editor.$readOnly && !command.readOnly) return false;
			if (this.$checkCommandState != false && command.isAvailable && !command.isAvailable(editor)) return false;
			return true;
		}
		toggleRecording(editor) {
			if (this.$inReplay) return;
			editor && editor._emit("changeStatus");
			if (this.recording) {
				this.macro.pop();
				this.off("exec", this.$addCommandToMacro);
				if (!this.macro.length) this.macro = this.oldMacro;
				return this.recording = false;
			}
			if (!this.$addCommandToMacro) this.$addCommandToMacro = function(e) {
				this.macro.push([e.command, e.args]);
			}.bind(this);
			this.oldMacro = this.macro;
			this.macro = [];
			this.on("exec", this.$addCommandToMacro);
			return this.recording = true;
		}
		replay(editor) {
			if (this.$inReplay || !this.macro) return;
			if (this.recording) return this.toggleRecording(editor);
			try {
				this.$inReplay = true;
				this.macro.forEach(function(x) {
					if (typeof x == "string") this.exec(x, editor);
					else this.exec(x[0], editor, x[1]);
				}, this);
			} finally {
				this.$inReplay = false;
			}
		}
		trimMacro(m) {
			return m.map(function(x) {
				if (typeof x[0] != "string") x[0] = x[0].name;
				if (!x[1]) x = x[0];
				return x;
			});
		}
	};
	oop$1.implement(CommandManager$1.prototype, EventEmitter$1);
	exports.CommandManager = CommandManager$1;
}));
var require_default_commands = /* @__PURE__ */ __commonJSMin(((exports) => {
	var lang$1 = require_lang();
	var config$1 = require_config();
	var Range$1 = require_range().Range;
	function bindKey(win, mac) {
		return {
			win,
			mac
		};
	}
	exports.commands = [
		{
			name: "showSettingsMenu",
			description: "Show settings menu",
			bindKey: bindKey("Ctrl-,", "Command-,"),
			exec: function(editor) {
				config$1.loadModule("ace/ext/settings_menu", function(module$1) {
					module$1.init(editor);
					editor.showSettingsMenu();
				});
			},
			readOnly: true
		},
		{
			name: "goToNextError",
			description: "Go to next error",
			bindKey: bindKey("Alt-E", "F4"),
			exec: function(editor) {
				config$1.loadModule("ace/ext/error_marker", function(module$1) {
					module$1.showErrorMarker(editor, 1);
				});
			},
			scrollIntoView: "animate",
			readOnly: true
		},
		{
			name: "goToPreviousError",
			description: "Go to previous error",
			bindKey: bindKey("Alt-Shift-E", "Shift-F4"),
			exec: function(editor) {
				config$1.loadModule("ace/ext/error_marker", function(module$1) {
					module$1.showErrorMarker(editor, -1);
				});
			},
			scrollIntoView: "animate",
			readOnly: true
		},
		{
			name: "selectall",
			description: "Select all",
			bindKey: bindKey("Ctrl-A", "Command-A"),
			exec: function(editor) {
				editor.selectAll();
			},
			readOnly: true
		},
		{
			name: "centerselection",
			description: "Center selection",
			bindKey: bindKey(null, "Ctrl-L"),
			exec: function(editor) {
				editor.centerSelection();
			},
			readOnly: true
		},
		{
			name: "gotoline",
			description: "Go to line...",
			bindKey: bindKey("Ctrl-L", "Command-L"),
			exec: function(editor, line) {
				if (typeof line === "number" && !isNaN(line)) editor.gotoLine(line);
				editor.prompt({ $type: "gotoLine" });
			},
			readOnly: true
		},
		{
			name: "fold",
			bindKey: bindKey("Alt-L|Ctrl-F1", "Command-Alt-L|Command-F1"),
			exec: function(editor) {
				editor.session.toggleFold(false);
			},
			multiSelectAction: "forEach",
			scrollIntoView: "center",
			readOnly: true
		},
		{
			name: "unfold",
			bindKey: bindKey("Alt-Shift-L|Ctrl-Shift-F1", "Command-Alt-Shift-L|Command-Shift-F1"),
			exec: function(editor) {
				editor.session.toggleFold(true);
			},
			multiSelectAction: "forEach",
			scrollIntoView: "center",
			readOnly: true
		},
		{
			name: "toggleFoldWidget",
			description: "Toggle fold widget",
			bindKey: bindKey("F2", "F2"),
			exec: function(editor) {
				editor.session.toggleFoldWidget();
			},
			multiSelectAction: "forEach",
			scrollIntoView: "center",
			readOnly: true
		},
		{
			name: "toggleParentFoldWidget",
			description: "Toggle parent fold widget",
			bindKey: bindKey("Alt-F2", "Alt-F2"),
			exec: function(editor) {
				editor.session.toggleFoldWidget(true);
			},
			multiSelectAction: "forEach",
			scrollIntoView: "center",
			readOnly: true
		},
		{
			name: "foldall",
			description: "Fold all",
			bindKey: bindKey(null, "Ctrl-Command-Option-0"),
			exec: function(editor) {
				editor.session.foldAll();
			},
			scrollIntoView: "center",
			readOnly: true
		},
		{
			name: "foldAllComments",
			description: "Fold all comments",
			bindKey: bindKey(null, "Ctrl-Command-Option-0"),
			exec: function(editor) {
				editor.session.foldAllComments();
			},
			scrollIntoView: "center",
			readOnly: true
		},
		{
			name: "foldOther",
			description: "Fold other",
			bindKey: bindKey("Alt-0", "Command-Option-0"),
			exec: function(editor) {
				editor.session.foldAll();
				editor.session.unfold(editor.selection.getAllRanges());
			},
			scrollIntoView: "center",
			readOnly: true
		},
		{
			name: "unfoldall",
			description: "Unfold all",
			bindKey: bindKey("Alt-Shift-0", "Command-Option-Shift-0"),
			exec: function(editor) {
				editor.session.unfold();
			},
			scrollIntoView: "center",
			readOnly: true
		},
		{
			name: "findnext",
			description: "Find next",
			bindKey: bindKey("Ctrl-K", "Command-G"),
			exec: function(editor) {
				editor.findNext();
			},
			multiSelectAction: "forEach",
			scrollIntoView: "center",
			readOnly: true
		},
		{
			name: "findprevious",
			description: "Find previous",
			bindKey: bindKey("Ctrl-Shift-K", "Command-Shift-G"),
			exec: function(editor) {
				editor.findPrevious();
			},
			multiSelectAction: "forEach",
			scrollIntoView: "center",
			readOnly: true
		},
		{
			name: "selectOrFindNext",
			description: "Select or find next",
			bindKey: bindKey("Alt-K", "Ctrl-G"),
			exec: function(editor) {
				if (editor.selection.isEmpty()) editor.selection.selectWord();
				else editor.findNext();
			},
			readOnly: true
		},
		{
			name: "selectOrFindPrevious",
			description: "Select or find previous",
			bindKey: bindKey("Alt-Shift-K", "Ctrl-Shift-G"),
			exec: function(editor) {
				if (editor.selection.isEmpty()) editor.selection.selectWord();
				else editor.findPrevious();
			},
			readOnly: true
		},
		{
			name: "find",
			description: "Find",
			bindKey: bindKey("Ctrl-F", "Command-F"),
			exec: function(editor) {
				config$1.loadModule("ace/ext/searchbox", function(e) {
					e.Search(editor);
				});
			},
			readOnly: true
		},
		{
			name: "overwrite",
			description: "Overwrite",
			bindKey: "Insert",
			exec: function(editor) {
				editor.toggleOverwrite();
			},
			readOnly: true
		},
		{
			name: "selecttostart",
			description: "Select to start",
			bindKey: bindKey("Ctrl-Shift-Home", "Command-Shift-Home|Command-Shift-Up"),
			exec: function(editor) {
				editor.getSelection().selectFileStart();
			},
			multiSelectAction: "forEach",
			readOnly: true,
			scrollIntoView: "animate",
			aceCommandGroup: "fileJump"
		},
		{
			name: "gotostart",
			description: "Go to start",
			bindKey: bindKey("Ctrl-Home", "Command-Home|Command-Up"),
			exec: function(editor) {
				editor.navigateFileStart();
			},
			multiSelectAction: "forEach",
			readOnly: true,
			scrollIntoView: "animate",
			aceCommandGroup: "fileJump"
		},
		{
			name: "selectup",
			description: "Select up",
			bindKey: bindKey("Shift-Up", "Shift-Up|Ctrl-Shift-P"),
			exec: function(editor) {
				editor.getSelection().selectUp();
			},
			multiSelectAction: "forEach",
			scrollIntoView: "cursor",
			readOnly: true
		},
		{
			name: "golineup",
			description: "Go line up",
			bindKey: bindKey("Up", "Up|Ctrl-P"),
			exec: function(editor, args) {
				editor.navigateUp(args.times);
			},
			multiSelectAction: "forEach",
			scrollIntoView: "cursor",
			readOnly: true
		},
		{
			name: "selecttoend",
			description: "Select to end",
			bindKey: bindKey("Ctrl-Shift-End", "Command-Shift-End|Command-Shift-Down"),
			exec: function(editor) {
				editor.getSelection().selectFileEnd();
			},
			multiSelectAction: "forEach",
			readOnly: true,
			scrollIntoView: "animate",
			aceCommandGroup: "fileJump"
		},
		{
			name: "gotoend",
			description: "Go to end",
			bindKey: bindKey("Ctrl-End", "Command-End|Command-Down"),
			exec: function(editor) {
				editor.navigateFileEnd();
			},
			multiSelectAction: "forEach",
			readOnly: true,
			scrollIntoView: "animate",
			aceCommandGroup: "fileJump"
		},
		{
			name: "selectdown",
			description: "Select down",
			bindKey: bindKey("Shift-Down", "Shift-Down|Ctrl-Shift-N"),
			exec: function(editor) {
				editor.getSelection().selectDown();
			},
			multiSelectAction: "forEach",
			scrollIntoView: "cursor",
			readOnly: true
		},
		{
			name: "golinedown",
			description: "Go line down",
			bindKey: bindKey("Down", "Down|Ctrl-N"),
			exec: function(editor, args) {
				editor.navigateDown(args.times);
			},
			multiSelectAction: "forEach",
			scrollIntoView: "cursor",
			readOnly: true
		},
		{
			name: "selectwordleft",
			description: "Select word left",
			bindKey: bindKey("Ctrl-Shift-Left", "Option-Shift-Left"),
			exec: function(editor) {
				editor.getSelection().selectWordLeft();
			},
			multiSelectAction: "forEach",
			scrollIntoView: "cursor",
			readOnly: true
		},
		{
			name: "gotowordleft",
			description: "Go to word left",
			bindKey: bindKey("Ctrl-Left", "Option-Left"),
			exec: function(editor) {
				editor.navigateWordLeft();
			},
			multiSelectAction: "forEach",
			scrollIntoView: "cursor",
			readOnly: true
		},
		{
			name: "selecttolinestart",
			description: "Select to line start",
			bindKey: bindKey("Alt-Shift-Left", "Command-Shift-Left|Ctrl-Shift-A"),
			exec: function(editor) {
				editor.getSelection().selectLineStart();
			},
			multiSelectAction: "forEach",
			scrollIntoView: "cursor",
			readOnly: true
		},
		{
			name: "gotolinestart",
			description: "Go to line start",
			bindKey: bindKey("Alt-Left|Home", "Command-Left|Home|Ctrl-A"),
			exec: function(editor) {
				editor.navigateLineStart();
			},
			multiSelectAction: "forEach",
			scrollIntoView: "cursor",
			readOnly: true
		},
		{
			name: "selectleft",
			description: "Select left",
			bindKey: bindKey("Shift-Left", "Shift-Left|Ctrl-Shift-B"),
			exec: function(editor) {
				editor.getSelection().selectLeft();
			},
			multiSelectAction: "forEach",
			scrollIntoView: "cursor",
			readOnly: true
		},
		{
			name: "gotoleft",
			description: "Go to left",
			bindKey: bindKey("Left", "Left|Ctrl-B"),
			exec: function(editor, args) {
				editor.navigateLeft(args.times);
			},
			multiSelectAction: "forEach",
			scrollIntoView: "cursor",
			readOnly: true
		},
		{
			name: "selectwordright",
			description: "Select word right",
			bindKey: bindKey("Ctrl-Shift-Right", "Option-Shift-Right"),
			exec: function(editor) {
				editor.getSelection().selectWordRight();
			},
			multiSelectAction: "forEach",
			scrollIntoView: "cursor",
			readOnly: true
		},
		{
			name: "gotowordright",
			description: "Go to word right",
			bindKey: bindKey("Ctrl-Right", "Option-Right"),
			exec: function(editor) {
				editor.navigateWordRight();
			},
			multiSelectAction: "forEach",
			scrollIntoView: "cursor",
			readOnly: true
		},
		{
			name: "selecttolineend",
			description: "Select to line end",
			bindKey: bindKey("Alt-Shift-Right", "Command-Shift-Right|Shift-End|Ctrl-Shift-E"),
			exec: function(editor) {
				editor.getSelection().selectLineEnd();
			},
			multiSelectAction: "forEach",
			scrollIntoView: "cursor",
			readOnly: true
		},
		{
			name: "gotolineend",
			description: "Go to line end",
			bindKey: bindKey("Alt-Right|End", "Command-Right|End|Ctrl-E"),
			exec: function(editor) {
				editor.navigateLineEnd();
			},
			multiSelectAction: "forEach",
			scrollIntoView: "cursor",
			readOnly: true
		},
		{
			name: "selectright",
			description: "Select right",
			bindKey: bindKey("Shift-Right", "Shift-Right"),
			exec: function(editor) {
				editor.getSelection().selectRight();
			},
			multiSelectAction: "forEach",
			scrollIntoView: "cursor",
			readOnly: true
		},
		{
			name: "gotoright",
			description: "Go to right",
			bindKey: bindKey("Right", "Right|Ctrl-F"),
			exec: function(editor, args) {
				editor.navigateRight(args.times);
			},
			multiSelectAction: "forEach",
			scrollIntoView: "cursor",
			readOnly: true
		},
		{
			name: "selectpagedown",
			description: "Select page down",
			bindKey: "Shift-PageDown",
			exec: function(editor) {
				editor.selectPageDown();
			},
			readOnly: true
		},
		{
			name: "pagedown",
			description: "Page down",
			bindKey: bindKey(null, "Option-PageDown"),
			exec: function(editor) {
				editor.scrollPageDown();
			},
			readOnly: true
		},
		{
			name: "gotopagedown",
			description: "Go to page down",
			bindKey: bindKey("PageDown", "PageDown|Ctrl-V"),
			exec: function(editor) {
				editor.gotoPageDown();
			},
			readOnly: true
		},
		{
			name: "selectpageup",
			description: "Select page up",
			bindKey: "Shift-PageUp",
			exec: function(editor) {
				editor.selectPageUp();
			},
			readOnly: true
		},
		{
			name: "pageup",
			description: "Page up",
			bindKey: bindKey(null, "Option-PageUp"),
			exec: function(editor) {
				editor.scrollPageUp();
			},
			readOnly: true
		},
		{
			name: "gotopageup",
			description: "Go to page up",
			bindKey: "PageUp",
			exec: function(editor) {
				editor.gotoPageUp();
			},
			readOnly: true
		},
		{
			name: "scrollup",
			description: "Scroll up",
			bindKey: bindKey("Ctrl-Up", null),
			exec: function(e) {
				e.renderer.scrollBy(0, -2 * e.renderer.layerConfig.lineHeight);
			},
			readOnly: true
		},
		{
			name: "scrolldown",
			description: "Scroll down",
			bindKey: bindKey("Ctrl-Down", null),
			exec: function(e) {
				e.renderer.scrollBy(0, 2 * e.renderer.layerConfig.lineHeight);
			},
			readOnly: true
		},
		{
			name: "selectlinestart",
			description: "Select line start",
			bindKey: "Shift-Home",
			exec: function(editor) {
				editor.getSelection().selectLineStart();
			},
			multiSelectAction: "forEach",
			scrollIntoView: "cursor",
			readOnly: true
		},
		{
			name: "selectlineend",
			description: "Select line end",
			bindKey: "Shift-End",
			exec: function(editor) {
				editor.getSelection().selectLineEnd();
			},
			multiSelectAction: "forEach",
			scrollIntoView: "cursor",
			readOnly: true
		},
		{
			name: "togglerecording",
			description: "Toggle recording",
			bindKey: bindKey("Ctrl-Alt-E", "Command-Option-E"),
			exec: function(editor) {
				editor.commands.toggleRecording(editor);
			},
			readOnly: true
		},
		{
			name: "replaymacro",
			description: "Replay macro",
			bindKey: bindKey("Ctrl-Shift-E", "Command-Shift-E"),
			exec: function(editor) {
				editor.commands.replay(editor);
			},
			readOnly: true
		},
		{
			name: "jumptomatching",
			description: "Jump to matching",
			bindKey: bindKey("Ctrl-\\|Ctrl-P", "Command-\\"),
			exec: function(editor) {
				editor.jumpToMatching();
			},
			multiSelectAction: "forEach",
			scrollIntoView: "animate",
			readOnly: true
		},
		{
			name: "selecttomatching",
			description: "Select to matching",
			bindKey: bindKey("Ctrl-Shift-\\|Ctrl-Shift-P", "Command-Shift-\\"),
			exec: function(editor) {
				editor.jumpToMatching(true);
			},
			multiSelectAction: "forEach",
			scrollIntoView: "animate",
			readOnly: true
		},
		{
			name: "expandToMatching",
			description: "Expand to matching",
			bindKey: bindKey("Ctrl-Shift-M", "Ctrl-Shift-M"),
			exec: function(editor) {
				editor.jumpToMatching(true, true);
			},
			multiSelectAction: "forEach",
			scrollIntoView: "animate",
			readOnly: true
		},
		{
			name: "passKeysToBrowser",
			description: "Pass keys to browser",
			bindKey: bindKey(null, null),
			exec: function() {},
			passEvent: true,
			readOnly: true
		},
		{
			name: "copy",
			description: "Copy",
			exec: function(editor) {},
			readOnly: true
		},
		{
			name: "cut",
			description: "Cut",
			exec: function(editor) {
				var range = editor.$copyWithEmptySelection && editor.selection.isEmpty() ? editor.selection.getLineRange() : editor.selection.getRange();
				editor._emit("cut", range);
				if (!range.isEmpty()) editor.session.remove(range);
				editor.clearSelection();
			},
			scrollIntoView: "cursor",
			multiSelectAction: "forEach"
		},
		{
			name: "paste",
			description: "Paste",
			exec: function(editor, args) {
				editor.$handlePaste(args);
			},
			scrollIntoView: "cursor"
		},
		{
			name: "removeline",
			description: "Remove line",
			bindKey: bindKey("Ctrl-D", "Command-D"),
			exec: function(editor) {
				editor.removeLines();
			},
			scrollIntoView: "cursor",
			multiSelectAction: "forEachLine"
		},
		{
			name: "duplicateSelection",
			description: "Duplicate selection",
			bindKey: bindKey("Ctrl-Shift-D", "Command-Shift-D"),
			exec: function(editor) {
				editor.duplicateSelection();
			},
			scrollIntoView: "cursor",
			multiSelectAction: "forEach"
		},
		{
			name: "sortlines",
			description: "Sort lines",
			bindKey: bindKey("Ctrl-Alt-S", "Command-Alt-S"),
			exec: function(editor) {
				editor.sortLines();
			},
			scrollIntoView: "selection",
			multiSelectAction: "forEachLine"
		},
		{
			name: "togglecomment",
			description: "Toggle comment",
			bindKey: bindKey("Ctrl-/", "Command-/"),
			exec: function(editor) {
				editor.toggleCommentLines();
			},
			multiSelectAction: "forEachLine",
			scrollIntoView: "selectionPart"
		},
		{
			name: "toggleBlockComment",
			description: "Toggle block comment",
			bindKey: bindKey("Ctrl-Shift-/", "Command-Shift-/"),
			exec: function(editor) {
				editor.toggleBlockComment();
			},
			multiSelectAction: "forEach",
			scrollIntoView: "selectionPart"
		},
		{
			name: "modifyNumberUp",
			description: "Modify number up",
			bindKey: bindKey("Ctrl-Shift-Up", "Alt-Shift-Up"),
			exec: function(editor) {
				editor.modifyNumber(1);
			},
			scrollIntoView: "cursor",
			multiSelectAction: "forEach"
		},
		{
			name: "modifyNumberDown",
			description: "Modify number down",
			bindKey: bindKey("Ctrl-Shift-Down", "Alt-Shift-Down"),
			exec: function(editor) {
				editor.modifyNumber(-1);
			},
			scrollIntoView: "cursor",
			multiSelectAction: "forEach"
		},
		{
			name: "replace",
			description: "Replace",
			bindKey: bindKey("Ctrl-H", "Command-Option-F"),
			exec: function(editor) {
				config$1.loadModule("ace/ext/searchbox", function(e) {
					e.Search(editor, true);
				});
			}
		},
		{
			name: "undo",
			description: "Undo",
			bindKey: bindKey("Ctrl-Z", "Command-Z"),
			exec: function(editor) {
				editor.undo();
			}
		},
		{
			name: "redo",
			description: "Redo",
			bindKey: bindKey("Ctrl-Shift-Z|Ctrl-Y", "Command-Shift-Z|Command-Y"),
			exec: function(editor) {
				editor.redo();
			}
		},
		{
			name: "copylinesup",
			description: "Copy lines up",
			bindKey: bindKey("Alt-Shift-Up", "Command-Option-Up"),
			exec: function(editor) {
				editor.copyLinesUp();
			},
			scrollIntoView: "cursor"
		},
		{
			name: "movelinesup",
			description: "Move lines up",
			bindKey: bindKey("Alt-Up", "Option-Up"),
			exec: function(editor) {
				editor.moveLinesUp();
			},
			scrollIntoView: "cursor"
		},
		{
			name: "copylinesdown",
			description: "Copy lines down",
			bindKey: bindKey("Alt-Shift-Down", "Command-Option-Down"),
			exec: function(editor) {
				editor.copyLinesDown();
			},
			scrollIntoView: "cursor"
		},
		{
			name: "movelinesdown",
			description: "Move lines down",
			bindKey: bindKey("Alt-Down", "Option-Down"),
			exec: function(editor) {
				editor.moveLinesDown();
			},
			scrollIntoView: "cursor"
		},
		{
			name: "del",
			description: "Delete",
			bindKey: bindKey("Delete", "Delete|Ctrl-D|Shift-Delete"),
			exec: function(editor) {
				editor.remove("right");
			},
			multiSelectAction: "forEach",
			scrollIntoView: "cursor"
		},
		{
			name: "backspace",
			description: "Backspace",
			bindKey: bindKey("Shift-Backspace|Backspace", "Ctrl-Backspace|Shift-Backspace|Backspace|Ctrl-H"),
			exec: function(editor) {
				editor.remove("left");
			},
			multiSelectAction: "forEach",
			scrollIntoView: "cursor"
		},
		{
			name: "cut_or_delete",
			description: "Cut or delete",
			bindKey: bindKey("Shift-Delete", null),
			exec: function(editor) {
				if (editor.selection.isEmpty()) editor.remove("left");
				else return false;
			},
			multiSelectAction: "forEach",
			scrollIntoView: "cursor"
		},
		{
			name: "removetolinestart",
			description: "Remove to line start",
			bindKey: bindKey("Alt-Backspace", "Command-Backspace"),
			exec: function(editor) {
				editor.removeToLineStart();
			},
			multiSelectAction: "forEach",
			scrollIntoView: "cursor"
		},
		{
			name: "removetolineend",
			description: "Remove to line end",
			bindKey: bindKey("Alt-Delete", "Ctrl-K|Command-Delete"),
			exec: function(editor) {
				editor.removeToLineEnd();
			},
			multiSelectAction: "forEach",
			scrollIntoView: "cursor"
		},
		{
			name: "removetolinestarthard",
			description: "Remove to line start hard",
			bindKey: bindKey("Ctrl-Shift-Backspace", null),
			exec: function(editor) {
				var range = editor.selection.getRange();
				range.start.column = 0;
				editor.session.remove(range);
			},
			multiSelectAction: "forEach",
			scrollIntoView: "cursor"
		},
		{
			name: "removetolineendhard",
			description: "Remove to line end hard",
			bindKey: bindKey("Ctrl-Shift-Delete", null),
			exec: function(editor) {
				var range = editor.selection.getRange();
				range.end.column = Number.MAX_VALUE;
				editor.session.remove(range);
			},
			multiSelectAction: "forEach",
			scrollIntoView: "cursor"
		},
		{
			name: "removewordleft",
			description: "Remove word left",
			bindKey: bindKey("Ctrl-Backspace", "Alt-Backspace|Ctrl-Alt-Backspace"),
			exec: function(editor) {
				editor.removeWordLeft();
			},
			multiSelectAction: "forEach",
			scrollIntoView: "cursor"
		},
		{
			name: "removewordright",
			description: "Remove word right",
			bindKey: bindKey("Ctrl-Delete", "Alt-Delete"),
			exec: function(editor) {
				editor.removeWordRight();
			},
			multiSelectAction: "forEach",
			scrollIntoView: "cursor"
		},
		{
			name: "outdent",
			description: "Outdent",
			bindKey: bindKey("Shift-Tab", "Shift-Tab"),
			exec: function(editor) {
				editor.blockOutdent();
			},
			multiSelectAction: "forEach",
			scrollIntoView: "selectionPart"
		},
		{
			name: "indent",
			description: "Indent",
			bindKey: bindKey("Tab", "Tab"),
			exec: function(editor) {
				editor.indent();
			},
			multiSelectAction: "forEach",
			scrollIntoView: "selectionPart"
		},
		{
			name: "blockoutdent",
			description: "Block outdent",
			bindKey: bindKey("Ctrl-[", "Ctrl-["),
			exec: function(editor) {
				editor.blockOutdent();
			},
			multiSelectAction: "forEachLine",
			scrollIntoView: "selectionPart"
		},
		{
			name: "blockindent",
			description: "Block indent",
			bindKey: bindKey("Ctrl-]", "Ctrl-]"),
			exec: function(editor) {
				editor.blockIndent();
			},
			multiSelectAction: "forEachLine",
			scrollIntoView: "selectionPart"
		},
		{
			name: "insertstring",
			description: "Insert string",
			exec: function(editor, str) {
				editor.insert(str);
			},
			multiSelectAction: "forEach",
			scrollIntoView: "cursor"
		},
		{
			name: "inserttext",
			description: "Insert text",
			exec: function(editor, args) {
				editor.insert(lang$1.stringRepeat(args.text || "", args.times || 1));
			},
			multiSelectAction: "forEach",
			scrollIntoView: "cursor"
		},
		{
			name: "splitline",
			description: "Split line",
			bindKey: bindKey(null, "Ctrl-O"),
			exec: function(editor) {
				editor.splitLine();
			},
			multiSelectAction: "forEach",
			scrollIntoView: "cursor"
		},
		{
			name: "transposeletters",
			description: "Transpose letters",
			bindKey: bindKey("Alt-Shift-X", "Ctrl-T"),
			exec: function(editor) {
				editor.transposeLetters();
			},
			multiSelectAction: function(editor) {
				editor.transposeSelections(1);
			},
			scrollIntoView: "cursor"
		},
		{
			name: "touppercase",
			description: "To uppercase",
			bindKey: bindKey("Ctrl-U", "Ctrl-U"),
			exec: function(editor) {
				editor.toUpperCase();
			},
			multiSelectAction: "forEach",
			scrollIntoView: "cursor"
		},
		{
			name: "tolowercase",
			description: "To lowercase",
			bindKey: bindKey("Ctrl-Shift-U", "Ctrl-Shift-U"),
			exec: function(editor) {
				editor.toLowerCase();
			},
			multiSelectAction: "forEach",
			scrollIntoView: "cursor"
		},
		{
			name: "autoindent",
			description: "Auto Indent",
			bindKey: bindKey(null, null),
			exec: function(editor) {
				editor.autoIndent();
			},
			scrollIntoView: "animate"
		},
		{
			name: "expandtoline",
			description: "Expand to line",
			bindKey: bindKey("Ctrl-Shift-L", "Command-Shift-L"),
			exec: function(editor) {
				var range = editor.selection.getRange();
				range.start.column = range.end.column = 0;
				range.end.row++;
				editor.selection.setRange(range, false);
			},
			multiSelectAction: "forEach",
			scrollIntoView: "cursor",
			readOnly: true
		},
		{
			name: "openlink",
			bindKey: bindKey("Ctrl+F3", "F3"),
			exec: function(editor) {
				editor.openLink();
			}
		},
		{
			name: "joinlines",
			description: "Join lines",
			bindKey: bindKey(null, null),
			exec: function(editor) {
				var isBackwards = editor.selection.isBackwards();
				var selectionStart = isBackwards ? editor.selection.getSelectionLead() : editor.selection.getSelectionAnchor();
				var selectionEnd = isBackwards ? editor.selection.getSelectionAnchor() : editor.selection.getSelectionLead();
				var firstLineEndCol = editor.session.doc.getLine(selectionStart.row).length;
				var selectedCount = editor.session.doc.getTextRange(editor.selection.getRange()).replace(/\n\s*/, " ").length;
				var insertLine = editor.session.doc.getLine(selectionStart.row);
				for (var i$1 = selectionStart.row + 1; i$1 <= selectionEnd.row + 1; i$1++) {
					var curLine = lang$1.stringTrimLeft(lang$1.stringTrimRight(editor.session.doc.getLine(i$1)));
					if (curLine.length !== 0) curLine = " " + curLine;
					insertLine += curLine;
				}
				if (selectionEnd.row + 1 < editor.session.doc.getLength() - 1) insertLine += editor.session.doc.getNewLineCharacter();
				editor.clearSelection();
				editor.session.doc.replace(new Range$1(selectionStart.row, 0, selectionEnd.row + 2, 0), insertLine);
				if (selectedCount > 0) {
					editor.selection.moveCursorTo(selectionStart.row, selectionStart.column);
					editor.selection.selectTo(selectionStart.row, selectionStart.column + selectedCount);
				} else {
					firstLineEndCol = editor.session.doc.getLine(selectionStart.row).length > firstLineEndCol ? firstLineEndCol + 1 : firstLineEndCol;
					editor.selection.moveCursorTo(selectionStart.row, firstLineEndCol);
				}
			},
			multiSelectAction: "forEach",
			readOnly: true
		},
		{
			name: "invertSelection",
			description: "Invert selection",
			bindKey: bindKey(null, null),
			exec: function(editor) {
				var endRow = editor.session.doc.getLength() - 1;
				var endCol = editor.session.doc.getLine(endRow).length;
				var ranges = editor.selection.rangeList.ranges;
				var newRanges = [];
				if (ranges.length < 1) ranges = [editor.selection.getRange()];
				for (var i$1 = 0; i$1 < ranges.length; i$1++) {
					if (i$1 == ranges.length - 1) {
						if (!(ranges[i$1].end.row === endRow && ranges[i$1].end.column === endCol)) newRanges.push(new Range$1(ranges[i$1].end.row, ranges[i$1].end.column, endRow, endCol));
					}
					if (i$1 === 0) {
						if (!(ranges[i$1].start.row === 0 && ranges[i$1].start.column === 0)) newRanges.push(new Range$1(0, 0, ranges[i$1].start.row, ranges[i$1].start.column));
					} else newRanges.push(new Range$1(ranges[i$1 - 1].end.row, ranges[i$1 - 1].end.column, ranges[i$1].start.row, ranges[i$1].start.column));
				}
				editor.exitMultiSelectMode();
				editor.clearSelection();
				for (var i$1 = 0; i$1 < newRanges.length; i$1++) editor.selection.addRange(newRanges[i$1], false);
			},
			readOnly: true,
			scrollIntoView: "none"
		},
		{
			name: "addLineAfter",
			description: "Add new line after the current line",
			exec: function(editor) {
				editor.selection.clearSelection();
				editor.navigateLineEnd();
				editor.insert("\n");
			},
			multiSelectAction: "forEach",
			scrollIntoView: "cursor"
		},
		{
			name: "addLineBefore",
			description: "Add new line before the current line",
			exec: function(editor) {
				editor.selection.clearSelection();
				var cursor = editor.getCursorPosition();
				editor.selection.moveTo(cursor.row - 1, Number.MAX_VALUE);
				editor.insert("\n");
				if (cursor.row === 0) editor.navigateUp();
			},
			multiSelectAction: "forEach",
			scrollIntoView: "cursor"
		},
		{
			name: "openCommandPallete",
			exec: function(editor) {
				console.warn("This is an obsolete command. Please use `openCommandPalette` instead.");
				editor.prompt({ $type: "commands" });
			},
			readOnly: true
		},
		{
			name: "openCommandPalette",
			description: "Open command palette",
			bindKey: bindKey("F1", "F1"),
			exec: function(editor) {
				editor.prompt({ $type: "commands" });
			},
			readOnly: true
		},
		{
			name: "modeSelect",
			description: "Change language mode...",
			bindKey: bindKey(null, null),
			exec: function(editor) {
				editor.prompt({ $type: "modes" });
			},
			readOnly: true
		}
	];
	for (var i = 1; i < 9; i++) exports.commands.push({
		name: "foldToLevel" + i,
		description: "Fold To Level " + i,
		level: i,
		exec: function(editor) {
			editor.session.foldToLevel(this.level);
		},
		scrollIntoView: "center",
		readOnly: true
	});
}));
var require_gutter_handler = /* @__PURE__ */ __commonJSMin(((exports) => {
	var keys$1 = require_keys();
	var GutterKeyboardHandler$1 = class {
		constructor(editor) {
			this.editor = editor;
			this.gutterLayer = editor.renderer.$gutterLayer;
			this.element = editor.renderer.$gutter;
			this.lines = editor.renderer.$gutterLayer.$lines;
			this.activeRowIndex = null;
			this.activeLane = null;
			this.annotationTooltip = this.editor.$mouseHandler.$tooltip;
		}
		addListener() {
			this.element.addEventListener("keydown", this.$onGutterKeyDown.bind(this));
			this.element.addEventListener("focusout", this.$blurGutter.bind(this));
			this.editor.on("mousewheel", this.$blurGutter.bind(this));
		}
		removeListener() {
			this.element.removeEventListener("keydown", this.$onGutterKeyDown.bind(this));
			this.element.removeEventListener("focusout", this.$blurGutter.bind(this));
			this.editor.off("mousewheel", this.$blurGutter.bind(this));
		}
		$onGutterKeyDown(e) {
			if (this.annotationTooltip.isOpen) {
				e.preventDefault();
				if (e.keyCode === keys$1["escape"]) this.annotationTooltip.hide();
				return;
			}
			if (e.target === this.element) {
				if (e.keyCode != keys$1["enter"]) return;
				e.preventDefault();
				var row = this.editor.getCursorPosition().row;
				if (!this.editor.isRowVisible(row)) this.editor.scrollToLine(row, true, true);
				setTimeout(function() {
					var index = this.$rowToRowIndex(this.gutterLayer.$cursorCell.row);
					var nearestFoldLaneWidgetIndex = this.$findNearestFoldLaneWidget(index);
					var nearestAnnotationIndex = this.$findNearestAnnotation(index);
					if (nearestFoldLaneWidgetIndex === null && nearestAnnotationIndex === null) return;
					if (this.$findClosestNumber(nearestFoldLaneWidgetIndex, nearestAnnotationIndex, index) === nearestFoldLaneWidgetIndex) {
						this.activeLane = "fold";
						this.activeRowIndex = nearestFoldLaneWidgetIndex;
						if (this.$isCustomWidgetVisible(nearestFoldLaneWidgetIndex)) {
							this.$focusCustomWidget(this.activeRowIndex);
							return;
						} else {
							this.$focusFoldWidget(this.activeRowIndex);
							return;
						}
					} else {
						this.activeRowIndex = nearestAnnotationIndex;
						this.activeLane = "annotation";
						this.$focusAnnotation(this.activeRowIndex);
						return;
					}
				}.bind(this), 10);
				return;
			}
			this.$handleGutterKeyboardInteraction(e);
			setTimeout(function() {
				this.editor._signal("gutterkeydown", new GutterKeyboardEvent(e, this));
			}.bind(this), 10);
		}
		$handleGutterKeyboardInteraction(e) {
			if (e.keyCode === keys$1["tab"]) {
				e.preventDefault();
				return;
			}
			if (e.keyCode === keys$1["escape"]) {
				e.preventDefault();
				this.$blurGutter();
				this.element.focus();
				this.lane = null;
				return;
			}
			if (e.keyCode === keys$1["up"]) {
				e.preventDefault();
				switch (this.activeLane) {
					case "fold":
						this.$moveFoldWidgetUp();
						break;
					case "annotation":
						this.$moveAnnotationUp();
						break;
				}
				return;
			}
			if (e.keyCode === keys$1["down"]) {
				e.preventDefault();
				switch (this.activeLane) {
					case "fold":
						this.$moveFoldWidgetDown();
						break;
					case "annotation":
						this.$moveAnnotationDown();
						break;
				}
				return;
			}
			if (e.keyCode === keys$1["left"]) {
				e.preventDefault();
				this.$switchLane("annotation");
				return;
			}
			if (e.keyCode === keys$1["right"]) {
				e.preventDefault();
				this.$switchLane("fold");
				return;
			}
			if (e.keyCode === keys$1["enter"] || e.keyCode === keys$1["space"]) {
				e.preventDefault();
				switch (this.activeLane) {
					case "fold":
						var row = this.$rowIndexToRow(this.activeRowIndex);
						var customWidget = this.editor.session.$gutterCustomWidgets[row];
						if (customWidget) {
							if (customWidget.callbacks && customWidget.callbacks.onClick) customWidget.callbacks.onClick(e, row);
						} else if (this.gutterLayer.session.foldWidgets[row] === "start") {
							this.editor.session.onFoldWidgetClick(this.$rowIndexToRow(this.activeRowIndex), e);
							setTimeout(function() {
								if (this.$rowIndexToRow(this.activeRowIndex) !== row) {
									this.$blurFoldWidget(this.activeRowIndex);
									this.activeRowIndex = this.$rowToRowIndex(row);
									this.$focusFoldWidget(this.activeRowIndex);
								}
							}.bind(this), 10);
							break;
						} else if (this.gutterLayer.session.foldWidgets[this.$rowIndexToRow(this.activeRowIndex)] === "end") break;
						return;
					case "annotation":
						this.annotationTooltip.showTooltip(this.$rowIndexToRow(this.activeRowIndex));
						this.annotationTooltip.$fromKeyboard = true;
						break;
				}
				return;
			}
		}
		$blurGutter() {
			if (this.activeRowIndex !== null) switch (this.activeLane) {
				case "fold":
					this.$blurFoldWidget(this.activeRowIndex);
					this.$blurCustomWidget(this.activeRowIndex);
					break;
				case "annotation":
					this.$blurAnnotation(this.activeRowIndex);
					break;
			}
			if (this.annotationTooltip.isOpen) this.annotationTooltip.hide();
		}
		$isFoldWidgetVisible(index) {
			var isRowFullyVisible = this.editor.isRowFullyVisible(this.$rowIndexToRow(index));
			var isIconVisible = this.$getFoldWidget(index).style.display !== "none";
			return isRowFullyVisible && isIconVisible;
		}
		$isCustomWidgetVisible(index) {
			var isRowFullyVisible = this.editor.isRowFullyVisible(this.$rowIndexToRow(index));
			var isIconVisible = !!this.$getCustomWidget(index);
			return isRowFullyVisible && isIconVisible;
		}
		$isAnnotationVisible(index) {
			var isRowFullyVisible = this.editor.isRowFullyVisible(this.$rowIndexToRow(index));
			var isIconVisible = this.$getAnnotation(index).style.display !== "none";
			return isRowFullyVisible && isIconVisible;
		}
		$getFoldWidget(index) {
			return this.lines.get(index).element.childNodes[1];
		}
		$getCustomWidget(index) {
			return this.lines.get(index).element.childNodes[3];
		}
		$getAnnotation(index) {
			return this.lines.get(index).element.childNodes[2];
		}
		$findNearestFoldLaneWidget(index) {
			if (this.$isCustomWidgetVisible(index)) return index;
			if (this.$isFoldWidgetVisible(index)) return index;
			var i$1 = 0;
			while (index - i$1 > 0 || index + i$1 < this.lines.getLength() - 1) {
				i$1++;
				if (index - i$1 >= 0 && this.$isCustomWidgetVisible(index - i$1)) return index - i$1;
				if (index + i$1 <= this.lines.getLength() - 1 && this.$isCustomWidgetVisible(index + i$1)) return index + i$1;
				if (index - i$1 >= 0 && this.$isFoldWidgetVisible(index - i$1)) return index - i$1;
				if (index + i$1 <= this.lines.getLength() - 1 && this.$isFoldWidgetVisible(index + i$1)) return index + i$1;
			}
			return null;
		}
		$findNearestAnnotation(index) {
			if (this.$isAnnotationVisible(index)) return index;
			var i$1 = 0;
			while (index - i$1 > 0 || index + i$1 < this.lines.getLength() - 1) {
				i$1++;
				if (index - i$1 >= 0 && this.$isAnnotationVisible(index - i$1)) return index - i$1;
				if (index + i$1 <= this.lines.getLength() - 1 && this.$isAnnotationVisible(index + i$1)) return index + i$1;
			}
			return null;
		}
		$focusFoldWidget(index) {
			if (index == null) return;
			var foldWidget = this.$getFoldWidget(index);
			foldWidget.classList.add(this.editor.renderer.keyboardFocusClassName);
			foldWidget.focus();
		}
		$focusCustomWidget(index) {
			if (index == null) return;
			var customWidget = this.$getCustomWidget(index);
			if (customWidget) {
				customWidget.classList.add(this.editor.renderer.keyboardFocusClassName);
				customWidget.focus();
			}
		}
		$focusAnnotation(index) {
			if (index == null) return;
			var annotation = this.$getAnnotation(index);
			annotation.classList.add(this.editor.renderer.keyboardFocusClassName);
			annotation.focus();
		}
		$blurFoldWidget(index) {
			var foldWidget = this.$getFoldWidget(index);
			foldWidget.classList.remove(this.editor.renderer.keyboardFocusClassName);
			foldWidget.blur();
		}
		$blurCustomWidget(index) {
			var customWidget = this.$getCustomWidget(index);
			if (customWidget) {
				customWidget.classList.remove(this.editor.renderer.keyboardFocusClassName);
				customWidget.blur();
			}
		}
		$blurAnnotation(index) {
			var annotation = this.$getAnnotation(index);
			annotation.classList.remove(this.editor.renderer.keyboardFocusClassName);
			annotation.blur();
		}
		$moveFoldWidgetUp() {
			var index = this.activeRowIndex;
			while (index > 0) {
				index--;
				if (this.$isFoldWidgetVisible(index) || this.$isCustomWidgetVisible(index)) {
					this.$blurFoldWidget(this.activeRowIndex);
					this.$blurCustomWidget(this.activeRowIndex);
					this.activeRowIndex = index;
					if (this.$isFoldWidgetVisible(index)) this.$focusFoldWidget(this.activeRowIndex);
					else this.$focusCustomWidget(this.activeRowIndex);
					return;
				}
			}
		}
		$moveFoldWidgetDown() {
			var index = this.activeRowIndex;
			while (index < this.lines.getLength() - 1) {
				index++;
				if (this.$isFoldWidgetVisible(index) || this.$isCustomWidgetVisible(index)) {
					this.$blurFoldWidget(this.activeRowIndex);
					this.$blurCustomWidget(this.activeRowIndex);
					this.activeRowIndex = index;
					if (this.$isFoldWidgetVisible(index)) this.$focusFoldWidget(this.activeRowIndex);
					else this.$focusCustomWidget(this.activeRowIndex);
					return;
				}
			}
		}
		$moveAnnotationUp() {
			var index = this.activeRowIndex;
			while (index > 0) {
				index--;
				if (this.$isAnnotationVisible(index)) {
					this.$blurAnnotation(this.activeRowIndex);
					this.activeRowIndex = index;
					this.$focusAnnotation(this.activeRowIndex);
					return;
				}
			}
		}
		$moveAnnotationDown() {
			var index = this.activeRowIndex;
			while (index < this.lines.getLength() - 1) {
				index++;
				if (this.$isAnnotationVisible(index)) {
					this.$blurAnnotation(this.activeRowIndex);
					this.activeRowIndex = index;
					this.$focusAnnotation(this.activeRowIndex);
					return;
				}
			}
		}
		$findClosestNumber(num1, num2, target) {
			if (num1 === null) return num2;
			if (num2 === null) return num1;
			return Math.abs(target - num1) <= Math.abs(target - num2) ? num1 : num2;
		}
		$switchLane(desinationLane) {
			switch (desinationLane) {
				case "annotation":
					if (this.activeLane === "annotation") break;
					var annotationIndex = this.$findNearestAnnotation(this.activeRowIndex);
					if (annotationIndex == null) break;
					this.activeLane = "annotation";
					this.$blurFoldWidget(this.activeRowIndex);
					this.$blurCustomWidget(this.activeRowIndex);
					this.activeRowIndex = annotationIndex;
					this.$focusAnnotation(this.activeRowIndex);
					break;
				case "fold":
					if (this.activeLane === "fold") break;
					var foldLaneWidgetIndex = this.$findNearestFoldLaneWidget(this.activeRowIndex);
					if (foldLaneWidgetIndex === null) break;
					this.activeLane = "fold";
					this.$blurAnnotation(this.activeRowIndex);
					this.activeRowIndex = foldLaneWidgetIndex;
					if (this.$isCustomWidgetVisible(foldLaneWidgetIndex)) this.$focusCustomWidget(this.activeRowIndex);
					else this.$focusFoldWidget(this.activeRowIndex);
					break;
			}
		}
		$rowIndexToRow(index) {
			var cell = this.lines.get(index);
			if (cell) return cell.row;
			return null;
		}
		$rowToRowIndex(row) {
			for (var i$1 = 0; i$1 < this.lines.getLength(); i$1++) if (this.lines.get(i$1).row == row) return i$1;
			return null;
		}
	};
	exports.GutterKeyboardHandler = GutterKeyboardHandler$1;
	var GutterKeyboardEvent = class {
		constructor(domEvent, gutterKeyboardHandler) {
			this.gutterKeyboardHandler = gutterKeyboardHandler;
			this.domEvent = domEvent;
		}
		getKey() {
			return keys$1.keyCodeToString(this.domEvent.keyCode);
		}
		getRow() {
			return this.gutterKeyboardHandler.$rowIndexToRow(this.gutterKeyboardHandler.activeRowIndex);
		}
		isInAnnotationLane() {
			return this.gutterKeyboardHandler.activeLane === "annotation";
		}
		isInFoldLane() {
			return this.gutterKeyboardHandler.activeLane === "fold";
		}
	};
	exports.GutterKeyboardEvent = GutterKeyboardEvent;
}));
var require_editor = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var dom = require_dom();
	var lang = require_lang();
	var useragent = require_useragent();
	var TextInput = require_textinput().TextInput;
	var MouseHandler = require_mouse_handler().MouseHandler;
	var FoldHandler = require_fold_handler().FoldHandler;
	var KeyBinding = require_keybinding().KeyBinding;
	var EditSession = require_edit_session().EditSession;
	var Search = require_search().Search;
	var Range = require_range().Range;
	var EventEmitter = require_event_emitter().EventEmitter;
	var CommandManager = require_command_manager().CommandManager;
	var defaultCommands = require_default_commands().commands;
	var config = require_config();
	var TokenIterator = require_token_iterator().TokenIterator;
	var GutterKeyboardHandler = require_gutter_handler().GutterKeyboardHandler;
	var nls = require_config().nls;
	var clipboard = require_clipboard();
	var keys = require_keys();
	var event = require_event();
	var HoverTooltip = require_tooltip().HoverTooltip;
	var Editor = class Editor {
		constructor(renderer, session, options) {
			this.id = "editor" + ++Editor.$uid;
			this.session;
			this.$toDestroy = [];
			this.container = renderer.getContainerElement();
			this.renderer = renderer;
			this.commands = new CommandManager(useragent.isMac ? "mac" : "win", defaultCommands);
			if (typeof document == "object") {
				this.textInput = new TextInput(renderer.getTextAreaContainer(), this);
				this.renderer.textarea = this.textInput.getElement();
				this.$mouseHandler = new MouseHandler(this);
				new FoldHandler(this);
			}
			this.keyBinding = new KeyBinding(this);
			this.$search = new Search().set({ wrap: true });
			this.$historyTracker = this.$historyTracker.bind(this);
			this.commands.on("exec", this.$historyTracker);
			this.$initOperationListeners();
			this._$emitInputEvent = lang.delayedCall(function() {
				this._signal("input", {});
				if (this.session && !this.session.destroyed) this.session.bgTokenizer.scheduleStart();
			}.bind(this));
			this.on("change", function(_, _self) {
				_self._$emitInputEvent.schedule(31);
			});
			this.setSession(session || options && options.session || new EditSession(""));
			config.resetOptions(this);
			if (options) this.setOptions(options);
			config._signal("editor", this);
		}
		$initOperationListeners() {
			this.commands.on("exec", this.startOperation.bind(this), true);
			this.commands.on("afterExec", this.endOperation.bind(this), true);
		}
		startOperation(commandEvent) {
			this.session.startOperation(commandEvent);
		}
		endOperation(e) {
			this.session.endOperation(e);
		}
		onStartOperation(commandEvent) {
			this.curOp = this.session.curOp;
			this.curOp.scrollTop = this.renderer.scrollTop;
			this.prevOp = this.session.prevOp;
			if (!commandEvent) this.previousCommand = null;
		}
		onEndOperation(e) {
			if (this.curOp && this.session) {
				if (e && e.returnValue === false) {
					this.curOp = null;
					return;
				}
				this._signal("beforeEndOperation");
				if (!this.curOp) return;
				var command = this.curOp.command;
				var scrollIntoView = command && command.scrollIntoView;
				if (scrollIntoView) {
					switch (scrollIntoView) {
						case "center-animate": scrollIntoView = "animate";
						case "center":
							this.renderer.scrollCursorIntoView(null, .5);
							break;
						case "animate":
						case "cursor":
							this.renderer.scrollCursorIntoView();
							break;
						case "selectionPart":
							var range = this.selection.getRange();
							var config$3 = this.renderer.layerConfig;
							if (range.start.row >= config$3.lastRow || range.end.row <= config$3.firstRow) this.renderer.scrollSelectionIntoView(this.selection.anchor, this.selection.lead);
							break;
						default: break;
					}
					if (scrollIntoView == "animate") this.renderer.animateScrolling(this.curOp.scrollTop);
				}
				this.$lastSel = this.session.selection.toJSON();
				this.prevOp = this.curOp;
				this.curOp = null;
			}
		}
		$historyTracker(e) {
			if (!this.$mergeUndoDeltas) return;
			var prev = this.prevOp;
			var mergeableCommands = this.$mergeableCommands;
			var shouldMerge = prev.command && e.command.name == prev.command.name;
			if (e.command.name == "insertstring") {
				var text = e.args;
				if (this.mergeNextCommand === void 0) this.mergeNextCommand = true;
				shouldMerge = shouldMerge && this.mergeNextCommand && (!/\s/.test(text) || /\s/.test(prev.args));
				this.mergeNextCommand = true;
			} else shouldMerge = shouldMerge && mergeableCommands.indexOf(e.command.name) !== -1;
			if (this.$mergeUndoDeltas != "always" && Date.now() - this.sequenceStartTime > 2e3) shouldMerge = false;
			if (shouldMerge) this.session.mergeUndoDeltas = true;
			else if (mergeableCommands.indexOf(e.command.name) !== -1) this.sequenceStartTime = Date.now();
		}
		setKeyboardHandler(keyboardHandler, cb) {
			if (keyboardHandler && typeof keyboardHandler === "string" && keyboardHandler != "ace") {
				this.$keybindingId = keyboardHandler;
				var _self = this;
				config.loadModule(["keybinding", keyboardHandler], function(module$1) {
					if (_self.$keybindingId == keyboardHandler) _self.keyBinding.setKeyboardHandler(module$1 && module$1.handler);
					cb && cb();
				});
			} else {
				this.$keybindingId = null;
				this.keyBinding.setKeyboardHandler(keyboardHandler);
				cb && cb();
			}
		}
		getKeyboardHandler() {
			return this.keyBinding.getKeyboardHandler();
		}
		setSession(session) {
			if (this.session == session) return;
			if (this.curOp) this.endOperation();
			this.curOp = {};
			var oldSession = this.session;
			if (oldSession) {
				this.session.off("change", this.$onDocumentChange);
				this.session.off("changeMode", this.$onChangeMode);
				this.session.off("tokenizerUpdate", this.$onTokenizerUpdate);
				this.session.off("changeTabSize", this.$onChangeTabSize);
				this.session.off("changeWrapLimit", this.$onChangeWrapLimit);
				this.session.off("changeWrapMode", this.$onChangeWrapMode);
				this.session.off("changeFold", this.$onChangeFold);
				this.session.off("changeFrontMarker", this.$onChangeFrontMarker);
				this.session.off("changeBackMarker", this.$onChangeBackMarker);
				this.session.off("changeBreakpoint", this.$onChangeBreakpoint);
				this.session.off("changeAnnotation", this.$onChangeAnnotation);
				this.session.off("changeOverwrite", this.$onCursorChange);
				this.session.off("changeScrollTop", this.$onScrollTopChange);
				this.session.off("changeScrollLeft", this.$onScrollLeftChange);
				this.session.off("startOperation", this.$onStartOperation);
				this.session.off("endOperation", this.$onEndOperation);
				var selection = this.session.getSelection();
				selection.off("changeCursor", this.$onCursorChange);
				selection.off("changeSelection", this.$onSelectionChange);
			}
			this.session = session;
			if (session) {
				this.$onDocumentChange = this.onDocumentChange.bind(this);
				session.on("change", this.$onDocumentChange);
				this.renderer.setSession(session);
				this.$onChangeMode = this.onChangeMode.bind(this);
				session.on("changeMode", this.$onChangeMode);
				this.$onTokenizerUpdate = this.onTokenizerUpdate.bind(this);
				session.on("tokenizerUpdate", this.$onTokenizerUpdate);
				this.$onChangeTabSize = this.renderer.onChangeTabSize.bind(this.renderer);
				session.on("changeTabSize", this.$onChangeTabSize);
				this.$onChangeWrapLimit = this.onChangeWrapLimit.bind(this);
				session.on("changeWrapLimit", this.$onChangeWrapLimit);
				this.$onChangeWrapMode = this.onChangeWrapMode.bind(this);
				session.on("changeWrapMode", this.$onChangeWrapMode);
				this.$onChangeFold = this.onChangeFold.bind(this);
				session.on("changeFold", this.$onChangeFold);
				this.$onChangeFrontMarker = this.onChangeFrontMarker.bind(this);
				this.session.on("changeFrontMarker", this.$onChangeFrontMarker);
				this.$onChangeBackMarker = this.onChangeBackMarker.bind(this);
				this.session.on("changeBackMarker", this.$onChangeBackMarker);
				this.$onChangeBreakpoint = this.onChangeBreakpoint.bind(this);
				this.session.on("changeBreakpoint", this.$onChangeBreakpoint);
				this.$onChangeAnnotation = this.onChangeAnnotation.bind(this);
				this.session.on("changeAnnotation", this.$onChangeAnnotation);
				this.$onCursorChange = this.onCursorChange.bind(this);
				this.session.on("changeOverwrite", this.$onCursorChange);
				this.$onScrollTopChange = this.onScrollTopChange.bind(this);
				this.session.on("changeScrollTop", this.$onScrollTopChange);
				this.$onScrollLeftChange = this.onScrollLeftChange.bind(this);
				this.session.on("changeScrollLeft", this.$onScrollLeftChange);
				this.selection = session.getSelection();
				this.selection.on("changeCursor", this.$onCursorChange);
				this.$onSelectionChange = this.onSelectionChange.bind(this);
				this.selection.on("changeSelection", this.$onSelectionChange);
				this.$onStartOperation = this.onStartOperation.bind(this);
				this.session.on("startOperation", this.$onStartOperation);
				this.$onEndOperation = this.onEndOperation.bind(this);
				this.session.on("endOperation", this.$onEndOperation);
				this.onChangeMode();
				this.onCursorChange();
				this.onScrollTopChange();
				this.onScrollLeftChange();
				this.onSelectionChange();
				this.onChangeFrontMarker();
				this.onChangeBackMarker();
				this.onChangeBreakpoint();
				this.onChangeAnnotation();
				this.session.getUseWrapMode() && this.renderer.adjustWrapLimit();
				this.renderer.updateFull();
			} else {
				this.selection = null;
				this.renderer.setSession(session);
			}
			this._signal("changeSession", {
				session,
				oldSession
			});
			this.curOp = null;
			oldSession && oldSession._signal("changeEditor", { oldEditor: this });
			if (oldSession) oldSession.$editor = null;
			session && session._signal("changeEditor", { editor: this });
			if (session) session.$editor = this;
			if (session && !session.destroyed) session.bgTokenizer.scheduleStart();
		}
		getSession() {
			return this.session;
		}
		setValue(val, cursorPos) {
			this.session.doc.setValue(val);
			if (!cursorPos) this.selectAll();
			else if (cursorPos == 1) this.navigateFileEnd();
			else if (cursorPos == -1) this.navigateFileStart();
			return val;
		}
		getValue() {
			return this.session.getValue();
		}
		getSelection() {
			return this.selection;
		}
		resize(force) {
			this.renderer.onResize(force);
		}
		setTheme(theme, cb) {
			this.renderer.setTheme(theme, cb);
		}
		getTheme() {
			return this.renderer.getTheme();
		}
		setStyle(style, incluude) {
			this.renderer.setStyle(style, incluude);
		}
		unsetStyle(style) {
			this.renderer.unsetStyle(style);
		}
		getFontSize() {
			return this.getOption("fontSize") || dom.computedStyle(this.container).fontSize;
		}
		setFontSize(size) {
			this.setOption("fontSize", size);
		}
		$highlightBrackets() {
			if (this.$highlightPending) return;
			var self = this;
			this.$highlightPending = true;
			setTimeout(function() {
				self.$highlightPending = false;
				var session = self.session;
				if (!session || session.destroyed) return;
				if (session.$bracketHighlight) {
					session.$bracketHighlight.markerIds.forEach(function(id) {
						session.removeMarker(id);
					});
					session.$bracketHighlight = null;
				}
				var pos = self.getCursorPosition();
				var handler = self.getKeyboardHandler();
				var isBackwards = handler && handler.$getDirectionForHighlight && handler.$getDirectionForHighlight(self);
				var ranges = session.getMatchingBracketRanges(pos, isBackwards);
				if (!ranges) {
					var token = new TokenIterator(session, pos.row, pos.column).getCurrentToken();
					if (token && /\b(?:tag-open|tag-name)/.test(token.type)) {
						var tagNamesRanges = session.getMatchingTags(pos);
						if (tagNamesRanges) ranges = [tagNamesRanges.openTagName.isEmpty() ? tagNamesRanges.openTag : tagNamesRanges.openTagName, tagNamesRanges.closeTagName.isEmpty() ? tagNamesRanges.closeTag : tagNamesRanges.closeTagName];
					}
				}
				if (!ranges && session.$mode.getMatching) ranges = session.$mode.getMatching(self.session);
				if (!ranges) {
					if (self.getHighlightIndentGuides()) self.renderer.$textLayer.$highlightIndentGuide();
					return;
				}
				var markerType = "ace_bracket";
				if (!Array.isArray(ranges)) ranges = [ranges];
				else if (ranges.length == 1) markerType = "ace_error_bracket";
				if (ranges.length == 2) {
					if (Range.comparePoints(ranges[0].end, ranges[1].start) == 0) ranges = [Range.fromPoints(ranges[0].start, ranges[1].end)];
					else if (Range.comparePoints(ranges[0].start, ranges[1].end) == 0) ranges = [Range.fromPoints(ranges[1].start, ranges[0].end)];
				}
				session.$bracketHighlight = {
					ranges,
					markerIds: ranges.map(function(range) {
						return session.addMarker(range, markerType, "text");
					})
				};
				if (self.getHighlightIndentGuides()) self.renderer.$textLayer.$highlightIndentGuide();
			}, 50);
		}
		focus() {
			this.textInput.focus();
		}
		isFocused() {
			return this.textInput.isFocused();
		}
		blur() {
			this.textInput.blur();
		}
		onFocus(e) {
			if (this.$isFocused) return;
			this.$isFocused = true;
			this.renderer.showCursor();
			this.renderer.visualizeFocus();
			this._emit("focus", e);
		}
		onBlur(e) {
			if (!this.$isFocused) return;
			this.$isFocused = false;
			this.renderer.hideCursor();
			this.renderer.visualizeBlur();
			this._emit("blur", e);
		}
		$cursorChange() {
			this.renderer.updateCursor();
			this.$highlightBrackets();
			this.$updateHighlightActiveLine();
		}
		onDocumentChange(delta) {
			var wrap = this.session.$useWrapMode;
			var lastRow = delta.start.row == delta.end.row ? delta.end.row : Infinity;
			this.renderer.updateLines(delta.start.row, lastRow, wrap);
			this._signal("change", delta);
			this.$cursorChange();
		}
		onTokenizerUpdate(e) {
			var rows = e.data;
			this.renderer.updateLines(rows.first, rows.last);
		}
		onScrollTopChange() {
			this.renderer.scrollToY(this.session.getScrollTop());
		}
		onScrollLeftChange() {
			this.renderer.scrollToX(this.session.getScrollLeft());
		}
		onCursorChange() {
			this.$cursorChange();
			this._signal("changeSelection");
		}
		$updateHighlightActiveLine() {
			var session = this.getSession();
			var highlight;
			if (this.$highlightActiveLine) {
				if (this.$selectionStyle != "line" || !this.selection.isMultiLine()) highlight = this.getCursorPosition();
				if (this.renderer.theme && this.renderer.theme.$selectionColorConflict && !this.selection.isEmpty()) highlight = false;
				if (this.renderer.$maxLines && this.session.getLength() === 1 && !(this.renderer.$minLines > 1)) highlight = false;
			}
			if (session.$highlightLineMarker && !highlight) {
				session.removeMarker(session.$highlightLineMarker.id);
				session.$highlightLineMarker = null;
			} else if (!session.$highlightLineMarker && highlight) {
				var range = new Range(highlight.row, highlight.column, highlight.row, Infinity);
				range.id = session.addMarker(range, "ace_active-line", "screenLine");
				session.$highlightLineMarker = range;
			} else if (highlight) {
				session.$highlightLineMarker.start.row = highlight.row;
				session.$highlightLineMarker.end.row = highlight.row;
				session.$highlightLineMarker.start.column = highlight.column;
				session._signal("changeBackMarker");
			}
		}
		onSelectionChange(e) {
			var session = this.session;
			if (session.$selectionMarker) session.removeMarker(session.$selectionMarker);
			session.$selectionMarker = null;
			if (!this.selection.isEmpty()) {
				var range = this.selection.getRange();
				var style = this.getSelectionStyle();
				session.$selectionMarker = session.addMarker(range, "ace_selection", style);
			} else this.$updateHighlightActiveLine();
			var re = this.$highlightSelectedWord && this.$getSelectionHighLightRegexp();
			this.session.highlight(re);
			this._signal("changeSelection");
		}
		$getSelectionHighLightRegexp() {
			var session = this.session;
			var selection = this.getSelectionRange();
			if (selection.isEmpty() || selection.isMultiLine()) return;
			var startColumn = selection.start.column;
			var endColumn = selection.end.column;
			var line = session.getLine(selection.start.row);
			var needle = line.substring(startColumn, endColumn);
			if (needle.length > 5e3 || !/[\w\d]/.test(needle)) return;
			var re = this.$search.$assembleRegExp({
				wholeWord: true,
				caseSensitive: true,
				needle
			});
			var wordWithBoundary = line.substring(startColumn - 1, endColumn + 1);
			if (!re.test(wordWithBoundary)) return;
			return re;
		}
		onChangeFrontMarker() {
			this.renderer.updateFrontMarkers();
		}
		onChangeBackMarker() {
			this.renderer.updateBackMarkers();
		}
		onChangeBreakpoint() {
			this.renderer.updateBreakpoints();
		}
		onChangeAnnotation() {
			this.renderer.setAnnotations(this.session.getAnnotations());
		}
		onChangeMode(e) {
			this.renderer.updateText();
			this._emit("changeMode", e);
		}
		onChangeWrapLimit() {
			this.renderer.updateFull();
		}
		onChangeWrapMode() {
			this.renderer.onResize(true);
		}
		onChangeFold() {
			this.$updateHighlightActiveLine();
			this.renderer.updateFull();
		}
		getSelectedText() {
			return this.session.getTextRange(this.getSelectionRange());
		}
		getCopyText() {
			var text = this.getSelectedText();
			var nl = this.session.doc.getNewLineCharacter();
			var copyLine = false;
			if (!text && this.$copyWithEmptySelection) {
				copyLine = true;
				var ranges = this.selection.getAllRanges();
				for (var i$1 = 0; i$1 < ranges.length; i$1++) {
					var range = ranges[i$1];
					if (i$1 && ranges[i$1 - 1].start.row == range.start.row) continue;
					text += this.session.getLine(range.start.row) + nl;
				}
			}
			var e = { text };
			this._signal("copy", e);
			clipboard.lineMode = copyLine ? e.text : false;
			return e.text;
		}
		onCopy() {
			this.commands.exec("copy", this);
		}
		onCut() {
			this.commands.exec("cut", this);
		}
		onPaste(text, event$6) {
			var e = {
				text,
				event: event$6
			};
			this.commands.exec("paste", this, e);
		}
		$handlePaste(e) {
			if (typeof e == "string") e = { text: e };
			this._signal("paste", e);
			var text = e.text;
			var lineMode = text === clipboard.lineMode;
			var session = this.session;
			if (!this.inMultiSelectMode || this.inVirtualSelectionMode) if (lineMode) session.insert({
				row: this.selection.lead.row,
				column: 0
			}, text);
			else this.insert(text);
			else if (lineMode) this.selection.rangeList.ranges.forEach(function(range$1) {
				session.insert({
					row: range$1.start.row,
					column: 0
				}, text);
			});
			else {
				var lines = text.split(/\r\n|\r|\n/);
				var ranges = this.selection.rangeList.ranges;
				var isFullLine = lines.length == 2 && (!lines[0] || !lines[1]);
				if (lines.length != ranges.length || isFullLine) return this.commands.exec("insertstring", this, text);
				for (var i$1 = ranges.length; i$1--;) {
					var range = ranges[i$1];
					if (!range.isEmpty()) session.remove(range);
					session.insert(range.start, lines[i$1]);
				}
			}
		}
		execCommand(command, args) {
			return this.commands.exec(command, this, args);
		}
		insert(text, pasted) {
			var session = this.session;
			var mode = session.getMode();
			var cursor = this.getCursorPosition();
			if (this.getBehavioursEnabled() && !pasted) {
				var transform = mode.transformAction(session.getState(cursor.row), "insertion", this, session, text);
				if (transform) {
					if (text !== transform.text) {
						if (!this.inVirtualSelectionMode) {
							this.session.mergeUndoDeltas = false;
							this.mergeNextCommand = false;
						}
					}
					text = transform.text;
				}
			}
			if (text == "	") text = this.session.getTabString();
			if (!this.selection.isEmpty()) {
				var range = this.getSelectionRange();
				cursor = this.session.remove(range);
				this.clearSelection();
			} else if (this.session.getOverwrite() && text.indexOf("\n") == -1) {
				var range = Range.fromPoints(cursor, cursor);
				range.end.column += text.length;
				this.session.remove(range);
			}
			if (text == "\n" || text == "\r\n") {
				var line = session.getLine(cursor.row);
				if (cursor.column > line.search(/\S|$/)) {
					var d = line.substr(cursor.column).search(/\S|$/);
					session.doc.removeInLine(cursor.row, cursor.column, cursor.column + d);
				}
			}
			this.clearSelection();
			var start = cursor.column;
			var lineState = session.getState(cursor.row);
			var line = session.getLine(cursor.row);
			var shouldOutdent = mode.checkOutdent(lineState, line, text);
			session.insert(cursor, text);
			if (transform && transform.selection) if (transform.selection.length == 2) this.selection.setSelectionRange(new Range(cursor.row, start + transform.selection[0], cursor.row, start + transform.selection[1]));
			else this.selection.setSelectionRange(new Range(cursor.row + transform.selection[0], transform.selection[1], cursor.row + transform.selection[2], transform.selection[3]));
			if (this.$enableAutoIndent) {
				if (session.getDocument().isNewLine(text)) {
					var lineIndent = mode.getNextLineIndent(lineState, line.slice(0, cursor.column), session.getTabString());
					session.insert({
						row: cursor.row + 1,
						column: 0
					}, lineIndent);
				}
				if (shouldOutdent) mode.autoOutdent(lineState, session, cursor.row);
			}
		}
		autoIndent() {
			var session = this.session;
			var mode = session.getMode();
			var ranges = this.selection.isEmpty() ? [new Range(0, 0, session.doc.getLength() - 1, 0)] : this.selection.getAllRanges();
			var prevLineState = "";
			var prevLine = "";
			var lineIndent = "";
			var tab = session.getTabString();
			for (var i$1 = 0; i$1 < ranges.length; i$1++) {
				var startRow = ranges[i$1].start.row;
				var endRow = ranges[i$1].end.row;
				for (var row = startRow; row <= endRow; row++) {
					if (row > 0) {
						prevLineState = session.getState(row - 1);
						prevLine = session.getLine(row - 1);
						lineIndent = mode.getNextLineIndent(prevLineState, prevLine, tab);
					}
					var line = session.getLine(row);
					var currIndent = mode.$getIndent(line);
					if (lineIndent !== currIndent) {
						if (currIndent.length > 0) {
							var range = new Range(row, 0, row, currIndent.length);
							session.remove(range);
						}
						if (lineIndent.length > 0) session.insert({
							row,
							column: 0
						}, lineIndent);
					}
					mode.autoOutdent(prevLineState, session, row);
				}
			}
		}
		onTextInput(text, composition) {
			if (!composition) return this.keyBinding.onTextInput(text);
			this.startOperation({ command: { name: "insertstring" } });
			var applyComposition = this.applyComposition.bind(this, text, composition);
			if (this.selection.rangeCount) this.forEachSelection(applyComposition);
			else applyComposition();
			this.endOperation();
		}
		applyComposition(text, composition) {
			if (composition.extendLeft || composition.extendRight) {
				var r = this.selection.getRange();
				r.start.column -= composition.extendLeft;
				r.end.column += composition.extendRight;
				if (r.start.column < 0) {
					r.start.row--;
					r.start.column += this.session.getLine(r.start.row).length + 1;
				}
				this.selection.setRange(r);
				if (!text && !r.isEmpty()) this.remove();
			}
			if (text || !this.selection.isEmpty()) this.insert(text, true);
			if (composition.restoreStart || composition.restoreEnd) {
				var r = this.selection.getRange();
				r.start.column -= composition.restoreStart;
				r.end.column -= composition.restoreEnd;
				this.selection.setRange(r);
			}
		}
		onCommandKey(e, hashId, keyCode) {
			return this.keyBinding.onCommandKey(e, hashId, keyCode);
		}
		setOverwrite(overwrite) {
			this.session.setOverwrite(overwrite);
		}
		getOverwrite() {
			return this.session.getOverwrite();
		}
		toggleOverwrite() {
			this.session.toggleOverwrite();
		}
		setScrollSpeed(speed) {
			this.setOption("scrollSpeed", speed);
		}
		getScrollSpeed() {
			return this.getOption("scrollSpeed");
		}
		setDragDelay(dragDelay) {
			this.setOption("dragDelay", dragDelay);
		}
		getDragDelay() {
			return this.getOption("dragDelay");
		}
		setSelectionStyle(val) {
			this.setOption("selectionStyle", val);
		}
		getSelectionStyle() {
			return this.getOption("selectionStyle");
		}
		setHighlightActiveLine(shouldHighlight) {
			this.setOption("highlightActiveLine", shouldHighlight);
		}
		getHighlightActiveLine() {
			return this.getOption("highlightActiveLine");
		}
		setHighlightGutterLine(shouldHighlight) {
			this.setOption("highlightGutterLine", shouldHighlight);
		}
		getHighlightGutterLine() {
			return this.getOption("highlightGutterLine");
		}
		setHighlightSelectedWord(shouldHighlight) {
			this.setOption("highlightSelectedWord", shouldHighlight);
		}
		getHighlightSelectedWord() {
			return this.$highlightSelectedWord;
		}
		setAnimatedScroll(shouldAnimate) {
			this.renderer.setAnimatedScroll(shouldAnimate);
		}
		getAnimatedScroll() {
			return this.renderer.getAnimatedScroll();
		}
		setShowInvisibles(showInvisibles) {
			this.renderer.setShowInvisibles(showInvisibles);
		}
		getShowInvisibles() {
			return this.renderer.getShowInvisibles();
		}
		setDisplayIndentGuides(display) {
			this.renderer.setDisplayIndentGuides(display);
		}
		getDisplayIndentGuides() {
			return this.renderer.getDisplayIndentGuides();
		}
		setHighlightIndentGuides(highlight) {
			this.renderer.setHighlightIndentGuides(highlight);
		}
		getHighlightIndentGuides() {
			return this.renderer.getHighlightIndentGuides();
		}
		setShowPrintMargin(showPrintMargin) {
			this.renderer.setShowPrintMargin(showPrintMargin);
		}
		getShowPrintMargin() {
			return this.renderer.getShowPrintMargin();
		}
		setPrintMarginColumn(showPrintMargin) {
			this.renderer.setPrintMarginColumn(showPrintMargin);
		}
		getPrintMarginColumn() {
			return this.renderer.getPrintMarginColumn();
		}
		setReadOnly(readOnly) {
			this.setOption("readOnly", readOnly);
		}
		getReadOnly() {
			return this.getOption("readOnly");
		}
		setBehavioursEnabled(enabled) {
			this.setOption("behavioursEnabled", enabled);
		}
		getBehavioursEnabled() {
			return this.getOption("behavioursEnabled");
		}
		setWrapBehavioursEnabled(enabled) {
			this.setOption("wrapBehavioursEnabled", enabled);
		}
		getWrapBehavioursEnabled() {
			return this.getOption("wrapBehavioursEnabled");
		}
		setShowFoldWidgets(show) {
			this.setOption("showFoldWidgets", show);
		}
		getShowFoldWidgets() {
			return this.getOption("showFoldWidgets");
		}
		setFadeFoldWidgets(fade) {
			this.setOption("fadeFoldWidgets", fade);
		}
		getFadeFoldWidgets() {
			return this.getOption("fadeFoldWidgets");
		}
		remove(dir) {
			if (this.selection.isEmpty()) if (dir == "left") this.selection.selectLeft();
			else this.selection.selectRight();
			var range = this.getSelectionRange();
			if (this.getBehavioursEnabled()) {
				var session = this.session;
				var state = session.getState(range.start.row);
				var new_range = session.getMode().transformAction(state, "deletion", this, session, range);
				if (range.end.column === 0) {
					var text = session.getTextRange(range);
					if (text[text.length - 1] == "\n") {
						var line = session.getLine(range.end.row);
						if (/^\s+$/.test(line)) range.end.column = line.length;
					}
				}
				if (new_range) range = new_range;
			}
			this.session.remove(range);
			this.clearSelection();
		}
		removeWordRight() {
			if (this.selection.isEmpty()) this.selection.selectWordRight();
			this.session.remove(this.getSelectionRange());
			this.clearSelection();
		}
		removeWordLeft() {
			if (this.selection.isEmpty()) this.selection.selectWordLeft();
			this.session.remove(this.getSelectionRange());
			this.clearSelection();
		}
		removeToLineStart() {
			if (this.selection.isEmpty()) this.selection.selectLineStart();
			if (this.selection.isEmpty()) this.selection.selectLeft();
			this.session.remove(this.getSelectionRange());
			this.clearSelection();
		}
		removeToLineEnd() {
			if (this.selection.isEmpty()) this.selection.selectLineEnd();
			var range = this.getSelectionRange();
			if (range.start.column == range.end.column && range.start.row == range.end.row) {
				range.end.column = 0;
				range.end.row++;
			}
			this.session.remove(range);
			this.clearSelection();
		}
		splitLine() {
			if (!this.selection.isEmpty()) {
				this.session.remove(this.getSelectionRange());
				this.clearSelection();
			}
			var cursor = this.getCursorPosition();
			this.insert("\n");
			this.moveCursorToPosition(cursor);
		}
		setGhostText(text, position) {
			this.renderer.setGhostText(text, position);
		}
		removeGhostText() {
			this.renderer.removeGhostText();
		}
		transposeLetters() {
			if (!this.selection.isEmpty()) return;
			var cursor = this.getCursorPosition();
			var column = cursor.column;
			if (column === 0) return;
			var line = this.session.getLine(cursor.row);
			var swap, range;
			if (column < line.length) {
				swap = line.charAt(column) + line.charAt(column - 1);
				range = new Range(cursor.row, column - 1, cursor.row, column + 1);
			} else {
				swap = line.charAt(column - 1) + line.charAt(column - 2);
				range = new Range(cursor.row, column - 2, cursor.row, column);
			}
			this.session.replace(range, swap);
			this.session.selection.moveToPosition(range.end);
		}
		toLowerCase() {
			var originalRange = this.getSelectionRange();
			if (this.selection.isEmpty()) this.selection.selectWord();
			var range = this.getSelectionRange();
			var text = this.session.getTextRange(range);
			this.session.replace(range, text.toLowerCase());
			this.selection.setSelectionRange(originalRange);
		}
		toUpperCase() {
			var originalRange = this.getSelectionRange();
			if (this.selection.isEmpty()) this.selection.selectWord();
			var range = this.getSelectionRange();
			var text = this.session.getTextRange(range);
			this.session.replace(range, text.toUpperCase());
			this.selection.setSelectionRange(originalRange);
		}
		indent() {
			var session = this.session;
			var range = this.getSelectionRange();
			if (range.start.row < range.end.row) {
				var rows = this.$getSelectedRows();
				session.indentRows(rows.first, rows.last, "	");
				return;
			} else if (range.start.column < range.end.column) {
				var text = session.getTextRange(range);
				if (!/^\s+$/.test(text)) {
					var rows = this.$getSelectedRows();
					session.indentRows(rows.first, rows.last, "	");
					return;
				}
			}
			var line = session.getLine(range.start.row);
			var position = range.start;
			var size = session.getTabSize();
			var column = session.documentToScreenColumn(position.row, position.column);
			if (this.session.getUseSoftTabs()) {
				var count = size - column % size;
				var indentString = lang.stringRepeat(" ", count);
			} else {
				var count = column % size;
				while (line[range.start.column - 1] == " " && count) {
					range.start.column--;
					count--;
				}
				this.selection.setSelectionRange(range);
				indentString = "	";
			}
			return this.insert(indentString);
		}
		blockIndent() {
			var rows = this.$getSelectedRows();
			this.session.indentRows(rows.first, rows.last, "	");
		}
		blockOutdent() {
			var selection = this.session.getSelection();
			this.session.outdentRows(selection.getRange());
		}
		sortLines() {
			var rows = this.$getSelectedRows();
			var session = this.session;
			var lines = [];
			for (var i$1 = rows.first; i$1 <= rows.last; i$1++) lines.push(session.getLine(i$1));
			lines.sort(function(a, b) {
				if (a.toLowerCase() < b.toLowerCase()) return -1;
				if (a.toLowerCase() > b.toLowerCase()) return 1;
				return 0;
			});
			var deleteRange = new Range(0, 0, 0, 0);
			for (var i$1 = rows.first; i$1 <= rows.last; i$1++) {
				var line = session.getLine(i$1);
				deleteRange.start.row = i$1;
				deleteRange.end.row = i$1;
				deleteRange.end.column = line.length;
				session.replace(deleteRange, lines[i$1 - rows.first]);
			}
		}
		toggleCommentLines() {
			var state = this.session.getState(this.getCursorPosition().row);
			var rows = this.$getSelectedRows();
			this.session.getMode().toggleCommentLines(state, this.session, rows.first, rows.last);
		}
		toggleBlockComment() {
			var cursor = this.getCursorPosition();
			var state = this.session.getState(cursor.row);
			var range = this.getSelectionRange();
			this.session.getMode().toggleBlockComment(state, this.session, range, cursor);
		}
		getNumberAt(row, column) {
			var _numberRx = /[\-]?[0-9]+(?:\.[0-9]+)?/g;
			_numberRx.lastIndex = 0;
			var s = this.session.getLine(row);
			while (_numberRx.lastIndex < column) {
				var m = _numberRx.exec(s);
				if (m.index <= column && m.index + m[0].length >= column) return {
					value: m[0],
					start: m.index,
					end: m.index + m[0].length
				};
			}
			return null;
		}
		modifyNumber(amount) {
			var row = this.selection.getCursor().row;
			var column = this.selection.getCursor().column;
			var charRange = new Range(row, column - 1, row, column);
			var c = this.session.getTextRange(charRange);
			if (!isNaN(parseFloat(c)) && isFinite(c)) {
				var nr = this.getNumberAt(row, column);
				if (nr) {
					var fp = nr.value.indexOf(".") >= 0 ? nr.start + nr.value.indexOf(".") + 1 : nr.end;
					var decimals = nr.start + nr.value.length - fp;
					var t = parseFloat(nr.value);
					t *= Math.pow(10, decimals);
					if (fp !== nr.end && column < fp) amount *= Math.pow(10, nr.end - column - 1);
					else amount *= Math.pow(10, nr.end - column);
					t += amount;
					t /= Math.pow(10, decimals);
					var nnr = t.toFixed(decimals);
					var replaceRange = new Range(row, nr.start, row, nr.end);
					this.session.replace(replaceRange, nnr);
					this.moveCursorTo(row, Math.max(nr.start + 1, column + nnr.length - nr.value.length));
				}
			} else this.toggleWord();
		}
		toggleWord() {
			var row = this.selection.getCursor().row;
			var column = this.selection.getCursor().column;
			this.selection.selectWord();
			var currentState = this.getSelectedText();
			var currWordStart = this.selection.getWordRange().start.column;
			var wordParts = currentState.replace(/([a-z]+|[A-Z]+)(?=[A-Z_]|$)/g, "$1 ").split(/\s/);
			var delta = column - currWordStart - 1;
			if (delta < 0) delta = 0;
			var curLength = 0, itLength = 0;
			var that = this;
			if (currentState.match(/[A-Za-z0-9_]+/)) wordParts.forEach(function(item$1, i$2) {
				itLength = curLength + item$1.length;
				if (delta >= curLength && delta <= itLength) {
					currentState = item$1;
					that.selection.clearSelection();
					that.moveCursorTo(row, curLength + currWordStart);
					that.selection.selectTo(row, itLength + currWordStart);
				}
				curLength = itLength;
			});
			var wordPairs = this.$toggleWordPairs;
			var reg;
			for (var i$1 = 0; i$1 < wordPairs.length; i$1++) {
				var item = wordPairs[i$1];
				for (var j = 0; j <= 1; j++) {
					var negate = +!j;
					var firstCondition = currentState.match(new RegExp("^\\s?_?(" + lang.escapeRegExp(item[j]) + ")\\s?$", "i"));
					if (firstCondition) {
						if (currentState.match(new RegExp("([_]|^|\\s)(" + lang.escapeRegExp(firstCondition[1]) + ")($|\\s)", "g"))) {
							reg = currentState.replace(new RegExp(lang.escapeRegExp(item[j]), "i"), function(result) {
								var res = item[negate];
								if (result.toUpperCase() == result) res = res.toUpperCase();
								else if (result.charAt(0).toUpperCase() == result.charAt(0)) res = res.substr(0, 0) + item[negate].charAt(0).toUpperCase() + res.substr(1);
								return res;
							});
							this.insert(reg);
							reg = "";
						}
					}
				}
			}
		}
		findLinkAt(row, column) {
			var wordParts = this.session.getLine(row).split(/((?:https?|ftp):\/\/[\S]+)/);
			var columnPosition = column;
			if (columnPosition < 0) columnPosition = 0;
			var previousPosition = 0, currentPosition = 0, match;
			for (let item of wordParts) {
				currentPosition = previousPosition + item.length;
				if (columnPosition >= previousPosition && columnPosition <= currentPosition) {
					if (item.match(/((?:https?|ftp):\/\/[\S]+)/)) {
						match = item.replace(/[\s:.,'";}\]]+$/, "");
						break;
					}
				}
				previousPosition = currentPosition;
			}
			return match;
		}
		openLink() {
			var cursor = this.selection.getCursor();
			var url = this.findLinkAt(cursor.row, cursor.column);
			if (url) window.open(url, "_blank");
			return url != null;
		}
		removeLines() {
			var rows = this.$getSelectedRows();
			this.session.removeFullLines(rows.first, rows.last);
			this.clearSelection();
		}
		duplicateSelection() {
			var sel = this.selection;
			var doc = this.session;
			var range = sel.getRange();
			var reverse = sel.isBackwards();
			if (range.isEmpty()) {
				var row = range.start.row;
				doc.duplicateLines(row, row);
			} else {
				var point = reverse ? range.start : range.end;
				var endPoint = doc.insert(point, doc.getTextRange(range));
				range.start = point;
				range.end = endPoint;
				sel.setSelectionRange(range, reverse);
			}
		}
		moveLinesDown() {
			this.$moveLines(1, false);
		}
		moveLinesUp() {
			this.$moveLines(-1, false);
		}
		moveText(range, toPosition, copy) {
			return this.session.moveText(range, toPosition, copy);
		}
		copyLinesUp() {
			this.$moveLines(-1, true);
		}
		copyLinesDown() {
			this.$moveLines(1, true);
		}
		$moveLines(dir, copy) {
			var rows, moved;
			var selection = this.selection;
			if (!selection.inMultiSelectMode || this.inVirtualSelectionMode) {
				var range = selection.toOrientedRange();
				rows = this.$getSelectedRows(range);
				moved = this.session.$moveLines(rows.first, rows.last, copy ? 0 : dir);
				if (copy && dir == -1) moved = 0;
				range.moveBy(moved, 0);
				selection.fromOrientedRange(range);
			} else {
				var ranges = selection.rangeList.ranges;
				selection.rangeList.detach(this.session);
				this.inVirtualSelectionMode = true;
				var diff = 0;
				var totalDiff = 0;
				var l = ranges.length;
				for (var i$1 = 0; i$1 < l; i$1++) {
					var rangeIndex = i$1;
					ranges[i$1].moveBy(diff, 0);
					rows = this.$getSelectedRows(ranges[i$1]);
					var first = rows.first;
					var last = rows.last;
					while (++i$1 < l) {
						if (totalDiff) ranges[i$1].moveBy(totalDiff, 0);
						var subRows = this.$getSelectedRows(ranges[i$1]);
						if (copy && subRows.first != last) break;
						else if (!copy && subRows.first > last + 1) break;
						last = subRows.last;
					}
					i$1--;
					diff = this.session.$moveLines(first, last, copy ? 0 : dir);
					if (copy && dir == -1) rangeIndex = i$1 + 1;
					while (rangeIndex <= i$1) {
						ranges[rangeIndex].moveBy(diff, 0);
						rangeIndex++;
					}
					if (!copy) diff = 0;
					totalDiff += diff;
				}
				selection.fromOrientedRange(selection.ranges[0]);
				selection.rangeList.attach(this.session);
				this.inVirtualSelectionMode = false;
			}
		}
		$getSelectedRows(range) {
			range = (range || this.getSelectionRange()).collapseRows();
			return {
				first: this.session.getRowFoldStart(range.start.row),
				last: this.session.getRowFoldEnd(range.end.row)
			};
		}
		onCompositionStart(compositionState) {
			this.renderer.showComposition(compositionState);
		}
		onCompositionUpdate(text) {
			this.renderer.setCompositionText(text);
		}
		onCompositionEnd() {
			this.renderer.hideComposition();
		}
		getFirstVisibleRow() {
			return this.renderer.getFirstVisibleRow();
		}
		getLastVisibleRow() {
			return this.renderer.getLastVisibleRow();
		}
		isRowVisible(row) {
			return row >= this.getFirstVisibleRow() && row <= this.getLastVisibleRow();
		}
		isRowFullyVisible(row) {
			return row >= this.renderer.getFirstFullyVisibleRow() && row <= this.renderer.getLastFullyVisibleRow();
		}
		$getVisibleRowCount() {
			return this.renderer.getScrollBottomRow() - this.renderer.getScrollTopRow() + 1;
		}
		$moveByPage(dir, select) {
			var renderer = this.renderer;
			var config$3 = this.renderer.layerConfig;
			var rows = dir * Math.floor(config$3.height / config$3.lineHeight);
			if (select === true) this.selection.$moveSelection(function() {
				this.moveCursorBy(rows, 0);
			});
			else if (select === false) {
				this.selection.moveCursorBy(rows, 0);
				this.selection.clearSelection();
			}
			var scrollTop = renderer.scrollTop;
			renderer.scrollBy(0, rows * config$3.lineHeight);
			if (select != null) renderer.scrollCursorIntoView(null, .5);
			renderer.animateScrolling(scrollTop);
		}
		selectPageDown() {
			this.$moveByPage(1, true);
		}
		selectPageUp() {
			this.$moveByPage(-1, true);
		}
		gotoPageDown() {
			this.$moveByPage(1, false);
		}
		gotoPageUp() {
			this.$moveByPage(-1, false);
		}
		scrollPageDown() {
			this.$moveByPage(1);
		}
		scrollPageUp() {
			this.$moveByPage(-1);
		}
		scrollToRow(row) {
			this.renderer.scrollToRow(row);
		}
		scrollToLine(line, center, animate, callback) {
			this.renderer.scrollToLine(line, center, animate, callback);
		}
		centerSelection() {
			var range = this.getSelectionRange();
			var pos = {
				row: Math.floor(range.start.row + (range.end.row - range.start.row) / 2),
				column: Math.floor(range.start.column + (range.end.column - range.start.column) / 2)
			};
			this.renderer.alignCursor(pos, .5);
		}
		getCursorPosition() {
			return this.selection.getCursor();
		}
		getCursorPositionScreen() {
			return this.session.documentToScreenPosition(this.getCursorPosition());
		}
		getSelectionRange() {
			return this.selection.getRange();
		}
		selectAll() {
			this.selection.selectAll();
		}
		clearSelection() {
			this.selection.clearSelection();
		}
		moveCursorTo(row, column) {
			this.selection.moveCursorTo(row, column);
		}
		moveCursorToPosition(pos) {
			this.selection.moveCursorToPosition(pos);
		}
		jumpToMatching(select, expand) {
			var cursor = this.getCursorPosition();
			var iterator = new TokenIterator(this.session, cursor.row, cursor.column);
			var prevToken = iterator.getCurrentToken();
			var tokenCount = 0;
			if (prevToken && prevToken.type.indexOf("tag-name") !== -1) prevToken = iterator.stepBackward();
			var token = prevToken || iterator.stepForward();
			if (!token) return;
			var matchType;
			var found = false;
			var depth = {};
			var i$1 = cursor.column - token.start;
			var bracketType;
			var brackets = {
				")": "(",
				"(": "(",
				"]": "[",
				"[": "[",
				"{": "{",
				"}": "{"
			};
			do {
				if (token.value.match(/[{}()\[\]]/g)) for (; i$1 < token.value.length && !found; i$1++) {
					if (!brackets[token.value[i$1]]) continue;
					bracketType = brackets[token.value[i$1]] + "." + token.type.replace("rparen", "lparen");
					if (isNaN(depth[bracketType])) depth[bracketType] = 0;
					switch (token.value[i$1]) {
						case "(":
						case "[":
						case "{":
							depth[bracketType]++;
							break;
						case ")":
						case "]":
						case "}":
							depth[bracketType]--;
							if (depth[bracketType] === -1) {
								matchType = "bracket";
								found = true;
							}
							break;
					}
				}
				else if (token.type.indexOf("tag-name") !== -1) {
					if (isNaN(depth[token.value])) depth[token.value] = 0;
					if (prevToken.value === "<" && tokenCount > 1) depth[token.value]++;
					else if (prevToken.value === "</") depth[token.value]--;
					if (depth[token.value] === -1) {
						matchType = "tag";
						found = true;
					}
				}
				if (!found) {
					prevToken = token;
					tokenCount++;
					token = iterator.stepForward();
					i$1 = 0;
				}
			} while (token && !found);
			if (!matchType) return;
			var range, pos;
			if (matchType === "bracket") {
				range = this.session.getBracketRange(cursor);
				if (!range) {
					range = new Range(iterator.getCurrentTokenRow(), iterator.getCurrentTokenColumn() + i$1 - 1, iterator.getCurrentTokenRow(), iterator.getCurrentTokenColumn() + i$1 - 1);
					pos = range.start;
					if (expand || pos.row === cursor.row && Math.abs(pos.column - cursor.column) < 2) range = this.session.getBracketRange(pos);
				}
			} else if (matchType === "tag") {
				if (!token || token.type.indexOf("tag-name") === -1) return;
				range = new Range(iterator.getCurrentTokenRow(), iterator.getCurrentTokenColumn() - 2, iterator.getCurrentTokenRow(), iterator.getCurrentTokenColumn() - 2);
				if (range.compare(cursor.row, cursor.column) === 0) {
					var tagsRanges = this.session.getMatchingTags(cursor);
					if (tagsRanges) if (tagsRanges.openTag.contains(cursor.row, cursor.column)) {
						range = tagsRanges.closeTag;
						pos = range.start;
					} else {
						range = tagsRanges.openTag;
						if (tagsRanges.closeTag.start.row === cursor.row && tagsRanges.closeTag.start.column === cursor.column) pos = range.end;
						else pos = range.start;
					}
				}
				pos = pos || range.start;
			}
			pos = range && range.cursor || pos;
			if (pos) if (select) if (range && expand) this.selection.setRange(range);
			else if (range && range.isEqual(this.getSelectionRange())) this.clearSelection();
			else this.selection.selectTo(pos.row, pos.column);
			else this.selection.moveTo(pos.row, pos.column);
		}
		gotoLine(lineNumber, column, animate) {
			this.selection.clearSelection();
			this.session.unfold({
				row: lineNumber - 1,
				column: column || 0
			});
			this.exitMultiSelectMode && this.exitMultiSelectMode();
			this.moveCursorTo(lineNumber - 1, column || 0);
			if (!this.isRowFullyVisible(lineNumber - 1)) this.scrollToLine(lineNumber - 1, true, animate);
		}
		navigateTo(row, column) {
			this.selection.moveTo(row, column);
		}
		navigateUp(times) {
			if (this.selection.isMultiLine() && !this.selection.isBackwards()) {
				var selectionStart = this.selection.anchor.getPosition();
				return this.moveCursorToPosition(selectionStart);
			}
			this.selection.clearSelection();
			this.selection.moveCursorBy(-times || -1, 0);
		}
		navigateDown(times) {
			if (this.selection.isMultiLine() && this.selection.isBackwards()) {
				var selectionEnd = this.selection.anchor.getPosition();
				return this.moveCursorToPosition(selectionEnd);
			}
			this.selection.clearSelection();
			this.selection.moveCursorBy(times || 1, 0);
		}
		navigateLeft(times) {
			if (!this.selection.isEmpty()) {
				var selectionStart = this.getSelectionRange().start;
				this.moveCursorToPosition(selectionStart);
			} else {
				times = times || 1;
				while (times--) this.selection.moveCursorLeft();
			}
			this.clearSelection();
		}
		navigateRight(times) {
			if (!this.selection.isEmpty()) {
				var selectionEnd = this.getSelectionRange().end;
				this.moveCursorToPosition(selectionEnd);
			} else {
				times = times || 1;
				while (times--) this.selection.moveCursorRight();
			}
			this.clearSelection();
		}
		navigateLineStart() {
			this.selection.moveCursorLineStart();
			this.clearSelection();
		}
		navigateLineEnd() {
			this.selection.moveCursorLineEnd();
			this.clearSelection();
		}
		navigateFileEnd() {
			this.selection.moveCursorFileEnd();
			this.clearSelection();
		}
		navigateFileStart() {
			this.selection.moveCursorFileStart();
			this.clearSelection();
		}
		navigateWordRight() {
			this.selection.moveCursorWordRight();
			this.clearSelection();
		}
		navigateWordLeft() {
			this.selection.moveCursorWordLeft();
			this.clearSelection();
		}
		replace(replacement, options) {
			if (options) this.$search.set(options);
			var range = this.$search.find(this.session);
			var replaced = 0;
			if (!range) return replaced;
			if (this.$tryReplace(range, replacement)) replaced = 1;
			this.selection.setSelectionRange(range);
			this.renderer.scrollSelectionIntoView(range.start, range.end);
			return replaced;
		}
		replaceAll(replacement, options) {
			if (options) this.$search.set(options);
			var ranges = this.$search.findAll(this.session);
			var replaced = 0;
			if (!ranges.length) return replaced;
			var selection = this.getSelectionRange();
			this.selection.moveTo(0, 0);
			for (var i$1 = ranges.length - 1; i$1 >= 0; --i$1) if (this.$tryReplace(ranges[i$1], replacement)) replaced++;
			this.selection.setSelectionRange(selection);
			return replaced;
		}
		$tryReplace(range, replacement) {
			var input = this.session.getTextRange(range);
			replacement = this.$search.replace(input, replacement);
			if (replacement !== null) {
				range.end = this.session.replace(range, replacement);
				return range;
			} else return null;
		}
		getLastSearchOptions() {
			return this.$search.getOptions();
		}
		find(needle, options, animate) {
			if (!options) options = {};
			if (typeof needle == "string" || needle instanceof RegExp) options.needle = needle;
			else if (typeof needle == "object") oop.mixin(options, needle);
			var range = this.selection.getRange();
			if (options.needle == null) {
				needle = this.session.getTextRange(range) || this.$search.$options.needle;
				if (!needle) {
					range = this.session.getWordRange(range.start.row, range.start.column);
					needle = this.session.getTextRange(range);
				}
				this.$search.set({ needle });
			}
			this.$search.set(options);
			if (!options.start) this.$search.set({ start: range });
			var newRange = this.$search.find(this.session);
			if (options.preventScroll) return newRange;
			if (newRange) {
				this.revealRange(newRange, animate);
				return newRange;
			}
			if (options.backwards) range.start = range.end;
			else range.end = range.start;
			this.selection.setRange(range);
		}
		findNext(options, animate) {
			this.find({
				skipCurrent: true,
				backwards: false
			}, options, animate);
		}
		findPrevious(options, animate) {
			this.find(options, {
				skipCurrent: true,
				backwards: true
			}, animate);
		}
		revealRange(range, animate) {
			this.session.unfold(range);
			this.selection.setSelectionRange(range);
			var scrollTop = this.renderer.scrollTop;
			this.renderer.scrollSelectionIntoView(range.start, range.end, .5);
			if (animate !== false) this.renderer.animateScrolling(scrollTop);
		}
		undo() {
			this.session.getUndoManager().undo(this.session);
			this.renderer.scrollCursorIntoView(null, .5);
		}
		redo() {
			this.session.getUndoManager().redo(this.session);
			this.renderer.scrollCursorIntoView(null, .5);
		}
		destroy() {
			this.destroyed = true;
			if (this.$toDestroy) {
				this.$toDestroy.forEach(function(el) {
					el.destroy();
				});
				this.$toDestroy = [];
			}
			if (this.$mouseHandler) this.$mouseHandler.destroy();
			this.renderer.destroy();
			this._signal("destroy", this);
			if (this.session) this.session.destroy();
			if (this._$emitInputEvent) this._$emitInputEvent.cancel();
			this.removeAllListeners();
		}
		setAutoScrollEditorIntoView(enable) {
			if (!enable) return;
			var rect;
			var self = this;
			var shouldScroll = false;
			if (!this.$scrollAnchor) this.$scrollAnchor = document.createElement("div");
			var scrollAnchor = this.$scrollAnchor;
			scrollAnchor.style.cssText = "position:absolute";
			this.container.insertBefore(scrollAnchor, this.container.firstChild);
			var onChangeSelection = this.on("changeSelection", function() {
				shouldScroll = true;
			});
			var onBeforeRender = this.renderer.on("beforeRender", function() {
				if (shouldScroll) rect = self.renderer.container.getBoundingClientRect();
			});
			var onAfterRender = this.renderer.on("afterRender", function() {
				if (shouldScroll && rect && (self.isFocused() || self.searchBox && self.searchBox.isFocused())) {
					var renderer = self.renderer;
					var pos = renderer.$cursorLayer.$pixelPos;
					var config$3 = renderer.layerConfig;
					var top = pos.top - config$3.offset;
					if (pos.top >= 0 && top + rect.top < 0) shouldScroll = true;
					else if (pos.top < config$3.height && pos.top + rect.top + config$3.lineHeight > window.innerHeight) shouldScroll = false;
					else shouldScroll = null;
					if (shouldScroll != null) {
						scrollAnchor.style.top = top + "px";
						scrollAnchor.style.left = pos.left + "px";
						scrollAnchor.style.height = config$3.lineHeight + "px";
						scrollAnchor.scrollIntoView(shouldScroll);
					}
					shouldScroll = rect = null;
				}
			});
			this.setAutoScrollEditorIntoView = function(enable$1) {
				if (enable$1) return;
				delete this.setAutoScrollEditorIntoView;
				this.off("changeSelection", onChangeSelection);
				this.renderer.off("afterRender", onAfterRender);
				this.renderer.off("beforeRender", onBeforeRender);
			};
		}
		$resetCursorStyle() {
			var style = this.$cursorStyle || "ace";
			var cursorLayer = this.renderer.$cursorLayer;
			if (!cursorLayer) return;
			cursorLayer.setSmoothBlinking(/smooth/.test(style));
			cursorLayer.isBlinking = !this.$readOnly && style != "wide";
			dom.setCssClass(cursorLayer.element, "ace_slim-cursors", /slim/.test(style));
		}
		prompt(message, options, callback) {
			var editor = this;
			config.loadModule("ace/ext/prompt", function(module$1) {
				module$1.prompt(editor, message, options, callback);
			});
		}
		get hoverTooltip() {
			return this.$hoverTooltip || (this.$hoverTooltip = new HoverTooltip(this.container));
		}
		set hoverTooltip(value) {
			if (this.$hoverTooltip) this.$hoverTooltip.destroy();
			this.$hoverTooltip = value;
		}
	};
	Editor.$uid = 0;
	Editor.prototype.curOp = null;
	Editor.prototype.prevOp = {};
	Editor.prototype.$mergeableCommands = [
		"backspace",
		"del",
		"insertstring"
	];
	Editor.prototype.$toggleWordPairs = [
		["first", "last"],
		["true", "false"],
		["yes", "no"],
		["width", "height"],
		["top", "bottom"],
		["right", "left"],
		["on", "off"],
		["x", "y"],
		["get", "set"],
		["max", "min"],
		["horizontal", "vertical"],
		["show", "hide"],
		["add", "remove"],
		["up", "down"],
		["before", "after"],
		["even", "odd"],
		["in", "out"],
		["inside", "outside"],
		["next", "previous"],
		["increase", "decrease"],
		["attach", "detach"],
		["&&", "||"],
		["==", "!="]
	];
	oop.implement(Editor.prototype, EventEmitter);
	config.defineOptions(Editor.prototype, "editor", {
		selectionStyle: {
			set: function(style) {
				this.onSelectionChange();
				this._signal("changeSelectionStyle", { data: style });
			},
			initialValue: "line"
		},
		highlightActiveLine: {
			set: function() {
				this.$updateHighlightActiveLine();
			},
			initialValue: true
		},
		highlightSelectedWord: {
			set: function(shouldHighlight) {
				this.$onSelectionChange();
			},
			initialValue: true
		},
		readOnly: {
			set: function(readOnly) {
				this.textInput.setReadOnly(readOnly);
				if (this.destroyed) return;
				this.$resetCursorStyle();
				if (!this.$readOnlyCallback) this.$readOnlyCallback = (e) => {
					var shouldShow = false;
					if (e && e.type == "keydown") {
						if (e && e.key && !e.ctrlKey && !e.metaKey) {
							if (e.key == " ") e.preventDefault();
							shouldShow = e.key.length == 1;
						}
						if (!shouldShow) return;
					} else if (e && e.type !== "exec") shouldShow = true;
					if (shouldShow) {
						var domNode = dom.createElement("div");
						domNode.textContent = nls("editor.tooltip.disable-editing", "Editing is disabled");
						if (!this.hoverTooltip.isOpen) this.hoverTooltip.showForRange(this, this.getSelectionRange(), domNode);
					} else if (this.hoverTooltip && this.hoverTooltip.isOpen) this.hoverTooltip.hide();
				};
				var textArea = this.textInput.getElement();
				if (readOnly) {
					event.addListener(textArea, "keydown", this.$readOnlyCallback, this);
					this.commands.on("exec", this.$readOnlyCallback);
					this.commands.on("commandUnavailable", this.$readOnlyCallback);
				} else {
					event.removeListener(textArea, "keydown", this.$readOnlyCallback);
					this.commands.off("exec", this.$readOnlyCallback);
					this.commands.off("commandUnavailable", this.$readOnlyCallback);
				}
			},
			initialValue: false
		},
		copyWithEmptySelection: {
			set: function(value) {
				this.textInput.setCopyWithEmptySelection(value);
			},
			initialValue: false
		},
		cursorStyle: {
			set: function(val) {
				this.$resetCursorStyle();
			},
			values: [
				"ace",
				"slim",
				"smooth",
				"wide"
			],
			initialValue: "ace"
		},
		mergeUndoDeltas: {
			values: [
				false,
				true,
				"always"
			],
			initialValue: true
		},
		behavioursEnabled: { initialValue: true },
		wrapBehavioursEnabled: { initialValue: true },
		enableAutoIndent: { initialValue: true },
		autoScrollEditorIntoView: { set: function(val) {
			this.setAutoScrollEditorIntoView(val);
		} },
		keyboardHandler: {
			set: function(val) {
				this.setKeyboardHandler(val);
			},
			get: function() {
				return this.$keybindingId;
			},
			handlesSet: true
		},
		value: {
			set: function(val) {
				this.session.setValue(val);
			},
			get: function() {
				return this.getValue();
			},
			handlesSet: true,
			hidden: true
		},
		session: {
			set: function(val) {
				this.setSession(val);
			},
			get: function() {
				return this.session;
			},
			handlesSet: true,
			hidden: true
		},
		showLineNumbers: {
			set: function(show) {
				this.renderer.$gutterLayer.setShowLineNumbers(show);
				this.renderer.$loop.schedule(this.renderer.CHANGE_GUTTER);
				if (show && this.$relativeLineNumbers) relativeNumberRenderer.attach(this);
				else relativeNumberRenderer.detach(this);
			},
			initialValue: true
		},
		relativeLineNumbers: { set: function(value) {
			if (this.$showLineNumbers && value) relativeNumberRenderer.attach(this);
			else relativeNumberRenderer.detach(this);
		} },
		placeholder: { set: function(message) {
			if (!this.$updatePlaceholder) {
				this.$updatePlaceholder = function() {
					var hasValue = this.session && (this.renderer.$composition || this.session.getLength() > 1 || this.session.getLine(0).length > 0);
					if (hasValue && this.renderer.placeholderNode) {
						this.renderer.off("afterRender", this.$updatePlaceholder);
						dom.removeCssClass(this.container, "ace_hasPlaceholder");
						this.renderer.placeholderNode.remove();
						this.renderer.placeholderNode = null;
					} else if (!hasValue && !this.renderer.placeholderNode) {
						this.renderer.on("afterRender", this.$updatePlaceholder);
						dom.addCssClass(this.container, "ace_hasPlaceholder");
						var el = dom.createElement("div");
						el.className = "ace_placeholder";
						el.textContent = this.$placeholder || "";
						this.renderer.placeholderNode = el;
						this.renderer.content.appendChild(this.renderer.placeholderNode);
					} else if (!hasValue && this.renderer.placeholderNode) this.renderer.placeholderNode.textContent = this.$placeholder || "";
				}.bind(this);
				this.on("input", this.$updatePlaceholder);
			}
			this.$updatePlaceholder();
		} },
		enableKeyboardAccessibility: {
			set: function(value) {
				var blurCommand = {
					name: "blurTextInput",
					description: "Set focus to the editor content div to allow tabbing through the page",
					bindKey: "Esc",
					exec: function(editor) {
						editor.blur();
						editor.renderer.scroller.focus();
					},
					readOnly: true
				};
				var focusOnEnterKeyup = function(e) {
					if (e.target == this.renderer.scroller && e.keyCode === keys["enter"]) {
						e.preventDefault();
						var row = this.getCursorPosition().row;
						if (!this.isRowVisible(row)) this.scrollToLine(row, true, true);
						this.focus();
					}
				};
				var gutterKeyboardHandler;
				if (value) {
					this.renderer.enableKeyboardAccessibility = true;
					this.renderer.keyboardFocusClassName = "ace_keyboard-focus";
					this.textInput.getElement().setAttribute("tabindex", -1);
					this.textInput.setNumberOfExtraLines(useragent.isWin ? 3 : 0);
					this.renderer.scroller.setAttribute("tabindex", 0);
					this.renderer.scroller.setAttribute("role", "group");
					this.renderer.scroller.setAttribute("aria-roledescription", nls("editor.scroller.aria-roledescription", "editor"));
					this.renderer.scroller.classList.add(this.renderer.keyboardFocusClassName);
					this.renderer.scroller.setAttribute("aria-label", nls("editor.scroller.aria-label", "Editor content, press Enter to start editing, press Escape to exit"));
					this.renderer.scroller.addEventListener("keyup", focusOnEnterKeyup.bind(this));
					this.commands.addCommand(blurCommand);
					this.renderer.$gutter.setAttribute("tabindex", 0);
					this.renderer.$gutter.setAttribute("aria-hidden", false);
					this.renderer.$gutter.setAttribute("role", "group");
					this.renderer.$gutter.setAttribute("aria-roledescription", nls("editor.gutter.aria-roledescription", "editor gutter"));
					this.renderer.$gutter.setAttribute("aria-label", nls("editor.gutter.aria-label", "Editor gutter, press Enter to interact with controls using arrow keys, press Escape to exit"));
					this.renderer.$gutter.classList.add(this.renderer.keyboardFocusClassName);
					this.renderer.content.setAttribute("aria-hidden", true);
					if (!gutterKeyboardHandler) gutterKeyboardHandler = new GutterKeyboardHandler(this);
					gutterKeyboardHandler.addListener();
					this.textInput.setAriaOptions({ setLabel: true });
				} else {
					this.renderer.enableKeyboardAccessibility = false;
					this.textInput.getElement().setAttribute("tabindex", 0);
					this.textInput.setNumberOfExtraLines(0);
					this.renderer.scroller.setAttribute("tabindex", -1);
					this.renderer.scroller.removeAttribute("role");
					this.renderer.scroller.removeAttribute("aria-roledescription");
					this.renderer.scroller.classList.remove(this.renderer.keyboardFocusClassName);
					this.renderer.scroller.removeAttribute("aria-label");
					this.renderer.scroller.removeEventListener("keyup", focusOnEnterKeyup.bind(this));
					this.commands.removeCommand(blurCommand);
					this.renderer.content.removeAttribute("aria-hidden");
					this.renderer.$gutter.setAttribute("tabindex", -1);
					this.renderer.$gutter.setAttribute("aria-hidden", true);
					this.renderer.$gutter.removeAttribute("role");
					this.renderer.$gutter.removeAttribute("aria-roledescription");
					this.renderer.$gutter.removeAttribute("aria-label");
					this.renderer.$gutter.classList.remove(this.renderer.keyboardFocusClassName);
					if (gutterKeyboardHandler) gutterKeyboardHandler.removeListener();
				}
			},
			initialValue: false
		},
		textInputAriaLabel: {
			set: function(val) {
				this.$textInputAriaLabel = val;
			},
			initialValue: ""
		},
		enableMobileMenu: {
			set: function(val) {
				this.$enableMobileMenu = val;
			},
			initialValue: true
		},
		customScrollbar: "renderer",
		hScrollBarAlwaysVisible: "renderer",
		vScrollBarAlwaysVisible: "renderer",
		highlightGutterLine: "renderer",
		animatedScroll: "renderer",
		showInvisibles: "renderer",
		showPrintMargin: "renderer",
		printMarginColumn: "renderer",
		printMargin: "renderer",
		fadeFoldWidgets: "renderer",
		showFoldWidgets: "renderer",
		displayIndentGuides: "renderer",
		highlightIndentGuides: "renderer",
		showGutter: "renderer",
		fontSize: "renderer",
		fontFamily: "renderer",
		maxLines: "renderer",
		minLines: "renderer",
		scrollPastEnd: "renderer",
		fixedWidthGutter: "renderer",
		theme: "renderer",
		hasCssTransforms: "renderer",
		maxPixelHeight: "renderer",
		useTextareaForIME: "renderer",
		useResizeObserver: "renderer",
		useSvgGutterIcons: "renderer",
		showFoldedAnnotations: "renderer",
		scrollSpeed: "$mouseHandler",
		dragDelay: "$mouseHandler",
		dragEnabled: "$mouseHandler",
		focusTimeout: "$mouseHandler",
		firstLineNumber: "session",
		overwrite: "session",
		newLineMode: "session",
		useWorker: "session",
		useSoftTabs: "session",
		navigateWithinSoftTabs: "session",
		tabSize: "session",
		wrap: "session",
		indentedSoftWrap: "session",
		foldStyle: "session",
		mode: "session"
	});
	var relativeNumberRenderer = {
		getText: function(session, row) {
			return (Math.abs(session.selection.lead.row - row) || row + 1 + (row < 9 ? "·" : "")) + "";
		},
		getWidth: function(session, lastLineNumber, config$3) {
			return Math.max(lastLineNumber.toString().length, (config$3.lastRow + 1).toString().length, 2) * config$3.characterWidth;
		},
		update: function(e, editor) {
			editor.renderer.$loop.schedule(editor.renderer.CHANGE_GUTTER);
		},
		attach: function(editor) {
			editor.renderer.$gutterLayer.$renderer = this;
			editor.on("changeSelection", this.update);
			this.update(null, editor);
		},
		detach: function(editor) {
			if (editor.renderer.$gutterLayer.$renderer == this) editor.renderer.$gutterLayer.$renderer = null;
			editor.off("changeSelection", this.update);
			this.update(null, editor);
		}
	};
	exports.Editor = Editor;
}));
export { require_clipboard as i, require_command_manager as n, require_search as r, require_editor as t };
