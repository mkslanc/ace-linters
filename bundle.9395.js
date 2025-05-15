"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[9395],{

/***/ 79395:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var HashHandler = (__webpack_require__(93050).HashHandler);
var Editor = (__webpack_require__(27258).Editor);
var snippetManager = (__webpack_require__(51509)/* .snippetManager */ .N);
var Range = (__webpack_require__(91902)/* .Range */ .Q);
var config = __webpack_require__(76321);
var emmet, emmetPath;

/**
 * Implementation of {@link IEmmetEditor} interface for Ace
 */

class AceEmmetEditor {
    /**
     * @param {Editor} editor
     */
    setupContext(editor) {
        this.ace = editor;
        this.indentation = editor.session.getTabString();
        if (!emmet)
            emmet = window["emmet"];
        var resources = emmet.resources || emmet.require("resources");
        resources.setVariable("indentation", this.indentation);
        this.$syntax = null;
        this.$syntax = this.getSyntax();
    }
    /**
     * Returns character indexes of selected text: object with <code>start</code>
     * and <code>end</code> properties. If there's no selection, should return
     * object with <code>start</code> and <code>end</code> properties referring
     * to current caret position
     * @return {Object}
     * @example
     * var selection = editor.getSelectionRange();
     * alert(selection.start + ', ' + selection.end);
     */
    getSelectionRange() {
        // TODO should start be caret position instead?
        var range = this.ace.getSelectionRange();
        var doc = this.ace.session.doc;
        return {
            start: doc.positionToIndex(range.start),
            end: doc.positionToIndex(range.end)
        };
    }

    /**
     * Creates selection from <code>start</code> to <code>end</code> character
     * indexes. If <code>end</code> is ommited, this method should place caret
     * and <code>start</code> index
     * @param {Number} start
     * @param {Number} [end]
     * @example
     * editor.createSelection(10, 40);
     *
     * //move caret to 15th character
     * editor.createSelection(15);
     */
    createSelection(start, end) {
        var doc = this.ace.session.doc;
        this.ace.selection.setRange({
            start: doc.indexToPosition(start),
            end: doc.indexToPosition(end)
        });
    }

    /**
     * Returns current line's start and end indexes as object with <code>start</code>
     * and <code>end</code> properties
     * @return {Object}
     * @example
     * var range = editor.getCurrentLineRange();
     * alert(range.start + ', ' + range.end);
     */
    getCurrentLineRange() {
        var ace = this.ace;
        var row = ace.getCursorPosition().row;
        var lineLength = ace.session.getLine(row).length;
        var index = ace.session.doc.positionToIndex({row: row, column: 0});
        return {
            start: index,
            end: index + lineLength
        };
    }

    /**
     * Returns current caret position
     * @return {Number|null}
     */
    getCaretPos(){
        var pos = this.ace.getCursorPosition();
        return this.ace.session.doc.positionToIndex(pos);
    }

    /**
     * Set new caret position
     * @param {Number} index Caret position
     */
    setCaretPos(index){
        var pos = this.ace.session.doc.indexToPosition(index);
        this.ace.selection.moveToPosition(pos);
    }

    /**
     * Returns content of current line
     * @return {String}
     */
    getCurrentLine() {
        var row = this.ace.getCursorPosition().row;
        return this.ace.session.getLine(row);
    }

    /**
     * Replace editor's content or it's part (from <code>start</code> to
     * <code>end</code> index). If <code>value</code> contains
     * <code>caret_placeholder</code>, the editor will put caret into
     * this position. If you skip <code>start</code> and <code>end</code>
     * arguments, the whole target's content will be replaced with
     * <code>value</code>.
     *
     * If you pass <code>start</code> argument only,
     * the <code>value</code> will be placed at <code>start</code> string
     * index of current content.
     *
     * If you pass <code>start</code> and <code>end</code> arguments,
     * the corresponding substring of current target's content will be
     * replaced with <code>value</code>.
     * @param {String} value Content you want to paste
     * @param {Number} [start] Start index of editor's content
     * @param {Number} [end] End index of editor's content
     * @param {Boolean} [noIndent] Do not auto indent <code>value</code>
     */
    replaceContent(value, start, end, noIndent) {
        if (end == null)
            end = start == null ? this.getContent().length : start;
        if (start == null)
            start = 0;        
        
        var editor = this.ace;
        var doc = editor.session.doc;
        var range = Range.fromPoints(doc.indexToPosition(start), doc.indexToPosition(end));
        editor.session.remove(range);
        
        range.end = range.start;
        //editor.selection.setRange(range);
        
        value = this.$updateTabstops(value);
        snippetManager.insertSnippet(editor, value);
    }

    /**
     * Returns editor's content
     * @return {String}
     */
    getContent(){
        return this.ace.getValue();
    }

    /**
     * Returns current editor's syntax mode
     * @return {String}
     */
    getSyntax() {
        if (this.$syntax)
            return this.$syntax;
        var syntax = this.ace.session.$modeId.split("/").pop();
        if (syntax == "html" || syntax == "php") {
            var cursor = this.ace.getCursorPosition();
            /**@type {string | string[]} */
            var state = this.ace.session.getState(cursor.row);
            if (typeof state != "string")
                state = state[0];
            if (state) {
                state = state.split("-");
                if (state.length > 1)
                    syntax = state[0];
                else if (syntax == "php")
                    syntax = "html";
            }
        }
        return syntax;
    }

    /**
     * Returns current output profile name (@see emmet#setupProfile)
     * @return {String}
     */
    getProfileName() {
        var resources = emmet.resources || emmet.require("resources");
        switch (this.getSyntax()) {
          case "css": return "css";
          case "xml":
          case "xsl":
            return "xml";
          case "html":
            var profile = resources.getVariable("profile");
            // no forced profile, guess from content html or xhtml?
            if (!profile)
                profile = this.ace.session.getLines(0,2).join("").search(/<!DOCTYPE[^>]+XHTML/i) != -1 ? "xhtml": "html";
            return profile;
          default:
            var mode = this.ace.session.$mode;
            return mode.emmetConfig && mode.emmetConfig.profile || "xhtml";
        }
    }

    /**
     * Ask user to enter something
     * @param {String} title Dialog title
     * @return {String} Entered data
     * @since 0.65
     */
    prompt(title) {
        return prompt(title); // eslint-disable-line no-alert
    }

    /**
     * Returns current selection
     * @return {String}
     * @since 0.65
     */
    getSelection() {
        return this.ace.session.getTextRange();
    }

    /**
     * Returns current editor's file path
     * @return {String}
     * @since 0.65
     */
    getFilePath() {
        return "";
    }
    
