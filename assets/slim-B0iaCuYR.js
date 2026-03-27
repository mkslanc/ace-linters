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
import { t as require_text } from "./text-x9TxHOMd.js";
import "./token_iterator-B0gzmLw-.js";
import "./fold_mode-DLWDk-fx.js";
import "./coffee-CKmePRUu.js";
import "./cstyle-DX2ORGlO.js";
import "./javascript_highlight_rules-Bq39j4o6.js";
import "./matching_brace_outdent-BNxYFHLW.js";
import "./xml-aNrtpxN-.js";
import { t as require_javascript } from "./javascript-CNVEwPsW.js";
import "./css_highlight_rules-BrA4daTy.js";
import "./css_completions-j9TDmcq8.js";
import "./css-DLrW6Pji.js";
import { t as require_css } from "./css-BCtfNldA.js";
import "./xml_highlight_rules-Ch7nsDP3.js";
import "./html_highlight_rules-C5s9oMLE.js";
import "./mixed-sNoniz_T.js";
import "./html-B8wEf2Cx.js";
import "./coffee_highlight_rules-D8KEDJjA.js";
import { t as require_coffee } from "./coffee-B--JbEoS.js";
import "./sh_highlight_rules-Ch1u_TpC.js";
import "./sh-BN-OngWc.js";
import "./ruby_highlight_rules-D1frpKFg.js";
import { t as require_ruby } from "./ruby-DJNrBrpS.js";
import "./markdown_highlight_rules-_xQ3EKon.js";
import "./scss_highlight_rules-DqufTyGx.js";
import "./less_highlight_rules-w8Nad9q_.js";
import { t as require_less } from "./less-Bhb5aMf2.js";
import "./xml-yrgHcdIT.js";
import { t as require_markdown } from "./markdown-D-Gz_Sxv.js";
import "./sass_highlight_rules-CHM7eNJL.js";
import { t as require_sass } from "./sass-v4Fiwa1b.js";
import { t as require_scss } from "./scss-DPY65_AF.js";
import { t as require_slim_highlight_rules } from "./slim_highlight_rules-kVot3bnV.js";
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
