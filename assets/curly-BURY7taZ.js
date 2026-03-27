import { t as __commonJSMin } from "./chunk-BLiWRsM1.js";
import "./useragent-Cm8O_vvb.js";
import "./dom-BmR1mTSl.js";
import "./range-D2fBS63W.js";
import { t as require_oop } from "./oop-D6rqnWBm.js";
import "./lang-B3gWVpaj.js";
import "./config-D-BhsSyn.js";
import "./event_emitter-DQJDHkGW.js";
import "./textmate-7M3qxGeS.js";
import "./tokenizer-BFeMc3TI.js";
import "./text-x9TxHOMd.js";
import "./token_iterator-B0gzmLw-.js";
import "./fold_mode-DLWDk-fx.js";
import "./cstyle-DX2ORGlO.js";
import "./javascript_highlight_rules-Bq39j4o6.js";
import { t as require_matching_brace_outdent } from "./matching_brace_outdent-BNxYFHLW.js";
import "./xml-aNrtpxN-.js";
import "./javascript-CNVEwPsW.js";
import "./css_highlight_rules-BrA4daTy.js";
import "./css_completions-j9TDmcq8.js";
import "./css-DLrW6Pji.js";
import "./css-BCtfNldA.js";
import "./xml_highlight_rules-Ch7nsDP3.js";
import { t as require_html_highlight_rules } from "./html_highlight_rules-C5s9oMLE.js";
import "./mixed-sNoniz_T.js";
import { r as require_html$1, t as require_html } from "./html-B8wEf2Cx.js";
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
