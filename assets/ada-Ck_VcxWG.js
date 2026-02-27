import { t as __commonJSMin } from "./chunk-iA-Slpst.js";
import "./useragent-BODERP_7.js";
import "./dom-BBjJ92-n.js";
import { t as require_range } from "./range-BUVqNbwc.js";
import { t as require_oop } from "./oop-DcdK5Mrs.js";
import "./lang-DcNOSqFo.js";
import "./config-DPm1ug3B.js";
import "./event_emitter-BGfSYA24.js";
import "./textmate-zFNmb5zU.js";
import "./tokenizer-C2b-GJMk.js";
import { a as require_text_highlight_rules, t as require_text } from "./text-B9A1mx6l.js";
import "./token_iterator-CbfYmntj.js";
var require_ada_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var AdaHighlightRules$1 = function() {
		var keywords = "abort|else|new|return|abs|elsif|not|reverse|abstract|end|null|accept|entry|select|access|exception|of|separate|aliased|exit|or|some|all|others|subtype|and|for|out|synchronized|array|function|overriding|at|tagged|generic|package|task|begin|goto|pragma|terminate|body|private|then|if|procedure|type|case|in|protected|constant|interface|until||is|raise|use|declare|range|delay|limited|record|when|delta|loop|rem|while|digits|renames|with|do|mod|requeue|xor";
		var builtinConstants = "true|false|null";
		var builtinFunctions = "count|min|max|avg|sum|rank|now|coalesce|main";
		var keywordMapper = this.createKeywordMapper({
			"support.function": builtinFunctions,
			"keyword": keywords,
			"constant.language": builtinConstants
		}, "identifier", true);
		this.$rules = { "start": [
			{
				token: "comment",
				regex: "--.*$"
			},
			{
				token: "string",
				regex: "\".*?\""
			},
			{
				token: "string",
				regex: "'.'"
			},
			{
				token: "constant.numeric",
				regex: "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
			},
			{
				token: keywordMapper,
				regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
			},
			{
				token: "keyword.operator",
				regex: "\\+|\\-|\\/|\\/\\/|%|<@>|@>|<@|&|\\^|~|<|>|<=|=>|==|!=|<>|="
			},
			{
				token: "paren.lparen",
				regex: "[\\(]"
			},
			{
				token: "paren.rparen",
				regex: "[\\)]"
			},
			{
				token: "text",
				regex: "\\s+"
			}
		] };
	};
	oop$1.inherits(AdaHighlightRules$1, TextHighlightRules);
	exports.AdaHighlightRules = AdaHighlightRules$1;
}));
var require_ada = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var AdaHighlightRules = require_ada_highlight_rules().AdaHighlightRules;
	var Range = require_range().Range;
	var Mode = function() {
		this.HighlightRules = AdaHighlightRules;
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = "--";
		this.getNextLineIndent = function(state, line, tab) {
			var indent = this.$getIndent(line);
			var tokens = this.getTokenizer().getLineTokens(line, state).tokens;
			if (tokens.length && tokens[tokens.length - 1].type == "comment") return indent;
			if (state == "start") {
				if (line.match(/^.*(begin|loop|then|is|do)\s*$/)) indent += tab;
			}
			return indent;
		};
		this.checkOutdent = function(state, line, input) {
			if ((line + input).match(/^\s*(begin|end)$/)) return true;
			return false;
		};
		this.autoOutdent = function(state, session, row) {
			var line = session.getLine(row);
			var prevLine = session.getLine(row - 1);
			var prevIndent = this.$getIndent(prevLine).length;
			if (this.$getIndent(line).length <= prevIndent) return;
			session.outdentRows(new Range(row, 0, row + 2, 0));
		};
		this.$id = "ace/mode/ada";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_ada();
