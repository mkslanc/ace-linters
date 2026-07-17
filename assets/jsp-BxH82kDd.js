import { t as __commonJSMin } from "./modulepreload-polyfill-DxDZhch-.js";
import { t as require_oop } from "./oop-3KT-lR14.js";
import { t as require_text } from "./text-BG8jWbzl.js";
import { t as require_cstyle } from "./cstyle-D1oWbM0K.js";
import { t as require_matching_brace_outdent } from "./matching_brace_outdent-eZgsj40c.js";
import { t as require_html_highlight_rules } from "./html_highlight_rules-BTglbrVB.js";
import { t as require_java_highlight_rules } from "./java_highlight_rules-weCr55tC.js";
//#region node_modules/ace-code/src/mode/jsp_highlight_rules.js
var require_jsp_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var HtmlHighlightRules = require_html_highlight_rules().HtmlHighlightRules;
	var JavaHighlightRules = require_java_highlight_rules().JavaHighlightRules;
	var JspHighlightRules = function() {
		HtmlHighlightRules.call(this);
		var builtinVariables = "request|response|out|session|application|config|pageContext|page|Exception";
		var keywords = "page|include|taglib";
		var startRules = [{
			token: "comment",
			regex: "<%--",
			push: "jsp-dcomment"
		}, {
			token: "meta.tag",
			regex: "<%@?|<%=?|<%!?|<jsp:[^>]+>",
			push: "jsp-start"
		}];
		var endRules = [
			{
				token: "meta.tag",
				regex: "%>|<\\/jsp:[^>]+>",
				next: "pop"
			},
			{
				token: "variable.language",
				regex: builtinVariables
			},
			{
				token: "keyword",
				regex: keywords
			}
		];
		for (var key in this.$rules) this.$rules[key].unshift.apply(this.$rules[key], startRules);
		this.embedRules(JavaHighlightRules, "jsp-", endRules, ["start"]);
		this.addRules({ "jsp-dcomment": [{
			token: "comment",
			regex: ".*?--%>",
			next: "pop"
		}] });
		this.normalizeRules();
	};
	oop.inherits(JspHighlightRules, HtmlHighlightRules);
	exports.JspHighlightRules = JspHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/jsp.js
var require_jsp = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var JspHighlightRules = require_jsp_highlight_rules().JspHighlightRules;
	var MatchingBraceOutdent = require_matching_brace_outdent().MatchingBraceOutdent;
	var CStyleFoldMode = require_cstyle().FoldMode;
	var Mode = function() {
		this.HighlightRules = JspHighlightRules;
		this.$outdent = new MatchingBraceOutdent();
		this.$behaviour = this.$defaultBehaviour;
		this.foldingRules = new CStyleFoldMode();
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.$id = "ace/mode/jsp";
		this.snippetFileId = "ace/snippets/jsp";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
//#endregion
export default require_jsp();
