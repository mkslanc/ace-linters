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
import { a as require_text_highlight_rules } from "./text-B9A1mx6l.js";
import "./token_iterator-CbfYmntj.js";
import "./fold_mode-D1xG2KFM.js";
import { t as require_cstyle } from "./cstyle-C6ktp4d4.js";
import "./doc_comment_highlight_rules-C7lFDmmX.js";
import "./matching_brace_outdent-CSXbwYsT.js";
import "./c_cpp_highlight_rules-P52zScqq.js";
import { t as require_c_cpp } from "./c_cpp-BKzW7GeF.js";
var require_protobuf_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var ProtobufHighlightRules$1 = function() {
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
	oop$1.inherits(ProtobufHighlightRules$1, TextHighlightRules);
	exports.ProtobufHighlightRules = ProtobufHighlightRules$1;
}));
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
export default require_protobuf();
