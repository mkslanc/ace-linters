import { t as __commonJSMin } from "./chunk-iA-Slpst.js";
import { t as require_range } from "./range-BUVqNbwc.js";
import { t as require_oop } from "./oop-DcdK5Mrs.js";
import { i as require_behaviour } from "./text-B9A1mx6l.js";
import { t as require_token_iterator } from "./token_iterator-CbfYmntj.js";
import { t as require_fold_mode } from "./fold_mode-D1xG2KFM.js";
var require_xml$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var Behaviour = require_behaviour().Behaviour;
	var TokenIterator = require_token_iterator().TokenIterator;
	function is$1(token, type) {
		return token && token.type.lastIndexOf(type + ".xml") > -1;
	}
	var XmlBehaviour = function() {
		this.add("string_dquotes", "insertion", function(state, action, editor, session, text) {
			if (text == "\"" || text == "'") {
				var quote = text;
				var selected = session.doc.getTextRange(editor.getSelectionRange());
				if (selected !== "" && selected !== "'" && selected != "\"" && editor.getWrapBehavioursEnabled()) return {
					text: quote + selected + quote,
					selection: false
				};
				var cursor = editor.getCursorPosition();
				var rightChar = session.doc.getLine(cursor.row).substring(cursor.column, cursor.column + 1);
				var iterator = new TokenIterator(session, cursor.row, cursor.column);
				var token = iterator.getCurrentToken();
				if (rightChar == quote && (is$1(token, "attribute-value") || is$1(token, "string"))) return {
					text: "",
					selection: [1, 1]
				};
				if (!token) token = iterator.stepBackward();
				if (!token) return;
				while (is$1(token, "tag-whitespace") || is$1(token, "whitespace")) token = iterator.stepBackward();
				var rightSpace = !rightChar || rightChar.match(/\s/);
				if (is$1(token, "attribute-equals") && (rightSpace || rightChar == ">") || is$1(token, "decl-attribute-equals") && (rightSpace || rightChar == "?")) return {
					text: quote + quote,
					selection: [1, 1]
				};
			}
		});
		this.add("string_dquotes", "deletion", function(state, action, editor, session, range) {
			var selected = session.doc.getTextRange(range);
			if (!range.isMultiLine() && (selected == "\"" || selected == "'")) {
				if (session.doc.getLine(range.start.row).substring(range.start.column + 1, range.start.column + 2) == selected) {
					range.end.column++;
					return range;
				}
			}
		});
		this.add("autoclosing", "insertion", function(state, action, editor, session, text) {
			if (text == ">") {
				var position = editor.getSelectionRange().start;
				var iterator = new TokenIterator(session, position.row, position.column);
				var token = iterator.getCurrentToken() || iterator.stepBackward();
				if (!token || !(is$1(token, "tag-name") || is$1(token, "tag-whitespace") || is$1(token, "attribute-name") || is$1(token, "attribute-equals") || is$1(token, "attribute-value"))) return;
				if (is$1(token, "reference.attribute-value")) return;
				if (is$1(token, "attribute-value")) {
					var tokenEndColumn = iterator.getCurrentTokenColumn() + token.value.length;
					if (position.column < tokenEndColumn) return;
					if (position.column == tokenEndColumn) {
						var nextToken = iterator.stepForward();
						if (nextToken && is$1(nextToken, "attribute-value")) return;
						iterator.stepBackward();
					}
				}
				if (/^\s*>/.test(session.getLine(position.row).slice(position.column))) return;
				while (!is$1(token, "tag-name")) {
					token = iterator.stepBackward();
					if (token.value == "<") {
						token = iterator.stepForward();
						break;
					}
				}
				var tokenRow = iterator.getCurrentTokenRow();
				var tokenColumn = iterator.getCurrentTokenColumn();
				if (is$1(iterator.stepBackward(), "end-tag-open")) return;
				var element = token.value;
				if (tokenRow == position.row) element = element.substring(0, position.column - tokenColumn);
				if (this.voidElements && this.voidElements.hasOwnProperty(element.toLowerCase())) return;
				return {
					text: "></" + element + ">",
					selection: [1, 1]
				};
			}
		});
		this.add("autoindent", "insertion", function(state, action, editor, session, text) {
			if (text == "\n") {
				var cursor = editor.getCursorPosition();
				var line = session.getLine(cursor.row);
				var iterator = new TokenIterator(session, cursor.row, cursor.column);
				var token = iterator.getCurrentToken();
				if (is$1(token, "") && token.type.indexOf("tag-close") !== -1) {
					if (token.value == "/>") return;
					while (token && token.type.indexOf("tag-name") === -1) token = iterator.stepBackward();
					if (!token) return;
					var tag = token.value;
					var row = iterator.getCurrentTokenRow();
					token = iterator.stepBackward();
					if (!token || token.type.indexOf("end-tag") !== -1) return;
					if (this.voidElements && !this.voidElements[tag] || !this.voidElements) {
						var nextToken = session.getTokenAt(cursor.row, cursor.column + 1);
						var line = session.getLine(row);
						var nextIndent = this.$getIndent(line);
						var indent = nextIndent + session.getTabString();
						if (nextToken && nextToken.value === "</") return {
							text: "\n" + indent + "\n" + nextIndent,
							selection: [
								1,
								indent.length,
								1,
								indent.length
							]
						};
						else return { text: "\n" + indent };
					}
				}
			}
		});
	};
	oop$1.inherits(XmlBehaviour, Behaviour);
	exports.XmlBehaviour = XmlBehaviour;
}));
var require_xml = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var Range = require_range().Range;
	var BaseFoldMode = require_fold_mode().FoldMode;
	var FoldMode = exports.FoldMode = function(voidElements, optionalEndTags) {
		BaseFoldMode.call(this);
		this.voidElements = voidElements || {};
		this.optionalEndTags = oop.mixin({}, this.voidElements);
		if (optionalEndTags) oop.mixin(this.optionalEndTags, optionalEndTags);
	};
	oop.inherits(FoldMode, BaseFoldMode);
	var Tag = function() {
		this.tagName = "";
		this.closing = false;
		this.selfClosing = false;
		this.start = {
			row: 0,
			column: 0
		};
		this.end = {
			row: 0,
			column: 0
		};
	};
	function is(token, type) {
		return token && token.type && token.type.lastIndexOf(type + ".xml") > -1;
	}
	(function() {
		this.getFoldWidget = function(session, foldStyle, row) {
			var tag = this._getFirstTagInLine(session, row);
			if (!tag) return this.getCommentFoldWidget(session, row);
			if (tag.closing || !tag.tagName && tag.selfClosing) return foldStyle === "markbeginend" ? "end" : "";
			if (!tag.tagName || tag.selfClosing || this.voidElements.hasOwnProperty(tag.tagName.toLowerCase())) return "";
			if (this._findEndTagInLine(session, row, tag.tagName, tag.end.column)) return "";
			return "start";
		};
		this.getCommentFoldWidget = function(session, row) {
			if (/comment/.test(session.getState(row)) && /<!-/.test(session.getLine(row))) return "start";
			return "";
		};
		this._getFirstTagInLine = function(session, row) {
			var tokens = session.getTokens(row);
			var tag = new Tag();
			for (var i = 0; i < tokens.length; i++) {
				var token = tokens[i];
				if (is(token, "tag-open")) {
					tag.end.column = tag.start.column + token.value.length;
					tag.closing = is(token, "end-tag-open");
					token = tokens[++i];
					if (!token) return null;
					tag.tagName = token.value;
					if (token.value === "") {
						token = tokens[++i];
						if (!token) return null;
						tag.tagName = token.value;
					}
					tag.end.column += token.value.length;
					for (i++; i < tokens.length; i++) {
						token = tokens[i];
						tag.end.column += token.value.length;
						if (is(token, "tag-close")) {
							tag.selfClosing = token.value == "/>";
							break;
						}
					}
					return tag;
				} else if (is(token, "tag-close")) {
					tag.selfClosing = token.value == "/>";
					return tag;
				}
				tag.start.column += token.value.length;
			}
			return null;
		};
		this._findEndTagInLine = function(session, row, tagName, startColumn) {
			var tokens = session.getTokens(row);
			var column = 0;
			for (var i = 0; i < tokens.length; i++) {
				var token = tokens[i];
				column += token.value.length;
				if (column < startColumn - 1) continue;
				if (is(token, "end-tag-open")) {
					token = tokens[i + 1];
					if (is(token, "tag-name") && token.value === "") token = tokens[i + 2];
					if (token && token.value == tagName) return true;
				}
			}
			return false;
		};
		this.getFoldWidgetRange = function(session, foldStyle, row) {
			if (!this._getFirstTagInLine(session, row)) return this.getCommentFoldWidget(session, row) && session.getCommentFoldRange(row, session.getLine(row).length);
			var tags = session.getMatchingTags({
				row,
				column: 0
			});
			if (tags) return new Range(tags.openTag.end.row, tags.openTag.end.column, tags.closeTag.start.row, tags.closeTag.start.column);
		};
	}).call(FoldMode.prototype);
}));
export { require_xml$1 as n, require_xml as t };
