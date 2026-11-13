import { t as __commonJSMin } from "./rolldown-runtime-DQp2zzRu.js";
import { t as require_oop } from "./oop-CAYBcRVL.js";
import { t as require_html } from "./html-BxtkmDuE.js";
import { t as require_lua } from "./lua-DCLq7qRW.js";
import { t as require_html_highlight_rules } from "./html_highlight_rules-DbXny5W0.js";
import { t as require_lua_highlight_rules } from "./lua_highlight_rules-DmEGmI7G.js";
// node_modules/ace-code/src/mode/luapage_highlight_rules.js
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
// node_modules/ace-code/src/mode/luapage.js
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
