import { t as __commonJSMin } from "./modulepreload-polyfill-DxDZhch-.js";
import { t as require_oop } from "./oop-3KT-lR14.js";
import { a as require_text_highlight_rules } from "./text-BG8jWbzl.js";
import { t as require_html_highlight_rules } from "./html_highlight_rules-BTglbrVB.js";
import { t as require_html } from "./html-NZG1gGtk.js";
import { t as require_r_highlight_rules } from "./r_highlight_rules-B9YFUfPd.js";
//#region node_modules/ace-code/src/mode/rhtml_highlight_rules.js
var require_rhtml_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var RHighlightRules = require_r_highlight_rules().RHighlightRules;
	var HtmlHighlightRules = require_html_highlight_rules().HtmlHighlightRules;
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var RHtmlHighlightRules = function() {
		HtmlHighlightRules.call(this);
		this.$rules["start"].unshift({
			token: "support.function.codebegin",
			regex: "^<!--\\s*begin.rcode\\s*(?:.*)",
			next: "r-start"
		});
		this.embedRules(RHighlightRules, "r-", [{
			token: "support.function.codeend",
			regex: "^\\s*end.rcode\\s*-->",
			next: "start"
		}], ["start"]);
		this.normalizeRules();
	};
	oop.inherits(RHtmlHighlightRules, TextHighlightRules);
	exports.RHtmlHighlightRules = RHtmlHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/rhtml.js
var require_rhtml = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var HtmlMode = require_html().Mode;
	var RHtmlHighlightRules = require_rhtml_highlight_rules().RHtmlHighlightRules;
	var Mode = function(doc, session) {
		HtmlMode.call(this);
		this.$session = session;
		this.HighlightRules = RHtmlHighlightRules;
	};
	oop.inherits(Mode, HtmlMode);
	(function() {
		this.insertChunkInfo = {
			value: "<!--begin.rcode\n\nend.rcode-->\n",
			position: {
				row: 0,
				column: 15
			}
		};
		this.getLanguageMode = function(position) {
			return this.$session.getState(position.row).match(/^r-/) ? "R" : "HTML";
		};
		this.$id = "ace/mode/rhtml";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
//#endregion
export default require_rhtml();
