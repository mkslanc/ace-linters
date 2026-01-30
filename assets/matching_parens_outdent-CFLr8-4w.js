import { t as __commonJSMin } from "./chunk-iA-Slpst.js";
import { t as require_range } from "./range-BUVqNbwc.js";
var require_matching_parens_outdent = /* @__PURE__ */ __commonJSMin(((exports) => {
	var Range = require_range().Range;
	var MatchingParensOutdent = function() {};
	(function() {
		this.checkOutdent = function(line, input) {
			if (!/^\s+$/.test(line)) return false;
			return /^\s*\)/.test(input);
		};
		this.autoOutdent = function(doc, row) {
			var match = doc.getLine(row).match(/^(\s*\))/);
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
			var match = line.match(/^(\s+)/);
			if (match) return match[1];
			return "";
		};
	}).call(MatchingParensOutdent.prototype);
	exports.MatchingParensOutdent = MatchingParensOutdent;
}));
export { require_matching_parens_outdent as t };
