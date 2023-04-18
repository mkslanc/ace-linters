"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[6763],{

/***/ 36763:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var TextMode = (__webpack_require__(98030).Mode);
var GitignoreHighlightRules = (__webpack_require__(87088)/* .GitignoreHighlightRules */ .R);

var Mode = function() {
    this.HighlightRules = GitignoreHighlightRules;
    this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, TextMode);

(function() {
    this.lineCommentStart = "#";
    this.$id = "ace/mode/gitignore";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 87088:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var TextHighlightRules = (__webpack_require__(28053)/* .TextHighlightRules */ .K);

var GitignoreHighlightRules = function() {
    this.$rules = {
        "start" : [
            {
                token : "comment",
                regex : /^\s*#.*$/
            }, {
                token : "keyword", // negated patterns
                regex : /^\s*!.*$/
            }
        ]
    };
    
    this.normalizeRules();
};

GitignoreHighlightRules.metaData = {
    fileTypes: ['gitignore'],
    name: 'Gitignore'
};

oop.inherits(GitignoreHighlightRules, TextHighlightRules);

exports.R = GitignoreHighlightRules;


/***/ })

}]);
//# sourceMappingURL=bundle.6763.js.map