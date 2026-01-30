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
var require_graphqlschema_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var GraphQLSchemaHighlightRules$1 = function() {
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
	oop$1.inherits(GraphQLSchemaHighlightRules$1, TextHighlightRules);
	exports.GraphQLSchemaHighlightRules = GraphQLSchemaHighlightRules$1;
}));
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
