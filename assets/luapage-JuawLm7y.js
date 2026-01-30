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
import "./text-B9A1mx6l.js";
import "./token_iterator-CbfYmntj.js";
import "./fold_mode-D1xG2KFM.js";
import "./cstyle-D3R9cgNV.js";
import "./javascript_highlight_rules-DN609jMc.js";
import "./matching_brace_outdent-CFDbHlsY.js";
import "./xml--3d0d31h.js";
import "./javascript-CApcTAmC.js";
import "./css_highlight_rules-BLT2K-CI.js";
import "./css_completions-cTCh3tDP.js";
import "./css-RWozyC1g.js";
import "./css-BfgKoNmj.js";
import "./xml_highlight_rules-Dr0BgDyR.js";
import { t as require_html_highlight_rules } from "./html_highlight_rules-DWUfr8VU.js";
import "./mixed-B6aEv4ic.js";
import { t as require_html } from "./html-nEATR_ID.js";
import { t as require_lua_highlight_rules } from "./lua_highlight_rules-DHDFL7Fu.js";
import { t as require_lua } from "./lua-jkNiqU91.js";
var require_luapage_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var HtmlHighlightRules = require_html_highlight_rules().HtmlHighlightRules;
	var LuaHighlightRules = require_lua_highlight_rules().LuaHighlightRules;
	var LuaPageHighlightRules$1 = function() {
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
	oop$1.inherits(LuaPageHighlightRules$1, HtmlHighlightRules);
	exports.LuaPageHighlightRules = LuaPageHighlightRules$1;
}));
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
export default require_luapage();
