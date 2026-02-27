import { t as __commonJSMin } from "./chunk-iA-Slpst.js";
import { t as require_oop } from "./oop-DcdK5Mrs.js";
import { t as require_lang } from "./lang-DcNOSqFo.js";
import { t as require_text } from "./text-B9A1mx6l.js";
import { t as require_worker_client } from "./worker_client-CdpIySAD.js";
import { n as require_xml$1, t as require_xml$2 } from "./xml-CQieR9ap.js";
import { t as require_xml_highlight_rules } from "./xml_highlight_rules-C4X_gdGF.js";
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
