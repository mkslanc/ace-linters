import { t as __commonJSMin } from "./chunk-iA-Slpst.js";
import { t as require_useragent } from "./useragent-BODERP_7.js";
import { t as require_range } from "./range-BUVqNbwc.js";
import { t as require_lang } from "./lang-DcNOSqFo.js";
import { t as require_event } from "./event-BcX-N72I.js";
import { t as require_config } from "./config-DPm1ug3B.js";
import { r as require_search, t as require_editor } from "./editor-BiOsjB7l.js";
import { n as require_range_list, o as require_selection, t as require_edit_session } from "./edit_session-CDHRvoey.js";
import { t as require_hash_handler } from "./hash_handler-G_6vQiwI.js";
var require_multi_select_handler = /* @__PURE__ */ __commonJSMin(((exports) => {
	var event$1 = require_event();
	var useragent = require_useragent();
	function isSamePoint$1(p1, p2) {
		return p1.row == p2.row && p1.column == p2.column;
	}
	function onMouseDown$1(e) {
		var ev = e.domEvent;
		var alt = ev.altKey;
		var shift = ev.shiftKey;
		var ctrl = ev.ctrlKey;
		var accel = e.getAccelKey();
		var button = e.getButton();
		if (ctrl && useragent.isMac) button = ev.button;
		if (e.editor.inMultiSelectMode && button == 2) {
			e.editor.textInput.onContextMenu(e.domEvent);
			return;
		}
		if (!ctrl && !alt && !accel) {
			if (button === 0 && e.editor.inMultiSelectMode) e.editor.exitMultiSelectMode();
			return;
		}
		if (button !== 0) return;
		var editor = e.editor;
		var selection = editor.selection;
		var isMultiSelect = editor.inMultiSelectMode;
		var pos = e.getDocumentPosition();
		var cursor = selection.getCursor();
		var inSelection = e.inSelection() || selection.isEmpty() && isSamePoint$1(pos, cursor);
		var mouseX = e.x, mouseY = e.y;
		var onMouseSelection = function(e$1) {
			mouseX = e$1.clientX;
			mouseY = e$1.clientY;
		};
		var session = editor.session;
		var screenAnchor = editor.renderer.pixelToScreenCoordinates(mouseX, mouseY);
		var screenCursor = screenAnchor;
		var selectionMode;
		if (editor.$mouseHandler.$enableJumpToDef) {
			if (ctrl && alt || accel && alt) selectionMode = shift ? "block" : "add";
			else if (alt && editor.$blockSelectEnabled) selectionMode = "block";
		} else if (accel && !alt) {
			selectionMode = "add";
			if (!isMultiSelect && shift) return;
		} else if (alt && editor.$blockSelectEnabled) selectionMode = "block";
		if (selectionMode && useragent.isMac && ev.ctrlKey) editor.$mouseHandler.cancelContextMenu();
		if (selectionMode == "add") {
			if (!isMultiSelect && inSelection) return;
			if (!isMultiSelect) {
				var range = selection.toOrientedRange();
				editor.addSelectionMarker(range);
			}
			var oldRange = selection.rangeList.rangeAtPoint(pos);
			editor.inVirtualSelectionMode = true;
			if (shift) {
				oldRange = null;
				range = selection.ranges[0] || range;
				editor.removeSelectionMarker(range);
			}
			editor.once("mouseup", function() {
				var tmpSel = selection.toOrientedRange();
				if (oldRange && tmpSel.isEmpty() && isSamePoint$1(oldRange.cursor, tmpSel.cursor)) selection.substractPoint(tmpSel.cursor);
				else {
					if (shift) selection.substractPoint(range.cursor);
					else if (range) {
						editor.removeSelectionMarker(range);
						selection.addRange(range);
					}
					selection.addRange(tmpSel);
				}
				editor.inVirtualSelectionMode = false;
			});
		} else if (selectionMode == "block") {
			e.stop();
			editor.inVirtualSelectionMode = true;
			var initialRange;
			var rectSel = [];
			var blockSelect = function() {
				var newCursor = editor.renderer.pixelToScreenCoordinates(mouseX, mouseY);
				var cursor$1 = session.screenToDocumentPosition(newCursor.row, newCursor.column, newCursor.offsetX);
				if (isSamePoint$1(screenCursor, newCursor) && isSamePoint$1(cursor$1, selection.lead)) return;
				screenCursor = newCursor;
				editor.selection.moveToPosition(cursor$1);
				editor.renderer.scrollCursorIntoView();
				editor.removeSelectionMarkers(rectSel);
				rectSel = selection.rectangularRangeBlock(screenCursor, screenAnchor);
				if (editor.$mouseHandler.$clickSelection && rectSel.length == 1 && rectSel[0].isEmpty()) rectSel[0] = editor.$mouseHandler.$clickSelection.clone();
				rectSel.forEach(editor.addSelectionMarker, editor);
				editor.updateSelectionMarkers();
			};
			if (isMultiSelect && !accel) selection.toSingleRange();
			else if (!isMultiSelect && accel) {
				initialRange = selection.toOrientedRange();
				editor.addSelectionMarker(initialRange);
			}
			if (shift) screenAnchor = session.documentToScreenPosition(selection.lead);
			else selection.moveToPosition(pos);
			screenCursor = {
				row: -1,
				column: -1
			};
			var onMouseSelectionEnd = function(e$1) {
				blockSelect();
				clearInterval(timerId);
				editor.removeSelectionMarkers(rectSel);
				if (!rectSel.length) rectSel = [selection.toOrientedRange()];
				if (initialRange) {
					editor.removeSelectionMarker(initialRange);
					selection.toSingleRange(initialRange);
				}
				for (var i = 0; i < rectSel.length; i++) selection.addRange(rectSel[i]);
				editor.inVirtualSelectionMode = false;
				editor.$mouseHandler.$clickSelection = null;
			};
			var onSelectionInterval = blockSelect;
			event$1.capture(editor.container, onMouseSelection, onMouseSelectionEnd);
			var timerId = setInterval(function() {
				onSelectionInterval();
			}, 20);
			return e.preventDefault();
		}
	}
	exports.onMouseDown = onMouseDown$1;
}));
var require_multi_select_commands = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.defaultCommands = [
		{
			name: "addCursorAbove",
			description: "Add cursor above",
			exec: function(editor) {
				editor.selectMoreLines(-1);
			},
			bindKey: {
				win: "Ctrl-Alt-Up",
				mac: "Ctrl-Alt-Up"
			},
			scrollIntoView: "cursor",
			readOnly: true
		},
		{
			name: "addCursorBelow",
			description: "Add cursor below",
			exec: function(editor) {
				editor.selectMoreLines(1);
			},
			bindKey: {
				win: "Ctrl-Alt-Down",
				mac: "Ctrl-Alt-Down"
			},
			scrollIntoView: "cursor",
			readOnly: true
		},
		{
			name: "addCursorAboveSkipCurrent",
			description: "Add cursor above (skip current)",
			exec: function(editor) {
				editor.selectMoreLines(-1, true);
			},
			bindKey: {
				win: "Ctrl-Alt-Shift-Up",
				mac: "Ctrl-Alt-Shift-Up"
			},
			scrollIntoView: "cursor",
			readOnly: true
		},
		{
			name: "addCursorBelowSkipCurrent",
			description: "Add cursor below (skip current)",
			exec: function(editor) {
				editor.selectMoreLines(1, true);
			},
			bindKey: {
				win: "Ctrl-Alt-Shift-Down",
				mac: "Ctrl-Alt-Shift-Down"
			},
			scrollIntoView: "cursor",
			readOnly: true
		},
		{
			name: "selectMoreBefore",
			description: "Select more before",
			exec: function(editor) {
				editor.selectMore(-1);
			},
			bindKey: {
				win: "Ctrl-Alt-Left",
				mac: "Ctrl-Alt-Left"
			},
			scrollIntoView: "cursor",
			readOnly: true
		},
		{
			name: "selectMoreAfter",
			description: "Select more after",
			exec: function(editor) {
				editor.selectMore(1);
			},
			bindKey: {
				win: "Ctrl-Alt-Right",
				mac: "Ctrl-Alt-Right"
			},
			scrollIntoView: "cursor",
			readOnly: true
		},
		{
			name: "selectNextBefore",
			description: "Select next before",
			exec: function(editor) {
				editor.selectMore(-1, true);
			},
			bindKey: {
				win: "Ctrl-Alt-Shift-Left",
				mac: "Ctrl-Alt-Shift-Left"
			},
			scrollIntoView: "cursor",
			readOnly: true
		},
		{
			name: "selectNextAfter",
			description: "Select next after",
			exec: function(editor) {
				editor.selectMore(1, true);
			},
			bindKey: {
				win: "Ctrl-Alt-Shift-Right",
				mac: "Ctrl-Alt-Shift-Right"
			},
			scrollIntoView: "cursor",
			readOnly: true
		},
		{
			name: "toggleSplitSelectionIntoLines",
			description: "Split selection into lines",
			exec: function(editor) {
				if (editor.multiSelect.rangeCount > 1) editor.multiSelect.joinSelections();
				else editor.multiSelect.splitIntoLines();
			},
			bindKey: {
				win: "Ctrl-Alt-L",
				mac: "Ctrl-Alt-L"
			},
			readOnly: true
		},
		{
			name: "splitSelectionIntoLines",
			description: "Split into lines",
			exec: function(editor) {
				editor.multiSelect.splitIntoLines();
			},
			readOnly: true
		},
		{
			name: "alignCursors",
			description: "Align cursors",
			exec: function(editor) {
				editor.alignCursors();
			},
			bindKey: {
				win: "Ctrl-Alt-A",
				mac: "Ctrl-Alt-A"
			},
			scrollIntoView: "cursor"
		},
		{
			name: "findAll",
			description: "Find all",
			exec: function(editor) {
				editor.findAll();
			},
			bindKey: {
				win: "Ctrl-Alt-K",
				mac: "Ctrl-Alt-G"
			},
			scrollIntoView: "cursor",
			readOnly: true
		}
	];
	exports.multiSelectCommands = [{
		name: "singleSelection",
		description: "Single selection",
		bindKey: "esc",
		exec: function(editor) {
			editor.exitMultiSelectMode();
		},
		scrollIntoView: "cursor",
		readOnly: true,
		isAvailable: function(editor) {
			return editor && editor.inMultiSelectMode;
		}
	}];
	var HashHandler = require_hash_handler().HashHandler;
	exports.keyboardHandler = new HashHandler(exports.multiSelectCommands);
}));
var require_multi_select = /* @__PURE__ */ __commonJSMin(((exports) => {
	var RangeList = require_range_list().RangeList;
	var Range = require_range().Range;
	var Selection = require_selection().Selection;
	var onMouseDown = require_multi_select_handler().onMouseDown;
	var event = require_event();
	var lang = require_lang();
	var commands = require_multi_select_commands();
	exports.commands = commands.defaultCommands.concat(commands.multiSelectCommands);
	var Search = require_search().Search;
	var search = new Search();
	function find(session, needle, dir) {
		search.$options.wrap = true;
		search.$options.needle = needle;
		search.$options.backwards = dir == -1;
		return search.find(session);
	}
	var EditSession = require_edit_session().EditSession;
	(function() {
		this.getSelectionMarkers = function() {
			return this.$selectionMarkers;
		};
	}).call(EditSession.prototype);
	(function() {
		this.ranges = null;
		this.rangeList = null;
		this.addRange = function(range, $blockChangeEvents) {
			if (!range) return;
			if (!this.inMultiSelectMode && this.rangeCount === 0) {
				var oldRange = this.toOrientedRange();
				this.rangeList.add(oldRange);
				this.rangeList.add(range);
				if (this.rangeList.ranges.length != 2) {
					this.rangeList.removeAll();
					return $blockChangeEvents || this.fromOrientedRange(range);
				}
				this.rangeList.removeAll();
				this.rangeList.add(oldRange);
				this.$onAddRange(oldRange);
			}
			if (!range.cursor) range.cursor = range.end;
			var removed = this.rangeList.add(range);
			this.$onAddRange(range);
			if (removed.length) this.$onRemoveRange(removed);
			if (this.rangeCount > 1 && !this.inMultiSelectMode) {
				this._signal("multiSelect");
				this.inMultiSelectMode = true;
				this.session.$undoSelect = false;
				this.rangeList.attach(this.session);
			}
			return $blockChangeEvents || this.fromOrientedRange(range);
		};
		this.toSingleRange = function(range) {
			range = range || this.ranges[0];
			var removed = this.rangeList.removeAll();
			if (removed.length) this.$onRemoveRange(removed);
			range && this.fromOrientedRange(range);
		};
		this.substractPoint = function(pos) {
			var removed = this.rangeList.substractPoint(pos);
			if (removed) {
				this.$onRemoveRange(removed);
				return removed[0];
			}
		};
		this.mergeOverlappingRanges = function() {
			var removed = this.rangeList.merge();
			if (removed.length) this.$onRemoveRange(removed);
		};
		this.$onAddRange = function(range) {
			this.rangeCount = this.rangeList.ranges.length;
			this.ranges.unshift(range);
			this._signal("addRange", { range });
		};
		this.$onRemoveRange = function(removed) {
			this.rangeCount = this.rangeList.ranges.length;
			if (this.rangeCount == 1 && this.inMultiSelectMode) {
				var lastRange = this.rangeList.ranges.pop();
				removed.push(lastRange);
				this.rangeCount = 0;
			}
			for (var i = removed.length; i--;) {
				var index = this.ranges.indexOf(removed[i]);
				this.ranges.splice(index, 1);
			}
			this._signal("removeRange", { ranges: removed });
			if (this.rangeCount === 0 && this.inMultiSelectMode) {
				this.inMultiSelectMode = false;
				this._signal("singleSelect");
				this.session.$undoSelect = true;
				this.rangeList.detach(this.session);
			}
			lastRange = lastRange || this.ranges[0];
			if (lastRange && !lastRange.isEqual(this.getRange())) this.fromOrientedRange(lastRange);
		};
		this.$initRangeList = function() {
			if (this.rangeList) return;
			this.rangeList = new RangeList();
			this.ranges = [];
			this.rangeCount = 0;
		};
		this.getAllRanges = function() {
			return this.rangeCount ? this.rangeList.ranges.concat() : [this.getRange()];
		};
		this.splitIntoLines = function() {
			var ranges = this.ranges.length ? this.ranges : [this.getRange()];
			var newRanges = [];
			for (var i = 0; i < ranges.length; i++) {
				var range = ranges[i];
				var row = range.start.row;
				var endRow = range.end.row;
				if (row === endRow) newRanges.push(range.clone());
				else {
					newRanges.push(new Range(row, range.start.column, row, this.session.getLine(row).length));
					while (++row < endRow) newRanges.push(this.getLineRange(row, true));
					newRanges.push(new Range(endRow, 0, endRow, range.end.column));
				}
				if (i == 0 && !this.isBackwards()) newRanges = newRanges.reverse();
			}
			this.toSingleRange();
			for (var i = newRanges.length; i--;) this.addRange(newRanges[i]);
		};
		this.joinSelections = function() {
			var ranges = this.rangeList.ranges;
			var lastRange = ranges[ranges.length - 1];
			var range = Range.fromPoints(ranges[0].start, lastRange.end);
			this.toSingleRange();
			this.setSelectionRange(range, lastRange.cursor == lastRange.start);
		};
		this.toggleBlockSelection = function() {
			if (this.rangeCount > 1) {
				var ranges = this.rangeList.ranges;
				var lastRange = ranges[ranges.length - 1];
				var range = Range.fromPoints(ranges[0].start, lastRange.end);
				this.toSingleRange();
				this.setSelectionRange(range, lastRange.cursor == lastRange.start);
			} else {
				var cursor = this.session.documentToScreenPosition(this.cursor);
				var anchor = this.session.documentToScreenPosition(this.anchor);
				this.rectangularRangeBlock(cursor, anchor).forEach(this.addRange, this);
			}
		};
		this.rectangularRangeBlock = function(screenCursor, screenAnchor, includeEmptyLines) {
			var rectSel = [];
			var xBackwards = screenCursor.column < screenAnchor.column;
			if (xBackwards) {
				var startColumn = screenCursor.column;
				var endColumn = screenAnchor.column;
				var startOffsetX = screenCursor.offsetX;
				var endOffsetX = screenAnchor.offsetX;
			} else {
				var startColumn = screenAnchor.column;
				var endColumn = screenCursor.column;
				var startOffsetX = screenAnchor.offsetX;
				var endOffsetX = screenCursor.offsetX;
			}
			var yBackwards = screenCursor.row < screenAnchor.row;
			if (yBackwards) {
				var startRow = screenCursor.row;
				var endRow = screenAnchor.row;
			} else {
				var startRow = screenAnchor.row;
				var endRow = screenCursor.row;
			}
			if (startColumn < 0) startColumn = 0;
			if (startRow < 0) startRow = 0;
			if (startRow == endRow) includeEmptyLines = true;
			var docEnd;
			for (var row = startRow; row <= endRow; row++) {
				var range = Range.fromPoints(this.session.screenToDocumentPosition(row, startColumn, startOffsetX), this.session.screenToDocumentPosition(row, endColumn, endOffsetX));
				if (range.isEmpty()) {
					if (docEnd && isSamePoint(range.end, docEnd)) break;
					docEnd = range.end;
				}
				range.cursor = xBackwards ? range.start : range.end;
				rectSel.push(range);
			}
			if (yBackwards) rectSel.reverse();
			if (!includeEmptyLines) {
				var end = rectSel.length - 1;
				while (rectSel[end].isEmpty() && end > 0) end--;
				if (end > 0) {
					var start = 0;
					while (rectSel[start].isEmpty()) start++;
				}
				for (var i = end; i >= start; i--) if (rectSel[i].isEmpty()) rectSel.splice(i, 1);
			}
			return rectSel;
		};
	}).call(Selection.prototype);
	var Editor = require_editor().Editor;
	(function() {
		this.updateSelectionMarkers = function() {
			this.renderer.updateCursor();
			this.renderer.updateBackMarkers();
		};
		this.addSelectionMarker = function(orientedRange) {
			if (!orientedRange.cursor) orientedRange.cursor = orientedRange.end;
			var style = this.getSelectionStyle();
			orientedRange.marker = this.session.addMarker(orientedRange, "ace_selection", style);
			this.session.$selectionMarkers.push(orientedRange);
			this.session.selectionMarkerCount = this.session.$selectionMarkers.length;
			return orientedRange;
		};
		this.removeSelectionMarker = function(range) {
			if (!range.marker) return;
			this.session.removeMarker(range.marker);
			var index = this.session.$selectionMarkers.indexOf(range);
			if (index != -1) this.session.$selectionMarkers.splice(index, 1);
			this.session.selectionMarkerCount = this.session.$selectionMarkers.length;
		};
		this.removeSelectionMarkers = function(ranges) {
			var markerList = this.session.$selectionMarkers;
			for (var i = ranges.length; i--;) {
				var range = ranges[i];
				if (!range.marker) continue;
				this.session.removeMarker(range.marker);
				var index = markerList.indexOf(range);
				if (index != -1) markerList.splice(index, 1);
			}
			this.session.selectionMarkerCount = markerList.length;
		};
		this.$onAddRange = function(e) {
			this.addSelectionMarker(e.range);
			this.renderer.updateCursor();
			this.renderer.updateBackMarkers();
		};
		this.$onRemoveRange = function(e) {
			this.removeSelectionMarkers(e.ranges);
			this.renderer.updateCursor();
			this.renderer.updateBackMarkers();
		};
		this.$onMultiSelect = function(e) {
			if (this.inMultiSelectMode) return;
			this.inMultiSelectMode = true;
			this.setStyle("ace_multiselect");
			this.keyBinding.addKeyboardHandler(commands.keyboardHandler);
			this.commands.setDefaultHandler("exec", this.$onMultiSelectExec);
			this.renderer.updateCursor();
			this.renderer.updateBackMarkers();
		};
		this.$onSingleSelect = function(e) {
			if (this.session.multiSelect.inVirtualMode) return;
			this.inMultiSelectMode = false;
			this.unsetStyle("ace_multiselect");
			this.keyBinding.removeKeyboardHandler(commands.keyboardHandler);
			this.commands.removeDefaultHandler("exec", this.$onMultiSelectExec);
			this.renderer.updateCursor();
			this.renderer.updateBackMarkers();
			this._emit("changeSelection");
		};
		this.$onMultiSelectExec = function(e) {
			var command = e.command;
			var editor = e.editor;
			if (!editor.multiSelect) return;
			if (!command.multiSelectAction) {
				var result = command.exec(editor, e.args || {});
				editor.multiSelect.addRange(editor.multiSelect.toOrientedRange());
				editor.multiSelect.mergeOverlappingRanges();
			} else if (command.multiSelectAction == "forEach") result = editor.forEachSelection(command, e.args);
			else if (command.multiSelectAction == "forEachLine") result = editor.forEachSelection(command, e.args, true);
			else if (command.multiSelectAction == "single") {
				editor.exitMultiSelectMode();
				result = command.exec(editor, e.args || {});
			} else result = command.multiSelectAction(editor, e.args || {});
			return result;
		};
		this.forEachSelection = function(cmd, args, options) {
			if (this.inVirtualSelectionMode) return;
			var keepOrder = options && options.keepOrder;
			var $byLines = options == true || options && options.$byLines;
			var session = this.session;
			var selection = this.selection;
			var rangeList = selection.rangeList;
			var ranges = (keepOrder ? selection : rangeList).ranges;
			var result;
			if (!ranges.length) return cmd.exec ? cmd.exec(this, args || {}) : cmd(this, args || {});
			var reg = selection._eventRegistry;
			selection._eventRegistry = {};
			var tmpSel = new Selection(session);
			this.inVirtualSelectionMode = true;
			for (var i = ranges.length; i--;) {
				if ($byLines) while (i > 0 && ranges[i].start.row == ranges[i - 1].end.row) i--;
				tmpSel.fromOrientedRange(ranges[i]);
				tmpSel.index = i;
				this.selection = session.selection = tmpSel;
				var cmdResult = cmd.exec ? cmd.exec(this, args || {}) : cmd(this, args || {});
				if (!result && cmdResult !== void 0) result = cmdResult;
				tmpSel.toOrientedRange(ranges[i]);
			}
			tmpSel.detach();
			this.selection = session.selection = selection;
			this.inVirtualSelectionMode = false;
			selection._eventRegistry = reg;
			selection.mergeOverlappingRanges();
			if (selection.ranges[0]) selection.fromOrientedRange(selection.ranges[0]);
			var anim = this.renderer.$scrollAnimation;
			this.onCursorChange();
			this.onSelectionChange();
			if (anim && anim.from == anim.to) this.renderer.animateScrolling(anim.from);
			return result;
		};
		this.exitMultiSelectMode = function() {
			if (!this.inMultiSelectMode || this.inVirtualSelectionMode) return;
			this.multiSelect.toSingleRange();
		};
		this.getSelectedText = function() {
			var text = "";
			if (this.inMultiSelectMode && !this.inVirtualSelectionMode) {
				var ranges = this.multiSelect.rangeList.ranges;
				var buf = [];
				for (var i = 0; i < ranges.length; i++) buf.push(this.session.getTextRange(ranges[i]));
				var nl = this.session.getDocument().getNewLineCharacter();
				text = buf.join(nl);
				if (text.length == (buf.length - 1) * nl.length) text = "";
			} else if (!this.selection.isEmpty()) text = this.session.getTextRange(this.getSelectionRange());
			return text;
		};
		this.$checkMultiselectChange = function(e, anchor) {
			if (this.inMultiSelectMode && !this.inVirtualSelectionMode) {
				var range = this.multiSelect.ranges[0];
				if (this.multiSelect.isEmpty() && anchor == this.multiSelect.anchor) return;
				var pos = anchor == this.multiSelect.anchor ? range.cursor == range.start ? range.end : range.start : range.cursor;
				if (pos.row != anchor.row || this.session.$clipPositionToDocument(pos.row, pos.column).column != anchor.column) this.multiSelect.toSingleRange(this.multiSelect.toOrientedRange());
				else this.multiSelect.mergeOverlappingRanges();
			}
		};
		this.findAll = function(needle, options, additive) {
			options = options || {};
			options.needle = needle || options.needle;
			if (options.needle == void 0) {
				var range = this.selection.isEmpty() ? this.selection.getWordRange() : this.selection.getRange();
				options.needle = this.session.getTextRange(range);
			}
			this.$search.set(options);
			var ranges = this.$search.findAll(this.session);
			if (!ranges.length) return 0;
			var selection = this.multiSelect;
			if (!additive) selection.toSingleRange(ranges[0]);
			for (var i = ranges.length; i--;) selection.addRange(ranges[i], true);
			if (range && selection.rangeList.rangeAtPoint(range.start)) selection.addRange(range, true);
			return ranges.length;
		};
		this.selectMoreLines = function(dir, skip) {
			var range = this.selection.toOrientedRange();
			var isBackwards = range.cursor == range.end;
			var screenLead = this.session.documentToScreenPosition(range.cursor);
			if (this.selection.$desiredColumn) screenLead.column = this.selection.$desiredColumn;
			var lead = this.session.screenToDocumentPosition(screenLead.row + dir, screenLead.column);
			if (!range.isEmpty()) {
				var screenAnchor = this.session.documentToScreenPosition(isBackwards ? range.end : range.start);
				var anchor = this.session.screenToDocumentPosition(screenAnchor.row + dir, screenAnchor.column);
			} else var anchor = lead;
			if (isBackwards) {
				var newRange = Range.fromPoints(lead, anchor);
				newRange.cursor = newRange.start;
			} else {
				var newRange = Range.fromPoints(anchor, lead);
				newRange.cursor = newRange.end;
			}
			newRange.desiredColumn = screenLead.column;
			if (!this.selection.inMultiSelectMode) this.selection.addRange(range);
			else if (skip) var toRemove = range.cursor;
			this.selection.addRange(newRange);
			if (toRemove) this.selection.substractPoint(toRemove);
		};
		this.transposeSelections = function(dir) {
			var session = this.session;
			var sel = session.multiSelect;
			var all = sel.ranges;
			for (var i = all.length; i--;) {
				var range = all[i];
				if (range.isEmpty()) {
					let tmp$1 = session.getWordRange(range.start.row, range.start.column);
					range.start.row = tmp$1.start.row;
					range.start.column = tmp$1.start.column;
					range.end.row = tmp$1.end.row;
					range.end.column = tmp$1.end.column;
				}
			}
			sel.mergeOverlappingRanges();
			var words = [];
			for (var i = all.length; i--;) {
				var range = all[i];
				words.unshift(session.getTextRange(range));
			}
			if (dir < 0) words.unshift(words.pop());
			else words.push(words.shift());
			for (var i = all.length; i--;) {
				var range = all[i];
				var tmp = range.clone();
				session.replace(range, words[i]);
				range.start.row = tmp.start.row;
				range.start.column = tmp.start.column;
			}
			sel.fromOrientedRange(sel.ranges[0]);
		};
		this.selectMore = function(dir, skip, stopAtFirst) {
			var session = this.session;
			var range = session.multiSelect.toOrientedRange();
			if (range.isEmpty()) {
				range = session.getWordRange(range.start.row, range.start.column);
				range.cursor = dir == -1 ? range.start : range.end;
				this.multiSelect.addRange(range);
				if (stopAtFirst) return;
			}
			var newRange = find(session, session.getTextRange(range), dir);
			if (newRange) {
				newRange.cursor = dir == -1 ? newRange.start : newRange.end;
				this.session.unfold(newRange);
				this.multiSelect.addRange(newRange);
				this.renderer.scrollCursorIntoView(null, .5);
			}
			if (skip) this.multiSelect.substractPoint(range.cursor);
		};
		this.alignCursors = function() {
			var session = this.session;
			var sel = session.multiSelect;
			var ranges = sel.ranges;
			var row = -1;
			var sameRowRanges = ranges.filter(function(r) {
				if (r.cursor.row == row) return true;
				row = r.cursor.row;
			});
			if (!ranges.length || sameRowRanges.length == ranges.length - 1) {
				var range = this.selection.getRange();
				var fr = range.start.row, lr = range.end.row;
				var guessRange = fr == lr;
				if (guessRange) {
					var max = this.session.getLength();
					var line;
					do
						line = this.session.getLine(lr);
					while (/[=:]/.test(line) && ++lr < max);
					do
						line = this.session.getLine(fr);
					while (/[=:]/.test(line) && --fr > 0);
					if (fr < 0) fr = 0;
					if (lr >= max) lr = max - 1;
				}
				var lines = this.session.removeFullLines(fr, lr);
				lines = this.$reAlignText(lines, guessRange);
				this.session.insert({
					row: fr,
					column: 0
				}, lines.join("\n") + "\n");
				if (!guessRange) {
					range.start.column = 0;
					range.end.column = lines[lines.length - 1].length;
				}
				this.selection.setRange(range);
			} else {
				sameRowRanges.forEach(function(r) {
					sel.substractPoint(r.cursor);
				});
				var maxCol = 0;
				var minSpace = Infinity;
				var spaceOffsets = ranges.map(function(r) {
					var p = r.cursor;
					var spaceOffset = session.getLine(p.row).substr(p.column).search(/\S/g);
					if (spaceOffset == -1) spaceOffset = 0;
					if (p.column > maxCol) maxCol = p.column;
					if (spaceOffset < minSpace) minSpace = spaceOffset;
					return spaceOffset;
				});
				ranges.forEach(function(r, i) {
					var p = r.cursor;
					var l = maxCol - p.column;
					var d = spaceOffsets[i] - minSpace;
					if (l > d) session.insert(p, lang.stringRepeat(" ", l - d));
					else session.remove(new Range(p.row, p.column, p.row, p.column - l + d));
					r.start.column = r.end.column = maxCol;
					r.start.row = r.end.row = p.row;
					r.cursor = r.end;
				});
				sel.fromOrientedRange(ranges[0]);
				this.renderer.updateCursor();
				this.renderer.updateBackMarkers();
			}
		};
		this.$reAlignText = function(lines, forceLeft) {
			var isLeftAligned = true, isRightAligned = true;
			var startW, textW, endW;
			return lines.map(function(line) {
				var m = line.match(/(\s*)(.*?)(\s*)([=:].*)/);
				if (!m) return [line];
				if (startW == null) {
					startW = m[1].length;
					textW = m[2].length;
					endW = m[3].length;
					return m;
				}
				if (startW + textW + endW != m[1].length + m[2].length + m[3].length) isRightAligned = false;
				if (startW != m[1].length) isLeftAligned = false;
				if (startW > m[1].length) startW = m[1].length;
				if (textW < m[2].length) textW = m[2].length;
				if (endW > m[3].length) endW = m[3].length;
				return m;
			}).map(forceLeft ? alignLeft : isLeftAligned ? isRightAligned ? alignRight : alignLeft : unAlign);
			function spaces(n) {
				return lang.stringRepeat(" ", n);
			}
			function alignLeft(m) {
				return !m[2] ? m[0] : spaces(startW) + m[2] + spaces(textW - m[2].length + endW) + m[4].replace(/^([=:])\s+/, "$1 ");
			}
			function alignRight(m) {
				return !m[2] ? m[0] : spaces(startW + textW - m[2].length) + m[2] + spaces(endW) + m[4].replace(/^([=:])\s+/, "$1 ");
			}
			function unAlign(m) {
				return !m[2] ? m[0] : spaces(startW) + m[2] + spaces(endW) + m[4].replace(/^([=:])\s+/, "$1 ");
			}
		};
	}).call(Editor.prototype);
	function isSamePoint(p1, p2) {
		return p1.row == p2.row && p1.column == p2.column;
	}
	exports.onSessionChange = function(e) {
		var session = e.session;
		if (session && !session.multiSelect) {
			session.$selectionMarkers = [];
			session.selection.$initRangeList();
			session.multiSelect = session.selection;
		}
		this.multiSelect = session && session.multiSelect;
		var oldSession = e.oldSession;
		if (oldSession) {
			oldSession.multiSelect.off("addRange", this.$onAddRange);
			oldSession.multiSelect.off("removeRange", this.$onRemoveRange);
			oldSession.multiSelect.off("multiSelect", this.$onMultiSelect);
			oldSession.multiSelect.off("singleSelect", this.$onSingleSelect);
			oldSession.multiSelect.lead.off("change", this.$checkMultiselectChange);
			oldSession.multiSelect.anchor.off("change", this.$checkMultiselectChange);
		}
		if (session) {
			session.multiSelect.on("addRange", this.$onAddRange);
			session.multiSelect.on("removeRange", this.$onRemoveRange);
			session.multiSelect.on("multiSelect", this.$onMultiSelect);
			session.multiSelect.on("singleSelect", this.$onSingleSelect);
			session.multiSelect.lead.on("change", this.$checkMultiselectChange);
			session.multiSelect.anchor.on("change", this.$checkMultiselectChange);
		}
		if (session && this.inMultiSelectMode != session.selection.inMultiSelectMode) if (session.selection.inMultiSelectMode) this.$onMultiSelect();
		else this.$onSingleSelect();
	};
	function MultiSelect(editor) {
		if (editor.$multiselectOnSessionChange) return;
		editor.$onAddRange = editor.$onAddRange.bind(editor);
		editor.$onRemoveRange = editor.$onRemoveRange.bind(editor);
		editor.$onMultiSelect = editor.$onMultiSelect.bind(editor);
		editor.$onSingleSelect = editor.$onSingleSelect.bind(editor);
		editor.$multiselectOnSessionChange = exports.onSessionChange.bind(editor);
		editor.$checkMultiselectChange = editor.$checkMultiselectChange.bind(editor);
		editor.$multiselectOnSessionChange(editor);
		editor.on("changeSession", editor.$multiselectOnSessionChange);
		editor.on("mousedown", onMouseDown);
		editor.commands.addCommands(commands.defaultCommands);
		addAltCursorListeners(editor);
	}
	function addAltCursorListeners(editor) {
		if (!editor.textInput) return;
		var el = editor.textInput.getElement();
		var altCursor = false;
		event.addListener(el, "keydown", function(e) {
			var altDown = e.keyCode == 18 && !(e.ctrlKey || e.shiftKey || e.metaKey);
			if (editor.$blockSelectEnabled && altDown) {
				if (!altCursor) {
					editor.renderer.setMouseCursor("crosshair");
					altCursor = true;
				}
			} else if (altCursor) reset();
		}, editor);
		event.addListener(el, "keyup", reset, editor);
		event.addListener(el, "blur", reset, editor);
		function reset(e) {
			if (altCursor) {
				editor.renderer.setMouseCursor("");
				altCursor = false;
			}
		}
	}
	exports.MultiSelect = MultiSelect;
	require_config().defineOptions(Editor.prototype, "editor", {
		enableMultiselect: {
			set: function(val) {
				MultiSelect(this);
				if (val) this.on("mousedown", onMouseDown);
				else this.off("mousedown", onMouseDown);
			},
			value: true
		},
		enableBlockSelect: {
			set: function(val) {
				this.$blockSelectEnabled = val;
			},
			value: true
		}
	});
}));
export { require_multi_select_commands as n, require_multi_select as t };
