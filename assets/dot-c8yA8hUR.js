import { t as __commonJSMin } from "./chunk-Cu_MO8PN.js";
import "./useragent-BMYEMUd9.js";
import "./dom-DRNmwCmL.js";
import "./range-BakcZ9jR.js";
import { t as require_oop } from "./oop-DrExWoUW.js";
import { t as require_lang } from "./lang-Chfjzp5y.js";
import "./config-7GJDZd_b.js";
import "./event_emitter-r-lZpQyf.js";
import "./textmate-CN2VrF7f.js";
import "./tokenizer-B5s1nUwH.js";
import { a as require_text_highlight_rules, t as require_text } from "./text-D8sm5DzM.js";
import "./token_iterator-BNxpI84f.js";
import "./fold_mode-D_StAfa6.js";
import { t as require_cstyle } from "./cstyle-DxkoJQhq.js";
import { t as require_doc_comment_highlight_rules } from "./doc_comment_highlight_rules-Crv5ZBqX.js";
import { t as require_matching_brace_outdent } from "./matching_brace_outdent-BHWbJige.js";
//#region node_modules/ace-code/src/mode/dot_highlight_rules.js
var require_dot_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var lang = require_lang();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	require_doc_comment_highlight_rules().DocCommentHighlightRules;
	var DotHighlightRules = function() {
		var keywords = lang.arrayToMap("strict|node|edge|graph|digraph|subgraph".split("|"));
		var attributes = lang.arrayToMap("damping|k|url|area|arrowhead|arrowsize|arrowtail|aspect|bb|bgcolor|center|charset|clusterrank|color|colorscheme|comment|compound|concentrate|constraint|decorate|defaultdist|dim|dimen|dir|diredgeconstraints|distortion|dpi|edgeurl|edgehref|edgetarget|edgetooltip|epsilon|esep|fillcolor|fixedsize|fontcolor|fontname|fontnames|fontpath|fontsize|forcelabels|gradientangle|group|headurl|head_lp|headclip|headhref|headlabel|headport|headtarget|headtooltip|height|href|id|image|imagepath|imagescale|label|labelurl|label_scheme|labelangle|labeldistance|labelfloat|labelfontcolor|labelfontname|labelfontsize|labelhref|labeljust|labelloc|labeltarget|labeltooltip|landscape|layer|layerlistsep|layers|layerselect|layersep|layout|len|levels|levelsgap|lhead|lheight|lp|ltail|lwidth|margin|maxiter|mclimit|mindist|minlen|mode|model|mosek|nodesep|nojustify|normalize|nslimit|nslimit1|ordering|orientation|outputorder|overlap|overlap_scaling|pack|packmode|pad|page|pagedir|pencolor|penwidth|peripheries|pin|pos|quadtree|quantum|rank|rankdir|ranksep|ratio|rects|regular|remincross|repulsiveforce|resolution|root|rotate|rotation|samehead|sametail|samplepoints|scale|searchsize|sep|shape|shapefile|showboxes|sides|size|skew|smoothing|sortv|splines|start|style|stylesheet|tailurl|tail_lp|tailclip|tailhref|taillabel|tailport|tailtarget|tailtooltip|target|tooltip|truecolor|vertices|viewport|voro_margin|weight|width|xlabel|xlp|z".split("|"));
		this.$rules = {
			"start": [
				{
					token: "comment",
					regex: /\/\/.*$/
				},
				{
					token: "comment",
					regex: /#.*$/
				},
				{
					token: "comment",
					merge: true,
					regex: /\/\*/,
					next: "comment"
				},
				{
					token: "string",
					regex: "'(?=.)",
					next: "qstring"
				},
				{
					token: "string",
					regex: "\"(?=.)",
					next: "qqstring"
				},
				{
					token: "constant.numeric",
					regex: /[+\-]?\d+(?:(?:\.\d*)?(?:[eE][+\-]?\d+)?)?\b/
				},
				{
					token: "keyword.operator",
					regex: /\+|=|\->/
				},
				{
					token: "punctuation.operator",
					regex: /,|;/
				},
				{
					token: "paren.lparen",
					regex: /[\[{]/
				},
				{
					token: "paren.rparen",
					regex: /[\]}]/
				},
				{
					token: "comment",
					regex: /^#!.*$/
				},
				{
					token: function(value) {
						if (keywords.hasOwnProperty(value.toLowerCase())) return "keyword";
						else if (attributes.hasOwnProperty(value.toLowerCase())) return "variable";
						else return "text";
					},
					regex: "\\-?[a-zA-Z_][a-zA-Z0-9_\\-]*"
				}
			],
			"comment": [{
				token: "comment",
				regex: "\\*\\/",
				next: "start"
			}, { defaultToken: "comment" }],
			"qqstring": [
				{
					token: "string",
					regex: "[^\"\\\\]+",
					merge: true
				},
				{
					token: "string",
					regex: "\\\\$",
					next: "qqstring",
					merge: true
				},
				{
					token: "string",
					regex: "\"|$",
					next: "start",
					merge: true
				}
			],
			"qstring": [
				{
					token: "string",
					regex: "[^'\\\\]+",
					merge: true
				},
				{
					token: "string",
					regex: "\\\\$",
					next: "qstring",
					merge: true
				},
				{
					token: "string",
					regex: "'|$",
					next: "start",
					merge: true
				}
			]
		};
	};
	oop.inherits(DotHighlightRules, TextHighlightRules);
	exports.DotHighlightRules = DotHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/dot.js
var require_dot = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var MatchingBraceOutdent = require_matching_brace_outdent().MatchingBraceOutdent;
	var DotHighlightRules = require_dot_highlight_rules().DotHighlightRules;
	var DotFoldMode = require_cstyle().FoldMode;
	var Mode = function() {
		this.HighlightRules = DotHighlightRules;
		this.$outdent = new MatchingBraceOutdent();
		this.foldingRules = new DotFoldMode();
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = ["//", "#"];
		this.blockComment = {
			start: "/*",
			end: "*/"
		};
		this.getNextLineIndent = function(state, line, tab) {
			var indent = this.$getIndent(line);
			var tokenizedLine = this.getTokenizer().getLineTokens(line, state);
			var tokens = tokenizedLine.tokens;
			tokenizedLine.state;
			if (tokens.length && tokens[tokens.length - 1].type == "comment") return indent;
			if (state == "start") {
				if (line.match(/^.*(?:\bcase\b.*:|[\{\(\[])\s*$/)) indent += tab;
			}
			return indent;
		};
		this.checkOutdent = function(state, line, input) {
			return this.$outdent.checkOutdent(line, input);
		};
		this.autoOutdent = function(state, doc, row) {
			this.$outdent.autoOutdent(doc, row);
		};
		this.$id = "ace/mode/dot";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
//#endregion
export default require_dot();
