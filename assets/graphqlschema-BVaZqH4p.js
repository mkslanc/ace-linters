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
//#region node_modules/ace-code/src/mode/graphqlschema_highlight_rules.js
var require_graphqlschema_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var GraphQLSchemaHighlightRules = function() {
		var keywords = "type|interface|union|enum|schema|input|implements|extends|scalar";
		var dataTypes = "Int|Float|String|ID|Boolean";
		var keywordMapper = this.createKeywordMapper({
			"keyword": keywords,
			"storage.type": dataTypes
		}, "identifier");
		this.$rules = { "start": [
			{
				token: "comment",
				regex: "#.*$"
			},
			{
				token: "paren.lparen",
				regex: /[\[({]/,
				next: "start"
			},
			{
				token: "paren.rparen",
				regex: /[\])}]/
			},
			{
				token: keywordMapper,
				regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
			}
		] };
		this.normalizeRules();
	};
	oop.inherits(GraphQLSchemaHighlightRules, TextHighlightRules);
	exports.GraphQLSchemaHighlightRules = GraphQLSchemaHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/graphqlschema.js
var require_graphqlschema = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var GraphQLSchemaHighlightRules = require_graphqlschema_highlight_rules().GraphQLSchemaHighlightRules;
	var FoldMode = require_cstyle().FoldMode;
	var Mode = function() {
		this.HighlightRules = GraphQLSchemaHighlightRules;
		this.foldingRules = new FoldMode();
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = "#";
		this.$id = "ace/mode/graphqlschema";
		this.snippetFileId = "ace/snippets/graphqlschema";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
//#endregion
export default require_graphqlschema();
