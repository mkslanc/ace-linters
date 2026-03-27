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
import { a as require_text_highlight_rules } from "./text-x9TxHOMd.js";
import "./token_iterator-B0gzmLw-.js";
import "./fold_mode-DLWDk-fx.js";
import { t as require_cstyle } from "./cstyle-DX2ORGlO.js";
import "./doc_comment_highlight_rules-Csht38Fi.js";
import "./matching_brace_outdent-BNxYFHLW.js";
import "./c_cpp_highlight_rules-D6Yv1qPu.js";
import { t as require_c_cpp } from "./c_cpp-DHIZzEy0.js";
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
