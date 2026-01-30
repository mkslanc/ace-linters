import { t as __commonJSMin } from "./chunk-iA-Slpst.js";
var require_text_util = /* @__PURE__ */ __commonJSMin(((exports) => {
	var textTokens = new Set([
		"text",
		"rparen",
		"lparen"
	]);
	exports.isTextToken = function(tokenType) {
		return textTokens.has(tokenType);
	};
}));
export { require_text_util as t };
