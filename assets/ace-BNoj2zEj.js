import { t as __commonJSMin } from "./chunk-iA-Slpst.js";
import { t as require_dom } from "./dom-BBjJ92-n.js";
import { t as require_range } from "./range-BUVqNbwc.js";
import { t as require_oop } from "./oop-DcdK5Mrs.js";
import { t as require_config } from "./config-DPm1ug3B.js";
import { t as require_event_emitter } from "./event_emitter-BGfSYA24.js";
import { t as require_textmate } from "./textmate-zFNmb5zU.js";
import { t as require_editor } from "./editor-BiOsjB7l.js";
import { r as require_undomanager, t as require_edit_session } from "./edit_session-CDHRvoey.js";
import { t as require_hash_handler } from "./hash_handler-G_6vQiwI.js";
import { t as require_virtual_renderer } from "./virtual_renderer-xL5PfPPr.js";
import { t as require_worker_client } from "./worker_client-CdpIySAD.js";
import { t as require_multi_select } from "./multi_select-B30HHNMb.js";
import { t as require_fold_mode } from "./fold_mode-D1xG2KFM.js";
import { t as require_error_marker } from "./error_marker-BBMov5iD.js";
var require_placeholder = /* @__PURE__ */ __commonJSMin(((exports) => {
	var Range$1 = require_range().Range;
	var EventEmitter = require_event_emitter().EventEmitter;
	var oop = require_oop();
	var PlaceHolder = class {
		constructor(session, length, pos, others, mainClass, othersClass) {
			var _self = this;
			this.length = length;
			this.session = session;
			this.doc = session.getDocument();
			this.mainClass = mainClass;
			this.othersClass = othersClass;
			this.$onUpdate = this.onUpdate.bind(this);
			this.doc.on("change", this.$onUpdate, true);
			this.$others = others;
			this.$onCursorChange = function() {
				setTimeout(function() {
					_self.onCursorChange();
				});
			};
			this.$pos = pos;
			this.$undoStackDepth = (session.getUndoManager().$undoStack || session.getUndoManager()["$undostack"] || { length: -1 }).length;
			this.setup();
			session.selection.on("changeCursor", this.$onCursorChange);
		}
		setup() {
			var _self = this;
			var doc = this.doc;
			var session = this.session;
			this.selectionBefore = session.selection.toJSON();
			if (session.selection.inMultiSelectMode) session.selection.toSingleRange();
			this.pos = doc.createAnchor(this.$pos.row, this.$pos.column);
			var pos = this.pos;
			pos.$insertRight = true;
			pos.detach();
			pos.markerId = session.addMarker(new Range$1(pos.row, pos.column, pos.row, pos.column + this.length), this.mainClass, null, false);
			this.others = [];
			this.$others.forEach(function(other) {
				var anchor = doc.createAnchor(other.row, other.column);
				anchor.$insertRight = true;
				anchor.detach();
				_self.others.push(anchor);
			});
			session.setUndoSelect(false);
		}
		showOtherMarkers() {
			if (this.othersActive) return;
			var session = this.session;
			var _self = this;
			this.othersActive = true;
			this.others.forEach(function(anchor) {
				anchor.markerId = session.addMarker(new Range$1(anchor.row, anchor.column, anchor.row, anchor.column + _self.length), _self.othersClass, null, false);
			});
		}
		hideOtherMarkers() {
			if (!this.othersActive) return;
			this.othersActive = false;
			for (var i = 0; i < this.others.length; i++) this.session.removeMarker(this.others[i].markerId);
		}
		onUpdate(delta) {
			if (this.$updating) return this.updateAnchors(delta);
			var range = delta;
			if (range.start.row !== range.end.row) return;
			if (range.start.row !== this.pos.row) return;
			this.$updating = true;
			var lengthDiff = delta.action === "insert" ? range.end.column - range.start.column : range.start.column - range.end.column;
			var inMainRange = range.start.column >= this.pos.column && range.start.column <= this.pos.column + this.length + 1;
			var distanceFromStart = range.start.column - this.pos.column;
			this.updateAnchors(delta);
			if (inMainRange) this.length += lengthDiff;
			if (inMainRange && !this.session.$fromUndo) {
				if (delta.action === "insert") for (var i = this.others.length - 1; i >= 0; i--) {
					var otherPos = this.others[i];
					var newPos = {
						row: otherPos.row,
						column: otherPos.column + distanceFromStart
					};
					this.doc.insertMergedLines(newPos, delta.lines);
				}
				else if (delta.action === "remove") for (var i = this.others.length - 1; i >= 0; i--) {
					var otherPos = this.others[i];
					var newPos = {
						row: otherPos.row,
						column: otherPos.column + distanceFromStart
					};
					this.doc.remove(new Range$1(newPos.row, newPos.column, newPos.row, newPos.column - lengthDiff));
				}
			}
			this.$updating = false;
			this.updateMarkers();
		}
		updateAnchors(delta) {
			this.pos.onChange(delta);
			for (var i = this.others.length; i--;) this.others[i].onChange(delta);
			this.updateMarkers();
		}
		updateMarkers() {
			if (this.$updating) return;
			var _self = this;
			var session = this.session;
			var updateMarker = function(pos, className) {
				session.removeMarker(pos.markerId);
				pos.markerId = session.addMarker(new Range$1(pos.row, pos.column, pos.row, pos.column + _self.length), className, null, false);
			};
			updateMarker(this.pos, this.mainClass);
			for (var i = this.others.length; i--;) updateMarker(this.others[i], this.othersClass);
		}
		onCursorChange(event) {
			if (this.$updating || !this.session) return;
			var pos = this.session.selection.getCursor();
			if (pos.row === this.pos.row && pos.column >= this.pos.column && pos.column <= this.pos.column + this.length) {
				this.showOtherMarkers();
				this._emit("cursorEnter", event);
			} else {
				this.hideOtherMarkers();
				this._emit("cursorLeave", event);
			}
		}
		detach() {
			this.session.removeMarker(this.pos && this.pos.markerId);
			this.hideOtherMarkers();
			this.doc.off("change", this.$onUpdate);
			this.session.selection.off("changeCursor", this.$onCursorChange);
			this.session.setUndoSelect(true);
			this.session = null;
		}
		cancel() {
			if (this.$undoStackDepth === -1) return;
			var undoManager = this.session.getUndoManager();
			var undosRequired = (undoManager.$undoStack || undoManager["$undostack"]).length - this.$undoStackDepth;
			for (var i = 0; i < undosRequired; i++) undoManager.undo(this.session, true);
			if (this.selectionBefore) this.session.selection.fromJSON(this.selectionBefore);
		}
	};
	oop.implement(PlaceHolder.prototype, EventEmitter);
	exports.PlaceHolder = PlaceHolder;
}));
var require_ace = /* @__PURE__ */ __commonJSMin(((exports) => {
	var dom = require_dom();
	var Range = require_range().Range;
	var Editor = require_editor().Editor;
	var EditSession = require_edit_session().EditSession;
	var UndoManager = require_undomanager().UndoManager;
	var Renderer = require_virtual_renderer().VirtualRenderer;
	require_worker_client();
	require_hash_handler();
	require_placeholder();
	require_multi_select();
	require_fold_mode();
	require_textmate();
	require_error_marker();
	exports.config = require_config();
	exports.edit = function(el, options) {
		if (typeof el == "string") {
			var _id = el;
			el = document.getElementById(_id);
			if (!el) throw new Error("ace.edit can't find div #" + _id);
		}
		if (el && el.env && el.env.editor instanceof Editor) return el.env.editor;
		var value = "";
		if (el && /input|textarea/i.test(el.tagName)) {
			var oldNode = el;
			value = oldNode.value;
			el = dom.createElement("pre");
			oldNode.parentNode.replaceChild(el, oldNode);
		} else if (el) {
			value = el.textContent;
			el.innerHTML = "";
		}
		var doc = exports.createEditSession(value);
		var editor = new Editor(new Renderer(el), doc, options);
		var env = {
			document: doc,
			editor,
			onResize: editor.resize.bind(editor, null)
		};
		if (oldNode) env.textarea = oldNode;
		editor.on("destroy", function() {
			env.editor.container.env = null;
		});
		editor.container.env = editor.env = env;
		return editor;
	};
	exports.createEditSession = function(text, mode) {
		var doc = new EditSession(text, mode);
		doc.setUndoManager(new UndoManager());
		return doc;
	};
	exports.Range = Range;
	exports.Editor = Editor;
	exports.EditSession = EditSession;
	exports.UndoManager = UndoManager;
	exports.VirtualRenderer = Renderer;
	exports.version = exports.config.version;
}));
export { require_ace as t };
