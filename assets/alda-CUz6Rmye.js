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
import { t as require_cstyle } from "./cstyle-D3R9cgNV.js";
var require_alda_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var AldaHighlightRules$1 = function() {
		this.$rules = {
			pitch: [{
				token: "variable.parameter.operator.pitch.alda",
				regex: /(?:[+\-]+|\=)/
			}, {
				token: "",
				regex: "",
				next: "timing"
			}],
			timing: [{
				token: "string.quoted.operator.timing.alda",
				regex: /\d+(?:s|ms)?/
			}, {
				token: "",
				regex: "",
				next: "start"
			}],
			start: [
				{
					token: [
						"constant.language.instrument.alda",
						"constant.language.instrument.alda",
						"meta.part.call.alda",
						"storage.type.nickname.alda",
						"meta.part.call.alda"
					],
					regex: /^([a-zA-Z]{2}[\w\-+\'()]*)((?:\s*\/\s*[a-zA-Z]{2}[\w\-+\'()]*)*)(?:(\s*)(\"[a-zA-Z]{2}[\w\-+\'()]*\"))?(\s*:)/
				},
				{
					token: [
						"text",
						"entity.other.inherited-class.voice.alda",
						"text"
					],
					regex: /^(\s*)(V\d+)(:)/
				},
				{
					token: "comment.line.number-sign.alda",
					regex: /#.*$/
				},
				{
					token: "entity.name.function.pipe.measure.alda",
					regex: /\|/
				},
				{
					token: "comment.block.inline.alda",
					regex: /\(comment\b/,
					push: [{
						token: "comment.block.inline.alda",
						regex: /\)/,
						next: "pop"
					}, { defaultToken: "comment.block.inline.alda" }]
				},
				{
					token: "entity.name.function.marker.alda",
					regex: /%[a-zA-Z]{2}[\w\-+\'()]*/
				},
				{
					token: "entity.name.function.at-marker.alda",
					regex: /@[a-zA-Z]{2}[\w\-+\'()]*/
				},
				{
					token: "keyword.operator.octave-change.alda",
					regex: /\bo\d+\b/
				},
				{
					token: "keyword.operator.octave-shift.alda",
					regex: /[><]/
				},
				{
					token: "keyword.operator.repeat.alda",
					regex: /\*\s*\d+/
				},
				{
					token: "string.quoted.operator.timing.alda",
					regex: /[.]|r\d*(?:s|ms)?/
				},
				{
					token: "text",
					regex: /([cdefgab])/,
					next: "pitch"
				},
				{
					token: "string.quoted.operator.timing.alda",
					regex: /~/,
					next: "timing"
				},
				{
					token: "punctuation.section.embedded.cram.alda",
					regex: /\}/,
					next: "timing"
				},
				{
					token: "constant.numeric.subchord.alda",
					regex: /\//
				},
				{ todo: {
					token: "punctuation.section.embedded.cram.alda",
					regex: /\{/,
					push: [{
						token: "punctuation.section.embedded.cram.alda",
						regex: /\}/,
						next: "pop"
					}, { include: "$self" }]
				} },
				{ todo: {
					token: "keyword.control.sequence.alda",
					regex: /\[/,
					push: [{
						token: "keyword.control.sequence.alda",
						regex: /\]/,
						next: "pop"
					}, { include: "$self" }]
				} },
				{
					token: "meta.inline.clojure.alda",
					regex: /\(/,
					push: [
						{
							token: "meta.inline.clojure.alda",
							regex: /\)/,
							next: "pop"
						},
						{ include: "source.clojure" },
						{ defaultToken: "meta.inline.clojure.alda" }
					]
				}
			]
		};
		this.normalizeRules();
	};
	AldaHighlightRules$1.metaData = {
		scopeName: "source.alda",
		fileTypes: ["alda"],
		name: "Alda"
	};
	oop$1.inherits(AldaHighlightRules$1, TextHighlightRules);
	exports.AldaHighlightRules = AldaHighlightRules$1;
}));
var require_alda = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var AldaHighlightRules = require_alda_highlight_rules().AldaHighlightRules;
	var FoldMode = require_cstyle().FoldMode;
	var Mode = function() {
		this.HighlightRules = AldaHighlightRules;
		this.foldingRules = new FoldMode();
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.$id = "ace/mode/alda";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_alda();
