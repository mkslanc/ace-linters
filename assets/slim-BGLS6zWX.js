import { t as __commonJSMin } from "./rolldown-runtime-DQp2zzRu.js";
import { t as require_oop } from "./oop-CAYBcRVL.js";
import { t as require_text } from "./text-SKNm_D_P.js";
import { t as require_slim_highlight_rules } from "./slim_highlight_rules-BunKwtPI.js";
import { t as require_javascript } from "./javascript-wJ-ElQIV.js";
import { t as require_markdown } from "./markdown-Cd5VKakv.js";
import { t as require_coffee } from "./coffee-OKJVjNKB.js";
import { t as require_scss } from "./scss-BefmWzdH.js";
import { t as require_sass } from "./sass-Ml4_QC8c.js";
import { t as require_less } from "./less--gNjjFL-.js";
import { t as require_ruby } from "./ruby-aDMfYyrj.js";
import { t as require_css } from "./css-Dr_4Vo6o.js";
// node_modules/ace-code/src/mode/slim.js
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
