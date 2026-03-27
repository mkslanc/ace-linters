import { t as __commonJSMin } from "./chunk-BLiWRsM1.js";
import { t as require_dom } from "./dom-BmR1mTSl.js";
import { t as require_range } from "./range-D2fBS63W.js";
import { t as require_oop } from "./oop-D6rqnWBm.js";
import { t as require_config } from "./config-D-BhsSyn.js";
import { t as require_event_emitter } from "./event_emitter-DQJDHkGW.js";
import { t as require_textmate } from "./textmate-7M3qxGeS.js";
import { t as require_editor } from "./editor-IG7gAR87.js";
import { r as require_undomanager, t as require_edit_session } from "./edit_session-BlcJnX8K.js";
import { t as require_hash_handler } from "./hash_handler-qEoapM91.js";
import { t as require_virtual_renderer } from "./virtual_renderer-CFYU0u0C.js";
import { t as require_worker_client } from "./worker_client-Do40RNma.js";
import { t as require_multi_select } from "./multi_select-NPpC6jeg.js";
import { t as require_fold_mode } from "./fold_mode-DLWDk-fx.js";
import { t as require_error_marker } from "./error_marker-CM8od4Mk.js";
//#region node_modules/ace-code/src/placeholder.js
var require_placeholder = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* @typedef {import("./edit_session").EditSession} EditSession
	*/
	var Range = require_range().Range;
	var EventEmitter = require_event_emitter().EventEmitter;
	var oop = require_oop();
	var PlaceHolder = class {
		/**
		* @param {EditSession} session
		* @param {Number} length
		* @param {import("../ace-internal").Ace.Point} pos
		* @param {any[]} others
		* @param {String} mainClass
		* @param {String} othersClass
		**/
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
		/**
		* PlaceHolder.setup()
		*
		* TODO
		*
		**/
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
			pos.markerId = session.addMarker(new Range(pos.row, pos.column, pos.row, pos.column + this.length), this.mainClass, null, false);
			this.others = [];
			this.$others.forEach(function(other) {
				var anchor = doc.createAnchor(other.row, other.column);
				anchor.$insertRight = true;
				anchor.detach();
				_self.others.push(anchor);
			});
			session.setUndoSelect(false);
		}
		/**
		* PlaceHolder.showOtherMarkers()
		*
		* TODO
		*
		**/
		showOtherMarkers() {
			if (this.othersActive) return;
			var session = this.session;
			var _self = this;
			this.othersActive = true;
			this.others.forEach(function(anchor) {
				anchor.markerId = session.addMarker(new Range(anchor.row, anchor.column, anchor.row, anchor.column + _self.length), _self.othersClass, null, false);
			});
		}
		/**
		* PlaceHolder.hideOtherMarkers()
		*
		* Hides all over markers in the [[EditSession `EditSession`]] that are not the currently selected one.
		*
		**/
		hideOtherMarkers() {
			if (!this.othersActive) return;
			this.othersActive = false;
			for (var i = 0; i < this.others.length; i++) this.session.removeMarker(this.others[i].markerId);
		}
		/**
		* PlaceHolder@onUpdate(e)
		*
		* Emitted when the place holder updates.
		* @param {import("../ace-internal").Ace.Delta} delta
		* @internal
		*/
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
					this.doc.remove(new Range(newPos.row, newPos.column, newPos.row, newPos.column - lengthDiff));
				}
			}
			this.$updating = false;
			this.updateMarkers();
		}
		/**
		* @param {import("../ace-internal").Ace.Delta} delta
		*/
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
				pos.markerId = session.addMarker(new Range(pos.row, pos.column, pos.row, pos.column + _self.length), className, null, false);
			};
			updateMarker(this.pos, this.mainClass);
			for (var i = this.others.length; i--;) updateMarker(this.others[i], this.othersClass);
		}
		/**
		* PlaceHolder@onCursorChange(e)
		*
		* Emitted when the cursor changes.
		* @param {any} [event]
		* @internal
		*/
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
		/**
		* PlaceHolder.detach()
		*
		* TODO
		*
		**/
		detach() {
			this.session.removeMarker(this.pos && this.pos.markerId);
			this.hideOtherMarkers();
			this.doc.off("change", this.$onUpdate);
			this.session.selection.off("changeCursor", this.$onCursorChange);
			this.session.setUndoSelect(true);
			this.session = null;
		}
		/**
		* PlaceHolder.cancel()
		*
		* TODO
		*
		**/
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
//#endregion
//#region node_modules/ace-code/src/ace.js
/**
* The main class required to set up an Ace instance in the browser.
*
* @namespace Ace
**/
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
	/**
	* Embeds the Ace editor into the DOM, at the element provided by `el`.
	* @param {String | HTMLElement & {env?: any, value?: any} | null} [el] Either the id of an element, or the element itself
	* @param {Partial<import("../ace-internal").Ace.EditorOptions> } [options] Options for the editor
	* @returns {Editor}
	**/
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
	/**
	* Creates a new [[EditSession]], and returns the associated [[Document]].
	* @param {import('./document').Document | String} text {:textParam}
	* @param {import("../ace-internal").Ace.SyntaxMode} [mode] {:modeParam}
	* @returns {EditSession}
	**/
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
//#endregion
export { require_ace as t };
