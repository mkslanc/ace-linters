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
import "./text-x9TxHOMd.js";
import "./token_iterator-B0gzmLw-.js";
import "./fold_mode-DLWDk-fx.js";
import { t as require_cstyle } from "./cstyle-DX2ORGlO.js";
import "./doc_comment_highlight_rules-Csht38Fi.js";
import "./javascript_highlight_rules-Bq39j4o6.js";
import "./matching_brace_outdent-BNxYFHLW.js";
import "./xml-aNrtpxN-.js";
import { t as require_javascript } from "./javascript-CNVEwPsW.js";
import { t as require_java_highlight_rules } from "./java_highlight_rules-BRYkBMlC.js";
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
