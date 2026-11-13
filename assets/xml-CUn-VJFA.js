import { t as __commonJSMin } from "./rolldown-runtime-DQp2zzRu.js";
import { t as require_oop } from "./oop-CAYBcRVL.js";
import { t as require_lang } from "./lang-x1MkV4s7.js";
import { t as require_text } from "./text-SKNm_D_P.js";
import { t as require_xml_highlight_rules } from "./xml_highlight_rules-BjP3UqFE.js";
import { n as require_xml$1, t as require_xml$2 } from "./xml-DcUFK2O9.js";
import { t as require_worker_client } from "./worker_client-tmdKFk-g.js";
// node_modules/ace-code/src/mode/xml.js
var require_xml = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var lang = require_lang();
	var TextMode = require_text().Mode;
	var XmlHighlightRules = require_xml_highlight_rules().XmlHighlightRules;
	var XmlBehaviour = require_xml$1().XmlBehaviour;
	var XmlFoldMode = require_xml$2().FoldMode;
	var WorkerClient = require_worker_client().WorkerClient;
	var Mode = function() {
		this.HighlightRules = XmlHighlightRules;
		this.$behaviour = new XmlBehaviour();
		this.foldingRules = new XmlFoldMode();
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.voidElements = lang.arrayToMap([]);
		this.blockComment = {
			start: "<!--",
			end: "-->"
		};
		this.createWorker = function(session) {
			var worker = new WorkerClient(["ace"], "ace/mode/xml_worker", "Worker");
			worker.attachToDocument(session.getDocument());
			worker.on("error", function(e) {
				session.setAnnotations(e.data);
			});
			worker.on("terminate", function() {
				session.clearAnnotations();
			});
			return worker;
		};
		this.$id = "ace/mode/xml";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export { require_xml as t };
