import { t as __commonJSMin } from "./chunk-Cu_MO8PN.js";
import "./useragent-BMYEMUd9.js";
import "./dom-DRNmwCmL.js";
import "./range-BakcZ9jR.js";
import { t as require_oop } from "./oop-DrExWoUW.js";
import "./lang-Chfjzp5y.js";
import "./config-7GJDZd_b.js";
import "./event_emitter-r-lZpQyf.js";
import "./textmate-CN2VrF7f.js";
import "./tokenizer-B5s1nUwH.js";
import { a as require_text_highlight_rules, t as require_text } from "./text-D8sm5DzM.js";
import "./token_iterator-BNxpI84f.js";
import "./fold_mode-D_StAfa6.js";
import { t as require_cstyle } from "./cstyle-DxkoJQhq.js";
//#region node_modules/ace-code/src/mode/forth_highlight_rules.js
/****************************************************************************************
* IT MIGHT NOT BE PERFECT ...But it's a good start from an existing *.tmlanguage file. *
* fileTypes                                                                            *
****************************************************************************************/
var require_forth_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var ForthHighlightRules = function() {
		this.$rules = {
			start: [{ include: "#forth" }],
			"#comment": [
				{
					token: "comment.line.double-dash.forth",
					regex: "(?:^|\\s)--\\s.*$",
					comment: "line comments for iForth"
				},
				{
					token: "comment.line.backslash.forth",
					regex: "(?:^|\\s)\\\\[\\s\\S]*$",
					comment: "ANSI line comment"
				},
				{
					token: "comment.line.backslash-g.forth",
					regex: "(?:^|\\s)\\\\[Gg] .*$",
					comment: "gForth line comment"
				},
				{
					token: "comment.block.forth",
					regex: "(?:^|\\s)\\(\\*(?=\\s|$)",
					push: [{
						token: "comment.block.forth",
						regex: "(?:^|\\s)\\*\\)(?=\\s|$)",
						next: "pop"
					}, { defaultToken: "comment.block.forth" }],
					comment: "multiline comments for iForth"
				},
				{
					token: "comment.block.documentation.forth",
					regex: "\\bDOC\\b",
					caseInsensitive: true,
					push: [{
						token: "comment.block.documentation.forth",
						regex: "\\bENDDOC\\b",
						caseInsensitive: true,
						next: "pop"
					}, { defaultToken: "comment.block.documentation.forth" }],
					comment: "documentation comments for iForth"
				},
				{
					token: "comment.line.parentheses.forth",
					regex: "(?:^|\\s)\\.?\\( [^)]*\\)",
					comment: "ANSI line comment"
				}
			],
			"#constant": [
				{
					token: "constant.language.forth",
					regex: "(?:^|\\s)(?:TRUE|FALSE|BL|PI|CELL|C/L|R/O|W/O|R/W)(?=\\s|$)",
					caseInsensitive: true
				},
				{
					token: "constant.numeric.forth",
					regex: "(?:^|\\s)[$#%]?[-+]?[0-9]+(?:\\.[0-9]*e-?[0-9]+|\\.?[0-9a-fA-F]*)(?=\\s|$)"
				},
				{
					token: "constant.character.forth",
					regex: "(?:^|\\s)(?:[&^]\\S|(?:\"|')\\S(?:\"|'))(?=\\s|$)"
				}
			],
			"#forth": [
				{ include: "#constant" },
				{ include: "#comment" },
				{ include: "#string" },
				{ include: "#word" },
				{ include: "#variable" },
				{ include: "#storage" },
				{ include: "#word-def" }
			],
			"#storage": [{
				token: "storage.type.forth",
				regex: "(?:^|\\s)(?:2CONSTANT|2VARIABLE|ALIAS|CONSTANT|CREATE-INTERPRET/COMPILE[:]?|CREATE|DEFER|FCONSTANT|FIELD|FVARIABLE|USER|VALUE|VARIABLE|VOCABULARY)(?=\\s|$)",
				caseInsensitive: true
			}],
			"#string": [{
				token: "string.quoted.double.forth",
				regex: "(ABORT\" |BREAK\" |\\.\" |C\" |0\"|S\\\\?\" )([^\"]+\")",
				caseInsensitive: true
			}, {
				token: "string.unquoted.forth",
				regex: "(?:INCLUDE|NEEDS|REQUIRE|USE)[ ]\\S+(?=\\s|$)",
				caseInsensitive: true
			}],
			"#variable": [{
				token: "variable.language.forth",
				regex: "\\b(?:I|J)\\b",
				caseInsensitive: true
			}],
			"#word": [
				{
					token: "keyword.control.immediate.forth",
					regex: "(?:^|\\s)\\[(?:\\?DO|\\+LOOP|AGAIN|BEGIN|DEFINED|DO|ELSE|ENDIF|FOR|IF|IFDEF|IFUNDEF|LOOP|NEXT|REPEAT|THEN|UNTIL|WHILE)\\](?=\\s|$)",
					caseInsensitive: true
				},
				{
					token: "keyword.other.immediate.forth",
					regex: "(?:^|\\s)(?:COMPILE-ONLY|IMMEDIATE|IS|RESTRICT|TO|WHAT'S|])(?=\\s|$)",
					caseInsensitive: true
				},
				{
					token: "keyword.control.compile-only.forth",
					regex: "(?:^|\\s)(?:-DO|\\-LOOP|\\?DO|\\?LEAVE|\\+DO|\\+LOOP|ABORT\\\"|AGAIN|AHEAD|BEGIN|CASE|DO|ELSE|ENDCASE|ENDIF|ENDOF|ENDTRY\\-IFERROR|ENDTRY|FOR|IF|IFERROR|LEAVE|LOOP|NEXT|RECOVER|REPEAT|RESTORE|THEN|TRY|U\\-DO|U\\+DO|UNTIL|WHILE)(?=\\s|$)",
					caseInsensitive: true
				},
				{
					token: "keyword.other.compile-only.forth",
					regex: "(?:^|\\s)(?:\\?DUP-0=-IF|\\?DUP-IF|\\)|\\[|\\['\\]|\\[CHAR\\]|\\[COMPILE\\]|\\[IS\\]|\\[TO\\]|<COMPILATION|<INTERPRETATION|ASSERT\\(|ASSERT0\\(|ASSERT1\\(|ASSERT2\\(|ASSERT3\\(|COMPILATION>|DEFERS|DOES>|INTERPRETATION>|OF|POSTPONE)(?=\\s|$)",
					caseInsensitive: true
				},
				{
					token: "keyword.other.non-immediate.forth",
					regex: "(?:^|\\s)(?:'|<IS>|<TO>|CHAR|END-STRUCT|INCLUDE[D]?|LOAD|NEEDS|REQUIRE[D]?|REVISION|SEE|STRUCT|THRU|USE)(?=\\s|$)",
					caseInsensitive: true
				},
				{
					token: "keyword.other.warning.forth",
					regex: "(?:^|\\s)(?:~~|BREAK:|BREAK\"|DBG)(?=\\s|$)",
					caseInsensitive: true
				}
			],
			"#word-def": [{
				token: [
					"keyword.other.compile-only.forth",
					"keyword.other.compile-only.forth",
					"meta.block.forth",
					"entity.name.function.forth"
				],
				regex: "(:NONAME)|(^:|\\s:)(\\s)(\\S+)(?=\\s|$)",
				caseInsensitive: true,
				push: [
					{
						token: "keyword.other.compile-only.forth",
						regex: ";(?:CODE)?",
						caseInsensitive: true,
						next: "pop"
					},
					{ include: "#constant" },
					{ include: "#comment" },
					{ include: "#string" },
					{ include: "#word" },
					{ include: "#variable" },
					{ include: "#storage" },
					{ defaultToken: "meta.block.forth" }
				]
			}]
		};
		this.normalizeRules();
	};
	ForthHighlightRules.metaData = {
		fileTypes: [
			"frt",
			"fs",
			"ldr",
			"fth",
			"4th"
		],
		foldingStartMarker: "/\\*\\*|\\{\\s*$",
		foldingStopMarker: "\\*\\*/|^\\s*\\}",
		keyEquivalent: "^~F",
		name: "Forth",
		scopeName: "source.forth"
	};
	oop.inherits(ForthHighlightRules, TextHighlightRules);
	exports.ForthHighlightRules = ForthHighlightRules;
}));
//#endregion
//#region node_modules/ace-code/src/mode/forth.js
var require_forth = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var ForthHighlightRules = require_forth_highlight_rules().ForthHighlightRules;
	var FoldMode = require_cstyle().FoldMode;
	var Mode = function() {
		this.HighlightRules = ForthHighlightRules;
		this.foldingRules = new FoldMode();
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = "--";
		this.blockComment = null;
		this.$id = "ace/mode/forth";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
//#endregion
export default require_forth();
