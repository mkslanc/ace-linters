import { t as __commonJSMin } from "./modulepreload-polyfill-DxDZhch-.js";
import { t as require_range } from "./range-DJd8bsIh.js";
import { t as require_oop } from "./oop-3KT-lR14.js";
import { l as require_fold_mode } from "./utils-B-ki7ewn.js";
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
