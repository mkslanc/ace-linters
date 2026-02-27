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
import { t as require_token_iterator } from "./token_iterator-CbfYmntj.js";
import { t as require_fold_mode } from "./fold_mode-D1xG2KFM.js";
var require_basic_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$2 = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var BasicHighlightRules$1 = function() {
		var keywordMapper = this.createKeywordMapper({
			"keyword.control": "FOR|TO|NEXT|GOSUB|RETURN|IF|THEN|ELSE|GOTO|ON|WHILE|WEND|TRON|TROFF",
			"entity.name": "Auto|Call|Chain|Clear|Close|Common|Cont|Data|MERGE|ALL|Delete|DIM|EDIT|END|ERASE|ERROR|FIELD|GET|INPUT|KILL|LET|LIST|LLIST|LOAD|LSET|RSET|MERGE|NEW|NULL|OPEN|OUT|POKE|PRINT|PUT|RANDOMIZE|READ|RENUM|RESTORE|RESUME|RUN|SAVE|STOP|SWAP|WAIT|WIDTH",
			"keyword.operator": "Mod|And|Not|Or|Xor|Eqv|Imp",
			"support.function": "ABS|ASC|ATN|CDBL|CINT|COS|CSNG|CVI|CVS|CVD|EOF|EXP|FIX|FRE|INP|INSTR|INT|LEN|LOC|LOG|LPOS|PEEK|POS|RND|SGN|SIN|SPC|SQR|TAB|TAN|USR|VAL|VARPTR"
		}, "identifier", true);
		this.$rules = { "start": [
			{
				token: "string",
				regex: /"(?:\\.|[^"\\])*"/
			},
			{
				token: "support.function",
				regex: /(HEX|CHR|INPUT|LEFT|MID|MKI|MKS|MKD|OCT|RIGHT|SPACE|STR|STRING)\$/
			},
			{
				token: "entity.name",
				regex: /(?:DEF\s(?:SEG|USR|FN[a-zA-Z]+)|LINE\sINPUT|L?PRINT#?(?:\sUSING)?|MID\$|ON\sERROR\sGOTO|OPTION\sBASE|WRITE#?|DATE\$|INKEY\$|TIME\$)/
			},
			{
				token: "variable",
				regex: /[a-zA-Z][a-zA-Z0-9_]{0,38}[$%!#]?(?=\s*=)/
			},
			{
				token: "keyword.operator",
				regex: /\\|=|\^|\*|\/|\+|\-|<|>|-/
			},
			{
				token: "paren.lparen",
				regex: /[([]/
			},
			{
				token: "paren.rparen",
				regex: /[\)\]]/
			},
			{
				token: "constant.numeric",
				regex: /[+-]?\d+(\.\d+)?([ED][+-]?\d+)?(?:[!#])?/
			},
			{
				token: "constant.numeric",
				regex: /&[HO]?[0-9A-F]+/
			},
			{
				token: "comment",
				regex: /REM\s+.*$/
			},
			{
				regex: "\\w+",
				token: keywordMapper
			},
			{
				token: "punctiation",
				regex: /[,;]/
			}
		] };
		this.normalizeRules();
	};
	oop$2.inherits(BasicHighlightRules$1, TextHighlightRules);
	exports.BasicHighlightRules = BasicHighlightRules$1;
}));
var require_basic$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var BaseFoldMode = require_fold_mode().FoldMode;
	var Range = require_range().Range;
	var TokenIterator = require_token_iterator().TokenIterator;
	var FoldMode$1 = exports.FoldMode = function() {};
	oop$1.inherits(FoldMode$1, BaseFoldMode);
	(function() {
		this.indentKeywords = {
			"tron": 1,
			"while": 1,
			"for": 1,
			"troff": -1,
			"wend": -1,
			"next": -1
		};
		this.foldingStartMarker = /(?:\s|^)(tron|while|for)\b/i;
		this.foldingStopMarker = /(?:\b)(troff|next|wend)\b/i;
		this.getFoldWidgetRange = function(session, foldStyle, row) {
			var line = session.getLine(row);
			var isStart = this.foldingStartMarker.test(line);
			var isEnd = this.foldingStopMarker.test(line);
			if (isStart || isEnd) {
				var match = isEnd ? this.foldingStopMarker.exec(line) : this.foldingStartMarker.exec(line);
				if (match && match[1].toLowerCase()) {
					if (session.getTokenAt(row, match.index + 2).type === "keyword.control") return this.basicBlock(session, row, match.index + 2);
				}
			}
		};
		this.getFoldWidget = function(session, foldStyle, row) {
			var line = session.getLine(row);
			var isStart = this.foldingStartMarker.test(line);
			var isEnd = this.foldingStopMarker.test(line);
			if (isStart && !isEnd) {
				var match = this.foldingStartMarker.exec(line);
				var keyword = match && match[1].toLowerCase();
				if (keyword) {
					if (session.getTokenAt(row, match.index + 2).type == "keyword.control") return "start";
				}
			}
			if (foldStyle != "markbeginend" || !isEnd || isStart && isEnd) return "";
			var match = line.match(this.foldingStopMarker);
			var keyword = match && match[1].toLowerCase();
			if (this.indentKeywords[keyword]) {
				if (session.getTokenAt(row, match.index + 2).type === "keyword.control") return "end";
			}
			return "";
		};
		this.basicBlock = function(session, row, column, tokenRange) {
			var stream = new TokenIterator(session, row, column);
			var token = stream.getCurrentToken();
			if (!token || token.type != "keyword.control") return;
			var val = token.value.toLowerCase();
			var stack = [val];
			var dir = this.indentKeywords[val];
			if (!dir) return;
			var startColumn = dir === -1 ? stream.getCurrentTokenColumn() : session.getLine(row).length;
			var startRow = row;
			stream.step = dir === -1 ? stream.stepBackward : stream.stepForward;
			while (token = stream.step()) {
				val = token.value.toLowerCase();
				if (token.type !== "keyword.control" || !this.indentKeywords[val]) continue;
				var level = dir * this.indentKeywords[val];
				if (level > 0) stack.unshift(val);
				else if (level <= 0) stack.shift();
				if (stack.length === 0) break;
			}
			if (!token) return null;
			if (tokenRange) return stream.getCurrentTokenRange();
			var row = stream.getCurrentTokenRow();
			if (dir === -1) return new Range(row, session.getLine(row).length, startRow, startColumn);
			else return new Range(startRow, startColumn, row, stream.getCurrentTokenColumn());
		};
	}).call(FoldMode$1.prototype);
}));
var require_basic = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var BasicHighlightRules = require_basic_highlight_rules().BasicHighlightRules;
	var FoldMode = require_basic$1().FoldMode;
	var Mode = function() {
		this.HighlightRules = BasicHighlightRules;
		this.foldingRules = new FoldMode();
		this.$behaviour = this.$defaultBehaviour;
		this.indentKeywords = this.foldingRules.indentKeywords;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = ["REM"];
		this.getMatching = function(session, row, column, tokenRange) {
			if (row == void 0) {
				var pos = session.selection.lead;
				column = pos.column;
				row = pos.row;
			}
			if (tokenRange == void 0) tokenRange = true;
			var startToken = session.getTokenAt(row, column);
			if (startToken) {
				if (startToken.value.toLowerCase() in this.indentKeywords) return this.foldingRules.basicBlock(session, row, column, tokenRange);
			}
		};
		this.$id = "ace/mode/basic";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_basic();
