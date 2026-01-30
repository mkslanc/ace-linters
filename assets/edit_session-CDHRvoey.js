import { t as __commonJSMin } from "./chunk-iA-Slpst.js";
import { t as require_useragent } from "./useragent-BODERP_7.js";
import { t as require_dom } from "./dom-BBjJ92-n.js";
import { t as require_range } from "./range-BUVqNbwc.js";
import { t as require_oop } from "./oop-DcdK5Mrs.js";
import { t as require_lang } from "./lang-DcNOSqFo.js";
import { t as require_event } from "./event-BcX-N72I.js";
import { t as require_config } from "./config-DPm1ug3B.js";
import { t as require_event_emitter } from "./event_emitter-BGfSYA24.js";
import { t as require_text } from "./text-B9A1mx6l.js";
import { t as require_token_iterator } from "./token_iterator-CbfYmntj.js";
var require_mouse_event = /* @__PURE__ */ __commonJSMin(((exports) => {
	var event = require_event();
	var useragent = require_useragent();
	var MouseEvent$1 = class {
		constructor(domEvent, editor) {
			this.speed;
			this.wheelX;
			this.wheelY;
			this.domEvent = domEvent;
			this.editor = editor;
			this.x = this.clientX = domEvent.clientX;
			this.y = this.clientY = domEvent.clientY;
			this.$pos = null;
			this.$inSelection = null;
			this.propagationStopped = false;
			this.defaultPrevented = false;
		}
		stopPropagation() {
			event.stopPropagation(this.domEvent);
			this.propagationStopped = true;
		}
		preventDefault() {
			event.preventDefault(this.domEvent);
			this.defaultPrevented = true;
		}
		stop() {
			this.stopPropagation();
			this.preventDefault();
		}
		getDocumentPosition() {
			if (this.$pos) return this.$pos;
			this.$pos = this.editor.renderer.screenToTextCoordinates(this.clientX, this.clientY);
			return this.$pos;
		}
		getGutterRow() {
			var documentRow = this.getDocumentPosition().row;
			return this.editor.session.documentToScreenRow(documentRow, 0) - this.editor.session.documentToScreenRow(this.editor.renderer.$gutterLayer.$lines.get(0).row, 0);
		}
		inSelection() {
			if (this.$inSelection !== null) return this.$inSelection;
			var selectionRange = this.editor.getSelectionRange();
			if (selectionRange.isEmpty()) this.$inSelection = false;
			else {
				var pos = this.getDocumentPosition();
				this.$inSelection = selectionRange.contains(pos.row, pos.column);
			}
			return this.$inSelection;
		}
		getButton() {
			return event.getButton(this.domEvent);
		}
		getShiftKey() {
			return this.domEvent.shiftKey;
		}
		getAccelKey() {
			return useragent.isMac ? this.domEvent.metaKey : this.domEvent.ctrlKey;
		}
	};
	exports.MouseEvent = MouseEvent$1;
}));
var require_bidiutil = /* @__PURE__ */ __commonJSMin(((exports) => {
	var dir = 0, hiLevel = 0, lastArabic = false, hasUBAT_B = false, hasUBAT_S = false;
	var impTab_LTR = [
		[
			0,
			3,
			0,
			1,
			0,
			0,
			0
		],
		[
			0,
			3,
			0,
			1,
			2,
			2,
			0
		],
		[
			0,
			3,
			0,
			17,
			2,
			0,
			1
		],
		[
			0,
			3,
			5,
			5,
			4,
			1,
			0
		],
		[
			0,
			3,
			21,
			21,
			4,
			0,
			1
		],
		[
			0,
			3,
			5,
			5,
			4,
			2,
			0
		]
	];
	var impTab_RTL = [
		[
			2,
			0,
			1,
			1,
			0,
			1,
			0
		],
		[
			2,
			0,
			1,
			1,
			0,
			2,
			0
		],
		[
			2,
			0,
			2,
			1,
			3,
			2,
			0
		],
		[
			2,
			0,
			2,
			33,
			3,
			1,
			1
		]
	];
	var LTR = 0, RTL = 1;
	var L = 0;
	var R = 1;
	var EN = 2;
	var AN = 3;
	var ON = 4;
	var B = 5;
	var S = 6;
	var AL = 7;
	var WS = 8;
	var CS = 9;
	var ES = 10;
	var ET = 11;
	var NSM = 12;
	var LRE = 13;
	var RLE = 14;
	var PDF = 15;
	var LRO = 16;
	var RLO = 17;
	var BN = 18;
	var UnicodeTBL00 = [
		BN,
		BN,
		BN,
		BN,
		BN,
		BN,
		BN,
		BN,
		BN,
		S,
		B,
		S,
		WS,
		B,
		BN,
		BN,
		BN,
		BN,
		BN,
		BN,
		BN,
		BN,
		BN,
		BN,
		BN,
		BN,
		BN,
		BN,
		B,
		B,
		B,
		S,
		WS,
		ON,
		ON,
		ET,
		ET,
		ET,
		ON,
		ON,
		ON,
		ON,
		ON,
		ES,
		CS,
		ES,
		CS,
		CS,
		EN,
		EN,
		EN,
		EN,
		EN,
		EN,
		EN,
		EN,
		EN,
		EN,
		CS,
		ON,
		ON,
		ON,
		ON,
		ON,
		ON,
		L,
		L,
		L,
		L,
		L,
		L,
		L,
		L,
		L,
		L,
		L,
		L,
		L,
		L,
		L,
		L,
		L,
		L,
		L,
		L,
		L,
		L,
		L,
		L,
		L,
		L,
		ON,
		ON,
		ON,
		ON,
		ON,
		ON,
		L,
		L,
		L,
		L,
		L,
		L,
		L,
		L,
		L,
		L,
		L,
		L,
		L,
		L,
		L,
		L,
		L,
		L,
		L,
		L,
		L,
		L,
		L,
		L,
		L,
		L,
		ON,
		ON,
		ON,
		ON,
		BN,
		BN,
		BN,
		BN,
		BN,
		BN,
		B,
		BN,
		BN,
		BN,
		BN,
		BN,
		BN,
		BN,
		BN,
		BN,
		BN,
		BN,
		BN,
		BN,
		BN,
		BN,
		BN,
		BN,
		BN,
		BN,
		BN,
		BN,
		BN,
		BN,
		BN,
		BN,
		BN,
		CS,
		ON,
		ET,
		ET,
		ET,
		ET,
		ON,
		ON,
		ON,
		ON,
		L,
		ON,
		ON,
		BN,
		ON,
		ON,
		ET,
		ET,
		EN,
		EN,
		ON,
		L,
		ON,
		ON,
		ON,
		EN,
		L,
		ON,
		ON,
		ON,
		ON,
		ON
	];
	var UnicodeTBL20 = [
		WS,
		WS,
		WS,
		WS,
		WS,
		WS,
		WS,
		WS,
		WS,
		WS,
		WS,
		BN,
		BN,
		BN,
		L,
		R,
		ON,
		ON,
		ON,
		ON,
		ON,
		ON,
		ON,
		ON,
		ON,
		ON,
		ON,
		ON,
		ON,
		ON,
		ON,
		ON,
		ON,
		ON,
		ON,
		ON,
		ON,
		ON,
		ON,
		ON,
		WS,
		B,
		LRE,
		RLE,
		PDF,
		LRO,
		RLO,
		CS,
		ET,
		ET,
		ET,
		ET,
		ET,
		ON,
		ON,
		ON,
		ON,
		ON,
		ON,
		ON,
		ON,
		ON,
		ON,
		ON,
		ON,
		ON,
		ON,
		ON,
		CS,
		ON,
		ON,
		ON,
		ON,
		ON,
		ON,
		ON,
		ON,
		ON,
		ON,
		ON,
		ON,
		ON,
		ON,
		ON,
		ON,
		ON,
		ON,
		ON,
		ON,
		ON,
		ON,
		ON,
		ON,
		ON,
		ON,
		WS
	];
	function _computeLevels(chars, levels, len, charTypes) {
		var impTab = dir ? impTab_RTL : impTab_LTR, prevState = null, newClass = null, newLevel = null, newState = 0, action = null, cond = null, condPos = -1, i = null, ix = null, classes = [];
		if (!charTypes) for (i = 0, charTypes = []; i < len; i++) charTypes[i] = _getCharacterType(chars[i]);
		hiLevel = dir;
		lastArabic = false;
		hasUBAT_B = false;
		hasUBAT_S = false;
		for (ix = 0; ix < len; ix++) {
			prevState = newState;
			classes[ix] = newClass = _getCharClass(chars, charTypes, classes, ix);
			newState = impTab[prevState][newClass];
			action = newState & 240;
			newState &= 15;
			levels[ix] = newLevel = impTab[newState][5];
			if (action > 0) if (action == 16) {
				for (i = condPos; i < ix; i++) levels[i] = 1;
				condPos = -1;
			} else condPos = -1;
			cond = impTab[newState][6];
			if (cond) {
				if (condPos == -1) condPos = ix;
			} else if (condPos > -1) {
				for (i = condPos; i < ix; i++) levels[i] = newLevel;
				condPos = -1;
			}
			if (charTypes[ix] == B) levels[ix] = 0;
			hiLevel |= newLevel;
		}
		if (hasUBAT_S) {
			for (i = 0; i < len; i++) if (charTypes[i] == S) {
				levels[i] = dir;
				for (var j = i - 1; j >= 0; j--) if (charTypes[j] == WS) levels[j] = dir;
				else break;
			}
		}
	}
	function _invertLevel(lev, levels, _array) {
		if (hiLevel < lev) return;
		if (lev == 1 && dir == RTL && !hasUBAT_B) {
			_array.reverse();
			return;
		}
		var len = _array.length, start = 0, end, lo, hi, tmp;
		while (start < len) {
			if (levels[start] >= lev) {
				end = start + 1;
				while (end < len && levels[end] >= lev) end++;
				for (lo = start, hi = end - 1; lo < hi; lo++, hi--) {
					tmp = _array[lo];
					_array[lo] = _array[hi];
					_array[hi] = tmp;
				}
				start = end;
			}
			start++;
		}
	}
	function _getCharClass(chars, types, classes, ix) {
		var cType = types[ix], wType, nType, len, i;
		switch (cType) {
			case L:
			case R: lastArabic = false;
			case ON:
			case AN: return cType;
			case EN: return lastArabic ? AN : EN;
			case AL:
				lastArabic = true;
				return R;
			case WS: return ON;
			case CS:
				if (ix < 1 || ix + 1 >= types.length || (wType = classes[ix - 1]) != EN && wType != AN || (nType = types[ix + 1]) != EN && nType != AN) return ON;
				if (lastArabic) nType = AN;
				return nType == wType ? nType : ON;
			case ES:
				wType = ix > 0 ? classes[ix - 1] : B;
				if (wType == EN && ix + 1 < types.length && types[ix + 1] == EN) return EN;
				return ON;
			case ET:
				if (ix > 0 && classes[ix - 1] == EN) return EN;
				if (lastArabic) return ON;
				i = ix + 1;
				len = types.length;
				while (i < len && types[i] == ET) i++;
				if (i < len && types[i] == EN) return EN;
				return ON;
			case NSM:
				len = types.length;
				i = ix + 1;
				while (i < len && types[i] == NSM) i++;
				if (i < len) {
					var c = chars[ix], rtlCandidate = c >= 1425 && c <= 2303 || c == 64286;
					wType = types[i];
					if (rtlCandidate && (wType == R || wType == AL)) return R;
				}
				if (ix < 1 || (wType = types[ix - 1]) == B) return ON;
				return classes[ix - 1];
			case B:
				lastArabic = false;
				hasUBAT_B = true;
				return dir;
			case S:
				hasUBAT_S = true;
				return ON;
			case LRE:
			case RLE:
			case LRO:
			case RLO:
			case PDF: lastArabic = false;
			case BN: return ON;
		}
	}
	function _getCharacterType(ch) {
		var uc = ch.charCodeAt(0), hi = uc >> 8;
		if (hi == 0) return uc > 191 ? L : UnicodeTBL00[uc];
		else if (hi == 5) return /[\u0591-\u05f4]/.test(ch) ? R : L;
		else if (hi == 6) if (/[\u0610-\u061a\u064b-\u065f\u06d6-\u06e4\u06e7-\u06ed]/.test(ch)) return NSM;
		else if (/[\u0660-\u0669\u066b-\u066c]/.test(ch)) return AN;
		else if (uc == 1642) return ET;
		else if (/[\u06f0-\u06f9]/.test(ch)) return EN;
		else return AL;
		else if (hi == 32 && uc <= 8287) return UnicodeTBL20[uc & 255];
		else if (hi == 254) return uc >= 65136 ? AL : ON;
		return ON;
	}
	exports.L = L;
	exports.R = R;
	exports.EN = EN;
	exports.ON_R = 3;
	exports.AN = 4;
	exports.R_H = 5;
	exports.B = 6;
	exports.RLE = 7;
	exports.DOT = "·";
	exports.doBidiReorder = function(text, textCharTypes, isRtl) {
		if (text.length < 2) return {};
		var chars = text.split(""), logicalFromVisual = new Array(chars.length), bidiLevels = new Array(chars.length), levels = [];
		dir = isRtl ? RTL : LTR;
		_computeLevels(chars, levels, chars.length, textCharTypes);
		for (var i = 0; i < logicalFromVisual.length; logicalFromVisual[i] = i, i++);
		_invertLevel(2, levels, logicalFromVisual);
		_invertLevel(1, levels, logicalFromVisual);
		for (var i = 0; i < logicalFromVisual.length - 1; i++) if (textCharTypes[i] === AN) levels[i] = exports.AN;
		else if (levels[i] === R && (textCharTypes[i] > AL && textCharTypes[i] < LRE || textCharTypes[i] === ON || textCharTypes[i] === BN)) levels[i] = exports.ON_R;
		else if (i > 0 && chars[i - 1] === "ل" && /\u0622|\u0623|\u0625|\u0627/.test(chars[i])) {
			levels[i - 1] = levels[i] = exports.R_H;
			i++;
		}
		if (chars[chars.length - 1] === exports.DOT) levels[chars.length - 1] = exports.B;
		if (chars[0] === "‫") levels[0] = exports.RLE;
		for (var i = 0; i < logicalFromVisual.length; i++) bidiLevels[i] = levels[logicalFromVisual[i]];
		return {
			"logicalFromVisual": logicalFromVisual,
			"bidiLevels": bidiLevels
		};
	};
	exports.hasBidiCharacters = function(text, textCharTypes) {
		var ret = false;
		for (var i = 0; i < text.length; i++) {
			textCharTypes[i] = _getCharacterType(text.charAt(i));
			if (!ret && (textCharTypes[i] == R || textCharTypes[i] == AL || textCharTypes[i] == AN)) ret = true;
		}
		return ret;
	};
	exports.getVisualFromLogicalIdx = function(logIdx, rowMap) {
		for (var i = 0; i < rowMap.logicalFromVisual.length; i++) if (rowMap.logicalFromVisual[i] == logIdx) return i;
		return 0;
	};
}));
var require_bidihandler = /* @__PURE__ */ __commonJSMin(((exports) => {
	var bidiUtil = require_bidiutil();
	var lang$3 = require_lang();
	var bidiRE = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac\u202B]/;
	var BidiHandler$1 = class {
		constructor(session) {
			this.session = session;
			this.bidiMap = {};
			this.currentRow = null;
			this.bidiUtil = bidiUtil;
			this.charWidths = [];
			this.EOL = "¬";
			this.showInvisibles = true;
			this.isRtlDir = false;
			this.$isRtl = false;
			this.line = "";
			this.wrapIndent = 0;
			this.EOF = "¶";
			this.RLE = "‫";
			this.contentWidth = 0;
			this.fontMetrics = null;
			this.rtlLineOffset = 0;
			this.wrapOffset = 0;
			this.isMoveLeftOperation = false;
			this.seenBidi = bidiRE.test(session.getValue());
		}
		isBidiRow(screenRow, docRow, splitIndex) {
			if (!this.seenBidi) return false;
			if (screenRow !== this.currentRow) {
				this.currentRow = screenRow;
				this.updateRowLine(docRow, splitIndex);
				this.updateBidiMap();
			}
			return this.bidiMap.bidiLevels;
		}
		onChange(delta) {
			if (!this.seenBidi) {
				if (delta.action == "insert" && bidiRE.test(delta.lines.join("\n"))) {
					this.seenBidi = true;
					this.currentRow = null;
				}
			} else this.currentRow = null;
		}
		getDocumentRow() {
			var docRow = 0;
			var rowCache = this.session.$screenRowCache;
			if (rowCache.length) {
				var index = this.session.$getRowCacheIndex(rowCache, this.currentRow);
				if (index >= 0) docRow = this.session.$docRowCache[index];
			}
			return docRow;
		}
		getSplitIndex() {
			var splitIndex = 0;
			var rowCache = this.session.$screenRowCache;
			if (rowCache.length) {
				var currentIndex, prevIndex = this.session.$getRowCacheIndex(rowCache, this.currentRow);
				while (this.currentRow - splitIndex > 0) {
					currentIndex = this.session.$getRowCacheIndex(rowCache, this.currentRow - splitIndex - 1);
					if (currentIndex !== prevIndex) break;
					prevIndex = currentIndex;
					splitIndex++;
				}
			} else splitIndex = this.currentRow;
			return splitIndex;
		}
		updateRowLine(docRow, splitIndex) {
			if (docRow === void 0) docRow = this.getDocumentRow();
			var endOfLine = docRow === this.session.getLength() - 1 ? this.EOF : this.EOL;
			this.wrapIndent = 0;
			this.line = this.session.getLine(docRow);
			this.isRtlDir = this.$isRtl || this.line.charAt(0) === this.RLE;
			if (this.session.$useWrapMode) {
				var splits = this.session.$wrapData[docRow];
				if (splits) {
					if (splitIndex === void 0) splitIndex = this.getSplitIndex();
					if (splitIndex > 0 && splits.length) {
						this.wrapIndent = splits.indent;
						this.wrapOffset = this.wrapIndent * this.charWidths[bidiUtil.L];
						this.line = splitIndex < splits.length ? this.line.substring(splits[splitIndex - 1], splits[splitIndex]) : this.line.substring(splits[splits.length - 1]);
					} else this.line = this.line.substring(0, splits[splitIndex]);
					if (splitIndex == splits.length) this.line += this.showInvisibles ? endOfLine : bidiUtil.DOT;
				}
			} else this.line += this.showInvisibles ? endOfLine : bidiUtil.DOT;
			var session = this.session, shift$1 = 0, size;
			this.line = this.line.replace(/\t|[\u1100-\u2029, \u202F-\uFFE6]/g, function(ch, i) {
				if (ch === "	" || session.isFullWidth(ch.charCodeAt(0))) {
					size = ch === "	" ? session.getScreenTabSize(i + shift$1) : 2;
					shift$1 += size - 1;
					return lang$3.stringRepeat(bidiUtil.DOT, size);
				}
				return ch;
			});
			if (this.isRtlDir) {
				this.fontMetrics.$main.textContent = this.line.charAt(this.line.length - 1) == bidiUtil.DOT ? this.line.substr(0, this.line.length - 1) : this.line;
				this.rtlLineOffset = this.contentWidth - this.fontMetrics.$main.getBoundingClientRect().width;
			}
		}
		updateBidiMap() {
			var textCharTypes = [];
			if (bidiUtil.hasBidiCharacters(this.line, textCharTypes) || this.isRtlDir) this.bidiMap = bidiUtil.doBidiReorder(this.line, textCharTypes, this.isRtlDir);
			else this.bidiMap = {};
		}
		markAsDirty() {
			this.currentRow = null;
		}
		updateCharacterWidths(fontMetrics) {
			if (this.characterWidth === fontMetrics.$characterSize.width) return;
			this.fontMetrics = fontMetrics;
			var characterWidth = this.characterWidth = fontMetrics.$characterSize.width;
			var bidiCharWidth = fontMetrics.$measureCharWidth("ה");
			this.charWidths[bidiUtil.L] = this.charWidths[bidiUtil.EN] = this.charWidths[bidiUtil.ON_R] = characterWidth;
			this.charWidths[bidiUtil.R] = this.charWidths[bidiUtil.AN] = bidiCharWidth;
			this.charWidths[bidiUtil.R_H] = bidiCharWidth * .45;
			this.charWidths[bidiUtil.B] = this.charWidths[bidiUtil.RLE] = 0;
			this.currentRow = null;
		}
		setShowInvisibles(showInvisibles) {
			this.showInvisibles = showInvisibles;
			this.currentRow = null;
		}
		setEolChar(eolChar) {
			this.EOL = eolChar;
		}
		setContentWidth(width) {
			this.contentWidth = width;
		}
		isRtlLine(row) {
			if (this.$isRtl) return true;
			if (row != void 0) return this.session.getLine(row).charAt(0) == this.RLE;
			else return this.isRtlDir;
		}
		setRtlDirection(editor, isRtlDir) {
			var cursor = editor.getCursorPosition();
			for (var row = editor.selection.getSelectionAnchor().row; row <= cursor.row; row++) if (!isRtlDir && editor.session.getLine(row).charAt(0) === editor.session.$bidiHandler.RLE) editor.session.doc.removeInLine(row, 0, 1);
			else if (isRtlDir && editor.session.getLine(row).charAt(0) !== editor.session.$bidiHandler.RLE) editor.session.doc.insert({
				column: 0,
				row
			}, editor.session.$bidiHandler.RLE);
		}
		getPosLeft(col) {
			col -= this.wrapIndent;
			var leftBoundary = this.line.charAt(0) === this.RLE ? 1 : 0;
			var logicalIdx = col > leftBoundary ? this.session.getOverwrite() ? col : col - 1 : leftBoundary;
			var visualIdx = bidiUtil.getVisualFromLogicalIdx(logicalIdx, this.bidiMap), levels = this.bidiMap.bidiLevels, left = 0;
			if (!this.session.getOverwrite() && col <= leftBoundary && levels[visualIdx] % 2 !== 0) visualIdx++;
			for (var i = 0; i < visualIdx; i++) left += this.charWidths[levels[i]];
			if (!this.session.getOverwrite() && col > leftBoundary && levels[visualIdx] % 2 === 0) left += this.charWidths[levels[visualIdx]];
			if (this.wrapIndent) left += this.isRtlDir ? -1 * this.wrapOffset : this.wrapOffset;
			if (this.isRtlDir) left += this.rtlLineOffset;
			return left;
		}
		getSelections(startCol, endCol) {
			var map = this.bidiMap, levels = map.bidiLevels, level, selections = [], offset = 0, selColMin = Math.min(startCol, endCol) - this.wrapIndent, selColMax = Math.max(startCol, endCol) - this.wrapIndent, isSelected = false, isSelectedPrev = false, selectionStart = 0;
			if (this.wrapIndent) offset += this.isRtlDir ? -1 * this.wrapOffset : this.wrapOffset;
			for (var logIdx, visIdx = 0; visIdx < levels.length; visIdx++) {
				logIdx = map.logicalFromVisual[visIdx];
				level = levels[visIdx];
				isSelected = logIdx >= selColMin && logIdx < selColMax;
				if (isSelected && !isSelectedPrev) selectionStart = offset;
				else if (!isSelected && isSelectedPrev) selections.push({
					left: selectionStart,
					width: offset - selectionStart
				});
				offset += this.charWidths[level];
				isSelectedPrev = isSelected;
			}
			if (isSelected && visIdx === levels.length) selections.push({
				left: selectionStart,
				width: offset - selectionStart
			});
			if (this.isRtlDir) for (var i = 0; i < selections.length; i++) selections[i].left += this.rtlLineOffset;
			return selections;
		}
		offsetToCol(posX) {
			if (this.isRtlDir) posX -= this.rtlLineOffset;
			var logicalIdx = 0, posX = Math.max(posX, 0), offset = 0, visualIdx = 0, levels = this.bidiMap.bidiLevels, charWidth = this.charWidths[levels[visualIdx]];
			if (this.wrapIndent) posX -= this.isRtlDir ? -1 * this.wrapOffset : this.wrapOffset;
			while (posX > offset + charWidth / 2) {
				offset += charWidth;
				if (visualIdx === levels.length - 1) {
					charWidth = 0;
					break;
				}
				charWidth = this.charWidths[levels[++visualIdx]];
			}
			if (visualIdx > 0 && levels[visualIdx - 1] % 2 !== 0 && levels[visualIdx] % 2 === 0) {
				if (posX < offset) visualIdx--;
				logicalIdx = this.bidiMap.logicalFromVisual[visualIdx];
			} else if (visualIdx > 0 && levels[visualIdx - 1] % 2 === 0 && levels[visualIdx] % 2 !== 0) logicalIdx = 1 + (posX > offset ? this.bidiMap.logicalFromVisual[visualIdx] : this.bidiMap.logicalFromVisual[visualIdx - 1]);
			else if (this.isRtlDir && visualIdx === levels.length - 1 && charWidth === 0 && levels[visualIdx - 1] % 2 === 0 || !this.isRtlDir && visualIdx === 0 && levels[visualIdx] % 2 !== 0) logicalIdx = 1 + this.bidiMap.logicalFromVisual[visualIdx];
			else {
				if (visualIdx > 0 && levels[visualIdx - 1] % 2 !== 0 && charWidth !== 0) visualIdx--;
				logicalIdx = this.bidiMap.logicalFromVisual[visualIdx];
			}
			if (logicalIdx === 0 && this.isRtlDir) logicalIdx++;
			return logicalIdx + this.wrapIndent;
		}
	};
	exports.BidiHandler = BidiHandler$1;
}));
var require_selection = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$4 = require_oop();
	var lang$2 = require_lang();
	var EventEmitter$4 = require_event_emitter().EventEmitter;
	var Range$7 = require_range().Range;
	var Selection$1 = class {
		constructor(session) {
			this.session = session;
			this.doc = session.getDocument();
			this.clearSelection();
			this.cursor = this.lead = this.doc.createAnchor(0, 0);
			this.anchor = this.doc.createAnchor(0, 0);
			this.$silent = false;
			var self = this;
			this.cursor.on("change", function(e) {
				self.$cursorChanged = true;
				if (!self.$silent) self._emit("changeCursor");
				if (!self.$isEmpty && !self.$silent) self._emit("changeSelection");
				if (!self.$keepDesiredColumnOnChange && e.old.column != e.value.column) self.$desiredColumn = null;
			});
			this.anchor.on("change", function() {
				self.$anchorChanged = true;
				if (!self.$isEmpty && !self.$silent) self._emit("changeSelection");
			});
		}
		isEmpty() {
			return this.$isEmpty || this.anchor.row == this.lead.row && this.anchor.column == this.lead.column;
		}
		isMultiLine() {
			return !this.$isEmpty && this.anchor.row != this.cursor.row;
		}
		getCursor() {
			return this.lead.getPosition();
		}
		setAnchor(row, column) {
			this.$isEmpty = false;
			this.anchor.setPosition(row, column);
		}
		getAnchor() {
			if (this.$isEmpty) return this.getSelectionLead();
			return this.anchor.getPosition();
		}
		getSelectionLead() {
			return this.lead.getPosition();
		}
		isBackwards() {
			var anchor = this.anchor;
			var lead = this.lead;
			return anchor.row > lead.row || anchor.row == lead.row && anchor.column > lead.column;
		}
		getRange() {
			var anchor = this.anchor;
			var lead = this.lead;
			if (this.$isEmpty) return Range$7.fromPoints(lead, lead);
			return this.isBackwards() ? Range$7.fromPoints(lead, anchor) : Range$7.fromPoints(anchor, lead);
		}
		clearSelection() {
			if (!this.$isEmpty) {
				this.$isEmpty = true;
				this._emit("changeSelection");
			}
		}
		selectAll() {
			this.$setSelection(0, 0, Number.MAX_VALUE, Number.MAX_VALUE);
		}
		setRange(range, reverse) {
			var start = reverse ? range.end : range.start;
			var end = reverse ? range.start : range.end;
			this.$setSelection(start.row, start.column, end.row, end.column);
		}
		$setSelection(anchorRow, anchorColumn, cursorRow, cursorColumn) {
			if (this.$silent) return;
			var wasEmpty = this.$isEmpty;
			var wasMultiselect = this.inMultiSelectMode;
			this.$silent = true;
			this.$cursorChanged = this.$anchorChanged = false;
			this.anchor.setPosition(anchorRow, anchorColumn);
			this.cursor.setPosition(cursorRow, cursorColumn);
			this.$isEmpty = !Range$7.comparePoints(this.anchor, this.cursor);
			this.$silent = false;
			if (this.$cursorChanged) this._emit("changeCursor");
			if (this.$cursorChanged || this.$anchorChanged || wasEmpty != this.$isEmpty || wasMultiselect) this._emit("changeSelection");
		}
		$moveSelection(mover) {
			var lead = this.lead;
			if (this.$isEmpty) this.setSelectionAnchor(lead.row, lead.column);
			mover.call(this);
		}
		selectTo(row, column) {
			this.$moveSelection(function() {
				this.moveCursorTo(row, column);
			});
		}
		selectToPosition(pos) {
			this.$moveSelection(function() {
				this.moveCursorToPosition(pos);
			});
		}
		moveTo(row, column) {
			this.clearSelection();
			this.moveCursorTo(row, column);
		}
		moveToPosition(pos) {
			this.clearSelection();
			this.moveCursorToPosition(pos);
		}
		selectUp() {
			this.$moveSelection(this.moveCursorUp);
		}
		selectDown() {
			this.$moveSelection(this.moveCursorDown);
		}
		selectRight() {
			this.$moveSelection(this.moveCursorRight);
		}
		selectLeft() {
			this.$moveSelection(this.moveCursorLeft);
		}
		selectLineStart() {
			this.$moveSelection(this.moveCursorLineStart);
		}
		selectLineEnd() {
			this.$moveSelection(this.moveCursorLineEnd);
		}
		selectFileEnd() {
			this.$moveSelection(this.moveCursorFileEnd);
		}
		selectFileStart() {
			this.$moveSelection(this.moveCursorFileStart);
		}
		selectWordRight() {
			this.$moveSelection(this.moveCursorWordRight);
		}
		selectWordLeft() {
			this.$moveSelection(this.moveCursorWordLeft);
		}
		getWordRange(row, column) {
			if (typeof column == "undefined") {
				var cursor = row || this.lead;
				row = cursor.row;
				column = cursor.column;
			}
			return this.session.getWordRange(row, column);
		}
		selectWord() {
			this.setSelectionRange(this.getWordRange());
		}
		selectAWord() {
			var cursor = this.getCursor();
			var range = this.session.getAWordRange(cursor.row, cursor.column);
			this.setSelectionRange(range);
		}
		getLineRange(row, excludeLastChar) {
			var rowStart = typeof row == "number" ? row : this.lead.row;
			var rowEnd;
			var foldLine = this.session.getFoldLine(rowStart);
			if (foldLine) {
				rowStart = foldLine.start.row;
				rowEnd = foldLine.end.row;
			} else rowEnd = rowStart;
			if (excludeLastChar === true) return new Range$7(rowStart, 0, rowEnd, this.session.getLine(rowEnd).length);
			else return new Range$7(rowStart, 0, rowEnd + 1, 0);
		}
		selectLine() {
			this.setSelectionRange(this.getLineRange());
		}
		moveCursorUp() {
			this.moveCursorBy(-1, 0);
		}
		moveCursorDown() {
			this.moveCursorBy(1, 0);
		}
		wouldMoveIntoSoftTab(cursor, tabSize, direction) {
			var start = cursor.column;
			var end = cursor.column + tabSize;
			if (direction < 0) {
				start = cursor.column - tabSize;
				end = cursor.column;
			}
			return this.session.isTabStop(cursor) && this.doc.getLine(cursor.row).slice(start, end).split(" ").length - 1 == tabSize;
		}
		moveCursorLeft() {
			var cursor = this.lead.getPosition(), fold;
			if (fold = this.session.getFoldAt(cursor.row, cursor.column, -1)) this.moveCursorTo(fold.start.row, fold.start.column);
			else if (cursor.column === 0) {
				if (cursor.row > 0) this.moveCursorTo(cursor.row - 1, this.doc.getLine(cursor.row - 1).length);
			} else {
				var tabSize = this.session.getTabSize();
				if (this.wouldMoveIntoSoftTab(cursor, tabSize, -1) && !this.session.getNavigateWithinSoftTabs()) this.moveCursorBy(0, -tabSize);
				else this.moveCursorBy(0, -1);
			}
		}
		moveCursorRight() {
			var cursor = this.lead.getPosition(), fold;
			if (fold = this.session.getFoldAt(cursor.row, cursor.column, 1)) this.moveCursorTo(fold.end.row, fold.end.column);
			else if (this.lead.column == this.doc.getLine(this.lead.row).length) {
				if (this.lead.row < this.doc.getLength() - 1) this.moveCursorTo(this.lead.row + 1, 0);
			} else {
				var tabSize = this.session.getTabSize();
				var cursor = this.lead;
				if (this.wouldMoveIntoSoftTab(cursor, tabSize, 1) && !this.session.getNavigateWithinSoftTabs()) this.moveCursorBy(0, tabSize);
				else this.moveCursorBy(0, 1);
			}
		}
		moveCursorLineStart() {
			var row = this.lead.row;
			var column = this.lead.column;
			var screenRow = this.session.documentToScreenRow(row, column);
			var firstColumnPosition = this.session.screenToDocumentPosition(screenRow, 0);
			var leadingSpace = this.session.getDisplayLine(row, null, firstColumnPosition.row, firstColumnPosition.column).match(/^\s*/);
			if (leadingSpace[0].length != column && !this.session.$useEmacsStyleLineStart) firstColumnPosition.column += leadingSpace[0].length;
			this.moveCursorToPosition(firstColumnPosition);
		}
		moveCursorLineEnd() {
			var lead = this.lead;
			var lineEnd = this.session.getDocumentLastRowColumnPosition(lead.row, lead.column);
			if (this.lead.column == lineEnd.column) {
				var line = this.session.getLine(lineEnd.row);
				if (lineEnd.column == line.length) {
					var textEnd = line.search(/\s+$/);
					if (textEnd > 0) lineEnd.column = textEnd;
				}
			}
			this.moveCursorTo(lineEnd.row, lineEnd.column);
		}
		moveCursorFileEnd() {
			var row = this.doc.getLength() - 1;
			var column = this.doc.getLine(row).length;
			this.moveCursorTo(row, column);
		}
		moveCursorFileStart() {
			this.moveCursorTo(0, 0);
		}
		moveCursorLongWordRight() {
			var row = this.lead.row;
			var column = this.lead.column;
			var line = this.doc.getLine(row);
			var rightOfCursor = line.substring(column);
			this.session.nonTokenRe.lastIndex = 0;
			this.session.tokenRe.lastIndex = 0;
			var fold = this.session.getFoldAt(row, column, 1);
			if (fold) {
				this.moveCursorTo(fold.end.row, fold.end.column);
				return;
			}
			if (this.session.nonTokenRe.exec(rightOfCursor)) {
				column += this.session.nonTokenRe.lastIndex;
				this.session.nonTokenRe.lastIndex = 0;
				rightOfCursor = line.substring(column);
			}
			if (column >= line.length) {
				this.moveCursorTo(row, line.length);
				this.moveCursorRight();
				if (row < this.doc.getLength() - 1) this.moveCursorWordRight();
				return;
			}
			if (this.session.tokenRe.exec(rightOfCursor)) {
				column += this.session.tokenRe.lastIndex;
				this.session.tokenRe.lastIndex = 0;
			}
			this.moveCursorTo(row, column);
		}
		moveCursorLongWordLeft() {
			var row = this.lead.row;
			var column = this.lead.column;
			var fold;
			if (fold = this.session.getFoldAt(row, column, -1)) {
				this.moveCursorTo(fold.start.row, fold.start.column);
				return;
			}
			var str = this.session.getFoldStringAt(row, column, -1);
			if (str == null) str = this.doc.getLine(row).substring(0, column);
			var leftOfCursor = lang$2.stringReverse(str);
			this.session.nonTokenRe.lastIndex = 0;
			this.session.tokenRe.lastIndex = 0;
			if (this.session.nonTokenRe.exec(leftOfCursor)) {
				column -= this.session.nonTokenRe.lastIndex;
				leftOfCursor = leftOfCursor.slice(this.session.nonTokenRe.lastIndex);
				this.session.nonTokenRe.lastIndex = 0;
			}
			if (column <= 0) {
				this.moveCursorTo(row, 0);
				this.moveCursorLeft();
				if (row > 0) this.moveCursorWordLeft();
				return;
			}
			if (this.session.tokenRe.exec(leftOfCursor)) {
				column -= this.session.tokenRe.lastIndex;
				this.session.tokenRe.lastIndex = 0;
			}
			this.moveCursorTo(row, column);
		}
		$shortWordEndIndex(rightOfCursor) {
			var index = 0, ch;
			var whitespaceRe = /\s/;
			var tokenRe = this.session.tokenRe;
			tokenRe.lastIndex = 0;
			if (this.session.tokenRe.exec(rightOfCursor)) index = this.session.tokenRe.lastIndex;
			else {
				while ((ch = rightOfCursor[index]) && whitespaceRe.test(ch)) index++;
				if (index < 1) {
					tokenRe.lastIndex = 0;
					while ((ch = rightOfCursor[index]) && !tokenRe.test(ch)) {
						tokenRe.lastIndex = 0;
						index++;
						if (whitespaceRe.test(ch)) if (index > 2) {
							index--;
							break;
						} else {
							while ((ch = rightOfCursor[index]) && whitespaceRe.test(ch)) index++;
							if (index > 2) break;
						}
					}
				}
			}
			tokenRe.lastIndex = 0;
			return index;
		}
		moveCursorShortWordRight() {
			var row = this.lead.row;
			var column = this.lead.column;
			var line = this.doc.getLine(row);
			var rightOfCursor = line.substring(column);
			var fold = this.session.getFoldAt(row, column, 1);
			if (fold) return this.moveCursorTo(fold.end.row, fold.end.column);
			if (column == line.length) {
				var l = this.doc.getLength();
				do {
					row++;
					rightOfCursor = this.doc.getLine(row);
				} while (row < l && /^\s*$/.test(rightOfCursor));
				if (!/^\s+/.test(rightOfCursor)) rightOfCursor = "";
				column = 0;
			}
			var index = this.$shortWordEndIndex(rightOfCursor);
			this.moveCursorTo(row, column + index);
		}
		moveCursorShortWordLeft() {
			var row = this.lead.row;
			var column = this.lead.column;
			var fold;
			if (fold = this.session.getFoldAt(row, column, -1)) return this.moveCursorTo(fold.start.row, fold.start.column);
			var line = this.session.getLine(row).substring(0, column);
			if (column === 0) {
				do {
					row--;
					line = this.doc.getLine(row);
				} while (row > 0 && /^\s*$/.test(line));
				column = line.length;
				if (!/\s+$/.test(line)) line = "";
			}
			var leftOfCursor = lang$2.stringReverse(line);
			var index = this.$shortWordEndIndex(leftOfCursor);
			return this.moveCursorTo(row, column - index);
		}
		moveCursorWordRight() {
			if (this.session.$selectLongWords) this.moveCursorLongWordRight();
			else this.moveCursorShortWordRight();
		}
		moveCursorWordLeft() {
			if (this.session.$selectLongWords) this.moveCursorLongWordLeft();
			else this.moveCursorShortWordLeft();
		}
		moveCursorBy(rows, chars) {
			var screenPos = this.session.documentToScreenPosition(this.lead.row, this.lead.column);
			var offsetX;
			if (chars === 0) {
				if (rows !== 0) if (this.session.$bidiHandler.isBidiRow(screenPos.row, this.lead.row)) {
					offsetX = this.session.$bidiHandler.getPosLeft(screenPos.column);
					screenPos.column = Math.round(offsetX / this.session.$bidiHandler.charWidths[0]);
				} else offsetX = screenPos.column * this.session.$bidiHandler.charWidths[0];
				if (this.$desiredColumn) screenPos.column = this.$desiredColumn;
				else this.$desiredColumn = screenPos.column;
			}
			if (rows != 0 && this.session.lineWidgets && this.session.lineWidgets[this.lead.row]) {
				var widget = this.session.lineWidgets[this.lead.row];
				if (rows < 0) rows -= widget.rowsAbove || 0;
				else if (rows > 0) rows += widget.rowCount - (widget.rowsAbove || 0);
			}
			var docPos = this.session.screenToDocumentPosition(screenPos.row + rows, screenPos.column, offsetX);
			if (rows !== 0 && chars === 0 && docPos.row === this.lead.row && docPos.column === this.lead.column) {}
			this.moveCursorTo(docPos.row, docPos.column + chars, chars === 0);
		}
		moveCursorToPosition(position) {
			this.moveCursorTo(position.row, position.column);
		}
		moveCursorTo(row, column, keepDesiredColumn) {
			var fold = this.session.getFoldAt(row, column, 1);
			if (fold) {
				row = fold.start.row;
				column = fold.start.column;
			}
			this.$keepDesiredColumnOnChange = true;
			var line = this.session.getLine(row);
			if (/[\uDC00-\uDFFF]/.test(line.charAt(column)) && line.charAt(column - 1)) if (this.lead.row == row && this.lead.column == column + 1) column = column - 1;
			else column = column + 1;
			this.lead.setPosition(row, column);
			this.$keepDesiredColumnOnChange = false;
			if (!keepDesiredColumn) this.$desiredColumn = null;
		}
		moveCursorToScreen(row, column, keepDesiredColumn) {
			var pos = this.session.screenToDocumentPosition(row, column);
			this.moveCursorTo(pos.row, pos.column, keepDesiredColumn);
		}
		detach() {
			this.lead.detach();
			this.anchor.detach();
		}
		fromOrientedRange(range) {
			this.setSelectionRange(range, range.cursor == range.start);
			this.$desiredColumn = range.desiredColumn || this.$desiredColumn;
		}
		toOrientedRange(range) {
			var r = this.getRange();
			if (range) {
				range.start.column = r.start.column;
				range.start.row = r.start.row;
				range.end.column = r.end.column;
				range.end.row = r.end.row;
			} else range = r;
			range.cursor = this.isBackwards() ? range.start : range.end;
			range.desiredColumn = this.$desiredColumn;
			return range;
		}
		getRangeOfMovements(func) {
			var start = this.getCursor();
			try {
				func(this);
				var end = this.getCursor();
				return Range$7.fromPoints(start, end);
			} catch (e) {
				return Range$7.fromPoints(start, start);
			} finally {
				this.moveCursorToPosition(start);
			}
		}
		toJSON() {
			if (this.rangeCount) var data = this.ranges.map(function(r) {
				var r1 = r.clone();
				r1.isBackwards = r.cursor == r.start;
				return r1;
			});
			else {
				var data = this.getRange();
				data.isBackwards = this.isBackwards();
			}
			return data;
		}
		fromJSON(data) {
			if (data.start == void 0) if (this.rangeList && data.length > 1) {
				this.toSingleRange(data[0]);
				for (var i = data.length; i--;) {
					var r = Range$7.fromPoints(data[i].start, data[i].end);
					if (data[i].isBackwards) r.cursor = r.start;
					this.addRange(r, true);
				}
				return;
			} else data = data[0];
			if (this.rangeList) this.toSingleRange(data);
			this.setSelectionRange(data, data.isBackwards);
		}
		isEqual(data) {
			if ((data.length || this.rangeCount) && data.length != this.rangeCount) return false;
			if (!data.length || !this.ranges) return this.getRange().isEqual(data);
			for (var i = this.ranges.length; i--;) if (!this.ranges[i].isEqual(data[i])) return false;
			return true;
		}
	};
	Selection$1.prototype.setSelectionAnchor = Selection$1.prototype.setAnchor;
	Selection$1.prototype.getSelectionAnchor = Selection$1.prototype.getAnchor;
	Selection$1.prototype.setSelectionRange = Selection$1.prototype.setRange;
	oop$4.implement(Selection$1.prototype, EventEmitter$4);
	exports.Selection = Selection$1;
}));
var require_line_widgets = /* @__PURE__ */ __commonJSMin(((exports) => {
	var dom = require_dom();
	var LineWidgets$1 = class {
		constructor(session) {
			this.session = session;
			this.session.widgetManager = this;
			this.session.getRowLength = this.getRowLength;
			this.session.$getWidgetScreenLength = this.$getWidgetScreenLength;
			this.updateOnChange = this.updateOnChange.bind(this);
			this.renderWidgets = this.renderWidgets.bind(this);
			this.measureWidgets = this.measureWidgets.bind(this);
			this.session._changedWidgets = [];
			this.$onChangeEditor = this.$onChangeEditor.bind(this);
			this.session.on("change", this.updateOnChange);
			this.session.on("changeFold", this.updateOnFold);
			this.session.on("changeEditor", this.$onChangeEditor);
		}
		getRowLength(row) {
			var h;
			if (this.lineWidgets) h = this.lineWidgets[row] && this.lineWidgets[row].rowCount || 0;
			else h = 0;
			if (!this["$useWrapMode"] || !this["$wrapData"][row]) return 1 + h;
			else return this["$wrapData"][row].length + 1 + h;
		}
		$getWidgetScreenLength() {
			var screenRows = 0;
			this.lineWidgets.forEach(function(w) {
				if (w && w.rowCount && !w.hidden) screenRows += w.rowCount;
			});
			return screenRows;
		}
		$onChangeEditor(e) {
			this.attach(e.editor);
		}
		attach(editor) {
			if (editor && editor.widgetManager && editor.widgetManager != this) editor.widgetManager.detach();
			if (this.editor == editor) return;
			this.detach();
			this.editor = editor;
			if (editor) {
				editor.widgetManager = this;
				editor.renderer.on("beforeRender", this.measureWidgets);
				editor.renderer.on("afterRender", this.renderWidgets);
			}
		}
		detach(e) {
			var editor = this.editor;
			if (!editor) return;
			this.editor = null;
			editor.widgetManager = null;
			editor.renderer.off("beforeRender", this.measureWidgets);
			editor.renderer.off("afterRender", this.renderWidgets);
			var lineWidgets = this.session.lineWidgets;
			lineWidgets && lineWidgets.forEach(function(w) {
				if (w && w.el && w.el.parentNode) {
					w._inDocument = false;
					w.el.parentNode.removeChild(w.el);
				}
			});
		}
		updateOnFold(e, session) {
			var lineWidgets = session.lineWidgets;
			if (!lineWidgets || !e.action) return;
			var fold = e.data;
			var start = fold.start.row;
			var end = fold.end.row;
			var hide = e.action == "add";
			for (var i = start + 1; i < end; i++) if (lineWidgets[i]) lineWidgets[i].hidden = hide;
			if (lineWidgets[end]) if (hide) if (!lineWidgets[start]) lineWidgets[start] = lineWidgets[end];
			else lineWidgets[end].hidden = hide;
			else {
				if (lineWidgets[start] == lineWidgets[end]) lineWidgets[start] = void 0;
				lineWidgets[end].hidden = hide;
			}
		}
		updateOnChange(delta) {
			var lineWidgets = this.session.lineWidgets;
			if (!lineWidgets) return;
			var startRow = delta.start.row;
			var len = delta.end.row - startRow;
			if (len === 0) {} else if (delta.action == "remove") {
				var removed = lineWidgets.splice(startRow + 1, len);
				if (!lineWidgets[startRow] && removed[removed.length - 1]) lineWidgets[startRow] = removed.pop();
				removed.forEach(function(w) {
					w && this.removeLineWidget(w);
				}, this);
				this.$updateRows();
			} else {
				var args = new Array(len);
				if (lineWidgets[startRow] && lineWidgets[startRow].column != null) {
					if (delta.start.column > lineWidgets[startRow].column) startRow++;
				}
				args.unshift(startRow, 0);
				lineWidgets.splice.apply(lineWidgets, args);
				this.$updateRows();
			}
		}
		$updateRows() {
			var lineWidgets = this.session.lineWidgets;
			if (!lineWidgets) return;
			var noWidgets = true;
			lineWidgets.forEach(function(w, i) {
				if (w) {
					noWidgets = false;
					w.row = i;
					while (w.$oldWidget) {
						w.$oldWidget.row = i;
						w = w.$oldWidget;
					}
				}
			});
			if (noWidgets) this.session.lineWidgets = null;
		}
		$registerLineWidget(w) {
			if (!this.session.lineWidgets) this.session.lineWidgets = new Array(this.session.getLength());
			var old = this.session.lineWidgets[w.row];
			if (old) {
				w.$oldWidget = old;
				if (old.el && old.el.parentNode) {
					old.el.parentNode.removeChild(old.el);
					old._inDocument = false;
				}
			}
			this.session.lineWidgets[w.row] = w;
			return w;
		}
		addLineWidget(w) {
			this.$registerLineWidget(w);
			w.session = this.session;
			if (!this.editor) return w;
			var renderer = this.editor.renderer;
			if (w.html && !w.el) {
				w.el = dom.createElement("div");
				w.el.innerHTML = w.html;
			}
			if (w.text && !w.el) {
				w.el = dom.createElement("div");
				w.el.textContent = w.text;
			}
			if (w.el) {
				dom.addCssClass(w.el, "ace_lineWidgetContainer");
				if (w.className) dom.addCssClass(w.el, w.className);
				w.el.style.position = "absolute";
				w.el.style.zIndex = "5";
				renderer.container.appendChild(w.el);
				w._inDocument = true;
				if (!w.coverGutter) w.el.style.zIndex = "3";
				if (w.pixelHeight == null) w.pixelHeight = w.el.offsetHeight;
			}
			if (w.rowCount == null) w.rowCount = w.pixelHeight / renderer.layerConfig.lineHeight;
			var fold = this.session.getFoldAt(w.row, 0);
			w.$fold = fold;
			if (fold) {
				var lineWidgets = this.session.lineWidgets;
				if (w.row == fold.end.row && !lineWidgets[fold.start.row]) lineWidgets[fold.start.row] = w;
				else w.hidden = true;
			}
			this.session._emit("changeFold", { data: { start: { row: w.row } } });
			this.$updateRows();
			this.renderWidgets(null, renderer);
			this.onWidgetChanged(w);
			return w;
		}
		removeLineWidget(w) {
			w._inDocument = false;
			w.session = null;
			if (w.el && w.el.parentNode) w.el.parentNode.removeChild(w.el);
			if (w.editor && w.editor.destroy) try {
				w.editor.destroy();
			} catch (e) {}
			if (this.session.lineWidgets) {
				var w1 = this.session.lineWidgets[w.row];
				if (w1 == w) {
					this.session.lineWidgets[w.row] = w.$oldWidget;
					if (w.$oldWidget) this.onWidgetChanged(w.$oldWidget);
				} else while (w1) {
					if (w1.$oldWidget == w) {
						w1.$oldWidget = w.$oldWidget;
						break;
					}
					w1 = w1.$oldWidget;
				}
			}
			this.session._emit("changeFold", { data: { start: { row: w.row } } });
			this.$updateRows();
		}
		getWidgetsAtRow(row) {
			var lineWidgets = this.session.lineWidgets;
			var w = lineWidgets && lineWidgets[row];
			var list = [];
			while (w) {
				list.push(w);
				w = w.$oldWidget;
			}
			return list;
		}
		onWidgetChanged(w) {
			this.session._changedWidgets.push(w);
			this.editor && this.editor.renderer.updateFull();
		}
		measureWidgets(e, renderer) {
			var changedWidgets = this.session._changedWidgets;
			var config$1 = renderer.layerConfig;
			if (!changedWidgets || !changedWidgets.length) return;
			var min = Infinity;
			for (var i = 0; i < changedWidgets.length; i++) {
				var w = changedWidgets[i];
				if (!w || !w.el) continue;
				if (w.session != this.session) continue;
				if (!w._inDocument) {
					if (this.session.lineWidgets[w.row] != w) continue;
					w._inDocument = true;
					renderer.container.appendChild(w.el);
				}
				w.h = w.el.offsetHeight;
				if (!w.fixedWidth) {
					w.w = w.el.offsetWidth;
					w.screenWidth = Math.ceil(w.w / config$1.characterWidth);
				}
				var rowCount = w.h / config$1.lineHeight;
				if (w.coverLine) {
					rowCount -= this.session.getRowLineCount(w.row);
					if (rowCount < 0) rowCount = 0;
				}
				if (w.rowCount != rowCount) {
					w.rowCount = rowCount;
					if (w.row < min) min = w.row;
				}
			}
			if (min != Infinity) {
				this.session._emit("changeFold", { data: { start: { row: min } } });
				this.session.lineWidgetWidth = null;
			}
			this.session._changedWidgets = [];
		}
		renderWidgets(e, renderer) {
			var config$1 = renderer.layerConfig;
			var lineWidgets = this.session.lineWidgets;
			if (!lineWidgets) return;
			var first = Math.min(this.firstRow, config$1.firstRow);
			var last = Math.max(this.lastRow, config$1.lastRow, lineWidgets.length);
			while (first > 0 && !lineWidgets[first]) first--;
			this.firstRow = config$1.firstRow;
			this.lastRow = config$1.lastRow;
			renderer.$cursorLayer.config = config$1;
			for (var i = first; i <= last; i++) {
				var w = lineWidgets[i];
				if (!w || !w.el) continue;
				if (w.hidden) {
					w.el.style.top = -100 - (w.pixelHeight || 0) + "px";
					continue;
				}
				if (!w._inDocument) {
					w._inDocument = true;
					renderer.container.appendChild(w.el);
				}
				var top = renderer.$cursorLayer.getPixelPosition({
					row: i,
					column: 0
				}, true).top;
				if (!w.coverLine) top += config$1.lineHeight * this.session.getRowLineCount(w.row);
				w.el.style.top = top - config$1.offset + "px";
				var left = w.coverGutter ? 0 : renderer.gutterWidth;
				if (!w.fixedWidth) left -= renderer.scrollLeft;
				w.el.style.left = left + "px";
				if (w.fullWidth && w.screenWidth) w.el.style.minWidth = config$1.width + 2 * config$1.padding + "px";
				if (w.fixedWidth) w.el.style.right = renderer.scrollBar.getWidth() + "px";
				else w.el.style.right = "";
			}
		}
	};
	exports.LineWidgets = LineWidgets$1;
}));
var require_apply_delta = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.applyDelta = function(docLines, delta, doNotValidate) {
		var row = delta.start.row;
		var startColumn = delta.start.column;
		var line = docLines[row] || "";
		switch (delta.action) {
			case "insert":
				if (delta.lines.length === 1) docLines[row] = line.substring(0, startColumn) + delta.lines[0] + line.substring(startColumn);
				else {
					var args = [row, 1].concat(delta.lines);
					docLines.splice.apply(docLines, args);
					docLines[row] = line.substring(0, startColumn) + docLines[row];
					docLines[row + delta.lines.length - 1] += line.substring(startColumn);
				}
				break;
			case "remove":
				var endColumn = delta.end.column;
				var endRow = delta.end.row;
				if (row === endRow) docLines[row] = line.substring(0, startColumn) + line.substring(endColumn);
				else docLines.splice(row, endRow - row + 1, line.substring(0, startColumn) + docLines[endRow].substring(endColumn));
				break;
		}
	};
}));
var require_anchor = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$3 = require_oop();
	var EventEmitter$3 = require_event_emitter().EventEmitter;
	var Anchor$1 = class {
		constructor(doc, row, column) {
			this.$onChange = this.onChange.bind(this);
			this.attach(doc);
			if (typeof row != "number") this.setPosition(row.row, row.column);
			else this.setPosition(row, column);
		}
		getPosition() {
			return this.$clipPositionToDocument(this.row, this.column);
		}
		getDocument() {
			return this.document;
		}
		onChange(delta) {
			if (delta.start.row == delta.end.row && delta.start.row != this.row) return;
			if (delta.start.row > this.row) return;
			var point = $getTransformedPoint(delta, {
				row: this.row,
				column: this.column
			}, this.$insertRight);
			this.setPosition(point.row, point.column, true);
		}
		setPosition(row, column, noClip) {
			var pos;
			if (noClip) pos = {
				row,
				column
			};
			else pos = this.$clipPositionToDocument(row, column);
			if (this.row == pos.row && this.column == pos.column) return;
			var old = {
				row: this.row,
				column: this.column
			};
			this.row = pos.row;
			this.column = pos.column;
			this._signal("change", {
				old,
				value: pos
			});
		}
		detach() {
			this.document.off("change", this.$onChange);
		}
		attach(doc) {
			this.document = doc || this.document;
			this.document.on("change", this.$onChange);
		}
		$clipPositionToDocument(row, column) {
			var pos = {};
			if (row >= this.document.getLength()) {
				pos.row = Math.max(0, this.document.getLength() - 1);
				pos.column = this.document.getLine(pos.row).length;
			} else if (row < 0) {
				pos.row = 0;
				pos.column = 0;
			} else {
				pos.row = row;
				pos.column = Math.min(this.document.getLine(pos.row).length, Math.max(0, column));
			}
			if (column < 0) pos.column = 0;
			return pos;
		}
	};
	Anchor$1.prototype.$insertRight = false;
	oop$3.implement(Anchor$1.prototype, EventEmitter$3);
	function $pointsInOrder(point1, point2, equalPointsInOrder) {
		var bColIsAfter = equalPointsInOrder ? point1.column <= point2.column : point1.column < point2.column;
		return point1.row < point2.row || point1.row == point2.row && bColIsAfter;
	}
	function $getTransformedPoint(delta, point, moveIfEqual) {
		var deltaIsInsert = delta.action == "insert";
		var deltaRowShift = (deltaIsInsert ? 1 : -1) * (delta.end.row - delta.start.row);
		var deltaColShift = (deltaIsInsert ? 1 : -1) * (delta.end.column - delta.start.column);
		var deltaStart = delta.start;
		var deltaEnd = deltaIsInsert ? deltaStart : delta.end;
		if ($pointsInOrder(point, deltaStart, moveIfEqual)) return {
			row: point.row,
			column: point.column
		};
		if ($pointsInOrder(deltaEnd, point, !moveIfEqual)) return {
			row: point.row + deltaRowShift,
			column: point.column + (point.row == deltaEnd.row ? deltaColShift : 0)
		};
		return {
			row: deltaStart.row,
			column: deltaStart.column
		};
	}
	exports.Anchor = Anchor$1;
}));
var require_document = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$2 = require_oop();
	var applyDelta = require_apply_delta().applyDelta;
	var EventEmitter$2 = require_event_emitter().EventEmitter;
	var Range$6 = require_range().Range;
	var Anchor = require_anchor().Anchor;
	var Document$1 = class {
		constructor(textOrLines) {
			this.$lines = [""];
			if (textOrLines.length === 0) this.$lines = [""];
			else if (Array.isArray(textOrLines)) this.insertMergedLines({
				row: 0,
				column: 0
			}, textOrLines);
			else this.insert({
				row: 0,
				column: 0
			}, textOrLines);
		}
		setValue(text) {
			var len = this.getLength() - 1;
			this.remove(new Range$6(0, 0, len, this.getLine(len).length));
			this.insert({
				row: 0,
				column: 0
			}, text || "");
		}
		getValue() {
			return this.getAllLines().join(this.getNewLineCharacter());
		}
		createAnchor(row, column) {
			return new Anchor(this, row, column);
		}
		$detectNewLine(text) {
			var match = text.match(/^.*?(\r\n|\r|\n)/m);
			this.$autoNewLine = match ? match[1] : "\n";
			this._signal("changeNewLineMode");
		}
		getNewLineCharacter() {
			switch (this.$newLineMode) {
				case "windows": return "\r\n";
				case "unix": return "\n";
				default: return this.$autoNewLine || "\n";
			}
		}
		setNewLineMode(newLineMode) {
			if (this.$newLineMode === newLineMode) return;
			this.$newLineMode = newLineMode;
			this._signal("changeNewLineMode");
		}
		getNewLineMode() {
			return this.$newLineMode;
		}
		isNewLine(text) {
			return text == "\r\n" || text == "\r" || text == "\n";
		}
		getLine(row) {
			return this.$lines[row] || "";
		}
		getLines(firstRow, lastRow) {
			return this.$lines.slice(firstRow, lastRow + 1);
		}
		getAllLines() {
			return this.getLines(0, this.getLength());
		}
		getLength() {
			return this.$lines.length;
		}
		getTextRange(range) {
			return this.getLinesForRange(range).join(this.getNewLineCharacter());
		}
		getLinesForRange(range) {
			var lines;
			if (range.start.row === range.end.row) lines = [this.getLine(range.start.row).substring(range.start.column, range.end.column)];
			else {
				lines = this.getLines(range.start.row, range.end.row);
				lines[0] = (lines[0] || "").substring(range.start.column);
				var l = lines.length - 1;
				if (range.end.row - range.start.row == l) lines[l] = lines[l].substring(0, range.end.column);
			}
			return lines;
		}
		insertLines(row, lines) {
			console.warn("Use of document.insertLines is deprecated. Use the insertFullLines method instead.");
			return this.insertFullLines(row, lines);
		}
		removeLines(firstRow, lastRow) {
			console.warn("Use of document.removeLines is deprecated. Use the removeFullLines method instead.");
			return this.removeFullLines(firstRow, lastRow);
		}
		insertNewLine(position) {
			console.warn("Use of document.insertNewLine is deprecated. Use insertMergedLines(position, ['', '']) instead.");
			return this.insertMergedLines(position, ["", ""]);
		}
		insert(position, text) {
			if (this.getLength() <= 1) this.$detectNewLine(text);
			return this.insertMergedLines(position, this.$split(text));
		}
		insertInLine(position, text) {
			var start = this.clippedPos(position.row, position.column);
			var end = this.pos(position.row, position.column + text.length);
			this.applyDelta({
				start,
				end,
				action: "insert",
				lines: [text]
			}, true);
			return this.clonePos(end);
		}
		clippedPos(row, column) {
			var length = this.getLength();
			if (row === void 0) row = length;
			else if (row < 0) row = 0;
			else if (row >= length) {
				row = length - 1;
				column = void 0;
			}
			var line = this.getLine(row);
			if (column == void 0) column = line.length;
			column = Math.min(Math.max(column, 0), line.length);
			return {
				row,
				column
			};
		}
		clonePos(pos) {
			return {
				row: pos.row,
				column: pos.column
			};
		}
		pos(row, column) {
			return {
				row,
				column
			};
		}
		$clipPosition(position) {
			var length = this.getLength();
			if (position.row >= length) {
				position.row = Math.max(0, length - 1);
				position.column = this.getLine(length - 1).length;
			} else {
				position.row = Math.max(0, position.row);
				position.column = Math.min(Math.max(position.column, 0), this.getLine(position.row).length);
			}
			return position;
		}
		insertFullLines(row, lines) {
			row = Math.min(Math.max(row, 0), this.getLength());
			var column = 0;
			if (row < this.getLength()) {
				lines = lines.concat([""]);
				column = 0;
			} else {
				lines = [""].concat(lines);
				row--;
				column = this.$lines[row].length;
			}
			this.insertMergedLines({
				row,
				column
			}, lines);
		}
		insertMergedLines(position, lines) {
			var start = this.clippedPos(position.row, position.column);
			var end = {
				row: start.row + lines.length - 1,
				column: (lines.length == 1 ? start.column : 0) + lines[lines.length - 1].length
			};
			this.applyDelta({
				start,
				end,
				action: "insert",
				lines
			});
			return this.clonePos(end);
		}
		remove(range) {
			var start = this.clippedPos(range.start.row, range.start.column);
			var end = this.clippedPos(range.end.row, range.end.column);
			this.applyDelta({
				start,
				end,
				action: "remove",
				lines: this.getLinesForRange({
					start,
					end
				})
			});
			return this.clonePos(start);
		}
		removeInLine(row, startColumn, endColumn) {
			var start = this.clippedPos(row, startColumn);
			var end = this.clippedPos(row, endColumn);
			this.applyDelta({
				start,
				end,
				action: "remove",
				lines: this.getLinesForRange({
					start,
					end
				})
			}, true);
			return this.clonePos(start);
		}
		removeFullLines(firstRow, lastRow) {
			firstRow = Math.min(Math.max(0, firstRow), this.getLength() - 1);
			lastRow = Math.min(Math.max(0, lastRow), this.getLength() - 1);
			var deleteFirstNewLine = lastRow == this.getLength() - 1 && firstRow > 0;
			var deleteLastNewLine = lastRow < this.getLength() - 1;
			var startRow = deleteFirstNewLine ? firstRow - 1 : firstRow;
			var startCol = deleteFirstNewLine ? this.getLine(startRow).length : 0;
			var endRow = deleteLastNewLine ? lastRow + 1 : lastRow;
			var range = new Range$6(startRow, startCol, endRow, deleteLastNewLine ? 0 : this.getLine(endRow).length);
			var deletedLines = this.$lines.slice(firstRow, lastRow + 1);
			this.applyDelta({
				start: range.start,
				end: range.end,
				action: "remove",
				lines: this.getLinesForRange(range)
			});
			return deletedLines;
		}
		removeNewLine(row) {
			if (row < this.getLength() - 1 && row >= 0) this.applyDelta({
				start: this.pos(row, this.getLine(row).length),
				end: this.pos(row + 1, 0),
				action: "remove",
				lines: ["", ""]
			});
		}
		replace(range, text) {
			if (!(range instanceof Range$6)) range = Range$6.fromPoints(range.start, range.end);
			if (text.length === 0 && range.isEmpty()) return range.start;
			if (text == this.getTextRange(range)) return range.end;
			this.remove(range);
			var end;
			if (text) end = this.insert(range.start, text);
			else end = range.start;
			return end;
		}
		applyDeltas(deltas) {
			for (var i = 0; i < deltas.length; i++) this.applyDelta(deltas[i]);
		}
		revertDeltas(deltas) {
			for (var i = deltas.length - 1; i >= 0; i--) this.revertDelta(deltas[i]);
		}
		applyDelta(delta, doNotValidate) {
			var isInsert = delta.action == "insert";
			if (isInsert ? delta.lines.length <= 1 && !delta.lines[0] : !Range$6.comparePoints(delta.start, delta.end)) return;
			if (isInsert && delta.lines.length > 2e4) this.$splitAndapplyLargeDelta(delta, 2e4);
			else {
				applyDelta(this.$lines, delta, doNotValidate);
				this._signal("change", delta);
			}
		}
		$safeApplyDelta(delta) {
			var docLength = this.$lines.length;
			if (delta.action == "remove" && delta.start.row < docLength && delta.end.row < docLength || delta.action == "insert" && delta.start.row <= docLength) this.applyDelta(delta);
		}
		$splitAndapplyLargeDelta(delta, MAX) {
			var lines = delta.lines;
			var l = lines.length - MAX + 1;
			var row = delta.start.row;
			var column = delta.start.column;
			for (var from = 0, to = 0; from < l; from = to) {
				to += MAX - 1;
				var chunk = lines.slice(from, to);
				chunk.push("");
				this.applyDelta({
					start: this.pos(row + from, column),
					end: this.pos(row + to, column = 0),
					action: delta.action,
					lines: chunk
				}, true);
			}
			delta.lines = lines.slice(from);
			delta.start.row = row + from;
			delta.start.column = column;
			this.applyDelta(delta, true);
		}
		revertDelta(delta) {
			this.$safeApplyDelta({
				start: this.clonePos(delta.start),
				end: this.clonePos(delta.end),
				action: delta.action == "insert" ? "remove" : "insert",
				lines: delta.lines.slice()
			});
		}
		indexToPosition(index, startRow) {
			var lines = this.$lines || this.getAllLines();
			var newlineLength = this.getNewLineCharacter().length;
			for (var i = startRow || 0, l = lines.length; i < l; i++) {
				index -= lines[i].length + newlineLength;
				if (index < 0) return {
					row: i,
					column: index + lines[i].length + newlineLength
				};
			}
			return {
				row: l - 1,
				column: index + lines[l - 1].length + newlineLength
			};
		}
		positionToIndex(pos, startRow) {
			var lines = this.$lines || this.getAllLines();
			var newlineLength = this.getNewLineCharacter().length;
			var index = 0;
			var row = Math.min(pos.row, lines.length);
			for (var i = startRow || 0; i < row; ++i) index += lines[i].length + newlineLength;
			return index + pos.column;
		}
		$split(text) {
			return text.split(/\r\n|\r|\n/);
		}
	};
	Document$1.prototype.$autoNewLine = "";
	Document$1.prototype.$newLineMode = "auto";
	oop$2.implement(Document$1.prototype, EventEmitter$2);
	exports.Document = Document$1;
}));
var require_background_tokenizer = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var EventEmitter$1 = require_event_emitter().EventEmitter;
	var BackgroundTokenizer$1 = class {
		constructor(tokenizer, session) {
			this.running = false;
			this.lines = [];
			this.states = [];
			this.currentLine = 0;
			this.tokenizer = tokenizer;
			var self = this;
			this.$worker = function() {
				if (!self.running) return;
				var workerStart = /* @__PURE__ */ new Date();
				var currentLine = self.currentLine;
				var endLine = -1;
				var doc = self.doc;
				var startLine = currentLine;
				while (self.lines[currentLine]) currentLine++;
				var len = doc.getLength();
				var processedLines = 0;
				self.running = false;
				while (currentLine < len) {
					self.$tokenizeRow(currentLine);
					endLine = currentLine;
					do
						currentLine++;
					while (self.lines[currentLine]);
					processedLines++;
					if (processedLines % 5 === 0 && /* @__PURE__ */ new Date() - workerStart > 20) {
						self.running = setTimeout(self.$worker, 20);
						break;
					}
				}
				self.currentLine = currentLine;
				if (endLine == -1) endLine = currentLine;
				if (startLine <= endLine) self.fireUpdateEvent(startLine, endLine);
			};
		}
		setTokenizer(tokenizer) {
			this.tokenizer = tokenizer;
			this.lines = [];
			this.states = [];
			this.start(0);
		}
		setDocument(doc) {
			this.doc = doc;
			this.lines = [];
			this.states = [];
			this.stop();
		}
		fireUpdateEvent(firstRow, lastRow) {
			var data = {
				first: firstRow,
				last: lastRow
			};
			this._signal("update", { data });
		}
		start(startRow) {
			this.currentLine = Math.min(startRow || 0, this.currentLine, this.doc.getLength());
			this.lines.splice(this.currentLine, this.lines.length);
			this.states.splice(this.currentLine, this.states.length);
			this.stop();
			this.running = setTimeout(this.$worker, 700);
		}
		scheduleStart() {
			if (!this.running) this.running = setTimeout(this.$worker, 700);
		}
		$updateOnChange(delta) {
			var startRow = delta.start.row;
			var len = delta.end.row - startRow;
			if (len === 0) this.lines[startRow] = null;
			else if (delta.action == "remove") {
				this.lines.splice(startRow, len + 1, null);
				this.states.splice(startRow, len + 1, null);
			} else {
				var args = Array(len + 1);
				args.unshift(startRow, 1);
				this.lines.splice.apply(this.lines, args);
				this.states.splice.apply(this.states, args);
			}
			this.currentLine = Math.min(startRow, this.currentLine, this.doc.getLength());
			this.stop();
		}
		stop() {
			if (this.running) clearTimeout(this.running);
			this.running = false;
		}
		getTokens(row) {
			return this.lines[row] || this.$tokenizeRow(row);
		}
		getState(row) {
			if (this.currentLine == row) this.$tokenizeRow(row);
			return this.states[row] || "start";
		}
		$tokenizeRow(row) {
			var line = this.doc.getLine(row);
			var state = this.states[row - 1];
			var data = this.tokenizer.getLineTokens(line, state, row);
			if (this.states[row] + "" !== data.state + "") {
				this.states[row] = data.state;
				this.lines[row + 1] = null;
				if (this.currentLine > row + 1) this.currentLine = row + 1;
			} else if (this.currentLine == row) this.currentLine = row + 1;
			return this.lines[row] = data.tokens;
		}
		cleanup() {
			this.running = false;
			this.lines = [];
			this.states = [];
			this.currentLine = 0;
			this.removeAllListeners();
		}
	};
	oop$1.implement(BackgroundTokenizer$1.prototype, EventEmitter$1);
	exports.BackgroundTokenizer = BackgroundTokenizer$1;
}));
var require_search_highlight = /* @__PURE__ */ __commonJSMin(((exports) => {
	var lang$1 = require_lang();
	var Range$5 = require_range().Range;
	var SearchHighlight$1 = class {
		constructor(regExp, clazz, type = "text") {
			this.setRegexp(regExp);
			this.clazz = clazz;
			this.type = type;
			this.docLen = 0;
		}
		setRegexp(regExp) {
			if (this.regExp + "" == regExp + "") return;
			this.regExp = regExp;
			this.cache = [];
		}
		update(html, markerLayer, session, config$1) {
			if (!this.regExp) return;
			var start = config$1.firstRow;
			var end = config$1.lastRow;
			var renderedMarkerRanges = {};
			var _search = session.$editor && session.$editor.$search;
			var mtSearch = _search && _search.$isMultilineSearch(session.$editor.getLastSearchOptions());
			for (var i = start; i <= end; i++) {
				var ranges = this.cache[i];
				if (ranges == null || session.getValue().length != this.docLen) {
					if (mtSearch) {
						ranges = [];
						var match = _search.$multiLineForward(session, this.regExp, i, end);
						if (match) {
							var end_row = match.endRow <= end ? match.endRow - 1 : end;
							if (end_row > i) i = end_row;
							ranges.push(new Range$5(match.startRow, match.startCol, match.endRow, match.endCol));
						}
						if (ranges.length > this.MAX_RANGES) ranges = ranges.slice(0, this.MAX_RANGES);
					} else {
						ranges = lang$1.getMatchOffsets(session.getLine(i), this.regExp);
						if (ranges.length > this.MAX_RANGES) ranges = ranges.slice(0, this.MAX_RANGES);
						ranges = ranges.map(function(match$1) {
							return new Range$5(i, match$1.offset, i, match$1.offset + match$1.length);
						});
					}
					this.cache[i] = ranges.length ? ranges : "";
				}
				if (ranges.length === 0) continue;
				for (var j = ranges.length; j--;) {
					var rangeToAddMarkerTo = ranges[j].toScreenRange(session);
					var rangeAsString = rangeToAddMarkerTo.toString();
					if (renderedMarkerRanges[rangeAsString]) continue;
					renderedMarkerRanges[rangeAsString] = true;
					markerLayer.drawSingleLineMarker(html, rangeToAddMarkerTo, this.clazz, config$1);
				}
			}
			this.docLen = session.getValue().length;
		}
	};
	SearchHighlight$1.prototype.MAX_RANGES = 500;
	exports.SearchHighlight = SearchHighlight$1;
}));
var require_undomanager = /* @__PURE__ */ __commonJSMin(((exports) => {
	var UndoManager$1 = class {
		constructor() {
			this.$keepRedoStack;
			this.$maxRev = 0;
			this.$fromUndo = false;
			this.$undoDepth = Infinity;
			this.reset();
		}
		addSession(session) {
			this.$session = session;
		}
		add(delta, allowMerge, session) {
			if (this.$fromUndo) return;
			if (delta == this.$lastDelta) return;
			if (!this.$keepRedoStack) this.$redoStack.length = 0;
			if (allowMerge === false || !this.lastDeltas) {
				this.lastDeltas = [];
				var undoStackLength = this.$undoStack.length;
				if (undoStackLength > this.$undoDepth - 1) this.$undoStack.splice(0, undoStackLength - this.$undoDepth + 1);
				this.$undoStack.push(this.lastDeltas);
				delta.id = this.$rev = ++this.$maxRev;
			}
			if (delta.action == "remove" || delta.action == "insert") this.$lastDelta = delta;
			this.lastDeltas.push(delta);
		}
		addSelection(selection, rev) {
			this.selections.push({
				value: selection,
				rev: rev || this.$rev
			});
		}
		startNewGroup() {
			this.lastDeltas = null;
			return this.$rev;
		}
		markIgnored(from, to) {
			if (to == null) to = this.$rev + 1;
			var stack = this.$undoStack;
			for (var i = stack.length; i--;) {
				var delta = stack[i][0];
				if (delta.id <= from) break;
				if (delta.id < to) delta.ignore = true;
			}
			this.lastDeltas = null;
		}
		getSelection(rev, after) {
			var stack = this.selections;
			for (var i = stack.length; i--;) {
				var selection = stack[i];
				if (selection.rev < rev) {
					if (after) selection = stack[i + 1];
					return selection;
				}
			}
		}
		getRevision() {
			return this.$rev;
		}
		getDeltas(from, to) {
			if (to == null) to = this.$rev + 1;
			var stack = this.$undoStack;
			var end = null, start = 0;
			for (var i = stack.length; i--;) {
				var delta = stack[i][0];
				if (delta.id < to && !end) end = i + 1;
				if (delta.id <= from) {
					start = i + 1;
					break;
				}
			}
			return stack.slice(start, end);
		}
		getChangedRanges(from, to) {
			if (to == null) to = this.$rev + 1;
		}
		getChangedLines(from, to) {
			if (to == null) to = this.$rev + 1;
		}
		undo(session, dontSelect) {
			this.lastDeltas = null;
			var stack = this.$undoStack;
			if (!rearrangeUndoStack(stack, stack.length)) return;
			if (!session) session = this.$session;
			if (this.$redoStackBaseRev !== this.$rev && this.$redoStack.length) this.$redoStack = [];
			this.$fromUndo = true;
			var deltaSet = stack.pop();
			var undoSelectionRange = null;
			if (deltaSet) {
				undoSelectionRange = session.undoChanges(deltaSet, dontSelect);
				this.$redoStack.push(deltaSet);
				this.$syncRev();
			}
			this.$fromUndo = false;
			return undoSelectionRange;
		}
		redo(session, dontSelect) {
			this.lastDeltas = null;
			if (!session) session = this.$session;
			this.$fromUndo = true;
			if (this.$redoStackBaseRev != this.$rev) {
				var diff = this.getDeltas(this.$redoStackBaseRev, this.$rev + 1);
				rebaseRedoStack(this.$redoStack, diff);
				this.$redoStackBaseRev = this.$rev;
				this.$redoStack.forEach(function(x) {
					x[0].id = ++this.$maxRev;
				}, this);
			}
			var deltaSet = this.$redoStack.pop();
			var redoSelectionRange = null;
			if (deltaSet) {
				redoSelectionRange = session.redoChanges(deltaSet, dontSelect);
				this.$undoStack.push(deltaSet);
				this.$syncRev();
			}
			this.$fromUndo = false;
			return redoSelectionRange;
		}
		$syncRev() {
			var stack = this.$undoStack;
			var nextDelta = stack[stack.length - 1];
			var id = nextDelta && nextDelta[0].id || 0;
			this.$redoStackBaseRev = id;
			this.$rev = id;
		}
		reset() {
			this.lastDeltas = null;
			this.$lastDelta = null;
			this.$undoStack = [];
			this.$redoStack = [];
			this.$rev = 0;
			this.mark = 0;
			this.$redoStackBaseRev = this.$rev;
			this.selections = [];
		}
		canUndo() {
			return this.$undoStack.length > 0;
		}
		canRedo() {
			return this.$redoStack.length > 0;
		}
		bookmark(rev) {
			if (rev == void 0) rev = this.$rev;
			this.mark = rev;
		}
		isAtBookmark() {
			return this.$rev === this.mark;
		}
		toJSON() {
			return {
				$redoStack: this.$redoStack,
				$undoStack: this.$undoStack
			};
		}
		fromJSON(json) {
			this.reset();
			this.$undoStack = json.$undoStack;
			this.$redoStack = json.$redoStack;
		}
		$prettyPrint(delta) {
			if (delta) return stringifyDelta(delta);
			return stringifyDelta(this.$undoStack) + "\n---\n" + stringifyDelta(this.$redoStack);
		}
	};
	UndoManager$1.prototype.hasUndo = UndoManager$1.prototype.canUndo;
	UndoManager$1.prototype.hasRedo = UndoManager$1.prototype.canRedo;
	UndoManager$1.prototype.isClean = UndoManager$1.prototype.isAtBookmark;
	UndoManager$1.prototype.markClean = UndoManager$1.prototype.bookmark;
	function rearrangeUndoStack(stack, pos) {
		for (var i = pos; i--;) {
			var deltaSet = stack[i];
			if (deltaSet && !deltaSet[0].ignore) {
				while (i < pos - 1) {
					var swapped = swapGroups(stack[i], stack[i + 1]);
					stack[i] = swapped[0];
					stack[i + 1] = swapped[1];
					i++;
				}
				return true;
			}
		}
	}
	var Range$4 = require_range().Range;
	var cmp = Range$4.comparePoints;
	Range$4.comparePoints;
	function clonePos(pos) {
		return {
			row: pos.row,
			column: pos.column
		};
	}
	function cloneDelta(d) {
		return {
			start: clonePos(d.start),
			end: clonePos(d.end),
			action: d.action,
			lines: d.lines.slice()
		};
	}
	function stringifyDelta(d) {
		d = d || this;
		if (Array.isArray(d)) return d.map(stringifyDelta).join("\n");
		var type = "";
		if (d.action) {
			type = d.action == "insert" ? "+" : "-";
			type += "[" + d.lines + "]";
		} else if (d.value) if (Array.isArray(d.value)) type = d.value.map(stringifyRange).join("\n");
		else type = stringifyRange(d.value);
		if (d.start) type += stringifyRange(d);
		if (d.id || d.rev) type += "	(" + (d.id || d.rev) + ")";
		return type;
	}
	function stringifyRange(r) {
		return r.start.row + ":" + r.start.column + "=>" + r.end.row + ":" + r.end.column;
	}
	function swap(d1, d2) {
		var i1 = d1.action == "insert";
		var i2 = d2.action == "insert";
		if (i1 && i2) if (cmp(d2.start, d1.end) >= 0) shift(d2, d1, -1);
		else if (cmp(d2.start, d1.start) <= 0) shift(d1, d2, 1);
		else return null;
		else if (i1 && !i2) if (cmp(d2.start, d1.end) >= 0) shift(d2, d1, -1);
		else if (cmp(d2.end, d1.start) <= 0) shift(d1, d2, -1);
		else return null;
		else if (!i1 && i2) if (cmp(d2.start, d1.start) >= 0) shift(d2, d1, 1);
		else if (cmp(d2.start, d1.start) <= 0) shift(d1, d2, 1);
		else return null;
		else if (!i1 && !i2) if (cmp(d2.start, d1.start) >= 0) shift(d2, d1, 1);
		else if (cmp(d2.end, d1.start) <= 0) shift(d1, d2, -1);
		else return null;
		return [d2, d1];
	}
	function swapGroups(ds1, ds2) {
		for (var i = ds1.length; i--;) for (var j = 0; j < ds2.length; j++) if (!swap(ds1[i], ds2[j])) {
			while (i < ds1.length) {
				while (j--) swap(ds2[j], ds1[i]);
				j = ds2.length;
				i++;
			}
			return [ds1, ds2];
		}
		ds1.selectionBefore = ds2.selectionBefore = ds1.selectionAfter = ds2.selectionAfter = null;
		return [ds2, ds1];
	}
	function xform(d1, c1) {
		var i1 = d1.action == "insert";
		var i2 = c1.action == "insert";
		if (i1 && i2) if (cmp(d1.start, c1.start) < 0) shift(c1, d1, 1);
		else shift(d1, c1, 1);
		else if (i1 && !i2) if (cmp(d1.start, c1.end) >= 0) shift(d1, c1, -1);
		else if (cmp(d1.start, c1.start) <= 0) shift(c1, d1, 1);
		else {
			shift(d1, Range$4.fromPoints(c1.start, d1.start), -1);
			shift(c1, d1, 1);
		}
		else if (!i1 && i2) if (cmp(c1.start, d1.end) >= 0) shift(c1, d1, -1);
		else if (cmp(c1.start, d1.start) <= 0) shift(d1, c1, 1);
		else {
			shift(c1, Range$4.fromPoints(d1.start, c1.start), -1);
			shift(d1, c1, 1);
		}
		else if (!i1 && !i2) if (cmp(c1.start, d1.end) >= 0) shift(c1, d1, -1);
		else if (cmp(c1.end, d1.start) <= 0) shift(d1, c1, -1);
		else {
			var before, after;
			if (cmp(d1.start, c1.start) < 0) {
				before = d1;
				d1 = splitDelta(d1, c1.start);
			}
			if (cmp(d1.end, c1.end) > 0) after = splitDelta(d1, c1.end);
			shiftPos(c1.end, d1.start, d1.end, -1);
			if (after && !before) {
				d1.lines = after.lines;
				d1.start = after.start;
				d1.end = after.end;
				after = d1;
			}
			return [
				c1,
				before,
				after
			].filter(Boolean);
		}
		return [c1, d1];
	}
	function shift(d1, d2, dir$1) {
		shiftPos(d1.start, d2.start, d2.end, dir$1);
		shiftPos(d1.end, d2.start, d2.end, dir$1);
	}
	function shiftPos(pos, start, end, dir$1) {
		if (pos.row == (dir$1 == 1 ? start : end).row) pos.column += dir$1 * (end.column - start.column);
		pos.row += dir$1 * (end.row - start.row);
	}
	function splitDelta(c, pos) {
		var lines = c.lines;
		var end = c.end;
		c.end = clonePos(pos);
		var rowsBefore = c.end.row - c.start.row;
		var otherLines = lines.splice(rowsBefore, lines.length);
		var col = rowsBefore ? pos.column : pos.column - c.start.column;
		lines.push(otherLines[0].substring(0, col));
		otherLines[0] = otherLines[0].substr(col);
		return {
			start: clonePos(pos),
			end,
			lines: otherLines,
			action: c.action
		};
	}
	function moveDeltasByOne(redoStack, d) {
		d = cloneDelta(d);
		for (var j = redoStack.length; j--;) {
			var deltaSet = redoStack[j];
			for (var i = 0; i < deltaSet.length; i++) {
				var x = deltaSet[i];
				var xformed = xform(x, d);
				d = xformed[0];
				if (xformed.length != 2) {
					if (xformed[2]) {
						deltaSet.splice(i + 1, 1, xformed[1], xformed[2]);
						i++;
					} else if (!xformed[1]) {
						deltaSet.splice(i, 1);
						i--;
					}
				}
			}
			if (!deltaSet.length) redoStack.splice(j, 1);
		}
		return redoStack;
	}
	function rebaseRedoStack(redoStack, deltaSets) {
		for (var i = 0; i < deltaSets.length; i++) {
			var deltas = deltaSets[i];
			for (var j = 0; j < deltas.length; j++) moveDeltasByOne(redoStack, deltas[j]);
		}
	}
	exports.UndoManager = UndoManager$1;
}));
var require_fold_line = /* @__PURE__ */ __commonJSMin(((exports) => {
	var Range$3 = require_range().Range;
	exports.FoldLine = class FoldLine$1 {
		constructor(foldData, folds) {
			this.foldData = foldData;
			if (Array.isArray(folds)) this.folds = folds;
			else folds = this.folds = [folds];
			var last = folds[folds.length - 1];
			this.range = new Range$3(folds[0].start.row, folds[0].start.column, last.end.row, last.end.column);
			this.start = this.range.start;
			this.end = this.range.end;
			this.folds.forEach(function(fold) {
				fold.setFoldLine(this);
			}, this);
		}
		shiftRow(shift$1) {
			this.start.row += shift$1;
			this.end.row += shift$1;
			this.folds.forEach(function(fold) {
				fold.start.row += shift$1;
				fold.end.row += shift$1;
			});
		}
		addFold(fold) {
			if (fold.sameRow) {
				if (fold.start.row < this.startRow || fold.endRow > this.endRow) throw new Error("Can't add a fold to this FoldLine as it has no connection");
				this.folds.push(fold);
				this.folds.sort(function(a, b) {
					return -a.range.compareEnd(b.start.row, b.start.column);
				});
				if (this.range.compareEnd(fold.start.row, fold.start.column) > 0) {
					this.end.row = fold.end.row;
					this.end.column = fold.end.column;
				} else if (this.range.compareStart(fold.end.row, fold.end.column) < 0) {
					this.start.row = fold.start.row;
					this.start.column = fold.start.column;
				}
			} else if (fold.start.row == this.end.row) {
				this.folds.push(fold);
				this.end.row = fold.end.row;
				this.end.column = fold.end.column;
			} else if (fold.end.row == this.start.row) {
				this.folds.unshift(fold);
				this.start.row = fold.start.row;
				this.start.column = fold.start.column;
			} else throw new Error("Trying to add fold to FoldRow that doesn't have a matching row");
			fold.foldLine = this;
		}
		containsRow(row) {
			return row >= this.start.row && row <= this.end.row;
		}
		walk(callback, endRow, endColumn) {
			var lastEnd = 0, folds = this.folds, fold, cmp$1, stop, isNewRow = true;
			if (endRow == null) {
				endRow = this.end.row;
				endColumn = this.end.column;
			}
			for (var i = 0; i < folds.length; i++) {
				fold = folds[i];
				cmp$1 = fold.range.compareStart(endRow, endColumn);
				if (cmp$1 == -1) {
					callback(null, endRow, endColumn, lastEnd, isNewRow);
					return;
				}
				stop = callback(null, fold.start.row, fold.start.column, lastEnd, isNewRow);
				stop = !stop && callback(fold.placeholder, fold.start.row, fold.start.column, lastEnd);
				if (stop || cmp$1 === 0) return;
				isNewRow = !fold.sameRow;
				lastEnd = fold.end.column;
			}
			callback(null, endRow, endColumn, lastEnd, isNewRow);
		}
		getNextFoldTo(row, column) {
			var fold, cmp$1;
			for (var i = 0; i < this.folds.length; i++) {
				fold = this.folds[i];
				cmp$1 = fold.range.compareEnd(row, column);
				if (cmp$1 == -1) return {
					fold,
					kind: "after"
				};
				else if (cmp$1 === 0) return {
					fold,
					kind: "inside"
				};
			}
			return null;
		}
		addRemoveChars(row, column, len) {
			var ret = this.getNextFoldTo(row, column), fold, folds;
			if (ret) {
				fold = ret.fold;
				if (ret.kind == "inside" && fold.start.column != column && fold.start.row != row) window.console && window.console.log(row, column, fold);
				else if (fold.start.row == row) {
					folds = this.folds;
					var i = folds.indexOf(fold);
					if (i === 0) this.start.column += len;
					for (; i < folds.length; i++) {
						fold = folds[i];
						fold.start.column += len;
						if (!fold.sameRow) return;
						fold.end.column += len;
					}
					this.end.column += len;
				}
			}
		}
		split(row, column) {
			var pos = this.getNextFoldTo(row, column);
			if (!pos || pos.kind == "inside") return null;
			var fold = pos.fold;
			var folds = this.folds;
			var foldData = this.foldData;
			var i = folds.indexOf(fold);
			var foldBefore = folds[i - 1];
			this.end.row = foldBefore.end.row;
			this.end.column = foldBefore.end.column;
			folds = folds.splice(i, folds.length - i);
			var newFoldLine = new FoldLine$1(foldData, folds);
			foldData.splice(foldData.indexOf(this) + 1, 0, newFoldLine);
			return newFoldLine;
		}
		merge(foldLineNext) {
			var folds = foldLineNext.folds;
			for (var i = 0; i < folds.length; i++) this.addFold(folds[i]);
			var foldData = this.foldData;
			foldData.splice(foldData.indexOf(foldLineNext), 1);
		}
		toString() {
			var ret = [this.range.toString() + ": ["];
			this.folds.forEach(function(fold) {
				ret.push("  " + fold.toString());
			});
			ret.push("]");
			return ret.join("\n");
		}
		idxToPosition(idx) {
			var lastFoldEndColumn = 0;
			for (var i = 0; i < this.folds.length; i++) {
				var fold = this.folds[i];
				idx -= fold.start.column - lastFoldEndColumn;
				if (idx < 0) return {
					row: fold.start.row,
					column: fold.start.column + idx
				};
				idx -= fold.placeholder.length;
				if (idx < 0) return fold.start;
				lastFoldEndColumn = fold.end.column;
			}
			return {
				row: this.end.row,
				column: this.end.column + idx
			};
		}
	};
}));
var require_range_list = /* @__PURE__ */ __commonJSMin(((exports) => {
	var comparePoints = require_range().Range.comparePoints;
	var RangeList$1 = class {
		constructor() {
			this.ranges = [];
			this.$bias = 1;
		}
		pointIndex(pos, excludeEdges, startIndex) {
			var list = this.ranges;
			for (var i = startIndex || 0; i < list.length; i++) {
				var range = list[i];
				var cmpEnd = comparePoints(pos, range.end);
				if (cmpEnd > 0) continue;
				var cmpStart = comparePoints(pos, range.start);
				if (cmpEnd === 0) return excludeEdges && cmpStart !== 0 ? -i - 2 : i;
				if (cmpStart > 0 || cmpStart === 0 && !excludeEdges) return i;
				return -i - 1;
			}
			return -i - 1;
		}
		add(range) {
			var excludeEdges = !range.isEmpty();
			var startIndex = this.pointIndex(range.start, excludeEdges);
			if (startIndex < 0) startIndex = -startIndex - 1;
			var endIndex = this.pointIndex(range.end, excludeEdges, startIndex);
			if (endIndex < 0) endIndex = -endIndex - 1;
			else endIndex++;
			return this.ranges.splice(startIndex, endIndex - startIndex, range);
		}
		addList(list) {
			var removed = [];
			for (var i = list.length; i--;) removed.push.apply(removed, this.add(list[i]));
			return removed;
		}
		substractPoint(pos) {
			var i = this.pointIndex(pos);
			if (i >= 0) return this.ranges.splice(i, 1);
		}
		merge() {
			var removed = [];
			var list = this.ranges;
			list = list.sort(function(a, b) {
				return comparePoints(a.start, b.start);
			});
			var next = list[0], range;
			for (var i = 1; i < list.length; i++) {
				range = next;
				next = list[i];
				var cmp$1 = comparePoints(range.end, next.start);
				if (cmp$1 < 0) continue;
				if (cmp$1 == 0 && !range.isEmpty() && !next.isEmpty()) continue;
				if (comparePoints(range.end, next.end) < 0) {
					range.end.row = next.end.row;
					range.end.column = next.end.column;
				}
				list.splice(i, 1);
				removed.push(next);
				next = range;
				i--;
			}
			this.ranges = list;
			return removed;
		}
		contains(row, column) {
			return this.pointIndex({
				row,
				column
			}) >= 0;
		}
		containsPoint(pos) {
			return this.pointIndex(pos) >= 0;
		}
		rangeAtPoint(pos) {
			var i = this.pointIndex(pos);
			if (i >= 0) return this.ranges[i];
		}
		clipRows(startRow, endRow) {
			var list = this.ranges;
			if (list[0].start.row > endRow || list[list.length - 1].start.row < startRow) return [];
			var startIndex = this.pointIndex({
				row: startRow,
				column: 0
			});
			if (startIndex < 0) startIndex = -startIndex - 1;
			var endIndex = this.pointIndex({
				row: endRow,
				column: 0
			}, startIndex);
			if (endIndex < 0) endIndex = -endIndex - 1;
			var clipped = [];
			for (var i = startIndex; i < endIndex; i++) clipped.push(list[i]);
			return clipped;
		}
		removeAll() {
			return this.ranges.splice(0, this.ranges.length);
		}
		attach(session) {
			if (this.session) this.detach();
			this.session = session;
			this.onChange = this.$onChange.bind(this);
			this.session.on("change", this.onChange);
		}
		detach() {
			if (!this.session) return;
			this.session.removeListener("change", this.onChange);
			this.session = null;
		}
		$onChange(delta) {
			var start = delta.start;
			var end = delta.end;
			var startRow = start.row;
			var endRow = end.row;
			var ranges = this.ranges;
			for (var i = 0, n = ranges.length; i < n; i++) {
				var r = ranges[i];
				if (r.end.row >= startRow) break;
			}
			if (delta.action == "insert") {
				var lineDif = endRow - startRow;
				var colDiff = -start.column + end.column;
				for (; i < n; i++) {
					var r = ranges[i];
					if (r.start.row > startRow) break;
					if (r.start.row == startRow && r.start.column >= start.column) if (r.start.column == start.column && this.$bias <= 0) {} else {
						r.start.column += colDiff;
						r.start.row += lineDif;
					}
					if (r.end.row == startRow && r.end.column >= start.column) {
						if (r.end.column == start.column && this.$bias < 0) continue;
						if (r.end.column == start.column && colDiff > 0 && i < n - 1) {
							if (r.end.column > r.start.column && r.end.column == ranges[i + 1].start.column) r.end.column -= colDiff;
						}
						r.end.column += colDiff;
						r.end.row += lineDif;
					}
				}
			} else {
				var lineDif = startRow - endRow;
				var colDiff = start.column - end.column;
				for (; i < n; i++) {
					var r = ranges[i];
					if (r.start.row > endRow) break;
					if (r.end.row < endRow && (startRow < r.end.row || startRow == r.end.row && start.column < r.end.column)) {
						r.end.row = startRow;
						r.end.column = start.column;
					} else if (r.end.row == endRow) if (r.end.column <= end.column) {
						if (lineDif || r.end.column > start.column) {
							r.end.column = start.column;
							r.end.row = start.row;
						}
					} else {
						r.end.column += colDiff;
						r.end.row += lineDif;
					}
					else if (r.end.row > endRow) r.end.row += lineDif;
					if (r.start.row < endRow && (startRow < r.start.row || startRow == r.start.row && start.column < r.start.column)) {
						r.start.row = startRow;
						r.start.column = start.column;
					} else if (r.start.row == endRow) if (r.start.column <= end.column) {
						if (lineDif || r.start.column > start.column) {
							r.start.column = start.column;
							r.start.row = start.row;
						}
					} else {
						r.start.column += colDiff;
						r.start.row += lineDif;
					}
					else if (r.start.row > endRow) r.start.row += lineDif;
				}
			}
			if (lineDif != 0 && i < n) for (; i < n; i++) {
				var r = ranges[i];
				r.start.row += lineDif;
				r.end.row += lineDif;
			}
		}
	};
	RangeList$1.prototype.comparePoints = comparePoints;
	exports.RangeList = RangeList$1;
}));
var require_fold = /* @__PURE__ */ __commonJSMin(((exports) => {
	var RangeList = require_range_list().RangeList;
	var Fold$1 = class Fold$1 extends RangeList {
		constructor(range, placeholder) {
			super();
			this.foldLine = null;
			this.placeholder = placeholder;
			this.range = range;
			this.start = range.start;
			this.end = range.end;
			this.sameRow = range.start.row == range.end.row;
			this.subFolds = this.ranges = [];
		}
		toString() {
			return "\"" + this.placeholder + "\" " + this.range.toString();
		}
		setFoldLine(foldLine) {
			this.foldLine = foldLine;
			this.subFolds.forEach(function(fold) {
				fold.setFoldLine(foldLine);
			});
		}
		clone() {
			var fold = new Fold$1(this.range.clone(), this.placeholder);
			this.subFolds.forEach(function(subFold) {
				fold.subFolds.push(subFold.clone());
			});
			fold.collapseChildren = this.collapseChildren;
			return fold;
		}
		addSubFold(fold) {
			if (this.range.isEqual(fold)) return;
			consumeRange(fold, this.start);
			var row = fold.start.row, column = fold.start.column;
			for (var i = 0, cmp$1 = -1; i < this.subFolds.length; i++) {
				cmp$1 = this.subFolds[i].range.compare(row, column);
				if (cmp$1 != 1) break;
			}
			var afterStart = this.subFolds[i];
			var firstConsumed = 0;
			if (cmp$1 == 0) if (afterStart.range.containsRange(fold)) return afterStart.addSubFold(fold);
			else firstConsumed = 1;
			var row = fold.range.end.row, column = fold.range.end.column;
			for (var j = i, cmp$1 = -1; j < this.subFolds.length; j++) {
				cmp$1 = this.subFolds[j].range.compare(row, column);
				if (cmp$1 != 1) break;
			}
			if (cmp$1 == 0) j++;
			var consumedFolds = this.subFolds.splice(i, j - i, fold);
			var last = cmp$1 == 0 ? consumedFolds.length - 1 : consumedFolds.length;
			for (var k = firstConsumed; k < last; k++) fold.addSubFold(consumedFolds[k]);
			fold.setFoldLine(this.foldLine);
			return fold;
		}
		restoreRange(range) {
			return restoreRange(range, this.start);
		}
	};
	function consumePoint(point, anchor) {
		point.row -= anchor.row;
		if (point.row == 0) point.column -= anchor.column;
	}
	function consumeRange(range, anchor) {
		consumePoint(range.start, anchor);
		consumePoint(range.end, anchor);
	}
	function restorePoint(point, anchor) {
		if (point.row == 0) point.column += anchor.column;
		point.row += anchor.row;
	}
	function restoreRange(range, anchor) {
		restorePoint(range.start, anchor);
		restorePoint(range.end, anchor);
	}
	exports.Fold = Fold$1;
}));
var require_folding = /* @__PURE__ */ __commonJSMin(((exports) => {
	var Range$2 = require_range().Range;
	var FoldLine = require_fold_line().FoldLine;
	var Fold = require_fold().Fold;
	var TokenIterator$1 = require_token_iterator().TokenIterator;
	var MouseEvent = require_mouse_event().MouseEvent;
	function Folding() {
		this.getFoldAt = function(row, column, side) {
			var foldLine = this.getFoldLine(row);
			if (!foldLine) return null;
			var folds = foldLine.folds;
			for (var i = 0; i < folds.length; i++) {
				var range = folds[i].range;
				if (range.contains(row, column)) {
					if (side == 1 && range.isEnd(row, column) && !range.isEmpty()) continue;
					else if (side == -1 && range.isStart(row, column) && !range.isEmpty()) continue;
					return folds[i];
				}
			}
		};
		this.getFoldsInRange = function(range) {
			var start = range.start;
			var end = range.end;
			var foldLines = this.$foldData;
			var foundFolds = [];
			start.column += 1;
			end.column -= 1;
			for (var i = 0; i < foldLines.length; i++) {
				var cmp$1 = foldLines[i].range.compareRange(range);
				if (cmp$1 == 2) continue;
				else if (cmp$1 == -2) break;
				var folds = foldLines[i].folds;
				for (var j = 0; j < folds.length; j++) {
					var fold = folds[j];
					cmp$1 = fold.range.compareRange(range);
					if (cmp$1 == -2) break;
					else if (cmp$1 == 2) continue;
					else if (cmp$1 == 42) break;
					foundFolds.push(fold);
				}
			}
			start.column -= 1;
			end.column += 1;
			return foundFolds;
		};
		this.getFoldsInRangeList = function(ranges) {
			if (Array.isArray(ranges)) {
				var folds = [];
				ranges.forEach(function(range) {
					folds = folds.concat(this.getFoldsInRange(range));
				}, this);
			} else var folds = this.getFoldsInRange(ranges);
			return folds;
		};
		this.getAllFolds = function() {
			var folds = [];
			var foldLines = this.$foldData;
			for (var i = 0; i < foldLines.length; i++) for (var j = 0; j < foldLines[i].folds.length; j++) folds.push(foldLines[i].folds[j]);
			return folds;
		};
		this.getFoldStringAt = function(row, column, trim, foldLine) {
			foldLine = foldLine || this.getFoldLine(row);
			if (!foldLine) return null;
			var lastFold = { end: { column: 0 } };
			var str, fold;
			for (var i = 0; i < foldLine.folds.length; i++) {
				fold = foldLine.folds[i];
				var cmp$1 = fold.range.compareEnd(row, column);
				if (cmp$1 == -1) {
					str = this.getLine(fold.start.row).substring(lastFold.end.column, fold.start.column);
					break;
				} else if (cmp$1 === 0) return null;
				lastFold = fold;
			}
			if (!str) str = this.getLine(fold.start.row).substring(lastFold.end.column);
			if (trim == -1) return str.substring(0, column - lastFold.end.column);
			else if (trim == 1) return str.substring(column - lastFold.end.column);
			else return str;
		};
		this.getFoldLine = function(docRow, startFoldLine) {
			var foldData = this.$foldData;
			var i = 0;
			if (startFoldLine) i = foldData.indexOf(startFoldLine);
			if (i == -1) i = 0;
			for (; i < foldData.length; i++) {
				var foldLine = foldData[i];
				if (foldLine.start.row <= docRow && foldLine.end.row >= docRow) return foldLine;
				else if (foldLine.end.row > docRow) return null;
			}
			return null;
		};
		this.getNextFoldLine = function(docRow, startFoldLine) {
			var foldData = this.$foldData;
			var i = 0;
			if (startFoldLine) i = foldData.indexOf(startFoldLine);
			if (i == -1) i = 0;
			for (; i < foldData.length; i++) {
				var foldLine = foldData[i];
				if (foldLine.end.row >= docRow) return foldLine;
			}
			return null;
		};
		this.getFoldedRowCount = function(first, last) {
			var foldData = this.$foldData, rowCount = last - first + 1;
			for (var i = 0; i < foldData.length; i++) {
				var foldLine = foldData[i], end = foldLine.end.row, start = foldLine.start.row;
				if (end >= last) {
					if (start < last) if (start >= first) rowCount -= last - start;
					else rowCount = 0;
					break;
				} else if (end >= first) if (start >= first) rowCount -= end - start;
				else rowCount -= end - first + 1;
			}
			return rowCount;
		};
		this.$addFoldLine = function(foldLine) {
			this.$foldData.push(foldLine);
			this.$foldData.sort(function(a, b) {
				return a.start.row - b.start.row;
			});
			return foldLine;
		};
		this.addFold = function(placeholder, range) {
			var foldData = this.$foldData;
			var added = false;
			var fold;
			if (placeholder instanceof Fold) fold = placeholder;
			else {
				fold = new Fold(range, placeholder);
				fold.collapseChildren = range.collapseChildren;
			}
			this.$clipRangeToDocument(fold.range);
			var startRow = fold.start.row;
			var startColumn = fold.start.column;
			var endRow = fold.end.row;
			var endColumn = fold.end.column;
			var startFold = this.getFoldAt(startRow, startColumn, 1);
			var endFold = this.getFoldAt(endRow, endColumn, -1);
			if (startFold && endFold == startFold) return startFold.addSubFold(fold);
			if (startFold && !startFold.range.isStart(startRow, startColumn)) this.removeFold(startFold);
			if (endFold && !endFold.range.isEnd(endRow, endColumn)) this.removeFold(endFold);
			var folds = this.getFoldsInRange(fold.range);
			if (folds.length > 0) {
				this.removeFolds(folds);
				if (!fold.collapseChildren) folds.forEach(function(subFold) {
					fold.addSubFold(subFold);
				});
			}
			for (var i = 0; i < foldData.length; i++) {
				var foldLine = foldData[i];
				if (endRow == foldLine.start.row) {
					foldLine.addFold(fold);
					added = true;
					break;
				} else if (startRow == foldLine.end.row) {
					foldLine.addFold(fold);
					added = true;
					if (!fold.sameRow) {
						var foldLineNext = foldData[i + 1];
						if (foldLineNext && foldLineNext.start.row == endRow) {
							foldLine.merge(foldLineNext);
							break;
						}
					}
					break;
				} else if (endRow <= foldLine.start.row) break;
			}
			if (!added) foldLine = this.$addFoldLine(new FoldLine(this.$foldData, fold));
			if (this.$useWrapMode) this.$updateWrapData(foldLine.start.row, foldLine.start.row);
			else this.$updateRowLengthCache(foldLine.start.row, foldLine.start.row);
			this.$modified = true;
			this._signal("changeFold", {
				data: fold,
				action: "add"
			});
			return fold;
		};
		this.addFolds = function(folds) {
			folds.forEach(function(fold) {
				this.addFold(fold);
			}, this);
		};
		this.removeFold = function(fold) {
			var foldLine = fold.foldLine;
			var startRow = foldLine.start.row;
			var endRow = foldLine.end.row;
			var foldLines = this.$foldData;
			var folds = foldLine.folds;
			if (folds.length == 1) foldLines.splice(foldLines.indexOf(foldLine), 1);
			else if (foldLine.range.isEnd(fold.end.row, fold.end.column)) {
				folds.pop();
				foldLine.end.row = folds[folds.length - 1].end.row;
				foldLine.end.column = folds[folds.length - 1].end.column;
			} else if (foldLine.range.isStart(fold.start.row, fold.start.column)) {
				folds.shift();
				foldLine.start.row = folds[0].start.row;
				foldLine.start.column = folds[0].start.column;
			} else if (fold.sameRow) folds.splice(folds.indexOf(fold), 1);
			else {
				var newFoldLine = foldLine.split(fold.start.row, fold.start.column);
				folds = newFoldLine.folds;
				folds.shift();
				newFoldLine.start.row = folds[0].start.row;
				newFoldLine.start.column = folds[0].start.column;
			}
			if (!this.$updating) if (this.$useWrapMode) this.$updateWrapData(startRow, endRow);
			else this.$updateRowLengthCache(startRow, endRow);
			this.$modified = true;
			this._signal("changeFold", {
				data: fold,
				action: "remove"
			});
		};
		this.removeFolds = function(folds) {
			var cloneFolds = [];
			for (var i = 0; i < folds.length; i++) cloneFolds.push(folds[i]);
			cloneFolds.forEach(function(fold) {
				this.removeFold(fold);
			}, this);
			this.$modified = true;
		};
		this.expandFold = function(fold) {
			this.removeFold(fold);
			fold.subFolds.forEach(function(subFold) {
				fold.restoreRange(subFold);
				this.addFold(subFold);
			}, this);
			if (fold.collapseChildren > 0) this.foldAll(fold.start.row + 1, fold.end.row, fold.collapseChildren - 1);
			fold.subFolds = [];
		};
		this.expandFolds = function(folds) {
			folds.forEach(function(fold) {
				this.expandFold(fold);
			}, this);
		};
		this.unfold = function(location, expandInner) {
			var range, folds;
			if (location == null) {
				range = new Range$2(0, 0, this.getLength(), 0);
				if (expandInner == null) expandInner = true;
			} else if (typeof location == "number") range = new Range$2(location, 0, location, this.getLine(location).length);
			else if ("row" in location) range = Range$2.fromPoints(location, location);
			else if (Array.isArray(location)) {
				folds = [];
				location.forEach(function(range$1) {
					folds = folds.concat(this.unfold(range$1));
				}, this);
				return folds;
			} else range = location;
			folds = this.getFoldsInRangeList(range);
			var outermostFolds = folds;
			while (folds.length == 1 && Range$2.comparePoints(folds[0].start, range.start) < 0 && Range$2.comparePoints(folds[0].end, range.end) > 0) {
				this.expandFolds(folds);
				folds = this.getFoldsInRangeList(range);
			}
			if (expandInner != false) this.removeFolds(folds);
			else this.expandFolds(folds);
			if (outermostFolds.length) return outermostFolds;
		};
		this.isRowFolded = function(docRow, startFoldRow) {
			return !!this.getFoldLine(docRow, startFoldRow);
		};
		this.getRowFoldEnd = function(docRow, startFoldRow) {
			var foldLine = this.getFoldLine(docRow, startFoldRow);
			return foldLine ? foldLine.end.row : docRow;
		};
		this.getRowFoldStart = function(docRow, startFoldRow) {
			var foldLine = this.getFoldLine(docRow, startFoldRow);
			return foldLine ? foldLine.start.row : docRow;
		};
		this.getFoldDisplayLine = function(foldLine, endRow, endColumn, startRow, startColumn) {
			if (startRow == null) startRow = foldLine.start.row;
			if (startColumn == null) startColumn = 0;
			if (endRow == null) endRow = foldLine.end.row;
			if (endColumn == null) endColumn = this.getLine(endRow).length;
			var doc = this.doc;
			var textLine = "";
			foldLine.walk(function(placeholder, row, column, lastColumn) {
				if (row < startRow) return;
				if (row == startRow) {
					if (column < startColumn) return;
					lastColumn = Math.max(startColumn, lastColumn);
				}
				if (placeholder != null) textLine += placeholder;
				else textLine += doc.getLine(row).substring(lastColumn, column);
			}, endRow, endColumn);
			return textLine;
		};
		this.getDisplayLine = function(row, endColumn, startRow, startColumn) {
			var foldLine = this.getFoldLine(row);
			if (!foldLine) {
				var line = this.doc.getLine(row);
				return line.substring(startColumn || 0, endColumn || line.length);
			} else return this.getFoldDisplayLine(foldLine, row, endColumn, startRow, startColumn);
		};
		this.$cloneFoldData = function() {
			var fd = [];
			fd = this.$foldData.map(function(foldLine) {
				var folds = foldLine.folds.map(function(fold) {
					return fold.clone();
				});
				return new FoldLine(fd, folds);
			});
			return fd;
		};
		this.toggleFold = function(tryToUnfold) {
			var range = this.selection.getRange();
			var fold;
			var bracketPos;
			if (range.isEmpty()) {
				var cursor = range.start;
				fold = this.getFoldAt(cursor.row, cursor.column);
				if (fold) {
					this.expandFold(fold);
					return;
				} else if (tryToUnfold) {
					var foldLine = this.getFoldLine(cursor.row);
					if (foldLine) this.expandFolds(foldLine.folds);
					return;
				} else if (bracketPos = this.findMatchingBracket(cursor)) if (range.comparePoint(bracketPos) == 1) range.end = bracketPos;
				else {
					range.start = bracketPos;
					range.start.column++;
					range.end.column--;
				}
				else if (bracketPos = this.findMatchingBracket({
					row: cursor.row,
					column: cursor.column + 1
				})) {
					if (range.comparePoint(bracketPos) == 1) range.end = bracketPos;
					else range.start = bracketPos;
					range.start.column++;
				} else range = this.getCommentFoldRange(cursor.row, cursor.column) || range;
			} else {
				var folds = this.getFoldsInRange(range);
				if (tryToUnfold && folds.length) {
					this.expandFolds(folds);
					return;
				} else if (folds.length == 1) fold = folds[0];
			}
			if (!fold) fold = this.getFoldAt(range.start.row, range.start.column);
			if (fold && fold.range.toString() == range.toString()) {
				this.expandFold(fold);
				return;
			}
			var placeholder = "...";
			if (!range.isMultiLine()) {
				placeholder = this.getTextRange(range);
				if (placeholder.length < 4) return;
				placeholder = placeholder.trim().substring(0, 2) + "..";
			}
			this.addFold(placeholder, range);
		};
		this.getCommentFoldRange = function(row, column, dir$1) {
			var iterator = new TokenIterator$1(this, row, column);
			var token = iterator.getCurrentToken();
			var type = token && token.type;
			if (token && /^comment|string/.test(type)) {
				type = type.match(/comment|string/)[0];
				if (type == "comment") type += "|doc-start|\\.doc";
				var re = new RegExp(type);
				var range = new Range$2();
				if (dir$1 != 1) {
					do
						token = iterator.stepBackward();
					while (token && re.test(token.type));
					token = iterator.stepForward();
				}
				range.start.row = iterator.getCurrentTokenRow();
				range.start.column = iterator.getCurrentTokenColumn() + token.value.length;
				iterator = new TokenIterator$1(this, row, column);
				var initState = this.getState(iterator.$row);
				if (dir$1 != -1) {
					var lastRow = -1;
					do {
						token = iterator.stepForward();
						if (lastRow == -1) {
							var state = this.getState(iterator.$row);
							if (initState.toString() !== state.toString()) lastRow = iterator.$row;
						} else if (iterator.$row > lastRow) break;
					} while (token && re.test(token.type));
					token = iterator.stepBackward();
				} else token = iterator.getCurrentToken();
				range.end.row = iterator.getCurrentTokenRow();
				range.end.column = iterator.getCurrentTokenColumn();
				if (range.start.row == range.end.row && range.start.column > range.end.column) return;
				return range;
			}
		};
		this.foldAll = function(startRow, endRow, depth, test) {
			if (depth == void 0) depth = 1e5;
			var foldWidgets = this.foldWidgets;
			if (!foldWidgets) return;
			endRow = endRow || this.getLength();
			startRow = startRow || 0;
			for (var row = startRow; row < endRow; row++) {
				if (foldWidgets[row] == null) foldWidgets[row] = this.getFoldWidget(row);
				if (foldWidgets[row] != "start") continue;
				if (test && !test(row)) continue;
				var range = this.getFoldWidgetRange(row);
				if (range && range.isMultiLine() && range.end.row <= endRow && range.start.row >= startRow) {
					row = range.end.row;
					range.collapseChildren = depth;
					this.addFold("...", range);
				}
			}
		};
		this.foldToLevel = function(level) {
			this.foldAll();
			while (level-- > 0) this.unfold(null, false);
		};
		this.foldAllComments = function() {
			var session = this;
			this.foldAll(null, null, null, function(row) {
				var tokens = session.getTokens(row);
				for (var i = 0; i < tokens.length; i++) {
					var token = tokens[i];
					if (token.type == "text" && /^\s+$/.test(token.value)) continue;
					if (/comment/.test(token.type)) return true;
					return false;
				}
			});
		};
		this.$foldStyles = {
			"manual": 1,
			"markbegin": 1,
			"markbeginend": 1
		};
		this.$foldStyle = "markbegin";
		this.setFoldStyle = function(style) {
			if (!this.$foldStyles[style]) throw new Error("invalid fold style: " + style + "[" + Object.keys(this.$foldStyles).join(", ") + "]");
			if (this.$foldStyle == style) return;
			this.$foldStyle = style;
			if (style == "manual") this.unfold();
			var mode = this.$foldMode;
			this.$setFolding(null);
			this.$setFolding(mode);
		};
		this.$setFolding = function(foldMode) {
			if (this.$foldMode == foldMode) return;
			this.$foldMode = foldMode;
			this.off("change", this.$updateFoldWidgets);
			this.off("tokenizerUpdate", this.$tokenizerUpdateFoldWidgets);
			this._signal("changeAnnotation");
			if (!foldMode || this.$foldStyle == "manual") {
				this.foldWidgets = null;
				return;
			}
			this.foldWidgets = [];
			this.getFoldWidget = foldMode.getFoldWidget.bind(foldMode, this, this.$foldStyle);
			this.getFoldWidgetRange = foldMode.getFoldWidgetRange.bind(foldMode, this, this.$foldStyle);
			this.$updateFoldWidgets = this.updateFoldWidgets.bind(this);
			this.$tokenizerUpdateFoldWidgets = this.tokenizerUpdateFoldWidgets.bind(this);
			this.on("change", this.$updateFoldWidgets);
			this.on("tokenizerUpdate", this.$tokenizerUpdateFoldWidgets);
		};
		this.getParentFoldRangeData = function(row, ignoreCurrent) {
			var fw = this.foldWidgets;
			if (!fw || ignoreCurrent && fw[row]) return {};
			var i = row - 1, firstRange;
			while (i >= 0) {
				var c = fw[i];
				if (c == null) c = fw[i] = this.getFoldWidget(i);
				if (c == "start") {
					var range = this.getFoldWidgetRange(i);
					if (!firstRange) firstRange = range;
					if (range && range.end.row >= row) break;
				}
				i--;
			}
			return {
				range: i !== -1 && range,
				firstRange
			};
		};
		this.onFoldWidgetClick = function(row, e) {
			if (e instanceof MouseEvent) e = e.domEvent;
			var options = {
				children: e.shiftKey,
				all: e.ctrlKey || e.metaKey,
				siblings: e.altKey
			};
			if (!this.$toggleFoldWidget(row, options)) {
				var el = e.target || e.srcElement;
				if (el && /ace_fold-widget/.test(el.className)) el.className += " ace_invalid";
			}
		};
		this.$toggleFoldWidget = function(row, options) {
			if (!this.getFoldWidget) return;
			var type = this.getFoldWidget(row);
			var line = this.getLine(row);
			var dir$1 = type === "end" ? -1 : 1;
			var fold = this.getFoldAt(row, dir$1 === -1 ? 0 : line.length, dir$1);
			if (fold) {
				if (options.children || options.all) this.removeFold(fold);
				else this.expandFold(fold);
				return fold;
			}
			var range = this.getFoldWidgetRange(row, true);
			if (range && !range.isMultiLine()) {
				fold = this.getFoldAt(range.start.row, range.start.column, 1);
				if (fold && range.isEqual(fold.range)) {
					this.removeFold(fold);
					return fold;
				}
			}
			if (options.siblings) {
				var data = this.getParentFoldRangeData(row);
				if (data.range) {
					var startRow = data.range.start.row + 1;
					var endRow = data.range.end.row;
				}
				this.foldAll(startRow, endRow, options.all ? 1e4 : 0);
			} else if (options.children) {
				endRow = range ? range.end.row : this.getLength();
				this.foldAll(row + 1, endRow, options.all ? 1e4 : 0);
			} else if (range) {
				if (options.all) range.collapseChildren = 1e4;
				this.addFold("...", range);
			}
			return range;
		};
		this.toggleFoldWidget = function(toggleParent) {
			var row = this.selection.getCursor().row;
			row = this.getRowFoldStart(row);
			var range = this.$toggleFoldWidget(row, {});
			if (range) return;
			var data = this.getParentFoldRangeData(row, true);
			range = data.range || data.firstRange;
			if (range) {
				row = range.start.row;
				var fold = this.getFoldAt(row, this.getLine(row).length, 1);
				if (fold) this.removeFold(fold);
				else this.addFold("...", range);
			}
		};
		this.updateFoldWidgets = function(delta) {
			var firstRow = delta.start.row;
			var len = delta.end.row - firstRow;
			if (len === 0) this.foldWidgets[firstRow] = null;
			else if (delta.action == "remove") this.foldWidgets.splice(firstRow, len + 1, null);
			else {
				var args = Array(len + 1);
				args.unshift(firstRow, 1);
				this.foldWidgets.splice.apply(this.foldWidgets, args);
			}
		};
		this.tokenizerUpdateFoldWidgets = function(e) {
			var rows = e.data;
			if (rows.first != rows.last) {
				if (this.foldWidgets.length > rows.first) this.foldWidgets.splice(rows.first, this.foldWidgets.length);
			}
		};
	}
	exports.Folding = Folding;
}));
var require_bracket_match = /* @__PURE__ */ __commonJSMin(((exports) => {
	var TokenIterator = require_token_iterator().TokenIterator;
	var Range$1 = require_range().Range;
	function BracketMatch() {
		this.findMatchingBracket = function(position, chr) {
			if (position.column == 0) return null;
			var charBeforeCursor = chr || this.getLine(position.row).charAt(position.column - 1);
			if (charBeforeCursor == "") return null;
			var match = charBeforeCursor.match(/([\(\[\{])|([\)\]\}])/);
			if (!match) return null;
			if (match[1]) return this.$findClosingBracket(match[1], position);
			else return this.$findOpeningBracket(match[2], position);
		};
		this.getBracketRange = function(pos) {
			var line = this.getLine(pos.row);
			var before = true, range;
			var chr = line.charAt(pos.column - 1);
			var match = chr && chr.match(/([\(\[\{])|([\)\]\}])/);
			if (!match) {
				chr = line.charAt(pos.column);
				pos = {
					row: pos.row,
					column: pos.column + 1
				};
				match = chr && chr.match(/([\(\[\{])|([\)\]\}])/);
				before = false;
			}
			if (!match) return null;
			if (match[1]) {
				var bracketPos = this.$findClosingBracket(match[1], pos);
				if (!bracketPos) return null;
				range = Range$1.fromPoints(pos, bracketPos);
				if (!before) {
					range.end.column++;
					range.start.column--;
				}
				range.cursor = range.end;
			} else {
				var bracketPos = this.$findOpeningBracket(match[2], pos);
				if (!bracketPos) return null;
				range = Range$1.fromPoints(bracketPos, pos);
				if (!before) {
					range.start.column++;
					range.end.column--;
				}
				range.cursor = range.start;
			}
			return range;
		};
		this.getMatchingBracketRanges = function(pos, isBackwards) {
			var line = this.getLine(pos.row);
			var bracketsRegExp = /([\(\[\{])|([\)\]\}])/;
			var chr = !isBackwards && line.charAt(pos.column - 1);
			var match = chr && chr.match(bracketsRegExp);
			if (!match) {
				chr = (isBackwards === void 0 || isBackwards) && line.charAt(pos.column);
				pos = {
					row: pos.row,
					column: pos.column + 1
				};
				match = chr && chr.match(bracketsRegExp);
			}
			if (!match) return null;
			var startRange = new Range$1(pos.row, pos.column - 1, pos.row, pos.column);
			var bracketPos = match[1] ? this.$findClosingBracket(match[1], pos) : this.$findOpeningBracket(match[2], pos);
			if (!bracketPos) return [startRange];
			return [startRange, new Range$1(bracketPos.row, bracketPos.column, bracketPos.row, bracketPos.column + 1)];
		};
		this.$brackets = {
			")": "(",
			"(": ")",
			"]": "[",
			"[": "]",
			"{": "}",
			"}": "{",
			"<": ">",
			">": "<"
		};
		this.$findOpeningBracket = function(bracket, position, typeRe) {
			var openBracket = this.$brackets[bracket];
			var depth = 1;
			var iterator = new TokenIterator(this, position.row, position.column);
			var token = iterator.getCurrentToken();
			if (!token) token = iterator.stepForward();
			if (!token) return;
			if (!typeRe) typeRe = /* @__PURE__ */ new RegExp("(\\.?" + token.type.replace(".", "\\.").replace("rparen", ".paren").replace(/\b(?:end)\b/, "(?:start|begin|end)").replace(/-close\b/, "-(close|open)") + ")+");
			var valueIndex = position.column - iterator.getCurrentTokenColumn() - 2;
			var value = token.value;
			while (true) {
				while (valueIndex >= 0) {
					var chr = value.charAt(valueIndex);
					if (chr == openBracket) {
						depth -= 1;
						if (depth == 0) return {
							row: iterator.getCurrentTokenRow(),
							column: valueIndex + iterator.getCurrentTokenColumn()
						};
					} else if (chr == bracket) depth += 1;
					valueIndex -= 1;
				}
				do
					token = iterator.stepBackward();
				while (token && !typeRe.test(token.type));
				if (token == null) break;
				value = token.value;
				valueIndex = value.length - 1;
			}
			return null;
		};
		this.$findClosingBracket = function(bracket, position, typeRe) {
			var closingBracket = this.$brackets[bracket];
			var depth = 1;
			var iterator = new TokenIterator(this, position.row, position.column);
			var token = iterator.getCurrentToken();
			if (!token) token = iterator.stepForward();
			if (!token) return;
			if (!typeRe) typeRe = /* @__PURE__ */ new RegExp("(\\.?" + token.type.replace(".", "\\.").replace("lparen", ".paren").replace(/\b(?:start|begin)\b/, "(?:start|begin|end)").replace(/-open\b/, "-(close|open)") + ")+");
			var valueIndex = position.column - iterator.getCurrentTokenColumn();
			while (true) {
				var value = token.value;
				var valueLength = value.length;
				while (valueIndex < valueLength) {
					var chr = value.charAt(valueIndex);
					if (chr == closingBracket) {
						depth -= 1;
						if (depth == 0) return {
							row: iterator.getCurrentTokenRow(),
							column: valueIndex + iterator.getCurrentTokenColumn()
						};
					} else if (chr == bracket) depth += 1;
					valueIndex += 1;
				}
				do
					token = iterator.stepForward();
				while (token && !typeRe.test(token.type));
				if (token == null) break;
				valueIndex = 0;
			}
			return null;
		};
		this.getMatchingTags = function(pos) {
			var iterator = new TokenIterator(this, pos.row, pos.column);
			var token = this.$findTagName(iterator);
			if (!token) return;
			if (iterator.stepBackward().value === "<") return this.$findClosingTag(iterator, token);
			else return this.$findOpeningTag(iterator, token);
		};
		this.$findTagName = function(iterator) {
			var token = iterator.getCurrentToken();
			var found = false;
			var backward = false;
			if (token && token.type.indexOf("tag-name") === -1) do {
				if (backward) token = iterator.stepBackward();
				else token = iterator.stepForward();
				if (token) {
					if (token.value === "/>") backward = true;
					else if (token.type.indexOf("tag-name") !== -1) found = true;
				}
			} while (token && !found);
			return token;
		};
		this.$findClosingTag = function(iterator, token) {
			var prevToken;
			var currentTag = token.value;
			var tag = token.value;
			var depth = 0;
			var openTagStart = new Range$1(iterator.getCurrentTokenRow(), iterator.getCurrentTokenColumn(), iterator.getCurrentTokenRow(), iterator.getCurrentTokenColumn() + 1);
			token = iterator.stepForward();
			var openTagName = new Range$1(iterator.getCurrentTokenRow(), iterator.getCurrentTokenColumn(), iterator.getCurrentTokenRow(), iterator.getCurrentTokenColumn() + token.value.length);
			var foundOpenTagEnd = false;
			do {
				prevToken = token;
				if (prevToken.type.indexOf("tag-close") !== -1 && !foundOpenTagEnd) {
					var openTagEnd = new Range$1(iterator.getCurrentTokenRow(), iterator.getCurrentTokenColumn(), iterator.getCurrentTokenRow(), iterator.getCurrentTokenColumn() + 1);
					foundOpenTagEnd = true;
				}
				token = iterator.stepForward();
				if (token) {
					if (token.value === ">" && !foundOpenTagEnd) {
						var openTagEnd = new Range$1(iterator.getCurrentTokenRow(), iterator.getCurrentTokenColumn(), iterator.getCurrentTokenRow(), iterator.getCurrentTokenColumn() + 1);
						foundOpenTagEnd = true;
					}
					if (token.type.indexOf("tag-name") !== -1) {
						currentTag = token.value;
						if (tag === currentTag) {
							if (prevToken.value === "<") depth++;
							else if (prevToken.value === "</") {
								depth--;
								if (depth < 0) {
									iterator.stepBackward();
									var closeTagStart = new Range$1(iterator.getCurrentTokenRow(), iterator.getCurrentTokenColumn(), iterator.getCurrentTokenRow(), iterator.getCurrentTokenColumn() + 2);
									token = iterator.stepForward();
									var closeTagName = new Range$1(iterator.getCurrentTokenRow(), iterator.getCurrentTokenColumn(), iterator.getCurrentTokenRow(), iterator.getCurrentTokenColumn() + token.value.length);
									if (token.type.indexOf("tag-close") === -1) token = iterator.stepForward();
									if (token && token.value === ">") var closeTagEnd = new Range$1(iterator.getCurrentTokenRow(), iterator.getCurrentTokenColumn(), iterator.getCurrentTokenRow(), iterator.getCurrentTokenColumn() + 1);
									else return;
								}
							}
						}
					} else if (tag === currentTag && token.value === "/>") {
						depth--;
						if (depth < 0) {
							var closeTagStart = new Range$1(iterator.getCurrentTokenRow(), iterator.getCurrentTokenColumn(), iterator.getCurrentTokenRow(), iterator.getCurrentTokenColumn() + 2);
							var closeTagName = closeTagStart;
							var closeTagEnd = closeTagName;
							var openTagEnd = new Range$1(openTagName.end.row, openTagName.end.column, openTagName.end.row, openTagName.end.column + 1);
						}
					}
				}
			} while (token && depth >= 0);
			if (openTagStart && openTagEnd && closeTagStart && closeTagEnd && openTagName && closeTagName) return {
				openTag: new Range$1(openTagStart.start.row, openTagStart.start.column, openTagEnd.end.row, openTagEnd.end.column),
				closeTag: new Range$1(closeTagStart.start.row, closeTagStart.start.column, closeTagEnd.end.row, closeTagEnd.end.column),
				openTagName,
				closeTagName
			};
		};
		this.$findOpeningTag = function(iterator, token) {
			var prevToken = iterator.getCurrentToken();
			var tag = token.value;
			var depth = 0;
			var startRow = iterator.getCurrentTokenRow();
			var startColumn = iterator.getCurrentTokenColumn();
			var endColumn = startColumn + 2;
			var closeTagStart = new Range$1(startRow, startColumn, startRow, endColumn);
			iterator.stepForward();
			var closeTagName = new Range$1(iterator.getCurrentTokenRow(), iterator.getCurrentTokenColumn(), iterator.getCurrentTokenRow(), iterator.getCurrentTokenColumn() + token.value.length);
			if (token.type.indexOf("tag-close") === -1) token = iterator.stepForward();
			if (!token || token.value !== ">") return;
			var closeTagEnd = new Range$1(iterator.getCurrentTokenRow(), iterator.getCurrentTokenColumn(), iterator.getCurrentTokenRow(), iterator.getCurrentTokenColumn() + 1);
			iterator.stepBackward();
			iterator.stepBackward();
			do {
				token = prevToken;
				startRow = iterator.getCurrentTokenRow();
				startColumn = iterator.getCurrentTokenColumn();
				endColumn = startColumn + token.value.length;
				prevToken = iterator.stepBackward();
				if (token) {
					if (token.type.indexOf("tag-name") !== -1) {
						if (tag === token.value) {
							if (prevToken.value === "<") {
								depth++;
								if (depth > 0) {
									var openTagName = new Range$1(startRow, startColumn, startRow, endColumn);
									var openTagStart = new Range$1(iterator.getCurrentTokenRow(), iterator.getCurrentTokenColumn(), iterator.getCurrentTokenRow(), iterator.getCurrentTokenColumn() + 1);
									do
										token = iterator.stepForward();
									while (token && token.value !== ">");
									var openTagEnd = new Range$1(iterator.getCurrentTokenRow(), iterator.getCurrentTokenColumn(), iterator.getCurrentTokenRow(), iterator.getCurrentTokenColumn() + 1);
								}
							} else if (prevToken.value === "</") depth--;
						}
					} else if (token.value === "/>") {
						var stepCount = 0;
						var tmpToken = prevToken;
						while (tmpToken) {
							if (tmpToken.type.indexOf("tag-name") !== -1 && tmpToken.value === tag) {
								depth--;
								break;
							} else if (tmpToken.value === "<") break;
							tmpToken = iterator.stepBackward();
							stepCount++;
						}
						for (var i = 0; i < stepCount; i++) iterator.stepForward();
					}
				}
			} while (prevToken && depth <= 0);
			if (openTagStart && openTagEnd && closeTagStart && closeTagEnd && openTagName && closeTagName) return {
				openTag: new Range$1(openTagStart.start.row, openTagStart.start.column, openTagEnd.end.row, openTagEnd.end.column),
				closeTag: new Range$1(closeTagStart.start.row, closeTagStart.start.column, closeTagEnd.end.row, closeTagEnd.end.column),
				openTagName,
				closeTagName
			};
		};
	}
	exports.BracketMatch = BracketMatch;
}));
var require_edit_session = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var lang = require_lang();
	var BidiHandler = require_bidihandler().BidiHandler;
	var config = require_config();
	var EventEmitter = require_event_emitter().EventEmitter;
	var Selection = require_selection().Selection;
	var TextMode = require_text().Mode;
	var Range = require_range().Range;
	var LineWidgets = require_line_widgets().LineWidgets;
	var Document = require_document().Document;
	var BackgroundTokenizer = require_background_tokenizer().BackgroundTokenizer;
	var SearchHighlight = require_search_highlight().SearchHighlight;
	var UndoManager = require_undomanager().UndoManager;
	var EditSession = class EditSession {
		constructor(text, mode) {
			this.doc;
			this.$breakpoints = [];
			this.$decorations = [];
			this.$frontMarkers = {};
			this.$backMarkers = {};
			this.$markerId = 1;
			this.$undoSelect = true;
			this.$editor = null;
			this.prevOp = {};
			this.$foldData = [];
			this.id = "session" + ++EditSession.$uid;
			this.$foldData.toString = function() {
				return this.join("\n");
			};
			this.$gutterCustomWidgets = {};
			this.bgTokenizer = new BackgroundTokenizer(new TextMode().getTokenizer(), this);
			var _self = this;
			this.bgTokenizer.on("update", function(e) {
				_self._signal("tokenizerUpdate", e);
			});
			this.on("changeFold", this.onChangeFold.bind(this));
			this.$onChange = this.onChange.bind(this);
			if (typeof text != "object" || !text.getLine) text = new Document(text);
			this.setDocument(text);
			this.selection = new Selection(this);
			this.$onSelectionChange = this.onSelectionChange.bind(this);
			this.selection.on("changeSelection", this.$onSelectionChange);
			this.selection.on("changeCursor", this.$onSelectionChange);
			this.$bidiHandler = new BidiHandler(this);
			config.resetOptions(this);
			this.setMode(mode);
			config._signal("session", this);
			this.destroyed = false;
			this.$initOperationListeners();
		}
		$initOperationListeners() {
			this.curOp = null;
			this.on("change", () => {
				if (!this.curOp) {
					this.startOperation();
					this.curOp.selectionBefore = this.$lastSel;
				}
				this.curOp.docChanged = true;
			}, true);
			this.on("changeSelection", () => {
				if (!this.curOp) {
					this.startOperation();
					this.curOp.selectionBefore = this.$lastSel;
				}
				this.curOp.selectionChanged = true;
			}, true);
			this.$operationResetTimer = lang.delayedCall(this.endOperation.bind(this, true));
		}
		startOperation(commandEvent) {
			if (this.curOp) {
				if (!commandEvent || this.curOp.command) return;
				this.prevOp = this.curOp;
			}
			if (!commandEvent) commandEvent = {};
			this.$operationResetTimer.schedule();
			this.curOp = {
				command: commandEvent.command || {},
				args: commandEvent.args
			};
			this.curOp.selectionBefore = this.selection.toJSON();
			this._signal("startOperation", commandEvent);
		}
		endOperation(e) {
			if (this.curOp) {
				if (e && e.returnValue === false) {
					this.curOp = null;
					this._signal("endOperation", e);
					return;
				}
				if (e == true && this.curOp.command && this.curOp.command.name == "mouse") return;
				const currentSelection = this.selection.toJSON();
				this.curOp.selectionAfter = currentSelection;
				this.$lastSel = this.selection.toJSON();
				this.getUndoManager().addSelection(currentSelection);
				this._signal("beforeEndOperation");
				this.prevOp = this.curOp;
				this.curOp = null;
				this._signal("endOperation", e);
			}
		}
		setDocument(doc) {
			if (this.doc) this.doc.off("change", this.$onChange);
			this.doc = doc;
			doc.on("change", this.$onChange, true);
			this.bgTokenizer.setDocument(this.getDocument());
			this.resetCaches();
		}
		getDocument() {
			return this.doc;
		}
		get widgetManager() {
			const widgetManager = new LineWidgets(this);
			this.widgetManager = widgetManager;
			if (this.$editor) widgetManager.attach(this.$editor);
			return widgetManager;
		}
		set widgetManager(value) {
			Object.defineProperty(this, "widgetManager", {
				writable: true,
				enumerable: true,
				configurable: true,
				value
			});
		}
		$resetRowCache(docRow) {
			if (!docRow) {
				this.$docRowCache = [];
				this.$screenRowCache = [];
				return;
			}
			var l = this.$docRowCache.length;
			var i = this.$getRowCacheIndex(this.$docRowCache, docRow) + 1;
			if (l > i) {
				this.$docRowCache.splice(i, l);
				this.$screenRowCache.splice(i, l);
			}
		}
		$getRowCacheIndex(cacheArray, val) {
			var low = 0;
			var hi = cacheArray.length - 1;
			while (low <= hi) {
				var mid = low + hi >> 1;
				var c = cacheArray[mid];
				if (val > c) low = mid + 1;
				else if (val < c) hi = mid - 1;
				else return mid;
			}
			return low - 1;
		}
		resetCaches() {
			this.$modified = true;
			this.$wrapData = [];
			this.$rowLengthCache = [];
			this.$resetRowCache(0);
			if (!this.destroyed) this.bgTokenizer.start(0);
		}
		onChangeFold(e) {
			var fold = e.data;
			this.$resetRowCache(fold.start.row);
		}
		onChange(delta) {
			this.$modified = true;
			this.$bidiHandler.onChange(delta);
			this.$resetRowCache(delta.start.row);
			var removedFolds = this.$updateInternalDataOnChange(delta);
			if (!this.$fromUndo && this.$undoManager) {
				if (removedFolds && removedFolds.length) {
					this.$undoManager.add({
						action: "removeFolds",
						folds: removedFolds
					}, this.mergeUndoDeltas);
					this.mergeUndoDeltas = true;
				}
				this.$undoManager.add(delta, this.mergeUndoDeltas);
				this.mergeUndoDeltas = true;
				this.$informUndoManager.schedule();
			}
			this.bgTokenizer.$updateOnChange(delta);
			this._signal("change", delta);
		}
		onSelectionChange() {
			this._signal("changeSelection");
		}
		setValue(text) {
			this.doc.setValue(text);
			this.selection.moveTo(0, 0);
			this.$resetRowCache(0);
			this.setUndoManager(this.$undoManager);
			this.getUndoManager().reset();
		}
		static fromJSON(session) {
			if (typeof session == "string") session = JSON.parse(session);
			const undoManager = new UndoManager();
			undoManager.$undoStack = session.history.undo;
			undoManager.$redoStack = session.history.redo;
			undoManager.mark = session.history.mark;
			undoManager.$rev = session.history.rev;
			const editSession = new EditSession(session.value);
			session.folds.forEach(function(fold) {
				editSession.addFold("...", Range.fromPoints(fold.start, fold.end));
			});
			editSession.setAnnotations(session.annotations);
			editSession.setBreakpoints(session.breakpoints);
			editSession.setMode(session.mode);
			editSession.setScrollLeft(session.scrollLeft);
			editSession.setScrollTop(session.scrollTop);
			editSession.setUndoManager(undoManager);
			editSession.selection.fromJSON(session.selection);
			return editSession;
		}
		toJSON() {
			return {
				annotations: this.$annotations,
				breakpoints: this.$breakpoints,
				folds: this.getAllFolds().map(function(fold) {
					return fold.range;
				}),
				history: this.getUndoManager(),
				mode: this.$mode.$id,
				scrollLeft: this.$scrollLeft,
				scrollTop: this.$scrollTop,
				selection: this.selection.toJSON(),
				value: this.doc.getValue()
			};
		}
		toString() {
			return this.doc.getValue();
		}
		getSelection() {
			return this.selection;
		}
		getState(row) {
			return this.bgTokenizer.getState(row);
		}
		getTokens(row) {
			return this.bgTokenizer.getTokens(row);
		}
		getTokenAt(row, column) {
			var tokens = this.bgTokenizer.getTokens(row);
			var token, c = 0;
			if (column == null) {
				var i = tokens.length - 1;
				c = this.getLine(row).length;
			} else for (var i = 0; i < tokens.length; i++) {
				c += tokens[i].value.length;
				if (c >= column) break;
			}
			token = tokens[i];
			if (!token) return null;
			token.index = i;
			token.start = c - token.value.length;
			return token;
		}
		setUndoManager(undoManager) {
			this.$undoManager = undoManager;
			if (this.$informUndoManager) this.$informUndoManager.cancel();
			if (undoManager) {
				var self = this;
				undoManager.addSession(this);
				this.$syncInformUndoManager = function() {
					self.$informUndoManager.cancel();
					self.mergeUndoDeltas = false;
				};
				this.$informUndoManager = lang.delayedCall(this.$syncInformUndoManager);
			} else this.$syncInformUndoManager = function() {};
		}
		markUndoGroup() {
			if (this.$syncInformUndoManager) this.$syncInformUndoManager();
		}
		getUndoManager() {
			return this.$undoManager || this.$defaultUndoManager;
		}
		getTabString() {
			if (this.getUseSoftTabs()) return lang.stringRepeat(" ", this.getTabSize());
			else return "	";
		}
		setUseSoftTabs(val) {
			this.setOption("useSoftTabs", val);
		}
		getUseSoftTabs() {
			return this.$useSoftTabs && !this.$mode.$indentWithTabs;
		}
		setTabSize(tabSize) {
			this.setOption("tabSize", tabSize);
		}
		getTabSize() {
			return this.$tabSize;
		}
		isTabStop(position) {
			return this.$useSoftTabs && position.column % this.$tabSize === 0;
		}
		setNavigateWithinSoftTabs(navigateWithinSoftTabs) {
			this.setOption("navigateWithinSoftTabs", navigateWithinSoftTabs);
		}
		getNavigateWithinSoftTabs() {
			return this.$navigateWithinSoftTabs;
		}
		setOverwrite(overwrite) {
			this.setOption("overwrite", overwrite);
		}
		getOverwrite() {
			return this.$overwrite;
		}
		toggleOverwrite() {
			this.setOverwrite(!this.$overwrite);
		}
		addGutterDecoration(row, className) {
			if (!this.$decorations[row]) this.$decorations[row] = "";
			this.$decorations[row] += " " + className;
			this._signal("changeBreakpoint", {});
		}
		removeGutterCustomWidget(row) {
			if (this.$editor) this.$editor.renderer.$gutterLayer.$removeCustomWidget(row);
		}
		addGutterCustomWidget(row, attributes) {
			if (this.$editor) this.$editor.renderer.$gutterLayer.$addCustomWidget(row, attributes);
		}
		removeGutterDecoration(row, className) {
			this.$decorations[row] = (this.$decorations[row] || "").replace(" " + className, "");
			this._signal("changeBreakpoint", {});
		}
		getBreakpoints() {
			return this.$breakpoints;
		}
		setBreakpoints(rows) {
			this.$breakpoints = [];
			for (var i = 0; i < rows.length; i++) this.$breakpoints[rows[i]] = "ace_breakpoint";
			this._signal("changeBreakpoint", {});
		}
		clearBreakpoints() {
			this.$breakpoints = [];
			this._signal("changeBreakpoint", {});
		}
		setBreakpoint(row, className) {
			if (className === void 0) className = "ace_breakpoint";
			if (className) this.$breakpoints[row] = className;
			else delete this.$breakpoints[row];
			this._signal("changeBreakpoint", {});
		}
		clearBreakpoint(row) {
			delete this.$breakpoints[row];
			this._signal("changeBreakpoint", {});
		}
		addMarker(range, clazz, type, inFront) {
			var id = this.$markerId++;
			var marker = {
				range,
				type: type || "line",
				renderer: typeof type == "function" ? type : null,
				clazz,
				inFront: !!inFront,
				id
			};
			if (inFront) {
				this.$frontMarkers[id] = marker;
				this._signal("changeFrontMarker");
			} else {
				this.$backMarkers[id] = marker;
				this._signal("changeBackMarker");
			}
			return id;
		}
		addDynamicMarker(marker, inFront) {
			if (!marker.update) return;
			var id = this.$markerId++;
			marker.id = id;
			marker.inFront = !!inFront;
			if (inFront) {
				this.$frontMarkers[id] = marker;
				this._signal("changeFrontMarker");
			} else {
				this.$backMarkers[id] = marker;
				this._signal("changeBackMarker");
			}
			return marker;
		}
		removeMarker(markerId) {
			var marker = this.$frontMarkers[markerId] || this.$backMarkers[markerId];
			if (!marker) return;
			var markers = marker.inFront ? this.$frontMarkers : this.$backMarkers;
			delete markers[markerId];
			this._signal(marker.inFront ? "changeFrontMarker" : "changeBackMarker");
		}
		getMarkers(inFront) {
			return inFront ? this.$frontMarkers : this.$backMarkers;
		}
		highlight(re) {
			if (!this.$searchHighlight) {
				var highlight = new SearchHighlight(null, "ace_selected-word", "text");
				this.$searchHighlight = this.addDynamicMarker(highlight);
			}
			this.$searchHighlight.setRegexp(re);
		}
		highlightLines(startRow, endRow, clazz, inFront) {
			if (typeof endRow != "number") {
				clazz = endRow;
				endRow = startRow;
			}
			if (!clazz) clazz = "ace_step";
			var range = new Range(startRow, 0, endRow, Infinity);
			range.id = this.addMarker(range, clazz, "fullLine", inFront);
			return range;
		}
		setAnnotations(annotations) {
			this.$annotations = annotations;
			this._signal("changeAnnotation", {});
		}
		getAnnotations() {
			return this.$annotations || [];
		}
		clearAnnotations() {
			this.setAnnotations([]);
		}
		$detectNewLine(text) {
			var match = text.match(/^.*?(\r?\n)/m);
			if (match) this.$autoNewLine = match[1];
			else this.$autoNewLine = "\n";
		}
		getWordRange(row, column) {
			var line = this.getLine(row);
			var inToken = false;
			if (column > 0) inToken = !!line.charAt(column - 1).match(this.tokenRe);
			if (!inToken) inToken = !!line.charAt(column).match(this.tokenRe);
			if (inToken) var re = this.tokenRe;
			else if (/^\s+$/.test(line.slice(column - 1, column + 1))) var re = /\s/;
			else var re = this.nonTokenRe;
			var start = column;
			if (start > 0) {
				do
					start--;
				while (start >= 0 && line.charAt(start).match(re));
				start++;
			}
			var end = column;
			while (end < line.length && line.charAt(end).match(re)) end++;
			return new Range(row, start, row, end);
		}
		getAWordRange(row, column) {
			var wordRange = this.getWordRange(row, column);
			var line = this.getLine(wordRange.end.row);
			while (line.charAt(wordRange.end.column).match(/[ \t]/)) wordRange.end.column += 1;
			return wordRange;
		}
		setNewLineMode(newLineMode) {
			this.doc.setNewLineMode(newLineMode);
		}
		getNewLineMode() {
			return this.doc.getNewLineMode();
		}
		setUseWorker(useWorker) {
			this.setOption("useWorker", useWorker);
		}
		getUseWorker() {
			return this.$useWorker;
		}
		onReloadTokenizer(e) {
			var rows = e.data;
			this.bgTokenizer.start(rows.first);
			this._signal("tokenizerUpdate", e);
		}
		setMode(mode, cb) {
			if (mode && typeof mode === "object") {
				if (mode.getTokenizer) return this.$onChangeMode(mode);
				var options = mode;
				var path = options.path;
			} else path = mode || "ace/mode/text";
			if (!this.$modes["ace/mode/text"]) this.$modes["ace/mode/text"] = new TextMode();
			if (this.$modes[path] && !options) {
				this.$onChangeMode(this.$modes[path]);
				cb && cb();
				return;
			}
			this.$modeId = path;
			config.loadModule(["mode", path], function(m) {
				if (this.destroyed) return;
				if (this.$modeId !== path) return cb && cb();
				if (this.$modes[path] && !options) this.$onChangeMode(this.$modes[path]);
				else if (m && m.Mode) {
					m = new m.Mode(options);
					if (!options) {
						this.$modes[path] = m;
						m.$id = path;
					}
					this.$onChangeMode(m);
				}
				cb && cb();
			}.bind(this));
			if (!this.$mode) this.$onChangeMode(this.$modes["ace/mode/text"], true);
		}
		$onChangeMode(mode, $isPlaceholder) {
			if (!$isPlaceholder) this.$modeId = mode.$id;
			if (this.$mode === mode) return;
			var oldMode = this.$mode;
			this.$mode = mode;
			this.$stopWorker();
			if (this.$useWorker) this.$startWorker();
			var tokenizer = mode.getTokenizer();
			if (tokenizer.on !== void 0) {
				var onReloadTokenizer = this.onReloadTokenizer.bind(this);
				tokenizer.on("update", onReloadTokenizer);
			}
			this.bgTokenizer.setTokenizer(tokenizer);
			this.bgTokenizer.setDocument(this.getDocument());
			this.tokenRe = mode.tokenRe;
			this.nonTokenRe = mode.nonTokenRe;
			if (!$isPlaceholder) {
				if (mode.attachToSession) mode.attachToSession(this);
				this.$options.wrapMethod.set.call(this, this.$wrapMethod);
				this.$setFolding(mode.foldingRules);
				this.bgTokenizer.start(0);
				this._emit("changeMode", {
					oldMode,
					mode
				});
			}
		}
		$stopWorker() {
			if (this.$worker) {
				this.$worker.terminate();
				this.$worker = null;
			}
		}
		$startWorker() {
			try {
				this.$worker = this.$mode.createWorker(this);
			} catch (e) {
				config.warn("Could not load worker", e);
				this.$worker = null;
			}
		}
		getMode() {
			return this.$mode;
		}
		setScrollTop(scrollTop) {
			if (this.$scrollTop === scrollTop || isNaN(scrollTop)) return;
			this.$scrollTop = scrollTop;
			this._signal("changeScrollTop", scrollTop);
		}
		getScrollTop() {
			return this.$scrollTop;
		}
		setScrollLeft(scrollLeft) {
			if (this.$scrollLeft === scrollLeft || isNaN(scrollLeft)) return;
			this.$scrollLeft = scrollLeft;
			this._signal("changeScrollLeft", scrollLeft);
		}
		getScrollLeft() {
			return this.$scrollLeft;
		}
		getScreenWidth() {
			this.$computeWidth();
			if (this.lineWidgets) return Math.max(this.getLineWidgetMaxWidth(), this.screenWidth);
			return this.screenWidth;
		}
		getLineWidgetMaxWidth() {
			if (this.lineWidgetsWidth != null) return this.lineWidgetsWidth;
			var width = 0;
			this.lineWidgets.forEach(function(w) {
				if (w && w.screenWidth > width) width = w.screenWidth;
			});
			return this.lineWidgetWidth = width;
		}
		$computeWidth(force) {
			if (this.$modified || force) {
				this.$modified = false;
				if (this.$useWrapMode) return this.screenWidth = this.$wrapLimit;
				var lines = this.doc.getAllLines();
				var cache = this.$rowLengthCache;
				var longestScreenLine = 0;
				var foldIndex = 0;
				var foldLine = this.$foldData[foldIndex];
				var foldStart = foldLine ? foldLine.start.row : Infinity;
				var len = lines.length;
				for (var i = 0; i < len; i++) {
					if (i > foldStart) {
						i = foldLine.end.row + 1;
						if (i >= len) break;
						foldLine = this.$foldData[foldIndex++];
						foldStart = foldLine ? foldLine.start.row : Infinity;
					}
					if (cache[i] == null) cache[i] = this.$getStringScreenWidth(lines[i])[0];
					if (cache[i] > longestScreenLine) longestScreenLine = cache[i];
				}
				this.screenWidth = longestScreenLine;
			}
		}
		getLine(row) {
			return this.doc.getLine(row);
		}
		getLines(firstRow, lastRow) {
			return this.doc.getLines(firstRow, lastRow);
		}
		getLength() {
			return this.doc.getLength();
		}
		getTextRange(range) {
			return this.doc.getTextRange(range || this.selection.getRange());
		}
		insert(position, text) {
			return this.doc.insert(position, text);
		}
		remove(range) {
			return this.doc.remove(range);
		}
		removeFullLines(firstRow, lastRow) {
			return this.doc.removeFullLines(firstRow, lastRow);
		}
		undoChanges(deltas, dontSelect) {
			if (!deltas.length) return;
			this.$fromUndo = true;
			for (var i = deltas.length - 1; i != -1; i--) {
				var delta = deltas[i];
				if (delta.action == "insert" || delta.action == "remove") this.doc.revertDelta(delta);
				else if (delta.folds) this.addFolds(delta.folds);
			}
			if (!dontSelect && this.$undoSelect) if (deltas.selectionBefore) this.selection.fromJSON(deltas.selectionBefore);
			else this.selection.setRange(this.$getUndoSelection(deltas, true));
			this.$fromUndo = false;
		}
		redoChanges(deltas, dontSelect) {
			if (!deltas.length) return;
			this.$fromUndo = true;
			for (var i = 0; i < deltas.length; i++) {
				var delta = deltas[i];
				if (delta.action == "insert" || delta.action == "remove") this.doc.$safeApplyDelta(delta);
			}
			if (!dontSelect && this.$undoSelect) if (deltas.selectionAfter) this.selection.fromJSON(deltas.selectionAfter);
			else this.selection.setRange(this.$getUndoSelection(deltas, false));
			this.$fromUndo = false;
		}
		setUndoSelect(enable) {
			this.$undoSelect = enable;
		}
		$getUndoSelection(deltas, isUndo) {
			function isInsert(delta$1) {
				return isUndo ? delta$1.action !== "insert" : delta$1.action === "insert";
			}
			var range, point;
			for (var i = 0; i < deltas.length; i++) {
				var delta = deltas[i];
				if (!delta.start) continue;
				if (!range) {
					if (isInsert(delta)) range = Range.fromPoints(delta.start, delta.end);
					else range = Range.fromPoints(delta.start, delta.start);
					continue;
				}
				if (isInsert(delta)) {
					point = delta.start;
					if (range.compare(point.row, point.column) == -1) range.setStart(point);
					point = delta.end;
					if (range.compare(point.row, point.column) == 1) range.setEnd(point);
				} else {
					point = delta.start;
					if (range.compare(point.row, point.column) == -1) range = Range.fromPoints(delta.start, delta.start);
				}
			}
			return range;
		}
		replace(range, text) {
			return this.doc.replace(range, text);
		}
		moveText(fromRange, toPosition, copy) {
			var text = this.getTextRange(fromRange);
			var folds = this.getFoldsInRange(fromRange);
			var toRange = Range.fromPoints(toPosition, toPosition);
			if (!copy) {
				this.remove(fromRange);
				var rowDiff = fromRange.start.row - fromRange.end.row;
				var collDiff = rowDiff ? -fromRange.end.column : fromRange.start.column - fromRange.end.column;
				if (collDiff) {
					if (toRange.start.row == fromRange.end.row && toRange.start.column > fromRange.end.column) toRange.start.column += collDiff;
					if (toRange.end.row == fromRange.end.row && toRange.end.column > fromRange.end.column) toRange.end.column += collDiff;
				}
				if (rowDiff && toRange.start.row >= fromRange.end.row) {
					toRange.start.row += rowDiff;
					toRange.end.row += rowDiff;
				}
			}
			toRange.end = this.insert(toRange.start, text);
			if (folds.length) {
				var oldStart = fromRange.start;
				var newStart = toRange.start;
				var rowDiff = newStart.row - oldStart.row;
				var collDiff = newStart.column - oldStart.column;
				this.addFolds(folds.map(function(x) {
					x = x.clone();
					if (x.start.row == oldStart.row) x.start.column += collDiff;
					if (x.end.row == oldStart.row) x.end.column += collDiff;
					x.start.row += rowDiff;
					x.end.row += rowDiff;
					return x;
				}));
			}
			return toRange;
		}
		indentRows(startRow, endRow, indentString) {
			indentString = indentString.replace(/\t/g, this.getTabString());
			for (var row = startRow; row <= endRow; row++) this.doc.insertInLine({
				row,
				column: 0
			}, indentString);
		}
		outdentRows(range) {
			var rowRange = range.collapseRows();
			var deleteRange = new Range(0, 0, 0, 0);
			var size = this.getTabSize();
			for (var i = rowRange.start.row; i <= rowRange.end.row; ++i) {
				var line = this.getLine(i);
				deleteRange.start.row = i;
				deleteRange.end.row = i;
				for (var j = 0; j < size; ++j) if (line.charAt(j) != " ") break;
				if (j < size && line.charAt(j) == "	") {
					deleteRange.start.column = j;
					deleteRange.end.column = j + 1;
				} else {
					deleteRange.start.column = 0;
					deleteRange.end.column = j;
				}
				this.remove(deleteRange);
			}
		}
		$moveLines(firstRow, lastRow, dir$1) {
			firstRow = this.getRowFoldStart(firstRow);
			lastRow = this.getRowFoldEnd(lastRow);
			if (dir$1 < 0) {
				var row = this.getRowFoldStart(firstRow + dir$1);
				if (row < 0) return 0;
				var diff = row - firstRow;
			} else if (dir$1 > 0) {
				var row = this.getRowFoldEnd(lastRow + dir$1);
				if (row > this.doc.getLength() - 1) return 0;
				var diff = row - lastRow;
			} else {
				firstRow = this.$clipRowToDocument(firstRow);
				lastRow = this.$clipRowToDocument(lastRow);
				var diff = lastRow - firstRow + 1;
			}
			var range = new Range(firstRow, 0, lastRow, Number.MAX_VALUE);
			var folds = this.getFoldsInRange(range).map(function(x) {
				x = x.clone();
				x.start.row += diff;
				x.end.row += diff;
				return x;
			});
			var lines = dir$1 == 0 ? this.doc.getLines(firstRow, lastRow) : this.doc.removeFullLines(firstRow, lastRow);
			this.doc.insertFullLines(firstRow + diff, lines);
			folds.length && this.addFolds(folds);
			return diff;
		}
		moveLinesUp(firstRow, lastRow) {
			return this.$moveLines(firstRow, lastRow, -1);
		}
		moveLinesDown(firstRow, lastRow) {
			return this.$moveLines(firstRow, lastRow, 1);
		}
		duplicateLines(firstRow, lastRow) {
			return this.$moveLines(firstRow, lastRow, 0);
		}
		$clipRowToDocument(row) {
			return Math.max(0, Math.min(row, this.doc.getLength() - 1));
		}
		$clipColumnToRow(row, column) {
			if (column < 0) return 0;
			return Math.min(this.doc.getLine(row).length, column);
		}
		$clipPositionToDocument(row, column) {
			column = Math.max(0, column);
			if (row < 0) {
				row = 0;
				column = 0;
			} else {
				var len = this.doc.getLength();
				if (row >= len) {
					row = len - 1;
					column = this.doc.getLine(len - 1).length;
				} else column = Math.min(this.doc.getLine(row).length, column);
			}
			return {
				row,
				column
			};
		}
		$clipRangeToDocument(range) {
			if (range.start.row < 0) {
				range.start.row = 0;
				range.start.column = 0;
			} else range.start.column = this.$clipColumnToRow(range.start.row, range.start.column);
			var len = this.doc.getLength() - 1;
			if (range.end.row > len) {
				range.end.row = len;
				range.end.column = this.doc.getLine(len).length;
			} else range.end.column = this.$clipColumnToRow(range.end.row, range.end.column);
			return range;
		}
		setUseWrapMode(useWrapMode) {
			if (useWrapMode != this.$useWrapMode) {
				this.$useWrapMode = useWrapMode;
				this.$modified = true;
				this.$resetRowCache(0);
				if (useWrapMode) {
					var len = this.getLength();
					this.$wrapData = Array(len);
					this.$updateWrapData(0, len - 1);
				}
				this._signal("changeWrapMode");
			}
		}
		getUseWrapMode() {
			return this.$useWrapMode;
		}
		setWrapLimitRange(min, max) {
			if (this.$wrapLimitRange.min !== min || this.$wrapLimitRange.max !== max) {
				this.$wrapLimitRange = {
					min,
					max
				};
				this.$modified = true;
				this.$bidiHandler.markAsDirty();
				if (this.$useWrapMode) this._signal("changeWrapMode");
			}
		}
		adjustWrapLimit(desiredLimit, $printMargin) {
			var limits = this.$wrapLimitRange;
			if (limits.max < 0) limits = {
				min: $printMargin,
				max: $printMargin
			};
			var wrapLimit = this.$constrainWrapLimit(desiredLimit, limits.min, limits.max);
			if (wrapLimit != this.$wrapLimit && wrapLimit > 1) {
				this.$wrapLimit = wrapLimit;
				this.$modified = true;
				if (this.$useWrapMode) {
					this.$updateWrapData(0, this.getLength() - 1);
					this.$resetRowCache(0);
					this._signal("changeWrapLimit");
				}
				return true;
			}
			return false;
		}
		$constrainWrapLimit(wrapLimit, min, max) {
			if (min) wrapLimit = Math.max(min, wrapLimit);
			if (max) wrapLimit = Math.min(max, wrapLimit);
			return wrapLimit;
		}
		getWrapLimit() {
			return this.$wrapLimit;
		}
		setWrapLimit(limit) {
			this.setWrapLimitRange(limit, limit);
		}
		getWrapLimitRange() {
			return {
				min: this.$wrapLimitRange.min,
				max: this.$wrapLimitRange.max
			};
		}
		$updateInternalDataOnChange(delta) {
			var useWrapMode = this.$useWrapMode;
			var action = delta.action;
			var start = delta.start;
			var end = delta.end;
			var firstRow = start.row;
			var lastRow = end.row;
			var len = lastRow - firstRow;
			var removedFolds = null;
			this.$updating = true;
			if (len != 0) if (action === "remove") {
				this[useWrapMode ? "$wrapData" : "$rowLengthCache"].splice(firstRow, len);
				var foldLines = this.$foldData;
				removedFolds = this.getFoldsInRange(delta);
				this.removeFolds(removedFolds);
				var foldLine = this.getFoldLine(end.row);
				var idx = 0;
				if (foldLine) {
					foldLine.addRemoveChars(end.row, end.column, start.column - end.column);
					foldLine.shiftRow(-len);
					var foldLineBefore = this.getFoldLine(firstRow);
					if (foldLineBefore && foldLineBefore !== foldLine) {
						foldLineBefore.merge(foldLine);
						foldLine = foldLineBefore;
					}
					idx = foldLines.indexOf(foldLine) + 1;
				}
				for (; idx < foldLines.length; idx++) {
					var foldLine = foldLines[idx];
					if (foldLine.start.row >= end.row) foldLine.shiftRow(-len);
				}
				lastRow = firstRow;
			} else {
				var args = Array(len);
				args.unshift(firstRow, 0);
				var arr = useWrapMode ? this.$wrapData : this.$rowLengthCache;
				arr.splice.apply(arr, args);
				var foldLines = this.$foldData;
				var foldLine = this.getFoldLine(firstRow);
				var idx = 0;
				if (foldLine) {
					var cmp$1 = foldLine.range.compareInside(start.row, start.column);
					if (cmp$1 == 0) {
						foldLine = foldLine.split(start.row, start.column);
						if (foldLine) {
							foldLine.shiftRow(len);
							foldLine.addRemoveChars(lastRow, 0, end.column - start.column);
						}
					} else if (cmp$1 == -1) {
						foldLine.addRemoveChars(firstRow, 0, end.column - start.column);
						foldLine.shiftRow(len);
					}
					idx = foldLines.indexOf(foldLine) + 1;
				}
				for (; idx < foldLines.length; idx++) {
					var foldLine = foldLines[idx];
					if (foldLine.start.row >= firstRow) foldLine.shiftRow(len);
				}
			}
			else {
				len = Math.abs(delta.start.column - delta.end.column);
				if (action === "remove") {
					removedFolds = this.getFoldsInRange(delta);
					this.removeFolds(removedFolds);
					len = -len;
				}
				var foldLine = this.getFoldLine(firstRow);
				if (foldLine) foldLine.addRemoveChars(firstRow, start.column, len);
			}
			if (useWrapMode && this.$wrapData.length != this.doc.getLength()) console.error("doc.getLength() and $wrapData.length have to be the same!");
			this.$updating = false;
			if (useWrapMode) this.$updateWrapData(firstRow, lastRow);
			else this.$updateRowLengthCache(firstRow, lastRow);
			return removedFolds;
		}
		$updateRowLengthCache(firstRow, lastRow) {
			this.$rowLengthCache[firstRow] = null;
			this.$rowLengthCache[lastRow] = null;
		}
		$updateWrapData(firstRow, lastRow) {
			var lines = this.doc.getAllLines();
			var tabSize = this.getTabSize();
			var wrapData = this.$wrapData;
			var wrapLimit = this.$wrapLimit;
			var tokens;
			var foldLine;
			var row = firstRow;
			lastRow = Math.min(lastRow, lines.length - 1);
			while (row <= lastRow) {
				foldLine = this.getFoldLine(row, foldLine);
				if (!foldLine) {
					tokens = this.$getDisplayTokens(lines[row]);
					wrapData[row] = this.$computeWrapSplits(tokens, wrapLimit, tabSize);
					row++;
				} else {
					tokens = [];
					foldLine.walk(function(placeholder, row$1, column, lastColumn) {
						var walkTokens;
						if (placeholder != null) {
							walkTokens = this.$getDisplayTokens(placeholder, tokens.length);
							walkTokens[0] = PLACEHOLDER_START;
							for (var i = 1; i < walkTokens.length; i++) walkTokens[i] = PLACEHOLDER_BODY;
						} else walkTokens = this.$getDisplayTokens(lines[row$1].substring(lastColumn, column), tokens.length);
						tokens = tokens.concat(walkTokens);
					}.bind(this), foldLine.end.row, lines[foldLine.end.row].length + 1);
					wrapData[foldLine.start.row] = this.$computeWrapSplits(tokens, wrapLimit, tabSize);
					row = foldLine.end.row + 1;
				}
			}
		}
		$computeWrapSplits(tokens, wrapLimit, tabSize) {
			if (tokens.length == 0) return [];
			var splits = [];
			var displayLength = tokens.length;
			var lastSplit = 0, lastDocSplit = 0;
			var isCode = this.$wrapAsCode;
			var indentedSoftWrap = this.$indentedSoftWrap;
			var maxIndent = wrapLimit <= Math.max(2 * tabSize, 8) || indentedSoftWrap === false ? 0 : Math.floor(wrapLimit / 2);
			function getWrapIndent() {
				var indentation = 0;
				if (maxIndent === 0) return indentation;
				if (indentedSoftWrap) for (var i = 0; i < tokens.length; i++) {
					var token = tokens[i];
					if (token == SPACE) indentation += 1;
					else if (token == TAB) indentation += tabSize;
					else if (token == TAB_SPACE) continue;
					else break;
				}
				if (isCode && indentedSoftWrap !== false) indentation += tabSize;
				return Math.min(indentation, maxIndent);
			}
			function addSplit(screenPos) {
				var len = screenPos - lastSplit;
				for (var i = lastSplit; i < screenPos; i++) {
					var ch = tokens[i];
					if (ch === 12 || ch === 2) len -= 1;
				}
				if (!splits.length) {
					indent = getWrapIndent();
					splits.indent = indent;
				}
				lastDocSplit += len;
				splits.push(lastDocSplit);
				lastSplit = screenPos;
			}
			var indent = 0;
			while (displayLength - lastSplit > wrapLimit - indent) {
				var split = lastSplit + wrapLimit - indent;
				if (tokens[split - 1] >= SPACE && tokens[split] >= SPACE) {
					addSplit(split);
					continue;
				}
				if (tokens[split] == PLACEHOLDER_START || tokens[split] == PLACEHOLDER_BODY) {
					for (; split != lastSplit - 1; split--) if (tokens[split] == PLACEHOLDER_START) break;
					if (split > lastSplit) {
						addSplit(split);
						continue;
					}
					split = lastSplit + wrapLimit;
					for (; split < tokens.length; split++) if (tokens[split] != PLACEHOLDER_BODY) break;
					if (split == tokens.length) break;
					addSplit(split);
					continue;
				}
				var minSplit = Math.max(split - (wrapLimit - (wrapLimit >> 2)), lastSplit - 1);
				while (split > minSplit && tokens[split] < PLACEHOLDER_START) split--;
				if (isCode) {
					while (split > minSplit && tokens[split] < PLACEHOLDER_START) split--;
					while (split > minSplit && tokens[split] == PUNCTUATION) split--;
				} else while (split > minSplit && tokens[split] < SPACE) split--;
				if (split > minSplit) {
					addSplit(++split);
					continue;
				}
				split = lastSplit + wrapLimit;
				if (tokens[split] == CHAR_EXT) split--;
				addSplit(split - indent);
			}
			return splits;
		}
		$getDisplayTokens(str, offset) {
			var arr = [];
			var tabSize;
			offset = offset || 0;
			for (var i = 0; i < str.length; i++) {
				var c = str.charCodeAt(i);
				if (c == 9) {
					tabSize = this.getScreenTabSize(arr.length + offset);
					arr.push(TAB);
					for (var n = 1; n < tabSize; n++) arr.push(TAB_SPACE);
				} else if (c == 32) arr.push(SPACE);
				else if (c > 39 && c < 48 || c > 57 && c < 64) arr.push(PUNCTUATION);
				else if (c >= 4352 && isFullWidth(c)) arr.push(CHAR, CHAR_EXT);
				else arr.push(CHAR);
			}
			return arr;
		}
		$getStringScreenWidth(str, maxScreenColumn, screenColumn) {
			if (maxScreenColumn == 0) return [0, 0];
			if (maxScreenColumn == null) maxScreenColumn = Infinity;
			screenColumn = screenColumn || 0;
			var c, column;
			for (column = 0; column < str.length; column++) {
				c = str.charCodeAt(column);
				if (c == 9) screenColumn += this.getScreenTabSize(screenColumn);
				else if (c >= 4352 && isFullWidth(c)) screenColumn += 2;
				else screenColumn += 1;
				if (screenColumn > maxScreenColumn) break;
			}
			return [screenColumn, column];
		}
		getRowLength(row) {
			var h = 1;
			if (this.lineWidgets) h += this.lineWidgets[row] && this.lineWidgets[row].rowCount || 0;
			if (!this.$useWrapMode || !this.$wrapData[row]) return h;
			else return this.$wrapData[row].length + h;
		}
		getRowLineCount(row) {
			if (!this.$useWrapMode || !this.$wrapData[row]) return 1;
			else return this.$wrapData[row].length + 1;
		}
		getRowWrapIndent(screenRow) {
			if (this.$useWrapMode) {
				var pos = this.screenToDocumentPosition(screenRow, Number.MAX_VALUE);
				var splits = this.$wrapData[pos.row];
				return splits.length && splits[0] < pos.column ? splits.indent : 0;
			} else return 0;
		}
		getScreenLastRowColumn(screenRow) {
			var pos = this.screenToDocumentPosition(screenRow, Number.MAX_VALUE);
			return this.documentToScreenColumn(pos.row, pos.column);
		}
		getDocumentLastRowColumn(docRow, docColumn) {
			var screenRow = this.documentToScreenRow(docRow, docColumn);
			return this.getScreenLastRowColumn(screenRow);
		}
		getDocumentLastRowColumnPosition(docRow, docColumn) {
			var screenRow = this.documentToScreenRow(docRow, docColumn);
			return this.screenToDocumentPosition(screenRow, Number.MAX_VALUE / 10);
		}
		getRowSplitData(row) {
			if (!this.$useWrapMode) return;
			else return this.$wrapData[row];
		}
		getScreenTabSize(screenColumn) {
			return this.$tabSize - (screenColumn % this.$tabSize | 0);
		}
		screenToDocumentRow(screenRow, screenColumn) {
			return this.screenToDocumentPosition(screenRow, screenColumn).row;
		}
		screenToDocumentColumn(screenRow, screenColumn) {
			return this.screenToDocumentPosition(screenRow, screenColumn).column;
		}
		screenToDocumentPosition(screenRow, screenColumn, offsetX) {
			if (screenRow < 0) return {
				row: 0,
				column: 0
			};
			var line;
			var docRow = 0;
			var docColumn = 0;
			var column;
			var row = 0;
			var rowLength = 0;
			var rowCache = this.$screenRowCache;
			var i = this.$getRowCacheIndex(rowCache, screenRow);
			var l = rowCache.length;
			if (l && i >= 0) {
				var row = rowCache[i];
				var docRow = this.$docRowCache[i];
				var doCache = screenRow > rowCache[l - 1];
			} else var doCache = !l;
			var maxRow = this.getLength() - 1;
			var foldLine = this.getNextFoldLine(docRow);
			var foldStart = foldLine ? foldLine.start.row : Infinity;
			while (row <= screenRow) {
				rowLength = this.getRowLength(docRow);
				if (row + rowLength > screenRow || docRow >= maxRow) break;
				else {
					row += rowLength;
					docRow++;
					if (docRow > foldStart) {
						docRow = foldLine.end.row + 1;
						foldLine = this.getNextFoldLine(docRow, foldLine);
						foldStart = foldLine ? foldLine.start.row : Infinity;
					}
				}
				if (doCache) {
					this.$docRowCache.push(docRow);
					this.$screenRowCache.push(row);
				}
			}
			if (foldLine && foldLine.start.row <= docRow) {
				line = this.getFoldDisplayLine(foldLine);
				docRow = foldLine.start.row;
			} else if (row + rowLength <= screenRow || docRow > maxRow) return {
				row: maxRow,
				column: this.getLine(maxRow).length
			};
			else {
				line = this.getLine(docRow);
				foldLine = null;
			}
			var wrapIndent = 0, splitIndex = Math.floor(screenRow - row);
			if (this.$useWrapMode) {
				var splits = this.$wrapData[docRow];
				if (splits) {
					column = splits[splitIndex];
					if (splitIndex > 0 && splits.length) {
						wrapIndent = splits.indent;
						docColumn = splits[splitIndex - 1] || splits[splits.length - 1];
						line = line.substring(docColumn);
					}
				}
			}
			if (offsetX !== void 0 && this.$bidiHandler.isBidiRow(row + splitIndex, docRow, splitIndex)) screenColumn = this.$bidiHandler.offsetToCol(offsetX);
			docColumn += this.$getStringScreenWidth(line, screenColumn - wrapIndent)[1];
			if (this.$useWrapMode && docColumn >= column) docColumn = column - 1;
			if (foldLine) return foldLine.idxToPosition(docColumn);
			return {
				row: docRow,
				column: docColumn
			};
		}
		documentToScreenPosition(docRow, docColumn) {
			if (typeof docColumn === "undefined") var pos = this.$clipPositionToDocument(docRow.row, docRow.column);
			else pos = this.$clipPositionToDocument(docRow, docColumn);
			docRow = pos.row;
			docColumn = pos.column;
			var screenRow = 0;
			var foldStartRow = null;
			var fold = null;
			fold = this.getFoldAt(docRow, docColumn, 1);
			if (fold) {
				docRow = fold.start.row;
				docColumn = fold.start.column;
			}
			var rowEnd, row = 0;
			var rowCache = this.$docRowCache;
			var i = this.$getRowCacheIndex(rowCache, docRow);
			var l = rowCache.length;
			if (l && i >= 0) {
				var row = rowCache[i];
				var screenRow = this.$screenRowCache[i];
				var doCache = docRow > rowCache[l - 1];
			} else var doCache = !l;
			var foldLine = this.getNextFoldLine(row);
			var foldStart = foldLine ? foldLine.start.row : Infinity;
			while (row < docRow) {
				if (row >= foldStart) {
					rowEnd = foldLine.end.row + 1;
					if (rowEnd > docRow) break;
					foldLine = this.getNextFoldLine(rowEnd, foldLine);
					foldStart = foldLine ? foldLine.start.row : Infinity;
				} else rowEnd = row + 1;
				screenRow += this.getRowLength(row);
				row = rowEnd;
				if (doCache) {
					this.$docRowCache.push(row);
					this.$screenRowCache.push(screenRow);
				}
			}
			var textLine = "";
			if (foldLine && row >= foldStart) {
				textLine = this.getFoldDisplayLine(foldLine, docRow, docColumn);
				foldStartRow = foldLine.start.row;
			} else {
				textLine = this.getLine(docRow).substring(0, docColumn);
				foldStartRow = docRow;
			}
			var wrapIndent = 0;
			if (this.$useWrapMode) {
				var wrapRow = this.$wrapData[foldStartRow];
				if (wrapRow) {
					var screenRowOffset = 0;
					while (textLine.length >= wrapRow[screenRowOffset]) {
						screenRow++;
						screenRowOffset++;
					}
					textLine = textLine.substring(wrapRow[screenRowOffset - 1] || 0, textLine.length);
					wrapIndent = screenRowOffset > 0 ? wrapRow.indent : 0;
				}
			}
			if (this.lineWidgets && this.lineWidgets[row] && this.lineWidgets[row].rowsAbove) screenRow += this.lineWidgets[row].rowsAbove;
			return {
				row: screenRow,
				column: wrapIndent + this.$getStringScreenWidth(textLine)[0]
			};
		}
		documentToScreenColumn(row, docColumn) {
			return this.documentToScreenPosition(row, docColumn).column;
		}
		documentToScreenRow(docRow, docColumn) {
			return this.documentToScreenPosition(docRow, docColumn).row;
		}
		getScreenLength() {
			var screenRows = 0;
			var fold = null;
			if (!this.$useWrapMode) {
				screenRows = this.getLength();
				var foldData = this.$foldData;
				for (var i = 0; i < foldData.length; i++) {
					fold = foldData[i];
					screenRows -= fold.end.row - fold.start.row;
				}
			} else {
				var lastRow = this.$wrapData.length;
				var row = 0, i = 0;
				var fold = this.$foldData[i++];
				var foldStart = fold ? fold.start.row : Infinity;
				while (row < lastRow) {
					var splits = this.$wrapData[row];
					screenRows += splits ? splits.length + 1 : 1;
					row++;
					if (row > foldStart) {
						row = fold.end.row + 1;
						fold = this.$foldData[i++];
						foldStart = fold ? fold.start.row : Infinity;
					}
				}
			}
			if (this.lineWidgets) screenRows += this.$getWidgetScreenLength();
			return screenRows;
		}
		$setFontMetrics(fm) {
			if (!this.$enableVarChar) return;
			this.$getStringScreenWidth = function(str, maxScreenColumn, screenColumn) {
				if (maxScreenColumn === 0) return [0, 0];
				if (!maxScreenColumn) maxScreenColumn = Infinity;
				screenColumn = screenColumn || 0;
				var c, column;
				for (column = 0; column < str.length; column++) {
					c = str.charAt(column);
					if (c === "	") screenColumn += this.getScreenTabSize(screenColumn);
					else screenColumn += fm.getCharacterWidth(c);
					if (screenColumn > maxScreenColumn) break;
				}
				return [screenColumn, column];
			};
		}
		getPrecedingCharacter() {
			var pos = this.selection.getCursor();
			if (pos.column === 0) return pos.row === 0 ? "" : this.doc.getNewLineCharacter();
			return this.getLine(pos.row)[pos.column - 1];
		}
		destroy() {
			if (!this.destroyed) {
				this.bgTokenizer.setDocument(null);
				this.bgTokenizer.cleanup();
				this.destroyed = true;
			}
			this.endOperation();
			this.$stopWorker();
			this.removeAllListeners();
			if (this.doc) this.doc.off("change", this.$onChange);
			if (this.selection) {
				this.selection.off("changeCursor", this.$onSelectionChange);
				this.selection.off("changeSelection", this.$onSelectionChange);
			}
			this.selection.detach();
		}
	};
	EditSession.$uid = 0;
	EditSession.prototype.$modes = config.$modes;
	EditSession.prototype.getValue = EditSession.prototype.toString;
	EditSession.prototype.$defaultUndoManager = {
		undo: function() {},
		redo: function() {},
		hasUndo: function() {},
		hasRedo: function() {},
		reset: function() {},
		add: function() {},
		addSelection: function() {},
		startNewGroup: function() {},
		addSession: function() {}
	};
	EditSession.prototype.$overwrite = false;
	EditSession.prototype.$mode = null;
	EditSession.prototype.$modeId = null;
	EditSession.prototype.$scrollTop = 0;
	EditSession.prototype.$scrollLeft = 0;
	EditSession.prototype.$wrapLimit = 80;
	EditSession.prototype.$useWrapMode = false;
	EditSession.prototype.$wrapLimitRange = {
		min: null,
		max: null
	};
	EditSession.prototype.lineWidgets = null;
	EditSession.prototype.isFullWidth = isFullWidth;
	oop.implement(EditSession.prototype, EventEmitter);
	var CHAR = 1, CHAR_EXT = 2, PLACEHOLDER_START = 3, PLACEHOLDER_BODY = 4, PUNCTUATION = 9, SPACE = 10, TAB = 11, TAB_SPACE = 12;
	function isFullWidth(c) {
		if (c < 4352) return false;
		return c >= 4352 && c <= 4447 || c >= 4515 && c <= 4519 || c >= 4602 && c <= 4607 || c >= 9001 && c <= 9002 || c >= 11904 && c <= 11929 || c >= 11931 && c <= 12019 || c >= 12032 && c <= 12245 || c >= 12272 && c <= 12283 || c >= 12288 && c <= 12350 || c >= 12353 && c <= 12438 || c >= 12441 && c <= 12543 || c >= 12549 && c <= 12589 || c >= 12593 && c <= 12686 || c >= 12688 && c <= 12730 || c >= 12736 && c <= 12771 || c >= 12784 && c <= 12830 || c >= 12832 && c <= 12871 || c >= 12880 && c <= 13054 || c >= 13056 && c <= 19903 || c >= 19968 && c <= 42124 || c >= 42128 && c <= 42182 || c >= 43360 && c <= 43388 || c >= 44032 && c <= 55203 || c >= 55216 && c <= 55238 || c >= 55243 && c <= 55291 || c >= 63744 && c <= 64255 || c >= 65040 && c <= 65049 || c >= 65072 && c <= 65106 || c >= 65108 && c <= 65126 || c >= 65128 && c <= 65131 || c >= 65281 && c <= 65376 || c >= 65504 && c <= 65510;
	}
	require_folding().Folding.call(EditSession.prototype);
	require_bracket_match().BracketMatch.call(EditSession.prototype);
	config.defineOptions(EditSession.prototype, "session", {
		wrap: {
			set: function(value) {
				if (!value || value == "off") value = false;
				else if (value == "free") value = true;
				else if (value == "printMargin") value = -1;
				else if (typeof value == "string") value = parseInt(value, 10) || false;
				if (this.$wrap == value) return;
				this.$wrap = value;
				if (!value) this.setUseWrapMode(false);
				else {
					var col = typeof value == "number" ? value : null;
					this.setWrapLimitRange(col, col);
					this.setUseWrapMode(true);
				}
			},
			get: function() {
				if (this.getUseWrapMode()) {
					if (this.$wrap == -1) return "printMargin";
					if (!this.getWrapLimitRange().min) return "free";
					return this.$wrap;
				}
				return "off";
			},
			handlesSet: true
		},
		wrapMethod: {
			set: function(val) {
				val = val == "auto" ? this.$mode.type != "text" : val != "text";
				if (val != this.$wrapAsCode) {
					this.$wrapAsCode = val;
					if (this.$useWrapMode) {
						this.$useWrapMode = false;
						this.setUseWrapMode(true);
					}
				}
			},
			initialValue: "auto"
		},
		indentedSoftWrap: {
			set: function() {
				if (this.$useWrapMode) {
					this.$useWrapMode = false;
					this.setUseWrapMode(true);
				}
			},
			initialValue: true
		},
		firstLineNumber: {
			set: function() {
				this._signal("changeBreakpoint");
			},
			initialValue: 1
		},
		useWorker: {
			set: function(useWorker) {
				this.$useWorker = useWorker;
				this.$stopWorker();
				if (useWorker) this.$startWorker();
			},
			initialValue: true
		},
		useSoftTabs: { initialValue: true },
		tabSize: {
			set: function(tabSize) {
				tabSize = parseInt(tabSize);
				if (tabSize > 0 && this.$tabSize !== tabSize) {
					this.$modified = true;
					this.$rowLengthCache = [];
					this.$tabSize = tabSize;
					this._signal("changeTabSize");
				}
			},
			initialValue: 4,
			handlesSet: true
		},
		navigateWithinSoftTabs: { initialValue: false },
		foldStyle: {
			set: function(val) {
				this.setFoldStyle(val);
			},
			handlesSet: true
		},
		overwrite: {
			set: function(val) {
				this._signal("changeOverwrite");
			},
			initialValue: false
		},
		newLineMode: {
			set: function(val) {
				this.doc.setNewLineMode(val);
			},
			get: function() {
				return this.doc.getNewLineMode();
			},
			handlesSet: true
		},
		mode: {
			set: function(val) {
				this.setMode(val);
			},
			get: function() {
				return this.$modeId;
			},
			handlesSet: true
		}
	});
	exports.EditSession = EditSession;
}));
export { require_line_widgets as a, require_search_highlight as i, require_range_list as n, require_selection as o, require_undomanager as r, require_mouse_event as s, require_edit_session as t };
