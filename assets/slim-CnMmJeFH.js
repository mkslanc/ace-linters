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
import { t as require_text } from "./text-D8sm5DzM.js";
import "./token_iterator-BNxpI84f.js";
import "./fold_mode-D_StAfa6.js";
import "./coffee-DSl0AWcz.js";
import "./cstyle-DxkoJQhq.js";
import "./javascript_highlight_rules-DZzo6_DD.js";
import "./matching_brace_outdent-BHWbJige.js";
import "./xml-MVkSt0S-.js";
import { t as require_javascript } from "./javascript-CtbB98r6.js";
import "./css_highlight_rules-_E_vcaY_.js";
import "./css_completions-C2GxC1IS.js";
import "./css-BIWs6ZVC.js";
import { t as require_css } from "./css-C0jKnsYY.js";
import "./xml_highlight_rules-DkcOGcVi.js";
import "./html_highlight_rules-DFgdMIml.js";
import "./mixed-CB1dzpdX.js";
import "./html-DaEx_Icq.js";
import "./coffee_highlight_rules-CQ0mFdxP.js";
import { t as require_coffee } from "./coffee-_cSQUhx0.js";
import "./sh_highlight_rules-FZywQ7yo.js";
import "./sh-CT5FGlUg.js";
import "./ruby_highlight_rules-Bn9h6Xux.js";
import { t as require_ruby } from "./ruby-Cymn5Lyk.js";
import "./markdown_highlight_rules-D9B88hKS.js";
import "./scss_highlight_rules-oX4dDtC1.js";
import "./less_highlight_rules-DViB8yJe.js";
import { t as require_less } from "./less-C8aRSUfs.js";
import "./xml-B7YH8_Al.js";
import { t as require_markdown } from "./markdown-CaZw61QX.js";
import "./sass_highlight_rules-DHJwuK7l.js";
import { t as require_sass } from "./sass-rmG4m_K7.js";
import { t as require_scss } from "./scss-DMJPuNQC.js";
import { t as require_slim_highlight_rules } from "./slim_highlight_rules-DR5o0h5s.js";
//#region node_modules/ace-code/src/mode/slim.js
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
//#endregion
export default require_slim();
