import { t as __commonJSMin } from "./chunk-iA-Slpst.js";
import { t as require_range } from "./range-BUVqNbwc.js";
var require_token_iterator = /* @__PURE__ */ __commonJSMin(((exports) => {
	var Range = require_range().Range;
	var TokenIterator = class {
		constructor(session, initialRow, initialColumn) {
			this.$session = session;
			this.$row = initialRow;
			this.$rowTokens = session.getTokens(initialRow);
			var token = session.getTokenAt(initialRow, initialColumn);
			this.$tokenIndex = token ? token.index : -1;
		}
		stepBackward() {
			this.$tokenIndex -= 1;
			while (this.$tokenIndex < 0) {
				this.$row -= 1;
				if (this.$row < 0) {
					this.$row = 0;
					return null;
				}
				this.$rowTokens = this.$session.getTokens(this.$row);
				this.$tokenIndex = this.$rowTokens.length - 1;
			}
			return this.$rowTokens[this.$tokenIndex];
		}
		stepForward() {
			this.$tokenIndex += 1;
			var rowCount;
			while (this.$tokenIndex >= this.$rowTokens.length) {
				this.$row += 1;
				if (!rowCount) rowCount = this.$session.getLength();
				if (this.$row >= rowCount) {
					this.$row = rowCount - 1;
					return null;
				}
				this.$rowTokens = this.$session.getTokens(this.$row);
				this.$tokenIndex = 0;
			}
			return this.$rowTokens[this.$tokenIndex];
		}
		getCurrentToken() {
			return this.$rowTokens[this.$tokenIndex];
		}
		getCurrentTokenRow() {
			return this.$row;
		}
		getCurrentTokenColumn() {
			var rowTokens = this.$rowTokens;
			var tokenIndex = this.$tokenIndex;
			var column = rowTokens[tokenIndex].start;
			if (column !== void 0) return column;
			column = 0;
			while (tokenIndex > 0) {
				tokenIndex -= 1;
				column += rowTokens[tokenIndex].value.length;
			}
			return column;
		}
		getCurrentTokenPosition() {
			return {
				row: this.$row,
				column: this.getCurrentTokenColumn()
			};
		}
		getCurrentTokenRange() {
			var token = this.$rowTokens[this.$tokenIndex];
			var column = this.getCurrentTokenColumn();
			return new Range(this.$row, column, this.$row, column + token.value.length);
		}
	};
	exports.TokenIterator = TokenIterator;
}));
export { require_token_iterator as t };
