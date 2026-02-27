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
import "./text-B9A1mx6l.js";
import "./token_iterator-CbfYmntj.js";
import "./fold_mode-D1xG2KFM.js";
import { t as require_cstyle } from "./cstyle-C6ktp4d4.js";
import "./doc_comment_highlight_rules-C7lFDmmX.js";
import "./javascript_highlight_rules-DP2X209F.js";
import "./matching_brace_outdent-CSXbwYsT.js";
import "./xml-CQieR9ap.js";
import { t as require_javascript } from "./javascript-Bgq9ZLIq.js";
import { t as require_java_highlight_rules } from "./java_highlight_rules-D1nUKnFA.js";
var require_java$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var CStyleFoldMode = require_cstyle().FoldMode;
	var Range = require_range().Range;
	var FoldMode = exports.FoldMode = function() {};
	oop$1.inherits(FoldMode, CStyleFoldMode);
	(function() {
		this.importRegex = /^import /;
		this.getCStyleFoldWidget = this.getFoldWidget;
		this.getFoldWidget = function(session, foldStyle, row) {
			if (foldStyle === "markbegin") {
				var line = session.getLine(row);
				if (this.importRegex.test(line)) {
					if (row == 0 || !this.importRegex.test(session.getLine(row - 1))) return "start";
				}
			}
			return this.getCStyleFoldWidget(session, foldStyle, row);
		};
		this.getCstyleFoldWidgetRange = this.getFoldWidgetRange;
		this.getFoldWidgetRange = function(session, foldStyle, row, forceMultiline) {
			var line = session.getLine(row);
			var match = line.match(this.importRegex);
			if (!match || foldStyle !== "markbegin") return this.getCstyleFoldWidgetRange(session, foldStyle, row, forceMultiline);
			var startColumn = match[0].length;
			var maxRow = session.getLength();
			var startRow = row;
			var endRow = row;
			while (++row < maxRow) {
				var line = session.getLine(row);
				if (line.match(/^\s*$/)) continue;
				if (!line.match(this.importRegex)) break;
				endRow = row;
			}
			if (endRow > startRow) {
				var endColumn = session.getLine(endRow).length;
				return new Range(startRow, startColumn, endRow, endColumn);
			}
		};
	}).call(FoldMode.prototype);
}));
var require_java = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var JavaScriptMode = require_javascript().Mode;
	var JavaHighlightRules = require_java_highlight_rules().JavaHighlightRules;
	var JavaFoldMode = require_java$1().FoldMode;
	var Mode = function() {
		JavaScriptMode.call(this);
		this.HighlightRules = JavaHighlightRules;
		this.foldingRules = new JavaFoldMode();
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, JavaScriptMode);
	(function() {
		this.createWorker = function(session) {
			return null;
		};
		this.$id = "ace/mode/java";
		this.snippetFileId = "ace/snippets/java";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_java();
