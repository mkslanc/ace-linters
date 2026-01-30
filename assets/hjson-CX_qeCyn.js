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
var require_hjson_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var HjsonHighlightRules$1 = function() {
		this.$rules = {
			start: [
				{ include: "#comments" },
				{ include: "#rootObject" },
				{ include: "#value" }
			],
			"#array": [{
				token: "paren.lparen",
				regex: /\[/,
				push: [
					{
						token: "paren.rparen",
						regex: /\]/,
						next: "pop"
					},
					{ include: "#value" },
					{ include: "#comments" },
					{
						token: "text",
						regex: /,|$/
					},
					{
						token: "invalid.illegal",
						regex: /[^\s\]]/
					},
					{ defaultToken: "array" }
				]
			}],
			"#comments": [
				{
					token: ["comment.punctuation", "comment.line"],
					regex: /(#)(.*$)/
				},
				{
					token: "comment.punctuation",
					regex: /\/\*/,
					push: [{
						token: "comment.punctuation",
						regex: /\*\//,
						next: "pop"
					}, { defaultToken: "comment.block" }]
				},
				{
					token: ["comment.punctuation", "comment.line"],
					regex: /(\/\/)(.*$)/
				}
			],
			"#constant": [{
				token: "constant",
				regex: /\b(?:true|false|null)\b/
			}],
			"#keyname": [{
				token: "keyword",
				regex: /(?:[^,\{\[\}\]\s]+|"(?:[^"\\]|\\.)*")\s*(?=:)/
			}],
			"#mstring": [{
				token: "string",
				regex: /'''/,
				push: [{
					token: "string",
					regex: /'''/,
					next: "pop"
				}, { defaultToken: "string" }]
			}],
			"#number": [{
				token: "constant.numeric",
				regex: /-?(?:0|[1-9]\d*)(?:(?:\.\d+)?(?:[eE][+-]?\d+)?)?/,
				comment: "handles integer and decimal numbers"
			}],
			"#object": [{
				token: "paren.lparen",
				regex: /\{/,
				push: [
					{
						token: "paren.rparen",
						regex: /\}/,
						next: "pop"
					},
					{ include: "#keyname" },
					{ include: "#value" },
					{
						token: "text",
						regex: /:/
					},
					{
						token: "text",
						regex: /,/
					},
					{ defaultToken: "paren" }
				]
			}],
			"#rootObject": [{
				token: "paren",
				regex: /(?=\s*(?:[^,\{\[\}\]\s]+|"(?:[^"\\]|\\.)*")\s*:)/,
				push: [
					{
						token: "paren.rparen",
						regex: /---none---/,
						next: "pop"
					},
					{ include: "#keyname" },
					{ include: "#value" },
					{
						token: "text",
						regex: /:/
					},
					{
						token: "text",
						regex: /,/
					},
					{ defaultToken: "paren" }
				]
			}],
			"#string": [{
				token: "string",
				regex: /"/,
				push: [
					{
						token: "string",
						regex: /"/,
						next: "pop"
					},
					{
						token: "constant.language.escape",
						regex: /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/
					},
					{
						token: "invalid.illegal",
						regex: /\\./
					},
					{ defaultToken: "string" }
				]
			}],
			"#ustring": [{
				token: "string",
				regex: /\b[^:,0-9\-\{\[\}\]\s].*$/
			}],
			"#value": [
				{ include: "#constant" },
				{ include: "#number" },
				{ include: "#string" },
				{ include: "#array" },
				{ include: "#object" },
				{ include: "#comments" },
				{ include: "#mstring" },
				{ include: "#ustring" }
			]
		};
		this.normalizeRules();
	};
	HjsonHighlightRules$1.metaData = {
		fileTypes: ["hjson"],
		foldingStartMarker: "(?x:     # turn on extended mode\n              ^    # a line beginning with\n              \\s*    # some optional space\n              [{\\[]  # the start of an object or array\n              (?!    # but not followed by\n              .*   # whatever\n              [}\\]]  # and the close of an object or array\n              ,?   # an optional comma\n              \\s*  # some optional space\n              $    # at the end of the line\n              )\n              |    # ...or...\n              [{\\[]  # the start of an object or array\n              \\s*    # some optional space\n              $    # at the end of the line\n            )",
		foldingStopMarker: "(?x:   # turn on extended mode\n             ^    # a line beginning with\n             \\s*  # some optional space\n             [}\\]]  # and the close of an object or array\n             )",
		keyEquivalent: "^~J",
		name: "Hjson",
		scopeName: "source.hjson"
	};
	oop$1.inherits(HjsonHighlightRules$1, TextHighlightRules);
	exports.HjsonHighlightRules = HjsonHighlightRules$1;
}));
var require_hjson = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var HjsonHighlightRules = require_hjson_highlight_rules().HjsonHighlightRules;
	var FoldMode = require_cstyle().FoldMode;
	var Mode = function() {
		this.HighlightRules = HjsonHighlightRules;
		this.foldingRules = new FoldMode();
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = "//";
		this.blockComment = {
			start: "/*",
			end: "*/"
		};
		this.$id = "ace/mode/hjson";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_hjson();
