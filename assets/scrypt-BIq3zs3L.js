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
import { t as require_cstyle } from "./cstyle-C6ktp4d4.js";
import { t as require_doc_comment_highlight_rules } from "./doc_comment_highlight_rules-C7lFDmmX.js";
var require_scrypt_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var DocCommentHighlightRules = require_doc_comment_highlight_rules().DocCommentHighlightRules;
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var scryptHighlightRules$1 = function() {
		var keywords = "contract|library|loop|new|private|public|if|else|struct|type|require|static|const|import|exit|return|asm";
		var buildinConstants = "true|false";
		var langClasses = "function|auto|constructor|bytes|int|bool|SigHashPreimage|PrivKey|PubKey|Sig|Ripemd160|Sha1|Sha256|SigHashType|SigHashPreimage|OpCodeType";
		var keywordMapper = this.createKeywordMapper({
			"variable.language": "this",
			"keyword": keywords,
			"constant.language": buildinConstants,
			"support.function": langClasses
		}, "identifier");
		this.$rules = {
			"start": [
				{
					token: "comment",
					regex: "\\/\\/.*$"
				},
				DocCommentHighlightRules.getStartRule("doc-start"),
				{
					token: "comment",
					regex: "\\/\\*",
					next: "comment"
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
					regex: /0(?:[xX][0-9a-fA-F][0-9a-fA-F_]*|[bB][01][01_]*)[LlSsDdFfYy]?\b/
				},
				{
					token: "constant.numeric",
					regex: /[+-]?\d[\d_]*(?:(?:\.[\d_]*)?(?:[eE][+-]?[\d_]+)?)?[LlSsDdFfYy]?\b/
				},
				{
					token: "constant.language.boolean",
					regex: "(?:true|false)\\b"
				},
				{
					token: [
						"support.function.math.scrypt",
						"text",
						"text"
					],
					regex: /\b(abs|min|max|within|ripemd160|sha1|sha256|hash160|hash256|checkSig|checkMultiSig|num2bin|pack|unpack|len|reverseBytes|repeat)(\s*)(\()/
				},
				{
					token: [
						"entity.name.type.scrypt",
						"text",
						"text",
						"text",
						"variable.object.property.scrypt"
					],
					regex: /\b(SigHash)(\s*)(\.)(\s*)(ANYONECANPAY|ALL|FORKID|NONE|SINGLE)\b/
				},
				{
					token: [
						"entity.name.type.scrypt",
						"text",
						"text",
						"text",
						"variable.object.property.scrypt"
					],
					regex: /\b(OpCode)(\s*)(\.)(\s*)(OP_PUSHDATA1|OP_PUSHDATA2|OP_PUSHDATA4|OP_0|OP_FALSE|OP_1NEGATE|OP_1|OP_TRUE|OP_2|OP_3|OP_4|OP_5|OP_6|OP_7|OP_8|OP_9|OP_10|OP_11|OP_12|OP_13|OP_14|OP_15|OP_16|OP_1ADD|OP_1SUB|OP_NEGATE|OP_ABS|OP_NOT|OP_0NOTEQUAL|OP_ADD|OP_SUB|OP_MUL|OP_DIV|OP_MOD|OP_LSHIFT|OP_RSHIFT|OP_BOOLAND|OP_BOOLOR|OP_NUMEQUAL|OP_NUMEQUALVERIFY|OP_NUMNOTEQUAL|OP_LESSTHAN|OP_GREATERTHAN|OP_LESSTHANOREQUAL|OP_GREATERTHANOREQUAL|OP_MIN|OP_MAX|OP_WITHIN|OP_CAT|OP_SPLIT|OP_BIN2NUM|OP_NUM2BIN|OP_SIZE|OP_NOP|OP_IF|OP_NOTIF|OP_ELSE|OP_ENDIF|OP_VERIFY|OP_RETURN|OP_TOALTSTACK|OP_FROMALTSTACK|OP_IFDUP|OP_DEPTH|OP_DROP|OP_DUP|OP_NIP|OP_OVER|OP_PICK|OP_ROLL|OP_ROT|OP_SWAP|OP_TUCK|OP_2DROP|OP_2DUP|OP_3DUP|OP_2OVER|OP_2ROT|OP_2SWAP|OP_RIPEMD160|OP_SHA1|OP_SHA256|OP_HASH160|OP_HASH256|OP_CODESEPARATOR|OP_CHECKSIG|OP_CHECKSIGVERIFY|OP_CHECKMULTISIG|OP_CHECKMULTISIGVERIFY|OP_INVERT|OP_AND|OP_OR|OP_XOR|OP_EQUAL|OP_EQUALVERIFY)\b/
				},
				{
					token: "entity.name.type.scrypt",
					regex: /\b(?:P2PKH|P2PK|Tx|HashPuzzleRipemd160|HashPuzzleSha1|HashPuzzleSha256|HashPuzzleHash160|OpCode|SigHash)\b/
				},
				{
					token: [
						"punctuation.separator.period.scrypt",
						"text",
						"entity.name.function.scrypt",
						"text",
						"punctuation.definition.parameters.begin.bracket.round.scrypt"
					],
					regex: /(\.)([^\S$\r]*)([\w][\w\d]*)(\s*)(\()/,
					push: [{
						token: "punctuation.definition.parameters.end.bracket.round.scrypt",
						regex: /\)/,
						next: "pop"
					}, { defaultToken: "start" }]
				},
				{
					token: keywordMapper,
					regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
				},
				{
					token: "keyword.operator",
					regex: "!|\\$|%|&|\\||\\^|\\*|\\/|\\-\\-|\\-|\\+\\+|\\+|~|==|=|!=|<=|>=|<>|<|>|!|&&|\\|\\||\\?|\\:|\\*=|\\/=|%=|\\+=|\\-=|&=|\\|=|\\^="
				},
				{
					token: "lparen",
					regex: "[[({]"
				},
				{
					token: "rparen",
					regex: "[\\])}]"
				},
				{
					token: "text",
					regex: "\\s+"
				}
			],
			"comment": [{
				token: "comment",
				regex: "\\*\\/",
				next: "start"
			}, { defaultToken: "comment" }]
		};
		this.embedRules(DocCommentHighlightRules, "doc-", [DocCommentHighlightRules.getEndRule("start")]);
		this.normalizeRules();
	};
	oop$1.inherits(scryptHighlightRules$1, TextHighlightRules);
	exports.scryptHighlightRules = scryptHighlightRules$1;
}));
var require_scrypt = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var scryptHighlightRules = require_scrypt_highlight_rules().scryptHighlightRules;
	var FoldMode = require_cstyle().FoldMode;
	var Mode = function() {
		this.HighlightRules = scryptHighlightRules;
		this.foldingRules = new FoldMode();
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = "//";
		this.blockComment = {
			start: "/*",
			end: "*/"
		};
		this.$quotes = {
			"\"": "\"",
			"'": "'"
		};
		this.createWorker = function(session) {
			return null;
		};
		this.$id = "ace/mode/scrypt";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_scrypt();
