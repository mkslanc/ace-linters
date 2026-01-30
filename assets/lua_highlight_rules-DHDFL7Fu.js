import { t as __commonJSMin } from "./chunk-iA-Slpst.js";
import { t as require_oop } from "./oop-DcdK5Mrs.js";
import { a as require_text_highlight_rules } from "./text-B9A1mx6l.js";
var require_lua_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var LuaHighlightRules = function() {
		var keywords = "break|do|else|elseif|end|for|function|if|in|local|repeat|return|then|until|while|or|and|not";
		var builtinConstants = "true|false|nil|_G|_VERSION";
		var functions = "string|xpcall|package|tostring|print|os|unpack|require|getfenv|setmetatable|next|assert|tonumber|io|rawequal|collectgarbage|getmetatable|module|rawset|math|debug|pcall|table|newproxy|type|coroutine|_G|select|gcinfo|pairs|rawget|loadstring|ipairs|_VERSION|dofile|setfenv|load|error|loadfile|sub|upper|len|gfind|rep|find|match|char|dump|gmatch|reverse|byte|format|gsub|lower|preload|loadlib|loaded|loaders|cpath|config|path|seeall|exit|setlocale|date|getenv|difftime|remove|time|clock|tmpname|rename|execute|lines|write|close|flush|open|output|type|read|stderr|stdin|input|stdout|popen|tmpfile|log|max|acos|huge|ldexp|pi|cos|tanh|pow|deg|tan|cosh|sinh|random|randomseed|frexp|ceil|floor|rad|abs|sqrt|modf|asin|min|mod|fmod|log10|atan2|exp|sin|atan|getupvalue|debug|sethook|getmetatable|gethook|setmetatable|setlocal|traceback|setfenv|getinfo|setupvalue|getlocal|getregistry|getfenv|setn|insert|getn|foreachi|maxn|foreach|concat|sort|remove|resume|yield|status|wrap|create|running|__add|__sub|__mod|__unm|__concat|__lt|__index|__call|__gc|__metatable|__mul|__div|__pow|__len|__eq|__le|__newindex|__tostring|__mode|__tonumber";
		var stdLibaries = "string|package|os|io|math|debug|table|coroutine";
		var deprecatedIn5152 = "setn|foreach|foreachi|gcinfo|log10|maxn";
		var keywordMapper = this.createKeywordMapper({
			"keyword": keywords,
			"support.function": functions,
			"keyword.deprecated": deprecatedIn5152,
			"constant.library": stdLibaries,
			"constant.language": builtinConstants,
			"variable.language": "self"
		}, "identifier");
		var integer = "(?:(?:(?:[1-9]\\d*)|(?:0))|(?:0[xX][\\dA-Fa-f]+))";
		var fraction = "(?:\\.\\d+)";
		var intPart = "(?:\\d+)";
		var floatNumber = "(?:" + ("(?:(?:" + intPart + "?" + fraction + ")|(?:" + intPart + "\\.))") + ")";
		this.$rules = { "start": [
			{
				stateName: "bracketedComment",
				onMatch: function(value, currentState, stack) {
					stack.unshift(this.next, value.length - 2, currentState);
					return "comment";
				},
				regex: /\-\-\[=*\[/,
				next: [{
					onMatch: function(value, currentState, stack) {
						if (value.length == stack[1]) {
							stack.shift();
							stack.shift();
							this.next = stack.shift();
						} else this.next = "";
						return "comment";
					},
					regex: /\]=*\]/,
					next: "start"
				}, { defaultToken: "comment.body" }]
			},
			{
				token: "comment",
				regex: "\\-\\-.*$"
			},
			{
				stateName: "bracketedString",
				onMatch: function(value, currentState, stack) {
					stack.unshift(this.next, value.length, currentState);
					return "string.start";
				},
				regex: /\[=*\[/,
				next: [{
					onMatch: function(value, currentState, stack) {
						if (value.length == stack[1]) {
							stack.shift();
							stack.shift();
							this.next = stack.shift();
						} else this.next = "";
						return "string.end";
					},
					regex: /\]=*\]/,
					next: "start"
				}, { defaultToken: "string" }]
			},
			{
				token: "string",
				regex: "\"(?:[^\\\\]|\\\\.)*?\""
			},
			{
				token: "string",
				regex: "'(?:[^\\\\]|\\\\.)*?'"
			},
			{
				token: "constant.numeric",
				regex: floatNumber
			},
			{
				token: "constant.numeric",
				regex: integer + "\\b"
			},
			{
				token: keywordMapper,
				regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
			},
			{
				token: "keyword.operator",
				regex: "\\+|\\-|\\*|\\/|%|\\#|\\^|~|<|>|<=|=>|==|~=|=|\\:|\\.\\.\\.|\\.\\."
			},
			{
				token: "paren.lparen",
				regex: "[\\[\\(\\{]"
			},
			{
				token: "paren.rparen",
				regex: "[\\]\\)\\}]"
			},
			{
				token: "text",
				regex: "\\s+|\\w+"
			}
		] };
		this.normalizeRules();
	};
	oop.inherits(LuaHighlightRules, TextHighlightRules);
	exports.LuaHighlightRules = LuaHighlightRules;
}));
export { require_lua_highlight_rules as t };
