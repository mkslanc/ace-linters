"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[3199],{

/***/ 23199:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/**
 * ## Simple tokenizer extension
 *
 * Provides standalone tokenization functionality that can parse code content using Ace's highlight rules without
 * requiring a full editor instance. This is useful for generating syntax-highlighted tokens for external rendering,
 * static code generation, or testing tokenization rules. The tokenizer processes text line by line and returns
 * structured token data with CSS class names compatible with Ace themes.
 *
 * **Usage:**
 * ```javascript
 * const { tokenize } = require("ace/ext/simple_tokenizer");
 * const { JsonHighlightRules } = require("ace/mode/json_highlight_rules");
 *
 * const content = '{"name": "value"}';
 * const tokens = tokenize(content, new JsonHighlightRules());
 * // Returns: [[{className: "ace_paren ace_lparen", value: "{"}, ...]]
 * ```
 *
 * @module
 */


const { Tokenizer } = __webpack_require__(32934);
const isTextToken = (__webpack_require__(41109)/* .isTextToken */ .t);

class SimpleTokenizer {
    /**
     * @param {string} content 
     * @param {Tokenizer} tokenizer 
     */
    constructor(content, tokenizer) {
        this._lines = content.split(/\r\n|\r|\n/);
        this._states = [];
        this._tokenizer = tokenizer;
    }   

    /**
     * @param {number} row 
     * @returns {import("../../ace-internal").Ace.Token[]}
     */
    getTokens(row) {
        const line = this._lines[row];
        const previousState = this._states[row - 1];
        
        const data = this._tokenizer.getLineTokens(line, previousState);
        this._states[row] = data.state;
        return data.tokens;
    }

    /**
     * @returns {number} 
     */
    getLength() {
        return this._lines.length;
    }
}

/**
 * Parses provided content according to provided highlighting rules and return tokens. 
 * Tokens either have the className set according to Ace themes or have no className if they are just pure text tokens.
 * Result is a list of list of tokens, where each line from the provided content is a separate list of tokens.
 * 
 * @param {string} content to tokenize 
 * @param {import("../../ace-internal").Ace.HighlightRules} highlightRules defining the language grammar 
 * @returns {import("../../ace-internal").Ace.TokenizeResult} tokenization result containing a list of token for each of the lines from content
 */
function tokenize(content, highlightRules) {
    const tokenizer = new SimpleTokenizer(content, new Tokenizer(highlightRules.getRules()));
    
    let result = [];
    for (let lineIndex = 0; lineIndex < tokenizer.getLength(); lineIndex++) {
        const lineTokens = tokenizer.getTokens(lineIndex);
        result.push(lineTokens.map((token) => ({
            className: isTextToken(token.type) ? undefined : "ace_" + token.type.replace(/\./g, " ace_"),
            value: token.value
        })));
    }
    return result;
}

