(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[8534],{

/***/ 88858:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var config = __webpack_require__(76321);
var oop = __webpack_require__(2645);
var HashHandler = (__webpack_require__(93050).HashHandler);
var occurStartCommand = (__webpack_require__(2075)/* .occurStartCommand */ .m);

// These commands can be installed in a normal key handler to start iSearch:
exports.iSearchStartCommands = [{
    name: "iSearch",
    bindKey: {win: "Ctrl-F", mac: "Command-F"},
    exec: function(editor, options) {
        config.loadModule(["core", "ace/incremental_search"], function(e) {
            var iSearch = e.iSearch = e.iSearch || new e.IncrementalSearch();
            iSearch.activate(editor, options.backwards);
            if (options.jumpToFirstMatch) iSearch.next(options);
        });
    },
    readOnly: true
}, {
    name: "iSearchBackwards",
    exec: function(editor, jumpToNext) { editor.execCommand('iSearch', {backwards: true}); },
    readOnly: true
}, {
    name: "iSearchAndGo",
    bindKey: {win: "Ctrl-K", mac: "Command-G"},
    exec: function(editor, jumpToNext) { editor.execCommand('iSearch', {jumpToFirstMatch: true, useCurrentOrPrevSearch: true}); },
    readOnly: true
}, {
    name: "iSearchBackwardsAndGo",
    bindKey: {win: "Ctrl-Shift-K", mac: "Command-Shift-G"},
    exec: function(editor) { editor.execCommand('iSearch', {jumpToFirstMatch: true, backwards: true, useCurrentOrPrevSearch: true}); },
    readOnly: true
}];

// These commands are only available when incremental search mode is active:
exports.iSearchCommands = [{
    name: "restartSearch",
    bindKey: {win: "Ctrl-F", mac: "Command-F"},
    exec: function(iSearch) {
        iSearch.cancelSearch(true);
    }
}, {
    name: "searchForward",
    bindKey: {win: "Ctrl-S|Ctrl-K", mac: "Ctrl-S|Command-G"},
    exec: function(iSearch, options) {
        options.useCurrentOrPrevSearch = true;
        iSearch.next(options);
    }
}, {
    name: "searchBackward",
    bindKey: {win: "Ctrl-R|Ctrl-Shift-K", mac: "Ctrl-R|Command-Shift-G"},
    exec: function(iSearch, options) {
        options.useCurrentOrPrevSearch = true;
        options.backwards = true;
        iSearch.next(options);
    }
}, {
    name: "extendSearchTerm",
    exec: function(iSearch, string) {
        iSearch.addString(string);
    }
}, {
    name: "extendSearchTermSpace",
    bindKey: "space",
    exec: function(iSearch) { iSearch.addString(' '); }
}, {
    name: "shrinkSearchTerm",
    bindKey: "backspace",
    exec: function(iSearch) {
        iSearch.removeChar();
    }
}, {
    name: 'confirmSearch',
    bindKey: 'return',
    exec: function(iSearch) { iSearch.deactivate(); }
}, {
    name: 'cancelSearch',
    bindKey: 'esc|Ctrl-G',
    exec: function(iSearch) { iSearch.deactivate(true); }
}, {
    name: 'occurisearch',
    bindKey: 'Ctrl-O',
    exec: function(iSearch) {
        var options = oop.mixin({}, iSearch.$options);
        iSearch.deactivate();
        occurStartCommand.exec(iSearch.$editor, options);
    }
}, {
    name: "yankNextWord",
    bindKey: "Ctrl-w",
    exec: function(iSearch) {
        var ed = iSearch.$editor,
            range = ed.selection.getRangeOfMovements(function(sel) { sel.moveCursorWordRight(); }),
            string = ed.session.getTextRange(range);
        iSearch.addString(string);
    }
}, {
    name: "yankNextChar",
    bindKey: "Ctrl-Alt-y",
    exec: function(iSearch) {
        var ed = iSearch.$editor,
            range = ed.selection.getRangeOfMovements(function(sel) { sel.moveCursorRight(); }),
            string = ed.session.getTextRange(range);
        iSearch.addString(string);
    }
}, {
    name: 'recenterTopBottom',
    bindKey: 'Ctrl-l',
    exec: function(iSearch) { iSearch.$editor.execCommand('recenterTopBottom'); }
}, {
    name: 'selectAllMatches',
    bindKey: 'Ctrl-space',
    exec: function(iSearch) {
        var ed = iSearch.$editor,
            hl = ed.session.$isearchHighlight,
            ranges = hl && hl.cache ? hl.cache
                .reduce(function(ranges, ea) {
                    return ranges.concat(ea ? ea : []); }, []) : [];
        iSearch.deactivate(false);
        ranges.forEach(ed.selection.addRange.bind(ed.selection));
    }
}, {
    name: 'searchAsRegExp',
    bindKey: 'Alt-r',
    exec: function(iSearch) {
        iSearch.convertNeedleToRegExp();
    }
}].map(function(cmd) {
    cmd.readOnly = true;
    cmd.isIncrementalSearchCommand = true;
    cmd.scrollIntoView = "animate-cursor";
    return cmd;
});

function IncrementalSearchKeyboardHandler(iSearch) {
    this.$iSearch = iSearch;
}

oop.inherits(IncrementalSearchKeyboardHandler, HashHandler);

(function() {
    /**
     * @param editor
     * @this {IncrementalSearchKeyboardHandler & this & {$commandExecHandler}}
     */
    this.attach = function(editor) {
        var iSearch = this.$iSearch;
        HashHandler.call(this, exports.iSearchCommands, editor.commands.platform);
        this.$commandExecHandler = editor.commands.on('exec', function(e) {
            if (!e.command.isIncrementalSearchCommand)
                return iSearch.deactivate();
            e.stopPropagation();
            e.preventDefault();
            var scrollTop = editor.session.getScrollTop();
            var result = e.command.exec(iSearch, e.args || {});
            editor.renderer.scrollCursorIntoView(null, 0.5);
            editor.renderer.animateScrolling(scrollTop);
            return result;
        });
    };

    /**
     * @this {IncrementalSearchKeyboardHandler & this & {$commandExecHandler}}
     * @param editor
     */
    this.detach = function(editor) {
        if (!this.$commandExecHandler) return;
        editor.commands.off('exec', this.$commandExecHandler);
        delete this.$commandExecHandler;
    };

    var handleKeyboard$super = this.handleKeyboard;
    /**
     * @param data
     * @param hashId
     * @param key
     * @param keyCode
     * @this {IncrementalSearchKeyboardHandler & import("../keyboard/hash_handler").HashHandler}
     */
    this.handleKeyboard = function(data, hashId, key, keyCode) {
        if (((hashId === 1/*ctrl*/ || hashId === 8/*command*/) && key === 'v')
         || (hashId === 1/*ctrl*/ && key === 'y')) return null;
        // @ts-ignore
        var cmd = handleKeyboard$super.call(this, data, hashId, key, keyCode);
        if (cmd && cmd.command) { return cmd; }
        if (hashId == -1) {
            var extendCmd = this.commands.extendSearchTerm;
            if (extendCmd) { return {command: extendCmd, args: key}; }
        }
        return false;
    };

}).call(IncrementalSearchKeyboardHandler.prototype);


exports.IncrementalSearchKeyboardHandler = IncrementalSearchKeyboardHandler;


/***/ }),

/***/ 2075:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var config = __webpack_require__(76321),
    Occur = (__webpack_require__(8151)/* .Occur */ .D);

// These commands can be installed in a normal command handler to start occur:
var occurStartCommand = {
    name: "occur",
    exec: function(editor, options) {
        var alreadyInOccur = !!editor.session.$occur;
        var occurSessionActive = new Occur().enter(editor, options);
        if (occurSessionActive && !alreadyInOccur)
            OccurKeyboardHandler.installIn(editor);
    },
    readOnly: true
};

var occurCommands = [{
    name: "occurexit",
    bindKey: 'esc|Ctrl-G',
    exec: function(editor) {
        var occur = editor.session.$occur;
        if (!occur) return;
        occur.exit(editor, {});
        if (!editor.session.$occur) OccurKeyboardHandler.uninstallFrom(editor);
    },
    readOnly: true
}, {
    name: "occuraccept",
    bindKey: 'enter',
    exec: function(editor) {
        var occur = editor.session.$occur;
        if (!occur) return;
        occur.exit(editor, {translatePosition: true});
        if (!editor.session.$occur) OccurKeyboardHandler.uninstallFrom(editor);
    },
    readOnly: true
}];

var HashHandler = (__webpack_require__(93050).HashHandler);
var oop = __webpack_require__(2645);


function OccurKeyboardHandler() {}

oop.inherits(OccurKeyboardHandler, HashHandler);

(function() {

    this.isOccurHandler = true;

    this.attach = function(editor) {
        HashHandler.call(this, occurCommands, editor.commands.platform);
        this.$editor = editor;
    };

    var handleKeyboard$super = this.handleKeyboard;
    this.handleKeyboard = function(data, hashId, key, keyCode) {
        // @ts-ignore
        var cmd = handleKeyboard$super.call(this, data, hashId, key, keyCode);
        return (cmd && cmd.command) ? cmd : undefined;
    };

}).call(OccurKeyboardHandler.prototype);

OccurKeyboardHandler.installIn = function(editor) {
    var handler = new this();
    editor.keyBinding.addKeyboardHandler(handler);
    editor.commands.addCommands(occurCommands);
};

OccurKeyboardHandler.uninstallFrom = function(editor) {
    editor.commands.removeCommands(occurCommands);
    var handler = editor.getKeyboardHandler();
    if (handler.isOccurHandler)
        editor.keyBinding.removeKeyboardHandler(handler);
};

exports.m = occurStartCommand;


/***/ }),

/***/ 98258:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var Range = (__webpack_require__(91902)/* .Range */ .Q);
var Search = (__webpack_require__(99427)/* .Search */ .v);
var SearchHighlight = (__webpack_require__(10464)/* .SearchHighlight */ .V);
var iSearchCommandModule = __webpack_require__(88858);
var ISearchKbd = iSearchCommandModule.IncrementalSearchKeyboardHandler;

// regexp handling

function isRegExp(obj) {
    return obj instanceof RegExp;
}

/**
 * @param {RegExp} re
 */
function regExpToObject(re) {
    var string = String(re),
        start = string.indexOf('/'),
        flagStart = string.lastIndexOf('/');
    return {
        expression: string.slice(start+1, flagStart),
        flags: string.slice(flagStart+1)
    };
}

/**
 * @param {string} string
 * @param {string} flags
 * @return {RegExp|string}
 */
function stringToRegExp(string, flags) {
    try {
        return new RegExp(string, flags);
    } catch (e) { return string; }
}

function objectToRegExp(obj) {
    return stringToRegExp(obj.expression, obj.flags);
}

/**
 * Implements immediate searching while the user is typing. When incremental
 * search is activated, keystrokes into the editor will be used for composing
 * a search term. Immediately after every keystroke the search is updated:
 * - so-far-matching characters are highlighted
 * - the cursor is moved to the next match
 *
 **/
class IncrementalSearch extends Search {
    /**
     * Creates a new `IncrementalSearch` object.
     **/
    constructor() {
        super();
        this.$options = {wrap: false, skipCurrent: false};
        this.$keyboardHandler = new ISearchKbd(this);
    }

    /**
     * @param {boolean} backwards
     */
    activate(editor, backwards) {
        this.$editor = editor;
        this.$startPos = this.$currentPos = editor.getCursorPosition();
        this.$options.needle = '';
        this.$options.backwards = backwards;
        editor.keyBinding.addKeyboardHandler(this.$keyboardHandler);
        // we need to completely intercept paste, just registering an event handler does not work
        this.$originalEditorOnPaste = editor.onPaste;
        editor.onPaste = this.onPaste.bind(this);
        this.$mousedownHandler = editor.on('mousedown', this.onMouseDown.bind(this));
        this.selectionFix(editor);
        this.statusMessage(true);
    }

    /**
     * @param {boolean} [reset]
     */
    deactivate(reset) {
        this.cancelSearch(reset);
        var editor = this.$editor;
        editor.keyBinding.removeKeyboardHandler(this.$keyboardHandler);
        if (this.$mousedownHandler) {
            editor.off('mousedown', this.$mousedownHandler);
            delete this.$mousedownHandler;
        }
        editor.onPaste = this.$originalEditorOnPaste;
        this.message('');
    }

    /**
     * @param {Editor} editor
     */
    selectionFix(editor) {
        // Fix selection bug: When clicked inside the editor
        // editor.selection.$isEmpty is false even if the mouse click did not
        // open a selection. This is interpreted by the move commands to
        // extend the selection. To only extend the selection when there is
        // one, we clear it here
        if (editor.selection.isEmpty() && !editor.session.$emacsMark) {
            editor.clearSelection();
        }
    }

    /**
     * @param {RegExp} regexp
     */
    highlight(regexp) {
        var sess = this.$editor.session,
            hl = sess.$isearchHighlight = sess.$isearchHighlight || sess.addDynamicMarker(
                new SearchHighlight(null, "ace_isearch-result", "text"));
        hl.setRegexp(regexp);
        sess._emit("changeBackMarker"); // force highlight layer redraw
    }

    /**
     * @param {boolean} [reset]
     */
    cancelSearch(reset) {
        var e = this.$editor;
        this.$prevNeedle = this.$options.needle;
        this.$options.needle = '';
        if (reset) {
            e.moveCursorToPosition(this.$startPos);
            this.$currentPos = this.$startPos;
        } else {
            e.pushEmacsMark && e.pushEmacsMark(this.$startPos, false);
        }
        this.highlight(null);
        return Range.fromPoints(this.$currentPos, this.$currentPos);
    }

    /**
     * @param {boolean} moveToNext
     * @param {Function} needleUpdateFunc
     */
    highlightAndFindWithNeedle(moveToNext, needleUpdateFunc) {
        if (!this.$editor) return null;
        var options = this.$options;

        // get search term
        if (needleUpdateFunc) {
            options.needle = needleUpdateFunc.call(this, options.needle || '') || '';
        }
        if (options.needle.length === 0) {
            this.statusMessage(true);
            return this.cancelSearch(true);
        }

        // try to find the next occurrence and enable  highlighting marker
        options.start = this.$currentPos;
        var session = this.$editor.session,
            found = this.find(session),
            shouldSelect = this.$editor.emacsMark ?
                !!this.$editor.emacsMark() : !this.$editor.selection.isEmpty();
        if (found) {
            if (options.backwards) found = Range.fromPoints(found.end, found.start);
            this.$editor.selection.setRange(Range.fromPoints(shouldSelect ? this.$startPos : found.end, found.end));
            if (moveToNext) this.$currentPos = found.end;
            // highlight after cursor move, so selection works properly
            this.highlight(options.re);
        }

        this.statusMessage(found);

        return found;
    }

    /**
     * @param {string} s
     */
    addString(s) {
        return this.highlightAndFindWithNeedle(false, function(needle) {
            if (!isRegExp(needle))
              return needle + s;
            var reObj = regExpToObject(needle);
            reObj.expression += s;
            return objectToRegExp(reObj);
        });
    }

    /**
     * @param {any} c
     */
    removeChar(c) {
        return this.highlightAndFindWithNeedle(false, function(needle) {
            if (!isRegExp(needle))
              return needle.substring(0, needle.length-1);
            var reObj = regExpToObject(needle);
            reObj.expression = reObj.expression.substring(0, reObj.expression.length-1);
            return objectToRegExp(reObj);
        });
    }

    next(options) {
        // try to find the next occurrence of whatever we have searched for
        // earlier.
        // options = {[backwards: BOOL], [useCurrentOrPrevSearch: BOOL]}
        options = options || {};
        this.$options.backwards = !!options.backwards;
        this.$currentPos = this.$editor.getCursorPosition();
        return this.highlightAndFindWithNeedle(true, function(needle) {
            return options.useCurrentOrPrevSearch && needle.length === 0 ?
                this.$prevNeedle || '' : needle;
        });
    }

    /**
     * @internal
     */
    onMouseDown(evt) {
        // when mouse interaction happens then we quit incremental search
        this.deactivate();
        return true;
    }

    /**
     * @param {string} text
     * @internal
     */
    onPaste(text) {
        this.addString(text);
    }

    convertNeedleToRegExp() {
        return this.highlightAndFindWithNeedle(false, function(needle) {
            return isRegExp(needle) ? needle : stringToRegExp(needle, 'ig');
        });
    }

    convertNeedleToString() {
        return this.highlightAndFindWithNeedle(false, function(needle) {
            return isRegExp(needle) ? regExpToObject(needle).expression : needle;
        });
    }

    statusMessage(found) {
        var options = this.$options, msg = '';
        msg += options.backwards ? 'reverse-' : '';
        msg += 'isearch: ' + options.needle;
        msg += found ? '' : ' (not found)';
        this.message(msg);
    }

    message(msg) {
        if (this.$editor.showCommandLine) {
            this.$editor.showCommandLine(msg);
            this.$editor.focus();
        }
    }

}

exports.IncrementalSearch = IncrementalSearch;


/**
 *
 * Config settings for enabling/disabling [[IncrementalSearch `IncrementalSearch`]].
 *
 **/

var dom = __webpack_require__(71435);
dom.importCssString(`
.ace_marker-layer .ace_isearch-result {
  position: absolute;
  z-index: 6;
  box-sizing: border-box;
}
div.ace_isearch-result {
  border-radius: 4px;
  background-color: rgba(255, 200, 0, 0.5);
  box-shadow: 0 0 4px rgb(255, 200, 0);
}
.ace_dark div.ace_isearch-result {
  background-color: rgb(100, 110, 160);
  box-shadow: 0 0 4px rgb(80, 90, 140);
}`, "incremental-search-highlighting", false);

// support for default keyboard handler
var commands = __webpack_require__(63379);
(function() {
    this.setupIncrementalSearch = function(editor, val) {
        if (this.usesIncrementalSearch == val) return;
        this.usesIncrementalSearch = val;
        var iSearchCommands = iSearchCommandModule.iSearchStartCommands;
        var method = val ? 'addCommands' : 'removeCommands';
        this[method](iSearchCommands);
    };
}).call(commands.CommandManager.prototype);

// incremental search config option
var Editor = (__webpack_require__(27258).Editor);
(__webpack_require__(76321).defineOptions)(Editor.prototype, "editor", {
    useIncrementalSearch: {
        set: function(val) {
            this.keyBinding.$handlers.forEach(function(handler) {
                if (handler.setupIncrementalSearch) {
                    handler.setupIncrementalSearch(this, val);
                }
            });
            this._emit('incrementalSearchSettingChanged', {isEnabled: val});
        }
    }
});


/***/ }),

/***/ 48534:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var dom = __webpack_require__(71435);
__webpack_require__(98258);
var iSearchCommandModule = __webpack_require__(88858);


var HashHandler = (__webpack_require__(93050).HashHandler);
exports.handler = new HashHandler();

exports.handler.isEmacs = true;
exports.handler.$id = "ace/keyboard/emacs";


dom.importCssString(`
.emacs-mode .ace_cursor{
    border: 1px rgba(50,250,50,0.8) solid!important;
    box-sizing: border-box!important;
    background-color: rgba(0,250,0,0.9);
    opacity: 0.5;
}
.emacs-mode .ace_hidden-cursors .ace_cursor{
    opacity: 1;
    background-color: transparent;
}
.emacs-mode .ace_overwrite-cursors .ace_cursor {
    opacity: 1;
    background-color: transparent;
    border-width: 0 0 2px 2px !important;
}
.emacs-mode .ace_text-layer {
    z-index: 4
}
.emacs-mode .ace_cursor-layer {
    z-index: 2
}`, 'emacsMode'
);
var $formerLongWords;
var $formerLineStart;

exports.handler.attach = function(editor) {
    // in emacs, gotowordleft/right should not count a space as a word..
    $formerLongWords = editor.session.$selectLongWords;
    editor.session.$selectLongWords = true;
    // CTRL-A should go to actual beginning of line
    $formerLineStart = editor.session.$useEmacsStyleLineStart;
    editor.session.$useEmacsStyleLineStart = true;

    editor.session.$emacsMark = null; // the active mark
    editor.session.$emacsMarkRing = editor.session.$emacsMarkRing || [];

    editor.emacsMark = function() {
        return this.session.$emacsMark;
    };

    editor.setEmacsMark = function(p) {
        // to deactivate pass in a falsy value
        this.session.$emacsMark = p;
    };

    editor.pushEmacsMark = function(p, activate) {
        var prevMark = this.session.$emacsMark;
        if (prevMark)
            pushUnique(this.session.$emacsMarkRing, prevMark);
        if (!p || activate) this.setEmacsMark(p);
        else pushUnique(this.session.$emacsMarkRing, p);
    };

    editor.popEmacsMark = function() {
        var mark = this.emacsMark();
        if (mark) { this.setEmacsMark(null); return mark; }
        return this.session.$emacsMarkRing.pop();
    };

    editor.getLastEmacsMark = function(p) {
        return this.session.$emacsMark || this.session.$emacsMarkRing.slice(-1)[0];
    };

    editor.emacsMarkForSelection = function(replacement) {
        // find the mark in $emacsMarkRing corresponding to the current
        // selection
        var sel = this.selection,
            multiRangeLength = this.multiSelect ?
                this.multiSelect.getAllRanges().length : 1,
            selIndex = sel.index || 0,
            markRing = this.session.$emacsMarkRing,
            markIndex = markRing.length - (multiRangeLength - selIndex),
            lastMark = markRing[markIndex] || sel.anchor;
        if (replacement) {
            markRing.splice(markIndex, 1,
                "row" in replacement && "column" in replacement ?
                    replacement : undefined);
        }
        return lastMark;
    };

    editor.on("click", $resetMarkMode);
    editor.on("changeSession", $kbSessionChange);
    editor.renderer.$blockCursor = true;
    editor.setStyle("emacs-mode");
    editor.commands.addCommands(commands);
    exports.handler.platform = editor.commands.platform;
    editor.$emacsModeHandler = this;
    editor.on('copy', this.onCopy);
    editor.on('paste', this.onPaste);
};

function pushUnique(ring, mark) {
    var last = ring[ring.length - 1];
    if (last && last.row === mark.row && last.column === mark.column) {
        return;
    }
    ring.push(mark);
}

