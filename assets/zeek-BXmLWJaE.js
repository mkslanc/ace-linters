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
import { t as require_cstyle } from "./cstyle-D3R9cgNV.js";
var require_zeek_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var ZeekHighlightRules$1 = function() {
		this.$rules = {
			"start": [
				{
					token: "comment.line",
					regex: "#.*$"
				},
				{
					token: "string.double",
					regex: /"/,
					next: "string-state"
				},
				{
					token: "string.regexp",
					regex: "(/)(?=.*/)",
					next: "pattern-state"
				},
				{
					token: ["keyword.other", "meta.preprocessor"],
					regex: /(@(?:load-plugin|load-sigs|load|unload))(.*$)/
				},
				{
					token: "keyword.other",
					regex: /@(?:DEBUG|DIR|FILENAME|deprecated|if|ifdef|ifndef|else|endif)/
				},
				{
					token: [
						"keyword.other",
						"meta.preprocessor",
						"keyword.operator",
						"meta.preprocessor"
					],
					regex: /(@prefixes)(\s*)(\+?=)(.*$)/
				},
				{
					token: "storage.modifier.attribute",
					regex: /\&\b(?:redef|priority|log|optional|default|add_func|delete_func|expire_func|read_expire|write_expire|create_expire|synchronized|persistent|rotate_interval|rotate_size|encrypt|raw_output|mergeable|error_handler|type_column|deprecated)\b/
				},
				{
					token: "constant.language",
					regex: /\b(?:T|F)\b/
				},
				{
					token: "constant.numeric.port",
					regex: /\b\d{1,5}\/(?:udp|tcp|icmp|unknown)\b/
				},
				{
					token: "constant.numeric.addr",
					regex: /\b(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[0-9]{1,2})\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[0-9]{1,2})\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[0-9]{1,2})\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[0-9]{1,2})\b/,
					comment: "IPv4 address"
				},
				{
					token: "constant.numeric.addr",
					regex: /\[(?:[0-9a-fA-F]{0,4}:){2,7}(?:[0-9a-fA-F]{0,4})?(?:(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[0-9]{1,2})\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[0-9]{1,2})\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[0-9]{1,2})\.(?:25[0-5]|2[0-4][0-9]|[0-1][0-9]{2}|[0-9]{1,2}))?\]/,
					comment: "IPv6 address"
				},
				{
					token: "constant.numeric.float.decimal.interval",
					regex: /(?:(?:\d*\.\d*(?:[eE][+-]?\d+)?|\d*[eE][+-]?\d+|\d*\.\d*)|\d+)\s*(?:day|hr|min|msec|usec|sec)s?/
				},
				{
					token: "constant.numeric.float.decimal",
					regex: /\d*\.\d*(?:[eE][+-]?\d+)?|\d*[eE][+-]?\d+|\d*\.\d*/
				},
				{
					token: "constant.numeric.hostname",
					regex: /\b[A-Za-z0-9][A-Za-z0-9\-]*(?:\.[A-Za-z0-9][A-Za-z0-9\-]*)+\b/
				},
				{
					token: "constant.numeric.integer.hexadecimal",
					regex: /\b0x[0-9a-fA-F]+\b/
				},
				{
					token: "constant.numeric.integer.decimal",
					regex: /\b\d+\b/
				},
				{
					token: "keyword.operator",
					regex: /==|!=|<=|<|>=|>/
				},
				{
					token: "keyword.operator",
					regex: /(&&)|(\|\|)|(!)/
				},
				{
					token: "keyword.operator",
					regex: /=|\+=|-=/
				},
				{
					token: "keyword.operator",
					regex: /\+\+|\+|--|-|\*|\/|%/
				},
				{
					token: "keyword.operator",
					regex: /&|\||\^|~/
				},
				{
					token: "keyword.operator",
					regex: /\b(?:in|as|is)\b/
				},
				{
					token: "punctuation.terminator",
					regex: /;/
				},
				{
					token: "punctuation.accessor",
					regex: /\??\$/
				},
				{
					token: "punctuation.accessor",
					regex: /::/
				},
				{
					token: "keyword.operator",
					regex: /\?/
				},
				{
					token: "punctuation.separator",
					regex: /:/
				},
				{
					token: "punctuation.separator",
					regex: /,/
				},
				{
					token: [
						"keyword.other",
						"meta.namespace",
						"entity.name.namespace"
					],
					regex: /(module)(\s+)([A-Za-z_][A-Za-z_0-9]*(?:::[A-Za-z_][A-Za-z_0-9]*)*)/
				},
				{
					token: "keyword.other",
					regex: /\bexport\b/
				},
				{
					token: "keyword.control.conditional",
					regex: /\b(?:if|else)\b/
				},
				{
					token: "keyword.control",
					regex: /\b(?:for|while)\b/
				},
				{
					token: "keyword.control",
					regex: /\b(?:return|break|next|continue|fallthrough)\b/
				},
				{
					token: "keyword.control",
					regex: /\b(?:switch|default|case)\b/
				},
				{
					token: "keyword.other",
					regex: /\b(?:add|delete)\b/
				},
				{
					token: "keyword.other",
					regex: /\bprint\b/
				},
				{
					token: "keyword.control",
					regex: /\b(?:when|timeout|schedule)\b/
				},
				{
					token: [
						"keyword.other",
						"meta.struct.record",
						"entity.name.struct.record",
						"meta.struct.record",
						"punctuation.separator",
						"meta.struct.record",
						"storage.type.struct.record"
					],
					regex: /\b(type)(\s+)([A-Za-z_][A-Za-z_0-9]*(?:::[A-Za-z_][A-Za-z_0-9]*)*)(\s*)(:)(\s*\b)(record)\b/
				},
				{
					token: [
						"keyword.other",
						"meta.enum",
						"entity.name.enum",
						"meta.enum",
						"punctuation.separator",
						"meta.enum",
						"storage.type.enum"
					],
					regex: /\b(type)(\s+)([A-Za-z_][A-Za-z_0-9]*(?:::[A-Za-z_][A-Za-z_0-9]*)*)(\s*)(:)(\s*\b)(enum)\b/
				},
				{
					token: [
						"keyword.other",
						"meta.type",
						"entity.name.type",
						"meta.type",
						"punctuation.separator"
					],
					regex: /\b(type)(\s+)([A-Za-z_][A-Za-z_0-9]*(?:::[A-Za-z_][A-Za-z_0-9]*)*)(\s*)(:)/
				},
				{
					token: [
						"keyword.other",
						"meta.struct.record",
						"storage.type.struct.record",
						"meta.struct.record",
						"entity.name.struct.record"
					],
					regex: /\b(redef)(\s+)(record)(\s+)([A-Za-z_][A-Za-z_0-9]*(?:::[A-Za-z_][A-Za-z_0-9]*)*)\b/
				},
				{
					token: [
						"keyword.other",
						"meta.enum",
						"storage.type.enum",
						"meta.enum",
						"entity.name.enum"
					],
					regex: /\b(redef)(\s+)(enum)(\s+)([A-Za-z_][A-Za-z_0-9]*(?:::[A-Za-z_][A-Za-z_0-9]*)*)\b/
				},
				{
					token: [
						"storage.type",
						"text",
						"entity.name.function.event"
					],
					regex: /\b(event)(\s+)([A-Za-z_][A-Za-z_0-9]*(?:::[A-Za-z_][A-Za-z_0-9]*)*)(?=s*\()/
				},
				{
					token: [
						"storage.type",
						"text",
						"entity.name.function.hook"
					],
					regex: /\b(hook)(\s+)([A-Za-z_][A-Za-z_0-9]*(?:::[A-Za-z_][A-Za-z_0-9]*)*)(?=s*\()/
				},
				{
					token: [
						"storage.type",
						"text",
						"entity.name.function"
					],
					regex: /\b(function)(\s+)([A-Za-z_][A-Za-z_0-9]*(?:::[A-Za-z_][A-Za-z_0-9]*)*)(?=s*\()/
				},
				{
					token: "keyword.other",
					regex: /\bredef\b/
				},
				{
					token: "storage.type",
					regex: /\bany\b/
				},
				{
					token: "storage.type",
					regex: /\b(?:enum|record|set|table|vector)\b/
				},
				{
					token: [
						"storage.type",
						"text",
						"keyword.operator",
						"text",
						"storage.type"
					],
					regex: /\b(opaque)(\s+)(of)(\s+)([A-Za-z_][A-Za-z_0-9]*(?:::[A-Za-z_][A-Za-z_0-9]*)*)\b/
				},
				{
					token: "keyword.operator",
					regex: /\bof\b/
				},
				{
					token: "storage.type",
					regex: /\b(?:addr|bool|count|double|file|int|interval|pattern|port|string|subnet|time)\b/
				},
				{
					token: "storage.type",
					regex: /\b(?:function|hook|event)\b/
				},
				{
					token: "storage.modifier",
					regex: /\b(?:global|local|const|option)\b/
				},
				{
					token: "entity.name.function.call",
					regex: /\b[A-Za-z_][A-Za-z_0-9]*(?:::[A-Za-z_][A-Za-z_0-9]*)*(?=s*\()/
				},
				{
					token: "punctuation.section.block.begin",
					regex: /\{/
				},
				{
					token: "punctuation.section.block.end",
					regex: /\}/
				},
				{
					token: "punctuation.section.brackets.begin",
					regex: /\[/
				},
				{
					token: "punctuation.section.brackets.end",
					regex: /\]/
				},
				{
					token: "punctuation.section.parens.begin",
					regex: /\(/
				},
				{
					token: "punctuation.section.parens.end",
					regex: /\)/
				}
			],
			"string-state": [
				{
					token: "constant.character.escape",
					regex: /\\./
				},
				{
					token: "string.double",
					regex: /"/,
					next: "start"
				},
				{
					token: "constant.other.placeholder",
					regex: /%-?[0-9]*(\.[0-9]+)?[DTdxsefg]/
				},
				{
					token: "string.double",
					regex: "."
				}
			],
			"pattern-state": [
				{
					token: "constant.character.escape",
					regex: /\\./
				},
				{
					token: "string.regexp",
					regex: "/",
					next: "start"
				},
				{
					token: "string.regexp",
					regex: "."
				}
			]
		};
		this.normalizeRules();
	};
	ZeekHighlightRules$1.metaData = {
		fileTypes: ["bro", "zeek"],
		name: "Zeek",
		scopeName: "source.zeek"
	};
	oop$1.inherits(ZeekHighlightRules$1, TextHighlightRules);
	exports.ZeekHighlightRules = ZeekHighlightRules$1;
}));
var require_zeek = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var ZeekHighlightRules = require_zeek_highlight_rules().ZeekHighlightRules;
	var FoldMode = require_cstyle().FoldMode;
	var Mode = function() {
		this.HighlightRules = ZeekHighlightRules;
		this.foldingRules = new FoldMode();
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = "#";
		this.$id = "ace/mode/zeek";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_zeek();
