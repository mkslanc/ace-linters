"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[8939],{

/***/ 58939:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * ## Split editor container extension for multiple editor instances
 *
 * Provides functionality to create and manage multiple editor instances within a single container,
 * arranged either horizontally (beside) or vertically (below). Enables synchronized editing sessions
 * with shared configurations while maintaining independent cursor positions and selections.
 *
 * **Usage:**
 * ```javascript
 * var Split = require("ace/ext/split").Split;
 * var split = new Split(container, theme, numberOfSplits);
 * split.setOrientation(split.BESIDE); // or split.BELOW
 * ```
 *
 * @experimental
 * @module
 */



/**
 * this is experimental, and subject to change, use at your own risk!
 */
module.exports = __webpack_require__(6751);


/***/ }),

/***/ 6751:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var lang = __webpack_require__(39955);
var EventEmitter = (__webpack_require__(87366).EventEmitter);
var Editor = (__webpack_require__(27258).Editor);
var Renderer = (__webpack_require__(21016).VirtualRenderer);
var EditSession = (__webpack_require__(33464)/* .EditSession */ .f);

/**
 * @typedef {import("../ace-internal").Ace.EventEmitter & {[key: string]: any}} ISplit
 */

var Split;
/**
 * @constructor
 * @this {ISplit}
 */
Split = function(container, theme, splits) {
    this.BELOW = 1;
    this.BESIDE = 0;

    this.$container = container;
    this.$theme = theme;
    this.$splits = 0;
    this.$editorCSS = "";
    this.$editors = [];
    this.$orientation = this.BESIDE;

    this.setSplits(splits || 1);
    this.$cEditor = this.$editors[0];


    this.on("focus", function(editor) {
        this.$cEditor = editor;
    }.bind(this));
};

