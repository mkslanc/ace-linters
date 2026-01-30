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
import { r as require_cstyle, t as require_text } from "./text-B9A1mx6l.js";
import "./token_iterator-CbfYmntj.js";
import { t as require_fold_mode } from "./fold_mode-D1xG2KFM.js";
import "./cstyle-D3R9cgNV.js";
import "./javascript_highlight_rules-DN609jMc.js";
import "./matching_brace_outdent-CFDbHlsY.js";
import "./xml--3d0d31h.js";
import { t as require_javascript } from "./javascript-CApcTAmC.js";
import "./css_highlight_rules-BLT2K-CI.js";
import "./css_completions-cTCh3tDP.js";
import "./css-RWozyC1g.js";
import { t as require_css } from "./css-BfgKoNmj.js";
import "./xml_highlight_rules-Dr0BgDyR.js";
import "./html_highlight_rules-DWUfr8VU.js";
import "./mixed-B6aEv4ic.js";
import { t as require_html } from "./html-nEATR_ID.js";
import "./sh_highlight_rules-ClwJ26O-.js";
import { t as require_sh } from "./sh-BM_uUBHQ.js";
import { t as require_markdown_highlight_rules } from "./markdown_highlight_rules-B3gJqP7-.js";
import { t as require_xml } from "./xml-CtBFQJt8.js";
var require_markdown$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var BaseFoldMode = require_fold_mode().FoldMode;
	var Range = require_range().Range;
	var FoldMode = exports.FoldMode = function() {};
	oop$1.inherits(FoldMode, BaseFoldMode);
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
			function isHeading(row$1) {
				token = session.getTokens(row$1)[0];
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
export default require_markdown();
export { require_markdown as t };
