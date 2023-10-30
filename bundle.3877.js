"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[3877],{

/***/ 3877:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/**
 * this is experimental, and subject to change, use at your own risk!
 */
module.exports = __webpack_require__(33598);


/***/ }),

/***/ 33598:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var lang = __webpack_require__(20124);
var EventEmitter = (__webpack_require__(23056)/* .EventEmitter */ .v);

var Editor = (__webpack_require__(82880)/* .Editor */ .M);
var Renderer = (__webpack_require__(63049)/* .VirtualRenderer */ ._);
var EditSession = (__webpack_require__(66480)/* .EditSession */ .m);

/** 
 * @class Split
 *
 **/


var Split = function(container, theme, splits) {
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
     **/
    this.getSplits = function() {
        return this.$splits;
    };

    /**
     * @param {Number} idx The index of the editor you want
     *
     * Returns the editor identified by the index `idx`.
     *
     **/
    this.getEditor = function(idx) {
        return this.$editors[idx];
    };

    /**
     * 
     * Returns the current editor.
     * @returns {Editor}
     **/
    this.getCurrentEditor = function() {
        return this.$cEditor;
    };

    /** 
     * Focuses the current editor.
     * @related Editor.focus
     **/
    this.focus = function() {
        this.$cEditor.focus();
    };

    /** 
     * Blurs the current editor.
     * @related Editor.blur
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
     *
     **/
    this.forEach = function(callback, scope) {
        this.$editors.forEach(callback, scope);
    };


    this.$fontSize = "";
    /** 
     * @param {Number} size The new font size
     * 
     * Sets the font size, in pixels, for all the available editors.
     *
     **/
    this.setFontSize = function(size) {
        this.$fontSize = size;
        this.forEach(function(editor) {
           editor.setFontSize(size);
        });
    };

    this.$cloneSession = function(session) {
        var s = new EditSession(session.getDocument(), session.getMode());

        var undoManager = session.getUndoManager();
        s.setUndoManager(undoManager);

        // Copy over 'settings' from the session.
        s.setTabSize(session.getTabSize());
        s.setUseSoftTabs(session.getUseSoftTabs());
        s.setOverwrite(session.getOverwrite());
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
     **/
    this.getOrientation = function() {
        return this.$orientation;
    };

   /** 
     * 
     * Sets the orientation.
     * @param {Number} orientation The new orientation value
     *
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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ZXh0L3NwbGl0LmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL3NwbGl0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG4vKipcbiAqIHRoaXMgaXMgZXhwZXJpbWVudGFsLCBhbmQgc3ViamVjdCB0byBjaGFuZ2UsIHVzZSBhdCB5b3VyIG93biByaXNrIVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi9zcGxpdFwiKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4vbGliL29vcFwiKTtcbnZhciBsYW5nID0gcmVxdWlyZShcIi4vbGliL2xhbmdcIik7XG52YXIgRXZlbnRFbWl0dGVyID0gcmVxdWlyZShcIi4vbGliL2V2ZW50X2VtaXR0ZXJcIikuRXZlbnRFbWl0dGVyO1xuXG52YXIgRWRpdG9yID0gcmVxdWlyZShcIi4vZWRpdG9yXCIpLkVkaXRvcjtcbnZhciBSZW5kZXJlciA9IHJlcXVpcmUoXCIuL3ZpcnR1YWxfcmVuZGVyZXJcIikuVmlydHVhbFJlbmRlcmVyO1xudmFyIEVkaXRTZXNzaW9uID0gcmVxdWlyZShcIi4vZWRpdF9zZXNzaW9uXCIpLkVkaXRTZXNzaW9uO1xuXG4vKiogXG4gKiBAY2xhc3MgU3BsaXRcbiAqXG4gKiovXG5cblxudmFyIFNwbGl0ID0gZnVuY3Rpb24oY29udGFpbmVyLCB0aGVtZSwgc3BsaXRzKSB7XG4gICAgdGhpcy5CRUxPVyA9IDE7XG4gICAgdGhpcy5CRVNJREUgPSAwO1xuXG4gICAgdGhpcy4kY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgIHRoaXMuJHRoZW1lID0gdGhlbWU7XG4gICAgdGhpcy4kc3BsaXRzID0gMDtcbiAgICB0aGlzLiRlZGl0b3JDU1MgPSBcIlwiO1xuICAgIHRoaXMuJGVkaXRvcnMgPSBbXTtcbiAgICB0aGlzLiRvcmllbnRhdGlvbiA9IHRoaXMuQkVTSURFO1xuXG4gICAgdGhpcy5zZXRTcGxpdHMoc3BsaXRzIHx8IDEpO1xuICAgIHRoaXMuJGNFZGl0b3IgPSB0aGlzLiRlZGl0b3JzWzBdO1xuXG5cbiAgICB0aGlzLm9uKFwiZm9jdXNcIiwgZnVuY3Rpb24oZWRpdG9yKSB7XG4gICAgICAgIHRoaXMuJGNFZGl0b3IgPSBlZGl0b3I7XG4gICAgfS5iaW5kKHRoaXMpKTtcbn07XG5cbihmdW5jdGlvbigpe1xuXG4gICAgb29wLmltcGxlbWVudCh0aGlzLCBFdmVudEVtaXR0ZXIpO1xuXG4gICAgdGhpcy4kY3JlYXRlRWRpdG9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGVsLmNsYXNzTmFtZSA9IHRoaXMuJGVkaXRvckNTUztcbiAgICAgICAgZWwuc3R5bGUuY3NzVGV4dCA9IFwicG9zaXRpb246IGFic29sdXRlOyB0b3A6MHB4OyBib3R0b206MHB4XCI7XG4gICAgICAgIHRoaXMuJGNvbnRhaW5lci5hcHBlbmRDaGlsZChlbCk7XG4gICAgICAgIHZhciBlZGl0b3IgPSBuZXcgRWRpdG9yKG5ldyBSZW5kZXJlcihlbCwgdGhpcy4kdGhlbWUpKTtcblxuICAgICAgICBlZGl0b3Iub24oXCJmb2N1c1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMuX2VtaXQoXCJmb2N1c1wiLCBlZGl0b3IpO1xuICAgICAgICB9LmJpbmQodGhpcykpO1xuXG4gICAgICAgIHRoaXMuJGVkaXRvcnMucHVzaChlZGl0b3IpO1xuICAgICAgICBlZGl0b3Iuc2V0Rm9udFNpemUodGhpcy4kZm9udFNpemUpO1xuICAgICAgICByZXR1cm4gZWRpdG9yO1xuICAgIH07XG5cbiAgICB0aGlzLnNldFNwbGl0cyA9IGZ1bmN0aW9uKHNwbGl0cykge1xuICAgICAgICB2YXIgZWRpdG9yO1xuICAgICAgICBpZiAoc3BsaXRzIDwgMSkge1xuICAgICAgICAgICAgdGhyb3cgXCJUaGUgbnVtYmVyIG9mIHNwbGl0cyBoYXZlIHRvIGJlID4gMCFcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzcGxpdHMgPT0gdGhpcy4kc3BsaXRzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSBpZiAoc3BsaXRzID4gdGhpcy4kc3BsaXRzKSB7XG4gICAgICAgICAgICB3aGlsZSAodGhpcy4kc3BsaXRzIDwgdGhpcy4kZWRpdG9ycy5sZW5ndGggJiYgdGhpcy4kc3BsaXRzIDwgc3BsaXRzKSB7XG4gICAgICAgICAgICAgICAgZWRpdG9yID0gdGhpcy4kZWRpdG9yc1t0aGlzLiRzcGxpdHNdO1xuICAgICAgICAgICAgICAgIHRoaXMuJGNvbnRhaW5lci5hcHBlbmRDaGlsZChlZGl0b3IuY29udGFpbmVyKTtcbiAgICAgICAgICAgICAgICBlZGl0b3Iuc2V0Rm9udFNpemUodGhpcy4kZm9udFNpemUpO1xuICAgICAgICAgICAgICAgIHRoaXMuJHNwbGl0cyArKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdoaWxlICh0aGlzLiRzcGxpdHMgPCBzcGxpdHMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRjcmVhdGVFZGl0b3IoKTtcbiAgICAgICAgICAgICAgICB0aGlzLiRzcGxpdHMgKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3aGlsZSAodGhpcy4kc3BsaXRzID4gc3BsaXRzKSB7XG4gICAgICAgICAgICAgICAgZWRpdG9yID0gdGhpcy4kZWRpdG9yc1t0aGlzLiRzcGxpdHMgLSAxXTtcbiAgICAgICAgICAgICAgICB0aGlzLiRjb250YWluZXIucmVtb3ZlQ2hpbGQoZWRpdG9yLmNvbnRhaW5lcik7XG4gICAgICAgICAgICAgICAgdGhpcy4kc3BsaXRzIC0tO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVzaXplKCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIFJldHVybnMgdGhlIG51bWJlciBvZiBzcGxpdHMuXG4gICAgICogQHJldHVybnMge051bWJlcn1cbiAgICAgKiovXG4gICAgdGhpcy5nZXRTcGxpdHMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHNwbGl0cztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGlkeCBUaGUgaW5kZXggb2YgdGhlIGVkaXRvciB5b3Ugd2FudFxuICAgICAqXG4gICAgICogUmV0dXJucyB0aGUgZWRpdG9yIGlkZW50aWZpZWQgYnkgdGhlIGluZGV4IGBpZHhgLlxuICAgICAqXG4gICAgICoqL1xuICAgIHRoaXMuZ2V0RWRpdG9yID0gZnVuY3Rpb24oaWR4KSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRlZGl0b3JzW2lkeF07XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIFJldHVybnMgdGhlIGN1cnJlbnQgZWRpdG9yLlxuICAgICAqIEByZXR1cm5zIHtFZGl0b3J9XG4gICAgICoqL1xuICAgIHRoaXMuZ2V0Q3VycmVudEVkaXRvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kY0VkaXRvcjtcbiAgICB9O1xuXG4gICAgLyoqIFxuICAgICAqIEZvY3VzZXMgdGhlIGN1cnJlbnQgZWRpdG9yLlxuICAgICAqIEByZWxhdGVkIEVkaXRvci5mb2N1c1xuICAgICAqKi9cbiAgICB0aGlzLmZvY3VzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuJGNFZGl0b3IuZm9jdXMoKTtcbiAgICB9O1xuXG4gICAgLyoqIFxuICAgICAqIEJsdXJzIHRoZSBjdXJyZW50IGVkaXRvci5cbiAgICAgKiBAcmVsYXRlZCBFZGl0b3IuYmx1clxuICAgICAqKi9cbiAgICB0aGlzLmJsdXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy4kY0VkaXRvci5ibHVyKCk7XG4gICAgfTtcblxuICAgIC8qKiBcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdGhlbWUgVGhlIG5hbWUgb2YgdGhlIHRoZW1lIHRvIHNldFxuICAgICAqIFxuICAgICAqIFNldHMgYSB0aGVtZSBmb3IgZWFjaCBvZiB0aGUgYXZhaWxhYmxlIGVkaXRvcnMuXG4gICAgICogQHJlbGF0ZWQgRWRpdG9yLnNldFRoZW1lXG4gICAgICoqL1xuICAgIHRoaXMuc2V0VGhlbWUgPSBmdW5jdGlvbih0aGVtZSkge1xuICAgICAgICB0aGlzLiRlZGl0b3JzLmZvckVhY2goZnVuY3Rpb24oZWRpdG9yKSB7XG4gICAgICAgICAgICBlZGl0b3Iuc2V0VGhlbWUodGhlbWUpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgLyoqIFxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBrZXliaW5kaW5nIFxuICAgICAqIFxuICAgICAqIFNldHMgdGhlIGtleWJvYXJkIGhhbmRsZXIgZm9yIHRoZSBlZGl0b3IuXG4gICAgICogQHJlbGF0ZWQgZWRpdG9yLnNldEtleWJvYXJkSGFuZGxlclxuICAgICAqKi9cbiAgICB0aGlzLnNldEtleWJvYXJkSGFuZGxlciA9IGZ1bmN0aW9uKGtleWJpbmRpbmcpIHtcbiAgICAgICAgdGhpcy4kZWRpdG9ycy5mb3JFYWNoKGZ1bmN0aW9uKGVkaXRvcikge1xuICAgICAgICAgICAgZWRpdG9yLnNldEtleWJvYXJkSGFuZGxlcihrZXliaW5kaW5nKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8qKiBcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBBIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGV4ZWN1dGVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc2NvcGUgVGhlIGRlZmF1bHQgc2NvcGUgZm9yIHRoZSBjYWxsYmFja1xuICAgICAqIFxuICAgICAqIEV4ZWN1dGVzIGBjYWxsYmFja2Agb24gYWxsIG9mIHRoZSBhdmFpbGFibGUgZWRpdG9ycy4gXG4gICAgICpcbiAgICAgKiovXG4gICAgdGhpcy5mb3JFYWNoID0gZnVuY3Rpb24oY2FsbGJhY2ssIHNjb3BlKSB7XG4gICAgICAgIHRoaXMuJGVkaXRvcnMuZm9yRWFjaChjYWxsYmFjaywgc2NvcGUpO1xuICAgIH07XG5cblxuICAgIHRoaXMuJGZvbnRTaXplID0gXCJcIjtcbiAgICAvKiogXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHNpemUgVGhlIG5ldyBmb250IHNpemVcbiAgICAgKiBcbiAgICAgKiBTZXRzIHRoZSBmb250IHNpemUsIGluIHBpeGVscywgZm9yIGFsbCB0aGUgYXZhaWxhYmxlIGVkaXRvcnMuXG4gICAgICpcbiAgICAgKiovXG4gICAgdGhpcy5zZXRGb250U2l6ZSA9IGZ1bmN0aW9uKHNpemUpIHtcbiAgICAgICAgdGhpcy4kZm9udFNpemUgPSBzaXplO1xuICAgICAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24oZWRpdG9yKSB7XG4gICAgICAgICAgIGVkaXRvci5zZXRGb250U2l6ZShzaXplKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMuJGNsb25lU2Vzc2lvbiA9IGZ1bmN0aW9uKHNlc3Npb24pIHtcbiAgICAgICAgdmFyIHMgPSBuZXcgRWRpdFNlc3Npb24oc2Vzc2lvbi5nZXREb2N1bWVudCgpLCBzZXNzaW9uLmdldE1vZGUoKSk7XG5cbiAgICAgICAgdmFyIHVuZG9NYW5hZ2VyID0gc2Vzc2lvbi5nZXRVbmRvTWFuYWdlcigpO1xuICAgICAgICBzLnNldFVuZG9NYW5hZ2VyKHVuZG9NYW5hZ2VyKTtcblxuICAgICAgICAvLyBDb3B5IG92ZXIgJ3NldHRpbmdzJyBmcm9tIHRoZSBzZXNzaW9uLlxuICAgICAgICBzLnNldFRhYlNpemUoc2Vzc2lvbi5nZXRUYWJTaXplKCkpO1xuICAgICAgICBzLnNldFVzZVNvZnRUYWJzKHNlc3Npb24uZ2V0VXNlU29mdFRhYnMoKSk7XG4gICAgICAgIHMuc2V0T3ZlcndyaXRlKHNlc3Npb24uZ2V0T3ZlcndyaXRlKCkpO1xuICAgICAgICBzLnNldEJyZWFrcG9pbnRzKHNlc3Npb24uZ2V0QnJlYWtwb2ludHMoKSk7XG4gICAgICAgIHMuc2V0VXNlV3JhcE1vZGUoc2Vzc2lvbi5nZXRVc2VXcmFwTW9kZSgpKTtcbiAgICAgICAgcy5zZXRVc2VXb3JrZXIoc2Vzc2lvbi5nZXRVc2VXb3JrZXIoKSk7XG4gICAgICAgIHMuc2V0V3JhcExpbWl0UmFuZ2Uoc2Vzc2lvbi4kd3JhcExpbWl0UmFuZ2UubWluLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlc3Npb24uJHdyYXBMaW1pdFJhbmdlLm1heCk7XG4gICAgICAgIHMuJGZvbGREYXRhID0gc2Vzc2lvbi4kY2xvbmVGb2xkRGF0YSgpO1xuXG4gICAgICAgIHJldHVybiBzO1xuICAgIH07XG5cbiAgIC8qKiBcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0VkaXRTZXNzaW9ufSBzZXNzaW9uIFRoZSBuZXcgZWRpdCBzZXNzaW9uXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGlkeCBUaGUgZWRpdG9yJ3MgaW5kZXggeW91J3JlIGludGVyZXN0ZWQgaW5cbiAgICAgKiBcbiAgICAgKiBTZXRzIGEgbmV3IFtbRWRpdFNlc3Npb24gYEVkaXRTZXNzaW9uYF1dIGZvciB0aGUgaW5kaWNhdGVkIGVkaXRvci5cbiAgICAgKiBAcmVsYXRlZCBFZGl0b3Iuc2V0U2Vzc2lvblxuICAgICAqKi9cbiAgICB0aGlzLnNldFNlc3Npb24gPSBmdW5jdGlvbihzZXNzaW9uLCBpZHgpIHtcbiAgICAgICAgdmFyIGVkaXRvcjtcbiAgICAgICAgaWYgKGlkeCA9PSBudWxsKSB7XG4gICAgICAgICAgICBlZGl0b3IgPSB0aGlzLiRjRWRpdG9yO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZWRpdG9yID0gdGhpcy4kZWRpdG9yc1tpZHhdO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIHNlc3Npb24gaXMgdXNlZCBhbHJlYWR5IGJ5IGFueSBvZiB0aGUgZWRpdG9ycyBpbiB0aGVcbiAgICAgICAgLy8gc3BsaXQuIElmIGl0IGlzLCB3ZSBoYXZlIHRvIGNsb25lIHRoZSBzZXNzaW9uIGFzIHR3byBlZGl0b3JzIHVzaW5nXG4gICAgICAgIC8vIHRoZSBzYW1lIHNlc3Npb24gY2FuIGNhdXNlIHRlcnJpYmxlIHNpZGUgZWZmZWN0cyAoZS5nLiBVbmRvUXVldWUgZ29lc1xuICAgICAgICAvLyB3cm9uZykuIFRoaXMgYWxzbyBnaXZlcyB0aGUgdXNlciBvZiBTcGxpdCB0aGUgcG9zc2liaWxpdHkgdG8gdHJlYXRcbiAgICAgICAgLy8gZWFjaCBzZXNzaW9uIG9uIGVhY2ggc3BsaXQgZWRpdG9yIGRpZmZlcmVudC5cbiAgICAgICAgdmFyIGlzVXNlZCA9IHRoaXMuJGVkaXRvcnMuc29tZShmdW5jdGlvbihlZGl0b3IpIHtcbiAgICAgICAgICAgcmV0dXJuIGVkaXRvci5zZXNzaW9uID09PSBzZXNzaW9uO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoaXNVc2VkKSB7XG4gICAgICAgICAgICBzZXNzaW9uID0gdGhpcy4kY2xvbmVTZXNzaW9uKHNlc3Npb24pO1xuICAgICAgICB9XG4gICAgICAgIGVkaXRvci5zZXRTZXNzaW9uKHNlc3Npb24pO1xuXG4gICAgICAgIC8vIFJldHVybiB0aGUgc2Vzc2lvbiBzZXQgb24gdGhlIGVkaXRvci4gVGhpcyBtaWdodCBiZSBhIGNsb25lZCBvbmUuXG4gICAgICAgIHJldHVybiBzZXNzaW9uO1xuICAgIH07XG5cbiAgIC8qKiBcbiAgICAgKiBcbiAgICAgKiBSZXR1cm5zIHRoZSBvcmllbnRhdGlvbi5cbiAgICAgKiBAcmV0dXJucyB7TnVtYmVyfVxuICAgICAqKi9cbiAgICB0aGlzLmdldE9yaWVudGF0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRvcmllbnRhdGlvbjtcbiAgICB9O1xuXG4gICAvKiogXG4gICAgICogXG4gICAgICogU2V0cyB0aGUgb3JpZW50YXRpb24uXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG9yaWVudGF0aW9uIFRoZSBuZXcgb3JpZW50YXRpb24gdmFsdWVcbiAgICAgKlxuICAgICAqXG4gICAgICoqL1xuICAgIHRoaXMuc2V0T3JpZW50YXRpb24gPSBmdW5jdGlvbihvcmllbnRhdGlvbikge1xuICAgICAgICBpZiAodGhpcy4kb3JpZW50YXRpb24gPT0gb3JpZW50YXRpb24pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLiRvcmllbnRhdGlvbiA9IG9yaWVudGF0aW9uO1xuICAgICAgICB0aGlzLnJlc2l6ZSgpO1xuICAgIH07XG5cbiAgIC8qKiAgXG4gICAgICogUmVzaXplcyB0aGUgZWRpdG9yLlxuICAgICAqKi9cbiAgICB0aGlzLnJlc2l6ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgd2lkdGggPSB0aGlzLiRjb250YWluZXIuY2xpZW50V2lkdGg7XG4gICAgICAgIHZhciBoZWlnaHQgPSB0aGlzLiRjb250YWluZXIuY2xpZW50SGVpZ2h0O1xuICAgICAgICB2YXIgZWRpdG9yO1xuXG4gICAgICAgIGlmICh0aGlzLiRvcmllbnRhdGlvbiA9PSB0aGlzLkJFU0lERSkge1xuICAgICAgICAgICAgdmFyIGVkaXRvcldpZHRoID0gd2lkdGggLyB0aGlzLiRzcGxpdHM7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuJHNwbGl0czsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZWRpdG9yID0gdGhpcy4kZWRpdG9yc1tpXTtcbiAgICAgICAgICAgICAgICBlZGl0b3IuY29udGFpbmVyLnN0eWxlLndpZHRoID0gZWRpdG9yV2lkdGggKyBcInB4XCI7XG4gICAgICAgICAgICAgICAgZWRpdG9yLmNvbnRhaW5lci5zdHlsZS50b3AgPSBcIjBweFwiO1xuICAgICAgICAgICAgICAgIGVkaXRvci5jb250YWluZXIuc3R5bGUubGVmdCA9IGkgKiBlZGl0b3JXaWR0aCArIFwicHhcIjtcbiAgICAgICAgICAgICAgICBlZGl0b3IuY29udGFpbmVyLnN0eWxlLmhlaWdodCA9IGhlaWdodCArIFwicHhcIjtcbiAgICAgICAgICAgICAgICBlZGl0b3IucmVzaXplKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgZWRpdG9ySGVpZ2h0ID0gaGVpZ2h0IC8gdGhpcy4kc3BsaXRzO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLiRzcGxpdHM7IGkrKykge1xuICAgICAgICAgICAgICAgIGVkaXRvciA9IHRoaXMuJGVkaXRvcnNbaV07XG4gICAgICAgICAgICAgICAgZWRpdG9yLmNvbnRhaW5lci5zdHlsZS53aWR0aCA9IHdpZHRoICsgXCJweFwiO1xuICAgICAgICAgICAgICAgIGVkaXRvci5jb250YWluZXIuc3R5bGUudG9wID0gaSAqIGVkaXRvckhlaWdodCArIFwicHhcIjtcbiAgICAgICAgICAgICAgICBlZGl0b3IuY29udGFpbmVyLnN0eWxlLmxlZnQgPSBcIjBweFwiO1xuICAgICAgICAgICAgICAgIGVkaXRvci5jb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gZWRpdG9ySGVpZ2h0ICsgXCJweFwiO1xuICAgICAgICAgICAgICAgIGVkaXRvci5yZXNpemUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbn0pLmNhbGwoU3BsaXQucHJvdG90eXBlKTtcblxuZXhwb3J0cy5TcGxpdCA9IFNwbGl0O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9