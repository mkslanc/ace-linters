(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[7760],{

/***/ 87760:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/**
 * ## Diff extension
 *
 * Provides side-by-side and inline diff view capabilities for comparing code differences between two versions.
 * Supports visual highlighting of additions, deletions, and modifications with customizable diff providers
 * and rendering options. Includes features for synchronized scrolling, line number alignment, and
 * various diff computation algorithms.
 *
 * **Components:**
 * - `InlineDiffView`: Single editor view showing changes inline with markers
 * - `SplitDiffView`: Side-by-side comparison view with two synchronized editors
 * - `DiffProvider`: Configurable algorithms for computing differences
 *
 * **Usage:**
 * ```javascript
 * const diffView = createDiffView({
 *   valueA: originalContent,
 *   valueB: modifiedContent,
 *   inline: false // or 'a'/'b' for inline view
 * });
 * ```
 *
 * @module
 */

var InlineDiffView = (__webpack_require__(25184)/* .InlineDiffView */ .m);
var SplitDiffView = (__webpack_require__(31273)/* .SplitDiffView */ .X);
var DiffProvider = (__webpack_require__(53899)/* .DiffProvider */ .P);

/**
 * Interface representing a model for handling differences between two views or states.
 * @typedef {Object} DiffModel
 * @property {import("../editor").Editor} [editorA] - The editor for the original view.
 * @property {import("../editor").Editor} [editorB] - The editor for the edited view.
 * @property {import("../edit_session").EditSession} [sessionA] - The edit session for the original view.
 * @property {import("../edit_session").EditSession} [sessionB] - The edit session for the edited view.
 * @property {string} [valueA] - The original content.
 * @property {string} [valueB] - The modified content.
 * @property {"a"|"b"} [inline] - Whether to show the original view("a") or modified view("b") for inline diff view
 * @property {IDiffProvider} [diffProvider] - Provider for computing differences between original and modified content.
 */

/**
 * @typedef {Object} DiffViewOptions
 * @property {boolean} [showOtherLineNumbers=true] - Whether to show line numbers in the other editor's gutter
 * @property {boolean} [folding] - Whether to enable code folding widgets
 * @property {boolean} [syncSelections] - Whether to synchronize selections between both editors
 * @property {boolean} [ignoreTrimWhitespace] - Whether to ignore trimmed whitespace when computing diffs
 * @property {boolean} [wrap] - Whether to enable word wrapping in both editors
 * @property {number} [maxDiffs=5000] - Maximum number of diffs to compute before failing silently
 * @property {string|import("../../ace-internal").Ace.Theme} [theme] - Theme to apply to both editors
 */

/**
 * @typedef {Object} IDiffProvider
 * @property {(originalLines: string[], modifiedLines: string[], opts?: any) => import("./diff/base_diff_view").DiffChunk[]} compute - Computes differences between original and modified lines
 */


/**
 * Creates a diff view for comparing code.
 * @param {DiffModel} [diffModel] model for the diff view
 * @param {DiffViewOptions} [options] options for the diff view
 * @returns {InlineDiffView|SplitDiffView} Configured diff view instance
 */
function createDiffView(diffModel, options) {
    diffModel = diffModel || {};
    diffModel.diffProvider = diffModel.diffProvider || new DiffProvider(); //use default diff provider;
    let diffView;
    if (diffModel.inline) {
        diffView = new InlineDiffView(diffModel);
    }
    else {
        diffView = new SplitDiffView(diffModel);
    }
    if (options) {
        diffView.setOptions(options);
    }

    return diffView;
}

exports.InlineDiffView = InlineDiffView;
exports.SplitDiffView = SplitDiffView;
exports.DiffProvider = DiffProvider;
exports.createDiffView = createDiffView;


/***/ }),

/***/ 70232:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var oop = __webpack_require__(2645);
var Range = (__webpack_require__(91902)/* .Range */ .Q);
var dom = __webpack_require__(71435);
var config = __webpack_require__(76321);
var LineWidgets = (__webpack_require__(90563)/* .LineWidgets */ .G);
var ScrollDiffDecorator = (__webpack_require__(60352)/* .ScrollDiffDecorator */ .K);

// @ts-ignore
var css = (__webpack_require__(95403)/* .cssText */ .n);

var Editor = (__webpack_require__(27258).Editor);
var Renderer = (__webpack_require__(21016).VirtualRenderer);
var UndoManager = (__webpack_require__(79870)/* .UndoManager */ .a);
var Decorator = (__webpack_require__(31079)/* .Decorator */ .K);

__webpack_require__(87983);
// enable multiselect
__webpack_require__(48369);

var EditSession = (__webpack_require__(33464)/* .EditSession */ .f);

var MinimalGutterDiffDecorator = (__webpack_require__(49034)/* .MinimalGutterDiffDecorator */ .f);

var dummyDiffProvider = {
    compute: function(val1, val2, options) {
        return [];
    }
};

dom.importCssString(css, "diffview.css", false);

class BaseDiffView {
    /**
     * Constructs a new base DiffView instance.
     * @param {boolean} [inlineDiffEditor] - Whether to use an inline diff editor.
     * @param {HTMLElement} [container] - optional container element for the DiffView.
     */
    constructor(inlineDiffEditor, container) {
        this.onChangeTheme = this.onChangeTheme.bind(this);
        this.onInput = this.onInput.bind(this);
        this.onChangeFold = this.onChangeFold.bind(this);
        this.realign = this.realign.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onChangeWrapLimit = this.onChangeWrapLimit.bind(this);
        this.realignPending = false;

        /**@type{{sessionA: EditSession, sessionB: EditSession, chunks: DiffChunk[]}}*/this.diffSession;
        /**@type DiffChunk[]*/this.chunks;
        this.inlineDiffEditor = inlineDiffEditor || false;
        this.currentDiffIndex = 0;
        this.diffProvider = dummyDiffProvider;

        if (container) {
            this.container = container;
        }

        this.$ignoreTrimWhitespace = false;
        this.$maxDiffs = 5000;
        this.$maxComputationTimeMs = 150;
        this.$syncSelections = false;
        this.$foldUnchangedOnInput = false;

        this.markerB = new DiffHighlight(this, 1);
        this.markerA = new DiffHighlight(this, -1);
    }

    /**
     * @param {import("../diff").DiffModel} [diffModel] - The model for the diff view.
     */
    $setupModels(diffModel) {
        if (diffModel.diffProvider) {
            this.setProvider(diffModel.diffProvider);
        }
        this.showSideA = diffModel.inline == undefined ? true : diffModel.inline === "a";
        var diffEditorOptions = /**@type {Partial<import("../../../ace-internal").Ace.EditorOptions>}*/({
            scrollPastEnd: 0.5,
            highlightActiveLine: false,
            highlightGutterLine: false,
            animatedScroll: true,
            customScrollbar: true,
            vScrollBarAlwaysVisible: true,
            fadeFoldWidgets: true,
            showFoldWidgets: true,
            selectionStyle: "text",
        });

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
            this.otherEditor = new Editor(new Renderer(null), undefined, cloneOptions);
            if (this.showSideA) {
                this.editorB = this.otherEditor;
            } else {
                this.editorA = this.otherEditor;
            }
        }

        this.setDiffSession({
            sessionA: diffModel.sessionA || (diffModel.editorA ? diffModel.editorA.session : new EditSession(
                diffModel.valueA || "")),
            sessionB: diffModel.sessionB || (diffModel.editorB ? diffModel.editorB.session : new EditSession(
                diffModel.valueB || "")),
            chunks: []
        });
        
        if (this.otherEditor && this.activeEditor) {
            this.otherSession.setOption("wrap", this.activeEditor.getOption("wrap"));
        }

        this.setupScrollbars();
    }

    addGutterDecorators() { 
        if (!this.gutterDecoratorA)
            this.gutterDecoratorA = new MinimalGutterDiffDecorator(this.editorA, -1);
        if (!this.gutterDecoratorB)
            this.gutterDecoratorB = new MinimalGutterDiffDecorator(this.editorB, 1);
    }

    /**
     * @param {EditSession} [session]
     * @param {string} [value]
     */
    $setupModel(session, value) {
        var editor = new Editor(new Renderer(), session);
        editor.session.setUndoManager(new UndoManager());
        if (value != undefined) {
            editor.setValue(value, -1);
        }
        return editor;
    }

    foldUnchanged() {
        var chunks = this.chunks;
        var placeholder = "-".repeat(120);
        var prev = {
            old: new Range(0, 0, 0, 0),
            new: new Range(0, 0, 0, 0)
        };
        var foldsChanged = false;
        for (var i = 0; i < chunks.length + 1; i++) {
            let current = chunks[i] || {
                old: new Range(this.sessionA.getLength(), 0, this.sessionA.getLength(), 0),
                new: new Range(this.sessionB.getLength(), 0, this.sessionB.getLength(), 0)
            };
            var l = current.new.start.row - prev.new.end.row - 5;
            if (l > 2) {
                var s = prev.old.end.row + 2;
                var fold1 = this.sessionA.addFold(placeholder, new Range(s, 0, s + l, Number.MAX_VALUE));
                s = prev.new.end.row + 2;
                var fold2 = this.sessionB.addFold(placeholder, new Range(s, 0, s + l, Number.MAX_VALUE));
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
            if (fold.placeholder.length == 120) {
                this.sessionA.removeFold(fold);
            }
        }
    }

    toggleFoldUnchanged() {
        if (!this.foldUnchanged()) {
            this.unfoldUnchanged();
        }
    }

    /**
     * @param {{ sessionA: any; sessionB: EditSession; chunks: DiffChunk[] }} session
     */
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

    /**
     * @abstract
     */
    $attachSessionsEventHandlers() {
    }

    /**
     * @abstract
     */
    $detachSessionsEventHandlers() {
    }

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

        if (this.editorA && this.editorA.getTheme() !== theme) {
            this.editorA.setTheme(theme);
        }
        if (this.editorB && this.editorB.getTheme() !== theme) {
            this.editorB.setTheme(theme);
        }
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
        // if we"re dealing with too many chunks, fail silently
        if (this.chunks && this.chunks.length > this.$maxDiffs) {
            return;
        }

        this.align();

        this.editorA && this.editorA.renderer.updateBackMarkers();
        this.editorB && this.editorB.renderer.updateBackMarkers();

        setTimeout(() => {
            this.updateScrollBarDecorators();
        }, 0);

        if (this.$foldUnchangedOnInput) {
            this.foldUnchanged();
        }
    }

    setupScrollbars() {
        /**
         * @param {Renderer & {$scrollDecorator: ScrollDiffDecorator}} renderer
         */
        const setupScrollBar = (renderer) => {
            setTimeout(() => {
                this.$setScrollBarDecorators(renderer);
                this.updateScrollBarDecorators();
            }, 0);
        };

        if (this.inlineDiffEditor) {
            setupScrollBar(this.activeEditor.renderer);
        }
        else {
            setupScrollBar(this.editorA.renderer);
            setupScrollBar(this.editorB.renderer);
        }

    }

    $setScrollBarDecorators(renderer) {
        if (renderer.$scrollDecorator) {
            renderer.$scrollDecorator.destroy();
        }
        renderer.$scrollDecorator = new ScrollDiffDecorator(renderer.scrollBarV, renderer, this.inlineDiffEditor);
        renderer.$scrollDecorator.setSessions(this.sessionA, this.sessionB);
        renderer.scrollBarV.setVisible(true);
        renderer.scrollBarV.element.style.bottom = renderer.scrollBarH.getHeight() + "px";
    }

    $resetDecorators(renderer) {
        if (renderer.$scrollDecorator) {
            renderer.$scrollDecorator.destroy();
        }
        renderer.$scrollDecorator = new Decorator(renderer.scrollBarV, renderer);
    }

    updateScrollBarDecorators() {
        if (this.inlineDiffEditor) {
            if (!this.activeEditor) {
                return;
            }
            this.activeEditor.renderer.$scrollDecorator.$zones = [];
        }
        else {
            if (!this.editorA || !this.editorB) {
                return;
            }
            this.editorA.renderer.$scrollDecorator.$zones = [];
            this.editorB.renderer.$scrollDecorator.$zones = [];
        }

        /**
         * @param {DiffChunk} change
         */
        const updateDecorators = (editor, change) => {
            if (!editor) {
                return;
            }
            if (typeof editor.renderer.$scrollDecorator.addZone !== "function") {
                return;
            }
            if (change.old.start.row != change.old.end.row) {
                editor.renderer.$scrollDecorator.addZone(change.old.start.row, change.old.end.row - 1, "delete");
            }
            if (change.new.start.row != change.new.end.row) {
                editor.renderer.$scrollDecorator.addZone(change.new.start.row, change.new.end.row - 1, "insert");
            }
        };

        if (this.inlineDiffEditor) {
            this.chunks && this.chunks.forEach((lineChange) => {
                updateDecorators(this.activeEditor, lineChange);
            });
            this.activeEditor.renderer.$scrollDecorator.$updateDecorators(this.activeEditor.renderer.layerConfig);
        }
        else {
            this.chunks && this.chunks.forEach((lineChange) => {
                updateDecorators(this.editorA, lineChange);
                updateDecorators(this.editorB, lineChange);
            });

            this.editorA.renderer.$scrollDecorator.$updateDecorators(this.editorA.renderer.layerConfig);
            this.editorB.renderer.$scrollDecorator.$updateDecorators(this.editorB.renderer.layerConfig);
        }
    }

    /**
     *
     * @param {string[]} val1
     * @param {string[]} val2
     * @return {DiffChunk[]}
     */
    $diffLines(val1, val2) {
        return this.diffProvider.compute(val1, val2, {
            ignoreTrimWhitespace: this.$ignoreTrimWhitespace,
            maxComputationTimeMs: this.$maxComputationTimeMs
        });
    }

    /**
     * @param {import("./providers/default").DiffProvider} provider
     */
    setProvider(provider) {
        this.diffProvider = provider;
    }

    /**
     * @param {EditSession} session
     * @param {{ rowCount: number; rowsAbove: number; row: number; }} w
     */
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
        if (fold) {
            session.widgetManager.updateOnFold({
                data: fold,
                action: "add",
            }, session);
        }
    }

    /**
     * @param {Editor} editor
     */
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

    /**
     * @param {import("../../../ace-internal").Ace.Point} pos
     * @param {EditSession} session
     */
    $screenRow(pos, session) {
        var row = session.documentToScreenPosition(pos).row;
        var afterEnd = pos.row - session.getLength() + 1;
        if (afterEnd > 0) {
            row += afterEnd;
        }
        return row;
    }

    /**
     * scroll locking
     * @abstract
     **/
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
        if (currSelectionRange && selectionRange.isEqual(currSelectionRange))
            return;

        if (isOld) {
            this.selectionRangeA = selectionRange;
        } else {
            this.selectionRangeB = selectionRange;
        }

        this.$updatingSelection = true;
        var newRange = this.transformRange(selectionRange, isOld);

        if (this.$syncSelections) {
            (isOld ? this.editorB : this.editorA).session.selection.setSelectionRange(newRange);
        }
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

    /**
     * @param ev
     * @param {EditSession} session
     */
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
            }
            else if (fold.lineWidget) {
                other.widgetManager.addLineWidget(fold.lineWidget);
                fold.lineWidget = null;
                if (other["$editor"]) {
                    other["$editor"].renderer.updateBackMarkers();
                }
            }
        }

        if (ev.action === "add") {
            const range = this.transformRange(fold.range, isOrig);
            if (range.isEmpty()) {
                const row = range.start.row + 1;
                if (other.lineWidgets[row]) {
                    fold.lineWidget = other.lineWidgets[row];
                    other.widgetManager.removeLineWidget(fold.lineWidget);
                    if (other["$editor"]) {
                        other["$editor"].renderer.updateBackMarkers();
                    }
                }
            }
            else {
                this.$syncingFold = true;

                fold.other = other.addFold(fold.placeholder, range);
                if (fold.other) {
                    fold.other.other = fold;
                }
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
        if (this.savedOptionsA)
            this.editorA.setOptions(this.savedOptionsA);
        if (this.savedOptionsB)
            this.editorB.setOptions(this.savedOptionsB);
        this.editorA.renderer.off("beforeRender", this.realign);
        this.editorB.renderer.off("beforeRender", this.realign);
        this.$detachEventHandlers();
        this.$removeLineWidgets(this.sessionA);
        this.$removeLineWidgets(this.sessionB);
        this.gutterDecoratorA && this.gutterDecoratorA.dispose();
        this.gutterDecoratorB && this.gutterDecoratorB.dispose();
        this.sessionA.selection.clearSelection();
        this.sessionB.selection.clearSelection();

        if (this.savedOptionsA && this.savedOptionsA.customScrollbar) {
            this.$resetDecorators(this.editorA.renderer);
        }
        if (this.savedOptionsB &&this.savedOptionsB.customScrollbar) {
            this.$resetDecorators(this.editorB.renderer);
        }
        
    }

    $removeLineWidgets(session) {
        // TODO remove only our widgets
        // session.widgetManager.removeLineWidget
        session.lineWidgets = [];
        session.widgetManager.lineWidgets = [];
        session._signal("changeFold", {data: {start: {row: 0}}});
    }

    /**
     * @abstract
     */
    $detachEventHandlers() {

    }

    destroy() {
        this.detach();
        this.editorA && this.editorA.destroy();
        this.editorB && this.editorB.destroy();
        this.editorA = this.editorB = null;
    }

    gotoNext(dir) {
        var ace = this.activeEditor || this.editorA;
        if (this.inlineDiffEditor) {
            ace = this.editorA;
        }
        var sideA = ace == this.editorA;

        var row = ace.selection.lead.row;
        var i = this.findChunkIndex(this.chunks, row, sideA);
        var chunk = this.chunks[i + dir] || this.chunks[i];

        var scrollTop = ace.session.getScrollTop();
        if (chunk) {
            var range = chunk[sideA ? "old" : "new"];
            var line = Math.max(range.start.row, range.end.row - 1);
            ace.selection.setRange(new Range(line, 0, line, 0));
        }
        ace.renderer.scrollSelectionIntoView(ace.selection.lead, ace.selection.anchor, 0.5);
        ace.renderer.animateScrolling(scrollTop);
    }


    firstDiffSelected() {
        return this.currentDiffIndex <= 1;
    }

    lastDiffSelected() {
        return this.currentDiffIndex > this.chunks.length - 1;
    }

    /**
     * @param {Range} range
     * @param {boolean} isOriginal
     */
    transformRange(range, isOriginal) {
        return Range.fromPoints(this.transformPosition(range.start, isOriginal), this.transformPosition(range.end, isOriginal));
    }

    /**
     * @param {import("ace-code").Ace.Point} pos
     * @param {boolean} isOriginal
     * @return {import("ace-code").Ace.Point}
     */
    transformPosition(pos, isOriginal) {
        var chunkIndex = this.findChunkIndex(this.chunks, pos.row, isOriginal);

        var chunk = this.chunks[chunkIndex];

        var clonePos = this.sessionB.doc.clonePos;
        var result = clonePos(pos);

        var [from, to] = isOriginal ? ["old", "new"] : ["new", "old"];
        var deltaChar = 0;
        var ignoreIndent = false;

        if (chunk) {
            if (chunk[from].end.row <= pos.row) {
                result.row -= chunk[from].end.row - chunk[to].end.row;
            }
            else if (chunk.charChanges) {
                for (let i = 0; i < chunk.charChanges.length; i++) {
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
                    }
                    else {
                        result.row = toRange.start.row;
                        if (fromRange.start.column > pos.column) break;
                        ignoreIndent = true;

                        if (!fromRange.isEmpty() && fromRange.contains(pos.row, pos.column)) {
                            result.column = toRange.start.column;
                            deltaChar = pos.column - fromRange.start.column;
                            deltaChar = Math.min(deltaChar, toRange.end.column - toRange.start.column);
                        }
                        else {
                            result = clonePos(toRange.end);
                            deltaChar = pos.column - fromRange.end.column;
                        }
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


        if (!ignoreIndent) { //TODO:
            var [fromEditSession, toEditSession] = isOriginal ? [this.sessionA, this.sessionB] : [
                this.sessionB, this.sessionA
            ];
            deltaChar -= this.$getDeltaIndent(fromEditSession, toEditSession, pos.row, result.row);
        }

        result.column += deltaChar;
        return result;
    }

    /**
     * @param {EditSession} fromEditSession
     * @param {EditSession} toEditSession
     * @param {number} fromLine
     * @param {number} toLine
     */
    $getDeltaIndent(fromEditSession, toEditSession, fromLine, toLine) {
        let origIndent = this.$getIndent(fromEditSession, fromLine);
        let editIndent = this.$getIndent(toEditSession, toLine);
        return origIndent - editIndent;
    }

    /**
     * @param {EditSession} editSession
     * @param {number} line
     */
    $getIndent(editSession, line) {
        return editSession.getLine(line).match(/^\s*/)[0].length;
    }

    printDiffs() {
        this.chunks.forEach((diff) => {
            console.log(diff.toString());
        });
    }

    /**
     *
     * @param {DiffChunk[]} chunks
     * @param {number} row
     * @param {boolean} isOriginal
     * @return {number}
     */
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
        if (this.$syncSelections || this.inlineDiffEditor) {
            return;
        }
        let currSession = selection.session;
        let otherSession = currSession === this.sessionA
            ? this.sessionB : this.sessionA;
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
}

/*** options ***/

config.defineOptions(BaseDiffView.prototype, "DiffView", {
    showOtherLineNumbers: {
        set: function(value) {
            if (this.gutterLayer) {
                this.gutterLayer.$renderer = value ?  null : emptyGutterRenderer;
                this.editorA.renderer.updateFull();
            }
        },
        initialValue: true
    },
    folding: {
        set: function(value) {
            this.editorA.setOption("showFoldWidgets", value);
            this.editorB.setOption("showFoldWidgets", value);
            if (!value) {
                var posA = [];
                var posB = [];
                if (this.chunks) {
                    this.chunks.forEach(x=>{
                        posA.push(x.old.start, x.old.end);
                        posB.push(x.new.start, x.new.end);
                     });
                }
                this.sessionA.unfold(posA);
                this.sessionB.unfold(posB);
            }
        }
    },
    syncSelections: {
        set: function(value) {

        },
    },
    ignoreTrimWhitespace: {
        set: function(value) {
            this.scheduleOnInput();
        },
    },
    wrap: {
        set: function(value) {
            this.sessionA.setOption("wrap", value);
            this.sessionB.setOption("wrap", value);
        }
    },
    maxDiffs: {
        value: 5000,
    },
    theme: {
        set: function(value) {
            this.setTheme(value);
        },
        get: function() {
            return this.editorA.getTheme();
        }
    },
});

var emptyGutterRenderer =  {
    getText: function name(params) {
        return "";
    },
    getWidth() {
        return 0;
    }
};

exports.BaseDiffView = BaseDiffView;


class DiffChunk {
    /**
     * @param {Range} originalRange
     * @param {Range} modifiedRange
     * @param {{originalStartLineNumber: number, originalStartColumn: number,
     * originalEndLineNumber: number, originalEndColumn: number, modifiedStartLineNumber: number,
     * modifiedStartColumn: number, modifiedEndLineNumber: number, modifiedEndColumn: number}[]} [charChanges]
     */
    constructor(originalRange, modifiedRange, charChanges) {
        this.old = originalRange;
        this.new = modifiedRange;
        this.charChanges = charChanges && charChanges.map(m => new DiffChunk(
            new Range(m.originalStartLineNumber, m.originalStartColumn,
                m.originalEndLineNumber, m.originalEndColumn
            ), new Range(m.modifiedStartLineNumber, m.modifiedStartColumn,
                m.modifiedEndLineNumber, m.modifiedEndColumn
            )));
    }
}

class DiffHighlight {
    /**
     * @param {import("./base_diff_view").BaseDiffView} diffView
     * @param type
     */
    constructor(diffView, type) {
        /**@type{number}*/this.id;
        this.diffView = diffView;
        this.type = type;
    }

    update(html, markerLayer, session, config) {
        let dir, operation, opOperation;
        var diffView = this.diffView;
        if (this.type === -1) {// original editor
            dir = "old";
            operation = "delete";
            opOperation = "insert";
        }
        else { //modified editor
            dir = "new";
            operation = "insert";
            opOperation = "delete";
        }

        var ignoreTrimWhitespace = diffView.$ignoreTrimWhitespace;
        var lineChanges = diffView.chunks;

        if (session.lineWidgets && !diffView.inlineDiffEditor) {
            for (var row = config.firstRow; row <= config.lastRow; row++) {
                var lineWidget = session.lineWidgets[row];
                if (!lineWidget || lineWidget.hidden)
                    continue;

                let start = session.documentToScreenRow(row, 0);

                if (lineWidget.rowsAbove > 0) {
                    var range = new Range(start - lineWidget.rowsAbove, 0, start - 1, Number.MAX_VALUE);
                    markerLayer.drawFullLineMarker(html, range, "ace_diff aligned_diff", config);
                }
                let end = start + lineWidget.rowCount - (lineWidget.rowsAbove || 0);
                var range = new Range(start + 1, 0, end, Number.MAX_VALUE);
                markerLayer.drawFullLineMarker(html, range, "ace_diff aligned_diff", config);
            }
        }

        lineChanges.forEach((lineChange) => {
            let startRow = lineChange[dir].start.row;
            let endRow = lineChange[dir].end.row;
            if (endRow < config.firstRow || startRow > config.lastRow)
                return;
            let range = new Range(startRow, 0, endRow - 1, 1 << 30);
            if (startRow !== endRow) {
                range = range.toScreenRange(session);

                markerLayer.drawFullLineMarker(html, range, "ace_diff " + operation, config);
            }

            if (lineChange.charChanges) {
                for (var i = 0; i < lineChange.charChanges.length; i++) {
                    var changeRange = lineChange.charChanges[i][dir];
                    if (changeRange.end.column == 0 && changeRange.end.row > changeRange.start.row && changeRange.end.row == lineChange[dir].end.row ) {
                        changeRange.end.row --;
                        changeRange.end.column = Number.MAX_VALUE;
                    }
                        
                    if (ignoreTrimWhitespace) {
                        for (let lineNumber = changeRange.start.row;
                             lineNumber <= changeRange.end.row; lineNumber++) {
                            let startColumn;
                            let endColumn;
                            let sessionLineStart = session.getLine(lineNumber).match(/^\s*/)[0].length;
                            let sessionLineEnd = session.getLine(lineNumber).length;

                            if (lineNumber === changeRange.start.row) {
                                startColumn = changeRange.start.column;
                            }
                            else {
                                startColumn = sessionLineStart;
                            }
                            if (lineNumber === changeRange.end.row) {
                                endColumn = changeRange.end.column;
                            }
                            else {
                                endColumn = sessionLineEnd;
                            }
                            let range = new Range(lineNumber, startColumn, lineNumber, endColumn);
                            var screenRange = range.toScreenRange(session);

                            if (sessionLineStart === startColumn && sessionLineEnd === endColumn) {
                                continue;
                            }

                            let cssClass = "inline " + operation;
                            if (range.isEmpty() && startColumn !== 0) {
                                cssClass = "inline " + opOperation + " empty";
                            }

                            markerLayer.drawSingleLineMarker(html, screenRange, "ace_diff " + cssClass, config);
                        }
                    }
                    else {
                        let range = new Range(changeRange.start.row, changeRange.start.column,
                            changeRange.end.row, changeRange.end.column
                        );
                        var screenRange = range.toScreenRange(session);
                        let cssClass = "inline " + operation;
                        if (range.isEmpty() && changeRange.start.column !== 0) {
                            cssClass = "inline empty " + opOperation;
                        }

                        if (screenRange.isMultiLine()) {
                            markerLayer.drawTextMarker(html, screenRange, "ace_diff " + cssClass, config);
                        }
                        else {
                            markerLayer.drawSingleLineMarker(html, screenRange, "ace_diff " + cssClass, config);
                        }
                    }
                }
            }
        });
    }
}

class SyncSelectionMarker {
    constructor() {
        /**@type{number}*/this.id;
        this.type = "fullLine";
        this.clazz = "ace_diff-active-line";
    }

    update(html, markerLayer, session, config) {
    }

    /**
     * @param {Range} range
     */
    setRange(range) {//TODO
        var newRange = range.clone();
        newRange.end.column++;

        this.range = newRange;
    }
}

exports.DiffChunk = DiffChunk;
exports.DiffHighlight = DiffHighlight;

/***/ }),

/***/ 49034:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var dom = __webpack_require__(71435);

class MinimalGutterDiffDecorator {
    /**
     * @param {import("../../editor").Editor} editor
     * @param {number} type
     */
    constructor(editor, type) {
        this.gutterClass ="ace_mini-diff_gutter-enabled";
        this.gutterCellsClasses = {
            add: "mini-diff-added",
            delete: "mini-diff-deleted",
        };

        this.editor = editor;
        this.type = type;
        this.chunks = [];
        this.attachToEditor();
    }

    attachToEditor() {
        this.renderGutters = this.renderGutters.bind(this);

        dom.addCssClass(
            this.editor.renderer.$gutterLayer.element,
            this.gutterClass
        );
        this.editor.renderer.$gutterLayer.on(
            "afterRender",
            this.renderGutters
        );
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
                if (cell.row >= startRow && cell.row <= endRow) {
                    cell.element.classList.add(diffClass);
                }
            });
        });
    }

    setDecorations(changes) {
        this.chunks = changes;
        this.renderGutters();
    }

    dispose() {
        dom.removeCssClass(
            this.editor.renderer.$gutterLayer.element,
            this.gutterClass
        );
        this.editor.renderer.$gutterLayer.off(
            "afterRender",
            this.renderGutters
        );
    }
}

exports.f = MinimalGutterDiffDecorator;


/***/ }),

/***/ 25184:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";



const BaseDiffView = (__webpack_require__(70232).BaseDiffView);
const Renderer = (__webpack_require__(21016).VirtualRenderer);
const config = __webpack_require__(76321);

class InlineDiffView extends BaseDiffView {
    /**
     * Constructs a new inline DiffView instance.
     * @param {import("../diff").DiffModel} [diffModel] - The model for the diff view.
     * @param {HTMLElement} [container] - optional container element for the DiffView.
     */
    constructor(diffModel, container) {
        diffModel = diffModel || {};
        diffModel.inline = diffModel.inline || "a";
        super( true, container);
        this.init(diffModel);
    }

    init(diffModel) {
        this.onSelect = this.onSelect.bind(this);
        this.onAfterRender = this.onAfterRender.bind(this);
        

        this.$setupModels(diffModel);
        this.onChangeTheme();
        config.resetOptions(this);
        config["_signal"]("diffView", this);

        var padding = this.activeEditor.renderer.$padding;

        this.addGutterDecorators();

        this.otherEditor.renderer.setPadding(padding);
        this.textLayer = this.otherEditor.renderer.$textLayer;
        this.markerLayer = this.otherEditor.renderer.$markerBack;
        this.gutterLayer = this.otherEditor.renderer.$gutterLayer;
        this.cursorLayer = this.otherEditor.renderer.$cursorLayer;

        this.otherEditor.renderer.$updateCachedSize = function() {
        };

        var textLayerElement = this.activeEditor.renderer.$textLayer.element;
        textLayerElement.parentNode.insertBefore(
            this.textLayer.element,
            textLayerElement
        );

        var markerLayerElement = this.activeEditor.renderer.$markerBack.element;
        markerLayerElement.parentNode.insertBefore(
            this.markerLayer.element,
            markerLayerElement.nextSibling
        );

        var gutterLayerElement = this.activeEditor.renderer.$gutterLayer.element;
        gutterLayerElement.parentNode.insertBefore(
            this.gutterLayer.element,
            gutterLayerElement.nextSibling
        );
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
        if (restore) {
            delete this.activeEditor.renderer.$getLongestLine;
        } else {
            this.editorA.renderer.$getLongestLine =
            this.editorB.renderer.$getLongestLine = () => {
                var getLongestLine = Renderer.prototype.$getLongestLine;
                return Math.max(
                    getLongestLine.call(this.editorA.renderer),
                    getLongestLine.call(this.editorB.renderer)
                );
            };
        }
    }

    initTextLayer() {
        var renderLine = this.textLayer.$renderLine;
        var diffView = this;
        this.otherEditor.renderer.$textLayer.$renderLine = function(parent, row, foldLIne) {
            if (isVisibleRow(diffView.chunks, row)) {
                renderLine.call(this, parent, row, foldLIne);
            }
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
                } else if (chunkStart > row) {
                    max = mid - 1;
                } else {
                    result = mid;
                    break;
                }
            }
            if (chunks[result + 1] && chunks[result + 1][side].start.row <= row) {
                result++;
            }
            var range = chunks[result] && chunks[result][side];
            if (range && range.end.row > row) {
                return true;
            }
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
            this.activeEditor.renderer.$cursorLayer.element.parentNode.appendChild(
                this.cursorLayer.element
            );
            this.activeEditor.renderer.$cursorLayer.element.style.display = "none";
            if (this.activeEditor.$isFocused) {
                this.otherEditor.onFocus();
            }
            if (this.showSideA) {
                this.sessionA.removeMarker(this.syncSelectionMarkerA.id);
            }
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
            style: this.activeEditor.renderer.scroller.style,
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
                    if (ev.type == "mousedown") {
                        this.selectEditor(this.otherEditor);
                    }
                    ev.propagationStopped = true;
                    ev.defaultPrevented = true;
                    this.otherEditor.$mouseHandler.onMouseEvent(ev.type, ev.domEvent);
                } else if (ev.type == "mousedown") {
                    this.selectEditor(this.activeEditor);
                }
            }
        };
        
        
        var events = [
            "mousedown",
            "click",
            "mouseup",
            "dblclick",
            "tripleclick",
            "quadclick",
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

        diffView.chunks.forEach(function (ch) {
            var diff1 = diffView.$screenRow(ch.old.end, diffView.sessionA)
                - diffView.$screenRow(ch.old.start, diffView.sessionA);
            var diff2 = diffView.$screenRow(ch.new.end, diffView.sessionB)
                - diffView.$screenRow(ch.new.start, diffView.sessionB);

            diffView.$addWidget(diffView.sessionA, {
                rowCount: diff2,
                rowsAbove: ch.old.end.row === 0 ? diff2 : 0,
                row: ch.old.end.row === 0 ? 0 : ch.old.end.row - 1
            });
            diffView.$addWidget(diffView.sessionB, {
                rowCount: diff1,
                rowsAbove: diff1,
                row: ch.new.start.row,
            });

        });
        diffView.sessionA["_emit"]("changeFold", {data: {start: {row: 0}}});
        diffView.sessionB["_emit"]("changeFold", {data: {start: {row: 0}}});
    }

    onChangeWrapLimit(e, session) {
        this.otherSession.setOption("wrap", session.getOption("wrap"));
        this.otherSession.adjustWrapLimit(session.$wrapLimit);
        this.scheduleRealign();
        // todo, this is needed because editor.onChangeWrapMode
        // calls resize(true) instead of waiting for the renderloop
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
        this.otherSession.bgTokenizer.lines.fill(undefined);
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

    /**
     * @param {number} changes
     * @param {import("ace-code").VirtualRenderer} renderer
     */
    onAfterRender(changes, renderer) {
        var config = renderer.layerConfig;

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
            "$vScroll",
        ]. forEach(function(prop) {
            cloneRenderer[prop] = renderer[prop];
        });

        cloneRenderer.$computeLayerConfig();

        var newConfig = cloneRenderer.layerConfig;
        
        this.gutterLayer.update(newConfig);

        newConfig.firstRowScreen = config.firstRowScreen;
        
        cloneRenderer.$cursorLayer.config = newConfig;
        cloneRenderer.$cursorLayer.update(newConfig);

        if (changes & cloneRenderer.CHANGE_LINES
            || changes & cloneRenderer.CHANGE_FULL
            || changes & cloneRenderer.CHANGE_SCROLL
            || changes & cloneRenderer.CHANGE_TEXT
        )
            this.textLayer.update(newConfig);

        this.markerLayer.setMarkers(this.otherSession.getMarkers());
        this.markerLayer.update(newConfig);
    }

    detach() {
        super.detach();
        this.otherEditor && this.otherEditor.destroy();
    }
}

exports.m = InlineDiffView;


/***/ }),

/***/ 53899:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;


function equals(one, other, itemEquals = (a, b) => a === b) {
  if (one === other) {
    return true;
  }
  if (!one || !other) {
    return false;
  }
  if (one.length !== other.length) {
    return false;
  }
  for (let i = 0, len = one.length; i < len; i++) {
    if (!itemEquals(one[i], other[i])) {
      return false;
    }
  }
  return true;
}
function* groupAdjacentBy(items, shouldBeGrouped) {
  let currentGroup;
  let last;
  for (const item of items) {
    if (last !== undefined && shouldBeGrouped(last, item)) {
      currentGroup.push(item);
    } else {
      if (currentGroup) {
        yield currentGroup;
      }
      currentGroup = [item];
    }
    last = item;
  }
  if (currentGroup) {
    yield currentGroup;
  }
}
function forEachAdjacent(arr, f) {
  for (let i = 0; i <= arr.length; i++) {
    f(i === 0 ? undefined : arr[i - 1], i === arr.length ? undefined : arr[i]);
  }
}
function forEachWithNeighbors(arr, f) {
  for (let i = 0; i < arr.length; i++) {
    f(i === 0 ? undefined : arr[i - 1], arr[i], i + 1 === arr.length ? undefined : arr[i + 1]);
  }
}
function pushMany(arr, items) {
  for (const item of items) {
    arr.push(item);
  }
}
function compareBy(selector, comparator) {
  return (a, b) => comparator(selector(a), selector(b));
}
const numberComparator = (a, b) => a - b;
function reverseOrder(comparator) {
  return (a, b) => -comparator(a, b);
}

class BugIndicatingError extends Error {
  constructor(message) {
    super(message || "An unexpected bug occurred.");
    Object.setPrototypeOf(this, BugIndicatingError.prototype);
  }
}

function assert(condition, message = "unexpected state") {
  if (!condition) {
    throw new BugIndicatingError(`Assertion Failed: ${message}`);
  }
}
function assertFn(condition) {
  condition();
}
function checkAdjacentItems(items, predicate) {
  let i = 0;
  while (i < items.length - 1) {
    const a = items[i];
    const b = items[i + 1];
    if (!predicate(a, b)) {
      return false;
    }
    i++;
  }
  return true;
}

class OffsetRange {
  constructor(start, endExclusive) {
    this.start = start;
    this.endExclusive = endExclusive;
    if (start > endExclusive) {
      throw new BugIndicatingError(`Invalid range: ${this.toString()}`);
    }
  }
  static fromTo(start, endExclusive) {
    return new OffsetRange(start, endExclusive);
  }
  static addRange(range, sortedRanges) {
    let i = 0;
    while (i < sortedRanges.length && sortedRanges[i].endExclusive < range.start) {
      i++;
    }
    let j = i;
    while (j < sortedRanges.length && sortedRanges[j].start <= range.endExclusive) {
      j++;
    }
    if (i === j) {
      sortedRanges.splice(i, 0, range);
    } else {
      const start = Math.min(range.start, sortedRanges[i].start);
      const end = Math.max(range.endExclusive, sortedRanges[j - 1].endExclusive);
      sortedRanges.splice(i, j - i, new OffsetRange(start, end));
    }
  }
  static tryCreate(start, endExclusive) {
    if (start > endExclusive) {
      return undefined;
    }
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
  /**
   * for all numbers n: range1.contains(n) or range2.contains(n) => range1.join(range2).contains(n)
   * The joined range is the smallest range that contains both ranges.
   */
  join(other) {
    return new OffsetRange(Math.min(this.start, other.start), Math.max(this.endExclusive, other.endExclusive));
  }
  /**
   * for all numbers n: range1.contains(n) and range2.contains(n) <=> range1.intersect(range2).contains(n)
   *
   * The resulting range is empty if the ranges do not intersect, but touch.
   * If the ranges don't even touch, the result is undefined.
   */
  intersect(other) {
    const start = Math.max(this.start, other.start);
    const end = Math.min(this.endExclusive, other.endExclusive);
    if (start <= end) {
      return new OffsetRange(start, end);
    }
    return undefined;
  }
  intersectionLength(range) {
    const start = Math.max(this.start, range.start);
    const end = Math.min(this.endExclusive, range.endExclusive);
    return Math.max(0, end - start);
  }
  intersects(other) {
    const start = Math.max(this.start, other.start);
    const end = Math.min(this.endExclusive, other.endExclusive);
    return start < end;
  }
  intersectsOrTouches(other) {
    const start = Math.max(this.start, other.start);
    const end = Math.min(this.endExclusive, other.endExclusive);
    return start <= end;
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
  /**
   * Returns the given value if it is contained in this instance, otherwise the closest value that is contained.
   * The range must not be empty.
   */
  clip(value) {
    if (this.isEmpty) {
      throw new BugIndicatingError(`Invalid clipping range: ${this.toString()}`);
    }
    return Math.max(this.start, Math.min(this.endExclusive - 1, value));
  }
  /**
   * Returns `r := value + k * length` such that `r` is contained in this range.
   * The range must not be empty.
   *
   * E.g. `[5, 10).clipCyclic(10) === 5`, `[5, 10).clipCyclic(11) === 6` and `[5, 10).clipCyclic(4) === 9`.
   */
  clipCyclic(value) {
    if (this.isEmpty) {
      throw new BugIndicatingError(`Invalid clipping range: ${this.toString()}`);
    }
    if (value < this.start) {
      return this.endExclusive - (this.start - value) % this.length;
    }
    if (value >= this.endExclusive) {
      return this.start + (value - this.start) % this.length;
    }
    return value;
  }
  map(f) {
    const result = [];
    for (let i = this.start; i < this.endExclusive; i++) {
      result.push(f(i));
    }
    return result;
  }
  forEach(f) {
    for (let i = this.start; i < this.endExclusive; i++) {
      f(i);
    }
  }
}

class Position {
  constructor(lineNumber, column) {
    this.lineNumber = lineNumber;
    this.column = column;
  }
  /**
   * Test if this position equals other position
   */
  equals(other) {
    return Position.equals(this, other);
  }
  /**
   * Test if position `a` equals position `b`
   */
  static equals(a, b) {
    if (!a && !b) {
      return true;
    }
    return !!a && !!b && a.lineNumber === b.lineNumber && a.column === b.column;
  }
  /**
   * Test if this position is before other position.
   * If the two positions are equal, the result will be false.
   */
  isBefore(other) {
    return Position.isBefore(this, other);
  }
  /**
   * Test if position `a` is before position `b`.
   * If the two positions are equal, the result will be false.
   */
  static isBefore(a, b) {
    if (a.lineNumber < b.lineNumber) {
      return true;
    }
    if (b.lineNumber < a.lineNumber) {
      return false;
    }
    return a.column < b.column;
  }
  /**
   * Test if this position is before other position.
   * If the two positions are equal, the result will be true.
   */
  isBeforeOrEqual(other) {
    return Position.isBeforeOrEqual(this, other);
  }
  /**
   * Test if position `a` is before position `b`.
   * If the two positions are equal, the result will be true.
   */
  static isBeforeOrEqual(a, b) {
    if (a.lineNumber < b.lineNumber) {
      return true;
    }
    if (b.lineNumber < a.lineNumber) {
      return false;
    }
    return a.column <= b.column;
  }
}

class Range {
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
  /**
   * Test if this range is empty.
   */
  isEmpty() {
    return Range.isEmpty(this);
  }
  /**
   * Test if `range` is empty.
   */
  static isEmpty(range) {
    return range.startLineNumber === range.endLineNumber && range.startColumn === range.endColumn;
  }
  /**
   * Test if position is in this range. If the position is at the edges, will return true.
   */
  containsPosition(position) {
    return Range.containsPosition(this, position);
  }
  /**
   * Test if `position` is in `range`. If the position is at the edges, will return true.
   */
  static containsPosition(range, position) {
    if (position.lineNumber < range.startLineNumber || position.lineNumber > range.endLineNumber) {
      return false;
    }
    if (position.lineNumber === range.startLineNumber && position.column < range.startColumn) {
      return false;
    }
    if (position.lineNumber === range.endLineNumber && position.column > range.endColumn) {
      return false;
    }
    return true;
  }
  /**
   * Test if range is in this range. If the range is equal to this range, will return true.
   */
  containsRange(range) {
    return Range.containsRange(this, range);
  }
  /**
   * Test if `otherRange` is in `range`. If the ranges are equal, will return true.
   */
  static containsRange(range, otherRange) {
    if (otherRange.startLineNumber < range.startLineNumber || otherRange.endLineNumber < range.startLineNumber) {
      return false;
    }
    if (otherRange.startLineNumber > range.endLineNumber || otherRange.endLineNumber > range.endLineNumber) {
      return false;
    }
    if (otherRange.startLineNumber === range.startLineNumber && otherRange.startColumn < range.startColumn) {
      return false;
    }
    if (otherRange.endLineNumber === range.endLineNumber && otherRange.endColumn > range.endColumn) {
      return false;
    }
    return true;
  }
  /**
   * Test if `range` is strictly in this range. `range` must start after and end before this range for the result to be true.
   */
  strictContainsRange(range) {
    return Range.strictContainsRange(this, range);
  }
  /**
   * Test if `otherRange` is strictly in `range` (must start after, and end before). If the ranges are equal, will return false.
   */
  static strictContainsRange(range, otherRange) {
    if (otherRange.startLineNumber < range.startLineNumber || otherRange.endLineNumber < range.startLineNumber) {
      return false;
    }
    if (otherRange.startLineNumber > range.endLineNumber || otherRange.endLineNumber > range.endLineNumber) {
      return false;
    }
    if (otherRange.startLineNumber === range.startLineNumber && otherRange.startColumn <= range.startColumn) {
      return false;
    }
    if (otherRange.endLineNumber === range.endLineNumber && otherRange.endColumn >= range.endColumn) {
      return false;
    }
    return true;
  }
  /**
   * A reunion of the two ranges.
   * The smallest position will be used as the start point, and the largest one as the end point.
   */
  plusRange(range) {
    return Range.plusRange(this, range);
  }
  /**
   * A reunion of the two ranges.
   * The smallest position will be used as the start point, and the largest one as the end point.
   */
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
  /**
   * A intersection of the two ranges.
   */
  intersectRanges(range) {
    return Range.intersectRanges(this, range);
  }
  /**
   * A intersection of the two ranges.
   */
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
    } else if (resultStartLineNumber === otherStartLineNumber) {
      resultStartColumn = Math.max(resultStartColumn, otherStartColumn);
    }
    if (resultEndLineNumber > otherEndLineNumber) {
      resultEndLineNumber = otherEndLineNumber;
      resultEndColumn = otherEndColumn;
    } else if (resultEndLineNumber === otherEndLineNumber) {
      resultEndColumn = Math.min(resultEndColumn, otherEndColumn);
    }
    if (resultStartLineNumber > resultEndLineNumber) {
      return null;
    }
    if (resultStartLineNumber === resultEndLineNumber && resultStartColumn > resultEndColumn) {
      return null;
    }
    return new Range(resultStartLineNumber, resultStartColumn, resultEndLineNumber, resultEndColumn);
  }
  /**
   * Test if this range equals other.
   */
  equalsRange(other) {
    return Range.equalsRange(this, other);
  }
  /**
   * Test if range `a` equals `b`.
   */
  static equalsRange(a, b) {
    if (!a && !b) {
      return true;
    }
    return !!a && !!b && a.startLineNumber === b.startLineNumber && a.startColumn === b.startColumn && a.endLineNumber === b.endLineNumber && a.endColumn === b.endColumn;
  }
  /**
   * Return the end position (which will be after or equal to the start position)
   */
  getEndPosition() {
    return Range.getEndPosition(this);
  }
  /**
   * Return the end position (which will be after or equal to the start position)
   */
  static getEndPosition(range) {
    return new Position(range.endLineNumber, range.endColumn);
  }
  /**
   * Return the start position (which will be before or equal to the end position)
   */
  getStartPosition() {
    return Range.getStartPosition(this);
  }
  /**
   * Return the start position (which will be before or equal to the end position)
   */
  static getStartPosition(range) {
    return new Position(range.startLineNumber, range.startColumn);
  }
  /**
   * Create a new empty range using this range's start position.
   */
  collapseToStart() {
    return Range.collapseToStart(this);
  }
  /**
   * Create a new empty range using this range's start position.
   */
  static collapseToStart(range) {
    return new Range(range.startLineNumber, range.startColumn, range.startLineNumber, range.startColumn);
  }
  /**
   * Create a new empty range using this range's end position.
   */
  collapseToEnd() {
    return Range.collapseToEnd(this);
  }
  /**
   * Create a new empty range using this range's end position.
   */
  static collapseToEnd(range) {
    return new Range(range.endLineNumber, range.endColumn, range.endLineNumber, range.endColumn);
  }
  // ---
  static fromPositions(start, end = start) {
    return new Range(start.lineNumber, start.column, end.lineNumber, end.column);
  }
}

function findLastMonotonous(array, predicate) {
  const idx = findLastIdxMonotonous(array, predicate);
  return idx === -1 ? undefined : array[idx];
}
function findLastIdxMonotonous(array, predicate, startIdx = 0, endIdxEx = array.length) {
  let i = startIdx;
  let j = endIdxEx;
  while (i < j) {
    const k = Math.floor((i + j) / 2);
    if (predicate(array[k])) {
      i = k + 1;
    } else {
      j = k;
    }
  }
  return i - 1;
}
function findFirstMonotonous(array, predicate) {
  const idx = findFirstIdxMonotonousOrArrLen(array, predicate);
  return idx === array.length ? undefined : array[idx];
}
function findFirstIdxMonotonousOrArrLen(array, predicate, startIdx = 0, endIdxEx = array.length) {
  let i = startIdx;
  let j = endIdxEx;
  while (i < j) {
    const k = Math.floor((i + j) / 2);
    if (predicate(array[k])) {
      j = k;
    } else {
      i = k + 1;
    }
  }
  return i;
}
class MonotonousArray {
  constructor(_array) {
    this._array = _array;
    this._findLastMonotonousLastIdx = 0;
  }
  static {
    this.assertInvariants = false;
  }
  /**
   * The predicate must be monotonous, i.e. `arr.map(predicate)` must be like `[true, ..., true, false, ..., false]`!
   * For subsequent calls, current predicate must be weaker than (or equal to) the previous predicate, i.e. more entries must be `true`.
   */
  findLastMonotonous(predicate) {
    if (MonotonousArray.assertInvariants) {
      if (this._prevFindLastPredicate) {
        for (const item of this._array) {
          if (this._prevFindLastPredicate(item) && !predicate(item)) {
            throw new Error("MonotonousArray: current predicate must be weaker than (or equal to) the previous predicate.");
          }
        }
      }
      this._prevFindLastPredicate = predicate;
    }
    const idx = findLastIdxMonotonous(this._array, predicate, this._findLastMonotonousLastIdx);
    this._findLastMonotonousLastIdx = idx + 1;
    return idx === -1 ? undefined : this._array[idx];
  }
}

class LineRange {
  static fromRangeInclusive(range) {
    return new LineRange(range.startLineNumber, range.endLineNumber + 1);
  }
  static join(lineRanges) {
    if (lineRanges.length === 0) {
      throw new BugIndicatingError("lineRanges cannot be empty");
    }
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
    if (startLineNumber > endLineNumberExclusive) {
      throw new BugIndicatingError(`startLineNumber ${startLineNumber} cannot be after endLineNumberExclusive ${endLineNumberExclusive}`);
    }
    this.startLineNumber = startLineNumber;
    this.endLineNumberExclusive = endLineNumberExclusive;
  }
  /**
   * Indicates if this line range is empty.
   */
  get isEmpty() {
    return this.startLineNumber === this.endLineNumberExclusive;
  }
  /**
   * Moves this line range by the given offset of line numbers.
   */
  delta(offset) {
    return new LineRange(this.startLineNumber + offset, this.endLineNumberExclusive + offset);
  }
  /**
   * The number of lines this line range spans.
   */
  get length() {
    return this.endLineNumberExclusive - this.startLineNumber;
  }
  /**
   * Creates a line range that combines this and the given line range.
   */
  join(other) {
    return new LineRange(
      Math.min(this.startLineNumber, other.startLineNumber),
      Math.max(this.endLineNumberExclusive, other.endLineNumberExclusive)
    );
  }
  /**
   * The resulting range is empty if the ranges do not intersect, but touch.
   * If the ranges don't even touch, the result is undefined.
   */
  intersect(other) {
    const startLineNumber = Math.max(this.startLineNumber, other.startLineNumber);
    const endLineNumberExclusive = Math.min(this.endLineNumberExclusive, other.endLineNumberExclusive);
    if (startLineNumber <= endLineNumberExclusive) {
      return new LineRange(startLineNumber, endLineNumberExclusive);
    }
    return undefined;
  }
  overlapOrTouch(other) {
    return this.startLineNumber <= other.endLineNumberExclusive && other.startLineNumber <= this.endLineNumberExclusive;
  }
  toInclusiveRange() {
    if (this.isEmpty) {
      return null;
    }
    return new Range(this.startLineNumber, 1, this.endLineNumberExclusive - 1, Number.MAX_SAFE_INTEGER);
  }
  /**
   * Converts this 1-based line range to a 0-based offset range (subtracts 1!).
   * @internal
   */
  toOffsetRange() {
    return new OffsetRange(this.startLineNumber - 1, this.endLineNumberExclusive - 1);
  }
}
class LineRangeSet {
  constructor(_normalizedRanges = []) {
    this._normalizedRanges = _normalizedRanges;
  }
  get ranges() {
    return this._normalizedRanges;
  }
  addRange(range) {
    if (range.length === 0) {
      return;
    }
    const joinRangeStartIdx = findFirstIdxMonotonousOrArrLen(this._normalizedRanges, (r) => r.endLineNumberExclusive >= range.startLineNumber);
    const joinRangeEndIdxExclusive = findLastIdxMonotonous(this._normalizedRanges, (r) => r.startLineNumber <= range.endLineNumberExclusive) + 1;
    if (joinRangeStartIdx === joinRangeEndIdxExclusive) {
      this._normalizedRanges.splice(joinRangeStartIdx, 0, range);
    } else if (joinRangeStartIdx === joinRangeEndIdxExclusive - 1) {
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
  /**
   * Subtracts all ranges in this set from `range` and returns the result.
   */
  subtractFrom(range) {
    const joinRangeStartIdx = findFirstIdxMonotonousOrArrLen(this._normalizedRanges, (r) => r.endLineNumberExclusive >= range.startLineNumber);
    const joinRangeEndIdxExclusive = findLastIdxMonotonous(this._normalizedRanges, (r) => r.startLineNumber <= range.endLineNumberExclusive) + 1;
    if (joinRangeStartIdx === joinRangeEndIdxExclusive) {
      return new LineRangeSet([range]);
    }
    const result = [];
    let startLineNumber = range.startLineNumber;
    for (let i = joinRangeStartIdx; i < joinRangeEndIdxExclusive; i++) {
      const r = this._normalizedRanges[i];
      if (r.startLineNumber > startLineNumber) {
        result.push(new LineRange(startLineNumber, r.startLineNumber));
      }
      startLineNumber = r.endLineNumberExclusive;
    }
    if (startLineNumber < range.endLineNumberExclusive) {
      result.push(new LineRange(startLineNumber, range.endLineNumberExclusive));
    }
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
      if (i && !i.isEmpty) {
        result.push(i);
      }
      if (r1.endLineNumberExclusive < r2.endLineNumberExclusive) {
        i1++;
      } else {
        i2++;
      }
    }
    return new LineRangeSet(result);
  }
  getWithDelta(value) {
    return new LineRangeSet(this._normalizedRanges.map((r) => r.delta(value)));
  }
}

class TextLength {
  constructor(lineCount, columnCount) {
    this.lineCount = lineCount;
    this.columnCount = columnCount;
  }
  static {
    this.zero = new TextLength(0, 0);
  }
  toLineRange() {
    return LineRange.ofLength(1, this.lineCount);
  }
  addToPosition(position) {
    if (this.lineCount === 0) {
      return new Position(position.lineNumber, position.column + this.columnCount);
    } else {
      return new Position(position.lineNumber + this.lineCount, this.columnCount + 1);
    }
  }
}

 
class LineBasedText  {
  constructor(_getLineContent, _lineCount) {
    assert(_lineCount >= 1);
    this._getLineContent = _getLineContent;
    this._lineCount = _lineCount;
  }
  getValueOfRange(range) {
    if (range.startLineNumber === range.endLineNumber) {
      return this._getLineContent(range.startLineNumber).substring(range.startColumn - 1, range.endColumn - 1);
    }
    let result = this._getLineContent(range.startLineNumber).substring(range.startColumn - 1);
    for (let i = range.startLineNumber + 1; i < range.endLineNumber; i++) {
      result += "\n" + this._getLineContent(i);
    }
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
}
class ArrayText extends LineBasedText {
  constructor(lines) {
    super(
      (lineNumber) => lines[lineNumber - 1],
      lines.length
    );
  }
}

class LinesDiff {
  constructor(changes, moves, hitTimeout) {
    this.changes = changes;
    this.moves = moves;
    this.hitTimeout = hitTimeout;
  }
}
class MovedText {
  constructor(lineRangeMapping, changes) {
    this.lineRangeMapping = lineRangeMapping;
    this.changes = changes;
  }
}

class LineRangeMapping {
  constructor(originalRange, modifiedRange) {
    this.original = originalRange;
    this.modified = modifiedRange;
  }
  join(other) {
    return new LineRangeMapping(
      this.original.join(other.original),
      this.modified.join(other.modified)
    );
  }
  get changedLineCount() {
    return Math.max(this.original.length, this.modified.length);
  }
  /**
   * This method assumes that the LineRangeMapping describes a valid diff!
   * I.e. if one range is empty, the other range cannot be the entire document.
   * It avoids various problems when the line range points to non-existing line-numbers.
  */
  toRangeMapping() {
    const origInclusiveRange = this.original.toInclusiveRange();
    const modInclusiveRange = this.modified.toInclusiveRange();
    if (origInclusiveRange && modInclusiveRange) {
      return new RangeMapping(origInclusiveRange, modInclusiveRange);
    } else if (this.original.startLineNumber === 1 || this.modified.startLineNumber === 1) {
      if (!(this.modified.startLineNumber === 1 && this.original.startLineNumber === 1)) {
        throw new BugIndicatingError("not a valid diff");
      }
      return new RangeMapping(
        new Range(this.original.startLineNumber, 1, this.original.endLineNumberExclusive, 1),
        new Range(this.modified.startLineNumber, 1, this.modified.endLineNumberExclusive, 1)
      );
    } else {
      return new RangeMapping(
        new Range(this.original.startLineNumber - 1, Number.MAX_SAFE_INTEGER, this.original.endLineNumberExclusive - 1, Number.MAX_SAFE_INTEGER),
        new Range(this.modified.startLineNumber - 1, Number.MAX_SAFE_INTEGER, this.modified.endLineNumberExclusive - 1, Number.MAX_SAFE_INTEGER)
      );
    }
  }
  /**
   * This method assumes that the LineRangeMapping describes a valid diff!
   * I.e. if one range is empty, the other range cannot be the entire document.
   * It avoids various problems when the line range points to non-existing line-numbers.
  */
  toRangeMapping2(original, modified) {
    if (isValidLineNumber(this.original.endLineNumberExclusive, original) && isValidLineNumber(this.modified.endLineNumberExclusive, modified)) {
      return new RangeMapping(
        new Range(this.original.startLineNumber, 1, this.original.endLineNumberExclusive, 1),
        new Range(this.modified.startLineNumber, 1, this.modified.endLineNumberExclusive, 1)
      );
    }
    if (!this.original.isEmpty && !this.modified.isEmpty) {
      return new RangeMapping(
        Range.fromPositions(
          new Position(this.original.startLineNumber, 1),
          normalizePosition(new Position(this.original.endLineNumberExclusive - 1, Number.MAX_SAFE_INTEGER), original)
        ),
        Range.fromPositions(
          new Position(this.modified.startLineNumber, 1),
          normalizePosition(new Position(this.modified.endLineNumberExclusive - 1, Number.MAX_SAFE_INTEGER), modified)
        )
      );
    }
    if (this.original.startLineNumber > 1 && this.modified.startLineNumber > 1) {
      return new RangeMapping(
        Range.fromPositions(
          normalizePosition(new Position(this.original.startLineNumber - 1, Number.MAX_SAFE_INTEGER), original),
          normalizePosition(new Position(this.original.endLineNumberExclusive - 1, Number.MAX_SAFE_INTEGER), original)
        ),
        Range.fromPositions(
          normalizePosition(new Position(this.modified.startLineNumber - 1, Number.MAX_SAFE_INTEGER), modified),
          normalizePosition(new Position(this.modified.endLineNumberExclusive - 1, Number.MAX_SAFE_INTEGER), modified)
        )
      );
    }
    throw new BugIndicatingError();
  }
}
function normalizePosition(position, content) {
  if (position.lineNumber < 1) {
    return new Position(1, 1);
  }
  if (position.lineNumber > content.length) {
    return new Position(content.length, content[content.length - 1].length + 1);
  }
  const line = content[position.lineNumber - 1];
  if (position.column > line.length + 1) {
    return new Position(position.lineNumber, line.length + 1);
  }
  return position;
}
function isValidLineNumber(lineNumber, lines) {
  return lineNumber >= 1 && lineNumber <= lines.length;
}
class DetailedLineRangeMapping extends LineRangeMapping {
  static fromRangeMappings(rangeMappings) {
    const originalRange = LineRange.join(rangeMappings.map((r) => LineRange.fromRangeInclusive(r.originalRange)));
    const modifiedRange = LineRange.join(rangeMappings.map((r) => LineRange.fromRangeInclusive(r.modifiedRange)));
    return new DetailedLineRangeMapping(originalRange, modifiedRange, rangeMappings);
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
}
class RangeMapping {
  static join(rangeMappings) {
    if (rangeMappings.length === 0) {
      throw new BugIndicatingError("Cannot join an empty list of range mappings");
    }
    let result = rangeMappings[0];
    for (let i = 1; i < rangeMappings.length; i++) {
      result = result.join(rangeMappings[i]);
    }
    return result;
  }
  static assertSorted(rangeMappings) {
    for (let i = 1; i < rangeMappings.length; i++) {
      const previous = rangeMappings[i - 1];
      const current = rangeMappings[i];
      if (!(previous.originalRange.getEndPosition().isBeforeOrEqual(current.originalRange.getStartPosition()) && previous.modifiedRange.getEndPosition().isBeforeOrEqual(current.modifiedRange.getStartPosition()))) {
        throw new BugIndicatingError("Range mappings must be sorted");
      }
    }
  }
  constructor(originalRange, modifiedRange) {
    this.originalRange = originalRange;
    this.modifiedRange = modifiedRange;
  }
  flip() {
    return new RangeMapping(this.modifiedRange, this.originalRange);
  }
  /**
   * Creates a single text edit that describes the change from the original to the modified text.
  */
  join(other) {
    return new RangeMapping(
      this.originalRange.plusRange(other.originalRange),
      this.modifiedRange.plusRange(other.modifiedRange)
    );
  }
}
function lineRangeMappingFromRangeMappings(alignments, originalLines, modifiedLines, dontAssertStartLine = false) {
  const changes = [];
  for (const g of groupAdjacentBy(
    alignments.map((a) => getLineRangeMapping(a, originalLines, modifiedLines)),
    (a1, a2) => a1.original.overlapOrTouch(a2.original) || a1.modified.overlapOrTouch(a2.modified)
  )) {
    const first = g[0];
    const last = g[g.length - 1];
    changes.push(new DetailedLineRangeMapping(
      first.original.join(last.original),
      first.modified.join(last.modified),
      g.map((a) => a.innerChanges[0])
    ));
  }
  assertFn(() => {
    if (!dontAssertStartLine && changes.length > 0) {
      if (changes[0].modified.startLineNumber !== changes[0].original.startLineNumber) {
        return false;
      }
      if (modifiedLines.length.lineCount - changes[changes.length - 1].modified.endLineNumberExclusive !== originalLines.length.lineCount - changes[changes.length - 1].original.endLineNumberExclusive) {
        return false;
      }
    }
    return checkAdjacentItems(
      changes,
      (m1, m2) => m2.original.startLineNumber - m1.original.endLineNumberExclusive === m2.modified.startLineNumber - m1.modified.endLineNumberExclusive && // There has to be an unchanged line in between (otherwise both diffs should have been joined)
      m1.original.endLineNumberExclusive < m2.original.startLineNumber && m1.modified.endLineNumberExclusive < m2.modified.startLineNumber
    );
  });
  return changes;
}
function getLineRangeMapping(rangeMapping, originalLines, modifiedLines) {
  let lineStartDelta = 0;
  let lineEndDelta = 0;
  if (rangeMapping.modifiedRange.endColumn === 1 && rangeMapping.originalRange.endColumn === 1 && rangeMapping.originalRange.startLineNumber + lineStartDelta <= rangeMapping.originalRange.endLineNumber && rangeMapping.modifiedRange.startLineNumber + lineStartDelta <= rangeMapping.modifiedRange.endLineNumber) {
    lineEndDelta = -1;
  }
  if (rangeMapping.modifiedRange.startColumn - 1 >= modifiedLines.getLineLength(rangeMapping.modifiedRange.startLineNumber) && rangeMapping.originalRange.startColumn - 1 >= originalLines.getLineLength(rangeMapping.originalRange.startLineNumber) && rangeMapping.originalRange.startLineNumber <= rangeMapping.originalRange.endLineNumber + lineEndDelta && rangeMapping.modifiedRange.startLineNumber <= rangeMapping.modifiedRange.endLineNumber + lineEndDelta) {
    lineStartDelta = 1;
  }
  const originalLineRange = new LineRange(
    rangeMapping.originalRange.startLineNumber + lineStartDelta,
    rangeMapping.originalRange.endLineNumber + 1 + lineEndDelta
  );
  const modifiedLineRange = new LineRange(
    rangeMapping.modifiedRange.startLineNumber + lineStartDelta,
    rangeMapping.modifiedRange.endLineNumber + 1 + lineEndDelta
  );
  return new DetailedLineRangeMapping(originalLineRange, modifiedLineRange, [rangeMapping]);
}

class DiffAlgorithmResult {
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
}
class SequenceDiff {
  constructor(seq1Range, seq2Range) {
    this.seq1Range = seq1Range;
    this.seq2Range = seq2Range;
  }
  static invert(sequenceDiffs, doc1Length) {
    const result = [];
    forEachAdjacent(sequenceDiffs, (a, b) => {
      result.push(SequenceDiff.fromOffsetPairs(
        a ? a.getEndExclusives() : OffsetPair.zero,
        b ? b.getStarts() : new OffsetPair(doc1Length, (a ? a.seq2Range.endExclusive - a.seq1Range.endExclusive : 0) + doc1Length)
      ));
    });
    return result;
  }
  static fromOffsetPairs(start, endExclusive) {
    return new SequenceDiff(
      new OffsetRange(start.offset1, endExclusive.offset1),
      new OffsetRange(start.offset2, endExclusive.offset2)
    );
  }
  static assertSorted(sequenceDiffs) {
    let last = undefined;
    for (const cur of sequenceDiffs) {
      if (last) {
        if (!(last.seq1Range.endExclusive <= cur.seq1Range.start && last.seq2Range.endExclusive <= cur.seq2Range.start)) {
          throw new BugIndicatingError("Sequence diffs must be sorted");
        }
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
    if (offset === 0) {
      return this;
    }
    return new SequenceDiff(this.seq1Range.delta(offset), this.seq2Range.delta(offset));
  }
  deltaStart(offset) {
    if (offset === 0) {
      return this;
    }
    return new SequenceDiff(this.seq1Range.deltaStart(offset), this.seq2Range.deltaStart(offset));
  }
  deltaEnd(offset) {
    if (offset === 0) {
      return this;
    }
    return new SequenceDiff(this.seq1Range.deltaEnd(offset), this.seq2Range.deltaEnd(offset));
  }
  intersect(other) {
    const i1 = this.seq1Range.intersect(other.seq1Range);
    const i2 = this.seq2Range.intersect(other.seq2Range);
    if (!i1 || !i2) {
      return undefined;
    }
    return new SequenceDiff(i1, i2);
  }
  getStarts() {
    return new OffsetPair(this.seq1Range.start, this.seq2Range.start);
  }
  getEndExclusives() {
    return new OffsetPair(this.seq1Range.endExclusive, this.seq2Range.endExclusive);
  }
}
class OffsetPair {
  constructor(offset1, offset2) {
    this.offset1 = offset1;
    this.offset2 = offset2;
  }
  static {
    this.zero = new OffsetPair(0, 0);
  }
  static {
    this.max = new OffsetPair(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
  }
  delta(offset) {
    if (offset === 0) {
      return this;
    }
    return new OffsetPair(this.offset1 + offset, this.offset2 + offset);
  }
  equals(other) {
    return this.offset1 === other.offset1 && this.offset2 === other.offset2;
  }
}
class InfiniteTimeout {
  static {
    this.instance = new InfiniteTimeout();
  }
  isValid() {
    return true;
  }
}
class DateTimeout {
  constructor(timeout) {
    this.timeout = timeout;
    this.startTime = Date.now();
    this.valid = true;
    if (timeout <= 0) {
      throw new BugIndicatingError("timeout must be positive");
    }
  }
  // Recommendation: Set a log-point `{this.disable()}` in the body
  isValid() {
    const valid = Date.now() - this.startTime < this.timeout;
    if (!valid && this.valid) {
      this.valid = false;
    }
    return this.valid;
  }
  disable() {
    this.timeout = Number.MAX_SAFE_INTEGER;
    this.isValid = () => true;
    this.valid = true;
  }
}

class Array2D {
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
}
function isSpace(charCode) {
  return charCode === 32 || charCode === 9;
}
class LineRangeFragment {
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
  static {
    this.chrKeys = /* @__PURE__ */ new Map();
  }
  static getKey(chr) {
    let key = this.chrKeys.get(chr);
    if (key === undefined) {
      key = this.chrKeys.size;
      this.chrKeys.set(chr, key);
    }
    return key;
  }
  computeSimilarity(other) {
    let sumDifferences = 0;
    const maxLength = Math.max(this.histogram.length, other.histogram.length);
    for (let i = 0; i < maxLength; i++) {
      sumDifferences += Math.abs((this.histogram[i] ?? 0) - (other.histogram[i] ?? 0));
    }
    return 1 - sumDifferences / (this.totalCount + other.totalCount);
  }
}

class DynamicProgrammingDiffing {
  compute(sequence1, sequence2, timeout = InfiniteTimeout.instance, equalityScore) {
    if (sequence1.length === 0 || sequence2.length === 0) {
      return DiffAlgorithmResult.trivial(sequence1, sequence2);
    }
    const lcsLengths = new Array2D(sequence1.length, sequence2.length);
    const directions = new Array2D(sequence1.length, sequence2.length);
    const lengths = new Array2D(sequence1.length, sequence2.length);
    for (let s12 = 0; s12 < sequence1.length; s12++) {
      for (let s22 = 0; s22 < sequence2.length; s22++) {
        if (!timeout.isValid()) {
          return DiffAlgorithmResult.trivialTimedOut(sequence1, sequence2);
        }
        const horizontalLen = s12 === 0 ? 0 : lcsLengths.get(s12 - 1, s22);
        const verticalLen = s22 === 0 ? 0 : lcsLengths.get(s12, s22 - 1);
        let extendedSeqScore;
        if (sequence1.getElement(s12) === sequence2.getElement(s22)) {
          if (s12 === 0 || s22 === 0) {
            extendedSeqScore = 0;
          } else {
            extendedSeqScore = lcsLengths.get(s12 - 1, s22 - 1);
          }
          if (s12 > 0 && s22 > 0 && directions.get(s12 - 1, s22 - 1) === 3) {
            extendedSeqScore += lengths.get(s12 - 1, s22 - 1);
          }
          extendedSeqScore += equalityScore ? equalityScore(s12, s22) : 1;
        } else {
          extendedSeqScore = -1;
        }
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
    }
    const result = [];
    let lastAligningPosS1 = sequence1.length;
    let lastAligningPosS2 = sequence2.length;
    function reportDecreasingAligningPositions(s12, s22) {
      if (s12 + 1 !== lastAligningPosS1 || s22 + 1 !== lastAligningPosS2) {
        result.push(new SequenceDiff(
          new OffsetRange(s12 + 1, lastAligningPosS1),
          new OffsetRange(s22 + 1, lastAligningPosS2)
        ));
      }
      lastAligningPosS1 = s12;
      lastAligningPosS2 = s22;
    }
    let s1 = sequence1.length - 1;
    let s2 = sequence2.length - 1;
    while (s1 >= 0 && s2 >= 0) {
      if (directions.get(s1, s2) === 3) {
        reportDecreasingAligningPositions(s1, s2);
        s1--;
        s2--;
      } else {
        if (directions.get(s1, s2) === 1) {
          s1--;
        } else {
          s2--;
        }
      }
    }
    reportDecreasingAligningPositions(-1, -1);
    result.reverse();
    return new DiffAlgorithmResult(result, false);
  }
}

class MyersDiffAlgorithm {
  compute(seq1, seq2, timeout = InfiniteTimeout.instance) {
    if (seq1.length === 0 || seq2.length === 0) {
      return DiffAlgorithmResult.trivial(seq1, seq2);
    }
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
      if (!timeout.isValid()) {
        return DiffAlgorithmResult.trivialTimedOut(seqX, seqY);
      }
      const lowerBound = -Math.min(d, seqY.length + d % 2);
      const upperBound = Math.min(d, seqX.length + d % 2);
      for (k = lowerBound; k <= upperBound; k += 2) {
        const maxXofDLineTop = k === upperBound ? -1 : V.get(k + 1);
        const maxXofDLineLeft = k === lowerBound ? -1 : V.get(k - 1) + 1;
        const x = Math.min(Math.max(maxXofDLineTop, maxXofDLineLeft), seqX.length);
        const y = x - k;
        if (x > seqX.length || y > seqY.length) {
          continue;
        }
        const newMaxX = getXAfterSnake(x, y);
        V.set(k, newMaxX);
        const lastPath = x === maxXofDLineTop ? paths.get(k + 1) : paths.get(k - 1);
        paths.set(k, newMaxX !== x ? new SnakePath(lastPath, x, y, newMaxX - x) : lastPath);
        if (V.get(k) === seqX.length && V.get(k) - k === seqY.length) {
          break loop;
        }
      }
    }
    let path = paths.get(k);
    const result = [];
    let lastAligningPosS1 = seqX.length;
    let lastAligningPosS2 = seqY.length;
    while (true) {
      const endX = path ? path.x + path.length : 0;
      const endY = path ? path.y + path.length : 0;
      if (endX !== lastAligningPosS1 || endY !== lastAligningPosS2) {
        result.push(new SequenceDiff(
          new OffsetRange(endX, lastAligningPosS1),
          new OffsetRange(endY, lastAligningPosS2)
        ));
      }
      if (!path) {
        break;
      }
      lastAligningPosS1 = path.x;
      lastAligningPosS2 = path.y;
      path = path.prev;
    }
    result.reverse();
    return new DiffAlgorithmResult(result, false);
  }
}
class SnakePath {
  constructor(prev, x, y, length) {
    this.prev = prev;
    this.x = x;
    this.y = y;
    this.length = length;
  }
}
class FastInt32Array {
  constructor() {
    this.positiveArr = new Int32Array(10);
    this.negativeArr = new Int32Array(10);
  }
  get(idx) {
    if (idx < 0) {
      idx = -idx - 1;
      return this.negativeArr[idx];
    } else {
      return this.positiveArr[idx];
    }
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
}
class FastArrayNegativeIndices {
  constructor() {
    this.positiveArr = [];
    this.negativeArr = [];
  }
  get(idx) {
    if (idx < 0) {
      idx = -idx - 1;
      return this.negativeArr[idx];
    } else {
      return this.positiveArr[idx];
    }
  }
  set(idx, value) {
    if (idx < 0) {
      idx = -idx - 1;
      this.negativeArr[idx] = value;
    } else {
      this.positiveArr[idx] = value;
    }
  }
}

class SetMap {
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
    if (!values) {
      return;
    }
    values.forEach(fn);
  }
  get(key) {
    const values = this.map.get(key);
    if (!values) {
      return /* @__PURE__ */ new Set();
    }
    return values;
  }
}

class LinesSliceCharSequence {
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
      for (let i = 0; i < lineLength; i++) {
        this.elements.push(line.charCodeAt(i));
      }
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
    if (prevCategory === 7 /* LineBreakCR */ && nextCategory === 8 /* LineBreakLF */) {
      return 0;
    }
    if (prevCategory === 8 /* LineBreakLF */) {
      return 150;
    }
    let score2 = 0;
    if (prevCategory !== nextCategory) {
      score2 += 10;
      if (prevCategory === 0 /* WordLower */ && nextCategory === 1 /* WordUpper */) {
        score2 += 1;
      }
    }
    score2 += getCategoryBoundaryScore(prevCategory);
    score2 += getCategoryBoundaryScore(nextCategory);
    return score2;
  }
  translateOffset(offset, preference = "right") {
    const i = findLastIdxMonotonous(this.firstElementOffsetByLineIdx, (value) => value <= offset);
    const lineOffset = offset - this.firstElementOffsetByLineIdx[i];
    return new Position(
      this.range.startLineNumber + i,
      1 + this.lineStartOffsets[i] + lineOffset + (lineOffset === 0 && preference === "left" ? 0 : this.trimmedWsLengthsByLineIdx[i])
    );
  }
  translateRange(range) {
    const pos1 = this.translateOffset(range.start, "right");
    const pos2 = this.translateOffset(range.endExclusive, "left");
    if (pos2.isBefore(pos1)) {
      return Range.fromPositions(pos2, pos2);
    }
    return Range.fromPositions(pos1, pos2);
  }
  /**
   * Finds the word that contains the character at the given offset
   */
  findWordContaining(offset) {
    if (offset < 0 || offset >= this.elements.length) {
      return undefined;
    }
    if (!isWordChar(this.elements[offset])) {
      return undefined;
    }
    let start = offset;
    while (start > 0 && isWordChar(this.elements[start - 1])) {
      start--;
    }
    let end = offset;
    while (end < this.elements.length && isWordChar(this.elements[end])) {
      end++;
    }
    return new OffsetRange(start, end);
  }
  /** fooBar has the two sub-words foo and bar */
  findSubWordContaining(offset) {
    if (offset < 0 || offset >= this.elements.length) {
      return undefined;
    }
    if (!isWordChar(this.elements[offset])) {
      return undefined;
    }
    let start = offset;
    while (start > 0 && isWordChar(this.elements[start - 1]) && !isUpperCase(this.elements[start])) {
      start--;
    }
    let end = offset;
    while (end < this.elements.length && isWordChar(this.elements[end]) && !isUpperCase(this.elements[end])) {
      end++;
    }
    return new OffsetRange(start, end);
  }
  countLinesIn(range) {
    return this.translateOffset(range.endExclusive).lineNumber - this.translateOffset(range.start).lineNumber;
  }
  isStronglyEqual(offset1, offset2) {
    return this.elements[offset1] === this.elements[offset2];
  }
  extendToFullLines(range) {
    const start = findLastMonotonous(this.firstElementOffsetByLineIdx, (x) => x <= range.start) ?? 0;
    const end = findFirstMonotonous(this.firstElementOffsetByLineIdx, (x) => range.endExclusive <= x) ?? this.elements.length;
    return new OffsetRange(start, end);
  }
}
function isWordChar(charCode) {
  return charCode >= 97 && charCode <= 122 || charCode >= 65 && charCode <= 90 || charCode >= 48 && charCode <= 57;
}
function isUpperCase(charCode) {
  return charCode >= 65 && charCode <= 90;
}
const score = {
  [0 /* WordLower */]: 0,
  [1 /* WordUpper */]: 0,
  [2 /* WordNumber */]: 0,
  [3 /* End */]: 10,
  [4 /* Other */]: 2,
  [5 /* Separator */]: 30,
  [6 /* Space */]: 3,
  [7 /* LineBreakCR */]: 10,
  [8 /* LineBreakLF */]: 10
};
function getCategoryBoundaryScore(category) {
  return score[category];
}
function getCategory(charCode) {
  if (charCode === 10) {
    return 8 /* LineBreakLF */;
  } else if (charCode === 13) {
    return 7 /* LineBreakCR */;
  } else if (isSpace(charCode)) {
    return 6 /* Space */;
  } else if (charCode >= 97 && charCode <= 122) {
    return 0 /* WordLower */;
  } else if (charCode >= 65 && charCode <= 90) {
    return 1 /* WordUpper */;
  } else if (charCode >= 48 && charCode <= 57) {
    return 2 /* WordNumber */;
  } else if (charCode === -1) {
    return 3 /* End */;
  } else if (charCode === 44 || charCode === 59) {
    return 5 /* Separator */;
  } else {
    return 4 /* Other */;
  }
}

function computeMovedLines(changes, originalLines, modifiedLines, hashedOriginalLines, hashedModifiedLines, timeout) {
  let { moves, excludedChanges } = computeMovesFromSimpleDeletionsToSimpleInsertions(changes, originalLines, modifiedLines, timeout);
  if (!timeout.isValid()) {
    return [];
  }
  const filteredChanges = changes.filter((c) => !excludedChanges.has(c));
  const unchangedMoves = computeUnchangedMoves(filteredChanges, hashedOriginalLines, hashedModifiedLines, originalLines, modifiedLines, timeout);
  pushMany(moves, unchangedMoves);
  moves = joinCloseConsecutiveMoves(moves);
  moves = moves.filter((current) => {
    const lines = current.original.toOffsetRange().slice(originalLines).map((l) => l.trim());
    const originalText = lines.join("\n");
    return originalText.length >= 15 && countWhere(lines, (l) => l.length >= 2) >= 2;
  });
  moves = removeMovesInSameDiff(changes, moves);
  return moves;
}
function countWhere(arr, predicate) {
  let count = 0;
  for (const t of arr) {
    if (predicate(t)) {
      count++;
    }
  }
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
    if (highestSimilarity > 0.9 && best) {
      insertions.delete(best);
      moves.push(new LineRangeMapping(deletion.range, best.range));
      excludedChanges.add(deletion.source);
      excludedChanges.add(best.source);
    }
    if (!timeout.isValid()) {
      return { moves, excludedChanges };
    }
  }
  return { moves, excludedChanges };
}
function computeUnchangedMoves(changes, hashedOriginalLines, hashedModifiedLines, originalLines, modifiedLines, timeout) {
  const moves = [];
  const original3LineHashes = new SetMap();
  for (const change of changes) {
    for (let i = change.original.startLineNumber; i < change.original.endLineNumberExclusive - 2; i++) {
      const key = `${hashedOriginalLines[i - 1]}:${hashedOriginalLines[i + 1 - 1]}:${hashedOriginalLines[i + 2 - 1]}`;
      original3LineHashes.add(key, { range: new LineRange(i, i + 3) });
    }
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
        for (const lastMapping of lastMappings) {
          if (lastMapping.originalLineRange.endLineNumberExclusive + 1 === range.endLineNumberExclusive && lastMapping.modifiedLineRange.endLineNumberExclusive + 1 === currentModifiedRange.endLineNumberExclusive) {
            lastMapping.originalLineRange = new LineRange(lastMapping.originalLineRange.startLineNumber, range.endLineNumberExclusive);
            lastMapping.modifiedLineRange = new LineRange(lastMapping.modifiedLineRange.startLineNumber, currentModifiedRange.endLineNumberExclusive);
            nextMappings.push(lastMapping);
            return;
          }
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
    if (!timeout.isValid()) {
      return [];
    }
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
      if (s.length < 3) {
        continue;
      }
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
    const linesAbove = Math.max(
      move.original.startLineNumber - firstTouchingChangeOrig.original.startLineNumber,
      move.modified.startLineNumber - firstTouchingChangeMod.modified.startLineNumber
    );
    const lastTouchingChangeOrig = monotonousChanges.findLastMonotonous((c) => c.original.startLineNumber < move.original.endLineNumberExclusive);
    const lastTouchingChangeMod = findLastMonotonous(changes, (c) => c.modified.startLineNumber < move.modified.endLineNumberExclusive);
    const linesBelow = Math.max(
      lastTouchingChangeOrig.original.endLineNumberExclusive - move.original.endLineNumberExclusive,
      lastTouchingChangeMod.modified.endLineNumberExclusive - move.modified.endLineNumberExclusive
    );
    let extendToTop;
    for (extendToTop = 0; extendToTop < linesAbove; extendToTop++) {
      const origLine = move.original.startLineNumber - extendToTop - 1;
      const modLine = move.modified.startLineNumber - extendToTop - 1;
      if (origLine > originalLines.length || modLine > modifiedLines.length) {
        break;
      }
      if (modifiedSet.contains(modLine) || originalSet.contains(origLine)) {
        break;
      }
      if (!areLinesSimilar(originalLines[origLine - 1], modifiedLines[modLine - 1], timeout)) {
        break;
      }
    }
    if (extendToTop > 0) {
      originalSet.addRange(new LineRange(move.original.startLineNumber - extendToTop, move.original.startLineNumber));
      modifiedSet.addRange(new LineRange(move.modified.startLineNumber - extendToTop, move.modified.startLineNumber));
    }
    let extendToBottom;
    for (extendToBottom = 0; extendToBottom < linesBelow; extendToBottom++) {
      const origLine = move.original.endLineNumberExclusive + extendToBottom;
      const modLine = move.modified.endLineNumberExclusive + extendToBottom;
      if (origLine > originalLines.length || modLine > modifiedLines.length) {
        break;
      }
      if (modifiedSet.contains(modLine) || originalSet.contains(origLine)) {
        break;
      }
      if (!areLinesSimilar(originalLines[origLine - 1], modifiedLines[modLine - 1], timeout)) {
        break;
      }
    }
    if (extendToBottom > 0) {
      originalSet.addRange(new LineRange(move.original.endLineNumberExclusive, move.original.endLineNumberExclusive + extendToBottom));
      modifiedSet.addRange(new LineRange(move.modified.endLineNumberExclusive, move.modified.endLineNumberExclusive + extendToBottom));
    }
    if (extendToTop > 0 || extendToBottom > 0) {
      moves[i] = new LineRangeMapping(
        new LineRange(move.original.startLineNumber - extendToTop, move.original.endLineNumberExclusive + extendToBottom),
        new LineRange(move.modified.startLineNumber - extendToTop, move.modified.endLineNumberExclusive + extendToBottom)
      );
    }
  }
  return moves;
}
function areLinesSimilar(line1, line2, timeout) {
  if (line1.trim() === line2.trim()) {
    return true;
  }
  if (line1.length > 300 && line2.length > 300) {
    return false;
  }
  const myersDiffingAlgorithm = new MyersDiffAlgorithm();
  const result = myersDiffingAlgorithm.compute(
    new LinesSliceCharSequence([line1], new Range(1, 1, 1, line1.length), false),
    new LinesSliceCharSequence([line2], new Range(1, 1, 1, line2.length), false),
    timeout
  );
  let commonNonSpaceCharCount = 0;
  const inverted = SequenceDiff.invert(result.diffs, line1.length);
  for (const seq of inverted) {
    seq.seq1Range.forEach((idx) => {
      if (!isSpace(line1.charCodeAt(idx))) {
        commonNonSpaceCharCount++;
      }
    });
  }
  function countNonWsChars(str) {
    let count = 0;
    for (let i = 0; i < line1.length; i++) {
      if (!isSpace(str.charCodeAt(i))) {
        count++;
      }
    }
    return count;
  }
  const longerLineLength = countNonWsChars(line1.length > line2.length ? line1 : line2);
  const r = commonNonSpaceCharCount / longerLineLength > 0.6 && longerLineLength > 10;
  return r;
}
function joinCloseConsecutiveMoves(moves) {
  if (moves.length === 0) {
    return moves;
  }
  moves.sort(compareBy((m) => m.original.startLineNumber, numberComparator));
  const result = [moves[0]];
  for (let i = 1; i < moves.length; i++) {
    const last = result[result.length - 1];
    const current = moves[i];
    const originalDist = current.original.startLineNumber - last.original.endLineNumberExclusive;
    const modifiedDist = current.modified.startLineNumber - last.modified.endLineNumberExclusive;
    const currentMoveAfterLast = originalDist >= 0 && modifiedDist >= 0;
    if (currentMoveAfterLast && originalDist + modifiedDist <= 2) {
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
    const diffBeforeEndOfMoveOriginal = changesMonotonous.findLastMonotonous((c) => c.original.startLineNumber < m.original.endLineNumberExclusive) || new LineRangeMapping(new LineRange(1, 1), new LineRange(1, 1));
    const diffBeforeEndOfMoveModified = findLastMonotonous(changes, (c) => c.modified.startLineNumber < m.modified.endLineNumberExclusive);
    const differentDiffs = diffBeforeEndOfMoveOriginal !== diffBeforeEndOfMoveModified;
    return differentDiffs;
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
  if (sequenceDiffs.length === 0) {
    return sequenceDiffs;
  }
  const result = [];
  result.push(sequenceDiffs[0]);
  for (let i = 1; i < sequenceDiffs.length; i++) {
    const prevResult = result[result.length - 1];
    let cur = sequenceDiffs[i];
    if (cur.seq1Range.isEmpty || cur.seq2Range.isEmpty) {
      const length = cur.seq1Range.start - prevResult.seq1Range.endExclusive;
      let d;
      for (d = 1; d <= length; d++) {
        if (sequence1.getElement(cur.seq1Range.start - d) !== sequence1.getElement(cur.seq1Range.endExclusive - d) || sequence2.getElement(cur.seq2Range.start - d) !== sequence2.getElement(cur.seq2Range.endExclusive - d)) {
          break;
        }
      }
      d--;
      if (d === length) {
        result[result.length - 1] = new SequenceDiff(
          new OffsetRange(prevResult.seq1Range.start, cur.seq1Range.endExclusive - length),
          new OffsetRange(prevResult.seq2Range.start, cur.seq2Range.endExclusive - length)
        );
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
      for (d = 0; d < length; d++) {
        if (!sequence1.isStronglyEqual(cur.seq1Range.start + d, cur.seq1Range.endExclusive + d) || !sequence2.isStronglyEqual(cur.seq2Range.start + d, cur.seq2Range.endExclusive + d)) {
          break;
        }
      }
      if (d === length) {
        result[i + 1] = new SequenceDiff(
          new OffsetRange(cur.seq1Range.start + length, nextResult.seq1Range.endExclusive),
          new OffsetRange(cur.seq2Range.start + length, nextResult.seq2Range.endExclusive)
        );
        continue;
      }
      if (d > 0) {
        cur = cur.delta(d);
      }
    }
    result2.push(cur);
  }
  if (result.length > 0) {
    result2.push(result[result.length - 1]);
  }
  return result2;
}
function shiftSequenceDiffs(sequence1, sequence2, sequenceDiffs) {
  if (!sequence1.getBoundaryScore || !sequence2.getBoundaryScore) {
    return sequenceDiffs;
  }
  for (let i = 0; i < sequenceDiffs.length; i++) {
    const prevDiff = i > 0 ? sequenceDiffs[i - 1] : undefined;
    const diff = sequenceDiffs[i];
    const nextDiff = i + 1 < sequenceDiffs.length ? sequenceDiffs[i + 1] : undefined;
    const seq1ValidRange = new OffsetRange(prevDiff ? prevDiff.seq1Range.endExclusive + 1 : 0, nextDiff ? nextDiff.seq1Range.start - 1 : sequence1.length);
    const seq2ValidRange = new OffsetRange(prevDiff ? prevDiff.seq2Range.endExclusive + 1 : 0, nextDiff ? nextDiff.seq2Range.start - 1 : sequence2.length);
    if (diff.seq1Range.isEmpty) {
      sequenceDiffs[i] = shiftDiffToBetterPosition(diff, sequence1, sequence2, seq1ValidRange, seq2ValidRange);
    } else if (diff.seq2Range.isEmpty) {
      sequenceDiffs[i] = shiftDiffToBetterPosition(diff.swap(), sequence2, sequence1, seq2ValidRange, seq1ValidRange).swap();
    }
  }
  return sequenceDiffs;
}
function shiftDiffToBetterPosition(diff, sequence1, sequence2, seq1ValidRange, seq2ValidRange) {
  const maxShiftLimit = 100;
  let deltaBefore = 1;
  while (diff.seq1Range.start - deltaBefore >= seq1ValidRange.start && diff.seq2Range.start - deltaBefore >= seq2ValidRange.start && sequence2.isStronglyEqual(diff.seq2Range.start - deltaBefore, diff.seq2Range.endExclusive - deltaBefore) && deltaBefore < maxShiftLimit) {
    deltaBefore++;
  }
  deltaBefore--;
  let deltaAfter = 0;
  while (diff.seq1Range.start + deltaAfter < seq1ValidRange.endExclusive && diff.seq2Range.endExclusive + deltaAfter < seq2ValidRange.endExclusive && sequence2.isStronglyEqual(diff.seq2Range.start + deltaAfter, diff.seq2Range.endExclusive + deltaAfter) && deltaAfter < maxShiftLimit) {
    deltaAfter++;
  }
  if (deltaBefore === 0 && deltaAfter === 0) {
    return diff;
  }
  let bestDelta = 0;
  let bestScore = -1;
  for (let delta = -deltaBefore; delta <= deltaAfter; delta++) {
    const seq2OffsetStart = diff.seq2Range.start + delta;
    const seq2OffsetEndExclusive = diff.seq2Range.endExclusive + delta;
    const seq1Offset = diff.seq1Range.start + delta;
    const score = sequence1.getBoundaryScore(seq1Offset) + sequence2.getBoundaryScore(seq2OffsetStart) + sequence2.getBoundaryScore(seq2OffsetEndExclusive);
    if (score > bestScore) {
      bestScore = score;
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
    if (s.seq1Range.start - last.seq1Range.endExclusive <= 2 || s.seq2Range.start - last.seq2Range.endExclusive <= 2) {
      result[result.length - 1] = new SequenceDiff(last.seq1Range.join(s.seq1Range), last.seq2Range.join(s.seq2Range));
    } else {
      result.push(s);
    }
  }
  return result;
}
function extendDiffsToEntireWordIfAppropriate(sequence1, sequence2, sequenceDiffs, findParent, force = false) {
  const equalMappings = SequenceDiff.invert(sequenceDiffs, sequence1.length);
  const additional = [];
  let lastPoint = new OffsetPair(0, 0);
  function scanWord(pair, equalMapping) {
    if (pair.offset1 < lastPoint.offset1 || pair.offset2 < lastPoint.offset2) {
      return;
    }
    const w1 = findParent(sequence1, pair.offset1);
    const w2 = findParent(sequence2, pair.offset2);
    if (!w1 || !w2) {
      return;
    }
    let w = new SequenceDiff(w1, w2);
    const equalPart = w.intersect(equalMapping);
    let equalChars1 = equalPart.seq1Range.length;
    let equalChars2 = equalPart.seq2Range.length;
    while (equalMappings.length > 0) {
      const next = equalMappings[0];
      const intersects = next.seq1Range.intersects(w.seq1Range) || next.seq2Range.intersects(w.seq2Range);
      if (!intersects) {
        break;
      }
      const v1 = findParent(sequence1, next.seq1Range.start);
      const v2 = findParent(sequence2, next.seq2Range.start);
      const v = new SequenceDiff(v1, v2);
      const equalPart2 = v.intersect(next);
      equalChars1 += equalPart2.seq1Range.length;
      equalChars2 += equalPart2.seq2Range.length;
      w = w.join(v);
      if (w.seq1Range.endExclusive >= next.seq1Range.endExclusive) {
        equalMappings.shift();
      } else {
        break;
      }
    }
    if (force && equalChars1 + equalChars2 < w.seq1Range.length + w.seq2Range.length || equalChars1 + equalChars2 < (w.seq1Range.length + w.seq2Range.length) * 2 / 3) {
      additional.push(w);
    }
    lastPoint = w.getEndExclusives();
  }
  while (equalMappings.length > 0) {
    const next = equalMappings.shift();
    if (next.seq1Range.isEmpty) {
      continue;
    }
    scanWord(next.getStarts(), next);
    scanWord(next.getEndExclusives().delta(-1), next);
  }
  const merged = mergeSequenceDiffs(sequenceDiffs, additional);
  return merged;
}
function mergeSequenceDiffs(sequenceDiffs1, sequenceDiffs2) {
  const result = [];
  while (sequenceDiffs1.length > 0 || sequenceDiffs2.length > 0) {
    const sd1 = sequenceDiffs1[0];
    const sd2 = sequenceDiffs2[0];
    let next;
    if (sd1 && (!sd2 || sd1.seq1Range.start < sd2.seq1Range.start)) {
      next = sequenceDiffs1.shift();
    } else {
      next = sequenceDiffs2.shift();
    }
    if (result.length > 0 && result[result.length - 1].seq1Range.endExclusive >= next.seq1Range.start) {
      result[result.length - 1] = result[result.length - 1].join(next);
    } else {
      result.push(next);
    }
  }
  return result;
}
function removeVeryShortMatchingLinesBetweenDiffs(sequence1, _sequence2, sequenceDiffs) {
  let diffs = sequenceDiffs;
  if (diffs.length === 0) {
    return diffs;
  }
  let counter = 0;
  let shouldRepeat;
  do {
    shouldRepeat = false;
    const result = [
      diffs[0]
    ];
    for (let i = 1; i < diffs.length; i++) {
      let shouldJoinDiffs = function(before, after) {
        const unchangedRange = new OffsetRange(lastResult.seq1Range.endExclusive, cur.seq1Range.start);
        const unchangedText = sequence1.getText(unchangedRange);
        const unchangedTextWithoutWs = unchangedText.replace(/\s/g, "");
        if (unchangedTextWithoutWs.length <= 4 && (before.seq1Range.length + before.seq2Range.length > 5 || after.seq1Range.length + after.seq2Range.length > 5)) {
          return true;
        }
        return false;
      };
      const cur = diffs[i];
      const lastResult = result[result.length - 1];
      const shouldJoin = shouldJoinDiffs(lastResult, cur);
      if (shouldJoin) {
        shouldRepeat = true;
        result[result.length - 1] = result[result.length - 1].join(cur);
      } else {
        result.push(cur);
      }
    }
    diffs = result;
  } while (counter++ < 10 && shouldRepeat);
  return diffs;
}
function removeVeryShortMatchingTextBetweenLongDiffs(sequence1, sequence2, sequenceDiffs) {
  let diffs = sequenceDiffs;
  if (diffs.length === 0) {
    return diffs;
  }
  let counter = 0;
  let shouldRepeat;
  do {
    shouldRepeat = false;
    const result = [
      diffs[0]
    ];
    for (let i = 1; i < diffs.length; i++) {
      let shouldJoinDiffs = function(before, after) {
        const unchangedRange = new OffsetRange(lastResult.seq1Range.endExclusive, cur.seq1Range.start);
        const unchangedLineCount = sequence1.countLinesIn(unchangedRange);
        if (unchangedLineCount > 5 || unchangedRange.length > 500) {
          return false;
        }
        const unchangedText = sequence1.getText(unchangedRange).trim();
        if (unchangedText.length > 20 || unchangedText.split(/\r\n|\r|\n/).length > 1) {
          return false;
        }
        const beforeLineCount1 = sequence1.countLinesIn(before.seq1Range);
        const beforeSeq1Length = before.seq1Range.length;
        const beforeLineCount2 = sequence2.countLinesIn(before.seq2Range);
        const beforeSeq2Length = before.seq2Range.length;
        const afterLineCount1 = sequence1.countLinesIn(after.seq1Range);
        const afterSeq1Length = after.seq1Range.length;
        const afterLineCount2 = sequence2.countLinesIn(after.seq2Range);
        const afterSeq2Length = after.seq2Range.length;
        const max = 2 * 40 + 50;
        function cap(v) {
          return Math.min(v, max);
        }
        if (Math.pow(Math.pow(cap(beforeLineCount1 * 40 + beforeSeq1Length), 1.5) + Math.pow(cap(beforeLineCount2 * 40 + beforeSeq2Length), 1.5), 1.5) + Math.pow(Math.pow(cap(afterLineCount1 * 40 + afterSeq1Length), 1.5) + Math.pow(cap(afterLineCount2 * 40 + afterSeq2Length), 1.5), 1.5) > (max ** 1.5) ** 1.5 * 1.3) {
          return true;
        }
        return false;
      };
      const cur = diffs[i];
      const lastResult = result[result.length - 1];
      const shouldJoin = shouldJoinDiffs(lastResult, cur);
      if (shouldJoin) {
        shouldRepeat = true;
        result[result.length - 1] = result[result.length - 1].join(cur);
      } else {
        result.push(cur);
      }
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
    if (shouldMarkAsChanged(prefix)) {
      newDiff = newDiff.deltaStart(-prefix.length);
    }
    const suffix = sequence1.getText(new OffsetRange(cur.seq1Range.endExclusive, fullRange1.endExclusive));
    if (shouldMarkAsChanged(suffix)) {
      newDiff = newDiff.deltaEnd(suffix.length);
    }
    const availableSpace = SequenceDiff.fromOffsetPairs(
      prev ? prev.getEndExclusives() : OffsetPair.zero,
      next ? next.getStarts() : OffsetPair.max
    );
    const result = newDiff.intersect(availableSpace);
    if (newDiffs.length > 0 && result.getStarts().equals(newDiffs[newDiffs.length - 1].getEndExclusives())) {
      newDiffs[newDiffs.length - 1] = newDiffs[newDiffs.length - 1].join(result);
    } else {
      newDiffs.push(result);
    }
  });
  return newDiffs;
}

class LineSequence {
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
    const indentationBefore = length === 0 ? 0 : getIndentation(this.lines[length - 1]);
    const indentationAfter = length === this.lines.length ? 0 : getIndentation(this.lines[length]);
    return 1e3 - (indentationBefore + indentationAfter);
  }
  getText(range) {
    return this.lines.slice(range.start, range.endExclusive).join("\n");
  }
  isStronglyEqual(offset1, offset2) {
    return this.lines[offset1] === this.lines[offset2];
  }
}
function getIndentation(str) {
  let i = 0;
  while (i < str.length && (str.charCodeAt(i) === 32 || str.charCodeAt(i) === 9)) {
    i++;
  }
  return i;
}

class DefaultLinesDiffComputer {
  constructor() {
    this.dynamicProgrammingDiffing = new DynamicProgrammingDiffing();
    this.myersDiffingAlgorithm = new MyersDiffAlgorithm();
  }
  computeDiff(originalLines, modifiedLines, options) {
    if (originalLines.length <= 1 && equals(originalLines, modifiedLines, (a, b) => a === b)) {
      return new LinesDiff([], [], false);
    }
    if (originalLines.length === 1 && originalLines[0].length === 0 || modifiedLines.length === 1 && modifiedLines[0].length === 0) {
      return new LinesDiff([
        new DetailedLineRangeMapping(
          new LineRange(1, originalLines.length + 1),
          new LineRange(1, modifiedLines.length + 1),
          [
            new RangeMapping(
              new Range(1, 1, originalLines.length, originalLines[originalLines.length - 1].length + 1),
              new Range(1, 1, modifiedLines.length, modifiedLines[modifiedLines.length - 1].length + 1)
            )
          ]
        )
      ], [], false);
    }
    const timeout = options.maxComputationTimeMs === 0 ? InfiniteTimeout.instance : new DateTimeout(options.maxComputationTimeMs);
    const considerWhitespaceChanges = !options.ignoreTrimWhitespace;
    const perfectHashes = /* @__PURE__ */ new Map();
    function getOrCreateHash(text) {
      let hash = perfectHashes.get(text);
      if (hash === undefined) {
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
      if (sequence1.length + sequence2.length < 1700) {
        return this.dynamicProgrammingDiffing.compute(
          sequence1,
          sequence2,
          timeout,
          (offset1, offset2) => originalLines[offset1] === modifiedLines[offset2] ? modifiedLines[offset2].length === 0 ? 0.1 : 1 + Math.log(1 + modifiedLines[offset2].length) : 0.99
        );
      }
      return this.myersDiffingAlgorithm.compute(
        sequence1,
        sequence2,
        timeout
      );
    })();
    let lineAlignments = lineAlignmentResult.diffs;
    let hitTimeout = lineAlignmentResult.hitTimeout;
    lineAlignments = optimizeSequenceDiffs(sequence1, sequence2, lineAlignments);
    lineAlignments = removeVeryShortMatchingLinesBetweenDiffs(sequence1, sequence2, lineAlignments);
    const alignments = [];
    const scanForWhitespaceChanges = (equalLinesCount) => {
      if (!considerWhitespaceChanges) {
        return;
      }
      for (let i = 0; i < equalLinesCount; i++) {
        const seq1Offset = seq1LastStart + i;
        const seq2Offset = seq2LastStart + i;
        if (originalLines[seq1Offset] !== modifiedLines[seq2Offset]) {
          const characterDiffs = this.refineDiff(originalLines, modifiedLines, new SequenceDiff(
            new OffsetRange(seq1Offset, seq1Offset + 1),
            new OffsetRange(seq2Offset, seq2Offset + 1)
          ), timeout, considerWhitespaceChanges, options);
          for (const a of characterDiffs.mappings) {
            alignments.push(a);
          }
          if (characterDiffs.hitTimeout) {
            hitTimeout = true;
          }
        }
      }
    };
    let seq1LastStart = 0;
    let seq2LastStart = 0;
    for (const diff of lineAlignments) {
      assertFn(() => diff.seq1Range.start - seq1LastStart === diff.seq2Range.start - seq2LastStart);
      const equalLinesCount = diff.seq1Range.start - seq1LastStart;
      scanForWhitespaceChanges(equalLinesCount);
      seq1LastStart = diff.seq1Range.endExclusive;
      seq2LastStart = diff.seq2Range.endExclusive;
      const characterDiffs = this.refineDiff(originalLines, modifiedLines, diff, timeout, considerWhitespaceChanges, options);
      if (characterDiffs.hitTimeout) {
        hitTimeout = true;
      }
      for (const a of characterDiffs.mappings) {
        alignments.push(a);
      }
    }
    scanForWhitespaceChanges(originalLines.length - seq1LastStart);
    const changes = lineRangeMappingFromRangeMappings(alignments, new ArrayText(originalLines), new ArrayText(modifiedLines));
    let moves = [];
    if (options.computeMoves) {
      moves = this.computeMoves(changes, originalLines, modifiedLines, originalLinesHashes, modifiedLinesHashes, timeout, considerWhitespaceChanges, options);
    }
    assertFn(() => {
      function validatePosition(pos, lines) {
        if (pos.lineNumber < 1 || pos.lineNumber > lines.length) {
          return false;
        }
        const line = lines[pos.lineNumber - 1];
        if (pos.column < 1 || pos.column > line.length + 1) {
          return false;
        }
        return true;
      }
      function validateRange(range, lines) {
        if (range.startLineNumber < 1 || range.startLineNumber > lines.length + 1) {
          return false;
        }
        if (range.endLineNumberExclusive < 1 || range.endLineNumberExclusive > lines.length + 1) {
          return false;
        }
        return true;
      }
      for (const c of changes) {
        if (!c.innerChanges) {
          return false;
        }
        for (const ic of c.innerChanges) {
          const valid = validatePosition(ic.modifiedRange.getStartPosition(), modifiedLines) && validatePosition(ic.modifiedRange.getEndPosition(), modifiedLines) && validatePosition(ic.originalRange.getStartPosition(), originalLines) && validatePosition(ic.originalRange.getEndPosition(), originalLines);
          if (!valid) {
            return false;
          }
        }
        if (!validateRange(c.modified, modifiedLines) || !validateRange(c.original, originalLines)) {
          return false;
        }
      }
      return true;
    });
    return new LinesDiff(changes, moves, hitTimeout);
  }
  computeMoves(changes, originalLines, modifiedLines, hashedOriginalLines, hashedModifiedLines, timeout, considerWhitespaceChanges, options) {
    const moves = computeMovedLines(
      changes,
      originalLines,
      modifiedLines,
      hashedOriginalLines,
      hashedModifiedLines,
      timeout
    );
    const movesWithDiffs = moves.map((m) => {
      const moveChanges = this.refineDiff(originalLines, modifiedLines, new SequenceDiff(
        m.original.toOffsetRange(),
        m.modified.toOffsetRange()
      ), timeout, considerWhitespaceChanges, options);
      const mappings = lineRangeMappingFromRangeMappings(moveChanges.mappings, new ArrayText(originalLines), new ArrayText(modifiedLines), true);
      return new MovedText(m, mappings);
    });
    return movesWithDiffs;
  }
  refineDiff(originalLines, modifiedLines, diff, timeout, considerWhitespaceChanges, options) {
    const lineRangeMapping = toLineRangeMapping(diff);
    const rangeMapping = lineRangeMapping.toRangeMapping2(originalLines, modifiedLines);
    const slice1 = new LinesSliceCharSequence(originalLines, rangeMapping.originalRange, considerWhitespaceChanges);
    const slice2 = new LinesSliceCharSequence(modifiedLines, rangeMapping.modifiedRange, considerWhitespaceChanges);
    const diffResult = slice1.length + slice2.length < 500 ? this.dynamicProgrammingDiffing.compute(slice1, slice2, timeout) : this.myersDiffingAlgorithm.compute(slice1, slice2, timeout);
    let diffs = diffResult.diffs;
    diffs = optimizeSequenceDiffs(slice1, slice2, diffs);
    diffs = extendDiffsToEntireWordIfAppropriate(slice1, slice2, diffs, (seq, idx) => seq.findWordContaining(idx));
    if (options.extendToSubwords) {
      diffs = extendDiffsToEntireWordIfAppropriate(slice1, slice2, diffs, (seq, idx) => seq.findSubWordContaining(idx), true);
    }
    diffs = removeShortMatches(slice1, slice2, diffs);
    diffs = removeVeryShortMatchingTextBetweenLongDiffs(slice1, slice2, diffs);
    const result = diffs.map(
      (d) => new RangeMapping(
        slice1.translateRange(d.seq1Range),
        slice2.translateRange(d.seq2Range)
      )
    );
    return {
      mappings: result,
      hitTimeout: diffResult.hitTimeout
    };
  }
}
function toLineRangeMapping(sequenceDiff) {
  return new LineRangeMapping(
    new LineRange(sequenceDiff.seq1Range.start + 1, sequenceDiff.seq1Range.endExclusive + 1),
    new LineRange(sequenceDiff.seq2Range.start + 1, sequenceDiff.seq2Range.endExclusive + 1)
  );
}

function computeDiff(originalLines, modifiedLines, options) {
  let diffComputer = new DefaultLinesDiffComputer();
  var result = diffComputer.computeDiff(originalLines, modifiedLines, options);
  return result?.changes.map((changes) => {
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

__webpack_unused_export__ = computeDiff;

var AceRange = (__webpack_require__(91902)/* .Range */ .Q);

var {DiffChunk} = __webpack_require__(70232); 
 
/**
 * VSCode’s computeDiff provider
 */

class DiffProvider {
    compute(originalLines, modifiedLines, opts) {
        if (!opts) opts = {};
        if (!opts.maxComputationTimeMs) opts.maxComputationTimeMs = 500;
        const chunks = computeDiff(originalLines, modifiedLines, opts) || [];
        return chunks.map(
            c => new DiffChunk(new AceRange(c.origStart, 0, c.origEnd, 0), new AceRange(c.editStart, 0, c.editEnd, 0),
                c.charChanges
            ));
    }
}

exports.P = DiffProvider;

/***/ }),

/***/ 60352:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var Decorator = (__webpack_require__(31079)/* .Decorator */ .K);

class ScrollDiffDecorator extends Decorator {
    /**
     * @param {import("../../../ace-internal").Ace.VScrollbar} scrollbarV
     * @param {import("../../virtual_renderer").VirtualRenderer} renderer
     * @param {boolean} [forInlineDiff]
     */
    constructor(scrollbarV, renderer, forInlineDiff) {
        super(scrollbarV, renderer);

        this.colors.dark["delete"] = "rgba(255, 18, 18, 1)";
        this.colors.dark["insert"] = "rgba(18, 136, 18, 1)";
        this.colors.light["delete"] = "rgb(255,51,51)";
        this.colors.light["insert"] = "rgb(32,133,72)";

        this.$zones = [];
        this.$forInlineDiff = forInlineDiff;
    }

    /**
     * @param {number} startRow
     * @param {number} endRow
     * @param {"delete"|"insert"} type
     */
    addZone(startRow, endRow, type) {
        this.$zones.push({
            startRow,
            endRow,
            type
        });
    }

    /**
     * @param {import("../../edit_session").EditSession} sessionA
     * @param {import("../../edit_session").EditSession} sessionB
     */
    setSessions(sessionA, sessionB) {
        this.sessionA = sessionA;
        this.sessionB = sessionB;
    }

    $updateDecorators(config) {
        if (typeof this.canvas.getContext !== "function") {
            return;
        }
        super.$updateDecorators(config);
        if (this.$zones.length > 0) {
            var colors = (this.renderer.theme.isDark === true) ? this.colors.dark : this.colors.light;
            var ctx = this.canvas.getContext("2d");
            this.$setDiffDecorators(ctx, colors);
        }
    }

    /**
     * @param {number} row
     * @param {string} type
     */
    $transformPosition(row, type) {
        if (type == "delete") {
            return this.sessionA.documentToScreenRow(row, 0);
        } else {
            return this.sessionB.documentToScreenRow(row, 0);
        }
    }

    $setDiffDecorators(ctx, colors) {
        function compare(a, b) {
            if (a.from === b.from) {
                return a.to - b.to;
            }
            return a.from - b.from;
        }

        var zones = this.$zones;
        if (zones) {
            var resolvedZones = [];

            const deleteZones = zones.filter(z => z.type === "delete");
            const insertZones = zones.filter(z => z.type === "insert");

            [deleteZones, insertZones].forEach((typeZones) => {
                typeZones.forEach((zone, i) => {
                    const offset1 = this.$transformPosition(zone.startRow, zone.type) * this.lineHeight;
                    let offset2 = this.$transformPosition(zone.endRow, zone.type) * this.lineHeight + this.lineHeight;

                    const y1 = Math.round(this.heightRatio * offset1);
                    const y2 = Math.round(this.heightRatio * offset2);

                    const padding = 1;

                    let ycenter = Math.round((y1 + y2) / 2);
                    let halfHeight = (y2 - ycenter);

                    if (halfHeight < this.halfMinDecorationHeight) {
                        halfHeight = this.halfMinDecorationHeight;
                    }

                    const previousZone = resolvedZones[resolvedZones.length - 1];

                    if (i > 0 && previousZone && previousZone.type === zone.type && ycenter - halfHeight < previousZone.to + padding) {
                        ycenter = resolvedZones[resolvedZones.length - 1].to + padding + halfHeight;
                    }

                    if (ycenter - halfHeight < 0) {
                        ycenter = halfHeight;
                    }
                    if (ycenter + halfHeight > this.canvasHeight) {
                        ycenter = this.canvasHeight - halfHeight;
                    }

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
                const zoneTo = zone.to;
                const zoneHeight = zoneTo - zoneFrom;
                if (this.$forInlineDiff) {
                    ctx.fillRect(this.oneZoneWidth, zoneFrom, 2 * this.oneZoneWidth, zoneHeight);
                } else {
                    if (zone.type == "delete") {
                        ctx.fillRect(this.oneZoneWidth, zoneFrom, this.oneZoneWidth, zoneHeight);
                    }
                    else {
                        ctx.fillRect(2 * this.oneZoneWidth, zoneFrom, this.oneZoneWidth, zoneHeight);
                    }
                }
            }

        }
    }

    setZoneWidth() {
        this.oneZoneWidth = Math.round(this.canvasWidth / 3);
    }
}

exports.K = ScrollDiffDecorator;

/***/ }),

/***/ 31273:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var BaseDiffView = (__webpack_require__(70232).BaseDiffView);
var config = __webpack_require__(76321);

class SplitDiffView extends BaseDiffView {
    /**
     * Constructs a new side by side DiffView instance.
     *
     * @param {import("../diff").DiffModel} [diffModel] - The model for the diff view.
     */
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

    /*** scroll locking ***/
    align() {
        var diffView = this;

        this.$initWidgets(diffView.editorA);
        this.$initWidgets(diffView.editorB);

        diffView.chunks.forEach(function (ch) {
            var diff1 = diffView.$screenRow(ch.old.start, diffView.sessionA);
            var diff2 = diffView.$screenRow(ch.new.start, diffView.sessionB); 

            if (diff1 < diff2) {
                diffView.$addWidget(diffView.sessionA, {
                    rowCount: diff2 - diff1,
                    rowsAbove: ch.old.start.row === 0 ? diff2 - diff1 : 0,
                    row: ch.old.start.row === 0 ? 0 : ch.old.start.row - 1
                });
            }
            else if (diff1 > diff2) {
                diffView.$addWidget(diffView.sessionB, {
                    rowCount: diff1 - diff2,
                    rowsAbove: ch.new.start.row === 0 ? diff1 - diff2 : 0,
                    row: ch.new.start.row === 0 ? 0 : ch.new.start.row - 1
                });
            }

            var diff1 = diffView.$screenRow(ch.old.end, diffView.sessionA);
            var diff2 = diffView.$screenRow(ch.new.end, diffView.sessionB); 
            if (diff1 < diff2) {
                diffView.$addWidget(diffView.sessionA, {
                    rowCount: diff2 - diff1,
                    rowsAbove: ch.old.end.row === 0 ? diff2 - diff1 : 0,
                    row: ch.old.end.row === 0 ? 0 : ch.old.end.row - 1
                });
            }
            else if (diff1 > diff2) {
                diffView.$addWidget(diffView.sessionB, {
                    rowCount: diff1 - diff2,
                    rowsAbove: ch.new.end.row === 0 ? diff1 - diff2 : 0,
                    row: ch.new.end.row === 0 ? 0 : ch.new.end.row - 1
                });
            }
        });
        diffView.sessionA["_emit"]("changeFold", {data: {start: {row: 0}}});
        diffView.sessionB["_emit"]("changeFold", {data: {start: {row: 0}}});
    }

    onScroll(e, session) {
        this.syncScroll(this.sessionA === session ? this.editorA.renderer : this.editorB.renderer);
    }

    /**
     * @param {import("../../virtual_renderer").VirtualRenderer} renderer
     */
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
            if (isOrig && this.scrollA == r.session.getScrollTop()) return; else if (!isOrig && this.scrollB
                == r.session.getScrollTop()) return;
        }
        var rOther = isOrig ? r2 : r1;

        var targetPos = r.session.getScrollTop();

        this.$syncScroll = false;

        if (isOrig) {
            this.scrollA = r.session.getScrollTop();
            this.scrollB = targetPos;
        }
        else {
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
        var isScrolable = editor.renderer.isScrollableBy(ev.wheelX * ev.speed, ev.wheelY * ev.speed);
        if (!isScrolable) {
            var other = editor == this.editorA ? this.editorB : this.editorA;
            if (other.renderer.isScrollableBy(ev.wheelX * ev.speed, ev.wheelY * ev.speed)) other.renderer.scrollBy(
                ev.wheelX * ev.speed, ev.wheelY * ev.speed);
            return ev.stop();
        }
    }

    $attachSessionsEventHandlers() {
        this.$attachSessionEventHandlers(this.editorA, this.markerA);
        this.$attachSessionEventHandlers(this.editorB, this.markerB);
    }

    /**
     * @param {import("../../editor").Editor} editor
     * @param {import("./base_diff_view").DiffHighlight} marker
     */
    $attachSessionEventHandlers(editor, marker) {
        editor.session.on("changeScrollTop", this.onScroll);
        editor.session.on("changeFold", this.onChangeFold);
        // @ts-expect-error
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

    /**
     * @param {import("../../editor").Editor} editor
     * @param {import("./base_diff_view").DiffHighlight} marker
     */
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
}


exports.X = SplitDiffView;


/***/ }),

/***/ 95403:
/***/ ((__unused_webpack_module, exports) => {

exports.n = `
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


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjc3NjAuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUIsb0RBQWlEO0FBQ3RFLG9CQUFvQixtREFBK0M7QUFDbkUsbUJBQW1CLGtEQUFnRDs7QUFFbkU7QUFDQTtBQUNBLGFBQWEsUUFBUTtBQUNyQixjQUFjLDRCQUE0QjtBQUMxQyxjQUFjLDRCQUE0QjtBQUMxQyxjQUFjLHVDQUF1QztBQUNyRCxjQUFjLHVDQUF1QztBQUNyRCxjQUFjLFFBQVE7QUFDdEIsY0FBYyxRQUFRO0FBQ3RCLGNBQWMsU0FBUztBQUN2QixjQUFjLGVBQWU7QUFDN0I7O0FBRUE7QUFDQSxhQUFhLFFBQVE7QUFDckIsY0FBYyxTQUFTO0FBQ3ZCLGNBQWMsU0FBUztBQUN2QixjQUFjLFNBQVM7QUFDdkIsY0FBYyxTQUFTO0FBQ3ZCLGNBQWMsU0FBUztBQUN2QixjQUFjLFFBQVE7QUFDdEIsY0FBYywrQ0FBK0M7QUFDN0Q7O0FBRUE7QUFDQSxhQUFhLFFBQVE7QUFDckIsY0FBYywrR0FBK0c7QUFDN0g7OztBQUdBO0FBQ0E7QUFDQSxXQUFXLFdBQVc7QUFDdEIsV0FBVyxpQkFBaUI7QUFDNUIsYUFBYSw4QkFBOEI7QUFDM0M7QUFDQTtBQUNBO0FBQ0EsMkVBQTJFO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsc0JBQXNCO0FBQ3RCLHFCQUFxQjtBQUNyQixvQkFBb0I7QUFDcEIsc0JBQXNCOzs7Ozs7Ozs7QUNyRlQ7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLElBQWU7QUFDakMsWUFBWSwyQ0FBNEI7QUFDeEMsVUFBVSxtQkFBTyxDQUFDLEtBQWU7QUFDakMsYUFBYSxtQkFBTyxDQUFDLEtBQWM7QUFDbkMsa0JBQWtCLGlEQUF5QztBQUMzRCwwQkFBMEIseURBQXNEOztBQUVoRjtBQUNBLFVBQVUsNkNBQWtDOztBQUU1QyxhQUFhLG1DQUE4QjtBQUMzQyxlQUFlLDRDQUFpRDtBQUNoRSxrQkFBa0IsaURBQXdDO0FBQzFELGdCQUFnQiwrQ0FBMkM7O0FBRTNELG1CQUFPLENBQUMsS0FBc0I7QUFDOUI7QUFDQSxtQkFBTyxDQUFDLEtBQW9COztBQUU1QixrQkFBa0IsaURBQXlDOztBQUUzRCxpQ0FBaUMsZ0VBQXdEOztBQUV6RjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsU0FBUztBQUN4QixlQUFlLGFBQWE7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtCQUFrQixtRUFBbUU7QUFDckY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZUFBZSw2QkFBNkI7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLDJEQUEyRDtBQUNyRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZUFBZSxhQUFhO0FBQzVCLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix1QkFBdUI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVDQUF1QyxRQUFRO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCLGVBQWUsdUJBQXVCLHVCQUF1QjtBQUM5RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CLFlBQVksd0NBQXdDO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLFdBQVc7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLFVBQVU7QUFDekIsZUFBZSxVQUFVO0FBQ3pCLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0EsZUFBZSw0Q0FBNEM7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxlQUFlLGFBQWE7QUFDNUIsaUJBQWlCLGtCQUFrQixtQkFBbUIsZ0JBQWdCO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0EsZUFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxlQUFlLDJDQUEyQztBQUMxRCxlQUFlLGFBQWE7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLGFBQWE7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLE9BQU8sUUFBUSxTQUFTO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGVBQWUsT0FBTztBQUN0QixlQUFlLFNBQVM7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxlQUFlLDhCQUE4QjtBQUM3QyxlQUFlLFNBQVM7QUFDeEIsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLDhCQUE4QjtBQUM5RDs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZUFBZSxhQUFhO0FBQzVCLGVBQWUsYUFBYTtBQUM1QixlQUFlLFFBQVE7QUFDdkIsZUFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGVBQWUsYUFBYTtBQUM1QixlQUFlLFFBQVE7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQSxlQUFlLGFBQWE7QUFDNUIsZUFBZSxRQUFRO0FBQ3ZCLGVBQWUsU0FBUztBQUN4QixnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBLHdCQUF3QixtQkFBbUI7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUEsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG9CQUFvQjs7O0FBR3BCO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsZUFBZSxPQUFPO0FBQ3RCLGdCQUFnQjtBQUNoQjtBQUNBLDZGQUE2RixJQUFJO0FBQ2pHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSx5Q0FBeUM7QUFDeEQ7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLE9BQU87QUFDeEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsNENBQTRDLHVCQUF1QjtBQUNuRTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGdDQUFnQyxtQ0FBbUM7QUFDbkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdFQUFnRTtBQUNoRTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQixPQUFPO0FBQ3hCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGlCQUFpQjtBQUNqQixxQkFBcUI7Ozs7Ozs7QUMzaENyQixVQUFVLG1CQUFPLENBQUMsS0FBZTs7QUFFakM7QUFDQTtBQUNBLGVBQWUsK0JBQStCO0FBQzlDLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBa0M7Ozs7Ozs7OztBQ3JFckI7OztBQUdiLHFCQUFxQix5Q0FBd0M7QUFDN0QsaUJBQWlCLDRDQUFpRDtBQUNsRSxlQUFlLG1CQUFPLENBQUMsS0FBYzs7QUFFckM7QUFDQTtBQUNBO0FBQ0EsZUFBZSw2QkFBNkI7QUFDNUMsZUFBZSxhQUFhO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYixTQUFTO0FBQ1Qsa0RBQWtELE9BQU8sUUFBUSxTQUFTO0FBQzFFLGtEQUFrRCxPQUFPLFFBQVEsU0FBUztBQUMxRTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsZUFBZSxRQUFRO0FBQ3ZCLGVBQWUsb0NBQW9DO0FBQ25EO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBc0I7Ozs7Ozs7Ozs7QUN2WlQ7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsU0FBUztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLGlCQUFpQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixnQkFBZ0I7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0RBQXNELFFBQVE7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFELGdCQUFnQjtBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLFdBQVcsSUFBSSxrQkFBa0I7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4REFBOEQsZ0JBQWdCO0FBQzlFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4REFBOEQsZ0JBQWdCO0FBQzlFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsdUJBQXVCO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsdUJBQXVCO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQix1QkFBdUI7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzREFBc0QsaUJBQWlCLHlDQUF5Qyx1QkFBdUI7QUFDdkk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsOEJBQThCO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEMseUJBQXlCO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLDBCQUEwQjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLDBCQUEwQjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxlQUFlO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QyxzQ0FBc0M7QUFDbEY7QUFDQSxzQkFBc0IsaUJBQWlCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGVBQWU7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLHdCQUF3QjtBQUM5Qyx3QkFBd0Isd0JBQXdCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixpQkFBaUI7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0RBQXNELHdDQUF3QztBQUM5RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsZ0JBQWdCO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixVQUFVO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0EsUUFBUSx5QkFBeUI7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBa0QsZ0RBQWdEO0FBQ2xHLHFCQUFxQiwyQkFBMkIsR0FBRywrQkFBK0IsR0FBRywrQkFBK0I7QUFDcEgscUNBQXFDLGdDQUFnQztBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBa0QsZ0RBQWdEO0FBQ2xHLHFCQUFxQiwyQkFBMkIsR0FBRywrQkFBK0IsR0FBRywrQkFBK0I7QUFDcEg7QUFDQTtBQUNBLDBDQUEwQyxPQUFPO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLGtCQUFrQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLDBCQUEwQjtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLDZCQUE2QjtBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGtCQUFrQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixrQkFBa0I7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLDBCQUEwQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLGFBQWE7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQix1QkFBdUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixZQUFZO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsMEJBQTBCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxxQkFBcUI7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGtCQUFrQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixrQkFBa0I7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLHFCQUFxQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsR0FBRztBQUNIOztBQUVBLHlCQUFtQjs7QUFFbkIsZUFBZSwyQ0FBK0I7O0FBRTlDLEtBQUssV0FBVyxFQUFFLG1CQUFPLENBQUMsS0FBbUI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFvQjs7Ozs7OztBQzc2RXBCLGdCQUFnQiwrQ0FBMkM7O0FBRTNEO0FBQ0E7QUFDQSxlQUFlLGdEQUFnRDtBQUMvRCxlQUFlLGtEQUFrRDtBQUNqRSxlQUFlLFNBQVM7QUFDeEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGVBQWUsUUFBUTtBQUN2QixlQUFlLFFBQVE7QUFDdkIsZUFBZSxtQkFBbUI7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0EsZUFBZSwwQ0FBMEM7QUFDekQsZUFBZSwwQ0FBMEM7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZUFBZSxRQUFRO0FBQ3ZCLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckIsaUJBQWlCO0FBQ2pCLGFBQWE7O0FBRWI7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUEyQjs7Ozs7Ozs7QUNwSmQ7O0FBRWIsbUJBQW1CLHlDQUF3QztBQUMzRCxhQUFhLG1CQUFPLENBQUMsS0FBYzs7QUFFbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLDZCQUE2QjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsU0FBUztBQUNULGtEQUFrRCxPQUFPLFFBQVEsU0FBUztBQUMxRSxrREFBa0QsT0FBTyxRQUFRLFNBQVM7QUFDMUU7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZUFBZSxrREFBa0Q7QUFDakU7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDRFQUE0RTtBQUM1RTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGVBQWUsK0JBQStCO0FBQzlDLGVBQWUsMENBQTBDO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZUFBZSwrQkFBK0I7QUFDOUMsZUFBZSwwQ0FBMEM7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQSxTQUFxQjs7Ozs7Ozs7QUN0TnJCLFNBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvZXh0L2RpZmYuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvZXh0L2RpZmYvYmFzZV9kaWZmX3ZpZXcuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvZXh0L2RpZmYvZ3V0dGVyX2RlY29yYXRvci5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9leHQvZGlmZi9pbmxpbmVfZGlmZl92aWV3LmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL2V4dC9kaWZmL3Byb3ZpZGVycy9kZWZhdWx0LmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL2V4dC9kaWZmL3Njcm9sbF9kaWZmX2RlY29yYXRvci5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9leHQvZGlmZi9zcGxpdF9kaWZmX3ZpZXcuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvZXh0L2RpZmYvc3R5bGVzLWNzcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqICMjIERpZmYgZXh0ZW5zaW9uXG4gKlxuICogUHJvdmlkZXMgc2lkZS1ieS1zaWRlIGFuZCBpbmxpbmUgZGlmZiB2aWV3IGNhcGFiaWxpdGllcyBmb3IgY29tcGFyaW5nIGNvZGUgZGlmZmVyZW5jZXMgYmV0d2VlbiB0d28gdmVyc2lvbnMuXG4gKiBTdXBwb3J0cyB2aXN1YWwgaGlnaGxpZ2h0aW5nIG9mIGFkZGl0aW9ucywgZGVsZXRpb25zLCBhbmQgbW9kaWZpY2F0aW9ucyB3aXRoIGN1c3RvbWl6YWJsZSBkaWZmIHByb3ZpZGVyc1xuICogYW5kIHJlbmRlcmluZyBvcHRpb25zLiBJbmNsdWRlcyBmZWF0dXJlcyBmb3Igc3luY2hyb25pemVkIHNjcm9sbGluZywgbGluZSBudW1iZXIgYWxpZ25tZW50LCBhbmRcbiAqIHZhcmlvdXMgZGlmZiBjb21wdXRhdGlvbiBhbGdvcml0aG1zLlxuICpcbiAqICoqQ29tcG9uZW50czoqKlxuICogLSBgSW5saW5lRGlmZlZpZXdgOiBTaW5nbGUgZWRpdG9yIHZpZXcgc2hvd2luZyBjaGFuZ2VzIGlubGluZSB3aXRoIG1hcmtlcnNcbiAqIC0gYFNwbGl0RGlmZlZpZXdgOiBTaWRlLWJ5LXNpZGUgY29tcGFyaXNvbiB2aWV3IHdpdGggdHdvIHN5bmNocm9uaXplZCBlZGl0b3JzXG4gKiAtIGBEaWZmUHJvdmlkZXJgOiBDb25maWd1cmFibGUgYWxnb3JpdGhtcyBmb3IgY29tcHV0aW5nIGRpZmZlcmVuY2VzXG4gKlxuICogKipVc2FnZToqKlxuICogYGBgamF2YXNjcmlwdFxuICogY29uc3QgZGlmZlZpZXcgPSBjcmVhdGVEaWZmVmlldyh7XG4gKiAgIHZhbHVlQTogb3JpZ2luYWxDb250ZW50LFxuICogICB2YWx1ZUI6IG1vZGlmaWVkQ29udGVudCxcbiAqICAgaW5saW5lOiBmYWxzZSAvLyBvciAnYScvJ2InIGZvciBpbmxpbmUgdmlld1xuICogfSk7XG4gKiBgYGBcbiAqXG4gKiBAbW9kdWxlXG4gKi9cblxudmFyIElubGluZURpZmZWaWV3ID0gcmVxdWlyZShcIi4vZGlmZi9pbmxpbmVfZGlmZl92aWV3XCIpLklubGluZURpZmZWaWV3O1xudmFyIFNwbGl0RGlmZlZpZXcgPSByZXF1aXJlKFwiLi9kaWZmL3NwbGl0X2RpZmZfdmlld1wiKS5TcGxpdERpZmZWaWV3O1xudmFyIERpZmZQcm92aWRlciA9IHJlcXVpcmUoXCIuL2RpZmYvcHJvdmlkZXJzL2RlZmF1bHRcIikuRGlmZlByb3ZpZGVyO1xuXG4vKipcbiAqIEludGVyZmFjZSByZXByZXNlbnRpbmcgYSBtb2RlbCBmb3IgaGFuZGxpbmcgZGlmZmVyZW5jZXMgYmV0d2VlbiB0d28gdmlld3Mgb3Igc3RhdGVzLlxuICogQHR5cGVkZWYge09iamVjdH0gRGlmZk1vZGVsXG4gKiBAcHJvcGVydHkge2ltcG9ydChcIi4uL2VkaXRvclwiKS5FZGl0b3J9IFtlZGl0b3JBXSAtIFRoZSBlZGl0b3IgZm9yIHRoZSBvcmlnaW5hbCB2aWV3LlxuICogQHByb3BlcnR5IHtpbXBvcnQoXCIuLi9lZGl0b3JcIikuRWRpdG9yfSBbZWRpdG9yQl0gLSBUaGUgZWRpdG9yIGZvciB0aGUgZWRpdGVkIHZpZXcuXG4gKiBAcHJvcGVydHkge2ltcG9ydChcIi4uL2VkaXRfc2Vzc2lvblwiKS5FZGl0U2Vzc2lvbn0gW3Nlc3Npb25BXSAtIFRoZSBlZGl0IHNlc3Npb24gZm9yIHRoZSBvcmlnaW5hbCB2aWV3LlxuICogQHByb3BlcnR5IHtpbXBvcnQoXCIuLi9lZGl0X3Nlc3Npb25cIikuRWRpdFNlc3Npb259IFtzZXNzaW9uQl0gLSBUaGUgZWRpdCBzZXNzaW9uIGZvciB0aGUgZWRpdGVkIHZpZXcuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW3ZhbHVlQV0gLSBUaGUgb3JpZ2luYWwgY29udGVudC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbdmFsdWVCXSAtIFRoZSBtb2RpZmllZCBjb250ZW50LlxuICogQHByb3BlcnR5IHtcImFcInxcImJcIn0gW2lubGluZV0gLSBXaGV0aGVyIHRvIHNob3cgdGhlIG9yaWdpbmFsIHZpZXcoXCJhXCIpIG9yIG1vZGlmaWVkIHZpZXcoXCJiXCIpIGZvciBpbmxpbmUgZGlmZiB2aWV3XG4gKiBAcHJvcGVydHkge0lEaWZmUHJvdmlkZXJ9IFtkaWZmUHJvdmlkZXJdIC0gUHJvdmlkZXIgZm9yIGNvbXB1dGluZyBkaWZmZXJlbmNlcyBiZXR3ZWVuIG9yaWdpbmFsIGFuZCBtb2RpZmllZCBjb250ZW50LlxuICovXG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gRGlmZlZpZXdPcHRpb25zXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IFtzaG93T3RoZXJMaW5lTnVtYmVycz10cnVlXSAtIFdoZXRoZXIgdG8gc2hvdyBsaW5lIG51bWJlcnMgaW4gdGhlIG90aGVyIGVkaXRvcidzIGd1dHRlclxuICogQHByb3BlcnR5IHtib29sZWFufSBbZm9sZGluZ10gLSBXaGV0aGVyIHRvIGVuYWJsZSBjb2RlIGZvbGRpbmcgd2lkZ2V0c1xuICogQHByb3BlcnR5IHtib29sZWFufSBbc3luY1NlbGVjdGlvbnNdIC0gV2hldGhlciB0byBzeW5jaHJvbml6ZSBzZWxlY3Rpb25zIGJldHdlZW4gYm90aCBlZGl0b3JzXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IFtpZ25vcmVUcmltV2hpdGVzcGFjZV0gLSBXaGV0aGVyIHRvIGlnbm9yZSB0cmltbWVkIHdoaXRlc3BhY2Ugd2hlbiBjb21wdXRpbmcgZGlmZnNcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gW3dyYXBdIC0gV2hldGhlciB0byBlbmFibGUgd29yZCB3cmFwcGluZyBpbiBib3RoIGVkaXRvcnNcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBbbWF4RGlmZnM9NTAwMF0gLSBNYXhpbXVtIG51bWJlciBvZiBkaWZmcyB0byBjb21wdXRlIGJlZm9yZSBmYWlsaW5nIHNpbGVudGx5XG4gKiBAcHJvcGVydHkge3N0cmluZ3xpbXBvcnQoXCIuLi8uLi9hY2UtaW50ZXJuYWxcIikuQWNlLlRoZW1lfSBbdGhlbWVdIC0gVGhlbWUgdG8gYXBwbHkgdG8gYm90aCBlZGl0b3JzXG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBJRGlmZlByb3ZpZGVyXG4gKiBAcHJvcGVydHkgeyhvcmlnaW5hbExpbmVzOiBzdHJpbmdbXSwgbW9kaWZpZWRMaW5lczogc3RyaW5nW10sIG9wdHM/OiBhbnkpID0+IGltcG9ydChcIi4vZGlmZi9iYXNlX2RpZmZfdmlld1wiKS5EaWZmQ2h1bmtbXX0gY29tcHV0ZSAtIENvbXB1dGVzIGRpZmZlcmVuY2VzIGJldHdlZW4gb3JpZ2luYWwgYW5kIG1vZGlmaWVkIGxpbmVzXG4gKi9cblxuXG4vKipcbiAqIENyZWF0ZXMgYSBkaWZmIHZpZXcgZm9yIGNvbXBhcmluZyBjb2RlLlxuICogQHBhcmFtIHtEaWZmTW9kZWx9IFtkaWZmTW9kZWxdIG1vZGVsIGZvciB0aGUgZGlmZiB2aWV3XG4gKiBAcGFyYW0ge0RpZmZWaWV3T3B0aW9uc30gW29wdGlvbnNdIG9wdGlvbnMgZm9yIHRoZSBkaWZmIHZpZXdcbiAqIEByZXR1cm5zIHtJbmxpbmVEaWZmVmlld3xTcGxpdERpZmZWaWV3fSBDb25maWd1cmVkIGRpZmYgdmlldyBpbnN0YW5jZVxuICovXG5mdW5jdGlvbiBjcmVhdGVEaWZmVmlldyhkaWZmTW9kZWwsIG9wdGlvbnMpIHtcbiAgICBkaWZmTW9kZWwgPSBkaWZmTW9kZWwgfHwge307XG4gICAgZGlmZk1vZGVsLmRpZmZQcm92aWRlciA9IGRpZmZNb2RlbC5kaWZmUHJvdmlkZXIgfHwgbmV3IERpZmZQcm92aWRlcigpOyAvL3VzZSBkZWZhdWx0IGRpZmYgcHJvdmlkZXI7XG4gICAgbGV0IGRpZmZWaWV3O1xuICAgIGlmIChkaWZmTW9kZWwuaW5saW5lKSB7XG4gICAgICAgIGRpZmZWaWV3ID0gbmV3IElubGluZURpZmZWaWV3KGRpZmZNb2RlbCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBkaWZmVmlldyA9IG5ldyBTcGxpdERpZmZWaWV3KGRpZmZNb2RlbCk7XG4gICAgfVxuICAgIGlmIChvcHRpb25zKSB7XG4gICAgICAgIGRpZmZWaWV3LnNldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRpZmZWaWV3O1xufVxuXG5leHBvcnRzLklubGluZURpZmZWaWV3ID0gSW5saW5lRGlmZlZpZXc7XG5leHBvcnRzLlNwbGl0RGlmZlZpZXcgPSBTcGxpdERpZmZWaWV3O1xuZXhwb3J0cy5EaWZmUHJvdmlkZXIgPSBEaWZmUHJvdmlkZXI7XG5leHBvcnRzLmNyZWF0ZURpZmZWaWV3ID0gY3JlYXRlRGlmZlZpZXc7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi8uLi9saWIvb29wXCIpO1xudmFyIFJhbmdlID0gcmVxdWlyZShcIi4uLy4uL3JhbmdlXCIpLlJhbmdlO1xudmFyIGRvbSA9IHJlcXVpcmUoXCIuLi8uLi9saWIvZG9tXCIpO1xudmFyIGNvbmZpZyA9IHJlcXVpcmUoXCIuLi8uLi9jb25maWdcIik7XG52YXIgTGluZVdpZGdldHMgPSByZXF1aXJlKFwiLi4vLi4vbGluZV93aWRnZXRzXCIpLkxpbmVXaWRnZXRzO1xudmFyIFNjcm9sbERpZmZEZWNvcmF0b3IgPSByZXF1aXJlKFwiLi9zY3JvbGxfZGlmZl9kZWNvcmF0b3JcIikuU2Nyb2xsRGlmZkRlY29yYXRvcjtcblxuLy8gQHRzLWlnbm9yZVxudmFyIGNzcyA9IHJlcXVpcmUoXCIuL3N0eWxlcy1jc3MuanNcIikuY3NzVGV4dDtcblxudmFyIEVkaXRvciA9IHJlcXVpcmUoXCIuLi8uLi9lZGl0b3JcIikuRWRpdG9yO1xudmFyIFJlbmRlcmVyID0gcmVxdWlyZShcIi4uLy4uL3ZpcnR1YWxfcmVuZGVyZXJcIikuVmlydHVhbFJlbmRlcmVyO1xudmFyIFVuZG9NYW5hZ2VyID0gcmVxdWlyZShcIi4uLy4uL3VuZG9tYW5hZ2VyXCIpLlVuZG9NYW5hZ2VyO1xudmFyIERlY29yYXRvciA9IHJlcXVpcmUoXCIuLi8uLi9sYXllci9kZWNvcmF0b3JzXCIpLkRlY29yYXRvcjtcblxucmVxdWlyZShcIi4uLy4uL3RoZW1lL3RleHRtYXRlXCIpO1xuLy8gZW5hYmxlIG11bHRpc2VsZWN0XG5yZXF1aXJlKFwiLi4vLi4vbXVsdGlfc2VsZWN0XCIpO1xuXG52YXIgRWRpdFNlc3Npb24gPSByZXF1aXJlKFwiLi4vLi4vZWRpdF9zZXNzaW9uXCIpLkVkaXRTZXNzaW9uO1xuXG52YXIgTWluaW1hbEd1dHRlckRpZmZEZWNvcmF0b3IgPSByZXF1aXJlKFwiLi9ndXR0ZXJfZGVjb3JhdG9yXCIpLk1pbmltYWxHdXR0ZXJEaWZmRGVjb3JhdG9yO1xuXG52YXIgZHVtbXlEaWZmUHJvdmlkZXIgPSB7XG4gICAgY29tcHV0ZTogZnVuY3Rpb24odmFsMSwgdmFsMiwgb3B0aW9ucykge1xuICAgICAgICByZXR1cm4gW107XG4gICAgfVxufTtcblxuZG9tLmltcG9ydENzc1N0cmluZyhjc3MsIFwiZGlmZnZpZXcuY3NzXCIsIGZhbHNlKTtcblxuY2xhc3MgQmFzZURpZmZWaWV3IHtcbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RzIGEgbmV3IGJhc2UgRGlmZlZpZXcgaW5zdGFuY2UuXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbaW5saW5lRGlmZkVkaXRvcl0gLSBXaGV0aGVyIHRvIHVzZSBhbiBpbmxpbmUgZGlmZiBlZGl0b3IuXG4gICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gW2NvbnRhaW5lcl0gLSBvcHRpb25hbCBjb250YWluZXIgZWxlbWVudCBmb3IgdGhlIERpZmZWaWV3LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGlubGluZURpZmZFZGl0b3IsIGNvbnRhaW5lcikge1xuICAgICAgICB0aGlzLm9uQ2hhbmdlVGhlbWUgPSB0aGlzLm9uQ2hhbmdlVGhlbWUuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vbklucHV0ID0gdGhpcy5vbklucHV0LmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25DaGFuZ2VGb2xkID0gdGhpcy5vbkNoYW5nZUZvbGQuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5yZWFsaWduID0gdGhpcy5yZWFsaWduLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25TZWxlY3QgPSB0aGlzLm9uU2VsZWN0LmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25DaGFuZ2VXcmFwTGltaXQgPSB0aGlzLm9uQ2hhbmdlV3JhcExpbWl0LmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMucmVhbGlnblBlbmRpbmcgPSBmYWxzZTtcblxuICAgICAgICAvKipAdHlwZXt7c2Vzc2lvbkE6IEVkaXRTZXNzaW9uLCBzZXNzaW9uQjogRWRpdFNlc3Npb24sIGNodW5rczogRGlmZkNodW5rW119fSovdGhpcy5kaWZmU2Vzc2lvbjtcbiAgICAgICAgLyoqQHR5cGUgRGlmZkNodW5rW10qL3RoaXMuY2h1bmtzO1xuICAgICAgICB0aGlzLmlubGluZURpZmZFZGl0b3IgPSBpbmxpbmVEaWZmRWRpdG9yIHx8IGZhbHNlO1xuICAgICAgICB0aGlzLmN1cnJlbnREaWZmSW5kZXggPSAwO1xuICAgICAgICB0aGlzLmRpZmZQcm92aWRlciA9IGR1bW15RGlmZlByb3ZpZGVyO1xuXG4gICAgICAgIGlmIChjb250YWluZXIpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy4kaWdub3JlVHJpbVdoaXRlc3BhY2UgPSBmYWxzZTtcbiAgICAgICAgdGhpcy4kbWF4RGlmZnMgPSA1MDAwO1xuICAgICAgICB0aGlzLiRtYXhDb21wdXRhdGlvblRpbWVNcyA9IDE1MDtcbiAgICAgICAgdGhpcy4kc3luY1NlbGVjdGlvbnMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy4kZm9sZFVuY2hhbmdlZE9uSW5wdXQgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLm1hcmtlckIgPSBuZXcgRGlmZkhpZ2hsaWdodCh0aGlzLCAxKTtcbiAgICAgICAgdGhpcy5tYXJrZXJBID0gbmV3IERpZmZIaWdobGlnaHQodGhpcywgLTEpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7aW1wb3J0KFwiLi4vZGlmZlwiKS5EaWZmTW9kZWx9IFtkaWZmTW9kZWxdIC0gVGhlIG1vZGVsIGZvciB0aGUgZGlmZiB2aWV3LlxuICAgICAqL1xuICAgICRzZXR1cE1vZGVscyhkaWZmTW9kZWwpIHtcbiAgICAgICAgaWYgKGRpZmZNb2RlbC5kaWZmUHJvdmlkZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0UHJvdmlkZXIoZGlmZk1vZGVsLmRpZmZQcm92aWRlcik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zaG93U2lkZUEgPSBkaWZmTW9kZWwuaW5saW5lID09IHVuZGVmaW5lZCA/IHRydWUgOiBkaWZmTW9kZWwuaW5saW5lID09PSBcImFcIjtcbiAgICAgICAgdmFyIGRpZmZFZGl0b3JPcHRpb25zID0gLyoqQHR5cGUge1BhcnRpYWw8aW1wb3J0KFwiLi4vLi4vLi4vYWNlLWludGVybmFsXCIpLkFjZS5FZGl0b3JPcHRpb25zPn0qLyh7XG4gICAgICAgICAgICBzY3JvbGxQYXN0RW5kOiAwLjUsXG4gICAgICAgICAgICBoaWdobGlnaHRBY3RpdmVMaW5lOiBmYWxzZSxcbiAgICAgICAgICAgIGhpZ2hsaWdodEd1dHRlckxpbmU6IGZhbHNlLFxuICAgICAgICAgICAgYW5pbWF0ZWRTY3JvbGw6IHRydWUsXG4gICAgICAgICAgICBjdXN0b21TY3JvbGxiYXI6IHRydWUsXG4gICAgICAgICAgICB2U2Nyb2xsQmFyQWx3YXlzVmlzaWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGZhZGVGb2xkV2lkZ2V0czogdHJ1ZSxcbiAgICAgICAgICAgIHNob3dGb2xkV2lkZ2V0czogdHJ1ZSxcbiAgICAgICAgICAgIHNlbGVjdGlvblN0eWxlOiBcInRleHRcIixcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5zYXZlZE9wdGlvbnNBID0gZGlmZk1vZGVsLmVkaXRvckEgJiYgZGlmZk1vZGVsLmVkaXRvckEuZ2V0T3B0aW9ucyhkaWZmRWRpdG9yT3B0aW9ucyk7XG4gICAgICAgIHRoaXMuc2F2ZWRPcHRpb25zQiA9IGRpZmZNb2RlbC5lZGl0b3JCICYmIGRpZmZNb2RlbC5lZGl0b3JCLmdldE9wdGlvbnMoZGlmZkVkaXRvck9wdGlvbnMpO1xuXG4gICAgICAgIGlmICghdGhpcy5pbmxpbmVEaWZmRWRpdG9yIHx8IGRpZmZNb2RlbC5pbmxpbmUgPT09IFwiYVwiKSB7XG4gICAgICAgICAgICB0aGlzLmVkaXRvckEgPSBkaWZmTW9kZWwuZWRpdG9yQSB8fCB0aGlzLiRzZXR1cE1vZGVsKGRpZmZNb2RlbC5zZXNzaW9uQSwgZGlmZk1vZGVsLnZhbHVlQSk7XG4gICAgICAgICAgICB0aGlzLmNvbnRhaW5lciAmJiB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmVkaXRvckEuY29udGFpbmVyKTtcbiAgICAgICAgICAgIHRoaXMuZWRpdG9yQS5zZXRPcHRpb25zKGRpZmZFZGl0b3JPcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuaW5saW5lRGlmZkVkaXRvciB8fCBkaWZmTW9kZWwuaW5saW5lID09PSBcImJcIikge1xuICAgICAgICAgICAgdGhpcy5lZGl0b3JCID0gZGlmZk1vZGVsLmVkaXRvckIgfHwgdGhpcy4kc2V0dXBNb2RlbChkaWZmTW9kZWwuc2Vzc2lvbkIsIGRpZmZNb2RlbC52YWx1ZUIpO1xuICAgICAgICAgICAgdGhpcy5jb250YWluZXIgJiYgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5lZGl0b3JCLmNvbnRhaW5lcik7XG4gICAgICAgICAgICB0aGlzLmVkaXRvckIuc2V0T3B0aW9ucyhkaWZmRWRpdG9yT3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLmlubGluZURpZmZFZGl0b3IpIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlRWRpdG9yID0gdGhpcy5zaG93U2lkZUEgPyB0aGlzLmVkaXRvckEgOiB0aGlzLmVkaXRvckI7XG4gICAgICAgICAgICB0aGlzLm90aGVyU2Vzc2lvbiA9IHRoaXMuc2hvd1NpZGVBID8gdGhpcy5zZXNzaW9uQiA6IHRoaXMuc2Vzc2lvbkE7XG4gICAgICAgICAgICB2YXIgY2xvbmVPcHRpb25zID0gdGhpcy5hY3RpdmVFZGl0b3IuZ2V0T3B0aW9ucygpO1xuICAgICAgICAgICAgY2xvbmVPcHRpb25zLnJlYWRPbmx5ID0gdHJ1ZTtcbiAgICAgICAgICAgIGRlbGV0ZSBjbG9uZU9wdGlvbnMubW9kZTtcbiAgICAgICAgICAgIHRoaXMub3RoZXJFZGl0b3IgPSBuZXcgRWRpdG9yKG5ldyBSZW5kZXJlcihudWxsKSwgdW5kZWZpbmVkLCBjbG9uZU9wdGlvbnMpO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2hvd1NpZGVBKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lZGl0b3JCID0gdGhpcy5vdGhlckVkaXRvcjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lZGl0b3JBID0gdGhpcy5vdGhlckVkaXRvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0RGlmZlNlc3Npb24oe1xuICAgICAgICAgICAgc2Vzc2lvbkE6IGRpZmZNb2RlbC5zZXNzaW9uQSB8fCAoZGlmZk1vZGVsLmVkaXRvckEgPyBkaWZmTW9kZWwuZWRpdG9yQS5zZXNzaW9uIDogbmV3IEVkaXRTZXNzaW9uKFxuICAgICAgICAgICAgICAgIGRpZmZNb2RlbC52YWx1ZUEgfHwgXCJcIikpLFxuICAgICAgICAgICAgc2Vzc2lvbkI6IGRpZmZNb2RlbC5zZXNzaW9uQiB8fCAoZGlmZk1vZGVsLmVkaXRvckIgPyBkaWZmTW9kZWwuZWRpdG9yQi5zZXNzaW9uIDogbmV3IEVkaXRTZXNzaW9uKFxuICAgICAgICAgICAgICAgIGRpZmZNb2RlbC52YWx1ZUIgfHwgXCJcIikpLFxuICAgICAgICAgICAgY2h1bmtzOiBbXVxuICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLm90aGVyRWRpdG9yICYmIHRoaXMuYWN0aXZlRWRpdG9yKSB7XG4gICAgICAgICAgICB0aGlzLm90aGVyU2Vzc2lvbi5zZXRPcHRpb24oXCJ3cmFwXCIsIHRoaXMuYWN0aXZlRWRpdG9yLmdldE9wdGlvbihcIndyYXBcIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXR1cFNjcm9sbGJhcnMoKTtcbiAgICB9XG5cbiAgICBhZGRHdXR0ZXJEZWNvcmF0b3JzKCkgeyBcbiAgICAgICAgaWYgKCF0aGlzLmd1dHRlckRlY29yYXRvckEpXG4gICAgICAgICAgICB0aGlzLmd1dHRlckRlY29yYXRvckEgPSBuZXcgTWluaW1hbEd1dHRlckRpZmZEZWNvcmF0b3IodGhpcy5lZGl0b3JBLCAtMSk7XG4gICAgICAgIGlmICghdGhpcy5ndXR0ZXJEZWNvcmF0b3JCKVxuICAgICAgICAgICAgdGhpcy5ndXR0ZXJEZWNvcmF0b3JCID0gbmV3IE1pbmltYWxHdXR0ZXJEaWZmRGVjb3JhdG9yKHRoaXMuZWRpdG9yQiwgMSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtFZGl0U2Vzc2lvbn0gW3Nlc3Npb25dXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IFt2YWx1ZV1cbiAgICAgKi9cbiAgICAkc2V0dXBNb2RlbChzZXNzaW9uLCB2YWx1ZSkge1xuICAgICAgICB2YXIgZWRpdG9yID0gbmV3IEVkaXRvcihuZXcgUmVuZGVyZXIoKSwgc2Vzc2lvbik7XG4gICAgICAgIGVkaXRvci5zZXNzaW9uLnNldFVuZG9NYW5hZ2VyKG5ldyBVbmRvTWFuYWdlcigpKTtcbiAgICAgICAgaWYgKHZhbHVlICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgZWRpdG9yLnNldFZhbHVlKHZhbHVlLCAtMSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVkaXRvcjtcbiAgICB9XG5cbiAgICBmb2xkVW5jaGFuZ2VkKCkge1xuICAgICAgICB2YXIgY2h1bmtzID0gdGhpcy5jaHVua3M7XG4gICAgICAgIHZhciBwbGFjZWhvbGRlciA9IFwiLVwiLnJlcGVhdCgxMjApO1xuICAgICAgICB2YXIgcHJldiA9IHtcbiAgICAgICAgICAgIG9sZDogbmV3IFJhbmdlKDAsIDAsIDAsIDApLFxuICAgICAgICAgICAgbmV3OiBuZXcgUmFuZ2UoMCwgMCwgMCwgMClcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGZvbGRzQ2hhbmdlZCA9IGZhbHNlO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNodW5rcy5sZW5ndGggKyAxOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBjdXJyZW50ID0gY2h1bmtzW2ldIHx8IHtcbiAgICAgICAgICAgICAgICBvbGQ6IG5ldyBSYW5nZSh0aGlzLnNlc3Npb25BLmdldExlbmd0aCgpLCAwLCB0aGlzLnNlc3Npb25BLmdldExlbmd0aCgpLCAwKSxcbiAgICAgICAgICAgICAgICBuZXc6IG5ldyBSYW5nZSh0aGlzLnNlc3Npb25CLmdldExlbmd0aCgpLCAwLCB0aGlzLnNlc3Npb25CLmdldExlbmd0aCgpLCAwKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHZhciBsID0gY3VycmVudC5uZXcuc3RhcnQucm93IC0gcHJldi5uZXcuZW5kLnJvdyAtIDU7XG4gICAgICAgICAgICBpZiAobCA+IDIpIHtcbiAgICAgICAgICAgICAgICB2YXIgcyA9IHByZXYub2xkLmVuZC5yb3cgKyAyO1xuICAgICAgICAgICAgICAgIHZhciBmb2xkMSA9IHRoaXMuc2Vzc2lvbkEuYWRkRm9sZChwbGFjZWhvbGRlciwgbmV3IFJhbmdlKHMsIDAsIHMgKyBsLCBOdW1iZXIuTUFYX1ZBTFVFKSk7XG4gICAgICAgICAgICAgICAgcyA9IHByZXYubmV3LmVuZC5yb3cgKyAyO1xuICAgICAgICAgICAgICAgIHZhciBmb2xkMiA9IHRoaXMuc2Vzc2lvbkIuYWRkRm9sZChwbGFjZWhvbGRlciwgbmV3IFJhbmdlKHMsIDAsIHMgKyBsLCBOdW1iZXIuTUFYX1ZBTFVFKSk7XG4gICAgICAgICAgICAgICAgaWYgKGZvbGQxIHx8IGZvbGQyKSBmb2xkc0NoYW5nZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGlmIChmb2xkMiAmJiBmb2xkMSkge1xuICAgICAgICAgICAgICAgICAgICBmb2xkMVtcIm90aGVyXCJdID0gZm9sZDI7XG4gICAgICAgICAgICAgICAgICAgIGZvbGQyW1wib3RoZXJcIl0gPSBmb2xkMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHByZXYgPSBjdXJyZW50O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmb2xkc0NoYW5nZWQ7XG4gICAgfVxuXG4gICAgdW5mb2xkVW5jaGFuZ2VkKCkge1xuICAgICAgICB2YXIgZm9sZHMgPSB0aGlzLnNlc3Npb25BLmdldEFsbEZvbGRzKCk7XG4gICAgICAgIGZvciAodmFyIGkgPSBmb2xkcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgdmFyIGZvbGQgPSBmb2xkc1tpXTtcbiAgICAgICAgICAgIGlmIChmb2xkLnBsYWNlaG9sZGVyLmxlbmd0aCA9PSAxMjApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlc3Npb25BLnJlbW92ZUZvbGQoZm9sZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0b2dnbGVGb2xkVW5jaGFuZ2VkKCkge1xuICAgICAgICBpZiAoIXRoaXMuZm9sZFVuY2hhbmdlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLnVuZm9sZFVuY2hhbmdlZCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHt7IHNlc3Npb25BOiBhbnk7IHNlc3Npb25COiBFZGl0U2Vzc2lvbjsgY2h1bmtzOiBEaWZmQ2h1bmtbXSB9fSBzZXNzaW9uXG4gICAgICovXG4gICAgc2V0RGlmZlNlc3Npb24oc2Vzc2lvbikge1xuICAgICAgICBpZiAodGhpcy5kaWZmU2Vzc2lvbikge1xuICAgICAgICAgICAgdGhpcy4kZGV0YWNoU2Vzc2lvbnNFdmVudEhhbmRsZXJzKCk7XG4gICAgICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uTWFya2VycygpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGlmZlNlc3Npb24gPSBzZXNzaW9uO1xuICAgICAgICB0aGlzLnNlc3Npb25BID0gdGhpcy5zZXNzaW9uQiA9IG51bGw7XG4gICAgICAgIGlmICh0aGlzLmRpZmZTZXNzaW9uKSB7XG4gICAgICAgICAgICB0aGlzLmNodW5rcyA9IHRoaXMuZGlmZlNlc3Npb24uY2h1bmtzIHx8IFtdO1xuICAgICAgICAgICAgdGhpcy5lZGl0b3JBICYmIHRoaXMuZWRpdG9yQS5zZXRTZXNzaW9uKHNlc3Npb24uc2Vzc2lvbkEpO1xuICAgICAgICAgICAgdGhpcy5lZGl0b3JCICYmIHRoaXMuZWRpdG9yQi5zZXRTZXNzaW9uKHNlc3Npb24uc2Vzc2lvbkIpO1xuICAgICAgICAgICAgdGhpcy5zZXNzaW9uQSA9IHRoaXMuZGlmZlNlc3Npb24uc2Vzc2lvbkE7XG4gICAgICAgICAgICB0aGlzLnNlc3Npb25CID0gdGhpcy5kaWZmU2Vzc2lvbi5zZXNzaW9uQjtcbiAgICAgICAgICAgIHRoaXMuJGF0dGFjaFNlc3Npb25zRXZlbnRIYW5kbGVycygpO1xuICAgICAgICAgICAgdGhpcy5pbml0U2VsZWN0aW9uTWFya2VycygpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vdGhlclNlc3Npb24gPSB0aGlzLnNob3dTaWRlQSA/IHRoaXMuc2Vzc2lvbkIgOiB0aGlzLnNlc3Npb25BO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBhYnN0cmFjdFxuICAgICAqL1xuICAgICRhdHRhY2hTZXNzaW9uc0V2ZW50SGFuZGxlcnMoKSB7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGFic3RyYWN0XG4gICAgICovXG4gICAgJGRldGFjaFNlc3Npb25zRXZlbnRIYW5kbGVycygpIHtcbiAgICB9XG5cbiAgICBnZXREaWZmU2Vzc2lvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlmZlNlc3Npb247XG4gICAgfVxuXG4gICAgc2V0VGhlbWUodGhlbWUpIHtcbiAgICAgICAgdGhpcy5lZGl0b3JBICYmIHRoaXMuZWRpdG9yQS5zZXRUaGVtZSh0aGVtZSk7XG4gICAgICAgIHRoaXMuZWRpdG9yQiAmJiB0aGlzLmVkaXRvckIuc2V0VGhlbWUodGhlbWUpO1xuICAgIH1cblxuICAgIGdldFRoZW1lKCkge1xuICAgICAgICByZXR1cm4gKHRoaXMuZWRpdG9yQSB8fCB0aGlzLmVkaXRvckIpLmdldFRoZW1lKCk7XG4gICAgfVxuXG4gICAgb25DaGFuZ2VUaGVtZShlKSB7XG4gICAgICAgIHZhciB0aGVtZSA9IGUgJiYgZS50aGVtZSB8fCB0aGlzLmdldFRoZW1lKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuZWRpdG9yQSAmJiB0aGlzLmVkaXRvckEuZ2V0VGhlbWUoKSAhPT0gdGhlbWUpIHtcbiAgICAgICAgICAgIHRoaXMuZWRpdG9yQS5zZXRUaGVtZSh0aGVtZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZWRpdG9yQiAmJiB0aGlzLmVkaXRvckIuZ2V0VGhlbWUoKSAhPT0gdGhlbWUpIHtcbiAgICAgICAgICAgIHRoaXMuZWRpdG9yQi5zZXRUaGVtZSh0aGVtZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXNpemUoZm9yY2UpIHtcbiAgICAgICAgdGhpcy5lZGl0b3JBICYmIHRoaXMuZWRpdG9yQS5yZXNpemUoZm9yY2UpO1xuICAgICAgICB0aGlzLmVkaXRvckIgJiYgdGhpcy5lZGl0b3JCLnJlc2l6ZShmb3JjZSk7XG4gICAgfVxuXG4gICAgc2NoZWR1bGVPbklucHV0KCkge1xuICAgICAgICBpZiAodGhpcy4kb25JbnB1dFRpbWVyKSByZXR1cm47XG4gICAgICAgIHRoaXMuJG9uSW5wdXRUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy4kb25JbnB1dFRpbWVyID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMub25JbnB1dCgpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgb25JbnB1dCgpIHtcbiAgICAgICAgaWYgKHRoaXMuJG9uSW5wdXRUaW1lcikgY2xlYXJUaW1lb3V0KHRoaXMuJG9uSW5wdXRUaW1lcik7XG5cbiAgICAgICAgdmFyIHZhbDEgPSB0aGlzLnNlc3Npb25BLmRvYy5nZXRBbGxMaW5lcygpO1xuICAgICAgICB2YXIgdmFsMiA9IHRoaXMuc2Vzc2lvbkIuZG9jLmdldEFsbExpbmVzKCk7XG5cbiAgICAgICAgdGhpcy5zZWxlY3Rpb25SYW5nZUEgPSBudWxsO1xuICAgICAgICB0aGlzLnNlbGVjdGlvblJhbmdlQiA9IG51bGw7XG5cbiAgICAgICAgdmFyIGNodW5rcyA9IHRoaXMuJGRpZmZMaW5lcyh2YWwxLCB2YWwyKTtcblxuICAgICAgICB0aGlzLmRpZmZTZXNzaW9uLmNodW5rcyA9IHRoaXMuY2h1bmtzID0gY2h1bmtzO1xuICAgICAgICB0aGlzLmd1dHRlckRlY29yYXRvckEgJiYgdGhpcy5ndXR0ZXJEZWNvcmF0b3JBLnNldERlY29yYXRpb25zKGNodW5rcyk7XG4gICAgICAgIHRoaXMuZ3V0dGVyRGVjb3JhdG9yQiAmJiB0aGlzLmd1dHRlckRlY29yYXRvckIuc2V0RGVjb3JhdGlvbnMoY2h1bmtzKTtcbiAgICAgICAgLy8gaWYgd2VcInJlIGRlYWxpbmcgd2l0aCB0b28gbWFueSBjaHVua3MsIGZhaWwgc2lsZW50bHlcbiAgICAgICAgaWYgKHRoaXMuY2h1bmtzICYmIHRoaXMuY2h1bmtzLmxlbmd0aCA+IHRoaXMuJG1heERpZmZzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFsaWduKCk7XG5cbiAgICAgICAgdGhpcy5lZGl0b3JBICYmIHRoaXMuZWRpdG9yQS5yZW5kZXJlci51cGRhdGVCYWNrTWFya2VycygpO1xuICAgICAgICB0aGlzLmVkaXRvckIgJiYgdGhpcy5lZGl0b3JCLnJlbmRlcmVyLnVwZGF0ZUJhY2tNYXJrZXJzKCk7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcm9sbEJhckRlY29yYXRvcnMoKTtcbiAgICAgICAgfSwgMCk7XG5cbiAgICAgICAgaWYgKHRoaXMuJGZvbGRVbmNoYW5nZWRPbklucHV0KSB7XG4gICAgICAgICAgICB0aGlzLmZvbGRVbmNoYW5nZWQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldHVwU2Nyb2xsYmFycygpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7UmVuZGVyZXIgJiB7JHNjcm9sbERlY29yYXRvcjogU2Nyb2xsRGlmZkRlY29yYXRvcn19IHJlbmRlcmVyXG4gICAgICAgICAqL1xuICAgICAgICBjb25zdCBzZXR1cFNjcm9sbEJhciA9IChyZW5kZXJlcikgPT4ge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy4kc2V0U2Nyb2xsQmFyRGVjb3JhdG9ycyhyZW5kZXJlcik7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTY3JvbGxCYXJEZWNvcmF0b3JzKCk7XG4gICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAodGhpcy5pbmxpbmVEaWZmRWRpdG9yKSB7XG4gICAgICAgICAgICBzZXR1cFNjcm9sbEJhcih0aGlzLmFjdGl2ZUVkaXRvci5yZW5kZXJlcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzZXR1cFNjcm9sbEJhcih0aGlzLmVkaXRvckEucmVuZGVyZXIpO1xuICAgICAgICAgICAgc2V0dXBTY3JvbGxCYXIodGhpcy5lZGl0b3JCLnJlbmRlcmVyKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgJHNldFNjcm9sbEJhckRlY29yYXRvcnMocmVuZGVyZXIpIHtcbiAgICAgICAgaWYgKHJlbmRlcmVyLiRzY3JvbGxEZWNvcmF0b3IpIHtcbiAgICAgICAgICAgIHJlbmRlcmVyLiRzY3JvbGxEZWNvcmF0b3IuZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgICAgIHJlbmRlcmVyLiRzY3JvbGxEZWNvcmF0b3IgPSBuZXcgU2Nyb2xsRGlmZkRlY29yYXRvcihyZW5kZXJlci5zY3JvbGxCYXJWLCByZW5kZXJlciwgdGhpcy5pbmxpbmVEaWZmRWRpdG9yKTtcbiAgICAgICAgcmVuZGVyZXIuJHNjcm9sbERlY29yYXRvci5zZXRTZXNzaW9ucyh0aGlzLnNlc3Npb25BLCB0aGlzLnNlc3Npb25CKTtcbiAgICAgICAgcmVuZGVyZXIuc2Nyb2xsQmFyVi5zZXRWaXNpYmxlKHRydWUpO1xuICAgICAgICByZW5kZXJlci5zY3JvbGxCYXJWLmVsZW1lbnQuc3R5bGUuYm90dG9tID0gcmVuZGVyZXIuc2Nyb2xsQmFySC5nZXRIZWlnaHQoKSArIFwicHhcIjtcbiAgICB9XG5cbiAgICAkcmVzZXREZWNvcmF0b3JzKHJlbmRlcmVyKSB7XG4gICAgICAgIGlmIChyZW5kZXJlci4kc2Nyb2xsRGVjb3JhdG9yKSB7XG4gICAgICAgICAgICByZW5kZXJlci4kc2Nyb2xsRGVjb3JhdG9yLmRlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgICAgICByZW5kZXJlci4kc2Nyb2xsRGVjb3JhdG9yID0gbmV3IERlY29yYXRvcihyZW5kZXJlci5zY3JvbGxCYXJWLCByZW5kZXJlcik7XG4gICAgfVxuXG4gICAgdXBkYXRlU2Nyb2xsQmFyRGVjb3JhdG9ycygpIHtcbiAgICAgICAgaWYgKHRoaXMuaW5saW5lRGlmZkVkaXRvcikge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmFjdGl2ZUVkaXRvcikge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuYWN0aXZlRWRpdG9yLnJlbmRlcmVyLiRzY3JvbGxEZWNvcmF0b3IuJHpvbmVzID0gW107XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZWRpdG9yQSB8fCAhdGhpcy5lZGl0b3JCKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5lZGl0b3JBLnJlbmRlcmVyLiRzY3JvbGxEZWNvcmF0b3IuJHpvbmVzID0gW107XG4gICAgICAgICAgICB0aGlzLmVkaXRvckIucmVuZGVyZXIuJHNjcm9sbERlY29yYXRvci4kem9uZXMgPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge0RpZmZDaHVua30gY2hhbmdlXG4gICAgICAgICAqL1xuICAgICAgICBjb25zdCB1cGRhdGVEZWNvcmF0b3JzID0gKGVkaXRvciwgY2hhbmdlKSA9PiB7XG4gICAgICAgICAgICBpZiAoIWVkaXRvcikge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2YgZWRpdG9yLnJlbmRlcmVyLiRzY3JvbGxEZWNvcmF0b3IuYWRkWm9uZSAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNoYW5nZS5vbGQuc3RhcnQucm93ICE9IGNoYW5nZS5vbGQuZW5kLnJvdykge1xuICAgICAgICAgICAgICAgIGVkaXRvci5yZW5kZXJlci4kc2Nyb2xsRGVjb3JhdG9yLmFkZFpvbmUoY2hhbmdlLm9sZC5zdGFydC5yb3csIGNoYW5nZS5vbGQuZW5kLnJvdyAtIDEsIFwiZGVsZXRlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNoYW5nZS5uZXcuc3RhcnQucm93ICE9IGNoYW5nZS5uZXcuZW5kLnJvdykge1xuICAgICAgICAgICAgICAgIGVkaXRvci5yZW5kZXJlci4kc2Nyb2xsRGVjb3JhdG9yLmFkZFpvbmUoY2hhbmdlLm5ldy5zdGFydC5yb3csIGNoYW5nZS5uZXcuZW5kLnJvdyAtIDEsIFwiaW5zZXJ0XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmICh0aGlzLmlubGluZURpZmZFZGl0b3IpIHtcbiAgICAgICAgICAgIHRoaXMuY2h1bmtzICYmIHRoaXMuY2h1bmtzLmZvckVhY2goKGxpbmVDaGFuZ2UpID0+IHtcbiAgICAgICAgICAgICAgICB1cGRhdGVEZWNvcmF0b3JzKHRoaXMuYWN0aXZlRWRpdG9yLCBsaW5lQ2hhbmdlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVFZGl0b3IucmVuZGVyZXIuJHNjcm9sbERlY29yYXRvci4kdXBkYXRlRGVjb3JhdG9ycyh0aGlzLmFjdGl2ZUVkaXRvci5yZW5kZXJlci5sYXllckNvbmZpZyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNodW5rcyAmJiB0aGlzLmNodW5rcy5mb3JFYWNoKChsaW5lQ2hhbmdlKSA9PiB7XG4gICAgICAgICAgICAgICAgdXBkYXRlRGVjb3JhdG9ycyh0aGlzLmVkaXRvckEsIGxpbmVDaGFuZ2UpO1xuICAgICAgICAgICAgICAgIHVwZGF0ZURlY29yYXRvcnModGhpcy5lZGl0b3JCLCBsaW5lQ2hhbmdlKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLmVkaXRvckEucmVuZGVyZXIuJHNjcm9sbERlY29yYXRvci4kdXBkYXRlRGVjb3JhdG9ycyh0aGlzLmVkaXRvckEucmVuZGVyZXIubGF5ZXJDb25maWcpO1xuICAgICAgICAgICAgdGhpcy5lZGl0b3JCLnJlbmRlcmVyLiRzY3JvbGxEZWNvcmF0b3IuJHVwZGF0ZURlY29yYXRvcnModGhpcy5lZGl0b3JCLnJlbmRlcmVyLmxheWVyQ29uZmlnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmdbXX0gdmFsMVxuICAgICAqIEBwYXJhbSB7c3RyaW5nW119IHZhbDJcbiAgICAgKiBAcmV0dXJuIHtEaWZmQ2h1bmtbXX1cbiAgICAgKi9cbiAgICAkZGlmZkxpbmVzKHZhbDEsIHZhbDIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlmZlByb3ZpZGVyLmNvbXB1dGUodmFsMSwgdmFsMiwge1xuICAgICAgICAgICAgaWdub3JlVHJpbVdoaXRlc3BhY2U6IHRoaXMuJGlnbm9yZVRyaW1XaGl0ZXNwYWNlLFxuICAgICAgICAgICAgbWF4Q29tcHV0YXRpb25UaW1lTXM6IHRoaXMuJG1heENvbXB1dGF0aW9uVGltZU1zXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7aW1wb3J0KFwiLi9wcm92aWRlcnMvZGVmYXVsdFwiKS5EaWZmUHJvdmlkZXJ9IHByb3ZpZGVyXG4gICAgICovXG4gICAgc2V0UHJvdmlkZXIocHJvdmlkZXIpIHtcbiAgICAgICAgdGhpcy5kaWZmUHJvdmlkZXIgPSBwcm92aWRlcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0VkaXRTZXNzaW9ufSBzZXNzaW9uXG4gICAgICogQHBhcmFtIHt7IHJvd0NvdW50OiBudW1iZXI7IHJvd3NBYm92ZTogbnVtYmVyOyByb3c6IG51bWJlcjsgfX0gd1xuICAgICAqL1xuICAgICRhZGRXaWRnZXQoc2Vzc2lvbiwgdykge1xuICAgICAgICBsZXQgbGluZVdpZGdldCA9IHNlc3Npb24ubGluZVdpZGdldHNbdy5yb3ddO1xuICAgICAgICBpZiAobGluZVdpZGdldCkge1xuICAgICAgICAgICAgdy5yb3dzQWJvdmUgKz0gbGluZVdpZGdldC5yb3dzQWJvdmUgPiB3LnJvd3NBYm92ZSA/IGxpbmVXaWRnZXQucm93c0Fib3ZlIDogdy5yb3dzQWJvdmU7XG4gICAgICAgICAgICB3LnJvd0NvdW50ICs9IGxpbmVXaWRnZXQucm93Q291bnQ7XG4gICAgICAgIH1cbiAgICAgICAgc2Vzc2lvbi5saW5lV2lkZ2V0c1t3LnJvd10gPSB3O1xuICAgICAgICBzZXNzaW9uLndpZGdldE1hbmFnZXIubGluZVdpZGdldHNbdy5yb3ddID0gdztcbiAgICAgICAgc2Vzc2lvbi4kcmVzZXRSb3dDYWNoZSh3LnJvdyk7XG4gICAgICAgIHZhciBmb2xkID0gc2Vzc2lvbi5nZXRGb2xkQXQody5yb3csIDApO1xuICAgICAgICBpZiAoZm9sZCkge1xuICAgICAgICAgICAgc2Vzc2lvbi53aWRnZXRNYW5hZ2VyLnVwZGF0ZU9uRm9sZCh7XG4gICAgICAgICAgICAgICAgZGF0YTogZm9sZCxcbiAgICAgICAgICAgICAgICBhY3Rpb246IFwiYWRkXCIsXG4gICAgICAgICAgICB9LCBzZXNzaW9uKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7RWRpdG9yfSBlZGl0b3JcbiAgICAgKi9cbiAgICAkaW5pdFdpZGdldHMoZWRpdG9yKSB7XG4gICAgICAgIHZhciBzZXNzaW9uID0gZWRpdG9yLnNlc3Npb247XG4gICAgICAgIGlmICghc2Vzc2lvbi53aWRnZXRNYW5hZ2VyKSB7XG4gICAgICAgICAgICBzZXNzaW9uLndpZGdldE1hbmFnZXIgPSBuZXcgTGluZVdpZGdldHMoc2Vzc2lvbik7XG4gICAgICAgICAgICBzZXNzaW9uLndpZGdldE1hbmFnZXIuYXR0YWNoKGVkaXRvcik7XG4gICAgICAgIH1cbiAgICAgICAgZWRpdG9yLnNlc3Npb24ubGluZVdpZGdldHMgPSBbXTtcbiAgICAgICAgZWRpdG9yLnNlc3Npb24ud2lkZ2V0TWFuYWdlci5saW5lV2lkZ2V0cyA9IFtdO1xuICAgICAgICBlZGl0b3Iuc2Vzc2lvbi4kcmVzZXRSb3dDYWNoZSgwKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2ltcG9ydChcIi4uLy4uLy4uL2FjZS1pbnRlcm5hbFwiKS5BY2UuUG9pbnR9IHBvc1xuICAgICAqIEBwYXJhbSB7RWRpdFNlc3Npb259IHNlc3Npb25cbiAgICAgKi9cbiAgICAkc2NyZWVuUm93KHBvcywgc2Vzc2lvbikge1xuICAgICAgICB2YXIgcm93ID0gc2Vzc2lvbi5kb2N1bWVudFRvU2NyZWVuUG9zaXRpb24ocG9zKS5yb3c7XG4gICAgICAgIHZhciBhZnRlckVuZCA9IHBvcy5yb3cgLSBzZXNzaW9uLmdldExlbmd0aCgpICsgMTtcbiAgICAgICAgaWYgKGFmdGVyRW5kID4gMCkge1xuICAgICAgICAgICAgcm93ICs9IGFmdGVyRW5kO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByb3c7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogc2Nyb2xsIGxvY2tpbmdcbiAgICAgKiBAYWJzdHJhY3RcbiAgICAgKiovXG4gICAgYWxpZ24oKSB7fVxuXG4gICAgb25DaGFuZ2VXcmFwTGltaXQoZSwgc2Vzc2lvbikge31cblxuICAgIG9uU2VsZWN0KGUsIHNlbGVjdGlvbikge1xuICAgICAgICB0aGlzLnNlYXJjaEhpZ2hsaWdodChzZWxlY3Rpb24pO1xuICAgICAgICB0aGlzLnN5bmNTZWxlY3Qoc2VsZWN0aW9uKTtcbiAgICB9XG5cbiAgICBzeW5jU2VsZWN0KHNlbGVjdGlvbikge1xuICAgICAgICBpZiAodGhpcy4kdXBkYXRpbmdTZWxlY3Rpb24pIHJldHVybjtcbiAgICAgICAgdmFyIGlzT2xkID0gc2VsZWN0aW9uLnNlc3Npb24gPT09IHRoaXMuc2Vzc2lvbkE7XG4gICAgICAgIHZhciBzZWxlY3Rpb25SYW5nZSA9IHNlbGVjdGlvbi5nZXRSYW5nZSgpO1xuXG4gICAgICAgIHZhciBjdXJyU2VsZWN0aW9uUmFuZ2UgPSBpc09sZCA/IHRoaXMuc2VsZWN0aW9uUmFuZ2VBIDogdGhpcy5zZWxlY3Rpb25SYW5nZUI7XG4gICAgICAgIGlmIChjdXJyU2VsZWN0aW9uUmFuZ2UgJiYgc2VsZWN0aW9uUmFuZ2UuaXNFcXVhbChjdXJyU2VsZWN0aW9uUmFuZ2UpKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIGlmIChpc09sZCkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25SYW5nZUEgPSBzZWxlY3Rpb25SYW5nZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uUmFuZ2VCID0gc2VsZWN0aW9uUmFuZ2U7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLiR1cGRhdGluZ1NlbGVjdGlvbiA9IHRydWU7XG4gICAgICAgIHZhciBuZXdSYW5nZSA9IHRoaXMudHJhbnNmb3JtUmFuZ2Uoc2VsZWN0aW9uUmFuZ2UsIGlzT2xkKTtcblxuICAgICAgICBpZiAodGhpcy4kc3luY1NlbGVjdGlvbnMpIHtcbiAgICAgICAgICAgIChpc09sZCA/IHRoaXMuZWRpdG9yQiA6IHRoaXMuZWRpdG9yQSkuc2Vzc2lvbi5zZWxlY3Rpb24uc2V0U2VsZWN0aW9uUmFuZ2UobmV3UmFuZ2UpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuJHVwZGF0aW5nU2VsZWN0aW9uID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKGlzT2xkKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvblJhbmdlQSA9IHNlbGVjdGlvblJhbmdlO1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25SYW5nZUIgPSBuZXdSYW5nZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uUmFuZ2VBID0gbmV3UmFuZ2U7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvblJhbmdlQiA9IHNlbGVjdGlvblJhbmdlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy51cGRhdGVTZWxlY3Rpb25NYXJrZXIodGhpcy5zeW5jU2VsZWN0aW9uTWFya2VyQSwgdGhpcy5zZXNzaW9uQSwgdGhpcy5zZWxlY3Rpb25SYW5nZUEpO1xuICAgICAgICB0aGlzLnVwZGF0ZVNlbGVjdGlvbk1hcmtlcih0aGlzLnN5bmNTZWxlY3Rpb25NYXJrZXJCLCB0aGlzLnNlc3Npb25CLCB0aGlzLnNlbGVjdGlvblJhbmdlQik7XG4gICAgfVxuXG4gICAgdXBkYXRlU2VsZWN0aW9uTWFya2VyKG1hcmtlciwgc2Vzc2lvbiwgcmFuZ2UpIHtcbiAgICAgICAgbWFya2VyLnNldFJhbmdlKHJhbmdlKTtcbiAgICAgICAgc2Vzc2lvbi5fc2lnbmFsKFwiY2hhbmdlRnJvbnRNYXJrZXJcIik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGV2XG4gICAgICogQHBhcmFtIHtFZGl0U2Vzc2lvbn0gc2Vzc2lvblxuICAgICAqL1xuICAgIG9uQ2hhbmdlRm9sZChldiwgc2Vzc2lvbikge1xuICAgICAgICB2YXIgZm9sZCA9IGV2LmRhdGE7XG4gICAgICAgIGlmICh0aGlzLiRzeW5jaW5nRm9sZCB8fCAhZm9sZCB8fCAhZXYuYWN0aW9uKSByZXR1cm47XG4gICAgICAgIHRoaXMuc2NoZWR1bGVSZWFsaWduKCk7XG5cbiAgICAgICAgY29uc3QgaXNPcmlnID0gc2Vzc2lvbiA9PT0gdGhpcy5zZXNzaW9uQTtcbiAgICAgICAgY29uc3Qgb3RoZXIgPSBpc09yaWcgPyB0aGlzLnNlc3Npb25CIDogdGhpcy5zZXNzaW9uQTtcblxuICAgICAgICBpZiAoZXYuYWN0aW9uID09PSBcInJlbW92ZVwiKSB7XG4gICAgICAgICAgICBpZiAoZm9sZC5vdGhlcikge1xuICAgICAgICAgICAgICAgIGZvbGQub3RoZXIub3RoZXIgPSBudWxsO1xuICAgICAgICAgICAgICAgIG90aGVyLnJlbW92ZUZvbGQoZm9sZC5vdGhlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChmb2xkLmxpbmVXaWRnZXQpIHtcbiAgICAgICAgICAgICAgICBvdGhlci53aWRnZXRNYW5hZ2VyLmFkZExpbmVXaWRnZXQoZm9sZC5saW5lV2lkZ2V0KTtcbiAgICAgICAgICAgICAgICBmb2xkLmxpbmVXaWRnZXQgPSBudWxsO1xuICAgICAgICAgICAgICAgIGlmIChvdGhlcltcIiRlZGl0b3JcIl0pIHtcbiAgICAgICAgICAgICAgICAgICAgb3RoZXJbXCIkZWRpdG9yXCJdLnJlbmRlcmVyLnVwZGF0ZUJhY2tNYXJrZXJzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGV2LmFjdGlvbiA9PT0gXCJhZGRcIikge1xuICAgICAgICAgICAgY29uc3QgcmFuZ2UgPSB0aGlzLnRyYW5zZm9ybVJhbmdlKGZvbGQucmFuZ2UsIGlzT3JpZyk7XG4gICAgICAgICAgICBpZiAocmFuZ2UuaXNFbXB0eSgpKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgcm93ID0gcmFuZ2Uuc3RhcnQucm93ICsgMTtcbiAgICAgICAgICAgICAgICBpZiAob3RoZXIubGluZVdpZGdldHNbcm93XSkge1xuICAgICAgICAgICAgICAgICAgICBmb2xkLmxpbmVXaWRnZXQgPSBvdGhlci5saW5lV2lkZ2V0c1tyb3ddO1xuICAgICAgICAgICAgICAgICAgICBvdGhlci53aWRnZXRNYW5hZ2VyLnJlbW92ZUxpbmVXaWRnZXQoZm9sZC5saW5lV2lkZ2V0KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG90aGVyW1wiJGVkaXRvclwiXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJbXCIkZWRpdG9yXCJdLnJlbmRlcmVyLnVwZGF0ZUJhY2tNYXJrZXJzKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRzeW5jaW5nRm9sZCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICBmb2xkLm90aGVyID0gb3RoZXIuYWRkRm9sZChmb2xkLnBsYWNlaG9sZGVyLCByYW5nZSk7XG4gICAgICAgICAgICAgICAgaWYgKGZvbGQub3RoZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9sZC5vdGhlci5vdGhlciA9IGZvbGQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuJHN5bmNpbmdGb2xkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzY2hlZHVsZVJlYWxpZ24oKSB7XG4gICAgICAgIGlmICghdGhpcy5yZWFsaWduUGVuZGluZykge1xuICAgICAgICAgICAgdGhpcy5yZWFsaWduUGVuZGluZyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmVkaXRvckEucmVuZGVyZXIub24oXCJiZWZvcmVSZW5kZXJcIiwgdGhpcy5yZWFsaWduKTtcbiAgICAgICAgICAgIHRoaXMuZWRpdG9yQi5yZW5kZXJlci5vbihcImJlZm9yZVJlbmRlclwiLCB0aGlzLnJlYWxpZ24pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVhbGlnbigpIHtcbiAgICAgICAgdGhpcy5yZWFsaWduUGVuZGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuZWRpdG9yQS5yZW5kZXJlci5vZmYoXCJiZWZvcmVSZW5kZXJcIiwgdGhpcy5yZWFsaWduKTtcbiAgICAgICAgdGhpcy5lZGl0b3JCLnJlbmRlcmVyLm9mZihcImJlZm9yZVJlbmRlclwiLCB0aGlzLnJlYWxpZ24pO1xuICAgICAgICB0aGlzLmFsaWduKCk7XG4gICAgICAgIHRoaXMucmVhbGlnblBlbmRpbmcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBkZXRhY2goKSB7XG4gICAgICAgIGlmICghdGhpcy5lZGl0b3JBIHx8ICF0aGlzLmVkaXRvckIpIHJldHVybjtcbiAgICAgICAgaWYgKHRoaXMuc2F2ZWRPcHRpb25zQSlcbiAgICAgICAgICAgIHRoaXMuZWRpdG9yQS5zZXRPcHRpb25zKHRoaXMuc2F2ZWRPcHRpb25zQSk7XG4gICAgICAgIGlmICh0aGlzLnNhdmVkT3B0aW9uc0IpXG4gICAgICAgICAgICB0aGlzLmVkaXRvckIuc2V0T3B0aW9ucyh0aGlzLnNhdmVkT3B0aW9uc0IpO1xuICAgICAgICB0aGlzLmVkaXRvckEucmVuZGVyZXIub2ZmKFwiYmVmb3JlUmVuZGVyXCIsIHRoaXMucmVhbGlnbik7XG4gICAgICAgIHRoaXMuZWRpdG9yQi5yZW5kZXJlci5vZmYoXCJiZWZvcmVSZW5kZXJcIiwgdGhpcy5yZWFsaWduKTtcbiAgICAgICAgdGhpcy4kZGV0YWNoRXZlbnRIYW5kbGVycygpO1xuICAgICAgICB0aGlzLiRyZW1vdmVMaW5lV2lkZ2V0cyh0aGlzLnNlc3Npb25BKTtcbiAgICAgICAgdGhpcy4kcmVtb3ZlTGluZVdpZGdldHModGhpcy5zZXNzaW9uQik7XG4gICAgICAgIHRoaXMuZ3V0dGVyRGVjb3JhdG9yQSAmJiB0aGlzLmd1dHRlckRlY29yYXRvckEuZGlzcG9zZSgpO1xuICAgICAgICB0aGlzLmd1dHRlckRlY29yYXRvckIgJiYgdGhpcy5ndXR0ZXJEZWNvcmF0b3JCLmRpc3Bvc2UoKTtcbiAgICAgICAgdGhpcy5zZXNzaW9uQS5zZWxlY3Rpb24uY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgdGhpcy5zZXNzaW9uQi5zZWxlY3Rpb24uY2xlYXJTZWxlY3Rpb24oKTtcblxuICAgICAgICBpZiAodGhpcy5zYXZlZE9wdGlvbnNBICYmIHRoaXMuc2F2ZWRPcHRpb25zQS5jdXN0b21TY3JvbGxiYXIpIHtcbiAgICAgICAgICAgIHRoaXMuJHJlc2V0RGVjb3JhdG9ycyh0aGlzLmVkaXRvckEucmVuZGVyZXIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnNhdmVkT3B0aW9uc0IgJiZ0aGlzLnNhdmVkT3B0aW9uc0IuY3VzdG9tU2Nyb2xsYmFyKSB7XG4gICAgICAgICAgICB0aGlzLiRyZXNldERlY29yYXRvcnModGhpcy5lZGl0b3JCLnJlbmRlcmVyKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG5cbiAgICAkcmVtb3ZlTGluZVdpZGdldHMoc2Vzc2lvbikge1xuICAgICAgICAvLyBUT0RPIHJlbW92ZSBvbmx5IG91ciB3aWRnZXRzXG4gICAgICAgIC8vIHNlc3Npb24ud2lkZ2V0TWFuYWdlci5yZW1vdmVMaW5lV2lkZ2V0XG4gICAgICAgIHNlc3Npb24ubGluZVdpZGdldHMgPSBbXTtcbiAgICAgICAgc2Vzc2lvbi53aWRnZXRNYW5hZ2VyLmxpbmVXaWRnZXRzID0gW107XG4gICAgICAgIHNlc3Npb24uX3NpZ25hbChcImNoYW5nZUZvbGRcIiwge2RhdGE6IHtzdGFydDoge3JvdzogMH19fSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGFic3RyYWN0XG4gICAgICovXG4gICAgJGRldGFjaEV2ZW50SGFuZGxlcnMoKSB7XG5cbiAgICB9XG5cbiAgICBkZXN0cm95KCkge1xuICAgICAgICB0aGlzLmRldGFjaCgpO1xuICAgICAgICB0aGlzLmVkaXRvckEgJiYgdGhpcy5lZGl0b3JBLmRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy5lZGl0b3JCICYmIHRoaXMuZWRpdG9yQi5kZXN0cm95KCk7XG4gICAgICAgIHRoaXMuZWRpdG9yQSA9IHRoaXMuZWRpdG9yQiA9IG51bGw7XG4gICAgfVxuXG4gICAgZ290b05leHQoZGlyKSB7XG4gICAgICAgIHZhciBhY2UgPSB0aGlzLmFjdGl2ZUVkaXRvciB8fCB0aGlzLmVkaXRvckE7XG4gICAgICAgIGlmICh0aGlzLmlubGluZURpZmZFZGl0b3IpIHtcbiAgICAgICAgICAgIGFjZSA9IHRoaXMuZWRpdG9yQTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc2lkZUEgPSBhY2UgPT0gdGhpcy5lZGl0b3JBO1xuXG4gICAgICAgIHZhciByb3cgPSBhY2Uuc2VsZWN0aW9uLmxlYWQucm93O1xuICAgICAgICB2YXIgaSA9IHRoaXMuZmluZENodW5rSW5kZXgodGhpcy5jaHVua3MsIHJvdywgc2lkZUEpO1xuICAgICAgICB2YXIgY2h1bmsgPSB0aGlzLmNodW5rc1tpICsgZGlyXSB8fCB0aGlzLmNodW5rc1tpXTtcblxuICAgICAgICB2YXIgc2Nyb2xsVG9wID0gYWNlLnNlc3Npb24uZ2V0U2Nyb2xsVG9wKCk7XG4gICAgICAgIGlmIChjaHVuaykge1xuICAgICAgICAgICAgdmFyIHJhbmdlID0gY2h1bmtbc2lkZUEgPyBcIm9sZFwiIDogXCJuZXdcIl07XG4gICAgICAgICAgICB2YXIgbGluZSA9IE1hdGgubWF4KHJhbmdlLnN0YXJ0LnJvdywgcmFuZ2UuZW5kLnJvdyAtIDEpO1xuICAgICAgICAgICAgYWNlLnNlbGVjdGlvbi5zZXRSYW5nZShuZXcgUmFuZ2UobGluZSwgMCwgbGluZSwgMCkpO1xuICAgICAgICB9XG4gICAgICAgIGFjZS5yZW5kZXJlci5zY3JvbGxTZWxlY3Rpb25JbnRvVmlldyhhY2Uuc2VsZWN0aW9uLmxlYWQsIGFjZS5zZWxlY3Rpb24uYW5jaG9yLCAwLjUpO1xuICAgICAgICBhY2UucmVuZGVyZXIuYW5pbWF0ZVNjcm9sbGluZyhzY3JvbGxUb3ApO1xuICAgIH1cblxuXG4gICAgZmlyc3REaWZmU2VsZWN0ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnREaWZmSW5kZXggPD0gMTtcbiAgICB9XG5cbiAgICBsYXN0RGlmZlNlbGVjdGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50RGlmZkluZGV4ID4gdGhpcy5jaHVua3MubGVuZ3RoIC0gMTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge1JhbmdlfSByYW5nZVxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNPcmlnaW5hbFxuICAgICAqL1xuICAgIHRyYW5zZm9ybVJhbmdlKHJhbmdlLCBpc09yaWdpbmFsKSB7XG4gICAgICAgIHJldHVybiBSYW5nZS5mcm9tUG9pbnRzKHRoaXMudHJhbnNmb3JtUG9zaXRpb24ocmFuZ2Uuc3RhcnQsIGlzT3JpZ2luYWwpLCB0aGlzLnRyYW5zZm9ybVBvc2l0aW9uKHJhbmdlLmVuZCwgaXNPcmlnaW5hbCkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7aW1wb3J0KFwiYWNlLWNvZGVcIikuQWNlLlBvaW50fSBwb3NcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlzT3JpZ2luYWxcbiAgICAgKiBAcmV0dXJuIHtpbXBvcnQoXCJhY2UtY29kZVwiKS5BY2UuUG9pbnR9XG4gICAgICovXG4gICAgdHJhbnNmb3JtUG9zaXRpb24ocG9zLCBpc09yaWdpbmFsKSB7XG4gICAgICAgIHZhciBjaHVua0luZGV4ID0gdGhpcy5maW5kQ2h1bmtJbmRleCh0aGlzLmNodW5rcywgcG9zLnJvdywgaXNPcmlnaW5hbCk7XG5cbiAgICAgICAgdmFyIGNodW5rID0gdGhpcy5jaHVua3NbY2h1bmtJbmRleF07XG5cbiAgICAgICAgdmFyIGNsb25lUG9zID0gdGhpcy5zZXNzaW9uQi5kb2MuY2xvbmVQb3M7XG4gICAgICAgIHZhciByZXN1bHQgPSBjbG9uZVBvcyhwb3MpO1xuXG4gICAgICAgIHZhciBbZnJvbSwgdG9dID0gaXNPcmlnaW5hbCA/IFtcIm9sZFwiLCBcIm5ld1wiXSA6IFtcIm5ld1wiLCBcIm9sZFwiXTtcbiAgICAgICAgdmFyIGRlbHRhQ2hhciA9IDA7XG4gICAgICAgIHZhciBpZ25vcmVJbmRlbnQgPSBmYWxzZTtcblxuICAgICAgICBpZiAoY2h1bmspIHtcbiAgICAgICAgICAgIGlmIChjaHVua1tmcm9tXS5lbmQucm93IDw9IHBvcy5yb3cpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucm93IC09IGNodW5rW2Zyb21dLmVuZC5yb3cgLSBjaHVua1t0b10uZW5kLnJvdztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNodW5rLmNoYXJDaGFuZ2VzKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaHVuay5jaGFyQ2hhbmdlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgY2hhbmdlID0gY2h1bmsuY2hhckNoYW5nZXNbaV07XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGZyb21SYW5nZSA9IGNoYW5nZVtmcm9tXTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRvUmFuZ2UgPSBjaGFuZ2VbdG9dO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChmcm9tUmFuZ2UuZW5kLnJvdyA8IHBvcy5yb3cpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChmcm9tUmFuZ2Uuc3RhcnQucm93ID4gcG9zLnJvdykgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGZyb21SYW5nZS5pc011bHRpTGluZSgpICYmIGZyb21SYW5nZS5jb250YWlucyhwb3Mucm93LCBwb3MuY29sdW1uKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnJvdyA9IHRvUmFuZ2Uuc3RhcnQucm93ICsgcG9zLnJvdyAtIGZyb21SYW5nZS5zdGFydC5yb3c7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWF4Um93ID0gdG9SYW5nZS5lbmQucm93O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRvUmFuZ2UuZW5kLmNvbHVtbiA9PT0gMCkgbWF4Um93LS07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQucm93ID4gbWF4Um93KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnJvdyA9IG1heFJvdztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuY29sdW1uID0gKGlzT3JpZ2luYWwgPyB0aGlzLnNlc3Npb25CIDogdGhpcy5zZXNzaW9uQSkuZ2V0TGluZShtYXhSb3cpLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZ25vcmVJbmRlbnQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnJvdyA9IE1hdGgubWluKHJlc3VsdC5yb3csIG1heFJvdyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucm93ID0gdG9SYW5nZS5zdGFydC5yb3c7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZnJvbVJhbmdlLnN0YXJ0LmNvbHVtbiA+IHBvcy5jb2x1bW4pIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWdub3JlSW5kZW50ID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFmcm9tUmFuZ2UuaXNFbXB0eSgpICYmIGZyb21SYW5nZS5jb250YWlucyhwb3Mucm93LCBwb3MuY29sdW1uKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5jb2x1bW4gPSB0b1JhbmdlLnN0YXJ0LmNvbHVtbjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWx0YUNoYXIgPSBwb3MuY29sdW1uIC0gZnJvbVJhbmdlLnN0YXJ0LmNvbHVtbjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWx0YUNoYXIgPSBNYXRoLm1pbihkZWx0YUNoYXIsIHRvUmFuZ2UuZW5kLmNvbHVtbiAtIHRvUmFuZ2Uuc3RhcnQuY29sdW1uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGNsb25lUG9zKHRvUmFuZ2UuZW5kKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWx0YUNoYXIgPSBwb3MuY29sdW1uIC0gZnJvbVJhbmdlLmVuZC5jb2x1bW47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjaHVua1tmcm9tXS5zdGFydC5yb3cgPD0gcG9zLnJvdykge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5yb3cgKz0gY2h1bmtbdG9dLnN0YXJ0LnJvdyAtIGNodW5rW2Zyb21dLnN0YXJ0LnJvdztcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnJvdyA+PSBjaHVua1t0b10uZW5kLnJvdykge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQucm93ID0gY2h1bmtbdG9dLmVuZC5yb3cgLSAxO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQuY29sdW1uID0gKGlzT3JpZ2luYWwgPyB0aGlzLnNlc3Npb25CIDogdGhpcy5zZXNzaW9uQSkuZ2V0TGluZShyZXN1bHQucm93KS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuICAgICAgICBpZiAoIWlnbm9yZUluZGVudCkgeyAvL1RPRE86XG4gICAgICAgICAgICB2YXIgW2Zyb21FZGl0U2Vzc2lvbiwgdG9FZGl0U2Vzc2lvbl0gPSBpc09yaWdpbmFsID8gW3RoaXMuc2Vzc2lvbkEsIHRoaXMuc2Vzc2lvbkJdIDogW1xuICAgICAgICAgICAgICAgIHRoaXMuc2Vzc2lvbkIsIHRoaXMuc2Vzc2lvbkFcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBkZWx0YUNoYXIgLT0gdGhpcy4kZ2V0RGVsdGFJbmRlbnQoZnJvbUVkaXRTZXNzaW9uLCB0b0VkaXRTZXNzaW9uLCBwb3Mucm93LCByZXN1bHQucm93KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3VsdC5jb2x1bW4gKz0gZGVsdGFDaGFyO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7RWRpdFNlc3Npb259IGZyb21FZGl0U2Vzc2lvblxuICAgICAqIEBwYXJhbSB7RWRpdFNlc3Npb259IHRvRWRpdFNlc3Npb25cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZnJvbUxpbmVcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdG9MaW5lXG4gICAgICovXG4gICAgJGdldERlbHRhSW5kZW50KGZyb21FZGl0U2Vzc2lvbiwgdG9FZGl0U2Vzc2lvbiwgZnJvbUxpbmUsIHRvTGluZSkge1xuICAgICAgICBsZXQgb3JpZ0luZGVudCA9IHRoaXMuJGdldEluZGVudChmcm9tRWRpdFNlc3Npb24sIGZyb21MaW5lKTtcbiAgICAgICAgbGV0IGVkaXRJbmRlbnQgPSB0aGlzLiRnZXRJbmRlbnQodG9FZGl0U2Vzc2lvbiwgdG9MaW5lKTtcbiAgICAgICAgcmV0dXJuIG9yaWdJbmRlbnQgLSBlZGl0SW5kZW50O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7RWRpdFNlc3Npb259IGVkaXRTZXNzaW9uXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGxpbmVcbiAgICAgKi9cbiAgICAkZ2V0SW5kZW50KGVkaXRTZXNzaW9uLCBsaW5lKSB7XG4gICAgICAgIHJldHVybiBlZGl0U2Vzc2lvbi5nZXRMaW5lKGxpbmUpLm1hdGNoKC9eXFxzKi8pWzBdLmxlbmd0aDtcbiAgICB9XG5cbiAgICBwcmludERpZmZzKCkge1xuICAgICAgICB0aGlzLmNodW5rcy5mb3JFYWNoKChkaWZmKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkaWZmLnRvU3RyaW5nKCkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RGlmZkNodW5rW119IGNodW5rc1xuICAgICAqIEBwYXJhbSB7bnVtYmVyfSByb3dcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGlzT3JpZ2luYWxcbiAgICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAgICovXG4gICAgZmluZENodW5rSW5kZXgoY2h1bmtzLCByb3csIGlzT3JpZ2luYWwpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaHVua3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBjaCA9IGNodW5rc1tpXTtcbiAgICAgICAgICAgIHZhciBjaHVuayA9IGlzT3JpZ2luYWwgPyBjaC5vbGQgOiBjaC5uZXc7XG4gICAgICAgICAgICBpZiAoY2h1bmsuZW5kLnJvdyA8IHJvdykgY29udGludWU7XG4gICAgICAgICAgICBpZiAoY2h1bmsuc3RhcnQucm93ID4gcm93KSBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY3VycmVudERpZmZJbmRleCA9IGk7XG5cbiAgICAgICAgcmV0dXJuIGkgLSAxO1xuICAgIH1cblxuICAgIHNlYXJjaEhpZ2hsaWdodChzZWxlY3Rpb24pIHtcbiAgICAgICAgaWYgKHRoaXMuJHN5bmNTZWxlY3Rpb25zIHx8IHRoaXMuaW5saW5lRGlmZkVkaXRvcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBjdXJyU2Vzc2lvbiA9IHNlbGVjdGlvbi5zZXNzaW9uO1xuICAgICAgICBsZXQgb3RoZXJTZXNzaW9uID0gY3VyclNlc3Npb24gPT09IHRoaXMuc2Vzc2lvbkFcbiAgICAgICAgICAgID8gdGhpcy5zZXNzaW9uQiA6IHRoaXMuc2Vzc2lvbkE7XG4gICAgICAgIG90aGVyU2Vzc2lvbi5oaWdobGlnaHQoY3VyclNlc3Npb24uJHNlYXJjaEhpZ2hsaWdodC5yZWdFeHApO1xuICAgICAgICBvdGhlclNlc3Npb24uX3NpZ25hbChcImNoYW5nZUJhY2tNYXJrZXJcIik7XG4gICAgfVxuXG4gICAgaW5pdFNlbGVjdGlvbk1hcmtlcnMoKSB7XG4gICAgICAgIHRoaXMuc3luY1NlbGVjdGlvbk1hcmtlckEgPSBuZXcgU3luY1NlbGVjdGlvbk1hcmtlcigpO1xuICAgICAgICB0aGlzLnN5bmNTZWxlY3Rpb25NYXJrZXJCID0gbmV3IFN5bmNTZWxlY3Rpb25NYXJrZXIoKTtcbiAgICAgICAgdGhpcy5zZXNzaW9uQS5hZGREeW5hbWljTWFya2VyKHRoaXMuc3luY1NlbGVjdGlvbk1hcmtlckEsIHRydWUpO1xuICAgICAgICB0aGlzLnNlc3Npb25CLmFkZER5bmFtaWNNYXJrZXIodGhpcy5zeW5jU2VsZWN0aW9uTWFya2VyQiwgdHJ1ZSk7XG4gICAgfVxuICAgIGNsZWFyU2VsZWN0aW9uTWFya2VycygpIHtcbiAgICAgICAgdGhpcy5zZXNzaW9uQS5yZW1vdmVNYXJrZXIodGhpcy5zeW5jU2VsZWN0aW9uTWFya2VyQS5pZCk7XG4gICAgICAgIHRoaXMuc2Vzc2lvbkIucmVtb3ZlTWFya2VyKHRoaXMuc3luY1NlbGVjdGlvbk1hcmtlckIuaWQpO1xuICAgIH1cbn1cblxuLyoqKiBvcHRpb25zICoqKi9cblxuY29uZmlnLmRlZmluZU9wdGlvbnMoQmFzZURpZmZWaWV3LnByb3RvdHlwZSwgXCJEaWZmVmlld1wiLCB7XG4gICAgc2hvd090aGVyTGluZU51bWJlcnM6IHtcbiAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZ3V0dGVyTGF5ZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmd1dHRlckxheWVyLiRyZW5kZXJlciA9IHZhbHVlID8gIG51bGwgOiBlbXB0eUd1dHRlclJlbmRlcmVyO1xuICAgICAgICAgICAgICAgIHRoaXMuZWRpdG9yQS5yZW5kZXJlci51cGRhdGVGdWxsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGluaXRpYWxWYWx1ZTogdHJ1ZVxuICAgIH0sXG4gICAgZm9sZGluZzoge1xuICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLmVkaXRvckEuc2V0T3B0aW9uKFwic2hvd0ZvbGRXaWRnZXRzXCIsIHZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMuZWRpdG9yQi5zZXRPcHRpb24oXCJzaG93Rm9sZFdpZGdldHNcIiwgdmFsdWUpO1xuICAgICAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHZhciBwb3NBID0gW107XG4gICAgICAgICAgICAgICAgdmFyIHBvc0IgPSBbXTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jaHVua3MpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaHVua3MuZm9yRWFjaCh4PT57XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NBLnB1c2goeC5vbGQuc3RhcnQsIHgub2xkLmVuZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NCLnB1c2goeC5uZXcuc3RhcnQsIHgubmV3LmVuZCk7XG4gICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5zZXNzaW9uQS51bmZvbGQocG9zQSk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXNzaW9uQi51bmZvbGQocG9zQik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHN5bmNTZWxlY3Rpb25zOiB7XG4gICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcblxuICAgICAgICB9LFxuICAgIH0sXG4gICAgaWdub3JlVHJpbVdoaXRlc3BhY2U6IHtcbiAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5zY2hlZHVsZU9uSW5wdXQoKTtcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIHdyYXA6IHtcbiAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5zZXNzaW9uQS5zZXRPcHRpb24oXCJ3cmFwXCIsIHZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMuc2Vzc2lvbkIuc2V0T3B0aW9uKFwid3JhcFwiLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIG1heERpZmZzOiB7XG4gICAgICAgIHZhbHVlOiA1MDAwLFxuICAgIH0sXG4gICAgdGhlbWU6IHtcbiAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRUaGVtZSh2YWx1ZSk7XG4gICAgICAgIH0sXG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lZGl0b3JBLmdldFRoZW1lKCk7XG4gICAgICAgIH1cbiAgICB9LFxufSk7XG5cbnZhciBlbXB0eUd1dHRlclJlbmRlcmVyID0gIHtcbiAgICBnZXRUZXh0OiBmdW5jdGlvbiBuYW1lKHBhcmFtcykge1xuICAgICAgICByZXR1cm4gXCJcIjtcbiAgICB9LFxuICAgIGdldFdpZHRoKCkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG59O1xuXG5leHBvcnRzLkJhc2VEaWZmVmlldyA9IEJhc2VEaWZmVmlldztcblxuXG5jbGFzcyBEaWZmQ2h1bmsge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7UmFuZ2V9IG9yaWdpbmFsUmFuZ2VcbiAgICAgKiBAcGFyYW0ge1JhbmdlfSBtb2RpZmllZFJhbmdlXG4gICAgICogQHBhcmFtIHt7b3JpZ2luYWxTdGFydExpbmVOdW1iZXI6IG51bWJlciwgb3JpZ2luYWxTdGFydENvbHVtbjogbnVtYmVyLFxuICAgICAqIG9yaWdpbmFsRW5kTGluZU51bWJlcjogbnVtYmVyLCBvcmlnaW5hbEVuZENvbHVtbjogbnVtYmVyLCBtb2RpZmllZFN0YXJ0TGluZU51bWJlcjogbnVtYmVyLFxuICAgICAqIG1vZGlmaWVkU3RhcnRDb2x1bW46IG51bWJlciwgbW9kaWZpZWRFbmRMaW5lTnVtYmVyOiBudW1iZXIsIG1vZGlmaWVkRW5kQ29sdW1uOiBudW1iZXJ9W119IFtjaGFyQ2hhbmdlc11cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcmlnaW5hbFJhbmdlLCBtb2RpZmllZFJhbmdlLCBjaGFyQ2hhbmdlcykge1xuICAgICAgICB0aGlzLm9sZCA9IG9yaWdpbmFsUmFuZ2U7XG4gICAgICAgIHRoaXMubmV3ID0gbW9kaWZpZWRSYW5nZTtcbiAgICAgICAgdGhpcy5jaGFyQ2hhbmdlcyA9IGNoYXJDaGFuZ2VzICYmIGNoYXJDaGFuZ2VzLm1hcChtID0+IG5ldyBEaWZmQ2h1bmsoXG4gICAgICAgICAgICBuZXcgUmFuZ2UobS5vcmlnaW5hbFN0YXJ0TGluZU51bWJlciwgbS5vcmlnaW5hbFN0YXJ0Q29sdW1uLFxuICAgICAgICAgICAgICAgIG0ub3JpZ2luYWxFbmRMaW5lTnVtYmVyLCBtLm9yaWdpbmFsRW5kQ29sdW1uXG4gICAgICAgICAgICApLCBuZXcgUmFuZ2UobS5tb2RpZmllZFN0YXJ0TGluZU51bWJlciwgbS5tb2RpZmllZFN0YXJ0Q29sdW1uLFxuICAgICAgICAgICAgICAgIG0ubW9kaWZpZWRFbmRMaW5lTnVtYmVyLCBtLm1vZGlmaWVkRW5kQ29sdW1uXG4gICAgICAgICAgICApKSk7XG4gICAgfVxufVxuXG5jbGFzcyBEaWZmSGlnaGxpZ2h0IHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2ltcG9ydChcIi4vYmFzZV9kaWZmX3ZpZXdcIikuQmFzZURpZmZWaWV3fSBkaWZmVmlld1xuICAgICAqIEBwYXJhbSB0eXBlXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoZGlmZlZpZXcsIHR5cGUpIHtcbiAgICAgICAgLyoqQHR5cGV7bnVtYmVyfSovdGhpcy5pZDtcbiAgICAgICAgdGhpcy5kaWZmVmlldyA9IGRpZmZWaWV3O1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIH1cblxuICAgIHVwZGF0ZShodG1sLCBtYXJrZXJMYXllciwgc2Vzc2lvbiwgY29uZmlnKSB7XG4gICAgICAgIGxldCBkaXIsIG9wZXJhdGlvbiwgb3BPcGVyYXRpb247XG4gICAgICAgIHZhciBkaWZmVmlldyA9IHRoaXMuZGlmZlZpZXc7XG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT09IC0xKSB7Ly8gb3JpZ2luYWwgZWRpdG9yXG4gICAgICAgICAgICBkaXIgPSBcIm9sZFwiO1xuICAgICAgICAgICAgb3BlcmF0aW9uID0gXCJkZWxldGVcIjtcbiAgICAgICAgICAgIG9wT3BlcmF0aW9uID0gXCJpbnNlcnRcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHsgLy9tb2RpZmllZCBlZGl0b3JcbiAgICAgICAgICAgIGRpciA9IFwibmV3XCI7XG4gICAgICAgICAgICBvcGVyYXRpb24gPSBcImluc2VydFwiO1xuICAgICAgICAgICAgb3BPcGVyYXRpb24gPSBcImRlbGV0ZVwiO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGlnbm9yZVRyaW1XaGl0ZXNwYWNlID0gZGlmZlZpZXcuJGlnbm9yZVRyaW1XaGl0ZXNwYWNlO1xuICAgICAgICB2YXIgbGluZUNoYW5nZXMgPSBkaWZmVmlldy5jaHVua3M7XG5cbiAgICAgICAgaWYgKHNlc3Npb24ubGluZVdpZGdldHMgJiYgIWRpZmZWaWV3LmlubGluZURpZmZFZGl0b3IpIHtcbiAgICAgICAgICAgIGZvciAodmFyIHJvdyA9IGNvbmZpZy5maXJzdFJvdzsgcm93IDw9IGNvbmZpZy5sYXN0Um93OyByb3crKykge1xuICAgICAgICAgICAgICAgIHZhciBsaW5lV2lkZ2V0ID0gc2Vzc2lvbi5saW5lV2lkZ2V0c1tyb3ddO1xuICAgICAgICAgICAgICAgIGlmICghbGluZVdpZGdldCB8fCBsaW5lV2lkZ2V0LmhpZGRlbilcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgICAgICAgICBsZXQgc3RhcnQgPSBzZXNzaW9uLmRvY3VtZW50VG9TY3JlZW5Sb3cocm93LCAwKTtcblxuICAgICAgICAgICAgICAgIGlmIChsaW5lV2lkZ2V0LnJvd3NBYm92ZSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJhbmdlID0gbmV3IFJhbmdlKHN0YXJ0IC0gbGluZVdpZGdldC5yb3dzQWJvdmUsIDAsIHN0YXJ0IC0gMSwgTnVtYmVyLk1BWF9WQUxVRSk7XG4gICAgICAgICAgICAgICAgICAgIG1hcmtlckxheWVyLmRyYXdGdWxsTGluZU1hcmtlcihodG1sLCByYW5nZSwgXCJhY2VfZGlmZiBhbGlnbmVkX2RpZmZcIiwgY29uZmlnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IGVuZCA9IHN0YXJ0ICsgbGluZVdpZGdldC5yb3dDb3VudCAtIChsaW5lV2lkZ2V0LnJvd3NBYm92ZSB8fCAwKTtcbiAgICAgICAgICAgICAgICB2YXIgcmFuZ2UgPSBuZXcgUmFuZ2Uoc3RhcnQgKyAxLCAwLCBlbmQsIE51bWJlci5NQVhfVkFMVUUpO1xuICAgICAgICAgICAgICAgIG1hcmtlckxheWVyLmRyYXdGdWxsTGluZU1hcmtlcihodG1sLCByYW5nZSwgXCJhY2VfZGlmZiBhbGlnbmVkX2RpZmZcIiwgY29uZmlnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxpbmVDaGFuZ2VzLmZvckVhY2goKGxpbmVDaGFuZ2UpID0+IHtcbiAgICAgICAgICAgIGxldCBzdGFydFJvdyA9IGxpbmVDaGFuZ2VbZGlyXS5zdGFydC5yb3c7XG4gICAgICAgICAgICBsZXQgZW5kUm93ID0gbGluZUNoYW5nZVtkaXJdLmVuZC5yb3c7XG4gICAgICAgICAgICBpZiAoZW5kUm93IDwgY29uZmlnLmZpcnN0Um93IHx8IHN0YXJ0Um93ID4gY29uZmlnLmxhc3RSb3cpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgbGV0IHJhbmdlID0gbmV3IFJhbmdlKHN0YXJ0Um93LCAwLCBlbmRSb3cgLSAxLCAxIDw8IDMwKTtcbiAgICAgICAgICAgIGlmIChzdGFydFJvdyAhPT0gZW5kUm93KSB7XG4gICAgICAgICAgICAgICAgcmFuZ2UgPSByYW5nZS50b1NjcmVlblJhbmdlKHNlc3Npb24pO1xuXG4gICAgICAgICAgICAgICAgbWFya2VyTGF5ZXIuZHJhd0Z1bGxMaW5lTWFya2VyKGh0bWwsIHJhbmdlLCBcImFjZV9kaWZmIFwiICsgb3BlcmF0aW9uLCBjb25maWcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobGluZUNoYW5nZS5jaGFyQ2hhbmdlcykge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGluZUNoYW5nZS5jaGFyQ2hhbmdlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY2hhbmdlUmFuZ2UgPSBsaW5lQ2hhbmdlLmNoYXJDaGFuZ2VzW2ldW2Rpcl07XG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGFuZ2VSYW5nZS5lbmQuY29sdW1uID09IDAgJiYgY2hhbmdlUmFuZ2UuZW5kLnJvdyA+IGNoYW5nZVJhbmdlLnN0YXJ0LnJvdyAmJiBjaGFuZ2VSYW5nZS5lbmQucm93ID09IGxpbmVDaGFuZ2VbZGlyXS5lbmQucm93ICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlUmFuZ2UuZW5kLnJvdyAtLTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZVJhbmdlLmVuZC5jb2x1bW4gPSBOdW1iZXIuTUFYX1ZBTFVFO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlnbm9yZVRyaW1XaGl0ZXNwYWNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBsaW5lTnVtYmVyID0gY2hhbmdlUmFuZ2Uuc3RhcnQucm93O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW5lTnVtYmVyIDw9IGNoYW5nZVJhbmdlLmVuZC5yb3c7IGxpbmVOdW1iZXIrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzdGFydENvbHVtbjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZW5kQ29sdW1uO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzZXNzaW9uTGluZVN0YXJ0ID0gc2Vzc2lvbi5nZXRMaW5lKGxpbmVOdW1iZXIpLm1hdGNoKC9eXFxzKi8pWzBdLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2Vzc2lvbkxpbmVFbmQgPSBzZXNzaW9uLmdldExpbmUobGluZU51bWJlcikubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxpbmVOdW1iZXIgPT09IGNoYW5nZVJhbmdlLnN0YXJ0LnJvdykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydENvbHVtbiA9IGNoYW5nZVJhbmdlLnN0YXJ0LmNvbHVtbjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0Q29sdW1uID0gc2Vzc2lvbkxpbmVTdGFydDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxpbmVOdW1iZXIgPT09IGNoYW5nZVJhbmdlLmVuZC5yb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5kQ29sdW1uID0gY2hhbmdlUmFuZ2UuZW5kLmNvbHVtbjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZENvbHVtbiA9IHNlc3Npb25MaW5lRW5kO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmFuZ2UgPSBuZXcgUmFuZ2UobGluZU51bWJlciwgc3RhcnRDb2x1bW4sIGxpbmVOdW1iZXIsIGVuZENvbHVtbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNjcmVlblJhbmdlID0gcmFuZ2UudG9TY3JlZW5SYW5nZShzZXNzaW9uKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZXNzaW9uTGluZVN0YXJ0ID09PSBzdGFydENvbHVtbiAmJiBzZXNzaW9uTGluZUVuZCA9PT0gZW5kQ29sdW1uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjc3NDbGFzcyA9IFwiaW5saW5lIFwiICsgb3BlcmF0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyYW5nZS5pc0VtcHR5KCkgJiYgc3RhcnRDb2x1bW4gIT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3NzQ2xhc3MgPSBcImlubGluZSBcIiArIG9wT3BlcmF0aW9uICsgXCIgZW1wdHlcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJrZXJMYXllci5kcmF3U2luZ2xlTGluZU1hcmtlcihodG1sLCBzY3JlZW5SYW5nZSwgXCJhY2VfZGlmZiBcIiArIGNzc0NsYXNzLCBjb25maWcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJhbmdlID0gbmV3IFJhbmdlKGNoYW5nZVJhbmdlLnN0YXJ0LnJvdywgY2hhbmdlUmFuZ2Uuc3RhcnQuY29sdW1uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZVJhbmdlLmVuZC5yb3csIGNoYW5nZVJhbmdlLmVuZC5jb2x1bW5cbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2NyZWVuUmFuZ2UgPSByYW5nZS50b1NjcmVlblJhbmdlKHNlc3Npb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNzc0NsYXNzID0gXCJpbmxpbmUgXCIgKyBvcGVyYXRpb247XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmFuZ2UuaXNFbXB0eSgpICYmIGNoYW5nZVJhbmdlLnN0YXJ0LmNvbHVtbiAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNzc0NsYXNzID0gXCJpbmxpbmUgZW1wdHkgXCIgKyBvcE9wZXJhdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNjcmVlblJhbmdlLmlzTXVsdGlMaW5lKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXJrZXJMYXllci5kcmF3VGV4dE1hcmtlcihodG1sLCBzY3JlZW5SYW5nZSwgXCJhY2VfZGlmZiBcIiArIGNzc0NsYXNzLCBjb25maWcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VyTGF5ZXIuZHJhd1NpbmdsZUxpbmVNYXJrZXIoaHRtbCwgc2NyZWVuUmFuZ2UsIFwiYWNlX2RpZmYgXCIgKyBjc3NDbGFzcywgY29uZmlnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5jbGFzcyBTeW5jU2VsZWN0aW9uTWFya2VyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgLyoqQHR5cGV7bnVtYmVyfSovdGhpcy5pZDtcbiAgICAgICAgdGhpcy50eXBlID0gXCJmdWxsTGluZVwiO1xuICAgICAgICB0aGlzLmNsYXp6ID0gXCJhY2VfZGlmZi1hY3RpdmUtbGluZVwiO1xuICAgIH1cblxuICAgIHVwZGF0ZShodG1sLCBtYXJrZXJMYXllciwgc2Vzc2lvbiwgY29uZmlnKSB7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtSYW5nZX0gcmFuZ2VcbiAgICAgKi9cbiAgICBzZXRSYW5nZShyYW5nZSkgey8vVE9ET1xuICAgICAgICB2YXIgbmV3UmFuZ2UgPSByYW5nZS5jbG9uZSgpO1xuICAgICAgICBuZXdSYW5nZS5lbmQuY29sdW1uKys7XG5cbiAgICAgICAgdGhpcy5yYW5nZSA9IG5ld1JhbmdlO1xuICAgIH1cbn1cblxuZXhwb3J0cy5EaWZmQ2h1bmsgPSBEaWZmQ2h1bms7XG5leHBvcnRzLkRpZmZIaWdobGlnaHQgPSBEaWZmSGlnaGxpZ2h0OyIsInZhciBkb20gPSByZXF1aXJlKFwiLi4vLi4vbGliL2RvbVwiKTtcblxuY2xhc3MgTWluaW1hbEd1dHRlckRpZmZEZWNvcmF0b3Ige1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7aW1wb3J0KFwiLi4vLi4vZWRpdG9yXCIpLkVkaXRvcn0gZWRpdG9yXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHR5cGVcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihlZGl0b3IsIHR5cGUpIHtcbiAgICAgICAgdGhpcy5ndXR0ZXJDbGFzcyA9XCJhY2VfbWluaS1kaWZmX2d1dHRlci1lbmFibGVkXCI7XG4gICAgICAgIHRoaXMuZ3V0dGVyQ2VsbHNDbGFzc2VzID0ge1xuICAgICAgICAgICAgYWRkOiBcIm1pbmktZGlmZi1hZGRlZFwiLFxuICAgICAgICAgICAgZGVsZXRlOiBcIm1pbmktZGlmZi1kZWxldGVkXCIsXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5lZGl0b3IgPSBlZGl0b3I7XG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgICAgIHRoaXMuY2h1bmtzID0gW107XG4gICAgICAgIHRoaXMuYXR0YWNoVG9FZGl0b3IoKTtcbiAgICB9XG5cbiAgICBhdHRhY2hUb0VkaXRvcigpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJHdXR0ZXJzID0gdGhpcy5yZW5kZXJHdXR0ZXJzLmJpbmQodGhpcyk7XG5cbiAgICAgICAgZG9tLmFkZENzc0NsYXNzKFxuICAgICAgICAgICAgdGhpcy5lZGl0b3IucmVuZGVyZXIuJGd1dHRlckxheWVyLmVsZW1lbnQsXG4gICAgICAgICAgICB0aGlzLmd1dHRlckNsYXNzXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuZWRpdG9yLnJlbmRlcmVyLiRndXR0ZXJMYXllci5vbihcbiAgICAgICAgICAgIFwiYWZ0ZXJSZW5kZXJcIixcbiAgICAgICAgICAgIHRoaXMucmVuZGVyR3V0dGVyc1xuICAgICAgICApO1xuICAgIH1cblxuICAgIHJlbmRlckd1dHRlcnMoZSwgZ3V0dGVyTGF5ZXIpIHtcbiAgICAgICAgY29uc3QgY2VsbHMgPSB0aGlzLmVkaXRvci5yZW5kZXJlci4kZ3V0dGVyTGF5ZXIuJGxpbmVzLmNlbGxzO1xuICAgICAgICBjZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgICAgICAgICBjZWxsLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShPYmplY3QudmFsdWVzKHRoaXMuZ3V0dGVyQ2VsbHNDbGFzc2VzKSk7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBkaXIgPSB0aGlzLnR5cGUgPT09IC0xID8gXCJvbGRcIiA6IFwibmV3XCI7XG4gICAgICAgIGNvbnN0IGRpZmZDbGFzcyA9IHRoaXMudHlwZSA9PT0gLTEgPyB0aGlzLmd1dHRlckNlbGxzQ2xhc3Nlcy5kZWxldGUgOiB0aGlzLmd1dHRlckNlbGxzQ2xhc3Nlcy5hZGQ7XG4gICAgICAgIHRoaXMuY2h1bmtzLmZvckVhY2goKGxpbmVDaGFuZ2UpID0+IHtcbiAgICAgICAgICAgIGxldCBzdGFydFJvdyA9IGxpbmVDaGFuZ2VbZGlyXS5zdGFydC5yb3c7XG4gICAgICAgICAgICBsZXQgZW5kUm93ID0gbGluZUNoYW5nZVtkaXJdLmVuZC5yb3cgLSAxO1xuXG4gICAgICAgICAgICBjZWxscy5mb3JFYWNoKChjZWxsKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGNlbGwucm93ID49IHN0YXJ0Um93ICYmIGNlbGwucm93IDw9IGVuZFJvdykge1xuICAgICAgICAgICAgICAgICAgICBjZWxsLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChkaWZmQ2xhc3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzZXREZWNvcmF0aW9ucyhjaGFuZ2VzKSB7XG4gICAgICAgIHRoaXMuY2h1bmtzID0gY2hhbmdlcztcbiAgICAgICAgdGhpcy5yZW5kZXJHdXR0ZXJzKCk7XG4gICAgfVxuXG4gICAgZGlzcG9zZSgpIHtcbiAgICAgICAgZG9tLnJlbW92ZUNzc0NsYXNzKFxuICAgICAgICAgICAgdGhpcy5lZGl0b3IucmVuZGVyZXIuJGd1dHRlckxheWVyLmVsZW1lbnQsXG4gICAgICAgICAgICB0aGlzLmd1dHRlckNsYXNzXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuZWRpdG9yLnJlbmRlcmVyLiRndXR0ZXJMYXllci5vZmYoXG4gICAgICAgICAgICBcImFmdGVyUmVuZGVyXCIsXG4gICAgICAgICAgICB0aGlzLnJlbmRlckd1dHRlcnNcbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmV4cG9ydHMuTWluaW1hbEd1dHRlckRpZmZEZWNvcmF0b3IgPSBNaW5pbWFsR3V0dGVyRGlmZkRlY29yYXRvcjtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5cbmNvbnN0IEJhc2VEaWZmVmlldyA9IHJlcXVpcmUoXCIuL2Jhc2VfZGlmZl92aWV3XCIpLkJhc2VEaWZmVmlldztcbmNvbnN0IFJlbmRlcmVyID0gcmVxdWlyZShcIi4uLy4uL3ZpcnR1YWxfcmVuZGVyZXJcIikuVmlydHVhbFJlbmRlcmVyO1xuY29uc3QgY29uZmlnID0gcmVxdWlyZShcIi4uLy4uL2NvbmZpZ1wiKTtcblxuY2xhc3MgSW5saW5lRGlmZlZpZXcgZXh0ZW5kcyBCYXNlRGlmZlZpZXcge1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdHMgYSBuZXcgaW5saW5lIERpZmZWaWV3IGluc3RhbmNlLlxuICAgICAqIEBwYXJhbSB7aW1wb3J0KFwiLi4vZGlmZlwiKS5EaWZmTW9kZWx9IFtkaWZmTW9kZWxdIC0gVGhlIG1vZGVsIGZvciB0aGUgZGlmZiB2aWV3LlxuICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IFtjb250YWluZXJdIC0gb3B0aW9uYWwgY29udGFpbmVyIGVsZW1lbnQgZm9yIHRoZSBEaWZmVmlldy5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihkaWZmTW9kZWwsIGNvbnRhaW5lcikge1xuICAgICAgICBkaWZmTW9kZWwgPSBkaWZmTW9kZWwgfHwge307XG4gICAgICAgIGRpZmZNb2RlbC5pbmxpbmUgPSBkaWZmTW9kZWwuaW5saW5lIHx8IFwiYVwiO1xuICAgICAgICBzdXBlciggdHJ1ZSwgY29udGFpbmVyKTtcbiAgICAgICAgdGhpcy5pbml0KGRpZmZNb2RlbCk7XG4gICAgfVxuXG4gICAgaW5pdChkaWZmTW9kZWwpIHtcbiAgICAgICAgdGhpcy5vblNlbGVjdCA9IHRoaXMub25TZWxlY3QuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vbkFmdGVyUmVuZGVyID0gdGhpcy5vbkFmdGVyUmVuZGVyLmJpbmQodGhpcyk7XG4gICAgICAgIFxuXG4gICAgICAgIHRoaXMuJHNldHVwTW9kZWxzKGRpZmZNb2RlbCk7XG4gICAgICAgIHRoaXMub25DaGFuZ2VUaGVtZSgpO1xuICAgICAgICBjb25maWcucmVzZXRPcHRpb25zKHRoaXMpO1xuICAgICAgICBjb25maWdbXCJfc2lnbmFsXCJdKFwiZGlmZlZpZXdcIiwgdGhpcyk7XG5cbiAgICAgICAgdmFyIHBhZGRpbmcgPSB0aGlzLmFjdGl2ZUVkaXRvci5yZW5kZXJlci4kcGFkZGluZztcblxuICAgICAgICB0aGlzLmFkZEd1dHRlckRlY29yYXRvcnMoKTtcblxuICAgICAgICB0aGlzLm90aGVyRWRpdG9yLnJlbmRlcmVyLnNldFBhZGRpbmcocGFkZGluZyk7XG4gICAgICAgIHRoaXMudGV4dExheWVyID0gdGhpcy5vdGhlckVkaXRvci5yZW5kZXJlci4kdGV4dExheWVyO1xuICAgICAgICB0aGlzLm1hcmtlckxheWVyID0gdGhpcy5vdGhlckVkaXRvci5yZW5kZXJlci4kbWFya2VyQmFjaztcbiAgICAgICAgdGhpcy5ndXR0ZXJMYXllciA9IHRoaXMub3RoZXJFZGl0b3IucmVuZGVyZXIuJGd1dHRlckxheWVyO1xuICAgICAgICB0aGlzLmN1cnNvckxheWVyID0gdGhpcy5vdGhlckVkaXRvci5yZW5kZXJlci4kY3Vyc29yTGF5ZXI7XG5cbiAgICAgICAgdGhpcy5vdGhlckVkaXRvci5yZW5kZXJlci4kdXBkYXRlQ2FjaGVkU2l6ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciB0ZXh0TGF5ZXJFbGVtZW50ID0gdGhpcy5hY3RpdmVFZGl0b3IucmVuZGVyZXIuJHRleHRMYXllci5lbGVtZW50O1xuICAgICAgICB0ZXh0TGF5ZXJFbGVtZW50LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKFxuICAgICAgICAgICAgdGhpcy50ZXh0TGF5ZXIuZWxlbWVudCxcbiAgICAgICAgICAgIHRleHRMYXllckVsZW1lbnRcbiAgICAgICAgKTtcblxuICAgICAgICB2YXIgbWFya2VyTGF5ZXJFbGVtZW50ID0gdGhpcy5hY3RpdmVFZGl0b3IucmVuZGVyZXIuJG1hcmtlckJhY2suZWxlbWVudDtcbiAgICAgICAgbWFya2VyTGF5ZXJFbGVtZW50LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKFxuICAgICAgICAgICAgdGhpcy5tYXJrZXJMYXllci5lbGVtZW50LFxuICAgICAgICAgICAgbWFya2VyTGF5ZXJFbGVtZW50Lm5leHRTaWJsaW5nXG4gICAgICAgICk7XG5cbiAgICAgICAgdmFyIGd1dHRlckxheWVyRWxlbWVudCA9IHRoaXMuYWN0aXZlRWRpdG9yLnJlbmRlcmVyLiRndXR0ZXJMYXllci5lbGVtZW50O1xuICAgICAgICBndXR0ZXJMYXllckVsZW1lbnQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoXG4gICAgICAgICAgICB0aGlzLmd1dHRlckxheWVyLmVsZW1lbnQsXG4gICAgICAgICAgICBndXR0ZXJMYXllckVsZW1lbnQubmV4dFNpYmxpbmdcbiAgICAgICAgKTtcbiAgICAgICAgZ3V0dGVyTGF5ZXJFbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICAgICAgICB0aGlzLmd1dHRlckxheWVyLmVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG4gICAgICAgIHRoaXMuZ3V0dGVyTGF5ZXIuZWxlbWVudC5zdHlsZS53aWR0aCA9IFwiMTAwJVwiO1xuICAgICAgICB0aGlzLmd1dHRlckxheWVyLmVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImFjZV9taW5pLWRpZmZfZ3V0dGVyX290aGVyXCIpO1xuICAgICAgICBcblxuICAgICAgICB0aGlzLmd1dHRlckxheWVyLiR1cGRhdGVHdXR0ZXJXaWR0aCA9IGZ1bmN0aW9uKCkge307XG4gICAgICAgIHRoaXMuaW5pdE1vdXNlKCk7XG4gICAgICAgIHRoaXMuaW5pdFRleHRJbnB1dCgpO1xuICAgICAgICB0aGlzLmluaXRUZXh0TGF5ZXIoKTtcbiAgICAgICAgdGhpcy5pbml0UmVuZGVyZXIoKTtcblxuICAgICAgICB0aGlzLiRhdHRhY2hFdmVudEhhbmRsZXJzKCk7XG4gICAgICAgIHRoaXMuc2VsZWN0RWRpdG9yKHRoaXMuYWN0aXZlRWRpdG9yKTtcbiAgICB9XG5cbiAgICBpbml0UmVuZGVyZXIocmVzdG9yZSkge1xuICAgICAgICBpZiAocmVzdG9yZSkge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuYWN0aXZlRWRpdG9yLnJlbmRlcmVyLiRnZXRMb25nZXN0TGluZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZWRpdG9yQS5yZW5kZXJlci4kZ2V0TG9uZ2VzdExpbmUgPVxuICAgICAgICAgICAgdGhpcy5lZGl0b3JCLnJlbmRlcmVyLiRnZXRMb25nZXN0TGluZSA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgZ2V0TG9uZ2VzdExpbmUgPSBSZW5kZXJlci5wcm90b3R5cGUuJGdldExvbmdlc3RMaW5lO1xuICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLm1heChcbiAgICAgICAgICAgICAgICAgICAgZ2V0TG9uZ2VzdExpbmUuY2FsbCh0aGlzLmVkaXRvckEucmVuZGVyZXIpLFxuICAgICAgICAgICAgICAgICAgICBnZXRMb25nZXN0TGluZS5jYWxsKHRoaXMuZWRpdG9yQi5yZW5kZXJlcilcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluaXRUZXh0TGF5ZXIoKSB7XG4gICAgICAgIHZhciByZW5kZXJMaW5lID0gdGhpcy50ZXh0TGF5ZXIuJHJlbmRlckxpbmU7XG4gICAgICAgIHZhciBkaWZmVmlldyA9IHRoaXM7XG4gICAgICAgIHRoaXMub3RoZXJFZGl0b3IucmVuZGVyZXIuJHRleHRMYXllci4kcmVuZGVyTGluZSA9IGZ1bmN0aW9uKHBhcmVudCwgcm93LCBmb2xkTEluZSkge1xuICAgICAgICAgICAgaWYgKGlzVmlzaWJsZVJvdyhkaWZmVmlldy5jaHVua3MsIHJvdykpIHtcbiAgICAgICAgICAgICAgICByZW5kZXJMaW5lLmNhbGwodGhpcywgcGFyZW50LCByb3csIGZvbGRMSW5lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHNpZGUgPSB0aGlzLnNob3dTaWRlQSA/IFwibmV3XCIgOiBcIm9sZFwiO1xuICAgICAgICBmdW5jdGlvbiBpc1Zpc2libGVSb3coY2h1bmtzLCByb3cpIHtcbiAgICAgICAgICAgIHZhciBtaW4gPSAwO1xuICAgICAgICAgICAgdmFyIG1heCA9IGNodW5rcy5sZW5ndGggLSAxO1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IC0xO1xuICAgICAgICAgICAgd2hpbGUgKG1pbiA8IG1heCkge1xuICAgICAgICAgICAgICAgIHZhciBtaWQgPSBNYXRoLmZsb29yKChtaW4gKyBtYXgpIC8gMik7XG4gICAgICAgICAgICAgICAgdmFyIGNodW5rU3RhcnQgPSBjaHVua3NbbWlkXVtzaWRlXS5zdGFydC5yb3c7XG4gICAgICAgICAgICAgICAgaWYgKGNodW5rU3RhcnQgPCByb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gbWlkO1xuICAgICAgICAgICAgICAgICAgICBtaW4gPSBtaWQgKyAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY2h1bmtTdGFydCA+IHJvdykge1xuICAgICAgICAgICAgICAgICAgICBtYXggPSBtaWQgLSAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IG1pZDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNodW5rc1tyZXN1bHQgKyAxXSAmJiBjaHVua3NbcmVzdWx0ICsgMV1bc2lkZV0uc3RhcnQucm93IDw9IHJvdykge1xuICAgICAgICAgICAgICAgIHJlc3VsdCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHJhbmdlID0gY2h1bmtzW3Jlc3VsdF0gJiYgY2h1bmtzW3Jlc3VsdF1bc2lkZV07XG4gICAgICAgICAgICBpZiAocmFuZ2UgJiYgcmFuZ2UuZW5kLnJvdyA+IHJvdykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5pdFRleHRJbnB1dChyZXN0b3JlKSB7XG4gICAgICAgIGlmIChyZXN0b3JlKSB7XG4gICAgICAgICAgICB0aGlzLm90aGVyRWRpdG9yLnRleHRJbnB1dCA9IHRoaXMub3RoZXJ0ZXh0SW5wdXQ7XG4gICAgICAgICAgICB0aGlzLm90aGVyRWRpdG9yLmNvbnRhaW5lciA9IHRoaXMub3RoZXJFZGl0b3JDb250YWluZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm90aGVydGV4dElucHV0ID0gdGhpcy5vdGhlckVkaXRvci50ZXh0SW5wdXQ7XG4gICAgICAgICAgICB0aGlzLm90aGVyRWRpdG9yLnRleHRJbnB1dCA9IHRoaXMuYWN0aXZlRWRpdG9yLnRleHRJbnB1dDtcbiAgICAgICAgICAgIHRoaXMub3RoZXJFZGl0b3JDb250YWluZXIgPSB0aGlzLm90aGVyRWRpdG9yLmNvbnRhaW5lcjtcbiAgICAgICAgICAgIHRoaXMub3RoZXJFZGl0b3IuY29udGFpbmVyID0gdGhpcy5hY3RpdmVFZGl0b3IuY29udGFpbmVyO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VsZWN0RWRpdG9yKGVkaXRvcikge1xuICAgICAgICBpZiAoZWRpdG9yID09IHRoaXMuYWN0aXZlRWRpdG9yKSB7XG4gICAgICAgICAgICB0aGlzLm90aGVyRWRpdG9yLnNlbGVjdGlvbi5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVFZGl0b3IudGV4dElucHV0LnNldEhvc3QodGhpcy5hY3RpdmVFZGl0b3IpO1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVFZGl0b3Iuc2V0U3R5bGUoXCJhY2VfZGlmZl9vdGhlclwiLCBmYWxzZSk7XG4gICAgICAgICAgICB0aGlzLmN1cnNvckxheWVyLmVsZW1lbnQucmVtb3ZlKCk7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZUVkaXRvci5yZW5kZXJlci4kY3Vyc29yTGF5ZXIuZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2hvd1NpZGVBKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXNzaW9uQS5yZW1vdmVNYXJrZXIodGhpcy5zeW5jU2VsZWN0aW9uTWFya2VyQS5pZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXNzaW9uQS5hZGREeW5hbWljTWFya2VyKHRoaXMuc3luY1NlbGVjdGlvbk1hcmtlckEsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5tYXJrZXJMYXllci5lbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJhY2VfaGlkZGVuX21hcmtlci1sYXllclwiKTtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlRWRpdG9yLnJlbmRlcmVyLiRtYXJrZXJCYWNrLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImFjZV9oaWRkZW5fbWFya2VyLWxheWVyXCIpO1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVCcmFja2V0SGlnaGxpZ2h0KHRoaXMub3RoZXJFZGl0b3IpOyBcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlRWRpdG9yLnNlbGVjdGlvbi5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVFZGl0b3IudGV4dElucHV0LnNldEhvc3QodGhpcy5vdGhlckVkaXRvcik7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZUVkaXRvci5zZXRTdHlsZShcImFjZV9kaWZmX290aGVyXCIpO1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVFZGl0b3IucmVuZGVyZXIuJGN1cnNvckxheWVyLmVsZW1lbnQucGFyZW50Tm9kZS5hcHBlbmRDaGlsZChcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnNvckxheWVyLmVsZW1lbnRcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZUVkaXRvci5yZW5kZXJlci4kY3Vyc29yTGF5ZXIuZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICBpZiAodGhpcy5hY3RpdmVFZGl0b3IuJGlzRm9jdXNlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMub3RoZXJFZGl0b3Iub25Gb2N1cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuc2hvd1NpZGVBKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXNzaW9uQS5yZW1vdmVNYXJrZXIodGhpcy5zeW5jU2VsZWN0aW9uTWFya2VyQS5pZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm1hcmtlckxheWVyLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImFjZV9oaWRkZW5fbWFya2VyLWxheWVyXCIpO1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVFZGl0b3IucmVuZGVyZXIuJG1hcmtlckJhY2suZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiYWNlX2hpZGRlbl9tYXJrZXItbGF5ZXJcIik7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUJyYWNrZXRIaWdobGlnaHQodGhpcy5hY3RpdmVFZGl0b3IpOyBcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbW92ZUJyYWNrZXRIaWdobGlnaHQoZWRpdG9yKSB7XG4gICAgICAgIHZhciBzZXNzaW9uID0gZWRpdG9yLnNlc3Npb247XG4gICAgICAgIGlmIChzZXNzaW9uLiRicmFja2V0SGlnaGxpZ2h0KSB7XG4gICAgICAgICAgICBzZXNzaW9uLiRicmFja2V0SGlnaGxpZ2h0Lm1hcmtlcklkcy5mb3JFYWNoKGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgICAgICAgICAgc2Vzc2lvbi5yZW1vdmVNYXJrZXIoaWQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzZXNzaW9uLiRicmFja2V0SGlnaGxpZ2h0ID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluaXRNb3VzZSgpIHtcbiAgICAgICAgdGhpcy5vdGhlckVkaXRvci5yZW5kZXJlci4kbG9vcCA9IHRoaXMuYWN0aXZlRWRpdG9yLnJlbmRlcmVyLiRsb29wO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5vdGhlckVkaXRvci5yZW5kZXJlci5zY3JvbGxlciA9IHtcbiAgICAgICAgICAgIGdldEJvdW5kaW5nQ2xpZW50UmVjdDogKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmFjdGl2ZUVkaXRvci5yZW5kZXJlci5zY3JvbGxlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdHlsZTogdGhpcy5hY3RpdmVFZGl0b3IucmVuZGVyZXIuc2Nyb2xsZXIuc3R5bGUsXG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICB2YXIgZm9yd2FyZEV2ZW50ID0gKGV2KSA9PiB7XG4gICAgICAgICAgICBpZiAoIWV2LmRvbUV2ZW50KSByZXR1cm47IFxuICAgICAgICAgICAgdmFyIHNjcmVlblBvcyA9IGV2LmVkaXRvci5yZW5kZXJlci5waXhlbFRvU2NyZWVuQ29vcmRpbmF0ZXMoZXYuY2xpZW50WCwgZXYuY2xpZW50WSk7XG4gICAgICAgICAgICB2YXIgc2Vzc2lvbkEgPSB0aGlzLmFjdGl2ZUVkaXRvci5zZXNzaW9uO1xuICAgICAgICAgICAgdmFyIHNlc3Npb25CID0gdGhpcy5vdGhlckVkaXRvci5zZXNzaW9uO1xuICAgICAgICAgICAgdmFyIHBvc0EgPSBzZXNzaW9uQS5zY3JlZW5Ub0RvY3VtZW50UG9zaXRpb24oc2NyZWVuUG9zLnJvdywgc2NyZWVuUG9zLmNvbHVtbiwgc2NyZWVuUG9zLm9mZnNldFgpOyBcbiAgICAgICAgICAgIHZhciBwb3NCID0gc2Vzc2lvbkIuc2NyZWVuVG9Eb2N1bWVudFBvc2l0aW9uKHNjcmVlblBvcy5yb3csIHNjcmVlblBvcy5jb2x1bW4sIHNjcmVlblBvcy5vZmZzZXRYKTsgXG4gICAgICAgIFxuICAgICAgICAgICAgdmFyIHBvc0F4ID0gc2Vzc2lvbkEuZG9jdW1lbnRUb1NjcmVlblBvc2l0aW9uKHBvc0EpOyBcbiAgICAgICAgICAgIHZhciBwb3NCeCA9IHNlc3Npb25CLmRvY3VtZW50VG9TY3JlZW5Qb3NpdGlvbihwb3NCKTsgXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChldi5lZGl0b3IgPT0gdGhpcy5hY3RpdmVFZGl0b3IpIHtcbiAgICAgICAgICAgICAgICBpZiAocG9zQngucm93ID09IHNjcmVlblBvcy5yb3cgJiYgcG9zQXgucm93ICE9IHNjcmVlblBvcy5yb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV2LnR5cGUgPT0gXCJtb3VzZWRvd25cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RFZGl0b3IodGhpcy5vdGhlckVkaXRvcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZXYucHJvcGFnYXRpb25TdG9wcGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgZXYuZGVmYXVsdFByZXZlbnRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3RoZXJFZGl0b3IuJG1vdXNlSGFuZGxlci5vbk1vdXNlRXZlbnQoZXYudHlwZSwgZXYuZG9tRXZlbnQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZXYudHlwZSA9PSBcIm1vdXNlZG93blwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0RWRpdG9yKHRoaXMuYWN0aXZlRWRpdG9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgdmFyIGV2ZW50cyA9IFtcbiAgICAgICAgICAgIFwibW91c2Vkb3duXCIsXG4gICAgICAgICAgICBcImNsaWNrXCIsXG4gICAgICAgICAgICBcIm1vdXNldXBcIixcbiAgICAgICAgICAgIFwiZGJsY2xpY2tcIixcbiAgICAgICAgICAgIFwidHJpcGxlY2xpY2tcIixcbiAgICAgICAgICAgIFwicXVhZGNsaWNrXCIsXG4gICAgICAgIF07XG4gICAgICAgIGV2ZW50cy5mb3JFYWNoKChldmVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVFZGl0b3Iub24oZXZlbnQsIGZvcndhcmRFdmVudCwgdHJ1ZSk7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZUVkaXRvci5vbihcImd1dHRlclwiICsgZXZlbnQsIGZvcndhcmRFdmVudCwgdHJ1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBvbkZvY3VzID0gKGUpID0+IHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlRWRpdG9yLm9uRm9jdXMoZSk7XG4gICAgICAgIH07XG4gICAgICAgIHZhciBvbkJsdXIgPSAoZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVFZGl0b3Iub25CbHVyKGUpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLm90aGVyRWRpdG9yLm9uKFwiZm9jdXNcIiwgb25Gb2N1cyk7XG4gICAgICAgIHRoaXMub3RoZXJFZGl0b3Iub24oXCJibHVyXCIsIG9uQmx1cik7XG5cbiAgICAgICAgdGhpcy5vbk1vdXNlRGV0YWNoID0gKCkgPT4ge1xuICAgICAgICAgICAgZXZlbnRzLmZvckVhY2goKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmVFZGl0b3Iub2ZmKGV2ZW50LCBmb3J3YXJkRXZlbnQsIHRydWUpO1xuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlRWRpdG9yLm9mZihcImd1dHRlclwiICsgZXZlbnQsIGZvcndhcmRFdmVudCwgdHJ1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMub3RoZXJFZGl0b3Iub2ZmKFwiZm9jdXNcIiwgb25Gb2N1cyk7XG4gICAgICAgICAgICB0aGlzLm90aGVyRWRpdG9yLm9mZihcImJsdXJcIiwgb25CbHVyKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBhbGlnbigpIHtcbiAgICAgICAgdmFyIGRpZmZWaWV3ID0gdGhpcztcblxuICAgICAgICB0aGlzLiRpbml0V2lkZ2V0cyhkaWZmVmlldy5lZGl0b3JBKTtcbiAgICAgICAgdGhpcy4kaW5pdFdpZGdldHMoZGlmZlZpZXcuZWRpdG9yQik7XG5cbiAgICAgICAgZGlmZlZpZXcuY2h1bmtzLmZvckVhY2goZnVuY3Rpb24gKGNoKSB7XG4gICAgICAgICAgICB2YXIgZGlmZjEgPSBkaWZmVmlldy4kc2NyZWVuUm93KGNoLm9sZC5lbmQsIGRpZmZWaWV3LnNlc3Npb25BKVxuICAgICAgICAgICAgICAgIC0gZGlmZlZpZXcuJHNjcmVlblJvdyhjaC5vbGQuc3RhcnQsIGRpZmZWaWV3LnNlc3Npb25BKTtcbiAgICAgICAgICAgIHZhciBkaWZmMiA9IGRpZmZWaWV3LiRzY3JlZW5Sb3coY2gubmV3LmVuZCwgZGlmZlZpZXcuc2Vzc2lvbkIpXG4gICAgICAgICAgICAgICAgLSBkaWZmVmlldy4kc2NyZWVuUm93KGNoLm5ldy5zdGFydCwgZGlmZlZpZXcuc2Vzc2lvbkIpO1xuXG4gICAgICAgICAgICBkaWZmVmlldy4kYWRkV2lkZ2V0KGRpZmZWaWV3LnNlc3Npb25BLCB7XG4gICAgICAgICAgICAgICAgcm93Q291bnQ6IGRpZmYyLFxuICAgICAgICAgICAgICAgIHJvd3NBYm92ZTogY2gub2xkLmVuZC5yb3cgPT09IDAgPyBkaWZmMiA6IDAsXG4gICAgICAgICAgICAgICAgcm93OiBjaC5vbGQuZW5kLnJvdyA9PT0gMCA/IDAgOiBjaC5vbGQuZW5kLnJvdyAtIDFcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZGlmZlZpZXcuJGFkZFdpZGdldChkaWZmVmlldy5zZXNzaW9uQiwge1xuICAgICAgICAgICAgICAgIHJvd0NvdW50OiBkaWZmMSxcbiAgICAgICAgICAgICAgICByb3dzQWJvdmU6IGRpZmYxLFxuICAgICAgICAgICAgICAgIHJvdzogY2gubmV3LnN0YXJ0LnJvdyxcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0pO1xuICAgICAgICBkaWZmVmlldy5zZXNzaW9uQVtcIl9lbWl0XCJdKFwiY2hhbmdlRm9sZFwiLCB7ZGF0YToge3N0YXJ0OiB7cm93OiAwfX19KTtcbiAgICAgICAgZGlmZlZpZXcuc2Vzc2lvbkJbXCJfZW1pdFwiXShcImNoYW5nZUZvbGRcIiwge2RhdGE6IHtzdGFydDoge3JvdzogMH19fSk7XG4gICAgfVxuXG4gICAgb25DaGFuZ2VXcmFwTGltaXQoZSwgc2Vzc2lvbikge1xuICAgICAgICB0aGlzLm90aGVyU2Vzc2lvbi5zZXRPcHRpb24oXCJ3cmFwXCIsIHNlc3Npb24uZ2V0T3B0aW9uKFwid3JhcFwiKSk7XG4gICAgICAgIHRoaXMub3RoZXJTZXNzaW9uLmFkanVzdFdyYXBMaW1pdChzZXNzaW9uLiR3cmFwTGltaXQpO1xuICAgICAgICB0aGlzLnNjaGVkdWxlUmVhbGlnbigpO1xuICAgICAgICAvLyB0b2RvLCB0aGlzIGlzIG5lZWRlZCBiZWNhdXNlIGVkaXRvci5vbkNoYW5nZVdyYXBNb2RlXG4gICAgICAgIC8vIGNhbGxzIHJlc2l6ZSh0cnVlKSBpbnN0ZWFkIG9mIHdhaXRpbmcgZm9yIHRoZSByZW5kZXJsb29wXG4gICAgICAgIHRoaXMuYWN0aXZlRWRpdG9yLnJlbmRlcmVyLnVwZGF0ZUZ1bGwoKTtcbiAgICB9XG5cbiAgICAkYXR0YWNoU2Vzc2lvbnNFdmVudEhhbmRsZXJzKCkge1xuICAgICAgICB0aGlzLiRhdHRhY2hTZXNzaW9uRXZlbnRIYW5kbGVycyh0aGlzLmVkaXRvckEsIHRoaXMubWFya2VyQSk7XG4gICAgICAgIHRoaXMuJGF0dGFjaFNlc3Npb25FdmVudEhhbmRsZXJzKHRoaXMuZWRpdG9yQiwgdGhpcy5tYXJrZXJCKTtcbiAgICAgICAgdmFyIHNlc3Npb24gPSB0aGlzLmFjdGl2ZUVkaXRvci5zZXNzaW9uO1xuICAgICAgICBzZXNzaW9uLm9uKFwiY2hhbmdlV3JhcExpbWl0XCIsIHRoaXMub25DaGFuZ2VXcmFwTGltaXQpO1xuICAgICAgICBzZXNzaW9uLm9uKFwiY2hhbmdlV3JhcE1vZGVcIiwgdGhpcy5vbkNoYW5nZVdyYXBMaW1pdCk7XG4gICAgfVxuXG4gICAgJGF0dGFjaFNlc3Npb25FdmVudEhhbmRsZXJzKGVkaXRvciwgbWFya2VyKSB7XG4gICAgICAgIGVkaXRvci5zZXNzaW9uLm9uKFwiY2hhbmdlRm9sZFwiLCB0aGlzLm9uQ2hhbmdlRm9sZCk7XG4gICAgICAgIGVkaXRvci5zZXNzaW9uLmFkZER5bmFtaWNNYXJrZXIobWFya2VyKTtcbiAgICAgICAgZWRpdG9yLnNlbGVjdGlvbi5vbihcImNoYW5nZUN1cnNvclwiLCB0aGlzLm9uU2VsZWN0KTtcbiAgICAgICAgZWRpdG9yLnNlbGVjdGlvbi5vbihcImNoYW5nZVNlbGVjdGlvblwiLCB0aGlzLm9uU2VsZWN0KTtcbiAgICB9XG5cbiAgICAkZGV0YWNoU2Vzc2lvbnNFdmVudEhhbmRsZXJzKCkge1xuICAgICAgICB0aGlzLiRkZXRhY2hTZXNzaW9uSGFuZGxlcnModGhpcy5lZGl0b3JBLCB0aGlzLm1hcmtlckEpO1xuICAgICAgICB0aGlzLiRkZXRhY2hTZXNzaW9uSGFuZGxlcnModGhpcy5lZGl0b3JCLCB0aGlzLm1hcmtlckIpO1xuICAgICAgICB0aGlzLm90aGVyU2Vzc2lvbi5iZ1Rva2VuaXplci5saW5lcy5maWxsKHVuZGVmaW5lZCk7XG4gICAgICAgIHZhciBzZXNzaW9uID0gdGhpcy5hY3RpdmVFZGl0b3Iuc2Vzc2lvbjtcbiAgICAgICAgc2Vzc2lvbi5vZmYoXCJjaGFuZ2VXcmFwTGltaXRcIiwgdGhpcy5vbkNoYW5nZVdyYXBMaW1pdCk7XG4gICAgICAgIHNlc3Npb24ub2ZmKFwiY2hhbmdlV3JhcE1vZGVcIiwgdGhpcy5vbkNoYW5nZVdyYXBMaW1pdCk7XG4gICAgfVxuXG4gICAgJGRldGFjaFNlc3Npb25IYW5kbGVycyhlZGl0b3IsIG1hcmtlcikge1xuICAgICAgICBlZGl0b3Iuc2Vzc2lvbi5yZW1vdmVNYXJrZXIobWFya2VyLmlkKTtcbiAgICAgICAgZWRpdG9yLnNlbGVjdGlvbi5vZmYoXCJjaGFuZ2VDdXJzb3JcIiwgdGhpcy5vblNlbGVjdCk7XG4gICAgICAgIGVkaXRvci5zZWxlY3Rpb24ub2ZmKFwiY2hhbmdlU2VsZWN0aW9uXCIsIHRoaXMub25TZWxlY3QpO1xuICAgICAgICBlZGl0b3Iuc2Vzc2lvbi5vZmYoXCJjaGFuZ2VGb2xkXCIsIHRoaXMub25DaGFuZ2VGb2xkKTtcbiAgICB9XG5cbiAgICAkYXR0YWNoRXZlbnRIYW5kbGVycygpIHtcbiAgICAgICAgdGhpcy5hY3RpdmVFZGl0b3Iub24oXCJpbnB1dFwiLCB0aGlzLm9uSW5wdXQpO1xuICAgICAgICB0aGlzLmFjdGl2ZUVkaXRvci5yZW5kZXJlci5vbihcImFmdGVyUmVuZGVyXCIsIHRoaXMub25BZnRlclJlbmRlcik7XG4gICAgICAgIHRoaXMub3RoZXJTZXNzaW9uLm9uKFwiY2hhbmdlXCIsIHRoaXMub25JbnB1dCk7XG4gICAgfVxuXG4gICAgJGRldGFjaEV2ZW50SGFuZGxlcnMoKSB7XG4gICAgICAgIHRoaXMuJGRldGFjaFNlc3Npb25zRXZlbnRIYW5kbGVycygpO1xuICAgICAgICB0aGlzLmFjdGl2ZUVkaXRvci5vZmYoXCJpbnB1dFwiLCB0aGlzLm9uSW5wdXQpO1xuICAgICAgICB0aGlzLmFjdGl2ZUVkaXRvci5yZW5kZXJlci5vZmYoXCJhZnRlclJlbmRlclwiLCB0aGlzLm9uQWZ0ZXJSZW5kZXIpO1xuICAgICAgICB0aGlzLm90aGVyU2Vzc2lvbi5vZmYoXCJjaGFuZ2VcIiwgdGhpcy5vbklucHV0KTtcblxuICAgICAgICB0aGlzLnRleHRMYXllci5lbGVtZW50LnRleHRDb250ZW50ID0gXCJcIjtcbiAgICAgICAgdGhpcy50ZXh0TGF5ZXIuZWxlbWVudC5yZW1vdmUoKTtcbiAgICAgICAgdGhpcy5ndXR0ZXJMYXllci5lbGVtZW50LnRleHRDb250ZW50ID0gXCJcIjtcbiAgICAgICAgdGhpcy5ndXR0ZXJMYXllci5lbGVtZW50LnJlbW92ZSgpO1xuICAgICAgICB0aGlzLm1hcmtlckxheWVyLmVsZW1lbnQudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgICAgICB0aGlzLm1hcmtlckxheWVyLmVsZW1lbnQucmVtb3ZlKCk7XG5cbiAgICAgICAgdGhpcy5vbk1vdXNlRGV0YWNoKCk7XG5cbiAgICAgICAgdGhpcy5zZWxlY3RFZGl0b3IodGhpcy5hY3RpdmVFZGl0b3IpO1xuICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uTWFya2VycygpO1xuICAgICAgICB0aGlzLm90aGVyRWRpdG9yLnNldFNlc3Npb24obnVsbCk7XG4gICAgICAgIHRoaXMub3RoZXJFZGl0b3IucmVuZGVyZXIuJGxvb3AgPSBudWxsO1xuICAgICAgICB0aGlzLmluaXRUZXh0SW5wdXQodHJ1ZSk7XG4gICAgICAgIHRoaXMuaW5pdFJlbmRlcmVyKHRydWUpO1xuXG4gICAgICAgIHRoaXMub3RoZXJFZGl0b3IuZGVzdHJveSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjaGFuZ2VzXG4gICAgICogQHBhcmFtIHtpbXBvcnQoXCJhY2UtY29kZVwiKS5WaXJ0dWFsUmVuZGVyZXJ9IHJlbmRlcmVyXG4gICAgICovXG4gICAgb25BZnRlclJlbmRlcihjaGFuZ2VzLCByZW5kZXJlcikge1xuICAgICAgICB2YXIgY29uZmlnID0gcmVuZGVyZXIubGF5ZXJDb25maWc7XG5cbiAgICAgICAgdmFyIHNlc3Npb24gPSB0aGlzLm90aGVyU2Vzc2lvbjtcbiAgICAgICAgdmFyIGNsb25lUmVuZGVyZXIgPSB0aGlzLm90aGVyRWRpdG9yLnJlbmRlcmVyO1xuXG4gICAgICAgIHNlc3Npb24uJHNjcm9sbFRvcCA9IHJlbmRlcmVyLnNjcm9sbFRvcDtcbiAgICAgICAgc2Vzc2lvbi4kc2Nyb2xsTGVmdCA9IHJlbmRlcmVyLnNjcm9sbExlZnQ7XG5cbiAgICAgICAgW1xuICAgICAgICAgICAgXCJjaGFyYWN0ZXJXaWR0aFwiLFxuICAgICAgICAgICAgXCJsaW5lSGVpZ2h0XCIsXG4gICAgICAgICAgICBcInNjcm9sbFRvcFwiLFxuICAgICAgICAgICAgXCJzY3JvbGxMZWZ0XCIsXG4gICAgICAgICAgICBcInNjcm9sbE1hcmdpblwiLFxuICAgICAgICAgICAgXCIkcGFkZGluZ1wiLFxuICAgICAgICAgICAgXCIkc2l6ZVwiLFxuICAgICAgICAgICAgXCJsYXllckNvbmZpZ1wiLFxuICAgICAgICAgICAgXCIkaG9yaXpTY3JvbGxcIixcbiAgICAgICAgICAgIFwiJHZTY3JvbGxcIixcbiAgICAgICAgXS4gZm9yRWFjaChmdW5jdGlvbihwcm9wKSB7XG4gICAgICAgICAgICBjbG9uZVJlbmRlcmVyW3Byb3BdID0gcmVuZGVyZXJbcHJvcF07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNsb25lUmVuZGVyZXIuJGNvbXB1dGVMYXllckNvbmZpZygpO1xuXG4gICAgICAgIHZhciBuZXdDb25maWcgPSBjbG9uZVJlbmRlcmVyLmxheWVyQ29uZmlnO1xuICAgICAgICBcbiAgICAgICAgdGhpcy5ndXR0ZXJMYXllci51cGRhdGUobmV3Q29uZmlnKTtcblxuICAgICAgICBuZXdDb25maWcuZmlyc3RSb3dTY3JlZW4gPSBjb25maWcuZmlyc3RSb3dTY3JlZW47XG4gICAgICAgIFxuICAgICAgICBjbG9uZVJlbmRlcmVyLiRjdXJzb3JMYXllci5jb25maWcgPSBuZXdDb25maWc7XG4gICAgICAgIGNsb25lUmVuZGVyZXIuJGN1cnNvckxheWVyLnVwZGF0ZShuZXdDb25maWcpO1xuXG4gICAgICAgIGlmIChjaGFuZ2VzICYgY2xvbmVSZW5kZXJlci5DSEFOR0VfTElORVNcbiAgICAgICAgICAgIHx8IGNoYW5nZXMgJiBjbG9uZVJlbmRlcmVyLkNIQU5HRV9GVUxMXG4gICAgICAgICAgICB8fCBjaGFuZ2VzICYgY2xvbmVSZW5kZXJlci5DSEFOR0VfU0NST0xMXG4gICAgICAgICAgICB8fCBjaGFuZ2VzICYgY2xvbmVSZW5kZXJlci5DSEFOR0VfVEVYVFxuICAgICAgICApXG4gICAgICAgICAgICB0aGlzLnRleHRMYXllci51cGRhdGUobmV3Q29uZmlnKTtcblxuICAgICAgICB0aGlzLm1hcmtlckxheWVyLnNldE1hcmtlcnModGhpcy5vdGhlclNlc3Npb24uZ2V0TWFya2VycygpKTtcbiAgICAgICAgdGhpcy5tYXJrZXJMYXllci51cGRhdGUobmV3Q29uZmlnKTtcbiAgICB9XG5cbiAgICBkZXRhY2goKSB7XG4gICAgICAgIHN1cGVyLmRldGFjaCgpO1xuICAgICAgICB0aGlzLm90aGVyRWRpdG9yICYmIHRoaXMub3RoZXJFZGl0b3IuZGVzdHJveSgpO1xuICAgIH1cbn1cblxuZXhwb3J0cy5JbmxpbmVEaWZmVmlldyA9IElubGluZURpZmZWaWV3O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBlcXVhbHMob25lLCBvdGhlciwgaXRlbUVxdWFscyA9IChhLCBiKSA9PiBhID09PSBiKSB7XG4gIGlmIChvbmUgPT09IG90aGVyKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaWYgKCFvbmUgfHwgIW90aGVyKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChvbmUubGVuZ3RoICE9PSBvdGhlci5sZW5ndGgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IG9uZS5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGlmICghaXRlbUVxdWFscyhvbmVbaV0sIG90aGVyW2ldKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cbmZ1bmN0aW9uKiBncm91cEFkamFjZW50QnkoaXRlbXMsIHNob3VsZEJlR3JvdXBlZCkge1xuICBsZXQgY3VycmVudEdyb3VwO1xuICBsZXQgbGFzdDtcbiAgZm9yIChjb25zdCBpdGVtIG9mIGl0ZW1zKSB7XG4gICAgaWYgKGxhc3QgIT09IHVuZGVmaW5lZCAmJiBzaG91bGRCZUdyb3VwZWQobGFzdCwgaXRlbSkpIHtcbiAgICAgIGN1cnJlbnRHcm91cC5wdXNoKGl0ZW0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoY3VycmVudEdyb3VwKSB7XG4gICAgICAgIHlpZWxkIGN1cnJlbnRHcm91cDtcbiAgICAgIH1cbiAgICAgIGN1cnJlbnRHcm91cCA9IFtpdGVtXTtcbiAgICB9XG4gICAgbGFzdCA9IGl0ZW07XG4gIH1cbiAgaWYgKGN1cnJlbnRHcm91cCkge1xuICAgIHlpZWxkIGN1cnJlbnRHcm91cDtcbiAgfVxufVxuZnVuY3Rpb24gZm9yRWFjaEFkamFjZW50KGFyciwgZikge1xuICBmb3IgKGxldCBpID0gMDsgaSA8PSBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICBmKGkgPT09IDAgPyB1bmRlZmluZWQgOiBhcnJbaSAtIDFdLCBpID09PSBhcnIubGVuZ3RoID8gdW5kZWZpbmVkIDogYXJyW2ldKTtcbiAgfVxufVxuZnVuY3Rpb24gZm9yRWFjaFdpdGhOZWlnaGJvcnMoYXJyLCBmKSB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgZihpID09PSAwID8gdW5kZWZpbmVkIDogYXJyW2kgLSAxXSwgYXJyW2ldLCBpICsgMSA9PT0gYXJyLmxlbmd0aCA/IHVuZGVmaW5lZCA6IGFycltpICsgMV0pO1xuICB9XG59XG5mdW5jdGlvbiBwdXNoTWFueShhcnIsIGl0ZW1zKSB7XG4gIGZvciAoY29uc3QgaXRlbSBvZiBpdGVtcykge1xuICAgIGFyci5wdXNoKGl0ZW0pO1xuICB9XG59XG5mdW5jdGlvbiBjb21wYXJlQnkoc2VsZWN0b3IsIGNvbXBhcmF0b3IpIHtcbiAgcmV0dXJuIChhLCBiKSA9PiBjb21wYXJhdG9yKHNlbGVjdG9yKGEpLCBzZWxlY3RvcihiKSk7XG59XG5jb25zdCBudW1iZXJDb21wYXJhdG9yID0gKGEsIGIpID0+IGEgLSBiO1xuZnVuY3Rpb24gcmV2ZXJzZU9yZGVyKGNvbXBhcmF0b3IpIHtcbiAgcmV0dXJuIChhLCBiKSA9PiAtY29tcGFyYXRvcihhLCBiKTtcbn1cblxuY2xhc3MgQnVnSW5kaWNhdGluZ0Vycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihtZXNzYWdlKSB7XG4gICAgc3VwZXIobWVzc2FnZSB8fCBcIkFuIHVuZXhwZWN0ZWQgYnVnIG9jY3VycmVkLlwiKTtcbiAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YodGhpcywgQnVnSW5kaWNhdGluZ0Vycm9yLnByb3RvdHlwZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gYXNzZXJ0KGNvbmRpdGlvbiwgbWVzc2FnZSA9IFwidW5leHBlY3RlZCBzdGF0ZVwiKSB7XG4gIGlmICghY29uZGl0aW9uKSB7XG4gICAgdGhyb3cgbmV3IEJ1Z0luZGljYXRpbmdFcnJvcihgQXNzZXJ0aW9uIEZhaWxlZDogJHttZXNzYWdlfWApO1xuICB9XG59XG5mdW5jdGlvbiBhc3NlcnRGbihjb25kaXRpb24pIHtcbiAgY29uZGl0aW9uKCk7XG59XG5mdW5jdGlvbiBjaGVja0FkamFjZW50SXRlbXMoaXRlbXMsIHByZWRpY2F0ZSkge1xuICBsZXQgaSA9IDA7XG4gIHdoaWxlIChpIDwgaXRlbXMubGVuZ3RoIC0gMSkge1xuICAgIGNvbnN0IGEgPSBpdGVtc1tpXTtcbiAgICBjb25zdCBiID0gaXRlbXNbaSArIDFdO1xuICAgIGlmICghcHJlZGljYXRlKGEsIGIpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGkrKztcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuY2xhc3MgT2Zmc2V0UmFuZ2Uge1xuICBjb25zdHJ1Y3RvcihzdGFydCwgZW5kRXhjbHVzaXZlKSB7XG4gICAgdGhpcy5zdGFydCA9IHN0YXJ0O1xuICAgIHRoaXMuZW5kRXhjbHVzaXZlID0gZW5kRXhjbHVzaXZlO1xuICAgIGlmIChzdGFydCA+IGVuZEV4Y2x1c2l2ZSkge1xuICAgICAgdGhyb3cgbmV3IEJ1Z0luZGljYXRpbmdFcnJvcihgSW52YWxpZCByYW5nZTogJHt0aGlzLnRvU3RyaW5nKCl9YCk7XG4gICAgfVxuICB9XG4gIHN0YXRpYyBmcm9tVG8oc3RhcnQsIGVuZEV4Y2x1c2l2ZSkge1xuICAgIHJldHVybiBuZXcgT2Zmc2V0UmFuZ2Uoc3RhcnQsIGVuZEV4Y2x1c2l2ZSk7XG4gIH1cbiAgc3RhdGljIGFkZFJhbmdlKHJhbmdlLCBzb3J0ZWRSYW5nZXMpIHtcbiAgICBsZXQgaSA9IDA7XG4gICAgd2hpbGUgKGkgPCBzb3J0ZWRSYW5nZXMubGVuZ3RoICYmIHNvcnRlZFJhbmdlc1tpXS5lbmRFeGNsdXNpdmUgPCByYW5nZS5zdGFydCkge1xuICAgICAgaSsrO1xuICAgIH1cbiAgICBsZXQgaiA9IGk7XG4gICAgd2hpbGUgKGogPCBzb3J0ZWRSYW5nZXMubGVuZ3RoICYmIHNvcnRlZFJhbmdlc1tqXS5zdGFydCA8PSByYW5nZS5lbmRFeGNsdXNpdmUpIHtcbiAgICAgIGorKztcbiAgICB9XG4gICAgaWYgKGkgPT09IGopIHtcbiAgICAgIHNvcnRlZFJhbmdlcy5zcGxpY2UoaSwgMCwgcmFuZ2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBzdGFydCA9IE1hdGgubWluKHJhbmdlLnN0YXJ0LCBzb3J0ZWRSYW5nZXNbaV0uc3RhcnQpO1xuICAgICAgY29uc3QgZW5kID0gTWF0aC5tYXgocmFuZ2UuZW5kRXhjbHVzaXZlLCBzb3J0ZWRSYW5nZXNbaiAtIDFdLmVuZEV4Y2x1c2l2ZSk7XG4gICAgICBzb3J0ZWRSYW5nZXMuc3BsaWNlKGksIGogLSBpLCBuZXcgT2Zmc2V0UmFuZ2Uoc3RhcnQsIGVuZCkpO1xuICAgIH1cbiAgfVxuICBzdGF0aWMgdHJ5Q3JlYXRlKHN0YXJ0LCBlbmRFeGNsdXNpdmUpIHtcbiAgICBpZiAoc3RhcnQgPiBlbmRFeGNsdXNpdmUpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHJldHVybiBuZXcgT2Zmc2V0UmFuZ2Uoc3RhcnQsIGVuZEV4Y2x1c2l2ZSk7XG4gIH1cbiAgc3RhdGljIG9mTGVuZ3RoKGxlbmd0aCkge1xuICAgIHJldHVybiBuZXcgT2Zmc2V0UmFuZ2UoMCwgbGVuZ3RoKTtcbiAgfVxuICBzdGF0aWMgb2ZTdGFydEFuZExlbmd0aChzdGFydCwgbGVuZ3RoKSB7XG4gICAgcmV0dXJuIG5ldyBPZmZzZXRSYW5nZShzdGFydCwgc3RhcnQgKyBsZW5ndGgpO1xuICB9XG4gIHN0YXRpYyBlbXB0eUF0KG9mZnNldCkge1xuICAgIHJldHVybiBuZXcgT2Zmc2V0UmFuZ2Uob2Zmc2V0LCBvZmZzZXQpO1xuICB9XG4gIGdldCBpc0VtcHR5KCkge1xuICAgIHJldHVybiB0aGlzLnN0YXJ0ID09PSB0aGlzLmVuZEV4Y2x1c2l2ZTtcbiAgfVxuICBkZWx0YShvZmZzZXQpIHtcbiAgICByZXR1cm4gbmV3IE9mZnNldFJhbmdlKHRoaXMuc3RhcnQgKyBvZmZzZXQsIHRoaXMuZW5kRXhjbHVzaXZlICsgb2Zmc2V0KTtcbiAgfVxuICBkZWx0YVN0YXJ0KG9mZnNldCkge1xuICAgIHJldHVybiBuZXcgT2Zmc2V0UmFuZ2UodGhpcy5zdGFydCArIG9mZnNldCwgdGhpcy5lbmRFeGNsdXNpdmUpO1xuICB9XG4gIGRlbHRhRW5kKG9mZnNldCkge1xuICAgIHJldHVybiBuZXcgT2Zmc2V0UmFuZ2UodGhpcy5zdGFydCwgdGhpcy5lbmRFeGNsdXNpdmUgKyBvZmZzZXQpO1xuICB9XG4gIGdldCBsZW5ndGgoKSB7XG4gICAgcmV0dXJuIHRoaXMuZW5kRXhjbHVzaXZlIC0gdGhpcy5zdGFydDtcbiAgfVxuICB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gYFske3RoaXMuc3RhcnR9LCAke3RoaXMuZW5kRXhjbHVzaXZlfSlgO1xuICB9XG4gIGVxdWFscyhvdGhlcikge1xuICAgIHJldHVybiB0aGlzLnN0YXJ0ID09PSBvdGhlci5zdGFydCAmJiB0aGlzLmVuZEV4Y2x1c2l2ZSA9PT0gb3RoZXIuZW5kRXhjbHVzaXZlO1xuICB9XG4gIGNvbnRhaW5zUmFuZ2Uob3RoZXIpIHtcbiAgICByZXR1cm4gdGhpcy5zdGFydCA8PSBvdGhlci5zdGFydCAmJiBvdGhlci5lbmRFeGNsdXNpdmUgPD0gdGhpcy5lbmRFeGNsdXNpdmU7XG4gIH1cbiAgY29udGFpbnMob2Zmc2V0KSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhcnQgPD0gb2Zmc2V0ICYmIG9mZnNldCA8IHRoaXMuZW5kRXhjbHVzaXZlO1xuICB9XG4gIC8qKlxuICAgKiBmb3IgYWxsIG51bWJlcnMgbjogcmFuZ2UxLmNvbnRhaW5zKG4pIG9yIHJhbmdlMi5jb250YWlucyhuKSA9PiByYW5nZTEuam9pbihyYW5nZTIpLmNvbnRhaW5zKG4pXG4gICAqIFRoZSBqb2luZWQgcmFuZ2UgaXMgdGhlIHNtYWxsZXN0IHJhbmdlIHRoYXQgY29udGFpbnMgYm90aCByYW5nZXMuXG4gICAqL1xuICBqb2luKG90aGVyKSB7XG4gICAgcmV0dXJuIG5ldyBPZmZzZXRSYW5nZShNYXRoLm1pbih0aGlzLnN0YXJ0LCBvdGhlci5zdGFydCksIE1hdGgubWF4KHRoaXMuZW5kRXhjbHVzaXZlLCBvdGhlci5lbmRFeGNsdXNpdmUpKTtcbiAgfVxuICAvKipcbiAgICogZm9yIGFsbCBudW1iZXJzIG46IHJhbmdlMS5jb250YWlucyhuKSBhbmQgcmFuZ2UyLmNvbnRhaW5zKG4pIDw9PiByYW5nZTEuaW50ZXJzZWN0KHJhbmdlMikuY29udGFpbnMobilcbiAgICpcbiAgICogVGhlIHJlc3VsdGluZyByYW5nZSBpcyBlbXB0eSBpZiB0aGUgcmFuZ2VzIGRvIG5vdCBpbnRlcnNlY3QsIGJ1dCB0b3VjaC5cbiAgICogSWYgdGhlIHJhbmdlcyBkb24ndCBldmVuIHRvdWNoLCB0aGUgcmVzdWx0IGlzIHVuZGVmaW5lZC5cbiAgICovXG4gIGludGVyc2VjdChvdGhlcikge1xuICAgIGNvbnN0IHN0YXJ0ID0gTWF0aC5tYXgodGhpcy5zdGFydCwgb3RoZXIuc3RhcnQpO1xuICAgIGNvbnN0IGVuZCA9IE1hdGgubWluKHRoaXMuZW5kRXhjbHVzaXZlLCBvdGhlci5lbmRFeGNsdXNpdmUpO1xuICAgIGlmIChzdGFydCA8PSBlbmQpIHtcbiAgICAgIHJldHVybiBuZXcgT2Zmc2V0UmFuZ2Uoc3RhcnQsIGVuZCk7XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbiAgaW50ZXJzZWN0aW9uTGVuZ3RoKHJhbmdlKSB7XG4gICAgY29uc3Qgc3RhcnQgPSBNYXRoLm1heCh0aGlzLnN0YXJ0LCByYW5nZS5zdGFydCk7XG4gICAgY29uc3QgZW5kID0gTWF0aC5taW4odGhpcy5lbmRFeGNsdXNpdmUsIHJhbmdlLmVuZEV4Y2x1c2l2ZSk7XG4gICAgcmV0dXJuIE1hdGgubWF4KDAsIGVuZCAtIHN0YXJ0KTtcbiAgfVxuICBpbnRlcnNlY3RzKG90aGVyKSB7XG4gICAgY29uc3Qgc3RhcnQgPSBNYXRoLm1heCh0aGlzLnN0YXJ0LCBvdGhlci5zdGFydCk7XG4gICAgY29uc3QgZW5kID0gTWF0aC5taW4odGhpcy5lbmRFeGNsdXNpdmUsIG90aGVyLmVuZEV4Y2x1c2l2ZSk7XG4gICAgcmV0dXJuIHN0YXJ0IDwgZW5kO1xuICB9XG4gIGludGVyc2VjdHNPclRvdWNoZXMob3RoZXIpIHtcbiAgICBjb25zdCBzdGFydCA9IE1hdGgubWF4KHRoaXMuc3RhcnQsIG90aGVyLnN0YXJ0KTtcbiAgICBjb25zdCBlbmQgPSBNYXRoLm1pbih0aGlzLmVuZEV4Y2x1c2l2ZSwgb3RoZXIuZW5kRXhjbHVzaXZlKTtcbiAgICByZXR1cm4gc3RhcnQgPD0gZW5kO1xuICB9XG4gIGlzQmVmb3JlKG90aGVyKSB7XG4gICAgcmV0dXJuIHRoaXMuZW5kRXhjbHVzaXZlIDw9IG90aGVyLnN0YXJ0O1xuICB9XG4gIGlzQWZ0ZXIob3RoZXIpIHtcbiAgICByZXR1cm4gdGhpcy5zdGFydCA+PSBvdGhlci5lbmRFeGNsdXNpdmU7XG4gIH1cbiAgc2xpY2UoYXJyKSB7XG4gICAgcmV0dXJuIGFyci5zbGljZSh0aGlzLnN0YXJ0LCB0aGlzLmVuZEV4Y2x1c2l2ZSk7XG4gIH1cbiAgc3Vic3RyaW5nKHN0cikge1xuICAgIHJldHVybiBzdHIuc3Vic3RyaW5nKHRoaXMuc3RhcnQsIHRoaXMuZW5kRXhjbHVzaXZlKTtcbiAgfVxuICAvKipcbiAgICogUmV0dXJucyB0aGUgZ2l2ZW4gdmFsdWUgaWYgaXQgaXMgY29udGFpbmVkIGluIHRoaXMgaW5zdGFuY2UsIG90aGVyd2lzZSB0aGUgY2xvc2VzdCB2YWx1ZSB0aGF0IGlzIGNvbnRhaW5lZC5cbiAgICogVGhlIHJhbmdlIG11c3Qgbm90IGJlIGVtcHR5LlxuICAgKi9cbiAgY2xpcCh2YWx1ZSkge1xuICAgIGlmICh0aGlzLmlzRW1wdHkpIHtcbiAgICAgIHRocm93IG5ldyBCdWdJbmRpY2F0aW5nRXJyb3IoYEludmFsaWQgY2xpcHBpbmcgcmFuZ2U6ICR7dGhpcy50b1N0cmluZygpfWApO1xuICAgIH1cbiAgICByZXR1cm4gTWF0aC5tYXgodGhpcy5zdGFydCwgTWF0aC5taW4odGhpcy5lbmRFeGNsdXNpdmUgLSAxLCB2YWx1ZSkpO1xuICB9XG4gIC8qKlxuICAgKiBSZXR1cm5zIGByIDo9IHZhbHVlICsgayAqIGxlbmd0aGAgc3VjaCB0aGF0IGByYCBpcyBjb250YWluZWQgaW4gdGhpcyByYW5nZS5cbiAgICogVGhlIHJhbmdlIG11c3Qgbm90IGJlIGVtcHR5LlxuICAgKlxuICAgKiBFLmcuIGBbNSwgMTApLmNsaXBDeWNsaWMoMTApID09PSA1YCwgYFs1LCAxMCkuY2xpcEN5Y2xpYygxMSkgPT09IDZgIGFuZCBgWzUsIDEwKS5jbGlwQ3ljbGljKDQpID09PSA5YC5cbiAgICovXG4gIGNsaXBDeWNsaWModmFsdWUpIHtcbiAgICBpZiAodGhpcy5pc0VtcHR5KSB7XG4gICAgICB0aHJvdyBuZXcgQnVnSW5kaWNhdGluZ0Vycm9yKGBJbnZhbGlkIGNsaXBwaW5nIHJhbmdlOiAke3RoaXMudG9TdHJpbmcoKX1gKTtcbiAgICB9XG4gICAgaWYgKHZhbHVlIDwgdGhpcy5zdGFydCkge1xuICAgICAgcmV0dXJuIHRoaXMuZW5kRXhjbHVzaXZlIC0gKHRoaXMuc3RhcnQgLSB2YWx1ZSkgJSB0aGlzLmxlbmd0aDtcbiAgICB9XG4gICAgaWYgKHZhbHVlID49IHRoaXMuZW5kRXhjbHVzaXZlKSB7XG4gICAgICByZXR1cm4gdGhpcy5zdGFydCArICh2YWx1ZSAtIHRoaXMuc3RhcnQpICUgdGhpcy5sZW5ndGg7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICBtYXAoZikge1xuICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgIGZvciAobGV0IGkgPSB0aGlzLnN0YXJ0OyBpIDwgdGhpcy5lbmRFeGNsdXNpdmU7IGkrKykge1xuICAgICAgcmVzdWx0LnB1c2goZihpKSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgZm9yRWFjaChmKSB7XG4gICAgZm9yIChsZXQgaSA9IHRoaXMuc3RhcnQ7IGkgPCB0aGlzLmVuZEV4Y2x1c2l2ZTsgaSsrKSB7XG4gICAgICBmKGkpO1xuICAgIH1cbiAgfVxufVxuXG5jbGFzcyBQb3NpdGlvbiB7XG4gIGNvbnN0cnVjdG9yKGxpbmVOdW1iZXIsIGNvbHVtbikge1xuICAgIHRoaXMubGluZU51bWJlciA9IGxpbmVOdW1iZXI7XG4gICAgdGhpcy5jb2x1bW4gPSBjb2x1bW47XG4gIH1cbiAgLyoqXG4gICAqIFRlc3QgaWYgdGhpcyBwb3NpdGlvbiBlcXVhbHMgb3RoZXIgcG9zaXRpb25cbiAgICovXG4gIGVxdWFscyhvdGhlcikge1xuICAgIHJldHVybiBQb3NpdGlvbi5lcXVhbHModGhpcywgb3RoZXIpO1xuICB9XG4gIC8qKlxuICAgKiBUZXN0IGlmIHBvc2l0aW9uIGBhYCBlcXVhbHMgcG9zaXRpb24gYGJgXG4gICAqL1xuICBzdGF0aWMgZXF1YWxzKGEsIGIpIHtcbiAgICBpZiAoIWEgJiYgIWIpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gISFhICYmICEhYiAmJiBhLmxpbmVOdW1iZXIgPT09IGIubGluZU51bWJlciAmJiBhLmNvbHVtbiA9PT0gYi5jb2x1bW47XG4gIH1cbiAgLyoqXG4gICAqIFRlc3QgaWYgdGhpcyBwb3NpdGlvbiBpcyBiZWZvcmUgb3RoZXIgcG9zaXRpb24uXG4gICAqIElmIHRoZSB0d28gcG9zaXRpb25zIGFyZSBlcXVhbCwgdGhlIHJlc3VsdCB3aWxsIGJlIGZhbHNlLlxuICAgKi9cbiAgaXNCZWZvcmUob3RoZXIpIHtcbiAgICByZXR1cm4gUG9zaXRpb24uaXNCZWZvcmUodGhpcywgb3RoZXIpO1xuICB9XG4gIC8qKlxuICAgKiBUZXN0IGlmIHBvc2l0aW9uIGBhYCBpcyBiZWZvcmUgcG9zaXRpb24gYGJgLlxuICAgKiBJZiB0aGUgdHdvIHBvc2l0aW9ucyBhcmUgZXF1YWwsIHRoZSByZXN1bHQgd2lsbCBiZSBmYWxzZS5cbiAgICovXG4gIHN0YXRpYyBpc0JlZm9yZShhLCBiKSB7XG4gICAgaWYgKGEubGluZU51bWJlciA8IGIubGluZU51bWJlcikge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmIChiLmxpbmVOdW1iZXIgPCBhLmxpbmVOdW1iZXIpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIGEuY29sdW1uIDwgYi5jb2x1bW47XG4gIH1cbiAgLyoqXG4gICAqIFRlc3QgaWYgdGhpcyBwb3NpdGlvbiBpcyBiZWZvcmUgb3RoZXIgcG9zaXRpb24uXG4gICAqIElmIHRoZSB0d28gcG9zaXRpb25zIGFyZSBlcXVhbCwgdGhlIHJlc3VsdCB3aWxsIGJlIHRydWUuXG4gICAqL1xuICBpc0JlZm9yZU9yRXF1YWwob3RoZXIpIHtcbiAgICByZXR1cm4gUG9zaXRpb24uaXNCZWZvcmVPckVxdWFsKHRoaXMsIG90aGVyKTtcbiAgfVxuICAvKipcbiAgICogVGVzdCBpZiBwb3NpdGlvbiBgYWAgaXMgYmVmb3JlIHBvc2l0aW9uIGBiYC5cbiAgICogSWYgdGhlIHR3byBwb3NpdGlvbnMgYXJlIGVxdWFsLCB0aGUgcmVzdWx0IHdpbGwgYmUgdHJ1ZS5cbiAgICovXG4gIHN0YXRpYyBpc0JlZm9yZU9yRXF1YWwoYSwgYikge1xuICAgIGlmIChhLmxpbmVOdW1iZXIgPCBiLmxpbmVOdW1iZXIpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAoYi5saW5lTnVtYmVyIDwgYS5saW5lTnVtYmVyKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBhLmNvbHVtbiA8PSBiLmNvbHVtbjtcbiAgfVxufVxuXG5jbGFzcyBSYW5nZSB7XG4gIGNvbnN0cnVjdG9yKHN0YXJ0TGluZU51bWJlciwgc3RhcnRDb2x1bW4sIGVuZExpbmVOdW1iZXIsIGVuZENvbHVtbikge1xuICAgIGlmIChzdGFydExpbmVOdW1iZXIgPiBlbmRMaW5lTnVtYmVyIHx8IHN0YXJ0TGluZU51bWJlciA9PT0gZW5kTGluZU51bWJlciAmJiBzdGFydENvbHVtbiA+IGVuZENvbHVtbikge1xuICAgICAgdGhpcy5zdGFydExpbmVOdW1iZXIgPSBlbmRMaW5lTnVtYmVyO1xuICAgICAgdGhpcy5zdGFydENvbHVtbiA9IGVuZENvbHVtbjtcbiAgICAgIHRoaXMuZW5kTGluZU51bWJlciA9IHN0YXJ0TGluZU51bWJlcjtcbiAgICAgIHRoaXMuZW5kQ29sdW1uID0gc3RhcnRDb2x1bW47XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RhcnRMaW5lTnVtYmVyID0gc3RhcnRMaW5lTnVtYmVyO1xuICAgICAgdGhpcy5zdGFydENvbHVtbiA9IHN0YXJ0Q29sdW1uO1xuICAgICAgdGhpcy5lbmRMaW5lTnVtYmVyID0gZW5kTGluZU51bWJlcjtcbiAgICAgIHRoaXMuZW5kQ29sdW1uID0gZW5kQ29sdW1uO1xuICAgIH1cbiAgfVxuICAvKipcbiAgICogVGVzdCBpZiB0aGlzIHJhbmdlIGlzIGVtcHR5LlxuICAgKi9cbiAgaXNFbXB0eSgpIHtcbiAgICByZXR1cm4gUmFuZ2UuaXNFbXB0eSh0aGlzKTtcbiAgfVxuICAvKipcbiAgICogVGVzdCBpZiBgcmFuZ2VgIGlzIGVtcHR5LlxuICAgKi9cbiAgc3RhdGljIGlzRW1wdHkocmFuZ2UpIHtcbiAgICByZXR1cm4gcmFuZ2Uuc3RhcnRMaW5lTnVtYmVyID09PSByYW5nZS5lbmRMaW5lTnVtYmVyICYmIHJhbmdlLnN0YXJ0Q29sdW1uID09PSByYW5nZS5lbmRDb2x1bW47XG4gIH1cbiAgLyoqXG4gICAqIFRlc3QgaWYgcG9zaXRpb24gaXMgaW4gdGhpcyByYW5nZS4gSWYgdGhlIHBvc2l0aW9uIGlzIGF0IHRoZSBlZGdlcywgd2lsbCByZXR1cm4gdHJ1ZS5cbiAgICovXG4gIGNvbnRhaW5zUG9zaXRpb24ocG9zaXRpb24pIHtcbiAgICByZXR1cm4gUmFuZ2UuY29udGFpbnNQb3NpdGlvbih0aGlzLCBwb3NpdGlvbik7XG4gIH1cbiAgLyoqXG4gICAqIFRlc3QgaWYgYHBvc2l0aW9uYCBpcyBpbiBgcmFuZ2VgLiBJZiB0aGUgcG9zaXRpb24gaXMgYXQgdGhlIGVkZ2VzLCB3aWxsIHJldHVybiB0cnVlLlxuICAgKi9cbiAgc3RhdGljIGNvbnRhaW5zUG9zaXRpb24ocmFuZ2UsIHBvc2l0aW9uKSB7XG4gICAgaWYgKHBvc2l0aW9uLmxpbmVOdW1iZXIgPCByYW5nZS5zdGFydExpbmVOdW1iZXIgfHwgcG9zaXRpb24ubGluZU51bWJlciA+IHJhbmdlLmVuZExpbmVOdW1iZXIpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHBvc2l0aW9uLmxpbmVOdW1iZXIgPT09IHJhbmdlLnN0YXJ0TGluZU51bWJlciAmJiBwb3NpdGlvbi5jb2x1bW4gPCByYW5nZS5zdGFydENvbHVtbikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAocG9zaXRpb24ubGluZU51bWJlciA9PT0gcmFuZ2UuZW5kTGluZU51bWJlciAmJiBwb3NpdGlvbi5jb2x1bW4gPiByYW5nZS5lbmRDb2x1bW4pIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgLyoqXG4gICAqIFRlc3QgaWYgcmFuZ2UgaXMgaW4gdGhpcyByYW5nZS4gSWYgdGhlIHJhbmdlIGlzIGVxdWFsIHRvIHRoaXMgcmFuZ2UsIHdpbGwgcmV0dXJuIHRydWUuXG4gICAqL1xuICBjb250YWluc1JhbmdlKHJhbmdlKSB7XG4gICAgcmV0dXJuIFJhbmdlLmNvbnRhaW5zUmFuZ2UodGhpcywgcmFuZ2UpO1xuICB9XG4gIC8qKlxuICAgKiBUZXN0IGlmIGBvdGhlclJhbmdlYCBpcyBpbiBgcmFuZ2VgLiBJZiB0aGUgcmFuZ2VzIGFyZSBlcXVhbCwgd2lsbCByZXR1cm4gdHJ1ZS5cbiAgICovXG4gIHN0YXRpYyBjb250YWluc1JhbmdlKHJhbmdlLCBvdGhlclJhbmdlKSB7XG4gICAgaWYgKG90aGVyUmFuZ2Uuc3RhcnRMaW5lTnVtYmVyIDwgcmFuZ2Uuc3RhcnRMaW5lTnVtYmVyIHx8IG90aGVyUmFuZ2UuZW5kTGluZU51bWJlciA8IHJhbmdlLnN0YXJ0TGluZU51bWJlcikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAob3RoZXJSYW5nZS5zdGFydExpbmVOdW1iZXIgPiByYW5nZS5lbmRMaW5lTnVtYmVyIHx8IG90aGVyUmFuZ2UuZW5kTGluZU51bWJlciA+IHJhbmdlLmVuZExpbmVOdW1iZXIpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKG90aGVyUmFuZ2Uuc3RhcnRMaW5lTnVtYmVyID09PSByYW5nZS5zdGFydExpbmVOdW1iZXIgJiYgb3RoZXJSYW5nZS5zdGFydENvbHVtbiA8IHJhbmdlLnN0YXJ0Q29sdW1uKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChvdGhlclJhbmdlLmVuZExpbmVOdW1iZXIgPT09IHJhbmdlLmVuZExpbmVOdW1iZXIgJiYgb3RoZXJSYW5nZS5lbmRDb2x1bW4gPiByYW5nZS5lbmRDb2x1bW4pIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgLyoqXG4gICAqIFRlc3QgaWYgYHJhbmdlYCBpcyBzdHJpY3RseSBpbiB0aGlzIHJhbmdlLiBgcmFuZ2VgIG11c3Qgc3RhcnQgYWZ0ZXIgYW5kIGVuZCBiZWZvcmUgdGhpcyByYW5nZSBmb3IgdGhlIHJlc3VsdCB0byBiZSB0cnVlLlxuICAgKi9cbiAgc3RyaWN0Q29udGFpbnNSYW5nZShyYW5nZSkge1xuICAgIHJldHVybiBSYW5nZS5zdHJpY3RDb250YWluc1JhbmdlKHRoaXMsIHJhbmdlKTtcbiAgfVxuICAvKipcbiAgICogVGVzdCBpZiBgb3RoZXJSYW5nZWAgaXMgc3RyaWN0bHkgaW4gYHJhbmdlYCAobXVzdCBzdGFydCBhZnRlciwgYW5kIGVuZCBiZWZvcmUpLiBJZiB0aGUgcmFuZ2VzIGFyZSBlcXVhbCwgd2lsbCByZXR1cm4gZmFsc2UuXG4gICAqL1xuICBzdGF0aWMgc3RyaWN0Q29udGFpbnNSYW5nZShyYW5nZSwgb3RoZXJSYW5nZSkge1xuICAgIGlmIChvdGhlclJhbmdlLnN0YXJ0TGluZU51bWJlciA8IHJhbmdlLnN0YXJ0TGluZU51bWJlciB8fCBvdGhlclJhbmdlLmVuZExpbmVOdW1iZXIgPCByYW5nZS5zdGFydExpbmVOdW1iZXIpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKG90aGVyUmFuZ2Uuc3RhcnRMaW5lTnVtYmVyID4gcmFuZ2UuZW5kTGluZU51bWJlciB8fCBvdGhlclJhbmdlLmVuZExpbmVOdW1iZXIgPiByYW5nZS5lbmRMaW5lTnVtYmVyKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChvdGhlclJhbmdlLnN0YXJ0TGluZU51bWJlciA9PT0gcmFuZ2Uuc3RhcnRMaW5lTnVtYmVyICYmIG90aGVyUmFuZ2Uuc3RhcnRDb2x1bW4gPD0gcmFuZ2Uuc3RhcnRDb2x1bW4pIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKG90aGVyUmFuZ2UuZW5kTGluZU51bWJlciA9PT0gcmFuZ2UuZW5kTGluZU51bWJlciAmJiBvdGhlclJhbmdlLmVuZENvbHVtbiA+PSByYW5nZS5lbmRDb2x1bW4pIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgLyoqXG4gICAqIEEgcmV1bmlvbiBvZiB0aGUgdHdvIHJhbmdlcy5cbiAgICogVGhlIHNtYWxsZXN0IHBvc2l0aW9uIHdpbGwgYmUgdXNlZCBhcyB0aGUgc3RhcnQgcG9pbnQsIGFuZCB0aGUgbGFyZ2VzdCBvbmUgYXMgdGhlIGVuZCBwb2ludC5cbiAgICovXG4gIHBsdXNSYW5nZShyYW5nZSkge1xuICAgIHJldHVybiBSYW5nZS5wbHVzUmFuZ2UodGhpcywgcmFuZ2UpO1xuICB9XG4gIC8qKlxuICAgKiBBIHJldW5pb24gb2YgdGhlIHR3byByYW5nZXMuXG4gICAqIFRoZSBzbWFsbGVzdCBwb3NpdGlvbiB3aWxsIGJlIHVzZWQgYXMgdGhlIHN0YXJ0IHBvaW50LCBhbmQgdGhlIGxhcmdlc3Qgb25lIGFzIHRoZSBlbmQgcG9pbnQuXG4gICAqL1xuICBzdGF0aWMgcGx1c1JhbmdlKGEsIGIpIHtcbiAgICBsZXQgc3RhcnRMaW5lTnVtYmVyO1xuICAgIGxldCBzdGFydENvbHVtbjtcbiAgICBsZXQgZW5kTGluZU51bWJlcjtcbiAgICBsZXQgZW5kQ29sdW1uO1xuICAgIGlmIChiLnN0YXJ0TGluZU51bWJlciA8IGEuc3RhcnRMaW5lTnVtYmVyKSB7XG4gICAgICBzdGFydExpbmVOdW1iZXIgPSBiLnN0YXJ0TGluZU51bWJlcjtcbiAgICAgIHN0YXJ0Q29sdW1uID0gYi5zdGFydENvbHVtbjtcbiAgICB9IGVsc2UgaWYgKGIuc3RhcnRMaW5lTnVtYmVyID09PSBhLnN0YXJ0TGluZU51bWJlcikge1xuICAgICAgc3RhcnRMaW5lTnVtYmVyID0gYi5zdGFydExpbmVOdW1iZXI7XG4gICAgICBzdGFydENvbHVtbiA9IE1hdGgubWluKGIuc3RhcnRDb2x1bW4sIGEuc3RhcnRDb2x1bW4pO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdGFydExpbmVOdW1iZXIgPSBhLnN0YXJ0TGluZU51bWJlcjtcbiAgICAgIHN0YXJ0Q29sdW1uID0gYS5zdGFydENvbHVtbjtcbiAgICB9XG4gICAgaWYgKGIuZW5kTGluZU51bWJlciA+IGEuZW5kTGluZU51bWJlcikge1xuICAgICAgZW5kTGluZU51bWJlciA9IGIuZW5kTGluZU51bWJlcjtcbiAgICAgIGVuZENvbHVtbiA9IGIuZW5kQ29sdW1uO1xuICAgIH0gZWxzZSBpZiAoYi5lbmRMaW5lTnVtYmVyID09PSBhLmVuZExpbmVOdW1iZXIpIHtcbiAgICAgIGVuZExpbmVOdW1iZXIgPSBiLmVuZExpbmVOdW1iZXI7XG4gICAgICBlbmRDb2x1bW4gPSBNYXRoLm1heChiLmVuZENvbHVtbiwgYS5lbmRDb2x1bW4pO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbmRMaW5lTnVtYmVyID0gYS5lbmRMaW5lTnVtYmVyO1xuICAgICAgZW5kQ29sdW1uID0gYS5lbmRDb2x1bW47XG4gICAgfVxuICAgIHJldHVybiBuZXcgUmFuZ2Uoc3RhcnRMaW5lTnVtYmVyLCBzdGFydENvbHVtbiwgZW5kTGluZU51bWJlciwgZW5kQ29sdW1uKTtcbiAgfVxuICAvKipcbiAgICogQSBpbnRlcnNlY3Rpb24gb2YgdGhlIHR3byByYW5nZXMuXG4gICAqL1xuICBpbnRlcnNlY3RSYW5nZXMocmFuZ2UpIHtcbiAgICByZXR1cm4gUmFuZ2UuaW50ZXJzZWN0UmFuZ2VzKHRoaXMsIHJhbmdlKTtcbiAgfVxuICAvKipcbiAgICogQSBpbnRlcnNlY3Rpb24gb2YgdGhlIHR3byByYW5nZXMuXG4gICAqL1xuICBzdGF0aWMgaW50ZXJzZWN0UmFuZ2VzKGEsIGIpIHtcbiAgICBsZXQgcmVzdWx0U3RhcnRMaW5lTnVtYmVyID0gYS5zdGFydExpbmVOdW1iZXI7XG4gICAgbGV0IHJlc3VsdFN0YXJ0Q29sdW1uID0gYS5zdGFydENvbHVtbjtcbiAgICBsZXQgcmVzdWx0RW5kTGluZU51bWJlciA9IGEuZW5kTGluZU51bWJlcjtcbiAgICBsZXQgcmVzdWx0RW5kQ29sdW1uID0gYS5lbmRDb2x1bW47XG4gICAgY29uc3Qgb3RoZXJTdGFydExpbmVOdW1iZXIgPSBiLnN0YXJ0TGluZU51bWJlcjtcbiAgICBjb25zdCBvdGhlclN0YXJ0Q29sdW1uID0gYi5zdGFydENvbHVtbjtcbiAgICBjb25zdCBvdGhlckVuZExpbmVOdW1iZXIgPSBiLmVuZExpbmVOdW1iZXI7XG4gICAgY29uc3Qgb3RoZXJFbmRDb2x1bW4gPSBiLmVuZENvbHVtbjtcbiAgICBpZiAocmVzdWx0U3RhcnRMaW5lTnVtYmVyIDwgb3RoZXJTdGFydExpbmVOdW1iZXIpIHtcbiAgICAgIHJlc3VsdFN0YXJ0TGluZU51bWJlciA9IG90aGVyU3RhcnRMaW5lTnVtYmVyO1xuICAgICAgcmVzdWx0U3RhcnRDb2x1bW4gPSBvdGhlclN0YXJ0Q29sdW1uO1xuICAgIH0gZWxzZSBpZiAocmVzdWx0U3RhcnRMaW5lTnVtYmVyID09PSBvdGhlclN0YXJ0TGluZU51bWJlcikge1xuICAgICAgcmVzdWx0U3RhcnRDb2x1bW4gPSBNYXRoLm1heChyZXN1bHRTdGFydENvbHVtbiwgb3RoZXJTdGFydENvbHVtbik7XG4gICAgfVxuICAgIGlmIChyZXN1bHRFbmRMaW5lTnVtYmVyID4gb3RoZXJFbmRMaW5lTnVtYmVyKSB7XG4gICAgICByZXN1bHRFbmRMaW5lTnVtYmVyID0gb3RoZXJFbmRMaW5lTnVtYmVyO1xuICAgICAgcmVzdWx0RW5kQ29sdW1uID0gb3RoZXJFbmRDb2x1bW47XG4gICAgfSBlbHNlIGlmIChyZXN1bHRFbmRMaW5lTnVtYmVyID09PSBvdGhlckVuZExpbmVOdW1iZXIpIHtcbiAgICAgIHJlc3VsdEVuZENvbHVtbiA9IE1hdGgubWluKHJlc3VsdEVuZENvbHVtbiwgb3RoZXJFbmRDb2x1bW4pO1xuICAgIH1cbiAgICBpZiAocmVzdWx0U3RhcnRMaW5lTnVtYmVyID4gcmVzdWx0RW5kTGluZU51bWJlcikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGlmIChyZXN1bHRTdGFydExpbmVOdW1iZXIgPT09IHJlc3VsdEVuZExpbmVOdW1iZXIgJiYgcmVzdWx0U3RhcnRDb2x1bW4gPiByZXN1bHRFbmRDb2x1bW4pIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IFJhbmdlKHJlc3VsdFN0YXJ0TGluZU51bWJlciwgcmVzdWx0U3RhcnRDb2x1bW4sIHJlc3VsdEVuZExpbmVOdW1iZXIsIHJlc3VsdEVuZENvbHVtbik7XG4gIH1cbiAgLyoqXG4gICAqIFRlc3QgaWYgdGhpcyByYW5nZSBlcXVhbHMgb3RoZXIuXG4gICAqL1xuICBlcXVhbHNSYW5nZShvdGhlcikge1xuICAgIHJldHVybiBSYW5nZS5lcXVhbHNSYW5nZSh0aGlzLCBvdGhlcik7XG4gIH1cbiAgLyoqXG4gICAqIFRlc3QgaWYgcmFuZ2UgYGFgIGVxdWFscyBgYmAuXG4gICAqL1xuICBzdGF0aWMgZXF1YWxzUmFuZ2UoYSwgYikge1xuICAgIGlmICghYSAmJiAhYikge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiAhIWEgJiYgISFiICYmIGEuc3RhcnRMaW5lTnVtYmVyID09PSBiLnN0YXJ0TGluZU51bWJlciAmJiBhLnN0YXJ0Q29sdW1uID09PSBiLnN0YXJ0Q29sdW1uICYmIGEuZW5kTGluZU51bWJlciA9PT0gYi5lbmRMaW5lTnVtYmVyICYmIGEuZW5kQ29sdW1uID09PSBiLmVuZENvbHVtbjtcbiAgfVxuICAvKipcbiAgICogUmV0dXJuIHRoZSBlbmQgcG9zaXRpb24gKHdoaWNoIHdpbGwgYmUgYWZ0ZXIgb3IgZXF1YWwgdG8gdGhlIHN0YXJ0IHBvc2l0aW9uKVxuICAgKi9cbiAgZ2V0RW5kUG9zaXRpb24oKSB7XG4gICAgcmV0dXJuIFJhbmdlLmdldEVuZFBvc2l0aW9uKHRoaXMpO1xuICB9XG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIGVuZCBwb3NpdGlvbiAod2hpY2ggd2lsbCBiZSBhZnRlciBvciBlcXVhbCB0byB0aGUgc3RhcnQgcG9zaXRpb24pXG4gICAqL1xuICBzdGF0aWMgZ2V0RW5kUG9zaXRpb24ocmFuZ2UpIHtcbiAgICByZXR1cm4gbmV3IFBvc2l0aW9uKHJhbmdlLmVuZExpbmVOdW1iZXIsIHJhbmdlLmVuZENvbHVtbik7XG4gIH1cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgc3RhcnQgcG9zaXRpb24gKHdoaWNoIHdpbGwgYmUgYmVmb3JlIG9yIGVxdWFsIHRvIHRoZSBlbmQgcG9zaXRpb24pXG4gICAqL1xuICBnZXRTdGFydFBvc2l0aW9uKCkge1xuICAgIHJldHVybiBSYW5nZS5nZXRTdGFydFBvc2l0aW9uKHRoaXMpO1xuICB9XG4gIC8qKlxuICAgKiBSZXR1cm4gdGhlIHN0YXJ0IHBvc2l0aW9uICh3aGljaCB3aWxsIGJlIGJlZm9yZSBvciBlcXVhbCB0byB0aGUgZW5kIHBvc2l0aW9uKVxuICAgKi9cbiAgc3RhdGljIGdldFN0YXJ0UG9zaXRpb24ocmFuZ2UpIHtcbiAgICByZXR1cm4gbmV3IFBvc2l0aW9uKHJhbmdlLnN0YXJ0TGluZU51bWJlciwgcmFuZ2Uuc3RhcnRDb2x1bW4pO1xuICB9XG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgZW1wdHkgcmFuZ2UgdXNpbmcgdGhpcyByYW5nZSdzIHN0YXJ0IHBvc2l0aW9uLlxuICAgKi9cbiAgY29sbGFwc2VUb1N0YXJ0KCkge1xuICAgIHJldHVybiBSYW5nZS5jb2xsYXBzZVRvU3RhcnQodGhpcyk7XG4gIH1cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBlbXB0eSByYW5nZSB1c2luZyB0aGlzIHJhbmdlJ3Mgc3RhcnQgcG9zaXRpb24uXG4gICAqL1xuICBzdGF0aWMgY29sbGFwc2VUb1N0YXJ0KHJhbmdlKSB7XG4gICAgcmV0dXJuIG5ldyBSYW5nZShyYW5nZS5zdGFydExpbmVOdW1iZXIsIHJhbmdlLnN0YXJ0Q29sdW1uLCByYW5nZS5zdGFydExpbmVOdW1iZXIsIHJhbmdlLnN0YXJ0Q29sdW1uKTtcbiAgfVxuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IGVtcHR5IHJhbmdlIHVzaW5nIHRoaXMgcmFuZ2UncyBlbmQgcG9zaXRpb24uXG4gICAqL1xuICBjb2xsYXBzZVRvRW5kKCkge1xuICAgIHJldHVybiBSYW5nZS5jb2xsYXBzZVRvRW5kKHRoaXMpO1xuICB9XG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgZW1wdHkgcmFuZ2UgdXNpbmcgdGhpcyByYW5nZSdzIGVuZCBwb3NpdGlvbi5cbiAgICovXG4gIHN0YXRpYyBjb2xsYXBzZVRvRW5kKHJhbmdlKSB7XG4gICAgcmV0dXJuIG5ldyBSYW5nZShyYW5nZS5lbmRMaW5lTnVtYmVyLCByYW5nZS5lbmRDb2x1bW4sIHJhbmdlLmVuZExpbmVOdW1iZXIsIHJhbmdlLmVuZENvbHVtbik7XG4gIH1cbiAgLy8gLS0tXG4gIHN0YXRpYyBmcm9tUG9zaXRpb25zKHN0YXJ0LCBlbmQgPSBzdGFydCkge1xuICAgIHJldHVybiBuZXcgUmFuZ2Uoc3RhcnQubGluZU51bWJlciwgc3RhcnQuY29sdW1uLCBlbmQubGluZU51bWJlciwgZW5kLmNvbHVtbik7XG4gIH1cbn1cblxuZnVuY3Rpb24gZmluZExhc3RNb25vdG9ub3VzKGFycmF5LCBwcmVkaWNhdGUpIHtcbiAgY29uc3QgaWR4ID0gZmluZExhc3RJZHhNb25vdG9ub3VzKGFycmF5LCBwcmVkaWNhdGUpO1xuICByZXR1cm4gaWR4ID09PSAtMSA/IHVuZGVmaW5lZCA6IGFycmF5W2lkeF07XG59XG5mdW5jdGlvbiBmaW5kTGFzdElkeE1vbm90b25vdXMoYXJyYXksIHByZWRpY2F0ZSwgc3RhcnRJZHggPSAwLCBlbmRJZHhFeCA9IGFycmF5Lmxlbmd0aCkge1xuICBsZXQgaSA9IHN0YXJ0SWR4O1xuICBsZXQgaiA9IGVuZElkeEV4O1xuICB3aGlsZSAoaSA8IGopIHtcbiAgICBjb25zdCBrID0gTWF0aC5mbG9vcigoaSArIGopIC8gMik7XG4gICAgaWYgKHByZWRpY2F0ZShhcnJheVtrXSkpIHtcbiAgICAgIGkgPSBrICsgMTtcbiAgICB9IGVsc2Uge1xuICAgICAgaiA9IGs7XG4gICAgfVxuICB9XG4gIHJldHVybiBpIC0gMTtcbn1cbmZ1bmN0aW9uIGZpbmRGaXJzdE1vbm90b25vdXMoYXJyYXksIHByZWRpY2F0ZSkge1xuICBjb25zdCBpZHggPSBmaW5kRmlyc3RJZHhNb25vdG9ub3VzT3JBcnJMZW4oYXJyYXksIHByZWRpY2F0ZSk7XG4gIHJldHVybiBpZHggPT09IGFycmF5Lmxlbmd0aCA/IHVuZGVmaW5lZCA6IGFycmF5W2lkeF07XG59XG5mdW5jdGlvbiBmaW5kRmlyc3RJZHhNb25vdG9ub3VzT3JBcnJMZW4oYXJyYXksIHByZWRpY2F0ZSwgc3RhcnRJZHggPSAwLCBlbmRJZHhFeCA9IGFycmF5Lmxlbmd0aCkge1xuICBsZXQgaSA9IHN0YXJ0SWR4O1xuICBsZXQgaiA9IGVuZElkeEV4O1xuICB3aGlsZSAoaSA8IGopIHtcbiAgICBjb25zdCBrID0gTWF0aC5mbG9vcigoaSArIGopIC8gMik7XG4gICAgaWYgKHByZWRpY2F0ZShhcnJheVtrXSkpIHtcbiAgICAgIGogPSBrO1xuICAgIH0gZWxzZSB7XG4gICAgICBpID0gayArIDE7XG4gICAgfVxuICB9XG4gIHJldHVybiBpO1xufVxuY2xhc3MgTW9ub3Rvbm91c0FycmF5IHtcbiAgY29uc3RydWN0b3IoX2FycmF5KSB7XG4gICAgdGhpcy5fYXJyYXkgPSBfYXJyYXk7XG4gICAgdGhpcy5fZmluZExhc3RNb25vdG9ub3VzTGFzdElkeCA9IDA7XG4gIH1cbiAgc3RhdGljIHtcbiAgICB0aGlzLmFzc2VydEludmFyaWFudHMgPSBmYWxzZTtcbiAgfVxuICAvKipcbiAgICogVGhlIHByZWRpY2F0ZSBtdXN0IGJlIG1vbm90b25vdXMsIGkuZS4gYGFyci5tYXAocHJlZGljYXRlKWAgbXVzdCBiZSBsaWtlIGBbdHJ1ZSwgLi4uLCB0cnVlLCBmYWxzZSwgLi4uLCBmYWxzZV1gIVxuICAgKiBGb3Igc3Vic2VxdWVudCBjYWxscywgY3VycmVudCBwcmVkaWNhdGUgbXVzdCBiZSB3ZWFrZXIgdGhhbiAob3IgZXF1YWwgdG8pIHRoZSBwcmV2aW91cyBwcmVkaWNhdGUsIGkuZS4gbW9yZSBlbnRyaWVzIG11c3QgYmUgYHRydWVgLlxuICAgKi9cbiAgZmluZExhc3RNb25vdG9ub3VzKHByZWRpY2F0ZSkge1xuICAgIGlmIChNb25vdG9ub3VzQXJyYXkuYXNzZXJ0SW52YXJpYW50cykge1xuICAgICAgaWYgKHRoaXMuX3ByZXZGaW5kTGFzdFByZWRpY2F0ZSkge1xuICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdGhpcy5fYXJyYXkpIHtcbiAgICAgICAgICBpZiAodGhpcy5fcHJldkZpbmRMYXN0UHJlZGljYXRlKGl0ZW0pICYmICFwcmVkaWNhdGUoaXRlbSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk1vbm90b25vdXNBcnJheTogY3VycmVudCBwcmVkaWNhdGUgbXVzdCBiZSB3ZWFrZXIgdGhhbiAob3IgZXF1YWwgdG8pIHRoZSBwcmV2aW91cyBwcmVkaWNhdGUuXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5fcHJldkZpbmRMYXN0UHJlZGljYXRlID0gcHJlZGljYXRlO1xuICAgIH1cbiAgICBjb25zdCBpZHggPSBmaW5kTGFzdElkeE1vbm90b25vdXModGhpcy5fYXJyYXksIHByZWRpY2F0ZSwgdGhpcy5fZmluZExhc3RNb25vdG9ub3VzTGFzdElkeCk7XG4gICAgdGhpcy5fZmluZExhc3RNb25vdG9ub3VzTGFzdElkeCA9IGlkeCArIDE7XG4gICAgcmV0dXJuIGlkeCA9PT0gLTEgPyB1bmRlZmluZWQgOiB0aGlzLl9hcnJheVtpZHhdO1xuICB9XG59XG5cbmNsYXNzIExpbmVSYW5nZSB7XG4gIHN0YXRpYyBmcm9tUmFuZ2VJbmNsdXNpdmUocmFuZ2UpIHtcbiAgICByZXR1cm4gbmV3IExpbmVSYW5nZShyYW5nZS5zdGFydExpbmVOdW1iZXIsIHJhbmdlLmVuZExpbmVOdW1iZXIgKyAxKTtcbiAgfVxuICBzdGF0aWMgam9pbihsaW5lUmFuZ2VzKSB7XG4gICAgaWYgKGxpbmVSYW5nZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aHJvdyBuZXcgQnVnSW5kaWNhdGluZ0Vycm9yKFwibGluZVJhbmdlcyBjYW5ub3QgYmUgZW1wdHlcIik7XG4gICAgfVxuICAgIGxldCBzdGFydExpbmVOdW1iZXIgPSBsaW5lUmFuZ2VzWzBdLnN0YXJ0TGluZU51bWJlcjtcbiAgICBsZXQgZW5kTGluZU51bWJlckV4Y2x1c2l2ZSA9IGxpbmVSYW5nZXNbMF0uZW5kTGluZU51bWJlckV4Y2x1c2l2ZTtcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IGxpbmVSYW5nZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHN0YXJ0TGluZU51bWJlciA9IE1hdGgubWluKHN0YXJ0TGluZU51bWJlciwgbGluZVJhbmdlc1tpXS5zdGFydExpbmVOdW1iZXIpO1xuICAgICAgZW5kTGluZU51bWJlckV4Y2x1c2l2ZSA9IE1hdGgubWF4KGVuZExpbmVOdW1iZXJFeGNsdXNpdmUsIGxpbmVSYW5nZXNbaV0uZW5kTGluZU51bWJlckV4Y2x1c2l2ZSk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgTGluZVJhbmdlKHN0YXJ0TGluZU51bWJlciwgZW5kTGluZU51bWJlckV4Y2x1c2l2ZSk7XG4gIH1cbiAgc3RhdGljIG9mTGVuZ3RoKHN0YXJ0TGluZU51bWJlciwgbGVuZ3RoKSB7XG4gICAgcmV0dXJuIG5ldyBMaW5lUmFuZ2Uoc3RhcnRMaW5lTnVtYmVyLCBzdGFydExpbmVOdW1iZXIgKyBsZW5ndGgpO1xuICB9XG4gIGNvbnN0cnVjdG9yKHN0YXJ0TGluZU51bWJlciwgZW5kTGluZU51bWJlckV4Y2x1c2l2ZSkge1xuICAgIGlmIChzdGFydExpbmVOdW1iZXIgPiBlbmRMaW5lTnVtYmVyRXhjbHVzaXZlKSB7XG4gICAgICB0aHJvdyBuZXcgQnVnSW5kaWNhdGluZ0Vycm9yKGBzdGFydExpbmVOdW1iZXIgJHtzdGFydExpbmVOdW1iZXJ9IGNhbm5vdCBiZSBhZnRlciBlbmRMaW5lTnVtYmVyRXhjbHVzaXZlICR7ZW5kTGluZU51bWJlckV4Y2x1c2l2ZX1gKTtcbiAgICB9XG4gICAgdGhpcy5zdGFydExpbmVOdW1iZXIgPSBzdGFydExpbmVOdW1iZXI7XG4gICAgdGhpcy5lbmRMaW5lTnVtYmVyRXhjbHVzaXZlID0gZW5kTGluZU51bWJlckV4Y2x1c2l2ZTtcbiAgfVxuICAvKipcbiAgICogSW5kaWNhdGVzIGlmIHRoaXMgbGluZSByYW5nZSBpcyBlbXB0eS5cbiAgICovXG4gIGdldCBpc0VtcHR5KCkge1xuICAgIHJldHVybiB0aGlzLnN0YXJ0TGluZU51bWJlciA9PT0gdGhpcy5lbmRMaW5lTnVtYmVyRXhjbHVzaXZlO1xuICB9XG4gIC8qKlxuICAgKiBNb3ZlcyB0aGlzIGxpbmUgcmFuZ2UgYnkgdGhlIGdpdmVuIG9mZnNldCBvZiBsaW5lIG51bWJlcnMuXG4gICAqL1xuICBkZWx0YShvZmZzZXQpIHtcbiAgICByZXR1cm4gbmV3IExpbmVSYW5nZSh0aGlzLnN0YXJ0TGluZU51bWJlciArIG9mZnNldCwgdGhpcy5lbmRMaW5lTnVtYmVyRXhjbHVzaXZlICsgb2Zmc2V0KTtcbiAgfVxuICAvKipcbiAgICogVGhlIG51bWJlciBvZiBsaW5lcyB0aGlzIGxpbmUgcmFuZ2Ugc3BhbnMuXG4gICAqL1xuICBnZXQgbGVuZ3RoKCkge1xuICAgIHJldHVybiB0aGlzLmVuZExpbmVOdW1iZXJFeGNsdXNpdmUgLSB0aGlzLnN0YXJ0TGluZU51bWJlcjtcbiAgfVxuICAvKipcbiAgICogQ3JlYXRlcyBhIGxpbmUgcmFuZ2UgdGhhdCBjb21iaW5lcyB0aGlzIGFuZCB0aGUgZ2l2ZW4gbGluZSByYW5nZS5cbiAgICovXG4gIGpvaW4ob3RoZXIpIHtcbiAgICByZXR1cm4gbmV3IExpbmVSYW5nZShcbiAgICAgIE1hdGgubWluKHRoaXMuc3RhcnRMaW5lTnVtYmVyLCBvdGhlci5zdGFydExpbmVOdW1iZXIpLFxuICAgICAgTWF0aC5tYXgodGhpcy5lbmRMaW5lTnVtYmVyRXhjbHVzaXZlLCBvdGhlci5lbmRMaW5lTnVtYmVyRXhjbHVzaXZlKVxuICAgICk7XG4gIH1cbiAgLyoqXG4gICAqIFRoZSByZXN1bHRpbmcgcmFuZ2UgaXMgZW1wdHkgaWYgdGhlIHJhbmdlcyBkbyBub3QgaW50ZXJzZWN0LCBidXQgdG91Y2guXG4gICAqIElmIHRoZSByYW5nZXMgZG9uJ3QgZXZlbiB0b3VjaCwgdGhlIHJlc3VsdCBpcyB1bmRlZmluZWQuXG4gICAqL1xuICBpbnRlcnNlY3Qob3RoZXIpIHtcbiAgICBjb25zdCBzdGFydExpbmVOdW1iZXIgPSBNYXRoLm1heCh0aGlzLnN0YXJ0TGluZU51bWJlciwgb3RoZXIuc3RhcnRMaW5lTnVtYmVyKTtcbiAgICBjb25zdCBlbmRMaW5lTnVtYmVyRXhjbHVzaXZlID0gTWF0aC5taW4odGhpcy5lbmRMaW5lTnVtYmVyRXhjbHVzaXZlLCBvdGhlci5lbmRMaW5lTnVtYmVyRXhjbHVzaXZlKTtcbiAgICBpZiAoc3RhcnRMaW5lTnVtYmVyIDw9IGVuZExpbmVOdW1iZXJFeGNsdXNpdmUpIHtcbiAgICAgIHJldHVybiBuZXcgTGluZVJhbmdlKHN0YXJ0TGluZU51bWJlciwgZW5kTGluZU51bWJlckV4Y2x1c2l2ZSk7XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbiAgb3ZlcmxhcE9yVG91Y2gob3RoZXIpIHtcbiAgICByZXR1cm4gdGhpcy5zdGFydExpbmVOdW1iZXIgPD0gb3RoZXIuZW5kTGluZU51bWJlckV4Y2x1c2l2ZSAmJiBvdGhlci5zdGFydExpbmVOdW1iZXIgPD0gdGhpcy5lbmRMaW5lTnVtYmVyRXhjbHVzaXZlO1xuICB9XG4gIHRvSW5jbHVzaXZlUmFuZ2UoKSB7XG4gICAgaWYgKHRoaXMuaXNFbXB0eSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBuZXcgUmFuZ2UodGhpcy5zdGFydExpbmVOdW1iZXIsIDEsIHRoaXMuZW5kTGluZU51bWJlckV4Y2x1c2l2ZSAtIDEsIE51bWJlci5NQVhfU0FGRV9JTlRFR0VSKTtcbiAgfVxuICAvKipcbiAgICogQ29udmVydHMgdGhpcyAxLWJhc2VkIGxpbmUgcmFuZ2UgdG8gYSAwLWJhc2VkIG9mZnNldCByYW5nZSAoc3VidHJhY3RzIDEhKS5cbiAgICogQGludGVybmFsXG4gICAqL1xuICB0b09mZnNldFJhbmdlKCkge1xuICAgIHJldHVybiBuZXcgT2Zmc2V0UmFuZ2UodGhpcy5zdGFydExpbmVOdW1iZXIgLSAxLCB0aGlzLmVuZExpbmVOdW1iZXJFeGNsdXNpdmUgLSAxKTtcbiAgfVxufVxuY2xhc3MgTGluZVJhbmdlU2V0IHtcbiAgY29uc3RydWN0b3IoX25vcm1hbGl6ZWRSYW5nZXMgPSBbXSkge1xuICAgIHRoaXMuX25vcm1hbGl6ZWRSYW5nZXMgPSBfbm9ybWFsaXplZFJhbmdlcztcbiAgfVxuICBnZXQgcmFuZ2VzKCkge1xuICAgIHJldHVybiB0aGlzLl9ub3JtYWxpemVkUmFuZ2VzO1xuICB9XG4gIGFkZFJhbmdlKHJhbmdlKSB7XG4gICAgaWYgKHJhbmdlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBqb2luUmFuZ2VTdGFydElkeCA9IGZpbmRGaXJzdElkeE1vbm90b25vdXNPckFyckxlbih0aGlzLl9ub3JtYWxpemVkUmFuZ2VzLCAocikgPT4gci5lbmRMaW5lTnVtYmVyRXhjbHVzaXZlID49IHJhbmdlLnN0YXJ0TGluZU51bWJlcik7XG4gICAgY29uc3Qgam9pblJhbmdlRW5kSWR4RXhjbHVzaXZlID0gZmluZExhc3RJZHhNb25vdG9ub3VzKHRoaXMuX25vcm1hbGl6ZWRSYW5nZXMsIChyKSA9PiByLnN0YXJ0TGluZU51bWJlciA8PSByYW5nZS5lbmRMaW5lTnVtYmVyRXhjbHVzaXZlKSArIDE7XG4gICAgaWYgKGpvaW5SYW5nZVN0YXJ0SWR4ID09PSBqb2luUmFuZ2VFbmRJZHhFeGNsdXNpdmUpIHtcbiAgICAgIHRoaXMuX25vcm1hbGl6ZWRSYW5nZXMuc3BsaWNlKGpvaW5SYW5nZVN0YXJ0SWR4LCAwLCByYW5nZSk7XG4gICAgfSBlbHNlIGlmIChqb2luUmFuZ2VTdGFydElkeCA9PT0gam9pblJhbmdlRW5kSWR4RXhjbHVzaXZlIC0gMSkge1xuICAgICAgY29uc3Qgam9pblJhbmdlID0gdGhpcy5fbm9ybWFsaXplZFJhbmdlc1tqb2luUmFuZ2VTdGFydElkeF07XG4gICAgICB0aGlzLl9ub3JtYWxpemVkUmFuZ2VzW2pvaW5SYW5nZVN0YXJ0SWR4XSA9IGpvaW5SYW5nZS5qb2luKHJhbmdlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgam9pblJhbmdlID0gdGhpcy5fbm9ybWFsaXplZFJhbmdlc1tqb2luUmFuZ2VTdGFydElkeF0uam9pbih0aGlzLl9ub3JtYWxpemVkUmFuZ2VzW2pvaW5SYW5nZUVuZElkeEV4Y2x1c2l2ZSAtIDFdKS5qb2luKHJhbmdlKTtcbiAgICAgIHRoaXMuX25vcm1hbGl6ZWRSYW5nZXMuc3BsaWNlKGpvaW5SYW5nZVN0YXJ0SWR4LCBqb2luUmFuZ2VFbmRJZHhFeGNsdXNpdmUgLSBqb2luUmFuZ2VTdGFydElkeCwgam9pblJhbmdlKTtcbiAgICB9XG4gIH1cbiAgY29udGFpbnMobGluZU51bWJlcikge1xuICAgIGNvbnN0IHJhbmdlVGhhdFN0YXJ0c0JlZm9yZUVuZCA9IGZpbmRMYXN0TW9ub3Rvbm91cyh0aGlzLl9ub3JtYWxpemVkUmFuZ2VzLCAocikgPT4gci5zdGFydExpbmVOdW1iZXIgPD0gbGluZU51bWJlcik7XG4gICAgcmV0dXJuICEhcmFuZ2VUaGF0U3RhcnRzQmVmb3JlRW5kICYmIHJhbmdlVGhhdFN0YXJ0c0JlZm9yZUVuZC5lbmRMaW5lTnVtYmVyRXhjbHVzaXZlID4gbGluZU51bWJlcjtcbiAgfVxuICAvKipcbiAgICogU3VidHJhY3RzIGFsbCByYW5nZXMgaW4gdGhpcyBzZXQgZnJvbSBgcmFuZ2VgIGFuZCByZXR1cm5zIHRoZSByZXN1bHQuXG4gICAqL1xuICBzdWJ0cmFjdEZyb20ocmFuZ2UpIHtcbiAgICBjb25zdCBqb2luUmFuZ2VTdGFydElkeCA9IGZpbmRGaXJzdElkeE1vbm90b25vdXNPckFyckxlbih0aGlzLl9ub3JtYWxpemVkUmFuZ2VzLCAocikgPT4gci5lbmRMaW5lTnVtYmVyRXhjbHVzaXZlID49IHJhbmdlLnN0YXJ0TGluZU51bWJlcik7XG4gICAgY29uc3Qgam9pblJhbmdlRW5kSWR4RXhjbHVzaXZlID0gZmluZExhc3RJZHhNb25vdG9ub3VzKHRoaXMuX25vcm1hbGl6ZWRSYW5nZXMsIChyKSA9PiByLnN0YXJ0TGluZU51bWJlciA8PSByYW5nZS5lbmRMaW5lTnVtYmVyRXhjbHVzaXZlKSArIDE7XG4gICAgaWYgKGpvaW5SYW5nZVN0YXJ0SWR4ID09PSBqb2luUmFuZ2VFbmRJZHhFeGNsdXNpdmUpIHtcbiAgICAgIHJldHVybiBuZXcgTGluZVJhbmdlU2V0KFtyYW5nZV0pO1xuICAgIH1cbiAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICBsZXQgc3RhcnRMaW5lTnVtYmVyID0gcmFuZ2Uuc3RhcnRMaW5lTnVtYmVyO1xuICAgIGZvciAobGV0IGkgPSBqb2luUmFuZ2VTdGFydElkeDsgaSA8IGpvaW5SYW5nZUVuZElkeEV4Y2x1c2l2ZTsgaSsrKSB7XG4gICAgICBjb25zdCByID0gdGhpcy5fbm9ybWFsaXplZFJhbmdlc1tpXTtcbiAgICAgIGlmIChyLnN0YXJ0TGluZU51bWJlciA+IHN0YXJ0TGluZU51bWJlcikge1xuICAgICAgICByZXN1bHQucHVzaChuZXcgTGluZVJhbmdlKHN0YXJ0TGluZU51bWJlciwgci5zdGFydExpbmVOdW1iZXIpKTtcbiAgICAgIH1cbiAgICAgIHN0YXJ0TGluZU51bWJlciA9IHIuZW5kTGluZU51bWJlckV4Y2x1c2l2ZTtcbiAgICB9XG4gICAgaWYgKHN0YXJ0TGluZU51bWJlciA8IHJhbmdlLmVuZExpbmVOdW1iZXJFeGNsdXNpdmUpIHtcbiAgICAgIHJlc3VsdC5wdXNoKG5ldyBMaW5lUmFuZ2Uoc3RhcnRMaW5lTnVtYmVyLCByYW5nZS5lbmRMaW5lTnVtYmVyRXhjbHVzaXZlKSk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgTGluZVJhbmdlU2V0KHJlc3VsdCk7XG4gIH1cbiAgZ2V0SW50ZXJzZWN0aW9uKG90aGVyKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgbGV0IGkxID0gMDtcbiAgICBsZXQgaTIgPSAwO1xuICAgIHdoaWxlIChpMSA8IHRoaXMuX25vcm1hbGl6ZWRSYW5nZXMubGVuZ3RoICYmIGkyIDwgb3RoZXIuX25vcm1hbGl6ZWRSYW5nZXMubGVuZ3RoKSB7XG4gICAgICBjb25zdCByMSA9IHRoaXMuX25vcm1hbGl6ZWRSYW5nZXNbaTFdO1xuICAgICAgY29uc3QgcjIgPSBvdGhlci5fbm9ybWFsaXplZFJhbmdlc1tpMl07XG4gICAgICBjb25zdCBpID0gcjEuaW50ZXJzZWN0KHIyKTtcbiAgICAgIGlmIChpICYmICFpLmlzRW1wdHkpIHtcbiAgICAgICAgcmVzdWx0LnB1c2goaSk7XG4gICAgICB9XG4gICAgICBpZiAocjEuZW5kTGluZU51bWJlckV4Y2x1c2l2ZSA8IHIyLmVuZExpbmVOdW1iZXJFeGNsdXNpdmUpIHtcbiAgICAgICAgaTErKztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGkyKys7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBuZXcgTGluZVJhbmdlU2V0KHJlc3VsdCk7XG4gIH1cbiAgZ2V0V2l0aERlbHRhKHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBMaW5lUmFuZ2VTZXQodGhpcy5fbm9ybWFsaXplZFJhbmdlcy5tYXAoKHIpID0+IHIuZGVsdGEodmFsdWUpKSk7XG4gIH1cbn1cblxuY2xhc3MgVGV4dExlbmd0aCB7XG4gIGNvbnN0cnVjdG9yKGxpbmVDb3VudCwgY29sdW1uQ291bnQpIHtcbiAgICB0aGlzLmxpbmVDb3VudCA9IGxpbmVDb3VudDtcbiAgICB0aGlzLmNvbHVtbkNvdW50ID0gY29sdW1uQ291bnQ7XG4gIH1cbiAgc3RhdGljIHtcbiAgICB0aGlzLnplcm8gPSBuZXcgVGV4dExlbmd0aCgwLCAwKTtcbiAgfVxuICB0b0xpbmVSYW5nZSgpIHtcbiAgICByZXR1cm4gTGluZVJhbmdlLm9mTGVuZ3RoKDEsIHRoaXMubGluZUNvdW50KTtcbiAgfVxuICBhZGRUb1Bvc2l0aW9uKHBvc2l0aW9uKSB7XG4gICAgaWYgKHRoaXMubGluZUNvdW50ID09PSAwKSB7XG4gICAgICByZXR1cm4gbmV3IFBvc2l0aW9uKHBvc2l0aW9uLmxpbmVOdW1iZXIsIHBvc2l0aW9uLmNvbHVtbiArIHRoaXMuY29sdW1uQ291bnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbmV3IFBvc2l0aW9uKHBvc2l0aW9uLmxpbmVOdW1iZXIgKyB0aGlzLmxpbmVDb3VudCwgdGhpcy5jb2x1bW5Db3VudCArIDEpO1xuICAgIH1cbiAgfVxufVxuXG4gXG5jbGFzcyBMaW5lQmFzZWRUZXh0ICB7XG4gIGNvbnN0cnVjdG9yKF9nZXRMaW5lQ29udGVudCwgX2xpbmVDb3VudCkge1xuICAgIGFzc2VydChfbGluZUNvdW50ID49IDEpO1xuICAgIHRoaXMuX2dldExpbmVDb250ZW50ID0gX2dldExpbmVDb250ZW50O1xuICAgIHRoaXMuX2xpbmVDb3VudCA9IF9saW5lQ291bnQ7XG4gIH1cbiAgZ2V0VmFsdWVPZlJhbmdlKHJhbmdlKSB7XG4gICAgaWYgKHJhbmdlLnN0YXJ0TGluZU51bWJlciA9PT0gcmFuZ2UuZW5kTGluZU51bWJlcikge1xuICAgICAgcmV0dXJuIHRoaXMuX2dldExpbmVDb250ZW50KHJhbmdlLnN0YXJ0TGluZU51bWJlcikuc3Vic3RyaW5nKHJhbmdlLnN0YXJ0Q29sdW1uIC0gMSwgcmFuZ2UuZW5kQ29sdW1uIC0gMSk7XG4gICAgfVxuICAgIGxldCByZXN1bHQgPSB0aGlzLl9nZXRMaW5lQ29udGVudChyYW5nZS5zdGFydExpbmVOdW1iZXIpLnN1YnN0cmluZyhyYW5nZS5zdGFydENvbHVtbiAtIDEpO1xuICAgIGZvciAobGV0IGkgPSByYW5nZS5zdGFydExpbmVOdW1iZXIgKyAxOyBpIDwgcmFuZ2UuZW5kTGluZU51bWJlcjsgaSsrKSB7XG4gICAgICByZXN1bHQgKz0gXCJcXG5cIiArIHRoaXMuX2dldExpbmVDb250ZW50KGkpO1xuICAgIH1cbiAgICByZXN1bHQgKz0gXCJcXG5cIiArIHRoaXMuX2dldExpbmVDb250ZW50KHJhbmdlLmVuZExpbmVOdW1iZXIpLnN1YnN0cmluZygwLCByYW5nZS5lbmRDb2x1bW4gLSAxKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIGdldExpbmVMZW5ndGgobGluZU51bWJlcikge1xuICAgIHJldHVybiB0aGlzLl9nZXRMaW5lQ29udGVudChsaW5lTnVtYmVyKS5sZW5ndGg7XG4gIH1cbiAgZ2V0IGxlbmd0aCgpIHtcbiAgICBjb25zdCBsYXN0TGluZSA9IHRoaXMuX2dldExpbmVDb250ZW50KHRoaXMuX2xpbmVDb3VudCk7XG4gICAgcmV0dXJuIG5ldyBUZXh0TGVuZ3RoKHRoaXMuX2xpbmVDb3VudCAtIDEsIGxhc3RMaW5lLmxlbmd0aCk7XG4gIH1cbn1cbmNsYXNzIEFycmF5VGV4dCBleHRlbmRzIExpbmVCYXNlZFRleHQge1xuICBjb25zdHJ1Y3RvcihsaW5lcykge1xuICAgIHN1cGVyKFxuICAgICAgKGxpbmVOdW1iZXIpID0+IGxpbmVzW2xpbmVOdW1iZXIgLSAxXSxcbiAgICAgIGxpbmVzLmxlbmd0aFxuICAgICk7XG4gIH1cbn1cblxuY2xhc3MgTGluZXNEaWZmIHtcbiAgY29uc3RydWN0b3IoY2hhbmdlcywgbW92ZXMsIGhpdFRpbWVvdXQpIHtcbiAgICB0aGlzLmNoYW5nZXMgPSBjaGFuZ2VzO1xuICAgIHRoaXMubW92ZXMgPSBtb3ZlcztcbiAgICB0aGlzLmhpdFRpbWVvdXQgPSBoaXRUaW1lb3V0O1xuICB9XG59XG5jbGFzcyBNb3ZlZFRleHQge1xuICBjb25zdHJ1Y3RvcihsaW5lUmFuZ2VNYXBwaW5nLCBjaGFuZ2VzKSB7XG4gICAgdGhpcy5saW5lUmFuZ2VNYXBwaW5nID0gbGluZVJhbmdlTWFwcGluZztcbiAgICB0aGlzLmNoYW5nZXMgPSBjaGFuZ2VzO1xuICB9XG59XG5cbmNsYXNzIExpbmVSYW5nZU1hcHBpbmcge1xuICBjb25zdHJ1Y3RvcihvcmlnaW5hbFJhbmdlLCBtb2RpZmllZFJhbmdlKSB7XG4gICAgdGhpcy5vcmlnaW5hbCA9IG9yaWdpbmFsUmFuZ2U7XG4gICAgdGhpcy5tb2RpZmllZCA9IG1vZGlmaWVkUmFuZ2U7XG4gIH1cbiAgam9pbihvdGhlcikge1xuICAgIHJldHVybiBuZXcgTGluZVJhbmdlTWFwcGluZyhcbiAgICAgIHRoaXMub3JpZ2luYWwuam9pbihvdGhlci5vcmlnaW5hbCksXG4gICAgICB0aGlzLm1vZGlmaWVkLmpvaW4ob3RoZXIubW9kaWZpZWQpXG4gICAgKTtcbiAgfVxuICBnZXQgY2hhbmdlZExpbmVDb3VudCgpIHtcbiAgICByZXR1cm4gTWF0aC5tYXgodGhpcy5vcmlnaW5hbC5sZW5ndGgsIHRoaXMubW9kaWZpZWQubGVuZ3RoKTtcbiAgfVxuICAvKipcbiAgICogVGhpcyBtZXRob2QgYXNzdW1lcyB0aGF0IHRoZSBMaW5lUmFuZ2VNYXBwaW5nIGRlc2NyaWJlcyBhIHZhbGlkIGRpZmYhXG4gICAqIEkuZS4gaWYgb25lIHJhbmdlIGlzIGVtcHR5LCB0aGUgb3RoZXIgcmFuZ2UgY2Fubm90IGJlIHRoZSBlbnRpcmUgZG9jdW1lbnQuXG4gICAqIEl0IGF2b2lkcyB2YXJpb3VzIHByb2JsZW1zIHdoZW4gdGhlIGxpbmUgcmFuZ2UgcG9pbnRzIHRvIG5vbi1leGlzdGluZyBsaW5lLW51bWJlcnMuXG4gICovXG4gIHRvUmFuZ2VNYXBwaW5nKCkge1xuICAgIGNvbnN0IG9yaWdJbmNsdXNpdmVSYW5nZSA9IHRoaXMub3JpZ2luYWwudG9JbmNsdXNpdmVSYW5nZSgpO1xuICAgIGNvbnN0IG1vZEluY2x1c2l2ZVJhbmdlID0gdGhpcy5tb2RpZmllZC50b0luY2x1c2l2ZVJhbmdlKCk7XG4gICAgaWYgKG9yaWdJbmNsdXNpdmVSYW5nZSAmJiBtb2RJbmNsdXNpdmVSYW5nZSkge1xuICAgICAgcmV0dXJuIG5ldyBSYW5nZU1hcHBpbmcob3JpZ0luY2x1c2l2ZVJhbmdlLCBtb2RJbmNsdXNpdmVSYW5nZSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLm9yaWdpbmFsLnN0YXJ0TGluZU51bWJlciA9PT0gMSB8fCB0aGlzLm1vZGlmaWVkLnN0YXJ0TGluZU51bWJlciA9PT0gMSkge1xuICAgICAgaWYgKCEodGhpcy5tb2RpZmllZC5zdGFydExpbmVOdW1iZXIgPT09IDEgJiYgdGhpcy5vcmlnaW5hbC5zdGFydExpbmVOdW1iZXIgPT09IDEpKSB7XG4gICAgICAgIHRocm93IG5ldyBCdWdJbmRpY2F0aW5nRXJyb3IoXCJub3QgYSB2YWxpZCBkaWZmXCIpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5ldyBSYW5nZU1hcHBpbmcoXG4gICAgICAgIG5ldyBSYW5nZSh0aGlzLm9yaWdpbmFsLnN0YXJ0TGluZU51bWJlciwgMSwgdGhpcy5vcmlnaW5hbC5lbmRMaW5lTnVtYmVyRXhjbHVzaXZlLCAxKSxcbiAgICAgICAgbmV3IFJhbmdlKHRoaXMubW9kaWZpZWQuc3RhcnRMaW5lTnVtYmVyLCAxLCB0aGlzLm1vZGlmaWVkLmVuZExpbmVOdW1iZXJFeGNsdXNpdmUsIDEpXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbmV3IFJhbmdlTWFwcGluZyhcbiAgICAgICAgbmV3IFJhbmdlKHRoaXMub3JpZ2luYWwuc3RhcnRMaW5lTnVtYmVyIC0gMSwgTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIsIHRoaXMub3JpZ2luYWwuZW5kTGluZU51bWJlckV4Y2x1c2l2ZSAtIDEsIE51bWJlci5NQVhfU0FGRV9JTlRFR0VSKSxcbiAgICAgICAgbmV3IFJhbmdlKHRoaXMubW9kaWZpZWQuc3RhcnRMaW5lTnVtYmVyIC0gMSwgTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIsIHRoaXMubW9kaWZpZWQuZW5kTGluZU51bWJlckV4Y2x1c2l2ZSAtIDEsIE51bWJlci5NQVhfU0FGRV9JTlRFR0VSKVxuICAgICAgKTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIFRoaXMgbWV0aG9kIGFzc3VtZXMgdGhhdCB0aGUgTGluZVJhbmdlTWFwcGluZyBkZXNjcmliZXMgYSB2YWxpZCBkaWZmIVxuICAgKiBJLmUuIGlmIG9uZSByYW5nZSBpcyBlbXB0eSwgdGhlIG90aGVyIHJhbmdlIGNhbm5vdCBiZSB0aGUgZW50aXJlIGRvY3VtZW50LlxuICAgKiBJdCBhdm9pZHMgdmFyaW91cyBwcm9ibGVtcyB3aGVuIHRoZSBsaW5lIHJhbmdlIHBvaW50cyB0byBub24tZXhpc3RpbmcgbGluZS1udW1iZXJzLlxuICAqL1xuICB0b1JhbmdlTWFwcGluZzIob3JpZ2luYWwsIG1vZGlmaWVkKSB7XG4gICAgaWYgKGlzVmFsaWRMaW5lTnVtYmVyKHRoaXMub3JpZ2luYWwuZW5kTGluZU51bWJlckV4Y2x1c2l2ZSwgb3JpZ2luYWwpICYmIGlzVmFsaWRMaW5lTnVtYmVyKHRoaXMubW9kaWZpZWQuZW5kTGluZU51bWJlckV4Y2x1c2l2ZSwgbW9kaWZpZWQpKSB7XG4gICAgICByZXR1cm4gbmV3IFJhbmdlTWFwcGluZyhcbiAgICAgICAgbmV3IFJhbmdlKHRoaXMub3JpZ2luYWwuc3RhcnRMaW5lTnVtYmVyLCAxLCB0aGlzLm9yaWdpbmFsLmVuZExpbmVOdW1iZXJFeGNsdXNpdmUsIDEpLFxuICAgICAgICBuZXcgUmFuZ2UodGhpcy5tb2RpZmllZC5zdGFydExpbmVOdW1iZXIsIDEsIHRoaXMubW9kaWZpZWQuZW5kTGluZU51bWJlckV4Y2x1c2l2ZSwgMSlcbiAgICAgICk7XG4gICAgfVxuICAgIGlmICghdGhpcy5vcmlnaW5hbC5pc0VtcHR5ICYmICF0aGlzLm1vZGlmaWVkLmlzRW1wdHkpIHtcbiAgICAgIHJldHVybiBuZXcgUmFuZ2VNYXBwaW5nKFxuICAgICAgICBSYW5nZS5mcm9tUG9zaXRpb25zKFxuICAgICAgICAgIG5ldyBQb3NpdGlvbih0aGlzLm9yaWdpbmFsLnN0YXJ0TGluZU51bWJlciwgMSksXG4gICAgICAgICAgbm9ybWFsaXplUG9zaXRpb24obmV3IFBvc2l0aW9uKHRoaXMub3JpZ2luYWwuZW5kTGluZU51bWJlckV4Y2x1c2l2ZSAtIDEsIE51bWJlci5NQVhfU0FGRV9JTlRFR0VSKSwgb3JpZ2luYWwpXG4gICAgICAgICksXG4gICAgICAgIFJhbmdlLmZyb21Qb3NpdGlvbnMoXG4gICAgICAgICAgbmV3IFBvc2l0aW9uKHRoaXMubW9kaWZpZWQuc3RhcnRMaW5lTnVtYmVyLCAxKSxcbiAgICAgICAgICBub3JtYWxpemVQb3NpdGlvbihuZXcgUG9zaXRpb24odGhpcy5tb2RpZmllZC5lbmRMaW5lTnVtYmVyRXhjbHVzaXZlIC0gMSwgTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIpLCBtb2RpZmllZClcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKHRoaXMub3JpZ2luYWwuc3RhcnRMaW5lTnVtYmVyID4gMSAmJiB0aGlzLm1vZGlmaWVkLnN0YXJ0TGluZU51bWJlciA+IDEpIHtcbiAgICAgIHJldHVybiBuZXcgUmFuZ2VNYXBwaW5nKFxuICAgICAgICBSYW5nZS5mcm9tUG9zaXRpb25zKFxuICAgICAgICAgIG5vcm1hbGl6ZVBvc2l0aW9uKG5ldyBQb3NpdGlvbih0aGlzLm9yaWdpbmFsLnN0YXJ0TGluZU51bWJlciAtIDEsIE51bWJlci5NQVhfU0FGRV9JTlRFR0VSKSwgb3JpZ2luYWwpLFxuICAgICAgICAgIG5vcm1hbGl6ZVBvc2l0aW9uKG5ldyBQb3NpdGlvbih0aGlzLm9yaWdpbmFsLmVuZExpbmVOdW1iZXJFeGNsdXNpdmUgLSAxLCBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUiksIG9yaWdpbmFsKVxuICAgICAgICApLFxuICAgICAgICBSYW5nZS5mcm9tUG9zaXRpb25zKFxuICAgICAgICAgIG5vcm1hbGl6ZVBvc2l0aW9uKG5ldyBQb3NpdGlvbih0aGlzLm1vZGlmaWVkLnN0YXJ0TGluZU51bWJlciAtIDEsIE51bWJlci5NQVhfU0FGRV9JTlRFR0VSKSwgbW9kaWZpZWQpLFxuICAgICAgICAgIG5vcm1hbGl6ZVBvc2l0aW9uKG5ldyBQb3NpdGlvbih0aGlzLm1vZGlmaWVkLmVuZExpbmVOdW1iZXJFeGNsdXNpdmUgLSAxLCBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUiksIG1vZGlmaWVkKVxuICAgICAgICApXG4gICAgICApO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgQnVnSW5kaWNhdGluZ0Vycm9yKCk7XG4gIH1cbn1cbmZ1bmN0aW9uIG5vcm1hbGl6ZVBvc2l0aW9uKHBvc2l0aW9uLCBjb250ZW50KSB7XG4gIGlmIChwb3NpdGlvbi5saW5lTnVtYmVyIDwgMSkge1xuICAgIHJldHVybiBuZXcgUG9zaXRpb24oMSwgMSk7XG4gIH1cbiAgaWYgKHBvc2l0aW9uLmxpbmVOdW1iZXIgPiBjb250ZW50Lmxlbmd0aCkge1xuICAgIHJldHVybiBuZXcgUG9zaXRpb24oY29udGVudC5sZW5ndGgsIGNvbnRlbnRbY29udGVudC5sZW5ndGggLSAxXS5sZW5ndGggKyAxKTtcbiAgfVxuICBjb25zdCBsaW5lID0gY29udGVudFtwb3NpdGlvbi5saW5lTnVtYmVyIC0gMV07XG4gIGlmIChwb3NpdGlvbi5jb2x1bW4gPiBsaW5lLmxlbmd0aCArIDEpIHtcbiAgICByZXR1cm4gbmV3IFBvc2l0aW9uKHBvc2l0aW9uLmxpbmVOdW1iZXIsIGxpbmUubGVuZ3RoICsgMSk7XG4gIH1cbiAgcmV0dXJuIHBvc2l0aW9uO1xufVxuZnVuY3Rpb24gaXNWYWxpZExpbmVOdW1iZXIobGluZU51bWJlciwgbGluZXMpIHtcbiAgcmV0dXJuIGxpbmVOdW1iZXIgPj0gMSAmJiBsaW5lTnVtYmVyIDw9IGxpbmVzLmxlbmd0aDtcbn1cbmNsYXNzIERldGFpbGVkTGluZVJhbmdlTWFwcGluZyBleHRlbmRzIExpbmVSYW5nZU1hcHBpbmcge1xuICBzdGF0aWMgZnJvbVJhbmdlTWFwcGluZ3MocmFuZ2VNYXBwaW5ncykge1xuICAgIGNvbnN0IG9yaWdpbmFsUmFuZ2UgPSBMaW5lUmFuZ2Uuam9pbihyYW5nZU1hcHBpbmdzLm1hcCgocikgPT4gTGluZVJhbmdlLmZyb21SYW5nZUluY2x1c2l2ZShyLm9yaWdpbmFsUmFuZ2UpKSk7XG4gICAgY29uc3QgbW9kaWZpZWRSYW5nZSA9IExpbmVSYW5nZS5qb2luKHJhbmdlTWFwcGluZ3MubWFwKChyKSA9PiBMaW5lUmFuZ2UuZnJvbVJhbmdlSW5jbHVzaXZlKHIubW9kaWZpZWRSYW5nZSkpKTtcbiAgICByZXR1cm4gbmV3IERldGFpbGVkTGluZVJhbmdlTWFwcGluZyhvcmlnaW5hbFJhbmdlLCBtb2RpZmllZFJhbmdlLCByYW5nZU1hcHBpbmdzKTtcbiAgfVxuICBjb25zdHJ1Y3RvcihvcmlnaW5hbFJhbmdlLCBtb2RpZmllZFJhbmdlLCBpbm5lckNoYW5nZXMpIHtcbiAgICBzdXBlcihvcmlnaW5hbFJhbmdlLCBtb2RpZmllZFJhbmdlKTtcbiAgICB0aGlzLmlubmVyQ2hhbmdlcyA9IGlubmVyQ2hhbmdlcztcbiAgfVxuICBmbGlwKCkge1xuICAgIHJldHVybiBuZXcgRGV0YWlsZWRMaW5lUmFuZ2VNYXBwaW5nKHRoaXMubW9kaWZpZWQsIHRoaXMub3JpZ2luYWwsIHRoaXMuaW5uZXJDaGFuZ2VzPy5tYXAoKGMpID0+IGMuZmxpcCgpKSk7XG4gIH1cbiAgd2l0aElubmVyQ2hhbmdlc0Zyb21MaW5lUmFuZ2VzKCkge1xuICAgIHJldHVybiBuZXcgRGV0YWlsZWRMaW5lUmFuZ2VNYXBwaW5nKHRoaXMub3JpZ2luYWwsIHRoaXMubW9kaWZpZWQsIFt0aGlzLnRvUmFuZ2VNYXBwaW5nKCldKTtcbiAgfVxufVxuY2xhc3MgUmFuZ2VNYXBwaW5nIHtcbiAgc3RhdGljIGpvaW4ocmFuZ2VNYXBwaW5ncykge1xuICAgIGlmIChyYW5nZU1hcHBpbmdzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhyb3cgbmV3IEJ1Z0luZGljYXRpbmdFcnJvcihcIkNhbm5vdCBqb2luIGFuIGVtcHR5IGxpc3Qgb2YgcmFuZ2UgbWFwcGluZ3NcIik7XG4gICAgfVxuICAgIGxldCByZXN1bHQgPSByYW5nZU1hcHBpbmdzWzBdO1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgcmFuZ2VNYXBwaW5ncy5sZW5ndGg7IGkrKykge1xuICAgICAgcmVzdWx0ID0gcmVzdWx0LmpvaW4ocmFuZ2VNYXBwaW5nc1tpXSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgc3RhdGljIGFzc2VydFNvcnRlZChyYW5nZU1hcHBpbmdzKSB7XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCByYW5nZU1hcHBpbmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBwcmV2aW91cyA9IHJhbmdlTWFwcGluZ3NbaSAtIDFdO1xuICAgICAgY29uc3QgY3VycmVudCA9IHJhbmdlTWFwcGluZ3NbaV07XG4gICAgICBpZiAoIShwcmV2aW91cy5vcmlnaW5hbFJhbmdlLmdldEVuZFBvc2l0aW9uKCkuaXNCZWZvcmVPckVxdWFsKGN1cnJlbnQub3JpZ2luYWxSYW5nZS5nZXRTdGFydFBvc2l0aW9uKCkpICYmIHByZXZpb3VzLm1vZGlmaWVkUmFuZ2UuZ2V0RW5kUG9zaXRpb24oKS5pc0JlZm9yZU9yRXF1YWwoY3VycmVudC5tb2RpZmllZFJhbmdlLmdldFN0YXJ0UG9zaXRpb24oKSkpKSB7XG4gICAgICAgIHRocm93IG5ldyBCdWdJbmRpY2F0aW5nRXJyb3IoXCJSYW5nZSBtYXBwaW5ncyBtdXN0IGJlIHNvcnRlZFwiKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgY29uc3RydWN0b3Iob3JpZ2luYWxSYW5nZSwgbW9kaWZpZWRSYW5nZSkge1xuICAgIHRoaXMub3JpZ2luYWxSYW5nZSA9IG9yaWdpbmFsUmFuZ2U7XG4gICAgdGhpcy5tb2RpZmllZFJhbmdlID0gbW9kaWZpZWRSYW5nZTtcbiAgfVxuICBmbGlwKCkge1xuICAgIHJldHVybiBuZXcgUmFuZ2VNYXBwaW5nKHRoaXMubW9kaWZpZWRSYW5nZSwgdGhpcy5vcmlnaW5hbFJhbmdlKTtcbiAgfVxuICAvKipcbiAgICogQ3JlYXRlcyBhIHNpbmdsZSB0ZXh0IGVkaXQgdGhhdCBkZXNjcmliZXMgdGhlIGNoYW5nZSBmcm9tIHRoZSBvcmlnaW5hbCB0byB0aGUgbW9kaWZpZWQgdGV4dC5cbiAgKi9cbiAgam9pbihvdGhlcikge1xuICAgIHJldHVybiBuZXcgUmFuZ2VNYXBwaW5nKFxuICAgICAgdGhpcy5vcmlnaW5hbFJhbmdlLnBsdXNSYW5nZShvdGhlci5vcmlnaW5hbFJhbmdlKSxcbiAgICAgIHRoaXMubW9kaWZpZWRSYW5nZS5wbHVzUmFuZ2Uob3RoZXIubW9kaWZpZWRSYW5nZSlcbiAgICApO1xuICB9XG59XG5mdW5jdGlvbiBsaW5lUmFuZ2VNYXBwaW5nRnJvbVJhbmdlTWFwcGluZ3MoYWxpZ25tZW50cywgb3JpZ2luYWxMaW5lcywgbW9kaWZpZWRMaW5lcywgZG9udEFzc2VydFN0YXJ0TGluZSA9IGZhbHNlKSB7XG4gIGNvbnN0IGNoYW5nZXMgPSBbXTtcbiAgZm9yIChjb25zdCBnIG9mIGdyb3VwQWRqYWNlbnRCeShcbiAgICBhbGlnbm1lbnRzLm1hcCgoYSkgPT4gZ2V0TGluZVJhbmdlTWFwcGluZyhhLCBvcmlnaW5hbExpbmVzLCBtb2RpZmllZExpbmVzKSksXG4gICAgKGExLCBhMikgPT4gYTEub3JpZ2luYWwub3ZlcmxhcE9yVG91Y2goYTIub3JpZ2luYWwpIHx8IGExLm1vZGlmaWVkLm92ZXJsYXBPclRvdWNoKGEyLm1vZGlmaWVkKVxuICApKSB7XG4gICAgY29uc3QgZmlyc3QgPSBnWzBdO1xuICAgIGNvbnN0IGxhc3QgPSBnW2cubGVuZ3RoIC0gMV07XG4gICAgY2hhbmdlcy5wdXNoKG5ldyBEZXRhaWxlZExpbmVSYW5nZU1hcHBpbmcoXG4gICAgICBmaXJzdC5vcmlnaW5hbC5qb2luKGxhc3Qub3JpZ2luYWwpLFxuICAgICAgZmlyc3QubW9kaWZpZWQuam9pbihsYXN0Lm1vZGlmaWVkKSxcbiAgICAgIGcubWFwKChhKSA9PiBhLmlubmVyQ2hhbmdlc1swXSlcbiAgICApKTtcbiAgfVxuICBhc3NlcnRGbigoKSA9PiB7XG4gICAgaWYgKCFkb250QXNzZXJ0U3RhcnRMaW5lICYmIGNoYW5nZXMubGVuZ3RoID4gMCkge1xuICAgICAgaWYgKGNoYW5nZXNbMF0ubW9kaWZpZWQuc3RhcnRMaW5lTnVtYmVyICE9PSBjaGFuZ2VzWzBdLm9yaWdpbmFsLnN0YXJ0TGluZU51bWJlcikge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAobW9kaWZpZWRMaW5lcy5sZW5ndGgubGluZUNvdW50IC0gY2hhbmdlc1tjaGFuZ2VzLmxlbmd0aCAtIDFdLm1vZGlmaWVkLmVuZExpbmVOdW1iZXJFeGNsdXNpdmUgIT09IG9yaWdpbmFsTGluZXMubGVuZ3RoLmxpbmVDb3VudCAtIGNoYW5nZXNbY2hhbmdlcy5sZW5ndGggLSAxXS5vcmlnaW5hbC5lbmRMaW5lTnVtYmVyRXhjbHVzaXZlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNoZWNrQWRqYWNlbnRJdGVtcyhcbiAgICAgIGNoYW5nZXMsXG4gICAgICAobTEsIG0yKSA9PiBtMi5vcmlnaW5hbC5zdGFydExpbmVOdW1iZXIgLSBtMS5vcmlnaW5hbC5lbmRMaW5lTnVtYmVyRXhjbHVzaXZlID09PSBtMi5tb2RpZmllZC5zdGFydExpbmVOdW1iZXIgLSBtMS5tb2RpZmllZC5lbmRMaW5lTnVtYmVyRXhjbHVzaXZlICYmIC8vIFRoZXJlIGhhcyB0byBiZSBhbiB1bmNoYW5nZWQgbGluZSBpbiBiZXR3ZWVuIChvdGhlcndpc2UgYm90aCBkaWZmcyBzaG91bGQgaGF2ZSBiZWVuIGpvaW5lZClcbiAgICAgIG0xLm9yaWdpbmFsLmVuZExpbmVOdW1iZXJFeGNsdXNpdmUgPCBtMi5vcmlnaW5hbC5zdGFydExpbmVOdW1iZXIgJiYgbTEubW9kaWZpZWQuZW5kTGluZU51bWJlckV4Y2x1c2l2ZSA8IG0yLm1vZGlmaWVkLnN0YXJ0TGluZU51bWJlclxuICAgICk7XG4gIH0pO1xuICByZXR1cm4gY2hhbmdlcztcbn1cbmZ1bmN0aW9uIGdldExpbmVSYW5nZU1hcHBpbmcocmFuZ2VNYXBwaW5nLCBvcmlnaW5hbExpbmVzLCBtb2RpZmllZExpbmVzKSB7XG4gIGxldCBsaW5lU3RhcnREZWx0YSA9IDA7XG4gIGxldCBsaW5lRW5kRGVsdGEgPSAwO1xuICBpZiAocmFuZ2VNYXBwaW5nLm1vZGlmaWVkUmFuZ2UuZW5kQ29sdW1uID09PSAxICYmIHJhbmdlTWFwcGluZy5vcmlnaW5hbFJhbmdlLmVuZENvbHVtbiA9PT0gMSAmJiByYW5nZU1hcHBpbmcub3JpZ2luYWxSYW5nZS5zdGFydExpbmVOdW1iZXIgKyBsaW5lU3RhcnREZWx0YSA8PSByYW5nZU1hcHBpbmcub3JpZ2luYWxSYW5nZS5lbmRMaW5lTnVtYmVyICYmIHJhbmdlTWFwcGluZy5tb2RpZmllZFJhbmdlLnN0YXJ0TGluZU51bWJlciArIGxpbmVTdGFydERlbHRhIDw9IHJhbmdlTWFwcGluZy5tb2RpZmllZFJhbmdlLmVuZExpbmVOdW1iZXIpIHtcbiAgICBsaW5lRW5kRGVsdGEgPSAtMTtcbiAgfVxuICBpZiAocmFuZ2VNYXBwaW5nLm1vZGlmaWVkUmFuZ2Uuc3RhcnRDb2x1bW4gLSAxID49IG1vZGlmaWVkTGluZXMuZ2V0TGluZUxlbmd0aChyYW5nZU1hcHBpbmcubW9kaWZpZWRSYW5nZS5zdGFydExpbmVOdW1iZXIpICYmIHJhbmdlTWFwcGluZy5vcmlnaW5hbFJhbmdlLnN0YXJ0Q29sdW1uIC0gMSA+PSBvcmlnaW5hbExpbmVzLmdldExpbmVMZW5ndGgocmFuZ2VNYXBwaW5nLm9yaWdpbmFsUmFuZ2Uuc3RhcnRMaW5lTnVtYmVyKSAmJiByYW5nZU1hcHBpbmcub3JpZ2luYWxSYW5nZS5zdGFydExpbmVOdW1iZXIgPD0gcmFuZ2VNYXBwaW5nLm9yaWdpbmFsUmFuZ2UuZW5kTGluZU51bWJlciArIGxpbmVFbmREZWx0YSAmJiByYW5nZU1hcHBpbmcubW9kaWZpZWRSYW5nZS5zdGFydExpbmVOdW1iZXIgPD0gcmFuZ2VNYXBwaW5nLm1vZGlmaWVkUmFuZ2UuZW5kTGluZU51bWJlciArIGxpbmVFbmREZWx0YSkge1xuICAgIGxpbmVTdGFydERlbHRhID0gMTtcbiAgfVxuICBjb25zdCBvcmlnaW5hbExpbmVSYW5nZSA9IG5ldyBMaW5lUmFuZ2UoXG4gICAgcmFuZ2VNYXBwaW5nLm9yaWdpbmFsUmFuZ2Uuc3RhcnRMaW5lTnVtYmVyICsgbGluZVN0YXJ0RGVsdGEsXG4gICAgcmFuZ2VNYXBwaW5nLm9yaWdpbmFsUmFuZ2UuZW5kTGluZU51bWJlciArIDEgKyBsaW5lRW5kRGVsdGFcbiAgKTtcbiAgY29uc3QgbW9kaWZpZWRMaW5lUmFuZ2UgPSBuZXcgTGluZVJhbmdlKFxuICAgIHJhbmdlTWFwcGluZy5tb2RpZmllZFJhbmdlLnN0YXJ0TGluZU51bWJlciArIGxpbmVTdGFydERlbHRhLFxuICAgIHJhbmdlTWFwcGluZy5tb2RpZmllZFJhbmdlLmVuZExpbmVOdW1iZXIgKyAxICsgbGluZUVuZERlbHRhXG4gICk7XG4gIHJldHVybiBuZXcgRGV0YWlsZWRMaW5lUmFuZ2VNYXBwaW5nKG9yaWdpbmFsTGluZVJhbmdlLCBtb2RpZmllZExpbmVSYW5nZSwgW3JhbmdlTWFwcGluZ10pO1xufVxuXG5jbGFzcyBEaWZmQWxnb3JpdGhtUmVzdWx0IHtcbiAgY29uc3RydWN0b3IoZGlmZnMsIGhpdFRpbWVvdXQpIHtcbiAgICB0aGlzLmRpZmZzID0gZGlmZnM7XG4gICAgdGhpcy5oaXRUaW1lb3V0ID0gaGl0VGltZW91dDtcbiAgfVxuICBzdGF0aWMgdHJpdmlhbChzZXExLCBzZXEyKSB7XG4gICAgcmV0dXJuIG5ldyBEaWZmQWxnb3JpdGhtUmVzdWx0KFtuZXcgU2VxdWVuY2VEaWZmKE9mZnNldFJhbmdlLm9mTGVuZ3RoKHNlcTEubGVuZ3RoKSwgT2Zmc2V0UmFuZ2Uub2ZMZW5ndGgoc2VxMi5sZW5ndGgpKV0sIGZhbHNlKTtcbiAgfVxuICBzdGF0aWMgdHJpdmlhbFRpbWVkT3V0KHNlcTEsIHNlcTIpIHtcbiAgICByZXR1cm4gbmV3IERpZmZBbGdvcml0aG1SZXN1bHQoW25ldyBTZXF1ZW5jZURpZmYoT2Zmc2V0UmFuZ2Uub2ZMZW5ndGgoc2VxMS5sZW5ndGgpLCBPZmZzZXRSYW5nZS5vZkxlbmd0aChzZXEyLmxlbmd0aCkpXSwgdHJ1ZSk7XG4gIH1cbn1cbmNsYXNzIFNlcXVlbmNlRGlmZiB7XG4gIGNvbnN0cnVjdG9yKHNlcTFSYW5nZSwgc2VxMlJhbmdlKSB7XG4gICAgdGhpcy5zZXExUmFuZ2UgPSBzZXExUmFuZ2U7XG4gICAgdGhpcy5zZXEyUmFuZ2UgPSBzZXEyUmFuZ2U7XG4gIH1cbiAgc3RhdGljIGludmVydChzZXF1ZW5jZURpZmZzLCBkb2MxTGVuZ3RoKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgZm9yRWFjaEFkamFjZW50KHNlcXVlbmNlRGlmZnMsIChhLCBiKSA9PiB7XG4gICAgICByZXN1bHQucHVzaChTZXF1ZW5jZURpZmYuZnJvbU9mZnNldFBhaXJzKFxuICAgICAgICBhID8gYS5nZXRFbmRFeGNsdXNpdmVzKCkgOiBPZmZzZXRQYWlyLnplcm8sXG4gICAgICAgIGIgPyBiLmdldFN0YXJ0cygpIDogbmV3IE9mZnNldFBhaXIoZG9jMUxlbmd0aCwgKGEgPyBhLnNlcTJSYW5nZS5lbmRFeGNsdXNpdmUgLSBhLnNlcTFSYW5nZS5lbmRFeGNsdXNpdmUgOiAwKSArIGRvYzFMZW5ndGgpXG4gICAgICApKTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIHN0YXRpYyBmcm9tT2Zmc2V0UGFpcnMoc3RhcnQsIGVuZEV4Y2x1c2l2ZSkge1xuICAgIHJldHVybiBuZXcgU2VxdWVuY2VEaWZmKFxuICAgICAgbmV3IE9mZnNldFJhbmdlKHN0YXJ0Lm9mZnNldDEsIGVuZEV4Y2x1c2l2ZS5vZmZzZXQxKSxcbiAgICAgIG5ldyBPZmZzZXRSYW5nZShzdGFydC5vZmZzZXQyLCBlbmRFeGNsdXNpdmUub2Zmc2V0MilcbiAgICApO1xuICB9XG4gIHN0YXRpYyBhc3NlcnRTb3J0ZWQoc2VxdWVuY2VEaWZmcykge1xuICAgIGxldCBsYXN0ID0gdW5kZWZpbmVkO1xuICAgIGZvciAoY29uc3QgY3VyIG9mIHNlcXVlbmNlRGlmZnMpIHtcbiAgICAgIGlmIChsYXN0KSB7XG4gICAgICAgIGlmICghKGxhc3Quc2VxMVJhbmdlLmVuZEV4Y2x1c2l2ZSA8PSBjdXIuc2VxMVJhbmdlLnN0YXJ0ICYmIGxhc3Quc2VxMlJhbmdlLmVuZEV4Y2x1c2l2ZSA8PSBjdXIuc2VxMlJhbmdlLnN0YXJ0KSkge1xuICAgICAgICAgIHRocm93IG5ldyBCdWdJbmRpY2F0aW5nRXJyb3IoXCJTZXF1ZW5jZSBkaWZmcyBtdXN0IGJlIHNvcnRlZFwiKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGFzdCA9IGN1cjtcbiAgICB9XG4gIH1cbiAgc3dhcCgpIHtcbiAgICByZXR1cm4gbmV3IFNlcXVlbmNlRGlmZih0aGlzLnNlcTJSYW5nZSwgdGhpcy5zZXExUmFuZ2UpO1xuICB9XG4gIGpvaW4ob3RoZXIpIHtcbiAgICByZXR1cm4gbmV3IFNlcXVlbmNlRGlmZih0aGlzLnNlcTFSYW5nZS5qb2luKG90aGVyLnNlcTFSYW5nZSksIHRoaXMuc2VxMlJhbmdlLmpvaW4ob3RoZXIuc2VxMlJhbmdlKSk7XG4gIH1cbiAgZGVsdGEob2Zmc2V0KSB7XG4gICAgaWYgKG9mZnNldCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJldHVybiBuZXcgU2VxdWVuY2VEaWZmKHRoaXMuc2VxMVJhbmdlLmRlbHRhKG9mZnNldCksIHRoaXMuc2VxMlJhbmdlLmRlbHRhKG9mZnNldCkpO1xuICB9XG4gIGRlbHRhU3RhcnQob2Zmc2V0KSB7XG4gICAgaWYgKG9mZnNldCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJldHVybiBuZXcgU2VxdWVuY2VEaWZmKHRoaXMuc2VxMVJhbmdlLmRlbHRhU3RhcnQob2Zmc2V0KSwgdGhpcy5zZXEyUmFuZ2UuZGVsdGFTdGFydChvZmZzZXQpKTtcbiAgfVxuICBkZWx0YUVuZChvZmZzZXQpIHtcbiAgICBpZiAob2Zmc2V0ID09PSAwKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBTZXF1ZW5jZURpZmYodGhpcy5zZXExUmFuZ2UuZGVsdGFFbmQob2Zmc2V0KSwgdGhpcy5zZXEyUmFuZ2UuZGVsdGFFbmQob2Zmc2V0KSk7XG4gIH1cbiAgaW50ZXJzZWN0KG90aGVyKSB7XG4gICAgY29uc3QgaTEgPSB0aGlzLnNlcTFSYW5nZS5pbnRlcnNlY3Qob3RoZXIuc2VxMVJhbmdlKTtcbiAgICBjb25zdCBpMiA9IHRoaXMuc2VxMlJhbmdlLmludGVyc2VjdChvdGhlci5zZXEyUmFuZ2UpO1xuICAgIGlmICghaTEgfHwgIWkyKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IFNlcXVlbmNlRGlmZihpMSwgaTIpO1xuICB9XG4gIGdldFN0YXJ0cygpIHtcbiAgICByZXR1cm4gbmV3IE9mZnNldFBhaXIodGhpcy5zZXExUmFuZ2Uuc3RhcnQsIHRoaXMuc2VxMlJhbmdlLnN0YXJ0KTtcbiAgfVxuICBnZXRFbmRFeGNsdXNpdmVzKCkge1xuICAgIHJldHVybiBuZXcgT2Zmc2V0UGFpcih0aGlzLnNlcTFSYW5nZS5lbmRFeGNsdXNpdmUsIHRoaXMuc2VxMlJhbmdlLmVuZEV4Y2x1c2l2ZSk7XG4gIH1cbn1cbmNsYXNzIE9mZnNldFBhaXIge1xuICBjb25zdHJ1Y3RvcihvZmZzZXQxLCBvZmZzZXQyKSB7XG4gICAgdGhpcy5vZmZzZXQxID0gb2Zmc2V0MTtcbiAgICB0aGlzLm9mZnNldDIgPSBvZmZzZXQyO1xuICB9XG4gIHN0YXRpYyB7XG4gICAgdGhpcy56ZXJvID0gbmV3IE9mZnNldFBhaXIoMCwgMCk7XG4gIH1cbiAgc3RhdGljIHtcbiAgICB0aGlzLm1heCA9IG5ldyBPZmZzZXRQYWlyKE51bWJlci5NQVhfU0FGRV9JTlRFR0VSLCBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUik7XG4gIH1cbiAgZGVsdGEob2Zmc2V0KSB7XG4gICAgaWYgKG9mZnNldCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJldHVybiBuZXcgT2Zmc2V0UGFpcih0aGlzLm9mZnNldDEgKyBvZmZzZXQsIHRoaXMub2Zmc2V0MiArIG9mZnNldCk7XG4gIH1cbiAgZXF1YWxzKG90aGVyKSB7XG4gICAgcmV0dXJuIHRoaXMub2Zmc2V0MSA9PT0gb3RoZXIub2Zmc2V0MSAmJiB0aGlzLm9mZnNldDIgPT09IG90aGVyLm9mZnNldDI7XG4gIH1cbn1cbmNsYXNzIEluZmluaXRlVGltZW91dCB7XG4gIHN0YXRpYyB7XG4gICAgdGhpcy5pbnN0YW5jZSA9IG5ldyBJbmZpbml0ZVRpbWVvdXQoKTtcbiAgfVxuICBpc1ZhbGlkKCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG5jbGFzcyBEYXRlVGltZW91dCB7XG4gIGNvbnN0cnVjdG9yKHRpbWVvdXQpIHtcbiAgICB0aGlzLnRpbWVvdXQgPSB0aW1lb3V0O1xuICAgIHRoaXMuc3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICB0aGlzLnZhbGlkID0gdHJ1ZTtcbiAgICBpZiAodGltZW91dCA8PSAwKSB7XG4gICAgICB0aHJvdyBuZXcgQnVnSW5kaWNhdGluZ0Vycm9yKFwidGltZW91dCBtdXN0IGJlIHBvc2l0aXZlXCIpO1xuICAgIH1cbiAgfVxuICAvLyBSZWNvbW1lbmRhdGlvbjogU2V0IGEgbG9nLXBvaW50IGB7dGhpcy5kaXNhYmxlKCl9YCBpbiB0aGUgYm9keVxuICBpc1ZhbGlkKCkge1xuICAgIGNvbnN0IHZhbGlkID0gRGF0ZS5ub3coKSAtIHRoaXMuc3RhcnRUaW1lIDwgdGhpcy50aW1lb3V0O1xuICAgIGlmICghdmFsaWQgJiYgdGhpcy52YWxpZCkge1xuICAgICAgdGhpcy52YWxpZCA9IGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy52YWxpZDtcbiAgfVxuICBkaXNhYmxlKCkge1xuICAgIHRoaXMudGltZW91dCA9IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSO1xuICAgIHRoaXMuaXNWYWxpZCA9ICgpID0+IHRydWU7XG4gICAgdGhpcy52YWxpZCA9IHRydWU7XG4gIH1cbn1cblxuY2xhc3MgQXJyYXkyRCB7XG4gIGNvbnN0cnVjdG9yKHdpZHRoLCBoZWlnaHQpIHtcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgdGhpcy5hcnJheSA9IFtdO1xuICAgIHRoaXMuYXJyYXkgPSBuZXcgQXJyYXkod2lkdGggKiBoZWlnaHQpO1xuICB9XG4gIGdldCh4LCB5KSB7XG4gICAgcmV0dXJuIHRoaXMuYXJyYXlbeCArIHkgKiB0aGlzLndpZHRoXTtcbiAgfVxuICBzZXQoeCwgeSwgdmFsdWUpIHtcbiAgICB0aGlzLmFycmF5W3ggKyB5ICogdGhpcy53aWR0aF0gPSB2YWx1ZTtcbiAgfVxufVxuZnVuY3Rpb24gaXNTcGFjZShjaGFyQ29kZSkge1xuICByZXR1cm4gY2hhckNvZGUgPT09IDMyIHx8IGNoYXJDb2RlID09PSA5O1xufVxuY2xhc3MgTGluZVJhbmdlRnJhZ21lbnQge1xuICBjb25zdHJ1Y3RvcihyYW5nZSwgbGluZXMsIHNvdXJjZSkge1xuICAgIHRoaXMucmFuZ2UgPSByYW5nZTtcbiAgICB0aGlzLmxpbmVzID0gbGluZXM7XG4gICAgdGhpcy5zb3VyY2UgPSBzb3VyY2U7XG4gICAgdGhpcy5oaXN0b2dyYW0gPSBbXTtcbiAgICBsZXQgY291bnRlciA9IDA7XG4gICAgZm9yIChsZXQgaSA9IHJhbmdlLnN0YXJ0TGluZU51bWJlciAtIDE7IGkgPCByYW5nZS5lbmRMaW5lTnVtYmVyRXhjbHVzaXZlIC0gMTsgaSsrKSB7XG4gICAgICBjb25zdCBsaW5lID0gbGluZXNbaV07XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGxpbmUubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgY291bnRlcisrO1xuICAgICAgICBjb25zdCBjaHIgPSBsaW5lW2pdO1xuICAgICAgICBjb25zdCBrZXkyID0gTGluZVJhbmdlRnJhZ21lbnQuZ2V0S2V5KGNocik7XG4gICAgICAgIHRoaXMuaGlzdG9ncmFtW2tleTJdID0gKHRoaXMuaGlzdG9ncmFtW2tleTJdIHx8IDApICsgMTtcbiAgICAgIH1cbiAgICAgIGNvdW50ZXIrKztcbiAgICAgIGNvbnN0IGtleSA9IExpbmVSYW5nZUZyYWdtZW50LmdldEtleShcIlxcblwiKTtcbiAgICAgIHRoaXMuaGlzdG9ncmFtW2tleV0gPSAodGhpcy5oaXN0b2dyYW1ba2V5XSB8fCAwKSArIDE7XG4gICAgfVxuICAgIHRoaXMudG90YWxDb3VudCA9IGNvdW50ZXI7XG4gIH1cbiAgc3RhdGljIHtcbiAgICB0aGlzLmNocktleXMgPSAvKiBAX19QVVJFX18gKi8gbmV3IE1hcCgpO1xuICB9XG4gIHN0YXRpYyBnZXRLZXkoY2hyKSB7XG4gICAgbGV0IGtleSA9IHRoaXMuY2hyS2V5cy5nZXQoY2hyKTtcbiAgICBpZiAoa2V5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGtleSA9IHRoaXMuY2hyS2V5cy5zaXplO1xuICAgICAgdGhpcy5jaHJLZXlzLnNldChjaHIsIGtleSk7XG4gICAgfVxuICAgIHJldHVybiBrZXk7XG4gIH1cbiAgY29tcHV0ZVNpbWlsYXJpdHkob3RoZXIpIHtcbiAgICBsZXQgc3VtRGlmZmVyZW5jZXMgPSAwO1xuICAgIGNvbnN0IG1heExlbmd0aCA9IE1hdGgubWF4KHRoaXMuaGlzdG9ncmFtLmxlbmd0aCwgb3RoZXIuaGlzdG9ncmFtLmxlbmd0aCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXhMZW5ndGg7IGkrKykge1xuICAgICAgc3VtRGlmZmVyZW5jZXMgKz0gTWF0aC5hYnMoKHRoaXMuaGlzdG9ncmFtW2ldID8/IDApIC0gKG90aGVyLmhpc3RvZ3JhbVtpXSA/PyAwKSk7XG4gICAgfVxuICAgIHJldHVybiAxIC0gc3VtRGlmZmVyZW5jZXMgLyAodGhpcy50b3RhbENvdW50ICsgb3RoZXIudG90YWxDb3VudCk7XG4gIH1cbn1cblxuY2xhc3MgRHluYW1pY1Byb2dyYW1taW5nRGlmZmluZyB7XG4gIGNvbXB1dGUoc2VxdWVuY2UxLCBzZXF1ZW5jZTIsIHRpbWVvdXQgPSBJbmZpbml0ZVRpbWVvdXQuaW5zdGFuY2UsIGVxdWFsaXR5U2NvcmUpIHtcbiAgICBpZiAoc2VxdWVuY2UxLmxlbmd0aCA9PT0gMCB8fCBzZXF1ZW5jZTIubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gRGlmZkFsZ29yaXRobVJlc3VsdC50cml2aWFsKHNlcXVlbmNlMSwgc2VxdWVuY2UyKTtcbiAgICB9XG4gICAgY29uc3QgbGNzTGVuZ3RocyA9IG5ldyBBcnJheTJEKHNlcXVlbmNlMS5sZW5ndGgsIHNlcXVlbmNlMi5sZW5ndGgpO1xuICAgIGNvbnN0IGRpcmVjdGlvbnMgPSBuZXcgQXJyYXkyRChzZXF1ZW5jZTEubGVuZ3RoLCBzZXF1ZW5jZTIubGVuZ3RoKTtcbiAgICBjb25zdCBsZW5ndGhzID0gbmV3IEFycmF5MkQoc2VxdWVuY2UxLmxlbmd0aCwgc2VxdWVuY2UyLmxlbmd0aCk7XG4gICAgZm9yIChsZXQgczEyID0gMDsgczEyIDwgc2VxdWVuY2UxLmxlbmd0aDsgczEyKyspIHtcbiAgICAgIGZvciAobGV0IHMyMiA9IDA7IHMyMiA8IHNlcXVlbmNlMi5sZW5ndGg7IHMyMisrKSB7XG4gICAgICAgIGlmICghdGltZW91dC5pc1ZhbGlkKCkpIHtcbiAgICAgICAgICByZXR1cm4gRGlmZkFsZ29yaXRobVJlc3VsdC50cml2aWFsVGltZWRPdXQoc2VxdWVuY2UxLCBzZXF1ZW5jZTIpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGhvcml6b250YWxMZW4gPSBzMTIgPT09IDAgPyAwIDogbGNzTGVuZ3Rocy5nZXQoczEyIC0gMSwgczIyKTtcbiAgICAgICAgY29uc3QgdmVydGljYWxMZW4gPSBzMjIgPT09IDAgPyAwIDogbGNzTGVuZ3Rocy5nZXQoczEyLCBzMjIgLSAxKTtcbiAgICAgICAgbGV0IGV4dGVuZGVkU2VxU2NvcmU7XG4gICAgICAgIGlmIChzZXF1ZW5jZTEuZ2V0RWxlbWVudChzMTIpID09PSBzZXF1ZW5jZTIuZ2V0RWxlbWVudChzMjIpKSB7XG4gICAgICAgICAgaWYgKHMxMiA9PT0gMCB8fCBzMjIgPT09IDApIHtcbiAgICAgICAgICAgIGV4dGVuZGVkU2VxU2NvcmUgPSAwO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBleHRlbmRlZFNlcVNjb3JlID0gbGNzTGVuZ3Rocy5nZXQoczEyIC0gMSwgczIyIC0gMSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChzMTIgPiAwICYmIHMyMiA+IDAgJiYgZGlyZWN0aW9ucy5nZXQoczEyIC0gMSwgczIyIC0gMSkgPT09IDMpIHtcbiAgICAgICAgICAgIGV4dGVuZGVkU2VxU2NvcmUgKz0gbGVuZ3Rocy5nZXQoczEyIC0gMSwgczIyIC0gMSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGV4dGVuZGVkU2VxU2NvcmUgKz0gZXF1YWxpdHlTY29yZSA/IGVxdWFsaXR5U2NvcmUoczEyLCBzMjIpIDogMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBleHRlbmRlZFNlcVNjb3JlID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbmV3VmFsdWUgPSBNYXRoLm1heChob3Jpem9udGFsTGVuLCB2ZXJ0aWNhbExlbiwgZXh0ZW5kZWRTZXFTY29yZSk7XG4gICAgICAgIGlmIChuZXdWYWx1ZSA9PT0gZXh0ZW5kZWRTZXFTY29yZSkge1xuICAgICAgICAgIGNvbnN0IHByZXZMZW4gPSBzMTIgPiAwICYmIHMyMiA+IDAgPyBsZW5ndGhzLmdldChzMTIgLSAxLCBzMjIgLSAxKSA6IDA7XG4gICAgICAgICAgbGVuZ3Rocy5zZXQoczEyLCBzMjIsIHByZXZMZW4gKyAxKTtcbiAgICAgICAgICBkaXJlY3Rpb25zLnNldChzMTIsIHMyMiwgMyk7XG4gICAgICAgIH0gZWxzZSBpZiAobmV3VmFsdWUgPT09IGhvcml6b250YWxMZW4pIHtcbiAgICAgICAgICBsZW5ndGhzLnNldChzMTIsIHMyMiwgMCk7XG4gICAgICAgICAgZGlyZWN0aW9ucy5zZXQoczEyLCBzMjIsIDEpO1xuICAgICAgICB9IGVsc2UgaWYgKG5ld1ZhbHVlID09PSB2ZXJ0aWNhbExlbikge1xuICAgICAgICAgIGxlbmd0aHMuc2V0KHMxMiwgczIyLCAwKTtcbiAgICAgICAgICBkaXJlY3Rpb25zLnNldChzMTIsIHMyMiwgMik7XG4gICAgICAgIH1cbiAgICAgICAgbGNzTGVuZ3Rocy5zZXQoczEyLCBzMjIsIG5ld1ZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgbGV0IGxhc3RBbGlnbmluZ1Bvc1MxID0gc2VxdWVuY2UxLmxlbmd0aDtcbiAgICBsZXQgbGFzdEFsaWduaW5nUG9zUzIgPSBzZXF1ZW5jZTIubGVuZ3RoO1xuICAgIGZ1bmN0aW9uIHJlcG9ydERlY3JlYXNpbmdBbGlnbmluZ1Bvc2l0aW9ucyhzMTIsIHMyMikge1xuICAgICAgaWYgKHMxMiArIDEgIT09IGxhc3RBbGlnbmluZ1Bvc1MxIHx8IHMyMiArIDEgIT09IGxhc3RBbGlnbmluZ1Bvc1MyKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKG5ldyBTZXF1ZW5jZURpZmYoXG4gICAgICAgICAgbmV3IE9mZnNldFJhbmdlKHMxMiArIDEsIGxhc3RBbGlnbmluZ1Bvc1MxKSxcbiAgICAgICAgICBuZXcgT2Zmc2V0UmFuZ2UoczIyICsgMSwgbGFzdEFsaWduaW5nUG9zUzIpXG4gICAgICAgICkpO1xuICAgICAgfVxuICAgICAgbGFzdEFsaWduaW5nUG9zUzEgPSBzMTI7XG4gICAgICBsYXN0QWxpZ25pbmdQb3NTMiA9IHMyMjtcbiAgICB9XG4gICAgbGV0IHMxID0gc2VxdWVuY2UxLmxlbmd0aCAtIDE7XG4gICAgbGV0IHMyID0gc2VxdWVuY2UyLmxlbmd0aCAtIDE7XG4gICAgd2hpbGUgKHMxID49IDAgJiYgczIgPj0gMCkge1xuICAgICAgaWYgKGRpcmVjdGlvbnMuZ2V0KHMxLCBzMikgPT09IDMpIHtcbiAgICAgICAgcmVwb3J0RGVjcmVhc2luZ0FsaWduaW5nUG9zaXRpb25zKHMxLCBzMik7XG4gICAgICAgIHMxLS07XG4gICAgICAgIHMyLS07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoZGlyZWN0aW9ucy5nZXQoczEsIHMyKSA9PT0gMSkge1xuICAgICAgICAgIHMxLS07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgczItLTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXBvcnREZWNyZWFzaW5nQWxpZ25pbmdQb3NpdGlvbnMoLTEsIC0xKTtcbiAgICByZXN1bHQucmV2ZXJzZSgpO1xuICAgIHJldHVybiBuZXcgRGlmZkFsZ29yaXRobVJlc3VsdChyZXN1bHQsIGZhbHNlKTtcbiAgfVxufVxuXG5jbGFzcyBNeWVyc0RpZmZBbGdvcml0aG0ge1xuICBjb21wdXRlKHNlcTEsIHNlcTIsIHRpbWVvdXQgPSBJbmZpbml0ZVRpbWVvdXQuaW5zdGFuY2UpIHtcbiAgICBpZiAoc2VxMS5sZW5ndGggPT09IDAgfHwgc2VxMi5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBEaWZmQWxnb3JpdGhtUmVzdWx0LnRyaXZpYWwoc2VxMSwgc2VxMik7XG4gICAgfVxuICAgIGNvbnN0IHNlcVggPSBzZXExO1xuICAgIGNvbnN0IHNlcVkgPSBzZXEyO1xuICAgIGZ1bmN0aW9uIGdldFhBZnRlclNuYWtlKHgsIHkpIHtcbiAgICAgIHdoaWxlICh4IDwgc2VxWC5sZW5ndGggJiYgeSA8IHNlcVkubGVuZ3RoICYmIHNlcVguZ2V0RWxlbWVudCh4KSA9PT0gc2VxWS5nZXRFbGVtZW50KHkpKSB7XG4gICAgICAgIHgrKztcbiAgICAgICAgeSsrO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHg7XG4gICAgfVxuICAgIGxldCBkID0gMDtcbiAgICBjb25zdCBWID0gbmV3IEZhc3RJbnQzMkFycmF5KCk7XG4gICAgVi5zZXQoMCwgZ2V0WEFmdGVyU25ha2UoMCwgMCkpO1xuICAgIGNvbnN0IHBhdGhzID0gbmV3IEZhc3RBcnJheU5lZ2F0aXZlSW5kaWNlcygpO1xuICAgIHBhdGhzLnNldCgwLCBWLmdldCgwKSA9PT0gMCA/IG51bGwgOiBuZXcgU25ha2VQYXRoKG51bGwsIDAsIDAsIFYuZ2V0KDApKSk7XG4gICAgbGV0IGsgPSAwO1xuICAgIGxvb3A6IHdoaWxlICh0cnVlKSB7XG4gICAgICBkKys7XG4gICAgICBpZiAoIXRpbWVvdXQuaXNWYWxpZCgpKSB7XG4gICAgICAgIHJldHVybiBEaWZmQWxnb3JpdGhtUmVzdWx0LnRyaXZpYWxUaW1lZE91dChzZXFYLCBzZXFZKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGxvd2VyQm91bmQgPSAtTWF0aC5taW4oZCwgc2VxWS5sZW5ndGggKyBkICUgMik7XG4gICAgICBjb25zdCB1cHBlckJvdW5kID0gTWF0aC5taW4oZCwgc2VxWC5sZW5ndGggKyBkICUgMik7XG4gICAgICBmb3IgKGsgPSBsb3dlckJvdW5kOyBrIDw9IHVwcGVyQm91bmQ7IGsgKz0gMikge1xuICAgICAgICBjb25zdCBtYXhYb2ZETGluZVRvcCA9IGsgPT09IHVwcGVyQm91bmQgPyAtMSA6IFYuZ2V0KGsgKyAxKTtcbiAgICAgICAgY29uc3QgbWF4WG9mRExpbmVMZWZ0ID0gayA9PT0gbG93ZXJCb3VuZCA/IC0xIDogVi5nZXQoayAtIDEpICsgMTtcbiAgICAgICAgY29uc3QgeCA9IE1hdGgubWluKE1hdGgubWF4KG1heFhvZkRMaW5lVG9wLCBtYXhYb2ZETGluZUxlZnQpLCBzZXFYLmxlbmd0aCk7XG4gICAgICAgIGNvbnN0IHkgPSB4IC0gaztcbiAgICAgICAgaWYgKHggPiBzZXFYLmxlbmd0aCB8fCB5ID4gc2VxWS5sZW5ndGgpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBuZXdNYXhYID0gZ2V0WEFmdGVyU25ha2UoeCwgeSk7XG4gICAgICAgIFYuc2V0KGssIG5ld01heFgpO1xuICAgICAgICBjb25zdCBsYXN0UGF0aCA9IHggPT09IG1heFhvZkRMaW5lVG9wID8gcGF0aHMuZ2V0KGsgKyAxKSA6IHBhdGhzLmdldChrIC0gMSk7XG4gICAgICAgIHBhdGhzLnNldChrLCBuZXdNYXhYICE9PSB4ID8gbmV3IFNuYWtlUGF0aChsYXN0UGF0aCwgeCwgeSwgbmV3TWF4WCAtIHgpIDogbGFzdFBhdGgpO1xuICAgICAgICBpZiAoVi5nZXQoaykgPT09IHNlcVgubGVuZ3RoICYmIFYuZ2V0KGspIC0gayA9PT0gc2VxWS5sZW5ndGgpIHtcbiAgICAgICAgICBicmVhayBsb29wO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGxldCBwYXRoID0gcGF0aHMuZ2V0KGspO1xuICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuICAgIGxldCBsYXN0QWxpZ25pbmdQb3NTMSA9IHNlcVgubGVuZ3RoO1xuICAgIGxldCBsYXN0QWxpZ25pbmdQb3NTMiA9IHNlcVkubGVuZ3RoO1xuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICBjb25zdCBlbmRYID0gcGF0aCA/IHBhdGgueCArIHBhdGgubGVuZ3RoIDogMDtcbiAgICAgIGNvbnN0IGVuZFkgPSBwYXRoID8gcGF0aC55ICsgcGF0aC5sZW5ndGggOiAwO1xuICAgICAgaWYgKGVuZFggIT09IGxhc3RBbGlnbmluZ1Bvc1MxIHx8IGVuZFkgIT09IGxhc3RBbGlnbmluZ1Bvc1MyKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKG5ldyBTZXF1ZW5jZURpZmYoXG4gICAgICAgICAgbmV3IE9mZnNldFJhbmdlKGVuZFgsIGxhc3RBbGlnbmluZ1Bvc1MxKSxcbiAgICAgICAgICBuZXcgT2Zmc2V0UmFuZ2UoZW5kWSwgbGFzdEFsaWduaW5nUG9zUzIpXG4gICAgICAgICkpO1xuICAgICAgfVxuICAgICAgaWYgKCFwYXRoKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgbGFzdEFsaWduaW5nUG9zUzEgPSBwYXRoLng7XG4gICAgICBsYXN0QWxpZ25pbmdQb3NTMiA9IHBhdGgueTtcbiAgICAgIHBhdGggPSBwYXRoLnByZXY7XG4gICAgfVxuICAgIHJlc3VsdC5yZXZlcnNlKCk7XG4gICAgcmV0dXJuIG5ldyBEaWZmQWxnb3JpdGhtUmVzdWx0KHJlc3VsdCwgZmFsc2UpO1xuICB9XG59XG5jbGFzcyBTbmFrZVBhdGgge1xuICBjb25zdHJ1Y3RvcihwcmV2LCB4LCB5LCBsZW5ndGgpIHtcbiAgICB0aGlzLnByZXYgPSBwcmV2O1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgfVxufVxuY2xhc3MgRmFzdEludDMyQXJyYXkge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnBvc2l0aXZlQXJyID0gbmV3IEludDMyQXJyYXkoMTApO1xuICAgIHRoaXMubmVnYXRpdmVBcnIgPSBuZXcgSW50MzJBcnJheSgxMCk7XG4gIH1cbiAgZ2V0KGlkeCkge1xuICAgIGlmIChpZHggPCAwKSB7XG4gICAgICBpZHggPSAtaWR4IC0gMTtcbiAgICAgIHJldHVybiB0aGlzLm5lZ2F0aXZlQXJyW2lkeF07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnBvc2l0aXZlQXJyW2lkeF07XG4gICAgfVxuICB9XG4gIHNldChpZHgsIHZhbHVlKSB7XG4gICAgaWYgKGlkeCA8IDApIHtcbiAgICAgIGlkeCA9IC1pZHggLSAxO1xuICAgICAgaWYgKGlkeCA+PSB0aGlzLm5lZ2F0aXZlQXJyLmxlbmd0aCkge1xuICAgICAgICBjb25zdCBhcnIgPSB0aGlzLm5lZ2F0aXZlQXJyO1xuICAgICAgICB0aGlzLm5lZ2F0aXZlQXJyID0gbmV3IEludDMyQXJyYXkoYXJyLmxlbmd0aCAqIDIpO1xuICAgICAgICB0aGlzLm5lZ2F0aXZlQXJyLnNldChhcnIpO1xuICAgICAgfVxuICAgICAgdGhpcy5uZWdhdGl2ZUFycltpZHhdID0gdmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChpZHggPj0gdGhpcy5wb3NpdGl2ZUFyci5sZW5ndGgpIHtcbiAgICAgICAgY29uc3QgYXJyID0gdGhpcy5wb3NpdGl2ZUFycjtcbiAgICAgICAgdGhpcy5wb3NpdGl2ZUFyciA9IG5ldyBJbnQzMkFycmF5KGFyci5sZW5ndGggKiAyKTtcbiAgICAgICAgdGhpcy5wb3NpdGl2ZUFyci5zZXQoYXJyKTtcbiAgICAgIH1cbiAgICAgIHRoaXMucG9zaXRpdmVBcnJbaWR4XSA9IHZhbHVlO1xuICAgIH1cbiAgfVxufVxuY2xhc3MgRmFzdEFycmF5TmVnYXRpdmVJbmRpY2VzIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5wb3NpdGl2ZUFyciA9IFtdO1xuICAgIHRoaXMubmVnYXRpdmVBcnIgPSBbXTtcbiAgfVxuICBnZXQoaWR4KSB7XG4gICAgaWYgKGlkeCA8IDApIHtcbiAgICAgIGlkeCA9IC1pZHggLSAxO1xuICAgICAgcmV0dXJuIHRoaXMubmVnYXRpdmVBcnJbaWR4XTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMucG9zaXRpdmVBcnJbaWR4XTtcbiAgICB9XG4gIH1cbiAgc2V0KGlkeCwgdmFsdWUpIHtcbiAgICBpZiAoaWR4IDwgMCkge1xuICAgICAgaWR4ID0gLWlkeCAtIDE7XG4gICAgICB0aGlzLm5lZ2F0aXZlQXJyW2lkeF0gPSB2YWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wb3NpdGl2ZUFycltpZHhdID0gdmFsdWU7XG4gICAgfVxuICB9XG59XG5cbmNsYXNzIFNldE1hcCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMubWFwID0gLyogQF9fUFVSRV9fICovIG5ldyBNYXAoKTtcbiAgfVxuICBhZGQoa2V5LCB2YWx1ZSkge1xuICAgIGxldCB2YWx1ZXMgPSB0aGlzLm1hcC5nZXQoa2V5KTtcbiAgICBpZiAoIXZhbHVlcykge1xuICAgICAgdmFsdWVzID0gLyogQF9fUFVSRV9fICovIG5ldyBTZXQoKTtcbiAgICAgIHRoaXMubWFwLnNldChrZXksIHZhbHVlcyk7XG4gICAgfVxuICAgIHZhbHVlcy5hZGQodmFsdWUpO1xuICB9XG4gIGZvckVhY2goa2V5LCBmbikge1xuICAgIGNvbnN0IHZhbHVlcyA9IHRoaXMubWFwLmdldChrZXkpO1xuICAgIGlmICghdmFsdWVzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhbHVlcy5mb3JFYWNoKGZuKTtcbiAgfVxuICBnZXQoa2V5KSB7XG4gICAgY29uc3QgdmFsdWVzID0gdGhpcy5tYXAuZ2V0KGtleSk7XG4gICAgaWYgKCF2YWx1ZXMpIHtcbiAgICAgIHJldHVybiAvKiBAX19QVVJFX18gKi8gbmV3IFNldCgpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWVzO1xuICB9XG59XG5cbmNsYXNzIExpbmVzU2xpY2VDaGFyU2VxdWVuY2Uge1xuICBjb25zdHJ1Y3RvcihsaW5lcywgcmFuZ2UsIGNvbnNpZGVyV2hpdGVzcGFjZUNoYW5nZXMpIHtcbiAgICB0aGlzLmxpbmVzID0gbGluZXM7XG4gICAgdGhpcy5yYW5nZSA9IHJhbmdlO1xuICAgIHRoaXMuY29uc2lkZXJXaGl0ZXNwYWNlQ2hhbmdlcyA9IGNvbnNpZGVyV2hpdGVzcGFjZUNoYW5nZXM7XG4gICAgdGhpcy5lbGVtZW50cyA9IFtdO1xuICAgIHRoaXMuZmlyc3RFbGVtZW50T2Zmc2V0QnlMaW5lSWR4ID0gW107XG4gICAgdGhpcy5saW5lU3RhcnRPZmZzZXRzID0gW107XG4gICAgdGhpcy50cmltbWVkV3NMZW5ndGhzQnlMaW5lSWR4ID0gW107XG4gICAgdGhpcy5maXJzdEVsZW1lbnRPZmZzZXRCeUxpbmVJZHgucHVzaCgwKTtcbiAgICBmb3IgKGxldCBsaW5lTnVtYmVyID0gdGhpcy5yYW5nZS5zdGFydExpbmVOdW1iZXI7IGxpbmVOdW1iZXIgPD0gdGhpcy5yYW5nZS5lbmRMaW5lTnVtYmVyOyBsaW5lTnVtYmVyKyspIHtcbiAgICAgIGxldCBsaW5lID0gbGluZXNbbGluZU51bWJlciAtIDFdO1xuICAgICAgbGV0IGxpbmVTdGFydE9mZnNldCA9IDA7XG4gICAgICBpZiAobGluZU51bWJlciA9PT0gdGhpcy5yYW5nZS5zdGFydExpbmVOdW1iZXIgJiYgdGhpcy5yYW5nZS5zdGFydENvbHVtbiA+IDEpIHtcbiAgICAgICAgbGluZVN0YXJ0T2Zmc2V0ID0gdGhpcy5yYW5nZS5zdGFydENvbHVtbiAtIDE7XG4gICAgICAgIGxpbmUgPSBsaW5lLnN1YnN0cmluZyhsaW5lU3RhcnRPZmZzZXQpO1xuICAgICAgfVxuICAgICAgdGhpcy5saW5lU3RhcnRPZmZzZXRzLnB1c2gobGluZVN0YXJ0T2Zmc2V0KTtcbiAgICAgIGxldCB0cmltbWVkV3NMZW5ndGggPSAwO1xuICAgICAgaWYgKCFjb25zaWRlcldoaXRlc3BhY2VDaGFuZ2VzKSB7XG4gICAgICAgIGNvbnN0IHRyaW1tZWRTdGFydExpbmUgPSBsaW5lLnRyaW1TdGFydCgpO1xuICAgICAgICB0cmltbWVkV3NMZW5ndGggPSBsaW5lLmxlbmd0aCAtIHRyaW1tZWRTdGFydExpbmUubGVuZ3RoO1xuICAgICAgICBsaW5lID0gdHJpbW1lZFN0YXJ0TGluZS50cmltRW5kKCk7XG4gICAgICB9XG4gICAgICB0aGlzLnRyaW1tZWRXc0xlbmd0aHNCeUxpbmVJZHgucHVzaCh0cmltbWVkV3NMZW5ndGgpO1xuICAgICAgY29uc3QgbGluZUxlbmd0aCA9IGxpbmVOdW1iZXIgPT09IHRoaXMucmFuZ2UuZW5kTGluZU51bWJlciA/IE1hdGgubWluKHRoaXMucmFuZ2UuZW5kQ29sdW1uIC0gMSAtIGxpbmVTdGFydE9mZnNldCAtIHRyaW1tZWRXc0xlbmd0aCwgbGluZS5sZW5ndGgpIDogbGluZS5sZW5ndGg7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpbmVMZW5ndGg7IGkrKykge1xuICAgICAgICB0aGlzLmVsZW1lbnRzLnB1c2gobGluZS5jaGFyQ29kZUF0KGkpKTtcbiAgICAgIH1cbiAgICAgIGlmIChsaW5lTnVtYmVyIDwgdGhpcy5yYW5nZS5lbmRMaW5lTnVtYmVyKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudHMucHVzaChcIlxcblwiLmNoYXJDb2RlQXQoMCkpO1xuICAgICAgICB0aGlzLmZpcnN0RWxlbWVudE9mZnNldEJ5TGluZUlkeC5wdXNoKHRoaXMuZWxlbWVudHMubGVuZ3RoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIGBTbGljZTogXCIke3RoaXMudGV4dH1cImA7XG4gIH1cbiAgZ2V0IHRleHQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VGV4dChuZXcgT2Zmc2V0UmFuZ2UoMCwgdGhpcy5sZW5ndGgpKTtcbiAgfVxuICBnZXRUZXh0KHJhbmdlKSB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudHMuc2xpY2UocmFuZ2Uuc3RhcnQsIHJhbmdlLmVuZEV4Y2x1c2l2ZSkubWFwKChlKSA9PiBTdHJpbmcuZnJvbUNoYXJDb2RlKGUpKS5qb2luKFwiXCIpO1xuICB9XG4gIGdldEVsZW1lbnQob2Zmc2V0KSB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudHNbb2Zmc2V0XTtcbiAgfVxuICBnZXQgbGVuZ3RoKCkge1xuICAgIHJldHVybiB0aGlzLmVsZW1lbnRzLmxlbmd0aDtcbiAgfVxuICBnZXRCb3VuZGFyeVNjb3JlKGxlbmd0aCkge1xuICAgIGNvbnN0IHByZXZDYXRlZ29yeSA9IGdldENhdGVnb3J5KGxlbmd0aCA+IDAgPyB0aGlzLmVsZW1lbnRzW2xlbmd0aCAtIDFdIDogLTEpO1xuICAgIGNvbnN0IG5leHRDYXRlZ29yeSA9IGdldENhdGVnb3J5KGxlbmd0aCA8IHRoaXMuZWxlbWVudHMubGVuZ3RoID8gdGhpcy5lbGVtZW50c1tsZW5ndGhdIDogLTEpO1xuICAgIGlmIChwcmV2Q2F0ZWdvcnkgPT09IDcgLyogTGluZUJyZWFrQ1IgKi8gJiYgbmV4dENhdGVnb3J5ID09PSA4IC8qIExpbmVCcmVha0xGICovKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgaWYgKHByZXZDYXRlZ29yeSA9PT0gOCAvKiBMaW5lQnJlYWtMRiAqLykge1xuICAgICAgcmV0dXJuIDE1MDtcbiAgICB9XG4gICAgbGV0IHNjb3JlMiA9IDA7XG4gICAgaWYgKHByZXZDYXRlZ29yeSAhPT0gbmV4dENhdGVnb3J5KSB7XG4gICAgICBzY29yZTIgKz0gMTA7XG4gICAgICBpZiAocHJldkNhdGVnb3J5ID09PSAwIC8qIFdvcmRMb3dlciAqLyAmJiBuZXh0Q2F0ZWdvcnkgPT09IDEgLyogV29yZFVwcGVyICovKSB7XG4gICAgICAgIHNjb3JlMiArPSAxO1xuICAgICAgfVxuICAgIH1cbiAgICBzY29yZTIgKz0gZ2V0Q2F0ZWdvcnlCb3VuZGFyeVNjb3JlKHByZXZDYXRlZ29yeSk7XG4gICAgc2NvcmUyICs9IGdldENhdGVnb3J5Qm91bmRhcnlTY29yZShuZXh0Q2F0ZWdvcnkpO1xuICAgIHJldHVybiBzY29yZTI7XG4gIH1cbiAgdHJhbnNsYXRlT2Zmc2V0KG9mZnNldCwgcHJlZmVyZW5jZSA9IFwicmlnaHRcIikge1xuICAgIGNvbnN0IGkgPSBmaW5kTGFzdElkeE1vbm90b25vdXModGhpcy5maXJzdEVsZW1lbnRPZmZzZXRCeUxpbmVJZHgsICh2YWx1ZSkgPT4gdmFsdWUgPD0gb2Zmc2V0KTtcbiAgICBjb25zdCBsaW5lT2Zmc2V0ID0gb2Zmc2V0IC0gdGhpcy5maXJzdEVsZW1lbnRPZmZzZXRCeUxpbmVJZHhbaV07XG4gICAgcmV0dXJuIG5ldyBQb3NpdGlvbihcbiAgICAgIHRoaXMucmFuZ2Uuc3RhcnRMaW5lTnVtYmVyICsgaSxcbiAgICAgIDEgKyB0aGlzLmxpbmVTdGFydE9mZnNldHNbaV0gKyBsaW5lT2Zmc2V0ICsgKGxpbmVPZmZzZXQgPT09IDAgJiYgcHJlZmVyZW5jZSA9PT0gXCJsZWZ0XCIgPyAwIDogdGhpcy50cmltbWVkV3NMZW5ndGhzQnlMaW5lSWR4W2ldKVxuICAgICk7XG4gIH1cbiAgdHJhbnNsYXRlUmFuZ2UocmFuZ2UpIHtcbiAgICBjb25zdCBwb3MxID0gdGhpcy50cmFuc2xhdGVPZmZzZXQocmFuZ2Uuc3RhcnQsIFwicmlnaHRcIik7XG4gICAgY29uc3QgcG9zMiA9IHRoaXMudHJhbnNsYXRlT2Zmc2V0KHJhbmdlLmVuZEV4Y2x1c2l2ZSwgXCJsZWZ0XCIpO1xuICAgIGlmIChwb3MyLmlzQmVmb3JlKHBvczEpKSB7XG4gICAgICByZXR1cm4gUmFuZ2UuZnJvbVBvc2l0aW9ucyhwb3MyLCBwb3MyKTtcbiAgICB9XG4gICAgcmV0dXJuIFJhbmdlLmZyb21Qb3NpdGlvbnMocG9zMSwgcG9zMik7XG4gIH1cbiAgLyoqXG4gICAqIEZpbmRzIHRoZSB3b3JkIHRoYXQgY29udGFpbnMgdGhlIGNoYXJhY3RlciBhdCB0aGUgZ2l2ZW4gb2Zmc2V0XG4gICAqL1xuICBmaW5kV29yZENvbnRhaW5pbmcob2Zmc2V0KSB7XG4gICAgaWYgKG9mZnNldCA8IDAgfHwgb2Zmc2V0ID49IHRoaXMuZWxlbWVudHMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBpZiAoIWlzV29yZENoYXIodGhpcy5lbGVtZW50c1tvZmZzZXRdKSkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgbGV0IHN0YXJ0ID0gb2Zmc2V0O1xuICAgIHdoaWxlIChzdGFydCA+IDAgJiYgaXNXb3JkQ2hhcih0aGlzLmVsZW1lbnRzW3N0YXJ0IC0gMV0pKSB7XG4gICAgICBzdGFydC0tO1xuICAgIH1cbiAgICBsZXQgZW5kID0gb2Zmc2V0O1xuICAgIHdoaWxlIChlbmQgPCB0aGlzLmVsZW1lbnRzLmxlbmd0aCAmJiBpc1dvcmRDaGFyKHRoaXMuZWxlbWVudHNbZW5kXSkpIHtcbiAgICAgIGVuZCsrO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IE9mZnNldFJhbmdlKHN0YXJ0LCBlbmQpO1xuICB9XG4gIC8qKiBmb29CYXIgaGFzIHRoZSB0d28gc3ViLXdvcmRzIGZvbyBhbmQgYmFyICovXG4gIGZpbmRTdWJXb3JkQ29udGFpbmluZyhvZmZzZXQpIHtcbiAgICBpZiAob2Zmc2V0IDwgMCB8fCBvZmZzZXQgPj0gdGhpcy5lbGVtZW50cy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGlmICghaXNXb3JkQ2hhcih0aGlzLmVsZW1lbnRzW29mZnNldF0pKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBsZXQgc3RhcnQgPSBvZmZzZXQ7XG4gICAgd2hpbGUgKHN0YXJ0ID4gMCAmJiBpc1dvcmRDaGFyKHRoaXMuZWxlbWVudHNbc3RhcnQgLSAxXSkgJiYgIWlzVXBwZXJDYXNlKHRoaXMuZWxlbWVudHNbc3RhcnRdKSkge1xuICAgICAgc3RhcnQtLTtcbiAgICB9XG4gICAgbGV0IGVuZCA9IG9mZnNldDtcbiAgICB3aGlsZSAoZW5kIDwgdGhpcy5lbGVtZW50cy5sZW5ndGggJiYgaXNXb3JkQ2hhcih0aGlzLmVsZW1lbnRzW2VuZF0pICYmICFpc1VwcGVyQ2FzZSh0aGlzLmVsZW1lbnRzW2VuZF0pKSB7XG4gICAgICBlbmQrKztcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBPZmZzZXRSYW5nZShzdGFydCwgZW5kKTtcbiAgfVxuICBjb3VudExpbmVzSW4ocmFuZ2UpIHtcbiAgICByZXR1cm4gdGhpcy50cmFuc2xhdGVPZmZzZXQocmFuZ2UuZW5kRXhjbHVzaXZlKS5saW5lTnVtYmVyIC0gdGhpcy50cmFuc2xhdGVPZmZzZXQocmFuZ2Uuc3RhcnQpLmxpbmVOdW1iZXI7XG4gIH1cbiAgaXNTdHJvbmdseUVxdWFsKG9mZnNldDEsIG9mZnNldDIpIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50c1tvZmZzZXQxXSA9PT0gdGhpcy5lbGVtZW50c1tvZmZzZXQyXTtcbiAgfVxuICBleHRlbmRUb0Z1bGxMaW5lcyhyYW5nZSkge1xuICAgIGNvbnN0IHN0YXJ0ID0gZmluZExhc3RNb25vdG9ub3VzKHRoaXMuZmlyc3RFbGVtZW50T2Zmc2V0QnlMaW5lSWR4LCAoeCkgPT4geCA8PSByYW5nZS5zdGFydCkgPz8gMDtcbiAgICBjb25zdCBlbmQgPSBmaW5kRmlyc3RNb25vdG9ub3VzKHRoaXMuZmlyc3RFbGVtZW50T2Zmc2V0QnlMaW5lSWR4LCAoeCkgPT4gcmFuZ2UuZW5kRXhjbHVzaXZlIDw9IHgpID8/IHRoaXMuZWxlbWVudHMubGVuZ3RoO1xuICAgIHJldHVybiBuZXcgT2Zmc2V0UmFuZ2Uoc3RhcnQsIGVuZCk7XG4gIH1cbn1cbmZ1bmN0aW9uIGlzV29yZENoYXIoY2hhckNvZGUpIHtcbiAgcmV0dXJuIGNoYXJDb2RlID49IDk3ICYmIGNoYXJDb2RlIDw9IDEyMiB8fCBjaGFyQ29kZSA+PSA2NSAmJiBjaGFyQ29kZSA8PSA5MCB8fCBjaGFyQ29kZSA+PSA0OCAmJiBjaGFyQ29kZSA8PSA1Nztcbn1cbmZ1bmN0aW9uIGlzVXBwZXJDYXNlKGNoYXJDb2RlKSB7XG4gIHJldHVybiBjaGFyQ29kZSA+PSA2NSAmJiBjaGFyQ29kZSA8PSA5MDtcbn1cbmNvbnN0IHNjb3JlID0ge1xuICBbMCAvKiBXb3JkTG93ZXIgKi9dOiAwLFxuICBbMSAvKiBXb3JkVXBwZXIgKi9dOiAwLFxuICBbMiAvKiBXb3JkTnVtYmVyICovXTogMCxcbiAgWzMgLyogRW5kICovXTogMTAsXG4gIFs0IC8qIE90aGVyICovXTogMixcbiAgWzUgLyogU2VwYXJhdG9yICovXTogMzAsXG4gIFs2IC8qIFNwYWNlICovXTogMyxcbiAgWzcgLyogTGluZUJyZWFrQ1IgKi9dOiAxMCxcbiAgWzggLyogTGluZUJyZWFrTEYgKi9dOiAxMFxufTtcbmZ1bmN0aW9uIGdldENhdGVnb3J5Qm91bmRhcnlTY29yZShjYXRlZ29yeSkge1xuICByZXR1cm4gc2NvcmVbY2F0ZWdvcnldO1xufVxuZnVuY3Rpb24gZ2V0Q2F0ZWdvcnkoY2hhckNvZGUpIHtcbiAgaWYgKGNoYXJDb2RlID09PSAxMCkge1xuICAgIHJldHVybiA4IC8qIExpbmVCcmVha0xGICovO1xuICB9IGVsc2UgaWYgKGNoYXJDb2RlID09PSAxMykge1xuICAgIHJldHVybiA3IC8qIExpbmVCcmVha0NSICovO1xuICB9IGVsc2UgaWYgKGlzU3BhY2UoY2hhckNvZGUpKSB7XG4gICAgcmV0dXJuIDYgLyogU3BhY2UgKi87XG4gIH0gZWxzZSBpZiAoY2hhckNvZGUgPj0gOTcgJiYgY2hhckNvZGUgPD0gMTIyKSB7XG4gICAgcmV0dXJuIDAgLyogV29yZExvd2VyICovO1xuICB9IGVsc2UgaWYgKGNoYXJDb2RlID49IDY1ICYmIGNoYXJDb2RlIDw9IDkwKSB7XG4gICAgcmV0dXJuIDEgLyogV29yZFVwcGVyICovO1xuICB9IGVsc2UgaWYgKGNoYXJDb2RlID49IDQ4ICYmIGNoYXJDb2RlIDw9IDU3KSB7XG4gICAgcmV0dXJuIDIgLyogV29yZE51bWJlciAqLztcbiAgfSBlbHNlIGlmIChjaGFyQ29kZSA9PT0gLTEpIHtcbiAgICByZXR1cm4gMyAvKiBFbmQgKi87XG4gIH0gZWxzZSBpZiAoY2hhckNvZGUgPT09IDQ0IHx8IGNoYXJDb2RlID09PSA1OSkge1xuICAgIHJldHVybiA1IC8qIFNlcGFyYXRvciAqLztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gNCAvKiBPdGhlciAqLztcbiAgfVxufVxuXG5mdW5jdGlvbiBjb21wdXRlTW92ZWRMaW5lcyhjaGFuZ2VzLCBvcmlnaW5hbExpbmVzLCBtb2RpZmllZExpbmVzLCBoYXNoZWRPcmlnaW5hbExpbmVzLCBoYXNoZWRNb2RpZmllZExpbmVzLCB0aW1lb3V0KSB7XG4gIGxldCB7IG1vdmVzLCBleGNsdWRlZENoYW5nZXMgfSA9IGNvbXB1dGVNb3Zlc0Zyb21TaW1wbGVEZWxldGlvbnNUb1NpbXBsZUluc2VydGlvbnMoY2hhbmdlcywgb3JpZ2luYWxMaW5lcywgbW9kaWZpZWRMaW5lcywgdGltZW91dCk7XG4gIGlmICghdGltZW91dC5pc1ZhbGlkKCkpIHtcbiAgICByZXR1cm4gW107XG4gIH1cbiAgY29uc3QgZmlsdGVyZWRDaGFuZ2VzID0gY2hhbmdlcy5maWx0ZXIoKGMpID0+ICFleGNsdWRlZENoYW5nZXMuaGFzKGMpKTtcbiAgY29uc3QgdW5jaGFuZ2VkTW92ZXMgPSBjb21wdXRlVW5jaGFuZ2VkTW92ZXMoZmlsdGVyZWRDaGFuZ2VzLCBoYXNoZWRPcmlnaW5hbExpbmVzLCBoYXNoZWRNb2RpZmllZExpbmVzLCBvcmlnaW5hbExpbmVzLCBtb2RpZmllZExpbmVzLCB0aW1lb3V0KTtcbiAgcHVzaE1hbnkobW92ZXMsIHVuY2hhbmdlZE1vdmVzKTtcbiAgbW92ZXMgPSBqb2luQ2xvc2VDb25zZWN1dGl2ZU1vdmVzKG1vdmVzKTtcbiAgbW92ZXMgPSBtb3Zlcy5maWx0ZXIoKGN1cnJlbnQpID0+IHtcbiAgICBjb25zdCBsaW5lcyA9IGN1cnJlbnQub3JpZ2luYWwudG9PZmZzZXRSYW5nZSgpLnNsaWNlKG9yaWdpbmFsTGluZXMpLm1hcCgobCkgPT4gbC50cmltKCkpO1xuICAgIGNvbnN0IG9yaWdpbmFsVGV4dCA9IGxpbmVzLmpvaW4oXCJcXG5cIik7XG4gICAgcmV0dXJuIG9yaWdpbmFsVGV4dC5sZW5ndGggPj0gMTUgJiYgY291bnRXaGVyZShsaW5lcywgKGwpID0+IGwubGVuZ3RoID49IDIpID49IDI7XG4gIH0pO1xuICBtb3ZlcyA9IHJlbW92ZU1vdmVzSW5TYW1lRGlmZihjaGFuZ2VzLCBtb3Zlcyk7XG4gIHJldHVybiBtb3Zlcztcbn1cbmZ1bmN0aW9uIGNvdW50V2hlcmUoYXJyLCBwcmVkaWNhdGUpIHtcbiAgbGV0IGNvdW50ID0gMDtcbiAgZm9yIChjb25zdCB0IG9mIGFycikge1xuICAgIGlmIChwcmVkaWNhdGUodCkpIHtcbiAgICAgIGNvdW50Kys7XG4gICAgfVxuICB9XG4gIHJldHVybiBjb3VudDtcbn1cbmZ1bmN0aW9uIGNvbXB1dGVNb3Zlc0Zyb21TaW1wbGVEZWxldGlvbnNUb1NpbXBsZUluc2VydGlvbnMoY2hhbmdlcywgb3JpZ2luYWxMaW5lcywgbW9kaWZpZWRMaW5lcywgdGltZW91dCkge1xuICBjb25zdCBtb3ZlcyA9IFtdO1xuICBjb25zdCBkZWxldGlvbnMgPSBjaGFuZ2VzLmZpbHRlcigoYykgPT4gYy5tb2RpZmllZC5pc0VtcHR5ICYmIGMub3JpZ2luYWwubGVuZ3RoID49IDMpLm1hcCgoZCkgPT4gbmV3IExpbmVSYW5nZUZyYWdtZW50KGQub3JpZ2luYWwsIG9yaWdpbmFsTGluZXMsIGQpKTtcbiAgY29uc3QgaW5zZXJ0aW9ucyA9IG5ldyBTZXQoY2hhbmdlcy5maWx0ZXIoKGMpID0+IGMub3JpZ2luYWwuaXNFbXB0eSAmJiBjLm1vZGlmaWVkLmxlbmd0aCA+PSAzKS5tYXAoKGQpID0+IG5ldyBMaW5lUmFuZ2VGcmFnbWVudChkLm1vZGlmaWVkLCBtb2RpZmllZExpbmVzLCBkKSkpO1xuICBjb25zdCBleGNsdWRlZENoYW5nZXMgPSAvKiBAX19QVVJFX18gKi8gbmV3IFNldCgpO1xuICBmb3IgKGNvbnN0IGRlbGV0aW9uIG9mIGRlbGV0aW9ucykge1xuICAgIGxldCBoaWdoZXN0U2ltaWxhcml0eSA9IC0xO1xuICAgIGxldCBiZXN0O1xuICAgIGZvciAoY29uc3QgaW5zZXJ0aW9uIG9mIGluc2VydGlvbnMpIHtcbiAgICAgIGNvbnN0IHNpbWlsYXJpdHkgPSBkZWxldGlvbi5jb21wdXRlU2ltaWxhcml0eShpbnNlcnRpb24pO1xuICAgICAgaWYgKHNpbWlsYXJpdHkgPiBoaWdoZXN0U2ltaWxhcml0eSkge1xuICAgICAgICBoaWdoZXN0U2ltaWxhcml0eSA9IHNpbWlsYXJpdHk7XG4gICAgICAgIGJlc3QgPSBpbnNlcnRpb247XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChoaWdoZXN0U2ltaWxhcml0eSA+IDAuOSAmJiBiZXN0KSB7XG4gICAgICBpbnNlcnRpb25zLmRlbGV0ZShiZXN0KTtcbiAgICAgIG1vdmVzLnB1c2gobmV3IExpbmVSYW5nZU1hcHBpbmcoZGVsZXRpb24ucmFuZ2UsIGJlc3QucmFuZ2UpKTtcbiAgICAgIGV4Y2x1ZGVkQ2hhbmdlcy5hZGQoZGVsZXRpb24uc291cmNlKTtcbiAgICAgIGV4Y2x1ZGVkQ2hhbmdlcy5hZGQoYmVzdC5zb3VyY2UpO1xuICAgIH1cbiAgICBpZiAoIXRpbWVvdXQuaXNWYWxpZCgpKSB7XG4gICAgICByZXR1cm4geyBtb3ZlcywgZXhjbHVkZWRDaGFuZ2VzIH07XG4gICAgfVxuICB9XG4gIHJldHVybiB7IG1vdmVzLCBleGNsdWRlZENoYW5nZXMgfTtcbn1cbmZ1bmN0aW9uIGNvbXB1dGVVbmNoYW5nZWRNb3ZlcyhjaGFuZ2VzLCBoYXNoZWRPcmlnaW5hbExpbmVzLCBoYXNoZWRNb2RpZmllZExpbmVzLCBvcmlnaW5hbExpbmVzLCBtb2RpZmllZExpbmVzLCB0aW1lb3V0KSB7XG4gIGNvbnN0IG1vdmVzID0gW107XG4gIGNvbnN0IG9yaWdpbmFsM0xpbmVIYXNoZXMgPSBuZXcgU2V0TWFwKCk7XG4gIGZvciAoY29uc3QgY2hhbmdlIG9mIGNoYW5nZXMpIHtcbiAgICBmb3IgKGxldCBpID0gY2hhbmdlLm9yaWdpbmFsLnN0YXJ0TGluZU51bWJlcjsgaSA8IGNoYW5nZS5vcmlnaW5hbC5lbmRMaW5lTnVtYmVyRXhjbHVzaXZlIC0gMjsgaSsrKSB7XG4gICAgICBjb25zdCBrZXkgPSBgJHtoYXNoZWRPcmlnaW5hbExpbmVzW2kgLSAxXX06JHtoYXNoZWRPcmlnaW5hbExpbmVzW2kgKyAxIC0gMV19OiR7aGFzaGVkT3JpZ2luYWxMaW5lc1tpICsgMiAtIDFdfWA7XG4gICAgICBvcmlnaW5hbDNMaW5lSGFzaGVzLmFkZChrZXksIHsgcmFuZ2U6IG5ldyBMaW5lUmFuZ2UoaSwgaSArIDMpIH0pO1xuICAgIH1cbiAgfVxuICBjb25zdCBwb3NzaWJsZU1hcHBpbmdzID0gW107XG4gIGNoYW5nZXMuc29ydChjb21wYXJlQnkoKGMpID0+IGMubW9kaWZpZWQuc3RhcnRMaW5lTnVtYmVyLCBudW1iZXJDb21wYXJhdG9yKSk7XG4gIGZvciAoY29uc3QgY2hhbmdlIG9mIGNoYW5nZXMpIHtcbiAgICBsZXQgbGFzdE1hcHBpbmdzID0gW107XG4gICAgZm9yIChsZXQgaSA9IGNoYW5nZS5tb2RpZmllZC5zdGFydExpbmVOdW1iZXI7IGkgPCBjaGFuZ2UubW9kaWZpZWQuZW5kTGluZU51bWJlckV4Y2x1c2l2ZSAtIDI7IGkrKykge1xuICAgICAgY29uc3Qga2V5ID0gYCR7aGFzaGVkTW9kaWZpZWRMaW5lc1tpIC0gMV19OiR7aGFzaGVkTW9kaWZpZWRMaW5lc1tpICsgMSAtIDFdfToke2hhc2hlZE1vZGlmaWVkTGluZXNbaSArIDIgLSAxXX1gO1xuICAgICAgY29uc3QgY3VycmVudE1vZGlmaWVkUmFuZ2UgPSBuZXcgTGluZVJhbmdlKGksIGkgKyAzKTtcbiAgICAgIGNvbnN0IG5leHRNYXBwaW5ncyA9IFtdO1xuICAgICAgb3JpZ2luYWwzTGluZUhhc2hlcy5mb3JFYWNoKGtleSwgKHsgcmFuZ2UgfSkgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IGxhc3RNYXBwaW5nIG9mIGxhc3RNYXBwaW5ncykge1xuICAgICAgICAgIGlmIChsYXN0TWFwcGluZy5vcmlnaW5hbExpbmVSYW5nZS5lbmRMaW5lTnVtYmVyRXhjbHVzaXZlICsgMSA9PT0gcmFuZ2UuZW5kTGluZU51bWJlckV4Y2x1c2l2ZSAmJiBsYXN0TWFwcGluZy5tb2RpZmllZExpbmVSYW5nZS5lbmRMaW5lTnVtYmVyRXhjbHVzaXZlICsgMSA9PT0gY3VycmVudE1vZGlmaWVkUmFuZ2UuZW5kTGluZU51bWJlckV4Y2x1c2l2ZSkge1xuICAgICAgICAgICAgbGFzdE1hcHBpbmcub3JpZ2luYWxMaW5lUmFuZ2UgPSBuZXcgTGluZVJhbmdlKGxhc3RNYXBwaW5nLm9yaWdpbmFsTGluZVJhbmdlLnN0YXJ0TGluZU51bWJlciwgcmFuZ2UuZW5kTGluZU51bWJlckV4Y2x1c2l2ZSk7XG4gICAgICAgICAgICBsYXN0TWFwcGluZy5tb2RpZmllZExpbmVSYW5nZSA9IG5ldyBMaW5lUmFuZ2UobGFzdE1hcHBpbmcubW9kaWZpZWRMaW5lUmFuZ2Uuc3RhcnRMaW5lTnVtYmVyLCBjdXJyZW50TW9kaWZpZWRSYW5nZS5lbmRMaW5lTnVtYmVyRXhjbHVzaXZlKTtcbiAgICAgICAgICAgIG5leHRNYXBwaW5ncy5wdXNoKGxhc3RNYXBwaW5nKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbWFwcGluZyA9IHtcbiAgICAgICAgICBtb2RpZmllZExpbmVSYW5nZTogY3VycmVudE1vZGlmaWVkUmFuZ2UsXG4gICAgICAgICAgb3JpZ2luYWxMaW5lUmFuZ2U6IHJhbmdlXG4gICAgICAgIH07XG4gICAgICAgIHBvc3NpYmxlTWFwcGluZ3MucHVzaChtYXBwaW5nKTtcbiAgICAgICAgbmV4dE1hcHBpbmdzLnB1c2gobWFwcGluZyk7XG4gICAgICB9KTtcbiAgICAgIGxhc3RNYXBwaW5ncyA9IG5leHRNYXBwaW5ncztcbiAgICB9XG4gICAgaWYgKCF0aW1lb3V0LmlzVmFsaWQoKSkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgfVxuICBwb3NzaWJsZU1hcHBpbmdzLnNvcnQocmV2ZXJzZU9yZGVyKGNvbXBhcmVCeSgobSkgPT4gbS5tb2RpZmllZExpbmVSYW5nZS5sZW5ndGgsIG51bWJlckNvbXBhcmF0b3IpKSk7XG4gIGNvbnN0IG1vZGlmaWVkU2V0ID0gbmV3IExpbmVSYW5nZVNldCgpO1xuICBjb25zdCBvcmlnaW5hbFNldCA9IG5ldyBMaW5lUmFuZ2VTZXQoKTtcbiAgZm9yIChjb25zdCBtYXBwaW5nIG9mIHBvc3NpYmxlTWFwcGluZ3MpIHtcbiAgICBjb25zdCBkaWZmT3JpZ1RvTW9kID0gbWFwcGluZy5tb2RpZmllZExpbmVSYW5nZS5zdGFydExpbmVOdW1iZXIgLSBtYXBwaW5nLm9yaWdpbmFsTGluZVJhbmdlLnN0YXJ0TGluZU51bWJlcjtcbiAgICBjb25zdCBtb2RpZmllZFNlY3Rpb25zID0gbW9kaWZpZWRTZXQuc3VidHJhY3RGcm9tKG1hcHBpbmcubW9kaWZpZWRMaW5lUmFuZ2UpO1xuICAgIGNvbnN0IG9yaWdpbmFsVHJhbnNsYXRlZFNlY3Rpb25zID0gb3JpZ2luYWxTZXQuc3VidHJhY3RGcm9tKG1hcHBpbmcub3JpZ2luYWxMaW5lUmFuZ2UpLmdldFdpdGhEZWx0YShkaWZmT3JpZ1RvTW9kKTtcbiAgICBjb25zdCBtb2RpZmllZEludGVyc2VjdGVkU2VjdGlvbnMgPSBtb2RpZmllZFNlY3Rpb25zLmdldEludGVyc2VjdGlvbihvcmlnaW5hbFRyYW5zbGF0ZWRTZWN0aW9ucyk7XG4gICAgZm9yIChjb25zdCBzIG9mIG1vZGlmaWVkSW50ZXJzZWN0ZWRTZWN0aW9ucy5yYW5nZXMpIHtcbiAgICAgIGlmIChzLmxlbmd0aCA8IDMpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBjb25zdCBtb2RpZmllZExpbmVSYW5nZSA9IHM7XG4gICAgICBjb25zdCBvcmlnaW5hbExpbmVSYW5nZSA9IHMuZGVsdGEoLWRpZmZPcmlnVG9Nb2QpO1xuICAgICAgbW92ZXMucHVzaChuZXcgTGluZVJhbmdlTWFwcGluZyhvcmlnaW5hbExpbmVSYW5nZSwgbW9kaWZpZWRMaW5lUmFuZ2UpKTtcbiAgICAgIG1vZGlmaWVkU2V0LmFkZFJhbmdlKG1vZGlmaWVkTGluZVJhbmdlKTtcbiAgICAgIG9yaWdpbmFsU2V0LmFkZFJhbmdlKG9yaWdpbmFsTGluZVJhbmdlKTtcbiAgICB9XG4gIH1cbiAgbW92ZXMuc29ydChjb21wYXJlQnkoKG0pID0+IG0ub3JpZ2luYWwuc3RhcnRMaW5lTnVtYmVyLCBudW1iZXJDb21wYXJhdG9yKSk7XG4gIGNvbnN0IG1vbm90b25vdXNDaGFuZ2VzID0gbmV3IE1vbm90b25vdXNBcnJheShjaGFuZ2VzKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBtb3Zlcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IG1vdmUgPSBtb3Zlc1tpXTtcbiAgICBjb25zdCBmaXJzdFRvdWNoaW5nQ2hhbmdlT3JpZyA9IG1vbm90b25vdXNDaGFuZ2VzLmZpbmRMYXN0TW9ub3Rvbm91cygoYykgPT4gYy5vcmlnaW5hbC5zdGFydExpbmVOdW1iZXIgPD0gbW92ZS5vcmlnaW5hbC5zdGFydExpbmVOdW1iZXIpO1xuICAgIGNvbnN0IGZpcnN0VG91Y2hpbmdDaGFuZ2VNb2QgPSBmaW5kTGFzdE1vbm90b25vdXMoY2hhbmdlcywgKGMpID0+IGMubW9kaWZpZWQuc3RhcnRMaW5lTnVtYmVyIDw9IG1vdmUubW9kaWZpZWQuc3RhcnRMaW5lTnVtYmVyKTtcbiAgICBjb25zdCBsaW5lc0Fib3ZlID0gTWF0aC5tYXgoXG4gICAgICBtb3ZlLm9yaWdpbmFsLnN0YXJ0TGluZU51bWJlciAtIGZpcnN0VG91Y2hpbmdDaGFuZ2VPcmlnLm9yaWdpbmFsLnN0YXJ0TGluZU51bWJlcixcbiAgICAgIG1vdmUubW9kaWZpZWQuc3RhcnRMaW5lTnVtYmVyIC0gZmlyc3RUb3VjaGluZ0NoYW5nZU1vZC5tb2RpZmllZC5zdGFydExpbmVOdW1iZXJcbiAgICApO1xuICAgIGNvbnN0IGxhc3RUb3VjaGluZ0NoYW5nZU9yaWcgPSBtb25vdG9ub3VzQ2hhbmdlcy5maW5kTGFzdE1vbm90b25vdXMoKGMpID0+IGMub3JpZ2luYWwuc3RhcnRMaW5lTnVtYmVyIDwgbW92ZS5vcmlnaW5hbC5lbmRMaW5lTnVtYmVyRXhjbHVzaXZlKTtcbiAgICBjb25zdCBsYXN0VG91Y2hpbmdDaGFuZ2VNb2QgPSBmaW5kTGFzdE1vbm90b25vdXMoY2hhbmdlcywgKGMpID0+IGMubW9kaWZpZWQuc3RhcnRMaW5lTnVtYmVyIDwgbW92ZS5tb2RpZmllZC5lbmRMaW5lTnVtYmVyRXhjbHVzaXZlKTtcbiAgICBjb25zdCBsaW5lc0JlbG93ID0gTWF0aC5tYXgoXG4gICAgICBsYXN0VG91Y2hpbmdDaGFuZ2VPcmlnLm9yaWdpbmFsLmVuZExpbmVOdW1iZXJFeGNsdXNpdmUgLSBtb3ZlLm9yaWdpbmFsLmVuZExpbmVOdW1iZXJFeGNsdXNpdmUsXG4gICAgICBsYXN0VG91Y2hpbmdDaGFuZ2VNb2QubW9kaWZpZWQuZW5kTGluZU51bWJlckV4Y2x1c2l2ZSAtIG1vdmUubW9kaWZpZWQuZW5kTGluZU51bWJlckV4Y2x1c2l2ZVxuICAgICk7XG4gICAgbGV0IGV4dGVuZFRvVG9wO1xuICAgIGZvciAoZXh0ZW5kVG9Ub3AgPSAwOyBleHRlbmRUb1RvcCA8IGxpbmVzQWJvdmU7IGV4dGVuZFRvVG9wKyspIHtcbiAgICAgIGNvbnN0IG9yaWdMaW5lID0gbW92ZS5vcmlnaW5hbC5zdGFydExpbmVOdW1iZXIgLSBleHRlbmRUb1RvcCAtIDE7XG4gICAgICBjb25zdCBtb2RMaW5lID0gbW92ZS5tb2RpZmllZC5zdGFydExpbmVOdW1iZXIgLSBleHRlbmRUb1RvcCAtIDE7XG4gICAgICBpZiAob3JpZ0xpbmUgPiBvcmlnaW5hbExpbmVzLmxlbmd0aCB8fCBtb2RMaW5lID4gbW9kaWZpZWRMaW5lcy5sZW5ndGgpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBpZiAobW9kaWZpZWRTZXQuY29udGFpbnMobW9kTGluZSkgfHwgb3JpZ2luYWxTZXQuY29udGFpbnMob3JpZ0xpbmUpKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgaWYgKCFhcmVMaW5lc1NpbWlsYXIob3JpZ2luYWxMaW5lc1tvcmlnTGluZSAtIDFdLCBtb2RpZmllZExpbmVzW21vZExpbmUgLSAxXSwgdGltZW91dCkpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChleHRlbmRUb1RvcCA+IDApIHtcbiAgICAgIG9yaWdpbmFsU2V0LmFkZFJhbmdlKG5ldyBMaW5lUmFuZ2UobW92ZS5vcmlnaW5hbC5zdGFydExpbmVOdW1iZXIgLSBleHRlbmRUb1RvcCwgbW92ZS5vcmlnaW5hbC5zdGFydExpbmVOdW1iZXIpKTtcbiAgICAgIG1vZGlmaWVkU2V0LmFkZFJhbmdlKG5ldyBMaW5lUmFuZ2UobW92ZS5tb2RpZmllZC5zdGFydExpbmVOdW1iZXIgLSBleHRlbmRUb1RvcCwgbW92ZS5tb2RpZmllZC5zdGFydExpbmVOdW1iZXIpKTtcbiAgICB9XG4gICAgbGV0IGV4dGVuZFRvQm90dG9tO1xuICAgIGZvciAoZXh0ZW5kVG9Cb3R0b20gPSAwOyBleHRlbmRUb0JvdHRvbSA8IGxpbmVzQmVsb3c7IGV4dGVuZFRvQm90dG9tKyspIHtcbiAgICAgIGNvbnN0IG9yaWdMaW5lID0gbW92ZS5vcmlnaW5hbC5lbmRMaW5lTnVtYmVyRXhjbHVzaXZlICsgZXh0ZW5kVG9Cb3R0b207XG4gICAgICBjb25zdCBtb2RMaW5lID0gbW92ZS5tb2RpZmllZC5lbmRMaW5lTnVtYmVyRXhjbHVzaXZlICsgZXh0ZW5kVG9Cb3R0b207XG4gICAgICBpZiAob3JpZ0xpbmUgPiBvcmlnaW5hbExpbmVzLmxlbmd0aCB8fCBtb2RMaW5lID4gbW9kaWZpZWRMaW5lcy5sZW5ndGgpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBpZiAobW9kaWZpZWRTZXQuY29udGFpbnMobW9kTGluZSkgfHwgb3JpZ2luYWxTZXQuY29udGFpbnMob3JpZ0xpbmUpKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgaWYgKCFhcmVMaW5lc1NpbWlsYXIob3JpZ2luYWxMaW5lc1tvcmlnTGluZSAtIDFdLCBtb2RpZmllZExpbmVzW21vZExpbmUgLSAxXSwgdGltZW91dCkpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChleHRlbmRUb0JvdHRvbSA+IDApIHtcbiAgICAgIG9yaWdpbmFsU2V0LmFkZFJhbmdlKG5ldyBMaW5lUmFuZ2UobW92ZS5vcmlnaW5hbC5lbmRMaW5lTnVtYmVyRXhjbHVzaXZlLCBtb3ZlLm9yaWdpbmFsLmVuZExpbmVOdW1iZXJFeGNsdXNpdmUgKyBleHRlbmRUb0JvdHRvbSkpO1xuICAgICAgbW9kaWZpZWRTZXQuYWRkUmFuZ2UobmV3IExpbmVSYW5nZShtb3ZlLm1vZGlmaWVkLmVuZExpbmVOdW1iZXJFeGNsdXNpdmUsIG1vdmUubW9kaWZpZWQuZW5kTGluZU51bWJlckV4Y2x1c2l2ZSArIGV4dGVuZFRvQm90dG9tKSk7XG4gICAgfVxuICAgIGlmIChleHRlbmRUb1RvcCA+IDAgfHwgZXh0ZW5kVG9Cb3R0b20gPiAwKSB7XG4gICAgICBtb3Zlc1tpXSA9IG5ldyBMaW5lUmFuZ2VNYXBwaW5nKFxuICAgICAgICBuZXcgTGluZVJhbmdlKG1vdmUub3JpZ2luYWwuc3RhcnRMaW5lTnVtYmVyIC0gZXh0ZW5kVG9Ub3AsIG1vdmUub3JpZ2luYWwuZW5kTGluZU51bWJlckV4Y2x1c2l2ZSArIGV4dGVuZFRvQm90dG9tKSxcbiAgICAgICAgbmV3IExpbmVSYW5nZShtb3ZlLm1vZGlmaWVkLnN0YXJ0TGluZU51bWJlciAtIGV4dGVuZFRvVG9wLCBtb3ZlLm1vZGlmaWVkLmVuZExpbmVOdW1iZXJFeGNsdXNpdmUgKyBleHRlbmRUb0JvdHRvbSlcbiAgICAgICk7XG4gICAgfVxuICB9XG4gIHJldHVybiBtb3Zlcztcbn1cbmZ1bmN0aW9uIGFyZUxpbmVzU2ltaWxhcihsaW5lMSwgbGluZTIsIHRpbWVvdXQpIHtcbiAgaWYgKGxpbmUxLnRyaW0oKSA9PT0gbGluZTIudHJpbSgpKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaWYgKGxpbmUxLmxlbmd0aCA+IDMwMCAmJiBsaW5lMi5sZW5ndGggPiAzMDApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgY29uc3QgbXllcnNEaWZmaW5nQWxnb3JpdGhtID0gbmV3IE15ZXJzRGlmZkFsZ29yaXRobSgpO1xuICBjb25zdCByZXN1bHQgPSBteWVyc0RpZmZpbmdBbGdvcml0aG0uY29tcHV0ZShcbiAgICBuZXcgTGluZXNTbGljZUNoYXJTZXF1ZW5jZShbbGluZTFdLCBuZXcgUmFuZ2UoMSwgMSwgMSwgbGluZTEubGVuZ3RoKSwgZmFsc2UpLFxuICAgIG5ldyBMaW5lc1NsaWNlQ2hhclNlcXVlbmNlKFtsaW5lMl0sIG5ldyBSYW5nZSgxLCAxLCAxLCBsaW5lMi5sZW5ndGgpLCBmYWxzZSksXG4gICAgdGltZW91dFxuICApO1xuICBsZXQgY29tbW9uTm9uU3BhY2VDaGFyQ291bnQgPSAwO1xuICBjb25zdCBpbnZlcnRlZCA9IFNlcXVlbmNlRGlmZi5pbnZlcnQocmVzdWx0LmRpZmZzLCBsaW5lMS5sZW5ndGgpO1xuICBmb3IgKGNvbnN0IHNlcSBvZiBpbnZlcnRlZCkge1xuICAgIHNlcS5zZXExUmFuZ2UuZm9yRWFjaCgoaWR4KSA9PiB7XG4gICAgICBpZiAoIWlzU3BhY2UobGluZTEuY2hhckNvZGVBdChpZHgpKSkge1xuICAgICAgICBjb21tb25Ob25TcGFjZUNoYXJDb3VudCsrO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIGZ1bmN0aW9uIGNvdW50Tm9uV3NDaGFycyhzdHIpIHtcbiAgICBsZXQgY291bnQgPSAwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGluZTEubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICghaXNTcGFjZShzdHIuY2hhckNvZGVBdChpKSkpIHtcbiAgICAgICAgY291bnQrKztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNvdW50O1xuICB9XG4gIGNvbnN0IGxvbmdlckxpbmVMZW5ndGggPSBjb3VudE5vbldzQ2hhcnMobGluZTEubGVuZ3RoID4gbGluZTIubGVuZ3RoID8gbGluZTEgOiBsaW5lMik7XG4gIGNvbnN0IHIgPSBjb21tb25Ob25TcGFjZUNoYXJDb3VudCAvIGxvbmdlckxpbmVMZW5ndGggPiAwLjYgJiYgbG9uZ2VyTGluZUxlbmd0aCA+IDEwO1xuICByZXR1cm4gcjtcbn1cbmZ1bmN0aW9uIGpvaW5DbG9zZUNvbnNlY3V0aXZlTW92ZXMobW92ZXMpIHtcbiAgaWYgKG1vdmVzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBtb3ZlcztcbiAgfVxuICBtb3Zlcy5zb3J0KGNvbXBhcmVCeSgobSkgPT4gbS5vcmlnaW5hbC5zdGFydExpbmVOdW1iZXIsIG51bWJlckNvbXBhcmF0b3IpKTtcbiAgY29uc3QgcmVzdWx0ID0gW21vdmVzWzBdXTtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCBtb3Zlcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGxhc3QgPSByZXN1bHRbcmVzdWx0Lmxlbmd0aCAtIDFdO1xuICAgIGNvbnN0IGN1cnJlbnQgPSBtb3Zlc1tpXTtcbiAgICBjb25zdCBvcmlnaW5hbERpc3QgPSBjdXJyZW50Lm9yaWdpbmFsLnN0YXJ0TGluZU51bWJlciAtIGxhc3Qub3JpZ2luYWwuZW5kTGluZU51bWJlckV4Y2x1c2l2ZTtcbiAgICBjb25zdCBtb2RpZmllZERpc3QgPSBjdXJyZW50Lm1vZGlmaWVkLnN0YXJ0TGluZU51bWJlciAtIGxhc3QubW9kaWZpZWQuZW5kTGluZU51bWJlckV4Y2x1c2l2ZTtcbiAgICBjb25zdCBjdXJyZW50TW92ZUFmdGVyTGFzdCA9IG9yaWdpbmFsRGlzdCA+PSAwICYmIG1vZGlmaWVkRGlzdCA+PSAwO1xuICAgIGlmIChjdXJyZW50TW92ZUFmdGVyTGFzdCAmJiBvcmlnaW5hbERpc3QgKyBtb2RpZmllZERpc3QgPD0gMikge1xuICAgICAgcmVzdWx0W3Jlc3VsdC5sZW5ndGggLSAxXSA9IGxhc3Quam9pbihjdXJyZW50KTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICByZXN1bHQucHVzaChjdXJyZW50KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gcmVtb3ZlTW92ZXNJblNhbWVEaWZmKGNoYW5nZXMsIG1vdmVzKSB7XG4gIGNvbnN0IGNoYW5nZXNNb25vdG9ub3VzID0gbmV3IE1vbm90b25vdXNBcnJheShjaGFuZ2VzKTtcbiAgbW92ZXMgPSBtb3Zlcy5maWx0ZXIoKG0pID0+IHtcbiAgICBjb25zdCBkaWZmQmVmb3JlRW5kT2ZNb3ZlT3JpZ2luYWwgPSBjaGFuZ2VzTW9ub3Rvbm91cy5maW5kTGFzdE1vbm90b25vdXMoKGMpID0+IGMub3JpZ2luYWwuc3RhcnRMaW5lTnVtYmVyIDwgbS5vcmlnaW5hbC5lbmRMaW5lTnVtYmVyRXhjbHVzaXZlKSB8fCBuZXcgTGluZVJhbmdlTWFwcGluZyhuZXcgTGluZVJhbmdlKDEsIDEpLCBuZXcgTGluZVJhbmdlKDEsIDEpKTtcbiAgICBjb25zdCBkaWZmQmVmb3JlRW5kT2ZNb3ZlTW9kaWZpZWQgPSBmaW5kTGFzdE1vbm90b25vdXMoY2hhbmdlcywgKGMpID0+IGMubW9kaWZpZWQuc3RhcnRMaW5lTnVtYmVyIDwgbS5tb2RpZmllZC5lbmRMaW5lTnVtYmVyRXhjbHVzaXZlKTtcbiAgICBjb25zdCBkaWZmZXJlbnREaWZmcyA9IGRpZmZCZWZvcmVFbmRPZk1vdmVPcmlnaW5hbCAhPT0gZGlmZkJlZm9yZUVuZE9mTW92ZU1vZGlmaWVkO1xuICAgIHJldHVybiBkaWZmZXJlbnREaWZmcztcbiAgfSk7XG4gIHJldHVybiBtb3Zlcztcbn1cblxuZnVuY3Rpb24gb3B0aW1pemVTZXF1ZW5jZURpZmZzKHNlcXVlbmNlMSwgc2VxdWVuY2UyLCBzZXF1ZW5jZURpZmZzKSB7XG4gIGxldCByZXN1bHQgPSBzZXF1ZW5jZURpZmZzO1xuICByZXN1bHQgPSBqb2luU2VxdWVuY2VEaWZmc0J5U2hpZnRpbmcoc2VxdWVuY2UxLCBzZXF1ZW5jZTIsIHJlc3VsdCk7XG4gIHJlc3VsdCA9IGpvaW5TZXF1ZW5jZURpZmZzQnlTaGlmdGluZyhzZXF1ZW5jZTEsIHNlcXVlbmNlMiwgcmVzdWx0KTtcbiAgcmVzdWx0ID0gc2hpZnRTZXF1ZW5jZURpZmZzKHNlcXVlbmNlMSwgc2VxdWVuY2UyLCByZXN1bHQpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gam9pblNlcXVlbmNlRGlmZnNCeVNoaWZ0aW5nKHNlcXVlbmNlMSwgc2VxdWVuY2UyLCBzZXF1ZW5jZURpZmZzKSB7XG4gIGlmIChzZXF1ZW5jZURpZmZzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBzZXF1ZW5jZURpZmZzO1xuICB9XG4gIGNvbnN0IHJlc3VsdCA9IFtdO1xuICByZXN1bHQucHVzaChzZXF1ZW5jZURpZmZzWzBdKTtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCBzZXF1ZW5jZURpZmZzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgcHJldlJlc3VsdCA9IHJlc3VsdFtyZXN1bHQubGVuZ3RoIC0gMV07XG4gICAgbGV0IGN1ciA9IHNlcXVlbmNlRGlmZnNbaV07XG4gICAgaWYgKGN1ci5zZXExUmFuZ2UuaXNFbXB0eSB8fCBjdXIuc2VxMlJhbmdlLmlzRW1wdHkpIHtcbiAgICAgIGNvbnN0IGxlbmd0aCA9IGN1ci5zZXExUmFuZ2Uuc3RhcnQgLSBwcmV2UmVzdWx0LnNlcTFSYW5nZS5lbmRFeGNsdXNpdmU7XG4gICAgICBsZXQgZDtcbiAgICAgIGZvciAoZCA9IDE7IGQgPD0gbGVuZ3RoOyBkKyspIHtcbiAgICAgICAgaWYgKHNlcXVlbmNlMS5nZXRFbGVtZW50KGN1ci5zZXExUmFuZ2Uuc3RhcnQgLSBkKSAhPT0gc2VxdWVuY2UxLmdldEVsZW1lbnQoY3VyLnNlcTFSYW5nZS5lbmRFeGNsdXNpdmUgLSBkKSB8fCBzZXF1ZW5jZTIuZ2V0RWxlbWVudChjdXIuc2VxMlJhbmdlLnN0YXJ0IC0gZCkgIT09IHNlcXVlbmNlMi5nZXRFbGVtZW50KGN1ci5zZXEyUmFuZ2UuZW5kRXhjbHVzaXZlIC0gZCkpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZC0tO1xuICAgICAgaWYgKGQgPT09IGxlbmd0aCkge1xuICAgICAgICByZXN1bHRbcmVzdWx0Lmxlbmd0aCAtIDFdID0gbmV3IFNlcXVlbmNlRGlmZihcbiAgICAgICAgICBuZXcgT2Zmc2V0UmFuZ2UocHJldlJlc3VsdC5zZXExUmFuZ2Uuc3RhcnQsIGN1ci5zZXExUmFuZ2UuZW5kRXhjbHVzaXZlIC0gbGVuZ3RoKSxcbiAgICAgICAgICBuZXcgT2Zmc2V0UmFuZ2UocHJldlJlc3VsdC5zZXEyUmFuZ2Uuc3RhcnQsIGN1ci5zZXEyUmFuZ2UuZW5kRXhjbHVzaXZlIC0gbGVuZ3RoKVxuICAgICAgICApO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGN1ciA9IGN1ci5kZWx0YSgtZCk7XG4gICAgfVxuICAgIHJlc3VsdC5wdXNoKGN1cik7XG4gIH1cbiAgY29uc3QgcmVzdWx0MiA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHJlc3VsdC5sZW5ndGggLSAxOyBpKyspIHtcbiAgICBjb25zdCBuZXh0UmVzdWx0ID0gcmVzdWx0W2kgKyAxXTtcbiAgICBsZXQgY3VyID0gcmVzdWx0W2ldO1xuICAgIGlmIChjdXIuc2VxMVJhbmdlLmlzRW1wdHkgfHwgY3VyLnNlcTJSYW5nZS5pc0VtcHR5KSB7XG4gICAgICBjb25zdCBsZW5ndGggPSBuZXh0UmVzdWx0LnNlcTFSYW5nZS5zdGFydCAtIGN1ci5zZXExUmFuZ2UuZW5kRXhjbHVzaXZlO1xuICAgICAgbGV0IGQ7XG4gICAgICBmb3IgKGQgPSAwOyBkIDwgbGVuZ3RoOyBkKyspIHtcbiAgICAgICAgaWYgKCFzZXF1ZW5jZTEuaXNTdHJvbmdseUVxdWFsKGN1ci5zZXExUmFuZ2Uuc3RhcnQgKyBkLCBjdXIuc2VxMVJhbmdlLmVuZEV4Y2x1c2l2ZSArIGQpIHx8ICFzZXF1ZW5jZTIuaXNTdHJvbmdseUVxdWFsKGN1ci5zZXEyUmFuZ2Uuc3RhcnQgKyBkLCBjdXIuc2VxMlJhbmdlLmVuZEV4Y2x1c2l2ZSArIGQpKSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChkID09PSBsZW5ndGgpIHtcbiAgICAgICAgcmVzdWx0W2kgKyAxXSA9IG5ldyBTZXF1ZW5jZURpZmYoXG4gICAgICAgICAgbmV3IE9mZnNldFJhbmdlKGN1ci5zZXExUmFuZ2Uuc3RhcnQgKyBsZW5ndGgsIG5leHRSZXN1bHQuc2VxMVJhbmdlLmVuZEV4Y2x1c2l2ZSksXG4gICAgICAgICAgbmV3IE9mZnNldFJhbmdlKGN1ci5zZXEyUmFuZ2Uuc3RhcnQgKyBsZW5ndGgsIG5leHRSZXN1bHQuc2VxMlJhbmdlLmVuZEV4Y2x1c2l2ZSlcbiAgICAgICAgKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAoZCA+IDApIHtcbiAgICAgICAgY3VyID0gY3VyLmRlbHRhKGQpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXN1bHQyLnB1c2goY3VyKTtcbiAgfVxuICBpZiAocmVzdWx0Lmxlbmd0aCA+IDApIHtcbiAgICByZXN1bHQyLnB1c2gocmVzdWx0W3Jlc3VsdC5sZW5ndGggLSAxXSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDI7XG59XG5mdW5jdGlvbiBzaGlmdFNlcXVlbmNlRGlmZnMoc2VxdWVuY2UxLCBzZXF1ZW5jZTIsIHNlcXVlbmNlRGlmZnMpIHtcbiAgaWYgKCFzZXF1ZW5jZTEuZ2V0Qm91bmRhcnlTY29yZSB8fCAhc2VxdWVuY2UyLmdldEJvdW5kYXJ5U2NvcmUpIHtcbiAgICByZXR1cm4gc2VxdWVuY2VEaWZmcztcbiAgfVxuICBmb3IgKGxldCBpID0gMDsgaSA8IHNlcXVlbmNlRGlmZnMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBwcmV2RGlmZiA9IGkgPiAwID8gc2VxdWVuY2VEaWZmc1tpIC0gMV0gOiB1bmRlZmluZWQ7XG4gICAgY29uc3QgZGlmZiA9IHNlcXVlbmNlRGlmZnNbaV07XG4gICAgY29uc3QgbmV4dERpZmYgPSBpICsgMSA8IHNlcXVlbmNlRGlmZnMubGVuZ3RoID8gc2VxdWVuY2VEaWZmc1tpICsgMV0gOiB1bmRlZmluZWQ7XG4gICAgY29uc3Qgc2VxMVZhbGlkUmFuZ2UgPSBuZXcgT2Zmc2V0UmFuZ2UocHJldkRpZmYgPyBwcmV2RGlmZi5zZXExUmFuZ2UuZW5kRXhjbHVzaXZlICsgMSA6IDAsIG5leHREaWZmID8gbmV4dERpZmYuc2VxMVJhbmdlLnN0YXJ0IC0gMSA6IHNlcXVlbmNlMS5sZW5ndGgpO1xuICAgIGNvbnN0IHNlcTJWYWxpZFJhbmdlID0gbmV3IE9mZnNldFJhbmdlKHByZXZEaWZmID8gcHJldkRpZmYuc2VxMlJhbmdlLmVuZEV4Y2x1c2l2ZSArIDEgOiAwLCBuZXh0RGlmZiA/IG5leHREaWZmLnNlcTJSYW5nZS5zdGFydCAtIDEgOiBzZXF1ZW5jZTIubGVuZ3RoKTtcbiAgICBpZiAoZGlmZi5zZXExUmFuZ2UuaXNFbXB0eSkge1xuICAgICAgc2VxdWVuY2VEaWZmc1tpXSA9IHNoaWZ0RGlmZlRvQmV0dGVyUG9zaXRpb24oZGlmZiwgc2VxdWVuY2UxLCBzZXF1ZW5jZTIsIHNlcTFWYWxpZFJhbmdlLCBzZXEyVmFsaWRSYW5nZSk7XG4gICAgfSBlbHNlIGlmIChkaWZmLnNlcTJSYW5nZS5pc0VtcHR5KSB7XG4gICAgICBzZXF1ZW5jZURpZmZzW2ldID0gc2hpZnREaWZmVG9CZXR0ZXJQb3NpdGlvbihkaWZmLnN3YXAoKSwgc2VxdWVuY2UyLCBzZXF1ZW5jZTEsIHNlcTJWYWxpZFJhbmdlLCBzZXExVmFsaWRSYW5nZSkuc3dhcCgpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gc2VxdWVuY2VEaWZmcztcbn1cbmZ1bmN0aW9uIHNoaWZ0RGlmZlRvQmV0dGVyUG9zaXRpb24oZGlmZiwgc2VxdWVuY2UxLCBzZXF1ZW5jZTIsIHNlcTFWYWxpZFJhbmdlLCBzZXEyVmFsaWRSYW5nZSkge1xuICBjb25zdCBtYXhTaGlmdExpbWl0ID0gMTAwO1xuICBsZXQgZGVsdGFCZWZvcmUgPSAxO1xuICB3aGlsZSAoZGlmZi5zZXExUmFuZ2Uuc3RhcnQgLSBkZWx0YUJlZm9yZSA+PSBzZXExVmFsaWRSYW5nZS5zdGFydCAmJiBkaWZmLnNlcTJSYW5nZS5zdGFydCAtIGRlbHRhQmVmb3JlID49IHNlcTJWYWxpZFJhbmdlLnN0YXJ0ICYmIHNlcXVlbmNlMi5pc1N0cm9uZ2x5RXF1YWwoZGlmZi5zZXEyUmFuZ2Uuc3RhcnQgLSBkZWx0YUJlZm9yZSwgZGlmZi5zZXEyUmFuZ2UuZW5kRXhjbHVzaXZlIC0gZGVsdGFCZWZvcmUpICYmIGRlbHRhQmVmb3JlIDwgbWF4U2hpZnRMaW1pdCkge1xuICAgIGRlbHRhQmVmb3JlKys7XG4gIH1cbiAgZGVsdGFCZWZvcmUtLTtcbiAgbGV0IGRlbHRhQWZ0ZXIgPSAwO1xuICB3aGlsZSAoZGlmZi5zZXExUmFuZ2Uuc3RhcnQgKyBkZWx0YUFmdGVyIDwgc2VxMVZhbGlkUmFuZ2UuZW5kRXhjbHVzaXZlICYmIGRpZmYuc2VxMlJhbmdlLmVuZEV4Y2x1c2l2ZSArIGRlbHRhQWZ0ZXIgPCBzZXEyVmFsaWRSYW5nZS5lbmRFeGNsdXNpdmUgJiYgc2VxdWVuY2UyLmlzU3Ryb25nbHlFcXVhbChkaWZmLnNlcTJSYW5nZS5zdGFydCArIGRlbHRhQWZ0ZXIsIGRpZmYuc2VxMlJhbmdlLmVuZEV4Y2x1c2l2ZSArIGRlbHRhQWZ0ZXIpICYmIGRlbHRhQWZ0ZXIgPCBtYXhTaGlmdExpbWl0KSB7XG4gICAgZGVsdGFBZnRlcisrO1xuICB9XG4gIGlmIChkZWx0YUJlZm9yZSA9PT0gMCAmJiBkZWx0YUFmdGVyID09PSAwKSB7XG4gICAgcmV0dXJuIGRpZmY7XG4gIH1cbiAgbGV0IGJlc3REZWx0YSA9IDA7XG4gIGxldCBiZXN0U2NvcmUgPSAtMTtcbiAgZm9yIChsZXQgZGVsdGEgPSAtZGVsdGFCZWZvcmU7IGRlbHRhIDw9IGRlbHRhQWZ0ZXI7IGRlbHRhKyspIHtcbiAgICBjb25zdCBzZXEyT2Zmc2V0U3RhcnQgPSBkaWZmLnNlcTJSYW5nZS5zdGFydCArIGRlbHRhO1xuICAgIGNvbnN0IHNlcTJPZmZzZXRFbmRFeGNsdXNpdmUgPSBkaWZmLnNlcTJSYW5nZS5lbmRFeGNsdXNpdmUgKyBkZWx0YTtcbiAgICBjb25zdCBzZXExT2Zmc2V0ID0gZGlmZi5zZXExUmFuZ2Uuc3RhcnQgKyBkZWx0YTtcbiAgICBjb25zdCBzY29yZSA9IHNlcXVlbmNlMS5nZXRCb3VuZGFyeVNjb3JlKHNlcTFPZmZzZXQpICsgc2VxdWVuY2UyLmdldEJvdW5kYXJ5U2NvcmUoc2VxMk9mZnNldFN0YXJ0KSArIHNlcXVlbmNlMi5nZXRCb3VuZGFyeVNjb3JlKHNlcTJPZmZzZXRFbmRFeGNsdXNpdmUpO1xuICAgIGlmIChzY29yZSA+IGJlc3RTY29yZSkge1xuICAgICAgYmVzdFNjb3JlID0gc2NvcmU7XG4gICAgICBiZXN0RGVsdGEgPSBkZWx0YTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGRpZmYuZGVsdGEoYmVzdERlbHRhKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVNob3J0TWF0Y2hlcyhzZXF1ZW5jZTEsIHNlcXVlbmNlMiwgc2VxdWVuY2VEaWZmcykge1xuICBjb25zdCByZXN1bHQgPSBbXTtcbiAgZm9yIChjb25zdCBzIG9mIHNlcXVlbmNlRGlmZnMpIHtcbiAgICBjb25zdCBsYXN0ID0gcmVzdWx0W3Jlc3VsdC5sZW5ndGggLSAxXTtcbiAgICBpZiAoIWxhc3QpIHtcbiAgICAgIHJlc3VsdC5wdXNoKHMpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGlmIChzLnNlcTFSYW5nZS5zdGFydCAtIGxhc3Quc2VxMVJhbmdlLmVuZEV4Y2x1c2l2ZSA8PSAyIHx8IHMuc2VxMlJhbmdlLnN0YXJ0IC0gbGFzdC5zZXEyUmFuZ2UuZW5kRXhjbHVzaXZlIDw9IDIpIHtcbiAgICAgIHJlc3VsdFtyZXN1bHQubGVuZ3RoIC0gMV0gPSBuZXcgU2VxdWVuY2VEaWZmKGxhc3Quc2VxMVJhbmdlLmpvaW4ocy5zZXExUmFuZ2UpLCBsYXN0LnNlcTJSYW5nZS5qb2luKHMuc2VxMlJhbmdlKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdC5wdXNoKHMpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gZXh0ZW5kRGlmZnNUb0VudGlyZVdvcmRJZkFwcHJvcHJpYXRlKHNlcXVlbmNlMSwgc2VxdWVuY2UyLCBzZXF1ZW5jZURpZmZzLCBmaW5kUGFyZW50LCBmb3JjZSA9IGZhbHNlKSB7XG4gIGNvbnN0IGVxdWFsTWFwcGluZ3MgPSBTZXF1ZW5jZURpZmYuaW52ZXJ0KHNlcXVlbmNlRGlmZnMsIHNlcXVlbmNlMS5sZW5ndGgpO1xuICBjb25zdCBhZGRpdGlvbmFsID0gW107XG4gIGxldCBsYXN0UG9pbnQgPSBuZXcgT2Zmc2V0UGFpcigwLCAwKTtcbiAgZnVuY3Rpb24gc2NhbldvcmQocGFpciwgZXF1YWxNYXBwaW5nKSB7XG4gICAgaWYgKHBhaXIub2Zmc2V0MSA8IGxhc3RQb2ludC5vZmZzZXQxIHx8IHBhaXIub2Zmc2V0MiA8IGxhc3RQb2ludC5vZmZzZXQyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHcxID0gZmluZFBhcmVudChzZXF1ZW5jZTEsIHBhaXIub2Zmc2V0MSk7XG4gICAgY29uc3QgdzIgPSBmaW5kUGFyZW50KHNlcXVlbmNlMiwgcGFpci5vZmZzZXQyKTtcbiAgICBpZiAoIXcxIHx8ICF3Mikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgdyA9IG5ldyBTZXF1ZW5jZURpZmYodzEsIHcyKTtcbiAgICBjb25zdCBlcXVhbFBhcnQgPSB3LmludGVyc2VjdChlcXVhbE1hcHBpbmcpO1xuICAgIGxldCBlcXVhbENoYXJzMSA9IGVxdWFsUGFydC5zZXExUmFuZ2UubGVuZ3RoO1xuICAgIGxldCBlcXVhbENoYXJzMiA9IGVxdWFsUGFydC5zZXEyUmFuZ2UubGVuZ3RoO1xuICAgIHdoaWxlIChlcXVhbE1hcHBpbmdzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IG5leHQgPSBlcXVhbE1hcHBpbmdzWzBdO1xuICAgICAgY29uc3QgaW50ZXJzZWN0cyA9IG5leHQuc2VxMVJhbmdlLmludGVyc2VjdHMody5zZXExUmFuZ2UpIHx8IG5leHQuc2VxMlJhbmdlLmludGVyc2VjdHMody5zZXEyUmFuZ2UpO1xuICAgICAgaWYgKCFpbnRlcnNlY3RzKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY29uc3QgdjEgPSBmaW5kUGFyZW50KHNlcXVlbmNlMSwgbmV4dC5zZXExUmFuZ2Uuc3RhcnQpO1xuICAgICAgY29uc3QgdjIgPSBmaW5kUGFyZW50KHNlcXVlbmNlMiwgbmV4dC5zZXEyUmFuZ2Uuc3RhcnQpO1xuICAgICAgY29uc3QgdiA9IG5ldyBTZXF1ZW5jZURpZmYodjEsIHYyKTtcbiAgICAgIGNvbnN0IGVxdWFsUGFydDIgPSB2LmludGVyc2VjdChuZXh0KTtcbiAgICAgIGVxdWFsQ2hhcnMxICs9IGVxdWFsUGFydDIuc2VxMVJhbmdlLmxlbmd0aDtcbiAgICAgIGVxdWFsQ2hhcnMyICs9IGVxdWFsUGFydDIuc2VxMlJhbmdlLmxlbmd0aDtcbiAgICAgIHcgPSB3LmpvaW4odik7XG4gICAgICBpZiAody5zZXExUmFuZ2UuZW5kRXhjbHVzaXZlID49IG5leHQuc2VxMVJhbmdlLmVuZEV4Y2x1c2l2ZSkge1xuICAgICAgICBlcXVhbE1hcHBpbmdzLnNoaWZ0KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGZvcmNlICYmIGVxdWFsQ2hhcnMxICsgZXF1YWxDaGFyczIgPCB3LnNlcTFSYW5nZS5sZW5ndGggKyB3LnNlcTJSYW5nZS5sZW5ndGggfHwgZXF1YWxDaGFyczEgKyBlcXVhbENoYXJzMiA8ICh3LnNlcTFSYW5nZS5sZW5ndGggKyB3LnNlcTJSYW5nZS5sZW5ndGgpICogMiAvIDMpIHtcbiAgICAgIGFkZGl0aW9uYWwucHVzaCh3KTtcbiAgICB9XG4gICAgbGFzdFBvaW50ID0gdy5nZXRFbmRFeGNsdXNpdmVzKCk7XG4gIH1cbiAgd2hpbGUgKGVxdWFsTWFwcGluZ3MubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IG5leHQgPSBlcXVhbE1hcHBpbmdzLnNoaWZ0KCk7XG4gICAgaWYgKG5leHQuc2VxMVJhbmdlLmlzRW1wdHkpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBzY2FuV29yZChuZXh0LmdldFN0YXJ0cygpLCBuZXh0KTtcbiAgICBzY2FuV29yZChuZXh0LmdldEVuZEV4Y2x1c2l2ZXMoKS5kZWx0YSgtMSksIG5leHQpO1xuICB9XG4gIGNvbnN0IG1lcmdlZCA9IG1lcmdlU2VxdWVuY2VEaWZmcyhzZXF1ZW5jZURpZmZzLCBhZGRpdGlvbmFsKTtcbiAgcmV0dXJuIG1lcmdlZDtcbn1cbmZ1bmN0aW9uIG1lcmdlU2VxdWVuY2VEaWZmcyhzZXF1ZW5jZURpZmZzMSwgc2VxdWVuY2VEaWZmczIpIHtcbiAgY29uc3QgcmVzdWx0ID0gW107XG4gIHdoaWxlIChzZXF1ZW5jZURpZmZzMS5sZW5ndGggPiAwIHx8IHNlcXVlbmNlRGlmZnMyLmxlbmd0aCA+IDApIHtcbiAgICBjb25zdCBzZDEgPSBzZXF1ZW5jZURpZmZzMVswXTtcbiAgICBjb25zdCBzZDIgPSBzZXF1ZW5jZURpZmZzMlswXTtcbiAgICBsZXQgbmV4dDtcbiAgICBpZiAoc2QxICYmICghc2QyIHx8IHNkMS5zZXExUmFuZ2Uuc3RhcnQgPCBzZDIuc2VxMVJhbmdlLnN0YXJ0KSkge1xuICAgICAgbmV4dCA9IHNlcXVlbmNlRGlmZnMxLnNoaWZ0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5leHQgPSBzZXF1ZW5jZURpZmZzMi5zaGlmdCgpO1xuICAgIH1cbiAgICBpZiAocmVzdWx0Lmxlbmd0aCA+IDAgJiYgcmVzdWx0W3Jlc3VsdC5sZW5ndGggLSAxXS5zZXExUmFuZ2UuZW5kRXhjbHVzaXZlID49IG5leHQuc2VxMVJhbmdlLnN0YXJ0KSB7XG4gICAgICByZXN1bHRbcmVzdWx0Lmxlbmd0aCAtIDFdID0gcmVzdWx0W3Jlc3VsdC5sZW5ndGggLSAxXS5qb2luKG5leHQpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQucHVzaChuZXh0KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIHJlbW92ZVZlcnlTaG9ydE1hdGNoaW5nTGluZXNCZXR3ZWVuRGlmZnMoc2VxdWVuY2UxLCBfc2VxdWVuY2UyLCBzZXF1ZW5jZURpZmZzKSB7XG4gIGxldCBkaWZmcyA9IHNlcXVlbmNlRGlmZnM7XG4gIGlmIChkaWZmcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gZGlmZnM7XG4gIH1cbiAgbGV0IGNvdW50ZXIgPSAwO1xuICBsZXQgc2hvdWxkUmVwZWF0O1xuICBkbyB7XG4gICAgc2hvdWxkUmVwZWF0ID0gZmFsc2U7XG4gICAgY29uc3QgcmVzdWx0ID0gW1xuICAgICAgZGlmZnNbMF1cbiAgICBdO1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgZGlmZnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBzaG91bGRKb2luRGlmZnMgPSBmdW5jdGlvbihiZWZvcmUsIGFmdGVyKSB7XG4gICAgICAgIGNvbnN0IHVuY2hhbmdlZFJhbmdlID0gbmV3IE9mZnNldFJhbmdlKGxhc3RSZXN1bHQuc2VxMVJhbmdlLmVuZEV4Y2x1c2l2ZSwgY3VyLnNlcTFSYW5nZS5zdGFydCk7XG4gICAgICAgIGNvbnN0IHVuY2hhbmdlZFRleHQgPSBzZXF1ZW5jZTEuZ2V0VGV4dCh1bmNoYW5nZWRSYW5nZSk7XG4gICAgICAgIGNvbnN0IHVuY2hhbmdlZFRleHRXaXRob3V0V3MgPSB1bmNoYW5nZWRUZXh0LnJlcGxhY2UoL1xccy9nLCBcIlwiKTtcbiAgICAgICAgaWYgKHVuY2hhbmdlZFRleHRXaXRob3V0V3MubGVuZ3RoIDw9IDQgJiYgKGJlZm9yZS5zZXExUmFuZ2UubGVuZ3RoICsgYmVmb3JlLnNlcTJSYW5nZS5sZW5ndGggPiA1IHx8IGFmdGVyLnNlcTFSYW5nZS5sZW5ndGggKyBhZnRlci5zZXEyUmFuZ2UubGVuZ3RoID4gNSkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9O1xuICAgICAgY29uc3QgY3VyID0gZGlmZnNbaV07XG4gICAgICBjb25zdCBsYXN0UmVzdWx0ID0gcmVzdWx0W3Jlc3VsdC5sZW5ndGggLSAxXTtcbiAgICAgIGNvbnN0IHNob3VsZEpvaW4gPSBzaG91bGRKb2luRGlmZnMobGFzdFJlc3VsdCwgY3VyKTtcbiAgICAgIGlmIChzaG91bGRKb2luKSB7XG4gICAgICAgIHNob3VsZFJlcGVhdCA9IHRydWU7XG4gICAgICAgIHJlc3VsdFtyZXN1bHQubGVuZ3RoIC0gMV0gPSByZXN1bHRbcmVzdWx0Lmxlbmd0aCAtIDFdLmpvaW4oY3VyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKGN1cik7XG4gICAgICB9XG4gICAgfVxuICAgIGRpZmZzID0gcmVzdWx0O1xuICB9IHdoaWxlIChjb3VudGVyKysgPCAxMCAmJiBzaG91bGRSZXBlYXQpO1xuICByZXR1cm4gZGlmZnM7XG59XG5mdW5jdGlvbiByZW1vdmVWZXJ5U2hvcnRNYXRjaGluZ1RleHRCZXR3ZWVuTG9uZ0RpZmZzKHNlcXVlbmNlMSwgc2VxdWVuY2UyLCBzZXF1ZW5jZURpZmZzKSB7XG4gIGxldCBkaWZmcyA9IHNlcXVlbmNlRGlmZnM7XG4gIGlmIChkaWZmcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gZGlmZnM7XG4gIH1cbiAgbGV0IGNvdW50ZXIgPSAwO1xuICBsZXQgc2hvdWxkUmVwZWF0O1xuICBkbyB7XG4gICAgc2hvdWxkUmVwZWF0ID0gZmFsc2U7XG4gICAgY29uc3QgcmVzdWx0ID0gW1xuICAgICAgZGlmZnNbMF1cbiAgICBdO1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgZGlmZnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBzaG91bGRKb2luRGlmZnMgPSBmdW5jdGlvbihiZWZvcmUsIGFmdGVyKSB7XG4gICAgICAgIGNvbnN0IHVuY2hhbmdlZFJhbmdlID0gbmV3IE9mZnNldFJhbmdlKGxhc3RSZXN1bHQuc2VxMVJhbmdlLmVuZEV4Y2x1c2l2ZSwgY3VyLnNlcTFSYW5nZS5zdGFydCk7XG4gICAgICAgIGNvbnN0IHVuY2hhbmdlZExpbmVDb3VudCA9IHNlcXVlbmNlMS5jb3VudExpbmVzSW4odW5jaGFuZ2VkUmFuZ2UpO1xuICAgICAgICBpZiAodW5jaGFuZ2VkTGluZUNvdW50ID4gNSB8fCB1bmNoYW5nZWRSYW5nZS5sZW5ndGggPiA1MDApIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdW5jaGFuZ2VkVGV4dCA9IHNlcXVlbmNlMS5nZXRUZXh0KHVuY2hhbmdlZFJhbmdlKS50cmltKCk7XG4gICAgICAgIGlmICh1bmNoYW5nZWRUZXh0Lmxlbmd0aCA+IDIwIHx8IHVuY2hhbmdlZFRleHQuc3BsaXQoL1xcclxcbnxcXHJ8XFxuLykubGVuZ3RoID4gMSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBiZWZvcmVMaW5lQ291bnQxID0gc2VxdWVuY2UxLmNvdW50TGluZXNJbihiZWZvcmUuc2VxMVJhbmdlKTtcbiAgICAgICAgY29uc3QgYmVmb3JlU2VxMUxlbmd0aCA9IGJlZm9yZS5zZXExUmFuZ2UubGVuZ3RoO1xuICAgICAgICBjb25zdCBiZWZvcmVMaW5lQ291bnQyID0gc2VxdWVuY2UyLmNvdW50TGluZXNJbihiZWZvcmUuc2VxMlJhbmdlKTtcbiAgICAgICAgY29uc3QgYmVmb3JlU2VxMkxlbmd0aCA9IGJlZm9yZS5zZXEyUmFuZ2UubGVuZ3RoO1xuICAgICAgICBjb25zdCBhZnRlckxpbmVDb3VudDEgPSBzZXF1ZW5jZTEuY291bnRMaW5lc0luKGFmdGVyLnNlcTFSYW5nZSk7XG4gICAgICAgIGNvbnN0IGFmdGVyU2VxMUxlbmd0aCA9IGFmdGVyLnNlcTFSYW5nZS5sZW5ndGg7XG4gICAgICAgIGNvbnN0IGFmdGVyTGluZUNvdW50MiA9IHNlcXVlbmNlMi5jb3VudExpbmVzSW4oYWZ0ZXIuc2VxMlJhbmdlKTtcbiAgICAgICAgY29uc3QgYWZ0ZXJTZXEyTGVuZ3RoID0gYWZ0ZXIuc2VxMlJhbmdlLmxlbmd0aDtcbiAgICAgICAgY29uc3QgbWF4ID0gMiAqIDQwICsgNTA7XG4gICAgICAgIGZ1bmN0aW9uIGNhcCh2KSB7XG4gICAgICAgICAgcmV0dXJuIE1hdGgubWluKHYsIG1heCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKE1hdGgucG93KE1hdGgucG93KGNhcChiZWZvcmVMaW5lQ291bnQxICogNDAgKyBiZWZvcmVTZXExTGVuZ3RoKSwgMS41KSArIE1hdGgucG93KGNhcChiZWZvcmVMaW5lQ291bnQyICogNDAgKyBiZWZvcmVTZXEyTGVuZ3RoKSwgMS41KSwgMS41KSArIE1hdGgucG93KE1hdGgucG93KGNhcChhZnRlckxpbmVDb3VudDEgKiA0MCArIGFmdGVyU2VxMUxlbmd0aCksIDEuNSkgKyBNYXRoLnBvdyhjYXAoYWZ0ZXJMaW5lQ291bnQyICogNDAgKyBhZnRlclNlcTJMZW5ndGgpLCAxLjUpLCAxLjUpID4gKG1heCAqKiAxLjUpICoqIDEuNSAqIDEuMykge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH07XG4gICAgICBjb25zdCBjdXIgPSBkaWZmc1tpXTtcbiAgICAgIGNvbnN0IGxhc3RSZXN1bHQgPSByZXN1bHRbcmVzdWx0Lmxlbmd0aCAtIDFdO1xuICAgICAgY29uc3Qgc2hvdWxkSm9pbiA9IHNob3VsZEpvaW5EaWZmcyhsYXN0UmVzdWx0LCBjdXIpO1xuICAgICAgaWYgKHNob3VsZEpvaW4pIHtcbiAgICAgICAgc2hvdWxkUmVwZWF0ID0gdHJ1ZTtcbiAgICAgICAgcmVzdWx0W3Jlc3VsdC5sZW5ndGggLSAxXSA9IHJlc3VsdFtyZXN1bHQubGVuZ3RoIC0gMV0uam9pbihjdXIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdWx0LnB1c2goY3VyKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZGlmZnMgPSByZXN1bHQ7XG4gIH0gd2hpbGUgKGNvdW50ZXIrKyA8IDEwICYmIHNob3VsZFJlcGVhdCk7XG4gIGNvbnN0IG5ld0RpZmZzID0gW107XG4gIGZvckVhY2hXaXRoTmVpZ2hib3JzKGRpZmZzLCAocHJldiwgY3VyLCBuZXh0KSA9PiB7XG4gICAgbGV0IG5ld0RpZmYgPSBjdXI7XG4gICAgZnVuY3Rpb24gc2hvdWxkTWFya0FzQ2hhbmdlZCh0ZXh0KSB7XG4gICAgICByZXR1cm4gdGV4dC5sZW5ndGggPiAwICYmIHRleHQudHJpbSgpLmxlbmd0aCA8PSAzICYmIGN1ci5zZXExUmFuZ2UubGVuZ3RoICsgY3VyLnNlcTJSYW5nZS5sZW5ndGggPiAxMDA7XG4gICAgfVxuICAgIGNvbnN0IGZ1bGxSYW5nZTEgPSBzZXF1ZW5jZTEuZXh0ZW5kVG9GdWxsTGluZXMoY3VyLnNlcTFSYW5nZSk7XG4gICAgY29uc3QgcHJlZml4ID0gc2VxdWVuY2UxLmdldFRleHQobmV3IE9mZnNldFJhbmdlKGZ1bGxSYW5nZTEuc3RhcnQsIGN1ci5zZXExUmFuZ2Uuc3RhcnQpKTtcbiAgICBpZiAoc2hvdWxkTWFya0FzQ2hhbmdlZChwcmVmaXgpKSB7XG4gICAgICBuZXdEaWZmID0gbmV3RGlmZi5kZWx0YVN0YXJ0KC1wcmVmaXgubGVuZ3RoKTtcbiAgICB9XG4gICAgY29uc3Qgc3VmZml4ID0gc2VxdWVuY2UxLmdldFRleHQobmV3IE9mZnNldFJhbmdlKGN1ci5zZXExUmFuZ2UuZW5kRXhjbHVzaXZlLCBmdWxsUmFuZ2UxLmVuZEV4Y2x1c2l2ZSkpO1xuICAgIGlmIChzaG91bGRNYXJrQXNDaGFuZ2VkKHN1ZmZpeCkpIHtcbiAgICAgIG5ld0RpZmYgPSBuZXdEaWZmLmRlbHRhRW5kKHN1ZmZpeC5sZW5ndGgpO1xuICAgIH1cbiAgICBjb25zdCBhdmFpbGFibGVTcGFjZSA9IFNlcXVlbmNlRGlmZi5mcm9tT2Zmc2V0UGFpcnMoXG4gICAgICBwcmV2ID8gcHJldi5nZXRFbmRFeGNsdXNpdmVzKCkgOiBPZmZzZXRQYWlyLnplcm8sXG4gICAgICBuZXh0ID8gbmV4dC5nZXRTdGFydHMoKSA6IE9mZnNldFBhaXIubWF4XG4gICAgKTtcbiAgICBjb25zdCByZXN1bHQgPSBuZXdEaWZmLmludGVyc2VjdChhdmFpbGFibGVTcGFjZSk7XG4gICAgaWYgKG5ld0RpZmZzLmxlbmd0aCA+IDAgJiYgcmVzdWx0LmdldFN0YXJ0cygpLmVxdWFscyhuZXdEaWZmc1tuZXdEaWZmcy5sZW5ndGggLSAxXS5nZXRFbmRFeGNsdXNpdmVzKCkpKSB7XG4gICAgICBuZXdEaWZmc1tuZXdEaWZmcy5sZW5ndGggLSAxXSA9IG5ld0RpZmZzW25ld0RpZmZzLmxlbmd0aCAtIDFdLmpvaW4ocmVzdWx0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmV3RGlmZnMucHVzaChyZXN1bHQpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBuZXdEaWZmcztcbn1cblxuY2xhc3MgTGluZVNlcXVlbmNlIHtcbiAgY29uc3RydWN0b3IodHJpbW1lZEhhc2gsIGxpbmVzKSB7XG4gICAgdGhpcy50cmltbWVkSGFzaCA9IHRyaW1tZWRIYXNoO1xuICAgIHRoaXMubGluZXMgPSBsaW5lcztcbiAgfVxuICBnZXRFbGVtZW50KG9mZnNldCkge1xuICAgIHJldHVybiB0aGlzLnRyaW1tZWRIYXNoW29mZnNldF07XG4gIH1cbiAgZ2V0IGxlbmd0aCgpIHtcbiAgICByZXR1cm4gdGhpcy50cmltbWVkSGFzaC5sZW5ndGg7XG4gIH1cbiAgZ2V0Qm91bmRhcnlTY29yZShsZW5ndGgpIHtcbiAgICBjb25zdCBpbmRlbnRhdGlvbkJlZm9yZSA9IGxlbmd0aCA9PT0gMCA/IDAgOiBnZXRJbmRlbnRhdGlvbih0aGlzLmxpbmVzW2xlbmd0aCAtIDFdKTtcbiAgICBjb25zdCBpbmRlbnRhdGlvbkFmdGVyID0gbGVuZ3RoID09PSB0aGlzLmxpbmVzLmxlbmd0aCA/IDAgOiBnZXRJbmRlbnRhdGlvbih0aGlzLmxpbmVzW2xlbmd0aF0pO1xuICAgIHJldHVybiAxZTMgLSAoaW5kZW50YXRpb25CZWZvcmUgKyBpbmRlbnRhdGlvbkFmdGVyKTtcbiAgfVxuICBnZXRUZXh0KHJhbmdlKSB7XG4gICAgcmV0dXJuIHRoaXMubGluZXMuc2xpY2UocmFuZ2Uuc3RhcnQsIHJhbmdlLmVuZEV4Y2x1c2l2ZSkuam9pbihcIlxcblwiKTtcbiAgfVxuICBpc1N0cm9uZ2x5RXF1YWwob2Zmc2V0MSwgb2Zmc2V0Mikge1xuICAgIHJldHVybiB0aGlzLmxpbmVzW29mZnNldDFdID09PSB0aGlzLmxpbmVzW29mZnNldDJdO1xuICB9XG59XG5mdW5jdGlvbiBnZXRJbmRlbnRhdGlvbihzdHIpIHtcbiAgbGV0IGkgPSAwO1xuICB3aGlsZSAoaSA8IHN0ci5sZW5ndGggJiYgKHN0ci5jaGFyQ29kZUF0KGkpID09PSAzMiB8fCBzdHIuY2hhckNvZGVBdChpKSA9PT0gOSkpIHtcbiAgICBpKys7XG4gIH1cbiAgcmV0dXJuIGk7XG59XG5cbmNsYXNzIERlZmF1bHRMaW5lc0RpZmZDb21wdXRlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuZHluYW1pY1Byb2dyYW1taW5nRGlmZmluZyA9IG5ldyBEeW5hbWljUHJvZ3JhbW1pbmdEaWZmaW5nKCk7XG4gICAgdGhpcy5teWVyc0RpZmZpbmdBbGdvcml0aG0gPSBuZXcgTXllcnNEaWZmQWxnb3JpdGhtKCk7XG4gIH1cbiAgY29tcHV0ZURpZmYob3JpZ2luYWxMaW5lcywgbW9kaWZpZWRMaW5lcywgb3B0aW9ucykge1xuICAgIGlmIChvcmlnaW5hbExpbmVzLmxlbmd0aCA8PSAxICYmIGVxdWFscyhvcmlnaW5hbExpbmVzLCBtb2RpZmllZExpbmVzLCAoYSwgYikgPT4gYSA9PT0gYikpIHtcbiAgICAgIHJldHVybiBuZXcgTGluZXNEaWZmKFtdLCBbXSwgZmFsc2UpO1xuICAgIH1cbiAgICBpZiAob3JpZ2luYWxMaW5lcy5sZW5ndGggPT09IDEgJiYgb3JpZ2luYWxMaW5lc1swXS5sZW5ndGggPT09IDAgfHwgbW9kaWZpZWRMaW5lcy5sZW5ndGggPT09IDEgJiYgbW9kaWZpZWRMaW5lc1swXS5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBuZXcgTGluZXNEaWZmKFtcbiAgICAgICAgbmV3IERldGFpbGVkTGluZVJhbmdlTWFwcGluZyhcbiAgICAgICAgICBuZXcgTGluZVJhbmdlKDEsIG9yaWdpbmFsTGluZXMubGVuZ3RoICsgMSksXG4gICAgICAgICAgbmV3IExpbmVSYW5nZSgxLCBtb2RpZmllZExpbmVzLmxlbmd0aCArIDEpLFxuICAgICAgICAgIFtcbiAgICAgICAgICAgIG5ldyBSYW5nZU1hcHBpbmcoXG4gICAgICAgICAgICAgIG5ldyBSYW5nZSgxLCAxLCBvcmlnaW5hbExpbmVzLmxlbmd0aCwgb3JpZ2luYWxMaW5lc1tvcmlnaW5hbExpbmVzLmxlbmd0aCAtIDFdLmxlbmd0aCArIDEpLFxuICAgICAgICAgICAgICBuZXcgUmFuZ2UoMSwgMSwgbW9kaWZpZWRMaW5lcy5sZW5ndGgsIG1vZGlmaWVkTGluZXNbbW9kaWZpZWRMaW5lcy5sZW5ndGggLSAxXS5sZW5ndGggKyAxKVxuICAgICAgICAgICAgKVxuICAgICAgICAgIF1cbiAgICAgICAgKVxuICAgICAgXSwgW10sIGZhbHNlKTtcbiAgICB9XG4gICAgY29uc3QgdGltZW91dCA9IG9wdGlvbnMubWF4Q29tcHV0YXRpb25UaW1lTXMgPT09IDAgPyBJbmZpbml0ZVRpbWVvdXQuaW5zdGFuY2UgOiBuZXcgRGF0ZVRpbWVvdXQob3B0aW9ucy5tYXhDb21wdXRhdGlvblRpbWVNcyk7XG4gICAgY29uc3QgY29uc2lkZXJXaGl0ZXNwYWNlQ2hhbmdlcyA9ICFvcHRpb25zLmlnbm9yZVRyaW1XaGl0ZXNwYWNlO1xuICAgIGNvbnN0IHBlcmZlY3RIYXNoZXMgPSAvKiBAX19QVVJFX18gKi8gbmV3IE1hcCgpO1xuICAgIGZ1bmN0aW9uIGdldE9yQ3JlYXRlSGFzaCh0ZXh0KSB7XG4gICAgICBsZXQgaGFzaCA9IHBlcmZlY3RIYXNoZXMuZ2V0KHRleHQpO1xuICAgICAgaWYgKGhhc2ggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBoYXNoID0gcGVyZmVjdEhhc2hlcy5zaXplO1xuICAgICAgICBwZXJmZWN0SGFzaGVzLnNldCh0ZXh0LCBoYXNoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBoYXNoO1xuICAgIH1cbiAgICBjb25zdCBvcmlnaW5hbExpbmVzSGFzaGVzID0gb3JpZ2luYWxMaW5lcy5tYXAoKGwpID0+IGdldE9yQ3JlYXRlSGFzaChsLnRyaW0oKSkpO1xuICAgIGNvbnN0IG1vZGlmaWVkTGluZXNIYXNoZXMgPSBtb2RpZmllZExpbmVzLm1hcCgobCkgPT4gZ2V0T3JDcmVhdGVIYXNoKGwudHJpbSgpKSk7XG4gICAgY29uc3Qgc2VxdWVuY2UxID0gbmV3IExpbmVTZXF1ZW5jZShvcmlnaW5hbExpbmVzSGFzaGVzLCBvcmlnaW5hbExpbmVzKTtcbiAgICBjb25zdCBzZXF1ZW5jZTIgPSBuZXcgTGluZVNlcXVlbmNlKG1vZGlmaWVkTGluZXNIYXNoZXMsIG1vZGlmaWVkTGluZXMpO1xuICAgIGNvbnN0IGxpbmVBbGlnbm1lbnRSZXN1bHQgPSAoKCkgPT4ge1xuICAgICAgaWYgKHNlcXVlbmNlMS5sZW5ndGggKyBzZXF1ZW5jZTIubGVuZ3RoIDwgMTcwMCkge1xuICAgICAgICByZXR1cm4gdGhpcy5keW5hbWljUHJvZ3JhbW1pbmdEaWZmaW5nLmNvbXB1dGUoXG4gICAgICAgICAgc2VxdWVuY2UxLFxuICAgICAgICAgIHNlcXVlbmNlMixcbiAgICAgICAgICB0aW1lb3V0LFxuICAgICAgICAgIChvZmZzZXQxLCBvZmZzZXQyKSA9PiBvcmlnaW5hbExpbmVzW29mZnNldDFdID09PSBtb2RpZmllZExpbmVzW29mZnNldDJdID8gbW9kaWZpZWRMaW5lc1tvZmZzZXQyXS5sZW5ndGggPT09IDAgPyAwLjEgOiAxICsgTWF0aC5sb2coMSArIG1vZGlmaWVkTGluZXNbb2Zmc2V0Ml0ubGVuZ3RoKSA6IDAuOTlcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLm15ZXJzRGlmZmluZ0FsZ29yaXRobS5jb21wdXRlKFxuICAgICAgICBzZXF1ZW5jZTEsXG4gICAgICAgIHNlcXVlbmNlMixcbiAgICAgICAgdGltZW91dFxuICAgICAgKTtcbiAgICB9KSgpO1xuICAgIGxldCBsaW5lQWxpZ25tZW50cyA9IGxpbmVBbGlnbm1lbnRSZXN1bHQuZGlmZnM7XG4gICAgbGV0IGhpdFRpbWVvdXQgPSBsaW5lQWxpZ25tZW50UmVzdWx0LmhpdFRpbWVvdXQ7XG4gICAgbGluZUFsaWdubWVudHMgPSBvcHRpbWl6ZVNlcXVlbmNlRGlmZnMoc2VxdWVuY2UxLCBzZXF1ZW5jZTIsIGxpbmVBbGlnbm1lbnRzKTtcbiAgICBsaW5lQWxpZ25tZW50cyA9IHJlbW92ZVZlcnlTaG9ydE1hdGNoaW5nTGluZXNCZXR3ZWVuRGlmZnMoc2VxdWVuY2UxLCBzZXF1ZW5jZTIsIGxpbmVBbGlnbm1lbnRzKTtcbiAgICBjb25zdCBhbGlnbm1lbnRzID0gW107XG4gICAgY29uc3Qgc2NhbkZvcldoaXRlc3BhY2VDaGFuZ2VzID0gKGVxdWFsTGluZXNDb3VudCkgPT4ge1xuICAgICAgaWYgKCFjb25zaWRlcldoaXRlc3BhY2VDaGFuZ2VzKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZXF1YWxMaW5lc0NvdW50OyBpKyspIHtcbiAgICAgICAgY29uc3Qgc2VxMU9mZnNldCA9IHNlcTFMYXN0U3RhcnQgKyBpO1xuICAgICAgICBjb25zdCBzZXEyT2Zmc2V0ID0gc2VxMkxhc3RTdGFydCArIGk7XG4gICAgICAgIGlmIChvcmlnaW5hbExpbmVzW3NlcTFPZmZzZXRdICE9PSBtb2RpZmllZExpbmVzW3NlcTJPZmZzZXRdKSB7XG4gICAgICAgICAgY29uc3QgY2hhcmFjdGVyRGlmZnMgPSB0aGlzLnJlZmluZURpZmYob3JpZ2luYWxMaW5lcywgbW9kaWZpZWRMaW5lcywgbmV3IFNlcXVlbmNlRGlmZihcbiAgICAgICAgICAgIG5ldyBPZmZzZXRSYW5nZShzZXExT2Zmc2V0LCBzZXExT2Zmc2V0ICsgMSksXG4gICAgICAgICAgICBuZXcgT2Zmc2V0UmFuZ2Uoc2VxMk9mZnNldCwgc2VxMk9mZnNldCArIDEpXG4gICAgICAgICAgKSwgdGltZW91dCwgY29uc2lkZXJXaGl0ZXNwYWNlQ2hhbmdlcywgb3B0aW9ucyk7XG4gICAgICAgICAgZm9yIChjb25zdCBhIG9mIGNoYXJhY3RlckRpZmZzLm1hcHBpbmdzKSB7XG4gICAgICAgICAgICBhbGlnbm1lbnRzLnB1c2goYSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChjaGFyYWN0ZXJEaWZmcy5oaXRUaW1lb3V0KSB7XG4gICAgICAgICAgICBoaXRUaW1lb3V0ID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICAgIGxldCBzZXExTGFzdFN0YXJ0ID0gMDtcbiAgICBsZXQgc2VxMkxhc3RTdGFydCA9IDA7XG4gICAgZm9yIChjb25zdCBkaWZmIG9mIGxpbmVBbGlnbm1lbnRzKSB7XG4gICAgICBhc3NlcnRGbigoKSA9PiBkaWZmLnNlcTFSYW5nZS5zdGFydCAtIHNlcTFMYXN0U3RhcnQgPT09IGRpZmYuc2VxMlJhbmdlLnN0YXJ0IC0gc2VxMkxhc3RTdGFydCk7XG4gICAgICBjb25zdCBlcXVhbExpbmVzQ291bnQgPSBkaWZmLnNlcTFSYW5nZS5zdGFydCAtIHNlcTFMYXN0U3RhcnQ7XG4gICAgICBzY2FuRm9yV2hpdGVzcGFjZUNoYW5nZXMoZXF1YWxMaW5lc0NvdW50KTtcbiAgICAgIHNlcTFMYXN0U3RhcnQgPSBkaWZmLnNlcTFSYW5nZS5lbmRFeGNsdXNpdmU7XG4gICAgICBzZXEyTGFzdFN0YXJ0ID0gZGlmZi5zZXEyUmFuZ2UuZW5kRXhjbHVzaXZlO1xuICAgICAgY29uc3QgY2hhcmFjdGVyRGlmZnMgPSB0aGlzLnJlZmluZURpZmYob3JpZ2luYWxMaW5lcywgbW9kaWZpZWRMaW5lcywgZGlmZiwgdGltZW91dCwgY29uc2lkZXJXaGl0ZXNwYWNlQ2hhbmdlcywgb3B0aW9ucyk7XG4gICAgICBpZiAoY2hhcmFjdGVyRGlmZnMuaGl0VGltZW91dCkge1xuICAgICAgICBoaXRUaW1lb3V0ID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGZvciAoY29uc3QgYSBvZiBjaGFyYWN0ZXJEaWZmcy5tYXBwaW5ncykge1xuICAgICAgICBhbGlnbm1lbnRzLnB1c2goYSk7XG4gICAgICB9XG4gICAgfVxuICAgIHNjYW5Gb3JXaGl0ZXNwYWNlQ2hhbmdlcyhvcmlnaW5hbExpbmVzLmxlbmd0aCAtIHNlcTFMYXN0U3RhcnQpO1xuICAgIGNvbnN0IGNoYW5nZXMgPSBsaW5lUmFuZ2VNYXBwaW5nRnJvbVJhbmdlTWFwcGluZ3MoYWxpZ25tZW50cywgbmV3IEFycmF5VGV4dChvcmlnaW5hbExpbmVzKSwgbmV3IEFycmF5VGV4dChtb2RpZmllZExpbmVzKSk7XG4gICAgbGV0IG1vdmVzID0gW107XG4gICAgaWYgKG9wdGlvbnMuY29tcHV0ZU1vdmVzKSB7XG4gICAgICBtb3ZlcyA9IHRoaXMuY29tcHV0ZU1vdmVzKGNoYW5nZXMsIG9yaWdpbmFsTGluZXMsIG1vZGlmaWVkTGluZXMsIG9yaWdpbmFsTGluZXNIYXNoZXMsIG1vZGlmaWVkTGluZXNIYXNoZXMsIHRpbWVvdXQsIGNvbnNpZGVyV2hpdGVzcGFjZUNoYW5nZXMsIG9wdGlvbnMpO1xuICAgIH1cbiAgICBhc3NlcnRGbigoKSA9PiB7XG4gICAgICBmdW5jdGlvbiB2YWxpZGF0ZVBvc2l0aW9uKHBvcywgbGluZXMpIHtcbiAgICAgICAgaWYgKHBvcy5saW5lTnVtYmVyIDwgMSB8fCBwb3MubGluZU51bWJlciA+IGxpbmVzLmxlbmd0aCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBsaW5lID0gbGluZXNbcG9zLmxpbmVOdW1iZXIgLSAxXTtcbiAgICAgICAgaWYgKHBvcy5jb2x1bW4gPCAxIHx8IHBvcy5jb2x1bW4gPiBsaW5lLmxlbmd0aCArIDEpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiB2YWxpZGF0ZVJhbmdlKHJhbmdlLCBsaW5lcykge1xuICAgICAgICBpZiAocmFuZ2Uuc3RhcnRMaW5lTnVtYmVyIDwgMSB8fCByYW5nZS5zdGFydExpbmVOdW1iZXIgPiBsaW5lcy5sZW5ndGggKyAxKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyYW5nZS5lbmRMaW5lTnVtYmVyRXhjbHVzaXZlIDwgMSB8fCByYW5nZS5lbmRMaW5lTnVtYmVyRXhjbHVzaXZlID4gbGluZXMubGVuZ3RoICsgMSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGZvciAoY29uc3QgYyBvZiBjaGFuZ2VzKSB7XG4gICAgICAgIGlmICghYy5pbm5lckNoYW5nZXMpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBpYyBvZiBjLmlubmVyQ2hhbmdlcykge1xuICAgICAgICAgIGNvbnN0IHZhbGlkID0gdmFsaWRhdGVQb3NpdGlvbihpYy5tb2RpZmllZFJhbmdlLmdldFN0YXJ0UG9zaXRpb24oKSwgbW9kaWZpZWRMaW5lcykgJiYgdmFsaWRhdGVQb3NpdGlvbihpYy5tb2RpZmllZFJhbmdlLmdldEVuZFBvc2l0aW9uKCksIG1vZGlmaWVkTGluZXMpICYmIHZhbGlkYXRlUG9zaXRpb24oaWMub3JpZ2luYWxSYW5nZS5nZXRTdGFydFBvc2l0aW9uKCksIG9yaWdpbmFsTGluZXMpICYmIHZhbGlkYXRlUG9zaXRpb24oaWMub3JpZ2luYWxSYW5nZS5nZXRFbmRQb3NpdGlvbigpLCBvcmlnaW5hbExpbmVzKTtcbiAgICAgICAgICBpZiAoIXZhbGlkKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghdmFsaWRhdGVSYW5nZShjLm1vZGlmaWVkLCBtb2RpZmllZExpbmVzKSB8fCAhdmFsaWRhdGVSYW5nZShjLm9yaWdpbmFsLCBvcmlnaW5hbExpbmVzKSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSk7XG4gICAgcmV0dXJuIG5ldyBMaW5lc0RpZmYoY2hhbmdlcywgbW92ZXMsIGhpdFRpbWVvdXQpO1xuICB9XG4gIGNvbXB1dGVNb3ZlcyhjaGFuZ2VzLCBvcmlnaW5hbExpbmVzLCBtb2RpZmllZExpbmVzLCBoYXNoZWRPcmlnaW5hbExpbmVzLCBoYXNoZWRNb2RpZmllZExpbmVzLCB0aW1lb3V0LCBjb25zaWRlcldoaXRlc3BhY2VDaGFuZ2VzLCBvcHRpb25zKSB7XG4gICAgY29uc3QgbW92ZXMgPSBjb21wdXRlTW92ZWRMaW5lcyhcbiAgICAgIGNoYW5nZXMsXG4gICAgICBvcmlnaW5hbExpbmVzLFxuICAgICAgbW9kaWZpZWRMaW5lcyxcbiAgICAgIGhhc2hlZE9yaWdpbmFsTGluZXMsXG4gICAgICBoYXNoZWRNb2RpZmllZExpbmVzLFxuICAgICAgdGltZW91dFxuICAgICk7XG4gICAgY29uc3QgbW92ZXNXaXRoRGlmZnMgPSBtb3Zlcy5tYXAoKG0pID0+IHtcbiAgICAgIGNvbnN0IG1vdmVDaGFuZ2VzID0gdGhpcy5yZWZpbmVEaWZmKG9yaWdpbmFsTGluZXMsIG1vZGlmaWVkTGluZXMsIG5ldyBTZXF1ZW5jZURpZmYoXG4gICAgICAgIG0ub3JpZ2luYWwudG9PZmZzZXRSYW5nZSgpLFxuICAgICAgICBtLm1vZGlmaWVkLnRvT2Zmc2V0UmFuZ2UoKVxuICAgICAgKSwgdGltZW91dCwgY29uc2lkZXJXaGl0ZXNwYWNlQ2hhbmdlcywgb3B0aW9ucyk7XG4gICAgICBjb25zdCBtYXBwaW5ncyA9IGxpbmVSYW5nZU1hcHBpbmdGcm9tUmFuZ2VNYXBwaW5ncyhtb3ZlQ2hhbmdlcy5tYXBwaW5ncywgbmV3IEFycmF5VGV4dChvcmlnaW5hbExpbmVzKSwgbmV3IEFycmF5VGV4dChtb2RpZmllZExpbmVzKSwgdHJ1ZSk7XG4gICAgICByZXR1cm4gbmV3IE1vdmVkVGV4dChtLCBtYXBwaW5ncyk7XG4gICAgfSk7XG4gICAgcmV0dXJuIG1vdmVzV2l0aERpZmZzO1xuICB9XG4gIHJlZmluZURpZmYob3JpZ2luYWxMaW5lcywgbW9kaWZpZWRMaW5lcywgZGlmZiwgdGltZW91dCwgY29uc2lkZXJXaGl0ZXNwYWNlQ2hhbmdlcywgb3B0aW9ucykge1xuICAgIGNvbnN0IGxpbmVSYW5nZU1hcHBpbmcgPSB0b0xpbmVSYW5nZU1hcHBpbmcoZGlmZik7XG4gICAgY29uc3QgcmFuZ2VNYXBwaW5nID0gbGluZVJhbmdlTWFwcGluZy50b1JhbmdlTWFwcGluZzIob3JpZ2luYWxMaW5lcywgbW9kaWZpZWRMaW5lcyk7XG4gICAgY29uc3Qgc2xpY2UxID0gbmV3IExpbmVzU2xpY2VDaGFyU2VxdWVuY2Uob3JpZ2luYWxMaW5lcywgcmFuZ2VNYXBwaW5nLm9yaWdpbmFsUmFuZ2UsIGNvbnNpZGVyV2hpdGVzcGFjZUNoYW5nZXMpO1xuICAgIGNvbnN0IHNsaWNlMiA9IG5ldyBMaW5lc1NsaWNlQ2hhclNlcXVlbmNlKG1vZGlmaWVkTGluZXMsIHJhbmdlTWFwcGluZy5tb2RpZmllZFJhbmdlLCBjb25zaWRlcldoaXRlc3BhY2VDaGFuZ2VzKTtcbiAgICBjb25zdCBkaWZmUmVzdWx0ID0gc2xpY2UxLmxlbmd0aCArIHNsaWNlMi5sZW5ndGggPCA1MDAgPyB0aGlzLmR5bmFtaWNQcm9ncmFtbWluZ0RpZmZpbmcuY29tcHV0ZShzbGljZTEsIHNsaWNlMiwgdGltZW91dCkgOiB0aGlzLm15ZXJzRGlmZmluZ0FsZ29yaXRobS5jb21wdXRlKHNsaWNlMSwgc2xpY2UyLCB0aW1lb3V0KTtcbiAgICBsZXQgZGlmZnMgPSBkaWZmUmVzdWx0LmRpZmZzO1xuICAgIGRpZmZzID0gb3B0aW1pemVTZXF1ZW5jZURpZmZzKHNsaWNlMSwgc2xpY2UyLCBkaWZmcyk7XG4gICAgZGlmZnMgPSBleHRlbmREaWZmc1RvRW50aXJlV29yZElmQXBwcm9wcmlhdGUoc2xpY2UxLCBzbGljZTIsIGRpZmZzLCAoc2VxLCBpZHgpID0+IHNlcS5maW5kV29yZENvbnRhaW5pbmcoaWR4KSk7XG4gICAgaWYgKG9wdGlvbnMuZXh0ZW5kVG9TdWJ3b3Jkcykge1xuICAgICAgZGlmZnMgPSBleHRlbmREaWZmc1RvRW50aXJlV29yZElmQXBwcm9wcmlhdGUoc2xpY2UxLCBzbGljZTIsIGRpZmZzLCAoc2VxLCBpZHgpID0+IHNlcS5maW5kU3ViV29yZENvbnRhaW5pbmcoaWR4KSwgdHJ1ZSk7XG4gICAgfVxuICAgIGRpZmZzID0gcmVtb3ZlU2hvcnRNYXRjaGVzKHNsaWNlMSwgc2xpY2UyLCBkaWZmcyk7XG4gICAgZGlmZnMgPSByZW1vdmVWZXJ5U2hvcnRNYXRjaGluZ1RleHRCZXR3ZWVuTG9uZ0RpZmZzKHNsaWNlMSwgc2xpY2UyLCBkaWZmcyk7XG4gICAgY29uc3QgcmVzdWx0ID0gZGlmZnMubWFwKFxuICAgICAgKGQpID0+IG5ldyBSYW5nZU1hcHBpbmcoXG4gICAgICAgIHNsaWNlMS50cmFuc2xhdGVSYW5nZShkLnNlcTFSYW5nZSksXG4gICAgICAgIHNsaWNlMi50cmFuc2xhdGVSYW5nZShkLnNlcTJSYW5nZSlcbiAgICAgIClcbiAgICApO1xuICAgIHJldHVybiB7XG4gICAgICBtYXBwaW5nczogcmVzdWx0LFxuICAgICAgaGl0VGltZW91dDogZGlmZlJlc3VsdC5oaXRUaW1lb3V0XG4gICAgfTtcbiAgfVxufVxuZnVuY3Rpb24gdG9MaW5lUmFuZ2VNYXBwaW5nKHNlcXVlbmNlRGlmZikge1xuICByZXR1cm4gbmV3IExpbmVSYW5nZU1hcHBpbmcoXG4gICAgbmV3IExpbmVSYW5nZShzZXF1ZW5jZURpZmYuc2VxMVJhbmdlLnN0YXJ0ICsgMSwgc2VxdWVuY2VEaWZmLnNlcTFSYW5nZS5lbmRFeGNsdXNpdmUgKyAxKSxcbiAgICBuZXcgTGluZVJhbmdlKHNlcXVlbmNlRGlmZi5zZXEyUmFuZ2Uuc3RhcnQgKyAxLCBzZXF1ZW5jZURpZmYuc2VxMlJhbmdlLmVuZEV4Y2x1c2l2ZSArIDEpXG4gICk7XG59XG5cbmZ1bmN0aW9uIGNvbXB1dGVEaWZmKG9yaWdpbmFsTGluZXMsIG1vZGlmaWVkTGluZXMsIG9wdGlvbnMpIHtcbiAgbGV0IGRpZmZDb21wdXRlciA9IG5ldyBEZWZhdWx0TGluZXNEaWZmQ29tcHV0ZXIoKTtcbiAgdmFyIHJlc3VsdCA9IGRpZmZDb21wdXRlci5jb21wdXRlRGlmZihvcmlnaW5hbExpbmVzLCBtb2RpZmllZExpbmVzLCBvcHRpb25zKTtcbiAgcmV0dXJuIHJlc3VsdD8uY2hhbmdlcy5tYXAoKGNoYW5nZXMpID0+IHtcbiAgICBsZXQgb3JpZ2luYWxTdGFydExpbmVOdW1iZXI7XG4gICAgbGV0IG9yaWdpbmFsRW5kTGluZU51bWJlcjtcbiAgICBsZXQgbW9kaWZpZWRTdGFydExpbmVOdW1iZXI7XG4gICAgbGV0IG1vZGlmaWVkRW5kTGluZU51bWJlcjtcbiAgICBsZXQgaW5uZXJDaGFuZ2VzID0gY2hhbmdlcy5pbm5lckNoYW5nZXM7XG4gICAgb3JpZ2luYWxTdGFydExpbmVOdW1iZXIgPSBjaGFuZ2VzLm9yaWdpbmFsLnN0YXJ0TGluZU51bWJlciAtIDE7XG4gICAgb3JpZ2luYWxFbmRMaW5lTnVtYmVyID0gY2hhbmdlcy5vcmlnaW5hbC5lbmRMaW5lTnVtYmVyRXhjbHVzaXZlIC0gMTtcbiAgICBtb2RpZmllZFN0YXJ0TGluZU51bWJlciA9IGNoYW5nZXMubW9kaWZpZWQuc3RhcnRMaW5lTnVtYmVyIC0gMTtcbiAgICBtb2RpZmllZEVuZExpbmVOdW1iZXIgPSBjaGFuZ2VzLm1vZGlmaWVkLmVuZExpbmVOdW1iZXJFeGNsdXNpdmUgLSAxO1xuICAgIHJldHVybiB7XG4gICAgICBvcmlnU3RhcnQ6IG9yaWdpbmFsU3RhcnRMaW5lTnVtYmVyLFxuICAgICAgb3JpZ0VuZDogb3JpZ2luYWxFbmRMaW5lTnVtYmVyLFxuICAgICAgZWRpdFN0YXJ0OiBtb2RpZmllZFN0YXJ0TGluZU51bWJlcixcbiAgICAgIGVkaXRFbmQ6IG1vZGlmaWVkRW5kTGluZU51bWJlcixcbiAgICAgIGNoYXJDaGFuZ2VzOiBpbm5lckNoYW5nZXM/Lm1hcCgobSkgPT4gKHtcbiAgICAgICAgb3JpZ2luYWxTdGFydExpbmVOdW1iZXI6IG0ub3JpZ2luYWxSYW5nZS5zdGFydExpbmVOdW1iZXIgLSAxLFxuICAgICAgICBvcmlnaW5hbFN0YXJ0Q29sdW1uOiBtLm9yaWdpbmFsUmFuZ2Uuc3RhcnRDb2x1bW4gLSAxLFxuICAgICAgICBvcmlnaW5hbEVuZExpbmVOdW1iZXI6IG0ub3JpZ2luYWxSYW5nZS5lbmRMaW5lTnVtYmVyIC0gMSxcbiAgICAgICAgb3JpZ2luYWxFbmRDb2x1bW46IG0ub3JpZ2luYWxSYW5nZS5lbmRDb2x1bW4gLSAxLFxuICAgICAgICBtb2RpZmllZFN0YXJ0TGluZU51bWJlcjogbS5tb2RpZmllZFJhbmdlLnN0YXJ0TGluZU51bWJlciAtIDEsXG4gICAgICAgIG1vZGlmaWVkU3RhcnRDb2x1bW46IG0ubW9kaWZpZWRSYW5nZS5zdGFydENvbHVtbiAtIDEsXG4gICAgICAgIG1vZGlmaWVkRW5kTGluZU51bWJlcjogbS5tb2RpZmllZFJhbmdlLmVuZExpbmVOdW1iZXIgLSAxLFxuICAgICAgICBtb2RpZmllZEVuZENvbHVtbjogbS5tb2RpZmllZFJhbmdlLmVuZENvbHVtbiAtIDFcbiAgICAgIH0pKVxuICAgIH07XG4gIH0pO1xufVxuXG5leHBvcnRzLmNvbXB1dGVEaWZmID0gY29tcHV0ZURpZmY7XG5cbnZhciBBY2VSYW5nZSA9IHJlcXVpcmUoXCIuLi8uLi8uLi9yYW5nZVwiKS5SYW5nZTtcblxudmFyIHtEaWZmQ2h1bmt9ID0gcmVxdWlyZShcIi4uL2Jhc2VfZGlmZl92aWV3XCIpOyBcbiBcbi8qKlxuICogVlNDb2Rl4oCZcyBjb21wdXRlRGlmZiBwcm92aWRlclxuICovXG5cbmNsYXNzIERpZmZQcm92aWRlciB7XG4gICAgY29tcHV0ZShvcmlnaW5hbExpbmVzLCBtb2RpZmllZExpbmVzLCBvcHRzKSB7XG4gICAgICAgIGlmICghb3B0cykgb3B0cyA9IHt9O1xuICAgICAgICBpZiAoIW9wdHMubWF4Q29tcHV0YXRpb25UaW1lTXMpIG9wdHMubWF4Q29tcHV0YXRpb25UaW1lTXMgPSA1MDA7XG4gICAgICAgIGNvbnN0IGNodW5rcyA9IGNvbXB1dGVEaWZmKG9yaWdpbmFsTGluZXMsIG1vZGlmaWVkTGluZXMsIG9wdHMpIHx8IFtdO1xuICAgICAgICByZXR1cm4gY2h1bmtzLm1hcChcbiAgICAgICAgICAgIGMgPT4gbmV3IERpZmZDaHVuayhuZXcgQWNlUmFuZ2UoYy5vcmlnU3RhcnQsIDAsIGMub3JpZ0VuZCwgMCksIG5ldyBBY2VSYW5nZShjLmVkaXRTdGFydCwgMCwgYy5lZGl0RW5kLCAwKSxcbiAgICAgICAgICAgICAgICBjLmNoYXJDaGFuZ2VzXG4gICAgICAgICAgICApKTtcbiAgICB9XG59XG5cbmV4cG9ydHMuRGlmZlByb3ZpZGVyID0gRGlmZlByb3ZpZGVyOyIsInZhciBEZWNvcmF0b3IgPSByZXF1aXJlKFwiLi4vLi4vbGF5ZXIvZGVjb3JhdG9yc1wiKS5EZWNvcmF0b3I7XG5cbmNsYXNzIFNjcm9sbERpZmZEZWNvcmF0b3IgZXh0ZW5kcyBEZWNvcmF0b3Ige1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7aW1wb3J0KFwiLi4vLi4vLi4vYWNlLWludGVybmFsXCIpLkFjZS5WU2Nyb2xsYmFyfSBzY3JvbGxiYXJWXG4gICAgICogQHBhcmFtIHtpbXBvcnQoXCIuLi8uLi92aXJ0dWFsX3JlbmRlcmVyXCIpLlZpcnR1YWxSZW5kZXJlcn0gcmVuZGVyZXJcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtmb3JJbmxpbmVEaWZmXVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHNjcm9sbGJhclYsIHJlbmRlcmVyLCBmb3JJbmxpbmVEaWZmKSB7XG4gICAgICAgIHN1cGVyKHNjcm9sbGJhclYsIHJlbmRlcmVyKTtcblxuICAgICAgICB0aGlzLmNvbG9ycy5kYXJrW1wiZGVsZXRlXCJdID0gXCJyZ2JhKDI1NSwgMTgsIDE4LCAxKVwiO1xuICAgICAgICB0aGlzLmNvbG9ycy5kYXJrW1wiaW5zZXJ0XCJdID0gXCJyZ2JhKDE4LCAxMzYsIDE4LCAxKVwiO1xuICAgICAgICB0aGlzLmNvbG9ycy5saWdodFtcImRlbGV0ZVwiXSA9IFwicmdiKDI1NSw1MSw1MSlcIjtcbiAgICAgICAgdGhpcy5jb2xvcnMubGlnaHRbXCJpbnNlcnRcIl0gPSBcInJnYigzMiwxMzMsNzIpXCI7XG5cbiAgICAgICAgdGhpcy4kem9uZXMgPSBbXTtcbiAgICAgICAgdGhpcy4kZm9ySW5saW5lRGlmZiA9IGZvcklubGluZURpZmY7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHN0YXJ0Um93XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGVuZFJvd1xuICAgICAqIEBwYXJhbSB7XCJkZWxldGVcInxcImluc2VydFwifSB0eXBlXG4gICAgICovXG4gICAgYWRkWm9uZShzdGFydFJvdywgZW5kUm93LCB0eXBlKSB7XG4gICAgICAgIHRoaXMuJHpvbmVzLnB1c2goe1xuICAgICAgICAgICAgc3RhcnRSb3csXG4gICAgICAgICAgICBlbmRSb3csXG4gICAgICAgICAgICB0eXBlXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7aW1wb3J0KFwiLi4vLi4vZWRpdF9zZXNzaW9uXCIpLkVkaXRTZXNzaW9ufSBzZXNzaW9uQVxuICAgICAqIEBwYXJhbSB7aW1wb3J0KFwiLi4vLi4vZWRpdF9zZXNzaW9uXCIpLkVkaXRTZXNzaW9ufSBzZXNzaW9uQlxuICAgICAqL1xuICAgIHNldFNlc3Npb25zKHNlc3Npb25BLCBzZXNzaW9uQikge1xuICAgICAgICB0aGlzLnNlc3Npb25BID0gc2Vzc2lvbkE7XG4gICAgICAgIHRoaXMuc2Vzc2lvbkIgPSBzZXNzaW9uQjtcbiAgICB9XG5cbiAgICAkdXBkYXRlRGVjb3JhdG9ycyhjb25maWcpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmNhbnZhcy5nZXRDb250ZXh0ICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBzdXBlci4kdXBkYXRlRGVjb3JhdG9ycyhjb25maWcpO1xuICAgICAgICBpZiAodGhpcy4kem9uZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdmFyIGNvbG9ycyA9ICh0aGlzLnJlbmRlcmVyLnRoZW1lLmlzRGFyayA9PT0gdHJ1ZSkgPyB0aGlzLmNvbG9ycy5kYXJrIDogdGhpcy5jb2xvcnMubGlnaHQ7XG4gICAgICAgICAgICB2YXIgY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICAgICAgdGhpcy4kc2V0RGlmZkRlY29yYXRvcnMoY3R4LCBjb2xvcnMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHJvd1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAgICovXG4gICAgJHRyYW5zZm9ybVBvc2l0aW9uKHJvdywgdHlwZSkge1xuICAgICAgICBpZiAodHlwZSA9PSBcImRlbGV0ZVwiKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZXNzaW9uQS5kb2N1bWVudFRvU2NyZWVuUm93KHJvdywgMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZXNzaW9uQi5kb2N1bWVudFRvU2NyZWVuUm93KHJvdywgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAkc2V0RGlmZkRlY29yYXRvcnMoY3R4LCBjb2xvcnMpIHtcbiAgICAgICAgZnVuY3Rpb24gY29tcGFyZShhLCBiKSB7XG4gICAgICAgICAgICBpZiAoYS5mcm9tID09PSBiLmZyb20pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYS50byAtIGIudG87XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gYS5mcm9tIC0gYi5mcm9tO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHpvbmVzID0gdGhpcy4kem9uZXM7XG4gICAgICAgIGlmICh6b25lcykge1xuICAgICAgICAgICAgdmFyIHJlc29sdmVkWm9uZXMgPSBbXTtcblxuICAgICAgICAgICAgY29uc3QgZGVsZXRlWm9uZXMgPSB6b25lcy5maWx0ZXIoeiA9PiB6LnR5cGUgPT09IFwiZGVsZXRlXCIpO1xuICAgICAgICAgICAgY29uc3QgaW5zZXJ0Wm9uZXMgPSB6b25lcy5maWx0ZXIoeiA9PiB6LnR5cGUgPT09IFwiaW5zZXJ0XCIpO1xuXG4gICAgICAgICAgICBbZGVsZXRlWm9uZXMsIGluc2VydFpvbmVzXS5mb3JFYWNoKCh0eXBlWm9uZXMpID0+IHtcbiAgICAgICAgICAgICAgICB0eXBlWm9uZXMuZm9yRWFjaCgoem9uZSwgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBvZmZzZXQxID0gdGhpcy4kdHJhbnNmb3JtUG9zaXRpb24oem9uZS5zdGFydFJvdywgem9uZS50eXBlKSAqIHRoaXMubGluZUhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG9mZnNldDIgPSB0aGlzLiR0cmFuc2Zvcm1Qb3NpdGlvbih6b25lLmVuZFJvdywgem9uZS50eXBlKSAqIHRoaXMubGluZUhlaWdodCArIHRoaXMubGluZUhlaWdodDtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCB5MSA9IE1hdGgucm91bmQodGhpcy5oZWlnaHRSYXRpbyAqIG9mZnNldDEpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB5MiA9IE1hdGgucm91bmQodGhpcy5oZWlnaHRSYXRpbyAqIG9mZnNldDIpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhZGRpbmcgPSAxO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCB5Y2VudGVyID0gTWF0aC5yb3VuZCgoeTEgKyB5MikgLyAyKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGhhbGZIZWlnaHQgPSAoeTIgLSB5Y2VudGVyKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoaGFsZkhlaWdodCA8IHRoaXMuaGFsZk1pbkRlY29yYXRpb25IZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbGZIZWlnaHQgPSB0aGlzLmhhbGZNaW5EZWNvcmF0aW9uSGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJldmlvdXNab25lID0gcmVzb2x2ZWRab25lc1tyZXNvbHZlZFpvbmVzLmxlbmd0aCAtIDFdO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChpID4gMCAmJiBwcmV2aW91c1pvbmUgJiYgcHJldmlvdXNab25lLnR5cGUgPT09IHpvbmUudHlwZSAmJiB5Y2VudGVyIC0gaGFsZkhlaWdodCA8IHByZXZpb3VzWm9uZS50byArIHBhZGRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHljZW50ZXIgPSByZXNvbHZlZFpvbmVzW3Jlc29sdmVkWm9uZXMubGVuZ3RoIC0gMV0udG8gKyBwYWRkaW5nICsgaGFsZkhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICh5Y2VudGVyIC0gaGFsZkhlaWdodCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHljZW50ZXIgPSBoYWxmSGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh5Y2VudGVyICsgaGFsZkhlaWdodCA+IHRoaXMuY2FudmFzSGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB5Y2VudGVyID0gdGhpcy5jYW52YXNIZWlnaHQgLSBoYWxmSGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZWRab25lcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHpvbmUudHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyb206IHljZW50ZXIgLSBoYWxmSGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICAgICAgdG86IHljZW50ZXIgKyBoYWxmSGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IGNvbG9yc1t6b25lLnR5cGVdIHx8IG51bGxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmVzb2x2ZWRab25lcyA9IHJlc29sdmVkWm9uZXMuc29ydChjb21wYXJlKTtcblxuICAgICAgICAgICAgZm9yIChjb25zdCB6b25lIG9mIHJlc29sdmVkWm9uZXMpIHtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gem9uZS5jb2xvciB8fCBudWxsO1xuXG4gICAgICAgICAgICAgICAgY29uc3Qgem9uZUZyb20gPSB6b25lLmZyb207XG4gICAgICAgICAgICAgICAgY29uc3Qgem9uZVRvID0gem9uZS50bztcbiAgICAgICAgICAgICAgICBjb25zdCB6b25lSGVpZ2h0ID0gem9uZVRvIC0gem9uZUZyb207XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuJGZvcklubGluZURpZmYpIHtcbiAgICAgICAgICAgICAgICAgICAgY3R4LmZpbGxSZWN0KHRoaXMub25lWm9uZVdpZHRoLCB6b25lRnJvbSwgMiAqIHRoaXMub25lWm9uZVdpZHRoLCB6b25lSGVpZ2h0KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoem9uZS50eXBlID09IFwiZGVsZXRlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5maWxsUmVjdCh0aGlzLm9uZVpvbmVXaWR0aCwgem9uZUZyb20sIHRoaXMub25lWm9uZVdpZHRoLCB6b25lSGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5maWxsUmVjdCgyICogdGhpcy5vbmVab25lV2lkdGgsIHpvbmVGcm9tLCB0aGlzLm9uZVpvbmVXaWR0aCwgem9uZUhlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldFpvbmVXaWR0aCgpIHtcbiAgICAgICAgdGhpcy5vbmVab25lV2lkdGggPSBNYXRoLnJvdW5kKHRoaXMuY2FudmFzV2lkdGggLyAzKTtcbiAgICB9XG59XG5cbmV4cG9ydHMuU2Nyb2xsRGlmZkRlY29yYXRvciA9IFNjcm9sbERpZmZEZWNvcmF0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBCYXNlRGlmZlZpZXcgPSByZXF1aXJlKFwiLi9iYXNlX2RpZmZfdmlld1wiKS5CYXNlRGlmZlZpZXc7XG52YXIgY29uZmlnID0gcmVxdWlyZShcIi4uLy4uL2NvbmZpZ1wiKTtcblxuY2xhc3MgU3BsaXREaWZmVmlldyBleHRlbmRzIEJhc2VEaWZmVmlldyB7XG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0cyBhIG5ldyBzaWRlIGJ5IHNpZGUgRGlmZlZpZXcgaW5zdGFuY2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge2ltcG9ydChcIi4uL2RpZmZcIikuRGlmZk1vZGVsfSBbZGlmZk1vZGVsXSAtIFRoZSBtb2RlbCBmb3IgdGhlIGRpZmYgdmlldy5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihkaWZmTW9kZWwpIHtcbiAgICAgICAgZGlmZk1vZGVsID0gZGlmZk1vZGVsIHx8IHt9O1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmluaXQoZGlmZk1vZGVsKTtcbiAgICB9XG5cbiAgICBpbml0KGRpZmZNb2RlbCkge1xuICAgICAgICB0aGlzLm9uQ2hhbmdlVGhlbWUgPSB0aGlzLm9uQ2hhbmdlVGhlbWUuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vbk1vdXNlV2hlZWwgPSB0aGlzLm9uTW91c2VXaGVlbC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLm9uU2Nyb2xsID0gdGhpcy5vblNjcm9sbC5iaW5kKHRoaXMpO1xuXG4gICAgICAgIHRoaXMuJHNldHVwTW9kZWxzKGRpZmZNb2RlbCk7XG5cbiAgICAgICAgdGhpcy5hZGRHdXR0ZXJEZWNvcmF0b3JzKCk7XG5cbiAgICAgICAgdGhpcy5vbkNoYW5nZVRoZW1lKCk7XG5cbiAgICAgICAgY29uZmlnLnJlc2V0T3B0aW9ucyh0aGlzKTtcbiAgICAgICAgY29uZmlnW1wiX3NpZ25hbFwiXShcImRpZmZWaWV3XCIsIHRoaXMpO1xuXG4gICAgICAgIHRoaXMuJGF0dGFjaEV2ZW50SGFuZGxlcnMoKTtcbiAgICB9XG5cbiAgICBvbkNoYW5nZVdyYXBMaW1pdCgpIHtcbiAgICAgICAgdGhpcy5zY2hlZHVsZVJlYWxpZ24oKTtcbiAgICB9XG5cbiAgICAvKioqIHNjcm9sbCBsb2NraW5nICoqKi9cbiAgICBhbGlnbigpIHtcbiAgICAgICAgdmFyIGRpZmZWaWV3ID0gdGhpcztcblxuICAgICAgICB0aGlzLiRpbml0V2lkZ2V0cyhkaWZmVmlldy5lZGl0b3JBKTtcbiAgICAgICAgdGhpcy4kaW5pdFdpZGdldHMoZGlmZlZpZXcuZWRpdG9yQik7XG5cbiAgICAgICAgZGlmZlZpZXcuY2h1bmtzLmZvckVhY2goZnVuY3Rpb24gKGNoKSB7XG4gICAgICAgICAgICB2YXIgZGlmZjEgPSBkaWZmVmlldy4kc2NyZWVuUm93KGNoLm9sZC5zdGFydCwgZGlmZlZpZXcuc2Vzc2lvbkEpO1xuICAgICAgICAgICAgdmFyIGRpZmYyID0gZGlmZlZpZXcuJHNjcmVlblJvdyhjaC5uZXcuc3RhcnQsIGRpZmZWaWV3LnNlc3Npb25CKTsgXG5cbiAgICAgICAgICAgIGlmIChkaWZmMSA8IGRpZmYyKSB7XG4gICAgICAgICAgICAgICAgZGlmZlZpZXcuJGFkZFdpZGdldChkaWZmVmlldy5zZXNzaW9uQSwge1xuICAgICAgICAgICAgICAgICAgICByb3dDb3VudDogZGlmZjIgLSBkaWZmMSxcbiAgICAgICAgICAgICAgICAgICAgcm93c0Fib3ZlOiBjaC5vbGQuc3RhcnQucm93ID09PSAwID8gZGlmZjIgLSBkaWZmMSA6IDAsXG4gICAgICAgICAgICAgICAgICAgIHJvdzogY2gub2xkLnN0YXJ0LnJvdyA9PT0gMCA/IDAgOiBjaC5vbGQuc3RhcnQucm93IC0gMVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZGlmZjEgPiBkaWZmMikge1xuICAgICAgICAgICAgICAgIGRpZmZWaWV3LiRhZGRXaWRnZXQoZGlmZlZpZXcuc2Vzc2lvbkIsIHtcbiAgICAgICAgICAgICAgICAgICAgcm93Q291bnQ6IGRpZmYxIC0gZGlmZjIsXG4gICAgICAgICAgICAgICAgICAgIHJvd3NBYm92ZTogY2gubmV3LnN0YXJ0LnJvdyA9PT0gMCA/IGRpZmYxIC0gZGlmZjIgOiAwLFxuICAgICAgICAgICAgICAgICAgICByb3c6IGNoLm5ldy5zdGFydC5yb3cgPT09IDAgPyAwIDogY2gubmV3LnN0YXJ0LnJvdyAtIDFcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGRpZmYxID0gZGlmZlZpZXcuJHNjcmVlblJvdyhjaC5vbGQuZW5kLCBkaWZmVmlldy5zZXNzaW9uQSk7XG4gICAgICAgICAgICB2YXIgZGlmZjIgPSBkaWZmVmlldy4kc2NyZWVuUm93KGNoLm5ldy5lbmQsIGRpZmZWaWV3LnNlc3Npb25CKTsgXG4gICAgICAgICAgICBpZiAoZGlmZjEgPCBkaWZmMikge1xuICAgICAgICAgICAgICAgIGRpZmZWaWV3LiRhZGRXaWRnZXQoZGlmZlZpZXcuc2Vzc2lvbkEsIHtcbiAgICAgICAgICAgICAgICAgICAgcm93Q291bnQ6IGRpZmYyIC0gZGlmZjEsXG4gICAgICAgICAgICAgICAgICAgIHJvd3NBYm92ZTogY2gub2xkLmVuZC5yb3cgPT09IDAgPyBkaWZmMiAtIGRpZmYxIDogMCxcbiAgICAgICAgICAgICAgICAgICAgcm93OiBjaC5vbGQuZW5kLnJvdyA9PT0gMCA/IDAgOiBjaC5vbGQuZW5kLnJvdyAtIDFcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGRpZmYxID4gZGlmZjIpIHtcbiAgICAgICAgICAgICAgICBkaWZmVmlldy4kYWRkV2lkZ2V0KGRpZmZWaWV3LnNlc3Npb25CLCB7XG4gICAgICAgICAgICAgICAgICAgIHJvd0NvdW50OiBkaWZmMSAtIGRpZmYyLFxuICAgICAgICAgICAgICAgICAgICByb3dzQWJvdmU6IGNoLm5ldy5lbmQucm93ID09PSAwID8gZGlmZjEgLSBkaWZmMiA6IDAsXG4gICAgICAgICAgICAgICAgICAgIHJvdzogY2gubmV3LmVuZC5yb3cgPT09IDAgPyAwIDogY2gubmV3LmVuZC5yb3cgLSAxXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBkaWZmVmlldy5zZXNzaW9uQVtcIl9lbWl0XCJdKFwiY2hhbmdlRm9sZFwiLCB7ZGF0YToge3N0YXJ0OiB7cm93OiAwfX19KTtcbiAgICAgICAgZGlmZlZpZXcuc2Vzc2lvbkJbXCJfZW1pdFwiXShcImNoYW5nZUZvbGRcIiwge2RhdGE6IHtzdGFydDoge3JvdzogMH19fSk7XG4gICAgfVxuXG4gICAgb25TY3JvbGwoZSwgc2Vzc2lvbikge1xuICAgICAgICB0aGlzLnN5bmNTY3JvbGwodGhpcy5zZXNzaW9uQSA9PT0gc2Vzc2lvbiA/IHRoaXMuZWRpdG9yQS5yZW5kZXJlciA6IHRoaXMuZWRpdG9yQi5yZW5kZXJlcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtpbXBvcnQoXCIuLi8uLi92aXJ0dWFsX3JlbmRlcmVyXCIpLlZpcnR1YWxSZW5kZXJlcn0gcmVuZGVyZXJcbiAgICAgKi9cbiAgICBzeW5jU2Nyb2xsKHJlbmRlcmVyKSB7XG4gICAgICAgIGlmICh0aGlzLiRzeW5jU2Nyb2xsID09IGZhbHNlKSByZXR1cm47XG5cbiAgICAgICAgdmFyIHIxID0gdGhpcy5lZGl0b3JBLnJlbmRlcmVyO1xuICAgICAgICB2YXIgcjIgPSB0aGlzLmVkaXRvckIucmVuZGVyZXI7XG4gICAgICAgIHZhciBpc09yaWcgPSByZW5kZXJlciA9PSByMTtcbiAgICAgICAgaWYgKHIxW1wiJHNjcm9sbEFuaW1hdGlvblwiXSAmJiByMltcIiRzY3JvbGxBbmltYXRpb25cIl0pIHJldHVybjtcblxuICAgICAgICB2YXIgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgaWYgKHRoaXMuc2Nyb2xsU2V0QnkgIT0gcmVuZGVyZXIgJiYgbm93IC0gdGhpcy5zY3JvbGxTZXRBdCA8IDUwMCkgcmV0dXJuO1xuXG4gICAgICAgIHZhciByID0gaXNPcmlnID8gcjEgOiByMjtcbiAgICAgICAgaWYgKHRoaXMuc2Nyb2xsU2V0QnkgIT0gcmVuZGVyZXIpIHtcbiAgICAgICAgICAgIGlmIChpc09yaWcgJiYgdGhpcy5zY3JvbGxBID09IHIuc2Vzc2lvbi5nZXRTY3JvbGxUb3AoKSkgcmV0dXJuOyBlbHNlIGlmICghaXNPcmlnICYmIHRoaXMuc2Nyb2xsQlxuICAgICAgICAgICAgICAgID09IHIuc2Vzc2lvbi5nZXRTY3JvbGxUb3AoKSkgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciByT3RoZXIgPSBpc09yaWcgPyByMiA6IHIxO1xuXG4gICAgICAgIHZhciB0YXJnZXRQb3MgPSByLnNlc3Npb24uZ2V0U2Nyb2xsVG9wKCk7XG5cbiAgICAgICAgdGhpcy4kc3luY1Njcm9sbCA9IGZhbHNlO1xuXG4gICAgICAgIGlmIChpc09yaWcpIHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsQSA9IHIuc2Vzc2lvbi5nZXRTY3JvbGxUb3AoKTtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsQiA9IHRhcmdldFBvcztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsQSA9IHRhcmdldFBvcztcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsQiA9IHIuc2Vzc2lvbi5nZXRTY3JvbGxUb3AoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNjcm9sbFNldEJ5ID0gcmVuZGVyZXI7XG4gICAgICAgIHJPdGhlci5zZXNzaW9uLnNldFNjcm9sbFRvcCh0YXJnZXRQb3MpO1xuICAgICAgICB0aGlzLiRzeW5jU2Nyb2xsID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zY3JvbGxTZXRBdCA9IG5vdztcbiAgICB9XG5cbiAgICBvbk1vdXNlV2hlZWwoZXYpIHtcbiAgICAgICAgaWYgKGV2LmdldEFjY2VsS2V5KCkpIHJldHVybjtcbiAgICAgICAgaWYgKGV2LmdldFNoaWZ0S2V5KCkgJiYgZXYud2hlZWxZICYmICFldi53aGVlbFgpIHtcbiAgICAgICAgICAgIGV2LndoZWVsWCA9IGV2LndoZWVsWTtcbiAgICAgICAgICAgIGV2LndoZWVsWSA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZWRpdG9yID0gZXYuZWRpdG9yO1xuICAgICAgICB2YXIgaXNTY3JvbGFibGUgPSBlZGl0b3IucmVuZGVyZXIuaXNTY3JvbGxhYmxlQnkoZXYud2hlZWxYICogZXYuc3BlZWQsIGV2LndoZWVsWSAqIGV2LnNwZWVkKTtcbiAgICAgICAgaWYgKCFpc1Njcm9sYWJsZSkge1xuICAgICAgICAgICAgdmFyIG90aGVyID0gZWRpdG9yID09IHRoaXMuZWRpdG9yQSA/IHRoaXMuZWRpdG9yQiA6IHRoaXMuZWRpdG9yQTtcbiAgICAgICAgICAgIGlmIChvdGhlci5yZW5kZXJlci5pc1Njcm9sbGFibGVCeShldi53aGVlbFggKiBldi5zcGVlZCwgZXYud2hlZWxZICogZXYuc3BlZWQpKSBvdGhlci5yZW5kZXJlci5zY3JvbGxCeShcbiAgICAgICAgICAgICAgICBldi53aGVlbFggKiBldi5zcGVlZCwgZXYud2hlZWxZICogZXYuc3BlZWQpO1xuICAgICAgICAgICAgcmV0dXJuIGV2LnN0b3AoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgICRhdHRhY2hTZXNzaW9uc0V2ZW50SGFuZGxlcnMoKSB7XG4gICAgICAgIHRoaXMuJGF0dGFjaFNlc3Npb25FdmVudEhhbmRsZXJzKHRoaXMuZWRpdG9yQSwgdGhpcy5tYXJrZXJBKTtcbiAgICAgICAgdGhpcy4kYXR0YWNoU2Vzc2lvbkV2ZW50SGFuZGxlcnModGhpcy5lZGl0b3JCLCB0aGlzLm1hcmtlckIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7aW1wb3J0KFwiLi4vLi4vZWRpdG9yXCIpLkVkaXRvcn0gZWRpdG9yXG4gICAgICogQHBhcmFtIHtpbXBvcnQoXCIuL2Jhc2VfZGlmZl92aWV3XCIpLkRpZmZIaWdobGlnaHR9IG1hcmtlclxuICAgICAqL1xuICAgICRhdHRhY2hTZXNzaW9uRXZlbnRIYW5kbGVycyhlZGl0b3IsIG1hcmtlcikge1xuICAgICAgICBlZGl0b3Iuc2Vzc2lvbi5vbihcImNoYW5nZVNjcm9sbFRvcFwiLCB0aGlzLm9uU2Nyb2xsKTtcbiAgICAgICAgZWRpdG9yLnNlc3Npb24ub24oXCJjaGFuZ2VGb2xkXCIsIHRoaXMub25DaGFuZ2VGb2xkKTtcbiAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvclxuICAgICAgICBlZGl0b3Iuc2Vzc2lvbi5hZGREeW5hbWljTWFya2VyKG1hcmtlcik7XG4gICAgICAgIGVkaXRvci5zZWxlY3Rpb24ub24oXCJjaGFuZ2VDdXJzb3JcIiwgdGhpcy5vblNlbGVjdCk7XG4gICAgICAgIGVkaXRvci5zZWxlY3Rpb24ub24oXCJjaGFuZ2VTZWxlY3Rpb25cIiwgdGhpcy5vblNlbGVjdCk7XG5cbiAgICAgICAgZWRpdG9yLnNlc3Npb24ub24oXCJjaGFuZ2VXcmFwTGltaXRcIiwgdGhpcy5vbkNoYW5nZVdyYXBMaW1pdCk7XG4gICAgICAgIGVkaXRvci5zZXNzaW9uLm9uKFwiY2hhbmdlV3JhcE1vZGVcIiwgdGhpcy5vbkNoYW5nZVdyYXBMaW1pdCk7XG4gICAgfVxuXG4gICAgJGRldGFjaFNlc3Npb25zRXZlbnRIYW5kbGVycygpIHtcbiAgICAgICAgdGhpcy4kZGV0YWNoU2Vzc2lvbkhhbmRsZXJzKHRoaXMuZWRpdG9yQSwgdGhpcy5tYXJrZXJBKTtcbiAgICAgICAgdGhpcy4kZGV0YWNoU2Vzc2lvbkhhbmRsZXJzKHRoaXMuZWRpdG9yQiwgdGhpcy5tYXJrZXJCKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2ltcG9ydChcIi4uLy4uL2VkaXRvclwiKS5FZGl0b3J9IGVkaXRvclxuICAgICAqIEBwYXJhbSB7aW1wb3J0KFwiLi9iYXNlX2RpZmZfdmlld1wiKS5EaWZmSGlnaGxpZ2h0fSBtYXJrZXJcbiAgICAgKi9cbiAgICAkZGV0YWNoU2Vzc2lvbkhhbmRsZXJzKGVkaXRvciwgbWFya2VyKSB7XG4gICAgICAgIGVkaXRvci5zZXNzaW9uLm9mZihcImNoYW5nZVNjcm9sbFRvcFwiLCB0aGlzLm9uU2Nyb2xsKTtcbiAgICAgICAgZWRpdG9yLnNlc3Npb24ub2ZmKFwiY2hhbmdlRm9sZFwiLCB0aGlzLm9uQ2hhbmdlRm9sZCk7XG4gICAgICAgIGVkaXRvci5zZXNzaW9uLnJlbW92ZU1hcmtlcihtYXJrZXIuaWQpO1xuICAgICAgICBlZGl0b3Iuc2VsZWN0aW9uLm9mZihcImNoYW5nZUN1cnNvclwiLCB0aGlzLm9uU2VsZWN0KTtcbiAgICAgICAgZWRpdG9yLnNlbGVjdGlvbi5vZmYoXCJjaGFuZ2VTZWxlY3Rpb25cIiwgdGhpcy5vblNlbGVjdCk7XG5cbiAgICAgICAgZWRpdG9yLnNlc3Npb24ub2ZmKFwiY2hhbmdlV3JhcExpbWl0XCIsIHRoaXMub25DaGFuZ2VXcmFwTGltaXQpO1xuICAgICAgICBlZGl0b3Iuc2Vzc2lvbi5vZmYoXCJjaGFuZ2VXcmFwTW9kZVwiLCB0aGlzLm9uQ2hhbmdlV3JhcExpbWl0KTtcbiAgICB9XG5cbiAgICAkYXR0YWNoRXZlbnRIYW5kbGVycygpIHtcbiAgICAgICAgdGhpcy5lZGl0b3JBLnJlbmRlcmVyLm9uKFwidGhlbWVDaGFuZ2VcIiwgdGhpcy5vbkNoYW5nZVRoZW1lKTtcbiAgICAgICAgdGhpcy5lZGl0b3JCLnJlbmRlcmVyLm9uKFwidGhlbWVDaGFuZ2VcIiwgdGhpcy5vbkNoYW5nZVRoZW1lKTtcblxuICAgICAgICB0aGlzLmVkaXRvckEub24oXCJtb3VzZXdoZWVsXCIsIHRoaXMub25Nb3VzZVdoZWVsKTtcbiAgICAgICAgdGhpcy5lZGl0b3JCLm9uKFwibW91c2V3aGVlbFwiLCB0aGlzLm9uTW91c2VXaGVlbCk7XG5cbiAgICAgICAgdGhpcy5lZGl0b3JBLm9uKFwiaW5wdXRcIiwgdGhpcy5vbklucHV0KTtcbiAgICAgICAgdGhpcy5lZGl0b3JCLm9uKFwiaW5wdXRcIiwgdGhpcy5vbklucHV0KTtcblxuICAgIH1cblxuICAgICRkZXRhY2hFdmVudEhhbmRsZXJzKCkge1xuICAgICAgICB0aGlzLiRkZXRhY2hTZXNzaW9uc0V2ZW50SGFuZGxlcnMoKTtcbiAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbk1hcmtlcnMoKTtcbiAgICAgICAgdGhpcy5lZGl0b3JBLnJlbmRlcmVyLm9mZihcInRoZW1lQ2hhbmdlXCIsIHRoaXMub25DaGFuZ2VUaGVtZSk7XG4gICAgICAgIHRoaXMuZWRpdG9yQi5yZW5kZXJlci5vZmYoXCJ0aGVtZUNoYW5nZVwiLCB0aGlzLm9uQ2hhbmdlVGhlbWUpO1xuICAgICAgICB0aGlzLiRkZXRhY2hFZGl0b3JFdmVudEhhbmRsZXJzKHRoaXMuZWRpdG9yQSk7XG4gICAgICAgIHRoaXMuJGRldGFjaEVkaXRvckV2ZW50SGFuZGxlcnModGhpcy5lZGl0b3JCKTtcbiAgICB9XG5cbiAgICAkZGV0YWNoRWRpdG9yRXZlbnRIYW5kbGVycyhlZGl0b3IpIHtcbiAgICAgICAgZWRpdG9yLm9mZihcIm1vdXNld2hlZWxcIiwgdGhpcy5vbk1vdXNlV2hlZWwpO1xuICAgICAgICBlZGl0b3Iub2ZmKFwiaW5wdXRcIiwgdGhpcy5vbklucHV0KTtcbiAgICB9XG59XG5cblxuZXhwb3J0cy5TcGxpdERpZmZWaWV3ID0gU3BsaXREaWZmVmlldztcbiIsImV4cG9ydHMuY3NzVGV4dCA9IGBcbi8qXG4gKiBMaW5lIE1hcmtlcnNcbiAqL1xuLmFjZV9kaWZmIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgei1pbmRleDogMDtcbn1cbi5hY2VfZGlmZi5pbmxpbmUge1xuICAgIHotaW5kZXg6IDIwO1xufVxuLypcbiAqIExpZ2h0IENvbG9ycyBcbiAqL1xuLmFjZV9kaWZmLmluc2VydCB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0VGRkZGMTtcbn1cbi5hY2VfZGlmZi5kZWxldGUge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNGRkYxRjE7XG59XG4uYWNlX2RpZmYuYWxpZ25lZF9kaWZmIHtcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKDIwNiwgMTk0LCAxOTEsIDAuMjYpO1xuICAgIGJhY2tncm91bmQ6IHJlcGVhdGluZy1saW5lYXItZ3JhZGllbnQoXG4gICAgICAgICAgICAgICAgNDVkZWcsXG4gICAgICAgICAgICAgIHJnYmEoMTIyLCAxMTEsIDEwOCwgMC4yNiksXG4gICAgICAgICAgICAgIHJnYmEoMTIyLCAxMTEsIDEwOCwgMC4yNikgNXB4LFxuICAgICAgICAgICAgICByZ2JhKDAsIDAsIDAsIDApIDVweCxcbiAgICAgICAgICAgICAgcmdiYSgwLCAwLCAwLCAwKSAxMHB4IFxuICAgICk7XG59XG5cbi5hY2VfZGlmZi5pbnNlcnQuaW5saW5lIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAgcmdiKDc0IDI1MSA3NCAvIDE4JSk7IFxufVxuLmFjZV9kaWZmLmRlbGV0ZS5pbmxpbmUge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyNTEgNzQgNzQgLyAxNSUpO1xufVxuXG4uYWNlX2RpZmYuZGVsZXRlLmlubGluZS5lbXB0eSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDEyOCwgNzksIDAuNyk7XG4gICAgd2lkdGg6IDJweCAhaW1wb3J0YW50O1xufVxuXG4uYWNlX2RpZmYuaW5zZXJ0LmlubGluZS5lbXB0eSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSg0OSwgMjMwLCA5NiwgMC43KTtcbiAgICB3aWR0aDogMnB4ICFpbXBvcnRhbnQ7XG59XG5cbi5hY2VfZGlmZi1hY3RpdmUtbGluZSB7XG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkO1xuICAgIGJvcmRlci10b3A6IDFweCBzb2xpZDtcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICBib3JkZXItY29sb3I6ICM5MTkxYWM7XG59XG5cbi5hY2VfZGFyayAuYWNlX2RpZmYtYWN0aXZlLWxpbmUge1xuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAgIGJvcmRlci1jb2xvcjogIzc1Nzc3YTtcbn1cbiBcblxuLyogZ3V0dGVyIGNoYW5nZXMgKi9cbi5hY2VfbWluaS1kaWZmX2d1dHRlci1lbmFibGVkID4gLmFjZV9ndXR0ZXItY2VsbCxcbi5hY2VfbWluaS1kaWZmX2d1dHRlci1lbmFibGVkID4gLmFjZV9ndXR0ZXItY2VsbF9zdmctaWNvbnMge1xuICAgIHBhZGRpbmctcmlnaHQ6IDEzcHg7XG59XG5cbi5hY2VfbWluaS1kaWZmX2d1dHRlcl9vdGhlciA+IC5hY2VfZ3V0dGVyLWNlbGwsXG4uYWNlX21pbmktZGlmZl9ndXR0ZXJfb3RoZXIgPiAuYWNlX2d1dHRlci1jZWxsX3N2Zy1pY29ucyAge1xuICAgIGRpc3BsYXk6IG5vbmU7XG59XG5cbi5hY2VfbWluaS1kaWZmX2d1dHRlcl9vdGhlciB7XG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG59XG5cblxuLmFjZV9taW5pLWRpZmZfZ3V0dGVyLWVuYWJsZWQgPiAubWluaS1kaWZmLWFkZGVkIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRUZGRkYxO1xuICAgIGJvcmRlci1sZWZ0OiAzcHggc29saWQgIzJCQjUzNDtcbiAgICBwYWRkaW5nLWxlZnQ6IDE2cHg7XG4gICAgZGlzcGxheTogYmxvY2s7XG59XG5cbi5hY2VfbWluaS1kaWZmX2d1dHRlci1lbmFibGVkID4gLm1pbmktZGlmZi1kZWxldGVkIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZGMUYxO1xuICAgIGJvcmRlci1sZWZ0OiAzcHggc29saWQgI0VBNzE1ODtcbiAgICBwYWRkaW5nLWxlZnQ6IDE2cHg7XG4gICAgZGlzcGxheTogYmxvY2s7XG59XG5cblxuLmFjZV9taW5pLWRpZmZfZ3V0dGVyLWVuYWJsZWQgPiAubWluaS1kaWZmLWFkZGVkOmFmdGVyIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgcmlnaHQ6IDJweDtcbiAgICBjb250ZW50OiBcIitcIjtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBpbmhlcml0O1xufVxuXG4uYWNlX21pbmktZGlmZl9ndXR0ZXItZW5hYmxlZCA+IC5taW5pLWRpZmYtZGVsZXRlZDphZnRlciB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHJpZ2h0OiAycHg7XG4gICAgY29udGVudDogXCItXCI7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogaW5oZXJpdDtcbn1cbi5hY2VfZmFkZS1mb2xkLXdpZGdldHM6aG92ZXIgPiAuYWNlX2ZvbGRpbmctZW5hYmxlZCA+IC5taW5pLWRpZmYtYWRkZWQ6YWZ0ZXIsXG4uYWNlX2ZhZGUtZm9sZC13aWRnZXRzOmhvdmVyID4gLmFjZV9mb2xkaW5nLWVuYWJsZWQgPiAubWluaS1kaWZmLWRlbGV0ZWQ6YWZ0ZXIge1xuICAgIGRpc3BsYXk6IG5vbmU7XG59XG5cbi5hY2VfZGlmZl9vdGhlciAuYWNlX3NlbGVjdGlvbiB7XG4gICAgZmlsdGVyOiBkcm9wLXNoYWRvdygxcHggMnB4IDNweCBkYXJrZ3JheSk7XG59XG5cbi5hY2VfaGlkZGVuX21hcmtlci1sYXllciAuYWNlX2JyYWNrZXQsXG4uYWNlX2hpZGRlbl9tYXJrZXItbGF5ZXIgLmFjZV9lcnJvcl9icmFja2V0IHtcbiAgICBkaXNwbGF5OiBub25lO1xufVxuXG5cblxuLypcbiAqIERhcmsgQ29sb3JzIFxuICovXG5cbi5hY2VfZGFyayAuYWNlX2RpZmYuaW5zZXJ0IHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjEyRTI1O1xufVxuLmFjZV9kYXJrIC5hY2VfZGlmZi5kZWxldGUge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICMzRjIyMjI7XG59XG5cbi5hY2VfZGFyayAuYWNlX21pbmktZGlmZl9ndXR0ZXItZW5hYmxlZCA+IC5taW5pLWRpZmYtYWRkZWQge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICMyMTJFMjU7XG4gICAgYm9yZGVyLWxlZnQtY29sb3I6IzAwODAyRjtcbn1cblxuLmFjZV9kYXJrIC5hY2VfbWluaS1kaWZmX2d1dHRlci1lbmFibGVkID4gLm1pbmktZGlmZi1kZWxldGVkIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjM0YyMjIyO1xuICAgIGJvcmRlci1sZWZ0LWNvbG9yOiAjOUMzODM4O1xufVxuXG5gO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9