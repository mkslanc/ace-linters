import { t as __commonJSMin } from "./chunk-iA-Slpst.js";
import "./useragent-BODERP_7.js";
import "./dom-BBjJ92-n.js";
import { t as require_range } from "./range-BUVqNbwc.js";
import { t as require_oop } from "./oop-DcdK5Mrs.js";
import "./lang-DcNOSqFo.js";
import "./config-DPm1ug3B.js";
import "./event_emitter-BGfSYA24.js";
import "./textmate-zFNmb5zU.js";
import "./tokenizer-C2b-GJMk.js";
import { a as require_text_highlight_rules, t as require_text } from "./text-B9A1mx6l.js";
import "./token_iterator-CbfYmntj.js";
import { t as require_fold_mode } from "./fold_mode-D1xG2KFM.js";
var require_haskell_cabal_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$2 = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var CabalHighlightRules$1 = function() {
		this.$rules = { "start": [
			{
				token: "comment",
				regex: "^\\s*--.*$"
			},
			{
				token: ["keyword"],
				regex: /^(\s*\w.*?)(:(?:\s+|$))/
			},
			{
				token: "constant.numeric",
				regex: /[\d_]+(?:(?:[\.\d_]*)?)/
			},
			{
				token: "constant.language.boolean",
				regex: "(?:true|false|TRUE|FALSE|True|False|yes|no)\\b"
			},
			{
				token: "markup.heading",
				regex: /^(\w.*)$/
			}
		] };
	};
	oop$2.inherits(CabalHighlightRules$1, TextHighlightRules);
	exports.CabalHighlightRules = CabalHighlightRules$1;
}));
var require_haskell_cabal$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var BaseFoldMode = require_fold_mode().FoldMode;
	var Range = require_range().Range;
	var FoldMode$1 = exports.FoldMode = function() {};
	oop$1.inherits(FoldMode$1, BaseFoldMode);
	(function() {
		this.isHeading = function(session, row) {
			var heading = "markup.heading";
			var token = session.getTokens(row)[0];
			return row == 0 || token && token.type.lastIndexOf(heading, 0) === 0;
		};
		this.getFoldWidget = function(session, foldStyle, row) {
			if (this.isHeading(session, row)) return "start";
			else if (foldStyle === "markbeginend" && !/^\s*$/.test(session.getLine(row))) {
				var maxRow = session.getLength();
				while (++row < maxRow) if (!/^\s*$/.test(session.getLine(row))) break;
				if (row == maxRow || this.isHeading(session, row)) return "end";
			}
			return "";
		};
		this.getFoldWidgetRange = function(session, foldStyle, row) {
			var line = session.getLine(row);
			var startColumn = line.length;
			var maxRow = session.getLength();
			var startRow = row;
			var endRow = row;
			if (this.isHeading(session, row)) {
				while (++row < maxRow) if (this.isHeading(session, row)) {
					row--;
					break;
				}
				endRow = row;
				if (endRow > startRow) while (endRow > startRow && /^\s*$/.test(session.getLine(endRow))) endRow--;
				if (endRow > startRow) {
					var endColumn = session.getLine(endRow).length;
					return new Range(startRow, startColumn, endRow, endColumn);
				}
			} else if (this.getFoldWidget(session, foldStyle, row) === "end") {
				var endRow = row;
				var endColumn = session.getLine(endRow).length;
				while (--row >= 0) if (this.isHeading(session, row)) break;
				var line = session.getLine(row);
				var startColumn = line.length;
				return new Range(row, startColumn, endRow, endColumn);
			}
		};
	}).call(FoldMode$1.prototype);
}));
var require_haskell_cabal = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var CabalHighlightRules = require_haskell_cabal_highlight_rules().CabalHighlightRules;
	var FoldMode = require_haskell_cabal$1().FoldMode;
	var Mode = function() {
		this.HighlightRules = CabalHighlightRules;
		this.foldingRules = new FoldMode();
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = "--";
		this.blockComment = null;
		this.$id = "ace/mode/haskell_cabal";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_haskell_cabal();
