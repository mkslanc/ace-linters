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
import { t as require_worker_client } from "./worker_client-CdpIySAD.js";
import "./fold_mode-D1xG2KFM.js";
import { t as require_coffee } from "./coffee-DtCgMn7G.js";
import { t as require_matching_brace_outdent } from "./matching_brace_outdent-CFDbHlsY.js";
var require_yaml_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$2 = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var YamlHighlightRules$1 = function() {
		this.$rules = {
			"start": [
				{
					token: "comment",
					regex: "#.*$"
				},
				{
					token: "list.markup",
					regex: /^(?:-{3}|\.{3})\s*(?=#|$)/
				},
				{
					token: "list.markup",
					regex: /^\s*[\-?](?:$|\s)/
				},
				{
					token: "constant",
					regex: "!![\\w//]+"
				},
				{
					token: "constant.language",
					regex: "[&\\*][a-zA-Z0-9-_]+"
				},
				{
					token: ["meta.tag", "keyword"],
					regex: /^(\s*\w[^\s:]*?)(:(?=\s|$))/
				},
				{
					token: ["meta.tag", "keyword"],
					regex: /(\w[^\s:]*?)(\s*:(?=\s|$))/
				},
				{
					token: "keyword.operator",
					regex: "<<\\w*:\\w*"
				},
				{
					token: "keyword.operator",
					regex: "-\\s*(?=[{])"
				},
				{
					token: "string",
					regex: "[\"](?:(?:\\\\.)|(?:[^\"\\\\]))*?[\"]"
				},
				{
					token: "string",
					regex: /[|>][-+\d]*(?:$|\s+(?:$|#))/,
					onMatch: function(val, state, stack, line) {
						line = line.replace(/ #.*/, "");
						var indent = /^ *((:\s*)?-(\s*[^|>])?)?/.exec(line)[0].replace(/\S\s*$/, "").length;
						var indentationIndicator = parseInt(/\d+[\s+-]*$/.exec(line));
						if (indentationIndicator) {
							indent += indentationIndicator - 1;
							this.next = "mlString";
						} else this.next = "mlStringPre";
						if (!stack.length) {
							stack.push(this.next);
							stack.push(indent);
						} else {
							stack[0] = this.next;
							stack[1] = indent;
						}
						return this.token;
					},
					next: "mlString"
				},
				{
					token: "string",
					regex: "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"
				},
				{
					token: "constant.numeric",
					regex: /(\b|[+\-\.])[\d_]+(?:(?:\.[\d_]*)?(?:[eE][+\-]?[\d_]+)?)(?=[^\d-\w]|$)$/
				},
				{
					token: "constant.numeric",
					regex: /[+\-]?\.inf\b|NaN\b|0x[\dA-Fa-f_]+|0b[10_]+/
				},
				{
					token: "constant.language.boolean",
					regex: "\\b(?:true|false|TRUE|FALSE|True|False|yes|no)\\b"
				},
				{
					token: "paren.lparen",
					regex: "[[({]"
				},
				{
					token: "paren.rparen",
					regex: "[\\])}]"
				},
				{
					token: "text",
					regex: /[^\s,:\[\]\{\}]+/
				}
			],
			"mlStringPre": [
				{
					token: "indent",
					regex: /^ *$/
				},
				{
					token: "indent",
					regex: /^ */,
					onMatch: function(val, state, stack) {
						if (stack[1] >= val.length) {
							this.next = "start";
							stack.shift();
							stack.shift();
						} else {
							stack[1] = val.length - 1;
							this.next = stack[0] = "mlString";
						}
						return this.token;
					},
					next: "mlString"
				},
				{ defaultToken: "string" }
			],
			"mlString": [
				{
					token: "indent",
					regex: /^ *$/
				},
				{
					token: "indent",
					regex: /^ */,
					onMatch: function(val, state, stack) {
						if (stack[1] >= val.length) {
							this.next = "start";
							stack.splice(0);
						} else this.next = "mlString";
						return this.token;
					},
					next: "mlString"
				},
				{
					token: "string",
					regex: ".+"
				}
			]
		};
		this.normalizeRules();
	};
	oop$2.inherits(YamlHighlightRules$1, TextHighlightRules);
	exports.YamlHighlightRules = YamlHighlightRules$1;
}));
var require_yaml$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var CoffeeFoldMode = require_coffee().FoldMode;
	var Range = require_range().Range;
	var FoldMode$1 = exports.FoldMode = function() {};
	oop$1.inherits(FoldMode$1, CoffeeFoldMode);
	(function() {
		this.getFoldWidgetRange = function(session, foldStyle, row) {
			var re = /\S/;
			var line = session.getLine(row);
			var startLevel = line.search(re);
			var isCommentFold = line[startLevel] === "#";
			var isDashFold = line[startLevel] === "-";
			if (startLevel == -1) return;
			var startColumn = line.length;
			var maxRow = session.getLength();
			var startRow = row;
			var endRow = row;
			if (isCommentFold) {
				var range = this.commentBlock(session, row);
				if (range) return range;
			} else if (isDashFold) {
				var range = this.indentationBlock(session, row);
				if (range) return range;
			} else while (++row < maxRow) {
				var line = session.getLine(row);
				var level = line.search(re);
				if (level == -1) continue;
				if (level <= startLevel && line[startLevel] !== "-") {
					var token = session.getTokenAt(row, 0);
					if (!token || token.type !== "string") break;
				}
				endRow = row;
			}
			if (endRow > startRow) {
				var endColumn = session.getLine(endRow).length;
				return new Range(startRow, startColumn, endRow, endColumn);
			}
		};
		this.getFoldWidget = function(session, foldStyle, row) {
			var line = session.getLine(row);
			var indent = line.search(/\S/);
			var next = session.getLine(row + 1);
			var prev = session.getLine(row - 1);
			var prevIndent = prev.search(/\S/);
			var nextIndent = next.search(/\S/);
			var lineStartsWithDash = line[indent] === "-";
			if (indent == -1) {
				session.foldWidgets[row - 1] = prevIndent != -1 && prevIndent < nextIndent ? "start" : "";
				return "";
			}
			if (prevIndent == -1) {
				if (indent == nextIndent && line[indent] == "#" && next[indent] == "#") {
					session.foldWidgets[row - 1] = "";
					session.foldWidgets[row + 1] = "";
					return "start";
				}
			} else if (prevIndent == indent && line[indent] == "#" && prev[indent] == "#") {
				if (session.getLine(row - 2).search(/\S/) == -1) {
					session.foldWidgets[row - 1] = "start";
					session.foldWidgets[row + 1] = "";
					return "";
				}
			}
			if (prevIndent != -1 && prevIndent < indent) session.foldWidgets[row - 1] = "start";
			else if (prevIndent != -1 && prevIndent == indent && lineStartsWithDash) session.foldWidgets[row - 1] = "start";
			else session.foldWidgets[row - 1] = "";
			if (indent < nextIndent) return "start";
			else return "";
		};
	}).call(FoldMode$1.prototype);
}));
var require_yaml = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var YamlHighlightRules = require_yaml_highlight_rules().YamlHighlightRules;
	var MatchingBraceOutdent = require_matching_brace_outdent().MatchingBraceOutdent;
	var FoldMode = require_yaml$1().FoldMode;
	var WorkerClient = require_worker_client().WorkerClient;
	var Mode = function() {
		this.HighlightRules = YamlHighlightRules;
		this.$outdent = new MatchingBraceOutdent();
		this.foldingRules = new FoldMode();
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = ["#"];
		this.getNextLineIndent = function(state, line, tab) {
			var indent = this.$getIndent(line);
			if (state == "start") {
				if (line.match(/^.*[\{\(\[]\s*$/)) indent += tab;
			}
			return indent;
		};
		this.checkOutdent = function(state, line, input) {
			return this.$outdent.checkOutdent(line, input);
		};
		this.autoOutdent = function(state, doc, row) {
			this.$outdent.autoOutdent(doc, row);
		};
		this.createWorker = function(session) {
			var worker = new WorkerClient(["ace"], "ace/mode/yaml_worker", "YamlWorker");
			worker.attachToDocument(session.getDocument());
			worker.on("annotate", function(results) {
				session.setAnnotations(results.data);
			});
			worker.on("terminate", function() {
				session.clearAnnotations();
			});
			return worker;
		};
		this.$id = "ace/mode/yaml";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_yaml();
