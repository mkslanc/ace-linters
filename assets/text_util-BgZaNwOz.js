import { t as __commonJSMin } from "./rolldown-runtime-DQp2zzRu.js";
// node_modules/ace-code/src/layer/text_util.js
var require_text_util = /* @__PURE__ */ __commonJSMin(((exports) => {
	var textTokens = /* @__PURE__ */ new Set([
		"text",
		"rparen",
		"lparen"
	]);
	exports.isTextToken = function(tokenType) {
		return textTokens.has(tokenType);
	};
}));
export { require_text_util as t };