exports.handler.detach = function(editor) {
    editor.renderer.$blockCursor = false;
    editor.session.$selectLongWords = $formerLongWords;
    editor.session.$useEmacsStyleLineStart = $formerLineStart;
    editor.off("click", $resetMarkMode);
    editor.off("changeSession", $kbSessionChange);
    editor.unsetStyle("emacs-mode");
    editor.commands.removeCommands(commands);
    editor.off('copy', this.onCopy);
    editor.off('paste', this.onPaste);
    editor.$emacsModeHandler = null;
};

var $kbSessionChange = function(e) {
    if (e.oldSession) {
        e.oldSession.$selectLongWords = $formerLongWords;
        e.oldSession.$useEmacsStyleLineStart = $formerLineStart;
    }

    $formerLongWords = e.session.$selectLongWords;
    e.session.$selectLongWords = true;
    $formerLineStart = e.session.$useEmacsStyleLineStart;
    e.session.$useEmacsStyleLineStart = true;

    if (!e.session.hasOwnProperty('$emacsMark'))
        e.session.$emacsMark = null;
    if (!e.session.hasOwnProperty('$emacsMarkRing'))
        e.session.$emacsMarkRing = [];
};

var $resetMarkMode = function(e) {
    e.editor.session.$emacsMark = null;
};

var keys = (__webpack_require__(29451).KEY_MODS);
var eMods = {C: "ctrl", S: "shift", M: "alt", CMD: "command"};
var combinations = ["C-S-M-CMD",
                    "S-M-CMD", "C-M-CMD", "C-S-CMD", "C-S-M",
                    "M-CMD", "S-CMD", "S-M", "C-CMD", "C-M", "C-S",
                    "CMD", "M", "S", "C"];
combinations.forEach(function(c) {
    var hashId = 0;
    c.split("-").forEach(function(c) {
        hashId = hashId | keys[eMods[c]];
    });
    eMods[hashId] = c.toLowerCase() + "-";
});

exports.handler.onCopy = function(e, editor) {
    if (editor.$handlesEmacsOnCopy) return;
    editor.$handlesEmacsOnCopy = true;
    exports.handler.commands.killRingSave.exec(editor);
    editor.$handlesEmacsOnCopy = false;
};

exports.handler.onPaste = function(e, editor) {
    editor.pushEmacsMark(editor.getCursorPosition());
};

exports.handler.bindKey = function(key, command) {
    if (typeof key == "object")
        key = key[this.platform];
    if (!key)
        return;

    var ckb = this.commandKeyBinding;
    key.split("|").forEach(function(keyPart) {
        keyPart = keyPart.toLowerCase();
        ckb[keyPart] = command;
        // register all partial key combos as null commands
        // to be able to activate key combos with arbitrary length
        // Example: if keyPart is "C-c C-l t" then "C-c C-l t" will
        // get command assigned and "C-c" and "C-c C-l" will get
        // a null command assigned in this.commandKeyBinding. For
        // the lookup logic see handleKeyboard()
        var keyParts = keyPart.split(" ").slice(0,-1);
        keyParts.reduce(function(keyMapKeys, keyPart, i) {
            var prefix = keyMapKeys[i-1] ? keyMapKeys[i-1] + ' ' : '';
            return keyMapKeys.concat([prefix + keyPart]);
        }, []).forEach(function(keyPart) {
            if (!ckb[keyPart]) ckb[keyPart] = "null";
        });
    }, this);
};

exports.handler.getStatusText = function(editor, data) {
  var str = "";
  if (data.count)
    str += data.count;
  if (data.keyChain)
    str += " " + data.keyChain;
  return str;
};

exports.handler.handleKeyboard = function(data, hashId, key, keyCode) {
    // if keyCode == -1 a non-printable key was pressed, such as just
    // control. Handling those is currently not supported in this handler
    if (keyCode === -1) return undefined;

    var editor = data.editor;
    editor._signal("changeStatus");
    // insertstring data.count times
    if (hashId == -1) {
        editor.pushEmacsMark();
        if (data.count) {
            var str = new Array(data.count + 1).join(key);
            data.count = null;
            return {command: "insertstring", args: str};
        }
    }

    var modifier = eMods[hashId];

    // CTRL + number / universalArgument for setting data.count
    if (modifier == "c-" || data.count) {
        var count = parseInt(key[key.length - 1]);
        if (typeof count === 'number' && !isNaN(count)) {
            data.count = Math.max(data.count, 0) || 0;
            data.count = 10 * data.count + count;
            return {command: "null"};
        }
    }

    // this.commandKeyBinding maps key specs like "c-p" (for CTRL + P) to
    // command objects, for lookup key needs to include the modifier
    if (modifier) key = modifier + key;

    // Key combos like CTRL+X H build up the data.keyChain
    if (data.keyChain) key = data.keyChain += " " + key;

    // Key combo prefixes get stored as "null" (String!) in this
    // this.commandKeyBinding. When encountered no command is invoked but we
    // buld up data.keyChain
    var command = this.commandKeyBinding[key];
    data.keyChain = command == "null" ? key : "";

    // there really is no command
    if (!command) return undefined;

    // we pass b/c of key combo or universalArgument
    if (command === "null") return {command: "null"};

    if (command === "universalArgument") {
        // if no number pressed emacs repeats action 4 times.
        // minus sign is needed to allow next keypress to replace it
        data.count = -4;
        return {command: "null"};
    }

    // lookup command
    // TODO extract special handling of markmode
    // TODO special case command.command is really unnecessary, remove
    var args;
    if (typeof command !== "string") {
        args = command.args;
        if (command.command) command = command.command;
        if (command === "goorselect") {
            command = editor.emacsMark() ? args[1] : args[0];
            args = null;
        }
    }

    if (typeof command === "string") {
        if (command === "insertstring" ||
            command === "splitline" ||
            command === "togglecomment") {
            editor.pushEmacsMark();
        }
        command = this.commands[command] || editor.commands.commands[command];
        if (!command) return undefined;
    }

    if (!command.readOnly && !command.isYank)
        data.lastCommand = null;

    if (!command.readOnly && editor.emacsMark())
        editor.setEmacsMark(null);
        
    if (data.count) {
        var count = data.count;
        data.count = 0;
        if (!command || !command.handlesCount) {
            return {
                args: args,
                command: {
                    exec: function(editor, args) {
                        for (var i = 0; i < count; i++)
                            command.exec(editor, args);
                    },
                    multiSelectAction: command.multiSelectAction
                }
            };
        } else {
            if (!args) args = {};
            if (typeof args === 'object') args.count = count;
        }
    }

    return {command: command, args: args};
};

exports.emacsKeys = {
    // movement
    "Up|C-p"      : {command: "goorselect", args: ["golineup","selectup"]},
    "Down|C-n"    : {command: "goorselect", args: ["golinedown","selectdown"]},
    "Left|C-b"    : {command: "goorselect", args: ["gotoleft","selectleft"]},
    "Right|C-f"   : {command: "goorselect", args: ["gotoright","selectright"]},
    "C-Left|M-b"  : {command: "goorselect", args: ["gotowordleft","selectwordleft"]},
    "C-Right|M-f" : {command: "goorselect", args: ["gotowordright","selectwordright"]},
    "Home|C-a"    : {command: "goorselect", args: ["gotolinestart","selecttolinestart"]},
    "End|C-e"     : {command: "goorselect", args: ["gotolineend","selecttolineend"]},
    "C-Home|S-M-,": {command: "goorselect", args: ["gotostart","selecttostart"]},
    "C-End|S-M-." : {command: "goorselect", args: ["gotoend","selecttoend"]},

    // selection
    "S-Up|S-C-p"      : "selectup",
    "S-Down|S-C-n"    : "selectdown",
    "S-Left|S-C-b"    : "selectleft",
    "S-Right|S-C-f"   : "selectright",
    "S-C-Left|S-M-b"  : "selectwordleft",
    "S-C-Right|S-M-f" : "selectwordright",
    "S-Home|S-C-a"    : "selecttolinestart",
    "S-End|S-C-e"     : "selecttolineend",
    "S-C-Home"        : "selecttostart",
    "S-C-End"         : "selecttoend",

    "C-l" : "recenterTopBottom",
    "M-s" : "centerselection",
    "M-g": "gotoline",
    "C-x C-p": "selectall",

    // todo fix these
    "C-Down": {command: "goorselect", args: ["gotopagedown","selectpagedown"]},
    "C-Up": {command: "goorselect", args: ["gotopageup","selectpageup"]},
    "PageDown|C-v": {command: "goorselect", args: ["gotopagedown","selectpagedown"]},
    "PageUp|M-v": {command: "goorselect", args: ["gotopageup","selectpageup"]},
    "S-C-Down": "selectpagedown",
    "S-C-Up": "selectpageup",

    "C-s": "iSearch",
    "C-r": "iSearchBackwards",

    "M-C-s": "findnext",
    "M-C-r": "findprevious",
    "S-M-5": "replace",

    // basic editing
    "Backspace": "backspace",
    "Delete|C-d": "del",
    "Return|C-m": {command: "insertstring", args: "\n"}, // "newline"
    "C-o": "splitline",

    "M-d|C-Delete": {command: "killWord", args: "right"},
    "C-Backspace|M-Backspace|M-Delete": {command: "killWord", args: "left"},
    "C-k": "killLine",

    "C-y|S-Delete": "yank",
    "M-y": "yankRotate",
    "C-g": "keyboardQuit",

    "C-w|C-S-W": "killRegion",
    "M-w": "killRingSave",
    "C-Space": "setMark",
    "C-x C-x": "exchangePointAndMark",

    "C-t": "transposeletters",
    "M-u": "touppercase",    // Doesn't work
    "M-l": "tolowercase",
    "M-/": "autocomplete",   // Doesn't work
    "C-u": "universalArgument",

    "M-;": "togglecomment",

    "C-/|C-x u|S-C--|C-z": "undo",
    "S-C-/|S-C-x u|C--|S-C-z": "redo", // infinite undo?
    // vertical editing
    "C-x r":  "selectRectangularRegion",
    "M-x": {command: "focusCommandLine", args: "M-x "}
    // todo
    // "C-x C-t" "M-t" "M-c" "F11" "C-M- "M-q"
};


exports.handler.bindKeys(exports.emacsKeys);

exports.handler.addCommands({
    recenterTopBottom: function(editor) {
        var renderer = editor.renderer;
        var pos = renderer.$cursorLayer.getPixelPosition();
        var h = renderer.$size.scrollerHeight - renderer.lineHeight;
        var scrollTop = renderer.scrollTop;
        if (Math.abs(pos.top - scrollTop) < 2) {
            scrollTop = pos.top - h;
        } else if (Math.abs(pos.top - scrollTop - h * 0.5) < 2) {
            scrollTop = pos.top;
        } else {
            scrollTop = pos.top - h * 0.5;
        }
        editor.session.setScrollTop(scrollTop);
    },
    selectRectangularRegion:  function(editor) {
        editor.multiSelect.toggleBlockSelection();
    },
    setMark:  {
        exec: function(editor, args) {
            // Sets mark-mode and clears current selection.
            // When mark is set, keyboard cursor movement commands become
            // selection modification commands. That is,
            // "goto" commands become "select" commands.
            // Any insertion or mouse click resets mark-mode.
            // setMark twice in a row at the same place resets markmode.
            // in multi select mode, ea selection is handled individually

            if (args && args.count) {
                if (editor.inMultiSelectMode) editor.forEachSelection(moveToMark);
                else moveToMark();
                moveToMark();
                return;
            }

            var mark = editor.emacsMark(),
                ranges = editor.selection.getAllRanges(),
                rangePositions = ranges.map(function(r) { return {row: r.start.row, column: r.start.column}; }),
                transientMarkModeActive = true,
                hasNoSelection = ranges.every(function(range) { return range.isEmpty(); });
            // if transientMarkModeActive then mark behavior is a little
            // different. Deactivate the mark when setMark is run with active
            // mark
            if (transientMarkModeActive && (mark || !hasNoSelection)) {
                if (editor.inMultiSelectMode) editor.forEachSelection({exec: editor.clearSelection.bind(editor)});
                else editor.clearSelection();
                if (mark) editor.pushEmacsMark(null);
                return;
            }

            if (!mark) {
                rangePositions.forEach(function(pos) { editor.pushEmacsMark(pos); });
                editor.setEmacsMark(rangePositions[rangePositions.length-1]);
                return;
            }

            // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

            function moveToMark() {
                var mark = editor.popEmacsMark();
                mark && editor.moveCursorToPosition(mark);
            }

        },
        readOnly: true,
        handlesCount: true
    },
    exchangePointAndMark: {
        exec: function exchangePointAndMark$exec(editor, args) {
            var sel = editor.selection;
            if (!args.count && !sel.isEmpty()) { // just invert selection
                sel.setSelectionRange(sel.getRange(), !sel.isBackwards());
                return;
            }

            if (args.count) { // replace mark and point
                var pos = {row: sel.lead.row, column: sel.lead.column};
                sel.clearSelection();
                sel.moveCursorToPosition(editor.emacsMarkForSelection(pos));
            } else { // create selection to last mark
                sel.selectToPosition(editor.emacsMarkForSelection());
            }
        },
        readOnly: true,
        handlesCount: true,
        multiSelectAction: "forEach"
    },
    killWord: {
        exec: function(editor, dir) {
            editor.clearSelection();
            if (dir == "left")
                editor.selection.selectWordLeft();
            else
                editor.selection.selectWordRight();

            var range = editor.getSelectionRange();
            var text = editor.session.getTextRange(range);
            exports.killRing.add(text);

            editor.session.remove(range);
            editor.clearSelection();
        },
        multiSelectAction: "forEach"
    },
    killLine: function(editor) {
        editor.pushEmacsMark(null);
        // don't delete the selection if it's before the cursor
        editor.clearSelection();
        var range = editor.getSelectionRange();
        var line = editor.session.getLine(range.start.row);
        range.end.column = line.length;
        line = line.substr(range.start.column);
        
        var foldLine = editor.session.getFoldLine(range.start.row);
        if (foldLine && range.end.row != foldLine.end.row) {
            range.end.row = foldLine.end.row;
            line = "x";
        }
        // remove EOL if only whitespace remains after the cursor
        if (/^\s*$/.test(line)) {
            range.end.row++;
            line = editor.session.getLine(range.end.row);
            range.end.column = /^\s*$/.test(line) ? line.length : 0;
        }
        var text = editor.session.getTextRange(range);
        if (editor.prevOp.command == this)
            exports.killRing.append(text);
        else
            exports.killRing.add(text);

        editor.session.remove(range);
        editor.clearSelection();
    },
    yank: function(editor) {
        editor.onPaste(exports.killRing.get() || '');
        editor.keyBinding.$data.lastCommand = "yank";
    },
    yankRotate: function(editor) {
        if (editor.keyBinding.$data.lastCommand != "yank")
            return;
        editor.undo();
        editor.session.$emacsMarkRing.pop(); // also undo recording mark
        editor.onPaste(exports.killRing.rotate());
        editor.keyBinding.$data.lastCommand = "yank";
    },
    killRegion: {
        exec: function(editor) {
            exports.killRing.add(editor.getCopyText());
            editor.commands.byName.cut.exec(editor);
            editor.setEmacsMark(null);
        },
        readOnly: true,
        multiSelectAction: "forEach"
    },
    killRingSave: {
        exec: function(editor) {
            // copy text and deselect. will save marks for starts of the
            // selection(s)

            editor.$handlesEmacsOnCopy = true;
            var marks = editor.session.$emacsMarkRing.slice(),
                deselectedMarks = [];
            exports.killRing.add(editor.getCopyText());

            setTimeout(function() {
                function deselect() {
                    var sel = editor.selection, range = sel.getRange(),
                        pos = sel.isBackwards() ? range.end : range.start;
                    deselectedMarks.push({row: pos.row, column: pos.column});
                    sel.clearSelection();
                }
                editor.$handlesEmacsOnCopy = false;
                if (editor.inMultiSelectMode) editor.forEachSelection({exec: deselect});
                else deselect();
                editor.setEmacsMark(null);
                editor.session.$emacsMarkRing = marks.concat(deselectedMarks.reverse());
            }, 0);
        },
        readOnly: true
    },
    keyboardQuit: function(editor) {
        editor.selection.clearSelection();
        editor.setEmacsMark(null);
        editor.keyBinding.$data.count = null;
    },
    focusCommandLine: function(editor, arg) {
        if (editor.showCommandLine)
            editor.showCommandLine(arg);
    }
});

exports.handler.addCommands(iSearchCommandModule.iSearchStartCommands);

var commands = exports.handler.commands;
commands.yank.isYank = true;
commands.yankRotate.isYank = true;

exports.killRing = {
    $data: [],
    add: function(str) {
        str && this.$data.push(str);
        if (this.$data.length > 30)
            this.$data.shift();
    },
    append: function(str) {
        var idx = this.$data.length - 1;
        var text = this.$data[idx] || "";
        if (str) text += str;
        if (text) this.$data[idx] = text;
    },
    get: function(n) {
        n = n || 1;
        return this.$data.slice(this.$data.length-n, this.$data.length).reverse().join('\n');
    },
    pop: function() {
        if (this.$data.length > 1)
            this.$data.pop();
        return this.get();
    },
    rotate: function() {
        this.$data.unshift(this.$data.pop());
        return this.get();
    }
};


/***/ }),

/***/ 8151:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

/**
 * @typedef {import("./editor").Editor} Editor
 * @typedef {import("../ace-internal").Ace.Point} Point
 * @typedef {import("../ace-internal").Ace.SearchOptions} SearchOptions
 */

var oop = __webpack_require__(2645);
var Search = (__webpack_require__(99427)/* .Search */ .v);
var EditSession = (__webpack_require__(33464)/* .EditSession */ .f);
var SearchHighlight = (__webpack_require__(10464)/* .SearchHighlight */ .V);

/**
 * Finds all lines matching a search term in the current [[Document
 * `Document`]] and displays them instead of the original `Document`. Keeps
 * track of the mapping between the occur doc and the original doc.
 **/
class Occur extends Search {

    /**
     * Enables occur mode. expects that `options.needle` is a search term.
     * This search term is used to filter out all the lines that include it
     * and these are then used as the content of a new [[Document
     * `Document`]]. The current cursor position of editor will be translated
     * so that the cursor is on the matching row/column as it was before.
     * @param {Editor} editor
     * @param {Object} options options.needle should be a String
     * @return {Boolean} Whether occur activation was successful
     *
     **/
    enter(editor, options) {
        if (!options.needle) return false;
        var pos = editor.getCursorPosition();
        this.displayOccurContent(editor, options);
        var translatedPos = this.originalToOccurPosition(editor.session, pos);
        editor.moveCursorToPosition(translatedPos);
        return true;
    }

    /**
     * Disables occur mode. Resets the [[Sessions `EditSession`]] [[Document
     * `Document`]] back to the original doc. If options.translatePosition is
     * truthy also maps the [[Editors `Editor`]] cursor position accordingly.
     * @param {Editor} editor
     * @param {Object} options options.translatePosition
     * @return {Boolean} Whether occur deactivation was successful
     *
     **/
    exit(editor, options) {
        var pos = options.translatePosition && editor.getCursorPosition();
        var translatedPos = pos && this.occurToOriginalPosition(editor.session, pos);
        this.displayOriginalContent(editor);
        if (translatedPos)
            editor.moveCursorToPosition(translatedPos);
        return true;
    }

    /**
     * @param {EditSession} sess
     * @param {RegExp} regexp
     */
    highlight(sess, regexp) {
        var hl = sess.$occurHighlight = sess.$occurHighlight || sess.addDynamicMarker(
                new SearchHighlight(null, "ace_occur-highlight", "text"));
        hl.setRegexp(regexp);
        sess._emit("changeBackMarker"); // force highlight layer redraw
    }

    /**
     * @param {Editor} editor
     * @param {Partial<SearchOptions>} options
     */
    displayOccurContent(editor, options) {
        // this.setSession(session || new EditSession(""))
        this.$originalSession = editor.session;
        var found = this.matchingLines(editor.session, options);
        var lines = found.map(function(foundLine) { return foundLine.content; });
        /**@type {EditSession}*/
        var occurSession = new EditSession(lines.join('\n'));
        occurSession.$occur = this;
        occurSession.$occurMatchingLines = found;
        editor.setSession(occurSession);
        this.$useEmacsStyleLineStart = this.$originalSession.$useEmacsStyleLineStart;
        occurSession.$useEmacsStyleLineStart = this.$useEmacsStyleLineStart;
        this.highlight(occurSession, options.re);
        occurSession._emit('changeBackMarker');
    }

    /**
     * @param {Editor} editor
     */
    displayOriginalContent(editor) {
        editor.setSession(this.$originalSession);
        this.$originalSession.$useEmacsStyleLineStart = this.$useEmacsStyleLineStart;
    }

    /**
    * Translates the position from the original document to the occur lines in
    * the document or the beginning if the doc {row: 0, column: 0} if not
    * found.
    * @param {EditSession} session The occur session
    * @param {Point} pos The position in the original document
    * @return {Point} position in occur doc
    **/
    originalToOccurPosition(session, pos) {
        var lines = session.$occurMatchingLines;
        var nullPos = {row: 0, column: 0};
        if (!lines) return nullPos;
        for (var i = 0; i < lines.length; i++) {
            if (lines[i].row === pos.row)
                return {row: i, column: pos.column};
        }
        return nullPos;
    }

    /**
    * Translates the position from the occur document to the original document
    * or `pos` if not found.
    * @param {EditSession} session The occur session
    * @param {Point} pos The position in the occur session document
    * @return {Point} position
    **/
    occurToOriginalPosition(session, pos) {
        var lines = session.$occurMatchingLines;
        if (!lines || !lines[pos.row])
            return pos;
        return {row: lines[pos.row].row, column: pos.column};
    }

    /**
     * @param {EditSession} session
     * @param {Partial<SearchOptions>} options
     */
    matchingLines(session, options) {
        options = oop.mixin({}, options);
        if (!session || !options.needle) return [];
        var search = new Search();
        search.set(options);
        return search.findAll(session).reduce(function(lines, range) {
            var row = range.start.row;
            var last = lines[lines.length-1];
            return last && last.row === row ?
                lines :
                lines.concat({row: row, content: session.getLine(row)});
        }, []);
    }

}

var dom = __webpack_require__(71435);
dom.importCssString(".ace_occur-highlight {\n\
    border-radius: 4px;\n\
    background-color: rgba(87, 255, 8, 0.25);\n\
    position: absolute;\n\
    z-index: 4;\n\
    box-sizing: border-box;\n\
    box-shadow: 0 0 4px rgb(91, 255, 50);\n\
}\n\
.ace_dark .ace_occur-highlight {\n\
    background-color: rgb(80, 140, 85);\n\
    box-shadow: 0 0 4px rgb(60, 120, 70);\n\
}\n", "incremental-occur-highlighting", false);

