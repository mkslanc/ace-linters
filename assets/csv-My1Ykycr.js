import { t as __commonJSMin } from "./chunk-iA-Slpst.js";
import "./useragent-BODERP_7.js";
import "./dom-BBjJ92-n.js";
import "./range-BUVqNbwc.js";
import { t as require_oop } from "./oop-DcdK5Mrs.js";
import { t as require_lang } from "./lang-DcNOSqFo.js";
import "./config-DPm1ug3B.js";
import "./event_emitter-BGfSYA24.js";
import "./textmate-zFNmb5zU.js";
import "./tokenizer-C2b-GJMk.js";
import { a as require_text_highlight_rules, t as require_text } from "./text-B9A1mx6l.js";
import "./token_iterator-CbfYmntj.js";
var require_csv_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var CsvHighlightRules$1 = function() {
		TextHighlightRules.call(this);
	};
	oop$1.inherits(CsvHighlightRules$1, TextHighlightRules);
	exports.CsvHighlightRules = CsvHighlightRules$1;
}));
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
				separatorRegex: /* @__PURE__ */ new RegExp("(" + separatorRegex + ")"),
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
export default require_csv();
export { require_csv as t };
