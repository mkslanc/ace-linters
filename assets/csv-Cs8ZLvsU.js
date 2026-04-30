import { t as __commonJSMin } from "./chunk-Cu_MO8PN.js";
import "./useragent-BMYEMUd9.js";
import "./dom-DRNmwCmL.js";
import "./range-BakcZ9jR.js";
import { t as require_oop } from "./oop-DrExWoUW.js";
import { t as require_lang } from "./lang-Chfjzp5y.js";
import "./config-7GJDZd_b.js";
import "./event_emitter-r-lZpQyf.js";
import "./textmate-CN2VrF7f.js";
import "./tokenizer-B5s1nUwH.js";
import { a as require_text_highlight_rules, t as require_text } from "./text-D8sm5DzM.js";
import "./token_iterator-BNxpI84f.js";
//#region node_modules/ace-code/src/mode/csv_highlight_rules.js
var require_csv_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var CsvHighlightRules = function() {
		TextHighlightRules.call(this);
	};
	oop.inherits(CsvHighlightRules, TextHighlightRules);
	exports.CsvHighlightRules = CsvHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/csv.js
var require_csv = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var escapeRegExp = require_lang().escapeRegExp;
	var CsvHighlightRules = require_csv_highlight_rules().CsvHighlightRules;
	var Mode = function(options) {
		this.HighlightRules = CsvHighlightRules;
		if (!options) options = {};
		var separatorRegex = [options.splitter || ",", options.quote || "\""].map(escapeRegExp).join("|");
		this.$tokenizer = {
			getLineTokens: function(line, state, row) {
				return tokenizeCsv(line, state, this.options);
			},
			options: {
				quotes: options.quote || "\"",
				separatorRegex: new RegExp("(" + separatorRegex + ")"),
				spliter: options.splitter || ","
			},
			states: {}
		};
		this.$highlightRules = new this.HighlightRules();
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.getTokenizer = function() {
			return this.$tokenizer;
		};
		this.$id = "ace/mode/csv";
	}).call(Mode.prototype);
	exports.Mode = Mode;
	var classNames = [
		"keyword",
		"text",
		"string",
		"string.regex",
		"variable",
		"constant.numeric"
	];
	function tokenizeCsv(line, state, options) {
		var result = [];
		var parts = line.split(options.separatorRegex);
		var spliter = options.spliter;
		var quote = options.quote || "\"";
		var stateParts = (state || "start").split("-");
		var column = parseInt(stateParts[1]) || 0;
		var inString = stateParts[0] == "string";
		var atColumnStart = !inString;
		for (var i = 0; i < parts.length; i++) {
			var value = parts[i];
			if (value) {
				var isSeparator = false;
				if (value == spliter && !inString) {
					column++;
					atColumnStart = true;
					isSeparator = true;
				} else if (value == quote) {
					if (atColumnStart) {
						inString = true;
						atColumnStart = false;
					} else if (inString) if (parts[i + 1] == "" && parts[i + 2] == quote) {
						value = quote + quote;
						i += 2;
					} else inString = false;
				} else atColumnStart = false;
				result.push({
					value,
					type: classNames[column % classNames.length] + ".csv_" + column + (isSeparator ? ".csv_separator" : "")
				});
			}
		}
		return {
			tokens: result,
			state: inString ? "string-" + column : "start"
		};
	}
}));
//#endregion
export default require_csv();
export { require_csv as t };
