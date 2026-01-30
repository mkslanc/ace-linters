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
import "./cstyle-D3R9cgNV.js";
import { t as require_javascript_highlight_rules } from "./javascript_highlight_rules-DN609jMc.js";
import "./matching_brace_outdent-CFDbHlsY.js";
import "./xml--3d0d31h.js";
import "./javascript-CApcTAmC.js";
import "./css_highlight_rules-BLT2K-CI.js";
import "./css_completions-cTCh3tDP.js";
import "./css-RWozyC1g.js";
import "./css-BfgKoNmj.js";
import "./xml_highlight_rules-Dr0BgDyR.js";
import { t as require_html_highlight_rules } from "./html_highlight_rules-DWUfr8VU.js";
import "./mixed-B6aEv4ic.js";
import { t as require_html } from "./html-nEATR_ID.js";
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
