import { t as __commonJSMin } from "./chunk-iA-Slpst.js";
import "./useragent-BODERP_7.js";
import "./dom-BBjJ92-n.js";
import "./range-BUVqNbwc.js";
import { t as require_oop } from "./oop-DcdK5Mrs.js";
import { t as require_lang } from "./lang-DcNOSqFo.js";
import "./config-DPm1ug3B.js";
import "./event_emitter-BGfSYA24.js";
import "./textmate-zFNmb5zU.js";
import "./tokenizer-C2b-GJMk.js";
import "./text-B9A1mx6l.js";
import "./token_iterator-CbfYmntj.js";
import "./fold_mode-D1xG2KFM.js";
import "./cstyle-C6ktp4d4.js";
import { t as require_javascript_highlight_rules } from "./javascript_highlight_rules-DP2X209F.js";
import "./matching_brace_outdent-CSXbwYsT.js";
import "./xml-CQieR9ap.js";
import "./javascript-Bgq9ZLIq.js";
import "./css_highlight_rules-BN2AN0ZM.js";
import "./css_completions-C1qupuMi.js";
import "./css-B6QOS37f.js";
import "./css-ds7EYb5W.js";
import "./xml_highlight_rules-C4X_gdGF.js";
import { t as require_html_highlight_rules } from "./html_highlight_rules-Dky29llI.js";
import "./mixed-Cyzulx9L.js";
import { t as require_html } from "./html-CZivRBj1.js";
var require_coldfusion_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var JavaScriptHighlightRules = require_javascript_highlight_rules().JavaScriptHighlightRules;
	var HtmlHighlightRules = require_html_highlight_rules().HtmlHighlightRules;
	var ColdfusionHighlightRules$1 = function() {
		HtmlHighlightRules.call(this);
		this.$rules.tag[2].token = function(start, tag) {
			var group = tag.slice(0, 2) == "cf" ? "keyword" : "meta.tag";
			return ["meta.tag.punctuation." + (start == "<" ? "" : "end-") + "tag-open.xml", group + ".tag-name.xml"];
		};
		var jsAndCss = Object.keys(this.$rules).filter(function(x) {
			return /^(js|css)-/.test(x);
		});
		this.embedRules({ cfmlComment: [
			{
				regex: "<!---",
				token: "comment.start",
				push: "cfmlComment"
			},
			{
				regex: "--->",
				token: "comment.end",
				next: "pop"
			},
			{ defaultToken: "comment" }
		] }, "", [{
			regex: "<!---",
			token: "comment.start",
			push: "cfmlComment"
		}], [
			"comment",
			"start",
			"tag_whitespace",
			"cdata"
		].concat(jsAndCss));
		this.$rules.cfTag = [{ include: "attributes" }, {
			token: "meta.tag.punctuation.tag-close.xml",
			regex: "/?>",
			next: "pop"
		}];
		var cfTag = {
			token: function(start, tag) {
				return ["meta.tag.punctuation." + (start == "<" ? "" : "end-") + "tag-open.xml", "keyword.tag-name.xml"];
			},
			regex: "(</?)(cf[-_a-zA-Z0-9:.]+)",
			push: "cfTag"
		};
		jsAndCss.forEach(function(s) {
			this.$rules[s].unshift(cfTag);
		}, this);
		this.embedTagRules(new JavaScriptHighlightRules({ jsx: false }).getRules(), "cfjs-", "cfscript");
		this.normalizeRules();
	};
	oop$1.inherits(ColdfusionHighlightRules$1, HtmlHighlightRules);
	exports.ColdfusionHighlightRules = ColdfusionHighlightRules$1;
}));
var require_coldfusion = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var lang = require_lang();
	var HtmlMode = require_html().Mode;
	var ColdfusionHighlightRules = require_coldfusion_highlight_rules().ColdfusionHighlightRules;
	var voidElements = "cfabort|cfapplication|cfargument|cfassociate|cfbreak|cfcache|cfcollection|cfcookie|cfdbinfo|cfdirectory|cfdump|cfelse|cfelseif|cferror|cfexchangecalendar|cfexchangeconnection|cfexchangecontact|cfexchangefilter|cfexchangetask|cfexit|cffeed|cffile|cfflush|cfftp|cfheader|cfhtmlhead|cfhttpparam|cfimage|cfimport|cfinclude|cfindex|cfinsert|cfinvokeargument|cflocation|cflog|cfmailparam|cfNTauthenticate|cfobject|cfobjectcache|cfparam|cfpdfformparam|cfprint|cfprocparam|cfprocresult|cfproperty|cfqueryparam|cfregistry|cfreportparam|cfrethrow|cfreturn|cfschedule|cfsearch|cfset|cfsetting|cfthrow|cfzipparam)".split("|");
	var Mode = function() {
		HtmlMode.call(this);
		this.HighlightRules = ColdfusionHighlightRules;
	};
	oop.inherits(Mode, HtmlMode);
	(function() {
		this.voidElements = oop.mixin(lang.arrayToMap(voidElements), this.voidElements);
		this.getNextLineIndent = function(state, line, tab) {
			return this.$getIndent(line);
		};
		this.$id = "ace/mode/coldfusion";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_coldfusion();
