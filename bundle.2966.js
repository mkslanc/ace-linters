(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[2966],{

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
//# sourceMappingURL=bundle.2966.js.map