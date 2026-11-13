import { t as __commonJSMin } from "./rolldown-runtime-DQp2zzRu.js";
import { t as require_oop } from "./oop-CAYBcRVL.js";
import { t as require_text } from "./text-SKNm_D_P.js";
import { t as require_perl_highlight_rules } from "./perl_highlight_rules-xtK7I4zW.js";
import { t as require_matching_brace_outdent } from "./matching_brace_outdent-D3f_D02p.js";
import { t as require_cstyle } from "./cstyle-DG0AEg3n.js";
// node_modules/ace-code/src/mode/perl.js
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
export default require_perl();
