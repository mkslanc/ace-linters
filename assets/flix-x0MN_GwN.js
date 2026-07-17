import { t as __commonJSMin } from "./modulepreload-polyfill-DxDZhch-.js";
import { t as require_oop } from "./oop-3KT-lR14.js";
import { a as require_text_highlight_rules, t as require_text } from "./text-BG8jWbzl.js";
//#region node_modules/ace-code/src/mode/flix_highlight_rules.js
var require_flix_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var FlixHighlightRules = function() {
		var keywordMapper = this.createKeywordMapper({
			"keyword": "use|checked_cast|checked_ecast|unchecked_cast|as|discard|from|into|inject|project|solve|query|where|select|force|import|region|handler|instanceof|new|pquery|psolve|run|super",
			"keyword.control": "choose|forA|forM|foreach|yield|if|else|case|match|ematch|try|catch|throw|spawn|par",
			"keyword.operator": "not|and|or|fix",
			"storage.type": "eff|def|redef|law|enum|case|type|alias|trait|instance|mod|struct|let",
			"storage.modifier": "with|lazy|lawful|pub|override|sealed|static|mut|unsafe",
			"support.type": "Unit|Bool|Char|Float32|Float64|Int8|Int16|Int32|Int64|BigInt|String"
		}, "identifier");
		this.$rules = {
			"start": [
				{
					token: "comment.line",
					regex: "\\/\\/.*$"
				},
				{
					token: "comment.block",
					regex: "\\/\\*",
					next: "comment"
				},
				{
					token: "string",
					regex: "\"",
					next: "string"
				},
				{
					token: "string.regexp",
					regex: "regex\"",
					next: "regex"
				},
				{
					token: "constant.character",
					regex: "'",
					next: "char"
				},
				{
					token: "constant.numeric",
					regex: "0x[a-fA-F0-9](_*[a-fA-F0-9])*(i8|i16|i32|i64|ii)?\\b"
				},
				{
					token: "constant.numeric",
					regex: "[0-9](_*[0-9])*\\.[0-9](_*[0-9])*(f32|f64)?\\b"
				},
				{
					token: "constant.numeric",
					regex: "[0-9](_*[0-9])*(i8|i16|i32|i64|ii)?\\b"
				},
				{
					token: "constant.language.boolean",
					regex: "(true|false)\\b"
				},
				{
					token: "constant.language",
					regex: "null\\b"
				},
				{
					token: "keyword.operator",
					regex: "\\->|~>|<\\-|=>"
				},
				{
					token: "storage.modifier",
					regex: "@(Deprecated|Experimental|Internal|ParallelWhenPure|Parallel|LazyWhenPure|Lazy|Skip|Test)\\b"
				},
				{
					token: "keyword",
					regex: "(\\?\\?\\?|\\?[a-zA-Z0-9]+)"
				},
				{
					token: keywordMapper,
					regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
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
			"comment": [{
				token: "comment.block",
				regex: "\\*\\/",
				next: "start"
			}, { defaultToken: "comment.block" }],
			"string": [
				{
					token: "constant.character.escape",
					regex: "\\\\(u[0-9a-fA-F]{4})"
				},
				{
					token: "constant.character.escape",
					regex: "\\\\."
				},
				{
					token: "string",
					regex: "\"",
					next: "start"
				},
				{
					token: "string",
					regex: "[^\"\\\\]+"
				}
			],
			"regex": [
				{
					token: "constant.character.escape",
					regex: "\\\\(u[0-9a-fA-F]{4})"
				},
				{
					token: "constant.character.escape",
					regex: "\\\\."
				},
				{
					token: "string.regexp",
					regex: "\"",
					next: "start"
				},
				{
					token: "string.regexp",
					regex: "[^\"\\\\]+"
				}
			],
			"char": [
				{
					token: "constant.character.escape",
					regex: "\\\\(u[0-9a-fA-F]{4})"
				},
				{
					token: "constant.character.escape",
					regex: "\\\\."
				},
				{
					token: "constant.character",
					regex: "'",
					next: "start"
				},
				{
					token: "constant.character",
					regex: "[^'\\\\]+"
				}
			]
		};
	};
	oop.inherits(FlixHighlightRules, TextHighlightRules);
	exports.FlixHighlightRules = FlixHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/flix.js
var require_flix = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var FlixHighlightRules = require_flix_highlight_rules().FlixHighlightRules;
	var Mode = function() {
		this.HighlightRules = FlixHighlightRules;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.$id = "ace/mode/flix";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
//#endregion
export default require_flix();
