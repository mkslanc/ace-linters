(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[8291,2966],{

/***/ 58291:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.snippetText = __webpack_require__(54155);
exports.scope = "drools";


/***/ }),

/***/ 54155:
/***/ ((module) => {

module.exports = `
snippet rule
	rule "\${1?:rule_name}"
	when
		\${2:// when...} 
	then
		\${3:// then...}
	end

snippet query
	query \${1?:query_name}
		\${2:// find} 
	end
	
snippet declare
	declare \${1?:type_name}
		\${2:// attributes} 
	end

`;


/***/ })

}]);
//# sourceMappingURL=bundle.8291.js.map