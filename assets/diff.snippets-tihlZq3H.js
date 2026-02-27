import { t as __commonJSMin } from "./chunk-iA-Slpst.js";
var require_diff_snippets = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = `# DEP-3 (http://dep.debian.net/deps/dep3/) style patch header
snippet header DEP-3 style header
	Description: \${1}
	Origin: \${2:vendor|upstream|other}, \${3:url of the original patch}
	Bug: \${4:url in upstream bugtracker}
	Forwarded: \${5:no|not-needed|url}
	Author: \${6:\`g:snips_author\`}
	Reviewed-by: \${7:name and email}
	Last-Update: \${8:\`strftime("%Y-%m-%d")\`}
	Applied-Upstream: \${9:upstream version|url|commit}

`;
}));
export default require_diff_snippets();
export { require_diff_snippets as t };
