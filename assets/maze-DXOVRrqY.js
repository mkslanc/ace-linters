import { t as __commonJSMin } from "./chunk-iA-Slpst.js";
import "./useragent-BODERP_7.js";
import "./dom-BBjJ92-n.js";
import "./range-BUVqNbwc.js";
import { t as require_oop } from "./oop-DcdK5Mrs.js";
import "./lang-DcNOSqFo.js";
import "./config-DPm1ug3B.js";
import "./event_emitter-BGfSYA24.js";
import "./textmate-zFNmb5zU.js";
import "./tokenizer-C2b-GJMk.js";
import { a as require_text_highlight_rules, t as require_text } from "./text-B9A1mx6l.js";
import "./token_iterator-CbfYmntj.js";
import "./fold_mode-D1xG2KFM.js";
import { t as require_cstyle } from "./cstyle-C6ktp4d4.js";
var require_maze_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var MazeHighlightRules$1 = function() {
		this.$rules = { start: [
			{
				token: "keyword.control",
				regex: /##|``/,
				comment: "Wall"
			},
			{
				token: "entity.name.tag",
				regex: /\.\./,
				comment: "Path"
			},
			{
				token: "keyword.control",
				regex: /<>/,
				comment: "Splitter"
			},
			{
				token: "entity.name.tag",
				regex: /\*[\*A-Za-z0-9]/,
				comment: "Signal"
			},
			{
				token: "constant.numeric",
				regex: /[0-9]{2}/,
				comment: "Pause"
			},
			{
				token: "keyword.control",
				regex: /\^\^/,
				comment: "Start"
			},
			{
				token: "keyword.control",
				regex: /\(\)/,
				comment: "Hole"
			},
			{
				token: "support.function",
				regex: />>/,
				comment: "Out"
			},
			{
				token: "support.function",
				regex: />\//,
				comment: "Ln Out"
			},
			{
				token: "support.function",
				regex: /<</,
				comment: "In"
			},
			{
				token: "keyword.control",
				regex: /--/,
				comment: "One use"
			},
			{
				token: "constant.language",
				regex: /%[LRUDNlrudn]/,
				comment: "Direction"
			},
			{
				token: [
					"entity.name.function",
					"keyword.other",
					"keyword.operator",
					"keyword.other",
					"keyword.operator",
					"constant.numeric",
					"keyword.operator",
					"keyword.other",
					"keyword.operator",
					"constant.numeric",
					"string.quoted.double",
					"string.quoted.single"
				],
				regex: /([A-Za-z][A-Za-z0-9])( *-> *)(?:([-+*\/]=)( *)((?:-)?)([0-9]+)|(=)( *)(?:((?:-)?)([0-9]+)|("[^"]*")|('[^']*')))/,
				comment: "Assignment function"
			},
			{
				token: [
					"entity.name.function",
					"keyword.other",
					"keyword.control",
					"keyword.other",
					"keyword.operator",
					"keyword.other",
					"keyword.operator",
					"constant.numeric",
					"entity.name.tag",
					"keyword.other",
					"keyword.control",
					"keyword.other",
					"constant.language",
					"keyword.other",
					"keyword.control",
					"keyword.other",
					"constant.language"
				],
				regex: /([A-Za-z][A-Za-z0-9])( *-> *)(IF|if)( *)(?:([<>]=?|==)( *)((?:-)?)([0-9]+)|(\*[\*A-Za-z0-9]))( *)(THEN|then)( *)(%[LRUDNlrudn])(?:( *)(ELSE|else)( *)(%[LRUDNlrudn]))?/,
				comment: "Equality Function"
			},
			{
				token: "entity.name.function",
				regex: /[A-Za-z][A-Za-z0-9]/,
				comment: "Function cell"
			},
			{
				token: "comment.line.double-slash",
				regex: / *\/\/.*/,
				comment: "Comment"
			}
		] };
		this.normalizeRules();
	};
	MazeHighlightRules$1.metaData = {
		fileTypes: ["mz"],
		name: "Maze",
		scopeName: "source.maze"
	};
	oop$1.inherits(MazeHighlightRules$1, TextHighlightRules);
	exports.MazeHighlightRules = MazeHighlightRules$1;
}));
var require_maze = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var MazeHighlightRules = require_maze_highlight_rules().MazeHighlightRules;
	var FoldMode = require_cstyle().FoldMode;
	var Mode = function() {
		this.HighlightRules = MazeHighlightRules;
		this.foldingRules = new FoldMode();
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = "//";
		this.$id = "ace/mode/maze";
		this.snippetFileId = "ace/snippets/maze";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_maze();
