import { t as __commonJSMin } from "./chunk-iA-Slpst.js";
var require_textile_snippets = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = `# Jekyll post header
snippet header
	---
	title: \${1:title}
	layout: post
	date: \${2:date} \${3:hour:minute:second} -05:00
	---

# Image
snippet img
	!\${1:url}(\${2:title}):\${3:link}!

# Table
snippet |
	|\${1}|\${2}

# Link
snippet link
	"\${1:link text}":\${2:url}

# Acronym
snippet (
	(\${1:Expand acronym})\${2}

# Footnote
snippet fn
	[\${1:ref number}] \${3}

	fn\$1. \${2:footnote}
	
`;
}));
export default require_textile_snippets();
export { require_textile_snippets as t };
