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
import "./doc_comment_highlight_rules-Csht38Fi.js";
import "./javascript_highlight_rules-Bq39j4o6.js";
import "./matching_brace_outdent-BNxYFHLW.js";
import "./xml-aNrtpxN-.js";
import { t as require_javascript } from "./javascript-CNVEwPsW.js";
import "./css_highlight_rules-BrA4daTy.js";
import "./css_completions-j9TDmcq8.js";
import "./css-DLrW6Pji.js";
import { t as require_css } from "./css-BCtfNldA.js";
import "./xml_highlight_rules-Ch7nsDP3.js";
import "./html_highlight_rules-C5s9oMLE.js";
import "./mixed-sNoniz_T.js";
import { t as require_html } from "./html-B8wEf2Cx.js";
import { n as require_php_highlight_rules, t as require_php } from "./php-BR5YR4o7.js";
//#region node_modules/ace-code/src/mode/php_laravel_blade_highlight_rules.js
var require_php_laravel_blade_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var PhpHighlightRules = require_php_highlight_rules().PhpHighlightRules;
	var PHPLaravelBladeHighlightRules = function() {
		PhpHighlightRules.call(this);
		var bladeRules = {
			start: [
				{ include: "bladeComments" },
				{ include: "directives" },
				{ include: "parenthesis" }
			],
			comments: [
				{ include: "bladeComments" },
				{
					token: "punctuation.definition.comment.blade",
					regex: "(\\/\\/(.)*)|(\\#(.)*)"
				},
				{
					token: "punctuation.definition.comment.begin.php",
					regex: "(?:\\/\\*)",
					push: [{
						token: "punctuation.definition.comment.end.php",
						regex: "(?:\\*\\/)",
						next: "pop"
					}, { defaultToken: "comment.block.blade" }]
				}
			],
			bladeComments: [{
				token: "punctuation.definition.comment.begin.blade",
				regex: "(?:\\{\\{\\-\\-)",
				push: [{
					token: "punctuation.definition.comment.end.blade",
					regex: "(?:\\-\\-\\}\\})",
					next: "pop"
				}, { defaultToken: "comment.block.blade" }]
			}],
			parenthesis: [{
				token: "parenthesis.begin.blade",
				regex: "\\(",
				push: [
					{
						token: "parenthesis.end.blade",
						regex: "\\)",
						next: "pop"
					},
					{ include: "strings" },
					{ include: "variables" },
					{ include: "lang" },
					{ include: "parenthesis" },
					{ include: "comments" },
					{ defaultToken: "source.blade" }
				]
			}],
			directives: [
				{
					token: ["directive.declaration.blade", "keyword.directives.blade"],
					regex: "(@)(endunless|endisset|endempty|endauth|endguest|endcomponent|endslot|endalert|endverbatim|endsection|show|php|endphp|endpush|endprepend|endenv|endforelse|isset|empty|component|slot|alert|json|verbatim|section|auth|guest|hasSection|forelse|includeIf|includeWhen|includeFirst|each|push|stack|prepend|inject|env|elseenv|unless|yield|extends|parent|include|acfrepeater|block|can|cannot|choice|debug|elsecan|elsecannot|embed|hipchat|lang|layout|macro|macrodef|minify|partial|render|servers|set|slack|story|task|unset|wpposts|acfend|after|append|breakpoint|endafter|endcan|endcannot|endembed|endmacro|endmarkdown|endminify|endpartial|endsetup|endstory|endtask|endunless|markdown|overwrite|setup|stop|wpempty|wpend|wpquery)"
				},
				{
					token: ["directive.declaration.blade", "keyword.control.blade"],
					regex: "(@)(if|else|elseif|endif|foreach|endforeach|switch|case|break|default|endswitch|for|endfor|while|endwhile|continue)"
				},
				{
					token: ["directive.ignore.blade", "injections.begin.blade"],
					regex: "(@?)(\\{\\{)",
					push: [
						{
							token: "injections.end.blade",
							regex: "\\}\\}",
							next: "pop"
						},
						{ include: "strings" },
						{ include: "variables" },
						{ include: "comments" },
						{ defaultToken: "source.blade" }
					]
				},
				{
					token: "injections.unescaped.begin.blade",
					regex: "\\{\\!\\!",
					push: [
						{
							token: "injections.unescaped.end.blade",
							regex: "\\!\\!\\}",
							next: "pop"
						},
						{ include: "strings" },
						{ include: "variables" },
						{ defaultToken: "source.blade" }
					]
				}
			],
			lang: [{
				token: "keyword.operator.blade",
				regex: "(?:!=|!|<=|>=|<|>|===|==|=|\\+\\+|\\;|\\,|%|&&|\\|\\|)|\\b(?:and|or|eq|neq|ne|gte|gt|ge|lte|lt|le|not|mod|as)\\b"
			}, {
				token: "constant.language.blade",
				regex: "\\b(?:TRUE|FALSE|true|false)\\b"
			}],
			strings: [{
				token: "punctuation.definition.string.begin.blade",
				regex: "\"",
				push: [
					{
						token: "punctuation.definition.string.end.blade",
						regex: "\"",
						next: "pop"
					},
					{
						token: "string.character.escape.blade",
						regex: "\\\\."
					},
					{ defaultToken: "string.quoted.single.blade" }
				]
			}, {
				token: "punctuation.definition.string.begin.blade",
				regex: "'",
				push: [
					{
						token: "punctuation.definition.string.end.blade",
						regex: "'",
						next: "pop"
					},
					{
						token: "string.character.escape.blade",
						regex: "\\\\."
					},
					{ defaultToken: "string.quoted.double.blade" }
				]
			}],
			variables: [
				{
					token: "variable.blade",
					regex: "\\$([a-zA-Z_][a-zA-Z0-9_]*)\\b"
				},
				{
					token: ["keyword.operator.blade", "constant.other.property.blade"],
					regex: "(->)([a-zA-Z_][a-zA-Z0-9_]*)\\b"
				},
				{
					token: [
						"keyword.operator.blade",
						"meta.function-call.object.blade",
						"punctuation.definition.variable.blade",
						"variable.blade",
						"punctuation.definition.variable.blade"
					],
					regex: "(->)([a-zA-Z_][a-zA-Z0-9_]*)(\\()(.*?)(\\))"
				}
			]
		};
		var bladeStart = bladeRules.start;
		for (var rule in this.$rules) this.$rules[rule].unshift.apply(this.$rules[rule], bladeStart);
		Object.keys(bladeRules).forEach(function(x) {
			if (!this.$rules[x]) this.$rules[x] = bladeRules[x];
		}, this);
		this.normalizeRules();
	};
	oop.inherits(PHPLaravelBladeHighlightRules, PhpHighlightRules);
	exports.PHPLaravelBladeHighlightRules = PHPLaravelBladeHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/php_laravel_blade.js
var require_php_laravel_blade = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var PHPLaravelBladeHighlightRules = require_php_laravel_blade_highlight_rules().PHPLaravelBladeHighlightRules;
	var PHPMode = require_php().Mode;
	var JavaScriptMode = require_javascript().Mode;
	var CssMode = require_css().Mode;
	var HtmlMode = require_html().Mode;
	var Mode = function() {
		PHPMode.call(this);
		this.HighlightRules = PHPLaravelBladeHighlightRules;
		this.createModeDelegates({
			"js-": JavaScriptMode,
			"css-": CssMode,
			"html-": HtmlMode
		});
	};
	oop.inherits(Mode, PHPMode);
	(function() {
		this.$id = "ace/mode/php_laravel_blade";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
//#endregion
export default require_php_laravel_blade();
