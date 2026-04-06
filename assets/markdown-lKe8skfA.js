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
import "./token_iterator-BNxpI84f.js";
import { t as require_fold_mode } from "./fold_mode-D_StAfa6.js";
import "./cstyle-C7DhJywu.js";
import "./javascript_highlight_rules-DYonPjDQ.js";
import "./matching_brace_outdent-BSN6387q.js";
import "./xml-Dtr7aJAT.js";
import { t as require_javascript } from "./javascript-loi8Unzt.js";
import "./css_highlight_rules-WBsyWStl.js";
import "./css_completions-azoDzKVn.js";
import "./css-DZv-rZU-.js";
import { t as require_css } from "./css-CiLMIxp6.js";
import "./xml_highlight_rules-CDXGDPfE.js";
import "./html_highlight_rules-DnZSqR6j.js";
import "./mixed-BexatWzp.js";
import { t as require_html } from "./html-DDElvV2C.js";
import "./sh_highlight_rules-DUsqYDK2.js";
import { t as require_sh } from "./sh-Cg8iyyfJ.js";
import { t as require_markdown_highlight_rules } from "./markdown_highlight_rules-D5Pze0S2.js";
import { t as require_xml } from "./xml-BXrLfW-G.js";
//#region node_modules/ace-code/src/mode/folding/markdown.js
var require_markdown$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var BaseFoldMode = require_fold_mode().FoldMode;
	var Range = require_range().Range;
	var FoldMode = exports.FoldMode = function() {};
	oop.inherits(FoldMode, BaseFoldMode);
	(function() {
		this.foldingStartMarker = /^(?:[=-]+\s*$|#{1,6} |`{3})/;
		this.getFoldWidget = function(session, foldStyle, row) {
			var line = session.getLine(row);
			if (!this.foldingStartMarker.test(line)) return "";
			if (line[0] == "`") {
				if (session.bgTokenizer.getState(row) == "start") return "end";
				return "start";
			}
			return "start";
		};
		this.getFoldWidgetRange = function(session, foldStyle, row) {
			var line = session.getLine(row);
			var startColumn = line.length;
			var maxRow = session.getLength();
			var startRow = row;
			var endRow = row;
			if (!line.match(this.foldingStartMarker)) return;
			if (line[0] == "`") if (session.bgTokenizer.getState(row) !== "start") {
				while (++row < maxRow) {
					line = session.getLine(row);
					if (line[0] == "`" & line.substring(0, 3) == "```") break;
				}
				return new Range(startRow, startColumn, row, 0);
			} else {
				while (row-- > 0) {
					line = session.getLine(row);
					if (line[0] == "`" & line.substring(0, 3) == "```") break;
				}
				return new Range(row, line.length, startRow, 0);
			}
			var token;
			function isHeading(row) {
				token = session.getTokens(row)[0];
				return token && token.type.lastIndexOf(heading, 0) === 0;
			}
			var heading = "markup.heading";
			function getLevel() {
				var ch = token.value[0];
				if (ch == "=") return 6;
				if (ch == "-") return 5;
				return 7 - token.value.search(/[^#]|$/);
			}
			if (isHeading(row)) {
				var startHeadingLevel = getLevel();
				while (++row < maxRow) {
					if (!isHeading(row)) continue;
					if (getLevel() >= startHeadingLevel) break;
				}
				endRow = row - (!token || ["=", "-"].indexOf(token.value[0]) == -1 ? 1 : 2);
				if (endRow > startRow) while (endRow > startRow && /^\s*$/.test(session.getLine(endRow))) endRow--;
				if (endRow > startRow) {
					var endColumn = session.getLine(endRow).length;
					return new Range(startRow, startColumn, endRow, endColumn);
				}
			}
		};
	}).call(FoldMode.prototype);
}));
//#endregion
//#region node_modules/ace-code/src/mode/markdown.js
var require_markdown = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var CstyleBehaviour = require_cstyle().CstyleBehaviour;
	var TextMode = require_text().Mode;
	var MarkdownHighlightRules = require_markdown_highlight_rules().MarkdownHighlightRules;
	var MarkdownFoldMode = require_markdown$1().FoldMode;
	var Mode = function() {
		this.HighlightRules = MarkdownHighlightRules;
		this.createModeDelegates({
			javascript: require_javascript().Mode,
			html: require_html().Mode,
			bash: require_sh().Mode,
			sh: require_sh().Mode,
			xml: require_xml().Mode,
			css: require_css().Mode
		});
		this.foldingRules = new MarkdownFoldMode();
		this.$behaviour = new CstyleBehaviour({ braces: true });
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.type = "text";
		this.blockComment = {
			start: "<!--",
			end: "-->"
		};
		this.$quotes = {
			"\"": "\"",
			"`": "`"
		};
		this.getNextLineIndent = function(state, line, tab) {
			if (state == "listblock") {
				var match = /^(\s*)(?:([-+*])|(\d+)\.)(\s+)/.exec(line);
				if (!match) return "";
				var marker = match[2];
				if (!marker) marker = parseInt(match[3], 10) + 1 + ".";
				return match[1] + marker + match[4];
			} else return this.$getIndent(line);
		};
		this.$id = "ace/mode/markdown";
		this.snippetFileId = "ace/snippets/markdown";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
//#endregion
export default require_markdown();
export { require_markdown as t };
