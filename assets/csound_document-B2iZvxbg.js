import { t as __commonJSMin } from "./chunk-BLiWRsM1.js";
import "./useragent-Cm8O_vvb.js";
import "./dom-BmR1mTSl.js";
import "./range-D2fBS63W.js";
import { t as require_oop } from "./oop-D6rqnWBm.js";
import "./lang-B3gWVpaj.js";
import "./config-D-BhsSyn.js";
import "./event_emitter-DQJDHkGW.js";
import "./textmate-7M3qxGeS.js";
import "./tokenizer-BFeMc3TI.js";
import { a as require_text_highlight_rules, t as require_text } from "./text-x9TxHOMd.js";
import "./token_iterator-B0gzmLw-.js";
import "./javascript_highlight_rules-Bq39j4o6.js";
import "./css_highlight_rules-BrA4daTy.js";
import "./xml_highlight_rules-Ch7nsDP3.js";
import { t as require_html_highlight_rules } from "./html_highlight_rules-C5s9oMLE.js";
import { t as require_csound_score_highlight_rules } from "./csound_score_highlight_rules-CfnljHgO.js";
import "./lua_highlight_rules-VYSrUGTK.js";
import "./python_highlight_rules-C3tTV4Ry.js";
import { t as require_csound_orchestra_highlight_rules } from "./csound_orchestra_highlight_rules-C8c_iixf.js";
//#region node_modules/ace-code/src/mode/csound_document_highlight_rules.js
var require_csound_document_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var CsoundOrchestraHighlightRules = require_csound_orchestra_highlight_rules().CsoundOrchestraHighlightRules;
	var CsoundScoreHighlightRules = require_csound_score_highlight_rules().CsoundScoreHighlightRules;
	var HtmlHighlightRules = require_html_highlight_rules().HtmlHighlightRules;
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var CsoundDocumentHighlightRules = function() {
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
	oop.inherits(CsoundDocumentHighlightRules, TextHighlightRules);
	exports.CsoundDocumentHighlightRules = CsoundDocumentHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/csound_document.js
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
//#endregion
export default require_csound_document();
