import { t as __commonJSMin } from "./chunk-iA-Slpst.js";
import { t as require_dom } from "./dom-BBjJ92-n.js";
import { t as require_oop } from "./oop-DcdK5Mrs.js";
import { t as require_lang } from "./lang-DcNOSqFo.js";
import { t as require_config } from "./config-DPm1ug3B.js";
import { t as require_event_emitter } from "./event_emitter-BGfSYA24.js";
import { t as require_text_util } from "./text_util-Bdb4x69F.js";
var require_lines = /* @__PURE__ */ __commonJSMin(((exports) => {
	var dom$1 = require_dom();
	var Lines$1 = class {
		constructor(element, canvasHeight) {
			this.element = element;
			this.canvasHeight = canvasHeight || 5e5;
			this.element.style.height = this.canvasHeight * 2 + "px";
			this.cells = [];
			this.cellCache = [];
			this.$offsetCoefficient = 0;
		}
		moveContainer(config) {
			dom$1.translate(this.element, 0, -(config.firstRowScreen * config.lineHeight % this.canvasHeight) - config.offset * this.$offsetCoefficient);
		}
		pageChanged(oldConfig, newConfig) {
			return Math.floor(oldConfig.firstRowScreen * oldConfig.lineHeight / this.canvasHeight) !== Math.floor(newConfig.firstRowScreen * newConfig.lineHeight / this.canvasHeight);
		}
		computeLineTop(row, config, session) {
			var screenTop = config.firstRowScreen * config.lineHeight;
			var screenPage = Math.floor(screenTop / this.canvasHeight);
			return session.documentToScreenRow(row, 0) * config.lineHeight - screenPage * this.canvasHeight;
		}
		computeLineHeight(row, config, session) {
			return config.lineHeight * session.getRowLineCount(row);
		}
		getLength() {
			return this.cells.length;
		}
		get(index) {
			return this.cells[index];
		}
		shift() {
			this.$cacheCell(this.cells.shift());
		}
		pop() {
			this.$cacheCell(this.cells.pop());
		}
		push(cell) {
			if (Array.isArray(cell)) {
				this.cells.push.apply(this.cells, cell);
				var fragment = dom$1.createFragment(this.element);
				for (var i = 0; i < cell.length; i++) fragment.appendChild(cell[i].element);
				this.element.appendChild(fragment);
			} else {
				this.cells.push(cell);
				this.element.appendChild(cell.element);
			}
		}
		unshift(cell) {
			if (Array.isArray(cell)) {
				this.cells.unshift.apply(this.cells, cell);
				var fragment = dom$1.createFragment(this.element);
				for (var i = 0; i < cell.length; i++) fragment.appendChild(cell[i].element);
				if (this.element.firstChild) this.element.insertBefore(fragment, this.element.firstChild);
				else this.element.appendChild(fragment);
			} else {
				this.cells.unshift(cell);
				this.element.insertAdjacentElement("afterbegin", cell.element);
			}
		}
		last() {
			if (this.cells.length) return this.cells[this.cells.length - 1];
			else return null;
		}
		$cacheCell(cell) {
			if (!cell) return;
			cell.element.remove();
			this.cellCache.push(cell);
		}
		createCell(row, config, session, initElement) {
			var cell = this.cellCache.pop();
			if (!cell) {
				var element = dom$1.createElement("div");
				if (initElement) initElement(element);
				this.element.appendChild(element);
				cell = {
					element,
					text: "",
					row
				};
			}
			cell.row = row;
			return cell;
		}
	};
	exports.Lines = Lines$1;
}));
var require_text = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var dom = require_dom();
	var lang = require_lang();
	var Lines = require_lines().Lines;
	var EventEmitter = require_event_emitter().EventEmitter;
	var nls = require_config().nls;
	var isTextToken = require_text_util().isTextToken;
	var Text = class {
		constructor(parentEl) {
			this.dom = dom;
			this.element = this.dom.createElement("div");
			this.element.className = "ace_layer ace_text-layer";
			parentEl.appendChild(this.element);
			this.$updateEolChar = this.$updateEolChar.bind(this);
			this.$lines = new Lines(this.element);
		}
		$updateEolChar() {
			var doc = this.session.doc;
			var EOL_CHAR = doc.getNewLineCharacter() == "\n" && doc.getNewLineMode() != "windows" ? this.EOL_CHAR_LF : this.EOL_CHAR_CRLF;
			if (this.EOL_CHAR != EOL_CHAR) {
				this.EOL_CHAR = EOL_CHAR;
				return true;
			}
		}
		setPadding(padding) {
			this.$padding = padding;
			this.element.style.margin = "0 " + padding + "px";
		}
		getLineHeight() {
			return this.$fontMetrics.$characterSize.height || 0;
		}
		getCharacterWidth() {
			return this.$fontMetrics.$characterSize.width || 0;
		}
		$setFontMetrics(measure) {
			this.$fontMetrics = measure;
			this.$fontMetrics.on("changeCharacterSize", function(e) {
				this._signal("changeCharacterSize", e);
			}.bind(this));
			this.$pollSizeChanges();
		}
		checkForSizeChanges() {
			this.$fontMetrics.checkForSizeChanges();
		}
		$pollSizeChanges() {
			return this.$pollSizeChangesTimer = this.$fontMetrics.$pollSizeChanges();
		}
		setSession(session) {
			this.session = session;
			if (session) this.$computeTabString();
		}
		setShowInvisibles(showInvisibles) {
			if (this.showInvisibles == showInvisibles) return false;
			this.showInvisibles = showInvisibles;
			if (typeof showInvisibles == "string") {
				this.showSpaces = /tab/i.test(showInvisibles);
				this.showTabs = /space/i.test(showInvisibles);
				this.showEOL = /eol/i.test(showInvisibles);
			} else this.showSpaces = this.showTabs = this.showEOL = showInvisibles;
			this.$computeTabString();
			return true;
		}
		setDisplayIndentGuides(display) {
			if (this.displayIndentGuides == display) return false;
			this.displayIndentGuides = display;
			this.$computeTabString();
			return true;
		}
		setHighlightIndentGuides(highlight) {
			if (this.$highlightIndentGuides === highlight) return false;
			this.$highlightIndentGuides = highlight;
			return highlight;
		}
		$computeTabString() {
			var tabSize = this.session.getTabSize();
			this.tabSize = tabSize;
			var tabStr = this.$tabStrings = [0];
			for (var i = 1; i < tabSize + 1; i++) if (this.showTabs) {
				var span = this.dom.createElement("span");
				span.className = "ace_invisible ace_invisible_tab";
				span.textContent = lang.stringRepeat(this.TAB_CHAR, i);
				tabStr.push(span);
			} else tabStr.push(this.dom.createTextNode(lang.stringRepeat(" ", i), this.element));
			if (this.displayIndentGuides) {
				this.$indentGuideRe = /\s\S| \t|\t |\s$/;
				var className = "ace_indent-guide";
				var spaceClass = this.showSpaces ? " ace_invisible ace_invisible_space" : "";
				var spaceContent = this.showSpaces ? lang.stringRepeat(this.SPACE_CHAR, this.tabSize) : lang.stringRepeat(" ", this.tabSize);
				var tabClass = this.showTabs ? " ace_invisible ace_invisible_tab" : "";
				var tabContent = this.showTabs ? lang.stringRepeat(this.TAB_CHAR, this.tabSize) : spaceContent;
				var span = this.dom.createElement("span");
				span.className = className + spaceClass;
				span.textContent = spaceContent;
				this.$tabStrings[" "] = span;
				var span = this.dom.createElement("span");
				span.className = className + tabClass;
				span.textContent = tabContent;
				this.$tabStrings["	"] = span;
			}
		}
		updateLines(config, firstRow, lastRow) {
			if (this.config.lastRow != config.lastRow || this.config.firstRow != config.firstRow) return this.update(config);
			this.config = config;
			var first = Math.max(firstRow, config.firstRow);
			var last = Math.min(lastRow, config.lastRow);
			var lineElements = this.element.childNodes;
			var lineElementsIdx = 0;
			for (var row = config.firstRow; row < first; row++) {
				var foldLine = this.session.getFoldLine(row);
				if (foldLine) if (foldLine.containsRow(first)) {
					first = foldLine.start.row;
					break;
				} else row = foldLine.end.row;
				lineElementsIdx++;
			}
			var heightChanged = false;
			var row = first;
			var foldLine = this.session.getNextFoldLine(row);
			var foldStart = foldLine ? foldLine.start.row : Infinity;
			while (true) {
				if (row > foldStart) {
					row = foldLine.end.row + 1;
					foldLine = this.session.getNextFoldLine(row, foldLine);
					foldStart = foldLine ? foldLine.start.row : Infinity;
				}
				if (row > last) break;
				var lineElement = lineElements[lineElementsIdx++];
				if (lineElement) {
					this.dom.removeChildren(lineElement);
					this.$renderLine(lineElement, row, row == foldStart ? foldLine : false);
					if (heightChanged) lineElement.style.top = this.$lines.computeLineTop(row, config, this.session) + "px";
					var height = config.lineHeight * this.session.getRowLength(row) + "px";
					if (lineElement.style.height != height) {
						heightChanged = true;
						lineElement.style.height = height;
					}
				}
				row++;
			}
			if (heightChanged) while (lineElementsIdx < this.$lines.cells.length) {
				var cell = this.$lines.cells[lineElementsIdx++];
				cell.element.style.top = this.$lines.computeLineTop(cell.row, config, this.session) + "px";
			}
		}
		scrollLines(config) {
			var oldConfig = this.config;
			this.config = config;
			if (this.$lines.pageChanged(oldConfig, config)) return this.update(config);
			this.$lines.moveContainer(config);
			var lastRow = config.lastRow;
			var oldLastRow = oldConfig ? oldConfig.lastRow : -1;
			if (!oldConfig || oldLastRow < config.firstRow) return this.update(config);
			if (lastRow < oldConfig.firstRow) return this.update(config);
			if (!oldConfig || oldConfig.lastRow < config.firstRow) return this.update(config);
			if (config.lastRow < oldConfig.firstRow) return this.update(config);
			if (oldConfig.firstRow < config.firstRow) for (var row = this.session.getFoldedRowCount(oldConfig.firstRow, config.firstRow - 1); row > 0; row--) this.$lines.shift();
			if (oldConfig.lastRow > config.lastRow) for (var row = this.session.getFoldedRowCount(config.lastRow + 1, oldConfig.lastRow); row > 0; row--) this.$lines.pop();
			if (config.firstRow < oldConfig.firstRow) this.$lines.unshift(this.$renderLinesFragment(config, config.firstRow, oldConfig.firstRow - 1));
			if (config.lastRow > oldConfig.lastRow) this.$lines.push(this.$renderLinesFragment(config, oldConfig.lastRow + 1, config.lastRow));
			this.$highlightIndentGuide();
		}
		$renderLinesFragment(config, firstRow, lastRow) {
			var fragment = [];
			var row = firstRow;
			var foldLine = this.session.getNextFoldLine(row);
			var foldStart = foldLine ? foldLine.start.row : Infinity;
			while (true) {
				if (row > foldStart) {
					row = foldLine.end.row + 1;
					foldLine = this.session.getNextFoldLine(row, foldLine);
					foldStart = foldLine ? foldLine.start.row : Infinity;
				}
				if (row > lastRow) break;
				var line = this.$lines.createCell(row, config, this.session);
				var lineEl = line.element;
				this.dom.removeChildren(lineEl);
				dom.setStyle(lineEl.style, "height", this.$lines.computeLineHeight(row, config, this.session) + "px");
				dom.setStyle(lineEl.style, "top", this.$lines.computeLineTop(row, config, this.session) + "px");
				this.$renderLine(lineEl, row, row == foldStart ? foldLine : false);
				if (this.$useLineGroups()) lineEl.className = "ace_line_group";
				else lineEl.className = "ace_line";
				fragment.push(line);
				row++;
			}
			return fragment;
		}
		update(config) {
			this.$lines.moveContainer(config);
			this.config = config;
			var firstRow = config.firstRow;
			var lastRow = config.lastRow;
			var lines = this.$lines;
			while (lines.getLength()) lines.pop();
			lines.push(this.$renderLinesFragment(config, firstRow, lastRow));
		}
		$renderToken(parent, screenColumn, token, value) {
			var self = this;
			var re = /(\t)|( +)|([\x00-\x1f\x80-\xa0\xad\u1680\u180E\u2000-\u200f\u2028\u2029\u202F\u205F\uFEFF\uFFF9-\uFFFC\u2066\u2067\u2068\u202A\u202B\u202D\u202E\u202C\u2069\u2060\u2061\u2062\u2063\u2064\u206A\u206B\u206B\u206C\u206D\u206E\u206F]+)|(\u3000)|([\u1100-\u115F\u11A3-\u11A7\u11FA-\u11FF\u2329-\u232A\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFB\u3001-\u303E\u3041-\u3096\u3099-\u30FF\u3105-\u312D\u3131-\u318E\u3190-\u31BA\u31C0-\u31E3\u31F0-\u321E\u3220-\u3247\u3250-\u32FE\u3300-\u4DBF\u4E00-\uA48C\uA490-\uA4C6\uA960-\uA97C\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFAFF\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE66\uFE68-\uFE6B\uFF01-\uFF60\uFFE0-\uFFE6]|[\uD800-\uDBFF][\uDC00-\uDFFF])/g;
			var valueFragment = this.dom.createFragment(this.element);
			var m;
			var i = 0;
			while (m = re.exec(value)) {
				var tab = m[1];
				var simpleSpace = m[2];
				var controlCharacter = m[3];
				var cjkSpace = m[4];
				var cjk = m[5];
				if (!self.showSpaces && simpleSpace) continue;
				var before = i != m.index ? value.slice(i, m.index) : "";
				i = m.index + m[0].length;
				if (before) valueFragment.appendChild(this.dom.createTextNode(before, this.element));
				if (tab) {
					var tabSize = self.session.getScreenTabSize(screenColumn + m.index);
					var text = self.$tabStrings[tabSize].cloneNode(true);
					text["charCount"] = 1;
					valueFragment.appendChild(text);
					screenColumn += tabSize - 1;
				} else if (simpleSpace) if (self.showSpaces) {
					var span = this.dom.createElement("span");
					span.className = "ace_invisible ace_invisible_space";
					span.textContent = lang.stringRepeat(self.SPACE_CHAR, simpleSpace.length);
					valueFragment.appendChild(span);
				} else valueFragment.appendChild(this.dom.createTextNode(simpleSpace, this.element));
				else if (controlCharacter) {
					var span = this.dom.createElement("span");
					span.className = "ace_invisible ace_invisible_space ace_invalid";
					span.textContent = lang.stringRepeat(self.SPACE_CHAR, controlCharacter.length);
					valueFragment.appendChild(span);
				} else if (cjkSpace) {
					screenColumn += 1;
					var span = this.dom.createElement("span");
					span.style.width = self.config.characterWidth * 2 + "px";
					span.className = self.showSpaces ? "ace_cjk ace_invisible ace_invisible_space" : "ace_cjk";
					span.textContent = self.showSpaces ? self.SPACE_CHAR : cjkSpace;
					valueFragment.appendChild(span);
				} else if (cjk) {
					screenColumn += 1;
					var span = this.dom.createElement("span");
					span.style.width = self.config.characterWidth * 2 + "px";
					span.className = "ace_cjk";
					span.textContent = cjk;
					valueFragment.appendChild(span);
				}
			}
			valueFragment.appendChild(this.dom.createTextNode(i ? value.slice(i) : value, this.element));
			if (!isTextToken(token.type)) {
				var classes = "ace_" + token.type.replace(/\./g, " ace_");
				var span = this.dom.createElement("span");
				if (token.type == "fold") {
					span.style.width = token.value.length * this.config.characterWidth + "px";
					span.setAttribute("title", nls("inline-fold.closed.title", "Unfold code"));
				}
				span.className = classes;
				span.appendChild(valueFragment);
				parent.appendChild(span);
			} else parent.appendChild(valueFragment);
			return screenColumn + value.length;
		}
		renderIndentGuide(parent, value, max) {
			var cols = value.search(this.$indentGuideRe);
			if (cols <= 0 || cols >= max) return value;
			if (value[0] == " ") {
				cols -= cols % this.tabSize;
				var count = cols / this.tabSize;
				for (var i = 0; i < count; i++) parent.appendChild(this.$tabStrings[" "].cloneNode(true));
				this.$highlightIndentGuide();
				return value.substr(cols);
			} else if (value[0] == "	") {
				for (var i = 0; i < cols; i++) parent.appendChild(this.$tabStrings["	"].cloneNode(true));
				this.$highlightIndentGuide();
				return value.substr(cols);
			}
			this.$highlightIndentGuide();
			return value;
		}
		$highlightIndentGuide() {
			if (!this.$highlightIndentGuides || !this.displayIndentGuides) return;
			this.$highlightIndentGuideMarker = {
				indentLevel: void 0,
				start: void 0,
				end: void 0,
				dir: void 0
			};
			var lines = this.session.doc.$lines;
			if (!lines) return;
			var cursor = this.session.selection.getCursor();
			var initialIndent = /^\s*/.exec(this.session.doc.getLine(cursor.row))[0].length;
			this.$highlightIndentGuideMarker = {
				indentLevel: Math.floor(initialIndent / this.tabSize),
				start: cursor.row
			};
			if (this.session.$bracketHighlight) {
				var ranges = this.session.$bracketHighlight.ranges;
				for (var i = 0; i < ranges.length; i++) if (cursor.row !== ranges[i].start.row) {
					this.$highlightIndentGuideMarker.end = ranges[i].start.row + 1;
					if (cursor.row > ranges[i].start.row) this.$highlightIndentGuideMarker.dir = -1;
					else this.$highlightIndentGuideMarker.dir = 1;
					break;
				}
			}
			if (!this.$highlightIndentGuideMarker.end) {
				if (lines[cursor.row] !== "" && cursor.column === lines[cursor.row].length) {
					this.$highlightIndentGuideMarker.dir = 1;
					for (var i = cursor.row + 1; i < lines.length; i++) {
						var line = lines[i];
						var currentIndent = /^\s*/.exec(line)[0].length;
						if (line !== "") {
							this.$highlightIndentGuideMarker.end = i;
							if (currentIndent <= initialIndent) break;
						}
					}
				}
			}
			this.$renderHighlightIndentGuide();
		}
		$clearActiveIndentGuide() {
			var activeIndentGuides = this.element.querySelectorAll(".ace_indent-guide-active");
			for (var i = 0; i < activeIndentGuides.length; i++) activeIndentGuides[i].classList.remove("ace_indent-guide-active");
		}
		$setIndentGuideActive(cell, indentLevel) {
			if (this.session.doc.getLine(cell.row) !== "") {
				let element = cell.element;
				if (cell.element.classList && cell.element.classList.contains("ace_line_group")) if (cell.element.childNodes.length > 0) element = cell.element.childNodes[0];
				else return;
				var childNodes = element.childNodes;
				if (childNodes) {
					let node = childNodes[indentLevel - 1];
					if (node && node.classList && node.classList.contains("ace_indent-guide")) node.classList.add("ace_indent-guide-active");
				}
			}
		}
		$renderHighlightIndentGuide() {
			if (!this.$lines) return;
			var cells = this.$lines.cells;
			this.$clearActiveIndentGuide();
			var indentLevel = this.$highlightIndentGuideMarker.indentLevel;
			if (indentLevel !== 0) if (this.$highlightIndentGuideMarker.dir === 1) for (var i = 0; i < cells.length; i++) {
				var cell = cells[i];
				if (this.$highlightIndentGuideMarker.end && cell.row >= this.$highlightIndentGuideMarker.start + 1) {
					if (cell.row >= this.$highlightIndentGuideMarker.end) break;
					this.$setIndentGuideActive(cell, indentLevel);
				}
			}
			else for (var i = cells.length - 1; i >= 0; i--) {
				var cell = cells[i];
				if (this.$highlightIndentGuideMarker.end && cell.row < this.$highlightIndentGuideMarker.start) {
					if (cell.row < this.$highlightIndentGuideMarker.end) break;
					this.$setIndentGuideActive(cell, indentLevel);
				}
			}
		}
		$createLineElement(parent) {
			var lineEl = this.dom.createElement("div");
			lineEl.className = "ace_line";
			lineEl.style.height = this.config.lineHeight + "px";
			return lineEl;
		}
		$renderWrappedLine(parent, tokens, splits) {
			var chars = 0;
			var split = 0;
			var splitChars = splits[0];
			var screenColumn = 0;
			var lineEl = this.$createLineElement();
			parent.appendChild(lineEl);
			for (var i = 0; i < tokens.length; i++) {
				var token = tokens[i];
				var value = token.value;
				if (i == 0 && this.displayIndentGuides) {
					chars = value.length;
					value = this.renderIndentGuide(lineEl, value, splitChars);
					if (!value) continue;
					chars -= value.length;
				}
				if (chars + value.length < splitChars) {
					screenColumn = this.$renderToken(lineEl, screenColumn, token, value);
					chars += value.length;
				} else {
					while (chars + value.length >= splitChars) {
						screenColumn = this.$renderToken(lineEl, screenColumn, token, value.substring(0, splitChars - chars));
						value = value.substring(splitChars - chars);
						chars = splitChars;
						lineEl = this.$createLineElement();
						parent.appendChild(lineEl);
						var text = this.dom.createTextNode(lang.stringRepeat("\xA0", splits.indent), this.element);
						text["charCount"] = 0;
						lineEl.appendChild(text);
						split++;
						screenColumn = 0;
						splitChars = splits[split] || Number.MAX_VALUE;
					}
					if (value.length != 0) {
						chars += value.length;
						screenColumn = this.$renderToken(lineEl, screenColumn, token, value);
					}
				}
			}
			if (splits[splits.length - 1] > this.MAX_LINE_LENGTH) this.$renderOverflowMessage(lineEl, screenColumn, null, "", true);
		}
		$renderSimpleLine(parent, tokens) {
			var screenColumn = 0;
			for (var i = 0; i < tokens.length; i++) {
				var token = tokens[i];
				var value = token.value;
				if (i == 0 && this.displayIndentGuides) {
					value = this.renderIndentGuide(parent, value);
					if (!value) continue;
				}
				if (screenColumn + value.length > this.MAX_LINE_LENGTH) return this.$renderOverflowMessage(parent, screenColumn, token, value);
				screenColumn = this.$renderToken(parent, screenColumn, token, value);
			}
		}
		$renderOverflowMessage(parent, screenColumn, token, value, hide) {
			token && this.$renderToken(parent, screenColumn, token, value.slice(0, this.MAX_LINE_LENGTH - screenColumn));
			var overflowEl = this.dom.createElement("span");
			overflowEl.className = "ace_inline_button ace_keyword ace_toggle_wrap";
			overflowEl.textContent = hide ? "<hide>" : "<click to see more...>";
			parent.appendChild(overflowEl);
		}
		$renderLine(parent, row, foldLine) {
			if (!foldLine && foldLine != false) foldLine = this.session.getFoldLine(row);
			if (foldLine) var tokens = this.$getFoldLineTokens(row, foldLine);
			else var tokens = this.session.getTokens(row);
			var lastLineEl = parent;
			if (tokens.length) {
				var splits = this.session.getRowSplitData(row);
				if (splits && splits.length) {
					this.$renderWrappedLine(parent, tokens, splits);
					var lastLineEl = parent.lastChild;
				} else {
					var lastLineEl = parent;
					if (this.$useLineGroups()) {
						lastLineEl = this.$createLineElement();
						parent.appendChild(lastLineEl);
					}
					this.$renderSimpleLine(lastLineEl, tokens);
				}
			} else if (this.$useLineGroups()) {
				lastLineEl = this.$createLineElement();
				parent.appendChild(lastLineEl);
			}
			if (this.showEOL && lastLineEl) {
				if (foldLine) row = foldLine.end.row;
				var invisibleEl = this.dom.createElement("span");
				invisibleEl.className = "ace_invisible ace_invisible_eol";
				invisibleEl.textContent = row == this.session.getLength() - 1 ? this.EOF_CHAR : this.EOL_CHAR;
				lastLineEl.appendChild(invisibleEl);
			}
		}
		$getFoldLineTokens(row, foldLine) {
			var session = this.session;
			var renderTokens = [];
			function addTokens(tokens$1, from, to) {
				var idx = 0, col = 0;
				while (col + tokens$1[idx].value.length < from) {
					col += tokens$1[idx].value.length;
					idx++;
					if (idx == tokens$1.length) return;
				}
				if (col != from) {
					var value = tokens$1[idx].value.substring(from - col);
					if (value.length > to - from) value = value.substring(0, to - from);
					renderTokens.push({
						type: tokens$1[idx].type,
						value
					});
					col = from + value.length;
					idx += 1;
				}
				while (col < to && idx < tokens$1.length) {
					var value = tokens$1[idx].value;
					if (value.length + col > to) renderTokens.push({
						type: tokens$1[idx].type,
						value: value.substring(0, to - col)
					});
					else renderTokens.push(tokens$1[idx]);
					col += value.length;
					idx += 1;
				}
			}
			var tokens = session.getTokens(row);
			foldLine.walk(function(placeholder, row$1, column, lastColumn, isNewRow) {
				if (placeholder != null) renderTokens.push({
					type: "fold",
					value: placeholder
				});
				else {
					if (isNewRow) tokens = session.getTokens(row$1);
					if (tokens.length) addTokens(tokens, lastColumn, column);
				}
			}, foldLine.end.row, this.session.getLine(foldLine.end.row).length);
			return renderTokens;
		}
		$useLineGroups() {
			return this.session.getUseWrapMode();
		}
	};
	Text.prototype.EOF_CHAR = "¶";
	Text.prototype.EOL_CHAR_LF = "¬";
	Text.prototype.EOL_CHAR_CRLF = "¤";
	Text.prototype.EOL_CHAR = Text.prototype.EOL_CHAR_LF;
	Text.prototype.TAB_CHAR = "—";
	Text.prototype.SPACE_CHAR = "·";
	Text.prototype.$padding = 0;
	Text.prototype.MAX_LINE_LENGTH = 1e4;
	Text.prototype.showInvisibles = false;
	Text.prototype.showSpaces = false;
	Text.prototype.showTabs = false;
	Text.prototype.showEOL = false;
	Text.prototype.displayIndentGuides = true;
	Text.prototype.$highlightIndentGuides = true;
	Text.prototype.$tabStrings = [];
	Text.prototype.destroy = {};
	Text.prototype.onChangeTabSize = Text.prototype.$computeTabString;
	oop.implement(Text.prototype, EventEmitter);
	exports.Text = Text;
}));
export { require_lines as n, require_text as t };
