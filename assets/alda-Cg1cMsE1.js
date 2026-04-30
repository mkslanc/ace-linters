import { t as __commonJSMin } from "./chunk-Cu_MO8PN.js";
import "./useragent-BMYEMUd9.js";
import "./dom-DRNmwCmL.js";
import "./range-BakcZ9jR.js";
import { t as require_oop } from "./oop-DrExWoUW.js";
import "./lang-Chfjzp5y.js";
import "./config-7GJDZd_b.js";
import "./event_emitter-r-lZpQyf.js";
import "./textmate-CN2VrF7f.js";
import "./tokenizer-B5s1nUwH.js";
import { a as require_text_highlight_rules, t as require_text } from "./text-D8sm5DzM.js";
import "./token_iterator-BNxpI84f.js";
import "./fold_mode-D_StAfa6.js";
import { t as require_cstyle } from "./cstyle-DxkoJQhq.js";
//#region node_modules/ace-code/src/mode/alda_highlight_rules.js
/****************************************************************************************
* IT MIGHT NOT BE PERFECT ...But it's a good start from an existing *.tmlanguage file. *
* fileTypes                                                                            *
****************************************************************************************/
var require_alda_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var AldaHighlightRules = function() {
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
	AldaHighlightRules.metaData = {
		scopeName: "source.alda",
		fileTypes: ["alda"],
		name: "Alda"
	};
	oop.inherits(AldaHighlightRules, TextHighlightRules);
	exports.AldaHighlightRules = AldaHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/alda.js
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
//#endregion
export default require_alda();