    // update tabstops: make sure all caret placeholders are unique
    // by default, abbreviation parser generates all unlinked (un-mirrored)
    // tabstops as ${0}, so we have upgrade all caret tabstops with unique
    // positions but make sure that all other tabstops are not linked accidentally
    // based on https://github.com/sergeche/emmet-sublime/blob/master/editor.js#L119-L171
    /**
     * @param {string} value
     */
    $updateTabstops(value) {
        var base = 1000;
        var zeroBase = 0;
        var lastZero = null;
        var ts = emmet.tabStops || emmet.require('tabStops');
        var resources = emmet.resources || emmet.require("resources");
        var settings = resources.getVocabulary("user");
        var tabstopOptions = {
            tabstop: function(data) {
                var group = parseInt(data.group, 10);
                var isZero = group === 0;
                if (isZero)
                    group = ++zeroBase;
                else
                    group += base;

                var placeholder = data.placeholder;
                if (placeholder) {
                    // recursively update nested tabstops
                    placeholder = ts.processText(placeholder, tabstopOptions);
                }

                var result = '${' + group + (placeholder ? ':' + placeholder : '') + '}';

                if (isZero) {
                    lastZero = [data.start, result];
                }

                return result;
            },
            escape: function(ch) {
                if (ch == '$') return '\\$';
                if (ch == '\\') return '\\\\';
                return ch;
            }
        };

        value = ts.processText(value, tabstopOptions);

        if (settings.variables['insert_final_tabstop'] && !/\$\{0\}$/.test(value)) {
            value += '${0}';
        } else if (lastZero) {
            var common = emmet.utils ? emmet.utils.common : emmet.require('utils');
            value = common.replaceSubstring(value, '${0}', lastZero[0], lastZero[1]);
        }
        
        return value;
    }
}


var keymap = {
    expand_abbreviation: {"mac": "ctrl+alt+e", "win": "alt+e"},
    match_pair_outward: {"mac": "ctrl+d", "win": "ctrl+,"},
    match_pair_inward: {"mac": "ctrl+j", "win": "ctrl+shift+0"},
    matching_pair: {"mac": "ctrl+alt+j", "win": "alt+j"},
    next_edit_point: "alt+right",
    prev_edit_point: "alt+left",
    toggle_comment: {"mac": "command+/", "win": "ctrl+/"},
    split_join_tag: {"mac": "shift+command+'", "win": "shift+ctrl+`"},
    remove_tag: {"mac": "command+'", "win": "shift+ctrl+;"},
    evaluate_math_expression: {"mac": "shift+command+y", "win": "shift+ctrl+y"},
    increment_number_by_1: "ctrl+up",
    decrement_number_by_1: "ctrl+down",
    increment_number_by_01: "alt+up",
    decrement_number_by_01: "alt+down",
    increment_number_by_10: {"mac": "alt+command+up", "win": "shift+alt+up"},
    decrement_number_by_10: {"mac": "alt+command+down", "win": "shift+alt+down"},
    select_next_item: {"mac": "shift+command+.", "win": "shift+ctrl+."},
    select_previous_item: {"mac": "shift+command+,", "win": "shift+ctrl+,"},
    reflect_css_value: {"mac": "shift+command+r", "win": "shift+ctrl+r"},

    encode_decode_data_url: {"mac": "shift+ctrl+d", "win": "ctrl+'"},
    // update_image_size: {"mac": "shift+ctrl+i", "win": "ctrl+u"},
    // expand_as_you_type: "ctrl+alt+enter",
    // wrap_as_you_type: {"mac": "shift+ctrl+g", "win": "shift+ctrl+g"},
    expand_abbreviation_with_tab: "Tab",
    wrap_with_abbreviation: {"mac": "shift+ctrl+a", "win": "shift+ctrl+a"}
};

var editorProxy = new AceEmmetEditor();
exports.commands = new HashHandler();
/**
 * @param {Editor} editor
 * @return {ReturnType<typeof setTimeout> | boolean}
 */
exports.runEmmetCommand = function runEmmetCommand(editor) {
    if (this.action == "expand_abbreviation_with_tab") {
        if (!editor.selection.isEmpty())
            return false;
        var pos = editor.selection.lead;
        var token = editor.session.getTokenAt(pos.row, pos.column);
        if (token && /\btag\b/.test(token.type))
            return false;
    }
    try {
        editorProxy.setupContext(editor);
        var actions = emmet.actions || emmet.require("actions");
        
        if (this.action == "wrap_with_abbreviation") {
            // without setTimeout prompt doesn't work on firefox
            return setTimeout(function() {
                actions.run("wrap_with_abbreviation", editorProxy);
            }, 0);
        }
        
        var result = actions.run(this.action, editorProxy);
    } catch(e) {
        if (!emmet) {
            var loading = exports.load(runEmmetCommand.bind(this, editor));
            if (this.action == "expand_abbreviation_with_tab")
                return false;
            return loading;
        }
        editor._signal("changeStatus", typeof e == "string" ? e : e.message);
        config.warn(e);
        result = false;
    }
    return result;
};

for (var command in keymap) {
    exports.commands.addCommand({
        name: "emmet:" + command,
        action: command,
        bindKey: keymap[command],
        exec: exports.runEmmetCommand,
        multiSelectAction: "forEach"
    });
}

/**
 * @param {Editor} editor
 * @param {boolean} [enabled]
 */
exports.updateCommands = function(editor, enabled) {
    if (enabled) {
        editor.keyBinding.addKeyboardHandler(exports.commands);
    } else {
        editor.keyBinding.removeKeyboardHandler(exports.commands);
    }
};

exports.isSupportedMode = function(mode) {
    if (!mode) return false;
    if (mode.emmetConfig) return true;
    var id = mode.$id || mode;
    return /css|less|scss|sass|stylus|html|php|twig|ejs|handlebars/.test(id);
};

/**
 * @param {Editor} editor
 * @param {string} command
 * @return {boolean}
 */
exports.isAvailable = function(editor, command) {
    if (/(evaluate_math_expression|expand_abbreviation)$/.test(command))
        return true;
    var mode = editor.session.$mode;
    var isSupported = exports.isSupportedMode(mode);
    if (isSupported && mode.$modes) {
        // TODO refactor mode delegates to make this simpler
        try {
            editorProxy.setupContext(editor);
            if (/js|php/.test(editorProxy.getSyntax()))
                isSupported = false;
        } catch(e) {}
    }
    return isSupported;
};

var onChangeMode = function(e, target) {
    var editor = target;
    if (!editor)
        return;
    var enabled = exports.isSupportedMode(editor.session.$mode);
    if (e.enableEmmet === false)
        enabled = false;
    if (enabled)
        exports.load();
    exports.updateCommands(editor, enabled);
};

exports.load = function(cb) {
    if (typeof emmetPath !== "string") {
        config.warn("script for emmet-core is not loaded");
        return false;
    }
    config.loadModule(emmetPath, function() {
        emmetPath = null;
        cb && cb();
    });
    return true;
};

