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
import { t as require_text } from "./text-B9A1mx6l.js";
import "./token_iterator-CbfYmntj.js";
import "./fold_mode-D1xG2KFM.js";
import "./coffee-DtCgMn7G.js";
import "./cstyle-D3R9cgNV.js";
import "./javascript_highlight_rules-DN609jMc.js";
import "./matching_brace_outdent-CFDbHlsY.js";
import "./xml--3d0d31h.js";
import { t as require_javascript } from "./javascript-CApcTAmC.js";
import "./css_highlight_rules-BLT2K-CI.js";
import "./css_completions-cTCh3tDP.js";
import "./css-RWozyC1g.js";
import { t as require_css } from "./css-BfgKoNmj.js";
import "./xml_highlight_rules-Dr0BgDyR.js";
import "./html_highlight_rules-DWUfr8VU.js";
import "./mixed-B6aEv4ic.js";
import "./html-nEATR_ID.js";
import "./coffee_highlight_rules-BTKpZpsg.js";
import { t as require_coffee } from "./coffee-CDLV01i3.js";
import "./sh_highlight_rules-ClwJ26O-.js";
import "./sh-BM_uUBHQ.js";
import "./ruby_highlight_rules-Qe-ihOA3.js";
import { t as require_ruby } from "./ruby-Cny99MUE.js";
import "./markdown_highlight_rules-B3gJqP7-.js";
import "./scss_highlight_rules-SJzSgfdJ.js";
import "./less_highlight_rules-DYPAl-zu.js";
import { t as require_less } from "./less-BS61vI5I.js";
import "./xml-CtBFQJt8.js";
import { t as require_markdown } from "./markdown-C4MkfEwU.js";
import "./sass_highlight_rules-DdB6-NFm.js";
import { t as require_sass } from "./sass-Dm9xiUvb.js";
import { t as require_scss } from "./scss-BmpWRQFv.js";
import { t as require_slim_highlight_rules } from "./slim_highlight_rules-CLgbk9L1.js";
var require_slim = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var SlimHighlightRules = require_slim_highlight_rules().SlimHighlightRules;
	var Mode = function() {
		TextMode.call(this);
		this.HighlightRules = SlimHighlightRules;
		this.createModeDelegates({
			javascript: require_javascript().Mode,
			markdown: require_markdown().Mode,
			coffee: require_coffee().Mode,
			scss: require_scss().Mode,
			sass: require_sass().Mode,
			less: require_less().Mode,
			ruby: require_ruby().Mode,
			css: require_css().Mode
		});
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.$id = "ace/mode/slim";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_slim();
