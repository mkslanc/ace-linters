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
import { t as require_doc_comment_highlight_rules } from "./doc_comment_highlight_rules-DUGnT9qY.js";
var require_edifact_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var DocCommentHighlightRules = require_doc_comment_highlight_rules().DocCommentHighlightRules;
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var EdifactHighlightRules$1 = function() {
		var header = "UNH";
		var segment = "ADR|AGR|AJT|ALC|ALI|APP|APR|ARD|ARR|ASI|ATT|AUT|BAS|BGM|BII|BUS|CAV|CCD|CCI|CDI|CDS|CDV|CED|CIN|CLA|CLI|CMP|CNI|CNT|COD|COM|COT|CPI|CPS|CPT|CST|CTA|CUX|DAM|DFN|DGS|DII|DIM|DLI|DLM|DMS|DOC|DRD|DSG|DSI|DTM|EDT|EFI|ELM|ELU|ELV|EMP|EQA|EQD|EQN|ERC|ERP|EVE|FCA|FII|FNS|FNT|FOR|FSQ|FTX|GDS|GEI|GID|GIN|GIR|GOR|GPO|GRU|HAN|HYN|ICD|IDE|IFD|IHC|IMD|IND|INP|INV|IRQ|LAN|LIN|LOC|MEA|MEM|MKS|MOA|MSG|MTD|NAD|NAT|PAC|PAI|PAS|PCC|PCD|PCI|PDI|PER|PGI|PIA|PNA|POC|PRC|PRI|PRV|PSD|PTY|PYT|QRS|QTY|QUA|QVR|RCS|REL|RFF|RJL|RNG|ROD|RSL|RTE|SAL|SCC|SCD|SEG|SEL|SEQ|SFI|SGP|SGU|SPR|SPS|STA|STC|STG|STS|TAX|TCC|TDT|TEM|TMD|TMP|TOD|TPL|TRU|TSR|UNB|UNZ|UNT|UGH|UGT|UNS|VLI";
		var header = "UNH";
		var buildinConstants = "null|Infinity|NaN|undefined";
		var langClasses = "";
		var keywords = "BY|SE|ON|INV|JP|UNOA";
		var keywordMapper = this.createKeywordMapper({
			"variable.language": "this",
			"keyword": keywords,
			"entity.name.segment": segment,
			"entity.name.header": header,
			"constant.language": buildinConstants,
			"support.function": langClasses
		}, "identifier");
		this.$rules = { "start": [
			{
				token: "punctuation.operator",
				regex: "\\+.\\+"
			},
			{
				token: "constant.language.boolean",
				regex: "(?:true|false)\\b"
			},
			{
				token: keywordMapper,
				regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
			},
			{
				token: "keyword.operator",
				regex: "\\+"
			},
			{
				token: "punctuation.operator",
				regex: "\\:|'"
			},
			{
				token: "identifier",
				regex: "\\:D\\:"
			}
		] };
		this.embedRules(DocCommentHighlightRules, "doc-", [DocCommentHighlightRules.getEndRule("start")]);
	};
	EdifactHighlightRules$1.metaData = {
		fileTypes: ["edi"],
		keyEquivalent: "^~E",
		name: "Edifact",
		scopeName: "source.edifact"
	};
	oop$1.inherits(EdifactHighlightRules$1, TextHighlightRules);
	exports.EdifactHighlightRules = EdifactHighlightRules$1;
}));
var require_edifact = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var EdifactHighlightRules = require_edifact_highlight_rules().EdifactHighlightRules;
	var Mode = function() {
		this.HighlightRules = EdifactHighlightRules;
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.$id = "ace/mode/edifact";
		this.snippetFileId = "ace/snippets/edifact";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_edifact();
