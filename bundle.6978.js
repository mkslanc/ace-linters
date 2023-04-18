(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[6978,1990],{

/***/ 36978:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.snippetText = __webpack_require__(71990);
exports.scope = "graphqlschema";


/***/ }),

/***/ 71990:
/***/ ((module) => {

module.exports = `# Type Snippet
trigger type
snippet type
	type \${1:type_name} {
		\${2:type_siblings}
	}

# Input Snippet
trigger input
snippet input
	input \${1:input_name} {
		\${2:input_siblings}
	}

# Interface Snippet
trigger interface
snippet interface
	interface \${1:interface_name} {
		\${2:interface_siblings}
	}

# Interface Snippet
trigger union
snippet union
	union \${1:union_name} = \${2:type} | \${3: type}

# Enum Snippet
trigger enum
snippet enum
	enum \${1:enum_name} {
		\${2:enum_siblings}
	}
`;


/***/ })

}]);
//# sourceMappingURL=bundle.6978.js.map