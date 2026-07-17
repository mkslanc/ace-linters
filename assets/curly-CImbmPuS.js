import { t as __commonJSMin } from "./modulepreload-polyfill-DxDZhch-.js";
import { t as require_oop } from "./oop-3KT-lR14.js";
import { t as require_matching_brace_outdent } from "./matching_brace_outdent-eZgsj40c.js";
import { t as require_html_highlight_rules } from "./html_highlight_rules-BTglbrVB.js";
import { r as require_html$1, t as require_html } from "./html-NZG1gGtk.js";
//#region node_modules/ace-code/src/mode/curly_highlight_rules.js
var require_curly_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var HtmlHighlightRules = require_html_highlight_rules().HtmlHighlightRules;
	var CurlyHighlightRules = function() {
		HtmlHighlightRules.call(this);
		this.$rules["start"].unshift({
			token: "variable",
			regex: "{{",
			push: "curly-start"
		});
		this.$rules["curly-start"] = [{
			token: "variable",
			regex: "}}",
			next: "pop"
		}];
		this.normalizeRules();
	};
	oop.inherits(CurlyHighlightRules, HtmlHighlightRules);
	exports.CurlyHighlightRules = CurlyHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/curly.js
var require_curly = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var HtmlMode = require_html().Mode;
	var MatchingBraceOutdent = require_matching_brace_outdent().MatchingBraceOutdent;
	var HtmlFoldMode = require_html$1().FoldMode;
	var CurlyHighlightRules = require_curly_highlight_rules().CurlyHighlightRules;
	var Mode = function() {
		HtmlMode.call(this);
		this.HighlightRules = CurlyHighlightRules;
		this.$outdent = new MatchingBraceOutdent();
		this.foldingRules = new HtmlFoldMode();
	};
	oop.inherits(Mode, HtmlMode);
	(function() {
		this.$id = "ace/mode/curly";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
//#endregion
export default require_curly();
