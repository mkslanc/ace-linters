import { t as __commonJSMin } from "./chunk-iA-Slpst.js";
import { t as require_oop } from "./oop-DcdK5Mrs.js";
import { a as require_text_highlight_rules } from "./text-B9A1mx6l.js";
var require_doc_comment_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var DocCommentHighlightRules = function() {
		this.$rules = { "start": [
			{
				token: "comment.doc.tag",
				regex: "@\\w+(?=\\s|$)"
			},
			DocCommentHighlightRules.getTagRule(),
			{
				defaultToken: "comment.doc.body",
				caseInsensitive: true
			}
		] };
	};
	oop.inherits(DocCommentHighlightRules, TextHighlightRules);
	DocCommentHighlightRules.getTagRule = function(start) {
		return {
			token: "comment.doc.tag.storage.type",
			regex: "\\b(?:TODO|FIXME|XXX|HACK)\\b"
		};
	};
	DocCommentHighlightRules.getStartRule = function(start) {
		return {
			token: "comment.doc",
			regex: /\/\*\*(?!\/)/,
			next: start
		};
	};
	DocCommentHighlightRules.getEndRule = function(start) {
		return {
			token: "comment.doc",
			regex: "\\*\\/",
			next: start
		};
	};
	exports.DocCommentHighlightRules = DocCommentHighlightRules;
}));
export { require_doc_comment_highlight_rules as t };
