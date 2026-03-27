import { t as __commonJSMin } from "./chunk-BLiWRsM1.js";
import { t as require_oop } from "./oop-D6rqnWBm.js";
import { i as require_behaviour, r as require_cstyle } from "./text-x9TxHOMd.js";
import { t as require_token_iterator } from "./token_iterator-B0gzmLw-.js";
//#region node_modules/ace-code/src/mode/behaviour/css.js
var require_css = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	require_behaviour().Behaviour;
	var CstyleBehaviour = require_cstyle().CstyleBehaviour;
	var TokenIterator = require_token_iterator().TokenIterator;
	/**@type {(new() => Partial<import("../../../ace-internal").Ace.Behaviour>)}*/
	var CssBehaviour = function() {
		this.inherit(CstyleBehaviour);
		this.add("colon", "insertion", function(state, action, editor, session, text) {
			if (text === ":" && editor.selection.isEmpty()) {
				var cursor = editor.getCursorPosition();
				var iterator = new TokenIterator(session, cursor.row, cursor.column);
				var token = iterator.getCurrentToken();
				if (token && token.value.match(/\s+/)) token = iterator.stepBackward();
				if (token && token.type === "support.type") {
					var line = session.doc.getLine(cursor.row);
					if (line.substring(cursor.column, cursor.column + 1) === ":") return {
						text: "",
						selection: [1, 1]
					};
					if (/^(\s+[^;]|\s*$)/.test(line.substring(cursor.column))) return {
						text: ":;",
						selection: [1, 1]
					};
				}
			}
		});
		this.add("colon", "deletion", function(state, action, editor, session, range) {
			var selected = session.doc.getTextRange(range);
			if (!range.isMultiLine() && selected === ":") {
				var cursor = editor.getCursorPosition();
				var iterator = new TokenIterator(session, cursor.row, cursor.column);
				var token = iterator.getCurrentToken();
				if (token && token.value.match(/\s+/)) token = iterator.stepBackward();
				if (token && token.type === "support.type") {
					if (session.doc.getLine(range.start.row).substring(range.end.column, range.end.column + 1) === ";") {
						range.end.column++;
						return range;
					}
				}
			}
		});
		this.add("semicolon", "insertion", function(state, action, editor, session, text) {
			if (text === ";" && editor.selection.isEmpty()) {
				var cursor = editor.getCursorPosition();
				if (session.doc.getLine(cursor.row).substring(cursor.column, cursor.column + 1) === ";") return {
					text: "",
					selection: [1, 1]
				};
			}
		});
		this.add("!important", "insertion", function(state, action, editor, session, text) {
			if (text === "!" && editor.selection.isEmpty()) {
				var cursor = editor.getCursorPosition();
				var line = session.doc.getLine(cursor.row);
				if (/^\s*(;|}|$)/.test(line.substring(cursor.column))) return {
					text: "!important",
					selection: [10, 10]
				};
			}
		});
	};
	oop.inherits(CssBehaviour, CstyleBehaviour);
	exports.CssBehaviour = CssBehaviour;
}));
//#endregion
export { require_css as t };
