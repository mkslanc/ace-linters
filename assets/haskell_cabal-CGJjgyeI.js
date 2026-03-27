import { t as __commonJSMin } from "./chunk-BLiWRsM1.js";
import "./useragent-Cm8O_vvb.js";
import "./dom-BmR1mTSl.js";
import { t as require_range } from "./range-D2fBS63W.js";
import { t as require_oop } from "./oop-D6rqnWBm.js";
import "./lang-B3gWVpaj.js";
import "./config-D-BhsSyn.js";
import "./event_emitter-DQJDHkGW.js";
import "./textmate-7M3qxGeS.js";
import "./tokenizer-BFeMc3TI.js";
import { a as require_text_highlight_rules, t as require_text } from "./text-x9TxHOMd.js";
import "./token_iterator-B0gzmLw-.js";
import { t as require_fold_mode } from "./fold_mode-DLWDk-fx.js";
//#region node_modules/ace-code/src/mode/haskell_cabal_highlight_rules.js
/**
* Haskell Cabal files highlighter (https://www.haskell.org/cabal/users-guide/developing-packages.html)
**/
var require_haskell_cabal_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var CabalHighlightRules = function() {
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
	oop.inherits(CabalHighlightRules, TextHighlightRules);
	exports.CabalHighlightRules = CabalHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/folding/haskell_cabal.js
var require_haskell_cabal$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var BaseFoldMode = require_fold_mode().FoldMode;
	var Range = require_range().Range;
	var FoldMode = exports.FoldMode = function() {};
	oop.inherits(FoldMode, BaseFoldMode);
	(function() {
		/**
		is the row a heading?
		*/
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
	}).call(FoldMode.prototype);
}));
//#endregion
//#region node_modules/ace-code/src/mode/haskell_cabal.js
/**
* Haskell Cabal files mode (https://www.haskell.org/cabal/users-guide/developing-packages.html)
**/
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
//#endregion
export default require_haskell_cabal();
