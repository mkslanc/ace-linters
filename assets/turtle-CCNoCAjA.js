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
import { t as require_cstyle } from "./cstyle-C6ktp4d4.js";
var require_turtle_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var TurtleHighlightRules$1 = function() {
		this.$rules = {
			start: [
				{ include: "#comments" },
				{ include: "#strings" },
				{ include: "#base-prefix-declarations" },
				{ include: "#string-language-suffixes" },
				{ include: "#string-datatype-suffixes" },
				{ include: "#relative-urls" },
				{ include: "#xml-schema-types" },
				{ include: "#rdf-schema-types" },
				{ include: "#owl-types" },
				{ include: "#qnames" },
				{ include: "#punctuation-operators" }
			],
			"#base-prefix-declarations": [{
				token: "keyword.other.prefix.turtle",
				regex: /@(?:base|prefix)/
			}],
			"#comments": [{
				token: ["punctuation.definition.comment.turtle", "comment.line.hash.turtle"],
				regex: /(#)(.*$)/
			}],
			"#owl-types": [{
				token: "support.type.datatype.owl.turtle",
				regex: /owl:[a-zA-Z]+/
			}],
			"#punctuation-operators": [{
				token: "keyword.operator.punctuation.turtle",
				regex: /;|,|\.|\(|\)|\[|\]/
			}],
			"#qnames": [{
				token: "entity.name.other.qname.turtle",
				regex: /(?:[a-zA-Z][-_a-zA-Z0-9]*)?:(?:[_a-zA-Z][-_a-zA-Z0-9]*)?/
			}],
			"#rdf-schema-types": [{
				token: "support.type.datatype.rdf.schema.turtle",
				regex: /rdfs?:[a-zA-Z]+|(?:^|\s)a(?:\s|$)/
			}],
			"#relative-urls": [{
				token: "string.quoted.other.relative.url.turtle",
				regex: /</,
				push: [{
					token: "string.quoted.other.relative.url.turtle",
					regex: />/,
					next: "pop"
				}, { defaultToken: "string.quoted.other.relative.url.turtle" }]
			}],
			"#string-datatype-suffixes": [{
				token: "keyword.operator.datatype.suffix.turtle",
				regex: /\^\^/
			}],
			"#string-language-suffixes": [{
				token: ["keyword.operator.language.suffix.turtle", "constant.language.suffix.turtle"],
				regex: /(?!")(@)([a-z]+(?:\-[a-z0-9]+)*)/
			}],
			"#strings": [{
				token: "string.quoted.triple.turtle",
				regex: /"""/,
				push: [{
					token: "string.quoted.triple.turtle",
					regex: /"""/,
					next: "pop"
				}, { defaultToken: "string.quoted.triple.turtle" }]
			}, {
				token: "string.quoted.double.turtle",
				regex: /"/,
				push: [
					{
						token: "string.quoted.double.turtle",
						regex: /"/,
						next: "pop"
					},
					{
						token: "invalid.string.newline",
						regex: /$/
					},
					{
						token: "constant.character.escape.turtle",
						regex: /\\./
					},
					{ defaultToken: "string.quoted.double.turtle" }
				]
			}],
			"#xml-schema-types": [{
				token: "support.type.datatype.xml.schema.turtle",
				regex: /xsd?:[a-z][a-zA-Z]+/
			}]
		};
		this.normalizeRules();
	};
	TurtleHighlightRules$1.metaData = {
		fileTypes: ["ttl", "nt"],
		name: "Turtle",
		scopeName: "source.turtle"
	};
	oop$1.inherits(TurtleHighlightRules$1, TextHighlightRules);
	exports.TurtleHighlightRules = TurtleHighlightRules$1;
}));
var require_turtle = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var TurtleHighlightRules = require_turtle_highlight_rules().TurtleHighlightRules;
	var FoldMode = require_cstyle().FoldMode;
	var Mode = function() {
		this.HighlightRules = TurtleHighlightRules;
		this.foldingRules = new FoldMode();
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.$id = "ace/mode/turtle";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_turtle();
