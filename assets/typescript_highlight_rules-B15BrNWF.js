import { t as __commonJSMin } from "./chunk-iA-Slpst.js";
import { t as require_oop } from "./oop-DcdK5Mrs.js";
import { t as require_javascript_highlight_rules } from "./javascript_highlight_rules-DP2X209F.js";
var require_typescript_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var JavaScriptHighlightRules = require_javascript_highlight_rules().JavaScriptHighlightRules;
	var TypeScriptHighlightRules = function(options) {
		var tsRules = [
			{
				token: [
					"storage.type",
					"text",
					"entity.name.function.ts"
				],
				regex: "(function)(\\s+)([a-zA-Z0-9$_¡-￿][a-zA-Z0-9d$_¡-￿]*)"
			},
			{
				token: "keyword",
				regex: "(?:\\b(constructor|declare|interface|as|AS|public|private|extends|export|super|readonly|module|namespace|abstract|implements)\\b)"
			},
			{
				token: ["keyword", "storage.type.variable.ts"],
				regex: "(class|type)(\\s+[a-zA-Z0-9_?.$][\\w?.$]*)"
			},
			{
				token: "keyword",
				regex: "\\b(?:super|export|import|keyof|infer)\\b"
			},
			{
				token: ["storage.type.variable.ts"],
				regex: "(?:\\b(this\\.|string\\b|bool\\b|boolean\\b|number\\b|true\\b|false\\b|undefined\\b|any\\b|null\\b|(?:unique )?symbol\\b|object\\b|never\\b|enum\\b))"
			}
		];
		var JSRules = new JavaScriptHighlightRules({ jsx: (options && options.jsx) == true }).getRules();
		JSRules.no_regex = tsRules.concat(JSRules.no_regex);
		this.$rules = JSRules;
	};
	oop.inherits(TypeScriptHighlightRules, JavaScriptHighlightRules);
	exports.TypeScriptHighlightRules = TypeScriptHighlightRules;
}));
export { require_typescript_highlight_rules as t };