exports.tokenize = tokenize;

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjMxOTkuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFdBQVc7QUFDdEIsV0FBVyxxQkFBcUI7QUFDaEM7QUFDQSxxQkFBcUIsZ0JBQWdCO0FBQ3JDO0FBQ0Esa0JBQWtCLDRDQUE0QyxFQUFFO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBOztBQUVhO0FBQ2IsUUFBUSxZQUFZLEVBQUUsbUJBQU8sQ0FBQyxLQUFjO0FBQzVDLG9CQUFvQixpREFBeUM7O0FBRTdEO0FBQ0E7QUFDQSxlQUFlLFFBQVE7QUFDdkIsZUFBZSxXQUFXO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGVBQWUsUUFBUTtBQUN2QixpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLGlEQUFpRDtBQUM1RCxhQUFhLGlEQUFpRDtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLG1DQUFtQztBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUEsZ0JBQWdCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvZXh0L3NpbXBsZV90b2tlbml6ZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiAjIyBTaW1wbGUgdG9rZW5pemVyIGV4dGVuc2lvblxuICpcbiAqIFByb3ZpZGVzIHN0YW5kYWxvbmUgdG9rZW5pemF0aW9uIGZ1bmN0aW9uYWxpdHkgdGhhdCBjYW4gcGFyc2UgY29kZSBjb250ZW50IHVzaW5nIEFjZSdzIGhpZ2hsaWdodCBydWxlcyB3aXRob3V0XG4gKiByZXF1aXJpbmcgYSBmdWxsIGVkaXRvciBpbnN0YW5jZS4gVGhpcyBpcyB1c2VmdWwgZm9yIGdlbmVyYXRpbmcgc3ludGF4LWhpZ2hsaWdodGVkIHRva2VucyBmb3IgZXh0ZXJuYWwgcmVuZGVyaW5nLFxuICogc3RhdGljIGNvZGUgZ2VuZXJhdGlvbiwgb3IgdGVzdGluZyB0b2tlbml6YXRpb24gcnVsZXMuIFRoZSB0b2tlbml6ZXIgcHJvY2Vzc2VzIHRleHQgbGluZSBieSBsaW5lIGFuZCByZXR1cm5zXG4gKiBzdHJ1Y3R1cmVkIHRva2VuIGRhdGEgd2l0aCBDU1MgY2xhc3MgbmFtZXMgY29tcGF0aWJsZSB3aXRoIEFjZSB0aGVtZXMuXG4gKlxuICogKipVc2FnZToqKlxuICogYGBgamF2YXNjcmlwdFxuICogY29uc3QgeyB0b2tlbml6ZSB9ID0gcmVxdWlyZShcImFjZS9leHQvc2ltcGxlX3Rva2VuaXplclwiKTtcbiAqIGNvbnN0IHsgSnNvbkhpZ2hsaWdodFJ1bGVzIH0gPSByZXF1aXJlKFwiYWNlL21vZGUvanNvbl9oaWdobGlnaHRfcnVsZXNcIik7XG4gKlxuICogY29uc3QgY29udGVudCA9ICd7XCJuYW1lXCI6IFwidmFsdWVcIn0nO1xuICogY29uc3QgdG9rZW5zID0gdG9rZW5pemUoY29udGVudCwgbmV3IEpzb25IaWdobGlnaHRSdWxlcygpKTtcbiAqIC8vIFJldHVybnM6IFtbe2NsYXNzTmFtZTogXCJhY2VfcGFyZW4gYWNlX2xwYXJlblwiLCB2YWx1ZTogXCJ7XCJ9LCAuLi5dXVxuICogYGBgXG4gKlxuICogQG1vZHVsZVxuICovXG5cblwidXNlIHN0cmljdFwiO1xuY29uc3QgeyBUb2tlbml6ZXIgfSA9IHJlcXVpcmUoXCIuLi90b2tlbml6ZXJcIik7XG5jb25zdCBpc1RleHRUb2tlbiA9IHJlcXVpcmUoXCIuLi9sYXllci90ZXh0X3V0aWxcIikuaXNUZXh0VG9rZW47XG5cbmNsYXNzIFNpbXBsZVRva2VuaXplciB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvbnRlbnQgXG4gICAgICogQHBhcmFtIHtUb2tlbml6ZXJ9IHRva2VuaXplciBcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcihjb250ZW50LCB0b2tlbml6ZXIpIHtcbiAgICAgICAgdGhpcy5fbGluZXMgPSBjb250ZW50LnNwbGl0KC9cXHJcXG58XFxyfFxcbi8pO1xuICAgICAgICB0aGlzLl9zdGF0ZXMgPSBbXTtcbiAgICAgICAgdGhpcy5fdG9rZW5pemVyID0gdG9rZW5pemVyO1xuICAgIH0gICBcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSByb3cgXG4gICAgICogQHJldHVybnMge2ltcG9ydChcIi4uLy4uL2FjZS1pbnRlcm5hbFwiKS5BY2UuVG9rZW5bXX1cbiAgICAgKi9cbiAgICBnZXRUb2tlbnMocm93KSB7XG4gICAgICAgIGNvbnN0IGxpbmUgPSB0aGlzLl9saW5lc1tyb3ddO1xuICAgICAgICBjb25zdCBwcmV2aW91c1N0YXRlID0gdGhpcy5fc3RhdGVzW3JvdyAtIDFdO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgZGF0YSA9IHRoaXMuX3Rva2VuaXplci5nZXRMaW5lVG9rZW5zKGxpbmUsIHByZXZpb3VzU3RhdGUpO1xuICAgICAgICB0aGlzLl9zdGF0ZXNbcm93XSA9IGRhdGEuc3RhdGU7XG4gICAgICAgIHJldHVybiBkYXRhLnRva2VucztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSBcbiAgICAgKi9cbiAgICBnZXRMZW5ndGgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9saW5lcy5sZW5ndGg7XG4gICAgfVxufVxuXG4vKipcbiAqIFBhcnNlcyBwcm92aWRlZCBjb250ZW50IGFjY29yZGluZyB0byBwcm92aWRlZCBoaWdobGlnaHRpbmcgcnVsZXMgYW5kIHJldHVybiB0b2tlbnMuIFxuICogVG9rZW5zIGVpdGhlciBoYXZlIHRoZSBjbGFzc05hbWUgc2V0IGFjY29yZGluZyB0byBBY2UgdGhlbWVzIG9yIGhhdmUgbm8gY2xhc3NOYW1lIGlmIHRoZXkgYXJlIGp1c3QgcHVyZSB0ZXh0IHRva2Vucy5cbiAqIFJlc3VsdCBpcyBhIGxpc3Qgb2YgbGlzdCBvZiB0b2tlbnMsIHdoZXJlIGVhY2ggbGluZSBmcm9tIHRoZSBwcm92aWRlZCBjb250ZW50IGlzIGEgc2VwYXJhdGUgbGlzdCBvZiB0b2tlbnMuXG4gKiBcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZW50IHRvIHRva2VuaXplIFxuICogQHBhcmFtIHtpbXBvcnQoXCIuLi8uLi9hY2UtaW50ZXJuYWxcIikuQWNlLkhpZ2hsaWdodFJ1bGVzfSBoaWdobGlnaHRSdWxlcyBkZWZpbmluZyB0aGUgbGFuZ3VhZ2UgZ3JhbW1hciBcbiAqIEByZXR1cm5zIHtpbXBvcnQoXCIuLi8uLi9hY2UtaW50ZXJuYWxcIikuQWNlLlRva2VuaXplUmVzdWx0fSB0b2tlbml6YXRpb24gcmVzdWx0IGNvbnRhaW5pbmcgYSBsaXN0IG9mIHRva2VuIGZvciBlYWNoIG9mIHRoZSBsaW5lcyBmcm9tIGNvbnRlbnRcbiAqL1xuZnVuY3Rpb24gdG9rZW5pemUoY29udGVudCwgaGlnaGxpZ2h0UnVsZXMpIHtcbiAgICBjb25zdCB0b2tlbml6ZXIgPSBuZXcgU2ltcGxlVG9rZW5pemVyKGNvbnRlbnQsIG5ldyBUb2tlbml6ZXIoaGlnaGxpZ2h0UnVsZXMuZ2V0UnVsZXMoKSkpO1xuICAgIFxuICAgIGxldCByZXN1bHQgPSBbXTtcbiAgICBmb3IgKGxldCBsaW5lSW5kZXggPSAwOyBsaW5lSW5kZXggPCB0b2tlbml6ZXIuZ2V0TGVuZ3RoKCk7IGxpbmVJbmRleCsrKSB7XG4gICAgICAgIGNvbnN0IGxpbmVUb2tlbnMgPSB0b2tlbml6ZXIuZ2V0VG9rZW5zKGxpbmVJbmRleCk7XG4gICAgICAgIHJlc3VsdC5wdXNoKGxpbmVUb2tlbnMubWFwKCh0b2tlbikgPT4gKHtcbiAgICAgICAgICAgIGNsYXNzTmFtZTogaXNUZXh0VG9rZW4odG9rZW4udHlwZSkgPyB1bmRlZmluZWQgOiBcImFjZV9cIiArIHRva2VuLnR5cGUucmVwbGFjZSgvXFwuL2csIFwiIGFjZV9cIiksXG4gICAgICAgICAgICB2YWx1ZTogdG9rZW4udmFsdWVcbiAgICAgICAgfSkpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0cy50b2tlbml6ZSA9IHRva2VuaXplOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==