import { t as __commonJSMin } from "./modulepreload-polyfill-DxDZhch-.js";
import { t as require_range } from "./range-DJd8bsIh.js";
import { t as require_oop } from "./oop-3KT-lR14.js";
import { t as require_lang } from "./lang-k5JViCdG.js";
import { a as require_text_highlight_rules, t as require_text } from "./text-BG8jWbzl.js";
import { l as require_fold_mode } from "./utils-B-ki7ewn.js";
import { t as require_matching_brace_outdent } from "./matching_brace_outdent-eZgsj40c.js";
//#region node_modules/ace-code/src/mode/c9search_highlight_rules.js
var require_c9search_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var lang = require_lang();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	function safeCreateRegexp(source, flag) {
		try {
			return new RegExp(source, flag);
		} catch (e) {}
	}
	var C9SearchHighlightRules = function() {
		this.$rules = {
			"start": [
				{
					tokenNames: [
						"c9searchresults.constant.numeric",
						"c9searchresults.text",
						"c9searchresults.text",
						"c9searchresults.keyword"
					],
					regex: /(^\s+[0-9]+)(:)(\d*\s?)([^\r\n]+)/,
					onMatch: function(val, state, stack) {
						var values = this.splitRegex.exec(val);
						var types = this.tokenNames;
						var tokens = [{
							type: types[0],
							value: values[1]
						}, {
							type: types[1],
							value: values[2]
						}];
						if (values[3]) if (values[3] == " ") tokens[1] = {
							type: types[1],
							value: values[2] + " "
						};
						else tokens.push({
							type: types[1],
							value: values[3]
						});
						var regex = stack[1];
						var str = values[4];
						var m;
						var last = 0;
						if (regex && regex.exec) {
							regex.lastIndex = 0;
							while (m = regex.exec(str)) {
								var skipped = str.substring(last, m.index);
								last = regex.lastIndex;
								if (skipped) tokens.push({
									type: types[2],
									value: skipped
								});
								if (m[0]) tokens.push({
									type: types[3],
									value: m[0]
								});
								else if (!skipped) break;
							}
						}
						if (last < str.length) tokens.push({
							type: types[2],
							value: str.substr(last)
						});
						return tokens;
					}
				},
				{
					regex: "^Searching for [^\\r\\n]*$",
					onMatch: function(val, state, stack) {
						var parts = val.split("");
						if (parts.length < 3) return "text";
						var options, search;
						var i = 0;
						var tokens = [
							{
								value: parts[i++] + "'",
								type: "text"
							},
							{
								value: search = parts[i++],
								type: "text"
							},
							{
								value: "'" + parts[i++],
								type: "text"
							}
						];
						if (parts[2] !== " in") tokens.push({
							value: "'" + parts[i++] + "'",
							type: "text"
						}, {
							value: parts[i++],
							type: "text"
						});
						tokens.push({
							value: " " + parts[i++] + " ",
							type: "text"
						});
						if (parts[i + 1]) {
							options = parts[i + 1];
							tokens.push({
								value: "(" + parts[i + 1] + ")",
								type: "text"
							});
							i += 1;
						} else i -= 1;
						while (i++ < parts.length) parts[i] && tokens.push({
							value: parts[i],
							type: "text"
						});
						if (search) {
							if (!/regex/.test(options)) search = lang.escapeRegExp(search);
							if (/whole/.test(options)) search = "\\b" + search + "\\b";
						}
						var regex = search && safeCreateRegexp("(" + search + ")", / sensitive/.test(options) ? "g" : "ig");
						if (regex) {
							stack[0] = state;
							stack[1] = regex;
						}
						return tokens;
					}
				},
				{
					regex: "^(?=Found \\d+ matches)",
					token: "text",
					next: "numbers"
				},
				{
					token: "string",
					regex: "^\\S:?[^:]+",
					next: "numbers"
				}
			],
			numbers: [{
				regex: "\\d+",
				token: "constant.numeric"
			}, {
				regex: "$",
				token: "text",
				next: "start"
			}]
		};
		this.normalizeRules();
	};
	oop.inherits(C9SearchHighlightRules, TextHighlightRules);
	exports.C9SearchHighlightRules = C9SearchHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/folding/c9search.js
var require_c9search$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var Range = require_range().Range;
	var BaseFoldMode = require_fold_mode().FoldMode;
	var FoldMode = exports.FoldMode = function() {};
	oop.inherits(FoldMode, BaseFoldMode);
	(function() {
		this.foldingStartMarker = /^(\S.*:|Searching for.*)$/;
		this.foldingStopMarker = /^(\s+|Found.*)$/;
		this.getFoldWidgetRange = function(session, foldStyle, row) {
			var lines = session.doc.getAllLines(row);
			var line = lines[row];
			var level1 = /^(Found.*|Searching for.*)$/;
			var re = level1.test(line) ? level1 : /^(\S.*:|\s*)$/;
			var startRow = row;
			var endRow = row;
			if (this.foldingStartMarker.test(line)) {
				for (var i = row + 1, l = session.getLength(); i < l; i++) if (re.test(lines[i])) break;
				endRow = i;
			} else if (this.foldingStopMarker.test(line)) {
				for (var i = row - 1; i >= 0; i--) {
					line = lines[i];
					if (re.test(line)) break;
				}
				startRow = i;
			}
			if (startRow != endRow) {
				var col = line.length;
				if (re === level1) col = line.search(/\(Found[^)]+\)$|$/);
				return new Range(startRow, col, endRow, 0);
			}
		};
	}).call(FoldMode.prototype);
}));
//#endregion
//#region node_modules/ace-code/src/mode/c9search.js
var require_c9search = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var C9SearchHighlightRules = require_c9search_highlight_rules().C9SearchHighlightRules;
	var MatchingBraceOutdent = require_matching_brace_outdent().MatchingBraceOutdent;
	var C9StyleFoldMode = require_c9search$1().FoldMode;
	var Mode = function() {
		this.HighlightRules = C9SearchHighlightRules;
		this.$outdent = new MatchingBraceOutdent();
		this.foldingRules = new C9StyleFoldMode();
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.getNextLineIndent = function(state, line, tab) {
			return this.$getIndent(line);
		};
		this.checkOutdent = function(state, line, input) {
			return this.$outdent.checkOutdent(line, input);
		};
		this.autoOutdent = function(state, doc, row) {
			this.$outdent.autoOutdent(doc, row);
		};
		this.$id = "ace/mode/c9search";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
//#endregion
export default require_c9search();
