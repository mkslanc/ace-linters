(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[5828,4254],{

/***/ 75828:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.snippetText = __webpack_require__(34254);
exports.scope = "rst";


/***/ }),

/***/ 34254:
/***/ ((module) => {

module.exports = `# rst

snippet :
	:\${1:field name}: \${2:field body}
snippet *
	*\${1:Emphasis}*
snippet **
	**\${1:Strong emphasis}**
snippet _
	\\\`\${1:hyperlink-name}\\\`_
	.. _\\\`\$1\\\`: \${2:link-block}
snippet =
	\${1:Title}
	=====\${2:=}
	\${3}
snippet -
	\${1:Title}
	-----\${2:-}
	\${3}
snippet cont:
	.. contents::
	
`;


/***/ })

}]);
//# sourceMappingURL=bundle.5828.js.map