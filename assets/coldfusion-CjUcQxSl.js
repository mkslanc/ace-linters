import { t as __commonJSMin } from "./chunk-Cu_MO8PN.js";
import "./useragent-BMYEMUd9.js";
import "./dom-DRNmwCmL.js";
import "./range-BakcZ9jR.js";
import { t as require_oop } from "./oop-DrExWoUW.js";
import { t as require_lang } from "./lang-Chfjzp5y.js";
import "./config-7GJDZd_b.js";
import "./event_emitter-r-lZpQyf.js";
import "./textmate-CN2VrF7f.js";
import "./tokenizer-B5s1nUwH.js";
import "./text-D8sm5DzM.js";
import "./token_iterator-BNxpI84f.js";
import "./fold_mode-D_StAfa6.js";
import "./cstyle-DxkoJQhq.js";
import { t as require_javascript_highlight_rules } from "./javascript_highlight_rules-DZzo6_DD.js";
import "./matching_brace_outdent-BHWbJige.js";
import "./xml-MVkSt0S-.js";
import "./javascript-CtbB98r6.js";
import "./css_highlight_rules-_E_vcaY_.js";
import "./css_completions-C2GxC1IS.js";
import "./css-BIWs6ZVC.js";
import "./css-C0jKnsYY.js";
import "./xml_highlight_rules-DkcOGcVi.js";
import { t as require_html_highlight_rules } from "./html_highlight_rules-DFgdMIml.js";
import "./mixed-CB1dzpdX.js";
import { t as require_html } from "./html-DaEx_Icq.js";
//#region node_modules/ace-code/src/mode/coldfusion_highlight_rules.js
var require_coldfusion_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var JavaScriptHighlightRules = require_javascript_highlight_rules().JavaScriptHighlightRules;
	var HtmlHighlightRules = require_html_highlight_rules().HtmlHighlightRules;
	var ColdfusionHighlightRules = function() {
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
	oop.inherits(ColdfusionHighlightRules, HtmlHighlightRules);
	exports.ColdfusionHighlightRules = ColdfusionHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/coldfusion.js
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
//#endregion
export default require_coldfusion();
