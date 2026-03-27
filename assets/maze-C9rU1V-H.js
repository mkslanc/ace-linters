import { t as __commonJSMin } from "./chunk-BLiWRsM1.js";
import "./useragent-Cm8O_vvb.js";
import "./dom-BmR1mTSl.js";
import "./range-D2fBS63W.js";
import { t as require_oop } from "./oop-D6rqnWBm.js";
import "./lang-B3gWVpaj.js";
import "./config-D-BhsSyn.js";
import "./event_emitter-DQJDHkGW.js";
import "./textmate-7M3qxGeS.js";
import "./tokenizer-BFeMc3TI.js";
import { a as require_text_highlight_rules, t as require_text } from "./text-x9TxHOMd.js";
import "./token_iterator-B0gzmLw-.js";
import "./fold_mode-DLWDk-fx.js";
import { t as require_cstyle } from "./cstyle-DX2ORGlO.js";
//#region node_modules/ace-code/src/mode/maze_highlight_rules.js
var require_maze_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var MazeHighlightRules = function() {
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
	MazeHighlightRules.metaData = {
		fileTypes: ["mz"],
		name: "Maze",
		scopeName: "source.maze"
	};
	oop.inherits(MazeHighlightRules, TextHighlightRules);
	exports.MazeHighlightRules = MazeHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/maze.js
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
//#endregion
export default require_maze();
