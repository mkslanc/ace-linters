import { t as __commonJSMin } from "./chunk-iA-Slpst.js";
import "./useragent-BODERP_7.js";
import { t as require_dom } from "./dom-BBjJ92-n.js";
import { t as require_range } from "./range-BUVqNbwc.js";
import { t as require_oop } from "./oop-DcdK5Mrs.js";
import "./lang-DcNOSqFo.js";
import "./keys-B8CLTATX.js";
import "./event-BcX-N72I.js";
import { t as require_config } from "./config-DPm1ug3B.js";
import "./event_emitter-BGfSYA24.js";
import { t as require_textmate } from "./textmate-zFNmb5zU.js";
import { t as require_editor } from "./editor-BiOsjB7l.js";
import { a as require_line_widgets, r as require_undomanager, t as require_edit_session } from "./edit_session-CDHRvoey.js";
import "./tooltip-DAauyLxM.js";
import "./tokenizer-C2b-GJMk.js";
import "./text-B9A1mx6l.js";
import "./token_iterator-CbfYmntj.js";
import "./hash_handler-G_6vQiwI.js";
import "./text-DOzSnOss.js";
import { n as require_decorators, t as require_virtual_renderer } from "./virtual_renderer-xL5PfPPr.js";
import { t as require_multi_select } from "./multi_select-B30HHNMb.js";
var require_scroll_diff_decorator = /* @__PURE__ */ __commonJSMin(((exports) => {
	var Decorator$1 = require_decorators().Decorator;
	var ScrollDiffDecorator$1 = class extends Decorator$1 {
		constructor(scrollbarV, renderer, forInlineDiff) {
			super(scrollbarV, renderer);
			this.colors.dark["delete"] = "rgba(255, 18, 18, 1)";
			this.colors.dark["insert"] = "rgba(18, 136, 18, 1)";
			this.colors.light["delete"] = "rgb(255,51,51)";
			this.colors.light["insert"] = "rgb(32,133,72)";
			this.$zones = [];
			this.$forInlineDiff = forInlineDiff;
		}
		addZone(startRow, endRow, type) {
			this.$zones.push({
				startRow,
				endRow,
				type
			});
		}
		setSessions(sessionA, sessionB) {
			this.sessionA = sessionA;
			this.sessionB = sessionB;
		}
		$updateDecorators(config$3) {
			if (typeof this.canvas.getContext !== "function") return;
			super.$updateDecorators(config$3);
			if (this.$zones.length > 0) {
				var colors = this.renderer.theme.isDark === true ? this.colors.dark : this.colors.light;
				var ctx = this.canvas.getContext("2d");
				this.$setDiffDecorators(ctx, colors);
			}
		}
		$transformPosition(row, type) {
			if (type == "delete") return this.sessionA.documentToScreenRow(row, 0);
			else return this.sessionB.documentToScreenRow(row, 0);
		}
		$setDiffDecorators(ctx, colors) {
			function compare(a, b) {
				if (a.from === b.from) return a.to - b.to;
				return a.from - b.from;
			}
			var zones = this.$zones;
			if (zones) {
				var resolvedZones = [];
				[zones.filter((z) => z.type === "delete"), zones.filter((z) => z.type === "insert")].forEach((typeZones) => {
					typeZones.forEach((zone, i) => {
						const offset1 = this.$transformPosition(zone.startRow, zone.type) * this.lineHeight;
						let offset2 = this.$transformPosition(zone.endRow, zone.type) * this.lineHeight + this.lineHeight;
						const y1 = Math.round(this.heightRatio * offset1);
						const y2 = Math.round(this.heightRatio * offset2);
						const padding = 1;
						let ycenter = Math.round((y1 + y2) / 2);
						let halfHeight = y2 - ycenter;
						if (halfHeight < this.halfMinDecorationHeight) halfHeight = this.halfMinDecorationHeight;
						const previousZone = resolvedZones[resolvedZones.length - 1];
						if (i > 0 && previousZone && previousZone.type === zone.type && ycenter - halfHeight < previousZone.to + padding) ycenter = resolvedZones[resolvedZones.length - 1].to + padding + halfHeight;
						if (ycenter - halfHeight < 0) ycenter = halfHeight;
						if (ycenter + halfHeight > this.canvasHeight) ycenter = this.canvasHeight - halfHeight;
						resolvedZones.push({
							type: zone.type,
							from: ycenter - halfHeight,
							to: ycenter + halfHeight,
							color: colors[zone.type] || null
						});
					});
				});
				resolvedZones = resolvedZones.sort(compare);
				for (const zone of resolvedZones) {
					ctx.fillStyle = zone.color || null;
					const zoneFrom = zone.from;
					const zoneHeight = zone.to - zoneFrom;
					if (this.$forInlineDiff) ctx.fillRect(this.oneZoneWidth, zoneFrom, 2 * this.oneZoneWidth, zoneHeight);
					else if (zone.type == "delete") ctx.fillRect(this.oneZoneWidth, zoneFrom, this.oneZoneWidth, zoneHeight);
					else ctx.fillRect(2 * this.oneZoneWidth, zoneFrom, this.oneZoneWidth, zoneHeight);
				}
			}
		}
		setZoneWidth() {
			this.oneZoneWidth = Math.round(this.canvasWidth / 3);
		}
	};
	exports.ScrollDiffDecorator = ScrollDiffDecorator$1;
}));
var require_styles_css = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.cssText = `
/*
 * Line Markers
 */
.ace_diff {
    position: absolute;
    z-index: 0;
}
.ace_diff.inline {
    z-index: 20;
}
/*
 * Light Colors 
 */
.ace_diff.insert {
    background-color: #EFFFF1;
}
.ace_diff.delete {
    background-color: #FFF1F1;
}
.ace_diff.aligned_diff {
    background: rgba(206, 194, 191, 0.26);
    background: repeating-linear-gradient(
                45deg,
              rgba(122, 111, 108, 0.26),
              rgba(122, 111, 108, 0.26) 5px,
              rgba(0, 0, 0, 0) 5px,
              rgba(0, 0, 0, 0) 10px 
    );
}

.ace_diff.insert.inline {
    background-color:  rgb(74 251 74 / 18%); 
}
.ace_diff.delete.inline {
    background-color: rgb(251 74 74 / 15%);
}

.ace_diff.delete.inline.empty {
    background-color: rgba(255, 128, 79, 0.7);
    width: 2px !important;
}

.ace_diff.insert.inline.empty {
    background-color: rgba(49, 230, 96, 0.7);
    width: 2px !important;
}

.ace_diff-active-line {
    border-bottom: 1px solid;
    border-top: 1px solid;
    background: transparent;
    position: absolute;
    box-sizing: border-box;
    border-color: #9191ac;
}

.ace_dark .ace_diff-active-line {
    background: transparent;
    border-color: #75777a;
}
 

/* gutter changes */
.ace_mini-diff_gutter-enabled > .ace_gutter-cell,
.ace_mini-diff_gutter-enabled > .ace_gutter-cell_svg-icons {
    padding-right: 13px;
}

.ace_mini-diff_gutter_other > .ace_gutter-cell,
.ace_mini-diff_gutter_other > .ace_gutter-cell_svg-icons  {
    display: none;
}

.ace_mini-diff_gutter_other {
    pointer-events: none;
}


.ace_mini-diff_gutter-enabled > .mini-diff-added {
    background-color: #EFFFF1;
    border-left: 3px solid #2BB534;
    padding-left: 16px;
    display: block;
}

.ace_mini-diff_gutter-enabled > .mini-diff-deleted {
    background-color: #FFF1F1;
    border-left: 3px solid #EA7158;
    padding-left: 16px;
    display: block;
}


.ace_mini-diff_gutter-enabled > .mini-diff-added:after {
    position: absolute;
    right: 2px;
    content: "+";
    background-color: inherit;
}

.ace_mini-diff_gutter-enabled > .mini-diff-deleted:after {
    position: absolute;
    right: 2px;
    content: "-";
    background-color: inherit;
}
.ace_fade-fold-widgets:hover > .ace_folding-enabled > .mini-diff-added:after,
.ace_fade-fold-widgets:hover > .ace_folding-enabled > .mini-diff-deleted:after {
    display: none;
}

.ace_diff_other .ace_selection {
    filter: drop-shadow(1px 2px 3px darkgray);
}

.ace_hidden_marker-layer .ace_bracket,
.ace_hidden_marker-layer .ace_error_bracket {
    display: none;
}



/*
 * Dark Colors 
 */

.ace_dark .ace_diff.insert {
    background-color: #212E25;
}
.ace_dark .ace_diff.delete {
    background-color: #3F2222;
}

.ace_dark .ace_mini-diff_gutter-enabled > .mini-diff-added {
    background-color: #212E25;
    border-left-color:#00802F;
}

.ace_dark .ace_mini-diff_gutter-enabled > .mini-diff-deleted {
    background-color: #3F2222;
    border-left-color: #9C3838;
}

`;
}));
var require_gutter_decorator = /* @__PURE__ */ __commonJSMin(((exports) => {
	var dom$1 = require_dom();
	var MinimalGutterDiffDecorator$1 = class {
		constructor(editor, type) {
			this.gutterClass = "ace_mini-diff_gutter-enabled";
			this.gutterCellsClasses = {
				add: "mini-diff-added",
				delete: "mini-diff-deleted"
			};
			this.editor = editor;
			this.type = type;
			this.chunks = [];
			this.attachToEditor();
		}
		attachToEditor() {
			this.renderGutters = this.renderGutters.bind(this);
			dom$1.addCssClass(this.editor.renderer.$gutterLayer.element, this.gutterClass);
			this.editor.renderer.$gutterLayer.on("afterRender", this.renderGutters);
		}
		renderGutters(e, gutterLayer) {
			const cells = this.editor.renderer.$gutterLayer.$lines.cells;
			cells.forEach((cell) => {
				cell.element.classList.remove(Object.values(this.gutterCellsClasses));
			});
			const dir = this.type === -1 ? "old" : "new";
			const diffClass = this.type === -1 ? this.gutterCellsClasses.delete : this.gutterCellsClasses.add;
			this.chunks.forEach((lineChange) => {
				let startRow = lineChange[dir].start.row;
				let endRow = lineChange[dir].end.row - 1;
				cells.forEach((cell) => {
					if (cell.row >= startRow && cell.row <= endRow) cell.element.classList.add(diffClass);
				});
			});
		}
		setDecorations(changes) {
			this.chunks = changes;
			this.renderGutters();
		}
		dispose() {
			dom$1.removeCssClass(this.editor.renderer.$gutterLayer.element, this.gutterClass);
			this.editor.renderer.$gutterLayer.off("afterRender", this.renderGutters);
		}
	};
	exports.MinimalGutterDiffDecorator = MinimalGutterDiffDecorator$1;
}));
var require_base_diff_view = /* @__PURE__ */ __commonJSMin(((exports) => {
	require_oop();
	var Range$1 = require_range().Range;
	var dom = require_dom();
	var config$2 = require_config();
	var LineWidgets = require_line_widgets().LineWidgets;
	var ScrollDiffDecorator = require_scroll_diff_decorator().ScrollDiffDecorator;
	var css = require_styles_css().cssText;
	var Editor = require_editor().Editor;
	var Renderer$1 = require_virtual_renderer().VirtualRenderer;
	var UndoManager = require_undomanager().UndoManager;
	var Decorator = require_decorators().Decorator;
	require_textmate();
	require_multi_select();
	var EditSession = require_edit_session().EditSession;
	var MinimalGutterDiffDecorator = require_gutter_decorator().MinimalGutterDiffDecorator;
	var dummyDiffProvider = { compute: function(val1, val2, options) {
		return [];
	} };
	dom.importCssString(css, "diffview.css", false);
	var BaseDiffView$2 = class {
		constructor(inlineDiffEditor, container) {
			this.onChangeTheme = this.onChangeTheme.bind(this);
			this.onInput = this.onInput.bind(this);
			this.onChangeFold = this.onChangeFold.bind(this);
			this.realign = this.realign.bind(this);
			this.onSelect = this.onSelect.bind(this);
			this.onChangeWrapLimit = this.onChangeWrapLimit.bind(this);
			this.realignPending = false;
			this.diffSession;
			this.chunks;
			this.inlineDiffEditor = inlineDiffEditor || false;
			this.currentDiffIndex = 0;
			this.diffProvider = dummyDiffProvider;
			if (container) this.container = container;
			this.$ignoreTrimWhitespace = false;
			this.$maxDiffs = 5e3;
			this.$maxComputationTimeMs = 150;
			this.$syncSelections = false;
			this.$foldUnchangedOnInput = false;
			this.markerB = new DiffHighlight(this, 1);
			this.markerA = new DiffHighlight(this, -1);
		}
		$setupModels(diffModel) {
			if (diffModel.diffProvider) this.setProvider(diffModel.diffProvider);
			this.showSideA = diffModel.inline == void 0 ? true : diffModel.inline === "a";
			var diffEditorOptions = {
				scrollPastEnd: .5,
				highlightActiveLine: false,
				highlightGutterLine: false,
				animatedScroll: true,
				customScrollbar: true,
				vScrollBarAlwaysVisible: true,
				fadeFoldWidgets: true,
				showFoldWidgets: true,
				selectionStyle: "text"
			};
			this.savedOptionsA = diffModel.editorA && diffModel.editorA.getOptions(diffEditorOptions);
			this.savedOptionsB = diffModel.editorB && diffModel.editorB.getOptions(diffEditorOptions);
			if (!this.inlineDiffEditor || diffModel.inline === "a") {
				this.editorA = diffModel.editorA || this.$setupModel(diffModel.sessionA, diffModel.valueA);
				this.container && this.container.appendChild(this.editorA.container);
				this.editorA.setOptions(diffEditorOptions);
			}
			if (!this.inlineDiffEditor || diffModel.inline === "b") {
				this.editorB = diffModel.editorB || this.$setupModel(diffModel.sessionB, diffModel.valueB);
				this.container && this.container.appendChild(this.editorB.container);
				this.editorB.setOptions(diffEditorOptions);
			}
			if (this.inlineDiffEditor) {
				this.activeEditor = this.showSideA ? this.editorA : this.editorB;
				this.otherSession = this.showSideA ? this.sessionB : this.sessionA;
				var cloneOptions = this.activeEditor.getOptions();
				cloneOptions.readOnly = true;
				delete cloneOptions.mode;
				this.otherEditor = new Editor(new Renderer$1(null), void 0, cloneOptions);
				if (this.showSideA) this.editorB = this.otherEditor;
				else this.editorA = this.otherEditor;
			}
			this.setDiffSession({
				sessionA: diffModel.sessionA || (diffModel.editorA ? diffModel.editorA.session : new EditSession(diffModel.valueA || "")),
				sessionB: diffModel.sessionB || (diffModel.editorB ? diffModel.editorB.session : new EditSession(diffModel.valueB || "")),
				chunks: []
			});
			if (this.otherEditor && this.activeEditor) this.otherSession.setOption("wrap", this.activeEditor.getOption("wrap"));
			this.setupScrollbars();
		}
		addGutterDecorators() {
			if (!this.gutterDecoratorA) this.gutterDecoratorA = new MinimalGutterDiffDecorator(this.editorA, -1);
			if (!this.gutterDecoratorB) this.gutterDecoratorB = new MinimalGutterDiffDecorator(this.editorB, 1);
		}
		$setupModel(session, value) {
			var editor = new Editor(new Renderer$1(), session);
			editor.session.setUndoManager(new UndoManager());
			if (value != void 0) editor.setValue(value, -1);
			return editor;
		}
		foldUnchanged() {
			var chunks = this.chunks;
			var placeholder = "-".repeat(120);
			var prev = {
				old: new Range$1(0, 0, 0, 0),
				new: new Range$1(0, 0, 0, 0)
			};
			var foldsChanged = false;
			for (var i = 0; i < chunks.length + 1; i++) {
				let current = chunks[i] || {
					old: new Range$1(this.sessionA.getLength(), 0, this.sessionA.getLength(), 0),
					new: new Range$1(this.sessionB.getLength(), 0, this.sessionB.getLength(), 0)
				};
				var l = current.new.start.row - prev.new.end.row - 5;
				if (l > 2) {
					var s = prev.old.end.row + 2;
					var fold1 = this.sessionA.addFold(placeholder, new Range$1(s, 0, s + l, Number.MAX_VALUE));
					s = prev.new.end.row + 2;
					var fold2 = this.sessionB.addFold(placeholder, new Range$1(s, 0, s + l, Number.MAX_VALUE));
					if (fold1 || fold2) foldsChanged = true;
					if (fold2 && fold1) {
						fold1["other"] = fold2;
						fold2["other"] = fold1;
					}
				}
				prev = current;
			}
			return foldsChanged;
		}
		unfoldUnchanged() {
			var folds = this.sessionA.getAllFolds();
			for (var i = folds.length - 1; i >= 0; i--) {
				var fold = folds[i];
				if (fold.placeholder.length == 120) this.sessionA.removeFold(fold);
			}
		}
		toggleFoldUnchanged() {
			if (!this.foldUnchanged()) this.unfoldUnchanged();
		}
		setDiffSession(session) {
			if (this.diffSession) {
				this.$detachSessionsEventHandlers();
				this.clearSelectionMarkers();
			}
			this.diffSession = session;
			this.sessionA = this.sessionB = null;
			if (this.diffSession) {
				this.chunks = this.diffSession.chunks || [];
				this.editorA && this.editorA.setSession(session.sessionA);
				this.editorB && this.editorB.setSession(session.sessionB);
				this.sessionA = this.diffSession.sessionA;
				this.sessionB = this.diffSession.sessionB;
				this.$attachSessionsEventHandlers();
				this.initSelectionMarkers();
			}
			this.otherSession = this.showSideA ? this.sessionB : this.sessionA;
		}
		$attachSessionsEventHandlers() {}
		$detachSessionsEventHandlers() {}
		getDiffSession() {
			return this.diffSession;
		}
		setTheme(theme) {
			this.editorA && this.editorA.setTheme(theme);
			this.editorB && this.editorB.setTheme(theme);
		}
		getTheme() {
			return (this.editorA || this.editorB).getTheme();
		}
		onChangeTheme(e) {
			var theme = e && e.theme || this.getTheme();
			if (this.editorA && this.editorA.getTheme() !== theme) this.editorA.setTheme(theme);
			if (this.editorB && this.editorB.getTheme() !== theme) this.editorB.setTheme(theme);
		}
		resize(force) {
			this.editorA && this.editorA.resize(force);
			this.editorB && this.editorB.resize(force);
		}
		scheduleOnInput() {
			if (this.$onInputTimer) return;
			this.$onInputTimer = setTimeout(() => {
				this.$onInputTimer = null;
				this.onInput();
			});
		}
		onInput() {
			if (this.$onInputTimer) clearTimeout(this.$onInputTimer);
			var val1 = this.sessionA.doc.getAllLines();
			var val2 = this.sessionB.doc.getAllLines();
			this.selectionRangeA = null;
			this.selectionRangeB = null;
			var chunks = this.$diffLines(val1, val2);
			this.diffSession.chunks = this.chunks = chunks;
			this.gutterDecoratorA && this.gutterDecoratorA.setDecorations(chunks);
			this.gutterDecoratorB && this.gutterDecoratorB.setDecorations(chunks);
			if (this.chunks && this.chunks.length > this.$maxDiffs) return;
			this.align();
			this.editorA && this.editorA.renderer.updateBackMarkers();
			this.editorB && this.editorB.renderer.updateBackMarkers();
			setTimeout(() => {
				this.updateScrollBarDecorators();
			}, 0);
			if (this.$foldUnchangedOnInput) this.foldUnchanged();
		}
		setupScrollbars() {
			const setupScrollBar = (renderer) => {
				setTimeout(() => {
					this.$setScrollBarDecorators(renderer);
					this.updateScrollBarDecorators();
				}, 0);
			};
			if (this.inlineDiffEditor) setupScrollBar(this.activeEditor.renderer);
			else {
				setupScrollBar(this.editorA.renderer);
				setupScrollBar(this.editorB.renderer);
			}
		}
		$setScrollBarDecorators(renderer) {
			if (renderer.$scrollDecorator) renderer.$scrollDecorator.destroy();
			renderer.$scrollDecorator = new ScrollDiffDecorator(renderer.scrollBarV, renderer, this.inlineDiffEditor);
			renderer.$scrollDecorator.setSessions(this.sessionA, this.sessionB);
			renderer.scrollBarV.setVisible(true);
			renderer.scrollBarV.element.style.bottom = renderer.scrollBarH.getHeight() + "px";
		}
		$resetDecorators(renderer) {
			if (renderer.$scrollDecorator) renderer.$scrollDecorator.destroy();
			renderer.$scrollDecorator = new Decorator(renderer.scrollBarV, renderer);
		}
		updateScrollBarDecorators() {
			if (this.inlineDiffEditor) {
				if (!this.activeEditor) return;
				this.activeEditor.renderer.$scrollDecorator.$zones = [];
			} else {
				if (!this.editorA || !this.editorB) return;
				this.editorA.renderer.$scrollDecorator.$zones = [];
				this.editorB.renderer.$scrollDecorator.$zones = [];
			}
			const updateDecorators = (editor, change) => {
				if (!editor) return;
				if (typeof editor.renderer.$scrollDecorator.addZone !== "function") return;
				if (change.old.start.row != change.old.end.row) editor.renderer.$scrollDecorator.addZone(change.old.start.row, change.old.end.row - 1, "delete");
				if (change.new.start.row != change.new.end.row) editor.renderer.$scrollDecorator.addZone(change.new.start.row, change.new.end.row - 1, "insert");
			};
			if (this.inlineDiffEditor) {
				this.chunks && this.chunks.forEach((lineChange) => {
					updateDecorators(this.activeEditor, lineChange);
				});
				this.activeEditor.renderer.$scrollDecorator.$updateDecorators(this.activeEditor.renderer.layerConfig);
			} else {
				this.chunks && this.chunks.forEach((lineChange) => {
					updateDecorators(this.editorA, lineChange);
					updateDecorators(this.editorB, lineChange);
				});
				this.editorA.renderer.$scrollDecorator.$updateDecorators(this.editorA.renderer.layerConfig);
				this.editorB.renderer.$scrollDecorator.$updateDecorators(this.editorB.renderer.layerConfig);
			}
		}
		$diffLines(val1, val2) {
			return this.diffProvider.compute(val1, val2, {
				ignoreTrimWhitespace: this.$ignoreTrimWhitespace,
				maxComputationTimeMs: this.$maxComputationTimeMs
			});
		}
		setProvider(provider) {
			this.diffProvider = provider;
		}
		$addWidget(session, w) {
			let lineWidget = session.lineWidgets[w.row];
			if (lineWidget) {
				w.rowsAbove += lineWidget.rowsAbove > w.rowsAbove ? lineWidget.rowsAbove : w.rowsAbove;
				w.rowCount += lineWidget.rowCount;
			}
			session.lineWidgets[w.row] = w;
			session.widgetManager.lineWidgets[w.row] = w;
			session.$resetRowCache(w.row);
			var fold = session.getFoldAt(w.row, 0);
			if (fold) session.widgetManager.updateOnFold({
				data: fold,
				action: "add"
			}, session);
		}
		$initWidgets(editor) {
			var session = editor.session;
			if (!session.widgetManager) {
				session.widgetManager = new LineWidgets(session);
				session.widgetManager.attach(editor);
			}
			editor.session.lineWidgets = [];
			editor.session.widgetManager.lineWidgets = [];
			editor.session.$resetRowCache(0);
		}
		$screenRow(pos, session) {
			var row = session.documentToScreenPosition(pos).row;
			var afterEnd = pos.row - session.getLength() + 1;
			if (afterEnd > 0) row += afterEnd;
			return row;
		}
		align() {}
		onChangeWrapLimit(e, session) {}
		onSelect(e, selection) {
			this.searchHighlight(selection);
			this.syncSelect(selection);
		}
		syncSelect(selection) {
			if (this.$updatingSelection) return;
			var isOld = selection.session === this.sessionA;
			var selectionRange = selection.getRange();
			var currSelectionRange = isOld ? this.selectionRangeA : this.selectionRangeB;
			if (currSelectionRange && selectionRange.isEqual(currSelectionRange)) return;
			if (isOld) this.selectionRangeA = selectionRange;
			else this.selectionRangeB = selectionRange;
			this.$updatingSelection = true;
			var newRange = this.transformRange(selectionRange, isOld);
			if (this.$syncSelections) (isOld ? this.editorB : this.editorA).session.selection.setSelectionRange(newRange);
			this.$updatingSelection = false;
			if (isOld) {
				this.selectionRangeA = selectionRange;
				this.selectionRangeB = newRange;
			} else {
				this.selectionRangeA = newRange;
				this.selectionRangeB = selectionRange;
			}
			this.updateSelectionMarker(this.syncSelectionMarkerA, this.sessionA, this.selectionRangeA);
			this.updateSelectionMarker(this.syncSelectionMarkerB, this.sessionB, this.selectionRangeB);
		}
		updateSelectionMarker(marker, session, range) {
			marker.setRange(range);
			session._signal("changeFrontMarker");
		}
		onChangeFold(ev, session) {
			var fold = ev.data;
			if (this.$syncingFold || !fold || !ev.action) return;
			this.scheduleRealign();
			const isOrig = session === this.sessionA;
			const other = isOrig ? this.sessionB : this.sessionA;
			if (ev.action === "remove") {
				if (fold.other) {
					fold.other.other = null;
					other.removeFold(fold.other);
				} else if (fold.lineWidget) {
					other.widgetManager.addLineWidget(fold.lineWidget);
					fold.lineWidget = null;
					if (other["$editor"]) other["$editor"].renderer.updateBackMarkers();
				}
			}
			if (ev.action === "add") {
				const range = this.transformRange(fold.range, isOrig);
				if (range.isEmpty()) {
					const row = range.start.row + 1;
					if (other.lineWidgets[row]) {
						fold.lineWidget = other.lineWidgets[row];
						other.widgetManager.removeLineWidget(fold.lineWidget);
						if (other["$editor"]) other["$editor"].renderer.updateBackMarkers();
					}
				} else {
					this.$syncingFold = true;
					fold.other = other.addFold(fold.placeholder, range);
					if (fold.other) fold.other.other = fold;
					this.$syncingFold = false;
				}
			}
		}
		scheduleRealign() {
			if (!this.realignPending) {
				this.realignPending = true;
				this.editorA.renderer.on("beforeRender", this.realign);
				this.editorB.renderer.on("beforeRender", this.realign);
			}
		}
		realign() {
			this.realignPending = true;
			this.editorA.renderer.off("beforeRender", this.realign);
			this.editorB.renderer.off("beforeRender", this.realign);
			this.align();
			this.realignPending = false;
		}
		detach() {
			if (!this.editorA || !this.editorB) return;
			if (this.savedOptionsA) this.editorA.setOptions(this.savedOptionsA);
			if (this.savedOptionsB) this.editorB.setOptions(this.savedOptionsB);
			this.editorA.renderer.off("beforeRender", this.realign);
			this.editorB.renderer.off("beforeRender", this.realign);
			this.$detachEventHandlers();
			this.$removeLineWidgets(this.sessionA);
			this.$removeLineWidgets(this.sessionB);
			this.gutterDecoratorA && this.gutterDecoratorA.dispose();
			this.gutterDecoratorB && this.gutterDecoratorB.dispose();
			this.sessionA.selection.clearSelection();
			this.sessionB.selection.clearSelection();
			if (this.savedOptionsA && this.savedOptionsA.customScrollbar) this.$resetDecorators(this.editorA.renderer);
			if (this.savedOptionsB && this.savedOptionsB.customScrollbar) this.$resetDecorators(this.editorB.renderer);
		}
		$removeLineWidgets(session) {
			session.lineWidgets = [];
			session.widgetManager.lineWidgets = [];
			session._signal("changeFold", { data: { start: { row: 0 } } });
		}
		$detachEventHandlers() {}
		destroy() {
			this.detach();
			this.editorA && this.editorA.destroy();
			this.editorB && this.editorB.destroy();
			this.editorA = this.editorB = null;
		}
		gotoNext(dir) {
			var ace = this.activeEditor || this.editorA;
			if (this.inlineDiffEditor) ace = this.editorA;
			var sideA = ace == this.editorA;
			var row = ace.selection.lead.row;
			var i = this.findChunkIndex(this.chunks, row, sideA);
			var chunk = this.chunks[i + dir] || this.chunks[i];
			var scrollTop = ace.session.getScrollTop();
			if (chunk) {
				var range = chunk[sideA ? "old" : "new"];
				var line = Math.max(range.start.row, range.end.row - 1);
				ace.selection.setRange(new Range$1(line, 0, line, 0));
			}
			ace.renderer.scrollSelectionIntoView(ace.selection.lead, ace.selection.anchor, .5);
			ace.renderer.animateScrolling(scrollTop);
		}
		firstDiffSelected() {
			return this.currentDiffIndex <= 1;
		}
		lastDiffSelected() {
			return this.currentDiffIndex > this.chunks.length - 1;
		}
		transformRange(range, isOriginal) {
			return Range$1.fromPoints(this.transformPosition(range.start, isOriginal), this.transformPosition(range.end, isOriginal));
		}
		transformPosition(pos, isOriginal) {
			var chunkIndex = this.findChunkIndex(this.chunks, pos.row, isOriginal);
			var chunk = this.chunks[chunkIndex];
			var clonePos = this.sessionB.doc.clonePos;
			var result = clonePos(pos);
			var [from, to] = isOriginal ? ["old", "new"] : ["new", "old"];
			var deltaChar = 0;
			var ignoreIndent = false;
			if (chunk) {
				if (chunk[from].end.row <= pos.row) result.row -= chunk[from].end.row - chunk[to].end.row;
				else if (chunk.charChanges) for (let i = 0; i < chunk.charChanges.length; i++) {
					let change = chunk.charChanges[i];
					let fromRange = change[from];
					let toRange = change[to];
					if (fromRange.end.row < pos.row) continue;
					if (fromRange.start.row > pos.row) break;
					if (fromRange.isMultiLine() && fromRange.contains(pos.row, pos.column)) {
						result.row = toRange.start.row + pos.row - fromRange.start.row;
						var maxRow = toRange.end.row;
						if (toRange.end.column === 0) maxRow--;
						if (result.row > maxRow) {
							result.row = maxRow;
							result.column = (isOriginal ? this.sessionB : this.sessionA).getLine(maxRow).length;
							ignoreIndent = true;
						}
						result.row = Math.min(result.row, maxRow);
					} else {
						result.row = toRange.start.row;
						if (fromRange.start.column > pos.column) break;
						ignoreIndent = true;
						if (!fromRange.isEmpty() && fromRange.contains(pos.row, pos.column)) {
							result.column = toRange.start.column;
							deltaChar = pos.column - fromRange.start.column;
							deltaChar = Math.min(deltaChar, toRange.end.column - toRange.start.column);
						} else {
							result = clonePos(toRange.end);
							deltaChar = pos.column - fromRange.end.column;
						}
					}
				}
				else if (chunk[from].start.row <= pos.row) {
					result.row += chunk[to].start.row - chunk[from].start.row;
					if (result.row >= chunk[to].end.row) {
						result.row = chunk[to].end.row - 1;
						result.column = (isOriginal ? this.sessionB : this.sessionA).getLine(result.row).length;
					}
				}
			}
			if (!ignoreIndent) {
				var [fromEditSession, toEditSession] = isOriginal ? [this.sessionA, this.sessionB] : [this.sessionB, this.sessionA];
				deltaChar -= this.$getDeltaIndent(fromEditSession, toEditSession, pos.row, result.row);
			}
			result.column += deltaChar;
			return result;
		}
		$getDeltaIndent(fromEditSession, toEditSession, fromLine, toLine) {
			return this.$getIndent(fromEditSession, fromLine) - this.$getIndent(toEditSession, toLine);
		}
		$getIndent(editSession, line) {
			return editSession.getLine(line).match(/^\s*/)[0].length;
		}
		printDiffs() {
			this.chunks.forEach((diff) => {
				console.log(diff.toString());
			});
		}
		findChunkIndex(chunks, row, isOriginal) {
			for (var i = 0; i < chunks.length; i++) {
				var ch = chunks[i];
				var chunk = isOriginal ? ch.old : ch.new;
				if (chunk.end.row < row) continue;
				if (chunk.start.row > row) break;
			}
			this.currentDiffIndex = i;
			return i - 1;
		}
		searchHighlight(selection) {
			if (this.$syncSelections || this.inlineDiffEditor) return;
			let currSession = selection.session;
			let otherSession = currSession === this.sessionA ? this.sessionB : this.sessionA;
			otherSession.highlight(currSession.$searchHighlight.regExp);
			otherSession._signal("changeBackMarker");
		}
		initSelectionMarkers() {
			this.syncSelectionMarkerA = new SyncSelectionMarker();
			this.syncSelectionMarkerB = new SyncSelectionMarker();
			this.sessionA.addDynamicMarker(this.syncSelectionMarkerA, true);
			this.sessionB.addDynamicMarker(this.syncSelectionMarkerB, true);
		}
		clearSelectionMarkers() {
			this.sessionA.removeMarker(this.syncSelectionMarkerA.id);
			this.sessionB.removeMarker(this.syncSelectionMarkerB.id);
		}
	};
	config$2.defineOptions(BaseDiffView$2.prototype, "DiffView", {
		showOtherLineNumbers: {
			set: function(value) {
				if (this.gutterLayer) {
					this.gutterLayer.$renderer = value ? null : emptyGutterRenderer;
					this.editorA.renderer.updateFull();
				}
			},
			initialValue: true
		},
		folding: { set: function(value) {
			this.editorA.setOption("showFoldWidgets", value);
			this.editorB.setOption("showFoldWidgets", value);
			if (!value) {
				var posA = [];
				var posB = [];
				if (this.chunks) this.chunks.forEach((x) => {
					posA.push(x.old.start, x.old.end);
					posB.push(x.new.start, x.new.end);
				});
				this.sessionA.unfold(posA);
				this.sessionB.unfold(posB);
			}
		} },
		syncSelections: { set: function(value) {} },
		ignoreTrimWhitespace: { set: function(value) {
			this.scheduleOnInput();
		} },
		wrap: { set: function(value) {
			this.sessionA.setOption("wrap", value);
			this.sessionB.setOption("wrap", value);
		} },
		maxDiffs: { value: 5e3 },
		theme: {
			set: function(value) {
				this.setTheme(value);
			},
			get: function() {
				return this.editorA.getTheme();
			}
		}
	});
	var emptyGutterRenderer = {
		getText: function name(params) {
			return "";
		},
		getWidth() {
			return 0;
		}
	};
	exports.BaseDiffView = BaseDiffView$2;
	var DiffChunk$1 = class DiffChunk$1 {
		constructor(originalRange, modifiedRange, charChanges) {
			this.old = originalRange;
			this.new = modifiedRange;
			this.charChanges = charChanges && charChanges.map((m) => new DiffChunk$1(new Range$1(m.originalStartLineNumber, m.originalStartColumn, m.originalEndLineNumber, m.originalEndColumn), new Range$1(m.modifiedStartLineNumber, m.modifiedStartColumn, m.modifiedEndLineNumber, m.modifiedEndColumn)));
		}
	};
	var DiffHighlight = class {
		constructor(diffView, type) {
			this.id;
			this.diffView = diffView;
			this.type = type;
		}
		update(html, markerLayer, session, config$3) {
			let dir, operation, opOperation;
			var diffView = this.diffView;
			if (this.type === -1) {
				dir = "old";
				operation = "delete";
				opOperation = "insert";
			} else {
				dir = "new";
				operation = "insert";
				opOperation = "delete";
			}
			var ignoreTrimWhitespace = diffView.$ignoreTrimWhitespace;
			var lineChanges = diffView.chunks;
			if (session.lineWidgets && !diffView.inlineDiffEditor) for (var row = config$3.firstRow; row <= config$3.lastRow; row++) {
				var lineWidget = session.lineWidgets[row];
				if (!lineWidget || lineWidget.hidden) continue;
				let start = session.documentToScreenRow(row, 0);
				if (lineWidget.rowsAbove > 0) {
					var range = new Range$1(start - lineWidget.rowsAbove, 0, start - 1, Number.MAX_VALUE);
					markerLayer.drawFullLineMarker(html, range, "ace_diff aligned_diff", config$3);
				}
				let end = start + lineWidget.rowCount - (lineWidget.rowsAbove || 0);
				var range = new Range$1(start + 1, 0, end, Number.MAX_VALUE);
				markerLayer.drawFullLineMarker(html, range, "ace_diff aligned_diff", config$3);
			}
			lineChanges.forEach((lineChange) => {
				let startRow = lineChange[dir].start.row;
				let endRow = lineChange[dir].end.row;
				if (endRow < config$3.firstRow || startRow > config$3.lastRow) return;
				let range$1 = new Range$1(startRow, 0, endRow - 1, 1 << 30);
				if (startRow !== endRow) {
					range$1 = range$1.toScreenRange(session);
					markerLayer.drawFullLineMarker(html, range$1, "ace_diff " + operation, config$3);
				}
				if (lineChange.charChanges) for (var i = 0; i < lineChange.charChanges.length; i++) {
					var changeRange = lineChange.charChanges[i][dir];
					if (changeRange.end.column == 0 && changeRange.end.row > changeRange.start.row && changeRange.end.row == lineChange[dir].end.row) {
						changeRange.end.row--;
						changeRange.end.column = Number.MAX_VALUE;
					}
					if (ignoreTrimWhitespace) for (let lineNumber = changeRange.start.row; lineNumber <= changeRange.end.row; lineNumber++) {
						let startColumn;
						let endColumn;
						let sessionLineStart = session.getLine(lineNumber).match(/^\s*/)[0].length;
						let sessionLineEnd = session.getLine(lineNumber).length;
						if (lineNumber === changeRange.start.row) startColumn = changeRange.start.column;
						else startColumn = sessionLineStart;
						if (lineNumber === changeRange.end.row) endColumn = changeRange.end.column;
						else endColumn = sessionLineEnd;
						let range$2 = new Range$1(lineNumber, startColumn, lineNumber, endColumn);
						var screenRange = range$2.toScreenRange(session);
						if (sessionLineStart === startColumn && sessionLineEnd === endColumn) continue;
						let cssClass = "inline " + operation;
						if (range$2.isEmpty() && startColumn !== 0) cssClass = "inline " + opOperation + " empty";
						markerLayer.drawSingleLineMarker(html, screenRange, "ace_diff " + cssClass, config$3);
					}
					else {
						let range$2 = new Range$1(changeRange.start.row, changeRange.start.column, changeRange.end.row, changeRange.end.column);
						var screenRange = range$2.toScreenRange(session);
						let cssClass = "inline " + operation;
						if (range$2.isEmpty() && changeRange.start.column !== 0) cssClass = "inline empty " + opOperation;
						if (screenRange.isMultiLine()) markerLayer.drawTextMarker(html, screenRange, "ace_diff " + cssClass, config$3);
						else markerLayer.drawSingleLineMarker(html, screenRange, "ace_diff " + cssClass, config$3);
					}
				}
			});
		}
	};
	var SyncSelectionMarker = class {
		constructor() {
			this.id;
			this.type = "fullLine";
			this.clazz = "ace_diff-active-line";
		}
		update(html, markerLayer, session, config$3) {}
		setRange(range) {
			var newRange = range.clone();
			newRange.end.column++;
			this.range = newRange;
		}
	};
	exports.DiffChunk = DiffChunk$1;
	exports.DiffHighlight = DiffHighlight;
}));
var require_inline_diff_view = /* @__PURE__ */ __commonJSMin(((exports) => {
	var BaseDiffView$1 = require_base_diff_view().BaseDiffView;
	var Renderer = require_virtual_renderer().VirtualRenderer;
	var config$1 = require_config();
	var InlineDiffView$1 = class extends BaseDiffView$1 {
		constructor(diffModel, container) {
			diffModel = diffModel || {};
			diffModel.inline = diffModel.inline || "a";
			super(true, container);
			this.init(diffModel);
		}
		init(diffModel) {
			this.onSelect = this.onSelect.bind(this);
			this.onAfterRender = this.onAfterRender.bind(this);
			this.$setupModels(diffModel);
			this.onChangeTheme();
			config$1.resetOptions(this);
			config$1["_signal"]("diffView", this);
			var padding = this.activeEditor.renderer.$padding;
			this.addGutterDecorators();
			this.otherEditor.renderer.setPadding(padding);
			this.textLayer = this.otherEditor.renderer.$textLayer;
			this.markerLayer = this.otherEditor.renderer.$markerBack;
			this.gutterLayer = this.otherEditor.renderer.$gutterLayer;
			this.cursorLayer = this.otherEditor.renderer.$cursorLayer;
			this.otherEditor.renderer.$updateCachedSize = function() {};
			var textLayerElement = this.activeEditor.renderer.$textLayer.element;
			textLayerElement.parentNode.insertBefore(this.textLayer.element, textLayerElement);
			var markerLayerElement = this.activeEditor.renderer.$markerBack.element;
			markerLayerElement.parentNode.insertBefore(this.markerLayer.element, markerLayerElement.nextSibling);
			var gutterLayerElement = this.activeEditor.renderer.$gutterLayer.element;
			gutterLayerElement.parentNode.insertBefore(this.gutterLayer.element, gutterLayerElement.nextSibling);
			gutterLayerElement.style.position = "absolute";
			this.gutterLayer.element.style.position = "absolute";
			this.gutterLayer.element.style.width = "100%";
			this.gutterLayer.element.classList.add("ace_mini-diff_gutter_other");
			this.gutterLayer.$updateGutterWidth = function() {};
			this.initMouse();
			this.initTextInput();
			this.initTextLayer();
			this.initRenderer();
			this.$attachEventHandlers();
			this.selectEditor(this.activeEditor);
		}
		initRenderer(restore) {
			if (restore) delete this.activeEditor.renderer.$getLongestLine;
			else this.editorA.renderer.$getLongestLine = this.editorB.renderer.$getLongestLine = () => {
				var getLongestLine = Renderer.prototype.$getLongestLine;
				return Math.max(getLongestLine.call(this.editorA.renderer), getLongestLine.call(this.editorB.renderer));
			};
		}
		initTextLayer() {
			var renderLine = this.textLayer.$renderLine;
			var diffView = this;
			this.otherEditor.renderer.$textLayer.$renderLine = function(parent, row, foldLIne) {
				if (isVisibleRow(diffView.chunks, row)) renderLine.call(this, parent, row, foldLIne);
			};
			var side = this.showSideA ? "new" : "old";
			function isVisibleRow(chunks, row) {
				var min = 0;
				var max = chunks.length - 1;
				var result = -1;
				while (min < max) {
					var mid = Math.floor((min + max) / 2);
					var chunkStart = chunks[mid][side].start.row;
					if (chunkStart < row) {
						result = mid;
						min = mid + 1;
					} else if (chunkStart > row) max = mid - 1;
					else {
						result = mid;
						break;
					}
				}
				if (chunks[result + 1] && chunks[result + 1][side].start.row <= row) result++;
				var range = chunks[result] && chunks[result][side];
				if (range && range.end.row > row) return true;
				return false;
			}
		}
		initTextInput(restore) {
			if (restore) {
				this.otherEditor.textInput = this.othertextInput;
				this.otherEditor.container = this.otherEditorContainer;
			} else {
				this.othertextInput = this.otherEditor.textInput;
				this.otherEditor.textInput = this.activeEditor.textInput;
				this.otherEditorContainer = this.otherEditor.container;
				this.otherEditor.container = this.activeEditor.container;
			}
		}
		selectEditor(editor) {
			if (editor == this.activeEditor) {
				this.otherEditor.selection.clearSelection();
				this.activeEditor.textInput.setHost(this.activeEditor);
				this.activeEditor.setStyle("ace_diff_other", false);
				this.cursorLayer.element.remove();
				this.activeEditor.renderer.$cursorLayer.element.style.display = "block";
				if (this.showSideA) {
					this.sessionA.removeMarker(this.syncSelectionMarkerA.id);
					this.sessionA.addDynamicMarker(this.syncSelectionMarkerA, true);
				}
				this.markerLayer.element.classList.add("ace_hidden_marker-layer");
				this.activeEditor.renderer.$markerBack.element.classList.remove("ace_hidden_marker-layer");
				this.removeBracketHighlight(this.otherEditor);
			} else {
				this.activeEditor.selection.clearSelection();
				this.activeEditor.textInput.setHost(this.otherEditor);
				this.activeEditor.setStyle("ace_diff_other");
				this.activeEditor.renderer.$cursorLayer.element.parentNode.appendChild(this.cursorLayer.element);
				this.activeEditor.renderer.$cursorLayer.element.style.display = "none";
				if (this.activeEditor.$isFocused) this.otherEditor.onFocus();
				if (this.showSideA) this.sessionA.removeMarker(this.syncSelectionMarkerA.id);
				this.markerLayer.element.classList.remove("ace_hidden_marker-layer");
				this.activeEditor.renderer.$markerBack.element.classList.add("ace_hidden_marker-layer");
				this.removeBracketHighlight(this.activeEditor);
			}
		}
		removeBracketHighlight(editor) {
			var session = editor.session;
			if (session.$bracketHighlight) {
				session.$bracketHighlight.markerIds.forEach(function(id) {
					session.removeMarker(id);
				});
				session.$bracketHighlight = null;
			}
		}
		initMouse() {
			this.otherEditor.renderer.$loop = this.activeEditor.renderer.$loop;
			this.otherEditor.renderer.scroller = {
				getBoundingClientRect: () => {
					return this.activeEditor.renderer.scroller.getBoundingClientRect();
				},
				style: this.activeEditor.renderer.scroller.style
			};
			var forwardEvent = (ev) => {
				if (!ev.domEvent) return;
				var screenPos = ev.editor.renderer.pixelToScreenCoordinates(ev.clientX, ev.clientY);
				var sessionA = this.activeEditor.session;
				var sessionB = this.otherEditor.session;
				var posA = sessionA.screenToDocumentPosition(screenPos.row, screenPos.column, screenPos.offsetX);
				var posB = sessionB.screenToDocumentPosition(screenPos.row, screenPos.column, screenPos.offsetX);
				var posAx = sessionA.documentToScreenPosition(posA);
				var posBx = sessionB.documentToScreenPosition(posB);
				if (ev.editor == this.activeEditor) {
					if (posBx.row == screenPos.row && posAx.row != screenPos.row) {
						if (ev.type == "mousedown") this.selectEditor(this.otherEditor);
						ev.propagationStopped = true;
						ev.defaultPrevented = true;
						this.otherEditor.$mouseHandler.onMouseEvent(ev.type, ev.domEvent);
					} else if (ev.type == "mousedown") this.selectEditor(this.activeEditor);
				}
			};
			var events = [
				"mousedown",
				"click",
				"mouseup",
				"dblclick",
				"tripleclick",
				"quadclick"
			];
			events.forEach((event) => {
				this.activeEditor.on(event, forwardEvent, true);
				this.activeEditor.on("gutter" + event, forwardEvent, true);
			});
			var onFocus = (e) => {
				this.activeEditor.onFocus(e);
			};
			var onBlur = (e) => {
				this.activeEditor.onBlur(e);
			};
			this.otherEditor.on("focus", onFocus);
			this.otherEditor.on("blur", onBlur);
			this.onMouseDetach = () => {
				events.forEach((event) => {
					this.activeEditor.off(event, forwardEvent, true);
					this.activeEditor.off("gutter" + event, forwardEvent, true);
				});
				this.otherEditor.off("focus", onFocus);
				this.otherEditor.off("blur", onBlur);
			};
		}
		align() {
			var diffView = this;
			this.$initWidgets(diffView.editorA);
			this.$initWidgets(diffView.editorB);
			diffView.chunks.forEach(function(ch) {
				var diff1 = diffView.$screenRow(ch.old.end, diffView.sessionA) - diffView.$screenRow(ch.old.start, diffView.sessionA);
				var diff2 = diffView.$screenRow(ch.new.end, diffView.sessionB) - diffView.$screenRow(ch.new.start, diffView.sessionB);
				diffView.$addWidget(diffView.sessionA, {
					rowCount: diff2,
					rowsAbove: ch.old.end.row === 0 ? diff2 : 0,
					row: ch.old.end.row === 0 ? 0 : ch.old.end.row - 1
				});
				diffView.$addWidget(diffView.sessionB, {
					rowCount: diff1,
					rowsAbove: diff1,
					row: ch.new.start.row
				});
			});
			diffView.sessionA["_emit"]("changeFold", { data: { start: { row: 0 } } });
			diffView.sessionB["_emit"]("changeFold", { data: { start: { row: 0 } } });
		}
		onChangeWrapLimit(e, session) {
			this.otherSession.setOption("wrap", session.getOption("wrap"));
			this.otherSession.adjustWrapLimit(session.$wrapLimit);
			this.scheduleRealign();
			this.activeEditor.renderer.updateFull();
		}
		$attachSessionsEventHandlers() {
			this.$attachSessionEventHandlers(this.editorA, this.markerA);
			this.$attachSessionEventHandlers(this.editorB, this.markerB);
			var session = this.activeEditor.session;
			session.on("changeWrapLimit", this.onChangeWrapLimit);
			session.on("changeWrapMode", this.onChangeWrapLimit);
		}
		$attachSessionEventHandlers(editor, marker) {
			editor.session.on("changeFold", this.onChangeFold);
			editor.session.addDynamicMarker(marker);
			editor.selection.on("changeCursor", this.onSelect);
			editor.selection.on("changeSelection", this.onSelect);
		}
		$detachSessionsEventHandlers() {
			this.$detachSessionHandlers(this.editorA, this.markerA);
			this.$detachSessionHandlers(this.editorB, this.markerB);
			this.otherSession.bgTokenizer.lines.fill(void 0);
			var session = this.activeEditor.session;
			session.off("changeWrapLimit", this.onChangeWrapLimit);
			session.off("changeWrapMode", this.onChangeWrapLimit);
		}
		$detachSessionHandlers(editor, marker) {
			editor.session.removeMarker(marker.id);
			editor.selection.off("changeCursor", this.onSelect);
			editor.selection.off("changeSelection", this.onSelect);
			editor.session.off("changeFold", this.onChangeFold);
		}
		$attachEventHandlers() {
			this.activeEditor.on("input", this.onInput);
			this.activeEditor.renderer.on("afterRender", this.onAfterRender);
			this.otherSession.on("change", this.onInput);
		}
		$detachEventHandlers() {
			this.$detachSessionsEventHandlers();
			this.activeEditor.off("input", this.onInput);
			this.activeEditor.renderer.off("afterRender", this.onAfterRender);
			this.otherSession.off("change", this.onInput);
			this.textLayer.element.textContent = "";
			this.textLayer.element.remove();
			this.gutterLayer.element.textContent = "";
			this.gutterLayer.element.remove();
			this.markerLayer.element.textContent = "";
			this.markerLayer.element.remove();
			this.onMouseDetach();
			this.selectEditor(this.activeEditor);
			this.clearSelectionMarkers();
			this.otherEditor.setSession(null);
			this.otherEditor.renderer.$loop = null;
			this.initTextInput(true);
			this.initRenderer(true);
			this.otherEditor.destroy();
		}
		onAfterRender(changes, renderer) {
			var config$3 = renderer.layerConfig;
			var session = this.otherSession;
			var cloneRenderer = this.otherEditor.renderer;
			session.$scrollTop = renderer.scrollTop;
			session.$scrollLeft = renderer.scrollLeft;
			[
				"characterWidth",
				"lineHeight",
				"scrollTop",
				"scrollLeft",
				"scrollMargin",
				"$padding",
				"$size",
				"layerConfig",
				"$horizScroll",
				"$vScroll"
			].forEach(function(prop) {
				cloneRenderer[prop] = renderer[prop];
			});
			cloneRenderer.$computeLayerConfig();
			var newConfig = cloneRenderer.layerConfig;
			this.gutterLayer.update(newConfig);
			newConfig.firstRowScreen = config$3.firstRowScreen;
			cloneRenderer.$cursorLayer.config = newConfig;
			cloneRenderer.$cursorLayer.update(newConfig);
			if (changes & cloneRenderer.CHANGE_LINES || changes & cloneRenderer.CHANGE_FULL || changes & cloneRenderer.CHANGE_SCROLL || changes & cloneRenderer.CHANGE_TEXT) this.textLayer.update(newConfig);
			this.markerLayer.setMarkers(this.otherSession.getMarkers());
			this.markerLayer.update(newConfig);
		}
		detach() {
			super.detach();
			this.otherEditor && this.otherEditor.destroy();
		}
	};
	exports.InlineDiffView = InlineDiffView$1;
}));
var require_split_diff_view = /* @__PURE__ */ __commonJSMin(((exports) => {
	var BaseDiffView = require_base_diff_view().BaseDiffView;
	var config = require_config();
	var SplitDiffView$1 = class extends BaseDiffView {
		constructor(diffModel) {
			diffModel = diffModel || {};
			super();
			this.init(diffModel);
		}
		init(diffModel) {
			this.onChangeTheme = this.onChangeTheme.bind(this);
			this.onMouseWheel = this.onMouseWheel.bind(this);
			this.onScroll = this.onScroll.bind(this);
			this.$setupModels(diffModel);
			this.addGutterDecorators();
			this.onChangeTheme();
			config.resetOptions(this);
			config["_signal"]("diffView", this);
			this.$attachEventHandlers();
		}
		onChangeWrapLimit() {
			this.scheduleRealign();
		}
		align() {
			var diffView = this;
			this.$initWidgets(diffView.editorA);
			this.$initWidgets(diffView.editorB);
			diffView.chunks.forEach(function(ch) {
				var diff1 = diffView.$screenRow(ch.old.start, diffView.sessionA);
				var diff2 = diffView.$screenRow(ch.new.start, diffView.sessionB);
				if (diff1 < diff2) diffView.$addWidget(diffView.sessionA, {
					rowCount: diff2 - diff1,
					rowsAbove: ch.old.start.row === 0 ? diff2 - diff1 : 0,
					row: ch.old.start.row === 0 ? 0 : ch.old.start.row - 1
				});
				else if (diff1 > diff2) diffView.$addWidget(diffView.sessionB, {
					rowCount: diff1 - diff2,
					rowsAbove: ch.new.start.row === 0 ? diff1 - diff2 : 0,
					row: ch.new.start.row === 0 ? 0 : ch.new.start.row - 1
				});
				var diff1 = diffView.$screenRow(ch.old.end, diffView.sessionA);
				var diff2 = diffView.$screenRow(ch.new.end, diffView.sessionB);
				if (diff1 < diff2) diffView.$addWidget(diffView.sessionA, {
					rowCount: diff2 - diff1,
					rowsAbove: ch.old.end.row === 0 ? diff2 - diff1 : 0,
					row: ch.old.end.row === 0 ? 0 : ch.old.end.row - 1
				});
				else if (diff1 > diff2) diffView.$addWidget(diffView.sessionB, {
					rowCount: diff1 - diff2,
					rowsAbove: ch.new.end.row === 0 ? diff1 - diff2 : 0,
					row: ch.new.end.row === 0 ? 0 : ch.new.end.row - 1
				});
			});
			diffView.sessionA["_emit"]("changeFold", { data: { start: { row: 0 } } });
			diffView.sessionB["_emit"]("changeFold", { data: { start: { row: 0 } } });
		}
		onScroll(e, session) {
			this.syncScroll(this.sessionA === session ? this.editorA.renderer : this.editorB.renderer);
		}
		syncScroll(renderer) {
			if (this.$syncScroll == false) return;
			var r1 = this.editorA.renderer;
			var r2 = this.editorB.renderer;
			var isOrig = renderer == r1;
			if (r1["$scrollAnimation"] && r2["$scrollAnimation"]) return;
			var now = Date.now();
			if (this.scrollSetBy != renderer && now - this.scrollSetAt < 500) return;
			var r = isOrig ? r1 : r2;
			if (this.scrollSetBy != renderer) {
				if (isOrig && this.scrollA == r.session.getScrollTop()) return;
				else if (!isOrig && this.scrollB == r.session.getScrollTop()) return;
			}
			var rOther = isOrig ? r2 : r1;
			var targetPos = r.session.getScrollTop();
			this.$syncScroll = false;
			if (isOrig) {
				this.scrollA = r.session.getScrollTop();
				this.scrollB = targetPos;
			} else {
				this.scrollA = targetPos;
				this.scrollB = r.session.getScrollTop();
			}
			this.scrollSetBy = renderer;
			rOther.session.setScrollTop(targetPos);
			this.$syncScroll = true;
			this.scrollSetAt = now;
		}
		onMouseWheel(ev) {
			if (ev.getAccelKey()) return;
			if (ev.getShiftKey() && ev.wheelY && !ev.wheelX) {
				ev.wheelX = ev.wheelY;
				ev.wheelY = 0;
			}
			var editor = ev.editor;
			if (!editor.renderer.isScrollableBy(ev.wheelX * ev.speed, ev.wheelY * ev.speed)) {
				var other = editor == this.editorA ? this.editorB : this.editorA;
				if (other.renderer.isScrollableBy(ev.wheelX * ev.speed, ev.wheelY * ev.speed)) other.renderer.scrollBy(ev.wheelX * ev.speed, ev.wheelY * ev.speed);
				return ev.stop();
			}
		}
		$attachSessionsEventHandlers() {
			this.$attachSessionEventHandlers(this.editorA, this.markerA);
			this.$attachSessionEventHandlers(this.editorB, this.markerB);
		}
		$attachSessionEventHandlers(editor, marker) {
			editor.session.on("changeScrollTop", this.onScroll);
			editor.session.on("changeFold", this.onChangeFold);
			editor.session.addDynamicMarker(marker);
			editor.selection.on("changeCursor", this.onSelect);
			editor.selection.on("changeSelection", this.onSelect);
			editor.session.on("changeWrapLimit", this.onChangeWrapLimit);
			editor.session.on("changeWrapMode", this.onChangeWrapLimit);
		}
		$detachSessionsEventHandlers() {
			this.$detachSessionHandlers(this.editorA, this.markerA);
			this.$detachSessionHandlers(this.editorB, this.markerB);
		}
		$detachSessionHandlers(editor, marker) {
			editor.session.off("changeScrollTop", this.onScroll);
			editor.session.off("changeFold", this.onChangeFold);
			editor.session.removeMarker(marker.id);
			editor.selection.off("changeCursor", this.onSelect);
			editor.selection.off("changeSelection", this.onSelect);
			editor.session.off("changeWrapLimit", this.onChangeWrapLimit);
			editor.session.off("changeWrapMode", this.onChangeWrapLimit);
		}
		$attachEventHandlers() {
			this.editorA.renderer.on("themeChange", this.onChangeTheme);
			this.editorB.renderer.on("themeChange", this.onChangeTheme);
			this.editorA.on("mousewheel", this.onMouseWheel);
			this.editorB.on("mousewheel", this.onMouseWheel);
			this.editorA.on("input", this.onInput);
			this.editorB.on("input", this.onInput);
		}
		$detachEventHandlers() {
			this.$detachSessionsEventHandlers();
			this.clearSelectionMarkers();
			this.editorA.renderer.off("themeChange", this.onChangeTheme);
			this.editorB.renderer.off("themeChange", this.onChangeTheme);
			this.$detachEditorEventHandlers(this.editorA);
			this.$detachEditorEventHandlers(this.editorB);
		}
		$detachEditorEventHandlers(editor) {
			editor.off("mousewheel", this.onMouseWheel);
			editor.off("input", this.onInput);
		}
	};
	exports.SplitDiffView = SplitDiffView$1;
}));
var require_default = /* @__PURE__ */ __commonJSMin(((exports) => {
	function equals(one, other, itemEquals = (a, b) => a === b) {
		if (one === other) return true;
		if (!one || !other) return false;
		if (one.length !== other.length) return false;
		for (let i = 0, len = one.length; i < len; i++) if (!itemEquals(one[i], other[i])) return false;
		return true;
	}
	function* groupAdjacentBy(items, shouldBeGrouped) {
		let currentGroup;
		let last;
		for (const item of items) {
			if (last !== void 0 && shouldBeGrouped(last, item)) currentGroup.push(item);
			else {
				if (currentGroup) yield currentGroup;
				currentGroup = [item];
			}
			last = item;
		}
		if (currentGroup) yield currentGroup;
	}
	function forEachAdjacent(arr, f) {
		for (let i = 0; i <= arr.length; i++) f(i === 0 ? void 0 : arr[i - 1], i === arr.length ? void 0 : arr[i]);
	}
	function forEachWithNeighbors(arr, f) {
		for (let i = 0; i < arr.length; i++) f(i === 0 ? void 0 : arr[i - 1], arr[i], i + 1 === arr.length ? void 0 : arr[i + 1]);
	}
	function pushMany(arr, items) {
		for (const item of items) arr.push(item);
	}
	function compareBy(selector, comparator) {
		return (a, b) => comparator(selector(a), selector(b));
	}
	var numberComparator = (a, b) => a - b;
	function reverseOrder(comparator) {
		return (a, b) => -comparator(a, b);
	}
	var BugIndicatingError = class BugIndicatingError extends Error {
		constructor(message) {
			super(message || "An unexpected bug occurred.");
			Object.setPrototypeOf(this, BugIndicatingError.prototype);
		}
	};
	function assert(condition, message = "unexpected state") {
		if (!condition) throw new BugIndicatingError(`Assertion Failed: ${message}`);
	}
	function assertFn(condition) {
		condition();
	}
	function checkAdjacentItems(items, predicate) {
		let i = 0;
		while (i < items.length - 1) {
			const a = items[i];
			const b = items[i + 1];
			if (!predicate(a, b)) return false;
			i++;
		}
		return true;
	}
	var OffsetRange = class OffsetRange {
		constructor(start, endExclusive) {
			this.start = start;
			this.endExclusive = endExclusive;
			if (start > endExclusive) throw new BugIndicatingError(`Invalid range: ${this.toString()}`);
		}
		static fromTo(start, endExclusive) {
			return new OffsetRange(start, endExclusive);
		}
		static addRange(range, sortedRanges) {
			let i = 0;
			while (i < sortedRanges.length && sortedRanges[i].endExclusive < range.start) i++;
			let j = i;
			while (j < sortedRanges.length && sortedRanges[j].start <= range.endExclusive) j++;
			if (i === j) sortedRanges.splice(i, 0, range);
			else {
				const start = Math.min(range.start, sortedRanges[i].start);
				const end = Math.max(range.endExclusive, sortedRanges[j - 1].endExclusive);
				sortedRanges.splice(i, j - i, new OffsetRange(start, end));
			}
		}
		static tryCreate(start, endExclusive) {
			if (start > endExclusive) return;
			return new OffsetRange(start, endExclusive);
		}
		static ofLength(length) {
			return new OffsetRange(0, length);
		}
		static ofStartAndLength(start, length) {
			return new OffsetRange(start, start + length);
		}
		static emptyAt(offset) {
			return new OffsetRange(offset, offset);
		}
		get isEmpty() {
			return this.start === this.endExclusive;
		}
		delta(offset) {
			return new OffsetRange(this.start + offset, this.endExclusive + offset);
		}
		deltaStart(offset) {
			return new OffsetRange(this.start + offset, this.endExclusive);
		}
		deltaEnd(offset) {
			return new OffsetRange(this.start, this.endExclusive + offset);
		}
		get length() {
			return this.endExclusive - this.start;
		}
		toString() {
			return `[${this.start}, ${this.endExclusive})`;
		}
		equals(other) {
			return this.start === other.start && this.endExclusive === other.endExclusive;
		}
		containsRange(other) {
			return this.start <= other.start && other.endExclusive <= this.endExclusive;
		}
		contains(offset) {
			return this.start <= offset && offset < this.endExclusive;
		}
		join(other) {
			return new OffsetRange(Math.min(this.start, other.start), Math.max(this.endExclusive, other.endExclusive));
		}
		intersect(other) {
			const start = Math.max(this.start, other.start);
			const end = Math.min(this.endExclusive, other.endExclusive);
			if (start <= end) return new OffsetRange(start, end);
		}
		intersectionLength(range) {
			const start = Math.max(this.start, range.start);
			const end = Math.min(this.endExclusive, range.endExclusive);
			return Math.max(0, end - start);
		}
		intersects(other) {
			return Math.max(this.start, other.start) < Math.min(this.endExclusive, other.endExclusive);
		}
		intersectsOrTouches(other) {
			return Math.max(this.start, other.start) <= Math.min(this.endExclusive, other.endExclusive);
		}
		isBefore(other) {
			return this.endExclusive <= other.start;
		}
		isAfter(other) {
			return this.start >= other.endExclusive;
		}
		slice(arr) {
			return arr.slice(this.start, this.endExclusive);
		}
		substring(str) {
			return str.substring(this.start, this.endExclusive);
		}
		clip(value) {
			if (this.isEmpty) throw new BugIndicatingError(`Invalid clipping range: ${this.toString()}`);
			return Math.max(this.start, Math.min(this.endExclusive - 1, value));
		}
		clipCyclic(value) {
			if (this.isEmpty) throw new BugIndicatingError(`Invalid clipping range: ${this.toString()}`);
			if (value < this.start) return this.endExclusive - (this.start - value) % this.length;
			if (value >= this.endExclusive) return this.start + (value - this.start) % this.length;
			return value;
		}
		map(f) {
			const result = [];
			for (let i = this.start; i < this.endExclusive; i++) result.push(f(i));
			return result;
		}
		forEach(f) {
			for (let i = this.start; i < this.endExclusive; i++) f(i);
		}
	};
	var Position = class Position {
		constructor(lineNumber, column) {
			this.lineNumber = lineNumber;
			this.column = column;
		}
		equals(other) {
			return Position.equals(this, other);
		}
		static equals(a, b) {
			if (!a && !b) return true;
			return !!a && !!b && a.lineNumber === b.lineNumber && a.column === b.column;
		}
		isBefore(other) {
			return Position.isBefore(this, other);
		}
		static isBefore(a, b) {
			if (a.lineNumber < b.lineNumber) return true;
			if (b.lineNumber < a.lineNumber) return false;
			return a.column < b.column;
		}
		isBeforeOrEqual(other) {
			return Position.isBeforeOrEqual(this, other);
		}
		static isBeforeOrEqual(a, b) {
			if (a.lineNumber < b.lineNumber) return true;
			if (b.lineNumber < a.lineNumber) return false;
			return a.column <= b.column;
		}
	};
	var Range = class Range {
		constructor(startLineNumber, startColumn, endLineNumber, endColumn) {
			if (startLineNumber > endLineNumber || startLineNumber === endLineNumber && startColumn > endColumn) {
				this.startLineNumber = endLineNumber;
				this.startColumn = endColumn;
				this.endLineNumber = startLineNumber;
				this.endColumn = startColumn;
			} else {
				this.startLineNumber = startLineNumber;
				this.startColumn = startColumn;
				this.endLineNumber = endLineNumber;
				this.endColumn = endColumn;
			}
		}
		isEmpty() {
			return Range.isEmpty(this);
		}
		static isEmpty(range) {
			return range.startLineNumber === range.endLineNumber && range.startColumn === range.endColumn;
		}
		containsPosition(position) {
			return Range.containsPosition(this, position);
		}
		static containsPosition(range, position) {
			if (position.lineNumber < range.startLineNumber || position.lineNumber > range.endLineNumber) return false;
			if (position.lineNumber === range.startLineNumber && position.column < range.startColumn) return false;
			if (position.lineNumber === range.endLineNumber && position.column > range.endColumn) return false;
			return true;
		}
		containsRange(range) {
			return Range.containsRange(this, range);
		}
		static containsRange(range, otherRange) {
			if (otherRange.startLineNumber < range.startLineNumber || otherRange.endLineNumber < range.startLineNumber) return false;
			if (otherRange.startLineNumber > range.endLineNumber || otherRange.endLineNumber > range.endLineNumber) return false;
			if (otherRange.startLineNumber === range.startLineNumber && otherRange.startColumn < range.startColumn) return false;
			if (otherRange.endLineNumber === range.endLineNumber && otherRange.endColumn > range.endColumn) return false;
			return true;
		}
		strictContainsRange(range) {
			return Range.strictContainsRange(this, range);
		}
		static strictContainsRange(range, otherRange) {
			if (otherRange.startLineNumber < range.startLineNumber || otherRange.endLineNumber < range.startLineNumber) return false;
			if (otherRange.startLineNumber > range.endLineNumber || otherRange.endLineNumber > range.endLineNumber) return false;
			if (otherRange.startLineNumber === range.startLineNumber && otherRange.startColumn <= range.startColumn) return false;
			if (otherRange.endLineNumber === range.endLineNumber && otherRange.endColumn >= range.endColumn) return false;
			return true;
		}
		plusRange(range) {
			return Range.plusRange(this, range);
		}
		static plusRange(a, b) {
			let startLineNumber;
			let startColumn;
			let endLineNumber;
			let endColumn;
			if (b.startLineNumber < a.startLineNumber) {
				startLineNumber = b.startLineNumber;
				startColumn = b.startColumn;
			} else if (b.startLineNumber === a.startLineNumber) {
				startLineNumber = b.startLineNumber;
				startColumn = Math.min(b.startColumn, a.startColumn);
			} else {
				startLineNumber = a.startLineNumber;
				startColumn = a.startColumn;
			}
			if (b.endLineNumber > a.endLineNumber) {
				endLineNumber = b.endLineNumber;
				endColumn = b.endColumn;
			} else if (b.endLineNumber === a.endLineNumber) {
				endLineNumber = b.endLineNumber;
				endColumn = Math.max(b.endColumn, a.endColumn);
			} else {
				endLineNumber = a.endLineNumber;
				endColumn = a.endColumn;
			}
			return new Range(startLineNumber, startColumn, endLineNumber, endColumn);
		}
		intersectRanges(range) {
			return Range.intersectRanges(this, range);
		}
		static intersectRanges(a, b) {
			let resultStartLineNumber = a.startLineNumber;
			let resultStartColumn = a.startColumn;
			let resultEndLineNumber = a.endLineNumber;
			let resultEndColumn = a.endColumn;
			const otherStartLineNumber = b.startLineNumber;
			const otherStartColumn = b.startColumn;
			const otherEndLineNumber = b.endLineNumber;
			const otherEndColumn = b.endColumn;
			if (resultStartLineNumber < otherStartLineNumber) {
				resultStartLineNumber = otherStartLineNumber;
				resultStartColumn = otherStartColumn;
			} else if (resultStartLineNumber === otherStartLineNumber) resultStartColumn = Math.max(resultStartColumn, otherStartColumn);
			if (resultEndLineNumber > otherEndLineNumber) {
				resultEndLineNumber = otherEndLineNumber;
				resultEndColumn = otherEndColumn;
			} else if (resultEndLineNumber === otherEndLineNumber) resultEndColumn = Math.min(resultEndColumn, otherEndColumn);
			if (resultStartLineNumber > resultEndLineNumber) return null;
			if (resultStartLineNumber === resultEndLineNumber && resultStartColumn > resultEndColumn) return null;
			return new Range(resultStartLineNumber, resultStartColumn, resultEndLineNumber, resultEndColumn);
		}
		equalsRange(other) {
			return Range.equalsRange(this, other);
		}
		static equalsRange(a, b) {
			if (!a && !b) return true;
			return !!a && !!b && a.startLineNumber === b.startLineNumber && a.startColumn === b.startColumn && a.endLineNumber === b.endLineNumber && a.endColumn === b.endColumn;
		}
		getEndPosition() {
			return Range.getEndPosition(this);
		}
		static getEndPosition(range) {
			return new Position(range.endLineNumber, range.endColumn);
		}
		getStartPosition() {
			return Range.getStartPosition(this);
		}
		static getStartPosition(range) {
			return new Position(range.startLineNumber, range.startColumn);
		}
		collapseToStart() {
			return Range.collapseToStart(this);
		}
		static collapseToStart(range) {
			return new Range(range.startLineNumber, range.startColumn, range.startLineNumber, range.startColumn);
		}
		collapseToEnd() {
			return Range.collapseToEnd(this);
		}
		static collapseToEnd(range) {
			return new Range(range.endLineNumber, range.endColumn, range.endLineNumber, range.endColumn);
		}
		static fromPositions(start, end = start) {
			return new Range(start.lineNumber, start.column, end.lineNumber, end.column);
		}
	};
	function findLastMonotonous(array, predicate) {
		const idx = findLastIdxMonotonous(array, predicate);
		return idx === -1 ? void 0 : array[idx];
	}
	function findLastIdxMonotonous(array, predicate, startIdx = 0, endIdxEx = array.length) {
		let i = startIdx;
		let j = endIdxEx;
		while (i < j) {
			const k = Math.floor((i + j) / 2);
			if (predicate(array[k])) i = k + 1;
			else j = k;
		}
		return i - 1;
	}
	function findFirstMonotonous(array, predicate) {
		const idx = findFirstIdxMonotonousOrArrLen(array, predicate);
		return idx === array.length ? void 0 : array[idx];
	}
	function findFirstIdxMonotonousOrArrLen(array, predicate, startIdx = 0, endIdxEx = array.length) {
		let i = startIdx;
		let j = endIdxEx;
		while (i < j) {
			const k = Math.floor((i + j) / 2);
			if (predicate(array[k])) j = k;
			else i = k + 1;
		}
		return i;
	}
	var MonotonousArray = class MonotonousArray {
		constructor(_array) {
			this._array = _array;
			this._findLastMonotonousLastIdx = 0;
		}
		static #_ = this.assertInvariants = false;
		findLastMonotonous(predicate) {
			if (MonotonousArray.assertInvariants) {
				if (this._prevFindLastPredicate) {
					for (const item of this._array) if (this._prevFindLastPredicate(item) && !predicate(item)) throw new Error("MonotonousArray: current predicate must be weaker than (or equal to) the previous predicate.");
				}
				this._prevFindLastPredicate = predicate;
			}
			const idx = findLastIdxMonotonous(this._array, predicate, this._findLastMonotonousLastIdx);
			this._findLastMonotonousLastIdx = idx + 1;
			return idx === -1 ? void 0 : this._array[idx];
		}
	};
	var LineRange = class LineRange {
		static fromRangeInclusive(range) {
			return new LineRange(range.startLineNumber, range.endLineNumber + 1);
		}
		static join(lineRanges) {
			if (lineRanges.length === 0) throw new BugIndicatingError("lineRanges cannot be empty");
			let startLineNumber = lineRanges[0].startLineNumber;
			let endLineNumberExclusive = lineRanges[0].endLineNumberExclusive;
			for (let i = 1; i < lineRanges.length; i++) {
				startLineNumber = Math.min(startLineNumber, lineRanges[i].startLineNumber);
				endLineNumberExclusive = Math.max(endLineNumberExclusive, lineRanges[i].endLineNumberExclusive);
			}
			return new LineRange(startLineNumber, endLineNumberExclusive);
		}
		static ofLength(startLineNumber, length) {
			return new LineRange(startLineNumber, startLineNumber + length);
		}
		constructor(startLineNumber, endLineNumberExclusive) {
			if (startLineNumber > endLineNumberExclusive) throw new BugIndicatingError(`startLineNumber ${startLineNumber} cannot be after endLineNumberExclusive ${endLineNumberExclusive}`);
			this.startLineNumber = startLineNumber;
			this.endLineNumberExclusive = endLineNumberExclusive;
		}
		get isEmpty() {
			return this.startLineNumber === this.endLineNumberExclusive;
		}
		delta(offset) {
			return new LineRange(this.startLineNumber + offset, this.endLineNumberExclusive + offset);
		}
		get length() {
			return this.endLineNumberExclusive - this.startLineNumber;
		}
		join(other) {
			return new LineRange(Math.min(this.startLineNumber, other.startLineNumber), Math.max(this.endLineNumberExclusive, other.endLineNumberExclusive));
		}
		intersect(other) {
			const startLineNumber = Math.max(this.startLineNumber, other.startLineNumber);
			const endLineNumberExclusive = Math.min(this.endLineNumberExclusive, other.endLineNumberExclusive);
			if (startLineNumber <= endLineNumberExclusive) return new LineRange(startLineNumber, endLineNumberExclusive);
		}
		overlapOrTouch(other) {
			return this.startLineNumber <= other.endLineNumberExclusive && other.startLineNumber <= this.endLineNumberExclusive;
		}
		toInclusiveRange() {
			if (this.isEmpty) return null;
			return new Range(this.startLineNumber, 1, this.endLineNumberExclusive - 1, Number.MAX_SAFE_INTEGER);
		}
		toOffsetRange() {
			return new OffsetRange(this.startLineNumber - 1, this.endLineNumberExclusive - 1);
		}
	};
	var LineRangeSet = class LineRangeSet {
		constructor(_normalizedRanges = []) {
			this._normalizedRanges = _normalizedRanges;
		}
		get ranges() {
			return this._normalizedRanges;
		}
		addRange(range) {
			if (range.length === 0) return;
			const joinRangeStartIdx = findFirstIdxMonotonousOrArrLen(this._normalizedRanges, (r) => r.endLineNumberExclusive >= range.startLineNumber);
			const joinRangeEndIdxExclusive = findLastIdxMonotonous(this._normalizedRanges, (r) => r.startLineNumber <= range.endLineNumberExclusive) + 1;
			if (joinRangeStartIdx === joinRangeEndIdxExclusive) this._normalizedRanges.splice(joinRangeStartIdx, 0, range);
			else if (joinRangeStartIdx === joinRangeEndIdxExclusive - 1) {
				const joinRange = this._normalizedRanges[joinRangeStartIdx];
				this._normalizedRanges[joinRangeStartIdx] = joinRange.join(range);
			} else {
				const joinRange = this._normalizedRanges[joinRangeStartIdx].join(this._normalizedRanges[joinRangeEndIdxExclusive - 1]).join(range);
				this._normalizedRanges.splice(joinRangeStartIdx, joinRangeEndIdxExclusive - joinRangeStartIdx, joinRange);
			}
		}
		contains(lineNumber) {
			const rangeThatStartsBeforeEnd = findLastMonotonous(this._normalizedRanges, (r) => r.startLineNumber <= lineNumber);
			return !!rangeThatStartsBeforeEnd && rangeThatStartsBeforeEnd.endLineNumberExclusive > lineNumber;
		}
		subtractFrom(range) {
			const joinRangeStartIdx = findFirstIdxMonotonousOrArrLen(this._normalizedRanges, (r) => r.endLineNumberExclusive >= range.startLineNumber);
			const joinRangeEndIdxExclusive = findLastIdxMonotonous(this._normalizedRanges, (r) => r.startLineNumber <= range.endLineNumberExclusive) + 1;
			if (joinRangeStartIdx === joinRangeEndIdxExclusive) return new LineRangeSet([range]);
			const result = [];
			let startLineNumber = range.startLineNumber;
			for (let i = joinRangeStartIdx; i < joinRangeEndIdxExclusive; i++) {
				const r = this._normalizedRanges[i];
				if (r.startLineNumber > startLineNumber) result.push(new LineRange(startLineNumber, r.startLineNumber));
				startLineNumber = r.endLineNumberExclusive;
			}
			if (startLineNumber < range.endLineNumberExclusive) result.push(new LineRange(startLineNumber, range.endLineNumberExclusive));
			return new LineRangeSet(result);
		}
		getIntersection(other) {
			const result = [];
			let i1 = 0;
			let i2 = 0;
			while (i1 < this._normalizedRanges.length && i2 < other._normalizedRanges.length) {
				const r1 = this._normalizedRanges[i1];
				const r2 = other._normalizedRanges[i2];
				const i = r1.intersect(r2);
				if (i && !i.isEmpty) result.push(i);
				if (r1.endLineNumberExclusive < r2.endLineNumberExclusive) i1++;
				else i2++;
			}
			return new LineRangeSet(result);
		}
		getWithDelta(value) {
			return new LineRangeSet(this._normalizedRanges.map((r) => r.delta(value)));
		}
	};
	var TextLength = class TextLength {
		constructor(lineCount, columnCount) {
			this.lineCount = lineCount;
			this.columnCount = columnCount;
		}
		static #_ = this.zero = new TextLength(0, 0);
		toLineRange() {
			return LineRange.ofLength(1, this.lineCount);
		}
		addToPosition(position) {
			if (this.lineCount === 0) return new Position(position.lineNumber, position.column + this.columnCount);
			else return new Position(position.lineNumber + this.lineCount, this.columnCount + 1);
		}
	};
	var LineBasedText = class {
		constructor(_getLineContent, _lineCount) {
			assert(_lineCount >= 1);
			this._getLineContent = _getLineContent;
			this._lineCount = _lineCount;
		}
		getValueOfRange(range) {
			if (range.startLineNumber === range.endLineNumber) return this._getLineContent(range.startLineNumber).substring(range.startColumn - 1, range.endColumn - 1);
			let result = this._getLineContent(range.startLineNumber).substring(range.startColumn - 1);
			for (let i = range.startLineNumber + 1; i < range.endLineNumber; i++) result += "\n" + this._getLineContent(i);
			result += "\n" + this._getLineContent(range.endLineNumber).substring(0, range.endColumn - 1);
			return result;
		}
		getLineLength(lineNumber) {
			return this._getLineContent(lineNumber).length;
		}
		get length() {
			const lastLine = this._getLineContent(this._lineCount);
			return new TextLength(this._lineCount - 1, lastLine.length);
		}
	};
	var ArrayText = class extends LineBasedText {
		constructor(lines) {
			super((lineNumber) => lines[lineNumber - 1], lines.length);
		}
	};
	var LinesDiff = class {
		constructor(changes, moves, hitTimeout) {
			this.changes = changes;
			this.moves = moves;
			this.hitTimeout = hitTimeout;
		}
	};
	var MovedText = class {
		constructor(lineRangeMapping, changes) {
			this.lineRangeMapping = lineRangeMapping;
			this.changes = changes;
		}
	};
	var LineRangeMapping = class LineRangeMapping {
		constructor(originalRange, modifiedRange) {
			this.original = originalRange;
			this.modified = modifiedRange;
		}
		join(other) {
			return new LineRangeMapping(this.original.join(other.original), this.modified.join(other.modified));
		}
		get changedLineCount() {
			return Math.max(this.original.length, this.modified.length);
		}
		toRangeMapping() {
			const origInclusiveRange = this.original.toInclusiveRange();
			const modInclusiveRange = this.modified.toInclusiveRange();
			if (origInclusiveRange && modInclusiveRange) return new RangeMapping(origInclusiveRange, modInclusiveRange);
			else if (this.original.startLineNumber === 1 || this.modified.startLineNumber === 1) {
				if (!(this.modified.startLineNumber === 1 && this.original.startLineNumber === 1)) throw new BugIndicatingError("not a valid diff");
				return new RangeMapping(new Range(this.original.startLineNumber, 1, this.original.endLineNumberExclusive, 1), new Range(this.modified.startLineNumber, 1, this.modified.endLineNumberExclusive, 1));
			} else return new RangeMapping(new Range(this.original.startLineNumber - 1, Number.MAX_SAFE_INTEGER, this.original.endLineNumberExclusive - 1, Number.MAX_SAFE_INTEGER), new Range(this.modified.startLineNumber - 1, Number.MAX_SAFE_INTEGER, this.modified.endLineNumberExclusive - 1, Number.MAX_SAFE_INTEGER));
		}
		toRangeMapping2(original, modified) {
			if (isValidLineNumber(this.original.endLineNumberExclusive, original) && isValidLineNumber(this.modified.endLineNumberExclusive, modified)) return new RangeMapping(new Range(this.original.startLineNumber, 1, this.original.endLineNumberExclusive, 1), new Range(this.modified.startLineNumber, 1, this.modified.endLineNumberExclusive, 1));
			if (!this.original.isEmpty && !this.modified.isEmpty) return new RangeMapping(Range.fromPositions(new Position(this.original.startLineNumber, 1), normalizePosition(new Position(this.original.endLineNumberExclusive - 1, Number.MAX_SAFE_INTEGER), original)), Range.fromPositions(new Position(this.modified.startLineNumber, 1), normalizePosition(new Position(this.modified.endLineNumberExclusive - 1, Number.MAX_SAFE_INTEGER), modified)));
			if (this.original.startLineNumber > 1 && this.modified.startLineNumber > 1) return new RangeMapping(Range.fromPositions(normalizePosition(new Position(this.original.startLineNumber - 1, Number.MAX_SAFE_INTEGER), original), normalizePosition(new Position(this.original.endLineNumberExclusive - 1, Number.MAX_SAFE_INTEGER), original)), Range.fromPositions(normalizePosition(new Position(this.modified.startLineNumber - 1, Number.MAX_SAFE_INTEGER), modified), normalizePosition(new Position(this.modified.endLineNumberExclusive - 1, Number.MAX_SAFE_INTEGER), modified)));
			throw new BugIndicatingError();
		}
	};
	function normalizePosition(position, content) {
		if (position.lineNumber < 1) return new Position(1, 1);
		if (position.lineNumber > content.length) return new Position(content.length, content[content.length - 1].length + 1);
		const line = content[position.lineNumber - 1];
		if (position.column > line.length + 1) return new Position(position.lineNumber, line.length + 1);
		return position;
	}
	function isValidLineNumber(lineNumber, lines) {
		return lineNumber >= 1 && lineNumber <= lines.length;
	}
	var DetailedLineRangeMapping = class DetailedLineRangeMapping extends LineRangeMapping {
		static fromRangeMappings(rangeMappings) {
			return new DetailedLineRangeMapping(LineRange.join(rangeMappings.map((r) => LineRange.fromRangeInclusive(r.originalRange))), LineRange.join(rangeMappings.map((r) => LineRange.fromRangeInclusive(r.modifiedRange))), rangeMappings);
		}
		constructor(originalRange, modifiedRange, innerChanges) {
			super(originalRange, modifiedRange);
			this.innerChanges = innerChanges;
		}
		flip() {
			return new DetailedLineRangeMapping(this.modified, this.original, this.innerChanges?.map((c) => c.flip()));
		}
		withInnerChangesFromLineRanges() {
			return new DetailedLineRangeMapping(this.original, this.modified, [this.toRangeMapping()]);
		}
	};
	var RangeMapping = class RangeMapping {
		static join(rangeMappings) {
			if (rangeMappings.length === 0) throw new BugIndicatingError("Cannot join an empty list of range mappings");
			let result = rangeMappings[0];
			for (let i = 1; i < rangeMappings.length; i++) result = result.join(rangeMappings[i]);
			return result;
		}
		static assertSorted(rangeMappings) {
			for (let i = 1; i < rangeMappings.length; i++) {
				const previous = rangeMappings[i - 1];
				const current = rangeMappings[i];
				if (!(previous.originalRange.getEndPosition().isBeforeOrEqual(current.originalRange.getStartPosition()) && previous.modifiedRange.getEndPosition().isBeforeOrEqual(current.modifiedRange.getStartPosition()))) throw new BugIndicatingError("Range mappings must be sorted");
			}
		}
		constructor(originalRange, modifiedRange) {
			this.originalRange = originalRange;
			this.modifiedRange = modifiedRange;
		}
		flip() {
			return new RangeMapping(this.modifiedRange, this.originalRange);
		}
		join(other) {
			return new RangeMapping(this.originalRange.plusRange(other.originalRange), this.modifiedRange.plusRange(other.modifiedRange));
		}
	};
	function lineRangeMappingFromRangeMappings(alignments, originalLines, modifiedLines, dontAssertStartLine = false) {
		const changes = [];
		for (const g of groupAdjacentBy(alignments.map((a) => getLineRangeMapping(a, originalLines, modifiedLines)), (a1, a2) => a1.original.overlapOrTouch(a2.original) || a1.modified.overlapOrTouch(a2.modified))) {
			const first = g[0];
			const last = g[g.length - 1];
			changes.push(new DetailedLineRangeMapping(first.original.join(last.original), first.modified.join(last.modified), g.map((a) => a.innerChanges[0])));
		}
		assertFn(() => {
			if (!dontAssertStartLine && changes.length > 0) {
				if (changes[0].modified.startLineNumber !== changes[0].original.startLineNumber) return false;
				if (modifiedLines.length.lineCount - changes[changes.length - 1].modified.endLineNumberExclusive !== originalLines.length.lineCount - changes[changes.length - 1].original.endLineNumberExclusive) return false;
			}
			return checkAdjacentItems(changes, (m1, m2) => m2.original.startLineNumber - m1.original.endLineNumberExclusive === m2.modified.startLineNumber - m1.modified.endLineNumberExclusive && m1.original.endLineNumberExclusive < m2.original.startLineNumber && m1.modified.endLineNumberExclusive < m2.modified.startLineNumber);
		});
		return changes;
	}
	function getLineRangeMapping(rangeMapping, originalLines, modifiedLines) {
		let lineStartDelta = 0;
		let lineEndDelta = 0;
		if (rangeMapping.modifiedRange.endColumn === 1 && rangeMapping.originalRange.endColumn === 1 && rangeMapping.originalRange.startLineNumber + lineStartDelta <= rangeMapping.originalRange.endLineNumber && rangeMapping.modifiedRange.startLineNumber + lineStartDelta <= rangeMapping.modifiedRange.endLineNumber) lineEndDelta = -1;
		if (rangeMapping.modifiedRange.startColumn - 1 >= modifiedLines.getLineLength(rangeMapping.modifiedRange.startLineNumber) && rangeMapping.originalRange.startColumn - 1 >= originalLines.getLineLength(rangeMapping.originalRange.startLineNumber) && rangeMapping.originalRange.startLineNumber <= rangeMapping.originalRange.endLineNumber + lineEndDelta && rangeMapping.modifiedRange.startLineNumber <= rangeMapping.modifiedRange.endLineNumber + lineEndDelta) lineStartDelta = 1;
		return new DetailedLineRangeMapping(new LineRange(rangeMapping.originalRange.startLineNumber + lineStartDelta, rangeMapping.originalRange.endLineNumber + 1 + lineEndDelta), new LineRange(rangeMapping.modifiedRange.startLineNumber + lineStartDelta, rangeMapping.modifiedRange.endLineNumber + 1 + lineEndDelta), [rangeMapping]);
	}
	var DiffAlgorithmResult = class DiffAlgorithmResult {
		constructor(diffs, hitTimeout) {
			this.diffs = diffs;
			this.hitTimeout = hitTimeout;
		}
		static trivial(seq1, seq2) {
			return new DiffAlgorithmResult([new SequenceDiff(OffsetRange.ofLength(seq1.length), OffsetRange.ofLength(seq2.length))], false);
		}
		static trivialTimedOut(seq1, seq2) {
			return new DiffAlgorithmResult([new SequenceDiff(OffsetRange.ofLength(seq1.length), OffsetRange.ofLength(seq2.length))], true);
		}
	};
	var SequenceDiff = class SequenceDiff {
		constructor(seq1Range, seq2Range) {
			this.seq1Range = seq1Range;
			this.seq2Range = seq2Range;
		}
		static invert(sequenceDiffs, doc1Length) {
			const result = [];
			forEachAdjacent(sequenceDiffs, (a, b) => {
				result.push(SequenceDiff.fromOffsetPairs(a ? a.getEndExclusives() : OffsetPair.zero, b ? b.getStarts() : new OffsetPair(doc1Length, (a ? a.seq2Range.endExclusive - a.seq1Range.endExclusive : 0) + doc1Length)));
			});
			return result;
		}
		static fromOffsetPairs(start, endExclusive) {
			return new SequenceDiff(new OffsetRange(start.offset1, endExclusive.offset1), new OffsetRange(start.offset2, endExclusive.offset2));
		}
		static assertSorted(sequenceDiffs) {
			let last = void 0;
			for (const cur of sequenceDiffs) {
				if (last) {
					if (!(last.seq1Range.endExclusive <= cur.seq1Range.start && last.seq2Range.endExclusive <= cur.seq2Range.start)) throw new BugIndicatingError("Sequence diffs must be sorted");
				}
				last = cur;
			}
		}
		swap() {
			return new SequenceDiff(this.seq2Range, this.seq1Range);
		}
		join(other) {
			return new SequenceDiff(this.seq1Range.join(other.seq1Range), this.seq2Range.join(other.seq2Range));
		}
		delta(offset) {
			if (offset === 0) return this;
			return new SequenceDiff(this.seq1Range.delta(offset), this.seq2Range.delta(offset));
		}
		deltaStart(offset) {
			if (offset === 0) return this;
			return new SequenceDiff(this.seq1Range.deltaStart(offset), this.seq2Range.deltaStart(offset));
		}
		deltaEnd(offset) {
			if (offset === 0) return this;
			return new SequenceDiff(this.seq1Range.deltaEnd(offset), this.seq2Range.deltaEnd(offset));
		}
		intersect(other) {
			const i1 = this.seq1Range.intersect(other.seq1Range);
			const i2 = this.seq2Range.intersect(other.seq2Range);
			if (!i1 || !i2) return;
			return new SequenceDiff(i1, i2);
		}
		getStarts() {
			return new OffsetPair(this.seq1Range.start, this.seq2Range.start);
		}
		getEndExclusives() {
			return new OffsetPair(this.seq1Range.endExclusive, this.seq2Range.endExclusive);
		}
	};
	var OffsetPair = class OffsetPair {
		constructor(offset1, offset2) {
			this.offset1 = offset1;
			this.offset2 = offset2;
		}
		static #_ = this.zero = new OffsetPair(0, 0);
		static #_2 = this.max = new OffsetPair(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
		delta(offset) {
			if (offset === 0) return this;
			return new OffsetPair(this.offset1 + offset, this.offset2 + offset);
		}
		equals(other) {
			return this.offset1 === other.offset1 && this.offset2 === other.offset2;
		}
	};
	var InfiniteTimeout = class InfiniteTimeout {
		static #_ = this.instance = new InfiniteTimeout();
		isValid() {
			return true;
		}
	};
	var DateTimeout = class {
		constructor(timeout) {
			this.timeout = timeout;
			this.startTime = Date.now();
			this.valid = true;
			if (timeout <= 0) throw new BugIndicatingError("timeout must be positive");
		}
		isValid() {
			if (!(Date.now() - this.startTime < this.timeout) && this.valid) this.valid = false;
			return this.valid;
		}
		disable() {
			this.timeout = Number.MAX_SAFE_INTEGER;
			this.isValid = () => true;
			this.valid = true;
		}
	};
	var Array2D = class {
		constructor(width, height) {
			this.width = width;
			this.height = height;
			this.array = [];
			this.array = new Array(width * height);
		}
		get(x, y) {
			return this.array[x + y * this.width];
		}
		set(x, y, value) {
			this.array[x + y * this.width] = value;
		}
	};
	function isSpace(charCode) {
		return charCode === 32 || charCode === 9;
	}
	var LineRangeFragment = class LineRangeFragment {
		constructor(range, lines, source) {
			this.range = range;
			this.lines = lines;
			this.source = source;
			this.histogram = [];
			let counter = 0;
			for (let i = range.startLineNumber - 1; i < range.endLineNumberExclusive - 1; i++) {
				const line = lines[i];
				for (let j = 0; j < line.length; j++) {
					counter++;
					const chr = line[j];
					const key2 = LineRangeFragment.getKey(chr);
					this.histogram[key2] = (this.histogram[key2] || 0) + 1;
				}
				counter++;
				const key = LineRangeFragment.getKey("\n");
				this.histogram[key] = (this.histogram[key] || 0) + 1;
			}
			this.totalCount = counter;
		}
		static #_ = this.chrKeys = /* @__PURE__ */ new Map();
		static getKey(chr) {
			let key = this.chrKeys.get(chr);
			if (key === void 0) {
				key = this.chrKeys.size;
				this.chrKeys.set(chr, key);
			}
			return key;
		}
		computeSimilarity(other) {
			let sumDifferences = 0;
			const maxLength = Math.max(this.histogram.length, other.histogram.length);
			for (let i = 0; i < maxLength; i++) sumDifferences += Math.abs((this.histogram[i] ?? 0) - (other.histogram[i] ?? 0));
			return 1 - sumDifferences / (this.totalCount + other.totalCount);
		}
	};
	var DynamicProgrammingDiffing = class {
		compute(sequence1, sequence2, timeout = InfiniteTimeout.instance, equalityScore) {
			if (sequence1.length === 0 || sequence2.length === 0) return DiffAlgorithmResult.trivial(sequence1, sequence2);
			const lcsLengths = new Array2D(sequence1.length, sequence2.length);
			const directions = new Array2D(sequence1.length, sequence2.length);
			const lengths = new Array2D(sequence1.length, sequence2.length);
			for (let s12 = 0; s12 < sequence1.length; s12++) for (let s22 = 0; s22 < sequence2.length; s22++) {
				if (!timeout.isValid()) return DiffAlgorithmResult.trivialTimedOut(sequence1, sequence2);
				const horizontalLen = s12 === 0 ? 0 : lcsLengths.get(s12 - 1, s22);
				const verticalLen = s22 === 0 ? 0 : lcsLengths.get(s12, s22 - 1);
				let extendedSeqScore;
				if (sequence1.getElement(s12) === sequence2.getElement(s22)) {
					if (s12 === 0 || s22 === 0) extendedSeqScore = 0;
					else extendedSeqScore = lcsLengths.get(s12 - 1, s22 - 1);
					if (s12 > 0 && s22 > 0 && directions.get(s12 - 1, s22 - 1) === 3) extendedSeqScore += lengths.get(s12 - 1, s22 - 1);
					extendedSeqScore += equalityScore ? equalityScore(s12, s22) : 1;
				} else extendedSeqScore = -1;
				const newValue = Math.max(horizontalLen, verticalLen, extendedSeqScore);
				if (newValue === extendedSeqScore) {
					const prevLen = s12 > 0 && s22 > 0 ? lengths.get(s12 - 1, s22 - 1) : 0;
					lengths.set(s12, s22, prevLen + 1);
					directions.set(s12, s22, 3);
				} else if (newValue === horizontalLen) {
					lengths.set(s12, s22, 0);
					directions.set(s12, s22, 1);
				} else if (newValue === verticalLen) {
					lengths.set(s12, s22, 0);
					directions.set(s12, s22, 2);
				}
				lcsLengths.set(s12, s22, newValue);
			}
			const result = [];
			let lastAligningPosS1 = sequence1.length;
			let lastAligningPosS2 = sequence2.length;
			function reportDecreasingAligningPositions(s12, s22) {
				if (s12 + 1 !== lastAligningPosS1 || s22 + 1 !== lastAligningPosS2) result.push(new SequenceDiff(new OffsetRange(s12 + 1, lastAligningPosS1), new OffsetRange(s22 + 1, lastAligningPosS2)));
				lastAligningPosS1 = s12;
				lastAligningPosS2 = s22;
			}
			let s1 = sequence1.length - 1;
			let s2 = sequence2.length - 1;
			while (s1 >= 0 && s2 >= 0) if (directions.get(s1, s2) === 3) {
				reportDecreasingAligningPositions(s1, s2);
				s1--;
				s2--;
			} else if (directions.get(s1, s2) === 1) s1--;
			else s2--;
			reportDecreasingAligningPositions(-1, -1);
			result.reverse();
			return new DiffAlgorithmResult(result, false);
		}
	};
	var MyersDiffAlgorithm = class {
		compute(seq1, seq2, timeout = InfiniteTimeout.instance) {
			if (seq1.length === 0 || seq2.length === 0) return DiffAlgorithmResult.trivial(seq1, seq2);
			const seqX = seq1;
			const seqY = seq2;
			function getXAfterSnake(x, y) {
				while (x < seqX.length && y < seqY.length && seqX.getElement(x) === seqY.getElement(y)) {
					x++;
					y++;
				}
				return x;
			}
			let d = 0;
			const V = new FastInt32Array();
			V.set(0, getXAfterSnake(0, 0));
			const paths = new FastArrayNegativeIndices();
			paths.set(0, V.get(0) === 0 ? null : new SnakePath(null, 0, 0, V.get(0)));
			let k = 0;
			loop: while (true) {
				d++;
				if (!timeout.isValid()) return DiffAlgorithmResult.trivialTimedOut(seqX, seqY);
				const lowerBound = -Math.min(d, seqY.length + d % 2);
				const upperBound = Math.min(d, seqX.length + d % 2);
				for (k = lowerBound; k <= upperBound; k += 2) {
					const maxXofDLineTop = k === upperBound ? -1 : V.get(k + 1);
					const maxXofDLineLeft = k === lowerBound ? -1 : V.get(k - 1) + 1;
					const x = Math.min(Math.max(maxXofDLineTop, maxXofDLineLeft), seqX.length);
					const y = x - k;
					if (x > seqX.length || y > seqY.length) continue;
					const newMaxX = getXAfterSnake(x, y);
					V.set(k, newMaxX);
					const lastPath = x === maxXofDLineTop ? paths.get(k + 1) : paths.get(k - 1);
					paths.set(k, newMaxX !== x ? new SnakePath(lastPath, x, y, newMaxX - x) : lastPath);
					if (V.get(k) === seqX.length && V.get(k) - k === seqY.length) break loop;
				}
			}
			let path = paths.get(k);
			const result = [];
			let lastAligningPosS1 = seqX.length;
			let lastAligningPosS2 = seqY.length;
			while (true) {
				const endX = path ? path.x + path.length : 0;
				const endY = path ? path.y + path.length : 0;
				if (endX !== lastAligningPosS1 || endY !== lastAligningPosS2) result.push(new SequenceDiff(new OffsetRange(endX, lastAligningPosS1), new OffsetRange(endY, lastAligningPosS2)));
				if (!path) break;
				lastAligningPosS1 = path.x;
				lastAligningPosS2 = path.y;
				path = path.prev;
			}
			result.reverse();
			return new DiffAlgorithmResult(result, false);
		}
	};
	var SnakePath = class {
		constructor(prev, x, y, length) {
			this.prev = prev;
			this.x = x;
			this.y = y;
			this.length = length;
		}
	};
	var FastInt32Array = class {
		constructor() {
			this.positiveArr = new Int32Array(10);
			this.negativeArr = new Int32Array(10);
		}
		get(idx) {
			if (idx < 0) {
				idx = -idx - 1;
				return this.negativeArr[idx];
			} else return this.positiveArr[idx];
		}
		set(idx, value) {
			if (idx < 0) {
				idx = -idx - 1;
				if (idx >= this.negativeArr.length) {
					const arr = this.negativeArr;
					this.negativeArr = new Int32Array(arr.length * 2);
					this.negativeArr.set(arr);
				}
				this.negativeArr[idx] = value;
			} else {
				if (idx >= this.positiveArr.length) {
					const arr = this.positiveArr;
					this.positiveArr = new Int32Array(arr.length * 2);
					this.positiveArr.set(arr);
				}
				this.positiveArr[idx] = value;
			}
		}
	};
	var FastArrayNegativeIndices = class {
		constructor() {
			this.positiveArr = [];
			this.negativeArr = [];
		}
		get(idx) {
			if (idx < 0) {
				idx = -idx - 1;
				return this.negativeArr[idx];
			} else return this.positiveArr[idx];
		}
		set(idx, value) {
			if (idx < 0) {
				idx = -idx - 1;
				this.negativeArr[idx] = value;
			} else this.positiveArr[idx] = value;
		}
	};
	var SetMap = class {
		constructor() {
			this.map = /* @__PURE__ */ new Map();
		}
		add(key, value) {
			let values = this.map.get(key);
			if (!values) {
				values = /* @__PURE__ */ new Set();
				this.map.set(key, values);
			}
			values.add(value);
		}
		forEach(key, fn) {
			const values = this.map.get(key);
			if (!values) return;
			values.forEach(fn);
		}
		get(key) {
			const values = this.map.get(key);
			if (!values) return /* @__PURE__ */ new Set();
			return values;
		}
	};
	var LinesSliceCharSequence = class {
		constructor(lines, range, considerWhitespaceChanges) {
			this.lines = lines;
			this.range = range;
			this.considerWhitespaceChanges = considerWhitespaceChanges;
			this.elements = [];
			this.firstElementOffsetByLineIdx = [];
			this.lineStartOffsets = [];
			this.trimmedWsLengthsByLineIdx = [];
			this.firstElementOffsetByLineIdx.push(0);
			for (let lineNumber = this.range.startLineNumber; lineNumber <= this.range.endLineNumber; lineNumber++) {
				let line = lines[lineNumber - 1];
				let lineStartOffset = 0;
				if (lineNumber === this.range.startLineNumber && this.range.startColumn > 1) {
					lineStartOffset = this.range.startColumn - 1;
					line = line.substring(lineStartOffset);
				}
				this.lineStartOffsets.push(lineStartOffset);
				let trimmedWsLength = 0;
				if (!considerWhitespaceChanges) {
					const trimmedStartLine = line.trimStart();
					trimmedWsLength = line.length - trimmedStartLine.length;
					line = trimmedStartLine.trimEnd();
				}
				this.trimmedWsLengthsByLineIdx.push(trimmedWsLength);
				const lineLength = lineNumber === this.range.endLineNumber ? Math.min(this.range.endColumn - 1 - lineStartOffset - trimmedWsLength, line.length) : line.length;
				for (let i = 0; i < lineLength; i++) this.elements.push(line.charCodeAt(i));
				if (lineNumber < this.range.endLineNumber) {
					this.elements.push("\n".charCodeAt(0));
					this.firstElementOffsetByLineIdx.push(this.elements.length);
				}
			}
		}
		toString() {
			return `Slice: "${this.text}"`;
		}
		get text() {
			return this.getText(new OffsetRange(0, this.length));
		}
		getText(range) {
			return this.elements.slice(range.start, range.endExclusive).map((e) => String.fromCharCode(e)).join("");
		}
		getElement(offset) {
			return this.elements[offset];
		}
		get length() {
			return this.elements.length;
		}
		getBoundaryScore(length) {
			const prevCategory = getCategory(length > 0 ? this.elements[length - 1] : -1);
			const nextCategory = getCategory(length < this.elements.length ? this.elements[length] : -1);
			if (prevCategory === 7 && nextCategory === 8) return 0;
			if (prevCategory === 8) return 150;
			let score2 = 0;
			if (prevCategory !== nextCategory) {
				score2 += 10;
				if (prevCategory === 0 && nextCategory === 1) score2 += 1;
			}
			score2 += getCategoryBoundaryScore(prevCategory);
			score2 += getCategoryBoundaryScore(nextCategory);
			return score2;
		}
		translateOffset(offset, preference = "right") {
			const i = findLastIdxMonotonous(this.firstElementOffsetByLineIdx, (value) => value <= offset);
			const lineOffset = offset - this.firstElementOffsetByLineIdx[i];
			return new Position(this.range.startLineNumber + i, 1 + this.lineStartOffsets[i] + lineOffset + (lineOffset === 0 && preference === "left" ? 0 : this.trimmedWsLengthsByLineIdx[i]));
		}
		translateRange(range) {
			const pos1 = this.translateOffset(range.start, "right");
			const pos2 = this.translateOffset(range.endExclusive, "left");
			if (pos2.isBefore(pos1)) return Range.fromPositions(pos2, pos2);
			return Range.fromPositions(pos1, pos2);
		}
		findWordContaining(offset) {
			if (offset < 0 || offset >= this.elements.length) return;
			if (!isWordChar(this.elements[offset])) return;
			let start = offset;
			while (start > 0 && isWordChar(this.elements[start - 1])) start--;
			let end = offset;
			while (end < this.elements.length && isWordChar(this.elements[end])) end++;
			return new OffsetRange(start, end);
		}
		findSubWordContaining(offset) {
			if (offset < 0 || offset >= this.elements.length) return;
			if (!isWordChar(this.elements[offset])) return;
			let start = offset;
			while (start > 0 && isWordChar(this.elements[start - 1]) && !isUpperCase(this.elements[start])) start--;
			let end = offset;
			while (end < this.elements.length && isWordChar(this.elements[end]) && !isUpperCase(this.elements[end])) end++;
			return new OffsetRange(start, end);
		}
		countLinesIn(range) {
			return this.translateOffset(range.endExclusive).lineNumber - this.translateOffset(range.start).lineNumber;
		}
		isStronglyEqual(offset1, offset2) {
			return this.elements[offset1] === this.elements[offset2];
		}
		extendToFullLines(range) {
			return new OffsetRange(findLastMonotonous(this.firstElementOffsetByLineIdx, (x) => x <= range.start) ?? 0, findFirstMonotonous(this.firstElementOffsetByLineIdx, (x) => range.endExclusive <= x) ?? this.elements.length);
		}
	};
	function isWordChar(charCode) {
		return charCode >= 97 && charCode <= 122 || charCode >= 65 && charCode <= 90 || charCode >= 48 && charCode <= 57;
	}
	function isUpperCase(charCode) {
		return charCode >= 65 && charCode <= 90;
	}
	var score = {
		[0]: 0,
		[1]: 0,
		[2]: 0,
		[3]: 10,
		[4]: 2,
		[5]: 30,
		[6]: 3,
		[7]: 10,
		[8]: 10
	};
	function getCategoryBoundaryScore(category) {
		return score[category];
	}
	function getCategory(charCode) {
		if (charCode === 10) return 8;
		else if (charCode === 13) return 7;
		else if (isSpace(charCode)) return 6;
		else if (charCode >= 97 && charCode <= 122) return 0;
		else if (charCode >= 65 && charCode <= 90) return 1;
		else if (charCode >= 48 && charCode <= 57) return 2;
		else if (charCode === -1) return 3;
		else if (charCode === 44 || charCode === 59) return 5;
		else return 4;
	}
	function computeMovedLines(changes, originalLines, modifiedLines, hashedOriginalLines, hashedModifiedLines, timeout) {
		let { moves, excludedChanges } = computeMovesFromSimpleDeletionsToSimpleInsertions(changes, originalLines, modifiedLines, timeout);
		if (!timeout.isValid()) return [];
		const unchangedMoves = computeUnchangedMoves(changes.filter((c) => !excludedChanges.has(c)), hashedOriginalLines, hashedModifiedLines, originalLines, modifiedLines, timeout);
		pushMany(moves, unchangedMoves);
		moves = joinCloseConsecutiveMoves(moves);
		moves = moves.filter((current) => {
			const lines = current.original.toOffsetRange().slice(originalLines).map((l) => l.trim());
			return lines.join("\n").length >= 15 && countWhere(lines, (l) => l.length >= 2) >= 2;
		});
		moves = removeMovesInSameDiff(changes, moves);
		return moves;
	}
	function countWhere(arr, predicate) {
		let count = 0;
		for (const t of arr) if (predicate(t)) count++;
		return count;
	}
	function computeMovesFromSimpleDeletionsToSimpleInsertions(changes, originalLines, modifiedLines, timeout) {
		const moves = [];
		const deletions = changes.filter((c) => c.modified.isEmpty && c.original.length >= 3).map((d) => new LineRangeFragment(d.original, originalLines, d));
		const insertions = new Set(changes.filter((c) => c.original.isEmpty && c.modified.length >= 3).map((d) => new LineRangeFragment(d.modified, modifiedLines, d)));
		const excludedChanges = /* @__PURE__ */ new Set();
		for (const deletion of deletions) {
			let highestSimilarity = -1;
			let best;
			for (const insertion of insertions) {
				const similarity = deletion.computeSimilarity(insertion);
				if (similarity > highestSimilarity) {
					highestSimilarity = similarity;
					best = insertion;
				}
			}
			if (highestSimilarity > .9 && best) {
				insertions.delete(best);
				moves.push(new LineRangeMapping(deletion.range, best.range));
				excludedChanges.add(deletion.source);
				excludedChanges.add(best.source);
			}
			if (!timeout.isValid()) return {
				moves,
				excludedChanges
			};
		}
		return {
			moves,
			excludedChanges
		};
	}
	function computeUnchangedMoves(changes, hashedOriginalLines, hashedModifiedLines, originalLines, modifiedLines, timeout) {
		const moves = [];
		const original3LineHashes = new SetMap();
		for (const change of changes) for (let i = change.original.startLineNumber; i < change.original.endLineNumberExclusive - 2; i++) {
			const key = `${hashedOriginalLines[i - 1]}:${hashedOriginalLines[i + 1 - 1]}:${hashedOriginalLines[i + 2 - 1]}`;
			original3LineHashes.add(key, { range: new LineRange(i, i + 3) });
		}
		const possibleMappings = [];
		changes.sort(compareBy((c) => c.modified.startLineNumber, numberComparator));
		for (const change of changes) {
			let lastMappings = [];
			for (let i = change.modified.startLineNumber; i < change.modified.endLineNumberExclusive - 2; i++) {
				const key = `${hashedModifiedLines[i - 1]}:${hashedModifiedLines[i + 1 - 1]}:${hashedModifiedLines[i + 2 - 1]}`;
				const currentModifiedRange = new LineRange(i, i + 3);
				const nextMappings = [];
				original3LineHashes.forEach(key, ({ range }) => {
					for (const lastMapping of lastMappings) if (lastMapping.originalLineRange.endLineNumberExclusive + 1 === range.endLineNumberExclusive && lastMapping.modifiedLineRange.endLineNumberExclusive + 1 === currentModifiedRange.endLineNumberExclusive) {
						lastMapping.originalLineRange = new LineRange(lastMapping.originalLineRange.startLineNumber, range.endLineNumberExclusive);
						lastMapping.modifiedLineRange = new LineRange(lastMapping.modifiedLineRange.startLineNumber, currentModifiedRange.endLineNumberExclusive);
						nextMappings.push(lastMapping);
						return;
					}
					const mapping = {
						modifiedLineRange: currentModifiedRange,
						originalLineRange: range
					};
					possibleMappings.push(mapping);
					nextMappings.push(mapping);
				});
				lastMappings = nextMappings;
			}
			if (!timeout.isValid()) return [];
		}
		possibleMappings.sort(reverseOrder(compareBy((m) => m.modifiedLineRange.length, numberComparator)));
		const modifiedSet = new LineRangeSet();
		const originalSet = new LineRangeSet();
		for (const mapping of possibleMappings) {
			const diffOrigToMod = mapping.modifiedLineRange.startLineNumber - mapping.originalLineRange.startLineNumber;
			const modifiedSections = modifiedSet.subtractFrom(mapping.modifiedLineRange);
			const originalTranslatedSections = originalSet.subtractFrom(mapping.originalLineRange).getWithDelta(diffOrigToMod);
			const modifiedIntersectedSections = modifiedSections.getIntersection(originalTranslatedSections);
			for (const s of modifiedIntersectedSections.ranges) {
				if (s.length < 3) continue;
				const modifiedLineRange = s;
				const originalLineRange = s.delta(-diffOrigToMod);
				moves.push(new LineRangeMapping(originalLineRange, modifiedLineRange));
				modifiedSet.addRange(modifiedLineRange);
				originalSet.addRange(originalLineRange);
			}
		}
		moves.sort(compareBy((m) => m.original.startLineNumber, numberComparator));
		const monotonousChanges = new MonotonousArray(changes);
		for (let i = 0; i < moves.length; i++) {
			const move = moves[i];
			const firstTouchingChangeOrig = monotonousChanges.findLastMonotonous((c) => c.original.startLineNumber <= move.original.startLineNumber);
			const firstTouchingChangeMod = findLastMonotonous(changes, (c) => c.modified.startLineNumber <= move.modified.startLineNumber);
			const linesAbove = Math.max(move.original.startLineNumber - firstTouchingChangeOrig.original.startLineNumber, move.modified.startLineNumber - firstTouchingChangeMod.modified.startLineNumber);
			const lastTouchingChangeOrig = monotonousChanges.findLastMonotonous((c) => c.original.startLineNumber < move.original.endLineNumberExclusive);
			const lastTouchingChangeMod = findLastMonotonous(changes, (c) => c.modified.startLineNumber < move.modified.endLineNumberExclusive);
			const linesBelow = Math.max(lastTouchingChangeOrig.original.endLineNumberExclusive - move.original.endLineNumberExclusive, lastTouchingChangeMod.modified.endLineNumberExclusive - move.modified.endLineNumberExclusive);
			let extendToTop;
			for (extendToTop = 0; extendToTop < linesAbove; extendToTop++) {
				const origLine = move.original.startLineNumber - extendToTop - 1;
				const modLine = move.modified.startLineNumber - extendToTop - 1;
				if (origLine > originalLines.length || modLine > modifiedLines.length) break;
				if (modifiedSet.contains(modLine) || originalSet.contains(origLine)) break;
				if (!areLinesSimilar(originalLines[origLine - 1], modifiedLines[modLine - 1], timeout)) break;
			}
			if (extendToTop > 0) {
				originalSet.addRange(new LineRange(move.original.startLineNumber - extendToTop, move.original.startLineNumber));
				modifiedSet.addRange(new LineRange(move.modified.startLineNumber - extendToTop, move.modified.startLineNumber));
			}
			let extendToBottom;
			for (extendToBottom = 0; extendToBottom < linesBelow; extendToBottom++) {
				const origLine = move.original.endLineNumberExclusive + extendToBottom;
				const modLine = move.modified.endLineNumberExclusive + extendToBottom;
				if (origLine > originalLines.length || modLine > modifiedLines.length) break;
				if (modifiedSet.contains(modLine) || originalSet.contains(origLine)) break;
				if (!areLinesSimilar(originalLines[origLine - 1], modifiedLines[modLine - 1], timeout)) break;
			}
			if (extendToBottom > 0) {
				originalSet.addRange(new LineRange(move.original.endLineNumberExclusive, move.original.endLineNumberExclusive + extendToBottom));
				modifiedSet.addRange(new LineRange(move.modified.endLineNumberExclusive, move.modified.endLineNumberExclusive + extendToBottom));
			}
			if (extendToTop > 0 || extendToBottom > 0) moves[i] = new LineRangeMapping(new LineRange(move.original.startLineNumber - extendToTop, move.original.endLineNumberExclusive + extendToBottom), new LineRange(move.modified.startLineNumber - extendToTop, move.modified.endLineNumberExclusive + extendToBottom));
		}
		return moves;
	}
	function areLinesSimilar(line1, line2, timeout) {
		if (line1.trim() === line2.trim()) return true;
		if (line1.length > 300 && line2.length > 300) return false;
		const result = new MyersDiffAlgorithm().compute(new LinesSliceCharSequence([line1], new Range(1, 1, 1, line1.length), false), new LinesSliceCharSequence([line2], new Range(1, 1, 1, line2.length), false), timeout);
		let commonNonSpaceCharCount = 0;
		const inverted = SequenceDiff.invert(result.diffs, line1.length);
		for (const seq of inverted) seq.seq1Range.forEach((idx) => {
			if (!isSpace(line1.charCodeAt(idx))) commonNonSpaceCharCount++;
		});
		function countNonWsChars(str) {
			let count = 0;
			for (let i = 0; i < line1.length; i++) if (!isSpace(str.charCodeAt(i))) count++;
			return count;
		}
		const longerLineLength = countNonWsChars(line1.length > line2.length ? line1 : line2);
		return commonNonSpaceCharCount / longerLineLength > .6 && longerLineLength > 10;
	}
	function joinCloseConsecutiveMoves(moves) {
		if (moves.length === 0) return moves;
		moves.sort(compareBy((m) => m.original.startLineNumber, numberComparator));
		const result = [moves[0]];
		for (let i = 1; i < moves.length; i++) {
			const last = result[result.length - 1];
			const current = moves[i];
			const originalDist = current.original.startLineNumber - last.original.endLineNumberExclusive;
			const modifiedDist = current.modified.startLineNumber - last.modified.endLineNumberExclusive;
			if (originalDist >= 0 && modifiedDist >= 0 && originalDist + modifiedDist <= 2) {
				result[result.length - 1] = last.join(current);
				continue;
			}
			result.push(current);
		}
		return result;
	}
	function removeMovesInSameDiff(changes, moves) {
		const changesMonotonous = new MonotonousArray(changes);
		moves = moves.filter((m) => {
			return (changesMonotonous.findLastMonotonous((c) => c.original.startLineNumber < m.original.endLineNumberExclusive) || new LineRangeMapping(new LineRange(1, 1), new LineRange(1, 1))) !== findLastMonotonous(changes, (c) => c.modified.startLineNumber < m.modified.endLineNumberExclusive);
		});
		return moves;
	}
	function optimizeSequenceDiffs(sequence1, sequence2, sequenceDiffs) {
		let result = sequenceDiffs;
		result = joinSequenceDiffsByShifting(sequence1, sequence2, result);
		result = joinSequenceDiffsByShifting(sequence1, sequence2, result);
		result = shiftSequenceDiffs(sequence1, sequence2, result);
		return result;
	}
	function joinSequenceDiffsByShifting(sequence1, sequence2, sequenceDiffs) {
		if (sequenceDiffs.length === 0) return sequenceDiffs;
		const result = [];
		result.push(sequenceDiffs[0]);
		for (let i = 1; i < sequenceDiffs.length; i++) {
			const prevResult = result[result.length - 1];
			let cur = sequenceDiffs[i];
			if (cur.seq1Range.isEmpty || cur.seq2Range.isEmpty) {
				const length = cur.seq1Range.start - prevResult.seq1Range.endExclusive;
				let d;
				for (d = 1; d <= length; d++) if (sequence1.getElement(cur.seq1Range.start - d) !== sequence1.getElement(cur.seq1Range.endExclusive - d) || sequence2.getElement(cur.seq2Range.start - d) !== sequence2.getElement(cur.seq2Range.endExclusive - d)) break;
				d--;
				if (d === length) {
					result[result.length - 1] = new SequenceDiff(new OffsetRange(prevResult.seq1Range.start, cur.seq1Range.endExclusive - length), new OffsetRange(prevResult.seq2Range.start, cur.seq2Range.endExclusive - length));
					continue;
				}
				cur = cur.delta(-d);
			}
			result.push(cur);
		}
		const result2 = [];
		for (let i = 0; i < result.length - 1; i++) {
			const nextResult = result[i + 1];
			let cur = result[i];
			if (cur.seq1Range.isEmpty || cur.seq2Range.isEmpty) {
				const length = nextResult.seq1Range.start - cur.seq1Range.endExclusive;
				let d;
				for (d = 0; d < length; d++) if (!sequence1.isStronglyEqual(cur.seq1Range.start + d, cur.seq1Range.endExclusive + d) || !sequence2.isStronglyEqual(cur.seq2Range.start + d, cur.seq2Range.endExclusive + d)) break;
				if (d === length) {
					result[i + 1] = new SequenceDiff(new OffsetRange(cur.seq1Range.start + length, nextResult.seq1Range.endExclusive), new OffsetRange(cur.seq2Range.start + length, nextResult.seq2Range.endExclusive));
					continue;
				}
				if (d > 0) cur = cur.delta(d);
			}
			result2.push(cur);
		}
		if (result.length > 0) result2.push(result[result.length - 1]);
		return result2;
	}
	function shiftSequenceDiffs(sequence1, sequence2, sequenceDiffs) {
		if (!sequence1.getBoundaryScore || !sequence2.getBoundaryScore) return sequenceDiffs;
		for (let i = 0; i < sequenceDiffs.length; i++) {
			const prevDiff = i > 0 ? sequenceDiffs[i - 1] : void 0;
			const diff = sequenceDiffs[i];
			const nextDiff = i + 1 < sequenceDiffs.length ? sequenceDiffs[i + 1] : void 0;
			const seq1ValidRange = new OffsetRange(prevDiff ? prevDiff.seq1Range.endExclusive + 1 : 0, nextDiff ? nextDiff.seq1Range.start - 1 : sequence1.length);
			const seq2ValidRange = new OffsetRange(prevDiff ? prevDiff.seq2Range.endExclusive + 1 : 0, nextDiff ? nextDiff.seq2Range.start - 1 : sequence2.length);
			if (diff.seq1Range.isEmpty) sequenceDiffs[i] = shiftDiffToBetterPosition(diff, sequence1, sequence2, seq1ValidRange, seq2ValidRange);
			else if (diff.seq2Range.isEmpty) sequenceDiffs[i] = shiftDiffToBetterPosition(diff.swap(), sequence2, sequence1, seq2ValidRange, seq1ValidRange).swap();
		}
		return sequenceDiffs;
	}
	function shiftDiffToBetterPosition(diff, sequence1, sequence2, seq1ValidRange, seq2ValidRange) {
		const maxShiftLimit = 100;
		let deltaBefore = 1;
		while (diff.seq1Range.start - deltaBefore >= seq1ValidRange.start && diff.seq2Range.start - deltaBefore >= seq2ValidRange.start && sequence2.isStronglyEqual(diff.seq2Range.start - deltaBefore, diff.seq2Range.endExclusive - deltaBefore) && deltaBefore < maxShiftLimit) deltaBefore++;
		deltaBefore--;
		let deltaAfter = 0;
		while (diff.seq1Range.start + deltaAfter < seq1ValidRange.endExclusive && diff.seq2Range.endExclusive + deltaAfter < seq2ValidRange.endExclusive && sequence2.isStronglyEqual(diff.seq2Range.start + deltaAfter, diff.seq2Range.endExclusive + deltaAfter) && deltaAfter < maxShiftLimit) deltaAfter++;
		if (deltaBefore === 0 && deltaAfter === 0) return diff;
		let bestDelta = 0;
		let bestScore = -1;
		for (let delta = -deltaBefore; delta <= deltaAfter; delta++) {
			const seq2OffsetStart = diff.seq2Range.start + delta;
			const seq2OffsetEndExclusive = diff.seq2Range.endExclusive + delta;
			const seq1Offset = diff.seq1Range.start + delta;
			const score$1 = sequence1.getBoundaryScore(seq1Offset) + sequence2.getBoundaryScore(seq2OffsetStart) + sequence2.getBoundaryScore(seq2OffsetEndExclusive);
			if (score$1 > bestScore) {
				bestScore = score$1;
				bestDelta = delta;
			}
		}
		return diff.delta(bestDelta);
	}
	function removeShortMatches(sequence1, sequence2, sequenceDiffs) {
		const result = [];
		for (const s of sequenceDiffs) {
			const last = result[result.length - 1];
			if (!last) {
				result.push(s);
				continue;
			}
			if (s.seq1Range.start - last.seq1Range.endExclusive <= 2 || s.seq2Range.start - last.seq2Range.endExclusive <= 2) result[result.length - 1] = new SequenceDiff(last.seq1Range.join(s.seq1Range), last.seq2Range.join(s.seq2Range));
			else result.push(s);
		}
		return result;
	}
	function extendDiffsToEntireWordIfAppropriate(sequence1, sequence2, sequenceDiffs, findParent, force = false) {
		const equalMappings = SequenceDiff.invert(sequenceDiffs, sequence1.length);
		const additional = [];
		let lastPoint = new OffsetPair(0, 0);
		function scanWord(pair, equalMapping) {
			if (pair.offset1 < lastPoint.offset1 || pair.offset2 < lastPoint.offset2) return;
			const w1 = findParent(sequence1, pair.offset1);
			const w2 = findParent(sequence2, pair.offset2);
			if (!w1 || !w2) return;
			let w = new SequenceDiff(w1, w2);
			const equalPart = w.intersect(equalMapping);
			let equalChars1 = equalPart.seq1Range.length;
			let equalChars2 = equalPart.seq2Range.length;
			while (equalMappings.length > 0) {
				const next = equalMappings[0];
				if (!(next.seq1Range.intersects(w.seq1Range) || next.seq2Range.intersects(w.seq2Range))) break;
				const v = new SequenceDiff(findParent(sequence1, next.seq1Range.start), findParent(sequence2, next.seq2Range.start));
				const equalPart2 = v.intersect(next);
				equalChars1 += equalPart2.seq1Range.length;
				equalChars2 += equalPart2.seq2Range.length;
				w = w.join(v);
				if (w.seq1Range.endExclusive >= next.seq1Range.endExclusive) equalMappings.shift();
				else break;
			}
			if (force && equalChars1 + equalChars2 < w.seq1Range.length + w.seq2Range.length || equalChars1 + equalChars2 < (w.seq1Range.length + w.seq2Range.length) * 2 / 3) additional.push(w);
			lastPoint = w.getEndExclusives();
		}
		while (equalMappings.length > 0) {
			const next = equalMappings.shift();
			if (next.seq1Range.isEmpty) continue;
			scanWord(next.getStarts(), next);
			scanWord(next.getEndExclusives().delta(-1), next);
		}
		return mergeSequenceDiffs(sequenceDiffs, additional);
	}
	function mergeSequenceDiffs(sequenceDiffs1, sequenceDiffs2) {
		const result = [];
		while (sequenceDiffs1.length > 0 || sequenceDiffs2.length > 0) {
			const sd1 = sequenceDiffs1[0];
			const sd2 = sequenceDiffs2[0];
			let next;
			if (sd1 && (!sd2 || sd1.seq1Range.start < sd2.seq1Range.start)) next = sequenceDiffs1.shift();
			else next = sequenceDiffs2.shift();
			if (result.length > 0 && result[result.length - 1].seq1Range.endExclusive >= next.seq1Range.start) result[result.length - 1] = result[result.length - 1].join(next);
			else result.push(next);
		}
		return result;
	}
	function removeVeryShortMatchingLinesBetweenDiffs(sequence1, _sequence2, sequenceDiffs) {
		let diffs = sequenceDiffs;
		if (diffs.length === 0) return diffs;
		let counter = 0;
		let shouldRepeat;
		do {
			shouldRepeat = false;
			const result = [diffs[0]];
			for (let i = 1; i < diffs.length; i++) {
				let shouldJoinDiffs = function(before, after) {
					const unchangedRange = new OffsetRange(lastResult.seq1Range.endExclusive, cur.seq1Range.start);
					if (sequence1.getText(unchangedRange).replace(/\s/g, "").length <= 4 && (before.seq1Range.length + before.seq2Range.length > 5 || after.seq1Range.length + after.seq2Range.length > 5)) return true;
					return false;
				};
				const cur = diffs[i];
				const lastResult = result[result.length - 1];
				if (shouldJoinDiffs(lastResult, cur)) {
					shouldRepeat = true;
					result[result.length - 1] = result[result.length - 1].join(cur);
				} else result.push(cur);
			}
			diffs = result;
		} while (counter++ < 10 && shouldRepeat);
		return diffs;
	}
	function removeVeryShortMatchingTextBetweenLongDiffs(sequence1, sequence2, sequenceDiffs) {
		let diffs = sequenceDiffs;
		if (diffs.length === 0) return diffs;
		let counter = 0;
		let shouldRepeat;
		do {
			shouldRepeat = false;
			const result = [diffs[0]];
			for (let i = 1; i < diffs.length; i++) {
				let shouldJoinDiffs = function(before, after) {
					const unchangedRange = new OffsetRange(lastResult.seq1Range.endExclusive, cur.seq1Range.start);
					if (sequence1.countLinesIn(unchangedRange) > 5 || unchangedRange.length > 500) return false;
					const unchangedText = sequence1.getText(unchangedRange).trim();
					if (unchangedText.length > 20 || unchangedText.split(/\r\n|\r|\n/).length > 1) return false;
					const beforeLineCount1 = sequence1.countLinesIn(before.seq1Range);
					const beforeSeq1Length = before.seq1Range.length;
					const beforeLineCount2 = sequence2.countLinesIn(before.seq2Range);
					const beforeSeq2Length = before.seq2Range.length;
					const afterLineCount1 = sequence1.countLinesIn(after.seq1Range);
					const afterSeq1Length = after.seq1Range.length;
					const afterLineCount2 = sequence2.countLinesIn(after.seq2Range);
					const afterSeq2Length = after.seq2Range.length;
					const max = 130;
					function cap(v) {
						return Math.min(v, max);
					}
					if (Math.pow(Math.pow(cap(beforeLineCount1 * 40 + beforeSeq1Length), 1.5) + Math.pow(cap(beforeLineCount2 * 40 + beforeSeq2Length), 1.5), 1.5) + Math.pow(Math.pow(cap(afterLineCount1 * 40 + afterSeq1Length), 1.5) + Math.pow(cap(afterLineCount2 * 40 + afterSeq2Length), 1.5), 1.5) > (max ** 1.5) ** 1.5 * 1.3) return true;
					return false;
				};
				const cur = diffs[i];
				const lastResult = result[result.length - 1];
				if (shouldJoinDiffs(lastResult, cur)) {
					shouldRepeat = true;
					result[result.length - 1] = result[result.length - 1].join(cur);
				} else result.push(cur);
			}
			diffs = result;
		} while (counter++ < 10 && shouldRepeat);
		const newDiffs = [];
		forEachWithNeighbors(diffs, (prev, cur, next) => {
			let newDiff = cur;
			function shouldMarkAsChanged(text) {
				return text.length > 0 && text.trim().length <= 3 && cur.seq1Range.length + cur.seq2Range.length > 100;
			}
			const fullRange1 = sequence1.extendToFullLines(cur.seq1Range);
			const prefix = sequence1.getText(new OffsetRange(fullRange1.start, cur.seq1Range.start));
			if (shouldMarkAsChanged(prefix)) newDiff = newDiff.deltaStart(-prefix.length);
			const suffix = sequence1.getText(new OffsetRange(cur.seq1Range.endExclusive, fullRange1.endExclusive));
			if (shouldMarkAsChanged(suffix)) newDiff = newDiff.deltaEnd(suffix.length);
			const availableSpace = SequenceDiff.fromOffsetPairs(prev ? prev.getEndExclusives() : OffsetPair.zero, next ? next.getStarts() : OffsetPair.max);
			const result = newDiff.intersect(availableSpace);
			if (newDiffs.length > 0 && result.getStarts().equals(newDiffs[newDiffs.length - 1].getEndExclusives())) newDiffs[newDiffs.length - 1] = newDiffs[newDiffs.length - 1].join(result);
			else newDiffs.push(result);
		});
		return newDiffs;
	}
	var LineSequence = class {
		constructor(trimmedHash, lines) {
			this.trimmedHash = trimmedHash;
			this.lines = lines;
		}
		getElement(offset) {
			return this.trimmedHash[offset];
		}
		get length() {
			return this.trimmedHash.length;
		}
		getBoundaryScore(length) {
			return 1e3 - ((length === 0 ? 0 : getIndentation(this.lines[length - 1])) + (length === this.lines.length ? 0 : getIndentation(this.lines[length])));
		}
		getText(range) {
			return this.lines.slice(range.start, range.endExclusive).join("\n");
		}
		isStronglyEqual(offset1, offset2) {
			return this.lines[offset1] === this.lines[offset2];
		}
	};
	function getIndentation(str) {
		let i = 0;
		while (i < str.length && (str.charCodeAt(i) === 32 || str.charCodeAt(i) === 9)) i++;
		return i;
	}
	var DefaultLinesDiffComputer = class {
		constructor() {
			this.dynamicProgrammingDiffing = new DynamicProgrammingDiffing();
			this.myersDiffingAlgorithm = new MyersDiffAlgorithm();
		}
		computeDiff(originalLines, modifiedLines, options) {
			if (originalLines.length <= 1 && equals(originalLines, modifiedLines, (a, b) => a === b)) return new LinesDiff([], [], false);
			if (originalLines.length === 1 && originalLines[0].length === 0 || modifiedLines.length === 1 && modifiedLines[0].length === 0) return new LinesDiff([new DetailedLineRangeMapping(new LineRange(1, originalLines.length + 1), new LineRange(1, modifiedLines.length + 1), [new RangeMapping(new Range(1, 1, originalLines.length, originalLines[originalLines.length - 1].length + 1), new Range(1, 1, modifiedLines.length, modifiedLines[modifiedLines.length - 1].length + 1))])], [], false);
			const timeout = options.maxComputationTimeMs === 0 ? InfiniteTimeout.instance : new DateTimeout(options.maxComputationTimeMs);
			const considerWhitespaceChanges = !options.ignoreTrimWhitespace;
			const perfectHashes = /* @__PURE__ */ new Map();
			function getOrCreateHash(text) {
				let hash = perfectHashes.get(text);
				if (hash === void 0) {
					hash = perfectHashes.size;
					perfectHashes.set(text, hash);
				}
				return hash;
			}
			const originalLinesHashes = originalLines.map((l) => getOrCreateHash(l.trim()));
			const modifiedLinesHashes = modifiedLines.map((l) => getOrCreateHash(l.trim()));
			const sequence1 = new LineSequence(originalLinesHashes, originalLines);
			const sequence2 = new LineSequence(modifiedLinesHashes, modifiedLines);
			const lineAlignmentResult = (() => {
				if (sequence1.length + sequence2.length < 1700) return this.dynamicProgrammingDiffing.compute(sequence1, sequence2, timeout, (offset1, offset2) => originalLines[offset1] === modifiedLines[offset2] ? modifiedLines[offset2].length === 0 ? .1 : 1 + Math.log(1 + modifiedLines[offset2].length) : .99);
				return this.myersDiffingAlgorithm.compute(sequence1, sequence2, timeout);
			})();
			let lineAlignments = lineAlignmentResult.diffs;
			let hitTimeout = lineAlignmentResult.hitTimeout;
			lineAlignments = optimizeSequenceDiffs(sequence1, sequence2, lineAlignments);
			lineAlignments = removeVeryShortMatchingLinesBetweenDiffs(sequence1, sequence2, lineAlignments);
			const alignments = [];
			const scanForWhitespaceChanges = (equalLinesCount) => {
				if (!considerWhitespaceChanges) return;
				for (let i = 0; i < equalLinesCount; i++) {
					const seq1Offset = seq1LastStart + i;
					const seq2Offset = seq2LastStart + i;
					if (originalLines[seq1Offset] !== modifiedLines[seq2Offset]) {
						const characterDiffs = this.refineDiff(originalLines, modifiedLines, new SequenceDiff(new OffsetRange(seq1Offset, seq1Offset + 1), new OffsetRange(seq2Offset, seq2Offset + 1)), timeout, considerWhitespaceChanges, options);
						for (const a of characterDiffs.mappings) alignments.push(a);
						if (characterDiffs.hitTimeout) hitTimeout = true;
					}
				}
			};
			let seq1LastStart = 0;
			let seq2LastStart = 0;
			for (const diff of lineAlignments) {
				assertFn(() => diff.seq1Range.start - seq1LastStart === diff.seq2Range.start - seq2LastStart);
				scanForWhitespaceChanges(diff.seq1Range.start - seq1LastStart);
				seq1LastStart = diff.seq1Range.endExclusive;
				seq2LastStart = diff.seq2Range.endExclusive;
				const characterDiffs = this.refineDiff(originalLines, modifiedLines, diff, timeout, considerWhitespaceChanges, options);
				if (characterDiffs.hitTimeout) hitTimeout = true;
				for (const a of characterDiffs.mappings) alignments.push(a);
			}
			scanForWhitespaceChanges(originalLines.length - seq1LastStart);
			const changes = lineRangeMappingFromRangeMappings(alignments, new ArrayText(originalLines), new ArrayText(modifiedLines));
			let moves = [];
			if (options.computeMoves) moves = this.computeMoves(changes, originalLines, modifiedLines, originalLinesHashes, modifiedLinesHashes, timeout, considerWhitespaceChanges, options);
			assertFn(() => {
				function validatePosition(pos, lines) {
					if (pos.lineNumber < 1 || pos.lineNumber > lines.length) return false;
					const line = lines[pos.lineNumber - 1];
					if (pos.column < 1 || pos.column > line.length + 1) return false;
					return true;
				}
				function validateRange(range, lines) {
					if (range.startLineNumber < 1 || range.startLineNumber > lines.length + 1) return false;
					if (range.endLineNumberExclusive < 1 || range.endLineNumberExclusive > lines.length + 1) return false;
					return true;
				}
				for (const c of changes) {
					if (!c.innerChanges) return false;
					for (const ic of c.innerChanges) if (!(validatePosition(ic.modifiedRange.getStartPosition(), modifiedLines) && validatePosition(ic.modifiedRange.getEndPosition(), modifiedLines) && validatePosition(ic.originalRange.getStartPosition(), originalLines) && validatePosition(ic.originalRange.getEndPosition(), originalLines))) return false;
					if (!validateRange(c.modified, modifiedLines) || !validateRange(c.original, originalLines)) return false;
				}
				return true;
			});
			return new LinesDiff(changes, moves, hitTimeout);
		}
		computeMoves(changes, originalLines, modifiedLines, hashedOriginalLines, hashedModifiedLines, timeout, considerWhitespaceChanges, options) {
			return computeMovedLines(changes, originalLines, modifiedLines, hashedOriginalLines, hashedModifiedLines, timeout).map((m) => {
				return new MovedText(m, lineRangeMappingFromRangeMappings(this.refineDiff(originalLines, modifiedLines, new SequenceDiff(m.original.toOffsetRange(), m.modified.toOffsetRange()), timeout, considerWhitespaceChanges, options).mappings, new ArrayText(originalLines), new ArrayText(modifiedLines), true));
			});
		}
		refineDiff(originalLines, modifiedLines, diff, timeout, considerWhitespaceChanges, options) {
			const rangeMapping = toLineRangeMapping(diff).toRangeMapping2(originalLines, modifiedLines);
			const slice1 = new LinesSliceCharSequence(originalLines, rangeMapping.originalRange, considerWhitespaceChanges);
			const slice2 = new LinesSliceCharSequence(modifiedLines, rangeMapping.modifiedRange, considerWhitespaceChanges);
			const diffResult = slice1.length + slice2.length < 500 ? this.dynamicProgrammingDiffing.compute(slice1, slice2, timeout) : this.myersDiffingAlgorithm.compute(slice1, slice2, timeout);
			let diffs = diffResult.diffs;
			diffs = optimizeSequenceDiffs(slice1, slice2, diffs);
			diffs = extendDiffsToEntireWordIfAppropriate(slice1, slice2, diffs, (seq, idx) => seq.findWordContaining(idx));
			if (options.extendToSubwords) diffs = extendDiffsToEntireWordIfAppropriate(slice1, slice2, diffs, (seq, idx) => seq.findSubWordContaining(idx), true);
			diffs = removeShortMatches(slice1, slice2, diffs);
			diffs = removeVeryShortMatchingTextBetweenLongDiffs(slice1, slice2, diffs);
			return {
				mappings: diffs.map((d) => new RangeMapping(slice1.translateRange(d.seq1Range), slice2.translateRange(d.seq2Range))),
				hitTimeout: diffResult.hitTimeout
			};
		}
	};
	function toLineRangeMapping(sequenceDiff) {
		return new LineRangeMapping(new LineRange(sequenceDiff.seq1Range.start + 1, sequenceDiff.seq1Range.endExclusive + 1), new LineRange(sequenceDiff.seq2Range.start + 1, sequenceDiff.seq2Range.endExclusive + 1));
	}
	function computeDiff(originalLines, modifiedLines, options) {
		return new DefaultLinesDiffComputer().computeDiff(originalLines, modifiedLines, options)?.changes.map((changes) => {
			let originalStartLineNumber;
			let originalEndLineNumber;
			let modifiedStartLineNumber;
			let modifiedEndLineNumber;
			let innerChanges = changes.innerChanges;
			originalStartLineNumber = changes.original.startLineNumber - 1;
			originalEndLineNumber = changes.original.endLineNumberExclusive - 1;
			modifiedStartLineNumber = changes.modified.startLineNumber - 1;
			modifiedEndLineNumber = changes.modified.endLineNumberExclusive - 1;
			return {
				origStart: originalStartLineNumber,
				origEnd: originalEndLineNumber,
				editStart: modifiedStartLineNumber,
				editEnd: modifiedEndLineNumber,
				charChanges: innerChanges?.map((m) => ({
					originalStartLineNumber: m.originalRange.startLineNumber - 1,
					originalStartColumn: m.originalRange.startColumn - 1,
					originalEndLineNumber: m.originalRange.endLineNumber - 1,
					originalEndColumn: m.originalRange.endColumn - 1,
					modifiedStartLineNumber: m.modifiedRange.startLineNumber - 1,
					modifiedStartColumn: m.modifiedRange.startColumn - 1,
					modifiedEndLineNumber: m.modifiedRange.endLineNumber - 1,
					modifiedEndColumn: m.modifiedRange.endColumn - 1
				}))
			};
		});
	}
	exports.computeDiff = computeDiff;
	var AceRange = require_range().Range;
	var { DiffChunk } = require_base_diff_view();
	var DiffProvider$1 = class {
		compute(originalLines, modifiedLines, opts) {
			if (!opts) opts = {};
			if (!opts.maxComputationTimeMs) opts.maxComputationTimeMs = 500;
			return (computeDiff(originalLines, modifiedLines, opts) || []).map((c) => new DiffChunk(new AceRange(c.origStart, 0, c.origEnd, 0), new AceRange(c.editStart, 0, c.editEnd, 0), c.charChanges));
		}
	};
	exports.DiffProvider = DiffProvider$1;
}));
var require_diff = /* @__PURE__ */ __commonJSMin(((exports) => {
	var InlineDiffView = require_inline_diff_view().InlineDiffView;
	var SplitDiffView = require_split_diff_view().SplitDiffView;
	var DiffProvider = require_default().DiffProvider;
	function createDiffView(diffModel, options) {
		diffModel = diffModel || {};
		diffModel.diffProvider = diffModel.diffProvider || new DiffProvider();
		let diffView;
		if (diffModel.inline) diffView = new InlineDiffView(diffModel);
		else diffView = new SplitDiffView(diffModel);
		if (options) diffView.setOptions(options);
		return diffView;
	}
	exports.InlineDiffView = InlineDiffView;
	exports.SplitDiffView = SplitDiffView;
	exports.DiffProvider = DiffProvider;
	exports.createDiffView = createDiffView;
}));
export default require_diff();
