"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[3865],{

/***/ 13865:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
// defines the parent mode
var HtmlMode = (__webpack_require__(75528).Mode);
var MatchingBraceOutdent = (__webpack_require__(1164).MatchingBraceOutdent);
var HtmlFoldMode = (__webpack_require__(74505)/* .FoldMode */ .Z);

// defines the language specific highlighters and folding rules
var CurlyHighlightRules = (__webpack_require__(32726)/* .CurlyHighlightRules */ .b);

var Mode = function() {
    HtmlMode.call(this);
    this.HighlightRules = CurlyHighlightRules;
    this.$outdent = new MatchingBraceOutdent();
    this.foldingRules = new HtmlFoldMode();
};
oop.inherits(Mode, HtmlMode);

(function() {
    this.$id = "ace/mode/curly";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 32726:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var HtmlHighlightRules = (__webpack_require__(72843)/* .HtmlHighlightRules */ .V);


var CurlyHighlightRules = function() {
    HtmlHighlightRules.call(this);

    this.$rules["start"].unshift({
        token: "variable",
        regex: "{{",
        push: "curly-start"
    });

    this.$rules["curly-start"] = [{
        token: "variable",
        regex: "}}",
        next: "pop"
    }];

    this.normalizeRules();
};

oop.inherits(CurlyHighlightRules, HtmlHighlightRules);

exports.b = CurlyHighlightRules;


/***/ })

}]);
//# sourceMappingURL=bundle.3865.js.map