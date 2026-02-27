import { t as __commonJSMin } from "./chunk-iA-Slpst.js";
import "./useragent-BODERP_7.js";
import "./dom-BBjJ92-n.js";
import "./range-BUVqNbwc.js";
import "./lang-DcNOSqFo.js";
import "./keys-B8CLTATX.js";
import "./event-BcX-N72I.js";
import { t as require_config } from "./config-DPm1ug3B.js";
import "./event_emitter-BGfSYA24.js";
import "./textmate-zFNmb5zU.js";
import { t as require_editor } from "./editor-BiOsjB7l.js";
import "./edit_session-CDHRvoey.js";
import "./tooltip-DAauyLxM.js";
import "./tokenizer-C2b-GJMk.js";
import "./text-B9A1mx6l.js";
import "./token_iterator-CbfYmntj.js";
import "./hash_handler-G_6vQiwI.js";
var require_elastic_tabstops_lite = /* @__PURE__ */ __commonJSMin(((exports) => {
	var ElasticTabstopsLite = class {
		constructor(editor) {
			this.$editor = editor;
			var self = this;
			var changedRows = [];
			var recordChanges = false;
			this.onAfterExec = function() {
				recordChanges = false;
				self.processRows(changedRows);
				changedRows = [];
			};
			this.onExec = function() {
				recordChanges = true;
			};
			this.onChange = function(delta) {
				if (recordChanges) {
					if (changedRows.indexOf(delta.start.row) == -1) changedRows.push(delta.start.row);
					if (delta.end.row != delta.start.row) changedRows.push(delta.end.row);
				}
			};
		}
		processRows(rows) {
			this.$inChange = true;
			var checkedRows = [];
			for (var r = 0, rowCount = rows.length; r < rowCount; r++) {
				var row = rows[r];
				if (checkedRows.indexOf(row) > -1) continue;
				var cellWidthObj = this.$findCellWidthsForBlock(row);
				var cellWidths = this.$setBlockCellWidthsToMax(cellWidthObj.cellWidths);
				var rowIndex = cellWidthObj.firstRow;
				for (var w = 0, l = cellWidths.length; w < l; w++) {
					var widths = cellWidths[w];
					checkedRows.push(rowIndex);
					this.$adjustRow(rowIndex, widths);
					rowIndex++;
				}
			}
			this.$inChange = false;
		}
		$findCellWidthsForBlock(row) {
			var cellWidths = [], widths;
			var rowIter = row;
			while (rowIter >= 0) {
				widths = this.$cellWidthsForRow(rowIter);
				if (widths.length == 0) break;
				cellWidths.unshift(widths);
				rowIter--;
			}
			var firstRow = rowIter + 1;
			rowIter = row;
			var numRows = this.$editor.session.getLength();
			while (rowIter < numRows - 1) {
				rowIter++;
				widths = this.$cellWidthsForRow(rowIter);
				if (widths.length == 0) break;
				cellWidths.push(widths);
			}
			return {
				cellWidths,
				firstRow
			};
		}
		$cellWidthsForRow(row) {
			var selectionColumns = this.$selectionColumnsForRow(row);
			var tabs = [-1].concat(this.$tabsForRow(row));
			var widths = tabs.map(function(el) {
				return 0;
			}).slice(1);
			var line = this.$editor.session.getLine(row);
			for (var i = 0, len = tabs.length - 1; i < len; i++) {
				var leftEdge = tabs[i] + 1;
				var rightEdge = tabs[i + 1];
				var rightmostSelection = this.$rightmostSelectionInCell(selectionColumns, rightEdge);
				var cell = line.substring(leftEdge, rightEdge);
				widths[i] = Math.max(cell.replace(/\s+$/g, "").length, rightmostSelection - leftEdge);
			}
			return widths;
		}
		$selectionColumnsForRow(row) {
			var selections = [], cursor = this.$editor.getCursorPosition();
			if (this.$editor.session.getSelection().isEmpty()) {
				if (row == cursor.row) selections.push(cursor.column);
			}
			return selections;
		}
		$setBlockCellWidthsToMax(cellWidths) {
			var startingNewBlock = true, blockStartRow, blockEndRow, maxWidth;
			var columnInfo = this.$izip_longest(cellWidths);
			for (var c = 0, l = columnInfo.length; c < l; c++) {
				var column = columnInfo[c];
				if (!column.push) {
					console.error(column);
					continue;
				}
				column.push(NaN);
				for (var r = 0, s = column.length; r < s; r++) {
					var width = column[r];
					if (startingNewBlock) {
						blockStartRow = r;
						maxWidth = 0;
						startingNewBlock = false;
					}
					if (isNaN(width)) {
						blockEndRow = r;
						for (var j = blockStartRow; j < blockEndRow; j++) cellWidths[j][c] = maxWidth;
						startingNewBlock = true;
					}
					maxWidth = Math.max(maxWidth, width);
				}
			}
			return cellWidths;
		}
		$rightmostSelectionInCell(selectionColumns, cellRightEdge) {
			var rightmost = 0;
			if (selectionColumns.length) {
				var lengths = [];
				for (var s = 0, length = selectionColumns.length; s < length; s++) if (selectionColumns[s] <= cellRightEdge) lengths.push(s);
				else lengths.push(0);
				rightmost = Math.max.apply(Math, lengths);
			}
			return rightmost;
		}
		$tabsForRow(row) {
			var rowTabs = [], line = this.$editor.session.getLine(row), re = /\t/g, match;
			while ((match = re.exec(line)) != null) rowTabs.push(match.index);
			return rowTabs;
		}
		$adjustRow(row, widths) {
			var rowTabs = this.$tabsForRow(row);
			if (rowTabs.length == 0) return;
			var bias = 0, location = -1;
			var expandedSet = this.$izip(widths, rowTabs);
			for (var i = 0, l = expandedSet.length; i < l; i++) {
				var w = expandedSet[i][0], it = expandedSet[i][1];
				location += 1 + w;
				it += bias;
				var difference = location - it;
				if (difference == 0) continue;
				var partialLine = this.$editor.session.getLine(row).substr(0, it);
				var strippedPartialLine = partialLine.replace(/\s*$/g, "");
				var ispaces = partialLine.length - strippedPartialLine.length;
				if (difference > 0) {
					this.$editor.session.getDocument().insertInLine({
						row,
						column: it + 1
					}, Array(difference + 1).join(" ") + "	");
					this.$editor.session.getDocument().removeInLine(row, it, it + 1);
					bias += difference;
				}
				if (difference < 0 && ispaces >= -difference) {
					this.$editor.session.getDocument().removeInLine(row, it + difference, it);
					bias += difference;
				}
			}
		}
		$izip_longest(iterables) {
			if (!iterables[0]) return [];
			var longest = iterables[0].length;
			var iterablesLength = iterables.length;
			for (var i = 1; i < iterablesLength; i++) {
				var iLength = iterables[i].length;
				if (iLength > longest) longest = iLength;
			}
			var expandedSet = [];
			for (var l = 0; l < longest; l++) {
				var set = [];
				for (var i = 0; i < iterablesLength; i++) if (iterables[i][l] === "") set.push(NaN);
				else set.push(iterables[i][l]);
				expandedSet.push(set);
			}
			return expandedSet;
		}
		$izip(widths, tabs) {
			var size = widths.length >= tabs.length ? tabs.length : widths.length;
			var expandedSet = [];
			for (var i = 0; i < size; i++) {
				var set = [widths[i], tabs[i]];
				expandedSet.push(set);
			}
			return expandedSet;
		}
	};
	exports.ElasticTabstopsLite = ElasticTabstopsLite;
	var Editor = require_editor().Editor;
	require_config().defineOptions(Editor.prototype, "editor", { useElasticTabstops: { set: function(val) {
		if (val) {
			if (!this.elasticTabstops) this.elasticTabstops = new ElasticTabstopsLite(this);
			this.commands.on("afterExec", this.elasticTabstops.onAfterExec);
			this.commands.on("exec", this.elasticTabstops.onExec);
			this.on("change", this.elasticTabstops.onChange);
		} else if (this.elasticTabstops) {
			this.commands.removeListener("afterExec", this.elasticTabstops.onAfterExec);
			this.commands.removeListener("exec", this.elasticTabstops.onExec);
			this.removeListener("change", this.elasticTabstops.onChange);
		}
	} } });
}));
export default require_elastic_tabstops_lite();
