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
var require_nasal_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var NasalHighlightRules$1 = function() {
		this.$rules = { start: [
			{
				token: "constant.other.allcaps.nasal",
				regex: /\b[[:upper:]_][[:upper:][:digit:]_]*\b(?![\.\(\'\"])/,
				comment: "Match identifiers in ALL_CAPS as constants, except when followed by `.`, `(`, `'`, or `\"`."
			},
			{
				todo: {
					token: [
						"support.class.nasal",
						"meta.function.nasal",
						"entity.name.function.nasal",
						"meta.function.nasal",
						"keyword.operator.nasal",
						"meta.function.nasal",
						"storage.type.function.nasal",
						"meta.function.nasal",
						"punctuation.definition.parameters.begin.nasal"
					],
					regex: /([a-zA-Z_?.$][\w?.$]*)(\.)([a-zA-Z_?.$][\w?.$]*)(\s*)(=)(\s*)(func)(\s*)(\()/,
					push: [
						{
							token: "punctuation.definition.parameters.end.nasal",
							regex: /\)/,
							next: "pop"
						},
						{ include: "$self" },
						{
							token: "variable.parameter.nasal",
							regex: /\w/
						},
						{ defaultToken: "meta.function.nasal" }
					]
				},
				comment: "match stuff like: Sound.play = func() { … }"
			},
			{
				todo: {
					token: [
						"entity.name.function.nasal",
						"meta.function.nasal",
						"keyword.operator.nasal",
						"meta.function.nasal",
						"storage.type.function.nasal",
						"meta.function.nasal",
						"punctuation.definition.parameters.begin.nasal"
					],
					regex: /([a-zA-Z_?$][\w?$]*)(\s*)(=)(\s*)(func)(\s*)(\()/,
					push: [
						{
							token: "punctuation.definition.parameters.end.nasal",
							regex: /\)/,
							next: "pop"
						},
						{ include: "$self" },
						{
							token: "variable.parameter.nasal",
							regex: /\w/
						},
						{ defaultToken: "meta.function.nasal" }
					]
				},
				comment: "match stuff like: play = func() { … }"
			},
			{
				todo: {
					token: [
						"entity.name.function.nasal",
						"meta.function.nasal",
						"keyword.operator.nasal",
						"meta.function.nasal",
						"storage.type.function.nasal",
						"meta.function.nasal",
						"punctuation.definition.parameters.begin.nasal"
					],
					regex: /([a-zA-Z_?$][\w?$]*)(\s*)(=)(\s*\(\s*)(func)(\s*)(\()/,
					push: [
						{
							token: "punctuation.definition.parameters.end.nasal",
							regex: /\)/,
							next: "pop"
						},
						{ include: "$self" },
						{
							token: "variable.parameter.nasal",
							regex: /\w/
						},
						{ defaultToken: "meta.function.nasal" }
					]
				},
				comment: "match stuff like: play = (func() { … }"
			},
			{
				todo: {
					token: [
						"entity.name.function.nasal",
						"meta.function.hash.nasal",
						"storage.type.function.nasal",
						"meta.function.hash.nasal",
						"punctuation.definition.parameters.begin.nasal"
					],
					regex: /\b([a-zA-Z_?.$][\w?.$]*)(\s*:\s*\b)(func)(\s*)(\()/,
					push: [
						{
							token: "punctuation.definition.parameters.end.nasal",
							regex: /\)/,
							next: "pop"
						},
						{ include: "$self" },
						{
							token: "variable.parameter.nasal",
							regex: /\w/
						},
						{ defaultToken: "meta.function.hash.nasal" }
					]
				},
				comment: "match stuff like: foobar: func() { … }"
			},
			{
				todo: {
					token: [
						"storage.type.function.nasal",
						"meta.function.nasal",
						"punctuation.definition.parameters.begin.nasal"
					],
					regex: /\b(func)(\s*)(\()/,
					push: [
						{
							token: "punctuation.definition.parameters.end.nasal",
							regex: /\)/,
							next: "pop"
						},
						{ include: "$self" },
						{
							token: "variable.parameter.nasal",
							regex: /\w/
						},
						{ defaultToken: "meta.function.nasal" }
					]
				},
				comment: "match stuff like: func() { … }"
			},
			{
				token: [
					"keyword.operator.new.nasal",
					"meta.class.instance.constructor",
					"entity.name.type.instance.nasal"
				],
				regex: /(new)(\s+)(\w+(?:\.\w*)?)/
			},
			{
				token: "keyword.control.nasal",
				regex: /\b(?:if|else|elsif|while|for|foreach|forindex)\b/
			},
			{
				token: "keyword.control.nasal",
				regex: /\b(?:break(?:\s+[A-Z]{2,16})?(?=\s*(?:;|\}))|continue(?:\s+[A-Z]{2,16})?(?=\s*(?:;|\}))|[A-Z]{2,16}(?=\s*;(?:[^\)#;]*?;){0,2}[^\)#;]*?\)))\b/
			},
			{
				token: "keyword.operator.nasal",
				regex: /!|\*|\-|\+|~|\/|==|=|!=|<=|>=|<|>|!|\?|\:|\*=|\/=|\+=|\-=|~=|\.\.\.|\b(?:and|or)\b/
			},
			{
				token: "variable.language.nasal",
				regex: /\b(?:me|arg|parents|obj)\b/
			},
			{
				token: "storage.type.nasal",
				regex: /\b(?:return|var)\b/
			},
			{
				token: "constant.language.nil.nasal",
				regex: /\bnil\b/
			},
			{
				token: "punctuation.definition.string.begin.nasal",
				regex: /'/,
				push: [
					{
						token: "punctuation.definition.string.end.nasal",
						regex: /'/,
						next: "pop"
					},
					{
						token: "constant.character.escape.nasal",
						regex: /\\'/
					},
					{ defaultToken: "string.quoted.single.nasal" }
				],
				comment: "Single quoted strings"
			},
			{
				token: "punctuation.definition.string.begin.nasal",
				regex: /"/,
				push: [
					{
						token: "punctuation.definition.string.end.nasal",
						regex: /"/,
						next: "pop"
					},
					{
						token: "constant.character.escape.nasal",
						regex: /\\(?:x[\da-fA-F]{2}|[0-2][0-7]{,2}|3[0-6][0-7]?|37[0-7]?|[4-7][0-7]?|r|n|t|\\|")/
					},
					{
						token: "constant.character.escape.nasal",
						regex: /%(?:%|(?:\d+\$)?[+-]?(?:[ 0]|'.{1})?-?\d*(?:\.\d+)?[bcdeEufFgGosxX])/
					},
					{ defaultToken: "string.quoted.double.nasal" }
				],
				comment: "Double quoted strings"
			},
			{
				token: [
					"punctuation.definition.string.begin.nasal",
					"string.other",
					"punctuation.definition.string.end.nasal"
				],
				regex: /(`)(.)(`)/,
				comment: "Single-byte ASCII character constants"
			},
			{
				token: ["punctuation.definition.comment.nasal", "comment.line.hash.nasal"],
				regex: /(#)(.*$)/,
				comment: "Comments"
			},
			{
				token: "constant.numeric.nasal",
				regex: /(?:(?:\b[0-9]+)?\.)?\b[0-9]+(?:[eE][-+]?[0-9]+)?\b/,
				comment: "Integers, floats, and scientific format"
			},
			{
				token: "constant.numeric.nasal",
				regex: /0[x|X][0-9a-fA-F]+/,
				comment: "Hex codes"
			},
			{
				token: "punctuation.terminator.statement.nasal",
				regex: /\;/
			},
			{
				token: ["punctuation.section.scope.begin.nasal", "punctuation.section.scope.end.nasal"],
				regex: /(\[)(\])/
			},
			{ todo: {
				token: "punctuation.section.scope.begin.nasal",
				regex: /\{/,
				push: [{
					token: "punctuation.section.scope.end.nasal",
					regex: /\}/,
					next: "pop"
				}, { include: "$self" }]
			} },
			{ todo: {
				token: "punctuation.section.scope.begin.nasal",
				regex: /\(/,
				push: [{
					token: "punctuation.section.scope.end.nasal",
					regex: /\)/,
					next: "pop"
				}, { include: "$self" }]
			} },
			{
				token: "invalid.illegal",
				regex: /%|\$|@|&|\^|\||\\|`/,
				comment: "Illegal characters"
			},
			{
				todo: { comment: "TODO: Symbols in hash keys" },
				comment: "TODO: Symbols in hash keys"
			},
			{
				token: "variable.language.nasal",
				regex: /\b(?:append|bind|call|caller|chr|closure|cmp|compile|contains|delete|die|find|ghosttype|id|int|keys|left|num|pop|right|setsize|size|sort|split|sprintf|streq|substr|subvec|typeof|readline)\b/,
				comment: "Core functions"
			},
			{
				token: "variable.language.nasal",
				regex: /\b(?:abort|abs|aircraftToCart|addcommand|airportinfo|airwaysRoute|assert|carttogeod|cmdarg|courseAndDistance|createDiscontinuity|createViaTo|createWP|createWPFrom|defined|directory|fgcommand|findAirportsByICAO|findAirportsWithinRange|findFixesByID|findNavaidByFrequency|findNavaidsByFrequency|findNavaidsByID|findNavaidsWithinRange|finddata|flightplan|geodinfo|geodtocart|get_cart_ground_intersection|getprop|greatCircleMove|interpolate|isa|logprint|magvar|maketimer|start|stop|restart|maketimestamp|md5|navinfo|parse_markdown|parsexml|print|printf|printlog|rand|registerFlightPlanDelegate|removecommand|removelistener|resolvepath|setlistener|_setlistener|setprop|srand|systime|thisfunc|tileIndex|tilePath|values)\b/,
				comment: "FG ext core functions"
			},
			{
				token: "variable.language.nasal",
				regex: /\b(?:singleShot|isRunning|simulatedTime)\b/,
				comment: "FG ext core functions"
			},
			{
				token: "constant.language.nasal",
				regex: /\b(?:D2R|FPS2KT|FT2M|GAL2L|IN2M|KG2LB|KT2FPS|KT2MPS|LG2GAL|LB2KG|M2FT|M2IN|M2NM|MPS2KT|NM2M|R2D)\b/,
				comment: "FG ext core constants"
			},
			{
				token: "support.function.nasal",
				regex: /\b(?:addChild|addChildren|alias|clearValue|equals|getAliasTarget|getAttribute|getBoolValue|getChild|getChildren|getIndex|getName|getNode|getParent|getPath|getType|getValue|getValues|initNode|remove|removeAllChildren|removeChild|removeChildren|setAttribute|setBoolValue|setDoubleValue|setIntValue|setValue|setValues|unalias|compileCondition|condition|copy|dump|getNode|nodeList|runBinding|setAll|wrap|wrapNode)\b/,
				comment: "FG func props"
			},
			{
				token: "support.class.nasal",
				regex: /\bNode\b/,
				comment: "FG node class"
			},
			{
				token: "variable.language.nasal",
				regex: /\b(?:props|globals)\b/,
				comment: "FG func props variables"
			},
			{
				todo: {
					token: ["support.function.nasal", "punctuation.definition.arguments.begin.nasal"],
					regex: /\b([a-zA-Z_?$][\w?$]*)(\()/,
					push: [
						{
							token: "punctuation.definition.arguments.end.nasal",
							regex: /\)/,
							next: "pop"
						},
						{ include: "$self" },
						{ defaultToken: "meta.function-call.nasal" }
					]
				},
				comment: "function call"
			}
		] };
		this.normalizeRules();
	};
	NasalHighlightRules$1.metaData = {
		fileTypes: ["nas"],
		name: "Nasal",
		scopeName: "source.nasal"
	};
	oop$1.inherits(NasalHighlightRules$1, TextHighlightRules);
	exports.NasalHighlightRules = NasalHighlightRules$1;
}));
var require_nasal = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var NasalHighlightRules = require_nasal_highlight_rules().NasalHighlightRules;
	var FoldMode = require_cstyle().FoldMode;
	var Mode = function() {
		this.HighlightRules = NasalHighlightRules;
		this.foldingRules = new FoldMode();
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.$id = "ace/mode/nasal";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_nasal();
