"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[9395],{

/***/ 79395:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/**
 * ## Emmet extension
 *
 * Providing HTML/CSS abbreviation expansion, code navigation, and text editing utilities with configurable options and
 * keyboard shortcuts for rapid web development workflow.
 *
 * **Enable:** `editor.setOption("enableEmmet", true)`
 * or configure it during editor initialization in the options object.
 * @module
 */

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
 * Runs an Emmet command on the given editor.
 *
 * @param {Editor} editor - The Ace editor instance to run the Emmet command on
 * @return {ReturnType<typeof setTimeout> | boolean} The result of the Emmet command execution
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
 * Updates the keyboard handler for Emmet commands in the editor.
 *
 * @param {Editor} editor - The Ace editor instance
 * @param {boolean} [enabled] - Whether Emmet commands should be enabled
 */
exports.updateCommands = function(editor, enabled) {
    if (enabled) {
        editor.keyBinding.addKeyboardHandler(exports.commands);
    } else {
        editor.keyBinding.removeKeyboardHandler(exports.commands);
    }
};

/**
 * Determines if a given editor mode is supported by Emmet.
 *
 * @param {Object|string} mode - The editor mode to check for Emmet support
 * @returns {boolean} Whether the mode is supported by Emmet
 */
exports.isSupportedMode = function(mode) {
    if (!mode) return false;
    if (mode.emmetConfig) return true;
    var id = mode.$id || mode;
    return /css|less|scss|sass|stylus|html|php|twig|ejs|handlebars/.test(id);
};

/**
 * Checks if an Emmet command is available for the current editor context.
 *
 * @param {Editor} editor - The current Ace editor instance
 * @param {string} command - The Emmet command to check availability for
 * @return {boolean} Whether the command is available in the current editor mode
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

/**
 * Loads the Emmet core module dynamically.
 *
 * @param {Function} [cb] - Optional callback function to be executed after module loading
 * @return {boolean} Whether the Emmet core module loading was initiated successfully
 */
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

/**
 * Sets the Emmet core module or path.
 *
 * @param {string|Object} e - Either the path to the Emmet core script or the Emmet core module itself
 * If a string is provided, it sets the path to load the Emmet core script.
 * If an object is provided, it directly sets the Emmet core module.
 */
