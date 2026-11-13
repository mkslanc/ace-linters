import { t as __commonJSMin } from "./rolldown-runtime-DQp2zzRu.js";
import { t as require_oop } from "./oop-CAYBcRVL.js";
import { l as require_fold_mode } from "./utils-D25r59wl.js";
// node_modules/ace-code/src/mode/folding/pythonic.js
var require_pythonic = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var BaseFoldMode = require_fold_mode().FoldMode;
	var FoldMode = exports.FoldMode = function(markers) {
		this.foldingStartMarker = new RegExp("([\\[{])(?:\\s*)$|(" + markers + ")(?:\\s*)(?:#.*)?$");
	};
	oop.inherits(FoldMode, BaseFoldMode);
	(function() {
		this.getFoldWidgetRange = function(session, foldStyle, row) {
			var match = session.getLine(row).match(this.foldingStartMarker);
			if (match) {
				if (match[1]) return this.openingBracketBlock(session, match[1], row, match.index);
				if (match[2]) return this.indentationBlock(session, row, match.index + match[2].length);
				return this.indentationBlock(session, row);
			}
		};
	}).call(FoldMode.prototype);
}));
export { require_pythonic as t };
