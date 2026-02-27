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
var require_rust_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var DocCommentHighlightRules = require_doc_comment_highlight_rules().DocCommentHighlightRules;
	var stringEscape = /\\(?:[nrt0'"\\]|x[\da-fA-F]{2}|u\{[\da-fA-F]{6}\})/.source;
	var wordPattern = /[a-zA-Z_\xa1-\uffff][a-zA-Z0-9_\xa1-\uffff]*/.source;
	var RustHighlightRules$1 = function() {
		var keywordMapper = this.createKeywordMapper({
			"keyword.source.rust": "abstract|alignof|as|async|await|become|box|break|catch|continue|const|crate|default|do|dyn|else|enum|extern|for|final|if|impl|in|let|loop|macro|match|mod|move|mut|offsetof|override|priv|proc|pub|pure|ref|return|self|sizeof|static|struct|super|trait|type|typeof|union|unsafe|unsized|use|virtual|where|while|yield|try",
			"storage.type.source.rust": "Self|isize|usize|char|bool|u8|u16|u32|u64|u128|f16|f32|f64|i8|i16|i32|i64|i128|str|option|either|c_float|c_double|c_void|FILE|fpos_t|DIR|dirent|c_char|c_schar|c_uchar|c_short|c_ushort|c_int|c_uint|c_long|c_ulong|size_t|ptrdiff_t|clock_t|time_t|c_longlong|c_ulonglong|intptr_t|uintptr_t|off_t|dev_t|ino_t|pid_t|mode_t|ssize_t",
			"constant.language.source.rust": "true|false|Some|None|Ok|Err|FALSE|TRUE",
			"support.constant.source.rust": "EXIT_FAILURE|EXIT_SUCCESS|RAND_MAX|EOF|SEEK_SET|SEEK_CUR|SEEK_END|_IOFBF|_IONBF|_IOLBF|BUFSIZ|FOPEN_MAX|FILENAME_MAX|L_tmpnam|TMP_MAX|O_RDONLY|O_WRONLY|O_RDWR|O_APPEND|O_CREAT|O_EXCL|O_TRUNC|S_IFIFO|S_IFCHR|S_IFBLK|S_IFDIR|S_IFREG|S_IFMT|S_IEXEC|S_IWRITE|S_IREAD|S_IRWXU|S_IXUSR|S_IWUSR|S_IRUSR|F_OK|R_OK|W_OK|X_OK|STDIN_FILENO|STDOUT_FILENO|STDERR_FILENO",
			"constant.language": "macro_rules|mac_variant"
		}, "identifier");
		this.$rules = {
			start: [
				{
					token: "variable.other.source.rust",
					regex: "'" + wordPattern + "(?![\\'])"
				},
				{
					token: "string.quoted.single.source.rust",
					regex: "'(?:[^'\\\\]|" + stringEscape + ")'"
				},
				{
					token: "identifier",
					regex: "r#" + wordPattern + "\\b"
				},
				{
					stateName: "bracketedComment",
					onMatch: function(value, currentState, stack) {
						var stringStart = value.replace(/^\w+/, "");
						stack.unshift(this.next, stringStart.length, currentState);
						return "string.quoted.raw.source.rust";
					},
					regex: /(b|c)?r#*"/,
					next: [{
						onMatch: function(value, currentState, stack) {
							var token = "string.quoted.raw.source.rust";
							if (value.length >= stack[1]) {
								if (value.length > stack[1]) token = "invalid";
								stack.shift();
								stack.shift();
								this.next = stack.shift();
							} else this.next = "";
							return token;
						},
						regex: /"#*/,
						next: "start"
					}, { defaultToken: "string.quoted.raw.source.rust" }]
				},
				{
					token: "string.quoted.double.source.rust",
					regex: "\"",
					push: [
						{
							token: "string.quoted.double.source.rust",
							regex: "\"",
							next: "pop"
						},
						{
							token: "constant.character.escape.source.rust",
							regex: stringEscape
						},
						{ defaultToken: "string.quoted.double.source.rust" }
					]
				},
				{
					token: [
						"keyword.source.rust",
						"text",
						"entity.name.function.source.rust",
						"punctuation"
					],
					regex: "\\b(fn)(\\s+)((?:r#)?" + wordPattern + ")(<)(?!<)",
					push: "generics"
				},
				{
					token: [
						"keyword.source.rust",
						"text",
						"entity.name.function.source.rust"
					],
					regex: "\\b(fn)(\\s+)((?:r#)?" + wordPattern + ")"
				},
				{
					token: ["support.constant", "punctuation"],
					regex: "(" + wordPattern + "::)(<)(?!<)",
					push: "generics"
				},
				{
					token: "support.constant",
					regex: wordPattern + "::"
				},
				{
					token: "variable.language.source.rust",
					regex: "\\bself\\b"
				},
				DocCommentHighlightRules.getStartRule("doc-start"),
				{
					token: "comment.line.doc.source.rust",
					regex: "///.*$"
				},
				{
					token: "comment.line.doc.source.rust",
					regex: "//!.*$"
				},
				{
					token: "comment.line.double-dash.source.rust",
					regex: "//.*$"
				},
				{
					token: "comment.start.block.source.rust",
					regex: "/\\*",
					stateName: "comment",
					push: [
						{
							token: "comment.start.block.source.rust",
							regex: "/\\*",
							push: "comment"
						},
						{
							token: "comment.end.block.source.rust",
							regex: "\\*/",
							next: "pop"
						},
						{ defaultToken: "comment.block.source.rust" }
					]
				},
				{
					token: [
						"keyword.source.rust",
						"identifier",
						"punctuaction"
					],
					regex: "(?:(impl)|(" + wordPattern + "))(<)(?!<)",
					stateName: "generics",
					push: [
						{
							token: "keyword.operator",
							regex: /<<|=/
						},
						{
							token: "punctuaction",
							regex: "<(?!<)",
							push: "generics"
						},
						{
							token: "variable.other.source.rust",
							regex: "'" + wordPattern + "(?![\\'])"
						},
						{
							token: "storage.type.source.rust",
							regex: "\\b(u8|u16|u32|u64|u128|usize|i8|i16|i32|i64|i128|isize|char|bool)\\b"
						},
						{
							token: "keyword",
							regex: "\\b(?:const|dyn)\\b"
						},
						{
							token: "punctuation",
							regex: ">",
							next: "pop"
						},
						{ include: "punctuation" },
						{ include: "operators" },
						{ include: "constants" },
						{
							token: "identifier",
							regex: "\\b" + wordPattern + "\\b"
						}
					]
				},
				{
					token: keywordMapper,
					regex: wordPattern
				},
				{
					token: "meta.preprocessor.source.rust",
					regex: "\\b\\w\\(\\w\\)*!|#\\[[\\w=\\(\\)_]+\\]\\b"
				},
				{ include: "punctuation" },
				{ include: "operators" },
				{ include: "constants" }
			],
			punctuation: [
				{
					token: "paren.lparen",
					regex: /[\[({]/
				},
				{
					token: "paren.rparen",
					regex: /[\])}]/
				},
				{
					token: "punctuation.operator",
					regex: /[?:,;.]/
				}
			],
			operators: [{
				token: "keyword.operator",
				regex: /\$|[-=]>|[-+%^=!&|<>]=?|[*/](?![*/])=?/
			}],
			constants: [{
				token: "constant.numeric.source.rust",
				regex: /\b(?:0x[a-fA-F0-9_]+|0o[0-7_]+|0b[01_]+|[0-9][0-9_]*(?!\.))(?:[iu](?:size|8|16|32|64|128))?\b/
			}, {
				token: "constant.numeric.source.rust",
				regex: /\b(?:[0-9][0-9_]*)(?:\.[0-9][0-9_]*)?(?:[Ee][+-][0-9][0-9_]*)?(?:f32|f64)?\b/
			}]
		};
		this.embedRules(DocCommentHighlightRules, "doc-", [DocCommentHighlightRules.getEndRule("start")]);
		this.normalizeRules();
	};
	RustHighlightRules$1.metaData = {
		fileTypes: ["rs", "rc"],
		foldingStartMarker: "^.*\\bfn\\s*(\\w+\\s*)?\\([^\\)]*\\)(\\s*\\{[^\\}]*)?\\s*$",
		foldingStopMarker: "^\\s*\\}",
		name: "Rust",
		scopeName: "source.rust"
	};
	oop$1.inherits(RustHighlightRules$1, TextHighlightRules);
	exports.RustHighlightRules = RustHighlightRules$1;
}));
var require_rust = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var RustHighlightRules = require_rust_highlight_rules().RustHighlightRules;
	var FoldMode = require_cstyle().FoldMode;
	var Mode = function() {
		this.HighlightRules = RustHighlightRules;
		this.foldingRules = new FoldMode();
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = "//";
		this.blockComment = {
			start: "/*",
			end: "*/",
			nestable: true
		};
		this.$quotes = { "\"": "\"" };
		this.$id = "ace/mode/rust";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_rust();
