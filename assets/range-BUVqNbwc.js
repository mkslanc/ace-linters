import { t as __commonJSMin } from "./chunk-iA-Slpst.js";
var require_range = /* @__PURE__ */ __commonJSMin(((exports) => {
	var Range = class Range {
		constructor(startRow, startColumn, endRow, endColumn) {
			this.start = {
				row: startRow,
				column: startColumn
			};
			this.end = {
				row: endRow,
				column: endColumn
			};
		}
		isEqual(range) {
			return this.start.row === range.start.row && this.end.row === range.end.row && this.start.column === range.start.column && this.end.column === range.end.column;
		}
		toString() {
			return "Range: [" + this.start.row + "/" + this.start.column + "] -> [" + this.end.row + "/" + this.end.column + "]";
		}
		contains(row, column) {
			return this.compare(row, column) == 0;
		}
		compareRange(range) {
			var cmp, end = range.end, start = range.start;
			cmp = this.compare(end.row, end.column);
			if (cmp == 1) {
				cmp = this.compare(start.row, start.column);
				if (cmp == 1) return 2;
				else if (cmp == 0) return 1;
				else return 0;
			} else if (cmp == -1) return -2;
			else {
				cmp = this.compare(start.row, start.column);
				if (cmp == -1) return -1;
				else if (cmp == 1) return 42;
				else return 0;
			}
		}
		comparePoint(p) {
			return this.compare(p.row, p.column);
		}
		containsRange(range) {
			return this.comparePoint(range.start) == 0 && this.comparePoint(range.end) == 0;
		}
		intersects(range) {
			var cmp = this.compareRange(range);
			return cmp == -1 || cmp == 0 || cmp == 1;
		}
		isEnd(row, column) {
			return this.end.row == row && this.end.column == column;
		}
		isStart(row, column) {
			return this.start.row == row && this.start.column == column;
		}
		setStart(row, column) {
			if (typeof row == "object") {
				this.start.column = row.column;
				this.start.row = row.row;
			} else {
				this.start.row = row;
				this.start.column = column;
			}
		}
		setEnd(row, column) {
			if (typeof row == "object") {
				this.end.column = row.column;
				this.end.row = row.row;
			} else {
				this.end.row = row;
				this.end.column = column;
			}
		}
		inside(row, column) {
			if (this.compare(row, column) == 0) if (this.isEnd(row, column) || this.isStart(row, column)) return false;
			else return true;
			return false;
		}
		insideStart(row, column) {
			if (this.compare(row, column) == 0) if (this.isEnd(row, column)) return false;
			else return true;
			return false;
		}
		insideEnd(row, column) {
			if (this.compare(row, column) == 0) if (this.isStart(row, column)) return false;
			else return true;
			return false;
		}
		compare(row, column) {
			if (!this.isMultiLine()) {
				if (row === this.start.row) return column < this.start.column ? -1 : column > this.end.column ? 1 : 0;
			}
			if (row < this.start.row) return -1;
			if (row > this.end.row) return 1;
			if (this.start.row === row) return column >= this.start.column ? 0 : -1;
			if (this.end.row === row) return column <= this.end.column ? 0 : 1;
			return 0;
		}
		compareStart(row, column) {
			if (this.start.row == row && this.start.column == column) return -1;
			else return this.compare(row, column);
		}
		compareEnd(row, column) {
			if (this.end.row == row && this.end.column == column) return 1;
			else return this.compare(row, column);
		}
		compareInside(row, column) {
			if (this.end.row == row && this.end.column == column) return 1;
			else if (this.start.row == row && this.start.column == column) return -1;
			else return this.compare(row, column);
		}
		clipRows(firstRow, lastRow) {
			if (this.end.row > lastRow) var end = {
				row: lastRow + 1,
				column: 0
			};
			else if (this.end.row < firstRow) var end = {
				row: firstRow,
				column: 0
			};
			if (this.start.row > lastRow) var start = {
				row: lastRow + 1,
				column: 0
			};
			else if (this.start.row < firstRow) var start = {
				row: firstRow,
				column: 0
			};
			return Range.fromPoints(start || this.start, end || this.end);
		}
		extend(row, column) {
			var cmp = this.compare(row, column);
			if (cmp == 0) return this;
			else if (cmp == -1) var start = {
				row,
				column
			};
			else var end = {
				row,
				column
			};
			return Range.fromPoints(start || this.start, end || this.end);
		}
		isEmpty() {
			return this.start.row === this.end.row && this.start.column === this.end.column;
		}
		isMultiLine() {
			return this.start.row !== this.end.row;
		}
		clone() {
			return Range.fromPoints(this.start, this.end);
		}
		collapseRows() {
			if (this.end.column == 0) return new Range(this.start.row, 0, Math.max(this.start.row, this.end.row - 1), 0);
			else return new Range(this.start.row, 0, this.end.row, 0);
		}
		toScreenRange(session) {
			var screenPosStart = session.documentToScreenPosition(this.start);
			var screenPosEnd = session.documentToScreenPosition(this.end);
			return new Range(screenPosStart.row, screenPosStart.column, screenPosEnd.row, screenPosEnd.column);
		}
		moveBy(row, column) {
			this.start.row += row;
			this.start.column += column;
			this.end.row += row;
			this.end.column += column;
		}
	};
	Range.fromPoints = function(start, end) {
		return new Range(start.row, start.column, end.row, end.column);
	};
	Range.comparePoints = function(p1, p2) {
		return p1.row - p2.row || p1.column - p2.column;
	};
	exports.Range = Range;
}));
export { require_range as t };