(function(){

    oop.implement(this, EventEmitter);

    /**
     * @returns {Editor}
     * @this {ISplit}
     */
    this.$createEditor = function() {
        var el = document.createElement("div");
        el.className = this.$editorCSS;
        el.style.cssText = "position: absolute; top:0px; bottom:0px";
        this.$container.appendChild(el);
        var editor = new Editor(new Renderer(el, this.$theme));

        editor.on("focus", function() {
            this._emit("focus", editor);
        }.bind(this));

        this.$editors.push(editor);
        editor.setFontSize(this.$fontSize);
        return editor;
    };

    /**
     * 
     * @param splits
     * @this {ISplit}
     */
    this.setSplits = function(splits) {
        var editor;
        if (splits < 1) {
            throw "The number of splits have to be > 0!";
        }

        if (splits == this.$splits) {
            return;
        } else if (splits > this.$splits) {
            while (this.$splits < this.$editors.length && this.$splits < splits) {
                editor = this.$editors[this.$splits];
                this.$container.appendChild(editor.container);
                editor.setFontSize(this.$fontSize);
                this.$splits ++;
            }
            while (this.$splits < splits) {
                this.$createEditor();
                this.$splits ++;
            }
        } else {
            while (this.$splits > splits) {
                editor = this.$editors[this.$splits - 1];
                this.$container.removeChild(editor.container);
                this.$splits --;
            }
        }
        this.resize();
    };

    /**
     * 
     * Returns the number of splits.
     * @returns {Number}
     * @this {ISplit}
     **/
    this.getSplits = function() {
        return this.$splits;
    };

    /**
     * @param {Number} idx The index of the editor you want
     *
     * Returns the editor identified by the index `idx`.
     * @this {ISplit}
     **/
    this.getEditor = function(idx) {
        return this.$editors[idx];
    };

    /**
     * 
     * Returns the current editor.
     * @returns {Editor}
     * @this {ISplit}
     **/
    this.getCurrentEditor = function() {
        return this.$cEditor;
    };

    /** 
     * Focuses the current editor.
     * @related Editor.focus
     * @this {ISplit}
     **/
    this.focus = function() {
        this.$cEditor.focus();
    };

    /** 
     * Blurs the current editor.
     * @related Editor.blur
     * @this {ISplit}
     **/
    this.blur = function() {
        this.$cEditor.blur();
    };

    /** 
     * 
     * @param {String} theme The name of the theme to set
     * 
     * Sets a theme for each of the available editors.
     * @related Editor.setTheme
     * @this {ISplit}
     **/
    this.setTheme = function(theme) {
        this.$editors.forEach(function(editor) {
            editor.setTheme(theme);
        });
    };

    /** 
     * 
     * @param {String} keybinding 
     * 
     * Sets the keyboard handler for the editor.
     * @related editor.setKeyboardHandler
     * @this {ISplit}
     **/
    this.setKeyboardHandler = function(keybinding) {
        this.$editors.forEach(function(editor) {
            editor.setKeyboardHandler(keybinding);
        });
    };

    /** 
     * 
     * @param {Function} callback A callback function to execute
     * @param {String} scope The default scope for the callback
     * 
     * Executes `callback` on all of the available editors. 
     * @this {ISplit}
     **/
    this.forEach = function(callback, scope) {
        this.$editors.forEach(callback, scope);
    };


    this.$fontSize = "";
    /** 
     * @param {Number} size The new font size
     * 
     * Sets the font size, in pixels, for all the available editors.
     * @this {ISplit}
     **/
    this.setFontSize = function(size) {
        this.$fontSize = size;
        this.forEach(function(editor) {
           editor.setFontSize(size);
        });
    };

    /**
     * 
     * @param {EditSession} session
     * @return {EditSession}
     */
    this.$cloneSession = function(session) {
        var s = new EditSession(session.getDocument(), session.getMode());

        var undoManager = session.getUndoManager();
        s.setUndoManager(undoManager);

        // Copy over 'settings' from the session.
        s.setTabSize(session.getTabSize());
        s.setUseSoftTabs(session.getUseSoftTabs());
        s.setOverwrite(session.getOverwrite());
        // @ts-expect-error TODO: string[] != number[]
        s.setBreakpoints(session.getBreakpoints());
        s.setUseWrapMode(session.getUseWrapMode());
        s.setUseWorker(session.getUseWorker());
        s.setWrapLimitRange(session.$wrapLimitRange.min,
                            session.$wrapLimitRange.max);
        s.$foldData = session.$cloneFoldData();

        return s;
    };

   /** 
     * 
     * @param {EditSession} session The new edit session
     * @param {Number} idx The editor's index you're interested in
     * 
     * Sets a new [[EditSession `EditSession`]] for the indicated editor.
     * @related Editor.setSession
     * @this {ISplit}
     **/
    this.setSession = function(session, idx) {
        var editor;
        if (idx == null) {
            editor = this.$cEditor;
        } else {
            editor = this.$editors[idx];
        }

        // Check if the session is used already by any of the editors in the
        // split. If it is, we have to clone the session as two editors using
        // the same session can cause terrible side effects (e.g. UndoQueue goes
        // wrong). This also gives the user of Split the possibility to treat
        // each session on each split editor different.
        var isUsed = this.$editors.some(function(editor) {
           return editor.session === session;
        });

        if (isUsed) {
            session = this.$cloneSession(session);
        }
        editor.setSession(session);

        // Return the session set on the editor. This might be a cloned one.
        return session;
    };

   /** 
     * 
     * Returns the orientation.
     * @returns {Number}
     * @this {ISplit}
     **/
    this.getOrientation = function() {
        return this.$orientation;
    };

   /** 
     * 
     * Sets the orientation.
     * @param {Number} orientation The new orientation value
     * @this {ISplit}
     *
     **/
    this.setOrientation = function(orientation) {
        if (this.$orientation == orientation) {
            return;
        }
        this.$orientation = orientation;
        this.resize();
    };

   /**  
     * Resizes the editor.
     * @this {ISplit}
     **/
    this.resize = function() {
        var width = this.$container.clientWidth;
        var height = this.$container.clientHeight;
        var editor;

        if (this.$orientation == this.BESIDE) {
            var editorWidth = width / this.$splits;
            for (var i = 0; i < this.$splits; i++) {
                editor = this.$editors[i];
                editor.container.style.width = editorWidth + "px";
                editor.container.style.top = "0px";
                editor.container.style.left = i * editorWidth + "px";
                editor.container.style.height = height + "px";
                editor.resize();
            }
        } else {
            var editorHeight = height / this.$splits;
            for (var i = 0; i < this.$splits; i++) {
                editor = this.$editors[i];
                editor.container.style.width = width + "px";
                editor.container.style.top = i * editorHeight + "px";
                editor.container.style.left = "0px";
                editor.container.style.height = editorHeight + "px";
                editor.resize();
            }
        }
    };

}).call(Split.prototype);

