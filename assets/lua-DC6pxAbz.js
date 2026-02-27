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
import { t as require_text } from "./text-B9A1mx6l.js";
import { t as require_token_iterator } from "./token_iterator-CbfYmntj.js";
import { t as require_worker_client } from "./worker_client-CdpIySAD.js";
import { t as require_fold_mode } from "./fold_mode-D1xG2KFM.js";
import { t as require_lua_highlight_rules } from "./lua_highlight_rules-5Rw6_j3-.js";
var require_lua$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var BaseFoldMode = require_fold_mode().FoldMode;
	var Range$1 = require_range().Range;
	var TokenIterator = require_token_iterator().TokenIterator;
	var FoldMode = exports.FoldMode = function() {};
	oop$1.inherits(FoldMode, BaseFoldMode);
	(function() {
		this.foldingStartMarker = /\b(function|then|do|repeat)\b|{\s*$|(\[=*\[)/;
		this.foldingStopMarker = /\bend\b|^\s*}|\]=*\]/;
		this.getFoldWidget = function(session, foldStyle, row) {
			var line = session.getLine(row);
			var isStart = this.foldingStartMarker.test(line);
			var isEnd = this.foldingStopMarker.test(line);
			if (isStart && !isEnd) {
				var match = line.match(this.foldingStartMarker);
				if (match[1] == "then" && /\belseif\b/.test(line)) return;
				if (match[1]) {
					if (session.getTokenAt(row, match.index + 1).type === "keyword") return "start";
				} else if (match[2]) {
					var type = session.bgTokenizer.getState(row) || "";
					if (type[0] == "bracketedComment" || type[0] == "bracketedString") return "start";
				} else return "start";
			}
			if (foldStyle != "markbeginend" || !isEnd || isStart && isEnd) return "";
			var match = line.match(this.foldingStopMarker);
			if (match[0] === "end") {
				if (session.getTokenAt(row, match.index + 1).type === "keyword") return "end";
			} else if (match[0][0] === "]") {
				var type = session.bgTokenizer.getState(row - 1) || "";
				if (type[0] == "bracketedComment" || type[0] == "bracketedString") return "end";
			} else return "end";
		};
		this.getFoldWidgetRange = function(session, foldStyle, row) {
			var line = session.doc.getLine(row);
			var match = this.foldingStartMarker.exec(line);
			if (match) {
				if (match[1]) return this.luaBlock(session, row, match.index + 1);
				if (match[2]) return session.getCommentFoldRange(row, match.index + 1);
				return this.openingBracketBlock(session, "{", row, match.index);
			}
			var match = this.foldingStopMarker.exec(line);
			if (match) {
				if (match[0] === "end") {
					if (session.getTokenAt(row, match.index + 1).type === "keyword") return this.luaBlock(session, row, match.index + 1);
				}
				if (match[0][0] === "]") return session.getCommentFoldRange(row, match.index + 1);
				return this.closingBracketBlock(session, "}", row, match.index + match[0].length);
			}
		};
		this.luaBlock = function(session, row, column, tokenRange) {
			var stream = new TokenIterator(session, row, column);
			var indentKeywords = {
				"function": 1,
				"do": 1,
				"then": 1,
				"elseif": -1,
				"end": -1,
				"repeat": 1,
				"until": -1
			};
			var token = stream.getCurrentToken();
			if (!token || token.type != "keyword") return;
			var val = token.value;
			var stack = [val];
			var dir = indentKeywords[val];
			if (!dir) return;
			var startColumn = dir === -1 ? stream.getCurrentTokenColumn() : session.getLine(row).length;
			var startRow = row;
			stream.step = dir === -1 ? stream.stepBackward : stream.stepForward;
			while (token = stream.step()) {
				if (token.type !== "keyword") continue;
				var level = dir * indentKeywords[token.value];
				if (level > 0) stack.unshift(token.value);
				else if (level <= 0) {
					stack.shift();
					if (!stack.length && token.value != "elseif") break;
					if (level === 0) stack.unshift(token.value);
				}
			}
			if (!token) return null;
			if (tokenRange) return stream.getCurrentTokenRange();
			var row = stream.getCurrentTokenRow();
			if (dir === -1) return new Range$1(row, session.getLine(row).length, startRow, startColumn);
			else return new Range$1(startRow, startColumn, row, stream.getCurrentTokenColumn());
		};
	}).call(FoldMode.prototype);
}));
var require_lua = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var LuaHighlightRules = require_lua_highlight_rules().LuaHighlightRules;
	var LuaFoldMode = require_lua$1().FoldMode;
	var Range = require_range().Range;
	var WorkerClient = require_worker_client().WorkerClient;
	var Mode = function() {
		this.HighlightRules = LuaHighlightRules;
		this.foldingRules = new LuaFoldMode();
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = "--";
		this.blockComment = {
			start: "--[[",
			end: "--]]"
		};
		var indentKeywords = {
			"function": 1,
			"then": 1,
			"do": 1,
			"else": 1,
			"elseif": 1,
			"repeat": 1,
			"end": -1,
			"until": -1
		};
		var outdentKeywords = [
			"else",
			"elseif",
			"end",
			"until"
		];
		function getNetIndentLevel(tokens) {
			var level = 0;
			for (var i = 0; i < tokens.length; i++) {
				var token = tokens[i];
				if (token.type == "keyword") {
					if (token.value in indentKeywords) level += indentKeywords[token.value];
				} else if (token.type == "paren.lparen") level += token.value.length;
				else if (token.type == "paren.rparen") level -= token.value.length;
			}
			if (level < 0) return -1;
			else if (level > 0) return 1;
			else return 0;
		}
		this.getNextLineIndent = function(state, line, tab) {
			var indent = this.$getIndent(line);
			var level = 0;
			var tokens = this.getTokenizer().getLineTokens(line, state).tokens;
			if (state == "start") level = getNetIndentLevel(tokens);
			if (level > 0) return indent + tab;
			else if (level < 0 && indent.substr(indent.length - tab.length) == tab) {
				if (!this.checkOutdent(state, line, "\n")) return indent.substr(0, indent.length - tab.length);
			}
			return indent;
		};
		this.checkOutdent = function(state, line, input) {
			if (input != "\n" && input != "\r" && input != "\r\n") return false;
			if (line.match(/^\s*[\)\}\]]$/)) return true;
			var tokens = this.getTokenizer().getLineTokens(line.trim(), state).tokens;
			if (!tokens || !tokens.length) return false;
			return tokens[0].type == "keyword" && outdentKeywords.indexOf(tokens[0].value) != -1;
		};
		this.getMatching = function(session, row, column) {
			if (row == void 0) {
				var pos = session.selection.lead;
				column = pos.column;
				row = pos.row;
			}
			var startToken = session.getTokenAt(row, column);
			if (startToken && startToken.value in indentKeywords) return this.foldingRules.luaBlock(session, row, column, true);
		};
		this.autoOutdent = function(state, session, row) {
			var column = session.getLine(row).match(/^\s*/)[0].length;
			if (!column || !row) return;
			var startRange = this.getMatching(session, row, column + 1);
			if (!startRange || startRange.start.row == row) return;
			var indent = this.$getIndent(session.getLine(startRange.start.row));
			if (indent.length != column) {
				session.replace(new Range(row, 0, row, column), indent);
				session.outdentRows(new Range(row + 1, 0, row + 1, 0));
			}
		};
		this.createWorker = function(session) {
			var worker = new WorkerClient(["ace"], "ace/mode/lua_worker", "Worker");
			worker.attachToDocument(session.getDocument());
			worker.on("annotate", function(e) {
				session.setAnnotations(e.data);
			});
			worker.on("terminate", function() {
				session.clearAnnotations();
			});
			return worker;
		};
		this.$id = "ace/mode/lua";
		this.snippetFileId = "ace/snippets/lua";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_lua();
export { require_lua as t };
