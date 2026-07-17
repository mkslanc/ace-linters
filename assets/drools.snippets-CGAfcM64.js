import { t as __commonJSMin } from "./modulepreload-polyfill-DxDZhch-.js";
//#region node_modules/ace-code/src/snippets/drools.snippets.js
var require_drools_snippets = /* @__PURE__ */ __commonJSMin(((exports, module) => {
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
}));
//#endregion
export default require_drools_snippets();
export { require_drools_snippets as t };