exports.AceEmmetEditor = AceEmmetEditor;
config.defineOptions(Editor.prototype, "editor", {
    enableEmmet: {
        set: function(val) {
            this[val ? "on" : "removeListener"]("changeMode", onChangeMode);
            onChangeMode({enableEmmet: !!val}, this);
        },
        value: true
    }
});

exports.setCore = function(e) {
    if (typeof e == "string")
       emmetPath = e;
    else
       emmet = e;
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ1o7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUEsc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLG1CQUFtQjtBQUM3QyxTQUFTO0FBQ1Q7QUFDQTtBQUNBLENBQUM7O0FBRUQsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9leHQvZW1tZXQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgSGFzaEhhbmRsZXIgPSByZXF1aXJlKFwiLi4va2V5Ym9hcmQvaGFzaF9oYW5kbGVyXCIpLkhhc2hIYW5kbGVyO1xudmFyIEVkaXRvciA9IHJlcXVpcmUoXCIuLi9lZGl0b3JcIikuRWRpdG9yO1xudmFyIHNuaXBwZXRNYW5hZ2VyID0gcmVxdWlyZShcIi4uL3NuaXBwZXRzXCIpLnNuaXBwZXRNYW5hZ2VyO1xudmFyIFJhbmdlID0gcmVxdWlyZShcIi4uL3JhbmdlXCIpLlJhbmdlO1xudmFyIGNvbmZpZyA9IHJlcXVpcmUoXCIuLi9jb25maWdcIik7XG52YXIgZW1tZXQsIGVtbWV0UGF0aDtcblxuLyoqXG4gKiBJbXBsZW1lbnRhdGlvbiBvZiB7QGxpbmsgSUVtbWV0RWRpdG9yfSBpbnRlcmZhY2UgZm9yIEFjZVxuICovXG5cbmNsYXNzIEFjZUVtbWV0RWRpdG9yIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0VkaXRvcn0gZWRpdG9yXG4gICAgICovXG4gICAgc2V0dXBDb250ZXh0KGVkaXRvcikge1xuICAgICAgICB0aGlzLmFjZSA9IGVkaXRvcjtcbiAgICAgICAgdGhpcy5pbmRlbnRhdGlvbiA9IGVkaXRvci5zZXNzaW9uLmdldFRhYlN0cmluZygpO1xuICAgICAgICBpZiAoIWVtbWV0KVxuICAgICAgICAgICAgZW1tZXQgPSB3aW5kb3dbXCJlbW1ldFwiXTtcbiAgICAgICAgdmFyIHJlc291cmNlcyA9IGVtbWV0LnJlc291cmNlcyB8fCBlbW1ldC5yZXF1aXJlKFwicmVzb3VyY2VzXCIpO1xuICAgICAgICByZXNvdXJjZXMuc2V0VmFyaWFibGUoXCJpbmRlbnRhdGlvblwiLCB0aGlzLmluZGVudGF0aW9uKTtcbiAgICAgICAgdGhpcy4kc3ludGF4ID0gbnVsbDtcbiAgICAgICAgdGhpcy4kc3ludGF4ID0gdGhpcy5nZXRTeW50YXgoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBjaGFyYWN0ZXIgaW5kZXhlcyBvZiBzZWxlY3RlZCB0ZXh0OiBvYmplY3Qgd2l0aCA8Y29kZT5zdGFydDwvY29kZT5cbiAgICAgKiBhbmQgPGNvZGU+ZW5kPC9jb2RlPiBwcm9wZXJ0aWVzLiBJZiB0aGVyZSdzIG5vIHNlbGVjdGlvbiwgc2hvdWxkIHJldHVyblxuICAgICAqIG9iamVjdCB3aXRoIDxjb2RlPnN0YXJ0PC9jb2RlPiBhbmQgPGNvZGU+ZW5kPC9jb2RlPiBwcm9wZXJ0aWVzIHJlZmVycmluZ1xuICAgICAqIHRvIGN1cnJlbnQgY2FyZXQgcG9zaXRpb25cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgc2VsZWN0aW9uID0gZWRpdG9yLmdldFNlbGVjdGlvblJhbmdlKCk7XG4gICAgICogYWxlcnQoc2VsZWN0aW9uLnN0YXJ0ICsgJywgJyArIHNlbGVjdGlvbi5lbmQpO1xuICAgICAqL1xuICAgIGdldFNlbGVjdGlvblJhbmdlKCkge1xuICAgICAgICAvLyBUT0RPIHNob3VsZCBzdGFydCBiZSBjYXJldCBwb3NpdGlvbiBpbnN0ZWFkP1xuICAgICAgICB2YXIgcmFuZ2UgPSB0aGlzLmFjZS5nZXRTZWxlY3Rpb25SYW5nZSgpO1xuICAgICAgICB2YXIgZG9jID0gdGhpcy5hY2Uuc2Vzc2lvbi5kb2M7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdGFydDogZG9jLnBvc2l0aW9uVG9JbmRleChyYW5nZS5zdGFydCksXG4gICAgICAgICAgICBlbmQ6IGRvYy5wb3NpdGlvblRvSW5kZXgocmFuZ2UuZW5kKVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgc2VsZWN0aW9uIGZyb20gPGNvZGU+c3RhcnQ8L2NvZGU+IHRvIDxjb2RlPmVuZDwvY29kZT4gY2hhcmFjdGVyXG4gICAgICogaW5kZXhlcy4gSWYgPGNvZGU+ZW5kPC9jb2RlPiBpcyBvbW1pdGVkLCB0aGlzIG1ldGhvZCBzaG91bGQgcGxhY2UgY2FyZXRcbiAgICAgKiBhbmQgPGNvZGU+c3RhcnQ8L2NvZGU+IGluZGV4XG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHN0YXJ0XG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFtlbmRdXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBlZGl0b3IuY3JlYXRlU2VsZWN0aW9uKDEwLCA0MCk7XG4gICAgICpcbiAgICAgKiAvL21vdmUgY2FyZXQgdG8gMTV0aCBjaGFyYWN0ZXJcbiAgICAgKiBlZGl0b3IuY3JlYXRlU2VsZWN0aW9uKDE1KTtcbiAgICAgKi9cbiAgICBjcmVhdGVTZWxlY3Rpb24oc3RhcnQsIGVuZCkge1xuICAgICAgICB2YXIgZG9jID0gdGhpcy5hY2Uuc2Vzc2lvbi5kb2M7XG4gICAgICAgIHRoaXMuYWNlLnNlbGVjdGlvbi5zZXRSYW5nZSh7XG4gICAgICAgICAgICBzdGFydDogZG9jLmluZGV4VG9Qb3NpdGlvbihzdGFydCksXG4gICAgICAgICAgICBlbmQ6IGRvYy5pbmRleFRvUG9zaXRpb24oZW5kKVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGN1cnJlbnQgbGluZSdzIHN0YXJ0IGFuZCBlbmQgaW5kZXhlcyBhcyBvYmplY3Qgd2l0aCA8Y29kZT5zdGFydDwvY29kZT5cbiAgICAgKiBhbmQgPGNvZGU+ZW5kPC9jb2RlPiBwcm9wZXJ0aWVzXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqIEBleGFtcGxlXG4gICAgICogdmFyIHJhbmdlID0gZWRpdG9yLmdldEN1cnJlbnRMaW5lUmFuZ2UoKTtcbiAgICAgKiBhbGVydChyYW5nZS5zdGFydCArICcsICcgKyByYW5nZS5lbmQpO1xuICAgICAqL1xuICAgIGdldEN1cnJlbnRMaW5lUmFuZ2UoKSB7XG4gICAgICAgIHZhciBhY2UgPSB0aGlzLmFjZTtcbiAgICAgICAgdmFyIHJvdyA9IGFjZS5nZXRDdXJzb3JQb3NpdGlvbigpLnJvdztcbiAgICAgICAgdmFyIGxpbmVMZW5ndGggPSBhY2Uuc2Vzc2lvbi5nZXRMaW5lKHJvdykubGVuZ3RoO1xuICAgICAgICB2YXIgaW5kZXggPSBhY2Uuc2Vzc2lvbi5kb2MucG9zaXRpb25Ub0luZGV4KHtyb3c6IHJvdywgY29sdW1uOiAwfSk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdGFydDogaW5kZXgsXG4gICAgICAgICAgICBlbmQ6IGluZGV4ICsgbGluZUxlbmd0aFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgY3VycmVudCBjYXJldCBwb3NpdGlvblxuICAgICAqIEByZXR1cm4ge051bWJlcnxudWxsfVxuICAgICAqL1xuICAgIGdldENhcmV0UG9zKCl7XG4gICAgICAgIHZhciBwb3MgPSB0aGlzLmFjZS5nZXRDdXJzb3JQb3NpdGlvbigpO1xuICAgICAgICByZXR1cm4gdGhpcy5hY2Uuc2Vzc2lvbi5kb2MucG9zaXRpb25Ub0luZGV4KHBvcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IG5ldyBjYXJldCBwb3NpdGlvblxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleCBDYXJldCBwb3NpdGlvblxuICAgICAqL1xuICAgIHNldENhcmV0UG9zKGluZGV4KXtcbiAgICAgICAgdmFyIHBvcyA9IHRoaXMuYWNlLnNlc3Npb24uZG9jLmluZGV4VG9Qb3NpdGlvbihpbmRleCk7XG4gICAgICAgIHRoaXMuYWNlLnNlbGVjdGlvbi5tb3ZlVG9Qb3NpdGlvbihwb3MpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgY29udGVudCBvZiBjdXJyZW50IGxpbmVcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAgICovXG4gICAgZ2V0Q3VycmVudExpbmUoKSB7XG4gICAgICAgIHZhciByb3cgPSB0aGlzLmFjZS5nZXRDdXJzb3JQb3NpdGlvbigpLnJvdztcbiAgICAgICAgcmV0dXJuIHRoaXMuYWNlLnNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlcGxhY2UgZWRpdG9yJ3MgY29udGVudCBvciBpdCdzIHBhcnQgKGZyb20gPGNvZGU+c3RhcnQ8L2NvZGU+IHRvXG4gICAgICogPGNvZGU+ZW5kPC9jb2RlPiBpbmRleCkuIElmIDxjb2RlPnZhbHVlPC9jb2RlPiBjb250YWluc1xuICAgICAqIDxjb2RlPmNhcmV0X3BsYWNlaG9sZGVyPC9jb2RlPiwgdGhlIGVkaXRvciB3aWxsIHB1dCBjYXJldCBpbnRvXG4gICAgICogdGhpcyBwb3NpdGlvbi4gSWYgeW91IHNraXAgPGNvZGU+c3RhcnQ8L2NvZGU+IGFuZCA8Y29kZT5lbmQ8L2NvZGU+XG4gICAgICogYXJndW1lbnRzLCB0aGUgd2hvbGUgdGFyZ2V0J3MgY29udGVudCB3aWxsIGJlIHJlcGxhY2VkIHdpdGhcbiAgICAgKiA8Y29kZT52YWx1ZTwvY29kZT4uXG4gICAgICpcbiAgICAgKiBJZiB5b3UgcGFzcyA8Y29kZT5zdGFydDwvY29kZT4gYXJndW1lbnQgb25seSxcbiAgICAgKiB0aGUgPGNvZGU+dmFsdWU8L2NvZGU+IHdpbGwgYmUgcGxhY2VkIGF0IDxjb2RlPnN0YXJ0PC9jb2RlPiBzdHJpbmdcbiAgICAgKiBpbmRleCBvZiBjdXJyZW50IGNvbnRlbnQuXG4gICAgICpcbiAgICAgKiBJZiB5b3UgcGFzcyA8Y29kZT5zdGFydDwvY29kZT4gYW5kIDxjb2RlPmVuZDwvY29kZT4gYXJndW1lbnRzLFxuICAgICAqIHRoZSBjb3JyZXNwb25kaW5nIHN1YnN0cmluZyBvZiBjdXJyZW50IHRhcmdldCdzIGNvbnRlbnQgd2lsbCBiZVxuICAgICAqIHJlcGxhY2VkIHdpdGggPGNvZGU+dmFsdWU8L2NvZGU+LlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZSBDb250ZW50IHlvdSB3YW50IHRvIHBhc3RlXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFtzdGFydF0gU3RhcnQgaW5kZXggb2YgZWRpdG9yJ3MgY29udGVudFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbZW5kXSBFbmQgaW5kZXggb2YgZWRpdG9yJ3MgY29udGVudFxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gW25vSW5kZW50XSBEbyBub3QgYXV0byBpbmRlbnQgPGNvZGU+dmFsdWU8L2NvZGU+XG4gICAgICovXG4gICAgcmVwbGFjZUNvbnRlbnQodmFsdWUsIHN0YXJ0LCBlbmQsIG5vSW5kZW50KSB7XG4gICAgICAgIGlmIChlbmQgPT0gbnVsbClcbiAgICAgICAgICAgIGVuZCA9IHN0YXJ0ID09IG51bGwgPyB0aGlzLmdldENvbnRlbnQoKS5sZW5ndGggOiBzdGFydDtcbiAgICAgICAgaWYgKHN0YXJ0ID09IG51bGwpXG4gICAgICAgICAgICBzdGFydCA9IDA7ICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIHZhciBlZGl0b3IgPSB0aGlzLmFjZTtcbiAgICAgICAgdmFyIGRvYyA9IGVkaXRvci5zZXNzaW9uLmRvYztcbiAgICAgICAgdmFyIHJhbmdlID0gUmFuZ2UuZnJvbVBvaW50cyhkb2MuaW5kZXhUb1Bvc2l0aW9uKHN0YXJ0KSwgZG9jLmluZGV4VG9Qb3NpdGlvbihlbmQpKTtcbiAgICAgICAgZWRpdG9yLnNlc3Npb24ucmVtb3ZlKHJhbmdlKTtcbiAgICAgICAgXG4gICAgICAgIHJhbmdlLmVuZCA9IHJhbmdlLnN0YXJ0O1xuICAgICAgICAvL2VkaXRvci5zZWxlY3Rpb24uc2V0UmFuZ2UocmFuZ2UpO1xuICAgICAgICBcbiAgICAgICAgdmFsdWUgPSB0aGlzLiR1cGRhdGVUYWJzdG9wcyh2YWx1ZSk7XG4gICAgICAgIHNuaXBwZXRNYW5hZ2VyLmluc2VydFNuaXBwZXQoZWRpdG9yLCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBlZGl0b3IncyBjb250ZW50XG4gICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAqL1xuICAgIGdldENvbnRlbnQoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWNlLmdldFZhbHVlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBjdXJyZW50IGVkaXRvcidzIHN5bnRheCBtb2RlXG4gICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAqL1xuICAgIGdldFN5bnRheCgpIHtcbiAgICAgICAgaWYgKHRoaXMuJHN5bnRheClcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRzeW50YXg7XG4gICAgICAgIHZhciBzeW50YXggPSB0aGlzLmFjZS5zZXNzaW9uLiRtb2RlSWQuc3BsaXQoXCIvXCIpLnBvcCgpO1xuICAgICAgICBpZiAoc3ludGF4ID09IFwiaHRtbFwiIHx8IHN5bnRheCA9PSBcInBocFwiKSB7XG4gICAgICAgICAgICB2YXIgY3Vyc29yID0gdGhpcy5hY2UuZ2V0Q3Vyc29yUG9zaXRpb24oKTtcbiAgICAgICAgICAgIC8qKkB0eXBlIHtzdHJpbmcgfCBzdHJpbmdbXX0gKi9cbiAgICAgICAgICAgIHZhciBzdGF0ZSA9IHRoaXMuYWNlLnNlc3Npb24uZ2V0U3RhdGUoY3Vyc29yLnJvdyk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHN0YXRlICE9IFwic3RyaW5nXCIpXG4gICAgICAgICAgICAgICAgc3RhdGUgPSBzdGF0ZVswXTtcbiAgICAgICAgICAgIGlmIChzdGF0ZSkge1xuICAgICAgICAgICAgICAgIHN0YXRlID0gc3RhdGUuc3BsaXQoXCItXCIpO1xuICAgICAgICAgICAgICAgIGlmIChzdGF0ZS5sZW5ndGggPiAxKVxuICAgICAgICAgICAgICAgICAgICBzeW50YXggPSBzdGF0ZVswXTtcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChzeW50YXggPT0gXCJwaHBcIilcbiAgICAgICAgICAgICAgICAgICAgc3ludGF4ID0gXCJodG1sXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN5bnRheDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGN1cnJlbnQgb3V0cHV0IHByb2ZpbGUgbmFtZSAoQHNlZSBlbW1ldCNzZXR1cFByb2ZpbGUpXG4gICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAqL1xuICAgIGdldFByb2ZpbGVOYW1lKCkge1xuICAgICAgICB2YXIgcmVzb3VyY2VzID0gZW1tZXQucmVzb3VyY2VzIHx8IGVtbWV0LnJlcXVpcmUoXCJyZXNvdXJjZXNcIik7XG4gICAgICAgIHN3aXRjaCAodGhpcy5nZXRTeW50YXgoKSkge1xuICAgICAgICAgIGNhc2UgXCJjc3NcIjogcmV0dXJuIFwiY3NzXCI7XG4gICAgICAgICAgY2FzZSBcInhtbFwiOlxuICAgICAgICAgIGNhc2UgXCJ4c2xcIjpcbiAgICAgICAgICAgIHJldHVybiBcInhtbFwiO1xuICAgICAgICAgIGNhc2UgXCJodG1sXCI6XG4gICAgICAgICAgICB2YXIgcHJvZmlsZSA9IHJlc291cmNlcy5nZXRWYXJpYWJsZShcInByb2ZpbGVcIik7XG4gICAgICAgICAgICAvLyBubyBmb3JjZWQgcHJvZmlsZSwgZ3Vlc3MgZnJvbSBjb250ZW50IGh0bWwgb3IgeGh0bWw/XG4gICAgICAgICAgICBpZiAoIXByb2ZpbGUpXG4gICAgICAgICAgICAgICAgcHJvZmlsZSA9IHRoaXMuYWNlLnNlc3Npb24uZ2V0TGluZXMoMCwyKS5qb2luKFwiXCIpLnNlYXJjaCgvPCFET0NUWVBFW14+XStYSFRNTC9pKSAhPSAtMSA/IFwieGh0bWxcIjogXCJodG1sXCI7XG4gICAgICAgICAgICByZXR1cm4gcHJvZmlsZTtcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdmFyIG1vZGUgPSB0aGlzLmFjZS5zZXNzaW9uLiRtb2RlO1xuICAgICAgICAgICAgcmV0dXJuIG1vZGUuZW1tZXRDb25maWcgJiYgbW9kZS5lbW1ldENvbmZpZy5wcm9maWxlIHx8IFwieGh0bWxcIjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFzayB1c2VyIHRvIGVudGVyIHNvbWV0aGluZ1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB0aXRsZSBEaWFsb2cgdGl0bGVcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9IEVudGVyZWQgZGF0YVxuICAgICAqIEBzaW5jZSAwLjY1XG4gICAgICovXG4gICAgcHJvbXB0KHRpdGxlKSB7XG4gICAgICAgIHJldHVybiBwcm9tcHQodGl0bGUpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWFsZXJ0XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBjdXJyZW50IHNlbGVjdGlvblxuICAgICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICAgKiBAc2luY2UgMC42NVxuICAgICAqL1xuICAgIGdldFNlbGVjdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWNlLnNlc3Npb24uZ2V0VGV4dFJhbmdlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBjdXJyZW50IGVkaXRvcidzIGZpbGUgcGF0aFxuICAgICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICAgKiBAc2luY2UgMC42NVxuICAgICAqL1xuICAgIGdldEZpbGVQYXRoKCkge1xuICAgICAgICByZXR1cm4gXCJcIjtcbiAgICB9XG4gICAgXG4gICAgLy8gdXBkYXRlIHRhYnN0b3BzOiBtYWtlIHN1cmUgYWxsIGNhcmV0IHBsYWNlaG9sZGVycyBhcmUgdW5pcXVlXG4gICAgLy8gYnkgZGVmYXVsdCwgYWJicmV2aWF0aW9uIHBhcnNlciBnZW5lcmF0ZXMgYWxsIHVubGlua2VkICh1bi1taXJyb3JlZClcbiAgICAvLyB0YWJzdG9wcyBhcyAkezB9LCBzbyB3ZSBoYXZlIHVwZ3JhZGUgYWxsIGNhcmV0IHRhYnN0b3BzIHdpdGggdW5pcXVlXG4gICAgLy8gcG9zaXRpb25zIGJ1dCBtYWtlIHN1cmUgdGhhdCBhbGwgb3RoZXIgdGFic3RvcHMgYXJlIG5vdCBsaW5rZWQgYWNjaWRlbnRhbGx5XG4gICAgLy8gYmFzZWQgb24gaHR0cHM6Ly9naXRodWIuY29tL3NlcmdlY2hlL2VtbWV0LXN1YmxpbWUvYmxvYi9tYXN0ZXIvZWRpdG9yLmpzI0wxMTktTDE3MVxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICAgICAqL1xuICAgICR1cGRhdGVUYWJzdG9wcyh2YWx1ZSkge1xuICAgICAgICB2YXIgYmFzZSA9IDEwMDA7XG4gICAgICAgIHZhciB6ZXJvQmFzZSA9IDA7XG4gICAgICAgIHZhciBsYXN0WmVybyA9IG51bGw7XG4gICAgICAgIHZhciB0cyA9IGVtbWV0LnRhYlN0b3BzIHx8IGVtbWV0LnJlcXVpcmUoJ3RhYlN0b3BzJyk7XG4gICAgICAgIHZhciByZXNvdXJjZXMgPSBlbW1ldC5yZXNvdXJjZXMgfHwgZW1tZXQucmVxdWlyZShcInJlc291cmNlc1wiKTtcbiAgICAgICAgdmFyIHNldHRpbmdzID0gcmVzb3VyY2VzLmdldFZvY2FidWxhcnkoXCJ1c2VyXCIpO1xuICAgICAgICB2YXIgdGFic3RvcE9wdGlvbnMgPSB7XG4gICAgICAgICAgICB0YWJzdG9wOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgdmFyIGdyb3VwID0gcGFyc2VJbnQoZGF0YS5ncm91cCwgMTApO1xuICAgICAgICAgICAgICAgIHZhciBpc1plcm8gPSBncm91cCA9PT0gMDtcbiAgICAgICAgICAgICAgICBpZiAoaXNaZXJvKVxuICAgICAgICAgICAgICAgICAgICBncm91cCA9ICsremVyb0Jhc2U7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBncm91cCArPSBiYXNlO1xuXG4gICAgICAgICAgICAgICAgdmFyIHBsYWNlaG9sZGVyID0gZGF0YS5wbGFjZWhvbGRlcjtcbiAgICAgICAgICAgICAgICBpZiAocGxhY2Vob2xkZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gcmVjdXJzaXZlbHkgdXBkYXRlIG5lc3RlZCB0YWJzdG9wc1xuICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlciA9IHRzLnByb2Nlc3NUZXh0KHBsYWNlaG9sZGVyLCB0YWJzdG9wT3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9ICckeycgKyBncm91cCArIChwbGFjZWhvbGRlciA/ICc6JyArIHBsYWNlaG9sZGVyIDogJycpICsgJ30nO1xuXG4gICAgICAgICAgICAgICAgaWYgKGlzWmVybykge1xuICAgICAgICAgICAgICAgICAgICBsYXN0WmVybyA9IFtkYXRhLnN0YXJ0LCByZXN1bHRdO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXNjYXBlOiBmdW5jdGlvbihjaCkge1xuICAgICAgICAgICAgICAgIGlmIChjaCA9PSAnJCcpIHJldHVybiAnXFxcXCQnO1xuICAgICAgICAgICAgICAgIGlmIChjaCA9PSAnXFxcXCcpIHJldHVybiAnXFxcXFxcXFwnO1xuICAgICAgICAgICAgICAgIHJldHVybiBjaDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB2YWx1ZSA9IHRzLnByb2Nlc3NUZXh0KHZhbHVlLCB0YWJzdG9wT3B0aW9ucyk7XG5cbiAgICAgICAgaWYgKHNldHRpbmdzLnZhcmlhYmxlc1snaW5zZXJ0X2ZpbmFsX3RhYnN0b3AnXSAmJiAhL1xcJFxcezBcXH0kLy50ZXN0KHZhbHVlKSkge1xuICAgICAgICAgICAgdmFsdWUgKz0gJyR7MH0nO1xuICAgICAgICB9IGVsc2UgaWYgKGxhc3RaZXJvKSB7XG4gICAgICAgICAgICB2YXIgY29tbW9uID0gZW1tZXQudXRpbHMgPyBlbW1ldC51dGlscy5jb21tb24gOiBlbW1ldC5yZXF1aXJlKCd1dGlscycpO1xuICAgICAgICAgICAgdmFsdWUgPSBjb21tb24ucmVwbGFjZVN1YnN0cmluZyh2YWx1ZSwgJyR7MH0nLCBsYXN0WmVyb1swXSwgbGFzdFplcm9bMV0pO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxufVxuXG5cbnZhciBrZXltYXAgPSB7XG4gICAgZXhwYW5kX2FiYnJldmlhdGlvbjoge1wibWFjXCI6IFwiY3RybCthbHQrZVwiLCBcIndpblwiOiBcImFsdCtlXCJ9LFxuICAgIG1hdGNoX3BhaXJfb3V0d2FyZDoge1wibWFjXCI6IFwiY3RybCtkXCIsIFwid2luXCI6IFwiY3RybCssXCJ9LFxuICAgIG1hdGNoX3BhaXJfaW53YXJkOiB7XCJtYWNcIjogXCJjdHJsK2pcIiwgXCJ3aW5cIjogXCJjdHJsK3NoaWZ0KzBcIn0sXG4gICAgbWF0Y2hpbmdfcGFpcjoge1wibWFjXCI6IFwiY3RybCthbHQralwiLCBcIndpblwiOiBcImFsdCtqXCJ9LFxuICAgIG5leHRfZWRpdF9wb2ludDogXCJhbHQrcmlnaHRcIixcbiAgICBwcmV2X2VkaXRfcG9pbnQ6IFwiYWx0K2xlZnRcIixcbiAgICB0b2dnbGVfY29tbWVudDoge1wibWFjXCI6IFwiY29tbWFuZCsvXCIsIFwid2luXCI6IFwiY3RybCsvXCJ9LFxuICAgIHNwbGl0X2pvaW5fdGFnOiB7XCJtYWNcIjogXCJzaGlmdCtjb21tYW5kKydcIiwgXCJ3aW5cIjogXCJzaGlmdCtjdHJsK2BcIn0sXG4gICAgcmVtb3ZlX3RhZzoge1wibWFjXCI6IFwiY29tbWFuZCsnXCIsIFwid2luXCI6IFwic2hpZnQrY3RybCs7XCJ9LFxuICAgIGV2YWx1YXRlX21hdGhfZXhwcmVzc2lvbjoge1wibWFjXCI6IFwic2hpZnQrY29tbWFuZCt5XCIsIFwid2luXCI6IFwic2hpZnQrY3RybCt5XCJ9LFxuICAgIGluY3JlbWVudF9udW1iZXJfYnlfMTogXCJjdHJsK3VwXCIsXG4gICAgZGVjcmVtZW50X251bWJlcl9ieV8xOiBcImN0cmwrZG93blwiLFxuICAgIGluY3JlbWVudF9udW1iZXJfYnlfMDE6IFwiYWx0K3VwXCIsXG4gICAgZGVjcmVtZW50X251bWJlcl9ieV8wMTogXCJhbHQrZG93blwiLFxuICAgIGluY3JlbWVudF9udW1iZXJfYnlfMTA6IHtcIm1hY1wiOiBcImFsdCtjb21tYW5kK3VwXCIsIFwid2luXCI6IFwic2hpZnQrYWx0K3VwXCJ9LFxuICAgIGRlY3JlbWVudF9udW1iZXJfYnlfMTA6IHtcIm1hY1wiOiBcImFsdCtjb21tYW5kK2Rvd25cIiwgXCJ3aW5cIjogXCJzaGlmdCthbHQrZG93blwifSxcbiAgICBzZWxlY3RfbmV4dF9pdGVtOiB7XCJtYWNcIjogXCJzaGlmdCtjb21tYW5kKy5cIiwgXCJ3aW5cIjogXCJzaGlmdCtjdHJsKy5cIn0sXG4gICAgc2VsZWN0X3ByZXZpb3VzX2l0ZW06IHtcIm1hY1wiOiBcInNoaWZ0K2NvbW1hbmQrLFwiLCBcIndpblwiOiBcInNoaWZ0K2N0cmwrLFwifSxcbiAgICByZWZsZWN0X2Nzc192YWx1ZToge1wibWFjXCI6IFwic2hpZnQrY29tbWFuZCtyXCIsIFwid2luXCI6IFwic2hpZnQrY3RybCtyXCJ9LFxuXG4gICAgZW5jb2RlX2RlY29kZV9kYXRhX3VybDoge1wibWFjXCI6IFwic2hpZnQrY3RybCtkXCIsIFwid2luXCI6IFwiY3RybCsnXCJ9LFxuICAgIC8vIHVwZGF0ZV9pbWFnZV9zaXplOiB7XCJtYWNcIjogXCJzaGlmdCtjdHJsK2lcIiwgXCJ3aW5cIjogXCJjdHJsK3VcIn0sXG4gICAgLy8gZXhwYW5kX2FzX3lvdV90eXBlOiBcImN0cmwrYWx0K2VudGVyXCIsXG4gICAgLy8gd3JhcF9hc195b3VfdHlwZToge1wibWFjXCI6IFwic2hpZnQrY3RybCtnXCIsIFwid2luXCI6IFwic2hpZnQrY3RybCtnXCJ9LFxuICAgIGV4cGFuZF9hYmJyZXZpYXRpb25fd2l0aF90YWI6IFwiVGFiXCIsXG4gICAgd3JhcF93aXRoX2FiYnJldmlhdGlvbjoge1wibWFjXCI6IFwic2hpZnQrY3RybCthXCIsIFwid2luXCI6IFwic2hpZnQrY3RybCthXCJ9XG59O1xuXG52YXIgZWRpdG9yUHJveHkgPSBuZXcgQWNlRW1tZXRFZGl0b3IoKTtcbmV4cG9ydHMuY29tbWFuZHMgPSBuZXcgSGFzaEhhbmRsZXIoKTtcbi8qKlxuICogQHBhcmFtIHtFZGl0b3J9IGVkaXRvclxuICogQHJldHVybiB7UmV0dXJuVHlwZTx0eXBlb2Ygc2V0VGltZW91dD4gfCBib29sZWFufVxuICovXG5leHBvcnRzLnJ1bkVtbWV0Q29tbWFuZCA9IGZ1bmN0aW9uIHJ1bkVtbWV0Q29tbWFuZChlZGl0b3IpIHtcbiAgICBpZiAodGhpcy5hY3Rpb24gPT0gXCJleHBhbmRfYWJicmV2aWF0aW9uX3dpdGhfdGFiXCIpIHtcbiAgICAgICAgaWYgKCFlZGl0b3Iuc2VsZWN0aW9uLmlzRW1wdHkoKSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgdmFyIHBvcyA9IGVkaXRvci5zZWxlY3Rpb24ubGVhZDtcbiAgICAgICAgdmFyIHRva2VuID0gZWRpdG9yLnNlc3Npb24uZ2V0VG9rZW5BdChwb3Mucm93LCBwb3MuY29sdW1uKTtcbiAgICAgICAgaWYgKHRva2VuICYmIC9cXGJ0YWdcXGIvLnRlc3QodG9rZW4udHlwZSkpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGVkaXRvclByb3h5LnNldHVwQ29udGV4dChlZGl0b3IpO1xuICAgICAgICB2YXIgYWN0aW9ucyA9IGVtbWV0LmFjdGlvbnMgfHwgZW1tZXQucmVxdWlyZShcImFjdGlvbnNcIik7XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5hY3Rpb24gPT0gXCJ3cmFwX3dpdGhfYWJicmV2aWF0aW9uXCIpIHtcbiAgICAgICAgICAgIC8vIHdpdGhvdXQgc2V0VGltZW91dCBwcm9tcHQgZG9lc24ndCB3b3JrIG9uIGZpcmVmb3hcbiAgICAgICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGFjdGlvbnMucnVuKFwid3JhcF93aXRoX2FiYnJldmlhdGlvblwiLCBlZGl0b3JQcm94eSk7XG4gICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdmFyIHJlc3VsdCA9IGFjdGlvbnMucnVuKHRoaXMuYWN0aW9uLCBlZGl0b3JQcm94eSk7XG4gICAgfSBjYXRjaChlKSB7XG4gICAgICAgIGlmICghZW1tZXQpIHtcbiAgICAgICAgICAgIHZhciBsb2FkaW5nID0gZXhwb3J0cy5sb2FkKHJ1bkVtbWV0Q29tbWFuZC5iaW5kKHRoaXMsIGVkaXRvcikpO1xuICAgICAgICAgICAgaWYgKHRoaXMuYWN0aW9uID09IFwiZXhwYW5kX2FiYnJldmlhdGlvbl93aXRoX3RhYlwiKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiBsb2FkaW5nO1xuICAgICAgICB9XG4gICAgICAgIGVkaXRvci5fc2lnbmFsKFwiY2hhbmdlU3RhdHVzXCIsIHR5cGVvZiBlID09IFwic3RyaW5nXCIgPyBlIDogZS5tZXNzYWdlKTtcbiAgICAgICAgY29uZmlnLndhcm4oZSk7XG4gICAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufTtcblxuZm9yICh2YXIgY29tbWFuZCBpbiBrZXltYXApIHtcbiAgICBleHBvcnRzLmNvbW1hbmRzLmFkZENvbW1hbmQoe1xuICAgICAgICBuYW1lOiBcImVtbWV0OlwiICsgY29tbWFuZCxcbiAgICAgICAgYWN0aW9uOiBjb21tYW5kLFxuICAgICAgICBiaW5kS2V5OiBrZXltYXBbY29tbWFuZF0sXG4gICAgICAgIGV4ZWM6IGV4cG9ydHMucnVuRW1tZXRDb21tYW5kLFxuICAgICAgICBtdWx0aVNlbGVjdEFjdGlvbjogXCJmb3JFYWNoXCJcbiAgICB9KTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0VkaXRvcn0gZWRpdG9yXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtlbmFibGVkXVxuICovXG5leHBvcnRzLnVwZGF0ZUNvbW1hbmRzID0gZnVuY3Rpb24oZWRpdG9yLCBlbmFibGVkKSB7XG4gICAgaWYgKGVuYWJsZWQpIHtcbiAgICAgICAgZWRpdG9yLmtleUJpbmRpbmcuYWRkS2V5Ym9hcmRIYW5kbGVyKGV4cG9ydHMuY29tbWFuZHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGVkaXRvci5rZXlCaW5kaW5nLnJlbW92ZUtleWJvYXJkSGFuZGxlcihleHBvcnRzLmNvbW1hbmRzKTtcbiAgICB9XG59O1xuXG5leHBvcnRzLmlzU3VwcG9ydGVkTW9kZSA9IGZ1bmN0aW9uKG1vZGUpIHtcbiAgICBpZiAoIW1vZGUpIHJldHVybiBmYWxzZTtcbiAgICBpZiAobW9kZS5lbW1ldENvbmZpZykgcmV0dXJuIHRydWU7XG4gICAgdmFyIGlkID0gbW9kZS4kaWQgfHwgbW9kZTtcbiAgICByZXR1cm4gL2Nzc3xsZXNzfHNjc3N8c2Fzc3xzdHlsdXN8aHRtbHxwaHB8dHdpZ3xlanN8aGFuZGxlYmFycy8udGVzdChpZCk7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7RWRpdG9yfSBlZGl0b3JcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb21tYW5kXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5leHBvcnRzLmlzQXZhaWxhYmxlID0gZnVuY3Rpb24oZWRpdG9yLCBjb21tYW5kKSB7XG4gICAgaWYgKC8oZXZhbHVhdGVfbWF0aF9leHByZXNzaW9ufGV4cGFuZF9hYmJyZXZpYXRpb24pJC8udGVzdChjb21tYW5kKSlcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgdmFyIG1vZGUgPSBlZGl0b3Iuc2Vzc2lvbi4kbW9kZTtcbiAgICB2YXIgaXNTdXBwb3J0ZWQgPSBleHBvcnRzLmlzU3VwcG9ydGVkTW9kZShtb2RlKTtcbiAgICBpZiAoaXNTdXBwb3J0ZWQgJiYgbW9kZS4kbW9kZXMpIHtcbiAgICAgICAgLy8gVE9ETyByZWZhY3RvciBtb2RlIGRlbGVnYXRlcyB0byBtYWtlIHRoaXMgc2ltcGxlclxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZWRpdG9yUHJveHkuc2V0dXBDb250ZXh0KGVkaXRvcik7XG4gICAgICAgICAgICBpZiAoL2pzfHBocC8udGVzdChlZGl0b3JQcm94eS5nZXRTeW50YXgoKSkpXG4gICAgICAgICAgICAgICAgaXNTdXBwb3J0ZWQgPSBmYWxzZTtcbiAgICAgICAgfSBjYXRjaChlKSB7fVxuICAgIH1cbiAgICByZXR1cm4gaXNTdXBwb3J0ZWQ7XG59O1xuXG52YXIgb25DaGFuZ2VNb2RlID0gZnVuY3Rpb24oZSwgdGFyZ2V0KSB7XG4gICAgdmFyIGVkaXRvciA9IHRhcmdldDtcbiAgICBpZiAoIWVkaXRvcilcbiAgICAgICAgcmV0dXJuO1xuICAgIHZhciBlbmFibGVkID0gZXhwb3J0cy5pc1N1cHBvcnRlZE1vZGUoZWRpdG9yLnNlc3Npb24uJG1vZGUpO1xuICAgIGlmIChlLmVuYWJsZUVtbWV0ID09PSBmYWxzZSlcbiAgICAgICAgZW5hYmxlZCA9IGZhbHNlO1xuICAgIGlmIChlbmFibGVkKVxuICAgICAgICBleHBvcnRzLmxvYWQoKTtcbiAgICBleHBvcnRzLnVwZGF0ZUNvbW1hbmRzKGVkaXRvciwgZW5hYmxlZCk7XG59O1xuXG5leHBvcnRzLmxvYWQgPSBmdW5jdGlvbihjYikge1xuICAgIGlmICh0eXBlb2YgZW1tZXRQYXRoICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGNvbmZpZy53YXJuKFwic2NyaXB0IGZvciBlbW1ldC1jb3JlIGlzIG5vdCBsb2FkZWRcIik7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uZmlnLmxvYWRNb2R1bGUoZW1tZXRQYXRoLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZW1tZXRQYXRoID0gbnVsbDtcbiAgICAgICAgY2IgJiYgY2IoKTtcbiAgICB9KTtcbiAgICByZXR1cm4gdHJ1ZTtcbn07XG5cbmV4cG9ydHMuQWNlRW1tZXRFZGl0b3IgPSBBY2VFbW1ldEVkaXRvcjtcbmNvbmZpZy5kZWZpbmVPcHRpb25zKEVkaXRvci5wcm90b3R5cGUsIFwiZWRpdG9yXCIsIHtcbiAgICBlbmFibGVFbW1ldDoge1xuICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAgICAgdGhpc1t2YWwgPyBcIm9uXCIgOiBcInJlbW92ZUxpc3RlbmVyXCJdKFwiY2hhbmdlTW9kZVwiLCBvbkNoYW5nZU1vZGUpO1xuICAgICAgICAgICAgb25DaGFuZ2VNb2RlKHtlbmFibGVFbW1ldDogISF2YWx9LCB0aGlzKTtcbiAgICAgICAgfSxcbiAgICAgICAgdmFsdWU6IHRydWVcbiAgICB9XG59KTtcblxuZXhwb3J0cy5zZXRDb3JlID0gZnVuY3Rpb24oZSkge1xuICAgIGlmICh0eXBlb2YgZSA9PSBcInN0cmluZ1wiKVxuICAgICAgIGVtbWV0UGF0aCA9IGU7XG4gICAgZWxzZVxuICAgICAgIGVtbWV0ID0gZTtcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=