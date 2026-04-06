import { t as __commonJSMin } from "./chunk-Cu_MO8PN.js";
import { t as require_range } from "./range-BakcZ9jR.js";
import { t as require_oop } from "./oop-DrExWoUW.js";
import { t as require_fold_mode } from "./fold_mode-D_StAfa6.js";
//#region node_modules/ace-code/src/mode/folding/ini.js
var require_ini = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var Range = require_range().Range;
	var BaseFoldMode = require_fold_mode().FoldMode;
	var FoldMode = exports.FoldMode = function() {};
	oop.inherits(FoldMode, BaseFoldMode);
	(function() {
		this.foldingStartMarker = /^\s*\[([^\])]*)]\s*(?:$|[;#])/;
		this.getFoldWidgetRange = function(session, foldStyle, row) {
			var re = this.foldingStartMarker;
			var line = session.getLine(row);
			var m = line.match(re);
			if (!m) return;
			var startName = m[1] + ".";
			var startColumn = line.length;
			var maxRow = session.getLength();
			var startRow = row;
			var endRow = row;
			while (++row < maxRow) {
				line = session.getLine(row);
				if (/^\s*$/.test(line)) continue;
				m = line.match(re);
				if (m && m[1].lastIndexOf(startName, 0) !== 0) break;
				endRow = row;
			}
			if (endRow > startRow) {
				var endColumn = session.getLine(endRow).length;
				return new Range(startRow, startColumn, endRow, endColumn);
			}
		};
	}).call(FoldMode.prototype);
}));
//#endregion
export { require_ini as t };
