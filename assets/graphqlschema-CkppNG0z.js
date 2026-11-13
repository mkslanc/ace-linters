import { t as __commonJSMin } from "./rolldown-runtime-DQp2zzRu.js";
import { t as require_oop } from "./oop-CAYBcRVL.js";
import { a as require_text_highlight_rules, t as require_text } from "./text-SKNm_D_P.js";
import { t as require_cstyle } from "./cstyle-DG0AEg3n.js";
// node_modules/ace-code/src/mode/graphqlschema_highlight_rules.js
var require_graphqlschema_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var GraphQLSchemaHighlightRules = function() {
		var keywordMapper = this.createKeywordMapper({
			"keyword": "type|interface|union|enum|schema|input|implements|extends|scalar",
			"storage.type": "Int|Float|String|ID|Boolean"
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
// node_modules/ace-code/src/mode/graphqlschema.js
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
export default require_graphqlschema();
