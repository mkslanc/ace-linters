import { t as __commonJSMin } from "./chunk-iA-Slpst.js";
var require_rst_snippets = /* @__PURE__ */ __commonJSMin(((exports, module) => {
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
}));
export default require_rst_snippets();
export { require_rst_snippets as t };
