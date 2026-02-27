import { t as __commonJSMin } from "./chunk-iA-Slpst.js";
import "./useragent-BODERP_7.js";
import "./dom-BBjJ92-n.js";
import "./range-BUVqNbwc.js";
import { t as require_oop } from "./oop-DcdK5Mrs.js";
import "./lang-DcNOSqFo.js";
import "./config-DPm1ug3B.js";
import "./event_emitter-BGfSYA24.js";
import "./textmate-zFNmb5zU.js";
import "./tokenizer-C2b-GJMk.js";
import { t as require_text } from "./text-B9A1mx6l.js";
import "./token_iterator-CbfYmntj.js";
import "./fold_mode-D1xG2KFM.js";
import { t as require_cstyle } from "./cstyle-C6ktp4d4.js";
import "./doc_comment_highlight_rules-C7lFDmmX.js";
import "./javascript_highlight_rules-DP2X209F.js";
import { t as require_matching_brace_outdent } from "./matching_brace_outdent-CSXbwYsT.js";
import "./css_highlight_rules-BN2AN0ZM.js";
import "./xml_highlight_rules-C4X_gdGF.js";
import { t as require_html_highlight_rules } from "./html_highlight_rules-Dky29llI.js";
import { t as require_java_highlight_rules } from "./java_highlight_rules-D1nUKnFA.js";
var require_jsp_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var HtmlHighlightRules = require_html_highlight_rules().HtmlHighlightRules;
	var JavaHighlightRules = require_java_highlight_rules().JavaHighlightRules;
	var JspHighlightRules$1 = function() {
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
	oop$1.inherits(JspHighlightRules$1, HtmlHighlightRules);
	exports.JspHighlightRules = JspHighlightRules$1;
}));
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
export default require_jsp();
