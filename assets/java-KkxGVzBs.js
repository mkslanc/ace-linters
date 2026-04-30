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
import "./text-D8sm5DzM.js";
import "./token_iterator-BNxpI84f.js";
import "./fold_mode-D_StAfa6.js";
import { t as require_cstyle } from "./cstyle-DxkoJQhq.js";
import "./doc_comment_highlight_rules-Crv5ZBqX.js";
import "./javascript_highlight_rules-DZzo6_DD.js";
import "./matching_brace_outdent-BHWbJige.js";
import "./xml-MVkSt0S-.js";
import { t as require_javascript } from "./javascript-CtbB98r6.js";
import { t as require_java_highlight_rules } from "./java_highlight_rules-BhF91_rh.js";
//#region node_modules/ace-code/src/mode/folding/java.js
var require_java$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var CStyleFoldMode = require_cstyle().FoldMode;
	var Range = require_range().Range;
	var FoldMode = exports.FoldMode = function() {};
	oop.inherits(FoldMode, CStyleFoldMode);
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
//#endregion
//#region node_modules/ace-code/src/mode/java.js
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
//#endregion
export default require_java();
