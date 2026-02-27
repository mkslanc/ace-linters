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
import { a as require_text_highlight_rules, t as require_text } from "./text-B9A1mx6l.js";
import "./token_iterator-CbfYmntj.js";
import "./javascript_highlight_rules-DP2X209F.js";
import "./css_highlight_rules-BN2AN0ZM.js";
import "./xml_highlight_rules-C4X_gdGF.js";
import { t as require_html_highlight_rules } from "./html_highlight_rules-Dky29llI.js";
var require_ftl_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var HtmlHighlightRules = require_html_highlight_rules().HtmlHighlightRules;
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var FtlLangHighlightRules = function() {
		var allBuiltIns = "\\?|substring|cap_first|uncap_first|capitalize|chop_linebreak|date|time|datetime|ends_with|html|groups|index_of|j_string|js_string|json_string|last_index_of|length|lower_case|left_pad|right_pad|contains|matches|number|replace|rtf|url|split|starts_with|string|trim|upper_case|word_list|xhtml|xmlc|round|floor|ceilingiso_[a-z_]+first|last|seq_contains|seq_index_of|seq_last_index_of|reverse|size|sort|sort_by|chunkkeys|valueschildren|parent|root|ancestors|node_name|node_type|node_namespacebyte|double|float|int|long|short|number_to_date|number_to_time|number_to_datetime|eval|has_content|interpret|is_[a-z_]+|namespacenew";
		var deprecatedBuiltIns = "default|exists|if_exists|web_safe";
		var variables = "data_model|error|globals|lang|locale|locals|main|namespace|node|current_node|now|output_encoding|template_name|url_escaping_charset|vars|version";
		var operators = "gt|gte|lt|lte|as|in|using";
		var reserved = "true|false";
		var attributes = "encoding|parse|locale|number_format|date_format|time_format|datetime_format|time_zone|url_escaping_charset|classic_compatible|strip_whitespace|strip_text|strict_syntax|ns_prefixes|attributes";
		this.$rules = {
			"start": [
				{
					token: "constant.character.entity",
					regex: /&[^;]+;/
				},
				{
					token: "support.function",
					regex: "\\?(" + allBuiltIns + ")"
				},
				{
					token: "support.function.deprecated",
					regex: "\\?(" + deprecatedBuiltIns + ")"
				},
				{
					token: "language.variable",
					regex: "\\.(?:" + variables + ")"
				},
				{
					token: "constant.language",
					regex: "\\b(" + reserved + ")\\b"
				},
				{
					token: "keyword.operator",
					regex: "\\b(?:" + operators + ")\\b"
				},
				{
					token: "entity.other.attribute-name",
					regex: attributes
				},
				{
					token: "string",
					regex: /['"]/,
					next: "qstring"
				},
				{
					token: function(value) {
						if (value.match("^[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?$")) return "constant.numeric";
						else return "variable";
					},
					regex: /[\w.+\-]+/
				},
				{
					token: "keyword.operator",
					regex: "!|\\.|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^="
				},
				{
					token: "paren.lparen",
					regex: "[[({]"
				},
				{
					token: "paren.rparen",
					regex: "[\\])}]"
				},
				{
					token: "text",
					regex: "\\s+"
				}
			],
			"qstring": [
				{
					token: "constant.character.escape",
					regex: "\\\\[nrtvef\\\\\"$]"
				},
				{
					token: "string",
					regex: /['"]/,
					next: "start"
				},
				{ defaultToken: "string" }
			]
		};
	};
	oop$1.inherits(FtlLangHighlightRules, TextHighlightRules);
	var FtlHighlightRules$1 = function() {
		HtmlHighlightRules.call(this);
		var startRules = [
			{
				token: "comment",
				regex: "<#--",
				next: "ftl-dcomment"
			},
			{
				token: "string.interpolated",
				regex: "\\${",
				push: "ftl-start"
			},
			{
				token: "keyword.function",
				regex: "</?#(assign|attempt|break|case|compress|default|elseif|else|escape|fallback|function|flush|ftl|global|if|import|include|list|local|lt|macro|nested|noescape|noparse|nt|recover|recurse|return|rt|setting|stop|switch|t|visit)",
				push: "ftl-start"
			},
			{
				token: "keyword.other",
				regex: "</?@[a-zA-Z\\.]+",
				push: "ftl-start"
			}
		];
		var endRules = [{
			token: "keyword",
			regex: "/?>",
			next: "pop"
		}, {
			token: "string.interpolated",
			regex: "}",
			next: "pop"
		}];
		for (var key in this.$rules) this.$rules[key].unshift.apply(this.$rules[key], startRules);
		this.embedRules(FtlLangHighlightRules, "ftl-", endRules, ["start"]);
		this.addRules({ "ftl-dcomment": [{
			token: "comment",
			regex: "-->",
			next: "pop"
		}, { defaultToken: "comment" }] });
		this.normalizeRules();
	};
	oop$1.inherits(FtlHighlightRules$1, HtmlHighlightRules);
	exports.FtlHighlightRules = FtlHighlightRules$1;
}));
var require_ftl = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var FtlHighlightRules = require_ftl_highlight_rules().FtlHighlightRules;
	var Mode = function() {
		this.HighlightRules = FtlHighlightRules;
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.$id = "ace/mode/ftl";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_ftl();
