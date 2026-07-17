import { t as __commonJSMin } from "./modulepreload-polyfill-DxDZhch-.js";
import { t as require_dom } from "./dom-BjWu4bY5.js";
import { t as require_range } from "./range-DJd8bsIh.js";
import { t as require_oop } from "./oop-3KT-lR14.js";
import { t as require_keys } from "./keys-DUcE2QaQ.js";
import { t as require_config } from "./config-i4E5_Mdd.js";
import { n as require_command_manager, r as require_search, t as require_editor } from "./editor-Wm2F5SNl.js";
import { i as require_search_highlight, t as require_edit_session } from "./edit_session-D9hX7Sjk.js";
import { t as require_hash_handler } from "./hash_handler-B3qVfCKy.js";
//#region node_modules/ace-code/src/occur.js
var require_occur = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* @typedef {import("./editor").Editor} Editor
	* @typedef {import("../ace-internal").Ace.Point} Point
	* @typedef {import("../ace-internal").Ace.SearchOptions} SearchOptions
	*/
	var oop = require_oop();
	var Search = require_search().Search;
	var EditSession = require_edit_session().EditSession;
	var SearchHighlight = require_search_highlight().SearchHighlight;
	/**
	* Finds all lines matching a search term in the current [[Document
	* `Document`]] and displays them instead of the original `Document`. Keeps
	* track of the mapping between the occur doc and the original doc.
	**/
	var Occur = class extends Search {
		/**
		* Enables occur mode. expects that `options.needle` is a search term.
		* This search term is used to filter out all the lines that include it
		* and these are then used as the content of a new [[Document
		* `Document`]]. The current cursor position of editor will be translated
		* so that the cursor is on the matching row/column as it was before.
		* @param {Editor} editor
		* @param {Object} options options.needle should be a String
		* @return {Boolean} Whether occur activation was successful
		*
		**/
		enter(editor, options) {
			if (!options.needle) return false;
			var pos = editor.getCursorPosition();
			this.displayOccurContent(editor, options);
			var translatedPos = this.originalToOccurPosition(editor.session, pos);
			editor.moveCursorToPosition(translatedPos);
			return true;
		}
		/**
		* Disables occur mode. Resets the [[Sessions `EditSession`]] [[Document
		* `Document`]] back to the original doc. If options.translatePosition is
		* truthy also maps the [[Editors `Editor`]] cursor position accordingly.
		* @param {Editor} editor
		* @param {Object} options options.translatePosition
		* @return {Boolean} Whether occur deactivation was successful
		*
		**/
		exit(editor, options) {
			var pos = options.translatePosition && editor.getCursorPosition();
			var translatedPos = pos && this.occurToOriginalPosition(editor.session, pos);
			this.displayOriginalContent(editor);
			if (translatedPos) editor.moveCursorToPosition(translatedPos);
			return true;
		}
		/**
		* @param {EditSession} sess
		* @param {RegExp} regexp
		*/
		highlight(sess, regexp) {
			(sess.$occurHighlight = sess.$occurHighlight || sess.addDynamicMarker(new SearchHighlight(null, "ace_occur-highlight", "text"))).setRegexp(regexp);
			sess._emit("changeBackMarker");
		}
		/**
		* @param {Editor} editor
		* @param {Partial<SearchOptions>} options
		*/
		displayOccurContent(editor, options) {
			this.$originalSession = editor.session;
			var found = this.matchingLines(editor.session, options);
			/**@type {EditSession}*/
			var occurSession = new EditSession(found.map(function(foundLine) {
				return foundLine.content;
			}).join("\n"));
			occurSession.$occur = this;
			occurSession.$occurMatchingLines = found;
			editor.setSession(occurSession);
			this.$useEmacsStyleLineStart = this.$originalSession.$useEmacsStyleLineStart;
			occurSession.$useEmacsStyleLineStart = this.$useEmacsStyleLineStart;
			this.highlight(occurSession, options.re);
			occurSession._emit("changeBackMarker");
		}
		/**
		* @param {Editor} editor
		*/
		displayOriginalContent(editor) {
			editor.setSession(this.$originalSession);
			this.$originalSession.$useEmacsStyleLineStart = this.$useEmacsStyleLineStart;
		}
		/**
		* Translates the position from the original document to the occur lines in
		* the document or the beginning if the doc {row: 0, column: 0} if not
		* found.
		* @param {EditSession} session The occur session
		* @param {Point} pos The position in the original document
		* @return {Point} position in occur doc
		**/
		originalToOccurPosition(session, pos) {
			var lines = session.$occurMatchingLines;
			var nullPos = {
				row: 0,
				column: 0
			};
			if (!lines) return nullPos;
			for (var i = 0; i < lines.length; i++) if (lines[i].row === pos.row) return {
				row: i,
				column: pos.column
			};
			return nullPos;
		}
		/**
		* Translates the position from the occur document to the original document
		* or `pos` if not found.
		* @param {EditSession} session The occur session
		* @param {Point} pos The position in the occur session document
		* @return {Point} position
		**/
		occurToOriginalPosition(session, pos) {
			var lines = session.$occurMatchingLines;
			if (!lines || !lines[pos.row]) return pos;
			return {
				row: lines[pos.row].row,
				column: pos.column
			};
		}
		/**
		* @param {EditSession} session
		* @param {Partial<SearchOptions>} options
		*/
		matchingLines(session, options) {
			options = oop.mixin({}, options);
			if (!session || !options.needle) return [];
			var search = new Search();
			search.set(options);
			return search.findAll(session).reduce(function(lines, range) {
				var row = range.start.row;
				var last = lines[lines.length - 1];
				return last && last.row === row ? lines : lines.concat({
					row,
					content: session.getLine(row)
				});
			}, []);
		}
	};
	require_dom().importCssString(".ace_occur-highlight {\n    border-radius: 4px;\n    background-color: rgba(87, 255, 8, 0.25);\n    position: absolute;\n    z-index: 4;\n    box-sizing: border-box;\n    box-shadow: 0 0 4px rgb(91, 255, 50);\n}\n.ace_dark .ace_occur-highlight {\n    background-color: rgb(80, 140, 85);\n    box-shadow: 0 0 4px rgb(60, 120, 70);\n}\n", "incremental-occur-highlighting", false);
	exports.Occur = Occur;
}));
//#endregion
//#region node_modules/ace-code/src/commands/occur_commands.js
var require_occur_commands = /* @__PURE__ */ __commonJSMin(((exports) => {
	require_config();
	var Occur = require_occur().Occur;
	var occurStartCommand = {
		name: "occur",
		exec: function(editor, options) {
			var alreadyInOccur = !!editor.session.$occur;
			if (new Occur().enter(editor, options) && !alreadyInOccur) OccurKeyboardHandler.installIn(editor);
		},
		readOnly: true
	};
	var occurCommands = [{
		name: "occurexit",
		bindKey: "esc|Ctrl-G",
		exec: function(editor) {
			var occur = editor.session.$occur;
			if (!occur) return;
			occur.exit(editor, {});
			if (!editor.session.$occur) OccurKeyboardHandler.uninstallFrom(editor);
		},
		readOnly: true
	}, {
		name: "occuraccept",
		bindKey: "enter",
		exec: function(editor) {
			var occur = editor.session.$occur;
			if (!occur) return;
			occur.exit(editor, { translatePosition: true });
			if (!editor.session.$occur) OccurKeyboardHandler.uninstallFrom(editor);
		},
		readOnly: true
	}];
	var HashHandler = require_hash_handler().HashHandler;
	var oop = require_oop();
	function OccurKeyboardHandler() {}
	oop.inherits(OccurKeyboardHandler, HashHandler);
	(function() {
		this.isOccurHandler = true;
		this.attach = function(editor) {
			HashHandler.call(this, occurCommands, editor.commands.platform);
			this.$editor = editor;
		};
		var handleKeyboard$super = this.handleKeyboard;
		this.handleKeyboard = function(data, hashId, key, keyCode) {
			var cmd = handleKeyboard$super.call(this, data, hashId, key, keyCode);
			return cmd && cmd.command ? cmd : void 0;
		};
	}).call(OccurKeyboardHandler.prototype);
	OccurKeyboardHandler.installIn = function(editor) {
		var handler = new this();
		editor.keyBinding.addKeyboardHandler(handler);
		editor.commands.addCommands(occurCommands);
	};
	OccurKeyboardHandler.uninstallFrom = function(editor) {
		editor.commands.removeCommands(occurCommands);
		var handler = editor.getKeyboardHandler();
		if (handler.isOccurHandler) editor.keyBinding.removeKeyboardHandler(handler);
	};
	exports.occurStartCommand = occurStartCommand;
}));
//#endregion
//#region node_modules/ace-code/src/commands/incremental_search_commands.js
var require_incremental_search_commands = /* @__PURE__ */ __commonJSMin(((exports) => {
	var config = require_config();
	var oop = require_oop();
	var HashHandler = require_hash_handler().HashHandler;
	var occurStartCommand = require_occur_commands().occurStartCommand;
	exports.iSearchStartCommands = [
		{
			name: "iSearch",
			bindKey: {
				win: "Ctrl-F",
				mac: "Command-F"
			},
			exec: function(editor, options) {
				config.loadModule(["core", "ace/incremental_search"], function(e) {
					var iSearch = e.iSearch = e.iSearch || new e.IncrementalSearch();
					iSearch.activate(editor, options.backwards);
					if (options.jumpToFirstMatch) iSearch.next(options);
				});
			},
			readOnly: true
		},
		{
			name: "iSearchBackwards",
			exec: function(editor, jumpToNext) {
				editor.execCommand("iSearch", { backwards: true });
			},
			readOnly: true
		},
		{
			name: "iSearchAndGo",
			bindKey: {
				win: "Ctrl-K",
				mac: "Command-G"
			},
			exec: function(editor, jumpToNext) {
				editor.execCommand("iSearch", {
					jumpToFirstMatch: true,
					useCurrentOrPrevSearch: true
				});
			},
			readOnly: true
		},
		{
			name: "iSearchBackwardsAndGo",
			bindKey: {
				win: "Ctrl-Shift-K",
				mac: "Command-Shift-G"
			},
			exec: function(editor) {
				editor.execCommand("iSearch", {
					jumpToFirstMatch: true,
					backwards: true,
					useCurrentOrPrevSearch: true
				});
			},
			readOnly: true
		}
	];
	exports.iSearchCommands = [
		{
			name: "restartSearch",
			bindKey: {
				win: "Ctrl-F",
				mac: "Command-F"
			},
			exec: function(iSearch) {
				iSearch.cancelSearch(true);
			}
		},
		{
			name: "searchForward",
			bindKey: {
				win: "Ctrl-S|Ctrl-K",
				mac: "Ctrl-S|Command-G"
			},
			exec: function(iSearch, options) {
				options.useCurrentOrPrevSearch = true;
				iSearch.next(options);
			}
		},
		{
			name: "searchBackward",
			bindKey: {
				win: "Ctrl-R|Ctrl-Shift-K",
				mac: "Ctrl-R|Command-Shift-G"
			},
			exec: function(iSearch, options) {
				options.useCurrentOrPrevSearch = true;
				options.backwards = true;
				iSearch.next(options);
			}
		},
		{
			name: "extendSearchTerm",
			exec: function(iSearch, string) {
				iSearch.addString(string);
			}
		},
		{
			name: "extendSearchTermSpace",
			bindKey: "space",
			exec: function(iSearch) {
				iSearch.addString(" ");
			}
		},
		{
			name: "shrinkSearchTerm",
			bindKey: "backspace",
			exec: function(iSearch) {
				iSearch.removeChar();
			}
		},
		{
			name: "confirmSearch",
			bindKey: "return",
			exec: function(iSearch) {
				iSearch.deactivate();
			}
		},
		{
			name: "cancelSearch",
			bindKey: "esc|Ctrl-G",
			exec: function(iSearch) {
				iSearch.deactivate(true);
			}
		},
		{
			name: "occurisearch",
			bindKey: "Ctrl-O",
			exec: function(iSearch) {
				var options = oop.mixin({}, iSearch.$options);
				iSearch.deactivate();
				occurStartCommand.exec(iSearch.$editor, options);
			}
		},
		{
			name: "yankNextWord",
			bindKey: "Ctrl-w",
			exec: function(iSearch) {
				var ed = iSearch.$editor, range = ed.selection.getRangeOfMovements(function(sel) {
					sel.moveCursorWordRight();
				}), string = ed.session.getTextRange(range);
				iSearch.addString(string);
			}
		},
		{
			name: "yankNextChar",
			bindKey: "Ctrl-Alt-y",
			exec: function(iSearch) {
				var ed = iSearch.$editor, range = ed.selection.getRangeOfMovements(function(sel) {
					sel.moveCursorRight();
				}), string = ed.session.getTextRange(range);
				iSearch.addString(string);
			}
		},
		{
			name: "recenterTopBottom",
			bindKey: "Ctrl-l",
			exec: function(iSearch) {
				iSearch.$editor.execCommand("recenterTopBottom");
			}
		},
		{
			name: "selectAllMatches",
			bindKey: "Ctrl-space",
			exec: function(iSearch) {
				var ed = iSearch.$editor, hl = ed.session.$isearchHighlight, ranges = hl && hl.cache ? hl.cache.reduce(function(ranges, ea) {
					return ranges.concat(ea ? ea : []);
				}, []) : [];
				iSearch.deactivate(false);
				ranges.forEach(ed.selection.addRange.bind(ed.selection));
			}
		},
		{
			name: "searchAsRegExp",
			bindKey: "Alt-r",
			exec: function(iSearch) {
				iSearch.convertNeedleToRegExp();
			}
		}
	].map(function(cmd) {
		cmd.readOnly = true;
		cmd.isIncrementalSearchCommand = true;
		cmd.scrollIntoView = "animate-cursor";
		return cmd;
	});
	function IncrementalSearchKeyboardHandler(iSearch) {
		this.$iSearch = iSearch;
	}
	oop.inherits(IncrementalSearchKeyboardHandler, HashHandler);
	(function() {
		/**
		* @param editor
		* @this {IncrementalSearchKeyboardHandler & this & {$commandExecHandler}}
		*/
		this.attach = function(editor) {
			var iSearch = this.$iSearch;
			HashHandler.call(this, exports.iSearchCommands, editor.commands.platform);
			this.$commandExecHandler = editor.commands.on("exec", function(e) {
				if (!e.command.isIncrementalSearchCommand) return iSearch.deactivate();
				e.stopPropagation();
				e.preventDefault();
				var scrollTop = editor.session.getScrollTop();
				var result = e.command.exec(iSearch, e.args || {});
				editor.renderer.scrollCursorIntoView(null, .5);
				editor.renderer.animateScrolling(scrollTop);
				return result;
			});
		};
		/**
		* @this {IncrementalSearchKeyboardHandler & this & {$commandExecHandler}}
		* @param editor
		*/
		this.detach = function(editor) {
			if (!this.$commandExecHandler) return;
			editor.commands.off("exec", this.$commandExecHandler);
			delete this.$commandExecHandler;
		};
		var handleKeyboard$super = this.handleKeyboard;
		/**
		* @param data
		* @param hashId
		* @param key
		* @param keyCode
		* @this {IncrementalSearchKeyboardHandler & import("../keyboard/hash_handler").HashHandler}
		*/
		this.handleKeyboard = function(data, hashId, key, keyCode) {
			if ((hashId === 1 || hashId === 8) && key === "v" || hashId === 1 && key === "y") return null;
			var cmd = handleKeyboard$super.call(this, data, hashId, key, keyCode);
			if (cmd && cmd.command) return cmd;
			if (hashId == -1) {
				var extendCmd = this.commands.extendSearchTerm;
				if (extendCmd) return {
					command: extendCmd,
					args: key
				};
			}
			return false;
		};
	}).call(IncrementalSearchKeyboardHandler.prototype);
	exports.IncrementalSearchKeyboardHandler = IncrementalSearchKeyboardHandler;
}));
//#endregion
//#region node_modules/ace-code/src/incremental_search.js
var require_incremental_search = /* @__PURE__ */ __commonJSMin(((exports) => {
	var Range = require_range().Range;
	var Search = require_search().Search;
	var SearchHighlight = require_search_highlight().SearchHighlight;
	var iSearchCommandModule = require_incremental_search_commands();
	var ISearchKbd = iSearchCommandModule.IncrementalSearchKeyboardHandler;
	function isRegExp(obj) {
		return obj instanceof RegExp;
	}
	/**
	* @param {RegExp} re
	*/
	function regExpToObject(re) {
		var string = String(re), start = string.indexOf("/"), flagStart = string.lastIndexOf("/");
		return {
			expression: string.slice(start + 1, flagStart),
			flags: string.slice(flagStart + 1)
		};
	}
	/**
	* @param {string} string
	* @param {string} flags
	* @return {RegExp|string}
	*/
	function stringToRegExp(string, flags) {
		try {
			return new RegExp(string, flags);
		} catch (e) {
			return string;
		}
	}
	function objectToRegExp(obj) {
		return stringToRegExp(obj.expression, obj.flags);
	}
	/**
	* Implements immediate searching while the user is typing. When incremental
	* search is activated, keystrokes into the editor will be used for composing
	* a search term. Immediately after every keystroke the search is updated:
	* - so-far-matching characters are highlighted
	* - the cursor is moved to the next match
	*
	**/
	var IncrementalSearch = class extends Search {
		/**
		* Creates a new `IncrementalSearch` object.
		**/
		constructor() {
			super();
			this.$options = {
				wrap: false,
				skipCurrent: false
			};
			this.$keyboardHandler = new ISearchKbd(this);
		}
		/**
		* @param {boolean} backwards
		*/
		activate(editor, backwards) {
			this.$editor = editor;
			this.$startPos = this.$currentPos = editor.getCursorPosition();
			this.$options.needle = "";
			this.$options.backwards = backwards;
			editor.keyBinding.addKeyboardHandler(this.$keyboardHandler);
			this.$originalEditorOnPaste = editor.onPaste;
			editor.onPaste = this.onPaste.bind(this);
			this.$mousedownHandler = editor.on("mousedown", this.onMouseDown.bind(this));
			this.selectionFix(editor);
			this.statusMessage(true);
		}
		/**
		* @param {boolean} [reset]
		*/
		deactivate(reset) {
			this.cancelSearch(reset);
			var editor = this.$editor;
			editor.keyBinding.removeKeyboardHandler(this.$keyboardHandler);
			if (this.$mousedownHandler) {
				editor.off("mousedown", this.$mousedownHandler);
				delete this.$mousedownHandler;
			}
			editor.onPaste = this.$originalEditorOnPaste;
			this.message("");
		}
		/**
		* @param {Editor} editor
		*/
		selectionFix(editor) {
			if (editor.selection.isEmpty() && !editor.session.$emacsMark) editor.clearSelection();
		}
		/**
		* @param {RegExp} regexp
		*/
		highlight(regexp) {
			var sess = this.$editor.session;
			(sess.$isearchHighlight = sess.$isearchHighlight || sess.addDynamicMarker(new SearchHighlight(null, "ace_isearch-result", "text"))).setRegexp(regexp);
			sess._emit("changeBackMarker");
		}
		/**
		* @param {boolean} [reset]
		*/
		cancelSearch(reset) {
			var e = this.$editor;
			this.$prevNeedle = this.$options.needle;
			this.$options.needle = "";
			if (reset) {
				e.moveCursorToPosition(this.$startPos);
				this.$currentPos = this.$startPos;
			} else e.pushEmacsMark && e.pushEmacsMark(this.$startPos, false);
			this.highlight(null);
			return Range.fromPoints(this.$currentPos, this.$currentPos);
		}
		/**
		* @param {boolean} moveToNext
		* @param {Function} needleUpdateFunc
		*/
		highlightAndFindWithNeedle(moveToNext, needleUpdateFunc) {
			if (!this.$editor) return null;
			var options = this.$options;
			if (needleUpdateFunc) options.needle = needleUpdateFunc.call(this, options.needle || "") || "";
			if (options.needle.length === 0) {
				this.statusMessage(true);
				return this.cancelSearch(true);
			}
			options.start = this.$currentPos;
			var session = this.$editor.session, found = this.find(session), shouldSelect = this.$editor.emacsMark ? !!this.$editor.emacsMark() : !this.$editor.selection.isEmpty();
			if (found) {
				if (options.backwards) found = Range.fromPoints(found.end, found.start);
				this.$editor.selection.setRange(Range.fromPoints(shouldSelect ? this.$startPos : found.end, found.end));
				if (moveToNext) this.$currentPos = found.end;
				this.highlight(options.re);
			}
			this.statusMessage(found);
			return found;
		}
		/**
		* @param {string} s
		*/
		addString(s) {
			return this.highlightAndFindWithNeedle(false, function(needle) {
				if (!isRegExp(needle)) return needle + s;
				var reObj = regExpToObject(needle);
				reObj.expression += s;
				return objectToRegExp(reObj);
			});
		}
		/**
		* @param {any} c
		*/
		removeChar(c) {
			return this.highlightAndFindWithNeedle(false, function(needle) {
				if (!isRegExp(needle)) return needle.substring(0, needle.length - 1);
				var reObj = regExpToObject(needle);
				reObj.expression = reObj.expression.substring(0, reObj.expression.length - 1);
				return objectToRegExp(reObj);
			});
		}
		next(options) {
			options = options || {};
			this.$options.backwards = !!options.backwards;
			this.$currentPos = this.$editor.getCursorPosition();
			return this.highlightAndFindWithNeedle(true, function(needle) {
				return options.useCurrentOrPrevSearch && needle.length === 0 ? this.$prevNeedle || "" : needle;
			});
		}
		/**
		* @internal
		*/
		onMouseDown(evt) {
			this.deactivate();
			return true;
		}
		/**
		* @param {string} text
		* @internal
		*/
		onPaste(text) {
			this.addString(text);
		}
		convertNeedleToRegExp() {
			return this.highlightAndFindWithNeedle(false, function(needle) {
				return isRegExp(needle) ? needle : stringToRegExp(needle, "ig");
			});
		}
		convertNeedleToString() {
			return this.highlightAndFindWithNeedle(false, function(needle) {
				return isRegExp(needle) ? regExpToObject(needle).expression : needle;
			});
		}
		statusMessage(found) {
			var options = this.$options, msg = "";
			msg += options.backwards ? "reverse-" : "";
			msg += "isearch: " + options.needle;
			msg += found ? "" : " (not found)";
			this.message(msg);
		}
		message(msg) {
			if (this.$editor.showCommandLine) {
				this.$editor.showCommandLine(msg);
				this.$editor.focus();
			}
		}
	};
	exports.IncrementalSearch = IncrementalSearch;
	require_dom().importCssString(`
.ace_marker-layer .ace_isearch-result {
  position: absolute;
  z-index: 6;
  box-sizing: border-box;
}
div.ace_isearch-result {
  border-radius: 4px;
  background-color: rgba(255, 200, 0, 0.5);
  box-shadow: 0 0 4px rgb(255, 200, 0);
}
.ace_dark div.ace_isearch-result {
  background-color: rgb(100, 110, 160);
  box-shadow: 0 0 4px rgb(80, 90, 140);
}`, "incremental-search-highlighting", false);
	var commands = require_command_manager();
	(function() {
		this.setupIncrementalSearch = function(editor, val) {
			if (this.usesIncrementalSearch == val) return;
			this.usesIncrementalSearch = val;
			var iSearchCommands = iSearchCommandModule.iSearchStartCommands;
			var method = val ? "addCommands" : "removeCommands";
			this[method](iSearchCommands);
		};
	}).call(commands.CommandManager.prototype);
	var Editor = require_editor().Editor;
	require_config().defineOptions(Editor.prototype, "editor", { useIncrementalSearch: { set: function(val) {
		this.keyBinding.$handlers.forEach(function(handler) {
			if (handler.setupIncrementalSearch) handler.setupIncrementalSearch(this, val);
		});
		this._emit("incrementalSearchSettingChanged", { isEnabled: val });
	} } });
}));
//#endregion
//#region node_modules/ace-code/src/keyboard/emacs.js
var require_emacs = /* @__PURE__ */ __commonJSMin(((exports) => {
	var dom = require_dom();
	require_incremental_search();
	var iSearchCommandModule = require_incremental_search_commands();
	var HashHandler = require_hash_handler().HashHandler;
	exports.handler = new HashHandler();
	exports.handler.isEmacs = true;
	exports.handler.$id = "ace/keyboard/emacs";
	dom.importCssString(`
.emacs-mode .ace_cursor{
    border: 1px rgba(50,250,50,0.8) solid!important;
    box-sizing: border-box!important;
    background-color: rgba(0,250,0,0.9);
    opacity: 0.5;
}
.emacs-mode .ace_hidden-cursors .ace_cursor{
    opacity: 1;
    background-color: transparent;
}
.emacs-mode .ace_overwrite-cursors .ace_cursor {
    opacity: 1;
    background-color: transparent;
    border-width: 0 0 2px 2px !important;
}
.emacs-mode .ace_text-layer {
    z-index: 4
}
.emacs-mode .ace_cursor-layer {
    z-index: 2
}`, "emacsMode", false);
	var $formerLongWords;
	var $formerLineStart;
	exports.handler.attach = function(editor) {
		$formerLongWords = editor.session.$selectLongWords;
		editor.session.$selectLongWords = true;
		$formerLineStart = editor.session.$useEmacsStyleLineStart;
		editor.session.$useEmacsStyleLineStart = true;
		editor.session.$emacsMark = null;
		editor.session.$emacsMarkRing = editor.session.$emacsMarkRing || [];
		editor.emacsMark = function() {
			return this.session.$emacsMark;
		};
		editor.setEmacsMark = function(p) {
			this.session.$emacsMark = p;
		};
		editor.pushEmacsMark = function(p, activate) {
			var prevMark = this.session.$emacsMark;
			if (prevMark) pushUnique(this.session.$emacsMarkRing, prevMark);
			if (!p || activate) this.setEmacsMark(p);
			else pushUnique(this.session.$emacsMarkRing, p);
		};
		editor.popEmacsMark = function() {
			var mark = this.emacsMark();
			if (mark) {
				this.setEmacsMark(null);
				return mark;
			}
			return this.session.$emacsMarkRing.pop();
		};
		editor.getLastEmacsMark = function(p) {
			return this.session.$emacsMark || this.session.$emacsMarkRing.slice(-1)[0];
		};
		editor.emacsMarkForSelection = function(replacement) {
			var sel = this.selection, multiRangeLength = this.multiSelect ? this.multiSelect.getAllRanges().length : 1, selIndex = sel.index || 0, markRing = this.session.$emacsMarkRing, markIndex = markRing.length - (multiRangeLength - selIndex), lastMark = markRing[markIndex] || sel.anchor;
			if (replacement) markRing.splice(markIndex, 1, "row" in replacement && "column" in replacement ? replacement : void 0);
			return lastMark;
		};
		editor.on("click", $resetMarkMode);
		editor.on("changeSession", $kbSessionChange);
		editor.renderer.$blockCursor = true;
		editor.setStyle("emacs-mode");
		editor.commands.addCommands(commands);
		exports.handler.platform = editor.commands.platform;
		editor.$emacsModeHandler = this;
		editor.on("copy", this.onCopy);
		editor.on("paste", this.onPaste);
	};
	function pushUnique(ring, mark) {
		var last = ring[ring.length - 1];
		if (last && last.row === mark.row && last.column === mark.column) return;
		ring.push(mark);
	}
	exports.handler.detach = function(editor) {
		editor.renderer.$blockCursor = false;
		editor.session.$selectLongWords = $formerLongWords;
		editor.session.$useEmacsStyleLineStart = $formerLineStart;
		editor.off("click", $resetMarkMode);
		editor.off("changeSession", $kbSessionChange);
		editor.unsetStyle("emacs-mode");
		editor.commands.removeCommands(commands);
		editor.off("copy", this.onCopy);
		editor.off("paste", this.onPaste);
		editor.$emacsModeHandler = null;
	};
	var $kbSessionChange = function(e) {
		if (e.oldSession) {
			e.oldSession.$selectLongWords = $formerLongWords;
			e.oldSession.$useEmacsStyleLineStart = $formerLineStart;
		}
		$formerLongWords = e.session.$selectLongWords;
		e.session.$selectLongWords = true;
		$formerLineStart = e.session.$useEmacsStyleLineStart;
		e.session.$useEmacsStyleLineStart = true;
		if (!e.session.hasOwnProperty("$emacsMark")) e.session.$emacsMark = null;
		if (!e.session.hasOwnProperty("$emacsMarkRing")) e.session.$emacsMarkRing = [];
	};
	var $resetMarkMode = function(e) {
		e.editor.session.$emacsMark = null;
	};
	var keys = require_keys().KEY_MODS;
	var eMods = {
		C: "ctrl",
		S: "shift",
		M: "alt",
		CMD: "command"
	};
	[
		"C-S-M-CMD",
		"S-M-CMD",
		"C-M-CMD",
		"C-S-CMD",
		"C-S-M",
		"M-CMD",
		"S-CMD",
		"S-M",
		"C-CMD",
		"C-M",
		"C-S",
		"CMD",
		"M",
		"S",
		"C"
	].forEach(function(c) {
		var hashId = 0;
		c.split("-").forEach(function(c) {
			hashId = hashId | keys[eMods[c]];
		});
		eMods[hashId] = c.toLowerCase() + "-";
	});
	exports.handler.onCopy = function(e, editor) {
		if (editor.$handlesEmacsOnCopy) return;
		editor.$handlesEmacsOnCopy = true;
		exports.handler.commands.killRingSave.exec(editor);
		editor.$handlesEmacsOnCopy = false;
	};
	exports.handler.onPaste = function(e, editor) {
		editor.pushEmacsMark(editor.getCursorPosition());
	};
	exports.handler.bindKey = function(key, command) {
		if (typeof key == "object") key = key[this.platform];
		if (!key) return;
		var ckb = this.commandKeyBinding;
		key.split("|").forEach(function(keyPart) {
			keyPart = keyPart.toLowerCase();
			ckb[keyPart] = command;
			keyPart.split(" ").slice(0, -1).reduce(function(keyMapKeys, keyPart, i) {
				var prefix = keyMapKeys[i - 1] ? keyMapKeys[i - 1] + " " : "";
				return keyMapKeys.concat([prefix + keyPart]);
			}, []).forEach(function(keyPart) {
				if (!ckb[keyPart]) ckb[keyPart] = "null";
			});
		}, this);
	};
	exports.handler.getStatusText = function(editor, data) {
		var str = "";
		if (data.count) str += data.count;
		if (data.keyChain) str += " " + data.keyChain;
		return str;
	};
	exports.handler.handleKeyboard = function(data, hashId, key, keyCode) {
		if (keyCode === -1) return void 0;
		var editor = data.editor;
		editor._signal("changeStatus");
		if (hashId == -1) {
			editor.pushEmacsMark();
			if (data.count) {
				var str = new Array(data.count + 1).join(key);
				data.count = null;
				return {
					command: "insertstring",
					args: str
				};
			}
		}
		var modifier = eMods[hashId];
		if (modifier == "c-" || data.count) {
			var count = parseInt(key[key.length - 1]);
			if (typeof count === "number" && !isNaN(count)) {
				data.count = Math.max(data.count, 0) || 0;
				data.count = 10 * data.count + count;
				return { command: "null" };
			}
		}
		if (modifier) key = modifier + key;
		if (data.keyChain) key = data.keyChain += " " + key;
		var command = this.commandKeyBinding[key];
		data.keyChain = command == "null" ? key : "";
		if (!command) return void 0;
		if (command === "null") return { command: "null" };
		if (command === "universalArgument") {
			data.count = -4;
			return { command: "null" };
		}
		var args;
		if (typeof command !== "string") {
			args = command.args;
			if (command.command) command = command.command;
			if (command === "goorselect") {
				command = editor.emacsMark() ? args[1] : args[0];
				args = null;
			}
		}
		if (typeof command === "string") {
			if (command === "insertstring" || command === "splitline" || command === "togglecomment") editor.pushEmacsMark();
			command = this.commands[command] || editor.commands.commands[command];
			if (!command) return void 0;
		}
		if (!command.readOnly && !command.isYank) data.lastCommand = null;
		if (!command.readOnly && editor.emacsMark()) editor.setEmacsMark(null);
		if (data.count) {
			var count = data.count;
			data.count = 0;
			if (!command || !command.handlesCount) return {
				args,
				command: {
					exec: function(editor, args) {
						for (var i = 0; i < count; i++) command.exec(editor, args);
					},
					multiSelectAction: command.multiSelectAction
				}
			};
			else {
				if (!args) args = {};
				if (typeof args === "object") args.count = count;
			}
		}
		return {
			command,
			args
		};
	};
	exports.emacsKeys = {
		"Up|C-p": {
			command: "goorselect",
			args: ["golineup", "selectup"]
		},
		"Down|C-n": {
			command: "goorselect",
			args: ["golinedown", "selectdown"]
		},
		"Left|C-b": {
			command: "goorselect",
			args: ["gotoleft", "selectleft"]
		},
		"Right|C-f": {
			command: "goorselect",
			args: ["gotoright", "selectright"]
		},
		"C-Left|M-b": {
			command: "goorselect",
			args: ["gotowordleft", "selectwordleft"]
		},
		"C-Right|M-f": {
			command: "goorselect",
			args: ["gotowordright", "selectwordright"]
		},
		"Home|C-a": {
			command: "goorselect",
			args: ["gotolinestart", "selecttolinestart"]
		},
		"End|C-e": {
			command: "goorselect",
			args: ["gotolineend", "selecttolineend"]
		},
		"C-Home|S-M-,": {
			command: "goorselect",
			args: ["gotostart", "selecttostart"]
		},
		"C-End|S-M-.": {
			command: "goorselect",
			args: ["gotoend", "selecttoend"]
		},
		"S-Up|S-C-p": "selectup",
		"S-Down|S-C-n": "selectdown",
		"S-Left|S-C-b": "selectleft",
		"S-Right|S-C-f": "selectright",
		"S-C-Left|S-M-b": "selectwordleft",
		"S-C-Right|S-M-f": "selectwordright",
		"S-Home|S-C-a": "selecttolinestart",
		"S-End|S-C-e": "selecttolineend",
		"S-C-Home": "selecttostart",
		"S-C-End": "selecttoend",
		"C-l": "recenterTopBottom",
		"M-s": "centerselection",
		"M-g": "gotoline",
		"C-x C-p": "selectall",
		"C-Down": {
			command: "goorselect",
			args: ["gotopagedown", "selectpagedown"]
		},
		"C-Up": {
			command: "goorselect",
			args: ["gotopageup", "selectpageup"]
		},
		"PageDown|C-v": {
			command: "goorselect",
			args: ["gotopagedown", "selectpagedown"]
		},
		"PageUp|M-v": {
			command: "goorselect",
			args: ["gotopageup", "selectpageup"]
		},
		"S-C-Down": "selectpagedown",
		"S-C-Up": "selectpageup",
		"C-s": "iSearch",
		"C-r": "iSearchBackwards",
		"M-C-s": "findnext",
		"M-C-r": "findprevious",
		"S-M-5": "replace",
		"Backspace": "backspace",
		"Delete|C-d": "del",
		"Return|C-m": {
			command: "insertstring",
			args: "\n"
		},
		"C-o": "splitline",
		"M-d|C-Delete": {
			command: "killWord",
			args: "right"
		},
		"C-Backspace|M-Backspace|M-Delete": {
			command: "killWord",
			args: "left"
		},
		"C-k": "killLine",
		"C-y|S-Delete": "yank",
		"M-y": "yankRotate",
		"C-g": "keyboardQuit",
		"C-w|C-S-W": "killRegion",
		"M-w": "killRingSave",
		"C-Space": "setMark",
		"C-x C-x": "exchangePointAndMark",
		"C-t": "transposeletters",
		"M-u": "touppercase",
		"M-l": "tolowercase",
		"M-/": "autocomplete",
		"C-u": "universalArgument",
		"M-;": "togglecomment",
		"C-/|C-x u|S-C--|C-z": "undo",
		"S-C-/|S-C-x u|C--|S-C-z": "redo",
		"C-x r": "selectRectangularRegion",
		"M-x": {
			command: "focusCommandLine",
			args: "M-x "
		}
	};
	exports.handler.bindKeys(exports.emacsKeys);
	exports.handler.addCommands({
		recenterTopBottom: function(editor) {
			var renderer = editor.renderer;
			var pos = renderer.$cursorLayer.getPixelPosition();
			var h = renderer.$size.scrollerHeight - renderer.lineHeight;
			var scrollTop = renderer.scrollTop;
			if (Math.abs(pos.top - scrollTop) < 2) scrollTop = pos.top - h;
			else if (Math.abs(pos.top - scrollTop - h * .5) < 2) scrollTop = pos.top;
			else scrollTop = pos.top - h * .5;
			editor.session.setScrollTop(scrollTop);
		},
		selectRectangularRegion: function(editor) {
			editor.multiSelect.toggleBlockSelection();
		},
		setMark: {
			exec: function(editor, args) {
				if (args && args.count) {
					if (editor.inMultiSelectMode) editor.forEachSelection(moveToMark);
					else moveToMark();
					moveToMark();
					return;
				}
				var mark = editor.emacsMark(), ranges = editor.selection.getAllRanges(), rangePositions = ranges.map(function(r) {
					return {
						row: r.start.row,
						column: r.start.column
					};
				}), transientMarkModeActive = true, hasNoSelection = ranges.every(function(range) {
					return range.isEmpty();
				});
				if (transientMarkModeActive && (mark || !hasNoSelection)) {
					if (editor.inMultiSelectMode) editor.forEachSelection({ exec: editor.clearSelection.bind(editor) });
					else editor.clearSelection();
					if (mark) editor.pushEmacsMark(null);
					return;
				}
				if (!mark) {
					rangePositions.forEach(function(pos) {
						editor.pushEmacsMark(pos);
					});
					editor.setEmacsMark(rangePositions[rangePositions.length - 1]);
					return;
				}
				function moveToMark() {
					var mark = editor.popEmacsMark();
					mark && editor.moveCursorToPosition(mark);
				}
			},
			readOnly: true,
			handlesCount: true
		},
		exchangePointAndMark: {
			exec: function exchangePointAndMark$exec(editor, args) {
				var sel = editor.selection;
				if (!args.count && !sel.isEmpty()) {
					sel.setSelectionRange(sel.getRange(), !sel.isBackwards());
					return;
				}
				if (args.count) {
					var pos = {
						row: sel.lead.row,
						column: sel.lead.column
					};
					sel.clearSelection();
					sel.moveCursorToPosition(editor.emacsMarkForSelection(pos));
				} else sel.selectToPosition(editor.emacsMarkForSelection());
			},
			readOnly: true,
			handlesCount: true,
			multiSelectAction: "forEach"
		},
		killWord: {
			exec: function(editor, dir) {
				editor.clearSelection();
				if (dir == "left") editor.selection.selectWordLeft();
				else editor.selection.selectWordRight();
				var range = editor.getSelectionRange();
				var text = editor.session.getTextRange(range);
				exports.killRing.add(text);
				editor.session.remove(range);
				editor.clearSelection();
			},
			multiSelectAction: "forEach"
		},
		killLine: function(editor) {
			editor.pushEmacsMark(null);
			editor.clearSelection();
			var range = editor.getSelectionRange();
			var line = editor.session.getLine(range.start.row);
			range.end.column = line.length;
			line = line.substr(range.start.column);
			var foldLine = editor.session.getFoldLine(range.start.row);
			if (foldLine && range.end.row != foldLine.end.row) {
				range.end.row = foldLine.end.row;
				line = "x";
			}
			if (/^\s*$/.test(line)) {
				range.end.row++;
				line = editor.session.getLine(range.end.row);
				range.end.column = /^\s*$/.test(line) ? line.length : 0;
			}
			var text = editor.session.getTextRange(range);
			if (editor.prevOp.command == this) exports.killRing.append(text);
			else exports.killRing.add(text);
			editor.session.remove(range);
			editor.clearSelection();
		},
		yank: function(editor) {
			editor.onPaste(exports.killRing.get() || "");
			editor.keyBinding.$data.lastCommand = "yank";
		},
		yankRotate: function(editor) {
			if (editor.keyBinding.$data.lastCommand != "yank") return;
			editor.undo();
			editor.session.$emacsMarkRing.pop();
			editor.onPaste(exports.killRing.rotate());
			editor.keyBinding.$data.lastCommand = "yank";
		},
		killRegion: {
			exec: function(editor) {
				exports.killRing.add(editor.getCopyText());
				editor.commands.byName.cut.exec(editor);
				editor.setEmacsMark(null);
			},
			readOnly: true,
			multiSelectAction: "forEach"
		},
		killRingSave: {
			exec: function(editor) {
				editor.$handlesEmacsOnCopy = true;
				var marks = editor.session.$emacsMarkRing.slice(), deselectedMarks = [];
				exports.killRing.add(editor.getCopyText());
				setTimeout(function() {
					function deselect() {
						var sel = editor.selection, range = sel.getRange(), pos = sel.isBackwards() ? range.end : range.start;
						deselectedMarks.push({
							row: pos.row,
							column: pos.column
						});
						sel.clearSelection();
					}
					editor.$handlesEmacsOnCopy = false;
					if (editor.inMultiSelectMode) editor.forEachSelection({ exec: deselect });
					else deselect();
					editor.setEmacsMark(null);
					editor.session.$emacsMarkRing = marks.concat(deselectedMarks.reverse());
				}, 0);
			},
			readOnly: true
		},
		keyboardQuit: function(editor) {
			editor.selection.clearSelection();
			editor.setEmacsMark(null);
			editor.keyBinding.$data.count = null;
		},
		focusCommandLine: function(editor, arg) {
			if (editor.showCommandLine) editor.showCommandLine(arg);
		}
	});
	exports.handler.addCommands(iSearchCommandModule.iSearchStartCommands);
	var commands = exports.handler.commands;
	commands.yank.isYank = true;
	commands.yankRotate.isYank = true;
	exports.killRing = {
		$data: [],
		add: function(str) {
			str && this.$data.push(str);
			if (this.$data.length > 30) this.$data.shift();
		},
		append: function(str) {
			var idx = this.$data.length - 1;
			var text = this.$data[idx] || "";
			if (str) text += str;
			if (text) this.$data[idx] = text;
		},
		get: function(n) {
			n = n || 1;
			return this.$data.slice(this.$data.length - n, this.$data.length).reverse().join("\n");
		},
		pop: function() {
			if (this.$data.length > 1) this.$data.pop();
			return this.get();
		},
		rotate: function() {
			this.$data.unshift(this.$data.pop());
			return this.get();
		}
	};
}));
//#endregion
export default require_emacs();
