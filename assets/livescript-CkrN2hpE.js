import { t as __commonJSMin } from "./chunk-iA-Slpst.js";
import "./useragent-BODERP_7.js";
import "./dom-BBjJ92-n.js";
import "./range-BUVqNbwc.js";
import "./lang-DcNOSqFo.js";
import "./config-DPm1ug3B.js";
import "./event_emitter-BGfSYA24.js";
import "./textmate-zFNmb5zU.js";
import { t as require_tokenizer } from "./tokenizer-C2b-GJMk.js";
import { r as require_cstyle, t as require_text } from "./text-B9A1mx6l.js";
import "./token_iterator-CbfYmntj.js";
import { t as require_matching_brace_outdent } from "./matching_brace_outdent-CSXbwYsT.js";
var require_livescript = /* @__PURE__ */ __commonJSMin(((exports) => {
	var identifier = "(?![\\d\\s])[$\\w\\xAA-\\uFFDC](?:(?!\\s)[$\\w\\xAA-\\uFFDC]|-[A-Za-z])*", LiveScriptMode, keywordend, stringfill;
	exports.Mode = LiveScriptMode = function(superclass) {
		var indenter, prototype = extend$((import$(LiveScriptMode$1, superclass).displayName = "LiveScriptMode", LiveScriptMode$1), superclass).prototype;
		function LiveScriptMode$1() {
			var that;
			this.$tokenizer = new (require_tokenizer()).Tokenizer(LiveScriptMode$1.Rules);
			if (that = require_matching_brace_outdent()) this.$outdent = new that.MatchingBraceOutdent();
			this.$id = "ace/mode/livescript";
			this.$behaviour = new (require_cstyle()).CstyleBehaviour();
		}
		indenter = RegExp("(?:[({[=:]|[-~]>|\\b(?:e(?:lse|xport)|d(?:o|efault)|t(?:ry|hen)|finally|import(?:\\s*all)?|const|var|let|new|catch(?:\\s*" + identifier + ")?))\\s*$");
		prototype.getNextLineIndent = function(state, line, tab) {
			var indent = this.$getIndent(line), tokens = this.$tokenizer.getLineTokens(line, state).tokens;
			if (!(tokens.length && tokens[tokens.length - 1].type === "comment")) {
				if (state === "start" && indenter.test(line)) indent += tab;
			}
			return indent;
		};
		prototype.lineCommentStart = "#";
		prototype.blockComment = {
			start: "###",
			end: "###"
		};
		prototype.checkOutdent = function(state, line, input) {
			var ref$;
			return (ref$ = this.$outdent) != null ? ref$.checkOutdent(line, input) : void 0;
		};
		prototype.autoOutdent = function(state, doc, row) {
			var ref$;
			return (ref$ = this.$outdent) != null ? ref$.autoOutdent(doc, row) : void 0;
		};
		return LiveScriptMode$1;
	}(require_text().Mode);
	keywordend = "(?![$\\w]|-[A-Za-z]|\\s*:(?![:=]))";
	stringfill = { defaultToken: "string" };
	LiveScriptMode.Rules = {
		start: [
			{
				token: "keyword",
				regex: "(?:t(?:h(?:is|row|en)|ry|ypeof!?)|c(?:on(?:tinue|st)|a(?:se|tch)|lass)|i(?:n(?:stanceof)?|mp(?:ort(?:\\s+all)?|lements)|[fs])|d(?:e(?:fault|lete|bugger)|o)|f(?:or(?:\\s+own)?|inally|unction)|s(?:uper|witch)|e(?:lse|x(?:tends|port)|val)|a(?:nd|rguments)|n(?:ew|ot)|un(?:less|til)|w(?:hile|ith)|o[fr]|return|break|let|var|loop)" + keywordend
			},
			{
				token: "constant.language",
				regex: "(?:true|false|yes|no|on|off|null|void|undefined)" + keywordend
			},
			{
				token: "invalid.illegal",
				regex: "(?:p(?:ackage|r(?:ivate|otected)|ublic)|i(?:mplements|nterface)|enum|static|yield)" + keywordend
			},
			{
				token: "language.support.class",
				regex: "(?:R(?:e(?:gExp|ferenceError)|angeError)|S(?:tring|yntaxError)|E(?:rror|valError)|Array|Boolean|Date|Function|Number|Object|TypeError|URIError)" + keywordend
			},
			{
				token: "language.support.function",
				regex: "(?:is(?:NaN|Finite)|parse(?:Int|Float)|Math|JSON|(?:en|de)codeURI(?:Component)?)" + keywordend
			},
			{
				token: "variable.language",
				regex: "(?:t(?:hat|il|o)|f(?:rom|allthrough)|it|by|e)" + keywordend
			},
			{
				token: "identifier",
				regex: identifier + "\\s*:(?![:=])"
			},
			{
				token: "variable",
				regex: identifier
			},
			{
				token: "keyword.operator",
				regex: "(?:\\.{3}|\\s+\\?)"
			},
			{
				token: "keyword.variable",
				regex: "(?:@+|::|\\.\\.)",
				next: "key"
			},
			{
				token: "keyword.operator",
				regex: "\\.\\s*",
				next: "key"
			},
			{
				token: "string",
				regex: "\\\\\\S[^\\s,;)}\\]]*"
			},
			{
				token: "string.doc",
				regex: "'''",
				next: "qdoc"
			},
			{
				token: "string.doc",
				regex: "\"\"\"",
				next: "qqdoc"
			},
			{
				token: "string",
				regex: "'",
				next: "qstring"
			},
			{
				token: "string",
				regex: "\"",
				next: "qqstring"
			},
			{
				token: "string",
				regex: "`",
				next: "js"
			},
			{
				token: "string",
				regex: "<\\[",
				next: "words"
			},
			{
				token: "string.regex",
				regex: "//",
				next: "heregex"
			},
			{
				token: "comment.doc",
				regex: "/\\*",
				next: "comment"
			},
			{
				token: "comment",
				regex: "#.*"
			},
			{
				token: "string.regex",
				regex: "\\/(?:[^[\\/\\n\\\\]*(?:(?:\\\\.|\\[[^\\]\\n\\\\]*(?:\\\\.[^\\]\\n\\\\]*)*\\])[^[\\/\\n\\\\]*)*)\\/[gimy$]{0,4}",
				next: "key"
			},
			{
				token: "constant.numeric",
				regex: "(?:0x[\\da-fA-F][\\da-fA-F_]*|(?:[2-9]|[12]\\d|3[0-6])r[\\da-zA-Z][\\da-zA-Z_]*|(?:\\d[\\d_]*(?:\\.\\d[\\d_]*)?|\\.\\d[\\d_]*)(?:e[+-]?\\d[\\d_]*)?[\\w$]*)"
			},
			{
				token: "lparen",
				regex: "[({[]"
			},
			{
				token: "rparen",
				regex: "[)}\\]]",
				next: "key"
			},
			{
				token: "keyword.operator",
				regex: "[\\^!|&%+\\-]+"
			},
			{
				token: "text",
				regex: "\\s+"
			}
		],
		heregex: [
			{
				token: "string.regex",
				regex: ".*?//[gimy$?]{0,4}",
				next: "start"
			},
			{
				token: "string.regex",
				regex: "\\s*#{"
			},
			{
				token: "comment.regex",
				regex: "\\s+(?:#.*)?"
			},
			{ defaultToken: "string.regex" }
		],
		key: [
			{
				token: "keyword.operator",
				regex: "[.?@!]+"
			},
			{
				token: "identifier",
				regex: identifier,
				next: "start"
			},
			{
				token: "text",
				regex: "",
				next: "start"
			}
		],
		comment: [{
			token: "comment.doc",
			regex: ".*?\\*/",
			next: "start"
		}, { defaultToken: "comment.doc" }],
		qdoc: [{
			token: "string",
			regex: ".*?'''",
			next: "key"
		}, stringfill],
		qqdoc: [{
			token: "string",
			regex: ".*?\"\"\"",
			next: "key"
		}, stringfill],
		qstring: [{
			token: "string",
			regex: "[^\\\\']*(?:\\\\.[^\\\\']*)*'",
			next: "key"
		}, stringfill],
		qqstring: [{
			token: "string",
			regex: "[^\\\\\"]*(?:\\\\.[^\\\\\"]*)*\"",
			next: "key"
		}, stringfill],
		js: [{
			token: "string",
			regex: "[^\\\\`]*(?:\\\\.[^\\\\`]*)*`",
			next: "key"
		}, stringfill],
		words: [{
			token: "string",
			regex: ".*?\\]>",
			next: "key"
		}, stringfill]
	};
	function extend$(sub, sup) {
		function fun() {}
		fun.prototype = (sub.superclass = sup).prototype;
		(sub.prototype = new fun()).constructor = sub;
		if (typeof sup.extended == "function") sup.extended(sub);
		return sub;
	}
	function import$(obj, src) {
		var own = {}.hasOwnProperty;
		for (var key in src) if (own.call(src, key)) obj[key] = src[key];
		return obj;
	}
}));
export default require_livescript();
