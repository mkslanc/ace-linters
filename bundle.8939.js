"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[8939],{

/***/ 58939:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjg5MzkuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0EsMENBQW9DOzs7Ozs7OztBQ0x2Qjs7QUFFYixVQUFVLG1CQUFPLENBQUMsSUFBVztBQUM3QixXQUFXLG1CQUFPLENBQUMsS0FBWTtBQUMvQixtQkFBbUIseUNBQTJDO0FBQzlELGFBQWEsbUNBQTBCO0FBQ3ZDLGVBQWUsNENBQTZDO0FBQzVELGtCQUFrQixpREFBcUM7O0FBRXZEO0FBQ0EsYUFBYSw4Q0FBOEMscUJBQXFCO0FBQ2hGOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBLGlCQUFpQjtBQUNqQixjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0QsU0FBUztBQUN6RDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxlQUFlLFFBQVE7QUFDdkI7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBLGVBQWUsVUFBVTtBQUN6QixlQUFlLFFBQVE7QUFDdkI7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBLGVBQWUsYUFBYTtBQUM1QixnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLGFBQWE7QUFDNUIsZUFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsUUFBUTtBQUN2QixjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNEJBQTRCLGtCQUFrQjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBLDRCQUE0QixrQkFBa0I7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUM7O0FBRUQsYUFBYSIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL2V4dC9zcGxpdC5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9zcGxpdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuLyoqXG4gKiB0aGlzIGlzIGV4cGVyaW1lbnRhbCwgYW5kIHN1YmplY3QgdG8gY2hhbmdlLCB1c2UgYXQgeW91ciBvd24gcmlzayFcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vc3BsaXRcIik7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuL2xpYi9vb3BcIik7XG52YXIgbGFuZyA9IHJlcXVpcmUoXCIuL2xpYi9sYW5nXCIpO1xudmFyIEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoXCIuL2xpYi9ldmVudF9lbWl0dGVyXCIpLkV2ZW50RW1pdHRlcjtcbnZhciBFZGl0b3IgPSByZXF1aXJlKFwiLi9lZGl0b3JcIikuRWRpdG9yO1xudmFyIFJlbmRlcmVyID0gcmVxdWlyZShcIi4vdmlydHVhbF9yZW5kZXJlclwiKS5WaXJ0dWFsUmVuZGVyZXI7XG52YXIgRWRpdFNlc3Npb24gPSByZXF1aXJlKFwiLi9lZGl0X3Nlc3Npb25cIikuRWRpdFNlc3Npb247XG5cbi8qKlxuICogQHR5cGVkZWYge2ltcG9ydChcIi4uL2FjZS1pbnRlcm5hbFwiKS5BY2UuRXZlbnRFbWl0dGVyICYge1trZXk6IHN0cmluZ106IGFueX19IElTcGxpdFxuICovXG5cbnZhciBTcGxpdDtcbi8qKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAdGhpcyB7SVNwbGl0fVxuICovXG5TcGxpdCA9IGZ1bmN0aW9uKGNvbnRhaW5lciwgdGhlbWUsIHNwbGl0cykge1xuICAgIHRoaXMuQkVMT1cgPSAxO1xuICAgIHRoaXMuQkVTSURFID0gMDtcblxuICAgIHRoaXMuJGNvbnRhaW5lciA9IGNvbnRhaW5lcjtcbiAgICB0aGlzLiR0aGVtZSA9IHRoZW1lO1xuICAgIHRoaXMuJHNwbGl0cyA9IDA7XG4gICAgdGhpcy4kZWRpdG9yQ1NTID0gXCJcIjtcbiAgICB0aGlzLiRlZGl0b3JzID0gW107XG4gICAgdGhpcy4kb3JpZW50YXRpb24gPSB0aGlzLkJFU0lERTtcblxuICAgIHRoaXMuc2V0U3BsaXRzKHNwbGl0cyB8fCAxKTtcbiAgICB0aGlzLiRjRWRpdG9yID0gdGhpcy4kZWRpdG9yc1swXTtcblxuXG4gICAgdGhpcy5vbihcImZvY3VzXCIsIGZ1bmN0aW9uKGVkaXRvcikge1xuICAgICAgICB0aGlzLiRjRWRpdG9yID0gZWRpdG9yO1xuICAgIH0uYmluZCh0aGlzKSk7XG59O1xuXG4oZnVuY3Rpb24oKXtcblxuICAgIG9vcC5pbXBsZW1lbnQodGhpcywgRXZlbnRFbWl0dGVyKTtcblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtFZGl0b3J9XG4gICAgICogQHRoaXMge0lTcGxpdH1cbiAgICAgKi9cbiAgICB0aGlzLiRjcmVhdGVFZGl0b3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgZWwuY2xhc3NOYW1lID0gdGhpcy4kZWRpdG9yQ1NTO1xuICAgICAgICBlbC5zdHlsZS5jc3NUZXh0ID0gXCJwb3NpdGlvbjogYWJzb2x1dGU7IHRvcDowcHg7IGJvdHRvbTowcHhcIjtcbiAgICAgICAgdGhpcy4kY29udGFpbmVyLmFwcGVuZENoaWxkKGVsKTtcbiAgICAgICAgdmFyIGVkaXRvciA9IG5ldyBFZGl0b3IobmV3IFJlbmRlcmVyKGVsLCB0aGlzLiR0aGVtZSkpO1xuXG4gICAgICAgIGVkaXRvci5vbihcImZvY3VzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy5fZW1pdChcImZvY3VzXCIsIGVkaXRvcik7XG4gICAgICAgIH0uYmluZCh0aGlzKSk7XG5cbiAgICAgICAgdGhpcy4kZWRpdG9ycy5wdXNoKGVkaXRvcik7XG4gICAgICAgIGVkaXRvci5zZXRGb250U2l6ZSh0aGlzLiRmb250U2l6ZSk7XG4gICAgICAgIHJldHVybiBlZGl0b3I7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBzcGxpdHNcbiAgICAgKiBAdGhpcyB7SVNwbGl0fVxuICAgICAqL1xuICAgIHRoaXMuc2V0U3BsaXRzID0gZnVuY3Rpb24oc3BsaXRzKSB7XG4gICAgICAgIHZhciBlZGl0b3I7XG4gICAgICAgIGlmIChzcGxpdHMgPCAxKSB7XG4gICAgICAgICAgICB0aHJvdyBcIlRoZSBudW1iZXIgb2Ygc3BsaXRzIGhhdmUgdG8gYmUgPiAwIVwiO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNwbGl0cyA9PSB0aGlzLiRzcGxpdHMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIGlmIChzcGxpdHMgPiB0aGlzLiRzcGxpdHMpIHtcbiAgICAgICAgICAgIHdoaWxlICh0aGlzLiRzcGxpdHMgPCB0aGlzLiRlZGl0b3JzLmxlbmd0aCAmJiB0aGlzLiRzcGxpdHMgPCBzcGxpdHMpIHtcbiAgICAgICAgICAgICAgICBlZGl0b3IgPSB0aGlzLiRlZGl0b3JzW3RoaXMuJHNwbGl0c107XG4gICAgICAgICAgICAgICAgdGhpcy4kY29udGFpbmVyLmFwcGVuZENoaWxkKGVkaXRvci5jb250YWluZXIpO1xuICAgICAgICAgICAgICAgIGVkaXRvci5zZXRGb250U2l6ZSh0aGlzLiRmb250U2l6ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy4kc3BsaXRzICsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2hpbGUgKHRoaXMuJHNwbGl0cyA8IHNwbGl0cykge1xuICAgICAgICAgICAgICAgIHRoaXMuJGNyZWF0ZUVkaXRvcigpO1xuICAgICAgICAgICAgICAgIHRoaXMuJHNwbGl0cyArKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdoaWxlICh0aGlzLiRzcGxpdHMgPiBzcGxpdHMpIHtcbiAgICAgICAgICAgICAgICBlZGl0b3IgPSB0aGlzLiRlZGl0b3JzW3RoaXMuJHNwbGl0cyAtIDFdO1xuICAgICAgICAgICAgICAgIHRoaXMuJGNvbnRhaW5lci5yZW1vdmVDaGlsZChlZGl0b3IuY29udGFpbmVyKTtcbiAgICAgICAgICAgICAgICB0aGlzLiRzcGxpdHMgLS07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZXNpemUoKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIHNwbGl0cy5cbiAgICAgKiBAcmV0dXJucyB7TnVtYmVyfVxuICAgICAqIEB0aGlzIHtJU3BsaXR9XG4gICAgICoqL1xuICAgIHRoaXMuZ2V0U3BsaXRzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRzcGxpdHM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBpZHggVGhlIGluZGV4IG9mIHRoZSBlZGl0b3IgeW91IHdhbnRcbiAgICAgKlxuICAgICAqIFJldHVybnMgdGhlIGVkaXRvciBpZGVudGlmaWVkIGJ5IHRoZSBpbmRleCBgaWR4YC5cbiAgICAgKiBAdGhpcyB7SVNwbGl0fVxuICAgICAqKi9cbiAgICB0aGlzLmdldEVkaXRvciA9IGZ1bmN0aW9uKGlkeCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kZWRpdG9yc1tpZHhdO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBSZXR1cm5zIHRoZSBjdXJyZW50IGVkaXRvci5cbiAgICAgKiBAcmV0dXJucyB7RWRpdG9yfVxuICAgICAqIEB0aGlzIHtJU3BsaXR9XG4gICAgICoqL1xuICAgIHRoaXMuZ2V0Q3VycmVudEVkaXRvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kY0VkaXRvcjtcbiAgICB9O1xuXG4gICAgLyoqIFxuICAgICAqIEZvY3VzZXMgdGhlIGN1cnJlbnQgZWRpdG9yLlxuICAgICAqIEByZWxhdGVkIEVkaXRvci5mb2N1c1xuICAgICAqIEB0aGlzIHtJU3BsaXR9XG4gICAgICoqL1xuICAgIHRoaXMuZm9jdXMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy4kY0VkaXRvci5mb2N1cygpO1xuICAgIH07XG5cbiAgICAvKiogXG4gICAgICogQmx1cnMgdGhlIGN1cnJlbnQgZWRpdG9yLlxuICAgICAqIEByZWxhdGVkIEVkaXRvci5ibHVyXG4gICAgICogQHRoaXMge0lTcGxpdH1cbiAgICAgKiovXG4gICAgdGhpcy5ibHVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuJGNFZGl0b3IuYmx1cigpO1xuICAgIH07XG5cbiAgICAvKiogXG4gICAgICogXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHRoZW1lIFRoZSBuYW1lIG9mIHRoZSB0aGVtZSB0byBzZXRcbiAgICAgKiBcbiAgICAgKiBTZXRzIGEgdGhlbWUgZm9yIGVhY2ggb2YgdGhlIGF2YWlsYWJsZSBlZGl0b3JzLlxuICAgICAqIEByZWxhdGVkIEVkaXRvci5zZXRUaGVtZVxuICAgICAqIEB0aGlzIHtJU3BsaXR9XG4gICAgICoqL1xuICAgIHRoaXMuc2V0VGhlbWUgPSBmdW5jdGlvbih0aGVtZSkge1xuICAgICAgICB0aGlzLiRlZGl0b3JzLmZvckVhY2goZnVuY3Rpb24oZWRpdG9yKSB7XG4gICAgICAgICAgICBlZGl0b3Iuc2V0VGhlbWUodGhlbWUpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgLyoqIFxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBrZXliaW5kaW5nIFxuICAgICAqIFxuICAgICAqIFNldHMgdGhlIGtleWJvYXJkIGhhbmRsZXIgZm9yIHRoZSBlZGl0b3IuXG4gICAgICogQHJlbGF0ZWQgZWRpdG9yLnNldEtleWJvYXJkSGFuZGxlclxuICAgICAqIEB0aGlzIHtJU3BsaXR9XG4gICAgICoqL1xuICAgIHRoaXMuc2V0S2V5Ym9hcmRIYW5kbGVyID0gZnVuY3Rpb24oa2V5YmluZGluZykge1xuICAgICAgICB0aGlzLiRlZGl0b3JzLmZvckVhY2goZnVuY3Rpb24oZWRpdG9yKSB7XG4gICAgICAgICAgICBlZGl0b3Iuc2V0S2V5Ym9hcmRIYW5kbGVyKGtleWJpbmRpbmcpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgLyoqIFxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIEEgY2FsbGJhY2sgZnVuY3Rpb24gdG8gZXhlY3V0ZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzY29wZSBUaGUgZGVmYXVsdCBzY29wZSBmb3IgdGhlIGNhbGxiYWNrXG4gICAgICogXG4gICAgICogRXhlY3V0ZXMgYGNhbGxiYWNrYCBvbiBhbGwgb2YgdGhlIGF2YWlsYWJsZSBlZGl0b3JzLiBcbiAgICAgKiBAdGhpcyB7SVNwbGl0fVxuICAgICAqKi9cbiAgICB0aGlzLmZvckVhY2ggPSBmdW5jdGlvbihjYWxsYmFjaywgc2NvcGUpIHtcbiAgICAgICAgdGhpcy4kZWRpdG9ycy5mb3JFYWNoKGNhbGxiYWNrLCBzY29wZSk7XG4gICAgfTtcblxuXG4gICAgdGhpcy4kZm9udFNpemUgPSBcIlwiO1xuICAgIC8qKiBcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gc2l6ZSBUaGUgbmV3IGZvbnQgc2l6ZVxuICAgICAqIFxuICAgICAqIFNldHMgdGhlIGZvbnQgc2l6ZSwgaW4gcGl4ZWxzLCBmb3IgYWxsIHRoZSBhdmFpbGFibGUgZWRpdG9ycy5cbiAgICAgKiBAdGhpcyB7SVNwbGl0fVxuICAgICAqKi9cbiAgICB0aGlzLnNldEZvbnRTaXplID0gZnVuY3Rpb24oc2l6ZSkge1xuICAgICAgICB0aGlzLiRmb250U2l6ZSA9IHNpemU7XG4gICAgICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbihlZGl0b3IpIHtcbiAgICAgICAgICAgZWRpdG9yLnNldEZvbnRTaXplKHNpemUpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtFZGl0U2Vzc2lvbn0gc2Vzc2lvblxuICAgICAqIEByZXR1cm4ge0VkaXRTZXNzaW9ufVxuICAgICAqL1xuICAgIHRoaXMuJGNsb25lU2Vzc2lvbiA9IGZ1bmN0aW9uKHNlc3Npb24pIHtcbiAgICAgICAgdmFyIHMgPSBuZXcgRWRpdFNlc3Npb24oc2Vzc2lvbi5nZXREb2N1bWVudCgpLCBzZXNzaW9uLmdldE1vZGUoKSk7XG5cbiAgICAgICAgdmFyIHVuZG9NYW5hZ2VyID0gc2Vzc2lvbi5nZXRVbmRvTWFuYWdlcigpO1xuICAgICAgICBzLnNldFVuZG9NYW5hZ2VyKHVuZG9NYW5hZ2VyKTtcblxuICAgICAgICAvLyBDb3B5IG92ZXIgJ3NldHRpbmdzJyBmcm9tIHRoZSBzZXNzaW9uLlxuICAgICAgICBzLnNldFRhYlNpemUoc2Vzc2lvbi5nZXRUYWJTaXplKCkpO1xuICAgICAgICBzLnNldFVzZVNvZnRUYWJzKHNlc3Npb24uZ2V0VXNlU29mdFRhYnMoKSk7XG4gICAgICAgIHMuc2V0T3ZlcndyaXRlKHNlc3Npb24uZ2V0T3ZlcndyaXRlKCkpO1xuICAgICAgICAvLyBAdHMtZXhwZWN0LWVycm9yIFRPRE86IHN0cmluZ1tdICE9IG51bWJlcltdXG4gICAgICAgIHMuc2V0QnJlYWtwb2ludHMoc2Vzc2lvbi5nZXRCcmVha3BvaW50cygpKTtcbiAgICAgICAgcy5zZXRVc2VXcmFwTW9kZShzZXNzaW9uLmdldFVzZVdyYXBNb2RlKCkpO1xuICAgICAgICBzLnNldFVzZVdvcmtlcihzZXNzaW9uLmdldFVzZVdvcmtlcigpKTtcbiAgICAgICAgcy5zZXRXcmFwTGltaXRSYW5nZShzZXNzaW9uLiR3cmFwTGltaXRSYW5nZS5taW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Vzc2lvbi4kd3JhcExpbWl0UmFuZ2UubWF4KTtcbiAgICAgICAgcy4kZm9sZERhdGEgPSBzZXNzaW9uLiRjbG9uZUZvbGREYXRhKCk7XG5cbiAgICAgICAgcmV0dXJuIHM7XG4gICAgfTtcblxuICAgLyoqIFxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7RWRpdFNlc3Npb259IHNlc3Npb24gVGhlIG5ldyBlZGl0IHNlc3Npb25cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gaWR4IFRoZSBlZGl0b3IncyBpbmRleCB5b3UncmUgaW50ZXJlc3RlZCBpblxuICAgICAqIFxuICAgICAqIFNldHMgYSBuZXcgW1tFZGl0U2Vzc2lvbiBgRWRpdFNlc3Npb25gXV0gZm9yIHRoZSBpbmRpY2F0ZWQgZWRpdG9yLlxuICAgICAqIEByZWxhdGVkIEVkaXRvci5zZXRTZXNzaW9uXG4gICAgICogQHRoaXMge0lTcGxpdH1cbiAgICAgKiovXG4gICAgdGhpcy5zZXRTZXNzaW9uID0gZnVuY3Rpb24oc2Vzc2lvbiwgaWR4KSB7XG4gICAgICAgIHZhciBlZGl0b3I7XG4gICAgICAgIGlmIChpZHggPT0gbnVsbCkge1xuICAgICAgICAgICAgZWRpdG9yID0gdGhpcy4kY0VkaXRvcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVkaXRvciA9IHRoaXMuJGVkaXRvcnNbaWR4XTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSBzZXNzaW9uIGlzIHVzZWQgYWxyZWFkeSBieSBhbnkgb2YgdGhlIGVkaXRvcnMgaW4gdGhlXG4gICAgICAgIC8vIHNwbGl0LiBJZiBpdCBpcywgd2UgaGF2ZSB0byBjbG9uZSB0aGUgc2Vzc2lvbiBhcyB0d28gZWRpdG9ycyB1c2luZ1xuICAgICAgICAvLyB0aGUgc2FtZSBzZXNzaW9uIGNhbiBjYXVzZSB0ZXJyaWJsZSBzaWRlIGVmZmVjdHMgKGUuZy4gVW5kb1F1ZXVlIGdvZXNcbiAgICAgICAgLy8gd3JvbmcpLiBUaGlzIGFsc28gZ2l2ZXMgdGhlIHVzZXIgb2YgU3BsaXQgdGhlIHBvc3NpYmlsaXR5IHRvIHRyZWF0XG4gICAgICAgIC8vIGVhY2ggc2Vzc2lvbiBvbiBlYWNoIHNwbGl0IGVkaXRvciBkaWZmZXJlbnQuXG4gICAgICAgIHZhciBpc1VzZWQgPSB0aGlzLiRlZGl0b3JzLnNvbWUoZnVuY3Rpb24oZWRpdG9yKSB7XG4gICAgICAgICAgIHJldHVybiBlZGl0b3Iuc2Vzc2lvbiA9PT0gc2Vzc2lvbjtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGlzVXNlZCkge1xuICAgICAgICAgICAgc2Vzc2lvbiA9IHRoaXMuJGNsb25lU2Vzc2lvbihzZXNzaW9uKTtcbiAgICAgICAgfVxuICAgICAgICBlZGl0b3Iuc2V0U2Vzc2lvbihzZXNzaW9uKTtcblxuICAgICAgICAvLyBSZXR1cm4gdGhlIHNlc3Npb24gc2V0IG9uIHRoZSBlZGl0b3IuIFRoaXMgbWlnaHQgYmUgYSBjbG9uZWQgb25lLlxuICAgICAgICByZXR1cm4gc2Vzc2lvbjtcbiAgICB9O1xuXG4gICAvKiogXG4gICAgICogXG4gICAgICogUmV0dXJucyB0aGUgb3JpZW50YXRpb24uXG4gICAgICogQHJldHVybnMge051bWJlcn1cbiAgICAgKiBAdGhpcyB7SVNwbGl0fVxuICAgICAqKi9cbiAgICB0aGlzLmdldE9yaWVudGF0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRvcmllbnRhdGlvbjtcbiAgICB9O1xuXG4gICAvKiogXG4gICAgICogXG4gICAgICogU2V0cyB0aGUgb3JpZW50YXRpb24uXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG9yaWVudGF0aW9uIFRoZSBuZXcgb3JpZW50YXRpb24gdmFsdWVcbiAgICAgKiBAdGhpcyB7SVNwbGl0fVxuICAgICAqXG4gICAgICoqL1xuICAgIHRoaXMuc2V0T3JpZW50YXRpb24gPSBmdW5jdGlvbihvcmllbnRhdGlvbikge1xuICAgICAgICBpZiAodGhpcy4kb3JpZW50YXRpb24gPT0gb3JpZW50YXRpb24pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLiRvcmllbnRhdGlvbiA9IG9yaWVudGF0aW9uO1xuICAgICAgICB0aGlzLnJlc2l6ZSgpO1xuICAgIH07XG5cbiAgIC8qKiAgXG4gICAgICogUmVzaXplcyB0aGUgZWRpdG9yLlxuICAgICAqIEB0aGlzIHtJU3BsaXR9XG4gICAgICoqL1xuICAgIHRoaXMucmVzaXplID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB3aWR0aCA9IHRoaXMuJGNvbnRhaW5lci5jbGllbnRXaWR0aDtcbiAgICAgICAgdmFyIGhlaWdodCA9IHRoaXMuJGNvbnRhaW5lci5jbGllbnRIZWlnaHQ7XG4gICAgICAgIHZhciBlZGl0b3I7XG5cbiAgICAgICAgaWYgKHRoaXMuJG9yaWVudGF0aW9uID09IHRoaXMuQkVTSURFKSB7XG4gICAgICAgICAgICB2YXIgZWRpdG9yV2lkdGggPSB3aWR0aCAvIHRoaXMuJHNwbGl0cztcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy4kc3BsaXRzOyBpKyspIHtcbiAgICAgICAgICAgICAgICBlZGl0b3IgPSB0aGlzLiRlZGl0b3JzW2ldO1xuICAgICAgICAgICAgICAgIGVkaXRvci5jb250YWluZXIuc3R5bGUud2lkdGggPSBlZGl0b3JXaWR0aCArIFwicHhcIjtcbiAgICAgICAgICAgICAgICBlZGl0b3IuY29udGFpbmVyLnN0eWxlLnRvcCA9IFwiMHB4XCI7XG4gICAgICAgICAgICAgICAgZWRpdG9yLmNvbnRhaW5lci5zdHlsZS5sZWZ0ID0gaSAqIGVkaXRvcldpZHRoICsgXCJweFwiO1xuICAgICAgICAgICAgICAgIGVkaXRvci5jb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0ICsgXCJweFwiO1xuICAgICAgICAgICAgICAgIGVkaXRvci5yZXNpemUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBlZGl0b3JIZWlnaHQgPSBoZWlnaHQgLyB0aGlzLiRzcGxpdHM7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuJHNwbGl0czsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZWRpdG9yID0gdGhpcy4kZWRpdG9yc1tpXTtcbiAgICAgICAgICAgICAgICBlZGl0b3IuY29udGFpbmVyLnN0eWxlLndpZHRoID0gd2lkdGggKyBcInB4XCI7XG4gICAgICAgICAgICAgICAgZWRpdG9yLmNvbnRhaW5lci5zdHlsZS50b3AgPSBpICogZWRpdG9ySGVpZ2h0ICsgXCJweFwiO1xuICAgICAgICAgICAgICAgIGVkaXRvci5jb250YWluZXIuc3R5bGUubGVmdCA9IFwiMHB4XCI7XG4gICAgICAgICAgICAgICAgZWRpdG9yLmNvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSBlZGl0b3JIZWlnaHQgKyBcInB4XCI7XG4gICAgICAgICAgICAgICAgZWRpdG9yLnJlc2l6ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxufSkuY2FsbChTcGxpdC5wcm90b3R5cGUpO1xuXG5leHBvcnRzLlNwbGl0ID0gU3BsaXQ7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=