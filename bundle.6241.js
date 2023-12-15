(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[6241],{

/***/ 56809:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var config = __webpack_require__(13188);
var oop = __webpack_require__(89359);
var HashHandler = (__webpack_require__(7116).HashHandler);
var occurStartCommand = (__webpack_require__(80043)/* .occurStartCommand */ .H);

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

/***/ 80043:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var config = __webpack_require__(13188),
    Occur = (__webpack_require__(61598)/* .Occur */ .t);

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

var HashHandler = (__webpack_require__(7116).HashHandler);
var oop = __webpack_require__(89359);


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

exports.H = occurStartCommand;


/***/ }),

/***/ 69820:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var Range = (__webpack_require__(59082)/* .Range */ .e);
var Search = (__webpack_require__(46745)/* .Search */ .o);
var SearchHighlight = (__webpack_require__(57988)/* .SearchHighlight */ .t);
var iSearchCommandModule = __webpack_require__(56809);
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

    onMouseDown(evt) {
        // when mouse interaction happens then we quit incremental search
        this.deactivate();
        return true;
    }

    /**
     * @param {string} text
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

var dom = __webpack_require__(6359);
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
var commands = __webpack_require__(73190);
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
var Editor = (__webpack_require__(82880)/* .Editor */ .M);
(__webpack_require__(13188).defineOptions)(Editor.prototype, "editor", {
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

/***/ 26241:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var dom = __webpack_require__(6359);
__webpack_require__(69820);
var iSearchCommandModule = __webpack_require__(56809);


var HashHandler = (__webpack_require__(7116).HashHandler);
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
            this.session.$emacsMarkRing.push(prevMark);
        if (!p || activate) this.setEmacsMark(p);
        else this.session.$emacsMarkRing.push(p);
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

var keys = (__webpack_require__(11797).KEY_MODS);
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

/***/ 61598:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

/**
 * @typedef {import("./editor").Editor} Editor
 * @typedef {import("../ace-internal").Ace.Point} Point
 * @typedef {import("../ace-internal").Ace.SearchOptions} SearchOptions
 */

var oop = __webpack_require__(89359);
var Search = (__webpack_require__(46745)/* .Search */ .o);
var EditSession = (__webpack_require__(66480)/* .EditSession */ .m);
var SearchHighlight = (__webpack_require__(57988)/* .SearchHighlight */ .t);

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

var dom = __webpack_require__(6359);
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

exports.t = Occur;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxnREFBZ0QsbUJBQW1CO0FBQ25FO0FBQ0EsY0FBYyxhQUFhO0FBQzNCLGNBQWMsT0FBTztBQUNyQixlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0Esd0JBQXdCLGtCQUFrQjtBQUMxQztBQUNBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYyxhQUFhO0FBQzNCLGNBQWMsT0FBTztBQUNyQixlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjs7QUFFQTtBQUNBLGVBQWUsYUFBYTtBQUM1QixlQUFlLHdCQUF3QjtBQUN2QztBQUNBO0FBQ0EsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsd0NBQXdDO0FBQ3RFLFNBQVM7QUFDVDs7QUFFQTs7QUFFQSxVQUFVLG1CQUFPLENBQUMsSUFBVztBQUM3QiwyQ0FBMkM7QUFDM0MsdUJBQXVCO0FBQ3ZCLDZDQUE2QztBQUM3Qyx1QkFBdUI7QUFDdkIsZUFBZTtBQUNmLDJCQUEyQjtBQUMzQix5Q0FBeUM7QUFDekMsQ0FBQztBQUNELGdDQUFnQztBQUNoQyx1Q0FBdUM7QUFDdkMseUNBQXlDO0FBQ3pDLENBQUM7O0FBRUQsU0FBYSIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL2NvbW1hbmRzL2luY3JlbWVudGFsX3NlYXJjaF9jb21tYW5kcy5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9jb21tYW5kcy9vY2N1cl9jb21tYW5kcy5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9pbmNyZW1lbnRhbF9zZWFyY2guanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMva2V5Ym9hcmQvZW1hY3MuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvb2NjdXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIGNvbmZpZyA9IHJlcXVpcmUoXCIuLi9jb25maWdcIik7XG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgSGFzaEhhbmRsZXIgPSByZXF1aXJlKFwiLi4va2V5Ym9hcmQvaGFzaF9oYW5kbGVyXCIpLkhhc2hIYW5kbGVyO1xudmFyIG9jY3VyU3RhcnRDb21tYW5kID0gcmVxdWlyZShcIi4vb2NjdXJfY29tbWFuZHNcIikub2NjdXJTdGFydENvbW1hbmQ7XG5cbi8vIFRoZXNlIGNvbW1hbmRzIGNhbiBiZSBpbnN0YWxsZWQgaW4gYSBub3JtYWwga2V5IGhhbmRsZXIgdG8gc3RhcnQgaVNlYXJjaDpcbmV4cG9ydHMuaVNlYXJjaFN0YXJ0Q29tbWFuZHMgPSBbe1xuICAgIG5hbWU6IFwiaVNlYXJjaFwiLFxuICAgIGJpbmRLZXk6IHt3aW46IFwiQ3RybC1GXCIsIG1hYzogXCJDb21tYW5kLUZcIn0sXG4gICAgZXhlYzogZnVuY3Rpb24oZWRpdG9yLCBvcHRpb25zKSB7XG4gICAgICAgIGNvbmZpZy5sb2FkTW9kdWxlKFtcImNvcmVcIiwgXCJhY2UvaW5jcmVtZW50YWxfc2VhcmNoXCJdLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICB2YXIgaVNlYXJjaCA9IGUuaVNlYXJjaCA9IGUuaVNlYXJjaCB8fCBuZXcgZS5JbmNyZW1lbnRhbFNlYXJjaCgpO1xuICAgICAgICAgICAgaVNlYXJjaC5hY3RpdmF0ZShlZGl0b3IsIG9wdGlvbnMuYmFja3dhcmRzKTtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmp1bXBUb0ZpcnN0TWF0Y2gpIGlTZWFyY2gubmV4dChvcHRpb25zKTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICByZWFkT25seTogdHJ1ZVxufSwge1xuICAgIG5hbWU6IFwiaVNlYXJjaEJhY2t3YXJkc1wiLFxuICAgIGV4ZWM6IGZ1bmN0aW9uKGVkaXRvciwganVtcFRvTmV4dCkgeyBlZGl0b3IuZXhlY0NvbW1hbmQoJ2lTZWFyY2gnLCB7YmFja3dhcmRzOiB0cnVlfSk7IH0sXG4gICAgcmVhZE9ubHk6IHRydWVcbn0sIHtcbiAgICBuYW1lOiBcImlTZWFyY2hBbmRHb1wiLFxuICAgIGJpbmRLZXk6IHt3aW46IFwiQ3RybC1LXCIsIG1hYzogXCJDb21tYW5kLUdcIn0sXG4gICAgZXhlYzogZnVuY3Rpb24oZWRpdG9yLCBqdW1wVG9OZXh0KSB7IGVkaXRvci5leGVjQ29tbWFuZCgnaVNlYXJjaCcsIHtqdW1wVG9GaXJzdE1hdGNoOiB0cnVlLCB1c2VDdXJyZW50T3JQcmV2U2VhcmNoOiB0cnVlfSk7IH0sXG4gICAgcmVhZE9ubHk6IHRydWVcbn0sIHtcbiAgICBuYW1lOiBcImlTZWFyY2hCYWNrd2FyZHNBbmRHb1wiLFxuICAgIGJpbmRLZXk6IHt3aW46IFwiQ3RybC1TaGlmdC1LXCIsIG1hYzogXCJDb21tYW5kLVNoaWZ0LUdcIn0sXG4gICAgZXhlYzogZnVuY3Rpb24oZWRpdG9yKSB7IGVkaXRvci5leGVjQ29tbWFuZCgnaVNlYXJjaCcsIHtqdW1wVG9GaXJzdE1hdGNoOiB0cnVlLCBiYWNrd2FyZHM6IHRydWUsIHVzZUN1cnJlbnRPclByZXZTZWFyY2g6IHRydWV9KTsgfSxcbiAgICByZWFkT25seTogdHJ1ZVxufV07XG5cbi8vIFRoZXNlIGNvbW1hbmRzIGFyZSBvbmx5IGF2YWlsYWJsZSB3aGVuIGluY3JlbWVudGFsIHNlYXJjaCBtb2RlIGlzIGFjdGl2ZTpcbmV4cG9ydHMuaVNlYXJjaENvbW1hbmRzID0gW3tcbiAgICBuYW1lOiBcInJlc3RhcnRTZWFyY2hcIixcbiAgICBiaW5kS2V5OiB7d2luOiBcIkN0cmwtRlwiLCBtYWM6IFwiQ29tbWFuZC1GXCJ9LFxuICAgIGV4ZWM6IGZ1bmN0aW9uKGlTZWFyY2gpIHtcbiAgICAgICAgaVNlYXJjaC5jYW5jZWxTZWFyY2godHJ1ZSk7XG4gICAgfVxufSwge1xuICAgIG5hbWU6IFwic2VhcmNoRm9yd2FyZFwiLFxuICAgIGJpbmRLZXk6IHt3aW46IFwiQ3RybC1TfEN0cmwtS1wiLCBtYWM6IFwiQ3RybC1TfENvbW1hbmQtR1wifSxcbiAgICBleGVjOiBmdW5jdGlvbihpU2VhcmNoLCBvcHRpb25zKSB7XG4gICAgICAgIG9wdGlvbnMudXNlQ3VycmVudE9yUHJldlNlYXJjaCA9IHRydWU7XG4gICAgICAgIGlTZWFyY2gubmV4dChvcHRpb25zKTtcbiAgICB9XG59LCB7XG4gICAgbmFtZTogXCJzZWFyY2hCYWNrd2FyZFwiLFxuICAgIGJpbmRLZXk6IHt3aW46IFwiQ3RybC1SfEN0cmwtU2hpZnQtS1wiLCBtYWM6IFwiQ3RybC1SfENvbW1hbmQtU2hpZnQtR1wifSxcbiAgICBleGVjOiBmdW5jdGlvbihpU2VhcmNoLCBvcHRpb25zKSB7XG4gICAgICAgIG9wdGlvbnMudXNlQ3VycmVudE9yUHJldlNlYXJjaCA9IHRydWU7XG4gICAgICAgIG9wdGlvbnMuYmFja3dhcmRzID0gdHJ1ZTtcbiAgICAgICAgaVNlYXJjaC5uZXh0KG9wdGlvbnMpO1xuICAgIH1cbn0sIHtcbiAgICBuYW1lOiBcImV4dGVuZFNlYXJjaFRlcm1cIixcbiAgICBleGVjOiBmdW5jdGlvbihpU2VhcmNoLCBzdHJpbmcpIHtcbiAgICAgICAgaVNlYXJjaC5hZGRTdHJpbmcoc3RyaW5nKTtcbiAgICB9XG59LCB7XG4gICAgbmFtZTogXCJleHRlbmRTZWFyY2hUZXJtU3BhY2VcIixcbiAgICBiaW5kS2V5OiBcInNwYWNlXCIsXG4gICAgZXhlYzogZnVuY3Rpb24oaVNlYXJjaCkgeyBpU2VhcmNoLmFkZFN0cmluZygnICcpOyB9XG59LCB7XG4gICAgbmFtZTogXCJzaHJpbmtTZWFyY2hUZXJtXCIsXG4gICAgYmluZEtleTogXCJiYWNrc3BhY2VcIixcbiAgICBleGVjOiBmdW5jdGlvbihpU2VhcmNoKSB7XG4gICAgICAgIGlTZWFyY2gucmVtb3ZlQ2hhcigpO1xuICAgIH1cbn0sIHtcbiAgICBuYW1lOiAnY29uZmlybVNlYXJjaCcsXG4gICAgYmluZEtleTogJ3JldHVybicsXG4gICAgZXhlYzogZnVuY3Rpb24oaVNlYXJjaCkgeyBpU2VhcmNoLmRlYWN0aXZhdGUoKTsgfVxufSwge1xuICAgIG5hbWU6ICdjYW5jZWxTZWFyY2gnLFxuICAgIGJpbmRLZXk6ICdlc2N8Q3RybC1HJyxcbiAgICBleGVjOiBmdW5jdGlvbihpU2VhcmNoKSB7IGlTZWFyY2guZGVhY3RpdmF0ZSh0cnVlKTsgfVxufSwge1xuICAgIG5hbWU6ICdvY2N1cmlzZWFyY2gnLFxuICAgIGJpbmRLZXk6ICdDdHJsLU8nLFxuICAgIGV4ZWM6IGZ1bmN0aW9uKGlTZWFyY2gpIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSBvb3AubWl4aW4oe30sIGlTZWFyY2guJG9wdGlvbnMpO1xuICAgICAgICBpU2VhcmNoLmRlYWN0aXZhdGUoKTtcbiAgICAgICAgb2NjdXJTdGFydENvbW1hbmQuZXhlYyhpU2VhcmNoLiRlZGl0b3IsIG9wdGlvbnMpO1xuICAgIH1cbn0sIHtcbiAgICBuYW1lOiBcInlhbmtOZXh0V29yZFwiLFxuICAgIGJpbmRLZXk6IFwiQ3RybC13XCIsXG4gICAgZXhlYzogZnVuY3Rpb24oaVNlYXJjaCkge1xuICAgICAgICB2YXIgZWQgPSBpU2VhcmNoLiRlZGl0b3IsXG4gICAgICAgICAgICByYW5nZSA9IGVkLnNlbGVjdGlvbi5nZXRSYW5nZU9mTW92ZW1lbnRzKGZ1bmN0aW9uKHNlbCkgeyBzZWwubW92ZUN1cnNvcldvcmRSaWdodCgpOyB9KSxcbiAgICAgICAgICAgIHN0cmluZyA9IGVkLnNlc3Npb24uZ2V0VGV4dFJhbmdlKHJhbmdlKTtcbiAgICAgICAgaVNlYXJjaC5hZGRTdHJpbmcoc3RyaW5nKTtcbiAgICB9XG59LCB7XG4gICAgbmFtZTogXCJ5YW5rTmV4dENoYXJcIixcbiAgICBiaW5kS2V5OiBcIkN0cmwtQWx0LXlcIixcbiAgICBleGVjOiBmdW5jdGlvbihpU2VhcmNoKSB7XG4gICAgICAgIHZhciBlZCA9IGlTZWFyY2guJGVkaXRvcixcbiAgICAgICAgICAgIHJhbmdlID0gZWQuc2VsZWN0aW9uLmdldFJhbmdlT2ZNb3ZlbWVudHMoZnVuY3Rpb24oc2VsKSB7IHNlbC5tb3ZlQ3Vyc29yUmlnaHQoKTsgfSksXG4gICAgICAgICAgICBzdHJpbmcgPSBlZC5zZXNzaW9uLmdldFRleHRSYW5nZShyYW5nZSk7XG4gICAgICAgIGlTZWFyY2guYWRkU3RyaW5nKHN0cmluZyk7XG4gICAgfVxufSwge1xuICAgIG5hbWU6ICdyZWNlbnRlclRvcEJvdHRvbScsXG4gICAgYmluZEtleTogJ0N0cmwtbCcsXG4gICAgZXhlYzogZnVuY3Rpb24oaVNlYXJjaCkgeyBpU2VhcmNoLiRlZGl0b3IuZXhlY0NvbW1hbmQoJ3JlY2VudGVyVG9wQm90dG9tJyk7IH1cbn0sIHtcbiAgICBuYW1lOiAnc2VsZWN0QWxsTWF0Y2hlcycsXG4gICAgYmluZEtleTogJ0N0cmwtc3BhY2UnLFxuICAgIGV4ZWM6IGZ1bmN0aW9uKGlTZWFyY2gpIHtcbiAgICAgICAgdmFyIGVkID0gaVNlYXJjaC4kZWRpdG9yLFxuICAgICAgICAgICAgaGwgPSBlZC5zZXNzaW9uLiRpc2VhcmNoSGlnaGxpZ2h0LFxuICAgICAgICAgICAgcmFuZ2VzID0gaGwgJiYgaGwuY2FjaGUgPyBobC5jYWNoZVxuICAgICAgICAgICAgICAgIC5yZWR1Y2UoZnVuY3Rpb24ocmFuZ2VzLCBlYSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmFuZ2VzLmNvbmNhdChlYSA/IGVhIDogW10pOyB9LCBbXSkgOiBbXTtcbiAgICAgICAgaVNlYXJjaC5kZWFjdGl2YXRlKGZhbHNlKTtcbiAgICAgICAgcmFuZ2VzLmZvckVhY2goZWQuc2VsZWN0aW9uLmFkZFJhbmdlLmJpbmQoZWQuc2VsZWN0aW9uKSk7XG4gICAgfVxufSwge1xuICAgIG5hbWU6ICdzZWFyY2hBc1JlZ0V4cCcsXG4gICAgYmluZEtleTogJ0FsdC1yJyxcbiAgICBleGVjOiBmdW5jdGlvbihpU2VhcmNoKSB7XG4gICAgICAgIGlTZWFyY2guY29udmVydE5lZWRsZVRvUmVnRXhwKCk7XG4gICAgfVxufV0ubWFwKGZ1bmN0aW9uKGNtZCkge1xuICAgIGNtZC5yZWFkT25seSA9IHRydWU7XG4gICAgY21kLmlzSW5jcmVtZW50YWxTZWFyY2hDb21tYW5kID0gdHJ1ZTtcbiAgICBjbWQuc2Nyb2xsSW50b1ZpZXcgPSBcImFuaW1hdGUtY3Vyc29yXCI7XG4gICAgcmV0dXJuIGNtZDtcbn0pO1xuXG5mdW5jdGlvbiBJbmNyZW1lbnRhbFNlYXJjaEtleWJvYXJkSGFuZGxlcihpU2VhcmNoKSB7XG4gICAgdGhpcy4kaVNlYXJjaCA9IGlTZWFyY2g7XG59XG5cbm9vcC5pbmhlcml0cyhJbmNyZW1lbnRhbFNlYXJjaEtleWJvYXJkSGFuZGxlciwgSGFzaEhhbmRsZXIpO1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIGVkaXRvclxuICAgICAqIEB0aGlzIHtJbmNyZW1lbnRhbFNlYXJjaEtleWJvYXJkSGFuZGxlciAmIHRoaXMgJiB7JGNvbW1hbmRFeGVjSGFuZGxlcn19XG4gICAgICovXG4gICAgdGhpcy5hdHRhY2ggPSBmdW5jdGlvbihlZGl0b3IpIHtcbiAgICAgICAgdmFyIGlTZWFyY2ggPSB0aGlzLiRpU2VhcmNoO1xuICAgICAgICBIYXNoSGFuZGxlci5jYWxsKHRoaXMsIGV4cG9ydHMuaVNlYXJjaENvbW1hbmRzLCBlZGl0b3IuY29tbWFuZHMucGxhdGZvcm0pO1xuICAgICAgICB0aGlzLiRjb21tYW5kRXhlY0hhbmRsZXIgPSBlZGl0b3IuY29tbWFuZHMub24oJ2V4ZWMnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBpZiAoIWUuY29tbWFuZC5pc0luY3JlbWVudGFsU2VhcmNoQ29tbWFuZClcbiAgICAgICAgICAgICAgICByZXR1cm4gaVNlYXJjaC5kZWFjdGl2YXRlKCk7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdmFyIHNjcm9sbFRvcCA9IGVkaXRvci5zZXNzaW9uLmdldFNjcm9sbFRvcCgpO1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGUuY29tbWFuZC5leGVjKGlTZWFyY2gsIGUuYXJncyB8fCB7fSk7XG4gICAgICAgICAgICBlZGl0b3IucmVuZGVyZXIuc2Nyb2xsQ3Vyc29ySW50b1ZpZXcobnVsbCwgMC41KTtcbiAgICAgICAgICAgIGVkaXRvci5yZW5kZXJlci5hbmltYXRlU2Nyb2xsaW5nKHNjcm9sbFRvcCk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQHRoaXMge0luY3JlbWVudGFsU2VhcmNoS2V5Ym9hcmRIYW5kbGVyICYgdGhpcyAmIHskY29tbWFuZEV4ZWNIYW5kbGVyfX1cbiAgICAgKiBAcGFyYW0gZWRpdG9yXG4gICAgICovXG4gICAgdGhpcy5kZXRhY2ggPSBmdW5jdGlvbihlZGl0b3IpIHtcbiAgICAgICAgaWYgKCF0aGlzLiRjb21tYW5kRXhlY0hhbmRsZXIpIHJldHVybjtcbiAgICAgICAgZWRpdG9yLmNvbW1hbmRzLm9mZignZXhlYycsIHRoaXMuJGNvbW1hbmRFeGVjSGFuZGxlcik7XG4gICAgICAgIGRlbGV0ZSB0aGlzLiRjb21tYW5kRXhlY0hhbmRsZXI7XG4gICAgfTtcblxuICAgIHZhciBoYW5kbGVLZXlib2FyZCRzdXBlciA9IHRoaXMuaGFuZGxlS2V5Ym9hcmQ7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIGRhdGFcbiAgICAgKiBAcGFyYW0gaGFzaElkXG4gICAgICogQHBhcmFtIGtleVxuICAgICAqIEBwYXJhbSBrZXlDb2RlXG4gICAgICogQHRoaXMge0luY3JlbWVudGFsU2VhcmNoS2V5Ym9hcmRIYW5kbGVyICYgaW1wb3J0KFwiLi4va2V5Ym9hcmQvaGFzaF9oYW5kbGVyXCIpLkhhc2hIYW5kbGVyfVxuICAgICAqL1xuICAgIHRoaXMuaGFuZGxlS2V5Ym9hcmQgPSBmdW5jdGlvbihkYXRhLCBoYXNoSWQsIGtleSwga2V5Q29kZSkge1xuICAgICAgICBpZiAoKChoYXNoSWQgPT09IDEvKmN0cmwqLyB8fCBoYXNoSWQgPT09IDgvKmNvbW1hbmQqLykgJiYga2V5ID09PSAndicpXG4gICAgICAgICB8fCAoaGFzaElkID09PSAxLypjdHJsKi8gJiYga2V5ID09PSAneScpKSByZXR1cm4gbnVsbDtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICB2YXIgY21kID0gaGFuZGxlS2V5Ym9hcmQkc3VwZXIuY2FsbCh0aGlzLCBkYXRhLCBoYXNoSWQsIGtleSwga2V5Q29kZSk7XG4gICAgICAgIGlmIChjbWQgJiYgY21kLmNvbW1hbmQpIHsgcmV0dXJuIGNtZDsgfVxuICAgICAgICBpZiAoaGFzaElkID09IC0xKSB7XG4gICAgICAgICAgICB2YXIgZXh0ZW5kQ21kID0gdGhpcy5jb21tYW5kcy5leHRlbmRTZWFyY2hUZXJtO1xuICAgICAgICAgICAgaWYgKGV4dGVuZENtZCkgeyByZXR1cm4ge2NvbW1hbmQ6IGV4dGVuZENtZCwgYXJnczoga2V5fTsgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG59KS5jYWxsKEluY3JlbWVudGFsU2VhcmNoS2V5Ym9hcmRIYW5kbGVyLnByb3RvdHlwZSk7XG5cblxuZXhwb3J0cy5JbmNyZW1lbnRhbFNlYXJjaEtleWJvYXJkSGFuZGxlciA9IEluY3JlbWVudGFsU2VhcmNoS2V5Ym9hcmRIYW5kbGVyO1xuIiwidmFyIGNvbmZpZyA9IHJlcXVpcmUoXCIuLi9jb25maWdcIiksXG4gICAgT2NjdXIgPSByZXF1aXJlKFwiLi4vb2NjdXJcIikuT2NjdXI7XG5cbi8vIFRoZXNlIGNvbW1hbmRzIGNhbiBiZSBpbnN0YWxsZWQgaW4gYSBub3JtYWwgY29tbWFuZCBoYW5kbGVyIHRvIHN0YXJ0IG9jY3VyOlxudmFyIG9jY3VyU3RhcnRDb21tYW5kID0ge1xuICAgIG5hbWU6IFwib2NjdXJcIixcbiAgICBleGVjOiBmdW5jdGlvbihlZGl0b3IsIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIGFscmVhZHlJbk9jY3VyID0gISFlZGl0b3Iuc2Vzc2lvbi4kb2NjdXI7XG4gICAgICAgIHZhciBvY2N1clNlc3Npb25BY3RpdmUgPSBuZXcgT2NjdXIoKS5lbnRlcihlZGl0b3IsIG9wdGlvbnMpO1xuICAgICAgICBpZiAob2NjdXJTZXNzaW9uQWN0aXZlICYmICFhbHJlYWR5SW5PY2N1cilcbiAgICAgICAgICAgIE9jY3VyS2V5Ym9hcmRIYW5kbGVyLmluc3RhbGxJbihlZGl0b3IpO1xuICAgIH0sXG4gICAgcmVhZE9ubHk6IHRydWVcbn07XG5cbnZhciBvY2N1ckNvbW1hbmRzID0gW3tcbiAgICBuYW1lOiBcIm9jY3VyZXhpdFwiLFxuICAgIGJpbmRLZXk6ICdlc2N8Q3RybC1HJyxcbiAgICBleGVjOiBmdW5jdGlvbihlZGl0b3IpIHtcbiAgICAgICAgdmFyIG9jY3VyID0gZWRpdG9yLnNlc3Npb24uJG9jY3VyO1xuICAgICAgICBpZiAoIW9jY3VyKSByZXR1cm47XG4gICAgICAgIG9jY3VyLmV4aXQoZWRpdG9yLCB7fSk7XG4gICAgICAgIGlmICghZWRpdG9yLnNlc3Npb24uJG9jY3VyKSBPY2N1cktleWJvYXJkSGFuZGxlci51bmluc3RhbGxGcm9tKGVkaXRvcik7XG4gICAgfSxcbiAgICByZWFkT25seTogdHJ1ZVxufSwge1xuICAgIG5hbWU6IFwib2NjdXJhY2NlcHRcIixcbiAgICBiaW5kS2V5OiAnZW50ZXInLFxuICAgIGV4ZWM6IGZ1bmN0aW9uKGVkaXRvcikge1xuICAgICAgICB2YXIgb2NjdXIgPSBlZGl0b3Iuc2Vzc2lvbi4kb2NjdXI7XG4gICAgICAgIGlmICghb2NjdXIpIHJldHVybjtcbiAgICAgICAgb2NjdXIuZXhpdChlZGl0b3IsIHt0cmFuc2xhdGVQb3NpdGlvbjogdHJ1ZX0pO1xuICAgICAgICBpZiAoIWVkaXRvci5zZXNzaW9uLiRvY2N1cikgT2NjdXJLZXlib2FyZEhhbmRsZXIudW5pbnN0YWxsRnJvbShlZGl0b3IpO1xuICAgIH0sXG4gICAgcmVhZE9ubHk6IHRydWVcbn1dO1xuXG52YXIgSGFzaEhhbmRsZXIgPSByZXF1aXJlKFwiLi4va2V5Ym9hcmQvaGFzaF9oYW5kbGVyXCIpLkhhc2hIYW5kbGVyO1xudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xuXG5cbmZ1bmN0aW9uIE9jY3VyS2V5Ym9hcmRIYW5kbGVyKCkge31cblxub29wLmluaGVyaXRzKE9jY3VyS2V5Ym9hcmRIYW5kbGVyLCBIYXNoSGFuZGxlcik7XG5cbihmdW5jdGlvbigpIHtcblxuICAgIHRoaXMuaXNPY2N1ckhhbmRsZXIgPSB0cnVlO1xuXG4gICAgdGhpcy5hdHRhY2ggPSBmdW5jdGlvbihlZGl0b3IpIHtcbiAgICAgICAgSGFzaEhhbmRsZXIuY2FsbCh0aGlzLCBvY2N1ckNvbW1hbmRzLCBlZGl0b3IuY29tbWFuZHMucGxhdGZvcm0pO1xuICAgICAgICB0aGlzLiRlZGl0b3IgPSBlZGl0b3I7XG4gICAgfTtcblxuICAgIHZhciBoYW5kbGVLZXlib2FyZCRzdXBlciA9IHRoaXMuaGFuZGxlS2V5Ym9hcmQ7XG4gICAgdGhpcy5oYW5kbGVLZXlib2FyZCA9IGZ1bmN0aW9uKGRhdGEsIGhhc2hJZCwga2V5LCBrZXlDb2RlKSB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgdmFyIGNtZCA9IGhhbmRsZUtleWJvYXJkJHN1cGVyLmNhbGwodGhpcywgZGF0YSwgaGFzaElkLCBrZXksIGtleUNvZGUpO1xuICAgICAgICByZXR1cm4gKGNtZCAmJiBjbWQuY29tbWFuZCkgPyBjbWQgOiB1bmRlZmluZWQ7XG4gICAgfTtcblxufSkuY2FsbChPY2N1cktleWJvYXJkSGFuZGxlci5wcm90b3R5cGUpO1xuXG5PY2N1cktleWJvYXJkSGFuZGxlci5pbnN0YWxsSW4gPSBmdW5jdGlvbihlZGl0b3IpIHtcbiAgICB2YXIgaGFuZGxlciA9IG5ldyB0aGlzKCk7XG4gICAgZWRpdG9yLmtleUJpbmRpbmcuYWRkS2V5Ym9hcmRIYW5kbGVyKGhhbmRsZXIpO1xuICAgIGVkaXRvci5jb21tYW5kcy5hZGRDb21tYW5kcyhvY2N1ckNvbW1hbmRzKTtcbn07XG5cbk9jY3VyS2V5Ym9hcmRIYW5kbGVyLnVuaW5zdGFsbEZyb20gPSBmdW5jdGlvbihlZGl0b3IpIHtcbiAgICBlZGl0b3IuY29tbWFuZHMucmVtb3ZlQ29tbWFuZHMob2NjdXJDb21tYW5kcyk7XG4gICAgdmFyIGhhbmRsZXIgPSBlZGl0b3IuZ2V0S2V5Ym9hcmRIYW5kbGVyKCk7XG4gICAgaWYgKGhhbmRsZXIuaXNPY2N1ckhhbmRsZXIpXG4gICAgICAgIGVkaXRvci5rZXlCaW5kaW5nLnJlbW92ZUtleWJvYXJkSGFuZGxlcihoYW5kbGVyKTtcbn07XG5cbmV4cG9ydHMub2NjdXJTdGFydENvbW1hbmQgPSBvY2N1clN0YXJ0Q29tbWFuZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgUmFuZ2UgPSByZXF1aXJlKFwiLi9yYW5nZVwiKS5SYW5nZTtcbnZhciBTZWFyY2ggPSByZXF1aXJlKFwiLi9zZWFyY2hcIikuU2VhcmNoO1xudmFyIFNlYXJjaEhpZ2hsaWdodCA9IHJlcXVpcmUoXCIuL3NlYXJjaF9oaWdobGlnaHRcIikuU2VhcmNoSGlnaGxpZ2h0O1xudmFyIGlTZWFyY2hDb21tYW5kTW9kdWxlID0gcmVxdWlyZShcIi4vY29tbWFuZHMvaW5jcmVtZW50YWxfc2VhcmNoX2NvbW1hbmRzXCIpO1xudmFyIElTZWFyY2hLYmQgPSBpU2VhcmNoQ29tbWFuZE1vZHVsZS5JbmNyZW1lbnRhbFNlYXJjaEtleWJvYXJkSGFuZGxlcjtcblxuLy8gcmVnZXhwIGhhbmRsaW5nXG5cbmZ1bmN0aW9uIGlzUmVnRXhwKG9iaikge1xuICAgIHJldHVybiBvYmogaW5zdGFuY2VvZiBSZWdFeHA7XG59XG5cbi8qKlxuICogQHBhcmFtIHtSZWdFeHB9IHJlXG4gKi9cbmZ1bmN0aW9uIHJlZ0V4cFRvT2JqZWN0KHJlKSB7XG4gICAgdmFyIHN0cmluZyA9IFN0cmluZyhyZSksXG4gICAgICAgIHN0YXJ0ID0gc3RyaW5nLmluZGV4T2YoJy8nKSxcbiAgICAgICAgZmxhZ1N0YXJ0ID0gc3RyaW5nLmxhc3RJbmRleE9mKCcvJyk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZXhwcmVzc2lvbjogc3RyaW5nLnNsaWNlKHN0YXJ0KzEsIGZsYWdTdGFydCksXG4gICAgICAgIGZsYWdzOiBzdHJpbmcuc2xpY2UoZmxhZ1N0YXJ0KzEpXG4gICAgfTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gZmxhZ3NcbiAqIEByZXR1cm4ge1JlZ0V4cHxzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIHN0cmluZ1RvUmVnRXhwKHN0cmluZywgZmxhZ3MpIHtcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cChzdHJpbmcsIGZsYWdzKTtcbiAgICB9IGNhdGNoIChlKSB7IHJldHVybiBzdHJpbmc7IH1cbn1cblxuZnVuY3Rpb24gb2JqZWN0VG9SZWdFeHAob2JqKSB7XG4gICAgcmV0dXJuIHN0cmluZ1RvUmVnRXhwKG9iai5leHByZXNzaW9uLCBvYmouZmxhZ3MpO1xufVxuXG4vKipcbiAqIEltcGxlbWVudHMgaW1tZWRpYXRlIHNlYXJjaGluZyB3aGlsZSB0aGUgdXNlciBpcyB0eXBpbmcuIFdoZW4gaW5jcmVtZW50YWxcbiAqIHNlYXJjaCBpcyBhY3RpdmF0ZWQsIGtleXN0cm9rZXMgaW50byB0aGUgZWRpdG9yIHdpbGwgYmUgdXNlZCBmb3IgY29tcG9zaW5nXG4gKiBhIHNlYXJjaCB0ZXJtLiBJbW1lZGlhdGVseSBhZnRlciBldmVyeSBrZXlzdHJva2UgdGhlIHNlYXJjaCBpcyB1cGRhdGVkOlxuICogLSBzby1mYXItbWF0Y2hpbmcgY2hhcmFjdGVycyBhcmUgaGlnaGxpZ2h0ZWRcbiAqIC0gdGhlIGN1cnNvciBpcyBtb3ZlZCB0byB0aGUgbmV4dCBtYXRjaFxuICpcbiAqKi9cbmNsYXNzIEluY3JlbWVudGFsU2VhcmNoIGV4dGVuZHMgU2VhcmNoIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IGBJbmNyZW1lbnRhbFNlYXJjaGAgb2JqZWN0LlxuICAgICAqKi9cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy4kb3B0aW9ucyA9IHt3cmFwOiBmYWxzZSwgc2tpcEN1cnJlbnQ6IGZhbHNlfTtcbiAgICAgICAgdGhpcy4ka2V5Ym9hcmRIYW5kbGVyID0gbmV3IElTZWFyY2hLYmQodGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtib29sZWFufSBiYWNrd2FyZHNcbiAgICAgKi9cbiAgICBhY3RpdmF0ZShlZGl0b3IsIGJhY2t3YXJkcykge1xuICAgICAgICB0aGlzLiRlZGl0b3IgPSBlZGl0b3I7XG4gICAgICAgIHRoaXMuJHN0YXJ0UG9zID0gdGhpcy4kY3VycmVudFBvcyA9IGVkaXRvci5nZXRDdXJzb3JQb3NpdGlvbigpO1xuICAgICAgICB0aGlzLiRvcHRpb25zLm5lZWRsZSA9ICcnO1xuICAgICAgICB0aGlzLiRvcHRpb25zLmJhY2t3YXJkcyA9IGJhY2t3YXJkcztcbiAgICAgICAgZWRpdG9yLmtleUJpbmRpbmcuYWRkS2V5Ym9hcmRIYW5kbGVyKHRoaXMuJGtleWJvYXJkSGFuZGxlcik7XG4gICAgICAgIC8vIHdlIG5lZWQgdG8gY29tcGxldGVseSBpbnRlcmNlcHQgcGFzdGUsIGp1c3QgcmVnaXN0ZXJpbmcgYW4gZXZlbnQgaGFuZGxlciBkb2VzIG5vdCB3b3JrXG4gICAgICAgIHRoaXMuJG9yaWdpbmFsRWRpdG9yT25QYXN0ZSA9IGVkaXRvci5vblBhc3RlOyBcbiAgICAgICAgZWRpdG9yLm9uUGFzdGUgPSB0aGlzLm9uUGFzdGUuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy4kbW91c2Vkb3duSGFuZGxlciA9IGVkaXRvci5vbignbW91c2Vkb3duJywgdGhpcy5vbk1vdXNlRG93bi5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25GaXgoZWRpdG9yKTtcbiAgICAgICAgdGhpcy5zdGF0dXNNZXNzYWdlKHRydWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW3Jlc2V0XVxuICAgICAqL1xuICAgIGRlYWN0aXZhdGUocmVzZXQpIHtcbiAgICAgICAgdGhpcy5jYW5jZWxTZWFyY2gocmVzZXQpO1xuICAgICAgICB2YXIgZWRpdG9yID0gdGhpcy4kZWRpdG9yO1xuICAgICAgICBlZGl0b3Iua2V5QmluZGluZy5yZW1vdmVLZXlib2FyZEhhbmRsZXIodGhpcy4ka2V5Ym9hcmRIYW5kbGVyKTtcbiAgICAgICAgaWYgKHRoaXMuJG1vdXNlZG93bkhhbmRsZXIpIHtcbiAgICAgICAgICAgIGVkaXRvci5vZmYoJ21vdXNlZG93bicsIHRoaXMuJG1vdXNlZG93bkhhbmRsZXIpO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuJG1vdXNlZG93bkhhbmRsZXI7XG4gICAgICAgIH1cbiAgICAgICAgZWRpdG9yLm9uUGFzdGUgPSB0aGlzLiRvcmlnaW5hbEVkaXRvck9uUGFzdGU7XG4gICAgICAgIHRoaXMubWVzc2FnZSgnJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtFZGl0b3J9IGVkaXRvclxuICAgICAqL1xuICAgIHNlbGVjdGlvbkZpeChlZGl0b3IpIHtcbiAgICAgICAgLy8gRml4IHNlbGVjdGlvbiBidWc6IFdoZW4gY2xpY2tlZCBpbnNpZGUgdGhlIGVkaXRvclxuICAgICAgICAvLyBlZGl0b3Iuc2VsZWN0aW9uLiRpc0VtcHR5IGlzIGZhbHNlIGV2ZW4gaWYgdGhlIG1vdXNlIGNsaWNrIGRpZCBub3RcbiAgICAgICAgLy8gb3BlbiBhIHNlbGVjdGlvbi4gVGhpcyBpcyBpbnRlcnByZXRlZCBieSB0aGUgbW92ZSBjb21tYW5kcyB0b1xuICAgICAgICAvLyBleHRlbmQgdGhlIHNlbGVjdGlvbi4gVG8gb25seSBleHRlbmQgdGhlIHNlbGVjdGlvbiB3aGVuIHRoZXJlIGlzXG4gICAgICAgIC8vIG9uZSwgd2UgY2xlYXIgaXQgaGVyZVxuICAgICAgICBpZiAoZWRpdG9yLnNlbGVjdGlvbi5pc0VtcHR5KCkgJiYgIWVkaXRvci5zZXNzaW9uLiRlbWFjc01hcmspIHtcbiAgICAgICAgICAgIGVkaXRvci5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtSZWdFeHB9IHJlZ2V4cFxuICAgICAqL1xuICAgIGhpZ2hsaWdodChyZWdleHApIHtcbiAgICAgICAgdmFyIHNlc3MgPSB0aGlzLiRlZGl0b3Iuc2Vzc2lvbixcbiAgICAgICAgICAgIGhsID0gc2Vzcy4kaXNlYXJjaEhpZ2hsaWdodCA9IHNlc3MuJGlzZWFyY2hIaWdobGlnaHQgfHwgc2Vzcy5hZGREeW5hbWljTWFya2VyKFxuICAgICAgICAgICAgICAgIG5ldyBTZWFyY2hIaWdobGlnaHQobnVsbCwgXCJhY2VfaXNlYXJjaC1yZXN1bHRcIiwgXCJ0ZXh0XCIpKTtcbiAgICAgICAgaGwuc2V0UmVnZXhwKHJlZ2V4cCk7XG4gICAgICAgIHNlc3MuX2VtaXQoXCJjaGFuZ2VCYWNrTWFya2VyXCIpOyAvLyBmb3JjZSBoaWdobGlnaHQgbGF5ZXIgcmVkcmF3XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbcmVzZXRdXG4gICAgICovXG4gICAgY2FuY2VsU2VhcmNoKHJlc2V0KSB7XG4gICAgICAgIHZhciBlID0gdGhpcy4kZWRpdG9yO1xuICAgICAgICB0aGlzLiRwcmV2TmVlZGxlID0gdGhpcy4kb3B0aW9ucy5uZWVkbGU7XG4gICAgICAgIHRoaXMuJG9wdGlvbnMubmVlZGxlID0gJyc7XG4gICAgICAgIGlmIChyZXNldCkge1xuICAgICAgICAgICAgZS5tb3ZlQ3Vyc29yVG9Qb3NpdGlvbih0aGlzLiRzdGFydFBvcyk7XG4gICAgICAgICAgICB0aGlzLiRjdXJyZW50UG9zID0gdGhpcy4kc3RhcnRQb3M7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlLnB1c2hFbWFjc01hcmsgJiYgZS5wdXNoRW1hY3NNYXJrKHRoaXMuJHN0YXJ0UG9zLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5oaWdobGlnaHQobnVsbCk7XG4gICAgICAgIHJldHVybiBSYW5nZS5mcm9tUG9pbnRzKHRoaXMuJGN1cnJlbnRQb3MsIHRoaXMuJGN1cnJlbnRQb3MpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gbW92ZVRvTmV4dFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IG5lZWRsZVVwZGF0ZUZ1bmNcbiAgICAgKi9cbiAgICBoaWdobGlnaHRBbmRGaW5kV2l0aE5lZWRsZShtb3ZlVG9OZXh0LCBuZWVkbGVVcGRhdGVGdW5jKSB7XG4gICAgICAgIGlmICghdGhpcy4kZWRpdG9yKSByZXR1cm4gbnVsbDtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB0aGlzLiRvcHRpb25zO1xuXG4gICAgICAgIC8vIGdldCBzZWFyY2ggdGVybVxuICAgICAgICBpZiAobmVlZGxlVXBkYXRlRnVuYykge1xuICAgICAgICAgICAgb3B0aW9ucy5uZWVkbGUgPSBuZWVkbGVVcGRhdGVGdW5jLmNhbGwodGhpcywgb3B0aW9ucy5uZWVkbGUgfHwgJycpIHx8ICcnO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcHRpb25zLm5lZWRsZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdHVzTWVzc2FnZSh0cnVlKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNhbmNlbFNlYXJjaCh0cnVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHRyeSB0byBmaW5kIHRoZSBuZXh0IG9jY3VycmVuY2UgYW5kIGVuYWJsZSAgaGlnaGxpZ2h0aW5nIG1hcmtlclxuICAgICAgICBvcHRpb25zLnN0YXJ0ID0gdGhpcy4kY3VycmVudFBvcztcbiAgICAgICAgdmFyIHNlc3Npb24gPSB0aGlzLiRlZGl0b3Iuc2Vzc2lvbixcbiAgICAgICAgICAgIGZvdW5kID0gdGhpcy5maW5kKHNlc3Npb24pLFxuICAgICAgICAgICAgc2hvdWxkU2VsZWN0ID0gdGhpcy4kZWRpdG9yLmVtYWNzTWFyayA/XG4gICAgICAgICAgICAgICAgISF0aGlzLiRlZGl0b3IuZW1hY3NNYXJrKCkgOiAhdGhpcy4kZWRpdG9yLnNlbGVjdGlvbi5pc0VtcHR5KCk7XG4gICAgICAgIGlmIChmb3VuZCkge1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMuYmFja3dhcmRzKSBmb3VuZCA9IFJhbmdlLmZyb21Qb2ludHMoZm91bmQuZW5kLCBmb3VuZC5zdGFydCk7XG4gICAgICAgICAgICB0aGlzLiRlZGl0b3Iuc2VsZWN0aW9uLnNldFJhbmdlKFJhbmdlLmZyb21Qb2ludHMoc2hvdWxkU2VsZWN0ID8gdGhpcy4kc3RhcnRQb3MgOiBmb3VuZC5lbmQsIGZvdW5kLmVuZCkpO1xuICAgICAgICAgICAgaWYgKG1vdmVUb05leHQpIHRoaXMuJGN1cnJlbnRQb3MgPSBmb3VuZC5lbmQ7XG4gICAgICAgICAgICAvLyBoaWdobGlnaHQgYWZ0ZXIgY3Vyc29yIG1vdmUsIHNvIHNlbGVjdGlvbiB3b3JrcyBwcm9wZXJseVxuICAgICAgICAgICAgdGhpcy5oaWdobGlnaHQob3B0aW9ucy5yZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnN0YXR1c01lc3NhZ2UoZm91bmQpO1xuXG4gICAgICAgIHJldHVybiBmb3VuZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc1xuICAgICAqL1xuICAgIGFkZFN0cmluZyhzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhpZ2hsaWdodEFuZEZpbmRXaXRoTmVlZGxlKGZhbHNlLCBmdW5jdGlvbihuZWVkbGUpIHtcbiAgICAgICAgICAgIGlmICghaXNSZWdFeHAobmVlZGxlKSlcbiAgICAgICAgICAgICAgcmV0dXJuIG5lZWRsZSArIHM7XG4gICAgICAgICAgICB2YXIgcmVPYmogPSByZWdFeHBUb09iamVjdChuZWVkbGUpO1xuICAgICAgICAgICAgcmVPYmouZXhwcmVzc2lvbiArPSBzO1xuICAgICAgICAgICAgcmV0dXJuIG9iamVjdFRvUmVnRXhwKHJlT2JqKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHthbnl9IGNcbiAgICAgKi9cbiAgICByZW1vdmVDaGFyKGMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGlnaGxpZ2h0QW5kRmluZFdpdGhOZWVkbGUoZmFsc2UsIGZ1bmN0aW9uKG5lZWRsZSkge1xuICAgICAgICAgICAgaWYgKCFpc1JlZ0V4cChuZWVkbGUpKVxuICAgICAgICAgICAgICByZXR1cm4gbmVlZGxlLnN1YnN0cmluZygwLCBuZWVkbGUubGVuZ3RoLTEpO1xuICAgICAgICAgICAgdmFyIHJlT2JqID0gcmVnRXhwVG9PYmplY3QobmVlZGxlKTtcbiAgICAgICAgICAgIHJlT2JqLmV4cHJlc3Npb24gPSByZU9iai5leHByZXNzaW9uLnN1YnN0cmluZygwLCByZU9iai5leHByZXNzaW9uLmxlbmd0aC0xKTtcbiAgICAgICAgICAgIHJldHVybiBvYmplY3RUb1JlZ0V4cChyZU9iaik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5leHQob3B0aW9ucykge1xuICAgICAgICAvLyB0cnkgdG8gZmluZCB0aGUgbmV4dCBvY2N1cnJlbmNlIG9mIHdoYXRldmVyIHdlIGhhdmUgc2VhcmNoZWQgZm9yXG4gICAgICAgIC8vIGVhcmxpZXIuXG4gICAgICAgIC8vIG9wdGlvbnMgPSB7W2JhY2t3YXJkczogQk9PTF0sIFt1c2VDdXJyZW50T3JQcmV2U2VhcmNoOiBCT09MXX1cbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICAgIHRoaXMuJG9wdGlvbnMuYmFja3dhcmRzID0gISFvcHRpb25zLmJhY2t3YXJkcztcbiAgICAgICAgdGhpcy4kY3VycmVudFBvcyA9IHRoaXMuJGVkaXRvci5nZXRDdXJzb3JQb3NpdGlvbigpO1xuICAgICAgICByZXR1cm4gdGhpcy5oaWdobGlnaHRBbmRGaW5kV2l0aE5lZWRsZSh0cnVlLCBmdW5jdGlvbihuZWVkbGUpIHtcbiAgICAgICAgICAgIHJldHVybiBvcHRpb25zLnVzZUN1cnJlbnRPclByZXZTZWFyY2ggJiYgbmVlZGxlLmxlbmd0aCA9PT0gMCA/XG4gICAgICAgICAgICAgICAgdGhpcy4kcHJldk5lZWRsZSB8fCAnJyA6IG5lZWRsZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25Nb3VzZURvd24oZXZ0KSB7XG4gICAgICAgIC8vIHdoZW4gbW91c2UgaW50ZXJhY3Rpb24gaGFwcGVucyB0aGVuIHdlIHF1aXQgaW5jcmVtZW50YWwgc2VhcmNoXG4gICAgICAgIHRoaXMuZGVhY3RpdmF0ZSgpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dFxuICAgICAqL1xuICAgIG9uUGFzdGUodGV4dCkge1xuICAgICAgICB0aGlzLmFkZFN0cmluZyh0ZXh0KTtcbiAgICB9XG5cbiAgICBjb252ZXJ0TmVlZGxlVG9SZWdFeHAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhpZ2hsaWdodEFuZEZpbmRXaXRoTmVlZGxlKGZhbHNlLCBmdW5jdGlvbihuZWVkbGUpIHtcbiAgICAgICAgICAgIHJldHVybiBpc1JlZ0V4cChuZWVkbGUpID8gbmVlZGxlIDogc3RyaW5nVG9SZWdFeHAobmVlZGxlLCAnaWcnKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29udmVydE5lZWRsZVRvU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5oaWdobGlnaHRBbmRGaW5kV2l0aE5lZWRsZShmYWxzZSwgZnVuY3Rpb24obmVlZGxlKSB7XG4gICAgICAgICAgICByZXR1cm4gaXNSZWdFeHAobmVlZGxlKSA/IHJlZ0V4cFRvT2JqZWN0KG5lZWRsZSkuZXhwcmVzc2lvbiA6IG5lZWRsZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhdHVzTWVzc2FnZShmb3VuZCkge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IHRoaXMuJG9wdGlvbnMsIG1zZyA9ICcnO1xuICAgICAgICBtc2cgKz0gb3B0aW9ucy5iYWNrd2FyZHMgPyAncmV2ZXJzZS0nIDogJyc7XG4gICAgICAgIG1zZyArPSAnaXNlYXJjaDogJyArIG9wdGlvbnMubmVlZGxlO1xuICAgICAgICBtc2cgKz0gZm91bmQgPyAnJyA6ICcgKG5vdCBmb3VuZCknO1xuICAgICAgICB0aGlzLm1lc3NhZ2UobXNnKTtcbiAgICB9XG5cbiAgICBtZXNzYWdlKG1zZykge1xuICAgICAgICBpZiAodGhpcy4kZWRpdG9yLnNob3dDb21tYW5kTGluZSkge1xuICAgICAgICAgICAgdGhpcy4kZWRpdG9yLnNob3dDb21tYW5kTGluZShtc2cpO1xuICAgICAgICAgICAgdGhpcy4kZWRpdG9yLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuZXhwb3J0cy5JbmNyZW1lbnRhbFNlYXJjaCA9IEluY3JlbWVudGFsU2VhcmNoO1xuXG5cbi8qKlxuICpcbiAqIENvbmZpZyBzZXR0aW5ncyBmb3IgZW5hYmxpbmcvZGlzYWJsaW5nIFtbSW5jcmVtZW50YWxTZWFyY2ggYEluY3JlbWVudGFsU2VhcmNoYF1dLlxuICpcbiAqKi9cblxudmFyIGRvbSA9IHJlcXVpcmUoJy4vbGliL2RvbScpO1xuZG9tLmltcG9ydENzc1N0cmluZyhgXG4uYWNlX21hcmtlci1sYXllciAuYWNlX2lzZWFyY2gtcmVzdWx0IHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB6LWluZGV4OiA2O1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xufVxuZGl2LmFjZV9pc2VhcmNoLXJlc3VsdCB7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDIwMCwgMCwgMC41KTtcbiAgYm94LXNoYWRvdzogMCAwIDRweCByZ2IoMjU1LCAyMDAsIDApO1xufVxuLmFjZV9kYXJrIGRpdi5hY2VfaXNlYXJjaC1yZXN1bHQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTAwLCAxMTAsIDE2MCk7XG4gIGJveC1zaGFkb3c6IDAgMCA0cHggcmdiKDgwLCA5MCwgMTQwKTtcbn1gLCBcImluY3JlbWVudGFsLXNlYXJjaC1oaWdobGlnaHRpbmdcIiwgZmFsc2UpO1xuXG4vLyBzdXBwb3J0IGZvciBkZWZhdWx0IGtleWJvYXJkIGhhbmRsZXJcbnZhciBjb21tYW5kcyA9IHJlcXVpcmUoXCIuL2NvbW1hbmRzL2NvbW1hbmRfbWFuYWdlclwiKTtcbihmdW5jdGlvbigpIHtcbiAgICB0aGlzLnNldHVwSW5jcmVtZW50YWxTZWFyY2ggPSBmdW5jdGlvbihlZGl0b3IsIHZhbCkge1xuICAgICAgICBpZiAodGhpcy51c2VzSW5jcmVtZW50YWxTZWFyY2ggPT0gdmFsKSByZXR1cm47XG4gICAgICAgIHRoaXMudXNlc0luY3JlbWVudGFsU2VhcmNoID0gdmFsO1xuICAgICAgICB2YXIgaVNlYXJjaENvbW1hbmRzID0gaVNlYXJjaENvbW1hbmRNb2R1bGUuaVNlYXJjaFN0YXJ0Q29tbWFuZHM7XG4gICAgICAgIHZhciBtZXRob2QgPSB2YWwgPyAnYWRkQ29tbWFuZHMnIDogJ3JlbW92ZUNvbW1hbmRzJztcbiAgICAgICAgdGhpc1ttZXRob2RdKGlTZWFyY2hDb21tYW5kcyk7XG4gICAgfTtcbn0pLmNhbGwoY29tbWFuZHMuQ29tbWFuZE1hbmFnZXIucHJvdG90eXBlKTtcblxuLy8gaW5jcmVtZW50YWwgc2VhcmNoIGNvbmZpZyBvcHRpb25cbnZhciBFZGl0b3IgPSByZXF1aXJlKFwiLi9lZGl0b3JcIikuRWRpdG9yO1xucmVxdWlyZShcIi4vY29uZmlnXCIpLmRlZmluZU9wdGlvbnMoRWRpdG9yLnByb3RvdHlwZSwgXCJlZGl0b3JcIiwge1xuICAgIHVzZUluY3JlbWVudGFsU2VhcmNoOiB7XG4gICAgICAgIHNldDogZnVuY3Rpb24odmFsKSB7XG4gICAgICAgICAgICB0aGlzLmtleUJpbmRpbmcuJGhhbmRsZXJzLmZvckVhY2goZnVuY3Rpb24oaGFuZGxlcikge1xuICAgICAgICAgICAgICAgIGlmIChoYW5kbGVyLnNldHVwSW5jcmVtZW50YWxTZWFyY2gpIHtcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlci5zZXR1cEluY3JlbWVudGFsU2VhcmNoKHRoaXMsIHZhbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLl9lbWl0KCdpbmNyZW1lbnRhbFNlYXJjaFNldHRpbmdDaGFuZ2VkJywge2lzRW5hYmxlZDogdmFsfSk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgZG9tID0gcmVxdWlyZShcIi4uL2xpYi9kb21cIik7XG5yZXF1aXJlKFwiLi4vaW5jcmVtZW50YWxfc2VhcmNoXCIpO1xudmFyIGlTZWFyY2hDb21tYW5kTW9kdWxlID0gcmVxdWlyZShcIi4uL2NvbW1hbmRzL2luY3JlbWVudGFsX3NlYXJjaF9jb21tYW5kc1wiKTtcblxuXG52YXIgSGFzaEhhbmRsZXIgPSByZXF1aXJlKFwiLi9oYXNoX2hhbmRsZXJcIikuSGFzaEhhbmRsZXI7XG5leHBvcnRzLmhhbmRsZXIgPSBuZXcgSGFzaEhhbmRsZXIoKTtcblxuZXhwb3J0cy5oYW5kbGVyLmlzRW1hY3MgPSB0cnVlO1xuZXhwb3J0cy5oYW5kbGVyLiRpZCA9IFwiYWNlL2tleWJvYXJkL2VtYWNzXCI7XG5cblxuZG9tLmltcG9ydENzc1N0cmluZyhgXG4uZW1hY3MtbW9kZSAuYWNlX2N1cnNvcntcbiAgICBib3JkZXI6IDFweCByZ2JhKDUwLDI1MCw1MCwwLjgpIHNvbGlkIWltcG9ydGFudDtcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94IWltcG9ydGFudDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsMjUwLDAsMC45KTtcbiAgICBvcGFjaXR5OiAwLjU7XG59XG4uZW1hY3MtbW9kZSAuYWNlX2hpZGRlbi1jdXJzb3JzIC5hY2VfY3Vyc29ye1xuICAgIG9wYWNpdHk6IDE7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG59XG4uZW1hY3MtbW9kZSAuYWNlX292ZXJ3cml0ZS1jdXJzb3JzIC5hY2VfY3Vyc29yIHtcbiAgICBvcGFjaXR5OiAxO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgIGJvcmRlci13aWR0aDogMCAwIDJweCAycHggIWltcG9ydGFudDtcbn1cbi5lbWFjcy1tb2RlIC5hY2VfdGV4dC1sYXllciB7XG4gICAgei1pbmRleDogNFxufVxuLmVtYWNzLW1vZGUgLmFjZV9jdXJzb3ItbGF5ZXIge1xuICAgIHotaW5kZXg6IDJcbn1gLCAnZW1hY3NNb2RlJ1xuKTtcbnZhciAkZm9ybWVyTG9uZ1dvcmRzO1xudmFyICRmb3JtZXJMaW5lU3RhcnQ7XG5cbmV4cG9ydHMuaGFuZGxlci5hdHRhY2ggPSBmdW5jdGlvbihlZGl0b3IpIHtcbiAgICAvLyBpbiBlbWFjcywgZ290b3dvcmRsZWZ0L3JpZ2h0IHNob3VsZCBub3QgY291bnQgYSBzcGFjZSBhcyBhIHdvcmQuLlxuICAgICRmb3JtZXJMb25nV29yZHMgPSBlZGl0b3Iuc2Vzc2lvbi4kc2VsZWN0TG9uZ1dvcmRzO1xuICAgIGVkaXRvci5zZXNzaW9uLiRzZWxlY3RMb25nV29yZHMgPSB0cnVlO1xuICAgIC8vIENUUkwtQSBzaG91bGQgZ28gdG8gYWN0dWFsIGJlZ2lubmluZyBvZiBsaW5lXG4gICAgJGZvcm1lckxpbmVTdGFydCA9IGVkaXRvci5zZXNzaW9uLiR1c2VFbWFjc1N0eWxlTGluZVN0YXJ0O1xuICAgIGVkaXRvci5zZXNzaW9uLiR1c2VFbWFjc1N0eWxlTGluZVN0YXJ0ID0gdHJ1ZTtcblxuICAgIGVkaXRvci5zZXNzaW9uLiRlbWFjc01hcmsgPSBudWxsOyAvLyB0aGUgYWN0aXZlIG1hcmtcbiAgICBlZGl0b3Iuc2Vzc2lvbi4kZW1hY3NNYXJrUmluZyA9IGVkaXRvci5zZXNzaW9uLiRlbWFjc01hcmtSaW5nIHx8IFtdO1xuXG4gICAgZWRpdG9yLmVtYWNzTWFyayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXNzaW9uLiRlbWFjc01hcms7XG4gICAgfTtcblxuICAgIGVkaXRvci5zZXRFbWFjc01hcmsgPSBmdW5jdGlvbihwKSB7XG4gICAgICAgIC8vIHRvIGRlYWN0aXZhdGUgcGFzcyBpbiBhIGZhbHN5IHZhbHVlXG4gICAgICAgIHRoaXMuc2Vzc2lvbi4kZW1hY3NNYXJrID0gcDtcbiAgICB9O1xuXG4gICAgZWRpdG9yLnB1c2hFbWFjc01hcmsgPSBmdW5jdGlvbihwLCBhY3RpdmF0ZSkge1xuICAgICAgICB2YXIgcHJldk1hcmsgPSB0aGlzLnNlc3Npb24uJGVtYWNzTWFyaztcbiAgICAgICAgaWYgKHByZXZNYXJrKVxuICAgICAgICAgICAgdGhpcy5zZXNzaW9uLiRlbWFjc01hcmtSaW5nLnB1c2gocHJldk1hcmspO1xuICAgICAgICBpZiAoIXAgfHwgYWN0aXZhdGUpIHRoaXMuc2V0RW1hY3NNYXJrKHApO1xuICAgICAgICBlbHNlIHRoaXMuc2Vzc2lvbi4kZW1hY3NNYXJrUmluZy5wdXNoKHApO1xuICAgIH07XG5cbiAgICBlZGl0b3IucG9wRW1hY3NNYXJrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBtYXJrID0gdGhpcy5lbWFjc01hcmsoKTtcbiAgICAgICAgaWYgKG1hcmspIHsgdGhpcy5zZXRFbWFjc01hcmsobnVsbCk7IHJldHVybiBtYXJrOyB9XG4gICAgICAgIHJldHVybiB0aGlzLnNlc3Npb24uJGVtYWNzTWFya1JpbmcucG9wKCk7XG4gICAgfTtcblxuICAgIGVkaXRvci5nZXRMYXN0RW1hY3NNYXJrID0gZnVuY3Rpb24ocCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXNzaW9uLiRlbWFjc01hcmsgfHwgdGhpcy5zZXNzaW9uLiRlbWFjc01hcmtSaW5nLnNsaWNlKC0xKVswXTtcbiAgICB9O1xuXG4gICAgZWRpdG9yLmVtYWNzTWFya0ZvclNlbGVjdGlvbiA9IGZ1bmN0aW9uKHJlcGxhY2VtZW50KSB7XG4gICAgICAgIC8vIGZpbmQgdGhlIG1hcmsgaW4gJGVtYWNzTWFya1JpbmcgY29ycmVzcG9uZGluZyB0byB0aGUgY3VycmVudFxuICAgICAgICAvLyBzZWxlY3Rpb25cbiAgICAgICAgdmFyIHNlbCA9IHRoaXMuc2VsZWN0aW9uLFxuICAgICAgICAgICAgbXVsdGlSYW5nZUxlbmd0aCA9IHRoaXMubXVsdGlTZWxlY3QgP1xuICAgICAgICAgICAgICAgIHRoaXMubXVsdGlTZWxlY3QuZ2V0QWxsUmFuZ2VzKCkubGVuZ3RoIDogMSxcbiAgICAgICAgICAgIHNlbEluZGV4ID0gc2VsLmluZGV4IHx8IDAsXG4gICAgICAgICAgICBtYXJrUmluZyA9IHRoaXMuc2Vzc2lvbi4kZW1hY3NNYXJrUmluZyxcbiAgICAgICAgICAgIG1hcmtJbmRleCA9IG1hcmtSaW5nLmxlbmd0aCAtIChtdWx0aVJhbmdlTGVuZ3RoIC0gc2VsSW5kZXgpLFxuICAgICAgICAgICAgbGFzdE1hcmsgPSBtYXJrUmluZ1ttYXJrSW5kZXhdIHx8IHNlbC5hbmNob3I7XG4gICAgICAgIGlmIChyZXBsYWNlbWVudCkge1xuICAgICAgICAgICAgbWFya1Jpbmcuc3BsaWNlKG1hcmtJbmRleCwgMSxcbiAgICAgICAgICAgICAgICBcInJvd1wiIGluIHJlcGxhY2VtZW50ICYmIFwiY29sdW1uXCIgaW4gcmVwbGFjZW1lbnQgP1xuICAgICAgICAgICAgICAgICAgICByZXBsYWNlbWVudCA6IHVuZGVmaW5lZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxhc3RNYXJrO1xuICAgIH07XG5cbiAgICBlZGl0b3Iub24oXCJjbGlja1wiLCAkcmVzZXRNYXJrTW9kZSk7XG4gICAgZWRpdG9yLm9uKFwiY2hhbmdlU2Vzc2lvblwiLCAka2JTZXNzaW9uQ2hhbmdlKTtcbiAgICBlZGl0b3IucmVuZGVyZXIuJGJsb2NrQ3Vyc29yID0gdHJ1ZTtcbiAgICBlZGl0b3Iuc2V0U3R5bGUoXCJlbWFjcy1tb2RlXCIpO1xuICAgIGVkaXRvci5jb21tYW5kcy5hZGRDb21tYW5kcyhjb21tYW5kcyk7XG4gICAgZXhwb3J0cy5oYW5kbGVyLnBsYXRmb3JtID0gZWRpdG9yLmNvbW1hbmRzLnBsYXRmb3JtO1xuICAgIGVkaXRvci4kZW1hY3NNb2RlSGFuZGxlciA9IHRoaXM7XG4gICAgZWRpdG9yLm9uKCdjb3B5JywgdGhpcy5vbkNvcHkpO1xuICAgIGVkaXRvci5vbigncGFzdGUnLCB0aGlzLm9uUGFzdGUpO1xufTtcblxuZXhwb3J0cy5oYW5kbGVyLmRldGFjaCA9IGZ1bmN0aW9uKGVkaXRvcikge1xuICAgIGVkaXRvci5yZW5kZXJlci4kYmxvY2tDdXJzb3IgPSBmYWxzZTtcbiAgICBlZGl0b3Iuc2Vzc2lvbi4kc2VsZWN0TG9uZ1dvcmRzID0gJGZvcm1lckxvbmdXb3JkcztcbiAgICBlZGl0b3Iuc2Vzc2lvbi4kdXNlRW1hY3NTdHlsZUxpbmVTdGFydCA9ICRmb3JtZXJMaW5lU3RhcnQ7XG4gICAgZWRpdG9yLm9mZihcImNsaWNrXCIsICRyZXNldE1hcmtNb2RlKTtcbiAgICBlZGl0b3Iub2ZmKFwiY2hhbmdlU2Vzc2lvblwiLCAka2JTZXNzaW9uQ2hhbmdlKTtcbiAgICBlZGl0b3IudW5zZXRTdHlsZShcImVtYWNzLW1vZGVcIik7XG4gICAgZWRpdG9yLmNvbW1hbmRzLnJlbW92ZUNvbW1hbmRzKGNvbW1hbmRzKTtcbiAgICBlZGl0b3Iub2ZmKCdjb3B5JywgdGhpcy5vbkNvcHkpO1xuICAgIGVkaXRvci5vZmYoJ3Bhc3RlJywgdGhpcy5vblBhc3RlKTtcbiAgICBlZGl0b3IuJGVtYWNzTW9kZUhhbmRsZXIgPSBudWxsO1xufTtcblxudmFyICRrYlNlc3Npb25DaGFuZ2UgPSBmdW5jdGlvbihlKSB7XG4gICAgaWYgKGUub2xkU2Vzc2lvbikge1xuICAgICAgICBlLm9sZFNlc3Npb24uJHNlbGVjdExvbmdXb3JkcyA9ICRmb3JtZXJMb25nV29yZHM7XG4gICAgICAgIGUub2xkU2Vzc2lvbi4kdXNlRW1hY3NTdHlsZUxpbmVTdGFydCA9ICRmb3JtZXJMaW5lU3RhcnQ7XG4gICAgfVxuXG4gICAgJGZvcm1lckxvbmdXb3JkcyA9IGUuc2Vzc2lvbi4kc2VsZWN0TG9uZ1dvcmRzO1xuICAgIGUuc2Vzc2lvbi4kc2VsZWN0TG9uZ1dvcmRzID0gdHJ1ZTtcbiAgICAkZm9ybWVyTGluZVN0YXJ0ID0gZS5zZXNzaW9uLiR1c2VFbWFjc1N0eWxlTGluZVN0YXJ0O1xuICAgIGUuc2Vzc2lvbi4kdXNlRW1hY3NTdHlsZUxpbmVTdGFydCA9IHRydWU7XG5cbiAgICBpZiAoIWUuc2Vzc2lvbi5oYXNPd25Qcm9wZXJ0eSgnJGVtYWNzTWFyaycpKVxuICAgICAgICBlLnNlc3Npb24uJGVtYWNzTWFyayA9IG51bGw7XG4gICAgaWYgKCFlLnNlc3Npb24uaGFzT3duUHJvcGVydHkoJyRlbWFjc01hcmtSaW5nJykpXG4gICAgICAgIGUuc2Vzc2lvbi4kZW1hY3NNYXJrUmluZyA9IFtdO1xufTtcblxudmFyICRyZXNldE1hcmtNb2RlID0gZnVuY3Rpb24oZSkge1xuICAgIGUuZWRpdG9yLnNlc3Npb24uJGVtYWNzTWFyayA9IG51bGw7XG59O1xuXG52YXIga2V5cyA9IHJlcXVpcmUoXCIuLi9saWIva2V5c1wiKS5LRVlfTU9EUztcbnZhciBlTW9kcyA9IHtDOiBcImN0cmxcIiwgUzogXCJzaGlmdFwiLCBNOiBcImFsdFwiLCBDTUQ6IFwiY29tbWFuZFwifTtcbnZhciBjb21iaW5hdGlvbnMgPSBbXCJDLVMtTS1DTURcIixcbiAgICAgICAgICAgICAgICAgICAgXCJTLU0tQ01EXCIsIFwiQy1NLUNNRFwiLCBcIkMtUy1DTURcIiwgXCJDLVMtTVwiLFxuICAgICAgICAgICAgICAgICAgICBcIk0tQ01EXCIsIFwiUy1DTURcIiwgXCJTLU1cIiwgXCJDLUNNRFwiLCBcIkMtTVwiLCBcIkMtU1wiLFxuICAgICAgICAgICAgICAgICAgICBcIkNNRFwiLCBcIk1cIiwgXCJTXCIsIFwiQ1wiXTtcbmNvbWJpbmF0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKGMpIHtcbiAgICB2YXIgaGFzaElkID0gMDtcbiAgICBjLnNwbGl0KFwiLVwiKS5mb3JFYWNoKGZ1bmN0aW9uKGMpIHtcbiAgICAgICAgaGFzaElkID0gaGFzaElkIHwga2V5c1tlTW9kc1tjXV07XG4gICAgfSk7XG4gICAgZU1vZHNbaGFzaElkXSA9IGMudG9Mb3dlckNhc2UoKSArIFwiLVwiO1xufSk7XG5cbmV4cG9ydHMuaGFuZGxlci5vbkNvcHkgPSBmdW5jdGlvbihlLCBlZGl0b3IpIHtcbiAgICBpZiAoZWRpdG9yLiRoYW5kbGVzRW1hY3NPbkNvcHkpIHJldHVybjtcbiAgICBlZGl0b3IuJGhhbmRsZXNFbWFjc09uQ29weSA9IHRydWU7XG4gICAgZXhwb3J0cy5oYW5kbGVyLmNvbW1hbmRzLmtpbGxSaW5nU2F2ZS5leGVjKGVkaXRvcik7XG4gICAgZWRpdG9yLiRoYW5kbGVzRW1hY3NPbkNvcHkgPSBmYWxzZTtcbn07XG5cbmV4cG9ydHMuaGFuZGxlci5vblBhc3RlID0gZnVuY3Rpb24oZSwgZWRpdG9yKSB7XG4gICAgZWRpdG9yLnB1c2hFbWFjc01hcmsoZWRpdG9yLmdldEN1cnNvclBvc2l0aW9uKCkpO1xufTtcblxuZXhwb3J0cy5oYW5kbGVyLmJpbmRLZXkgPSBmdW5jdGlvbihrZXksIGNvbW1hbmQpIHtcbiAgICBpZiAodHlwZW9mIGtleSA9PSBcIm9iamVjdFwiKVxuICAgICAgICBrZXkgPSBrZXlbdGhpcy5wbGF0Zm9ybV07XG4gICAgaWYgKCFrZXkpXG4gICAgICAgIHJldHVybjtcblxuICAgIHZhciBja2IgPSB0aGlzLmNvbW1hbmRLZXlCaW5kaW5nO1xuICAgIGtleS5zcGxpdChcInxcIikuZm9yRWFjaChmdW5jdGlvbihrZXlQYXJ0KSB7XG4gICAgICAgIGtleVBhcnQgPSBrZXlQYXJ0LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGNrYltrZXlQYXJ0XSA9IGNvbW1hbmQ7XG4gICAgICAgIC8vIHJlZ2lzdGVyIGFsbCBwYXJ0aWFsIGtleSBjb21ib3MgYXMgbnVsbCBjb21tYW5kc1xuICAgICAgICAvLyB0byBiZSBhYmxlIHRvIGFjdGl2YXRlIGtleSBjb21ib3Mgd2l0aCBhcmJpdHJhcnkgbGVuZ3RoXG4gICAgICAgIC8vIEV4YW1wbGU6IGlmIGtleVBhcnQgaXMgXCJDLWMgQy1sIHRcIiB0aGVuIFwiQy1jIEMtbCB0XCIgd2lsbFxuICAgICAgICAvLyBnZXQgY29tbWFuZCBhc3NpZ25lZCBhbmQgXCJDLWNcIiBhbmQgXCJDLWMgQy1sXCIgd2lsbCBnZXRcbiAgICAgICAgLy8gYSBudWxsIGNvbW1hbmQgYXNzaWduZWQgaW4gdGhpcy5jb21tYW5kS2V5QmluZGluZy4gRm9yXG4gICAgICAgIC8vIHRoZSBsb29rdXAgbG9naWMgc2VlIGhhbmRsZUtleWJvYXJkKClcbiAgICAgICAgdmFyIGtleVBhcnRzID0ga2V5UGFydC5zcGxpdChcIiBcIikuc2xpY2UoMCwtMSk7XG4gICAgICAgIGtleVBhcnRzLnJlZHVjZShmdW5jdGlvbihrZXlNYXBLZXlzLCBrZXlQYXJ0LCBpKSB7XG4gICAgICAgICAgICB2YXIgcHJlZml4ID0ga2V5TWFwS2V5c1tpLTFdID8ga2V5TWFwS2V5c1tpLTFdICsgJyAnIDogJyc7XG4gICAgICAgICAgICByZXR1cm4ga2V5TWFwS2V5cy5jb25jYXQoW3ByZWZpeCArIGtleVBhcnRdKTtcbiAgICAgICAgfSwgW10pLmZvckVhY2goZnVuY3Rpb24oa2V5UGFydCkge1xuICAgICAgICAgICAgaWYgKCFja2Jba2V5UGFydF0pIGNrYltrZXlQYXJ0XSA9IFwibnVsbFwiO1xuICAgICAgICB9KTtcbiAgICB9LCB0aGlzKTtcbn07XG5cbmV4cG9ydHMuaGFuZGxlci5nZXRTdGF0dXNUZXh0ID0gZnVuY3Rpb24oZWRpdG9yLCBkYXRhKSB7XG4gIHZhciBzdHIgPSBcIlwiO1xuICBpZiAoZGF0YS5jb3VudClcbiAgICBzdHIgKz0gZGF0YS5jb3VudDtcbiAgaWYgKGRhdGEua2V5Q2hhaW4pXG4gICAgc3RyICs9IFwiIFwiICsgZGF0YS5rZXlDaGFpbjtcbiAgcmV0dXJuIHN0cjtcbn07XG5cbmV4cG9ydHMuaGFuZGxlci5oYW5kbGVLZXlib2FyZCA9IGZ1bmN0aW9uKGRhdGEsIGhhc2hJZCwga2V5LCBrZXlDb2RlKSB7XG4gICAgLy8gaWYga2V5Q29kZSA9PSAtMSBhIG5vbi1wcmludGFibGUga2V5IHdhcyBwcmVzc2VkLCBzdWNoIGFzIGp1c3RcbiAgICAvLyBjb250cm9sLiBIYW5kbGluZyB0aG9zZSBpcyBjdXJyZW50bHkgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGhhbmRsZXJcbiAgICBpZiAoa2V5Q29kZSA9PT0gLTEpIHJldHVybiB1bmRlZmluZWQ7XG5cbiAgICB2YXIgZWRpdG9yID0gZGF0YS5lZGl0b3I7XG4gICAgZWRpdG9yLl9zaWduYWwoXCJjaGFuZ2VTdGF0dXNcIik7XG4gICAgLy8gaW5zZXJ0c3RyaW5nIGRhdGEuY291bnQgdGltZXNcbiAgICBpZiAoaGFzaElkID09IC0xKSB7XG4gICAgICAgIGVkaXRvci5wdXNoRW1hY3NNYXJrKCk7XG4gICAgICAgIGlmIChkYXRhLmNvdW50KSB7XG4gICAgICAgICAgICB2YXIgc3RyID0gbmV3IEFycmF5KGRhdGEuY291bnQgKyAxKS5qb2luKGtleSk7XG4gICAgICAgICAgICBkYXRhLmNvdW50ID0gbnVsbDtcbiAgICAgICAgICAgIHJldHVybiB7Y29tbWFuZDogXCJpbnNlcnRzdHJpbmdcIiwgYXJnczogc3RyfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciBtb2RpZmllciA9IGVNb2RzW2hhc2hJZF07XG5cbiAgICAvLyBDVFJMICsgbnVtYmVyIC8gdW5pdmVyc2FsQXJndW1lbnQgZm9yIHNldHRpbmcgZGF0YS5jb3VudFxuICAgIGlmIChtb2RpZmllciA9PSBcImMtXCIgfHwgZGF0YS5jb3VudCkge1xuICAgICAgICB2YXIgY291bnQgPSBwYXJzZUludChrZXlba2V5Lmxlbmd0aCAtIDFdKTtcbiAgICAgICAgaWYgKHR5cGVvZiBjb3VudCA9PT0gJ251bWJlcicgJiYgIWlzTmFOKGNvdW50KSkge1xuICAgICAgICAgICAgZGF0YS5jb3VudCA9IE1hdGgubWF4KGRhdGEuY291bnQsIDApIHx8IDA7XG4gICAgICAgICAgICBkYXRhLmNvdW50ID0gMTAgKiBkYXRhLmNvdW50ICsgY291bnQ7XG4gICAgICAgICAgICByZXR1cm4ge2NvbW1hbmQ6IFwibnVsbFwifTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHRoaXMuY29tbWFuZEtleUJpbmRpbmcgbWFwcyBrZXkgc3BlY3MgbGlrZSBcImMtcFwiIChmb3IgQ1RSTCArIFApIHRvXG4gICAgLy8gY29tbWFuZCBvYmplY3RzLCBmb3IgbG9va3VwIGtleSBuZWVkcyB0byBpbmNsdWRlIHRoZSBtb2RpZmllclxuICAgIGlmIChtb2RpZmllcikga2V5ID0gbW9kaWZpZXIgKyBrZXk7XG5cbiAgICAvLyBLZXkgY29tYm9zIGxpa2UgQ1RSTCtYIEggYnVpbGQgdXAgdGhlIGRhdGEua2V5Q2hhaW5cbiAgICBpZiAoZGF0YS5rZXlDaGFpbikga2V5ID0gZGF0YS5rZXlDaGFpbiArPSBcIiBcIiArIGtleTtcblxuICAgIC8vIEtleSBjb21ibyBwcmVmaXhlcyBnZXQgc3RvcmVkIGFzIFwibnVsbFwiIChTdHJpbmchKSBpbiB0aGlzXG4gICAgLy8gdGhpcy5jb21tYW5kS2V5QmluZGluZy4gV2hlbiBlbmNvdW50ZXJlZCBubyBjb21tYW5kIGlzIGludm9rZWQgYnV0IHdlXG4gICAgLy8gYnVsZCB1cCBkYXRhLmtleUNoYWluXG4gICAgdmFyIGNvbW1hbmQgPSB0aGlzLmNvbW1hbmRLZXlCaW5kaW5nW2tleV07XG4gICAgZGF0YS5rZXlDaGFpbiA9IGNvbW1hbmQgPT0gXCJudWxsXCIgPyBrZXkgOiBcIlwiO1xuXG4gICAgLy8gdGhlcmUgcmVhbGx5IGlzIG5vIGNvbW1hbmRcbiAgICBpZiAoIWNvbW1hbmQpIHJldHVybiB1bmRlZmluZWQ7XG5cbiAgICAvLyB3ZSBwYXNzIGIvYyBvZiBrZXkgY29tYm8gb3IgdW5pdmVyc2FsQXJndW1lbnRcbiAgICBpZiAoY29tbWFuZCA9PT0gXCJudWxsXCIpIHJldHVybiB7Y29tbWFuZDogXCJudWxsXCJ9O1xuXG4gICAgaWYgKGNvbW1hbmQgPT09IFwidW5pdmVyc2FsQXJndW1lbnRcIikge1xuICAgICAgICAvLyBpZiBubyBudW1iZXIgcHJlc3NlZCBlbWFjcyByZXBlYXRzIGFjdGlvbiA0IHRpbWVzLlxuICAgICAgICAvLyBtaW51cyBzaWduIGlzIG5lZWRlZCB0byBhbGxvdyBuZXh0IGtleXByZXNzIHRvIHJlcGxhY2UgaXRcbiAgICAgICAgZGF0YS5jb3VudCA9IC00O1xuICAgICAgICByZXR1cm4ge2NvbW1hbmQ6IFwibnVsbFwifTtcbiAgICB9XG5cbiAgICAvLyBsb29rdXAgY29tbWFuZFxuICAgIC8vIFRPRE8gZXh0cmFjdCBzcGVjaWFsIGhhbmRsaW5nIG9mIG1hcmttb2RlXG4gICAgLy8gVE9ETyBzcGVjaWFsIGNhc2UgY29tbWFuZC5jb21tYW5kIGlzIHJlYWxseSB1bm5lY2Vzc2FyeSwgcmVtb3ZlXG4gICAgdmFyIGFyZ3M7XG4gICAgaWYgKHR5cGVvZiBjb21tYW5kICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIGFyZ3MgPSBjb21tYW5kLmFyZ3M7XG4gICAgICAgIGlmIChjb21tYW5kLmNvbW1hbmQpIGNvbW1hbmQgPSBjb21tYW5kLmNvbW1hbmQ7XG4gICAgICAgIGlmIChjb21tYW5kID09PSBcImdvb3JzZWxlY3RcIikge1xuICAgICAgICAgICAgY29tbWFuZCA9IGVkaXRvci5lbWFjc01hcmsoKSA/IGFyZ3NbMV0gOiBhcmdzWzBdO1xuICAgICAgICAgICAgYXJncyA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGNvbW1hbmQgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgaWYgKGNvbW1hbmQgPT09IFwiaW5zZXJ0c3RyaW5nXCIgfHxcbiAgICAgICAgICAgIGNvbW1hbmQgPT09IFwic3BsaXRsaW5lXCIgfHxcbiAgICAgICAgICAgIGNvbW1hbmQgPT09IFwidG9nZ2xlY29tbWVudFwiKSB7XG4gICAgICAgICAgICBlZGl0b3IucHVzaEVtYWNzTWFyaygpO1xuICAgICAgICB9XG4gICAgICAgIGNvbW1hbmQgPSB0aGlzLmNvbW1hbmRzW2NvbW1hbmRdIHx8IGVkaXRvci5jb21tYW5kcy5jb21tYW5kc1tjb21tYW5kXTtcbiAgICAgICAgaWYgKCFjb21tYW5kKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGlmICghY29tbWFuZC5yZWFkT25seSAmJiAhY29tbWFuZC5pc1lhbmspXG4gICAgICAgIGRhdGEubGFzdENvbW1hbmQgPSBudWxsO1xuXG4gICAgaWYgKCFjb21tYW5kLnJlYWRPbmx5ICYmIGVkaXRvci5lbWFjc01hcmsoKSlcbiAgICAgICAgZWRpdG9yLnNldEVtYWNzTWFyayhudWxsKTtcbiAgICAgICAgXG4gICAgaWYgKGRhdGEuY291bnQpIHtcbiAgICAgICAgdmFyIGNvdW50ID0gZGF0YS5jb3VudDtcbiAgICAgICAgZGF0YS5jb3VudCA9IDA7XG4gICAgICAgIGlmICghY29tbWFuZCB8fCAhY29tbWFuZC5oYW5kbGVzQ291bnQpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgYXJnczogYXJncyxcbiAgICAgICAgICAgICAgICBjb21tYW5kOiB7XG4gICAgICAgICAgICAgICAgICAgIGV4ZWM6IGZ1bmN0aW9uKGVkaXRvciwgYXJncykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudDsgaSsrKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1hbmQuZXhlYyhlZGl0b3IsIGFyZ3MpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBtdWx0aVNlbGVjdEFjdGlvbjogY29tbWFuZC5tdWx0aVNlbGVjdEFjdGlvblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIWFyZ3MpIGFyZ3MgPSB7fTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgYXJncyA9PT0gJ29iamVjdCcpIGFyZ3MuY291bnQgPSBjb3VudDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7Y29tbWFuZDogY29tbWFuZCwgYXJnczogYXJnc307XG59O1xuXG5leHBvcnRzLmVtYWNzS2V5cyA9IHtcbiAgICAvLyBtb3ZlbWVudFxuICAgIFwiVXB8Qy1wXCIgICAgICA6IHtjb21tYW5kOiBcImdvb3JzZWxlY3RcIiwgYXJnczogW1wiZ29saW5ldXBcIixcInNlbGVjdHVwXCJdfSxcbiAgICBcIkRvd258Qy1uXCIgICAgOiB7Y29tbWFuZDogXCJnb29yc2VsZWN0XCIsIGFyZ3M6IFtcImdvbGluZWRvd25cIixcInNlbGVjdGRvd25cIl19LFxuICAgIFwiTGVmdHxDLWJcIiAgICA6IHtjb21tYW5kOiBcImdvb3JzZWxlY3RcIiwgYXJnczogW1wiZ290b2xlZnRcIixcInNlbGVjdGxlZnRcIl19LFxuICAgIFwiUmlnaHR8Qy1mXCIgICA6IHtjb21tYW5kOiBcImdvb3JzZWxlY3RcIiwgYXJnczogW1wiZ290b3JpZ2h0XCIsXCJzZWxlY3RyaWdodFwiXX0sXG4gICAgXCJDLUxlZnR8TS1iXCIgIDoge2NvbW1hbmQ6IFwiZ29vcnNlbGVjdFwiLCBhcmdzOiBbXCJnb3Rvd29yZGxlZnRcIixcInNlbGVjdHdvcmRsZWZ0XCJdfSxcbiAgICBcIkMtUmlnaHR8TS1mXCIgOiB7Y29tbWFuZDogXCJnb29yc2VsZWN0XCIsIGFyZ3M6IFtcImdvdG93b3JkcmlnaHRcIixcInNlbGVjdHdvcmRyaWdodFwiXX0sXG4gICAgXCJIb21lfEMtYVwiICAgIDoge2NvbW1hbmQ6IFwiZ29vcnNlbGVjdFwiLCBhcmdzOiBbXCJnb3RvbGluZXN0YXJ0XCIsXCJzZWxlY3R0b2xpbmVzdGFydFwiXX0sXG4gICAgXCJFbmR8Qy1lXCIgICAgIDoge2NvbW1hbmQ6IFwiZ29vcnNlbGVjdFwiLCBhcmdzOiBbXCJnb3RvbGluZWVuZFwiLFwic2VsZWN0dG9saW5lZW5kXCJdfSxcbiAgICBcIkMtSG9tZXxTLU0tLFwiOiB7Y29tbWFuZDogXCJnb29yc2VsZWN0XCIsIGFyZ3M6IFtcImdvdG9zdGFydFwiLFwic2VsZWN0dG9zdGFydFwiXX0sXG4gICAgXCJDLUVuZHxTLU0tLlwiIDoge2NvbW1hbmQ6IFwiZ29vcnNlbGVjdFwiLCBhcmdzOiBbXCJnb3RvZW5kXCIsXCJzZWxlY3R0b2VuZFwiXX0sXG5cbiAgICAvLyBzZWxlY3Rpb25cbiAgICBcIlMtVXB8Uy1DLXBcIiAgICAgIDogXCJzZWxlY3R1cFwiLFxuICAgIFwiUy1Eb3dufFMtQy1uXCIgICAgOiBcInNlbGVjdGRvd25cIixcbiAgICBcIlMtTGVmdHxTLUMtYlwiICAgIDogXCJzZWxlY3RsZWZ0XCIsXG4gICAgXCJTLVJpZ2h0fFMtQy1mXCIgICA6IFwic2VsZWN0cmlnaHRcIixcbiAgICBcIlMtQy1MZWZ0fFMtTS1iXCIgIDogXCJzZWxlY3R3b3JkbGVmdFwiLFxuICAgIFwiUy1DLVJpZ2h0fFMtTS1mXCIgOiBcInNlbGVjdHdvcmRyaWdodFwiLFxuICAgIFwiUy1Ib21lfFMtQy1hXCIgICAgOiBcInNlbGVjdHRvbGluZXN0YXJ0XCIsXG4gICAgXCJTLUVuZHxTLUMtZVwiICAgICA6IFwic2VsZWN0dG9saW5lZW5kXCIsXG4gICAgXCJTLUMtSG9tZVwiICAgICAgICA6IFwic2VsZWN0dG9zdGFydFwiLFxuICAgIFwiUy1DLUVuZFwiICAgICAgICAgOiBcInNlbGVjdHRvZW5kXCIsXG5cbiAgICBcIkMtbFwiIDogXCJyZWNlbnRlclRvcEJvdHRvbVwiLFxuICAgIFwiTS1zXCIgOiBcImNlbnRlcnNlbGVjdGlvblwiLFxuICAgIFwiTS1nXCI6IFwiZ290b2xpbmVcIixcbiAgICBcIkMteCBDLXBcIjogXCJzZWxlY3RhbGxcIixcblxuICAgIC8vIHRvZG8gZml4IHRoZXNlXG4gICAgXCJDLURvd25cIjoge2NvbW1hbmQ6IFwiZ29vcnNlbGVjdFwiLCBhcmdzOiBbXCJnb3RvcGFnZWRvd25cIixcInNlbGVjdHBhZ2Vkb3duXCJdfSxcbiAgICBcIkMtVXBcIjoge2NvbW1hbmQ6IFwiZ29vcnNlbGVjdFwiLCBhcmdzOiBbXCJnb3RvcGFnZXVwXCIsXCJzZWxlY3RwYWdldXBcIl19LFxuICAgIFwiUGFnZURvd258Qy12XCI6IHtjb21tYW5kOiBcImdvb3JzZWxlY3RcIiwgYXJnczogW1wiZ290b3BhZ2Vkb3duXCIsXCJzZWxlY3RwYWdlZG93blwiXX0sXG4gICAgXCJQYWdlVXB8TS12XCI6IHtjb21tYW5kOiBcImdvb3JzZWxlY3RcIiwgYXJnczogW1wiZ290b3BhZ2V1cFwiLFwic2VsZWN0cGFnZXVwXCJdfSxcbiAgICBcIlMtQy1Eb3duXCI6IFwic2VsZWN0cGFnZWRvd25cIixcbiAgICBcIlMtQy1VcFwiOiBcInNlbGVjdHBhZ2V1cFwiLFxuXG4gICAgXCJDLXNcIjogXCJpU2VhcmNoXCIsXG4gICAgXCJDLXJcIjogXCJpU2VhcmNoQmFja3dhcmRzXCIsXG5cbiAgICBcIk0tQy1zXCI6IFwiZmluZG5leHRcIixcbiAgICBcIk0tQy1yXCI6IFwiZmluZHByZXZpb3VzXCIsXG4gICAgXCJTLU0tNVwiOiBcInJlcGxhY2VcIixcblxuICAgIC8vIGJhc2ljIGVkaXRpbmdcbiAgICBcIkJhY2tzcGFjZVwiOiBcImJhY2tzcGFjZVwiLFxuICAgIFwiRGVsZXRlfEMtZFwiOiBcImRlbFwiLFxuICAgIFwiUmV0dXJufEMtbVwiOiB7Y29tbWFuZDogXCJpbnNlcnRzdHJpbmdcIiwgYXJnczogXCJcXG5cIn0sIC8vIFwibmV3bGluZVwiXG4gICAgXCJDLW9cIjogXCJzcGxpdGxpbmVcIixcblxuICAgIFwiTS1kfEMtRGVsZXRlXCI6IHtjb21tYW5kOiBcImtpbGxXb3JkXCIsIGFyZ3M6IFwicmlnaHRcIn0sXG4gICAgXCJDLUJhY2tzcGFjZXxNLUJhY2tzcGFjZXxNLURlbGV0ZVwiOiB7Y29tbWFuZDogXCJraWxsV29yZFwiLCBhcmdzOiBcImxlZnRcIn0sXG4gICAgXCJDLWtcIjogXCJraWxsTGluZVwiLFxuXG4gICAgXCJDLXl8Uy1EZWxldGVcIjogXCJ5YW5rXCIsXG4gICAgXCJNLXlcIjogXCJ5YW5rUm90YXRlXCIsXG4gICAgXCJDLWdcIjogXCJrZXlib2FyZFF1aXRcIixcblxuICAgIFwiQy13fEMtUy1XXCI6IFwia2lsbFJlZ2lvblwiLFxuICAgIFwiTS13XCI6IFwia2lsbFJpbmdTYXZlXCIsXG4gICAgXCJDLVNwYWNlXCI6IFwic2V0TWFya1wiLFxuICAgIFwiQy14IEMteFwiOiBcImV4Y2hhbmdlUG9pbnRBbmRNYXJrXCIsXG5cbiAgICBcIkMtdFwiOiBcInRyYW5zcG9zZWxldHRlcnNcIixcbiAgICBcIk0tdVwiOiBcInRvdXBwZXJjYXNlXCIsICAgIC8vIERvZXNuJ3Qgd29ya1xuICAgIFwiTS1sXCI6IFwidG9sb3dlcmNhc2VcIixcbiAgICBcIk0tL1wiOiBcImF1dG9jb21wbGV0ZVwiLCAgIC8vIERvZXNuJ3Qgd29ya1xuICAgIFwiQy11XCI6IFwidW5pdmVyc2FsQXJndW1lbnRcIixcblxuICAgIFwiTS07XCI6IFwidG9nZ2xlY29tbWVudFwiLFxuXG4gICAgXCJDLS98Qy14IHV8Uy1DLS18Qy16XCI6IFwidW5kb1wiLFxuICAgIFwiUy1DLS98Uy1DLXggdXxDLS18Uy1DLXpcIjogXCJyZWRvXCIsIC8vIGluZmluaXRlIHVuZG8/XG4gICAgLy8gdmVydGljYWwgZWRpdGluZ1xuICAgIFwiQy14IHJcIjogIFwic2VsZWN0UmVjdGFuZ3VsYXJSZWdpb25cIixcbiAgICBcIk0teFwiOiB7Y29tbWFuZDogXCJmb2N1c0NvbW1hbmRMaW5lXCIsIGFyZ3M6IFwiTS14IFwifVxuICAgIC8vIHRvZG9cbiAgICAvLyBcIkMteCBDLXRcIiBcIk0tdFwiIFwiTS1jXCIgXCJGMTFcIiBcIkMtTS0gXCJNLXFcIlxufTtcblxuXG5leHBvcnRzLmhhbmRsZXIuYmluZEtleXMoZXhwb3J0cy5lbWFjc0tleXMpO1xuXG5leHBvcnRzLmhhbmRsZXIuYWRkQ29tbWFuZHMoe1xuICAgIHJlY2VudGVyVG9wQm90dG9tOiBmdW5jdGlvbihlZGl0b3IpIHtcbiAgICAgICAgdmFyIHJlbmRlcmVyID0gZWRpdG9yLnJlbmRlcmVyO1xuICAgICAgICB2YXIgcG9zID0gcmVuZGVyZXIuJGN1cnNvckxheWVyLmdldFBpeGVsUG9zaXRpb24oKTtcbiAgICAgICAgdmFyIGggPSByZW5kZXJlci4kc2l6ZS5zY3JvbGxlckhlaWdodCAtIHJlbmRlcmVyLmxpbmVIZWlnaHQ7XG4gICAgICAgIHZhciBzY3JvbGxUb3AgPSByZW5kZXJlci5zY3JvbGxUb3A7XG4gICAgICAgIGlmIChNYXRoLmFicyhwb3MudG9wIC0gc2Nyb2xsVG9wKSA8IDIpIHtcbiAgICAgICAgICAgIHNjcm9sbFRvcCA9IHBvcy50b3AgLSBoO1xuICAgICAgICB9IGVsc2UgaWYgKE1hdGguYWJzKHBvcy50b3AgLSBzY3JvbGxUb3AgLSBoICogMC41KSA8IDIpIHtcbiAgICAgICAgICAgIHNjcm9sbFRvcCA9IHBvcy50b3A7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzY3JvbGxUb3AgPSBwb3MudG9wIC0gaCAqIDAuNTtcbiAgICAgICAgfVxuICAgICAgICBlZGl0b3Iuc2Vzc2lvbi5zZXRTY3JvbGxUb3Aoc2Nyb2xsVG9wKTtcbiAgICB9LFxuICAgIHNlbGVjdFJlY3Rhbmd1bGFyUmVnaW9uOiAgZnVuY3Rpb24oZWRpdG9yKSB7XG4gICAgICAgIGVkaXRvci5tdWx0aVNlbGVjdC50b2dnbGVCbG9ja1NlbGVjdGlvbigpO1xuICAgIH0sXG4gICAgc2V0TWFyazogIHtcbiAgICAgICAgZXhlYzogZnVuY3Rpb24oZWRpdG9yLCBhcmdzKSB7XG4gICAgICAgICAgICAvLyBTZXRzIG1hcmstbW9kZSBhbmQgY2xlYXJzIGN1cnJlbnQgc2VsZWN0aW9uLlxuICAgICAgICAgICAgLy8gV2hlbiBtYXJrIGlzIHNldCwga2V5Ym9hcmQgY3Vyc29yIG1vdmVtZW50IGNvbW1hbmRzIGJlY29tZVxuICAgICAgICAgICAgLy8gc2VsZWN0aW9uIG1vZGlmaWNhdGlvbiBjb21tYW5kcy4gVGhhdCBpcyxcbiAgICAgICAgICAgIC8vIFwiZ290b1wiIGNvbW1hbmRzIGJlY29tZSBcInNlbGVjdFwiIGNvbW1hbmRzLlxuICAgICAgICAgICAgLy8gQW55IGluc2VydGlvbiBvciBtb3VzZSBjbGljayByZXNldHMgbWFyay1tb2RlLlxuICAgICAgICAgICAgLy8gc2V0TWFyayB0d2ljZSBpbiBhIHJvdyBhdCB0aGUgc2FtZSBwbGFjZSByZXNldHMgbWFya21vZGUuXG4gICAgICAgICAgICAvLyBpbiBtdWx0aSBzZWxlY3QgbW9kZSwgZWEgc2VsZWN0aW9uIGlzIGhhbmRsZWQgaW5kaXZpZHVhbGx5XG5cbiAgICAgICAgICAgIGlmIChhcmdzICYmIGFyZ3MuY291bnQpIHtcbiAgICAgICAgICAgICAgICBpZiAoZWRpdG9yLmluTXVsdGlTZWxlY3RNb2RlKSBlZGl0b3IuZm9yRWFjaFNlbGVjdGlvbihtb3ZlVG9NYXJrKTtcbiAgICAgICAgICAgICAgICBlbHNlIG1vdmVUb01hcmsoKTtcbiAgICAgICAgICAgICAgICBtb3ZlVG9NYXJrKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgbWFyayA9IGVkaXRvci5lbWFjc01hcmsoKSxcbiAgICAgICAgICAgICAgICByYW5nZXMgPSBlZGl0b3Iuc2VsZWN0aW9uLmdldEFsbFJhbmdlcygpLFxuICAgICAgICAgICAgICAgIHJhbmdlUG9zaXRpb25zID0gcmFuZ2VzLm1hcChmdW5jdGlvbihyKSB7IHJldHVybiB7cm93OiByLnN0YXJ0LnJvdywgY29sdW1uOiByLnN0YXJ0LmNvbHVtbn07IH0pLFxuICAgICAgICAgICAgICAgIHRyYW5zaWVudE1hcmtNb2RlQWN0aXZlID0gdHJ1ZSxcbiAgICAgICAgICAgICAgICBoYXNOb1NlbGVjdGlvbiA9IHJhbmdlcy5ldmVyeShmdW5jdGlvbihyYW5nZSkgeyByZXR1cm4gcmFuZ2UuaXNFbXB0eSgpOyB9KTtcbiAgICAgICAgICAgIC8vIGlmIHRyYW5zaWVudE1hcmtNb2RlQWN0aXZlIHRoZW4gbWFyayBiZWhhdmlvciBpcyBhIGxpdHRsZVxuICAgICAgICAgICAgLy8gZGlmZmVyZW50LiBEZWFjdGl2YXRlIHRoZSBtYXJrIHdoZW4gc2V0TWFyayBpcyBydW4gd2l0aCBhY3RpdmVcbiAgICAgICAgICAgIC8vIG1hcmtcbiAgICAgICAgICAgIGlmICh0cmFuc2llbnRNYXJrTW9kZUFjdGl2ZSAmJiAobWFyayB8fCAhaGFzTm9TZWxlY3Rpb24pKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVkaXRvci5pbk11bHRpU2VsZWN0TW9kZSkgZWRpdG9yLmZvckVhY2hTZWxlY3Rpb24oe2V4ZWM6IGVkaXRvci5jbGVhclNlbGVjdGlvbi5iaW5kKGVkaXRvcil9KTtcbiAgICAgICAgICAgICAgICBlbHNlIGVkaXRvci5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICAgICAgICAgIGlmIChtYXJrKSBlZGl0b3IucHVzaEVtYWNzTWFyayhudWxsKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghbWFyaykge1xuICAgICAgICAgICAgICAgIHJhbmdlUG9zaXRpb25zLmZvckVhY2goZnVuY3Rpb24ocG9zKSB7IGVkaXRvci5wdXNoRW1hY3NNYXJrKHBvcyk7IH0pO1xuICAgICAgICAgICAgICAgIGVkaXRvci5zZXRFbWFjc01hcmsocmFuZ2VQb3NpdGlvbnNbcmFuZ2VQb3NpdGlvbnMubGVuZ3RoLTFdKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIC09LT0tPS09LT0tPS09LT0tPS09LT0tPS09LT0tPS09LT0tPS09LT0tPS09LT0tPS09LT0tPS1cblxuICAgICAgICAgICAgZnVuY3Rpb24gbW92ZVRvTWFyaygpIHtcbiAgICAgICAgICAgICAgICB2YXIgbWFyayA9IGVkaXRvci5wb3BFbWFjc01hcmsoKTtcbiAgICAgICAgICAgICAgICBtYXJrICYmIGVkaXRvci5tb3ZlQ3Vyc29yVG9Qb3NpdGlvbihtYXJrKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuICAgICAgICByZWFkT25seTogdHJ1ZSxcbiAgICAgICAgaGFuZGxlc0NvdW50OiB0cnVlXG4gICAgfSxcbiAgICBleGNoYW5nZVBvaW50QW5kTWFyazoge1xuICAgICAgICBleGVjOiBmdW5jdGlvbiBleGNoYW5nZVBvaW50QW5kTWFyayRleGVjKGVkaXRvciwgYXJncykge1xuICAgICAgICAgICAgdmFyIHNlbCA9IGVkaXRvci5zZWxlY3Rpb247XG4gICAgICAgICAgICBpZiAoIWFyZ3MuY291bnQgJiYgIXNlbC5pc0VtcHR5KCkpIHsgLy8ganVzdCBpbnZlcnQgc2VsZWN0aW9uXG4gICAgICAgICAgICAgICAgc2VsLnNldFNlbGVjdGlvblJhbmdlKHNlbC5nZXRSYW5nZSgpLCAhc2VsLmlzQmFja3dhcmRzKCkpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGFyZ3MuY291bnQpIHsgLy8gcmVwbGFjZSBtYXJrIGFuZCBwb2ludFxuICAgICAgICAgICAgICAgIHZhciBwb3MgPSB7cm93OiBzZWwubGVhZC5yb3csIGNvbHVtbjogc2VsLmxlYWQuY29sdW1ufTtcbiAgICAgICAgICAgICAgICBzZWwuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgICAgICAgICBzZWwubW92ZUN1cnNvclRvUG9zaXRpb24oZWRpdG9yLmVtYWNzTWFya0ZvclNlbGVjdGlvbihwb3MpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7IC8vIGNyZWF0ZSBzZWxlY3Rpb24gdG8gbGFzdCBtYXJrXG4gICAgICAgICAgICAgICAgc2VsLnNlbGVjdFRvUG9zaXRpb24oZWRpdG9yLmVtYWNzTWFya0ZvclNlbGVjdGlvbigpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcmVhZE9ubHk6IHRydWUsXG4gICAgICAgIGhhbmRsZXNDb3VudDogdHJ1ZSxcbiAgICAgICAgbXVsdGlTZWxlY3RBY3Rpb246IFwiZm9yRWFjaFwiXG4gICAgfSxcbiAgICBraWxsV29yZDoge1xuICAgICAgICBleGVjOiBmdW5jdGlvbihlZGl0b3IsIGRpcikge1xuICAgICAgICAgICAgZWRpdG9yLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgICAgICBpZiAoZGlyID09IFwibGVmdFwiKVxuICAgICAgICAgICAgICAgIGVkaXRvci5zZWxlY3Rpb24uc2VsZWN0V29yZExlZnQoKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICBlZGl0b3Iuc2VsZWN0aW9uLnNlbGVjdFdvcmRSaWdodCgpO1xuXG4gICAgICAgICAgICB2YXIgcmFuZ2UgPSBlZGl0b3IuZ2V0U2VsZWN0aW9uUmFuZ2UoKTtcbiAgICAgICAgICAgIHZhciB0ZXh0ID0gZWRpdG9yLnNlc3Npb24uZ2V0VGV4dFJhbmdlKHJhbmdlKTtcbiAgICAgICAgICAgIGV4cG9ydHMua2lsbFJpbmcuYWRkKHRleHQpO1xuXG4gICAgICAgICAgICBlZGl0b3Iuc2Vzc2lvbi5yZW1vdmUocmFuZ2UpO1xuICAgICAgICAgICAgZWRpdG9yLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgIH0sXG4gICAgICAgIG11bHRpU2VsZWN0QWN0aW9uOiBcImZvckVhY2hcIlxuICAgIH0sXG4gICAga2lsbExpbmU6IGZ1bmN0aW9uKGVkaXRvcikge1xuICAgICAgICBlZGl0b3IucHVzaEVtYWNzTWFyayhudWxsKTtcbiAgICAgICAgLy8gZG9uJ3QgZGVsZXRlIHRoZSBzZWxlY3Rpb24gaWYgaXQncyBiZWZvcmUgdGhlIGN1cnNvclxuICAgICAgICBlZGl0b3IuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgdmFyIHJhbmdlID0gZWRpdG9yLmdldFNlbGVjdGlvblJhbmdlKCk7XG4gICAgICAgIHZhciBsaW5lID0gZWRpdG9yLnNlc3Npb24uZ2V0TGluZShyYW5nZS5zdGFydC5yb3cpO1xuICAgICAgICByYW5nZS5lbmQuY29sdW1uID0gbGluZS5sZW5ndGg7XG4gICAgICAgIGxpbmUgPSBsaW5lLnN1YnN0cihyYW5nZS5zdGFydC5jb2x1bW4pO1xuICAgICAgICBcbiAgICAgICAgdmFyIGZvbGRMaW5lID0gZWRpdG9yLnNlc3Npb24uZ2V0Rm9sZExpbmUocmFuZ2Uuc3RhcnQucm93KTtcbiAgICAgICAgaWYgKGZvbGRMaW5lICYmIHJhbmdlLmVuZC5yb3cgIT0gZm9sZExpbmUuZW5kLnJvdykge1xuICAgICAgICAgICAgcmFuZ2UuZW5kLnJvdyA9IGZvbGRMaW5lLmVuZC5yb3c7XG4gICAgICAgICAgICBsaW5lID0gXCJ4XCI7XG4gICAgICAgIH1cbiAgICAgICAgLy8gcmVtb3ZlIEVPTCBpZiBvbmx5IHdoaXRlc3BhY2UgcmVtYWlucyBhZnRlciB0aGUgY3Vyc29yXG4gICAgICAgIGlmICgvXlxccyokLy50ZXN0KGxpbmUpKSB7XG4gICAgICAgICAgICByYW5nZS5lbmQucm93Kys7XG4gICAgICAgICAgICBsaW5lID0gZWRpdG9yLnNlc3Npb24uZ2V0TGluZShyYW5nZS5lbmQucm93KTtcbiAgICAgICAgICAgIHJhbmdlLmVuZC5jb2x1bW4gPSAvXlxccyokLy50ZXN0KGxpbmUpID8gbGluZS5sZW5ndGggOiAwO1xuICAgICAgICB9XG4gICAgICAgIHZhciB0ZXh0ID0gZWRpdG9yLnNlc3Npb24uZ2V0VGV4dFJhbmdlKHJhbmdlKTtcbiAgICAgICAgaWYgKGVkaXRvci5wcmV2T3AuY29tbWFuZCA9PSB0aGlzKVxuICAgICAgICAgICAgZXhwb3J0cy5raWxsUmluZy5hcHBlbmQodGV4dCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGV4cG9ydHMua2lsbFJpbmcuYWRkKHRleHQpO1xuXG4gICAgICAgIGVkaXRvci5zZXNzaW9uLnJlbW92ZShyYW5nZSk7XG4gICAgICAgIGVkaXRvci5jbGVhclNlbGVjdGlvbigpO1xuICAgIH0sXG4gICAgeWFuazogZnVuY3Rpb24oZWRpdG9yKSB7XG4gICAgICAgIGVkaXRvci5vblBhc3RlKGV4cG9ydHMua2lsbFJpbmcuZ2V0KCkgfHwgJycpO1xuICAgICAgICBlZGl0b3Iua2V5QmluZGluZy4kZGF0YS5sYXN0Q29tbWFuZCA9IFwieWFua1wiO1xuICAgIH0sXG4gICAgeWFua1JvdGF0ZTogZnVuY3Rpb24oZWRpdG9yKSB7XG4gICAgICAgIGlmIChlZGl0b3Iua2V5QmluZGluZy4kZGF0YS5sYXN0Q29tbWFuZCAhPSBcInlhbmtcIilcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgZWRpdG9yLnVuZG8oKTtcbiAgICAgICAgZWRpdG9yLnNlc3Npb24uJGVtYWNzTWFya1JpbmcucG9wKCk7IC8vIGFsc28gdW5kbyByZWNvcmRpbmcgbWFya1xuICAgICAgICBlZGl0b3Iub25QYXN0ZShleHBvcnRzLmtpbGxSaW5nLnJvdGF0ZSgpKTtcbiAgICAgICAgZWRpdG9yLmtleUJpbmRpbmcuJGRhdGEubGFzdENvbW1hbmQgPSBcInlhbmtcIjtcbiAgICB9LFxuICAgIGtpbGxSZWdpb246IHtcbiAgICAgICAgZXhlYzogZnVuY3Rpb24oZWRpdG9yKSB7XG4gICAgICAgICAgICBleHBvcnRzLmtpbGxSaW5nLmFkZChlZGl0b3IuZ2V0Q29weVRleHQoKSk7XG4gICAgICAgICAgICBlZGl0b3IuY29tbWFuZHMuYnlOYW1lLmN1dC5leGVjKGVkaXRvcik7XG4gICAgICAgICAgICBlZGl0b3Iuc2V0RW1hY3NNYXJrKG51bGwpO1xuICAgICAgICB9LFxuICAgICAgICByZWFkT25seTogdHJ1ZSxcbiAgICAgICAgbXVsdGlTZWxlY3RBY3Rpb246IFwiZm9yRWFjaFwiXG4gICAgfSxcbiAgICBraWxsUmluZ1NhdmU6IHtcbiAgICAgICAgZXhlYzogZnVuY3Rpb24oZWRpdG9yKSB7XG4gICAgICAgICAgICAvLyBjb3B5IHRleHQgYW5kIGRlc2VsZWN0LiB3aWxsIHNhdmUgbWFya3MgZm9yIHN0YXJ0cyBvZiB0aGVcbiAgICAgICAgICAgIC8vIHNlbGVjdGlvbihzKVxuXG4gICAgICAgICAgICBlZGl0b3IuJGhhbmRsZXNFbWFjc09uQ29weSA9IHRydWU7XG4gICAgICAgICAgICB2YXIgbWFya3MgPSBlZGl0b3Iuc2Vzc2lvbi4kZW1hY3NNYXJrUmluZy5zbGljZSgpLFxuICAgICAgICAgICAgICAgIGRlc2VsZWN0ZWRNYXJrcyA9IFtdO1xuICAgICAgICAgICAgZXhwb3J0cy5raWxsUmluZy5hZGQoZWRpdG9yLmdldENvcHlUZXh0KCkpO1xuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGRlc2VsZWN0KCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2VsID0gZWRpdG9yLnNlbGVjdGlvbiwgcmFuZ2UgPSBzZWwuZ2V0UmFuZ2UoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvcyA9IHNlbC5pc0JhY2t3YXJkcygpID8gcmFuZ2UuZW5kIDogcmFuZ2Uuc3RhcnQ7XG4gICAgICAgICAgICAgICAgICAgIGRlc2VsZWN0ZWRNYXJrcy5wdXNoKHtyb3c6IHBvcy5yb3csIGNvbHVtbjogcG9zLmNvbHVtbn0pO1xuICAgICAgICAgICAgICAgICAgICBzZWwuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWRpdG9yLiRoYW5kbGVzRW1hY3NPbkNvcHkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAoZWRpdG9yLmluTXVsdGlTZWxlY3RNb2RlKSBlZGl0b3IuZm9yRWFjaFNlbGVjdGlvbih7ZXhlYzogZGVzZWxlY3R9KTtcbiAgICAgICAgICAgICAgICBlbHNlIGRlc2VsZWN0KCk7XG4gICAgICAgICAgICAgICAgZWRpdG9yLnNldEVtYWNzTWFyayhudWxsKTtcbiAgICAgICAgICAgICAgICBlZGl0b3Iuc2Vzc2lvbi4kZW1hY3NNYXJrUmluZyA9IG1hcmtzLmNvbmNhdChkZXNlbGVjdGVkTWFya3MucmV2ZXJzZSgpKTtcbiAgICAgICAgICAgIH0sIDApO1xuICAgICAgICB9LFxuICAgICAgICByZWFkT25seTogdHJ1ZVxuICAgIH0sXG4gICAga2V5Ym9hcmRRdWl0OiBmdW5jdGlvbihlZGl0b3IpIHtcbiAgICAgICAgZWRpdG9yLnNlbGVjdGlvbi5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICBlZGl0b3Iuc2V0RW1hY3NNYXJrKG51bGwpO1xuICAgICAgICBlZGl0b3Iua2V5QmluZGluZy4kZGF0YS5jb3VudCA9IG51bGw7XG4gICAgfSxcbiAgICBmb2N1c0NvbW1hbmRMaW5lOiBmdW5jdGlvbihlZGl0b3IsIGFyZykge1xuICAgICAgICBpZiAoZWRpdG9yLnNob3dDb21tYW5kTGluZSlcbiAgICAgICAgICAgIGVkaXRvci5zaG93Q29tbWFuZExpbmUoYXJnKTtcbiAgICB9XG59KTtcblxuZXhwb3J0cy5oYW5kbGVyLmFkZENvbW1hbmRzKGlTZWFyY2hDb21tYW5kTW9kdWxlLmlTZWFyY2hTdGFydENvbW1hbmRzKTtcblxudmFyIGNvbW1hbmRzID0gZXhwb3J0cy5oYW5kbGVyLmNvbW1hbmRzO1xuY29tbWFuZHMueWFuay5pc1lhbmsgPSB0cnVlO1xuY29tbWFuZHMueWFua1JvdGF0ZS5pc1lhbmsgPSB0cnVlO1xuXG5leHBvcnRzLmtpbGxSaW5nID0ge1xuICAgICRkYXRhOiBbXSxcbiAgICBhZGQ6IGZ1bmN0aW9uKHN0cikge1xuICAgICAgICBzdHIgJiYgdGhpcy4kZGF0YS5wdXNoKHN0cik7XG4gICAgICAgIGlmICh0aGlzLiRkYXRhLmxlbmd0aCA+IDMwKVxuICAgICAgICAgICAgdGhpcy4kZGF0YS5zaGlmdCgpO1xuICAgIH0sXG4gICAgYXBwZW5kOiBmdW5jdGlvbihzdHIpIHtcbiAgICAgICAgdmFyIGlkeCA9IHRoaXMuJGRhdGEubGVuZ3RoIC0gMTtcbiAgICAgICAgdmFyIHRleHQgPSB0aGlzLiRkYXRhW2lkeF0gfHwgXCJcIjtcbiAgICAgICAgaWYgKHN0cikgdGV4dCArPSBzdHI7XG4gICAgICAgIGlmICh0ZXh0KSB0aGlzLiRkYXRhW2lkeF0gPSB0ZXh0O1xuICAgIH0sXG4gICAgZ2V0OiBmdW5jdGlvbihuKSB7XG4gICAgICAgIG4gPSBuIHx8IDE7XG4gICAgICAgIHJldHVybiB0aGlzLiRkYXRhLnNsaWNlKHRoaXMuJGRhdGEubGVuZ3RoLW4sIHRoaXMuJGRhdGEubGVuZ3RoKS5yZXZlcnNlKCkuam9pbignXFxuJyk7XG4gICAgfSxcbiAgICBwb3A6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy4kZGF0YS5sZW5ndGggPiAxKVxuICAgICAgICAgICAgdGhpcy4kZGF0YS5wb3AoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0KCk7XG4gICAgfSxcbiAgICByb3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLiRkYXRhLnVuc2hpZnQodGhpcy4kZGF0YS5wb3AoKSk7XG4gICAgICAgIHJldHVybiB0aGlzLmdldCgpO1xuICAgIH1cbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8qKlxuICogQHR5cGVkZWYge2ltcG9ydChcIi4vZWRpdG9yXCIpLkVkaXRvcn0gRWRpdG9yXG4gKiBAdHlwZWRlZiB7aW1wb3J0KFwiLi4vYWNlLWludGVybmFsXCIpLkFjZS5Qb2ludH0gUG9pbnRcbiAqIEB0eXBlZGVmIHtpbXBvcnQoXCIuLi9hY2UtaW50ZXJuYWxcIikuQWNlLlNlYXJjaE9wdGlvbnN9IFNlYXJjaE9wdGlvbnNcbiAqL1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4vbGliL29vcFwiKTtcbnZhciBTZWFyY2ggPSByZXF1aXJlKFwiLi9zZWFyY2hcIikuU2VhcmNoO1xudmFyIEVkaXRTZXNzaW9uID0gcmVxdWlyZShcIi4vZWRpdF9zZXNzaW9uXCIpLkVkaXRTZXNzaW9uO1xudmFyIFNlYXJjaEhpZ2hsaWdodCA9IHJlcXVpcmUoXCIuL3NlYXJjaF9oaWdobGlnaHRcIikuU2VhcmNoSGlnaGxpZ2h0O1xuXG4vKipcbiAqIEZpbmRzIGFsbCBsaW5lcyBtYXRjaGluZyBhIHNlYXJjaCB0ZXJtIGluIHRoZSBjdXJyZW50IFtbRG9jdW1lbnRcbiAqIGBEb2N1bWVudGBdXSBhbmQgZGlzcGxheXMgdGhlbSBpbnN0ZWFkIG9mIHRoZSBvcmlnaW5hbCBgRG9jdW1lbnRgLiBLZWVwc1xuICogdHJhY2sgb2YgdGhlIG1hcHBpbmcgYmV0d2VlbiB0aGUgb2NjdXIgZG9jIGFuZCB0aGUgb3JpZ2luYWwgZG9jLlxuICoqL1xuY2xhc3MgT2NjdXIgZXh0ZW5kcyBTZWFyY2gge1xuXG4gICAgLyoqXG4gICAgICogRW5hYmxlcyBvY2N1ciBtb2RlLiBleHBlY3RzIHRoYXQgYG9wdGlvbnMubmVlZGxlYCBpcyBhIHNlYXJjaCB0ZXJtLlxuICAgICAqIFRoaXMgc2VhcmNoIHRlcm0gaXMgdXNlZCB0byBmaWx0ZXIgb3V0IGFsbCB0aGUgbGluZXMgdGhhdCBpbmNsdWRlIGl0XG4gICAgICogYW5kIHRoZXNlIGFyZSB0aGVuIHVzZWQgYXMgdGhlIGNvbnRlbnQgb2YgYSBuZXcgW1tEb2N1bWVudFxuICAgICAqIGBEb2N1bWVudGBdXS4gVGhlIGN1cnJlbnQgY3Vyc29yIHBvc2l0aW9uIG9mIGVkaXRvciB3aWxsIGJlIHRyYW5zbGF0ZWRcbiAgICAgKiBzbyB0aGF0IHRoZSBjdXJzb3IgaXMgb24gdGhlIG1hdGNoaW5nIHJvdy9jb2x1bW4gYXMgaXQgd2FzIGJlZm9yZS5cbiAgICAgKiBAcGFyYW0ge0VkaXRvcn0gZWRpdG9yXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgb3B0aW9ucy5uZWVkbGUgc2hvdWxkIGJlIGEgU3RyaW5nXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gV2hldGhlciBvY2N1ciBhY3RpdmF0aW9uIHdhcyBzdWNjZXNzZnVsXG4gICAgICpcbiAgICAgKiovXG4gICAgZW50ZXIoZWRpdG9yLCBvcHRpb25zKSB7XG4gICAgICAgIGlmICghb3B0aW9ucy5uZWVkbGUpIHJldHVybiBmYWxzZTtcbiAgICAgICAgdmFyIHBvcyA9IGVkaXRvci5nZXRDdXJzb3JQb3NpdGlvbigpO1xuICAgICAgICB0aGlzLmRpc3BsYXlPY2N1ckNvbnRlbnQoZWRpdG9yLCBvcHRpb25zKTtcbiAgICAgICAgdmFyIHRyYW5zbGF0ZWRQb3MgPSB0aGlzLm9yaWdpbmFsVG9PY2N1clBvc2l0aW9uKGVkaXRvci5zZXNzaW9uLCBwb3MpO1xuICAgICAgICBlZGl0b3IubW92ZUN1cnNvclRvUG9zaXRpb24odHJhbnNsYXRlZFBvcyk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERpc2FibGVzIG9jY3VyIG1vZGUuIFJlc2V0cyB0aGUgW1tTZXNzaW9ucyBgRWRpdFNlc3Npb25gXV0gW1tEb2N1bWVudFxuICAgICAqIGBEb2N1bWVudGBdXSBiYWNrIHRvIHRoZSBvcmlnaW5hbCBkb2MuIElmIG9wdGlvbnMudHJhbnNsYXRlUG9zaXRpb24gaXNcbiAgICAgKiB0cnV0aHkgYWxzbyBtYXBzIHRoZSBbW0VkaXRvcnMgYEVkaXRvcmBdXSBjdXJzb3IgcG9zaXRpb24gYWNjb3JkaW5nbHkuXG4gICAgICogQHBhcmFtIHtFZGl0b3J9IGVkaXRvclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIG9wdGlvbnMudHJhbnNsYXRlUG9zaXRpb25cbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSBXaGV0aGVyIG9jY3VyIGRlYWN0aXZhdGlvbiB3YXMgc3VjY2Vzc2Z1bFxuICAgICAqXG4gICAgICoqL1xuICAgIGV4aXQoZWRpdG9yLCBvcHRpb25zKSB7XG4gICAgICAgIHZhciBwb3MgPSBvcHRpb25zLnRyYW5zbGF0ZVBvc2l0aW9uICYmIGVkaXRvci5nZXRDdXJzb3JQb3NpdGlvbigpO1xuICAgICAgICB2YXIgdHJhbnNsYXRlZFBvcyA9IHBvcyAmJiB0aGlzLm9jY3VyVG9PcmlnaW5hbFBvc2l0aW9uKGVkaXRvci5zZXNzaW9uLCBwb3MpO1xuICAgICAgICB0aGlzLmRpc3BsYXlPcmlnaW5hbENvbnRlbnQoZWRpdG9yKTtcbiAgICAgICAgaWYgKHRyYW5zbGF0ZWRQb3MpXG4gICAgICAgICAgICBlZGl0b3IubW92ZUN1cnNvclRvUG9zaXRpb24odHJhbnNsYXRlZFBvcyk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7RWRpdFNlc3Npb259IHNlc3NcbiAgICAgKiBAcGFyYW0ge1JlZ0V4cH0gcmVnZXhwXG4gICAgICovXG4gICAgaGlnaGxpZ2h0KHNlc3MsIHJlZ2V4cCkge1xuICAgICAgICB2YXIgaGwgPSBzZXNzLiRvY2N1ckhpZ2hsaWdodCA9IHNlc3MuJG9jY3VySGlnaGxpZ2h0IHx8IHNlc3MuYWRkRHluYW1pY01hcmtlcihcbiAgICAgICAgICAgICAgICBuZXcgU2VhcmNoSGlnaGxpZ2h0KG51bGwsIFwiYWNlX29jY3VyLWhpZ2hsaWdodFwiLCBcInRleHRcIikpO1xuICAgICAgICBobC5zZXRSZWdleHAocmVnZXhwKTtcbiAgICAgICAgc2Vzcy5fZW1pdChcImNoYW5nZUJhY2tNYXJrZXJcIik7IC8vIGZvcmNlIGhpZ2hsaWdodCBsYXllciByZWRyYXdcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0VkaXRvcn0gZWRpdG9yXG4gICAgICogQHBhcmFtIHtQYXJ0aWFsPFNlYXJjaE9wdGlvbnM+fSBvcHRpb25zXG4gICAgICovXG4gICAgZGlzcGxheU9jY3VyQ29udGVudChlZGl0b3IsIG9wdGlvbnMpIHtcbiAgICAgICAgLy8gdGhpcy5zZXRTZXNzaW9uKHNlc3Npb24gfHwgbmV3IEVkaXRTZXNzaW9uKFwiXCIpKVxuICAgICAgICB0aGlzLiRvcmlnaW5hbFNlc3Npb24gPSBlZGl0b3Iuc2Vzc2lvbjtcbiAgICAgICAgdmFyIGZvdW5kID0gdGhpcy5tYXRjaGluZ0xpbmVzKGVkaXRvci5zZXNzaW9uLCBvcHRpb25zKTtcbiAgICAgICAgdmFyIGxpbmVzID0gZm91bmQubWFwKGZ1bmN0aW9uKGZvdW5kTGluZSkgeyByZXR1cm4gZm91bmRMaW5lLmNvbnRlbnQ7IH0pO1xuICAgICAgICAvKipAdHlwZSB7RWRpdFNlc3Npb259Ki9cbiAgICAgICAgdmFyIG9jY3VyU2Vzc2lvbiA9IG5ldyBFZGl0U2Vzc2lvbihsaW5lcy5qb2luKCdcXG4nKSk7XG4gICAgICAgIG9jY3VyU2Vzc2lvbi4kb2NjdXIgPSB0aGlzO1xuICAgICAgICBvY2N1clNlc3Npb24uJG9jY3VyTWF0Y2hpbmdMaW5lcyA9IGZvdW5kO1xuICAgICAgICBlZGl0b3Iuc2V0U2Vzc2lvbihvY2N1clNlc3Npb24pO1xuICAgICAgICB0aGlzLiR1c2VFbWFjc1N0eWxlTGluZVN0YXJ0ID0gdGhpcy4kb3JpZ2luYWxTZXNzaW9uLiR1c2VFbWFjc1N0eWxlTGluZVN0YXJ0O1xuICAgICAgICBvY2N1clNlc3Npb24uJHVzZUVtYWNzU3R5bGVMaW5lU3RhcnQgPSB0aGlzLiR1c2VFbWFjc1N0eWxlTGluZVN0YXJ0O1xuICAgICAgICB0aGlzLmhpZ2hsaWdodChvY2N1clNlc3Npb24sIG9wdGlvbnMucmUpO1xuICAgICAgICBvY2N1clNlc3Npb24uX2VtaXQoJ2NoYW5nZUJhY2tNYXJrZXInKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0VkaXRvcn0gZWRpdG9yXG4gICAgICovXG4gICAgZGlzcGxheU9yaWdpbmFsQ29udGVudChlZGl0b3IpIHtcbiAgICAgICAgZWRpdG9yLnNldFNlc3Npb24odGhpcy4kb3JpZ2luYWxTZXNzaW9uKTtcbiAgICAgICAgdGhpcy4kb3JpZ2luYWxTZXNzaW9uLiR1c2VFbWFjc1N0eWxlTGluZVN0YXJ0ID0gdGhpcy4kdXNlRW1hY3NTdHlsZUxpbmVTdGFydDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAqIFRyYW5zbGF0ZXMgdGhlIHBvc2l0aW9uIGZyb20gdGhlIG9yaWdpbmFsIGRvY3VtZW50IHRvIHRoZSBvY2N1ciBsaW5lcyBpblxuICAgICogdGhlIGRvY3VtZW50IG9yIHRoZSBiZWdpbm5pbmcgaWYgdGhlIGRvYyB7cm93OiAwLCBjb2x1bW46IDB9IGlmIG5vdFxuICAgICogZm91bmQuXG4gICAgKiBAcGFyYW0ge0VkaXRTZXNzaW9ufSBzZXNzaW9uIFRoZSBvY2N1ciBzZXNzaW9uXG4gICAgKiBAcGFyYW0ge1BvaW50fSBwb3MgVGhlIHBvc2l0aW9uIGluIHRoZSBvcmlnaW5hbCBkb2N1bWVudFxuICAgICogQHJldHVybiB7UG9pbnR9IHBvc2l0aW9uIGluIG9jY3VyIGRvY1xuICAgICoqL1xuICAgIG9yaWdpbmFsVG9PY2N1clBvc2l0aW9uKHNlc3Npb24sIHBvcykge1xuICAgICAgICB2YXIgbGluZXMgPSBzZXNzaW9uLiRvY2N1ck1hdGNoaW5nTGluZXM7XG4gICAgICAgIHZhciBudWxsUG9zID0ge3JvdzogMCwgY29sdW1uOiAwfTtcbiAgICAgICAgaWYgKCFsaW5lcykgcmV0dXJuIG51bGxQb3M7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChsaW5lc1tpXS5yb3cgPT09IHBvcy5yb3cpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtyb3c6IGksIGNvbHVtbjogcG9zLmNvbHVtbn07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGxQb3M7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiBUcmFuc2xhdGVzIHRoZSBwb3NpdGlvbiBmcm9tIHRoZSBvY2N1ciBkb2N1bWVudCB0byB0aGUgb3JpZ2luYWwgZG9jdW1lbnRcbiAgICAqIG9yIGBwb3NgIGlmIG5vdCBmb3VuZC5cbiAgICAqIEBwYXJhbSB7RWRpdFNlc3Npb259IHNlc3Npb24gVGhlIG9jY3VyIHNlc3Npb25cbiAgICAqIEBwYXJhbSB7UG9pbnR9IHBvcyBUaGUgcG9zaXRpb24gaW4gdGhlIG9jY3VyIHNlc3Npb24gZG9jdW1lbnRcbiAgICAqIEByZXR1cm4ge1BvaW50fSBwb3NpdGlvblxuICAgICoqL1xuICAgIG9jY3VyVG9PcmlnaW5hbFBvc2l0aW9uKHNlc3Npb24sIHBvcykge1xuICAgICAgICB2YXIgbGluZXMgPSBzZXNzaW9uLiRvY2N1ck1hdGNoaW5nTGluZXM7XG4gICAgICAgIGlmICghbGluZXMgfHwgIWxpbmVzW3Bvcy5yb3ddKVxuICAgICAgICAgICAgcmV0dXJuIHBvcztcbiAgICAgICAgcmV0dXJuIHtyb3c6IGxpbmVzW3Bvcy5yb3ddLnJvdywgY29sdW1uOiBwb3MuY29sdW1ufTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0VkaXRTZXNzaW9ufSBzZXNzaW9uXG4gICAgICogQHBhcmFtIHtQYXJ0aWFsPFNlYXJjaE9wdGlvbnM+fSBvcHRpb25zXG4gICAgICovXG4gICAgbWF0Y2hpbmdMaW5lcyhzZXNzaW9uLCBvcHRpb25zKSB7XG4gICAgICAgIG9wdGlvbnMgPSBvb3AubWl4aW4oe30sIG9wdGlvbnMpO1xuICAgICAgICBpZiAoIXNlc3Npb24gfHwgIW9wdGlvbnMubmVlZGxlKSByZXR1cm4gW107XG4gICAgICAgIHZhciBzZWFyY2ggPSBuZXcgU2VhcmNoKCk7XG4gICAgICAgIHNlYXJjaC5zZXQob3B0aW9ucyk7XG4gICAgICAgIHJldHVybiBzZWFyY2guZmluZEFsbChzZXNzaW9uKS5yZWR1Y2UoZnVuY3Rpb24obGluZXMsIHJhbmdlKSB7XG4gICAgICAgICAgICB2YXIgcm93ID0gcmFuZ2Uuc3RhcnQucm93O1xuICAgICAgICAgICAgdmFyIGxhc3QgPSBsaW5lc1tsaW5lcy5sZW5ndGgtMV07XG4gICAgICAgICAgICByZXR1cm4gbGFzdCAmJiBsYXN0LnJvdyA9PT0gcm93ID9cbiAgICAgICAgICAgICAgICBsaW5lcyA6XG4gICAgICAgICAgICAgICAgbGluZXMuY29uY2F0KHtyb3c6IHJvdywgY29udGVudDogc2Vzc2lvbi5nZXRMaW5lKHJvdyl9KTtcbiAgICAgICAgfSwgW10pO1xuICAgIH1cblxufVxuXG52YXIgZG9tID0gcmVxdWlyZSgnLi9saWIvZG9tJyk7XG5kb20uaW1wb3J0Q3NzU3RyaW5nKFwiLmFjZV9vY2N1ci1oaWdobGlnaHQge1xcblxcXG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xcblxcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSg4NywgMjU1LCA4LCAwLjI1KTtcXG5cXFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG5cXFxuICAgIHotaW5kZXg6IDQ7XFxuXFxcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcblxcXG4gICAgYm94LXNoYWRvdzogMCAwIDRweCByZ2IoOTEsIDI1NSwgNTApO1xcblxcXG59XFxuXFxcbi5hY2VfZGFyayAuYWNlX29jY3VyLWhpZ2hsaWdodCB7XFxuXFxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoODAsIDE0MCwgODUpO1xcblxcXG4gICAgYm94LXNoYWRvdzogMCAwIDRweCByZ2IoNjAsIDEyMCwgNzApO1xcblxcXG59XFxuXCIsIFwiaW5jcmVtZW50YWwtb2NjdXItaGlnaGxpZ2h0aW5nXCIsIGZhbHNlKTtcblxuZXhwb3J0cy5PY2N1ciA9IE9jY3VyO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9