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
import { t as require_text } from "./text-x9TxHOMd.js";
import "./token_iterator-B0gzmLw-.js";
import "./fold_mode-DLWDk-fx.js";
import { t as require_cstyle } from "./cstyle-DX2ORGlO.js";
import "./doc_comment_highlight_rules-Csht38Fi.js";
import { t as require_matching_brace_outdent } from "./matching_brace_outdent-BNxYFHLW.js";
import { t as require_csharp_highlight_rules } from "./csharp_highlight_rules-CblP2WDh.js";
//#region node_modules/ace-code/src/mode/folding/csharp.js
var require_csharp$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var Range = require_range().Range;
	var CFoldMode = require_cstyle().FoldMode;
	var FoldMode = exports.FoldMode = function(commentRegex) {
		if (commentRegex) {
			this.foldingStartMarker = new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/, "|" + commentRegex.start));
			this.foldingStopMarker = new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/, "|" + commentRegex.end));
		}
	};
	oop.inherits(FoldMode, CFoldMode);
	(function() {
		this.usingRe = /^\s*using \S/;
		this.getFoldWidgetRangeBase = this.getFoldWidgetRange;
		this.getFoldWidgetBase = this.getFoldWidget;
		this.getFoldWidget = function(session, foldStyle, row) {
			var fw = this.getFoldWidgetBase(session, foldStyle, row);
			if (!fw) {
				var line = session.getLine(row);
				if (/^\s*#region\b/.test(line)) return "start";
				var usingRe = this.usingRe;
				if (usingRe.test(line)) {
					var prev = session.getLine(row - 1);
					var next = session.getLine(row + 1);
					if (!usingRe.test(prev) && usingRe.test(next)) return "start";
				}
			}
			return fw;
		};
		this.getFoldWidgetRange = function(session, foldStyle, row) {
			var range = this.getFoldWidgetRangeBase(session, foldStyle, row);
			if (range) return range;
			var line = session.getLine(row);
			if (this.usingRe.test(line)) return this.getUsingStatementBlock(session, line, row);
			if (/^\s*#region\b/.test(line)) return this.getRegionBlock(session, line, row);
		};
		this.getUsingStatementBlock = function(session, line, row) {
			var startColumn = line.match(this.usingRe)[0].length - 1;
			var maxRow = session.getLength();
			var startRow = row;
			var endRow = row;
			while (++row < maxRow) {
				line = session.getLine(row);
				if (/^\s*$/.test(line)) continue;
				if (!this.usingRe.test(line)) break;
				endRow = row;
			}
			if (endRow > startRow) {
				var endColumn = session.getLine(endRow).length;
				return new Range(startRow, startColumn, endRow, endColumn);
			}
		};
		this.getRegionBlock = function(session, line, row) {
			var startColumn = line.search(/\s*$/);
			var maxRow = session.getLength();
			var startRow = row;
			var re = /^\s*#(end)?region\b/;
			var depth = 1;
			while (++row < maxRow) {
				line = session.getLine(row);
				var m = re.exec(line);
				if (!m) continue;
				if (m[1]) depth--;
				else depth++;
				if (!depth) break;
			}
			var endRow = row;
			if (endRow > startRow) return new Range(startRow, startColumn, endRow, line.length);
		};
	}).call(FoldMode.prototype);
}));
//#endregion
//#region node_modules/ace-code/src/mode/csharp.js
var require_csharp = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var CSharpHighlightRules = require_csharp_highlight_rules().CSharpHighlightRules;
	var MatchingBraceOutdent = require_matching_brace_outdent().MatchingBraceOutdent;
	var CStyleFoldMode = require_csharp$1().FoldMode;
	var Mode = function() {
		this.HighlightRules = CSharpHighlightRules;
		this.$outdent = new MatchingBraceOutdent();
		this.$behaviour = this.$defaultBehaviour;
		this.foldingRules = new CStyleFoldMode();
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = "//";
		this.blockComment = {
			start: "/*",
			end: "*/"
		};
		this.getNextLineIndent = function(state, line, tab) {
			var indent = this.$getIndent(line);
			var tokens = this.getTokenizer().getLineTokens(line, state).tokens;
			if (tokens.length && tokens[tokens.length - 1].type == "comment") return indent;
			if (state == "start") {
				if (line.match(/^.*[\{\(\[]\s*$/)) indent += tab;
			}
			return indent;
		};
		this.checkOutdent = function(state, line, input) {
			return this.$outdent.checkOutdent(line, input);
		};
		this.autoOutdent = function(state, doc, row) {
			this.$outdent.autoOutdent(doc, row);
		};
		this.createWorker = function(session) {
			return null;
		};
		this.$id = "ace/mode/csharp";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
//#endregion
export default require_csharp();
