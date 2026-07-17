import { t as __commonJSMin } from "./modulepreload-polyfill-DxDZhch-.js";
import { t as require_oop } from "./oop-3KT-lR14.js";
import { t as require_text } from "./text-BG8jWbzl.js";
import { t as require_cstyle } from "./cstyle-D1oWbM0K.js";
import { t as require_matching_brace_outdent } from "./matching_brace_outdent-eZgsj40c.js";
import { t as require_perl_highlight_rules } from "./perl_highlight_rules-BFF9MgyA.js";
//#region node_modules/ace-code/src/mode/perl.js
var require_perl = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var PerlHighlightRules = require_perl_highlight_rules().PerlHighlightRules;
	var MatchingBraceOutdent = require_matching_brace_outdent().MatchingBraceOutdent;
	var CStyleFoldMode = require_cstyle().FoldMode;
	var Mode = function() {
		this.HighlightRules = PerlHighlightRules;
		this.$outdent = new MatchingBraceOutdent();
		this.foldingRules = new CStyleFoldMode({
			start: "^=(begin|item)\\b",
			end: "^=(cut)\\b"
		});
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = "#";
		this.blockComment = [{
			start: "=begin",
			end: "=cut",
			lineStartOnly: true
		}, {
			start: "=item",
			end: "=cut",
			lineStartOnly: true
		}];
		this.getNextLineIndent = function(state, line, tab) {
			var indent = this.$getIndent(line);
			var tokens = this.getTokenizer().getLineTokens(line, state).tokens;
			if (tokens.length && tokens[tokens.length - 1].type == "comment") return indent;
			if (state == "start") {
				if (line.match(/^.*[\{\(\[:]\s*$/)) indent += tab;
			}
			return indent;
		};
		this.checkOutdent = function(state, line, input) {
			return this.$outdent.checkOutdent(line, input);
		};
		this.autoOutdent = function(state, doc, row) {
			this.$outdent.autoOutdent(doc, row);
		};
		this.$id = "ace/mode/perl";
		this.snippetFileId = "ace/snippets/perl";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
//#endregion
export default require_perl();
