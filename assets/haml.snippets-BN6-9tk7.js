import { t as __commonJSMin } from "./chunk-iA-Slpst.js";
var require_haml_snippets = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = `snippet t
	%table
		%tr
			%th
				\${1:headers}
		%tr
			%td
				\${2:headers}
snippet ul
	%ul
		%li
			\${1:item}
		%li
snippet =rp
	= render :partial => '\${1:partial}'
snippet =rpl
	= render :partial => '\${1:partial}', :locals => {}
snippet =rpc
	= render :partial => '\${1:partial}', :collection => @\$1

`;
}));
export default require_haml_snippets();
export { require_haml_snippets as t };
