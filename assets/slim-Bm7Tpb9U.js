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
import "./coffee-DPgCu_13.js";
import "./cstyle-C6ktp4d4.js";
import "./javascript_highlight_rules-DP2X209F.js";
import "./matching_brace_outdent-CSXbwYsT.js";
import "./xml-CQieR9ap.js";
import { t as require_javascript } from "./javascript-Bgq9ZLIq.js";
import "./css_highlight_rules-BN2AN0ZM.js";
import "./css_completions-C1qupuMi.js";
import "./css-B6QOS37f.js";
import { t as require_css } from "./css-ds7EYb5W.js";
import "./xml_highlight_rules-C4X_gdGF.js";
import "./html_highlight_rules-Dky29llI.js";
import "./mixed-Cyzulx9L.js";
import "./html-CZivRBj1.js";
import "./coffee_highlight_rules-DQ5cxQvG.js";
import { t as require_coffee } from "./coffee-B-No0wq2.js";
import "./sh_highlight_rules-H6mwzxLp.js";
import "./sh-C2pyZDOS.js";
import "./ruby_highlight_rules-Bo0T10Ak.js";
import { t as require_ruby } from "./ruby-xuUWj_Pz.js";
import "./markdown_highlight_rules-D1Ull-mW.js";
import "./scss_highlight_rules-B88XfZOg.js";
import "./less_highlight_rules-Dpd23VAp.js";
import { t as require_less } from "./less-CKrsbgNI.js";
import "./xml-BKWB4Xvu.js";
import { t as require_markdown } from "./markdown-CT3KjhxH.js";
import "./sass_highlight_rules-DkZ3boMS.js";
import { t as require_sass } from "./sass-qlAIyOWg.js";
import { t as require_scss } from "./scss-DN2zBwO0.js";
import { t as require_slim_highlight_rules } from "./slim_highlight_rules-AU1KuUKq.js";
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
