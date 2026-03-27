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
import "./text-x9TxHOMd.js";
import "./token_iterator-B0gzmLw-.js";
import "./fold_mode-DLWDk-fx.js";
import "./cstyle-DX2ORGlO.js";
import "./javascript_highlight_rules-Bq39j4o6.js";
import "./matching_brace_outdent-BNxYFHLW.js";
import "./xml-aNrtpxN-.js";
import "./javascript-CNVEwPsW.js";
import "./css_highlight_rules-BrA4daTy.js";
import "./css_completions-j9TDmcq8.js";
import "./css-DLrW6Pji.js";
import "./css-BCtfNldA.js";
import "./xml_highlight_rules-Ch7nsDP3.js";
import { t as require_html_highlight_rules } from "./html_highlight_rules-C5s9oMLE.js";
import "./mixed-sNoniz_T.js";
import { t as require_html } from "./html-B8wEf2Cx.js";
import { t as require_lua_highlight_rules } from "./lua_highlight_rules-VYSrUGTK.js";
import { t as require_lua } from "./lua-mAuEgfBJ.js";
//#region node_modules/ace-code/src/mode/luapage_highlight_rules.js
var require_luapage_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var HtmlHighlightRules = require_html_highlight_rules().HtmlHighlightRules;
	var LuaHighlightRules = require_lua_highlight_rules().LuaHighlightRules;
	var LuaPageHighlightRules = function() {
		HtmlHighlightRules.call(this);
		var startRules = [{
			token: "keyword",
			regex: "<\\%\\=?",
			push: "lua-start"
		}, {
			token: "keyword",
			regex: "<\\?lua\\=?",
			push: "lua-start"
		}];
		this.embedRules(LuaHighlightRules, "lua-", [{
			token: "keyword",
			regex: "\\%>",
			next: "pop"
		}, {
			token: "keyword",
			regex: "\\?>",
			next: "pop"
		}], ["start"]);
		for (var key in this.$rules) this.$rules[key].unshift.apply(this.$rules[key], startRules);
		this.normalizeRules();
	};
	oop.inherits(LuaPageHighlightRules, HtmlHighlightRules);
	exports.LuaPageHighlightRules = LuaPageHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/luapage.js
var require_luapage = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var HtmlMode = require_html().Mode;
	var LuaMode = require_lua().Mode;
	var LuaPageHighlightRules = require_luapage_highlight_rules().LuaPageHighlightRules;
	var Mode = function() {
		HtmlMode.call(this);
		this.HighlightRules = LuaPageHighlightRules;
		this.createModeDelegates({ "lua-": LuaMode });
	};
	oop.inherits(Mode, HtmlMode);
	(function() {
		this.$id = "ace/mode/luapage";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
//#endregion
export default require_luapage();