exports.setCore = function(e) {
    if (typeof e == "string")
       emmetPath = e;
    else
       emmet = e;
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQSxXQUFXLGVBQWU7QUFDMUIsYUFBYSxTQUFTO0FBQ3RCO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixZQUFZLFNBQVM7QUFDckI7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxVQUFVO0FBQ3JCLFlBQVksU0FBUztBQUNyQjtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixtQkFBbUI7QUFDN0MsU0FBUztBQUNUO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLFdBQVcsZUFBZTtBQUMxQjtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL2V4dC9lbW1ldC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqICMjIEVtbWV0IGV4dGVuc2lvblxuICpcbiAqIFByb3ZpZGluZyBIVE1ML0NTUyBhYmJyZXZpYXRpb24gZXhwYW5zaW9uLCBjb2RlIG5hdmlnYXRpb24sIGFuZCB0ZXh0IGVkaXRpbmcgdXRpbGl0aWVzIHdpdGggY29uZmlndXJhYmxlIG9wdGlvbnMgYW5kXG4gKiBrZXlib2FyZCBzaG9ydGN1dHMgZm9yIHJhcGlkIHdlYiBkZXZlbG9wbWVudCB3b3JrZmxvdy5cbiAqXG4gKiAqKkVuYWJsZToqKiBgZWRpdG9yLnNldE9wdGlvbihcImVuYWJsZUVtbWV0XCIsIHRydWUpYFxuICogb3IgY29uZmlndXJlIGl0IGR1cmluZyBlZGl0b3IgaW5pdGlhbGl6YXRpb24gaW4gdGhlIG9wdGlvbnMgb2JqZWN0LlxuICogQG1vZHVsZVxuICovXG5cInVzZSBzdHJpY3RcIjtcbnZhciBIYXNoSGFuZGxlciA9IHJlcXVpcmUoXCIuLi9rZXlib2FyZC9oYXNoX2hhbmRsZXJcIikuSGFzaEhhbmRsZXI7XG52YXIgRWRpdG9yID0gcmVxdWlyZShcIi4uL2VkaXRvclwiKS5FZGl0b3I7XG52YXIgc25pcHBldE1hbmFnZXIgPSByZXF1aXJlKFwiLi4vc25pcHBldHNcIikuc25pcHBldE1hbmFnZXI7XG52YXIgUmFuZ2UgPSByZXF1aXJlKFwiLi4vcmFuZ2VcIikuUmFuZ2U7XG52YXIgY29uZmlnID0gcmVxdWlyZShcIi4uL2NvbmZpZ1wiKTtcbnZhciBlbW1ldCwgZW1tZXRQYXRoO1xuXG4vKipcbiAqIEltcGxlbWVudGF0aW9uIG9mIHtAbGluayBJRW1tZXRFZGl0b3J9IGludGVyZmFjZSBmb3IgQWNlXG4gKi9cblxuY2xhc3MgQWNlRW1tZXRFZGl0b3Ige1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7RWRpdG9yfSBlZGl0b3JcbiAgICAgKi9cbiAgICBzZXR1cENvbnRleHQoZWRpdG9yKSB7XG4gICAgICAgIHRoaXMuYWNlID0gZWRpdG9yO1xuICAgICAgICB0aGlzLmluZGVudGF0aW9uID0gZWRpdG9yLnNlc3Npb24uZ2V0VGFiU3RyaW5nKCk7XG4gICAgICAgIGlmICghZW1tZXQpXG4gICAgICAgICAgICBlbW1ldCA9IHdpbmRvd1tcImVtbWV0XCJdO1xuICAgICAgICB2YXIgcmVzb3VyY2VzID0gZW1tZXQucmVzb3VyY2VzIHx8IGVtbWV0LnJlcXVpcmUoXCJyZXNvdXJjZXNcIik7XG4gICAgICAgIHJlc291cmNlcy5zZXRWYXJpYWJsZShcImluZGVudGF0aW9uXCIsIHRoaXMuaW5kZW50YXRpb24pO1xuICAgICAgICB0aGlzLiRzeW50YXggPSBudWxsO1xuICAgICAgICB0aGlzLiRzeW50YXggPSB0aGlzLmdldFN5bnRheCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGNoYXJhY3RlciBpbmRleGVzIG9mIHNlbGVjdGVkIHRleHQ6IG9iamVjdCB3aXRoIDxjb2RlPnN0YXJ0PC9jb2RlPlxuICAgICAqIGFuZCA8Y29kZT5lbmQ8L2NvZGU+IHByb3BlcnRpZXMuIElmIHRoZXJlJ3Mgbm8gc2VsZWN0aW9uLCBzaG91bGQgcmV0dXJuXG4gICAgICogb2JqZWN0IHdpdGggPGNvZGU+c3RhcnQ8L2NvZGU+IGFuZCA8Y29kZT5lbmQ8L2NvZGU+IHByb3BlcnRpZXMgcmVmZXJyaW5nXG4gICAgICogdG8gY3VycmVudCBjYXJldCBwb3NpdGlvblxuICAgICAqIEByZXR1cm4ge09iamVjdH1cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBzZWxlY3Rpb24gPSBlZGl0b3IuZ2V0U2VsZWN0aW9uUmFuZ2UoKTtcbiAgICAgKiBhbGVydChzZWxlY3Rpb24uc3RhcnQgKyAnLCAnICsgc2VsZWN0aW9uLmVuZCk7XG4gICAgICovXG4gICAgZ2V0U2VsZWN0aW9uUmFuZ2UoKSB7XG4gICAgICAgIC8vIFRPRE8gc2hvdWxkIHN0YXJ0IGJlIGNhcmV0IHBvc2l0aW9uIGluc3RlYWQ/XG4gICAgICAgIHZhciByYW5nZSA9IHRoaXMuYWNlLmdldFNlbGVjdGlvblJhbmdlKCk7XG4gICAgICAgIHZhciBkb2MgPSB0aGlzLmFjZS5zZXNzaW9uLmRvYztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0YXJ0OiBkb2MucG9zaXRpb25Ub0luZGV4KHJhbmdlLnN0YXJ0KSxcbiAgICAgICAgICAgIGVuZDogZG9jLnBvc2l0aW9uVG9JbmRleChyYW5nZS5lbmQpXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBzZWxlY3Rpb24gZnJvbSA8Y29kZT5zdGFydDwvY29kZT4gdG8gPGNvZGU+ZW5kPC9jb2RlPiBjaGFyYWN0ZXJcbiAgICAgKiBpbmRleGVzLiBJZiA8Y29kZT5lbmQ8L2NvZGU+IGlzIG9tbWl0ZWQsIHRoaXMgbWV0aG9kIHNob3VsZCBwbGFjZSBjYXJldFxuICAgICAqIGFuZCA8Y29kZT5zdGFydDwvY29kZT4gaW5kZXhcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gc3RhcnRcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW2VuZF1cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGVkaXRvci5jcmVhdGVTZWxlY3Rpb24oMTAsIDQwKTtcbiAgICAgKlxuICAgICAqIC8vbW92ZSBjYXJldCB0byAxNXRoIGNoYXJhY3RlclxuICAgICAqIGVkaXRvci5jcmVhdGVTZWxlY3Rpb24oMTUpO1xuICAgICAqL1xuICAgIGNyZWF0ZVNlbGVjdGlvbihzdGFydCwgZW5kKSB7XG4gICAgICAgIHZhciBkb2MgPSB0aGlzLmFjZS5zZXNzaW9uLmRvYztcbiAgICAgICAgdGhpcy5hY2Uuc2VsZWN0aW9uLnNldFJhbmdlKHtcbiAgICAgICAgICAgIHN0YXJ0OiBkb2MuaW5kZXhUb1Bvc2l0aW9uKHN0YXJ0KSxcbiAgICAgICAgICAgIGVuZDogZG9jLmluZGV4VG9Qb3NpdGlvbihlbmQpXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgY3VycmVudCBsaW5lJ3Mgc3RhcnQgYW5kIGVuZCBpbmRleGVzIGFzIG9iamVjdCB3aXRoIDxjb2RlPnN0YXJ0PC9jb2RlPlxuICAgICAqIGFuZCA8Y29kZT5lbmQ8L2NvZGU+IHByb3BlcnRpZXNcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB2YXIgcmFuZ2UgPSBlZGl0b3IuZ2V0Q3VycmVudExpbmVSYW5nZSgpO1xuICAgICAqIGFsZXJ0KHJhbmdlLnN0YXJ0ICsgJywgJyArIHJhbmdlLmVuZCk7XG4gICAgICovXG4gICAgZ2V0Q3VycmVudExpbmVSYW5nZSgpIHtcbiAgICAgICAgdmFyIGFjZSA9IHRoaXMuYWNlO1xuICAgICAgICB2YXIgcm93ID0gYWNlLmdldEN1cnNvclBvc2l0aW9uKCkucm93O1xuICAgICAgICB2YXIgbGluZUxlbmd0aCA9IGFjZS5zZXNzaW9uLmdldExpbmUocm93KS5sZW5ndGg7XG4gICAgICAgIHZhciBpbmRleCA9IGFjZS5zZXNzaW9uLmRvYy5wb3NpdGlvblRvSW5kZXgoe3Jvdzogcm93LCBjb2x1bW46IDB9KTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHN0YXJ0OiBpbmRleCxcbiAgICAgICAgICAgIGVuZDogaW5kZXggKyBsaW5lTGVuZ3RoXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBjdXJyZW50IGNhcmV0IHBvc2l0aW9uXG4gICAgICogQHJldHVybiB7TnVtYmVyfG51bGx9XG4gICAgICovXG4gICAgZ2V0Q2FyZXRQb3MoKXtcbiAgICAgICAgdmFyIHBvcyA9IHRoaXMuYWNlLmdldEN1cnNvclBvc2l0aW9uKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmFjZS5zZXNzaW9uLmRvYy5wb3NpdGlvblRvSW5kZXgocG9zKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgbmV3IGNhcmV0IHBvc2l0aW9uXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4IENhcmV0IHBvc2l0aW9uXG4gICAgICovXG4gICAgc2V0Q2FyZXRQb3MoaW5kZXgpe1xuICAgICAgICB2YXIgcG9zID0gdGhpcy5hY2Uuc2Vzc2lvbi5kb2MuaW5kZXhUb1Bvc2l0aW9uKGluZGV4KTtcbiAgICAgICAgdGhpcy5hY2Uuc2VsZWN0aW9uLm1vdmVUb1Bvc2l0aW9uKHBvcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBjb250ZW50IG9mIGN1cnJlbnQgbGluZVxuICAgICAqIEByZXR1cm4ge1N0cmluZ31cbiAgICAgKi9cbiAgICBnZXRDdXJyZW50TGluZSgpIHtcbiAgICAgICAgdmFyIHJvdyA9IHRoaXMuYWNlLmdldEN1cnNvclBvc2l0aW9uKCkucm93O1xuICAgICAgICByZXR1cm4gdGhpcy5hY2Uuc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVwbGFjZSBlZGl0b3IncyBjb250ZW50IG9yIGl0J3MgcGFydCAoZnJvbSA8Y29kZT5zdGFydDwvY29kZT4gdG9cbiAgICAgKiA8Y29kZT5lbmQ8L2NvZGU+IGluZGV4KS4gSWYgPGNvZGU+dmFsdWU8L2NvZGU+IGNvbnRhaW5zXG4gICAgICogPGNvZGU+Y2FyZXRfcGxhY2Vob2xkZXI8L2NvZGU+LCB0aGUgZWRpdG9yIHdpbGwgcHV0IGNhcmV0IGludG9cbiAgICAgKiB0aGlzIHBvc2l0aW9uLiBJZiB5b3Ugc2tpcCA8Y29kZT5zdGFydDwvY29kZT4gYW5kIDxjb2RlPmVuZDwvY29kZT5cbiAgICAgKiBhcmd1bWVudHMsIHRoZSB3aG9sZSB0YXJnZXQncyBjb250ZW50IHdpbGwgYmUgcmVwbGFjZWQgd2l0aFxuICAgICAqIDxjb2RlPnZhbHVlPC9jb2RlPi5cbiAgICAgKlxuICAgICAqIElmIHlvdSBwYXNzIDxjb2RlPnN0YXJ0PC9jb2RlPiBhcmd1bWVudCBvbmx5LFxuICAgICAqIHRoZSA8Y29kZT52YWx1ZTwvY29kZT4gd2lsbCBiZSBwbGFjZWQgYXQgPGNvZGU+c3RhcnQ8L2NvZGU+IHN0cmluZ1xuICAgICAqIGluZGV4IG9mIGN1cnJlbnQgY29udGVudC5cbiAgICAgKlxuICAgICAqIElmIHlvdSBwYXNzIDxjb2RlPnN0YXJ0PC9jb2RlPiBhbmQgPGNvZGU+ZW5kPC9jb2RlPiBhcmd1bWVudHMsXG4gICAgICogdGhlIGNvcnJlc3BvbmRpbmcgc3Vic3RyaW5nIG9mIGN1cnJlbnQgdGFyZ2V0J3MgY29udGVudCB3aWxsIGJlXG4gICAgICogcmVwbGFjZWQgd2l0aCA8Y29kZT52YWx1ZTwvY29kZT4uXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlIENvbnRlbnQgeW91IHdhbnQgdG8gcGFzdGVcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW3N0YXJ0XSBTdGFydCBpbmRleCBvZiBlZGl0b3IncyBjb250ZW50XG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFtlbmRdIEVuZCBpbmRleCBvZiBlZGl0b3IncyBjb250ZW50XG4gICAgICogQHBhcmFtIHtCb29sZWFufSBbbm9JbmRlbnRdIERvIG5vdCBhdXRvIGluZGVudCA8Y29kZT52YWx1ZTwvY29kZT5cbiAgICAgKi9cbiAgICByZXBsYWNlQ29udGVudCh2YWx1ZSwgc3RhcnQsIGVuZCwgbm9JbmRlbnQpIHtcbiAgICAgICAgaWYgKGVuZCA9PSBudWxsKVxuICAgICAgICAgICAgZW5kID0gc3RhcnQgPT0gbnVsbCA/IHRoaXMuZ2V0Q29udGVudCgpLmxlbmd0aCA6IHN0YXJ0O1xuICAgICAgICBpZiAoc3RhcnQgPT0gbnVsbClcbiAgICAgICAgICAgIHN0YXJ0ID0gMDsgICAgICAgIFxuICAgICAgICBcbiAgICAgICAgdmFyIGVkaXRvciA9IHRoaXMuYWNlO1xuICAgICAgICB2YXIgZG9jID0gZWRpdG9yLnNlc3Npb24uZG9jO1xuICAgICAgICB2YXIgcmFuZ2UgPSBSYW5nZS5mcm9tUG9pbnRzKGRvYy5pbmRleFRvUG9zaXRpb24oc3RhcnQpLCBkb2MuaW5kZXhUb1Bvc2l0aW9uKGVuZCkpO1xuICAgICAgICBlZGl0b3Iuc2Vzc2lvbi5yZW1vdmUocmFuZ2UpO1xuICAgICAgICBcbiAgICAgICAgcmFuZ2UuZW5kID0gcmFuZ2Uuc3RhcnQ7XG4gICAgICAgIC8vZWRpdG9yLnNlbGVjdGlvbi5zZXRSYW5nZShyYW5nZSk7XG4gICAgICAgIFxuICAgICAgICB2YWx1ZSA9IHRoaXMuJHVwZGF0ZVRhYnN0b3BzKHZhbHVlKTtcbiAgICAgICAgc25pcHBldE1hbmFnZXIuaW5zZXJ0U25pcHBldChlZGl0b3IsIHZhbHVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGVkaXRvcidzIGNvbnRlbnRcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAgICovXG4gICAgZ2V0Q29udGVudCgpe1xuICAgICAgICByZXR1cm4gdGhpcy5hY2UuZ2V0VmFsdWUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGN1cnJlbnQgZWRpdG9yJ3Mgc3ludGF4IG1vZGVcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAgICovXG4gICAgZ2V0U3ludGF4KCkge1xuICAgICAgICBpZiAodGhpcy4kc3ludGF4KVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHN5bnRheDtcbiAgICAgICAgdmFyIHN5bnRheCA9IHRoaXMuYWNlLnNlc3Npb24uJG1vZGVJZC5zcGxpdChcIi9cIikucG9wKCk7XG4gICAgICAgIGlmIChzeW50YXggPT0gXCJodG1sXCIgfHwgc3ludGF4ID09IFwicGhwXCIpIHtcbiAgICAgICAgICAgIHZhciBjdXJzb3IgPSB0aGlzLmFjZS5nZXRDdXJzb3JQb3NpdGlvbigpO1xuICAgICAgICAgICAgLyoqQHR5cGUge3N0cmluZyB8IHN0cmluZ1tdfSAqL1xuICAgICAgICAgICAgdmFyIHN0YXRlID0gdGhpcy5hY2Uuc2Vzc2lvbi5nZXRTdGF0ZShjdXJzb3Iucm93KTtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc3RhdGUgIT0gXCJzdHJpbmdcIilcbiAgICAgICAgICAgICAgICBzdGF0ZSA9IHN0YXRlWzBdO1xuICAgICAgICAgICAgaWYgKHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgc3RhdGUgPSBzdGF0ZS5zcGxpdChcIi1cIik7XG4gICAgICAgICAgICAgICAgaWYgKHN0YXRlLmxlbmd0aCA+IDEpXG4gICAgICAgICAgICAgICAgICAgIHN5bnRheCA9IHN0YXRlWzBdO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHN5bnRheCA9PSBcInBocFwiKVxuICAgICAgICAgICAgICAgICAgICBzeW50YXggPSBcImh0bWxcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3ludGF4O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgY3VycmVudCBvdXRwdXQgcHJvZmlsZSBuYW1lIChAc2VlIGVtbWV0I3NldHVwUHJvZmlsZSlcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAgICovXG4gICAgZ2V0UHJvZmlsZU5hbWUoKSB7XG4gICAgICAgIHZhciByZXNvdXJjZXMgPSBlbW1ldC5yZXNvdXJjZXMgfHwgZW1tZXQucmVxdWlyZShcInJlc291cmNlc1wiKTtcbiAgICAgICAgc3dpdGNoICh0aGlzLmdldFN5bnRheCgpKSB7XG4gICAgICAgICAgY2FzZSBcImNzc1wiOiByZXR1cm4gXCJjc3NcIjtcbiAgICAgICAgICBjYXNlIFwieG1sXCI6XG4gICAgICAgICAgY2FzZSBcInhzbFwiOlxuICAgICAgICAgICAgcmV0dXJuIFwieG1sXCI7XG4gICAgICAgICAgY2FzZSBcImh0bWxcIjpcbiAgICAgICAgICAgIHZhciBwcm9maWxlID0gcmVzb3VyY2VzLmdldFZhcmlhYmxlKFwicHJvZmlsZVwiKTtcbiAgICAgICAgICAgIC8vIG5vIGZvcmNlZCBwcm9maWxlLCBndWVzcyBmcm9tIGNvbnRlbnQgaHRtbCBvciB4aHRtbD9cbiAgICAgICAgICAgIGlmICghcHJvZmlsZSlcbiAgICAgICAgICAgICAgICBwcm9maWxlID0gdGhpcy5hY2Uuc2Vzc2lvbi5nZXRMaW5lcygwLDIpLmpvaW4oXCJcIikuc2VhcmNoKC88IURPQ1RZUEVbXj5dK1hIVE1ML2kpICE9IC0xID8gXCJ4aHRtbFwiOiBcImh0bWxcIjtcbiAgICAgICAgICAgIHJldHVybiBwcm9maWxlO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB2YXIgbW9kZSA9IHRoaXMuYWNlLnNlc3Npb24uJG1vZGU7XG4gICAgICAgICAgICByZXR1cm4gbW9kZS5lbW1ldENvbmZpZyAmJiBtb2RlLmVtbWV0Q29uZmlnLnByb2ZpbGUgfHwgXCJ4aHRtbFwiO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQXNrIHVzZXIgdG8gZW50ZXIgc29tZXRoaW5nXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHRpdGxlIERpYWxvZyB0aXRsZVxuICAgICAqIEByZXR1cm4ge1N0cmluZ30gRW50ZXJlZCBkYXRhXG4gICAgICogQHNpbmNlIDAuNjVcbiAgICAgKi9cbiAgICBwcm9tcHQodGl0bGUpIHtcbiAgICAgICAgcmV0dXJuIHByb21wdCh0aXRsZSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tYWxlcnRcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGN1cnJlbnQgc2VsZWN0aW9uXG4gICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAqIEBzaW5jZSAwLjY1XG4gICAgICovXG4gICAgZ2V0U2VsZWN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hY2Uuc2Vzc2lvbi5nZXRUZXh0UmFuZ2UoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGN1cnJlbnQgZWRpdG9yJ3MgZmlsZSBwYXRoXG4gICAgICogQHJldHVybiB7U3RyaW5nfVxuICAgICAqIEBzaW5jZSAwLjY1XG4gICAgICovXG4gICAgZ2V0RmlsZVBhdGgoKSB7XG4gICAgICAgIHJldHVybiBcIlwiO1xuICAgIH1cbiAgICBcbiAgICAvLyB1cGRhdGUgdGFic3RvcHM6IG1ha2Ugc3VyZSBhbGwgY2FyZXQgcGxhY2Vob2xkZXJzIGFyZSB1bmlxdWVcbiAgICAvLyBieSBkZWZhdWx0LCBhYmJyZXZpYXRpb24gcGFyc2VyIGdlbmVyYXRlcyBhbGwgdW5saW5rZWQgKHVuLW1pcnJvcmVkKVxuICAgIC8vIHRhYnN0b3BzIGFzICR7MH0sIHNvIHdlIGhhdmUgdXBncmFkZSBhbGwgY2FyZXQgdGFic3RvcHMgd2l0aCB1bmlxdWVcbiAgICAvLyBwb3NpdGlvbnMgYnV0IG1ha2Ugc3VyZSB0aGF0IGFsbCBvdGhlciB0YWJzdG9wcyBhcmUgbm90IGxpbmtlZCBhY2NpZGVudGFsbHlcbiAgICAvLyBiYXNlZCBvbiBodHRwczovL2dpdGh1Yi5jb20vc2VyZ2VjaGUvZW1tZXQtc3VibGltZS9ibG9iL21hc3Rlci9lZGl0b3IuanMjTDExOS1MMTcxXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gICAgICovXG4gICAgJHVwZGF0ZVRhYnN0b3BzKHZhbHVlKSB7XG4gICAgICAgIHZhciBiYXNlID0gMTAwMDtcbiAgICAgICAgdmFyIHplcm9CYXNlID0gMDtcbiAgICAgICAgdmFyIGxhc3RaZXJvID0gbnVsbDtcbiAgICAgICAgdmFyIHRzID0gZW1tZXQudGFiU3RvcHMgfHwgZW1tZXQucmVxdWlyZSgndGFiU3RvcHMnKTtcbiAgICAgICAgdmFyIHJlc291cmNlcyA9IGVtbWV0LnJlc291cmNlcyB8fCBlbW1ldC5yZXF1aXJlKFwicmVzb3VyY2VzXCIpO1xuICAgICAgICB2YXIgc2V0dGluZ3MgPSByZXNvdXJjZXMuZ2V0Vm9jYWJ1bGFyeShcInVzZXJcIik7XG4gICAgICAgIHZhciB0YWJzdG9wT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHRhYnN0b3A6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICB2YXIgZ3JvdXAgPSBwYXJzZUludChkYXRhLmdyb3VwLCAxMCk7XG4gICAgICAgICAgICAgICAgdmFyIGlzWmVybyA9IGdyb3VwID09PSAwO1xuICAgICAgICAgICAgICAgIGlmIChpc1plcm8pXG4gICAgICAgICAgICAgICAgICAgIGdyb3VwID0gKyt6ZXJvQmFzZTtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIGdyb3VwICs9IGJhc2U7XG5cbiAgICAgICAgICAgICAgICB2YXIgcGxhY2Vob2xkZXIgPSBkYXRhLnBsYWNlaG9sZGVyO1xuICAgICAgICAgICAgICAgIGlmIChwbGFjZWhvbGRlcikge1xuICAgICAgICAgICAgICAgICAgICAvLyByZWN1cnNpdmVseSB1cGRhdGUgbmVzdGVkIHRhYnN0b3BzXG4gICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyID0gdHMucHJvY2Vzc1RleHQocGxhY2Vob2xkZXIsIHRhYnN0b3BPcHRpb25zKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gJyR7JyArIGdyb3VwICsgKHBsYWNlaG9sZGVyID8gJzonICsgcGxhY2Vob2xkZXIgOiAnJykgKyAnfSc7XG5cbiAgICAgICAgICAgICAgICBpZiAoaXNaZXJvKSB7XG4gICAgICAgICAgICAgICAgICAgIGxhc3RaZXJvID0gW2RhdGEuc3RhcnQsIHJlc3VsdF07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlc2NhcGU6IGZ1bmN0aW9uKGNoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNoID09ICckJykgcmV0dXJuICdcXFxcJCc7XG4gICAgICAgICAgICAgICAgaWYgKGNoID09ICdcXFxcJykgcmV0dXJuICdcXFxcXFxcXCc7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNoO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHZhbHVlID0gdHMucHJvY2Vzc1RleHQodmFsdWUsIHRhYnN0b3BPcHRpb25zKTtcblxuICAgICAgICBpZiAoc2V0dGluZ3MudmFyaWFibGVzWydpbnNlcnRfZmluYWxfdGFic3RvcCddICYmICEvXFwkXFx7MFxcfSQvLnRlc3QodmFsdWUpKSB7XG4gICAgICAgICAgICB2YWx1ZSArPSAnJHswfSc7XG4gICAgICAgIH0gZWxzZSBpZiAobGFzdFplcm8pIHtcbiAgICAgICAgICAgIHZhciBjb21tb24gPSBlbW1ldC51dGlscyA/IGVtbWV0LnV0aWxzLmNvbW1vbiA6IGVtbWV0LnJlcXVpcmUoJ3V0aWxzJyk7XG4gICAgICAgICAgICB2YWx1ZSA9IGNvbW1vbi5yZXBsYWNlU3Vic3RyaW5nKHZhbHVlLCAnJHswfScsIGxhc3RaZXJvWzBdLCBsYXN0WmVyb1sxXSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG59XG5cblxudmFyIGtleW1hcCA9IHtcbiAgICBleHBhbmRfYWJicmV2aWF0aW9uOiB7XCJtYWNcIjogXCJjdHJsK2FsdCtlXCIsIFwid2luXCI6IFwiYWx0K2VcIn0sXG4gICAgbWF0Y2hfcGFpcl9vdXR3YXJkOiB7XCJtYWNcIjogXCJjdHJsK2RcIiwgXCJ3aW5cIjogXCJjdHJsKyxcIn0sXG4gICAgbWF0Y2hfcGFpcl9pbndhcmQ6IHtcIm1hY1wiOiBcImN0cmwralwiLCBcIndpblwiOiBcImN0cmwrc2hpZnQrMFwifSxcbiAgICBtYXRjaGluZ19wYWlyOiB7XCJtYWNcIjogXCJjdHJsK2FsdCtqXCIsIFwid2luXCI6IFwiYWx0K2pcIn0sXG4gICAgbmV4dF9lZGl0X3BvaW50OiBcImFsdCtyaWdodFwiLFxuICAgIHByZXZfZWRpdF9wb2ludDogXCJhbHQrbGVmdFwiLFxuICAgIHRvZ2dsZV9jb21tZW50OiB7XCJtYWNcIjogXCJjb21tYW5kKy9cIiwgXCJ3aW5cIjogXCJjdHJsKy9cIn0sXG4gICAgc3BsaXRfam9pbl90YWc6IHtcIm1hY1wiOiBcInNoaWZ0K2NvbW1hbmQrJ1wiLCBcIndpblwiOiBcInNoaWZ0K2N0cmwrYFwifSxcbiAgICByZW1vdmVfdGFnOiB7XCJtYWNcIjogXCJjb21tYW5kKydcIiwgXCJ3aW5cIjogXCJzaGlmdCtjdHJsKztcIn0sXG4gICAgZXZhbHVhdGVfbWF0aF9leHByZXNzaW9uOiB7XCJtYWNcIjogXCJzaGlmdCtjb21tYW5kK3lcIiwgXCJ3aW5cIjogXCJzaGlmdCtjdHJsK3lcIn0sXG4gICAgaW5jcmVtZW50X251bWJlcl9ieV8xOiBcImN0cmwrdXBcIixcbiAgICBkZWNyZW1lbnRfbnVtYmVyX2J5XzE6IFwiY3RybCtkb3duXCIsXG4gICAgaW5jcmVtZW50X251bWJlcl9ieV8wMTogXCJhbHQrdXBcIixcbiAgICBkZWNyZW1lbnRfbnVtYmVyX2J5XzAxOiBcImFsdCtkb3duXCIsXG4gICAgaW5jcmVtZW50X251bWJlcl9ieV8xMDoge1wibWFjXCI6IFwiYWx0K2NvbW1hbmQrdXBcIiwgXCJ3aW5cIjogXCJzaGlmdCthbHQrdXBcIn0sXG4gICAgZGVjcmVtZW50X251bWJlcl9ieV8xMDoge1wibWFjXCI6IFwiYWx0K2NvbW1hbmQrZG93blwiLCBcIndpblwiOiBcInNoaWZ0K2FsdCtkb3duXCJ9LFxuICAgIHNlbGVjdF9uZXh0X2l0ZW06IHtcIm1hY1wiOiBcInNoaWZ0K2NvbW1hbmQrLlwiLCBcIndpblwiOiBcInNoaWZ0K2N0cmwrLlwifSxcbiAgICBzZWxlY3RfcHJldmlvdXNfaXRlbToge1wibWFjXCI6IFwic2hpZnQrY29tbWFuZCssXCIsIFwid2luXCI6IFwic2hpZnQrY3RybCssXCJ9LFxuICAgIHJlZmxlY3RfY3NzX3ZhbHVlOiB7XCJtYWNcIjogXCJzaGlmdCtjb21tYW5kK3JcIiwgXCJ3aW5cIjogXCJzaGlmdCtjdHJsK3JcIn0sXG5cbiAgICBlbmNvZGVfZGVjb2RlX2RhdGFfdXJsOiB7XCJtYWNcIjogXCJzaGlmdCtjdHJsK2RcIiwgXCJ3aW5cIjogXCJjdHJsKydcIn0sXG4gICAgLy8gdXBkYXRlX2ltYWdlX3NpemU6IHtcIm1hY1wiOiBcInNoaWZ0K2N0cmwraVwiLCBcIndpblwiOiBcImN0cmwrdVwifSxcbiAgICAvLyBleHBhbmRfYXNfeW91X3R5cGU6IFwiY3RybCthbHQrZW50ZXJcIixcbiAgICAvLyB3cmFwX2FzX3lvdV90eXBlOiB7XCJtYWNcIjogXCJzaGlmdCtjdHJsK2dcIiwgXCJ3aW5cIjogXCJzaGlmdCtjdHJsK2dcIn0sXG4gICAgZXhwYW5kX2FiYnJldmlhdGlvbl93aXRoX3RhYjogXCJUYWJcIixcbiAgICB3cmFwX3dpdGhfYWJicmV2aWF0aW9uOiB7XCJtYWNcIjogXCJzaGlmdCtjdHJsK2FcIiwgXCJ3aW5cIjogXCJzaGlmdCtjdHJsK2FcIn1cbn07XG5cbnZhciBlZGl0b3JQcm94eSA9IG5ldyBBY2VFbW1ldEVkaXRvcigpO1xuZXhwb3J0cy5jb21tYW5kcyA9IG5ldyBIYXNoSGFuZGxlcigpO1xuXG4vKipcbiAqIFJ1bnMgYW4gRW1tZXQgY29tbWFuZCBvbiB0aGUgZ2l2ZW4gZWRpdG9yLlxuICpcbiAqIEBwYXJhbSB7RWRpdG9yfSBlZGl0b3IgLSBUaGUgQWNlIGVkaXRvciBpbnN0YW5jZSB0byBydW4gdGhlIEVtbWV0IGNvbW1hbmQgb25cbiAqIEByZXR1cm4ge1JldHVyblR5cGU8dHlwZW9mIHNldFRpbWVvdXQ+IHwgYm9vbGVhbn0gVGhlIHJlc3VsdCBvZiB0aGUgRW1tZXQgY29tbWFuZCBleGVjdXRpb25cbiAqL1xuZXhwb3J0cy5ydW5FbW1ldENvbW1hbmQgPSBmdW5jdGlvbiBydW5FbW1ldENvbW1hbmQoZWRpdG9yKSB7XG4gICAgaWYgKHRoaXMuYWN0aW9uID09IFwiZXhwYW5kX2FiYnJldmlhdGlvbl93aXRoX3RhYlwiKSB7XG4gICAgICAgIGlmICghZWRpdG9yLnNlbGVjdGlvbi5pc0VtcHR5KCkpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIHZhciBwb3MgPSBlZGl0b3Iuc2VsZWN0aW9uLmxlYWQ7XG4gICAgICAgIHZhciB0b2tlbiA9IGVkaXRvci5zZXNzaW9uLmdldFRva2VuQXQocG9zLnJvdywgcG9zLmNvbHVtbik7XG4gICAgICAgIGlmICh0b2tlbiAmJiAvXFxidGFnXFxiLy50ZXN0KHRva2VuLnR5cGUpKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBlZGl0b3JQcm94eS5zZXR1cENvbnRleHQoZWRpdG9yKTtcbiAgICAgICAgdmFyIGFjdGlvbnMgPSBlbW1ldC5hY3Rpb25zIHx8IGVtbWV0LnJlcXVpcmUoXCJhY3Rpb25zXCIpO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuYWN0aW9uID09IFwid3JhcF93aXRoX2FiYnJldmlhdGlvblwiKSB7XG4gICAgICAgICAgICAvLyB3aXRob3V0IHNldFRpbWVvdXQgcHJvbXB0IGRvZXNuJ3Qgd29yayBvbiBmaXJlZm94XG4gICAgICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBhY3Rpb25zLnJ1bihcIndyYXBfd2l0aF9hYmJyZXZpYXRpb25cIiwgZWRpdG9yUHJveHkpO1xuICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHZhciByZXN1bHQgPSBhY3Rpb25zLnJ1bih0aGlzLmFjdGlvbiwgZWRpdG9yUHJveHkpO1xuICAgIH0gY2F0Y2goZSkge1xuICAgICAgICBpZiAoIWVtbWV0KSB7XG4gICAgICAgICAgICB2YXIgbG9hZGluZyA9IGV4cG9ydHMubG9hZChydW5FbW1ldENvbW1hbmQuYmluZCh0aGlzLCBlZGl0b3IpKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmFjdGlvbiA9PSBcImV4cGFuZF9hYmJyZXZpYXRpb25fd2l0aF90YWJcIilcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gbG9hZGluZztcbiAgICAgICAgfVxuICAgICAgICBlZGl0b3IuX3NpZ25hbChcImNoYW5nZVN0YXR1c1wiLCB0eXBlb2YgZSA9PSBcInN0cmluZ1wiID8gZSA6IGUubWVzc2FnZSk7XG4gICAgICAgIGNvbmZpZy53YXJuKGUpO1xuICAgICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbmZvciAodmFyIGNvbW1hbmQgaW4ga2V5bWFwKSB7XG4gICAgZXhwb3J0cy5jb21tYW5kcy5hZGRDb21tYW5kKHtcbiAgICAgICAgbmFtZTogXCJlbW1ldDpcIiArIGNvbW1hbmQsXG4gICAgICAgIGFjdGlvbjogY29tbWFuZCxcbiAgICAgICAgYmluZEtleToga2V5bWFwW2NvbW1hbmRdLFxuICAgICAgICBleGVjOiBleHBvcnRzLnJ1bkVtbWV0Q29tbWFuZCxcbiAgICAgICAgbXVsdGlTZWxlY3RBY3Rpb246IFwiZm9yRWFjaFwiXG4gICAgfSk7XG59XG5cbi8qKlxuICogVXBkYXRlcyB0aGUga2V5Ym9hcmQgaGFuZGxlciBmb3IgRW1tZXQgY29tbWFuZHMgaW4gdGhlIGVkaXRvci5cbiAqXG4gKiBAcGFyYW0ge0VkaXRvcn0gZWRpdG9yIC0gVGhlIEFjZSBlZGl0b3IgaW5zdGFuY2VcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2VuYWJsZWRdIC0gV2hldGhlciBFbW1ldCBjb21tYW5kcyBzaG91bGQgYmUgZW5hYmxlZFxuICovXG5leHBvcnRzLnVwZGF0ZUNvbW1hbmRzID0gZnVuY3Rpb24oZWRpdG9yLCBlbmFibGVkKSB7XG4gICAgaWYgKGVuYWJsZWQpIHtcbiAgICAgICAgZWRpdG9yLmtleUJpbmRpbmcuYWRkS2V5Ym9hcmRIYW5kbGVyKGV4cG9ydHMuY29tbWFuZHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGVkaXRvci5rZXlCaW5kaW5nLnJlbW92ZUtleWJvYXJkSGFuZGxlcihleHBvcnRzLmNvbW1hbmRzKTtcbiAgICB9XG59O1xuXG4vKipcbiAqIERldGVybWluZXMgaWYgYSBnaXZlbiBlZGl0b3IgbW9kZSBpcyBzdXBwb3J0ZWQgYnkgRW1tZXQuXG4gKlxuICogQHBhcmFtIHtPYmplY3R8c3RyaW5nfSBtb2RlIC0gVGhlIGVkaXRvciBtb2RlIHRvIGNoZWNrIGZvciBFbW1ldCBzdXBwb3J0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gV2hldGhlciB0aGUgbW9kZSBpcyBzdXBwb3J0ZWQgYnkgRW1tZXRcbiAqL1xuZXhwb3J0cy5pc1N1cHBvcnRlZE1vZGUgPSBmdW5jdGlvbihtb2RlKSB7XG4gICAgaWYgKCFtb2RlKSByZXR1cm4gZmFsc2U7XG4gICAgaWYgKG1vZGUuZW1tZXRDb25maWcpIHJldHVybiB0cnVlO1xuICAgIHZhciBpZCA9IG1vZGUuJGlkIHx8IG1vZGU7XG4gICAgcmV0dXJuIC9jc3N8bGVzc3xzY3NzfHNhc3N8c3R5bHVzfGh0bWx8cGhwfHR3aWd8ZWpzfGhhbmRsZWJhcnMvLnRlc3QoaWQpO1xufTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYW4gRW1tZXQgY29tbWFuZCBpcyBhdmFpbGFibGUgZm9yIHRoZSBjdXJyZW50IGVkaXRvciBjb250ZXh0LlxuICpcbiAqIEBwYXJhbSB7RWRpdG9yfSBlZGl0b3IgLSBUaGUgY3VycmVudCBBY2UgZWRpdG9yIGluc3RhbmNlXG4gKiBAcGFyYW0ge3N0cmluZ30gY29tbWFuZCAtIFRoZSBFbW1ldCBjb21tYW5kIHRvIGNoZWNrIGF2YWlsYWJpbGl0eSBmb3JcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFdoZXRoZXIgdGhlIGNvbW1hbmQgaXMgYXZhaWxhYmxlIGluIHRoZSBjdXJyZW50IGVkaXRvciBtb2RlXG4gKi9cbmV4cG9ydHMuaXNBdmFpbGFibGUgPSBmdW5jdGlvbihlZGl0b3IsIGNvbW1hbmQpIHtcbiAgICBpZiAoLyhldmFsdWF0ZV9tYXRoX2V4cHJlc3Npb258ZXhwYW5kX2FiYnJldmlhdGlvbikkLy50ZXN0KGNvbW1hbmQpKVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB2YXIgbW9kZSA9IGVkaXRvci5zZXNzaW9uLiRtb2RlO1xuICAgIHZhciBpc1N1cHBvcnRlZCA9IGV4cG9ydHMuaXNTdXBwb3J0ZWRNb2RlKG1vZGUpO1xuICAgIGlmIChpc1N1cHBvcnRlZCAmJiBtb2RlLiRtb2Rlcykge1xuICAgICAgICAvLyBUT0RPIHJlZmFjdG9yIG1vZGUgZGVsZWdhdGVzIHRvIG1ha2UgdGhpcyBzaW1wbGVyXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBlZGl0b3JQcm94eS5zZXR1cENvbnRleHQoZWRpdG9yKTtcbiAgICAgICAgICAgIGlmICgvanN8cGhwLy50ZXN0KGVkaXRvclByb3h5LmdldFN5bnRheCgpKSlcbiAgICAgICAgICAgICAgICBpc1N1cHBvcnRlZCA9IGZhbHNlO1xuICAgICAgICB9IGNhdGNoKGUpIHt9XG4gICAgfVxuICAgIHJldHVybiBpc1N1cHBvcnRlZDtcbn07XG5cbnZhciBvbkNoYW5nZU1vZGUgPSBmdW5jdGlvbihlLCB0YXJnZXQpIHtcbiAgICB2YXIgZWRpdG9yID0gdGFyZ2V0O1xuICAgIGlmICghZWRpdG9yKVxuICAgICAgICByZXR1cm47XG4gICAgdmFyIGVuYWJsZWQgPSBleHBvcnRzLmlzU3VwcG9ydGVkTW9kZShlZGl0b3Iuc2Vzc2lvbi4kbW9kZSk7XG4gICAgaWYgKGUuZW5hYmxlRW1tZXQgPT09IGZhbHNlKVxuICAgICAgICBlbmFibGVkID0gZmFsc2U7XG4gICAgaWYgKGVuYWJsZWQpXG4gICAgICAgIGV4cG9ydHMubG9hZCgpO1xuICAgIGV4cG9ydHMudXBkYXRlQ29tbWFuZHMoZWRpdG9yLCBlbmFibGVkKTtcbn07XG5cbi8qKlxuICogTG9hZHMgdGhlIEVtbWV0IGNvcmUgbW9kdWxlIGR5bmFtaWNhbGx5LlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYl0gLSBPcHRpb25hbCBjYWxsYmFjayBmdW5jdGlvbiB0byBiZSBleGVjdXRlZCBhZnRlciBtb2R1bGUgbG9hZGluZ1xuICogQHJldHVybiB7Ym9vbGVhbn0gV2hldGhlciB0aGUgRW1tZXQgY29yZSBtb2R1bGUgbG9hZGluZyB3YXMgaW5pdGlhdGVkIHN1Y2Nlc3NmdWxseVxuICovXG5leHBvcnRzLmxvYWQgPSBmdW5jdGlvbihjYikge1xuICAgIGlmICh0eXBlb2YgZW1tZXRQYXRoICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGNvbmZpZy53YXJuKFwic2NyaXB0IGZvciBlbW1ldC1jb3JlIGlzIG5vdCBsb2FkZWRcIik7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uZmlnLmxvYWRNb2R1bGUoZW1tZXRQYXRoLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZW1tZXRQYXRoID0gbnVsbDtcbiAgICAgICAgY2IgJiYgY2IoKTtcbiAgICB9KTtcbiAgICByZXR1cm4gdHJ1ZTtcbn07XG5cbmV4cG9ydHMuQWNlRW1tZXRFZGl0b3IgPSBBY2VFbW1ldEVkaXRvcjtcbmNvbmZpZy5kZWZpbmVPcHRpb25zKEVkaXRvci5wcm90b3R5cGUsIFwiZWRpdG9yXCIsIHtcbiAgICBlbmFibGVFbW1ldDoge1xuICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAgICAgdGhpc1t2YWwgPyBcIm9uXCIgOiBcInJlbW92ZUxpc3RlbmVyXCJdKFwiY2hhbmdlTW9kZVwiLCBvbkNoYW5nZU1vZGUpO1xuICAgICAgICAgICAgb25DaGFuZ2VNb2RlKHtlbmFibGVFbW1ldDogISF2YWx9LCB0aGlzKTtcbiAgICAgICAgfSxcbiAgICAgICAgdmFsdWU6IHRydWVcbiAgICB9XG59KTtcblxuLyoqXG4gKiBTZXRzIHRoZSBFbW1ldCBjb3JlIG1vZHVsZSBvciBwYXRoLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfE9iamVjdH0gZSAtIEVpdGhlciB0aGUgcGF0aCB0byB0aGUgRW1tZXQgY29yZSBzY3JpcHQgb3IgdGhlIEVtbWV0IGNvcmUgbW9kdWxlIGl0c2VsZlxuICogSWYgYSBzdHJpbmcgaXMgcHJvdmlkZWQsIGl0IHNldHMgdGhlIHBhdGggdG8gbG9hZCB0aGUgRW1tZXQgY29yZSBzY3JpcHQuXG4gKiBJZiBhbiBvYmplY3QgaXMgcHJvdmlkZWQsIGl0IGRpcmVjdGx5IHNldHMgdGhlIEVtbWV0IGNvcmUgbW9kdWxlLlxuICovXG5leHBvcnRzLnNldENvcmUgPSBmdW5jdGlvbihlKSB7XG4gICAgaWYgKHR5cGVvZiBlID09IFwic3RyaW5nXCIpXG4gICAgICAgZW1tZXRQYXRoID0gZTtcbiAgICBlbHNlXG4gICAgICAgZW1tZXQgPSBlO1xufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==