import { t as __commonJSMin } from "./chunk-iA-Slpst.js";
import { t as require_tokenizer } from "./tokenizer-C2b-GJMk.js";
import { t as require_text_util } from "./text_util-Bdb4x69F.js";
var require_simple_tokenizer = /* @__PURE__ */ __commonJSMin(((exports) => {
	var { Tokenizer } = require_tokenizer();
	var isTextToken = require_text_util().isTextToken;
	var SimpleTokenizer = class {
		constructor(content, tokenizer) {
			this._lines = content.split(/\r\n|\r|\n/);
			this._states = [];
			this._tokenizer = tokenizer;
		}
		getTokens(row) {
			const line = this._lines[row];
			const previousState = this._states[row - 1];
			const data = this._tokenizer.getLineTokens(line, previousState);
			this._states[row] = data.state;
			return data.tokens;
		}
		getLength() {
			return this._lines.length;
		}
	};
	function tokenize(content, highlightRules) {
		const tokenizer = new SimpleTokenizer(content, new Tokenizer(highlightRules.getRules()));
		let result = [];
		for (let lineIndex = 0; lineIndex < tokenizer.getLength(); lineIndex++) {
			const lineTokens = tokenizer.getTokens(lineIndex);
			result.push(lineTokens.map((token) => ({
				className: isTextToken(token.type) ? void 0 : "ace_" + token.type.replace(/\./g, " ace_"),
				value: token.value
			})));
		}
		return result;
	}
	exports.tokenize = tokenize;
}));
export default require_simple_tokenizer();
