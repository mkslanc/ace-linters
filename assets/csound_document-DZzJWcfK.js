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
import "./javascript_highlight_rules-DP2X209F.js";
import "./css_highlight_rules-BN2AN0ZM.js";
import "./xml_highlight_rules-C4X_gdGF.js";
import { t as require_html_highlight_rules } from "./html_highlight_rules-Dky29llI.js";
import { t as require_csound_score_highlight_rules } from "./csound_score_highlight_rules-vtD27wq6.js";
import "./lua_highlight_rules-5Rw6_j3-.js";
import "./python_highlight_rules-CioM30Se.js";
import { t as require_csound_orchestra_highlight_rules } from "./csound_orchestra_highlight_rules-D7jUn3zZ.js";
var require_csound_document_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var CsoundOrchestraHighlightRules = require_csound_orchestra_highlight_rules().CsoundOrchestraHighlightRules;
	var CsoundScoreHighlightRules = require_csound_score_highlight_rules().CsoundScoreHighlightRules;
	var HtmlHighlightRules = require_html_highlight_rules().HtmlHighlightRules;
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var CsoundDocumentHighlightRules$1 = function() {
		var orchestraHighlightRules = new CsoundOrchestraHighlightRules("csound-");
		var scoreHighlightRules = new CsoundScoreHighlightRules("csound-score-");
		this.$rules = {
			"start": [{
				token: [
					"meta.tag.punctuation.tag-open.csound-document",
					"entity.name.tag.begin.csound-document",
					"meta.tag.punctuation.tag-close.csound-document"
				],
				regex: /(<)(CsoundSynthesi[sz]er)(>)/,
				next: "synthesizer"
			}, { defaultToken: "text.csound-document" }],
			"synthesizer": [
				{
					token: [
						"meta.tag.punctuation.end-tag-open.csound-document",
						"entity.name.tag.begin.csound-document",
						"meta.tag.punctuation.tag-close.csound-document"
					],
					regex: "(</)(CsoundSynthesi[sz]er)(>)",
					next: "start"
				},
				{
					token: [
						"meta.tag.punctuation.tag-open.csound-document",
						"entity.name.tag.begin.csound-document",
						"meta.tag.punctuation.tag-close.csound-document"
					],
					regex: "(<)(CsInstruments)(>)",
					next: orchestraHighlightRules.embeddedRulePrefix + "start"
				},
				{
					token: [
						"meta.tag.punctuation.tag-open.csound-document",
						"entity.name.tag.begin.csound-document",
						"meta.tag.punctuation.tag-close.csound-document"
					],
					regex: "(<)(CsScore)(>)",
					next: scoreHighlightRules.embeddedRulePrefix + "start"
				},
				{
					token: [
						"meta.tag.punctuation.tag-open.csound-document",
						"entity.name.tag.begin.csound-document",
						"meta.tag.punctuation.tag-close.csound-document"
					],
					regex: "(<)([Hh][Tt][Mm][Ll])(>)",
					next: "html-start"
				}
			]
		};
		this.embedRules(orchestraHighlightRules.getRules(), orchestraHighlightRules.embeddedRulePrefix, [{
			token: [
				"meta.tag.punctuation.end-tag-open.csound-document",
				"entity.name.tag.begin.csound-document",
				"meta.tag.punctuation.tag-close.csound-document"
			],
			regex: "(</)(CsInstruments)(>)",
			next: "synthesizer"
		}]);
		this.embedRules(scoreHighlightRules.getRules(), scoreHighlightRules.embeddedRulePrefix, [{
			token: [
				"meta.tag.punctuation.end-tag-open.csound-document",
				"entity.name.tag.begin.csound-document",
				"meta.tag.punctuation.tag-close.csound-document"
			],
			regex: "(</)(CsScore)(>)",
			next: "synthesizer"
		}]);
		this.embedRules(HtmlHighlightRules, "html-", [{
			token: [
				"meta.tag.punctuation.end-tag-open.csound-document",
				"entity.name.tag.begin.csound-document",
				"meta.tag.punctuation.tag-close.csound-document"
			],
			regex: "(</)([Hh][Tt][Mm][Ll])(>)",
			next: "synthesizer"
		}]);
		this.normalizeRules();
	};
	oop$1.inherits(CsoundDocumentHighlightRules$1, TextHighlightRules);
	exports.CsoundDocumentHighlightRules = CsoundDocumentHighlightRules$1;
}));
var require_csound_document = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var CsoundDocumentHighlightRules = require_csound_document_highlight_rules().CsoundDocumentHighlightRules;
	var Mode = function() {
		this.HighlightRules = CsoundDocumentHighlightRules;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.$id = "ace/mode/csound_document";
		this.snippetFileId = "ace/snippets/csound_document";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_csound_document();
