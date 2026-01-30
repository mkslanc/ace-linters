import { t as __commonJSMin } from "./chunk-iA-Slpst.js";
import { t as require_useragent } from "./useragent-BODERP_7.js";
import { t as require_dom } from "./dom-BBjJ92-n.js";
import { t as require_range } from "./range-BUVqNbwc.js";
import { t as require_oop } from "./oop-DcdK5Mrs.js";
import { t as require_lang } from "./lang-DcNOSqFo.js";
import { t as require_event } from "./event-BcX-N72I.js";
import { t as require_config } from "./config-DPm1ug3B.js";
import { t as require_event_emitter } from "./event_emitter-BGfSYA24.js";
import { n as require_lines, t as require_text } from "./text-DOzSnOss.js";
import { t as require_text_util } from "./text_util-Bdb4x69F.js";
var require_gutter = /* @__PURE__ */ __commonJSMin(((exports) => {
	var dom$7 = require_dom();
	var oop$5 = require_oop();
	var lang$2 = require_lang();
	var EventEmitter$5 = require_event_emitter().EventEmitter;
	var Lines = require_lines().Lines;
	var nls = require_config().nls;
	var Gutter = class {
		constructor(parentEl) {
			this.$showCursorMarker = null;
			this.element = dom$7.createElement("div");
			this.element.className = "ace_layer ace_gutter-layer";
			parentEl.appendChild(this.element);
			this.setShowFoldWidgets(this.$showFoldWidgets);
			this.gutterWidth = 0;
			this.$annotations = [];
			this.$updateAnnotations = this.$updateAnnotations.bind(this);
			this.$lines = new Lines(this.element);
			this.$lines.$offsetCoefficient = 1;
		}
		setSession(session) {
			if (this.session) this.session.off("change", this.$updateAnnotations);
			this.session = session;
			if (session) session.on("change", this.$updateAnnotations);
		}
		addGutterDecoration(row, className) {
			if (window.console) console.warn && console.warn("deprecated use session.addGutterDecoration");
			this.session.addGutterDecoration(row, className);
		}
		removeGutterDecoration(row, className) {
			if (window.console) console.warn && console.warn("deprecated use session.removeGutterDecoration");
			this.session.removeGutterDecoration(row, className);
		}
		setAnnotations(annotations) {
			this.$annotations = [];
			for (var i = 0; i < annotations.length; i++) {
				var annotation = annotations[i];
				var row = annotation.row;
				var rowInfo = this.$annotations[row];
				if (!rowInfo) rowInfo = this.$annotations[row] = {
					text: [],
					type: [],
					displayText: []
				};
				var annoText = annotation.text;
				var displayAnnoText = annotation.text;
				var annoType = annotation.type;
				annoText = annoText ? lang$2.escapeHTML(annoText) : annotation.html || "";
				displayAnnoText = displayAnnoText ? displayAnnoText : annotation.html || "";
				if (rowInfo.text.indexOf(annoText) === -1) {
					rowInfo.text.push(annoText);
					rowInfo.type.push(annoType);
					rowInfo.displayText.push(displayAnnoText);
				}
				var className = annotation.className;
				if (className) rowInfo.className = className;
				else if (annoType === "error") rowInfo.className = " ace_error";
				else if (annoType === "security" && !/\bace_error\b/.test(rowInfo.className)) rowInfo.className = " ace_security";
				else if (annoType === "warning" && !/\bace_(error|security)\b/.test(rowInfo.className)) rowInfo.className = " ace_warning";
				else if (annoType === "info" && !rowInfo.className) rowInfo.className = " ace_info";
				else if (annoType === "hint" && !rowInfo.className) rowInfo.className = " ace_hint";
			}
		}
		$updateAnnotations(delta) {
			if (!this.$annotations.length) return;
			var firstRow = delta.start.row;
			var len = delta.end.row - firstRow;
			if (len === 0) {} else if (delta.action == "remove") this.$annotations.splice(firstRow, len + 1, null);
			else {
				var args = new Array(len + 1);
				args.unshift(firstRow, 1);
				this.$annotations.splice.apply(this.$annotations, args);
			}
		}
		update(config$1) {
			this.config = config$1;
			var session = this.session;
			var firstRow = config$1.firstRow;
			var lastRow = Math.min(config$1.lastRow + config$1.gutterOffset, session.getLength() - 1);
			this.oldLastRow = lastRow;
			this.config = config$1;
			this.$lines.moveContainer(config$1);
			this.$updateCursorRow();
			var fold = session.getNextFoldLine(firstRow);
			var foldStart = fold ? fold.start.row : Infinity;
			var cell = null;
			var index = -1;
			var row = firstRow;
			while (true) {
				if (row > foldStart) {
					row = fold.end.row + 1;
					fold = session.getNextFoldLine(row, fold);
					foldStart = fold ? fold.start.row : Infinity;
				}
				if (row > lastRow) {
					while (this.$lines.getLength() > index + 1) this.$lines.pop();
					break;
				}
				cell = this.$lines.get(++index);
				if (cell) cell.row = row;
				else {
					cell = this.$lines.createCell(row, config$1, this.session, onCreateCell);
					this.$lines.push(cell);
				}
				this.$renderCell(cell, config$1, fold, row);
				row++;
			}
			this._signal("afterRender");
			this.$updateGutterWidth(config$1);
			if (this.$showCursorMarker && this.$highlightGutterLine) this.$updateCursorMarker();
		}
		$updateGutterWidth(config$1) {
			var session = this.session;
			var gutterRenderer = session.gutterRenderer || this.$renderer;
			var firstLineNumber = session.$firstLineNumber;
			var lastLineText = this.$lines.last() ? this.$lines.last().text : "";
			if (this.$fixedWidth || session.$useWrapMode) lastLineText = session.getLength() + firstLineNumber - 1;
			var gutterWidth = gutterRenderer ? gutterRenderer.getWidth(session, lastLineText, config$1) : lastLineText.toString().length * config$1.characterWidth;
			var padding = this.$padding || this.$computePadding();
			gutterWidth += padding.left + padding.right;
			if (gutterWidth !== this.gutterWidth && !isNaN(gutterWidth)) {
				this.gutterWidth = gutterWidth;
				this.element.parentNode.style.width = this.element.style.width = Math.ceil(this.gutterWidth) + "px";
				this._signal("changeGutterWidth", gutterWidth);
			}
		}
		$updateCursorRow() {
			if (!this.$highlightGutterLine) return;
			var position = this.session.selection.getCursor();
			if (this.$cursorRow === position.row) return;
			this.$cursorRow = position.row;
		}
		updateLineHighlight() {
			if (this.$showCursorMarker) this.$updateCursorMarker();
			if (!this.$highlightGutterLine) return;
			var row = this.session.selection.cursor.row;
			this.$cursorRow = row;
			if (this.$cursorCell && this.$cursorCell.row == row) return;
			if (this.$cursorCell) this.$cursorCell.element.className = this.$cursorCell.element.className.replace("ace_gutter-active-line ", "");
			var cells = this.$lines.cells;
			this.$cursorCell = null;
			for (var i = 0; i < cells.length; i++) {
				var cell = cells[i];
				if (cell.row >= this.$cursorRow) {
					if (cell.row > this.$cursorRow) {
						var fold = this.session.getFoldLine(this.$cursorRow);
						if (i > 0 && fold && fold.start.row == cells[i - 1].row) cell = cells[i - 1];
						else break;
					}
					cell.element.className = "ace_gutter-active-line " + cell.element.className;
					this.$cursorCell = cell;
					break;
				}
			}
		}
		$updateCursorMarker() {
			if (!this.session) return;
			var session = this.session;
			if (!this.$highlightElement) {
				this.$highlightElement = dom$7.createElement("div");
				this.$highlightElement.className = "ace_gutter-cursor";
				this.$highlightElement.style.pointerEvents = "none";
				this.element.appendChild(this.$highlightElement);
			}
			var pos = session.selection.cursor;
			var config$1 = this.config;
			var lines = this.$lines;
			var screenTop = config$1.firstRowScreen * config$1.lineHeight;
			var screenPage = Math.floor(screenTop / lines.canvasHeight);
			var top = session.documentToScreenRow(pos) * config$1.lineHeight - screenPage * lines.canvasHeight;
			dom$7.setStyle(this.$highlightElement.style, "height", config$1.lineHeight + "px");
			dom$7.setStyle(this.$highlightElement.style, "top", top + "px");
		}
		scrollLines(config$1) {
			var oldConfig = this.config;
			this.config = config$1;
			this.$updateCursorRow();
			if (this.$lines.pageChanged(oldConfig, config$1)) return this.update(config$1);
			this.$lines.moveContainer(config$1);
			var lastRow = Math.min(config$1.lastRow + config$1.gutterOffset, this.session.getLength() - 1);
			var oldLastRow = this.oldLastRow;
			this.oldLastRow = lastRow;
			if (!oldConfig || oldLastRow < config$1.firstRow) return this.update(config$1);
			if (lastRow < oldConfig.firstRow) return this.update(config$1);
			if (oldConfig.firstRow < config$1.firstRow) for (var row = this.session.getFoldedRowCount(oldConfig.firstRow, config$1.firstRow - 1); row > 0; row--) this.$lines.shift();
			if (oldLastRow > lastRow) for (var row = this.session.getFoldedRowCount(lastRow + 1, oldLastRow); row > 0; row--) this.$lines.pop();
			if (config$1.firstRow < oldConfig.firstRow) this.$lines.unshift(this.$renderLines(config$1, config$1.firstRow, oldConfig.firstRow - 1));
			if (lastRow > oldLastRow) this.$lines.push(this.$renderLines(config$1, oldLastRow + 1, lastRow));
			this.updateLineHighlight();
			this._signal("afterRender");
			this.$updateGutterWidth(config$1);
		}
		$renderLines(config$1, firstRow, lastRow) {
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
				var cell = this.$lines.createCell(row, config$1, this.session, onCreateCell);
				this.$renderCell(cell, config$1, foldLine, row);
				fragment.push(cell);
				row++;
			}
			return fragment;
		}
		$renderCell(cell, config$1, fold, row) {
			var element = cell.element;
			var session = this.session;
			var textNode = element.childNodes[0];
			var foldWidget = element.childNodes[1];
			var annotationNode = element.childNodes[2];
			var customWidget = element.childNodes[3];
			var annotationIconNode = annotationNode.firstChild;
			var firstLineNumber = session.$firstLineNumber;
			var breakpoints = session.$breakpoints;
			var decorations = session.$decorations;
			var gutterRenderer = session.gutterRenderer || this.$renderer;
			var foldWidgets = this.$showFoldWidgets && session.foldWidgets;
			var foldStart = fold ? fold.start.row : Number.MAX_VALUE;
			var lineHeight = config$1.lineHeight + "px";
			var className = this.$useSvgGutterIcons ? "ace_gutter-cell_svg-icons " : "ace_gutter-cell ";
			var iconClassName = this.$useSvgGutterIcons ? "ace_icon_svg" : "ace_icon";
			var rowText = (gutterRenderer ? gutterRenderer.getText(session, row) : row + firstLineNumber).toString();
			if (this.$highlightGutterLine) {
				if (row == this.$cursorRow || fold && row < this.$cursorRow && row >= foldStart && this.$cursorRow <= fold.end.row) {
					className += "ace_gutter-active-line ";
					if (this.$cursorCell != cell) {
						if (this.$cursorCell) this.$cursorCell.element.className = this.$cursorCell.element.className.replace("ace_gutter-active-line ", "");
						this.$cursorCell = cell;
					}
				}
			}
			if (breakpoints[row]) className += breakpoints[row];
			if (decorations[row]) className += decorations[row];
			if (this.$annotations[row] && row !== foldStart) className += this.$annotations[row].className;
			if (foldWidgets) {
				var c = foldWidgets[row];
				if (c == null) c = foldWidgets[row] = session.getFoldWidget(row);
			}
			if (c) {
				var foldClass = "ace_fold-widget ace_" + c;
				var isClosedFold = c == "start" && row == foldStart && row < fold.end.row;
				if (isClosedFold) {
					foldClass += " ace_closed";
					var foldAnnotationClass = "";
					var annotationInFold = false;
					for (var i = row + 1; i <= fold.end.row; i++) {
						if (!this.$annotations[i]) continue;
						if (this.$annotations[i].className === " ace_error") {
							annotationInFold = true;
							foldAnnotationClass = " ace_error_fold";
							break;
						}
						if (this.$annotations[i].className === " ace_security") {
							annotationInFold = true;
							foldAnnotationClass = " ace_security_fold";
						} else if (this.$annotations[i].className === " ace_warning" && foldAnnotationClass !== " ace_security_fold") {
							annotationInFold = true;
							foldAnnotationClass = " ace_warning_fold";
						}
					}
					className += foldAnnotationClass;
				} else foldClass += " ace_open";
				if (foldWidget.className != foldClass) foldWidget.className = foldClass;
				dom$7.setStyle(foldWidget.style, "height", lineHeight);
				dom$7.setStyle(foldWidget.style, "display", "inline-block");
				foldWidget.setAttribute("role", "button");
				foldWidget.setAttribute("tabindex", "-1");
				var foldRange = session.getFoldWidgetRange(row);
				if (foldRange) foldWidget.setAttribute("aria-label", nls("gutter.code-folding.range.aria-label", "Toggle code folding, rows $0 through $1", [foldRange.start.row + 1, foldRange.end.row + 1]));
				else if (fold) foldWidget.setAttribute("aria-label", nls("gutter.code-folding.closed.aria-label", "Toggle code folding, rows $0 through $1", [fold.start.row + 1, fold.end.row + 1]));
				else foldWidget.setAttribute("aria-label", nls("gutter.code-folding.open.aria-label", "Toggle code folding, row $0", [row + 1]));
				if (isClosedFold) {
					foldWidget.setAttribute("aria-expanded", "false");
					foldWidget.setAttribute("title", nls("gutter.code-folding.closed.title", "Unfold code"));
				} else {
					foldWidget.setAttribute("aria-expanded", "true");
					foldWidget.setAttribute("title", nls("gutter.code-folding.open.title", "Fold code"));
				}
			} else if (foldWidget) {
				dom$7.setStyle(foldWidget.style, "display", "none");
				foldWidget.setAttribute("tabindex", "0");
				foldWidget.removeAttribute("role");
				foldWidget.removeAttribute("aria-label");
			}
			const customWidgetAttributes = this.session.$gutterCustomWidgets[row];
			if (customWidgetAttributes) this.$addCustomWidget(row, customWidgetAttributes, cell);
			else if (customWidget) this.$removeCustomWidget(row, cell);
			if (annotationInFold && this.$showFoldedAnnotations) {
				annotationNode.className = "ace_gutter_annotation";
				annotationIconNode.className = iconClassName;
				annotationIconNode.className += foldAnnotationClass;
				dom$7.setStyle(annotationIconNode.style, "height", lineHeight);
				dom$7.setStyle(annotationNode.style, "display", "block");
				dom$7.setStyle(annotationNode.style, "height", lineHeight);
				var ariaLabel;
				switch (foldAnnotationClass) {
					case " ace_error_fold":
						ariaLabel = nls("gutter.annotation.aria-label.error", "Error, read annotations row $0", [rowText]);
						break;
					case " ace_security_fold":
						ariaLabel = nls("gutter.annotation.aria-label.security", "Security finding, read annotations row $0", [rowText]);
						break;
					case " ace_warning_fold":
						ariaLabel = nls("gutter.annotation.aria-label.warning", "Warning, read annotations row $0", [rowText]);
						break;
				}
				annotationNode.setAttribute("aria-label", ariaLabel);
				annotationNode.setAttribute("tabindex", "-1");
				annotationNode.setAttribute("role", "button");
			} else if (this.$annotations[row]) {
				annotationNode.className = "ace_gutter_annotation";
				annotationIconNode.className = iconClassName;
				if (this.$useSvgGutterIcons) annotationIconNode.className += this.$annotations[row].className;
				else element.classList.add(this.$annotations[row].className.replace(" ", ""));
				dom$7.setStyle(annotationIconNode.style, "height", lineHeight);
				dom$7.setStyle(annotationNode.style, "display", "block");
				dom$7.setStyle(annotationNode.style, "height", lineHeight);
				var ariaLabel;
				switch (this.$annotations[row].className) {
					case " ace_error":
						ariaLabel = nls("gutter.annotation.aria-label.error", "Error, read annotations row $0", [rowText]);
						break;
					case " ace_security":
						ariaLabel = nls("gutter.annotation.aria-label.security", "Security finding, read annotations row $0", [rowText]);
						break;
					case " ace_warning":
						ariaLabel = nls("gutter.annotation.aria-label.warning", "Warning, read annotations row $0", [rowText]);
						break;
					case " ace_info":
						ariaLabel = nls("gutter.annotation.aria-label.info", "Info, read annotations row $0", [rowText]);
						break;
					case " ace_hint":
						ariaLabel = nls("gutter.annotation.aria-label.hint", "Suggestion, read annotations row $0", [rowText]);
						break;
				}
				annotationNode.setAttribute("aria-label", ariaLabel);
				annotationNode.setAttribute("tabindex", "-1");
				annotationNode.setAttribute("role", "button");
			} else {
				dom$7.setStyle(annotationNode.style, "display", "none");
				annotationNode.removeAttribute("aria-label");
				annotationNode.removeAttribute("role");
				annotationNode.setAttribute("tabindex", "0");
			}
			if (rowText !== textNode.data) textNode.data = rowText;
			if (element.className != className) element.className = className;
			dom$7.setStyle(cell.element.style, "height", this.$lines.computeLineHeight(row, config$1, session) + "px");
			dom$7.setStyle(cell.element.style, "top", this.$lines.computeLineTop(row, config$1, session) + "px");
			cell.text = rowText;
			if (annotationNode.style.display === "none" && foldWidget.style.display === "none" && !customWidgetAttributes) cell.element.setAttribute("aria-hidden", true);
			else cell.element.setAttribute("aria-hidden", false);
			return cell;
		}
		setHighlightGutterLine(highlightGutterLine) {
			this.$highlightGutterLine = highlightGutterLine;
			if (!highlightGutterLine && this.$highlightElement) {
				this.$highlightElement.remove();
				this.$highlightElement = null;
			}
		}
		setShowLineNumbers(show) {
			this.$renderer = !show && {
				getWidth: function() {
					return 0;
				},
				getText: function() {
					return "";
				}
			};
		}
		getShowLineNumbers() {
			return this.$showLineNumbers;
		}
		setShowFoldWidgets(show) {
			if (show) dom$7.addCssClass(this.element, "ace_folding-enabled");
			else dom$7.removeCssClass(this.element, "ace_folding-enabled");
			this.$showFoldWidgets = show;
			this.$padding = null;
		}
		getShowFoldWidgets() {
			return this.$showFoldWidgets;
		}
		$hideFoldWidget(row, cell) {
			const rowCell = cell || this.$getGutterCell(row);
			if (rowCell && rowCell.element) {
				const foldWidget = rowCell.element.childNodes[1];
				if (foldWidget) dom$7.setStyle(foldWidget.style, "display", "none");
			}
		}
		$showFoldWidget(row, cell) {
			const rowCell = cell || this.$getGutterCell(row);
			if (rowCell && rowCell.element) {
				const foldWidget = rowCell.element.childNodes[1];
				if (foldWidget && this.session.foldWidgets && this.session.foldWidgets[rowCell.row]) dom$7.setStyle(foldWidget.style, "display", "inline-block");
			}
		}
		$getGutterCell(row) {
			var cells = this.$lines.cells;
			var min = 0;
			var max = cells.length - 1;
			if (row < cells[0].row || row > cells[max].row) return;
			while (min <= max) {
				var mid = Math.floor((min + max) / 2);
				var cell = cells[mid];
				if (cell.row > row) max = mid - 1;
				else if (cell.row < row) min = mid + 1;
				else return cell;
			}
			return cell;
		}
		$addCustomWidget(row, { className, label, title, callbacks }, cell) {
			this.session.$gutterCustomWidgets[row] = {
				className,
				label,
				title,
				callbacks
			};
			this.$hideFoldWidget(row, cell);
			const rowCell = cell || this.$getGutterCell(row);
			if (rowCell && rowCell.element) {
				let customWidget = rowCell.element.querySelector(".ace_custom-widget");
				if (customWidget) customWidget.remove();
				customWidget = dom$7.createElement("span");
				customWidget.className = `ace_custom-widget ${className}`;
				customWidget.setAttribute("tabindex", "-1");
				customWidget.setAttribute("role", "button");
				customWidget.setAttribute("aria-label", label);
				customWidget.setAttribute("title", title);
				dom$7.setStyle(customWidget.style, "display", "inline-block");
				dom$7.setStyle(customWidget.style, "height", "inherit");
				if (callbacks && callbacks.onClick) customWidget.addEventListener("click", (e) => {
					callbacks.onClick(e, row);
					e.stopPropagation();
				});
				rowCell.element.appendChild(customWidget);
			}
		}
		$removeCustomWidget(row, cell) {
			delete this.session.$gutterCustomWidgets[row];
			this.$showFoldWidget(row, cell);
			const rowCell = cell || this.$getGutterCell(row);
			if (rowCell && rowCell.element) {
				const customWidget = rowCell.element.querySelector(".ace_custom-widget");
				if (customWidget) rowCell.element.removeChild(customWidget);
			}
		}
		$computePadding() {
			if (!this.element.firstChild) return {
				left: 0,
				right: 0
			};
			var style = dom$7.computedStyle(this.element.firstChild);
			this.$padding = {};
			this.$padding.left = (parseInt(style.borderLeftWidth) || 0) + (parseInt(style.paddingLeft) || 0) + 1;
			this.$padding.right = (parseInt(style.borderRightWidth) || 0) + (parseInt(style.paddingRight) || 0);
			return this.$padding;
		}
		getRegion(point) {
			var padding = this.$padding || this.$computePadding();
			var rect = this.element.getBoundingClientRect();
			if (point.x < padding.left + rect.left) return "markers";
			if (this.$showFoldWidgets && point.x > rect.right - padding.right) return "foldWidgets";
		}
	};
	Gutter.prototype.$fixedWidth = false;
	Gutter.prototype.$highlightGutterLine = true;
	Gutter.prototype.$renderer = void 0;
	Gutter.prototype.$showLineNumbers = true;
	Gutter.prototype.$showFoldWidgets = true;
	oop$5.implement(Gutter.prototype, EventEmitter$5);
	function onCreateCell(element) {
		var textNode = document.createTextNode("");
		element.appendChild(textNode);
		var foldWidget = dom$7.createElement("span");
		element.appendChild(foldWidget);
		var annotationNode = dom$7.createElement("span");
		element.appendChild(annotationNode);
		var annotationIconNode = dom$7.createElement("span");
		annotationNode.appendChild(annotationIconNode);
		return element;
	}
	exports.Gutter = Gutter;
}));
var require_marker = /* @__PURE__ */ __commonJSMin(((exports) => {
	var Range = require_range().Range;
	var dom$6 = require_dom();
	var Marker = class {
		constructor(parentEl) {
			this.element = dom$6.createElement("div");
			this.element.className = "ace_layer ace_marker-layer";
			parentEl.appendChild(this.element);
		}
		setPadding(padding) {
			this.$padding = padding;
		}
		setSession(session) {
			this.session = session;
		}
		setMarkers(markers) {
			this.markers = markers;
		}
		elt(className, css) {
			var x = this.i != -1 && this.element.childNodes[this.i];
			if (!x) {
				x = document.createElement("div");
				this.element.appendChild(x);
				this.i = -1;
			} else this.i++;
			x.style.cssText = css;
			x.className = className;
		}
		update(config$1) {
			if (!config$1) return;
			this.config = config$1;
			this.i = 0;
			var html;
			for (var key in this.markers) {
				var marker = this.markers[key];
				if (!marker.range) {
					marker.update(html, this, this.session, config$1);
					continue;
				}
				var range = marker.range.clipRows(config$1.firstRow, config$1.lastRow);
				if (range.isEmpty()) continue;
				range = range.toScreenRange(this.session);
				if (marker.renderer) {
					var top = this.$getTop(range.start.row, config$1);
					var left = this.$padding + range.start.column * config$1.characterWidth;
					marker.renderer(html, range, left, top, config$1);
				} else if (marker.type == "fullLine") this.drawFullLineMarker(html, range, marker.clazz, config$1);
				else if (marker.type == "screenLine") this.drawScreenLineMarker(html, range, marker.clazz, config$1);
				else if (range.isMultiLine()) if (marker.type == "text") this.drawTextMarker(html, range, marker.clazz, config$1);
				else this.drawMultiLineMarker(html, range, marker.clazz, config$1);
				else this.drawSingleLineMarker(html, range, marker.clazz + " ace_start ace_br15", config$1);
			}
			if (this.i != -1) while (this.i < this.element.childElementCount) this.element.removeChild(this.element.lastChild);
		}
		$getTop(row, layerConfig) {
			return (row - layerConfig.firstRowScreen) * layerConfig.lineHeight;
		}
		drawTextMarker(stringBuilder, range, clazz, layerConfig, extraStyle) {
			var session = this.session;
			var start = range.start.row;
			var end = range.end.row;
			var row = start;
			var prev = 0;
			var curr = 0;
			var next = session.getScreenLastRowColumn(row);
			var lineRange = new Range(row, range.start.column, row, curr);
			for (; row <= end; row++) {
				lineRange.start.row = lineRange.end.row = row;
				lineRange.start.column = row == start ? range.start.column : session.getRowWrapIndent(row);
				lineRange.end.column = next;
				prev = curr;
				curr = next;
				next = row + 1 < end ? session.getScreenLastRowColumn(row + 1) : row == end ? 0 : range.end.column;
				this.drawSingleLineMarker(stringBuilder, lineRange, clazz + (row == start ? " ace_start" : "") + " ace_br" + getBorderClass(row == start || row == start + 1 && range.start.column, prev < curr, curr > next, row == end), layerConfig, row == end ? 0 : 1, extraStyle);
			}
		}
		drawMultiLineMarker(stringBuilder, range, clazz, config$1, extraStyle) {
			var padding = this.$padding;
			var height = config$1.lineHeight;
			var top = this.$getTop(range.start.row, config$1);
			var left = padding + range.start.column * config$1.characterWidth;
			extraStyle = extraStyle || "";
			if (this.session.$bidiHandler.isBidiRow(range.start.row)) {
				var range1 = range.clone();
				range1.end.row = range1.start.row;
				range1.end.column = this.session.getLine(range1.start.row).length;
				this.drawBidiSingleLineMarker(stringBuilder, range1, clazz + " ace_br1 ace_start", config$1, null, extraStyle);
			} else this.elt(clazz + " ace_br1 ace_start", "height:" + height + "px;right:" + padding + "px;top:" + top + "px;left:" + left + "px;" + (extraStyle || ""));
			if (this.session.$bidiHandler.isBidiRow(range.end.row)) {
				var range1 = range.clone();
				range1.start.row = range1.end.row;
				range1.start.column = 0;
				this.drawBidiSingleLineMarker(stringBuilder, range1, clazz + " ace_br12", config$1, null, extraStyle);
			} else {
				top = this.$getTop(range.end.row, config$1);
				var width = range.end.column * config$1.characterWidth;
				this.elt(clazz + " ace_br12", "height:" + height + "px;width:" + width + "px;top:" + top + "px;left:" + padding + "px;" + (extraStyle || ""));
			}
			height = (range.end.row - range.start.row - 1) * config$1.lineHeight;
			if (height <= 0) return;
			top = this.$getTop(range.start.row + 1, config$1);
			var radiusClass = (range.start.column ? 1 : 0) | (range.end.column ? 0 : 8);
			this.elt(clazz + (radiusClass ? " ace_br" + radiusClass : ""), "height:" + height + "px;right:" + padding + "px;top:" + top + "px;left:" + padding + "px;" + (extraStyle || ""));
		}
		drawSingleLineMarker(stringBuilder, range, clazz, config$1, extraLength, extraStyle) {
			if (this.session.$bidiHandler.isBidiRow(range.start.row)) return this.drawBidiSingleLineMarker(stringBuilder, range, clazz, config$1, extraLength, extraStyle);
			var height = config$1.lineHeight;
			var width = (range.end.column + (extraLength || 0) - range.start.column) * config$1.characterWidth;
			var top = this.$getTop(range.start.row, config$1);
			var left = this.$padding + range.start.column * config$1.characterWidth;
			this.elt(clazz, "height:" + height + "px;width:" + width + "px;top:" + top + "px;left:" + left + "px;" + (extraStyle || ""));
		}
		drawBidiSingleLineMarker(stringBuilder, range, clazz, config$1, extraLength, extraStyle) {
			var height = config$1.lineHeight, top = this.$getTop(range.start.row, config$1), padding = this.$padding;
			this.session.$bidiHandler.getSelections(range.start.column, range.end.column).forEach(function(selection) {
				this.elt(clazz, "height:" + height + "px;width:" + (selection.width + (extraLength || 0)) + "px;top:" + top + "px;left:" + (padding + selection.left) + "px;" + (extraStyle || ""));
			}, this);
		}
		drawFullLineMarker(stringBuilder, range, clazz, config$1, extraStyle) {
			var top = this.$getTop(range.start.row, config$1);
			var height = config$1.lineHeight;
			if (range.start.row != range.end.row) height += this.$getTop(range.end.row, config$1) - top;
			this.elt(clazz, "height:" + height + "px;top:" + top + "px;left:0;right:0;" + (extraStyle || ""));
		}
		drawScreenLineMarker(stringBuilder, range, clazz, config$1, extraStyle) {
			var top = this.$getTop(range.start.row, config$1);
			var height = config$1.lineHeight;
			this.elt(clazz, "height:" + height + "px;top:" + top + "px;left:0;right:0;" + (extraStyle || ""));
		}
	};
	Marker.prototype.$padding = 0;
	function getBorderClass(tl, tr, br, bl) {
		return (tl ? 1 : 0) | (tr ? 2 : 0) | (br ? 4 : 0) | (bl ? 8 : 0);
	}
	exports.Marker = Marker;
}));
var require_cursor = /* @__PURE__ */ __commonJSMin(((exports) => {
	var dom$5 = require_dom();
	var Cursor = class {
		constructor(parentEl) {
			this.element = dom$5.createElement("div");
			this.element.className = "ace_layer ace_cursor-layer";
			parentEl.appendChild(this.element);
			this.isVisible = false;
			this.isBlinking = true;
			this.blinkInterval = 1e3;
			this.smoothBlinking = false;
			this.cursors = [];
			this.cursor = this.addCursor();
			dom$5.addCssClass(this.element, "ace_hidden-cursors");
			this.$updateCursors = this.$updateOpacity.bind(this);
		}
		$updateOpacity(val) {
			var cursors = this.cursors;
			for (var i = cursors.length; i--;) dom$5.setStyle(cursors[i].style, "opacity", val ? "" : "0");
		}
		$startCssAnimation() {
			var cursors = this.cursors;
			for (var i = cursors.length; i--;) cursors[i].style.animationDuration = this.blinkInterval + "ms";
			this.$isAnimating = true;
			setTimeout(function() {
				if (this.$isAnimating) dom$5.addCssClass(this.element, "ace_animate-blinking");
			}.bind(this));
		}
		$stopCssAnimation() {
			this.$isAnimating = false;
			dom$5.removeCssClass(this.element, "ace_animate-blinking");
		}
		setPadding(padding) {
			this.$padding = padding;
		}
		setSession(session) {
			this.session = session;
		}
		setBlinking(blinking) {
			if (blinking != this.isBlinking) {
				this.isBlinking = blinking;
				this.restartTimer();
			}
		}
		setBlinkInterval(blinkInterval) {
			if (blinkInterval != this.blinkInterval) {
				this.blinkInterval = blinkInterval;
				this.restartTimer();
			}
		}
		setSmoothBlinking(smoothBlinking) {
			if (smoothBlinking != this.smoothBlinking) {
				this.smoothBlinking = smoothBlinking;
				dom$5.setCssClass(this.element, "ace_smooth-blinking", smoothBlinking);
				this.$updateCursors(true);
				this.restartTimer();
			}
		}
		addCursor() {
			var el = dom$5.createElement("div");
			el.className = "ace_cursor";
			this.element.appendChild(el);
			this.cursors.push(el);
			return el;
		}
		removeCursor() {
			if (this.cursors.length > 1) {
				var el = this.cursors.pop();
				el.parentNode.removeChild(el);
				return el;
			}
		}
		hideCursor() {
			this.isVisible = false;
			dom$5.addCssClass(this.element, "ace_hidden-cursors");
			this.restartTimer();
		}
		showCursor() {
			this.isVisible = true;
			dom$5.removeCssClass(this.element, "ace_hidden-cursors");
			this.restartTimer();
		}
		restartTimer() {
			var update = this.$updateCursors;
			clearInterval(this.intervalId);
			clearTimeout(this.timeoutId);
			this.$stopCssAnimation();
			if (this.smoothBlinking) {
				this.$isSmoothBlinking = false;
				dom$5.removeCssClass(this.element, "ace_smooth-blinking");
			}
			update(true);
			if (!this.isBlinking || !this.blinkInterval || !this.isVisible) {
				this.$stopCssAnimation();
				return;
			}
			if (this.smoothBlinking) {
				this.$isSmoothBlinking = true;
				setTimeout(function() {
					if (this.$isSmoothBlinking) dom$5.addCssClass(this.element, "ace_smooth-blinking");
				}.bind(this));
			}
			if (dom$5.HAS_CSS_ANIMATION) this.$startCssAnimation();
			else {
				var blink = function() {
					this.timeoutId = setTimeout(function() {
						update(false);
					}, .6 * this.blinkInterval);
				}.bind(this);
				this.intervalId = setInterval(function() {
					update(true);
					blink();
				}, this.blinkInterval);
				blink();
			}
		}
		getPixelPosition(position, onScreen) {
			if (!this.config || !this.session) return {
				left: 0,
				top: 0
			};
			if (!position) position = this.session.selection.getCursor();
			var pos = this.session.documentToScreenPosition(position);
			return {
				left: this.$padding + (this.session.$bidiHandler.isBidiRow(pos.row, position.row) ? this.session.$bidiHandler.getPosLeft(pos.column) : pos.column * this.config.characterWidth),
				top: (pos.row - (onScreen ? this.config.firstRowScreen : 0)) * this.config.lineHeight
			};
		}
		isCursorInView(pixelPos, config$1) {
			return pixelPos.top >= 0 && pixelPos.top < config$1.maxHeight;
		}
		update(config$1) {
			this.config = config$1;
			var selections = this.session.$selectionMarkers;
			var i = 0, cursorIndex = 0;
			if (selections === void 0 || selections.length === 0) selections = [{ cursor: null }];
			for (var i = 0, n = selections.length; i < n; i++) {
				var pixelPos = this.getPixelPosition(selections[i].cursor, true);
				if ((pixelPos.top > config$1.height + config$1.offset || pixelPos.top < 0) && i > 1) continue;
				var element = this.cursors[cursorIndex++] || this.addCursor();
				var style = element.style;
				if (!this.drawCursor) if (!this.isCursorInView(pixelPos, config$1)) dom$5.setStyle(style, "display", "none");
				else {
					dom$5.setStyle(style, "display", "block");
					dom$5.translate(element, pixelPos.left, pixelPos.top);
					dom$5.setStyle(style, "width", Math.round(config$1.characterWidth) + "px");
					dom$5.setStyle(style, "height", config$1.lineHeight + "px");
				}
				else this.drawCursor(element, pixelPos, config$1, selections[i], this.session);
			}
			while (this.cursors.length > cursorIndex) this.removeCursor();
			var overwrite = this.session.getOverwrite();
			this.$setOverwrite(overwrite);
			this.$pixelPos = pixelPos;
			this.restartTimer();
		}
		$setOverwrite(overwrite) {
			if (overwrite != this.overwrite) {
				this.overwrite = overwrite;
				if (overwrite) dom$5.addCssClass(this.element, "ace_overwrite-cursors");
				else dom$5.removeCssClass(this.element, "ace_overwrite-cursors");
			}
		}
		destroy() {
			clearInterval(this.intervalId);
			clearTimeout(this.timeoutId);
		}
	};
	Cursor.prototype.$padding = 0;
	Cursor.prototype.drawCursor = null;
	exports.Cursor = Cursor;
}));
var require_scrollbar = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$4 = require_oop();
	var dom$4 = require_dom();
	var event$3 = require_event();
	var EventEmitter$4 = require_event_emitter().EventEmitter;
	var MAX_SCROLL_H = 32768;
	var Scrollbar = class {
		constructor(parent, classSuffix) {
			this.element = dom$4.createElement("div");
			this.element.className = "ace_scrollbar ace_scrollbar" + classSuffix;
			this.inner = dom$4.createElement("div");
			this.inner.className = "ace_scrollbar-inner";
			this.inner.textContent = "\xA0";
			this.element.appendChild(this.inner);
			parent.appendChild(this.element);
			this.setVisible(false);
			this.skipEvent = false;
			event$3.addListener(this.element, "scroll", this.onScroll.bind(this));
			event$3.addListener(this.element, "mousedown", event$3.preventDefault);
		}
		setVisible(isVisible) {
			this.element.style.display = isVisible ? "" : "none";
			this.isVisible = isVisible;
			this.coeff = 1;
		}
	};
	oop$4.implement(Scrollbar.prototype, EventEmitter$4);
	var VScrollBar$2 = class extends Scrollbar {
		constructor(parent, renderer) {
			super(parent, "-v");
			this.scrollTop = 0;
			this.scrollHeight = 0;
			renderer.$scrollbarWidth = this.width = dom$4.scrollbarWidth(parent.ownerDocument);
			this.inner.style.width = this.element.style.width = (this.width || 15) + 5 + "px";
			this.$minWidth = 0;
		}
		onScroll() {
			if (!this.skipEvent) {
				this.scrollTop = this.element.scrollTop;
				if (this.coeff != 1) {
					var h = this.element.clientHeight / this.scrollHeight;
					this.scrollTop = this.scrollTop * (1 - h) / (this.coeff - h);
				}
				this._emit("scroll", { data: this.scrollTop });
			}
			this.skipEvent = false;
		}
		getWidth() {
			return Math.max(this.isVisible ? this.width : 0, this.$minWidth || 0);
		}
		setHeight(height) {
			this.element.style.height = height + "px";
		}
		setScrollHeight(height) {
			this.scrollHeight = height;
			if (height > MAX_SCROLL_H) {
				this.coeff = MAX_SCROLL_H / height;
				height = MAX_SCROLL_H;
			} else if (this.coeff != 1) this.coeff = 1;
			this.inner.style.height = height + "px";
		}
		setScrollTop(scrollTop) {
			if (this.scrollTop != scrollTop) {
				this.skipEvent = true;
				this.scrollTop = scrollTop;
				this.element.scrollTop = scrollTop * this.coeff;
			}
		}
	};
	VScrollBar$2.prototype.setInnerHeight = VScrollBar$2.prototype.setScrollHeight;
	var HScrollBar$2 = class extends Scrollbar {
		constructor(parent, renderer) {
			super(parent, "-h");
			this.scrollLeft = 0;
			this.height = renderer.$scrollbarWidth;
			this.inner.style.height = this.element.style.height = (this.height || 15) + 5 + "px";
		}
		onScroll() {
			if (!this.skipEvent) {
				this.scrollLeft = this.element.scrollLeft;
				this._emit("scroll", { data: this.scrollLeft });
			}
			this.skipEvent = false;
		}
		getHeight() {
			return this.isVisible ? this.height : 0;
		}
		setWidth(width) {
			this.element.style.width = width + "px";
		}
		setInnerWidth(width) {
			this.inner.style.width = width + "px";
		}
		setScrollWidth(width) {
			this.inner.style.width = width + "px";
		}
		setScrollLeft(scrollLeft) {
			if (this.scrollLeft != scrollLeft) {
				this.skipEvent = true;
				this.scrollLeft = this.element.scrollLeft = scrollLeft;
			}
		}
	};
	exports.ScrollBar = VScrollBar$2;
	exports.ScrollBarV = VScrollBar$2;
	exports.ScrollBarH = HScrollBar$2;
	exports.VScrollBar = VScrollBar$2;
	exports.HScrollBar = HScrollBar$2;
}));
var require_scrollbar_custom = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$3 = require_oop();
	var dom$3 = require_dom();
	var event$2 = require_event();
	var EventEmitter$3 = require_event_emitter().EventEmitter;
	dom$3.importCssString(`.ace_editor>.ace_sb-v div, .ace_editor>.ace_sb-h div{
  position: absolute;
  background: rgba(128, 128, 128, 0.6);
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  border: 1px solid #bbb;
  border-radius: 2px;
  z-index: 8;
}
.ace_editor>.ace_sb-v, .ace_editor>.ace_sb-h {
  position: absolute;
  z-index: 6;
  background: none;
  overflow: hidden!important;
}
.ace_editor>.ace_sb-v {
  z-index: 6;
  right: 0;
  top: 0;
  width: 12px;
}
.ace_editor>.ace_sb-v div {
  z-index: 8;
  right: 0;
  width: 100%;
}
.ace_editor>.ace_sb-h {
  bottom: 0;
  left: 0;
  height: 12px;
}
.ace_editor>.ace_sb-h div {
  bottom: 0;
  height: 100%;
}
.ace_editor>.ace_sb_grabbed {
  z-index: 8;
  background: #000;
}`, "ace_scrollbar.css", false);
	var ScrollBar = class {
		constructor(parent, classSuffix) {
			this.element = dom$3.createElement("div");
			this.element.className = "ace_sb" + classSuffix;
			this.inner = dom$3.createElement("div");
			this.inner.className = "";
			this.element.appendChild(this.inner);
			this.VScrollWidth = 12;
			this.HScrollHeight = 12;
			parent.appendChild(this.element);
			this.setVisible(false);
			this.skipEvent = false;
			event$2.addMultiMouseDownListener(this.element, [
				500,
				300,
				300
			], this, "onMouseDown");
		}
		setVisible(isVisible) {
			this.element.style.display = isVisible ? "" : "none";
			this.isVisible = isVisible;
			this.coeff = 1;
		}
	};
	oop$3.implement(ScrollBar.prototype, EventEmitter$3);
	var VScrollBar$1 = class extends ScrollBar {
		constructor(parent, renderer) {
			super(parent, "-v");
			this.scrollTop = 0;
			this.scrollHeight = 0;
			this.parent = parent;
			this.width = this.VScrollWidth;
			this.renderer = renderer;
			this.inner.style.width = this.element.style.width = (this.width || 15) + "px";
			this.$minWidth = 0;
		}
		onMouseDown(eType, e) {
			if (eType !== "mousedown") return;
			if (event$2.getButton(e) !== 0 || e.detail === 2) return;
			if (e.target === this.inner) {
				var self = this;
				var mousePageY = e.clientY;
				var onMouseMove = function(e$1) {
					mousePageY = e$1.clientY;
				};
				var onMouseUp = function() {
					clearInterval(timerId);
				};
				var startY = e.clientY;
				var startTop = this.thumbTop;
				var onScrollInterval = function() {
					if (mousePageY === void 0) return;
					var scrollTop = self.scrollTopFromThumbTop(startTop + mousePageY - startY);
					if (scrollTop === self.scrollTop) return;
					self._emit("scroll", { data: scrollTop });
				};
				event$2.capture(this.inner, onMouseMove, onMouseUp);
				var timerId = setInterval(onScrollInterval, 20);
				return event$2.preventDefault(e);
			}
			var top = e.clientY - this.element.getBoundingClientRect().top - this.thumbHeight / 2;
			this._emit("scroll", { data: this.scrollTopFromThumbTop(top) });
			return event$2.preventDefault(e);
		}
		getHeight() {
			return this.height;
		}
		scrollTopFromThumbTop(thumbTop) {
			var scrollTop = thumbTop * (this.pageHeight - this.viewHeight) / (this.slideHeight - this.thumbHeight);
			scrollTop = scrollTop >> 0;
			if (scrollTop < 0) scrollTop = 0;
			else if (scrollTop > this.pageHeight - this.viewHeight) scrollTop = this.pageHeight - this.viewHeight;
			return scrollTop;
		}
		getWidth() {
			return Math.max(this.isVisible ? this.width : 0, this.$minWidth || 0);
		}
		setHeight(height) {
			this.height = Math.max(0, height);
			this.slideHeight = this.height;
			this.viewHeight = this.height;
			this.setScrollHeight(this.pageHeight, true);
		}
		setScrollHeight(height, force) {
			if (this.pageHeight === height && !force) return;
			this.pageHeight = height;
			this.thumbHeight = this.slideHeight * this.viewHeight / this.pageHeight;
			if (this.thumbHeight > this.slideHeight) this.thumbHeight = this.slideHeight;
			if (this.thumbHeight < 15) this.thumbHeight = 15;
			this.inner.style.height = this.thumbHeight + "px";
			if (this.scrollTop > this.pageHeight - this.viewHeight) {
				this.scrollTop = this.pageHeight - this.viewHeight;
				if (this.scrollTop < 0) this.scrollTop = 0;
				this._emit("scroll", { data: this.scrollTop });
			}
		}
		setScrollTop(scrollTop) {
			this.scrollTop = scrollTop;
			if (scrollTop < 0) scrollTop = 0;
			this.thumbTop = scrollTop * (this.slideHeight - this.thumbHeight) / (this.pageHeight - this.viewHeight);
			this.inner.style.top = this.thumbTop + "px";
		}
	};
	VScrollBar$1.prototype.setInnerHeight = VScrollBar$1.prototype.setScrollHeight;
	var HScrollBar$1 = class extends ScrollBar {
		constructor(parent, renderer) {
			super(parent, "-h");
			this.scrollLeft = 0;
			this.scrollWidth = 0;
			this.height = this.HScrollHeight;
			this.inner.style.height = this.element.style.height = (this.height || 12) + "px";
			this.renderer = renderer;
		}
		onMouseDown(eType, e) {
			if (eType !== "mousedown") return;
			if (event$2.getButton(e) !== 0 || e.detail === 2) return;
			if (e.target === this.inner) {
				var self = this;
				var mousePageX = e.clientX;
				var onMouseMove = function(e$1) {
					mousePageX = e$1.clientX;
				};
				var onMouseUp = function() {
					clearInterval(timerId);
				};
				var startX = e.clientX;
				var startLeft = this.thumbLeft;
				var onScrollInterval = function() {
					if (mousePageX === void 0) return;
					var scrollLeft = self.scrollLeftFromThumbLeft(startLeft + mousePageX - startX);
					if (scrollLeft === self.scrollLeft) return;
					self._emit("scroll", { data: scrollLeft });
				};
				event$2.capture(this.inner, onMouseMove, onMouseUp);
				var timerId = setInterval(onScrollInterval, 20);
				return event$2.preventDefault(e);
			}
			var left = e.clientX - this.element.getBoundingClientRect().left - this.thumbWidth / 2;
			this._emit("scroll", { data: this.scrollLeftFromThumbLeft(left) });
			return event$2.preventDefault(e);
		}
		getHeight() {
			return this.isVisible ? this.height : 0;
		}
		scrollLeftFromThumbLeft(thumbLeft) {
			var scrollLeft = thumbLeft * (this.pageWidth - this.viewWidth) / (this.slideWidth - this.thumbWidth);
			scrollLeft = scrollLeft >> 0;
			if (scrollLeft < 0) scrollLeft = 0;
			else if (scrollLeft > this.pageWidth - this.viewWidth) scrollLeft = this.pageWidth - this.viewWidth;
			return scrollLeft;
		}
		setWidth(width) {
			this.width = Math.max(0, width);
			this.element.style.width = this.width + "px";
			this.slideWidth = this.width;
			this.viewWidth = this.width;
			this.setScrollWidth(this.pageWidth, true);
		}
		setScrollWidth(width, force) {
			if (this.pageWidth === width && !force) return;
			this.pageWidth = width;
			this.thumbWidth = this.slideWidth * this.viewWidth / this.pageWidth;
			if (this.thumbWidth > this.slideWidth) this.thumbWidth = this.slideWidth;
			if (this.thumbWidth < 15) this.thumbWidth = 15;
			this.inner.style.width = this.thumbWidth + "px";
			if (this.scrollLeft > this.pageWidth - this.viewWidth) {
				this.scrollLeft = this.pageWidth - this.viewWidth;
				if (this.scrollLeft < 0) this.scrollLeft = 0;
				this._emit("scroll", { data: this.scrollLeft });
			}
		}
		setScrollLeft(scrollLeft) {
			this.scrollLeft = scrollLeft;
			if (scrollLeft < 0) scrollLeft = 0;
			this.thumbLeft = scrollLeft * (this.slideWidth - this.thumbWidth) / (this.pageWidth - this.viewWidth);
			this.inner.style.left = this.thumbLeft + "px";
		}
	};
	HScrollBar$1.prototype.setInnerWidth = HScrollBar$1.prototype.setScrollWidth;
	exports.ScrollBar = VScrollBar$1;
	exports.ScrollBarV = VScrollBar$1;
	exports.ScrollBarH = HScrollBar$1;
	exports.VScrollBar = VScrollBar$1;
	exports.HScrollBar = HScrollBar$1;
}));
var require_renderloop = /* @__PURE__ */ __commonJSMin(((exports) => {
	var event$1 = require_event();
	var RenderLoop$1 = class {
		constructor(onRender, win) {
			this.onRender = onRender;
			this.pending = false;
			this.changes = 0;
			this.$recursionLimit = 2;
			this.window = win || window;
			var _self = this;
			this._flush = function(ts) {
				_self.pending = false;
				var changes = _self.changes;
				if (changes) {
					event$1.blockIdle(100);
					_self.changes = 0;
					_self.onRender(changes);
				}
				if (_self.changes) {
					if (_self.$recursionLimit-- < 0) return;
					_self.schedule();
				} else _self.$recursionLimit = 2;
			};
		}
		schedule(change) {
			this.changes = this.changes | change;
			if (this.changes && !this.pending) {
				event$1.nextFrame(this._flush);
				this.pending = true;
			}
		}
		clear(change) {
			var changes = this.changes;
			this.changes = 0;
			return changes;
		}
	};
	exports.RenderLoop = RenderLoop$1;
}));
var require_font_metrics = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$2 = require_oop();
	var dom$2 = require_dom();
	var lang$1 = require_lang();
	var event = require_event();
	var useragent$1 = require_useragent();
	var EventEmitter$2 = require_event_emitter().EventEmitter;
	var CHAR_COUNT = 512;
	var USE_OBSERVER = typeof ResizeObserver == "function";
	var L = 200;
	var FontMetrics$1 = class {
		constructor(parentEl) {
			this.el = dom$2.createElement("div");
			this.$setMeasureNodeStyles(this.el.style, true);
			this.$main = dom$2.createElement("div");
			this.$setMeasureNodeStyles(this.$main.style);
			this.$measureNode = dom$2.createElement("div");
			this.$setMeasureNodeStyles(this.$measureNode.style);
			this.el.appendChild(this.$main);
			this.el.appendChild(this.$measureNode);
			parentEl.appendChild(this.el);
			this.$measureNode.textContent = lang$1.stringRepeat("X", CHAR_COUNT);
			this.$characterSize = {
				width: 0,
				height: 0
			};
			if (USE_OBSERVER) this.$addObserver();
			else this.checkForSizeChanges();
		}
		$setMeasureNodeStyles(style, isRoot) {
			style.width = style.height = "auto";
			style.left = style.top = "0px";
			style.visibility = "hidden";
			style.position = "absolute";
			style.whiteSpace = "pre";
			if (useragent$1.isIE < 8) style["font-family"] = "inherit";
			else style.font = "inherit";
			style.overflow = isRoot ? "hidden" : "visible";
		}
		checkForSizeChanges(size) {
			if (size === void 0) size = this.$measureSizes();
			if (size && (this.$characterSize.width !== size.width || this.$characterSize.height !== size.height)) {
				this.$measureNode.style.fontWeight = "bold";
				var boldSize = this.$measureSizes();
				this.$measureNode.style.fontWeight = "";
				this.$characterSize = size;
				this.charSizes = Object.create(null);
				this.allowBoldFonts = boldSize && boldSize.width === size.width && boldSize.height === size.height;
				this._emit("changeCharacterSize", { data: size });
			}
		}
		$addObserver() {
			var self = this;
			this.$observer = new window.ResizeObserver(function(e) {
				self.checkForSizeChanges();
			});
			this.$observer.observe(this.$measureNode);
		}
		$pollSizeChanges() {
			if (this.$pollSizeChangesTimer || this.$observer) return this.$pollSizeChangesTimer;
			var self = this;
			return this.$pollSizeChangesTimer = event.onIdle(function cb() {
				self.checkForSizeChanges();
				event.onIdle(cb, 500);
			}, 500);
		}
		setPolling(val) {
			if (val) this.$pollSizeChanges();
			else if (this.$pollSizeChangesTimer) {
				clearInterval(this.$pollSizeChangesTimer);
				this.$pollSizeChangesTimer = 0;
			}
		}
		$measureSizes(node) {
			var size = {
				height: (node || this.$measureNode).clientHeight,
				width: (node || this.$measureNode).clientWidth / CHAR_COUNT
			};
			if (size.width === 0 || size.height === 0) return null;
			return size;
		}
		$measureCharWidth(ch) {
			this.$main.textContent = lang$1.stringRepeat(ch, CHAR_COUNT);
			return this.$main.getBoundingClientRect().width / CHAR_COUNT;
		}
		getCharacterWidth(ch) {
			var w = this.charSizes[ch];
			if (w === void 0) w = this.charSizes[ch] = this.$measureCharWidth(ch) / this.$characterSize.width;
			return w;
		}
		destroy() {
			clearInterval(this.$pollSizeChangesTimer);
			if (this.$observer) this.$observer.disconnect();
			if (this.el && this.el.parentNode) this.el.parentNode.removeChild(this.el);
		}
		$getZoom(element) {
			if (!element || !element.parentElement) return 1;
			return (Number(window.getComputedStyle(element)["zoom"]) || 1) * this.$getZoom(element.parentElement);
		}
		$initTransformMeasureNodes() {
			var t = function(t$1, l) {
				return ["div", { style: "position: absolute;top:" + t$1 + "px;left:" + l + "px;" }];
			};
			this.els = dom$2.buildDom([
				t(0, 0),
				t(L, 0),
				t(0, L),
				t(L, L)
			], this.el);
		}
		transformCoordinates(clientPos, elPos) {
			if (clientPos) clientPos = mul(1 / this.$getZoom(this.el), clientPos);
			function solve(l1, l2, r) {
				var det = l1[1] * l2[0] - l1[0] * l2[1];
				return [(-l2[1] * r[0] + l2[0] * r[1]) / det, (+l1[1] * r[0] - l1[0] * r[1]) / det];
			}
			function sub(a$1, b$1) {
				return [a$1[0] - b$1[0], a$1[1] - b$1[1]];
			}
			function add(a$1, b$1) {
				return [a$1[0] + b$1[0], a$1[1] + b$1[1]];
			}
			function mul(a$1, b$1) {
				return [a$1 * b$1[0], a$1 * b$1[1]];
			}
			if (!this.els) this.$initTransformMeasureNodes();
			function p(el) {
				var r = el.getBoundingClientRect();
				return [r.left, r.top];
			}
			var a = p(this.els[0]);
			var b = p(this.els[1]);
			var c = p(this.els[2]);
			var d = p(this.els[3]);
			var h = solve(sub(d, b), sub(d, c), sub(add(b, c), add(d, a)));
			var m1 = mul(1 + h[0], sub(b, a));
			var m2 = mul(1 + h[1], sub(c, a));
			if (elPos) {
				var x = elPos;
				var k = h[0] * x[0] / L + h[1] * x[1] / L + 1;
				var ut = add(mul(x[0], m1), mul(x[1], m2));
				return add(mul(1 / k / L, ut), a);
			}
			var u = sub(clientPos, a);
			return mul(L, solve(sub(m1, mul(h[0], u)), sub(m2, mul(h[1], u)), u));
		}
	};
	FontMetrics$1.prototype.$characterSize = {
		width: 0,
		height: 0
	};
	oop$2.implement(FontMetrics$1.prototype, EventEmitter$2);
	exports.FontMetrics = FontMetrics$1;
}));
var require_editor_css = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = `
.ace_br1 {border-top-left-radius    : 3px;}
.ace_br2 {border-top-right-radius   : 3px;}
.ace_br3 {border-top-left-radius    : 3px; border-top-right-radius:    3px;}
.ace_br4 {border-bottom-right-radius: 3px;}
.ace_br5 {border-top-left-radius    : 3px; border-bottom-right-radius: 3px;}
.ace_br6 {border-top-right-radius   : 3px; border-bottom-right-radius: 3px;}
.ace_br7 {border-top-left-radius    : 3px; border-top-right-radius:    3px; border-bottom-right-radius: 3px;}
.ace_br8 {border-bottom-left-radius : 3px;}
.ace_br9 {border-top-left-radius    : 3px; border-bottom-left-radius:  3px;}
.ace_br10{border-top-right-radius   : 3px; border-bottom-left-radius:  3px;}
.ace_br11{border-top-left-radius    : 3px; border-top-right-radius:    3px; border-bottom-left-radius:  3px;}
.ace_br12{border-bottom-right-radius: 3px; border-bottom-left-radius:  3px;}
.ace_br13{border-top-left-radius    : 3px; border-bottom-right-radius: 3px; border-bottom-left-radius:  3px;}
.ace_br14{border-top-right-radius   : 3px; border-bottom-right-radius: 3px; border-bottom-left-radius:  3px;}
.ace_br15{border-top-left-radius    : 3px; border-top-right-radius:    3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px;}


.ace_editor {
    position: relative;
    overflow: hidden;
    padding: 0;
    font: 12px/normal 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'Source Code Pro', 'source-code-pro', monospace;
    direction: ltr;
    text-align: left;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    forced-color-adjust: none;
}

.ace_scroller {
    position: absolute;
    overflow: hidden;
    top: 0;
    bottom: 0;
    background-color: inherit;
    -ms-user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    cursor: text;
}

.ace_content {
    position: absolute;
    box-sizing: border-box;
    min-width: 100%;
    contain: style size layout;
    font-variant-ligatures: no-common-ligatures;
}
.ace_invisible {
    font-variant-ligatures: none;
}

.ace_keyboard-focus:focus {
    box-shadow: inset 0 0 0 2px #5E9ED6;
    outline: none;
}

.ace_dragging .ace_scroller:before{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    content: '';
    background: rgba(250, 250, 250, 0.01);
    z-index: 1000;
}
.ace_dragging.ace_dark .ace_scroller:before{
    background: rgba(0, 0, 0, 0.01);
}

.ace_gutter {
    position: absolute;
    overflow : hidden;
    width: auto;
    top: 0;
    bottom: 0;
    left: 0;
    cursor: default;
    z-index: 4;
    -ms-user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    contain: style size layout;
}

.ace_gutter-active-line {
    position: absolute;
    left: 0;
    right: 0;
}

.ace_scroller.ace_scroll-left:after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    box-shadow: 17px 0 16px -16px rgba(0, 0, 0, 0.4) inset;
    pointer-events: none;
}

.ace_gutter-cell, .ace_gutter-cell_svg-icons {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding-left: 19px;
    padding-right: 6px;
    background-repeat: no-repeat;
}

.ace_gutter-cell_svg-icons .ace_gutter_annotation {
    margin-left: -14px;
    float: left;
}

.ace_gutter-cell .ace_gutter_annotation {
    margin-left: -19px;
    float: left;
}

.ace_gutter-cell.ace_error, .ace_icon.ace_error, .ace_icon.ace_error_fold, .ace_gutter-cell.ace_security, .ace_icon.ace_security, .ace_icon.ace_security_fold {
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABOFBMVEX/////////QRswFAb/Ui4wFAYwFAYwFAaWGAfDRymzOSH/PxswFAb/SiUwFAYwFAbUPRvjQiDllog5HhHdRybsTi3/Tyv9Tir+Syj/UC3////XurebMBIwFAb/RSHbPx/gUzfdwL3kzMivKBAwFAbbvbnhPx66NhowFAYwFAaZJg8wFAaxKBDZurf/RB6mMxb/SCMwFAYwFAbxQB3+RB4wFAb/Qhy4Oh+4QifbNRcwFAYwFAYwFAb/QRzdNhgwFAYwFAbav7v/Uy7oaE68MBK5LxLewr/r2NXewLswFAaxJw4wFAbkPRy2PyYwFAaxKhLm1tMwFAazPiQwFAaUGAb/QBrfOx3bvrv/VC/maE4wFAbRPBq6MRO8Qynew8Dp2tjfwb0wFAbx6eju5+by6uns4uH9/f36+vr/GkHjAAAAYnRSTlMAGt+64rnWu/bo8eAA4InH3+DwoN7j4eLi4xP99Nfg4+b+/u9B/eDs1MD1mO7+4PHg2MXa347g7vDizMLN4eG+Pv7i5evs/v79yu7S3/DV7/498Yv24eH+4ufQ3Ozu/v7+y13sRqwAAADLSURBVHjaZc/XDsFgGIBhtDrshlitmk2IrbHFqL2pvXf/+78DPokj7+Fz9qpU/9UXJIlhmPaTaQ6QPaz0mm+5gwkgovcV6GZzd5JtCQwgsxoHOvJO15kleRLAnMgHFIESUEPmawB9ngmelTtipwwfASilxOLyiV5UVUyVAfbG0cCPHig+GBkzAENHS0AstVF6bacZIOzgLmxsHbt2OecNgJC83JERmePUYq8ARGkJx6XtFsdddBQgZE2nPR6CICZhawjA4Fb/chv+399kfR+MMMDGOQAAAABJRU5ErkJggg==");
    background-repeat: no-repeat;
    background-position: 2px center;
}

.ace_gutter-cell.ace_warning, .ace_icon.ace_warning, .ace_icon.ace_warning_fold {
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAmVBMVEX///8AAAD///8AAAAAAABPSzb/5sAAAAB/blH/73z/ulkAAAAAAAD85pkAAAAAAAACAgP/vGz/rkDerGbGrV7/pkQICAf////e0IsAAAD/oED/qTvhrnUAAAD/yHD/njcAAADuv2r/nz//oTj/p064oGf/zHAAAAA9Nir/tFIAAAD/tlTiuWf/tkIAAACynXEAAAAAAAAtIRW7zBpBAAAAM3RSTlMAABR1m7RXO8Ln31Z36zT+neXe5OzooRDfn+TZ4p3h2hTf4t3k3ucyrN1K5+Xaks52Sfs9CXgrAAAAjklEQVR42o3PbQ+CIBQFYEwboPhSYgoYunIqqLn6/z8uYdH8Vmdnu9vz4WwXgN/xTPRD2+sgOcZjsge/whXZgUaYYvT8QnuJaUrjrHUQreGczuEafQCO/SJTufTbroWsPgsllVhq3wJEk2jUSzX3CUEDJC84707djRc5MTAQxoLgupWRwW6UB5fS++NV8AbOZgnsC7BpEAAAAABJRU5ErkJggg==");
    background-repeat: no-repeat;
    background-position: 2px center;
}

.ace_gutter-cell.ace_info, .ace_icon.ace_info, .ace_gutter-cell.ace_hint, .ace_icon.ace_hint {
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAAAAAA6mKC9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAJ0Uk5TAAB2k804AAAAPklEQVQY02NgIB68QuO3tiLznjAwpKTgNyDbMegwisCHZUETUZV0ZqOquBpXj2rtnpSJT1AEnnRmL2OgGgAAIKkRQap2htgAAAAASUVORK5CYII=");
    background-repeat: no-repeat;
    background-position: 2px center;
}

.ace_dark .ace_gutter-cell.ace_info, .ace_dark .ace_icon.ace_info, .ace_dark .ace_gutter-cell.ace_hint, .ace_dark .ace_icon.ace_hint {
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAJFBMVEUAAAChoaGAgIAqKiq+vr6tra1ZWVmUlJSbm5s8PDxubm56enrdgzg3AAAAAXRSTlMAQObYZgAAAClJREFUeNpjYMAPdsMYHegyJZFQBlsUlMFVCWUYKkAZMxZAGdxlDMQBAG+TBP4B6RyJAAAAAElFTkSuQmCC");
}

.ace_icon_svg.ace_error {
    -webkit-mask-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAxNiI+CjxnIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSJyZWQiIHNoYXBlLXJlbmRlcmluZz0iZ2VvbWV0cmljUHJlY2lzaW9uIj4KPGNpcmNsZSBmaWxsPSJub25lIiBjeD0iOCIgY3k9IjgiIHI9IjciIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPGxpbmUgeDE9IjExIiB5MT0iNSIgeDI9IjUiIHkyPSIxMSIvPgo8bGluZSB4MT0iMTEiIHkxPSIxMSIgeDI9IjUiIHkyPSI1Ii8+CjwvZz4KPC9zdmc+");
    background-color: crimson;
}
.ace_icon_svg.ace_security {
    -webkit-mask-image: url("data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAgMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgICA8ZyBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0iZGFya29yYW5nZSIgZmlsbD0ibm9uZSIgc2hhcGUtcmVuZGVyaW5nPSJnZW9tZXRyaWNQcmVjaXNpb24iPgogICAgICAgIDxwYXRoIGNsYXNzPSJzdHJva2UtbGluZWpvaW4tcm91bmQiIGQ9Ik04IDE0LjgzMDdDOCAxNC44MzA3IDIgMTIuOTA0NyAyIDguMDg5OTJWMy4yNjU0OEM1LjMxIDMuMjY1NDggNy45ODk5OSAxLjM0OTE4IDcuOTg5OTkgMS4zNDkxOEM3Ljk4OTk5IDEuMzQ5MTggMTAuNjkgMy4yNjU0OCAxNCAzLjI2NTQ4VjguMDg5OTJDMTQgMTIuOTA0NyA4IDE0LjgzMDcgOCAxNC44MzA3WiIvPgogICAgICAgIDxwYXRoIGQ9Ik0yIDguMDg5OTJWMy4yNjU0OEM1LjMxIDMuMjY1NDggNy45ODk5OSAxLjM0OTE4IDcuOTg5OTkgMS4zNDkxOCIvPgogICAgICAgIDxwYXRoIGQ9Ik0xMy45OSA4LjA4OTkyVjMuMjY1NDhDMTAuNjggMy4yNjU0OCA4IDEuMzQ5MTggOCAxLjM0OTE4Ii8+CiAgICAgICAgPHBhdGggY2xhc3M9InN0cm9rZS1saW5lam9pbi1yb3VuZCIgZD0iTTggNFY5Ii8+CiAgICAgICAgPHBhdGggY2xhc3M9InN0cm9rZS1saW5lam9pbi1yb3VuZCIgZD0iTTggMTBWMTIiLz4KICAgIDwvZz4KPC9zdmc+");
    background-color: crimson;
}
.ace_icon_svg.ace_warning {
    -webkit-mask-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAxNiI+CjxnIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSJkYXJrb3JhbmdlIiBzaGFwZS1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiI+Cjxwb2x5Z29uIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGZpbGw9Im5vbmUiIHBvaW50cz0iOCAxIDE1IDE1IDEgMTUgOCAxIi8+CjxyZWN0IHg9IjgiIHk9IjEyIiB3aWR0aD0iMC4wMSIgaGVpZ2h0PSIwLjAxIi8+CjxsaW5lIHgxPSI4IiB5MT0iNiIgeDI9IjgiIHkyPSIxMCIvPgo8L2c+Cjwvc3ZnPg==");
    background-color: darkorange;
}
.ace_icon_svg.ace_info {
    -webkit-mask-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAxNiI+CjxnIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlPSJibHVlIiBzaGFwZS1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiI+CjxjaXJjbGUgZmlsbD0ibm9uZSIgY3g9IjgiIGN5PSI4IiByPSI3IiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjxwb2x5bGluZSBwb2ludHM9IjggMTEgOCA4Ii8+Cjxwb2x5bGluZSBwb2ludHM9IjkgOCA2IDgiLz4KPGxpbmUgeDE9IjEwIiB5MT0iMTEiIHgyPSI2IiB5Mj0iMTEiLz4KPHJlY3QgeD0iOCIgeT0iNSIgd2lkdGg9IjAuMDEiIGhlaWdodD0iMC4wMSIvPgo8L2c+Cjwvc3ZnPg==");
    background-color: royalblue;
}
.ace_icon_svg.ace_hint {
    -webkit-mask-image: url("data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAgMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgICA8ZyBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZT0ic2lsdmVyIiBmaWxsPSJub25lIiBzaGFwZS1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiI+CiAgICAgICAgPHBhdGggY2xhc3M9InN0cm9rZS1saW5lam9pbi1yb3VuZCIgZD0iTTYgMTRIMTAiLz4KICAgICAgICA8cGF0aCBkPSJNOCAxMUg5QzkgOS40NzAwMiAxMiA4LjU0MDAyIDEyIDUuNzYwMDJDMTIuMDIgNC40MDAwMiAxMS4zOSAzLjM2MDAyIDEwLjQzIDIuNjcwMDJDOSAxLjY0MDAyIDcuMDAwMDEgMS42NDAwMiA1LjU3MDAxIDIuNjcwMDJDNC42MTAwMSAzLjM2MDAyIDMuOTggNC40MDAwMiA0IDUuNzYwMDJDNCA4LjU0MDAyIDcuMDAwMDEgOS40NzAwMiA3LjAwMDAxIDExSDhaIi8+CiAgICA8L2c+Cjwvc3ZnPg==");
    background-color: silver;
}

.ace_icon_svg.ace_error_fold {
    -webkit-mask-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAxNiIgZmlsbD0ibm9uZSI+CiAgPHBhdGggZD0ibSAxOC45Mjk4NTEsNy44Mjk4MDc2IGMgMC4xNDYzNTMsNi4zMzc0NjA0IC02LjMyMzE0Nyw3Ljc3Nzg0NDQgLTcuNDc3OTEyLDcuNzc3ODQ0NCAtMi4xMDcyNzI2LC0wLjEyODc1IDUuMTE3Njc4LDAuMzU2MjQ5IDUuMDUxNjk4LC03Ljg3MDA2MTggLTAuNjA0NjcyLC04LjAwMzk3MzQ5IC03LjA3NzI3MDYsLTcuNTYzMTE4OSAtNC44NTczLC03LjQzMDM5NTU2IDEuNjA2LC0wLjExNTE0MjI1IDYuODk3NDg1LDEuMjYyNTQ1OTYgNy4yODM1MTQsNy41MjI2MTI5NiB6IiBmaWxsPSJjcmltc29uIiBzdHJva2Utd2lkdGg9IjIiLz4KICA8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0ibSA4LjExNDc1NjIsMi4wNTI5ODI4IGMgMy4zNDkxNjk4LDAgNi4wNjQxMzI4LDIuNjc2ODYyNyA2LjA2NDEzMjgsNS45Nzg5NTMgMCwzLjMwMjExMjIgLTIuNzE0OTYzLDUuOTc4OTIwMiAtNi4wNjQxMzI4LDUuOTc4OTIwMiAtMy4zNDkxNDczLDAgLTYuMDY0MTc3MiwtMi42NzY4MDggLTYuMDY0MTc3MiwtNS45Nzg5MjAyIDAuMDA1MzksLTMuMjk5ODg2MSAyLjcxNzI2NTYsLTUuOTczNjQwOCA2LjA2NDE3NzIsLTUuOTc4OTUzIHogbSAwLC0xLjczNTgyNzE5IGMgLTQuMzIxNDgzNiwwIC03LjgyNDc0MDM4LDMuNDU0MDE4NDkgLTcuODI0NzQwMzgsNy43MTQ3ODAxOSAwLDQuMjYwNzI4MiAzLjUwMzI1Njc4LDcuNzE0NzQ1MiA3LjgyNDc0MDM4LDcuNzE0NzQ1MiA0LjMyMTQ0OTgsMCA3LjgyNDY5OTgsLTMuNDU0MDE3IDcuODI0Njk5OCwtNy43MTQ3NDUyIDAsLTIuMDQ2MDkxNCAtMC44MjQzOTIsLTQuMDA4MzY3MiAtMi4yOTE3NTYsLTUuNDU1MTc0NiBDIDEyLjE4MDIyNSwxLjEyOTk2NDggMTAuMTkwMDEzLDAuMzE3MTU1NjEgOC4xMTQ3NTYyLDAuMzE3MTU1NjEgWiBNIDYuOTM3NDU2Myw4LjI0MDU5ODUgNC42NzE4Njg1LDEwLjQ4NTg1MiA2LjAwODY4MTQsMTEuODc2NzI4IDguMzE3MDAzNSw5LjYwMDc5MTEgMTAuNjI1MzM3LDExLjg3NjcyOCAxMS45NjIxMzgsMTAuNDg1ODUyIDkuNjk2NTUwOCw4LjI0MDU5ODUgMTEuOTYyMTM4LDYuMDA2ODA2NiAxMC41NzMyNDYsNC42Mzc0MzM1IDguMzE3MDAzNSw2Ljg3MzQyOTcgNi4wNjA3NjA3LDQuNjM3NDMzNSA0LjY3MTg2ODUsNi4wMDY4MDY2IFoiIGZpbGw9ImNyaW1zb24iIHN0cm9rZS13aWR0aD0iMiIvPgo8L3N2Zz4=");
    background-color: crimson;
}
.ace_icon_svg.ace_security_fold {
    -webkit-mask-image: url("data:image/svg+xml;base64,CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMTcgMTQiIGZpbGw9Im5vbmUiPgogICAgPHBhdGggZD0iTTEwLjAwMDEgMTMuNjk5MkMxMC4wMDAxIDEzLjY5OTIgMTEuOTI0MSAxMy40NzYzIDEzIDEyLjY5OTJDMTQuNDEzOSAxMS42NzgxIDE2IDEwLjUgMTYuMTI1MSA2LjgxMTI2VjIuNTg5ODdDMTYuMTI1MSAyLjU0NzY4IDE2LjEyMjEgMi41MDYxOSAxNi4xMTY0IDIuNDY1NTlWMS43MTQ4NUgxNS4yNDE0TDE1LjIzMDcgMS43MTQ4NEwxNC42MjUxIDEuNjk5MjJWNi44MTEyM0MxNC42MjUxIDguNTEwNjEgMTQuNjI1MSA5LjQ2NDYxIDEyLjc4MjQgMTEuNzIxQzEyLjE1ODYgMTIuNDg0OCAxMC4wMDAxIDEzLjY5OTIgMTAuMDAwMSAxMy42OTkyWiIgZmlsbD0iY3JpbXNvbiIgc3Ryb2tlLXdpZHRoPSIyIi8+CiAgICA8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTcuMzM2MDkgMC4zNjc0NzVDNy4wMzIxNCAwLjE1MjY1MiA2LjYyNTQ4IDAuMTUzNjE0IDYuMzIyNTMgMC4zNjk5OTdMNi4zMDg2OSAwLjM3OTU1NEM2LjI5NTUzIDAuMzg4NTg4IDYuMjczODggMC40MDMyNjYgNi4yNDQxNyAwLjQyMjc4OUM2LjE4NDcxIDAuNDYxODYgNi4wOTMyMSAwLjUyMDE3MSA1Ljk3MzEzIDAuNTkxMzczQzUuNzMyNTEgMC43MzQwNTkgNS4zNzk5IDAuOTI2ODY0IDQuOTQyNzkgMS4xMjAwOUM0LjA2MTQ0IDEuNTA5NyAyLjg3NTQxIDEuODgzNzcgMS41ODk4NCAxLjg4Mzc3SDAuNzE0ODQ0VjIuNzU4NzdWNi45ODAxNUMwLjcxNDg0NCA5LjQ5Mzc0IDIuMjg4NjYgMTEuMTk3MyAzLjcwMjU0IDEyLjIxODVDNC40MTg0NSAxMi43MzU1IDUuMTI4NzQgMTMuMTA1MyA1LjY1NzMzIDEzLjM0NTdDNS45MjI4NCAxMy40NjY0IDYuMTQ1NjYgMTMuNTU1OSA2LjMwNDY1IDEzLjYxNjFDNi4zODQyMyAxMy42NDYyIDYuNDQ4MDUgMTMuNjY5IDYuNDkzNDkgMTMuNjg0OEM2LjUxNjIyIDEzLjY5MjcgNi41MzQzOCAxMy42OTg5IDYuNTQ3NjQgMTMuNzAzM0w2LjU2MzgyIDEzLjcwODdMNi41NjkwOCAxMy43MTA0TDYuNTcwOTkgMTMuNzExTDYuODM5ODQgMTMuNzUzM0w2LjU3MjQyIDEzLjcxMTVDNi43NDYzMyAxMy43NjczIDYuOTMzMzUgMTMuNzY3MyA3LjEwNzI3IDEzLjcxMTVMNy4xMDg3IDEzLjcxMUw3LjExMDYxIDEzLjcxMDRMNy4xMTU4NyAxMy43MDg3TDcuMTMyMDUgMTMuNzAzM0M3LjE0NTMxIDEzLjY5ODkgNy4xNjM0NiAxMy42OTI3IDcuMTg2MTkgMTMuNjg0OEM3LjIzMTY0IDEzLjY2OSA3LjI5NTQ2IDEzLjY0NjIgNy4zNzUwMyAxMy42MTYxQzcuNTM0MDMgMTMuNTU1OSA3Ljc1Njg1IDEzLjQ2NjQgOC4wMjIzNiAxMy4zNDU3QzguNTUwOTUgMTMuMTA1MyA5LjI2MTIzIDEyLjczNTUgOS45NzcxNSAxMi4yMTg1QzExLjM5MSAxMS4xOTczIDEyLjk2NDggOS40OTM3NyAxMi45NjQ4IDYuOTgwMThWMi43NTg4QzEyLjk2NDggMi43MTY2IDEyLjk2MTkgMi42NzUxMSAxMi45NTYxIDIuNjM0NTFWMS44ODM3N0gxMi4wODExQzEyLjA3NzUgMS44ODM3NyAxMi4wNzQgMS44ODM3NyAxMi4wNzA0IDEuODgzNzdDMTAuNzk3OSAxLjg4MDA0IDkuNjE5NjIgMS41MTEwMiA4LjczODk0IDEuMTI0ODZDOC43MzUzNCAxLjEyMzI3IDguNzMxNzQgMS4xMjE2OCA4LjcyODE0IDEuMTIwMDlDOC4yOTEwMyAwLjkyNjg2NCA3LjkzODQyIDAuNzM0MDU5IDcuNjk3NzkgMC41OTEzNzNDNy41Nzc3MiAwLjUyMDE3MSA3LjQ4NjIyIDAuNDYxODYgNy40MjY3NiAwLjQyMjc4OUM3LjM5NzA1IDAuNDAzMjY2IDcuMzc1MzkgMC4zODg1ODggNy4zNjIyNCAwLjM3OTU1NEw3LjM0ODk2IDAuMzcwMzVDNy4zNDg5NiAwLjM3MDM1IDcuMzQ4NDcgMC4zNzAwMiA3LjM0NTYzIDAuMzc0MDU0TDcuMzM3NzkgMC4zNjg2NTlMNy4zMzYwOSAwLjM2NzQ3NVpNOC4wMzQ3MSAyLjcyNjkxQzguODYwNCAzLjA5MDYzIDkuOTYwNjYgMy40NjMwOSAxMS4yMDYxIDMuNTg5MDdWNi45ODAxNUgxMS4yMTQ4QzExLjIxNDggOC42Nzk1MyAxMC4xNjM3IDkuOTI1MDcgOC45NTI1NCAxMC43OTk4QzguMzU1OTUgMTEuMjMwNiA3Ljc1Mzc0IDExLjU0NTQgNy4yOTc5NiAxMS43NTI3QzcuMTE2NzEgMTEuODM1MSA2Ljk2MDYyIDExLjg5OTYgNi44Mzk4NCAxMS45NDY5QzYuNzE5MDYgMTEuODk5NiA2LjU2Mjk3IDExLjgzNTEgNi4zODE3MyAxMS43NTI3QzUuOTI1OTUgMTEuNTQ1NCA1LjMyMzczIDExLjIzMDYgNC43MjcxNSAxMC43OTk4QzMuNTE2MDMgOS45MjUwNyAyLjQ2NDg0IDguNjc5NTUgMi40NjQ4NCA2Ljk4MDE4VjMuNTg5MDlDMy43MTczOCAzLjQ2MjM5IDQuODIzMDggMy4wODYzOSA1LjY1MDMzIDIuNzIwNzFDNi4xNDIyOCAyLjUwMzI0IDYuNTQ0ODUgMi4yODUzNyA2LjgzMjU0IDIuMTE2MjRDNy4xMjE4MSAyLjI4NTM1IDcuNTI3IDIuNTAzNTIgOC4wMjE5NiAyLjcyMTMxQzguMDI2MiAyLjcyMzE3IDguMDMwNDUgMi43MjUwNCA4LjAzNDcxIDIuNzI2OTFaTTUuOTY0ODQgMy40MDE0N1Y3Ljc3NjQ3SDcuNzE0ODRWMy40MDE0N0g1Ljk2NDg0Wk01Ljk2NDg0IDEwLjQwMTVWOC42NTE0N0g3LjcxNDg0VjEwLjQwMTVINS45NjQ4NFoiIGZpbGw9ImNyaW1zb24iIHN0cm9rZS13aWR0aD0iMiIvPgo8L3N2Zz4=");
    background-color: crimson;
}
.ace_icon_svg.ace_warning_fold {
    -webkit-mask-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAyMCAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNC43NzY5IDE0LjczMzdMOC42NTE5MiAyLjQ4MzY5QzguMzI5NDYgMS44Mzg3NyA3LjQwOTEzIDEuODM4NzcgNy4wODY2NyAyLjQ4MzY5TDAuOTYxNjY5IDE0LjczMzdDMC42NzA3NzUgMTUuMzE1NSAxLjA5MzgzIDE2IDEuNzQ0MjkgMTZIMTMuOTk0M0MxNC42NDQ4IDE2IDE1LjA2NzggMTUuMzE1NSAxNC43NzY5IDE0LjczMzdaTTMuMTYwMDcgMTQuMjVMNy44NjkyOSA0LjgzMTU2TDEyLjU3ODUgMTQuMjVIMy4xNjAwN1pNOC43NDQyOSAxMS42MjVWMTMuMzc1SDYuOTk0MjlWMTEuNjI1SDguNzQ0MjlaTTYuOTk0MjkgMTAuNzVWNy4yNUg4Ljc0NDI5VjEwLjc1SDYuOTk0MjlaIiBmaWxsPSIjRUM3MjExIi8+CjxwYXRoIGQ9Ik0xMS4xOTkxIDIuOTUyMzhDMTAuODgwOSAyLjMxNDY3IDEwLjM1MzcgMS44MDUyNiA5LjcwNTUgMS41MDlMMTEuMDQxIDEuMDY5NzhDMTEuNjg4MyAwLjk0OTgxNCAxMi4zMzcgMS4yNzI2MyAxMi42MzE3IDEuODYxNDFMMTcuNjEzNiAxMS44MTYxQzE4LjM1MjcgMTMuMjkyOSAxNy41OTM4IDE1LjA4MDQgMTYuMDE4IDE1LjU3NDVDMTYuNDA0NCAxNC40NTA3IDE2LjMyMzEgMTMuMjE4OCAxNS43OTI0IDEyLjE1NTVMMTEuMTk5MSAyLjk1MjM4WiIgZmlsbD0iI0VDNzIxMSIvPgo8L3N2Zz4=");
    background-color: darkorange;
}

.ace_scrollbar {
    contain: strict;
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 6;
}

.ace_scrollbar-inner {
    position: absolute;
    cursor: text;
    left: 0;
    top: 0;
}

.ace_scrollbar-v{
    overflow-x: hidden;
    overflow-y: scroll;
    top: 0;
}

.ace_scrollbar-h {
    overflow-x: scroll;
    overflow-y: hidden;
    left: 0;
}

.ace_print-margin {
    position: absolute;
    height: 100%;
}

.ace_text-input {
    position: absolute;
    z-index: 0;
    width: 0.5em;
    height: 1em;
    opacity: 0;
    background: transparent;
    -moz-appearance: none;
    appearance: none;
    border: none;
    resize: none;
    outline: none;
    overflow: hidden;
    font: inherit;
    padding: 0 1px;
    margin: 0 -1px;
    contain: strict;
    -ms-user-select: text;
    -moz-user-select: text;
    -webkit-user-select: text;
    user-select: text;
    /*with \`pre-line\` chrome inserts &nbsp; instead of space*/
    white-space: pre!important;
}
.ace_text-input.ace_composition {
    background: transparent;
    color: inherit;
    z-index: 1000;
    opacity: 1;
}
.ace_composition_placeholder { color: transparent }
.ace_composition_marker { 
    border-bottom: 1px solid;
    position: absolute;
    border-radius: 0;
    margin-top: 1px;
}

[ace_nocontext=true] {
    transform: none!important;
    filter: none!important;
    clip-path: none!important;
    mask : none!important;
    contain: none!important;
    perspective: none!important;
    mix-blend-mode: initial!important;
    z-index: auto;
}

.ace_layer {
    z-index: 1;
    position: absolute;
    overflow: hidden;
    /* workaround for chrome bug https://github.com/ajaxorg/ace/issues/2312*/
    word-wrap: normal;
    white-space: pre;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    /* setting pointer-events: auto; on node under the mouse, which changes
        during scroll, will break mouse wheel scrolling in Safari */
    pointer-events: none;
}

.ace_gutter-layer {
    position: relative;
    width: auto;
    text-align: right;
    pointer-events: auto;
    height: 1000000px;
    contain: style size layout;
}

.ace_text-layer {
    font: inherit !important;
    position: absolute;
    height: 1000000px;
    width: 1000000px;
    contain: style size layout;
}

.ace_text-layer > .ace_line, .ace_text-layer > .ace_line_group {
    contain: style size layout;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
}

.ace_hidpi .ace_text-layer,
.ace_hidpi .ace_gutter-layer,
.ace_hidpi .ace_content,
.ace_hidpi .ace_gutter {
    contain: strict;
}
.ace_hidpi .ace_text-layer > .ace_line, 
.ace_hidpi .ace_text-layer > .ace_line_group {
    contain: strict;
}

.ace_cjk {
    display: inline-block;
    text-align: center;
}

.ace_cursor-layer {
    z-index: 4;
}

.ace_cursor {
    z-index: 4;
    position: absolute;
    box-sizing: border-box;
    border-left: 2px solid;
    /* workaround for smooth cursor repaintng whole screen in chrome */
    transform: translatez(0);
}

.ace_multiselect .ace_cursor {
    border-left-width: 1px;
}

.ace_slim-cursors .ace_cursor {
    border-left-width: 1px;
}

.ace_overwrite-cursors .ace_cursor {
    border-left-width: 0;
    border-bottom: 1px solid;
}

.ace_hidden-cursors .ace_cursor {
    opacity: 0.2;
}

.ace_hasPlaceholder .ace_hidden-cursors .ace_cursor {
    opacity: 0;
}

.ace_smooth-blinking .ace_cursor {
    transition: opacity 0.18s;
}

.ace_animate-blinking .ace_cursor {
    animation-duration: 1000ms;
    animation-timing-function: step-end;
    animation-name: blink-ace-animate;
    animation-iteration-count: infinite;
}

.ace_animate-blinking.ace_smooth-blinking .ace_cursor {
    animation-duration: 1000ms;
    animation-timing-function: ease-in-out;
    animation-name: blink-ace-animate-smooth;
}
    
@keyframes blink-ace-animate {
    from, to { opacity: 1; }
    60% { opacity: 0; }
}

@keyframes blink-ace-animate-smooth {
    from, to { opacity: 1; }
    45% { opacity: 1; }
    60% { opacity: 0; }
    85% { opacity: 0; }
}

.ace_marker-layer .ace_step, .ace_marker-layer .ace_stack {
    position: absolute;
    z-index: 3;
}

.ace_marker-layer .ace_selection {
    position: absolute;
    z-index: 5;
}

.ace_marker-layer .ace_bracket {
    position: absolute;
    z-index: 6;
}

.ace_marker-layer .ace_error_bracket {
    position: absolute;
    border-bottom: 1px solid #DE5555;
    border-radius: 0;
}

.ace_marker-layer .ace_active-line {
    position: absolute;
    z-index: 2;
}

.ace_marker-layer .ace_selected-word {
    position: absolute;
    z-index: 4;
    box-sizing: border-box;
}

.ace_line .ace_fold {
    box-sizing: border-box;

    display: inline-block;
    height: 11px;
    margin-top: -2px;
    vertical-align: middle;

    background-image:
        url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAJCAYAAADU6McMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJpJREFUeNpi/P//PwOlgAXGYGRklAVSokD8GmjwY1wasKljQpYACtpCFeADcHVQfQyMQAwzwAZI3wJKvCLkfKBaMSClBlR7BOQikCFGQEErIH0VqkabiGCAqwUadAzZJRxQr/0gwiXIal8zQQPnNVTgJ1TdawL0T5gBIP1MUJNhBv2HKoQHHjqNrA4WO4zY0glyNKLT2KIfIMAAQsdgGiXvgnYAAAAASUVORK5CYII="),
        url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAA3CAYAAADNNiA5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACJJREFUeNpi+P//fxgTAwPDBxDxD078RSX+YeEyDFMCIMAAI3INmXiwf2YAAAAASUVORK5CYII=");
    background-repeat: no-repeat, repeat-x;
    background-position: center center, top left;
    color: transparent;

    border: 1px solid black;
    border-radius: 2px;

    cursor: pointer;
    pointer-events: auto;
}

.ace_dark .ace_fold {
}

.ace_fold:hover{
    background-image:
        url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAJCAYAAADU6McMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJpJREFUeNpi/P//PwOlgAXGYGRklAVSokD8GmjwY1wasKljQpYACtpCFeADcHVQfQyMQAwzwAZI3wJKvCLkfKBaMSClBlR7BOQikCFGQEErIH0VqkabiGCAqwUadAzZJRxQr/0gwiXIal8zQQPnNVTgJ1TdawL0T5gBIP1MUJNhBv2HKoQHHjqNrA4WO4zY0glyNKLT2KIfIMAAQsdgGiXvgnYAAAAASUVORK5CYII="),
        url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAA3CAYAAADNNiA5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACBJREFUeNpi+P//fz4TAwPDZxDxD5X4i5fLMEwJgAADAEPVDbjNw87ZAAAAAElFTkSuQmCC");
}

.ace_tooltip {
    background-color: #f5f5f5;
    border: 1px solid gray;
    border-radius: 1px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    color: black;
    padding: 3px 4px;
    position: fixed;
    z-index: 999999;
    box-sizing: border-box;
    cursor: default;
    white-space: pre-wrap;
    word-wrap: break-word;
    line-height: normal;
    font-style: normal;
    font-weight: normal;
    letter-spacing: normal;
    pointer-events: none;
    overflow: auto;
    max-width: min(33em, 66vw);
    overscroll-behavior: contain;
}
.ace_tooltip pre {
    white-space: pre-wrap;
}

.ace_tooltip.ace_dark {
    background-color: #636363;
    color: #fff;
}

.ace_tooltip:focus {
    outline: 1px solid #5E9ED6;
}

.ace_icon {
    display: inline-block;
    width: 18px;
    vertical-align: top;
}

.ace_icon_svg {
    display: inline-block;
    width: 12px;
    vertical-align: top;
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: 12px;
    -webkit-mask-position: center;
}

.ace_folding-enabled > .ace_gutter-cell, .ace_folding-enabled > .ace_gutter-cell_svg-icons {
    padding-right: 13px;
}

.ace_fold-widget, .ace_custom-widget {
    box-sizing: border-box;

    margin: 0 -12px 0 1px;
    display: none;
    width: 11px;
    vertical-align: top;

    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAANElEQVR42mWKsQ0AMAzC8ixLlrzQjzmBiEjp0A6WwBCSPgKAXoLkqSot7nN3yMwR7pZ32NzpKkVoDBUxKAAAAABJRU5ErkJggg==");
    background-repeat: no-repeat;
    background-position: center;

    border-radius: 3px;
    
    border: 1px solid transparent;
    cursor: pointer;
    pointer-events: auto;
}

.ace_custom-widget {
    background: none;
}

.ace_folding-enabled .ace_fold-widget {
    display: inline-block;   
}

.ace_fold-widget.ace_end {
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAANElEQVR42m3HwQkAMAhD0YzsRchFKI7sAikeWkrxwScEB0nh5e7KTPWimZki4tYfVbX+MNl4pyZXejUO1QAAAABJRU5ErkJggg==");
}

.ace_fold-widget.ace_closed {
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAGCAYAAAAG5SQMAAAAOUlEQVR42jXKwQkAMAgDwKwqKD4EwQ26sSOkVWjgIIHAzPiCgaqiqnJHZnKICBERHN194O5b9vbLuAVRL+l0YWnZAAAAAElFTkSuQmCCXA==");
}

.ace_fold-widget:hover {
    border: 1px solid rgba(0, 0, 0, 0.3);
    background-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 1px 1px rgba(255, 255, 255, 0.7);
}

.ace_fold-widget:active {
    border: 1px solid rgba(0, 0, 0, 0.4);
    background-color: rgba(0, 0, 0, 0.05);
    box-shadow: 0 1px 1px rgba(255, 255, 255, 0.8);
}
/**
 * Dark version for fold widgets
 */
.ace_dark .ace_fold-widget {
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHklEQVQIW2P4//8/AzoGEQ7oGCaLLAhWiSwB146BAQCSTPYocqT0AAAAAElFTkSuQmCC");
}
.ace_dark .ace_fold-widget.ace_end {
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAH0lEQVQIW2P4//8/AxQ7wNjIAjDMgC4AxjCVKBirIAAF0kz2rlhxpAAAAABJRU5ErkJggg==");
}
.ace_dark .ace_fold-widget.ace_closed {
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAHElEQVQIW2P4//+/AxAzgDADlOOAznHAKgPWAwARji8UIDTfQQAAAABJRU5ErkJggg==");
}
.ace_dark .ace_fold-widget:hover {
    box-shadow: 0 1px 1px rgba(255, 255, 255, 0.2);
    background-color: rgba(255, 255, 255, 0.1);
}
.ace_dark .ace_fold-widget:active {
    box-shadow: 0 1px 1px rgba(255, 255, 255, 0.2);
}

.ace_inline_button {
    border: 1px solid lightgray;
    display: inline-block;
    margin: -1px 8px;
    padding: 0 5px;
    pointer-events: auto;
    cursor: pointer;
}
.ace_inline_button:hover {
    border-color: gray;
    background: rgba(200,200,200,0.2);
    display: inline-block;
    pointer-events: auto;
}

.ace_fold-widget.ace_invalid {
    background-color: #FFB4B4;
    border-color: #DE5555;
}

.ace_fade-fold-widgets .ace_fold-widget {
    transition: opacity 0.4s ease 0.05s;
    opacity: 0;
}

.ace_fade-fold-widgets:hover .ace_fold-widget {
    transition: opacity 0.05s ease 0.05s;
    opacity:1;
}

.ace_underline {
    text-decoration: underline;
}

.ace_bold {
    font-weight: bold;
}

.ace_nobold .ace_bold {
    font-weight: normal;
}

.ace_italic {
    font-style: italic;
}


.ace_error-marker {
    background-color: rgba(255, 0, 0,0.2);
    position: absolute;
    z-index: 9;
}

.ace_highlight-marker {
    background-color: rgba(255, 255, 0,0.2);
    position: absolute;
    z-index: 8;
}

.ace_mobile-menu {
    position: absolute;
    line-height: 1.5;
    border-radius: 4px;
    -ms-user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    background: white;
    box-shadow: 1px 3px 2px grey;
    border: 1px solid #dcdcdc;
    color: black;
}
.ace_dark > .ace_mobile-menu {
    background: #333;
    color: #ccc;
    box-shadow: 1px 3px 2px grey;
    border: 1px solid #444;

}
.ace_mobile-button {
    padding: 2px;
    cursor: pointer;
    overflow: hidden;
}
.ace_mobile-button:hover {
    background-color: #eee;
    opacity:1;
}
.ace_mobile-button:active {
    background-color: #ddd;
}

.ace_placeholder {
    position: relative;
    font-family: arial;
    transform: scale(0.9);
    transform-origin: left;
    white-space: pre;
    opacity: 0.7;
    margin: 0 10px;
    z-index: 1;
}

.ace_ghost_text {
    opacity: 0.5;
    font-style: italic;
}

.ace_ghost_text_container > div {
    white-space: pre;
}

.ghost_text_line_wrapped::after {
    content: "↩";
    position: absolute;
}

.ace_lineWidgetContainer.ace_ghost_text {
    margin: 0px 4px
}

.ace_screenreader-only {
    position:absolute;
    left:-10000px;
    top:auto;
    width:1px;
    height:1px;
    overflow:hidden;
}

.ace_hidden_token {
    display: none;
}`;
}));
var require_decorators = /* @__PURE__ */ __commonJSMin(((exports) => {
	var dom$1 = require_dom();
	var oop$1 = require_oop();
	var EventEmitter$1 = require_event_emitter().EventEmitter;
	var Decorator$1 = class {
		constructor(scrollbarV, renderer) {
			this.renderer = renderer;
			this.pixelRatio = 1;
			this.maxHeight = renderer.layerConfig.maxHeight;
			this.lineHeight = renderer.layerConfig.lineHeight;
			this.minDecorationHeight = 2 * this.pixelRatio | 0;
			this.halfMinDecorationHeight = this.minDecorationHeight / 2 | 0;
			this.colors = {};
			this.colors.dark = {
				"error": "rgba(255, 18, 18, 1)",
				"warning": "rgba(18, 136, 18, 1)",
				"info": "rgba(18, 18, 136, 1)"
			};
			this.colors.light = {
				"error": "rgb(255,51,51)",
				"warning": "rgb(32,133,72)",
				"info": "rgb(35,68,138)"
			};
			this.setScrollBarV(scrollbarV);
		}
		$createCanvas() {
			this.canvas = dom$1.createElement("canvas");
			this.canvas.style.top = "0px";
			this.canvas.style.right = "0px";
			this.canvas.style.zIndex = "7";
			this.canvas.style.position = "absolute";
		}
		setScrollBarV(scrollbarV) {
			this.$createCanvas();
			this.scrollbarV = scrollbarV;
			scrollbarV.element.appendChild(this.canvas);
			this.setDimensions();
		}
		$updateDecorators(config$1) {
			if (typeof this.canvas.getContext !== "function") return;
			var colors = this.renderer.theme.isDark === true ? this.colors.dark : this.colors.light;
			this.setDimensions(config$1);
			var ctx = this.canvas.getContext("2d");
			function compare(a, b) {
				if (a.priority < b.priority) return -1;
				if (a.priority > b.priority) return 1;
				return 0;
			}
			var annotations = this.renderer.session.$annotations;
			ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			if (annotations) {
				var priorities = {
					"info": 1,
					"warning": 2,
					"error": 3
				};
				annotations.forEach(function(item) {
					item["priority"] = priorities[item.type] || null;
				});
				annotations = annotations.sort(compare);
				for (let i = 0; i < annotations.length; i++) {
					let row = annotations[i].row;
					const offset1 = this.getVerticalOffsetForRow(row);
					const offset2 = offset1 + this.lineHeight;
					const y1 = Math.round(this.heightRatio * offset1);
					const y2 = Math.round(this.heightRatio * offset2);
					let ycenter = Math.round((y1 + y2) / 2);
					let halfHeight = y2 - ycenter;
					if (halfHeight < this.halfMinDecorationHeight) halfHeight = this.halfMinDecorationHeight;
					if (ycenter - halfHeight < 0) ycenter = halfHeight;
					if (ycenter + halfHeight > this.canvasHeight) ycenter = this.canvasHeight - halfHeight;
					const from = ycenter - halfHeight;
					const zoneHeight = ycenter + halfHeight - from;
					ctx.fillStyle = colors[annotations[i].type] || null;
					ctx.fillRect(0, from, Math.round(this.oneZoneWidth - 1), zoneHeight);
				}
			}
			var cursor = this.renderer.session.selection.getCursor();
			if (cursor) {
				let currentY = Math.round(this.getVerticalOffsetForRow(cursor.row) * this.heightRatio);
				ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
				ctx.fillRect(0, currentY, this.canvasWidth, 2);
			}
		}
		getVerticalOffsetForRow(row) {
			row = row | 0;
			return this.renderer.session.documentToScreenRow(row, 0) * this.lineHeight;
		}
		setDimensions(config$1) {
			config$1 = config$1 || this.renderer.layerConfig;
			this.maxHeight = config$1.maxHeight;
			this.lineHeight = config$1.lineHeight;
			this.canvasHeight = config$1.height;
			this.canvasWidth = this.scrollbarV.width || this.canvasWidth;
			this.setZoneWidth();
			this.canvas.width = this.canvasWidth;
			this.canvas.height = this.canvasHeight;
			if (this.maxHeight < this.canvasHeight) this.heightRatio = 1;
			else this.heightRatio = this.canvasHeight / this.maxHeight;
		}
		setZoneWidth() {
			this.oneZoneWidth = this.canvasWidth;
		}
		destroy() {
			this.canvas.parentNode.removeChild(this.canvas);
		}
	};
	oop$1.implement(Decorator$1.prototype, EventEmitter$1);
	exports.Decorator = Decorator$1;
}));
var require_virtual_renderer = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var dom = require_dom();
	var lang = require_lang();
	var config = require_config();
	var GutterLayer = require_gutter().Gutter;
	var MarkerLayer = require_marker().Marker;
	var TextLayer = require_text().Text;
	var CursorLayer = require_cursor().Cursor;
	var HScrollBar = require_scrollbar().HScrollBar;
	var VScrollBar = require_scrollbar().VScrollBar;
	var HScrollBarCustom = require_scrollbar_custom().HScrollBar;
	var VScrollBarCustom = require_scrollbar_custom().VScrollBar;
	var RenderLoop = require_renderloop().RenderLoop;
	var FontMetrics = require_font_metrics().FontMetrics;
	var EventEmitter = require_event_emitter().EventEmitter;
	var editorCss = require_editor_css();
	var Decorator = require_decorators().Decorator;
	var useragent = require_useragent();
	var isTextToken = require_text_util().isTextToken;
	dom.importCssString(editorCss, "ace_editor.css", false);
	var VirtualRenderer = class {
		constructor(container, theme) {
			var _self = this;
			this.container = container || dom.createElement("div");
			dom.addCssClass(this.container, "ace_editor");
			if (dom.HI_DPI) dom.addCssClass(this.container, "ace_hidpi");
			this.setTheme(theme);
			if (config.get("useStrictCSP") == null) config.set("useStrictCSP", false);
			this.$gutter = dom.createElement("div");
			this.$gutter.className = "ace_gutter";
			this.container.appendChild(this.$gutter);
			this.$gutter.setAttribute("aria-hidden", "true");
			this.scroller = dom.createElement("div");
			this.scroller.className = "ace_scroller";
			this.container.appendChild(this.scroller);
			this.content = dom.createElement("div");
			this.content.className = "ace_content";
			this.scroller.appendChild(this.content);
			this.$gutterLayer = new GutterLayer(this.$gutter);
			this.$gutterLayer.on("changeGutterWidth", this.onGutterResize.bind(this));
			this.$markerBack = new MarkerLayer(this.content);
			this.canvas = (this.$textLayer = new TextLayer(this.content)).element;
			this.$markerFront = new MarkerLayer(this.content);
			this.$cursorLayer = new CursorLayer(this.content);
			this.$horizScroll = false;
			this.$vScroll = false;
			this.scrollBar = this.scrollBarV = new VScrollBar(this.container, this);
			this.scrollBarH = new HScrollBar(this.container, this);
			this.scrollBarV.on("scroll", function(e) {
				if (!_self.$scrollAnimation) _self.session.setScrollTop(e.data - _self.scrollMargin.top);
			});
			this.scrollBarH.on("scroll", function(e) {
				if (!_self.$scrollAnimation) _self.session.setScrollLeft(e.data - _self.scrollMargin.left);
			});
			this.scrollTop = 0;
			this.scrollLeft = 0;
			this.cursorPos = {
				row: 0,
				column: 0
			};
			this.$fontMetrics = new FontMetrics(this.container);
			this.$textLayer.$setFontMetrics(this.$fontMetrics);
			this.$textLayer.on("changeCharacterSize", function(e) {
				_self.updateCharacterSize();
				_self.onResize(true, _self.gutterWidth, _self.$size.width, _self.$size.height);
				_self._signal("changeCharacterSize", e);
			});
			this.$size = {
				width: 0,
				height: 0,
				scrollerHeight: 0,
				scrollerWidth: 0,
				$dirty: true
			};
			this.layerConfig = {
				width: 1,
				padding: 0,
				firstRow: 0,
				firstRowScreen: 0,
				lastRow: 0,
				lineHeight: 0,
				characterWidth: 0,
				minHeight: 1,
				maxHeight: 1,
				offset: 0,
				height: 1,
				gutterOffset: 1
			};
			this.scrollMargin = {
				left: 0,
				right: 0,
				top: 0,
				bottom: 0,
				v: 0,
				h: 0
			};
			this.margin = {
				left: 0,
				right: 0,
				top: 0,
				bottom: 0,
				v: 0,
				h: 0
			};
			this.$keepTextAreaAtCursor = !useragent.isIOS;
			this.$loop = new RenderLoop(this.$renderChanges.bind(this), this.container.ownerDocument.defaultView);
			this.$loop.schedule(this.CHANGE_FULL);
			this.updateCharacterSize();
			this.setPadding(4);
			this.$addResizeObserver();
			config.resetOptions(this);
			config._signal("renderer", this);
		}
		updateCharacterSize() {
			if (this.$textLayer.allowBoldFonts != this.$allowBoldFonts) {
				this.$allowBoldFonts = this.$textLayer.allowBoldFonts;
				this.setStyle("ace_nobold", !this.$allowBoldFonts);
			}
			this.layerConfig.characterWidth = this.characterWidth = this.$textLayer.getCharacterWidth();
			this.layerConfig.lineHeight = this.lineHeight = this.$textLayer.getLineHeight();
			this.$updatePrintMargin();
			dom.setStyle(this.scroller.style, "line-height", this.lineHeight + "px");
		}
		setSession(session) {
			if (this.session) this.session.doc.off("changeNewLineMode", this.onChangeNewLineMode);
			this.session = session;
			if (session && this.scrollMargin.top && session.getScrollTop() <= 0) session.setScrollTop(-this.scrollMargin.top);
			this.$cursorLayer.setSession(session);
			this.$markerBack.setSession(session);
			this.$markerFront.setSession(session);
			this.$gutterLayer.setSession(session);
			this.$textLayer.setSession(session);
			if (!session) return;
			this.$loop.schedule(this.CHANGE_FULL);
			this.session.$setFontMetrics(this.$fontMetrics);
			this.scrollBarH.scrollLeft = this.scrollBarV.scrollTop = null;
			this.onChangeNewLineMode = this.onChangeNewLineMode.bind(this);
			this.onChangeNewLineMode();
			this.session.doc.on("changeNewLineMode", this.onChangeNewLineMode);
		}
		updateLines(firstRow, lastRow, force) {
			if (lastRow === void 0) lastRow = Infinity;
			if (!this.$changedLines) this.$changedLines = {
				firstRow,
				lastRow
			};
			else {
				if (this.$changedLines.firstRow > firstRow) this.$changedLines.firstRow = firstRow;
				if (this.$changedLines.lastRow < lastRow) this.$changedLines.lastRow = lastRow;
			}
			if (this.$changedLines.lastRow < this.layerConfig.firstRow) if (force) this.$changedLines.lastRow = this.layerConfig.lastRow;
			else return;
			if (this.$changedLines.firstRow > this.layerConfig.lastRow) return;
			this.$loop.schedule(this.CHANGE_LINES);
		}
		onChangeNewLineMode() {
			this.$loop.schedule(this.CHANGE_TEXT);
			this.$textLayer.$updateEolChar();
			this.session.$bidiHandler.setEolChar(this.$textLayer.EOL_CHAR);
		}
		onChangeTabSize() {
			this.$loop.schedule(this.CHANGE_TEXT | this.CHANGE_MARKER);
			this.$textLayer.onChangeTabSize();
		}
		updateText() {
			this.$loop.schedule(this.CHANGE_TEXT);
		}
		updateFull(force) {
			if (force) this.$renderChanges(this.CHANGE_FULL, true);
			else this.$loop.schedule(this.CHANGE_FULL);
		}
		updateFontSize() {
			this.$textLayer.checkForSizeChanges();
		}
		$updateSizeAsync() {
			if (this.$loop.pending) this.$size.$dirty = true;
			else this.onResize();
		}
		onResize(force, gutterWidth, width, height) {
			if (this.resizing > 2) return;
			else if (this.resizing > 0) this.resizing++;
			else this.resizing = force ? 1 : 0;
			var el = this.container;
			if (!height) height = el.clientHeight || el.scrollHeight;
			if (!height && this.$maxLines && this.lineHeight > 1) {
				if (!el.style.height || el.style.height == "0px") {
					el.style.height = "1px";
					height = el.clientHeight || el.scrollHeight;
				}
			}
			if (!width) width = el.clientWidth || el.scrollWidth;
			var changes = this.$updateCachedSize(force, gutterWidth, width, height);
			if (this.$resizeTimer) this.$resizeTimer.cancel();
			if (!this.$size.scrollerHeight || !width && !height) return this.resizing = 0;
			if (force) this.$gutterLayer.$padding = null;
			if (force) this.$renderChanges(changes | this.$changes, true);
			else this.$loop.schedule(changes | this.$changes);
			if (this.resizing) this.resizing = 0;
			this.scrollBarH.scrollLeft = this.scrollBarV.scrollTop = null;
			if (this.$customScrollbar) this.$updateCustomScrollbar(true);
		}
		$updateCachedSize(force, gutterWidth, width, height) {
			height -= this.$extraHeight || 0;
			var changes = 0;
			var size = this.$size;
			var oldSize = {
				width: size.width,
				height: size.height,
				scrollerHeight: size.scrollerHeight,
				scrollerWidth: size.scrollerWidth
			};
			if (height && (force || size.height != height)) {
				size.height = height;
				changes |= this.CHANGE_SIZE;
				size.scrollerHeight = size.height;
				if (this.$horizScroll) size.scrollerHeight -= this.scrollBarH.getHeight();
				this.scrollBarV.setHeight(size.scrollerHeight);
				this.scrollBarV.element.style.bottom = this.scrollBarH.getHeight() + "px";
				changes = changes | this.CHANGE_SCROLL;
			}
			if (width && (force || size.width != width)) {
				changes |= this.CHANGE_SIZE;
				size.width = width;
				if (gutterWidth == null) gutterWidth = this.$showGutter ? this.$gutter.offsetWidth : 0;
				this.gutterWidth = gutterWidth;
				dom.setStyle(this.scrollBarH.element.style, "left", gutterWidth + "px");
				dom.setStyle(this.scroller.style, "left", gutterWidth + this.margin.left + "px");
				size.scrollerWidth = Math.max(0, width - gutterWidth - this.scrollBarV.getWidth() - this.margin.h);
				dom.setStyle(this.$gutter.style, "left", this.margin.left + "px");
				var right = this.scrollBarV.getWidth() + "px";
				dom.setStyle(this.scrollBarH.element.style, "right", right);
				dom.setStyle(this.scroller.style, "right", right);
				dom.setStyle(this.scroller.style, "bottom", this.scrollBarH.getHeight());
				this.scrollBarH.setWidth(size.scrollerWidth);
				if (this.session && this.session.getUseWrapMode() && this.adjustWrapLimit() || force) changes |= this.CHANGE_FULL;
			}
			size.$dirty = !width || !height;
			if (changes) this._signal("resize", oldSize);
			return changes;
		}
		onGutterResize(width) {
			var gutterWidth = this.$showGutter ? width : 0;
			if (gutterWidth != this.gutterWidth) this.$changes |= this.$updateCachedSize(true, gutterWidth, this.$size.width, this.$size.height);
			if (this.session.getUseWrapMode() && this.adjustWrapLimit()) this.$loop.schedule(this.CHANGE_FULL);
			else if (this.$size.$dirty) this.$loop.schedule(this.CHANGE_FULL);
			else this.$computeLayerConfig();
		}
		adjustWrapLimit() {
			var availableWidth = this.$size.scrollerWidth - this.$padding * 2;
			var limit = Math.floor(availableWidth / this.characterWidth);
			return this.session.adjustWrapLimit(limit, this.$showPrintMargin && this.$printMarginColumn);
		}
		setAnimatedScroll(shouldAnimate) {
			this.setOption("animatedScroll", shouldAnimate);
		}
		getAnimatedScroll() {
			return this.$animatedScroll;
		}
		setShowInvisibles(showInvisibles) {
			this.setOption("showInvisibles", showInvisibles);
			this.session.$bidiHandler.setShowInvisibles(showInvisibles);
		}
		getShowInvisibles() {
			return this.getOption("showInvisibles");
		}
		getDisplayIndentGuides() {
			return this.getOption("displayIndentGuides");
		}
		setDisplayIndentGuides(display) {
			this.setOption("displayIndentGuides", display);
		}
		getHighlightIndentGuides() {
			return this.getOption("highlightIndentGuides");
		}
		setHighlightIndentGuides(highlight) {
			this.setOption("highlightIndentGuides", highlight);
		}
		setShowPrintMargin(showPrintMargin) {
			this.setOption("showPrintMargin", showPrintMargin);
		}
		getShowPrintMargin() {
			return this.getOption("showPrintMargin");
		}
		setPrintMarginColumn(printMarginColumn) {
			this.setOption("printMarginColumn", printMarginColumn);
		}
		getPrintMarginColumn() {
			return this.getOption("printMarginColumn");
		}
		getShowGutter() {
			return this.getOption("showGutter");
		}
		setShowGutter(show) {
			return this.setOption("showGutter", show);
		}
		getFadeFoldWidgets() {
			return this.getOption("fadeFoldWidgets");
		}
		setFadeFoldWidgets(show) {
			this.setOption("fadeFoldWidgets", show);
		}
		setHighlightGutterLine(shouldHighlight) {
			this.setOption("highlightGutterLine", shouldHighlight);
		}
		getHighlightGutterLine() {
			return this.getOption("highlightGutterLine");
		}
		$updatePrintMargin() {
			if (!this.$showPrintMargin && !this.$printMarginEl) return;
			if (!this.$printMarginEl) {
				var containerEl = dom.createElement("div");
				containerEl.className = "ace_layer ace_print-margin-layer";
				this.$printMarginEl = dom.createElement("div");
				this.$printMarginEl.className = "ace_print-margin";
				containerEl.appendChild(this.$printMarginEl);
				this.content.insertBefore(containerEl, this.content.firstChild);
			}
			var style = this.$printMarginEl.style;
			style.left = Math.round(this.characterWidth * this.$printMarginColumn + this.$padding) + "px";
			style.visibility = this.$showPrintMargin ? "visible" : "hidden";
			if (this.session && this.session.$wrap == -1) this.adjustWrapLimit();
		}
		getContainerElement() {
			return this.container;
		}
		getMouseEventTarget() {
			return this.scroller;
		}
		getTextAreaContainer() {
			return this.container;
		}
		$moveTextAreaToCursor() {
			if (this.$isMousePressed) return;
			var style = this.textarea.style;
			var composition = this.$composition;
			if (!this.$keepTextAreaAtCursor && !composition) {
				dom.translate(this.textarea, -100, 0);
				return;
			}
			var pixelPos = this.$cursorLayer.$pixelPos;
			if (!pixelPos) return;
			if (composition && composition.markerRange) pixelPos = this.$cursorLayer.getPixelPosition(composition.markerRange.start, true);
			var config$1 = this.layerConfig;
			var posTop = pixelPos.top;
			var posLeft = pixelPos.left;
			posTop -= config$1.offset;
			var h = composition && composition.useTextareaForIME || useragent.isMobile ? this.lineHeight : 1;
			if (posTop < 0 || posTop > config$1.height - h) {
				dom.translate(this.textarea, 0, 0);
				return;
			}
			var w = 1;
			var maxTop = this.$size.height - h;
			if (!composition) posTop += this.lineHeight;
			else if (composition.useTextareaForIME) {
				var val = this.textarea.value;
				w = this.characterWidth * this.session.$getStringScreenWidth(val)[0];
			} else posTop += this.lineHeight + 2;
			posLeft -= this.scrollLeft;
			if (posLeft > this.$size.scrollerWidth - w) posLeft = this.$size.scrollerWidth - w;
			posLeft += this.gutterWidth + this.margin.left;
			dom.setStyle(style, "height", h + "px");
			dom.setStyle(style, "width", w + "px");
			dom.translate(this.textarea, Math.min(posLeft, this.$size.scrollerWidth - w), Math.min(posTop, maxTop));
		}
		getFirstVisibleRow() {
			return this.layerConfig.firstRow;
		}
		getFirstFullyVisibleRow() {
			return this.layerConfig.firstRow + (this.layerConfig.offset === 0 ? 0 : 1);
		}
		getLastFullyVisibleRow() {
			var config$1 = this.layerConfig;
			var lastRow = config$1.lastRow;
			if (this.session.documentToScreenRow(lastRow, 0) * config$1.lineHeight - this.session.getScrollTop() > config$1.height - config$1.lineHeight) return lastRow - 1;
			return lastRow;
		}
		getLastVisibleRow() {
			return this.layerConfig.lastRow;
		}
		setPadding(padding) {
			this.$padding = padding;
			this.$textLayer.setPadding(padding);
			this.$cursorLayer.setPadding(padding);
			this.$markerFront.setPadding(padding);
			this.$markerBack.setPadding(padding);
			this.$loop.schedule(this.CHANGE_FULL);
			this.$updatePrintMargin();
		}
		setScrollMargin(top, bottom, left, right) {
			var sm = this.scrollMargin;
			sm.top = top | 0;
			sm.bottom = bottom | 0;
			sm.right = right | 0;
			sm.left = left | 0;
			sm.v = sm.top + sm.bottom;
			sm.h = sm.left + sm.right;
			if (sm.top && this.scrollTop <= 0 && this.session) this.session.setScrollTop(-sm.top);
			this.updateFull();
		}
		setMargin(top, bottom, left, right) {
			var sm = this.margin;
			sm.top = top | 0;
			sm.bottom = bottom | 0;
			sm.right = right | 0;
			sm.left = left | 0;
			sm.v = sm.top + sm.bottom;
			sm.h = sm.left + sm.right;
			this.$updateCachedSize(true, this.gutterWidth, this.$size.width, this.$size.height);
			this.updateFull();
		}
		getHScrollBarAlwaysVisible() {
			return this.$hScrollBarAlwaysVisible;
		}
		setHScrollBarAlwaysVisible(alwaysVisible) {
			this.setOption("hScrollBarAlwaysVisible", alwaysVisible);
		}
		getVScrollBarAlwaysVisible() {
			return this.$vScrollBarAlwaysVisible;
		}
		setVScrollBarAlwaysVisible(alwaysVisible) {
			this.setOption("vScrollBarAlwaysVisible", alwaysVisible);
		}
		$updateScrollBarV() {
			var scrollHeight = this.layerConfig.maxHeight;
			var scrollerHeight = this.$size.scrollerHeight;
			if (!this.$maxLines && this.$scrollPastEnd) {
				scrollHeight -= (scrollerHeight - this.lineHeight) * this.$scrollPastEnd;
				if (this.scrollTop > scrollHeight - scrollerHeight) {
					scrollHeight = this.scrollTop + scrollerHeight;
					this.scrollBarV.scrollTop = null;
				}
			}
			this.scrollBarV.setScrollHeight(scrollHeight + this.scrollMargin.v);
			this.scrollBarV.setScrollTop(this.scrollTop + this.scrollMargin.top);
		}
		$updateScrollBarH() {
			this.scrollBarH.setScrollWidth(this.layerConfig.width + 2 * this.$padding + this.scrollMargin.h);
			this.scrollBarH.setScrollLeft(this.scrollLeft + this.scrollMargin.left);
		}
		freeze() {
			this.$frozen = true;
		}
		unfreeze() {
			this.$frozen = false;
		}
		$renderChanges(changes, force) {
			if (this.$changes) {
				changes |= this.$changes;
				this.$changes = 0;
			}
			if (!this.session || !this.container.offsetWidth || this.$frozen || !changes && !force) {
				this.$changes |= changes;
				return;
			}
			if (this.$size.$dirty) {
				this.$changes |= changes;
				return this.onResize(true);
			}
			if (!this.lineHeight) this.$textLayer.checkForSizeChanges();
			this._signal("beforeRender", changes);
			if (this.session && this.session.$bidiHandler) this.session.$bidiHandler.updateCharacterWidths(this.$fontMetrics);
			var config$1 = this.layerConfig;
			if (changes & this.CHANGE_FULL || changes & this.CHANGE_SIZE || changes & this.CHANGE_TEXT || changes & this.CHANGE_LINES || changes & this.CHANGE_SCROLL || changes & this.CHANGE_H_SCROLL) {
				changes |= this.$computeLayerConfig() | this.$loop.clear();
				if (config$1.firstRow != this.layerConfig.firstRow && config$1.firstRowScreen == this.layerConfig.firstRowScreen) {
					var st = this.scrollTop + (config$1.firstRow - Math.max(this.layerConfig.firstRow, 0)) * this.lineHeight;
					if (st > 0) {
						this.scrollTop = st;
						changes = changes | this.CHANGE_SCROLL;
						changes |= this.$computeLayerConfig() | this.$loop.clear();
					}
				}
				config$1 = this.layerConfig;
				this.$updateScrollBarV();
				if (changes & this.CHANGE_H_SCROLL) this.$updateScrollBarH();
				dom.translate(this.content, -this.scrollLeft, -config$1.offset);
				var width = config$1.width + 2 * this.$padding + "px";
				var height = config$1.minHeight + "px";
				dom.setStyle(this.content.style, "width", width);
				dom.setStyle(this.content.style, "height", height);
			}
			if (changes & this.CHANGE_H_SCROLL) {
				dom.translate(this.content, -this.scrollLeft, -config$1.offset);
				this.scroller.className = this.scrollLeft <= 0 ? "ace_scroller " : "ace_scroller ace_scroll-left ";
				if (this.enableKeyboardAccessibility) this.scroller.className += this.keyboardFocusClassName;
			}
			if (changes & this.CHANGE_FULL) {
				this.$changedLines = null;
				this.$textLayer.update(config$1);
				if (this.$showGutter) this.$gutterLayer.update(config$1);
				if (this.$customScrollbar) this.$scrollDecorator.$updateDecorators(config$1);
				this.$markerBack.update(config$1);
				this.$markerFront.update(config$1);
				this.$cursorLayer.update(config$1);
				this.$moveTextAreaToCursor();
				this._signal("afterRender", changes);
				return;
			}
			if (changes & this.CHANGE_SCROLL) {
				this.$changedLines = null;
				if (changes & this.CHANGE_TEXT || changes & this.CHANGE_LINES) this.$textLayer.update(config$1);
				else this.$textLayer.scrollLines(config$1);
				if (this.$showGutter) if (changes & this.CHANGE_GUTTER || changes & this.CHANGE_LINES) this.$gutterLayer.update(config$1);
				else this.$gutterLayer.scrollLines(config$1);
				if (this.$customScrollbar) this.$scrollDecorator.$updateDecorators(config$1);
				this.$markerBack.update(config$1);
				this.$markerFront.update(config$1);
				this.$cursorLayer.update(config$1);
				this.$moveTextAreaToCursor();
				this._signal("afterRender", changes);
				return;
			}
			if (changes & this.CHANGE_TEXT) {
				this.$changedLines = null;
				this.$textLayer.update(config$1);
				if (this.$showGutter) this.$gutterLayer.update(config$1);
				if (this.$customScrollbar) this.$scrollDecorator.$updateDecorators(config$1);
			} else if (changes & this.CHANGE_LINES) {
				if (this.$updateLines() || changes & this.CHANGE_GUTTER && this.$showGutter) this.$gutterLayer.update(config$1);
				if (this.$customScrollbar) this.$scrollDecorator.$updateDecorators(config$1);
			} else if (changes & this.CHANGE_TEXT || changes & this.CHANGE_GUTTER) {
				if (this.$showGutter) this.$gutterLayer.update(config$1);
				if (this.$customScrollbar) this.$scrollDecorator.$updateDecorators(config$1);
			} else if (changes & this.CHANGE_CURSOR) {
				if (this.$highlightGutterLine) this.$gutterLayer.updateLineHighlight(config$1);
				if (this.$customScrollbar) this.$scrollDecorator.$updateDecorators(config$1);
			}
			if (changes & this.CHANGE_CURSOR) {
				this.$cursorLayer.update(config$1);
				this.$moveTextAreaToCursor();
			}
			if (changes & (this.CHANGE_MARKER | this.CHANGE_MARKER_FRONT)) this.$markerFront.update(config$1);
			if (changes & (this.CHANGE_MARKER | this.CHANGE_MARKER_BACK)) this.$markerBack.update(config$1);
			this._signal("afterRender", changes);
		}
		$autosize() {
			var height = this.session.getScreenLength() * this.lineHeight;
			var maxHeight = this.$maxLines * this.lineHeight;
			var desiredHeight = Math.min(maxHeight, Math.max((this.$minLines || 1) * this.lineHeight, height)) + this.scrollMargin.v + (this.$extraHeight || 0);
			if (this.$horizScroll) desiredHeight += this.scrollBarH.getHeight();
			if (this.$maxPixelHeight && desiredHeight > this.$maxPixelHeight) desiredHeight = this.$maxPixelHeight;
			var vScroll = !(desiredHeight <= 2 * this.lineHeight) && height > maxHeight;
			if (desiredHeight != this.desiredHeight || this.$size.height != this.desiredHeight || vScroll != this.$vScroll) {
				if (vScroll != this.$vScroll) {
					this.$vScroll = vScroll;
					this.scrollBarV.setVisible(vScroll);
				}
				var w = this.container.clientWidth;
				this.container.style.height = desiredHeight + "px";
				this.$updateCachedSize(true, this.$gutterWidth, w, desiredHeight);
				this.desiredHeight = desiredHeight;
				this._signal("autosize");
			}
		}
		$computeLayerConfig() {
			var session = this.session;
			var size = this.$size;
			var hideScrollbars = size.height <= 2 * this.lineHeight;
			var maxHeight = this.session.getScreenLength() * this.lineHeight;
			var longestLine = this.$getLongestLine();
			var horizScroll = !hideScrollbars && (this.$hScrollBarAlwaysVisible || size.scrollerWidth - longestLine - 2 * this.$padding < 0);
			var hScrollChanged = this.$horizScroll !== horizScroll;
			if (hScrollChanged) {
				this.$horizScroll = horizScroll;
				this.scrollBarH.setVisible(horizScroll);
			}
			var vScrollBefore = this.$vScroll;
			if (this.$maxLines && this.lineHeight > 1) {
				this.$autosize();
				hideScrollbars = size.height <= 2 * this.lineHeight;
			}
			var minHeight = size.scrollerHeight + this.lineHeight;
			var scrollPastEnd = !this.$maxLines && this.$scrollPastEnd ? (size.scrollerHeight - this.lineHeight) * this.$scrollPastEnd : 0;
			maxHeight += scrollPastEnd;
			var sm = this.scrollMargin;
			this.session.setScrollTop(Math.max(-sm.top, Math.min(this.scrollTop, maxHeight - size.scrollerHeight + sm.bottom)));
			this.session.setScrollLeft(Math.max(-sm.left, Math.min(this.scrollLeft, longestLine + 2 * this.$padding - size.scrollerWidth + sm.right)));
			var vScroll = !hideScrollbars && (this.$vScrollBarAlwaysVisible || size.scrollerHeight - maxHeight + scrollPastEnd < 0 || this.scrollTop > sm.top);
			var vScrollChanged = vScrollBefore !== vScroll;
			if (vScrollChanged) {
				this.$vScroll = vScroll;
				this.scrollBarV.setVisible(vScroll);
			}
			var offset = this.scrollTop % this.lineHeight;
			var lineCount = Math.ceil(minHeight / this.lineHeight) - 1;
			var firstRow = Math.max(0, Math.round((this.scrollTop - offset) / this.lineHeight));
			var lastRow = firstRow + lineCount;
			var firstRowScreen, firstRowHeight;
			var lineHeight = this.lineHeight;
			firstRow = session.screenToDocumentRow(firstRow, 0);
			var foldLine = session.getFoldLine(firstRow);
			if (foldLine) firstRow = foldLine.start.row;
			firstRowScreen = session.documentToScreenRow(firstRow, 0);
			firstRowHeight = session.getRowLength(firstRow) * lineHeight;
			lastRow = Math.min(session.screenToDocumentRow(lastRow, 0), session.getLength() - 1);
			minHeight = size.scrollerHeight + session.getRowLength(lastRow) * lineHeight + firstRowHeight;
			offset = this.scrollTop - firstRowScreen * lineHeight;
			if (offset < 0 && firstRowScreen > 0) {
				firstRowScreen = Math.max(0, firstRowScreen + Math.floor(offset / lineHeight));
				offset = this.scrollTop - firstRowScreen * lineHeight;
			}
			var changes = 0;
			if (this.layerConfig.width != longestLine || hScrollChanged) changes = this.CHANGE_H_SCROLL;
			if (hScrollChanged || vScrollChanged) {
				changes |= this.$updateCachedSize(true, this.gutterWidth, size.width, size.height);
				this._signal("scrollbarVisibilityChanged");
				if (vScrollChanged) longestLine = this.$getLongestLine();
			}
			this.layerConfig = {
				width: longestLine,
				padding: this.$padding,
				firstRow,
				firstRowScreen,
				lastRow,
				lineHeight,
				characterWidth: this.characterWidth,
				minHeight,
				maxHeight,
				offset,
				gutterOffset: lineHeight ? Math.max(0, Math.ceil((offset + size.height - size.scrollerHeight) / lineHeight)) : 0,
				height: this.$size.scrollerHeight
			};
			if (this.session.$bidiHandler) this.session.$bidiHandler.setContentWidth(longestLine - this.$padding);
			return changes;
		}
		$updateLines() {
			if (!this.$changedLines) return;
			var firstRow = this.$changedLines.firstRow;
			var lastRow = this.$changedLines.lastRow;
			this.$changedLines = null;
			var layerConfig = this.layerConfig;
			if (firstRow > layerConfig.lastRow + 1) return;
			if (lastRow < layerConfig.firstRow) return;
			if (lastRow === Infinity) {
				if (this.$showGutter) this.$gutterLayer.update(layerConfig);
				this.$textLayer.update(layerConfig);
				return;
			}
			this.$textLayer.updateLines(layerConfig, firstRow, lastRow);
			return true;
		}
		$getLongestLine() {
			var charCount = this.session.getScreenWidth();
			if (this.showInvisibles && !this.session.$useWrapMode) charCount += 1;
			if (this.$textLayer && charCount > this.$textLayer.MAX_LINE_LENGTH) charCount = this.$textLayer.MAX_LINE_LENGTH + 30;
			return Math.max(this.$size.scrollerWidth - 2 * this.$padding, Math.round(charCount * this.characterWidth));
		}
		updateFrontMarkers() {
			this.$markerFront.setMarkers(this.session.getMarkers(true));
			this.$loop.schedule(this.CHANGE_MARKER_FRONT);
		}
		updateBackMarkers() {
			this.$markerBack.setMarkers(this.session.getMarkers());
			this.$loop.schedule(this.CHANGE_MARKER_BACK);
		}
		addGutterDecoration(row, className) {
			this.$gutterLayer.addGutterDecoration(row, className);
		}
		removeGutterDecoration(row, className) {
			this.$gutterLayer.removeGutterDecoration(row, className);
		}
		updateBreakpoints(rows) {
			this._rows = rows;
			this.$loop.schedule(this.CHANGE_GUTTER);
		}
		setAnnotations(annotations) {
			this.$gutterLayer.setAnnotations(annotations);
			this.$loop.schedule(this.CHANGE_GUTTER);
		}
		updateCursor() {
			this.$loop.schedule(this.CHANGE_CURSOR);
		}
		hideCursor() {
			this.$cursorLayer.hideCursor();
		}
		showCursor() {
			this.$cursorLayer.showCursor();
		}
		scrollSelectionIntoView(anchor, lead, offset) {
			this.scrollCursorIntoView(anchor, offset);
			this.scrollCursorIntoView(lead, offset);
		}
		scrollCursorIntoView(cursor, offset, $viewMargin) {
			if (this.$size.scrollerHeight === 0) return;
			var pos = this.$cursorLayer.getPixelPosition(cursor);
			var newLeft = pos.left;
			var newTop = pos.top;
			var topMargin = $viewMargin && $viewMargin.top || 0;
			var bottomMargin = $viewMargin && $viewMargin.bottom || 0;
			if (this.$scrollAnimation) this.$stopAnimation = true;
			var currentTop = this.$scrollAnimation ? this.session.getScrollTop() : this.scrollTop;
			if (currentTop + topMargin > newTop) {
				if (offset && currentTop + topMargin > newTop + this.lineHeight) newTop -= offset * this.$size.scrollerHeight;
				if (newTop === 0) newTop = -this.scrollMargin.top;
				this.session.setScrollTop(newTop);
			} else if (currentTop + this.$size.scrollerHeight - bottomMargin < newTop + this.lineHeight) {
				if (offset && currentTop + this.$size.scrollerHeight - bottomMargin < newTop - this.lineHeight) newTop += offset * this.$size.scrollerHeight;
				this.session.setScrollTop(newTop + this.lineHeight + bottomMargin - this.$size.scrollerHeight);
			}
			var currentLeft = this.scrollLeft;
			var twoCharsWidth = 2 * this.layerConfig.characterWidth;
			if (newLeft - twoCharsWidth < currentLeft) {
				newLeft -= twoCharsWidth;
				if (newLeft < this.$padding + twoCharsWidth) newLeft = -this.scrollMargin.left;
				this.session.setScrollLeft(newLeft);
			} else {
				newLeft += twoCharsWidth;
				if (currentLeft + this.$size.scrollerWidth < newLeft + this.characterWidth) this.session.setScrollLeft(Math.round(newLeft + this.characterWidth - this.$size.scrollerWidth));
				else if (currentLeft <= this.$padding && newLeft - currentLeft < this.characterWidth) this.session.setScrollLeft(0);
			}
		}
		getScrollTop() {
			return this.session.getScrollTop();
		}
		getScrollLeft() {
			return this.session.getScrollLeft();
		}
		getScrollTopRow() {
			return this.scrollTop / this.lineHeight;
		}
		getScrollBottomRow() {
			return Math.max(0, Math.floor((this.scrollTop + this.$size.scrollerHeight) / this.lineHeight) - 1);
		}
		scrollToRow(row) {
			this.session.setScrollTop(row * this.lineHeight);
		}
		alignCursor(cursor, alignment) {
			if (typeof cursor == "number") cursor = {
				row: cursor,
				column: 0
			};
			var pos = this.$cursorLayer.getPixelPosition(cursor);
			var h = this.$size.scrollerHeight - this.lineHeight;
			var offset = pos.top - h * (alignment || 0);
			this.session.setScrollTop(offset);
			return offset;
		}
		$calcSteps(fromValue, toValue) {
			var i = 0;
			var l = this.STEPS;
			var steps = [];
			var func = function(t, x_min, dx) {
				return dx * (Math.pow(t - 1, 3) + 1) + x_min;
			};
			for (i = 0; i < l; ++i) steps.push(func(i / this.STEPS, fromValue, toValue - fromValue));
			return steps;
		}
		scrollToLine(line, center, animate, callback) {
			var offset = this.$cursorLayer.getPixelPosition({
				row: line,
				column: 0
			}).top;
			if (center) offset -= this.$size.scrollerHeight / 2;
			var initialScroll = this.scrollTop;
			this.session.setScrollTop(offset);
			if (animate !== false) this.animateScrolling(initialScroll, callback);
		}
		animateScrolling(fromValue, callback) {
			var toValue = this.scrollTop;
			if (!this.$animatedScroll) return;
			var _self = this;
			if (fromValue == toValue) return;
			if (this.$scrollAnimation) {
				var oldSteps = this.$scrollAnimation.steps;
				if (oldSteps.length) {
					fromValue = oldSteps[0];
					if (fromValue == toValue) return;
				}
			}
			var steps = _self.$calcSteps(fromValue, toValue);
			this.$scrollAnimation = {
				from: fromValue,
				to: toValue,
				steps
			};
			clearInterval(this.$timer);
			_self.session.setScrollTop(steps.shift());
			_self.session.$scrollTop = toValue;
			function endAnimation() {
				_self.$timer = clearInterval(_self.$timer);
				_self.$scrollAnimation = null;
				_self.$stopAnimation = false;
				callback && callback();
			}
			this.$timer = setInterval(function() {
				if (_self.$stopAnimation) {
					endAnimation();
					return;
				}
				if (!_self.session) return clearInterval(_self.$timer);
				if (steps.length) {
					_self.session.setScrollTop(steps.shift());
					_self.session.$scrollTop = toValue;
				} else if (toValue != null) {
					_self.session.$scrollTop = -1;
					_self.session.setScrollTop(toValue);
					toValue = null;
				} else endAnimation();
			}, 10);
		}
		scrollToY(scrollTop) {
			if (this.scrollTop !== scrollTop) {
				this.$loop.schedule(this.CHANGE_SCROLL);
				this.scrollTop = scrollTop;
			}
		}
		scrollToX(scrollLeft) {
			if (this.scrollLeft !== scrollLeft) this.scrollLeft = scrollLeft;
			this.$loop.schedule(this.CHANGE_H_SCROLL);
		}
		scrollTo(x, y) {
			this.session.setScrollTop(y);
			this.session.setScrollLeft(x);
		}
		scrollBy(deltaX, deltaY) {
			deltaY && this.session.setScrollTop(this.session.getScrollTop() + deltaY);
			deltaX && this.session.setScrollLeft(this.session.getScrollLeft() + deltaX);
		}
		isScrollableBy(deltaX, deltaY) {
			if (deltaY < 0 && this.session.getScrollTop() >= 1 - this.scrollMargin.top) return true;
			if (deltaY > 0 && this.session.getScrollTop() + this.$size.scrollerHeight - this.layerConfig.maxHeight < -1 + this.scrollMargin.bottom) return true;
			if (deltaX < 0 && this.session.getScrollLeft() >= 1 - this.scrollMargin.left) return true;
			if (deltaX > 0 && this.session.getScrollLeft() + this.$size.scrollerWidth - this.layerConfig.width < -1 + this.scrollMargin.right) return true;
		}
		pixelToScreenCoordinates(x, y) {
			var canvasPos;
			if (this.$hasCssTransforms) {
				canvasPos = {
					top: 0,
					left: 0
				};
				var p = this.$fontMetrics.transformCoordinates([x, y]);
				x = p[1] - this.gutterWidth - this.margin.left;
				y = p[0];
			} else canvasPos = this.scroller.getBoundingClientRect();
			var offsetX = x + this.scrollLeft - canvasPos.left - this.$padding;
			var offset = offsetX / this.characterWidth;
			var row = Math.floor((y + this.scrollTop - canvasPos.top) / this.lineHeight);
			var col = this.$blockCursor ? Math.floor(offset) : Math.round(offset);
			return {
				row,
				column: col,
				side: offset - col > 0 ? 1 : -1,
				offsetX
			};
		}
		screenToTextCoordinates(x, y) {
			var canvasPos;
			if (this.$hasCssTransforms) {
				canvasPos = {
					top: 0,
					left: 0
				};
				var p = this.$fontMetrics.transformCoordinates([x, y]);
				x = p[1] - this.gutterWidth - this.margin.left;
				y = p[0];
			} else canvasPos = this.scroller.getBoundingClientRect();
			var offsetX = x + this.scrollLeft - canvasPos.left - this.$padding;
			var offset = offsetX / this.characterWidth;
			var col = this.$blockCursor ? Math.floor(offset) : Math.round(offset);
			var row = Math.floor((y + this.scrollTop - canvasPos.top) / this.lineHeight);
			return this.session.screenToDocumentPosition(row, Math.max(col, 0), offsetX);
		}
		textToScreenCoordinates(row, column) {
			var canvasPos = this.scroller.getBoundingClientRect();
			var pos = this.session.documentToScreenPosition(row, column);
			var x = this.$padding + (this.session.$bidiHandler.isBidiRow(pos.row, row) ? this.session.$bidiHandler.getPosLeft(pos.column) : Math.round(pos.column * this.characterWidth));
			var y = pos.row * this.lineHeight;
			return {
				pageX: canvasPos.left + x - this.scrollLeft,
				pageY: canvasPos.top + y - this.scrollTop
			};
		}
		visualizeFocus() {
			dom.addCssClass(this.container, "ace_focus");
		}
		visualizeBlur() {
			dom.removeCssClass(this.container, "ace_focus");
		}
		showComposition(composition) {
			this.$composition = composition;
			if (!composition.cssText) composition.cssText = this.textarea.style.cssText;
			if (composition.useTextareaForIME == void 0) composition.useTextareaForIME = this.$useTextareaForIME;
			if (this.$useTextareaForIME) {
				dom.addCssClass(this.textarea, "ace_composition");
				this.textarea.style.cssText = "";
				this.$moveTextAreaToCursor();
				this.$cursorLayer.element.style.display = "none";
			} else composition.markerId = this.session.addMarker(composition.markerRange, "ace_composition_marker", "text");
		}
		setCompositionText(text) {
			var cursor = this.session.selection.cursor;
			this.addToken(text, "composition_placeholder", cursor.row, cursor.column);
			this.$moveTextAreaToCursor();
		}
		hideComposition() {
			if (!this.$composition) return;
			if (this.$composition.markerId) this.session.removeMarker(this.$composition.markerId);
			dom.removeCssClass(this.textarea, "ace_composition");
			this.textarea.style.cssText = this.$composition.cssText;
			var cursor = this.session.selection.cursor;
			this.removeExtraToken(cursor.row, cursor.column);
			this.$composition = null;
			this.$cursorLayer.element.style.display = "";
		}
		setGhostText(text, position) {
			var cursor = this.session.selection.cursor;
			var insertPosition = position || {
				row: cursor.row,
				column: cursor.column
			};
			this.removeGhostText();
			var textChunks = this.$calculateWrappedTextChunks(text, insertPosition);
			this.addToken(textChunks[0].text, "ghost_text", insertPosition.row, insertPosition.column);
			this.$ghostText = {
				text,
				position: {
					row: insertPosition.row,
					column: insertPosition.column
				}
			};
			var widgetDiv = dom.createElement("div");
			if (textChunks.length > 1) {
				var hiddenTokens = this.hideTokensAfterPosition(insertPosition.row, insertPosition.column);
				var lastLineDiv;
				textChunks.slice(1).forEach((el) => {
					var chunkDiv = dom.createElement("div");
					var chunkSpan = dom.createElement("span");
					chunkSpan.className = "ace_ghost_text";
					if (el.wrapped) chunkDiv.className = "ghost_text_line_wrapped";
					if (el.text.length === 0) el.text = " ";
					chunkSpan.appendChild(dom.createTextNode(el.text));
					chunkDiv.appendChild(chunkSpan);
					widgetDiv.appendChild(chunkDiv);
					lastLineDiv = chunkDiv;
				});
				hiddenTokens.forEach((token) => {
					var element = dom.createElement("span");
					if (!isTextToken(token.type)) element.className = "ace_" + token.type.replace(/\./g, " ace_");
					element.appendChild(dom.createTextNode(token.value));
					lastLineDiv.appendChild(element);
				});
				this.$ghostTextWidget = {
					el: widgetDiv,
					row: insertPosition.row,
					column: insertPosition.column,
					className: "ace_ghost_text_container"
				};
				this.session.widgetManager.addLineWidget(this.$ghostTextWidget);
				var pixelPosition = this.$cursorLayer.getPixelPosition(insertPosition, true);
				var height = this.container.getBoundingClientRect().height;
				var ghostTextHeight = textChunks.length * this.lineHeight;
				if (ghostTextHeight < height - pixelPosition.top) return;
				if (ghostTextHeight < height) this.scrollBy(0, (textChunks.length - 1) * this.lineHeight);
				else this.scrollToRow(insertPosition.row);
			}
		}
		$calculateWrappedTextChunks(text, position) {
			var availableWidth = this.$size.scrollerWidth - this.$padding * 2;
			var limit = Math.floor(availableWidth / this.characterWidth) - 2;
			limit = limit <= 0 ? 60 : limit;
			var textLines = text.split(/\r?\n/);
			var textChunks = [];
			for (var i = 0; i < textLines.length; i++) {
				var displayTokens = this.session.$getDisplayTokens(textLines[i], position.column);
				var wrapSplits = this.session.$computeWrapSplits(displayTokens, limit, this.session.$tabSize);
				if (wrapSplits.length > 0) {
					var start = 0;
					wrapSplits.push(textLines[i].length);
					for (var j = 0; j < wrapSplits.length; j++) {
						let textSlice = textLines[i].slice(start, wrapSplits[j]);
						textChunks.push({
							text: textSlice,
							wrapped: true
						});
						start = wrapSplits[j];
					}
				} else textChunks.push({
					text: textLines[i],
					wrapped: false
				});
			}
			return textChunks;
		}
		removeGhostText() {
			if (!this.$ghostText) return;
			var position = this.$ghostText.position;
			this.removeExtraToken(position.row, position.column);
			if (this.$ghostTextWidget) {
				this.session.widgetManager.removeLineWidget(this.$ghostTextWidget);
				this.$ghostTextWidget = null;
			}
			this.$ghostText = null;
		}
		addToken(text, type, row, column) {
			var session = this.session;
			session.bgTokenizer.lines[row] = null;
			var newToken = {
				type,
				value: text
			};
			var tokens = session.getTokens(row);
			if (column == null || !tokens.length) tokens.push(newToken);
			else {
				var l = 0;
				for (var i = 0; i < tokens.length; i++) {
					var token = tokens[i];
					l += token.value.length;
					if (column <= l) {
						var diff = token.value.length - (l - column);
						var before = token.value.slice(0, diff);
						var after = token.value.slice(diff);
						tokens.splice(i, 1, {
							type: token.type,
							value: before
						}, newToken, {
							type: token.type,
							value: after
						});
						break;
					}
				}
			}
			this.updateLines(row, row);
		}
		hideTokensAfterPosition(row, column) {
			var tokens = this.session.getTokens(row);
			var l = 0;
			var hasPassedCursor = false;
			var hiddenTokens = [];
			for (var i = 0; i < tokens.length; i++) {
				var token = tokens[i];
				l += token.value.length;
				if (token.type === "ghost_text") continue;
				if (hasPassedCursor) {
					hiddenTokens.push({
						type: token.type,
						value: token.value
					});
					token.type = "hidden_token";
					continue;
				}
				if (l === column) hasPassedCursor = true;
			}
			this.updateLines(row, row);
			return hiddenTokens;
		}
		removeExtraToken(row, column) {
			this.session.bgTokenizer.lines[row] = null;
			this.updateLines(row, row);
		}
		setTheme(theme, cb) {
			var _self = this;
			this.$themeId = theme;
			_self._dispatchEvent("themeChange", { theme });
			if (!theme || typeof theme == "string") {
				var moduleName = theme || this.$options.theme.initialValue;
				config.loadModule(["theme", moduleName], afterLoad);
			} else afterLoad(theme);
			function afterLoad(module$1) {
				if (_self.$themeId != theme) return cb && cb();
				if (!module$1 || !module$1.cssClass) throw new Error("couldn't load module " + theme + " or it didn't call define");
				if (module$1.$id) _self.$themeId = module$1.$id;
				dom.importCssString(module$1.cssText, module$1.cssClass, _self.container);
				if (_self.theme) dom.removeCssClass(_self.container, _self.theme.cssClass);
				var padding = "padding" in module$1 ? module$1.padding : "padding" in (_self.theme || {}) ? 4 : _self.$padding;
				if (_self.$padding && padding != _self.$padding) _self.setPadding(padding);
				if (_self.$gutterLayer) {
					var showGutterCursor = module$1["$showGutterCursorMarker"];
					if (showGutterCursor && !_self.$gutterLayer.$showCursorMarker) _self.$gutterLayer.$showCursorMarker = "theme";
					else if (!showGutterCursor && _self.$gutterLayer.$showCursorMarker == "theme") _self.$gutterLayer.$showCursorMarker = null;
				}
				_self.$theme = module$1.cssClass;
				_self.theme = module$1;
				dom.addCssClass(_self.container, module$1.cssClass);
				dom.setCssClass(_self.container, "ace_dark", module$1.isDark);
				if (_self.$size) {
					_self.$size.width = 0;
					_self.$updateSizeAsync();
				}
				_self._dispatchEvent("themeLoaded", { theme: module$1 });
				cb && cb();
				if (useragent.isSafari && _self.scroller) {
					_self.scroller.style.background = "red";
					_self.scroller.style.background = "";
				}
			}
		}
		getTheme() {
			return this.$themeId;
		}
		setStyle(style, include) {
			dom.setCssClass(this.container, style, include !== false);
		}
		unsetStyle(style) {
			dom.removeCssClass(this.container, style);
		}
		setCursorStyle(style) {
			dom.setStyle(this.scroller.style, "cursor", style);
		}
		setMouseCursor(cursorStyle) {
			dom.setStyle(this.scroller.style, "cursor", cursorStyle);
		}
		attachToShadowRoot() {
			dom.importCssString(editorCss, "ace_editor.css", this.container);
		}
		destroy() {
			this.freeze();
			this.$fontMetrics.destroy();
			this.$cursorLayer.destroy();
			this.removeAllListeners();
			this.container.textContent = "";
			this.setOption("useResizeObserver", false);
		}
		$updateCustomScrollbar(val) {
			var _self = this;
			this.$horizScroll = this.$vScroll = null;
			this.scrollBarV.element.remove();
			this.scrollBarH.element.remove();
			if (val === true) {
				this.scrollBarV = new VScrollBarCustom(this.container, this);
				this.scrollBarH = new HScrollBarCustom(this.container, this);
				this.scrollBarV.setHeight(this.$size.scrollerHeight);
				this.scrollBarH.setWidth(this.$size.scrollerWidth);
				this.scrollBarV.addEventListener("scroll", function(e) {
					if (!_self.$scrollAnimation) _self.session.setScrollTop(e.data - _self.scrollMargin.top);
				});
				this.scrollBarH.addEventListener("scroll", function(e) {
					if (!_self.$scrollAnimation) _self.session.setScrollLeft(e.data - _self.scrollMargin.left);
				});
				if (!this.$scrollDecorator) {
					this.$scrollDecorator = new Decorator(this.scrollBarV, this);
					this.$scrollDecorator.$updateDecorators();
				} else {
					this.$scrollDecorator.setScrollBarV(this.scrollBarV);
					this.$scrollDecorator.$updateDecorators();
				}
			} else {
				this.scrollBarV = new VScrollBar(this.container, this);
				this.scrollBarH = new HScrollBar(this.container, this);
				this.scrollBarV.addEventListener("scroll", function(e) {
					if (!_self.$scrollAnimation) _self.session.setScrollTop(e.data - _self.scrollMargin.top);
				});
				this.scrollBarH.addEventListener("scroll", function(e) {
					if (!_self.$scrollAnimation) _self.session.setScrollLeft(e.data - _self.scrollMargin.left);
				});
			}
		}
		$addResizeObserver() {
			if (!window.ResizeObserver || this.$resizeObserver) return;
			var self = this;
			this.$resizeTimer = lang.delayedCall(function() {
				if (!self.destroyed) self.onResize();
			}, 50);
			this.$resizeObserver = new window.ResizeObserver(function(e) {
				var w = e[0].contentRect.width;
				var h = e[0].contentRect.height;
				if (Math.abs(self.$size.width - w) > 1 || Math.abs(self.$size.height - h) > 1) self.$resizeTimer.delay();
				else self.$resizeTimer.cancel();
			});
			this.$resizeObserver.observe(this.container);
		}
	};
	VirtualRenderer.prototype.CHANGE_CURSOR = 1;
	VirtualRenderer.prototype.CHANGE_MARKER = 2;
	VirtualRenderer.prototype.CHANGE_GUTTER = 4;
	VirtualRenderer.prototype.CHANGE_SCROLL = 8;
	VirtualRenderer.prototype.CHANGE_LINES = 16;
	VirtualRenderer.prototype.CHANGE_TEXT = 32;
	VirtualRenderer.prototype.CHANGE_SIZE = 64;
	VirtualRenderer.prototype.CHANGE_MARKER_BACK = 128;
	VirtualRenderer.prototype.CHANGE_MARKER_FRONT = 256;
	VirtualRenderer.prototype.CHANGE_FULL = 512;
	VirtualRenderer.prototype.CHANGE_H_SCROLL = 1024;
	VirtualRenderer.prototype.$changes = 0;
	VirtualRenderer.prototype.$padding = null;
	VirtualRenderer.prototype.$frozen = false;
	VirtualRenderer.prototype.STEPS = 8;
	oop.implement(VirtualRenderer.prototype, EventEmitter);
	config.defineOptions(VirtualRenderer.prototype, "renderer", {
		useResizeObserver: { set: function(value) {
			if (!value && this.$resizeObserver) {
				this.$resizeObserver.disconnect();
				this.$resizeTimer.cancel();
				this.$resizeTimer = this.$resizeObserver = null;
			} else if (value && !this.$resizeObserver) this.$addResizeObserver();
		} },
		animatedScroll: { initialValue: false },
		showInvisibles: {
			set: function(value) {
				if (this.$textLayer.setShowInvisibles(value)) this.$loop.schedule(this.CHANGE_TEXT);
			},
			initialValue: false
		},
		showPrintMargin: {
			set: function() {
				this.$updatePrintMargin();
			},
			initialValue: true
		},
		printMarginColumn: {
			set: function() {
				this.$updatePrintMargin();
			},
			initialValue: 80
		},
		printMargin: {
			set: function(val) {
				if (typeof val == "number") this.$printMarginColumn = val;
				this.$showPrintMargin = !!val;
				this.$updatePrintMargin();
			},
			get: function() {
				return this.$showPrintMargin && this.$printMarginColumn;
			}
		},
		showGutter: {
			set: function(show) {
				this.$gutter.style.display = show ? "block" : "none";
				this.$loop.schedule(this.CHANGE_FULL);
				this.onGutterResize();
			},
			initialValue: true
		},
		useSvgGutterIcons: {
			set: function(value) {
				this.$gutterLayer.$useSvgGutterIcons = value;
			},
			initialValue: false
		},
		showFoldedAnnotations: {
			set: function(value) {
				this.$gutterLayer.$showFoldedAnnotations = value;
			},
			initialValue: false
		},
		fadeFoldWidgets: {
			set: function(show) {
				dom.setCssClass(this.$gutter, "ace_fade-fold-widgets", show);
			},
			initialValue: false
		},
		showFoldWidgets: {
			set: function(show) {
				this.$gutterLayer.setShowFoldWidgets(show);
				this.$loop.schedule(this.CHANGE_GUTTER);
			},
			initialValue: true
		},
		displayIndentGuides: {
			set: function(show) {
				if (this.$textLayer.setDisplayIndentGuides(show)) this.$loop.schedule(this.CHANGE_TEXT);
			},
			initialValue: true
		},
		highlightIndentGuides: {
			set: function(show) {
				if (this.$textLayer.setHighlightIndentGuides(show) == true) this.$textLayer.$highlightIndentGuide();
				else this.$textLayer.$clearActiveIndentGuide(this.$textLayer.$lines.cells);
			},
			initialValue: true
		},
		highlightGutterLine: {
			set: function(shouldHighlight) {
				this.$gutterLayer.setHighlightGutterLine(shouldHighlight);
				this.$loop.schedule(this.CHANGE_GUTTER);
			},
			initialValue: true
		},
		hScrollBarAlwaysVisible: {
			set: function(val) {
				if (!this.$hScrollBarAlwaysVisible || !this.$horizScroll) this.$loop.schedule(this.CHANGE_SCROLL);
			},
			initialValue: false
		},
		vScrollBarAlwaysVisible: {
			set: function(val) {
				if (!this.$vScrollBarAlwaysVisible || !this.$vScroll) this.$loop.schedule(this.CHANGE_SCROLL);
			},
			initialValue: false
		},
		fontSize: {
			set: function(size) {
				if (typeof size == "number") size = size + "px";
				this.container.style.fontSize = size;
				this.updateFontSize();
			},
			initialValue: 12
		},
		fontFamily: { set: function(name) {
			this.container.style.fontFamily = name;
			this.updateFontSize();
		} },
		maxLines: { set: function(val) {
			this.updateFull();
		} },
		minLines: { set: function(val) {
			if (!(this.$minLines < 562949953421311)) this.$minLines = 0;
			this.updateFull();
		} },
		maxPixelHeight: {
			set: function(val) {
				this.updateFull();
			},
			initialValue: 0
		},
		scrollPastEnd: {
			set: function(val) {
				val = +val || 0;
				if (this.$scrollPastEnd == val) return;
				this.$scrollPastEnd = val;
				this.$loop.schedule(this.CHANGE_SCROLL);
			},
			initialValue: 0,
			handlesSet: true
		},
		fixedWidthGutter: { set: function(val) {
			this.$gutterLayer.$fixedWidth = !!val;
			this.$loop.schedule(this.CHANGE_GUTTER);
		} },
		customScrollbar: {
			set: function(val) {
				this.$updateCustomScrollbar(val);
			},
			initialValue: false
		},
		theme: {
			set: function(val) {
				this.setTheme(val);
			},
			get: function() {
				return this.$themeId || this.theme;
			},
			initialValue: "./theme/textmate",
			handlesSet: true
		},
		hasCssTransforms: {},
		useTextareaForIME: { initialValue: !useragent.isMobile && !useragent.isIE }
	});
	exports.VirtualRenderer = VirtualRenderer;
}));
export { require_decorators as n, require_virtual_renderer as t };
