import { t as __commonJSMin } from "./chunk-Cu_MO8PN.js";
import "./useragent-BMYEMUd9.js";
import "./dom-DRNmwCmL.js";
import { t as require_range } from "./range-BakcZ9jR.js";
import { t as require_oop } from "./oop-DrExWoUW.js";
import "./lang-Chfjzp5y.js";
import "./config-7GJDZd_b.js";
import "./event_emitter-r-lZpQyf.js";
import "./textmate-CN2VrF7f.js";
import "./tokenizer-B5s1nUwH.js";
import { r as require_cstyle, t as require_text } from "./text-D8sm5DzM.js";
import { t as require_token_iterator } from "./token_iterator-BNxpI84f.js";
import { t as require_fold_mode } from "./fold_mode-D_StAfa6.js";
import { t as require_latex_highlight_rules } from "./latex_highlight_rules-CR1_QzlV.js";
//#region node_modules/ace-code/src/mode/folding/latex.js
var require_latex$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var BaseFoldMode = require_fold_mode().FoldMode;
	var Range = require_range().Range;
	var TokenIterator = require_token_iterator().TokenIterator;
	var keywordLevels = {
		"\\subparagraph": 1,
		"\\paragraph": 2,
		"\\subsubsubsection": 3,
		"\\subsubsection": 4,
		"\\subsection": 5,
		"\\section": 6,
		"\\chapter": 7,
		"\\part": 8,
		"\\begin": 9,
		"\\end": 10
	};
	var FoldMode = exports.FoldMode = function() {};
	oop.inherits(FoldMode, BaseFoldMode);
	(function() {
		this.foldingStartMarker = /^\s*\\(begin)|\s*\\(part|chapter|(?:sub)*(?:section|paragraph))\b|{\s*$/;
		this.foldingStopMarker = /^\s*\\(end)\b|^\s*}/;
		this.getFoldWidgetRange = function(session, foldStyle, row) {
			var line = session.doc.getLine(row);
			var match = this.foldingStartMarker.exec(line);
			if (match) {
				if (match[1]) return this.latexBlock(session, row, match[0].length - 1);
				if (match[2]) return this.latexSection(session, row, match[0].length - 1);
				return this.openingBracketBlock(session, "{", row, match.index);
			}
			var match = this.foldingStopMarker.exec(line);
			if (match) {
				if (match[1]) return this.latexBlock(session, row, match[0].length - 1);
				return this.closingBracketBlock(session, "}", row, match.index + match[0].length);
			}
		};
		this.latexBlock = function(session, row, column, returnRange) {
			var keywords = {
				"\\begin": 1,
				"\\end": -1
			};
			var stream = new TokenIterator(session, row, column);
			var token = stream.getCurrentToken();
			if (!token || !(token.type == "storage.type" || token.type == "constant.character.escape")) return;
			var dir = keywords[token.value];
			var getType = function() {
				var token = stream.stepForward();
				var type = token && token.type == "lparen" ? stream.stepForward().value : "";
				if (dir === -1) {
					stream.stepBackward();
					if (type) stream.stepBackward();
				}
				return type;
			};
			var stack = [getType()];
			var startColumn = dir === -1 ? stream.getCurrentTokenColumn() : session.getLine(row).length;
			var startRow = row;
			stream.step = dir === -1 ? stream.stepBackward : stream.stepForward;
			while (token = stream.step()) {
				if (!token || !(token.type == "storage.type" || token.type == "constant.character.escape")) continue;
				var level = keywords[token.value];
				if (!level) continue;
				var type = getType();
				if (level === dir) stack.unshift(type);
				else if (stack.shift() !== type || !stack.length) break;
			}
			if (stack.length) return;
			if (dir == 1) {
				stream.stepBackward();
				stream.stepBackward();
			}
			if (returnRange) return stream.getCurrentTokenRange();
			var row = stream.getCurrentTokenRow();
			if (dir === -1) return new Range(row, session.getLine(row).length, startRow, startColumn);
			else return new Range(startRow, startColumn, row, stream.getCurrentTokenColumn());
		};
		this.latexSection = function(session, row, column) {
			var stream = new TokenIterator(session, row, column);
			var token = stream.getCurrentToken();
			if (!token || token.type != "storage.type") return;
			var startLevel = keywordLevels[token.value] || 0;
			var stackDepth = 0;
			var endRow = row;
			while (token = stream.stepForward()) {
				if (token.type !== "storage.type") continue;
				var level = keywordLevels[token.value] || 0;
				if (level >= 9) {
					if (!stackDepth) endRow = stream.getCurrentTokenRow() - 1;
					stackDepth += level == 9 ? 1 : -1;
					if (stackDepth < 0) break;
				} else if (level >= startLevel) break;
			}
			if (!stackDepth) endRow = stream.getCurrentTokenRow() - 1;
			while (endRow > row && !/\S/.test(session.getLine(endRow))) endRow--;
			return new Range(row, session.getLine(row).length, endRow, session.getLine(endRow).length);
		};
	}).call(FoldMode.prototype);
}));
//#endregion
//#region node_modules/ace-code/src/mode/latex.js
var require_latex = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var LatexHighlightRules = require_latex_highlight_rules().LatexHighlightRules;
	var CstyleBehaviour = require_cstyle().CstyleBehaviour;
	var LatexFoldMode = require_latex$1().FoldMode;
	var Mode = function() {
		this.HighlightRules = LatexHighlightRules;
		this.foldingRules = new LatexFoldMode();
		this.$behaviour = new CstyleBehaviour({ braces: true });
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.type = "text";
		this.lineCommentStart = "%";
		this.$id = "ace/mode/latex";
		this.getMatching = function(session, row, column) {
			if (row == void 0) row = session.selection.lead;
			if (typeof row == "object") {
				column = row.column;
				row = row.row;
			}
			var startToken = session.getTokenAt(row, column);
			if (!startToken) return;
			if (startToken.value == "\\begin" || startToken.value == "\\end") return this.foldingRules.latexBlock(session, row, column, true);
		};
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
//#endregion
export default require_latex();
