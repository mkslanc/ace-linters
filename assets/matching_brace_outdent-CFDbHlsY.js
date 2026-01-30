import { t as __commonJSMin } from "./chunk-iA-Slpst.js";
import { t as require_range } from "./range-BUVqNbwc.js";
var require_matching_brace_outdent = /* @__PURE__ */ __commonJSMin(((exports) => {
	var Range = require_range().Range;
	var MatchingBraceOutdent = function() {};
	(function() {
		this.checkOutdent = function(line, input) {
			if (!/^\s+$/.test(line)) return false;
			return /^\s*\}/.test(input);
		};
		this.autoOutdent = function(doc, row) {
			var match = doc.getLine(row).match(/^(\s*\})/);
			if (!match) return 0;
			var column = match[1].length;
			var openBracePos = doc.findMatchingBracket({
				row,
				column
			});
			if (!openBracePos || openBracePos.row == row) return 0;
			var indent = this.$getIndent(doc.getLine(openBracePos.row));
			doc.replace(new Range(row, 0, row, column - 1), indent);
		};
		this.$getIndent = function(line) {
			return line.match(/^\s*/)[0];
		};
	}).call(MatchingBraceOutdent.prototype);
	exports.MatchingBraceOutdent = MatchingBraceOutdent;
}));
export { require_matching_brace_outdent as t };
