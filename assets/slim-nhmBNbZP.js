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
import "./coffee-BH30Aew3.js";
import "./cstyle-C7DhJywu.js";
import "./javascript_highlight_rules-DYonPjDQ.js";
import "./matching_brace_outdent-BSN6387q.js";
import "./xml-Dtr7aJAT.js";
import { t as require_javascript } from "./javascript-loi8Unzt.js";
import "./css_highlight_rules-WBsyWStl.js";
import "./css_completions-azoDzKVn.js";
import "./css-DZv-rZU-.js";
import { t as require_css } from "./css-CiLMIxp6.js";
import "./xml_highlight_rules-CDXGDPfE.js";
import "./html_highlight_rules-DnZSqR6j.js";
import "./mixed-BexatWzp.js";
import "./html-DDElvV2C.js";
import "./coffee_highlight_rules-DuSbsLj-.js";
import { t as require_coffee } from "./coffee-C8yzOGsU.js";
import "./sh_highlight_rules-DUsqYDK2.js";
import "./sh-Cg8iyyfJ.js";
import "./ruby_highlight_rules-DIa6HJxn.js";
import { t as require_ruby } from "./ruby-DlyMnnZU.js";
import "./markdown_highlight_rules-D5Pze0S2.js";
import "./scss_highlight_rules-C9Mtc7NS.js";
import "./less_highlight_rules-BP6cyH91.js";
import { t as require_less } from "./less-Qw66YZ-s.js";
import "./xml-BXrLfW-G.js";
import { t as require_markdown } from "./markdown-lKe8skfA.js";
import "./sass_highlight_rules-d-muFwmF.js";
import { t as require_sass } from "./sass-C_z8Zmhq.js";
import { t as require_scss } from "./scss-BAcI6FnU.js";
import { t as require_slim_highlight_rules } from "./slim_highlight_rules-DgKQB4KE.js";
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
