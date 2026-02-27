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
import "./fold_mode-D1xG2KFM.js";
import { t as require_cstyle } from "./cstyle-C6ktp4d4.js";
import { t as require_doc_comment_highlight_rules } from "./doc_comment_highlight_rules-C7lFDmmX.js";
var require_apex_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var DocCommentHighlightRules = require_doc_comment_highlight_rules().DocCommentHighlightRules;
	var ApexHighlightRules$1 = function() {
		var mainKeywordMapper = this.createKeywordMapper({
			"variable.language": "activate|any|autonomous|begin|bigdecimal|byte|cast|char|collect|const|end|exit|export|float|goto|group|having|hint|import|inner|into|join|loop|number|object|of|outer|parallel|pragma|retrieve|returning|search|short|stat|synchronized|then|this_month|transaction|type|when",
			"keyword": "private|protected|public|native|synchronized|abstract|threadsafe|transient|static|final|and|array|as|asc|break|bulk|by|catch|class|commit|continue|convertcurrency|delete|desc|do|else|enum|extends|false|final|finally|for|from|future|global|if|implements|in|insert|instanceof|interface|last_90_days|last_month|last_n_days|last_week|like|limit|list|map|merge|new|next_90_days|next_month|next_n_days|next_week|not|null|nulls|on|or|override|package|return|rollback|savepoint|select|set|sort|super|testmethod|this|this_week|throw|today|tolabel|tomorrow|trigger|true|try|undelete|update|upsert|using|virtual|webservice|where|while|yesterday|switch|case|default",
			"storage.type": "def|boolean|byte|char|short|int|float|pblob|date|datetime|decimal|double|id|integer|long|string|time|void|blob|Object",
			"constant.language": "true|false|null|after|before|count|excludes|first|includes|last|order|sharing|with",
			"support.function": "system|apex|label|apexpages|userinfo|schema"
		}, "identifier", true);
		function keywordMapper(value) {
			if (value.slice(-3) == "__c") return "support.function";
			return mainKeywordMapper(value);
		}
		function string(start, options) {
			return {
				regex: start + (options.multiline ? "" : "(?=.)"),
				token: "string.start",
				next: [
					{
						regex: options.escape,
						token: "character.escape"
					},
					{
						regex: options.error,
						token: "error.invalid"
					},
					{
						regex: start + (options.multiline ? "" : "|$"),
						token: "string.end",
						next: options.next || "start"
					},
					{ defaultToken: "string" }
				]
			};
		}
		function comments() {
			return [
				{
					token: "comment",
					regex: "\\/\\/(?=.)",
					next: [
						DocCommentHighlightRules.getTagRule(),
						{
							token: "comment",
							regex: "$|^",
							next: "start"
						},
						{
							defaultToken: "comment",
							caseInsensitive: true
						}
					]
				},
				DocCommentHighlightRules.getStartRule("doc-start"),
				{
					token: "comment",
					regex: /\/\*/,
					next: [
						DocCommentHighlightRules.getTagRule(),
						{
							token: "comment",
							regex: "\\*\\/",
							next: "start"
						},
						{
							defaultToken: "comment",
							caseInsensitive: true
						}
					]
				}
			];
		}
		this.$rules = {
			start: [
				string("'", {
					escape: /\\[nb'"\\]/,
					error: /\\./,
					multiline: false
				}),
				comments("c"),
				{
					type: "decoration",
					token: [
						"meta.package.apex",
						"keyword.other.package.apex",
						"meta.package.apex",
						"storage.modifier.package.apex",
						"meta.package.apex",
						"punctuation.terminator.apex"
					],
					regex: /^(\s*)(package)\b(?:(\s*)([^ ;$]+)(\s*)((?:;)?))?/
				},
				{
					regex: /@[a-zA-Z_$][a-zA-Z_$\d\u0080-\ufffe]*/,
					token: "constant.language"
				},
				{
					regex: /[a-zA-Z_$][a-zA-Z_$\d\u0080-\ufffe]*/,
					token: keywordMapper
				},
				{
					regex: "`#%",
					token: "error.invalid"
				},
				{
					token: "constant.numeric",
					regex: /[+-]?\d+(?:(?:\.\d*)?(?:[LlDdEe][+-]?\d+)?)\b|\.\d+[LlDdEe]/
				},
				{
					token: "keyword.operator",
					regex: /--|\+\+|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\|\||\?\:|[!$%&*+\-~\/^]=?/,
					next: "start"
				},
				{
					token: "punctuation.operator",
					regex: /[?:,;.]/,
					next: "start"
				},
				{
					token: "paren.lparen",
					regex: /[\[]/,
					next: "maybe_soql",
					merge: false
				},
				{
					token: "paren.lparen",
					regex: /[\[({]/,
					next: "start",
					merge: false
				},
				{
					token: "paren.rparen",
					regex: /[\])}]/,
					merge: false
				}
			],
			maybe_soql: [
				{
					regex: /\s+/,
					token: "text"
				},
				{
					regex: /(SELECT|FIND)\b/,
					token: "keyword",
					caseInsensitive: true,
					next: "soql"
				},
				{
					regex: "",
					token: "none",
					next: "start"
				}
			],
			soql: [
				{
					regex: "(:?ASC|BY|CATEGORY|CUBE|DATA|DESC|END|FIND|FIRST|FOR|FROM|GROUP|HAVING|IN|LAST|LIMIT|NETWORK|NULLS|OFFSET|ORDER|REFERENCE|RETURNING|ROLLUP|SCOPE|SELECT|SNIPPET|TRACKING|TYPEOF|UPDATE|USING|VIEW|VIEWSTAT|WHERE|WITH|AND|OR)\\b",
					token: "keyword",
					caseInsensitive: true
				},
				{
					regex: "(:?target_length|toLabel|convertCurrency|count|Contact|Account|User|FIELDS)\\b",
					token: "support.function",
					caseInsensitive: true
				},
				{
					token: "paren.rparen",
					regex: /[\]]/,
					next: "start",
					merge: false
				},
				string("'", {
					escape: /\\[nb'"\\]/,
					error: /\\./,
					multiline: false,
					next: "soql"
				}),
				string("\"", {
					escape: /\\[nb'"\\]/,
					error: /\\./,
					multiline: false,
					next: "soql"
				}),
				{
					regex: /\\./,
					token: "character.escape"
				},
				{
					regex: /[\?\&\|\!\{\}\[\]\(\)\^\~\*\:\"\'\+\-\,\.=\\\/]/,
					token: "keyword.operator"
				}
			],
			"log-start": [
				{
					token: "timestamp.invisible",
					regex: /^[\d:.() ]+\|/,
					next: "log-header"
				},
				{
					token: "timestamp.invisible",
					regex: /^  (Number of|Maximum)[^:]*:/,
					next: "log-comment"
				},
				{
					token: "invisible",
					regex: /^Execute Anonymous:/,
					next: "log-comment"
				},
				{ defaultToken: "text" }
			],
			"log-comment": [{
				token: "log-comment",
				regex: /.*$/,
				next: "log-start"
			}],
			"log-header": [
				{
					token: "timestamp.invisible",
					regex: /((USER_DEBUG|\[\d+\]|DEBUG)\|)+/
				},
				{
					token: "keyword",
					regex: "(?:EXECUTION_FINISHED|EXECUTION_STARTED|CODE_UNIT_STARTED|CUMULATIVE_LIMIT_USAGE|LIMIT_USAGE_FOR_NS|CUMULATIVE_LIMIT_USAGE_END|CODE_UNIT_FINISHED)"
				},
				{
					regex: "",
					next: "log-start"
				}
			]
		};
		this.embedRules(DocCommentHighlightRules, "doc-", [DocCommentHighlightRules.getEndRule("start")]);
		this.normalizeRules();
	};
	oop$1.inherits(ApexHighlightRules$1, TextHighlightRules);
	exports.ApexHighlightRules = ApexHighlightRules$1;
}));
var require_apex = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var ApexHighlightRules = require_apex_highlight_rules().ApexHighlightRules;
	var FoldMode = require_cstyle().FoldMode;
	function ApexMode() {
		TextMode.call(this);
		this.HighlightRules = ApexHighlightRules;
		this.foldingRules = new FoldMode();
		this.$behaviour = this.$defaultBehaviour;
	}
	oop.inherits(ApexMode, TextMode);
	ApexMode.prototype.lineCommentStart = "//";
	ApexMode.prototype.blockComment = {
		start: "/*",
		end: "*/"
	};
	exports.Mode = ApexMode;
}));
export default require_apex();
