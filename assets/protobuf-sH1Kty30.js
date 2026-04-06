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
import { a as require_text_highlight_rules } from "./text-D8sm5DzM.js";
import "./token_iterator-BNxpI84f.js";
import "./fold_mode-D_StAfa6.js";
import { t as require_cstyle } from "./cstyle-C7DhJywu.js";
import "./doc_comment_highlight_rules-DaZtgjLZ.js";
import "./matching_brace_outdent-BSN6387q.js";
import "./c_cpp_highlight_rules-BJmeUa0L.js";
import { t as require_c_cpp } from "./c_cpp-4LE4_F16.js";
//#region node_modules/ace-code/src/mode/protobuf_highlight_rules.js
var require_protobuf_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var ProtobufHighlightRules = function() {
		var builtinTypes = "double|float|int32|int64|uint32|uint64|sint32|sint64|fixed32|fixed64|sfixed32|sfixed64|bool|string|bytes";
		var keywordDeclaration = "message|required|optional|repeated|package|import|option|enum";
		var keywordMapper = this.createKeywordMapper({
			"keyword.declaration.protobuf": keywordDeclaration,
			"support.type": builtinTypes
		}, "identifier");
		this.$rules = {
			"start": [
				{
					token: "comment",
					regex: /\/\/.*$/
				},
				{
					token: "comment",
					regex: /\/\*/,
					next: "comment"
				},
				{
					token: "constant",
					regex: "<[^>]+>"
				},
				{
					regex: "=",
					token: "keyword.operator.assignment.protobuf"
				},
				{
					token: "string",
					regex: "[\"](?:(?:\\\\.)|(?:[^\"\\\\]))*?[\"]"
				},
				{
					token: "string",
					regex: "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"
				},
				{
					token: "constant.numeric",
					regex: "0[xX][0-9a-fA-F]+\\b"
				},
				{
					token: "constant.numeric",
					regex: "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
				},
				{
					token: keywordMapper,
					regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
				}
			],
			"comment": [{
				token: "comment",
				regex: "\\*\\/",
				next: "start"
			}, { defaultToken: "comment" }]
		};
		this.normalizeRules();
	};
	oop.inherits(ProtobufHighlightRules, TextHighlightRules);
	exports.ProtobufHighlightRules = ProtobufHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/protobuf.js
var require_protobuf = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var CMode = require_c_cpp().Mode;
	var ProtobufHighlightRules = require_protobuf_highlight_rules().ProtobufHighlightRules;
	var CStyleFoldMode = require_cstyle().FoldMode;
	var Mode = function() {
		CMode.call(this);
		this.foldingRules = new CStyleFoldMode();
		this.HighlightRules = ProtobufHighlightRules;
	};
	oop.inherits(Mode, CMode);
	(function() {
		this.lineCommentStart = "//";
		this.blockComment = {
			start: "/*",
			end: "*/"
		};
		this.$id = "ace/mode/protobuf";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
//#endregion
export default require_protobuf();
