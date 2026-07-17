import { t as __commonJSMin } from "./modulepreload-polyfill-DxDZhch-.js";
import { t as require_oop } from "./oop-3KT-lR14.js";
import { t as require_text } from "./text-BG8jWbzl.js";
import { t as require_javascript } from "./javascript-BoOSq_P_.js";
import { t as require_css } from "./css-QL5fNZBW.js";
import { t as require_coffee } from "./coffee-C8AkOcFA.js";
import { t as require_ruby } from "./ruby-CTad3Pzs.js";
import { t as require_less } from "./less-C14Op5ZM.js";
import { t as require_markdown } from "./markdown-ClswuJDX.js";
import { t as require_sass } from "./sass-qnU75Uzl.js";
import { t as require_scss } from "./scss-QZLu3eKZ.js";
import { t as require_slim_highlight_rules } from "./slim_highlight_rules-DbRjrYL0.js";
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
