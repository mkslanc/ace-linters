import { t as __commonJSMin } from "./chunk-Cu_MO8PN.js";
import "./useragent-BMYEMUd9.js";
import "./dom-DRNmwCmL.js";
import "./range-BakcZ9jR.js";
import { t as require_oop } from "./oop-DrExWoUW.js";
import "./lang-Chfjzp5y.js";
import "./config-7GJDZd_b.js";
import "./event_emitter-r-lZpQyf.js";
import "./textmate-CN2VrF7f.js";
import "./tokenizer-B5s1nUwH.js";
import { a as require_text_highlight_rules, t as require_text } from "./text-D8sm5DzM.js";
import "./token_iterator-BNxpI84f.js";
import "./fold_mode-D_StAfa6.js";
import { t as require_cstyle } from "./cstyle-DxkoJQhq.js";
import { t as require_matching_brace_outdent } from "./matching_brace_outdent-BHWbJige.js";
//#region node_modules/ace-code/src/mode/terraform_highlight_rules.js
var require_terraform_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var TerraformHighlightRules = function() {
		this.$rules = {
			"start": [
				{
					token: ["storage.function.terraform"],
					regex: "\\b(output|resource|data|variable|module|export)\\b"
				},
				{
					token: "variable.terraform",
					regex: "\\$\\s",
					push: [
						{
							token: "keyword.terraform",
							regex: "(-var-file|-var)"
						},
						{
							token: "variable.terraform",
							regex: "\\n|$",
							next: "pop"
						},
						{ include: "strings" },
						{ include: "variables" },
						{ include: "operators" },
						{ defaultToken: "text" }
					]
				},
				{
					token: "language.support.class",
					regex: "\\b(timeouts|provider|connection|provisioner|lifecycleprovider|atlas)\\b"
				},
				{
					token: "singleline.comment.terraform",
					regex: "#.*$"
				},
				{
					token: "singleline.comment.terraform",
					regex: "//.*$"
				},
				{
					token: "multiline.comment.begin.terraform",
					regex: /\/\*/,
					push: "blockComment"
				},
				{
					token: "storage.function.terraform",
					regex: "^\\s*(locals|terraform)\\s*{"
				},
				{
					token: "paren.lparen",
					regex: "[[({]"
				},
				{
					token: "paren.rparen",
					regex: "[\\])}]"
				},
				{ include: "constants" },
				{ include: "strings" },
				{ include: "operators" },
				{ include: "variables" }
			],
			blockComment: [{
				regex: /\*\//,
				token: "multiline.comment.end.terraform",
				next: "pop"
			}, { defaultToken: "comment" }],
			"constants": [{
				token: "constant.language.terraform",
				regex: "\\b(true|false|yes|no|on|off|EOF)\\b"
			}, {
				token: "constant.numeric.terraform",
				regex: "(\\b([0-9]+)([kKmMgG]b?)?\\b)|(\\b(0x[0-9A-Fa-f]+)([kKmMgG]b?)?\\b)"
			}],
			"variables": [{
				token: ["variable.assignment.terraform", "keyword.operator"],
				regex: "\\b([a-zA-Z_]+)(\\s*=)"
			}],
			"interpolated_variables": [{
				token: "variable.terraform",
				regex: "\\b(var|self|count|path|local)\\b(?:\\.*[a-zA-Z_-]*)?"
			}],
			"strings": [{
				token: "punctuation.quote.terraform",
				regex: "'",
				push: [
					{
						token: "punctuation.quote.terraform",
						regex: "'",
						next: "pop"
					},
					{ include: "escaped_chars" },
					{ defaultToken: "string" }
				]
			}, {
				token: "punctuation.quote.terraform",
				regex: "\"",
				push: [
					{
						token: "punctuation.quote.terraform",
						regex: "\"",
						next: "pop"
					},
					{ include: "interpolation" },
					{ include: "escaped_chars" },
					{ defaultToken: "string" }
				]
			}],
			"escaped_chars": [{
				token: "constant.escaped_char.terraform",
				regex: "\\\\."
			}],
			"operators": [{
				token: "keyword.operator",
				regex: "\\?|:|==|!=|>|<|>=|<=|&&|\\|\\||!|%|&|\\*|\\+|\\-|/|="
			}],
			"interpolation": [{
				token: "punctuation.interpolated.begin.terraform",
				regex: "\\$?\\$\\{",
				push: [
					{
						token: "punctuation.interpolated.end.terraform",
						regex: "\\}",
						next: "pop"
					},
					{ include: "interpolated_variables" },
					{ include: "operators" },
					{ include: "constants" },
					{ include: "strings" },
					{ include: "functions" },
					{ include: "parenthesis" },
					{ defaultToken: "punctuation" }
				]
			}],
			"functions": [{
				token: "keyword.function.terraform",
				regex: "\\b(abs|basename|base64decode|base64encode|base64gzip|base64sha256|base64sha512|bcrypt|ceil|chomp|chunklist|cidrhost|cidrnetmask|cidrsubnet|coalesce|coalescelist|compact|concat|contains|dirname|distinct|element|file|floor|flatten|format|formatlist|indent|index|join|jsonencode|keys|length|list|log|lookup|lower|map|matchkeys|max|merge|min|md5|pathexpand|pow|replace|rsadecrypt|sha1|sha256|sha512|signum|slice|sort|split|substr|timestamp|timeadd|title|transpose|trimspace|upper|urlencode|uuid|values|zipmap)\\b"
			}],
			"parenthesis": [{
				token: "paren.lparen",
				regex: "\\["
			}, {
				token: "paren.rparen",
				regex: "\\]"
			}]
		};
		this.normalizeRules();
	};
	oop.inherits(TerraformHighlightRules, TextHighlightRules);
	exports.TerraformHighlightRules = TerraformHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/terraform.js
var require_terraform = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var TerraformHighlightRules = require_terraform_highlight_rules().TerraformHighlightRules;
	var CStyleFoldMode = require_cstyle().FoldMode;
	var MatchingBraceOutdent = require_matching_brace_outdent().MatchingBraceOutdent;
	var Mode = function() {
		TextMode.call(this);
		this.HighlightRules = TerraformHighlightRules;
		this.$outdent = new MatchingBraceOutdent();
		this.$behaviour = this.$defaultBehaviour;
		this.foldingRules = new CStyleFoldMode();
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = ["#", "//"];
		this.blockComment = {
			start: "/*",
			end: "*/"
		};
		this.$id = "ace/mode/terraform";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
//#endregion
export default require_terraform();
