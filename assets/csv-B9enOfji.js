import { t as __commonJSMin } from "./chunk-BLiWRsM1.js";
import "./useragent-Cm8O_vvb.js";
import "./dom-BmR1mTSl.js";
import "./range-D2fBS63W.js";
import { t as require_oop } from "./oop-D6rqnWBm.js";
import { t as require_lang } from "./lang-B3gWVpaj.js";
import "./config-D-BhsSyn.js";
import "./event_emitter-DQJDHkGW.js";
import "./textmate-7M3qxGeS.js";
import "./tokenizer-BFeMc3TI.js";
import { a as require_text_highlight_rules, t as require_text } from "./text-x9TxHOMd.js";
import "./token_iterator-B0gzmLw-.js";
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
