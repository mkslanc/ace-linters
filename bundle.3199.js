"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[3199],{

/***/ 23199:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjMxOTkuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7QUFDYixRQUFRLFlBQVksRUFBRSxtQkFBTyxDQUFDLEtBQWM7QUFDNUMsb0JBQW9CLGlEQUF5Qzs7QUFFN0Q7QUFDQTtBQUNBLGVBQWUsUUFBUTtBQUN2QixlQUFlLFdBQVc7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZUFBZSxRQUFRO0FBQ3ZCLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsaURBQWlEO0FBQzVELGFBQWEsaURBQWlEO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsbUNBQW1DO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQSxnQkFBZ0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9leHQvc2ltcGxlX3Rva2VuaXplci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbmNvbnN0IHsgVG9rZW5pemVyIH0gPSByZXF1aXJlKFwiLi4vdG9rZW5pemVyXCIpO1xuY29uc3QgaXNUZXh0VG9rZW4gPSByZXF1aXJlKFwiLi4vbGF5ZXIvdGV4dF91dGlsXCIpLmlzVGV4dFRva2VuO1xuXG5jbGFzcyBTaW1wbGVUb2tlbml6ZXIge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZW50IFxuICAgICAqIEBwYXJhbSB7VG9rZW5pemVyfSB0b2tlbml6ZXIgXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29udGVudCwgdG9rZW5pemVyKSB7XG4gICAgICAgIHRoaXMuX2xpbmVzID0gY29udGVudC5zcGxpdCgvXFxyXFxufFxccnxcXG4vKTtcbiAgICAgICAgdGhpcy5fc3RhdGVzID0gW107XG4gICAgICAgIHRoaXMuX3Rva2VuaXplciA9IHRva2VuaXplcjtcbiAgICB9ICAgXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcm93IFxuICAgICAqIEByZXR1cm5zIHtpbXBvcnQoXCIuLi8uLi9hY2UtaW50ZXJuYWxcIikuQWNlLlRva2VuW119XG4gICAgICovXG4gICAgZ2V0VG9rZW5zKHJvdykge1xuICAgICAgICBjb25zdCBsaW5lID0gdGhpcy5fbGluZXNbcm93XTtcbiAgICAgICAgY29uc3QgcHJldmlvdXNTdGF0ZSA9IHRoaXMuX3N0YXRlc1tyb3cgLSAxXTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLl90b2tlbml6ZXIuZ2V0TGluZVRva2VucyhsaW5lLCBwcmV2aW91c1N0YXRlKTtcbiAgICAgICAgdGhpcy5fc3RhdGVzW3Jvd10gPSBkYXRhLnN0YXRlO1xuICAgICAgICByZXR1cm4gZGF0YS50b2tlbnM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge251bWJlcn0gXG4gICAgICovXG4gICAgZ2V0TGVuZ3RoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGluZXMubGVuZ3RoO1xuICAgIH1cbn1cblxuLyoqXG4gKiBQYXJzZXMgcHJvdmlkZWQgY29udGVudCBhY2NvcmRpbmcgdG8gcHJvdmlkZWQgaGlnaGxpZ2h0aW5nIHJ1bGVzIGFuZCByZXR1cm4gdG9rZW5zLiBcbiAqIFRva2VucyBlaXRoZXIgaGF2ZSB0aGUgY2xhc3NOYW1lIHNldCBhY2NvcmRpbmcgdG8gQWNlIHRoZW1lcyBvciBoYXZlIG5vIGNsYXNzTmFtZSBpZiB0aGV5IGFyZSBqdXN0IHB1cmUgdGV4dCB0b2tlbnMuXG4gKiBSZXN1bHQgaXMgYSBsaXN0IG9mIGxpc3Qgb2YgdG9rZW5zLCB3aGVyZSBlYWNoIGxpbmUgZnJvbSB0aGUgcHJvdmlkZWQgY29udGVudCBpcyBhIHNlcGFyYXRlIGxpc3Qgb2YgdG9rZW5zLlxuICogXG4gKiBAcGFyYW0ge3N0cmluZ30gY29udGVudCB0byB0b2tlbml6ZSBcbiAqIEBwYXJhbSB7aW1wb3J0KFwiLi4vLi4vYWNlLWludGVybmFsXCIpLkFjZS5IaWdobGlnaHRSdWxlc30gaGlnaGxpZ2h0UnVsZXMgZGVmaW5pbmcgdGhlIGxhbmd1YWdlIGdyYW1tYXIgXG4gKiBAcmV0dXJucyB7aW1wb3J0KFwiLi4vLi4vYWNlLWludGVybmFsXCIpLkFjZS5Ub2tlbml6ZVJlc3VsdH0gdG9rZW5pemF0aW9uIHJlc3VsdCBjb250YWluaW5nIGEgbGlzdCBvZiB0b2tlbiBmb3IgZWFjaCBvZiB0aGUgbGluZXMgZnJvbSBjb250ZW50XG4gKi9cbmZ1bmN0aW9uIHRva2VuaXplKGNvbnRlbnQsIGhpZ2hsaWdodFJ1bGVzKSB7XG4gICAgY29uc3QgdG9rZW5pemVyID0gbmV3IFNpbXBsZVRva2VuaXplcihjb250ZW50LCBuZXcgVG9rZW5pemVyKGhpZ2hsaWdodFJ1bGVzLmdldFJ1bGVzKCkpKTtcbiAgICBcbiAgICBsZXQgcmVzdWx0ID0gW107XG4gICAgZm9yIChsZXQgbGluZUluZGV4ID0gMDsgbGluZUluZGV4IDwgdG9rZW5pemVyLmdldExlbmd0aCgpOyBsaW5lSW5kZXgrKykge1xuICAgICAgICBjb25zdCBsaW5lVG9rZW5zID0gdG9rZW5pemVyLmdldFRva2VucyhsaW5lSW5kZXgpO1xuICAgICAgICByZXN1bHQucHVzaChsaW5lVG9rZW5zLm1hcCgodG9rZW4pID0+ICh7XG4gICAgICAgICAgICBjbGFzc05hbWU6IGlzVGV4dFRva2VuKHRva2VuLnR5cGUpID8gdW5kZWZpbmVkIDogXCJhY2VfXCIgKyB0b2tlbi50eXBlLnJlcGxhY2UoL1xcLi9nLCBcIiBhY2VfXCIpLFxuICAgICAgICAgICAgdmFsdWU6IHRva2VuLnZhbHVlXG4gICAgICAgIH0pKSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbmV4cG9ydHMudG9rZW5pemUgPSB0b2tlbml6ZTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=