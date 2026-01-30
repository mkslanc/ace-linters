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
import { t as require_html$1 } from "./html-DzbMMnDi.js";
var require_astro_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var HtmlHighlightRules = require_html_highlight_rules().HtmlHighlightRules;
	var JavascriptHighlightRules = require_javascript_highlight_rules().JavaScriptHighlightRules;
	var AstroHighlightRules$1 = function() {
		HtmlHighlightRules.call(this);
		var astro = {
			token: "paren.quasi.start",
			regex: /{/,
			next: function(state, stack) {
				if (state !== "start") if (state.indexOf("attribute-equals") !== -1) {
					stack.splice(0);
					stack.unshift("tag_stuff");
				} else stack.unshift(state);
				return "inline-js-start";
			}
		};
		for (var key in this.$rules) {
			if (key.startsWith("js") || key.startsWith("css") || key.startsWith("comment")) continue;
			this.$rules[key].unshift(astro);
		}
		this.$rules.start.unshift({
			token: "comment",
			regex: /^---$/,
			onMatch: function(value, state, stack) {
				stack.splice(0);
				return this.token;
			},
			next: "javascript-start"
		});
		this.embedRules(JavascriptHighlightRules, "javascript-", [{
			regex: /^---$/,
			token: "comment",
			next: "start",
			onMatch: function(value, state, stack) {
				stack.splice(0);
				return this.token;
			}
		}]);
		this.embedRules(JavascriptHighlightRules, "inline-js-");
		var astroRules = [{
			regex: /}/,
			token: "paren.quasi.end",
			onMatch: function(value, state, stack) {
				if (stack[0] === "inline-js-start") {
					stack.shift();
					this.next = stack.shift();
					if (this.next.indexOf("string") !== -1) return "paren.quasi.end";
					return "paren.rparen";
				} else {
					this.next = stack.shift() || "start";
					return this.token;
				}
			}
		}, {
			regex: /{/,
			token: "paren.lparen",
			push: "inline-js-start"
		}];
		this.$rules["inline-js-start"].unshift(astroRules);
		this.$rules["inline-js-no_regex"].unshift(astroRules);
		function overwriteJSXendRule(prefix) {
			for (var index in this.$rules[prefix + "jsxAttributes"]) if (this.$rules[prefix + "jsxAttributes"][index].token === "meta.tag.punctuation.tag-close.xml") {
				this.$rules[prefix + "jsxAttributes"][index].onMatch = function(value, currentState, stack) {
					if (currentState == stack[0]) stack.shift();
					if (value.length == 2) {
						if (stack[0] == this.nextState) stack[1]--;
						if (!stack[1] || stack[1] < 0) stack.splice(0, 2);
					}
					this.next = stack[0] || prefix + "start";
					return [{
						type: this.token,
						value
					}];
				};
				break;
			}
		}
		overwriteJSXendRule.call(this, "javascript-");
		overwriteJSXendRule.call(this, "inline-js-");
		this.normalizeRules();
	};
	oop$1.inherits(AstroHighlightRules$1, HtmlHighlightRules);
	exports.AstroHighlightRules = AstroHighlightRules$1;
}));
var require_astro = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var HtmlMode = require_html().Mode;
	var AstroHighlightRules = require_astro_highlight_rules().AstroHighlightRules;
	var HtmlBehaviour = require_html$1().HtmlBehaviour;
	var Mode = function() {
		HtmlMode.call(this);
		this.HighlightRules = AstroHighlightRules;
		this.$behaviour = new HtmlBehaviour();
	};
	oop.inherits(Mode, HtmlMode);
	(function() {
		this.$id = "ace/mode/astro";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_astro();