exports.D = Occur;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZUFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGdEQUFnRCxtQkFBbUI7QUFDbkU7QUFDQSxjQUFjLGFBQWE7QUFDM0IsY0FBYyxPQUFPO0FBQ3JCLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQSx3QkFBd0Isa0JBQWtCO0FBQzFDO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLGFBQWE7QUFDM0IsY0FBYyxPQUFPO0FBQ3JCLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCOztBQUVBO0FBQ0EsZUFBZSxhQUFhO0FBQzVCLGVBQWUsd0JBQXdCO0FBQ3ZDO0FBQ0E7QUFDQSw4QkFBOEI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4Qix3Q0FBd0M7QUFDdEUsU0FBUztBQUNUOztBQUVBOztBQUVBLFVBQVUsbUJBQU8sQ0FBQyxLQUFXO0FBQzdCLDJDQUEyQztBQUMzQyx1QkFBdUI7QUFDdkIsNkNBQTZDO0FBQzdDLHVCQUF1QjtBQUN2QixlQUFlO0FBQ2YsMkJBQTJCO0FBQzNCLHlDQUF5QztBQUN6QyxDQUFDO0FBQ0QsZ0NBQWdDO0FBQ2hDLHVDQUF1QztBQUN2Qyx5Q0FBeUM7QUFDekMsQ0FBQzs7QUFFRCxTQUFhIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvY29tbWFuZHMvaW5jcmVtZW50YWxfc2VhcmNoX2NvbW1hbmRzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL2NvbW1hbmRzL29jY3VyX2NvbW1hbmRzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL2luY3JlbWVudGFsX3NlYXJjaC5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9rZXlib2FyZC9lbWFjcy5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9vY2N1ci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgY29uZmlnID0gcmVxdWlyZShcIi4uL2NvbmZpZ1wiKTtcbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBIYXNoSGFuZGxlciA9IHJlcXVpcmUoXCIuLi9rZXlib2FyZC9oYXNoX2hhbmRsZXJcIikuSGFzaEhhbmRsZXI7XG52YXIgb2NjdXJTdGFydENvbW1hbmQgPSByZXF1aXJlKFwiLi9vY2N1cl9jb21tYW5kc1wiKS5vY2N1clN0YXJ0Q29tbWFuZDtcblxuLy8gVGhlc2UgY29tbWFuZHMgY2FuIGJlIGluc3RhbGxlZCBpbiBhIG5vcm1hbCBrZXkgaGFuZGxlciB0byBzdGFydCBpU2VhcmNoOlxuZXhwb3J0cy5pU2VhcmNoU3RhcnRDb21tYW5kcyA9IFt7XG4gICAgbmFtZTogXCJpU2VhcmNoXCIsXG4gICAgYmluZEtleToge3dpbjogXCJDdHJsLUZcIiwgbWFjOiBcIkNvbW1hbmQtRlwifSxcbiAgICBleGVjOiBmdW5jdGlvbihlZGl0b3IsIG9wdGlvbnMpIHtcbiAgICAgICAgY29uZmlnLmxvYWRNb2R1bGUoW1wiY29yZVwiLCBcImFjZS9pbmNyZW1lbnRhbF9zZWFyY2hcIl0sIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIHZhciBpU2VhcmNoID0gZS5pU2VhcmNoID0gZS5pU2VhcmNoIHx8IG5ldyBlLkluY3JlbWVudGFsU2VhcmNoKCk7XG4gICAgICAgICAgICBpU2VhcmNoLmFjdGl2YXRlKGVkaXRvciwgb3B0aW9ucy5iYWNrd2FyZHMpO1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMuanVtcFRvRmlyc3RNYXRjaCkgaVNlYXJjaC5uZXh0KG9wdGlvbnMpO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIHJlYWRPbmx5OiB0cnVlXG59LCB7XG4gICAgbmFtZTogXCJpU2VhcmNoQmFja3dhcmRzXCIsXG4gICAgZXhlYzogZnVuY3Rpb24oZWRpdG9yLCBqdW1wVG9OZXh0KSB7IGVkaXRvci5leGVjQ29tbWFuZCgnaVNlYXJjaCcsIHtiYWNrd2FyZHM6IHRydWV9KTsgfSxcbiAgICByZWFkT25seTogdHJ1ZVxufSwge1xuICAgIG5hbWU6IFwiaVNlYXJjaEFuZEdvXCIsXG4gICAgYmluZEtleToge3dpbjogXCJDdHJsLUtcIiwgbWFjOiBcIkNvbW1hbmQtR1wifSxcbiAgICBleGVjOiBmdW5jdGlvbihlZGl0b3IsIGp1bXBUb05leHQpIHsgZWRpdG9yLmV4ZWNDb21tYW5kKCdpU2VhcmNoJywge2p1bXBUb0ZpcnN0TWF0Y2g6IHRydWUsIHVzZUN1cnJlbnRPclByZXZTZWFyY2g6IHRydWV9KTsgfSxcbiAgICByZWFkT25seTogdHJ1ZVxufSwge1xuICAgIG5hbWU6IFwiaVNlYXJjaEJhY2t3YXJkc0FuZEdvXCIsXG4gICAgYmluZEtleToge3dpbjogXCJDdHJsLVNoaWZ0LUtcIiwgbWFjOiBcIkNvbW1hbmQtU2hpZnQtR1wifSxcbiAgICBleGVjOiBmdW5jdGlvbihlZGl0b3IpIHsgZWRpdG9yLmV4ZWNDb21tYW5kKCdpU2VhcmNoJywge2p1bXBUb0ZpcnN0TWF0Y2g6IHRydWUsIGJhY2t3YXJkczogdHJ1ZSwgdXNlQ3VycmVudE9yUHJldlNlYXJjaDogdHJ1ZX0pOyB9LFxuICAgIHJlYWRPbmx5OiB0cnVlXG59XTtcblxuLy8gVGhlc2UgY29tbWFuZHMgYXJlIG9ubHkgYXZhaWxhYmxlIHdoZW4gaW5jcmVtZW50YWwgc2VhcmNoIG1vZGUgaXMgYWN0aXZlOlxuZXhwb3J0cy5pU2VhcmNoQ29tbWFuZHMgPSBbe1xuICAgIG5hbWU6IFwicmVzdGFydFNlYXJjaFwiLFxuICAgIGJpbmRLZXk6IHt3aW46IFwiQ3RybC1GXCIsIG1hYzogXCJDb21tYW5kLUZcIn0sXG4gICAgZXhlYzogZnVuY3Rpb24oaVNlYXJjaCkge1xuICAgICAgICBpU2VhcmNoLmNhbmNlbFNlYXJjaCh0cnVlKTtcbiAgICB9XG59LCB7XG4gICAgbmFtZTogXCJzZWFyY2hGb3J3YXJkXCIsXG4gICAgYmluZEtleToge3dpbjogXCJDdHJsLVN8Q3RybC1LXCIsIG1hYzogXCJDdHJsLVN8Q29tbWFuZC1HXCJ9LFxuICAgIGV4ZWM6IGZ1bmN0aW9uKGlTZWFyY2gsIG9wdGlvbnMpIHtcbiAgICAgICAgb3B0aW9ucy51c2VDdXJyZW50T3JQcmV2U2VhcmNoID0gdHJ1ZTtcbiAgICAgICAgaVNlYXJjaC5uZXh0KG9wdGlvbnMpO1xuICAgIH1cbn0sIHtcbiAgICBuYW1lOiBcInNlYXJjaEJhY2t3YXJkXCIsXG4gICAgYmluZEtleToge3dpbjogXCJDdHJsLVJ8Q3RybC1TaGlmdC1LXCIsIG1hYzogXCJDdHJsLVJ8Q29tbWFuZC1TaGlmdC1HXCJ9LFxuICAgIGV4ZWM6IGZ1bmN0aW9uKGlTZWFyY2gsIG9wdGlvbnMpIHtcbiAgICAgICAgb3B0aW9ucy51c2VDdXJyZW50T3JQcmV2U2VhcmNoID0gdHJ1ZTtcbiAgICAgICAgb3B0aW9ucy5iYWNrd2FyZHMgPSB0cnVlO1xuICAgICAgICBpU2VhcmNoLm5leHQob3B0aW9ucyk7XG4gICAgfVxufSwge1xuICAgIG5hbWU6IFwiZXh0ZW5kU2VhcmNoVGVybVwiLFxuICAgIGV4ZWM6IGZ1bmN0aW9uKGlTZWFyY2gsIHN0cmluZykge1xuICAgICAgICBpU2VhcmNoLmFkZFN0cmluZyhzdHJpbmcpO1xuICAgIH1cbn0sIHtcbiAgICBuYW1lOiBcImV4dGVuZFNlYXJjaFRlcm1TcGFjZVwiLFxuICAgIGJpbmRLZXk6IFwic3BhY2VcIixcbiAgICBleGVjOiBmdW5jdGlvbihpU2VhcmNoKSB7IGlTZWFyY2guYWRkU3RyaW5nKCcgJyk7IH1cbn0sIHtcbiAgICBuYW1lOiBcInNocmlua1NlYXJjaFRlcm1cIixcbiAgICBiaW5kS2V5OiBcImJhY2tzcGFjZVwiLFxuICAgIGV4ZWM6IGZ1bmN0aW9uKGlTZWFyY2gpIHtcbiAgICAgICAgaVNlYXJjaC5yZW1vdmVDaGFyKCk7XG4gICAgfVxufSwge1xuICAgIG5hbWU6ICdjb25maXJtU2VhcmNoJyxcbiAgICBiaW5kS2V5OiAncmV0dXJuJyxcbiAgICBleGVjOiBmdW5jdGlvbihpU2VhcmNoKSB7IGlTZWFyY2guZGVhY3RpdmF0ZSgpOyB9XG59LCB7XG4gICAgbmFtZTogJ2NhbmNlbFNlYXJjaCcsXG4gICAgYmluZEtleTogJ2VzY3xDdHJsLUcnLFxuICAgIGV4ZWM6IGZ1bmN0aW9uKGlTZWFyY2gpIHsgaVNlYXJjaC5kZWFjdGl2YXRlKHRydWUpOyB9XG59LCB7XG4gICAgbmFtZTogJ29jY3VyaXNlYXJjaCcsXG4gICAgYmluZEtleTogJ0N0cmwtTycsXG4gICAgZXhlYzogZnVuY3Rpb24oaVNlYXJjaCkge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IG9vcC5taXhpbih7fSwgaVNlYXJjaC4kb3B0aW9ucyk7XG4gICAgICAgIGlTZWFyY2guZGVhY3RpdmF0ZSgpO1xuICAgICAgICBvY2N1clN0YXJ0Q29tbWFuZC5leGVjKGlTZWFyY2guJGVkaXRvciwgb3B0aW9ucyk7XG4gICAgfVxufSwge1xuICAgIG5hbWU6IFwieWFua05leHRXb3JkXCIsXG4gICAgYmluZEtleTogXCJDdHJsLXdcIixcbiAgICBleGVjOiBmdW5jdGlvbihpU2VhcmNoKSB7XG4gICAgICAgIHZhciBlZCA9IGlTZWFyY2guJGVkaXRvcixcbiAgICAgICAgICAgIHJhbmdlID0gZWQuc2VsZWN0aW9uLmdldFJhbmdlT2ZNb3ZlbWVudHMoZnVuY3Rpb24oc2VsKSB7IHNlbC5tb3ZlQ3Vyc29yV29yZFJpZ2h0KCk7IH0pLFxuICAgICAgICAgICAgc3RyaW5nID0gZWQuc2Vzc2lvbi5nZXRUZXh0UmFuZ2UocmFuZ2UpO1xuICAgICAgICBpU2VhcmNoLmFkZFN0cmluZyhzdHJpbmcpO1xuICAgIH1cbn0sIHtcbiAgICBuYW1lOiBcInlhbmtOZXh0Q2hhclwiLFxuICAgIGJpbmRLZXk6IFwiQ3RybC1BbHQteVwiLFxuICAgIGV4ZWM6IGZ1bmN0aW9uKGlTZWFyY2gpIHtcbiAgICAgICAgdmFyIGVkID0gaVNlYXJjaC4kZWRpdG9yLFxuICAgICAgICAgICAgcmFuZ2UgPSBlZC5zZWxlY3Rpb24uZ2V0UmFuZ2VPZk1vdmVtZW50cyhmdW5jdGlvbihzZWwpIHsgc2VsLm1vdmVDdXJzb3JSaWdodCgpOyB9KSxcbiAgICAgICAgICAgIHN0cmluZyA9IGVkLnNlc3Npb24uZ2V0VGV4dFJhbmdlKHJhbmdlKTtcbiAgICAgICAgaVNlYXJjaC5hZGRTdHJpbmcoc3RyaW5nKTtcbiAgICB9XG59LCB7XG4gICAgbmFtZTogJ3JlY2VudGVyVG9wQm90dG9tJyxcbiAgICBiaW5kS2V5OiAnQ3RybC1sJyxcbiAgICBleGVjOiBmdW5jdGlvbihpU2VhcmNoKSB7IGlTZWFyY2guJGVkaXRvci5leGVjQ29tbWFuZCgncmVjZW50ZXJUb3BCb3R0b20nKTsgfVxufSwge1xuICAgIG5hbWU6ICdzZWxlY3RBbGxNYXRjaGVzJyxcbiAgICBiaW5kS2V5OiAnQ3RybC1zcGFjZScsXG4gICAgZXhlYzogZnVuY3Rpb24oaVNlYXJjaCkge1xuICAgICAgICB2YXIgZWQgPSBpU2VhcmNoLiRlZGl0b3IsXG4gICAgICAgICAgICBobCA9IGVkLnNlc3Npb24uJGlzZWFyY2hIaWdobGlnaHQsXG4gICAgICAgICAgICByYW5nZXMgPSBobCAmJiBobC5jYWNoZSA/IGhsLmNhY2hlXG4gICAgICAgICAgICAgICAgLnJlZHVjZShmdW5jdGlvbihyYW5nZXMsIGVhKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByYW5nZXMuY29uY2F0KGVhID8gZWEgOiBbXSk7IH0sIFtdKSA6IFtdO1xuICAgICAgICBpU2VhcmNoLmRlYWN0aXZhdGUoZmFsc2UpO1xuICAgICAgICByYW5nZXMuZm9yRWFjaChlZC5zZWxlY3Rpb24uYWRkUmFuZ2UuYmluZChlZC5zZWxlY3Rpb24pKTtcbiAgICB9XG59LCB7XG4gICAgbmFtZTogJ3NlYXJjaEFzUmVnRXhwJyxcbiAgICBiaW5kS2V5OiAnQWx0LXInLFxuICAgIGV4ZWM6IGZ1bmN0aW9uKGlTZWFyY2gpIHtcbiAgICAgICAgaVNlYXJjaC5jb252ZXJ0TmVlZGxlVG9SZWdFeHAoKTtcbiAgICB9XG59XS5tYXAoZnVuY3Rpb24oY21kKSB7XG4gICAgY21kLnJlYWRPbmx5ID0gdHJ1ZTtcbiAgICBjbWQuaXNJbmNyZW1lbnRhbFNlYXJjaENvbW1hbmQgPSB0cnVlO1xuICAgIGNtZC5zY3JvbGxJbnRvVmlldyA9IFwiYW5pbWF0ZS1jdXJzb3JcIjtcbiAgICByZXR1cm4gY21kO1xufSk7XG5cbmZ1bmN0aW9uIEluY3JlbWVudGFsU2VhcmNoS2V5Ym9hcmRIYW5kbGVyKGlTZWFyY2gpIHtcbiAgICB0aGlzLiRpU2VhcmNoID0gaVNlYXJjaDtcbn1cblxub29wLmluaGVyaXRzKEluY3JlbWVudGFsU2VhcmNoS2V5Ym9hcmRIYW5kbGVyLCBIYXNoSGFuZGxlcik7XG5cbihmdW5jdGlvbigpIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gZWRpdG9yXG4gICAgICogQHRoaXMge0luY3JlbWVudGFsU2VhcmNoS2V5Ym9hcmRIYW5kbGVyICYgdGhpcyAmIHskY29tbWFuZEV4ZWNIYW5kbGVyfX1cbiAgICAgKi9cbiAgICB0aGlzLmF0dGFjaCA9IGZ1bmN0aW9uKGVkaXRvcikge1xuICAgICAgICB2YXIgaVNlYXJjaCA9IHRoaXMuJGlTZWFyY2g7XG4gICAgICAgIEhhc2hIYW5kbGVyLmNhbGwodGhpcywgZXhwb3J0cy5pU2VhcmNoQ29tbWFuZHMsIGVkaXRvci5jb21tYW5kcy5wbGF0Zm9ybSk7XG4gICAgICAgIHRoaXMuJGNvbW1hbmRFeGVjSGFuZGxlciA9IGVkaXRvci5jb21tYW5kcy5vbignZXhlYycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGlmICghZS5jb21tYW5kLmlzSW5jcmVtZW50YWxTZWFyY2hDb21tYW5kKVxuICAgICAgICAgICAgICAgIHJldHVybiBpU2VhcmNoLmRlYWN0aXZhdGUoKTtcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB2YXIgc2Nyb2xsVG9wID0gZWRpdG9yLnNlc3Npb24uZ2V0U2Nyb2xsVG9wKCk7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gZS5jb21tYW5kLmV4ZWMoaVNlYXJjaCwgZS5hcmdzIHx8IHt9KTtcbiAgICAgICAgICAgIGVkaXRvci5yZW5kZXJlci5zY3JvbGxDdXJzb3JJbnRvVmlldyhudWxsLCAwLjUpO1xuICAgICAgICAgICAgZWRpdG9yLnJlbmRlcmVyLmFuaW1hdGVTY3JvbGxpbmcoc2Nyb2xsVG9wKTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBAdGhpcyB7SW5jcmVtZW50YWxTZWFyY2hLZXlib2FyZEhhbmRsZXIgJiB0aGlzICYgeyRjb21tYW5kRXhlY0hhbmRsZXJ9fVxuICAgICAqIEBwYXJhbSBlZGl0b3JcbiAgICAgKi9cbiAgICB0aGlzLmRldGFjaCA9IGZ1bmN0aW9uKGVkaXRvcikge1xuICAgICAgICBpZiAoIXRoaXMuJGNvbW1hbmRFeGVjSGFuZGxlcikgcmV0dXJuO1xuICAgICAgICBlZGl0b3IuY29tbWFuZHMub2ZmKCdleGVjJywgdGhpcy4kY29tbWFuZEV4ZWNIYW5kbGVyKTtcbiAgICAgICAgZGVsZXRlIHRoaXMuJGNvbW1hbmRFeGVjSGFuZGxlcjtcbiAgICB9O1xuXG4gICAgdmFyIGhhbmRsZUtleWJvYXJkJHN1cGVyID0gdGhpcy5oYW5kbGVLZXlib2FyZDtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gZGF0YVxuICAgICAqIEBwYXJhbSBoYXNoSWRcbiAgICAgKiBAcGFyYW0ga2V5XG4gICAgICogQHBhcmFtIGtleUNvZGVcbiAgICAgKiBAdGhpcyB7SW5jcmVtZW50YWxTZWFyY2hLZXlib2FyZEhhbmRsZXIgJiBpbXBvcnQoXCIuLi9rZXlib2FyZC9oYXNoX2hhbmRsZXJcIikuSGFzaEhhbmRsZXJ9XG4gICAgICovXG4gICAgdGhpcy5oYW5kbGVLZXlib2FyZCA9IGZ1bmN0aW9uKGRhdGEsIGhhc2hJZCwga2V5LCBrZXlDb2RlKSB7XG4gICAgICAgIGlmICgoKGhhc2hJZCA9PT0gMS8qY3RybCovIHx8IGhhc2hJZCA9PT0gOC8qY29tbWFuZCovKSAmJiBrZXkgPT09ICd2JylcbiAgICAgICAgIHx8IChoYXNoSWQgPT09IDEvKmN0cmwqLyAmJiBrZXkgPT09ICd5JykpIHJldHVybiBudWxsO1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHZhciBjbWQgPSBoYW5kbGVLZXlib2FyZCRzdXBlci5jYWxsKHRoaXMsIGRhdGEsIGhhc2hJZCwga2V5LCBrZXlDb2RlKTtcbiAgICAgICAgaWYgKGNtZCAmJiBjbWQuY29tbWFuZCkgeyByZXR1cm4gY21kOyB9XG4gICAgICAgIGlmIChoYXNoSWQgPT0gLTEpIHtcbiAgICAgICAgICAgIHZhciBleHRlbmRDbWQgPSB0aGlzLmNvbW1hbmRzLmV4dGVuZFNlYXJjaFRlcm07XG4gICAgICAgICAgICBpZiAoZXh0ZW5kQ21kKSB7IHJldHVybiB7Y29tbWFuZDogZXh0ZW5kQ21kLCBhcmdzOiBrZXl9OyB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbn0pLmNhbGwoSW5jcmVtZW50YWxTZWFyY2hLZXlib2FyZEhhbmRsZXIucHJvdG90eXBlKTtcblxuXG5leHBvcnRzLkluY3JlbWVudGFsU2VhcmNoS2V5Ym9hcmRIYW5kbGVyID0gSW5jcmVtZW50YWxTZWFyY2hLZXlib2FyZEhhbmRsZXI7XG4iLCJ2YXIgY29uZmlnID0gcmVxdWlyZShcIi4uL2NvbmZpZ1wiKSxcbiAgICBPY2N1ciA9IHJlcXVpcmUoXCIuLi9vY2N1clwiKS5PY2N1cjtcblxuLy8gVGhlc2UgY29tbWFuZHMgY2FuIGJlIGluc3RhbGxlZCBpbiBhIG5vcm1hbCBjb21tYW5kIGhhbmRsZXIgdG8gc3RhcnQgb2NjdXI6XG52YXIgb2NjdXJTdGFydENvbW1hbmQgPSB7XG4gICAgbmFtZTogXCJvY2N1clwiLFxuICAgIGV4ZWM6IGZ1bmN0aW9uKGVkaXRvciwgb3B0aW9ucykge1xuICAgICAgICB2YXIgYWxyZWFkeUluT2NjdXIgPSAhIWVkaXRvci5zZXNzaW9uLiRvY2N1cjtcbiAgICAgICAgdmFyIG9jY3VyU2Vzc2lvbkFjdGl2ZSA9IG5ldyBPY2N1cigpLmVudGVyKGVkaXRvciwgb3B0aW9ucyk7XG4gICAgICAgIGlmIChvY2N1clNlc3Npb25BY3RpdmUgJiYgIWFscmVhZHlJbk9jY3VyKVxuICAgICAgICAgICAgT2NjdXJLZXlib2FyZEhhbmRsZXIuaW5zdGFsbEluKGVkaXRvcik7XG4gICAgfSxcbiAgICByZWFkT25seTogdHJ1ZVxufTtcblxudmFyIG9jY3VyQ29tbWFuZHMgPSBbe1xuICAgIG5hbWU6IFwib2NjdXJleGl0XCIsXG4gICAgYmluZEtleTogJ2VzY3xDdHJsLUcnLFxuICAgIGV4ZWM6IGZ1bmN0aW9uKGVkaXRvcikge1xuICAgICAgICB2YXIgb2NjdXIgPSBlZGl0b3Iuc2Vzc2lvbi4kb2NjdXI7XG4gICAgICAgIGlmICghb2NjdXIpIHJldHVybjtcbiAgICAgICAgb2NjdXIuZXhpdChlZGl0b3IsIHt9KTtcbiAgICAgICAgaWYgKCFlZGl0b3Iuc2Vzc2lvbi4kb2NjdXIpIE9jY3VyS2V5Ym9hcmRIYW5kbGVyLnVuaW5zdGFsbEZyb20oZWRpdG9yKTtcbiAgICB9LFxuICAgIHJlYWRPbmx5OiB0cnVlXG59LCB7XG4gICAgbmFtZTogXCJvY2N1cmFjY2VwdFwiLFxuICAgIGJpbmRLZXk6ICdlbnRlcicsXG4gICAgZXhlYzogZnVuY3Rpb24oZWRpdG9yKSB7XG4gICAgICAgIHZhciBvY2N1ciA9IGVkaXRvci5zZXNzaW9uLiRvY2N1cjtcbiAgICAgICAgaWYgKCFvY2N1cikgcmV0dXJuO1xuICAgICAgICBvY2N1ci5leGl0KGVkaXRvciwge3RyYW5zbGF0ZVBvc2l0aW9uOiB0cnVlfSk7XG4gICAgICAgIGlmICghZWRpdG9yLnNlc3Npb24uJG9jY3VyKSBPY2N1cktleWJvYXJkSGFuZGxlci51bmluc3RhbGxGcm9tKGVkaXRvcik7XG4gICAgfSxcbiAgICByZWFkT25seTogdHJ1ZVxufV07XG5cbnZhciBIYXNoSGFuZGxlciA9IHJlcXVpcmUoXCIuLi9rZXlib2FyZC9oYXNoX2hhbmRsZXJcIikuSGFzaEhhbmRsZXI7XG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG5cblxuZnVuY3Rpb24gT2NjdXJLZXlib2FyZEhhbmRsZXIoKSB7fVxuXG5vb3AuaW5oZXJpdHMoT2NjdXJLZXlib2FyZEhhbmRsZXIsIEhhc2hIYW5kbGVyKTtcblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5pc09jY3VySGFuZGxlciA9IHRydWU7XG5cbiAgICB0aGlzLmF0dGFjaCA9IGZ1bmN0aW9uKGVkaXRvcikge1xuICAgICAgICBIYXNoSGFuZGxlci5jYWxsKHRoaXMsIG9jY3VyQ29tbWFuZHMsIGVkaXRvci5jb21tYW5kcy5wbGF0Zm9ybSk7XG4gICAgICAgIHRoaXMuJGVkaXRvciA9IGVkaXRvcjtcbiAgICB9O1xuXG4gICAgdmFyIGhhbmRsZUtleWJvYXJkJHN1cGVyID0gdGhpcy5oYW5kbGVLZXlib2FyZDtcbiAgICB0aGlzLmhhbmRsZUtleWJvYXJkID0gZnVuY3Rpb24oZGF0YSwgaGFzaElkLCBrZXksIGtleUNvZGUpIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICB2YXIgY21kID0gaGFuZGxlS2V5Ym9hcmQkc3VwZXIuY2FsbCh0aGlzLCBkYXRhLCBoYXNoSWQsIGtleSwga2V5Q29kZSk7XG4gICAgICAgIHJldHVybiAoY21kICYmIGNtZC5jb21tYW5kKSA/IGNtZCA6IHVuZGVmaW5lZDtcbiAgICB9O1xuXG59KS5jYWxsKE9jY3VyS2V5Ym9hcmRIYW5kbGVyLnByb3RvdHlwZSk7XG5cbk9jY3VyS2V5Ym9hcmRIYW5kbGVyLmluc3RhbGxJbiA9IGZ1bmN0aW9uKGVkaXRvcikge1xuICAgIHZhciBoYW5kbGVyID0gbmV3IHRoaXMoKTtcbiAgICBlZGl0b3Iua2V5QmluZGluZy5hZGRLZXlib2FyZEhhbmRsZXIoaGFuZGxlcik7XG4gICAgZWRpdG9yLmNvbW1hbmRzLmFkZENvbW1hbmRzKG9jY3VyQ29tbWFuZHMpO1xufTtcblxuT2NjdXJLZXlib2FyZEhhbmRsZXIudW5pbnN0YWxsRnJvbSA9IGZ1bmN0aW9uKGVkaXRvcikge1xuICAgIGVkaXRvci5jb21tYW5kcy5yZW1vdmVDb21tYW5kcyhvY2N1ckNvbW1hbmRzKTtcbiAgICB2YXIgaGFuZGxlciA9IGVkaXRvci5nZXRLZXlib2FyZEhhbmRsZXIoKTtcbiAgICBpZiAoaGFuZGxlci5pc09jY3VySGFuZGxlcilcbiAgICAgICAgZWRpdG9yLmtleUJpbmRpbmcucmVtb3ZlS2V5Ym9hcmRIYW5kbGVyKGhhbmRsZXIpO1xufTtcblxuZXhwb3J0cy5vY2N1clN0YXJ0Q29tbWFuZCA9IG9jY3VyU3RhcnRDb21tYW5kO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBSYW5nZSA9IHJlcXVpcmUoXCIuL3JhbmdlXCIpLlJhbmdlO1xudmFyIFNlYXJjaCA9IHJlcXVpcmUoXCIuL3NlYXJjaFwiKS5TZWFyY2g7XG52YXIgU2VhcmNoSGlnaGxpZ2h0ID0gcmVxdWlyZShcIi4vc2VhcmNoX2hpZ2hsaWdodFwiKS5TZWFyY2hIaWdobGlnaHQ7XG52YXIgaVNlYXJjaENvbW1hbmRNb2R1bGUgPSByZXF1aXJlKFwiLi9jb21tYW5kcy9pbmNyZW1lbnRhbF9zZWFyY2hfY29tbWFuZHNcIik7XG52YXIgSVNlYXJjaEtiZCA9IGlTZWFyY2hDb21tYW5kTW9kdWxlLkluY3JlbWVudGFsU2VhcmNoS2V5Ym9hcmRIYW5kbGVyO1xuXG4vLyByZWdleHAgaGFuZGxpbmdcblxuZnVuY3Rpb24gaXNSZWdFeHAob2JqKSB7XG4gICAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mIFJlZ0V4cDtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge1JlZ0V4cH0gcmVcbiAqL1xuZnVuY3Rpb24gcmVnRXhwVG9PYmplY3QocmUpIHtcbiAgICB2YXIgc3RyaW5nID0gU3RyaW5nKHJlKSxcbiAgICAgICAgc3RhcnQgPSBzdHJpbmcuaW5kZXhPZignLycpLFxuICAgICAgICBmbGFnU3RhcnQgPSBzdHJpbmcubGFzdEluZGV4T2YoJy8nKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBleHByZXNzaW9uOiBzdHJpbmcuc2xpY2Uoc3RhcnQrMSwgZmxhZ1N0YXJ0KSxcbiAgICAgICAgZmxhZ3M6IHN0cmluZy5zbGljZShmbGFnU3RhcnQrMSlcbiAgICB9O1xufVxuXG4vKipcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSBmbGFnc1xuICogQHJldHVybiB7UmVnRXhwfHN0cmluZ31cbiAqL1xuZnVuY3Rpb24gc3RyaW5nVG9SZWdFeHAoc3RyaW5nLCBmbGFncykge1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBuZXcgUmVnRXhwKHN0cmluZywgZmxhZ3MpO1xuICAgIH0gY2F0Y2ggKGUpIHsgcmV0dXJuIHN0cmluZzsgfVxufVxuXG5mdW5jdGlvbiBvYmplY3RUb1JlZ0V4cChvYmopIHtcbiAgICByZXR1cm4gc3RyaW5nVG9SZWdFeHAob2JqLmV4cHJlc3Npb24sIG9iai5mbGFncyk7XG59XG5cbi8qKlxuICogSW1wbGVtZW50cyBpbW1lZGlhdGUgc2VhcmNoaW5nIHdoaWxlIHRoZSB1c2VyIGlzIHR5cGluZy4gV2hlbiBpbmNyZW1lbnRhbFxuICogc2VhcmNoIGlzIGFjdGl2YXRlZCwga2V5c3Ryb2tlcyBpbnRvIHRoZSBlZGl0b3Igd2lsbCBiZSB1c2VkIGZvciBjb21wb3NpbmdcbiAqIGEgc2VhcmNoIHRlcm0uIEltbWVkaWF0ZWx5IGFmdGVyIGV2ZXJ5IGtleXN0cm9rZSB0aGUgc2VhcmNoIGlzIHVwZGF0ZWQ6XG4gKiAtIHNvLWZhci1tYXRjaGluZyBjaGFyYWN0ZXJzIGFyZSBoaWdobGlnaHRlZFxuICogLSB0aGUgY3Vyc29yIGlzIG1vdmVkIHRvIHRoZSBuZXh0IG1hdGNoXG4gKlxuICoqL1xuY2xhc3MgSW5jcmVtZW50YWxTZWFyY2ggZXh0ZW5kcyBTZWFyY2gge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgYEluY3JlbWVudGFsU2VhcmNoYCBvYmplY3QuXG4gICAgICoqL1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLiRvcHRpb25zID0ge3dyYXA6IGZhbHNlLCBza2lwQ3VycmVudDogZmFsc2V9O1xuICAgICAgICB0aGlzLiRrZXlib2FyZEhhbmRsZXIgPSBuZXcgSVNlYXJjaEtiZCh0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGJhY2t3YXJkc1xuICAgICAqL1xuICAgIGFjdGl2YXRlKGVkaXRvciwgYmFja3dhcmRzKSB7XG4gICAgICAgIHRoaXMuJGVkaXRvciA9IGVkaXRvcjtcbiAgICAgICAgdGhpcy4kc3RhcnRQb3MgPSB0aGlzLiRjdXJyZW50UG9zID0gZWRpdG9yLmdldEN1cnNvclBvc2l0aW9uKCk7XG4gICAgICAgIHRoaXMuJG9wdGlvbnMubmVlZGxlID0gJyc7XG4gICAgICAgIHRoaXMuJG9wdGlvbnMuYmFja3dhcmRzID0gYmFja3dhcmRzO1xuICAgICAgICBlZGl0b3Iua2V5QmluZGluZy5hZGRLZXlib2FyZEhhbmRsZXIodGhpcy4ka2V5Ym9hcmRIYW5kbGVyKTtcbiAgICAgICAgLy8gd2UgbmVlZCB0byBjb21wbGV0ZWx5IGludGVyY2VwdCBwYXN0ZSwganVzdCByZWdpc3RlcmluZyBhbiBldmVudCBoYW5kbGVyIGRvZXMgbm90IHdvcmtcbiAgICAgICAgdGhpcy4kb3JpZ2luYWxFZGl0b3JPblBhc3RlID0gZWRpdG9yLm9uUGFzdGU7XG4gICAgICAgIGVkaXRvci5vblBhc3RlID0gdGhpcy5vblBhc3RlLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuJG1vdXNlZG93bkhhbmRsZXIgPSBlZGl0b3Iub24oJ21vdXNlZG93bicsIHRoaXMub25Nb3VzZURvd24uYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uRml4KGVkaXRvcik7XG4gICAgICAgIHRoaXMuc3RhdHVzTWVzc2FnZSh0cnVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtyZXNldF1cbiAgICAgKi9cbiAgICBkZWFjdGl2YXRlKHJlc2V0KSB7XG4gICAgICAgIHRoaXMuY2FuY2VsU2VhcmNoKHJlc2V0KTtcbiAgICAgICAgdmFyIGVkaXRvciA9IHRoaXMuJGVkaXRvcjtcbiAgICAgICAgZWRpdG9yLmtleUJpbmRpbmcucmVtb3ZlS2V5Ym9hcmRIYW5kbGVyKHRoaXMuJGtleWJvYXJkSGFuZGxlcik7XG4gICAgICAgIGlmICh0aGlzLiRtb3VzZWRvd25IYW5kbGVyKSB7XG4gICAgICAgICAgICBlZGl0b3Iub2ZmKCdtb3VzZWRvd24nLCB0aGlzLiRtb3VzZWRvd25IYW5kbGVyKTtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLiRtb3VzZWRvd25IYW5kbGVyO1xuICAgICAgICB9XG4gICAgICAgIGVkaXRvci5vblBhc3RlID0gdGhpcy4kb3JpZ2luYWxFZGl0b3JPblBhc3RlO1xuICAgICAgICB0aGlzLm1lc3NhZ2UoJycpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7RWRpdG9yfSBlZGl0b3JcbiAgICAgKi9cbiAgICBzZWxlY3Rpb25GaXgoZWRpdG9yKSB7XG4gICAgICAgIC8vIEZpeCBzZWxlY3Rpb24gYnVnOiBXaGVuIGNsaWNrZWQgaW5zaWRlIHRoZSBlZGl0b3JcbiAgICAgICAgLy8gZWRpdG9yLnNlbGVjdGlvbi4kaXNFbXB0eSBpcyBmYWxzZSBldmVuIGlmIHRoZSBtb3VzZSBjbGljayBkaWQgbm90XG4gICAgICAgIC8vIG9wZW4gYSBzZWxlY3Rpb24uIFRoaXMgaXMgaW50ZXJwcmV0ZWQgYnkgdGhlIG1vdmUgY29tbWFuZHMgdG9cbiAgICAgICAgLy8gZXh0ZW5kIHRoZSBzZWxlY3Rpb24uIFRvIG9ubHkgZXh0ZW5kIHRoZSBzZWxlY3Rpb24gd2hlbiB0aGVyZSBpc1xuICAgICAgICAvLyBvbmUsIHdlIGNsZWFyIGl0IGhlcmVcbiAgICAgICAgaWYgKGVkaXRvci5zZWxlY3Rpb24uaXNFbXB0eSgpICYmICFlZGl0b3Iuc2Vzc2lvbi4kZW1hY3NNYXJrKSB7XG4gICAgICAgICAgICBlZGl0b3IuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7UmVnRXhwfSByZWdleHBcbiAgICAgKi9cbiAgICBoaWdobGlnaHQocmVnZXhwKSB7XG4gICAgICAgIHZhciBzZXNzID0gdGhpcy4kZWRpdG9yLnNlc3Npb24sXG4gICAgICAgICAgICBobCA9IHNlc3MuJGlzZWFyY2hIaWdobGlnaHQgPSBzZXNzLiRpc2VhcmNoSGlnaGxpZ2h0IHx8IHNlc3MuYWRkRHluYW1pY01hcmtlcihcbiAgICAgICAgICAgICAgICBuZXcgU2VhcmNoSGlnaGxpZ2h0KG51bGwsIFwiYWNlX2lzZWFyY2gtcmVzdWx0XCIsIFwidGV4dFwiKSk7XG4gICAgICAgIGhsLnNldFJlZ2V4cChyZWdleHApO1xuICAgICAgICBzZXNzLl9lbWl0KFwiY2hhbmdlQmFja01hcmtlclwiKTsgLy8gZm9yY2UgaGlnaGxpZ2h0IGxheWVyIHJlZHJhd1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW3Jlc2V0XVxuICAgICAqL1xuICAgIGNhbmNlbFNlYXJjaChyZXNldCkge1xuICAgICAgICB2YXIgZSA9IHRoaXMuJGVkaXRvcjtcbiAgICAgICAgdGhpcy4kcHJldk5lZWRsZSA9IHRoaXMuJG9wdGlvbnMubmVlZGxlO1xuICAgICAgICB0aGlzLiRvcHRpb25zLm5lZWRsZSA9ICcnO1xuICAgICAgICBpZiAocmVzZXQpIHtcbiAgICAgICAgICAgIGUubW92ZUN1cnNvclRvUG9zaXRpb24odGhpcy4kc3RhcnRQb3MpO1xuICAgICAgICAgICAgdGhpcy4kY3VycmVudFBvcyA9IHRoaXMuJHN0YXJ0UG9zO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZS5wdXNoRW1hY3NNYXJrICYmIGUucHVzaEVtYWNzTWFyayh0aGlzLiRzdGFydFBvcywgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0KG51bGwpO1xuICAgICAgICByZXR1cm4gUmFuZ2UuZnJvbVBvaW50cyh0aGlzLiRjdXJyZW50UG9zLCB0aGlzLiRjdXJyZW50UG9zKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IG1vdmVUb05leHRcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBuZWVkbGVVcGRhdGVGdW5jXG4gICAgICovXG4gICAgaGlnaGxpZ2h0QW5kRmluZFdpdGhOZWVkbGUobW92ZVRvTmV4dCwgbmVlZGxlVXBkYXRlRnVuYykge1xuICAgICAgICBpZiAoIXRoaXMuJGVkaXRvcikgcmV0dXJuIG51bGw7XG4gICAgICAgIHZhciBvcHRpb25zID0gdGhpcy4kb3B0aW9ucztcblxuICAgICAgICAvLyBnZXQgc2VhcmNoIHRlcm1cbiAgICAgICAgaWYgKG5lZWRsZVVwZGF0ZUZ1bmMpIHtcbiAgICAgICAgICAgIG9wdGlvbnMubmVlZGxlID0gbmVlZGxlVXBkYXRlRnVuYy5jYWxsKHRoaXMsIG9wdGlvbnMubmVlZGxlIHx8ICcnKSB8fCAnJztcbiAgICAgICAgfVxuICAgICAgICBpZiAob3B0aW9ucy5uZWVkbGUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXR1c01lc3NhZ2UodHJ1ZSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jYW5jZWxTZWFyY2godHJ1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB0cnkgdG8gZmluZCB0aGUgbmV4dCBvY2N1cnJlbmNlIGFuZCBlbmFibGUgIGhpZ2hsaWdodGluZyBtYXJrZXJcbiAgICAgICAgb3B0aW9ucy5zdGFydCA9IHRoaXMuJGN1cnJlbnRQb3M7XG4gICAgICAgIHZhciBzZXNzaW9uID0gdGhpcy4kZWRpdG9yLnNlc3Npb24sXG4gICAgICAgICAgICBmb3VuZCA9IHRoaXMuZmluZChzZXNzaW9uKSxcbiAgICAgICAgICAgIHNob3VsZFNlbGVjdCA9IHRoaXMuJGVkaXRvci5lbWFjc01hcmsgP1xuICAgICAgICAgICAgICAgICEhdGhpcy4kZWRpdG9yLmVtYWNzTWFyaygpIDogIXRoaXMuJGVkaXRvci5zZWxlY3Rpb24uaXNFbXB0eSgpO1xuICAgICAgICBpZiAoZm91bmQpIHtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmJhY2t3YXJkcykgZm91bmQgPSBSYW5nZS5mcm9tUG9pbnRzKGZvdW5kLmVuZCwgZm91bmQuc3RhcnQpO1xuICAgICAgICAgICAgdGhpcy4kZWRpdG9yLnNlbGVjdGlvbi5zZXRSYW5nZShSYW5nZS5mcm9tUG9pbnRzKHNob3VsZFNlbGVjdCA/IHRoaXMuJHN0YXJ0UG9zIDogZm91bmQuZW5kLCBmb3VuZC5lbmQpKTtcbiAgICAgICAgICAgIGlmIChtb3ZlVG9OZXh0KSB0aGlzLiRjdXJyZW50UG9zID0gZm91bmQuZW5kO1xuICAgICAgICAgICAgLy8gaGlnaGxpZ2h0IGFmdGVyIGN1cnNvciBtb3ZlLCBzbyBzZWxlY3Rpb24gd29ya3MgcHJvcGVybHlcbiAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0KG9wdGlvbnMucmUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zdGF0dXNNZXNzYWdlKGZvdW5kKTtcblxuICAgICAgICByZXR1cm4gZm91bmQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNcbiAgICAgKi9cbiAgICBhZGRTdHJpbmcocykge1xuICAgICAgICByZXR1cm4gdGhpcy5oaWdobGlnaHRBbmRGaW5kV2l0aE5lZWRsZShmYWxzZSwgZnVuY3Rpb24obmVlZGxlKSB7XG4gICAgICAgICAgICBpZiAoIWlzUmVnRXhwKG5lZWRsZSkpXG4gICAgICAgICAgICAgIHJldHVybiBuZWVkbGUgKyBzO1xuICAgICAgICAgICAgdmFyIHJlT2JqID0gcmVnRXhwVG9PYmplY3QobmVlZGxlKTtcbiAgICAgICAgICAgIHJlT2JqLmV4cHJlc3Npb24gKz0gcztcbiAgICAgICAgICAgIHJldHVybiBvYmplY3RUb1JlZ0V4cChyZU9iaik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7YW55fSBjXG4gICAgICovXG4gICAgcmVtb3ZlQ2hhcihjKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhpZ2hsaWdodEFuZEZpbmRXaXRoTmVlZGxlKGZhbHNlLCBmdW5jdGlvbihuZWVkbGUpIHtcbiAgICAgICAgICAgIGlmICghaXNSZWdFeHAobmVlZGxlKSlcbiAgICAgICAgICAgICAgcmV0dXJuIG5lZWRsZS5zdWJzdHJpbmcoMCwgbmVlZGxlLmxlbmd0aC0xKTtcbiAgICAgICAgICAgIHZhciByZU9iaiA9IHJlZ0V4cFRvT2JqZWN0KG5lZWRsZSk7XG4gICAgICAgICAgICByZU9iai5leHByZXNzaW9uID0gcmVPYmouZXhwcmVzc2lvbi5zdWJzdHJpbmcoMCwgcmVPYmouZXhwcmVzc2lvbi5sZW5ndGgtMSk7XG4gICAgICAgICAgICByZXR1cm4gb2JqZWN0VG9SZWdFeHAocmVPYmopO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZXh0KG9wdGlvbnMpIHtcbiAgICAgICAgLy8gdHJ5IHRvIGZpbmQgdGhlIG5leHQgb2NjdXJyZW5jZSBvZiB3aGF0ZXZlciB3ZSBoYXZlIHNlYXJjaGVkIGZvclxuICAgICAgICAvLyBlYXJsaWVyLlxuICAgICAgICAvLyBvcHRpb25zID0ge1tiYWNrd2FyZHM6IEJPT0xdLCBbdXNlQ3VycmVudE9yUHJldlNlYXJjaDogQk9PTF19XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICB0aGlzLiRvcHRpb25zLmJhY2t3YXJkcyA9ICEhb3B0aW9ucy5iYWNrd2FyZHM7XG4gICAgICAgIHRoaXMuJGN1cnJlbnRQb3MgPSB0aGlzLiRlZGl0b3IuZ2V0Q3Vyc29yUG9zaXRpb24oKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGlnaGxpZ2h0QW5kRmluZFdpdGhOZWVkbGUodHJ1ZSwgZnVuY3Rpb24obmVlZGxlKSB7XG4gICAgICAgICAgICByZXR1cm4gb3B0aW9ucy51c2VDdXJyZW50T3JQcmV2U2VhcmNoICYmIG5lZWRsZS5sZW5ndGggPT09IDAgP1xuICAgICAgICAgICAgICAgIHRoaXMuJHByZXZOZWVkbGUgfHwgJycgOiBuZWVkbGU7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBpbnRlcm5hbFxuICAgICAqL1xuICAgIG9uTW91c2VEb3duKGV2dCkge1xuICAgICAgICAvLyB3aGVuIG1vdXNlIGludGVyYWN0aW9uIGhhcHBlbnMgdGhlbiB3ZSBxdWl0IGluY3JlbWVudGFsIHNlYXJjaFxuICAgICAgICB0aGlzLmRlYWN0aXZhdGUoKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRleHRcbiAgICAgKiBAaW50ZXJuYWxcbiAgICAgKi9cbiAgICBvblBhc3RlKHRleHQpIHtcbiAgICAgICAgdGhpcy5hZGRTdHJpbmcodGV4dCk7XG4gICAgfVxuXG4gICAgY29udmVydE5lZWRsZVRvUmVnRXhwKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5oaWdobGlnaHRBbmRGaW5kV2l0aE5lZWRsZShmYWxzZSwgZnVuY3Rpb24obmVlZGxlKSB7XG4gICAgICAgICAgICByZXR1cm4gaXNSZWdFeHAobmVlZGxlKSA/IG5lZWRsZSA6IHN0cmluZ1RvUmVnRXhwKG5lZWRsZSwgJ2lnJyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnZlcnROZWVkbGVUb1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGlnaGxpZ2h0QW5kRmluZFdpdGhOZWVkbGUoZmFsc2UsIGZ1bmN0aW9uKG5lZWRsZSkge1xuICAgICAgICAgICAgcmV0dXJuIGlzUmVnRXhwKG5lZWRsZSkgPyByZWdFeHBUb09iamVjdChuZWVkbGUpLmV4cHJlc3Npb24gOiBuZWVkbGU7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0YXR1c01lc3NhZ2UoZm91bmQpIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB0aGlzLiRvcHRpb25zLCBtc2cgPSAnJztcbiAgICAgICAgbXNnICs9IG9wdGlvbnMuYmFja3dhcmRzID8gJ3JldmVyc2UtJyA6ICcnO1xuICAgICAgICBtc2cgKz0gJ2lzZWFyY2g6ICcgKyBvcHRpb25zLm5lZWRsZTtcbiAgICAgICAgbXNnICs9IGZvdW5kID8gJycgOiAnIChub3QgZm91bmQpJztcbiAgICAgICAgdGhpcy5tZXNzYWdlKG1zZyk7XG4gICAgfVxuXG4gICAgbWVzc2FnZShtc2cpIHtcbiAgICAgICAgaWYgKHRoaXMuJGVkaXRvci5zaG93Q29tbWFuZExpbmUpIHtcbiAgICAgICAgICAgIHRoaXMuJGVkaXRvci5zaG93Q29tbWFuZExpbmUobXNnKTtcbiAgICAgICAgICAgIHRoaXMuJGVkaXRvci5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuXG59XG5cbmV4cG9ydHMuSW5jcmVtZW50YWxTZWFyY2ggPSBJbmNyZW1lbnRhbFNlYXJjaDtcblxuXG4vKipcbiAqXG4gKiBDb25maWcgc2V0dGluZ3MgZm9yIGVuYWJsaW5nL2Rpc2FibGluZyBbW0luY3JlbWVudGFsU2VhcmNoIGBJbmNyZW1lbnRhbFNlYXJjaGBdXS5cbiAqXG4gKiovXG5cbnZhciBkb20gPSByZXF1aXJlKCcuL2xpYi9kb20nKTtcbmRvbS5pbXBvcnRDc3NTdHJpbmcoYFxuLmFjZV9tYXJrZXItbGF5ZXIgLmFjZV9pc2VhcmNoLXJlc3VsdCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgei1pbmRleDogNjtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbn1cbmRpdi5hY2VfaXNlYXJjaC1yZXN1bHQge1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyMDAsIDAsIDAuNSk7XG4gIGJveC1zaGFkb3c6IDAgMCA0cHggcmdiKDI1NSwgMjAwLCAwKTtcbn1cbi5hY2VfZGFyayBkaXYuYWNlX2lzZWFyY2gtcmVzdWx0IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDEwMCwgMTEwLCAxNjApO1xuICBib3gtc2hhZG93OiAwIDAgNHB4IHJnYig4MCwgOTAsIDE0MCk7XG59YCwgXCJpbmNyZW1lbnRhbC1zZWFyY2gtaGlnaGxpZ2h0aW5nXCIsIGZhbHNlKTtcblxuLy8gc3VwcG9ydCBmb3IgZGVmYXVsdCBrZXlib2FyZCBoYW5kbGVyXG52YXIgY29tbWFuZHMgPSByZXF1aXJlKFwiLi9jb21tYW5kcy9jb21tYW5kX21hbmFnZXJcIik7XG4oZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5zZXR1cEluY3JlbWVudGFsU2VhcmNoID0gZnVuY3Rpb24oZWRpdG9yLCB2YWwpIHtcbiAgICAgICAgaWYgKHRoaXMudXNlc0luY3JlbWVudGFsU2VhcmNoID09IHZhbCkgcmV0dXJuO1xuICAgICAgICB0aGlzLnVzZXNJbmNyZW1lbnRhbFNlYXJjaCA9IHZhbDtcbiAgICAgICAgdmFyIGlTZWFyY2hDb21tYW5kcyA9IGlTZWFyY2hDb21tYW5kTW9kdWxlLmlTZWFyY2hTdGFydENvbW1hbmRzO1xuICAgICAgICB2YXIgbWV0aG9kID0gdmFsID8gJ2FkZENvbW1hbmRzJyA6ICdyZW1vdmVDb21tYW5kcyc7XG4gICAgICAgIHRoaXNbbWV0aG9kXShpU2VhcmNoQ29tbWFuZHMpO1xuICAgIH07XG59KS5jYWxsKGNvbW1hbmRzLkNvbW1hbmRNYW5hZ2VyLnByb3RvdHlwZSk7XG5cbi8vIGluY3JlbWVudGFsIHNlYXJjaCBjb25maWcgb3B0aW9uXG52YXIgRWRpdG9yID0gcmVxdWlyZShcIi4vZWRpdG9yXCIpLkVkaXRvcjtcbnJlcXVpcmUoXCIuL2NvbmZpZ1wiKS5kZWZpbmVPcHRpb25zKEVkaXRvci5wcm90b3R5cGUsIFwiZWRpdG9yXCIsIHtcbiAgICB1c2VJbmNyZW1lbnRhbFNlYXJjaDoge1xuICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAgICAgdGhpcy5rZXlCaW5kaW5nLiRoYW5kbGVycy5mb3JFYWNoKGZ1bmN0aW9uKGhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICBpZiAoaGFuZGxlci5zZXR1cEluY3JlbWVudGFsU2VhcmNoKSB7XG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZXIuc2V0dXBJbmNyZW1lbnRhbFNlYXJjaCh0aGlzLCB2YWwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5fZW1pdCgnaW5jcmVtZW50YWxTZWFyY2hTZXR0aW5nQ2hhbmdlZCcsIHtpc0VuYWJsZWQ6IHZhbH0pO1xuICAgICAgICB9XG4gICAgfVxufSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGRvbSA9IHJlcXVpcmUoXCIuLi9saWIvZG9tXCIpO1xucmVxdWlyZShcIi4uL2luY3JlbWVudGFsX3NlYXJjaFwiKTtcbnZhciBpU2VhcmNoQ29tbWFuZE1vZHVsZSA9IHJlcXVpcmUoXCIuLi9jb21tYW5kcy9pbmNyZW1lbnRhbF9zZWFyY2hfY29tbWFuZHNcIik7XG5cblxudmFyIEhhc2hIYW5kbGVyID0gcmVxdWlyZShcIi4vaGFzaF9oYW5kbGVyXCIpLkhhc2hIYW5kbGVyO1xuZXhwb3J0cy5oYW5kbGVyID0gbmV3IEhhc2hIYW5kbGVyKCk7XG5cbmV4cG9ydHMuaGFuZGxlci5pc0VtYWNzID0gdHJ1ZTtcbmV4cG9ydHMuaGFuZGxlci4kaWQgPSBcImFjZS9rZXlib2FyZC9lbWFjc1wiO1xuXG5cbmRvbS5pbXBvcnRDc3NTdHJpbmcoYFxuLmVtYWNzLW1vZGUgLmFjZV9jdXJzb3J7XG4gICAgYm9yZGVyOiAxcHggcmdiYSg1MCwyNTAsNTAsMC44KSBzb2xpZCFpbXBvcnRhbnQ7XG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveCFpbXBvcnRhbnQ7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLDI1MCwwLDAuOSk7XG4gICAgb3BhY2l0eTogMC41O1xufVxuLmVtYWNzLW1vZGUgLmFjZV9oaWRkZW4tY3Vyc29ycyAuYWNlX2N1cnNvcntcbiAgICBvcGFjaXR5OiAxO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xufVxuLmVtYWNzLW1vZGUgLmFjZV9vdmVyd3JpdGUtY3Vyc29ycyAuYWNlX2N1cnNvciB7XG4gICAgb3BhY2l0eTogMTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICBib3JkZXItd2lkdGg6IDAgMCAycHggMnB4ICFpbXBvcnRhbnQ7XG59XG4uZW1hY3MtbW9kZSAuYWNlX3RleHQtbGF5ZXIge1xuICAgIHotaW5kZXg6IDRcbn1cbi5lbWFjcy1tb2RlIC5hY2VfY3Vyc29yLWxheWVyIHtcbiAgICB6LWluZGV4OiAyXG59YCwgJ2VtYWNzTW9kZSdcbik7XG52YXIgJGZvcm1lckxvbmdXb3JkcztcbnZhciAkZm9ybWVyTGluZVN0YXJ0O1xuXG5leHBvcnRzLmhhbmRsZXIuYXR0YWNoID0gZnVuY3Rpb24oZWRpdG9yKSB7XG4gICAgLy8gaW4gZW1hY3MsIGdvdG93b3JkbGVmdC9yaWdodCBzaG91bGQgbm90IGNvdW50IGEgc3BhY2UgYXMgYSB3b3JkLi5cbiAgICAkZm9ybWVyTG9uZ1dvcmRzID0gZWRpdG9yLnNlc3Npb24uJHNlbGVjdExvbmdXb3JkcztcbiAgICBlZGl0b3Iuc2Vzc2lvbi4kc2VsZWN0TG9uZ1dvcmRzID0gdHJ1ZTtcbiAgICAvLyBDVFJMLUEgc2hvdWxkIGdvIHRvIGFjdHVhbCBiZWdpbm5pbmcgb2YgbGluZVxuICAgICRmb3JtZXJMaW5lU3RhcnQgPSBlZGl0b3Iuc2Vzc2lvbi4kdXNlRW1hY3NTdHlsZUxpbmVTdGFydDtcbiAgICBlZGl0b3Iuc2Vzc2lvbi4kdXNlRW1hY3NTdHlsZUxpbmVTdGFydCA9IHRydWU7XG5cbiAgICBlZGl0b3Iuc2Vzc2lvbi4kZW1hY3NNYXJrID0gbnVsbDsgLy8gdGhlIGFjdGl2ZSBtYXJrXG4gICAgZWRpdG9yLnNlc3Npb24uJGVtYWNzTWFya1JpbmcgPSBlZGl0b3Iuc2Vzc2lvbi4kZW1hY3NNYXJrUmluZyB8fCBbXTtcblxuICAgIGVkaXRvci5lbWFjc01hcmsgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2Vzc2lvbi4kZW1hY3NNYXJrO1xuICAgIH07XG5cbiAgICBlZGl0b3Iuc2V0RW1hY3NNYXJrID0gZnVuY3Rpb24ocCkge1xuICAgICAgICAvLyB0byBkZWFjdGl2YXRlIHBhc3MgaW4gYSBmYWxzeSB2YWx1ZVxuICAgICAgICB0aGlzLnNlc3Npb24uJGVtYWNzTWFyayA9IHA7XG4gICAgfTtcblxuICAgIGVkaXRvci5wdXNoRW1hY3NNYXJrID0gZnVuY3Rpb24ocCwgYWN0aXZhdGUpIHtcbiAgICAgICAgdmFyIHByZXZNYXJrID0gdGhpcy5zZXNzaW9uLiRlbWFjc01hcms7XG4gICAgICAgIGlmIChwcmV2TWFyaylcbiAgICAgICAgICAgIHB1c2hVbmlxdWUodGhpcy5zZXNzaW9uLiRlbWFjc01hcmtSaW5nLCBwcmV2TWFyayk7XG4gICAgICAgIGlmICghcCB8fCBhY3RpdmF0ZSkgdGhpcy5zZXRFbWFjc01hcmsocCk7XG4gICAgICAgIGVsc2UgcHVzaFVuaXF1ZSh0aGlzLnNlc3Npb24uJGVtYWNzTWFya1JpbmcsIHApO1xuICAgIH07XG5cbiAgICBlZGl0b3IucG9wRW1hY3NNYXJrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBtYXJrID0gdGhpcy5lbWFjc01hcmsoKTtcbiAgICAgICAgaWYgKG1hcmspIHsgdGhpcy5zZXRFbWFjc01hcmsobnVsbCk7IHJldHVybiBtYXJrOyB9XG4gICAgICAgIHJldHVybiB0aGlzLnNlc3Npb24uJGVtYWNzTWFya1JpbmcucG9wKCk7XG4gICAgfTtcblxuICAgIGVkaXRvci5nZXRMYXN0RW1hY3NNYXJrID0gZnVuY3Rpb24ocCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXNzaW9uLiRlbWFjc01hcmsgfHwgdGhpcy5zZXNzaW9uLiRlbWFjc01hcmtSaW5nLnNsaWNlKC0xKVswXTtcbiAgICB9O1xuXG4gICAgZWRpdG9yLmVtYWNzTWFya0ZvclNlbGVjdGlvbiA9IGZ1bmN0aW9uKHJlcGxhY2VtZW50KSB7XG4gICAgICAgIC8vIGZpbmQgdGhlIG1hcmsgaW4gJGVtYWNzTWFya1JpbmcgY29ycmVzcG9uZGluZyB0byB0aGUgY3VycmVudFxuICAgICAgICAvLyBzZWxlY3Rpb25cbiAgICAgICAgdmFyIHNlbCA9IHRoaXMuc2VsZWN0aW9uLFxuICAgICAgICAgICAgbXVsdGlSYW5nZUxlbmd0aCA9IHRoaXMubXVsdGlTZWxlY3QgP1xuICAgICAgICAgICAgICAgIHRoaXMubXVsdGlTZWxlY3QuZ2V0QWxsUmFuZ2VzKCkubGVuZ3RoIDogMSxcbiAgICAgICAgICAgIHNlbEluZGV4ID0gc2VsLmluZGV4IHx8IDAsXG4gICAgICAgICAgICBtYXJrUmluZyA9IHRoaXMuc2Vzc2lvbi4kZW1hY3NNYXJrUmluZyxcbiAgICAgICAgICAgIG1hcmtJbmRleCA9IG1hcmtSaW5nLmxlbmd0aCAtIChtdWx0aVJhbmdlTGVuZ3RoIC0gc2VsSW5kZXgpLFxuICAgICAgICAgICAgbGFzdE1hcmsgPSBtYXJrUmluZ1ttYXJrSW5kZXhdIHx8IHNlbC5hbmNob3I7XG4gICAgICAgIGlmIChyZXBsYWNlbWVudCkge1xuICAgICAgICAgICAgbWFya1Jpbmcuc3BsaWNlKG1hcmtJbmRleCwgMSxcbiAgICAgICAgICAgICAgICBcInJvd1wiIGluIHJlcGxhY2VtZW50ICYmIFwiY29sdW1uXCIgaW4gcmVwbGFjZW1lbnQgP1xuICAgICAgICAgICAgICAgICAgICByZXBsYWNlbWVudCA6IHVuZGVmaW5lZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxhc3RNYXJrO1xuICAgIH07XG5cbiAgICBlZGl0b3Iub24oXCJjbGlja1wiLCAkcmVzZXRNYXJrTW9kZSk7XG4gICAgZWRpdG9yLm9uKFwiY2hhbmdlU2Vzc2lvblwiLCAka2JTZXNzaW9uQ2hhbmdlKTtcbiAgICBlZGl0b3IucmVuZGVyZXIuJGJsb2NrQ3Vyc29yID0gdHJ1ZTtcbiAgICBlZGl0b3Iuc2V0U3R5bGUoXCJlbWFjcy1tb2RlXCIpO1xuICAgIGVkaXRvci5jb21tYW5kcy5hZGRDb21tYW5kcyhjb21tYW5kcyk7XG4gICAgZXhwb3J0cy5oYW5kbGVyLnBsYXRmb3JtID0gZWRpdG9yLmNvbW1hbmRzLnBsYXRmb3JtO1xuICAgIGVkaXRvci4kZW1hY3NNb2RlSGFuZGxlciA9IHRoaXM7XG4gICAgZWRpdG9yLm9uKCdjb3B5JywgdGhpcy5vbkNvcHkpO1xuICAgIGVkaXRvci5vbigncGFzdGUnLCB0aGlzLm9uUGFzdGUpO1xufTtcblxuZnVuY3Rpb24gcHVzaFVuaXF1ZShyaW5nLCBtYXJrKSB7XG4gICAgdmFyIGxhc3QgPSByaW5nW3JpbmcubGVuZ3RoIC0gMV07XG4gICAgaWYgKGxhc3QgJiYgbGFzdC5yb3cgPT09IG1hcmsucm93ICYmIGxhc3QuY29sdW1uID09PSBtYXJrLmNvbHVtbikge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHJpbmcucHVzaChtYXJrKTtcbn1cblxuZXhwb3J0cy5oYW5kbGVyLmRldGFjaCA9IGZ1bmN0aW9uKGVkaXRvcikge1xuICAgIGVkaXRvci5yZW5kZXJlci4kYmxvY2tDdXJzb3IgPSBmYWxzZTtcbiAgICBlZGl0b3Iuc2Vzc2lvbi4kc2VsZWN0TG9uZ1dvcmRzID0gJGZvcm1lckxvbmdXb3JkcztcbiAgICBlZGl0b3Iuc2Vzc2lvbi4kdXNlRW1hY3NTdHlsZUxpbmVTdGFydCA9ICRmb3JtZXJMaW5lU3RhcnQ7XG4gICAgZWRpdG9yLm9mZihcImNsaWNrXCIsICRyZXNldE1hcmtNb2RlKTtcbiAgICBlZGl0b3Iub2ZmKFwiY2hhbmdlU2Vzc2lvblwiLCAka2JTZXNzaW9uQ2hhbmdlKTtcbiAgICBlZGl0b3IudW5zZXRTdHlsZShcImVtYWNzLW1vZGVcIik7XG4gICAgZWRpdG9yLmNvbW1hbmRzLnJlbW92ZUNvbW1hbmRzKGNvbW1hbmRzKTtcbiAgICBlZGl0b3Iub2ZmKCdjb3B5JywgdGhpcy5vbkNvcHkpO1xuICAgIGVkaXRvci5vZmYoJ3Bhc3RlJywgdGhpcy5vblBhc3RlKTtcbiAgICBlZGl0b3IuJGVtYWNzTW9kZUhhbmRsZXIgPSBudWxsO1xufTtcblxudmFyICRrYlNlc3Npb25DaGFuZ2UgPSBmdW5jdGlvbihlKSB7XG4gICAgaWYgKGUub2xkU2Vzc2lvbikge1xuICAgICAgICBlLm9sZFNlc3Npb24uJHNlbGVjdExvbmdXb3JkcyA9ICRmb3JtZXJMb25nV29yZHM7XG4gICAgICAgIGUub2xkU2Vzc2lvbi4kdXNlRW1hY3NTdHlsZUxpbmVTdGFydCA9ICRmb3JtZXJMaW5lU3RhcnQ7XG4gICAgfVxuXG4gICAgJGZvcm1lckxvbmdXb3JkcyA9IGUuc2Vzc2lvbi4kc2VsZWN0TG9uZ1dvcmRzO1xuICAgIGUuc2Vzc2lvbi4kc2VsZWN0TG9uZ1dvcmRzID0gdHJ1ZTtcbiAgICAkZm9ybWVyTGluZVN0YXJ0ID0gZS5zZXNzaW9uLiR1c2VFbWFjc1N0eWxlTGluZVN0YXJ0O1xuICAgIGUuc2Vzc2lvbi4kdXNlRW1hY3NTdHlsZUxpbmVTdGFydCA9IHRydWU7XG5cbiAgICBpZiAoIWUuc2Vzc2lvbi5oYXNPd25Qcm9wZXJ0eSgnJGVtYWNzTWFyaycpKVxuICAgICAgICBlLnNlc3Npb24uJGVtYWNzTWFyayA9IG51bGw7XG4gICAgaWYgKCFlLnNlc3Npb24uaGFzT3duUHJvcGVydHkoJyRlbWFjc01hcmtSaW5nJykpXG4gICAgICAgIGUuc2Vzc2lvbi4kZW1hY3NNYXJrUmluZyA9IFtdO1xufTtcblxudmFyICRyZXNldE1hcmtNb2RlID0gZnVuY3Rpb24oZSkge1xuICAgIGUuZWRpdG9yLnNlc3Npb24uJGVtYWNzTWFyayA9IG51bGw7XG59O1xuXG52YXIga2V5cyA9IHJlcXVpcmUoXCIuLi9saWIva2V5c1wiKS5LRVlfTU9EUztcbnZhciBlTW9kcyA9IHtDOiBcImN0cmxcIiwgUzogXCJzaGlmdFwiLCBNOiBcImFsdFwiLCBDTUQ6IFwiY29tbWFuZFwifTtcbnZhciBjb21iaW5hdGlvbnMgPSBbXCJDLVMtTS1DTURcIixcbiAgICAgICAgICAgICAgICAgICAgXCJTLU0tQ01EXCIsIFwiQy1NLUNNRFwiLCBcIkMtUy1DTURcIiwgXCJDLVMtTVwiLFxuICAgICAgICAgICAgICAgICAgICBcIk0tQ01EXCIsIFwiUy1DTURcIiwgXCJTLU1cIiwgXCJDLUNNRFwiLCBcIkMtTVwiLCBcIkMtU1wiLFxuICAgICAgICAgICAgICAgICAgICBcIkNNRFwiLCBcIk1cIiwgXCJTXCIsIFwiQ1wiXTtcbmNvbWJpbmF0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKGMpIHtcbiAgICB2YXIgaGFzaElkID0gMDtcbiAgICBjLnNwbGl0KFwiLVwiKS5mb3JFYWNoKGZ1bmN0aW9uKGMpIHtcbiAgICAgICAgaGFzaElkID0gaGFzaElkIHwga2V5c1tlTW9kc1tjXV07XG4gICAgfSk7XG4gICAgZU1vZHNbaGFzaElkXSA9IGMudG9Mb3dlckNhc2UoKSArIFwiLVwiO1xufSk7XG5cbmV4cG9ydHMuaGFuZGxlci5vbkNvcHkgPSBmdW5jdGlvbihlLCBlZGl0b3IpIHtcbiAgICBpZiAoZWRpdG9yLiRoYW5kbGVzRW1hY3NPbkNvcHkpIHJldHVybjtcbiAgICBlZGl0b3IuJGhhbmRsZXNFbWFjc09uQ29weSA9IHRydWU7XG4gICAgZXhwb3J0cy5oYW5kbGVyLmNvbW1hbmRzLmtpbGxSaW5nU2F2ZS5leGVjKGVkaXRvcik7XG4gICAgZWRpdG9yLiRoYW5kbGVzRW1hY3NPbkNvcHkgPSBmYWxzZTtcbn07XG5cbmV4cG9ydHMuaGFuZGxlci5vblBhc3RlID0gZnVuY3Rpb24oZSwgZWRpdG9yKSB7XG4gICAgZWRpdG9yLnB1c2hFbWFjc01hcmsoZWRpdG9yLmdldEN1cnNvclBvc2l0aW9uKCkpO1xufTtcblxuZXhwb3J0cy5oYW5kbGVyLmJpbmRLZXkgPSBmdW5jdGlvbihrZXksIGNvbW1hbmQpIHtcbiAgICBpZiAodHlwZW9mIGtleSA9PSBcIm9iamVjdFwiKVxuICAgICAgICBrZXkgPSBrZXlbdGhpcy5wbGF0Zm9ybV07XG4gICAgaWYgKCFrZXkpXG4gICAgICAgIHJldHVybjtcblxuICAgIHZhciBja2IgPSB0aGlzLmNvbW1hbmRLZXlCaW5kaW5nO1xuICAgIGtleS5zcGxpdChcInxcIikuZm9yRWFjaChmdW5jdGlvbihrZXlQYXJ0KSB7XG4gICAgICAgIGtleVBhcnQgPSBrZXlQYXJ0LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGNrYltrZXlQYXJ0XSA9IGNvbW1hbmQ7XG4gICAgICAgIC8vIHJlZ2lzdGVyIGFsbCBwYXJ0aWFsIGtleSBjb21ib3MgYXMgbnVsbCBjb21tYW5kc1xuICAgICAgICAvLyB0byBiZSBhYmxlIHRvIGFjdGl2YXRlIGtleSBjb21ib3Mgd2l0aCBhcmJpdHJhcnkgbGVuZ3RoXG4gICAgICAgIC8vIEV4YW1wbGU6IGlmIGtleVBhcnQgaXMgXCJDLWMgQy1sIHRcIiB0aGVuIFwiQy1jIEMtbCB0XCIgd2lsbFxuICAgICAgICAvLyBnZXQgY29tbWFuZCBhc3NpZ25lZCBhbmQgXCJDLWNcIiBhbmQgXCJDLWMgQy1sXCIgd2lsbCBnZXRcbiAgICAgICAgLy8gYSBudWxsIGNvbW1hbmQgYXNzaWduZWQgaW4gdGhpcy5jb21tYW5kS2V5QmluZGluZy4gRm9yXG4gICAgICAgIC8vIHRoZSBsb29rdXAgbG9naWMgc2VlIGhhbmRsZUtleWJvYXJkKClcbiAgICAgICAgdmFyIGtleVBhcnRzID0ga2V5UGFydC5zcGxpdChcIiBcIikuc2xpY2UoMCwtMSk7XG4gICAgICAgIGtleVBhcnRzLnJlZHVjZShmdW5jdGlvbihrZXlNYXBLZXlzLCBrZXlQYXJ0LCBpKSB7XG4gICAgICAgICAgICB2YXIgcHJlZml4ID0ga2V5TWFwS2V5c1tpLTFdID8ga2V5TWFwS2V5c1tpLTFdICsgJyAnIDogJyc7XG4gICAgICAgICAgICByZXR1cm4ga2V5TWFwS2V5cy5jb25jYXQoW3ByZWZpeCArIGtleVBhcnRdKTtcbiAgICAgICAgfSwgW10pLmZvckVhY2goZnVuY3Rpb24oa2V5UGFydCkge1xuICAgICAgICAgICAgaWYgKCFja2Jba2V5UGFydF0pIGNrYltrZXlQYXJ0XSA9IFwibnVsbFwiO1xuICAgICAgICB9KTtcbiAgICB9LCB0aGlzKTtcbn07XG5cbmV4cG9ydHMuaGFuZGxlci5nZXRTdGF0dXNUZXh0ID0gZnVuY3Rpb24oZWRpdG9yLCBkYXRhKSB7XG4gIHZhciBzdHIgPSBcIlwiO1xuICBpZiAoZGF0YS5jb3VudClcbiAgICBzdHIgKz0gZGF0YS5jb3VudDtcbiAgaWYgKGRhdGEua2V5Q2hhaW4pXG4gICAgc3RyICs9IFwiIFwiICsgZGF0YS5rZXlDaGFpbjtcbiAgcmV0dXJuIHN0cjtcbn07XG5cbmV4cG9ydHMuaGFuZGxlci5oYW5kbGVLZXlib2FyZCA9IGZ1bmN0aW9uKGRhdGEsIGhhc2hJZCwga2V5LCBrZXlDb2RlKSB7XG4gICAgLy8gaWYga2V5Q29kZSA9PSAtMSBhIG5vbi1wcmludGFibGUga2V5IHdhcyBwcmVzc2VkLCBzdWNoIGFzIGp1c3RcbiAgICAvLyBjb250cm9sLiBIYW5kbGluZyB0aG9zZSBpcyBjdXJyZW50bHkgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGhhbmRsZXJcbiAgICBpZiAoa2V5Q29kZSA9PT0gLTEpIHJldHVybiB1bmRlZmluZWQ7XG5cbiAgICB2YXIgZWRpdG9yID0gZGF0YS5lZGl0b3I7XG4gICAgZWRpdG9yLl9zaWduYWwoXCJjaGFuZ2VTdGF0dXNcIik7XG4gICAgLy8gaW5zZXJ0c3RyaW5nIGRhdGEuY291bnQgdGltZXNcbiAgICBpZiAoaGFzaElkID09IC0xKSB7XG4gICAgICAgIGVkaXRvci5wdXNoRW1hY3NNYXJrKCk7XG4gICAgICAgIGlmIChkYXRhLmNvdW50KSB7XG4gICAgICAgICAgICB2YXIgc3RyID0gbmV3IEFycmF5KGRhdGEuY291bnQgKyAxKS5qb2luKGtleSk7XG4gICAgICAgICAgICBkYXRhLmNvdW50ID0gbnVsbDtcbiAgICAgICAgICAgIHJldHVybiB7Y29tbWFuZDogXCJpbnNlcnRzdHJpbmdcIiwgYXJnczogc3RyfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciBtb2RpZmllciA9IGVNb2RzW2hhc2hJZF07XG5cbiAgICAvLyBDVFJMICsgbnVtYmVyIC8gdW5pdmVyc2FsQXJndW1lbnQgZm9yIHNldHRpbmcgZGF0YS5jb3VudFxuICAgIGlmIChtb2RpZmllciA9PSBcImMtXCIgfHwgZGF0YS5jb3VudCkge1xuICAgICAgICB2YXIgY291bnQgPSBwYXJzZUludChrZXlba2V5Lmxlbmd0aCAtIDFdKTtcbiAgICAgICAgaWYgKHR5cGVvZiBjb3VudCA9PT0gJ251bWJlcicgJiYgIWlzTmFOKGNvdW50KSkge1xuICAgICAgICAgICAgZGF0YS5jb3VudCA9IE1hdGgubWF4KGRhdGEuY291bnQsIDApIHx8IDA7XG4gICAgICAgICAgICBkYXRhLmNvdW50ID0gMTAgKiBkYXRhLmNvdW50ICsgY291bnQ7XG4gICAgICAgICAgICByZXR1cm4ge2NvbW1hbmQ6IFwibnVsbFwifTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHRoaXMuY29tbWFuZEtleUJpbmRpbmcgbWFwcyBrZXkgc3BlY3MgbGlrZSBcImMtcFwiIChmb3IgQ1RSTCArIFApIHRvXG4gICAgLy8gY29tbWFuZCBvYmplY3RzLCBmb3IgbG9va3VwIGtleSBuZWVkcyB0byBpbmNsdWRlIHRoZSBtb2RpZmllclxuICAgIGlmIChtb2RpZmllcikga2V5ID0gbW9kaWZpZXIgKyBrZXk7XG5cbiAgICAvLyBLZXkgY29tYm9zIGxpa2UgQ1RSTCtYIEggYnVpbGQgdXAgdGhlIGRhdGEua2V5Q2hhaW5cbiAgICBpZiAoZGF0YS5rZXlDaGFpbikga2V5ID0gZGF0YS5rZXlDaGFpbiArPSBcIiBcIiArIGtleTtcblxuICAgIC8vIEtleSBjb21ibyBwcmVmaXhlcyBnZXQgc3RvcmVkIGFzIFwibnVsbFwiIChTdHJpbmchKSBpbiB0aGlzXG4gICAgLy8gdGhpcy5jb21tYW5kS2V5QmluZGluZy4gV2hlbiBlbmNvdW50ZXJlZCBubyBjb21tYW5kIGlzIGludm9rZWQgYnV0IHdlXG4gICAgLy8gYnVsZCB1cCBkYXRhLmtleUNoYWluXG4gICAgdmFyIGNvbW1hbmQgPSB0aGlzLmNvbW1hbmRLZXlCaW5kaW5nW2tleV07XG4gICAgZGF0YS5rZXlDaGFpbiA9IGNvbW1hbmQgPT0gXCJudWxsXCIgPyBrZXkgOiBcIlwiO1xuXG4gICAgLy8gdGhlcmUgcmVhbGx5IGlzIG5vIGNvbW1hbmRcbiAgICBpZiAoIWNvbW1hbmQpIHJldHVybiB1bmRlZmluZWQ7XG5cbiAgICAvLyB3ZSBwYXNzIGIvYyBvZiBrZXkgY29tYm8gb3IgdW5pdmVyc2FsQXJndW1lbnRcbiAgICBpZiAoY29tbWFuZCA9PT0gXCJudWxsXCIpIHJldHVybiB7Y29tbWFuZDogXCJudWxsXCJ9O1xuXG4gICAgaWYgKGNvbW1hbmQgPT09IFwidW5pdmVyc2FsQXJndW1lbnRcIikge1xuICAgICAgICAvLyBpZiBubyBudW1iZXIgcHJlc3NlZCBlbWFjcyByZXBlYXRzIGFjdGlvbiA0IHRpbWVzLlxuICAgICAgICAvLyBtaW51cyBzaWduIGlzIG5lZWRlZCB0byBhbGxvdyBuZXh0IGtleXByZXNzIHRvIHJlcGxhY2UgaXRcbiAgICAgICAgZGF0YS5jb3VudCA9IC00O1xuICAgICAgICByZXR1cm4ge2NvbW1hbmQ6IFwibnVsbFwifTtcbiAgICB9XG5cbiAgICAvLyBsb29rdXAgY29tbWFuZFxuICAgIC8vIFRPRE8gZXh0cmFjdCBzcGVjaWFsIGhhbmRsaW5nIG9mIG1hcmttb2RlXG4gICAgLy8gVE9ETyBzcGVjaWFsIGNhc2UgY29tbWFuZC5jb21tYW5kIGlzIHJlYWxseSB1bm5lY2Vzc2FyeSwgcmVtb3ZlXG4gICAgdmFyIGFyZ3M7XG4gICAgaWYgKHR5cGVvZiBjb21tYW5kICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGFyZ3MgPSBjb21tYW5kLmFyZ3M7XG4gICAgICAgIGlmIChjb21tYW5kLmNvbW1hbmQpIGNvbW1hbmQgPSBjb21tYW5kLmNvbW1hbmQ7XG4gICAgICAgIGlmIChjb21tYW5kID09PSBcImdvb3JzZWxlY3RcIikge1xuICAgICAgICAgICAgY29tbWFuZCA9IGVkaXRvci5lbWFjc01hcmsoKSA/IGFyZ3NbMV0gOiBhcmdzWzBdO1xuICAgICAgICAgICAgYXJncyA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGNvbW1hbmQgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgaWYgKGNvbW1hbmQgPT09IFwiaW5zZXJ0c3RyaW5nXCIgfHxcbiAgICAgICAgICAgIGNvbW1hbmQgPT09IFwic3BsaXRsaW5lXCIgfHxcbiAgICAgICAgICAgIGNvbW1hbmQgPT09IFwidG9nZ2xlY29tbWVudFwiKSB7XG4gICAgICAgICAgICBlZGl0b3IucHVzaEVtYWNzTWFyaygpO1xuICAgICAgICB9XG4gICAgICAgIGNvbW1hbmQgPSB0aGlzLmNvbW1hbmRzW2NvbW1hbmRdIHx8IGVkaXRvci5jb21tYW5kcy5jb21tYW5kc1tjb21tYW5kXTtcbiAgICAgICAgaWYgKCFjb21tYW5kKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGlmICghY29tbWFuZC5yZWFkT25seSAmJiAhY29tbWFuZC5pc1lhbmspXG4gICAgICAgIGRhdGEubGFzdENvbW1hbmQgPSBudWxsO1xuXG4gICAgaWYgKCFjb21tYW5kLnJlYWRPbmx5ICYmIGVkaXRvci5lbWFjc01hcmsoKSlcbiAgICAgICAgZWRpdG9yLnNldEVtYWNzTWFyayhudWxsKTtcbiAgICAgICAgXG4gICAgaWYgKGRhdGEuY291bnQpIHtcbiAgICAgICAgdmFyIGNvdW50ID0gZGF0YS5jb3VudDtcbiAgICAgICAgZGF0YS5jb3VudCA9IDA7XG4gICAgICAgIGlmICghY29tbWFuZCB8fCAhY29tbWFuZC5oYW5kbGVzQ291bnQpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgYXJnczogYXJncyxcbiAgICAgICAgICAgICAgICBjb21tYW5kOiB7XG4gICAgICAgICAgICAgICAgICAgIGV4ZWM6IGZ1bmN0aW9uKGVkaXRvciwgYXJncykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudDsgaSsrKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1hbmQuZXhlYyhlZGl0b3IsIGFyZ3MpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBtdWx0aVNlbGVjdEFjdGlvbjogY29tbWFuZC5tdWx0aVNlbGVjdEFjdGlvblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIWFyZ3MpIGFyZ3MgPSB7fTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgYXJncyA9PT0gJ29iamVjdCcpIGFyZ3MuY291bnQgPSBjb3VudDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7Y29tbWFuZDogY29tbWFuZCwgYXJnczogYXJnc307XG59O1xuXG5leHBvcnRzLmVtYWNzS2V5cyA9IHtcbiAgICAvLyBtb3ZlbWVudFxuICAgIFwiVXB8Qy1wXCIgICAgICA6IHtjb21tYW5kOiBcImdvb3JzZWxlY3RcIiwgYXJnczogW1wiZ29saW5ldXBcIixcInNlbGVjdHVwXCJdfSxcbiAgICBcIkRvd258Qy1uXCIgICAgOiB7Y29tbWFuZDogXCJnb29yc2VsZWN0XCIsIGFyZ3M6IFtcImdvbGluZWRvd25cIixcInNlbGVjdGRvd25cIl19LFxuICAgIFwiTGVmdHxDLWJcIiAgICA6IHtjb21tYW5kOiBcImdvb3JzZWxlY3RcIiwgYXJnczogW1wiZ290b2xlZnRcIixcInNlbGVjdGxlZnRcIl19LFxuICAgIFwiUmlnaHR8Qy1mXCIgICA6IHtjb21tYW5kOiBcImdvb3JzZWxlY3RcIiwgYXJnczogW1wiZ290b3JpZ2h0XCIsXCJzZWxlY3RyaWdodFwiXX0sXG4gICAgXCJDLUxlZnR8TS1iXCIgIDoge2NvbW1hbmQ6IFwiZ29vcnNlbGVjdFwiLCBhcmdzOiBbXCJnb3Rvd29yZGxlZnRcIixcInNlbGVjdHdvcmRsZWZ0XCJdfSxcbiAgICBcIkMtUmlnaHR8TS1mXCIgOiB7Y29tbWFuZDogXCJnb29yc2VsZWN0XCIsIGFyZ3M6IFtcImdvdG93b3JkcmlnaHRcIixcInNlbGVjdHdvcmRyaWdodFwiXX0sXG4gICAgXCJIb21lfEMtYVwiICAgIDoge2NvbW1hbmQ6IFwiZ29vcnNlbGVjdFwiLCBhcmdzOiBbXCJnb3RvbGluZXN0YXJ0XCIsXCJzZWxlY3R0b2xpbmVzdGFydFwiXX0sXG4gICAgXCJFbmR8Qy1lXCIgICAgIDoge2NvbW1hbmQ6IFwiZ29vcnNlbGVjdFwiLCBhcmdzOiBbXCJnb3RvbGluZWVuZFwiLFwic2VsZWN0dG9saW5lZW5kXCJdfSxcbiAgICBcIkMtSG9tZXxTLU0tLFwiOiB7Y29tbWFuZDogXCJnb29yc2VsZWN0XCIsIGFyZ3M6IFtcImdvdG9zdGFydFwiLFwic2VsZWN0dG9zdGFydFwiXX0sXG4gICAgXCJDLUVuZHxTLU0tLlwiIDoge2NvbW1hbmQ6IFwiZ29vcnNlbGVjdFwiLCBhcmdzOiBbXCJnb3RvZW5kXCIsXCJzZWxlY3R0b2VuZFwiXX0sXG5cbiAgICAvLyBzZWxlY3Rpb25cbiAgICBcIlMtVXB8Uy1DLXBcIiAgICAgIDogXCJzZWxlY3R1cFwiLFxuICAgIFwiUy1Eb3dufFMtQy1uXCIgICAgOiBcInNlbGVjdGRvd25cIixcbiAgICBcIlMtTGVmdHxTLUMtYlwiICAgIDogXCJzZWxlY3RsZWZ0XCIsXG4gICAgXCJTLVJpZ2h0fFMtQy1mXCIgICA6IFwic2VsZWN0cmlnaHRcIixcbiAgICBcIlMtQy1MZWZ0fFMtTS1iXCIgIDogXCJzZWxlY3R3b3JkbGVmdFwiLFxuICAgIFwiUy1DLVJpZ2h0fFMtTS1mXCIgOiBcInNlbGVjdHdvcmRyaWdodFwiLFxuICAgIFwiUy1Ib21lfFMtQy1hXCIgICAgOiBcInNlbGVjdHRvbGluZXN0YXJ0XCIsXG4gICAgXCJTLUVuZHxTLUMtZVwiICAgICA6IFwic2VsZWN0dG9saW5lZW5kXCIsXG4gICAgXCJTLUMtSG9tZVwiICAgICAgICA6IFwic2VsZWN0dG9zdGFydFwiLFxuICAgIFwiUy1DLUVuZFwiICAgICAgICAgOiBcInNlbGVjdHRvZW5kXCIsXG5cbiAgICBcIkMtbFwiIDogXCJyZWNlbnRlclRvcEJvdHRvbVwiLFxuICAgIFwiTS1zXCIgOiBcImNlbnRlcnNlbGVjdGlvblwiLFxuICAgIFwiTS1nXCI6IFwiZ290b2xpbmVcIixcbiAgICBcIkMteCBDLXBcIjogXCJzZWxlY3RhbGxcIixcblxuICAgIC8vIHRvZG8gZml4IHRoZXNlXG4gICAgXCJDLURvd25cIjoge2NvbW1hbmQ6IFwiZ29vcnNlbGVjdFwiLCBhcmdzOiBbXCJnb3RvcGFnZWRvd25cIixcInNlbGVjdHBhZ2Vkb3duXCJdfSxcbiAgICBcIkMtVXBcIjoge2NvbW1hbmQ6IFwiZ29vcnNlbGVjdFwiLCBhcmdzOiBbXCJnb3RvcGFnZXVwXCIsXCJzZWxlY3RwYWdldXBcIl19LFxuICAgIFwiUGFnZURvd258Qy12XCI6IHtjb21tYW5kOiBcImdvb3JzZWxlY3RcIiwgYXJnczogW1wiZ290b3BhZ2Vkb3duXCIsXCJzZWxlY3RwYWdlZG93blwiXX0sXG4gICAgXCJQYWdlVXB8TS12XCI6IHtjb21tYW5kOiBcImdvb3JzZWxlY3RcIiwgYXJnczogW1wiZ290b3BhZ2V1cFwiLFwic2VsZWN0cGFnZXVwXCJdfSxcbiAgICBcIlMtQy1Eb3duXCI6IFwic2VsZWN0cGFnZWRvd25cIixcbiAgICBcIlMtQy1VcFwiOiBcInNlbGVjdHBhZ2V1cFwiLFxuXG4gICAgXCJDLXNcIjogXCJpU2VhcmNoXCIsXG4gICAgXCJDLXJcIjogXCJpU2VhcmNoQmFja3dhcmRzXCIsXG5cbiAgICBcIk0tQy1zXCI6IFwiZmluZG5leHRcIixcbiAgICBcIk0tQy1yXCI6IFwiZmluZHByZXZpb3VzXCIsXG4gICAgXCJTLU0tNVwiOiBcInJlcGxhY2VcIixcblxuICAgIC8vIGJhc2ljIGVkaXRpbmdcbiAgICBcIkJhY2tzcGFjZVwiOiBcImJhY2tzcGFjZVwiLFxuICAgIFwiRGVsZXRlfEMtZFwiOiBcImRlbFwiLFxuICAgIFwiUmV0dXJufEMtbVwiOiB7Y29tbWFuZDogXCJpbnNlcnRzdHJpbmdcIiwgYXJnczogXCJcXG5cIn0sIC8vIFwibmV3bGluZVwiXG4gICAgXCJDLW9cIjogXCJzcGxpdGxpbmVcIixcblxuICAgIFwiTS1kfEMtRGVsZXRlXCI6IHtjb21tYW5kOiBcImtpbGxXb3JkXCIsIGFyZ3M6IFwicmlnaHRcIn0sXG4gICAgXCJDLUJhY2tzcGFjZXxNLUJhY2tzcGFjZXxNLURlbGV0ZVwiOiB7Y29tbWFuZDogXCJraWxsV29yZFwiLCBhcmdzOiBcImxlZnRcIn0sXG4gICAgXCJDLWtcIjogXCJraWxsTGluZVwiLFxuXG4gICAgXCJDLXl8Uy1EZWxldGVcIjogXCJ5YW5rXCIsXG4gICAgXCJNLXlcIjogXCJ5YW5rUm90YXRlXCIsXG4gICAgXCJDLWdcIjogXCJrZXlib2FyZFF1aXRcIixcblxuICAgIFwiQy13fEMtUy1XXCI6IFwia2lsbFJlZ2lvblwiLFxuICAgIFwiTS13XCI6IFwia2lsbFJpbmdTYXZlXCIsXG4gICAgXCJDLVNwYWNlXCI6IFwic2V0TWFya1wiLFxuICAgIFwiQy14IEMteFwiOiBcImV4Y2hhbmdlUG9pbnRBbmRNYXJrXCIsXG5cbiAgICBcIkMtdFwiOiBcInRyYW5zcG9zZWxldHRlcnNcIixcbiAgICBcIk0tdVwiOiBcInRvdXBwZXJjYXNlXCIsICAgIC8vIERvZXNuJ3Qgd29ya1xuICAgIFwiTS1sXCI6IFwidG9sb3dlcmNhc2VcIixcbiAgICBcIk0tL1wiOiBcImF1dG9jb21wbGV0ZVwiLCAgIC8vIERvZXNuJ3Qgd29ya1xuICAgIFwiQy11XCI6IFwidW5pdmVyc2FsQXJndW1lbnRcIixcblxuICAgIFwiTS07XCI6IFwidG9nZ2xlY29tbWVudFwiLFxuXG4gICAgXCJDLS98Qy14IHV8Uy1DLS18Qy16XCI6IFwidW5kb1wiLFxuICAgIFwiUy1DLS98Uy1DLXggdXxDLS18Uy1DLXpcIjogXCJyZWRvXCIsIC8vIGluZmluaXRlIHVuZG8/XG4gICAgLy8gdmVydGljYWwgZWRpdGluZ1xuICAgIFwiQy14IHJcIjogIFwic2VsZWN0UmVjdGFuZ3VsYXJSZWdpb25cIixcbiAgICBcIk0teFwiOiB7Y29tbWFuZDogXCJmb2N1c0NvbW1hbmRMaW5lXCIsIGFyZ3M6IFwiTS14IFwifVxuICAgIC8vIHRvZG9cbiAgICAvLyBcIkMteCBDLXRcIiBcIk0tdFwiIFwiTS1jXCIgXCJGMTFcIiBcIkMtTS0gXCJNLXFcIlxufTtcblxuXG5leHBvcnRzLmhhbmRsZXIuYmluZEtleXMoZXhwb3J0cy5lbWFjc0tleXMpO1xuXG5leHBvcnRzLmhhbmRsZXIuYWRkQ29tbWFuZHMoe1xuICAgIHJlY2VudGVyVG9wQm90dG9tOiBmdW5jdGlvbihlZGl0b3IpIHtcbiAgICAgICAgdmFyIHJlbmRlcmVyID0gZWRpdG9yLnJlbmRlcmVyO1xuICAgICAgICB2YXIgcG9zID0gcmVuZGVyZXIuJGN1cnNvckxheWVyLmdldFBpeGVsUG9zaXRpb24oKTtcbiAgICAgICAgdmFyIGggPSByZW5kZXJlci4kc2l6ZS5zY3JvbGxlckhlaWdodCAtIHJlbmRlcmVyLmxpbmVIZWlnaHQ7XG4gICAgICAgIHZhciBzY3JvbGxUb3AgPSByZW5kZXJlci5zY3JvbGxUb3A7XG4gICAgICAgIGlmIChNYXRoLmFicyhwb3MudG9wIC0gc2Nyb2xsVG9wKSA8IDIpIHtcbiAgICAgICAgICAgIHNjcm9sbFRvcCA9IHBvcy50b3AgLSBoO1xuICAgICAgICB9IGVsc2UgaWYgKE1hdGguYWJzKHBvcy50b3AgLSBzY3JvbGxUb3AgLSBoICogMC41KSA8IDIpIHtcbiAgICAgICAgICAgIHNjcm9sbFRvcCA9IHBvcy50b3A7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzY3JvbGxUb3AgPSBwb3MudG9wIC0gaCAqIDAuNTtcbiAgICAgICAgfVxuICAgICAgICBlZGl0b3Iuc2Vzc2lvbi5zZXRTY3JvbGxUb3Aoc2Nyb2xsVG9wKTtcbiAgICB9LFxuICAgIHNlbGVjdFJlY3Rhbmd1bGFyUmVnaW9uOiAgZnVuY3Rpb24oZWRpdG9yKSB7XG4gICAgICAgIGVkaXRvci5tdWx0aVNlbGVjdC50b2dnbGVCbG9ja1NlbGVjdGlvbigpO1xuICAgIH0sXG4gICAgc2V0TWFyazogIHtcbiAgICAgICAgZXhlYzogZnVuY3Rpb24oZWRpdG9yLCBhcmdzKSB7XG4gICAgICAgICAgICAvLyBTZXRzIG1hcmstbW9kZSBhbmQgY2xlYXJzIGN1cnJlbnQgc2VsZWN0aW9uLlxuICAgICAgICAgICAgLy8gV2hlbiBtYXJrIGlzIHNldCwga2V5Ym9hcmQgY3Vyc29yIG1vdmVtZW50IGNvbW1hbmRzIGJlY29tZVxuICAgICAgICAgICAgLy8gc2VsZWN0aW9uIG1vZGlmaWNhdGlvbiBjb21tYW5kcy4gVGhhdCBpcyxcbiAgICAgICAgICAgIC8vIFwiZ290b1wiIGNvbW1hbmRzIGJlY29tZSBcInNlbGVjdFwiIGNvbW1hbmRzLlxuICAgICAgICAgICAgLy8gQW55IGluc2VydGlvbiBvciBtb3VzZSBjbGljayByZXNldHMgbWFyay1tb2RlLlxuICAgICAgICAgICAgLy8gc2V0TWFyayB0d2ljZSBpbiBhIHJvdyBhdCB0aGUgc2FtZSBwbGFjZSByZXNldHMgbWFya21vZGUuXG4gICAgICAgICAgICAvLyBpbiBtdWx0aSBzZWxlY3QgbW9kZSwgZWEgc2VsZWN0aW9uIGlzIGhhbmRsZWQgaW5kaXZpZHVhbGx5XG5cbiAgICAgICAgICAgIGlmIChhcmdzICYmIGFyZ3MuY291bnQpIHtcbiAgICAgICAgICAgICAgICBpZiAoZWRpdG9yLmluTXVsdGlTZWxlY3RNb2RlKSBlZGl0b3IuZm9yRWFjaFNlbGVjdGlvbihtb3ZlVG9NYXJrKTtcbiAgICAgICAgICAgICAgICBlbHNlIG1vdmVUb01hcmsoKTtcbiAgICAgICAgICAgICAgICBtb3ZlVG9NYXJrKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgbWFyayA9IGVkaXRvci5lbWFjc01hcmsoKSxcbiAgICAgICAgICAgICAgICByYW5nZXMgPSBlZGl0b3Iuc2VsZWN0aW9uLmdldEFsbFJhbmdlcygpLFxuICAgICAgICAgICAgICAgIHJhbmdlUG9zaXRpb25zID0gcmFuZ2VzLm1hcChmdW5jdGlvbihyKSB7IHJldHVybiB7cm93OiByLnN0YXJ0LnJvdywgY29sdW1uOiByLnN0YXJ0LmNvbHVtbn07IH0pLFxuICAgICAgICAgICAgICAgIHRyYW5zaWVudE1hcmtNb2RlQWN0aXZlID0gdHJ1ZSxcbiAgICAgICAgICAgICAgICBoYXNOb1NlbGVjdGlvbiA9IHJhbmdlcy5ldmVyeShmdW5jdGlvbihyYW5nZSkgeyByZXR1cm4gcmFuZ2UuaXNFbXB0eSgpOyB9KTtcbiAgICAgICAgICAgIC8vIGlmIHRyYW5zaWVudE1hcmtNb2RlQWN0aXZlIHRoZW4gbWFyayBiZWhhdmlvciBpcyBhIGxpdHRsZVxuICAgICAgICAgICAgLy8gZGlmZmVyZW50LiBEZWFjdGl2YXRlIHRoZSBtYXJrIHdoZW4gc2V0TWFyayBpcyBydW4gd2l0aCBhY3RpdmVcbiAgICAgICAgICAgIC8vIG1hcmtcbiAgICAgICAgICAgIGlmICh0cmFuc2llbnRNYXJrTW9kZUFjdGl2ZSAmJiAobWFyayB8fCAhaGFzTm9TZWxlY3Rpb24pKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVkaXRvci5pbk11bHRpU2VsZWN0TW9kZSkgZWRpdG9yLmZvckVhY2hTZWxlY3Rpb24oe2V4ZWM6IGVkaXRvci5jbGVhclNlbGVjdGlvbi5iaW5kKGVkaXRvcil9KTtcbiAgICAgICAgICAgICAgICBlbHNlIGVkaXRvci5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICAgICAgICAgIGlmIChtYXJrKSBlZGl0b3IucHVzaEVtYWNzTWFyayhudWxsKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghbWFyaykge1xuICAgICAgICAgICAgICAgIHJhbmdlUG9zaXRpb25zLmZvckVhY2goZnVuY3Rpb24ocG9zKSB7IGVkaXRvci5wdXNoRW1hY3NNYXJrKHBvcyk7IH0pO1xuICAgICAgICAgICAgICAgIGVkaXRvci5zZXRFbWFjc01hcmsocmFuZ2VQb3NpdGlvbnNbcmFuZ2VQb3NpdGlvbnMubGVuZ3RoLTFdKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIC09LT0tPS09LT0tPS09LT0tPS09LT0tPS09LT0tPS09LT0tPS09LT0tPS09LT0tPS09LT0tPS1cblxuICAgICAgICAgICAgZnVuY3Rpb24gbW92ZVRvTWFyaygpIHtcbiAgICAgICAgICAgICAgICB2YXIgbWFyayA9IGVkaXRvci5wb3BFbWFjc01hcmsoKTtcbiAgICAgICAgICAgICAgICBtYXJrICYmIGVkaXRvci5tb3ZlQ3Vyc29yVG9Qb3NpdGlvbihtYXJrKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuICAgICAgICByZWFkT25seTogdHJ1ZSxcbiAgICAgICAgaGFuZGxlc0NvdW50OiB0cnVlXG4gICAgfSxcbiAgICBleGNoYW5nZVBvaW50QW5kTWFyazoge1xuICAgICAgICBleGVjOiBmdW5jdGlvbiBleGNoYW5nZVBvaW50QW5kTWFyayRleGVjKGVkaXRvciwgYXJncykge1xuICAgICAgICAgICAgdmFyIHNlbCA9IGVkaXRvci5zZWxlY3Rpb247XG4gICAgICAgICAgICBpZiAoIWFyZ3MuY291bnQgJiYgIXNlbC5pc0VtcHR5KCkpIHsgLy8ganVzdCBpbnZlcnQgc2VsZWN0aW9uXG4gICAgICAgICAgICAgICAgc2VsLnNldFNlbGVjdGlvblJhbmdlKHNlbC5nZXRSYW5nZSgpLCAhc2VsLmlzQmFja3dhcmRzKCkpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGFyZ3MuY291bnQpIHsgLy8gcmVwbGFjZSBtYXJrIGFuZCBwb2ludFxuICAgICAgICAgICAgICAgIHZhciBwb3MgPSB7cm93OiBzZWwubGVhZC5yb3csIGNvbHVtbjogc2VsLmxlYWQuY29sdW1ufTtcbiAgICAgICAgICAgICAgICBzZWwuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgICAgICAgICBzZWwubW92ZUN1cnNvclRvUG9zaXRpb24oZWRpdG9yLmVtYWNzTWFya0ZvclNlbGVjdGlvbihwb3MpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7IC8vIGNyZWF0ZSBzZWxlY3Rpb24gdG8gbGFzdCBtYXJrXG4gICAgICAgICAgICAgICAgc2VsLnNlbGVjdFRvUG9zaXRpb24oZWRpdG9yLmVtYWNzTWFya0ZvclNlbGVjdGlvbigpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcmVhZE9ubHk6IHRydWUsXG4gICAgICAgIGhhbmRsZXNDb3VudDogdHJ1ZSxcbiAgICAgICAgbXVsdGlTZWxlY3RBY3Rpb246IFwiZm9yRWFjaFwiXG4gICAgfSxcbiAgICBraWxsV29yZDoge1xuICAgICAgICBleGVjOiBmdW5jdGlvbihlZGl0b3IsIGRpcikge1xuICAgICAgICAgICAgZWRpdG9yLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgICAgICBpZiAoZGlyID09IFwibGVmdFwiKVxuICAgICAgICAgICAgICAgIGVkaXRvci5zZWxlY3Rpb24uc2VsZWN0V29yZExlZnQoKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBlZGl0b3Iuc2VsZWN0aW9uLnNlbGVjdFdvcmRSaWdodCgpO1xuXG4gICAgICAgICAgICB2YXIgcmFuZ2UgPSBlZGl0b3IuZ2V0U2VsZWN0aW9uUmFuZ2UoKTtcbiAgICAgICAgICAgIHZhciB0ZXh0ID0gZWRpdG9yLnNlc3Npb24uZ2V0VGV4dFJhbmdlKHJhbmdlKTtcbiAgICAgICAgICAgIGV4cG9ydHMua2lsbFJpbmcuYWRkKHRleHQpO1xuXG4gICAgICAgICAgICBlZGl0b3Iuc2Vzc2lvbi5yZW1vdmUocmFuZ2UpO1xuICAgICAgICAgICAgZWRpdG9yLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgIH0sXG4gICAgICAgIG11bHRpU2VsZWN0QWN0aW9uOiBcImZvckVhY2hcIlxuICAgIH0sXG4gICAga2lsbExpbmU6IGZ1bmN0aW9uKGVkaXRvcikge1xuICAgICAgICBlZGl0b3IucHVzaEVtYWNzTWFyayhudWxsKTtcbiAgICAgICAgLy8gZG9uJ3QgZGVsZXRlIHRoZSBzZWxlY3Rpb24gaWYgaXQncyBiZWZvcmUgdGhlIGN1cnNvclxuICAgICAgICBlZGl0b3IuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgdmFyIHJhbmdlID0gZWRpdG9yLmdldFNlbGVjdGlvblJhbmdlKCk7XG4gICAgICAgIHZhciBsaW5lID0gZWRpdG9yLnNlc3Npb24uZ2V0TGluZShyYW5nZS5zdGFydC5yb3cpO1xuICAgICAgICByYW5nZS5lbmQuY29sdW1uID0gbGluZS5sZW5ndGg7XG4gICAgICAgIGxpbmUgPSBsaW5lLnN1YnN0cihyYW5nZS5zdGFydC5jb2x1bW4pO1xuICAgICAgICBcbiAgICAgICAgdmFyIGZvbGRMaW5lID0gZWRpdG9yLnNlc3Npb24uZ2V0Rm9sZExpbmUocmFuZ2Uuc3RhcnQucm93KTtcbiAgICAgICAgaWYgKGZvbGRMaW5lICYmIHJhbmdlLmVuZC5yb3cgIT0gZm9sZExpbmUuZW5kLnJvdykge1xuICAgICAgICAgICAgcmFuZ2UuZW5kLnJvdyA9IGZvbGRMaW5lLmVuZC5yb3c7XG4gICAgICAgICAgICBsaW5lID0gXCJ4XCI7XG4gICAgICAgIH1cbiAgICAgICAgLy8gcmVtb3ZlIEVPTCBpZiBvbmx5IHdoaXRlc3BhY2UgcmVtYWlucyBhZnRlciB0aGUgY3Vyc29yXG4gICAgICAgIGlmICgvXlxccyokLy50ZXN0KGxpbmUpKSB7XG4gICAgICAgICAgICByYW5nZS5lbmQucm93Kys7XG4gICAgICAgICAgICBsaW5lID0gZWRpdG9yLnNlc3Npb24uZ2V0TGluZShyYW5nZS5lbmQucm93KTtcbiAgICAgICAgICAgIHJhbmdlLmVuZC5jb2x1bW4gPSAvXlxccyokLy50ZXN0KGxpbmUpID8gbGluZS5sZW5ndGggOiAwO1xuICAgICAgICB9XG4gICAgICAgIHZhciB0ZXh0ID0gZWRpdG9yLnNlc3Npb24uZ2V0VGV4dFJhbmdlKHJhbmdlKTtcbiAgICAgICAgaWYgKGVkaXRvci5wcmV2T3AuY29tbWFuZCA9PSB0aGlzKVxuICAgICAgICAgICAgZXhwb3J0cy5raWxsUmluZy5hcHBlbmQodGV4dCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGV4cG9ydHMua2lsbFJpbmcuYWRkKHRleHQpO1xuXG4gICAgICAgIGVkaXRvci5zZXNzaW9uLnJlbW92ZShyYW5nZSk7XG4gICAgICAgIGVkaXRvci5jbGVhclNlbGVjdGlvbigpO1xuICAgIH0sXG4gICAgeWFuazogZnVuY3Rpb24oZWRpdG9yKSB7XG4gICAgICAgIGVkaXRvci5vblBhc3RlKGV4cG9ydHMua2lsbFJpbmcuZ2V0KCkgfHwgJycpO1xuICAgICAgICBlZGl0b3Iua2V5QmluZGluZy4kZGF0YS5sYXN0Q29tbWFuZCA9IFwieWFua1wiO1xuICAgIH0sXG4gICAgeWFua1JvdGF0ZTogZnVuY3Rpb24oZWRpdG9yKSB7XG4gICAgICAgIGlmIChlZGl0b3Iua2V5QmluZGluZy4kZGF0YS5sYXN0Q29tbWFuZCAhPSBcInlhbmtcIilcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgZWRpdG9yLnVuZG8oKTtcbiAgICAgICAgZWRpdG9yLnNlc3Npb24uJGVtYWNzTWFya1JpbmcucG9wKCk7IC8vIGFsc28gdW5kbyByZWNvcmRpbmcgbWFya1xuICAgICAgICBlZGl0b3Iub25QYXN0ZShleHBvcnRzLmtpbGxSaW5nLnJvdGF0ZSgpKTtcbiAgICAgICAgZWRpdG9yLmtleUJpbmRpbmcuJGRhdGEubGFzdENvbW1hbmQgPSBcInlhbmtcIjtcbiAgICB9LFxuICAgIGtpbGxSZWdpb246IHtcbiAgICAgICAgZXhlYzogZnVuY3Rpb24oZWRpdG9yKSB7XG4gICAgICAgICAgICBleHBvcnRzLmtpbGxSaW5nLmFkZChlZGl0b3IuZ2V0Q29weVRleHQoKSk7XG4gICAgICAgICAgICBlZGl0b3IuY29tbWFuZHMuYnlOYW1lLmN1dC5leGVjKGVkaXRvcik7XG4gICAgICAgICAgICBlZGl0b3Iuc2V0RW1hY3NNYXJrKG51bGwpO1xuICAgICAgICB9LFxuICAgICAgICByZWFkT25seTogdHJ1ZSxcbiAgICAgICAgbXVsdGlTZWxlY3RBY3Rpb246IFwiZm9yRWFjaFwiXG4gICAgfSxcbiAgICBraWxsUmluZ1NhdmU6IHtcbiAgICAgICAgZXhlYzogZnVuY3Rpb24oZWRpdG9yKSB7XG4gICAgICAgICAgICAvLyBjb3B5IHRleHQgYW5kIGRlc2VsZWN0LiB3aWxsIHNhdmUgbWFya3MgZm9yIHN0YXJ0cyBvZiB0aGVcbiAgICAgICAgICAgIC8vIHNlbGVjdGlvbihzKVxuXG4gICAgICAgICAgICBlZGl0b3IuJGhhbmRsZXNFbWFjc09uQ29weSA9IHRydWU7XG4gICAgICAgICAgICB2YXIgbWFya3MgPSBlZGl0b3Iuc2Vzc2lvbi4kZW1hY3NNYXJrUmluZy5zbGljZSgpLFxuICAgICAgICAgICAgICAgIGRlc2VsZWN0ZWRNYXJrcyA9IFtdO1xuICAgICAgICAgICAgZXhwb3J0cy5raWxsUmluZy5hZGQoZWRpdG9yLmdldENvcHlUZXh0KCkpO1xuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGRlc2VsZWN0KCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2VsID0gZWRpdG9yLnNlbGVjdGlvbiwgcmFuZ2UgPSBzZWwuZ2V0UmFuZ2UoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvcyA9IHNlbC5pc0JhY2t3YXJkcygpID8gcmFuZ2UuZW5kIDogcmFuZ2Uuc3RhcnQ7XG4gICAgICAgICAgICAgICAgICAgIGRlc2VsZWN0ZWRNYXJrcy5wdXNoKHtyb3c6IHBvcy5yb3csIGNvbHVtbjogcG9zLmNvbHVtbn0pO1xuICAgICAgICAgICAgICAgICAgICBzZWwuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWRpdG9yLiRoYW5kbGVzRW1hY3NPbkNvcHkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAoZWRpdG9yLmluTXVsdGlTZWxlY3RNb2RlKSBlZGl0b3IuZm9yRWFjaFNlbGVjdGlvbih7ZXhlYzogZGVzZWxlY3R9KTtcbiAgICAgICAgICAgICAgICBlbHNlIGRlc2VsZWN0KCk7XG4gICAgICAgICAgICAgICAgZWRpdG9yLnNldEVtYWNzTWFyayhudWxsKTtcbiAgICAgICAgICAgICAgICBlZGl0b3Iuc2Vzc2lvbi4kZW1hY3NNYXJrUmluZyA9IG1hcmtzLmNvbmNhdChkZXNlbGVjdGVkTWFya3MucmV2ZXJzZSgpKTtcbiAgICAgICAgICAgIH0sIDApO1xuICAgICAgICB9LFxuICAgICAgICByZWFkT25seTogdHJ1ZVxuICAgIH0sXG4gICAga2V5Ym9hcmRRdWl0OiBmdW5jdGlvbihlZGl0b3IpIHtcbiAgICAgICAgZWRpdG9yLnNlbGVjdGlvbi5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICBlZGl0b3Iuc2V0RW1hY3NNYXJrKG51bGwpO1xuICAgICAgICBlZGl0b3Iua2V5QmluZGluZy4kZGF0YS5jb3VudCA9IG51bGw7XG4gICAgfSxcbiAgICBmb2N1c0NvbW1hbmRMaW5lOiBmdW5jdGlvbihlZGl0b3IsIGFyZykge1xuICAgICAgICBpZiAoZWRpdG9yLnNob3dDb21tYW5kTGluZSlcbiAgICAgICAgICAgIGVkaXRvci5zaG93Q29tbWFuZExpbmUoYXJnKTtcbiAgICB9XG59KTtcblxuZXhwb3J0cy5oYW5kbGVyLmFkZENvbW1hbmRzKGlTZWFyY2hDb21tYW5kTW9kdWxlLmlTZWFyY2hTdGFydENvbW1hbmRzKTtcblxudmFyIGNvbW1hbmRzID0gZXhwb3J0cy5oYW5kbGVyLmNvbW1hbmRzO1xuY29tbWFuZHMueWFuay5pc1lhbmsgPSB0cnVlO1xuY29tbWFuZHMueWFua1JvdGF0ZS5pc1lhbmsgPSB0cnVlO1xuXG5leHBvcnRzLmtpbGxSaW5nID0ge1xuICAgICRkYXRhOiBbXSxcbiAgICBhZGQ6IGZ1bmN0aW9uKHN0cikge1xuICAgICAgICBzdHIgJiYgdGhpcy4kZGF0YS5wdXNoKHN0cik7XG4gICAgICAgIGlmICh0aGlzLiRkYXRhLmxlbmd0aCA+IDMwKVxuICAgICAgICAgICAgdGhpcy4kZGF0YS5zaGlmdCgpO1xuICAgIH0sXG4gICAgYXBwZW5kOiBmdW5jdGlvbihzdHIpIHtcbiAgICAgICAgdmFyIGlkeCA9IHRoaXMuJGRhdGEubGVuZ3RoIC0gMTtcbiAgICAgICAgdmFyIHRleHQgPSB0aGlzLiRkYXRhW2lkeF0gfHwgXCJcIjtcbiAgICAgICAgaWYgKHN0cikgdGV4dCArPSBzdHI7XG4gICAgICAgIGlmICh0ZXh0KSB0aGlzLiRkYXRhW2lkeF0gPSB0ZXh0O1xuICAgIH0sXG4gICAgZ2V0OiBmdW5jdGlvbihuKSB7XG4gICAgICAgIG4gPSBuIHx8IDE7XG4gICAgICAgIHJldHVybiB0aGlzLiRkYXRhLnNsaWNlKHRoaXMuJGRhdGEubGVuZ3RoLW4sIHRoaXMuJGRhdGEubGVuZ3RoKS5yZXZlcnNlKCkuam9pbignXFxuJyk7XG4gICAgfSxcbiAgICBwb3A6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy4kZGF0YS5sZW5ndGggPiAxKVxuICAgICAgICAgICAgdGhpcy4kZGF0YS5wb3AoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0KCk7XG4gICAgfSxcbiAgICByb3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLiRkYXRhLnVuc2hpZnQodGhpcy4kZGF0YS5wb3AoKSk7XG4gICAgICAgIHJldHVybiB0aGlzLmdldCgpO1xuICAgIH1cbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8qKlxuICogQHR5cGVkZWYge2ltcG9ydChcIi4vZWRpdG9yXCIpLkVkaXRvcn0gRWRpdG9yXG4gKiBAdHlwZWRlZiB7aW1wb3J0KFwiLi4vYWNlLWludGVybmFsXCIpLkFjZS5Qb2ludH0gUG9pbnRcbiAqIEB0eXBlZGVmIHtpbXBvcnQoXCIuLi9hY2UtaW50ZXJuYWxcIikuQWNlLlNlYXJjaE9wdGlvbnN9IFNlYXJjaE9wdGlvbnNcbiAqL1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4vbGliL29vcFwiKTtcbnZhciBTZWFyY2ggPSByZXF1aXJlKFwiLi9zZWFyY2hcIikuU2VhcmNoO1xudmFyIEVkaXRTZXNzaW9uID0gcmVxdWlyZShcIi4vZWRpdF9zZXNzaW9uXCIpLkVkaXRTZXNzaW9uO1xudmFyIFNlYXJjaEhpZ2hsaWdodCA9IHJlcXVpcmUoXCIuL3NlYXJjaF9oaWdobGlnaHRcIikuU2VhcmNoSGlnaGxpZ2h0O1xuXG4vKipcbiAqIEZpbmRzIGFsbCBsaW5lcyBtYXRjaGluZyBhIHNlYXJjaCB0ZXJtIGluIHRoZSBjdXJyZW50IFtbRG9jdW1lbnRcbiAqIGBEb2N1bWVudGBdXSBhbmQgZGlzcGxheXMgdGhlbSBpbnN0ZWFkIG9mIHRoZSBvcmlnaW5hbCBgRG9jdW1lbnRgLiBLZWVwc1xuICogdHJhY2sgb2YgdGhlIG1hcHBpbmcgYmV0d2VlbiB0aGUgb2NjdXIgZG9jIGFuZCB0aGUgb3JpZ2luYWwgZG9jLlxuICoqL1xuY2xhc3MgT2NjdXIgZXh0ZW5kcyBTZWFyY2gge1xuXG4gICAgLyoqXG4gICAgICogRW5hYmxlcyBvY2N1ciBtb2RlLiBleHBlY3RzIHRoYXQgYG9wdGlvbnMubmVlZGxlYCBpcyBhIHNlYXJjaCB0ZXJtLlxuICAgICAqIFRoaXMgc2VhcmNoIHRlcm0gaXMgdXNlZCB0byBmaWx0ZXIgb3V0IGFsbCB0aGUgbGluZXMgdGhhdCBpbmNsdWRlIGl0XG4gICAgICogYW5kIHRoZXNlIGFyZSB0aGVuIHVzZWQgYXMgdGhlIGNvbnRlbnQgb2YgYSBuZXcgW1tEb2N1bWVudFxuICAgICAqIGBEb2N1bWVudGBdXS4gVGhlIGN1cnJlbnQgY3Vyc29yIHBvc2l0aW9uIG9mIGVkaXRvciB3aWxsIGJlIHRyYW5zbGF0ZWRcbiAgICAgKiBzbyB0aGF0IHRoZSBjdXJzb3IgaXMgb24gdGhlIG1hdGNoaW5nIHJvdy9jb2x1bW4gYXMgaXQgd2FzIGJlZm9yZS5cbiAgICAgKiBAcGFyYW0ge0VkaXRvcn0gZWRpdG9yXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgb3B0aW9ucy5uZWVkbGUgc2hvdWxkIGJlIGEgU3RyaW5nXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gV2hldGhlciBvY2N1ciBhY3RpdmF0aW9uIHdhcyBzdWNjZXNzZnVsXG4gICAgICpcbiAgICAgKiovXG4gICAgZW50ZXIoZWRpdG9yLCBvcHRpb25zKSB7XG4gICAgICAgIGlmICghb3B0aW9ucy5uZWVkbGUpIHJldHVybiBmYWxzZTtcbiAgICAgICAgdmFyIHBvcyA9IGVkaXRvci5nZXRDdXJzb3JQb3NpdGlvbigpO1xuICAgICAgICB0aGlzLmRpc3BsYXlPY2N1ckNvbnRlbnQoZWRpdG9yLCBvcHRpb25zKTtcbiAgICAgICAgdmFyIHRyYW5zbGF0ZWRQb3MgPSB0aGlzLm9yaWdpbmFsVG9PY2N1clBvc2l0aW9uKGVkaXRvci5zZXNzaW9uLCBwb3MpO1xuICAgICAgICBlZGl0b3IubW92ZUN1cnNvclRvUG9zaXRpb24odHJhbnNsYXRlZFBvcyk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERpc2FibGVzIG9jY3VyIG1vZGUuIFJlc2V0cyB0aGUgW1tTZXNzaW9ucyBgRWRpdFNlc3Npb25gXV0gW1tEb2N1bWVudFxuICAgICAqIGBEb2N1bWVudGBdXSBiYWNrIHRvIHRoZSBvcmlnaW5hbCBkb2MuIElmIG9wdGlvbnMudHJhbnNsYXRlUG9zaXRpb24gaXNcbiAgICAgKiB0cnV0aHkgYWxzbyBtYXBzIHRoZSBbW0VkaXRvcnMgYEVkaXRvcmBdXSBjdXJzb3IgcG9zaXRpb24gYWNjb3JkaW5nbHkuXG4gICAgICogQHBhcmFtIHtFZGl0b3J9IGVkaXRvclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIG9wdGlvbnMudHJhbnNsYXRlUG9zaXRpb25cbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSBXaGV0aGVyIG9jY3VyIGRlYWN0aXZhdGlvbiB3YXMgc3VjY2Vzc2Z1bFxuICAgICAqXG4gICAgICoqL1xuICAgIGV4aXQoZWRpdG9yLCBvcHRpb25zKSB7XG4gICAgICAgIHZhciBwb3MgPSBvcHRpb25zLnRyYW5zbGF0ZVBvc2l0aW9uICYmIGVkaXRvci5nZXRDdXJzb3JQb3NpdGlvbigpO1xuICAgICAgICB2YXIgdHJhbnNsYXRlZFBvcyA9IHBvcyAmJiB0aGlzLm9jY3VyVG9PcmlnaW5hbFBvc2l0aW9uKGVkaXRvci5zZXNzaW9uLCBwb3MpO1xuICAgICAgICB0aGlzLmRpc3BsYXlPcmlnaW5hbENvbnRlbnQoZWRpdG9yKTtcbiAgICAgICAgaWYgKHRyYW5zbGF0ZWRQb3MpXG4gICAgICAgICAgICBlZGl0b3IubW92ZUN1cnNvclRvUG9zaXRpb24odHJhbnNsYXRlZFBvcyk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7RWRpdFNlc3Npb259IHNlc3NcbiAgICAgKiBAcGFyYW0ge1JlZ0V4cH0gcmVnZXhwXG4gICAgICovXG4gICAgaGlnaGxpZ2h0KHNlc3MsIHJlZ2V4cCkge1xuICAgICAgICB2YXIgaGwgPSBzZXNzLiRvY2N1ckhpZ2hsaWdodCA9IHNlc3MuJG9jY3VySGlnaGxpZ2h0IHx8IHNlc3MuYWRkRHluYW1pY01hcmtlcihcbiAgICAgICAgICAgICAgICBuZXcgU2VhcmNoSGlnaGxpZ2h0KG51bGwsIFwiYWNlX29jY3VyLWhpZ2hsaWdodFwiLCBcInRleHRcIikpO1xuICAgICAgICBobC5zZXRSZWdleHAocmVnZXhwKTtcbiAgICAgICAgc2Vzcy5fZW1pdChcImNoYW5nZUJhY2tNYXJrZXJcIik7IC8vIGZvcmNlIGhpZ2hsaWdodCBsYXllciByZWRyYXdcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0VkaXRvcn0gZWRpdG9yXG4gICAgICogQHBhcmFtIHtQYXJ0aWFsPFNlYXJjaE9wdGlvbnM+fSBvcHRpb25zXG4gICAgICovXG4gICAgZGlzcGxheU9jY3VyQ29udGVudChlZGl0b3IsIG9wdGlvbnMpIHtcbiAgICAgICAgLy8gdGhpcy5zZXRTZXNzaW9uKHNlc3Npb24gfHwgbmV3IEVkaXRTZXNzaW9uKFwiXCIpKVxuICAgICAgICB0aGlzLiRvcmlnaW5hbFNlc3Npb24gPSBlZGl0b3Iuc2Vzc2lvbjtcbiAgICAgICAgdmFyIGZvdW5kID0gdGhpcy5tYXRjaGluZ0xpbmVzKGVkaXRvci5zZXNzaW9uLCBvcHRpb25zKTtcbiAgICAgICAgdmFyIGxpbmVzID0gZm91bmQubWFwKGZ1bmN0aW9uKGZvdW5kTGluZSkgeyByZXR1cm4gZm91bmRMaW5lLmNvbnRlbnQ7IH0pO1xuICAgICAgICAvKipAdHlwZSB7RWRpdFNlc3Npb259Ki9cbiAgICAgICAgdmFyIG9jY3VyU2Vzc2lvbiA9IG5ldyBFZGl0U2Vzc2lvbihsaW5lcy5qb2luKCdcXG4nKSk7XG4gICAgICAgIG9jY3VyU2Vzc2lvbi4kb2NjdXIgPSB0aGlzO1xuICAgICAgICBvY2N1clNlc3Npb24uJG9jY3VyTWF0Y2hpbmdMaW5lcyA9IGZvdW5kO1xuICAgICAgICBlZGl0b3Iuc2V0U2Vzc2lvbihvY2N1clNlc3Npb24pO1xuICAgICAgICB0aGlzLiR1c2VFbWFjc1N0eWxlTGluZVN0YXJ0ID0gdGhpcy4kb3JpZ2luYWxTZXNzaW9uLiR1c2VFbWFjc1N0eWxlTGluZVN0YXJ0O1xuICAgICAgICBvY2N1clNlc3Npb24uJHVzZUVtYWNzU3R5bGVMaW5lU3RhcnQgPSB0aGlzLiR1c2VFbWFjc1N0eWxlTGluZVN0YXJ0O1xuICAgICAgICB0aGlzLmhpZ2hsaWdodChvY2N1clNlc3Npb24sIG9wdGlvbnMucmUpO1xuICAgICAgICBvY2N1clNlc3Npb24uX2VtaXQoJ2NoYW5nZUJhY2tNYXJrZXInKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0VkaXRvcn0gZWRpdG9yXG4gICAgICovXG4gICAgZGlzcGxheU9yaWdpbmFsQ29udGVudChlZGl0b3IpIHtcbiAgICAgICAgZWRpdG9yLnNldFNlc3Npb24odGhpcy4kb3JpZ2luYWxTZXNzaW9uKTtcbiAgICAgICAgdGhpcy4kb3JpZ2luYWxTZXNzaW9uLiR1c2VFbWFjc1N0eWxlTGluZVN0YXJ0ID0gdGhpcy4kdXNlRW1hY3NTdHlsZUxpbmVTdGFydDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAqIFRyYW5zbGF0ZXMgdGhlIHBvc2l0aW9uIGZyb20gdGhlIG9yaWdpbmFsIGRvY3VtZW50IHRvIHRoZSBvY2N1ciBsaW5lcyBpblxuICAgICogdGhlIGRvY3VtZW50IG9yIHRoZSBiZWdpbm5pbmcgaWYgdGhlIGRvYyB7cm93OiAwLCBjb2x1bW46IDB9IGlmIG5vdFxuICAgICogZm91bmQuXG4gICAgKiBAcGFyYW0ge0VkaXRTZXNzaW9ufSBzZXNzaW9uIFRoZSBvY2N1ciBzZXNzaW9uXG4gICAgKiBAcGFyYW0ge1BvaW50fSBwb3MgVGhlIHBvc2l0aW9uIGluIHRoZSBvcmlnaW5hbCBkb2N1bWVudFxuICAgICogQHJldHVybiB7UG9pbnR9IHBvc2l0aW9uIGluIG9jY3VyIGRvY1xuICAgICoqL1xuICAgIG9yaWdpbmFsVG9PY2N1clBvc2l0aW9uKHNlc3Npb24sIHBvcykge1xuICAgICAgICB2YXIgbGluZXMgPSBzZXNzaW9uLiRvY2N1ck1hdGNoaW5nTGluZXM7XG4gICAgICAgIHZhciBudWxsUG9zID0ge3JvdzogMCwgY29sdW1uOiAwfTtcbiAgICAgICAgaWYgKCFsaW5lcykgcmV0dXJuIG51bGxQb3M7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChsaW5lc1tpXS5yb3cgPT09IHBvcy5yb3cpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtyb3c6IGksIGNvbHVtbjogcG9zLmNvbHVtbn07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGxQb3M7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiBUcmFuc2xhdGVzIHRoZSBwb3NpdGlvbiBmcm9tIHRoZSBvY2N1ciBkb2N1bWVudCB0byB0aGUgb3JpZ2luYWwgZG9jdW1lbnRcbiAgICAqIG9yIGBwb3NgIGlmIG5vdCBmb3VuZC5cbiAgICAqIEBwYXJhbSB7RWRpdFNlc3Npb259IHNlc3Npb24gVGhlIG9jY3VyIHNlc3Npb25cbiAgICAqIEBwYXJhbSB7UG9pbnR9IHBvcyBUaGUgcG9zaXRpb24gaW4gdGhlIG9jY3VyIHNlc3Npb24gZG9jdW1lbnRcbiAgICAqIEByZXR1cm4ge1BvaW50fSBwb3NpdGlvblxuICAgICoqL1xuICAgIG9jY3VyVG9PcmlnaW5hbFBvc2l0aW9uKHNlc3Npb24sIHBvcykge1xuICAgICAgICB2YXIgbGluZXMgPSBzZXNzaW9uLiRvY2N1ck1hdGNoaW5nTGluZXM7XG4gICAgICAgIGlmICghbGluZXMgfHwgIWxpbmVzW3Bvcy5yb3ddKVxuICAgICAgICAgICAgcmV0dXJuIHBvcztcbiAgICAgICAgcmV0dXJuIHtyb3c6IGxpbmVzW3Bvcy5yb3ddLnJvdywgY29sdW1uOiBwb3MuY29sdW1ufTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0VkaXRTZXNzaW9ufSBzZXNzaW9uXG4gICAgICogQHBhcmFtIHtQYXJ0aWFsPFNlYXJjaE9wdGlvbnM+fSBvcHRpb25zXG4gICAgICovXG4gICAgbWF0Y2hpbmdMaW5lcyhzZXNzaW9uLCBvcHRpb25zKSB7XG4gICAgICAgIG9wdGlvbnMgPSBvb3AubWl4aW4oe30sIG9wdGlvbnMpO1xuICAgICAgICBpZiAoIXNlc3Npb24gfHwgIW9wdGlvbnMubmVlZGxlKSByZXR1cm4gW107XG4gICAgICAgIHZhciBzZWFyY2ggPSBuZXcgU2VhcmNoKCk7XG4gICAgICAgIHNlYXJjaC5zZXQob3B0aW9ucyk7XG4gICAgICAgIHJldHVybiBzZWFyY2guZmluZEFsbChzZXNzaW9uKS5yZWR1Y2UoZnVuY3Rpb24obGluZXMsIHJhbmdlKSB7XG4gICAgICAgICAgICB2YXIgcm93ID0gcmFuZ2Uuc3RhcnQucm93O1xuICAgICAgICAgICAgdmFyIGxhc3QgPSBsaW5lc1tsaW5lcy5sZW5ndGgtMV07XG4gICAgICAgICAgICByZXR1cm4gbGFzdCAmJiBsYXN0LnJvdyA9PT0gcm93ID9cbiAgICAgICAgICAgICAgICBsaW5lcyA6XG4gICAgICAgICAgICAgICAgbGluZXMuY29uY2F0KHtyb3c6IHJvdywgY29udGVudDogc2Vzc2lvbi5nZXRMaW5lKHJvdyl9KTtcbiAgICAgICAgfSwgW10pO1xuICAgIH1cblxufVxuXG52YXIgZG9tID0gcmVxdWlyZSgnLi9saWIvZG9tJyk7XG5kb20uaW1wb3J0Q3NzU3RyaW5nKFwiLmFjZV9vY2N1ci1oaWdobGlnaHQge1xcblxcXG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xcblxcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSg4NywgMjU1LCA4LCAwLjI1KTtcXG5cXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG5cXFxuICAgIHotaW5kZXg6IDQ7XFxuXFxcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcblxcXG4gICAgYm94LXNoYWRvdzogMCAwIDRweCByZ2IoOTEsIDI1NSwgNTApO1xcblxcXG59XFxuXFxcbi5hY2VfZGFyayAuYWNlX29jY3VyLWhpZ2hsaWdodCB7XFxuXFxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoODAsIDE0MCwgODUpO1xcblxcXG4gICAgYm94LXNoYWRvdzogMCAwIDRweCByZ2IoNjAsIDEyMCwgNzApO1xcblxcXG59XFxuXCIsIFwiaW5jcmVtZW50YWwtb2NjdXItaGlnaGxpZ2h0aW5nXCIsIGZhbHNlKTtcblxuZXhwb3J0cy5PY2N1ciA9IE9jY3VyO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9