exports.Split = Split;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0EsZUFBZSxRQUFRO0FBQ3ZCLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw0QkFBNEIsa0JBQWtCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsNEJBQTRCLGtCQUFrQjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQzs7QUFFRCxhQUFhIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvZXh0L3NwbGl0LmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL3NwbGl0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogIyMgU3BsaXQgZWRpdG9yIGNvbnRhaW5lciBleHRlbnNpb24gZm9yIG11bHRpcGxlIGVkaXRvciBpbnN0YW5jZXNcbiAqXG4gKiBQcm92aWRlcyBmdW5jdGlvbmFsaXR5IHRvIGNyZWF0ZSBhbmQgbWFuYWdlIG11bHRpcGxlIGVkaXRvciBpbnN0YW5jZXMgd2l0aGluIGEgc2luZ2xlIGNvbnRhaW5lcixcbiAqIGFycmFuZ2VkIGVpdGhlciBob3Jpem9udGFsbHkgKGJlc2lkZSkgb3IgdmVydGljYWxseSAoYmVsb3cpLiBFbmFibGVzIHN5bmNocm9uaXplZCBlZGl0aW5nIHNlc3Npb25zXG4gKiB3aXRoIHNoYXJlZCBjb25maWd1cmF0aW9ucyB3aGlsZSBtYWludGFpbmluZyBpbmRlcGVuZGVudCBjdXJzb3IgcG9zaXRpb25zIGFuZCBzZWxlY3Rpb25zLlxuICpcbiAqICoqVXNhZ2U6KipcbiAqIGBgYGphdmFzY3JpcHRcbiAqIHZhciBTcGxpdCA9IHJlcXVpcmUoXCJhY2UvZXh0L3NwbGl0XCIpLlNwbGl0O1xuICogdmFyIHNwbGl0ID0gbmV3IFNwbGl0KGNvbnRhaW5lciwgdGhlbWUsIG51bWJlck9mU3BsaXRzKTtcbiAqIHNwbGl0LnNldE9yaWVudGF0aW9uKHNwbGl0LkJFU0lERSk7IC8vIG9yIHNwbGl0LkJFTE9XXG4gKiBgYGBcbiAqXG4gKiBAZXhwZXJpbWVudGFsXG4gKiBAbW9kdWxlXG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxuICogdGhpcyBpcyBleHBlcmltZW50YWwsIGFuZCBzdWJqZWN0IHRvIGNoYW5nZSwgdXNlIGF0IHlvdXIgb3duIHJpc2shXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uL3NwbGl0XCIpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi9saWIvb29wXCIpO1xudmFyIGxhbmcgPSByZXF1aXJlKFwiLi9saWIvbGFuZ1wiKTtcbnZhciBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKFwiLi9saWIvZXZlbnRfZW1pdHRlclwiKS5FdmVudEVtaXR0ZXI7XG52YXIgRWRpdG9yID0gcmVxdWlyZShcIi4vZWRpdG9yXCIpLkVkaXRvcjtcbnZhciBSZW5kZXJlciA9IHJlcXVpcmUoXCIuL3ZpcnR1YWxfcmVuZGVyZXJcIikuVmlydHVhbFJlbmRlcmVyO1xudmFyIEVkaXRTZXNzaW9uID0gcmVxdWlyZShcIi4vZWRpdF9zZXNzaW9uXCIpLkVkaXRTZXNzaW9uO1xuXG4vKipcbiAqIEB0eXBlZGVmIHtpbXBvcnQoXCIuLi9hY2UtaW50ZXJuYWxcIikuQWNlLkV2ZW50RW1pdHRlciAmIHtba2V5OiBzdHJpbmddOiBhbnl9fSBJU3BsaXRcbiAqL1xuXG52YXIgU3BsaXQ7XG4vKipcbiAqIEBjb25zdHJ1Y3RvclxuICogQHRoaXMge0lTcGxpdH1cbiAqL1xuU3BsaXQgPSBmdW5jdGlvbihjb250YWluZXIsIHRoZW1lLCBzcGxpdHMpIHtcbiAgICB0aGlzLkJFTE9XID0gMTtcbiAgICB0aGlzLkJFU0lERSA9IDA7XG5cbiAgICB0aGlzLiRjb250YWluZXIgPSBjb250YWluZXI7XG4gICAgdGhpcy4kdGhlbWUgPSB0aGVtZTtcbiAgICB0aGlzLiRzcGxpdHMgPSAwO1xuICAgIHRoaXMuJGVkaXRvckNTUyA9IFwiXCI7XG4gICAgdGhpcy4kZWRpdG9ycyA9IFtdO1xuICAgIHRoaXMuJG9yaWVudGF0aW9uID0gdGhpcy5CRVNJREU7XG5cbiAgICB0aGlzLnNldFNwbGl0cyhzcGxpdHMgfHwgMSk7XG4gICAgdGhpcy4kY0VkaXRvciA9IHRoaXMuJGVkaXRvcnNbMF07XG5cblxuICAgIHRoaXMub24oXCJmb2N1c1wiLCBmdW5jdGlvbihlZGl0b3IpIHtcbiAgICAgICAgdGhpcy4kY0VkaXRvciA9IGVkaXRvcjtcbiAgICB9LmJpbmQodGhpcykpO1xufTtcblxuKGZ1bmN0aW9uKCl7XG5cbiAgICBvb3AuaW1wbGVtZW50KHRoaXMsIEV2ZW50RW1pdHRlcik7XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7RWRpdG9yfVxuICAgICAqIEB0aGlzIHtJU3BsaXR9XG4gICAgICovXG4gICAgdGhpcy4kY3JlYXRlRWRpdG9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGVsLmNsYXNzTmFtZSA9IHRoaXMuJGVkaXRvckNTUztcbiAgICAgICAgZWwuc3R5bGUuY3NzVGV4dCA9IFwicG9zaXRpb246IGFic29sdXRlOyB0b3A6MHB4OyBib3R0b206MHB4XCI7XG4gICAgICAgIHRoaXMuJGNvbnRhaW5lci5hcHBlbmRDaGlsZChlbCk7XG4gICAgICAgIHZhciBlZGl0b3IgPSBuZXcgRWRpdG9yKG5ldyBSZW5kZXJlcihlbCwgdGhpcy4kdGhlbWUpKTtcblxuICAgICAgICBlZGl0b3Iub24oXCJmb2N1c1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMuX2VtaXQoXCJmb2N1c1wiLCBlZGl0b3IpO1xuICAgICAgICB9LmJpbmQodGhpcykpO1xuXG4gICAgICAgIHRoaXMuJGVkaXRvcnMucHVzaChlZGl0b3IpO1xuICAgICAgICBlZGl0b3Iuc2V0Rm9udFNpemUodGhpcy4kZm9udFNpemUpO1xuICAgICAgICByZXR1cm4gZWRpdG9yO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gc3BsaXRzXG4gICAgICogQHRoaXMge0lTcGxpdH1cbiAgICAgKi9cbiAgICB0aGlzLnNldFNwbGl0cyA9IGZ1bmN0aW9uKHNwbGl0cykge1xuICAgICAgICB2YXIgZWRpdG9yO1xuICAgICAgICBpZiAoc3BsaXRzIDwgMSkge1xuICAgICAgICAgICAgdGhyb3cgXCJUaGUgbnVtYmVyIG9mIHNwbGl0cyBoYXZlIHRvIGJlID4gMCFcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzcGxpdHMgPT0gdGhpcy4kc3BsaXRzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSBpZiAoc3BsaXRzID4gdGhpcy4kc3BsaXRzKSB7XG4gICAgICAgICAgICB3aGlsZSAodGhpcy4kc3BsaXRzIDwgdGhpcy4kZWRpdG9ycy5sZW5ndGggJiYgdGhpcy4kc3BsaXRzIDwgc3BsaXRzKSB7XG4gICAgICAgICAgICAgICAgZWRpdG9yID0gdGhpcy4kZWRpdG9yc1t0aGlzLiRzcGxpdHNdO1xuICAgICAgICAgICAgICAgIHRoaXMuJGNvbnRhaW5lci5hcHBlbmRDaGlsZChlZGl0b3IuY29udGFpbmVyKTtcbiAgICAgICAgICAgICAgICBlZGl0b3Iuc2V0Rm9udFNpemUodGhpcy4kZm9udFNpemUpO1xuICAgICAgICAgICAgICAgIHRoaXMuJHNwbGl0cyArKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdoaWxlICh0aGlzLiRzcGxpdHMgPCBzcGxpdHMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRjcmVhdGVFZGl0b3IoKTtcbiAgICAgICAgICAgICAgICB0aGlzLiRzcGxpdHMgKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3aGlsZSAodGhpcy4kc3BsaXRzID4gc3BsaXRzKSB7XG4gICAgICAgICAgICAgICAgZWRpdG9yID0gdGhpcy4kZWRpdG9yc1t0aGlzLiRzcGxpdHMgLSAxXTtcbiAgICAgICAgICAgICAgICB0aGlzLiRjb250YWluZXIucmVtb3ZlQ2hpbGQoZWRpdG9yLmNvbnRhaW5lcik7XG4gICAgICAgICAgICAgICAgdGhpcy4kc3BsaXRzIC0tO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVzaXplKCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIFJldHVybnMgdGhlIG51bWJlciBvZiBzcGxpdHMuXG4gICAgICogQHJldHVybnMge051bWJlcn1cbiAgICAgKiBAdGhpcyB7SVNwbGl0fVxuICAgICAqKi9cbiAgICB0aGlzLmdldFNwbGl0cyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kc3BsaXRzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gaWR4IFRoZSBpbmRleCBvZiB0aGUgZWRpdG9yIHlvdSB3YW50XG4gICAgICpcbiAgICAgKiBSZXR1cm5zIHRoZSBlZGl0b3IgaWRlbnRpZmllZCBieSB0aGUgaW5kZXggYGlkeGAuXG4gICAgICogQHRoaXMge0lTcGxpdH1cbiAgICAgKiovXG4gICAgdGhpcy5nZXRFZGl0b3IgPSBmdW5jdGlvbihpZHgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGVkaXRvcnNbaWR4XTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogUmV0dXJucyB0aGUgY3VycmVudCBlZGl0b3IuXG4gICAgICogQHJldHVybnMge0VkaXRvcn1cbiAgICAgKiBAdGhpcyB7SVNwbGl0fVxuICAgICAqKi9cbiAgICB0aGlzLmdldEN1cnJlbnRFZGl0b3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGNFZGl0b3I7XG4gICAgfTtcblxuICAgIC8qKiBcbiAgICAgKiBGb2N1c2VzIHRoZSBjdXJyZW50IGVkaXRvci5cbiAgICAgKiBAcmVsYXRlZCBFZGl0b3IuZm9jdXNcbiAgICAgKiBAdGhpcyB7SVNwbGl0fVxuICAgICAqKi9cbiAgICB0aGlzLmZvY3VzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuJGNFZGl0b3IuZm9jdXMoKTtcbiAgICB9O1xuXG4gICAgLyoqIFxuICAgICAqIEJsdXJzIHRoZSBjdXJyZW50IGVkaXRvci5cbiAgICAgKiBAcmVsYXRlZCBFZGl0b3IuYmx1clxuICAgICAqIEB0aGlzIHtJU3BsaXR9XG4gICAgICoqL1xuICAgIHRoaXMuYmx1ciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLiRjRWRpdG9yLmJsdXIoKTtcbiAgICB9O1xuXG4gICAgLyoqIFxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB0aGVtZSBUaGUgbmFtZSBvZiB0aGUgdGhlbWUgdG8gc2V0XG4gICAgICogXG4gICAgICogU2V0cyBhIHRoZW1lIGZvciBlYWNoIG9mIHRoZSBhdmFpbGFibGUgZWRpdG9ycy5cbiAgICAgKiBAcmVsYXRlZCBFZGl0b3Iuc2V0VGhlbWVcbiAgICAgKiBAdGhpcyB7SVNwbGl0fVxuICAgICAqKi9cbiAgICB0aGlzLnNldFRoZW1lID0gZnVuY3Rpb24odGhlbWUpIHtcbiAgICAgICAgdGhpcy4kZWRpdG9ycy5mb3JFYWNoKGZ1bmN0aW9uKGVkaXRvcikge1xuICAgICAgICAgICAgZWRpdG9yLnNldFRoZW1lKHRoZW1lKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8qKiBcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5YmluZGluZyBcbiAgICAgKiBcbiAgICAgKiBTZXRzIHRoZSBrZXlib2FyZCBoYW5kbGVyIGZvciB0aGUgZWRpdG9yLlxuICAgICAqIEByZWxhdGVkIGVkaXRvci5zZXRLZXlib2FyZEhhbmRsZXJcbiAgICAgKiBAdGhpcyB7SVNwbGl0fVxuICAgICAqKi9cbiAgICB0aGlzLnNldEtleWJvYXJkSGFuZGxlciA9IGZ1bmN0aW9uKGtleWJpbmRpbmcpIHtcbiAgICAgICAgdGhpcy4kZWRpdG9ycy5mb3JFYWNoKGZ1bmN0aW9uKGVkaXRvcikge1xuICAgICAgICAgICAgZWRpdG9yLnNldEtleWJvYXJkSGFuZGxlcihrZXliaW5kaW5nKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8qKiBcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBBIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGV4ZWN1dGVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc2NvcGUgVGhlIGRlZmF1bHQgc2NvcGUgZm9yIHRoZSBjYWxsYmFja1xuICAgICAqIFxuICAgICAqIEV4ZWN1dGVzIGBjYWxsYmFja2Agb24gYWxsIG9mIHRoZSBhdmFpbGFibGUgZWRpdG9ycy4gXG4gICAgICogQHRoaXMge0lTcGxpdH1cbiAgICAgKiovXG4gICAgdGhpcy5mb3JFYWNoID0gZnVuY3Rpb24oY2FsbGJhY2ssIHNjb3BlKSB7XG4gICAgICAgIHRoaXMuJGVkaXRvcnMuZm9yRWFjaChjYWxsYmFjaywgc2NvcGUpO1xuICAgIH07XG5cblxuICAgIHRoaXMuJGZvbnRTaXplID0gXCJcIjtcbiAgICAvKiogXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHNpemUgVGhlIG5ldyBmb250IHNpemVcbiAgICAgKiBcbiAgICAgKiBTZXRzIHRoZSBmb250IHNpemUsIGluIHBpeGVscywgZm9yIGFsbCB0aGUgYXZhaWxhYmxlIGVkaXRvcnMuXG4gICAgICogQHRoaXMge0lTcGxpdH1cbiAgICAgKiovXG4gICAgdGhpcy5zZXRGb250U2l6ZSA9IGZ1bmN0aW9uKHNpemUpIHtcbiAgICAgICAgdGhpcy4kZm9udFNpemUgPSBzaXplO1xuICAgICAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24oZWRpdG9yKSB7XG4gICAgICAgICAgIGVkaXRvci5zZXRGb250U2l6ZShzaXplKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7RWRpdFNlc3Npb259IHNlc3Npb25cbiAgICAgKiBAcmV0dXJuIHtFZGl0U2Vzc2lvbn1cbiAgICAgKi9cbiAgICB0aGlzLiRjbG9uZVNlc3Npb24gPSBmdW5jdGlvbihzZXNzaW9uKSB7XG4gICAgICAgIHZhciBzID0gbmV3IEVkaXRTZXNzaW9uKHNlc3Npb24uZ2V0RG9jdW1lbnQoKSwgc2Vzc2lvbi5nZXRNb2RlKCkpO1xuXG4gICAgICAgIHZhciB1bmRvTWFuYWdlciA9IHNlc3Npb24uZ2V0VW5kb01hbmFnZXIoKTtcbiAgICAgICAgcy5zZXRVbmRvTWFuYWdlcih1bmRvTWFuYWdlcik7XG5cbiAgICAgICAgLy8gQ29weSBvdmVyICdzZXR0aW5ncycgZnJvbSB0aGUgc2Vzc2lvbi5cbiAgICAgICAgcy5zZXRUYWJTaXplKHNlc3Npb24uZ2V0VGFiU2l6ZSgpKTtcbiAgICAgICAgcy5zZXRVc2VTb2Z0VGFicyhzZXNzaW9uLmdldFVzZVNvZnRUYWJzKCkpO1xuICAgICAgICBzLnNldE92ZXJ3cml0ZShzZXNzaW9uLmdldE92ZXJ3cml0ZSgpKTtcbiAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvciBUT0RPOiBzdHJpbmdbXSAhPSBudW1iZXJbXVxuICAgICAgICBzLnNldEJyZWFrcG9pbnRzKHNlc3Npb24uZ2V0QnJlYWtwb2ludHMoKSk7XG4gICAgICAgIHMuc2V0VXNlV3JhcE1vZGUoc2Vzc2lvbi5nZXRVc2VXcmFwTW9kZSgpKTtcbiAgICAgICAgcy5zZXRVc2VXb3JrZXIoc2Vzc2lvbi5nZXRVc2VXb3JrZXIoKSk7XG4gICAgICAgIHMuc2V0V3JhcExpbWl0UmFuZ2Uoc2Vzc2lvbi4kd3JhcExpbWl0UmFuZ2UubWluLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlc3Npb24uJHdyYXBMaW1pdFJhbmdlLm1heCk7XG4gICAgICAgIHMuJGZvbGREYXRhID0gc2Vzc2lvbi4kY2xvbmVGb2xkRGF0YSgpO1xuXG4gICAgICAgIHJldHVybiBzO1xuICAgIH07XG5cbiAgIC8qKiBcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0VkaXRTZXNzaW9ufSBzZXNzaW9uIFRoZSBuZXcgZWRpdCBzZXNzaW9uXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGlkeCBUaGUgZWRpdG9yJ3MgaW5kZXggeW91J3JlIGludGVyZXN0ZWQgaW5cbiAgICAgKiBcbiAgICAgKiBTZXRzIGEgbmV3IFtbRWRpdFNlc3Npb24gYEVkaXRTZXNzaW9uYF1dIGZvciB0aGUgaW5kaWNhdGVkIGVkaXRvci5cbiAgICAgKiBAcmVsYXRlZCBFZGl0b3Iuc2V0U2Vzc2lvblxuICAgICAqIEB0aGlzIHtJU3BsaXR9XG4gICAgICoqL1xuICAgIHRoaXMuc2V0U2Vzc2lvbiA9IGZ1bmN0aW9uKHNlc3Npb24sIGlkeCkge1xuICAgICAgICB2YXIgZWRpdG9yO1xuICAgICAgICBpZiAoaWR4ID09IG51bGwpIHtcbiAgICAgICAgICAgIGVkaXRvciA9IHRoaXMuJGNFZGl0b3I7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlZGl0b3IgPSB0aGlzLiRlZGl0b3JzW2lkeF07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDaGVjayBpZiB0aGUgc2Vzc2lvbiBpcyB1c2VkIGFscmVhZHkgYnkgYW55IG9mIHRoZSBlZGl0b3JzIGluIHRoZVxuICAgICAgICAvLyBzcGxpdC4gSWYgaXQgaXMsIHdlIGhhdmUgdG8gY2xvbmUgdGhlIHNlc3Npb24gYXMgdHdvIGVkaXRvcnMgdXNpbmdcbiAgICAgICAgLy8gdGhlIHNhbWUgc2Vzc2lvbiBjYW4gY2F1c2UgdGVycmlibGUgc2lkZSBlZmZlY3RzIChlLmcuIFVuZG9RdWV1ZSBnb2VzXG4gICAgICAgIC8vIHdyb25nKS4gVGhpcyBhbHNvIGdpdmVzIHRoZSB1c2VyIG9mIFNwbGl0IHRoZSBwb3NzaWJpbGl0eSB0byB0cmVhdFxuICAgICAgICAvLyBlYWNoIHNlc3Npb24gb24gZWFjaCBzcGxpdCBlZGl0b3IgZGlmZmVyZW50LlxuICAgICAgICB2YXIgaXNVc2VkID0gdGhpcy4kZWRpdG9ycy5zb21lKGZ1bmN0aW9uKGVkaXRvcikge1xuICAgICAgICAgICByZXR1cm4gZWRpdG9yLnNlc3Npb24gPT09IHNlc3Npb247XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChpc1VzZWQpIHtcbiAgICAgICAgICAgIHNlc3Npb24gPSB0aGlzLiRjbG9uZVNlc3Npb24oc2Vzc2lvbik7XG4gICAgICAgIH1cbiAgICAgICAgZWRpdG9yLnNldFNlc3Npb24oc2Vzc2lvbik7XG5cbiAgICAgICAgLy8gUmV0dXJuIHRoZSBzZXNzaW9uIHNldCBvbiB0aGUgZWRpdG9yLiBUaGlzIG1pZ2h0IGJlIGEgY2xvbmVkIG9uZS5cbiAgICAgICAgcmV0dXJuIHNlc3Npb247XG4gICAgfTtcblxuICAgLyoqIFxuICAgICAqIFxuICAgICAqIFJldHVybnMgdGhlIG9yaWVudGF0aW9uLlxuICAgICAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gICAgICogQHRoaXMge0lTcGxpdH1cbiAgICAgKiovXG4gICAgdGhpcy5nZXRPcmllbnRhdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kb3JpZW50YXRpb247XG4gICAgfTtcblxuICAgLyoqIFxuICAgICAqIFxuICAgICAqIFNldHMgdGhlIG9yaWVudGF0aW9uLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBvcmllbnRhdGlvbiBUaGUgbmV3IG9yaWVudGF0aW9uIHZhbHVlXG4gICAgICogQHRoaXMge0lTcGxpdH1cbiAgICAgKlxuICAgICAqKi9cbiAgICB0aGlzLnNldE9yaWVudGF0aW9uID0gZnVuY3Rpb24ob3JpZW50YXRpb24pIHtcbiAgICAgICAgaWYgKHRoaXMuJG9yaWVudGF0aW9uID09IG9yaWVudGF0aW9uKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy4kb3JpZW50YXRpb24gPSBvcmllbnRhdGlvbjtcbiAgICAgICAgdGhpcy5yZXNpemUoKTtcbiAgICB9O1xuXG4gICAvKiogIFxuICAgICAqIFJlc2l6ZXMgdGhlIGVkaXRvci5cbiAgICAgKiBAdGhpcyB7SVNwbGl0fVxuICAgICAqKi9cbiAgICB0aGlzLnJlc2l6ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgd2lkdGggPSB0aGlzLiRjb250YWluZXIuY2xpZW50V2lkdGg7XG4gICAgICAgIHZhciBoZWlnaHQgPSB0aGlzLiRjb250YWluZXIuY2xpZW50SGVpZ2h0O1xuICAgICAgICB2YXIgZWRpdG9yO1xuXG4gICAgICAgIGlmICh0aGlzLiRvcmllbnRhdGlvbiA9PSB0aGlzLkJFU0lERSkge1xuICAgICAgICAgICAgdmFyIGVkaXRvcldpZHRoID0gd2lkdGggLyB0aGlzLiRzcGxpdHM7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuJHNwbGl0czsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZWRpdG9yID0gdGhpcy4kZWRpdG9yc1tpXTtcbiAgICAgICAgICAgICAgICBlZGl0b3IuY29udGFpbmVyLnN0eWxlLndpZHRoID0gZWRpdG9yV2lkdGggKyBcInB4XCI7XG4gICAgICAgICAgICAgICAgZWRpdG9yLmNvbnRhaW5lci5zdHlsZS50b3AgPSBcIjBweFwiO1xuICAgICAgICAgICAgICAgIGVkaXRvci5jb250YWluZXIuc3R5bGUubGVmdCA9IGkgKiBlZGl0b3JXaWR0aCArIFwicHhcIjtcbiAgICAgICAgICAgICAgICBlZGl0b3IuY29udGFpbmVyLnN0eWxlLmhlaWdodCA9IGhlaWdodCArIFwicHhcIjtcbiAgICAgICAgICAgICAgICBlZGl0b3IucmVzaXplKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgZWRpdG9ySGVpZ2h0ID0gaGVpZ2h0IC8gdGhpcy4kc3BsaXRzO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLiRzcGxpdHM7IGkrKykge1xuICAgICAgICAgICAgICAgIGVkaXRvciA9IHRoaXMuJGVkaXRvcnNbaV07XG4gICAgICAgICAgICAgICAgZWRpdG9yLmNvbnRhaW5lci5zdHlsZS53aWR0aCA9IHdpZHRoICsgXCJweFwiO1xuICAgICAgICAgICAgICAgIGVkaXRvci5jb250YWluZXIuc3R5bGUudG9wID0gaSAqIGVkaXRvckhlaWdodCArIFwicHhcIjtcbiAgICAgICAgICAgICAgICBlZGl0b3IuY29udGFpbmVyLnN0eWxlLmxlZnQgPSBcIjBweFwiO1xuICAgICAgICAgICAgICAgIGVkaXRvci5jb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gZWRpdG9ySGVpZ2h0ICsgXCJweFwiO1xuICAgICAgICAgICAgICAgIGVkaXRvci5yZXNpemUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbn0pLmNhbGwoU3BsaXQucHJvdG90eXBlKTtcblxuZXhwb3J0cy5TcGxpdCA9IFNwbGl0O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9